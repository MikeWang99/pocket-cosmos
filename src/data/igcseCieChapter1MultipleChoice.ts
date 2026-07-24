import type { PracticeStep } from '../types/practice';
import questionRecords from './igcseCieChapter1Mcq.json';

interface IgcseChapter1Record {
  id: string;
  topicId: string;
  topicTitle: string;
  questionNumber: number;
  difficulty: number;
  answer: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  explanation: string;
}

const records = questionRecords as IgcseChapter1Record[];

const choices = ['A', 'B', 'C', 'D'].map((label) => ({
  label,
  text: `Option ${label}`,
}));

const toPracticeStep = (record: IgcseChapter1Record): PracticeStep => ({
  id: record.id,
  mode: 'multiple_choice',
  title: `${record.topicId} · Question ${record.questionNumber}`,
  prompt: 'Select the correct option using the stem, diagram, and choices shown in the question image.',
  context: `CIE IGCSE Physics · Chapter 1 · ${record.topicTitle}`,
  choices,
  correctAnswer: record.answer,
  solution: record.explanation,
  tags: [
    'CIE IGCSE Physics',
    'Chapter 1',
    record.topicId,
    record.topicTitle,
    `Difficulty ${record.difficulty}`,
  ],
  maxScore: 1,
  source: `CIE IGCSE Physics · ${record.topicId} · Difficulty ${record.difficulty}`,
  answerNudge: 'Identify the quantity or principle being tested, then eliminate options that conflict with units, direction, or the stated physical model.',
  criteria: [],
  image: {
    src: record.image,
    alt: `CIE IGCSE Physics ${record.topicId} question ${record.questionNumber}, including the complete stem, diagram, and answer choices.`,
    caption: `${record.topicTitle} · Difficulty ${record.difficulty}`,
    role: 'question',
  },
});

export const igcseCieChapter1ClassroomSteps = records
  .filter((record) => record.difficulty <= 2)
  .map(toPracticeStep);

export const igcseCieChapter1HomeworkSteps = records
  .filter((record) => record.difficulty >= 3)
  .map(toPracticeStep);

const sources = [
  {
    label: 'Physics & Maths Tutor · CIE IGCSE Physics',
    url: 'https://www.physicsandmathstutor.com/physics-revision/igcse-cie/',
  },
  {
    label: 'Cambridge IGCSE Physics 0625',
    url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/',
  },
];

export const igcseCieChapter1ClassroomMeta = {
  title: 'CIE IGCSE Physics: Chapter 1 Classroom Practice',
  subtitle: 'Difficulty 1–2 multiple-choice questions',
  eyebrow: 'CIE IGCSE Physics 0625',
  description:
    'Foundation and standard questions from Motion, Forces and Energy. Each item uses the complete source image as the question and provides instant answer checking.',
  sources,
};

export const igcseCieChapter1HomeworkMeta = {
  title: 'CIE IGCSE Physics: Chapter 1 Homework',
  subtitle: 'Difficulty 3–5 multiple-choice questions',
  eyebrow: 'CIE IGCSE Physics 0625',
  description:
    'Independent consolidation and challenge questions from Motion, Forces and Energy, grouped for homework with saved progress and answer review.',
  sources,
};
