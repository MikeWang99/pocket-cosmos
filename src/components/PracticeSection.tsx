import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  CloudOff,
  FileText,
  Link2,
  Lock,
  Mic,
  RotateCcw,
  Sparkles,
  Square,
  Tag,
  Target,
} from 'lucide-react';
import { PRACTICE_LABELS, type EvaluationResult, type PracticeLabel, type PracticeStep } from '../types/practice';
import { evaluateLocally } from '../utils/rubricScoring';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { usePracticeProgress, type SavedPracticeAttempt } from '../hooks/usePracticeProgress';
import { usePracticePermissions } from '../hooks/usePracticePermissions';
import { usePracticeCatalog, usePracticeSet } from '../hooks/usePracticeCatalog';
import { usePracticeLabels } from '../hooks/usePracticeLabels';
import { StudentWorkUpload } from './StudentWorkUpload';
import { QuestionPrompt } from './QuestionPrompt';
import { isLongChoice, MathText } from './MathText';
import {
  QuestionAssetDownloads,
  QuestionMedia,
  SupportingQuestionImages,
} from './practice/PracticeQuestionMedia';
import {
  buildPracticeTree,
  getChapterNodeId,
  getCourseNodeId,
  getIgcseChapterNodeId,
  getIgcseCourseNodeId,
  getInitialExpandedNodes,
  inferPracticeKind,
} from '../practice/catalog';
import {
  buildPracticeShareUrl,
  copyTextToClipboard,
  PUBLIC_SAMPLE_LIMIT,
  PUBLIC_SAMPLE_SET_ID,
  readPracticeSelectionFromUrl,
  updatePracticeUrl,
} from '../practice/navigation';

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

const isMultipleChoiceStep = (step: PracticeStep) =>
  step.mode === 'multiple_choice' && Boolean(step.choices?.length);

export const PracticeSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { authEnabled, configured, isAdmin, user } = useAuth();
  const { hasAccess } = usePracticePermissions();
  const initialSelection = useMemo(() => readPracticeSelectionFromUrl(), []);
  const { sets: practiceCatalog } = usePracticeCatalog();
  const [activeSetId, setActiveSetId] = useState(initialSelection.setId);
  const [requestedQuestionId, setRequestedQuestionId] = useState(initialSelection.questionId);
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    set: loadedSet,
    access: loadedAccess,
    loading: setLoading,
    error: setLoadError,
  } = usePracticeSet(activeSetId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerImages, setAnswerImages] = useState<Record<string, string>>({});
  // True while the answer image is still compressing/uploading, so the submit
  // button can explain why it stays disabled instead of looking broken.
  const [workUploadBusy, setWorkUploadBusy] = useState(false);
  const [results, setResults] = useState<Record<string, EvaluationResult>>({});
  const [isListening, setIsListening] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<'all' | string>('all');
  const [labelFilter, setLabelFilter] = useState<'all' | PracticeLabel>('all');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { resetSavedAttempts, savedAttempts, saveAttempt, syncError, syncState } = usePracticeProgress(activeSetId);
  const { labelsByQuestion, getLabels, toggleLabel } = usePracticeLabels();

  const activeMeta =
    practiceCatalog.find((set) => set.id === activeSetId) ??
    practiceCatalog.find((set) => set.id === PUBLIC_SAMPLE_SET_ID) ??
    practiceCatalog[0] ??
    null;
  const activeSet = loadedSet;
  const hasFullAccess = loadedAccess === 'full';
  const sampleMode = loadedAccess === 'sample';
  const activeSetAccessible = loadedAccess !== 'locked' && Boolean(activeSet);
  const practiceSetMeta = activeSet ?? activeMeta;
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
    const matchedSet = practiceCatalog.find((s) => s.id === setId);
    if (matchedSet) {
      return { label: matchedSet.label, title: matchedSet.title, eyebrow: matchedSet.eyebrow, subtitle: matchedSet.subtitle, description: matchedSet.description };
    }
    return t.practice.sets.kinematicsMultipleChoice;
  };
  const setCopy = getSetCopy(activeSetId);
  const isIgcseSet = (activeSet ?? activeMeta)?.category === 'igcse';
  const activePracticeKind = activeSet ? inferPracticeKind(activeSet) : activeMeta ? inferPracticeKind(activeMeta) : 'mcq';
  const supportsDifficultyFilter =
    activePracticeKind === 'mcq' &&
    Boolean(activeSet?.steps.some((step) => Number.isFinite(step.difficulty) || step.tags?.some((tag) => tag.startsWith('Difficulty '))));
  const supportsSpecialtyFilter = activeSet?.system === 'competition' && activeSet.steps.some((step) => (step.specialtyTags?.length ?? 0) > 0);
  const supportsLabelFilter = isAdmin && Boolean(activeSet?.steps.length);
  const specialtyOptions = useMemo(() => {
    const labels = new Set<string>();
    activeSet?.steps.forEach((step) => step.specialtyTags?.forEach((label) => labels.add(label)));
    return [...labels].sort((a, b) => a.localeCompare(b));
  }, [activeSet?.steps]);

  // Filter any indexed MCQ bank by its normalized 1–5 difficulty value.
  const practiceSteps = useMemo(() => {
    const filtered = (activeSet?.steps ?? []).filter((step) => {
      if (supportsSpecialtyFilter && specialtyFilter !== 'all' && !step.specialtyTags?.includes(specialtyFilter)) return false;
      if (supportsLabelFilter && labelFilter !== 'all' && !labelsByQuestion[`${activeSetId}:${step.id}`]?.includes(labelFilter)) return false;
      if (!supportsDifficultyFilter || difficultyFilter === 'all') return true;
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

    return filtered;
  }, [activeSet?.steps, activeSetId, labelsByQuestion, supportsDifficultyFilter, difficultyFilter, supportsSpecialtyFilter, specialtyFilter, supportsLabelFilter, labelFilter]);

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
  // The question path is the learner-facing sequence after filters are
  // applied. Keep the heading in lockstep with that sequence; source-paper
  // numbering is intentionally hidden from the practice UI.
  const activeDisplayTitle = activeStep
    ? (activeSet ?? activeMeta)?.system === 'competition'
      ? `Question ${activeIndex + 1}`
      : activeStep.title
    : '';
  const isActiveMultipleChoice = activeStep ? isMultipleChoiceStep(activeStep) : false;
  const choiceList = activeStep?.choices ?? [];
  const useStackedChoices = choiceList.some((choice) => !choice.image && isLongChoice(choice.text));
  const hasCompleteQuestionImage = activeStep?.image?.role === 'question';
  const shouldShowPrompt =
    activeStep &&
    !hasCompleteQuestionImage &&
    !activeStep.prompt.startsWith('Select the correct option');
  const currentAnswer = activeStep ? (answers[activeStep.id] ?? '') : '';
  const currentAnswerImage = activeStep ? (answerImages[activeStep.id] ?? null) : null;
  const currentResult = activeStep ? results[activeStep.id] : undefined;
  const activeLabels = activeStep ? getLabels(activeSetId, activeStep.id) : [];
  const practiceLabelCopy: Record<PracticeLabel, string> = language === 'zh'
    ? {
        high_difficulty: t.practice.questionLabels.highDifficulty,
        high_value: t.practice.questionLabels.highValue,
        classroom_practice: t.practice.questionLabels.classroomPractice,
      }
    : {
        high_difficulty: t.practice.questionLabels.highDifficulty,
        high_value: t.practice.questionLabels.highValue,
        classroom_practice: t.practice.questionLabels.classroomPractice,
      };
  const completedCount = practiceSteps.filter((step) => Boolean(results[step.id])).length;
  const resultList: EvaluationResult[] = practiceSteps.flatMap((step) => results[step.id] ? [results[step.id]] : []);

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
  const practiceTree = useMemo(
    () =>
      buildPracticeTree(language, {
        apPhysics1: t.practice.tree.apPhysics1,
        apPhysics2: t.practice.tree.apPhysics2,
        bpho: t.practice.tree.bpho,
        aLevel: t.practice.tree.aLevel,
        physicsBowl: t.practice.tree.physicsBowl,
        apCMech: t.practice.tree.apCMech,
        apCEm: t.practice.tree.apCEm,
        competition: t.practice.tree.competition,
        igcse: t.practice.tree.igcse,
      }, practiceCatalog),
    [language, practiceCatalog, t],
  );

  // The tree starts open around the active shared link, but otherwise stays compact.
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
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
    if (!practiceCatalog.length) return;
    const resolvedMeta =
      practiceCatalog.find((set) => set.id === activeSetId) ??
      practiceCatalog.find((set) => set.id === PUBLIC_SAMPLE_SET_ID) ??
      practiceCatalog[0];
    if (resolvedMeta.id !== activeSetId) {
      setActiveSetId(resolvedMeta.id);
      setRequestedQuestionId(null);
      setActiveIndex(0);
    }
    setExpandedNodes((previous) => {
      const next = new Set(previous);
      getInitialExpandedNodes(resolvedMeta.id, practiceCatalog).forEach((node) => next.add(node));
      return next;
    });
  }, [activeSetId, practiceCatalog]);

  useEffect(() => {
    if (!activeSet?.steps.length) return;
    const requestedIndex = requestedQuestionId
      ? activeSet.steps.findIndex((step) => step.id === requestedQuestionId)
      : -1;
    setActiveIndex(requestedIndex >= 0 ? requestedIndex : 0);
    setRequestedQuestionId(null);
  }, [activeSet?.id, requestedQuestionId]);

  useEffect(() => {
    const handlePopState = () => {
      const next = readPracticeSelectionFromUrl();
      setActiveSetId(next.setId);
      setRequestedQuestionId(next.questionId);
      setActiveIndex(0);
      setShareCopied(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeStep) return;
    updatePracticeUrl(activeSetId, activeStep.id, 'replace');
  }, [activeSetId, activeStep?.id]);

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
      practiceSetId: activeSetId,
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

      // Some imported question banks intentionally omit their answer key. In
      // that case record the response without pretending it was correct or
      // incorrect; the question remains a usable practice item while the
      // teacher can add an answer key later.
      if (!activeStep.correctAnswer) {
        const result: EvaluationResult = {
          score: 0,
          maxScore: 0,
          hits: [],
          misses: [],
          suggestions: [],
        };
        recordResult(result, currentAnswer);
        return;
      }

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
    if (!practiceSteps.length) return;
    recognitionRef.current?.stop();
    setIsListening(false);
    setShareCopied(false);
    setWorkUploadBusy(false);
    const nextIndex = Math.min(Math.max(index, 0), practiceSteps.length - 1);
    setActiveIndex(nextIndex);
    updatePracticeUrl(activeSetId, practiceSteps[nextIndex].id);
  };

  const selectPracticeSet = (setId: string) => {
    if (setId === activeSetId) return;
    recognitionRef.current?.stop();
    setIsListening(false);
    setShareCopied(false);
    setDifficultyFilter('all');
    setSpecialtyFilter('all');
    setLabelFilter('all');
    const nextSet = practiceCatalog.find((set) => set.id === setId);
    if (!nextSet) return;
    setActiveSetId(nextSet.id);
    setRequestedQuestionId(null);
    setAnswers({});
    setResults({});
    setActiveIndex(0);
    updatePracticeUrl(nextSet.id, '');
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
    setSpecialtyFilter('all');
    setLabelFilter('all');
    const firstStep = practiceSteps[0] ?? activeSet?.steps[0];
    if (firstStep) updatePracticeUrl(activeSetId, firstStep.id, 'replace');
    resetSavedAttempts();
  };

  const changeDifficultyFilter = (filter: 'all' | 'easy' | 'medium' | 'hard') => {
    setDifficultyFilter(filter);
    setActiveIndex(0);
  };

  const changeSpecialtyFilter = (filter: 'all' | string) => {
    setSpecialtyFilter(filter);
    setActiveIndex(0);
  };

  const changeLabelFilter = (filter: 'all' | PracticeLabel) => {
    setLabelFilter(filter);
    setActiveIndex(0);
  };

  const handleToggleLabel = (label: PracticeLabel) => {
    if (!activeStep) return;
    if (labelFilter !== 'all' && label === labelFilter) setActiveIndex(0);
    void toggleLabel(activeSetId, activeStep.id, label);
  };

  const copyCurrentQuestionLink = async () => {
    const shareUrl = buildPracticeShareUrl(activeSetId, activeStep.id);
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
      className="max-w-[90rem]"
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
              const systemAccessible = hasAccess(system.id) || (!user && system.id === 'ap-physics-1');
              const hasSystemContent = system.courses.some((course) => course.chapters.some((chapter) => chapter.sets.length > 0));
              const canExpandSystem = systemAccessible && hasSystemContent;
              return (
                <div key={system.id}>
                  {/* System header */}
                  <button
                    onClick={() => canExpandSystem && toggleNode(system.id)}
                    disabled={!canExpandSystem}
                    aria-disabled={!canExpandSystem}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs font-bold uppercase tracking-wider text-ink-soft transition-colors hover:bg-surface-tint-strong disabled:cursor-default disabled:hover:bg-transparent"
                  >
                    {canExpandSystem && <span className={`inline-block h-3 w-3 text-[10px] leading-3 transition-transform ${sysExpanded ? 'rotate-90' : ''}`}>▶</span>}
                    {!canExpandSystem && !systemAccessible && <Lock className="h-3 w-3 text-slate-500" />}
                    {system.label}
                    {!systemAccessible && <span className="ml-auto text-[10px] font-semibold normal-case tracking-normal text-slate-500">{t.practice.locked}</span>}
                  </button>
                  {/* Question types / chapters / sets */}
                  {sysExpanded && systemAccessible && (
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
                                  const isDirectFmaChapter = course.id === 'competition-course-fma' && chapter.sets.length === 1;
                                  const chExpanded = !hasChapterLabel || expandedNodes.has(chapter.id);
                                  return (
                                    <div key={chapter.id} className="space-y-1">
                                      {hasChapterLabel && (
                                        isDirectFmaChapter ? (
                                          <button
                                            onClick={() => selectPracticeSet(chapter.sets[0].id)}
                                            className={`flex w-full items-center rounded-md px-2 py-1.5 text-left text-[11px] font-semibold transition-colors hover:bg-surface-tint-strong hover:text-ink ${chapter.sets[0].id === activeSetId ? 'bg-surface-tint-strong text-ink' : 'text-ink-soft'}`}
                                          >
                                            {chapter.label}
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => toggleNode(chapter.id)}
                                            className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px] font-semibold text-ink-soft transition-colors hover:bg-surface-tint-strong hover:text-ink"
                                          >
                                            <span className={`inline-block h-2.5 w-2.5 text-[8px] leading-[10px] transition-transform ${chExpanded ? 'rotate-90' : ''}`}>▶</span>
                                            {chapter.label}
                                          </button>
                                        )
                                      )}
                                      {chExpanded && !isDirectFmaChapter && (
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
            {supportsSpecialtyFilter && (
              <div className="mt-3">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {language === 'zh' ? '题型专项' : 'Specialty models'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', ...specialtyOptions] as string[]).map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => changeSpecialtyFilter(specialty)}
                      className={`min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        specialtyFilter === specialty
                          ? 'border-quantum/70 bg-quantum/15 text-ink'
                          : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {specialty === 'all' ? (language === 'zh' ? '全部' : 'All') : specialty}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
          {supportsLabelFilter && (
            <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-line bg-surface-tint px-2 py-1.5">
              <span className="px-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {t.practice.questionLabels.filterLabel}
              </span>
              {([
                ['all', t.practice.questionLabels.all],
                ['high_difficulty', t.practice.questionLabels.filterHighDifficulty],
                ['high_value', t.practice.questionLabels.filterHighValue],
                ['classroom_practice', t.practice.questionLabels.filterClassroomPractice],
              ] as Array<['all' | PracticeLabel, string]>).map(([filter, label]) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => changeLabelFilter(filter)}
                  className={`min-h-7 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                    labelFilter === filter
                      ? 'border-nebula/60 bg-nebula/10 text-nebula'
                      : 'border-transparent text-ink-soft hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
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

      {sampleMode && (
        <div className="mb-5 flex flex-col gap-2 rounded-xl border border-nebula/25 bg-nebula/[0.07] p-4 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="text-ink">{language === 'zh' ? '免费体验' : 'Free preview'}</strong>
            <span className="ml-2">
              {language === 'zh'
                ? `当前开放前 ${PUBLIC_SAMPLE_LIMIT} 道 AP Physics 1 题目，无需登录。`
                : `Try the first ${PUBLIC_SAMPLE_LIMIT} AP Physics 1 questions without signing in.`}
            </span>
          </div>
          <span className="text-xs font-semibold text-nebula">
            {language === 'zh' ? '登录后可保存学习记录' : 'Sign in to save progress'}
          </span>
        </div>
      )}

      {/* Permission gate: show locked card if the selected set is not accessible */}
      {!activeSetAccessible ? (
        <div className="glass-panel flex flex-col items-center justify-center gap-4 rounded-lg p-12 text-center">
          <Lock className="h-10 w-10 text-slate-500" />
          <p className="text-sm text-ink-soft max-w-md">{t.practice.lockedMessage}</p>
        </div>
      ) : (
      <div className="grid gap-4 lg:grid-cols-[185px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-lg p-3 lg:sticky lg:top-6">
          <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">{t.practice.questionPath}</div>
          <div className="grid grid-cols-5 gap-1.5 pb-1">
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
                    className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-md border text-[11px] font-semibold transition-colors ${
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
                    <h2 className="text-balance font-serif text-2xl text-ink md:text-3xl">{activeDisplayTitle}</h2>
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
                    {isAdmin && (
                      <div className="flex flex-wrap items-center gap-1.5" aria-label={t.practice.questionLabels.label}>
                        {PRACTICE_LABELS.map((label) => {
                          const selected = activeLabels.includes(label);
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => handleToggleLabel(label)}
                              aria-pressed={selected}
                              title={practiceLabelCopy[label]}
                              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-semibold transition-colors ${
                                selected
                                  ? 'border-nebula/70 bg-nebula/12 text-nebula'
                                  : 'border-line text-ink-soft hover:border-nebula/50 hover:text-nebula'
                              }`}
                            >
                              <Tag className="h-3.5 w-3.5" />
                              {practiceLabelCopy[label]}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <div className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft w-fit">
                      {activeIndex + 1} / {practiceSteps.length}
                    </div>
                  </div>
                </div>

                {/* Full question images contain the source stem; OCR is retained only for indexing. */}
                {shouldShowPrompt && (
                <div className="mt-6">
                  <div className="rounded-lg border border-line bg-surface-tint p-4 sm:p-5 md:p-6">
                    <div className="text-lg leading-relaxed text-ink md:text-xl">
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
                  <SupportingQuestionImages step={activeStep} label={t.practice.diagram} />
                  <QuestionAssetDownloads step={activeStep} language={language} />
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {isActiveMultipleChoice ? (
                  <div>
                    <div className={useStackedChoices ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-5 gap-1.5 sm:gap-2'} role="group" aria-label={t.practice.chooseAnswer}>
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
                            className={`flex min-h-12 min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2.5 transition-colors sm:px-3 ${useStackedChoices ? 'justify-start text-left' : 'justify-center text-center'} ${choice.image ? 'sm:py-3' : ''} ${
                              isCorrectChoice
                                ? 'border-emerald-500/50 bg-emerald-500/10'
                                : isWrongChoice
                                  ? 'border-rose-500/50 bg-rose-500/10'
                                  : isSelected
                                    ? 'border-nebula/70 bg-nebula/10'
                                    : 'border-line bg-surface-tint hover:border-nebula/50'
                            }`}
                          >
                            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-[11px] font-bold transition-colors sm:h-8 sm:w-8 ${
                              isSelected ? 'bg-nebula text-on-accent' : 'bg-slate-900 text-on-accent'
                            }`}>
                              {isSelected ? '✓' : choice.label}
                            </span>
                            <span className={`min-w-0 flex-1 self-center font-serif text-xs leading-relaxed text-ink sm:text-sm ${useStackedChoices ? 'whitespace-normal' : 'leading-tight'}`}>
                              {choice.images?.length ? (
                                <span className="flex min-w-0 flex-wrap items-center justify-center gap-2">
                                  {choice.images.map((image) => (
                                    <img
                                      key={image.src}
                                      src={image.src}
                                      alt={image.alt}
                                      className="practice-choice-image"
                                    />
                                  ))}
                                  <span className="sr-only">{choice.text}</span>
                                </span>
                              ) : choice.image ? (
                                <>
                                  <img
                                    src={choice.image.src}
                                    alt={choice.image.alt}
                                    className="practice-choice-image"
                                  />
                                  <span className="sr-only">{choice.text}</span>
                                </>
                              ) : choice.text ? (
                                <MathText>{choice.text}</MathText>
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {currentResult && (
                      <div className="mt-5 rounded-lg border border-line bg-surface-muted p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs uppercase tracking-widest text-slate-500">
                            {currentResult.maxScore === 0
                              ? language === 'zh' ? '已记录' : 'Recorded'
                              : currentResult.score === 1 ? t.practice.correct : t.practice.notQuite}
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
                        {activeStep.solution && (
                          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                            <MathText>{activeStep.solution}</MathText>
                          </p>
                        )}
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
