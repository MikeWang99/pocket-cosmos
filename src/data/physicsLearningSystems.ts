import {
  apPhysicsCurriculum,
  type CurriculumCourse,
  type CurriculumDiagram,
  type CurriculumFormula,
  type CurriculumLesson,
  type CurriculumTopic,
  type CurriculumUnit,
  type LocalizedText,
} from './apPhysicsCurriculum';

export type LearningSystemId = 'ap' | 'alevel' | 'ib' | 'competition';

export interface LearningSystem {
  id: LearningSystemId;
  label: LocalizedText;
  description: LocalizedText;
  status: LocalizedText;
  sourceNote: LocalizedText;
  courses: CurriculumCourse[];
}

const text = (en: string, zh: string): LocalizedText => ({ en, zh });

const topic = (id: string, en: string, zh: string): CurriculumTopic => ({
  id,
  title: text(en, zh),
});

const formula = (labelEn: string, labelZh: string, expression: string, noteEn?: string, noteZh?: string): CurriculumFormula => ({
  label: text(labelEn, labelZh),
  expression,
  note: noteEn && noteZh ? text(noteEn, noteZh) : undefined,
});

const diagram = (kind: string, titleEn: string, titleZh: string, captionEn: string, captionZh: string): CurriculumDiagram => ({
  kind,
  title: text(titleEn, titleZh),
  caption: text(captionEn, captionZh),
});

const focus = (...items: Array<[string, string]>): LocalizedText[] => items.map(([en, zh]) => text(en, zh));

const centerOfMassDiscreteLesson: CurriculumLesson = {
  title: text('Center of Mass: Discrete Systems', 'Center of Mass（质心）：离散系统'),
  description: text(
    'A system-level model for understanding collisions, explosions, recoil, and the motion of extended objects.',
    '用来理解碰撞、爆炸、反冲和复杂物体整体运动的系统级模型。',
  ),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [
        text(
          'In momentum and collision problems, many parts of a system can move in complicated ways. A firework may explode into fragments, two people may push away on ice, and a thrown wrench may rotate while moving through the air.',
          '在动量和碰撞问题中，系统内部很多部分会以复杂方式运动。烟花会爆炸成碎片，两个人会在冰面上互相推开，扳手被扔出后会一边平动一边转动。',
        ),
        text(
          'The center of mass is the point that represents the overall motion of the whole system.',
          '质心就是用来代表整个系统整体运动的那个点。',
        ),
      ],
      takeaway: text(
        'When the internal motion is complicated, track the center of mass to describe the system as a whole.',
        '当系统内部运动很复杂时，用质心来描述系统整体运动。',
      ),
    },
    {
      heading: text('1. Why do we need center of mass?', '1. 为什么需要 Center of Mass？'),
      paragraphs: [
        text(
          'For a single particle, position, velocity, acceleration, and force are usually enough. For a multi-object system, analyzing every part separately can become messy.',
          '对于单个小球，位置、速度、加速度和受力通常就够了。但对于多物体系统，逐个分析每一部分会非常复杂。',
        ),
        text(
          'The center of mass lets us replace a complicated system with one representative point when we care about the overall motion.',
          '当我们关心系统整体运动时，质心可以把复杂系统简化成一个代表点。',
        ),
      ],
      bullets: [
        text('It represents the mass-weighted average position of the system.', '它代表系统的质量加权平均位置。'),
        text('A larger mass pulls the center of mass closer to itself.', '质量越大的部分，对质心位置影响越大。'),
        text('In momentum problems, total momentum can be described using the velocity of the center of mass.', '在动量问题中，系统总动量可以用质心速度来描述。'),
      ],
    },
    {
      heading: text('2. Definition of center of mass', '2. Center of Mass 的定义'),
      paragraphs: [
        text(
          'For two objects in one dimension, the center of mass is not usually the midpoint; it is the mass-weighted average position.',
          '对于一维中的两个物体，质心通常不是几何中点，而是质量加权平均位置。',
        ),
      ],
      formulas: [
        formula('Two-object center of mass', '两个物体的质心', 'x_{\\mathrm{cm}}=\\frac{m_1x_1+m_2x_2}{m_1+m_2}'),
        formula('Many-object center of mass', '多个物体的质心', 'x_{\\mathrm{cm}}=\\frac{\\sum m_ix_i}{\\sum m_i}'),
        formula('Two-dimensional center of mass', '二维质心', 'x_{\\mathrm{cm}}=\\frac{\\sum m_ix_i}{\\sum m_i},\\quad y_{\\mathrm{cm}}=\\frac{\\sum m_iy_i}{\\sum m_i}'),
        formula('Three-dimensional center of mass', '三维质心', 'z_{\\mathrm{cm}}=\\frac{\\sum m_iz_i}{\\sum m_i}'),
      ],
      takeaway: text(
        'The center of mass is a property of the mass distribution, so it does not have to lie inside the material object.',
        '质心是质量分布的平均位置，因此不一定在物体材料内部。',
      ),
    },
    {
      heading: text('3. Core theorem: external force controls center-of-mass acceleration', '3. 核心定理一：合外力决定质心加速度'),
      paragraphs: [
        text(
          'A complicated system moves as if all its mass were concentrated at the center of mass, as long as we are describing the motion of the system as a whole.',
          '当我们描述系统整体运动时，复杂系统可以看成总质量集中在质心上的一个点。',
        ),
      ],
      formulas: [
        formula('Center-of-mass form of Newton’s second law', '质心形式的牛顿第二定律', '\\vec F_{\\mathrm{ext,net}}=M\\vec a_{\\mathrm{cm}}'),
        formula('External force determines acceleration, not velocity directly', '外力决定加速度，而不是直接决定速度', '\\vec F_{\\mathrm{ext,net}}\\rightarrow \\vec a_{\\mathrm{cm}}'),
      ],
      takeaway: text(
        'A net external force points in the direction of center-of-mass acceleration, not necessarily in the direction of center-of-mass velocity.',
        '合外力方向决定质心加速度方向，不一定决定质心速度方向。',
      ),
    },
    {
      heading: text('4. Internal force vs. external force', '4. Internal Force 和 External Force'),
      paragraphs: [
        text(
          'Internal forces are forces between parts inside the chosen system. External forces are forces exerted on the system by the outside environment.',
          '内力是系统内部各部分之间的力；外力是系统外部环境对系统施加的力。',
        ),
        text(
          'Internal forces can change the motion of individual parts, but they cannot change the motion of the center of mass of the whole system.',
          '内力可以改变系统内部各部分的运动，但不能改变整个系统质心的运动。',
        ),
      ],
      formulas: [
        formula('Newton’s third law pair inside a system', '系统内部的牛顿第三定律力对', '\\vec F_{A\\mathrm{\\ on\\ }B}=-\\vec F_{B\\mathrm{\\ on\\ }A}'),
      ],
      bullets: [
        text('Collision forces between two carts are internal if both carts are in the system.', '如果两辆小车都在系统内，它们碰撞时彼此的作用力就是内力。'),
        text('Explosion forces between fragments are internal if all fragments are in the system.', '如果所有碎片都在系统内，爆炸力就是内力。'),
        text('Gravity, normal force, friction, air resistance, and outside pulls are external forces when they come from outside the system.', '重力、支持力、摩擦力、空气阻力和外部拉力通常是外力，前提是它们来自系统外部。'),
      ],
    },
    {
      heading: text('5. Firework explosion', '5. 典型现象：烟花爆炸'),
      paragraphs: [
        text(
          'After a firework explodes, fragments fly in many directions, but if air resistance is ignored, the center of mass of all fragments continues to follow the projectile path controlled by gravity.',
          '烟花爆炸后，碎片飞向各个方向；但如果忽略空气阻力，所有碎片组成系统的质心仍然沿着只受重力影响的抛体轨迹运动。',
        ),
      ],
      takeaway: text(
        'The explosion changes the relative motion of fragments, not the motion of the system’s center of mass.',
        '爆炸改变的是碎片之间的相对运动，而不是系统质心的整体运动。',
      ),
    },
    {
      heading: text('6. Two people pushing off on ice', '6. 典型现象：两个人在冰面上互相推开'),
      paragraphs: [
        text(
          'If two people start at rest on nearly frictionless ice and push each other apart, the push is internal to the two-person system. With no horizontal external force, the center of mass remains at rest.',
          '如果两个人一开始静止在几乎无摩擦的冰面上并互相推开，那么推力是两人系统的内力。水平方向没有合外力时，系统质心保持静止。',
        ),
      ],
      formulas: [
        formula('No net external force', '没有合外力', '\\vec F_{\\mathrm{ext,net}}=0'),
        formula('No center-of-mass acceleration', '质心加速度为零', '\\vec a_{\\mathrm{cm}}=0'),
      ],
      takeaway: text(
        'The two people move in opposite directions, but the center of mass of the system can stay in the same place.',
        '两个人可以分别向相反方向运动，但两人系统的质心可以仍然留在原来的位置。',
      ),
    },
    {
      heading: text('7. Relationship between center of mass and momentum', '7. Center of Mass 和 Momentum 的关系'),
      paragraphs: [
        text(
          'The total momentum of a system can be written as the total mass multiplied by the center-of-mass velocity.',
          '系统总动量可以写成系统总质量乘以质心速度。',
        ),
      ],
      formulas: [
        formula('Total momentum', '系统总动量', '\\vec p_{\\mathrm{total}}=\\sum m_i\\vec v_i'),
        formula('Total mass', '系统总质量', 'M=\\sum m_i'),
        formula('Center-of-mass velocity', '质心速度', '\\vec v_{\\mathrm{cm}}=\\frac{\\sum m_i\\vec v_i}{\\sum m_i}'),
        formula('Momentum and center-of-mass velocity', '总动量和质心速度', '\\vec p_{\\mathrm{total}}=M\\vec v_{\\mathrm{cm}}'),
      ],
      takeaway: text(
        'Knowing how the center of mass moves tells us how the total momentum of the system changes.',
        '知道质心如何运动，就能理解系统总动量如何变化。',
      ),
    },
    {
      heading: text('8. Core theorem: no external force means constant center-of-mass velocity', '8. 核心定理二：没有合外力时，质心速度不变'),
      paragraphs: [
        text(
          'If the system mass is constant and the net external force is zero, total momentum is conserved and the center-of-mass velocity remains constant.',
          '如果系统质量不变，并且合外力为零，那么系统总动量守恒，质心速度保持不变。',
        ),
      ],
      formulas: [
        formula('Zero net external force', '合外力为零', '\\vec F_{\\mathrm{ext,net}}=0'),
        formula('Momentum conservation', '动量守恒', '\\vec p_{\\mathrm{total}}=\\mathrm{constant}'),
        formula('Constant center-of-mass velocity', '质心速度不变', '\\vec v_{\\mathrm{cm}}=\\mathrm{constant}'),
      ],
      takeaway: text(
        'Momentum conservation and constant center-of-mass velocity are two ways of saying the same system-level idea.',
        '动量守恒和质心速度不变，是同一个系统级思想的两种表达。',
      ),
    },
    {
      heading: text('9. Where this appears in momentum problems', '9. Center of Mass 在 Momentum 章节中的作用'),
      bullets: [
        text('Collisions: if external impulse is negligible, collisions do not change the center-of-mass velocity.', '碰撞：如果外力冲量可忽略，碰撞不会改变系统质心速度。'),
        text('Explosions: fragments separate, but the system cannot gain new total momentum from internal forces alone.', '爆炸：碎片会分开，但系统不能只靠内力凭空获得新的总动量。'),
        text('Recoil: one part moves one way and another part moves the opposite way so total momentum remains unchanged.', '反冲：系统一部分向某方向运动，另一部分向相反方向运动，从而保持总动量不变。'),
      ],
    },
    {
      heading: text('10. Common mistakes', '10. 学生最容易犯的错误'),
      bullets: [
        text('Thinking the center of mass must be inside the object.', '以为质心一定在物体内部。'),
        text('Thinking internal forces can change the motion of the whole system.', '以为内力可以改变系统整体运动。'),
        text('Thinking no external force means every object in the system keeps the same velocity.', '以为没有外力时，系统里每个物体速度都不变。'),
        text('Thinking external force directly determines the direction of center-of-mass velocity.', '以为外力方向直接决定质心速度方向。'),
      ],
    },
    {
      heading: text('11. Formula summary', '11. 本节核心公式总结'),
      formulas: [
        formula('Center-of-mass position', '质心位置', 'x_{\\mathrm{cm}}=\\frac{\\sum m_ix_i}{\\sum m_i},\\quad y_{\\mathrm{cm}}=\\frac{\\sum m_iy_i}{\\sum m_i}'),
        formula('Center-of-mass motion', '质心运动和合外力', '\\vec F_{\\mathrm{ext,net}}=M\\vec a_{\\mathrm{cm}}'),
        formula('Momentum and center-of-mass velocity', '总动量和质心速度', '\\vec p_{\\mathrm{total}}=M\\vec v_{\\mathrm{cm}}'),
        formula('No external force', '没有合外力时', '\\vec F_{\\mathrm{ext,net}}=0,\\quad \\vec a_{\\mathrm{cm}}=0,\\quad \\vec v_{\\mathrm{cm}}=\\mathrm{constant},\\quad \\vec p_{\\mathrm{total}}=\\mathrm{constant}'),
      ],
      takeaway: text(
        'Center of mass is the point used to describe the overall motion of a complex system.',
        'Center of mass 是用来描述复杂系统整体运动的点。',
      ),
    },
  ],
};

const centerOfMassCalculusLesson: CurriculumLesson = {
  ...centerOfMassDiscreteLesson,
  title: text('Center of Mass: Calculus Form', 'Center of Mass（质心）：微积分形式'),
  description: text(
    'The same center-of-mass modeling logic as AP Physics 1, with the key formulas written in calculus form for AP Physics C.',
    '保留与 AP Physics 1 相同的质心建模逻辑和例子，只把关键公式改写成 AP Physics C 需要的微积分形式。',
  ),
  sections: centerOfMassDiscreteLesson.sections.map((section) => {
    switch (section.heading.en) {
      case '2. Definition of center of mass':
        return {
          ...section,
          formulas: [
            formula('Discrete-to-continuous bridge', '从离散到连续', '\\sum m_i(\\cdots)\\quad\\longrightarrow\\quad\\int (\\cdots)\\,dm'),
            formula('Total mass of a continuous object', '连续物体总质量', 'M=\\int dm'),
            formula('Continuous center of mass', '连续质心矢量形式', '\\vec r_{\\mathrm{cm}}=\\frac{1}{M}\\int \\vec r\\,dm'),
            formula('Component form', '分量形式', 'x_{\\mathrm{cm}}=\\frac{1}{M}\\int x\\,dm,\\quad y_{\\mathrm{cm}}=\\frac{1}{M}\\int y\\,dm,\\quad z_{\\mathrm{cm}}=\\frac{1}{M}\\int z\\,dm'),
            formula('Common mass elements', '常见质量元', 'dm=\\lambda\\,dx,\\quad dm=\\sigma\\,dA,\\quad dm=\\rho\\,dV'),
          ],
        };
      case '3. Core theorem: external force controls center-of-mass acceleration':
        return {
          ...section,
          formulas: [
            formula('Center-of-mass acceleration', '质心加速度', '\\vec a_{\\mathrm{cm}}=\\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}'),
            formula('Center-of-mass form of Newton’s second law', '质心形式的牛顿第二定律', '\\vec F_{\\mathrm{ext,net}}=\\frac{d}{dt}(M\\vec v_{\\mathrm{cm}})=M\\vec a_{\\mathrm{cm}}'),
            formula('External force determines acceleration, not velocity directly', '外力决定加速度，而不是直接决定速度', '\\vec F_{\\mathrm{ext,net}}\\rightarrow \\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}'),
          ],
        };
      case '5. Firework explosion':
        return {
          ...section,
          formulas: [
            formula('Center-of-mass motion after explosion', '爆炸后质心运动', '\\vec F_{\\mathrm{ext,net}}=M\\vec g\\quad\\Rightarrow\\quad \\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}=\\vec g'),
          ],
        };
      case '6. Two people pushing off on ice':
        return {
          ...section,
          formulas: [
            formula('No net horizontal external force', '水平方向没有合外力', '\\vec F_{\\mathrm{ext,net}}=0'),
            formula('No center-of-mass acceleration', '质心加速度为零', '\\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}=0'),
            formula('Constant center-of-mass velocity', '质心速度保持不变', '\\vec r_{\\mathrm{cm}}(t)=\\vec r_{\\mathrm{cm}}(0)+\\vec v_{\\mathrm{cm}}(0)t'),
          ],
        };
      case '7. Relationship between center of mass and momentum':
        return {
          ...section,
          formulas: [
            formula('Total momentum', '系统总动量', '\\vec p_{\\mathrm{total}}=\\int \\vec v\\,dm'),
            formula('Total mass', '系统总质量', 'M=\\int dm'),
            formula('Center-of-mass velocity', '质心速度', '\\vec v_{\\mathrm{cm}}=\\frac{d\\vec r_{\\mathrm{cm}}}{dt}=\\frac{1}{M}\\int \\vec v\\,dm'),
            formula('Momentum and center-of-mass velocity', '总动量和质心速度', '\\vec p_{\\mathrm{total}}=M\\vec v_{\\mathrm{cm}}'),
          ],
        };
      case '8. Core theorem: no external force means constant center-of-mass velocity':
        return {
          ...section,
          formulas: [
            formula('Zero net external force', '合外力为零', '\\vec F_{\\mathrm{ext,net}}=\\frac{d\\vec p_{\\mathrm{total}}}{dt}=0'),
            formula('Momentum conservation', '动量守恒', '\\vec p_{\\mathrm{total}}=\\mathrm{constant}'),
            formula('Constant center-of-mass velocity', '质心速度不变', '\\frac{d\\vec r_{\\mathrm{cm}}}{dt}=\\vec v_{\\mathrm{cm}}=\\mathrm{constant}'),
          ],
        };
      case '11. Formula summary':
        return {
          ...section,
          formulas: [
            formula('Continuous center-of-mass position', '连续质心位置', '\\vec r_{\\mathrm{cm}}=\\frac{1}{M}\\int \\vec r\\,dm,\\quad M=\\int dm'),
            formula('Mass element choices', '质量元选择', 'dm=\\lambda\\,dx,\\quad dm=\\sigma\\,dA,\\quad dm=\\rho\\,dV'),
            formula('Center-of-mass motion', '质心运动和合外力', '\\vec F_{\\mathrm{ext,net}}=\\frac{d}{dt}(M\\vec v_{\\mathrm{cm}})=M\\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}'),
            formula('Momentum and center-of-mass velocity', '总动量和质心速度', '\\vec p_{\\mathrm{total}}=\\int \\vec v\\,dm=M\\vec v_{\\mathrm{cm}}'),
            formula('No external force', '没有合外力时', '\\vec F_{\\mathrm{ext,net}}=0\\quad\\Rightarrow\\quad \\vec p_{\\mathrm{total}}=\\mathrm{constant},\\quad \\vec v_{\\mathrm{cm}}=\\mathrm{constant}'),
          ],
        };
      default:
        return section;
    }
  }),
};

const summaries: Record<string, LocalizedText> = {
  kinematics: text(
    'Use graphs, vectors, and calculus relationships to connect position, velocity, and acceleration.',
    '用图像、矢量和微积分关系连接位置、速度与加速度。',
  ),
  dynamics: text(
    'Translate physical interactions into forces, free-body diagrams, and Newton-law equations.',
    '把真实相互作用转化为受力图和牛顿定律方程。',
  ),
  energy: text(
    'Choose work-energy methods when forces vary or when the path matters less than the state change.',
    '当力会变化，或过程细节不如状态变化重要时，用功和能量方法建模。',
  ),
  momentum: text(
    'Track impulse and conserved momentum to analyze interactions over short time intervals.',
    '用冲量和动量守恒分析短时间相互作用。',
  ),
  rotation: text(
    'Extend force, motion, energy, and momentum ideas from translation to rotation.',
    '把平动中的力、运动、能量和动量思想推广到转动。',
  ),
  oscillation: text(
    'Recognize restoring-force models and connect period, phase, energy exchange, and graphs.',
    '识别回复力模型，并连接周期、相位、能量交换和图像。',
  ),
  fluids: text(
    'Use pressure, buoyancy, continuity, and Bernoulli models for static and moving fluids.',
    '用压强、浮力、连续性方程和伯努利模型描述静止与流动的流体。',
  ),
  thermal: text(
    'Connect microscopic particle motion, macroscopic state variables, and energy transfer.',
    '连接微观粒子运动、宏观状态量与能量传递。',
  ),
  electric: text(
    'Model electric interactions through force, field, potential, energy, and charge conservation.',
    '用力、场、电势、能量和电荷守恒描述电相互作用。',
  ),
  circuits: text(
    'Apply charge conservation and energy conservation to current, resistance, power, and transient circuits.',
    '用电荷守恒和能量守恒分析电流、电阻、功率和暂态电路。',
  ),
  magnetism: text(
    'Relate moving charges, currents, magnetic fields, forces, and induction.',
    '连接运动电荷、电流、磁场、磁力与电磁感应。',
  ),
  waves: text(
    'Use wave models to analyze propagation, interference, standing waves, sound, and light.',
    '用波动模型分析传播、干涉、驻波、声音和光。',
  ),
  optics: text(
    'Predict image formation and optical behavior with ray models and wave effects.',
    '用光线模型和波动效应预测成像与光学现象。',
  ),
  quantum: text(
    'Use photon, matter-wave, nuclear, and quantum models where classical models fail.',
    '在经典模型失效时使用光子、物质波、核物理与量子模型。',
  ),
  fields: text(
    'Use symmetry, flux, potential, and field lines to reason about field interactions.',
    '用对称性、通量、电势和场线理解场的相互作用。',
  ),
  measurement: text(
    'Use units, uncertainty, significant figures, and graphical methods to make measurements meaningful.',
    '用单位、不确定度、有效数字和图像方法让测量具有物理意义。',
  ),
};

const formulas = {
  kinematics: [
    formula('Velocity and acceleration', '速度与加速度', 'v=\\frac{dx}{dt},\\quad a=\\frac{dv}{dt}=\\frac{d^2x}{dt^2}'),
    formula('Constant-acceleration model', '匀加速模型', 'v=v_0+at,\\quad x=x_0+v_0t+\\frac12at^2'),
    formula('Graph meaning', '图像意义', '\\Delta x=\\int v\\,dt,\\quad \\Delta v=\\int a\\,dt'),
  ],
  dynamics: [
    formula('Newton’s second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
    formula('Friction', '摩擦力', 'f_k=\\mu_k N,\\quad f_s\\le \\mu_s N'),
    formula('Circular dynamics', '圆周动力学', 'a_c=\\frac{v^2}{r}=\\omega^2r,\\quad \\sum F_r=m\\frac{v^2}{r}'),
  ],
  energy: [
    formula('Work', '功', 'W=\\int \\vec F\\cdot d\\vec r'),
    formula('Kinetic and potential energy', '动能与势能', 'K=\\frac12mv^2,\\quad U_g=mgh,\\quad U_s=\\frac12kx^2'),
    formula('Energy conservation', '能量守恒', 'K_i+U_i+W_{nc}=K_f+U_f'),
    formula('Power', '功率', 'P=\\frac{dW}{dt}=\\vec F\\cdot \\vec v'),
  ],
  momentum: [
    formula('Momentum and impulse', '动量与冲量', '\\vec p=m\\vec v,\\quad \\vec J=\\int \\vec F\\,dt=\\Delta \\vec p'),
    formula('Conservation of momentum', '动量守恒', '\\sum \\vec p_i=\\sum \\vec p_f\\quad (\\sum \\vec F_{ext}=0)'),
    formula('Center of mass', '质心', '\\vec r_{cm}=\\frac{\\sum m_i\\vec r_i}{\\sum m_i}'),
  ],
  rotation: [
    formula('Rotational kinematics', '转动运动学', '\\omega=\\frac{d\\theta}{dt},\\quad \\alpha=\\frac{d\\omega}{dt}'),
    formula('Torque and angular acceleration', '力矩与角加速度', '\\vec\\tau=\\vec r\\times\\vec F,\\quad \\sum \\tau=I\\alpha'),
    formula('Rotational energy and angular momentum', '转动能量与角动量', 'K_{rot}=\\frac12I\\omega^2,\\quad L=I\\omega'),
  ],
  oscillation: [
    formula('Spring SHM', '弹簧简谐运动', 'F=-kx,\\quad \\omega=\\sqrt{\\frac{k}{m}},\\quad T=2\\pi\\sqrt{\\frac{m}{k}}'),
    formula('Pendulum small-angle period', '小角度单摆周期', 'T=2\\pi\\sqrt{\\frac{L}{g}}'),
    formula('SHM model', '简谐运动模型', 'x=A\\cos(\\omega t+\\phi)'),
  ],
  fluids: [
    formula('Pressure and buoyancy', '压强与浮力', 'P=\\frac{F}{A},\\quad P=P_0+\\rho gh,\\quad F_B=\\rho_f Vg'),
    formula('Continuity and Bernoulli', '连续性与伯努利方程', 'A_1v_1=A_2v_2,\\quad P+\\frac12\\rho v^2+\\rho gy=\\text{constant}'),
  ],
  thermal: [
    formula('Ideal gas law', '理想气体方程', 'PV=nRT=Nk_BT'),
    formula('First law', '热力学第一定律', '\\Delta U=Q-W'),
    formula('Thermal energy transfer', '热量传递', 'Q=mc\\Delta T,\\quad Q=mL'),
  ],
  electric: [
    formula('Coulomb’s law', '库仑定律', 'F=k\\frac{|q_1q_2|}{r^2}'),
    formula('Electric field and potential', '电场与电势', '\\vec E=\\frac{\\vec F}{q},\\quad \\Delta V=-\\int \\vec E\\cdot d\\vec r'),
    formula('Electric potential energy', '电势能', 'U=qV,\\quad \\Delta U=q\\Delta V'),
  ],
  circuits: [
    formula('Current, resistance, power', '电流、电阻与功率', 'I=\\frac{dq}{dt},\\quad V=IR,\\quad P=IV=I^2R=\\frac{V^2}{R}'),
    formula('Kirchhoff rules', '基尔霍夫定律', '\\sum I_{in}=\\sum I_{out},\\quad \\sum \\Delta V=0'),
    formula('RC transient', 'RC 暂态', 'q(t)=CV(1-e^{-t/RC}),\\quad I(t)=I_0e^{-t/RC}'),
  ],
  magnetism: [
    formula('Magnetic force', '磁力', '\\vec F=q\\vec v\\times \\vec B,\\quad \\vec F=I\\vec L\\times\\vec B'),
    formula('Field from current', '电流产生的磁场', 'B=\\frac{\\mu_0 I}{2\\pi r},\\quad \\oint \\vec B\\cdot d\\vec l=\\mu_0 I_{enc}'),
    formula('Faraday’s law', '法拉第定律', '\\mathcal E=-\\frac{d\\Phi_B}{dt},\\quad \\Phi_B=\\int \\vec B\\cdot d\\vec A'),
  ],
  waves: [
    formula('Wave speed', '波速', 'v=f\\lambda'),
    formula('Superposition and standing waves', '叠加与驻波', 'L=n\\frac{\\lambda}{2}\\quad \\text{or}\\quad L=(2n-1)\\frac{\\lambda}{4}'),
    formula('Interference', '干涉', 'd\\sin\\theta=m\\lambda'),
  ],
  optics: [
    formula('Reflection/refraction', '反射与折射', '\\theta_i=\\theta_r,\\quad n_1\\sin\\theta_1=n_2\\sin\\theta_2'),
    formula('Thin lenses and mirrors', '薄透镜与球面镜', '\\frac1f=\\frac1{d_o}+\\frac1{d_i},\\quad M=-\\frac{d_i}{d_o}'),
  ],
  quantum: [
    formula('Photon and matter waves', '光子与物质波', 'E=hf,\\quad p=\\frac{h}{\\lambda}'),
    formula('Photoelectric effect', '光电效应', 'K_{max}=hf-\\phi'),
    formula('Radioactive decay', '放射性衰变', 'N=N_0e^{-\\lambda t},\\quad t_{1/2}=\\frac{\\ln2}{\\lambda}'),
  ],
  fields: [
    formula('Gauss’s law', '高斯定律', '\\oint \\vec E\\cdot d\\vec A=\\frac{Q_{enc}}{\\epsilon_0}'),
    formula('Point-charge potential', '点电荷电势', 'V=k\\frac{q}{r}'),
    formula('Field from potential', '由电势求场', '\\vec E=-\\nabla V'),
  ],
  measurement: [
    formula('Percentage uncertainty', '百分不确定度', '\\%\\,\\text{uncertainty}=\\frac{\\Delta x}{x}\\times100\\%'),
    formula('Gradient and area', '斜率与面积', '\\text{gradient}=\\frac{\\Delta y}{\\Delta x},\\quad \\text{area}\\approx\\sum y\\Delta x'),
  ],
};

const diagrams = {
  kinematics: [diagram('motion-graph', 'Motion Graph', '运动图像', 'Slope and area connect the three core motion graphs.', '斜率和面积把位置、速度、加速度图像连接起来。')],
  dynamics: [diagram('free-body', 'Free-Body Diagram', '自由体图', 'Choose the system, then draw only external forces acting on it.', '先选系统，再只画作用在系统上的外力。')],
  energy: [diagram('energy-bar', 'Energy Transfer', '能量转化', 'Energy bars make conservation and nonconservative work visible.', '能量柱状图能直观看出守恒与非保守力做功。')],
  momentum: [diagram('collision', 'Impulse and Collision', '冲量与碰撞', 'Momentum is most useful when interaction forces are internal or brief.', '当相互作用力主要是内力或持续时间很短时，动量方法最有效。')],
  rotation: [diagram('rotation', 'Rotational Model', '转动模型', 'Torque depends on force, lever arm, and angle.', '力矩取决于力、力臂和夹角。')],
  oscillation: [diagram('oscillation', 'SHM Phase', '简谐运动相位', 'Position, velocity, acceleration, and energy change predictably over a cycle.', '位置、速度、加速度和能量在一个周期内有规律变化。')],
  fluids: [diagram('fluid-flow', 'Fluid Flow', '流体流动', 'A narrow pipe section has higher speed and different pressure.', '管道变窄处流速更大，压强会发生变化。')],
  thermal: [diagram('gas-cycle', 'Gas Process', '气体过程', 'PV diagrams connect work, heat, and internal energy.', 'PV 图像连接做功、热量与内能变化。')],
  electric: [diagram('electric-field', 'Electric Field', '电场', 'Field lines and equipotentials reveal force direction and energy change.', '电场线和等势线体现受力方向与能量变化。')],
  circuits: [diagram('circuit', 'Circuit Model', '电路模型', 'Junctions conserve charge; loops conserve energy.', '节点体现电荷守恒，回路体现能量守恒。')],
  magnetism: [diagram('magnetic-force', 'Magnetic Force', '磁力', 'The force is perpendicular to both velocity/current and magnetic field.', '磁力同时垂直于速度或电流方向以及磁场方向。')],
  waves: [diagram('wave', 'Wave Superposition', '波的叠加', 'Wave behavior is often read from phase, path difference, and boundary conditions.', '波动问题常从相位、波程差和边界条件入手。')],
  optics: [diagram('ray-optics', 'Ray Optics', '光线光学', 'Ray sketches predict image position, size, and orientation.', '光线图可预测像的位置、大小和正倒。')],
  quantum: [diagram('energy-levels', 'Energy Levels', '能级图', 'Transitions connect photons with discrete energy changes.', '能级跃迁把光子和离散能量变化连接起来。')],
  fields: [diagram('gauss-surface', 'Flux and Symmetry', '通量与对称性', 'Gaussian surfaces turn symmetry into a solvable field equation.', '高斯面把对称性转化为可解的场方程。')],
  measurement: [diagram('measurement', 'Measurement Graph', '测量图像', 'Best-fit lines and uncertainty bars make experimental claims testable.', '最佳拟合线和误差棒让实验结论可检验。')],
  relativity: [diagram('spacetime', 'Spacetime Event', '时空事件', 'Relativity compares measurements between inertial frames.', '相对论比较不同惯性系中的测量结果。')],
  astronomy: [diagram('orbit-star', 'Orbit and Star', '轨道与恒星', 'Gravity links orbital motion with stellar and cosmic scales.', '引力把轨道运动与恒星、宇宙尺度联系起来。')],
};

type Enrichment = Pick<CurriculumUnit, 'summary' | 'focus' | 'formulas' | 'diagrams' | 'lessons'>;

const enrich = (summaryKey: keyof typeof summaries, formulaKey: keyof typeof formulas, diagramKey: keyof typeof diagrams, focusItems: Array<[string, string]>): Enrichment => ({
  summary: summaries[summaryKey],
  focus: focus(...focusItems),
  formulas: formulas[formulaKey],
  diagrams: diagrams[diagramKey],
});

const apEnrichment: Record<string, Enrichment> = {
  'physics-1:1': enrich('kinematics', 'kinematics', 'kinematics', [
    ['Distinguish scalars, vectors, components, and reference frames.', '区分标量、矢量、分量与参考系。'],
    ['Interpret slope and area on position, velocity, and acceleration graphs.', '解释位置、速度、加速度图像的斜率和面积。'],
    ['Model one- and two-dimensional motion with vector components.', '用矢量分量建立一维和二维运动模型。'],
  ]),
  'physics-1:2': enrich('dynamics', 'dynamics', 'dynamics', [
    ['Represent interactions with system boundaries and free-body diagrams.', '用系统边界和自由体图表示相互作用。'],
    ['Apply Newton’s laws to friction, springs, gravity, and circular motion.', '把牛顿定律应用到摩擦、弹簧、重力和圆周运动。'],
    ['Separate internal forces from external forces before writing equations.', '列方程前先区分内力与外力。'],
  ]),
  'physics-1:3': enrich('energy', 'energy', 'energy', [
    ['Connect work to energy transfer and changes in kinetic or potential energy.', '把功和能量转移、动能或势能变化连接起来。'],
    ['Use system choice to decide whether energy is conserved.', '通过系统选择判断机械能是否守恒。'],
    ['Interpret power as the rate of energy transfer.', '把功率理解为能量转移速率。'],
  ]),
  'physics-1:4': {
    ...enrich('momentum', 'momentum', 'momentum', [
      ['Use impulse to connect net force over time with momentum change.', '用冲量连接一段时间内的合外力与动量变化。'],
      ['Identify when momentum is conserved for a chosen system.', '判断所选系统何时动量守恒。'],
      ['Compare elastic and inelastic collisions using energy and momentum.', '用能量和动量比较弹性与非弹性碰撞。'],
    ]),
    lessons: [centerOfMassDiscreteLesson],
  },
  'physics-1:5': enrich('rotation', 'rotation', 'rotation', [
    ['Translate between linear and angular quantities.', '在平动量和转动量之间转换。'],
    ['Use torque to predict rotational equilibrium and angular acceleration.', '用力矩预测转动平衡和角加速度。'],
    ['Reason about rotational inertia from mass distribution.', '从质量分布理解转动惯量。'],
  ]),
  'physics-1:6': enrich('rotation', 'rotation', 'rotation', [
    ['Connect rotational work, energy, angular impulse, and angular momentum.', '连接转动做功、能量、角冲量和角动量。'],
    ['Use angular momentum conservation when external torque is negligible.', '当外力矩可忽略时使用角动量守恒。'],
    ['Analyze rolling with translation and rotation together.', '把平动和转动结合分析滚动。'],
  ]),
  'physics-1:7': enrich('oscillation', 'oscillation', 'oscillation', [
    ['Recognize simple harmonic motion from proportional restoring force.', '从正比回复力识别简谐运动。'],
    ['Connect period, frequency, amplitude, and phase to graphs.', '把周期、频率、振幅、相位与图像连接起来。'],
    ['Track kinetic and potential energy exchange in oscillators.', '追踪振子中的动能与势能交换。'],
  ]),
  'physics-1:8': enrich('fluids', 'fluids', 'fluids', [
    ['Use density and pressure to describe fluids at rest.', '用密度和压强描述静止流体。'],
    ['Apply buoyancy and Newton’s laws to submerged or floating objects.', '把浮力和牛顿定律用于浸没或漂浮物体。'],
    ['Connect flow speed, area, and pressure in moving fluids.', '连接流体运动中的流速、截面积和压强。'],
  ]),
  'physics-2:9': enrich('thermal', 'thermal', 'thermal', [
    ['Relate temperature and pressure to microscopic particle motion.', '把温度和压强与微观粒子运动联系起来。'],
    ['Use the first law to track heat, work, and internal energy.', '用热力学第一定律追踪热量、做功和内能。'],
    ['Interpret entropy and irreversible processes qualitatively.', '定性解释熵和不可逆过程。'],
  ]),
  'physics-2:10': enrich('electric', 'electric', 'electric', [
    ['Distinguish charge, force, electric field, potential, and potential energy.', '区分电荷、力、电场、电势和电势能。'],
    ['Use superposition for fields and potentials from multiple charges.', '用叠加法处理多个电荷产生的场和电势。'],
    ['Connect capacitors with charge separation and stored energy.', '把电容器与电荷分离和储能联系起来。'],
  ]),
  'physics-2:11': enrich('circuits', 'circuits', 'circuits', [
    ['Model current as charge flow and voltage as energy per charge.', '把电流建模为电荷流，把电压理解为单位电荷能量。'],
    ['Use Kirchhoff rules for multi-loop and multi-branch circuits.', '用基尔霍夫定律分析多回路和多支路电路。'],
    ['Describe RC charging and discharging qualitatively and quantitatively.', '定性和定量描述 RC 充放电。'],
  ]),
  'physics-2:12': enrich('magnetism', 'magnetism', 'magnetism', [
    ['Predict magnetic forces on moving charges and current-carrying wires.', '预测运动电荷和载流导线受到的磁力。'],
    ['Relate changing magnetic flux to induced emf.', '把变化的磁通量与感应电动势联系起来。'],
    ['Use right-hand rules consistently.', '稳定使用右手定则。'],
  ]),
  'physics-2:13': enrich('optics', 'optics', 'optics', [
    ['Use ray diagrams for mirrors and lenses.', '用光线图分析镜面和透镜成像。'],
    ['Apply reflection, refraction, and image equations.', '应用反射、折射和成像方程。'],
    ['Connect sign conventions to physical image properties.', '把符号约定与实际像的性质连接起来。'],
  ]),
  'physics-2:14': enrich('waves', 'waves', 'waves', [
    ['Connect wave speed, frequency, wavelength, and medium properties.', '连接波速、频率、波长和介质性质。'],
    ['Analyze interference, diffraction, standing waves, and Doppler shifts.', '分析干涉、衍射、驻波和多普勒效应。'],
    ['Use boundary behavior to predict reflected and transmitted waves.', '用边界行为预测反射波和透射波。'],
  ]),
  'physics-2:15': enrich('quantum', 'quantum', 'quantum', [
    ['Use photon models for photoelectric effect and spectra.', '用光子模型解释光电效应和光谱。'],
    ['Connect atomic energy levels with emission and absorption.', '把原子能级与发射、吸收联系起来。'],
    ['Distinguish fission, fusion, and radioactive decay models.', '区分裂变、聚变和放射性衰变模型。'],
  ]),
  'mechanics:1': enrich('kinematics', 'kinematics', 'kinematics', [
    ['Use derivatives and integrals to move between position, velocity, and acceleration.', '用导数和积分在位置、速度、加速度之间转换。'],
    ['Handle 2D/3D vectors, parametric motion, and relative motion.', '处理二维/三维矢量、参数运动和相对运动。'],
    ['Interpret motion graphs quantitatively.', '定量解释运动图像。'],
  ]),
  'mechanics:2': enrich('dynamics', 'dynamics', 'dynamics', [
    ['Build Newton-law equations from free-body diagrams.', '从自由体图建立牛顿定律方程。'],
    ['Model drag and circular motion with calculus-ready reasoning.', '用适合微积分的方式建模阻力和圆周运动。'],
    ['Choose coordinates that simplify force components.', '选择能简化力分量的坐标系。'],
  ]),
  'mechanics:3': enrich('energy', 'energy', 'energy', [
    ['Evaluate work by dot products and integrals.', '用点积和积分计算功。'],
    ['Connect conservative forces with potential energy functions.', '把保守力与势能函数连接起来。'],
    ['Use power as instantaneous energy-transfer rate.', '把功率作为瞬时能量转移速率。'],
  ]),
  'mechanics:4': {
    ...enrich('momentum', 'momentum', 'momentum', [
      ['Use impulse from force-time graphs and integrals.', '从力-时间图像和积分求冲量。'],
      ['Apply center-of-mass reasoning to multi-object systems.', '用质心思想分析多物体系统。'],
      ['Combine momentum and energy constraints in collisions.', '在碰撞中结合动量和能量约束。'],
    ]),
    lessons: [centerOfMassCalculusLesson],
  },
  'mechanics:5': enrich('rotation', 'rotation', 'rotation', [
    ['Use rotational kinematics and torque with calculus notation.', '用微积分符号处理转动运动学和力矩。'],
    ['Compute or use rotational inertia for extended bodies.', '计算或使用刚体转动惯量。'],
    ['Analyze rotational equilibrium and angular acceleration.', '分析转动平衡和角加速度。'],
  ]),
  'mechanics:6': enrich('rotation', 'rotation', 'rotation', [
    ['Connect angular work, rotational kinetic energy, and rolling motion.', '连接转动做功、转动动能和滚动运动。'],
    ['Use angular impulse and angular momentum conservation.', '使用角冲量和角动量守恒。'],
    ['Analyze satellite motion with energy and angular momentum ideas.', '用能量和角动量思想分析卫星运动。'],
  ]),
  'mechanics:7': enrich('oscillation', 'oscillation', 'oscillation', [
    ['Derive SHM behavior from differential equations or restoring-force models.', '从微分方程或回复力模型推导简谐运动。'],
    ['Connect phase-space, energy, and sinusoidal graph representations.', '连接相空间、能量和正弦图像表示。'],
    ['Compare spring, simple pendulum, and physical pendulum models.', '比较弹簧、单摆和复摆模型。'],
  ]),
  'electricity-magnetism:8': enrich('fields', 'fields', 'fields', [
    ['Use superposition and symmetry to find electric fields.', '用叠加和对称性求电场。'],
    ['Interpret electric flux and choose Gaussian surfaces.', '解释电通量并选择高斯面。'],
    ['Apply Gauss’s law to common charge distributions.', '把高斯定律用于常见电荷分布。'],
  ]),
  'electricity-magnetism:9': enrich('electric', 'electric', 'electric', [
    ['Relate electric potential to work, energy, and field.', '把电势与功、能量和电场联系起来。'],
    ['Use integrals for potential from charge distributions.', '用积分求电荷分布产生的电势。'],
    ['Apply electric energy conservation to moving charges.', '用电能守恒分析运动电荷。'],
  ]),
  'electricity-magnetism:10': enrich('electric', 'electric', 'electric', [
    ['Describe electrostatic equilibrium in conductors.', '描述导体静电平衡。'],
    ['Analyze capacitance, dielectric effects, and stored energy.', '分析电容、电介质效应和储能。'],
    ['Track charge redistribution between conductors.', '追踪导体之间的电荷重新分布。'],
  ]),
  'electricity-magnetism:11': enrich('circuits', 'circuits', 'circuits', [
    ['Use Kirchhoff rules with calculus-based transient reasoning.', '结合微积分暂态思想使用基尔霍夫定律。'],
    ['Analyze resistance, resistivity, current density, and power.', '分析电阻、电阻率、电流密度和功率。'],
    ['Model RC circuits using exponential functions and time constants.', '用指数函数和时间常数建模 RC 电路。'],
  ]),
  'electricity-magnetism:12': enrich('magnetism', 'magnetism', 'magnetism', [
    ['Use Biot-Savart and Ampere’s law for magnetic fields.', '用毕奥-萨伐尔定律和安培定律求磁场。'],
    ['Predict magnetic forces on charges, wires, and loops.', '预测电荷、导线和线圈受到的磁力。'],
    ['Use symmetry to simplify magnetic field calculations.', '用对称性简化磁场计算。'],
  ]),
  'electricity-magnetism:13': enrich('magnetism', 'magnetism', 'magnetism', [
    ['Connect changing flux with induced emf and Lenz’s law.', '把变化磁通量与感应电动势、楞次定律连接起来。'],
    ['Analyze RL and LC circuits using energy and differential equations.', '用能量和微分方程分析 RL 与 LC 电路。'],
    ['Predict the direction of induced current and magnetic force.', '预测感应电流和磁力方向。'],
  ]),
};

const enrichApCourses = (): CurriculumCourse[] =>
  apPhysicsCurriculum.map((course) => ({
    ...course,
    sourceLabel: text('College Board Course and Exam Description', 'College Board 官方课程与考试说明'),
    units: course.units.map((unit) => ({
      ...unit,
      ...apEnrichment[`${course.id}:${unit.number}`],
    })),
  }));

const unit = (
  number: number,
  titleEn: string,
  titleZh: string,
  weighting: string,
  topics: CurriculumTopic[],
  enrichment: Enrichment,
): CurriculumUnit => ({
  number,
  title: text(titleEn, titleZh),
  weighting,
  topics,
  ...enrichment,
});

const cambridge9702: CurriculumCourse = {
  id: 'cambridge-9702',
  name: text('Cambridge International AS & A Level Physics 9702', '剑桥国际 AS & A Level 物理 9702'),
  level: text('AS & A Level', 'AS 与 A Level'),
  sourceUrl: 'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
  sourceLabel: text('Cambridge 9702 syllabus 2025-2027', 'Cambridge 9702 2025-2027 官方大纲'),
  units: [
    unit(1, 'Physical Quantities and Measurement', '物理量与测量', 'Foundation', [
      topic('1', 'Physical quantities and units', '物理量与单位'),
      topic('2', 'Measurement techniques', '测量技术'),
    ], enrich('measurement', 'measurement', 'measurement', [
      ['Use SI base quantities, derived units, prefixes, and homogeneity checks.', '使用 SI 基本量、导出单位、前缀和量纲一致性检查。'],
      ['Handle uncertainty, significant figures, calibration, and graphical data.', '处理不确定度、有效数字、校准和图像数据。'],
      ['Extract physical meaning from gradients, intercepts, and areas.', '从斜率、截距和面积中提取物理意义。'],
    ])),
    unit(2, 'Mechanics', '力学', 'Core AS', [
      topic('3', 'Kinematics', '运动学'),
      topic('4', 'Dynamics', '动力学'),
      topic('5', 'Forces, density and pressure', '力、密度与压强'),
      topic('6', 'Work, energy and power', '功、能量与功率'),
    ], enrich('dynamics', 'dynamics', 'dynamics', [
      ['Model motion with equations, graphs, and Newton’s laws.', '用方程、图像和牛顿定律建模运动。'],
      ['Apply density, pressure, and force equilibrium in real systems.', '在真实系统中应用密度、压强和受力平衡。'],
      ['Use energy methods for work, efficiency, and power.', '用能量方法处理功、效率和功率。'],
    ])),
    unit(3, 'Matter and Materials', '物质与材料', 'Core AS', [
      topic('7', 'Deformation of solids', '固体形变'),
    ], {
      summary: text('Connect force-extension graphs with elastic behavior, energy storage, and material limits.', '把力-伸长图像与弹性行为、储能和材料极限联系起来。'),
      focus: focus(
        ['Use Hooke’s law and elastic potential energy.', '使用胡克定律和弹性势能。'],
        ['Distinguish stress, strain, Young modulus, and plastic deformation.', '区分应力、应变、杨氏模量和塑性形变。'],
        ['Read material behavior from experimental graphs.', '从实验图像读出材料性质。'],
      ),
      formulas: [
        formula('Hooke’s law', '胡克定律', 'F=kx'),
        formula('Elastic energy', '弹性势能', 'E=\\frac12Fx=\\frac12kx^2'),
        formula('Young modulus', '杨氏模量', 'E=\\frac{\\text{stress}}{\\text{strain}}=\\frac{F/A}{\\Delta L/L}'),
      ],
      diagrams: [diagram('material-graph', 'Force-Extension Graph', '力-伸长图像', 'The gradient gives stiffness in the elastic region.', '弹性区斜率代表劲度。')],
    }),
    unit(4, 'Waves', '波动', 'Core AS', [
      topic('8', 'Waves', '波'),
      topic('9', 'Superposition', '叠加'),
    ], enrich('waves', 'waves', 'waves', [
      ['Describe transverse and longitudinal wave behavior.', '描述横波和纵波行为。'],
      ['Use phase, path difference, interference, diffraction, and stationary waves.', '使用相位、波程差、干涉、衍射和驻波。'],
      ['Connect wave models to sound, light, and experimental patterns.', '把波动模型连接到声音、光和实验条纹。'],
    ])),
    unit(5, 'Electricity', '电学', 'Core AS', [
      topic('10', 'Electricity', '电学'),
      topic('11', 'DC circuits', '直流电路'),
    ], enrich('circuits', 'circuits', 'circuits', [
      ['Relate current, charge, potential difference, resistance, and power.', '连接电流、电荷、电势差、电阻和功率。'],
      ['Use circuit laws for series, parallel, and sensor circuits.', '用电路规律分析串联、并联和传感器电路。'],
      ['Interpret I-V characteristics and internal resistance.', '解释 I-V 特性和内阻。'],
    ])),
    unit(6, 'Modern Physics', '近代物理', 'Core AS', [
      topic('12', 'Particle physics', '粒子物理'),
    ], enrich('quantum', 'quantum', 'quantum', [
      ['Describe particles, antiparticles, photons, and conservation laws.', '描述粒子、反粒子、光子和守恒律。'],
      ['Use simple quark and lepton classification ideas.', '使用基本的夸克和轻子分类思想。'],
      ['Connect particle interactions to exchange particles.', '把粒子相互作用与交换粒子联系起来。'],
    ])),
    unit(7, 'Advanced Mechanics and Fields', '进阶力学与场', 'A Level', [
      topic('13', 'Motion in a circle', '圆周运动'),
      topic('14', 'Gravitational fields', '引力场'),
    ], {
      ...enrich('fields', 'dynamics', 'astronomy', [
        ['Apply centripetal acceleration and force to circular motion.', '把向心加速度和向心力用于圆周运动。'],
        ['Use gravitational field strength, potential, and orbital models.', '使用引力场强、引力势和轨道模型。'],
        ['Connect field ideas with energy and satellite motion.', '把场的思想与能量和卫星运动联系起来。'],
      ]),
      formulas: [
        ...formulas.dynamics,
        formula('Gravitational field', '引力场', 'g=\\frac{GM}{r^2},\\quad V_g=-\\frac{GM}{r}'),
        formula('Orbital speed', '轨道速度', 'v=\\sqrt{\\frac{GM}{r}}'),
      ],
    }),
    unit(8, 'Thermal Physics', '热物理', 'A Level', [
      topic('15', 'Temperature', '温度'),
      topic('16', 'Ideal gases', '理想气体'),
      topic('17', 'Thermodynamics', '热力学'),
    ], enrich('thermal', 'thermal', 'thermal', [
      ['Connect temperature scales, internal energy, and molecular kinetic energy.', '连接温标、内能和分子动能。'],
      ['Use ideal gas equations and kinetic theory assumptions.', '使用理想气体方程和分子动理论假设。'],
      ['Apply the first law to thermal processes.', '把热力学第一定律用于热过程。'],
    ])),
    unit(9, 'Oscillations and Electromagnetic Fields', '振动与电磁场', 'A Level', [
      topic('18', 'Oscillations', '振动'),
      topic('19', 'Electric fields', '电场'),
      topic('20', 'Capacitance', '电容'),
      topic('21', 'Magnetic fields', '磁场'),
      topic('22', 'Alternating currents', '交流电'),
    ], {
      summary: text('Combine SHM, electric fields, capacitors, magnetic fields, and alternating-current models.', '综合简谐运动、电场、电容器、磁场和交流电模型。'),
      focus: focus(
        ['Use phase and energy ideas in oscillations.', '在振动中使用相位和能量思想。'],
        ['Analyze electric and magnetic fields with force, energy, and flux ideas.', '用力、能量和通量思想分析电场与磁场。'],
        ['Connect sinusoidal AC quantities with rms values.', '把正弦交流量与有效值联系起来。'],
      ),
      formulas: [...formulas.oscillation, ...formulas.electric, ...formulas.magnetism],
      diagrams: [...diagrams.oscillation, ...diagrams.electric, ...diagrams.magnetism],
    }),
    unit(10, 'Quantum, Nuclear, Medical, and Cosmology', '量子、核、医学与宇宙学', 'A Level', [
      topic('23', 'Quantum physics', '量子物理'),
      topic('24', 'Nuclear physics', '核物理'),
      topic('25', 'Medical physics', '医学物理'),
      topic('26', 'Astronomy and cosmology', '天文学与宇宙学'),
    ], {
      ...enrich('quantum', 'quantum', 'quantum', [
        ['Use photon, wave-particle, and energy-level models.', '使用光子、波粒二象性和能级模型。'],
        ['Apply nuclear decay, binding energy, and radiation ideas.', '应用核衰变、结合能和辐射概念。'],
        ['Connect physics models to imaging, radiation safety, stars, and cosmology.', '把物理模型连接到成像、辐射安全、恒星和宇宙学。'],
      ]),
      diagrams: [...diagrams.quantum, ...diagrams.astronomy],
    }),
  ],
};

const ibPhysics: CurriculumCourse = {
  id: 'ib-dp-physics-2025',
  name: text('IB Diploma Programme Physics', 'IB 大学预科项目物理'),
  level: text('First assessment 2025: SL/HL', '2025 首考：SL / HL'),
  sourceUrl: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/physics/',
  sourceLabel: text('IB DP Physics subject brief and guide overview', 'IB DP Physics 官方 subject brief 与课程概览'),
  units: [
    unit(1, 'A. Space, Time and Motion', 'A. 空间、时间与运动', 'SL/HL theme', [
      topic('A.1', 'Kinematics', '运动学'),
      topic('A.2', 'Forces and momentum', '力与动量'),
      topic('A.3', 'Work, energy and power', '功、能量与功率'),
      topic('A.4', 'Rigid body mechanics', '刚体力学'),
      topic('A.5', 'Galilean and special relativity', '伽利略相对性与狭义相对论'),
    ], {
      summary: text('The motion theme builds from everyday motion to momentum, energy, rotation, and relativity.', '运动主题从日常运动出发，逐步进入动量、能量、转动和相对论。'),
      focus: focus(
        ['Model motion using vectors, graphs, momentum, and energy.', '用矢量、图像、动量和能量建模运动。'],
        ['Use rotational and rigid-body ideas for extended objects.', '用转动和刚体思想分析有尺寸物体。'],
        ['Compare measurements across inertial frames in relativity contexts.', '在相对论情境中比较不同惯性系的测量。'],
      ),
      formulas: [...formulas.kinematics, ...formulas.dynamics, ...formulas.energy, ...formulas.momentum, ...formulas.rotation],
      diagrams: [...diagrams.kinematics, ...diagrams.momentum, ...diagrams.relativity],
    }),
    unit(2, 'B. The Particulate Nature of Matter', 'B. 物质的粒子性', 'SL/HL theme', [
      topic('B.1', 'Thermal energy transfers', '热能传递'),
      topic('B.2', 'Greenhouse effect', '温室效应'),
      topic('B.3', 'Gas laws', '气体定律'),
      topic('B.4', 'Thermodynamics', '热力学'),
      topic('B.5', 'Current and circuits', '电流与电路'),
    ], {
      summary: text('This theme connects particles, energy transfer, gases, climate models, and electric circuits.', '本主题连接粒子、能量传递、气体、气候模型和电路。'),
      focus: focus(
        ['Use microscopic models to explain macroscopic thermal behavior.', '用微观模型解释宏观热现象。'],
        ['Analyze energy transfer in matter, atmosphere, and thermodynamic systems.', '分析物质、大气和热力学系统中的能量转移。'],
        ['Apply circuit models to charge flow and electrical energy transfer.', '用电路模型分析电荷流动和电能转移。'],
      ),
      formulas: [...formulas.thermal, ...formulas.circuits],
      diagrams: [...diagrams.thermal, diagram('greenhouse', 'Greenhouse Model', '温室效应模型', 'Radiation balance links microscopic absorption with climate-scale energy flow.', '辐射平衡把微观吸收和气候尺度能量流联系起来。'), ...diagrams.circuits],
    }),
    unit(3, 'C. Wave Behaviour', 'C. 波的行为', 'SL/HL theme', [
      topic('C.1', 'Simple harmonic motion', '简谐运动'),
      topic('C.2', 'Wave model', '波模型'),
      topic('C.3', 'Wave phenomena', '波现象'),
      topic('C.4', 'Standing waves and resonance', '驻波与共振'),
      topic('C.5', 'Doppler effect', '多普勒效应'),
    ], {
      summary: text('Wave behaviour links oscillations, propagation, interference, resonance, and relative motion.', '波的行为连接振动、传播、干涉、共振和相对运动。'),
      focus: focus(
        ['Use SHM as a bridge from mechanics to wave motion.', '把简谐运动作为从力学到波动的桥梁。'],
        ['Analyze phase, path difference, interference, diffraction, and resonance.', '分析相位、波程差、干涉、衍射和共振。'],
        ['Use Doppler reasoning for sound, light, and astronomical evidence.', '用多普勒思想处理声音、光和天文证据。'],
      ),
      formulas: [...formulas.oscillation, ...formulas.waves],
      diagrams: [...diagrams.oscillation, ...diagrams.waves],
    }),
    unit(4, 'D. Fields', 'D. 场', 'SL/HL theme', [
      topic('D.1', 'Gravitational fields', '引力场'),
      topic('D.2', 'Electric and magnetic fields', '电场与磁场'),
      topic('D.3', 'Motion in electromagnetic fields', '电磁场中的运动'),
      topic('D.4', 'Induction', '电磁感应'),
    ], {
      summary: text('The fields theme uses force, potential, flux, and symmetry to describe interactions without contact.', '场主题用力、势、通量和对称性描述非接触相互作用。'),
      focus: focus(
        ['Compare gravitational, electric, and magnetic field models.', '比较引力场、电场和磁场模型。'],
        ['Use potential and energy to simplify field problems.', '用势和能量简化场问题。'],
        ['Analyze charged-particle motion and electromagnetic induction.', '分析带电粒子运动和电磁感应。'],
      ),
      formulas: [...formulas.fields, ...formulas.electric, ...formulas.magnetism],
      diagrams: [...diagrams.fields, ...diagrams.electric, ...diagrams.magnetism],
    }),
    unit(5, 'E. Nuclear and Quantum Physics', 'E. 核物理与量子物理', 'SL/HL theme', [
      topic('E.1', 'Structure of the atom', '原子结构'),
      topic('E.2', 'Quantum physics', '量子物理'),
      topic('E.3', 'Radioactive decay', '放射性衰变'),
      topic('E.4', 'Fission', '裂变'),
      topic('E.5', 'Fusion and stars', '聚变与恒星'),
    ], {
      summary: text('This theme explains atomic, nuclear, and stellar processes with quantum and conservation models.', '本主题用量子模型和守恒模型解释原子、原子核和恒星过程。'),
      focus: focus(
        ['Use atomic and nuclear structure models to explain spectra and radiation.', '用原子和原子核结构模型解释光谱与辐射。'],
        ['Apply half-life, decay, binding energy, and mass-energy ideas.', '应用半衰期、衰变、结合能和质能关系。'],
        ['Connect fusion with stellar energy and astrophysical evidence.', '把聚变与恒星能量和天体物理证据联系起来。'],
      ),
      formulas: [...formulas.quantum, formula('Mass-energy', '质能关系', 'E=mc^2')],
      diagrams: [...diagrams.quantum, ...diagrams.astronomy],
    }),
  ],
};

export const learningSystems: LearningSystem[] = [
  {
    id: 'ap',
    label: text('AP Physics System', 'AP 物理体系'),
    description: text(
      'College Board AP Physics 1, 2, C Mechanics, and C Electricity and Magnetism.',
      '覆盖 AP 物理 1、2、C 力学与 C 电磁学。',
    ),
    status: text('Available', '已开放'),
    sourceNote: text(
      'AP unit structure, topic names, and exam weightings are based on official College Board Course and Exam Descriptions. Focus notes, formulas, Chinese translations, and diagrams are Pocket Cosmos learning materials.',
      'AP 单元结构、知识点名称和考试占比参考 College Board 官方课程与考试说明。重点整理、公式、中文翻译和示意图由口袋宇宙制作。',
    ),
    courses: enrichApCourses(),
  },
  {
    id: 'alevel',
    label: text('A-Level Physics System', 'A-Level 物理体系'),
    description: text(
      'Cambridge International AS & A Level Physics 9702, organized from measurement to modern physics.',
      '基于剑桥国际 AS & A Level 物理 9702，从测量到近代物理组织学习路径。',
    ),
    status: text('Available', '已开放'),
    sourceNote: text(
      'The A-Level map follows the Cambridge International AS & A Level Physics 9702 syllabus for 2025-2027. Chinese translations, formulas, focus notes, and diagrams are Pocket Cosmos learning materials.',
      'A-Level 地图参考 Cambridge International AS & A Level Physics 9702 2025-2027 官方大纲。中文翻译、公式、重点整理和示意图由口袋宇宙制作。',
    ),
    courses: [cambridge9702],
  },
  {
    id: 'ib',
    label: text('IB Physics System', 'IB 物理体系'),
    description: text(
      'IB Diploma Programme Physics organized by the 2025-first-assessment themes.',
      '按照 2025 首考的新 IB DP Physics 主题结构组织。',
    ),
    status: text('Available', '已开放'),
    sourceNote: text(
      'The IB map follows the International Baccalaureate Diploma Programme Physics subject structure for first assessment 2025. Focus notes, formulas, translations, and diagrams are Pocket Cosmos learning materials.',
      'IB 地图参考 International Baccalaureate Diploma Programme Physics 2025 首考课程结构。重点整理、公式、翻译和示意图由口袋宇宙制作。',
    ),
    courses: [ibPhysics],
  },
  {
    id: 'competition',
    label: text('Competition & Extension', '竞赛与拓展'),
    description: text(
      'Physics Bowl, Olympiad foundations, and advanced problem-solving extensions will connect here.',
      '后续连接物理碗、奥赛基础和高阶解题拓展。',
    ),
    status: text('Framework', '结构规划'),
    sourceNote: text(
      'Competition materials will be organized by contest source, topic, difficulty, and solution strategy.',
      '竞赛材料后续会按赛事来源、主题、难度和解题策略整理。',
    ),
    courses: [],
  },
];
