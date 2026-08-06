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
          'An astronaut is just as difficult to accelerate on the Moon as on Earth, but a force meter gives a smaller reading. The unchanged property is mass; the changing force is weight.',
          '宇航员在月球上和在地球上一样难以被加速，但测力计在月球上的读数更小。不变的是质量，改变的是重量。',
        ),
      ],
    },
    {
      heading: text('1. Mass and weight are different quantities', '1. 质量与重量是不同的物理量'),
      paragraphs: [
        text(
          'For an object at rest relative to the observer, mass is a measure of the quantity of matter. Mass is measured in kilograms. Weight is the gravitational force acting on an object with mass and is measured in newtons.',
          '对于相对观察者静止的物体，质量表示物质的多少，以千克为单位。重量是重力场对有质量物体产生的力，以牛顿为单位。',
        ),
        text(
          'Gravitational field strength is force per unit mass. Near Earth, $g\approx9.8\,\mathrm{N\,kg^{-1}}$. It is numerically equivalent to the free-fall acceleration, whose unit is $\mathrm{m\,s^{-2}}$.',
          '重力场强是单位质量所受的力。地球表面附近 $g\approx9.8\,\mathrm{N\,kg^{-1}}$。其数值等于自由落体加速度，后者单位为 $\mathrm{m\,s^{-2}}$。',
        ),
      ],
      bullets: [
        text('Mass: symbol $m$; unit $\mathrm{kg}$; unchanged when the gravitational field changes.', '质量：符号 $m$；单位 $\mathrm{kg}$；重力场改变时不变。'),
        text('Weight: symbol $W$; unit $\mathrm{N}$; changes when gravitational field strength changes.', '重量：符号 $W$；单位 $\mathrm{N}$；随重力场强变化。'),
      ],
      formulas: [
        formula('Weight', '重量', 'W=mg'),
        formula('Gravitational field strength', '重力场强', 'g=\\frac{W}{m}'),
      ],
      takeaway: text(
        'Changing planet changes $W$ but not $m$.',
        '更换星球会改变 $W$，但不会改变 $m$。',
      ),
      classroomQuestions: [
        {
          id: 'igcse-u1-student-mass-weight-calculation',
          title: text('Practice: weight in a gravitational field', '练习：重力场中的重量'),
          prompt: text(
            'A probe of mass $12\,\mathrm{kg}$ is on a planet where $g=4.0\,\mathrm{N\,kg^{-1}}$. What is its weight?',
            '一个质量为 $12\,\mathrm{kg}$ 的探测器位于 $g=4.0\,\mathrm{N\,kg^{-1}}$ 的行星上。它的重量是多少？',
          ),
          choices: [
            { label: 'A', text: text('$3.0\,\mathrm{N}$', '$3.0\,\mathrm{N}$') },
            { label: 'B', text: text('$16\,\mathrm{N}$', '$16\,\mathrm{N}$') },
            { label: 'C', text: text('$48\,\mathrm{N}$', '$48\,\mathrm{N}$') },
            { label: 'D', text: text('$48\,\mathrm{kg}$', '$48\,\mathrm{kg}$') },
          ],
          correctAnswer: 'C',
          feedback: text(
            '$W=mg=12\times4.0=48\,\mathrm{N}$. Weight is a force, so its unit is the newton.',
            '$W=mg=12\times4.0=48\,\mathrm{N}$。重量是力，因此单位是牛顿。',
          ),
        },
      ],
    },
    {
      heading: text('2. Comparing mass and weight', '2. 比较质量与重量'),
      paragraphs: [
        text(
          'A balance compares the weights of two objects in the same gravitational field. The common factor $g$ cancels, so the comparison also gives their mass ratio. A force meter or spring balance measures force directly and therefore measures weight.',
          '天平比较同一重力场中两个物体的重量。共同因子 $g$ 会约去，因此也能比较质量。测力计或弹簧测力计直接测量力，因此测量的是重量。',
        ),
      ],
      takeaway: text(
        'Use a balance to compare masses and a force meter to measure weight.',
        '用天平比较质量，用测力计测量重量。',
      ),
    },
    {
      heading: text('3. Common errors', '3. 常见错误'),
      bullets: [
        text('Do not give mass in newtons or weight in kilograms.', '不要用牛顿表示质量，也不要用千克表示重量。'),
        text('A smaller value of $g$ gives smaller weight, not smaller mass.', '$g$ 较小会使重量较小，而不是使质量较小。'),
        text('$\mathrm{N\,kg^{-1}}$ describes field strength; $\mathrm{m\,s^{-2}}$ describes acceleration, although their numerical values are equal.', '$\mathrm{N\,kg^{-1}}$ 描述重力场强，$\mathrm{m\,s^{-2}}$ 描述加速度，二者数值相等但含义不同。'),
      ],
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
          'Collision forces may be large and complicated, but total momentum remains predictable when the external impulse on the chosen system is negligible.',
          '碰撞力可能很大且变化复杂，但当所选系统受到的外冲量可忽略时，总动量仍可预测。',
        ),
      ],
    },
    {
      heading: text('1. Momentum, direction and impulse', '1. 动量、方向与冲量'),
      paragraphs: [
        text(
          'Momentum is mass multiplied by velocity. Because velocity has direction, momentum is a vector. In one dimension, choose one positive direction and give motion in the opposite direction a negative sign.',
          '动量等于质量乘以速度。由于速度有方向，动量也是矢量。一维问题中先规定一个正方向，反向运动取负号。',
        ),
        text(
          'Impulse is force multiplied by the time for which it acts and equals the change in momentum. Resultant force is the change in momentum per unit time. For the same momentum change, increasing the stopping time reduces the average resultant force.',
          '冲量等于力与作用时间的乘积，也等于动量变化。合力等于单位时间内的动量变化。动量变化相同时，延长停止时间会减小平均合力。',
        ),
      ],
      formulas: [
        formula('Momentum', '动量', '\\vec p=m\\vec v'),
        formula('Impulse', '冲量', '\\vec J=\\vec F\\Delta t=\\Delta\\vec p'),
        formula('Resultant force', '合力', '\\vec F_{\\mathrm{resultant}}=\\frac{\\Delta\\vec p}{\\Delta t}'),
      ],
      takeaway: text('Momentum has unit $\mathrm{kg\,m\,s^{-1}}$; impulse has unit $\mathrm{N\,s}$ and the same dimensions.', '动量单位为 $\mathrm{kg\,m\,s^{-1}}$；冲量单位为 $\mathrm{N\,s}$，二者量纲相同。'),
    },
    {
      heading: text('2. Conservation of momentum', '2. 动量守恒'),
      paragraphs: [
        text(
          'For a system with negligible external impulse, total momentum before an interaction equals total momentum after it. Use one sign convention for every velocity, add the momentum of every object, and conserve the total—not the momentum of each object separately.',
          '若系统所受外冲量可忽略，相互作用前后的总动量相等。所有速度必须使用同一正负号约定，并把所有物体的动量相加；守恒的是总动量，而不是每个物体各自的动量。',
        ),
      ],
      formulas: [
        formula('Momentum conservation', '动量守恒', '\\sum\\vec p_{\\mathrm{before}}=\\sum\\vec p_{\\mathrm{after}}'),
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
    {
      heading: text('3. Common errors and scope', '3. 常见错误与范围'),
      bullets: [
        text('Opposite directions require opposite signs.', '相反方向必须使用相反符号。'),
        text('Momentum conservation applies to a chosen system only when its external impulse is negligible.', '只有所选系统受到的外冲量可忽略时，才能使用动量守恒。'),
        text('Kinetic energy need not be conserved when objects stick together.', '物体粘在一起时，动能不一定守恒。'),
        text('The syllabus requires simple one-dimensional problems; coefficient of restitution is not required.', '大纲要求简单的一维问题，不要求恢复系数。'),
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

const motionStudentLesson: CurriculumLesson = {
  title: text('1.2 Motion', '1.2 运动'),
  description: text(
    'Speed, velocity, acceleration, motion graphs and falling with resistance.',
    '速率、速度、加速度、运动图像，以及有阻力的下落运动。',
  ),
  sections: [
    {
      heading: text('0. Describe motion so another person can reconstruct it', '0. 让他人能够复原运动过程'),
      paragraphs: [
        text(
          'Saying that a car is “moving fast” is incomplete. A useful description gives how far it travels, how long it takes, its direction and how its velocity changes.',
          '只说汽车“开得很快”并不完整。有效的运动描述需要说明路程、时间、方向以及速度如何变化。',
        ),
      ],
    },
    {
      heading: text('1. Speed, velocity and average speed', '1. 速率、速度与平均速率'),
      paragraphs: [
        text(
          'Speed is distance travelled per unit time. Velocity is speed in a stated direction. Average speed uses total distance and total time, including any stops.',
          '速率是单位时间内通过的路程。速度是带方向的速率。平均速率使用总路程除以总时间，总时间包括停留时间。',
        ),
      ],
      formulas: [
        formula('Speed', '速率', 'v=\\frac{s}{t}'),
        formula('Average speed', '平均速率', 'v_{\\mathrm{avg}}=\\frac{\\text{total distance}}{\\text{total time}}'),
      ],
    },
    {
      heading: text('2. Distance–time and speed–time graphs', '2. 路程—时间图与速率—时间图'),
      bullets: [
        text('Distance–time gradient gives speed; a horizontal section means rest.', '路程—时间图斜率表示速率；水平线段表示静止。'),
        text('Speed–time gradient gives acceleration; a horizontal section above zero means constant speed.', '速率—时间图斜率表示加速度；零以上的水平线段表示匀速。'),
        text('Area under a speed–time graph gives distance for constant speed or constant acceleration.', '对于匀速或匀加速运动，速率—时间图下方面积表示路程。'),
        text('A straight sloping speed–time line shows constant acceleration; a curve shows changing acceleration.', '倾斜直线表示匀加速；曲线表示加速度变化。'),
      ],
    },
    {
      heading: text('3. Acceleration and deceleration (Supplement)', '3. 加速度与减速度（Supplement）'),
      paragraphs: [
        text(
          'Acceleration is change in velocity per unit time. A deceleration is a negative acceleration relative to the chosen positive direction. Negative acceleration does not always mean slowing down: compare the signs of velocity and acceleration.',
          '加速度是单位时间内的速度变化。相对于所选正方向，减速度是负加速度。负加速度并不总表示变慢；应比较速度与加速度的符号。',
        ),
      ],
      formulas: [
        formula('Acceleration', '加速度', 'a=\\frac{\\Delta v}{\\Delta t}'),
      ],
      takeaway: text('Same signs for $v$ and $a$ mean speeding up; opposite signs mean slowing down.', '$v$ 与 $a$ 同号表示速率增大，异号表示速率减小。'),
    },
    {
      heading: text('4. Free fall and terminal velocity', '4. 自由落体与终端速度'),
      paragraphs: [
        text(
          'Near Earth, free-fall acceleration is approximately constant at $g\\approx9.8\\,\\mathrm{m\\,s^{-2}}$. Without resistance, speed increases at a constant rate. With air or liquid resistance, drag increases as speed increases, so acceleration decreases until drag equals weight. The resultant force and acceleration then become zero and the object moves at terminal velocity.',
          '地球表面附近，自由落体加速度近似恒定，$g\\approx9.8\\,\\mathrm{m\\,s^{-2}}$。无阻力时，速率以恒定速率增加。有空气或液体阻力时，阻力随速率增加，使加速度逐渐减小；当阻力等于重量时，合力和加速度为零，物体以终端速度运动。',
        ),
      ],
    },
    {
      heading: text('5. Common errors', '5. 常见错误'),
      bullets: [
        text('Average speed is not usually the arithmetic mean of two speeds.', '平均速率通常不是两个速率的算术平均。'),
        text('Do not confuse graph gradient with graph height or graph area.', '不要混淆图像斜率、纵坐标高度和图下方面积。'),
        text('Constant speed and constant acceleration describe different graph features.', '匀速与匀加速对应不同的图像特征。'),
        text('Terminal velocity means constant non-zero velocity because resultant force is zero.', '终端速度是合力为零时的恒定非零速度。'),
      ],
    },
  ],
};

const motionLesson: CurriculumLesson = {
  title: text('1.2 Motion', '1.2 运动'),
  description: text(
    'Complete Core and Supplement motion content: definitions, calculations, graphs, free fall and terminal velocity.',
    '完整覆盖 Core 与 Supplement：运动定义、计算、图像、自由落体与终端速度。',
  ),
  sections: [
    {
      heading: text('0. From a vague description to a measurable motion model', '0. 从模糊描述到可测量的运动模型'),
      paragraphs: [
        text(
          'A runner, a braking car and a falling parachutist can all be described by distance, time, direction and change of velocity. The purpose of this unit is to translate between words, data, equations and graphs without changing the physical story.',
          '跑步者、制动汽车和下落的跳伞者都可以用路程、时间、方向和速度变化来描述。本节目标是在文字、数据、公式和图像之间转换，同时保持物理过程一致。',
        ),
      ],
    },
    {
      heading: text('1. Speed, velocity and average speed', '1. 速率、速度与平均速率'),
      paragraphs: [
        text(
          'Speed is distance travelled per unit time and is a scalar. Velocity is speed in a given direction. Average speed is total distance divided by total elapsed time, so pauses and return journeys must be included correctly.',
          '速率是单位时间内通过的路程，是标量。速度是带方向的速率。平均速率等于总路程除以总经过时间，因此停留和往返过程必须正确计入。',
        ),
      ],
      formulas: [
        formula('Speed', '速率', 'v=\\frac{s}{t}'),
        formula('Average speed', '平均速率', 'v_{\\mathrm{avg}}=\\frac{\\text{total distance travelled}}{\\text{total time taken}}'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-average-speed',
          mode: 'written',
          title: text('Practice: total distance and total time', '练习：总路程与总时间'),
          prompt: text(
            'A cyclist travels $600\\,\\mathrm{m}$ in $40\\,\\mathrm{s}$, waits for $20\\,\\mathrm{s}$, then travels another $300\\,\\mathrm{m}$ in $30\\,\\mathrm{s}$. Calculate the average speed for the whole journey.',
            '骑车者先在 $40\\,\\mathrm{s}$ 内行驶 $600\\,\\mathrm{m}$，停留 $20\\,\\mathrm{s}$，再在 $30\\,\\mathrm{s}$ 内行驶 $300\\,\\mathrm{m}$。计算全程平均速率。',
          ),
          sampleAnswer: text(
            '$v_{\\mathrm{avg}}=(600+300)/(40+20+30)=10\\,\\mathrm{m\\,s^{-1}}$. The waiting time is part of the total elapsed time.',
            '$v_{\\mathrm{avg}}=(600+300)/(40+20+30)=10\\,\\mathrm{m\\,s^{-1}}$。停留时间属于总经过时间。',
          ),
        },
      ],
    },
    {
      heading: text('2. Reading and constructing motion graphs', '2. 读取与绘制运动图像'),
      paragraphs: [
        text(
          'On a distance–time graph, gradient is speed. A horizontal section means rest, a straight non-horizontal section means constant speed, and a changing gradient means changing speed.',
          '路程—时间图中，斜率表示速率。水平线段表示静止，非水平直线表示匀速，斜率变化表示速率变化。',
        ),
        text(
          'On a speed–time graph, the height is speed, the gradient is acceleration, and the area beneath the graph is distance for constant speed or constant acceleration. A horizontal line above zero is constant speed; a straight slope is constant acceleration; a curved slope is changing acceleration.',
          '速率—时间图中，纵坐标表示速率，斜率表示加速度；对于匀速或匀加速运动，图下方面积表示路程。零以上水平线表示匀速，倾斜直线表示匀加速，曲线表示加速度变化。',
        ),
      ],
      formulas: [
        formula('Speed from distance–time gradient', '由路程—时间图斜率求速率', 'v=\\frac{\\Delta s}{\\Delta t}'),
        formula('Acceleration from speed–time gradient', '由速率—时间图斜率求加速度', 'a=\\frac{\\Delta v}{\\Delta t}'),
        formula('Distance from speed–time area', '由速率—时间图面积求路程', 's=\\text{area under the speed–time graph}'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-motion-graph',
          mode: 'written',
          title: text('Practice: gradient and area', '练习：斜率与面积'),
          prompt: text(
            'A speed–time graph rises uniformly from $0$ to $12\\,\\mathrm{m\\,s^{-1}}$ in $4.0\\,\\mathrm{s}$ and then remains at $12\\,\\mathrm{m\\,s^{-1}}$ for $6.0\\,\\mathrm{s}$. Calculate the acceleration and total distance.',
            '速率—时间图在 $4.0\\,\\mathrm{s}$ 内从 $0$ 匀速增加到 $12\\,\\mathrm{m\\,s^{-1}}$，随后以 $12\\,\\mathrm{m\\,s^{-1}}$ 保持 $6.0\\,\\mathrm{s}$。计算加速度和总路程。',
          ),
          sampleAnswer: text(
            '$a=12/4.0=3.0\\,\\mathrm{m\\,s^{-2}}$. Distance is the triangle plus rectangle: $\\frac12(4.0)(12)+(6.0)(12)=96\\,\\mathrm{m}$.',
            '$a=12/4.0=3.0\\,\\mathrm{m\\,s^{-2}}$。路程等于三角形与矩形面积之和：$\\frac12(4.0)(12)+(6.0)(12)=96\\,\\mathrm{m}$。',
          ),
        },
      ],
    },
    {
      heading: text('3. Acceleration, deceleration and signs (Supplement)', '3. 加速度、减速度与符号（Supplement）'),
      paragraphs: [
        text(
          'Acceleration is change in velocity per unit time. Deceleration is a negative acceleration relative to the chosen positive direction. Whether an object speeds up or slows down is decided by comparing the signs of velocity and acceleration: the same sign increases speed, opposite signs decrease speed.',
          '加速度是单位时间内的速度变化。相对于所选正方向，减速度是负加速度。物体变快还是变慢，应比较速度与加速度的符号：同号速率增大，异号速率减小。',
        ),
      ],
      formulas: [formula('Acceleration', '加速度', 'a=\\frac{\\Delta v}{\\Delta t}')],
    },
    {
      heading: text('4. Free fall with and without resistance', '4. 有阻力与无阻力的自由落体'),
      paragraphs: [
        text(
          'Near Earth, the acceleration of free fall is approximately constant at $g\\approx9.8\\,\\mathrm{m\\,s^{-2}}$. Without air or liquid resistance, velocity changes uniformly. With resistance, drag increases with speed, reducing the resultant downward force and acceleration.',
          '地球表面附近，自由落体加速度近似恒定，$g\\approx9.8\\,\\mathrm{m\\,s^{-2}}$。没有空气或液体阻力时，速度均匀变化；有阻力时，阻力随速率增加，使向下合力和加速度减小。',
        ),
        text(
          'Terminal velocity occurs when drag equals weight. The resultant force and acceleration are then zero, so the object continues at constant non-zero velocity. This sequence should be connected to both force balance and the changing gradient of a speed–time graph.',
          '当阻力等于重量时达到终端速度。此时合力和加速度为零，物体以恒定非零速度继续运动。应把这一过程同时与受力平衡和速率—时间图斜率变化联系起来。',
        ),
      ],
    },
    {
      heading: text('5. Decision rules and scope boundaries', '5. 判断规则与范围边界'),
      bullets: [
        text('Average speed always uses total distance and total elapsed time.', '平均速率始终使用总路程和总经过时间。'),
        text('Distance–time gradient gives speed; speed–time gradient gives acceleration; speed–time area gives distance.', '路程—时间图斜率给速率；速率—时间图斜率给加速度；速率—时间图面积给路程。'),
        text('A negative acceleration is defined by the coordinate direction, not automatically by whether the object slows down.', '负加速度由坐标正方向定义，并不自动表示物体变慢。'),
        text('Terminal velocity is constant velocity caused by zero resultant force, not the absence of forces.', '终端速度是合力为零所产生的恒定速度，不是没有力作用。'),
        text('The syllabus requires qualitative resistance and terminal-velocity reasoning; a detailed drag equation is outside scope.', '大纲要求定性分析阻力与终端速度，不要求具体阻力公式。'),
      ],
    },
  ],
  studentVersion: motionStudentLesson,
};

const densityStudentLesson: CurriculumLesson = {
  title: text('1.4 Density', '1.4 密度'),
  description: text(
    'Mass per unit volume, density measurements and density-based floating decisions.',
    '单位体积质量、密度测量，以及利用密度判断浮沉。',
  ),
  sections: [
    {
      heading: text('0. Size alone does not tell us how heavy an object is', '0. 只看大小不能判断物体有多重'),
      paragraphs: [
        text(
          'A small metal block can have more mass than a much larger foam block. Density compares mass with the volume that contains it.',
          '一小块金属的质量可能比一大块泡沫还大。密度把质量与容纳该质量的体积联系起来。',
        ),
      ],
    },
    {
      heading: text('1. Definition, equation and units', '1. 定义、公式与单位'),
      paragraphs: [
        text(
          'Density is mass per unit volume. Use compatible units before substitution: $\mathrm{kg}$ with $\mathrm{m^3}$, or $\mathrm{g}$ with $\mathrm{cm^3}$.',
          '密度是单位体积的质量。代入公式前必须使用相容单位：$\mathrm{kg}$ 配 $\mathrm{m^3}$，或 $\mathrm{g}$ 配 $\mathrm{cm^3}$。',
        ),
      ],
      formulas: [
        formula('Density', '密度', '\\rho=\\frac{m}{V}'),
        formula('Mass', '质量', 'm=\\rho V'),
        formula('Volume', '体积', 'V=\\frac{m}{\\rho}'),
        formula('Unit conversion', '单位换算', '1\\,\\mathrm{g\\,cm^{-3}}=1000\\,\\mathrm{kg\\,m^{-3}}'),
      ],
    },
    {
      heading: text('2. Three required measurement methods', '2. 三种必须掌握的测量方法'),
      bullets: [
        text('Liquid: mass the empty container, add a measured volume of liquid, mass again, and subtract the container mass.', '液体：先测空容器质量，再加入已知体积的液体测总质量，最后减去容器质量。'),
        text('Regular solid: measure mass and the dimensions needed to calculate its geometrical volume.', '规则固体：测量质量及计算几何体积所需的尺寸。'),
        text('Irregular sinking solid: measure mass, fully submerge it, and use $V=V_{\\mathrm{final}}-V_{\\mathrm{initial}}$.', '会下沉的不规则固体：测量质量，将其完全浸没，并使用 $V=V_{\\mathrm{final}}-V_{\\mathrm{initial}}$。'),
      ],
      takeaway: text('For every method: measure $m$, determine $V$, then calculate $\\rho=m/V$.', '所有方法都遵循：测量 $m$，确定 $V$，再计算 $\\rho=m/V$。'),
    },
    {
      heading: text('3. Floating and liquid layers', '3. 浮沉与液体分层'),
      paragraphs: [
        text(
          'An object floats if its average density is less than the liquid density and sinks if it is greater. If two liquids do not mix, the less dense liquid forms the upper layer.',
          '物体平均密度小于液体密度时漂浮，大于液体密度时下沉。若两种液体互不相溶，密度较小的液体位于上层。',
        ),
      ],
      bullets: [
        text('Do not confuse greater mass with greater density.', '不要把质量更大等同于密度更大。'),
        text('Displacement volume is the change in reading, not the final reading.', '排水体积是读数变化量，不是最终读数。'),
        text('Remove the container mass and avoid trapped air or incomplete immersion.', '要扣除容器质量，并避免气泡和未完全浸没。'),
      ],
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
      heading: text('0. Why density is needed', '0. 为什么需要密度'),
      paragraphs: [
        text(
          'A small metal block can have more mass than a much larger foam block, and oil can form a layer above water. Mass alone and volume alone cannot explain either observation; density compares both.',
          '一小块金属的质量可能比一大块泡沫还大，油也会浮在水面上。只看质量或只看体积都不能解释这些现象，密度把二者联系起来。',
        ),
      ],
      takeaway: text('Density is a property that allows samples of different sizes to be compared.', '密度使不同大小的样品可以进行比较。'),
    },
    {
      heading: text('1. Definition, rearrangement and unit control', '1. 定义、公式变形与单位控制'),
      paragraphs: [
        text(
          'Density is mass per unit volume. Rearrange the relationship before substituting, and use compatible units: $\\mathrm{kg}$ with $\\mathrm{m^3}$, or $\\mathrm{g}$ with $\\mathrm{cm^3}$.',
          '密度是单位体积的质量。代入前先完成公式变形，并使用相容单位：$\\mathrm{kg}$ 配 $\\mathrm{m^3}$，或 $\\mathrm{g}$ 配 $\\mathrm{cm^3}$。',
        ),
        text(
          'Because $1\\,\\mathrm{m}=100\\,\\mathrm{cm}$, cubing the length conversion gives $1\\,\\mathrm{m^3}=10^6\\,\\mathrm{cm^3}$. This leads to $1\\,\\mathrm{g\\,cm^{-3}}=1000\\,\\mathrm{kg\\,m^{-3}}$.',
          '由于 $1\\,\\mathrm{m}=100\\,\\mathrm{cm}$，长度换算立方后得到 $1\\,\\mathrm{m^3}=10^6\\,\\mathrm{cm^3}$，因此 $1\\,\\mathrm{g\\,cm^{-3}}=1000\\,\\mathrm{kg\\,m^{-3}}$。',
        ),
      ],
      formulas: [
        formula('Density', '密度', '\\rho=\\frac{m}{V}'),
        formula('Mass', '质量', 'm=\\rho V'),
        formula('Volume', '体积', 'V=\\frac{m}{\\rho}'),
        formula('Unit conversion', '单位换算', '1\\,\\mathrm{g\\,cm^{-3}}=1000\\,\\mathrm{kg\\,m^{-3}}'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-density-units',
          title: text('Practice: density and unit control', '练习：密度与单位控制'),
          prompt: text(
            'A block has mass $540\\,\\mathrm{g}$ and volume $200\\,\\mathrm{cm^3}$. Calculate its density in both $\\mathrm{g\\,cm^{-3}}$ and $\\mathrm{kg\\,m^{-3}}$.',
            '一个物块质量为 $540\\,\\mathrm{g}$，体积为 $200\\,\\mathrm{cm^3}$。分别用 $\\mathrm{g\\,cm^{-3}}$ 和 $\\mathrm{kg\\,m^{-3}}$ 表示其密度。',
          ),
          sampleAnswer: text(
            '$\\rho=540/200=2.70\\,\\mathrm{g\\,cm^{-3}}=2700\\,\\mathrm{kg\\,m^{-3}}$.',
            '$\\rho=540/200=2.70\\,\\mathrm{g\\,cm^{-3}}=2700\\,\\mathrm{kg\\,m^{-3}}$。',
          ),
          explanation: text(
            'The numerical conversion from $\\mathrm{g\\,cm^{-3}}$ to $\\mathrm{kg\\,m^{-3}}$ multiplies by $1000$.',
            '从 $\\mathrm{g\\,cm^{-3}}$ 换算到 $\\mathrm{kg\\,m^{-3}}$，数值乘以 $1000$。',
          ),
        },
      ],
    },
    {
      heading: text('2. Determining density experimentally', '2. 实验测定密度'),
      paragraphs: [
        text(
          'Every method follows the same chain: measure mass, determine volume, then divide. The experimental difference is how volume is obtained.',
          '所有方法都遵循同一条逻辑链：测质量、确定体积、再相除。不同实验的关键区别在于如何获得体积。',
        ),
      ],
      bullets: [
        text('Liquid: mass an empty container, measure a liquid volume at eye level, mass the container plus liquid, and subtract the tare mass.', '液体：测空容器质量，平视读取液体体积，再测容器与液体总质量，并减去空容器质量。'),
        text('Regular solid: measure mass and all dimensions needed for the correct geometrical volume formula; repeat dimensions if the object is not perfectly uniform.', '规则固体：测质量并测量正确几何体积公式所需的全部尺寸；若物体不完全均匀，应重复测量尺寸。'),
        text('Irregular solid that sinks: record initial liquid volume, fully submerge the object, record final volume, and use $V=V_{\\mathrm{final}}-V_{\\mathrm{initial}}$.', '会下沉的不规则固体：记录初始液体体积，将物体完全浸没，记录最终体积，并使用 $V=V_{\\mathrm{final}}-V_{\\mathrm{initial}}$。'),
        text('Improve validity by avoiding trapped air, splashing, parallax, incomplete immersion and water left on the outside of equipment.', '避免气泡、液体溅出、视差、未完全浸没，以及器材外壁残留液体，以提高实验有效性。'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-density-method',
          mode: 'written',
          title: text('Practice: irregular-solid density method', '练习：不规则固体密度实验'),
          prompt: text(
            'Describe how to determine the density of a small irregular stone that sinks in water. State the measurements, calculation and two precautions.',
            '描述如何测定一块会在水中下沉的小型不规则石块的密度。写出测量量、计算方法和两项注意事项。',
          ),
          sampleAnswer: text(
            'Measure mass $m$ with a balance. Record $V_i$ in a measuring cylinder, fully submerge the stone and record $V_f$. Then $V=V_f-V_i$ and $\\rho=m/V$. Read at eye level and ensure full immersion with no trapped bubbles.',
            '用天平测质量 $m$。记录量筒初始读数 $V_i$，将石块完全浸没后记录 $V_f$。则 $V=V_f-V_i$，$\\rho=m/V$。应平视读数，并确保完全浸没且无气泡。',
          ),
        },
      ],
    },
    {
      heading: text('3. Floating and layering', '3. 浮沉与液体分层'),
      paragraphs: [
        text(
          'An object floats when its average density is less than the liquid density, is neutrally suspended when the densities are equal, and sinks when its density is greater. Hollow objects must be judged by their overall average density.',
          '物体平均密度小于液体密度时漂浮，二者相等时可悬浮，大于液体密度时下沉。空心物体应使用整体平均密度判断。',
        ),
        text(
          'For two immiscible liquids, the less dense liquid forms the upper layer and the denser liquid forms the lower layer. The condition that they do not mix is essential.',
          '对于两种互不相溶的液体，密度较小者位于上层，密度较大者位于下层。“互不相溶”是这一判断成立的必要条件。',
        ),
      ],
    },
    {
      heading: text('4. Decision rules and common errors', '4. 判断规则与常见错误'),
      bullets: [
        text('Greater mass does not necessarily mean greater density; volume must also be considered.', '质量更大不一定密度更大，还必须考虑体积。'),
        text('Use the displaced-volume change, not the final cylinder reading.', '应使用排水前后的体积变化量，而不是量筒最终读数。'),
        text('Subtract the empty-container mass when measuring a liquid.', '测液体密度时必须扣除空容器质量。'),
        text('Density data alone can decide float or sink; this subsection does not require an upthrust calculation.', '仅利用密度数据即可判断浮沉；本节不要求计算浮力。'),
      ],
    },
  ],
  studentVersion: densityStudentLesson,
};

const energyWorkPowerStudentLesson: CurriculumLesson = {
  title: text('1.7 Energy, Work and Power', '1.7 能量、功与功率'),
  description: text(
    'Energy stores and transfer pathways, conservation, work, resources, efficiency and power.',
    '能量储存与转移路径、能量守恒、功、能源、效率与功率。',
  ),
  sections: [
    {
      heading: text('0. Track energy through a change', '0. 追踪变化过程中的能量'),
      paragraphs: [
        text(
          'A falling object, a charging phone and a loudspeaker look different, but each can be described by identifying an initial store, a transfer pathway and a final store.',
          '下落物体、充电手机和扬声器看起来不同，但都可以通过“初始能量储存—转移路径—最终能量储存”来描述。',
        ),
      ],
    },
    {
      heading: text('1. Stores and transfer pathways', '1. 能量储存与转移路径'),
      bullets: [
        text('Stores: kinetic, gravitational potential, chemical, elastic, nuclear, electrostatic and internal (thermal).', '能量储存：动能、重力势能、化学能、弹性势能、核能、静电能和内能（热能）。'),
        text('Pathways: mechanically by forces, electrically by currents, by heating, and by electromagnetic, sound or other waves.', '转移路径：力做机械功、电流做电功、加热，以及电磁波、声波或其他波。'),
      ],
      takeaway: text('A force or a wave is a transfer pathway, not an energy store.', '力或波是能量转移路径，不是能量储存形式。'),
    },
    {
      heading: text('2. Conservation and Sankey diagrams', '2. 能量守恒与桑基图'),
      paragraphs: [
        text(
          'Energy is not created or destroyed. Total input energy equals all useful and dissipated outputs. In a Sankey diagram, arrow widths represent energy amounts, so the outgoing widths must account for the incoming width.',
          '能量不会被创造或消灭。总输入能量等于全部有用输出与耗散输出之和。桑基图中箭头宽度代表能量大小，因此所有输出宽度必须与输入相对应。',
        ),
      ],
    },
    {
      heading: text('3. Kinetic and gravitational potential energy (Supplement)', '3. 动能与重力势能（Supplement）'),
      formulas: [
        formula('Kinetic energy', '动能', 'E_k=\\frac12mv^2'),
        formula('Change in gravitational potential energy', '重力势能变化', '\\Delta E_p=mg\\Delta h'),
      ],
      bullets: [
        text('Doubling speed makes kinetic energy four times as large.', '速率加倍会使动能变为四倍。'),
        text('Use vertical height change $\\Delta h$, not distance along a slope.', '使用竖直高度变化 $\\Delta h$，而不是沿斜面的路程。'),
      ],
    },
    {
      heading: text('4. Work and power', '4. 功与功率'),
      paragraphs: [
        text(
          'Mechanical or electrical work done equals energy transferred. Power describes how quickly work is done or energy is transferred.',
          '机械功或电功等于所转移的能量。功率描述做功或能量转移的快慢。',
        ),
      ],
      formulas: [
        formula('Mechanical work', '机械功', 'W=Fd=\\Delta E', 'Use the distance moved in the force direction.', '使用沿力方向移动的距离。'),
        formula('Power from work', '由功计算功率', 'P=\\frac{W}{t}'),
        formula('Power from energy transfer', '由能量转移计算功率', 'P=\\frac{\\Delta E}{t}'),
      ],
    },
    {
      heading: text('5. Energy resources', '5. 能源'),
      bullets: [
        text('Required resources: fossil fuels, biofuels, waves, tides, hydroelectric reservoirs, geothermal, nuclear fuel, solar cells, solar heating and wind.', '必须掌握的能源：化石燃料、生物燃料、波浪、潮汐、水力、地热、核燃料、太阳能电池、太阳能加热和风能。'),
        text('Compare each by renewability, availability, reliability, scale and environmental impact.', '从可再生性、可获得性、可靠性、规模和环境影响比较各种能源。'),
        text('Solar radiation is the main origin of most resources except geothermal, nuclear and tidal energy. The Sun releases energy by fusion; large-scale controlled-fusion electricity remains a research goal.', '除地热、核能和潮汐能外，大多数能源最终来自太阳辐射。太阳通过核聚变释放能量；大规模可控核聚变发电仍是研究目标。'),
        text('Renewable: biofuels (if sustainably replanted), hydroelectric, wind, tidal, wave, geothermal, solar cells, solar heating. Non-renewable: fossil fuels, nuclear fuel.', '可再生：生物燃料（可持续补种时）、水力、风能、潮汐、波浪、地热、太阳能电池、太阳能集热。不可再生：化石燃料、核燃料。'),
        text('Reliable and dispatchable (output on demand): fossil fuels, hydroelectric with reservoir, geothermal, nuclear. Intermittent (weather-dependent): wind, wave, solar. Predictable but tide-locked: tidal.', '可靠且可按需调度：化石燃料、有水库的水力、地热、核能。间歇性（依赖天气）：风能、波浪、太阳能。可预测但受潮汐锁定：潮汐能。'),
        text('Large-scale base-load capable: fossil fuels, hydroelectric, nuclear, geothermal (locally). Medium scale: wind farms, tidal barrages. Small to medium: solar installations, biofuels, wave devices.', '可大规模基载运行：化石燃料、水力、核能、地热（局部）。中等规模：风电场、潮汐坝。小到中等规模：太阳能装置、生物燃料、波浪能设备。'),
        text('Low or zero operational emissions: hydroelectric, wind, tidal, wave, geothermal, solar cells, solar heating, nuclear. High emissions: fossil fuels. Biofuels are carbon-neutral in principle but land-use change can offset this.', '运行中低排放或零排放：水力、风能、潮汐、波浪、地热、太阳能电池、太阳能集热、核能。高排放：化石燃料。生物燃料理论上碳中和，但土地利用变化可能抵消这一优势。'),
      ],
    },
    {
      heading: text('6. Efficiency and common errors', '6. 效率与常见错误'),
      formulas: [
        formula('Energy efficiency', '能量效率', '\\eta=\\frac{E_{\\mathrm{useful}}}{E_{\\mathrm{input}}}\\times100\\%'),
        formula('Power efficiency', '功率效率', '\\eta=\\frac{P_{\\mathrm{useful}}}{P_{\\mathrm{input}}}\\times100\\%'),
      ],
      bullets: [
        text('Efficiency cannot exceed $1$ or $100\\%$.', '效率不可能超过 $1$ 或 $100\\%$。'),
        text('Energy transferred to the surroundings is dissipated, not destroyed.', '转移到环境中的能量是耗散了，而不是消失了。'),
        text('The joule measures energy or work; the watt measures power.', '焦耳是能量或功的单位；瓦特是功率单位。'),
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
      heading: text('0. One conserved quantity, many visible processes', '0. 一个守恒量，多种可见过程'),
      paragraphs: [
        text(
          'A falling object speeds up, a phone battery charges, and a loudspeaker warms its surroundings. These events look unrelated until each is written as an initial energy store, a transfer pathway, and one or more final stores.',
          '下落物体加速、手机电池充电、扬声器使周围升温，这些现象看似无关，但都可以写成“初始能量储存—转移路径—一个或多个最终能量储存”。',
        ),
      ],
      takeaway: text(
        'Energy accounting explains what changes while preserving the total.',
        '能量核算既解释变化，也保证总量守恒。',
      ),
    },
    {
      heading: text('1. Energy stores and transfer pathways', '1. 能量储存与转移路径'),
      paragraphs: [
        text(
          'Energy may be stored as kinetic, gravitational potential, chemical, elastic, nuclear, electrostatic or internal energy. Energy is transferred mechanically by forces, electrically by currents, by heating, and by electromagnetic, sound or other waves.',
          '能量可储存在动能、重力势能、化学能、弹性势能、核能、静电能和内能中。能量可通过力做机械功、电流做电功、加热，以及电磁波、声波或其他波来转移。',
        ),
        text(
          'A store describes where energy is held; a pathway describes how it moves between stores. For example, a falling object transfers energy mechanically from its gravitational-potential store to its kinetic store, while a heater transfers energy electrically into internal-energy stores.',
          '能量储存描述能量“在哪里”，转移路径描述能量“如何移动”。例如，下落物体通过机械方式把重力势能转移为动能；电热器通过电流把能量转移到内能储存中。',
        ),
      ],
      bullets: [
        text('Stores: kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic, internal (thermal).', '能量储存：动能、重力势能、化学能、弹性（形变）能、核能、静电能、内能（热能）。'),
        text('Pathways: mechanical work, electrical work, heating, electromagnetic waves, sound waves and other waves.', '转移路径：机械功、电功、加热、电磁波、声波和其他波。'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-energy-store-pathway',
          title: text('Practice: store or pathway?', '练习：储存还是路径？'),
          prompt: text(
            'A battery powers a lamp. Which description correctly separates stores and pathways?',
            '电池给灯供电。下列哪项正确区分了能量储存和转移路径？',
          ),
          choices: [
            { label: 'A', text: text('Chemical store → electrically → internal and light-transfer outcomes', '化学能储存 → 通过电流转移 → 内能及光传递结果') },
            { label: 'B', text: text('Electricity store → chemically → light store', '电能储存 → 通过化学方式 → 光能储存') },
            { label: 'C', text: text('Force store → current store → heat pathway', '力能储存 → 电流储存 → 热路径') },
            { label: 'D', text: text('Light store → battery pathway → internal store', '光能储存 → 电池路径 → 内能储存') },
          ],
          correctAnswer: 'A',
          feedback: text(
            'The battery contains a chemical energy store. Current is an electrical transfer pathway; the lamp increases internal-energy stores and transfers energy by electromagnetic waves.',
            '电池中储存的是化学能。电流是电学转移路径；灯会增加内能，并通过电磁波转移能量。',
          ),
        },
      ],
    },
    {
      heading: text('2. Conservation, flow diagrams and Sankey diagrams', '2. 能量守恒、能量流图与桑基图'),
      paragraphs: [
        text(
          'Energy is conserved: it is transferred between stores but is not created or destroyed. A complete account includes useful output and energy dissipated to the surroundings. Calling dissipated energy “lost” means it is less useful, not that it has vanished.',
          '能量守恒：能量只在储存形式之间转移，不会被创造或消灭。完整核算必须包含有用输出和耗散到环境中的能量。“损失”表示能量变得不易利用，并不是能量消失。',
        ),
        text(
          'A simple flow diagram names the input and outputs. In a Sankey diagram, arrow width represents energy or power. At every stage, the total width entering equals the total width leaving, including downward dissipated branches.',
          '简单能量流图标出输入和输出。桑基图中，箭头宽度代表能量或功率；每一个阶段的输入总宽度都必须等于输出总宽度，包括向下的耗散分支。',
        ),
      ],
      formulas: [
        formula('Energy accounting', '能量核算', 'E_{\\mathrm{input}}=E_{\\mathrm{useful}}+E_{\\mathrm{dissipated}}'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-energy-sankey',
          mode: 'written',
          title: text('Practice: multi-stage energy accounting', '练习：多阶段能量核算'),
          prompt: text(
            'A device receives $500\\,\\mathrm{J}$. The first stage dissipates $80\\,\\mathrm{J}$ and the second stage produces $300\\,\\mathrm{J}$ of useful output. How much energy is dissipated at the second stage, and what should the Sankey widths show?',
            '某装置输入 $500\\,\\mathrm{J}$。第一阶段耗散 $80\\,\\mathrm{J}$，第二阶段产生 $300\\,\\mathrm{J}$ 有用输出。第二阶段耗散多少能量？桑基图箭头宽度应满足什么关系？',
          ),
          sampleAnswer: text(
            'Energy entering stage 2 is $500-80=420\\,\\mathrm{J}$, so stage-2 dissipation is $420-300=120\\,\\mathrm{J}$. The $500\\,\\mathrm{J}$ input width must equal the combined widths for $300\\,\\mathrm{J}$ useful output, $80\\,\\mathrm{J}$ first-stage dissipation and $120\\,\\mathrm{J}$ second-stage dissipation.',
            '进入第二阶段的能量为 $500-80=420\\,\\mathrm{J}$，所以第二阶段耗散 $420-300=120\\,\\mathrm{J}$。$500\\,\\mathrm{J}$ 输入箭头宽度应等于 $300\\,\\mathrm{J}$ 有用输出、$80\\,\\mathrm{J}$ 第一阶段耗散与 $120\\,\\mathrm{J}$ 第二阶段耗散宽度之和。',
          ),
        },
      ],
    },
    {
      heading: text('3. Kinetic and gravitational potential energy (Supplement)', '3. 动能与重力势能（Supplement）'),
      paragraphs: [
        text(
          'Kinetic energy depends on the square of speed, so doubling speed produces four times the kinetic energy. The change in gravitational potential energy depends on vertical height change, not on the length of a sloping path.',
          '动能与速率的平方有关，因此速率加倍会使动能变为四倍。重力势能变化取决于竖直高度变化，而不是斜线路径长度。',
        ),
        text(
          'These equations can be combined with conservation across several stages. State the chosen system and identify any transfer to internal energy when friction or drag is present.',
          '这些公式可以与多阶段能量守恒结合使用。应先确定系统；若存在摩擦或阻力，还要说明向内能的转移。',
        ),
      ],
      formulas: [
        formula('Kinetic energy', '动能', 'E_k=\\frac12mv^2'),
        formula('Change in gravitational potential energy', '重力势能变化', '\\Delta E_p=mg\\Delta h'),
      ],
    },
    {
      heading: text('4. Work done', '4. 功'),
      paragraphs: [
        text(
          'Mechanical or electrical work done equals the energy transferred. For a constant force acting along the direction of movement, mechanical work is force multiplied by distance moved.',
          '机械功或电功等于所转移的能量。恒力沿运动方向作用时，机械功等于力与沿力方向移动距离的乘积。',
        ),
      ],
      formulas: [
        formula('Mechanical work', '机械功', 'W=Fd=\\Delta E', 'Use the distance moved in the direction of the force.', '使用沿力方向移动的距离。'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-work-done',
          title: text('Practice: work as energy transfer', '练习：功与能量转移'),
          prompt: text(
            'A constant horizontal force of $75\\,\\mathrm{N}$ moves a box $4.0\\,\\mathrm{m}$ in the force direction. How much energy is transferred mechanically?',
            '一个恒定的 $75\\,\\mathrm{N}$ 水平力使箱子沿力方向移动 $4.0\\,\\mathrm{m}$。机械方式转移了多少能量？',
          ),
          choices: [
            { label: 'A', text: text('$18.75\\,\\mathrm{J}$', '$18.75\\,\\mathrm{J}$') },
            { label: 'B', text: text('$79\\,\\mathrm{J}$', '$79\\,\\mathrm{J}$') },
            { label: 'C', text: text('$300\\,\\mathrm{J}$', '$300\\,\\mathrm{J}$') },
            { label: 'D', text: text('$300\\,\\mathrm{W}$', '$300\\,\\mathrm{W}$') },
          ],
          correctAnswer: 'C',
          feedback: text('$W=Fd=75\\times4.0=300\\,\\mathrm{J}$.', '$W=Fd=75\\times4.0=300\\,\\mathrm{J}$。'),
        },
      ],
    },
    {
      heading: text('5. Energy resources and generation chains', '5. 能源与发电转换链'),
      paragraphs: [
        text(
          'Fossil fuels and biofuels release chemical energy, usually heating water in a boiler so steam drives a turbine and generator. Nuclear fuel and some geothermal stations similarly supply thermal energy before the turbine–generator stages. Hydroelectric water, tides, waves and wind can drive turbines more directly. Solar cells transfer energy from light directly to electrical output, while solar panels use solar radiation to heat water.',
          '化石燃料和生物燃料释放化学能，通常在锅炉中加热水，使蒸汽驱动涡轮机和发电机。核燃料与部分地热电站也先提供热能，再经过涡轮机—发电机环节。水力、潮汐、波浪和风能可更直接地驱动涡轮机。太阳能电池把光能直接转化为电能，太阳能集热板则利用太阳辐射加热水。',
        ),
        text(
          'Evaluate each resource using all five syllabus criteria: renewability, availability, reliability, scale and environmental impact. A strong comparison identifies a benefit, a limitation and the context in which each matters rather than labelling a source simply "good" or "bad".',
          '评价能源时应覆盖大纲规定的五个维度：可再生性、可获得性、可靠性、规模和环境影响。高质量比较应说明优点、局限及其适用情境，而不是简单把某种能源说成"好"或"坏"。',
        ),
        text(
          'Radiation from the Sun is the main original source of most energy resources: it drives winds, the water cycle, waves and biomass formation. The explicit exceptions are geothermal, nuclear and tidal energy. The Sun releases energy by nuclear fusion; research is investigating controlled fusion for large-scale electrical generation, but it is not presented as an established commercial resource.',
          '太阳辐射是大多数能源的原始来源：它驱动风、水循环、波浪与生物质形成。明确的例外是地热、核能和潮汐能。太阳通过核聚变释放能量；人类正在研究利用可控核聚变大规模发电，但它还不能被视为成熟的商业能源。',
        ),
        text(
          'Fossil fuels (coal, oil, natural gas): non-renewable; widely available where reserves exist; highly reliable and dispatchable; large-scale base-load supply; emit CO₂ and other pollutants, drive climate change, and cause habitat damage through extraction.',
          '化石燃料（煤、石油、天然气）：不可再生；在储量丰富的地区广泛可获得；高度可靠、可按需调度；适合大规模基载供电；排放 CO₂ 和其他污染物，推动气候变化，开采过程破坏栖息地。',
        ),
        text(
          'Biofuels (wood, bioethanol, biodiesel): renewable if replanted sustainably; available wherever biomass can be grown; reliability depends on supply chain; medium scale; carbon-neutral in principle but land competition with food and deforestation are concerns.',
          '生物燃料（木材、生物乙醇、生物柴油）：若可持续补种则可再生；在可种植生物质的地区可获得；可靠性取决于供应链；中等规模；理论上碳中和，但与粮食争地及毁林是主要问题。',
        ),
        text(
          'Hydroelectric: renewable (water cycle); available where suitable rivers and dams exist; highly reliable and dispatchable with reservoir storage; large scale; floods valleys, displaces communities, and alters ecosystems, but produces no direct emissions.',
          '水力发电：可再生（水循环）；在具备合适河流和坝址的地区可获得；有水库调节时高度可靠、可按需调度；大规模；淹没河谷、迁移居民、改变生态系统，但不直接排放温室气体。',
        ),
        text(
          'Wind: renewable; available wherever wind speeds are sufficient; intermittent and weather-dependent, so not dispatchable without storage; medium to large scale (onshore and offshore farms); no emissions in operation but visual impact, noise and bird/bat mortality are concerns.',
          '风能：可再生；在风速足够的地区可获得；间歇性、依赖天气，无储能时不可按需调度；中到大规模（陆上和海上风电场）；运行中无排放，但有视觉影响、噪声和对鸟类/蝙蝠的影响。',
        ),
        text(
          'Tidal: renewable; available only at coastlines with large tidal range; predictable (astronomical cycles) but output varies with tide; medium scale; can affect marine habitats and sediment flow, but no emissions.',
          '潮汐能：可再生；仅在潮差大的海岸可获得；可预测（天文周期）但输出随潮汐变化；中等规模；可能影响海洋栖息地和泥沙运动，但无排放。',
        ),
        text(
          'Wave: renewable; available on exposed coastlines; intermittent and weather-dependent; currently small to medium scale (emerging technology); no emissions but devices must survive harsh marine conditions.',
          '波浪能：可再生；在开阔海岸可获得；间歇性、依赖天气；目前小到中等规模（新兴技术）；无排放，但设备须承受恶劣海洋环境。',
        ),
        text(
          'Geothermal: renewable on human timescales; available only in geologically active regions (volcanic zones, rift valleys); highly reliable and baseload; medium scale locally; minimal emissions but drilling can release underground gases and affect local geology.',
          '地热能：在人类时间尺度上可再生；仅在地质活跃地区（火山带、裂谷）可获得；高度可靠、可基载运行；局部中等规模；排放极少，但钻井可能释放地下气体并影响局部地质。',
        ),
        text(
          'Nuclear fuel (uranium/plutonium fission): non-renewable fuel but extremely energy-dense; available where enrichment and reactor infrastructure exist; highly reliable baseload; very large scale; no CO₂ in operation but produces long-lived radioactive waste and carries accident risk (Chernobyl, Fukushima).',
          '核燃料（铀/钚裂变）：燃料不可再生但能量密度极高；在具备浓缩和反应堆基础设施的地区可获得；高度可靠、可基载运行；极大规模；运行中不排放 CO₂，但产生长寿命放射性废物，且存在事故风险（切尔诺贝利、福岛）。',
        ),
        text(
          'Solar cells (photovoltaic): renewable; available wherever sunlight reaches; intermittent (day/night, weather), not dispatchable without storage; small to large scale (rooftop to solar farms); no emissions in operation but manufacturing involves hazardous chemicals and end-of-life recycling is a growing concern.',
          '太阳能电池（光伏）：可再生；在有阳光照射的地区均可获得；间歇性（昼夜、天气），无储能时不可按需调度；小到大规模（屋顶到太阳能电站）；运行中无排放，但制造过程涉及有害化学品，报废回收是日益突出的问题。',
        ),
        text(
          'Solar heating (thermal panels): renewable; same availability as solar cells; intermittent; small to medium scale for domestic hot water and space heating; no emissions; simpler and cheaper than photovoltaics but only produces heat, not electricity.',
          '太阳能集热（热利用）：可再生；与太阳能电池相同的可获得性；间歇性；小到中等规模，用于家庭热水和供暖；无排放；比光伏更简单、更便宜，但只能产热、不能发电。',
        ),
      ],
      bullets: [
        text('Renewability: whether the resource is replaced on a human timescale.', '可再生性：资源能否在人类时间尺度内得到补充。'),
        text('Availability and reliability: where and when it can be used, and whether output is controllable.', '可获得性与可靠性：在哪里、何时可以使用，以及输出能否被控制。'),
        text('Scale: achievable power output and suitability for local or national supply.', '规模：可达到的功率，以及是否适合局部或全国供能。'),
        text('Environmental impact: emissions, waste, habitats, land use, visual/noise effects and accident risk as relevant.', '环境影响：根据具体能源考虑排放、废物、生态栖息地、土地使用、视觉/噪声影响和事故风险。'),
      ],
    },
    {
      heading: text('6. Efficiency', '6. 效率'),
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
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-efficiency',
          title: text('Practice: energy efficiency', '练习：能量效率'),
          prompt: text(
            'A motor receives $2.4\\,\\mathrm{kJ}$ and transfers $1.8\\,\\mathrm{kJ}$ usefully. What is its efficiency?',
            '一台电动机输入 $2.4\\,\\mathrm{kJ}$，其中 $1.8\\,\\mathrm{kJ}$ 为有用输出。效率是多少？',
          ),
          choices: [
            { label: 'A', text: text('$25\\%$', '$25\\%$') },
            { label: 'B', text: text('$75\\%$', '$75\\%$') },
            { label: 'C', text: text('$133\\%$', '$133\\%$') },
            { label: 'D', text: text('$4.32\\%$', '$4.32\\%$') },
          ],
          correctAnswer: 'B',
          feedback: text('$\\eta=(1.8/2.4)\\times100\\%=75\\%$.', '$\\eta=(1.8/2.4)\\times100\\%=75\\%$。'),
        },
      ],
    },
    {
      heading: text('7. Power', '7. 功率'),
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
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-power',
          mode: 'written',
          title: text('Practice: same energy, different power', '练习：相同能量，不同功率'),
          prompt: text(
            'Two pumps each transfer $36\\,\\mathrm{kJ}$. Pump A takes $30\\,\\mathrm{s}$ and pump B takes $45\\,\\mathrm{s}$. Calculate both powers and identify the more powerful pump.',
            '两台泵都转移 $36\\,\\mathrm{kJ}$ 能量。泵 A 用时 $30\\,\\mathrm{s}$，泵 B 用时 $45\\,\\mathrm{s}$。计算两者功率并判断哪台功率更大。',
          ),
          sampleAnswer: text(
            '$P_A=36000/30=1200\\,\\mathrm{W}$ and $P_B=36000/45=800\\,\\mathrm{W}$. Pump A is more powerful because it transfers the same energy in less time.',
            '$P_A=36000/30=1200\\,\\mathrm{W}$，$P_B=36000/45=800\\,\\mathrm{W}$。泵 A 在更短时间内转移相同能量，因此功率更大。',
          ),
        },
      ],
    },
    {
      heading: text('8. Decision rules and scope boundaries', '8. 判断规则与范围边界'),
      bullets: [
        text('Name the store before and after, then name the transfer pathway between them.', '先说明初始与最终能量储存，再说明二者之间的转移路径。'),
        text('In any energy account, useful plus dissipated output equals total input.', '任何能量核算中，有用输出与耗散输出之和等于总输入。'),
        text('Use vertical $\\Delta h$ for gravitational potential energy and the squared speed in kinetic energy.', '重力势能使用竖直 $\\Delta h$，动能中的速率必须平方。'),
        text('For $W=Fd$, use the distance moved along the force direction in the required syllabus case.', '使用 $W=Fd$ 时，应采用大纲所要求情形中沿力方向移动的距离。'),
        text('Do not confuse energy in joules with power in watts.', '不要混淆以焦耳表示的能量和以瓦特表示的功率。'),
        text('Advanced work integrals and nuclear-reaction equations are outside this subsection.', '高级功积分和核反应方程不属于本节要求。'),
      ],
    },
  ],
  studentVersion: energyWorkPowerStudentLesson,
};

const pressureStudentLesson: CurriculumLesson = {
  title: text('1.8 Pressure', '1.8 压强'),
  description: text(
    'Force per unit area and the effect of liquid depth and density.',
    '单位面积上的力，以及液体深度和密度对压强的影响。',
  ),
  sections: [
    {
      heading: text('0. Same force, different effect', '0. 相同的力，不同的效果'),
      paragraphs: [
        text(
          'A sharp blade cuts more easily than its blunt edge because the same force acts over a smaller area. A dam wall is thicker lower down because liquid pressure increases with depth.',
          '锋利刀刃比钝边更容易切开物体，因为相同的力作用在更小面积上。水坝下部更厚，因为液体压强随深度增加。',
        ),
      ],
    },
    {
      heading: text('1. Pressure on a surface', '1. 表面压强'),
      paragraphs: [
        text(
          'Pressure is perpendicular force per unit area. For the same area, increasing force increases pressure. For the same force, increasing area decreases pressure.',
          '压强是单位面积上的垂直作用力。面积相同时，力增大会使压强增大；力相同时，面积增大会使压强减小。',
        ),
      ],
      formulas: [
        formula('Pressure', '压强', 'p=\\frac{F}{A}'),
        formula('Pascal', '帕斯卡', '1\\,\\mathrm{Pa}=1\\,\\mathrm{N\\,m^{-2}}'),
      ],
      bullets: [
        text('Convert $\\mathrm{cm^2}$ to $\\mathrm{m^2}$ by dividing by $10^4$.', '把 $\\mathrm{cm^2}$ 换算为 $\\mathrm{m^2}$ 时，数值除以 $10^4$。'),
        text('Sharp blades and needles increase pressure; snowshoes and wide foundations reduce pressure.', '锋利刀刃和针尖增大压强；雪鞋和宽地基减小压强。'),
      ],
    },
    {
      heading: text('2. Pressure beneath a liquid surface', '2. 液面下的压强'),
      paragraphs: [
        text(
          'Liquid pressure increases with vertical depth and with liquid density. At equal depth in the same liquid, pressure is the same even if the container shapes differ.',
          '液体压强随竖直深度和液体密度增加。同一液体的相同深度处，即使容器形状不同，压强也相同。',
        ),
      ],
      formulas: [
        formula('Liquid pressure change (Supplement)', '液体压强变化（Supplement）', '\\Delta p=\\rho g\\Delta h'),
      ],
      takeaway: text('$\\Delta p$ is a pressure difference; add surface pressure only when total pressure is requested.', '$\\Delta p$ 是压强差；只有题目要求总压强时才需要加上液面压强。'),
    },
    {
      heading: text('3. Common errors', '3. 常见错误'),
      bullets: [
        text('Pressure is not force; pressure also depends on area.', '压强不是力；压强还取决于面积。'),
        text('Use vertical depth, not distance along a sloping wall.', '使用竖直深度，而不是沿倾斜容器壁的距离。'),
        text('Do not treat $\\Delta p=\\rho g\\Delta h$ as total pressure automatically.', '不要自动把 $\\Delta p=\\rho g\\Delta h$ 当作总压强。'),
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
      heading: text('0. Same force, different effect', '0. 相同的力，不同的效果'),
      paragraphs: [
        text(
          'A sharp knife cuts more easily than its blunt edge, snowshoes prevent a person sinking deeply into snow, and dam walls are thicker lower down. These observations show that force alone does not determine the physical effect: area, depth and fluid density matter.',
          '锋利刀刃比钝边更容易切开物体，雪鞋能防止人深陷雪中，水坝下部也更厚。这些现象说明，物理效果不只由力决定；面积、深度和流体密度同样重要。',
        ),
      ],
    },
    {
      heading: text('1. Pressure on a surface: definition and units', '1. 表面压强：定义与单位'),
      paragraphs: [
        text(
          'Pressure is perpendicular force per unit area. For the same area, a larger force produces greater pressure. For the same force, a smaller contact area produces greater pressure.',
          '压强是单位面积上的垂直作用力。面积相同时，力越大，压强越大；力相同时，接触面积越小，压强越大。',
        ),
        text(
          'The SI unit is the pascal, where $1\\,\\mathrm{Pa}=1\\,\\mathrm{N\\,m^{-2}}$. Area must therefore be expressed in square metres when force is in newtons and pressure is required in pascals. Since area is squared, $1\\,\\mathrm{cm^2}=10^{-4}\\,\\mathrm{m^2}$.',
          '国际单位是帕斯卡，$1\\,\\mathrm{Pa}=1\\,\\mathrm{N\\,m^{-2}}$。因此，当力用牛顿、压强用帕斯卡时，面积必须换成平方米。由于面积是长度的平方，$1\\,\\mathrm{cm^2}=10^{-4}\\,\\mathrm{m^2}$。',
        ),
      ],
      formulas: [
        formula('Pressure', '压强', 'p=\\frac{F}{A}'),
        formula('Force', '力', 'F=pA'),
        formula('Area', '面积', 'A=\\frac{F}{p}'),
        formula('Pascal', '帕斯卡', '1\\,\\mathrm{Pa}=1\\,\\mathrm{N\\,m^{-2}}'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-pressure-area',
          title: text('Practice: force, area and pressure', '练习：力、面积与压强'),
          prompt: text(
            'A block rests on a table. It is turned from a face of area $120\\,\\mathrm{cm^2}$ onto a face of area $40\\,\\mathrm{cm^2}$. Its weight is unchanged. What happens to the pressure?',
            '一个物块放在桌面上，从面积为 $120\\,\\mathrm{cm^2}$ 的面翻到面积为 $40\\,\\mathrm{cm^2}$ 的面，重量不变。压强如何变化？',
          ),
          choices: [
            { label: 'A', text: text('It becomes one third as large.', '变为原来的三分之一。') },
            { label: 'B', text: text('It is unchanged.', '保持不变。') },
            { label: 'C', text: text('It becomes three times as large.', '变为原来的三倍。') },
            { label: 'D', text: text('It becomes nine times as large.', '变为原来的九倍。') },
          ],
          correctAnswer: 'C',
          feedback: text('The force is unchanged and the area becomes one third, so $p=F/A$ becomes three times as large.', '力不变，面积变为三分之一，因此由 $p=F/A$ 可知压强变为三倍。'),
        },
      ],
    },
    {
      heading: text('2. Everyday pressure design', '2. 日常压强设计'),
      paragraphs: [
        text(
          'Sharp blades, needles and drawing pins use a small area to create a large pressure from a manageable force. Snowshoes, tractor tracks, wide tyres and building foundations spread a force over a larger area to reduce pressure. In every explanation, state what stays constant and what changes.',
          '锋利刀刃、针尖和图钉利用小面积，使有限的力产生较大压强；雪鞋、履带、宽轮胎和建筑地基把力分布在较大面积上，以减小压强。解释时应明确哪个量保持不变、哪个量发生变化。',
        ),
      ],
    },
    {
      heading: text('3. Pressure beneath a liquid surface', '3. 液面下的压强'),
      paragraphs: [
        text(
          'Liquid pressure increases with depth because a deeper point supports a taller column of liquid. At the same depth, a denser liquid produces a greater pressure increase.',
          '液体压强随深度增加，因为更深处承受更高液柱的重量。同一深度处，密度更大的液体产生更大的压强增量。',
        ),
        text(
          'At equal vertical depth in the same connected liquid, pressure is the same even when the container is wide, narrow or irregularly shaped. Container shape does not replace depth in the comparison.',
          '同一连通液体中，相同竖直深度处的压强相同，即使容器宽窄或形状不同。比较时不能用容器形状代替深度。',
        ),
        text(
          'The equation gives the pressure difference between two depths in a liquid of uniform density. It does not by itself include pressure acting on the surface. If total pressure is requested, the surface pressure must be added separately.',
          '该公式给出均匀密度液体中两个深度之间的压强差，本身不包含液面所受压强。若题目要求总压强，必须另加液面压强。',
        ),
      ],
      formulas: [
        formula('Liquid pressure change (Supplement)', '液体压强变化（Supplement）', '\\Delta p=\\rho g\\Delta h'),
        formula('Total pressure when surface pressure is known', '已知液面压强时的总压强', 'p_{\\mathrm{total}}=p_{\\mathrm{surface}}+\\rho gh', 'Use only when total pressure is explicitly required.', '仅在题目明确要求总压强时使用。'),
      ],
      classroomQuestions: [
        {
          id: 'igcse-u1-teacher-liquid-pressure',
          mode: 'written',
          title: text('Practice: pressure difference in a liquid', '练习：液体中的压强差'),
          prompt: text(
            'Two points in water are separated vertically by $3.0\\,\\mathrm{m}$. Take $\\rho=1000\\,\\mathrm{kg\\,m^{-3}}$ and $g=9.8\\,\\mathrm{N\\,kg^{-1}}$. Calculate the pressure difference and state whether the result is the total pressure at the lower point.',
            '水中两点的竖直高度差为 $3.0\\,\\mathrm{m}$。取 $\\rho=1000\\,\\mathrm{kg\\,m^{-3}}$，$g=9.8\\,\\mathrm{N\\,kg^{-1}}$。计算压强差，并说明该结果是否为较低点的总压强。',
          ),
          sampleAnswer: text(
            '$\\Delta p=\\rho g\\Delta h=1000\\times9.8\\times3.0=2.94\\times10^4\\,\\mathrm{Pa}$. This is a pressure difference, not the total pressure unless the pressure at the upper point is zero gauge pressure and the question is using gauge pressure.',
            '$\\Delta p=\\rho g\\Delta h=1000\\times9.8\\times3.0=2.94\\times10^4\\,\\mathrm{Pa}$。这是压强差，并非自动等于较低点总压强；只有在上方为零表压且题目采用表压时才能这样理解。',
          ),
        },
      ],
    },
    {
      heading: text('4. Decision rules and scope boundaries', '4. 判断规则与范围边界'),
      bullets: [
        text('Pressure is not force; always identify the contact area as well.', '压强不是力；必须同时确定接触面积。'),
        text('Convert area units by squaring the length conversion.', '面积单位换算必须把长度换算因子平方。'),
        text('For liquid pressure, compare vertical depth and liquid density—not container volume or shape.', '比较液体压强时看竖直深度和液体密度，而不是容器体积或形状。'),
        text('$\\Delta p=\\rho g\\Delta h$ gives a pressure change, not automatically absolute pressure.', '$\\Delta p=\\rho g\\Delta h$ 给出压强变化，并不自动等于绝对压强。'),
        text('Atmospheric-pressure measurement and hydraulic systems are not specified in this subsection.', '大气压测量与液压系统不属于本节大纲要求。'),
      ],
    },
  ],
  studentVersion: pressureStudentLesson,
};

export const igcseUnit1Lessons: CurriculumLesson[] = [
  physicalQuantitiesLesson,
  motionLesson,
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
        classroomQuestions: [
          {
            id: 'igcse-u1-teacher-mass-weight-calculation',
            title: text('Practice: weight in a gravitational field', '练习：重力场中的重量'),
            prompt: text(
              'A probe of mass $12\\,\\mathrm{kg}$ is on a planet where $g=4.0\\,\\mathrm{N\\,kg^{-1}}$. What is its weight?',
              '一个质量为 $12\\,\\mathrm{kg}$ 的探测器位于 $g=4.0\\,\\mathrm{N\\,kg^{-1}}$ 的行星上。它的重量是多少？',
            ),
            choices: [
              { label: 'A', text: text('$3.0\\,\\mathrm{N}$', '$3.0\\,\\mathrm{N}$') },
              { label: 'B', text: text('$16\\,\\mathrm{N}$', '$16\\,\\mathrm{N}$') },
              { label: 'C', text: text('$48\\,\\mathrm{N}$', '$48\\,\\mathrm{N}$') },
              { label: 'D', text: text('$48\\,\\mathrm{kg}$', '$48\\,\\mathrm{kg}$') },
            ],
            correctAnswer: 'C',
            feedback: text('$W=mg=12\\times4.0=48\\,\\mathrm{N}$.', '$W=mg=12\\times4.0=48\\,\\mathrm{N}$。'),
          },
        ],
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
      {
        heading: text('3. Decision rules and common errors', '3. 判断规则与常见错误'),
        bullets: [
          text('Mass is measured in kilograms; weight is a force measured in newtons.', '质量以千克表示；重量是力，以牛顿表示。'),
          text('Changing gravitational field strength changes weight but not mass.', '改变重力场强会改变重量，但不会改变质量。'),
          text('A balance compares masses because both sides experience the same $g$; a force meter measures weight directly.', '天平两侧受到相同的 $g$，因此可比较质量；测力计直接测量重量。'),
          text('$\\mathrm{N\\,kg^{-1}}$ and $\\mathrm{m\\,s^{-2}}$ have different meanings even though gravitational field strength and free-fall acceleration are numerically equivalent.', '$\\mathrm{N\\,kg^{-1}}$ 与 $\\mathrm{m\\,s^{-2}}$ 含义不同，尽管重力场强与自由落体加速度在数值上相等。'),
        ],
      },
    ],
    studentVersion: massAndWeightStudentLesson,
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
            'During a collision, the contact forces can be large and the details can be complicated. If the external impulse on the chosen system is negligible, its total momentum remains constant, allowing the final motion to be predicted.',
            '碰撞过程中接触力可能很大，细节也可能很复杂。若所选系统受到的外冲量可忽略，系统总动量保持不变，因此仍可预测碰撞后的运动。',
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
            'For every one-dimensional problem, choose a positive direction before substituting. Velocities and momenta in the opposite direction are negative. Conservation applies to the total momentum of the complete chosen system, not to each object separately.',
            '处理一维问题时，代入前必须先规定正方向。反向速度和动量取负值。守恒的是完整所选系统的总动量，而不是每个物体各自的动量。',
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
        classroomQuestions: [
          {
            id: 'igcse-u1-teacher-impulse-force',
            mode: 'written',
            title: text('Practice: stopping time and force', '练习：停止时间与平均力'),
            prompt: text(
              'A $0.20\\,\\mathrm{kg}$ ball moving at $15\\,\\mathrm{m\\,s^{-1}}$ is brought to rest. Calculate the magnitude of the average resultant force if it stops in (i) $0.010\\,\\mathrm{s}$ and (ii) $0.050\\,\\mathrm{s}$. Explain the comparison.',
              '一个质量为 $0.20\\,\\mathrm{kg}$、速度为 $15\\,\\mathrm{m\\,s^{-1}}$ 的球停止运动。若停止时间分别为 (i) $0.010\\,\\mathrm{s}$ 和 (ii) $0.050\\,\\mathrm{s}$，计算平均合力大小并解释差异。',
            ),
            sampleAnswer: text(
              '$|\\Delta p|=0.20\\times15=3.0\\,\\mathrm{kg\\,m\\,s^{-1}}$. Thus (i) $F=3.0/0.010=300\\,\\mathrm{N}$ and (ii) $F=3.0/0.050=60\\,\\mathrm{N}$. The same momentum change over five times the time gives one fifth of the average force.',
              '$|\\Delta p|=0.20\\times15=3.0\\,\\mathrm{kg\\,m\\,s^{-1}}$。因此 (i) $F=3.0/0.010=300\\,\\mathrm{N}$；(ii) $F=3.0/0.050=60\\,\\mathrm{N}$。相同动量变化用五倍时间完成，平均力变为五分之一。',
            ),
          },
        ],
      },
      {
        heading: text('3. Common errors', '3. 常见错误'),
        bullets: [
          text('Momentum is a vector; opposite directions require opposite signs.', '动量是矢量；相反方向需要使用相反符号。'),
          text('Momentum conservation applies to the chosen system when external impulse is negligible.', '只有当所选系统受到的外冲量可忽略时，才能使用动量守恒。'),
          text('Kinetic energy does not have to be conserved in an inelastic collision.', '非弹性碰撞中动能不一定守恒。'),
          text('In $F=\\Delta p/\\Delta t$, $F$ is the resultant force and is usually an average over the stated interval.', '在 $F=\\Delta p/\\Delta t$ 中，$F$ 是合力，通常表示所给时间间隔内的平均值。'),
          text('The required syllabus problems are simple and one-dimensional; coefficient of restitution is outside scope.', '大纲要求简单的一维问题，恢复系数不在范围内。'),
        ],
      },
    ],
    studentVersion: momentumStudentLesson,
  },
  energyWorkPowerLesson,
  pressureLesson,
];
