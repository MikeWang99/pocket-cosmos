import { calculusForPhysicsMeta, calculusForPhysicsSteps } from './calculusForPhysics';
import {
  apcMechanicsRotationTest16Meta,
  apcMechanicsRotationTest16Steps,
} from './apcMechanicsRotationTest16';
import {
  apcMechanicsMomentumTest15Meta,
  apcMechanicsMomentumTest15Steps,
  apcMechanicsRotationTest5Meta,
  apcMechanicsRotationTest5Steps,
} from './apcMechanicsHomeworkBanks';
import {
  apcMechanicsRotationTest17Meta,
  apcMechanicsRotationTest17Steps,
} from './apcMechanicsRotationTest17';
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
import { igcseQuickDiagnosticMeta, igcseQuickDiagnosticSteps } from './igcseQuickDiagnostic';
import {
  paper5Years,
  paper5YearSteps,
  paper5YearMeta,
} from './igcseCiePaper5';
import { kinematicsMultipleChoiceMeta, kinematicsMultipleChoiceSteps } from './kinematicsMultipleChoice';
import { linearMomentumLabDesignMeta, linearMomentumLabDesignSteps } from './linearMomentumLabDesign';
import { physicsBowlEmMeta, physicsBowlEmSteps } from './physicsBowlEmQuestionBank';
import { apcEmFrq1Meta, apcEmFrq1Steps } from './apcEmFrqTest1';
import { apcEmFrq2Meta, apcEmFrq2Steps } from './apcEmFrqTest2';
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
  practiceKind?: 'mcq' | 'structured' | 'paper5' | 'evaluation';
  /** Hierarchy: curriculum system */
  system: 'ap-c-mech' | 'ap-c-em' | 'igcse';
  /** Hierarchy: chapter or unit grouping */
  chapter?: number;
  chapterTitle?: string;
}

export const practiceSets: PracticeSet[] = [
  {
    id: 'calculus-for-physics',
    category: 'mechanics',
    label: 'Calculus for Physics',
    system: 'ap-c-mech',
    practiceKind: 'structured',
    chapter: 0,
    chapterTitle: 'Prerequisite Skills',
    ...calculusForPhysicsMeta,
    steps: calculusForPhysicsSteps,
  },
  {
    id: 'frq-2025-mechanics',
    category: 'mechanics',
    label: '2025 FRQ Lab',
    system: 'ap-c-mech',
    practiceKind: 'structured',
    chapter: 99,
    chapterTitle: 'Comprehensive Exam Practice',
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
    practiceKind: 'mcq',
    chapter: 1,
    chapterTitle: 'Kinematics',
    ...kinematicsMultipleChoiceMeta,
    steps: kinematicsMultipleChoiceSteps,
  },
  {
    id: 'dynamics-multiple-choice',
    category: 'mechanics',
    label: 'Dynamics',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 2,
    chapterTitle: 'Force and Translational Dynamics',
    ...dynamicsMultipleChoiceMeta,
    steps: dynamicsMultipleChoiceSteps,
  },
  {
    id: 'work-energy-multiple-choice',
    category: 'mechanics',
    label: 'Work & Energy',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 3,
    chapterTitle: 'Work, Energy, and Power',
    ...workEnergyMultipleChoiceMeta,
    steps: workEnergyMultipleChoiceSteps,
  },
  {
    id: 'linear-momentum-lab-design',
    category: 'mechanics',
    label: 'Momentum Lab Design',
    system: 'ap-c-mech',
    practiceKind: 'structured',
    chapter: 4,
    chapterTitle: 'Linear Momentum',
    ...linearMomentumLabDesignMeta,
    steps: linearMomentumLabDesignSteps,
  },
  {
    id: 'apc-mechanics-momentum-test15',
    category: 'mechanics',
    label: 'Momentum & COM · Test 15',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 4,
    chapterTitle: 'Linear Momentum and Center of Mass',
    ...apcMechanicsMomentumTest15Meta,
    steps: apcMechanicsMomentumTest15Steps,
  },
  {
    id: 'apc-mechanics-rotation-test16',
    category: 'mechanics',
    label: 'Rotation I · Test 16',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 5,
    chapterTitle: 'Torque and Rotational Dynamics',
    ...apcMechanicsRotationTest16Meta,
    steps: apcMechanicsRotationTest16Steps,
  },
  {
    id: 'apc-mechanics-rotation-test5',
    category: 'mechanics',
    label: 'Rotation · Test 5',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 5,
    chapterTitle: 'Torque and Rotational Dynamics',
    ...apcMechanicsRotationTest5Meta,
    steps: apcMechanicsRotationTest5Steps,
  },
  {
    id: 'apc-mechanics-rotation-test17',
    category: 'mechanics',
    label: 'Rotation II · Test 17',
    system: 'ap-c-mech',
    practiceKind: 'mcq',
    chapter: 6,
    chapterTitle: 'Energy and Momentum of Rotating Systems',
    ...apcMechanicsRotationTest17Meta,
    steps: apcMechanicsRotationTest17Steps,
  },
  {
    id: 'physics-bowl-em-question-bank',
    category: 'electromagnetism',
    label: 'Physics Bowl 物理碗精选题库',
    system: 'ap-c-em',
    ...physicsBowlEmMeta,
    steps: physicsBowlEmSteps,
  },
  {
    id: 'apc-em-frq-test1',
    category: 'electromagnetism',
    label: 'E&M FRQ Test 1 · Electric Forces & Fields',
    system: 'ap-c-em',
    practiceKind: 'structured',
    chapter: 1,
    chapterTitle: 'Electric Forces and Fields',
    ...apcEmFrq1Meta,
    steps: apcEmFrq1Steps,
  },
  {
    id: 'apc-em-frq-test2',
    category: 'electromagnetism',
    label: 'E&M FRQ Test 2 · Electric Potential & Capacitance',
    system: 'ap-c-em',
    practiceKind: 'structured',
    chapter: 2,
    chapterTitle: 'Electric Potential and Capacitance',
    ...apcEmFrq2Meta,
    steps: apcEmFrq2Steps,
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
  // IGCSE Evaluation (diagnostic papers)
  {
    id: 'igcse-eval-quick-diagnostic',
    category: 'igcse' as const,
    label: 'Quick Diagnostic',
    system: 'igcse' as const,
    practiceKind: 'evaluation',
    chapter: 0,
    chapterTitle: 'Diagnostic Papers',
    ...igcseQuickDiagnosticMeta,
    steps: igcseQuickDiagnosticSteps,
  },
];
