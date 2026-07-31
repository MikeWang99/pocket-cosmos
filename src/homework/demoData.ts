import { practiceSets } from '../data/practiceSets';
import type { HomeworkAssignment, HomeworkAttempt, HomeworkProfile } from './types';

const now = new Date();
const addDays = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();
const subtractDays = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

const makeAssignment = (
  id: string,
  title: string,
  description: string,
  setId: string,
  questionIndexes: number[],
  dueInDays: number,
  status: 'draft' | 'published' = 'published',
): HomeworkAssignment => {
  const set = practiceSets.find((candidate) => candidate.id === setId) ?? practiceSets[0];
  const createdAt = subtractDays(2);
  return {
    id,
    title,
    description,
    status,
    sourceType: 'manual',
    dueAt: addDays(dueInDays),
    publishedAt: status === 'published' ? subtractDays(1) : null,
    assignedToAll: false,
    createdAt,
    updatedAt: createdAt,
    studentIds: ['demo-student-eden', 'demo-student-maya'],
    items: questionIndexes.map((questionIndex, position) => {
      const step = set.steps[questionIndex] ?? set.steps[position];
      return {
        id: `${id}-item-${position + 1}`,
        assignmentId: id,
        position,
        practiceSetId: set.id,
        questionId: step.id,
        practiceSetTitle: set.title,
        questionTitle: step.title,
      };
    }),
  };
};

export const demoProfiles: HomeworkProfile[] = [
  { userId: 'demo-student-eden', email: 'eden@example.com', displayName: 'Eden' },
  { userId: 'demo-student-maya', email: 'maya@example.com', displayName: 'Maya' },
];

export const createDemoAssignments = (): HomeworkAssignment[] => [
  makeAssignment(
    'demo-assignment-motion',
    'Motion Foundations · Lesson 04',
    'Review speed, acceleration, and motion graphs. Complete the questions in order.',
    'igcse-cie-topic-1-2',
    [0, 2, 5, 8, 12, 18, 24, 30],
    3,
  ),
  makeAssignment(
    'demo-assignment-forces',
    'Forces Consolidation · Lesson 05',
    'A short mixed set on resultant force, equilibrium, and force analysis.',
    'igcse-cie-topic-1-5',
    [0, 4, 9, 14, 20, 27],
    8,
  ),
  makeAssignment(
    'demo-assignment-draft',
    'Energy Review · Draft',
    'Draft homework prepared for the next lesson.',
    'igcse-cie-topic-1-7',
    [1, 5, 10, 16, 23],
    12,
    'draft',
  ),
];

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
    ...first.items.slice(0, 6).map((item, index): HomeworkAttempt => ({
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

