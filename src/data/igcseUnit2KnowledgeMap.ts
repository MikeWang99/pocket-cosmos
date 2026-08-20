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

const deckImage = (
  filename: string,
  altEn: string,
  altZh: string,
  captionEn: string,
  captionZh: string,
): CurriculumImage => ({
  src: `/curriculum-assets/igcse-0625/unit-2/${filename}`,
  alt: text(altEn, altZh),
  caption: text(captionEn, captionZh),
});

const studentVersion = (
  title: LocalizedText,
  description: LocalizedText,
  sections: CurriculumLessonContent['sections'],
): CurriculumLessonContent => ({
  title,
  description,
  sections,
});

const particleCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'multiple_choice',
  title: text('Quick check: Brownian motion', '快速检测：布朗运动'),
  prompt: text(
    'Which statement best explains why a visible smoke particle moves in a random zig-zag path?',
    '下列哪项最能解释可见烟尘微粒为什么会沿锯齿状随机路径运动？',
  ),
  choices: [
    { label: 'A', text: text('The smoke particle is itself a molecule moving freely in air.', '烟尘微粒本身就是一个在空气中自由运动的分子。') },
    { label: 'B', text: text('Uneven collisions from much smaller air molecules keep changing its momentum.', '来自更小空气分子的不均匀碰撞不断改变它的动量。') },
    { label: 'C', text: text('The smoke particle is pulled alternately by gravity and upthrust.', '烟尘微粒会被重力和浮力轮流拉动。') },
    { label: 'D', text: text('The smoke particle gains charge and is repelled by the container wall.', '烟尘微粒带电后被容器壁排斥。') },
  ],
  correctAnswer: 'B',
  feedback: text(
    'Brownian motion is evidence for the kinetic particle model because the visible microscopic particle is continually hit from different directions by much smaller, fast-moving molecules.',
    '布朗运动之所以能证明粒子模型，是因为可见微粒会持续受到更小、更快的分子从不同方向的碰撞。',
  ),
});

const evaporationCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'written',
  title: text('Quick check: evaporation versus boiling', '快速检测：蒸发与沸腾'),
  prompt: text(
    'State two differences between evaporation and boiling, then explain why evaporation cools the remaining liquid.',
    '写出蒸发与沸腾的两个区别，并解释为什么蒸发会使剩余液体降温。',
  ),
  sampleAnswer: text(
    'Evaporation happens only at the surface and can occur at any temperature; boiling happens throughout the liquid at a fixed temperature for a given pressure. Evaporation cools the liquid because faster particles escape first, so the average kinetic energy of the particles left behind becomes smaller.',
    '蒸发只发生在液体表面，并且可在任何温度下进行；沸腾发生在整个液体内部，并且在给定压强下对应固定温度。蒸发会使液体降温，因为先逃逸的是能量更高的粒子，留下粒子的平均动能变小。',
  ),
  explanation: text(
    'A good answer separates “where it happens” from “when it happens”, then connects cooling to average particle kinetic energy rather than to “cold leaving the liquid”.',
    '优秀答案需要把“发生位置”和“发生条件”分开说清，再把降温与粒子平均动能下降联系起来，而不是说“冷气离开了液体”。',
  ),
});

const radiationCheck = (id: string): CurriculumClassroomQuestion => ({
  id,
  mode: 'multiple_choice',
  title: text('Quick check: radiation surfaces', '快速检测：辐射与表面'),
  prompt: text(
    'Two identical cans contain hot water at the same temperature. One is matt black and one is shiny silver. Which statement is correct?',
    '两个完全相同的容器装有同温度的热水。一个为暗黑粗糙表面，一个为银白光亮表面。哪项说法正确？',
  ),
  choices: [
    { label: 'A', text: text('The shiny silver can cools faster because it reflects more radiation away.', '银白光亮容器冷却更快，因为它反射更多辐射。') },
    { label: 'B', text: text('The matt black can cools faster because it is a better emitter of infrared radiation.', '暗黑粗糙容器冷却更快，因为它是更好的红外辐射发射体。') },
    { label: 'C', text: text('Both cool at the same rate because their water temperatures are equal.', '两者降温速率相同，因为水温相同。') },
    { label: 'D', text: text('The silver can cools faster because shiny surfaces absorb better.', '银白容器冷却更快，因为光亮表面吸收更强。') },
  ],
  correctAnswer: 'B',
  feedback: text(
    'For thermal radiation, good absorbers are also good emitters. Dull black surfaces emit infrared more effectively, so they lose thermal energy faster when other factors are the same.',
    '在热辐射中，良好的吸收体通常也是良好的发射体。暗黑粗糙表面更容易发射红外线，因此在其他条件相同时散失热能更快。',
  ),
});

const kineticParticleModelLesson: CurriculumLesson = {
  title: text('2.1 Kinetic Particle Model of Matter', '2.1 物质的粒子模型'),
  description: text(
    'Use particle ideas to explain states of matter, Brownian motion, gas pressure, and the kelvin scale.',
    '用粒子模型解释物态、布朗运动、气体压强以及开尔文温标。',
  ),
  sections: [
    {
      heading: text('0. Hook: why can perfume spread across a room?', '0. 引入：香水为什么会自己飘满整个房间？'),
      paragraphs: [
        text(
          'A perfume bottle does not spray molecules directly into every corner, yet after a short time the smell can be detected across the room. This chapter begins with that kind of observation: matter must be made of tiny particles that move, spread, collide, and respond to temperature changes.',
          '香水并不会直接把分子喷到房间每个角落，但过一会儿整个房间都能闻到味道。这类现象说明：物质一定由会运动、会扩散、会碰撞并且会随温度变化的微小粒子组成。',
        ),
      ],
      takeaway: text(
        'The particle model is introduced because it explains visible macroscopic behaviour using invisible microscopic motion.',
        '引入粒子模型，是为了用看不见的微观运动解释看得见的宏观现象。',
      ),
    },
    {
      heading: text('1. States of matter and particle diagrams', '1. 物态与粒子示意图'),
      images: [
        deckImage(
          'thermal-particle-states.png',
          'Three particle-model pictures showing solid, liquid, and gas states.',
          '展示固体、液体和气体三种状态的粒子模型图。',
          'Particle model: solid, liquid, and gas.',
          '粒子模型：固体、液体和气体。',
        ),
        {
          src: '/curriculum-assets/igcse-0625/unit-2/state-change-triangle.svg',
          alt: text(
            'Triangle diagram showing state changes between solid, liquid, and gas, including melting, freezing or solidification, vaporization, and condensation.',
            '展示 solid、liquid 和 gas 之间状态变化的三角图，包括 melting、freezing/solidification、vaporization 和 condensation。',
          ),
          caption: text(
            'State changes between solid, liquid, and gas.',
            '固体、液体和气体之间的状态变化。',
          ),
        },
      ],
      paragraphs: [
        text(
          'Solids have a fixed shape and volume, liquids have a fixed volume but not a fixed shape, and gases have neither fixed shape nor fixed volume. In particle terms, solids have closely packed particles vibrating about fixed positions, liquids have particles that remain close but can move past one another, and gases have widely separated particles moving rapidly and randomly.',
          '固体有固定形状和固定体积，液体有固定体积但没有固定形状，气体既没有固定形状也没有固定体积。用粒子模型描述时：固体粒子紧密排列并在固定位置附近振动；液体粒子彼此靠近但能相互滑过；气体粒子间距很大并快速、无规则运动。',
        ),
        text(
          'Simple particle diagrams must show relative arrangement, spacing and motion correctly. A common mistake is to draw larger particles when a substance is heated. The particle size is not the point that changes; average separation and motion are.',
          '粒子示意图必须正确体现相对排列、间距和运动。常见错误是把“受热后粒子画大”。真正改变的不是粒子本身大小，而是平均间距和运动状态。',
        ),
        text(
          'The state of a substance is determined by the competition between particle motion and attractive forces. In a solid, attraction is strong enough to hold particles in an ordered structure. In a liquid, attraction still keeps particles close together, but the particles have enough energy to move around each other. In a gas, particle energy is high enough that the attractive forces no longer keep the particles close together.',
          '物质处于哪种状态，取决于粒子运动与粒子间吸引力之间的竞争。在固体中，吸引力足以把粒子固定在有序结构中；在液体中，吸引力仍然能让粒子彼此靠近，但粒子已经有足够能量相互滑动；在气体中，粒子能量高到足以摆脱这种近距离束缚。',
        ),
        text(
          'This is why solids resist shape change, liquids flow but are difficult to compress, and gases both flow and compress easily. The macroscopic properties are therefore not random facts to memorise: they come from arrangement, separation, and motion of particles.',
          '这也解释了为什么固体抗拒形状改变，液体会流动但不容易被压缩，而气体既能流动又容易压缩。也就是说，这些宏观性质并不是零散事实，而是由粒子的排列、间距和运动方式决定的。',
        ),
      ],
      table: {
        caption: text(
          'Particle-model comparison across the three most commonly tested dimensions: motion, separation, and arrangement.',
          '按最常被考查的三个维度比较三种粒子状态：motion、separation 和 arrangement。',
        ),
        headers: [
          text('Dimension', '维度'),
          text('Solid', 'Solid'),
          text('Liquid', 'Liquid'),
          text('Gas', 'Gas'),
        ],
        rows: [
          [
            text('Motion', 'Motion'),
            text('Particles vibrate about fixed positions.', '粒子在固定位置附近振动。'),
            text('Particles move or slide past one another.', '粒子能够彼此移动或滑过。'),
            text('Particles move rapidly and randomly in all directions.', '粒子向各个方向快速、无规则运动。'),
          ],
          [
            text('Separation', 'Separation'),
            text('Particles are very close together.', '粒子彼此非常接近。'),
            text('Particles are close together, with slightly larger separation than in a solid.', '粒子彼此接近，但平均间距略大于固体。'),
            text('Particles are far apart from one another.', '粒子彼此相距很远。'),
          ],
          [
            text('Arrangement', 'Arrangement'),
            text('Particles are in a regular, ordered arrangement.', '粒子规则、有序排列。'),
            text('Particles are close together but irregularly arranged.', '粒子彼此接近，但排列不规则。'),
            text('Particles have no regular arrangement.', '粒子没有规则排列。'),
          ],
        ],
      },
      bullets: [
        text('Required state changes: melting, freezing/solidification, boiling, evaporation, condensation.', '要求掌握的物态变化：熔化、凝固/冻结、沸腾、蒸发、凝结。'),
        text('Direct solid-gas changes are called sublimation and deposition; check the syllabus scope before treating them as required terms.', '固体与气体之间的直接转化称为 sublimation 和 deposition；是否作为必考术语应以大纲范围为准。'),
        text('When drawing particle diagrams, compare spacing and order first; motion arrows or vibration marks come after that.', '画粒子图时，先比较间距和有序程度，再考虑是否需要用箭头或振动痕迹表示运动。'),
        text('A gas fills the whole container because its particles move freely in all directions, not because the container “pulls” the gas outward.', '气体会充满整个容器，是因为粒子向各个方向自由运动，而不是因为容器把气体“拉开”。'),
      ],
      takeaway: text(
        'If you can explain arrangement, separation, motion, and attractive forces, you can explain most state-of-matter questions without memorising separate sentences for each state.',
        '如果你能解释粒子的排列、间距、运动和吸引力，就能自己推出大部分三态问题，而不必死记每一种状态的独立句子。',
      ),
    },
    {
      heading: text('2. Temperature, internal motion, and absolute zero', '2. 温度、粒子运动与绝对零度'),
      paragraphs: [
        text(
          'Temperature is linked to the average kinetic energy of particles. Higher temperature means particles move, vibrate, or travel faster on average. The syllabus requires the idea that there is a lowest possible temperature, $-273\\,^{\\circ}\\mathrm{C}$, where particles have the least kinetic energy.',
          '温度与粒子的平均动能有关。温度越高，粒子的平均运动、振动或平动速度越大。大纲要求理解存在一个最低可能温度，即 $-273\\,^{\\circ}\\mathrm{C}$，此时粒子具有最小动能。',
        ),
        text(
          'For scientific work, the kelvin scale is often more useful because it starts from this absolute reference point. Temperature intervals in kelvin and degrees Celsius are the same size.',
          '在科学研究中，开尔文温标往往更方便，因为它从这个绝对参考点开始。开尔文与摄氏度的温差大小相同。',
        ),
        text(
          'Temperature is often confused with total thermal energy. A large bucket of warm water and a small spoon of warm water can be at the same temperature because the average kinetic energy per particle is the same, even though the bucket contains much more total internal energy.',
          '温度常常会与总热能混淆。比如，一大桶温水和一勺温水可以有相同温度，因为它们的粒子平均动能可以相同；但那并不意味着它们含有相同的总内能。',
        ),
        text(
          'Absolute zero should be understood as the lowest possible temperature in this model. In exam answers, it is safer to say that particles have the least possible kinetic energy there, rather than making stronger statements that go beyond the syllabus wording.',
          '绝对零度在本课程里应理解为最低可能温度。考试中更稳妥的表达是：此时粒子具有最小可能动能，而不要写出超出大纲措辞范围的更强断言。',
        ),
      ],
      formulas: [
        formula('Kelvin conversion', '开尔文换算', 'T\\,(\\mathrm{K})=\\theta\\,(^{\\circ}\\mathrm{C})+273'),
      ],
      bullets: [
        text('A temperature change of $1\\,\\mathrm{K}$ is the same size as a temperature change of $1\\,^{\\circ}\\mathrm{C}$.', '$1\\,\\mathrm{K}$ 的温差与 $1\\,^{\\circ}\\mathrm{C}$ 的温差大小相同。'),
        text('Kelvin is preferred in gas-law work because the zero point has physical meaning.', '在气体相关内容中更偏向使用开尔文，是因为它的零点具有明确物理意义。'),
      ],
      takeaway: text(
        'Temperature is not “how much heat an object has”; it tracks average particle kinetic energy.',
        '温度并不是“物体里有多少热量”，而是反映粒子的平均动能。',
      ),
    },
    {
      heading: text('3. Brownian motion as evidence', '3. 布朗运动作为证据'),
      images: [
        deckImage(
          'brownian-motion-setup.png',
          'Brownian motion observation, smoke-cell setup, and microscope.',
          '布朗运动观察图、烟室装置与显微镜示意。',
          'Brownian motion and smoke-cell observation.',
          '布朗运动与烟室观察装置。',
        ),
      ],
      paragraphs: [
        text(
          'Brownian motion is the random motion of visible microscopic particles suspended in a gas or liquid. It is evidence for the kinetic particle model because those visible particles are repeatedly struck from different directions by much smaller atoms or molecules in the surrounding fluid.',
          '布朗运动是悬浮在气体或液体中的可见微粒所做的无规则运动。它能作为粒子模型的证据，是因为这些可见微粒会持续受到周围流体中更小的原子或分子从不同方向的碰撞。',
        ),
        text(
          'A key syllabus distinction is that the visible microscopic particles are not themselves the atoms or molecules. These two levels are often collapsed into one idea, which makes explanations less accurate.',
          '大纲特别强调：可见微粒本身并不是原子或分子。这两层概念很容易被混为一谈，从而导致解释失准。',
        ),
      ],
      classroomQuestions: [particleCheck('igcse-u2-brownian-check')],
    },
    {
      heading: text('4. Gas pressure and changes in pressure', '4. 气体压强与压强变化'),
      paragraphs: [
        text(
          'Gas pressure arises because gas particles collide with the walls of a container. Each collision changes momentum and therefore exerts a force on the wall. Pressure is force per unit area, so more frequent collisions or larger momentum changes produce greater pressure.',
          '气体压强产生于气体粒子与容器壁的碰撞。每次碰撞都会引起动量变化，因此会对容器壁施力。压强是单位面积所受的力，所以碰撞越频繁，或者单次动量变化越大，压强就越大。',
        ),
        text(
          'For a fixed mass of gas, increasing temperature at constant volume makes particles move faster, so wall collisions become more forceful and pressure rises. At constant temperature, reducing volume shortens the distance between wall collisions and pressure rises.',
          '对一定质量的气体来说，体积不变时升温会使粒子运动更快，因此撞壁更猛烈，压强增大；温度不变时减小体积会缩短撞壁间隔，压强同样增大。',
        ),
        text(
          'It is helpful to separate two common cases. In the first case, volume is fixed and only temperature changes: the particles move faster and each collision transfers more momentum, so the pressure rises. In the second case, temperature is fixed and the volume becomes smaller: particles hit the walls more frequently because the walls are closer together.',
          '把两种常见情形分开来想会更清楚。第一种是体积不变、只升高温度：粒子速度变大，每次碰撞带来的动量变化更大，所以压强增大。第二种是温度不变、体积减小：因为容器壁距离更近，粒子撞壁更频繁，所以压强增大。',
        ),
        text(
          'The Supplement version of this idea is Boyle’s law, written as $pV=\\text{constant}$ for a fixed mass of gas at constant temperature. This equation is not a separate fact from the particle model; it is a mathematical description of the same behaviour.',
          '这一现象在 Supplement 层面的数学表达就是玻意耳定律：对一定质量、温度不变的气体，有 $pV=\\text{constant}$。这个公式并不是脱离粒子模型的另一条新事实，而是同一规律的数学表达。',
        ),
      ],
      formulas: [
        formula('Fixed mass of gas at constant temperature (Supplement)', '定质量气体的玻意耳关系（Supplement）', 'pV=\\text{constant}'),
        formula('Two-state form', '双状态形式', 'p_1V_1=p_2V_2'),
      ],
      bullets: [
        text('Pressure is created by repeated collisions with the wall, not by particles “pressing continuously” like a solid object would.', '压强来自粒子不断撞击容器壁，而不是像固体那样“持续顶住”容器壁。'),
        text('At constant volume: higher temperature → faster particles → larger pressure.', '体积不变时：温度更高 → 粒子更快 → 压强更大。'),
        text('At constant temperature: smaller volume → more frequent wall collisions → larger pressure.', '温度不变时：体积更小 → 撞壁更频繁 → 压强更大。'),
      ],
    },
    {
      heading: text('5. Exam focus and practical expectations', '5. 考试重点与实验要求'),
      bullets: [
        text('Be able to describe the three states using arrangement, separation and motion, not vague words like “tighter” or “looser”.', '要能用“排列、间距、运动”来描述三态，而不是只说“更紧”或“更松”。'),
        text('Brownian motion explanations must mention visible microscopic particles and unseen molecules separately.', '解释布朗运动时，必须区分“可见微粒”和“看不见的分子”。'),
        text('Pressure explanations should connect collisions, momentum change, force and force per unit area.', '解释压强时，要把碰撞、动量变化、力以及单位面积受力串起来。'),
        text('Know how to convert between $^{\\circ}\\mathrm{C}$ and $\\mathrm{K}$ quickly and accurately.', '要能熟练、准确地完成摄氏温度与开尔文的换算。'),
        text('If a question asks for a particle explanation, use particle language all the way through instead of switching back to purely everyday wording.', '如果题目要求用粒子模型解释，就要从头到尾使用粒子语言，而不要中途退回成纯日常表述。'),
        text('For diagram questions, marks are often lost because spacing or order is wrong even when the labels are right.', '在粒子图题中，即使标签写对了，只要间距或有序程度画错，也常常会丢分。'),
      ],
      paragraphs: [
        text(
          'Practical familiarity also matters. The syllabus includes temperature measurement, heating and cooling contexts, and simple observational setups. For this topic, that includes Brownian-motion arrangements, gas-heating situations, and basic comparisons of observable changes under different conditions.',
          '实验熟悉度也很重要。大纲覆盖温度测量、加热与冷却情境以及简单观察型实验。对这一主题来说，这包括识别布朗运动装置、加热气体的情境，以及不同条件下可见变化的基本比较方式。',
        ),
      ],
    },
  ],
  studentVersion: studentVersion(
    text('2.1 Kinetic Particle Model of Matter', '2.1 物质的粒子模型'),
    text(
      'Core particle ideas for states of matter, temperature, Brownian motion, and gas pressure.',
      '关于物态、温度、布朗运动和气体压强的核心粒子模型。',
    ),
    [
      {
        heading: text('1. States and particles', '1. 物态与粒子'),
        paragraphs: [
          text(
            'Solid particles are close together in an ordered arrangement and only vibrate. Liquid particles are still close together but are not fixed in place, so liquids can flow. Gas particles are far apart and move rapidly in random directions, so gases spread out and fill their container.',
            '固体粒子彼此靠近并有序排列，只能振动；液体粒子也彼此靠近，但不固定在原位，因此液体可以流动；气体粒子相距很远并快速无规则运动，因此气体会扩散并充满容器。',
          ),
        ],
        table: {
          caption: text(
            'Quick comparison of particles in solids, liquids, and gases by motion, separation, and arrangement.',
            '按 motion、separation 和 arrangement 快速比较固体、液体和气体中的粒子。',
          ),
          headers: [
            text('Dimension', '维度'),
            text('Solid', 'Solid'),
            text('Liquid', 'Liquid'),
            text('Gas', 'Gas'),
          ],
          rows: [
            [
              text('Motion', 'Motion'),
              text('Vibrate about fixed positions.', '在固定位置附近振动。'),
              text('Move or slide past one another.', '彼此移动或滑过。'),
              text('Move rapidly and randomly.', '快速、无规则运动。'),
            ],
            [
              text('Separation', 'Separation'),
              text('Very close together.', '彼此非常接近。'),
              text('Close together.', '彼此接近。'),
              text('Far apart.', '彼此相距很远。'),
            ],
            [
              text('Arrangement', 'Arrangement'),
              text('Regular and ordered.', '规则、有序排列。'),
              text('Irregular but still close together.', '排列不规则，但仍彼此接近。'),
              text('No regular arrangement.', '没有规则排列。'),
            ],
          ],
        },
        bullets: [
          text('Solid: fixed shape and fixed volume.', '固体：形状固定，体积固定。'),
          text('Liquid: fixed volume, no fixed shape.', '液体：体积固定，形状不固定。'),
          text('Gas: no fixed shape, no fixed volume.', '气体：形状不固定，体积不固定。'),
        ],
      },
      {
        heading: text('2. Temperature, Brownian motion, pressure', '2. 温度、布朗运动、压强'),
        paragraphs: [
          text(
            'Higher temperature means greater average particle kinetic energy. Brownian motion is caused by random collisions from much smaller molecules. Gas pressure is caused by particles colliding with surfaces.',
            '温度越高，粒子的平均动能越大。布朗运动由更小分子的随机碰撞引起。气体压强来自粒子与表面的碰撞。',
          ),
          text(
            'For a fixed mass of gas, heating at constant volume increases pressure. At constant temperature, reducing volume also increases pressure. Kelvin temperature is related to Celsius by $T=\\theta+273$.',
            '对一定质量的气体来说，体积不变时升温会增大压强；温度不变时减小体积也会增大压强。开尔文温度与摄氏温度的关系为 $T=\\theta+273$。',
          ),
        ],
        formulas: [
          formula('Kelvin conversion', '开尔文换算', 'T\\,(\\mathrm{K})=\\theta\\,(^{\\circ}\\mathrm{C})+273'),
          formula('Boyle relationship (Supplement)', '玻意耳关系（Supplement）', 'pV=\\text{constant}'),
        ],
        classroomQuestions: [particleCheck('igcse-u2-brownian-check-student')],
      },
    ],
  ),
};

const thermalPropertiesLesson: CurriculumLesson = {
  title: text('2.2 Thermal Properties and Temperature', '2.2 热性质与温度'),
  description: text(
    'Thermal expansion, internal energy, specific heat capacity, melting, boiling, and evaporation.',
    '热膨胀、内能、比热容、熔化、沸腾与蒸发。',
  ),
  sections: [
    {
      heading: text('0. Hook: why do bridges need gaps and why does sweat cool us?', '0. 引入：桥为什么要留缝？出汗为什么会降温？'),
      paragraphs: [
        text(
          'Thermal physics matters because temperature change can bend metal, crack glass, burst pipes, or cool the body. The same chapter must explain why a bridge needs expansion joints and why evaporation from skin lowers body temperature.',
          '热学之所以重要，是因为温度变化能让金属弯曲、玻璃开裂、水管胀裂，也能让人体降温。同一章内容需要同时解释：桥为什么要留伸缩缝，以及皮肤表面的蒸发为什么会让人觉得凉。',
        ),
      ],
    },
    {
      heading: text('1. Thermal expansion of solids, liquids, and gases', '1. 固体、液体和气体的热膨胀'),
      images: [
        deckImage(
          'thermal-expansion-comparison.svg',
          'Chart comparing thermal expansion for several materials.',
          '比较多种材料热膨胀大小的图表。',
          'Thermal expansion differs between materials.',
          '不同材料的热膨胀程度不同。',
        ),
        deckImage(
          'bimetal-thermostat.svg',
          'Thermostat using a bimetal strip to open and close an electrical circuit.',
          '用双金属片控制电路通断的恒温器示意图。',
          'Bimetal strip: unequal expansion controls a switch.',
          '双金属片：利用不同膨胀程度控制开关。',
        ),
      ],
      paragraphs: [
        text(
          'At constant pressure, most solids, liquids and gases expand when heated and contract when cooled. For the same temperature rise, gases expand most, liquids less, and solids least.',
          '在压强不变时，大多数固体、液体和气体受热膨胀、冷却收缩。相同温升下，气体膨胀最大，液体次之，固体最小。',
        ),
        text(
          'The particle explanation comes from how strongly particles are held together. In solids, strong forces keep neighbouring particles close so separation changes only a little. In liquids, particles can rearrange more easily. In gases, particles are already far apart, so average separation changes much more.',
          '其粒子解释在于粒子之间束缚强弱不同。固体中作用力强，邻近粒子分离距离只能略微改变；液体中粒子更容易重新排布；气体粒子本来就相距很远，因此平均间距变化最大。',
        ),
        text(
          'Expansion in solids is usually small but still important in engineering. A tiny change in length for one rail or one bridge beam becomes significant when the structure is long. This is why the syllabus prefers practical examples such as bridge joints, railway gaps, overhead cables, and glass cracking.',
          '固体膨胀虽然通常数值不大，但在工程中仍然非常重要。单根钢轨或单根桥梁构件的长度变化可能很小，但当整体结构很长时，这种变化就会变得显著。这也是为什么大纲特别强调桥梁伸缩缝、铁轨间隙、架空电缆和玻璃开裂等实际例子。',
        ),
        text(
          'Thermal expansion questions are often really asking for causal reasoning: heating increases particle vibration or motion, average separation becomes slightly larger, and the whole object occupies more space. Remembering only “things expand when heated” is usually not enough for application questions.',
          '热膨胀题本质上经常是在考因果链：受热后粒子振动或运动增强，平均间距略微变大，整个物体因此占据更多空间。只记得“加热会膨胀”通常不足以应对应用题。',
        ),
      ],
      bullets: [
        text('Applications: liquid-in-glass thermometers, bimetal strips, expansion joints in bridges and rails.', '应用：液体温度计、双金属片、桥梁和铁轨中的伸缩缝。'),
        text('Consequences: overhead cables are left slack; ordinary glass can crack under uneven heating.', '后果：架空电缆需要预留松弛量；普通玻璃受热不均可能开裂。'),
        text('Water expands on freezing, so ice is less dense than liquid water.', '水结冰时会膨胀，因此冰的密度小于液态水。'),
        text('When two materials expand by different amounts, bending or stress can appear. That is the key idea behind bimetal strips and also behind cracking in composite structures.', '当两种材料膨胀程度不同，就可能出现弯曲或内应力。这正是双金属片工作的关键，也能解释复合结构为什么会开裂。'),
        text('In exam answers, “particles get bigger” is not acceptable. The average spacing changes, not the size of individual particles.', '考试里不能写“粒子本身变大了”。真正变化的是平均间距，而不是单个粒子的大小。'),
      ],
      takeaway: text(
        'Thermal expansion is not a separate chapter of engineering facts; it is a direct consequence of increased particle motion and shows up whenever size changes matter in real life.',
        '热膨胀并不是一堆零散工程案例，而是粒子运动增强的直接结果，只要尺寸变化会影响功能，它就会在真实场景中出现。',
      ),
    },
    {
      heading: text('2. Internal energy and specific heat capacity', '2. 内能与比热容'),
      paragraphs: [
        text(
          'A rise in temperature increases an object’s internal energy. In the syllabus this is first required at Core level, then extended into the particle explanation that average particle kinetic energy increases as temperature rises.',
          '温度升高会增加物体的内能。大纲先在 Core 层面要求知道这一点，再在 Supplement 层面要求用粒子平均动能增大的方式去解释。',
        ),
        text(
          'Specific heat capacity is the energy required per unit mass per unit temperature increase. Materials with a large specific heat capacity need more energy for the same temperature rise.',
          '比热容是单位质量物质温度升高单位温度所需的能量。比热容大的物质，在相同温升下需要更多能量。',
        ),
        text(
          'This is why different materials respond differently to the same heater. If two objects have the same mass and receive the same energy, the one with the lower specific heat capacity shows the bigger temperature rise. The formula matters, but the comparison idea matters just as much.',
          '这也解释了为什么不同材料面对同一个加热器时升温表现会不同。如果两个物体质量相同、吸收能量相同，那么比热容较小的那个温升会更大。公式当然重要，但这种比较思路同样重要。',
        ),
        text(
          'A clean distinction is needed between temperature and internal energy. Temperature tracks average particle kinetic energy, while internal energy depends on both the amount of substance and the energy stored within it. A larger mass can store much more internal energy even at the same temperature.',
          '这里需要把温度和内能严格区分开。温度反映的是粒子平均动能，而内能还与物质量和系统中储存的总能量有关。同温度下，质量更大的物体完全可能具有更大的内能。',
        ),
      ],
      formulas: [
        formula('Specific heat capacity', '比热容', 'c=\\frac{\\Delta E}{m\\Delta\\theta}'),
        formula('Energy transfer', '能量转移', '\\Delta E=mc\\Delta\\theta'),
      ],
      bullets: [
        text('Large specific heat capacity means “harder to change temperature”, not “always hotter”.', '比热容大意味着“温度更难改变”，并不意味着“本身更热”。'),
        text('Check units carefully: $c$ is often in $\\mathrm{J\\,kg^{-1}\\,^{\\circ}C^{-1}}$ or $\\mathrm{J\\,kg^{-1}\\,K^{-1}}$.', '要特别注意单位：$c$ 常写成 $\\mathrm{J\\,kg^{-1}\\,^{\\circ}C^{-1}}$ 或 $\\mathrm{J\\,kg^{-1}\\,K^{-1}}$。'),
        text('If temperature falls, $\\Delta\\theta$ is negative, indicating energy leaving the substance.', '如果温度下降，$\\Delta\\theta$ 为负值，表示能量从物体中流出。'),
      ],
      takeaway: text(
        'Water stores a great deal of thermal energy because its specific heat capacity is high.',
        '水能够储存大量热能，是因为它的比热容很高。',
      ),
    },
    {
      heading: text('3. Measuring specific heat capacity', '3. 比热容的测量实验'),
      images: [
        deckImage(
          'specific-heat-capacity-water-setup.svg',
          'Insulated water container with thermometer and immersion heater for measuring specific heat capacity.',
          '测量比热容时使用的保温水容器、温度计与浸入式加热器示意图。',
          'Measuring the specific heat capacity of a liquid.',
          '测量液体比热容。',
        ),
      ],
      paragraphs: [
        text(
          'For a liquid, use a known mass of liquid in an insulated container with an immersion heater, thermometer, and often a stirrer. For a solid, use a block of known mass with holes for a heater and thermometer. Measure the energy supplied and the temperature rise, then use $\\Delta E=mc\\Delta\\theta$.',
          '测液体比热容时，可用已知质量的液体、保温容器、浸入式加热器、温度计以及常见的搅拌器。测固体比热容时，可用质量已知且带有加热器孔与温度计孔的金属块。测出输入能量和温升，再代入 $\\Delta E=mc\\Delta\\theta$。',
        ),
        text(
          'Measured values are usually approximate because not all supplied energy goes into the sample. Some energy is lost to the surroundings, and some heats the container, heater, or thermometer. Good insulation, a lid, stirring, and a carefully chosen temperature range improve the method.',
          '实验值通常只是近似值，因为并非所有输入能量都进入样品本身。一部分能量散失到环境中，一部分会加热容器、加热器或温度计。更好的保温、加盖、搅拌和合理选择温度区间都能改进实验。',
        ),
        text(
          'This experiment is therefore a good place to sharpen practical judgement. It is not enough to know only the formula at the end; the method should also account for why insulation is used, why the liquid is stirred, why mass must be known accurately, and why a larger temperature rise can reduce percentage uncertainty.',
          '因此，这个实验也是训练实验判断力的好地方。这里不应只停留在最后代公式，还要能解释为什么要保温、为什么要搅拌、为什么必须准确测质量，以及为什么较大的温升有时能减小相对误差。',
        ),
      ],
      bullets: [
        text('Common calculation route: measure electrical energy supplied, find temperature rise, substitute into $\\Delta E=mc\\Delta\\theta$.', '常见计算路线：先测输入电能，再求温升，最后代入 $\\Delta E=mc\\Delta\\theta$。'),
        text('Main practical limitation: the measured energy input is usually larger than the energy actually gained by the sample.', '实验的主要局限：测得的输入能量通常大于样品真正获得的能量。'),
      ],
    },
    {
      heading: text('4. Melting, boiling, condensation, and solidification', '4. 熔化、沸腾、凝结与凝固'),
      images: [
        deckImage(
          'latent-heat-fusion-setup.png',
          'Experimental setup for measuring the specific latent heat of fusion of ice.',
          '测量冰的比熔化潜热的实验装置图。',
          'Specific latent heat of fusion: ice melting.',
          '比熔化潜热：冰的熔化。',
        ),
        deckImage(
          'latent-heat-vaporization-model.png',
          'Model showing energy needed to change water into steam at the same temperature.',
          '展示同温度下把液态水变成水蒸气所需能量的模型图。',
          'Energy needed for liquid water to become steam.',
          '液态水变成水蒸气所需的能量。',
        ),
        deckImage(
          'latent-heat-vaporization-setup.svg',
          'Experimental setup for measuring the specific latent heat of vaporization of water.',
          '测量水的比汽化潜热的实验装置图。',
          'Specific latent heat of vaporization: water to steam.',
          '比汽化潜热：水变成水蒸气。',
        ),
      ],
      paragraphs: [
        text(
          'During melting or boiling, energy is supplied but the temperature stays constant. The energy is used to change the particle arrangement and separation rather than to increase average kinetic energy. For water at standard atmospheric pressure, melting occurs at $0\\,^{\\circ}\\mathrm{C}$ and boiling at $100\\,^{\\circ}\\mathrm{C}$.',
          '在熔化或沸腾过程中，虽然持续吸收能量，但温度保持不变。能量被用于改变粒子的排列和间距，而不是继续增大平均动能。对标准大气压下的水来说，熔点为 $0\\,^{\\circ}\\mathrm{C}$，沸点为 $100\\,^{\\circ}\\mathrm{C}$。',
        ),
        text(
          'Condensation and solidification are the reverse processes: particles lose energy, move less vigorously, and become more closely held together.',
          '凝结和凝固则是相反过程：粒子失去能量，运动减弱，并被更紧密地束缚在一起。',
        ),
        text(
          'A very common misunderstanding is to think that “if heat is still being supplied, temperature must rise”. Phase-change questions are designed to challenge exactly that intuition. During melting or boiling of a pure substance at constant pressure, the extra energy goes into weakening or overcoming attractive forces between particles rather than into increasing their average kinetic energy.',
          '一个非常常见的误区是：只要还在继续加热，温度就一定继续上升。物态变化题正是在考这一点。纯净物在恒压下熔化或沸腾时，额外吸收的能量主要用于削弱或克服粒子间吸引作用，而不是继续增大平均动能。',
        ),
        text(
          'This is why heating curves contain flat sections. Those flat parts are not “nothing happening”; they are the parts where a very important structural change is happening inside the substance even though the thermometer reading stays the same.',
          '这也就是为什么加热曲线会出现平台段。平台段并不是“什么都没发生”，恰恰相反，物质内部正发生重要的结构变化，只是温度计读数保持不变。',
        ),
      ],
      bullets: [
        text('Melting and boiling require energy input; freezing and condensation release energy.', '熔化和沸腾需要吸收能量；凝固和凝结会释放能量。'),
        text('At the boiling point, bubbles form throughout the liquid, not only at the surface.', '到达沸点时，气泡会在整个液体内部形成，而不只是液面。'),
      ],
    },
    {
      heading: text('5. Evaporation, boiling, and cooling', '5. 蒸发、沸腾与降温'),
      images: [
        deckImage(
          'boiling-water-photograph.png',
          'Photograph of boiling water showing vapour bubbles rising through the liquid.',
          '展示沸腾时气泡在液体内部产生并上升的照片。',
          'Boiling: bubbles form throughout the liquid.',
          '沸腾：气泡在液体内部形成。',
        ),
      ],
      paragraphs: [
        text(
          'Evaporation happens at the surface of a liquid when the more energetic particles escape. It can occur at any temperature. Boiling is different: vapour bubbles form throughout the liquid and it happens at a fixed temperature for a given pressure.',
          '蒸发发生在液体表面，能量更高的粒子逃逸出去。蒸发可以在任何温度下发生。沸腾则不同：气泡在整个液体内部形成，并且在给定压强下对应固定温度。',
        ),
        text(
          'Evaporation is faster when temperature is higher, when the surface area is larger, and when air moves across the surface. The liquid cools because the particles that escape are, on average, the more energetic ones, leaving the remaining liquid with a lower average kinetic energy.',
          '温度越高、表面积越大、液面上方空气流动越快，蒸发越快。液体会降温，是因为逃逸出去的粒子平均而言更有能量，剩余液体的粒子平均动能因此降低。',
        ),
        text(
          'This section is especially important because the everyday phenomenon is familiar while the physical reason is often stated imprecisely. “It cools because water disappears” is not enough. The correct idea is selective escape: the faster particles leave first, so the particles left behind have a smaller average kinetic energy and therefore a lower temperature.',
          '这一节特别重要，因为生活现象虽然熟悉，但物理原因常常会被说得不准确。只说“因为水变少了，所以降温”是不够的。正确解释是选择性逃逸：更快、更有能量的粒子优先离开，因此留下粒子的平均动能降低，温度也随之下降。',
        ),
      ],
      bullets: [
        text('Evaporation can happen below the boiling point; boiling cannot.', '蒸发可以在低于沸点时发生，沸腾则不行。'),
        text('Moving air speeds evaporation because escaped particles are carried away, making further escape easier.', '空气流动会加快蒸发，因为已经逃逸的粒子被带走后，新的粒子更容易继续逃逸。'),
        text('Sweating and alcohol evaporation are common cooling examples worth connecting back to particle theory.', '出汗降温和酒精蒸发降温都是很适合回扣粒子理论的日常例子。'),
      ],
      classroomQuestions: [evaporationCheck('igcse-u2-evaporation-check')],
    },
    {
      heading: text('6. Common misconceptions and exam focus', '6. 常见误区与考试重点'),
      bullets: [
        text('Do not say temperature rises during melting or boiling of a pure substance at constant pressure.', '不要说纯净物在恒压下熔化或沸腾时温度继续升高。'),
        text('Do not confuse “more internal energy” with “higher temperature” in all situations; a larger mass can store more internal energy at the same temperature.', '不要把“内能更大”和“温度更高”机械地当成同一件事；质量更大的物体即使温度相同，也可能具有更大的内能。'),
        text('Evaporation is not caused by bubbles forming inside the liquid; that describes boiling.', '蒸发不是“液体内部产生气泡”，那是在描述沸腾。'),
        text('Specific heat capacity questions often test units, mass conversion, and whether energy losses have been ignored.', '比热容题常考查单位、质量换算，以及是否默认忽略能量损失。'),
        text('Thermal expansion answers should mention increased particle motion and spacing, not particle size increase.', '热膨胀题的答案应提到粒子运动增强和间距增大，而不是说粒子本身变大。'),
        text('If a question asks why temperature stays constant during a phase change, the key phrase is that energy changes particle arrangement/separation rather than average kinetic energy.', '如果题目问物态变化时为什么温度保持不变，关键句式应是：能量用于改变粒子排列/间距，而不是增大平均动能。'),
      ],
      paragraphs: [
        text(
          'Across this whole section, the strongest answers are the ones that connect every statement back to the particle model. That is what turns isolated facts about thermometers, bridges, boiling, and sweating into one coherent unit.',
          '对整张热性质内容来说，最强的答案永远是能把所有结论重新连回粒子模型的答案。这样，温度计、桥梁、沸腾、出汗这些看似分散的内容才会真正变成一个连贯单元。',
        ),
      ],
    },
  ],
  studentVersion: studentVersion(
    text('2.2 Thermal Properties and Temperature', '2.2 热性质与温度'),
    text(
      'Core ideas for thermal expansion, specific heat capacity, and phase change.',
      '关于热膨胀、比热容和物态变化的核心内容。',
    ),
    [
      {
        heading: text('1. Thermal expansion and temperature rise', '1. 热膨胀与温度升高'),
        paragraphs: [
          text(
            'When a substance is heated, its particles move or vibrate more strongly, so the average spacing increases slightly. This makes most substances expand. Gases expand the most, liquids next, and solids the least for the same temperature rise.',
            '物质受热时，粒子的运动或振动会增强，因此平均间距会略微增大，大多数物质就会膨胀。相同温升下，气体膨胀最大，液体次之，固体最小。',
          ),
        ],
        bullets: [
          text('At constant pressure, most solids, liquids, and gases expand when heated.', '在压强不变时，大多数固体、液体和气体受热膨胀。'),
          text('For the same temperature rise: gas expands most, liquid next, solid least.', '相同温升下：气体膨胀最大，液体次之，固体最小。'),
          text('A rise in temperature increases internal energy.', '温度升高会使内能增加。'),
          text('Examples: bridge gaps, bimetal strips, overhead cables.', '例子：桥梁伸缩缝、双金属片、架空电缆。'),
        ],
      },
      {
        heading: text('2. Specific heat capacity and state change', '2. 比热容与物态变化'),
        paragraphs: [
          text(
            'Specific heat capacity tells you how much energy is needed to raise the temperature of a given mass. During melting or boiling, energy is absorbed without a temperature rise. Evaporation happens at the surface and can cool the remaining liquid.',
            '比热容描述一定质量物体升温所需的能量。熔化或沸腾时，物体吸收能量但温度不升高。蒸发发生在表面，并且会使剩余液体降温。',
          ),
          text(
            'The cooling happens because the particles that escape during evaporation are the ones with higher energy. This leaves the remaining liquid with a lower average kinetic energy.',
            '之所以会降温，是因为蒸发时逃逸出去的是能量较高的粒子，因此剩余液体的平均动能会降低。',
          ),
        ],
        formulas: [
          formula('Specific heat capacity', '比热容', 'c=\\frac{\\Delta E}{m\\Delta\\theta}'),
          formula('Energy transfer', '能量转移', '\\Delta E=mc\\Delta\\theta'),
        ],
        bullets: [
          text('Do not say the temperature rises during boiling of a pure substance at constant pressure.', '不要说纯净物在恒压下沸腾时温度还会继续升高。'),
          text('Evaporation happens at the surface; boiling happens throughout the liquid.', '蒸发发生在表面；沸腾发生在整个液体内部。'),
        ],
        classroomQuestions: [evaporationCheck('igcse-u2-evaporation-check-student')],
      },
    ],
  ),
};

const thermalTransferLesson: CurriculumLesson = {
  title: text('2.3 Transfer of Thermal Energy', '2.3 热能传递'),
  description: text(
    'Conduction, convection, radiation, thermal balance, and real-world applications.',
    '传导、对流、辐射、热平衡以及实际应用。',
  ),
  sections: [
    {
      heading: text('0. Hook: one hot pan, three different transfer methods', '0. 引入：一口热锅，三种传热方式'),
      paragraphs: [
        text(
          'A metal pan on a stove is a good opening example because several transfer mechanisms act at the same time. The pan base conducts energy, the soup inside circulates by convection, and the hot surfaces emit infrared radiation. The chapter becomes much clearer once the three methods are not treated as separate memorised lists.',
          '把一口放在炉子上的金属锅作为引入非常合适，因为这里同时存在多种传热方式：锅底通过传导获得能量，锅中的汤通过对流流动，热表面还会发射红外辐射。一旦不再把三种方式当成互相孤立的背诵条目，这一章就会清楚很多。',
        ),
      ],
    },
    {
      heading: text('1. Conduction', '1. 传导'),
      images: [
        deckImage(
          'thermal-conduction-experiments.png',
          'Two conduction demonstrations: comparing rods and heating water above ice.',
          '两种传导实验：比较不同金属棒，以及“上层水沸腾但冰不融化”的试管实验。',
          'Comparing thermal conduction in different materials.',
          '比较不同材料中的热传导。',
        ),
      ],
      paragraphs: [
        text(
          'Conduction is thermal energy transfer through a material without bulk movement of the material itself. In all solids, neighbouring atoms or molecules pass on energy by lattice vibrations. In metals, free (delocalised) electrons also move and carry thermal energy quickly, making metals especially good conductors.',
          '传导是热能在材料内部的传递过程，而材料本身并不发生整体流动。在所有固体中，相邻原子或分子通过晶格振动把能量传下去。对于金属，还存在自由（离域）电子快速移动并携带热能，因此金属是特别好的导热体。',
        ),
        text(
          'The syllabus also requires the particle explanation for why gases and most liquids conduct poorly: their particles are farther apart, so energy is passed on much less effectively by collisions.',
          '大纲还要求能够用粒子模型解释为什么气体和大多数液体导热较差：它们的粒子间距更大，因此碰撞传递能量的效率低得多。',
        ),
        text(
          'Conduction explanations become much stronger when the mechanism is named clearly. In non-metals, energy is passed on mainly by vibrations from particle to particle. In metals, vibrating ions are still present, but the free electrons make the transfer much faster.',
          '如果把机制明确点出来，传导题的答案就会更扎实。在非金属中，能量主要靠粒子间振动逐步传递；在金属中，虽然也有振动，但自由电子会使传能过程快得多。',
        ),
      ],
      bullets: [
        text('Typical demonstration: compare equal rods heated under the same conditions and observe wax markers or sensor readings.', '典型实验：在相同条件下加热等长材料棒，观察蜡标脱落或温度传感器读数。'),
        text('Fair test idea: same length, same cross-sectional area, same starting temperature, same heating arrangement.', '公平实验要点：相同长度、相同横截面积、相同初温、相同加热方式。'),
        text('Metals are good conductors partly because of free electrons; gases are poor conductors because their particles are far apart.', '金属导热好，部分原因是有自由电子；气体导热差，是因为粒子彼此相距较远。'),
      ],
      takeaway: text(
        'Conduction is about transfer through a material without bulk movement; the material stays in place while energy moves through it.',
        '传导的本质是在材料整体不流动的前提下，热能在其中传递；位置基本不动的是材料本身，而不是热能。',
      ),
    },
    {
      heading: text('2. Convection', '2. 对流'),
      images: [
        deckImage(
          'convection-current-water.svg',
          'Convection current in water heated from below in one region.',
          '从底部局部加热时，水中形成对流循环的示意图。',
          'Convection current in a heated liquid.',
          '受热液体中的对流循环。',
        ),
      ],
      paragraphs: [
        text(
          'Convection is an important method of thermal energy transfer in liquids and gases. When a region of fluid is heated, it expands and becomes less dense, so it rises while cooler, denser fluid sinks. This creates a convection current.',
          '对流是液体和气体中重要的热传递方式。当流体某区域受热后，它会膨胀、密度减小，于是向上运动；较冷、密度更大的流体下沉并补充过去，形成对流循环。',
        ),
        text(
          'Useful demonstrations include coloured water heated from below or smoke in a convection box. The coloured tracer or smoke shows the fluid motion; it is not “the heat” itself.',
          '常用的演示包括从下方加热有色水，或者观察对流箱中的烟流。颜色示踪物或烟只是显示流体运动路径，并不是“热本身”。',
        ),
        text(
          'The density change is the key step. Hot fluid rises not because “heat naturally goes upward”, but because heating makes the fluid expand, reducing its density compared with the cooler surroundings. That density difference creates the circulation.',
          '密度变化是这里真正的关键步骤。热流体上升并不是因为“热会自然往上走”，而是因为受热后流体膨胀、密度减小，相比周围较冷流体更轻，从而形成循环。',
        ),
      ],
      bullets: [
        text('Convection happens only in fluids: liquids and gases.', '对流只会发生在流体中：也就是液体和气体。'),
        text('A full convection explanation should mention heating, expansion, lower density, rising, and replacement by cooler fluid.', '完整的对流解释通常要提到：受热、膨胀、密度减小、上升、以及较冷流体补充。'),
      ],
    },
    {
      heading: text('3. Radiation and surface properties', '3. 辐射与表面性质'),
      images: [
        deckImage(
          'emitters-absorbers-experiments.png',
          'Experimental comparison of infrared emitters and absorbers.',
          '比较红外辐射发射与吸收的实验装置图。',
          'Infrared absorption and emission by different surfaces.',
          '不同表面的红外吸收与发射。',
        ),
      ],
      paragraphs: [
        text(
          'Thermal radiation is infrared radiation emitted by all objects. It does not need a medium, so it can travel through a vacuum. The rate of emission depends on surface temperature and surface area, and it is also affected by the nature of the surface.',
          '热辐射是所有物体都会发出的红外辐射。它不需要介质，因此可以在真空中传播。辐射发射速率与表面温度和表面积有关，也会受到表面性质影响。',
        ),
        text(
          'Dark, dull surfaces are good emitters and absorbers of infrared radiation. White or shiny surfaces are poor absorbers and emitters but good reflectors. This is why vacuum flasks use shiny surfaces and why solar heaters often use black absorbing surfaces.',
          '暗色、粗糙表面是良好的红外辐射发射体和吸收体。白色或光亮表面吸收和发射都较差，但反射较强。这也解释了为什么保温瓶内壁常做成光亮表面，而太阳能集热器常用黑色吸收层。',
        ),
        text(
          'Only one side of this rule is sometimes remembered. The complete pairing matters: good absorbers are also good emitters, and poor absorbers are also poor emitters. This paired idea is what allows many application questions to be answered quickly.',
          '这条规律有时只会被记住一半。完整规律其实是成对的：好的吸收体通常也是好的发射体，差的吸收体通常也是差的发射体。很多应用题正是靠这组配对关系快速判断的。',
        ),
      ],
      classroomQuestions: [radiationCheck('igcse-u2-radiation-check')],
    },
    {
      heading: text('4. Thermal balance and the Earth', '4. 热平衡与地球温度'),
      paragraphs: [
        text(
          'An object stays at constant temperature only when it transfers energy away at the same rate that it receives energy. If it receives energy faster than it loses it, the temperature rises; if it loses energy faster, the temperature falls.',
          '只有当物体向外传递能量的速率与吸收能量的速率相等时，温度才会保持不变。如果吸收更快，温度上升；如果散失更快，温度下降。',
        ),
        text(
          'The same idea applies to the Earth. The Earth’s temperature depends on the balance between incoming radiation and radiation emitted from the Earth’s surface. The greenhouse effect should be understood through this energy-balance model rather than as an isolated environmental note.',
          '同一思路也适用于地球：地球温度取决于入射辐射与地球表面向外发射辐射之间的平衡。温室效应应放在“能量收支平衡”这一模型下理解，而不是当成孤立的环保补充。',
        ),
        text(
          'This makes thermal balance a unifying idea rather than a side topic. A kettle, a flask, a greenhouse, and the Earth itself can all be discussed using the same question: is energy entering faster, leaving faster, or balancing out?',
          '这样一来，热平衡就不再是一个边角概念，而成了整章的统一主线。无论是热水壶、保温瓶、温室还是地球本身，都可以用同一个问题来分析：能量进入更快、流出更快，还是两者平衡？',
        ),
      ],
      bullets: [
        text('Constant temperature means balanced transfer rates, not zero energy transfer.', '温度恒定并不意味着没有能量传递，而是输入与输出速率相等。'),
        text('This idea is useful in many applications, not only in climate examples.', '这个概念不仅适用于气候问题，也适用于很多普通热学应用。'),
      ],
    },
    {
      heading: text('5. Everyday applications and multi-step examples', '5. 日常应用与综合实例'),
      images: [
        deckImage(
          'vacuum-flask-structure.png',
          'Cutaway structure of a vacuum flask showing stopper, vacuum gap, and silvery surfaces.',
          '保温瓶剖面图，展示瓶塞、真空间隙和银色表面。',
          'Vacuum flask: reducing conduction, convection, and radiation.',
          '保温瓶：减少传导、对流和辐射。',
        ),
      ],
      paragraphs: [
        text(
          'For Core, this includes simple applications such as kitchen pans and room heating by convection. For Supplement, it also extends to multi-step situations in which more than one transfer mechanism matters, such as a fire burning wood or coal, or a car radiator.',
          '在 Core 层面，这包括锅具受热、房间通过对流取暖等简单应用；在 Supplement 层面，还会扩展到多种传热机制同时起作用的情形，例如木柴/煤火或汽车散热器。',
        ),
        text(
          'A good decision rule is to ask three separate questions: Is there transfer through a material without bulk movement? Is fluid motion carrying energy? Is energy travelling as infrared waves? Many real systems involve more than one “yes”.',
          '一个很好用的判断规则是分别问三个问题：有没有在材料内部、没有整体流动的传能？有没有流体整体运动在搬运能量？有没有红外辐射在传播能量？很多真实系统会同时出现多个“是”。',
        ),
        text(
          'This section is where the single-label habit breaks down. A vacuum flask reduces conduction, convection, and radiation at the same time. A radiator may involve conduction through metal, convection in air, and radiation from the hot surface. Real understanding means being able to separate these roles clearly.',
          '这一节的重点，是打破“只能选一个标签”的习惯。保温瓶会同时减少传导、对流和辐射；散热器也可能同时涉及金属中的传导、空气中的对流以及热表面的辐射。真正的理解，是能把这些角色分别说清楚。',
        ),
      ],
    },
    {
      heading: text('6. Common misconceptions and exam focus', '6. 常见误区与考试重点'),
      bullets: [
        text('Convection does not happen in solids because solids do not flow as a bulk fluid.', '固体中不会发生对流，因为固体不能像流体那样整体流动。'),
        text('Radiation does not need particles or air; it can travel through space.', '辐射不需要粒子或空气参与，可以穿过真空。'),
        text('Good emitters are also good absorbers; only one half of this pair is often remembered.', '好的发射体往往也是好的吸收体；这组规律常常只被记住一半。'),
        text('Real-life examples often contain more than one transfer method, so avoid forcing a single-method answer unless the question says “mainly”.', '现实问题常常同时包含多种传热方式，除非题目明确说“主要”，否则不要强行只选一种。'),
        text('Do not describe convection as “heat rises” without mentioning fluid movement and density change.', '不要把对流直接写成“热会上升”，而不提流体运动和密度变化。'),
        text('Do not confuse the visible smoke/water tracer with the thermal energy itself; it only shows the path of moving fluid.', '不要把可见的烟或有色水当成“热本身”；它们只是用来显示流体运动路径。'),
      ],
      paragraphs: [
        text(
          'Across conduction, convection, and radiation, the deepest improvement usually comes from comparing mechanisms instead of memorising three disconnected definitions. What moves? Does matter move in bulk? Is a medium needed? Which surface type matters? These comparison questions help organise the whole topic.',
          '在传导、对流和辐射这一整块内容里，最深层的提升往往来自于：不再死记三个分散定义，而是开始比较三者机制。到底是什么在动？物质本身有没有整体流动？是否需要介质？表面性质会不会影响？这类对比问题能把整章真正组织起来。',
        ),
      ],
    },
  ],
  studentVersion: studentVersion(
    text('2.3 Transfer of Thermal Energy', '2.3 热能传递'),
    text(
      'Core definitions and examples of conduction, convection, and radiation.',
      '关于传导、对流和辐射的核心定义与例子。',
    ),
    [
      {
        heading: text('1. Three transfer methods', '1. 三种传热方式'),
        paragraphs: [
          text(
            'The best way to separate the three methods is to ask what is actually moving. In conduction, the material stays in place while energy is passed through it. In convection, the fluid itself moves. In radiation, energy travels as infrared waves and no medium is needed.',
            '区分三种传热方式的最好办法，是先问“到底什么在动”。在传导中，材料本身基本不整体移动，只是能量穿过它；在对流中，流体整体在移动；在辐射中，能量以红外波形式传播，不需要介质。',
          ),
        ],
        bullets: [
          text('Conduction: energy passes through a material; in metals, free electrons help a lot.', '传导：能量穿过材料传递；在金属中，自由电子帮助很大。'),
          text('Convection: in liquids and gases, warm less-dense fluid rises and cooler denser fluid sinks.', '对流：在液体和气体中，较热、密度较小的流体上升，较冷、密度较大的流体下沉。'),
          text('Radiation: infrared waves emitted by all objects; no medium is needed.', '辐射：所有物体发出的红外波；不需要介质。'),
          text('Convection cannot happen in solids.', '对流不会发生在固体中。'),
        ],
      },
      {
        heading: text('2. Surface effects and applications', '2. 表面性质与应用'),
        paragraphs: [
          text(
            'Dull black surfaces are good absorbers and emitters. Shiny light surfaces are good reflectors. Many everyday systems use more than one transfer method at the same time.',
            '暗黑粗糙表面是良好的吸收体和发射体；浅色光亮表面是良好的反射体。很多日常系统会同时用到不止一种传热方式。',
          ),
          text(
            'When temperature stays constant, it means the rate of energy gain equals the rate of energy loss. Vacuum flasks and building insulation work by reducing one or more transfer methods.',
            '当温度保持不变时，意味着吸收能量速率与散失能量速率相等。保温瓶和建筑保温层的作用，都是减少一种或多种传热方式。',
          ),
        ],
        bullets: [
          text('Good absorbers are also good emitters.', '好的吸收体通常也是好的发射体。'),
          text('Real objects often use conduction, convection, and radiation together.', '真实物体往往会同时涉及传导、对流和辐射。'),
        ],
        classroomQuestions: [radiationCheck('igcse-u2-radiation-check-student')],
      },
    ],
  ),
};

export const igcseUnit2Lessons: CurriculumLesson[] = [
  kineticParticleModelLesson,
  thermalPropertiesLesson,
  thermalTransferLesson,
];
