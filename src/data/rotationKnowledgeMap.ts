import type {
  CurriculumClassroomQuestion,
  CurriculumFormula,
  CurriculumImage,
  CurriculumLesson,
  CurriculumLessonContent,
  CurriculumTable,
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
  sourceLabel: text('Original Pocket Cosmos diagram', '口袋寰宇原创示意图'),
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

const parallelAxisDiagram = originalDiagram(
  'parallel-axis-theorem.svg',
  'A rigid body with a center-of-mass axis and a parallel axis shifted by distance d.',
  '刚体的质心轴与平移距离 d 的平行轴。',
  'The parallel-axis theorem shifts a center-of-mass-axis inertia by $Md^2$; the CM axis gives the minimum among parallel axes.',
  '平行轴定理在质心轴转动惯量上加 $Md^2$;平行轴中质心轴给出最小值。',
);

const parallelAxisDerivationDiagram = originalDiagram(
  'parallel-axis-derivation.svg',
  'Top view of the center-of-mass axis, a parallel axis at distance d, and a mass element with distance vectors r and r-prime.',
  '俯视图:质心轴、距离 d 的平行轴,以及带距离矢量 r 与 r′ 的质量元。',
  'Expand $r^{\\prime2}=r^2-2dx+d^2$ and integrate term by term; the cross term vanishes because the origin is the center of mass.',
  '展开 $r^{\\prime2}=r^2-2dx+d^2$ 后逐项积分;交叉项因为原点取在质心而消失。',
);

const equilibriumBeamDiagram = originalDiagram(
  'equilibrium-beam.svg',
  'A beam on two supports carrying a load, with forces drawn at their application points.',
  '双支撑梁承受载荷,各力画在作用点上。',
  'Translational and rotational equilibrium must be tested separately, and every torque must be taken about one chosen pivot.',
  '平动与转动平衡必须分别检验,且所有力矩都相对同一个取矩点计算。',
);

const dynamicsDiagram = originalDiagram(
  'rotational-dynamics.svg',
  'A falling yo-yo with force, torque, and kinematic constraint labels.',
  '下落 yo-yo 的受力、力矩和运动学约束。',
  'Translation and rotation require separate equations connected by the no-slip string constraint.',
  '平动和转动需要分别列方程,再由绳不打滑的约束连接。',
);

const torqueGraphAreasDiagram = originalDiagram(
  'torque-graph-areas.svg',
  'Two graphs: torque versus angular position and torque versus time, each with a shaded area.',
  '力矩-角位置图像与力矩-时间图像,各自标出阴影面积。',
  'Torque-through-angle area is work (energy transfer); torque-through-time area is angular impulse (angular momentum transfer).',
  '力矩对角位移的面积是功(能量转移);力矩对时间的面积是角冲量(角动量转移)。',
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

const rollingInclineEnergyDiagram = originalDiagram(
  'rolling-incline-energy.svg',
  'A disk rolling down an incline with an energy bar chart splitting potential energy into translational and rotational kinetic energy.',
  '圆盘沿斜面滚下,能量条图把势能分为平动动能与转动动能。',
  'The lost gravitational potential energy divides between center-of-mass translation and rotation; a larger inertia fraction lowers the final speed.',
  '损失的重力势能在质心平动与转动之间分配;转动惯量占比越大,末速度越小。',
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
    ['D', 'Graph D', '图像 D'],
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

const ekTable = (rows: Array<[string, string, string]>): CurriculumTable => ({
  caption: text('CED essential knowledge checklist', 'CED 必备知识点清单'),
  headers: [text('CED code', 'CED 编号'), text('What you must know', '必须掌握的内容')],
  rows: rows.map(([code, en, zh]) => [text(code, code), text(en, zh)]),
});

const loSection = (introEn: string, introZh: string, los: Array<[string, string, string]>) => ({
  heading: text('CED learning objectives', 'CED 学习目标'),
  paragraphs: [text(introEn, introZh)],
  bullets: los.map(([code, en, zh]) => text(`${code} · ${en}`, `${code} · ${zh}`)),
});

const rotationalKinematicsLesson: CurriculumLesson = {
  title: text('5.1 Rotational Kinematics: One Angle for an Entire Rigid System', '5.1 转动运动学:用一个角度描述整个刚体'),
  description: text(
    'CED Topic 5.1 (LO 5.1.A): angular displacement, angular velocity, and angular acceleration with calculus and graph relations, plus the rigid-system model decision.',
    '对应 CED Topic 5.1(学习目标 5.1.A):角位移、角速度、角加速度的微积分与图像关系,以及刚体模型的选择判断。',
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
    loSection(
      'Topic 5.1 has one learning objective covering the full angular kinematics chain.',
      'Topic 5.1 只有一个学习目标,覆盖完整的角运动学链条。',
      [
        ['5.1.A', 'Describe the rotation of a system with respect to time using angular displacement, angular velocity, and angular acceleration.', '用角位移、角速度和角加速度描述系统随时间的转动。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.1.A.1', 'Angular displacement is the angle, in radians, through which a point on a rigid system rotates about a specified axis: $\\Delta\\theta=\\theta-\\theta_0$.', '角位移是刚体上一点绕指定转轴转过的角度(以弧度计):$\\Delta\\theta=\\theta-\\theta_0$。'],
        ['5.1.A.1.i', 'A rigid system keeps its shape while different points move in different directions during rotation; it cannot be modeled as a single object.', '刚体保持形状,但转动时不同点的运动方向不同;不能当作单个质点建模。'],
        ['5.1.A.1.ii', 'One rotation direction (clockwise or counterclockwise) is chosen as positive; the opposite direction is negative.', '任选一个转动方向(顺时针或逆时针)为正,相反方向为负。'],
        ['5.1.A.1.iii', 'If rotation is negligible for the question, the system may be treated as a single object (e.g., Earth revolving about the Earth–Sun center of mass).', '若转动对问题可忽略,系统可视为单个物体(如地球绕日地质心公转)。'],
        ['5.1.A.2', 'Angular velocity is the rate of change of angular position: $\\omega=d\\theta/dt$.', '角速度是角位置对时间的变化率:$\\omega=d\\theta/dt$。'],
        ['5.1.A.3', 'Angular acceleration is the rate of change of angular velocity: $\\alpha=d\\omega/dt$.', '角加速度是角速度对时间的变化率:$\\alpha=d\\omega/dt$。'],
        ['5.1.A.4', 'Angular displacement, velocity, and acceleration about one axis are fully analogous to one-dimensional linear quantities and obey the same mathematical relationships.', '绕单一转轴的角位移、角速度、角加速度与一维线量完全类似,遵循相同的数学关系。'],
        ['5.1.A.4.i', 'Constant angular acceleration permits the three constant-acceleration equations (see formulas below).', '角加速度恒定时,可以使用三条匀角加速度公式(见下方公式)。'],
        ['5.1.A.4.ii', 'Graphs of $\\theta(t)$, $\\omega(t)$, and $\\alpha(t)$ connect through slopes and signed areas.', '$\\theta(t)$、$\\omega(t)$、$\\alpha(t)$ 图像通过斜率和有符号面积相互连接。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('Angular velocity and acceleration', '角速度与角加速度', '\\omega=\\frac{d\\theta}{dt},\\qquad\\alpha=\\frac{d\\omega}{dt}'),
        formula('Integral links', '积分关系', '\\Delta\\theta=\\int\\omega\\,dt,\\qquad\\Delta\\omega=\\int\\alpha\\,dt'),
        formula('Constant $\\alpha$: velocity', '恒定 $\\alpha$:角速度', '\\omega=\\omega_0+\\alpha t'),
        formula('Constant $\\alpha$: position', '恒定 $\\alpha$:角位置', '\\theta=\\theta_0+\\omega_0t+\\frac12\\alpha t^2'),
        formula('Constant $\\alpha$: time-free', '恒定 $\\alpha$:不含时间', '\\omega^2=\\omega_0^2+2\\alpha(\\theta-\\theta_0)'),
      ],
      bullets: [
        text('Use the constant-$\\alpha$ forms only after confirming $\\alpha$ is constant; the first two follow by integration, the third from $\\alpha=\\omega\\,d\\omega/d\\theta$.', '确认 $\\alpha$ 恒定后才能使用匀角加速度公式;前两条由积分得到,第三条由 $\\alpha=\\omega\\,d\\omega/d\\theta$ 得到。'),
        text('Use radians so angular and linear quantities connect directly.', '使用弧度,角量与线量才能直接连接。'),
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
      heading: text('CED boundary', 'CED 考查边界'),
      bullets: [
        text('Students manipulate magnitudes of angular quantities with vector conventions, but angular vector directions are not assessed.', '学生需要用矢量约定处理角量大小,但角矢量的方向不作考查。'),
        text('Direction descriptions are limited to clockwise or counterclockwise about a given axis.', '方向描述限于相对给定转轴的顺时针或逆时针。'),
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
        heading: text('Essential knowledge checklist', '必备知识点清单'),
        table: ekTable([
          ['5.1.A.1', 'Angular displacement in radians about a specified axis.', '绕指定转轴、以弧度计的角位移。'],
          ['5.1.A.1.i–iii', 'Rigid systems cannot be objects; sign convention is chosen; negligible rotation allows object treatment.', '刚体不能当质点;正方向自选;转动可忽略时可当物体处理。'],
          ['5.1.A.2 / 5.1.A.3', '$\\omega=d\\theta/dt$ and $\\alpha=d\\omega/dt$.', '$\\omega=d\\theta/dt$ 与 $\\alpha=d\\omega/dt$。'],
          ['5.1.A.4.i / .ii', 'Constant-$\\alpha$ equations apply only for constant $\\alpha$; graphs link by slope and signed area.', '匀角加速度公式仅在 $\\alpha$ 恒定时成立;图像用斜率与有符号面积连接。'],
        ]),
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
    'CED Topic 5.2 (LO 5.2.A): translate shared angular motion into the point-by-point linear motion using the radius.',
    '对应 CED Topic 5.2(学习目标 5.2.A):用半径把共享的角运动换算成各点的线运动。',
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
    loSection(
      'Topic 5.2 has one learning objective: converting between the rotational motion of a rigid system and the linear motion of a point on it.',
      'Topic 5.2 只有一个学习目标:在刚体的转动与其上某点的线运动之间互相转换。',
      [
        ['5.2.A', 'Describe the linear motion of a point on a rotating rigid system that corresponds to the rotational motion of that point, and vice versa.', '描述旋转刚体上一点的线运动与其转动的对应关系,并能反向转换。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.2.A.1', 'A point at distance $r$ from a fixed axis travels arc length $s=r\\Delta\\theta$ as the system rotates.', '距固定转轴 $r$ 的点,在刚体转过角度时走过的弧长为 $s=r\\Delta\\theta$。'],
        ['5.2.A.2', 'Tangential speed and tangential acceleration follow $v_T=r\\omega$ and $a_T=r\\alpha$.', '切向速率与切向加速度满足 $v_T=r\\omega$ 和 $a_T=r\\alpha$。'],
        ['5.2.A.3', 'All points within one rigid system share the same angular velocity and angular acceleration.', '同一刚体内所有点具有相同的角速度和角加速度。'],
      ]),
      formulas: [
        formula('Arc length', '弧长', 's=r\\Delta\\theta'),
        formula('Tangential speed', '切向速率', 'v_T=r\\omega'),
        formula('Tangential acceleration', '切向加速度', 'a_T=r\\alpha'),
        formula('Radial acceleration: prior-unit connection', '径向加速度:前置知识连接', 'a_r=\\frac{v_T^2}{r}=r\\omega^2'),
      ],
      bullets: [
        text('Linear distance, tangential speed, and tangential acceleration scale with radius; angular quantities do not.', '线距离、切向速率和切向加速度随半径变化;角量不随半径变化。'),
        text('$a_T$ changes speed; $a_r$ changes velocity direction. A point with constant $\\omega$ still accelerates radially.', '$a_T$ 改变速率;$a_r$ 改变速度方向。即使 $\\omega$ 恒定,点仍有径向加速度。'),
      ],
      classroomQuestions: [radiusCheck],
    },
    {
      heading: text('Boundary and decision rule', '边界与判断规则'),
      bullets: [text('The same boundary as Topic 5.1 applies: directions are described only as clockwise or counterclockwise about the given axis.', '与 Topic 5.1 相同的边界适用:方向只按相对给定转轴的顺时针或逆时针描述。')],
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
    'CED Topic 5.3 (LO 5.3.A, 5.3.B): identify and describe torques using force geometry, force diagrams, and the cross product.',
    '对应 CED Topic 5.3(学习目标 5.3.A、5.3.B):用力的几何、受力图和叉乘识别并描述力矩。',
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
    loSection(
      'Topic 5.3 splits into identifying torques (5.3.A) and describing them quantitatively (5.3.B).',
      'Topic 5.3 分为识别力矩(5.3.A)与定量描述力矩(5.3.B)两个学习目标。',
      [
        ['5.3.A', 'Identify the torques exerted on a rigid system.', '识别作用在刚体系统上的力矩。'],
        ['5.3.B', 'Describe the torques exerted on a rigid system.', '描述作用在刚体系统上的力矩。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.3.A.1', 'Torque results only from the force component perpendicular to the position vector from the axis to the point of application.', '力矩只来自从转轴到作用点的位置矢量的垂直力分量。'],
        ['5.3.A.2', 'The lever arm is the perpendicular distance from the axis of rotation to the line of action of the force.', '力臂是转轴到力的作用线的垂直距离。'],
        ['5.3.B.1', 'Force diagrams analyze torques on a rigid system.', '受力图(force diagram)用于分析刚体所受力矩。'],
        ['5.3.B.1.i', 'Force diagrams are similar to free-body diagrams but used for torque analysis.', '受力图与自由体图类似,但用于力矩分析。'],
        ['5.3.B.1.ii', 'Unlike free-body diagrams, force diagrams also show where each force acts relative to the axis.', '与自由体图不同,受力图还必须表示每个力相对转轴的作用位置。'],
        ['5.3.B.2', 'Torque about a chosen pivot: $\\vec\\tau=\\vec r\\times\\vec F$.', '相对所选取矩点的力矩:$\\vec\\tau=\\vec r\\times\\vec F$。'],
        ['5.3.B.2.i', 'Cross-product magnitude: $|\\vec A\\times\\vec B|=AB\\sin\\theta$.', '叉乘大小:$|\\vec A\\times\\vec B|=AB\\sin\\theta$。'],
        ['5.3.B.2.ii', 'The cross-product result is perpendicular to both input vectors, normal to the plane they define.', '叉乘结果垂直于两个输入矢量,即垂直于二者所确定的平面。'],
        ['5.3.B.2.iii', 'The direction of the cross product is found qualitatively with the right-hand rule.', '叉乘方向用右手定则定性判断。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('Vector definition', '矢量定义', '\\vec\\tau=\\vec r\\times\\vec F'),
        formula('Magnitude', '大小', '\\tau=rF\\sin\\phi=rF_{\\perp}=r_{\\perp}F'),
        formula('Net torque', '合力矩', '\\tau_{net}=\\sum_i\\tau_i'),
      ],
      bullets: [
        text('$\\vec r$ runs from the chosen axis to the point where the force acts.', '$\\vec r$ 从所选转轴指向力的作用点。'),
        text('Use either perpendicular force or lever arm; do not include the sine factor twice.', '垂直力分量和力臂方法二选一;不要重复乘正弦因子。'),
        text('Use the right-hand rule for $\\vec r\\times\\vec F$, then apply a consistent planar sign convention.', '用右手定则判断 $\\vec r\\times\\vec F$,再采用一致的平面正负约定。'),
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
      {
        heading: text('Essential knowledge checklist', '必备知识点清单'),
        table: ekTable([
          ['5.3.A.1 / .2', 'Only the perpendicular force component creates torque; the lever arm is the axis-to-line-of-action distance.', '只有垂直力分量产生力矩;力臂是转轴到作用线的距离。'],
          ['5.3.B.1.i / .ii', 'Force diagrams keep application points and the axis visible.', '受力图保留作用点与转轴。'],
          ['5.3.B.2.i–iii', 'Cross-product magnitude, perpendicular direction, and right-hand rule.', '叉乘大小、垂直方向与右手定则。'],
        ]),
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [torqueCheck] },
    ],
  ),
};

const inertiaLesson: CurriculumLesson = {
  title: text('5.4 Rotational Inertia: Where the Mass Sits Matters', '5.4 转动惯量:质量分布在哪里很重要'),
  description: text(
    'CED Topic 5.4 (LO 5.4.A, 5.4.B): construct rotational inertia from point masses, extend to continuous bodies with calculus, and shift axes with the parallel-axis theorem.',
    '对应 CED Topic 5.4(学习目标 5.4.A、5.4.B):从质点构造转动惯量,用微积分推广到连续物体,并用平行轴定理平移转轴。',
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
    loSection(
      'Topic 5.4 covers inertia about a given axis (5.4.A) and about axes away from the center of mass (5.4.B).',
      'Topic 5.4 覆盖相对给定转轴的转动惯量(5.4.A)以及相对非质心轴的转动惯量(5.4.B)。',
      [
        ['5.4.A', 'Describe the rotational inertia of a rigid system relative to a given axis of rotation.', '描述刚体系统相对给定转轴的转动惯量。'],
        ['5.4.B', 'Describe the rotational inertia of a rigid system rotating about an axis that does not pass through the center of mass.', '描述刚体系统绕不过质心的轴转动时的转动惯量。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.4.A.1', 'Rotational inertia measures resistance to changes in rotation; it depends on total mass and on how that mass is distributed relative to the axis.', '转动惯量度量抵抗转动变化的能力;取决于总质量以及质量相对转轴的分布。'],
        ['5.4.A.2', 'A point mass rotating at perpendicular distance $r$ from an axis has $I=mr^2$.', '距转轴垂直距离 $r$ 的质点满足 $I=mr^2$。'],
        ['5.4.A.3', 'The total inertia of a collection of objects about an axis is the sum of each object\'s inertia about that axis.', '多个物体相对同一转轴的总转动惯量等于各物体转动惯量之和。'],
        ['5.4.A.4', 'For a continuous body, $I=\\int r^2\\,dm$, where $r$ is the perpendicular distance from $dm$ to the axis.', '连续物体满足 $I=\\int r^2\\,dm$,其中 $r$ 是质量元 $dm$ 到转轴的垂直距离。'],
        ['5.4.B.1', 'In a given plane, the rotational inertia is minimal when the axis passes through the center of mass.', '在同一平面内,转轴过质心时转动惯量最小。'],
        ['5.4.B.2', 'Parallel-axis theorem: $I^{\\prime}=I_{cm}+Md^2$ relates any axis to the parallel center-of-mass axis.', '平行轴定理:$I^{\\prime}=I_{cm}+Md^2$ 把任意轴与平行的质心轴联系起来。'],
      ]),
    },
    {
      heading: text('Required derivation targets and shifted axes', '必会推导结果与平行轴'),
      images: [parallelAxisDiagram],
      formulas: [
        formula('Point mass / discrete system', '质点/离散系统', 'I=mr^2,\\qquad I_{tot}=\\sum_i m_ir_i^2'),
        formula('Continuous body', '连续物体', 'I=\\int r^2\\,dm'),
        formula('Uniform rod', '均匀细杆', 'I_{cm}=\\frac1{12}ML^2,\\qquad I_{end}=\\frac13ML^2'),
        formula('Shell, disk, annulus', '圆柱壳、圆盘与圆环体', 'I_{shell}=MR^2,\\quad I_{disk}=\\frac12MR^2,\\quad I_{annulus}=\\frac12M(R_1^2+R_2^2)'),
        formula('Parallel-axis theorem', '平行轴定理', 'I^{\\prime}=I_{cm}+Md^2'),
      ],
      bullets: [
        text('For a rod use $dm=\\lambda(x)dx$; for a disk built from rings use $dm=\\sigma 2\\pi r\\,dr$.', '细杆使用 $dm=\\lambda(x)dx$;把圆盘分成细环时使用 $dm=\\sigma 2\\pi r\\,dr$。'),
        text('For nonuniform density, first normalize the density constant from the total mass.', '密度不均匀时,先利用总质量确定密度中的常数。'),
        text('The parallel-axis theorem requires parallel axes and begins from a center-of-mass-axis value.', '平行轴定理要求两轴平行,并从质心轴转动惯量出发。'),
      ],
      classroomQuestions: [inertiaCheck],
    },
    {
      heading: text('Derive the parallel-axis theorem with calculus', '用微积分推导平行轴定理'),
      images: [parallelAxisDerivationDiagram],
      paragraphs: [
        text(
          'Place the origin at the center of mass and let the new axis be parallel to the center-of-mass axis at distance $d$. For a mass element $dm$ with coordinates $(x,y)$, the squared distance to the center-of-mass axis is $x^2+y^2$, while the squared distance to the new axis is $(x-d)^2+y^2$.',
          '把坐标原点取在质心,新轴与质心轴平行且相距 $d$。坐标为 $(x,y)$ 的质量元 $dm$ 到质心轴的距离平方是 $x^2+y^2$,到新轴的距离平方是 $(x-d)^2+y^2$。',
        ),
      ],
      formulas: [
        formula('Expand the distance squared', '展开距离平方', 'r^{\\prime2}=(x-d)^2+y^2=r^2-2dx+d^2'),
        formula('Integrate term by term', '逐项积分', 'I^{\\prime}=\\int r^{\\prime2}\\,dm=\\int r^2\\,dm-2d\\int x\\,dm+d^2\\int dm'),
        formula('Center-of-mass condition kills the cross term', '质心条件消去交叉项', '\\int x\\,dm=Mx_{cm}=0'),
        formula('Mass integral', '质量积分', '\\int dm=M'),
        formula('Result', '结论', 'I^{\\prime}=I_{cm}+Md^2'),
      ],
      bullets: [
        text('The middle term vanishes precisely because the origin is chosen at the center of mass; that is also why the center-of-mass axis gives the minimum inertia among parallel axes.', '交叉项消失正是因为原点选在质心;这也是质心轴在平行轴中给出最小转动惯量的原因。'),
        text('The theorem only shifts axes; always start from a known $I_{cm}$ and add $Md^2$—never subtract to shift backward.', '定理只能单向平移转轴:总是从已知 $I_{cm}$ 加上 $Md^2$,不能反向相减。'),
        text('$d$ is the perpendicular distance between the two parallel axes; non-parallel axes are outside the theorem.', '$d$ 是两条平行轴之间的垂直距离;不平行的轴不适用该定理。'),
      ],
    },
    {
      heading: text('CED calculus boundary', 'CED 微积分边界'),
      bullets: [
        text('Required derivations: uniform or nonuniform thin rods about arbitrary perpendicular axes; thin cylindrical shells, disks, and coaxial ring/shell bodies about central axes.', '要求推导:均匀或非均匀细杆绕任意垂直轴;薄圆柱壳、圆盘以及由同轴圆环或壳组成的物体绕中心轴。'),
        text('Sphere, cone, and arbitrary three-dimensional inertia integrations are not required derivations; supplied values may still be used.', '不要求推导球体、圆锥和任意三维物体的转动惯量积分;题目给出的结果仍可能需要使用。'),
        text('Qualitative understanding is expected: mass farther from the axis means greater inertia (hoop > solid puck of equal mass and radius).', '要求定性理解:质量离轴越远转动惯量越大(等质量等半径下圆环 > 实心圆盘)。'),
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
        images: [inertiaDiagram, parallelAxisDiagram],
        formulas: [
          formula('Discrete and continuous', '离散与连续', 'I=\\sum m_ir_i^2=\\int r^2\\,dm'),
          formula('Parallel axis', '平行轴', 'I^{\\prime}=I_{cm}+Md^2'),
        ],
        bullets: [text('State the axis, perpendicular distance, density relation, and limits before integrating.', '积分前说明转轴、垂直距离、密度关系和积分限。')],
      },
      {
        heading: text('Parallel-axis theorem derivation', '平行轴定理推导'),
        images: [parallelAxisDerivationDiagram],
        formulas: [
          formula('Expand and integrate', '展开并积分', 'I^{\\prime}=\\int(r^2-2dx+d^2)\\,dm=I_{cm}-2dMx_{cm}+Md^2'),
          formula('Result', '结论', 'x_{cm}=0\\Rightarrow I^{\\prime}=I_{cm}+Md^2'),
        ],
        bullets: [text('The cross term vanishes because the origin sits at the center of mass.', '交叉项因原点取在质心而消失。')],
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
  title: text("5.5 Rotational Equilibrium and Newton's First Law in Rotational Form", '5.5 转动平衡与转动形式的牛顿第一定律'),
  description: text(
    'CED Topic 5.5 (LO 5.5.A): the conditions under which angular velocity stays constant, tested separately from translational equilibrium.',
    '对应 CED Topic 5.5(学习目标 5.5.A):角速度保持不变的条件,并与平动平衡分别检验。',
  ),
  sections: [
    {
      heading: text('Hook: a person walks across a suspended platform', '钩子:人在悬吊平台上行走'),
      images: [equilibriumBeamDiagram],
      paragraphs: [
        text(
          'The platform can stay level while the support forces change as the person moves. Zero net force prevents center-of-mass acceleration, but only zero net torque prevents angular acceleration.',
          '人在平台上移动时,平台可以保持水平,但两端支撑力会改变。合力为零防止质心加速;只有合力矩为零才能防止角加速。',
        ),
      ],
    },
    loSection(
      'Topic 5.5 has one learning objective about the conditions for constant angular velocity.',
      'Topic 5.5 只有一个学习目标,讨论角速度保持不变的条件。',
      [
        ['5.5.A', 'Describe the conditions under which a system\'s angular velocity remains constant.', '描述系统角速度保持不变的条件。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.5.A.1', 'A system may be in rotational equilibrium (constant angular velocity) without translational equilibrium, and vice versa.', '系统可以处于转动平衡(角速度恒定)而不处于平动平衡,反之亦然。'],
        ['5.5.A.1.i', 'Free-body and force diagrams describe the forces and torques exerted on an object or rigid system.', '自由体图和受力图描述物体或刚体所受的力与力矩。'],
        ['5.5.A.1.ii', 'Rotational equilibrium is a configuration of torques with zero net torque: $\\sum\\tau=0$.', '转动平衡是合力矩为零的力矩配置:$\\sum\\tau=0$。'],
        ['5.5.A.1.iii', "Rotational Newton's first law: angular velocity is constant only if the net torque is zero.", '转动形式的牛顿第一定律:只有合力矩为零时角速度才恒定。'],
        ['5.5.A.2', "Rotational corollary to Newton's second law: unbalanced torques mean the angular velocity must be changing.", '牛顿第二定律的转动推论:力矩不平衡意味着角速度必然在变化。'],
      ]),
    },
    {
      heading: text('Core formulas and solution sequence', '核心公式与解题顺序'),
      formulas: [
        formula('Translational equilibrium', '平动平衡', '\\sum\\vec F=0'),
        formula('Rotational equilibrium', '转动平衡', '\\sum_i\\tau_i=0'),
        formula('Rotational first law', '转动形式的第一定律', '\\tau_{net}=0\\Rightarrow\\alpha=0\\Rightarrow\\omega=\\text{constant}'),
      ],
      bullets: [
        text('Equilibrium can mean constant nonzero velocity or angular velocity; it does not require rest.', '平衡可以对应非零的恒定速度或角速度,并不要求静止。'),
        text('Choose the system and draw every external force at its application point.', '选择系统,并在作用点画出所有外力。'),
        text('Choose one pivot and take every torque about that same pivot; a convenient pivot removes unknown torques without changing the physical answer.', '选择一个取矩点,所有力矩都相对同一点计算;合适的取矩点可以消去未知力矩,但不会改变物理答案。'),
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
        images: [equilibriumBeamDiagram],
        formulas: [
          formula('Translation', '平动', '\\sum\\vec F=0'),
          formula('Rotation', '转动', '\\sum\\tau=0'),
        ],
        bullets: [text('Choose one pivot and preserve all force application points.', '选择一个取矩点,并保留所有力的作用位置。')],
      },
      {
        heading: text('Essential knowledge checklist', '必备知识点清单'),
        table: ekTable([
          ['5.5.A.1', 'Rotational and translational equilibrium are independent conditions.', '转动平衡与平动平衡是彼此独立的条件。'],
          ['5.5.A.1.iii', 'Constant angular velocity requires zero net torque.', '角速度恒定要求合力矩为零。'],
          ['5.5.A.2', 'Unbalanced torques imply changing angular velocity.', '力矩不平衡意味着角速度在变化。'],
        ]),
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [equilibriumCheck] },
    ],
  ),
};

const rotationalDynamicsLesson: CurriculumLesson = {
  title: text("5.6 Newton's Second Law in Rotational Form: Translation and Rotation Together", '5.6 牛顿第二定律的转动形式:同时处理平动与转动'),
  description: text(
    'CED Topic 5.6 (LO 5.6.A): net torque, rotational inertia, and angular acceleration, combined with center-of-mass motion and apparatus constraints.',
    '对应 CED Topic 5.6(学习目标 5.6.A):合力矩、转动惯量与角加速度,并与质心运动、装置约束联立。',
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
    loSection(
      'Topic 5.6 has one learning objective about the conditions under which angular velocity changes.',
      'Topic 5.6 只有一个学习目标,讨论角速度发生变化的条件。',
      [
        ['5.6.A', 'Describe the conditions under which a system\'s angular velocity changes.', '描述系统角速度发生变化的条件。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['5.6.A.1', 'Angular velocity changes when the net torque on the object or system is not zero.', '当物体或系统所受合力矩不为零时,角速度发生变化。'],
        ['5.6.A.2', 'The rate of change of angular velocity is proportional to the net torque and in the same direction, and inversely proportional to rotational inertia: $\\sum\\tau=I\\alpha$.', '角速度变化率与合力矩成正比且同向,与转动惯量成反比:$\\sum\\tau=I\\alpha$。'],
        ['5.6.A.3', 'Fully describing a rotating rigid system may require separate linear and rotational analyses.', '完整描述转动刚体可能需要分别进行平动与转动分析。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula("Newton's second law for rotation", '牛顿第二定律的转动形式', '\\sum\\tau=I\\alpha'),
        formula('Center-of-mass motion', '质心运动', '\\sum\\vec F=M\\vec a_{cm}'),
        formula('Typical no-slip constraint', '典型无滑动约束', 'a=r\\alpha'),
      ],
      bullets: [
        text('Angular acceleration points with the net torque and is inversely proportional to $I$.', '角加速度与合力矩同方向,并与 $I$ 成反比。'),
        text('If a graph plots $\\tau_{net}$ vertically against $\\alpha$ horizontally, its slope is $I$.', '若纵轴为 $\\tau_{net}$、横轴为 $\\alpha$,图像斜率就是 $I$。'),
        text('Workflow: draw forces, write $\\sum F=Ma_{cm}$, write $\\sum\\tau=I\\alpha$, add the geometric constraint, then solve.', '流程:画受力图,写 $\\sum F=Ma_{cm}$,写 $\\sum\\tau=I\\alpha$,加入几何约束,再联立求解。'),
        text('Check limiting cases: $I\\to0$ approaches a massless rotating component; increasing $I$ at fixed torque reduces $\\alpha$.', '检查极限情形:$I\\to0$ 接近无质量转动部件;固定力矩下增大 $I$ 会减小 $\\alpha$。'),
        text('If mass distribution changes, do not treat $I$ as constant; use angular momentum methods instead.', '质量分布改变时不要把 $I$ 当常数,应改用角动量方法。'),
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
        bullets: [text('Linear and rotational equations are written independently, then linked by the constraint.', '平动与转动方程分别列出,再由约束条件连接。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [rotationalDynamicsCheck] },
    ],
  ),
};

const rotationalEnergyLesson: CurriculumLesson = {
  title: text('6.1 Rotational Kinetic Energy: Energy Without Center-of-Mass Motion', '6.1 转动动能:质心不动也可以具有能量'),
  description: text(
    'CED Topic 6.1 (LO 6.1.A): derive rotational kinetic energy from the motion of every mass element, then split total kinetic energy into translation and rotation.',
    '对应 CED Topic 6.1(学习目标 6.1.A):从每个质量元的运动推导转动动能,再把总动能拆分为平动与转动。',
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
    loSection(
      'Topic 6.1 has one learning objective describing rotational kinetic energy in terms of inertia and angular velocity.',
      'Topic 6.1 只有一个学习目标,用转动惯量与角速度描述转动动能。',
      [
        ['6.1.A', 'Describe the rotational kinetic energy of a rigid system in terms of the rotational inertia and angular velocity of that rigid system.', '用转动惯量和角速度描述刚体系统的转动动能。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.1.A.1', 'Rotational kinetic energy is related to rotational inertia and angular velocity: $K_{rot}=\\frac12I\\omega^2$.', '转动动能与转动惯量和角速度的关系:$K_{rot}=\\frac12I\\omega^2$。'],
        ['6.1.A.1.i', 'For rotation about a fixed axis, the rotational kinetic energy about that axis equals the total kinetic energy of the object.', '绕固定轴转动时,相对该轴的转动动能就是物体的总动能。'],
        ['6.1.A.1.ii', 'The total kinetic energy of a rigid system is the sum of rotation about its center of mass and translation of its center of mass.', '刚体系统的总动能等于绕质心转动的动能与质心平动动能之和。'],
        ['6.1.A.2', 'A rigid system can have rotational kinetic energy while its center of mass is at rest, because individual points still have linear speed.', '质心静止的刚体仍可具有转动动能,因为各点仍有线速度。'],
        ['6.1.A.3', 'Rotational kinetic energy is a scalar quantity.', '转动动能是标量。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
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
        text('Choose the energy form by asking: is the center of mass moving, is the body rotating, or both?', '先判断质心是否运动、物体是否转动,再选择对应的能量形式。'),
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
        bullets: [text('Fixed-axis pure rotation: $K_{rot}$ is the entire kinetic energy; moving center of mass adds the translational term.', '纯绕固定轴转动时 $K_{rot}$ 即总动能;质心运动时再加上平动项。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [rotationalEnergyCheck] },
    ],
  ),
};

const torqueWorkLesson: CurriculumLesson = {
  title: text('6.2 Torque and Work: Energy Transfer Requires Angular Displacement', '6.2 力矩与功:能量转移需要角位移'),
  description: text(
    'CED Topic 6.2 (LO 6.2.A): work done by torques through angular displacement, read from torque-angle graphs.',
    '对应 CED Topic 6.2(学习目标 6.2.A):力矩跨越角位移所做的功,并用力矩-角位置图像读取。',
  ),
  sections: [
    {
      heading: text('Hook: pushing on a stuck bolt', '钩子:用力拧一颗卡死的螺栓'),
      images: [torqueGraphAreasDiagram],
      paragraphs: [
        text(
          'A large torque can act while the bolt has zero angular displacement. Mechanical work on the bolt requires both torque and rotation through an angle.',
          '即使施加很大力矩,卡死的螺栓角位移仍为零。对螺栓完成机械功需要力矩和角位移同时存在。',
        ),
      ],
    },
    loSection(
      'Topic 6.2 has one learning objective about work delivered by a torque or collection of torques.',
      'Topic 6.2 只有一个学习目标,讨论单个或一组力矩所做的功。',
      [
        ['6.2.A', 'Describe the work done on a rigid system by a given torque or collection of torques.', '描述给定力矩或一组力矩对刚体系统所做的功。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.2.A.1', 'A torque transfers energy into or out of a system only if it acts over an angular displacement.', '力矩只有在跨越角位移时才能向系统输入或输出能量。'],
        ['6.2.A.2', 'Work done by a torque is related to the torque magnitude and the angular displacement during which it acts: $W=\\int\\tau\\,d\\theta$ (constant torque: $W=\\tau\\Delta\\theta$).', '力矩做的功取决于力矩大小与其作用期间的角位移:$W=\\int\\tau\\,d\\theta$(恒力矩时 $W=\\tau\\Delta\\theta$)。'],
        ['6.2.A.3', 'Work done by a torque equals the area under a torque-versus-angular-position graph.', '力矩做的功等于力矩-角位置图像下的面积。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('Differential work', '微元功', 'dW=\\vec F\\cdot d\\vec s=\\tau\\,d\\theta'),
        formula('Work by variable torque', '变力矩做功', 'W=\\int_{\\theta_1}^{\\theta_2}\\tau(\\theta)\\,d\\theta'),
        formula('Rotational work-energy theorem', '转动功-能定理', 'W_{net}=\\Delta K_{rot}'),
      ],
      bullets: [
        text('Signed area under a $\\tau$-versus-$\\theta$ graph is work; area under a $\\tau$-versus-$t$ graph is angular impulse instead.', '$\\tau$-$\\theta$ 图像下的有符号面积是功;$\\tau$-$t$ 图像下的面积是角冲量。'),
        text('$P=\\tau\\omega$ is useful enrichment, but it is not an explicit required statement in Topic 6.2.', '$P=\\tau\\omega$ 是有用的拓展关系,但并非 Topic 6.2 明确列出的必考陈述。'),
      ],
      classroomQuestions: [torqueWorkCheck],
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
        images: [torqueGraphAreasDiagram],
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
    'CED Topic 6.3 (LO 6.3.A–6.3.C): two angular-momentum models, angular impulse, and the rotational impulse-momentum theorem with graph readings.',
    '对应 CED Topic 6.3(学习目标 6.3.A–6.3.C):两种角动量模型、角冲量与转动冲量-动量定理,以及图像读法。',
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
    loSection(
      'Topic 6.3 carries three learning objectives: describing angular momentum, describing angular impulse, and relating the two.',
      'Topic 6.3 有三个学习目标:描述角动量、描述角冲量、并把二者联系起来。',
      [
        ['6.3.A', 'Describe the angular momentum of an object or rigid system.', '描述物体或刚体系统的角动量。'],
        ['6.3.B', 'Describe the angular impulse delivered to an object or rigid system by a torque.', '描述力矩传递给物体或刚体系统的角冲量。'],
        ['6.3.C', 'Relate the change in angular momentum of an object or rigid system to the angular impulse given to it.', '把物体或刚体系统的角动量变化与所受角冲量联系起来。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.3.A.1', 'The magnitude of angular momentum of a rigid system about a specific axis: $L=I\\omega$.', '刚体系统相对特定转轴的角动量大小:$L=I\\omega$。'],
        ['6.3.A.2', 'Angular momentum of an object about a given point: $\\vec L=\\vec r\\times\\vec p$.', '物体相对给定参考点的角动量:$\\vec L=\\vec r\\times\\vec p$。'],
        ['6.3.A.2.i', 'The choice of rotation axis influences the determined angular momentum.', '转轴的选取会影响角动量的结果。'],
        ['6.3.A.2.ii', 'Angular momentum of a straight-line traveler depends on the reference-point distance, mass, speed, and the angle between radial distance and velocity.', '直线运动物体的角动量取决于参考点距离、质量、速率以及径向距离与速度的夹角。'],
        ['6.3.B.1', 'Angular impulse is the product of torque and the time interval during which it acts: $\\int\\tau\\,dt$.', '角冲量是力矩与其作用时间间隔的乘积:$\\int\\tau\\,dt$。'],
        ['6.3.B.2', 'Angular impulse has the same direction as the torque imparting it.', '角冲量方向与施加它的力矩相同。'],
        ['6.3.B.3', 'Angular impulse equals the area under a torque-versus-time graph.', '角冲量等于力矩-时间图像下的面积。'],
        ['6.3.C.1', 'The magnitude of the change in angular momentum compares final and initial momenta.', '角动量变化量的大小由末态与初态角动量比较得到。'],
        ['6.3.C.2.i', 'The angular impulse on a system equals its change in angular momentum: $\\Delta L=\\int\\tau\\,dt$.', '系统所受角冲量等于其角动量变化:$\\Delta L=\\int\\tau\\,dt$。'],
        ['6.3.C.2.ii', 'The rotational impulse-momentum theorem follows directly from Newton\'s second law when rotational inertia is constant.', '转动惯量恒定时,转动冲量-动量定理直接由牛顿第二定律得出。'],
        ['6.3.C.3', 'Net torque equals the slope of an angular-momentum-versus-time graph.', '合力矩等于角动量-时间图像的斜率。'],
        ['6.3.C.4', 'Angular impulse equals the area under a net-external-torque-versus-time graph.', '角冲量等于合外力矩-时间图像下的面积。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('Rigid system about an axis', '刚体相对转轴', 'L=I\\omega'),
        formula('Particle or object about a point', '质点或物体相对参考点', '\\vec L=\\vec r\\times\\vec p,\\qquad L=rmv\\sin\\phi=p\\,r_{\\perp}'),
        formula('Angular impulse-momentum theorem', '角冲量-角动量定理', '\\Delta L=L_f-L_i=\\int_{t_1}^{t_2}\\tau_{net}\\,dt'),
        formula('Rate form', '变化率形式', '\\tau_{net}=\\frac{dL}{dt}=I\\alpha\\quad(\\text{constant }I)'),
      ],
      bullets: [
        text('A straight-moving object can have angular momentum about a point even though it does not move in a circle.', '直线运动物体即使不沿圆周运动,相对某参考点仍可具有角动量。'),
        text('Changing the reference point or axis can change the measured angular momentum.', '改变参考点或转轴会改变测得的角动量。'),
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
        bullets: [text('Slope of an $L$-$t$ graph is net torque; area under a $\\tau$-$t$ graph is $\\Delta L$.', '$L$-$t$ 图像斜率是合力矩;$\\tau$-$t$ 图像下面积是 $\\Delta L$。')],
      },
      { heading: text('Self-check', '自测'), classroomQuestions: [angularImpulseCheck] },
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

const angularMomentumConservationLesson: CurriculumLesson = {
  title: text('6.4 Conservation of Angular Momentum: System Choice Comes First', '6.4 角动量守恒:先选择系统'),
  description: text(
    'CED Topic 6.4 (LO 6.4.A–6.4.B): use system boundaries and external angular impulse to decide when total angular momentum remains constant.',
    '对应 CED Topic 6.4(学习目标 6.4.A–6.4.B):用系统边界和外部角冲量判断总角动量何时保持不变。',
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
    loSection(
      'Topic 6.4 carries two learning objectives: applying conservation and judging how system selection changes the answer.',
      'Topic 6.4 有两个学习目标:应用角动量守恒,以及判断系统选择如何影响结论。',
      [
        ['6.4.A', 'Describe the behavior of a system using conservation of angular momentum.', '用角动量守恒描述系统行为。'],
        ['6.4.B', 'Describe how the selection of a system determines whether the angular momentum of that system changes.', '描述系统的选择如何决定其角动量是否变化。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.4.A.1', 'Total angular momentum about an axis is the sum of the angular momenta of all constituent parts about that axis.', '相对某转轴的总角动量等于各组成部分相对同一轴的角动量之和。'],
        ['6.4.A.2', 'Any change in a system\'s angular momentum must come from an interaction with the surroundings.', '系统角动量的任何变化都必须来自与外界的相互作用。'],
        ['6.4.A.2.i', 'Angular impulses between two interacting objects are equal and opposite (Newton\'s third law result).', '两个相互作用物体间的角冲量大小相等、方向相反(牛顿第三定律的结果)。'],
        ['6.4.A.2.ii', 'A system may be selected so that its total angular momentum is constant.', '可以选择系统使总角动量保持恒定。'],
        ['6.4.A.2.iii', 'A nonrigid system\'s angular speed may change without changing angular momentum if mass moves toward or away from the axis.', '非刚体系统把质量移近或移离转轴时,角速度可以改变而角动量不变。'],
        ['6.4.A.2.iv', 'If total angular momentum changes, the change equals the angular impulse exerted on the system.', '若总角动量变化,变化量等于系统所受角冲量。'],
        ['6.4.B.1', 'Angular momentum is conserved in all interactions (for the full interacting system).', '在所有相互作用中角动量守恒(对完整的相互作用系统而言)。'],
        ['6.4.B.2', 'If the net external torque on a selected system is zero, its total angular momentum is constant.', '所选系统合外力矩为零时,总角动量恒定。'],
        ['6.4.B.3', 'If the net external torque is nonzero, angular momentum transfers between the system and the environment.', '合外力矩不为零时,角动量在系统与环境之间转移。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('System total', '系统总角动量', 'L_{system}=\\sum_iL_i'),
        formula('Conservation condition', '守恒条件', '\\tau_{ext,net}=0\\Rightarrow L_i=L_f'),
        formula('Changing mass distribution', '改变质量分布', 'I_i\\omega_i=I_f\\omega_f'),
      ],
      bullets: [
        text('Zero external force is not required; zero net external torque about the chosen axis is the condition.', '不要求外力为零;条件是相对所选转轴的合外力矩为零。'),
        text('Energy is a separate test: internal work can change rotational kinetic energy even when angular momentum is conserved; sticking rotational collisions conserve angular momentum but lose kinetic energy.', '能量需单独判断:内力做功可以在角动量守恒时改变转动动能;粘连转动碰撞角动量守恒但动能减小。'),
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
    'CED Topic 6.5 (LO 6.5.A–6.5.C): diagnose no-slip versus slipping before combining kinematics, energy, friction, and rotational dynamics.',
    '对应 CED Topic 6.5(学习目标 6.5.A–6.5.C):先判断无滑动还是滑动,再结合运动学、能量、摩擦与转动动力学。',
  ),
  sections: [
    {
      heading: text('Hook: why does the disk beat the hoop?', '钩子:为什么圆盘比圆环先到底?'),
      images: [rollingInclineEnergyDiagram],
      paragraphs: [
        text(
          'A disk and hoop released from the same height lose the same gravitational potential energy, but they divide it differently between center-of-mass translation and rotation.',
          '圆盘和圆环从同一高度释放时损失相同重力势能,但它们在质心平动与转动之间的能量分配不同。',
        ),
      ],
    },
    loSection(
      'Topic 6.5 carries three learning objectives covering combined kinetic energy, rolling without slipping, and rolling with slipping.',
      'Topic 6.5 有三个学习目标,分别覆盖组合动能、无滑动滚动与带滑动的滚动。',
      [
        ['6.5.A', 'Describe the kinetic energy of a system that has translational and rotational motion.', '描述同时具有平动与转动的系统的动能。'],
        ['6.5.B', 'Describe the motion of a system that is rolling without slipping.', '描述无滑动滚动系统的运动。'],
        ['6.5.C', 'Describe the motion of a system that is rolling while slipping.', '描述边滚边滑系统的运动。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.5.A.1', 'Total kinetic energy is the sum of translational and rotational kinetic energies: $K_{tot}=K_{trans}+K_{rot}$.', '总动能等于平动动能与转动动能之和:$K_{tot}=K_{trans}+K_{rot}$。'],
        ['6.5.B.1', 'Rolling without slipping links center-of-mass and rotational motion: $\\Delta x_{cm}=R\\Delta\\theta$, $v_{cm}=R\\omega$, $a_{cm}=R\\alpha$.', '无滑动滚动把质心运动与转动联系:$\\Delta x_{cm}=R\\Delta\\theta$, $v_{cm}=R\\omega$, $a_{cm}=R\\alpha$。'],
        ['6.5.B.2', 'In ideal rolling without slipping, the frictional force does not dissipate energy from the rolling system.', '理想无滑动滚动中,摩擦力不从滚动系统耗散能量。'],
        ['6.5.C.1', 'While slipping, center-of-mass motion and rotational motion cannot be directly related.', '滑动时质心运动与转动不能直接关联。'],
        ['6.5.C.2', 'While slipping, the kinetic-friction application point moves relative to the surface, so kinetic friction dissipates energy.', '滑动时动摩擦力作用点相对表面移动,因此动摩擦耗散能量。'],
      ]),
    },
    {
      heading: text('No-slip kinematics and velocity map', '无滑动运动学与速度图'),
      images: [rollingDiagram],
      formulas: [
        formula('No-slip constraint', '无滑动约束', '\\Delta x_{cm}=R\\Delta\\theta,\\qquad v_{cm}=R\\omega,\\qquad a_{cm}=R\\alpha'),
        formula('Total kinetic energy', '总动能', 'K=\\frac12Mv_{cm}^2+\\frac12I_{cm}\\omega^2'),
        formula('Speed from height', '由高度求速度', 'v^2=\\frac{2gh}{1+I_{cm}/(MR^2)}'),
        formula('Acceleration down an incline', '沿斜面加速度', 'a_{cm}=\\frac{g\\sin\\theta}{1+I_{cm}/(MR^2)}'),
      ],
      bullets: [
        text('In the ground frame, the top point has speed $2v_{cm}$, the center has $v_{cm}$, and the contact point is instantaneously at rest.', '在地面参考系中,顶部点速率为 $2v_{cm}$,中心为 $v_{cm}$,接触点瞬时静止。'),
        text('No slip is a kinematic constraint, not a force law; static friction can be nonzero or zero and its direction must come from the dynamics, not memorization.', '无滑动是运动学约束,不是力的定律;静摩擦可以非零也可以为零,方向应由动力学判断,不能死记。'),
      ],
    },
    {
      heading: text('When slipping begins', '发生滑动时'),
      bullets: [
        text('Do not impose $v_{cm}=R\\omega$ during slipping; translation and rotation must be solved separately.', '滑动时不能使用 $v_{cm}=R\\omega$;平动与转动需分别求解。'),
        text('Kinetic friction dissipates mechanical energy because its application point slides along the surface.', '动摩擦力作用点沿表面滑动,因此耗散机械能。'),
        text('Rolling resistance is outside the AP Physics C: Mechanics scope.', '滚动阻力不在 AP Physics C: Mechanics 考查范围内。'),
      ],
      classroomQuestions: [rollingCheck],
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
        images: [rollingDiagram, rollingInclineEnergyDiagram],
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
    'CED Topic 6.6 (LO 6.6.A): use a gravity-only model to compare circular and elliptical orbits and derive circular-orbit energy and escape speed.',
    '对应 CED Topic 6.6(学习目标 6.6.A):使用只受引力模型比较圆轨道与椭圆轨道,并推导圆轨道能量与逃逸速度。',
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
    loSection(
      'Topic 6.6 has one learning objective about two-object systems interacting only through gravity.',
      'Topic 6.6 只有一个学习目标,讨论仅通过引力相互作用的两天体系统。',
      [
        ['6.6.A', 'Describe the motions of a system consisting of two objects interacting only via gravitational forces.', '描述仅通过引力相互作用的两天体系统的运动。'],
      ],
    ),
    {
      heading: text('Essential knowledge checklist', '必备知识点清单'),
      table: ekTable([
        ['6.6.A.1', 'With a massive central object and a negligible-mass satellite, the central object\'s motion is negligible.', '中心天体质量很大、卫星质量可忽略时,中心天体的运动可忽略。'],
        ['6.6.A.2', 'Satellite orbits are constrained by conservation laws.', '卫星轨道受守恒定律约束。'],
        ['6.6.A.2.i', 'Circular orbits: total mechanical energy, gravitational potential energy, angular momentum, and kinetic energy are all constant.', '圆轨道:总机械能、引力势能、角动量和动能都保持不变。'],
        ['6.6.A.2.ii', 'Elliptical orbits: total mechanical energy and angular momentum are constant, but potential and kinetic energies each change.', '椭圆轨道:总机械能与角动量守恒,但势能与动能各自变化。'],
        ['6.6.A.2.iii', 'Gravitational potential energy is defined as zero at infinite separation: $U=-Gm_1m_2/r$.', '引力势能规定无穷远处为零:$U=-Gm_1m_2/r$。'],
        ['6.6.A.3', 'For a circular orbit, $K=-\\frac12U$ and $E=\\frac12U=-GMm/(2r)$.', '圆轨道中 $K=-\\frac12U$ 且 $E=\\frac12U=-GMm/(2r)$。'],
        ['6.6.A.4', 'Escape velocity is the velocity for which the satellite–central-object mechanical energy equals zero.', '逃逸速度是使卫星-中心天体系统机械能为零的速度。'],
        ['6.6.A.4.i', 'At escape velocity, the satellite moves away until its speed reaches zero only at infinite distance.', '达到逃逸速度时,卫星只在无穷远处速度才降为零。'],
        ['6.6.A.4.ii', 'Escape velocity is derived from energy conservation: $v_{esc}=\\sqrt{2GM/r}$.', '逃逸速度由能量守恒推导:$v_{esc}=\\sqrt{2GM/r}$。'],
      ]),
    },
    {
      heading: text('Core formulas', '核心公式'),
      formulas: [
        formula('Gravitational potential energy', '引力势能', 'U(\\infty)=0,\\qquad U(r)=-\\frac{GMm}{r}'),
        formula('Circular speed', '圆轨道速度', 'v_{circ}=\\sqrt{\\frac{GM}{r}}'),
        formula('Circular energy relations', '圆轨道能量关系', 'K=-\\frac12U=\\frac{GMm}{2r},\\qquad E=\\frac12U=-\\frac{GMm}{2r}'),
        formula('Angular momentum at a point', '某点的角动量', 'L=mr v_{\\perp}'),
        formula('Escape speed', '逃逸速度', 'E=0\\Rightarrow v_{esc}=\\sqrt{\\frac{2GM}{r}}=\\sqrt2\\,v_{circ}'),
      ],
      bullets: [
        text('Measure $r$ center to center and assume gravity only: no drag, thrust, or third-body perturbation.', '距离 $r$ 从中心到中心测量,且只考虑引力:忽略阻力、推进和第三天体扰动。'),
        text('Circular orbit derivation: gravity supplies centripetal force, $GMm/r^2=mv^2/r$, then substitute into $K$ and $U$.', '圆轨道推导:引力提供向心力 $GMm/r^2=mv^2/r$,再代入 $K$ 与 $U$。'),
        text('Hohmann transfers, propulsion, atmospheric drag, orbit-equation derivation, and multibody perturbations are outside this topic.', '霍曼转移、推进、空气阻力、轨道方程推导和多体扰动不属于本 Topic。'),
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

export const rotatingSystemsLessons: CurriculumLesson[] = [
  rotationalEnergyLesson,
  torqueWorkLesson,
  angularImpulseLesson,
  angularMomentumConservationLesson,
  rollingLesson,
  orbitingSatellitesLesson,
];
