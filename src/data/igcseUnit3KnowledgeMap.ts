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

const generalWavesLesson: CurriculumLesson = {
  title: text('3.1 General Properties of Waves', '3.1 波的一般性质'),
  description: text(
    'Wave vocabulary, transverse and longitudinal models, reflection, refraction, diffraction and ripple-tank evidence.',
    '波的术语、横波与纵波模型、反射、折射、衍射及水波槽实验。',
  ),
  sections: [
    {
      heading: text('1. Wave motion and wave features', '1. 波动与波的特征'),
      paragraphs: [
        text(
          'Waves transfer energy from one place to another without transferring matter overall. In ropes, springs and water-wave experiments, particles of the medium oscillate about equilibrium while the disturbance propagates.',
          '波把能量从一处传到另一处，但整体上不传递物质。在绳、弹簧和水波实验中，介质粒子在平衡位置附近振动，而扰动向前传播。',
        ),
        text(
          'A wavefront joins points in the same phase. Wavelength is the shortest distance between matching points on successive waves. Frequency is the number of complete waves passing a point per second. Amplitude is the maximum displacement from equilibrium; crests and troughs are the highest and lowest points of a transverse representation.',
          '波阵面连接处于相同相位的点。波长是相邻同相位点之间的最短距离；频率是每秒通过某点的完整波数；振幅是离开平衡位置的最大位移；波峰和波谷是横波表示中的最高点和最低点。',
        ),
      ],
      formulas: [
        formula('Wave speed', '波速', 'v=f\\lambda'),
      ],
    },
    {
      heading: text('2. Transverse and longitudinal models', '2. 横波与纵波模型'),
      paragraphs: [
        text(
          'In a transverse wave, vibration is perpendicular to propagation. Electromagnetic radiation, water waves and seismic S-waves can be modelled as transverse. In a longitudinal wave, vibration is parallel to propagation. Sound and seismic P-waves can be modelled as longitudinal.',
          '横波的振动方向与传播方向垂直；电磁波、水波和地震 S 波可用横波模型描述。纵波的振动方向与传播方向平行；声波和地震 P 波可用纵波模型描述。',
        ),
      ],
      takeaway: text(
        'Classify a wave by comparing vibration direction with propagation direction, not by the appearance of a drawn curve.',
        '判断波的类型要比较振动方向和传播方向，而不是只看画出的曲线形状。',
      ),
    },
    {
      heading: text('3. Reflection, refraction and diffraction', '3. 反射、折射与衍射'),
      paragraphs: [
        text(
          'Reflection changes the direction of a wave at a plane boundary. Refraction changes direction because wave speed changes when the wave enters a region where it travels at a different speed. Diffraction is the spreading of waves through a gap or around an edge.',
          '反射是波在平面边界处改变方向；折射是波进入传播速度不同的区域后因速度改变而改变方向；衍射是波通过缝隙或绕过边缘时发生扩散。',
        ),
        text(
          'Diffraction through a gap is most noticeable when the gap width is similar to or smaller than the wavelength. At an edge, a longer wavelength produces more noticeable spreading.',
          '当缝宽与波长相近或小于波长时，缝隙衍射最明显；绕过边缘时，波长越长，扩散越明显。',
        ),
      ],
    },
    {
      heading: text('4. Ripple-tank observations', '4. 水波槽观察'),
      paragraphs: [
        text(
          'A ripple tank can show reflection from a straight barrier, refraction when water depth changes, diffraction through a gap and diffraction around an edge. A stroboscope or frozen image makes wavefront spacing and direction easier to measure.',
          '水波槽可展示直线挡板处的反射、水深改变引起的折射、通过缝隙的衍射以及绕过边缘的衍射。频闪观察或冻结图像可使波阵面间距和方向更易测量。',
        ),
        text(
          'When frequency is fixed, lower wave speed in shallow water means shorter wavelength. Refraction is identified from the changed wavefront direction as well as the changed spacing.',
          '频率不变时，浅水区波速较低，因此波长较短。判断折射时既要观察波阵面方向改变，也要观察间距改变。',
        ),
      ],
    },
  ],
};

const lightLesson: CurriculumLesson = {
  title: text('3.2 Light', '3.2 光'),
  description: text(
    'Reflection, refraction, total internal reflection, lenses and dispersion.',
    '反射、折射、全反射、透镜与色散。',
  ),
  sections: [
    {
      heading: text('1. Reflection and plane-mirror images', '1. 反射与平面镜成像'),
      paragraphs: [
        text(
          'The normal is perpendicular to the surface at the point of incidence. The angle of incidence and angle of reflection are both measured between the ray and the normal, and are equal.',
          '法线是在入射点处垂直于表面的直线。入射角和反射角都在光线与法线之间测量，且两者相等。',
        ),
        text(
          'A plane mirror forms an image that is the same size as the object, the same perpendicular distance behind the mirror as the object is in front, and virtual. Ray constructions extend reflected rays backward to locate the image; the image cannot be projected onto a screen.',
          '平面镜所成像与物体等大，像到镜面的垂直距离等于物到镜面的距离，并且是虚像。作图时把反射光线反向延长以确定像的位置；虚像不能投射到屏幕上。',
        ),
      ],
      formulas: [formula('Law of reflection', '反射定律', 'i=r')],
    },
    {
      heading: text('2. Refraction and refractive index', '2. 折射与折射率'),
      paragraphs: [
        text(
          'Refraction occurs when light changes speed at a boundary. Light bends toward the normal when it slows and away from the normal when it speeds up. A transparent-block experiment traces incident and emergent rays with pins or a ray box and measures angles from the normal.',
          '光在边界处速度改变时发生折射。光速减小时向法线偏折，光速增大时远离法线偏折。透明块实验可用大头针或光线盒描出入射光线和出射光线，并从法线量角。',
        ),
        text(
          'The required model is limited to a boundary between two media. Refractive index is the ratio of wave speeds in the two regions and can also be obtained from the sine ratio for angles measured from the normal.',
          '要求掌握的模型限于两种介质之间的边界。折射率是波在两个区域中的速度之比，也可由相对于法线测得角度的正弦比求得。',
        ),
      ],
      formulas: [
        formula('Refractive index from angles (Supplement)', '由角度求折射率（Supplement）', 'n=\\frac{\\sin i}{\\sin r}'),
        formula('Refractive index from speed', '由波速求折射率', 'n=\\frac{v_{\\mathrm{first\\ region}}}{v_{\\mathrm{second\\ region}}}'),
      ],
    },
    {
      heading: text('3. Critical angle and total internal reflection', '3. 临界角与全反射'),
      paragraphs: [
        text(
          'The critical angle is the angle of incidence in the optically denser medium for which the refracted ray travels along the boundary. Total internal reflection occurs only when light travels from higher to lower refractive index and the incidence angle exceeds the critical angle.',
          '临界角是光从光密介质入射时，使折射光沿边界传播的入射角。全反射只会在光从较高折射率介质射向较低折射率介质且入射角大于临界角时发生。',
        ),
        text(
          'Total internal reflection can be demonstrated with a semicircular block or prism. Optical fibres guide visible or infrared light by repeated total internal reflection and are used especially in telecommunications.',
          '可用半圆形透明块或棱镜展示全反射。光纤利用反复全反射引导可见光或红外光，尤其用于通信。',
        ),
      ],
      formulas: [formula('Critical angle (Supplement)', '临界角（Supplement）', 'n=\\frac{1}{\\sin c}')],
    },
    {
      heading: text('4. Thin lenses and ray diagrams', '4. 薄透镜与光线图'),
      paragraphs: [
        text(
          'A converging lens brings a parallel beam toward the principal focus; a diverging lens spreads a parallel beam as if it came from a principal focus. Focal length is the distance from the optical centre to the principal focus along the principal axis.',
          '会聚透镜使平行光束会聚到主焦点；发散透镜使平行光束发散，仿佛来自主焦点。焦距是沿主光轴从光心到主焦点的距离。',
        ),
        text(
          'A converging-lens ray diagram uses rays parallel to the axis, through the optical centre and through the focus to locate a real image. Images are described as enlarged, same size or diminished; upright or inverted; real or virtual.',
          '会聚透镜光线图使用平行于主轴、通过光心及通过焦点的特征光线确定实像。像的性质用放大、等大或缩小；正立或倒立；实像或虚像描述。',
        ),
        text(
          'A virtual image is located by extending diverging rays backward and cannot be projected onto a screen. A converging lens can form a virtual enlarged image as a magnifying glass. Converging lenses correct long-sightedness; diverging lenses correct short-sightedness.',
          '虚像通过把发散光线反向延长来定位，不能投射在屏幕上。会聚透镜可作为放大镜形成放大的虚像。会聚透镜矫正远视，发散透镜矫正近视。',
        ),
      ],
    },
    {
      heading: text('5. Dispersion and visible spectrum', '5. 色散与可见光谱'),
      paragraphs: [
        text(
          'A glass prism disperses white light because different frequencies refract by different amounts. In increasing frequency and decreasing wavelength, the traditional order is red, orange, yellow, green, blue, indigo, violet.',
          '玻璃棱镜使白光发生色散，是因为不同频率的光折射程度不同。按频率增大、波长减小的顺序，传统七色为红、橙、黄、绿、蓝、靛、紫。',
        ),
        text(
          'Visible light containing a single frequency is described as monochromatic.',
          '只含单一频率的可见光称为单色光。',
        ),
      ],
    },
  ],
};

const electromagneticSpectrumLesson: CurriculumLesson = {
  title: text('3.3 Electromagnetic Spectrum', '3.3 电磁波谱'),
  description: text(
    'Spectrum order, speed, uses, hazards, satellite links, communication systems and signal types.',
    '波谱顺序、传播速度、用途、危害、卫星通信、通信系统与信号类型。',
  ),
  sections: [
    {
      heading: text('1. Spectrum order and common speed', '1. 波谱顺序与共同速度'),
      paragraphs: [
        text(
          'In increasing frequency and decreasing wavelength, the regions are radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. All are transverse electromagnetic waves and travel at the same speed in vacuum.',
          '按频率增大、波长减小的顺序，电磁波依次为无线电波、微波、红外线、可见光、紫外线、X 射线和伽马射线。它们都是横向电磁波，在真空中的速度相同。',
        ),
      ],
      formulas: [formula('Speed in vacuum (Supplement)', '真空中的波速（Supplement）', 'c=3.0\\times10^8\\,\\mathrm{m\\,s^{-1}}')],
    },
    {
      heading: text('2. Uses across the spectrum', '2. 各波段用途'),
      bullets: [
        text('Radio: radio and television transmission, astronomy and RFID.', '无线电波：广播与电视传输、天文学和射频识别。'),
        text('Microwaves: satellite television, mobile phones and microwave ovens.', '微波：卫星电视、移动电话和微波炉。'),
        text('Infrared: grills, remote controls, intruder alarms, thermal imaging and optical fibres.', '红外线：电烤炉、遥控器、防盗报警、热成像和光纤。'),
        text('Visible light: vision, photography and illumination.', '可见光：视觉、摄影和照明。'),
        text('Ultraviolet: security marking, detecting counterfeit banknotes and sterilising water.', '紫外线：安全标记、识别假钞和水体消毒。'),
        text('X-rays: medical imaging and security scanners.', 'X 射线：医学成像和安检扫描。'),
        text('Gamma rays: sterilising food and medical equipment, detecting cancer and treating cancer.', '伽马射线：食品及医疗器械灭菌、癌症检测和治疗。'),
      ],
    },
    {
      heading: text('3. Hazards and exposure', '3. 危害与暴露'),
      bullets: [
        text('Microwaves can cause internal heating of body cells.', '微波可使人体细胞内部受热。'),
        text('Infrared radiation can cause skin burns.', '红外辐射可造成皮肤灼伤。'),
        text('Ultraviolet can damage surface cells and eyes, increasing risks of skin cancer and eye conditions.', '紫外线可损伤表层细胞和眼睛，增加皮肤癌和眼部疾病风险。'),
        text('X-rays and gamma rays can cause mutations or damage body cells.', 'X 射线和伽马射线可引起突变或损伤人体细胞。'),
      ],
    },
    {
      heading: text('4. Satellite and wireless communication', '4. 卫星与无线通信'),
      paragraphs: [
        text(
          'Artificial satellites communicate mainly by microwaves. Some satellite phones use low-orbit satellites, while some satellite phones and direct-broadcast television use geostationary satellites.',
          '人造卫星主要使用微波通信。一些卫星电话使用低轨卫星，另一些卫星电话和直播卫星电视使用地球同步卫星。',
        ),
        text(
          'Mobile phones and wireless internet use microwaves because they can penetrate some walls and require short aerials. Bluetooth uses radio waves, which pass through walls but are weakened. Optical fibres use visible light or infrared for cable television and high-speed broadband because glass is transparent to these bands and short wavelengths can carry high data rates.',
          '移动电话和无线网络使用微波，因为微波可穿过部分墙体且只需较短天线。蓝牙使用无线电波，能穿墙但信号会减弱。光纤用可见光或红外光传输有线电视和高速宽带，因为玻璃对这些波段透明，较短波长可承载较高数据率。',
        ),
      ],
    },
    {
      heading: text('5. Analogue and digital signals', '5. 模拟与数字信号'),
      paragraphs: [
        text(
          'An analogue signal varies continuously; a digital signal uses discrete levels. Sound can be transmitted in either form. Digital signalling supports higher data rates and longer effective range because repeaters can regenerate the intended levels accurately instead of amplifying accumulated noise.',
          '模拟信号连续变化；数字信号使用离散电平。声音可用两种形式传输。数字信号可支持更高数据传输率和更远有效距离，因为中继器能准确重建规定电平，而不是同时放大累积噪声。',
        ),
      ],
    },
  ],
};

const soundLesson: CurriculumLesson = {
  title: text('3.4 Sound', '3.4 声'),
  description: text(
    'Production and transmission of sound, speed, pitch, loudness, echoes and ultrasound.',
    '声音的产生与传播、声速、音调、响度、回声与超声。',
  ),
  sections: [
    {
      heading: text('1. Production and longitudinal structure', '1. 产生与纵波结构'),
      paragraphs: [
        text(
          'Sound is produced by vibrating sources and requires a material medium. It cannot travel through a vacuum. In a longitudinal sound wave, particles vibrate parallel to propagation, producing compressions and rarefactions.',
          '声音由振动声源产生，需要物质介质传播，不能在真空中传播。纵向声波中，粒子沿传播方向振动，形成压缩区和稀疏区。',
        ),
        text(
          'Human hearing is approximately $20\\,\\mathrm{Hz}$ to $20\\,000\\,\\mathrm{Hz}$. Sound travels at about $330$–$350\\,\\mathrm{m\\,s^{-1}}$ in air and generally faster in liquids than gases and faster in solids than liquids.',
          '人耳可听频率约为 $20\\,\\mathrm{Hz}$ 至 $20\\,000\\,\\mathrm{Hz}$。声音在空气中的速度约为 $330$–$350\\,\\mathrm{m\\,s^{-1}}$，通常在液体中比气体中快，在固体中比液体中快。',
        ),
      ],
    },
    {
      heading: text('2. Measuring the speed of sound', '2. 测量声速'),
      paragraphs: [
        text(
          'One method places two microphones a measured distance apart and uses an oscilloscope or data logger to measure the travel-time difference of a sharp sound. Another method uses an echo from a wall at a measured distance, with the sound travelling to the wall and back.',
          '一种方法把两个麦克风相隔已知距离放置，用示波器或数据记录器测量尖锐声音到达两处的时间差。另一种方法利用距离已知墙面的回声，此时声音往返传播。',
        ),
      ],
      formulas: [
        formula('Direct timing', '直接计时', 'v=\\frac{d}{t}'),
        formula('Echo timing', '回声计时', 'v=\\frac{2d}{t}'),
      ],
    },
    {
      heading: text('3. Loudness, pitch and echoes', '3. 响度、音调与回声'),
      paragraphs: [
        text(
          'Greater amplitude corresponds to louder sound; greater frequency corresponds to higher pitch. An echo is a reflected sound wave and is heard separately only when the delay is sufficiently large.',
          '振幅越大，声音越响；频率越高，音调越高。回声是反射的声波，只有延迟足够大时才会与原声分开听到。',
        ),
      ],
    },
    {
      heading: text('4. Ultrasound and applications', '4. 超声与应用'),
      paragraphs: [
        text(
          'Ultrasound has frequency above $20\\,\\mathrm{kHz}$. Reflected ultrasound is used for non-destructive testing of materials, medical imaging of soft tissue and sonar.',
          '超声的频率高于 $20\\,\\mathrm{kHz}$。反射超声用于材料无损检测、软组织医学成像和声呐。',
        ),
        text(
          'In pulse-echo calculations, the measured time is usually for a round trip. Depth or distance to the reflector is therefore half the total distance travelled by the pulse.',
          '脉冲回波计算中，测得时间通常对应往返过程。因此反射界面的深度或距离等于脉冲总路程的一半。',
        ),
      ],
      formulas: [formula('Pulse-echo distance', '脉冲回波距离', 'd=\\frac{vt}{2}')],
    },
  ],
};

export const igcseUnit3Lessons: CurriculumLesson[] = [
  generalWavesLesson,
  lightLesson,
  electromagneticSpectrumLesson,
  soundLesson,
];
