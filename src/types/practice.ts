export interface RubricCriterion {
  id: string;
  label: string;
  point: string;
  keywords: string[];
  anyKeywords?: string[];
  feedback: string;
}

export interface PracticeStep {
  id: string;
  mode?: 'free_response' | 'multiple_choice';
  title: string;
  prompt: string;
  context: string;
  equations?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  maxScore: number;
  source: string;
  answerNudge: string;
  criteria: RubricCriterion[];
  choices?: Array<{
    label: string;
    text: string;
  }>;
  correctAnswer?: string;
  solution?: string;
}

export interface EvaluationResult {
  score: number;
  maxScore: number;
  hits: RubricCriterion[];
  misses: RubricCriterion[];
  suggestions: string[];
}
