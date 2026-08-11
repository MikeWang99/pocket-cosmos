import type {
  CurriculumClassroomQuestion,
  CurriculumCourse,
  CurriculumImage,
  CurriculumLesson,
  LocalizedText,
} from './apPhysicsCurriculum';

const text = (en: string, zh: string): LocalizedText => ({ en, zh });

const asset = (filename: string, altEn: string, altZh: string, captionEn: string, captionZh: string): CurriculumImage => ({
  src: `/curriculum-assets/competition-roadmap/${filename}`,
  alt: text(altEn, altZh),
  caption: text(captionEn, captionZh),
  sourceLabel: text('Original Pocket Cosmos graphic', '口袋宇宙原创图'),
});

const timelineImage = asset(
  'timeline-overview.png',
  'Annual timeline comparing Physics Bowl, F=ma and BPhO across the school year.',
  '三大竞赛体系在一学年中的时间轴对比图。',
  'Physics Bowl (March–April), F=ma (February) and BPhO (November) sit in different windows of the year, so they can be combined.',
  '物理碗（3–4 月）、F=ma（2 月）与 BPhO（11 月）分布在一年的不同时段，可以组合参加。',
);

const pulleyInclineImage = asset(
  'pulley-incline-diagram.png',
  'Two identical bricks on an incline connected by a massless string over two frictionless pulleys.',
  '斜面上两块相同的砖，通过绕过两个光滑滑轮的轻绳相连。',
  'Two bricks of mass m on a fixed slope of angle θ, connected to two frictionless pulleys by a massless string.',
  '两块质量为 m 的砖放在倾角为 θ 的固定斜面上，由轻绳绕过两个光滑滑轮。',
);

const monumentImage = asset(
  'stoodle-pike-monument.png',
  'The Stoodley Pike Monument, a tall stone tower standing on exposed moorland.',
  'Stoodley Pike 纪念碑：矗立在开阔荒野上的高大石塔。',
  'Stoodley Pike Monument, West Yorkshire — 37 m tall, exposed to strong winds on high moorland.',
  '西约克郡 Stoodley Pike 纪念碑——高 37 m，矗立在高地荒野上，常年承受强风。',
);

const mysteryProblemA: CurriculumClassroomQuestion = {
  id: 'mystery-problem-a-stopping-distance',
  mode: 'written',
  title: text('Mystery Problem 1 — The Sliding Box', '神秘题目 1 —— 滑动的箱子'),
  prompt: text(
    'A box of mass m slides on a horizontal surface with initial speed v. Kinetic friction (coefficient μ) acts on the box and brings it to rest after it has slid a distance d. Which quantity — or combination of quantities — must be doubled so that the stopping distance becomes exactly 2d?',
    '一个质量为 m 的箱子以初速度 v 在水平面上滑动，滑动摩擦（摩擦系数 μ）使它在滑行距离 d 后停下。要让停止距离恰好变为 2d，需要把哪个量（或哪些量的组合）加倍？',
  ),
  sampleAnswer: text(
    'Double BOTH the initial speed v and the coefficient of friction μ. From the work–energy theorem, the stopping distance is d = v² / (2μg): doubling v alone would give 4d, doubling μ alone would give d/2, but doubling both gives (2v)² / (2·2μ·g) = 2d. The mass m cancels out and never matters.',
    '同时加倍初速度 v 和摩擦系数 μ。由动能定理，停止距离 d = v² / (2μg)：只加倍 v 会得 4d，只加倍 μ 会得 d/2，而两者同时加倍得 (2v)² / (2·2μ·g) = 2d。质量 m 会被约掉，永远无关。',
  ),
  explanation: text(
    'This is a Physics Bowl–style question: one setup, one clean idea (work–energy or constant-acceleration kinematics), and it should be finished in about a minute. Breadth + speed — recognize the pattern and execute fast.',
    '这是一道物理碗风格的题：一个情景、一个干净的想法（动能定理或匀变速运动学），应在一分钟内完成。广度 + 速度——快速识别题型并迅速执行。',
  ),
};

const mysteryProblemB: CurriculumClassroomQuestion = {
  id: 'mystery-problem-b-l-lever',
  mode: 'written',
  title: text('Mystery Problem 2 — The L-Shaped Lever', '神秘题目 2 —— L 形杠杆'),
  prompt: text(
    'A light lever in the shape of an L is smoothly pivoted at B, so it can rotate freely in a vertical plane. The two arms are AB of length a and BC of length b. A mass mₐ is attached at A and a mass m_b at C. In the equilibrium position, arm AB makes an angle θ with the vertical. Derive an expression for θ in terms of mₐ, m_b, a and b.',
    '一个 L 形的轻杠杆在 B 点光滑铰接，可在竖直平面内自由转动。两臂分别为 AB（长 a）和 BC（长 b）。A 点挂质量 mₐ，C 点挂质量 m_b。平衡时，臂 AB 与竖直方向成角 θ。请推导 θ 用 mₐ、m_b、a、b 表示的表达式。',
  ),
  sampleAnswer: text(
    'Take torques about the pivot B. If AB makes angle θ with the vertical, the horizontal moment arm of mₐ is a·sinθ; the arm BC is perpendicular to AB, so the horizontal moment arm of m_b is b·cosθ. Balance: mₐ·g·a·sinθ = m_b·g·b·cosθ, hence tanθ = m_b·b / (mₐ·a).',
    '对铰点 B 取力矩。若 AB 与竖直方向成 θ，则 mₐ 的水平力臂为 a·sinθ；臂 BC 垂直于 AB，所以 m_b 的水平力臂为 b·cosθ。力矩平衡：mₐ·g·a·sinθ = m_b·g·b·cosθ，故 tanθ = m_b·b / (mₐ·a)。',
  ),
  explanation: text(
    'This is a BPhO-style question: no options, no numbers — you must construct the argument. The geometry (where is each moment arm?) is the real test, and the written derivation is what gets marked. Modeling + written reasoning.',
    '这是一道 BPhO 风格的题：没有选项、没有数字——你必须自己构建论证。几何分析（每个力的力臂在哪里？）才是真正的考验，书面推导过程才是得分点。建模 + 书面论证。',
  ),
};

const mysteryProblemC: CurriculumClassroomQuestion = {
  id: 'mystery-problem-c-pulley-incline',
  mode: 'written',
  title: text('Mystery Problem 3 — Bricks, Pulleys and a Slope', '神秘题目 3 —— 砖块、滑轮与斜面'),
  prompt: text(
    'Two identical bricks of mass m are attached to two frictionless pulleys by a massless string, on a fixed slope of angle θ to the horizontal, as shown. Suppose that the coefficient of static friction between the lower block and the slope is μ, and all other surfaces are frictionless. What is the minimum value of μ so that the blocks can stay static?',
    '如图所示，两块质量均为 m 的相同砖块通过轻绳连接在两个光滑滑轮上，置于与水平面成 θ 角的固定斜面上。设下方砖块与斜面之间的静摩擦系数为 μ，其余所有表面均光滑。要使两块砖保持静止，μ 的最小值是多少？',
  ),
  image: {
    src: '/curriculum-assets/competition-roadmap/pulley-incline-diagram.png',
    alt: 'Two identical bricks on an incline connected by a massless string over two frictionless pulleys.',
    caption: text('Two bricks, two pulleys, one slope — and only one frictional surface.', '两块砖、两个滑轮、一个斜面——只有一处有摩擦。'),
  },
  sampleAnswer: text(
    'Start with a careful force analysis: friction exists only between the lower brick and the slope, so it must hold the downslope pull of BOTH bricks plus whatever the string routing transmits. Work out the normal force on the slope surface, trace the tension through the two-pulley arrangement, then set friction (at most μN) against the total downslope component. The trap is assuming the tension is "just mg sinθ" — the pulley geometry changes the effective pull.',
    '先做仔细的受力分析：只有下方砖块与斜面之间有摩擦，它必须抵消两块砖沿斜面向下的总分力以及绳子绕法所传递的力。先求斜面上的正压力，再追踪绕过两个滑轮的绳子张力，然后用最大静摩擦力 μN 与沿斜面向下的总分量平衡。陷阱是想当然认为张力"就是 mg sinθ"——滑轮的几何绕法会改变实际的拉力。',
  ),
  explanation: text(
    'This is an F=ma-style question: the setup looks familiar (blocks on a slope), but the structure is hidden in the pulley arrangement and rewards deep, careful mechanics reasoning. the same ingredients as an easy problem — but it needs three minutes of real thinking, not thirty seconds of recognition.',
    '这是一道 F=ma 风格的题：情景看似熟悉（斜面上的物块），但关键在于滑轮绕法中隐藏的结构，考验深入、细致的力学推理。 ingredients 和简单题一样——但需要三分钟的真正思考，而不是三十秒的题型识别。',
  ),
};

const monumentQuestion: CurriculumClassroomQuestion = {
  id: 'bpho-round2-stoodley-pike-monument',
  mode: 'written',
  title: text('Stoodley Pike Monument — Will the Wind Blow It Down?', 'Stoodley Pike 纪念碑——风会把它吹倒吗？'),
  prompt: text(
    'Stoodley Pike Monument stands 37 m high above exposed moorland in West Yorkshire. It is roughly cylindrical and solid throughout, with an average diameter of 7.5 m, and is built from local sandstone of density 3.0 g cm⁻³ (Fig. 1). The force of the wind on a structure may be approximated by F = ρAv², where ρ = 1.3 kg m⁻³ is the density of air, A is the projected area of the tower and v is the wind speed. Assuming the monument has negligible foundations, determine the wind speed that would topple it. Suggest what significance the actual shape of the monument might have.',
    'Stoodley Pike 纪念碑矗立在西约克郡开阔的荒野上，高 37 m。它大致呈圆柱形且整体实心，平均直径 7.5 m，由密度 3.0 g cm⁻³ 的当地砂岩砌成（图 1）。风对建筑物的作用力可近似为 F = ρAv²，其中 ρ = 1.3 kg m⁻³ 为空气密度，A 为塔身的迎风投影面积，v 为风速。假设纪念碑几乎没有地基，求能将它吹倒的风速。并讨论纪念碑的实际形状会带来什么影响。',
  ),
  image: {
    src: '/curriculum-assets/competition-roadmap/stoodle-pike-monument.png',
    alt: 'The Stoodley Pike Monument, a tall stone tower on exposed moorland.',
    caption: text('Fig. 1 — Stoodley Pike Monument, 37 m tall.', '图 1 —— Stoodley Pike 纪念碑，高 37 m。'),
  },
  sampleAnswer: text(
    'Model toppling as a torque balance about the downwind base edge. The wind force F = ρAv² acts on the projected area A ≈ 37 m × 7.5 m, roughly at half height (≈ 18.5 m). The weight W = ρ_stone × V × g acts through the centre, with moment arm d/2 = 3.75 m. Toppling begins when F × (h/2) ≥ W × (d/2) — solve for v (the estimate lands in the order of a few hundred m/s, far beyond real winds). Then discuss reality: the real monument is tapered, so its projected area and centre of pressure are lower and its weight distribution is base-heavy — both make it far more stable than the cylinder model suggests.',
    '把倾倒建模为对背风侧底边棱的力矩平衡。风力 F = ρAv² 作用在迎风投影面积 A ≈ 37 m × 7.5 m 上，约在半高处（≈ 18.5 m）。重力 W = ρ_石 × V × g 通过中心作用，力臂为 d/2 = 3.75 m。当 F × (h/2) ≥ W × (d/2) 时开始倾倒——解出 v（估算值在数百 m/s 量级，远超真实风速）。再讨论实际情形：真实纪念碑是上窄下宽的锥形，迎风面积和压力中心更低、重心更靠下，稳定性远比圆柱模型好。',
  ),
  explanation: text(
    'This is BPhO Round Two difficulty: one open situation, several decisions to make yourself (where does the wind force act? which edge is the pivot? how big is the projected area?), a quantitative estimate, and then a written discussion of the model\'s limits. No formula is handed to you — you build it.',
    '这是 BPhO Round Two 的难度：一个开放情景，需要自己做若干决定（风力作用点在哪？以哪条边为转轴？迎风面积多大？）、给出定量估算，再书面讨论模型的局限。没有现成公式——你要自己建立模型。',
  ),
};

const lessons: CurriculumLesson[] = [
  {
    title: text('Opening — Two Big Questions', '开场——两个大问题'),
    description: text(
      'The two guiding questions of the whole lecture: what kind of student does each competition reward, and what do they mean for university applications?',
      '整场讲座的两个核心问题：每个竞赛奖励什么样的学生？它们对大学申请到底意味着什么？',
    ),
    sections: [
      {
        heading: text('Physics Competition Roadmap', '物理竞赛路线图'),
        paragraphs: [
          text(
            'BPhO · Physics Bowl · F=ma — three major high-school physics competition systems. We will not just ask "what are these competitions?", but two deeper questions.',
            'BPhO · 物理碗 · F=ma —— 三大高中物理竞赛体系。我们不只问"这些竞赛是什么"，更要追问两个更深的问题。',
          ),
        ],
        bullets: [
          text('Question 1: What kind of physics student does each competition reward?', '问题一：每个竞赛奖励什么样的物理学生？'),
          text('Question 2: What do these competitions actually mean for university applications?', '问题二：这些竞赛对大学申请究竟意味着什么？'),
        ],
        takeaway: text(
          'They reward very different skills — and their admissions value is not what most people assume.',
          '它们奖励的是完全不同的能力——而它们的申请价值，也与多数人的想象不同。',
        ),
      },
    ],
  },
  {
    title: text('The Golden Rule — Academic Value ≠ Admissions Value', '黄金法则——学术价值 ≠ 申请价值'),
    description: text(
      'The most important mindset of the lecture: separate what a competition does for your physics from what it does for your application.',
      '本讲最重要的心态：把竞赛对你物理能力的提升，与它对申请材料的作用分开看待。',
    ),
    sections: [
      {
        heading: text('What a competition can — and cannot — do', '竞赛能做什么、不能做什么'),
        bullets: [
          text('① It can make you a stronger physicist.', '① 它能让你成为更强的物理学习者。'),
          text('② A strong result provides evidence of your academic ability.', '② 优秀的成绩是学术能力的有力证据。'),
          text('③ Depending on country and university, that achievement can strengthen your application.', '③ 视国家和大学而定，获奖可以增强你的申请。'),
          text('④ But it does NOT guarantee admission — no competition does.', '④ 但它绝不保证录取——没有任何竞赛可以。'),
        ],
        paragraphs: [
          text(
            'MIT Admissions has explicitly stated that even an International Olympiad medal does not guarantee admission — and the overwhelming majority of its students never won an Olympiad medal.',
            'MIT 招生办明确表示：即使是国际奥赛奖牌也不保证录取——而且 MIT 的绝大多数学生从未获得过奥赛奖牌。',
          ),
        ],
        takeaway: text(
          'Don\'t think "competition X is prestigious, therefore university Y will like me." Think in terms of academic value and admissions value — they overlap, but they are not the same thing.',
          '不要想"竞赛 X 很有名，所以大学 Y 就会喜欢我"。请分开思考学术价值与申请价值——它们有重叠，但不是一回事。',
        ),
      },
    ],
  },
  {
    title: text('Three Competitions — Three Game Modes', '三大竞赛——三种游戏模式'),
    description: text(
      'Physics Bowl is an FPS game, F=ma is a boss fight, BPhO is open-world exploration — then the format, style and admissions relevance of each.',
      '物理碗是 FPS 游戏、F=ma 是 Boss 战、BPhO 是开放世界——然后逐一拆解每个竞赛的形式、风格与申请价值。',
    ),
    sections: [
      {
        heading: text('The fastest way to understand the difference', '最快理解差异的方式'),
        table: {
          caption: text('Three competitions as three game modes', '三大竞赛如同三种游戏模式'),
          headers: [text('Competition', '竞赛'), text('The core idea', '核心理念'), text('Game mode 🎮', '游戏模式 🎮')],
          rows: [
            [text('Physics Bowl', '物理碗'), text('Broad + Fast', '广度 + 速度'), text('FPS game', 'FPS 游戏')],
            [text('F=ma', 'F=ma'), text('Deep Mechanics', '深度力学'), text('Boss fight', 'Boss 战')],
            [text('BPhO', 'BPhO'), text('Olympiad-style written problem solving', '奥赛风格书面解题'), text('Open world exploration', '开放世界探索')],
          ],
        },
      },
      {
        heading: text('Physics Bowl — breadth and speed', '物理碗——广度与速度'),
        bullets: [
          text('Run by the AAPT (American Association of Physics Teachers).', '由 AAPT（美国物理教师协会）主办。'),
          text('Format: 40 multiple-choice questions in 45 minutes — just over one minute per question.', '形式：45 分钟 40 道选择题——每题仅一分多钟。'),
          text('Covers almost all of high-school physics: mechanics, electricity, waves, optics, thermal, modern physics.', '几乎覆盖全部高中物理：力学、电学、波动、光学、热学、近代物理。'),
          text('Rewards breadth, speed, recognition and efficient calculation.', '奖励广度、速度、题型识别与高效计算。'),
          text('A great first competition; accessible internationally through schools.', '很适合作为第一个竞赛；可通过学校在国际范围参加。'),
        ],
        takeaway: text(
          'Useful achievement with a high score — it says "strong, broad physics knowledge." But participation alone will not transform an application. The level of achievement matters enormously.',
          '高分时是有用的成果——它说明"物理知识既广又扎实"。但仅凭参与无法改变申请。获奖层次极其重要。',
        ),
      },
      {
        heading: text('F=ma — the deep mechanics boss fight', 'F=ma——深度力学的 Boss 战'),
        bullets: [
          text('Focuses on ONE subject: mechanics — kinematics, Newton\'s laws, energy, momentum, rotation, oscillations, gravitation.', '只考一门：力学——运动学、牛顿定律、能量、动量、转动、振动、万有引力。'),
          text('Format: 25 multiple-choice questions in 75 minutes — three minutes per question, substantially deeper than Physics Bowl.', '形式：75 分钟 25 道选择题——每题三分钟，深度远超物理碗。'),
          text('No calculus required, but the reasoning is demanding.', '不需要微积分，但推理要求很高。'),
          text('It is the FIRST STEP of the U.S. Physics Team pathway: F=ma → USAPhO → U.S. Physics Team → IPhO.', '它是美国物理国家队路径的第一步：F=ma → USAPhO → 美国物理队 → IPhO。'),
        ],
        paragraphs: [
          text(
            '⚠️ Important warning for international students: F=ma is NOT simply an open international competition. Eligibility requires U.S. citizenship, U.S. permanent residency, or currently attending a U.S. school — and you must be physically in the United States. USAPhO is even more restricted. If you\'re outside the US: learn from F=ma problems — they\'re excellent training — but your real pathway is your own country\'s national physics olympiad leading to the IPhO.',
            '⚠️ 给国际学生的重要提醒：F=ma 并不是一个开放的国际竞赛。参赛资格要求美国国籍、美国永久居留权，或正在美国学校就读——且必须身在美国。USAPhO 的限制更严格。如果你在美国之外：可以用 F=ma 的题目训练（非常优质），但你真正的路径是本国的国家物理奥赛通向 IPhO。',
          ),
        ],
      },
      {
        heading: text('BPhO — the open world of written problem solving', 'BPhO——书面解题的开放世界'),
        bullets: [
          text('The British Physics Olympiad is NOT one exam — it is a system of ten annual competitions at different levels.', '英国物理奥赛不是一场考试——而是每年十个不同级别赛事组成的体系。'),
          text('Round 1 is the flagship: roughly two hours of structured, extended problems covering broad physics.', 'Round 1 是主赛：约两小时的综合性大题，覆盖广泛的物理内容。'),
          text('No A/B/C/D — you develop a solution: model the situation, state assumptions, derive the result, write it up clearly.', '没有选择题——你要发展出一个解答：建立模型、声明假设、推导结果、清晰书写。'),
          text('Rewards mathematical reasoning, physical modeling and written argument.', '奖励数学推理、物理建模与书面论证。'),
          text('Accessible internationally through participating schools and regions.', '可通过参与学校和地区在国际范围参加。'),
        ],
        takeaway: text(
          'For UK applications (Physics, Maths, Engineering, Natural Sciences), BPhO is particularly relevant. For the US, a high award is a strong signal — but never a direct admissions credential. Think of BPhO as strong evidence of academic preparation and subject passion — not a guarantee.',
          '对英国申请（物理、数学、工程、自然科学）而言 BPhO 尤其相关。对美国申请，高等级奖项是强信号——但从不是直接的录取凭证。请把 BPhO 看作学术准备与学科热情的有力证据——而非保证。',
        ),
      },
      {
        heading: text('When does each one happen?', '它们分别在什么时候？'),
        images: [timelineImage],
        bullets: [
          text('F=ma — February (once per year).', 'F=ma —— 每年 2 月（一年仅一次）。'),
          text('Physics Bowl — March to April.', '物理碗 —— 3 月至 4 月。'),
          text('BPhO Round 1 — November; the wider BPhO calendar runs across the year.', 'BPhO Round 1 —— 11 月；BPhO 全年还有更多轮次与赛事。'),
        ],
        takeaway: text(
          'The three windows barely overlap — a well-planned student can experience all three systems in a single year.',
          '三个时间窗口几乎不重叠——规划得当的学生一年内可以体验全部三大体系。',
        ),
      },
    ],
  },
  {
    title: text('Feel the Difference — Three Mystery Problems', '感受差异——三道神秘题目'),
    description: text(
      'Three unlabeled problems from three different systems. Guess which competition each one comes from — then we reveal the answer.',
      '三道没有标注来源的题目，分别来自三大体系。先猜猜每道题出自哪个竞赛——然后揭晓答案。',
    ),
    sections: [
      {
        heading: text('No labels — just the problems', '没有标签——只有题目'),
        paragraphs: [
          text(
            'Enough talking — let\'s actually do some physics. Look at each problem and ask: which competition does this feel like? And how long should you spend on it?',
            '说得够多了——来做点真物理。看每道题并思考：这道题的气质像哪个竞赛？你应该花多长时间？',
          ),
        ],
        classroomQuestions: [mysteryProblemA, mysteryProblemB, mysteryProblemC],
      },
      {
        heading: text('The reveal', '揭晓'),
        bullets: [
          text('Physics Bowl asks: Can you recognize and execute quickly?', '物理碗在问：你能快速识别并执行吗？'),
          text('F=ma asks: Can you find the deeper mechanics idea?', 'F=ma 在问：你能找到更深的力学思想吗？'),
          text('BPhO asks: Can you construct a rigorous, written solution?', 'BPhO 在问：你能构建严谨的书面解答吗？'),
        ],
        takeaway: text(
          'Now you can feel the difference — not just hear it described.',
          '现在你能"感受"到差异——而不只是听别人描述。',
        ),
      },
    ],
  },
  {
    title: text('What Admissions Officers Actually See', '招生官实际看到的是什么'),
    description: text(
      'The achievement-level ladder, and a concrete competition plan for four student profiles — so every student knows which system to focus on.',
      '先看成果等级阶梯，再给四类学生画像各一份具体竞赛规划——让每个学生都知道自己该主攻哪个体系。',
    ),
    sections: [
      {
        heading: text('First, remember the ladder', '先记住这个阶梯'),
        table: {
          caption: text('Achievement level vs typical admissions signal', '成果等级与典型的申请信号'),
          headers: [text('Achievement', '成果'), text('Typical admissions signal', '典型的申请信号')],
          rows: [
            [text('Participation', '仅参与'), text('Low', '低')],
            [text('Strong score / award', '高分 / 获奖'), text('Moderate', '中等')],
            [text('Top national ranking', '全国顶尖排名'), text('Strong', '强')],
            [text('National Olympiad team', '国家奥赛队'), text('Very strong', '非常强')],
            [text('IPhO medal', 'IPhO 奖牌'), text('Exceptional', '卓越')],
          ],
        },
        takeaway: text(
          'The name of the competition matters, but your level of achievement matters even more. The goal is never "collect certificates" — the goal is to train seriously and achieve something real.',
          '竞赛的名字重要，但你的成果层次更重要。目标从来不是"收集证书"——而是认真训练、取得真实的成绩。',
        ),
      },
      {
        heading: text('Then, find your profile', '然后找到你的画像'),
        table: {
          caption: text('Four student profiles and their priority competition', '四类学生画像与优先竞赛'),
          headers: [text('Your situation', '你的情况'), text('Priority competition', '优先竞赛')],
          rows: [
            [text('🇺🇸 Student in the US', '🇺🇸 在美国就读的学生'), text('F=ma → USAPhO → Physics Team', 'F=ma → USAPhO → 物理队')],
            [text('🌏 International, applying to the US', '🌏 国际学生、申请美国'), text('BPhO (medal = highest value)', 'BPhO（奖牌 = 最高价值）')],
            [text('🇬🇧 Applying to the UK', '🇬🇧 申请英国'), text('BPhO', 'BPhO')],
            [text('🏠 Applying mainly at home', '🏠 主要申请本国大学'), text('Physics Bowl (breadth) + F=ma (mechanics) → BPhO R1', '物理碗（广度）+ F=ma（力学）→ BPhO R1')],
          ],
        },
        bullets: [
          text('In the US: the top ~400 F=ma scorers are invited to USAPhO; about 20 continue to the training camp; 5 represent the US at IPhO.', '在美国：F=ma 前约 400 名受邀参加 USAPhO；约 20 人进入集训营；5 人代表美国出战 IPhO。'),
          text('International → US: at the same award level, a BPhO award carries more weight than a Physics Bowl award. BPhO Gold goes to roughly the top 8%.', '国际生申美：同等获奖层次下，BPhO 奖项的分量重于物理碗奖项。BPhO Gold 大约授予前 8%。'),
          text('Applying to the UK: BPhO problems are close in style to the Oxford PAT and Cambridge admissions tests — training for one trains you for the other.', '申请英国：BPhO 题目风格接近牛津 PAT 与剑桥入学测试——备考其一即同时备考其二。'),
        ],
        takeaway: text(
          'Don\'t ask "which competition looks best?" Ask: "which competition challenges me at the right level — and can I achieve something real in it?"',
          '不要问"哪个竞赛看起来最好？"要问："哪个竞赛在合适的难度上挑战我——我能在其中取得真实的成绩吗？"',
        ),
      },
    ],
  },
  {
    title: text('How to Prepare and When to Start', '如何备考、何时开始'),
    description: text(
      'The universal three-stage principle, and competition-specific training: Physics Bowl speed, F=ma deep mechanics, BPhO written solutions.',
      '通用的三阶段备考原则，以及分竞赛的训练方法：物理碗练速度、F=ma 练深度力学、BPhO 练书面解答。',
    ),
    sections: [
      {
        heading: text('Universal principle', '通用原则'),
        bullets: [
          text('Stage 1 — Fundamentals: build your physics module by module.', '第一阶段——基础：逐个模块打牢物理基础。'),
          text('Stage 2 — Competition style: learn how each competition asks questions.', '第二阶段——竞赛风格：学习每个竞赛的出题方式。'),
          text('Stage 3 — Timed practice: train under real time pressure.', '第三阶段——限时训练：在真实时间压力下训练。'),
        ],
        takeaway: text(
          'Realistic timelines: 6–12 months building fundamentals, then 3–6 months of past papers, then 1–2 months of full timed mock exams.',
          '现实的时间线：6–12 个月打基础，再 3–6 个月刷真题，最后 1–2 个月做整套限时模考。',
        ),
      },
      {
        heading: text('Three competitions, three training styles', '三个竞赛，三种练法'),
        table: {
          caption: text('Training comparison across the three systems', '三大体系训练方法对比'),
          headers: [text('', ''), text('Physics Bowl', '物理碗'), text('F=ma', 'F=ma'), text('BPhO', 'BPhO')],
          rows: [
            [text('Core skill', '核心技能'), text('Fast recognition', '快速识别'), text('Deep reasoning', '深度推理'), text('Modeling + derivation', '建模 + 推导')],
            [text('Training style', '训练方式'), text('Many problems', '多刷题'), text('Few problems, analyzed deeply', '少刷题、深分析'), text('Few problems, written fully', '少刷题、完整书写')],
            [text('Biggest challenge', '最大挑战'), text('Time', '时间'), text('Finding the method', '找到方法'), text('Building the model', '建立模型')],
          ],
        },
        bullets: [
          text('Physics Bowl: cover every module completely (not deeply); spend 20 seconds on easy ones, skip hard ones on the first pass; use estimation and unit analysis.', '物理碗：全覆盖各模块（完整但不求深）；简单题 20 秒解决，难题先跳过；善用估算与量纲分析。'),
          text('F=ma: don\'t grind 100 problems — take one problem and squeeze it dry. Why this method? Is there a simpler one? What if I change a condition? Master rotation — that\'s where most students lose points. Always draw your diagrams.', 'F=ma：不要刷 100 道题——把一道题榨干。为什么用这个方法？有没有更简单的？改一个条件会怎样？攻克转动——多数学生在这里失分。永远画图。'),
          text('BPhO: the answer is not a number — it\'s a process. Write: given, assumptions, equations, derivation, explanation. And beware the trap of reading a solution and thinking "I understand" — you don\'t, until you can rebuild it from a blank sheet.', 'BPhO：答案不是数字——而是过程。写下：已知、假设、方程、推导、解释。警惕"看懂答案就以为自己会了"的陷阱——直到你能从一张白纸重新推出来，才算真的会。'),
        ],
      },
    ],
  },
  {
    title: text('The Full Comparison Table', '完整对比总表'),
    description: text(
      'Everything on one page: organizer, format, difficulty, timing, international access and admissions value — BPhO vs Physics Bowl vs F=ma.',
      '一页看清全部：主办方、形式、难度、时间、国际可达性与申请价值——BPhO 对物理碗对 F=ma。',
    ),
    sections: [
      {
        heading: text('Side by side', '并排对比'),
        table: {
          caption: text('BPhO vs Physics Bowl vs F=ma', 'BPhO 与物理碗、F=ma 全面对比'),
          headers: [text('Category', '类别'), text('BPhO', 'BPhO'), text('Physics Bowl', '物理碗'), text('F=ma', 'F=ma')],
          rows: [
            [text('Organizer', '主办方'), text('British Physics Olympiad', '英国物理奥赛'), text('AAPT', 'AAPT'), text('AAPT / U.S. Physics Team', 'AAPT / 美国物理队')],
            [text('Format', '形式'), text('Written problem solving (~2 h, Round 1)', '书面解题（Round 1 约 2 小时）'), text('40 MCQ, 45 min', '40 道选择题，45 分钟'), text('25 MCQ, 75 min', '25 道选择题，75 分钟')],
            [text('Topics', '考察范围'), text('Broad physics', '广泛物理'), text('Broad physics', '广泛物理'), text('Mechanics only', '仅力学')],
            [text('Time pressure', '时间压力'), text('Moderate', '中等'), text('Very high', '非常高'), text('High', '高')],
            [text('Written reasoning', '书面论证'), text('Yes', '需要'), text('No', '不需要'), text('No', '不需要')],
            [text('Main difficulty', '主要难点'), text('Modeling + unfamiliar problems', '建模 + 陌生题'), text('Breadth + speed', '广度 + 速度'), text('Deep mechanics', '深度力学')],
            [text('Typical period', '典型时间'), text('November', '11 月'), text('March–April', '3–4 月'), text('February', '2 月')],
            [text('International access', '国际可达性'), text('Via participating schools/regions', '通过参与学校/地区'), text('Broad', '广泛'), text('Restricted (US eligibility rules)', '受限（美国参赛资格规则）')],
            [text('US admissions', '美国申请'), text('Strong achievement helps', '优秀成绩有帮助'), text('Moderate', '中等'), text('Strongest within US Team pathway', '在美国队路径中最强')],
            [text('UK admissions', '英国申请'), text('Particularly relevant', '尤其相关'), text('Useful', '有用'), text('Limited (eligibility)', '有限（资格受限）')],
            [text('Best suited for', '最适合'), text('Deep problem solvers', '深度解题者'), text('Fast, broad thinkers', '快速、广博的思考者'), text('Mechanics specialists', '力学专精者')],
          ],
        },
      },
    ],
  },
  {
    title: text('BPhO Round Two — Feel the Real Difficulty', 'BPhO Round Two——感受真实难度'),
    description: text(
      'One genuine BPhO Round Two problem: the Stoodley Pike Monument. No formula is handed to you — you build the model yourself.',
      '一道真正的 BPhO Round Two 题目：Stoodley Pike 纪念碑。没有现成公式——模型要你自己建立。',
    ),
    sections: [
      {
        heading: text('Why show this?', '为什么展示这道题'),
        paragraphs: [
          text(
            'This is what the top of the ladder looks like. Compare it with the three mystery problems earlier: the gap between "recognize and execute" and "build a model from scratch" is exactly what BPhO Round Two tests.',
            '这就是阶梯顶端的样子。把它和前面的三道神秘题对比："识别并执行"与"从零建立模型"之间的差距，正是 BPhO Round Two 所考察的。',
          ),
        ],
        images: [monumentImage],
      },
      {
        heading: text('The problem', '题目'),
        classroomQuestions: [monumentQuestion],
      },
      {
        heading: text('Closing', '结语'),
        paragraphs: [
          text(
            'None of these competitions is a golden ticket — but each one makes you enjoy physics more. Applications matter, but so does having fun with physics.',
            '这些竞赛中没有哪一个是"金色门票"——但每一个都会让你更享受物理。申请很重要，享受物理同样重要。',
          ),
        ],
        takeaway: text(
          'Pick the system that challenges you at the right level, train seriously, and let the physics itself be the reward.',
          '选择那个在合适难度上挑战你的体系，认真训练，让物理本身成为回报。',
        ),
      },
    ],
  },
];

export const competitionRoadmapCourse: CurriculumCourse = {
  id: 'competition-roadmap',
  name: text('Comparing the Three Systems', '三大体系的比较'),
  level: text('Competition Roadmap · Middle & High School', '竞赛路线图 · 初高中'),
  sourceUrl: 'https://www.bpho.org.uk/',
  sourceLabel: text('BPhO, AAPT / Physics Bowl and F=ma official sites', 'BPhO、AAPT / 物理碗与 F=ma 官方网站'),
  units: [
    {
      number: 1,
      title: text('Comparing the Three Systems', '三大体系的比较'),
      weighting: 'Lecture · 45 min',
      summary: text(
        'BPhO, Physics Bowl and F=ma compared side by side: format, style, who each rewards, admissions value, and how to prepare — with three unlabeled problems students can use to feel the difference.',
        'BPhO、物理碗与 F=ma 并排比较：形式、风格、各自奖励什么样的学生、申请价值与备考方法——并配三道无标注题目，让学生亲手"感受"差异。',
      ),
      lessons,
    },
  ],
};
