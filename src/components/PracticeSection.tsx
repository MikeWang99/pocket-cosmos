import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import katex from 'katex';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  CloudOff,
  Download,
  FileText,
  Link2,
  Lock,
  Mic,
  RotateCcw,
  Sparkles,
  Square,
  Target,
} from 'lucide-react';
import { practiceSets, type PracticeSet } from '../data/practiceSets';
import type { EvaluationResult, PracticeStep } from '../types/practice';
import { evaluateLocally } from '../utils/rubricScoring';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { usePracticeProgress, type SavedPracticeAttempt } from '../hooks/usePracticeProgress';
import { usePracticePermissions } from '../hooks/usePracticePermissions';
import { StudentWorkUpload } from './StudentWorkUpload';
import { QuestionPrompt } from './QuestionPrompt';

type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface SpeechRecognitionEventResult {
  transcript: string;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<SpeechRecognitionEventResult>>;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const superscripts: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
  n: 'ⁿ',
};

const subscripts: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
};

const translateRun = (value: string, map: Record<string, string>) =>
  value
    .split('')
    .map((character) => map[character] ?? character)
    .join('');

const prettifyMath = (value: string) =>
  value
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/->/g, '→')
    .replace(/\bDelta\b/g, 'Δ')
    .replace(/\blambda0\b/g, 'λ₀')
    .replace(/\blambda\b/g, 'λ')
    .replace(/\btheta\b/g, 'θ')
    .replace(/\bomega\b/g, 'ω')
    .replace(/\balpha\b/g, 'α')
    .replace(/\bmu\b/g, 'μ')
    .replace(/\bintegral\b/g, '∫')
    .replace(/sqrt\(k\/m\)/g, '√(k/m)')
    .replace(/\bF_net\b/g, 'Fₙₑₜ')
    .replace(/\bFmax\b/g, 'Fₘₐₓ')
    .replace(/\bx_cm\b/g, 'x₍cm₎')
    .replace(/\bv_f\b/g, 'v₍f₎')
    .replace(/\bv0\b/g, 'v₀')
    .replace(/\bv1\b/g, 'v₁')
    .replace(/\bx0\b/g, 'x₀')
    .replace(/\bx1\b/g, 'x₁')
    .replace(/\ba0\b/g, 'a₀')
    .replace(/\bF0\b/g, 'F₀')
    .replace(/\^([0-9()+\-=n]+)/g, (_, run: string) => translateRun(run, superscripts))
    .replace(/_([0-9]+)/g, (_, run: string) => translateRun(run, subscripts));

const RichText: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
  <span className={className}>{prettifyMath(children)}</span>
);

const renderMath = (value: string) =>
  katex.renderToString(value, {
    throwOnError: false,
    strict: false,
  });

const MathText: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const parts = children.split(/(\$[^$]+\$|\\\([^)]+\\\))/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isDollarMath = part.startsWith('$') && part.endsWith('$');
        const isParenMath = part.startsWith('\\(') && part.endsWith('\\)');

        if (!isDollarMath && !isParenMath) {
          return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
        }

        const expression = isDollarMath ? part.slice(1, -1) : part.slice(2, -2);
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression) }}
          />
        );
      })}
    </span>
  );
};

const isMultipleChoiceStep = (step: PracticeStep) =>
  step.mode === 'multiple_choice' && Boolean(step.choices?.length && step.correctAnswer);

type PracticeKind = NonNullable<PracticeSet['practiceKind']>;

type PracticeTreeChapter = {
  id: string;
  label: string;
  sets: PracticeSet[];
};

type PracticeTreeCourse = {
  id: string;
  label: string;
  description?: string;
  chapters: PracticeTreeChapter[];
};

const inferPracticeKind = (set: PracticeSet): PracticeKind =>
  set.practiceKind ??
  (set.id.includes('-frq-') ? 'structured' : set.id.includes('paper5') ? 'paper5' : 'mcq');

const getIgcseCourseNodeId = (kind: PracticeKind) => `igcse-course-${kind}`;

const getCourseNodeId = (set: PracticeSet) => `${set.system}-course-${inferPracticeKind(set)}`;

const getChapterNodeId = (set: PracticeSet) =>
  `${set.system}-${inferPracticeKind(set)}-ch${set.chapter ?? 0}`;

const getIgcseChapterNodeId = (set: PracticeSet) => {
  const kind = inferPracticeKind(set);
  if (kind === 'paper5') return 'igcse-paper5-years';
  if (kind === 'evaluation') return 'igcse-evaluation-papers';
  return `igcse-${kind}-ch${set.chapter ?? 0}`;
};

const getInitialExpandedNodes = (setId: string) => {
  const set = practiceSets.find((item) => item.id === setId);
  const nodes = new Set<string>();
  if (!set) return nodes;

  nodes.add(set.system);
  if (set.system === 'igcse') {
    nodes.add(getIgcseCourseNodeId(inferPracticeKind(set)));
    nodes.add(getIgcseChapterNodeId(set));
  } else {
    nodes.add(getCourseNodeId(set));
    nodes.add(getChapterNodeId(set));
  }

  return nodes;
};

const readPracticeSelectionFromUrl = () => {
  if (typeof window === 'undefined') {
    return { setId: 'kinematics-multiple-choice', questionId: null as string | null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    setId: params.get('set') || 'kinematics-multiple-choice',
    questionId: params.get('q') || params.get('question'),
  };
};

const getSafePracticeSelection = (setId: string, questionId: string | null) => {
  const set = practiceSets.find((item) => item.id === setId) ?? practiceSets[0];
  const index = questionId ? set.steps.findIndex((step) => step.id === questionId) : 0;
  return {
    setId: set.id,
    index: index >= 0 ? index : 0,
  };
};

const updatePracticeUrl = (setId: string, questionId: string, mode: 'push' | 'replace' = 'push') => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.pathname = '/';
  url.hash = '';
  url.searchParams.set('tab', 'practice');
  url.searchParams.set('set', setId);
  url.searchParams.set('q', questionId);
  const nextUrl = `${url.pathname}${url.search}`;
  if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history[mode === 'replace' ? 'replaceState' : 'pushState']({}, '', nextUrl);
  }
};

const buildPracticeShareUrl = (setId: string, questionId: string) => {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin);
  url.searchParams.set('tab', 'practice');
  url.searchParams.set('set', setId);
  url.searchParams.set('q', questionId);
  return url.toString();
};

const copyTextToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back below when the browser exposes Clipboard API but denies permission.
    }
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const QuestionMedia: React.FC<{ step: PracticeStep; label: string; questionLabel: string }> = ({
  step,
  label,
  questionLabel,
}) => {
  if (!step.image) return null;
  const isQuestionImage = step.image.role === 'question';

  return (
    <figure className={`practice-media ${isQuestionImage ? 'practice-media--question' : ''}`}>
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
        {isQuestionImage ? questionLabel : label}
      </div>
      <div className={isQuestionImage ? 'practice-question-image-scroll' : undefined}>
        <img
          src={step.image.src}
          alt={step.image.alt}
          className={`practice-media-image ${isQuestionImage ? 'practice-question-image' : ''} ${step.image.responsive ? 'practice-question-image--responsive' : ''}`}
        />
      </div>
      {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
    </figure>
  );
};

const QuestionAssetDownloads: React.FC<{ step: PracticeStep; language: 'en' | 'zh' }> = ({
  step,
  language,
}) => {
  if (!step.assets?.length) return null;

  return (
    <details className="mt-1">
      <summary className="inline-flex min-h-9 w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-surface-tint px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-nebula/40 hover:text-nebula">
        <Download className="h-3.5 w-3.5" />
        {language === 'zh' ? `下载题目素材 (${step.assets.length})` : `Download assets (${step.assets.length})`}
      </summary>
      <div className="mt-2 grid gap-2 rounded-lg border border-line bg-surface-muted p-3 sm:grid-cols-2 xl:grid-cols-3">
        {step.assets.map((asset) => (
          <a
            key={asset.id}
            href={asset.src}
            download={asset.downloadName}
            className="flex min-h-10 items-center gap-2 rounded-md border border-line bg-surface-muted px-3 py-2 text-xs text-ink-soft transition-colors hover:border-nebula/45 hover:text-nebula"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 truncate">{asset.downloadName}</span>
            <span className="ml-auto shrink-0 text-[9px] uppercase tracking-wider text-slate-600">{asset.kind}</span>
          </a>
        ))}
      </div>
    </details>
  );
};

export const PracticeSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { authEnabled, configured, user } = useAuth();
  const { hasAccess } = usePracticePermissions();
  const initialSelection = useMemo(() => getSafePracticeSelection(
    readPracticeSelectionFromUrl().setId,
    readPracticeSelectionFromUrl().questionId,
  ), []);
  const [activeSetId, setActiveSetId] = useState(initialSelection.setId);
  const [activeIndex, setActiveIndex] = useState(initialSelection.index);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerImages, setAnswerImages] = useState<Record<string, string>>({});
  // True while the answer image is still compressing/uploading, so the submit
  // button can explain why it stays disabled instead of looking broken.
  const [workUploadBusy, setWorkUploadBusy] = useState(false);
  const [results, setResults] = useState<Record<string, EvaluationResult>>({});
  const [isListening, setIsListening] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { resetSavedAttempts, savedAttempts, saveAttempt, syncError, syncState } = usePracticeProgress(activeSetId);

  const activeSet = practiceSets.find((set) => set.id === activeSetId) ?? practiceSets[0];
  const practiceSetMeta = activeSet;
  const getSetCopy = (setId: string) => {
    if (setId === 'calculus-for-physics') return t.practice.sets.calculusForPhysics;
    if (setId === 'frq-2025-mechanics') return t.practice.sets.frq2025;
    if (setId === 'dynamics-multiple-choice') return t.practice.sets.dynamicsMultipleChoice;
    if (setId === 'work-energy-multiple-choice') return t.practice.sets.workEnergyMultipleChoice;
    if (setId === 'linear-momentum-lab-design') return t.practice.sets.linearMomentumLabDesign;
    if (setId === 'physics-bowl-em-question-bank') return t.practice.sets.physicsBowlEmQuestionBank;
    if (setId === 'igcse-cie-ch1-classroom') return t.practice.sets.igcseCieChapter1Classroom;
    if (setId === 'igcse-cie-ch1-homework') return t.practice.sets.igcseCieChapter1Homework;
    if (setId === 'igcse-cie-ch1-topic-1-1') return t.practice.sets.igcseTopic11;
    if (setId === 'igcse-cie-ch1-topic-1-2') return t.practice.sets.igcseTopic12;
    if (setId === 'igcse-cie-ch1-topic-1-3') return t.practice.sets.igcseTopic13;
    if (setId === 'igcse-cie-ch1-topic-1-4') return t.practice.sets.igcseTopic14;
    if (setId === 'igcse-cie-ch1-topic-1-5') return t.practice.sets.igcseTopic15;
    if (setId === 'igcse-cie-ch1-topic-1-6') return t.practice.sets.igcseTopic16;
    if (setId === 'igcse-cie-ch1-topic-1-7') return t.practice.sets.igcseTopic17;
    if (setId === 'igcse-cie-ch1-topic-1-8') return t.practice.sets.igcseTopic18;
    // New IGCSE all-topic sets: use the set's own label/title
    const matchedSet = practiceSets.find((s) => s.id === setId);
    if (matchedSet) {
      return { label: matchedSet.label, title: matchedSet.title, eyebrow: matchedSet.eyebrow, subtitle: matchedSet.subtitle, description: matchedSet.description };
    }
    return t.practice.sets.kinematicsMultipleChoice;
  };
  const setCopy = getSetCopy(activeSet.id);
  const isIgcseSet = activeSet.category === 'igcse';
  const activePracticeKind = inferPracticeKind(activeSet);
  const supportsDifficultyFilter =
    activePracticeKind === 'mcq' &&
    activeSet.steps.some((step) => Number.isFinite(step.difficulty) || step.tags?.some((tag) => tag.startsWith('Difficulty ')));

  // Filter any indexed MCQ bank by its normalized 1–5 difficulty value.
  const practiceSteps = useMemo(() => {
    if (!supportsDifficultyFilter || difficultyFilter === 'all') return activeSet.steps;
    return activeSet.steps.filter((step) => {
      const diffTag = step.tags?.find((tag) => tag.startsWith('Difficulty '));
      const taggedLevel = diffTag
        ? parseInt(diffTag.replace('Difficulty ', ''), 10)
        : Number.NaN;
      const level = step.difficulty ?? taggedLevel;
      if (!Number.isFinite(level)) return true;
      if (difficultyFilter === 'easy') return level <= 2;
      if (difficultyFilter === 'medium') return level === 3;
      if (difficultyFilter === 'hard') return level >= 4;
      return true;
    });
  }, [activeSet.steps, supportsDifficultyFilter, difficultyFilter]);

  // Map "Difficulty N" tag to display label
  const formatTag = (tag: string): string => {
    if (tag.startsWith('Difficulty ')) {
      const level = parseInt(tag.replace('Difficulty ', ''), 10);
      if (language === 'zh') {
        if (level <= 2) return '基础';
        if (level === 3) return '中等';
        return '进阶';
      }
      if (level <= 2) return 'Easy';
      if (level === 3) return 'Medium';
      return 'Hard';
    }
    return tag;
  };

  const activeStep = practiceSteps[activeIndex] ?? practiceSteps[0];
  const isActiveMultipleChoice = activeStep ? isMultipleChoiceStep(activeStep) : false;
  const hasCompleteQuestionImage = activeStep?.image?.role === 'question';
  const shouldShowPrompt =
    activeStep &&
    !hasCompleteQuestionImage &&
    !activeStep.prompt.startsWith('Select the correct option');
  const currentAnswer = activeStep ? (answers[activeStep.id] ?? '') : '';
  const currentAnswerImage = activeStep ? (answerImages[activeStep.id] ?? null) : null;
  const currentResult = activeStep ? results[activeStep.id] : undefined;
  const completedCount = Object.keys(results).length;
  const resultList: EvaluationResult[] = Object.keys(results).map((key) => results[key]);

  const totalScore = useMemo(
    () => resultList.reduce((sum, result) => sum + result.score, 0),
    [resultList],
  );

  const totalPossible = useMemo(
    () => resultList.reduce((sum, result) => sum + result.maxScore, 0),
    [resultList],
  );

  const weakSpots = useMemo(() => {
    const missed = resultList.flatMap((result) => result.misses.map((item) => item.label));
    return missed.slice(0, 5);
  }, [resultList]);

  const speechSupported = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Hierarchical tree: system -> question type -> chapter/year -> sets
  const practiceTree = useMemo(() => {
    const systems: Array<{
      id: string;
      label: string;
      courses: PracticeTreeCourse[];
    }> = [];

    // AP Physics C: Mechanics
    const apMechSets = practiceSets.filter((s) => s.system === 'ap-c-mech');
    if (apMechSets.length) {
      const courseCopy: Record<'mcq' | 'structured', { label: string; description: string }> = {
        mcq: {
          label: language === 'zh' ? '选择题 MCQ' : 'Multiple Choice',
          description: language === 'zh' ? '按 AP Physics C 单元整理的选择题题库。' : 'Multiple-choice banks organized by AP Physics C unit.',
        },
        structured: {
          label: language === 'zh' ? '问答题 FRQ' : 'Free Response',
          description: language === 'zh' ? '基础诊断、实验设计与综合问答题。' : 'Foundation diagnostics, lab design, and comprehensive FRQs.',
        },
      };
      const courses = (['mcq', 'structured'] as const).map((kind): PracticeTreeCourse => {
        const kindSets = apMechSets.filter((set) => inferPracticeKind(set) === kind);
        const chapterMap = new Map<number, { title: string; sets: PracticeSet[] }>();
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
              label: unit === 0
                ? entry.title
                : unit === 99
                  ? entry.title
                  : language === 'zh'
                    ? `Unit ${unit} · ${entry.title}`
                    : `Unit ${unit} · ${entry.title}`,
              sets: entry.sets,
            })),
        };
      }).filter((course) => course.chapters.some((chapter) => chapter.sets.length > 0));

      systems.push({
        id: 'ap-c-mech',
        label: t.practice.tree.apCMech,
        courses,
      });
    }

    // AP Physics C: E&M
    const apEmSets = practiceSets.filter((s) => s.system === 'ap-c-em');
    if (apEmSets.length) {
      systems.push({
        id: 'ap-c-em',
        label: t.practice.tree.apCEm,
        courses: [{ id: 'ap-c-em-all', label: '', chapters: [{ id: 'ap-c-em-all', label: '', sets: apEmSets }] }],
      });
    }

    // F=ma competition archive, organized into topic chapters.
    const competitionSets = practiceSets.filter((s) => s.system === 'competition');
    if (competitionSets.length) {
      const chapterMap = new Map<number, { title: string; sets: PracticeSet[] }>();
      competitionSets.forEach((set) => {
        const chapter = set.chapter ?? 0;
        if (!chapterMap.has(chapter)) chapterMap.set(chapter, { title: set.chapterTitle ?? `Topic ${chapter}`, sets: [] });
        chapterMap.get(chapter)!.sets.push(set);
      });
      systems.push({
        id: 'competition',
        label: t.practice.tree.competition,
        courses: [{
          id: 'competition-course-mcq',
          label: language === 'zh' ? '选择题 MCQ' : 'Multiple Choice',
          description: language === 'zh' ? '按知识点整理的 FMA 竞赛题。' : 'F=ma questions organized by knowledge point.',
          chapters: [...chapterMap.entries()].sort(([a], [b]) => a - b).map(([chapter, entry]) => ({
            id: `competition-mcq-ch${chapter}`,
            label: entry.title,
            sets: entry.sets,
          })),
        }],
      });
    }

    // CIE IGCSE Physics
    const igcseSets = practiceSets.filter((s) => s.system === 'igcse');
    if (igcseSets.length) {
      const questionTypeCopy: Record<PracticeKind, { label: string; description: string }> = {
        mcq: {
          label: language === 'zh' ? '选择题 MCQ' : 'Multiple Choice',
          description: language === 'zh' ? '按章节练习选择题。' : 'Topic-based multiple-choice practice.',
        },
        structured: {
          label: language === 'zh' ? '问答题 Structured Questions' : 'Structured Questions',
          description: language === 'zh' ? '按章节练习大题、计算题和解释题。' : 'Long-answer, calculation, and explanation questions by topic.',
        },
        paper5: {
          label: language === 'zh' ? '实验题 Paper 5' : 'Paper 5 Practical',
          description: language === 'zh' ? '按年份练习实验操作、图像分析和实验设计。' : 'Practical skills, graph analysis, and experimental design by year.',
        },
        evaluation: {
          label: language === 'zh' ? '综合评估 Evaluation' : 'Evaluation',
          description: language === 'zh' ? '完整诊断卷：选择题 + 大题综合检测，附详细评分标准。' : 'Full diagnostic papers: MCQ + structured questions with detailed mark schemes.',
        },
      };

      const buildTopicChapters = (sets: PracticeSet[], kind: PracticeKind): PracticeTreeChapter[] => {
        const chapterMap = new Map<number, { title: string; sets: PracticeSet[] }>();
        sets.forEach((set) => {
          const ch = set.chapter ?? 0;
          if (!chapterMap.has(ch)) chapterMap.set(ch, { title: set.chapterTitle ?? `Chapter ${ch}`, sets: [] });
          chapterMap.get(ch)!.sets.push(set);
        });

        return Array.from(chapterMap.entries())
          .sort(([a], [b]) => a - b)
          .map(([num, { title, sets: chapterSets }]) => ({
            id: `igcse-${kind}-ch${num}`,
            label: language === 'zh' ? `第 ${num} 章 · ${title}` : `Chapter ${num} · ${title}`,
            sets: chapterSets,
          }));
      };

      const buildPaper5Chapter = (sets: PracticeSet[]): PracticeTreeChapter[] => [
        {
          id: 'igcse-paper5-years',
          label: language === 'zh' ? '按年份选择 Paper 5 实验题' : 'Past Papers by Year',
          sets,
        },
      ];

      const buildEvaluationChapter = (sets: PracticeSet[]): PracticeTreeChapter[] => [
        {
          id: 'igcse-evaluation-papers',
          label: language === 'zh' ? '诊断评估卷' : 'Diagnostic Papers',
          sets,
        },
      ];

      const courses = (['mcq', 'structured', 'paper5', 'evaluation'] as const)
        .map((kind): PracticeTreeCourse => {
          const kindSets = igcseSets.filter((set) => inferPracticeKind(set) === kind);
          return {
            id: getIgcseCourseNodeId(kind),
            label: questionTypeCopy[kind].label,
            description: questionTypeCopy[kind].description,
            chapters: kind === 'paper5'
              ? buildPaper5Chapter(kindSets)
              : kind === 'evaluation'
                ? buildEvaluationChapter(kindSets)
                : buildTopicChapters(kindSets, kind),
          };
        })
        .filter((course) => course.chapters.some((chapter) => chapter.sets.length > 0));

      systems.push({
        id: 'igcse',
        label: t.practice.tree.igcse,
        courses,
      });
    }

    return systems;
  }, [language, t]);

  // The tree starts open around the active shared link, but otherwise stays compact.
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => getInitialExpandedNodes(initialSelection.setId));
  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const next = readPracticeSelectionFromUrl();
      const safe = getSafePracticeSelection(next.setId, next.questionId);
      setActiveSetId(safe.setId);
      setActiveIndex(safe.index);
      setShareCopied(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeStep) return;
    updatePracticeUrl(activeSet.id, activeStep.id, 'replace');
  }, [activeSet.id, activeStep?.id]);

  // #10: Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        e.preventDefault();
        goToStep(activeIndex - 1);
      } else if (e.key === 'ArrowRight' && activeIndex < practiceSteps.length - 1) {
        e.preventDefault();
        goToStep(activeIndex + 1);
      } else if (e.key === 'Enter' && isActiveMultipleChoice && currentAnswer && !currentResult) {
        e.preventDefault();
        submitAnswer();
      } else if (isActiveMultipleChoice && !currentResult && /^[a-eA-E]$/.test(e.key)) {
        // Toggle option A-E
        const label = e.key.toUpperCase();
        const choices = activeStep.choices ?? [];
        if (!choices.some((c) => c.label === label)) return;
        e.preventDefault();
        setAnswers((prev) => {
          const current = (prev[activeStep.id] ?? '').split(',').filter(Boolean);
          const next = current.includes(label)
            ? current.filter((l) => l !== label)
            : [...current, label];
          return { ...prev, [activeStep.id]: next.join(',') };
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, practiceSteps.length, isActiveMultipleChoice, currentAnswer, currentResult, activeStep]);

  useEffect(() => {
    const attempts = Object.values(savedAttempts) as SavedPracticeAttempt[];
    if (!attempts.length) return;

    setAnswers((previous) => {
      let changed = false;
      const next = { ...previous };

      attempts.forEach((attempt) => {
        if (!next[attempt.questionId] && attempt.answer) {
          next[attempt.questionId] = attempt.answer;
          changed = true;
        }
      });

      return changed ? next : previous;
    });

    setResults((previous) => {
      let changed = false;
      const next = { ...previous };

      attempts.forEach((attempt) => {
        if (!next[attempt.questionId]) {
          next[attempt.questionId] = attempt.result;
          changed = true;
        }
      });

      return changed ? next : previous;
    });
  }, [savedAttempts]);

  const updateAnswer = (value: string) => {
    setAnswers((previous) => ({ ...previous, [activeStep.id]: value }));
  };

  const recordResult = (result: EvaluationResult, answer: string, answerImageUrl?: string | null) => {
    setResults((previous) => ({ ...previous, [activeStep.id]: result }));

    void saveAttempt({
      practiceSetId: activeSet.id,
      practiceSetTitle: setCopy.title,
      questionId: activeStep.id,
      questionTitle: activeStep.title,
      answer,
      answerImageUrl: answerImageUrl ?? undefined,
      score: result.score,
      maxScore: result.maxScore,
      isCorrect: result.maxScore > 0 && result.score >= result.maxScore,
      tags: activeStep.tags ?? [],
      result,
    });
  };

  const submitAnswer = () => {
    if (isMultipleChoiceStep(activeStep)) {
      if (!currentAnswer) return;

      // Multi-select: compare sorted sets
      const selectedSet = currentAnswer.split(',').filter(Boolean).sort();
      const correctSet = (activeStep.correctAnswer ?? '').split(',').filter(Boolean).sort();
      const isCorrect = selectedSet.join(',') === correctSet.join(',');

      const hit = {
        id: `${activeStep.id}-correct`,
        label: `${t.practice.correctAnswer}: ${correctSet.join(', ')}`,
        point: 'Selected the correct option(s).',
        keywords: [],
        feedback: activeStep.solution ?? '',
      };
      const miss = {
        id: `${activeStep.id}-miss`,
        label: `${t.practice.yourAnswer}: ${selectedSet.join(', ')}. ${t.practice.correctAnswer}: ${correctSet.join(', ')}`,
        point: 'Review the solution and try the next item.',
        keywords: [],
        feedback: activeStep.solution ?? '',
      };

      const result = {
        score: isCorrect ? 1 : 0,
        maxScore: 1,
        hits: isCorrect ? [hit] : [],
        misses: isCorrect ? [] : [miss],
        suggestions: isCorrect ? [] : [activeStep.solution || activeStep.answerNudge],
      };

      recordResult(result, currentAnswer);
      return;
    }

    const result = evaluateLocally(activeStep, currentAnswer);
    recordResult(result, currentAnswer);
  };

  const submitFreeResponse = () => {
    if (!currentAnswerImage) return;
    // Free-response work is never auto-graded. A zero-point result represents
    // a submitted response awaiting teacher review, not an incorrect answer.
    const result: EvaluationResult = {
      score: 0,
      maxScore: 0,
      hits: [],
      misses: [],
      suggestions: [],
    };
    recordResult(result, '', currentAnswerImage);
  };

  const goToStep = (index: number) => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setShareCopied(false);
    setWorkUploadBusy(false);
    const nextIndex = Math.min(Math.max(index, 0), practiceSteps.length - 1);
    setActiveIndex(nextIndex);
    updatePracticeUrl(activeSet.id, practiceSteps[nextIndex].id);
  };

  const selectPracticeSet = (setId: string) => {
    if (setId === activeSetId) return;
    recognitionRef.current?.stop();
    setIsListening(false);
    setShareCopied(false);
    setDifficultyFilter('all');
    const nextSet = practiceSets.find((set) => set.id === setId) ?? practiceSets[0];
    setActiveSetId(setId);
    setAnswers({});
    setResults({});
    setActiveIndex(0);
    updatePracticeUrl(nextSet.id, nextSet.steps[0]?.id ?? '');
    // Auto-expand tree to show selected set
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      next.add(nextSet.system);
      if (nextSet.system === 'igcse') {
        next.add(getIgcseCourseNodeId(inferPracticeKind(nextSet)));
        next.add(getIgcseChapterNodeId(nextSet));
      } else {
        next.add(getCourseNodeId(nextSet));
        next.add(getChapterNodeId(nextSet));
      }
      return next;
    });
  };

  const resetPractice = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setAnswers({});
    setResults({});
    setActiveIndex(0);
    setShareCopied(false);
    setDifficultyFilter('all');
    updatePracticeUrl(activeSet.id, practiceSteps[0].id, 'replace');
    resetSavedAttempts();
  };

  const changeDifficultyFilter = (filter: 'all' | 'easy' | 'medium' | 'hard') => {
    setDifficultyFilter(filter);
    setActiveIndex(0);
  };

  const copyCurrentQuestionLink = async () => {
    const shareUrl = buildPracticeShareUrl(activeSet.id, activeStep.id);
    if (!shareUrl) return;

    await copyTextToClipboard(shareUrl);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1800);
  };

  const toggleSpeech = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ');
      updateAnswer(`${currentAnswer} ${transcript}`.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl"
    >
      <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-nebula sm:mb-4">
            <ClipboardCheck className="w-4 h-4" />
            {setCopy.eyebrow}
          </div>
          <h1 className="text-balance font-serif text-3xl font-light leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            {setCopy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft sm:mt-4 sm:text-base">
            {setCopy.description}
          </p>
          {authEnabled && (
            <div
                className={`mt-4 inline-flex max-w-full items-start gap-2 rounded-lg border px-3 py-2 text-xs font-semibold sm:items-center sm:rounded-full sm:px-4 ${
                syncState === 'error'
                  ? 'border-rose-500/25 bg-rose-500/10 text-rose-700'
                  : user
                    ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700'
                    : 'border-line bg-surface-tint text-slate-500'
              }`}
              title={syncError ?? undefined}
            >
              {syncState === 'error' || !configured ? <CloudOff className="h-4 w-4 shrink-0" /> : <Cloud className="h-4 w-4 shrink-0" />}
              <span className="min-w-0 leading-5">
                {!configured
                  ? t.practice.progressPreviewConfig
                  : syncState === 'loading'
                    ? t.practice.progressRestoring
                    : syncState === 'syncing'
                      ? t.practice.progressSyncing
                      : syncState === 'error'
                        ? t.practice.progressError
                        : user
                          ? t.practice.progressSaved
                          : t.practice.progressLoginPrompt}
              </span>
            </div>
          )}
          {/* #4: Tree navigation */}
          <div className="mt-5 space-y-1">
            {practiceTree.map((system) => {
              const sysExpanded = expandedNodes.has(system.id);
              return (
                <div key={system.id}>
                  {/* System header */}
                  <button
                    onClick={() => toggleNode(system.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs font-bold uppercase tracking-wider text-ink-soft transition-colors hover:bg-surface-tint-strong"
                  >
                    <span className={`inline-block h-3 w-3 text-[10px] leading-3 transition-transform ${sysExpanded ? 'rotate-90' : ''}`}>▶</span>
                    {system.label}
                    {!hasAccess(system.id) && <Lock className="ml-auto h-3 w-3 text-slate-500" />}
                  </button>
                  {/* Question types / chapters / sets */}
                  {sysExpanded && (
                    <div className="ml-3 border-l border-line pl-3 space-y-1">
                      {system.courses.map((course) => {
                        const hasCourseLabel = course.label !== '';
                        const courseExpanded = !hasCourseLabel || expandedNodes.has(course.id);
                        return (
                          <div key={course.id}>
                            {hasCourseLabel && (
                              <button
                                onClick={() => toggleNode(course.id)}
                                className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px] font-bold text-ink-soft transition-colors hover:bg-surface-tint-strong hover:text-ink"
                                title={course.description}
                              >
                                <span className={`inline-block h-2.5 w-2.5 text-[8px] leading-[10px] transition-transform ${courseExpanded ? 'rotate-90' : ''}`}>▶</span>
                                {course.label}
                              </button>
                            )}
                            {courseExpanded && (
                              <div className={hasCourseLabel ? 'ml-3 border-l border-line pl-3' : ''}>
                                {course.chapters.map((chapter) => {
                                  const hasChapterLabel = chapter.label !== '';
                                  const chExpanded = !hasChapterLabel || expandedNodes.has(chapter.id);
                                  return (
                                    <div key={chapter.id} className="space-y-1">
                                      {hasChapterLabel && (
                                        <button
                                          onClick={() => toggleNode(chapter.id)}
                                          className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px] font-semibold text-ink-soft transition-colors hover:bg-surface-tint-strong hover:text-ink"
                                        >
                                          <span className={`inline-block h-2.5 w-2.5 text-[8px] leading-[10px] transition-transform ${chExpanded ? 'rotate-90' : ''}`}>▶</span>
                                          {chapter.label}
                                        </button>
                                      )}
                                      {chExpanded && (
                                        <div className={`flex flex-wrap gap-1.5 ${hasChapterLabel ? 'ml-4' : ''} ${hasChapterLabel ? 'pb-2' : 'py-1'}`}>
                                          {chapter.sets.map((set) => {
                                            const isActive = set.id === activeSetId;
                                            return (
                                              <button
                                                key={set.id}
                                                onClick={() => selectPracticeSet(set.id)}
                                                className={`min-h-8 shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                                                  isActive
                                                    ? 'border-nebula/70 bg-nebula/15 text-ink'
                                                    : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                                                }`}
                                              >
                                                {getSetCopy(set.id).label}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {supportsDifficultyFilter && (
              <div className="mt-3">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {t.practice.difficultyFilter.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => changeDifficultyFilter(level)}
                      className={`min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        difficultyFilter === level
                          ? 'border-quantum/70 bg-quantum/15 text-ink'
                          : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {t.practice.difficultyFilter[level]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface-tint px-4 py-2 text-xs text-ink-soft">
            <span>{t.practice.progress} <strong className="text-ink">{completedCount}/{practiceSteps.length}</strong></span>
            {completedCount > 0 && (
              <span className="border-l border-line pl-2">{t.practice.score} <strong className="text-ink">{totalScore}/{totalPossible}</strong></span>
            )}
          </div>
          <button
            onClick={resetPractice}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-500 transition-colors hover:border-nebula/60 hover:text-nebula"
            title={t.practice.resetTitle}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Permission gate: show locked card if system not accessible */}
      {!hasAccess(activeSet.system) ? (
        <div className="glass-panel flex flex-col items-center justify-center gap-4 rounded-lg p-12 text-center">
          <Lock className="h-10 w-10 text-slate-500" />
          <p className="text-sm text-ink-soft max-w-md">{t.practice.lockedMessage}</p>
        </div>
      ) : (
      <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-lg p-3 lg:sticky lg:top-6">
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">{t.practice.questionPath}</div>
          <div className="grid auto-cols-[44px] grid-flow-col gap-2 overflow-x-auto pb-1 lg:max-h-[calc(100vh-9rem)] lg:grid-flow-row lg:grid-cols-5 lg:overflow-y-auto xl:grid-cols-6">
            {practiceSteps.map((step, index) => {
              const result = results[step.id];
              const isActive = index === activeIndex;
              const isAutoGraded = isMultipleChoiceStep(step);
              const isCorrect = isAutoGraded && result && result.score >= result.maxScore;
              return (
                <Fragment key={step.id}>
                  {/* #9: Group separator every 10 questions */}
                  {index > 0 && index % 10 === 0 && (
                    <div className="col-span-full h-px bg-surface-tint-strong my-1" />
                  )}
                  <button
                    onClick={() => goToStep(index)}
                    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-lg border text-sm font-semibold transition-colors ${
                      isActive
                        ? 'border-nebula/70 bg-nebula/12 text-nebula'
                        : result
                          ? isCorrect
                            ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 hover:border-emerald-500/55'
                            : isAutoGraded
                              ? 'border-rose-500/35 bg-rose-500/10 text-rose-700 hover:border-rose-500/55'
                              : 'border-sky-500/35 bg-sky-500/10 text-sky-700 hover:border-sky-500/55'
                          : 'border-line bg-surface-tint text-slate-500 hover:border-line-strong hover:text-nebula'
                    }`}
                    title={`${t.practice.questionPath} ${index + 1}`}
                  >
                    {index + 1}
                    {result && (
                      <span
                        className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${
                          isCorrect ? 'bg-emerald-500' : isAutoGraded ? 'bg-rose-500' : 'bg-sky-500'
                        }`}
                      />
                    )}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          {practiceSteps.length === 0 ? (
            <div className="glass-panel rounded-lg p-8 text-center">
              <p className="text-sm text-ink-soft">
                {language === 'zh'
                  ? '当前难度下没有题目，请尝试其他难度筛选。'
                  : 'No questions at this difficulty level. Try a different filter.'}
              </p>
            </div>
          ) : (
          <>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-lg overflow-hidden"
            >
              <div className="border-b border-line p-4 sm:p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-nebula mb-3">{activeStep.source}</div>
                    <h2 className="text-balance font-serif text-2xl text-ink md:text-3xl">{activeStep.title}</h2>
                    {activeSet.system !== 'competition' && !!activeStep.tags?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeStep.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-nebula/20 bg-nebula/5 px-2.5 py-1 text-[10px] font-semibold text-nebula"
                          >
                            <MathText>{formatTag(tag)}</MathText>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={copyCurrentQuestionLink}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-nebula/50 hover:text-nebula"
                    >
                      <Link2 className="h-4 w-4" />
                      {shareCopied ? t.practice.linkCopied : t.practice.shareQuestion}
                    </button>
                    <div className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft w-fit">
                      {activeIndex + 1} / {practiceSteps.length}
                    </div>
                  </div>
                </div>

                {/* Full question images contain the source stem; OCR is retained only for indexing. */}
                {shouldShowPrompt && (
                <div className="mt-6">
                  <div className="rounded-lg border border-line bg-surface-tint p-4 sm:p-5 md:p-6">
                    <div className="text-base leading-relaxed text-ink md:text-lg">
                      <QuestionPrompt prompt={activeStep.prompt} />
                    </div>
                  </div>
                </div>
                )}

                <div className="mt-4 grid gap-4">
                  <QuestionMedia
                    step={activeStep}
                    label={t.practice.diagram}
                    questionLabel={t.practice.questionImage}
                  />
                  <QuestionAssetDownloads step={activeStep} language={language} />
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {isActiveMultipleChoice ? (
                  <div>
                    <div className={activeStep.choiceLayout === 'grid' ? 'grid gap-3 md:grid-cols-2' : 'grid gap-2.5'} role="group" aria-label={t.practice.chooseAnswer}>
                      {activeStep.choices?.map((choice) => {
                        const selectedLabels = currentAnswer.split(',').filter(Boolean);
                        const correctLabels = (activeStep.correctAnswer ?? '').split(',').filter(Boolean);
                        const isSelected = selectedLabels.includes(choice.label);
                        const isCorrectChoice = Boolean(currentResult) && correctLabels.includes(choice.label);
                        const isWrongChoice = Boolean(currentResult) && isSelected && !correctLabels.includes(choice.label);

                        return (
                          <button
                            key={choice.label}
                            type="button"
                            data-choice={choice.label}
                            onClick={() => {
                              if (currentResult) return;
                              // Toggle: add or remove from selection
                              const next = isSelected
                                ? selectedLabels.filter((l) => l !== choice.label)
                                : [...selectedLabels, choice.label];
                              updateAnswer(next.sort().join(','));
                            }}
                            aria-pressed={isSelected}
                            className={`grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-lg border text-left transition-colors sm:grid-cols-[40px_minmax(0,1fr)] ${choice.image ? 'p-3 sm:p-4' : 'min-h-14 px-3 py-2.5 sm:px-4'} ${
                              isCorrectChoice
                                ? 'border-emerald-500/50 bg-emerald-500/10'
                                : isWrongChoice
                                  ? 'border-rose-500/50 bg-rose-500/10'
                                  : isSelected
                                    ? 'border-nebula/70 bg-nebula/10'
                                    : 'border-line bg-surface-tint hover:border-nebula/50'
                            }`}
                          >
                            <span className={`grid h-8 w-8 place-items-center rounded-md text-xs font-bold transition-colors ${
                              isSelected ? 'bg-nebula text-on-accent' : 'bg-slate-900 text-on-accent'
                            }`}>
                              {isSelected ? '✓' : choice.label}
                            </span>
                            <span className="min-w-0 self-center text-sm md:text-base text-ink leading-relaxed">
                              {choice.image ? (
                                <>
                                  <img
                                    src={choice.image.src}
                                    alt={choice.image.alt}
                                    className="practice-choice-image"
                                  />
                                  <span className="sr-only">{choice.text}</span>
                                </>
                              ) : (
                                <MathText>{choice.text}</MathText>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {currentResult && (
                      <div className="mt-5 rounded-lg border border-line bg-surface-muted p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs uppercase tracking-widest text-slate-500">
                            {currentResult.score === 1 ? t.practice.correct : t.practice.notQuite}
                          </div>
                          <div className="flex gap-2">
                            {/* #11: Retry button */}
                            {currentResult.score < 1 && (
                              <button
                                onClick={() => {
                                  setResults((prev) => { const n = {...prev}; delete n[activeStep.id]; return n; });
                                  setAnswers((prev) => { const n = {...prev}; delete n[activeStep.id]; return n; });
                                }}
                                className="rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-nebula hover:text-nebula"
                              >
                                {language === 'zh' ? '重试' : 'Retry'}
                              </button>
                            )}
                            {/* #2: Next button after answering */}
                            {activeIndex < practiceSteps.length - 1 && (
                              <button
                                onClick={() => goToStep(activeIndex + 1)}
                                className="rounded-full bg-nebula px-4 py-1.5 text-[11px] font-bold text-on-accent transition-colors hover:bg-nebula/80"
                              >
                                {language === 'zh' ? '下一题 →' : 'Next →'}
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                          <MathText>{activeStep.solution ?? ''}</MathText>
                        </p>
                        {activeStep.solutionImage && (
                          <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
                            <img
                              src={activeStep.solutionImage.src}
                              alt={activeStep.solutionImage.alt}
                              className="h-auto w-full"
                            />
                            {activeStep.solutionImage.caption && (
                              <p className="px-3 py-2 text-[11px] text-ink-soft">{activeStep.solutionImage.caption}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <StudentWorkUpload
                      practiceSetId={activeSet.id}
                      questionId={activeStep.id}
                      existingImageUrl={currentAnswerImage}
                      onUploadComplete={(imageUrl) => {
                        setAnswerImages((prev) => ({ ...prev, [activeStep.id]: imageUrl }));
                      }}
                      onClear={() => {
                        setAnswerImages((prev) => {
                          const next = { ...prev };
                          delete next[activeStep.id];
                          return next;
                        });
                      }}
                      onBusyChange={setWorkUploadBusy}
                      language={language}
                    />
                    {(activeStep.sampleAnswer || activeStep.solution) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeStep.sampleAnswer && (
                          <details className="group rounded-lg border border-line bg-surface-tint p-3">
                            <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-widest text-nebula">
                              {language === 'zh' ? '露出答案' : 'Reveal answer'}
                            </summary>
                            <p className="mt-3 text-sm leading-7 text-ink-soft">
                              <MathText>{activeStep.sampleAnswer}</MathText>
                            </p>
                          </details>
                        )}
                        {activeStep.solution && (
                          <details className="group rounded-lg border border-line bg-surface-tint p-3">
                            <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-widest text-nebula">
                              {activeStep.solutionImage
                                ? language === 'zh' ? '查看答案' : 'View answer'
                                : language === 'zh' ? '解析' : 'Explanation'}
                            </summary>
                            <p className="mt-3 text-sm leading-7 text-ink-soft">
                              <MathText>{activeStep.solution}</MathText>
                            </p>
                            {activeStep.solutionImage && (
                              <div className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
                                <img
                                  src={activeStep.solutionImage.src}
                                  alt={activeStep.solutionImage.alt}
                                  className="h-auto w-full"
                                />
                                {activeStep.solutionImage.caption && (
                                  <p className="px-3 py-2 text-[11px] text-ink-soft">{activeStep.solutionImage.caption}</p>
                                )}
                              </div>
                            )}
                          </details>
                        )}
                      </div>
                    )}
                    {currentResult && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg border border-sky-500/25 bg-sky-500/10 p-3 text-sm text-sky-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {language === 'zh' ? '答案已提交，等待人工查看' : 'Response submitted — awaiting review'}
                      </div>
                    )}
                  </>
                )}

                {/* #12: Mobile bottom margin to avoid bottom nav overlap */}
                <div className="mt-6 mb-16 md:mb-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <button
                      onClick={() => goToStep(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      className="h-11 w-11 rounded-full border border-line flex items-center justify-center hover:border-line-strong disabled:opacity-30"
                      title={t.practice.previous}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => goToStep(activeIndex + 1)}
                      disabled={activeIndex === practiceSteps.length - 1}
                      className="h-11 w-11 rounded-full border border-line flex items-center justify-center hover:border-line-strong disabled:opacity-30"
                      title={t.practice.next}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {!isActiveMultipleChoice ? (
                    <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
                      <button
                        onClick={submitFreeResponse}
                        disabled={!currentAnswerImage || Boolean(currentResult) || workUploadBusy}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-accent transition-colors hover:bg-nebula hover:text-on-accent disabled:opacity-30"
                      >
                        <Sparkles className="w-4 h-4" />
                        {workUploadBusy
                          ? language === 'zh' ? '上传中…' : 'Uploading…'
                          : language === 'zh' ? '提交答案' : 'Submit answer'}
                      </button>
                      {!currentResult && !currentAnswerImage && !workUploadBusy && (
                        <p className="text-[11px] text-ink-soft">
                          {language === 'zh' ? '请先拍照或上传图片，上传完成后即可提交' : 'Take a photo or upload an image first — you can submit once it finishes uploading.'}
                        </p>
                      )}
                      {!currentResult && workUploadBusy && (
                        <p className="text-[11px] text-ink-soft">
                          {language === 'zh' ? '图片正在上传，完成后按钮自动可用' : 'Your image is uploading — the button unlocks when it finishes.'}
                        </p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={submitAnswer}
                      disabled={!currentAnswer || Boolean(currentResult)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-accent transition-colors hover:bg-nebula hover:text-on-accent disabled:opacity-30"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t.practice.checkAnswer}
                    </button>
                  )}
                </div>
              </div>
              </motion.div>
          </AnimatePresence>

          {/* #5: Hide rubric panel for MCQ (feedback is inline) */}
          {currentResult && !isActiveMultipleChoice && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
            >
              <div className="glass-panel rounded-lg p-5 sm:p-6">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{t.practice.rubricScore}</div>
                <div className="text-5xl font-serif text-ink">{currentResult.score}/{currentResult.maxScore}</div>
                <div className="mt-4 h-2 rounded-full bg-surface-tint-strong overflow-hidden">
                  <div
                    className="h-full bg-nebula"
                    style={{ width: `${(currentResult.score / currentResult.maxScore) * 100}%` }}
                  />
                </div>
              </div>

              <div className="glass-panel rounded-lg p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 text-xs uppercase tracking-widest mb-3">
                      <Target className="w-4 h-4" />
                      {t.practice.hitPoints}
                    </div>
                    <div className="space-y-2">
                      {currentResult.hits.length ? (
                        currentResult.hits.map((hit) => (
                          <div key={hit.id} className="rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-ink">
                            {hit.label}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-500">{t.practice.noRubricPoints}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest mb-3">
                      <FileText className="w-4 h-4" />
                      {t.practice.missingPoints}
                    </div>
                    <div className="space-y-2">
                      {currentResult.misses.length ? (
                        currentResult.misses.map((miss) => (
                          <div key={miss.id} className="rounded-md border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-ink">
                            {miss.label}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-emerald-700">{t.practice.allRubricPoints}</div>
                      )}
                    </div>
                  </div>
                </div>

                {currentResult.suggestions.length > 0 && (
                  <div className="mt-6 border-t border-line pt-5">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">{t.practice.revisionAdvice}</div>
                    <ul className="space-y-2">
                      {currentResult.suggestions.map((suggestion) => (
                        <li key={suggestion} className="text-sm text-ink-soft leading-relaxed">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          </>
          )}
        </section>
      </div>
      )}
    </motion.div>
  );
};
