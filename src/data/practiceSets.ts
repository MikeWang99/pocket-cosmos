import { calculusForPhysicsMeta, calculusForPhysicsSteps } from './calculusForPhysics';
import { dynamicsMultipleChoiceMeta, dynamicsMultipleChoiceSteps } from './dynamicsMultipleChoice';
import { practiceSetMeta as frq2025Meta, practiceSteps as frq2025Steps } from './frq2025Mechanics';
import {
  igcseAllTopics,
  igcseAllTopicSteps,
  igcseAllTopicMeta,
} from './igcseCieAllMultipleChoice';
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
  /** For IGCSE sets, the topic ID for filtering */
  igcseTopicId?: string;
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
  // IGCSE per-topic sets (all chapters)
  ...igcseAllTopics.map((topic): PracticeSet => ({
    id: `igcse-cie-topic-${topic.topicId.replace('.', '-')}`,
    category: 'igcse' as const,
    label: topic.shortLabel,
    ...igcseAllTopicMeta[topic.topicId],
    steps: igcseAllTopicSteps[topic.topicId],
    igcseTopicId: topic.topicId,
  })),
];
