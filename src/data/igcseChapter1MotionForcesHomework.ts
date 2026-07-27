import { igcseAllStepById } from './igcseCieAllMultipleChoice';
import type { PracticeStep } from '../types/practice';

const selectedQuestionIds = [
  // Medium: build from motion interpretation into force reasoning.
  'igcse-cie-ch1-1-2-q038',
  'igcse-cie-ch1-1-2-q040',
  'igcse-cie-ch1-1-2-q047',
  'igcse-cie-ch1-1-2-q049',
  'igcse-cie-ch1-1-3-q037',
  'igcse-cie-ch1-1-3-q038',
  'igcse-cie-ch1-1-3-q042',
  'igcse-cie-ch1-1-5-q066',
  'igcse-cie-ch1-1-5-q068',
  'igcse-cie-ch1-1-5-q074',
  // Advanced: graph reasoning, gravitational fields, resultants, F = ma, and Hooke's law.
  'igcse-cie-ch1-1-2-q053',
  'igcse-cie-ch1-1-2-q058',
  'igcse-cie-ch1-1-2-q059',
  'igcse-cie-ch1-1-3-q046',
  'igcse-cie-ch1-1-3-q047',
  'igcse-cie-ch1-1-5-q083',
  'igcse-cie-ch1-1-5-q087',
  'igcse-cie-ch1-1-5-q090',
  'igcse-cie-ch1-1-5-q093',
  'igcse-cie-ch1-1-5-q099',
] as const;

const getQuestion = (id: string): PracticeStep => {
  const question = igcseAllStepById[id];
  if (!question) {
    throw new Error(`Missing IGCSE homework question: ${id}`);
  }
  return question;
};

export const igcseChapter1MotionForcesHomeworkSteps =
  selectedQuestionIds.map(getQuestion);

export const igcseChapter1MotionForcesHomeworkMeta = {
  title: 'Chapter 1 Homework: Motion, Mass and Weight, and Forces',
  subtitle: '20 selected MCQs · 10 medium + 10 advanced',
  eyebrow: 'CIE IGCSE Physics 0625 · Assigned Practice',
  description:
    'A sequenced homework set covering motion graphs, average speed, mass and weight, gravitational field strength, resultant force, equilibrium, friction, Newton\'s second law, and Hooke\'s law.',
  sources: [
    {
      label: 'Physics & Maths Tutor · CIE IGCSE Physics',
      url: 'https://www.physicsandmathstutor.com/physics-revision/igcse-cie/',
    },
  ],
};
