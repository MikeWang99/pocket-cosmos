import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bankPath = join(repoRoot, 'src/data/apcMechanicsRotationTest16.json');
const sourceDir = join(repoRoot, 'public/apc-mechanics-test16/source');
const generatedDir = join(repoRoot, 'public/apc-mechanics-test16/generated');
const manifestPath = join(repoRoot, 'public/apc-mechanics-test16/asset-index.json');
const questionIndexPath = join(repoRoot, 'public/apc-mechanics-test16/question-index.json');
const bank = JSON.parse(await readFile(bankPath, 'utf8'));

await mkdir(generatedDir, { recursive: true });

const pad = (value) => String(value).padStart(2, '0');
const mimeFor = (name) => extname(name).toLowerCase() === '.jpg' ? 'image/jpeg' : 'image/jpeg';
const assetCache = new Map();

const assetDataUrl = async (name) => {
  if (assetCache.has(name)) return assetCache.get(name);
  const data = await readFile(join(sourceDir, name));
  const url = `data:${mimeFor(name)};base64,${data.toString('base64')}`;
  assetCache.set(name, url);
  return url;
};

const embedAssets = async (html) => {
  const matches = [...html.matchAll(/\[asset:([^\]]+)\]/g)];
  let result = html;
  for (const match of matches) {
    const name = match[1];
    const url = await assetDataUrl(name);
    result = result.replace(match[0], `<img class="embedded-asset" src="${url}" alt="" />`);
  }
  return result;
};

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const wrapText = (value, maxChars = 44) => {
  const words = value.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const stemSvgDocument = async (question) => {
  const width = 800;
  const height = question.stemHeight;
  const lines = wrapText(question.stemText);
  const diagramName = (question.stemSourceAssets ?? []).find((name) => name === 'image01254.jpeg');
  const referenceGraphAssets = question.referenceGraphAssets ?? [];
  const lineHeight = 42;
  const hasDiagram = Boolean(diagramName) || referenceGraphAssets.length > 0;
  const textBlockHeight = lines.length * lineHeight;
  const textTop = hasDiagram ? 45 : Math.max(48, (height - textBlockHeight) / 2 + 25);
  const text = lines.map((line, index) =>
    `<tspan x="52" y="${textTop + index * lineHeight}">${escapeXml(line)}</tspan>`,
  ).join('\n      ');
  let diagram = '';
  if (diagramName) {
    const url = await assetDataUrl(diagramName);
    diagram = `<image href="${url}" x="114" y="${Math.max(textTop + textBlockHeight + 14, 245)}" width="572" height="235" preserveAspectRatio="xMidYMid meet" />`;
  }
  if (referenceGraphAssets.length) {
    const placements = [
      { x: 24, y: 222 },
      { x: 290, y: 222 },
      { x: 556, y: 222 },
      { x: 156, y: 420 },
      { x: 422, y: 420 },
    ];
    const graphImages = [];
    for (const [index, name] of referenceGraphAssets.entries()) {
      const url = await assetDataUrl(name);
      const { x, y } = placements[index];
      const label = String.fromCharCode(65 + index);
      graphImages.push(`<text x="${x + 110}" y="${y - 12}" text-anchor="middle" fill="#334155" font-family="Arial, sans-serif" font-size="22" font-weight="700">${label}</text>`);
      graphImages.push(`<image href="${url}" x="${x}" y="${y}" width="220" height="155" preserveAspectRatio="xMidYMid meet" />`);
    }
    diagram = graphImages.join('\n  ');
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(question.stemText)}">
  <rect width="100%" height="100%" rx="18" fill="#ffffff" />
  <text fill="#111827" font-family="Georgia, 'Times New Roman', serif" font-size="30" line-height="1.4">
      ${text}
  </text>
  ${diagram}
</svg>
`;
};

const svgDocument = ({ html, width, height, kind }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <rect width="100%" height="100%" rx="18" fill="#ffffff" />
  <foreignObject x="36" y="28" width="${width - 72}" height="${height - 56}">
    <div xmlns="http://www.w3.org/1999/xhtml" class="asset ${kind}">
      <style>
        * { box-sizing: border-box; }
        .asset { width: 100%; height: 100%; color: #111827; font-family: Georgia, 'Times New Roman', serif; }
        .stem { display: flex; flex-direction: column; justify-content: center; font-size: 35px; line-height: 1.48; }
        .choice { display: flex; align-items: center; justify-content: center; text-align: center; font-size: 38px; line-height: 1.35; }
        .content { width: 100%; min-width: 0; white-space: normal; overflow-wrap: break-word; }
        .choice .content { height: 100%; display: flex; align-items: center; justify-content: center; }
        i { font-style: italic; }
        sub { font-size: 65%; vertical-align: -0.25em; }
        .embedded-asset { display: block; max-width: 88%; max-height: calc(100% - 8px); width: auto; height: auto; object-fit: contain; margin: 0 auto; }
        .choice .embedded-asset { width: auto; height: calc(100% - 8px); max-width: 88%; max-height: calc(100% - 8px); }
        .stem .embedded-asset { display: inline-block; max-width: 120px; max-height: 48px; margin: 0 5px; vertical-align: middle; }
        .diagram { display: flex; flex: 1; align-items: center; justify-content: center; min-height: 190px; margin-top: 20px; }
        .stem .diagram .embedded-asset { display: block; max-width: 720px; max-height: 245px; margin: 0 auto; }
      </style>
      <div class="content">${html}</div>
    </div>
  </foreignObject>
</svg>
`;

const generatedAssets = [];
const sourceNames = new Set();

for (const question of bank.questions) {
  const q = pad(question.number);
  const stemName = `q${q}-stem.svg`;
  const stemSvg = await stemSvgDocument(question);
  await writeFile(join(generatedDir, stemName), stemSvg);
  generatedAssets.push({
    id: `q${q}-stem`,
    question: question.number,
    kind: 'stem',
    file: stemName,
    downloadUrl: `/apc-mechanics-test16/generated/${stemName}`,
    width: 800,
    height: question.stemHeight,
  });

  for (const name of question.stemSourceAssets ?? []) sourceNames.add(name);
  for (const name of question.referenceGraphAssets ?? []) sourceNames.add(name);

  for (const choice of question.choices) {
    const choiceName = `q${q}-choice-${choice.label.toLowerCase()}.svg`;
    const choiceHtml = await embedAssets(choice.html);
    const choiceSvg = svgDocument({ html: choiceHtml, width: 1200, height: question.choiceHeight, kind: 'choice' });
    await writeFile(join(generatedDir, choiceName), choiceSvg);
    generatedAssets.push({
      id: `q${q}-choice-${choice.label.toLowerCase()}`,
      question: question.number,
      kind: 'choice',
      choice: choice.label,
      file: choiceName,
      downloadUrl: `/apc-mechanics-test16/generated/${choiceName}`,
      width: 1200,
      height: question.choiceHeight,
    });
    for (const name of choice.sourceAssets ?? []) sourceNames.add(name);
  }
}

const checksum = async (path) => createHash('sha256').update(await readFile(path)).digest('hex');
for (const asset of generatedAssets) {
  asset.sha256 = await checksum(join(generatedDir, asset.file));
}

const sourceAssets = [];
for (const name of [...sourceNames].sort()) {
  sourceAssets.push({
    id: `source-${basename(name, extname(name))}`,
    kind: 'source',
    file: name,
    downloadUrl: `/apc-mechanics-test16/source/${name}`,
    sourceUrl: `https://img.crackap.com/ap/physics-c/br/${name}`,
    sha256: await checksum(join(sourceDir, name)),
  });
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  bankId: bank.bankId,
  title: bank.title,
  sourcePage: bank.sourcePage,
  rightsStatus: bank.rightsStatus,
  reviewStatus: bank.reviewStatus,
  alignmentPolicy: 'Every choice for a question uses the same 1200 px-wide SVG canvas and the same question-level height; embedded source figures are centered with object-fit: contain.',
  counts: {
    questions: bank.questions.length,
    stems: generatedAssets.filter((asset) => asset.kind === 'stem').length,
    choices: generatedAssets.filter((asset) => asset.kind === 'choice').length,
    originalSourceAssets: sourceAssets.length,
  },
  generatedAssets,
  sourceAssets,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
const questionIndex = {
  schemaVersion: 1,
  generatedAt: manifest.generatedAt,
  bankId: bank.bankId,
  title: bank.title,
  sourcePage: bank.sourcePage,
  rightsStatus: bank.rightsStatus,
  reviewStatus: bank.reviewStatus,
  questions: bank.questions.map((question) => {
    const q = pad(question.number);
    return {
      id: `crackap-apc-mechanics-test16-q${q}`,
      number: question.number,
      sourceQuestionId: question.sourceQuestionId,
      sourceAnswer: question.sourceAnswer,
      independentlyVerifiedAnswer: question.answer,
      answerVerified: question.sourceAnswer === question.answer,
      difficulty: question.difficulty,
      knowledgeTags: question.knowledgeTags,
      skillTags: question.skillTags,
      trainingFocus: question.trainingFocus,
      stemAsset: `/apc-mechanics-test16/generated/q${q}-stem.svg`,
      choiceAssets: question.choices.map((choice) => ({
        label: choice.label,
        asset: `/apc-mechanics-test16/generated/q${q}-choice-${choice.label.toLowerCase()}.svg`,
      })),
      explanation: question.solution,
    };
  }),
};
await writeFile(questionIndexPath, `${JSON.stringify(questionIndex, null, 2)}\n`);
console.log(`Generated ${generatedAssets.length} self-contained SVG assets and indexed ${sourceAssets.length} original assets.`);
