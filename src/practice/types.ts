import type { PracticeStep } from '../types/practice';

export type PracticeSystem =
  | 'ap-physics-1'
  | 'ap-physics-2'
  | 'ap-c-mech'
  | 'ap-c-em'
  | 'igcse'
  | 'competition'
  | 'bpho'
  | 'a-level'
  | 'physics-bowl';

export type PracticeKind = 'mcq' | 'structured' | 'paper5' | 'evaluation';

export interface PracticeSetMeta {
  id: string;
  category: 'mechanics' | 'electromagnetism' | 'igcse';
  label: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  sources: Array<{ label: string; url: string }>;
  igcseTopicId?: string;
  practiceKind?: PracticeKind;
  system: PracticeSystem;
  chapter?: number;
  chapterTitle?: string;
  questionCount: number;
}

export interface PracticeSetPayload extends Omit<PracticeSetMeta, 'questionCount'> {
  steps: PracticeStep[];
}
