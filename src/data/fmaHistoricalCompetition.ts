import generated from './fmaHistoricalCompetition.generated.json';
import type { PracticeSet } from './practiceSets';
import type { PracticeStep } from '../types/practice';
import { fma2008CompetitionSets } from './fma2008Competition';

export const fmaSpecialties = [
  'Kinematics & motion graphs',
  'Projectile motion & components',
  "Newton's laws & friction",
  'Momentum & collisions',
  'Center of mass & systems',
  'Rotation, torque & rolling',
  'Work, energy & power',
  'Oscillations & waves',
  'Gravitation & orbital motion',
  'Fluids, pressure & buoyancy',
  'Materials & elasticity',
  'Data, measurement & dimensional analysis',
] as const;

type GeneratedQuestion = (typeof generated.questions)[number];

const normalizeSpecialty = (title: string): string => {
  const value = title.toLowerCase();
  if (value.includes('projectile')) return 'Projectile motion & components';
  if (value.includes('momentum') && value.includes('center')) return 'Center of mass & systems';
  if (value.includes('momentum')) return 'Momentum & collisions';
  if (value.includes('gravitation') || value.includes('orbit')) return 'Gravitation & orbital motion';
  if (value.includes('oscillat')) return 'Oscillations & waves';
  if (value.includes('fluid') || value.includes('pressure')) return 'Fluids, pressure & buoyancy';
  if (value.includes('elastic')) return 'Materials & elasticity';
  if (value.includes('work') || value.includes('energy')) return 'Work, energy & power';
  if (value.includes('kinematic')) return 'Kinematics & motion graphs';
  if (value.includes('rotation') || value.includes('static')) return 'Rotation, torque & rolling';
  return "Newton's laws & friction";
};

const makeChoiceSet = () => ['A', 'B', 'C', 'D', 'E'].map((label) => ({ label, text: '' }));

const generatedSteps: PracticeStep[] = (generated.questions as GeneratedQuestion[]).map((question) => ({
  id: question.id,
  mode: 'multiple_choice',
  title: `Question ${question.number}`,
  prompt: 'Select the correct option.',
  context: '',
  specialtyTags: [question.specialty],
  sourceYear: question.year,
  image: {
    src: question.image,
    alt: `F=ma competition question ${question.number}`,
    role: 'question',
    responsive: true,
    downloadName: `${question.id}.png`,
  },
  maxScore: 1,
  source: 'F=ma Competition',
  answerNudge: question.specialty,
  criteria: [],
  choices: makeChoiceSet(),
  correctAnswer: question.answer,
  solution: `Correct answer: ${question.answer}.`,
}));

const legacySteps: PracticeStep[] = fma2008CompetitionSets.flatMap((set) =>
  set.steps.map((step) => ({
    ...step,
    source: 'F=ma Competition',
    tags: undefined,
    specialtyTags: [normalizeSpecialty(set.chapterTitle ?? '')],
  })),
);

export const fmaCompetitionSteps: PracticeStep[] = [...legacySteps, ...generatedSteps];

export const fmaCompetitionSet: PracticeSet = {
  id: 'fma-competition-bank',
  category: 'mechanics',
  label: 'All questions',
  title: 'F=ma Competition',
  subtitle: `${fmaCompetitionSteps.length} model-based multiple-choice questions`,
  eyebrow: 'F=ma Competition',
  description: 'Historical F=ma questions organized by the underlying problem model.',
  steps: fmaCompetitionSteps,
  sources: [
    { label: 'AAPT F=ma historical exams (2008–2020)', url: '/fma-historical-assets/source-inventory.json' },
  ],
  practiceKind: 'mcq',
  system: 'competition',
  chapter: 1,
  chapterTitle: 'F=ma Competition',
};
