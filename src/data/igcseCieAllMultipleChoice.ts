import type { PracticeStep } from '../types/practice';
import questionRecords from './igcseCieAllMcq.json';

interface IgcseRecord {
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

const records = questionRecords as IgcseRecord[];

const choices = ['A', 'B', 'C', 'D'].map((label) => ({
  label,
  text: '',
}));

const toPracticeStep = (record: IgcseRecord): PracticeStep => ({
  id: record.id,
  mode: 'multiple_choice',
  difficulty: record.difficulty,
  title: `${record.topicId} · Q${record.questionNumber}`,
  prompt: 'Select the correct option(s) using the stem, diagram, and choices shown in the question image.',
  context: `CIE IGCSE Physics · ${record.topicId} ${record.topicTitle}`,
  choices,
  correctAnswer: record.answer,
  solution: record.explanation,
  tags: [
    'CIE IGCSE Physics',
    record.topicId,
    record.topicTitle,
    `Difficulty ${record.difficulty}`,
  ],
  maxScore: 1,
  source: `CIE IGCSE Physics 0625 · ${record.topicId} ${record.topicTitle}`,
  answerNudge: 'Study the diagram and question stem carefully, then select all correct options.',
  criteria: [],
  image: {
    src: record.image,
    alt: `CIE IGCSE Physics ${record.topicId} Q${record.questionNumber}`,
    caption: `${record.topicTitle}`,
    role: 'question',
  },
});

export interface IgcseAllTopicInfo {
  topicId: string;
  topicTitle: string;
  shortLabel: string;
  chapter: number;
  chapterTitle: string;
  count: number;
}

export const igcseAllTopics: IgcseAllTopicInfo[] = [
  // Chapter 1: Motion, Forces and Energy
  { topicId: '1.1', topicTitle: 'Physical Quantities and Measurement Techniques', shortLabel: '1.1 Measurement', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.2', topicTitle: 'Motion', shortLabel: '1.2 Motion', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.3', topicTitle: 'Mass and Weight', shortLabel: '1.3 Mass & Weight', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.4', topicTitle: 'Density', shortLabel: '1.4 Density', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.5', topicTitle: 'Forces', shortLabel: '1.5 Forces', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.6', topicTitle: 'Momentum', shortLabel: '1.6 Momentum', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.7', topicTitle: 'Energy, Work and Power', shortLabel: '1.7 Energy & Power', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.8', topicTitle: 'Pressure', shortLabel: '1.8 Pressure', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  // Chapter 2: Thermal Physics
  { topicId: '2.1', topicTitle: 'Kinetic Particle Model of Matter', shortLabel: '2.1 Kinetic Model', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  { topicId: '2.2', topicTitle: 'Thermal Properties and Temperature', shortLabel: '2.2 Thermal Props', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  { topicId: '2.3', topicTitle: 'Transfer of Thermal Energy', shortLabel: '2.3 Heat Transfer', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  // Chapter 3: Properties of Waves, Light and Sound
  { topicId: '3.1', topicTitle: 'General Properties of Waves', shortLabel: '3.1 Waves', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.2', topicTitle: 'Light', shortLabel: '3.2 Light', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.3', topicTitle: 'Electromagnetic Spectrum', shortLabel: '3.3 EM Spectrum', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.4', topicTitle: 'Sound', shortLabel: '3.4 Sound', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  // Chapter 4: Electricity and Magnetism
  { topicId: '4.1', topicTitle: 'Simple Phenomena of Magnetism', shortLabel: '4.1 Magnetism', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.2', topicTitle: 'Electrical Quantities', shortLabel: '4.2 Elec. Quantities', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.3', topicTitle: 'Electric Circuits', shortLabel: '4.3 Circuits', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.4', topicTitle: 'Electrical Safety', shortLabel: '4.4 Safety', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.5', topicTitle: 'Electromagnetic Effects', shortLabel: '4.5 EM Effects', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  // Chapter 5: Atomic Physics
  { topicId: '5.1', topicTitle: 'The Nuclear Model of the Atom', shortLabel: '5.1 Nuclear Model', chapter: 5, chapterTitle: 'Atomic Physics', count: 0 },
  { topicId: '5.2', topicTitle: 'Radioactivity', shortLabel: '5.2 Radioactivity', chapter: 5, chapterTitle: 'Atomic Physics', count: 0 },
  // Chapter 6: Space Physics
  { topicId: '6.1', topicTitle: 'Earth and the Solar System', shortLabel: '6.1 Solar System', chapter: 6, chapterTitle: 'Space Physics', count: 0 },
  { topicId: '6.2', topicTitle: 'Stars and the Universe', shortLabel: '6.2 Stars & Universe', chapter: 6, chapterTitle: 'Space Physics', count: 0 },
];

// Populate counts
igcseAllTopics.forEach((topic) => {
  topic.count = records.filter((r) => r.topicId === topic.topicId).length;
});

export const igcseChapters = [
  { id: 1, title: 'Motion, Forces and Energy' },
  { id: 2, title: 'Thermal Physics' },
  { id: 3, title: 'Properties of Waves, Light and Sound' },
  { id: 4, title: 'Electricity and Magnetism' },
  { id: 5, title: 'Atomic Physics' },
  { id: 6, title: 'Space Physics' },
];

const sources = [
  {
    label: 'Physics & Maths Tutor · CIE IGCSE Physics',
    url: 'https://www.physicsandmathstutor.com/physics-revision/igcse-cie/',
  },
];

/** Per-topic practice steps */
export const igcseAllTopicSteps: Record<string, PracticeStep[]> = {};
igcseAllTopics.forEach((topic) => {
  igcseAllTopicSteps[topic.topicId] = records
    .filter((r) => r.topicId === topic.topicId)
    .sort((a, b) => a.questionNumber - b.questionNumber)
    .map(toPracticeStep);
});

/** Direct lookup for curated assignments that preserve a deliberate question order. */
export const igcseAllStepById: Record<string, PracticeStep> = Object.fromEntries(
  records.map((record) => [record.id, toPracticeStep(record)]),
);

/** Per-topic meta */
export const igcseAllTopicMeta: Record<string, { title: string; subtitle: string; eyebrow: string; description: string; sources: typeof sources }> = {};
igcseAllTopics.forEach((topic) => {
  igcseAllTopicMeta[topic.topicId] = {
    title: `${topic.topicId} ${topic.topicTitle}`,
    subtitle: `${topic.count} MCQ questions · Multi-select`,
    eyebrow: `CIE IGCSE Physics 0625 · Chapter ${topic.chapter}`,
    description: `Practice ${topic.count} multiple-choice questions on ${topic.topicTitle}. Select all correct answers for each question.`,
    sources,
  };
});
