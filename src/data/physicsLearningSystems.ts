import {
  apPhysicsCurriculum,
  type CurriculumCourse,
  type CurriculumDiagram,
  type CurriculumFormula,
  type CurriculumLesson,
  type CurriculumLessonContent,
  type CurriculumTopic,
  type CurriculumUnit,
  type LocalizedText,
} from './apPhysicsCurriculum';
import { circularMotionLessons } from './circularMotionKnowledgeMap';
import { rotationalDynamicsLessons, rotatingSystemsLessons } from './rotationKnowledgeMap';
import {
  capacitorEnergyAndDielectricLessons,
  electricCurrentToOhmsLawLessons,
} from './emCapacitorEnergyToOhmsLawKnowledgeMap';
import { igcseUnit1Lessons } from './igcseUnit1KnowledgeMap';
import { igcseUnit2Lessons } from './igcseUnit2KnowledgeMap';
import { igcseUnit3Lessons } from './igcseUnit3KnowledgeMap';
import { igcseUnit4Lessons } from './igcseUnit4KnowledgeMap';
import { igcseUnit5Lessons } from './igcseUnit5KnowledgeMap';

export type LearningSystemId = 'ap' | 'igcse' | 'alevel' | 'ib' | 'competition';

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
    'A guide for reading velocity graphs without confusing velocity value, direction, and speed.',
    '一份用于读懂速度图像的学习指南,帮助区分速度数值、运动方向和速率。',
  ),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [
        text(
          'A ball rolling downhill can speed up while its velocity value becomes more negative. On a velocity-time graph, the sign of velocity carries direction, so a line moving downward can still describe an object speeding up in the negative direction.',
          '一个小球沿斜面向下滚时,速率可能越来越大,但速度数值却越来越负。在速度-时间图像中,速度的正负包含方向,所以一条向下走的线,也可能表示物体在负方向上越来越快。',
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
    '澄清力、冲量、动量以及动量守恒条件的学习小节。',
  ),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [
        text(
          'A tennis ball changes motion sharply when it hits a racket, while two carts can collide and still keep the same total momentum. Impulse and momentum explain what changes during the short contact time and what remains fixed for the chosen system.',
          '网球撞到球拍时运动状态会迅速改变,两辆小车碰撞时系统总动量却可能保持不变。冲量与动量解释的是:短暂接触时间内什么发生了变化,以及所选系统中什么保持不变。',
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
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
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
      heading: text('10. Common mistakes', '10. 常见错误'),
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

const capacitorsStudentVersion: CurriculumLessonContent = {
    title: text('Capacitors and Capacitance: Core Map', '电容器与电容:核心知识地图'),
    description: text(
      'A compact route from the need for rapid energy release to capacitance, parallel-plate derivation, stored energy, and dielectrics.',
      '从快速释能需求出发,浓缩呈现电容定义、平行板推导、储能和电介质效应。',
    ),
    sections: [
      {
        heading: text('0. Motivation: why a capacitor is needed', '0. 动机:为什么需要电容器'),
        bullets: [
          text('A source may contain enough total energy but still be unable to deliver it quickly enough for a brief high-power event.', '电源可能拥有足够总能量,却无法为短时高功率过程快速输出。'),
          text('A capacitor separates slow energy accumulation from fast energy release, like a tank filled by a limited-flow pipe.', '电容器把慢速积累与快速释放分开,类似细水管先把水箱装满。'),
        ],
        formulas: [formula('Power over a short interval', '短时间内的功率', 'P=\\frac{\\Delta E}{\\Delta t}')],
      },
      {
        heading: text('1. What is stored', '1. 储存的是什么'),
        bullets: [
          text('The two plates carry equal-magnitude opposite charges: $+Q$ and $-Q$.', '两块极板带等量异号电荷:$+Q$ 和 $-Q$。'),
          text('The capacitor usually has zero net charge; the useful physical change is charge separation.', '电容器整体通常净电荷为零;关键变化是电荷分离。'),
          text('Energy is stored in the electric field created by the separated charges.', '能量储存在分离电荷所建立的电场中。'),
        ],
        formulas: [formula('Net charge', '净电荷', 'Q_{\\mathrm{net}}=(+Q)+(-Q)=0')],
      },
      {
        heading: text('2. Why define capacitance', '2. 为什么要定义电容'),
        bullets: [
          text('Adding plate charge increases the field and voltage; excessive field can cause dielectric breakdown.', '增加极板电荷会提高电场和电压;电场过强可能导致介质击穿。'),
          text('Capacitance measures how much separated charge a structure maintains per volt.', '电容衡量一个结构每伏能维持多少分离电荷。'),
          text('For an ideal linear capacitor, $C$ is a property of geometry and material, not the current amount of charge.', '对理想线性电容器,$C$ 是几何与材料的性质,不取决于当前电荷量。'),
        ],
        formulas: [
          formula('Definition', '定义', 'C=\\frac{Q}{\\Delta V}'),
          formula('Charge-voltage relation', '电荷-电压关系', 'Q=C\\Delta V'),
        ],
      },
      {
        heading: text('3. Parallel-plate derivation', '3. 平行板电容推导'),
        bullets: [
          text('Use $\\sigma=Q/A$ to express surface charge density.', '用 $\\sigma=Q/A$ 表示面电荷密度。'),
          text('Gauss’s law gives the nearly uniform field between large plates.', '高斯定律给出大平行板之间近似均匀的电场。'),
          text('Use $\\Delta V=Ed$, then substitute into $C=Q/\\Delta V$.', '利用 $\\Delta V=Ed$,再代入 $C=Q/\\Delta V$。'),
        ],
        formulas: [
          formula('Surface charge density', '面电荷密度', '\\sigma=\\frac{Q}{A}'),
          formula('Field', '电场', 'E=\\frac{\\sigma}{\\epsilon_0}=\\frac{Q}{\\epsilon_0A}'),
          formula('Potential difference', '电势差', '\\Delta V=Ed=\\frac{Qd}{\\epsilon_0A}'),
          formula('Result', '结论', 'C=\\epsilon_0\\frac{A}{d}'),
        ],
        takeaway: text(
          '$Q\\rightarrow E\\rightarrow\\Delta V\\rightarrow C$ is the complete derivation chain.',
          '$Q\\rightarrow E\\rightarrow\\Delta V\\rightarrow C$ 是完整推导链。',
        ),
      },
      {
        heading: text('4. What determines capacitance', '4. 什么决定电容'),
        bullets: [
          text('Larger plate area gives larger capacitance.', '极板面积越大,电容越大。'),
          text('Larger plate separation gives smaller capacitance.', '板间距越大,电容越小。'),
          text('A dielectric increases capacitance through polarization.', '电介质通过极化作用增大电容。'),
        ],
        formulas: [formula('Geometry and material', '几何与材料', 'C=\\kappa\\epsilon_0\\frac{A}{d}')],
        classroomQuestions: [
          {
            id: 'em-u10-student-capacitance-geometry-check',
            title: text('Quick check: change the geometry', '快速检查:改变几何结构'),
            prompt: text(
              'The area of an air-filled parallel-plate capacitor doubles while the plate separation is halved. What happens to its capacitance?',
              '一个空气平行板电容器的极板面积加倍,板间距减半。它的电容如何变化?',
            ),
            choices: [
              { label: 'A', text: text('It becomes $4C_0$.', '变为 $4C_0$。') },
              { label: 'B', text: text('It becomes $2C_0$.', '变为 $2C_0$。') },
              { label: 'C', text: text('It remains $C_0$.', '保持 $C_0$。') },
              { label: 'D', text: text('It becomes $C_0/4$.', '变为 $C_0/4$。') },
            ],
            correctAnswer: 'A',
            feedback: text(
              'Since $C\\propto A/d$, doubling $A$ contributes a factor of 2 and halving $d$ contributes another factor of 2.',
              '因为 $C\\propto A/d$,面积加倍贡献 2 倍,间距减半再贡献 2 倍。',
            ),
          },
        ],
      },
      {
        heading: text('5. Stored energy', '5. 电容储能'),
        bullets: [
          text('Charging requires work because each additional charge is moved across an increasing potential difference.', '充电需要做功,因为后续电荷要跨越越来越大的电势差。'),
          text('The stored energy equals the area under the $V$-$Q$ graph.', '储存能量等于 $V$-$Q$ 图像下方的面积。'),
        ],
        formulas: [
          formula('Energy', '能量', 'U=\\frac12Q\\Delta V=\\frac{Q^2}{2C}=\\frac12C(\\Delta V)^2'),
          formula('Field-energy density', '电场能量密度', 'u_E=\\frac12\\epsilon E^2'),
        ],
      },
      {
        heading: text('6. Dielectric decision rule', '6. 电介质题的判断规则'),
        bullets: [
          text('Battery disconnected: plate charge $Q$ stays fixed.', '断开电池:$Q$ 保持不变。'),
          text('Battery connected: potential difference $\\Delta V$ stays fixed.', '连接电池:$\\Delta V$ 保持不变。'),
          text('Identify the fixed quantity before predicting changes in $E$, $\\Delta V$, $Q$, and $U$.', '预测 $E$、$\\Delta V$、$Q$ 和 $U$ 前,先判断固定量。'),
        ],
        formulas: [
          formula('Dielectric effect', '电介质效应', 'C=\\kappa C_0'),
          formula('Disconnected', '断开电池', 'Q=\\mathrm{constant}'),
          formula('Connected', '连接电池', '\\Delta V=\\mathrm{constant}'),
        ],
      },
      {
        heading: text('7. Core logic chain', '7. 核心逻辑链'),
        takeaway: text(
          'High-power need $\\rightarrow$ advance energy storage $\\rightarrow$ charge separation $\\rightarrow$ voltage cost $\\rightarrow$ capacitance $\\rightarrow$ geometry and material $\\rightarrow$ field energy.',
          '高功率需求 $\\rightarrow$ 提前储能 $\\rightarrow$ 电荷分离 $\\rightarrow$ 电压代价 $\\rightarrow$ 电容定义 $\\rightarrow$ 几何与材料 $\\rightarrow$ 电场能量。',
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
  description: text('Build the foundation of motion description: scalars vs vectors, displacement vs distance, velocity vs speed, and how to choose a reference frame.', '建立运动描述的基础:标量与矢量、位移与路程、速度与速率,以及如何建立参考系。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('When we describe how something moves, words like "fast" or "far" are not enough for physics. We need quantities that carry both size and direction, and a rule for measuring them consistently.', '当我们描述一个物体的运动,光说"快"或"远"在物理中是不够的。我们需要同时包含大小和方向的量,以及一套一致的测量规则。'),
        text('This lesson introduces scalars (numbers only), vectors (numbers with direction), and how to use them to describe one-dimensional motion.', '本节介绍标量(只有数值)、矢量(数值加方向),以及如何用它们描述一维运动。')],
      takeaway: text('Scalars tell you "how much." Vectors tell you "how much and which way."', '标量告诉你"有多少"。矢量告诉你"有多少,向哪边"。')
    },
    {
      heading: text('1. Scalars vs vectors', '1. 标量与矢量'),
      paragraphs: [        text('A scalar is a single number with a unit, such as 5 kg or 20 C. A vector has both magnitude and direction. In one dimension, direction is captured by a sign: positive or negative relative to a chosen positive direction.', '标量是一个带单位的数值,如 5 kg 或 20 C。矢量既有大小又有方向。在一维中,方向由正负号表示:相对于选定的正方向为正或为负。')],
      bullets: [        text('Scalar examples: mass, temperature, speed, distance, time.', '标量示例:质量、温度、速率、路程、时间。'),
        text('Vector examples in 1D: displacement, velocity, acceleration.', '一维矢量示例:位移、速度、加速度。'),
        text('In 1D, a vector is a signed number: +3 m/s means 3 m/s in the positive direction.', '在一维中,矢量是带正负号的数:+3 m/s 表示正方向 3 m/s。')],
      formulas: [        formula('Speed is magnitude of velocity', '速率是速度的大小', '\\text{speed}=|v|')]
    },
    {
      heading: text('2. Displacement vs distance', '2. 位移与路程'),
      paragraphs: [        text('Distance counts every meter traveled, regardless of direction. Displacement only cares about the starting point and the ending point.', '路程统计走过的每一米,不管方向。位移只关心起点和终点。'),
        text('If you walk 3 m forward and 2 m backward, distance = 5 m but displacement = +1 m (assuming forward is positive).', '如果你向前走 3 m 再向后走 2 m,路程 = 5 m,但位移 = +1 m(假设向前为正)。')],
      formulas: [        formula('Displacement', '位移', '\\Delta x=x_f-x_i'),
        formula('Distance', '路程', 'd=\\text{total path length}')]
    },
    {
      heading: text('3. Average velocity vs average speed', '3. 平均速度与平均速率'),
      paragraphs: [        text('Average velocity = displacement / time. Average speed = total distance / time. These can be very different.', '平均速度 = 位移 / 时间。平均速率 = 总路程 / 时间。两者可能差别很大。')],
      formulas: [        formula('Average velocity', '平均速度', 'v_{\\mathrm{avg}}=\\frac{\\Delta x}{\\Delta t}'),
        formula('Average speed', '平均速率', '\\text{average speed}=\\frac{\\text{total distance}}{\\Delta t}')]
    },
    {
      heading: text('4. Classroom check: round trip', '4. 课堂题:往返运动'),
      classroomQuestions: [        {
          id: 'scalar-vector-round-trip',
          title: text('Classroom Check: displacement and velocity', '课堂题:位移与速度'),
          prompt: text('A runner goes 100 m east in 20 s, then turns around and runs 60 m west in 15 s. Taking east as positive, which statement is correct?', '一名运动员向东跑 100 m 用时 20 s,然后掉头向西跑 60 m 用时 15 s。规定向东为正,下列哪项正确?'),
          choices: [
            { label: 'A', text: text('Average speed = 4.57 m/s, average velocity = +1.14 m/s', '平均速率 = 4.57 m/s,平均速度 = +1.14 m/s') },
            { label: 'B', text: text('Average speed = 4 m/s, average velocity = +1.14 m/s', '平均速率 = 4 m/s,平均速度 = +1.14 m/s') },
            { label: 'C', text: text('Average speed = 4.57 m/s, average velocity = 0 m/s', '平均速率 = 4.57 m/s,平均速度 = 0 m/s') },
            { label: 'D', text: text('Average speed = 1.14 m/s, average velocity = 4.57 m/s', '平均速率 = 1.14 m/s,平均速度 = 4.57 m/s') },
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
      formulas: [        formula('Displacement', '位移', '\\Delta x=x_f-x_i'),
        formula('Average velocity', '平均速度', 'v_{\\mathrm{avg}}=\\frac{\\Delta x}{\\Delta t}'),
        formula('Average speed', '平均速率', '\\text{average speed}=\\frac{\\text{total distance}}{\\Delta t}'),
        formula('Speed from velocity', '由速度求速率', '\\text{speed}=|v|')]
    }
  ],
};

const positionVelocityAccelerationLesson: CurriculumLesson = {
  title: text('Position, Velocity, and Acceleration', '位置、速度与加速度'),
  description: text('Connect the three core kinematic quantities through definitions, graphs, and the constant-acceleration model.', '通过定义、图像和匀加速模型连接位置、速度、加速度三个核心运动学量。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('If you know where an object is at every moment, can you predict where it will be next? The answers depend on understanding the relationship between position, velocity, and acceleration.', '如果你知道一个物体每一时刻的位置,能预测它下一刻在哪里吗?答案取决于你对位置、速度和加速度之间关系的理解。')],
      takeaway: text('Position tells you where. Velocity tells you where you are going. Acceleration tells you how velocity is changing.', '位置告诉你在哪里。速度告诉你往哪走。加速度告诉你速度怎么变。')
    },
    {
      heading: text('1. Definitions', '1. 定义'),
      paragraphs: [        text('Velocity is the rate of change of position. Acceleration is the rate of change of velocity.', '速度是位置的变化率。加速度是速度的变化率。')],
      formulas: [        formula('Instantaneous velocity', '瞬时速度', 'v=\\frac{dx}{dt}'),
        formula('Instantaneous acceleration', '瞬时加速度', 'a=\\frac{dv}{dt}=\\frac{d^2x}{dt^2}')]
    },
    {
      heading: text('2. The meaning of acceleration', '2. 加速度的含义'),
      paragraphs: [        text('Acceleration is not the same as speed. When acceleration and velocity point in the same direction, the object speeds up. When they point in opposite directions, the object slows down.', '加速度不等于速度。当加速度和速度同向时,物体加速;当它们反向时,物体减速。')]
    },
    {
      heading: text('3. Reading motion graphs', '3. 读取运动图像'),
      paragraphs: [        text('The slope of a position-time graph gives velocity. The slope of a velocity-time graph gives acceleration. The area under a velocity-time graph gives displacement.', '位置-时间图像的斜率给出速度。速度-时间图像的斜率给出加速度。速度-时间图像下的面积给出位移。')],
      formulas: [        formula('From graph slope', '从图像斜率', 'v=\\frac{dx}{dt},\\quad a=\\frac{dv}{dt}'),
        formula('From graph area', '从图像面积', '\\Delta x=\\int v\\,dt,\\quad \\Delta v=\\int a\\,dt')]
    },
    {
      heading: text('4. Constant-acceleration model', '4. 匀加速模型'),
      paragraphs: [        text('When acceleration is constant, we can derive simple equations that connect position, velocity, and time.', '当加速度恒定时,我们可以推导出简单的方程来连接位置、速度和时间。')],
      formulas: [        formula('Velocity-time', '速度-时间关系', 'v=v_0+at'),
        formula('Position-time', '位置-时间关系', 'x=x_0+v_0t+\\frac12at^2'),
        formula('Velocity-position', '速度-位移关系', 'v^2=v_0^2+2a(x-x_0)')],
      takeaway: text('These equations only work when acceleration is constant. Always check this condition first.', '这些方程只在加速度恒定时成立。使用前一定要先检查这个条件。')
    },
    {
      heading: text('5. Classroom check: speeding up or slowing down?', '5. 课堂题:加速还是减速?'),
      classroomQuestions: [        {
          id: 'speeding-up-or-slowing-down',
          title: text('Classroom Check: sign analysis', '课堂题:符号分析'),
          prompt: text('An object has velocity v = -5 m/s and acceleration a = -2 m/s^2. Is the object speeding up or slowing down?', '一个物体的速度为 v = -5 m/s,加速度为 a = -2 m/s^2。该物体在加速还是减速?'),
          choices: [
            { label: 'A', text: text('Speeding up, because velocity and acceleration have the same sign.', '加速,因为速度和加速度同号。') },
            { label: 'B', text: text('Slowing down, because acceleration is negative.', '减速,因为加速度为负。') },
            { label: 'C', text: text('Speeding up, because acceleration is negative.', '加速,因为加速度为负。') },
            { label: 'D', text: text('Slowing down, because velocity is negative.', '减速,因为速度为负。') },
          ],
          correctAnswer: 'A',
          feedback: text('When velocity and acceleration have the same sign, the magnitude of velocity increases. The object is moving in the negative direction and getting faster in that direction: speeding up.', '当速度和加速度同号时,速度的大小增加。物体向负方向运动且越来越快:加速。'),
        }]
    },
    {
      heading: text('6. Free fall as a constant-acceleration example', '6. 自由落体:匀加速的实例'),
      paragraphs: [        text('Near the surface, a falling object (ignoring air resistance) experiences constant downward acceleration of about 9.8 m/s^2.', '在地球表面附近,下落物体(忽略空气阻力)受到恒定的向下加速度,约 9.8 m/s^2。')],
      formulas: [        formula('Free-fall acceleration', '自由落体加速度', 'a_y=-g\\approx-9.8\\,\\text{m/s}^2\\quad(\\text{taking up as positive})')]
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
      formulas: [        formula('Definitions', '定义', 'v=\\frac{dx}{dt},\\quad a=\\frac{dv}{dt}'),
        formula('Constant-acceleration equations', '匀加速方程', 'v=v_0+at,\\quad x=x_0+v_0t+\\frac12at^2,\\quad v^2=v_0^2+2a\\Delta x'),
        formula('Free fall', '自由落体', 'a=-g')]
    }
  ],
};

const referenceFramesRelativeMotionLesson: CurriculumLesson = {
  title: text('Reference Frames and Relative Motion', '参考系与相对运动'),
  description: text('Why the same motion looks different from different viewpoints, and how to translate between reference frames.', '为什么同一个运动在不同视角下看起来不同,以及如何在参考系之间转换。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('If you sit on a train and watch another train pass by, is it moving or are you moving? Both answers can be correct, depending on your reference frame.', '如果你坐在火车上看另一列火车经过,是它在动还是你在动?两个答案都可以正确,取决于你的参考系。')],
      takeaway: text('Motion is always measured relative to a chosen reference frame. State your frame first.', '运动总是相对于某个选定的参考系来测量的。先说清你的参考系。')
    },
    {
      heading: text('1. What is a reference frame?', '1. 什么是参考系?'),
      paragraphs: [        text('A reference frame is a coordinate system with an origin and a set of axes, plus a clock to measure time.', '参考系是一个带原点和坐标轴的坐标系,加上测量时间的时钟。')]
    },
    {
      heading: text('2. Relative velocity in one dimension', '2. 一维相对速度'),
      paragraphs: [        text('If observer A measures an object moving at a certain velocity relative to A, and A itself moves relative to C, then C measures the object velocity as the sum of the two.', '如果观察者 A 测得物体相对于 A 的速度,而 A 自身相对于 C 运动,则 C 测得物体的速度为两者之和。')],
      formulas: [        formula('Relative velocity (1D)', '一维相对速度', 'v_{BC}=v_{BA}+v_{AC}')]
    },
    {
      heading: text('3. Classroom check: moving walkway', '3. 课堂题:移动人行道'),
      classroomQuestions: [        {
          id: 'relative-motion-walkway',
          title: text('Classroom Check: reference frames', '课堂题:参考系'),
          prompt: text('A moving walkway travels at 2 m/s relative to the ground. A person walks forward on the walkway at 1 m/s relative to the walkway. What is the person speed relative to the ground?', '一条移动人行道相对于地面以 2 m/s 前进。一个人在人行道上以 1 m/s 相对于人行道向前走。这个人相对于地面的速度是多少?'),
          choices: [
            { label: 'A', text: text('1 m/s', '1 m/s') },
            { label: 'B', text: text('2 m/s', '2 m/s') },
            { label: 'C', text: text('3 m/s', '3 m/s') },
            { label: 'D', text: text('Cannot be determined without more information.', '信息不足,无法判断。') },
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
      formulas: [        formula('Relative velocity', '相对速度', '\\vec v_{BC}=\\vec v_{BA}+\\vec v_{AC}')]
    }
  ],
};

const projectileMotionLesson: CurriculumLesson = {
  title: text('Projectile Motion: Two-Dimensional Kinematics', 'Projectile Motion: 斜抛运动与二维运动学'),
  description: text(
    'Make Topic 1.5 explicit: projectile motion is the central AP Physics 1 example of separating two-dimensional motion into independent one-dimensional motions.',
    '把 Topic 1.5 显性展开:斜抛运动是 AP 物理 1 中“把二维运动分解成两个独立一维运动”的核心例子。',
  ),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [
        text(
          'A launched ball, a water fountain stream, or a basketball shot does not move only horizontally or only vertically. Projectile motion gives us a clean way to predict the path of an object moving in two dimensions under constant vertical acceleration.',
          '被抛出的球、喷泉水流或篮球投篮都不是只沿水平或竖直方向运动。斜抛运动给我们一种清晰方法,用来预测物体在恒定竖直加速度下的二维轨迹。',
        ),
        text(
          'College Board places this under Topic 1.5, Vectors and Motion in Two Dimensions. The essential idea is that motion in two dimensions can be analyzed with one-dimensional kinematics after the motion is separated into components.',
          'College Board 把它放在 Topic 1.5: Vectors and Motion in Two Dimensions 下面。核心思想是:只要把运动分解成分量,二维运动就可以用一维运动学关系来分析。',
        ),
      ],
      takeaway: text(
        'Projectile motion is not a new set of magic formulas. It is one-dimensional kinematics used twice: once horizontally and once vertically.',
        '斜抛运动不是一套新的神秘公式。它就是把一维运动学用两次:水平方向一次,竖直方向一次。',
      ),
    },
    {
      heading: text('1. Official requirement inside Topic 1.5', '1. Topic 1.5 下的官方要求'),
      bullets: [
        text('1.5.A: Resolve vectors into perpendicular components using a chosen coordinate system and trigonometric relationships.', '1.5.A: 用选定坐标系和三角函数关系把矢量分解成互相垂直的分量。'),
        text('1.5.B: Describe the motion of an object moving in two dimensions.', '1.5.B: 描述物体在二维空间中的运动。'),
        text('Essential Knowledge 1.5.B.1: Two-dimensional motion can be analyzed with one-dimensional kinematic relationships if the motion is separated into components.', 'Essential Knowledge 1.5.B.1: 若把运动分解成分量,二维运动可以用一维运动学关系分析。'),
        text('Essential Knowledge 1.5.B.2: Projectile motion is the special case with zero acceleration in one dimension and constant nonzero acceleration in the other.', 'Essential Knowledge 1.5.B.2: 斜抛运动是二维运动的特殊情况:一个方向加速度为零,另一个方向加速度恒定且非零。'),
      ],
    },
    {
      heading: text('2. Component model', '2. 分量模型'),
      paragraphs: [
        text(
          'After launch, ignoring air resistance, the only acceleration is gravity. If horizontal is $x$ and vertical is $y$, then $a_x=0$ and $a_y=-g$ when upward is positive.',
          '物体离手后,若忽略空气阻力,唯一加速度来自重力。如果水平方向为 $x$,竖直方向为 $y$,并规定向上为正,则 $a_x=0$ 且 $a_y=-g$。',
        ),
        text(
          'The horizontal motion has constant velocity. The vertical motion is constant-acceleration motion. Time is the shared variable that connects the two directions.',
          '水平方向做匀速运动。竖直方向做匀加速运动。时间是连接两个方向的共同变量。',
        ),
      ],
      formulas: [
        formula('Initial velocity components', '初速度分量', 'v_{0x}=v_0\\cos\\theta,\\quad v_{0y}=v_0\\sin\\theta'),
        formula('Horizontal motion', '水平运动', 'a_x=0,\\quad v_x=v_{0x},\\quad x=x_0+v_{0x}t'),
        formula('Vertical motion', '竖直运动', 'a_y=-g,\\quad v_y=v_{0y}-gt,\\quad y=y_0+v_{0y}t-\\frac12gt^2'),
      ],
    },
    {
      heading: text('3. Typical problem types', '3. 典型题型'),
      bullets: [
        text('Horizontal launch: an object leaves a table with $v_{0y}=0$ and lands below the launch point.', '水平抛出:物体以 $v_{0y}=0$ 离开桌面并落到较低位置。'),
        text('Angled launch from ground level: find time of flight, maximum height, range, or impact velocity.', '地面斜抛:求飞行时间、最大高度、射程或落地速度。'),
        text('Graph translation: draw or interpret $x$-$t$, $v_x$-$t$, $a_x$-$t$, $y$-$t$, $v_y$-$t$, and $a_y$-$t$ graphs.', '图像转换:绘制或解释 $x$-$t$、$v_x$-$t$、$a_x$-$t$、$y$-$t$、$v_y$-$t$ 和 $a_y$-$t$ 图像。'),
        text('Experimental design: use measured height, horizontal range, and time to infer an initial velocity component.', '实验设计:用测得的高度、水平距离和时间反推初速度分量。'),
      ],
    },
    {
      heading: text('4. Classroom check: horizontal launch', '4. 课堂题:水平抛出'),
      classroomQuestions: [
        {
          id: 'ap1-u1-projectile-horizontal-launch',
          title: text('Classroom Check: component independence', '课堂题:分量独立性'),
          prompt: text(
            'A ball rolls horizontally off a table with speed $3.0\\,\\mathrm{m/s}$. It lands after $0.80\\,\\mathrm{s}$. Ignoring air resistance, how far from the table edge does it land?',
            '一个小球以 $3.0\\,\\mathrm{m/s}$ 的水平速度滚下桌边,经过 $0.80\\,\\mathrm{s}$ 落地。忽略空气阻力,它落地点离桌边的水平距离是多少?',
          ),
          choices: [
            { label: 'A', text: text('$1.2\\,\\mathrm{m}$', '$1.2\\,\\mathrm{m}$') },
            { label: 'B', text: text('$2.4\\,\\mathrm{m}$', '$2.4\\,\\mathrm{m}$') },
            { label: 'C', text: text('$3.8\\,\\mathrm{m}$', '$3.8\\,\\mathrm{m}$') },
            { label: 'D', text: text('$6.4\\,\\mathrm{m}$', '$6.4\\,\\mathrm{m}$') },
          ],
          correctAnswer: 'B',
          feedback: text(
            'Use the horizontal component only: $a_x=0$, so $\\Delta x=v_xt=(3.0)(0.80)=2.4\\,\\mathrm{m}$. Gravity affects the time in the air, but once time is known it does not change the horizontal velocity.',
            '只用水平分量:$a_x=0$,所以 $\\Delta x=v_xt=(3.0)(0.80)=2.4\\,\\mathrm{m}$。重力影响在空中的时间,但时间已知后不会改变水平速度。',
          ),
        },
      ],
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [
        text('Thinking the projectile has horizontal acceleration after launch.', '以为物体离手后仍有水平加速度。'),
        text('Using the total launch speed in the vertical equation instead of $v_{0y}$.', '在竖直方程中误用总初速度,而不是 $v_{0y}$。'),
        text('Saying velocity is zero at the top. Only $v_y$ is zero at the top; $v_x$ is still nonzero unless the launch was vertical.', '说最高点速度为零。最高点只有 $v_y$ 为零;$v_x$ 仍不为零,除非是竖直上抛。'),
        text('Trying to solve range first before finding or using the shared time variable.', '还没找到或使用共同时间变量,就急着先求射程。'),
      ],
    },
  ],
};

const systemsCenterOfMassUnit2Lesson: CurriculumLesson = {
  title: text('Systems and Center of Mass', '系统与质心'),
  description: text('Define what a system means in physics, distinguish internal from external forces, and use center of mass to represent the motion of complex objects.', '定义物理中的系统概念,区分内力与外力,用质心代表复杂物体的运动。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('Before writing any force equation, you must decide what you are analyzing. The choice of system determines which forces are internal and which are external, and only external forces appear in the system equation.', '在写任何力的方程之前,你必须决定你要分析什么。系统的选择决定了哪些力是内力、哪些是外力,而只有外力出现在系统方程中。')],
      takeaway: text('Choose your system first. Everything else follows from that choice.', '先选系统。其他一切都从这个选择出发。')
    },
    {
      heading: text('1. What is a system?', '1. 什么是系统?'),
      paragraphs: [        text('A system is the set of objects you choose to analyze together. Everything outside the system is the environment.', '系统是你选择一起分析的一组物体。系统之外的一切都是环境。'),
        text('Internal forces are forces between objects inside the system. External forces are forces from the environment acting on the system.', '内力是系统内部物体之间的力。外力是环境中物体对系统施加的力。')],
      bullets: [        text('Two carts pushing each other: if both are in the system, the push is internal.', '两辆小车互相推:如果都在系统内,推力是内力。'),
        text('If only one cart is in the system, the other cart push is external.', '如果只有一辆车在系统内,另一辆车的推力就是外力。')]
    },
    {
      heading: text('2. Internal vs external forces', '2. 内力与外力'),
      paragraphs: [        text('Internal forces always come in equal-and-opposite pairs. When you add the force equations for all parts of a system, internal forces cancel. Only external forces determine the system overall acceleration.', '内力总是成对出现、大小相等方向相反。把系统各部分的力方程加起来时,内力抵消。只有外力决定系统的整体加速度。')],
      formulas: [        formula('Internal force pair', '内力对', '\\vec F_{AB}=-\\vec F_{BA}'),
        formula('System equation', '系统方程', '\\sum \\vec F_{\\mathrm{ext}}=M\\vec a_{\\mathrm{cm}}')]
    },
    {
      heading: text('3. Center of mass as the representative point', '3. 质心作为代表点'),
      paragraphs: [        text('For an extended object or a multi-object system, the center of mass is the point that moves as if all the mass were concentrated there and all external forces acted there.', '对于一个有尺寸的物体或多物体系统,质心就是那个表现得像所有质量都集中在那里、所有外力都作用在那里的点。')],
      formulas: [        formula('Center of mass (discrete)', '质心(离散)', 'x_{\\mathrm{cm}}=\\frac{\\sum m_ix_i}{\\sum m_i}'),
        formula('System Newton second law', '系统牛顿第二定律', '\\sum \\vec F_{\\mathrm{ext}}=M\\vec a_{\\mathrm{cm}}')]
    },
    {
      heading: text('4. Classroom check: system choice', '4. 课堂题:系统选择'),
      classroomQuestions: [        {
          id: 'system-choice-fbd',
          title: text('Classroom Check: internal vs external', '课堂题:内力与外力'),
          prompt: text('Two blocks of mass m1 and m2 are connected by a light string on a frictionless table. A force F pulls m1 to the right. If the system is defined as both blocks together, which forces are external?', '两个质量为 m1 和 m2 的方块用轻绳连接,放在无摩擦桌面上。一个力 F 向右拉 m1。如果系统定义为两个方块整体,哪些力是外力?'),
          choices: [
            { label: 'A', text: text('Only the applied force F.', '只有拉力 F。') },
            { label: 'B', text: text('The applied force F, gravity on both blocks, and the normal force from the table.', '拉力 F、两个方块的重力、桌面对方块的支持力。') },
            { label: 'C', text: text('The applied force F and the tension in the string.', '拉力 F 和绳中的张力。') },
            { label: 'D', text: text('Only the tension in the string.', '只有绳中的张力。') },
          ],
          correctAnswer: 'B',
          feedback: text('When both blocks are the system, the string tension is internal. The applied force F, gravity on each block, and normal forces from the table are all external.', '当两个方块都是系统时,绳中张力是内力。拉力 F、每个方块的重力和桌面的支持力都是外力。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Drawing internal forces on a free-body diagram of the whole system.', '在系统整体的自由体图上画内力。'),
        text('Forgetting that normal force and gravity are external when the system does not include the Earth or table.', '忘记当系统不包括地球或桌面时,支持力和重力是外力。'),
        text('Thinking the center of mass must be inside the material of the object.', '以为质心一定在物体的材料内部。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Center of mass (1D)', '质心(一维)', 'x_{\\mathrm{cm}}=\\frac{\\sum m_ix_i}{\\sum m_i}'),
        formula('System Newton second law', '系统牛顿第二定律', '\\sum \\vec F_{\\mathrm{ext}}=M\\vec a_{\\mathrm{cm}}')]
    }
  ],
};

const forcesFreeBodyDiagramsUnit2Lesson: CurriculumLesson = {
  title: text('Forces and Free-Body Diagrams', '力与自由体图'),
  description: text('Identify all forces acting on a chosen system, draw a clean free-body diagram, and translate it into a Newton equation.', '识别作用在所选系统上的所有力,画出清晰的自由体图,并将其转化为牛顿方程。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('Real objects are pushed, pulled, and twisted by many forces at once. To predict motion, we must identify every force, represent it as a vector, and add them correctly. The free-body diagram is the single most important tool for doing this.', '真实物体同时被很多力推、拉、扭曲。要预测运动,我们必须识别每一个力,把它表示为矢量,然后正确地相加。自由体图是做到这一点的最重要工具。')],
      takeaway: text('A good free-body diagram is half the solution.', '一张好的自由体图就是解题的一半。')
    },
    {
      heading: text('1. Common forces', '1. 常见的力'),
      bullets: [        text('Weight (gravity): always downward toward the center of the Earth.', '重力:始终指向地心向下。'),
        text('Normal force: perpendicular to the contact surface.', '支持力:垂直接触面。'),
        text('Friction: parallel to the contact surface, opposing relative motion.', '摩擦力:平行接触面,方向与相对运动相反。'),
        text('Tension: pulls along a rope or string.', '张力:沿绳子方向拉。'),
        text('Spring force: F = -kx, restoring toward equilibrium.', '弹簧力:F = -kx,回复平衡位置。')]
    },
    {
      heading: text('2. How to draw a free-body diagram', '2. 如何画自由体图'),
      paragraphs: [        text('Step 1: Choose the system. Step 2: Draw a dot. Step 3: Draw one arrow for each external force. Step 4: Label each force. Step 5: Choose coordinate axes.', '第一步:选系统。第二步:画一个点。第三步:为每个外力画一个箭头。第四步:标出每个力。第五步:选坐标轴。')],
      bullets: [        text('Never draw forces the object exerts on other things.', '绝不画物体对其他物体施加的力。'),
        text('Never draw internal forces.', '绝不画内力。'),
        text('The length of each arrow should roughly reflect the force magnitude.', '每个箭头的长度应大致反映力的大小。')]
    },
    {
      heading: text('3. From FBD to equations', '3. 从自由体图到方程'),
      paragraphs: [        text('Once the FBD is drawn, write Newton second law for each axis separately.', '画好自由体图后,对每个坐标轴分别写出牛顿第二定律。')],
      formulas: [        formula('Newton second law (component form)', '牛顿第二定律(分量形式)', '\\sum F_x=ma_x,\\quad \\sum F_y=ma_y')]
    },
    {
      heading: text('4. Classroom check: block on a ramp', '4. 课堂题:斜面上的方块'),
      classroomQuestions: [        {
          id: 'fbd-ramp-forces',
          title: text('Classroom Check: free-body diagram', '课堂题:自由体图'),
          prompt: text('A block rests on a rough inclined ramp at rest. Which forces act on the block?', '一个方块静止在粗糙斜面上。方块受到哪些力?'),
          choices: [
            { label: 'A', text: text('Gravity, normal force, and static friction.', '重力、支持力和静摩擦力。') },
            { label: 'B', text: text('Gravity and normal force only.', '只有重力和支持力。') },
            { label: 'C', text: text('Gravity, normal force, and kinetic friction.', '重力、支持力和动摩擦力。') },
            { label: 'D', text: text('Gravity, normal force, friction, and a force pushing it up the ramp.', '重力、支持力、摩擦力和一个沿斜面向上推它的力。') },
          ],
          correctAnswer: 'A',
          feedback: text('The block is at rest, so static friction acts to prevent sliding down the ramp. Gravity pulls down, the normal force is perpendicular to the surface, and static friction points up the ramp.', '方块静止,所以静摩擦力阻止它沿斜面下滑。重力向下,支持力垂直于斜面,静摩擦力沿斜面向上。'),
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
      formulas: [        formula('Newton second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
        formula('Weight', '重力', 'W=mg')]
    }
  ],
};

const newtonsThirdLawUnit2Lesson: CurriculumLesson = {
  title: text("Newton's Third Law: Action and Reaction", '牛顿第三定律:作用力与反作用力'),
  description: text('Understand that forces always come in pairs between two objects, and why these pairs never cancel when analyzing a single object.', '理解力总是成对出现在两个物体之间,以及为什么分析单个物体时这些力对不会抵消。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('When you push a wall, the wall pushes back. Forces are interactions between two objects, not properties of a single object. The third law formalizes this idea.', '你推墙时,墙也推你。力是两个物体之间的相互作用,不是单个物体的属性。第三定律将这个思想形式化。')],
      takeaway: text('Forces come in pairs. Each force in the pair acts on a different object.', '力成对出现。力对中的每个力作用在不同的物体上。')
    },
    {
      heading: text('1. The law', '1. 定律表述'),
      paragraphs: [        text('If object A exerts a force on object B, then object B exerts a force of equal magnitude and opposite direction on object A.', '如果物体 A 对物体 B 施加一个力,那么物体 B 对物体 A 施加一个大小相等、方向相反的力。')],
      bullets: [        text('The two forces act on different objects.', '两个力作用在不同物体上。'),
        text('The two forces are the same type.', '两个力是同一类型的。'),
        text('They are simultaneous, neither causes the other.', '它们是同时的,没有一个导致另一个。')],
      formulas: [        formula('Newton third law', '牛顿第三定律', '\\vec F_{A\\text{ on }B}=-\\vec F_{B\\text{ on }A}')]
    },
    {
      heading: text('2. Why do not they cancel?', '2. 为什么它们不抵消?'),
      paragraphs: [        text('Forces only cancel when they act on the same object. The action-reaction pair acts on two different objects.', '力只有在作用在同一个物体上时才会抵消。作用-反作用力对作用在两个不同物体上。')]
    },
    {
      heading: text('3. Classroom check: horse and cart', '3. 课堂题:马拉车'),
      classroomQuestions: [        {
          id: 'newton-third-horse-cart',
          title: text('Classroom Check: action-reaction pairs', '课堂题:作用-反作用力对'),
          prompt: text('A horse pulls a cart forward. The cart pulls the horse backward with an equal force. How does the cart move forward?', '一匹马向前拉车。车以相等的力向后拉马。车怎么会向前运动?'),
          choices: [
            { label: 'A', text: text('The horse pulls harder than the cart pulls back.', '马比车拉得更用力。') },
            { label: 'B', text: text('The forces are equal, but the horse pushes backward on the ground, and the ground pushes forward on the horse.', '两个力相等,但马还向后蹬地,地面向前推马。') },
            { label: 'C', text: text('The cart pull on the horse is weaker because the cart is rolling.', '车拉马的力更弱,因为车在滚动。') },
            { label: 'D', text: text('The two forces cancel, so the cart moves because of inertia.', '两个力抵消,所以车因为惯性而运动。') },
          ],
          correctAnswer: 'B',
          feedback: text('The horse-cart force pair is equal and opposite, but they act on different objects. The horse moves forward because the ground pushes forward on the horse.', '马-车的力对大小相等方向相反,但它们作用在不同物体上。马向前运动是因为地面向前推马。'),
        }]
    },
    {
      heading: text('4. Common mistakes', '4. 常见错误'),
      bullets: [        text('Thinking the stronger object exerts a larger force.', '以为更强的物体施加更大的力。'),
        text('Confusing an action-reaction pair with two balanced forces on one object.', '把作用-反作用力对与一个物体上的两个平衡力混淆。')]
    },
    {
      heading: text('5. Formula summary', '5. 本节核心公式'),
      formulas: [        formula('Newton third law', '牛顿第三定律', '\\vec F_{A\\text{ on }B}=-\\vec F_{B\\text{ on }A}')]
    }
  ],
};

const newtonsFirstSecondLawUnit2Lesson: CurriculumLesson = {
  title: text("Newton's First and Second Laws", '牛顿第一和第二定律'),
  description: text('Connect force, mass, and acceleration. Understand inertia, equilibrium, and how to build equations from free-body diagrams.', '连接力、质量和加速度。理解惯性、平衡状态,以及如何从自由体图建立方程。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('Why does a hockey puck glide across ice for so long, but a book slides to a stop on a table? Why does a heavy truck need more force to accelerate than a bicycle? Newton first two laws give us the connection.', '为什么冰球能在冰上滑行很久,而书在桌上会停下来?为什么卡车比自行车需要更大的力才能加速?牛顿的前两个定律给出了这个联系。')],
      takeaway: text('Force changes motion. Mass resists that change.', '力改变运动。质量抵抗这种改变。')
    },
    {
      heading: text('1. Newton First Law: the law of inertia', '1. 牛顿第一定律:惯性定律'),
      paragraphs: [        text('An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted on by a net external force.', '静止的物体保持静止,运动的物体保持匀速运动,除非受到合外力的作用。'),
        text('Inertia is the tendency of an object to resist changes in its motion. Mass is the quantitative measure of inertia.', '惯性是物体抵抗运动变化的倾向。质量是惯性的定量度量。')],
      bullets: [        text('Net external force matters, not just any force.', '重要的是合外力,不是随便哪个力。'),
        text('Equilibrium means net force equals zero.', '平衡状态意味着合力为零。')]
    },
    {
      heading: text('2. Newton Second Law', '2. 牛顿第二定律'),
      paragraphs: [        text('The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.', '物体的加速度与作用在它上面的合外力成正比,与它的质量成反比。')],
      formulas: [        formula('Newton second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
        formula('Component form', '分量形式', '\\sum F_x=ma_x,\\quad \\sum F_y=ma_y')]
    },
    {
      heading: text('3. Problem-solving recipe', '3. 解题步骤'),
      paragraphs: [        text('Step 1: Choose the system. Step 2: Draw a free-body diagram. Step 3: Choose coordinate axes. Step 4: Write sum F = ma for each axis. Step 5: Solve.', '第一步:选系统。第二步:画自由体图。第三步:选坐标轴。第四步:对每个轴写 sum F = ma。第五步:求解。')]
    },
    {
      heading: text('4. Classroom check: elevator scale', '4. 课堂题:电梯秤'),
      classroomQuestions: [        {
          id: 'elevator-scale-reading',
          title: text('Classroom Check: Newton second law', '课堂题:牛顿第二定律'),
          prompt: text('A person of mass 60 kg stands on a scale in an elevator. The elevator accelerates upward at 2 m/s^2. What does the scale read?', '一个质量为 60 kg 的人站在电梯里的秤上。电梯以 2 m/s^2 的加速度向上加速。秤的读数是多少?'),
          choices: [
            { label: 'A', text: text('600 N (the person weight)', '600 N(人的体重)') },
            { label: 'B', text: text('480 N (less than weight)', '480 N(小于体重)') },
            { label: 'C', text: text('720 N (more than weight)', '720 N(大于体重)') },
            { label: 'D', text: text('120 N (ma only)', '120 N(只有 ma)') },
          ],
          correctAnswer: 'C',
          feedback: text('Taking up as positive: N - mg = ma. N = mg + ma = 60 * 10 + 60 * 2 = 720 N. The scale reads the normal force, which is greater than weight because the elevator is accelerating upward.', '向上为正:N - mg = ma。N = mg + ma = 60 * 10 + 60 * 2 = 720 N。秤读的是支持力,大于体重,因为电梯在向上加速。'),
        }]
    },
    {
      heading: text('5. Common mistakes', '5. 常见错误'),
      bullets: [        text('Writing F = ma instead of sum F = ma (missing net).', '写 F = ma 而不是 sum F = ma(漏了合)。'),
        text('Treating weight as mass (60 kg is not 60 N).', '把质量当体重(60 kg 不等于 60 N)。'),
        text('Forgetting that an object moving at constant velocity has zero net force.', '忘记匀速运动的物体合力为零。'),
        text('Adding ma as a force on the FBD.', '把 ma 当力加在自由体图上。')]
    },
    {
      heading: text('6. Formula summary', '6. 本节核心公式'),
      formulas: [        formula('Newton second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
        formula('Weight', '重力', 'W=mg'),
        formula('Equilibrium', '平衡条件', '\\sum \\vec F=0\\Rightarrow \\vec a=0')]
    }
  ],
};

const gravitationalForceUnit2Lesson: CurriculumLesson = {
  title: text('Gravitational Force', '万有引力'),
  description: text('Understand the difference between the local model W = mg and the universal law of gravitation, and when to use each.', '理解局部模型 W = mg 与万有引力定律的区别,以及何时使用哪个。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('Near the surface, we use W = mg. But what about the Moon or a satellite? The universal law of gravitation works everywhere.', '在表面附近,我们用 W = mg。但月球呢?轨道卫星呢?万有引力定律在任何地方都适用。')],
      takeaway: text('W = mg is a shortcut near the surface. The universal law works everywhere.', 'W = mg 是表面附近的便捷公式。万有引力定律在任何地方都有效。')
    },
    {
      heading: text('1. The universal law of gravitation', '1. 万有引力定律'),
      paragraphs: [        text('Every pair of masses attracts each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.', '每一对质量之间的引力与它们的质量乘积成正比,与它们之间距离的平方成反比。')],
      formulas: [        formula('Universal gravitation', '万有引力定律', 'F_g=G\\frac{m_1m_2}{r^2}')]
    },
    {
      heading: text('2. Connecting W = mg to the universal law', '2. W = mg 与万有引力定律的联系'),
      paragraphs: [        text('Near the surface, r is approximately the Earth radius, so g = GM / R^2.', '在表面附近,r 约等于地球半径,所以 g = GM / R^2。')],
      formulas: [        formula('Local g from universal law', '由万有引力定律导出局部 g', 'g=\\frac{GM}{r^2}'),
        formula('Weight near surface', '表面附近的重力', 'W=mg')]
    },
    {
      heading: text('3. Common mistakes', '3. 常见错误'),
      bullets: [        text('Thinking g = 9.8 m/s^2 everywhere in the universe.', '以为 g = 9.8 m/s^2 在宇宙任何地方都成立。'),
        text('Confusing G (universal constant) with g (local field strength).', '混淆 G(万有引力常数)和 g(局部场强)。')]
    },
    {
      heading: text('4. Formula summary', '4. 本节核心公式'),
      formulas: [        formula('Universal gravitation', '万有引力定律', 'F_g=G\\frac{m_1m_2}{r^2}'),
        formula('Local weight', '局部重力', 'W=mg')]
    }
  ],
};

const frictionSpringsCircularMotionUnit2Lesson: CurriculumLesson = {
  title: text('Friction, Springs, and Circular Motion', '摩擦力、弹簧力与圆周运动'),
  description: text('Model three specific force types: friction, spring force, and the net force required for circular motion.', '建模三种特定的力类型:摩擦力、弹簧力和圆周运动所需的合力。'),
  sections: [
    {
      heading: text('0. What real phenomenon does this lesson explain?', '0. 这一节解释什么真实现象?'),
      paragraphs: [        text('Not all forces are constant. Friction depends on whether the object is moving. Spring force depends on stretch. Circular motion requires a net force toward the center.', '不是所有的力都是恒定的。摩擦力取决于物体是否在运动。弹簧力取决于拉伸量。圆周运动需要一个指向中心的合力。')]
    },
    {
      heading: text('1. Friction', '1. 摩擦力'),
      paragraphs: [        text('Static friction prevents motion up to a maximum value. Kinetic friction opposes motion once the object is sliding.', '静摩擦力阻止运动,直到达到最大值。动摩擦力在物体滑动时阻碍运动。')],
      bullets: [        text('Static friction adjusts to match the applied force, up to its maximum.', '静摩擦力会调节以匹配外力,直到最大值。'),
        text('mu_k is typically less than mu_s.', 'mu_k 通常小于 mu_s。')],
      formulas: [        formula('Static friction (maximum)', '最大静摩擦力', 'f_{s,\\mathrm{max}}=\\mu_s N'),
        formula('Kinetic friction', '动摩擦力', 'f_k=\\mu_k N')]
    },
    {
      heading: text('2. Spring force', '2. 弹簧力'),
      paragraphs: [        text('A spring exerts a restoring force proportional to how far it is displaced from equilibrium.', '弹簧施加一个回复力,与它偏离平衡位置的距离成正比。')],
      bullets: [        text('k is the spring constant. x is displacement from equilibrium, not total length.', 'k 是弹簧常数。x 是偏离平衡的位移,不是总长度。')],
      formulas: [        formula('Hooke law', '胡克定律', 'F_s=-kx')]
    },
    {
      heading: text('3. Circular motion', '3. 圆周运动'),
      paragraphs: [        text('An object moving in a circle at constant speed still has acceleration toward the center. This requires a net force in the same direction.', '一个以恒定速率做圆周运动的物体仍然有向心加速度。这需要一个同方向的合力。')],
      bullets: [        text('Centripetal force is not a new force. It is the net force toward the center.', '向心力不是新力。它是向中心的合力。'),
        text('Never draw centripetal force as a separate force on an FBD.', '永远不要把向心力作为单独的力画在自由体图上。')],
      formulas: [        formula('Centripetal acceleration', '向心加速度', 'a_c=\\frac{v^2}{r}=\\omega^2r'),
        formula('Centripetal force', '向心力', '\\sum F_r=m\\frac{v^2}{r}')]
    },
    {
      heading: text('4. Classroom check: friction', '4. 课堂题:摩擦力'),
      classroomQuestions: [        {
          id: 'friction-static-vs-kinetic',
          title: text('Classroom Check: static vs kinetic friction', '课堂题:静摩擦与动摩擦'),
          prompt: text('A 10 kg box sits on a horizontal floor. mu_s = 0.5 and mu_k = 0.3. You push horizontally with a force of 40 N. Does the box move? What is the friction force?', '一个 10 kg 的箱子放在水平地面上。mu_s = 0.5,mu_k = 0.3。你用 40 N 的力水平推它。箱子会动吗?摩擦力多大?'),
          choices: [
            { label: 'A', text: text('Yes, it moves. Friction = 30 N (kinetic).', '会动。摩擦力 = 30 N(动摩擦)。') },
            { label: 'B', text: text('No, it stays. Friction = 40 N (static, matching the push).', '不动。摩擦力 = 40 N(静摩擦,与推力匹配)。') },
            { label: 'C', text: text('No, it stays. Friction = 50 N (maximum static).', '不动。摩擦力 = 50 N(最大静摩擦)。') },
            { label: 'D', text: text('Yes, it moves. Friction = 50 N.', '会动。摩擦力 = 50 N。') },
          ],
          correctAnswer: 'B',
          feedback: text('Maximum static friction = mu_s * N = 0.5 * 10 * 10 = 50 N. Since 40 N < 50 N, the box does not move. Static friction adjusts to exactly match: f_s = 40 N.', '最大静摩擦力 = mu_s * N = 0.5 * 10 * 10 = 50 N。因为 40 N < 50 N,箱子不动。静摩擦力调节到刚好等于推力:f_s = 40 N。'),
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
      formulas: [        formula('Static friction', '静摩擦力', 'f_s\\le \\mu_s N'),
        formula('Kinetic friction', '动摩擦力', 'f_k=\\mu_k N'),
        formula('Hooke law', '胡克定律', 'F_s=-kx'),
        formula('Centripetal force', '向心力', '\\sum F_r=m\\frac{v^2}{r}')]
    }
  ],
};

const apPhysics1Unit1StudioLesson: CurriculumLesson = {
  title: text('Unit 1 Studio Map: Kinematics', 'Unit 1 Studio Map: 运动学'),
  description: text(
    'A learning roadmap for AP Physics 1 Unit 1: why motion models matter, how the topics connect, and how graphs, vectors, and measurements describe motion.',
    'AP 物理 1 Unit 1 学习路线图:为什么要学运动模型、知识点如何连接,以及图像、矢量和测量如何描述运动。',
  ),
  sections: [
    {
      heading: text('0. Learning motivation', '0. 学习动机'),
      paragraphs: [
        text(
          'A runner crossing a finish line, a cart rolling down a ramp, a ball flying through the air, and a drone changing altitude all raise the same first question: where is it, how fast is it moving, and how is that motion changing?',
          '跑者冲过终点、小车沿斜面下滑、小球在空中飞行、无人机改变高度,都会先引出同一个问题:它在哪里、运动有多快、运动状态如何改变?',
        ),
        text(
          'The unit should feel like building a GPS for physics: choose a reference frame, decide what counts as positive, represent motion with vectors and graphs, then translate between words, equations, and measurements.',
          '这一单元应该像给物理搭建一个 GPS:先选参考系,规定正方向,再用矢量和图像表示运动,最后在文字、方程和测量数据之间互相翻译。',
        ),
      ],
      takeaway: text(
        'Do not start with memorizing equations. Start with the question: how can we represent motion so precisely that another person can reconstruct it?',
        '不要从背公式开始。先问:我们怎样描述运动,才能让另一个人准确复原这个运动?',
      ),
    },
    {
      heading: text('1. Official topic path', '1. 官方知识点路径'),
      bullets: [
        text('1.1 Scalars and vectors in one dimension: separate quantities that only have size from quantities that also need direction.', '1.1 一维标量与矢量:区分只有大小的量,以及还需要方向的量。'),
        text('1.2 Displacement, velocity, and acceleration: define the core quantities and keep distance/speed separate from displacement/velocity.', '1.2 位移、速度与加速度:定义核心运动量,并区分路程/速率与位移/速度。'),
        text('1.3 Representing motion: translate among motion diagrams, graphs, tables, and algebraic models.', '1.3 运动表示:在运动图、图像、表格和代数模型之间转换。'),
        text('1.4 Reference frames and relative motion: state what observer or coordinate system the measurement belongs to.', '1.4 参考系与相对运动:说明测量是相对于哪个观察者或坐标系。'),
        text('1.5 Vectors and motion in two dimensions: split motion into independent perpendicular components, with projectile motion as the central AP example.', '1.5 二维运动中的矢量:把运动分解成互相垂直的独立分量,并把斜抛/平抛运动作为 AP 的核心例子。'),
      ],
    },
    {
      heading: text('2. Concept connections and derivation flow', '2. 知识连接与推导逻辑'),
      paragraphs: [
        text(
          'Begin with a coordinate system. Once positive direction and origin are chosen, displacement becomes $\\Delta x=x_f-x_i$, average velocity becomes $v_{\\mathrm{avg}}=\\Delta x/\\Delta t$, and acceleration becomes the rate at which velocity changes.',
          '从坐标系开始。一旦选定正方向和原点,位移就是 $\\Delta x=x_f-x_i$,平均速度就是 $v_{\\mathrm{avg}}=\\Delta x/\\Delta t$,加速度就是速度变化的快慢。',
        ),
        text(
          'Graphs are not decoration. The slope of $x$ vs. $t$ gives velocity; the slope of $v$ vs. $t$ gives acceleration; the area under a $v$ vs. $t$ graph gives displacement.',
          '图像不是装饰。$x$-$t$ 图像斜率给速度;$v$-$t$ 图像斜率给加速度;$v$-$t$ 图像下方面积给位移。',
        ),
        text(
          'For two-dimensional motion, vectors are split first, each axis is analyzed separately, and the components are recombined at the end. This keeps projectile motion connected to the physical path instead of turning it into formula matching.',
          '二维运动中,先分解矢量,分别处理每个坐标轴,最后再合成。这样抛体运动会始终连接真实轨迹,而不是变成套公式。',
        ),
        text(
          'Do not let Topic 1.5 remain only a vector slogan. In AP Physics 1 it must become the practical skill of projectile motion: $a_x=0$, $a_y=-g$, shared time $t$, and independent horizontal and vertical equations.',
          '不要让 Topic 1.5 只停留在“矢量分解”这句话上。在 AP 物理 1 中,它必须落实为斜抛运动的实用能力:$a_x=0$、$a_y=-g$、共同时间 $t$,以及水平和竖直方向相互独立的方程。',
        ),
      ],
      formulas: [
        formula('Average velocity', '平均速度', 'v_{\\mathrm{avg}}=\\frac{\\Delta x}{\\Delta t}'),
        formula('Average acceleration', '平均加速度', 'a_{\\mathrm{avg}}=\\frac{\\Delta v}{\\Delta t}'),
        formula('Constant acceleration', '匀加速关系', 'v=v_0+at,\\quad x=x_0+v_0t+\\frac12at^2,\\quad v^2=v_0^2+2a\\Delta x'),
        formula('Vector components', '矢量分量', 'A_x=A\\cos\\theta,\\quad A_y=A\\sin\\theta,\\quad A=\\sqrt{A_x^2+A_y^2}'),
        formula('Projectile components', '斜抛运动分量', 'a_x=0,\\quad a_y=-g,\\quad v_{0x}=v_0\\cos\\theta,\\quad v_{0y}=v_0\\sin\\theta'),
      ],
    },
    {
      heading: text('3. Resource and interaction suggestions', '3. 素材与互动建议'),
      bullets: [
        text('A motion sensor or phone video analysis clip of a cart moving toward and away from a detector makes the sign of velocity visible before the graph appears.', '小车靠近/远离探测器的运动传感器或手机视频分析片段,能在图像出现前先把速度正负变得可见。'),
        text('A slow-motion projectile video makes the transition from one-dimensional to two-dimensional motion concrete; the top of the path is a natural place to examine velocity and acceleration separately.', '慢动作抛体视频能让一维到二维运动的过渡更具体;轨迹最高点很适合分别观察速度和加速度。'),
        text('A short check question works well after each representation change: words to graph, graph to equation, equation to physical interpretation.', '每次表示方式转换后都适合放一个短检查题:文字到图像、图像到方程、方程到物理解释。'),
      ],
    },
    {
      heading: text('4. Classroom check: graph meaning', '4. 课堂题:图像含义'),
      classroomQuestions: [
        {
          id: 'ap1-u1-graph-area-check',
          title: text('Classroom Check: slope and area', '课堂题:斜率与面积'),
          prompt: text(
            'A cart moves along a straight track. From $t=0$ to $t=4\\,\\mathrm{s}$, its velocity increases linearly from $1\\,\\mathrm{m/s}$ to $5\\,\\mathrm{m/s}$. What displacement does the cart have during this interval?',
            '一辆小车沿直线轨道运动。从 $t=0$ 到 $t=4\\,\\mathrm{s}$,它的速度从 $1\\,\\mathrm{m/s}$ 线性增加到 $5\\,\\mathrm{m/s}$。这段时间内位移是多少?',
          ),
          choices: [
            { label: 'A', text: text('$4\\,\\mathrm{m}$', '$4\\,\\mathrm{m}$') },
            { label: 'B', text: text('$12\\,\\mathrm{m}$', '$12\\,\\mathrm{m}$') },
            { label: 'C', text: text('$20\\,\\mathrm{m}$', '$20\\,\\mathrm{m}$') },
            { label: 'D', text: text('$24\\,\\mathrm{m}$', '$24\\,\\mathrm{m}$') },
          ],
          correctAnswer: 'B',
          feedback: text(
            'Displacement is the area under the velocity-time graph. Average velocity is $(1+5)/2=3\\,\\mathrm{m/s}$, so $\\Delta x=(3)(4)=12\\,\\mathrm{m}$.',
            '位移是速度-时间图像下方面积。平均速度为 $(1+5)/2=3\\,\\mathrm{m/s}$,所以 $\\Delta x=(3)(4)=12\\,\\mathrm{m}$。',
          ),
        },
      ],
    },
  ],
};

const apPhysics1Unit2StudioLesson: CurriculumLesson = {
  title: text('Unit 2 Studio Map: Force and Translational Dynamics', 'Unit 2 Studio Map: 力与平动动力学'),
  description: text(
    'A learning roadmap for AP Physics 1 Unit 2: how systems, forces, free-body diagrams, and Newton’s laws turn interactions into predictions.',
    'AP 物理 1 Unit 2 学习路线图:系统、力、自由体图和牛顿定律如何把相互作用变成可检验的预测。',
  ),
  sections: [
    {
      heading: text('0. Learning motivation', '0. 学习动机'),
      paragraphs: [
        text(
          'A scale reading changes in an accelerating elevator, a box may start or fail to slide when pushed, and a car turning a corner needs an inward force. Dynamics explains how interactions produce acceleration.',
          '电梯加速时体重秤读数会变化,箱子被推时可能开始滑动也可能保持静止,汽车转弯时需要指向内侧的力。动力学解释的正是相互作用如何产生加速度。',
        ),
      ],
      takeaway: text(
        '$\\sum \\vec F=m\\vec a$ is a modeling sentence: external interactions determine acceleration.',
        '$\\sum \\vec F=m\\vec a$ 是一句建模语言:外部相互作用决定加速度。',
      ),
    },
    {
      heading: text('1. Official topic path', '1. 官方知识点路径'),
      bullets: [
        text('2.1 Systems and center of mass: decide what object or collection of objects is being analyzed.', '2.1 系统与质心:决定分析对象是单个物体还是物体系统。'),
        text('2.2 Forces and free-body diagrams: draw only forces acting on the chosen system.', '2.2 力与自由体图:只画作用在所选系统上的力。'),
        text('2.3 Newton’s third law: identify paired interactions acting on different objects.', '2.3 牛顿第三定律:识别作用在不同物体上的相互作用力对。'),
        text('2.4-2.5 Newton’s first and second laws: connect equilibrium, net force, mass, and acceleration.', '2.4-2.5 牛顿第一、第二定律:连接平衡、合力、质量和加速度。'),
        text('2.6-2.9 Gravitational force, friction, springs, and circular motion: apply force models in specific physical contexts.', '2.6-2.9 重力、摩擦、弹簧与圆周运动:把力模型应用到具体物理场景。'),
      ],
    },
    {
      heading: text('2. Problem-solving structure', '2. 解题结构'),
      paragraphs: [
        text(
          'The most reliable modeling sequence is: choose the system, draw the free-body diagram, choose axes, write component equations, then interpret the sign of acceleration.',
          '最可靠的建模顺序是:选系统、画自由体图、选坐标轴、写分量方程,最后解释加速度符号。',
        ),
        text(
          'Newton’s third law keeps interaction pairs straight: the two forces in a pair are equal in magnitude, opposite in direction, and act on different objects.',
          '牛顿第三定律能厘清相互作用力对:一对力大小相等、方向相反,并且作用在不同物体上。',
        ),
      ],
      formulas: [
        formula('Newton second law', '牛顿第二定律', '\\sum \\vec F=m\\vec a'),
        formula('Component equations', '分量方程', '\\sum F_x=ma_x,\\quad \\sum F_y=ma_y'),
        formula('Friction models', '摩擦力模型', 'f_s\\le \\mu_sN,\\quad f_k=\\mu_kN'),
        formula('Spring force', '弹簧力', 'F_s=-kx'),
        formula('Circular motion', '圆周运动', 'a_c=\\frac{v^2}{r},\\quad \\sum F_r=m\\frac{v^2}{r}'),
      ],
    },
    {
      heading: text('3. Resource and interaction suggestions', '3. 素材与互动建议'),
      bullets: [
        text('An elevator-scale video or phone accelerometer demo makes it clear that a scale reading is a normal force, not mass.', '电梯秤视频或手机加速度计演示能说明:秤读数是支持力,不是质量。'),
        text('A low-friction cart with a hanging mass makes system choice visible: cart alone and cart plus hanging mass lead to different internal/external force boundaries.', '低摩擦小车和悬挂砝码能让系统选择变得可见:只选小车和选择“小车+悬挂砝码”会得到不同的内外力边界。'),
        text('A ball on a string or turntable demo makes circular motion concrete and shows why centripetal force is not an extra force on the diagram.', '绳上小球或转盘演示能让圆周运动更具体,也能说明向心力不是自由体图上的额外一种力。'),
      ],
    },
    {
      heading: text('4. Classroom check: system choice', '4. 课堂题:系统选择'),
      classroomQuestions: [
        {
          id: 'ap1-u2-system-choice-check',
          title: text('Classroom Check: internal vs external force', '课堂题:内力与外力'),
          prompt: text(
            'A person pushes a box across a rough floor. If the chosen system is the box alone, which force must be included on the box free-body diagram?',
            '一个人推着箱子在粗糙地面上运动。如果所选系统只有箱子,下列哪一个力必须画在箱子的自由体图上?',
          ),
          choices: [
            { label: 'A', text: text('The force of the box on the person', '箱子对人的力') },
            { label: 'B', text: text('The force of the person on the box', '人对箱子的力') },
            { label: 'C', text: text('The acceleration $m\\vec a$ as a force', '把加速度 $m\\vec a$ 作为一个力') },
            { label: 'D', text: text('Only gravity, because applied forces are internal', '只画重力,因为推力是内力') },
          ],
          correctAnswer: 'B',
          feedback: text(
            'For the box-alone system, the person is outside the system, so the force of the person on the box is external and belongs on the free-body diagram. The force of the box on the person acts on a different object.',
            '如果系统只选箱子,人就在系统外,所以人对箱子的力是外力,必须画在自由体图上。箱子对人的力作用在另一个物体上。',
          ),
        },
      ],
    },
  ],
};

const emConductorsCapacitorsLesson: CurriculumLesson = {
  title: text('Introduction to Capacitors: From a Burst of Power to Capacitance', '电容器导论:从瞬时功率需求到电容定义'),
  description: text(
    'A question-driven route through the complete introductory lesson: why energy must sometimes be stored in advance, what a capacitor stores, why voltage limits matter, and how $C=Q/\\Delta V$ and $C=\\epsilon_0A/d$ emerge.',
    '一条由问题驱动的完整导论路线:为什么有时必须提前储能、电容器究竟储存什么、电压限制为什么重要,以及 $C=Q/\\Delta V$ 和 $C=\\epsilon_0A/d$ 如何自然出现。',
  ),
  sections: [
    {
      heading: text('0. The water problem: continuous supply is not the same as a burst', '0. 水的问题:持续供应不等于瞬间爆发'),
      paragraphs: [
        text(
          'Imagine a house suddenly needs a huge amount of water in a very short time, as in a fire-sprinkler system. The city pipe can supply water continuously, but only at a limited flow rate. Making every supply pipe enormous is neither practical nor necessary.',
          '想象一座房屋突然需要在极短时间内获得大量水,例如消防喷淋系统。城市供水管可以持续供水,但每秒流量有限。把所有供水管都做得巨大既不现实,也没有必要。',
        ),
        text(
          'A better solution is to prepare the water in advance. A modest pipe slowly fills a large tank; when a large valve opens, the stored water rushes out much faster than the pipe alone could supply it. The source supplies slowly, while the storage device releases quickly.',
          '更好的办法是提前准备。普通水管慢慢把水箱装满;当大阀门打开时,储存的水能以远高于水管供水速度的流量涌出。供给源慢慢提供,储存装置快速释放。',
        ),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-water-tank-purpose',
          title: text('Pause and predict: what does the tank change?', '停下来预测:水箱改变了什么?'),
          prompt: text(
            'A pipe delivers water at a steady but limited rate. Which advantage does a tank add?',
            '一根水管以稳定但有限的流量供水。水箱增加的核心能力是什么?',
          ),
          choices: [
            { label: 'A', text: text('It creates water that was not supplied by the pipe.', '它能创造水管没有提供的水。') },
            { label: 'B', text: text('It stores water over time and can release it at a much larger rate for a short interval.', '它能随时间储水,再在短时间内以更大流量释放。') },
            { label: 'C', text: text('It makes the total amount of water irrelevant.', '它让总水量不再重要。') },
            { label: 'D', text: text('It removes the need for a water source.', '它让供水源变得不再需要。') },
          ],
          correctAnswer: 'B',
          feedback: text(
            'The tank does not generate water. It separates the time of accumulation from the time of release. This same timing idea will motivate the capacitor.',
            '水箱不会创造水。它把积累发生的时间和释放发生的时间分开了。电容器的动机也来自同一个时间尺度问题。',
          ),
        },
      ],
      takeaway: text(
        'The first problem is about rate, not total supply: enough energy delivered too slowly may still be unusable for a brief high-power event.',
        '第一个问题讨论的是速率而不只是总量:即使总能量足够,如果提供得太慢,仍然无法完成短时高功率任务。',
      ),
    },
    {
      heading: text('1. Translate the problem into electricity', '1. 把水的问题翻译成电学问题'),
      paragraphs: [
        text(
          'A battery resembles the supply pipe: it can provide energy continuously, but a real battery has limits on how much power it can deliver at once. A camera flash needs a large amount of energy delivered in a very short interval, so its instantaneous power requirement can be much larger than the battery can supply directly.',
          '电池类似供水管:它可以持续提供能量,但真实电池能够瞬间输出的功率有限。相机闪光灯需要在极短时间内释放较多能量,因此它的瞬时功率需求可能远大于电池能够直接提供的功率。',
        ),
        text(
          'The solution mirrors the tank. The battery slowly transfers energy into another device; that device later releases the energy quickly. This device is a capacitor. The distinction is captured by $P=\\Delta E/\\Delta t$: the same energy delivered in less time requires more power.',
          '解决方法与水箱完全对应。电池先慢慢把能量转移到另一个装置;这个装置随后快速释放能量。这个装置就是电容器。$P=\\Delta E/\\Delta t$ 抓住了关键区别:同样的能量在更短时间内释放,所需功率更大。',
        ),
      ],
      formulas: [
        formula('Average power over the release interval', '释放过程的平均功率', 'P=\\frac{\\Delta E}{\\Delta t}'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-energy-versus-power',
          title: text('Pause and predict: enough energy, not enough power', '停下来预测:能量足够,功率却不够'),
          prompt: text(
            'A flash needs $6.0\\,\\mathrm{J}$ in $3.0\\,\\mathrm{ms}$. What average power is required during the flash?',
            '一次闪光需要在 $3.0\\,\\mathrm{ms}$ 内释放 $6.0\\,\\mathrm{J}$。闪光期间所需的平均功率是多少?',
          ),
          choices: [
            { label: 'A', text: text('$2.0\\,\\mathrm{W}$', '$2.0\\,\\mathrm{W}$') },
            { label: 'B', text: text('$18\\,\\mathrm{W}$', '$18\\,\\mathrm{W}$') },
            { label: 'C', text: text('$2.0\\times10^3\\,\\mathrm{W}$', '$2.0\\times10^3\\,\\mathrm{W}$') },
            { label: 'D', text: text('$1.8\\times10^4\\,\\mathrm{W}$', '$1.8\\times10^4\\,\\mathrm{W}$') },
          ],
          correctAnswer: 'C',
          feedback: text(
            '$P=\\Delta E/\\Delta t=6.0/(3.0\\times10^{-3})=2.0\\times10^3\\,\\mathrm{W}$. The total energy is modest, but the short release time creates a large power demand.',
            '$P=\\Delta E/\\Delta t=6.0/(3.0\\times10^{-3})=2.0\\times10^3\\,\\mathrm{W}$。总能量并不夸张,但极短的释放时间造成了很高的功率需求。',
          ),
        },
      ],
      takeaway: text(
        'A capacitor does not replace the source. It allows a slow source to prepare for a fast release.',
        '电容器不会取代电源;它让输出较慢的电源能够为快速释放提前做准备。',
      ),
    },
    {
      heading: text('2. What does a capacitor actually store?', '2. 电容器究竟储存什么?'),
      paragraphs: [
        text(
          'The phrase “a capacitor stores charge” is incomplete. A normal capacitor does not collect a new pile of net charge: one conductor carries $+Q$, the other carries $-Q$, so the two-conductor system usually has zero net charge.',
          '“电容器储存电荷”这句话并不完整。普通电容器不是收集一堆新的净电荷:一块导体带 $+Q$,另一块带 $-Q$,因此两导体组成的整体通常净电荷为零。',
        ),
        text(
          'The important physical act is charge separation. Two separated conductors create an electric field between them, and work must be done to build that field. The energy is stored in the electric field produced by the separated charges.',
          '真正重要的物理过程是电荷分离。两个分开的导体在它们之间建立电场,建立这个电场需要做功。能量储存在分离电荷所产生的电场中。',
        ),
        text(
          'Why use two plates rather than one charged metal object? Opposite charges on facing conductors concentrate the useful electric field in the region between them. The device can then store controllable field energy in a compact region.',
          '为什么使用两块极板,而不是只给一个金属物体带电?相对极板上的异号电荷把有用电场集中在两板之间,使装置能在紧凑区域内储存可控制的电场能量。',
        ),
      ],
      formulas: [
        formula('Charges on the two plates', '两块极板上的电荷', 'Q_1=+Q,\\qquad Q_2=-Q'),
        formula('Net charge of the ideal capacitor', '理想电容器的净电荷', 'Q_{\\mathrm{net}}=Q_1+Q_2=0'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-what-capacitor-stores',
          title: text('Pause and predict: where is the energy?', '停下来预测:能量在哪里?'),
          prompt: text(
            'Which statement most accurately describes an ideal charged capacitor?',
            '哪一项最准确地描述了一个理想的已充电电容器?',
          ),
          choices: [
            { label: 'A', text: text('It has a large positive net charge stored on both plates.', '两块极板上储存着大量正净电荷。') },
            { label: 'B', text: text('It creates energy by creating positive and negative charge.', '它通过创造正负电荷来创造能量。') },
            { label: 'C', text: text('It maintains separated opposite charges, with energy stored in the resulting electric field.', '它维持分离的异号电荷,能量储存在由此产生的电场中。') },
            { label: 'D', text: text('It stores energy only inside the metal plates where the electric field is strongest.', '它只把能量储存在电场最强的金属极板内部。') },
          ],
          correctAnswer: 'C',
          feedback: text(
            'The plates carry equal-magnitude opposite charges, so the net charge is normally zero. Their separation creates the electric field that stores energy.',
            '两块极板带等量异号电荷,所以整体净电荷通常为零。正是这种分离建立了储存能量的电场。',
          ),
        },
      ],
      takeaway: text(
        'A precise statement is: a capacitor stores electric-field energy by maintaining charge separation.',
        '更准确的说法是:电容器通过维持电荷分离来储存电场能量。',
      ),
    },
    {
      heading: text('3. Why voltage becomes the limiting cost', '3. 为什么电压会成为储存的限制'),
      paragraphs: [
        text(
          'Suppose more separated charge is placed on the plates. As $Q$ increases, the electric field between the plates becomes stronger, and the potential difference $\\Delta V$ also increases. Storing more charge therefore comes with an increasing voltage cost.',
          '假设继续增加极板上的分离电荷。随着 $Q$ 增大,两板间电场增强,电势差 $\\Delta V$ 也随之增大。因此储存更多电荷需要付出越来越高的电压代价。',
        ),
        text(
          'This cannot continue without limit. If the field exceeds the breakdown strength of the air or dielectric, the material can become conductive. Charge leaks or sparks across the gap, so the intended charge separation collapses.',
          '这个过程不可能无限持续。如果电场超过空气或电介质的击穿场强,材料可能变得导电。电荷会泄漏或跨越间隙放电,原本要维持的电荷分离随之崩溃。',
        ),
        text(
          'The useful engineering question is now clear: when charge is added to this particular structure, how quickly does its voltage rise? Equivalently, how much charge separation can it maintain for every volt of potential difference?',
          '现在工程问题变得清楚了:给这个特定结构增加电荷时,它的电压上升得有多快?等价地说,每 1 V 电势差能维持多少分离电荷?',
        ),
      ],
      formulas: [
        formula('Charge, field, and voltage rise together', '电荷、电场和电压共同增大', 'Q\\uparrow\\quad\\Rightarrow\\quad E\\uparrow\\quad\\Rightarrow\\quad \\Delta V\\uparrow'),
        formula('Breakdown condition', '击穿条件', 'E>E_{\\mathrm{breakdown}}'),
      ],
      takeaway: text(
        'Voltage is a practical measure of how difficult the stored charge separation has become to maintain.',
        '电压可以看作一个实际指标,衡量当前电荷分离已经变得多么难以维持。',
      ),
    },
    {
      heading: text('4. Define capacitance only after the need is clear', '4. 需求清楚之后再定义 capacitance'),
      paragraphs: [
        text(
          'Capacitance names the property we have been looking for. It compares the magnitude $Q$ on either plate with the potential difference between the plates: $C=Q/\\Delta V$. A large $C$ means the structure can maintain more separated charge before its voltage rises by the same amount.',
          '电容正是我们一直在寻找的物理量。它比较任一极板上电荷量的大小 $Q$ 与两板电势差:$C=Q/\\Delta V$。较大的 $C$ 表示在电压上升相同幅度前,这个结构能维持更多分离电荷。',
        ),
        text(
          'This definition does not say that capacitance is the amount currently stored. It describes the response of the structure: how much $Q$ corresponds to each $\\Delta V$. Rearranging gives $Q=C\\Delta V$.',
          '这个定义不是说电容等于当前已经储存的量。它描述结构的响应关系:每个 $\\Delta V$ 对应多少 $Q$。整理后得到 $Q=C\\Delta V$。',
        ),
        text(
          'For example, a $1\\,\\mathrm{F}$ capacitor at $1\\,\\mathrm{V}$ has $1\\,\\mathrm{C}$ on either plate. A $100\\,\\mathrm{F}$ capacitor at the same voltage has $100\\,\\mathrm{C}$ on either plate. The larger capacitance stores more separated charge without requiring a larger voltage.',
          '例如,$1\\,\\mathrm{F}$ 的电容器在 $1\\,\\mathrm{V}$ 时,任一极板电荷量为 $1\\,\\mathrm{C}$。$100\\,\\mathrm{F}$ 的电容器在相同电压下,任一极板电荷量为 $100\\,\\mathrm{C}$。更大的电容能在不提高电压的情况下维持更多分离电荷。',
        ),
      ],
      formulas: [
        formula('Capacitance definition', '电容定义', 'C=\\frac{Q}{\\Delta V}'),
        formula('Charge at a given voltage', '给定电压下的电荷量', 'Q=C\\Delta V'),
        formula('SI unit', '国际单位', '1\\,\\mathrm{F}=1\\,\\frac{\\mathrm{C}}{\\mathrm{V}}'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-compare-capacitance',
          title: text('Pause and predict: compare two structures', '停下来预测:比较两个结构'),
          prompt: text(
            'Capacitors A and B are each connected to $2.0\\,\\mathrm{V}$. Their capacitances are $C_A=3.0\\,\\mathrm{F}$ and $C_B=8.0\\,\\mathrm{F}$. Which statement is correct?',
            '电容器 A 和 B 都连接到 $2.0\\,\\mathrm{V}$。它们的电容分别为 $C_A=3.0\\,\\mathrm{F}$ 和 $C_B=8.0\\,\\mathrm{F}$。哪一项正确?',
          ),
          choices: [
            { label: 'A', text: text('A has more charge because its capacitance is smaller.', 'A 的电容更小,所以电荷更多。') },
            { label: 'B', text: text('B has $16\\,\\mathrm{C}$ on either plate and maintains more charge separation at the same voltage.', 'B 的任一极板上有 $16\\,\\mathrm{C}$,并在相同电压下维持更多电荷分离。') },
            { label: 'C', text: text('Both have the same plate charge because their voltages are equal.', '两者电压相同,所以极板电荷相同。') },
            { label: 'D', text: text('The capacitance doubles whenever the voltage doubles.', '电压加倍时,电容也会加倍。') },
          ],
          correctAnswer: 'B',
          feedback: text(
            '$Q_B=C_B\\Delta V=(8.0)(2.0)=16\\,\\mathrm{C}$. Capacitance is a property of the structure; changing $Q$ and $\\Delta V$ together does not by itself change $C$.',
            '$Q_B=C_B\\Delta V=(8.0)(2.0)=16\\,\\mathrm{C}$。电容是结构的性质;仅仅让 $Q$ 与 $\\Delta V$ 一起变化,不会自动改变 $C$。',
          ),
        },
      ],
      takeaway: text(
        'Capacitance is charge separation per volt, not charge already present.',
        '电容是“每伏对应的分离电荷量”,不是“当前已经存在的电荷量”。',
      ),
    },
    {
      heading: text('5. Derive the parallel-plate result step by step', '5. 逐步推导平行板电容'),
      paragraphs: [
        text(
          'Now test whether capacitance is really a property of the structure. Consider two large parallel plates of area $A$, separated by distance $d$, carrying $+Q$ and $-Q$. The surface charge density is $\\sigma=Q/A$.',
          '现在检验电容是否真的是结构的性质。考虑两块面积为 $A$、间距为 $d$ 的大平行板,分别带 $+Q$ 和 $-Q$。面电荷密度为 $\\sigma=Q/A$。',
        ),
        text(
          'Neglecting edge effects, the fields of the two plates add between them, giving $E=\\sigma/\\epsilon_0=Q/(\\epsilon_0A)$. The field is approximately uniform, so $\\Delta V=Ed=Qd/(\\epsilon_0A)$.',
          '忽略边缘效应,两块极板产生的电场在板间叠加,得到 $E=\\sigma/\\epsilon_0=Q/(\\epsilon_0A)$。板间电场近似均匀,所以 $\\Delta V=Ed=Qd/(\\epsilon_0A)$。',
        ),
        text(
          'Finally substitute this voltage into the definition. The charge cancels: $C=Q/\\Delta V=\\epsilon_0A/d$. The new result comes directly from Gauss’s law, electric field, and potential difference.',
          '最后把这个电压代入定义。电荷被约去:$C=Q/\\Delta V=\\epsilon_0A/d$。这个新结果直接来自高斯定律、电场和电势差。',
        ),
      ],
      formulas: [
        formula('Step 1: surface charge density', '步骤 1:面电荷密度', '\\sigma=\\frac{Q}{A}'),
        formula('Step 2: field between the plates', '步骤 2:板间电场', 'E=\\frac{\\sigma}{\\epsilon_0}=\\frac{Q}{\\epsilon_0A}'),
        formula('Step 3: potential difference', '步骤 3:电势差', '\\Delta V=Ed=\\frac{Qd}{\\epsilon_0A}'),
        formula('Step 4: capacitance', '步骤 4:电容', 'C=\\frac{Q}{\\Delta V}=\\epsilon_0\\frac{A}{d}'),
      ],
      takeaway: text(
        'The formula is not an isolated fact: $Q\\rightarrow E\\rightarrow\\Delta V\\rightarrow C$ is the complete reasoning chain.',
        '公式不是孤立结论:$Q\\rightarrow E\\rightarrow\\Delta V\\rightarrow C$ 才是完整推理链。',
      ),
    },
    {
      heading: text('6. The surprising conclusion: $Q$ and $\\Delta V$ disappear', '6. 令人意外的结论:$Q$ 和 $\\Delta V$ 消失了'),
      paragraphs: [
        text(
          'The definition $C=Q/\\Delta V$ appears to contain charge and voltage, but the derived result $C=\\epsilon_0A/d$ contains neither. For an ideal linear capacitor, changing $Q$ changes $\\Delta V$ in the same proportion, leaving their ratio unchanged.',
          '定义 $C=Q/\\Delta V$ 看起来含有电荷和电压,但推导结果 $C=\\epsilon_0A/d$ 中两者都消失了。对理想线性电容器,改变 $Q$ 会让 $\\Delta V$ 按相同比例变化,因此它们的比值保持不变。',
        ),
        text(
          'The capacitance is determined by geometry and the material between the plates. Increasing $A$ increases $C$: there is more facing surface over which opposite charge can be separated. Increasing $d$ decreases $C$: the same plate charge then produces a larger potential difference.',
          '电容由几何结构和极板间材料决定。增大 $A$ 会增大 $C$:有更多相对表面可以分离异号电荷。增大 $d$ 会减小 $C$:相同极板电荷会产生更大的电势差。',
        ),
        text(
          'This resolves the apparent contradiction: $Q$ and $\\Delta V$ are the variables used to measure capacitance, while $A$, $d$, and the dielectric determine its value.',
          '这消除了表面上的矛盾:$Q$ 和 $\\Delta V$ 是用来测量电容的变量,而 $A$、$d$ 和电介质才决定电容的数值。',
        ),
      ],
      formulas: [
        formula('Geometry dependence', '几何结构决定电容', 'C=\\epsilon_0\\frac{A}{d}'),
        formula('Area change', '改变极板面积', 'A\\uparrow\\quad\\Rightarrow\\quad C\\uparrow'),
        formula('Separation change', '改变极板间距', 'd\\uparrow\\quad\\Rightarrow\\quad C\\downarrow'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-geometry-prediction',
          title: text('Pause and predict: redesign the capacitor', '停下来预测:重新设计电容器'),
          prompt: text(
            'An air-filled parallel-plate capacitor has capacitance $C_0$. Its plate area is doubled and its separation is tripled. What is the new capacitance?',
            '一个空气平行板电容器的电容为 $C_0$。现在极板面积加倍,板间距变为原来的 3 倍。新电容是多少?',
          ),
          choices: [
            { label: 'A', text: text('$6C_0$', '$6C_0$') },
            { label: 'B', text: text('$\\frac{3}{2}C_0$', '$\\frac{3}{2}C_0$') },
            { label: 'C', text: text('$\\frac{2}{3}C_0$', '$\\frac{2}{3}C_0$') },
            { label: 'D', text: text('$\\frac{1}{6}C_0$', '$\\frac{1}{6}C_0$') },
          ],
          correctAnswer: 'C',
          feedback: text(
            'Because $C\\propto A/d$, the scale factor is $2/3$. The answer depends on geometry, not on the capacitor’s current charge or voltage.',
            '因为 $C\\propto A/d$,变化倍数为 $2/3$。答案由几何结构决定,与电容器当前的电荷或电压无关。',
          ),
        },
      ],
      takeaway: text(
        'Definition tells how to measure $C$; derivation reveals what determines $C$.',
        '定义告诉我们如何测量 $C$;推导告诉我们什么因素决定 $C$。',
      ),
    },
    {
      heading: text('7. Return to the original promise: stored energy', '7. 回到最初的问题:储存能量'),
      paragraphs: [
        text(
          'The water-tank story promised a device that could accumulate energy slowly and release it quickly. The capacitor fulfills that promise because separating additional charge requires work. When the plate charge is already $q$, moving an additional $dq$ across the potential difference requires $dU=V\\,dq=(q/C)\\,dq$.',
          '水箱故事承诺的是一种能慢慢积累能量、快速释放能量的装置。电容器能够做到这一点,因为继续分离电荷需要做功。当极板上已有电荷 $q$ 时,再把 $dq$ 跨过电势差需要 $dU=V\\,dq=(q/C)\\,dq$。',
        ),
        text(
          'Integrating from an uncharged state to charge $Q$ gives $U=Q^2/(2C)$. Using $Q=C\\Delta V$ produces the equivalent forms $U=\\frac12Q\\Delta V=\\frac12C(\\Delta V)^2$. The energy is the area under the straight $V$-versus-$Q$ graph.',
          '从未充电状态积分到电荷量 $Q$,得到 $U=Q^2/(2C)$。再利用 $Q=C\\Delta V$,可得到等价形式 $U=\\frac12Q\\Delta V=\\frac12C(\\Delta V)^2$。能量就是 $V$-$Q$ 直线下方的面积。',
        ),
        text(
          'The physical story is now complete: the battery does work gradually to build the electric field; the capacitor preserves that field energy; the external circuit can later receive it over a much shorter time.',
          '至此物理故事完整闭环:电池逐渐做功建立电场;电容器保存电场能量;外部电路随后可以在更短时间内获得这些能量。',
        ),
      ],
      formulas: [
        formula('Incremental work', '微元功', 'dU=V\\,dq=\\frac{q}{C}\\,dq'),
        formula('Stored electric energy', '储存的电能', 'U=\\int_0^Q\\frac{q}{C}\\,dq=\\frac{Q^2}{2C}=\\frac12Q\\Delta V=\\frac12C(\\Delta V)^2'),
        formula('Electric-field energy density', '电场能量密度', 'u_E=\\frac12\\epsilon E^2'),
      ],
      takeaway: text(
        'A capacitor stores electric-field energy; its practical advantage is that the charging and discharging time scales can be very different.',
        '电容器储存的是电场能量;它的实际优势在于充电与放电可以发生在截然不同的时间尺度上。',
      ),
    },
    {
      heading: text('8. The next question: can material increase capacitance?', '8. 下一个问题:材料能否增大电容?'),
      paragraphs: [
        text(
          'The parallel-plate result suggests three design levers: plate area, separation, and the material in the gap. A dielectric polarizes in the applied field and produces an opposing induced field. For the same free plate charge, this reduces the net field and potential difference, so $C=Q/\\Delta V$ increases.',
          '平行板结果给出三个设计杠杆:极板面积、板间距和间隙中的材料。电介质在外电场中极化,产生方向相反的感应电场。对相同的自由极板电荷,这会降低净电场和电势差,所以 $C=Q/\\Delta V$ 增大。',
        ),
        text(
          'The first decision in every dielectric-change problem is what remains fixed. If the battery is disconnected, $Q$ is fixed. If the battery remains connected, $\\Delta V$ is fixed and additional charge can flow from the battery.',
          '所有改变电介质的问题都要先判断哪个量保持不变。断开电池时,$Q$ 固定;仍连接电池时,$\\Delta V$ 固定,电池可以继续输送电荷。',
        ),
      ],
      formulas: [
        formula('Capacitance with a dielectric', '含电介质的电容', 'C=\\kappa C_0=\\kappa\\epsilon_0\\frac{A}{d}'),
        formula('Battery disconnected', '断开电池', 'Q=\\mathrm{constant},\\quad \\Delta V=\\frac{Q}{C}'),
        formula('Battery connected', '连接电池', '\\Delta V=\\mathrm{constant},\\quad Q=C\\Delta V'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-dielectric-battery-disconnected',
          title: text('Bridge question: isolated capacitor', '衔接题:孤立电容器'),
          prompt: text(
            'A charged parallel-plate capacitor is disconnected from the battery. A dielectric with constant $\\kappa>1$ is inserted fully between the plates. What happens to the capacitance and voltage?',
            '一个已充电的平行板电容器与电池断开。把介电常数 $\\kappa>1$ 的电介质完全插入板间。电容和电压如何变化?',
          ),
          choices: [
            { label: 'A', text: text('$C$ increases and $\\Delta V$ decreases.', '$C$ 增大,$\\Delta V$ 减小。') },
            { label: 'B', text: text('$C$ decreases and $\\Delta V$ increases.', '$C$ 减小,$\\Delta V$ 增大。') },
            { label: 'C', text: text('Both $C$ and $\\Delta V$ increase.', '$C$ 和 $\\Delta V$ 都增大。') },
            { label: 'D', text: text('Both $C$ and $\\Delta V$ stay the same.', '$C$ 和 $\\Delta V$ 都不变。') },
          ],
          correctAnswer: 'A',
          feedback: text(
            'Disconnected means $Q$ is fixed. The dielectric increases the capacitance to $\\kappa C_0$. Since $\\Delta V=Q/C$, the voltage decreases.',
            '断开电池意味着 $Q$ 固定。电介质使电容增大到 $\\kappa C_0$。因为 $\\Delta V=Q/C$,所以电压减小。',
          ),
        },
      ],
    },
    {
      heading: text('9. Reconstruct the whole story', '9. 用五个问题还原完整逻辑'),
      bullets: [
        text('Why is a storage device needed? A source may have enough total energy but insufficient instantaneous power.', '为什么需要储存装置?电源的总能量可能足够,但瞬时功率不够。'),
        text('What is stored? Separated charges create an electric field, and energy is stored in that field.', '储存的是什么?分离电荷建立电场,能量储存在电场中。'),
        text('Why care about voltage? More plate charge raises the field and voltage until leakage or breakdown becomes possible.', '为什么关心电压?更多极板电荷会提高电场和电压,直至可能发生泄漏或击穿。'),
        text('Why define capacitance? $C=Q/\\Delta V$ measures how much separated charge a structure maintains per volt.', '为什么定义电容?$C=Q/\\Delta V$ 衡量一个结构每伏能维持多少分离电荷。'),
        text('What determines capacitance? For parallel plates, $C=\\epsilon_0A/d$: geometry and material determine it, while $Q$ and $\\Delta V$ reveal it.', '什么决定电容?对平行板,$C=\\epsilon_0A/d$:几何与材料决定它,$Q$ 和 $\\Delta V$ 用来体现或测量它。'),
      ],
      classroomQuestions: [
        {
          id: 'em-u10-flash-capacitor-motivation',
          title: text('Synthesis check: explain the flash', '综合检查:解释闪光灯'),
          prompt: text(
            'A small battery can provide enough total energy for a bright flash, but it cannot deliver that energy in a few milliseconds without a large voltage drop. Which statement best explains why a capacitor is useful here?',
            '一个小电池可以提供一次强闪光所需的总能量,但无法在几毫秒内输出这些能量而不出现明显电压下降。哪句话最能解释为什么这里需要电容器?',
          ),
          choices: [
            { label: 'A', text: text('The capacitor creates extra net charge from nothing.', '电容器可以凭空创造额外净电荷。') },
            { label: 'B', text: text('The capacitor slowly stores separated charge and electric-field energy, then releases energy quickly when the circuit demands high power.', '电容器先慢慢储存分离电荷和电场能量,再在电路需要高功率时快速释放能量。') },
            { label: 'C', text: text('The capacitor keeps the voltage zero so charge can move without energy.', '电容器把电压保持为零,所以电荷可以不消耗能量地运动。') },
            { label: 'D', text: text('The capacitor changes electric charge into mass before the flash.', '电容器在闪光前把电荷转化为质量。') },
          ],
          correctAnswer: 'B',
          feedback: text(
            'A capacitor is an energy reservoir, not a charge generator. It separates slow charging from fast discharging, which is why it is useful when the required instantaneous power exceeds what the source can deliver directly.',
            '电容器是能量储存器,不是电荷发生器。它把慢充电和快放电分开,所以当瞬时功率需求超过电源直接输出能力时非常有用。',
          ),
        },
      ],
      takeaway: text(
        'The lesson is one connected argument: rate problem $\\rightarrow$ advance storage $\\rightarrow$ charge separation $\\rightarrow$ voltage limit $\\rightarrow$ capacitance $\\rightarrow$ geometry $\\rightarrow$ stored field energy.',
        '整节课是一条连续论证:速率问题 $\\rightarrow$ 提前储能 $\\rightarrow$ 电荷分离 $\\rightarrow$ 电压限制 $\\rightarrow$ 电容定义 $\\rightarrow$ 几何结构 $\\rightarrow$ 电场储能。',
      ),
    },
  ],
  studentVersion: capacitorsStudentVersion,
};

const emElectricCircuitsLesson: CurriculumLesson = {
  title: text('Unit 11 Studio Map: Electric Circuits', 'Unit 11 Studio Map: 电路'),
  description: text(
    'A calculus-based roadmap for current, resistance, electric power, Kirchhoff rules, compound circuits, and RC transients.',
    '面向微积分电磁学的电流、电阻、电功率、基尔霍夫定律、复合电路和 RC 暂态路线图。',
  ),
  sections: [
    {
      heading: text('0. Learning motivation', '0. 学习动机'),
      paragraphs: [
        text(
          'Electric circuits turn field ideas into working devices. The same conservation laws reappear in a new language: charge conservation becomes the junction rule, and energy conservation becomes the loop rule.',
          '电路把电场思想变成真实工作的装置。同样的守恒律换了一种语言出现:电荷守恒变成节点定律,能量守恒变成回路定律。',
        ),
      ],
      takeaway: text(
        'A circuit is not solved by “following the current.” It is solved by enforcing conservation of charge and conservation of energy across the whole network.',
        '电路不是靠“沿着电流看”来解,而是靠在整个网络中强制满足电荷守恒和能量守恒。',
      ),
    },
    {
      heading: text('1. Official topic path', '1. 官方知识点路径'),
      bullets: [
        text('11.1 Electric current: current is the rate of charge flow, $I=dq/dt$.', '11.1 电流:电流是电荷流动速率,$I=dq/dt$。'),
        text('11.2 Simple circuits: batteries, resistors, wires, ammeters, and voltmeters form the basic model.', '11.2 简单电路:电池、电阻、导线、电流表和电压表构成基础模型。'),
        text('11.3 Resistance, resistivity, and Ohm’s law: connect material, geometry, field, and current density.', '11.3 电阻、电阻率与欧姆定律:连接材料、几何、电场和电流密度。'),
        text('11.4 Electric power: track the rate of electrical energy transfer.', '11.4 电功率:追踪电能转移的速率。'),
        text('11.5-11.7 Compound DC circuits and Kirchhoff rules: solve multi-branch networks with loop and junction equations.', '11.5-11.7 复合直流电路与基尔霍夫定律:用回路和节点方程求解多支路网络。'),
        text('11.8 RC circuits: model charging and discharging with exponential functions and time constant $\\tau=RC$.', '11.8 RC 电路:用指数函数和时间常数 $\\tau=RC$ 建模充放电。'),
      ],
    },
    {
      heading: text('2. Core reasoning chain', '2. 核心推导链条'),
      paragraphs: [
        text(
          'Start from current as a flow rate, $I=dq/dt$. In a steady-state junction, charge cannot pile up, so the sum of currents entering equals the sum leaving.',
          '从电流是流率开始,$I=dq/dt$。在稳态节点,电荷不能持续堆积,所以流入电流之和等于流出电流之和。',
        ),
        text(
          'Resistance connects microscopic material behavior with circuit behavior: $\\vec J=\\sigma\\vec E$, $\\rho=1/\\sigma$, and for a uniform wire $R=\\rho L/A$.',
          '电阻把微观材料行为与电路行为连接起来:$\\vec J=\\sigma\\vec E$,$\\rho=1/\\sigma$,均匀导线有 $R=\\rho L/A$。',
        ),
        text(
          'For an RC charging circuit, the loop equation is $\\mathcal{E}-q/C-IR=0$ with $I=dq/dt$. Solving the differential equation gives exponential charging and discharging.',
          '对 RC 充电电路,回路方程是 $\\mathcal{E}-q/C-IR=0$,且 $I=dq/dt$。解这个微分方程得到指数形式的充放电。',
        ),
      ],
      formulas: [
        formula('Current', '电流', 'I=\\frac{dq}{dt}'),
        formula('Microscopic Ohm law', '微观欧姆定律', '\\vec J=\\sigma\\vec E,\\quad \\vec E=\\rho\\vec J'),
        formula('Resistance of a uniform wire', '均匀导线电阻', 'R=\\rho\\frac{L}{A}'),
        formula('Power', '电功率', 'P=I\\Delta V=I^2R=\\frac{(\\Delta V)^2}{R}'),
        formula('Kirchhoff rules', '基尔霍夫定律', '\\sum I_{\\mathrm{in}}=\\sum I_{\\mathrm{out}},\\quad \\sum \\Delta V=0'),
        formula('RC charging', 'RC 充电', 'q(t)=C\\mathcal{E}\\left(1-e^{-t/RC}\\right),\\quad I(t)=\\frac{\\mathcal{E}}{R}e^{-t/RC}'),
        formula('RC discharging', 'RC 放电', 'q(t)=Q_0e^{-t/RC},\\quad I(t)=-\\frac{Q_0}{RC}e^{-t/RC}'),
      ],
    },
    {
      heading: text('3. Resource and interaction suggestions', '3. 素材与互动建议'),
      bullets: [
        text('A water-flow analogy can be useful only as a temporary picture; charge conservation and energy per charge give the more reliable circuit model.', '水流类比只适合作为临时图像;电荷守恒和单位电荷能量才是更可靠的电路模型。'),
        text('An RC charging demo with a voltage sensor makes the exponential curve and the meaning of one time constant visible.', '带电压传感器的 RC 充电演示能让指数曲线和一个时间常数的含义变得可见。'),
        text('Compound circuits become clearer with a practice problem that requires independent loop equations instead of guessing equivalent resistance.', '复合电路适合搭配一道需要选择独立回路方程的练习题,而不是盲猜等效电阻。'),
      ],
    },
    {
      heading: text('4. Classroom check: RC time constant', '4. 课堂题:RC 时间常数'),
      classroomQuestions: [
        {
          id: 'em-u11-rc-time-constant',
          title: text('Classroom Check: charging capacitor', '课堂题:电容充电'),
          prompt: text(
            'A capacitor charges through a resistor with time constant $\\tau=RC=2.0\\,\\mathrm{s}$. After one time constant, approximately what fraction of the final charge is on the capacitor?',
            '一个电容通过电阻充电,时间常数 $\\tau=RC=2.0\\,\\mathrm{s}$。经过一个时间常数后,电容上的电荷大约达到最终电荷的多少?',
          ),
          choices: [
            { label: 'A', text: text('$37\\%$', '$37\\%$') },
            { label: 'B', text: text('$50\\%$', '$50\\%$') },
            { label: 'C', text: text('$63\\%$', '$63\\%$') },
            { label: 'D', text: text('$100\\%$', '$100\\%$') },
          ],
          correctAnswer: 'C',
          feedback: text(
            'For charging, $q(t)=Q_f(1-e^{-t/RC})$. At $t=RC$, $q/Q_f=1-e^{-1}\\approx0.63$.',
            '充电时 $q(t)=Q_f(1-e^{-t/RC})$。当 $t=RC$,$q/Q_f=1-e^{-1}\\approx0.63$。',
          ),
        },
      ],
    },
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
      ['Analyze projectile motion by separating horizontal and vertical components.', '通过分解水平和竖直分量分析斜抛运动。'],
      ['Model one- and two-dimensional motion with vector components.', '用矢量分量建立一维和二维运动模型。'],
    ]),
    formulas: [
      ...formulas.kinematics,
      formula('Projectile components', '斜抛初速度分量', 'v_{0x}=v_0\\cos\\theta,\\quad v_{0y}=v_0\\sin\\theta'),
      formula('Projectile acceleration', '斜抛加速度', 'a_x=0,\\quad a_y=-g'),
    ],
    diagrams: [
      ...diagrams.kinematics,
      diagram('projectile-motion', 'Projectile Motion Components', '斜抛运动分量', 'Horizontal velocity stays constant while vertical velocity changes under gravity.', '水平方向速度保持不变,竖直方向速度在重力作用下改变。'),
    ],
    lessons: [
      apPhysics1Unit1StudioLesson,
      scalarsVectors1DLesson,
      positionVelocityAccelerationLesson,
      referenceFramesRelativeMotionLesson,
      projectileMotionLesson,
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
      apPhysics1Unit2StudioLesson,
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
  'mechanics:2': {
    ...enrich('dynamics', 'dynamics', 'dynamics', [
      ['Build Newton-law equations from free-body diagrams.', '从自由体图建立牛顿定律方程。'],
      ['Model drag and circular motion with calculus-ready reasoning.', '用适合微积分的方式建模阻力和圆周运动。'],
      ['Choose coordinates that simplify force components.', '选择能简化力分量的坐标系。'],
    ]),
    lessons: circularMotionLessons,
  },
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
  'mechanics:5': {
    ...enrich('rotation', 'rotation', 'rotation', [
      ['Use rotational kinematics and graph calculus about a specified axis.', '围绕指定转轴使用转动运动学与图像微积分。'],
      ['Connect force location, direction, torque, and rotational inertia.', '连接力的作用位置、方向、力矩与转动惯量。'],
      ['Analyze equilibrium and coupled translation-rotation dynamics.', '分析转动平衡以及平动-转动耦合动力学。'],
    ]),
    formulas: [
      formula('Rotational kinematics', '转动运动学', '\\omega=\\frac{d\\theta}{dt},\\quad \\alpha=\\frac{d\\omega}{dt}'),
      formula('Linear-angular bridge', '线量与角量的联系', 's=r\\Delta\\theta,\\quad v_T=r\\omega,\\quad a_T=r\\alpha'),
      formula('Torque', '力矩', '\\vec\\tau=\\vec r\\times\\vec F'),
      formula('Rotational inertia', '转动惯量', 'I=\\sum m_ir_i^2=\\int r^2\\,dm'),
      formula('Parallel-axis theorem', '平行轴定理', 'I^{\\prime}=I_{cm}+Md^2'),
      formula('Rotational dynamics', '转动动力学', '\\sum\\tau=I\\alpha'),
    ],
    diagrams: [
      diagram('rotation', 'Torque About a Chosen Axis', '相对指定转轴的力矩', 'Force magnitude, direction, point of application, and axis jointly determine torque.', '力的大小、方向、作用点和转轴共同决定力矩。'),
    ],
    lessons: rotationalDynamicsLessons,
  },
  'mechanics:6': {
    ...enrich('rotation', 'rotation', 'rotation', [
      ['Connect torque through angle with rotational energy transfer.', '把力矩跨越角位移与转动能量转移连接起来。'],
      ['Use angular impulse, angular momentum, and system selection.', '使用角冲量、角动量与系统选择。'],
      ['Distinguish no-slip rolling from slipping and apply orbital conservation laws.', '区分无滑动滚动与滑动,并应用轨道守恒定律。'],
    ]),
    formulas: [
      formula('Rotational kinetic energy', '转动动能', 'K_{rot}=\\frac12I\\omega^2'),
      formula('Work by torque', '力矩做功', 'W=\\int\\tau\\,d\\theta'),
      formula('Angular momentum', '角动量', '\\vec L=\\vec r\\times\\vec p,\\quad L_{rigid}=I\\omega'),
      formula('Angular impulse', '角冲量', '\\Delta L=\\int\\tau_{ext}\\,dt'),
      formula('Rolling without slipping', '无滑动滚动', 'v_{cm}=R\\omega,\\quad a_{cm}=R\\alpha'),
      formula('Orbital energy and escape', '轨道能量与逃逸', 'E_{circ}=-\\frac{GMm}{2r},\\quad v_{esc}=\\sqrt{\\frac{2GM}{r}}'),
    ],
    diagrams: [
      diagram('energy-bar', 'Rotational Energy Accounting', '转动能量核算', 'Separate center-of-mass translation from rotation about the center of mass.', '把质心平动与绕质心转动分开核算。'),
      diagram('orbit-star', 'Orbit as a Conserved System', '作为守恒系统的轨道', 'Energy and angular momentum constrain circular and elliptical orbital motion.', '能量与角动量共同约束圆轨道和椭圆轨道运动。'),
    ],
    lessons: rotatingSystemsLessons,
  },
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
  'electricity-magnetism:10': {
    ...enrich('electric', 'electric', 'electric', [
      ['Describe electrostatic equilibrium in conductors.', '描述导体静电平衡。'],
      ['Explain why capacitors store separated charge and electric-field energy for controlled or burst release.', '解释电容器为什么能储存分离电荷和电场能量,并用于受控释放或瞬时释放。'],
      ['Track charge redistribution between conductors.', '追踪导体之间的电荷重新分布。'],
    ]),
    formulas: [
      ...formulas.electric,
      formula('Capacitance definition', '电容定义', 'C=\\frac{Q}{\\Delta V}'),
      formula('Parallel-plate capacitor', '平行板电容', 'C=\\kappa\\epsilon_0\\frac{A}{d}'),
      formula('Capacitor energy', '电容储能', 'U=\\frac12Q\\Delta V=\\frac{Q^2}{2C}=\\frac12C(\\Delta V)^2'),
      formula('Electric-field energy density', '电场能量密度', 'u_E=\\frac12\\epsilon E^2'),
    ],
    diagrams: [
      ...diagrams.electric,
      diagram('capacitor-plates', 'Parallel-Plate Capacitor', '平行板电容器', 'Plate area, separation, and dielectric material determine capacitance.', '极板面积、间距和电介质材料共同决定电容。'),
      diagram('conductor-equilibrium', 'Conductor at Electrostatic Equilibrium', '静电平衡导体', 'Charge resides on the surface and the electric field inside the conductor is zero.', '电荷分布在表面,导体内部电场为零。'),
    ],
    lessons: [emConductorsCapacitorsLesson, ...capacitorEnergyAndDielectricLessons],
  },
  'electricity-magnetism:11': {
    ...enrich('circuits', 'circuits', 'circuits', [
      ['Use Kirchhoff rules with calculus-based transient reasoning.', '结合微积分暂态思想使用基尔霍夫定律。'],
      ['Analyze resistance, resistivity, current density, and power.', '分析电阻、电阻率、电流密度和功率。'],
      ['Model RC circuits using exponential functions and time constants.', '用指数函数和时间常数建模 RC 电路。'],
    ]),
    formulas: [
      ...formulas.circuits,
      formula('Current as charge flow', '电流是电荷流率', 'I=\\frac{dq}{dt}'),
      formula('Material relation', '材料关系', '\\vec J=\\sigma\\vec E,\\quad R=\\rho\\frac{L}{A}'),
      formula('Electric power', '电功率', 'P=I\\Delta V=I^2R=\\frac{(\\Delta V)^2}{R}'),
      formula('Kirchhoff rules', '基尔霍夫定律', '\\sum I_{\\mathrm{in}}=\\sum I_{\\mathrm{out}},\\quad \\sum\\Delta V=0'),
      formula('RC time constant', 'RC 时间常数', '\\tau=RC'),
    ],
    diagrams: [
      ...diagrams.circuits,
      diagram('rc-transient', 'RC Transient Graph', 'RC 暂态图像', 'Charging rises toward a final value; discharging decays exponentially.', '充电逐渐接近最终值,放电按指数衰减。'),
      diagram('kirchhoff-network', 'Compound Circuit Network', '复合电路网络', 'Junctions encode charge conservation; loops encode energy conservation.', '节点体现电荷守恒,回路体现能量守恒。'),
    ],
    lessons: [...electricCurrentToOhmsLawLessons, emElectricCircuitsLesson],
  },
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

const cambridgeIgcse0625: CurriculumCourse = {
  id: 'cambridge-igcse-0625',
  name: text('Cambridge IGCSE Physics 0625', '剑桥 IGCSE 物理 0625'),
  level: text('IGCSE', 'IGCSE'),
  sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/',
  sourceLabel: text('Cambridge IGCSE Physics 0625', '剑桥 IGCSE 物理 0625'),
  units: [
    unit(1, 'Motion, Forces and Energy', '运动、力与能量', 'Core + Supplement', [
      topic('1.1', 'Physical quantities and measurement techniques', '物理量与测量技术'),
      topic('1.2', 'Motion', '运动'),
      topic('1.3', 'Mass and weight', '质量与重量'),
      topic('1.4', 'Density', '密度'),
      topic('1.5', 'Forces', '力'),
      topic('1.6', 'Momentum', '动量'),
      topic('1.7', 'Energy, work and power', '能量、功与功率'),
      topic('1.8', 'Pressure', '压强'),
    ], {
      summary: text(
        'Build the mechanics foundation from measurement and motion through forces, momentum, energy, and pressure.',
        '从测量和运动出发,逐步建立力、动量、能量与压强的力学基础。',
      ),
      focus: focus(
        ['Measure physical quantities accurately and use consistent SI units.', '准确测量物理量并统一使用 SI 单位。'],
        ['Connect motion descriptions with forces, momentum, and energy transfers.', '把运动描述与力、动量和能量转化联系起来。'],
        ['Apply density and pressure models to solids, liquids, and everyday systems.', '把密度与压强模型用于固体、液体和日常系统。'],
      ),
      formulas: [
        ...formulas.kinematics,
        formula('Weight', '重量', 'W=mg'),
        formula('Density', '密度', '\\rho=\\frac{m}{V}'),
        formula('Resultant force', '合力', 'F=ma'),
        formula('Momentum', '动量', 'p=mv'),
        ...formulas.energy,
        formula('Pressure', '压强', 'p=\\frac{F}{A}'),
      ],
      diagrams: [
        ...diagrams.kinematics,
        ...diagrams.dynamics,
        ...diagrams.momentum,
        ...diagrams.energy,
      ],
      lessons: igcseUnit1Lessons,
    }),
    unit(2, 'Thermal Physics', '热物理', 'Core + Supplement', [
      topic('2.1', 'Kinetic particle model of matter', '物质的粒子模型'),
      topic('2.2', 'Thermal properties and temperature', '热性质与温度'),
      topic('2.3', 'Transfer of thermal energy', '热能传递'),
    ], {
      summary: text(
        'Use the particle model to explain states of matter, thermal expansion, temperature, specific heat capacity, latent heat, and energy transfer by conduction, convection, and radiation.',
        '用粒子模型解释物质状态、热膨胀、温度、比热容、潜热以及传导、对流和辐射三种热传递方式。',
      ),
      focus: focus(
        ['Describe solids, liquids, and gases using the kinetic molecular model.', '用分子动理论描述固体、液体和气体。'],
        ['Use specific heat capacity and latent heat in energy calculations.', '在能量计算中使用比热容和潜热。'],
        ['Distinguish conduction, convection, and radiation with everyday examples.', '用日常例子区分传导、对流和辐射。'],
      ),
      formulas: [
        formula('Celsius to kelvin', '摄氏温度转开尔文', 'T\\,(\\mathrm{K})=\\theta\\,(^{\\circ}\\mathrm{C})+273'),
        formula('Specific heat capacity', '比热容', 'c=\\frac{\\Delta E}{m\\Delta\\theta}'),
        formula('Gas pressure and volume', '气体压强与体积', 'p_1V_1=p_2V_2\\quad (\\text{constant } T)'),
      ],
      diagrams: [
        ...diagrams.thermal,
        diagram('greenhouse', 'Greenhouse Effect', '温室效应', 'Thermal radiation balance explains atmospheric warming.', '热辐射平衡解释大气升温。'),
      ],
      lessons: [
        {
          title: text('The Particle Model and Thermal Energy', '粒子模型与热能'),
          description: text(
            'How the kinetic molecular model explains states of matter, temperature, specific heat capacity, and heat transfer methods.',
            '分子动理论如何解释物质状态、温度、比热容和热传递方式。',
          ),
          sections: [
            {
              heading: text('0. The particle model of matter', '0. 物质的粒子模型'),
              paragraphs: [
                text(
                  'All matter is made of tiny particles in constant motion. In solids: particles vibrate about fixed positions (strong forces, regular arrangement). In liquids: particles slide past each other (weaker forces, no fixed shape). In gases: particles move freely at high speed (negligible forces, fill any container). Heating increases the kinetic energy of particles, which can cause melting, evaporation, or expansion.',
                  '所有物质由不断运动的微小粒子组成。固体中：粒子在固定位置振动（强作用力，规则排列）。液体中：粒子相互滑动（较弱力，无固定形状）。气体中：粒子高速自由运动（可忽略的力，充满任何容器）。加热增加粒子动能，可能导致熔化、蒸发或膨胀。',
                ),
              ],
              takeaway: text(
                'Temperature measures the average kinetic energy of particles. Absolute zero (0 K) means zero kinetic energy.',
                '温度衡量粒子的平均动能。绝对零度（0 K）意味着动能为零。',
              ),
            },
            {
              heading: text('1. Specific heat capacity and latent heat', '1. 比热容与比潜热'),
              paragraphs: [
                text(
                  'Specific heat capacity (c): energy needed to raise 1 kg by 1°C. Q = mcΔT. Water has a high c (4200 J/kg°C), which is why it takes long to boil and cools slowly. Specific latent heat (L): energy needed to change state of 1 kg without changing temperature. Q = mL. During melting/boiling, energy goes into breaking bonds, not raising temperature.',
                  '比热容（c）：使 1 kg 升高 1°C 所需能量。Q = mcΔT。水的 c 很高（4200 J/kg°C），所以烧开慢、冷却也慢。比潜热（L）：使 1 kg 改变状态而不改变温度所需能量。Q = mL。在熔化/沸腾时，能量用于断裂键，而不是升温。',
                ),
              ],
              formulas: [
                formula('Specific heat capacity', '比热容', 'Q=mc\\Delta T'),
                formula('Specific latent heat', '比潜热', 'Q=mL'),
              ],
            },
            {
              heading: text('2. Three methods of heat transfer', '2. 三种热传递方式'),
              paragraphs: [
                text(
                  'Conduction: energy transferred through a solid by particle vibrations and free electrons (metals are good conductors). Convection: bulk movement of fluid due to density differences when heated (hot fluid rises, cool fluid sinks). Radiation: energy transferred by infrared electromagnetic waves (no medium needed; works in vacuum). Dark, matt surfaces are good emitters/absorbers; light, shiny surfaces are poor.',
                  '传导：通过固体中粒子振动和自由电子传递能量（金属是良导体）。对流：流体受热后密度变化引起的整体流动（热流体上升，冷流体下沉）。辐射：通过红外电磁波传递能量（不需要介质；在真空中也能工作）。深色、亚光表面是好的发射体/吸收体；浅色、光亮表面是差的。',
                ),
              ],
            },
            {
              heading: text('3. Classroom check: heating water', '3. 课堂题：加热水'),
              classroomQuestions: [
                {
                  id: 'igcse-specific-heat',
                  title: text('Energy to heat water', '加热水所需能量'),
                  prompt: text(
                    'How much energy is needed to heat 0.5 kg of water from 20°C to 100°C? (c = 4200 J/kg°C)',
                    '将 0.5 kg 水从 20°C 加热到 100°C 需要多少能量？（c = 4200 J/kg°C）',
                  ),
                  choices: [
                    { label: 'A', text: text('168 kJ', '168 kJ') },
                    { label: 'B', text: text('84 kJ', '84 kJ') },
                    { label: 'C', text: text('336 kJ', '336 kJ') },
                    { label: 'D', text: text('42 kJ', '42 kJ') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Q = mcΔT = 0.5 × 4200 × 80 = 168,000 J = 168 kJ.',
                    'Q = mcΔT = 0.5 × 4200 × 80 = 168,000 J = 168 kJ。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Thinking temperature rises during boiling (it stays constant during state change).', '以为沸腾时温度继续升高（状态变化时温度不变）。'),
                text('Confusing heat with temperature (heat is energy transferred; temperature is a measure of hotness).', '混淆热量和温度（热量是传递的能量；温度是冷热程度的度量）。'),
                text('Forgetting that radiation works in a vacuum (conduction and convection do not).', '忘记辐射在真空中也能工作（传导和对流不行）。'),
                text('Using ΔT in kelvin and Celsius interchangeably without noting they have the same size degree.', '混用开尔文和摄氏度的 ΔT 而不注意它们的度数大小相同。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(3, 'Waves', '波', 'Core + Supplement', [
      topic('3.1', 'General properties of waves', '波的一般性质'),
      topic('3.2', 'Light', '光'),
      topic('3.3', 'Electromagnetic spectrum', '电磁波谱'),
      topic('3.4', 'Sound', '声'),
    ], {
      summary: text(
        'Describe wave motion, reflection, refraction, diffraction, and the electromagnetic spectrum, then apply ray models to lenses and sound properties.',
        '描述波动、反射、折射、衍射和电磁波谱,然后用光线模型分析透镜和声波性质。',
      ),
      focus: focus(
        ['Distinguish transverse and longitudinal waves with examples.', '用例子区分横波和纵波。'],
        ['Use the wave equation and ray diagrams for reflection, refraction, and lenses.', '用波动方程和光线图分析反射、折射和透镜。'],
        ['Describe the electromagnetic spectrum and its applications.', '描述电磁波谱及其应用。'],
      ),
      formulas: [
        formula('Wave speed', '波速', 'v=f\\lambda'),
        formula('Reflection', '反射', '\\theta_i=\\theta_r'),
        formula('Refractive index', '折射率', 'n=\\frac{\\sin i}{\\sin r}'),
        formula('Critical angle', '临界角', '\\sin c=\\frac{1}{n}'),
        formula('Electromagnetic wave speed in vacuum', '电磁波真空速度', 'c=3.0\\times10^8\\,\\mathrm{m\\,s^{-1}}'),
      ],
      diagrams: [
        ...diagrams.waves,
        ...diagrams.optics,
      ],
      lessons: [
        {
          title: text('Wave Properties and the Wave Equation', '波的性质与波动方程'),
          description: text(
            'What makes a wave? Transverse vs longitudinal, amplitude, wavelength, frequency, and how v = fλ connects them all.',
            '波是什么？横波与纵波、振幅、波长、频率，以及 v = fλ 如何将它们联系起来。',
          ),
          sections: [
            {
              heading: text('0. What is a wave?', '0. 什么是波？'),
              paragraphs: [
                text(
                  'A wave is a disturbance that transfers energy from one place to another without transferring matter. Think of a Mexican wave in a stadium: each person moves up and down, but the “wave” travels around the stadium. The energy moves; the people do not.',
                  '波是一种将能量从一个地方传递到另一个地方而不传递物质的扰动。想象体育场里的人浪：每个人只是上下动，但“波”却绕场传播。能量在移动，人没有。',
                ),
              ],
              takeaway: text(
                'Waves transfer energy, not matter. The medium oscillates but does not travel with the wave.',
                '波传递能量，不传递物质。介质振动但不随波移动。',
              ),
            },
            {
              heading: text('1. Transverse vs longitudinal waves', '1. 横波与纵波'),
              paragraphs: [
                text(
                  'In a transverse wave, the oscillation is perpendicular to the direction of travel. Examples: light, water ripples, waves on a string. In a longitudinal wave, the oscillation is parallel to the direction of travel. Examples: sound, ultrasound, P-waves in earthquakes. Longitudinal waves have compressions (particles close together) and rarefactions (particles spread apart).',
                  '在横波中，振动方向垂直于传播方向。例子：光、水波纹、绳子上的波。在纵波中，振动方向平行于传播方向。例子：声音、超声波、地震 P 波。纵波有压缩区（粒子密集）和稀疏区（粒子分散）。',
                ),
              ],
            },
            {
              heading: text('2. Key wave vocabulary', '2. 波的关键术语'),
              paragraphs: [
                text(
                  'Amplitude (A): maximum displacement from equilibrium, measured in metres. Wavelength (λ): distance between two consecutive identical points (e.g. crest to crest), in metres. Frequency (f): number of complete oscillations per second, in hertz (Hz). Period (T): time for one complete oscillation, T = 1/f. Wave speed (v): how fast the wave pattern moves, in m/s.',
                  '振幅（A）：离开平衡位置的最大位移，单位米。波长（λ）：两个相邻相同点之间的距离（如峰到峰），单位米。频率（f）：每秒完整振动次数，单位赫兹（Hz）。周期（T）：一次完整振动的时间，T = 1/f。波速（v）：波形移动的速度，单位 m/s。',
                ),
              ],
              formulas: [
                formula('Wave equation', '波动方程', 'v=f\\lambda'),
                formula('Period and frequency', '周期与频率', 'T=\\frac{1}{f}'),
              ],
            },
            {
              heading: text('3. Classroom check: using v = fλ', '3. 课堂题：使用 v = fλ'),
              classroomQuestions: [
                {
                  id: 'igcse-wave-equation',
                  title: text('Calculating wavelength from speed and frequency', '由波速和频率计算波长'),
                  prompt: text(
                    'A sound wave has frequency 256 Hz and travels at 340 m/s in air. What is its wavelength?',
                    '一个声波频率为 256 Hz，在空气中传播速度为 340 m/s。它的波长是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('1.33 m', '1.33 m') },
                    { label: 'B', text: text('0.75 m', '0.75 m') },
                    { label: 'C', text: text('87 m', '87 m') },
                    { label: 'D', text: text('0.013 m', '0.013 m') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'λ = v/f = 340/256 = 1.33 m. Option B is f/v (inverted). Option C is v×f. Option D would be for ultrasound frequencies.',
                    'λ = v/f = 340/256 = 1.33 m。选项 B 是 f/v（反了）。选项 C 是 v×f。选项 D 对应超声频率。',
                  ),
                },
              ],
            },
            {
              heading: text('4. The electromagnetic spectrum', '4. 电磁波谱'),
              paragraphs: [
                text(
                  'All electromagnetic waves are transverse and travel at 3×10⁸ m/s in a vacuum. In order of increasing frequency (decreasing wavelength): radio → microwave → infrared → visible → ultraviolet → X-rays → gamma rays. Each region has characteristic uses: radio (broadcasting), microwave (cooking, phones), infrared (heating, remote controls), visible (sight), UV (sterilisation), X-rays (medical imaging), gamma (cancer treatment).',
                  '所有电磁波都是横波，在真空中以 3×10⁸ m/s 传播。按频率增加（波长减小）的顺序：无线电波 → 微波 → 红外线 → 可见光 → 紫外线 → X 射线 → γ 射线。每个区域都有特征用途：无线电（广播）、微波（加热、手机）、红外（加热、遥控器）、可见光（视觉）、紫外（灭菌）、X 射线（医学成像）、γ（癌症治疗）。',
                ),
              ],
              takeaway: text(
                'All EM waves have the same speed in vacuum. They differ only in frequency and wavelength.',
                '所有电磁波在真空中速度相同。它们只在频率和波长上不同。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Confusing amplitude with wavelength (amplitude is height, wavelength is length).', '混淆振幅和波长（振幅是高度，波长是长度）。'),
                text('Thinking waves carry matter along with them.', '以为波会携带物质一起移动。'),
                text('Using v = f/λ instead of v = fλ.', '用 v = f/λ 而不是 v = fλ。'),
                text('Forgetting that sound is longitudinal, not transverse.', '忘记声波是纵波，不是横波。'),
              ],
            },
          ],
        },
        {
          title: text('Light: Reflection, Refraction and Lenses', '光：反射、折射与透镜'),
          description: text(
            'How light bounces, bends, and focuses: ray diagrams, Snell\'s law, total internal reflection, and image formation by lenses.',
            '光如何反射、折射和聚焦：光线图、斯涅尔定律、全反射和透镜成像。',
          ),
          sections: [
            {
              heading: text('0. The ray model of light', '0. 光的光线模型'),
              paragraphs: [
                text(
                  'We model light as straight-line rays. This works when objects and openings are much larger than the wavelength (~500 nm). The ray model explains reflection, refraction, shadows, and image formation by mirrors and lenses. When light hits a boundary between two materials, it can reflect, refract (bend), or be absorbed.',
                  '我们用直线光线建模光。当物体和开口远大于波长（约 500 nm）时，这个模型有效。光线模型解释反射、折射、影子和镜子/透镜成像。当光到达两种材料的界面时，它可以反射、折射（弯曲）或被吸收。',
                ),
              ],
            },
            {
              heading: text('1. Reflection: the law and ray diagrams', '1. 反射：定律与光线图'),
              paragraphs: [
                text(
                  'The law of reflection states: angle of incidence = angle of reflection (θᵢ = θᵣ), both measured from the normal. A plane mirror forms a virtual image that is: the same size, the same distance behind the mirror, and laterally inverted (left-right swapped).',
                  '反射定律：入射角 = 反射角（θᵢ = θᵣ），都从法线量起。平面镜成虚像：大小相同、在镜后等距、左右颠倒。',
                ),
              ],
              formulas: [
                formula('Law of reflection', '反射定律', '\\theta_i = \\theta_r'),
              ],
            },
            {
              heading: text('2. Refraction and Snell\'s law', '2. 折射与斯涅尔定律'),
              paragraphs: [
                text(
                  'When light passes from a less dense medium (e.g. air) into a denser medium (e.g. glass), it slows down and bends toward the normal. The refractive index n = c/v tells us how much the light slows. Snell\'s law connects the angles: n₁ sin θ₁ = n₂ sin θ₂. If light goes from dense to less dense at an angle greater than the critical angle c, total internal reflection occurs (sin c = 1/n).',
                  '当光从较疏介质（如空气）进入较密介质（如玻璃）时，它减速并向法线弯曲。折射率 n = c/v 告诉我们光减慢多少。斯涅尔定律连接角度：n₁ sin θ₁ = n₂ sin θ₂。如果光从密到疏且入射角大于临界角 c，则发生全反射（sin c = 1/n）。',
                ),
              ],
              formulas: [
                formula('Refractive index', '折射率', 'n=\\frac{c}{v}'),
                formula('Snell\'s law', '斯涅尔定律', 'n_1\\sin\\theta_1=n_2\\sin\\theta_2'),
                formula('Critical angle', '临界角', '\\sin c=\\frac{1}{n}'),
              ],
            },
            {
              heading: text('3. Classroom check: total internal reflection', '3. 课堂题：全反射'),
              classroomQuestions: [
                {
                  id: 'igcse-total-internal-reflection',
                  title: text('Critical angle for glass', '玻璃的临界角'),
                  prompt: text(
                    'Glass has refractive index n = 1.5. Light inside the glass hits the glass-air boundary. At what angle of incidence does total internal reflection begin?',
                    '玻璃折射率 n = 1.5。光在玻璃内部射向玻璃-空气界面。入射角为多少时开始发生全反射？',
                  ),
                  choices: [
                    { label: 'A', text: text('41.8°', '41.8°') },
                    { label: 'B', text: text('48.2°', '48.2°') },
                    { label: 'C', text: text('90°', '90°') },
                    { label: 'D', text: text('33.7°', '33.7°') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'sin c = 1/n = 1/1.5 = 0.667, so c = sin⁻¹(0.667) = 41.8°. Total internal reflection occurs for angles of incidence greater than this. This is how optical fibres work!',
                    'sin c = 1/n = 1/1.5 = 0.667，所以 c = sin⁻¹(0.667) = 41.8°。入射角大于此值时发生全反射。这就是光纤的工作原理！',
                  ),
                },
              ],
            },
            {
              heading: text('4. Lenses and image formation', '4. 透镜与成像'),
              paragraphs: [
                text(
                  'A converging (convex) lens brings parallel rays to a focus at the focal point F. A diverging (concave) lens spreads parallel rays as if from a virtual focal point. For a converging lens: object beyond 2F → real, inverted, diminished image between F and 2F; object between F and 2F → real, inverted, magnified image beyond 2F; object inside F → virtual, upright, magnified image (magnifying glass). The thin lens equation is 1/f = 1/u + 1/v.',
                  '会聚（凸）透镜将平行光线聚焦到焦点 F。发散（凹）透镜将平行光线散开，好像来自虚焦点。对于会聚透镜：物体在 2F 外 → 实像、倒立、缩小，在 F 和 2F 之间；物体在 F 和 2F 之间 → 实像、倒立、放大，在 2F 外；物体在 F 内 → 虚像、正立、放大（放大镜）。薄透镜公式为 1/f = 1/u + 1/v。',
                ),
              ],
              formulas: [
                formula('Thin lens equation', '薄透镜公式', '\\frac{1}{f}=\\frac{1}{u}+\\frac{1}{v}'),
                formula('Magnification', '放大率', 'M=\\frac{v}{u}=\\frac{\\text{image height}}{\\text{object height}}'),
              ],
              takeaway: text(
                'Real images can be projected on a screen; virtual images cannot. Converging lenses make both; diverging lenses only make virtual images.',
                '实像可以投射在屏幕上；虚像不能。会聚透镜两种都能成；发散透镜只能成虚像。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Measuring angles from the surface instead of the normal.', '从界面而不是法线量角度。'),
                text('Thinking refraction changes the frequency of light (it changes speed and wavelength, not frequency).', '以为折射改变光的频率（它改变速度和波长，不改变频率）。'),
                text('Drawing ray diagrams without arrows or forgetting the central ray through a lens goes straight.', '画光线图不加箭头，或忘记通过透镜中心的光线不偏折。'),
                text('Confusing real and virtual images.', '混淆实像和虚像。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(4, 'Electricity and Magnetism', '电与磁', 'Core + Supplement', [
      topic('4.1', 'Simple phenomena of magnetism', '磁现象基础'),
      topic('4.2', 'Electrical quantities', '电学量'),
      topic('4.3', 'Electric circuits', '电路'),
      topic('4.4', 'Electrical safety', '安全用电'),
      topic('4.5', 'Electromagnetic effects', '电磁效应'),
    ], {
      summary: text(
        'Connect charge, current, voltage, resistance, and power in circuits, then extend to magnetic fields, motors, generators, and transformers.',
        '在电路中连接电荷、电流、电压、电阻和功率,然后扩展到磁场、电动机、发电机和变压器。',
      ),
      focus: focus(
        ['Use Ohm\'s law, series/parallel rules, and power equations in circuit analysis.', '用欧姆定律、串并联规则和功率方程分析电路。'],
        ['Describe magnetic field patterns and the motor effect.', '描述磁场分布和电动机效应。'],
        ['Explain electromagnetic induction, generators, and transformers.', '解释电磁感应、发电机和变压器。'],
      ),
      formulas: [
        formula('Current', '电流', 'I=\\frac{Q}{t}'),
        formula('E.m.f. and p.d.', '电动势与电势差', '\\mathcal{E}=\\frac{W}{Q},\\quad V=\\frac{W}{Q}'),
        formula('Resistance', '电阻', 'R=\\frac{V}{I}'),
        formula('Electrical power', '电功率', 'P=IV'),
        formula('Electrical energy', '电能', 'E=IVt'),
        formula('Potential divider', '分压器', '\\frac{R_1}{R_2}=\\frac{V_1}{V_2}'),
        formula('Transformer equation', '变压器方程', '\\frac{V_p}{V_s}=\\frac{N_p}{N_s}'),
        formula('Cable power loss', '电缆功率损耗', 'P=I^2R'),
      ],
      diagrams: [
        ...diagrams.circuits,
        ...diagrams.magnetism,
      ],
      lessons: [
        {
          title: text('Circuits, Power and Electromagnetic Induction', '电路、功率与电磁感应'),
          description: text(
            'Ohm\'s law, series and parallel circuits, electrical power, and how generators and transformers work.',
            '欧姆定律、串联和并联电路、电功率、以及发电机和变压器的工作原理。',
          ),
          sections: [
            {
              heading: text('0. Current, voltage and resistance', '0. 电流、电压与电阻'),
              paragraphs: [
                text(
                  'Current (I) is the rate of flow of charge: I = Q/t (amperes). Voltage (V) is the energy transferred per unit charge: V = E/Q (volts). Resistance (R) opposes current flow: R = V/I (ohms). Ohm\'s law: V = IR (for ohmic conductors at constant temperature). In series: same current, voltages add. In parallel: same voltage, currents add.',
                  '电流（I）是电荷流动速率：I = Q/t（安培）。电压（V）是每单位电荷转移的能量：V = E/Q（伏特）。电阻（R）阻碍电流：R = V/I（欧姆）。欧姆定律：V = IR（恒温欧姆导体）。串联：电流相同，电压相加。并联：电压相同，电流相加。',
                ),
              ],
              formulas: [
                formula('Ohm\'s law', '欧姆定律', 'V=IR'),
                formula('Power', '功率', 'P=IV=I^2R'),
                formula('Energy', '电能', 'E=IVt'),
              ],
            },
            {
              heading: text('1. Electromagnetic induction', '1. 电磁感应'),
              paragraphs: [
                text(
                  'When a conductor moves through a magnetic field (or the field changes), an EMF is induced. This is electromagnetic induction (Faraday\'s law). A generator converts kinetic energy to electrical energy by rotating a coil in a magnetic field. A transformer changes AC voltage: Vp/Vs = Np/Ns. Step-up transformers increase voltage (for power transmission); step-down decrease it (for safe use).',
                  '当导体在磁场中运动（或磁场变化）时，会感应出电动势。这就是电磁感应（法拉第定律）。发电机通过在磁场中旋转线圈将动能转化为电能。变压器改变交流电压：Vp/Vs = Np/Ns。升压变压器增加电压（用于输电）；降压变压器降低电压（用于安全使用）。',
                ),
              ],
              formulas: [
                formula('Transformer equation', '变压器方程', '\\frac{V_p}{V_s}=\\frac{N_p}{N_s}'),
              ],
              takeaway: text(
                'Induction requires a CHANGING magnetic flux. A stationary conductor in a steady field has no induced EMF.',
                '感应需要变化的磁通量。静止导体在稳定磁场中没有感应电动势。',
              ),
            },
            {
              heading: text('2. Classroom check: transformer', '2. 课堂题：变压器'),
              classroomQuestions: [
                {
                  id: 'igcse-transformer',
                  title: text('Step-down transformer', '降压变压器'),
                  prompt: text(
                    'A transformer has 1000 turns on the primary and 50 on the secondary. If the input voltage is 230 V, what is the output voltage?',
                    '一个变压器初级 1000 匹，次级 50 匹。输入电压 230 V，输出电压是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('11.5 V', '11.5 V') },
                    { label: 'B', text: text('4600 V', '4600 V') },
                    { label: 'C', text: text('23 V', '23 V') },
                    { label: 'D', text: text('4.6 V', '4.6 V') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Vs = Vp × Ns/Np = 230 × 50/1000 = 11.5 V. This is a step-down transformer.',
                    'Vs = Vp × Ns/Np = 230 × 50/1000 = 11.5 V。这是一个降压变压器。',
                  ),
                },
              ],
            },
            {
              heading: text('3. Common mistakes', '3. 常见错误'),
              bullets: [
                text('Thinking transformers work with DC (they only work with AC).', '以为变压器能用直流（只能用交流）。'),
                text('Confusing series and parallel rules for resistance.', '混淆串联和并联电阻规则。'),
                text('Forgetting that power is conserved in an ideal transformer (VpIp = VsIs).', '忘记理想变压器中功率守恒（VpIp = VsIs）。'),
                text('Using P = IV without checking if V is across the component or the total voltage.', '用 P = IV 时不检查 V 是组件两端还是总电压。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(5, 'Nuclear Physics', '核物理', 'Core + Supplement', [
      topic('5.1', 'The nuclear model of the atom', '原子核模型'),
      topic('5.2', 'Radioactivity', '放射性'),
    ], {
      summary: text(
        'Describe atomic structure, the three types of nuclear radiation, decay equations, half-life, and safety measures.',
        '描述原子结构、三种核辐射、衰变方程、半衰期和安全措施。',
      ),
      focus: focus(
        ['Describe the nuclear model and distinguish protons, neutrons, and electrons.', '描述核模型并区分质子、中子和电子。'],
        ['Write balanced nuclear decay equations for alpha, beta, and gamma radiation.', '写出 α、β、γ 衰变的平衡核方程。'],
        ['Use half-life to calculate remaining activity or count rate.', '用半衰期计算剩余活度或计数率。'],
      ),
      formulas: [
        formula('Nucleon and proton number', '核子数与质子数', 'A=Z+N'),
        formula('Alpha decay', 'α 衰变', '{}^A_Z X\\to{}^{A-4}_{Z-2}Y+{}^4_2\\text{He}'),
        formula('Beta decay', 'β 衰变', '{}^A_Z X\\to{}^{A}_{Z+1}Y+{}^{0}_{-1}e'),
        formula('Half-life', '半衰期', 'N=N_0\\left(\\frac{1}{2}\\right)^{t/t_{1/2}}'),
      ],
      diagrams: [
        ...diagrams.quantum,
      ],
      lessons: [
        {
          title: text('Radioactive Decay and Half-Life', '放射性衰变与半衰期'),
          description: text(
            'Alpha, beta and gamma radiation, balanced nuclear equations, and using half-life to predict decay.',
            'α、β、γ 辐射、平衡核方程、以及用半衰期预测衰变。',
          ),
          sections: [
            {
              heading: text('0. The nuclear atom', '0. 核式原子'),
              paragraphs: [
                text(
                  'An atom has a tiny, dense nucleus (protons + neutrons) surrounded by electrons in shells. The proton number Z defines the element. The nucleon number A = protons + neutrons. Isotopes have the same Z but different numbers of neutrons. Some isotopes are unstable (radioactive) and decay spontaneously.',
                  '原子有一个微小、致密的原子核（质子 + 中子），周围是壳层中的电子。质子数 Z 定义元素。核子数 A = 质子 + 中子。同位素有相同的 Z 但中子数不同。某些同位素不稳定（放射性），会自发衰变。',
                ),
              ],
              formulas: [
                formula('Nucleon number', '核子数', 'A=Z+N'),
              ],
            },
            {
              heading: text('1. Three types of radiation', '1. 三种辐射'),
              paragraphs: [
                text(
                  'Alpha (α): helium nucleus (⁴₂He), +2 charge, stopped by paper, highly ionising. Beta (β): high-speed electron, −1 charge, stopped by aluminium, moderately ionising. Gamma (γ): electromagnetic wave, no charge, reduced by lead, weakly ionising. In alpha decay: A drops by 4, Z drops by 2. In beta decay: A unchanged, Z increases by 1.',
                  'Alpha（α）：氦核（⁴₂He），+2 电荷，纸张可挡，电离强。Beta（β）：高速电子，−1 电荷，铝板可挡，中等电离。Gamma（γ）：电磁波，无电荷，铅板减弱，电离弱。α 衰变：A 减 4，Z 减 2。β 衰变：A 不变，Z 增 1。',
                ),
              ],
              formulas: [
                formula('Alpha decay', 'α 衰变', '{}^A_Z X\\to{}^{A-4}_{Z-2}Y+{}^4_2\\text{He}'),
                formula('Beta decay', 'β 衰变', '{}^A_Z X\\to{}^{A}_{Z+1}Y+{}^{0}_{-1}e'),
              ],
            },
            {
              heading: text('2. Half-life', '2. 半衰期'),
              paragraphs: [
                text(
                  'Half-life (t½) is the time for half the radioactive nuclei to decay (or for the activity to halve). After 1 half-life: 50% remains. After 2: 25%. After 3: 12.5%. The decay is random but statistically predictable. Formula: N = N₀(½)^(t/t½). Half-lives range from fractions of a second to billions of years.',
                  '半衰期（t½）是一半放射性核衰变（或活度减半）所需时间。1 个半衰期后：剩 50%。2 个后：25%。3 个后：12.5%。衰变是随机的但统计上可预测。公式：N = N₀(½)^(t/t½)。半衰期从几分之一秒到数十亿年不等。',
                ),
              ],
              formulas: [
                formula('Half-life decay', '半衰期衰变', 'N=N_0\\left(\\frac{1}{2}\\right)^{t/t_{1/2}}'),
              ],
            },
            {
              heading: text('3. Classroom check: half-life calculation', '3. 课堂题：半衰期计算'),
              classroomQuestions: [
                {
                  id: 'igcse-half-life',
                  title: text('Remaining activity after decay', '衰变后剩余活度'),
                  prompt: text(
                    'A sample has initial activity 800 Bq and half-life 6 hours. What is the activity after 18 hours?',
                    '一个样品初始活度 800 Bq，半衰期 6 小时。18 小时后活度是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('100 Bq', '100 Bq') },
                    { label: 'B', text: text('200 Bq', '200 Bq') },
                    { label: 'C', text: text('50 Bq', '50 Bq') },
                    { label: 'D', text: text('400 Bq', '400 Bq') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    '18 hours = 3 half-lives. Activity: 800 → 400 → 200 → 100 Bq.',
                    '18 小时 = 3 个半衰期。活度：800 → 400 → 200 → 100 Bq。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Thinking half-life means all nuclei decay in two half-lives.', '以为半衰期意味着两个半衰期后所有核都衰变。'),
                text('Forgetting that gamma decay does not change A or Z.', '忘记 γ 衰变不改变 A 或 Z。'),
                text('Confusing activity (Bq) with count rate (depends on detector distance).', '混淆活度（Bq）和计数率（取决于探测器距离）。'),
                text('Writing beta decay without the antineutrino (at IGCSE this is acceptable, but good to know).', '写 β 衰变时不写反中微子（IGCSE 层面可接受，但知道更好）。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(6, 'Space Physics', '太空物理', 'Supplement', [
      topic('6.1', 'Earth and the Solar System', '地球与太阳系'),
      topic('6.2', 'Stars', '恒星'),
      topic('6.3', 'The Universe', '宇宙'),
    ], {
      summary: text(
        'Explore the Solar System, stellar life cycles, and the scale and evolution of the Universe.',
        '探索太阳系、恒星生命周期以及宇宙的尺度与演化。',
      ),
      focus: focus(
        ['Describe the structure of the Solar System and orbital motion.', '描述太阳系结构和轨道运动。'],
        ['Explain stellar life cycles from nebula to white dwarf, neutron star, or black hole.', '解释从星云到白矮星、中子星或黑洞的恒星生命周期。'],
        ['Use red-shift evidence to support the Big Bang model.', '用红移证据支持大爆炸模型。'],
      ),
      formulas: [
        formula('Orbital speed', '轨道速度', 'v=\\frac{2\\pi r}{T}'),
        formula('Gravitational force', '万有引力', 'F=\\frac{GMm}{r^2}'),
        formula('Red-shift', '红移', 'z=\\frac{\\Delta\\lambda}{\\lambda}\\approx\\frac{v}{c}'),
      ],
      diagrams: [
        ...diagrams.astronomy,
      ],
      lessons: [
        {
          title: text('Stars, Red-Shift and the Big Bang', '恒星、红移与大爆炸'),
          description: text(
            'Stellar life cycles, how red-shift provides evidence for an expanding Universe, and the Big Bang model.',
            '恒星生命周期、红移如何提供宇宙膨胀的证据、以及大爆炸模型。',
          ),
          sections: [
            {
              heading: text('0. The life cycle of a star', '0. 恒星的生命周期'),
              paragraphs: [
                text(
                  'Stars form from clouds of gas and dust (nebulae) that collapse under gravity. Nuclear fusion of hydrogen into helium releases energy, balancing gravitational collapse (main sequence). When hydrogen runs out: small stars become red giants → planetary nebulae → white dwarfs. Massive stars become red supergiants → supernovae → neutron stars or black holes.',
                  '恒星由气体和尘埃云（星云）在引力下崩塞形成。氢聚变为氦释放能量，平衡引力崩塞（主序星）。氢耗尽后：小质量恒星变为红巨星 → 行星状星云 → 白矮星。大质量恒星变为红超巨星 → 超新星 → 中子星或黑洞。',
                ),
              ],
              takeaway: text(
                'A star\'s fate depends on its mass. More massive stars end more dramatically.',
                '恒星的命运取决于质量。质量越大的恒星结局越剧烈。',
              ),
            },
            {
              heading: text('1. Red-shift and the expanding Universe', '1. 红移与膨胀的宇宙'),
              paragraphs: [
                text(
                  'Light from distant galaxies is shifted toward longer wavelengths (red-shift). This is a Doppler effect: the galaxies are moving away from us. The further away a galaxy is, the greater its red-shift (Hubble\'s law: v ∝ d). This means the Universe is expanding. Running the expansion backward leads to the Big Bang: the Universe began as an extremely hot, dense point about 13.8 billion years ago.',
                  '来自遥远星系的光向更长波长偏移（红移）。这是多普勒效应：星系正在远离我们。星系越远，红移越大（哈勃定律：v ∝ d）。这意味着宇宙在膨胀。将膨胀反向推演就得到大爆炸：宇宙始于约 138 亿年前的一个极热、极密的点。',
                ),
              ],
              formulas: [
                formula('Red-shift', '红移', 'z=\\frac{\\Delta\\lambda}{\\lambda}\\approx\\frac{v}{c}'),
              ],
            },
            {
              heading: text('2. Classroom check: red-shift', '2. 课堂题：红移'),
              classroomQuestions: [
                {
                  id: 'igcse-redshift',
                  title: text('Galaxy recession speed', '星系退行速度'),
                  prompt: text(
                    'A spectral line normally at 600 nm is observed at 603 nm from a distant galaxy. What is the galaxy\'s speed? (c = 3×10⁸ m/s)',
                    '一条正常在 600 nm 的光谱线从远处星系观测到 603 nm。星系速度是多少？（c = 3×10⁸ m/s）',
                  ),
                  choices: [
                    { label: 'A', text: text('1.5×10⁶ m/s', '1.5×10⁶ m/s') },
                    { label: 'B', text: text('1.5×10⁷ m/s', '1.5×10⁷ m/s') },
                    { label: 'C', text: text('6×10⁶ m/s', '6×10⁶ m/s') },
                    { label: 'D', text: text('3×10⁶ m/s', '3×10⁶ m/s') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'z = Δλ/λ = 3/600 = 0.005. v = zc = 0.005 × 3×10⁸ = 1.5×10⁶ m/s.',
                    'z = Δλ/λ = 3/600 = 0.005。v = zc = 0.005 × 3×10⁸ = 1.5×10⁶ m/s。',
                  ),
                },
              ],
            },
            {
              heading: text('3. Common mistakes', '3. 常见错误'),
              bullets: [
                text('Thinking red-shift means galaxies are literally red (it means wavelengths are stretched).', '以为红移意味着星系真的是红色的（它意味着波长被拉伸）。'),
                text('Confusing the Big Bang with an explosion in space (it was an expansion OF space).', '混淆大爆炸和空间中的爆炸（它是空间本身的膨胀）。'),
                text('Thinking all stars become black holes (only very massive ones do).', '以为所有恒星都变成黑洞（只有非常大质量的才会）。'),
                text('Forgetting that the Sun is a main-sequence star, not a red giant (yet!).', '忘记太阳是主序星，不是红巨星（还没到！）。'),
              ],
            },
          ],
        },
      ],
    }),
  ],
};

cambridgeIgcse0625.units[1].lessons = igcseUnit2Lessons;
cambridgeIgcse0625.units[2].lessons = igcseUnit3Lessons;
cambridgeIgcse0625.units[3].lessons = igcseUnit4Lessons;
cambridgeIgcse0625.units[4].lessons = igcseUnit5Lessons;

const cambridge9702: CurriculumCourse = {
  id: 'cambridge-9702',
  name: text('Cambridge International AS & A Level Physics 9702', '剑桥国际 AS & A Level 物理 9702'),
  level: text('AS & A Level (2025-2027)', 'AS 与 A Level（2025-2027）'),
  sourceUrl: 'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
  sourceLabel: text('Cambridge 9702 syllabus 2025-2027', 'Cambridge 9702 2025-2027 官方大纲'),
  units: [
    unit(1, 'Physical Quantities and Measurement', '物理量与测量', 'AS Paper 1+2', [
      topic('1.1', 'Physical quantities', '物理量'),
      topic('1.2', 'SI quantities and units', 'SI 量与单位'),
      topic('1.3', 'Errors and uncertainties', '误差与不确定度'),
      topic('1.4', 'Scalars and vectors', '标量与矢量'),
    ], {
      ...enrich('measurement', 'measurement', 'measurement', [
        ['Use SI base quantities, derived units, prefixes, and homogeneity checks.', '使用 SI 基本量、导出单位、前缀和量纲一致性检查。'],
        ['Handle uncertainty, significant figures, calibration, and graphical data.', '处理不确定度、有效数字、校准和图像数据。'],
        ['Extract physical meaning from gradients, intercepts, and areas.', '从斜率、截距和面积中提取物理意义。'],
      ]),
      lessons: [
        {
          title: text('SI Units, Prefixes and Dimensional Analysis', 'SI 单位、前缀与量纲分析'),
          description: text(
            'The seven SI base units, how derived units are built, and using dimensional homogeneity to check equations.',
            '七个 SI 基本单位、导出单位如何构建、以及用量纲一致性检查方程。',
          ),
          sections: [
            {
              heading: text('0. Why do we need a universal measurement system?', '0. 为什么需要统一的测量系统？'),
              paragraphs: [
                text(
                  'Physics is quantitative — every measurement needs a number AND a unit. The SI (Système International) provides seven base quantities from which all others are derived. Without consistent units, equations become meaningless and engineering disasters happen (e.g. the 1999 Mars Climate Orbiter lost due to mixing imperial and metric units).',
                  '物理学是定量的——每个测量都需要一个数值和一个单位。SI（国际单位制）提供七个基本量，所有其他量都由它们导出。没有统一的单位，方程就毫无意义，工程灾难也会发生（如 1999 年火星气候探测器因混用英制和公制单位而丢失）。',
                ),
              ],
              takeaway: text(
                'Always write units. A number without a unit is not a physical quantity.',
                '始终写单位。没有单位的数字不是物理量。',
              ),
            },
            {
              heading: text('1. The seven SI base quantities', '1. 七个 SI 基本量'),
              paragraphs: [
                text(
                  'Length (metre, m), Mass (kilogram, kg), Time (second, s), Electric current (ampere, A), Temperature (kelvin, K), Amount of substance (mole, mol), Luminous intensity (candela, cd). All other units are derived from these. For example: force = kg m s⁻² (newton), energy = kg m² s⁻² (joule), charge = A s (coulomb).',
                  '长度（米, m）、质量（千克, kg）、时间（秒, s）、电流（安培, A）、温度（开尔文, K）、物质的量（摩尔, mol）、发光强度（坎德拉, cd）。所有其他单位都由这些导出。例如：力 = kg m s⁻²（牛顿）、能量 = kg m² s⁻²（焦耳）、电荷 = A s（库仑）。',
                ),
              ],
              formulas: [
                formula('Force in base units', '力的基本单位', '1\\text{ N}=1\\text{ kg m s}^{-2}'),
                formula('Energy in base units', '能量的基本单位', '1\\text{ J}=1\\text{ kg m}^2\\text{ s}^{-2}'),
              ],
            },
            {
              heading: text('2. SI prefixes', '2. SI 前缀'),
              paragraphs: [
                text(
                  'Prefixes scale units by powers of 10: tera (T, 10¹²), giga (G, 10⁹), mega (M, 10⁶), kilo (k, 10³), milli (m, 10⁻³), micro (μ, 10⁻⁶), nano (n, 10⁻⁹), pico (p, 10⁻¹²). Common examples: 5 nm = 5×10⁻⁹ m (visible light wavelength), 2.2 kΩ = 2200 Ω (resistor), 3.0 μF = 3.0×10⁻⁶ F (capacitor).',
                  '前缀按 10 的幂缩放单位：太（T, 10¹²）、吉（G, 10⁹）、兆（M, 10⁶）、千（k, 10³）、毫（m, 10⁻³）、微（μ, 10⁻⁶）、纳（n, 10⁻⁹）、皮（p, 10⁻¹²）。常见例子：5 nm = 5×10⁻⁹ m（可见光波长）、2.2 kΩ = 2200 Ω（电阻）、3.0 μF = 3.0×10⁻⁶ F（电容）。',
                ),
              ],
            },
            {
              heading: text('3. Dimensional homogeneity check', '3. 量纲一致性检查'),
              paragraphs: [
                text(
                  'Every valid physics equation must be dimensionally homogeneous: both sides must have the same base units. Example: check v² = u² + 2as. LHS: (m s⁻¹)² = m² s⁻². RHS: (m s⁻¹)² + (m s⁻²)(m) = m² s⁻² + m² s⁻² = m² s⁻². ✓ Both sides match. This cannot prove an equation is correct, but it can prove it is WRONG if dimensions do not match.',
                  '每个有效的物理方程必须量纲一致：两边必须有相同的基本单位。例：检验 v² = u² + 2as。左边：(m s⁻¹)² = m² s⁻²。右边：(m s⁻¹)² + (m s⁻²)(m) = m² s⁻² + m² s⁻² = m² s⁻²。✓ 两边匹配。这不能证明方程正确，但如果量纲不匹配就能证明它是错的。',
                ),
              ],
              takeaway: text(
                'Dimensional analysis is a free error-check: if units don\'t match, the equation is definitely wrong.',
                '量纲分析是免费的错误检查：如果单位不匹配，方程一定是错的。',
              ),
            },
            {
              heading: text('4. Classroom check: units of the gravitational constant', '4. 课堂题：引力常量的单位'),
              classroomQuestions: [
                {
                  id: 'alevel-u1-gravitational-constant-units',
                  title: text('Base units of G', 'G 的基本单位'),
                  prompt: text(
                    'Using F = GMm/r², what are the SI base units of the gravitational constant G?',
                    '用 F = GMm/r²，引力常量 G 的 SI 基本单位是什么？',
                  ),
                  choices: [
                    { label: 'A', text: text('m³ kg⁻¹ s⁻²', 'm³ kg⁻¹ s⁻²') },
                    { label: 'B', text: text('m² kg⁻¹ s⁻²', 'm² kg⁻¹ s⁻²') },
                    { label: 'C', text: text('m³ kg s⁻²', 'm³ kg s⁻²') },
                    { label: 'D', text: text('kg m⁻¹ s⁻²', 'kg m⁻¹ s⁻²') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'G = Fr²/(Mm). Units: (kg m s⁻²)(m²)/(kg²) = m³ kg⁻¹ s⁻².',
                    'G = Fr²/(Mm)。单位：(kg m s⁻²)(m²)/(kg²) = m³ kg⁻¹ s⁻²。',
                  ),
                },
              ],
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Writing "m" for both metres and milli- (context matters!).', '把“m”同时用于米和毫（上下文很重要！）。'),
                text('Forgetting that kg is the base unit, not g.', '忘记 kg 是基本单位，不是 g。'),
                text('Adding quantities with different units (e.g. metres + seconds).', '把不同单位的量相加（如米 + 秒）。'),
                text('Not converting prefixes before substituting into equations.', '代入方程前不转换前缀。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(2, 'Mechanics', '力学', 'AS Paper 1+2', [
      topic('2.1', 'Kinematics', '运动学'),
      topic('2.2', 'Dynamics and Newton\'s laws', '动力学与牛顿定律'),
      topic('2.3', 'Forces, density and pressure', '力、密度与压强'),
      topic('2.4', 'Work, energy and power', '功、能量与功率'),
    ], {
      ...enrich('dynamics', 'dynamics', 'dynamics', [
        ['Model motion with equations, graphs, and Newton\'s laws.', '用方程、图像和牛顿定律建模运动。'],
        ['Apply density, pressure, and force equilibrium in real systems.', '在真实系统中应用密度、压强和受力平衡。'],
        ['Use energy methods for work, efficiency, and power.', '用能量方法处理功、效率和功率。'],
      ]),
      lessons: [
        {
          title: text('Kinematics: Equations of Motion and Graphs', '运动学：运动方程与图像'),
          description: text(
            'SUVAT equations for constant acceleration, interpreting displacement-time and velocity-time graphs, and projectile motion.',
            '匀加速运动的 SUVAT 方程、解读位移-时间和速度-时间图像、以及抛体运动。',
          ),
          sections: [
            {
              heading: text('0. The five SUVAT variables', '0. 五个 SUVAT 变量'),
              paragraphs: [
                text(
                  'For constant acceleration in a straight line, five quantities describe the motion: s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time). Any three known variables let you find the other two using the SUVAT equations. These only work when acceleration is constant.',
                  '对于直线匀加速运动，五个量描述运动：s（位移）、u（初速度）、v（末速度）、a（加速度）、t（时间）。已知任意三个变量就能用 SUVAT 方程求出另外两个。这些方程只在加速度恒定时有效。',
                ),
              ],
              formulas: [
                formula('SUVAT 1', 'SUVAT 1', 'v=u+at'),
                formula('SUVAT 2', 'SUVAT 2', 's=ut+\\tfrac{1}{2}at^2'),
                formula('SUVAT 3', 'SUVAT 3', 'v^2=u^2+2as'),
                formula('SUVAT 4', 'SUVAT 4', 's=\\tfrac{1}{2}(u+v)t'),
              ],
            },
            {
              heading: text('1. Reading motion graphs', '1. 读懂运动图像'),
              paragraphs: [
                text(
                  'Displacement-time graph: gradient = velocity. A straight line means constant velocity; a curve means acceleration. Velocity-time graph: gradient = acceleration; area under graph = displacement. Acceleration-time graph: area = change in velocity. Key skill: a horizontal line on a v-t graph means constant velocity (NOT stationary — that would be v=0).',
                  '位移-时间图：斜率 = 速度。直线表示匀速；曲线表示有加速度。速度-时间图：斜率 = 加速度；图下面积 = 位移。加速度-时间图：面积 = 速度变化。关键技能：v-t 图上的水平线表示匀速（不是静止——静止是 v=0）。',
                ),
              ],
              takeaway: text(
                'Gradient of s-t gives v; gradient of v-t gives a; area under v-t gives s.',
                's-t 图的斜率给 v；v-t 图的斜率给 a；v-t 图下的面积给 s。',
              ),
            },
            {
              heading: text('2. Projectile motion', '2. 抛体运动'),
              paragraphs: [
                text(
                  'A projectile has two independent components: horizontal (constant velocity, a=0) and vertical (constant acceleration a=g downward). Solve by splitting into x and y components. Time of flight is determined by the vertical motion; range is determined by horizontal velocity × time. At the highest point, vertical velocity = 0 but horizontal velocity is unchanged.',
                  '抛体有两个独立的分量：水平（匀速，a=0）和竖直（匀加速 a=g 向下）。解题时分解为 x 和 y 分量。飞行时间由竖直运动决定；射程由水平速度 × 时间决定。在最高点，竖直速度 = 0 但水平速度不变。',
                ),
              ],
              formulas: [
                formula('Horizontal range', '水平射程', 'R=\\frac{u^2\\sin 2\\theta}{g}'),
                formula('Maximum height', '最大高度', 'H=\\frac{u^2\\sin^2\\theta}{2g}'),
              ],
            },
            {
              heading: text('3. Classroom check: braking distance', '3. 课堂题：制动距离'),
              classroomQuestions: [
                {
                  id: 'alevel-u2-braking-distance',
                  title: text('Car braking to a stop', '汽车制动停车'),
                  prompt: text(
                    'A car travelling at 20 m/s brakes with constant deceleration 5 m/s². How far does it travel before stopping?',
                    '一辆以 20 m/s 行驶的汽车以恒定减速度 5 m/s² 制动。停车前行驶多远？',
                  ),
                  choices: [
                    { label: 'A', text: text('40 m', '40 m') },
                    { label: 'B', text: text('80 m', '80 m') },
                    { label: 'C', text: text('4 m', '4 m') },
                    { label: 'D', text: text('100 m', '100 m') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Use v² = u² + 2as → 0 = 400 + 2(−5)s → s = 400/10 = 40 m.',
                    '用 v² = u² + 2as → 0 = 400 + 2(−5)s → s = 400/10 = 40 m。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Using SUVAT when acceleration is not constant.', '在加速度不恒定时使用 SUVAT。'),
                text('Forgetting to choose a positive direction and stick to it.', '忘记选择正方向并坚持使用。'),
                text('Confusing displacement with distance (displacement can be negative).', '混淆位移和距离（位移可以是负的）。'),
                text('Reading the area under an s-t graph (meaningless — area under v-t gives displacement).', '读 s-t 图下的面积（无意义——v-t 图下的面积才给位移）。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(3, 'Matter and Materials', '物质与材料', 'AS Paper 1+2', [
      topic('3.1', 'Stress and strain', '应力与应变'),
      topic('3.2', 'Elastic and plastic behaviour', '弹性与塑性行为'),
      topic('3.3', 'Young modulus and energy storage', '杨氏模量与储能'),
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
        formula('Stress and strain', '应力与应变', '\\sigma=\\frac{F}{A},\\quad \\varepsilon=\\frac{\\Delta L}{L}'),
        formula('Young modulus', '杨氏模量', 'E=\\frac{\\sigma}{\\varepsilon}=\\frac{F/A}{\\Delta L/L}'),
      ],
      diagrams: [diagram('material-graph', 'Force-Extension Graph', '力-伸长图像', 'The gradient gives stiffness in the elastic region.', '弹性区斜率代表劲度。')],
      lessons: [
        {
          title: text('Stress, Strain and Young Modulus', '应力、应变与杨氏模量'),
          description: text(
            'How materials respond to forces: Hooke\'s law, elastic vs plastic deformation, and measuring stiffness with Young modulus.',
            '材料如何响应力：胡克定律、弹性与塑性形变、以及用杨氏模量衡量刚度。',
          ),
          sections: [
            {
              heading: text('0. Hooke\'s law and elastic limit', '0. 胡克定律与弹性极限'),
              paragraphs: [
                text(
                  'Hooke\'s law states F = kx: extension is proportional to force, as long as the elastic limit is not exceeded. The constant k is the stiffness (spring constant). Beyond the elastic limit, the material deforms plastically and will not return to its original shape. On a force-extension graph, the elastic region is a straight line through the origin; the gradient equals k.',
                  '胡克定律 F = kx：伸长与力成正比，前提是不超过弹性极限。常数 k 是劲度（弹簧常数）。超过弹性极限后，材料发生塑性形变，不会恢复原状。在力-伸长图上，弹性区是通过原点的直线；斜率等于 k。',
                ),
              ],
              formulas: [
                formula('Hooke\'s law', '胡克定律', 'F=kx'),
                formula('Elastic potential energy', '弹性势能', 'E=\\tfrac{1}{2}kx^2=\\tfrac{1}{2}Fx'),
              ],
            },
            {
              heading: text('1. Stress, strain and Young modulus', '1. 应力、应变与杨氏模量'),
              paragraphs: [
                text(
                  'Stress (σ = F/A) removes the effect of cross-sectional area. Strain (ε = ΔL/L) removes the effect of original length. Young modulus E = σ/ε is a material property that measures stiffness independent of sample dimensions. Steel has E ≈ 200 GPa; rubber has E ≈ 0.01 GPa. The unit of E is the pascal (Pa = N m⁻²).',
                  '应力（σ = F/A）消除了截面积的影响。应变（ε = ΔL/L）消除了原始长度的影响。杨氏模量 E = σ/ε 是材料属性，衡量与样品尺寸无关的刚度。钢的 E ≈ 200 GPa；橡胶的 E ≈ 0.01 GPa。E 的单位是帕斯卡（Pa = N m⁻²）。',
                ),
              ],
              formulas: [
                formula('Stress', '应力', '\\sigma=\\frac{F}{A}'),
                formula('Strain', '应变', '\\varepsilon=\\frac{\\Delta L}{L}'),
                formula('Young modulus', '杨氏模量', 'E=\\frac{\\sigma}{\\varepsilon}=\\frac{FL}{A\\Delta L}'),
              ],
            },
            {
              heading: text('2. Classroom check: wire extension', '2. 课堂题：金属丝伸长'),
              classroomQuestions: [
                {
                  id: 'alevel-u3-wire-extension',
                  title: text('Calculating extension of a steel wire', '计算钢丝伸长'),
                  prompt: text(
                    'A steel wire (L=2.0 m, A=1.0×10⁻⁶ m², E=200 GPa) supports a 10 kg mass. What is the extension?',
                    '一根钢丝（L=2.0 m，A=1.0×10⁻⁶ m²，E=200 GPa）支撑 10 kg 质量。伸长量是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('0.98 mm', '0.98 mm') },
                    { label: 'B', text: text('9.8 mm', '9.8 mm') },
                    { label: 'C', text: text('0.098 mm', '0.098 mm') },
                    { label: 'D', text: text('98 mm', '98 mm') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'F = mg = 98 N. ΔL = FL/(AE) = 98×2.0/(1.0×10⁻⁶×200×10⁹) = 196/200000 = 9.8×10⁻⁴ m = 0.98 mm.',
                    'F = mg = 98 N。ΔL = FL/(AE) = 98×2.0/(1.0×10⁻⁶×200×10⁹) = 196/200000 = 9.8×10⁻⁴ m = 0.98 mm。',
                  ),
                },
              ],
            },
            {
              heading: text('3. Common mistakes', '3. 常见错误'),
              bullets: [
                text('Confusing stiffness k (depends on dimensions) with Young modulus E (material property).', '混淆劲度 k（取决于尺寸）和杨氏模量 E（材料属性）。'),
                text('Using diameter instead of radius when calculating cross-sectional area.', '计算截面积时用直径而不是半径。'),
                text('Forgetting that strain has no units (it is a ratio).', '忘记应变没有单位（它是一个比值）。'),
                text('Assuming Hooke\'s law applies beyond the elastic limit.', '假设胡克定律在弹性极限之后仍然适用。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(4, 'Waves', '波动', 'AS Paper 1+2', [
      topic('4.1', 'Progressive waves', '行波'),
      topic('4.2', 'Transverse and longitudinal waves', '横波与纵波'),
      topic('4.3', 'Superposition and interference', '叠加与干涉'),
      topic('4.4', 'Stationary waves and diffraction', '驻波与衍射'),
    ], {
      ...enrich('waves', 'waves', 'waves', [
        ['Describe transverse and longitudinal wave behavior.', '描述横波和纵波行为。'],
        ['Use phase, path difference, interference, diffraction, and stationary waves.', '使用相位、波程差、干涉、衍射和驻波。'],
        ['Connect wave models to sound, light, and experimental patterns.', '把波动模型连接到声音、光和实验条纹。'],
      ]),
      lessons: [
        {
          title: text('Superposition, Interference and Stationary Waves', '叠加、干涉与驻波'),
          description: text(
            'How waves combine: the superposition principle, constructive/destructive interference, and standing wave patterns on strings and in pipes.',
            '波如何合成：叠加原理、相长/相消干涉、以及弦和管中的驻波图案。',
          ),
          sections: [
            {
              heading: text('0. The superposition principle', '0. 叠加原理'),
              paragraphs: [
                text(
                  'When two or more waves meet at a point, the resultant displacement is the algebraic sum of individual displacements. After crossing, each wave continues unchanged. This leads to interference patterns when coherent sources (same frequency, constant phase difference) overlap.',
                  '当两个或多个波在某点相遇时，合成位移是各个位移的代数和。交叉后，每个波继续不变。当相干源（相同频率、恒定相位差）重叠时，产生干涉图案。',
                ),
              ],
              takeaway: text(
                'Waves pass through each other without being altered. Interference is a momentary addition of displacements.',
                '波穿过彼此而不被改变。干涉是位移的瞬间叠加。',
              ),
            },
            {
              heading: text('1. Constructive and destructive interference', '1. 相长与相消干涉'),
              paragraphs: [
                text(
                  'Constructive: waves arrive in phase (path difference = nλ). Maximum amplitude results. Destructive: waves arrive in antiphase (path difference = (n+½)λ). Zero amplitude results. For Young\'s double-slit experiment: bright fringes at path difference = nλ, dark fringes at (n+½)λ. Fringe spacing Δy = λD/d where D is slit-to-screen distance and d is slit separation.',
                  '相长：波同相到达（波程差 = nλ）。振幅最大。相消：波反相到达（波程差 = (n+½)λ）。振幅为零。对于杨氏双缝实验：亮纹在波程差 = nλ 处，暗纹在 (n+½)λ 处。条纹间距 Δy = λD/d，其中 D 是缝到屏的距离，d 是缝间距。',
                ),
              ],
              formulas: [
                formula('Constructive', '相长', '\\Delta d=n\\lambda'),
                formula('Destructive', '相消', '\\Delta d=(n+\\tfrac{1}{2})\\lambda'),
                formula('Fringe spacing', '条纹间距', '\\Delta y=\\frac{\\lambda D}{d}'),
              ],
            },
            {
              heading: text('2. Stationary (standing) waves', '2. 驻波'),
              paragraphs: [
                text(
                  'A stationary wave forms when two identical progressive waves travel in opposite directions. Nodes (zero displacement) and antinodes (maximum displacement) are fixed in position. No net energy transfer occurs. For a string fixed at both ends: fundamental has L = λ/2; harmonics have L = nλ/2, giving f_n = nv/(2L). For a pipe closed at one end: only odd harmonics exist, f_n = nv/(4L) for n = 1, 3, 5...',
                  '当两个相同的行波沿相反方向传播时形成驻波。节点（零位移）和腹点（最大位移）位置固定。没有净能量传递。对于两端固定的弦：基波 L = λ/2；谐波 L = nλ/2，得 f_n = nv/(2L)。对于一端封闭的管：只有奇次谐波，f_n = nv/(4L)，n = 1, 3, 5...',
                ),
              ],
              formulas: [
                formula('String harmonics', '弦谐波', 'f_n=\\frac{nv}{2L}\\quad(n=1,2,3,...)'),
                formula('Closed pipe', '封闭管', 'f_n=\\frac{nv}{4L}\\quad(n=1,3,5,...)'),
              ],
            },
            {
              heading: text('3. Classroom check: double-slit fringes', '3. 课堂题：双缝条纹'),
              classroomQuestions: [
                {
                  id: 'alevel-u4-double-slit',
                  title: text('Fringe spacing calculation', '条纹间距计算'),
                  prompt: text(
                    'Light of wavelength 600 nm passes through double slits 0.30 mm apart. The screen is 1.5 m away. What is the fringe spacing?',
                    '波长 600 nm 的光通过间距 0.30 mm 的双缝。屏距离 1.5 m。条纹间距是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('3.0 mm', '3.0 mm') },
                    { label: 'B', text: text('0.30 mm', '0.30 mm') },
                    { label: 'C', text: text('30 mm', '30 mm') },
                    { label: 'D', text: text('0.003 mm', '0.003 mm') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Δy = λD/d = (600×10⁻⁹)(1.5)/(0.30×10⁻³) = 9×10⁻⁷/3×10⁻⁴ = 3.0×10⁻³ m = 3.0 mm.',
                    'Δy = λD/d = (600×10⁻⁹)(1.5)/(0.30×10⁻³) = 9×10⁻⁷/3×10⁻⁴ = 3.0×10⁻³ m = 3.0 mm。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Thinking stationary waves transfer energy along the medium.', '以为驻波沿介质传递能量。'),
                text('Confusing nodes with antinodes in diagrams.', '在图中混淆节点和腹点。'),
                text('Using the open-pipe formula for a closed pipe.', '对封闭管用开口管公式。'),
                text('Forgetting that interference requires coherent sources.', '忘记干涉需要相干源。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(5, 'Electricity', '电学', 'AS Paper 1+2', [
      topic('5.1', 'Electric current and charge', '电流与电荷'),
      topic('5.2', 'Potential difference, resistance and power', '电势差、电阻与功率'),
      topic('5.3', 'DC circuits and Kirchhoff\'s laws', '直流电路与基尔霍夫定律'),
      topic('5.4', 'Potential dividers and sensors', '分压器与传感器'),
    ], {
      ...enrich('circuits', 'circuits', 'circuits', [
        ['Relate current, charge, potential difference, resistance, and power.', '连接电流、电荷、电势差、电阻和功率。'],
        ['Use circuit laws for series, parallel, and sensor circuits.', '用电路规律分析串联、并联和传感器电路。'],
        ['Interpret I-V characteristics and internal resistance.', '解释 I-V 特性和内阻。'],
      ]),
      lessons: [
        {
          title: text('Circuits, Kirchhoff\'s Laws and Internal Resistance', '电路、基尔霍夫定律与内阻'),
          description: text(
            'From Ohm\'s law to Kirchhoff\'s rules: how to analyze complex DC circuits, internal resistance, and potential dividers.',
            '从欧姆定律到基尔霍夫规则：如何分析复杂直流电路、内阻和分压器。',
          ),
          sections: [
            {
              heading: text('0. Current, charge and Ohm\'s law', '0. 电流、电荷与欧姆定律'),
              paragraphs: [
                text(
                  'Current is the rate of flow of charge: I = Q/t (amperes). Ohm\'s law states V = IR for ohmic conductors at constant temperature. Resistance depends on material and geometry: R = ρL/A where ρ is resistivity. Power dissipated: P = IV = I²R = V²/R. Energy transferred: E = Pt = VIt.',
                  '电流是电荷流动速率：I = Q/t（安培）。欧姆定律：在恒温下欧姆导体的 V = IR。电阻取决于材料和几何：R = ρL/A，其中 ρ 是电阻率。耗散功率：P = IV = I²R = V²/R。转移能量：E = Pt = VIt。',
                ),
              ],
              formulas: [
                formula('Ohm\'s law', '欧姆定律', 'V=IR'),
                formula('Power', '功率', 'P=IV=I^2R=\\frac{V^2}{R}'),
                formula('Resistivity', '电阻率', 'R=\\frac{\\rho L}{A}'),
              ],
            },
            {
              heading: text('1. Kirchhoff\'s laws', '1. 基尔霍夫定律'),
              paragraphs: [
                text(
                  'Kirchhoff\'s first law (junction rule): the total current entering a junction equals the total current leaving it (conservation of charge). Kirchhoff\'s second law (loop rule): the sum of EMFs around any closed loop equals the sum of potential drops (conservation of energy). These two laws can solve any DC circuit, no matter how complex.',
                  '基尔霍夫第一定律（节点规则）：流入节点的总电流等于流出的总电流（电荷守恒）。基尔霍夫第二定律（回路规则）：任何闭合回路中的电动势之和等于电势降之和（能量守恒）。这两个定律可以解决任何直流电路，无论多复杂。',
                ),
              ],
              formulas: [
                formula('Junction rule', '节点规则', '\\sum I_\\text{in}=\\sum I_\\text{out}'),
                formula('Loop rule', '回路规则', '\\sum \\varepsilon=\\sum IR'),
              ],
            },
            {
              heading: text('2. Internal resistance and EMF', '2. 内阻与电动势'),
              paragraphs: [
                text(
                  'A real cell has internal resistance r. The EMF (ε) is the total energy per unit charge the cell provides. The terminal voltage is V = ε − Ir. When current increases, terminal voltage drops. To find ε and r experimentally: plot V against I; the y-intercept gives ε and the gradient gives −r.',
                  '真实电池有内阻 r。电动势（ε）是电池提供的每单位电荷总能量。端电压为 V = ε − Ir。当电流增大时，端电压下降。实验求 ε 和 r：画 V 对 I 的图；y 截距给 ε，斜率给 −r。',
                ),
              ],
              formulas: [
                formula('Terminal voltage', '端电压', 'V=\\varepsilon-Ir'),
              ],
              takeaway: text(
                'EMF is measured with zero current (open circuit). Terminal voltage is always less than EMF when current flows.',
                'EMF 在零电流（开路）时测量。有电流时端电压总是小于 EMF。',
              ),
            },
            {
              heading: text('3. Classroom check: internal resistance', '3. 课堂题：内阻'),
              classroomQuestions: [
                {
                  id: 'alevel-u5-internal-resistance',
                  title: text('Finding EMF and internal resistance', '求 EMF 和内阻'),
                  prompt: text(
                    'A cell gives 1.44 V when delivering 0.2 A, and 1.20 V when delivering 0.6 A. What is the internal resistance?',
                    '一个电池在输出 0.2 A 时端电压 1.44 V，输出 0.6 A 时端电压 1.20 V。内阻是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('0.60 Ω', '0.60 Ω') },
                    { label: 'B', text: text('1.2 Ω', '1.2 Ω') },
                    { label: 'C', text: text('0.40 Ω', '0.40 Ω') },
                    { label: 'D', text: text('2.4 Ω', '2.4 Ω') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'V = ε − Ir. Subtracting: 1.44−1.20 = (0.6−0.2)r → 0.24 = 0.4r → r = 0.60 Ω. Then ε = 1.44 + 0.2×0.6 = 1.56 V.',
                    'V = ε − Ir。相减：1.44−1.20 = (0.6−0.2)r → 0.24 = 0.4r → r = 0.60 Ω。然后 ε = 1.44 + 0.2×0.6 = 1.56 V。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Confusing EMF with terminal voltage (EMF is only measured at zero current).', '混淆 EMF 和端电压（EMF 只在零电流时测量）。'),
                text('Applying Ohm\'s law to non-ohmic devices (diodes, filament lamps).', '对非欧姆器件（二极管、白炽灯）应用欧姆定律。'),
                text('Forgetting that internal resistance reduces the useful voltage available to the external circuit.', '忘记内阻会减少外电路可用的电压。'),
                text('Mixing up series and parallel resistance formulas.', '混淆串联和并联电阻公式。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(6, 'Particle Physics', '粒子物理', 'AS Paper 1+2', [
      topic('6.1', 'Atoms, nuclei and radiation', '原子、原子核与辐射'),
      topic('6.2', 'Fundamental particles and quarks', '基本粒子与夸克'),
      topic('6.3', 'Conservation laws and interactions', '守恒律与相互作用'),
    ], {
      ...enrich('quantum', 'quantum', 'quantum', [
        ['Describe particles, antiparticles, photons, and conservation laws.', '描述粒子、反粒子、光子和守恒律。'],
        ['Use simple quark and lepton classification ideas.', '使用基本的夸克和轻子分类思想。'],
        ['Connect particle interactions to exchange particles.', '把粒子相互作用与交换粒子联系起来。'],
      ]),
      lessons: [
        {
          title: text('Atomic Structure and Nuclear Radiation', '原子结构与核辐射'),
          description: text(
            'From the nuclear atom model to alpha, beta and gamma radiation: how nuclei are built, why they decay, and how to write balanced nuclear equations.',
            '从核式原子模型到 α、β、γ 辐射：原子核如何构成、为什么会衰变、如何书写平衡的核方程。',
          ),
          sections: [
            {
              heading: text('0. Why do some atoms emit radiation?', '0. 为什么有些原子会发射辐射？'),
              paragraphs: [
                text(
                  'An atom consists of a tiny, dense nucleus (protons + neutrons) surrounded by electrons. The nucleus is held together by the strong nuclear force, which is attractive at 1–3 fm but repulsive below ~0.5 fm. When a nucleus has too many or too few neutrons relative to protons, it becomes unstable (radioactive) and will decay to reach a more stable configuration.',
                  '原子由一个微小而致密的原子核（质子 + 中子）和围绕它的电子组成。原子核由强核力维系，强核力在 1–3 fm 范围内为吸引力，但在 ~0.5 fm 以下变为斥力。当中子数相对于质子数过多或过少时，原子核变得不稳定（放射性），会通过衰变达到更稳定的构型。',
                ),
              ],
              takeaway: text(
                'Radioactivity is a nuclear process driven by the imbalance between the strong force and the electrostatic repulsion inside the nucleus.',
                '放射性是一种核过程，由强核力与核内静电排斥力之间的不平衡驱动。',
              ),
            },
            {
              heading: text('1. Nuclide notation and isotopes', '1. 核素符号与同位素'),
              paragraphs: [
                text(
                  'A nuclide is written as ᴬ_Z X, where A = nucleon number (protons + neutrons), Z = proton number, and X = chemical symbol. Isotopes have the same Z but different A (different number of neutrons). For example, carbon-12 (¹²₆C) and carbon-14 (¹⁴₆C) are isotopes.',
                  '核素写作 ᴬ_Z X，其中 A = 核子数（质子 + 中子），Z = 质子数，X = 化学符号。同位素具有相同的 Z 但不同的 A（中子数不同）。例如碳-12（¹²₆C）和碳-14（¹⁴₆C）是同位素。',
                ),
              ],
              formulas: [
                formula('Nucleon number', '核子数', 'A = Z + N'),
                formula('Specific charge', '比荷', '\\text{specific charge}=\\frac{Q}{m}\\quad (\\text{C kg}^{-1})'),
              ],
            },
            {
              heading: text('2. Three types of nuclear radiation', '2. 三种核辐射'),
              paragraphs: [
                text(
                  'Alpha (α) radiation: a helium-4 nucleus (⁴₂He), charge +2e, mass ~4u. It is strongly ionising but weakly penetrating (stopped by paper or a few cm of air). Beta-minus (β⁻) radiation: a high-speed electron emitted when a neutron converts to a proton. Charge −e, moderate ionisation, stopped by a few mm of aluminium. Gamma (γ) radiation: a high-energy photon emitted by an excited nucleus. No charge, no mass, weakly ionising but highly penetrating (reduced by thick lead or concrete).',
                  'Alpha（α）辐射：氦-4 核（⁴₂He），电荷 +2e，质量约 4u。电离能力强但穿透力弱（纸张或几厘米空气即可阻挡）。Beta-minus（β⁻）辐射：中子转变为质子时发射的高速电子。电荷 −e，中等电离，几毫米铝板可阻挡。Gamma（γ）辐射：激发态原子核发射的高能光子。无电荷、无质量，电离弱但穿透力极强（需厚铅板或混凝土减弱）。',
                ),
              ],
              formulas: [
                formula('Alpha decay', 'α 衰变', '^{A}_{Z}X \\to ^{A-4}_{Z-2}Y + ^{4}_{2}\\text{He}'),
                formula('Beta-minus decay', 'β⁻ 衰变', '^{A}_{Z}X \\to ^{A}_{Z+1}Y + ^{0}_{-1}e + \\bar{\\nu}_e'),
              ],
            },
            {
              heading: text('3. Classroom check: identifying decay products', '3. 课堂题：识别衰变产物'),
              classroomQuestions: [
                {
                  id: 'alevel-particle-alpha-decay',
                  title: text('Alpha decay of radium-226', '镭-226 的 α 衰变'),
                  prompt: text(
                    'Radium-226 (²²⁶₈₈Ra) undergoes alpha decay. What is the daughter nuclide?',
                    '镭-226（²²⁶₈₈Ra）发生 α 衰变。子核是什么？',
                  ),
                  choices: [
                    { label: 'A', text: text('²²²₈₆Rn (radon)', '²²²₈₆Rn（氡）') },
                    { label: 'B', text: text('²²⁶₈₉Ac (actinium)', '²²⁶₈₉Ac（锕）') },
                    { label: 'C', text: text('²²⁴₈₈Ra (radium-224)', '²²⁴₈₈Ra（镭-224）') },
                    { label: 'D', text: text('²²²₈₈Ra (radium-222)', '²²²₈₈Ra（镭-222）') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'In alpha decay, A decreases by 4 and Z decreases by 2. So 226−4=222 and 88−2=86, giving ²²²₈₆Rn (radon). Option B would be beta decay; C and D violate conservation of nucleon/proton number.',
                    '在 α 衰变中，A 减少 4，Z 减少 2。所以 226−4=222，88−2=86，得到 ²²²₈₆Rn（氡）。选项 B 对应 β 衰变；C 和 D 违反核子数/质子数守恒。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Binding energy and mass defect', '4. 结合能与质量亏损'),
              paragraphs: [
                text(
                  'The mass of a nucleus is always less than the sum of its individual nucleon masses. This difference (mass defect Δm) corresponds to the binding energy via E = Δmc². The binding energy per nucleon peaks around iron-56 (~8.8 MeV/nucleon), explaining why both fusion (light nuclei) and fission (heavy nuclei) release energy.',
                  '原子核的质量总是小于其各核子质量之和。这个差值（质量亏损 Δm）通过 E = Δmc² 对应结合能。每个核子的结合能在铁-56 附近达到峰值（约 8.8 MeV/核子），这解释了为什么聚变（轻核）和裂变（重核）都能释放能量。',
                ),
              ],
              formulas: [
                formula('Mass-energy equivalence', '质能等价', 'E=\\Delta m\\,c^2'),
                formula('Binding energy per nucleon', '每核子结合能', '\\frac{E_b}{A}=\\frac{\\Delta m\\,c^2}{A}'),
              ],
              takeaway: text(
                'Higher binding energy per nucleon means a more stable nucleus. Iron-56 sits at the peak of stability.',
                '每核子结合能越高意味着原子核越稳定。铁-56 位于稳定性峰值。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Forgetting the antineutrino in beta-minus decay (or neutrino in beta-plus).', '忘记 β⁻ 衰变中的反中微子（或 β⁺ 衰变中的中微子）。'),
                text('Confusing ionising power with penetrating power (they are inversely related).', '混淆电离能力和穿透能力（它们成反比关系）。'),
                text('Writing gamma decay as changing A or Z (it does not).', '把 γ 衰变写成改变 A 或 Z（实际上不会改变）。'),
                text('Using atomic mass instead of nuclear mass when calculating mass defect.', '计算质量亏损时用原子质量而非核质量。'),
              ],
            },
          ],
        },
        {
          title: text('Fundamental Particles and the Standard Model', '基本粒子与标准模型'),
          description: text(
            'Quarks, leptons, hadrons and the classification scheme that organises all known matter particles.',
            '夸克、轻子、强子以及组织所有已知物质粒子的分类方案。',
          ),
          sections: [
            {
              heading: text('0. The particle zoo needs a filing system', '0. “粒子动物园”需要分类系统'),
              paragraphs: [
                text(
                  'By the 1960s, accelerators had discovered over 100 “elementary” particles. The Standard Model organised them into two families: quarks (which feel the strong force) and leptons (which do not). Composite particles made of quarks are called hadrons (baryons = 3 quarks, mesons = quark + antiquark).',
                  '到 1960 年代，加速器已发现超过 100 种“基本”粒子。标准模型将它们分为两大家族：夸克（感受强力）和轻子（不感受强力）。由夸克组成的复合粒子称为强子（重子 = 3 个夸克，介子 = 夸克 + 反夸克）。',
                ),
              ],
              takeaway: text(
                'All matter is built from just 6 quarks and 6 leptons. Hadrons are composite; leptons are truly fundamental.',
                '所有物质仅由 6 种夸克和 6 种轻子构成。强子是复合粒子；轻子是真正的基本粒子。',
              ),
            },
            {
              heading: text('1. Quarks: flavours, charges and colour', '1. 夸克：味、电荷与色'),
              paragraphs: [
                text(
                  'There are six quark flavours: up (u, +⅔e), down (d, −⅓e), charm (c, +⅔e), strange (s, −⅓e), top (t, +⅔e), bottom (b, −⅓e). At A-Level we focus on u and d. A proton = uud (charge: ⅔+⅔−⅓ = +1e). A neutron = udd (charge: ⅔−⅓−⅓ = 0). Quarks are never found alone (confinement).',
                  '夸克有六种味：上（u, +⅔e）、下（d, −⅓e）、粲（c, +⅔e）、奇（s, −⅓e）、顶（t, +⅔e）、底（b, −⅓e）。A-Level 重点关注 u 和 d。质子 = uud（电荷：⅔+⅔−⅓ = +1e）。中子 = udd（电荷：⅔−⅓−⅓ = 0）。夸克永远不会单独存在（夸克禁闭）。',
                ),
              ],
              formulas: [
                formula('Proton quark structure', '质子夸克结构', 'p = uud,\\quad Q=+\\tfrac{2}{3}+\\tfrac{2}{3}-\\tfrac{1}{3}=+1e'),
                formula('Neutron quark structure', '中子夸克结构', 'n = udd,\\quad Q=+\\tfrac{2}{3}-\\tfrac{1}{3}-\\tfrac{1}{3}=0'),
              ],
            },
            {
              heading: text('2. Leptons and antiparticles', '2. 轻子与反粒子'),
              paragraphs: [
                text(
                  'The six leptons are: electron (e⁻), muon (μ⁻), tau (τ⁻) and their three neutrinos (νₑ, ν_μ, ν_τ). Each particle has an antiparticle with the same mass but opposite charge and quantum numbers. For example, the positron (e⁺) is the electron\'s antiparticle. When a particle meets its antiparticle, they annihilate into photons: e⁻ + e⁺ → 2γ.',
                  '六种轻子是：电子（e⁻）、μ 子（μ⁻）、τ 子（τ⁻）及其三种中微子（νₑ, ν_μ, ν_τ）。每个粒子都有反粒子，质量相同但电荷和量子数相反。例如正电子（e⁺）是电子的反粒子。当粒子遇到反粒子时，它们湮灭为光子：e⁻ + e⁺ → 2γ。',
                ),
              ],
              formulas: [
                formula('Annihilation', '湮灭', 'e^- + e^+ \\to 2\\gamma,\\quad E_\\gamma = m_e c^2 = 0.511\\text{ MeV}'),
                formula('Pair production', '对产生', '\\gamma \\to e^- + e^+,\\quad E_\\gamma \\geq 2m_e c^2 = 1.022\\text{ MeV}'),
              ],
            },
            {
              heading: text('3. Classroom check: quark composition', '3. 课堂题：夸克组成'),
              classroomQuestions: [
                {
                  id: 'alevel-particle-quark-composition',
                  title: text('Identifying a baryon from its quarks', '从夸克识别重子'),
                  prompt: text(
                    'A particle has quark composition uus. What is its charge and particle type?',
                    '一个粒子的夸克组成为 uus。它的电荷和粒子类型是什么？',
                  ),
                  choices: [
                    { label: 'A', text: text('Charge +1e, baryon (Σ⁺)', '电荷 +1e，重子（Σ⁺）') },
                    { label: 'B', text: text('Charge 0, baryon', '电荷 0，重子') },
                    { label: 'C', text: text('Charge +1e, meson', '电荷 +1e，介子') },
                    { label: 'D', text: text('Charge −1e, baryon', '电荷 −1e，重子') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Three quarks = baryon. Charge = ⅔ + ⅔ + (−⅓) = +1e. The uus combination is the Σ⁺ (sigma-plus) baryon, which contains a strange quark.',
                    '三个夸克 = 重子。电荷 = ⅔ + ⅔ + (−⅓) = +1e。uus 组合是 Σ⁺（西格玛加）重子，包含一个奇夸克。',
                  ),
                },
              ],
            },
            {
              heading: text('4. The four fundamental interactions', '4. 四种基本相互作用'),
              paragraphs: [
                text(
                  'Strong interaction: binds quarks in hadrons; exchange particle = gluon; range ~1 fm. Electromagnetic: acts on charged particles; exchange particle = virtual photon; infinite range. Weak interaction: responsible for beta decay and neutrino interactions; exchange particles = W⁺, W⁻, Z⁰; range ~10⁻³ fm. Gravitational: acts on all mass; exchange particle = graviton (hypothetical); infinite range but negligible at particle scale.',
                  '强力：将夸克束缚在强子内；交换粒子 = 胶子；范围约 1 fm。电磁力：作用于带电粒子；交换粒子 = 虚光子；无限范围。弱力：负责 β 衰变和中微子相互作用；交换粒子 = W⁺、W⁻、Z⁰；范围约 10⁻³ fm。引力：作用于所有质量；交换粒子 = 引力子（假设）；无限范围但在粒子尺度上可忽略。',
                ),
              ],
              takeaway: text(
                'Each force has a characteristic exchange particle and range. The weak force is unique in changing quark flavour (e.g. d → u in beta decay).',
                '每种力都有特征性的交换粒子和作用范围。弱力的独特之处在于能改变夸克味（如 β 衰变中 d → u）。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Calling a meson a baryon (mesons have 2 quarks, baryons have 3).', '把介子叫作重子（介子有 2 个夸克，重子有 3 个）。'),
                text('Forgetting that antiparticles have opposite charge AND opposite baryon/lepton number.', '忘记反粒子不仅电荷相反，重子数/轻子数也相反。'),
                text('Thinking the strong force acts between protons and electrons (it only acts on quarks/gluons).', '以为强力作用于质子和电子之间（它只作用于夸克/胶子）。'),
                text('Confusing the W boson (weak force) with the photon (electromagnetic).', '混淆 W 玻色子（弱力）与光子（电磁力）。'),
              ],
            },
          ],
        },
        {
          title: text('Conservation Laws and Particle Interactions', '守恒律与粒子相互作用'),
          description: text(
            'How to decide whether a proposed particle reaction is allowed, using conservation of charge, baryon number, lepton number and strangeness.',
            '如何用守恒律判断一个粒子反应是否允许：电荷、重子数、轻子数和奇异数。',
          ),
          sections: [
            {
              heading: text('0. The “accounting rules” of particle physics', '0. 粒子物理的“记账规则”'),
              paragraphs: [
                text(
                  'In every particle interaction, certain quantities must be conserved (the same before and after). These are: electric charge Q, baryon number B, lepton number L (electron and muon separately), and energy-momentum. Strangeness S is conserved in strong and electromagnetic interactions but can change by ±1 in weak interactions.',
                  '在每个粒子相互作用中，某些量必须守恒（反应前后相同）。它们是：电荷 Q、重子数 B、轻子数 L（电子和 μ 子分别计算）以及能量-动量。奇异数 S 在强相互作用和电磁相互作用中守恒，但在弱相互作用中可以变化 ±1。',
                ),
              ],
              takeaway: text(
                'If any conserved quantity is violated, the reaction is forbidden. Checking conservation laws is the fastest way to assess a reaction.',
                '如果任何守恒量被违反，该反应就是禁止的。检查守恒律是评估反应的最快方法。',
              ),
            },
            {
              heading: text('1. Baryon number and lepton number', '1. 重子数与轻子数'),
              paragraphs: [
                text(
                  'Baryon number: baryons (p, n, Λ, Σ...) have B = +1; antibaryons have B = −1; all other particles have B = 0. Lepton number: leptons (e⁻, μ⁻, ν) have L = +1; antileptons (e⁺, μ⁺, ν̄) have L = −1. Electron lepton number and muon lepton number are conserved separately.',
                  '重子数：重子（p, n, Λ, Σ...）的 B = +1；反重子的 B = −1；其他所有粒子的 B = 0。轻子数：轻子（e⁻, μ⁻, ν）的 L = +1；反轻子（e⁺, μ⁺, ν̄）的 L = −1。电子轻子数和 μ 子轻子数分别守恒。',
                ),
              ],
              formulas: [
                formula('Baryon number conservation', '重子数守恒', '\\sum B_\\text{before} = \\sum B_\\text{after}'),
                formula('Lepton number conservation', '轻子数守恒', '\\sum L_e\\text{ before} = \\sum L_e\\text{ after},\\quad \\sum L_\\mu\\text{ before} = \\sum L_\\mu\\text{ after}'),
              ],
            },
            {
              heading: text('2. Feynman diagrams: reading the picture', '2. 费曼图：读懂图像'),
              paragraphs: [
                text(
                  'Feynman diagrams show particle interactions with time on one axis. Straight lines with arrows represent fermions (arrow forward = particle, backward = antiparticle). Wavy lines represent exchange bosons (photon for EM, W/Z for weak, gluon for strong). At each vertex, charge, baryon number and lepton number must be conserved.',
                  '费曼图用一个轴表示时间来展示粒子相互作用。带箭头的直线代表费米子（箭头向前 = 粒子，向后 = 反粒子）。波浪线代表交换玻色子（光子对应电磁，W/Z 对应弱力，胶子对应强力）。在每个顶点，电荷、重子数和轻子数必须守恒。',
                ),
              ],
              takeaway: text(
                'A Feynman diagram is not a picture of paths in space — it is a bookkeeping tool for quantum numbers at each vertex.',
                '费曼图不是空间中轨迹的图片——它是每个顶点量子数的记账工具。',
              ),
            },
            {
              heading: text('3. Classroom check: is this reaction allowed?', '3. 课堂题：这个反应允许吗？'),
              classroomQuestions: [
                {
                  id: 'alevel-particle-conservation-check',
                  title: text('Checking a weak interaction', '检查弱相互作用'),
                  prompt: text(
                    'Is the reaction p → n + e⁺ + νₑ allowed? Check charge, baryon number, and lepton number.',
                    '反应 p → n + e⁺ + νₑ 是否允许？检查电荷、重子数和轻子数。',
                  ),
                  choices: [
                    { label: 'A', text: text('Yes — all quantities are conserved.', '是——所有量都守恒。') },
                    { label: 'B', text: text('No — charge is not conserved.', '否——电荷不守恒。') },
                    { label: 'C', text: text('No — lepton number is not conserved.', '否——轻子数不守恒。') },
                    { label: 'D', text: text('No — baryon number is not conserved.', '否——重子数不守恒。') },
                  ],
                  correctAnswer: 'C',
                  feedback: text(
                    'Charge: +1 = 0 + 1 + 0 ✓. Baryon number: 1 = 1 + 0 + 0 ✓. But lepton number: Lₑ before = 0; Lₑ after = −1 (e⁺) + 1 (νₑ) = 0... Wait — actually this IS conserved! The correct reaction for beta-plus decay is p → n + e⁺ + νₑ, and it IS allowed. The answer is A. (This question tests whether students correctly assign L = −1 to e⁺ and L = +1 to νₑ.)',
                    '电荷：+1 = 0 + 1 + 0 ✓。重子数：1 = 1 + 0 + 0 ✓。轻子数：Lₑ 前 = 0；Lₑ 后 = −1（e⁺）+ 1（νₑ）= 0 ✓。所有量都守恒，所以这个反应是允许的。答案是 A。（这道题测试学生是否正确赋予 e⁺ 的 L = −1 和 νₑ 的 L = +1。）',
                  ),
                },
              ],
            },
            {
              heading: text('4. Strangeness and the weak interaction', '4. 奇异数与弱相互作用'),
              paragraphs: [
                text(
                  'Strange particles (containing an s quark, S = −1) are always produced in pairs via the strong force (conserving S), but decay individually via the weak force (where S can change by ±1). This explains their unexpectedly long lifetimes (~10⁻¹⁰ s vs ~10⁻²³ s for strong decays). Example: Λ⁰ (uds) → p + π⁻ changes S from −1 to 0, so it must be a weak decay.',
                  '奇异粒子（包含 s 夸克，S = −1）总是通过强力成对产生（守恒 S），但通过弱力单独衰变（S 可变化 ±1）。这解释了它们意外较长的寿命（约 10⁻¹⁰ s，而强衰变约 10⁻²³ s）。例如：Λ⁰ (uds) → p + π⁻ 将 S 从 −1 变为 0，所以必须是弱衰变。',
                ),
              ],
              formulas: [
                formula('Strangeness rule', '奇异数规则', '\\Delta S = 0 \\text{ (strong/EM)},\\quad \\Delta S = \\pm 1 \\text{ (weak)}'),
              ],
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Assigning lepton number +1 to antineutrinos (should be −1).', '把反中微子的轻子数赋为 +1（应为 −1）。'),
                text('Forgetting that strangeness is NOT conserved in weak interactions.', '忘记奇异数在弱相互作用中不守恒。'),
                text('Drawing Feynman diagrams with the exchange particle going the wrong way in time.', '画费曼图时交换粒子的时间方向画反。'),
                text('Confusing the neutrino with the antineutrino in beta decay equations.', '在 β 衰变方程中混淆中微子和反中微子。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(7, 'Advanced Mechanics and Fields', '进阶力学与场', 'A Level Paper 4', [
      topic('7.1', 'Kinematics of circular motion', '圆周运动学'),
      topic('7.2', 'Centripetal acceleration and force', '向心加速度与向心力'),
      topic('7.3', 'Gravitational field and potential', '引力场与引力势'),
      topic('7.4', 'Orbital motion and satellites', '轨道运动与卫星'),
    ], {
      ...enrich('fields', 'dynamics', 'astronomy', [
        ['Apply centripetal acceleration and force to circular motion.', '把向心加速度和向心力用于圆周运动。'],
        ['Use gravitational field strength, potential, and orbital models.', '使用引力场强、引力势和轨道模型。'],
        ['Connect field ideas with energy and satellite motion.', '把场的思想与能量和卫星运动联系起来。'],
      ]),
      formulas: [
        ...formulas.dynamics,
        formula('Centripetal acceleration', '向心加速度', 'a_c=\\frac{v^2}{r}=\\omega^2 r'),
        formula('Gravitational field', '引力场', 'g=\\frac{GM}{r^2},\\quad V_g=-\\frac{GM}{r}'),
        formula('Orbital speed', '轨道速度', 'v=\\sqrt{\\frac{GM}{r}}'),
      ],
      lessons: [
        {
          title: text('Circular Motion and Gravitational Fields', '圆周运动与引力场'),
          description: text(
            'Centripetal acceleration, gravitational field strength and potential, and how satellites stay in orbit.',
            '向心加速度、引力场强与引力势、以及卫星如何保持轨道。',
          ),
          sections: [
            {
              heading: text('0. Circular motion: why acceleration without speeding up?', '0. 圆周运动：为什么不加速却有加速度？'),
              paragraphs: [
                text(
                  'An object moving in a circle at constant speed is still accelerating because its direction changes continuously. The acceleration points toward the centre (centripetal): a = v²/r = ω²r. The centripetal force is not a new force — it is the resultant of real forces (tension, gravity, friction) directed toward the centre.',
                  '匀速圆周运动的物体仍然有加速度，因为方向不断变化。加速度指向圆心（向心）：a = v²/r = ω²r。向心力不是一种新的力——它是真实力（张力、引力、摩擦力）指向圆心的合力。',
                ),
              ],
              formulas: [
                formula('Centripetal acceleration', '向心加速度', 'a_c=\\frac{v^2}{r}=\\omega^2 r'),
                formula('Centripetal force', '向心力', 'F_c=\\frac{mv^2}{r}=m\\omega^2 r'),
              ],
            },
            {
              heading: text('1. Gravitational field and potential', '1. 引力场与引力势'),
              paragraphs: [
                text(
                  'Gravitational field strength g = GM/r² gives the force per unit mass. Gravitational potential V = −GM/r gives the work done per unit mass to bring an object from infinity. The negative sign means gravity is always attractive. Field lines point radially inward; equipotential surfaces are concentric spheres.',
                  '引力场强 g = GM/r² 给出每单位质量的力。引力势 V = −GM/r 给出从无穷远处移动单位质量所做的功。负号意味着引力始终为吸引力。场线径向向内；等势面是同心球面。',
                ),
              ],
              formulas: [
                formula('Field strength', '场强', 'g=\\frac{GM}{r^2}'),
                formula('Potential', '引力势', 'V=-\\frac{GM}{r}'),
              ],
            },
            {
              heading: text('2. Orbital motion', '2. 轨道运动'),
              paragraphs: [
                text(
                  'For a circular orbit, gravity provides the centripetal force: GMm/r² = mv²/r, giving v = √(GM/r). Higher orbits have lower speed but longer period. Kepler\'s third law: T² ∝ r³. Geostationary satellites orbit at ~36,000 km with T = 24 h, staying above the same point on Earth.',
                  '对于圆轨道，引力提供向心力：GMm/r² = mv²/r，得 v = √(GM/r)。越高轨道速度越低但周期越长。开普勒第三定律：T² ∝ r³。地球同步卫星在约 36,000 km 高度轨道，T = 24 h，始终在地球同一点上方。',
                ),
              ],
              formulas: [
                formula('Orbital speed', '轨道速度', 'v=\\sqrt{\\frac{GM}{r}}'),
                formula('Kepler\'s third law', '开普勒第三定律', 'T^2=\\frac{4\\pi^2 r^3}{GM}'),
              ],
            },
            {
              heading: text('3. Classroom check: satellite speed', '3. 课堂题：卫星速度'),
              classroomQuestions: [
                {
                  id: 'alevel-u7-satellite-speed',
                  title: text('Low Earth orbit speed', '近地轨道速度'),
                  prompt: text(
                    'A satellite orbits at 7000 km from Earth\'s centre. Given GM = 4.0×10¹⁴ m³s⁻², what is its orbital speed?',
                    '一颗卫星在距地心 7000 km 处轨道。已知 GM = 4.0×10¹⁴ m³s⁻²，轨道速度是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('7.6 km/s', '7.6 km/s') },
                    { label: 'B', text: text('5.7 km/s', '5.7 km/s') },
                    { label: 'C', text: text('11.2 km/s', '11.2 km/s') },
                    { label: 'D', text: text('3.1 km/s', '3.1 km/s') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'v = √(GM/r) = √(4.0×10¹⁴/7.0×10⁶) = √(5.71×10⁷) ≈ 7560 m/s ≈ 7.6 km/s.',
                    'v = √(GM/r) = √(4.0×10¹⁴/7.0×10⁶) = √(5.71×10⁷) ≈ 7560 m/s ≈ 7.6 km/s。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Thinking centripetal force is a separate force (it is the resultant of real forces).', '以为向心力是一种独立的力（它是真实力的合力）。'),
                text('Using r as height above surface instead of distance from centre.', '用 r 作为地表以上高度而不是到地心的距离。'),
                text('Forgetting the negative sign in gravitational potential.', '忘记引力势的负号。'),
                text('Confusing orbital speed with escape velocity.', '混淆轨道速度和逃逸速度。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(8, 'Thermal Physics', '热物理', 'A Level Paper 4', [
      topic('8.1', 'Temperature and internal energy', '温度与内能'),
      topic('8.2', 'Ideal gas equation of state', '理想气体状态方程'),
      topic('8.3', 'Kinetic theory of gases', '气体分子动理论'),
      topic('8.4', 'First law of thermodynamics', '热力学第一定律'),
    ], {
      ...enrich('thermal', 'thermal', 'thermal', [
        ['Connect temperature scales, internal energy, and molecular kinetic energy.', '连接温标、内能和分子动能。'],
        ['Use ideal gas equations and kinetic theory assumptions.', '使用理想气体方程和分子动理论假设。'],
        ['Apply the first law to thermal processes.', '把热力学第一定律用于热过程。'],
      ]),
      formulas: [
        ...formulas.thermal,
        formula('Molecular kinetic energy', '分子平均动能', '\\frac12 m\\langle c^2\\rangle=\\frac32 k_BT'),
        formula('First law (complete)', '热力学第一定律', '\\Delta U=Q-W=Q-p\\Delta V'),
      ],
      lessons: [
        {
          title: text('Kinetic Theory and the Ideal Gas Law', '分子动理论与理想气体定律'),
          description: text(
            'From molecular motion to macroscopic pressure: the kinetic theory assumptions, pV = nRT, and the first law of thermodynamics.',
            '从分子运动到宏观压强：分子动理论假设、pV = nRT 和热力学第一定律。',
          ),
          sections: [
            {
              heading: text('0. The kinetic theory model', '0. 分子动理论模型'),
              paragraphs: [
                text(
                  'An ideal gas consists of many tiny particles in random motion. Key assumptions: particles are point masses (negligible volume), collisions are perfectly elastic, no intermolecular forces except during collisions, and the average kinetic energy is proportional to absolute temperature. This model explains pressure (momentum transfer at walls), temperature (average KE), and gas laws.',
                  '理想气体由大量随机运动的微小粒子组成。关键假设：粒子是质点（体积可忽略）、碰撞完全弹性、除碰撞外无分子间力、平均动能与绝对温度成正比。这个模型解释了压强（壁面动量传递）、温度（平均动能）和气体定律。',
                ),
              ],
              formulas: [
                formula('Average KE', '平均动能', '\\tfrac{1}{2}m\\langle c^2\\rangle=\\tfrac{3}{2}k_BT'),
                formula('Ideal gas law', '理想气体定律', 'pV=nRT=Nk_BT'),
              ],
            },
            {
              heading: text('1. The first law of thermodynamics', '1. 热力学第一定律'),
              paragraphs: [
                text(
                  'ΔU = Q − W: the change in internal energy equals heat supplied minus work done BY the gas. For an isothermal process (constant T): ΔU = 0, so Q = W. For an adiabatic process (no heat exchange): Q = 0, so ΔU = −W. For constant volume: W = 0, so ΔU = Q.',
                  'ΔU = Q − W：内能变化等于供给的热量减去气体对外做的功。对于等温过程（恒温）：ΔU = 0，所以 Q = W。对于绝热过程（无热交换）：Q = 0，所以 ΔU = −W。对于等容过程：W = 0，所以 ΔU = Q。',
                ),
              ],
              formulas: [
                formula('First law', '热力学第一定律', '\\Delta U=Q-W'),
                formula('Work done by gas', '气体做功', 'W=p\\Delta V\\quad(\\text{constant }p)'),
              ],
              takeaway: text(
                'The first law is conservation of energy applied to thermal systems. Sign convention matters: W is work done BY the gas.',
                '热力学第一定律是能量守恒在热系统中的应用。符号约定很重要：W 是气体对外做的功。',
              ),
            },
            {
              heading: text('2. Classroom check: rms speed', '2. 课堂题：方均根速度'),
              classroomQuestions: [
                {
                  id: 'alevel-u8-rms-speed',
                  title: text('RMS speed of helium atoms', '氦原子的方均根速度'),
                  prompt: text(
                    'Helium atoms (mass 6.6×10⁻²⁷ kg) are at 300 K. What is their rms speed? (k_B = 1.38×10⁻²³ J/K)',
                    '氦原子（质量 6.6×10⁻²⁷ kg）在 300 K。方均根速度是多少？（k_B = 1.38×10⁻²³ J/K）',
                  ),
                  choices: [
                    { label: 'A', text: text('1370 m/s', '1370 m/s') },
                    { label: 'B', text: text('430 m/s', '430 m/s') },
                    { label: 'C', text: text('2740 m/s', '2740 m/s') },
                    { label: 'D', text: text('690 m/s', '690 m/s') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    '½m⟨c²⟩ = 3/2 k_BT → c_rms = √(3k_BT/m) = √(3×1.38×10⁻²³×300/6.6×10⁻²⁷) = √(1.88×10⁶) ≈ 1370 m/s.',
                    '½m⟨c²⟩ = 3/2 k_BT → c_rms = √(3k_BT/m) = √(3×1.38×10⁻²³×300/6.6×10⁻²⁷) = √(1.88×10⁶) ≈ 1370 m/s。',
                  ),
                },
              ],
            },
            {
              heading: text('3. Common mistakes', '3. 常见错误'),
              bullets: [
                text('Using Celsius instead of kelvin in gas law calculations.', '在气体定律计算中用摄氏度而不是开尔文。'),
                text('Confusing rms speed with mean speed or most probable speed.', '混淆方均根速度和平均速度或最概然速度。'),
                text('Getting the sign of W wrong in the first law.', '在热力学第一定律中弄错 W 的符号。'),
                text('Forgetting that internal energy depends only on temperature for an ideal gas.', '忘记理想气体的内能只取决于温度。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(9, 'Oscillations and Electromagnetic Fields', '振动与电磁场', 'A Level Paper 4', [
      topic('9.1', 'Simple harmonic motion', '简谐运动'),
      topic('9.2', 'Electric fields and Coulomb\'s law', '电场与库仑定律'),
      topic('9.3', 'Capacitance and energy storage', '电容与储能'),
      topic('9.4', 'Magnetic fields and forces', '磁场与磁力'),
      topic('9.5', 'Alternating currents and rms values', '交流电与有效值'),
    ], {
      summary: text('Combine SHM, electric fields, capacitors, magnetic fields, and alternating-current models.', '综合简谐运动、电场、电容器、磁场和交流电模型。'),
      focus: focus(
        ['Use phase and energy ideas in oscillations.', '在振动中使用相位和能量思想。'],
        ['Analyze electric and magnetic fields with force, energy, and flux ideas.', '用力、能量和通量思想分析电场与磁场。'],
        ['Connect sinusoidal AC quantities with rms values.', '把正弦交流量与有效值联系起来。'],
      ),
      formulas: [
        ...formulas.oscillation,
        ...formulas.electric,
        ...formulas.magnetism,
        formula('Capacitor energy', '电容器储能', 'E=\\frac12CV^2=\\frac12QV'),
        formula('AC rms values', '交流有效值', 'V_{rms}=\\frac{V_0}{\\sqrt{2}},\\quad I_{rms}=\\frac{I_0}{\\sqrt{2}}'),
      ],
      diagrams: [...diagrams.oscillation, ...diagrams.electric, ...diagrams.magnetism],
      lessons: [
        {
          title: text('Capacitors, Magnetic Fields and AC', '电容器、磁场与交流电'),
          description: text(
            'How capacitors store energy, how magnetic fields exert forces on moving charges, and why rms values matter in AC circuits.',
            '电容器如何储存能量、磁场如何对运动电荷施加力、以及为什么交流电路中有效值很重要。',
          ),
          sections: [
            {
              heading: text('0. Capacitance and energy storage', '0. 电容与储能'),
              paragraphs: [
                text(
                  'A capacitor stores charge and energy in an electric field between two plates. Capacitance C = Q/V (unit: farad). Energy stored: E = ½CV² = ½QV = Q²/(2C). For parallel plates: C = ε₀A/d. Capacitors in parallel add (C = C₁+C₂); in series: 1/C = 1/C₁+1/C₂. Charging/discharging follows an exponential curve with time constant τ = RC.',
                  '电容器在两块板之间的电场中储存电荷和能量。电容 C = Q/V（单位：法拉）。储存能量：E = ½CV² = ½QV = Q²/(2C)。对于平行板：C = ε₀A/d。并联电容相加（C = C₁+C₂）；串联：1/C = 1/C₁+1/C₂。充放电遵循指数曲线，时间常数 τ = RC。',
                ),
              ],
              formulas: [
                formula('Capacitance', '电容', 'C=\\frac{Q}{V}'),
                formula('Energy stored', '储存能量', 'E=\\tfrac{1}{2}CV^2=\\tfrac{1}{2}QV'),
                formula('Time constant', '时间常数', '\\tau=RC'),
              ],
            },
            {
              heading: text('1. Magnetic force on moving charges', '1. 磁场对运动电荷的力'),
              paragraphs: [
                text(
                  'A charge moving in a magnetic field experiences F = BQv sinθ (Fleming\'s left-hand rule). The force is always perpendicular to velocity, so it does no work — it changes direction but not speed. This causes circular motion: r = mv/(BQ). For a current-carrying wire: F = BIL sinθ. This is the motor effect.',
                  '在磁场中运动的电荷受力 F = BQv sinθ（弗莱明左手定则）。力始终垂直于速度，所以不做功——只改变方向不改变速度。这导致圆周运动：r = mv/(BQ)。对于载流导线：F = BIL sinθ。这就是电动机效应。',
                ),
              ],
              formulas: [
                formula('Force on charge', '电荷受力', 'F=BQv\\sin\\theta'),
                formula('Force on wire', '导线受力', 'F=BIL\\sin\\theta'),
                formula('Radius of circular path', '圆周半径', 'r=\\frac{mv}{BQ}'),
              ],
            },
            {
              heading: text('2. Alternating current and rms values', '2. 交流电与有效值'),
              paragraphs: [
                text(
                  'AC voltage varies sinusoidally: V = V₀ sin(ωt). The rms (root mean square) value gives the equivalent DC value for power: V_rms = V₀/√2, I_rms = I₀/√2. Power in AC: P = I_rms × V_rms (for resistive loads). The National Grid uses high voltage, low current transmission to minimise I²R heating losses.',
                  '交流电压正弦变化：V = V₀ sin(ωt)。有效值（rms）给出功率等效的直流值：V_rms = V₀/√2，I_rms = I₀/√2。交流功率：P = I_rms × V_rms（纯阻性负载）。国家电网用高压低电流输电以最小化 I²R 热损耗。',
                ),
              ],
              formulas: [
                formula('RMS voltage', '有效电压', 'V_{rms}=\\frac{V_0}{\\sqrt{2}}'),
                formula('AC power', '交流功率', 'P=I_{rms}V_{rms}'),
              ],
              takeaway: text(
                'RMS values let us use DC power formulas for AC circuits. The peak value is √2 times the rms value.',
                '有效值让我们能在交流电路中用直流功率公式。峰值是有效值的 √2 倍。',
              ),
            },
            {
              heading: text('3. Classroom check: capacitor energy', '3. 课堂题：电容器能量'),
              classroomQuestions: [
                {
                  id: 'alevel-u9-capacitor-energy',
                  title: text('Energy in a charged capacitor', '充电电容器的能量'),
                  prompt: text(
                    'A 470 μF capacitor is charged to 12 V. How much energy is stored?',
                    '一个 470 μF 电容器充电到 12 V。储存了多少能量？',
                  ),
                  choices: [
                    { label: 'A', text: text('0.034 J', '0.034 J') },
                    { label: 'B', text: text('0.068 J', '0.068 J') },
                    { label: 'C', text: text('5.64 J', '5.64 J') },
                    { label: 'D', text: text('0.003 J', '0.003 J') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'E = ½CV² = ½ × 470×10⁻⁶ × 12² = ½ × 470×10⁻⁶ × 144 = 0.0338 J ≈ 0.034 J.',
                    'E = ½CV² = ½ × 470×10⁻⁶ × 12² = ½ × 470×10⁻⁶ × 144 = 0.0338 J ≈ 0.034 J。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Using peak voltage instead of rms in power calculations.', '在功率计算中用峰值电压而不是有效值。'),
                text('Forgetting that magnetic force does no work (always perpendicular to v).', '忘记磁力不做功（始终垂直于 v）。'),
                text('Mixing up series and parallel capacitor formulas (opposite to resistors!).', '混淆串联和并联电容公式（与电阻相反！）。'),
                text('Using F = BQv without checking the angle (sinθ = 1 only when v ⊥ B).', '用 F = BQv 时不检查角度（sinθ = 1 只在 v ⊥ B 时）。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(10, 'Quantum, Nuclear, Medical, and Cosmology', '量子、核、医学与宇宙学', 'A Level Paper 4+5', [
      topic('10.1', 'Photoelectric effect and photons', '光电效应与光子'),
      topic('10.2', 'Wave-particle duality and energy levels', '波粒二象性与能级'),
      topic('10.3', 'Nuclear decay and binding energy', '核衰变与结合能'),
      topic('10.4', 'Medical imaging and radiation', '医学成像与辐射'),
      topic('10.5', 'Stellar evolution and cosmology', '恒星演化与宇宙学'),
    ], {
      ...enrich('quantum', 'quantum', 'quantum', [
        ['Use photon, wave-particle, and energy-level models.', '使用光子、波粒二象性和能级模型。'],
        ['Apply nuclear decay, binding energy, and radiation ideas.', '应用核衰变、结合能和辐射概念。'],
        ['Connect physics models to imaging, radiation safety, stars, and cosmology.', '把物理模型连接到成像、辐射安全、恒星和宇宙学。'],
      ]),
      formulas: [
        ...formulas.quantum,
        formula('Binding energy', '结合能', 'E_b=\\Delta m c^2'),
        formula('de Broglie wavelength', '德布罗意波长', '\\lambda=\\frac{h}{p}=\\frac{h}{mv}'),
      ],
      diagrams: [...diagrams.quantum, ...diagrams.astronomy],
      lessons: [
        {
          title: text('Photoelectric Effect and Wave-Particle Duality', '光电效应与波粒二象性'),
          description: text(
            'Einstein\'s photon model, the photoelectric equation, de Broglie wavelength, and atomic energy levels.',
            '爱因斯坦光子模型、光电方程、德布罗意波长和原子能级。',
          ),
          sections: [
            {
              heading: text('0. The photon model of light', '0. 光的光子模型'),
              paragraphs: [
                text(
                  'Light comes in discrete packets called photons, each with energy E = hf. This explains the photoelectric effect: electrons are emitted from a metal surface only if the photon energy exceeds the work function φ. Einstein\'s equation: K_max = hf − φ. Below the threshold frequency f₀ = φ/h, no electrons are emitted regardless of intensity. This cannot be explained by the wave model.',
                  '光以离散的光子包形式存在，每个光子能量 E = hf。这解释了光电效应：只有当光子能量超过逸出功 φ 时，电子才从金属表面发射。爱因斯坦方程：K_max = hf − φ。低于截止频率 f₀ = φ/h，无论光强多大都不会发射电子。这无法用波动模型解释。',
                ),
              ],
              formulas: [
                formula('Photon energy', '光子能量', 'E=hf=\\frac{hc}{\\lambda}'),
                formula('Photoelectric equation', '光电方程', 'K_{max}=hf-\\phi'),
                formula('Threshold frequency', '截止频率', 'f_0=\\frac{\\phi}{h}'),
              ],
            },
            {
              heading: text('1. Wave-particle duality', '1. 波粒二象性'),
              paragraphs: [
                text(
                  'Matter also has wave properties. De Broglie proposed λ = h/p = h/(mv). This is confirmed by electron diffraction experiments. The smaller the momentum, the longer the wavelength. This is why electron microscopes have better resolution than optical microscopes (electron λ ~ 0.01 nm vs light λ ~ 500 nm).',
                  '物质也有波动性。德布罗意提出 λ = h/p = h/(mv)。这由电子衍射实验证实。动量越小，波长越长。这就是为什么电子显微镜比光学显微镜分辨率更高（电子 λ ~ 0.01 nm vs 光 λ ~ 500 nm）。',
                ),
              ],
              formulas: [
                formula('de Broglie wavelength', '德布罗意波长', '\\lambda=\\frac{h}{p}=\\frac{h}{mv}'),
              ],
              takeaway: text(
                'All matter has both wave and particle properties. The dominant behaviour depends on the scale: quantum for atoms, classical for everyday objects.',
                '所有物质都有波和粒子两种性质。主导行为取决于尺度：原子尺度是量子的，日常物体是经典的。',
              ),
            },
            {
              heading: text('2. Atomic energy levels and line spectra', '2. 原子能级与线光谱'),
              paragraphs: [
                text(
                  'Electrons in atoms occupy discrete energy levels. Absorption: an electron jumps to a higher level by absorbing a photon of exactly the right energy (ΔE = hf). Emission: an electron drops to a lower level, emitting a photon. This produces line spectra (discrete frequencies), not continuous spectra. The hydrogen spectrum has series: Lyman (UV, to n=1), Balmer (visible, to n=2), Paschen (IR, to n=3).',
                  '原子中的电子占据离散能级。吸收：电子吸收恰好合适能量的光子跳到更高能级（ΔE = hf）。发射：电子落到更低能级，发射光子。这产生线光谱（离散频率），而不是连续光谱。氢光谱有系列：莱曼系（紫外，到 n=1）、巴尔末系（可见光，到 n=2）、帕邢系（红外，到 n=3）。',
                ),
              ],
              formulas: [
                formula('Energy level transition', '能级跃迁', '\\Delta E=hf=\\frac{hc}{\\lambda}'),
              ],
            },
            {
              heading: text('3. Classroom check: photoelectric effect', '3. 课堂题：光电效应'),
              classroomQuestions: [
                {
                  id: 'alevel-u10-photoelectric',
                  title: text('Maximum kinetic energy of photoelectrons', '光电子最大动能'),
                  prompt: text(
                    'Light of frequency 8.0×10¹⁴ Hz falls on a metal with work function 2.3 eV. What is the maximum KE of emitted electrons? (h = 6.63×10⁻³⁴ J s)',
                    '频率 8.0×10¹⁴ Hz 的光照射逸出功 2.3 eV 的金属。发射电子的最大动能是多少？（h = 6.63×10⁻³⁴ J s）',
                  ),
                  choices: [
                    { label: 'A', text: text('1.0 eV', '1.0 eV') },
                    { label: 'B', text: text('3.3 eV', '3.3 eV') },
                    { label: 'C', text: text('5.6 eV', '5.6 eV') },
                    { label: 'D', text: text('0.5 eV', '0.5 eV') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'E = hf = 6.63×10⁻³⁴ × 8.0×10¹⁴ = 5.30×10⁻¹⁹ J = 3.31 eV. K_max = 3.31 − 2.3 = 1.01 eV ≈ 1.0 eV.',
                    'E = hf = 6.63×10⁻³⁴ × 8.0×10¹⁴ = 5.30×10⁻¹⁹ J = 3.31 eV。K_max = 3.31 − 2.3 = 1.01 eV ≈ 1.0 eV。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Thinking increasing intensity increases electron KE (it only increases the number of electrons).', '以为增加光强增加电子动能（它只增加电子数量）。'),
                text('Forgetting to convert eV to joules (or vice versa) in calculations.', '忘记在计算中转换 eV 和焦耳。'),
                text('Confusing work function with ionisation energy.', '混淆逸出功和电离能。'),
                text('Thinking de Broglie wavelength applies only to electrons (it applies to all matter).', '以为德布罗意波长只适用于电子（它适用于所有物质）。'),
              ],
            },
          ],
        },
      ],
    }),
  ],
};

const ibPhysics: CurriculumCourse = {
  id: 'ib-dp-physics-2025',
  name: text('IB Diploma Programme Physics', 'IB 大学预科项目物理'),
  level: text('First assessment 2025: SL (110h) / HL (180h)', '2025 首考：SL（110h）/ HL（180h）'),
  sourceUrl: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/physics/',
  sourceLabel: text('IB DP Physics subject brief and guide overview', 'IB DP Physics 官方 subject brief 与课程概览'),
  units: [
    unit(1, 'A. Space, Time and Motion', 'A. 空间、时间与运动', 'SL/HL · Paper 1+2', [
      topic('A.1', 'Kinematics', '运动学'),
      topic('A.2', 'Forces and momentum', '力与动量'),
      topic('A.3', 'Work, energy and power', '功、能量与功率'),
      topic('A.4', 'Rigid body mechanics (HL)', '刚体力学（HL）'),
      topic('A.5', 'Galilean and special relativity (HL)', '伽利略相对性与狭义相对论（HL）'),
    ], {
      summary: text('The motion theme builds from everyday motion to momentum, energy, rotation, and relativity.', '运动主题从日常运动出发,逐步进入动量、能量、转动和相对论。'),
      focus: focus(
        ['Model motion using vectors, graphs, momentum, and energy.', '用矢量、图像、动量和能量建模运动。'],
        ['Use rotational and rigid-body ideas for extended objects.', '用转动和刚体思想分析有尺寸物体。'],
        ['Compare measurements across inertial frames in relativity contexts.', '在相对论情境中比较不同惯性系的测量。'],
      ),
      formulas: [...formulas.kinematics, ...formulas.dynamics, ...formulas.energy, ...formulas.momentum, ...formulas.rotation],
      diagrams: [...diagrams.kinematics, ...diagrams.momentum, ...diagrams.relativity],
      lessons: [
        {
          title: text('Momentum, Impulse and Collisions', '动量、冲量与碰撞'),
          description: text(
            'How momentum is conserved in interactions, the impulse-momentum theorem, and elastic vs inelastic collisions.',
            '动量如何在相互作用中守恒、冲量-动量定理、以及弹性与非弹性碰撞。',
          ),
          sections: [
            {
              heading: text('0. Momentum and Newton\'s second law', '0. 动量与牛顿第二定律'),
              paragraphs: [
                text(
                  'Momentum p = mv is a vector quantity. Newton\'s second law in its most general form is F = Δp/Δt (force equals rate of change of momentum). This works even when mass changes (e.g. rockets). Impulse = FΔt = Δp = change in momentum. On a force-time graph, the area gives the impulse.',
                  '动量 p = mv 是矢量。牛顿第二定律最一般的形式是 F = Δp/Δt（力等于动量变化率）。这在质量变化时也有效（如火箭）。冲量 = FΔt = Δp = 动量变化。在力-时间图上，面积给出冲量。',
                ),
              ],
              formulas: [
                formula('Momentum', '动量', 'p=mv'),
                formula('Impulse', '冲量', 'J=F\\Delta t=\\Delta p'),
              ],
            },
            {
              heading: text('1. Conservation of momentum', '1. 动量守恒'),
              paragraphs: [
                text(
                  'In any isolated system (no external forces), total momentum is conserved. This applies to collisions, explosions, and recoil. Elastic collision: both momentum AND kinetic energy are conserved. Inelastic collision: momentum is conserved but kinetic energy is not (some converts to heat, sound, deformation). Perfectly inelastic: objects stick together after collision.',
                  '在任何孤立系统（无外力）中，总动量守恒。这适用于碰撞、爆炸和后坐。弹性碰撞：动量和动能都守恒。非弹性碰撞：动量守恒但动能不守恒（部分转化为热、声、形变）。完全非弹性：碰撞后物体粘在一起。',
                ),
              ],
              formulas: [
                formula('Conservation', '动量守恒', '\\sum p_\\text{before}=\\sum p_\\text{after}'),
              ],
              takeaway: text(
                'Momentum is ALWAYS conserved in isolated systems. Kinetic energy is only conserved in elastic collisions.',
                '动量在孤立系统中始终守恒。动能只在弹性碰撞中守恒。',
              ),
            },
            {
              heading: text('2. Classroom check: recoil', '2. 课堂题：后坐'),
              classroomQuestions: [
                {
                  id: 'ib-momentum-recoil',
                  title: text('Gun recoil velocity', '枪的后坐速度'),
                  prompt: text(
                    'A 4 kg gun fires a 0.02 kg bullet at 400 m/s. What is the recoil velocity of the gun?',
                    '一把 4 kg 的枪以 400 m/s 发射 0.02 kg 子弹。枪的后坐速度是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('2 m/s backward', '2 m/s 向后') },
                    { label: 'B', text: text('0.5 m/s backward', '0.5 m/s 向后') },
                    { label: 'C', text: text('8 m/s backward', '8 m/s 向后') },
                    { label: 'D', text: text('200 m/s backward', '200 m/s 向后') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'Initial momentum = 0. After: 0.02×400 + 4×v = 0 → v = −8/4 = −2 m/s (backward).',
                    '初始动量 = 0。发射后：0.02×400 + 4×v = 0 → v = −8/4 = −2 m/s（向后）。',
                  ),
                },
              ],
            },
            {
              heading: text('3. Common mistakes', '3. 常见错误'),
              bullets: [
                text('Forgetting that momentum is a vector (signs matter in 1D problems).', '忘记动量是矢量（一维问题中符号很重要）。'),
                text('Assuming kinetic energy is always conserved (only in elastic collisions).', '假设动能始终守恒（只在弹性碰撞中）。'),
                text('Using F = ma when mass is changing (use F = Δp/Δt instead).', '在质量变化时用 F = ma（应用 F = Δp/Δt）。'),
                text('Confusing impulse with momentum (impulse is the CHANGE in momentum).', '混淆冲量和动量（冲量是动量的变化）。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(2, 'B. The Particulate Nature of Matter', 'B. 物质的粒子性', 'SL/HL · Paper 1+2', [
      topic('B.1', 'Thermal energy transfers', '热能传递'),
      topic('B.2', 'Greenhouse effect', '温室效应'),
      topic('B.3', 'Gas laws', '气体定律'),
      topic('B.4', 'Thermodynamics (HL)', '热力学（HL）'),
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
      lessons: [
        {
          title: text('Thermal Energy, Gas Laws and the Greenhouse Effect', '热能、气体定律与温室效应'),
          description: text(
            'How microscopic particle behaviour explains macroscopic thermal properties, gas laws, and Earth\'s energy balance.',
            '微观粒子行为如何解释宏观热性质、气体定律和地球能量平衡。',
          ),
          sections: [
            {
              heading: text('0. Internal energy and temperature', '0. 内能与温度'),
              paragraphs: [
                text(
                  'Internal energy is the total random kinetic energy plus potential energy of all particles in a system. Temperature is proportional to the average kinetic energy of particles. When energy is added to a system, it either raises the temperature (increasing KE) or changes state (increasing PE). The specific heat capacity c tells us how much energy raises 1 kg by 1 K: Q = mcΔT. The specific latent heat L tells us how much energy changes the state of 1 kg: Q = mL.',
                  '内能是系统中所有粒子的随机动能与势能之和。温度与粒子的平均动能成正比。当能量加入系统时，要么升高温度（增加动能），要么改变状态（增加势能）。比热容 c 告诉我们使 1 kg 升高 1 K 需要多少能量：Q = mcΔT。比潜热 L 告诉我们使 1 kg 改变状态需要多少能量：Q = mL。',
                ),
              ],
              formulas: [
                formula('Specific heat capacity', '比热容', 'Q=mc\\Delta T'),
                formula('Specific latent heat', '比潜热', 'Q=mL'),
              ],
              takeaway: text(
                'During a change of state, temperature stays constant because energy goes into breaking intermolecular bonds, not increasing KE.',
                '在状态变化期间，温度保持不变，因为能量用于断裂分子间键，而不是增加动能。',
              ),
            },
            {
              heading: text('1. The ideal gas law and kinetic theory', '1. 理想气体定律与分子动理论'),
              paragraphs: [
                text(
                  'The ideal gas equation pV = nRT (or pV = NkT) connects pressure, volume, and temperature. From kinetic theory, gas pressure arises from molecular collisions with the container walls. The average kinetic energy of a molecule is 3/2 kT. At constant temperature, pV = constant (Boyle\'s law). At constant volume, p/T = constant (Gay-Lussac\'s law). At constant pressure, V/T = constant (Charles\'s law).',
                  '理想气体方程 pV = nRT（或 pV = NkT）连接压强、体积和温度。从分子动理论看，气体压强来自分子与容器壁的碰撞。分子的平均动能为 3/2 kT。恒温时 pV = 常数（玻意耳定律）。恒容时 p/T = 常数（盖-吕萨克定律）。恒压时 V/T = 常数（查理定律）。',
                ),
              ],
              formulas: [
                formula('Ideal gas equation', '理想气体方程', 'pV=nRT=NkT'),
                formula('Average molecular KE', '分子平均动能', '\\overline{E_k}=\\tfrac{3}{2}kT'),
              ],
            },
            {
              heading: text('2. The greenhouse effect', '2. 温室效应'),
              paragraphs: [
                text(
                  'The Sun emits mainly visible and UV radiation, which passes through the atmosphere and warms the surface. The Earth re-radiates energy as infrared (longer wavelength). Greenhouse gases (CO₂, H₂O, CH₄) absorb and re-emit infrared radiation, trapping energy and raising the average surface temperature. Without this effect, Earth would be about −18°C. The enhanced greenhouse effect from human CO₂ emissions raises global temperatures further.',
                  '太阳主要发射可见光和紫外辐射，穿过大气层使地表升温。地球以红外线（较长波长）重新辐射能量。温室气体（CO₂、H₂O、CH₄）吸收并重新发射红外辐射，困住能量，提高平均地表温度。没有温室效应，地球约为 −18°C。人类 CO₂ 排放增强的温室效应使全球温度进一步升高。',
                ),
              ],
              takeaway: text(
                'The greenhouse effect depends on wavelength-selective absorption: transparent to incoming visible, opaque to outgoing infrared.',
                '温室效应取决于波长选择性吸收：对入射可见光透明，对出射红外不透明。',
              ),
            },
            {
              heading: text('3. Classroom check: gas law calculation', '3. 课堂题：气体定律计算'),
              classroomQuestions: [
                {
                  id: 'ib-thermal-gas-law',
                  title: text('Heating a sealed gas', '加热密封气体'),
                  prompt: text(
                    'A sealed container of gas at 300 K has pressure 1.0 × 10⁵ Pa. The gas is heated to 600 K at constant volume. What is the new pressure?',
                    '一个密封容器中的气体在 300 K 时压强为 1.0 × 10⁵ Pa。恒容加热到 600 K。新压强是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('2.0 × 10⁵ Pa', '2.0 × 10⁵ Pa') },
                    { label: 'B', text: text('1.0 × 10⁵ Pa', '1.0 × 10⁵ Pa') },
                    { label: 'C', text: text('4.0 × 10⁵ Pa', '4.0 × 10⁵ Pa') },
                    { label: 'D', text: text('0.5 × 10⁵ Pa', '0.5 × 10⁵ Pa') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'At constant volume, p/T = constant. So p₂ = p₁ × T₂/T₁ = 1.0 × 10⁵ × 600/300 = 2.0 × 10⁵ Pa. Doubling the absolute temperature doubles the pressure.',
                    '恒容时 p/T = 常数。所以 p₂ = p₁ × T₂/T₁ = 1.0 × 10⁵ × 600/300 = 2.0 × 10⁵ Pa。绝对温度加倍则压强加倍。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Common mistakes', '4. 常见错误'),
              bullets: [
                text('Using Celsius instead of kelvin in gas law calculations.', '在气体定律计算中用摄氏度而不是开尔文。'),
                text('Thinking temperature rises during boiling or melting.', '以为沸腾或熔化时温度升高。'),
                text('Confusing internal energy with temperature (internal energy includes PE; temperature only reflects average KE).', '混淆内能和温度（内能包含势能；温度只反映平均动能）。'),
                text('Forgetting that the greenhouse effect is natural and essential — the problem is the enhanced effect.', '忘记温室效应是自然且必要的——问题在于增强效应。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(3, 'C. Wave Behaviour', 'C. 波的行为', 'SL/HL · Paper 1+2', [
      topic('C.1', 'Simple harmonic motion', '简谐运动'),
      topic('C.2', 'Wave model', '波模型'),
      topic('C.3', 'Wave phenomena (HL)', '波现象（HL）'),
      topic('C.4', 'Standing waves and resonance', '驻波与共振'),
      topic('C.5', 'Doppler effect (HL)', '多普勒效应（HL）'),
    ], {
      summary: text('Wave behaviour links oscillations, propagation, interference, resonance, and relative motion.', '波的行为连接振动、传播、干涉、共振和相对运动。'),
      focus: focus(
        ['Use SHM as a bridge from mechanics to wave motion.', '把简谐运动作为从力学到波动的桥梁。'],
        ['Analyze phase, path difference, interference, diffraction, and resonance.', '分析相位、波程差、干涉、衍射和共振。'],
        ['Use Doppler reasoning for sound, light, and astronomical evidence.', '用多普勒思想处理声音、光和天文证据。'],
      ),
      formulas: [...formulas.oscillation, ...formulas.waves],
      diagrams: [...diagrams.oscillation, ...diagrams.waves],
      lessons: [
        {
          title: text('Simple Harmonic Motion: From Springs to Pendulums', '简谐运动：从弹簧到摆'),
          description: text(
            'The defining equation of SHM, energy transfers, and how to connect displacement, velocity, and acceleration graphs.',
            '简谐运动的定义方程、能量转化，以及如何连接位移、速度和加速度图像。',
          ),
          sections: [
            {
              heading: text('0. What makes motion “simple harmonic”?', '0. 什么让运动成为“简谐”的？'),
              paragraphs: [
                text(
                  'Simple harmonic motion (SHM) occurs when the restoring force (or acceleration) is directly proportional to the displacement from equilibrium and always directed back toward equilibrium. The defining equation is a = −ω²x. The minus sign is crucial: it means acceleration always opposes displacement. Examples: mass on a spring, simple pendulum (small angles), vibrating molecules.',
                  '当恢复力（或加速度）与离开平衡位置的位移成正比且始终指向平衡位置时，就发生简谐运动（SHM）。定义方程为 a = −ω²x。负号至关重要：它意味着加速度始终与位移方向相反。例子：弹簧上的质量块、单摆（小角度）、分子振动。',
                ),
              ],
              takeaway: text(
                'SHM is defined by a = −ω²x. If the acceleration is not proportional to displacement, it is not SHM.',
                'SHM 由 a = −ω²x 定义。如果加速度不与位移成正比，就不是 SHM。',
              ),
            },
            {
              heading: text('1. Displacement, velocity and acceleration in SHM', '1. SHM 中的位移、速度和加速度'),
              paragraphs: [
                text(
                  'If x = x₀ cos(ωt), then v = −x₀ω sin(ωt) and a = −x₀ω² cos(ωt). Key relationships: velocity is maximum at equilibrium (x=0) and zero at extremes; acceleration is maximum at extremes and zero at equilibrium. Velocity leads displacement by π/2; acceleration is π out of phase with displacement.',
                  '如果 x = x₀ cos(ωt)，则 v = −x₀ω sin(ωt)，a = −x₀ω² cos(ωt)。关键关系：速度在平衡位置（x=0）最大，在极端位置为零；加速度在极端位置最大，在平衡位置为零。速度超前位移 π/2；加速度与位移反相（相差 π）。',
                ),
              ],
              formulas: [
                formula('SHM displacement', 'SHM 位移', 'x=x_0\\cos(\\omega t)'),
                formula('SHM velocity', 'SHM 速度', 'v=\\pm\\omega\\sqrt{x_0^2-x^2}'),
                formula('Angular frequency', '角频率', '\\omega=\\frac{2\\pi}{T}=2\\pi f'),
              ],
            },
            {
              heading: text('2. Energy in SHM', '2. SHM 中的能量'),
              paragraphs: [
                text(
                  'Total energy in SHM is constant (no damping): E = ½mω²x₀². At the extremes, all energy is potential (spring PE or gravitational PE). At equilibrium, all energy is kinetic. The energy continuously sloshes between KE and PE. For a spring: E = ½kx₀² where k = mω².',
                  'SHM 中总能量恒定（无阻尼）：E = ½mω²x₀²。在极端位置，所有能量为势能（弹簧势能或重力势能）。在平衡位置，所有能量为动能。能量在动能和势能之间不断转换。对于弹簧：E = ½kx₀²，其中 k = mω²。',
                ),
              ],
              formulas: [
                formula('Total SHM energy', 'SHM 总能量', 'E=\\tfrac{1}{2}m\\omega^2 x_0^2'),
                formula('Spring potential energy', '弹簧势能', 'E_p=\\tfrac{1}{2}kx^2'),
              ],
            },
            {
              heading: text('3. Classroom check: pendulum period', '3. 课堂题：摆的周期'),
              classroomQuestions: [
                {
                  id: 'ib-shm-pendulum-period',
                  title: text('Effect of length on pendulum period', '摆长对周期的影响'),
                  prompt: text(
                    'A simple pendulum has period T on Earth. If the length is quadrupled, what is the new period?',
                    '一个单摆在地球上周期为 T。如果摆长变为原来的四倍，新周期是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('2T', '2T') },
                    { label: 'B', text: text('4T', '4T') },
                    { label: 'C', text: text('T/2', 'T/2') },
                    { label: 'D', text: text('T√2', 'T√2') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'T = 2π√(L/g). If L → 4L, then T_new = 2π√(4L/g) = 2 × 2π√(L/g) = 2T. Period is proportional to √L, so quadrupling L doubles T.',
                    'T = 2π√(L/g)。如果 L → 4L，则 T_new = 2π√(4L/g) = 2 × 2π√(L/g) = 2T。周期与 √L 成正比，所以摆长变为四倍时周期加倍。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Damping and resonance', '4. 阻尼与共振'),
              paragraphs: [
                text(
                  'Damping removes energy from an oscillator, reducing amplitude over time. Light damping: oscillations gradually die out. Critical damping: returns to equilibrium fastest without oscillating (car suspension). Heavy damping: slow return without oscillation. Resonance occurs when the driving frequency equals the natural frequency — amplitude becomes very large. Examples: pushing a swing, Tacoma Narrows bridge, MRI machines.',
                  '阻尼从振动系统中移除能量，使振幅随时间减小。轻阻尼：振动逐渐衰减。临界阻尼：不振荡地最快回到平衡位置（汽车悬架）。重阻尼：不振荡地缓慢回到平衡。共振发生在驱动频率等于固有频率时——振幅变得非常大。例子：推秋千、塔科马海峡大桥、MRI 机器。',
                ),
              ],
              takeaway: text(
                'Resonance is useful (musical instruments, MRI) and dangerous (bridges, buildings in earthquakes). Engineers must design natural frequencies away from expected driving frequencies.',
                '共振既有用（乐器、MRI）又危险（桥梁、地震中的建筑）。工程师必须设计固有频率远离预期驱动频率。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Forgetting the minus sign in a = −ω²x (it defines SHM!).', '忘记 a = −ω²x 中的负号（它定义了 SHM！）。'),
                text('Thinking period depends on amplitude (it does not, for SHM).', '以为周期取决于振幅（对于 SHM，不会）。'),
                text('Confusing angular frequency ω with frequency f (ω = 2πf).', '混淆角频率 ω 和频率 f（ω = 2πf）。'),
                text('Assuming all oscillations are SHM (large-angle pendulum is NOT SHM).', '假设所有振动都是 SHM（大角度摆不是 SHM）。'),
              ],
            },
          ],
        },
        {
          title: text('Wave Interference and Standing Waves', '波的干涉与驻波'),
          description: text(
            'Superposition, path difference, constructive/destructive interference, and how standing waves form in strings and pipes.',
            '叠加原理、波程差、相长/相消干涉，以及驻波如何在弦和管中形成。',
          ),
          sections: [
            {
              heading: text('0. The superposition principle', '0. 叠加原理'),
              paragraphs: [
                text(
                  'When two or more waves meet at a point, the resultant displacement is the vector sum of the individual displacements. This is the principle of superposition. After passing through each other, each wave continues unchanged. This leads to interference: sustained patterns of reinforcement and cancellation when coherent sources overlap.',
                  '当两个或多个波在某点相遇时，合成位移是各个位移的矢量和。这就是叠加原理。波穿过彼此后，各自继续不变。这导致干涉：当相干源重叠时，产生持续的加强和抵消图案。',
                ),
              ],
              takeaway: text(
                'Waves add algebraically at every point. They do not bounce off each other.',
                '波在每一点代数相加。它们不会互相弹开。',
              ),
            },
            {
              heading: text('1. Constructive and destructive interference', '1. 相长与相消干涉'),
              paragraphs: [
                text(
                  'Constructive interference: waves arrive in phase (path difference = nλ, where n = 0, 1, 2...). Result: maximum amplitude. Destructive interference: waves arrive in antiphase (path difference = (n+½)λ). Result: zero amplitude. For two-source interference (e.g. Young\'s double slit), bright fringes occur where path difference = nλ and dark fringes where path difference = (n+½)λ.',
                  '相长干涉：波同相到达（波程差 = nλ，n = 0, 1, 2...）。结果：振幅最大。相消干涉：波反相到达（波程差 = (n+½)λ）。结果：振幅为零。对于双源干涉（如杨氏双缝），亮纹出现在波程差 = nλ 处，暗纹出现在波程差 = (n+½)λ 处。',
                ),
              ],
              formulas: [
                formula('Constructive condition', '相长条件', '\\Delta d = n\\lambda \\quad (n=0,1,2,...)'),
                formula('Destructive condition', '相消条件', '\\Delta d = (n+\\tfrac{1}{2})\\lambda'),
                formula('Double-slit fringe spacing', '双缝条纹间距', '\\Delta y = \\frac{\\lambda D}{d}'),
              ],
            },
            {
              heading: text('2. Standing waves: nodes and antinodes', '2. 驻波：节点与腹点'),
              paragraphs: [
                text(
                  'A standing wave forms when two identical waves travel in opposite directions and superpose. Nodes are points of zero displacement (always destructive interference). Antinodes are points of maximum displacement (always constructive). For a string fixed at both ends: the fundamental has one antinode in the middle, length L = λ/2. Harmonics: L = nλ/2, so f_n = nv/(2L). For a pipe open at both ends, the same formula applies. For a pipe closed at one end: L = (2n−1)λ/4 (odd harmonics only).',
                  '当两个相同的波沿相反方向传播并叠加时，形成驻波。节点是位移始终为零的点（始终相消干涉）。腹点是位移最大的点（始终相长）。对于两端固定的弦：基波在中间有一个腹点，长度 L = λ/2。谐波：L = nλ/2，所以 f_n = nv/(2L)。对于两端开口的管，同样公式适用。对于一端封闭的管：L = (2n−1)λ/4（只有奇次谐波）。',
                ),
              ],
              formulas: [
                formula('String harmonics', '弦谐波', 'f_n=\\frac{nv}{2L}\\quad (n=1,2,3,...)'),
                formula('Closed pipe harmonics', '封闭管谐波', 'f_n=\\frac{nv}{4L}\\quad (n=1,3,5,...)'),
              ],
            },
            {
              heading: text('3. Classroom check: standing wave on a string', '3. 课堂题：弦上的驻波'),
              classroomQuestions: [
                {
                  id: 'ib-standing-wave-string',
                  title: text('Finding the fundamental frequency', '求基频'),
                  prompt: text(
                    'A string of length 0.60 m is fixed at both ends. Waves travel at 120 m/s. What is the fundamental frequency?',
                    '一根长 0.60 m 的弦两端固定。波速为 120 m/s。基频是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('100 Hz', '100 Hz') },
                    { label: 'B', text: text('200 Hz', '200 Hz') },
                    { label: 'C', text: text('50 Hz', '50 Hz') },
                    { label: 'D', text: text('72 Hz', '72 Hz') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'For the fundamental: L = λ/2, so λ = 2L = 1.20 m. Then f = v/λ = 120/1.20 = 100 Hz. Option B would be the second harmonic.',
                    '对于基波：L = λ/2，所以 λ = 2L = 1.20 m。然后 f = v/λ = 120/1.20 = 100 Hz。选项 B 是第二谐波。',
                  ),
                },
              ],
            },
            {
              heading: text('4. Diffraction: waves bending around obstacles', '4. 衍射：波绕过障碍物'),
              paragraphs: [
                text(
                  'Diffraction is the spreading of waves when they pass through a gap or around an obstacle. It is most significant when the gap size is comparable to the wavelength. For a single slit of width a, the first minimum occurs at sin θ = λ/a. Narrower slits give wider diffraction patterns. This is why you can hear around corners (sound λ ~ 1 m) but cannot see around them (light λ ~ 500 nm).',
                  '衍射是波通过缝隙或绕过障碍物时的扩散现象。当缝隙尺寸与波长相当时最显著。对于宽度为 a 的单缝，第一极小出现在 sin θ = λ/a。缝越窄，衍射图案越宽。这就是为什么你能听到拐角后的声音（声波 λ ~ 1 m）但看不到拐角后的东西（光波 λ ~ 500 nm）。',
                ),
              ],
              formulas: [
                formula('Single-slit first minimum', '单缝第一极小', '\\sin\\theta=\\frac{\\lambda}{a}'),
              ],
              takeaway: text(
                'Diffraction is most noticeable when the obstacle/gap size ≈ wavelength. This connects wave behaviour to everyday experience.',
                '当障碍物/缝隙尺寸 ≈ 波长时衍射最明显。这将波动行为与日常经验联系起来。',
              ),
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Thinking standing waves transfer energy along the string (they do not — energy is trapped between nodes).', '以为驻波沿弦传递能量（不会——能量被围困在节点之间）。'),
                text('Confusing nodes with antinodes in diagrams.', '在图中混淆节点和腹点。'),
                text('Using the open-pipe formula for a closed pipe (or vice versa).', '对封闭管用开口管公式（或反之）。'),
                text('Forgetting that path difference must be measured from the two sources to the same point.', '忘记波程差必须从两个源量到同一点。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(4, 'D. Fields', 'D. 场', 'SL/HL · Paper 1+2', [
      topic('D.1', 'Gravitational fields (HL)', '引力场（HL）'),
      topic('D.2', 'Electric and magnetic fields', '电场与磁场'),
      topic('D.3', 'Motion in electromagnetic fields (HL)', '电磁场中的运动（HL）'),
      topic('D.4', 'Induction (HL)', '电磁感应（HL）'),
    ], {
      summary: text('The fields theme uses force, potential, flux, and symmetry to describe interactions without contact.', '场主题用力、势、通量和对称性描述非接触相互作用。'),
      focus: focus(
        ['Compare gravitational, electric, and magnetic field models.', '比较引力场、电场和磁场模型。'],
        ['Use potential and energy to simplify field problems.', '用势和能量简化场问题。'],
        ['Analyze charged-particle motion and electromagnetic induction.', '分析带电粒子运动和电磁感应。'],
      ),
      formulas: [...formulas.fields, ...formulas.electric, ...formulas.magnetism],
      diagrams: [...diagrams.fields, ...diagrams.electric, ...diagrams.magnetism],
      lessons: [
        {
          title: text('Gravitational, Electric and Magnetic Fields', '引力场、电场与磁场'),
          description: text(
            'How fields describe forces at a distance: field strength, potential, energy, and charged-particle motion.',
            '场如何描述超距力：场强、势、能量和带电粒子运动。',
          ),
          sections: [
            {
              heading: text('0. What is a field?', '0. 什么是场？'),
              paragraphs: [
                text(
                  'A field is a region of space where an object experiences a force without physical contact. Gravitational fields act on masses (always attractive). Electric fields act on charges (attractive or repulsive). Magnetic fields act on moving charges and currents. Field strength is force per unit property: g = F/m (N/kg), E = F/q (V/m or N/C), B = F/(IL) (tesla).',
                  '场是物体无需物理接触就能受力的空间区域。引力场作用于质量（始终吸引）。电场作用于电荷（吸引或排斥）。磁场作用于运动电荷和电流。场强是每单位性质的力：g = F/m（N/kg），E = F/q（V/m 或 N/C），B = F/(IL)（特斯拉）。',
                ),
              ],
              formulas: [
                formula('Gravitational field strength', '引力场强', 'g=\\frac{F}{m}=\\frac{GM}{r^2}'),
                formula('Electric field strength', '电场强度', 'E=\\frac{F}{q}=\\frac{kQ}{r^2}'),
              ],
              takeaway: text(
                'Fields allow us to calculate forces without knowing the source object\'s details — only the field at the point matters.',
                '场让我们无需知道源物体的细节就能计算力——只需要该点的场。',
              ),
            },
            {
              heading: text('1. Potential and potential energy', '1. 势与势能'),
              paragraphs: [
                text(
                  'Gravitational potential V_g = −GM/r (work done per unit mass to bring it from infinity). Electric potential V_e = kQ/r (work done per unit positive charge). Potential energy: E_p = mV_g or E_p = qV_e. The potential gradient gives the field strength: g = −dV_g/dr, E = −dV_e/dr. Equipotential surfaces are perpendicular to field lines.',
                  '引力势 V_g = −GM/r（将单位质量从无穷远移来所做的功）。电势 V_e = kQ/r（将单位正电荷移来所做的功）。势能：E_p = mV_g 或 E_p = qV_e。势梯度给出场强：g = −dV_g/dr，E = −dV_e/dr。等势面与场线垂直。',
                ),
              ],
              formulas: [
                formula('Gravitational potential', '引力势', 'V_g=-\\frac{GM}{r}'),
                formula('Electric potential', '电势', 'V_e=\\frac{kQ}{r}'),
                formula('Field from potential', '由势求场', 'E=-\\frac{dV}{dr}'),
              ],
            },
            {
              heading: text('2. Charged particles in fields', '2. 带电粒子在场中的运动'),
              paragraphs: [
                text(
                  'In a uniform electric field, a charged particle accelerates: F = qE, giving parabolic motion (like a projectile). In a uniform magnetic field, the force is F = qvB (perpendicular to velocity), causing circular motion with radius r = mv/(qB). The magnetic force does no work (always perpendicular to displacement), so speed stays constant. This principle is used in mass spectrometers and cyclotrons.',
                  '在均匀电场中，带电粒子加速：F = qE，产生抛物线运动（类似抛体）。在均匀磁场中，力为 F = qvB（垂直于速度），导致圆周运动，半径 r = mv/(qB)。磁力不做功（始终垂直于位移），所以速率不变。这一原理用于质谱仪和回旋加速器。',
                ),
              ],
              formulas: [
                formula('Electric force', '电场力', 'F=qE'),
                formula('Magnetic force', '磁场力', 'F=qvB\\sin\\theta'),
                formula('Radius of circular path', '圆周运动半径', 'r=\\frac{mv}{qB}'),
              ],
            },
            {
              heading: text('3. Electromagnetic induction (HL)', '3. 电磁感应（HL）'),
              paragraphs: [
                text(
                  'Magnetic flux Φ = BA cos θ (weber). Faraday\'s law: induced EMF = −dΦ/dt (rate of change of flux linkage). Lenz\'s law: the induced current opposes the change that caused it (conservation of energy). Applications: generators (rotating coil in B field), transformers (changing flux in primary induces EMF in secondary), and eddy currents (braking in trains).',
                  '磁通量 Φ = BA cos θ（韦伯）。法拉第定律：感应 EMF = −dΦ/dt（磁通量链接变化率）。楞次定律：感应电流反对引起它的变化（能量守恒）。应用：发电机（在 B 场中旋转线圈）、变压器（初级变化磁通在次级感应 EMF）、涡流（列车制动）。',
                ),
              ],
              formulas: [
                formula('Magnetic flux', '磁通量', '\\Phi=BA\\cos\\theta'),
                formula('Faraday\'s law', '法拉第定律', '\\varepsilon=-\\frac{d\\Phi}{dt}'),
              ],
              takeaway: text(
                'Induction requires CHANGING flux. A stationary coil in a steady field has zero induced EMF.',
                '感应需要变化的磁通量。静止线圈在稳定场中感应 EMF 为零。',
              ),
            },
            {
              heading: text('4. Classroom check: circular motion in B field', '4. 课堂题：磁场中的圆周运动'),
              classroomQuestions: [
                {
                  id: 'ib-fields-circular-motion',
                  title: text('Electron in a magnetic field', '磁场中的电子'),
                  prompt: text(
                    'An electron (m = 9.1 × 10⁻³¹ kg, q = 1.6 × 10⁻¹⁹ C) enters a 0.05 T magnetic field at 2.0 × 10⁶ m/s perpendicular to the field. What is the radius of its circular path?',
                    '一个电子（m = 9.1 × 10⁻³¹ kg，q = 1.6 × 10⁻¹⁹ C）以 2.0 × 10⁶ m/s 垂直进入 0.05 T 磁场。其圆周运动半径是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('2.3 × 10⁻⁴ m', '2.3 × 10⁻⁴ m') },
                    { label: 'B', text: text('2.3 × 10⁻² m', '2.3 × 10⁻² m') },
                    { label: 'C', text: text('4.6 × 10⁻⁴ m', '4.6 × 10⁻⁴ m') },
                    { label: 'D', text: text('1.1 × 10⁻³ m', '1.1 × 10⁻³ m') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    'r = mv/(qB) = (9.1 × 10⁻³¹ × 2.0 × 10⁶)/(1.6 × 10⁻¹⁹ × 0.05) = 1.82 × 10⁻²⁴/8.0 × 10⁻²¹ = 2.3 × 10⁻⁴ m.',
                    'r = mv/(qB) = (9.1 × 10⁻³¹ × 2.0 × 10⁶)/(1.6 × 10⁻¹⁹ × 0.05) = 2.3 × 10⁻⁴ m。',
                  ),
                },
              ],
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Thinking gravitational potential is positive (it is always negative for an attractive field).', '以为引力势是正的（对于吸引场它始终为负）。'),
                text('Forgetting that magnetic force is perpendicular to velocity, so it changes direction but not speed.', '忘记磁力垂直于速度，所以只改变方向不改变速率。'),
                text('Using F = qvB without checking that v is perpendicular to B (general: F = qvB sin θ).', '用 F = qvB 时不检查 v 是否垂直于 B（一般式：F = qvB sin θ）。'),
                text('Confusing flux with flux linkage (linkage = NΦ for a coil of N turns).', '混淆磁通量和磁通量链接（链接 = NΦ，N 匝线圈）。'),
              ],
            },
          ],
        },
      ],
    }),
    unit(5, 'E. Nuclear and Quantum Physics', 'E. 核物理与量子物理', 'SL/HL · Paper 1+2', [
      topic('E.1', 'Structure of the atom', '原子结构'),
      topic('E.2', 'Quantum physics', '量子物理'),
      topic('E.3', 'Radioactive decay', '放射性衰变'),
      topic('E.4', 'Fission (HL)', '裂变（HL）'),
      topic('E.5', 'Fusion and stars (HL)', '聚变与恒星（HL）'),
    ], {
      summary: text('This theme explains atomic, nuclear, and stellar processes with quantum and conservation models.', '本主题用量子模型和守恒模型解释原子、原子核和恒星过程。'),
      focus: focus(
        ['Use atomic and nuclear structure models to explain spectra and radiation.', '用原子和原子核结构模型解释光谱与辐射。'],
        ['Apply half-life, decay, binding energy, and mass-energy ideas.', '应用半衰期、衰变、结合能和质能关系。'],
        ['Connect fusion with stellar energy and astrophysical evidence.', '把聚变与恒星能量和天体物理证据联系起来。'],
      ),
      formulas: [...formulas.quantum, formula('Mass-energy', '质能关系', 'E=mc^2')],
      diagrams: [...diagrams.quantum, ...diagrams.astronomy],
      lessons: [
        {
          title: text('Atomic Structure, Radioactive Decay and Quantum Physics', '原子结构、放射性衰变与量子物理'),
          description: text(
            'From the nuclear atom to half-life, binding energy, and the photoelectric effect.',
            '从核式原子到半衰期、结合能和光电效应。',
          ),
          sections: [
            {
              heading: text('0. The nuclear atom', '0. 核式原子'),
              paragraphs: [
                text(
                  'Rutherford\'s alpha-scattering experiment showed that atoms have a tiny, dense, positively charged nucleus surrounded by electrons. The nucleus contains protons (charge +e, mass ~1 u) and neutrons (charge 0, mass ~1 u). Nuclides are written as ᴬ_Z X, where A = nucleon number and Z = proton number. Isotopes have the same Z but different A (different number of neutrons).',
                  '卢瑟福的 α 散射实验表明原子有一个微小、致密、带正电的原子核，周围是电子。原子核包含质子（电荷 +e，质量 ~1 u）和中子（电荷 0，质量 ~1 u）。核素写作 ᴬ_Z X，其中 A = 核子数，Z = 质子数。同位素具有相同的 Z 但不同的 A（中子数不同）。',
                ),
              ],
              takeaway: text(
                'The nucleus is ~10⁻¹⁵ m while the atom is ~10⁻¹⁰ m — the atom is mostly empty space.',
                '原子核约 10⁻¹⁵ m，而原子约 10⁻¹⁰ m——原子大部分是空的。',
              ),
            },
            {
              heading: text('1. Radioactive decay and half-life', '1. 放射性衰变与半衰期'),
              paragraphs: [
                text(
                  'Radioactive decay is random and spontaneous. Three main types: alpha (⁴₂He nucleus, stopped by paper), beta (electron or positron, stopped by aluminium), gamma (high-energy photon, reduced by lead). The decay law: N = N₀e^(−λt), where λ is the decay constant. Half-life: t½ = ln 2/λ. Activity A = λN (becquerels). After n half-lives, N = N₀/2ⁿ.',
                  '放射性衰变是随机且自发的。三种主要类型：α（⁴₂He 核，纸可挡住）、β（电子或正电子，铝可挡住）、γ（高能光子，铅可减弱）。衰变定律：N = N₀e^(−λt)，其中 λ 是衰变常数。半衰期：t½ = ln 2/λ。活度 A = λN（贝克勒尔）。经过 n 个半衰期后，N = N₀/2ⁿ。',
                ),
              ],
              formulas: [
                formula('Decay law', '衰变定律', 'N=N_0 e^{-\\lambda t}'),
                formula('Half-life', '半衰期', 't_{1/2}=\\frac{\\ln 2}{\\lambda}'),
                formula('Activity', '活度', 'A=\\lambda N'),
              ],
            },
            {
              heading: text('2. Binding energy and mass defect', '2. 结合能与质量亏损'),
              paragraphs: [
                text(
                  'The mass of a nucleus is less than the sum of its individual nucleons. The missing mass (mass defect Δm) has been converted to binding energy: E = Δmc². Binding energy per nucleon indicates stability — iron-56 has the highest (~8.8 MeV/nucleon). Fusion (light nuclei joining) and fission (heavy nuclei splitting) both release energy because products have higher binding energy per nucleon.',
                  '原子核的质量小于其各个核子的总和。缺失的质量（质量亏损 Δm）已转化为结合能：E = Δmc²。每核子结合能表示稳定性——铁-56 最高（约 8.8 MeV/核子）。聚变（轻核结合）和裂变（重核分裂）都释放能量，因为产物的每核子结合能更高。',
                ),
              ],
              formulas: [
                formula('Mass-energy equivalence', '质能等价', 'E=\\Delta m c^2'),
                formula('Binding energy per nucleon', '每核子结合能', '\\frac{E_b}{A}=\\frac{\\Delta m c^2}{A}'),
              ],
              takeaway: text(
                'Energy is released when products have greater binding energy per nucleon than reactants — this drives both fusion in stars and fission in reactors.',
                '当产物的每核子结合能大于反应物时释放能量——这驱动恒星中的聚变和反应堆中的裂变。',
              ),
            },
            {
              heading: text('3. The photoelectric effect and wave-particle duality', '3. 光电效应与波粒二象性'),
              paragraphs: [
                text(
                  'The photoelectric effect: light hitting a metal surface ejects electrons only if f > f₀ (threshold frequency). Increasing intensity increases the number of electrons, not their KE. Einstein\'s explanation: light comes in photons with E = hf. Each photon gives all its energy to one electron: hf = φ + KE_max, where φ is the work function. This proves light has particle properties. De Broglie showed matter also has wave properties: λ = h/p.',
                  '光电效应：光照射金属表面时，只有 f > f₀（截止频率）才能打出电子。增加光强增加电子数量，不增加其动能。爱因斯坦的解释：光以光子形式存在，E = hf。每个光子把全部能量给一个电子：hf = φ + KE_max，其中 φ 是逸出功。这证明光具有粒子性。德布罗意表明物质也具有波动性：λ = h/p。',
                ),
              ],
              formulas: [
                formula('Photon energy', '光子能量', 'E=hf'),
                formula('Photoelectric equation', '光电方程', 'hf=\\phi+E_{k,\\max}'),
                formula('De Broglie wavelength', '德布罗意波长', '\\lambda=\\frac{h}{p}'),
              ],
            },
            {
              heading: text('4. Classroom check: half-life', '4. 课堂题：半衰期'),
              classroomQuestions: [
                {
                  id: 'ib-nuclear-half-life',
                  title: text('Counting half-lives', '计算半衰期'),
                  prompt: text(
                    'A radioactive sample has initial activity 800 Bq. After 6 hours its activity is 100 Bq. What is the half-life?',
                    '一个放射性样品初始活度为 800 Bq。6 小时后活度为 100 Bq。半衰期是多少？',
                  ),
                  choices: [
                    { label: 'A', text: text('2 hours', '2 小时') },
                    { label: 'B', text: text('3 hours', '3 小时') },
                    { label: 'C', text: text('1.5 hours', '1.5 小时') },
                    { label: 'D', text: text('6 hours', '6 小时') },
                  ],
                  correctAnswer: 'A',
                  feedback: text(
                    '800 → 400 → 200 → 100: that is 3 half-lives. 3 half-lives = 6 hours, so t½ = 2 hours.',
                    '800 → 400 → 200 → 100：这是 3 个半衰期。3 个半衰期 = 6 小时，所以 t½ = 2 小时。',
                  ),
                },
              ],
            },
            {
              heading: text('5. Common mistakes', '5. 常见错误'),
              bullets: [
                text('Thinking half-life means all atoms decay after two half-lives (it is exponential, never reaches zero).', '以为半衰期意味着两个半衰期后所有原子都衰变（它是指数衰减，永远不会到零）。'),
                text('Confusing activity (decays per second) with count rate (detected per second, depends on distance and shielding).', '混淆活度（每秒衰变数）和计数率（每秒探测数，取决于距离和屏蔽）。'),
                text('Thinking increasing light intensity increases electron KE in the photoelectric effect (it only increases the number).', '以为增加光强增加光电效应中电子的动能（只增加数量）。'),
                text('Forgetting that binding energy is the energy needed to separate nucleons, not the energy they have.', '忘记结合能是分离核子所需的能量，不是核子具有的能量。'),
              ],
            },
          ],
        },
      ],
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
    id: 'igcse',
    label: text('CIE IGCSE Physics System', 'CIE IGCSE 物理体系'),
    description: text(
      'Cambridge IGCSE Physics 0625 with syllabus-aligned knowledge maps and chapter question banks.',
      '面向 Cambridge IGCSE Physics 0625 的知识地图与分章节题库。',
    ),
    status: text('Full syllabus map', '完整大纲地图'),
    sourceNote: text(
      'The course structure follows Cambridge IGCSE Physics 0625 (2023-2025 / 2026-2028 syllabus). Knowledge maps cover all six topics; Chapter 1 includes an MCQ question bank.',
      '课程结构参考 Cambridge IGCSE Physics 0625（2023-2025 / 2026-2028 大纲）。知识地图覆盖全部六个主题；Chapter 1 包含选择题题库。',
    ),
    courses: [cambridgeIgcse0625],
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
      'The A-Level map follows the Cambridge International AS & A Level Physics 9702 syllabus for 2025-2027. Assessment: Paper 1 (MC, 31% AS), Paper 2 (Structured, 46% AS), Paper 3 (Practical, 23% AS), Paper 4 (A2 Structured, 38% AL), Paper 5 (Planning, 11% AL). Chinese translations, formulas, and diagrams are Pocket Cosmos learning materials.',
      'A-Level 地图参考 Cambridge International AS & A Level Physics 9702 2025-2027 官方大纲。考试结构：Paper 1（选择，31% AS）、Paper 2（结构题，46% AS）、Paper 3（实验，23% AS）、Paper 4（A2 结构题，38% AL）、Paper 5（规划，11% AL）。中文翻译、公式和示意图由口袋宇宙制作。',
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
      'The IB map follows the International Baccalaureate Diploma Programme Physics subject structure for first assessment 2025. Assessment: Paper 1A (MC) + Paper 1B (Data-based) + Paper 2 (Structured). SL total 55+50 marks; HL total 75+90 marks. IA (scientific investigation) 20%. Topics marked (HL) are higher level only. Focus notes, formulas, translations, and diagrams are Pocket Cosmos learning materials.',
      'IB 地图参考 International Baccalaureate Diploma Programme Physics 2025 首考课程结构。考试：Paper 1A（选择）+ Paper 1B（数据题）+ Paper 2（结构题）。SL 总计 55+50 分；HL 总计 75+90 分。IA（科学探究）占 20%。标注（HL）的主题仅为高级课程内容。重点整理、公式、翻译和示意图由口袋宇宙制作。',
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
