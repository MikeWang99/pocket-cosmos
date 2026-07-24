#!/usr/bin/env python3
"""Build the image-first CIE IGCSE Chapter 1 MCQ dataset and web assets."""

from __future__ import annotations

import argparse
import json
import math
import re
import subprocess
from concurrent.futures import ProcessPoolExecutor
from dataclasses import dataclass
from pathlib import Path

from PIL import Image


TOPICS = {
    "1.1": {
        "title": "Physical Quantities and Measurement Techniques",
        "guidance": "Read the instrument scale carefully, keep units consistent, and apply the required precision or significant-figure rule.",
    },
    "1.2": {
        "title": "Motion",
        "guidance": "Identify the required motion quantity first, then use the relevant definition, motion graph, or kinematic relationship.",
    },
    "1.3": {
        "title": "Mass and Weight",
        "guidance": "Distinguish mass from gravitational weight and apply the relationship between mass, gravitational field strength, and weight.",
    },
    "1.4": {
        "title": "Density",
        "guidance": "Use density as mass divided by volume, convert units before calculating, and check that the final unit matches the option.",
    },
    "1.5": {
        "title": "Forces",
        "guidance": "Choose the object or system, identify the resultant force, and connect force balance or Newton's laws to the stated motion.",
    },
    "1.6": {
        "title": "Momentum",
        "guidance": "Define the system, track momentum directions with signs, and apply impulse or momentum conservation as appropriate.",
    },
    "1.7": {
        "title": "Energy, Work and Power",
        "guidance": "Track the relevant energy stores and transfers, then apply work, efficiency, or power with consistent units.",
    },
    "1.8": {
        "title": "Pressure",
        "guidance": "Identify the force and the area over which it acts, then apply the appropriate pressure relationship with consistent units.",
    },
}

ADVANCED_TERMS = (
    "area under",
    "efficiency",
    "terminal",
    "impulse",
    "conservation",
    "equilibrium",
    "change in",
    "percentage",
    "maximum",
    "minimum",
)

DIRECT_RECALL_TERMS = (
    "which apparatus",
    "which instrument",
    "which unit",
    "what is the unit",
    "which quantity",
    "what is measured",
    "what is the reading",
    "what is the area",
    "largest acceleration",
    "smallest acceleration",
)


@dataclass(frozen=True)
class AssetJob:
    topic_id: str
    number: int
    source: Path
    destination: Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source-root",
        type=Path,
        default=Path(
            "/Users/mikewang/Documents/pitch_myself_for_poco/outputs/"
            "igcse_ch1_question_bank"
        ),
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
    )
    parser.add_argument("--workers", type=int, default=8)
    return parser.parse_args()


def process_asset(job: AssetJob) -> dict:
    job.destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(job.source) as source_image:
        image = source_image.convert("RGB")
        width, height = image.size
        image.save(job.destination, "WEBP", quality=92, method=6)

    completed = subprocess.run(
        ["tesseract", str(job.source), "stdout", "-l", "eng", "--psm", "6"],
        check=True,
        capture_output=True,
        text=True,
    )
    ocr_text = re.sub(r"\s+", " ", completed.stdout).strip()
    lower_text = ocr_text.lower()
    keyword_hits = sum(term in lower_text for term in ADVANCED_TERMS)
    direct_recall_hits = sum(term in lower_text for term in DIRECT_RECALL_TERMS)
    numeric_groups = len(re.findall(r"\d+(?:\.\d+)?", ocr_text))

    # Estimate reasoning load from the wording. Raw text length and image size
    # receive only small weights: tables, apparatus diagrams, and long option
    # labels can make a direct-recall question visually large without making it
    # conceptually difficult.
    complexity = (
        math.log1p(max(len(ocr_text), 1)) * 0.24
        + min(height / 1200, 1.0) * 0.05
        + min(keyword_hits, 5) * 0.42
        + min(numeric_groups, 10) * 0.035
        - min(direct_recall_hits, 2) * 0.72
    )

    return {
        "topicId": job.topic_id,
        "questionNumber": job.number,
        "width": width,
        "height": height,
        "complexity": complexity,
        "ocrCharacters": len(ocr_text),
    }


def main() -> None:
    args = parse_args()
    source_root = args.source_root.resolve()
    repo_root = args.repo_root.resolve()
    answers_path = source_root / "mcq_answers.json"
    source_images = source_root / "pictures"
    public_root = repo_root / "public" / "igcse-cie-ch1-assets"
    output_path = repo_root / "src" / "data" / "igcseCieChapter1Mcq.json"

    answers = json.loads(answers_path.read_text(encoding="utf-8"))
    jobs: list[AssetJob] = []

    for topic_id in TOPICS:
        topic_dir = source_images / f"mcq_{topic_id}"
        files = sorted(
            topic_dir.glob("q*.png"),
            key=lambda item: int(re.search(r"q(\d+)", item.stem).group(1)),
        )
        if not files:
            raise RuntimeError(f"No MCQ images found for {topic_id}")

        for source in files:
            number = int(re.search(r"q(\d+)", source.stem).group(1))
            if str(number) not in answers.get(topic_id, {}):
                raise RuntimeError(f"Missing answer for {topic_id} Q{number}")
            destination = public_root / topic_id / f"q{number:03d}.webp"
            jobs.append(AssetJob(topic_id, number, source, destination))

    with ProcessPoolExecutor(max_workers=args.workers) as pool:
        processed = list(pool.map(process_asset, jobs))

    ranked = sorted(
        processed,
        key=lambda item: (
            item["complexity"],
            item["topicId"],
            item["questionNumber"],
        ),
    )
    difficulty_by_id: dict[tuple[str, int], int] = {}
    total = len(ranked)
    for rank, item in enumerate(ranked):
        difficulty = min(5, int(rank * 5 / total) + 1)
        difficulty_by_id[(item["topicId"], item["questionNumber"])] = difficulty

    records = []
    for item in sorted(
        processed, key=lambda value: (value["topicId"], value["questionNumber"])
    ):
        topic_id = item["topicId"]
        number = item["questionNumber"]
        answer = answers[topic_id][str(number)]
        difficulty = difficulty_by_id[(topic_id, number)]
        guidance = TOPICS[topic_id]["guidance"]
        records.append(
            {
                "id": f"igcse-cie-ch1-{topic_id.replace('.', '-')}-q{number:03d}",
                "topicId": topic_id,
                "topicTitle": TOPICS[topic_id]["title"],
                "questionNumber": number,
                "difficulty": difficulty,
                "answer": answer,
                "image": f"/igcse-cie-ch1-assets/{topic_id}/q{number:03d}.webp",
                "imageWidth": item["width"],
                "imageHeight": item["height"],
                "explanation": (
                    f"The supplied mark scheme gives option {answer}. {guidance}"
                ),
            }
        )

    output_path.write_text(
        json.dumps(records, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    counts = {level: 0 for level in range(1, 6)}
    for record in records:
        counts[record["difficulty"]] += 1
    classroom = sum(counts[level] for level in (1, 2))
    homework = sum(counts[level] for level in (3, 4, 5))
    print(
        json.dumps(
            {
                "total": len(records),
                "difficultyCounts": counts,
                "classroom": classroom,
                "homework": homework,
                "dataset": str(output_path),
                "assets": str(public_root),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
