import type { PracticeStep } from '../types/practice';

const ANSWERS: Record<number, string> = {1:'D',2:'B',3:'A',4:'A',5:'A',6:'A',7:'D',8:'B',9:'B',10:'C',11:'D',12:'C',13:'B',14:'D',15:'B',16:'A',17:'B',18:'D',19:'A',20:'D',21:'B',22:'C',23:'C',24:'B',25:'C',26:'B',27:'C',28:'C',29:'D',30:'B',31:'D',32:'D',33:'D',34:'C',35:'D',36:'C',37:'B',38:'A',39:'A',40:'B',41:'B',42:'C',43:'A',44:'D',45:'D',46:'B',47:'C',48:'B',49:'D',50:'C',51:'D'};

const blankChoices = () => ['A', 'B', 'C', 'D'].map((label) => ({ label, text: '' }));

export const fmaApPhysics1KinematicsMeta = {
  title: 'AP Physics 1: Kinematics',
  subtitle: 'Multiple Choice · Unit One Kinematics',
  eyebrow: 'FMA Competition',
  description: 'A complete multiple-choice bank for AP Physics 1 Unit One Kinematics, preserved as source-image questions with synchronized answer tracking.',
  sources: [{ label: 'AP Physics 1 Introduction to Kinematics (2026-08-12)', url: '/fma-ap-physics1-kinematics-assets/source-inventory.json' }],
};

export const fmaApPhysics1KinematicsSteps: PracticeStep[] = Array.from({ length: 51 }, (_, index) => {
  const number = index + 1;
  const answer = ANSWERS[number];
  return {
    id: `fma-ap-physics1-kinematics-2026-q${String(number).padStart(2, '0')}`,
    mode: 'multiple_choice',
    title: `Question ${number}`,
    prompt: 'Select the correct option.',
    context: '',
    image: {
      src: `/fma-ap-physics1-kinematics-assets/q${String(number).padStart(2, '0')}.png`,
      alt: `AP Physics 1 kinematics question ${number}`,
      role: 'question',
      responsive: true,
      downloadName: `fma-ap-physics1-kinematics-q${String(number).padStart(2, '0')}.png`,
    },
    maxScore: 1,
    source: 'FMA AP Physics 1: Kinematics · Unit One Kinematics',
    answerNudge: 'Choose the best answer, then check your response.',
    criteria: [],
    choices: blankChoices(),
    correctAnswer: answer,
    solution: `Correct answer: ${answer}.`,
  };
});
