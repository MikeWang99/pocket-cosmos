import type { EvaluationResult, PracticeStep } from '../types/practice';

export type AssignmentStatus = 'draft' | 'published' | 'archived';
export type AssignmentSourceType = 'manual' | 'ai';

export interface HomeworkItem {
  id: string;
  assignmentId: string;
  position: number;
  practiceSetId: string;
  questionId: string;
  practiceSetTitle?: string;
  questionTitle?: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  status: AssignmentStatus;
  sourceType: AssignmentSourceType;
  dueAt: string | null;
  publishedAt: string | null;
  assignedToAll: boolean;
  createdAt: string;
  updatedAt: string;
  aiInstruction?: string | null;
  studentIds: string[];
  items: HomeworkItem[];
}

export interface HomeworkAttempt {
  studentId: string;
  studentEmail?: string | null;
  practiceSetId: string;
  questionId: string;
  answer: string;
  answerImageUrl?: string | null;
  score: number;
  maxScore: number;
  isCorrect: boolean;
  result: EvaluationResult;
  updatedAt: string;
}

export interface HomeworkProfile {
  userId: string;
  email: string;
  displayName: string;
}

export interface ResolvedHomeworkItem extends HomeworkItem {
  step: PracticeStep;
  setTitle: string;
  setLabel: string;
}

export interface CreateHomeworkInput {
  title: string;
  description: string;
  dueAt: string | null;
  status: 'draft' | 'published';
  sourceType: AssignmentSourceType;
  assignedToAll: boolean;
  studentIds: string[];
  aiInstruction?: string;
  items: Array<Pick<HomeworkItem, 'practiceSetId' | 'questionId'>>;
}

