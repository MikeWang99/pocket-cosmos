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
}

export interface EvaluationResult {
  score: number;
  maxScore: number;
  hits: RubricCriterion[];
  misses: RubricCriterion[];
  suggestions: string[];
}
