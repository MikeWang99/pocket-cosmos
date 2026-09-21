import type { PracticeKind, PracticeSetMeta } from './types';

export interface AdminPracticeQuestionSummary {
  id: string;
  title: string;
  difficulty?: number;
  tags?: string[];
  specialtyTags?: string[];
  mode?: 'free_response' | 'multiple_choice';
  hasChoices: boolean;
  hasAnswerKey: boolean;
}

export interface AdminPracticeSetSummary extends PracticeSetMeta {
  practiceKind?: PracticeKind;
  questions: AdminPracticeQuestionSummary[];
}
