export interface LocalizedText {
  en: string;
  zh: string;
}

export interface CurriculumTopic {
  id: string;
  title: LocalizedText;
}

export interface CurriculumUnit {
  number: number;
  title: LocalizedText;
  weighting: string;
  topics: CurriculumTopic[];
}

export interface CurriculumCourse {
  id: 'physics-1' | 'physics-2' | 'mechanics' | 'electricity-magnetism';
  name: LocalizedText;
  level: LocalizedText;
  sourceUrl: string;
  units: CurriculumUnit[];
}

const topic = (id: string, en: string, zh: string): CurriculumTopic => ({
  id,
  title: { en, zh },
});

export const apPhysicsCurriculum: CurriculumCourse[] = [
  {
    id: 'physics-1',
    name: { en: 'AP Physics 1', zh: 'AP 物理 1' },
    level: { en: 'Algebra-Based', zh: '代数基础' },
    sourceUrl: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf',
    units: [
      {
        number: 1,
        title: { en: 'Kinematics', zh: '运动学' },
        weighting: '10–15%',
        topics: [
          topic('1.1', 'Scalars and Vectors in One Dimension', '一维标量与矢量'),
          topic('1.2', 'Displacement, Velocity, and Acceleration', '位移、速度与加速度'),
          topic('1.3', 'Representing Motion', '运动的表示方法'),
          topic('1.4', 'Reference Frames and Relative Motion', '参考系与相对运动'),
          topic('1.5', 'Vectors and Motion in Two Dimensions', '二维运动中的矢量'),
        ],
      },
      {
        number: 2,
        title: { en: 'Force and Translational Dynamics', zh: '力与平动动力学' },
        weighting: '18–23%',
        topics: [
          topic('2.1', 'Systems and Center of Mass', '系统与质心'),
          topic('2.2', 'Forces and Free-Body Diagrams', '力与自由体图'),
          topic('2.3', "Newton’s Third Law", '牛顿第三定律'),
          topic('2.4', "Newton’s First Law", '牛顿第一定律'),
          topic('2.5', "Newton’s Second Law", '牛顿第二定律'),
          topic('2.6', 'Gravitational Force', '万有引力'),
          topic('2.7', 'Kinetic and Static Friction', '动摩擦与静摩擦'),
          topic('2.8', 'Spring Forces', '弹簧力'),
          topic('2.9', 'Circular Motion', '圆周运动'),
        ],
      },
      {
        number: 3,
        title: { en: 'Work, Energy, and Power', zh: '功、能量与功率' },
        weighting: '18–23%',
        topics: [
          topic('3.1', 'Translational Kinetic Energy', '平动动能'),
          topic('3.2', 'Work', '功'),
          topic('3.3', 'Potential Energy', '势能'),
          topic('3.4', 'Conservation of Energy', '能量守恒'),
          topic('3.5', 'Power', '功率'),
        ],
      },
      {
        number: 4,
        title: { en: 'Linear Momentum', zh: '线动量' },
        weighting: '10–15%',
        topics: [
          topic('4.1', 'Linear Momentum', '线动量'),
          topic('4.2', 'Change in Momentum and Impulse', '动量变化与冲量'),
          topic('4.3', 'Conservation of Linear Momentum', '线动量守恒'),
          topic('4.4', 'Elastic and Inelastic Collisions', '弹性与非弹性碰撞'),
        ],
      },
      {
        number: 5,
        title: { en: 'Torque and Rotational Dynamics', zh: '力矩与转动动力学' },
        weighting: '10–15%',
        topics: [
          topic('5.1', 'Rotational Kinematics', '转动运动学'),
          topic('5.2', 'Connecting Linear and Rotational Motion', '平动与转动的联系'),
          topic('5.3', 'Torque', '力矩'),
          topic('5.4', 'Rotational Inertia', '转动惯量'),
          topic('5.5', "Rotational Equilibrium and Newton’s First Law in Rotational Form", '转动平衡与牛顿第一定律的转动形式'),
          topic('5.6', "Newton’s Second Law in Rotational Form", '牛顿第二定律的转动形式'),
        ],
      },
      {
        number: 6,
        title: { en: 'Energy and Momentum of Rotating Systems', zh: '转动系统的能量与动量' },
        weighting: '5–8%',
        topics: [
          topic('6.1', 'Rotational Kinetic Energy', '转动动能'),
          topic('6.2', 'Torque and Work', '力矩与功'),
          topic('6.3', 'Angular Momentum and Angular Impulse', '角动量与角冲量'),
          topic('6.4', 'Conservation of Angular Momentum', '角动量守恒'),
          topic('6.5', 'Rolling', '滚动'),
          topic('6.6', 'Motion of Orbiting Satellites', '轨道卫星的运动'),
        ],
      },
      {
        number: 7,
        title: { en: 'Oscillations', zh: '振动' },
        weighting: '5–8%',
        topics: [
          topic('7.1', 'Defining Simple Harmonic Motion (SHM)', '简谐运动的定义'),
          topic('7.2', 'Frequency and Period of SHM', '简谐运动的频率与周期'),
          topic('7.3', 'Representing and Analyzing SHM', '简谐运动的表示与分析'),
          topic('7.4', 'Energy of Simple Harmonic Oscillators', '简谐振子的能量'),
        ],
      },
      {
        number: 8,
        title: { en: 'Fluids', zh: '流体' },
        weighting: '10–15%',
        topics: [
          topic('8.1', 'Internal Structure and Density', '内部结构与密度'),
          topic('8.2', 'Pressure', '压强'),
          topic('8.3', "Fluids and Newton’s Laws", '流体与牛顿定律'),
          topic('8.4', 'Fluids and Conservation Laws', '流体与守恒定律'),
        ],
      },
    ],
  },
  {
    id: 'physics-2',
    name: { en: 'AP Physics 2', zh: 'AP 物理 2' },
    level: { en: 'Algebra-Based', zh: '代数基础' },
    sourceUrl: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-2-course-and-exam-description.pdf',
    units: [
      {
        number: 9,
        title: { en: 'Thermodynamics', zh: '热力学' },
        weighting: '15–18%',
        topics: [
          topic('9.1', 'Kinetic Theory of Temperature and Pressure', '温度与压强的分子运动论'),
          topic('9.2', 'The Ideal Gas Law', '理想气体定律'),
          topic('9.3', 'Thermal Energy Transfer and Equilibrium', '热能传递与热平衡'),
          topic('9.4', 'The First Law of Thermodynamics', '热力学第一定律'),
          topic('9.5', 'Specific Heat and Thermal Conductivity', '比热容与热导率'),
          topic('9.6', 'Entropy and the Second Law of Thermodynamics', '熵与热力学第二定律'),
        ],
      },
      {
        number: 10,
        title: { en: 'Electric Force, Field, and Potential', zh: '电场力、电场与电势' },
        weighting: '15–18%',
        topics: [
          topic('10.1', 'Electric Charge and Electric Force', '电荷与电场力'),
          topic('10.2', 'Conservation of Electric Charge and the Process of Charging', '电荷守恒与带电过程'),
          topic('10.3', 'Electric Fields', '电场'),
          topic('10.4', 'Electric Potential Energy', '电势能'),
          topic('10.5', 'Electric Potential', '电势'),
          topic('10.6', 'Capacitors', '电容器'),
          topic('10.7', 'Conservation of Electric Energy', '电能守恒'),
        ],
      },
      {
        number: 11,
        title: { en: 'Electric Circuits', zh: '电路' },
        weighting: '15–18%',
        topics: [
          topic('11.1', 'Electric Current', '电流'),
          topic('11.2', 'Simple Circuits', '简单电路'),
          topic('11.3', "Resistance, Resistivity, and Ohm’s Law", '电阻、电阻率与欧姆定律'),
          topic('11.4', 'Electric Power', '电功率'),
          topic('11.5', 'Compound Direct Current (DC) Circuits', '复合直流电路'),
          topic('11.6', "Kirchhoff’s Loop Rule", '基尔霍夫回路定律'),
          topic('11.7', "Kirchhoff’s Junction Rule", '基尔霍夫节点定律'),
          topic('11.8', 'Resistor-Capacitor (RC) Circuits', '电阻-电容电路'),
        ],
      },
      {
        number: 12,
        title: { en: 'Magnetism and Electromagnetism', zh: '磁学与电磁学' },
        weighting: '12–15%',
        topics: [
          topic('12.1', 'Magnetic Fields', '磁场'),
          topic('12.2', 'Magnetism and Moving Charges', '磁场与运动电荷'),
          topic('12.3', 'Magnetism and Current-Carrying Wires', '磁场与载流导线'),
          topic('12.4', "Electromagnetic Induction and Faraday’s Law", '电磁感应与法拉第定律'),
        ],
      },
      {
        number: 13,
        title: { en: 'Geometric Optics', zh: '几何光学' },
        weighting: '12–15%',
        topics: [
          topic('13.1', 'Reflection', '反射'),
          topic('13.2', 'Images Formed by Mirrors', '镜面成像'),
          topic('13.3', 'Refraction', '折射'),
          topic('13.4', 'Images Formed by Lenses', '透镜成像'),
        ],
      },
      {
        number: 14,
        title: { en: 'Waves, Sound, and Physical Optics', zh: '波、声学与物理光学' },
        weighting: '12–15%',
        topics: [
          topic('14.1', 'Properties of Wave Pulses and Waves', '波脉冲与波的性质'),
          topic('14.2', 'Periodic Waves', '周期波'),
          topic('14.3', 'Boundary Behavior of Waves and Polarization', '波的边界行为与偏振'),
          topic('14.4', 'Electromagnetic Waves', '电磁波'),
          topic('14.5', 'The Doppler Effect', '多普勒效应'),
          topic('14.6', 'Wave Interference and Standing Waves', '波的干涉与驻波'),
          topic('14.7', 'Diffraction', '衍射'),
          topic('14.8', 'Double-Slit Interference and Diffraction Gratings', '双缝干涉与衍射光栅'),
          topic('14.9', 'Thin-Film Interference', '薄膜干涉'),
        ],
      },
      {
        number: 15,
        title: { en: 'Modern Physics', zh: '近代物理' },
        weighting: '12–15%',
        topics: [
          topic('15.1', 'Quantum Theory and Wave-Particle Duality', '量子理论与波粒二象性'),
          topic('15.2', 'The Bohr Model of Atomic Structure', '原子结构的玻尔模型'),
          topic('15.3', 'Emission and Absorption Spectra', '发射光谱与吸收光谱'),
          topic('15.4', 'Blackbody Radiation', '黑体辐射'),
          topic('15.5', 'The Photoelectric Effect', '光电效应'),
          topic('15.6', 'Compton Scattering', '康普顿散射'),
          topic('15.7', 'Fission, Fusion, and Nuclear Decay', '裂变、聚变与核衰变'),
          topic('15.8', 'Types of Radioactive Decay', '放射性衰变的类型'),
        ],
      },
    ],
  },
  {
    id: 'mechanics',
    name: { en: 'AP Physics C: Mechanics', zh: 'AP 物理 C：力学' },
    level: { en: 'Calculus-Based', zh: '微积分基础' },
    sourceUrl: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-course-and-exam-description.pdf',
    units: [
      {
        number: 1,
        title: { en: 'Kinematics', zh: '运动学' },
        weighting: '10–15%',
        topics: [
          topic('1.1', 'Scalars and Vectors', '标量与矢量'),
          topic('1.2', 'Displacement, Velocity, and Acceleration', '位移、速度与加速度'),
          topic('1.3', 'Representing Motion', '运动的表示方法'),
          topic('1.4', 'Reference Frames and Relative Motion', '参考系与相对运动'),
          topic('1.5', 'Motion in Two or Three Dimensions', '二维或三维运动'),
        ],
      },
      {
        number: 2,
        title: { en: 'Force and Translational Dynamics', zh: '力与平动动力学' },
        weighting: '20–25%',
        topics: [
          topic('2.1', 'Systems and Center of Mass', '系统与质心'),
          topic('2.2', 'Forces and Free-Body Diagrams', '力与自由体图'),
          topic('2.3', "Newton’s Third Law", '牛顿第三定律'),
          topic('2.4', "Newton’s First Law", '牛顿第一定律'),
          topic('2.5', "Newton’s Second Law", '牛顿第二定律'),
          topic('2.6', 'Gravitational Force', '万有引力'),
          topic('2.7', 'Kinetic and Static Friction', '动摩擦与静摩擦'),
          topic('2.8', 'Spring Forces', '弹簧力'),
          topic('2.9', 'Resistive Forces', '阻力'),
          topic('2.10', 'Circular Motion', '圆周运动'),
        ],
      },
      {
        number: 3,
        title: { en: 'Work, Energy, and Power', zh: '功、能量与功率' },
        weighting: '15–25%',
        topics: [
          topic('3.1', 'Translational Kinetic Energy', '平动动能'),
          topic('3.2', 'Work', '功'),
          topic('3.3', 'Potential Energy', '势能'),
          topic('3.4', 'Conservation of Energy', '能量守恒'),
          topic('3.5', 'Power', '功率'),
        ],
      },
      {
        number: 4,
        title: { en: 'Linear Momentum', zh: '线动量' },
        weighting: '10–20%',
        topics: [
          topic('4.1', 'Linear Momentum', '线动量'),
          topic('4.2', 'Change in Momentum and Impulse', '动量变化与冲量'),
          topic('4.3', 'Conservation of Linear Momentum', '线动量守恒'),
          topic('4.4', 'Elastic and Inelastic Collisions', '弹性与非弹性碰撞'),
        ],
      },
      {
        number: 5,
        title: { en: 'Torque and Rotational Dynamics', zh: '力矩与转动动力学' },
        weighting: '10–15%',
        topics: [
          topic('5.1', 'Rotational Kinematics', '转动运动学'),
          topic('5.2', 'Connecting Linear and Rotational Motion', '平动与转动的联系'),
          topic('5.3', 'Torque', '力矩'),
          topic('5.4', 'Rotational Inertia', '转动惯量'),
          topic('5.5', "Rotational Equilibrium and Newton’s First Law in Rotational Form", '转动平衡与牛顿第一定律的转动形式'),
          topic('5.6', "Newton’s Second Law in Rotational Form", '牛顿第二定律的转动形式'),
        ],
      },
      {
        number: 6,
        title: { en: 'Energy and Momentum of Rotating Systems', zh: '转动系统的能量与动量' },
        weighting: '10–15%',
        topics: [
          topic('6.1', 'Rotational Kinetic Energy', '转动动能'),
          topic('6.2', 'Torque and Work', '力矩与功'),
          topic('6.3', 'Angular Momentum and Angular Impulse', '角动量与角冲量'),
          topic('6.4', 'Conservation of Angular Momentum', '角动量守恒'),
          topic('6.5', 'Rolling', '滚动'),
          topic('6.6', 'Motion of Orbiting Satellites', '轨道卫星的运动'),
        ],
      },
      {
        number: 7,
        title: { en: 'Oscillations', zh: '振动' },
        weighting: '10–15%',
        topics: [
          topic('7.1', 'Defining Simple Harmonic Motion (SHM)', '简谐运动的定义'),
          topic('7.2', 'Frequency and Period of SHM', '简谐运动的频率与周期'),
          topic('7.3', 'Representing and Analyzing SHM', '简谐运动的表示与分析'),
          topic('7.4', 'Energy of Simple Harmonic Oscillators', '简谐振子的能量'),
          topic('7.5', 'Simple and Physical Pendulums', '单摆与复摆'),
        ],
      },
    ],
  },
  {
    id: 'electricity-magnetism',
    name: { en: 'AP Physics C: Electricity and Magnetism', zh: 'AP 物理 C：电磁学' },
    level: { en: 'Calculus-Based', zh: '微积分基础' },
    sourceUrl: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-course-and-exam-description.pdf',
    units: [
      {
        number: 8,
        title: { en: "Electric Charges, Fields, and Gauss’s Law", zh: '电荷、电场与高斯定律' },
        weighting: '15–25%',
        topics: [
          topic('8.1', 'Electric Charge and Electric Force', '电荷与电场力'),
          topic('8.2', 'Conservation of Electric Charge and the Process of Charging', '电荷守恒与带电过程'),
          topic('8.3', 'Electric Fields', '电场'),
          topic('8.4', 'Electric Fields of Charge Distributions', '电荷分布产生的电场'),
          topic('8.5', 'Electric Flux', '电通量'),
          topic('8.6', "Gauss’s Law", '高斯定律'),
        ],
      },
      {
        number: 9,
        title: { en: 'Electric Potential', zh: '电势' },
        weighting: '10–20%',
        topics: [
          topic('9.1', 'Electric Potential Energy', '电势能'),
          topic('9.2', 'Electric Potential', '电势'),
          topic('9.3', 'Conservation of Electric Energy', '电能守恒'),
        ],
      },
      {
        number: 10,
        title: { en: 'Conductors and Capacitors', zh: '导体与电容器' },
        weighting: '10–15%',
        topics: [
          topic('10.1', 'Electrostatics with Conductors', '导体静电学'),
          topic('10.2', 'Redistribution of Charge between Conductors', '导体之间的电荷重新分布'),
          topic('10.3', 'Capacitors', '电容器'),
          topic('10.4', 'Dielectrics', '电介质'),
        ],
      },
      {
        number: 11,
        title: { en: 'Electric Circuits', zh: '电路' },
        weighting: '15–25%',
        topics: [
          topic('11.1', 'Electric Current', '电流'),
          topic('11.2', 'Simple Circuits', '简单电路'),
          topic('11.3', "Resistance, Resistivity, and Ohm’s Law", '电阻、电阻率与欧姆定律'),
          topic('11.4', 'Electric Power', '电功率'),
          topic('11.5', 'Compound Direct Current Circuits', '复合直流电路'),
          topic('11.6', "Kirchhoff’s Loop Rule", '基尔霍夫回路定律'),
          topic('11.7', "Kirchhoff’s Junction Rule", '基尔霍夫节点定律'),
          topic('11.8', 'Resistor-Capacitor (RC) Circuits', '电阻-电容电路'),
        ],
      },
      {
        number: 12,
        title: { en: 'Magnetic Fields and Electromagnetism', zh: '磁场与电磁学' },
        weighting: '10–20%',
        topics: [
          topic('12.1', 'Magnetic Fields', '磁场'),
          topic('12.2', 'Magnetism and Moving Charges', '磁场与运动电荷'),
          topic('12.3', 'Magnetic Fields of Current-Carrying Wires and the Biot-Savart Law', '载流导线的磁场与毕奥-萨伐尔定律'),
          topic('12.4', "Ampère’s Law", '安培定律'),
        ],
      },
      {
        number: 13,
        title: { en: 'Electromagnetic Induction', zh: '电磁感应' },
        weighting: '10–20%',
        topics: [
          topic('13.1', 'Magnetic Flux', '磁通量'),
          topic('13.2', 'Electromagnetic Induction', '电磁感应'),
          topic('13.3', 'Induced Currents and Magnetic Forces', '感应电流与磁力'),
          topic('13.4', 'Inductance', '电感'),
          topic('13.5', 'Circuits with Resistors and Inductors (LR Circuits)', '电阻-电感电路'),
          topic('13.6', 'Circuits with Capacitors and Inductors (LC Circuits)', '电容-电感电路'),
        ],
      },
    ],
  },
];
