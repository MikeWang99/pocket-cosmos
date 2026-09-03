import type { PracticeStep } from '../types/practice';
import type { PracticeSet } from './practiceSets';

const sourceRoot = '/fma-2008-assets';
const sourceLabel = 'F=ma 2008 Historical Exam';
const sourceUrl = '/fma-2008-assets/source-inventory.json';

type FmaQuestion = {
  number: number;
  topic: string;
  tags: string[];
  stem: string;
  choices: string[];
  answer: string;
  solution: string;
};

const questions: FmaQuestion[] = [
  {
    number: 1,
    topic: 'Kinematics',
    tags: ['Kinematics', 'Constant acceleration', 'SUVAT', 'Acceleration'],
    stem: 'A bird flying in a straight line, initially at $10\,\mathrm{m/s}$, uniformly increases its speed to $18\,\mathrm{m/s}$ while covering a distance of $40\,\mathrm{m}$. What is the magnitude of the acceleration of the bird?',
    choices: ['$0.1\,\mathrm{m/s^2}$', '$0.2\,\mathrm{m/s^2}$', '$2.0\,\mathrm{m/s^2}$', '$2.8\,\mathrm{m/s^2}$', '$5.6\,\mathrm{m/s^2}$'],
    answer: 'D',
    solution: 'Use $v^2=u^2+2as$: $18^2=10^2+2a(40)$, so $a=2.8\,\mathrm{m/s^2}$.',
  },
  {
    number: 2,
    topic: 'Vectors and displacement',
    tags: ['Vectors', 'Displacement', 'Three-dimensional geometry', 'Pythagorean theorem'],
    stem: 'A cockroach crawls along the walls inside a cubical room with edge length $3\,\mathrm{m}$. It starts at the back lower-left corner and finishes at the front upper-right corner. What is the magnitude of its displacement?',
    choices: ['$3\sqrt{2}\,\mathrm{m}$', '$3\sqrt[3]{2}\,\mathrm{m}$', '$3\sqrt{3}\,\mathrm{m}$', '$3\,\mathrm{m}$', '$9\,\mathrm{m}$'],
    answer: 'C',
    solution: 'The displacement is the space diagonal: $\sqrt{3^2+3^2+3^2}=3\sqrt{3}\,\mathrm{m}$.',
  },
  {
    number: 3,
    topic: 'Kinematics',
    tags: ['Kinematics', 'Position-time graphs', 'Instantaneous velocity', 'Gradient'],
    stem: 'The position-versus-time graph for an object moving in a straight line is shown in the source figure. What is the instantaneous velocity at $t=2\,\mathrm{s}$?',
    choices: ['$-2\,\mathrm{m/s}$', '$-\tfrac{1}{2}\,\mathrm{m/s}$', '$0\,\mathrm{m/s}$', '$2\,\mathrm{m/s}$', '$4\,\mathrm{m/s}$'],
    answer: 'A',
    solution: 'The graph is a straight line, so the velocity is its gradient: $( -2-4)/(3-0)=-2\,\mathrm{m/s}$.',
  },
  {
    number: 4,
    topic: 'Kinematics',
    tags: ['Kinematics', 'Velocity-time graphs', 'Displacement', 'Area under a graph'],
    stem: 'The source figure shows the velocity-versus-time graph for a toy car moving along a straight line. What is the maximum displacement from the start for the toy car?',
    choices: ['$3\,\mathrm{m}$', '$5\,\mathrm{m}$', '$6.5\,\mathrm{m}$', '$7\,\mathrm{m}$', '$7.5\,\mathrm{m}$'],
    answer: 'D',
    solution: 'Maximum displacement occurs when the velocity first reaches zero. Integrate the positive part of the graph: $\tfrac12(1)(2+4)+\tfrac12(1.5)(4)=7\,\mathrm{m}$.',
  },
  {
    number: 5,
    topic: 'Kinematics',
    tags: ['Kinematics', 'Velocity-time graphs', 'Acceleration-time graphs', 'Piecewise motion'],
    stem: 'Using the velocity-versus-time graph in the source figure, which acceleration-versus-time graph most closely represents the acceleration of the toy car?',
    choices: ['Graph A', 'Graph B', 'Graph C', 'Graph D', 'Graph E'],
    answer: 'C',
    solution: 'Acceleration is the slope of the velocity graph: positive and constant first, zero while the graph is horizontal, then negative and constant. This is Graph C.',
  },
  {
    number: 6,
    topic: 'Projectile motion',
    tags: ['Projectile motion', 'Components', 'Trigonometry', 'Range'],
    stem: 'A cannon fires projectiles on a flat range at fixed speed but variable angle. The maximum range is $L$. What is the range when it fires at an angle $\pi/6$ above the horizontal? Ignore air resistance.',
    choices: ['$\tfrac{\sqrt{3}}{2}L$', '$\tfrac{1}{\sqrt{2}}L$', '$\tfrac{1}{\sqrt{3}}L$', '$\tfrac{1}{2}L$', '$\tfrac{1}{3}L$'],
    answer: 'A',
    solution: 'For launch and landing at the same height, $R=v^2\sin(2\theta)/g$. The maximum is $L=v^2/g$, so $R/L=\sin(\pi/3)=\sqrt{3}/2$.',
  },
  {
    number: 7,
    topic: 'Momentum and collisions',
    tags: ['Momentum', 'Inelastic collisions', 'Conservation of momentum', 'One-dimensional motion'],
    stem: 'A toboggan sled travels at $2.0\,\mathrm{m/s}$ across the snow. The sled and riders have combined mass $120\,\mathrm{kg}$. A child of mass $40\,\mathrm{kg}$ moving in the opposite direction at $5.0\,\mathrm{m/s}$ jumps onto the sled. What is the new speed? Neglect friction.',
    choices: ['$0.25\,\mathrm{m/s}$', '$0.33\,\mathrm{m/s}$', '$2.75\,\mathrm{m/s}$', '$3.04\,\mathrm{m/s}$', '$3.67\,\mathrm{m/s}$'],
    answer: 'A',
    solution: 'Take the sled direction as positive. The initial momentum is $120(2.0)+40(-5.0)=40\,\mathrm{kg\,m/s}$. Dividing by the combined mass $160\,\mathrm{kg}$ gives $v=0.25\,\mathrm{m/s}$ in the sled\'s original direction.',
  },
  {
    number: 8,
    topic: 'Dynamics and friction',
    tags: ['Dynamics', 'Circular motion', 'Static friction', 'Centripetal force'],
    stem: 'Riders stand with their backs against the wall of a circular room of diameter $8.0\,\mathrm{m}$. The room spins horizontally at $45\,\mathrm{rev/min}$ when the floor drops. What minimum coefficient of static friction keeps a rider from sliding down?',
    choices: ['$0.0012$', '$0.056$', '$0.11$', '$0.53$', '$8.9$'],
    answer: 'C',
    solution: 'The wall supplies $N=m\omega^2r$ and friction supports the weight: $\mu_sN\ge mg$. Thus $\mu_s=g/(\omega^2r)$ with $r=4.0\,\mathrm{m}$ and $\omega=45(2\pi)/60$, giving about $0.11$.',
  },
  {
    number: 9,
    topic: 'Momentum and collisions',
    tags: ['Momentum', 'Two-dimensional collisions', 'Vector components', 'Conservation laws'],
    stem: 'A ball of mass $m_1$ travels along the positive $x$-axis with speed $v_0$ and collides with a stationary ball of mass $m_2$. Afterward their velocities are $v_{1x}\hat{\mathbf{x}}+v_{1y}\hat{\mathbf{y}}$ and $v_{2x}\hat{\mathbf{x}}+v_{2y}\hat{\mathbf{y}}$. Which pair of the five statements in the source figure must be satisfied?',
    choices: ['I and II', 'III and V', 'II and V', 'III and IV', 'I and III'],
    answer: 'B',
    solution: 'With no external impulse, $x$-momentum gives $m_1v_0=m_1v_{1x}+m_2v_{2x}$ (V), and initial $y$-momentum is zero, giving $0=m_1v_{1y}+m_2v_{2y}$ (III).',
  },
  {
    number: 10,
    topic: 'Dynamics and friction',
    tags: ['Dynamics', 'Newton\'s second law', 'Experimental data', 'Linearization'],
    stem: 'A heavy wooden block is pulled across a level surface with a spring force meter. The force and acceleration data are shown in the source figure. Which is the best value for the mass of the block?',
    choices: ['$3\,\mathrm{kg}$', '$5\,\mathrm{kg}$', '$10\,\mathrm{kg}$', '$20\,\mathrm{kg}$', '$30\,\mathrm{kg}$'],
    answer: 'B',
    solution: 'From $F=ma+f$, the slope of the $F$ versus $a$ data is the mass. Using the endpoints, $(5.05-3.05)/(0.495-0.095)\approx5.0\,\mathrm{kg}$.',
  },
  {
    number: 11,
    topic: 'Dynamics and friction',
    tags: ['Dynamics', 'Kinetic friction', 'Newton\'s second law', 'Experimental data'],
    stem: 'Using the same force and acceleration data in the source figure, which is the best value for the coefficient of friction between the block and the surface?',
    choices: ['$0.05$', '$0.07$', '$0.09$', '$0.5$', '$0.6$'],
    answer: 'A',
    solution: 'The intercept of $F=ma+\mu_kmg$ is about $2.6\,\mathrm{N}$. With $m\approx5.0\,\mathrm{kg}$, $\mu_k=2.6/(5.0g)\approx0.05$.',
  },
  {
    number: 12,
    topic: 'Rotation',
    tags: ['Rotation', 'Moment of inertia', 'Parallel-axis theorem', 'Rotational kinetic energy'],
    stem: 'A uniform disk rotates at fixed angular velocity about an axis through its center, normal to its plane, with kinetic energy $E$. About an axis on the edge of the disk at the same angular velocity, what is its kinetic energy?',
    choices: ['$\tfrac12E$', '$\tfrac32E$', '$2E$', '$3E$', '$4E$'],
    answer: 'D',
    solution: 'For a disk, $I_{\rm cm}=\tfrac12MR^2$. The edge axis has $I=I_{\rm cm}+MR^2=3I_{\rm cm}$, so $K=\tfrac12I\omega^2=3E$.',
  },
  {
    number: 13,
    topic: 'Oscillation',
    tags: ['Oscillation', 'Simple harmonic motion', 'Springs', 'Energy'],
    stem: 'A mass attached to a spring of constant $k$ is at its natural length and given an initial velocity, producing oscillations of amplitude $A$. If the spring is replaced by one of constant $2k$ and the same initial velocity is given, what is the new amplitude?',
    choices: ['$\tfrac12A$', '$\tfrac{1}{\sqrt2}A$', '$\sqrt2A$', '$2A$', '$4A$'],
    answer: 'B',
    solution: 'At the natural length all energy is kinetic: $\tfrac12mv_0^2=\tfrac12kA^2$. Replacing $k$ by $2k$ gives $A\prime=A/\sqrt2$.',
  },
  {
    number: 14,
    topic: 'Rotation',
    tags: ['Rotation', 'Rotational kinetic energy', 'Angular velocity', 'Energy'],
    stem: 'A spaceborne energy-storage device consists of two equal masses connected by a tether and rotating about their center of mass. Energy is added until the angular velocity changes from $\omega$ to $2\omega$. What is the new kinetic energy if the initial energy is $E$?',
    choices: ['$\sqrt2E$', '$2E$', '$2\sqrt2E$', '$4E$', '$8E$'],
    answer: 'B',
    solution: 'The tether is reeled in while energy is added, so the radius and moment of inertia change. With angular momentum conserved during the internal reeling, $K=L^2/(2I)$ and $\omega\propto1/I$; doubling $\omega$ doubles $K$, giving $2E$.',
  },
  {
    number: 15,
    topic: 'Statics and torque',
    tags: ['Statics', 'Torque', 'Center of mass', 'Equilibrium'],
    stem: 'A uniform round tabletop of diameter $4.0\,\mathrm{m}$ and mass $50.0\,\mathrm{kg}$ rests on massless, evenly spaced legs $3.0\,\mathrm{m}$ apart. A carpenter sits on the edge. What maximum carpenter mass keeps the table upright?',
    choices: ['$67\,\mathrm{kg}$', '$75\,\mathrm{kg}$', '$81\,\mathrm{kg}$', '$150\,\mathrm{kg}$', '$350\,\mathrm{kg}$'],
    answer: 'D',
    solution: 'At the tipping threshold, take moments about the outer leg. The tabletop center is $1.5\,\mathrm{m}$ from the pivot and the carpenter is $0.5\,\mathrm{m}$ beyond it: $50g(1.5)=m_cg(0.5)$, giving $m_c=150\,\mathrm{kg}$.',
  },
  {
    number: 16,
    topic: 'Oscillation',
    tags: ['Oscillation', 'Springs', 'Newton\'s second law', 'Sign conventions'],
    stem: 'A massless spring of constant $k$ is vertical with its bottom attached to the ground. A ball of mass $m$ becomes attached to the top and oscillates. What equation describes its acceleration at height $y$ above the original top of the spring? Let down be negative and neglect air resistance.',
    choices: ['$a=mv^2/y+g$', '$a=mv^2/k-g$', '$a=(k/m)y-g$', '$a=-(k/m)y+g$', '$a=-(k/m)y-g$'],
    answer: 'E',
    solution: 'The spring force is upward with magnitude $ky$, while gravity is downward. With downward positive, $a=-(k/m)y-g$.',
  },
  {
    number: 17,
    topic: 'Oscillation',
    tags: ['Oscillation', 'Springs', 'Accelerating frames', 'Equilibrium'],
    stem: 'A mass $m$ rests at equilibrium on a vertical spring of natural length $L$ and constant $k$ inside a box. The box accelerates upward with acceleration $a$. How much closer does the equilibrium position move to the bottom of the box?',
    choices: ['$\tfrac{a}{g}L$', '$\tfrac{g}{a}L$', '$\tfrac{m(g+a)}{k}$', '$\tfrac{m(g-a)}{k}$', '$\tfrac{ma}{k}$'],
    answer: 'E',
    solution: 'The effective downward load increases from $mg$ to $m(g+a)$, so the extension increases by $ma/k$. The equilibrium therefore moves $ma/k$ closer to the bottom.',
  },
  {
    number: 18,
    topic: 'Gravitation',
    tags: ['Gravitation', 'Gravitational potential energy', 'Scaling laws', 'Rings'],
    stem: 'A uniform ring of radius $R$ is fixed in place. A particle falls toward it along the axis from far away and reaches maximum speed $v$. The ring is replaced by one with the same linear mass density but radius $2R$. What is the new maximum speed?',
    choices: ['$\tfrac12v$', '$\tfrac{1}{\sqrt2}v$', '$v$', '$\sqrt2v$', '$2v$'],
    answer: 'C',
    solution: 'Keeping linear density fixed makes the ring mass proportional to $R$. The potential scale is $GM/R$, which is unchanged when both $M$ and $R$ double, so the maximum speed remains $v$.',
  },
  {
    number: 19,
    topic: 'Work and power',
    tags: ['Work and power', 'Power', 'Kinematics', 'Scaling laws'],
    stem: 'A car engine delivers constant power. The car starts from rest; at $t=t_0$ its acceleration is $a_0$. What is its acceleration at $t=2t_0$? Ignore frictional energy loss.',
    choices: ['$\tfrac12a_0$', '$\tfrac{1}{\sqrt2}a_0$', '$a_0$', '$\sqrt2a_0$', '$2a_0$'],
    answer: 'B',
    solution: 'Constant power gives $P=Fv=mav$. Since $v\propto\sqrt{t}$ from $v\,dv/dt=\text{constant}$, $a\propto1/v\propto t^{-1/2}$. Thus $a(2t_0)=a_0/\sqrt2$.',
  },
  {
    number: 20,
    topic: 'Elasticity and materials',
    tags: ['Elasticity', 'Young\'s modulus', 'Dimensional analysis', 'Beam bending'],
    stem: 'A solid rectangular steel beam of length $L$, thickness $h$, width $w$, density $\rho$, and Young\'s modulus $E$ is anchored horizontally at one end and deflects under its own weight. What is the distance through which the free end moves?',
    choices: ['$h\exp(\rho gL/E)$', '$2\rho gh^2/E$', '$\sqrt{2Lh}$', '$\tfrac32\rho gL^4/(Eh^2)$', '$\sqrt{3EL/(\rho gh)}$'],
    answer: 'D',
    solution: 'The deflection must increase with $\rho$, $g$, and $L$, decrease with stiffness $E$, and scale as $L^4/h^2$ for a cantilever under distributed load. Only D has the required physical scaling (and dimensions).',
  },
  {
    number: 21,
    topic: 'Momentum and center of mass',
    tags: ['Momentum', 'Center of mass', 'Two-body systems', 'Three-body systems'],
    stem: 'A particle at rest may decay into two daughter particles or into three daughter particles. With no external forces, which statement is true for the two-body case but false for the three-body case?',
    choices: ['The daughter velocity vectors must lie in one plane.', 'Given total kinetic energy and all daughter masses, each daughter speed can be determined.', 'Given all but one daughter speed, the remaining speed can be determined.', 'The total daughter momentum is zero.', 'None of the above.'],
    answer: 'B',
    solution: 'For two daughters, momentum conservation forces equal and opposite momenta; together with total kinetic energy and masses, the individual speeds are fixed. Three daughters have extra degrees of freedom, so the same data do not determine every speed.',
  },
  {
    number: 22,
    topic: 'Momentum and energy',
    tags: ['Momentum', 'Inelastic collisions', 'Pendulum', 'Energy conservation'],
    stem: 'A bullet of mass $m_1$ strikes a pendulum bob of mass $m_2$ suspended by a string of length $L$ with horizontal speed $v_0$. The bullet sticks. What minimum $v_0$ lets the combined bob complete a vertical loop?',
    choices: ['$2\sqrt{Lg}$', '$\sqrt{5Lg}$', '$\dfrac{(m_1+m_2)2\sqrt{Lg}}{m_1}$', '$\dfrac{(m_1-m_2)\sqrt{Lg}}{m_2}$', '$\dfrac{(m_1+m_2)\sqrt{5Lg}}{m_1}$'],
    answer: 'E',
    solution: 'At the top of a taut-string loop, $v_t^2=gL$. Energy from the bottom gives $v_b^2=5gL$. Momentum in the collision gives $m_1v_0=(m_1+m_2)v_b$, yielding option E.',
  },
  {
    number: 23,
    topic: 'Gravitation',
    tags: ['Gravitation', 'Circular orbits', 'Uniform density', 'Scaling laws'],
    stem: 'Two uniform spherical planets have equal density but unequal radius. Which quantity is the same for both planets?',
    choices: ['Escape velocity from the surface.', 'Surface gravitational acceleration.', 'Orbital period of a satellite in a circular orbit just above the surface.', 'Orbital period at a fixed distance from the planet\'s center.', 'None of the above.'],
    answer: 'C',
    solution: 'For equal density, $M\propto R^3$. Just above the surface, $T=2\pi\sqrt{R^3/(GM)}$, so $R^3/M$ is constant and the period is the same.',
  },
  {
    number: 24,
    topic: 'Kinematics and energy',
    tags: ['Kinematics', 'Energy', 'Bouncing motion', 'Geometric series'],
    stem: 'A ball is launched upward from the ground at initial speed $v_0$ and bounces vertically. If the speed immediately after each bounce is $r$ times the speed immediately before it, where $r<1$, what total time does the ball remain bouncing?',
    choices: ['$\dfrac{2v_0}{g}\dfrac{1}{1-r}$', '$\dfrac{v_0}{g}\dfrac{r}{1-r}$', '$\dfrac{2v_0}{g}\dfrac{1-r}{r}$', '$\dfrac{2v_0}{g}\dfrac{1}{1-r^2}$', '$\dfrac{2v_0}{g}\dfrac{1}{1+(1-r)^2}$'],
    answer: 'A',
    solution: 'The initial ascent/descent takes $2v_0/g$. Each subsequent bounce contributes a factor $r$ in flight time, so the geometric sum is $(2v_0/g)(1+r+r^2+\cdots)=2v_0/[g(1-r)]$.',
  },
  {
    number: 25,
    topic: 'Gravitation',
    tags: ['Gravitation', 'Orbital motion', 'Angular momentum', 'Elliptical orbits'],
    stem: 'Two satellites are launched tangentially from distance $R$ from a planet of negligible radius. One is launched at speed $v_0$ and enters a circular orbit. The second is launched at speed $v_0/2$. What is its minimum distance from the planet?',
    choices: ['$R/\sqrt2$', '$R/2$', '$R/3$', '$R/4$', '$R/7$'],
    answer: 'E',
    solution: 'The circular speed satisfies $v_0^2=GM/R$. The slower tangential launch is at apoapsis. Using $v_a^2=GM(2/R-1/a)$ gives $a=4R/7$, so $r_p=2a-R=R/7$.',
  },
];

const topicChapter: Record<string, { chapter: number; title: string }> = {
  'Kinematics': { chapter: 1, title: 'Kinematics' },
  'Vectors and displacement': { chapter: 1, title: 'Kinematics' },
  'Projectile motion': { chapter: 2, title: 'Projectile Motion' },
  'Dynamics and friction': { chapter: 3, title: 'Dynamics and Friction' },
  'Momentum and collisions': { chapter: 4, title: 'Momentum and Collisions' },
  'Rotation': { chapter: 5, title: 'Rotation' },
  'Statics and torque': { chapter: 5, title: 'Rotation and Statics' },
  'Oscillation': { chapter: 6, title: 'Oscillation' },
  'Gravitation': { chapter: 7, title: 'Gravitation and Orbits' },
  'Work and power': { chapter: 8, title: 'Work, Energy, and Power' },
  'Elasticity and materials': { chapter: 9, title: 'Elasticity and Materials' },
  'Momentum and center of mass': { chapter: 4, title: 'Momentum and Center of Mass' },
  'Momentum and energy': { chapter: 4, title: 'Momentum and Energy' },
  'Kinematics and energy': { chapter: 1, title: 'Kinematics and Energy' },
};

const steps: PracticeStep[] = questions.map((question) => ({
  id: `fma-2008-q${String(question.number).padStart(2, '0')}`,
  mode: 'multiple_choice',
  title: `Question ${question.number}`,
  prompt: 'Select the correct option.',
  context: question.stem,
  tags: [sourceLabel, ...question.tags],
  image: {
    src: `${sourceRoot}/q${String(question.number).padStart(2, '0')}.png`,
    alt: `F=ma 2008 historical exam question ${question.number}`,
    role: 'question',
    responsive: true,
    downloadName: `fma-2008-question-${String(question.number).padStart(2, '0')}.png`,
  },
  maxScore: 1,
  source: `${sourceLabel} · Question ${question.number}`,
  answerNudge: question.topic,
  criteria: [],
  choices: question.choices.map((text, index) => ({ label: String.fromCharCode(65 + index), text })),
  correctAnswer: question.answer,
  solution: question.solution,
}));

export const fma2008CompetitionSets: PracticeSet[] = Object.entries(
  steps.reduce<Record<string, PracticeStep[]>>((groups, step, index) => {
    const question = questions[index];
    const key = topicChapter[question.topic].title;
    (groups[key] ??= []).push(step);
    return groups;
  }, {}),
).map(([title, groupedSteps], index) => ({
  id: `fma-2008-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  category: 'mechanics',
  label: `FMA 2008 · ${title}`,
  title: `FMA 2008 · ${title}`,
  subtitle: `${groupedSteps.length} sourced multiple-choice questions`,
  eyebrow: 'F=ma Competition · 2008 Historical Exam',
  description: `Topic-organized questions from the 2008 F=ma historical exam, preserving the original source figures and answer choices.`,
  steps: groupedSteps,
  sources: [
    { label: sourceLabel, url: sourceUrl },
    { label: 'Question and asset index', url: `${sourceRoot}/question-index.json` },
  ],
  practiceKind: 'mcq',
  system: 'competition',
  chapter: index + 1,
  chapterTitle: title,
}));

export const fma2008QuestionIndex = questions.map((question) => ({
  id: `fma-2008-q${String(question.number).padStart(2, '0')}`,
  questionNumber: question.number,
  chapter: topicChapter[question.topic].title,
  tags: question.tags,
  answer: question.answer,
  image: `${sourceRoot}/q${String(question.number).padStart(2, '0')}.png`,
}));
