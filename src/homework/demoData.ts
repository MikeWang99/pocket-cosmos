import type { HomeworkAssignment, HomeworkAttempt, HomeworkProfile } from './types';

const now = new Date();
const addDays = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();
const subtractDays = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

type DemoAssignmentSeed = {
  id: string;
  title: string;
  description: string;
  setId: string;
  setTitle: string;
  questionIds: string[];
  dueInDays: number;
  status?: 'draft' | 'published';
};

const DEMO_ASSIGNMENT_SEEDS: DemoAssignmentSeed[] = [
  {
    id: 'demo-assignment-motion',
    title: 'Motion Foundations · Lesson 04',
    description: 'Review speed, acceleration, and motion graphs. Complete the questions in order.',
    setId: 'demo-motion-foundations',
    setTitle: 'Motion Foundations',
    questionIds: ['motion-01', 'motion-02', 'motion-03', 'motion-04', 'motion-05', 'motion-06'],
    dueInDays: 3,
  },
  {
    id: 'demo-assignment-forces',
    title: 'Forces Consolidation · Lesson 05',
    description: 'A short mixed set on resultant force, equilibrium, and force analysis.',
    setId: 'demo-force-consolidation',
    setTitle: 'Force Consolidation',
    questionIds: ['force-01', 'force-02', 'force-03', 'force-04'],
    dueInDays: 8,
  },
  {
    id: 'demo-assignment-draft',
    title: 'Energy Review · Draft',
    description: 'Draft homework prepared for the next lesson.',
    setId: 'demo-energy-review',
    setTitle: 'Energy Review',
    questionIds: ['energy-01', 'energy-02', 'energy-03'],
    dueInDays: 12,
    status: 'draft',
  },
];

const makeAssignment = (seed: DemoAssignmentSeed): HomeworkAssignment => {
  const createdAt = subtractDays(2);
  const status = seed.status ?? 'published';

  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    status,
    sourceType: 'manual',
    dueAt: addDays(seed.dueInDays),
    publishedAt: status === 'published' ? subtractDays(1) : null,
    assignedToAll: false,
    createdAt,
    updatedAt: createdAt,
    studentIds: ['demo-student-eden', 'demo-student-maya'],
    items: seed.questionIds.map((questionId, position) => ({
      id: `${seed.id}-item-${position + 1}`,
      assignmentId: seed.id,
      position,
      practiceSetId: seed.setId,
      questionId,
      practiceSetTitle: seed.setTitle,
      questionTitle: `Question ${position + 1}`,
    })),
  };
};

export const demoProfiles: HomeworkProfile[] = [
  { userId: 'demo-student-eden', email: 'eden@example.com', displayName: 'Eden' },
  { userId: 'demo-student-maya', email: 'maya@example.com', displayName: 'Maya' },
];

export const createDemoAssignments = (): HomeworkAssignment[] =>
  DEMO_ASSIGNMENT_SEEDS.map(makeAssignment);

const emptyResult = (isCorrect: boolean) => ({
  score: isCorrect ? 1 : 0,
  maxScore: 1,
  hits: [],
  misses: [],
  suggestions: [],
});

export const createDemoAttempts = (assignments: HomeworkAssignment[]): HomeworkAttempt[] => {
  const first = assignments[0];
  if (!first) return [];

  return [
    {
      studentId: 'demo-student-eden',
      studentEmail: 'eden@example.com',
      practiceSetId: first.items[0].practiceSetId,
      questionId: first.items[0].questionId,
      answer: 'A',
      score: 1,
      maxScore: 1,
      isCorrect: true,
      result: emptyResult(true),
      updatedAt: subtractDays(1),
    },
    {
      studentId: 'demo-student-eden',
      studentEmail: 'eden@example.com',
      practiceSetId: first.items[1].practiceSetId,
      questionId: first.items[1].questionId,
      answer: 'C',
      score: 0,
      maxScore: 1,
      isCorrect: false,
      result: emptyResult(false),
      updatedAt: subtractDays(1),
    },
    ...first.items.slice(0, 5).map((item, index): HomeworkAttempt => ({
      studentId: 'demo-student-maya',
      studentEmail: 'maya@example.com',
      practiceSetId: item.practiceSetId,
      questionId: item.questionId,
      answer: index === 2 ? 'B' : 'A',
      score: index === 2 ? 0 : 1,
      maxScore: 1,
      isCorrect: index !== 2,
      result: emptyResult(index !== 2),
      updatedAt: subtractDays(1),
    })),
  ];
};
