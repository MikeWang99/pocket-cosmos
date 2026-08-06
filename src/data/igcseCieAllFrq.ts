import type { PracticeStep } from '../types/practice';
import frqRecords from './igcseCieAllFrq.json';

interface FrqRecord {
  id: string;
  topicId: string;
  topicTitle: string;
  unitCode: string;
  questionNumber: number;
  difficulty: number;
  marks: number;
  questionImage: string;
  answerImage: string;
  ocrText: string;
}

const records = frqRecords as FrqRecord[];

const toPracticeStep = (record: FrqRecord): PracticeStep => ({
  id: record.id,
  mode: 'free_response',
  difficulty: record.difficulty,
  title: `${record.topicId} · Q${record.questionNumber} (${record.marks} marks)`,
  prompt: record.ocrText || 'Study the question image and write your full answer.',
  context: `CIE IGCSE Physics · ${record.topicId} ${record.topicTitle} · ${record.marks} marks`,
  tags: [
    'CIE IGCSE Physics',
    'Structured Question',
    record.topicId,
    record.topicTitle,
    `Difficulty ${record.difficulty}`,
    `${record.marks} marks`,
  ],
  maxScore: record.marks,
  source: `CIE IGCSE Physics 0625 · ${record.topicId} ${record.topicTitle}`,
  answerNudge: 'Write a complete answer covering all marking points, then check against the mark scheme image.',
  criteria: [
    {
      id: `${record.id}-method`,
      label: 'Method',
      point: 'Correct approach and working shown',
      keywords: ['calculate', 'use', 'apply', 'formula', 'equation'],
      feedback: 'Show your method clearly with the relevant formula or reasoning.',
    },
    {
      id: `${record.id}-answer`,
      label: 'Answer',
      point: 'Correct final answer with units',
      keywords: ['answer', 'result', 'therefore', 'equals', 'unit'],
      feedback: 'State your final answer clearly with correct units.',
    },
  ],
  image: {
    src: record.questionImage,
    alt: `CIE IGCSE Physics ${record.topicId} Q${record.questionNumber}`,
    caption: `${record.topicTitle} · ${record.marks} marks`,
    role: 'question',
  },
  assets: record.answerImage
    ? [
        {
          id: `${record.id}-mark-scheme`,
          kind: 'source' as const,
          src: record.answerImage,
          alt: `Mark scheme for ${record.topicId} Q${record.questionNumber}`,
          downloadName: `${record.topicId}-q${record.questionNumber}-mark-scheme.png`,
        },
      ]
    : undefined,
  solution: record.answerImage
    ? 'See the mark scheme image below for the official answer.'
    : 'See the official mark scheme for the answer.',
});

/** Topic metadata for FRQ sets */
export interface FrqTopicInfo {
  topicId: string;
  topicTitle: string;
  shortLabel: string;
  chapter: number;
  chapterTitle: string;
  count: number;
}

export const frqTopics: FrqTopicInfo[] = [
  { topicId: '1.1', topicTitle: 'Physical Quantities and Measurement', shortLabel: '1.1 Measurement FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.2', topicTitle: 'Motion', shortLabel: '1.2 Motion FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.3', topicTitle: 'Mass and Weight', shortLabel: '1.3 Mass FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.4', topicTitle: 'Density', shortLabel: '1.4 Density FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.5', topicTitle: 'Forces', shortLabel: '1.5 Forces FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.6', topicTitle: 'Momentum', shortLabel: '1.6 Momentum FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.7', topicTitle: 'Energy, Work and Power', shortLabel: '1.7 Energy FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '1.8', topicTitle: 'Pressure', shortLabel: '1.8 Pressure FRQ', chapter: 1, chapterTitle: 'Motion, Forces and Energy', count: 0 },
  { topicId: '2.1', topicTitle: 'Kinetic Particle Model', shortLabel: '2.1 Kinetic FRQ', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  { topicId: '2.2', topicTitle: 'Thermal Properties', shortLabel: '2.2 Thermal FRQ', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  { topicId: '2.3', topicTitle: 'Transfer of Thermal Energy', shortLabel: '2.3 Transfer FRQ', chapter: 2, chapterTitle: 'Thermal Physics', count: 0 },
  { topicId: '3.1', topicTitle: 'General Properties of Waves', shortLabel: '3.1 Waves FRQ', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.2', topicTitle: 'Light', shortLabel: '3.2 Light FRQ', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.3', topicTitle: 'Electromagnetic Spectrum', shortLabel: '3.3 EM FRQ', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '3.4', topicTitle: 'Sound', shortLabel: '3.4 Sound FRQ', chapter: 3, chapterTitle: 'Waves, Light and Sound', count: 0 },
  { topicId: '4.1', topicTitle: 'Simple Phenomena of Magnetism', shortLabel: '4.1 Magnetism FRQ', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.2', topicTitle: 'Electrical Quantities', shortLabel: '4.2 Elec FRQ', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.3', topicTitle: 'Electric Circuits', shortLabel: '4.3 Circuits FRQ', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.4', topicTitle: 'Electrical Safety', shortLabel: '4.4 Safety FRQ', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '4.5', topicTitle: 'Electromagnetic Effects', shortLabel: '4.5 EM Effects FRQ', chapter: 4, chapterTitle: 'Electricity and Magnetism', count: 0 },
  { topicId: '5.1', topicTitle: 'The Nuclear Model', shortLabel: '5.1 Nuclear FRQ', chapter: 5, chapterTitle: 'Atomic Physics', count: 0 },
  { topicId: '5.2', topicTitle: 'Radioactivity', shortLabel: '5.2 Radioactivity FRQ', chapter: 5, chapterTitle: 'Atomic Physics', count: 0 },
  { topicId: '6.1', topicTitle: 'Earth and the Solar System', shortLabel: '6.1 Solar FRQ', chapter: 6, chapterTitle: 'Space Physics', count: 0 },
  { topicId: '6.2', topicTitle: 'Stars and the Universe', shortLabel: '6.2 Stars FRQ', chapter: 6, chapterTitle: 'Space Physics', count: 0 },
];

// Populate counts
frqTopics.forEach((topic) => {
  topic.count = records.filter((r) => r.topicId === topic.topicId).length;
});

const sources = [
  {
    label: 'Physics & Maths Tutor · CIE IGCSE Physics',
    url: 'https://www.physicsandmathstutor.com/physics-revision/igcse-cie/',
  },
];

/** Per-topic FRQ practice steps */
export const frqTopicSteps: Record<string, PracticeStep[]> = {};
frqTopics.forEach((topic) => {
  frqTopicSteps[topic.topicId] = records
    .filter((r) => r.topicId === topic.topicId)
    .sort((a, b) => a.questionNumber - b.questionNumber)
    .map(toPracticeStep);
});

/** Per-topic FRQ meta */
export const frqTopicMeta: Record<string, { title: string; subtitle: string; eyebrow: string; description: string; sources: typeof sources }> = {};
frqTopics.forEach((topic) => {
  frqTopicMeta[topic.topicId] = {
    title: `${topic.topicId} ${topic.topicTitle} · Structured Questions`,
    subtitle: `${topic.count} structured questions · Free response`,
    eyebrow: `CIE IGCSE Physics 0625 · Chapter ${topic.chapter}`,
    description: `Practice ${topic.count} structured/free-response questions on ${topic.topicTitle}. Write your answer then check the official mark scheme.`,
    sources,
  };
});
