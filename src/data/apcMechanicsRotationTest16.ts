import bank from './apcMechanicsRotationTest16.json';
import type { PracticeAsset, PracticeStep } from '../types/practice';

const generatedRoot = '/apc-mechanics-test16/generated';
const sourceRoot = '/apc-mechanics-test16/source';

const pad = (value: number) => String(value).padStart(2, '0');

export const apcMechanicsRotationTest16Meta = {
  title: 'AP Physics C: Mechanics · Rotation I',
  subtitle: 'Rotational kinematics, torque, and rotational dynamics — 10 sourced MCQs.',
  eyebrow: 'AP Physics C Mechanics · Unit 5',
  description:
    'A fully indexed CrackAP practice set with separate downloadable stem and option assets, difficulty levels, and fine-grained knowledge tags.',
  sources: [
    { label: bank.sourceLabel, url: bank.sourcePage },
    { label: 'Downloadable question index', url: '/apc-mechanics-test16/question-index.json' },
    { label: 'Downloadable asset index', url: '/apc-mechanics-test16/asset-index.json' },
  ],
};

export const apcMechanicsRotationTest16Steps: PracticeStep[] = bank.questions.map((question) => {
  const q = pad(question.number);
  const stemSrc = `${generatedRoot}/q${q}-stem.svg`;
  const stemAsset: PracticeAsset = {
    id: `rotation-test16-q${q}-stem`,
    kind: 'stem',
    src: stemSrc,
    alt: `Question ${question.number} stem`,
    downloadName: `apc-mechanics-test16-q${q}-stem.svg`,
    width: 800,
    height: question.stemHeight,
    sourceUrl: bank.sourcePage,
  };
  const choiceAssets: PracticeAsset[] = question.choices.map((choice) => ({
    id: `rotation-test16-q${q}-choice-${choice.label.toLowerCase()}`,
    kind: 'choice' as const,
    src: `${generatedRoot}/q${q}-choice-${choice.label.toLowerCase()}.svg`,
    alt: `Question ${question.number}, option ${choice.label}`,
    downloadName: `apc-mechanics-test16-q${q}-choice-${choice.label.toLowerCase()}.svg`,
    width: 1200,
    height: question.choiceHeight,
    sourceUrl: bank.sourcePage,
  }));
  const sourceNames = new Set<string>([
    ...('stemSourceAssets' in question ? question.stemSourceAssets ?? [] : []),
    ...('referenceGraphAssets' in question ? question.referenceGraphAssets ?? [] : []),
    ...question.choices.flatMap((choice) => ('sourceAssets' in choice ? choice.sourceAssets ?? [] : [])),
  ]);
  const sourceAssets: PracticeAsset[] = [...sourceNames].map((name) => ({
    id: `rotation-test16-source-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
    kind: 'source' as const,
    src: `${sourceRoot}/${name}`,
    alt: `Original source asset ${name}`,
    downloadName: name,
    sourceUrl: `https://img.crackap.com/ap/physics-c/br/${name}`,
  }));

  return {
    id: `crackap-apc-mechanics-test16-q${q}`,
    mode: 'multiple_choice',
    difficulty: question.difficulty,
    title: `Question ${question.number}`,
    prompt: 'Select the correct option.',
    context: question.trainingFocus,
    tags: [
      `Difficulty ${question.difficulty}`,
      ...question.knowledgeTags,
      ...question.skillTags,
    ],
    image: {
      src: stemSrc,
      alt: question.stemText,
      role: 'question',
      width: 800,
      height: question.stemHeight,
      downloadName: stemAsset.downloadName,
      responsive: true,
    },
    assets: [stemAsset, ...choiceAssets, ...sourceAssets],
    maxScore: 1,
    source: `CrackAP · Test 16 · Q${question.number}`,
    answerNudge: question.trainingFocus,
    criteria: [],
    choiceLayout: question.number === 2 ? 'grid' : 'stacked',
    choices: question.choices.map((choice, index) => ({
      label: choice.label,
      text: choice.text,
      image: question.number === 2 ? {
        src: choiceAssets[index].src,
        alt: choiceAssets[index].alt,
        width: 1200,
        height: question.choiceHeight,
        downloadName: choiceAssets[index].downloadName,
      } : undefined,
    })),
    correctAnswer: question.answer,
    solution: question.solution,
  };
});

export const apcMechanicsRotationTest16Audit = {
  bankId: bank.bankId,
  sourcePage: bank.sourcePage,
  rightsStatus: bank.rightsStatus,
  reviewStatus: bank.reviewStatus,
  collectionScope: bank.collectionScope,
  sourceAnswers: bank.questions.map(({ sourceQuestionId, sourceAnswer }) => ({
    sourceQuestionId,
    sourceAnswer,
  })),
};
