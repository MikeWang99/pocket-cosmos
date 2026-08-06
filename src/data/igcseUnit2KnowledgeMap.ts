import type { CurriculumFormula, CurriculumLesson, LocalizedText } from './apPhysicsCurriculum';

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

const kineticParticleModelLesson: CurriculumLesson = {
  title: text('2.1 Kinetic Particle Model of Matter', '2.1 物质的粒子模型'),
  description: text(
    'States of matter, particle evidence, gas pressure and the absolute temperature scale.',
    '物态、粒子模型的证据、气体压强与绝对温标。',
  ),
  sections: [
    {
      heading: text('1. States of matter and changes of state', '1. 物态与物态变化'),
      paragraphs: [
        text(
          'A solid has a fixed shape and volume, a liquid has a fixed volume but takes the shape of its container, and a gas has neither fixed shape nor fixed volume and fills its container.',
          '固体具有固定形状和体积；液体具有固定体积但形状随容器改变；气体既无固定形状也无固定体积，会充满容器。',
        ),
        text(
          'The required changes of state are melting, solidification or freezing, boiling, evaporation and condensation. Direct solid-to-gas and gas-to-solid changes are outside this syllabus.',
          '要求掌握的物态变化包括熔化、凝固或冻结、沸腾、蒸发和凝结。固体与气体之间的直接转化不在本大纲要求内。',
        ),
      ],
    },
    {
      heading: text('2. Arrangement, separation and motion of particles', '2. 粒子的排列、间距与运动'),
      paragraphs: [
        text(
          'Solid particles are closely packed in an ordered arrangement and vibrate about fixed positions. Liquid particles remain close but are disordered and move past one another. Gas particles are far apart, move rapidly and randomly, and have negligible interaction except during collisions.',
          '固体粒子紧密、有序排列，并在固定位置附近振动；液体粒子仍较接近，但排列无序且可彼此滑动；气体粒子间距很大，快速无规则运动，除碰撞外相互作用可忽略。',
        ),
        text(
          'Particle diagrams must show relative arrangement and separation accurately. Particle size does not increase when a substance is heated; the average separation and motion change.',
          '粒子示意图必须准确表示相对排列和间距。物质受热时粒子本身不会变大，改变的是平均间距和运动状态。',
        ),
        text(
          'Higher temperature corresponds to greater average particle kinetic energy. At absolute zero, $-273\\,^{\\circ}\\mathrm{C}$, particles have their least kinetic energy; the syllabus does not describe this as all motion necessarily stopping.',
          '温度越高，粒子的平均动能越大。在绝对零度 $-273\\,^{\\circ}\\mathrm{C}$，粒子具有最低动能；本大纲并不把它描述为所有运动必然完全停止。',
        ),
      ],
    },
    {
      heading: text('3. Brownian motion as evidence', '3. 布朗运动作为证据'),
      paragraphs: [
        text(
          'The random motion of visible microscopic particles suspended in a gas or liquid is evidence that matter contains moving particles. The suspended particles change direction because they are struck unevenly by much smaller, fast-moving atoms or molecules of the surrounding fluid.',
          '悬浮在气体或液体中的可见微粒做无规则运动，是物质由运动粒子组成的证据。悬浮微粒不断改变方向，是因为周围流体中更小、快速运动的原子或分子从不同方向进行不均匀碰撞。',
        ),
        text(
          'The visible microscopic particles are not the atoms or molecules themselves. These terms must be kept distinct when explaining Brownian motion.',
          '可见的微粒并不是原子或分子本身。解释布朗运动时必须区分“微粒”和“原子或分子”。',
        ),
      ],
    },
    {
      heading: text('4. Gas pressure from particle collisions', '4. 用粒子碰撞解释气体压强'),
      paragraphs: [
        text(
          'Gas particles colliding with a surface change momentum and exert forces. The combined force per unit area is gas pressure. More frequent or more forceful collisions produce greater pressure.',
          '气体粒子与表面碰撞时动量改变并对表面施力。单位面积上这些力的合效应就是气体压强。碰撞更频繁或单次碰撞作用更强，压强就更大。',
        ),
        text(
          'At constant volume, raising temperature increases particle speed and therefore pressure. At constant temperature, reducing volume shortens the distance between wall collisions and increases pressure.',
          '体积不变时，升温使粒子速率增大，因而压强增大；温度不变时，减小体积会缩短粒子在两次撞壁之间的路程，使压强增大。',
        ),
        text(
          'Particle forces, separations and motion together determine the properties of solids, liquids and gases. Gases are especially compressible because their particles are widely separated.',
          '粒子间作用力、间距和运动共同决定固体、液体和气体的性质。气体特别容易被压缩，是因为粒子间距很大。',
        ),
      ],
    },
    {
      heading: text('5. Kelvin scale and Boyle relationship', '5. 开尔文温标与玻意耳关系'),
      paragraphs: [
        text(
          'Kelvin temperature starts at absolute zero. A temperature interval has the same numerical size in kelvin and degrees Celsius, but the zero points differ.',
          '开尔文温标从绝对零度开始。开尔文与摄氏度的温差数值相同，但零点不同。',
        ),
        text(
          'For a fixed mass of gas at constant temperature, pressure is inversely proportional to volume. A graph of $p$ against $V$ is a decreasing curve, while a graph of $p$ against $1/V$ is a straight line through the origin.',
          '固定质量气体在温度不变时，压强与体积成反比。$p$ 对 $V$ 的图像为递减曲线，$p$ 对 $1/V$ 的图像为过原点直线。',
        ),
      ],
      formulas: [
        formula('Temperature conversion', '温标换算', 'T\\,(\\mathrm{K})=\\theta\\,(^{\\circ}\\mathrm{C})+273'),
        formula('Fixed mass at constant temperature (Supplement)', '定温、定质量气体（Supplement）', 'pV=\\mathrm{constant}'),
        formula('Two states', '两个状态', 'p_1V_1=p_2V_2'),
      ],
    },
  ],
};

const thermalPropertiesLesson: CurriculumLesson = {
  title: text('2.2 Thermal Properties and Temperature', '2.2 热性质与温度'),
  description: text(
    'Thermal expansion, internal energy, specific heat capacity, phase changes and evaporation.',
    '热膨胀、内能、比热容、物态变化与蒸发。',
  ),
  sections: [
    {
      heading: text('1. Thermal expansion', '1. 热膨胀'),
      paragraphs: [
        text(
          'At constant pressure, most solids, liquids and gases expand when heated and contract when cooled. For the same temperature rise, gases generally expand most, liquids less and solids least.',
          '在压强不变时，大多数固体、液体和气体受热膨胀、冷却收缩。相同温升下，气体通常膨胀最大，液体次之，固体最小。',
        ),
        text(
          'Heating increases particle motion. In solids, strong forces and fixed lattice positions restrict changes in separation; liquids allow more rearrangement; gas particles are far apart and their average separation changes most.',
          '加热增强粒子运动。固体中强作用力和固定晶格位置限制了间距变化；液体粒子更容易重排；气体粒子相距很远，平均间距变化最大。',
        ),
        text(
          'Applications and consequences include liquid-in-glass thermometers, bimetallic strips, expansion joints in bridges and rails, and slack in overhead cables.',
          '常见应用与后果包括液体温度计、双金属片、桥梁和铁轨的伸缩缝，以及架空电缆预留的下垂。',
        ),
      ],
    },
    {
      heading: text('2. Internal energy and specific heat capacity', '2. 内能与比热容'),
      paragraphs: [
        text(
          'Raising an object’s temperature increases its internal energy and the average kinetic energy of its particles. Specific heat capacity is the energy required per unit mass per unit temperature increase.',
          '物体温度升高时，内能增加，粒子的平均动能增加。比热容是单位质量物质温度升高单位温度所需的能量。',
        ),
        text(
          'A solid experiment uses a heater and thermometer in a well-insulated block of known mass. Measure energy supplied and temperature rise. A liquid experiment uses a known liquid mass in an insulated container with an immersion heater, thermometer and stirrer. Electrical energy may be found from power multiplied by time.',
          '固体实验使用装有加热器和温度计、质量已知且充分保温的固体块，测量输入能量和温升。液体实验使用已知质量的液体、保温容器、浸入式加热器、温度计和搅拌器。电能可由功率与时间的乘积求得。',
        ),
        text(
          'Heat loss to the surroundings and energy absorbed by the apparatus make the measured value differ from the material value. Insulation, a lid, stirring and using a temperature range near room temperature reduce systematic effects.',
          '向环境散热以及实验装置吸收能量会使测量值偏离材料真实值。保温、加盖、搅拌并选取接近室温的温度范围可减小系统影响。',
        ),
      ],
      formulas: [
        formula('Specific heat capacity', '比热容', 'c=\\frac{\\Delta E}{m\\Delta\\theta}'),
        formula('Energy change', '能量变化', '\\Delta E=mc\\Delta\\theta'),
      ],
    },
    {
      heading: text('3. Melting, boiling and condensation', '3. 熔化、沸腾与凝结'),
      paragraphs: [
        text(
          'During melting or boiling, energy input changes particle arrangement and separation without changing temperature. At standard atmospheric pressure, pure water melts at $0\\,^{\\circ}\\mathrm{C}$ and boils at $100\\,^{\\circ}\\mathrm{C}$.',
          '在熔化或沸腾过程中，输入能量改变粒子的排列和间距，而温度不变。在标准大气压下，纯水的熔点为 $0\\,^{\\circ}\\mathrm{C}$，沸点为 $100\\,^{\\circ}\\mathrm{C}$。',
        ),
        text(
          'Condensation occurs when gas particles lose energy, move more slowly and come close enough for attractive forces to keep them together. During solidification, particles lose energy and become fixed in an ordered arrangement.',
          '凝结时，气体粒子失去能量、运动减慢，并接近到足以被吸引力束缚；凝固时，粒子失去能量并固定在有序排列中。',
        ),
      ],
    },
    {
      heading: text('4. Evaporation and cooling', '4. 蒸发与降温'),
      paragraphs: [
        text(
          'Evaporation occurs at the surface when higher-energy particles escape from a liquid. Removing particles with above-average kinetic energy lowers the average kinetic energy of those remaining, so the liquid cools.',
          '蒸发发生在液体表面，能量较高的粒子逃离液体。高于平均动能的粒子离开后，剩余粒子的平均动能降低，因此液体降温。',
        ),
        text(
          'Boiling occurs throughout a liquid at a fixed temperature for a given pressure; evaporation can occur at any temperature and only at the surface. Evaporation is faster at higher temperature, with larger surface area and with greater air movement over the surface.',
          '在给定压强下，沸腾在固定温度并遍及液体内部发生；蒸发可在任何温度发生且只发生在表面。温度越高、表面积越大、液面上方空气流动越快，蒸发越快。',
        ),
        text(
          'An object in contact with an evaporating liquid cools because energy is transferred from the object to replace the energy carried away by escaping particles.',
          '与蒸发液体接触的物体会降温，因为物体向液体转移能量，以补偿逃逸粒子带走的能量。',
        ),
      ],
    },
  ],
};

const thermalTransferLesson: CurriculumLesson = {
  title: text('2.3 Transfer of Thermal Energy', '2.3 热能传递'),
  description: text(
    'Conduction, convection, infrared radiation, thermal balance and combined applications.',
    '传导、对流、红外辐射、热平衡与综合应用。',
  ),
  sections: [
    {
      heading: text('1. Conduction', '1. 传导'),
      paragraphs: [
        text(
          'A comparison experiment places equal-length rods of different materials under the same heating conditions and compares how quickly wax markers melt or temperature sensors rise. Controlled dimensions and equal heating are required for a fair comparison of conductors and insulators.',
          '比较实验可在相同加热条件下使用等长、等粗的不同材料棒，比较蜡标脱落或温度传感器升温的快慢。控制尺寸和加热条件相同，才能公平比较导热体与隔热体。',
        ),
        text(
          'In every solid, neighbouring atoms or molecules transfer energy through lattice vibrations. In metals, mobile delocalised electrons also carry energy rapidly, so metals are good conductors. Gases and most liquids conduct poorly because their particles are farther apart and collisions transfer energy less effectively.',
          '在所有固体中，相邻原子或分子通过晶格振动传递能量。金属中可移动的离域电子还会快速携带能量，因此金属是良导体。气体和多数液体的粒子间距较大，碰撞传能效率较低，所以导热性差。',
        ),
        text(
          'Thermal conductivity is a spectrum: many solids conduct better than insulators but less well than good metallic conductors.',
          '导热能力不是简单的二分：许多固体比隔热材料导热更好，但又不如良好的金属导体。',
        ),
      ],
    },
    {
      heading: text('2. Convection', '2. 对流'),
      paragraphs: [
        text(
          'Convection transfers thermal energy through the bulk movement of liquids or gases. Heating causes expansion and lower density, so the warmer fluid rises while cooler, denser fluid sinks, forming a convection current.',
          '对流通过液体或气体的整体运动传递热能。受热使流体膨胀、密度降低，因此较热流体上升，较冷且密度更大的流体下沉，形成对流循环。',
        ),
        text(
          'Convection can be demonstrated by gently heating coloured water at one side of a container or by observing smoke flow through a convection box. The tracer shows fluid motion; it is not itself the transferred thermal energy.',
          '可通过在容器一侧缓慢加热有色水，或观察对流箱中的烟流来展示对流。示踪物显示的是流体运动，本身并不是被转移的热能。',
        ),
      ],
    },
    {
      heading: text('3. Infrared radiation and surfaces', '3. 红外辐射与表面'),
      paragraphs: [
        text(
          'Thermal radiation is infrared radiation emitted by all objects and does not require a medium. Dull black surfaces are good emitters and absorbers; shiny light surfaces are poor emitters and absorbers but good reflectors.',
          '热辐射是所有物体都会发射的红外辐射，不需要介质。暗黑粗糙表面是良好的发射体和吸收体；浅色光亮表面发射和吸收较差，但反射较强。',
        ),
        text(
          'Emitter experiments compare identical surfaces at the same temperature using an infrared detector or compare the cooling rates of containers with different finishes. Absorber experiments expose identical surfaces to the same infrared source and compare temperature rise.',
          '发射实验可用红外探测器比较同温度的不同表面，或比较不同表面容器的冷却速率。吸收实验让相同条件的不同表面接受同一红外源照射，并比较温升。',
        ),
        text(
          'The rate of emission increases with surface temperature and surface area. Comparisons of surface finish require temperature and area to be controlled.',
          '辐射发射速率随表面温度和表面积增大。比较表面性质时必须控制温度和面积。',
        ),
      ],
    },
    {
      heading: text('4. Thermal balance and Earth', '4. 热平衡与地球温度'),
      paragraphs: [
        text(
          'An object remains at constant temperature when it transfers energy away at the same rate that it receives energy. If input rate is greater, temperature rises; if output rate is greater, temperature falls until a new balance may be reached.',
          '物体向外传递能量的速率等于吸收能量的速率时，温度保持不变。输入速率更大时温度上升；输出速率更大时温度下降，直至可能形成新的平衡。',
        ),
        text(
          'Earth’s temperature depends on the balance between incoming solar radiation and radiation emitted from Earth. Changes in reflection, absorption and atmospheric trapping alter this balance.',
          '地球温度取决于入射太阳辐射与地球向外发射辐射之间的平衡。反射、吸收和大气对辐射的截留发生改变时，平衡也会改变。',
        ),
      ],
    },
    {
      heading: text('5. Applications and combined transfer', '5. 应用与综合传热'),
      paragraphs: [
        text(
          'A kitchen pan combines conduction through the metal base, convection in the liquid and radiation from the heat source. Material choice separates the conducting pan body from an insulating handle.',
          '炊具同时涉及金属底部的传导、液体中的对流以及热源的辐射。材料选择使锅体具有良好导热性，而手柄具有隔热性。',
        ),
        text(
          'Room heating relies strongly on convection, with warm air rising and circulating. A wood or coal fire and a car radiator require analysis of more than one transfer pathway, including conduction, convection and radiation where relevant.',
          '房间取暖主要依赖对流，暖空气上升并循环。木柴或煤火以及汽车散热器需要综合分析多种传热路径，包括适用情况下的传导、对流和辐射。',
        ),
      ],
    },
  ],
};

export const igcseUnit2Lessons: CurriculumLesson[] = [
  kineticParticleModelLesson,
  thermalPropertiesLesson,
  thermalTransferLesson,
];
