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
  difficulty?: number;
  title: string;
  prompt: string;
  context: string;
  equations?: string[];
  tags?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
    role?: 'diagram' | 'question';
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
  sampleAnswer?: string;
  solution?: string;
}

export interface EvaluationResult {
  score: number;
  maxScore: number;
  hits: RubricCriterion[];
  misses: RubricCriterion[];
  suggestions: string[];
}
