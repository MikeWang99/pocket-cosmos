import type {
  CurriculumClassroomQuestion,
  CurriculumFormula,
  CurriculumImage,
  CurriculumLesson,
  LocalizedText,
} from './apPhysicsCurriculum';

const text = (en: string, zh: string): LocalizedText => ({ en, zh });

const formula = (
  labelEn: string,
  labelZh: string,
  expression: string,
  noteEn?: string,
  noteZh?: string,
): CurriculumFormula => ({
  label: text(labelEn, labelZh),
  expression,
  note: noteEn && noteZh ? text(noteEn, noteZh) : undefined,
});

const originalDiagram = (filename: string, altEn: string, altZh: string, captionEn: string, captionZh: string): CurriculumImage => ({
  src: `/curriculum-assets/circular-motion/${filename}`,
  alt: text(altEn, altZh),
  caption: text(captionEn, captionZh),
  sourceLabel: text('Original Pocket Cosmos diagram', '口袋宇宙原创示意图'),
});

const racetrackImage = originalDiagram(
  'racetrack-hook.svg',
  'Race cars turning on a banked track with tangent velocity and inward acceleration arrows.',
  '赛车通过倾斜弯道,图中标出切向速度与向内加速度。',
  'A faster turn demands a larger inward acceleration; banking changes which force components can provide it.',
  '速度越高,转弯所需的向内加速度越大;倾斜路面会改变能够提供该加速度的力分量。',
);

const tangentVelocityImage = originalDiagram(
  'tangent-velocity.svg',
  'Tangent velocity and inward centripetal acceleration on a circular path.',
  '圆周路径上的切向速度与向内的向心加速度。',
  'At every instant, velocity is tangent to the path and centripetal acceleration points toward the center.',
  '任意瞬间,速度沿轨迹切线方向,向心加速度指向圆心。',
);

const similarTrianglesImage = originalDiagram(
  'similar-triangles.svg',
  'Similar position-vector and velocity-vector triangles.',
  '相似的位置矢量三角形与速度矢量三角形。',
  'The radius vectors and velocity vectors rotate through the same small angle, creating similar triangles.',
  '半径矢量与速度矢量转过相同的小角度,因此形成相似三角形。',
);

const radialForceImage = originalDiagram(
  'radial-force-sources.svg',
  'Tension, static friction, and gravity as real sources of inward net force.',
  '张力、静摩擦力和引力作为向内合力的真实来源。',
  'Centripetal force is not a new interaction: it is the inward component of the net real force.',
  '向心力不是一种新的相互作用,而是实际合力的向内分量。',
);

const verticalLoopImage = originalDiagram(
  'vertical-loop.svg',
  'Force models at the top and bottom of a vertical loop.',
  '竖直圆周顶部与底部的受力模型。',
  'At the local top threshold, the contact force is zero while gravity still points inward.',
  '在顶部的局部临界状态下,接触力为零,但重力仍指向圆心。',
);

const bankedRoadImage = originalDiagram(
  'banked-road.svg',
  'A banked-road free-body diagram with radial and vertical directions.',
  '带有径向和竖直方向的倾斜弯道受力图。',
  'Resolve real forces into vertical and radial components; do not draw a separate centripetal-force arrow.',
  '把实际力分解到竖直与径向方向,不要额外画一支“向心力”箭头。',
);

const conicalPendulumImage = originalDiagram(
  'conical-pendulum.svg',
  'Conical pendulum geometry and tension components.',
  '圆锥摆的几何关系与张力分量。',
  'The vertical tension component balances weight; the horizontal component supplies inward acceleration.',
  '张力的竖直分量平衡重力,水平分量提供向内加速度。',
);

const accelerationComponentsImage = originalDiagram(
  'acceleration-components.svg',
  'Tangential, centripetal, and total acceleration vectors.',
  '切向、向心与总加速度矢量。',
  'Tangential acceleration changes speed; centripetal acceleration changes direction.',
  '切向加速度改变速率,向心加速度改变方向。',
);

const circularOrbitImage = originalDiagram(
  'circular-orbit.svg',
  'A satellite with tangent velocity and inward gravitational force.',
  '卫星的切向速度与指向圆心的引力。',
  'A circular orbit is continuous free fall: gravity bends the tangent motion into a circle.',
  '圆轨道是持续的自由落体:引力不断把切向运动弯成圆周运动。',
);

const checkPeriodAndDirection: CurriculumClassroomQuestion = {
  id: 'apc-cm-01-tangent-velocity',
  title: text('Classroom Check: constant speed', '课堂题:恒定速率'),
  prompt: text(
    'A Ferris-wheel cabin moves at constant speed around a vertical circle. Which statement is correct at a given instant?',
    '摩天轮座舱以恒定速率沿竖直圆周运动。任意瞬间,下列说法哪一项正确?',
  ),
  choices: [
    { label: 'A', text: text('Both velocity and acceleration are zero.', '速度和加速度都为零。') },
    { label: 'B', text: text('Velocity is tangent to the path, while acceleration has an inward component.', '速度沿轨迹切线方向,加速度具有向内分量。') },
    { label: 'C', text: text('Velocity and acceleration both point inward.', '速度和加速度都指向圆心。') },
    { label: 'D', text: text('Velocity and acceleration both point tangent to the path.', '速度和加速度都沿轨迹切线方向。') },
  ],
  correctAnswer: 'B',
  feedback: text(
    'Constant speed fixes only $|\\vec v|$. The direction of $\\vec v$ changes, so acceleration has an inward component.',
    '恒定速率只固定 $|\\vec v|$。由于 $\\vec v$ 的方向持续改变,加速度具有向内分量。',
  ),
};

const checkFrequency: CurriculumClassroomQuestion = {
  id: 'apc-cm-02-frequency-scaling',
  title: text('Classroom Check: frequency scaling', '课堂题:频率变化'),
  prompt: text(
    'A drone flies in a horizontal circle of fixed radius. Its revolution frequency doubles. By what factor does its centripetal acceleration change?',
    '无人机沿固定半径的水平圆周飞行。它的转动频率变为原来的两倍,向心加速度变为原来的多少倍?',
  ),
  choices: [
    { label: 'A', text: text('One half', '二分之一') },
    { label: 'B', text: text('Two', '两倍') },
    { label: 'C', text: text('Four', '四倍') },
    { label: 'D', text: text('Eight', '八倍') },
  ],
  correctAnswer: 'C',
  feedback: text('Because $a_c=4\\pi^2rf^2$, doubling $f$ makes $a_c$ four times larger.', '由 $a_c=4\\pi^2rf^2$,频率加倍会使 $a_c$ 变为四倍。'),
};

const checkRadialForce: CurriculumClassroomQuestion = {
  id: 'apc-cm-03-radial-force-scaling',
  title: text('Classroom Check: required inward force', '课堂题:所需向内合力'),
  prompt: text(
    'Which pair of changes would each make the required inward net force four times larger?',
    '下列哪一组变化都会使所需的向内合力变为四倍?',
  ),
  choices: [
    { label: 'A', text: text('Double $v$; reduce $r$ to one quarter.', '$v$ 加倍;把 $r$ 减小到四分之一。') },
    { label: 'B', text: text('Double $v$; halve $r$.', '$v$ 加倍;把 $r$ 减半。') },
    { label: 'C', text: text('Halve $v$; reduce $r$ to one quarter.', '$v$ 减半;把 $r$ 减小到四分之一。') },
    { label: 'D', text: text('Double $m$; double $r$.', '$m$ 加倍;$r$ 加倍。') },
  ],
  correctAnswer: 'A',
  feedback: text('$F_r=mv^2/r$: doubling $v$ multiplies the force by four, and dividing $r$ by four also multiplies it by four.', '$F_r=mv^2/r$:速度加倍使力变为四倍,半径变为四分之一也使力变为四倍。'),
};

const checkUnderGrip: CurriculumClassroomQuestion = {
  id: 'apc-cm-03-under-grip-path',
  title: text('Classroom Check: when grip is insufficient', '课堂题:抓地力不足时'),
  prompt: text(
    'A car enters a flat curve too fast for the available static friction. In the road frame, why does its path cross toward the outside of the curve?',
    '汽车以过高速度进入水平弯道,可用静摩擦力不足。在路面参考系中,为什么它的轨迹会越过弯道外侧?',
  ),
  choices: [
    { label: 'A', text: text('A real outward force pushes the car away from the center.', '一个真实的向外力把汽车推离圆心。') },
    { label: 'B', text: text('The inward force is too small to turn the velocity direction quickly enough.', '向内合力不足以让速度方向足够快地转向。') },
    { label: 'C', text: text('The engine cancels gravity and removes the radial acceleration.', '发动机抵消了重力并消除了径向加速度。') },
    { label: 'D', text: text('The car loses all forward velocity as soon as it slips.', '汽车一打滑就失去全部向前速度。') },
  ],
  correctAnswer: 'B',
  feedback: text(
    'No outward real force is needed. With less than $mv^2/r$ inward, the velocity direction turns too slowly, so the car crosses outward relative to the curved road.',
    '不需要真实的向外力。向内合力小于 $mv^2/r$ 时,速度方向转得不够快,因此汽车相对弯曲路面越过外侧。',
  ),
};

const checkVerticalLoop: CurriculumClassroomQuestion = {
  id: 'apc-cm-04-loop-threshold',
  title: text('Classroom Check: top-of-loop threshold', '课堂题:圆环顶部临界状态'),
  prompt: text(
    'A roller-coaster car just maintains contact with the inside of a circular track at the top. What is its acceleration there?',
    '过山车在圆环顶部恰好保持与轨道内侧接触。此时它的加速度是什么?',
  ),
  choices: [
    { label: 'A', text: text('Zero, because $N=0$.', '为零,因为 $N=0$。') },
    { label: 'B', text: text('Magnitude $g$, directed downward toward the center.', '大小为 $g$,方向竖直向下指向圆心。') },
    { label: 'C', text: text('Magnitude $g$, directed upward.', '大小为 $g$,方向竖直向上。') },
    { label: 'D', text: text('Not enough information.', '信息不足。') },
  ],
  correctAnswer: 'B',
  feedback: text('At the threshold $N=0$, but gravity remains. Therefore $a_c=g$ downward.', '临界状态下 $N=0$,但重力仍存在,因此 $a_c=g$,方向向下。'),
};

const checkFlatRoad: CurriculumClassroomQuestion = {
  id: 'apc-cm-05a-flat-road-mass',
  title: text('Classroom Check: flat-road limit', '课堂题:平路转弯极限'),
  prompt: text('For a car turning on a flat road without slipping, does the maximum safe speed depend on the car\'s mass?', '汽车在水平路面转弯且不打滑时,最大安全速率是否取决于汽车质量?'),
  choices: [
    { label: 'A', text: text('Yes, a larger mass always lowers the safe speed.', '是,质量越大安全速率一定越低。') },
    { label: 'B', text: text('Yes, a larger mass always raises the safe speed.', '是,质量越大安全速率一定越高。') },
    { label: 'C', text: text('No, mass cancels from the limiting equation.', '否,质量会在临界方程中约去。') },
    { label: 'D', text: text('Only when the road is banked.', '只有道路倾斜时才与质量无关。') },
  ],
  correctAnswer: 'C',
  feedback: text('$\\mu_smg=mv^2/r$ gives $v_{\\max}=\\sqrt{\\mu_sgr}$, so mass cancels.', '$\\mu_smg=mv^2/r$ 给出 $v_{\\max}=\\sqrt{\\mu_sgr}$,质量被约去。'),
};

const checkBankedRoad: CurriculumClassroomQuestion = {
  id: 'apc-cm-05b-banked-normal',
  title: text('Classroom Check: frictionless bank', '课堂题:无摩擦倾斜弯道'),
  prompt: text('On a frictionless banked road, which force component supplies the horizontal inward acceleration?', '在无摩擦的倾斜弯道上,哪个力的分量提供水平向内加速度?'),
  choices: [
    { label: 'A', text: text('The horizontal component of weight', '重力的水平分量') },
    { label: 'B', text: text('The horizontal component of the normal force', '支持力的水平分量') },
    { label: 'C', text: text('A separate centripetal force', '一个额外的向心力') },
    { label: 'D', text: text('The vertical component of the normal force', '支持力的竖直分量') },
  ],
  correctAnswer: 'B',
  feedback: text('Weight remains vertical. The inward component is $N\\sin\\theta$ when $\\theta$ is measured from the horizontal bank angle.', '重力始终竖直。若 $\\theta$ 是路面的倾角,向内分量为 $N\\sin\\theta$。'),
};

const checkConicalPendulum: CurriculumClassroomQuestion = {
  id: 'apc-cm-05c-conical-tension',
  title: text('Classroom Check: conical-pendulum tension', '课堂题:圆锥摆张力'),
  prompt: text(
    'A $0.60\\,\\mathrm{kg}$ bob moves in a horizontal circle of radius $1.50\\,\\mathrm m$ at $3.00\\,\\mathrm{m/s}$. What is the tension?',
    '质量为 $0.60\\,\\mathrm{kg}$ 的摆球以 $3.00\\,\\mathrm{m/s}$ 沿半径 $1.50\\,\\mathrm m$ 的水平圆周运动。张力大小是多少?',
  ),
  choices: [
    { label: 'A', text: text('$3.60\\,\\mathrm N$', '$3.60\\,\\mathrm N$') },
    { label: 'B', text: text('$5.88\\,\\mathrm N$', '$5.88\\,\\mathrm N$') },
    { label: 'C', text: text('$6.89\\,\\mathrm N$', '$6.89\\,\\mathrm N$') },
    { label: 'D', text: text('$9.48\\,\\mathrm N$', '$9.48\\,\\mathrm N$') },
  ],
  correctAnswer: 'C',
  feedback: text('$T_r=mv^2/r=3.60\\,\\mathrm N$ and $T_y=mg=5.88\\,\\mathrm N$, so $T=\\sqrt{T_r^2+T_y^2}=6.89\\,\\mathrm N$.', '$T_r=mv^2/r=3.60\\,\\mathrm N$ 且 $T_y=mg=5.88\\,\\mathrm N$,所以 $T=\\sqrt{T_r^2+T_y^2}=6.89\\,\\mathrm N$。'),
};

const checkAccelerationComponents: CurriculumClassroomQuestion = {
  id: 'apc-cm-06-acceleration-directions',
  title: text('Classroom Check: changing speed', '课堂题:速率改变的圆周运动'),
  prompt: text(
    'At the rightmost point of a counterclockwise circular path, a vehicle is moving upward but slowing down. Which directions are correct?',
    '物体沿逆时针圆周运动,在最右端向上运动但正在减速。下列方向判断哪一项正确?',
  ),
  choices: [
    { label: 'A', text: text('$\\vec a_c$ left, $\\vec a_t$ down, total acceleration down-left.', '$\\vec a_c$ 向左,$\\vec a_t$ 向下,总加速度指向左下。') },
    { label: 'B', text: text('$\\vec a_c$ right, $\\vec a_t$ up, total acceleration up-right.', '$\\vec a_c$ 向右,$\\vec a_t$ 向上,总加速度指向右上。') },
    { label: 'C', text: text('$\\vec a_c$ left, $\\vec a_t$ up, total acceleration up-left.', '$\\vec a_c$ 向左,$\\vec a_t$ 向上,总加速度指向左上。') },
    { label: 'D', text: text('Only tangential acceleration exists.', '只有切向加速度。') },
  ],
  correctAnswer: 'A',
  feedback: text('Centripetal acceleration points toward the center. Because the object slows, tangential acceleration opposes the upward velocity.', '向心加速度指向圆心;由于物体减速,切向加速度与向上的速度方向相反。'),
};

const checkOrbit: CurriculumClassroomQuestion = {
  id: 'apc-cm-07-orbit-period-ratio',
  title: text('Classroom Check: orbital period', '课堂题:轨道周期'),
  prompt: text('Satellite B orbits the same planet at four times the orbital radius of satellite A. Find $T_B/T_A$.', '卫星 B 绕同一颗行星运动,轨道半径是卫星 A 的四倍。求 $T_B/T_A$。'),
  choices: [
    { label: 'A', text: text('$2$', '$2$') },
    { label: 'B', text: text('$4$', '$4$') },
    { label: 'C', text: text('$8$', '$8$') },
    { label: 'D', text: text('$16$', '$16$') },
  ],
  correctAnswer: 'C',
  feedback: text('$T\\propto R^{3/2}$, so $T_B/T_A=4^{3/2}=8$.', '$T\\propto R^{3/2}$,因此 $T_B/T_A=4^{3/2}=8$。'),
};

export const circularMotionLessons: CurriculumLesson[] = [
  {
    title: text('1. Repeating Motion, Period, Frequency, and Tangent Velocity', '1. 重复运动、周期、频率与切向速度'),
    description: text('Start from observable repeating motion and separate constant speed from constant velocity.', '从可观察的重复运动出发,区分恒定速率与恒定速度。'),
    sections: [
      {
        heading: text('Hook: why are racetracks banked?', '钩子:赛车场为什么要把弯道修成倾斜面?'),
        images: [racetrackImage],
        paragraphs: [
          text('When the same car takes the same curve faster, it is more likely to slide. The car can keep nearly the same speed while its velocity direction changes continuously. A real net force must create that vector change.', '同一辆车以更高速度通过同一个弯道时更容易打滑。汽车的速率可以几乎不变,但速度方向持续改变;这种矢量变化必须由真实合力产生。'),
        ],
      },
      {
        heading: text('Why a new description is needed', '为什么需要新的描述方法'),
        paragraphs: [
          text('Straight-line motion can be described by forward and backward position. Repeating circular motion also needs the time per revolution, revolutions per unit time, radius, and the instantaneous direction of motion.', '直线运动可以用前后位置描述;重复的圆周运动还需要描述一圈所需时间、单位时间内转过的圈数、圆周半径以及瞬时运动方向。'),
        ],
        formulas: [
          formula('Period', '周期', 'T=\\frac{\\Delta t}{N}'),
          formula('Frequency', '频率', 'f=\\frac{N}{\\Delta t},\\qquad T=\\frac{1}{f}'),
          formula('Speed around a circle', '圆周运动速率', 'v=\\frac{2\\pi r}{T}=2\\pi rf'),
        ],
      },
      {
        heading: text('Velocity is tangent; acceleration is inward', '速度沿切线,加速度指向圆心'),
        images: [tangentVelocityImage],
        bullets: [
          text('Uniform circular motion has constant radius and constant speed.', '匀速圆周运动具有恒定半径与恒定速率。'),
          text('$\\vec v$ is tangent to the path and perpendicular to the radius.', '$\\vec v$ 沿轨迹切线方向并与半径垂直。'),
          text('Constant speed does not mean constant velocity because direction is part of velocity.', '恒定速率不等于恒定速度,因为方向也是速度的一部分。'),
        ],
        classroomQuestions: [checkPeriodAndDirection],
        takeaway: text('Draw the tangent velocity before writing a circular-motion equation.', '写圆周运动方程前,先画出切向速度。'),
      },
    ],
    studentVersion: {
      title: text('1. Period, Frequency, and Tangent Velocity', '1. 周期、频率与切向速度'),
      description: text('The minimum language needed to describe repeating motion and the direction of velocity.', '描述重复运动与速度方向所需的核心语言。'),
      sections: [
        { heading: text('Real phenomenon', '真实现象'), images: [racetrackImage], bullets: [text('A faster turn requires a larger inward acceleration even when speed stays constant.', '即使速率保持不变,更高速的转弯仍需要更大的向内加速度。')] },
        { heading: text('Core relations', '核心关系'), images: [tangentVelocityImage], formulas: [formula('Period and frequency', '周期与频率', 'T=\\frac1f'), formula('Circular speed', '圆周速率', 'v=\\frac{2\\pi r}{T}=2\\pi rf')], bullets: [text('Velocity is tangent to the path; constant speed is not constant velocity.', '速度沿轨迹切线方向;恒定速率不等于恒定速度。')] },
        { heading: text('Self-check', '自测'), classroomQuestions: [checkPeriodAndDirection] },
      ],
    },
  },
  {
    title: text('2. Deriving Centripetal Acceleration', '2. 推导向心加速度'),
    description: text('Derive the magnitude and direction of inward acceleration from the changing velocity vector.', '从速度矢量的变化推导向内加速度的大小与方向。'),
    sections: [
      {
        heading: text('Hook: what happens when the constraint disappears?', '钩子:约束突然消失时会怎样?'),
        videos: [{ provider: 'youtube', title: text('Bowling ball moves in a circle: observational experiment', '保龄球圆周运动观察实验'), embedUrl: 'https://www.youtube-nocookie.com/embed/jiJOCfOmBLA', sourceUrl: 'https://youtu.be/jiJOCfOmBLA', sourceLabel: text('View source on YouTube', '在 YouTube 查看来源') }],
        paragraphs: [text('A ball repeatedly pushed inward follows a curved path. When the inward interaction stops, the ball continues along the instantaneous tangent, not radially outward.', '小球在持续受到向内作用时沿曲线运动;向内作用停止后,小球沿瞬时切线继续运动,而不是沿半径向外飞出。')],
      },
      {
        heading: text('Geometric limit derivation', '几何极限推导'),
        images: [similarTrianglesImage],
        bullets: [
          text('Over a short interval $\\Delta t$, the radius and velocity vectors rotate through the same small angle $\\Delta\\theta$.', '在短时间 $\\Delta t$ 内,半径矢量与速度矢量转过相同的小角度 $\\Delta\\theta$。'),
          text('The position and velocity triangles are similar: $|\\Delta\\vec v|/v=|\\Delta\\vec r|/r$.', '位置三角形与速度三角形相似:$|\\Delta\\vec v|/v=|\\Delta\\vec r|/r$。'),
          text('As $\\Delta t\\to0$, $|\\Delta\\vec r|\\to v\\Delta t$ and $\\Delta\\vec v$ points toward the center.', '当 $\\Delta t\\to0$ 时,$|\\Delta\\vec r|\\to v\\Delta t$,且 $\\Delta\\vec v$ 指向圆心。'),
        ],
        formulas: [
          formula('Limit definition', '极限定义', 'a_c=\\lim_{\\Delta t\\to0}\\frac{|\\Delta\\vec v|}{\\Delta t}=\\frac{v^2}{r}'),
          formula('Equivalent forms', '等价形式', 'a_c=\\frac{v^2}{r}=\\frac{4\\pi^2r}{T^2}=4\\pi^2rf^2'),
        ],
        classroomQuestions: [checkFrequency],
      },
    ],
    studentVersion: {
      title: text('2. Centripetal Acceleration', '2. 向心加速度'),
      description: text('Use similar triangles to connect vector turning with $a_c=v^2/r$.', '用相似三角形把速度矢量转向与 $a_c=v^2/r$ 连接起来。'),
      sections: [
        { heading: text('Vector geometry', '矢量几何'), images: [similarTrianglesImage], bullets: [text('$|\\Delta\\vec v|/v=|\\Delta\\vec r|/r$ and $|\\Delta\\vec r|\\to v\\Delta t$.', '$|\\Delta\\vec v|/v=|\\Delta\\vec r|/r$,且 $|\\Delta\\vec r|\\to v\\Delta t$。')] },
        { heading: text('Result and scaling', '结果与比例关系'), formulas: [formula('Centripetal acceleration', '向心加速度', 'a_c=\\frac{v^2}{r}=\\frac{4\\pi^2r}{T^2}=4\\pi^2rf^2')], bullets: [text('Direction is inward. Doubling $v$ or $f$ makes $a_c$ four times larger.', '方向指向圆心。$v$ 或 $f$ 加倍会使 $a_c$ 变为四倍。')] },
        { heading: text('Self-check', '自测'), classroomQuestions: [checkFrequency] },
      ],
    },
  },
  {
    title: text('3. Inward Net Force from Real Interactions', '3. 真实相互作用产生向内合力'),
    description: text('Use free-body diagrams to identify which real forces create the required radial acceleration.', '用自由体图判断哪些真实力产生所需的径向加速度。'),
    sections: [
      {
        heading: text('Hook: three systems, one radial requirement', '钩子:三种系统,同一个径向要求'),
        images: [radialForceImage],
        paragraphs: [text('Tire-road contact turns a car, a string turns a ball, and gravity turns a satellite. The interactions differ, but each produces an inward component of net force.', '轮胎与路面的接触使汽车转弯,绳子使小球转弯,引力使卫星转弯。相互作用不同,但它们都产生向内的合力分量。')],
      },
      {
        heading: text('Radial Newton\'s second law', '径向牛顿第二定律'),
        bullets: [
          text('Draw only real forces on the free-body diagram.', '自由体图中只画真实力。'),
          text('Choose inward as the instantaneous positive radial direction.', '把指向圆心的方向选为瞬时径向正方向。'),
          text('Project the real forces onto that axis, then set $\\sum F_r=mv^2/r$.', '把实际力投影到径向轴,再写 $\\sum F_r=mv^2/r$。'),
          text('Never add another force arrow called “centripetal force.”', '不要额外添加一支名为“向心力”的力箭头。'),
        ],
        formulas: [formula('Radial force equation', '径向力方程', '\\sum F_r=ma_c=m\\frac{v^2}{r}')],
        classroomQuestions: [checkRadialForce, checkUnderGrip],
      },
      {
        heading: text('Centripetal and centrifugal are not interchangeable', '向心与离心不能混用'),
        bullets: [
          text('“Centripetal” names the inward component of the net real force; it is not an additional interaction.', '“向心”描述真实合力的向内分量,不是额外的相互作用。'),
          text('“Centrifugal force” is a fictitious force used only in a rotating non-inertial frame.', '“离心力”只是在旋转的非惯性参考系中引入的惯性力。'),
          text('For standard AP inertial-frame free-body diagrams, draw only real interactions and use $\\sum F_r=mv^2/r$.', '在 AP 常用的惯性参考系自由体图中,只画真实相互作用,并写 $\\sum F_r=mv^2/r$。'),
          text('For a road car, the engine supplies wheel torque; the road\'s static friction is the external horizontal interaction that changes the car\'s motion.', '对路面汽车而言,发动机向车轮提供转矩;路面对轮胎的静摩擦才是改变汽车运动的水平外部相互作用。'),
        ],
      },
      {
        heading: text('Optional application: centrifugation', '可选应用:离心分离'),
        paragraphs: [text('A centrifuge uses large inward acceleration to make components with different densities follow measurably different motion under constrained rotation. The useful model still begins with real forces in an inertial frame; no mysterious outward interaction is added to the FBD.', '离心机利用较大的向内加速度,使不同密度的组分在受约束转动中表现出可测的运动差异。在惯性参考系中,分析仍应从真实力开始,自由体图中不添加神秘的向外相互作用。')],
      },
    ],
    studentVersion: {
      title: text('3. Radial Newton\'s Second Law', '3. 径向牛顿第二定律'),
      description: text('Translate circular-motion requirements into an equation made only from real forces.', '把圆周运动的要求转化为只包含真实力的方程。'),
      sections: [
        { heading: text('Real force sources', '真实力来源'), images: [radialForceImage], bullets: [text('Tension, friction, normal force, or gravity can supply the inward net force.', '张力、摩擦力、支持力或引力都可能提供向内合力。')] },
        { heading: text('Four-step method', '四步方法'), bullets: [text('Draw the FBD → choose inward → project real forces → set $\\sum F_r=mv^2/r$.', '画自由体图 → 选择向内方向 → 投影真实力 → 写 $\\sum F_r=mv^2/r$。')], formulas: [formula('Radial equation', '径向方程', '\\sum F_r=m\\frac{v^2}{r}')] },
        { heading: text('Decision rules', '判断规则'), bullets: [text('Centripetal = inward net-force component. Centrifugal = rotating-frame fictitious force. Neither is an extra real-force arrow on the standard FBD.', '向心 = 合力的向内分量;离心 = 旋转参考系中的惯性力。在标准自由体图中,二者都不是额外的真实力箭头。')], classroomQuestions: [checkRadialForce, checkUnderGrip] },
      ],
    },
  },
  {
    title: text('4. Vertical Circles and the Contact Threshold', '4. 竖直圆周与接触临界条件'),
    description: text('Separate the local top-of-loop force threshold from a full energy analysis of the loop.', '区分圆环顶部的局部受力临界条件与完整的能量分析。'),
    sections: [
      {
        heading: text('Hook: why does the car not fall at the top?', '钩子:过山车在顶部为什么不会掉下来?'),
        images: [verticalLoopImage],
        paragraphs: [text('“Just maintaining contact” has a precise force meaning: the track has reached the point where it no longer needs to push inward, so the normal force is zero.', '“恰好保持接触”有明确的受力含义:轨道不再需要向内推车,因此支持力为零。')],
      },
      {
        heading: text('Top and bottom models', '顶部与底部模型'),
        formulas: [
          formula('Top of an inside loop', '内侧圆环顶部', 'mg+N=m\\frac{v^2}{r}'),
          formula('Top threshold', '顶部临界条件', 'N=0\\quad\\Rightarrow\\quad v_{\\min}=\\sqrt{gr}'),
          formula('Bottom of an inside loop', '内侧圆环底部', 'N-mg=m\\frac{v^2}{r}'),
        ],
        bullets: [
          text('At the top, inward is downward. At the bottom, inward is upward.', '在顶部,向内方向向下;在底部,向内方向向上。'),
          text('At the top: $v>\\sqrt{gr}$ gives $N>0$; $v=\\sqrt{gr}$ gives $N=0$; a slower circular path would require $N<0$, so an ordinary track loses contact.', '在顶部:$v>\\sqrt{gr}$ 时 $N>0$;$v=\\sqrt{gr}$ 时 $N=0$;若更慢仍要维持圆轨道就需要 $N<0$,普通轨道无法拉动物体,因此会失去接触。'),
          text('“Weightless” means the support-force reading is zero, not that gravity disappears.', '“失重”表示支持力读数为零,并不表示重力消失。'),
          text('$v=\\sqrt{gr}$ is a local contact threshold, not the release speed or release height for completing the whole loop.', '$v=\\sqrt{gr}$ 是局部接触临界速率,并不是完成整个圆环所需的释放速率或释放高度。'),
        ],
        classroomQuestions: [checkVerticalLoop],
      },
    ],
    studentVersion: {
      title: text('4. Vertical-Circle Threshold', '4. 竖直圆周临界条件'),
      description: text('At the top threshold, set the contact force to zero, not the net force.', '在顶部临界状态下,令接触力为零,而不是令合力为零。'),
      sections: [
        { heading: text('Force picture', '受力图像'), images: [verticalLoopImage] },
        { heading: text('Core equations and boundary', '核心方程与边界'), formulas: [formula('Top', '顶部', 'mg+N=m\\frac{v^2}{r}'), formula('Threshold', '临界条件', 'N=0\\Rightarrow v_{\\min}=\\sqrt{gr}'), formula('Bottom', '底部', 'N-mg=m\\frac{v^2}{r}')], bullets: [text('At the top: $v>\\sqrt{gr}$ gives $N>0$; equality gives $N=0$; a slower object loses contact.', '在顶部:$v>\\sqrt{gr}$ 时 $N>0$;相等时 $N=0$;更慢时物体失去接触。'), text('The threshold is local. A release-height problem also requires energy.', '该临界条件是局部条件;释放高度问题还需要能量分析。')] },
        { heading: text('Self-check', '自测'), classroomQuestions: [checkVerticalLoop] },
      ],
    },
  },
  {
    title: text('5. Banked Roads and Conical Pendulums', '5. 倾斜弯道与圆锥摆'),
    description: text('Resolve real forces into radial and vertical components, including the direction test for static friction.', '把真实力分解到径向与竖直方向,并用滑动趋势判断静摩擦方向。'),
    sections: [
      {
        heading: text('Frictionless banked design speed', '无摩擦倾斜弯道的设计速率'),
        images: [bankedRoadImage],
        paragraphs: [text('A correctly banked road can turn a car without relying on friction because the normal force has both vertical and inward components.', '正确设计的倾斜弯道可以在不依赖摩擦的情况下使汽车转弯,因为支持力同时具有竖直分量与向内分量。')],
        formulas: [
          formula('Vertical balance', '竖直平衡', 'N\\cos\\theta=mg'),
          formula('Radial equation', '径向方程', 'N\\sin\\theta=m\\frac{v^2}{r}'),
          formula('Design speed', '设计速率', '\\tan\\theta=\\frac{v^2}{rg},\\qquad v=\\sqrt{rg\\tan\\theta}'),
        ],
        classroomQuestions: [checkBankedRoad],
      },
      {
        heading: text('Static friction on a bank: choose direction physically', '倾斜弯道上的静摩擦:用物理趋势判断方向'),
        bullets: [
          text('First find the no-friction design speed $v_0=\\sqrt{rg\\tan\\theta}$.', '先求无摩擦设计速率 $v_0=\\sqrt{rg\\tan\\theta}$。'),
          text('Compare the actual speed with $v_0$ and predict which way the car would tend to slip.', '把实际速率与 $v_0$ 比较,判断汽车相对路面的滑动趋势。'),
          text('Static friction points opposite the relative slipping tendency.', '静摩擦力方向与相对滑动趋势相反。'),
          text('Resolve both $N$ and $f_s$ into vertical and radial components; there is no universally memorized friction direction.', '把 $N$ 和 $f_s$ 都分解到竖直与径向方向;不存在一个永远正确的静摩擦箭头方向。'),
        ],
        classroomQuestions: [checkFlatRoad],
      },
      {
        heading: text('Conical pendulum', '圆锥摆'),
        images: [conicalPendulumImage],
        bullets: [
          text('$\\theta$ is an ordinary plane angle measured from the vertical in a vertical cross section, not a solid angle.', '$\\theta$ 是竖直截面内从竖直方向量起的普通平面角,不是立体角。'),
          text('Draw only $mg$ and tension, then resolve the tension into vertical and horizontal-inward components.', '只画重力与张力,再把张力分解为竖直分量和水平向内分量。'),
          text('A unit check catches category errors: $mg\\sin\\theta$ has units of force, not acceleration.', '单位检查可以发现量的类别错误:$mg\\sin\\theta$ 的单位是力,不是加速度。'),
        ],
        formulas: [
          formula('Vertical component', '竖直分量', 'F_T\\cos\\theta=mg'),
          formula('Radial component', '径向分量', 'F_T\\sin\\theta=m\\frac{v^2}{r}'),
          formula('Geometry and speed', '几何与速率', '\\tan\\theta=\\frac{v^2}{rg},\\qquad r=L\\sin\\theta'),
        ],
        classroomQuestions: [checkConicalPendulum],
      },
    ],
    studentVersion: {
      title: text('5. Banked Roads and Conical Pendulums', '5. 倾斜弯道与圆锥摆'),
      description: text('Use vertical balance and a radial force equation in both systems.', '在两类系统中同时使用竖直平衡与径向力方程。'),
      sections: [
        { heading: text('Banked road', '倾斜弯道'), images: [bankedRoadImage], formulas: [formula('No-friction design speed', '无摩擦设计速率', 'v=\\sqrt{rg\\tan\\theta}')], bullets: [text('When friction exists, choose its direction from the slipping tendency.', '存在摩擦时,根据滑动趋势选择摩擦方向。')], classroomQuestions: [checkBankedRoad] },
        { heading: text('Conical pendulum', '圆锥摆'), images: [conicalPendulumImage], bullets: [text('$\\theta$ is a plane angle measured from the vertical. Resolve tension, not weight.', '$\\theta$ 是从竖直方向量起的平面角;分解张力,不是分解重力。'), text('Check units before algebra: $mg\\sin\\theta$ is a force, not an acceleration.', '代数运算前先检查单位:$mg\\sin\\theta$ 是力,不是加速度。')], formulas: [formula('Components', '分量方程', 'F_T\\cos\\theta=mg,\\qquad F_T\\sin\\theta=m\\frac{v^2}{r}')], classroomQuestions: [checkConicalPendulum] },
      ],
    },
  },
  {
    title: text('6. Changing-Speed Circular Motion', '6. 变速圆周运动'),
    description: text('Separate the acceleration that changes speed from the acceleration that changes direction.', '区分改变速率的加速度与改变方向的加速度。'),
    sections: [
      {
        heading: text('Hook: a race car accelerates while turning', '钩子:赛车在转弯时继续加速'),
        images: [accelerationComponentsImage],
        paragraphs: [text('The car is changing both speed and direction. One acceleration component cannot describe both jobs without losing the geometry.', '汽车同时改变速率与方向;若不区分几何方向,单个加速度分量无法清楚描述这两个作用。')],
      },
      {
        heading: text('Tangential, centripetal, and total acceleration', '切向、向心与总加速度'),
        formulas: [
          formula('Tangential component', '切向分量', 'a_t=\\frac{dv}{dt}'),
          formula('Centripetal component', '向心分量', 'a_c=\\frac{v^2}{r}'),
          formula('Vector sum', '矢量和', '\\vec a=\\vec a_t+\\vec a_c,\\qquad |\\vec a|=\\sqrt{a_t^2+a_c^2}'),
        ],
        bullets: [
          text('Speeding up: $\\vec a_t$ points with $\\vec v$. Slowing down: it points opposite $\\vec v$.', '加速时 $\\vec a_t$ 与 $\\vec v$ 同向;减速时二者反向。'),
          text('$\\vec a_c$ remains inward whether the object speeds up, slows down, or keeps constant speed.', '无论物体加速、减速还是保持恒定速率,$\\vec a_c$ 始终指向圆心。'),
        ],
        classroomQuestions: [checkAccelerationComponents],
      },
    ],
    studentVersion: {
      title: text('6. Acceleration Components', '6. 加速度分量'),
      description: text('$a_t$ changes speed; $a_c$ changes direction.', '$a_t$ 改变速率;$a_c$ 改变方向。'),
      sections: [
        { heading: text('Vector map', '矢量图'), images: [accelerationComponentsImage], formulas: [formula('Components', '分量', 'a_t=\\frac{dv}{dt},\\qquad a_c=\\frac{v^2}{r}'), formula('Total', '总加速度', '|\\vec a|=\\sqrt{a_t^2+a_c^2}')] },
        { heading: text('Self-check', '自测'), classroomQuestions: [checkAccelerationComponents] },
      ],
    },
  },
  {
    title: text('7. Circular Orbits and Kepler\'s Third Law', '7. 圆轨道与开普勒第三定律'),
    description: text('Use gravity as the inward force to derive circular-orbit speed and period.', '把引力作为向内合力,推导圆轨道速率与周期。'),
    sections: [
      {
        heading: text('Hook: why does a space station keep missing Earth?', '钩子:空间站为什么一直“落不到”地面?'),
        images: [circularOrbitImage],
        paragraphs: [text('A space station is continuously falling toward Earth. Its tangent velocity carries it sideways far enough that Earth curves away beneath it.', '空间站一直在向地球自由落体;它的切向速度使其横向移动得足够快,地球表面也同时在下方弯曲。')],
      },
      {
        heading: text('Circular-orbit derivation', '圆轨道推导'),
        bullets: [
          text('The satellite is in free fall with no support contact, so there is no normal force. Gravity is the only inward force in the ideal model.', '卫星处于自由落体且没有支撑接触,因此不存在支持力。在理想模型中,引力是唯一的向内合力。'),
          text('Satellite mass cancels. $R$ is measured from the center of the central body, not from its surface.', '卫星质量会约去;$R$ 从中心天体的中心量起,而不是从表面量起。'),
          text('A higher circular orbit has a smaller orbital speed and a longer period.', '更高的圆轨道具有更小的轨道速率和更长的周期。'),
        ],
        formulas: [
          formula('Radial force balance', '径向力平衡', '\\frac{GMm}{R^2}=m\\frac{v^2}{R}'),
          formula('Orbital speed', '轨道速率', 'v=\\sqrt{\\frac{GM}{R}}'),
          formula('Kepler\'s third law for circular orbits', '圆轨道形式的开普勒第三定律', 'T^2=\\frac{4\\pi^2}{GM}R^3'),
        ],
        classroomQuestions: [checkOrbit],
      },
      {
        heading: text('Explicit assessed boundary', '明确的考查边界'),
        takeaway: text('Topic 2.10 requires circular orbits and Kepler\'s third law. Kepler\'s first and second laws, elliptical-orbit geometry, and equal-area calculations are outside this topic.', 'Topic 2.10 要求圆轨道与开普勒第三定律;开普勒第一、第二定律、椭圆轨道几何和等面积计算不属于本 topic 的要求。'),
      },
    ],
    studentVersion: {
      title: text('7. Circular Orbits', '7. 圆轨道'),
      description: text('Gravity supplies the inward force for continuous free fall around a central body.', '引力为绕中心天体持续自由落体提供向内合力。'),
      sections: [
        { heading: text('Orbit model', '轨道模型'), images: [circularOrbitImage], formulas: [formula('Speed', '速率', 'v=\\sqrt{\\frac{GM}{R}}'), formula('Period', '周期', 'T^2=\\frac{4\\pi^2}{GM}R^3')], bullets: [text('No contact means no normal force; gravity alone supplies the inward force.', '没有接触就没有支持力;引力独自提供向内合力。'), text('Higher circular orbit: slower speed and longer period. Satellite mass cancels.', '圆轨道越高:速率越小,周期越长;卫星质量会约去。')] },
        { heading: text('Boundary and self-check', '边界与自测'), takeaway: text('Kepler I and II are outside Topic 2.10.', '开普勒第一、第二定律不属于 Topic 2.10。'), classroomQuestions: [checkOrbit] },
      ],
    },
  },
];
