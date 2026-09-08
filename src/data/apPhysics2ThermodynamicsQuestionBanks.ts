import bank from './apPhysics2Thermodynamics.generated.json';
import type { PracticeSet } from './practiceSets';
import type { PracticeStep } from '../types/practice';

const cedSourceUrl = 'https://apcentral.collegeboard.org/media/pdf/ap-physics-2-course-and-exam-description.pdf';

export const apPhysics2ThermodynamicsSets: PracticeSet[] = Object.entries(bank.sets)
  .filter(([, steps]) => steps.length > 0)
  .map(([cedCode, steps]) => {
    const topic = bank.ced_topics[cedCode as keyof typeof bank.ced_topics];
    const typedSteps = steps as PracticeStep[];

    return {
      id: `ap-physics-2-thermodynamics-${cedCode.replace('.', '-')}`,
      category: 'mechanics',
      label: `${cedCode} · ${topic.short}`,
      title: `AP Physics 2 · ${cedCode} · ${topic.title}`,
      subtitle: `${typedSteps.length} sourced questions from the two Thermodynamics extraction waves.`,
      eyebrow: 'AP Physics 2 · CED Unit 9 · Thermodynamics',
      description: `Questions are grouped under official CED topic ${cedCode}: ${topic.title}. Each question keeps its source wave, answer tracking, knowledge tags, and scalable source figures where available.`,
      steps: typedSteps,
      sources: [
        { label: 'AP Physics 2 Course and Exam Description', url: cedSourceUrl },
        { label: 'Live bank index', url: '/ap-physics2-thermodynamics-question-index.json' },
      ],
      practiceKind: 'structured',
      system: 'ap-physics-2',
      chapter: 9,
      chapterTitle: 'Unit 9 · Thermodynamics',
    };
  });
