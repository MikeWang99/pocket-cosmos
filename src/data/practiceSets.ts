import { calculusForPhysicsMeta, calculusForPhysicsSteps } from './calculusForPhysics';
import { dynamicsMultipleChoiceMeta, dynamicsMultipleChoiceSteps } from './dynamicsMultipleChoice';
import { practiceSetMeta as frq2025Meta, practiceSteps as frq2025Steps } from './frq2025Mechanics';
import {
  igcseCieChapter1ClassroomMeta,
  igcseCieChapter1ClassroomSteps,
  igcseCieChapter1HomeworkMeta,
  igcseCieChapter1HomeworkSteps,
} from './igcseCieChapter1MultipleChoice';
import { kinematicsMultipleChoiceMeta, kinematicsMultipleChoiceSteps } from './kinematicsMultipleChoice';
import { linearMomentumLabDesignMeta, linearMomentumLabDesignSteps } from './linearMomentumLabDesign';
import { physicsBowlEmMeta, physicsBowlEmSteps } from './physicsBowlEmQuestionBank';
import { workEnergyMultipleChoiceMeta, workEnergyMultipleChoiceSteps } from './workEnergyMultipleChoice';
import type { PracticeStep } from '../types/practice';

export interface PracticeSet {
  id: string;
  category: 'mechanics' | 'electromagnetism' | 'igcse';
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
    category: 'mechanics',
    label: 'Calculus for Physics',
    ...calculusForPhysicsMeta,
    steps: calculusForPhysicsSteps,
  },
  {
    id: 'frq-2025-mechanics',
    category: 'mechanics',
    label: '2025 FRQ Lab',
    eyebrow: 'AP Physics C Mechanics',
    description:
      'Work through the 2025 released mechanics FRQs one short step at a time. The rubric assistant checks your reasoning against official scoring points and keeps a running report.',
    ...frq2025Meta,
    steps: frq2025Steps,
  },
  {
    id: 'kinematics-multiple-choice',
    category: 'mechanics',
    label: 'Kinematics MC',
    ...kinematicsMultipleChoiceMeta,
    steps: kinematicsMultipleChoiceSteps,
  },
  {
    id: 'dynamics-multiple-choice',
    category: 'mechanics',
    label: 'Dynamics',
    ...dynamicsMultipleChoiceMeta,
    steps: dynamicsMultipleChoiceSteps,
  },
  {
    id: 'work-energy-multiple-choice',
    category: 'mechanics',
    label: 'Work & Energy',
    ...workEnergyMultipleChoiceMeta,
    steps: workEnergyMultipleChoiceSteps,
  },
  {
    id: 'linear-momentum-lab-design',
    category: 'mechanics',
    label: 'Momentum Lab Design',
    ...linearMomentumLabDesignMeta,
    steps: linearMomentumLabDesignSteps,
  },
  {
    id: 'physics-bowl-em-question-bank',
    category: 'electromagnetism',
    label: 'Physics Bowl 物理碗精选题库',
    ...physicsBowlEmMeta,
    steps: physicsBowlEmSteps,
  },
  {
    id: 'igcse-cie-ch1-classroom',
    category: 'igcse',
    label: 'Classroom Practice',
    ...igcseCieChapter1ClassroomMeta,
    steps: igcseCieChapter1ClassroomSteps,
  },
  {
    id: 'igcse-cie-ch1-homework',
    category: 'igcse',
    label: 'Homework',
    ...igcseCieChapter1HomeworkMeta,
    steps: igcseCieChapter1HomeworkSteps,
  },
];
