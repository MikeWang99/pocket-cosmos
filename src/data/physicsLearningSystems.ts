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

const kinematicsGraphSignLesson: CurriculumLesson = {
  title: text('Velocity-Time Graphs: Direction vs Speed', '速度-时间图像:方向与速率'),
  description: text(
    'A classroom-focused guide for reading velocity graphs without confusing velocity value, direction, and speed.',
    '用于课堂讲解速度图像,避免混淆速度数值、运动方向和速率。',
  ),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题?'),
      paragraphs: [
        text(
          'Students often say a velocity is "increasing" when they mean the speed is increasing. On a velocity-time graph, the sign of velocity carries direction, so a line moving downward can still describe an object speeding up in the negative direction.',
          '学生常常说 velocity 在"增加",但其实想表达的是 speed 在增加。在速度-时间图像中,速度的正负包含方向,所以一条向下走的线,也可能表示物体在负方向上越来越快。',
        ),
      ],
      takeaway: text(
        'Always separate three ideas: velocity value, direction of motion, and speed.',
        '一定要区分三个概念:速度数值、运动方向和速率。',
      ),
    },
    {
      heading: text('1. Choose the positive direction first', '1. 先选正方向'),
      paragraphs: [
        text(
          'A velocity-time graph only makes sense after a positive direction has been chosen. For a ball on a ramp, if uphill is positive, then downhill velocity is negative.',
          '速度-时间图像必须先选定正方向才有意义。比如斜面上如果规定向上为正,那么向下运动的速度就是负值。',
        ),
      ],
      formulas: [
        formula('Velocity sign', '速度符号', 'v>0\\Rightarrow \\text{motion in the positive direction},\\quad v<0\\Rightarrow \\text{motion in the negative direction}'),
        formula('Speed is magnitude', '速率是速度大小', '\\text{speed}=|v|'),
      ],
    },
    {
      heading: text('2. Slope tells acceleration, not speed directly', '2. 斜率表示加速度,不是直接表示速率'),
      paragraphs: [
        text(
          'The slope of a velocity-time graph is acceleration. If two balls are on the same frictionless ramp, they have the same acceleration along the ramp, so their velocity-time graphs should be parallel.',
          '速度-时间图像的斜率是加速度。如果两个球在同一个无摩擦斜面上运动,它们沿斜面的加速度相同,所以速度-时间图像应该互相平行。',
        ),
      ],
      formulas: [
        formula('Graph slope', '图像斜率', 'a=\\frac{dv}{dt}'),
        formula('Same ramp acceleration', '同一斜面上的加速度相同', 'a_1=a_2=-g\\sin\\theta\\quad \\text{if uphill is positive}'),
      ],
    },
    {
      heading: text('3. Classroom check: two balls on a ramp', '3. 课堂题:斜面上的两个小球'),
      classroomQuestions: [
        {
          id: 'kinematics-ramp-velocity-graph',
          title: text('Classroom Check: reading velocity signs', '课堂题:读取速度符号'),
          prompt: text(
            'Ball 1 is launched up a ramp with initial velocity $+v_0$. Ball 2 is released from rest at the top of the same ramp. Choose uphill as positive. Which description best matches their velocity-time graphs before collision?',
            '小球 1 以初速度 $+v_0$ 沿斜面向上运动;小球 2 从同一斜面顶端由静止释放。规定沿斜面向上为正。下列哪一个描述最符合两个小球的速度-时间图像?',
          ),
          choices: [
            {
              label: 'A',
              text: text('Ball 1 starts positive and decreases linearly through zero; Ball 2 starts at zero and becomes more negative. The two lines are parallel.', '小球 1 从正速度开始并线性减小、穿过零;小球 2 从零开始并变得越来越负。两条线互相平行。'),
            },
            {
              label: 'B',
              text: text('Ball 1 starts positive and decreases; Ball 2 starts at zero and becomes more positive because its speed increases.', '小球 1 从正速度开始并减小;小球 2 从零开始并变得越来越正,因为它的速率增加。'),
            },
            {
              label: 'C',
              text: text('Ball 1 and Ball 2 must have opposite accelerations because they initially move in opposite directions.', '小球 1 和小球 2 的初始运动方向相反,所以它们的加速度也必须相反。'),
            },
            {
              label: 'D',
              text: text('The graph cannot include direction; it only shows speed.', '速度-时间图像不能包含方向,只能表示速率。'),
            },
          ],
          correctAnswer: 'A',
          feedback: text(
            'The graph does include direction because velocity is signed. With uphill positive, gravity gives both balls the same negative acceleration along the ramp. Ball 2 speeds up downhill, but its velocity becomes more negative, not more positive.',
            '速度-时间图像包含方向,因为 velocity 是带符号的。规定向上为正时,重力让两个小球沿斜面都有相同的负加速度。小球 2 向下越来越快,但它的速度数值是越来越负,而不是越来越正。',
          ),
        },
      ],
    },
    {
      heading: text('4. Common mistakes', '4. 常见错误'),
      bullets: [
        text('Confusing velocity with speed.', '把 velocity 和 speed 混为一谈。'),
        text('Thinking a decreasing velocity graph always means the object is slowing down.', '以为速度图像下降就一定表示物体在减速。'),
        text('Forgetting that negative velocity can have increasing magnitude.', '忘记负速度的大小也可以增加。'),
        text('Assuming opposite motion directions imply opposite accelerations.', '以为运动方向相反就意味着加速度方向相反。'),
      ],
    },
  ],
};

const impulseMomentumLesson: CurriculumLesson = {
  title: text('Impulse and Momentum: What Actually Changes?', '冲量与动量:到底什么在变化?'),
  description: text(
    'A compact clarification of force, impulse, momentum, and the condition for momentum conservation.',
    '澄清力、冲量、动量以及动量守恒条件的课堂小节。',
  ),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题?'),
      paragraphs: [
        text(
          'In collision and explosion problems, students often mix up force, impulse, momentum, and kinetic energy. The safest path is to ask what the net external force does to the total momentum of the chosen system.',
          '在碰撞和爆炸问题中,学生很容易混淆力、冲量、动量和动能。最稳妥的路径是先问:合外力如何改变所选系统的总动量?',
        ),
      ],
    },
    {
      heading: text('1. Force is the rate of change of momentum', '1. 力是动量的变化率'),
      paragraphs: [
        text(
          'Net external force is not momentum itself. It is the time rate at which total momentum changes.',
          '合外力不是动量本身,而是系统总动量随时间变化的速率。',
        ),
      ],
      formulas: [
        formula('Newton\'s second law in momentum form', '动量形式的牛顿第二定律', '\\vec F_{\\mathrm{ext,net}}=\\frac{d\\vec p_{\\mathrm{total}}}{dt}'),
        formula('Impulse changes momentum', '冲量改变动量', '\\vec J=\\int \\vec F_{\\mathrm{ext,net}}\\,dt=\\Delta \\vec p_{\\mathrm{total}}'),
        formula('Final momentum', '末动量', '\\vec p_f=\\vec p_i+\\vec J'),
      ],
      takeaway: text(
        'If net external force is zero, momentum is constant; it does not have to be zero.',
        '如果合外力为零,动量是常量;但它不一定等于零。',
      ),
    },
    {
      heading: text('2. Classroom check: zero force does not mean zero momentum', '2. 课堂题:合外力为零不等于动量为零'),
      classroomQuestions: [
        {
          id: 'zero-force-momentum-constant',
          title: text('Classroom Check: momentum conservation', '课堂题:动量守恒'),
          prompt: text(
            'A system has no net external force for several seconds. Its initial total momentum is $\\vec p_i\\ne 0$. What must be true?',
            '一个系统在几秒内合外力为零。它的初始总动量为 $\\vec p_i\\ne 0$。下列哪项一定正确?',
          ),
          choices: [
            {
              label: 'A',
              text: text('The final total momentum must be zero.', '末总动量一定为零。'),
            },
            {
              label: 'B',
              text: text('The final total momentum equals the initial total momentum.', '末总动量等于初始总动量。'),
            },
            {
              label: 'C',
              text: text('The kinetic energy must be conserved.', '动能一定守恒。'),
            },
            {
              label: 'D',
              text: text('The impulse is equal to the final momentum.', '冲量等于末动量。'),
            },
          ],
          correctAnswer: 'B',
          feedback: text(
            'Since $\\vec F_{\\mathrm{ext,net}}=d\\vec p_{\\mathrm{total}}/dt=0$, the total momentum is constant. Constant does not mean zero. Also, impulse equals change in momentum, not final momentum itself.',
            '因为 $\\vec F_{\\mathrm{ext,net}}=d\\vec p_{\\mathrm{total}}/dt=0$,所以系统总动量保持常量。常量不等于零。另外,冲量等于动量变化量,不等于末动量本身。',
          ),
        },
      ],
    },
    {
      heading: text('3. Collision energy is a separate question', '3. 碰撞中的能量是另一个问题'),
      paragraphs: [
        text(
          'Momentum conservation depends on net external impulse. Kinetic energy conservation depends on the type of collision. Elastic collisions conserve kinetic energy; inelastic collisions do not; perfectly inelastic collisions stick together after collision.',
          '动量守恒取决于合外力冲量。动能是否守恒取决于碰撞类型。弹性碰撞动能守恒;非弹性碰撞动能不守恒;完全非弹性碰撞后物体粘在一起运动。',
        ),
      ],
      bullets: [
        text('Elastic collision: momentum conserved and kinetic energy conserved.', '弹性碰撞:动量守恒,动能也守恒。'),
        text('Inelastic collision: momentum conserved if external impulse is negligible, but kinetic energy is not conserved.', '非弹性碰撞:若外力冲量可忽略,动量守恒,但动能不守恒。'),
        text('Perfectly inelastic collision: objects stick together, so they share one final velocity.', '完全非弹性碰撞:物体粘在一起,所以有共同末速度。'),
      ],
    },
  ],
};

const centerOfMassDiscreteLesson: CurriculumLesson = {
  title: text('Center of Mass: Discrete Systems', 'Center of Mass(质心):离散系统'),
  description: text(
    'A system-level model for understanding collisions, explosions, recoil, and the motion of extended objects.',
    '用来理解碰撞、爆炸、反冲和复杂物体整体运动的系统级模型。',
  ),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题?'),
      videos: [
        {
          provider: 'youtube',
          title: text('Center of Mass demonstration', 'Center of Mass 演示视频'),
          embedUrl: 'https://www.youtube-nocookie.com/embed/DY3LYQv22qY',
          sourceUrl: 'https://www.youtube.com/watch?v=DY3LYQv22qY',
          sourceLabel: text('Source: YouTube', '来源:YouTube'),
        },
      ],
      paragraphs: [
        text(
          'In momentum and collision problems, many parts of a system can move in complicated ways. A firework may explode into fragments, two people may push away on ice, and a thrown wrench may rotate while moving through the air.',
          '在动量和碰撞问题中,系统内部很多部分会以复杂方式运动。烟花会爆炸成碎片,两个人会在冰面上互相推开,扳手被扔出后会一边平动一边转动。',
        ),
        text(
          'The center of mass is the point that represents the overall motion of the whole system.',
          '质心就是用来代表整个系统整体运动的那个点。',
        ),
      ],
      takeaway: text(
        'When the internal motion is complicated, track the center of mass to describe the system as a whole.',
        '当系统内部运动很复杂时,用质心来描述系统整体运动。',
      ),
    },
    {
      heading: text('1. Why do we need center of mass?', '1. 为什么需要 Center of Mass?'),
      paragraphs: [
        text(
          'For a single particle, position, velocity, acceleration, and force are usually enough. For a multi-object system, analyzing every part separately can become messy.',
          '对于单个小球,位置、速度、加速度和受力通常就够了。但对于多物体系统,逐个分析每一部分会非常复杂。',
        ),
        text(
          'The center of mass lets us replace a complicated system with one representative point when we care about the overall motion.',
          '当我们关心系统整体运动时,质心可以把复杂系统简化成一个代表点。',
        ),
      ],
      bullets: [
        text('It represents the mass-weighted average position of the system.', '它代表系统的质量加权平均位置。'),
        text('A larger mass pulls the center of mass closer to itself.', '质量越大的部分,对质心位置影响越大。'),
        text('In momentum problems, total momentum can be described using the velocity of the center of mass.', '在动量问题中,系统总动量可以用质心速度来描述。'),
      ],
    },
    {
      heading: text('2. Deriving the definition from whole-system motion', '2. 从系统整体运动反推出质心定义'),
      paragraphs: [
        text(
          'We do not start by memorizing a formula. We first ask for a single point that can represent the motion of the entire system.',
          '我们不是一上来背公式,而是先问:能不能找到一个点,用它代表整个系统的整体运动?',
        ),
        text(
          'If internal forces cancel inside the system, the natural whole-system equation should look like Newton\'s second law for one object: net external force equals total mass times the acceleration of that representative point.',
          '如果系统内部的力会相互抵消,那么系统整体的方程就应该像一个物体的牛顿第二定律:合外力等于总质量乘以这个代表点的加速度。',
        ),
        text(
          'For a finite set of objects, adding Newton\'s second law for every object shows what the representative acceleration must be. The corresponding representative position is the mass-weighted average position.',
          '对于有限个物体,把每个物体的牛顿第二定律加起来,就能看出这个代表点的加速度应该是什么。与之对应的代表点位置,就是质量加权平均位置。',
        ),
      ],
      formulas: [
        formula('Desired whole-system equation', '我们希望系统整体满足', '\\vec F_{\\mathrm{ext,net}}=M\\vec a_{\\mathrm{cm}}'),
        formula('Total mass', '系统总质量', 'M=\\sum_i m_i'),
        formula('Add Newton\'s second law for all parts', '把每一部分的牛顿第二定律加起来', '\\vec F_{\\mathrm{ext,net}}=\\sum_i m_i\\vec a_i'),
        formula('Therefore the representative acceleration must be', '因此代表点的加速度必须是', '\\vec a_{\\mathrm{cm}}=\\frac{\\sum_i m_i\\vec a_i}{\\sum_i m_i}'),
        formula('So the representative position is defined as', '所以代表点的位置定义为', '\\vec r_{\\mathrm{cm}}=\\frac{\\sum_i m_i\\vec r_i}{\\sum_i m_i}'),
        formula('Component form', '分量形式', 'x_{\\mathrm{cm}}=\\frac{\\sum_i m_ix_i}{\\sum_i m_i},\\quad y_{\\mathrm{cm}}=\\frac{\\sum_i m_iy_i}{\\sum_i m_i}'),
      ],
      takeaway: text(
        'The formula is not arbitrary: it is the position that makes the whole system obey Fext = M acm.',
        '这个公式不是随便定义出来的:它正是让整个系统满足 Fext = M acm 的那个位置。',
      ),
    },
    {
      heading: text('3. Core theorem: external force controls center-of-mass acceleration', '3. 核心定理一:合外力决定质心加速度'),
      paragraphs: [
        text(
          'A complicated system moves as if all its mass were concentrated at the center of mass, as long as we are describing the motion of the system as a whole.',
          '当我们描述系统整体运动时,复杂系统可以看成总质量集中在质心上的一个点。',
        ),
      ],
      formulas: [
        formula('Center-of-mass form of Newton\'s second law', '质心形式的牛顿第二定律', '\\vec F_{\\mathrm{ext,net}}=M\\vec a_{\\mathrm{cm}}'),
        formula('External force determines acceleration, not velocity directly', '外力决定加速度,而不是直接决定速度', '\\vec F_{\\mathrm{ext,net}}\\rightarrow \\vec a_{\\mathrm{cm}}'),
      ],
      takeaway: text(
        'A net external force points in the direction of center-of-mass acceleration, not necessarily in the direction of center-of-mass velocity.',
        '合外力方向决定质心加速度方向,不一定决定质心速度方向。',
      ),
    },
    {
      heading: text('4. Internal force vs. external force', '4. Internal Force 和 External Force'),
      paragraphs: [
        text(
          'Internal forces are forces between parts inside the chosen system. External forces are forces exerted on the system by the outside environment.',
          '内力是系统内部各部分之间的力;外力是系统外部环境对系统施加的力。',
        ),
        text(
          'Internal forces can change the motion of individual parts, but they cannot change the motion of the center of mass of the whole system.',
          '内力可以改变系统内部各部分的运动,但不能改变整个系统质心的运动。',
        ),
      ],
      formulas: [
        formula('Newton\'s third law pair inside a system', '系统内部的牛顿第三定律力对', '\\vec F_{A\\mathrm{\\ on\\ }B}=-\\vec F_{B\\mathrm{\\ on\\ }A}'),
      ],
      bullets: [
        text('Collision forces between two carts are internal if both carts are in the system.', '如果两辆小车都在系统内,它们碰撞时彼此的作用力就是内力。'),
        text('Explosion forces between fragments are internal if all fragments are in the system.', '如果所有碎片都在系统内,爆炸力就是内力。'),
        text('Gravity, normal force, friction, air resistance, and outside pulls are external forces when they come from outside the system.', '重力、支持力、摩擦力、空气阻力和外部拉力通常是外力,前提是它们来自系统外部。'),
      ],
    },
    {
      heading: text('5. Firework explosion', '5. 典型现象:烟花爆炸'),
      paragraphs: [
        text(
          'After a firework explodes, fragments fly in many directions, but if air resistance is ignored, the center of mass of all fragments continues to follow the projectile path controlled by gravity.',
          '烟花爆炸后,碎片飞向各个方向;但如果忽略空气阻力,所有碎片组成系统的质心仍然沿着只受重力影响的抛体轨迹运动。',
        ),
      ],
      classroomQuestions: [
        {
          id: 'center-of-mass-explosion-fragments',
          title: text('Classroom Check: exploding falling mass', '课堂题:下落物体爆炸后的质心'),
          prompt: text(
            'A mass is falling vertically toward the ground when it explodes into two fragments of masses $m_1$ and $m_2$, which strike the ground at the same time. If the first mass lands a distance $d_1$ from the place it would have landed had the explosion not occurred, what is the final distance between the two masses after they land?',
            '一个物体正竖直下落,随后爆炸成质量分别为 $m_1$ 和 $m_2$ 的两个碎片,两个碎片同时落地。如果第一个碎片落在距离"没有爆炸时本应落地点" $d_1$ 的位置,那么两个碎片落地后的最终距离是多少?',
          ),
          image: {
            src: '/curriculum-assets/center-of-mass-explosion-fragments.png',
            alt: 'Two fragments landing on opposite sides of the original vertical path after an explosion.',
            caption: text('Figure 6.11', 'Figure 6.11'),
          },
          choices: [
            {
              label: 'A',
              text: text('Diagram option A from the original source', '原题图像选项 A'),
            },
            {
              label: 'B',
              text: text('Diagram option B from the original source', '原题图像选项 B'),
            },
            {
              label: 'C',
              text: text('$d_1\\left(1+\\frac{m_1}{m_2}\\right)$', '$d_1\\left(1+\\frac{m_1}{m_2}\\right)$'),
            },
            {
              label: 'D',
              text: text('$d_1\\left(1+\\frac{m_2}{m_1}\\right)$', '$d_1\\left(1+\\frac{m_2}{m_1}\\right)$'),
            },
            {
              label: 'E',
              text: text('Not enough information is given.', '信息不足,无法判断。'),
            },
          ],
          correctAnswer: 'C',
          feedback: text(
            'Internal forces cannot change the motion of the center of mass. The center of mass continues to fall along the original vertical line, so take the no-explosion landing point as the origin: $0=m_2d_2-m_1d_1$. Thus $d_2=d_1\\frac{m_1}{m_2}$, and the distance between the fragments is $d_1+d_2=d_1\\left(1+\\frac{m_1}{m_2}\\right)$.',
            '内力不影响质心运动。质心继续沿原来的竖直线下落,所以把"没有爆炸时本应落地点"作为原点:$0=m_2d_2-m_1d_1$。因此 $d_2=d_1\\frac{m_1}{m_2}$,两个碎片的距离为 $d_1+d_2=d_1\\left(1+\\frac{m_1}{m_2}\\right)$。',
          ),
        },
      ],
      takeaway: text(
        'The explosion changes the relative motion of fragments, not the motion of the system\'s center of mass.',
        '爆炸改变的是碎片之间的相对运动,而不是系统质心的整体运动。',
      ),
    },
    {
      heading: text('6. Two people pushing off on ice', '6. 典型现象:两个人在冰面上互相推开'),
      paragraphs: [
        text(
          'If two people start at rest on nearly frictionless ice and push each other apart, the push is internal to the two-person system. With no horizontal external force, the center of mass remains at rest.',
          '如果两个人一开始静止在几乎无摩擦的冰面上并互相推开,那么推力是两人系统的内力。水平方向没有合外力时,系统质心保持静止。',
        ),
      ],
      formulas: [
        formula('No net external force', '没有合外力', '\\vec F_{\\mathrm{ext,net}}=0'),
        formula('No center-of-mass acceleration', '质心加速度为零', '\\vec a_{\\mathrm{cm}}=0'),
      ],
      takeaway: text(
        'The two people move in opposite directions, but the center of mass of the system can stay in the same place.',
        '两个人可以分别向相反方向运动,但两人系统的质心可以仍然留在原来的位置。',
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
        '知道质心如何运动,就能理解系统总动量如何变化。',
      ),
    },
    {
      heading: text('8. Core theorem: no external force means constant center-of-mass velocity', '8. 核心定理二:没有合外力时,质心速度不变'),
      paragraphs: [
        text(
          'If the system mass is constant and the net external force is zero, total momentum is conserved and the center-of-mass velocity remains constant.',
          '如果系统质量不变,并且合外力为零,那么系统总动量守恒,质心速度保持不变。',
        ),
      ],
      formulas: [
        formula('Zero net external force', '合外力为零', '\\vec F_{\\mathrm{ext,net}}=0'),
        formula('Momentum conservation', '动量守恒', '\\vec p_{\\mathrm{total}}=\\mathrm{constant}'),
        formula('Constant center-of-mass velocity', '质心速度不变', '\\vec v_{\\mathrm{cm}}=\\mathrm{constant}'),
      ],
      takeaway: text(
        'Momentum conservation and constant center-of-mass velocity are two ways of saying the same system-level idea.',
        '动量守恒和质心速度不变,是同一个系统级思想的两种表达。',
      ),
    },
    {
      heading: text('9. Where this appears in momentum problems', '9. Center of Mass 在 Momentum 章节中的作用'),
      bullets: [
        text('Collisions: if external impulse is negligible, collisions do not change the center-of-mass velocity.', '碰撞:如果外力冲量可忽略,碰撞不会改变系统质心速度。'),
        text('Explosions: fragments separate, but the system cannot gain new total momentum from internal forces alone.', '爆炸:碎片会分开,但系统不能只靠内力凭空获得新的总动量。'),
        text('Recoil: one part moves one way and another part moves the opposite way so total momentum remains unchanged.', '反冲:系统一部分向某方向运动,另一部分向相反方向运动,从而保持总动量不变。'),
      ],
    },
    {
      heading: text('10. Common mistakes', '10. 学生最容易犯的错误'),
      bullets: [
        text('Thinking the center of mass must be inside the object.', '以为质心一定在物体内部。'),
        text('Thinking internal forces can change the motion of the whole system.', '以为内力可以改变系统整体运动。'),
        text('Thinking no external force means every object in the system keeps the same velocity.', '以为没有外力时,系统里每个物体速度都不变。'),
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
  title: text('Center of Mass: Calculus Form', 'Center of Mass(质心):微积分形式'),
  description: text(
    'The same center-of-mass modeling logic as AP Physics 1, with the key formulas written in calculus form for AP Physics C.',
    '保留与 AP Physics 1 相同的质心建模逻辑和例子,只把关键公式改写成 AP Physics C 需要的微积分形式。',
  ),
  sections: centerOfMassDiscreteLesson.sections.map((section) => {
    switch (section.heading.en) {
      case '2. Deriving the definition from whole-system motion':
        return {
          ...section,
          paragraphs: [
            text(
              'We do not start with an integral definition. We start with the physical goal: define one point whose acceleration represents the motion of the whole system.',
              '我们不从积分定义开始,而是先从物理目标出发:定义一个点,让它的加速度代表整个系统的整体运动。',
            ),
            text(
              'For each small mass element dm, Newton\'s second law gives a tiny contribution to force. When we add the whole system, internal forces cancel in pairs, so only the net external force remains.',
              '对每一个微小质量元 dm,牛顿第二定律给出一个微小的受力贡献。把整个系统加起来时,内力成对抵消,只剩合外力。',
            ),
            text(
              'The step that moves the time derivative outside the mass integral depends on a physical assumption: we are tracking the same material mass elements, so each dm is not changing with time.',
              '把时间导数移到质量积分外面的那一步依赖一个物理假设:我们追踪的是同一批物质质量元,所以每个 dm 不随时间改变。',
            ),
            text(
              'To make the system behave like one object of total mass M, the representative point must have the mass-weighted average position of all the mass elements.',
              '为了让系统整体表现得像一个总质量为 M 的物体,这个代表点的位置就必须是所有质量元位置的质量加权平均。',
            ),
          ],
          formulas: [
            formula('Desired whole-system equation', '我们希望系统整体满足', '\\vec F_{\\mathrm{ext,net}}=M\\vec a_{\\mathrm{cm}}'),
            formula('Total mass', '系统总质量', 'M=\\int dm'),
            formula('Add Newton\'s second law for every mass element', '把每个质量元的牛顿第二定律加起来', '\\vec F_{\\mathrm{ext,net}}=\\int \\vec a\\,dm'),
            formula('Acceleration is the second derivative of position', '加速度是位置对时间的二阶导数', '\\vec a=\\frac{d^2\\vec r}{dt^2}'),
            formula('Fixed mass element assumption', '固定质量元假设', '\\frac{\\partial}{\\partial t}(dm)=0'),
            formula('Move the time derivative outside the mass integral', '把时间导数移到质量积分外', '\\vec F_{\\mathrm{ext,net}}=\\int \\frac{d^2\\vec r}{dt^2}\\,dm=\\frac{d^2}{dt^2}\\int \\vec r\\,dm'),
            formula('Compare with the whole-system equation', '与系统整体方程比较', 'M\\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}=\\frac{d^2}{dt^2}\\int \\vec r\\,dm'),
            formula('Definition forced by the equation of motion', '由运动方程反推出质心定义', '\\vec r_{\\mathrm{cm}}=\\frac{1}{M}\\int \\vec r\\,dm'),
            formula('Component form', '分量形式', 'x_{\\mathrm{cm}}=\\frac{1}{M}\\int x\\,dm,\\quad y_{\\mathrm{cm}}=\\frac{1}{M}\\int y\\,dm,\\quad z_{\\mathrm{cm}}=\\frac{1}{M}\\int z\\,dm'),
            formula('Common mass elements', '常见质量元', 'dm=\\lambda\\,dx,\\quad dm=\\sigma\\,dA,\\quad dm=\\rho\\,dV'),
          ],
          takeaway: text(
            'The integral formula is not the starting assumption; it is the definition that makes Fext = M acm true for a continuous system.',
            '积分公式不是出发点,而是为了让连续系统满足 Fext = M acm 而自然得到的定义。',
          ),
        };
      case '3. Core theorem: external force controls center-of-mass acceleration':
        return {
          ...section,
          formulas: [
            formula('Center-of-mass acceleration', '质心加速度', '\\vec a_{\\mathrm{cm}}=\\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}'),
            formula('Center-of-mass form of Newton\'s second law', '质心形式的牛顿第二定律', '\\vec F_{\\mathrm{ext,net}}=\\frac{d}{dt}(M\\vec v_{\\mathrm{cm}})=M\\vec a_{\\mathrm{cm}}'),
            formula('External force determines acceleration, not velocity directly', '外力决定加速度,而不是直接决定速度', '\\vec F_{\\mathrm{ext,net}}\\rightarrow \\frac{d^2\\vec r_{\\mathrm{cm}}}{dt^2}'),
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

const scalarsVectors1DLesson: CurriculumLesson = {
  title: text('Scalars, Vectors, and One-Dimensional Motion', '标量、矢量与一维运动'),
  description: text('Build the foundation of motion description: scalars vs vectors, displacement vs distance, velocity vs speed, and how to choose a reference frame.', '建立运动描述的基础：标量与矢量、位移与路程、速度与速率，以及如何建立参考系。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('When we describe how something moves, words like "fast" or "far" are not enough for physics. We need quantities that carry both size and direction, and a rule for measuring them consistently.', '当我们描述一个物体的运动，光说"快"或"远"在物理中是不够的。我们需要同时包含大小和方向的量，以及一套一致的测量规则。'),
        text('This lesson introduces scalars (numbers only), vectors (numbers with direction), and how to use them to describe one-dimensional motion.', '本节介绍标量（只有数值）、矢量（数值加方向），以及如何用它们描述一维运动。')],
      takeaway: text('Scalars tell you "how much." Vectors tell you "how much and which way."', '标量告诉你"有多少"。矢量告诉你"有多少，向哪边"。')
    },
    {
      heading: text('1. Scalars vs vectors', '1. 标量与矢量'),
      paragraphs: [        text('A scalar is a single number with a unit, such as 5 kg or 20 C. A vector has both magnitude and direction. In one dimension, direction is captured by a sign: positive or negative relative to a chosen positive direction.', '标量是一个带单位的数值，如 5 kg 或 20 C。矢量既有大小又有方向。在一维中，方向由正负号表示：相对于选定的正方向为正或为负。')],
      bullets: [        text('Scalar examples: mass, temperature, speed, distance, time.', '标量示例：质量、温度、速率、路程、时间。'),
        text('Vector examples in 1D: displacement, velocity, acceleration.', '一维矢量示例：位移、速度、加速度。'),
        text('In 1D, a vector is a signed number: +3 m/s means 3 m/s in the positive direction.', '在一维中，矢量是带正负号的数：+3 m/s 表示正方向 3 m/s。')],
      formulas: [        formula('Speed is magnitude of velocity', '速率是速度的大小', '\text{speed}=|v|')]
    },
    {
      heading: text('2. Displacement vs distance', '2. 位移与路程'),
      paragraphs: [        text('Distance counts every meter traveled, regardless of direction. Displacement only cares about the starting point and the ending point.', '路程统计走过的每一米，不管方向。位移只关心起点和终点。'),
        text('If you walk 3 m forward and 2 m backward, distance = 5 m but displacement = +1 m (assuming forward is positive).', '如果你向前走 3 m 再向后走 2 m，路程 = 5 m，但位移 = +1 m（假设向前为正）。')],
      formulas: [        formula('Displacement', '位移', '\Delta x=x_f-x_i'),
        formula('Distance', '路程', 'd=\text{total path length}')]
    },
    {
      heading: text('3. Average velocity vs average speed', '3. 平均速度与平均速率'),
      paragraphs: [        text('Average velocity = displacement / time. Average speed = total distance / time. These can be very different.', '平均速度 = 位移 / 时间。平均速率 = 总路程 / 时间。两者可能差别很大。')],
      formulas: [        formula('Average velocity', '平均速度', 'v_{\mathrm{avg}}=\frac{\Delta x}{\Delta t}'),
        formula('Average speed', '平均速率', '\text{average speed}=\frac{\text{total distance}}{\Delta t}')]
    },
    {
      heading: text('4. Classroom check: round trip', '4. 课堂题：往返运动'),
      classroomQuestions: [        {
          id: 'scalar-vector-round-trip',
          title: text('Classroom Check: displacement and velocity', '课堂题：位移与速度'),
          prompt: text('A runner goes 100 m east in 20 s, then turns around and runs 60 m west in 15 s. Taking east as positive, which statement is correct?', '一名运动员向东跑 100 m 用时 20 s，然后掉头向西跑 60 m 用时 15 s。规定向东为正，下列哪项正确？'),
          choices: [
            { label: 'A', text: text('Average speed = 4.57 m/s, average velocity = +1.14 m/s', '平均速率 = 4.57 m/s，平均速度 = +1.14 m/s') },
            { label: 'B', text: text('Average speed = 4 m/s, average velocity = +1.14 m/s', '平均速率 = 4 m/s，平均速度 = +1.14 m/s') },
            { label: 'C', text: text('Average speed = 4.57 m/s, average velocity = 0 m/s', '平均速率 = 4.57 m/s，平均速度 = 0 m/s') },
            { label: 'D', text: text('Average speed = 1.14 m/s, average velocity = 4.57 m/s', '平均速率 = 1.14 m/s，平均速度 = 4.57 m/s') },
          ],
          correctAnswer: 'A',
          feedback: text('Total distance = 160 m. Total time = 35 s. Average speed = 160/35 = 4.57 m/s. Displacement = 100 - 60 = 40 m east. Average velocity = 40/35 = 1.14 m/s.', '总路程 = 160 m。总时间 = 35 s。平均速率 = 160/35 = 4.57 m/s。位移 = 100 - 60 = 40 m 向东。平均速度 = 40/35 = 1.14 m/s。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Treating velocity and speed as the same thing.', '把速度和速率当成同一个东西。'),
        text('Forgetting that displacement can be zero even when distance is large.', '忘记路程可以很大而位移为零。'),
        text('Not choosing a positive direction before assigning signs.', '在标正负号之前没有选定正方向。'),
        text('Using total distance instead of displacement when calculating average velocity.', '算平均速度时用了总路程而不是位移。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Displacement', '位移', '\Delta x=x_f-x_i'),
        formula('Average velocity', '平均速度', 'v_{\mathrm{avg}}=\frac{\Delta x}{\Delta t}'),
        formula('Average speed', '平均速率', '\text{average speed}=\frac{\text{total distance}}{\Delta t}'),
        formula('Speed from velocity', '由速度求速率', '\text{speed}=|v|')]
    }
  ],
};

const positionVelocityAccelerationLesson: CurriculumLesson = {
  title: text('Position, Velocity, and Acceleration', '位置、速度与加速度'),
  description: text('Connect the three core kinematic quantities through definitions, graphs, and the constant-acceleration model.', '通过定义、图像和匀加速模型连接位置、速度、加速度三个核心运动学量。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('If you know where an object is at every moment, can you predict where it will be next? The answers depend on understanding the relationship between position, velocity, and acceleration.', '如果你知道一个物体每一时刻的位置，能预测它下一刻在哪里吗？答案取决于你对位置、速度和加速度之间关系的理解。')],
      takeaway: text('Position tells you where. Velocity tells you where you are going. Acceleration tells you how velocity is changing.', '位置告诉你在哪里。速度告诉你往哪走。加速度告诉你速度怎么变。')
    },
    {
      heading: text('1. Definitions', '1. 定义'),
      paragraphs: [        text('Velocity is the rate of change of position. Acceleration is the rate of change of velocity.', '速度是位置的变化率。加速度是速度的变化率。')],
      formulas: [        formula('Instantaneous velocity', '瞬时速度', 'v=\frac{dx}{dt}'),
        formula('Instantaneous acceleration', '瞬时加速度', 'a=\frac{dv}{dt}=\frac{d^2x}{dt^2}')]
    },
    {
      heading: text('2. The meaning of acceleration', '2. 加速度的含义'),
      paragraphs: [        text('Acceleration is not the same as speed. When acceleration and velocity point in the same direction, the object speeds up. When they point in opposite directions, the object slows down.', '加速度不等于速度。当加速度和速度同向时，物体加速；当它们反向时，物体减速。')]
    },
    {
      heading: text('3. Reading motion graphs', '3. 读取运动图像'),
      paragraphs: [        text('The slope of a position-time graph gives velocity. The slope of a velocity-time graph gives acceleration. The area under a velocity-time graph gives displacement.', '位置-时间图像的斜率给出速度。速度-时间图像的斜率给出加速度。速度-时间图像下的面积给出位移。')],
      formulas: [        formula('From graph slope', '从图像斜率', 'v=\frac{dx}{dt},\quad a=\frac{dv}{dt}'),
        formula('From graph area', '从图像面积', '\Delta x=\int v\,dt,\quad \Delta v=\int a\,dt')]
    },
    {
      heading: text('4. Constant-acceleration model', '4. 匀加速模型'),
      paragraphs: [        text('When acceleration is constant, we can derive simple equations that connect position, velocity, and time.', '当加速度恒定时，我们可以推导出简单的方程来连接位置、速度和时间。')],
      formulas: [        formula('Velocity-time', '速度-时间关系', 'v=v_0+at'),
        formula('Position-time', '位置-时间关系', 'x=x_0+v_0t+\frac12at^2'),
        formula('Velocity-position', '速度-位移关系', 'v^2=v_0^2+2a(x-x_0)')],
      takeaway: text('These equations only work when acceleration is constant. Always check this condition first.', '这些方程只在加速度恒定时成立。使用前一定要先检查这个条件。')
    },
    {
      heading: text('5. Classroom check: speeding up or slowing down?', '5. 课堂题：加速还是减速？'),
      classroomQuestions: [        {
          id: 'speeding-up-or-slowing-down',
          title: text('Classroom Check: sign analysis', '课堂题：符号分析'),
          prompt: text('An object has velocity v = -5 m/s and acceleration a = -2 m/s^2. Is the object speeding up or slowing down?', '一个物体的速度为 v = -5 m/s，加速度为 a = -2 m/s^2。该物体在加速还是减速？'),
          choices: [
            { label: 'A', text: text('Speeding up, because velocity and acceleration have the same sign.', '加速，因为速度和加速度同号。') },
            { label: 'B', text: text('Slowing down, because acceleration is negative.', '减速，因为加速度为负。') },
            { label: 'C', text: text('Speeding up, because acceleration is negative.', '加速，因为加速度为负。') },
            { label: 'D', text: text('Slowing down, because velocity is negative.', '减速，因为速度为负。') },
          ],
          correctAnswer: 'A',
          feedback: text('When velocity and acceleration have the same sign, the magnitude of velocity increases. The object is moving in the negative direction and getting faster in that direction: speeding up.', '当速度和加速度同号时，速度的大小增加。物体向负方向运动且越来越快：加速。'),
        }]
    },
    {
      heading: text('6. Free fall as a constant-acceleration example', '6. 自由落体：匀加速的实例'),
      paragraphs: [        text('Near the surface, a falling object (ignoring air resistance) experiences constant downward acceleration of about 9.8 m/s^2.', '在地球表面附近，下落物体（忽略空气阻力）受到恒定的向下加速度，约 9.8 m/s^2。')],
      formulas: [        formula('Free-fall acceleration', '自由落体加速度', 'a_y=-g\approx-9.8\ \text{m/s}^2\quad(\text{taking up as positive})')]
    },
    {
      heading: text('7. Common mistakes', '7. 常见错误'),
      bullets: [        text('Confusing acceleration with velocity.', '把加速度和速度混为一谈。'),
        text('Thinking negative acceleration always means slowing down.', '以为负加速度就一定在减速。'),
        text('Using constant-acceleration equations when acceleration is not constant.', '加速度不恒定时仍然使用匀加速方程。'),
        text('Forgetting that at the peak of a projectile, velocity is zero but acceleration is not.', '忘记抛体最高点速度为零但加速度不为零。')]
    },
    {
      heading: text('8. Formula summary', '8. 本节核心公式'),
      formulas: [        formula('Definitions', '定义', 'v=\frac{dx}{dt},\quad a=\frac{dv}{dt}'),
        formula('Constant-acceleration equations', '匀加速方程', 'v=v_0+at,\quad x=x_0+v_0t+\frac12at^2,\quad v^2=v_0^2+2a\Delta x'),
        formula('Free fall', '自由落体', 'a=-g')]
    }
  ],
};

const referenceFramesRelativeMotionLesson: CurriculumLesson = {
  title: text('Reference Frames and Relative Motion', '参考系与相对运动'),
  description: text('Why the same motion looks different from different viewpoints, and how to translate between reference frames.', '为什么同一个运动在不同视角下看起来不同，以及如何在参考系之间转换。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('If you sit on a train and watch another train pass by, is it moving or are you moving? Both answers can be correct, depending on your reference frame.', '如果你坐在火车上看另一列火车经过，是它在动还是你在动？两个答案都可以正确，取决于你的参考系。')],
      takeaway: text('Motion is always measured relative to a chosen reference frame. State your frame first.', '运动总是相对于某个选定的参考系来测量的。先说清你的参考系。')
    },
    {
      heading: text('1. What is a reference frame?', '1. 什么是参考系？'),
      paragraphs: [        text('A reference frame is a coordinate system with an origin and a set of axes, plus a clock to measure time.', '参考系是一个带原点和坐标轴的坐标系，加上测量时间的时钟。')]
    },
    {
      heading: text('2. Relative velocity in one dimension', '2. 一维相对速度'),
      paragraphs: [        text('If observer A measures an object moving at a certain velocity relative to A, and A itself moves relative to C, then C measures the object velocity as the sum of the two.', '如果观察者 A 测得物体相对于 A 的速度，而 A 自身相对于 C 运动，则 C 测得物体的速度为两者之和。')],
      formulas: [        formula('Relative velocity (1D)', '一维相对速度', 'v_{BC}=v_{BA}+v_{AC}')]
    },
    {
      heading: text('3. Classroom check: moving walkway', '3. 课堂题：移动人行道'),
      classroomQuestions: [        {
          id: 'relative-motion-walkway',
          title: text('Classroom Check: reference frames', '课堂题：参考系'),
          prompt: text('A moving walkway travels at 2 m/s relative to the ground. A person walks forward on the walkway at 1 m/s relative to the walkway. What is the person speed relative to the ground?', '一条移动人行道相对于地面以 2 m/s 前进。一个人在人行道上以 1 m/s 相对于人行道向前走。这个人相对于地面的速度是多少？'),
          choices: [
            { label: 'A', text: text('1 m/s', '1 m/s') },
            { label: 'B', text: text('2 m/s', '2 m/s') },
            { label: 'C', text: text('3 m/s', '3 m/s') },
            { label: 'D', text: text('Cannot be determined without more information.', '信息不足，无法判断。') },
          ],
          correctAnswer: 'C',
          feedback: text('v_pg = v_pw + v_wg = 1 + 2 = 3 m/s. The person velocity relative to the ground is the sum of their velocity relative to the walkway plus the walkway velocity relative to the ground.', 'v_pg = v_pw + v_wg = 1 + 2 = 3 m/s。人相对于地面的速度等于人相对于人行道的速度加上人行道相对于地面的速度。'),
        }]
    },
    {
      heading: text('4. Common mistakes', '4. 常见错误'),
      bullets: [        text('Forgetting to state the reference frame before solving.', '解题前忘记说明参考系。'),
        text('Mixing up the order of subscripts in relative velocity.', '混淆相对速度下标的顺序。'),
        text('Adding speeds as scalars when the motions are in different directions.', '不同方向的运动仍把速率当标量相加。')]
    },
    {
      heading: text('5. Formula summary', '5. 本节核心公式'),
      formulas: [        formula('Relative velocity', '相对速度', '\vec v_{BC}=\vec v_{BA}+\vec v_{AC}')]
    }
  ],
};

const systemsCenterOfMassUnit2Lesson: CurriculumLesson = {
  title: text('Systems and Center of Mass', '系统与质心'),
  description: text('Define what a system means in physics, distinguish internal from external forces, and use center of mass to represent the motion of complex objects.', '定义物理中的系统概念，区分内力与外力，用质心代表复杂物体的运动。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('Before writing any force equation, you must decide what you are analyzing. The choice of system determines which forces are internal and which are external, and only external forces appear in the system equation.', '在写任何力的方程之前，你必须决定你要分析什么。系统的选择决定了哪些力是内力、哪些是外力，而只有外力出现在系统方程中。')],
      takeaway: text('Choose your system first. Everything else follows from that choice.', '先选系统。其他一切都从这个选择出发。')
    },
    {
      heading: text('1. What is a system?', '1. 什么是系统？'),
      paragraphs: [        text('A system is the set of objects you choose to analyze together. Everything outside the system is the environment.', '系统是你选择一起分析的一组物体。系统之外的一切都是环境。'),
        text('Internal forces are forces between objects inside the system. External forces are forces from the environment acting on the system.', '内力是系统内部物体之间的力。外力是环境中物体对系统施加的力。')],
      bullets: [        text('Two carts pushing each other: if both are in the system, the push is internal.', '两辆小车互相推：如果都在系统内，推力是内力。'),
        text('If only one cart is in the system, the other cart push is external.', '如果只有一辆车在系统内，另一辆车的推力就是外力。')]
    },
    {
      heading: text('2. Internal vs external forces', '2. 内力与外力'),
      paragraphs: [        text('Internal forces always come in equal-and-opposite pairs. When you add the force equations for all parts of a system, internal forces cancel. Only external forces determine the system overall acceleration.', '内力总是成对出现、大小相等方向相反。把系统各部分的力方程加起来时，内力抵消。只有外力决定系统的整体加速度。')],
      formulas: [        formula('Internal force pair', '内力对', '\vec F_{AB}=-\vec F_{BA}'),
        formula('System equation', '系统方程', '\sum \vec F_{\mathrm{ext}}=M\vec a_{\mathrm{cm}}')]
    },
    {
      heading: text('3. Center of mass as the representative point', '3. 质心作为代表点'),
      paragraphs: [        text('For an extended object or a multi-object system, the center of mass is the point that moves as if all the mass were concentrated there and all external forces acted there.', '对于一个有尺寸的物体或多物体系统，质心就是那个表现得像所有质量都集中在那里、所有外力都作用在那里的点。')],
      formulas: [        formula('Center of mass (discrete)', '质心（离散）', 'x_{\mathrm{cm}}=\frac{\sum m_ix_i}{\sum m_i}'),
        formula('System Newton second law', '系统牛顿第二定律', '\sum \vec F_{\mathrm{ext}}=M\vec a_{\mathrm{cm}}')]
    },
    {
      heading: text('4. Classroom check: system choice', '4. 课堂题：系统选择'),
      classroomQuestions: [        {
          id: 'system-choice-fbd',
          title: text('Classroom Check: internal vs external', '课堂题：内力与外力'),
          prompt: text('Two blocks of mass m1 and m2 are connected by a light string on a frictionless table. A force F pulls m1 to the right. If the system is defined as both blocks together, which forces are external?', '两个质量为 m1 和 m2 的方块用轻绳连接，放在无摩擦桌面上。一个力 F 向右拉 m1。如果系统定义为两个方块整体，哪些力是外力？'),
          choices: [
            { label: 'A', text: text('Only the applied force F.', '只有拉力 F。') },
            { label: 'B', text: text('The applied force F, gravity on both blocks, and the normal force from the table.', '拉力 F、两个方块的重力、桌面对方块的支持力。') },
            { label: 'C', text: text('The applied force F and the tension in the string.', '拉力 F 和绳中的张力。') },
            { label: 'D', text: text('Only the tension in the string.', '只有绳中的张力。') },
          ],
          correctAnswer: 'B',
          feedback: text('When both blocks are the system, the string tension is internal. The applied force F, gravity on each block, and normal forces from the table are all external.', '当两个方块都是系统时，绳中张力是内力。拉力 F、每个方块的重力和桌面的支持力都是外力。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Drawing internal forces on a free-body diagram of the whole system.', '在系统整体的自由体图上画内力。'),
        text('Forgetting that normal force and gravity are external when the system does not include the Earth or table.', '忘记当系统不包括地球或桌面时，支持力和重力是外力。'),
        text('Thinking the center of mass must be inside the material of the object.', '以为质心一定在物体的材料内部。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Center of mass (1D)', '质心（一维）', 'x_{\mathrm{cm}}=\frac{\sum m_ix_i}{\sum m_i}'),
        formula('System Newton second law', '系统牛顿第二定律', '\sum \vec F_{\mathrm{ext}}=M\vec a_{\mathrm{cm}}')]
    }
  ],
};

const forcesFreeBodyDiagramsUnit2Lesson: CurriculumLesson = {
  title: text('Forces and Free-Body Diagrams', '力与自由体图'),
  description: text('Identify all forces acting on a chosen system, draw a clean free-body diagram, and translate it into a Newton equation.', '识别作用在所选系统上的所有力，画出清晰的自由体图，并将其转化为牛顿方程。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('Real objects are pushed, pulled, and twisted by many forces at once. To predict motion, we must identify every force, represent it as a vector, and add them correctly. The free-body diagram is the single most important tool for doing this.', '真实物体同时被很多力推、拉、扭曲。要预测运动，我们必须识别每一个力，把它表示为矢量，然后正确地相加。自由体图是做到这一点的最重要工具。')],
      takeaway: text('A good free-body diagram is half the solution.', '一张好的自由体图就是解题的一半。')
    },
    {
      heading: text('1. Common forces', '1. 常见的力'),
      bullets: [        text('Weight (gravity): always downward toward the center of the Earth.', '重力：始终指向地心向下。'),
        text('Normal force: perpendicular to the contact surface.', '支持力：垂直接触面。'),
        text('Friction: parallel to the contact surface, opposing relative motion.', '摩擦力：平行接触面，方向与相对运动相反。'),
        text('Tension: pulls along a rope or string.', '张力：沿绳子方向拉。'),
        text('Spring force: F = -kx, restoring toward equilibrium.', '弹簧力：F = -kx，回复平衡位置。')]
    },
    {
      heading: text('2. How to draw a free-body diagram', '2. 如何画自由体图'),
      paragraphs: [        text('Step 1: Choose the system. Step 2: Draw a dot. Step 3: Draw one arrow for each external force. Step 4: Label each force. Step 5: Choose coordinate axes.', '第一步：选系统。第二步：画一个点。第三步：为每个外力画一个箭头。第四步：标出每个力。第五步：选坐标轴。')],
      bullets: [        text('Never draw forces the object exerts on other things.', '绝不画物体对其他物体施加的力。'),
        text('Never draw internal forces.', '绝不画内力。'),
        text('The length of each arrow should roughly reflect the force magnitude.', '每个箭头的长度应大致反映力的大小。')]
    },
    {
      heading: text('3. From FBD to equations', '3. 从自由体图到方程'),
      paragraphs: [        text('Once the FBD is drawn, write Newton second law for each axis separately.', '画好自由体图后，对每个坐标轴分别写出牛顿第二定律。')],
      formulas: [        formula('Newton second law (component form)', '牛顿第二定律（分量形式）', '\sum F_x=ma_x,\quad \sum F_y=ma_y')]
    },
    {
      heading: text('4. Classroom check: block on a ramp', '4. 课堂题：斜面上的方块'),
      classroomQuestions: [        {
          id: 'fbd-ramp-forces',
          title: text('Classroom Check: free-body diagram', '课堂题：自由体图'),
          prompt: text('A block rests on a rough inclined ramp at rest. Which forces act on the block?', '一个方块静止在粗糙斜面上。方块受到哪些力？'),
          choices: [
            { label: 'A', text: text('Gravity, normal force, and static friction.', '重力、支持力和静摩擦力。') },
            { label: 'B', text: text('Gravity and normal force only.', '只有重力和支持力。') },
            { label: 'C', text: text('Gravity, normal force, and kinetic friction.', '重力、支持力和动摩擦力。') },
            { label: 'D', text: text('Gravity, normal force, friction, and a force pushing it up the ramp.', '重力、支持力、摩擦力和一个沿斜面向上推它的力。') },
          ],
          correctAnswer: 'A',
          feedback: text('The block is at rest, so static friction acts to prevent sliding down the ramp. Gravity pulls down, the normal force is perpendicular to the surface, and static friction points up the ramp.', '方块静止，所以静摩擦力阻止它沿斜面下滑。重力向下，支持力垂直于斜面，静摩擦力沿斜面向上。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Drawing ma as a force on the FBD.', '把 ma 当作力画在自由体图上。'),
        text('Drawing the force the object exerts on the surface instead of the force the surface exerts on the object.', '画物体对表面的力而不是表面对物体的力。'),
        text('Adding a fictitious force of motion in the direction of velocity.', '虚构一个沿速度方向的动力。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Newton second law', '牛顿第二定律', '\sum \vec F=m\vec a'),
        formula('Weight', '重力', 'W=mg')]
    }
  ],
};

const newtonsThirdLawUnit2Lesson: CurriculumLesson = {
  title: text('Newton\\\'s Third Law: Action and Reaction', '牛顿第三定律：作用力与反作用力'),
  description: text('Understand that forces always come in pairs between two objects, and why these pairs never cancel when analyzing a single object.', '理解力总是成对出现在两个物体之间，以及为什么分析单个物体时这些力对不会抵消。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('When you push a wall, the wall pushes back. Forces are interactions between two objects, not properties of a single object. The third law formalizes this idea.', '你推墙时，墙也推你。力是两个物体之间的相互作用，不是单个物体的属性。第三定律将这个思想形式化。')],
      takeaway: text('Forces come in pairs. Each force in the pair acts on a different object.', '力成对出现。力对中的每个力作用在不同的物体上。')
    },
    {
      heading: text('1. The law', '1. 定律表述'),
      paragraphs: [        text('If object A exerts a force on object B, then object B exerts a force of equal magnitude and opposite direction on object A.', '如果物体 A 对物体 B 施加一个力，那么物体 B 对物体 A 施加一个大小相等、方向相反的力。')],
      bullets: [        text('The two forces act on different objects.', '两个力作用在不同物体上。'),
        text('The two forces are the same type.', '两个力是同一类型的。'),
        text('They are simultaneous, neither causes the other.', '它们是同时的，没有一个导致另一个。')],
      formulas: [        formula('Newton third law', '牛顿第三定律', '\vec F_{A\mathrm{\ on\ }B}=-\vec F_{B\mathrm{\ on\ }A}')]
    },
    {
      heading: text('2. Why do not they cancel?', '2. 为什么它们不抵消？'),
      paragraphs: [        text('Forces only cancel when they act on the same object. The action-reaction pair acts on two different objects.', '力只有在作用在同一个物体上时才会抵消。作用-反作用力对作用在两个不同物体上。')]
    },
    {
      heading: text('3. Classroom check: horse and cart', '3. 课堂题：马拉车'),
      classroomQuestions: [        {
          id: 'newton-third-horse-cart',
          title: text('Classroom Check: action-reaction pairs', '课堂题：作用-反作用力对'),
          prompt: text('A horse pulls a cart forward. The cart pulls the horse backward with an equal force. How does the cart move forward?', '一匹马向前拉车。车以相等的力向后拉马。车怎么会向前运动？'),
          choices: [
            { label: 'A', text: text('The horse pulls harder than the cart pulls back.', '马比车拉得更用力。') },
            { label: 'B', text: text('The forces are equal, but the horse pushes backward on the ground, and the ground pushes forward on the horse.', '两个力相等，但马还向后蹬地，地面向前推马。') },
            { label: 'C', text: text('The cart pull on the horse is weaker because the cart is rolling.', '车拉马的力更弱，因为车在滚动。') },
            { label: 'D', text: text('The two forces cancel, so the cart moves because of inertia.', '两个力抵消，所以车因为惯性而运动。') },
          ],
          correctAnswer: 'B',
          feedback: text('The horse-cart force pair is equal and opposite, but they act on different objects. The horse moves forward because the ground pushes forward on the horse.', '马-车的力对大小相等方向相反，但它们作用在不同物体上。马向前运动是因为地面向前推马。'),
        }]
    },
    {
      heading: text('4. Common mistakes', '4. 常见错误'),
      bullets: [        text('Thinking the stronger object exerts a larger force.', '以为更强的物体施加更大的力。'),
        text('Confusing an action-reaction pair with two balanced forces on one object.', '把作用-反作用力对与一个物体上的两个平衡力混淆。')]
    },
    {
      heading: text('5. Formula summary', '5. 本节核心公式'),
      formulas: [        formula('Newton third law', '牛顿第三定律', '\vec F_{A\mathrm{\ on\ }B}=-\vec F_{B\mathrm{\ on\ }A}')]
    }
  ],
};

const newtonsFirstSecondLawUnit2Lesson: CurriculumLesson = {
  title: text('Newton\\\'s First and Second Laws', '牛顿第一和第二定律'),
  description: text('Connect force, mass, and acceleration. Understand inertia, equilibrium, and how to build equations from free-body diagrams.', '连接力、质量和加速度。理解惯性、平衡状态，以及如何从自由体图建立方程。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('Why does a hockey puck glide across ice for so long, but a book slides to a stop on a table? Why does a heavy truck need more force to accelerate than a bicycle? Newton first two laws give us the connection.', '为什么冰球能在冰上滑行很久，而书在桌上会停下来？为什么卡车比自行车需要更大的力才能加速？牛顿的前两个定律给出了这个联系。')],
      takeaway: text('Force changes motion. Mass resists that change.', '力改变运动。质量抵抗这种改变。')
    },
    {
      heading: text('1. Newton First Law: the law of inertia', '1. 牛顿第一定律：惯性定律'),
      paragraphs: [        text('An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted on by a net external force.', '静止的物体保持静止，运动的物体保持匀速运动，除非受到合外力的作用。'),
        text('Inertia is the tendency of an object to resist changes in its motion. Mass is the quantitative measure of inertia.', '惯性是物体抵抗运动变化的倾向。质量是惯性的定量度量。')],
      bullets: [        text('Net external force matters, not just any force.', '重要的是合外力，不是随便哪个力。'),
        text('Equilibrium means net force equals zero.', '平衡状态意味着合力为零。')]
    },
    {
      heading: text('2. Newton Second Law', '2. 牛顿第二定律'),
      paragraphs: [        text('The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.', '物体的加速度与作用在它上面的合外力成正比，与它的质量成反比。')],
      formulas: [        formula('Newton second law', '牛顿第二定律', '\sum \vec F=m\vec a'),
        formula('Component form', '分量形式', '\sum F_x=ma_x,\quad \sum F_y=ma_y')]
    },
    {
      heading: text('3. Problem-solving recipe', '3. 解题步骤'),
      paragraphs: [        text('Step 1: Choose the system. Step 2: Draw a free-body diagram. Step 3: Choose coordinate axes. Step 4: Write sum F = ma for each axis. Step 5: Solve.', '第一步：选系统。第二步：画自由体图。第三步：选坐标轴。第四步：对每个轴写 sum F = ma。第五步：求解。')]
    },
    {
      heading: text('4. Classroom check: elevator scale', '4. 课堂题：电梯秤'),
      classroomQuestions: [        {
          id: 'elevator-scale-reading',
          title: text('Classroom Check: Newton second law', '课堂题：牛顿第二定律'),
          prompt: text('A person of mass 60 kg stands on a scale in an elevator. The elevator accelerates upward at 2 m/s^2. What does the scale read?', '一个质量为 60 kg 的人站在电梯里的秤上。电梯以 2 m/s^2 的加速度向上加速。秤的读数是多少？'),
          choices: [
            { label: 'A', text: text('600 N (the person weight)', '600 N（人的体重）') },
            { label: 'B', text: text('480 N (less than weight)', '480 N（小于体重）') },
            { label: 'C', text: text('720 N (more than weight)', '720 N（大于体重）') },
            { label: 'D', text: text('120 N (ma only)', '120 N（只有 ma）') },
          ],
          correctAnswer: 'C',
          feedback: text('Taking up as positive: N - mg = ma. N = mg + ma = 60 * 10 + 60 * 2 = 720 N. The scale reads the normal force, which is greater than weight because the elevator is accelerating upward.', '向上为正：N - mg = ma。N = mg + ma = 60 * 10 + 60 * 2 = 720 N。秤读的是支持力，大于体重，因为电梯在向上加速。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Writing F = ma instead of sum F = ma (missing net).', '写 F = ma 而不是 sum F = ma（漏了合）。'),
        text('Treating weight as mass (60 kg is not 60 N).', '把质量当体重（60 kg 不等于 60 N）。'),
        text('Forgetting that an object moving at constant velocity has zero net force.', '忘记匀速运动的物体合力为零。'),
        text('Adding ma as a force on the FBD.', '把 ma 当力加在自由体图上。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Newton second law', '牛顿第二定律', '\sum \vec F=m\vec a'),
        formula('Weight', '重力', 'W=mg'),
        formula('Equilibrium', '平衡条件', '\sum \vec F=0\Rightarrow \vec a=0')]
    }
  ],
};

const gravitationalForceUnit2Lesson: CurriculumLesson = {
  title: text('Gravitational Force', '万有引力'),
  description: text('Understand the difference between the local model W = mg and the universal law of gravitation, and when to use each.', '理解局部模型 W = mg 与万有引力定律的区别，以及何时使用哪个。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('Near the surface, we use W = mg. But what about the Moon or a satellite? The universal law of gravitation works everywhere.', '在表面附近，我们用 W = mg。但月球呢？轨道卫星呢？万有引力定律在任何地方都适用。')],
      takeaway: text('W = mg is a shortcut near the surface. The universal law works everywhere.', 'W = mg 是表面附近的便捷公式。万有引力定律在任何地方都有效。')
    },
    {
      heading: text('1. The universal law of gravitation', '1. 万有引力定律'),
      paragraphs: [        text('Every pair of masses attracts each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.', '每一对质量之间的引力与它们的质量乘积成正比，与它们之间距离的平方成反比。')],
      formulas: [        formula('Universal gravitation', '万有引力定律', 'F_g=G\frac{m_1m_2}{r^2}')]
    },
    {
      heading: text('2. Connecting W = mg to the universal law', '2. W = mg 与万有引力定律的联系'),
      paragraphs: [        text('Near the surface, r is approximately the Earth radius, so g = GM / R^2.', '在表面附近，r 约等于地球半径，所以 g = GM / R^2。')],
      formulas: [        formula('Local g from universal law', '由万有引力定律导出局部 g', 'g=\frac{GM}{r^2}'),
        formula('Weight near surface', '表面附近的重力', 'W=mg')]
    },
    {
      heading: text('3. Common mistakes', '3. 常见错误'),
      bullets: [        text('Thinking g = 9.8 m/s^2 everywhere in the universe.', '以为 g = 9.8 m/s^2 在宇宙任何地方都成立。'),
        text('Confusing G (universal constant) with g (local field strength).', '混淆 G（万有引力常数）和 g（局部场强）。')]
    },
    {
      heading: text('4. Formula summary', '4. 本节核心公式'),
      formulas: [        formula('Universal gravitation', '万有引力定律', 'F_g=G\frac{m_1m_2}{r^2}'),
        formula('Local weight', '局部重力', 'W=mg')]
    }
  ],
};

const frictionSpringsCircularMotionUnit2Lesson: CurriculumLesson = {
  title: text('Friction, Springs, and Circular Motion', '摩擦力、弹簧力与圆周运动'),
  description: text('Model three specific force types: friction, spring force, and the net force required for circular motion.', '建模三种特定的力类型：摩擦力、弹簧力和圆周运动所需的合力。'),
  sections: [
    {
      heading: text('0. What problem does this lesson solve?', '0. 这一节要解决什么问题？'),
      paragraphs: [        text('Not all forces are constant. Friction depends on whether the object is moving. Spring force depends on stretch. Circular motion requires a net force toward the center.', '不是所有的力都是恒定的。摩擦力取决于物体是否在运动。弹簧力取决于拉伸量。圆周运动需要一个指向中心的合力。')]
    },
    {
      heading: text('1. Friction', '1. 摩擦力'),
      paragraphs: [        text('Static friction prevents motion up to a maximum value. Kinetic friction opposes motion once the object is sliding.', '静摩擦力阻止运动，直到达到最大值。动摩擦力在物体滑动时阻碍运动。')],
      bullets: [        text('Static friction adjusts to match the applied force, up to its maximum.', '静摩擦力会调节以匹配外力，直到最大值。'),
        text('mu_k is typically less than mu_s.', 'mu_k 通常小于 mu_s。')],
      formulas: [        formula('Static friction (maximum)', '最大静摩擦力', 'f_{s,\max}=\mu_s N'),
        formula('Kinetic friction', '动摩擦力', 'f_k=\mu_k N')]
    },
    {
      heading: text('2. Spring force', '2. 弹簧力'),
      paragraphs: [        text('A spring exerts a restoring force proportional to how far it is displaced from equilibrium.', '弹簧施加一个回复力，与它偏离平衡位置的距离成正比。')],
      bullets: [        text('k is the spring constant. x is displacement from equilibrium, not total length.', 'k 是弹簧常数。x 是偏离平衡的位移，不是总长度。')],
      formulas: [        formula('Hooke law', '胡克定律', 'F_s=-kx')]
    },
    {
      heading: text('3. Circular motion', '3. 圆周运动'),
      paragraphs: [        text('An object moving in a circle at constant speed still has acceleration toward the center. This requires a net force in the same direction.', '一个以恒定速率做圆周运动的物体仍然有向心加速度。这需要一个同方向的合力。')],
      bullets: [        text('Centripetal force is not a new force. It is the net force toward the center.', '向心力不是新力。它是向中心的合力。'),
        text('Never draw centripetal force as a separate force on an FBD.', '永远不要把向心力作为单独的力画在自由体图上。')],
      formulas: [        formula('Centripetal acceleration', '向心加速度', 'a_c=\frac{v^2}{r}=\omega^2r'),
        formula('Centripetal force', '向心力', '\sum F_r=m\frac{v^2}{r}')]
    },
    {
      heading: text('4. Classroom check: friction', '4. 课堂题：摩擦力'),
      classroomQuestions: [        {
          id: 'friction-static-vs-kinetic',
          title: text('Classroom Check: static vs kinetic friction', '课堂题：静摩擦与动摩擦'),
          prompt: text('A 10 kg box sits on a horizontal floor. mu_s = 0.5 and mu_k = 0.3. You push horizontally with a force of 40 N. Does the box move? What is the friction force?', '一个 10 kg 的箱子放在水平地面上。mu_s = 0.5，mu_k = 0.3。你用 40 N 的力水平推它。箱子会动吗？摩擦力多大？'),
          choices: [
            { label: 'A', text: text('Yes, it moves. Friction = 30 N (kinetic).', '会动。摩擦力 = 30 N（动摩擦）。') },
            { label: 'B', text: text('No, it stays. Friction = 40 N (static, matching the push).', '不动。摩擦力 = 40 N（静摩擦，与推力匹配）。') },
            { label: 'C', text: text('No, it stays. Friction = 50 N (maximum static).', '不动。摩擦力 = 50 N（最大静摩擦）。') },
            { label: 'D', text: text('Yes, it moves. Friction = 50 N.', '会动。摩擦力 = 50 N。') },
          ],
          correctAnswer: 'B',
          feedback: text('Maximum static friction = mu_s * N = 0.5 * 10 * 10 = 50 N. Since 40 N < 50 N, the box does not move. Static friction adjusts to exactly match: f_s = 40 N.', '最大静摩擦力 = mu_s * N = 0.5 * 10 * 10 = 50 N。因为 40 N < 50 N，箱子不动。静摩擦力调节到刚好等于推力：f_s = 40 N。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Using mu_s * N for friction even when the object is moving.', '物体在运动时仍然用 mu_s * N 算摩擦力。'),
        text('Drawing centripetal force as a separate force on the FBD.', '在自由体图上把向心力画成单独的力。'),
        text('Using the total length of the spring instead of the displacement from equilibrium.', '用了弹簧总长度而不是偏离平衡的位移。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Static friction', '静摩擦力', 'f_s\le \mu_s N'),
        formula('Kinetic friction', '动摩擦力', 'f_k=\mu_k N'),
        formula('Hooke law', '胡克定律', 'F_s=-kx'),
        formula('Centripetal force', '向心力', '\sum F_r=m\frac{v^2}{r}')]
    }
  ],
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
    '当力会变化,或过程细节不如状态变化重要时,用功和能量方法建模。',
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
    '识别回复力模型,并连接周期、相位、能量交换和图像。',
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
    formula('Newton\'s second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
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
    formula('Coulomb\'s law', '库仑定律', 'F=k\\frac{|q_1q_2|}{r^2}'),
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
    formula('Faraday\'s law', '法拉第定律', '\\mathcal E=-\\frac{d\\Phi_B}{dt},\\quad \\Phi_B=\\int \\vec B\\cdot d\\vec A'),
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
    formula('Gauss\'s law', '高斯定律', '\\oint \\vec E\\cdot d\\vec A=\\frac{Q_{enc}}{\\epsilon_0}'),
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
  dynamics: [diagram('free-body', 'Free-Body Diagram', '自由体图', 'Choose the system, then draw only external forces acting on it.', '先选系统,再只画作用在系统上的外力。')],
  energy: [diagram('energy-bar', 'Energy Transfer', '能量转化', 'Energy bars make conservation and nonconservative work visible.', '能量柱状图能直观看出守恒与非保守力做功。')],
  momentum: [diagram('collision', 'Impulse and Collision', '冲量与碰撞', 'Momentum is most useful when interaction forces are internal or brief.', '当相互作用力主要是内力或持续时间很短时,动量方法最有效。')],
  rotation: [diagram('rotation', 'Rotational Model', '转动模型', 'Torque depends on force, lever arm, and angle.', '力矩取决于力、力臂和夹角。')],
  oscillation: [diagram('oscillation', 'SHM Phase', '简谐运动相位', 'Position, velocity, acceleration, and energy change predictably over a cycle.', '位置、速度、加速度和能量在一个周期内有规律变化。')],
  fluids: [diagram('fluid-flow', 'Fluid Flow', '流体流动', 'A narrow pipe section has higher speed and different pressure.', '管道变窄处流速更大,压强会发生变化。')],
  thermal: [diagram('gas-cycle', 'Gas Process', '气体过程', 'PV diagrams connect work, heat, and internal energy.', 'PV 图像连接做功、热量与内能变化。')],
  electric: [diagram('electric-field', 'Electric Field', '电场', 'Field lines and equipotentials reveal force direction and energy change.', '电场线和等势线体现受力方向与能量变化。')],
  circuits: [diagram('circuit', 'Circuit Model', '电路模型', 'Junctions conserve charge; loops conserve energy.', '节点体现电荷守恒,回路体现能量守恒。')],
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
  'physics-1:1': {
    ...enrich('kinematics', 'kinematics', 'kinematics', [
      ['Distinguish scalars, vectors, components, and reference frames.', '区分标量、矢量、分量与参考系。'],
      ['Interpret slope and area on position, velocity, and acceleration graphs.', '解释位置、速度、加速度图像的斜率和面积。'],
      ['Model one- and two-dimensional motion with vector components.', '用矢量分量建立一维和二维运动模型。'],
    ]),
    lessons: [
      scalarsVectors1DLesson,
      positionVelocityAccelerationLesson,
      referenceFramesRelativeMotionLesson,
      kinematicsGraphSignLesson,
    ],
  },
  'physics-1:2': {
    ...enrich('dynamics', 'dynamics', 'dynamics', [
      ['Represent interactions with system boundaries and free-body diagrams.', '用系统边界和自由体图表示相互作用。'],
      ['Apply Newton\'s laws to friction, springs, gravity, and circular motion.', '把牛顿定律应用到摩擦、弹簧、重力和圆周运动。'],
      ['Separate internal forces from external forces before writing equations.', '列方程前先区分内力与外力。'],
    ]),
    lessons: [
      systemsCenterOfMassUnit2Lesson,
      forcesFreeBodyDiagramsUnit2Lesson,
      newtonsThirdLawUnit2Lesson,
      newtonsFirstSecondLawUnit2Lesson,
      gravitationalForceUnit2Lesson,
      frictionSpringsCircularMotionUnit2Lesson,
    ],
  },
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
    lessons: [impulseMomentumLesson, centerOfMassDiscreteLesson],
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
    ['Apply buoyancy and Newton\'s laws to submerged or floating objects.', '把浮力和牛顿定律用于浸没或漂浮物体。'],
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
    ['Model current as charge flow and voltage as energy per charge.', '把电流建模为电荷流,把电压理解为单位电荷能量。'],
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
  'mechanics:1': {
    ...enrich('kinematics', 'kinematics', 'kinematics', [
      ['Use derivatives and integrals to move between position, velocity, and acceleration.', '用导数和积分在位置、速度、加速度之间转换。'],
      ['Handle 2D/3D vectors, parametric motion, and relative motion.', '处理二维/三维矢量、参数运动和相对运动。'],
      ['Interpret motion graphs quantitatively.', '定量解释运动图像。'],
    ]),
    lessons: [kinematicsGraphSignLesson],
  },
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
    lessons: [impulseMomentumLesson, centerOfMassCalculusLesson],
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
    ['Apply Gauss\'s law to common charge distributions.', '把高斯定律用于常见电荷分布。'],
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
    ['Use Biot-Savart and Ampere\'s law for magnetic fields.', '用毕奥-萨伐尔定律和安培定律求磁场。'],
    ['Predict magnetic forces on charges, wires, and loops.', '预测电荷、导线和线圈受到的磁力。'],
    ['Use symmetry to simplify magnetic field calculations.', '用对称性简化磁场计算。'],
  ]),
  'electricity-magnetism:13': enrich('magnetism', 'magnetism', 'magnetism', [
    ['Connect changing flux with induced emf and Lenz\'s law.', '把变化磁通量与感应电动势、楞次定律连接起来。'],
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
      ['Model motion with equations, graphs, and Newton\'s laws.', '用方程、图像和牛顿定律建模运动。'],
      ['Apply density, pressure, and force equilibrium in real systems.', '在真实系统中应用密度、压强和受力平衡。'],
      ['Use energy methods for work, efficiency, and power.', '用能量方法处理功、效率和功率。'],
    ])),
    unit(3, 'Matter and Materials', '物质与材料', 'Core AS', [
      topic('7', 'Deformation of solids', '固体形变'),
    ], {
      summary: text('Connect force-extension graphs with elastic behavior, energy storage, and material limits.', '把力-伸长图像与弹性行为、储能和材料极限联系起来。'),
      focus: focus(
        ['Use Hooke\'s law and elastic potential energy.', '使用胡克定律和弹性势能。'],
        ['Distinguish stress, strain, Young modulus, and plastic deformation.', '区分应力、应变、杨氏模量和塑性形变。'],
        ['Read material behavior from experimental graphs.', '从实验图像读出材料性质。'],
      ),
      formulas: [
        formula('Hooke\'s law', '胡克定律', 'F=kx'),
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
  level: text('First assessment 2025: SL/HL', '2025 首考:SL / HL'),
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
      summary: text('The motion theme builds from everyday motion to momentum, energy, rotation, and relativity.', '运动主题从日常运动出发,逐步进入动量、能量、转动和相对论。'),
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
      '基于剑桥国际 AS & A Level 物理 9702,从测量到近代物理组织学习路径。',
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
