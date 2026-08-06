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

const nuclearModelLesson: CurriculumLesson = {
  title: text('5.1 The Nuclear Model of the Atom', '5.1 原子的核模型'),
  description: text(
    'Atomic structure, ions, alpha scattering, nuclide notation, isotopes, fission and fusion.',
    '原子结构、离子、α 粒子散射、核素符号、同位素、裂变与聚变。',
  ),
  sections: [
    {
      heading: text('1. Atoms and ions', '1. 原子与离子'),
      paragraphs: [
        text(
          'An atom has a very small positively charged nucleus with negatively charged electrons in orbit around it. A neutral atom has equal numbers of protons and electrons.',
          '原子由一个很小的带正电原子核和绕核运动的带负电电子组成。中性原子的质子数与电子数相等。',
        ),
        text(
          'An atom forms a positive ion by losing electrons and a negative ion by gaining electrons. Nuclear particles do not move between atoms during ordinary ion formation.',
          '原子失去电子形成正离子，得到电子形成负离子。普通离子形成过程中，原子核内粒子不会在原子间转移。',
        ),
      ],
    },
    {
      heading: text('2. Alpha-scattering evidence (Supplement)', '2. α 粒子散射证据（Supplement）'),
      paragraphs: [
        text(
          'Most alpha particles pass through a thin metal foil with little or no deflection, showing that the atom is mostly empty space. Some are deflected through large angles, showing that positive charge and most atomic mass are concentrated in a very small nucleus.',
          '大多数 α 粒子穿过薄金属箔时几乎不偏转，说明原子内部大部分是空的；少数发生大角度偏转，说明正电荷和原子的大部分质量集中在一个很小的原子核内。',
        ),
        text(
          'The very rare particles scattered backward show that the nucleus is extremely small, dense and positively charged.',
          '极少数被反向散射的粒子说明原子核极小、极致密并带正电。',
        ),
      ],
    },
    {
      heading: text('3. Nucleus, proton number and nucleon number', '3. 原子核、质子数与核子数'),
      paragraphs: [
        text(
          'The nucleus contains protons and neutrons. Their relative charges are $+1$ and $0$; the electron has relative charge $-1$. Proton number $Z$ identifies the element. Nucleon number $A$ is the total number of protons and neutrons.',
          '原子核由质子和中子组成。质子、中子和电子的相对电荷分别为 $+1$、$0$ 和 $-1$。质子数 $Z$ 决定元素种类，核子数 $A$ 是质子数与中子数之和。',
        ),
        text(
          'Nuclide notation places nucleon number above proton number. The relative nuclear charge equals $Z$ and the relative nuclear mass is represented by $A$. The neutron number is $A-Z$.',
          '核素符号把核子数写在质子数上方。原子核的相对电荷等于 $Z$，相对质量由 $A$ 表示。中子数为 $A-Z$。',
        ),
      ],
      formulas: [
        formula('Nuclide notation', '核素符号', '{}^{A}_{Z}\\mathrm{X}'),
        formula('Neutron number', '中子数', 'N=A-Z'),
      ],
    },
    {
      heading: text('4. Isotopes', '4. 同位素'),
      paragraphs: [
        text(
          'Isotopes are nuclei of the same element with the same proton number but different neutron and nucleon numbers. An element may have more than one isotope.',
          '同位素是同一元素中质子数相同、但中子数和核子数不同的原子核。一种元素可以有多种同位素。',
        ),
      ],
    },
    {
      heading: text('5. Nuclear fission and fusion (Supplement)', '5. 核裂变与核聚变（Supplement）'),
      paragraphs: [
        text(
          'Nuclear fission is the splitting of a heavy nucleus into smaller nuclei, usually with emitted neutrons and released energy. Nuclear fusion is the joining of light nuclei to form a heavier nucleus and release energy.',
          '核裂变是重核分裂成较小原子核的过程，通常伴随中子释放和能量释放；核聚变是轻核结合成较重原子核并释放能量的过程。',
        ),
        text(
          'A valid nuclide equation conserves total nucleon number and total proton number. The energy release is associated qualitatively with a small reduction in total mass; numerical mass–energy calculations are not required.',
          '正确的核反应方程必须守恒总核子数和总质子数。能量释放在定性上与总质量的微小减少有关，不要求进行质量—能量数值计算。',
        ),
      ],
    },
  ],
};

const radioactivityLesson: CurriculumLesson = {
  title: text('5.2 Radioactivity', '5.2 放射性'),
  description: text(
    'Detection, background correction, emissions, decay equations, half-life, applications and safety.',
    '探测、背景修正、三种辐射、衰变方程、半衰期、应用与安全。',
  ),
  sections: [
    {
      heading: text('1. Detection and background radiation', '1. 探测与本底辐射'),
      paragraphs: [
        text(
          'Background radiation is ionising radiation present when no intended source is nearby. Significant sources include radon gas in air, rocks and buildings, food and drink, and cosmic rays.',
          '本底辐射是在附近没有指定放射源时仍存在的电离辐射。主要来源包括空气中的氡气、岩石和建筑材料、食物和饮料以及宇宙射线。',
        ),
        text(
          'A detector connected to a counter measures count rate in counts per second or counts per minute. Background must be measured for the same duration and subtracted from the source-plus-background reading.',
          '探测器连接计数器后，可用每秒计数或每分钟计数表示计数率。应在相同时间内测量本底，再从“放射源加本底”的读数中扣除。',
        ),
      ],
      formulas: [
        formula('Corrected count rate', '修正计数率', 'C_{\\mathrm{corrected}}=C_{\\mathrm{measured}}-C_{\\mathrm{background}}'),
      ],
    },
    {
      heading: text('2. Alpha, beta and gamma emissions', '2. α、β 与 γ 辐射'),
      paragraphs: [
        text(
          'Nuclear emission is spontaneous and random in direction. An alpha particle is a helium nucleus with charge $+2$ and large mass; a beta-minus particle is a fast electron with charge $-1$; gamma radiation is an uncharged electromagnetic wave.',
          '核辐射的发射是自发的，方向随机。α 粒子是带 $+2$ 电荷、质量较大的氦核；β⁻ 粒子是带 $-1$ 电荷的高速电子；γ 辐射是不带电的电磁波。',
        ),
        text(
          'Alpha is most ionising and least penetrating, stopped by paper or a few centimetres of air. Beta has medium ionising and penetrating ability and is stopped by a few millimetres of aluminium. Gamma is least ionising and most penetrating and is reduced by thick lead or concrete.',
          'α 的电离能力最强、穿透能力最弱，可被纸或几厘米空气阻挡；β 的电离和穿透能力居中，可被几毫米铝阻挡；γ 的电离能力最弱、穿透能力最强，需要厚铅或混凝土来减弱。',
        ),
        text(
          'In electric and magnetic fields, alpha and beta deflect in opposite directions because their charges are opposite; beta deflects more because its mass is much smaller. Gamma is not deflected. Greater charge and the way kinetic energy is deposited help explain relative ionisation.',
          '在电场和磁场中，α 与 β 因电荷相反而向相反方向偏转；β 质量小得多，因此偏转更明显。γ 不偏转。电荷大小及动能沉积方式可用于解释不同的电离能力。',
        ),
      ],
    },
    {
      heading: text('3. Radioactive decay and equations', '3. 放射性衰变与方程'),
      paragraphs: [
        text(
          'Radioactive decay is a spontaneous and random change in an unstable nucleus, emitting alpha or beta particles and/or gamma radiation. Alpha or beta decay changes the nucleus into a different element.',
          '放射性衰变是不稳定原子核自发、随机发生的变化，可发射 α 或 β 粒子和/或 γ 辐射。α 或 β 衰变会使原子核变成另一种元素。',
        ),
        text(
          'An isotope may be unstable because the nucleus has too many neutrons or is too heavy. Decay tends to increase stability. In beta-minus emission, a neutron changes into a proton and an electron; this reduces excess neutrons.',
          '同位素可能因中子过多或原子核过重而不稳定。衰变会使稳定性提高。β⁻ 发射中，一个中子变成一个质子和一个电子，从而减少过量中子。',
        ),
      ],
      formulas: [
        formula('Alpha decay', 'α 衰变', '{}^{A}_{Z}\\mathrm{X}\\rightarrow{}^{A-4}_{Z-2}\\mathrm{Y}+{}^{4}_{2}\\alpha'),
        formula('Beta-minus decay', 'β⁻ 衰变', '{}^{A}_{Z}\\mathrm{X}\\rightarrow{}^{A}_{Z+1}\\mathrm{Y}+{}^{0}_{-1}\\beta'),
        formula('Nuclear change in beta-minus emission', 'β⁻ 发射中的核内变化', 'n\\rightarrow p+e^-'),
      ],
    },
    {
      heading: text('4. Half-life and decay curves', '4. 半衰期与衰变曲线'),
      paragraphs: [
        text(
          'Half-life is the time taken for half the nuclei of a particular isotope in any sample to decay. It is also the time for activity or corrected count rate to halve.',
          '半衰期是样品中某种同位素的一半原子核发生衰变所需的时间，也等于活度或修正计数率减半所需的时间。',
        ),
        text(
          'For Core calculations, background is already excluded. Supplement questions may provide a decay curve containing background: determine the background level, subtract it, then find the halving time from corrected values.',
          'Core 计算中本底已被排除。Supplement 题可能给出含本底的衰变曲线：先确定本底水平并扣除，再用修正值寻找减半时间。',
        ),
      ],
      formulas: [formula('Repeated half-lives', '多个半衰期', 'N=N_0\\left(\\frac12\\right)^n')],
    },
    {
      heading: text('5. Choosing isotopes for applications', '5. 为应用选择同位素'),
      paragraphs: [
        text(
          'Choice depends on radiation type, penetration and half-life. Smoke alarms use a long-lived alpha source because alpha strongly ionises air but is easily contained. Food irradiation and equipment sterilisation use penetrating gamma radiation. Thickness control selects radiation that is partly absorbed by the material. Cancer diagnosis and treatment use gamma emitters with penetration and half-life suited to the procedure.',
          '同位素选择取决于辐射种类、穿透能力和半衰期。烟雾报警器使用长半衰期 α 源，因为 α 能强烈电离空气且易于屏蔽；食品辐照和设备灭菌使用穿透性强的 γ 辐射；厚度控制选用会被材料部分吸收的辐射；癌症诊断与治疗使用穿透性和半衰期适合具体过程的 γ 源。',
        ),
      ],
    },
    {
      heading: text('6. Biological effects and safety', '6. 生物效应与安全'),
      paragraphs: [
        text(
          'Ionising radiation can kill cells, cause mutations and increase cancer risk. Safe handling reduces exposure time, increases distance from the source and uses shielding suited to the radiation.',
          '电离辐射可杀死细胞、引起突变并增加癌症风险。安全操作应缩短暴露时间、增大与放射源的距离，并使用适合该辐射的屏蔽材料。',
        ),
        text(
          'Sources are moved with remote handling tools, used behind shielding and stored in labelled, shielded containers. The source should be kept away from the body and exposed only when necessary.',
          '放射源应使用远程工具移动，在屏蔽后使用，并存放于有标识的屏蔽容器中。应使放射源远离身体，且仅在必要时暴露。',
        ),
      ],
    },
  ],
};

export const igcseUnit5Lessons: CurriculumLesson[] = [
  nuclearModelLesson,
  radioactivityLesson,
];
