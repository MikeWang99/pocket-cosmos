import questionBank from './ap1Unit1QuestionBank.questions.json';
import assetManifest from './ap1Unit1QuestionBank.assets.json';
import type { PracticeSet } from './practiceSets';
import type { PracticeAsset, PracticeStep } from '../types/practice';

type QuestionRecord = (typeof questionBank.questions)[number];
type AssetRecord = (typeof assetManifest.assets)[number];

const assetsById = new Map<string, AssetRecord>(assetManifest.assets.map((asset) => [asset.id, asset]));

const publicAssetPath = (file: string) => `/ap1-u1-question-bank/${file.replace(/^assets\//, '')}`;

const makeAsset = (asset: AssetRecord, questionId: string): PracticeAsset => ({
  id: asset.id,
  kind: asset.role === 'choice' ? 'choice' : 'stem',
  src: publicAssetPath(asset.file),
  alt: `AP Physics 1 Unit 1 figure for ${questionId}`,
  downloadName: asset.file.split('/').pop() ?? `${asset.id}.png`,
});

const stripPrintedNumber = (text: string, number: string) => {
  const prefix = new RegExp(`^\\s*${number}\\.\\s*`);
  return text.replace(prefix, '').trim();
};

const makeStep = (question: QuestionRecord): PracticeStep => {
  const questionAssets = question.asset_ids
    .map((assetId) => assetsById.get(assetId))
    .filter((asset): asset is AssetRecord => Boolean(asset));
  const stemAssets = questionAssets.filter((asset) => asset.role !== 'choice');
  const firstStem = stemAssets[0];
  const sourceNumber = String(question.source.original_number);

  return {
    id: question.id,
    mode: question.choices.length ? 'multiple_choice' : 'free_response',
    title: `Question ${sourceNumber}`,
    prompt: stripPrintedNumber(question.stem, sourceNumber),
    context: question.context,
    tags: [...question.knowledge_points, ...question.tags],
    sourceYear: question.year,
    image: firstStem
      ? {
          src: publicAssetPath(firstStem.file),
          alt: `AP Physics 1 Unit 1 figure for Question ${sourceNumber}`,
          role: 'diagram',
          responsive: true,
          downloadName: firstStem.file.split('/').pop(),
        }
      : undefined,
    supportingImages: stemAssets.slice(1).map((asset) => ({
      src: publicAssetPath(asset.file),
      alt: `AP Physics 1 Unit 1 supporting figure for Question ${sourceNumber}`,
      downloadName: asset.file.split('/').pop(),
    })),
    assets: questionAssets.map((asset) => makeAsset(asset, question.id)),
    maxScore: 0,
    source: 'AP Physics 1 · Unit 1 Kinematics Question Bank',
    answerNudge: 'Select an option to record your response. The source bank does not include an answer key yet.',
    criteria: [],
    choices: question.choices.map((choice) => ({
      label: choice.label,
      text: choice.text,
      images: (choice.asset_ids ?? []).flatMap((assetId) => {
        const asset = assetsById.get(assetId);
        if (!asset) return [];
        return [{
          src: publicAssetPath(asset.file),
          alt: `Option ${choice.label} for AP Physics 1 Unit 1 Question ${sourceNumber}`,
          downloadName: asset.file.split('/').pop(),
        }];
      }),
    })),
  };
};

export const apPhysics1Unit1QuestionBankMeta = {
  title: 'AP Physics 1 · Unit 1 Kinematics Question Bank',
  subtitle: 'Multiple Choice · 146 questions',
  eyebrow: 'AP Physics 1',
  description: 'A source-faithful Unit 1 question bank with structured stems, reviewed figures, and independently indexed visual choices. The supplied source does not include an answer key, so responses are recorded without automatic marking.',
  sources: [
    {
      label: 'AP Physics 1 Unit 1 source paper',
      url: '/ap1-u1-question-bank/source/U1_question.pdf',
    },
  ],
};

export const apPhysics1Unit1QuestionBankSteps: PracticeStep[] = questionBank.questions.map(makeStep);

export const apPhysics1Unit1MultipleChoiceSteps = apPhysics1Unit1QuestionBankSteps.filter(
  (step) => step.mode === 'multiple_choice',
);

export const apPhysics1Unit1FreeResponseSteps = apPhysics1Unit1QuestionBankSteps.filter(
  (step) => step.mode === 'free_response',
);

export const apPhysics1Unit1QuestionBankSet: PracticeSet = {
  id: 'ap1-unit-1-kinematics-question-bank',
  category: 'mechanics',
  label: 'Unit 1 Question Bank',
  system: 'ap-physics-1',
  practiceKind: 'mcq',
  chapter: 1,
  chapterTitle: 'Kinematics',
  ...apPhysics1Unit1QuestionBankMeta,
  steps: apPhysics1Unit1MultipleChoiceSteps,
};

export const apPhysics1Unit1FreeResponseQuestionBankSet: PracticeSet = {
  id: 'ap1-unit-1-free-response-question-bank',
  category: 'mechanics',
  label: 'Unit 1 Free Response',
  system: 'ap-physics-1',
  practiceKind: 'structured',
  chapter: 1,
  chapterTitle: 'Kinematics',
  title: 'AP Physics 1 · Unit 1 Free Response Question Bank',
  subtitle: 'Free Response · 6 questions',
  eyebrow: 'AP Physics 1',
  description: 'The free-response items included in the supplied Unit 1 source bank, preserved with their reviewed figures and source wording.',
  sources: apPhysics1Unit1QuestionBankMeta.sources,
  steps: apPhysics1Unit1FreeResponseSteps,
};
