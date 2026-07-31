import type {
  CurriculumClassroomQuestion,
  CurriculumFormula,
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

const resultantForceCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'written',
  title: text('Practice: resultant force and constant speed', '练习：合力与匀速运动'),
  prompt: text(
    'The diagram shows two horizontal forces acting on a suitcase. (i) Calculate the magnitude and direction of the resultant horizontal force. (ii) Later, the suitcase moves at constant speed. Suggest possible non-zero values for the pulling force and the friction force.',
    '图中显示行李箱受到的两个水平力。(i) 计算水平合力的大小和方向。(ii) 随后行李箱做匀速运动。给出拉力和摩擦力可能的一组非零数值。',
  ),
  image: {
    src: '/curriculum-assets/igcse-0625/unit-1/check-1-5-resultant-force.webp',
    alt: 'A suitcase pulled to the right by 20 N while a 12 N friction force acts to the left.',
    caption: text(
      'The force arrows and labels are part of the question data.',
      '力箭头与标注均为题目所给信息。',
    ),
  },
  sampleAnswer: text(
    '(i) $F_{\\mathrm{resultant}}=20-12=8\\,\\mathrm{N}$ to the right. (ii) The two forces must have equal non-zero magnitudes; for example, pulling force $=12\\,\\mathrm{N}$ and friction force $=12\\,\\mathrm{N}$.',
    '(i) $F_{\\mathrm{resultant}}=20-12=8\\,\\mathrm{N}$，方向向右。(ii) 两个力必须大小相等且均不为零；例如拉力 $=12\\,\\mathrm{N}$，摩擦力 $=12\\,\\mathrm{N}$。',
  ),
  explanation: text(
    'Opposite collinear forces subtract. Constant speed means $a=0$, so $F_{\\mathrm{resultant}}=0$; it does not mean that both individual forces are zero.',
    '同一直线上的反向力相减。匀速运动意味着 $a=0$，因此 $F_{\\mathrm{resultant}}=0$；这并不表示每一个力都等于零。',
  ),
});

const loadExtensionCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'written',
  title: text('Practice: load–extension graph', '练习：载荷—伸长量图像'),
  prompt: text(
    'A spring has the extension–load graph shown. (i) State Hooke’s law. (ii) Identify the range of load over which the spring obeys Hooke’s law. (iii) Calculate the spring constant $k$.',
    '弹簧的伸长量—载荷图像如图所示。(i) 陈述胡克定律。(ii) 判断弹簧遵守胡克定律的载荷范围。(iii) 计算弹簧常量 $k$。',
  ),
  image: {
    src: '/curriculum-assets/igcse-0625/unit-1/check-1-5-load-extension.webp',
    alt: 'Extension in millimetres plotted vertically against load in newtons, with a straight region followed by an upward curve.',
    caption: text(
      'The straight-line region ends where extension is no longer proportional to load.',
      '当伸长量不再与载荷成正比时，直线区域结束。',
    ),
  },
  sampleAnswer: text(
    '(i) The extension is directly proportional to the applied force, provided the limit of proportionality is not exceeded. (ii) Approximately $0$ to $20.5\\,\\mathrm{N}$. (iii) Using a point from the straight region, $k=F/x\\approx 20/(0.143)=1.4\\times10^2\\,\\mathrm{N\\,m^{-1}}$, equivalent to $0.14\\,\\mathrm{N\\,mm^{-1}}$.',
    '(i) 在未超过正比极限时，伸长量与所受力成正比。(ii) 约为 $0$ 至 $20.5\\,\\mathrm{N}$。(iii) 取直线段上一点，$k=F/x\\approx 20/(0.143)=1.4\\times10^2\\,\\mathrm{N\\,m^{-1}}$，等价于 $0.14\\,\\mathrm{N\\,mm^{-1}}$。',
  ),
  explanation: text(
    'Because the graph plots extension on the vertical axis and load on the horizontal axis, its straight-line gradient is $x/F=1/k$, not $k$. Converting millimetres to metres avoids a factor-of-$1000$ error.',
    '图像的纵轴是伸长量、横轴是载荷，因此直线斜率为 $x/F=1/k$，而不是 $k$。把毫米换算为米可以避免相差 $1000$ 倍的错误。',
  ),
});

const momentsCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'written',
  title: text('Practice: moments and equilibrium', '练习：力矩与平衡'),
  prompt: text(
    'The object in the diagram has negligible weight and is in equilibrium. (i) Define the moment of a force. (ii) Using $g=10\\,\\mathrm{N\\,kg^{-1}}$, calculate the force $F$. (iii) Outline an experiment using vertical forces to show that an object in equilibrium has no resultant moment.',
    '图中物体的重量可忽略，并处于平衡状态。(i) 定义力矩。(ii) 取 $g=10\\,\\mathrm{N\\,kg^{-1}}$，计算力 $F$。(iii) 概述一个利用竖直力验证平衡物体所受合力矩为零的实验。',
  ),
  image: {
    src: '/curriculum-assets/igcse-0625/unit-1/check-1-5-moments.webp',
    alt: 'An L-shaped object pivoted at P, with a downward force 12 cm from the pivot and a rope carrying a 50 kg mass 20 cm above the pivot.',
    caption: text(
      'Distances used in a moment calculation are perpendicular distances from the pivot to each force’s line of action.',
      '力矩计算使用的是转轴到各力作用线的垂直距离。',
    ),
  },
  sampleAnswer: text(
    '(i) The moment of a force about a point is $M=Fd_{\\perp}$. (ii) The rope tension is $50\\times10=500\\,\\mathrm{N}$. Equilibrium gives $500(0.20)=F(0.12)$, so $F=8.33\\times10^2\\,\\mathrm{N}\\approx830\\,\\mathrm{N}$. (iii) Balance a pivoted beam with measured vertical forces on opposite sides. Measure each force and its perpendicular distance from the pivot, then show that the total clockwise moment equals the total anticlockwise moment.',
    '(i) 力对某点的力矩为 $M=Fd_{\\perp}$。(ii) 绳中张力为 $50\\times10=500\\,\\mathrm{N}$。由平衡条件 $500(0.20)=F(0.12)$，得到 $F=8.33\\times10^2\\,\\mathrm{N}\\approx830\\,\\mathrm{N}$。(iii) 在转轴两侧施加已知的竖直力，使横杆平衡；测量各力及其作用线到转轴的垂直距离，计算并验证顺时针力矩总和等于逆时针力矩总和。',
  ),
  explanation: text(
    'The $20\\,\\mathrm{cm}$ and $12\\,\\mathrm{cm}$ distances are already perpendicular to the vertical lines of action. Force equilibrium and moment equilibrium are separate conditions; a stationary extended object must satisfy both.',
    '$20\\,\\mathrm{cm}$ 和 $12\\,\\mathrm{cm}$ 已经是到竖直作用线的垂直距离。合力为零与合力矩为零是两个独立条件；静止的有尺寸物体必须同时满足两者。',
  ),
});

const massAndWeightStudentLesson: CurriculumLesson = {
  title: text('1.3 Mass and Weight', '1.3 质量与重量'),
  description: text(
    'Mass describes inertia; weight is the gravitational force acting on that mass.',
    '质量描述惯性，重量是引力对该质量产生的力。',
  ),
  sections: [
    {
      heading: text('0. Same object, different planet', '0. 同一物体，不同星球'),
      paragraphs: [
        text(
          'An astronaut is as difficult to accelerate on the Moon as on Earth, but a spring balance gives a smaller reading. Mass is unchanged; weight changes.',
          '宇航员在月球上和在地球上一样难以被加速，但弹簧测力计读数更小。质量不变，重量改变。',
        ),
      ],
    },
    {
      heading: text('1. Mass, weight and gravitational field strength', '1. 质量、重量与重力场强'),
      paragraphs: [
        text(
          'Mass is measured in kilograms and does not change when location changes. Weight is measured in newtons and depends on the local gravitational field strength.',
          '质量以千克为单位，不因地点改变；重量以牛顿为单位，取决于当地的重力场强。',
        ),
      ],
      formulas: [
        formula('Weight', '重量', 'W=mg'),
        formula('Gravitational field strength', '重力场强', 'g=\\frac{W}{m}'),
      ],
      takeaway: text(
        'The same object has the same mass on Earth and the Moon, but different weight.',
        '同一物体在地球和月球上的质量相同，重量不同。',
      ),
    },
  ],
};

const forcesStudentLesson: CurriculumLesson = {
  title: text('1.5 Forces', '1.5 力'),
  description: text(
    'Effects of forces, resultant force, deformation, turning effects, equilibrium, centre of gravity, and stability.',
    '力的作用效果、合力、形变、转动效应、平衡、重心与稳定性。',
  ),
  sections: [
    {
      heading: text('0. Motion after a push ends', '0. 推力结束后的运动'),
      paragraphs: [
        text(
          'A trolley on a low-friction track keeps moving after the push ends. A force is not required to maintain motion; a resultant force is required to change velocity.',
          '低摩擦轨道上的小车在推力结束后仍会继续运动。维持运动不需要力；改变速度才需要合力。',
        ),
      ],
      takeaway: text(
        'Force changes motion; it does not sustain constant velocity.',
        '力改变运动状态，而不是维持恒定速度。',
      ),
    },
    {
      heading: text('1. Resultant force and inertia', '1. 合力与惯性'),
      paragraphs: [
        text(
          'Force is a vector with magnitude and direction. Collinear forces in the same direction add, while opposite forces subtract. The resultant points in the direction of the larger total force.',
          '力是具有大小和方向的矢量。同方向的共线力相加，反方向的共线力相减；合力方向与较大的总力方向相同。',
        ),
        text(
          'If the resultant force is zero, acceleration is zero. A stationary object remains stationary, and a moving object continues at constant velocity. This is Newton’s first law and is a statement about inertia.',
          '合力为零时，加速度为零。静止物体保持静止，运动物体保持匀速直线运动。这就是牛顿第一定律，也是惯性的体现。',
        ),
      ],
      formulas: [
        formula('Resultant force', '合力', '\\vec F_{\\mathrm{resultant}}=\\sum_i\\vec F_i'),
        formula('Zero resultant', '合力为零', '\\vec F_{\\mathrm{resultant}}=0\\quad\\Rightarrow\\quad \\vec a=0'),
      ],
      classroomQuestions: [resultantForceCheck('igcse-u1-student-resultant-force-check')],
    },
    {
      heading: text('2. Force and acceleration', '2. 力与加速度'),
      paragraphs: [
        text(
          'A non-zero resultant force changes velocity by changing speed, direction, or both. Acceleration is produced by the resultant force, not by one selected force, and points in the direction of the resultant force.',
          '非零合力通过改变速率、方向或两者共同改变速度。产生加速度的是合力，而不是任意选出的某一个力；加速度方向与合力方向相同。',
        ),
        text(
          'For a fixed mass, doubling the resultant force doubles the acceleration. For a fixed resultant force, doubling the mass halves the acceleration.',
          '质量不变时，合力加倍会使加速度加倍；合力不变时，质量加倍会使加速度减半。',
        ),
      ],
      formulas: [
        formula('Newton’s second law', '牛顿第二定律', '\\vec F_{\\mathrm{resultant}}=m\\vec a'),
        formula('Acceleration magnitude', '加速度大小', 'a=\\frac{F_{\\mathrm{resultant}}}{m}'),
      ],
      takeaway: text(
        'The force used in Newton’s second law is always the resultant force.',
        '牛顿第二定律中的力始终指合力。',
      ),
    },
    {
      heading: text('3. Friction, drag and curved motion', '3. 摩擦、阻力与曲线运动'),
      paragraphs: [
        text(
          'Friction acts between surfaces and opposes their relative motion or tendency to move. Drag acts against motion through a liquid or gas and usually increases as speed increases. The direction is determined from relative motion, not from a memorised left-or-right rule.',
          '摩擦力作用于接触面之间，阻碍相对运动或相对运动趋势。阻力阻碍物体在液体或气体中的运动，并通常随速率增大。其方向应根据相对运动判断，而不能死记左右方向。',
        ),
        text(
          'A force perpendicular to velocity changes the direction of velocity and produces curved or circular motion. At this level, the required relationship is qualitative: greater speed or smaller radius requires a larger inward force.',
          '与速度垂直的力会改变速度方向，从而产生曲线或圆周运动。本阶段只要求定性关系：速率越大或半径越小，所需向内力越大。',
        ),
      ],
      bullets: [
        text('Friction and drag are forces, not forms of energy.', '摩擦力和阻力是力，而不是能量形式。'),
        text('Constant speed in a straight line implies zero resultant force, even when several non-zero forces act.', '匀速直线运动意味着合力为零，即使有多个非零力同时作用。'),
        text('The equation for centripetal force is outside the required scope here; only qualitative relationships are needed.', '此处不要求向心力公式，只需掌握定性关系。'),
      ],
    },
    {
      heading: text('4. Deformation and Hooke’s law', '4. 形变与胡克定律'),
      paragraphs: [
        text(
          'A force can change the size or shape of an object. Extension is the stretched length minus the original length. In the proportional region, force is directly proportional to extension.',
          '力可以改变物体的大小或形状。伸长量等于拉伸后的长度减去原长。在正比区域内，力与伸长量成正比。',
        ),
        text(
          'The limit of proportionality is the point beyond which the load–extension graph is no longer a straight line through the origin. It should not automatically be treated as identical to the elastic limit.',
          '正比极限是载荷—伸长量图像不再保持过原点直线关系的位置，不应自动等同于弹性极限。',
        ),
        text(
          'A load–extension investigation uses the same spring, adds known loads in steps, measures the original and stretched lengths, calculates extension, and plots extension against load. Repeated readings and smaller load increments near the end of the straight-line region improve reliability.',
          '载荷—伸长量实验使用同一弹簧，逐步增加已知载荷，测量原长与拉伸后的长度，计算伸长量，并绘制伸长量随载荷变化的图像。重复读数并在直线段末端使用较小的载荷间隔，可以提高结果可靠性。',
        ),
      ],
      formulas: [
        formula('Extension', '伸长量', 'x=L-L_0'),
        formula('Hooke’s law', '胡克定律', 'F=kx'),
        formula('Spring constant', '弹簧常量', 'k=\\frac{F}{x}'),
      ],
      classroomQuestions: [loadExtensionCheck('igcse-u1-student-load-extension-check')],
    },
    {
      heading: text('5. Moments and equilibrium', '5. 力矩与平衡'),
      paragraphs: [
        text(
          'The turning effect of a force about a pivot is its moment. The distance is measured perpendicularly from the pivot to the force’s line of action, not necessarily to the point where the force is applied.',
          '力对转轴的转动效应称为力矩。距离应取转轴到力的作用线的垂直距离，不一定是转轴到力作用点的距离。',
        ),
        text(
          'For rotational equilibrium, the total clockwise moment equals the total anticlockwise moment. Choosing a pivot through an unknown support force often removes that force from the moment equation.',
          '物体处于转动平衡时，顺时针力矩总和等于逆时针力矩总和。若选择的转轴通过未知支持力的作用线，该力通常不会出现在力矩方程中。',
        ),
      ],
      formulas: [
        formula('Moment', '力矩', 'M=Fd_{\\perp}'),
        formula('Principle of moments', '力矩原理', '\\sum M_{\\mathrm{clockwise}}=\\sum M_{\\mathrm{anticlockwise}}'),
      ],
      classroomQuestions: [momentsCheck('igcse-u1-student-moments-check')],
    },
    {
      heading: text('6. Centre of gravity and stability', '6. 重心与稳定性'),
      paragraphs: [
        text(
          'Complete equilibrium requires both zero resultant force and zero resultant moment.',
          '完整的平衡同时要求合力为零，并且合力矩为零。',
        ),
        text(
          'The centre of gravity is the point through which the entire weight of an object may be considered to act. To locate it for an irregular lamina, suspend the lamina freely from one point and draw the vertical line shown by a plumb line. Repeat from at least one other suspension point. The intersection of the vertical lines is the centre of gravity.',
          '重心是可以认为物体全部重量集中作用的点。测定不规则薄片重心时，先从一点自由悬挂薄片，利用铅垂线画出通过悬点的竖直线；再换至少一个悬点重复操作。各条竖直线的交点就是重心。',
        ),
        text(
          'An object is more stable when its centre of gravity is lower and its base is wider. Toppling begins when the vertical line through the centre of gravity passes outside the base, creating an unbalanced moment about the edge.',
          '物体重心越低、支撑面越宽，稳定性越强。当通过重心的竖直线越过支撑面边缘时，物体会绕边缘产生不平衡力矩并开始倾倒。',
        ),
      ],
      formulas: [
        formula('Translational equilibrium', '平动平衡', '\\sum\\vec F=0'),
        formula('Rotational equilibrium', '转动平衡', '\\sum M=0'),
      ],
    },
    {
      heading: text('7. Decision rules and scope boundaries', '7. 判断规则与范围边界'),
      bullets: [
        text('First identify the object or system; only forces acting on it belong in its force analysis.', '先确定研究对象或系统；只有作用在该对象上的力才进入受力分析。'),
        text('Constant velocity means zero resultant force, not zero individual forces.', '恒定速度表示合力为零，而不是每个力都为零。'),
        text('A force in the direction of velocity increases speed; an opposite force decreases speed; a perpendicular force changes direction.', '力与速度同向时速率增大，反向时速率减小，垂直时方向改变。'),
        text('In a moment calculation, use the perpendicular distance to the line of action.', '计算力矩时，使用到力作用线的垂直距离。'),
        text('For equilibrium of an extended object, check both force balance and moment balance.', '判断有尺寸物体是否平衡时，需要同时检查力平衡和力矩平衡。'),
      ],
    },
  ],
};

const momentumStudentLesson: CurriculumLesson = {
  title: text('1.6 Momentum', '1.6 动量'),
  description: text(
    'Momentum as a vector, conservation in interactions, and impulse as change in momentum.',
    '动量的矢量性、相互作用中的动量守恒，以及冲量与动量变化。',
  ),
  sections: [
    {
      heading: text('0. What remains predictable in a collision', '0. 碰撞中仍可预测的量'),
      paragraphs: [
        text(
          'Collision forces can be complicated, but total momentum remains predictable when external impulse is negligible.',
          '碰撞力可能很复杂，但当外冲量可忽略时，总动量仍可预测。',
        ),
      ],
    },
    {
      heading: text('1. Momentum and impulse', '1. 动量与冲量'),
      paragraphs: [
        text(
          'Momentum depends on mass and velocity. In an isolated system, total momentum before an interaction equals total momentum after it. Impulse equals change in momentum.',
          '动量取决于质量和速度。在孤立系统中，相互作用前后的总动量相等。冲量等于动量变化。',
        ),
      ],
      formulas: [
        formula('Momentum', '动量', '\\vec p=m\\vec v'),
        formula('Momentum conservation', '动量守恒', '\\sum\\vec p_{\\mathrm{before}}=\\sum\\vec p_{\\mathrm{after}}'),
        formula('Impulse', '冲量', '\\vec J=\\vec F\\Delta t=\\Delta\\vec p'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-student-momentum-collision',
          title: text('Practice: trolley collision', '练习：小车碰撞'),
          prompt: text(
            'A $2\\,\\mathrm{kg}$ trolley moving at $3\\,\\mathrm{m\\,s^{-1}}$ collides with a stationary $1\\,\\mathrm{kg}$ trolley. They stick together. What is their speed after the collision?',
            '一辆质量为 $2\\,\\mathrm{kg}$、速度为 $3\\,\\mathrm{m\\,s^{-1}}$ 的小车与一辆静止的 $1\\,\\mathrm{kg}$ 小车碰撞并粘在一起。碰撞后的速率是多少？',
          ),
          choices: [
            { label: 'A', text: text('$2\\,\\mathrm{m\\,s^{-1}}$', '$2\\,\\mathrm{m\\,s^{-1}}$') },
            { label: 'B', text: text('$3\\,\\mathrm{m\\,s^{-1}}$', '$3\\,\\mathrm{m\\,s^{-1}}$') },
            { label: 'C', text: text('$1.5\\,\\mathrm{m\\,s^{-1}}$', '$1.5\\,\\mathrm{m\\,s^{-1}}$') },
            { label: 'D', text: text('$6\\,\\mathrm{m\\,s^{-1}}$', '$6\\,\\mathrm{m\\,s^{-1}}$') },
          ],
          correctAnswer: 'A',
          feedback: text(
            '$2(3)+1(0)=(2+1)v$, so $v=2\\,\\mathrm{m\\,s^{-1}}$.',
            '$2(3)+1(0)=(2+1)v$，所以 $v=2\\,\\mathrm{m\\,s^{-1}}$。',
          ),
        },
      ],
    },
  ],
};

export const igcseUnit1Lessons: CurriculumLesson[] = [
  {
    title: text('1.3 Mass and Weight', '1.3 质量与重量'),
    description: text(
      'A distinct Unit 1 topic separating mass, weight, inertia, and gravitational field strength.',
      'Unit 1 中独立的知识模块，用于区分质量、重量、惯性和重力场强。',
    ),
    sections: [
      {
        heading: text('0. Same object, different planet', '0. 同一物体，不同星球'),
        paragraphs: [
          text(
            'An astronaut’s body is just as difficult to accelerate on the Moon as on Earth, but a spring balance gives a smaller reading on the Moon. The unchanged property is mass; the changing force is weight.',
            '宇航员在月球上和在地球上一样难以被加速，但弹簧测力计在月球上的读数更小。不变的是质量，改变的是重量。',
          ),
        ],
      },
      {
        heading: text('1. Definitions and relationships', '1. 定义与关系'),
        paragraphs: [
          text(
            'Mass is a measure of the quantity of matter and of inertia. It is measured in kilograms and remains constant when location changes. Weight is the gravitational force acting on a mass. It is measured in newtons and changes with gravitational field strength.',
            '质量是物质多少和惯性大小的量度，以千克为单位，地点改变时保持不变。重量是引力对质量产生的力，以牛顿为单位，并随重力场强改变。',
          ),
          text(
            'Near Earth’s surface, $g\\approx9.8\\,\\mathrm{N\\,kg^{-1}}$, often rounded to the value specified in an examination question.',
            '在地球表面附近，$g\\approx9.8\\,\\mathrm{N\\,kg^{-1}}$；考试题中可按题目指定值取整。',
          ),
        ],
        formulas: [
          formula('Weight', '重量', 'W=mg'),
          formula('Gravitational field strength', '重力场强', 'g=\\frac{W}{m}'),
        ],
        takeaway: text(
          'Mass determines resistance to acceleration; weight is one particular force.',
          '质量决定物体对加速度的抵抗程度；重量只是力的一种。',
        ),
      },
    ],
    studentVersion: massAndWeightStudentLesson,
  },
  {
    title: text('1.5 Forces', '1.5 力'),
    description: text(
      'The complete Unit 1.5 structure: effects of forces, friction and drag, deformation, moments, equilibrium, centre of gravity, and stability.',
      '完整的 Unit 1.5 结构：力的作用效果、摩擦与阻力、形变、力矩、平衡、重心与稳定性。',
    ),
    sections: [
      {
        heading: text('0. Why motion can continue without a driving force', '0. 为什么没有驱动力，运动仍可继续'),
        paragraphs: [
          text(
            'A trolley on a low-friction track continues moving after the push has ended. A force is not required to maintain motion; a resultant force is required to change velocity. This distinction connects every part of Unit 1.5.',
            '低摩擦轨道上的小车在推力消失后仍会继续运动。维持运动不需要力；改变速度才需要合力。这个区别贯穿 Unit 1.5 的全部内容。',
          ),
        ],
        takeaway: text(
          'Force changes motion; it does not sustain constant velocity.',
          '力改变运动状态，而不是维持恒定速度。',
        ),
      },
      {
        heading: text('1. Resultant forces and Newton’s first law', '1. 合力与牛顿第一定律'),
        paragraphs: [
          text(
            'Force is a vector with magnitude and direction. Collinear forces acting in the same direction add, while forces in opposite directions subtract. The direction of the resultant is the direction of the larger total force.',
            '力是具有大小和方向的矢量。同方向的共线力相加，反方向的共线力相减；合力方向与较大的总力方向相同。',
          ),
          text(
            'If the resultant force is zero, acceleration is zero. A stationary object remains stationary, and a moving object continues at constant velocity. This is Newton’s first law and is also a statement about inertia.',
            '合力为零时，加速度为零。静止物体保持静止，运动物体保持匀速直线运动。这就是牛顿第一定律，也是惯性的体现。',
          ),
        ],
        formulas: [
          formula('Resultant force', '合力', '\\vec F_{\\mathrm{resultant}}=\\sum_i\\vec F_i'),
          formula('Zero resultant', '合力为零', '\\vec F_{\\mathrm{resultant}}=0\\quad\\Rightarrow\\quad \\vec a=0'),
        ],
        classroomQuestions: [resultantForceCheck('igcse-u1-teacher-resultant-force-check')],
      },
      {
        heading: text('2. Resultant force and acceleration', '2. 合力与加速度'),
        paragraphs: [
          text(
            'A non-zero resultant force changes velocity by changing speed, direction, or both. Newton’s second law links the resultant force to acceleration. The acceleration points in the same direction as the resultant force.',
            '非零合力通过改变速率、方向或两者共同改变速度。牛顿第二定律把合力与加速度联系起来，加速度方向与合力方向相同。',
          ),
          text(
            'For a fixed mass, doubling the resultant force doubles the acceleration. For a fixed resultant force, doubling the mass halves the acceleration.',
            '质量不变时，合力加倍会使加速度加倍；合力不变时，质量加倍会使加速度减半。',
          ),
        ],
        formulas: [
          formula('Newton’s second law', '牛顿第二定律', '\\vec F_{\\mathrm{resultant}}=m\\vec a'),
          formula('Acceleration magnitude', '加速度大小', 'a=\\frac{F_{\\mathrm{resultant}}}{m}'),
        ],
        takeaway: text(
          'The force used in Newton’s second law is always the resultant force.',
          '牛顿第二定律中的力始终指合力。',
        ),
      },
      {
        heading: text('3. Friction, drag and changes of direction', '3. 摩擦、阻力与方向改变'),
        paragraphs: [
          text(
            'Friction acts between surfaces and opposes their relative motion or tendency to move. Drag acts against motion through a liquid or gas and usually increases as speed increases. These forces can reduce speed, but their direction must be determined from the relative motion rather than from a memorised left-or-right rule.',
            '摩擦力作用于接触面之间，阻碍相对运动或相对运动趋势。阻力阻碍物体在液体或气体中的运动，并通常随速率增大。这些力可以降低速率，但其方向应根据相对运动判断，而不能死记左右方向。',
          ),
          text(
            'A force does not need to make an object faster or slower. A force perpendicular to velocity changes the direction of velocity and produces curved or circular motion. At this level, the required result is qualitative: greater speed or smaller radius requires a larger inward force.',
            '力不一定使物体变快或变慢。与速度垂直的力会改变速度方向，从而产生曲线或圆周运动。本阶段只要求定性关系：速率越大或半径越小，所需向内力越大。',
          ),
        ],
        bullets: [
          text('Friction and drag are forces, not forms of energy.', '摩擦力和阻力是力，而不是能量形式。'),
          text('Constant speed in a straight line implies zero resultant force, even when several non-zero forces act.', '匀速直线运动意味着合力为零，即使有多个非零力同时作用。'),
          text('The equation for centripetal force is outside the required scope here; only qualitative relationships are needed.', '此处不要求向心力公式，只需掌握定性关系。'),
        ],
      },
      {
        heading: text('4. Deformation, extension and Hooke’s law', '4. 形变、伸长量与胡克定律'),
        paragraphs: [
          text(
            'A force can change the size or shape of an object. Extension is the difference between the stretched length and the original length. For a spring in the proportional region, force is directly proportional to extension.',
            '力可以改变物体的大小或形状。伸长量等于拉伸后长度与原长之差。弹簧处于正比区域时，力与伸长量成正比。',
          ),
          text(
            'The limit of proportionality is the point beyond which the load–extension graph is no longer a straight line through the origin. It is a graph relationship and should not automatically be treated as identical to the elastic limit.',
            '正比极限是载荷—伸长量图像不再保持过原点直线关系的位置。它描述的是图像关系，不应自动等同于弹性极限。',
          ),
          text(
            'A load–extension investigation uses the same spring, adds known loads in steps, measures the original and stretched lengths, calculates extension, and plots extension against load. Repeated readings and small load increments improve reliability near the end of the straight-line region.',
            '载荷—伸长量实验使用同一弹簧，逐步增加已知载荷，测量原长与拉伸后的长度，计算伸长量，并绘制伸长量随载荷变化的图像。重复读数并在直线段末端使用较小的载荷间隔，可以提高结果可靠性。',
          ),
        ],
        formulas: [
          formula('Extension', '伸长量', 'x=L-L_0'),
          formula('Hooke’s law', '胡克定律', 'F=kx'),
          formula('Spring constant', '弹簧常量', 'k=\\frac{F}{x}'),
        ],
        classroomQuestions: [loadExtensionCheck('igcse-u1-teacher-load-extension-check')],
      },
      {
        heading: text('5. Turning effect and the principle of moments', '5. 转动效应与力矩原理'),
        paragraphs: [
          text(
            'The turning effect of a force about a pivot is its moment. The distance is measured perpendicularly from the pivot to the force’s line of action, not necessarily to the point where the force is applied.',
            '力对转轴的转动效应称为力矩。距离应取转轴到力的作用线的垂直距离，不一定是转轴到力作用点的距离。',
          ),
          text(
            'For an object in rotational equilibrium, the total clockwise moment about any point equals the total anticlockwise moment about that point. Choosing a pivot through an unknown support force often removes that force from the moment equation.',
            '物体处于转动平衡时，关于任意一点的顺时针力矩总和等于逆时针力矩总和。若选择的转轴通过未知支持力的作用线，该力通常不会出现在力矩方程中。',
          ),
        ],
        formulas: [
          formula('Moment', '力矩', 'M=Fd_{\\perp}'),
          formula('Principle of moments', '力矩原理', '\\sum M_{\\mathrm{clockwise}}=\\sum M_{\\mathrm{anticlockwise}}'),
        ],
        classroomQuestions: [momentsCheck('igcse-u1-teacher-moments-check')],
      },
      {
        heading: text('6. Equilibrium, centre of gravity and stability', '6. 平衡、重心与稳定性'),
        paragraphs: [
          text(
            'Complete equilibrium requires both translational equilibrium and rotational equilibrium: the resultant force is zero and the resultant moment is zero.',
            '完整的平衡同时要求平动平衡和转动平衡：合力为零，并且合力矩为零。',
          ),
          text(
            'The centre of gravity is the point through which the entire weight of an object may be considered to act. For an irregular lamina, suspending it from different points and drawing the vertical plumb line each time locates the centre of gravity at the intersection of the lines.',
            '重心是可以认为物体全部重量集中作用的点。对于不规则薄片，从不同点悬挂并分别画出铅垂线，各条线的交点就是重心。',
          ),
          text(
            'An object is more stable when its centre of gravity is lower and its base is wider. Toppling begins when the vertical line through the centre of gravity passes outside the base, creating an unbalanced moment about the edge.',
            '物体重心越低、支撑面越宽，稳定性越强。当通过重心的竖直线越过支撑面边缘时，物体会绕边缘产生不平衡力矩并开始倾倒。',
          ),
        ],
        formulas: [
          formula('Translational equilibrium', '平动平衡', '\\sum\\vec F=0'),
          formula('Rotational equilibrium', '转动平衡', '\\sum M=0'),
        ],
      },
      {
        heading: text('7. Decision rules and scope boundaries', '7. 判断规则与范围边界'),
        bullets: [
          text('First identify the object or system; only forces acting on it belong in its force analysis.', '先确定研究对象或系统；只有作用在该对象上的力才进入受力分析。'),
          text('Constant velocity means zero resultant force, not zero individual forces.', '恒定速度表示合力为零，而不是每个力都为零。'),
          text('A force in the direction of velocity increases speed; an opposite force decreases speed; a perpendicular force changes direction.', '力与速度同向时速率增大，反向时速率减小，垂直时方向改变。'),
          text('In a moment calculation, use the perpendicular distance to the line of action.', '计算力矩时，使用到力作用线的垂直距离。'),
          text('For equilibrium of an extended object, check both force balance and moment balance.', '判断有尺寸物体是否平衡时，需要同时检查力平衡和力矩平衡。'),
        ],
      },
    ],
    studentVersion: forcesStudentLesson,
  },
  {
    title: text('1.6 Momentum', '1.6 动量'),
    description: text(
      'A distinct Unit 1 topic covering vector momentum, conservation in collisions and explosions, and impulse.',
      'Unit 1 中独立的知识模块，涵盖动量的矢量性、碰撞与爆炸中的守恒，以及冲量。',
    ),
    sections: [
      {
        heading: text('0. What remains predictable during a collision', '0. 碰撞过程中什么量仍可预测'),
        paragraphs: [
          text(
            'During a collision, the contact forces can be large and the details can be complicated. If external forces are negligible, the total momentum of the system remains constant, allowing the final motion to be predicted.',
            '碰撞过程中接触力可能很大，细节也可能很复杂。若外力可忽略，系统总动量保持不变，因此仍可预测碰撞后的运动。',
          ),
        ],
      },
      {
        heading: text('1. Momentum, conservation and impulse', '1. 动量、守恒与冲量'),
        paragraphs: [
          text(
            'Momentum is the product of mass and velocity and therefore has direction. For an isolated system, vector momentum before an interaction equals vector momentum after it. This applies to collisions, explosions, and recoil.',
            '动量是质量与速度的乘积，因此具有方向。对于孤立系统，相互作用前后的矢量总动量相等，适用于碰撞、爆炸和反冲。',
          ),
          text(
            'Impulse is the change in momentum. Increasing the time over which a given momentum change occurs reduces the average force.',
            '冲量等于动量变化。在动量变化量相同的情况下，延长作用时间会减小平均力。',
          ),
        ],
        formulas: [
          formula('Momentum', '动量', '\\vec p=m\\vec v'),
          formula('Momentum conservation', '动量守恒', '\\sum\\vec p_{\\mathrm{before}}=\\sum\\vec p_{\\mathrm{after}}'),
          formula('Impulse', '冲量', '\\vec J=\\vec F\\Delta t=\\Delta\\vec p'),
        ],
        classroomQuestions: [
          {
            id: 'igcse-u1-teacher-momentum-collision',
            title: text('Practice: trolley collision', '练习：小车碰撞'),
            prompt: text(
              'A $2\\,\\mathrm{kg}$ trolley moving at $3\\,\\mathrm{m\\,s^{-1}}$ collides with a stationary $1\\,\\mathrm{kg}$ trolley. They stick together. What is their speed after the collision?',
              '一辆质量为 $2\\,\\mathrm{kg}$、速度为 $3\\,\\mathrm{m\\,s^{-1}}$ 的小车与一辆静止的 $1\\,\\mathrm{kg}$ 小车碰撞并粘在一起。碰撞后的速率是多少？',
            ),
            choices: [
              { label: 'A', text: text('$2\\,\\mathrm{m\\,s^{-1}}$', '$2\\,\\mathrm{m\\,s^{-1}}$') },
              { label: 'B', text: text('$3\\,\\mathrm{m\\,s^{-1}}$', '$3\\,\\mathrm{m\\,s^{-1}}$') },
              { label: 'C', text: text('$1.5\\,\\mathrm{m\\,s^{-1}}$', '$1.5\\,\\mathrm{m\\,s^{-1}}$') },
              { label: 'D', text: text('$6\\,\\mathrm{m\\,s^{-1}}$', '$6\\,\\mathrm{m\\,s^{-1}}$') },
            ],
            correctAnswer: 'A',
            feedback: text(
              'Momentum before is $2(3)+1(0)=6\\,\\mathrm{kg\\,m\\,s^{-1}}$. After the collision, $(2+1)v=6$, so $v=2\\,\\mathrm{m\\,s^{-1}}$.',
              '碰撞前总动量为 $2(3)+1(0)=6\\,\\mathrm{kg\\,m\\,s^{-1}}$。碰撞后 $(2+1)v=6$，所以 $v=2\\,\\mathrm{m\\,s^{-1}}$。',
            ),
          },
        ],
      },
      {
        heading: text('2. Common errors', '2. 常见错误'),
        bullets: [
          text('Momentum is a vector; opposite directions require opposite signs.', '动量是矢量；相反方向需要使用相反符号。'),
          text('Momentum conservation applies to the chosen system when external impulse is negligible.', '只有当所选系统受到的外冲量可忽略时，才能使用动量守恒。'),
          text('Kinetic energy does not have to be conserved in an inelastic collision.', '非弹性碰撞中动能不一定守恒。'),
        ],
      },
    ],
    studentVersion: momentumStudentLesson,
  },
];
