import fitz
import glob
import json
import os
import re
import shutil
from PIL import Image, ImageChops, ImageDraw
from pathlib import Path

SOURCE_ROOT = Path('/Users/mikewang/Desktop/FMA_historical_exams')
REPO_ROOT = Path('/Users/mikewang/Documents/pitch_myself_for_poco/pocket-cosmos')
ASSET_ROOT = REPO_ROOT / 'public' / 'fma-historical-assets'
ASSET_ROOT.mkdir(parents=True, exist_ok=True)

ANSWER_FILES = {
    2009: '2009_Fma_solutions.pdf', 2010: '2010_Fma_solutions.pdf',
    2011: '2011_Fma_solutions.pdf', 2012: '2012_Fma_solutions.pdf',
    2013: '/tmp/exam1-2013-1-6-answers.pdf', 2014: '2014_Fma_solutions.pdf',
    2015: '2015_Fma_solutions.pdf', 2016: '2016_Fma_solutions.pdf',
    2017: '2017_Fma_answers.pdf', 2018: '2018_Fma_solutions_A.pdf',
    2019: '2019_Fma_solutions_A.pdf', 2020: '2020_Fma_solutions_A.pdf',
}

def norm(text):
    return ' '.join(text.replace('\u2190', ' ← ').split())

def parse_answer_map(path):
    text = '\n'.join(page.get_text() for page in fitz.open(path))
    answers = {}
    # Compact answer tables, e.g. 1d 6b 11b ...
    for match in re.finditer(r'(?<!\d)(\d{1,2})\s*([A-E])(?=\s|$)', text):
        number = int(match.group(1))
        if 1 <= number <= 25:
            answers.setdefault(number, match.group(2).upper())
    starts = list(re.finditer(r'(?m)^\s*(\d{1,2})\.\s+', text))
    for index, start in enumerate(starts):
        number = int(start.group(1))
        if not 1 <= number <= 25:
            continue
        end = starts[index + 1].start() if index + 1 < len(starts) else len(text)
        segment = text[start.start():end]
        candidates = []
        # In older solution PDFs the arrow is attached to the final value of
        # an option, e.g. ``(E) 2 sqrt(3) <-CORRECT``. Recover the nearest
        # option label even when line wrapping separates it from the arrow.
        for marker in re.finditer(r'←\s*-?\s*COR-?\s*RECT', segment):
            window = segment[max(0, marker.start() - 420):marker.start()]
            labels = re.findall(r'\(([A-E])\)', window)
            if labels:
                candidates.append(labels[-1].upper())
            else:
                bare = re.findall(r'\b([A-E])\b', window)
                if bare:
                    candidates.append(bare[-1].upper())
        for pattern in (
            r'\(([A-E])\)[^\n]{0,180}?←\s*-?\s*COR-?\s*RECT',
            r'(?:\(([A-E])\)|\b([A-E]))\s*←\s*-?\s*COR-?\s*RECT',
            r'CORRECT\s+answer\s+is\s*\(?([A-E])\)?',
            r'[Tt]he correct answer is\s*\(?([A-E])\)?',
            r'[Tt]he answer (?:is|would be|must be)\s*(?:choice\s*)?\(?([A-E])\)?',
        ):
            matches = re.findall(pattern, segment, re.S)
            candidates.extend((x[0] or x[1]).upper() if isinstance(x, tuple) else x.upper() for x in matches)
        if candidates:
            answers[number] = candidates[-1]
    return answers

def question_blocks(page):
    blocks = []
    for block in page.get_text('blocks'):
        x0, y0, x1, y1, text = block[:5]
        match = re.search(r'(?m)^\s*(\d{1,2})\.\s+', text)
        if match:
            number = int(match.group(1))
            if 1 <= number <= 25:
                blocks.append((number, y0, text))
    return blocks

def setup_applies_to_number(text, number):
    """Return whether a shared-information heading covers this question."""
    lower = text.lower()
    if not re.search(r'questions?', lower):
        return False
    # Ranges such as “Questions 1 to 3” or “Questions 2–4”.
    for match in re.finditer(r'questions?\s+(\d{1,2})\s*(?:to|[-–—])\s*(\d{1,2})', lower):
        if int(match.group(1)) <= number <= int(match.group(2)):
            return True
    # Explicit lists such as “questions 2 and 3”.
    tail = re.split(r'questions?', lower, maxsplit=1)[-1]
    listed = [int(value) for value in re.findall(r'\b\d{1,2}\b', tail)]
    return number in listed

def setup_question_numbers(text):
    """Expand a shared-context heading into every covered question number."""
    lower = text.lower()
    if not re.search(r'questions?', lower):
        return []
    numbers = set()
    # Include every member of ranges, not only the endpoints.
    for match in re.finditer(r'questions?\s+(\d{1,2})\s*(?:to|[-–—])\s*(\d{1,2})', lower):
        start, end = int(match.group(1)), int(match.group(2))
        numbers.update(range(min(start, end), max(start, end) + 1))
    # Also include explicit list forms such as “questions 2 and 4”.
    tail = re.split(r'questions?', lower, maxsplit=1)[-1]
    numbers.update(int(value) for value in re.findall(r'\b\d{1,2}\b', tail))
    return sorted(number for number in numbers if 1 <= number <= 25)

def shared_heading_top(page, block, default):
    """Find the first printed line of a shared-context heading inside a PDF block."""
    bx0, by0, bx1, by1, _ = block[:5]
    candidates = []
    for word in page.get_text('words'):
        x0, y0, x1, y1, token = word[:5]
        if bx0 - 1 <= x0 <= bx1 + 1 and by0 - 1 <= y0 <= by1 + 1 and token.strip().lower().startswith('questions'):
            candidates.append(y0)
    return min(candidates) if candidates else default

def classify(text):
    lower = text.lower()
    # Resolve broad or mixed stems into a teachable model before the more
    # generic keyword rules below. Every question should land in a named
    # specialty; the fallback is intentionally unreachable for normal F=ma
    # mechanics stems.
    if any(term in lower for term in ('projectile', 'launch', 'trajectory', 'thrown')):
        return 'Projectile motion & components'
    if any(term in lower for term in ('cloud collapse', 'gravitational collapse', 'kepler', 'orbit', 'satellite', 'planet', 'escape velocity', 'hemispherical shell')):
        return 'Gravitation & orbital motion'
    if any(term in lower for term in ('bounce', 'collision', 'collide', 'explosion', 'fragment', 'particles')):
        return 'Momentum & collisions'
    if any(term in lower for term in ('pulley', 'atwood', 'tension')):
        return "Newton's laws & friction"
    if any(term in lower for term in ('cylinder', 'axis', 'table', 'mobile', 'legs', 'rod', 'sign', 'equilibrium', 'tipping')):
        return 'Rotation, torque & rolling'
    if any(term in lower for term in ('balloon', 'piston', 'liquid', 'water', 'buoy', 'hydraulic')):
        return 'Fluids, pressure & buoyancy'
    if any(term in lower for term in ('graph', 'data', 'uncertainty', 'experiment')):
        return 'Data, measurement & dimensional analysis'
    if any(term in lower for term in ('fall', 'falling', 'building height', 'displacement')):
        return 'Kinematics & motion graphs'
    rules = [
        ('Projectile motion & components', ('projectile', 'launch angle', 'range of', 'thrown', 'trajectory')),
        ('Momentum & collisions', ('collision', 'collide', 'momentum', 'impulse', 'sticks', 'inelastic')),
        ('Center of mass & systems', ('center of mass', 'centre of mass', 'system of', 'massless rod')),
        ('Gravitation & orbital motion', ('gravitational', 'gravity', 'orbit', 'planet', 'satellite', 'escape velocity')),
        ('Rotation, torque & rolling', ('angular', 'rotation', 'rotat', 'torque', 'moment of inertia', 'roll', 'rolling', 'disk')),
        ('Oscillations & waves', ('oscillat', 'spring', 'pendulum', 'wave', 'frequency')),
        ('Fluids, pressure & buoyancy', ('pressure', 'fluid', 'water', 'buoyant', 'density of')),
        ('Work, energy & power', ('kinetic energy', 'potential energy', 'work', 'power', 'energy')),
        ('Materials & elasticity', ('young', 'stress', 'strain', 'elastic')),
        ('Data, measurement & dimensional analysis', ('uncertainty', 'dimensional', 'units', 'measure', 'experiment')),
        ('Newton\'s laws & friction', ('friction', 'normal force', 'newton', 'acceleration', 'force', 'incline', 'tension')),
        ('Kinematics & motion graphs', ('velocity', 'acceleration', 'position', 'time', 'speed', 'distance')),
    ]
    for label, needles in rules:
        if any(needle in lower for needle in needles):
            return label
    return 'Newton\'s laws & friction'

def clean_question_text(page_text, number):
    text = norm(page_text)
    # Keep the original question text for indexing only; the complete crop is student-facing.
    match = re.search(rf'\b{number}\.\s+(.*)', text)
    return match.group(1) if match else text

def render_crop(page, top, bottom, out_path, question_number, number_top, segments=None):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    image = pix.pil_image()
    # Omit the source-paper serial number while retaining the complete stem.
    # Its x-position varies between source forms, so locate the standalone
    # number token in the PDF word layer and mask only that token. This avoids
    # both a clipped leading digit and accidental removal of the first word.
    left_pt, right_pt = 20, 592
    for word in page.get_text('words'):
        x0, y0, x1, y1, token = word[:5]
        if token.strip() in {f'{question_number}.', str(question_number)} and number_top - 10 <= y0 <= number_top + 20:
            image_draw = ImageDraw.Draw(image)
            image_draw.rectangle(
                (max(0, int((x0 - 1) * 2)), max(0, int((y0 - 1) * 2)), min(image.width, int((x1 + 1) * 2)), min(image.height, int((y1 + 1) * 2))),
                fill='white',
            )
            break
    left = max(0, int(left_pt * 2)); right = min(image.width, int(right_pt * 2))
    # Stop just before the next question's text block; a small 2 pt margin
    # preserves the final option while keeping the next number out. For a
    # grouped stem (e.g. questions 2 and 3), compose the shared setup band
    # with only the current question band so neighbouring questions are not
    # duplicated in the asset.
    if segments is None:
        segments = [(top, bottom)]
    bands = []
    for seg_top, seg_bottom in segments:
        y0 = max(0, int((seg_top - 12) * 2))
        y1 = min(image.height, int((seg_bottom - 2) * 2))
        if y1 > y0:
            bands.append(image.crop((left, y0, right, y1)))
    if len(bands) == 1:
        crop = bands[0]
    else:
        gap = 18
        crop = Image.new('RGB', (right - left, sum(b.height for b in bands) + gap * (len(bands) - 1)), 'white')
        offset = 0
        for band in bands:
            crop.paste(band, (0, offset))
            offset += band.height + gap
    # The source PDF page is wider than the printed question. Trim only the
    # outer white page margins (with a generous safety pad) so the browser can
    # render the same content at a larger, more readable scale.
    nonwhite = ImageChops.difference(crop, Image.new('RGB', crop.size, 'white')).getbbox()
    if nonwhite:
        pad = 20
        x0 = max(0, nonwhite[0] - pad)
        x1 = min(crop.width, nonwhite[2] + pad)
        crop = crop.crop((x0, 0, x1, crop.height))
    crop.save(out_path, optimize=True)

def render_page_segment(page, top, bottom, question_number=None, number_top=None):
    """Render one page band for a cross-page shared setup repair."""
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    image = pix.pil_image()
    if question_number is not None and number_top is not None:
        draw = ImageDraw.Draw(image)
        for word in page.get_text('words'):
            x0, y0, x1, y1, token = word[:5]
            if token.strip() in {f'{question_number}.', str(question_number)} and number_top - 10 <= y0 <= number_top + 20:
                draw.rectangle(
                    (max(0, int((x0 - 1) * 2)), max(0, int((y0 - 1) * 2)),
                     min(image.width, int((x1 + 1) * 2)), min(image.height, int((y1 + 1) * 2))),
                    fill='white',
                )
                break
    left, right = 20 * 2, min(image.width, 592 * 2)
    y0, y1 = max(0, int((top - 12) * 2)), min(image.height, int((bottom - 2) * 2))
    return image.crop((left, y0, right, y1))

def save_cross_page_segments(segments, out_path):
    gap = 18
    crop = Image.new('RGB', (max(part.width for part in segments), sum(part.height for part in segments) + gap * (len(segments) - 1)), 'white')
    offset = 0
    for part in segments:
        crop.paste(part, (0, offset))
        offset += part.height + gap
    nonwhite = ImageChops.difference(crop, Image.new('RGB', crop.size, 'white')).getbbox()
    if nonwhite:
        pad = 20
        crop = crop.crop((max(0, nonwhite[0] - pad), 0, min(crop.width, nonwhite[2] + pad), crop.height))
    crop.save(out_path, optimize=True)

def repair_cross_page_assets():
    """Add shared setup that begins on the preceding PDF page."""
    repairs = [
        # 2015 Q13 uses the pendulum setup printed at the bottom of page 6.
        ('2015_Fma_exam.pdf', 5, (386.2, 444.4), 6, (67.0, 491.5), 13, 'fma-2015-main-q13.png'),
        # 2016 Q6 uses the box/particle setup printed on page 4.
        ('2016_Fma_exam.pdf', 3, (57.1, 263.3), 4, (67.0, 364.2), 6, 'fma-2016-main-q06.png'),
    ]
    for filename, setup_page_index, setup_range, question_page_index, question_range, number, asset_name in repairs:
        doc = fitz.open(SOURCE_ROOT / 'papers' / filename)
        setup = render_page_segment(doc[setup_page_index], *setup_range)
        question = render_page_segment(doc[question_page_index], question_range[0] + 12, question_range[1], number, question_range[0])
        save_cross_page_segments([setup, question], ASSET_ROOT / asset_name)
        doc.close()
    # The legacy 2008 asset for Q9 was originally cropped together with the
    # next experiment's shared setup. Keep only Q9 and its five choices.
    legacy_q9 = REPO_ROOT / 'public' / 'fma-2008-assets' / 'q09.png'
    legacy_image = Image.open(legacy_q9).convert('RGB')
    legacy_image.crop((0, 0, legacy_image.width, 640)).save(legacy_q9, optimize=True)

def main():
    all_records = []
    inventory = []
    answer_maps = {}
    for year in range(2009, 2021):
        papers = sorted(SOURCE_ROOT.joinpath('papers').glob(f'{year}_Fma_exam*.pdf'))
        for paper in papers:
            suffix = paper.stem.replace(f'{year}_Fma_exam', '').strip('_') or 'main'
            exam_key = f'{year}-{suffix.lower()}'
            solution_ref = ANSWER_FILES[year]
            # Split forms in 2018–2020 have independent answer keys.
            if suffix.upper() == 'B' and year in (2018, 2019, 2020):
                solution_ref = f'{year}_Fma_solutions_B.pdf'
            solution_path = Path(solution_ref) if solution_ref.startswith('/') else SOURCE_ROOT / 'solutions' / solution_ref
            if year == 2013 and not solution_path.exists():
                solution_path = SOURCE_ROOT / 'solutions' / '2013_Fma_solutions.pdf'
            answers = answer_maps.setdefault(str(solution_path), parse_answer_map(solution_path))
            doc = fitz.open(paper)
            records_for_paper = []
            for page_index, page in enumerate(doc):
                blocks = question_blocks(page)
                if not blocks:
                    continue
                for position, (number, y0, block_text) in enumerate(blocks):
                    number_top = y0
                    next_y = blocks[position + 1][1] if position + 1 < len(blocks) else 742
                    # If a shared setup paragraph belongs to the next group,
                    # end the current crop before that paragraph. Otherwise
                    # the preceding question would contain unrelated text
                    # (for example Q1 accidentally containing the Q2–Q3 setup).
                    for raw in page.get_text('blocks'):
                        px0, py0, px1, py1, ptext = raw[:5]
                        if y0 < py0 < next_y and 'copyright' in ptext.lower():
                            next_y = min(next_y, py0)
                        if y0 < py0 < next_y and re.search(r'questions?\s+\d', ptext, re.I):
                            # render_crop applies an additional 2 pt safety
                            # margin; keep a small gap below the setup so the
                            # current question's final option remains.
                            next_y = min(next_y, py0 + 2)
                    # Include the shared setup paragraph for grouped questions.
                    preceding = page.get_text('blocks')
                    # A shared setup block can sit well above the second
                    # question (especially when the first question has a
                    # long stem). Include it whenever its heading explicitly
                    # names the current question, rather than relying only on
                    # a fixed vertical-distance heuristic.
                    named_setup = lambda text: setup_applies_to_number(text, number)
                    setup_band = None
                    for raw in preceding:
                        px0, py0, px1, py1, ptext = raw[:5]
                        if py1 <= y0 and (
                            named_setup(ptext)
                            or (py1 > y0 - 145 and re.search(r'questions?\s+\d', ptext, re.I))
                        ):
                            y0 = min(y0, py0)
                            group_numbers = setup_question_numbers(ptext)
                            if number in group_numbers:
                                first_number = min(group_numbers)
                                first_group_y = next(
                                    (block_y for block_number, block_y, _ in blocks if block_number == first_number),
                                    number_top,
                                )
                                # Leave a small white gap before the first
                                # question so stray source line fragments at
                                # the boundary cannot enter the setup band.
                                heading_top = shared_heading_top(page, raw, py0)
                                setup_band = (heading_top, max(heading_top, first_group_y - 8))
                    qid = f'fma-{year}-{suffix.lower()}-q{number:02d}'
                    asset_name = f'{qid}.png'
                    # When a grouped setup is included, start at the setup's
                    # first line rather than carrying the preceding question's
                    # final option into the image.
                    render_top = y0 + 12 if y0 < number_top else y0
                    segments = None
                    if setup_band is not None:
                        # The normal renderer adds a 12 pt top margin. Offset
                        # the setup band's start so that margin does not pull
                        # in the previous question's final option.
                        segments = [(setup_band[0] + 12, setup_band[1]), (number_top + 12, next_y)]
                    render_crop(page, render_top, next_y, ASSET_ROOT / asset_name, number, number_top, segments)
                    question_text = clean_question_text(block_text, number)
                    specialty = classify(question_text)
                    answer = answers.get(number)
                    if not answer:
                        print('WARNING missing answer', exam_key, number)
                    record = {
                        'id': qid,
                        'number': number,
                        'year': year,
                        'paper': suffix.upper() if suffix != 'main' else '',
                        'sourceQuestionId': f'{year} F=ma {suffix.upper() if suffix != "main" else ""} Q{number}'.replace('  ', ' ').strip(),
                        'context': question_text,
                        'specialty': specialty,
                        'image': f'/fma-historical-assets/{asset_name}',
                        'answer': answer,
                        'sourcePaper': str(paper),
                        'sourceSolution': str(solution_path),
                        'page': page_index + 1,
                    }
                    all_records.append(record)
                    records_for_paper.append(record)
            inventory.append({'paper': str(paper), 'solution': str(solution_path), 'questions': len(records_for_paper), 'answers_found': sum(1 for r in records_for_paper if r['answer'])})
    out_json = REPO_ROOT / 'src' / 'data' / 'fmaHistoricalCompetition.generated.json'
    out_json.write_text(json.dumps({'schemaVersion': 1, 'title': 'FMA Competition', 'questions': all_records, 'inventory': inventory}, indent=2) + '\n')
    manifest = {
        'schemaVersion': 1,
        'title': 'FMA Competition historical question index',
        'collection': 'F=ma historical exams 2009–2020',
        'papers': [Path(item['paper']).name for item in inventory],
        'solutions': [Path(item['solution']).name for item in inventory],
        'questionCount': len(all_records),
        'years': list(range(2009, 2021)),
        'questions': [
            {
                'id': item['id'], 'year': item['year'], 'paper': item['paper'],
                'number': item['number'], 'specialty': item['specialty'],
                'image': item['image'], 'answer': item['answer'],
            }
            for item in all_records
        ],
    }
    (ASSET_ROOT / 'source-inventory.json').write_text(json.dumps(manifest, indent=2) + '\n')
    repair_cross_page_assets()
    print('generated', len(all_records), 'questions', 'assets', len(list(ASSET_ROOT.glob('*.png'))))

if __name__ == '__main__':
    main()
