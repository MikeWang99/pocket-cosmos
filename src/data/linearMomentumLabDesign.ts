import type { PracticeStep } from '../types/practice';

export const linearMomentumLabDesignMeta = {
  title: 'Linear Momentum Lab Design',
  subtitle: 'AP Physics C Mechanics written-response practice for experimental design.',
  eyebrow: 'AP Physics C Mechanics',
  description:
    'Design and justify an experiment that tests conservation of linear momentum using carts, velocity measurements, and uncertainty-aware data comparison.',
  sources: [
    {
      label: 'AP Physics C: Mechanics Course',
      url: 'https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics',
    },
  ],
};

export const linearMomentumLabDesignSteps: PracticeStep[] = [
  {
    id: 'linear-momentum-lab-design-01',
    mode: 'free_response',
    title: 'Design a Momentum Conservation Experiment',
    context:
      'You are asked to design an experiment to test whether linear momentum is conserved in a one-dimensional collision between two low-friction carts.',
    prompt:
      'Write a complete experimental design. Include the equipment you would use, the quantities you would measure, a clear procedure, how you would calculate total momentum before and after the collision, and how you would use sample data to decide whether momentum was conserved.',
    equations: [
      'p_i=m_1v_{1i}+m_2v_{2i}',
      'p_f=m_1v_{1f}+m_2v_{2f}',
      '\\vec J_{\\mathrm{ext}}=\\int \\vec F_{\\mathrm{ext,net}}\\,dt=\\Delta \\vec p_{\\mathrm{system}}',
    ],
    tags: ['linear momentum', 'experimental design', 'collision', 'data analysis'],
    maxScore: 6,
    source: 'AP Physics C Mechanics - Linear Momentum',
    answerNudge:
      'A strong response chooses the two carts as the system, minimizes external impulse, defines a positive direction, measures masses and velocities, and compares total momentum before and after with uncertainty.',
    sampleAnswer:
      'Use two dynamics carts on a level low-friction track. Measure the masses m1 and m2 with a balance. Use motion sensors, photogates, or video analysis to measure v1i, v2i, v1f, and v2f. Choose the two carts as the system and make the track level so the net external impulse along the track is small. Run the collision several times, then calculate p_i = m1 v1i + m2 v2i and p_f = m1 v1f + m2 v2f for each trial. If p_i and p_f agree within experimental uncertainty, the data support conservation of linear momentum.',
    solution:
      'The key idea is not that every collision conserves kinetic energy; it is that total linear momentum is conserved when the net external impulse on the chosen system is negligible. A strong experimental design must name the system, reduce or account for external forces, define a positive direction, measure velocities immediately before and after collision, and compare total momentum with uncertainty rather than expecting exact equality.',
    criteria: [
      {
        id: 'lml-01-system',
        label: 'Chooses the two carts as the system and identifies external impulse as negligible.',
        point: '1',
        keywords: ['system', 'two carts', 'external impulse', 'external force', 'negligible', 'low friction'],
        feedback: 'State what the system is and why external impulse along the track is small.',
      },
      {
        id: 'lml-01-equipment',
        label: 'Names suitable equipment for mass and velocity measurements.',
        point: '2',
        keywords: ['cart', 'track', 'balance', 'photogate', 'motion sensor', 'video'],
        feedback: 'Use realistic equipment such as carts, a level track, a balance, photogates, motion sensors, or video analysis.',
      },
      {
        id: 'lml-01-quantities',
        label: 'Measures masses and velocities immediately before and after collision.',
        point: '3',
        keywords: ['m1', 'm2', 'v1i', 'v2i', 'v1f', 'v2f', 'before', 'after'],
        feedback: 'Identify both masses and the velocities before and after the collision.',
      },
      {
        id: 'lml-01-momentum',
        label: 'Calculates total initial and final momentum.',
        point: '4',
        keywords: ['m1v1i', 'm2v2i', 'm1v1f', 'm2v2f', 'total momentum', 'pi', 'pf'],
        feedback: 'Compare the vector sum of momentum before and after, not just one cart.',
      },
      {
        id: 'lml-01-sign',
        label: 'Defines or uses a consistent positive direction.',
        point: '5',
        keywords: ['positive direction', 'sign', 'direction', 'left', 'right', 'negative'],
        feedback: 'Momentum is a vector, so signs or directions must be handled consistently.',
      },
      {
        id: 'lml-01-uncertainty',
        label: 'Uses uncertainty or percent difference to decide whether momentum is conserved.',
        point: '6',
        keywords: ['uncertainty', 'within error', 'percent difference', 'percent error', 'agree'],
        feedback: 'Experimental data will not match exactly; compare within measurement uncertainty.',
      },
    ],
  },
];
