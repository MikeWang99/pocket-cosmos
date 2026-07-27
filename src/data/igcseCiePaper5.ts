import type { PracticeStep } from '../types/practice';
import paper5Records from './igcseCiePaper5.json';

interface Paper5Record {
  id: string;
  year: number;
  session: string;
  variant: number;
  questionNumber: number;
  title: string;
  difficulty: number;
  chapter: { code: string; unit: string; chapter: string; score: number; evidence: string[] } | string;
  practicalType: string;
  questionImage: string;
  answerImage: string;
  ocrText: string;
  skills: string[];
}

const records = paper5Records as Paper5Record[];

const toPracticeStep = (record: Paper5Record): PracticeStep => ({
  id: record.id,
  mode: 'free_response',
  difficulty: record.difficulty,
  title: `${record.year} ${record.session} V${record.variant} · Q${record.questionNumber}`,
  prompt: record.ocrText || 'Study the practical question image and describe your method, results, and conclusions.',
  context: `CIE IGCSE Physics Paper 5 · ${record.year} ${record.session} · ${record.title}`,
  tags: [
    'CIE IGCSE Physics',
    'Paper 5 Practical',
    `${record.year}`,
    record.practicalType,
    `Difficulty ${record.difficulty}`,
    ...record.skills.slice(0, 3),
  ],
  maxScore: 10,
  source: `CIE IGCSE Physics 0625 Paper 5 · ${record.year} ${record.session} V${record.variant}`,
  answerNudge: 'Describe the method, record results in a table, plot a graph if required, and state your conclusion with evidence.',
  criteria: [
    {
      id: `${record.id}-method`,
      label: 'Method',
      point: 'Clear, logical experimental method with apparatus',
      keywords: ['measure', 'record', 'apparatus', 'method', 'procedure', 'step'],
      feedback: 'Describe a clear step-by-step method with appropriate apparatus.',
    },
    {
      id: `${record.id}-data`,
      label: 'Data & Table',
      point: 'Results recorded in a suitable table with units',
      keywords: ['table', 'results', 'units', 'record', 'data', 'values'],
      feedback: 'Record results in a well-structured table with column headings and units.',
    },
    {
      id: `${record.id}-graph`,
      label: 'Graph / Analysis',
      point: 'Graph plotted correctly or data analysed appropriately',
      keywords: ['graph', 'plot', 'axis', 'gradient', 'line', 'best fit'],
      feedback: 'Plot a clear graph with labelled axes, correct scale, and line of best fit.',
    },
    {
      id: `${record.id}-conclusion`,
      label: 'Conclusion',
      point: 'Valid conclusion supported by evidence',
      keywords: ['conclusion', 'therefore', 'shows', 'proportional', 'relationship'],
      feedback: 'State a conclusion that directly references your results.',
    },
  ],
  image: {
    src: record.questionImage,
    alt: `CIE IGCSE Paper 5 ${record.year} ${record.session} Q${record.questionNumber}`,
    caption: record.title,
    role: 'question',
  },
  solution: `See the mark scheme image for the official answer.`,
});

/** Year groupings for Paper 5 sets */
export interface Paper5YearInfo {
  year: number;
  label: string;
  count: number;
}

export const paper5Years: Paper5YearInfo[] = [2019, 2020, 2021, 2022, 2023, 2024].map((year) => ({
  year,
  label: `${year} Paper 5`,
  count: records.filter((r) => r.year === year).length,
}));

const sources = [
  {
    label: 'Cambridge IGCSE Physics 0625 Past Papers',
    url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/',
  },
];

/** Per-year Paper 5 practice steps */
export const paper5YearSteps: Record<number, PracticeStep[]> = {};
paper5Years.forEach(({ year }) => {
  paper5YearSteps[year] = records
    .filter((r) => r.year === year)
    .sort((a, b) => a.variant - b.variant || a.questionNumber - b.questionNumber)
    .map(toPracticeStep);
});

/** Per-year Paper 5 meta */
export const paper5YearMeta: Record<number, { title: string; subtitle: string; eyebrow: string; description: string; sources: typeof sources }> = {};
paper5Years.forEach(({ year, count }) => {
  paper5YearMeta[year] = {
    title: `${year} Paper 5 Practical Test`,
    subtitle: `${count} practical questions · Experimental design`,
    eyebrow: 'CIE IGCSE Physics 0625 · Paper 5',
    description: `Practice ${count} practical test questions from ${year}. Covers experimental method, data collection, graph plotting, and evaluation.`,
    sources,
  };
});
