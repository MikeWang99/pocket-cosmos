import bank from './fmaQuestionBankV5.json';
import type { PracticeSet } from './practiceSets';
import type { PracticeStep } from '../types/practice';
import { fmaCompetitionSet } from './fmaHistoricalCompetition';

type RebuildQuestion = (typeof bank)[number];

const assetRoot = '/fma-v5-assets';

const pad = (value: number) => String(value).padStart(2, '0');

const specialtyForTopic = (topic: string): string => {
  const value = topic.toLowerCase();
  if (value.includes('projectile')) return 'Projectile motion & components';
  if (value.includes('kinematic')) return 'Kinematics & motion graphs';
  if (value.includes('momentum') && value.includes('center')) return 'Center of mass & systems';
  if (value.includes('momentum')) return 'Momentum & collisions';
  if (value.includes('gravitation')) return 'Gravitation & orbital motion';
  if (value.includes('rotation') || value.includes('statics')) return 'Rotation, torque & rolling';
  if (value.includes('oscillation')) return 'Oscillations & waves';
  if (value.includes('work')) return 'Work, energy & power';
  if (value.includes('elastic')) return 'Materials & elasticity';
  if (value.includes('fluid')) return 'Fluids, pressure & buoyancy';
  return "Newton's laws & friction";
};

const sourceStepFor = (year: number, number: number): PracticeStep | undefined => {
  const id = year === 2008
    ? `fma-2008-q${pad(number)}`
    : `fma-${year}-main-q${pad(number)}`;
  return fmaCompetitionSet.steps.find((step) => step.id === id);
};

const sourceAsset = (name: string, questionId: string, kind: 'stem' | 'choice'): NonNullable<PracticeStep['assets']>[number] => ({
  id: `fma-v5-${questionId.toLowerCase()}-${kind}-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
  kind,
  src: `${assetRoot}/${name}`,
  alt: `${questionId} ${kind} asset`,
  downloadName: name,
});

const makePrompt = (context: string, stem: string) => {
  const cleanedContext = context.trim();
  return cleanedContext ? `${cleanedContext}\n\n${stem}` : stem;
};

export const fmaQuestionBankV5Steps: PracticeStep[] = (bank as RebuildQuestion[]).map((question) => {
  const source = question.source_data;
  const year = Number(source.source_file.slice(0, 4));
  const number = Number(source.source_question_number);
  const questionId = question.question_id;
  const sourceStep = sourceStepFor(year, number);
  const figures = source.question_figures.map((name) => ({
    src: `${assetRoot}/${name}`,
    alt: `${questionId} supporting figure`,
    downloadName: name,
  }));
  const optionImages = new Map(
    source.options
      .filter((option) => option.image_file)
      .map((option) => [option.label, option.image_file as string]),
  );
  const assets = [
    ...source.question_figures.map((name) => sourceAsset(name, questionId, 'stem')),
    ...source.options.flatMap((option) => option.image_file ? [sourceAsset(option.image_file, questionId, 'choice')] : []),
  ];

  return {
    id: `fma-v5-${questionId.toLowerCase()}`,
    mode: 'multiple_choice',
    difficulty: question.metadata.difficulty.overall,
    title: `Question ${number}`,
    prompt: makePrompt(source.context, source.stem),
    context: source.context,
    specialtyTags: [specialtyForTopic(question.metadata.topic)],
    sourceYear: year,
    supportingImages: figures,
    assets,
    maxScore: 1,
    source: 'F=ma Competition · New Question',
    answerNudge: question.metadata.topic,
    criteria: [],
    choices: source.options.map((option) => {
      const imageName = optionImages.get(option.label);
      return {
        label: option.label,
        text: option.text,
        image: imageName ? {
          src: `${assetRoot}/${imageName}`,
          alt: `${questionId} option ${option.label}`,
          downloadName: imageName,
        } : undefined,
      };
    }),
    correctAnswer: sourceStep?.correctAnswer,
    solution: sourceStep?.solution ?? 'Answer explanation is pending source-key review.',
  };
});

export const fmaQuestionBankV5Set: PracticeSet = {
  id: 'fma-competition-new-question',
  category: 'mechanics',
  label: 'New Question',
  title: 'New Question',
  subtitle: `${fmaQuestionBankV5Steps.length} rebuilt F=ma questions from 2008–2011`,
  eyebrow: 'F=ma Competition · New Question',
  description: 'A rebuilt question set with separated stems, supporting figures, and image-based answer choices for review.',
  steps: fmaQuestionBankV5Steps,
  sources: [
    { label: 'F=ma Question Bank v5 Rebuild', url: '/fma-v5-assets/shared-source-provenance.json' },
    { label: 'Image QA report', url: '/fma-v5-assets/image-asset-qa.json' },
  ],
  practiceKind: 'mcq',
  system: 'competition',
  chapter: 2,
  chapterTitle: 'New Question',
};
