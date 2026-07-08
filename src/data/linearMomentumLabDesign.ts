import type { PracticeStep } from '../types/practice';

export const linearMomentumLabDesignMeta = {
  title: 'Linear Momentum Cart Collision Lab',
  subtitle: 'AP-style experimental question on conservation of momentum in a cart collision.',
  eyebrow: 'AP Physics C Mechanics',
  description:
    'Use measured cart-collision data to test momentum conservation, compare kinetic energy, and identify experimental limitations.',
  sources: [
    {
      label: 'AP Physics C: Mechanics Course',
      url: 'https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics',
    },
  ],
};

export const linearMomentumLabDesignSteps: PracticeStep[] = [
  {
    id: 'linear-momentum-cart-collision-lab-01',
    mode: 'free_response',
    title: 'Experimental Question: Conservation of Momentum in a Cart Collision',
    context:
      'A group of students tests whether linear momentum is conserved during a collision between two carts on a horizontal low-friction track.',
    prompt:
      `A group of students wants to test whether linear momentum is conserved during a collision between two carts on a horizontal low-friction track.

Cart A has mass $m_A=0.500\\ \\mathrm{kg}$.
Cart B has mass $m_B=0.700\\ \\mathrm{kg}$.
Cart B is initially at rest. Cart A moves to the right and collides with Cart B. The carts stick together after the collision.

The students use motion sensors to measure the speed of Cart A before the collision and the speed of the combined carts after the collision. The positive direction is to the right.

Data:
Trial 1: $v_{A,i}=0.90\\ \\mathrm{m/s}$, $v_{B,i}=0.00\\ \\mathrm{m/s}$, $v_f=0.37\\ \\mathrm{m/s}$
Trial 2: $v_{A,i}=1.10\\ \\mathrm{m/s}$, $v_{B,i}=0.00\\ \\mathrm{m/s}$, $v_f=0.45\\ \\mathrm{m/s}$
Trial 3: $v_{A,i}=1.30\\ \\mathrm{m/s}$, $v_{B,i}=0.00\\ \\mathrm{m/s}$, $v_f=0.54\\ \\mathrm{m/s}$

Part A. Identify the system that should be used to analyze momentum conservation in this experiment. Explain why this system is appropriate.

Part B. Derive an expression for the predicted final speed $v_f$ of the combined carts in terms of $m_A$, $m_B$, and $v_{A,i}$.

Part C. Using conservation of momentum, calculate the predicted final speed for Trial 2.

Part D. For Trial 2, calculate the initial momentum and final momentum of the two-cart system using the measured data. Then calculate the percent difference between the initial and final momentum.

Part E. Determine whether kinetic energy is conserved in Trial 2. Support your answer with calculations.

Part F. The students repeat the experiment using magnetic bumpers instead of Velcro bumpers. The carts bounce apart after the collision. What additional measurements would be needed to determine whether the collision is approximately elastic?

Part G. Describe two experimental factors that could cause the measured final momentum to be different from the initial momentum.`,
    equations: [
      'm_Av_{A,i}=(m_A+m_B)v_f',
      'p_i=m_Av_{A,i}+m_Bv_{B,i}',
      'p_f=(m_A+m_B)v_f',
      'K=\\frac12mv^2',
    ],
    tags: ['linear momentum', 'experimental design', 'cart collision', 'kinetic energy', 'percent difference'],
    maxScore: 10,
    source: 'AP Physics C Mechanics - Linear Momentum Experimental Question',
    answerNudge:
      'Use Cart A + Cart B as the system. For Trial 2, compare both momentum and kinetic energy before and after the perfectly inelastic collision.',
    sampleAnswer:
      `Part A. Use the system Cart A + Cart B. The collision force between the carts is internal. If the track is nearly frictionless and horizontal, the external impulse in the horizontal direction is small, so the system momentum is approximately conserved.

Part B. Before collision, $p_i=m_Av_{A,i}+m_Bv_{B,i}$. Since Cart B starts at rest, $v_{B,i}=0$, so $p_i=m_Av_{A,i}$. After collision, the carts stick together, so $p_f=(m_A+m_B)v_f$. Momentum conservation gives $m_Av_{A,i}=(m_A+m_B)v_f$, so $v_f=\\frac{m_A}{m_A+m_B}v_{A,i}$.

Part C. For Trial 2, $v_f=\\frac{0.500}{0.500+0.700}(1.10)=0.458\\ \\mathrm{m/s}\\approx0.46\\ \\mathrm{m/s}$. The measured value is $0.45\\ \\mathrm{m/s}$, which is close.

Part D. $p_i=(0.500)(1.10)+(0.700)(0)=0.550\\ \\mathrm{kg\\cdot m/s}$. $p_f=(0.500+0.700)(0.45)=0.540\\ \\mathrm{kg\\cdot m/s}$. Percent difference $=\\frac{|0.540-0.550|}{0.550}\\times100\\%=1.82\\%$.

Part E. $K_i=\\frac12(0.500)(1.10)^2=0.3025\\ \\mathrm{J}$. $K_f=\\frac12(1.200)(0.45)^2=0.1215\\ \\mathrm{J}$. Since $K_f<K_i$, kinetic energy is not conserved. The collision is perfectly inelastic, and mechanical energy is transformed into thermal energy, sound, deformation, and internal energy of the Velcro.

Part F. With magnetic bumpers, the carts bounce apart. Students would need to measure both carts' velocities before and after collision: $v_{A,i}$, $v_{B,i}$, $v_{A,f}$, and $v_{B,f}$. To determine whether the collision is approximately elastic, compare both total momentum and total kinetic energy before and after.

Part G. Possible factors include friction from the track, a track that is not perfectly horizontal, motion sensor or photogate measurement error, carts rotating or moving slightly off-axis, and energy lost to deformation or sound.`,
    solution:
      'This question tests experimental reasoning, not just formula substitution. The student must choose the correct system, recognize that momentum conservation depends on negligible external impulse, distinguish momentum conservation from kinetic energy conservation, and interpret small differences in measured momentum as experimental uncertainty rather than as automatic failure of the conservation model.',
    criteria: [
      {
        id: 'cart-lab-a-system',
        label: 'Part A: Chooses Cart A + Cart B and explains internal forces.',
        point: 'A',
        keywords: ['cart a', 'cart b', 'system', 'internal force', 'external impulse', 'frictionless'],
        feedback: 'Use the two-cart system so the collision force is internal and horizontal external impulse is small.',
      },
      {
        id: 'cart-lab-b-derive',
        label: 'Part B: Derives the predicted final speed expression.',
        point: 'B',
        keywords: ['m_A', 'mA', 'm_B', 'mB', 'v_f', 'm_A/(m_A+m_B)', 'mA/(mA+mB)', 'conservation'],
        feedback: 'Start from initial momentum equals final momentum for the stuck-together carts.',
      },
      {
        id: 'cart-lab-c-value',
        label: 'Part C: Calculates Trial 2 predicted final speed near 0.458 m/s.',
        point: 'C',
        keywords: ['0.458', '0.46', '0.500', '1.10', '1.200'],
        feedback: 'Substitute Trial 2 into v_f = m_A v_Ai / (m_A + m_B).',
      },
      {
        id: 'cart-lab-d-momentum',
        label: 'Part D: Calculates initial and final momentum for Trial 2.',
        point: 'D1',
        keywords: ['0.550', '0.540', 'kg m/s', 'kg·m/s', 'initial momentum', 'final momentum'],
        feedback: 'Use the measured Trial 2 velocities to calculate p_i and p_f.',
      },
      {
        id: 'cart-lab-d-percent',
        label: 'Part D: Calculates percent difference near 1.82%.',
        point: 'D2',
        keywords: ['1.82', '1.8%', 'percent difference', '0.010/0.550'],
        feedback: 'Compare the absolute momentum difference to the initial momentum.',
      },
      {
        id: 'cart-lab-e-ki',
        label: 'Part E: Calculates initial kinetic energy for Trial 2.',
        point: 'E1',
        keywords: ['0.3025', '0.303', 'kinetic energy', 'ki'],
        feedback: 'Initial kinetic energy is from Cart A because Cart B starts at rest.',
      },
      {
        id: 'cart-lab-e-kf',
        label: 'Part E: Calculates final kinetic energy and concludes it is not conserved.',
        point: 'E2',
        keywords: ['0.1215', '0.122', 'not conserved', 'inelastic', 'perfectly inelastic'],
        feedback: 'After collision, the carts move together, and kinetic energy is smaller.',
      },
      {
        id: 'cart-lab-f-measurements',
        label: 'Part F: Identifies additional velocity measurements for magnetic bumpers.',
        point: 'F',
        keywords: ['v_Af', 'vBf', 'v_A,f', 'v_B,f', 'velocities after', 'kinetic energy before and after'],
        feedback: 'For a bounce-apart collision, measure both carts before and after, then compare momentum and kinetic energy.',
      },
      {
        id: 'cart-lab-g-errors',
        label: 'Part G: Gives two realistic experimental factors.',
        point: 'G',
        keywords: ['friction', 'not horizontal', 'sensor', 'photogate', 'measurement', 'rotation', 'off-axis', 'deformation'],
        feedback: 'Mention realistic causes such as friction, track tilt, measurement error, or off-axis motion.',
      },
    ],
  },
];
