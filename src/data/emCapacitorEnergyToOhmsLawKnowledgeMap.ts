import type {
  CurriculumClassroomQuestion,
  CurriculumFormula,
  CurriculumImage,
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

const deckFigure = (
  filename: string,
  altEn: string,
  altZh: string,
  captionEn: string,
  captionZh: string,
): CurriculumImage => ({
  src: `/curriculum-assets/em-capacitor-energy-ohms-law/${filename}`,
  alt: text(altEn, altZh),
  caption: text(captionEn, captionZh),
  sourceLabel: text('Figure-only teaching-deck extract', '课件中的独立教学图像'),
});

const chargingImage = deckFigure(
  'incremental-capacitor-charging.png',
  'A capacitor circuit showing a small amount of charge transferred during charging.',
  '电容器充电过程中转移微小电荷的电路示意图。',
  'Each additional charge element crosses a larger potential difference, so the charging work must be integrated.',
  '后续每一小份电荷都要跨越更大的电势差,因此充电功必须积分。',
);

const dielectricImage = deckFigure(
  'dielectric-polarization.png',
  'Bound charge polarization inside a dielectric between capacitor plates.',
  '电容器极板之间电介质的束缚电荷极化。',
  'Polarization creates an induced field opposite the original field, reducing the net field for fixed free charge.',
  '极化产生与原电场反向的感应电场,在自由电荷固定时减小净电场。',
);

const driftImage = deckFigure(
  'drift-before-after-field.png',
  'Random carrier motion before an electric field and net drift after the field is applied.',
  '施加电场前的载流子随机运动与施加后形成的净漂移。',
  'Zero current means zero net drift, not zero microscopic carrier motion.',
  '电流为零表示净漂移为零,并不表示载流子的微观运动停止。',
);

const currentAreaImage = deckFigure(
  'current-through-cross-section.png',
  'Charge carriers crossing a wire cross section in a time interval.',
  '电荷载流子在一段时间内穿过导线横截面。',
  'Current counts net charge crossing a selected surface per unit time.',
  '电流衡量单位时间内穿过所选截面的净电荷量。',
);

const circuitStatesImage = deckFigure(
  'circuit-states.svg',
  'Aligned schematics comparing closed, open, and short circuits.',
  '并排比较闭合、断路和短路的电路图。',
  'A break stops steady flow; a short provides a bypass path with negligible potential difference.',
  '断点阻止稳恒电流;短路提供近乎无电势差的旁路。',
);

const circuitSymbolsImage = deckFigure(
  'circuit-symbols.svg',
  'Standard schematic symbols for common circuit elements.',
  '常见电路元件的标准电路图符号。',
  'Schematics preserve electrical connections rather than the physical placement of components.',
  '电路图保留电气连接关系,而不是元件的实际摆放位置。',
);

const resistanceGeometryImage = deckFigure(
  'resistance-geometry.svg',
  'A uniform conductor labeled with length, area, electric field, and current density.',
  '标出长度、横截面积、电场和电流密度的均匀导体。',
  'Material behavior and conductor geometry combine to determine resistance.',
  '材料性质与导体几何共同决定电阻。',
);

const ivGraphImage = deckFigure(
  'iv-graphs.svg',
  'Paired current-potential-difference graphs for ohmic and non-ohmic behavior.',
  '欧姆与非欧姆行为的电流-电势差对比图。',
  'On an $I$ versus $\\Delta V$ graph, constant slope means ohmic behavior and the slope equals $1/R$.',
  '在 $I$ 对 $\\Delta V$ 图像中,恒定斜率表示欧姆行为,且斜率等于 $1/R$。',
);

const capacitorEnergyCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-10-energy-fixed-charge',
  title: text('Classroom Check: isolated capacitor', '课堂题:孤立电容器'),
  prompt: text(
    'A charged capacitor is disconnected from its battery, so $Q$ stays fixed. Its capacitance is doubled. What happens to its stored energy?',
    '一个已充电的电容器与电池断开,因此 $Q$ 固定。其电容变为两倍,储存能量如何变化?',
  ),
  choices: [
    { label: 'A', text: text('It doubles.', '变为两倍。') },
    { label: 'B', text: text('It stays the same.', '保持不变。') },
    { label: 'C', text: text('It becomes one half.', '变为一半。') },
    { label: 'D', text: text('It becomes one quarter.', '变为四分之一。') },
  ],
  correctAnswer: 'C',
  feedback: text('For fixed $Q$, use $U_C=Q^2/(2C)$. Doubling $C$ halves the energy.', '当 $Q$ 固定时,使用 $U_C=Q^2/(2C)$。$C$ 加倍使能量减半。'),
};

const dielectricCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-10-dielectric-connected',
  title: text('Classroom Check: battery-connected dielectric', '课堂题:连接电池时插入电介质'),
  prompt: text(
    'A dielectric with $\\kappa>1$ completely fills a capacitor that remains connected to an ideal battery. Which quantities increase?',
    '一个始终连接理想电池的电容器被介电常数 $\\kappa>1$ 的材料完全填充。哪些量增大?',
  ),
  choices: [
    { label: 'A', text: text('Only $C$', '只有 $C$') },
    { label: 'B', text: text('$C$ and $Q$', '$C$ 和 $Q$') },
    { label: 'C', text: text('$C$ and $\\Delta V$', '$C$ 和 $\\Delta V$') },
    { label: 'D', text: text('$Q$ and $\\Delta V$', '$Q$ 和 $\\Delta V$') },
  ],
  correctAnswer: 'B',
  feedback: text('The battery fixes $\\Delta V$. Since $C$ increases to $\\kappa C_0$, $Q=C\\Delta V$ also increases.', '电池固定 $\\Delta V$。由于 $C$ 增大到 $\\kappa C_0$,$Q=C\\Delta V$ 也增大。'),
};

const currentCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-11-current-density',
  title: text('Classroom Check: nonuniform current density', '课堂题:非均匀电流密度'),
  prompt: text(
    'Current density in a circular wire points along the wire but varies with radius. Which expression must be used for the total current?',
    '圆形导线中的电流密度沿导线方向,但随半径变化。求总电流必须使用哪个表达式?',
  ),
  choices: [
    { label: 'A', text: text('$I=JA$ using any local value of $J$', '任取一个局部 $J$ 后用 $I=JA$') },
    { label: 'B', text: text('$I=\\int_A\\vec J\\cdot d\\vec A$', '$I=\\int_A\\vec J\\cdot d\\vec A$') },
    { label: 'C', text: text('$I=dA/dt$', '$I=dA/dt$') },
    { label: 'D', text: text('$I=\\rho J$', '$I=\\rho J$') },
  ],
  correctAnswer: 'B',
  feedback: text('When $\\vec J$ is nonuniform, add the contribution through every area element with a surface integral.', '当 $\\vec J$ 不均匀时,必须用面积分累加每个面积元的贡献。'),
};

const circuitCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-11-circuit-state',
  title: text('Classroom Check: open or short?', '课堂题:断路还是短路?'),
  prompt: text(
    'A wire directly connects the two terminals of an ideal battery and bypasses a lamp. Which description best matches the path through the wire?',
    '一根导线直接连接理想电池两端并绕过灯泡。该导线路径最符合哪种描述?',
  ),
  choices: [
    { label: 'A', text: text('Open circuit', '断路') },
    { label: 'B', text: text('Short circuit', '短路') },
    { label: 'C', text: text('Capacitive path', '电容通路') },
    { label: 'D', text: text('No electrical loop', '不存在电气回路') },
  ],
  correctAnswer: 'B',
  feedback: text('The direct wire is a near-zero-potential-difference bypass path, which is the defining feature of a short circuit.', '直接导线形成近乎零电势差的旁路,这正是短路的特征。'),
};

const resistanceCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-11-resistance-geometry',
  title: text('Classroom Check: geometry scaling', '课堂题:几何比例'),
  prompt: text(
    'A uniform wire is stretched to twice its original length while its volume and resistivity remain constant. What is the new resistance?',
    '一根均匀导线被拉伸到原长度的两倍,体积与电阻率保持不变。新电阻是多少?',
  ),
  choices: [
    { label: 'A', text: text('$R_0/2$', '$R_0/2$') },
    { label: 'B', text: text('$R_0$', '$R_0$') },
    { label: 'C', text: text('$2R_0$', '$2R_0$') },
    { label: 'D', text: text('$4R_0$', '$4R_0$') },
  ],
  correctAnswer: 'D',
  feedback: text('Constant volume means doubling $L$ halves $A$. Since $R=\\rho L/A$, both changes multiply the resistance by two, giving $4R_0$.', '体积不变意味着 $L$ 加倍时 $A$ 减半。由 $R=\\rho L/A$,两个变化各贡献两倍,所以得到 $4R_0$。'),
};

const ohmGraphCheck: CurriculumClassroomQuestion = {
  id: 'apc-em-11-ohm-graph-slope',
  title: text('Classroom Check: read the axes first', '课堂题:先看坐标轴'),
  prompt: text(
    'An ohmic resistor produces a straight-line graph with $I$ on the vertical axis and $\\Delta V$ on the horizontal axis. What does the slope represent?',
    '一个欧姆电阻的图像以 $I$ 为纵轴、$\\Delta V$ 为横轴,并呈直线。斜率表示什么?',
  ),
  choices: [
    { label: 'A', text: text('$R$', '$R$') },
    { label: 'B', text: text('$1/R$', '$1/R$') },
    { label: 'C', text: text('$R^2$', '$R^2$') },
    { label: 'D', text: text('Electric power', '电功率') },
  ],
  correctAnswer: 'B',
  feedback: text('$I=\\Delta V/R$, so the slope of $I$ versus $\\Delta V$ is $1/R$. Reversing the axes gives slope $R$.', '$I=\\Delta V/R$,因此 $I$ 对 $\\Delta V$ 的斜率是 $1/R$;交换坐标轴后斜率才是 $R$。'),
};

// LESSON-01: CED 10.3.A.4-10.3.A.5
const capacitorEnergyLesson: CurriculumLesson = {
  title: text('Capacitor Energy: Why the Factor One-Half Appears', '电容储能:为什么会出现二分之一'),
  description: text('Start from the camera-flash energy problem, then integrate the rising charging voltage instead of memorizing an energy formula.', '从相机闪光的能量问题出发,对不断升高的充电电压积分,而不是直接背储能公式。'),
  sections: [
    {
      heading: text('Hook: slow charging, fast release', '钩子:慢充电,快释放'),
      paragraphs: [text('A camera battery can spend seconds charging a capacitor, then the flash releases much of that stored energy in milliseconds. Charge and capacitance alone do not tell us how much work was accumulated.', '相机电池可以用数秒给电容器充电,闪光灯却在毫秒内释放大部分储能。仅知道电荷和电容,还不能直接看出积累了多少功。')],
      images: [chargingImage],
    },
    {
      heading: text('Why the work must be integrated', '为什么必须积分充电功'),
      paragraphs: [text('At an intermediate plate charge $q$, the potential difference is $\\Delta V(q)=q/C$. The first charge arrives at almost zero voltage, while later charge must cross a larger voltage.', '当极板电荷达到中间值 $q$ 时,电势差为 $\\Delta V(q)=q/C$。最初的电荷几乎在零电压下转移,后续电荷要跨越更大的电压。')],
      formulas: [
        formula('Incremental external work', '外力的微元功', 'dW_{\\mathrm{ext}}=\\Delta V(q)\\,dq=\\frac{q}{C}\\,dq'),
        formula('Stored energy', '储存能量', 'U_C=\\int_0^Q\\frac{q}{C}\\,dq=\\frac{Q^2}{2C}'),
        formula('Equivalent forms', '等价形式', 'U_C=\\frac{Q^2}{2C}=\\frac12Q\\Delta V=\\frac12C(\\Delta V)^2'),
      ],
      bullets: [text('The factor $1/2$ is the area under the straight $\\Delta V$-versus-$q$ graph.', '$1/2$ 来自 $\\Delta V$-$q$ 直线图像下方的面积。'), text('Assume an ideal linear capacitor whose $C$ remains constant during charging.', '假设理想线性电容器在充电过程中 $C$ 保持不变。')],
    },
    {
      heading: text('Decision rule: identify what stays fixed', '判断规则:先确定固定量'),
      bullets: [text('Battery disconnected: use $Q$ fixed. Battery connected: use $\\Delta V$ fixed.', '断开电池时 $Q$ 固定;连接电池时 $\\Delta V$ 固定。'), text('If geometry changes, recalculate $C$ before comparing energy.', '若几何结构改变,先重新计算 $C$,再比较能量。'), text('Capacitor energy alone need not be conserved: the battery or an external mechanical agent may do work.', '电容器自身的能量不一定守恒:电池或外部机械力可能做功。')],
      classroomQuestions: [capacitorEnergyCheck],
    },
  ],
  studentVersion: {
    title: text('Capacitor Energy', '电容储能'),
    description: text('Integrate the charging work and choose the energy form that matches the fixed quantity.', '积分充电功,并根据固定量选择储能公式。'),
    sections: [
      { heading: text('Physical picture', '物理图像'), images: [chargingImage], bullets: [text('Voltage rises as charge accumulates, so the charging work is an integral.', '电荷积累时电压升高,因此充电功必须积分。')] },
      { heading: text('Derivation', '推导'), formulas: [formula('Charging work', '充电功', 'U_C=\\int_0^Q\\frac{q}{C}\\,dq=\\frac{Q^2}{2C}'), formula('Equivalent forms', '等价形式', 'U_C=\\frac{Q^2}{2C}=\\frac12Q\\Delta V=\\frac12C(\\Delta V)^2')] },
      { heading: text('Fixed-quantity check', '固定量检查'), bullets: [text('Disconnected: $Q$ fixed. Connected: $\\Delta V$ fixed.', '断开:$Q$ 固定;连接:$\\Delta V$ 固定。')], classroomQuestions: [capacitorEnergyCheck] },
    ],
  },
};

// LESSON-02: CED 10.4.A.1-10.4.A.5
const dielectricLesson: CurriculumLesson = {
  title: text('Dielectrics: Polarization Changes the Field', '电介质:极化如何改变电场'),
  description: text('Explain the material response first, then derive field, capacitance, charge, voltage, and energy changes for connected and isolated capacitors.', '先解释材料的极化响应,再判断连接与孤立电容器中的电场、电容、电荷、电压和能量变化。'),
  sections: [
    {
      heading: text('Hook: how can an insulator increase capacitance?', '钩子:绝缘体为什么能增大电容?'),
      paragraphs: [text('A dielectric prevents conduction across the gap, yet the same capacitor geometry can hold more charge per volt after the material is inserted. The missing mechanism is polarization of bound charge.', '电介质阻止电荷穿过间隙导电,但插入后同一几何结构却能每伏储存更多电荷。缺少的机制是束缚电荷的极化。')],
      images: [dielectricImage],
    },
    {
      heading: text('Polarization and dielectric constant', '极化与介电常数'),
      bullets: [text('The applied field slightly separates or aligns bound charge inside the material.', '外电场使材料内部的束缚电荷发生微小分离或取向。'), text('The induced field opposes the applied field, reducing the net field for fixed free plate charge.', '感应电场与外电场反向,在自由极板电荷固定时减小净电场。')],
      formulas: [formula('Dielectric constant', '介电常数', '\\kappa=\\frac{\\epsilon}{\\epsilon_0}'), formula('Fully filled capacitor', '完全填充的电容器', 'E=\\frac{E_0}{\\kappa},\\qquad C=\\kappa C_0')],
    },
    {
      heading: text('Connected versus isolated', '连接电池与孤立电容器'),
      bullets: [text('Battery disconnected: $Q$ stays fixed, so $C$ increases while $\\Delta V=Q/C$, $E$, and $U_C=Q^2/(2C)$ decrease.', '断开电池:$Q$ 固定,所以 $C$ 增大,而 $\\Delta V=Q/C$、$E$ 和 $U_C=Q^2/(2C)$ 减小。'), text('Battery connected: $\\Delta V$ stays fixed, so $C$, $Q=C\\Delta V$, and $U_C=C(\\Delta V)^2/2$ increase.', '连接电池:$\\Delta V$ 固定,所以 $C$、$Q=C\\Delta V$ 与 $U_C=C(\\Delta V)^2/2$ 增大。'), text('Interpret energy changes together with work by the battery and the agent inserting the dielectric.', '能量变化必须结合电池与插入电介质的外部作用所做的功来解释。')],
      classroomQuestions: [dielectricCheck],
    },
  ],
  studentVersion: {
    title: text('Dielectrics', '电介质'),
    description: text('Use polarization and the fixed-quantity rule to predict every change.', '用极化机制与固定量规则预测各物理量变化。'),
    sections: [
      { heading: text('Mechanism', '机制'), images: [dielectricImage], formulas: [formula('Effect', '作用', 'E=\\frac{E_0}{\\kappa},\\qquad C=\\kappa C_0')], bullets: [text('Bound-charge polarization creates an opposing field.', '束缚电荷极化产生反向电场。')] },
      { heading: text('Decision rule', '判断规则'), bullets: [text('Disconnected: $Q$ fixed. Connected: $\\Delta V$ fixed.', '断开:$Q$ 固定;连接:$\\Delta V$ 固定。'), text('Use the appropriate energy form only after identifying the fixed quantity.', '先确定固定量,再选择对应的储能公式。')], classroomQuestions: [dielectricCheck] },
    ],
  },
};

// LESSON-03: CED 11.1.A.1-11.1.A.4.ii
const electricCurrentLesson: CurriculumLesson = {
  title: text('Electric Current: From Random Motion to Net Flow', '电流:从随机运动到净流动'),
  description: text('Make charge flow visible, distinguish scalar current from vector current density, and derive both carrier and surface-integral forms.', '把电荷流动可视化,区分标量电流与矢量电流密度,并推导载流子形式与面积分形式。'),
  sections: [
    {
      heading: text('Hook: why does a lamp respond before electrons cross the circuit?', '钩子:电子尚未穿过整个电路,灯为什么已经响应?'),
      paragraphs: [text('Individual carriers have rapid random microscopic motion but only a small net drift. Closing the switch establishes an electric field through the circuit quickly, organizing that drift.', '单个载流子具有快速的随机微观运动,但净漂移很小。闭合开关会迅速在电路中建立电场,从而组织出净漂移。')],
      images: [driftImage],
    },
    {
      heading: text('Current and current density', '电流与电流密度'),
      images: [currentAreaImage],
      formulas: [formula('Current', '电流', 'I=\\frac{dQ}{dt}'), formula('Carrier model', '载流子模型', 'I=nqv_dA'), formula('Current density', '电流密度', '\\vec J=nq\\vec v_d'), formula('General surface relation', '一般面积关系', 'I=\\int_A\\vec J\\cdot d\\vec A')],
      bullets: [text('$I=nqv_dA$ follows by counting the carriers in a cylinder of length $v_d\\,dt$.', '$I=nqv_dA$ 来自统计长度为 $v_d\\,dt$ 的圆柱体内载流子。'), text('Use $I=JA$ only when $\\vec J$ is uniform and perpendicular to the area.', '只有当 $\\vec J$ 均匀且垂直截面时才能直接用 $I=JA$。')],
    },
    {
      heading: text('Direction rules and misconceptions', '方向规则与常见误区'),
      bullets: [text('Current $I$ is a scalar with an assigned circuit direction; current density $\\vec J$ is a vector field.', '电流 $I$ 是带指定电路方向的标量;电流密度 $\\vec J$ 是矢量场。'), text('Conventional current follows positive charge. Electron drift in a metal points the other way.', '传统电流方向按正电荷运动定义;金属中的电子漂移方向相反。'), text('Zero current means zero net drift, not zero carrier speed.', '电流为零表示净漂移为零,不是载流子速率为零。')],
      classroomQuestions: [currentCheck],
    },
  ],
  studentVersion: {
    title: text('Electric Current', '电流'),
    description: text('Connect charge crossing a surface with drift and current density.', '把穿过截面的电荷与漂移、电流密度连接起来。'),
    sections: [
      { heading: text('Microscopic picture', '微观图像'), images: [driftImage, currentAreaImage], bullets: [text('Random motion can be fast while net drift is slow.', '随机运动可以很快,而净漂移很慢。')] },
      { heading: text('Core relations', '核心关系'), formulas: [formula('Current', '电流', 'I=\\frac{dQ}{dt}=nqv_dA'), formula('Current density', '电流密度', '\\vec J=nq\\vec v_d,\\qquad I=\\int_A\\vec J\\cdot d\\vec A')], bullets: [text('$I$ is scalar; $\\vec J$ is vector. Conventional current is opposite electron drift in metals.', '$I$ 是标量;$\\vec J$ 是矢量。金属中的传统电流与电子漂移方向相反。')], classroomQuestions: [currentCheck] },
    ],
  },
};

// LESSON-04: CED 11.2.A.1-11.2.A.4.ii
const simpleCircuitsLesson: CurriculumLesson = {
  title: text('Simple Circuits: Paths, Loops, and Schematics', '简单电路:路径、回路与电路图'),
  description: text('Use topology rather than component appearance to distinguish closed, open, and short circuits.', '根据连接拓扑而非元件外观,区分闭合电路、断路与短路。'),
  sections: [
    {
      heading: text('Hook: one cut wire, one dangerous bypass', '钩子:一处断线与一条危险旁路'),
      paragraphs: [text('Cutting one wire can stop a lamp, while placing a wire directly across a source can create a large current that bypasses the lamp. The difference is the electrical path.', '剪断一根导线会使灯熄灭,而用导线直接跨接电源会产生绕过灯泡的大电流。关键差别在电气路径。')],
      images: [circuitStatesImage],
    },
    {
      heading: text('Circuit states and loop language', '电路状态与回路语言'),
      bullets: [text('A closed path can support steady current; an open path contains a break.', '闭合路径可以支持稳恒电流;断路路径含有断点。'), text('A short circuit provides a path with negligible potential difference that bypasses a load.', '短路提供近乎无电势差的路径并绕过负载。'), text('A circuit can contain multiple loops, and one element can belong to more than one loop.', '电路可以包含多个回路,同一元件也可以属于多个回路。'), text('Current arrows follow conventional-current direction.', '电流箭头按传统电流方向标注。')],
      classroomQuestions: [circuitCheck],
    },
    {
      heading: text('Schematics preserve topology', '电路图保留连接拓扑'),
      images: [circuitSymbolsImage],
      paragraphs: [text('A schematic records which terminals connect, not where a component sits in a photograph. Standard symbols make the topology readable and testable.', '电路图记录端点之间如何连接,而不是元件在照片中的摆放位置。标准符号让连接拓扑可以被清楚读取和检验。')],
    },
  ],
  studentVersion: {
    title: text('Simple Circuits', '简单电路'),
    description: text('Read electrical paths and translate physical layouts into schematics.', '读取电气路径,并把实际装置转换成电路图。'),
    sections: [
      { heading: text('Three circuit states', '三种电路状态'), images: [circuitStatesImage], bullets: [text('Closed = complete path; open = break; short = near-zero-voltage bypass.', '闭合 = 完整路径;断路 = 存在断点;短路 = 近零电势差旁路。')], classroomQuestions: [circuitCheck] },
      { heading: text('Schematic language', '电路图语言'), images: [circuitSymbolsImage], bullets: [text('Preserve connections and loops, not physical placement.', '保留连接与回路,不是实际摆放位置。')] },
    ],
  },
};

// LESSON-05: CED 11.3.A.1-11.3.A.3
const resistanceLesson: CurriculumLesson = {
  title: text('Resistance and Resistivity: Material Meets Geometry', '电阻与电阻率:材料遇上几何'),
  description: text('Separate a material property from a component property, then derive the uniform and position-dependent resistance relations.', '区分材料性质与元件性质,再推导均匀导体和位置相关导体的电阻关系。'),
  sections: [
    {
      heading: text('Hook: why do long, thin wires resist more?', '钩子:为什么又长又细的导线电阻更大?'),
      paragraphs: [text('Two wires made from the same material can behave differently because carriers must travel through different lengths and cross-sectional areas. We need one quantity for the material and another for the finished component.', '两根同材料导线会因长度和横截面积不同而表现不同。因此需要一个量描述材料,另一个量描述制成后的元件。')],
      images: [resistanceGeometryImage],
    },
    {
      heading: text('From the local material model to resistance', '从局部材料模型到电阻'),
      formulas: [formula('Local material relation', '局部材料关系', '\\vec E=\\rho\\vec J,\\qquad \\sigma=\\frac1\\rho'), formula('Uniform conductor', '均匀导体', 'R=\\rho\\frac{L}{A}'), formula('Position-dependent resistivity', '位置相关电阻率', 'R=\\int_0^L\\frac{\\rho(x)}{A(x)}\\,dx')],
      bullets: [text('Resistivity $\\rho$ characterizes material behavior; resistance $R$ also depends on geometry.', '电阻率 $\\rho$ 描述材料行为;电阻 $R$ 还取决于几何。'), text('For a uniform wire, use $\\Delta V=EL$, $I=JA$, and $E=\\rho J$ to obtain $R=\\Delta V/I=\\rho L/A$.', '对均匀导线,结合 $\\Delta V=EL$、$I=JA$ 与 $E=\\rho J$ 得到 $R=\\Delta V/I=\\rho L/A$。'), text('If $\\rho$ or $A$ varies along the wire, add differential resistances in series using the integral.', '若 $\\rho$ 或 $A$ 沿导线变化,用积分累加串联的微元电阻。')],
    },
    {
      heading: text('Temperature boundary and geometry check', '温度边界与几何检查'),
      bullets: [text('The CED requires qualitative reasoning that resistivity may depend on temperature; no universal linear coefficient model is assumed here.', 'CED 要求定性分析电阻率可能随温度变化;这里不假设通用的线性温度系数模型。'), text('Cross-sectional area, not radius, appears in $R=\\rho L/A$.', '$R=\\rho L/A$ 中出现的是横截面积,不是半径。')],
      classroomQuestions: [resistanceCheck],
    },
  ],
  studentVersion: {
    title: text('Resistance and Resistivity', '电阻与电阻率'),
    description: text('Separate material behavior from conductor geometry.', '区分材料行为与导体几何。'),
    sections: [
      { heading: text('Model', '模型'), images: [resistanceGeometryImage], formulas: [formula('Local', '局部关系', '\\vec E=\\rho\\vec J'), formula('Uniform wire', '均匀导线', 'R=\\rho\\frac{L}{A}'), formula('Varying wire', '变化导线', 'R=\\int_0^L\\frac{\\rho(x)}{A(x)}\\,dx')], bullets: [text('$\\rho$ is a material property; $R$ also depends on length and area.', '$\\rho$ 是材料性质;$R$ 还取决于长度与面积。')] },
      { heading: text('Scaling check', '比例检查'), classroomQuestions: [resistanceCheck] },
    ],
  },
};

// LESSON-06: CED 11.3.B.1-11.3.B.1.iv
const ohmsLawLesson: CurriculumLesson = {
  title: text('Ohm\'s Law: A Testable Model, Not a Definition', '欧姆定律:可检验的模型,不是定义'),
  description: text('Use measurements and graph shape to decide whether resistance remains constant across an operating range.', '用测量与图像形状判断电阻在某个工作范围内是否保持恒定。'),
  sections: [
    {
      heading: text('Hook: why do some current-voltage graphs bend?', '钩子:为什么有些电流-电压图像会弯曲?'),
      paragraphs: [text('A resistor can show a straight current-voltage relation over one range, while another element or the same component at a changing temperature produces a curved graph. One measurement cannot establish a law.', '电阻器可能在某个范围内呈线性电流-电压关系,而另一个元件或温度变化后的同一元件会产生曲线。单次测量无法验证一条规律。')],
      images: [ivGraphImage],
    },
    {
      heading: text('Definition, model, and graph interpretation', '定义、模型与图像解释'),
      formulas: [formula('Resistance at an operating point', '工作点电阻', 'R=\\frac{\\Delta V}{I}'), formula('Ohmic model', '欧姆模型', '\\Delta V=IR,\\qquad R=\\mathrm{constant}')],
      bullets: [text('$R=\\Delta V/I$ defines a ratio at an operating point; Ohm\'s law is the additional claim that $R$ remains constant over the tested range.', '$R=\\Delta V/I$ 定义某个工作点的比值;欧姆定律还要求 $R$ 在所测范围内保持恒定。'), text('On a $\\Delta V$-versus-$I$ graph, slope is $R$. On an $I$-versus-$\\Delta V$ graph, slope is $1/R$.', '$\\Delta V$ 对 $I$ 图像的斜率是 $R$;$I$ 对 $\\Delta V$ 图像的斜率是 $1/R$。'), text('A changing slope indicates non-ohmic behavior over that range; energy may still be converted thermally even though quantitative power belongs to the next topic.', '斜率变化表示该范围内为非欧姆行为;其中仍可能发生热能转化,但定量功率属于下一 topic。')],
      classroomQuestions: [ohmGraphCheck],
    },
    {
      heading: text('Experimental test', '实验检验'),
      bullets: [text('Vary the applied potential difference across several values and measure current at each value.', '改变多个电势差并逐次测量电流。'), text('Plot the data with labeled axes and uncertainty; decide whether one constant slope describes the tested range.', '绘制带坐标标签和不确定度的数据图,判断一个恒定斜率能否描述所测范围。'), text('Control temperature when the goal is to test intrinsic ohmic behavior.', '若目标是检验材料本身的欧姆行为,应控制温度。')],
      takeaway: text('Read the axes, inspect the slope, and state the operating range before calling an element ohmic.', '先看坐标轴,再检查斜率,并说明工作范围,之后才能称元件为欧姆元件。'),
    },
  ],
  studentVersion: {
    title: text('Ohm\'s Law', '欧姆定律'),
    description: text('Use graph linearity and slope to test constant resistance.', '用图像线性与斜率检验电阻是否恒定。'),
    sections: [
      { heading: text('Graph test', '图像检验'), images: [ivGraphImage], formulas: [formula('Operating-point ratio', '工作点比值', 'R=\\frac{\\Delta V}{I}'), formula('Ohmic model', '欧姆模型', '\\Delta V=IR,\\quad R=\\mathrm{constant}')], bullets: [text('$\\Delta V$ vs. $I$: slope $R$. $I$ vs. $\\Delta V$: slope $1/R$.', '$\\Delta V$ 对 $I$:斜率为 $R$;$I$ 对 $\\Delta V$:斜率为 $1/R$。')], classroomQuestions: [ohmGraphCheck] },
      { heading: text('Decision rule', '判断规则'), takeaway: text('One point gives a ratio; multiple measurements test whether the ratio is constant.', '一个点只能给出比值;多个测量点才能检验该比值是否恒定。') },
    ],
  },
};

export const capacitorEnergyAndDielectricLessons: CurriculumLesson[] = [
  capacitorEnergyLesson,
  dielectricLesson,
];

export const electricCurrentToOhmsLawLessons: CurriculumLesson[] = [
  electricCurrentLesson,
  simpleCircuitsLesson,
  resistanceLesson,
  ohmsLawLesson,
];
