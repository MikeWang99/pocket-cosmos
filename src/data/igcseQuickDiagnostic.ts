import type { PracticeStep } from '../types/practice';

const IMG = '/questions/igcse-evaluation';
const SOURCE = 'Mike Wang Physics · IGCSE Physics Quick Diagnostic';

export const igcseQuickDiagnosticSteps: PracticeStep[] = [
  // ─── Q1 ───
  {
    id: 'igcse-diag-q01',
    mode: 'multiple_choice',
    difficulty: 1,
    title: 'Q1 · Vector Quantity',
    prompt: 'Which is a vector quantity?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Measurement & Motion', 'Difficulty 1'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Think about which quantity has both magnitude and direction.',
    choices: [
      { label: 'A', text: 'density' },
      { label: 'B', text: 'mass' },
      { label: 'C', text: 'pressure' },
      { label: 'D', text: 'weight' },
    ],
    correctAnswer: 'D',
    solution:
      'Weight is a force (W = mg) and has both magnitude and direction (towards the centre of the Earth), making it a vector. Density, mass and pressure are scalars.',
    criteria: [],
  },
  // ─── Q2 ───
  {
    id: 'igcse-diag-q02',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q2 · Speed–Time Graph',
    prompt:
      'The graph shows the speed of a car travelling through a town.\nWhich section of the graph represents a period when the car is decelerating?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Measurement & Motion', 'Difficulty 2'],
    image: {
      src: `${IMG}/q02-speed-time-graph.webp`,
      alt: 'Speed–time graph with sections A, B, C and D',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'On a speed–time graph, deceleration means speed is decreasing with time.',
    choices: [
      { label: 'A', text: 'section A' },
      { label: 'B', text: 'section B' },
      { label: 'C', text: 'section C' },
      { label: 'D', text: 'section D' },
    ],
    correctAnswer: 'D',
    solution:
      'Section D shows speed decreasing with time (negative gradient on a speed–time graph), which means the car is decelerating. A and B show acceleration; C shows constant speed.',
    criteria: [],
  },
  // ─── Q3 ───
  {
    id: 'igcse-diag-q03',
    mode: 'multiple_choice',
    difficulty: 3,
    title: 'Q3 · Terminal Velocity',
    prompt:
      'An object reaches terminal velocity after being dropped and falling through air.\nWhich graph shows how its speed varies with time?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Measurement & Motion', 'Difficulty 3'],
    image: {
      src: `${IMG}/q03-terminal-velocity-graphs.webp`,
      alt: 'Four speed–time graphs labelled A, B, C and D',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge:
      'The object starts from rest, accelerates with decreasing acceleration, then reaches constant speed.',
    choices: [
      { label: 'A', text: 'graph A' },
      { label: 'B', text: 'graph B' },
      { label: 'C', text: 'graph C' },
      { label: 'D', text: 'graph D' },
    ],
    correctAnswer: 'C',
    solution:
      'A dropped object starts from rest (speed = 0). As it falls, air resistance increases with speed, so acceleration decreases. The graph should start at the origin with a decreasing gradient, levelling off at terminal velocity — that is graph C.',
    criteria: [],
  },
  // ─── Q4 ───
  {
    id: 'igcse-diag-q04',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q4 · Resultant Force',
    prompt: 'Which moving object has a resultant force acting on it?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Forces & Equilibrium', 'Difficulty 2'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Constant speed in a straight line means zero resultant force. What about changing direction?',
    choices: [
      { label: 'A', text: 'a diver rising vertically through water at constant speed' },
      { label: 'B', text: 'an aircraft circling an airport at constant speed' },
      { label: 'C', text: 'a train going up a straight incline at constant speed' },
      { label: 'D', text: 'a parachutist descending vertically at terminal velocity' },
    ],
    correctAnswer: 'B',
    solution:
      'The aircraft is changing direction (circular motion), so its velocity is changing even though its speed is constant. A change in velocity requires a resultant force (centripetal force). The other objects all move at constant velocity (constant speed in a straight line), so their resultant force is zero.',
    criteria: [],
  },
  // ─── Q5 ───
  {
    id: 'igcse-diag-q05',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q5 · Equilibrium',
    prompt:
      'Forces are applied to four identical objects.\nThe length of each arrow indicates the magnitude of the force.\nWhich object is in equilibrium?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Forces & Equilibrium', 'Difficulty 2'],
    image: {
      src: `${IMG}/q05-forces-equilibrium.webp`,
      alt: 'Four objects labelled A–D with force arrows of different lengths',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Equilibrium means the forces in every direction are balanced (resultant force = 0).',
    choices: [
      { label: 'A', text: 'object A' },
      { label: 'B', text: 'object B' },
      { label: 'C', text: 'object C' },
      { label: 'D', text: 'object D' },
    ],
    correctAnswer: 'B',
    solution:
      'Object B has equal and opposite forces in both the horizontal and vertical directions, so the resultant force is zero and it is in equilibrium. In the other objects, the arrows in at least one direction are unequal, giving a non-zero resultant force.',
    criteria: [],
  },
  // ─── Q6 ───
  {
    id: 'igcse-diag-q06',
    mode: 'multiple_choice',
    difficulty: 4,
    title: 'Q6 · Impulse & Momentum',
    prompt:
      'A sphere X collides head-on with a second identical sphere Y, which is stationary. The mass of each sphere is 0.15 kg. Sphere X is travelling at a velocity of 2.0 m/s before the collision and produces an impulse of 0.21 N·s on sphere Y.\nWhat is the velocity of sphere X after the collision?',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['impulse = change in momentum = mΔv', 'Newton\u2019s third law: equal and opposite forces'],
    tags: ['Momentum', 'Difficulty 4'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Use impulse = mΔv for each sphere. Remember Newton\u2019s third law.',
    choices: [
      { label: 'A', text: '0.60 m/s in the opposite direction to Y' },
      { label: 'B', text: '0.60 m/s in the same direction as Y' },
      { label: 'C', text: '1.4 m/s in the opposite direction to Y' },
      { label: 'D', text: '1.4 m/s in the same direction as Y' },
    ],
    correctAnswer: 'B',
    solution:
      'For Y: impulse = mΔv → 0.21 = 0.15 × v_Y → v_Y = 1.4 m/s (in the original direction of X).\nBy Newton\u2019s third law, X receives an equal impulse in the opposite direction: −0.21 = 0.15(v − 2.0) → v = 2.0 − 1.4 = 0.60 m/s, still in the same direction as Y.',
    criteria: [],
  },
  // ─── Q7 ───
  {
    id: 'igcse-diag-q07',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q7 · Energy Transfers',
    prompt:
      'A cyclist travels down a hill from rest at point X without pedalling. The cyclist applies his brakes and the cycle stops at point Y.\nWhich energy transfers have taken place between X and Y?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Energy & Power', 'Difficulty 2'],
    image: {
      src: `${IMG}/q07-cyclist-hill.webp`,
      alt: 'Diagram of a cyclist travelling from X at the top of a hill to Y at the bottom',
      role: 'diagram',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Think about the energy stores at the start (top of hill), middle (moving) and end (stopped).',
    choices: [
      { label: 'A', text: 'gravitational potential → kinetic → internal (thermal)' },
      { label: 'B', text: 'gravitational potential → internal (thermal) → kinetic' },
      { label: 'C', text: 'kinetic → gravitational potential → internal (thermal)' },
      { label: 'D', text: 'kinetic → internal (thermal) → gravitational potential' },
    ],
    correctAnswer: 'A',
    solution:
      'At X (top, at rest) the cyclist has gravitational potential energy. Going downhill this converts to kinetic energy. Braking converts the kinetic energy to internal (thermal) energy in the brakes, and the cycle stops at Y.',
    criteria: [],
  },
  // ─── Q8 ───
  {
    id: 'igcse-diag-q08',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q8 · Power Calculation',
    prompt:
      'A pump does 460 000 J of work to raise water to fill a tank. It takes 7 minutes to fill the tank.\nWhat is the power of the pump?',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['P = W / t'],
    tags: ['Energy & Power', 'Difficulty 2'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Convert minutes to seconds first, then use P = W/t.',
    choices: [
      { label: 'A', text: '1.1 kW' },
      { label: 'B', text: '66 kW' },
      { label: 'C', text: '3200 kW' },
      { label: 'D', text: '190 000 kW' },
    ],
    correctAnswer: 'A',
    solution:
      't = 7 min = 420 s. P = W/t = 460 000 / 420 ≈ 1095 W ≈ 1.1 kW.',
    criteria: [],
  },
  // ─── Q9 ───
  {
    id: 'igcse-diag-q09',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q9 · Pressure and Depth',
    prompt:
      'The water in a swimming pool exerts a pressure at the bottom of the pool.\nWhich graph shows the relationship between the pressure exerted by the water and the depth of water in the pool?\nAssume the density of water is constant.',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['p = ρgh'],
    tags: ['Pressure', 'Difficulty 2'],
    image: {
      src: `${IMG}/q09-pressure-depth-graphs.webp`,
      alt: 'Four pressure–depth graphs labelled A, B, C and D',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'p = ρgh — what type of relationship is this?',
    choices: [
      { label: 'A', text: 'graph A' },
      { label: 'B', text: 'graph B' },
      { label: 'C', text: 'graph C' },
      { label: 'D', text: 'graph D' },
    ],
    correctAnswer: 'C',
    solution:
      'Since p = ρgh and ρ and g are constants, pressure is directly proportional to depth. The graph is a straight line through the origin — graph C.',
    criteria: [],
  },
  // ─── Q10 ───
  {
    id: 'igcse-diag-q10',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q10 · Convection',
    prompt:
      'The diagram shows the view of a room heated by a radiator. The arrowed line from X to Y is the path of the convection current in the air.\nWhich row about the air temperature and the air density at X and at Y is correct?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Thermal Physics', 'Difficulty 2'],
    image: {
      src: `${IMG}/q10-convection-room.webp`,
      alt: 'Room diagram showing a radiator and convection current path from X to Y',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Air near the radiator is heated. What happens to its temperature and density?',
    choices: [
      { label: 'A', text: 'air temperature higher at X; air density higher at X' },
      { label: 'B', text: 'air temperature higher at X; air density higher at Y' },
      { label: 'C', text: 'air temperature higher at Y; air density higher at Y' },
      { label: 'D', text: 'air temperature higher at Y; air density higher at X' },
    ],
    correctAnswer: 'B',
    solution:
      'X is next to the radiator where air is heated, so the temperature is higher at X. Heated air expands and becomes less dense, so the cooler, denser air is at Y. Convection works because hot (less dense) air rises and cool (more dense) air sinks.',
    criteria: [],
  },
  // ─── Q11 ───
  {
    id: 'igcse-diag-q11',
    mode: 'multiple_choice',
    difficulty: 2,
    title: 'Q11 · Reflection',
    prompt:
      'A ray of light is reflected by a plane mirror.\nWhich row shows the angle of incidence and the angle of reflection?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Light & Waves', 'Difficulty 2'],
    image: {
      src: `${IMG}/q11-mirror-reflection.webp`,
      alt: 'Ray diagram showing reflection at a plane mirror with angles P, Q, R and S marked',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Both angles are measured from the normal (the dashed perpendicular line).',
    choices: [
      { label: 'A', text: 'angle of incidence = P; angle of reflection = Q' },
      { label: 'B', text: 'angle of incidence = P; angle of reflection = S' },
      { label: 'C', text: 'angle of incidence = Q; angle of reflection = R' },
      { label: 'D', text: 'angle of incidence = R; angle of reflection = S' },
    ],
    correctAnswer: 'C',
    solution:
      'The angle of incidence and angle of reflection are both measured between the ray and the normal. Q is between the incident ray and the normal; R is between the reflected ray and the normal. P and S are measured from the mirror surface, which is incorrect.',
    criteria: [],
  },
  // ─── Q12 ───
  {
    id: 'igcse-diag-q12',
    mode: 'multiple_choice',
    difficulty: 3,
    title: 'Q12 · Resistance',
    prompt:
      'A wire has a resistance of 8.0 Ω.\nA second wire of the same material has twice the length and twice the cross-sectional area.\nWhat is the resistance of the second wire?',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['R = ρL / A'],
    tags: ['Electricity', 'Difficulty 3'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Use R = ρL/A and see what happens when L doubles and A doubles.',
    choices: [
      { label: 'A', text: '4.0 Ω' },
      { label: 'B', text: '8.0 Ω' },
      { label: 'C', text: '16 Ω' },
      { label: 'D', text: '32 Ω' },
    ],
    correctAnswer: 'B',
    solution:
      'R = ρL/A. Doubling the length doubles R, but doubling the area halves R. The two effects cancel: R₂ = ρ(2L)/(2A) = ρL/A = 8.0 Ω.',
    criteria: [],
  },
  // ─── Q13 ───
  {
    id: 'igcse-diag-q13',
    mode: 'multiple_choice',
    difficulty: 3,
    title: 'Q13 · Temperature-Sensing Circuit',
    prompt:
      'The diagram shows a circuit used to switch on a heater when the temperature drops below a certain value.\nWhich row shows the components that should be connected at X and at Y?',
    context: 'Take g = 9.8 m/s² throughout.',
    tags: ['Electricity', 'Difficulty 3'],
    image: {
      src: `${IMG}/q13-heater-circuit.webp`,
      alt: 'Circuit diagram with components X and Y, and a table of component options for rows A–D',
      role: 'question',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'Which component\u2019s resistance changes with temperature?',
    choices: [
      { label: 'A', text: 'X = fixed resistor; Y = light-dependent resistor (LDR)' },
      { label: 'B', text: 'X = fixed resistor; Y = thermistor' },
      { label: 'C', text: 'X = thermistor; Y = light-dependent resistor (LDR)' },
      { label: 'D', text: 'X = thermistor; Y = fixed resistor' },
    ],
    correctAnswer: 'B',
    solution:
      'The circuit must respond to temperature, so Y must be a thermistor (its resistance changes with temperature). X is a fixed resistor forming a potential divider with the thermistor. When the temperature drops, the thermistor\u2019s resistance increases, the voltage across it rises, and the switching circuit turns on the heater. An LDR responds to light, not temperature.',
    criteria: [],
  },
  // ─── Q14 ───
  {
    id: 'igcse-diag-q14',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q14 · Charging by Friction',
    prompt:
      'A plastic rod is uncharged.\nWhen the rod is rubbed with a woollen cloth, the rod becomes negatively charged.\nExplain, in terms of particles, why the rod becomes negatively charged. [2]',
    context: 'Structured question. Write your answer in complete sentences.',
    tags: ['Electricity', 'Difficulty 2'],
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'Which particles are transferred, and in which direction?',
    criteria: [
      {
        id: 'igcse-diag-q14-c1',
        label: 'Electron transfer',
        point: 'States that electrons move from the woollen cloth to the plastic rod.',
        keywords: ['electron', 'move', 'transfer', 'cloth', 'rod'],
        feedback: 'Name the particle (electron) and the direction of transfer (cloth → rod).',
      },
      {
        id: 'igcse-diag-q14-c2',
        label: 'Net charge',
        point: 'States that the rod gains electrons and therefore becomes negatively charged.',
        keywords: ['gains', 'negative', 'excess', 'electrons'],
        feedback: 'Explain the consequence: gaining electrons gives the rod a net negative charge.',
      },
    ],
    sampleAnswer:
      'Electrons move from the woollen cloth to the plastic rod. The rod gains electrons and therefore becomes negatively charged.',
    solution:
      'During rubbing, electrons are transferred from the woollen cloth to the plastic rod. The rod gains extra electrons, giving it a net negative charge. (Only electrons move — protons stay in the nuclei.)',
  },
  // ─── Q15.1 ───
  {
    id: 'igcse-diag-q15-1',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q15.1 · Pressure at Depth',
    prompt:
      'Fig. 15.1 shows a rectangular block floating in water. The density of the water is 1000 kg/m³.\nThe area of the base of the block is 0.014 m². The base of the block is at a depth of 0.087 m below the surface of the water.\n\n15.1 Show that the pressure due to the water at the base of the block is approximately 850 Pa. [2]',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['p = ρgh'],
    tags: ['Pressure', 'Difficulty 2'],
    image: {
      src: `${IMG}/q15-floating-block.webp`,
      alt: 'Fig. 15.1 — rectangular block floating in water with depth 0.087 m marked',
      role: 'diagram',
      caption: 'Fig. 15.1',
    },
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'Substitute ρ, g and h into p = ρgh.',
    criteria: [
      {
        id: 'igcse-diag-q15-1-c1',
        label: 'Formula & substitution',
        point: 'Uses p = ρgh with correct substitution: p = 1000 × 9.8 × 0.087.',
        keywords: ['p = ρgh', '1000', '9.8', '0.087'],
        feedback: 'Write the formula first, then substitute the values.',
      },
      {
        id: 'igcse-diag-q15-1-c2',
        label: 'Result',
        point: 'Obtains p = 852.6 Pa ≈ 850 Pa.',
        keywords: ['852.6', '853', '850'],
        feedback: '852.6 Pa rounds to approximately 850 Pa.',
      },
    ],
    sampleAnswer: 'p = ρgh = 1000 × 9.8 × 0.087 = 852.6 Pa ≈ 850 Pa',
    solution: 'p = ρgh = (1000)(9.8)(0.087) = 852.6 Pa ≈ 850 Pa.',
  },
  // ─── Q15.2 ───
  {
    id: 'igcse-diag-q15-2',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q15.2 · Force from Pressure',
    prompt:
      '15.2 Calculate the force F on the base of the block caused by the pressure given in 15.1. [2]\n(The base area of the block is 0.014 m².)',
    context: 'Take g = 9.8 m/s² throughout. Use p ≈ 850 Pa from 15.1.',
    equations: ['F = pA'],
    tags: ['Pressure', 'Difficulty 2'],
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'Rearrange p = F/A to find F.',
    criteria: [
      {
        id: 'igcse-diag-q15-2-c1',
        label: 'Formula & substitution',
        point: 'Uses F = pA with correct substitution: F = 850 × 0.014 (or 852.6 × 0.014).',
        keywords: ['F = pA', '850', '0.014'],
        feedback: 'F = pA = 850 × 0.014.',
      },
      {
        id: 'igcse-diag-q15-2-c2',
        label: 'Result',
        point: 'Obtains F ≈ 12 N (11.9 N).',
        keywords: ['11.9', '12'],
        feedback: 'F = 11.9 N ≈ 12 N.',
      },
    ],
    sampleAnswer: 'F = pA = 850 × 0.014 = 11.9 N ≈ 12 N',
    solution: 'F = pA = (850)(0.014) = 11.9 N ≈ 12 N.',
  },
  // ─── Q15.3 ───
  {
    id: 'igcse-diag-q15-3',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q15.3 · Mass of the Block',
    prompt:
      '15.3 Force F is equal to the weight of the block. Calculate the mass of the block. [2]\n(Use F ≈ 12 N from 15.2.)',
    context: 'Take g = 9.8 m/s² throughout.',
    equations: ['W = mg'],
    tags: ['Pressure', 'Difficulty 2'],
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'Weight W = mg. Rearrange to find m.',
    criteria: [
      {
        id: 'igcse-diag-q15-3-c1',
        label: 'Formula & substitution',
        point: 'Uses m = W/g = F/g with correct substitution: m = 12 / 9.8 (or 11.9 / 9.8).',
        keywords: ['m = W/g', '12', '9.8', '11.9'],
        feedback: 'Since F = W = mg, m = F/g.',
      },
      {
        id: 'igcse-diag-q15-3-c2',
        label: 'Result',
        point: 'Obtains m ≈ 1.2 kg.',
        keywords: ['1.22', '1.2'],
        feedback: 'm = 12/9.8 = 1.22 kg ≈ 1.2 kg.',
      },
    ],
    sampleAnswer: 'm = F/g = 12 / 9.8 = 1.22 kg ≈ 1.2 kg',
    solution: 'm = W/g = F/g = 12/9.8 = 1.22 kg ≈ 1.2 kg.',
  },
  // ─── Q16.1 ───
  {
    id: 'igcse-diag-q16-1',
    mode: 'free_response',
    difficulty: 1,
    title: 'Q16.1 · Distance a',
    prompt:
      'A student determines the weight of a metre ruler using a balancing method. Fig. 16.1 shows the set-up.\n\n16.1 The student places the metre ruler on the pivot. She places a load P on the metre ruler at the 90.0 cm mark. She adjusts the position of the metre ruler on the pivot so that the metre ruler is as near as possible to being balanced.\nThe ruler balances with the pivot at the 75.0 cm mark.\nCalculate the distance a from the 90.0 cm mark to the pivot. [1]',
    context: 'See Fig. 16.1 for the experimental set-up.',
    tags: ['Moments & Equilibrium', 'Difficulty 1'],
    image: {
      src: `${IMG}/q16-balancing-ruler.webp`,
      alt: 'Fig. 16.1 — metre ruler balanced on a pivot with load P, distances a and b marked',
      role: 'diagram',
      caption: 'Fig. 16.1',
    },
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'a is simply the difference between the two scale readings.',
    criteria: [
      {
        id: 'igcse-diag-q16-1-c1',
        label: 'Correct value',
        point: 'a = 90.0 − 75.0 = 15.0 cm.',
        keywords: ['15.0', '15'],
        feedback: 'a = 90.0 − 75.0 = 15.0 cm.',
      },
    ],
    sampleAnswer: 'a = 90.0 − 75.0 = 15.0 cm',
    solution: 'a = 90.0 − 75.0 = 15.0 cm.',
  },
  // ─── Q16.2 ───
  {
    id: 'igcse-diag-q16-2',
    mode: 'free_response',
    difficulty: 3,
    title: 'Q16.2 · Graph of a against b',
    prompt:
      '16.2 She repeats the procedure placing the load P at the 85.0 cm, 80.0 cm, 75.0 cm and 70.0 cm marks. She records the values of a and b in Table 16.1.\n\nTable 16.1:\na/cm: 15.0, 13.1, 11.3, 9.4, 7.5\nb/cm: 75.0, 71.9, 68.8, 65.6, 62.5\n\nPlot a graph of a/cm (y-axis) against b/cm (x-axis). Start the y-axis at a = 0. Start the x-axis at a suitable value for the results. Draw the best-fit line. [4]',
    context: 'Describe how you would plot the points and draw the line, or sketch the expected result.',
    tags: ['Moments & Equilibrium', 'Difficulty 3'],
    maxScore: 4,
    source: SOURCE,
    answerNudge: 'A good graph answer: correct axes, all 5 points plotted, straight best-fit line through the origin region.',
    criteria: [
      {
        id: 'igcse-diag-q16-2-c1',
        label: 'Axes',
        point: 'Labels axes correctly: a/cm on y-axis, b/cm on x-axis, with suitable scales (x from ~60).',
        keywords: ['axis', 'axes', 'a/cm', 'b/cm', 'scale', 'x-axis', 'y-axis'],
        feedback: 'Label both axes with quantities and units; choose a scale that uses more than half the grid.',
      },
      {
        id: 'igcse-diag-q16-2-c2',
        label: 'Points plotted',
        point: 'All five data points plotted correctly.',
        keywords: ['plot', 'points', 'five', '5'],
        feedback: 'Plot all 5 (a, b) pairs accurately.',
      },
      {
        id: 'igcse-diag-q16-2-c3',
        label: 'Best-fit line',
        point: 'A single straight best-fit line drawn (not dot-to-dot).',
        keywords: ['best-fit', 'straight', 'line'],
        feedback: 'Draw one straight line of best fit passing close to all points.',
      },
      {
        id: 'igcse-diag-q16-2-c4',
        label: 'Line quality',
        point: 'The line passes close to all points with points distributed on both sides.',
        keywords: ['close', 'both sides', 'origin', 'through'],
        feedback: 'Points should be roughly evenly distributed above and below the line.',
      },
    ],
    sampleAnswer:
      'Plot a/cm on the y-axis (0–16) and b/cm on the x-axis (60–76). Plot all five points. Draw a single straight best-fit line passing close to all the points.',
    solution:
      'The five points lie close to a straight line with positive gradient. The best-fit line should start near the origin region and pass through the points from lower-left to upper-right.',
  },
  // ─── Q16.3 ───
  {
    id: 'igcse-diag-q16-3',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q16.3 · Gradient',
    prompt:
      '16.3 Determine the gradient G of the graph. Show clearly on the graph how you obtained the necessary information. [2]',
    context: 'Use the best-fit line (not individual data points) to find the gradient.',
    tags: ['Moments & Equilibrium', 'Difficulty 2'],
    image: {
      src: `${IMG}/q16-graph-plot.webp`,
      alt: 'Graph of a/cm against b/cm with best-fit line and gradient triangle shown',
      role: 'question',
      caption: 'Reference graph with gradient triangle',
    },
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'G = Δa / Δb. Read two points from the best-fit line.',
    criteria: [
      {
        id: 'igcse-diag-q16-3-c1',
        label: 'Method',
        point: 'Uses two points on the best-fit line (not data points) to calculate G = Δa/Δb.',
        keywords: ['gradient', 'Δa', 'Δb', 'best-fit', 'line'],
        feedback: 'Choose two well-separated points on the line itself.',
      },
      {
        id: 'igcse-diag-q16-3-c2',
        label: 'Result',
        point: 'G = 7.2 / 12.0 = 0.60 (accept 0.55–0.65).',
        keywords: ['0.60', '0.6', '7.2', '12.0'],
        feedback: 'G = Δa/Δb = 7.2/12.0 = 0.60.',
      },
    ],
    sampleAnswer: 'G = Δa / Δb = 7.2 / 12.0 = 0.60',
    solution: 'Taking the gradient triangle from the best-fit line: G = Δa/Δb = 7.2/12.0 = 0.60.',
  },
  // ─── Q16.4 ───
  {
    id: 'igcse-diag-q16-4',
    mode: 'free_response',
    difficulty: 1,
    title: 'Q16.4 · Weight of the Ruler',
    prompt:
      '16.4 The weight W of the metre ruler is numerically equal to 2G. Calculate the weight W of the metre ruler. [2]',
    context: 'Use your value of G from 16.3 (G = 0.60).',
    tags: ['Moments & Equilibrium', 'Difficulty 1'],
    maxScore: 2,
    source: SOURCE,
    answerNudge: 'Simply substitute your gradient into W = 2G.',
    criteria: [
      {
        id: 'igcse-diag-q16-4-c1',
        label: 'Substitution',
        point: 'Substitutes G = 0.60 into W = 2G.',
        keywords: ['W = 2G', '2', '0.60', '0.6'],
        feedback: 'W = 2G = 2 × 0.60.',
      },
      {
        id: 'igcse-diag-q16-4-c2',
        label: 'Result',
        point: 'W = 1.2 N.',
        keywords: ['1.2'],
        feedback: 'W = 1.2 N.',
      },
    ],
    sampleAnswer: 'W = 2G = 2 × 0.60 = 1.2 N',
    solution: 'W = 2G = 2(0.60) = 1.2 N.',
  },
  // ─── Q16.5 ───
  {
    id: 'igcse-diag-q16-5',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q16.5 · Experimental Difficulty',
    prompt:
      '16.5 Suggest one practical reason why it is difficult to obtain accurate readings for a and b. [1]',
    context: 'Think about the practical challenges of the balancing method.',
    tags: ['Moments & Equilibrium', 'Difficulty 2'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'What makes it hard to read the exact balance position?',
    criteria: [
      {
        id: 'igcse-diag-q16-5-c1',
        label: 'Valid reason',
        point: 'States that it is difficult to judge the exact position at which the ruler is balanced (or the ruler may rock/tilt slightly; parallax when reading the scale).',
        keywords: ['judge', 'exact', 'balance', 'balanced', 'position', 'rock', 'tilt', 'parallax'],
        feedback: 'A valid answer refers to judging the balance point, ruler rocking, or parallax.',
      },
    ],
    sampleAnswer: 'It is difficult to judge the exact position at which the ruler is balanced.',
    solution:
      'It is difficult to judge the exact position at which the ruler is balanced — the ruler may rock slightly, and small tilts are hard to detect.',
  },
  // ─── Q16.6 ───
  {
    id: 'igcse-diag-q16-6',
    mode: 'free_response',
    difficulty: 2,
    title: 'Q16.6 · Centre of Mass',
    prompt:
      '16.6 Using only the apparatus provided for the experiment, explain briefly how you would determine the position of the centre of mass of the metre ruler. [1]',
    context: 'Apparatus: metre ruler, pivot, load P.',
    tags: ['Moments & Equilibrium', 'Difficulty 2'],
    maxScore: 1,
    source: SOURCE,
    answerNudge: 'What happens if you balance the ruler without the load?',
    criteria: [
      {
        id: 'igcse-diag-q16-6-c1',
        label: 'Method',
        point: 'Remove the load and balance the metre ruler alone on the pivot; the balance point is the centre of mass.',
        keywords: ['remove', 'load', 'balance', 'alone', 'pivot', 'centre of mass'],
        feedback: 'Balance the ruler alone — the pivot position at balance is the centre of mass.',
      },
    ],
    sampleAnswer:
      'Remove the load and balance the metre ruler alone on the pivot. The balance point is the position of its centre of mass.',
    solution:
      'Remove the load P and balance the metre ruler alone on the pivot. The position of the pivot when the ruler balances is the position of its centre of mass.',
  },
];

export const igcseQuickDiagnosticMeta = {
  title: 'IGCSE Physics Quick Diagnostic',
  subtitle: '16 questions · MCQ + structured · with worked solutions',
  eyebrow: 'Evaluation · 综合评估',
  description:
    'A full diagnostic paper covering measurement, motion, forces, energy, pressure, thermal physics, light, electricity and moments. 13 multiple-choice questions plus 3 structured questions with detailed mark schemes.',
  sources: [{ label: 'Mike Wang Physics', url: 'https://www.pocket-cosmos.com' }],
};
