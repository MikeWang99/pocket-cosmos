import type { PracticeSetMeta, PracticeKind } from './types';

export type PracticeTreeChapter = {
  id: string;
  label: string;
  sets: PracticeSetMeta[];
};

export type PracticeTreeCourse = {
  id: string;
  label: string;
  description?: string;
  chapters: PracticeTreeChapter[];
};

export type PracticeTreeSystem = {
  id: string;
  label: string;
  courses: PracticeTreeCourse[];
};

export type PracticeTreeLabels = {
  apPhysics1: string;
  apPhysics2: string;
  bpho: string;
  aLevel: string;
  physicsBowl: string;
  apCMech: string;
  apCEm: string;
  competition: string;
  igcse: string;
};

export const inferPracticeKind = (set: Pick<PracticeSetMeta, 'id' | 'practiceKind'>): PracticeKind =>
  set.practiceKind ??
  (set.id.includes('-frq-') ? 'structured' : set.id.includes('paper5') ? 'paper5' : 'mcq');

export const getIgcseCourseNodeId = (kind: PracticeKind) => `igcse-course-${kind}`;

export const getCourseNodeId = (set: PracticeSetMeta) =>
  `${set.system}-course-${inferPracticeKind(set)}`;

export const getChapterNodeId = (set: PracticeSetMeta) =>
  `${set.system}-${inferPracticeKind(set)}-ch${set.chapter ?? 0}`;

export const getIgcseChapterNodeId = (set: PracticeSetMeta) => {
  const kind = inferPracticeKind(set);
  if (kind === 'paper5') return 'igcse-paper5-years';
  if (kind === 'evaluation') return 'igcse-evaluation-papers';
  return `igcse-${kind}-ch${set.chapter ?? 0}`;
};

export const getInitialExpandedNodes = (setId: string, sets: PracticeSetMeta[]) => {
  const set = sets.find((item) => item.id === setId);
  const nodes = new Set<string>();
  if (!set) return nodes;

  nodes.add(set.system);
  if (set.system === 'competition' && set.id !== 'fma-ap-physics1-kinematics-2026') {
    nodes.add('competition-course-fma');
    nodes.add(`competition-fma-${set.id}`);
  }
  if (set.system === 'competition' && set.id === 'fma-ap-physics1-kinematics-2026') {
    nodes.add('competition-fma-ap1-kinematics');
    nodes.add('competition-fma-ap1-kinematics-mcq');
  }
  if (set.system === 'igcse') {
    nodes.add(getIgcseCourseNodeId(inferPracticeKind(set)));
    nodes.add(getIgcseChapterNodeId(set));
  } else {
    nodes.add(getCourseNodeId(set));
    nodes.add(getChapterNodeId(set));
  }

  return nodes;
};

export const buildPracticeTree = (
  language: 'en' | 'zh',
  labels: PracticeTreeLabels,
  practiceSets: PracticeSetMeta[],
): PracticeTreeSystem[] => {
  const systems: PracticeTreeSystem[] = [];

  [
    { id: 'ap-physics-1', label: labels.apPhysics1 },
    { id: 'ap-physics-2', label: labels.apPhysics2 },
    { id: 'bpho', label: labels.bpho },
    { id: 'a-level', label: labels.aLevel },
    { id: 'physics-bowl', label: labels.physicsBowl },
  ].forEach(({ id, label }) => {
    const sets = practiceSets.filter((set) => set.system === id);

    if (id === 'ap-physics-1' && sets.length) {
      const mcqSets = sets.filter((set) => inferPracticeKind(set) === 'mcq');
      const structuredSets = sets.filter((set) => inferPracticeKind(set) === 'structured');

      const makeCourse = (kind: PracticeKind, kindSets: PracticeSetMeta[]): PracticeTreeCourse => {
        const chapterMap = new Map<number, { title: string; sets: PracticeSetMeta[] }>();
        kindSets.forEach((set) => {
          const unit = set.chapter ?? 0;
          if (!chapterMap.has(unit)) {
            chapterMap.set(unit, { title: set.chapterTitle ?? `Unit ${unit}`, sets: [] });
          }
          chapterMap.get(unit)!.sets.push(set);
        });

        return {
          id: `${id}-course-${kind}`,
          label:
            kind === 'mcq'
              ? language === 'zh'
                ? '选择题'
                : 'Multiple Choice'
              : language === 'zh'
                ? '问答题'
                : 'Free Response',
          chapters: [...chapterMap.entries()]
            .sort(([a], [b]) => a - b)
            .map(([unit, entry]) => ({
              id: `${id}-${kind}-ch${unit}`,
              label: entry.title,
              sets: entry.sets,
            })),
        };
      };

      systems.push({
        id,
        label,
        courses: [
          ...(mcqSets.length ? [makeCourse('mcq', mcqSets)] : []),
          ...(structuredSets.length ? [makeCourse('structured', structuredSets)] : []),
        ],
      });
      return;
    }

    systems.push({
      id,
      label,
      courses: sets.length
        ? [
            {
              id: `${id}-all`,
              label: '',
              chapters: [{ id: `${id}-all`, label: '', sets }],
            },
          ]
        : [],
    });
  });

  const apMechSets = practiceSets.filter((set) => set.system === 'ap-c-mech');
  if (apMechSets.length) {
    const courseCopy: Record<'mcq' | 'structured', { label: string; description: string }> = {
      mcq: {
        label: language === 'zh' ? '选择题 MCQ' : 'Multiple Choice',
        description:
          language === 'zh'
            ? '按 AP Physics C 单元整理的选择题题库。'
            : 'Multiple-choice banks organized by AP Physics C unit.',
      },
      structured: {
        label: language === 'zh' ? '问答题 FRQ' : 'Free Response',
        description:
          language === 'zh'
            ? '基础诊断、实验设计与综合问答题。'
            : 'Foundation diagnostics, lab design, and comprehensive FRQs.',
      },
    };

    const courses = (['mcq', 'structured'] as const)
      .map((kind): PracticeTreeCourse => {
        const kindSets = apMechSets.filter((set) => inferPracticeKind(set) === kind);
        const chapterMap = new Map<number, { title: string; sets: PracticeSetMeta[] }>();

        kindSets.forEach((set) => {
          const unit = set.chapter ?? 0;
          if (!chapterMap.has(unit)) {
            chapterMap.set(unit, { title: set.chapterTitle ?? `Unit ${unit}`, sets: [] });
          }
          chapterMap.get(unit)!.sets.push(set);
        });

        return {
          id: `ap-c-mech-course-${kind}`,
          label: courseCopy[kind].label,
          description: courseCopy[kind].description,
          chapters: [...chapterMap.entries()]
            .sort(([a], [b]) => a - b)
            .map(([unit, entry]) => ({
              id: `ap-c-mech-${kind}-ch${unit}`,
              label: entry.title,
              sets: entry.sets,
            })),
        };
      })
      .filter((course) => course.chapters.some((chapter) => chapter.sets.length > 0));

    systems.push({ id: 'ap-c-mech', label: labels.apCMech, courses });
  }

  const apEmSets = practiceSets.filter((set) => set.system === 'ap-c-em');
  if (apEmSets.length) {
    systems.push({
      id: 'ap-c-em',
      label: labels.apCEm,
      courses: [
        {
          id: 'ap-c-em-all',
          label: '',
          chapters: [{ id: 'ap-c-em-all', label: '', sets: apEmSets }],
        },
      ],
    });
  }

  const competitionSets = practiceSets.filter((set) => set.system === 'competition');
  if (competitionSets.length) {
    const ap1KinematicsSets = competitionSets.filter(
      (set) => set.id === 'fma-ap-physics1-kinematics-2026',
    );
    const fmaChapterSets = competitionSets.filter(
      (set) => set.id !== 'fma-ap-physics1-kinematics-2026',
    );
    const competitionCourses: PracticeTreeCourse[] = [];

    if (fmaChapterSets.length) {
      competitionCourses.push({
        id: 'competition-course-fma',
        label: 'FMA Competition',
        description: 'F=ma questions organized by problem model.',
        chapters: fmaChapterSets
          .sort((a, b) => (a.chapter ?? 0) - (b.chapter ?? 0))
          .map((set) => ({
            id: `competition-fma-${set.id}`,
            label: set.chapterTitle ?? set.label,
            sets: [set],
          })),
      });
    }

    if (ap1KinematicsSets.length) {
      competitionCourses.push({
        id: 'competition-fma-ap1-kinematics',
        label: 'FMA AP Physics 1: Kinematics',
        description: 'AP Physics 1 Unit One Kinematics.',
        chapters: [
          {
            id: 'competition-fma-ap1-kinematics-mcq',
            label: 'Multiple Choice',
            sets: ap1KinematicsSets,
          },
        ],
      });
    }

    systems.push({
      id: 'competition',
      label: labels.competition,
      courses: competitionCourses,
    });
  }

  const igcseSets = practiceSets.filter((set) => set.system === 'igcse');
  if (igcseSets.length) {
    const questionTypeCopy: Record<PracticeKind, { label: string; description: string }> = {
      mcq: {
        label: language === 'zh' ? '选择题 MCQ' : 'Multiple Choice',
        description:
          language === 'zh'
            ? '按章节练习选择题。'
            : 'Topic-based multiple-choice practice.',
      },
      structured: {
        label: language === 'zh' ? '问答题 Structured Questions' : 'Structured Questions',
        description:
          language === 'zh'
            ? '按章节练习大题、计算题和解释题。'
            : 'Long-answer, calculation, and explanation questions by topic.',
      },
      paper5: {
        label: language === 'zh' ? '实验题 Paper 5' : 'Paper 5 Practical',
        description:
          language === 'zh'
            ? '按年份练习实验操作、图像分析和实验设计。'
            : 'Practical skills, graph analysis, and experimental design by year.',
      },
      evaluation: {
        label: language === 'zh' ? '综合评估 Evaluation' : 'Evaluation',
        description:
          language === 'zh'
            ? '完整诊断卷：选择题 + 大题综合检测，附详细评分标准。'
            : 'Full diagnostic papers: MCQ + structured questions with detailed mark schemes.',
      },
    };

    const buildTopicChapters = (
      sets: PracticeSetMeta[],
      kind: PracticeKind,
    ): PracticeTreeChapter[] => {
      const chapterMap = new Map<number, { title: string; sets: PracticeSetMeta[] }>();

      sets.forEach((set) => {
        const chapter = set.chapter ?? 0;
        if (!chapterMap.has(chapter)) {
          chapterMap.set(chapter, {
            title: set.chapterTitle ?? `Chapter ${chapter}`,
            sets: [],
          });
        }
        chapterMap.get(chapter)!.sets.push(set);
      });

      return Array.from(chapterMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([number, entry]) => ({
          id: `igcse-${kind}-ch${number}`,
          label:
            language === 'zh'
              ? `第 ${number} 章 · ${entry.title}`
              : `Chapter ${number} · ${entry.title}`,
          sets: entry.sets,
        }));
    };

    const courses = (['mcq', 'structured', 'paper5', 'evaluation'] as const)
      .map((kind): PracticeTreeCourse => {
        const kindSets = igcseSets.filter((set) => inferPracticeKind(set) === kind);

        return {
          id: getIgcseCourseNodeId(kind),
          label: questionTypeCopy[kind].label,
          description: questionTypeCopy[kind].description,
          chapters:
            kind === 'paper5'
              ? [
                  {
                    id: 'igcse-paper5-years',
                    label: language === 'zh' ? '按年份选择 Paper 5 实验题' : 'Past Papers by Year',
                    sets: kindSets,
                  },
                ]
              : kind === 'evaluation'
                ? [
                    {
                      id: 'igcse-evaluation-papers',
                      label: language === 'zh' ? '诊断评估卷' : 'Diagnostic Papers',
                      sets: kindSets,
                    },
                  ]
                : buildTopicChapters(kindSets, kind),
        };
      })
      .filter((course) => course.chapters.some((chapter) => chapter.sets.length > 0));

    systems.push({ id: 'igcse', label: labels.igcse, courses });
  }

  return systems;
};
