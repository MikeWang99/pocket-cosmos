import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import katex from 'katex';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  Circle,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Cloud,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { resolveHomeworkItems } from '../homework/catalog';
import type { HomeworkAssignment, ResolvedHomeworkItem } from '../homework/types';
import { useHomeworkData } from '../hooks/useHomeworkData';
import { useLanguage } from '../LanguageContext';
import type { EvaluationResult, PracticeStep } from '../types/practice';
import { evaluateLocally } from '../utils/rubricScoring';
import { HomeworkAdminPanel } from './HomeworkAdminPanel';
import { QuestionPrompt } from './QuestionPrompt';

type HomeworkView = 'student' | 'teacher';

const renderMath = (value: string) =>
  katex.renderToString(value, { throwOnError: false, strict: false });

const MathText: React.FC<{ children: string }> = ({ children }) => {
  const parts = children.split(/(\$[^$]+\$|\\\([^)]+\\\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const dollar = part.startsWith('$') && part.endsWith('$');
        const paren = part.startsWith('\\(') && part.endsWith('\\)');
        if (!dollar && !paren) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
        const expression = dollar ? part.slice(1, -1) : part.slice(2, -2);
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression) }}
          />
        );
      })}
    </>
  );
};

const formatDate = (value: string | null, language: 'en' | 'zh') => {
  if (!value) return language === 'zh' ? '不限时' : 'No deadline';
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

const daysUntil = (value: string | null) => {
  if (!value) return null;
  return Math.ceil((new Date(value).getTime() - Date.now()) / 86400000);
};

const isMultipleChoice = (step: PracticeStep) =>
  step.mode === 'multiple_choice' && Boolean(step.choices?.length && step.correctAnswer);

const responseKey = (practiceSetId: string, questionId: string) =>
  `${practiceSetId}:${questionId}`;

const buildResult = (step: PracticeStep, answer: string, language: 'en' | 'zh'): EvaluationResult => {
  if (!isMultipleChoice(step)) return evaluateLocally(step, answer);
  const selected = answer.split(',').filter(Boolean).sort();
  const correct = (step.correctAnswer ?? '').split(',').filter(Boolean).sort();
  const matches = selected.join(',') === correct.join(',');
  const criterion = {
    id: `${step.id}-${matches ? 'correct' : 'review'}`,
    label: matches
      ? language === 'zh' ? '答案正确' : 'Correct answer'
      : language === 'zh' ? `正确答案：${correct.join(', ')}` : `Correct answer: ${correct.join(', ')}`,
    point: matches ? 'Correct answer.' : 'Review the solution.',
    keywords: [],
    feedback: step.solution ?? '',
  };
  return {
    score: matches ? 1 : 0,
    maxScore: 1,
    hits: matches ? [criterion] : [],
    misses: matches ? [] : [criterion],
    suggestions: matches ? [] : [step.solution || step.answerNudge],
  };
};

const assignmentStatus = (
  assignment: HomeworkAssignment,
  completed: number,
  language: 'en' | 'zh',
) => {
  if (completed >= assignment.items.length && assignment.items.length) {
    return {
      label: language === 'zh' ? '已完成' : 'Completed',
      className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
    };
  }
  const remaining = daysUntil(assignment.dueAt);
  if (remaining !== null && remaining < 0) {
    return {
      label: language === 'zh' ? '已逾期' : 'Overdue',
      className: 'border-rose-500/30 bg-rose-500/10 text-rose-700',
    };
  }
  if (completed > 0) {
    return {
      label: language === 'zh' ? '进行中' : 'In progress',
      className: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
    };
  }
  return {
    label: language === 'zh' ? '待完成' : 'To do',
    className: 'border-nebula/30 bg-nebula/10 text-nebula',
  };
};

const QuestionCard: React.FC<{
  item: ResolvedHomeworkItem;
  index: number;
  total: number;
  answer: string;
  result?: EvaluationResult;
  language: 'en' | 'zh';
  saving: boolean;
  onAnswer: (answer: string) => void;
  onSubmit: () => void;
  onRetry: () => void;
}> = ({ item, index, total, answer, result, language, saving, onAnswer, onSubmit, onRetry }) => {
  const { step } = item;
  const multipleChoice = isMultipleChoice(step);
  const selected = answer.split(',').filter(Boolean);
  const correct = (step.correctAnswer ?? '').split(',').filter(Boolean);
  // A `question` image is the complete source question, not a supporting diagram.
  // Keep OCR in the data for search/indexing, but never render it beside the image.
  const hideDuplicatePrompt = step.image?.role === 'question';

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="glass-panel overflow-hidden rounded-xl"
    >
      <div className="border-b border-line p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-nebula">
              {item.setLabel} · {step.source}
            </div>
            <h2 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">{step.title}</h2>
          </div>
          <span className="w-fit rounded-full border border-line px-4 py-2 text-sm text-ink-soft">
            {index + 1} / {total}
          </span>
        </div>

        {!hideDuplicatePrompt && step.prompt && (
          <div className="mt-6 rounded-lg border border-line bg-surface-tint p-4 text-base leading-7 text-ink">
            <QuestionPrompt prompt={step.prompt} />
          </div>
        )}

        {step.image && (
          <figure className="practice-media practice-media--question mt-5">
            <div className="practice-question-image-scroll">
              <img src={step.image.src} alt={step.image.alt} className={`practice-media-image practice-question-image ${step.image.responsive ? 'practice-question-image--responsive' : ''}`} />
            </div>
            {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
          </figure>
        )}
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        {multipleChoice ? (
          <div className="grid gap-3">
            {step.choices?.map((choice) => {
              const isSelected = selected.includes(choice.label);
              const isCorrectChoice = Boolean(result) && correct.includes(choice.label);
              const isWrong = Boolean(result) && isSelected && !correct.includes(choice.label);
              return (
                <button
                  key={choice.label}
                  type="button"
                  disabled={Boolean(result)}
                  onClick={() => {
                    const next = isSelected
                      ? selected.filter((label) => label !== choice.label)
                      : [...selected, choice.label];
                    onAnswer(next.sort().join(','));
                  }}
                  className={`grid min-h-14 grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    isCorrectChoice
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : isWrong
                        ? 'border-rose-500/50 bg-rose-500/10'
                        : isSelected
                          ? 'border-nebula/60 bg-nebula/10'
                          : 'border-line bg-surface-tint hover:border-nebula/45'
                  }`}
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-md text-xs font-bold ${isSelected ? 'bg-nebula text-on-accent' : 'bg-slate-900 text-on-accent'}`}>
                    {isSelected ? <Check className="h-4 w-4" /> : choice.label}
                  </span>
                  <span className="min-w-0 text-sm leading-6 text-ink">
                    {choice.image ? (
                      <>
                        <img src={choice.image.src} alt={choice.image.alt} className="practice-choice-image" />
                        <span className="sr-only">{choice.text}</span>
                      </>
                    ) : choice.text ? <MathText>{choice.text}</MathText> : language === 'zh' ? `选择 ${choice.label}` : `Option ${choice.label}`}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            value={answer}
            disabled={Boolean(result)}
            onChange={(event) => onAnswer(event.target.value)}
            className="min-h-44 w-full rounded-lg border border-line bg-surface-muted p-4 text-sm leading-7 text-ink outline-none focus:border-nebula disabled:opacity-70"
            placeholder={language === 'zh' ? '在这里写下答案或解题思路…' : 'Write your answer or reasoning here…'}
          />
        )}

        {result && (
          <div className={`mt-5 rounded-xl border p-4 ${result.score >= result.maxScore && result.maxScore > 0 ? 'border-emerald-500/25 bg-emerald-500/10' : 'border-amber-500/25 bg-amber-500/10'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                {result.score >= result.maxScore && result.maxScore > 0 ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <CircleAlert className="h-5 w-5 text-amber-700" />}
                {multipleChoice
                  ? result.score
                    ? language === 'zh' ? '回答正确，进度已同步' : 'Correct — progress synced'
                    : language === 'zh' ? '已记录，建议查看解析' : 'Recorded — review the solution'
                  : language === 'zh' ? '答案已提交，进度已同步' : 'Response submitted — progress synced'}
              </div>
              {!result.score && (
                <button type="button" onClick={onRetry} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft">
                  <RotateCcw className="h-3.5 w-3.5" />
                  {language === 'zh' ? '重试' : 'Retry'}
                </button>
              )}
            </div>
            {step.solution && (
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-semibold text-nebula">{language === 'zh' ? '查看答案与解析' : 'View answer and explanation'}</summary>
                <p className="mt-3 text-sm leading-7 text-ink-soft"><MathText>{step.solution}</MathText></p>
              </details>
            )}
          </div>
        )}

        {!result && (
          <button
            type="button"
            disabled={saving || (multipleChoice ? !answer : answer.trim().length < 3)}
            onClick={onSubmit}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-xs font-bold uppercase tracking-widest text-on-accent transition-colors hover:bg-nebula hover:text-on-accent disabled:opacity-30 sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            {saving
              ? language === 'zh' ? '正在同步…' : 'Syncing…'
              : multipleChoice
                ? language === 'zh' ? '检查并提交' : 'Check & submit'
                : language === 'zh' ? '提交本题' : 'Submit question'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const HomeworkSection: React.FC = () => {
  const { language } = useLanguage();
  const { authEnabled, isAdmin, user } = useAuth();
  const {
    assignments,
    attempts,
    loading,
    error,
    demoMode,
    currentStudentId,
    saveAttempt,
  } = useHomeworkData();
  const [view, setView] = useState<HomeworkView>(() =>
    isAdmin || demoMode ? 'teacher' : 'student',
  );
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, EvaluationResult>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAdmin || demoMode) setView('teacher');
  }, [demoMode, isAdmin]);

  const publishedAssignments = useMemo(
    () =>
      assignments.filter(
        (assignment) =>
          assignment.status === 'published' &&
          (assignment.assignedToAll || assignment.studentIds.includes(currentStudentId)),
      ),
    [assignments, currentStudentId],
  );
  const activeAssignment =
    publishedAssignments.find((assignment) => assignment.id === activeAssignmentId) ?? null;
  const activeItems = useMemo(
    () => (activeAssignment ? resolveHomeworkItems(activeAssignment.items) : []),
    [activeAssignment],
  );
  const activeItem = activeItems[activeIndex];

  const studentAttempts = useMemo(
    () => attempts.filter((attempt) => attempt.studentId === currentStudentId),
    [attempts, currentStudentId],
  );
  const attemptMap = useMemo(
    () =>
      new Map(
        studentAttempts.map((attempt) => [
          `${attempt.practiceSetId}:${attempt.questionId}`,
          attempt,
        ]),
      ),
    [studentAttempts],
  );

  useEffect(() => {
    if (!activeItem) return;
    const key = responseKey(activeItem.practiceSetId, activeItem.questionId);
    const saved = attemptMap.get(key);
    if (!saved) return;
    setAnswers((current) => ({ ...current, [key]: saved.answer }));
    setResults((current) => ({ ...current, [key]: saved.result }));
  }, [activeItem, attemptMap]);

  useEffect(() => {
    if (typeof window === 'undefined' || activeAssignmentId || !publishedAssignments.length) return;
    const requestedAssignment = new URLSearchParams(window.location.search).get('assignment');
    if (requestedAssignment && publishedAssignments.some((assignment) => assignment.id === requestedAssignment)) {
      setActiveAssignmentId(requestedAssignment);
      setActiveIndex(0);
    }
  }, [activeAssignmentId, publishedAssignments]);

  const completionFor = (assignment: HomeworkAssignment) =>
    new Set(
      assignment.items
        .filter((item) => attemptMap.has(`${item.practiceSetId}:${item.questionId}`))
        .map((item) => `${item.practiceSetId}:${item.questionId}`),
    ).size;

  const totalQuestions = publishedAssignments.reduce((sum, assignment) => sum + assignment.items.length, 0);
  const totalCompleted = publishedAssignments.reduce((sum, assignment) => sum + completionFor(assignment), 0);
  const nextDue = publishedAssignments
    .filter((assignment) => assignment.dueAt && completionFor(assignment) < assignment.items.length)
    .sort((a, b) => new Date(a.dueAt!).getTime() - new Date(b.dueAt!).getTime())[0];

  const openAssignment = (assignmentId: string) => {
    setActiveAssignmentId(assignmentId);
    setActiveIndex(0);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'homework');
      url.searchParams.set('assignment', assignmentId);
      window.history.pushState({}, '', `${url.pathname}${url.search}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeAssignment = () => {
    setActiveAssignmentId(null);
    setActiveIndex(0);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('assignment');
      window.history.pushState({}, '', `${url.pathname}${url.search}`);
    }
  };

  const activeResponseKey = activeItem
    ? responseKey(activeItem.practiceSetId, activeItem.questionId)
    : '';
  const currentAnswer = activeItem ? answers[activeResponseKey] ?? '' : '';
  const currentResult = activeItem ? results[activeResponseKey] : undefined;

  const submit = async () => {
    if (!activeItem) return;
    const result = buildResult(activeItem.step, currentAnswer, language);
    setSaving(true);
    const saveError = await saveAttempt({
      practiceSetId: activeItem.practiceSetId,
      questionId: activeItem.questionId,
      answer: currentAnswer,
      score: result.score,
      maxScore: result.maxScore,
      isCorrect: result.maxScore > 0 && result.score >= result.maxScore,
      result,
    });
    setSaving(false);
    if (!saveError) setResults((current) => ({ ...current, [activeResponseKey]: result }));
  };

  if (loading) {
    return <div className="glass-panel rounded-xl p-10 text-sm text-ink-soft">{language === 'zh' ? '正在加载作业…' : 'Loading homework…'}</div>;
  }

  if (!demoMode && authEnabled && !user) {
    return (
      <section className="max-w-4xl">
        <div className="glass-panel rounded-xl p-8 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-nebula" />
          <h1 className="mt-4 font-serif text-3xl text-ink">{language === 'zh' ? '登录后查看你的作业' : 'Sign in to view homework'}</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-soft">
            {language === 'zh' ? '作业、题库和做题状态使用同一个学生账号同步。' : 'Assignments and question-bank progress sync through the same student account.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-nebula">
            <ClipboardCheck className="h-4 w-4" />
            {language === 'zh' ? 'Homework Hub' : 'Homework Hub'}
          </div>
          <h1 className="font-serif text-4xl font-light text-ink sm:text-5xl lg:text-6xl">
            {view === 'teacher'
              ? language === 'zh' ? '作业后台' : 'Homework Admin'
              : language === 'zh' ? '我的作业' : 'My Homework'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
            {view === 'teacher'
              ? language === 'zh' ? '按课程快速组题、发布，并在一个页面查看每位学生的整体进度。' : 'Build, publish, and review every student’s progress in one place.'
              : language === 'zh' ? '每次课的完整作业都在这里。按顺序完成即可，不再需要到不同章节寻找题目。' : 'Every lesson assignment lives here. Work through it in order without searching across chapters.'}
          </p>
        </div>
        {(isAdmin || demoMode) && (
          <div className="flex rounded-full border border-line bg-surface-tint p-1">
            <button type="button" onClick={() => setView('teacher')} className={`rounded-full px-4 py-2 text-xs font-semibold ${view === 'teacher' ? 'bg-slate-900 text-on-accent' : 'text-ink-soft'}`}>
              <ShieldCheck className="mr-1.5 inline h-4 w-4" />
              {language === 'zh' ? '老师视图' : 'Teacher'}
            </button>
            <button type="button" onClick={() => setView('student')} className={`rounded-full px-4 py-2 text-xs font-semibold ${view === 'student' ? 'bg-slate-900 text-on-accent' : 'text-ink-soft'}`}>
              <GraduationCap className="mr-1.5 inline h-4 w-4" />
              {language === 'zh' ? '学生视图' : 'Student'}
            </button>
          </div>
        )}
      </div>

      {error && <div className="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-800">{error}</div>}

      {view === 'teacher' ? (
        <HomeworkAdminPanel />
      ) : activeAssignment && activeItem ? (
        <div>
          <button type="button" onClick={closeAssignment} className="mb-5 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <ChevronLeft className="h-4 w-4" />
            {language === 'zh' ? '返回作业列表' : 'Back to assignments'}
          </button>

          <div className="mb-5 glass-panel rounded-xl p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-nebula">{language === 'zh' ? '当前作业' : 'Current assignment'}</div>
                <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">{activeAssignment.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{activeAssignment.description}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-ink-soft">
                <CalendarClock className="h-4 w-4 text-nebula" />
                {formatDate(activeAssignment.dueAt, language)}
              </div>
            </div>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {activeItems.map((item, index) => {
                const attempt = attemptMap.get(`${item.practiceSetId}:${item.questionId}`);
                const selected = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-lg border text-sm font-semibold ${
                      selected
                        ? 'border-nebula/70 bg-nebula/15 text-nebula'
                        : attempt
                          ? attempt.isCorrect
                            ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700'
                            : 'border-amber-500/35 bg-amber-500/10 text-amber-700'
                          : 'border-line bg-surface-tint text-slate-500'
                    }`}
                  >
                    {attempt ? <Check className="h-4 w-4" /> : index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={activeItem.id}
                  item={activeItem}
                  index={activeIndex}
                  total={activeItems.length}
                  answer={currentAnswer}
                  result={currentResult}
                  language={language}
                  saving={saving}
                  onAnswer={(answer) => setAnswers((current) => ({ ...current, [activeResponseKey]: answer }))}
                  onSubmit={() => void submit()}
                  onRetry={() => {
                    setAnswers((current) => ({ ...current, [activeResponseKey]: '' }));
                    setResults((current) => {
                      const next = { ...current };
                      delete next[activeResponseKey];
                      return next;
                    });
                  }}
                />
              </AnimatePresence>
              <div className="mt-5 mb-16 flex items-center justify-between md:mb-0">
                <button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-xs text-ink-soft disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" />
                  {language === 'zh' ? '上一题' : 'Previous'}
                </button>
                <button type="button" disabled={activeIndex === activeItems.length - 1} onClick={() => setActiveIndex((index) => Math.min(activeItems.length - 1, index + 1))} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-xs text-ink-soft disabled:opacity-30">
                  {language === 'zh' ? '下一题' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <aside className="glass-panel h-fit rounded-xl p-4 lg:sticky lg:top-6">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{language === 'zh' ? '进度同步' : 'Progress sync'}</div>
              <div className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
                <Cloud className="h-4 w-4" />
                {language === 'zh' ? '作业与题库共用记录' : 'Shared with question bank'}
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                {language === 'zh' ? '在这里提交后，原题库中的同一道题会同步显示为已做。' : 'Submitting here marks the same source question as attempted in Practice.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/?tab=practice&set=${encodeURIComponent(activeItem.practiceSetId)}&q=${encodeURIComponent(activeItem.questionId)}`;
                }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-ink-soft hover:border-nebula/40 hover:text-nebula"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {language === 'zh' ? '在原题库中验证' : 'Verify in Practice'}
              </button>
            </aside>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="glass-panel rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500">
                {language === 'zh' ? '待完成作业' : 'Open assignments'}
                <LayoutDashboard className="h-4 w-4 text-nebula" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-ink">
                {publishedAssignments.filter((assignment) => completionFor(assignment) < assignment.items.length).length}
              </div>
            </div>
            <div className="glass-panel rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500">
                {language === 'zh' ? '总进度' : 'Overall progress'}
                <Target className="h-4 w-4 text-nebula" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-ink">{totalCompleted}/{totalQuestions}</div>
            </div>
            <div className="glass-panel rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500">
                {language === 'zh' ? '最近截止' : 'Next due'}
                <Clock3 className="h-4 w-4 text-nebula" />
              </div>
              <div className="mt-3 text-sm font-semibold text-ink">{nextDue ? formatDate(nextDue.dueAt, language) : language === 'zh' ? '全部完成' : 'All clear'}</div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {publishedAssignments.map((assignment) => {
              const completed = completionFor(assignment);
              const progress = assignment.items.length ? Math.round((completed / assignment.items.length) * 100) : 0;
              const status = assignmentStatus(assignment, completed, language);
              return (
                <button
                  key={assignment.id}
                  type="button"
                  onClick={() => openAssignment(assignment.id)}
                  className="glass-panel group rounded-xl p-5 text-left transition-transform hover:-translate-y-0.5 hover:border-nebula/30 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-nebula/20 bg-nebula/10 text-nebula">
                      <BookOpenCheck className="h-5 w-5" />
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${status.className}`}>{status.label}</span>
                  </div>
                  <h2 className="mt-5 font-serif text-2xl text-ink">{assignment.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">{assignment.description}</p>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-tint-strong">
                    <div className="h-full rounded-full bg-nebula transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{completed}/{assignment.items.length} {language === 'zh' ? '已完成' : 'completed'}</span>
                    <span>{formatDate(assignment.dueAt, language)}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {!publishedAssignments.length && (
            <div className="glass-panel rounded-xl p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-700" />
              <h2 className="mt-4 font-serif text-2xl text-ink">{language === 'zh' ? '暂时没有新作业' : 'No new homework'}</h2>
              <p className="mt-2 text-sm text-slate-500">{language === 'zh' ? '老师发布后会自动出现在这里。' : 'New assignments will appear here automatically.'}</p>
            </div>
          )}
        </>
      )}
    </motion.section>
  );
};
