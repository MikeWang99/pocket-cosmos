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

const magnetismLesson: CurriculumLesson = {
  title: text('4.1 Simple Phenomena of Magnetism', '4.1 磁现象基础'),
  description: text(
    'Magnetic poles and materials, induced magnetism, fields, field mapping and magnet applications.',
    '磁极与磁性材料、感应磁化、磁场、磁场描绘及磁体应用。',
  ),
  sections: [
    {
      heading: text('1. Poles, forces and magnetic materials', '1. 磁极、磁力与磁性材料'),
      paragraphs: [
        text(
          'Every magnet has a north pole and a south pole. Like poles repel and unlike poles attract. A magnet attracts suitable unmagnetised magnetic materials as well as other magnets; attraction alone therefore does not prove that an object is a magnet.',
          '每个磁体都有北极和南极。同名磁极相斥，异名磁极相吸。磁体既能吸引其他磁体，也能吸引合适的未磁化磁性材料，因此仅凭吸引不能证明某物体本身是磁体。',
        ),
        text(
          'Magnetic materials can be magnetised; non-magnetic materials cannot. Soft iron is readily magnetised and demagnetised, so it is used for temporary magnets and electromagnets. Steel is harder to magnetise but retains magnetism, so it is used for permanent magnets.',
          '磁性材料可以被磁化，非磁性材料不能。软铁容易磁化也容易退磁，适合临时磁体和电磁铁；钢较难磁化但能保持磁性，适合永久磁体。',
        ),
        text(
          'Induced magnetism occurs when a magnetic material becomes magnetised in an external field. The nearer end acquires the pole that gives attraction to the inducing magnet.',
          '感应磁化是磁性材料在外磁场中获得磁性的过程。靠近外磁体的一端形成能与其相吸的异名磁极。',
        ),
      ],
    },
    {
      heading: text('2. Magnetic fields and field lines', '2. 磁场与磁感线'),
      paragraphs: [
        text(
          'A magnetic field is a region in which a magnetic pole experiences a force. Field direction at a point is the direction of force on a north pole placed there. Outside a bar magnet, field lines run from north to south and never cross.',
          '磁场是磁极会受到力的区域。某点磁场方向定义为放在该点的北极所受力的方向。条形磁体外部的磁感线由北极指向南极，且不会相交。',
        ),
        text(
          'Closer field-line spacing represents a stronger field. Magnetic forces arise from interactions between magnetic fields.',
          '磁感线越密，表示磁场相对越强。磁力来源于磁场之间的相互作用。',
        ),
      ],
    },
    {
      heading: text('3. Mapping fields and applications', '3. 描绘磁场与应用'),
      paragraphs: [
        text(
          'Iron filings reveal the pattern of a field but not its direction. A plotting compass placed at successive points gives both the local direction and enough points to draw field lines.',
          '铁屑可显示磁场分布形状，但不能显示方向。把小磁针依次放在不同位置，可确定局部方向并描出磁感线。',
        ),
        text(
          'Permanent magnets are useful where a steady field is required without a power supply. Electromagnets are useful where the field must be switched or varied, for example relays, lifting magnets and magnetic door locks.',
          '无需电源而需要稳定磁场时可使用永久磁体；需要开关或调节磁场时可使用电磁铁，例如继电器、起重电磁铁和磁力门锁。',
        ),
      ],
    },
  ],
};

const electricalQuantitiesLesson: CurriculumLesson = {
  title: text('4.2 Electrical Quantities', '4.2 电学量'),
  description: text(
    'Charge, current, e.m.f., potential difference, resistance, electrical energy and power.',
    '电荷、电流、电动势、电势差、电阻、电能与电功率。',
  ),
  sections: [
    {
      heading: text('1. Charge and electrostatics', '1. 电荷与静电'),
      paragraphs: [
        text(
          'There are positive and negative charges. Like charges repel and unlike charges attract. Rubbing two insulating solids transfers electrons only: the object gaining electrons becomes negative and the object losing electrons becomes positive.',
          '电荷分为正电荷和负电荷。同种电荷相斥，异种电荷相吸。摩擦两个绝缘固体时只转移电子：得到电子的物体带负电，失去电子的物体带正电。',
        ),
        text(
          'Electrostatic charge can be produced by rubbing and detected using attraction or repulsion of a known charge, or with an electroscope. Repulsion is the unambiguous test for like charge.',
          '可通过摩擦产生静电，并利用已知电荷的吸引或排斥，或验电器来检测电荷。排斥是判断同种电荷的明确证据。',
        ),
        text(
          'A conductor–insulator experiment charges one end of a sample and tests whether charge reaches the other end. Conductors contain mobile electrons; insulators hold electrons locally. Metals are typical conductors, while plastics and glass are typical insulators.',
          '导体与绝缘体实验可在样品一端加电荷，再检测电荷能否到达另一端。导体中存在可移动电子，绝缘体中的电子被局限在局部。金属是典型导体，塑料和玻璃是典型绝缘体。',
        ),
      ],
      formulas: [formula('Unit of charge (Supplement)', '电荷单位（Supplement）', '[Q]=\\mathrm{C}')],
    },
    {
      heading: text('2. Electric fields (Supplement)', '2. 电场（Supplement）'),
      paragraphs: [
        text(
          'An electric field is a region in which a charge experiences a force. Field direction is the direction of force on a positive test charge. Lines point away from positive charges and toward negative charges.',
          '电场是电荷会受到力的区域。电场方向定义为正试探电荷所受力的方向。电场线从正电荷指出并指向负电荷。',
        ),
        text(
          'Required patterns include radial fields around point charges and charged conducting spheres, and the uniform field between oppositely charged parallel plates, ignoring end effects.',
          '要求掌握点电荷和带电导体球周围的径向电场，以及忽略边缘效应时异号平行导电板之间的匀强电场。',
        ),
      ],
    },
    {
      heading: text('3. Current and charge flow', '3. 电流与电荷流动'),
      paragraphs: [
        text(
          'Electric current is associated with charge flow and is defined as charge passing a point per unit time. In metals, free electrons drift through the lattice. Conventional current is from positive to negative, opposite to electron flow.',
          '电流与电荷流动有关，定义为单位时间内通过某点的电荷量。金属中，自由电子在晶格中定向漂移。传统电流方向由正到负，与电子流方向相反。',
        ),
        text(
          'An ammeter is connected in series. Begin with a range that prevents overload, then select a more sensitive range if needed. Analogue scales require correct scale interpretation and eye-level reading.',
          '电流表串联接入电路。开始时选用可避免过载的量程，再视需要切换到更灵敏量程。模拟表需按正确刻度并平视读数。',
        ),
        text(
          'Direct current has one direction; alternating current repeatedly reverses direction.',
          '直流电方向不变；交流电方向周期性反转。',
        ),
      ],
      formulas: [formula('Current', '电流', 'I=\\frac{Q}{t}')],
    },
    {
      heading: text('4. E.m.f. and potential difference', '4. 电动势与电势差'),
      paragraphs: [
        text(
          'E.m.f. is the electrical work done by a source per unit charge moved around the complete circuit. Potential difference is the work done per unit charge passing through a component. Both are measured in volts but describe different energy transfers.',
          '电动势是电源使单位电荷绕完整电路运动所做的电功；电势差是单位电荷通过元件时所做的功。两者单位都是伏特，但描述不同位置的能量转移。',
        ),
        text(
          'A voltmeter is connected in parallel across two points or a component and should initially use a safe range. Its high resistance limits the current it draws.',
          '电压表并联在两个测量点或元件两端，开始时应选安全量程。其高电阻限制了流经电压表的电流。',
        ),
      ],
      formulas: [
        formula('E.m.f.', '电动势', '\\mathcal{E}=\\frac{W}{Q}'),
        formula('Potential difference', '电势差', 'V=\\frac{W}{Q}'),
      ],
    },
    {
      heading: text('5. Resistance and I–V characteristics', '5. 电阻与 I–V 特性'),
      paragraphs: [
        text(
          'Resistance is potential difference divided by current. To measure it, connect an ammeter in series and a voltmeter in parallel, vary the supply, record corresponding $V$ and $I$, and calculate $R=V/I$. Repeated pairs also reveal whether resistance is constant.',
          '电阻等于电势差除以电流。测量时把电流表串联、电压表并联，改变电源并记录对应的 $V$ 和 $I$，再计算 $R=V/I$。多组数据还能判断电阻是否恒定。',
        ),
        text(
          'For a metallic wire, resistance increases with length and decreases with cross-sectional area. A constant resistor has a straight $I$–$V$ graph through the origin; a filament lamp curves as heating raises resistance; a diode carries significant current mainly in one direction after its forward threshold.',
          '金属导线的电阻随长度增大而增大，随横截面积增大而减小。定值电阻的 $I$–$V$ 图像是过原点直线；灯丝灯泡因升温使电阻增大，图像弯曲；二极管主要在正向达到导通条件后才有明显电流。',
        ),
      ],
      formulas: [
        formula('Resistance', '电阻', 'R=\\frac{V}{I}'),
        formula('Wire dimensions (Supplement)', '导线尺寸关系（Supplement）', 'R\\propto\\frac{L}{A}'),
      ],
    },
    {
      heading: text('6. Electrical energy, power and cost', '6. 电能、电功率与费用'),
      paragraphs: [
        text(
          'A circuit transfers energy from a cell or mains supply to components and then to the surroundings. Power is the rate of electrical energy transfer.',
          '电路把能量从电池或市电电源转移到元件，再转移到环境。电功率是电能转移的速率。',
        ),
        text(
          'One kilowatt-hour is the energy transferred by a $1\\,\\mathrm{kW}$ appliance operating for $1\\,\\mathrm{h}$. Electricity cost equals energy in kilowatt-hours multiplied by tariff per kilowatt-hour.',
          '一千瓦时是 $1\\,\\mathrm{kW}$ 用电器工作 $1\\,\\mathrm{h}$ 所转移的能量。电费等于以千瓦时计的能量乘以每千瓦时单价。',
        ),
      ],
      formulas: [
        formula('Electrical power', '电功率', 'P=IV'),
        formula('Electrical energy', '电能', 'E=IVt'),
        formula('Kilowatt-hour', '千瓦时', '1\\,\\mathrm{kW\\,h}=3.6\\times10^6\\,\\mathrm{J}'),
        formula('Cost', '费用', '\\mathrm{cost}=E_{\\mathrm{kW\\,h}}\\times\\mathrm{tariff}'),
      ],
    },
  ],
};

const circuitsLesson: CurriculumLesson = {
  title: text('4.3 Electric Circuits', '4.3 电路'),
  description: text(
    'Circuit symbols and behaviour, series and parallel rules, sensors and potential dividers.',
    '电路符号与元件行为、串并联规律、传感器与分压器。',
  ),
  sections: [
    {
      heading: text('1. Circuit diagrams and components', '1. 电路图与元件'),
      paragraphs: [
        text(
          'Required circuit diagrams include cells, batteries, power supplies, generators, potential dividers, switches, fixed and variable resistors, heaters, NTC thermistors, LDRs, lamps, motors, ammeters, voltmeters, magnetising coils, transformers, fuses and relays. Diodes and LEDs are Supplement components.',
          '要求能绘制并理解含电池单元、电池组、电源、发电机、分压器、开关、定值与可变电阻、加热器、NTC 热敏电阻、光敏电阻、灯泡、电动机、电流表、电压表、磁化线圈、变压器、保险丝和继电器的电路图。二极管和 LED 属于 Supplement。',
        ),
        text(
          'Component behaviour matters as well as symbol recognition: an NTC thermistor’s resistance falls as temperature rises; an LDR’s resistance falls as light intensity rises; a diode conducts mainly in one direction; an LED emits light when forward biased.',
          '除识别符号外，还需掌握元件行为：NTC 热敏电阻温度升高时电阻减小；光敏电阻光照增强时电阻减小；二极管主要单向导电；LED 正向导通时发光。',
        ),
      ],
    },
    {
      heading: text('2. Series circuits', '2. 串联电路'),
      paragraphs: [
        text(
          'Current is the same at every point in a series circuit. E.m.f.s of sources in the same direction add; reversed sources subtract. Series resistances add, and the total p.d. equals the sum of component p.d.s.',
          '串联电路各处电流相同。同方向串联电源的电动势相加，反向电源相减。串联电阻相加，总电势差等于各元件电势差之和。',
        ),
      ],
      formulas: [
        formula('Series e.m.f.', '串联电动势', '\\mathcal{E}_{\\mathrm{total}}=\\sum\\mathcal{E}_i'),
        formula('Series resistance', '串联电阻', 'R_{\\mathrm{total}}=\\sum R_i'),
        formula('Series p.d.', '串联电势差', 'V_{\\mathrm{total}}=\\sum V_i'),
      ],
    },
    {
      heading: text('3. Parallel circuits', '3. 并联电路'),
      paragraphs: [
        text(
          'At a junction, total current entering equals total current leaving. The p.d. across every branch of a parallel arrangement is the same. Source current is greater than current in an individual branch, and combined resistance is less than either branch resistance.',
          '在结点处，流入的总电流等于流出的总电流。并联各支路两端电势差相同。干路电流大于单个支路电流，并联总电阻小于任一支路电阻。',
        ),
        text(
          'Lamps in parallel receive the full supply p.d., can be switched independently and continue operating if another branch opens.',
          '并联灯泡各自获得完整电源电势差，可以独立开关，并且一条支路断开时其他支路仍可工作。',
        ),
      ],
      formulas: [
        formula('Junction rule', '结点电流规律', '\\sum I_{\\mathrm{in}}=\\sum I_{\\mathrm{out}}'),
        formula('Two resistors in parallel', '两个并联电阻', '\\frac{1}{R_{\\mathrm{total}}}=\\frac{1}{R_1}+\\frac{1}{R_2}'),
      ],
    },
    {
      heading: text('4. Potential dividers and sensing', '4. 分压器与传感'),
      paragraphs: [
        text(
          'For a constant series current, the p.d. across a conductor increases as its resistance increases. A variable potential divider changes the fraction of supply voltage delivered to its output.',
          '串联电流不变时，导体两端电势差随其电阻增大而增大。可变分压器改变输出端获得的电源电压比例。',
        ),
        text(
          'Replacing one resistor with an NTC thermistor or LDR makes the output depend on temperature or light. The output trend depends on whether the sensor is the upper or lower resistor, so the circuit position must be analysed rather than memorised.',
          '把其中一个电阻替换为 NTC 热敏电阻或光敏电阻，可使输出随温度或光照改变。输出趋势取决于传感器位于上方还是下方，必须分析电路位置而不能死记。',
        ),
      ],
      formulas: [
        formula('Two-resistor divider', '双电阻分压', '\\frac{R_1}{R_2}=\\frac{V_1}{V_2}'),
        formula('Output across resistor 2', '电阻 2 两端的输出', 'V_{\\mathrm{out}}=V_{\\mathrm{in}}\\frac{R_2}{R_1+R_2}'),
      ],
    },
  ],
};

const electricalSafetyLesson: CurriculumLesson = {
  title: text('4.4 Electrical Safety', '4.4 用电安全'),
  description: text(
    'Mains hazards, live/neutral/earth wiring, fuses, trip switches, earthing and double insulation.',
    '市电危险、火线/零线/地线、保险丝、跳闸开关、接地与双重绝缘。',
  ),
  sections: [
    {
      heading: text('1. Mains hazards', '1. 市电危险'),
      bullets: [
        text('Damaged insulation can expose a live conductor and cause electric shock or short circuit.', '绝缘层损坏会暴露带电导体，可能造成触电或短路。'),
        text('Overheating cables can damage insulation and start a fire.', '电缆过热会损坏绝缘并引发火灾。'),
        text('Damp conditions reduce resistance and increase dangerous current through the body.', '潮湿环境降低电阻，使通过人体的危险电流增大。'),
        text('Overloaded plugs, extension leads and sockets draw excessive current and overheat wiring.', '插头、延长线和插座过载会产生过大电流并使导线过热。'),
      ],
    },
    {
      heading: text('2. Live, neutral and earth', '2. 火线、零线与地线'),
      paragraphs: [
        text(
          'A mains circuit contains live, neutral and earth wires. The switch must be in the live wire so switching off disconnects the appliance from the dangerous potential. A switch only in the neutral wire can leave internal parts live.',
          '市电电路包含火线、零线和地线。开关必须接在火线上，使断开时用电器与危险电势隔离；若开关只接在零线上，内部部件仍可能带电。',
        ),
        text(
          'A conducting casing is earthed so a fault connecting live to the case produces a large current through the low-resistance earth path, operating the fuse or trip switch. A double-insulated appliance uses a non-conducting outer case and does not require an earth wire.',
          '导电外壳必须接地，使火线碰壳故障时电流沿低电阻地线迅速增大，触发保险丝或跳闸开关。双重绝缘用电器使用非导电外壳，不需要地线。',
        ),
      ],
    },
    {
      heading: text('3. Fuses and trip switches', '3. 保险丝与跳闸开关'),
      paragraphs: [
        text(
          'A fuse melts when current exceeds its rating and breaks the live circuit. Choose the smallest rating safely above the normal operating current. A trip switch detects an unsafe condition and disconnects the supply; it can usually be reset.',
          '当电流超过额定值时，保险丝熔断并切断火线。应选择略高于正常工作电流的最小合适额定值。跳闸开关检测不安全情况并断开电源，通常可以复位。',
        ),
        text(
          'For a double-insulated appliance, a fuse still protects the circuit and cabling even though there is no earth wire.',
          '双重绝缘用电器即使没有地线，保险丝仍能保护电路和电缆。',
        ),
      ],
    },
  ],
};

const electromagneticEffectsLesson: CurriculumLesson = {
  title: text('4.5 Electromagnetic Effects', '4.5 电磁效应'),
  description: text(
    'Induction, a.c. generators, fields from currents, motor effect, d.c. motors and transformers.',
    '电磁感应、交流发电机、电流磁场、磁场力、直流电动机与变压器。',
  ),
  sections: [
    {
      heading: text('1. Electromagnetic induction', '1. 电磁感应'),
      paragraphs: [
        text(
          'An e.m.f. is induced when a conductor cuts magnetic field lines or when the magnetic field linking a conductor changes. A demonstration moves a magnet into and out of a coil connected to a sensitive meter, or moves a wire across a magnetic field.',
          '当导体切割磁感线，或穿过导体的磁场发生变化时，会产生感应电动势。实验可把磁体移入、移出连接灵敏电表的线圈，或使导线横切磁场。',
        ),
        text(
          'Induced e.m.f. increases with faster change, stronger magnetic field and more turns or greater effective conductor length. Reversing the motion or field reverses the induced e.m.f. The induced effect opposes the change that causes it.',
          '磁通变化越快、磁场越强、线圈匝数越多或有效导体长度越大，感应电动势越大。反转运动方向或磁场方向会反转感应电动势方向。感应效应总是反抗引起它的变化。',
        ),
        text(
          'The relative directions of motion or force, magnetic field and induced current are determined with the generator rule.',
          '运动或力、磁场和感应电流的相对方向可用发电机方向规则判断。',
        ),
      ],
    },
    {
      heading: text('2. A.c. generator and waveform', '2. 交流发电机与波形'),
      paragraphs: [
        text(
          'A simple a.c. generator uses a rotating coil in a magnetic field or a rotating magnet near a coil. Slip rings and brushes maintain contact while allowing the output polarity to alternate.',
          '简单交流发电机可使线圈在磁场中转动，或使磁体在线圈附近转动。滑环和电刷在保持电接触的同时允许输出极性交替变化。',
        ),
        text(
          'The e.m.f.–time graph alternates about zero. Peaks and troughs occur when the rate of cutting field lines is greatest; zeros occur when the instantaneous cutting rate is zero. Faster rotation increases frequency and usually peak e.m.f.',
          '电动势—时间图像在零值上下交替。切割磁感线速率最大时出现峰和谷，瞬时切割速率为零时电动势为零。转速增加会提高频率，通常也提高峰值电动势。',
        ),
      ],
    },
    {
      heading: text('3. Magnetic fields produced by current', '3. 电流产生的磁场'),
      paragraphs: [
        text(
          'A straight current-carrying wire produces concentric circular field lines; a solenoid produces a field similar to a bar magnet, with a strong nearly uniform field inside. Compass mapping determines direction, while iron filings show pattern.',
          '载流直导线产生同心圆形磁感线；螺线管产生类似条形磁体的磁场，内部磁场强且近似均匀。小磁针用于确定方向，铁屑用于显示分布。',
        ),
        text(
          'Increasing current strengthens the field. Reversing current reverses field direction. For a solenoid, more turns per unit length and adding a soft-iron core strengthen the field.',
          '增大电流会增强磁场，反转电流会反转磁场方向。对于螺线管，增加单位长度匝数或加入软铁芯会增强磁场。',
        ),
        text(
          'Relays use an electromagnet to operate a separate switch. Loudspeakers use the changing force on a current-carrying coil to vibrate a cone.',
          '继电器用电磁铁控制另一电路的开关；扬声器利用载流线圈所受变化的力带动纸盆振动。',
        ),
      ],
    },
    {
      heading: text('4. Force on currents and charged particles', '4. 载流导体与带电粒子受力'),
      paragraphs: [
        text(
          'A current-carrying conductor in a magnetic field experiences a force. Reversing either current or field reverses the force; reversing both leaves the force direction unchanged. The three directions are mutually perpendicular in the standard arrangement.',
          '载流导体在磁场中受到力。单独反转电流或磁场会反转力的方向，同时反转两者则力方向不变。在标准装置中三个方向互相垂直。',
        ),
        text(
          'The same directional relationship determines the force on moving charged-particle beams. A negative charge is deflected opposite to the force direction predicted for conventional current.',
          '同样的方向关系可判断运动带电粒子束所受的力。负电荷的偏转方向与按传统电流方向判断的力相反。',
        ),
      ],
    },
    {
      heading: text('5. D.c. motor', '5. 直流电动机'),
      paragraphs: [
        text(
          'Opposite sides of a current-carrying coil experience opposite forces in a magnetic field, producing a turning effect. The turning effect increases with more coil turns, greater current and stronger magnetic field.',
          '载流线圈的两侧在磁场中受到方向相反的力，形成转动效应。增加线圈匝数、电流或磁场强度都会增大转动效应。',
        ),
        text(
          'The split-ring commutator reverses current every half-turn so the torque continues in the same rotational sense. Brushes maintain electrical contact with the rotating commutator.',
          '换向器每半圈反转线圈电流，使转矩保持同一转动方向；电刷与旋转换向器保持电接触。',
        ),
      ],
    },
    {
      heading: text('6. Transformers and power transmission', '6. 变压器与电力传输'),
      paragraphs: [
        text(
          'A simple transformer has primary and secondary coils wound on a soft-iron core. A step-up transformer has more secondary turns and raises voltage; a step-down transformer has fewer secondary turns and lowers voltage.',
          '简单变压器由绕在软铁芯上的原线圈和副线圈组成。升压变压器副线圈匝数更多，提高电压；降压变压器副线圈匝数更少，降低电压。',
        ),
        text(
          'Alternating current in the primary creates a changing magnetic field in the core, which links the secondary and induces an alternating e.m.f. A steady d.c. input does not provide continuous transformation.',
          '原线圈中的交流电在铁芯中产生变化磁场，磁场穿过副线圈并感应出交流电动势。稳定直流输入不能产生持续变压作用。',
        ),
        text(
          'For a given transmitted power, raising voltage reduces current. Cable heating loss is proportional to $I^2R$, so high-voltage transmission reduces power loss and permits thinner or less costly cables.',
          '传输功率一定时，提高电压会减小电流。电缆热损耗与 $I^2R$ 成正比，因此高压输电可减少功率损耗，并允许使用更细或成本更低的电缆。',
        ),
      ],
      formulas: [
        formula('Transformer turns ratio', '变压器匝数比', '\\frac{V_p}{V_s}=\\frac{N_p}{N_s}'),
        formula('Ideal transformer power (Supplement)', '理想变压器功率（Supplement）', 'I_pV_p=I_sV_s'),
        formula('Cable power loss', '电缆功率损耗', 'P_{\\mathrm{loss}}=I^2R'),
      ],
    },
  ],
};

export const igcseUnit4Lessons: CurriculumLesson[] = [
  magnetismLesson,
  electricalQuantitiesLesson,
  circuitsLesson,
  electricalSafetyLesson,
  electromagneticEffectsLesson,
];
