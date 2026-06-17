import { calculusForPhysicsMeta, calculusForPhysicsSteps } from './calculusForPhysics';
import { dynamicsMultipleChoiceMeta, dynamicsMultipleChoiceSteps } from './dynamicsMultipleChoice';
import { practiceSetMeta as frq2025Meta, practiceSteps as frq2025Steps } from './frq2025Mechanics';
import { kinematicsMultipleChoiceMeta, kinematicsMultipleChoiceSteps } from './kinematicsMultipleChoice';
import type { PracticeStep } from '../types/practice';

export interface PracticeSet {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  steps: PracticeStep[];
  sources: Array<{
    label: string;
    url: string;
  }>;
}

export const practiceSets: PracticeSet[] = [
  {
    id: 'calculus-for-physics',
    label: 'Calculus for Physics',
    ...calculusForPhysicsMeta,
    steps: calculusForPhysicsSteps,
  },
  {
    id: 'frq-2025-mechanics',
    label: '2025 FRQ Lab',
    eyebrow: 'AP Physics C Mechanics',
    description:
      'Work through the 2025 released mechanics FRQs one short step at a time. The rubric assistant checks your reasoning against official scoring points and keeps a running report.',
    ...frq2025Meta,
    steps: frq2025Steps,
  },
  {
    id: 'kinematics-multiple-choice',
    label: 'Kinematics MC',
    ...kinematicsMultipleChoiceMeta,
    steps: kinematicsMultipleChoiceSteps,
  },
  {
    id: 'dynamics-multiple-choice',
    label: 'Dynamics',
    ...dynamicsMultipleChoiceMeta,
    steps: dynamicsMultipleChoiceSteps,
  },
];
