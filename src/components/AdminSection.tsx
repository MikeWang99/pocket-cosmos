import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import katex from 'katex';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleX,
  ClipboardList,
  FileText,
  Lock,
  ListChecks,
  ShieldCheck,
  Unlock,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { practiceSets } from '../data/practiceSets';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';
import { getSupabaseClient } from '../lib/supabaseClient';
import { ALL_SYSTEMS } from '../hooks/usePracticePermissions';
import type { EvaluationResult, PracticeStep } from '../types/practice';

interface PracticeAttemptRow {
  id: string;
  student_id: string;
  student_email: string | null;
  practice_set_id: string;
  practice_set_title: string;
  question_id: string;
  question_title: string;
  answer: string | null;
  answer_image_url: string | null;
  score: number | string;
  max_score: number | string;
  is_correct: boolean;
  tags: string[] | null;
  result: unknown;
  updated_at: string;
  created_at: string;
}

interface StudentSummary {
  studentId: string;
  email: string;
  attempts: PracticeAttemptRow[];
  completed: number;
  correct: number;
  accuracy: number;
  latestAt: string;
}

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

const splitPromptParts = (prompt: string) => {
  const parts = prompt.split(/\s(?=[a-d]\.\s)/).filter(Boolean);
  return parts.length > 1 ? parts : [prompt];
};

const normalizeResult = (row: PracticeAttemptRow): EvaluationResult => {
  const savedResult = row.result as Partial<EvaluationResult> | null;
  const score = Number(savedResult?.score ?? row.score ?? 0);
  const maxScore = Number(savedResult?.maxScore ?? row.max_score ?? 1);

  return {
    score,
    maxScore,
    hits: Array.isArray(savedResult?.hits) ? savedResult.hits : [],
    misses: Array.isArray(savedResult?.misses) ? savedResult.misses : [],
    suggestions: Array.isArray(savedResult?.suggestions) ? savedResult.suggestions : [],
  };
};

const formatDateTime = (value: string, locale: 'en' | 'zh') =>
  new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const QuestionMedia: React.FC<{ step: PracticeStep; label: string }> = ({ step, label }) => {
  if (!step.image) return null;

  return (
    <figure className="practice-media">
      <div className="mb-3 text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
      <img src={step.image.src} alt={step.image.alt} className="practice-media-image" />
      {step.image.caption && <figcaption>{step.image.caption}</figcaption>}
    </figure>
  );
};

const EquationBlock: React.FC<{ equations?: string[]; label: string }> = ({ equations, label }) => {
  if (!equations?.length) return null;

  return (
    <div className="practice-equations">
      <div className="mb-3 text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
      <div className="space-y-2">
        {equations.map((equation) => (
          <div key={equation} className="practice-equation">
            <MathText>{equation}</MathText>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { authEnabled, configured, isAdmin, loading: authLoading, user } = useAuth();
  const supabase = getSupabaseClient();
  const [attempts, setAttempts] = useState<PracticeAttemptRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedSetId, setSelectedSetId] = useState(practiceSets[0]?.id ?? '');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    if (!authEnabled || !configured || !supabase || !isAdmin) return;

    let mounted = true;
    setLoading(true);
    setError(null);

    supabase
      .from('practice_attempts')
      .select(
        'id, student_id, student_email, practice_set_id, practice_set_title, question_id, question_title, answer, answer_image_url, score, max_score, is_correct, tags, result, created_at, updated_at',
      )
      .order('updated_at', { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!mounted) return;

        if (queryError) {
          setError(queryError.message);
          setAttempts([]);
        } else {
          setAttempts((data ?? []) as PracticeAttemptRow[]);
        }

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [authEnabled, configured, isAdmin, supabase]);

  const students = useMemo<StudentSummary[]>(() => {
    const grouped = new Map<string, PracticeAttemptRow[]>();

    attempts.forEach((attempt) => {
      grouped.set(attempt.student_id, [...(grouped.get(attempt.student_id) ?? []), attempt]);
    });

    return Array.from(grouped.entries())
      .map(([studentId, studentAttempts]) => {
        const completed = studentAttempts.length;
        const correct = studentAttempts.filter((attempt) => attempt.is_correct).length;
        const latestAt = studentAttempts.reduce(
          (latest, attempt) => (new Date(attempt.updated_at) > new Date(latest) ? attempt.updated_at : latest),
          studentAttempts[0]?.updated_at ?? new Date(0).toISOString(),
        );

        return {
          studentId,
          email: studentAttempts[0]?.student_email || t.admin.unknownStudent,
          attempts: studentAttempts,
          completed,
          correct,
          accuracy: completed ? Math.round((correct / completed) * 100) : 0,
          latestAt,
        };
      })
      .sort((a, b) => new Date(b.latestAt).getTime() - new Date(a.latestAt).getTime());
  }, [attempts, t.admin.unknownStudent]);

  const selectedStudent = students.find((student) => student.studentId === selectedStudentId) ?? students[0] ?? null;

  useEffect(() => {
    if (!selectedStudent) {
      setSelectedStudentId(null);
      return;
    }

    if (selectedStudent.studentId !== selectedStudentId) {
      setSelectedStudentId(selectedStudent.studentId);
    }
  }, [selectedStudent, selectedStudentId]);

  const availableSets = useMemo(() => {
    if (!selectedStudent) return [];
    const attemptedSetIds = new Set(selectedStudent.attempts.map((attempt) => attempt.practice_set_id));
    return practiceSets.filter((set) => attemptedSetIds.has(set.id));
  }, [selectedStudent]);

  useEffect(() => {
    if (!availableSets.length) return;
    if (!availableSets.some((set) => set.id === selectedSetId)) {
      setSelectedSetId(availableSets[0].id);
    }
  }, [availableSets, selectedSetId]);

  const selectedSet = practiceSets.find((set) => set.id === selectedSetId) ?? availableSets[0] ?? practiceSets[0];
  const selectedSetAttempts = useMemo(() => {
    if (!selectedStudent || !selectedSet) return new Map<string, PracticeAttemptRow>();
    return selectedStudent.attempts
      .filter((attempt) => attempt.practice_set_id === selectedSet.id)
      .reduce<Map<string, PracticeAttemptRow>>((map, attempt) => {
        map.set(attempt.question_id, attempt);
        return map;
      }, new Map());
  }, [selectedSet, selectedStudent]);

  const selectedStep =
    selectedSet.steps.find((step) => step.id === selectedQuestionId && selectedSetAttempts.has(step.id)) ??
    selectedSet.steps.find((step) => selectedSetAttempts.has(step.id)) ??
    selectedSet.steps[0];
  const selectedAttempt = selectedStep ? selectedSetAttempts.get(selectedStep.id) : undefined;
  const selectedResult = selectedAttempt ? normalizeResult(selectedAttempt) : null;
  const selectedAccuracy = selectedStudent?.completed ? Math.round((selectedStudent.correct / selectedStudent.completed) * 100) : 0;

  if (!authEnabled) return null;

  if (!configured) {
    return (
      <section className="max-w-4xl">
        <div className="glass-panel rounded-lg p-5 sm:p-8">
          <div className="flex items-center gap-3 text-amber-600">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">{t.admin.title}</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-light text-ink sm:text-4xl">{t.admin.configTitle}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">{t.admin.configText}</p>
        </div>
      </section>
    );
  }

  if (authLoading) {
    return <div className="glass-panel max-w-xl rounded-lg p-8 text-sm text-slate-500">{t.admin.checkingAccess}</div>;
  }

  if (!user || !isAdmin) {
    return (
      <section className="max-w-4xl">
        <div className="glass-panel rounded-lg p-5 sm:p-8">
          <div className="flex items-center gap-3 text-nebula">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">{t.admin.restricted}</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-light text-ink sm:text-4xl">{t.admin.lockedTitle}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">{t.admin.lockedText}</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-nebula">
            <ShieldCheck className="h-4 w-4" />
            {t.admin.eyebrow}
          </div>
          <h1 className="font-serif text-3xl font-light leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">{t.admin.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft sm:mt-4 sm:text-base">{t.admin.description}</p>
        </div>

        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-auto lg:min-w-[280px]">
          <div className="glass-panel rounded-lg p-3 sm:p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.students}</div>
            <div className="mt-1 text-xl font-semibold sm:text-2xl">{students.length}</div>
          </div>
          <div className="glass-panel rounded-lg p-3 sm:p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.records}</div>
            <div className="mt-1 text-xl font-semibold sm:text-2xl">{attempts.length}</div>
          </div>
          <div className="glass-panel rounded-lg p-3 sm:p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.accuracy}</div>
            <div className="mt-1 text-xl font-semibold sm:text-2xl">
              {attempts.length ? Math.round((attempts.filter((attempt) => attempt.is_correct).length / attempts.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mb-6 rounded-lg border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-700">{error}</div>}

      <a
        href="/?tab=homework"
        className="mb-6 flex flex-col gap-4 rounded-xl border border-nebula/25 bg-nebula/[0.08] p-5 transition-colors hover:border-nebula/50 sm:flex-row sm:items-center"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-nebula/15 text-nebula">
          <ListChecks className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ink">
            {language === 'zh' ? '查看某次作业的完成情况与逐题答案' : 'Review an assignment and every student answer'}
          </div>
          <div className="mt-1 text-xs leading-5 text-ink-soft">
            {language === 'zh'
              ? '作业数据统一放在「作业 → 老师视图」。本页只保留日常练习记录和账号权限。'
              : 'Assignment data now lives in Homework → Teacher. This page is for general practice records and account access.'}
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-nebula">
          {language === 'zh' ? '前往老师视图' : 'Open Teacher view'}
          <ArrowRight className="h-4 w-4" />
        </span>
      </a>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-6 2xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-lg p-3 xl:sticky xl:top-6">
          <div className="flex items-center gap-2 px-3 py-3 text-[10px] uppercase tracking-widest text-slate-500">
            <UsersRound className="h-4 w-4" />
            {t.admin.studentList}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-2 xl:overflow-visible xl:pb-0">
            {students.map((student) => {
              const isSelected = student.studentId === selectedStudent?.studentId;
              return (
                <button
                  key={student.studentId}
                  type="button"
                  onClick={() => {
                    setSelectedStudentId(student.studentId);
                    setSelectedQuestionId(null);
                  }}
                  className={`min-w-[250px] rounded-md border p-4 text-left transition-colors xl:w-full xl:min-w-0 ${
                    isSelected
                      ? 'border-nebula/70 bg-surface-tint text-ink'
                      : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <UserRound className="h-5 w-5 shrink-0 text-nebula" />
                    <span className="truncate text-sm font-semibold">{student.email}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-slate-500">
                    <span>{student.completed} {t.admin.recordsShort}</span>
                    <span>{student.correct} {t.admin.correctShort}</span>
                    <span>{student.accuracy}%</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">{formatDateTime(student.latestAt, language)}</div>
                </button>
              );
            })}
          </div>
          {!students.length && (
            <div className="px-3 py-8 text-sm text-slate-500">{loading ? t.admin.loadingRecords : t.admin.noRecords}</div>
          )}
        </aside>

        <div className="space-y-6">
          {selectedStudent && selectedSet && selectedStep ? (
            <>
              <div className="glass-panel rounded-lg p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.selectedStudent}</div>
                    <h2 className="mt-1 truncate font-serif text-xl text-ink sm:text-2xl">{selectedStudent.email}</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
                    <div className="rounded-lg border border-line bg-surface-tint px-4 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.records}</div>
                      <div className="mt-1 text-xl font-semibold">{selectedStudent.completed}</div>
                    </div>
                    <div className="rounded-lg border border-line bg-surface-tint px-4 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.correctShort}</div>
                      <div className="mt-1 text-xl font-semibold">{selectedStudent.correct}</div>
                    </div>
                    <div className="rounded-lg border border-line bg-surface-tint px-4 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.accuracy}</div>
                      <div className="mt-1 text-xl font-semibold">{selectedAccuracy}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
                  {availableSets.map((set) => {
                    const isSelected = set.id === selectedSet.id;
                    return (
                      <button
                        key={set.id}
                        type="button"
                        onClick={() => {
                          setSelectedSetId(set.id);
                          setSelectedQuestionId(null);
                        }}
                        className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'border-nebula/70 bg-nebula/15 text-ink'
                            : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                        }`}
                      >
                        {set.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
                <aside className="glass-panel h-fit rounded-lg p-3 lg:sticky lg:top-6">
                  <div className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">
                    <ClipboardList className="h-4 w-4" />
                    {t.admin.questionRecords}
                  </div>
                  {/* Summary */}
                  <div className="px-3 pb-2 text-xs text-ink-soft">
                    {selectedSet.steps.filter((s) => selectedSetAttempts.has(s.id)).length}/{selectedSet.steps.length} {language === 'zh' ? '已答' : 'answered'}
                  </div>
                  {/* Compact grid */}
                  <div className="grid grid-cols-5 gap-1.5 max-h-[50vh] overflow-y-auto px-1 pb-2 sm:grid-cols-6 lg:grid-cols-5">
                    {selectedSet.steps.map((step, index) => {
                      const attempt = selectedSetAttempts.get(step.id);
                      const isSelected = selectedStep.id === step.id;
                      return (
                        <button
                          key={step.id}
                          type="button"
                          disabled={!attempt}
                          onClick={() => setSelectedQuestionId(step.id)}
                          title={`${step.title || `${t.admin.question} ${index + 1}`}${attempt ? ` ${Number(attempt.score)}/${Number(attempt.max_score)}` : ` ${t.admin.notAttempted}`}`}
                          className={`relative grid h-9 w-9 place-items-center rounded-md border text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'border-nebula/70 bg-nebula/12 text-nebula'
                              : attempt
                                ? attempt.is_correct
                                  ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 hover:border-emerald-500/55'
                                  : 'border-rose-500/35 bg-rose-500/10 text-rose-700 hover:border-rose-500/55'
                                : 'border-line bg-surface-tint text-slate-600 opacity-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <section className="space-y-6">
                  <div className="glass-panel overflow-hidden rounded-lg">
                    <div className="border-b border-line p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="mb-3 text-xs uppercase tracking-widest text-nebula">{selectedStep.source}</div>
                          <h2 className="text-balance font-serif text-2xl text-ink md:text-3xl">{selectedStep.title}</h2>
                          {selectedStep.tags?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {selectedStep.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-nebula/20 bg-nebula/8 px-3 py-1 text-xs text-slate-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div
                          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                            selectedAttempt?.is_correct
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                              : 'border-rose-500/30 bg-rose-500/10 text-rose-700'
                          }`}
                        >
                          {selectedAttempt?.is_correct ? t.admin.correct : t.admin.incorrect}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                        <div className="rounded-lg border border-line bg-surface-muted p-4">
                          <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-500">{t.practice.setup}</div>
                          <p className="text-sm leading-relaxed text-ink-soft">
                            <MathText>{selectedStep.context}</MathText>
                          </p>
                        </div>
                        <div className="rounded-lg border border-line bg-surface-tint p-4">
                          <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-500">{t.practice.task}</div>
                          <div className="space-y-2 text-base leading-relaxed text-ink">
                            {splitPromptParts(selectedStep.prompt).map((part) => (
                              <p key={part}>
                                <MathText>{part}</MathText>
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <EquationBlock equations={selectedStep.equations} label={t.practice.equations} />
                        <QuestionMedia step={selectedStep} label={t.practice.diagram} />
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 md:p-8">
                      {selectedStep.choices?.length ? (
                        <div>
                          <div className="mb-3 text-xs uppercase tracking-widest text-slate-500">{t.admin.answerReview}</div>
                          <div className="grid gap-3">
                            {selectedStep.choices.map((choice) => {
                              const isStudentAnswer = selectedAttempt?.answer === choice.label;
                              const isCorrectChoice = selectedStep.correctAnswer === choice.label;
                              return (
                                <div
                                  key={choice.label}
                                  className={`grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-lg border p-3 text-left sm:grid-cols-[40px_minmax(0,1fr)] sm:p-4 ${
                                    isCorrectChoice
                                      ? 'border-emerald-500/50 bg-emerald-500/10'
                                      : isStudentAnswer
                                        ? 'border-rose-500/50 bg-rose-500/10'
                                        : 'border-line bg-surface-tint'
                                  }`}
                                >
                                  <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-bold text-on-accent">
                                    {choice.label}
                                  </span>
                                  <span className="self-center text-sm leading-relaxed text-ink md:text-base">
                                    {choice.image ? (
                                      <>
                                        <img src={choice.image.src} alt={choice.image.alt} className="practice-choice-image" />
                                        <span className="sr-only">{choice.text}</span>
                                      </>
                                    ) : (
                                      <MathText>{choice.text}</MathText>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-line bg-surface-muted p-4">
                          <div className="mb-2 text-xs uppercase tracking-widest text-slate-500">{t.admin.studentAnswer}</div>
                          {selectedAttempt?.answer_image_url ? (
                            <a
                              href={selectedAttempt.answer_image_url}
                              target="_blank"
                              rel="noreferrer"
                              className="block overflow-hidden rounded-lg border border-line bg-white"
                              title={language === 'zh' ? '点击放大查看' : 'Click to open full size'}
                            >
                              <img
                                src={selectedAttempt.answer_image_url}
                                alt={language === 'zh' ? '学生答案图片' : 'Student answer image'}
                                className="max-h-[480px] w-full object-contain"
                              />
                            </a>
                          ) : null}
                          <p className={`whitespace-pre-wrap text-sm leading-relaxed text-ink-soft ${selectedAttempt?.answer_image_url ? 'mt-2' : ''}`}>
                            {selectedAttempt?.answer || (selectedAttempt?.answer_image_url ? '' : t.admin.emptyAnswer)}
                          </p>
                        </div>
                      )}

                      <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
                        <div className="rounded-lg border border-line bg-surface-tint p-4">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.studentAnswer}</div>
                          <div className="mt-1 text-2xl font-semibold">
                            {selectedAttempt?.answer || (selectedAttempt?.answer_image_url ? (language === 'zh' ? '图片' : 'Image') : '-')}
                          </div>
                        </div>
                        <div className="rounded-lg border border-line bg-surface-tint p-4">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.correctAnswer}</div>
                          <div className="mt-1 text-2xl font-semibold">{selectedStep.correctAnswer ?? '-'}</div>
                        </div>
                        <div className="rounded-lg border border-line bg-surface-tint p-4">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.score}</div>
                          <div className="mt-1 text-2xl font-semibold">
                            {selectedResult ? `${selectedResult.score}/${selectedResult.maxScore}` : '-'}
                          </div>
                        </div>
                      </div>

                      {selectedStep.solution && (
                        <div className="mt-5 rounded-lg border border-line bg-surface-muted p-4">
                          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500">
                            <FileText className="h-4 w-4" />
                            {t.admin.solution}
                          </div>
                          <p className="text-sm leading-relaxed text-ink-soft">
                            <MathText>{selectedStep.solution}</MathText>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="glass-panel rounded-lg p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500">
                      <BarChart3 className="h-4 w-4" />
                      {t.admin.resultDetails}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-xs font-semibold text-emerald-700">{t.practice.hitPoints}</div>
                        <div className="space-y-2">
                          {selectedResult?.hits.length ? (
                            selectedResult.hits.map((hit) => (
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
                        <div className="mb-2 text-xs font-semibold text-amber-700">{t.practice.missingPoints}</div>
                        <div className="space-y-2">
                          {selectedResult?.misses.length ? (
                            selectedResult.misses.map((miss) => (
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
                  </div>
                </section>
              </div>
            </>
          ) : (
            <div className="glass-panel rounded-lg p-8 text-sm text-slate-500">{loading ? t.admin.loadingRecords : t.admin.noRecords}</div>
          )}
        </div>
      </div>

      {/* Permission Management */}
      <PermissionManager />
    </motion.section>
  );
};

// --- Permission Manager ---

interface ProfileRow {
  user_id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
}

interface PermissionRow {
  user_id: string;
  system: string;
}

const SYSTEM_LABELS_KEY: Record<string, 'systemApCMech' | 'systemApCEm' | 'systemIgcse'> = {
  'ap-c-mech': 'systemApCMech',
  'ap-c-em': 'systemApCEm',
  igcse: 'systemIgcse',
};

const PermissionManager: React.FC = () => {
  const { language, t } = useLanguage();
  const { isAdmin, user } = useAuth();
  const supabase = getSupabaseClient();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [permissions, setPermissions] = useState<PermissionRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    setLoading(true);
    const [profilesRes, permsRes] = await Promise.all([
      supabase.from('profiles').select('user_id, email, display_name, created_at').order('created_at', { ascending: true }),
      supabase.from('practice_permissions').select('user_id, system'),
    ]);
    setProfiles((profilesRes.data ?? []) as ProfileRow[]);
    setPermissions((permsRes.data ?? []) as PermissionRow[]);
    setLoading(false);
  }, [supabase, isAdmin]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const permSet = useMemo(() => {
    const set = new Set<string>();
    permissions.forEach((p) => set.add(`${p.user_id}:${p.system}`));
    return set;
  }, [permissions]);

  const togglePermission = async (userId: string, system: string) => {
    if (!supabase) return;
    const key = `${userId}:${system}`;
    if (permSet.has(key)) {
      await supabase.from('practice_permissions').delete().eq('user_id', userId).eq('system', system);
      setPermissions((prev) => prev.filter((p) => !(p.user_id === userId && p.system === system)));
    } else {
      await supabase.from('practice_permissions').insert({ user_id: userId, system, granted_by: user?.id ?? null });
      setPermissions((prev) => [...prev, { user_id: userId, system }]);
    }
  };

  const updateDisplayName = async (userId: string, name: string) => {
    if (!supabase) return;
    await supabase.from('profiles').update({ display_name: name }).eq('user_id', userId);
    setProfiles((prev) => prev.map((p) => (p.user_id === userId ? { ...p, display_name: name } : p)));
  };

  if (!isAdmin) return null;

  return (
    <div className="mt-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-4 w-4 text-nebula" />
          <h2 className="text-lg font-serif text-ink">{t.admin.permissions}</h2>
        </div>
        <p className="text-sm text-ink-soft">{t.admin.permissionsDesc}</p>
      </div>

      {loading ? (
        <div className="glass-panel rounded-lg p-6 text-sm text-slate-500">{t.admin.loadingRecords}</div>
      ) : profiles.length === 0 ? (
        <div className="glass-panel rounded-lg p-6 text-sm text-slate-500">{t.admin.noUsers}</div>
      ) : (
        <div className="glass-panel overflow-x-auto rounded-lg">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-4 py-3">{t.admin.registeredUsers}</th>
                {ALL_SYSTEMS.map((sys) => (
                  <th key={sys} className="px-4 py-3 text-center">{t.admin[SYSTEM_LABELS_KEY[sys]]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.user_id} className="border-b border-line hover:bg-surface-tint-strong">
                  <td className="px-4 py-3">
                    <input
                      defaultValue={profile.display_name || ''}
                      placeholder={profile.email || profile.user_id.slice(0, 8)}
                      onBlur={(e) => { if (e.target.value !== (profile.display_name || '')) updateDisplayName(profile.user_id, e.target.value); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                      className="w-full max-w-[180px] rounded border border-line bg-surface-tint px-2 py-1 text-sm text-ink placeholder:text-slate-600 focus:border-nebula focus:outline-none"
                    />
                    <div className="text-xs text-slate-500 mt-1">{profile.email}</div>
                  </td>
                  {ALL_SYSTEMS.map((sys) => {
                    const granted = permSet.has(`${profile.user_id}:${sys}`);
                    return (
                      <td key={sys} className="px-4 py-3 text-center">
                        <button
                          onClick={() => togglePermission(profile.user_id, sys)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            granted
                              ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 hover:bg-emerald-500/25'
                              : 'bg-surface-tint text-slate-500 border border-line hover:border-line-strong hover:text-ink-soft'
                          }`}
                        >
                          {granted ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          {granted ? t.admin.revokeAccess : t.admin.grantAccess}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
