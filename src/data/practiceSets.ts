import { calculusForPhysicsMeta, calculusForPhysicsSteps } from './calculusForPhysics';
import { dynamicsMultipleChoiceMeta, dynamicsMultipleChoiceSteps } from './dynamicsMultipleChoice';
import { practiceSetMeta as frq2025Meta, practiceSteps as frq2025Steps } from './frq2025Mechanics';
import {
  igcseAllTopics,
  igcseAllTopicSteps,
  igcseAllTopicMeta,
} from './igcseCieAllMultipleChoice';
import {
  frqTopics,
  frqTopicSteps,
  frqTopicMeta,
} from './igcseCieAllFrq';
import {
  paper5Years,
  paper5YearSteps,
  paper5YearMeta,
} from './igcseCiePaper5';
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
  /** Practice type grouping used by the exercise navigation */
  practiceKind?: 'mcq' | 'structured' | 'paper5';
  /** Hierarchy: curriculum system */
  system: 'ap-c-mech' | 'ap-c-em' | 'igcse';
  /** Hierarchy: chapter grouping (optional, for IGCSE) */
  chapter?: number;
  chapterTitle?: string;
}

export const practiceSets: PracticeSet[] = [
  {
    id: 'calculus-for-physics',
    category: 'mechanics',
    label: 'Calculus for Physics',
    system: 'ap-c-mech',
    ...calculusForPhysicsMeta,
    steps: calculusForPhysicsSteps,
  },
  {
    id: 'frq-2025-mechanics',
    category: 'mechanics',
    label: '2025 FRQ Lab',
    system: 'ap-c-mech',
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
    system: 'ap-c-mech',
    ...kinematicsMultipleChoiceMeta,
    steps: kinematicsMultipleChoiceSteps,
  },
  {
    id: 'dynamics-multiple-choice',
    category: 'mechanics',
    label: 'Dynamics',
    system: 'ap-c-mech',
    ...dynamicsMultipleChoiceMeta,
    steps: dynamicsMultipleChoiceSteps,
  },
  {
    id: 'work-energy-multiple-choice',
    category: 'mechanics',
    label: 'Work & Energy',
    system: 'ap-c-mech',
    ...workEnergyMultipleChoiceMeta,
    steps: workEnergyMultipleChoiceSteps,
  },
  {
    id: 'linear-momentum-lab-design',
    category: 'mechanics',
    label: 'Momentum Lab Design',
    system: 'ap-c-mech',
    ...linearMomentumLabDesignMeta,
    steps: linearMomentumLabDesignSteps,
  },
  {
    id: 'physics-bowl-em-question-bank',
    category: 'electromagnetism',
    label: 'Physics Bowl 物理碗精选题库',
    system: 'ap-c-em',
    ...physicsBowlEmMeta,
    steps: physicsBowlEmSteps,
  },
  // IGCSE per-topic MCQ sets (all chapters)
  ...igcseAllTopics.map((topic): PracticeSet => ({
    id: `igcse-cie-topic-${topic.topicId.replace('.', '-')}`,
    category: 'igcse' as const,
    label: topic.shortLabel,
    system: 'igcse' as const,
    practiceKind: 'mcq',
    chapter: topic.chapter,
    chapterTitle: topic.chapterTitle,
    ...igcseAllTopicMeta[topic.topicId],
    steps: igcseAllTopicSteps[topic.topicId],
    igcseTopicId: topic.topicId,
  })),
  // IGCSE per-topic FRQ (structured question) sets
  ...frqTopics.map((topic): PracticeSet => ({
    id: `igcse-cie-frq-${topic.topicId.replace('.', '-')}`,
    category: 'igcse' as const,
    label: topic.shortLabel,
    system: 'igcse' as const,
    practiceKind: 'structured',
    chapter: topic.chapter,
    chapterTitle: topic.chapterTitle,
    ...frqTopicMeta[topic.topicId],
    steps: frqTopicSteps[topic.topicId],
    igcseTopicId: topic.topicId,
  })),
  // IGCSE Paper 5 Practical sets (by year)
  ...paper5Years.map(({ year }): PracticeSet => ({
    id: `igcse-cie-paper5-${year}`,
    category: 'igcse' as const,
    label: `${year} P5`,
    system: 'igcse' as const,
    practiceKind: 'paper5',
    chapter: 0,
    chapterTitle: 'Paper 5 Practical Test',
    ...paper5YearMeta[year],
    steps: paper5YearSteps[year],
  })),
];
