import type {
  CurriculumClassroomQuestion,
  CurriculumFormula,
  CurriculumImage,
  CurriculumLesson,
  CurriculumLessonContent,
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

const originalDiagram = (
  filename: string,
  altEn: string,
  altZh: string,
  captionEn: string,
  captionZh: string,
): CurriculumImage => ({
  src: '/curriculum-assets/rotation/' + filename,
  alt: text(altEn, altZh),
  caption: text(captionEn, captionZh),
  sourceLabel: text('Original Pocket Cosmos diagram', '口袋宇宙原创示意图'),
});

const angularKinematicsDiagram = originalDiagram(
  'angular-kinematics.svg',
  'A rotating disk beside angular position, angular velocity, and angular acceleration graphs.',
  '旋转圆盘以及角位置、角速度、角加速度图像。',
  'Slopes move from angular position to angular velocity to angular acceleration; signed areas move in the reverse direction.',
  '斜率把角位置连接到角速度和角加速度;有符号面积沿相反方向连接这些量。',
);

const angularVelocityGraphSet: CurriculumImage[] = ['A', 'B', 'C', 'D', 'E'].map((label, index) => ({
  src: '/apc-mechanics-test16/source/03' + String.fromCharCode(97 + index) + '.jpg',
  alt: text(
    'Graph ' + label + ': angular velocity versus time.',
    '图像 ' + label + '：角速度—时间图像。',
  ),
  caption: text('Graph ' + label, '图像 ' + label),
}));

const torqueDiagram = originalDiagram(
  'torque-lever-arm.svg',
  'A wrench showing position vector, applied force, force angle, and lever arm.',
  '扳手示意图,标出位置矢量、作用力、夹角与力臂。',
  'Torque depends on the force component perpendicular to the position vector, equivalently on the perpendicular lever arm.',
  '力矩取决于垂直于位置矢量的力分量,也可等价地用垂直力臂表示。',
);

const inertiaDiagram = originalDiagram(
  'rotational-inertia.svg',
  'A solid disk and hoop of equal mass and radius with different rotational inertia.',
  '等质量、等半径的实心圆盘和圆环具有不同转动惯量。',
  'Moving the same mass farther from the axis increases rotational inertia.',
  '把相同质量分布到更远离转轴的位置会增大转动惯量。',
);

const dynamicsDiagram = originalDiagram(
  'rotational-dynamics.svg',
  'A falling yo-yo with force, torque, and kinematic constraint labels.',
  '下落 yo-yo 的受力、力矩和运动学约束。',
  'Translation and rotation require separate equations connected by the no-slip string constraint.',
  '平动和转动需要分别列方程,再由绳不打滑的约束连接。',
);

const angularMomentumDiagram = originalDiagram(
  'angular-momentum.svg',
  'A straight-moving particle with angular momentum about a point and a rotating person changing mass distribution.',
  '直线运动质点相对参考点的角动量,以及改变质量分布的旋转者。',
  'Angular momentum depends on the selected reference axis; with negligible external torque, changing inertia changes angular speed.',
  '角动量取决于参考轴;合外力矩可忽略时,转动惯量改变会引起角速度改变。',
);

const rollingDiagram = originalDiagram(
  'rolling-motion.svg',
  'A rolling wheel with top, center, and contact-point velocities.',
  '滚动车轮顶部、中心和接触点的速度。',
  'For rolling without slipping, the contact point is instantaneously at rest relative to the ground.',
  '无滑动滚动时,接触点相对地面瞬时静止。',
);

const orbitDiagram = originalDiagram(
  'orbit-energy.svg',
  'An elliptical orbit comparing motion and energy near periapsis and apoapsis.',
  '椭圆轨道近地点与远地点的运动和能量比较。',
  'Total energy and angular momentum remain constant while kinetic and gravitational potential energies exchange.',
  '总能量和角动量保持不变,动能与引力势能相互转化。',
);

const mcq = (
  id: string,
  titleEn: string,
  titleZh: string,
  promptEn: string,
  promptZh: string,
  choices: Array<[string, string, string]>,
  correctAnswer: string,
  feedbackEn: string,
  feedbackZh: string,
): CurriculumClassroomQuestion => ({
  id,
  title: text(titleEn, titleZh),
  prompt: text(promptEn, promptZh),
  choices: choices.map(([label, en, zh]) => ({ label, text: text(en, zh) })),
  correctAnswer,
  feedback: text(feedbackEn, feedbackZh),
});

const angularGraphCheck = mcq(
  'apc-rot-5-1-angular-graph',
  'Classroom Check: angular graph signs',
  '课堂题:角运动图像符号',
  'A wheel has $\\omega<0$ and $\\alpha>0$. What happens to its angular speed at that instant?',
  '某轮子此时 $\\omega<0$ 且 $\\alpha>0$。它的角速率怎样变化?',
  [
    ['A', 'It increases because $\\alpha$ is positive.', '增大,因为 $\\alpha$ 为正。'],
    ['B', 'It decreases because $\\omega$ and $\\alpha$ have opposite signs.', '减小,因为 $\\omega$ 与 $\\alpha$ 异号。'],
    ['C', 'It is zero.', '角速率为零。'],
    ['D', 'The direction must immediately reverse.', '转动方向必须立刻反向。'],
  ],
  'B',
  'Opposite signs make $|\\omega|$ decrease. Positive angular acceleration changes the negative angular velocity toward zero.',
  '符号相反会使 $|\\omega|$ 减小。正角加速度使负角速度逐渐接近零。',
);

const angularDisplacementGraphPractice = mcq(
  'apc-rot-5-1-test16-q2',
  'Classroom Practice 1: angular displacement',
  '课堂练习 1：角位移',
  'For graphs A–E above, which graph gives the greatest angular displacement over the interval?',
  '对于上方图像 A–E，哪幅图在该时间段内产生的角位移最大？',
  [
    ['A', 'Graph A', '图像 A'],
    ['B', 'Graph B', '图像 B'],
    ['C', 'Graph C', '图像 C'],
    ['D', 'Graph D', '图像 D'],
    ['E', 'Graph E', '图像 E'],
  ],
  'B',
  '$\\Delta\\theta=\\int\\omega\\,dt$, so compare signed areas under the curves. Graph B maintains $\\omega=1$ throughout the interval and has the greatest signed area.',
  '$\\Delta\\theta=\\int\\omega\\,dt$，因此要比较曲线下方的有符号面积。图像 B 在整个时间段内保持 $\\omega=1$，有符号面积最大。',
);

const averageAngularAccelerationGraphPractice = mcq(
  'apc-rot-5-1-test16-q3',
  'Classroom Practice 2: average angular acceleration',
  '课堂练习 2：平均角加速度',
  'For graphs A–E above, which has the greatest average angular acceleration?',
  '对于上方图像 A–E，哪一项的平均角加速度最大？',
  [
    ['A', 'Graph A', '图像 A'],
    ['B', 'Graph B', '图像 B'],
    ['C', 'Graph C', '图像 C'],
    ['D', 'Graph E', '图像 E'],
    ['E', 'Graphs C and E', '图像 C 和 E'],
  ],
  'E',
  '$\\bar{\\alpha}=(\\omega_f-\\omega_i)/\\Delta t$. Graphs C and E both change from $\\omega=0$ to $\\omega=1$ over the same interval, so they have the same greatest average angular acceleration.',
  '$\\bar{\\alpha}=(\\omega_f-\\omega_i)/\\Delta t$。图像 C 和 E 都在相同时间内由 $\\omega=0$ 变为 $\\omega=1$，因此具有相同且最大的平均角加速度。',
);

const averageAngularVelocityGraphPractice = mcq(
  'apc-rot-5-1-test16-q4',
  'Classroom Practice 3: average angular velocity',
  '课堂练习 3：平均角速度',
  'For graphs A–E above, which has the smallest average angular velocity?',
  '对于上方图像 A–E，哪一项的平均角速度最小？',
  [
    ['A', 'Graph A', '图像 A'],
    ['B', 'Graph B', '图像 B'],
    ['C', 'Graph C', '图像 C'],
    ['D', 'Graph D', '图像 D'],
    ['E', 'Graphs A and B', '图像 A 和 B'],
  ],
  'A',
  '$\\bar{\\omega}=\\frac{1}{\\Delta t}\\int\\omega\\,dt$. In graph A, the positive and negative signed areas cancel, giving $\\bar{\\omega}=0$; the other graphs have positive average angular velocity.',
  '$\\bar{\\omega}=\\frac{1}{\\Delta t}\\int\\omega\\,dt$。图像 A 中正、负有符号面积相互抵消，所以 $\\bar{\\omega}=0$；其余图像的平均角速度均为正。',
);

const radiusCheck = mcq(
  'apc-rot-5-2-radius',
  'Classroom Check: two points on one disk',
  '课堂题:同一圆盘上的两个点',
  'Point B is twice as far from the axis as point A on the same rigid disk. Which comparison is correct?',
  '同一刚性圆盘上,B 点到转轴的距离是 A 点的两倍。下列比较哪项正确?',
  [
    ['A', '$\\omega_B=2\\omega_A$', '$\\omega_B=2\\omega_A$'],
    ['B', '$v_B=2v_A$ and $\\omega_B=\\omega_A$', '$v_B=2v_A$ 且 $\\omega_B=\\omega_A$'],
    ['C', '$v_B=v_A$ and $\\omega_B=2\\omega_A$', '$v_B=v_A$ 且 $\\omega_B=2\\omega_A$'],
    ['D', '$\\alpha_B=2\\alpha_A$', '$\\alpha_B=2\\alpha_A$'],
  ],
  'B',
  'Every point shares the same angular velocity, while $v_T=r\\omega$ makes the outer point twice as fast.',
  '同一刚体各点角速度相同,而 $v_T=r\\omega$ 使外侧点的线速度变为两倍。',
);

const torqueCheck = mcq(
  'apc-rot-5-3-torque',
  'Classroom Check: opening a door',
  '课堂题:打开一扇门',
  'The same force is applied at the handle of a door. Which direction produces the greatest torque about the hinge?',
  '在门把手处施加大小相同的力。哪个方向相对铰链产生的力矩最大?',
  [
    ['A', 'Parallel to the door, toward the hinge.', '沿门板方向,指向铰链。'],
    ['B', 'Parallel to the door, away from the hinge.', '沿门板方向,远离铰链。'],
    ['C', 'Perpendicular to the line from hinge to handle.', '垂直于铰链到门把手的连线。'],
    ['D', 'Every direction gives the same torque.', '所有方向产生相同力矩。'],
  ],
  'C',
  '$\\tau=rF\\sin\\phi$ is largest when $\\phi=90^\\circ$. A force whose line of action passes through the hinge gives zero torque.',
  '$\\tau=rF\\sin\\phi$ 在 $\\phi=90^\\circ$ 时最大。作用线穿过铰链的力产生零力矩。',
);

const inertiaCheck = mcq(
  'apc-rot-5-4-inertia',
  'Classroom Check: disk versus hoop',
  '课堂题:圆盘与圆环',
  'A disk and a thin hoop have the same mass and radius. Which has greater rotational inertia about its central axis?',
  '实心圆盘和薄圆环质量、半径相同。绕中心轴转动时哪个转动惯量更大?',
  [
    ['A', 'The disk, because it contains mass near the axis.', '圆盘,因为它在转轴附近也有质量。'],
    ['B', 'The hoop, because more mass is far from the axis.', '圆环,因为更多质量远离转轴。'],
    ['C', 'They are equal because mass and radius match.', '相等,因为质量和半径相同。'],
    ['D', 'It depends on angular speed.', '取决于角速度。'],
  ],
  'B',
  'Rotational inertia weights each mass element by $r^2$. The hoop places all its mass at radius $R$, so $I_{hoop}=MR^2>I_{disk}=MR^2/2$.',
  '转动惯量按 $r^2$ 加权各质量元。圆环全部质量位于半径 $R$ 处,所以 $I_{hoop}=MR^2>I_{disk}=MR^2/2$。',
);

const equilibriumCheck = mcq(
  'apc-rot-5-5-equilibrium',
  'Classroom Check: rotational equilibrium',
  '课堂题:转动平衡',
  'A rigid body has zero net force but a nonzero net torque. Which statement is correct?',
  '某刚体合力为零,但合力矩不为零。下列说法哪项正确?',
  [
    ['A', 'Both its center-of-mass velocity and angular velocity must remain constant.', '质心速度和角速度都必须保持不变。'],
    ['B', 'Its center-of-mass velocity can remain constant while its angular velocity changes.', '质心速度可以保持不变,而角速度发生变化。'],
    ['C', 'It must remain at rest.', '它必须保持静止。'],
    ['D', 'Its angular acceleration must be zero.', '它的角加速度必须为零。'],
  ],
  'B',
  'Translational and rotational conditions are independent: $\\sum\\vec F=0$ but $\\sum\\tau\\ne0$.',
  '平动与转动条件彼此独立:这里 $\\sum\\vec F=0$,但 $\\sum\\tau\\ne0$。',
);

const rotationalDynamicsCheck = mcq(
  'apc-rot-5-6-dynamics',
  'Classroom Check: same torque, new inertia',
  '课堂题:同一力矩下改变转动惯量',
  'The same net torque acts on two rigid systems. System B has three times the rotational inertia of system A. What is $\\alpha_B/\\alpha_A$?',
  '相同合力矩作用在两个刚体系统上。B 的转动惯量是 A 的三倍。求 $\\alpha_B/\\alpha_A$。',
  [
    ['A', '$3$', '$3$'],
    ['B', '$1$', '$1$'],
    ['C', '$1/3$', '$1/3$'],
    ['D', '$1/9$', '$1/9$'],
  ],
  'C',
  'From $\\alpha=\\tau_{net}/I$, tripling $I$ at fixed torque divides angular acceleration by three.',
  '由 $\\alpha=\\tau_{net}/I$,合力矩不变而 $I$ 变为三倍时,角加速度变为三分之一。',
);

const rotationalEnergyCheck = mcq(
  'apc-rot-6-1-energy',
  'Classroom Check: moving center of mass',
  '课堂题:运动的质心',
  'Which expression gives the total kinetic energy of a rigid body whose center of mass translates while it rotates about its center of mass?',
  '一个刚体的质心在平移,同时刚体绕质心转动。哪个式子给出总动能?',
  [
    ['A', '$K=\\frac12Mv_{cm}^2$', '$K=\\frac12Mv_{cm}^2$'],
    ['B', '$K=\\frac12I_{cm}\\omega^2$', '$K=\\frac12I_{cm}\\omega^2$'],
    ['C', '$K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2$', '$K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2$'],
    ['D', '$K=Mv_{cm}I_{cm}\\omega$', '$K=Mv_{cm}I_{cm}\\omega$'],
  ],
  'C',
  'The center-of-mass decomposition adds translational kinetic energy and rotation about the center of mass.',
  '质心分解把质心平动动能与绕质心转动的动能相加。',
);

const torqueWorkCheck = mcq(
  'apc-rot-6-2-work',
  'Classroom Check: which graph area?',
  '课堂题:哪张图像的面积?',
  'Which graph area gives the work done by a torque?',
  '哪一种图像下的面积表示力矩做的功?',
  [
    ['A', 'Torque versus time.', '力矩-时间图像。'],
    ['B', 'Torque versus angular position.', '力矩-角位置图像。'],
    ['C', 'Angular momentum versus time.', '角动量-时间图像。'],
    ['D', 'Angular velocity versus time.', '角速度-时间图像。'],
  ],
  'B',
  '$W=\\int\\tau\\,d\\theta$. The area under a torque-time graph is angular impulse instead.',
  '$W=\\int\\tau\\,d\\theta$。力矩-时间图像下的面积表示角冲量。',
);

const angularImpulseCheck = mcq(
  'apc-rot-6-3-impulse',
  'Classroom Check: torque-time graph',
  '课堂题:力矩-时间图像',
  'A constant net torque $\\tau_0$ acts for a time $\\Delta t$. What is the change in angular momentum?',
  '恒定合力矩 $\\tau_0$ 作用时间 $\\Delta t$。角动量变化是多少?',
  [
    ['A', '$\\tau_0/\\Delta t$', '$\\tau_0/\\Delta t$'],
    ['B', '$\\tau_0\\Delta t$', '$\\tau_0\\Delta t$'],
    ['C', '$\\tau_0\\Delta\\theta$', '$\\tau_0\\Delta\\theta$'],
    ['D', '$I/\\tau_0$', '$I/\\tau_0$'],
  ],
  'B',
  '$\\Delta L=\\int\\tau\\,dt=\\tau_0\\Delta t$. The result has the same direction as the net torque.',
  '$\\Delta L=\\int\\tau\\,dt=\\tau_0\\Delta t$,方向与合力矩相同。',
);

const conservationCheck = mcq(
  'apc-rot-6-4-conservation',
  'Classroom Check: spinning chair',
  '课堂题:旋转椅',
  'A person on a low-friction rotating chair pulls masses inward. External torque is negligible. Which statement is correct?',
  '人在低摩擦旋转椅上把重物向内收,外力矩可忽略。下列哪项正确?',
  [
    ['A', '$I$ decreases, $\\omega$ increases, and angular momentum stays constant.', '$I$ 减小,$\\omega$ 增大,角动量保持不变。'],
    ['B', '$I$ decreases and $\\omega$ also decreases.', '$I$ 减小且 $\\omega$ 也减小。'],
    ['C', 'Kinetic energy must stay constant because angular momentum does.', '因为角动量守恒,动能也必须守恒。'],
    ['D', 'Angular momentum becomes zero.', '角动量变为零。'],
  ],
  'A',
  '$I_i\\omega_i=I_f\\omega_f$. The person can do internal work, so rotational kinetic energy need not be constant.',
  '$I_i\\omega_i=I_f\\omega_f$。人可以通过肌肉做功,所以转动动能不必保持不变。',
);

const rollingCheck = mcq(
  'apc-rot-6-5-rolling',
  'Classroom Check: rolling race',
  '课堂题:滚动竞速',
  'A solid disk and thin hoop with equal mass and radius roll without slipping from the same height. Which reaches the bottom first?',
  '等质量、等半径的实心圆盘和薄圆环从同一高度无滑动滚下。哪个先到底?',
  [
    ['A', 'The hoop, because it has greater rotational inertia.', '圆环,因为它的转动惯量更大。'],
    ['B', 'The disk, because a smaller fraction of energy goes into rotation.', '圆盘,因为较少比例的能量进入转动。'],
    ['C', 'They tie because gravitational potential energy is equal.', '同时到达,因为重力势能相同。'],
    ['D', 'The result depends only on mass.', '结果只取决于质量。'],
  ],
  'B',
  'With $I=\\beta MR^2$, $v^2=2gh/(1+\\beta)$. The disk has smaller $\\beta$ and therefore larger speed and acceleration.',
  '若 $I=\\beta MR^2$,则 $v^2=2gh/(1+\\beta)$。圆盘的 $\\beta$ 更小,因此速度和加速度更大。',
);

const orbitCheck = mcq(
  'apc-rot-6-6-orbit',
  'Classroom Check: elliptical orbit',
  '课堂题:椭圆轨道',
  'A satellite moves from apoapsis toward periapsis in a gravity-only elliptical orbit. What changes?',
  '卫星在只受引力的椭圆轨道中从远地点向近地点运动。哪些量发生变化?',
  [
    ['A', '$K$ decreases and $U$ increases; total energy changes.', '$K$ 减小且 $U$ 增大;总能量改变。'],
    ['B', '$K$ increases and $U$ becomes more negative; total energy and angular momentum stay constant.', '$K$ 增大且 $U$ 变得更负;总能量和角动量保持不变。'],
    ['C', 'Every energy quantity remains constant.', '所有能量都保持不变。'],
    ['D', 'Angular momentum decreases because radius decreases.', '因为半径减小,角动量也减小。'],
  ],
  'B',
  'Gravity transfers energy between $U$ and $K$ while total mechanical energy remains constant. Its central torque is zero, so angular momentum is also constant.',
  '引力使 $U$ 与 $K$ 相互转化,但总机械能保持不变。引力对中心的力矩为零,所以角动量也保持不变。',
);

const studentVersion = (
  titleEn: string,
  titleZh: string,
  descriptionEn: string,
  descriptionZh: string,
  sections: CurriculumLessonContent['sections'],
): CurriculumLessonContent => ({
  title: text(titleEn, titleZh),
  description: text(descriptionEn, descriptionZh),
  sections,
});

const rotationalKinematicsLesson: CurriculumLesson = {
  title: text('5.1 Rotational Kinematics: One Angle for an Entire Rigid System', '5.1 转动运动学:用一个角度描述整个刚体'),
  description: text(
    'Start from a spinning washing-machine drum, choose an axis and sign convention, and derive the calculus and graph relations among angular position, velocity, and acceleration.',
    '从洗衣机甩干桶出发,先选择转轴与正方向,再推导角位置、角速度和角加速度之间的微积分与图像关系。',
  ),
  sections: [
    {
      heading: text('Hook: how can one variable describe the whole drum?', '钩子:怎样用一个变量描述整个滚筒?'),
      images: [angularKinematicsDiagram],
      paragraphs: [
        text(
          'Every point on a spinning drum moves in a different instantaneous direction, so tracking all points separately is wasteful. A rigid system keeps its shape, allowing one angular coordinate to describe its orientation about a specified axis.',
          '旋转滚筒上每个点的瞬时运动方向都不同,逐点追踪非常低效。刚体保持形状,因此可以用一个角坐标描述它绕指定轴的朝向。',
        ),
        text(
          'First decide whether center-of-mass motion alone answers the question. If orientation matters, the particle model is insufficient and the rigid-system model is needed.',
          '先判断只研究质心运动是否足够。如果物体朝向也重要,质点模型就不够,必须使用刚体模型。',
        ),
      ],
    },
    {
      heading: text('Definitions arise from rates of change', '由变化率引出定义'),
      bullets: [
        text('Choose the axis, zero-angle line, and positive rotational direction before calculating.', '计算前先选转轴、零角线和转动正方向。'),
        text('Use radians so angular and linear quantities connect directly.', '使用弧度,角量与线量才能直接连接。'),
        text('Clockwise and counterclockwise receive opposite signs; either convention works if it remains consistent.', '顺时针和逆时针取相反符号;只要全程一致,任一约定都可以。'),
      ],
      formulas: [
        formula('Angular displacement', '角位移', '\\Delta\\theta=\\theta-\\theta_0'),
        formula('Angular velocity', '角速度', '\\omega=\\frac{d\\theta}{dt}'),
        formula('Angular acceleration', '角加速度', '\\alpha=\\frac{d\\omega}{dt}'),
        formula('Integral links', '积分关系', '\\Delta\\theta=\\int\\omega\\,dt,\\qquad\\Delta\\omega=\\int\\alpha\\,dt'),
      ],
    },
    {
      heading: text('Classroom practice: three ways to read angular velocity–time graphs', '课堂练习：读取角速度—时间图像的三种方式'),
      images: angularVelocityGraphSet,
      paragraphs: [
        text(
          'Before calculating, identify what the question asks for: angular displacement comes from signed area, average angular acceleration comes from endpoint change divided by time, and average angular velocity comes from signed area divided by time.',
          '计算前先判断题目要求什么：角位移来自有符号面积，平均角加速度来自端点变化量除以时间，平均角速度来自有符号面积除以时间。',
        ),
      ],
      formulas: [
        formula('Angular displacement', '角位移', '\\Delta\\theta=\\int\\omega\\,dt'),
        formula('Average angular acceleration', '平均角加速度', '\\bar{\\alpha}=\\frac{\\omega_f-\\omega_i}{\\Delta t}'),
        formula('Average angular velocity', '平均角速度', '\\bar{\\omega}=\\frac{1}{\\Delta t}\\int\\omega\\,dt'),
      ],
      classroomQuestions: [
        angularDisplacementGraphPractice,
        averageAngularAccelerationGraphPractice,
        averageAngularVelocityGraphPractice,
      ],
      takeaway: text(
        'Area, endpoint change, and average value are different operations even when the same graph is reused.',
        '即使使用同一幅图像，面积、端点变化量和平均值仍是三种不同的运算。',
      ),
    },
    {
      heading: text('Constant angular acceleration: derive before using', '恒定角加速度:先检查条件再使用'),
      paragraphs: [
        text(
          'Only when $\\alpha$ is constant can the familiar constant-acceleration forms be used. The first two follow by integration; the third follows from $\\alpha=\\omega\\,d\\omega/d\\theta$.',
          '只有当 $\\alpha$ 恒定时才能使用匀角加速度公式。前两个由积分得到,第三个由 $\\alpha=\\omega\\,d\\omega/d\\theta$ 得到。',
        ),
      ],
      formulas: [
        formula('Angular velocity', '角速度', '\\omega=\\omega_0+\\alpha t'),
        formula('Angular position', '角位置', '\\theta=\\theta_0+\\omega_0t+\\frac12\\alpha t^2'),
        formula('Time-free form', '不含时间的形式', '\\omega^2=\\omega_0^2+2\\alpha(\\theta-\\theta_0)'),
      ],
      classroomQuestions: [angularGraphCheck],
      takeaway: text(
        'On graphs, slopes move from $\\theta$ to $\\omega$ to $\\alpha$; signed areas move in the reverse direction.',
        '在图像中,斜率把 $\\theta$ 连接到 $\\omega$ 再到 $\\alpha$;有符号面积沿相反方向连接。',
      ),
    },
    {
      heading: text('CED boundary', 'CED 考查边界'),
      bullets: [
        text('Angular directions are assessed as clockwise or counterclockwise about one specified axis.', '角量方向按相对指定轴的顺时针或逆时针考查。'),
        text('Full three-dimensional angular-kinematics vector analysis is not required.', '不要求完整的三维角运动学矢量分析。'),
      ],
    },
  ],
  studentVersion: studentVersion(
    '5.1 Rotational Kinematics',
    '5.1 转动运动学',
    'A compact calculus and graph map for angular position, velocity, and acceleration.',
    '角位置、角速度和角加速度的微积分与图像核心地图。',
    [
      {
        heading: text('Real phenomenon and model choice', '真实现象与模型选择'),
        images: [angularKinematicsDiagram],
        bullets: [
          text('Use a rigid-system model when orientation matters; use a particle/object model when center-of-mass motion is sufficient.', '朝向重要时使用刚体模型;只需质心运动时可用质点模型。'),
          text('Fix the axis, zero angle, and positive direction.', '固定转轴、零角位置和正方向。'),
        ],
      },
      {
        heading: text('Core calculus chain', '核心微积分链'),
        formulas: [
          formula('Definitions', '定义', '\\omega=\\frac{d\\theta}{dt},\\qquad\\alpha=\\frac{d\\omega}{dt}'),
          formula('Integral links', '积分关系', '\\Delta\\theta=\\int\\omega\\,dt,\\qquad\\Delta\\omega=\\int\\alpha\\,dt'),
        ],
        bullets: [text('Use the three constant-$\\alpha$ equations only after confirming $\\alpha$ is constant.', '确认 $\\alpha$ 恒定后才能使用三条匀角加速度公式。')],
      },
      {
        heading: text('Classroom practice: three ways to read angular velocity–time graphs', '课堂练习：读取角速度—时间图像的三种方式'),
        images: angularVelocityGraphSet,
        paragraphs: [
          text(
            'First decide whether the target is signed area, endpoint change, or an average over the interval.',
            '先判断目标量对应有符号面积、端点变化量，还是时间段内的平均值。',
          ),
        ],
        formulas: [
          formula('Angular displacement', '角位移', '\\Delta\\theta=\\int\\omega\\,dt'),
          formula('Average angular acceleration', '平均角加速度', '\\bar{\\alpha}=\\frac{\\omega_f-\\omega_i}{\\Delta t}'),
          formula('Average angular velocity', '平均角速度', '\\bar{\\omega}=\\frac{1}{\\Delta t}\\int\\omega\\,dt'),
        ],
        classroomQuestions: [
          angularDisplacementGraphPractice,
          averageAngularAccelerationGraphPractice,
          averageAngularVelocityGraphPractice,
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [angularGraphCheck] },
    ],
  ),
};

const linearAngularLesson: CurriculumLesson = {
  title: text('5.2 Connecting Linear and Rotational Motion: Why the Rim Moves Faster', '5.2 平动与转动的联系:为什么轮缘运动更快'),
  description: text(
    'Build the bridge from a shared angular displacement to the different linear motion of points at different radii.',
    '从刚体各点共享的角位移出发,连接不同半径处不同的线运动。',
  ),
  sections: [
    {
      heading: text('Hook: two stickers on one record', '钩子:唱片上的两个贴纸'),
      images: [angularKinematicsDiagram],
      paragraphs: [
        text(
          'Two stickers at different radii complete each revolution together. Their angular velocity and angular acceleration match, but the outer sticker traces a longer arc in the same time.',
          '不同半径上的两个贴纸同时完成每一圈。它们的角速度和角加速度相同,但外侧贴纸在同样时间内走过更长弧线。',
        ),
      ],
    },
    {
      heading: text('Derive the linear-angular bridge', '推导线量与角量的桥梁'),
      formulas: [
        formula('Arc length', '弧长', 's=r\\Delta\\theta'),
        formula('Tangential speed', '切向速率', 'v_T=r\\omega'),
        formula('Tangential acceleration', '切向加速度', 'a_T=r\\alpha'),
        formula('Radial acceleration: prior-unit connection', '径向加速度:前置知识连接', 'a_r=\\frac{v_T^2}{r}=r\\omega^2'),
      ],
      bullets: [
        text('All points on one rigid system share $\\theta$, $\\omega$, and $\\alpha$.', '同一刚体上的所有点共享 $\\theta$、$\\omega$ 和 $\\alpha$。'),
        text('Linear distance, tangential speed, and tangential acceleration scale with radius.', '线距离、切向速率和切向加速度随半径变化。'),
        text('$a_T$ changes speed; $a_r$ changes velocity direction.', '$a_T$ 改变速率;$a_r$ 改变速度方向。'),
      ],
      classroomQuestions: [radiusCheck],
    },
    {
      heading: text('Boundary and decision rule', '边界与判断规则'),
      takeaway: text(
        'First ask whether two points belong to the same rigid system. If yes, compare their shared angular quantities before using the radius to find linear quantities.',
        '先判断两点是否属于同一刚体。若属于,先确认它们共享的角量,再用半径求线量。',
      ),
    },
  ],
  studentVersion: studentVersion(
    '5.2 Linear-Angular Connections',
    '5.2 线量与角量的联系',
    'Use radius to translate shared angular motion into point-by-point linear motion.',
    '用半径把共享角运动转换成各点的线运动。',
    [
      {
        heading: text('Core bridge', '核心桥梁'),
        formulas: [
          formula('Position', '位置', 's=r\\Delta\\theta'),
          formula('Rates', '变化率', 'v_T=r\\omega,\\qquad a_T=r\\alpha,\\qquad a_r=r\\omega^2'),
        ],
        bullets: [text('Same rigid body: same $\\omega$ and $\\alpha$, but larger $r$ gives larger linear quantities.', '同一刚体:$\\omega$ 和 $\\alpha$ 相同,但更大的 $r$ 对应更大的线量。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [radiusCheck] },
    ],
  ),
};

const torqueLesson: CurriculumLesson = {
  title: text('5.3 Torque: Why the Same Force Rotates Differently', '5.3 力矩:为什么同样的力产生不同转动效果'),
  description: text(
    'Start from a door and wrench, then define torque only after force location and direction become necessary.',
    '从门和扳手的真实体验出发,在作用位置与方向变得必要后再定义力矩。',
  ),
  sections: [
    {
      heading: text('Hook: push the same door three ways', '钩子:用三种方式推同一扇门'),
      images: [torqueDiagram],
      paragraphs: [
        text(
          'A force near the hinge is less effective than the same force at the handle. A force along the door can do almost nothing even at the handle. Net force alone cannot encode these rotational differences.',
          '靠近铰链施力不如在门把手处施同样的力有效;即使在门把手处,沿门板方向施力也几乎不起作用。合力本身无法表示这些转动差异。',
        ),
      ],
    },
    {
      heading: text('Define torque from the missing geometry', '从缺失的几何信息定义力矩'),
      formulas: [
        formula('Vector definition', '矢量定义', '\\vec\\tau=\\vec r\\times\\vec F'),
        formula('Magnitude', '大小', '\\tau=rF\\sin\\phi=rF_{\\perp}=r_{\\perp}F'),
        formula('Net torque', '合力矩', '\\tau_{net}=\\sum_i\\tau_i'),
      ],
      bullets: [
        text('$\\vec r$ runs from the chosen axis to the point where the force acts.', '$\\vec r$ 从所选转轴指向力的作用点。'),
        text('The lever arm $r_{\\perp}$ is the perpendicular distance from the axis to the force line of action.', '力臂 $r_{\\perp}$ 是转轴到力的作用线的垂直距离。'),
        text('Use the right-hand rule for $\\vec r\\times\\vec F$, then apply a consistent planar sign convention.', '用右手定则判断 $\\vec r\\times\\vec F$,再采用一致的平面正负约定。'),
      ],
    },
    {
      heading: text('Force diagrams must preserve location', '受力图必须保留作用位置'),
      bullets: [
        text('Show relative force magnitude and direction as in a free-body diagram.', '像自由体图一样表示力的相对大小和方向。'),
        text('Also show the point of application and chosen axis, because both affect torque.', '还必须表示作用点和所选转轴,因为二者都会影响力矩。'),
        text('Use either perpendicular force or lever arm; do not include the sine factor twice.', '垂直力分量和力臂方法二选一;不要重复乘正弦因子。'),
      ],
      classroomQuestions: [torqueCheck],
    },
  ],
  studentVersion: studentVersion(
    '5.3 Torque',
    '5.3 力矩',
    'A geometry-first method for finding rotational effect about a chosen axis.',
    '围绕指定转轴计算转动效果的几何判断法。',
    [
      {
        heading: text('Model and formula', '模型与公式'),
        images: [torqueDiagram],
        formulas: [formula('Torque', '力矩', '\\vec\\tau=\\vec r\\times\\vec F,\\qquad\\tau=rF\\sin\\phi=r_{\\perp}F')],
        bullets: [
          text('Choose the axis first and keep the force application point visible.', '先选转轴,并保留力的作用点。'),
          text('A force whose line of action passes through the axis produces zero torque.', '作用线穿过转轴的力产生零力矩。'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [torqueCheck] },
    ],
  ),
};

const inertiaLesson: CurriculumLesson = {
  title: text('5.4 Rotational Inertia: Where the Mass Sits Matters', '5.4 转动惯量:质量分布在哪里很重要'),
  description: text(
    'Construct rotational inertia from point masses, extend it to continuous bodies with calculus, and enforce the College Board geometry boundary.',
    '从质点建立转动惯量,再用微积分推广到连续物体,并明确 College Board 的几何推导边界。',
  ),
  sections: [
    {
      heading: text('Hook: disk versus hoop', '钩子:圆盘与圆环'),
      images: [inertiaDiagram],
      paragraphs: [
        text(
          'Equal mass and equal outer radius do not guarantee equal resistance to angular acceleration. The hoop places more mass far from the axis, so the same torque changes its angular velocity more slowly.',
          '相同质量和外半径并不保证具有相同的转动响应。圆环把更多质量放在远离转轴的位置,所以同样力矩使其角速度变化得更慢。',
        ),
      ],
    },
    {
      heading: text('From discrete masses to a continuous body', '从离散质量到连续物体'),
      formulas: [
        formula('Point mass', '质点', 'I=mr^2'),
        formula('Discrete system', '离散系统', 'I_{tot}=\\sum_i m_ir_i^2'),
        formula('Continuous body', '连续物体', 'I=\\int r^2\\,dm'),
      ],
      bullets: [
        text('Always state the axis; $r$ is perpendicular distance to that axis.', '必须说明转轴;$r$ 是质量元到该轴的垂直距离。'),
        text('For a rod use $dm=\\lambda(x)dx$; for a disk built from rings use $dm=\\sigma 2\\pi r\\,dr$.', '细杆使用 $dm=\\lambda(x)dx$;把圆盘分成细环时使用 $dm=\\sigma 2\\pi r\\,dr$。'),
        text('For nonuniform density, first normalize the density from total mass.', '密度不均匀时,先利用总质量确定密度中的常数。'),
      ],
    },
    {
      heading: text('Required derivation targets and shifted axes', '必会推导结果与平行轴'),
      formulas: [
        formula('Uniform rod', '均匀细杆', 'I_{cm}=\\frac1{12}ML^2,\\qquad I_{end}=\\frac13ML^2'),
        formula('Shell, disk, annulus', '圆柱壳、圆盘与圆环体', 'I_{shell}=MR^2,\\quad I_{disk}=\\frac12MR^2,\\quad I_{annulus}=\\frac12M(R_1^2+R_2^2)'),
        formula('Parallel-axis theorem', '平行轴定理', 'I^{\\prime}=I_{cm}+Md^2'),
      ],
      bullets: [
        text('Among parallel axes in the same plane, the center-of-mass axis gives the minimum rotational inertia.', '同一平面内的平行轴中,穿过质心的轴给出最小转动惯量。'),
        text('The theorem requires parallel axes and begins from a center-of-mass-axis value.', '平行轴定理要求两轴平行,并从质心轴转动惯量出发。'),
      ],
      classroomQuestions: [inertiaCheck],
    },
    {
      heading: text('CED calculus boundary', 'CED 微积分边界'),
      bullets: [
        text('Required derivations: uniform or nonuniform thin rods about arbitrary perpendicular axes; thin cylindrical shells, disks, and coaxial ring/shell bodies about central axes.', '要求推导:均匀或非均匀细杆绕任意垂直轴;薄圆柱壳、圆盘以及由同轴圆环或壳组成的物体绕中心轴。'),
        text('Sphere, cone, and arbitrary three-dimensional inertia integrations are not required derivations; supplied values may still be used.', '不要求推导球体、圆锥和任意三维物体的转动惯量积分;题目给出的结果仍可能需要使用。'),
      ],
    },
  ],
  studentVersion: studentVersion(
    '5.4 Rotational Inertia',
    '5.4 转动惯量',
    'An axis-aware measure of how mass distribution resists angular acceleration.',
    '描述质量分布如何抵抗角加速度的转轴相关量。',
    [
      {
        heading: text('Core construction', '核心构造'),
        images: [inertiaDiagram],
        formulas: [
          formula('Discrete and continuous', '离散与连续', 'I=\\sum m_ir_i^2=\\int r^2\\,dm'),
          formula('Parallel axis', '平行轴', 'I^{\\prime}=I_{cm}+Md^2'),
        ],
        bullets: [text('State the axis, perpendicular distance, density relation, and limits before integrating.', '积分前说明转轴、垂直距离、密度关系和积分限。')],
      },
      {
        heading: text('Required results', '必会结果'),
        formulas: [
          formula('Rod', '细杆', 'I_{cm}=\\frac1{12}ML^2,\\quad I_{end}=\\frac13ML^2'),
          formula('Round bodies', '圆形物体', 'I_{shell}=MR^2,\\quad I_{disk}=\\frac12MR^2,\\quad I_{annulus}=\\frac12M(R_1^2+R_2^2)'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [inertiaCheck] },
    ],
  ),
};

const equilibriumLesson: CurriculumLesson = {
  title: text('5.5 Rotational Equilibrium: Zero Net Force Is Not Enough', '5.5 转动平衡:只有合力为零还不够'),
  description: text(
    'Use a supported platform to separate translational equilibrium from rotational equilibrium and learn deliberate pivot choice.',
    '用受支撑平台区分平动平衡与转动平衡,并学会有目的地选择取矩点。',
  ),
  sections: [
    {
      heading: text('Hook: a person walks across a suspended platform', '钩子:人在悬吊平台上行走'),
      images: [torqueDiagram],
      paragraphs: [
        text(
          'The platform can stay level while the support forces change as the person moves. Zero net force prevents center-of-mass acceleration, but only zero net torque prevents angular acceleration.',
          '人在平台上移动时,平台可以保持水平,但两端支撑力会改变。合力为零防止质心加速;只有合力矩为零才能防止角加速。',
        ),
      ],
    },
    {
      heading: text('Two independent equilibrium tests', '两个彼此独立的平衡条件'),
      formulas: [
        formula('Translational equilibrium', '平动平衡', '\\sum\\vec F=0'),
        formula('Rotational equilibrium', '转动平衡', '\\sum_i\\tau_i=0'),
        formula('Rotational first law', '转动形式的第一定律', '\\tau_{net}=0\\Rightarrow\\alpha=0\\Rightarrow\\omega=\\text{constant}'),
      ],
      bullets: [
        text('Equilibrium can mean constant nonzero velocity or angular velocity; it does not require rest.', '平衡可以对应非零的恒定速度或角速度,并不要求静止。'),
        text('A system may satisfy translational equilibrium without rotational equilibrium, or vice versa.', '系统可能只满足平动平衡而不满足转动平衡,反之亦然。'),
      ],
    },
    {
      heading: text('Reliable solution sequence', '可靠解题顺序'),
      bullets: [
        text('Choose the system and draw every external force at its application point.', '选择系统,并在作用点画出所有外力。'),
        text('Choose one pivot and take every torque about that same pivot.', '选择一个取矩点,所有力矩都相对同一点计算。'),
        text('A convenient pivot can remove unknown torques, but cannot change the physical answer.', '合适的取矩点可以消去未知力矩,但不会改变物理答案。'),
      ],
      classroomQuestions: [equilibriumCheck],
    },
    {
      heading: text('CED boundary', 'CED 考查边界'),
      bullets: [text('Simultaneous rotational analysis in multiple planes is not required.', '不要求同时分析多个平面内的转动。')],
    },
  ],
  studentVersion: studentVersion(
    '5.5 Rotational Equilibrium',
    '5.5 转动平衡',
    'Test force balance and torque balance separately.',
    '分别检验合力与合力矩。',
    [
      {
        heading: text('Two tests', '两个条件'),
        formulas: [
          formula('Translation', '平动', '\\sum\\vec F=0'),
          formula('Rotation', '转动', '\\sum\\tau=0'),
        ],
        bullets: [text('Choose one pivot and preserve all force application points.', '选择一个取矩点,并保留所有力的作用位置。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [equilibriumCheck] },
    ],
  ),
};

const rotationalDynamicsLesson: CurriculumLesson = {
  title: text("5.6 Newton's Second Law in Rotational Form: Translation and Rotation Together", '5.6 牛顿第二定律的转动形式:同时处理平动与转动'),
  description: text(
    'Connect net torque, rotational inertia, and angular acceleration, then combine the rotational equation with center-of-mass motion and apparatus constraints.',
    '连接合力矩、转动惯量和角加速度,再把转动方程与质心运动、装置约束联立。',
  ),
  sections: [
    {
      heading: text('Hook: why does a falling yo-yo accelerate less than free fall?', '钩子:下落 yo-yo 为什么比自由落体慢?'),
      images: [dynamicsDiagram],
      paragraphs: [
        text(
          'String tension reduces the downward center-of-mass acceleration and simultaneously supplies the torque that spins the yo-yo. One force diagram therefore feeds two separate equations.',
          '绳张力减小质心向下加速度,同时提供使 yo-yo 转动的力矩。同一张受力图需要导出两个独立方程。',
        ),
      ],
    },
    {
      heading: text('The rotational dynamics law', '转动动力学定律'),
      formulas: [
        formula("Newton's second law for rotation", '牛顿第二定律的转动形式', '\\sum\\tau=I\\alpha'),
        formula('Center-of-mass motion', '质心运动', '\\sum\\vec F=M\\vec a_{cm}'),
        formula('Typical no-slip constraint', '典型无滑动约束', 'a=r\\alpha'),
      ],
      bullets: [
        text('Angular acceleration points with the net torque and is inversely proportional to $I$.', '角加速度与合力矩同方向,并与 $I$ 成反比。'),
        text('Linear and rotational analyses describe different aspects of the same rigid-system motion.', '平动与转动分析描述同一刚体运动的不同方面。'),
        text('If a graph plots $\\tau_{net}$ vertically against $\\alpha$ horizontally, its slope is $I$.', '若纵轴为 $\\tau_{net}$、横轴为 $\\alpha$,图像斜率就是 $I$。'),
      ],
    },
    {
      heading: text('Coupled-system workflow', '耦合系统流程'),
      bullets: [
        text('Draw forces, write $\\sum F=Ma_{cm}$, write $\\sum\\tau=I\\alpha$, add the geometric constraint, then solve.', '画受力图,写 $\\sum F=Ma_{cm}$,写 $\\sum\\tau=I\\alpha$,加入几何约束,再联立求解。'),
        text('Check limiting cases: $I\\to0$ should approach a massless rotating component; increasing $I$ at fixed torque should reduce $\\alpha$.', '检查极限情形:$I\\to0$ 应接近无质量转动部件;固定力矩下增大 $I$ 应减小 $\\alpha$。'),
        text('If mass distribution changes, do not treat $I$ as constant; use angular momentum methods.', '质量分布改变时不要把 $I$ 当常数,应使用角动量方法。'),
      ],
      classroomQuestions: [rotationalDynamicsCheck],
    },
  ],
  studentVersion: studentVersion(
    "5.6 Newton's Second Law for Rotation",
    '5.6 牛顿第二定律的转动形式',
    'A three-equation workflow for systems that translate and rotate.',
    '处理同时平动和转动系统的三方程流程。',
    [
      {
        heading: text('Core workflow', '核心流程'),
        images: [dynamicsDiagram],
        formulas: [
          formula('Translation', '平动', '\\sum\\vec F=M\\vec a_{cm}'),
          formula('Rotation', '转动', '\\sum\\tau=I\\alpha'),
          formula('Constraint', '约束', 'a=r\\alpha\\quad\\text{when no slip applies}'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [rotationalDynamicsCheck] },
    ],
  ),
};

const rotationalEnergyLesson: CurriculumLesson = {
  title: text('6.1 Rotational Kinetic Energy: Energy Without Center-of-Mass Motion', '6.1 转动动能:质心不动也可以具有能量'),
  description: text(
    'Sum the kinetic energy of all moving mass elements to derive rotational kinetic energy and the center-of-mass decomposition.',
    '把所有运动质量元的动能相加,推导转动动能与质心动能分解。',
  ),
  sections: [
    {
      heading: text('Hook: a spinning bicycle wheel on a stand', '钩子:支架上旋转的自行车轮'),
      images: [inertiaDiagram],
      paragraphs: [
        text(
          'The wheel center is stationary, yet the wheel can drive a generator or heat a brake. The particle model of the center misses the motion and energy of the rest of the rigid body.',
          '车轮中心静止,但旋转车轮仍能驱动发电机或使刹车发热。只研究质心的质点模型会遗漏刚体其余部分的运动与能量。',
        ),
      ],
    },
    {
      heading: text('Derive rotational kinetic energy', '推导转动动能'),
      paragraphs: [
        text(
          'For a body rotating about a fixed axis, each mass element has $v_i=r_i\\omega$. Summing $m_iv_i^2/2$ produces the rotational inertia naturally.',
          '物体绕固定轴转动时,每个质量元满足 $v_i=r_i\\omega$。把所有 $m_iv_i^2/2$ 相加会自然产生转动惯量。',
        ),
      ],
      formulas: [
        formula('Particle-sum derivation', '质点求和推导', 'K=\\sum_i\\frac12m_i(r_i\\omega)^2=\\frac12I\\omega^2'),
        formula('Rotation about a fixed axis', '绕固定轴转动', 'K_{rot}=\\frac12I\\omega^2'),
        formula('Translation plus rotation about CM', '质心平动加绕质心转动', 'K_{total}=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2'),
      ],
      bullets: [
        text('Rotational kinetic energy is scalar, so reversing rotation does not make it negative.', '转动动能是标量,反向转动不会使它变为负值。'),
        text('For fixed-axis pure rotation, $K_{rot}$ is the total kinetic energy of the body.', '对绕固定轴的纯转动,$K_{rot}$ 就是物体的总动能。'),
      ],
      classroomQuestions: [rotationalEnergyCheck],
    },
  ],
  studentVersion: studentVersion(
    '6.1 Rotational Kinetic Energy',
    '6.1 转动动能',
    'Derive energy from the motion of every point in the rigid body.',
    '从刚体每个点的运动推导能量。',
    [
      {
        heading: text('Core derivation', '核心推导'),
        formulas: [
          formula('Rotational energy', '转动动能', 'K_{rot}=\\sum_i\\frac12m_i(r_i\\omega)^2=\\frac12I\\omega^2'),
          formula('General rigid-body energy', '一般刚体动能', 'K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [rotationalEnergyCheck] },
    ],
  ),
};

const torqueWorkLesson: CurriculumLesson = {
  title: text('6.2 Torque and Work: Energy Transfer Requires Angular Displacement', '6.2 力矩与功:能量转移需要角位移'),
  description: text(
    'Derive rotational work from linear work and distinguish torque-angle area from torque-time area.',
    '从线性功推导转动功,并区分力矩-角度面积与力矩-时间面积。',
  ),
  sections: [
    {
      heading: text('Hook: pushing on a stuck bolt', '钩子:用力拧一颗卡死的螺栓'),
      images: [torqueDiagram],
      paragraphs: [
        text(
          'A large torque can act while the bolt has zero angular displacement. Mechanical work on the bolt requires both torque and rotation through an angle.',
          '即使施加很大力矩,卡死的螺栓角位移仍为零。对螺栓完成机械功需要力矩和角位移同时存在。',
        ),
      ],
    },
    {
      heading: text('From linear work to rotational work', '从线性功到转动功'),
      formulas: [
        formula('Differential work', '微元功', 'dW=\\vec F\\cdot d\\vec s=\\tau\\,d\\theta'),
        formula('Work by variable torque', '变力矩做功', 'W=\\int_{\\theta_1}^{\\theta_2}\\tau(\\theta)\\,d\\theta'),
        formula('Rotational work-energy theorem', '转动功-能定理', 'W_{net}=\\Delta K_{rot}'),
      ],
      bullets: [
        text('Constant torque gives $W=\\tau\\Delta\\theta$.', '恒定力矩时 $W=\\tau\\Delta\\theta$。'),
        text('Signed area under a $\\tau$-versus-$\\theta$ graph is work.', '$\\tau$-$\\theta$ 图像下的有符号面积表示功。'),
        text('Area under a $\\tau$-versus-$t$ graph is angular impulse, not work.', '$\\tau$-$t$ 图像下的面积表示角冲量,不是功。'),
      ],
      classroomQuestions: [torqueWorkCheck],
    },
    {
      heading: text('Scope note', '范围说明'),
      bullets: [text('$P=\\tau\\omega$ is useful enrichment, but it is not an explicit required statement in Topic 6.2.', '$P=\\tau\\omega$ 是有用的拓展关系,但并非 Topic 6.2 明确列出的必考陈述。')],
    },
  ],
  studentVersion: studentVersion(
    '6.2 Torque and Work',
    '6.2 力矩与功',
    'Read rotational energy transfer from torque through angle.',
    '从力矩跨越角位移理解转动能量转移。',
    [
      {
        heading: text('Core relation', '核心关系'),
        formulas: [
          formula('Rotational work', '转动功', 'W=\\int\\tau\\,d\\theta'),
          formula('Work-energy', '功-能', 'W_{net}=\\Delta K_{rot}'),
        ],
        bullets: [text('Torque-angle area is work; torque-time area is angular impulse.', '力矩-角度面积是功;力矩-时间面积是角冲量。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [torqueWorkCheck] },
    ],
  ),
};

const angularImpulseLesson: CurriculumLesson = {
  title: text('6.3 Angular Momentum and Angular Impulse: Torque Accumulated Over Time', '6.3 角动量与角冲量:力矩随时间累积'),
  description: text(
    'Separate rigid-body and particle angular momentum, then connect torque-time area with change in angular momentum.',
    '区分刚体与质点的角动量表达式,再把力矩-时间面积连接到角动量变化。',
  ),
  sections: [
    {
      heading: text('Hook: stop a flywheel quickly or gradually', '钩子:让飞轮快速或缓慢停下'),
      images: [angularMomentumDiagram],
      paragraphs: [
        text(
          'A large braking torque acting briefly and a smaller torque acting longer can create the same change in rotational state. The accumulated quantity is angular impulse.',
          '很大的制动力矩短暂作用,或较小力矩长时间作用,都可能产生相同的转动状态变化。累积量就是角冲量。',
        ),
      ],
    },
    {
      heading: text('Two angular-momentum models', '两种角动量模型'),
      formulas: [
        formula('Rigid system about an axis', '刚体相对转轴', 'L=I\\omega'),
        formula('Particle or object about a point', '质点或物体相对参考点', '\\vec L=\\vec r\\times\\vec p'),
        formula('Magnitude for a particle', '质点角动量大小', 'L=rmv\\sin\\phi=p\\,r_{\\perp}'),
      ],
      bullets: [
        text('A straight-moving object can have angular momentum about a point even though it does not move in a circle.', '直线运动物体即使不沿圆周运动,相对某参考点仍可具有角动量。'),
        text('Changing the reference point or axis can change the measured angular momentum.', '改变参考点或转轴会改变测得的角动量。'),
      ],
    },
    {
      heading: text('Angular impulse changes angular momentum', '角冲量改变角动量'),
      formulas: [
        formula('Angular impulse-momentum theorem', '角冲量-角动量定理', '\\Delta L=L_f-L_i=\\int_{t_1}^{t_2}\\tau_{net}\\,dt'),
        formula('Rate form', '变化率形式', '\\tau_{net}=\\frac{dL}{dt}'),
        formula('Constant-inertia case', '转动惯量恒定时', '\\tau_{net}=I\\frac{d\\omega}{dt}=I\\alpha'),
      ],
      bullets: [
        text('Angular impulse points in the same direction as the torque that produces it.', '角冲量方向与产生它的力矩方向相同。'),
        text('The slope of an $L$-$t$ graph is net torque; the area under a $\\tau$-$t$ graph is $\\Delta L$.', '$L$-$t$ 图像斜率是合力矩;$\\tau$-$t$ 图像下面积是 $\\Delta L$。'),
        text('Keep signs when rotation reverses; do not subtract only magnitudes.', '转动反向时保留正负号,不能只用大小相减。'),
      ],
      classroomQuestions: [angularImpulseCheck],
    },
  ],
  studentVersion: studentVersion(
    '6.3 Angular Momentum and Angular Impulse',
    '6.3 角动量与角冲量',
    'Choose the correct angular-momentum model and connect torque-time area to its change.',
    '选择正确角动量模型,并把力矩-时间面积连接到角动量变化。',
    [
      {
        heading: text('Choose the model', '选择模型'),
        images: [angularMomentumDiagram],
        formulas: [
          formula('Rigid system', '刚体', 'L=I\\omega'),
          formula('Particle/object', '质点或物体', '\\vec L=\\vec r\\times\\vec p'),
          formula('Angular impulse', '角冲量', '\\Delta L=\\int\\tau_{net}\\,dt'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [angularImpulseCheck] },
    ],
  ),
};

const angularMomentumConservationLesson: CurriculumLesson = {
  title: text('6.4 Conservation of Angular Momentum: System Choice Comes First', '6.4 角动量守恒:先选择系统'),
  description: text(
    'Use system boundaries and external angular impulse to decide when total angular momentum remains constant.',
    '用系统边界和外部角冲量判断总角动量何时保持不变。',
  ),
  sections: [
    {
      heading: text('Hook: pulling masses inward on a rotating chair', '钩子:在旋转椅上把重物向内收'),
      images: [angularMomentumDiagram],
      paragraphs: [
        text(
          'The person spins faster without a significant external torque. The change is not mysterious: moving mass inward reduces $I$, so $\\omega$ rises while total angular momentum remains constant.',
          '人在没有显著外力矩时转得更快。这并不神秘:质量向内移动使 $I$ 减小,因此在总角动量不变时 $\\omega$ 增大。',
        ),
      ],
    },
    {
      heading: text('Conservation begins with a boundary and axis', '守恒从系统边界与转轴开始'),
      formulas: [
        formula('System total', '系统总角动量', 'L_{system}=\\sum_iL_i'),
        formula('Conservation condition', '守恒条件', '\\tau_{ext,net}=0\\Rightarrow L_i=L_f'),
        formula('Changing mass distribution', '改变质量分布', 'I_i\\omega_i=I_f\\omega_f'),
      ],
      bullets: [
        text('Internal interaction pairs deliver equal and opposite angular impulses when measured about the same axis.', '相对同一转轴,内力相互作用产生大小相等、方向相反的角冲量。'),
        text('Zero external force is not required; zero net external torque about the chosen axis is the condition.', '不要求外力为零;条件是相对所选转轴的合外力矩为零。'),
        text('If external torque is nonzero, angular momentum transfers between system and environment.', '若合外力矩不为零,角动量会在系统与环境之间转移。'),
      ],
    },
    {
      heading: text('Energy is a separate test', '能量需要单独判断'),
      paragraphs: [
        text(
          'A person pulling inward does internal work, so rotational kinetic energy can change even when angular momentum is conserved. In a sticking rotational collision, angular momentum may be conserved while kinetic energy decreases.',
          '人收紧手臂时会通过内部做功改变转动动能。发生粘连的转动碰撞中,角动量可能守恒,但动能减小。',
        ),
      ],
      classroomQuestions: [conservationCheck],
    },
  ],
  studentVersion: studentVersion(
    '6.4 Conservation of Angular Momentum',
    '6.4 角动量守恒',
    'A system-and-axis decision rule for angular momentum conservation.',
    '基于系统与转轴选择的角动量守恒判断法。',
    [
      {
        heading: text('Decision rule', '判断规则'),
        formulas: [
          formula('External angular impulse', '外部角冲量', '\\Delta L_{system}=\\int\\tau_{ext}\\,dt'),
          formula('Conservation', '守恒', '\\int\\tau_{ext}\\,dt=0\\Rightarrow L_i=L_f'),
        ],
        bullets: [
          text('Add every part about the same axis and check energy separately.', '相对同一转轴相加各部分角动量,并单独判断能量。'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [conservationCheck] },
    ],
  ),
};

const rollingLesson: CurriculumLesson = {
  title: text('6.5 Rolling: Translation and Rotation at One Contact Point', '6.5 滚动:在接触点连接平动与转动'),
  description: text(
    'Diagnose no-slip versus slipping before combining kinematics, energy, friction, and rotational dynamics.',
    '先判断无滑动还是滑动,再结合运动学、能量、摩擦与转动动力学。',
  ),
  sections: [
    {
      heading: text('Hook: why does the disk beat the hoop?', '钩子:为什么圆盘比圆环先到底?'),
      images: [rollingDiagram],
      paragraphs: [
        text(
          'A disk and hoop released from the same height lose the same gravitational potential energy, but they divide it differently between center-of-mass translation and rotation.',
          '圆盘和圆环从同一高度释放时损失相同重力势能,但它们在质心平动与转动之间的能量分配不同。',
        ),
      ],
    },
    {
      heading: text('No-slip kinematics and velocity map', '无滑动运动学与速度图'),
      formulas: [
        formula('No-slip displacement', '无滑动位移', '\\Delta x_{cm}=R\\Delta\\theta'),
        formula('No-slip rates', '无滑动变化率', 'v_{cm}=R\\omega,\\qquad a_{cm}=R\\alpha'),
      ],
      bullets: [
        text('In the ground frame, the top point has speed $2v_{cm}$, the center has $v_{cm}$, and the contact point is instantaneously at rest.', '在地面参考系中,顶部点速率为 $2v_{cm}$,中心为 $v_{cm}$,接触点瞬时静止。'),
        text('No slip is a kinematic constraint, not a force law.', '无滑动是运动学约束,不是力学定律。'),
      ],
    },
    {
      heading: text('Energy and dynamics of ideal rolling', '理想滚动的能量与动力学'),
      formulas: [
        formula('Total kinetic energy', '总动能', 'K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2'),
        formula('Speed from height', '由高度求速度', 'v^2=\\frac{2gh}{1+I_{cm}/(MR^2)}'),
        formula('Acceleration down an incline', '沿斜面加速度', 'a_{cm}=\\frac{g\\sin\\theta}{1+I_{cm}/(MR^2)}'),
      ],
      bullets: [
        text('Ideal static friction in no-slip rolling does not dissipate mechanical energy.', '无滑动滚动中的理想静摩擦不耗散机械能。'),
        text('Static friction can be nonzero or zero; its direction must come from the required translation and rotation, not memorization.', '静摩擦可以非零也可以为零;其方向应由所需平动与转动判断,不能死记。'),
      ],
      classroomQuestions: [rollingCheck],
    },
    {
      heading: text('When slipping begins', '发生滑动时'),
      bullets: [
        text('Do not impose $v_{cm}=R\\omega$ during slipping.', '滑动时不能使用 $v_{cm}=R\\omega$。'),
        text('The kinetic-friction application point moves relative to the surface, so mechanical energy is dissipated.', '动摩擦力作用点相对表面发生位移,因此机械能被耗散。'),
        text('Rolling resistance is outside the AP Physics C: Mechanics scope.', '滚动阻力不在 AP Physics C: Mechanics 考查范围内。'),
      ],
    },
  ],
  studentVersion: studentVersion(
    '6.5 Rolling',
    '6.5 滚动',
    'Diagnose contact first, then choose the kinematic, energy, and force relations.',
    '先判断接触状态,再选择运动学、能量和受力关系。',
    [
      {
        heading: text('No slip', '无滑动'),
        images: [rollingDiagram],
        formulas: [
          formula('Constraint', '约束', 'v_{cm}=R\\omega,\\qquad a_{cm}=R\\alpha'),
          formula('Energy', '能量', 'K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2'),
        ],
        bullets: [text('Ideal static friction does not dissipate energy.', '理想静摩擦不耗散能量。')],
      },
      {
        heading: text('Slip', '滑动'),
        bullets: [
          text('$v_{cm}$ and $R\\omega$ are independent; kinetic friction dissipates mechanical energy.', '$v_{cm}$ 与 $R\\omega$ 不再直接相等;动摩擦耗散机械能。'),
        ],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [rollingCheck] },
    ],
  ),
};

const orbitingSatellitesLesson: CurriculumLesson = {
  title: text('6.6 Motion of Orbiting Satellites: Energy and Angular Momentum Set the Orbit', '6.6 轨道卫星运动:能量与角动量约束轨道'),
  description: text(
    'Use a gravity-only model to compare circular and elliptical orbits and derive circular-orbit energy and escape speed.',
    '使用只受引力模型比较圆轨道与椭圆轨道,并推导圆轨道能量与逃逸速度。',
  ),
  sections: [
    {
      heading: text('Hook: why is a satellite faster when it is closer?', '钩子:卫星为什么靠近中心天体时更快?'),
      images: [orbitDiagram],
      paragraphs: [
        text(
          'An elliptical-orbit satellite speeds up near periapsis and slows near apoapsis without an engine repeatedly firing. Energy and angular momentum reveal what changes and what remains fixed.',
          '椭圆轨道卫星在近地点加速、远地点减速,却不需要发动机反复点火。能量与角动量能够说明哪些量变化、哪些量保持不变。',
        ),
      ],
    },
    {
      heading: text('Model and gravitational potential reference', '模型与引力势能参考点'),
      bullets: [
        text('Assume central mass $M$ is much larger than satellite mass $m$, so central-body motion is negligible.', '假设中心天体质量 $M$ 远大于卫星质量 $m$,因此可忽略中心天体运动。'),
        text('Assume gravity only: no drag, thrust, or third-body perturbation.', '只考虑引力:忽略阻力、推进和第三天体扰动。'),
        text('Measure $r$ center to center and define potential energy to be zero at infinity.', '距离 $r$ 从中心到中心测量,并规定无穷远处势能为零。'),
      ],
      formulas: [formula('Gravitational potential energy', '引力势能', 'U(\\infty)=0,\\qquad U(r)=-\\frac{GMm}{r}')],
    },
    {
      heading: text('Circular-orbit energy', '圆轨道能量'),
      paragraphs: [
        text(
          'Gravity supplying centripetal force gives $GMm/r^2=mv^2/r$. Substitution into kinetic energy produces the fixed circular-orbit ratios.',
          '由引力提供向心力得到 $GMm/r^2=mv^2/r$。代入动能即可得到圆轨道中的固定能量比例。',
        ),
      ],
      formulas: [
        formula('Circular speed', '圆轨道速度', 'v_{circ}=\\sqrt{\\frac{GM}{r}}'),
        formula('Circular energy relations', '圆轨道能量关系', 'K=-\\frac12U=\\frac{GMm}{2r},\\qquad E=\\frac12U=-\\frac{GMm}{2r}'),
        formula('Circular period', '圆轨道周期', 'T^2=\\frac{4\\pi^2r^3}{GM}'),
      ],
      bullets: [text('For one fixed circular orbit, $E$, $U$, $K$, and $L$ are all constant.', '对一个固定圆轨道,$E$、$U$、$K$ 和 $L$ 都保持不变。')],
    },
    {
      heading: text('Elliptical orbit and escape threshold', '椭圆轨道与逃逸临界'),
      formulas: [
        formula('Angular momentum at a point', '某点的角动量', 'L=mr v_{\\perp}'),
        formula('Escape energy condition', '逃逸能量条件', 'E=0'),
        formula('Escape speed', '逃逸速度', 'v_{esc}=\\sqrt{\\frac{2GM}{r}}=\\sqrt2\\,v_{circ}'),
      ],
      bullets: [
        text('In an ellipse, total mechanical energy and angular momentum are constant; $K$ and $U$ each change.', '椭圆轨道中总机械能和角动量守恒;$K$ 与 $U$ 分别变化。'),
        text('At the ideal escape threshold, the satellite approaches zero speed only as $r\\to\\infty$; gravity does not vanish at finite distance.', '理想逃逸临界状态下,卫星只在 $r\\to\\infty$ 时趋近零速度;引力不会在有限距离突然消失。'),
        text('Hohmann transfers, propulsion, atmospheric drag, orbit-equation derivation, and multibody perturbations are outside this lesson.', '霍曼转移、推进、空气阻力、轨道方程推导和多体扰动不属于本课范围。'),
      ],
      classroomQuestions: [orbitCheck],
    },
  ],
  studentVersion: studentVersion(
    '6.6 Motion of Orbiting Satellites',
    '6.6 轨道卫星运动',
    'A conservation-law map for circular orbits, elliptical orbits, and escape.',
    '用守恒定律分析圆轨道、椭圆轨道与逃逸。',
    [
      {
        heading: text('Model and potential', '模型与势能'),
        images: [orbitDiagram],
        formulas: [formula('Potential energy', '势能', 'U=-\\frac{GMm}{r},\\qquad U(\\infty)=0')],
        bullets: [text('Use $M\\gg m$ and gravity only; measure $r$ center to center.', '采用 $M\\gg m$ 且只受引力的模型;$r$ 从中心到中心测量。')],
      },
      {
        heading: text('Conservation map', '守恒地图'),
        formulas: [
          formula('Circular orbit', '圆轨道', 'K=-\\frac12U,\\qquad E=-\\frac{GMm}{2r}'),
          formula('Escape', '逃逸', 'E=0\\Rightarrow v_{esc}=\\sqrt{\\frac{2GM}{r}}'),
        ],
        bullets: [text('Ellipse: $E$ and $L$ constant; $K$ and $U$ change.', '椭圆轨道:$E$ 与 $L$ 守恒;$K$ 与 $U$ 变化。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [orbitCheck] },
    ],
  ),
};

export const rotationalDynamicsLessons: CurriculumLesson[] = [
  rotationalKinematicsLesson,
  linearAngularLesson,
  torqueLesson,
  inertiaLesson,
  equilibriumLesson,
  rotationalDynamicsLesson,
];

export const rotatingSystemsLessons: CurriculumLesson[] = [
  rotationalEnergyLesson,
  torqueWorkLesson,
  angularImpulseLesson,
  angularMomentumConservationLesson,
  rollingLesson,
  orbitingSatellitesLesson,
];
