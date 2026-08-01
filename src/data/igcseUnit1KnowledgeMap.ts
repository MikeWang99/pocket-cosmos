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

const physicalQuantitiesLesson: CurriculumLesson = {
  title: text('1.1 Physical Quantities and Measurement Techniques', '1.1 物理量与测量技术'),
  description: text(
    'Length, volume and time measurements; repeated measurements; scalars, vectors and right-angle resultants.',
    '长度、体积与时间测量；多次测量；标量、矢量与直角矢量合成。',
  ),
  sections: [
    {
      heading: text('1. Measuring length and volume', '1. 测量长度与体积'),
      paragraphs: [
        text(
          'A ruler is read at eye level from the correct zero mark. If the zero end is damaged, take two readings and subtract. A measuring cylinder is read at eye level at the appropriate point of the meniscus. The scale division determines the reading precision.',
          '刻度尺应从正确的零刻度开始并平视读数；若零端损坏，可读取两个位置后相减。量筒应在液面处平视，并按合适的弯月面位置读数。最小分度决定读数精度。',
        ),
        text(
          'A regular solid has its volume calculated from measured dimensions. The volume of a liquid is read directly from a measuring cylinder. The volume of a submerged irregular solid is the increase in liquid volume.',
          '规则固体的体积由测得的尺寸计算；液体体积可由量筒直接读出；完全浸没的不规则固体体积等于液体读数的增加量。',
        ),
      ],
      formulas: [
        formula('Displacement volume', '排水体积', 'V_{\\mathrm{object}}=V_{\\mathrm{final}}-V_{\\mathrm{initial}}'),
      ],
    },
    {
      heading: text('2. Measuring time and small quantities', '2. 测量时间与微小量'),
      paragraphs: [
        text(
          'Clocks and digital timers measure time intervals. For a short interval or a small distance, measure many identical intervals or objects together and divide by the number measured. This reduces the percentage effect of the reading uncertainty.',
          '时钟和数字计时器用于测量时间间隔。测量很短的时间或很小的距离时，应把多个相同间隔或物体一起测量，再除以数量，以减小读数不确定度的百分比影响。',
        ),
        text(
          'For a pendulum, time several complete oscillations from the same reference point and in the same direction, then divide by the number of oscillations to obtain the period.',
          '测量单摆周期时，从同一参考位置、同一运动方向开始，为多个完整振动计时，再除以振动次数。',
        ),
      ],
      formulas: [
        formula('Average small quantity', '微小量平均值', '\\text{average}=\\frac{\\text{total measured value}}{\\text{number of equal items or intervals}}'),
        formula('Pendulum period', '单摆周期', 'T=\\frac{t}{N}'),
      ],
    },
    {
      heading: text('3. Scalars and vectors (Supplement)', '3. 标量与矢量（Supplement）'),
      paragraphs: [
        text(
          'A scalar has magnitude only. A vector has both magnitude and direction. Distance, speed, time, mass, energy and temperature are scalars. Force, weight, velocity, acceleration, momentum, electric field strength and gravitational field strength are vectors.',
          '标量只有大小；矢量同时具有大小和方向。路程、速率、时间、质量、能量和温度是标量；力、重量、速度、加速度、动量、电场强度和重力场强是矢量。',
        ),
        text(
          'For two perpendicular forces or velocities, the resultant can be found by a scale drawing or by resolving the vectors into a right-angled triangle. Its direction must be stated as well as its magnitude.',
          '对于两个互相垂直的力或速度，可用比例作图或直角三角形计算合矢量。答案必须同时给出大小和方向。',
        ),
      ],
      formulas: [
        formula('Right-angle resultant', '直角合矢量', 'R=\\sqrt{A^2+B^2}'),
        formula('Resultant direction', '合矢量方向', '\\tan\\theta=\\frac{B}{A}'),
      ],
      takeaway: text(
        'A number and unit are sufficient for a scalar; a vector answer also needs a direction.',
        '标量答案只需数值和单位；矢量答案还必须包含方向。',
      ),
    },
  ],
};

const densityLesson: CurriculumLesson = {
  title: text('1.4 Density', '1.4 密度'),
  description: text(
    'Density calculations, experimental determination for liquids and solids, and floating from density comparisons.',
    '密度计算、液体与固体密度的实验测定，以及利用密度比较判断浮沉。',
  ),
  sections: [
    {
      heading: text('1. Density and unit control', '1. 密度与单位控制'),
      paragraphs: [
        text(
          'Density is mass per unit volume. Mass and volume must use compatible units before substitution. Common units are $\\mathrm{kg\\,m^{-3}}$ and $\\mathrm{g\\,cm^{-3}}$.',
          '密度是单位体积的质量。代入公式前，质量和体积必须使用相容单位。常用单位为 $\\mathrm{kg\\,m^{-3}}$ 和 $\\mathrm{g\\,cm^{-3}}$。',
        ),
      ],
      formulas: [
        formula('Density', '密度', '\\rho=\\frac{m}{V}'),
        formula('Unit conversion', '单位换算', '1\\,\\mathrm{g\\,cm^{-3}}=1000\\,\\mathrm{kg\\,m^{-3}}'),
      ],
    },
    {
      heading: text('2. Determining density experimentally', '2. 实验测定密度'),
      bullets: [
        text('Liquid: find the mass of an empty container and the mass of the container plus a measured liquid volume; subtract to obtain the liquid mass.', '液体：测空容器质量和容器加已知体积液体的总质量，相减得到液体质量。'),
        text('Regular solid: measure its mass and the dimensions needed to calculate its volume.', '规则固体：测量质量，并测量计算体积所需的各个尺寸。'),
        text('Irregular solid that sinks: measure its mass, fully submerge it in a measuring cylinder, and obtain its volume from liquid displacement.', '会下沉的不规则固体：测量质量，将其完全浸没在量筒中，以排开液体的体积作为物体体积。'),
        text('Repeat measurements where practical and avoid trapped air, parallax and incomplete immersion.', '条件允许时重复测量，并避免气泡、视差和未完全浸没。'),
      ],
    },
    {
      heading: text('3. Floating and layering', '3. 浮沉与液体分层'),
      paragraphs: [
        text(
          'An object floats in a liquid when its average density is less than the liquid density and sinks when it is greater. For immiscible liquids, the less dense liquid forms the upper layer.',
          '物体平均密度小于液体密度时会漂浮，大于液体密度时会下沉。对于互不相溶的液体，密度较小的液体位于上层。',
        ),
      ],
    },
  ],
};

const energyWorkPowerLesson: CurriculumLesson = {
  title: text('1.7 Energy, Work and Power', '1.7 能量、功与功率'),
  description: text(
    'Energy stores and transfers, conservation, work, resources, efficiency and power.',
    '能量储存与转移、能量守恒、功、能源、效率与功率。',
  ),
  sections: [
    {
      heading: text('1. Energy stores and transfer pathways', '1. 能量储存与转移路径'),
      paragraphs: [
        text(
          'Energy may be stored as kinetic, gravitational potential, chemical, elastic, nuclear, electrostatic or internal energy. Energy is transferred mechanically by forces, electrically by currents, by heating, and by electromagnetic, sound or other waves.',
          '能量可储存在动能、重力势能、化学能、弹性势能、核能、静电能和内能中。能量可通过力做机械功、电流做电功、加热，以及电磁波、声波或其他波来转移。',
        ),
        text(
          'Energy is conserved: it moves between stores but is not created or destroyed. Simple flow diagrams and multi-stage Sankey diagrams must account for all input energy, including energy dissipated to the surroundings.',
          '能量守恒：能量只在不同储存形式间转移，不会被创造或消灭。简单能量流图和多阶段桑基图都必须计入全部输入能量，包括耗散到环境中的能量。',
        ),
      ],
      formulas: [
        formula('Kinetic energy (Supplement)', '动能（Supplement）', 'E_k=\\frac12mv^2'),
        formula('Change in gravitational potential energy (Supplement)', '重力势能变化（Supplement）', '\\Delta E_p=mg\\Delta h'),
      ],
    },
    {
      heading: text('2. Work done', '2. 功'),
      paragraphs: [
        text(
          'Mechanical or electrical work done equals the energy transferred. For a constant force acting along the direction of movement, mechanical work is force multiplied by distance moved.',
          '机械功或电功等于所转移的能量。恒力沿运动方向作用时，机械功等于力与沿力方向移动距离的乘积。',
        ),
      ],
      formulas: [formula('Mechanical work', '机械功', 'W=Fd=\\Delta E')],
    },
    {
      heading: text('3. Energy resources', '3. 能源'),
      paragraphs: [
        text(
          'Useful energy or electrical power may be obtained from fossil fuels, biofuels, waves, tides, hydroelectric reservoirs, geothermal resources, nuclear fuel, solar cells, solar heating and wind. Where relevant, the chain includes a boiler, turbine and generator.',
          '可从化石燃料、生物燃料、波浪、潮汐、水力发电、地热、核燃料、太阳能电池、太阳能加热和风能获得有用能量或电功率。适用时，转换链包含锅炉、涡轮机和发电机。',
        ),
        text(
          'Each resource is compared by renewability, availability, reliability, scale and environmental impact. Radiation from the Sun is the main source of most resources except geothermal, nuclear and tidal energy. The Sun releases energy by nuclear fusion, and controlled fusion is being researched for large-scale electricity generation.',
          '各种能源需从可再生性、可获得性、可靠性、规模和环境影响比较。除地热、核能和潮汐能外，大多数能源的主要来源是太阳辐射。太阳通过核聚变释放能量，人类正在研究利用可控核聚变大规模发电。',
        ),
      ],
    },
    {
      heading: text('4. Efficiency', '4. 效率'),
      paragraphs: [
        text(
          'Efficiency is the fraction of the input energy or power that becomes useful output. It cannot exceed $1$ or $100\\%$. The remainder is transferred to less useful stores, often as internal energy of the surroundings.',
          '效率是输入能量或功率中转化为有用输出的比例，不可能超过 $1$ 或 $100\\%$。其余能量通常转移为环境的内能等较少利用的形式。',
        ),
      ],
      formulas: [
        formula('Energy efficiency', '能量效率', '\\eta=\\frac{E_{\\mathrm{useful}}}{E_{\\mathrm{input}}}\\times100\\%'),
        formula('Power efficiency', '功率效率', '\\eta=\\frac{P_{\\mathrm{useful}}}{P_{\\mathrm{input}}}\\times100\\%'),
      ],
    },
    {
      heading: text('5. Power', '5. 功率'),
      paragraphs: [
        text(
          'Power is the rate of doing work or the rate of transferring energy. Two devices may transfer the same energy but the device that does so in less time has greater power.',
          '功率是做功速率或能量转移速率。两个装置可以转移相同能量，但用时更短的装置功率更大。',
        ),
      ],
      formulas: [
        formula('Power from work', '由功计算功率', 'P=\\frac{W}{t}'),
        formula('Power from energy transfer', '由能量转移计算功率', 'P=\\frac{\\Delta E}{t}'),
      ],
    },
  ],
};

const pressureLesson: CurriculumLesson = {
  title: text('1.8 Pressure', '1.8 压强'),
  description: text(
    'Pressure on surfaces and the variation of liquid pressure with depth and density.',
    '固体表面压强，以及液体压强随深度和密度的变化。',
  ),
  sections: [
    {
      heading: text('1. Pressure on a surface', '1. 表面压强'),
      paragraphs: [
        text(
          'Pressure is force per unit area. For the same area, a larger perpendicular force produces greater pressure. For the same force, a smaller contact area produces greater pressure.',
          '压强是单位面积上的力。面积相同时，垂直作用力越大，压强越大；力相同时，接触面积越小，压强越大。',
        ),
      ],
      formulas: [formula('Pressure', '压强', 'p=\\frac{F}{A}')],
    },
    {
      heading: text('2. Pressure beneath a liquid surface', '2. 液面下的压强'),
      paragraphs: [
        text(
          'Liquid pressure increases with depth because a deeper point supports a taller column of liquid. At the same depth, a denser liquid produces a greater pressure increase.',
          '液体压强随深度增加，因为更深处承受更高液柱的重量。同一深度处，密度更大的液体产生更大的压强增量。',
        ),
        text(
          'The equation gives the change in pressure between two depths in a liquid of uniform density. It does not by itself include atmospheric pressure acting on the surface.',
          '该公式给出均匀密度液体中两个深度之间的压强变化，本身不包含液面上的大气压强。',
        ),
      ],
      formulas: [formula('Liquid pressure change (Supplement)', '液体压强变化（Supplement）', '\\Delta p=\\rho g\\Delta h')],
    },
  ],
};

export const igcseUnit1Lessons: CurriculumLesson[] = [
  physicalQuantitiesLesson,
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
            'For an object at rest relative to the observer, mass measures the quantity of matter. It is measured in kilograms and remains constant when location changes. Weight is the gravitational force acting on an object with mass. It is measured in newtons and changes with gravitational field strength.',
            '对于相对观察者静止的物体，质量表示物质的多少，以千克为单位，地点改变时保持不变。重量是引力对有质量物体产生的力，以牛顿为单位，并随重力场强改变。',
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
          'Gravitational field strength is force per unit mass and is numerically equivalent to free-fall acceleration.',
          '重力场强是单位质量所受的力，在数值上等于自由落体加速度。',
        ),
      },
      {
        heading: text('2. Comparing masses and weights', '2. 比较质量与重量'),
        paragraphs: [
          text(
            'A balance compares two weights in the same gravitational field. Because both sides experience the same value of $g$, equal weights imply equal masses. A spring balance measures force directly and therefore measures weight.',
            '天平在同一重力场中比较两个物体的重量。由于两侧的 $g$ 相同，重量相等意味着质量相等。弹簧测力计直接测量力，因此测得的是重量。',
          ),
          text(
            'Weight can be described as the effect of a gravitational field on a mass. Changing the field changes weight without changing mass.',
            '重量可描述为重力场作用于质量所产生的效果。重力场改变会改变重量，但不会改变质量。',
          ),
        ],
      },
    ],
  },
  densityLesson,
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
          formula('Resultant force as momentum rate', '合力是动量变化率', '\\vec F_{\\mathrm{resultant}}=\\frac{\\Delta\\vec p}{\\Delta t}'),
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
        heading: text('2. Resultant force and momentum change', '2. 合力与动量变化'),
        paragraphs: [
          text(
            'Resultant force is the change in momentum per unit time. For the same momentum change, a longer interaction time produces a smaller average resultant force; this is the principle used by airbags, crumple zones and padded landing surfaces.',
            '合力等于单位时间内的动量变化量。在动量变化相同的情况下，作用时间越长，平均合力越小；安全气囊、汽车缓冲区和软质落地垫都利用了这一原理。',
          ),
        ],
        formulas: [
          formula('Resultant force', '合力', '\\vec F_{\\mathrm{resultant}}=\\frac{\\Delta\\vec p}{\\Delta t}'),
        ],
      },
      {
        heading: text('3. Common errors', '3. 常见错误'),
        bullets: [
          text('Momentum is a vector; opposite directions require opposite signs.', '动量是矢量；相反方向需要使用相反符号。'),
          text('Momentum conservation applies to the chosen system when external impulse is negligible.', '只有当所选系统受到的外冲量可忽略时，才能使用动量守恒。'),
          text('Kinetic energy does not have to be conserved in an inelastic collision.', '非弹性碰撞中动能不一定守恒。'),
        ],
      },
    ],
  },
  energyWorkPowerLesson,
  pressureLesson,
];
