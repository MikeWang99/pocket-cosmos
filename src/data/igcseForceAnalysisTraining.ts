import type { PracticeStep } from '../types/practice';

const ASSET_BASE = '/curriculum-assets/igcse-force-analysis';

const TASK_EN =
  'On paper, draw a free-body diagram for the object(s) named: one arrow per force, starting from the object (or a dot), pointing in the correct direction, and labelled with the force name. Make arrow lengths reflect relative sizes where the situation tells you. Upload a photo of your drawing, then list every force you drew (with its direction) in the answer box.';

const TASK_ZH =
  '在纸上画出指定物体的受力分析图——每个力一个箭头，从物体（或圆点）出发，方向正确并标注力的名称；题目有提示时用箭头长短表示力的大小关系。画完拍照上传，并在答案框中按“力名 + 方向”列出你画的每一个力。';

interface ForceDiagramStep {
  id: string;
  title: string;
  context: string;
  difficulty: number;
  keywords: string[];
  solution: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
}

const buildStep = (spec: ForceDiagramStep): PracticeStep => ({
  id: spec.id,
  mode: 'free_response',
  difficulty: spec.difficulty,
  title: spec.title,
  prompt: `${spec.context}\n\n${TASK_EN}\n\n${TASK_ZH}`,
  context: 'CIE IGCSE Physics · Force Analysis Training · free-body diagram drawing task',
  tags: ['CIE IGCSE Physics', 'Force Analysis', 'Free-Body Diagram', `Difficulty ${spec.difficulty}`],
  maxScore: 4,
  source: 'Pocket Cosmos original · Force Analysis Training 受力分析专项训练',
  answerNudge:
    'List each force as "name + direction", e.g. weight, vertically down. Cover every contact and every field force, and never invent a force in the direction of motion.',
  criteria: [
    {
      id: `${spec.id}-forces`,
      label: 'Forces identified',
      point: 'Every force acting on the object is listed with the correct direction',
      keywords: spec.keywords,
      feedback:
        'Check your list against the model diagram: one arrow per real force (weight, contact forces only where objects touch), each pointing the right way.',
    },
    {
      id: `${spec.id}-drawing`,
      label: 'Diagram drawn and uploaded',
      point: 'A free-body diagram is drawn on paper and uploaded, with labelled arrows from the object',
      keywords: ['draw', 'diagram', 'arrow', 'uploaded', 'photo', '画', '箭头', '受力'],
      feedback: 'Upload a clear photo of your hand-drawn diagram with labelled arrows starting from the object.',
    },
  ],
  solution: spec.solution,
  solutionImage: {
    src: `${ASSET_BASE}/${spec.imageSrc}`,
    alt: spec.imageAlt,
    caption: spec.caption,
  },
});

const steps: PracticeStep[] = [
  buildStep({
    id: 'igcse-fat-01',
    title: 'Q1 · Box pulled by an angled rope at constant speed',
    context:
      'A box is pulled along rough horizontal ground by a rope that makes an angle above the horizontal. The box moves at constant speed in a straight line.',
    difficulty: 3,
    keywords: ['weight', 'normal', 'tension', 'friction', 'down', 'up', 'opposite'],
    solution:
      'Four forces on the box: weight W vertically down; normal reaction N vertically up; tension T along the rope (upwards at an angle); friction opposite the motion. Constant speed ⇒ balanced forces: vertically N + T·sin θ = W (so N < W), horizontally friction = T·cos θ.',
    imageSrc: 'fbd-01-angled-rope.svg',
    imageAlt: 'Model free-body diagram for a box pulled by an angled rope at constant speed',
    caption: 'Model FBD: W down, N up, T along the rope, friction backwards; N < W because T has an upward component.',
  }),
  buildStep({
    id: 'igcse-fat-02',
    title: 'Q2 · Forces on the lower block of a stacked pair',
    context:
      'Block A rests on top of block B. The two blocks move together to the right at constant speed over rough horizontal ground. Ignore air resistance.',
    difficulty: 5,
    keywords: ['weight', 'normal', 'contact', 'friction', 'ground', 'down'],
    solution:
      'Forces on block B only: its own weight down; the contact force that A exerts on B (down); the normal reaction from the ground (up, the largest force); friction from the ground (opposite the motion). Trap: there is NO friction between A and B — at constant speed block A needs no horizontal force, so by Newton III B feels none either. Vertically: N_ground = W_B + force from A.',
    imageSrc: 'fbd-02-stacked-blocks.svg',
    imageAlt: 'Model free-body diagram for the lower block of two stacked blocks moving at constant speed',
    caption: 'Model FBD for block B: weight of B, contact force from A (down), ground normal reaction (up, largest), ground friction (backwards).',
  }),
  buildStep({
    id: 'igcse-fat-03',
    title: 'Q3 · Block at rest on a rough slope',
    context:
      'A block is at rest on a rough slope that makes an angle θ with the horizontal. The block would slide down if the friction were removed.',
    difficulty: 3,
    keywords: ['weight', 'normal', 'friction', 'slope', 'perpendicular', 'down'],
    solution:
      'Three forces: weight W vertically down (never perpendicular to the slope); normal reaction N perpendicular to the slope; friction up the slope (opposing the tendency to slide down). Equilibrium components: along the slope friction = W·sin θ; perpendicular to the slope N = W·cos θ.',
    imageSrc: 'fbd-03-block-on-slope.svg',
    imageAlt: 'Model free-body diagram for a block at rest on a rough slope',
    caption: 'Model FBD: W straight down, N perpendicular to the slope, friction up the slope.',
  }),
  buildStep({
    id: 'igcse-fat-04',
    title: 'Q4 · Ball whirled in a horizontal circle (extended)',
    context:
      'A ball tied to a string is whirled so that it moves at constant speed in a horizontal circle, with the string sweeping out a cone. Ignore air resistance.',
    difficulty: 5,
    keywords: ['weight', 'tension', 'centre', 'down', 'string'],
    solution:
      'Only two forces act: weight W vertically down and tension T along the string. Their resultant is horizontal and points towards the centre of the circle — this is the centripetal (resultant) force. Vertically: T·cos θ = W; horizontally: T·sin θ = centripetal force. There is no outward “centrifugal” force.',
    imageSrc: 'fbd-04-circular-motion.svg',
    imageAlt: 'Model free-body diagram for a ball whirled in a horizontal circle on a string',
    caption: 'Model FBD: only tension (along the string) and weight; their resultant points towards the centre.',
  }),
  buildStep({
    id: 'igcse-fat-05',
    title: 'Q5 · Person in a lift accelerating upwards (extended)',
    context:
      'A person stands on the floor of a lift. The lift accelerates upwards. Ignore air resistance.',
    difficulty: 4,
    keywords: ['weight', 'normal', 'up', 'down', 'greater'],
    solution:
      'Only two forces on the person: weight W down and the normal reaction N from the lift floor up. The person accelerates upwards, so the resultant force must point up: N − W = ma, hence N > W. Draw N longer than W. (The “extra” normal reaction is why the person feels heavier.)',
    imageSrc: 'fbd-05-lift.svg',
    imageAlt: 'Model free-body diagram for a person in a lift accelerating upwards',
    caption: 'Model FBD: N from the floor (longer) up, weight down; N > W because the resultant force points up.',
  }),
  buildStep({
    id: 'igcse-fat-06',
    title: 'Q6 · Two masses joined over a pulley (multi-body)',
    context:
      'A 3.0 kg mass and a 2.0 kg mass are joined by a light string passing over a light, frictionless pulley. The system is released from rest and the 3.0 kg mass accelerates downwards.',
    difficulty: 5,
    keywords: ['weight', 'tension', 'up', 'down', '29', '20'],
    solution:
      'Draw one diagram per mass. 3.0 kg mass: weight W = 3.0 × 9.8 ≈ 29 N down and tension T up; it accelerates down, so W > T (weight arrow longer). 2.0 kg mass: weight W = 2.0 × 9.8 ≈ 20 N down and tension T up; it accelerates up, so T > W (tension arrow longer). The tension has the same value in both diagrams because the string is light.',
    imageSrc: 'fbd-06-pulley-pair.svg',
    imageAlt: 'Model free-body diagrams for two masses joined over a pulley',
    caption: 'Model FBDs: each mass has weight down and tension up; arrow lengths reflect which side accelerates which way.',
  }),
  buildStep({
    id: 'igcse-fat-07',
    title: 'Q7 · Skydiver just after opening the parachute',
    context:
      'A skydiver is falling vertically downwards at high speed. At the instant shown, the parachute has just opened and the skydiver is still moving downwards.',
    difficulty: 3,
    keywords: ['weight', 'air resistance', 'drag', 'up', 'down', 'greater'],
    solution:
      'Two forces: weight W down and air resistance (drag) up. The parachute greatly increases drag, so immediately after opening drag > W; draw the drag arrow much longer. The resultant force points upwards, so the skydiver decelerates while still moving down. As speed falls, drag shrinks until drag = W at the new terminal speed.',
    imageSrc: 'fbd-07-skydiver.svg',
    imageAlt: 'Model free-body diagram for a skydiver just after opening the parachute',
    caption: 'Model FBD: air resistance (much longer) up, weight down — the skydiver decelerates.',
  }),
  buildStep({
    id: 'igcse-fat-08',
    title: 'Q8 · Block pulled up a rough slope with acceleration',
    context:
      'A block is pulled up a rough slope by a rope parallel to the slope. The block accelerates up the slope.',
    difficulty: 4,
    keywords: ['weight', 'normal', 'tension', 'friction', 'slope', 'down'],
    solution:
      'Four forces: weight W vertically down; normal reaction N perpendicular to the slope; tension T up the slope (along the rope); friction down the slope (opposing the motion). Accelerating up the slope means T > friction + W·sin θ, so T is the longest arrow along the slope. Perpendicular to the slope the forces balance: N = W·cos θ.',
    imageSrc: 'fbd-08-pulled-up-slope.svg',
    imageAlt: 'Model free-body diagram for a block pulled up a rough slope with acceleration',
    caption: 'Model FBD: W down, N perpendicular to the slope, T up the slope, friction down the slope.',
  }),
  buildStep({
    id: 'igcse-fat-09',
    title: 'Q9 · Picture hung by two strings at different angles',
    context:
      'A picture is hung at rest from a single hook by two strings that make different angles with the horizontal. The picture hangs symmetrically from its centre.',
    difficulty: 4,
    keywords: ['weight', 'tension', 'string', 'down', 'away'],
    solution:
      'Three forces on the picture: weight W down from the centre; tension T₁ along string 1; tension T₂ along string 2. Each tension points away from the picture along its own string. At rest, the forces balance: the horizontal components of T₁ and T₂ cancel, and their vertical components add up to W. Because the angles differ, T₁ ≠ T₂ (the string closer to horizontal carries the larger tension).',
    imageSrc: 'fbd-09-picture-strings.svg',
    imageAlt: 'Model free-body diagram for a picture hung by two strings at different angles',
    caption: 'Model FBD: W down plus two tensions along the strings; components balance in both directions.',
  }),
  buildStep({
    id: 'igcse-fat-10',
    title: 'Q10 · Book pressed against a rough vertical wall',
    context:
      'A book is held at rest against a rough vertical wall by a horizontal force F pushing the book towards the wall.',
    difficulty: 5,
    keywords: ['weight', 'normal', 'friction', 'applied', 'up', 'down', 'wall'],
    solution:
      'Four forces on the book: the applied force F towards the wall (horizontal); the normal reaction N from the wall, away from the wall (horizontal, and N = F); weight W down; friction from the wall acting UP (the book would slide down without it), with friction = W. Pressing harder increases N and therefore the maximum possible friction, but does not change the friction actually needed (which equals W).',
    imageSrc: 'fbd-10-book-wall.svg',
    imageAlt: 'Model free-body diagram for a book pressed against a rough vertical wall',
    caption: 'Model FBD: applied force F, normal reaction N, weight W down, friction up. N = F and friction = W.',
  }),
];

export const igcseForceAnalysisMeta = {
  title: 'Force Analysis Training · 受力分析专项训练',
  subtitle:
    'Ten drawing tasks on free-body diagrams: multi-body systems, slopes, circular motion, lifts, pulleys and walls. Draw first, then compare with the model diagram.',
  eyebrow: 'CIE IGCSE Physics · Topic 1.5 Forces',
  description:
    'For each scenario, draw the free-body diagram yourself — one labelled arrow per force with the correct direction and sensible relative lengths — upload a photo, and list the forces in the answer box. After submitting, compare with the model free-body diagram and the marking notes.',
  sources: [{ label: 'Mike Wang Physics', url: 'https://www.pocket-cosmos.com' }],
};

export const igcseForceAnalysisSteps = steps;
