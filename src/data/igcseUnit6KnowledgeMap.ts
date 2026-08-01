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

const earthSolarSystemLesson: CurriculumLesson = {
  title: text('6.1 Earth and the Solar System', '6.1 地球与太阳系'),
  description: text(
    'Earth–Moon cycles, Solar System structure and formation, gravity, light travel and orbital motion.',
    '地月周期、太阳系结构与形成、引力、光行时与轨道运动。',
  ),
  sections: [
    {
      heading: text('1. Earth’s rotation, orbit and seasons', '1. 地球自转、公转与季节'),
      paragraphs: [
        text(
          'Earth rotates once on its tilted axis in approximately $24\\,\\mathrm{h}$. This produces the apparent daily motion of the Sun and the repeating cycle of day and night.',
          '地球绕倾斜的自转轴约每 $24\\,\\mathrm{h}$ 自转一周。这解释了太阳的周日视运动和昼夜周期。',
        ),
        text(
          'Earth orbits the Sun in approximately $365\\,\\mathrm{days}$. Seasons arise from the axial tilt together with orbital motion, which changes solar angle and daylight duration in each hemisphere; they are not caused primarily by changing Earth–Sun distance.',
          '地球约每 $365\\,\\mathrm{days}$ 绕太阳一周。季节由地轴倾斜与公转共同造成，使各半球的太阳入射角和日照时长发生变化；季节并非主要由日地距离变化引起。',
        ),
      ],
    },
    {
      heading: text('2. Moon phases and orbital speed', '2. 月相与轨道速度'),
      paragraphs: [
        text(
          'The Moon takes approximately one month to orbit Earth. As the viewing geometry of the Sun-lit half changes, the visible phase repeats. Ordinary phases are not Earth’s shadow on the Moon.',
          '月球约一个月绕地球一周。随着被太阳照亮的一半与观察方向的几何关系改变，月相周期性变化。普通月相并不是地球影子投在月球上。',
        ),
        text(
          'Average orbital speed is circumference divided by orbital period. Radius and period must use compatible units.',
          '平均轨道速度等于轨道周长除以轨道周期。半径和周期必须使用相容单位。',
        ),
      ],
      formulas: [formula('Average orbital speed (Supplement)', '平均轨道速度（Supplement）', 'v=\\frac{2\\pi r}{T}')],
    },
    {
      heading: text('3. Contents of the Solar System', '3. 太阳系的组成'),
      paragraphs: [
        text(
          'The Solar System contains the Sun; Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune in order; minor planets including Pluto and asteroids in the asteroid belt; moons orbiting planets; and smaller bodies such as comets and other natural satellites.',
          '太阳系包含太阳；按顺序排列的水星、金星、地球、火星、木星、土星、天王星和海王星；包括冥王星和小行星带天体在内的矮行星与小行星；绕行星运行的卫星；以及彗星等较小天体。',
        ),
        text(
          'The four inner planets are relatively small and rocky; the four outer planets are relatively large and gaseous.',
          '内侧四颗行星相对较小且主要为岩石行星；外侧四颗行星相对较大且主要为气态行星。',
        ),
      ],
    },
    {
      heading: text('4. Accretion model of formation', '4. 吸积形成模型'),
      paragraphs: [
        text(
          'The accretion model begins with a rotating interstellar cloud of gas and dust containing many elements. Gravity causes material to collapse and form a rotating accretion disc. Collisions and gravitational attraction assemble progressively larger bodies.',
          '吸积模型始于含多种元素、正在旋转的星际气体和尘埃云。引力使物质坍缩并形成旋转吸积盘，碰撞与引力吸引使天体逐渐聚集变大。',
        ),
        text(
          'High temperatures near the forming Sun favoured rocky, high-melting-point material in the inner region, while volatile materials and gases could accumulate farther away. This accounts qualitatively for the inner rocky planets and outer giant planets.',
          '形成中的太阳附近温度较高，内侧区域主要保留熔点高的岩石物质；挥发性物质和气体可在更远处聚集。这在定性上解释了内侧岩石行星与外侧巨行星的差异。',
        ),
      ],
    },
    {
      heading: text('5. Gravity, light travel and orbits', '5. 引力、光行时与轨道'),
      paragraphs: [
        text(
          'Surface gravitational field strength depends on a planet’s mass. Around a planet, field strength decreases with distance. The Sun contains most of the Solar System’s mass, so its gravitational attraction supplies the force that keeps planets and other bodies in orbit.',
          '行星表面的重力场强取决于行星质量；在行星周围，重力场强随距离增加而减小。太阳包含太阳系绝大部分质量，因此太阳引力提供使行星和其他天体保持轨道运动所需的力。',
        ),
        text(
          'Light-travel time is distance divided by light speed and is significant across the Solar System. A received image always shows an object as it was when the light left it.',
          '光行时等于距离除以光速，在太阳系尺度上不可忽略。接收到的图像总是显示光离开天体时的状态。',
        ),
      ],
      formulas: [formula('Light-travel time', '光行时', 't=\\frac{d}{c}')],
    },
    {
      heading: text('6. Elliptical orbits and planetary data (Supplement)', '6. 椭圆轨道与行星数据（Supplement）'),
      paragraphs: [
        text(
          'Planets, minor planets and comets have elliptical orbits. The Sun is at a focus, not at the centre, except that an almost circular ellipse makes the distinction small.',
          '行星、矮行星、小行星和彗星沿椭圆轨道运动。太阳位于椭圆的一个焦点而不是中心；只有轨道近似圆时两者差别很小。',
        ),
        text(
          'Planetary tables may require comparison of orbital distance, orbital duration, density, surface temperature and surface gravitational field strength. Increasing distance from the Sun generally means weaker solar gravitational field and lower orbital speed.',
          '行星数据表可能要求比较轨道距离、轨道周期、密度、表面温度和表面重力场强。离太阳越远，太阳重力场通常越弱，轨道速度越小。',
        ),
        text(
          'In an elliptical orbit, an object moves faster nearer the Sun. As it falls inward, gravitational potential energy decreases and kinetic energy increases; the reverse occurs as it moves outward.',
          '物体在椭圆轨道上靠近太阳时运动更快。向内运动时重力势能减少、动能增加；向外运动时相反。',
        ),
      ],
    },
  ],
};

const starsUniverseLesson: CurriculumLesson = {
  title: text('6.2 Stars and the Universe', '6.2 恒星与宇宙'),
  description: text(
    'The Sun, galaxies, light-years, stellar evolution, redshift, CMBR, Hubble law and the age of the Universe.',
    '太阳、星系、光年、恒星演化、红移、宇宙微波背景、哈勃定律与宇宙年龄。',
  ),
  sections: [
    {
      heading: text('1. The Sun as a star', '1. 太阳作为恒星'),
      paragraphs: [
        text(
          'The Sun is a medium-sized star made mostly of hydrogen and helium. Most of its radiation is in the infrared, visible and ultraviolet regions.',
          '太阳是一颗中等大小的恒星，主要由氢和氦组成，辐射能量主要位于红外、可见光和紫外波段。',
        ),
        text(
          'Stars release energy through nuclear reactions. In stable main-sequence stars, hydrogen nuclei fuse to form helium. The outward effect associated with the hot interior balances inward gravitational attraction.',
          '恒星通过核反应释放能量。稳定的主序星中，氢核聚变形成氦。高温内部产生的向外作用与向内的引力吸引相平衡。',
        ),
      ],
    },
    {
      heading: text('2. Galaxies and light-years', '2. 星系与光年'),
      paragraphs: [
        text(
          'A galaxy contains many billions of stars. The Sun belongs to the Milky Way, and other Milky Way stars are much farther from Earth than the Sun. The Milky Way is one of many billions of galaxies and is approximately $100\\,000$ light-years in diameter.',
          '一个星系包含数千亿颗恒星。太阳属于银河系，银河系中的其他恒星比太阳离地球远得多。银河系只是宇宙中数十亿星系之一，直径约为 $100\\,000$ 光年。',
        ),
        text(
          'A light-year is the distance light travels through vacuum in one year; it is a distance, not a time.',
          '一光年是光在真空中一年传播的距离，是距离单位而不是时间单位。',
        ),
      ],
      formulas: [formula('Light-year (Supplement)', '光年（Supplement）', '1\\,\\mathrm{ly}=9.5\\times10^{15}\\,\\mathrm{m}')],
    },
    {
      heading: text('3. Stellar life cycle (Supplement)', '3. 恒星生命周期（Supplement）'),
      paragraphs: [
        text(
          'A star forms from an interstellar cloud of gas and dust containing hydrogen. Gravity collapses the cloud into a protostar and raises its temperature. It becomes stable when inward gravitational attraction is balanced by the outward effect of the high central temperature.',
          '恒星形成于含氢的星际气体和尘埃云。引力使云坍缩成原恒星并升温；当向内引力与中心高温产生的向外作用平衡时，恒星进入稳定阶段。',
        ),
        text(
          'When central hydrogen becomes depleted, most stars expand into red giants, while more massive stars become red supergiants. A lower-mass red giant produces a planetary nebula and leaves a white dwarf.',
          '中心氢燃料逐渐耗尽后，多数恒星膨胀成红巨星，更大质量恒星成为红超巨星。较低质量的红巨星形成行星状星云，并留下白矮星。',
        ),
        text(
          'A red supergiant explodes as a supernova, creating a nebula containing hydrogen and newly formed heavier elements and leaving a neutron star or black hole. Supernova material can later form new stars and orbiting planets.',
          '红超巨星以超新星形式爆发，形成含氢和新生成重元素的星云，并留下中子星或黑洞。超新星物质之后可形成新的恒星及其行星系统。',
        ),
      ],
    },
    {
      heading: text('4. Redshift and expansion', '4. 红移与宇宙膨胀'),
      paragraphs: [
        text(
          'Redshift is an increase in the observed wavelength of electromagnetic radiation from a receding star or galaxy. Light from distant galaxies is redshifted compared with the corresponding radiation measured on Earth.',
          '红移是远离我们的恒星或星系所发电磁辐射的观测波长增大。遥远星系的光与地球上对应辐射相比发生红移。',
        ),
        text(
          'The widespread redshift of galaxies is evidence that the Universe is expanding and supports the Big Bang theory. Galaxy recession speed can be found from the fractional wavelength change for non-relativistic speeds.',
          '星系普遍红移是宇宙膨胀的证据，并支持大爆炸理论。在非相对论速度下，可由波长的相对变化求星系退行速度。',
        ),
      ],
      formulas: [formula('Redshift speed', '红移速度', '\\frac{v}{c}=\\frac{\\Delta\\lambda}{\\lambda_0}')],
    },
    {
      heading: text('5. Cosmic microwave background', '5. 宇宙微波背景'),
      paragraphs: [
        text(
          'Cosmic microwave background radiation is microwave radiation of a specific frequency observed in every direction. It was produced shortly after the Universe formed and was stretched into the microwave region as the Universe expanded.',
          '宇宙微波背景辐射是在各个方向都能观测到的特定频率微波。它产生于宇宙形成后不久，并随着宇宙膨胀被拉伸到微波波段。',
        ),
        text(
          'Its all-sky presence and origin in the early hot Universe provide independent evidence for the Big Bang model.',
          '它在全天空的存在以及源自早期高温宇宙的性质，为大爆炸模型提供了独立证据。',
        ),
      ],
    },
    {
      heading: text('6. Hubble constant and age of the Universe (Supplement)', '6. 哈勃常数与宇宙年龄（Supplement）'),
      paragraphs: [
        text(
          'The distance to a far galaxy can be estimated from the known brightness of a supernova in that galaxy. The Hubble constant is recession speed divided by distance.',
          '遥远星系的距离可利用该星系中超新星的已知亮度估算。哈勃常数等于星系退行速度除以距离。',
        ),
        text(
          'The reciprocal of the Hubble constant estimates the age of the Universe. Reversing the observed expansion points toward all matter having been concentrated at a single point, supporting the Big Bang model.',
          '哈勃常数的倒数可估算宇宙年龄。把观测到的膨胀反向推演，会指向所有物质曾集中在一点，从而支持大爆炸模型。',
        ),
      ],
      formulas: [
        formula('Hubble constant', '哈勃常数', 'H_0=\\frac{v}{d}'),
        formula('Current syllabus estimate', '大纲给出的当前估值', 'H_0=2.2\\times10^{-18}\\,\\mathrm{s^{-1}}'),
        formula('Estimated age', '估算宇宙年龄', 't\\approx\\frac{d}{v}=\\frac{1}{H_0}'),
      ],
    },
  ],
};

export const igcseUnit6Lessons: CurriculumLesson[] = [
  earthSolarSystemLesson,
  starsUniverseLesson,
];
