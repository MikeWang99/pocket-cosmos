import React, { useMemo, useState } from 'react';
import {
  Archive,
  ArrowDown,
  ArrowUp,
  Bot,
  CalendarClock,
  ClipboardList,
  ClipboardPlus,
  Copy,
  Eye,
  FileEdit,
  Pencil,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  Undo2,
  UsersRound,
} from 'lucide-react';
import { practiceSets } from '../data/practiceSets';
import { isSupabaseUuid, questionsFromNumbers, resolveHomeworkItem } from '../homework/catalog';
import type { CreateHomeworkInput, HomeworkAssignment, HomeworkProfile } from '../homework/types';
import { useHomeworkData } from '../hooks/useHomeworkData';
import { useLanguage } from '../LanguageContext';
import { HomeworkQuestionReview } from './HomeworkQuestionReview';

type AdminView = 'overview' | 'create';

const formatDue = (value: string | null, language: 'en' | 'zh') => {
  if (!value) return language === 'zh' ? '无截止日期' : 'No due date';
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

const dedupeItems = (items: Array<{ practiceSetId: string; questionId: string }>) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.practiceSetId}:${item.questionId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const getAiSuggestion = (instruction: string, fallbackSetId: string) => {
  const normalized = instruction.toLowerCase();
  const topicMap: Array<[RegExp, string]> = [
    [/运动|motion|speed|acceleration|kinematics/, 'igcse-cie-topic-1-2'],
    [/力|force|dynamics|equilibrium|hooke/, 'igcse-cie-topic-1-5'],
    [/动量|momentum|collision|impulse/, 'igcse-cie-topic-1-6'],
    [/能量|energy|work|power/, 'igcse-cie-topic-1-7'],
    [/电路|circuit|resistance|电阻/, 'igcse-cie-topic-4-3'],
    [/放射|radioactivity|half.?life|半衰期/, 'igcse-cie-topic-5-2'],
  ];
  const setId = topicMap.find(([pattern]) => pattern.test(normalized))?.[1] ?? fallbackSetId;
  const set = practiceSets.find((candidate) => candidate.id === setId) ?? practiceSets[0];
  const requestedCount = Number(instruction.match(/(\d+)\s*(?:道|题|questions?)/i)?.[1] ?? 8);
  const count = Math.min(Math.max(requestedCount, 3), 20);
  const difficulty = /挑战|进阶|challenge|hard/i.test(instruction)
    ? 'hard'
    : /基础|简单|foundation|easy/i.test(instruction)
      ? 'easy'
      : 'mixed';
  const candidates = set.steps.filter((step) => {
    if (difficulty === 'hard') return (step.difficulty ?? 3) >= 4;
    if (difficulty === 'easy') return (step.difficulty ?? 3) <= 2;
    return true;
  });
  const selected = (candidates.length >= count ? candidates : set.steps).slice(0, count);
  return {
    set,
    items: selected.map((step) => ({ practiceSetId: set.id, questionId: step.id })),
  };
};

const statusStyle: Record<HomeworkAssignment['status'], string> = {
  draft: 'border-amber-500/25 bg-amber-500/10 text-amber-700',
  published: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700',
  archived: 'border-line bg-surface-tint text-ink-soft',
};

export const HomeworkAdminPanel: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language } = useLanguage();
  const {
    assignments,
    attempts,
    profiles,
    loading,
    error,
    demoMode,
    currentStudentId,
    createAssignment,
    updateAssignment,
    updateAssignmentStatus,
    resetDemo,
  } = useHomeworkData();
  const [view, setView] = useState<AdminView>('overview');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReviewQuestionKey, setSelectedReviewQuestionKey] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [selectedSetId, setSelectedSetId] = useState('igcse-cie-topic-1-2');
  const [questionNumbers, setQuestionNumbers] = useState('');
  const [draftItems, setDraftItems] = useState<Array<{ practiceSetId: string; questionId: string }>>([]);
  const [assignedToAll, setAssignedToAll] = useState(false);
  const [studentIds, setStudentIds] = useState<string[]>(
    demoMode ? ['demo-student-eden'] : [],
  );
  const [aiInstruction, setAiInstruction] = useState('');
  const [sourceType, setSourceType] = useState<'manual' | 'ai'>('manual');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [savingStatus, setSavingStatus] = useState<'draft' | 'published' | null>(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);

  const selectedAssignment =
    assignments.find((assignment) => assignment.id === selectedAssignmentId) ??
    assignments.find((assignment) => assignment.status === 'published') ??
    assignments[0] ??
    null;

  const resetEditor = () => {
    setTitle('');
    setDescription('');
    setDueAt('');
    setDraftItems([]);
    setQuestionNumbers('');
    setAiInstruction('');
    setSourceType('manual');
    setAssignedToAll(false);
    setStudentIds(demoMode ? ['demo-student-eden'] : []);
    setEditingAssignmentId(null);
    setFormMessage(null);
  };

  const startNewAssignment = () => {
    resetEditor();
    setView('create');
  };

  const startEditingAssignment = (assignment: HomeworkAssignment) => {
    if (assignment.status !== 'draft') return;
    setEditingAssignmentId(assignment.id);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueAt(assignment.dueAt ? new Date(assignment.dueAt).toISOString().slice(0, 16) : '');
    setDraftItems(assignment.items.map((item) => ({ practiceSetId: item.practiceSetId, questionId: item.questionId })));
    setSelectedSetId(assignment.items[0]?.practiceSetId ?? 'igcse-cie-topic-1-2');
    setAssignedToAll(assignment.assignedToAll);
    setStudentIds(assignment.studentIds);
    setAiInstruction(assignment.aiInstruction ?? '');
    setSourceType(assignment.sourceType);
    setQuestionNumbers('');
    setFormMessage(language === 'zh' ? '正在编辑已保存的线上草稿。' : 'Editing the saved online draft.');
    setView('create');
  };

  const startDuplicatingAssignment = (assignment: HomeworkAssignment) => {
    resetEditor();
    setStudentIds([]);
    setAssignedToAll(false);
    setTitle(
      language === 'zh'
        ? `${assignment.title}（副本）`
        : `${assignment.title} (Copy)`,
    );
    setDescription(assignment.description);
    setDueAt(assignment.dueAt ? new Date(assignment.dueAt).toISOString().slice(0, 16) : '');
    setDraftItems(assignment.items.map((item) => ({ practiceSetId: item.practiceSetId, questionId: item.questionId })));
    setSelectedSetId(assignment.items[0]?.practiceSetId ?? 'igcse-cie-topic-1-2');
    setAiInstruction(assignment.aiInstruction ?? '');
    setSourceType(assignment.sourceType);
    setFormMessage(
      language === 'zh'
        ? '已复制题目列表，请选择要布置给哪些学生，然后发布。'
        : 'Questions copied. Choose the students to assign, then publish.',
    );
    setView('create');
  };

  const addQuestionNumbers = () => {
    const parsed = questionsFromNumbers(selectedSetId, questionNumbers);
    if (!parsed.items.length) {
      setFormMessage(language === 'zh' ? '没有找到可添加的题号。' : 'No valid question numbers were found.');
      return;
    }
    setDraftItems((current) => dedupeItems([...current, ...parsed.items]));
    setQuestionNumbers('');
    setSourceType('manual');
    setFormMessage(
      parsed.missing.length
        ? language === 'zh'
          ? `已添加有效题目；未找到：${parsed.missing.join(', ')}。`
          : `Valid questions added; not found: ${parsed.missing.join(', ')}.`
        : language === 'zh'
          ? `已加入 ${parsed.items.length} 道题。`
          : `${parsed.items.length} questions added.`,
    );
  };

  const generateAiDraft = () => {
    if (!aiInstruction.trim()) {
      setFormMessage(language === 'zh' ? '请先输入 AI 选题要求。' : 'Enter an AI selection instruction first.');
      return;
    }
    const suggestion = getAiSuggestion(aiInstruction, selectedSetId);
    setSelectedSetId(suggestion.set.id);
    setDraftItems(dedupeItems(suggestion.items));
    setSourceType('ai');
    if (!title) {
      setTitle(language === 'zh' ? `${suggestion.set.label} · AI 作业` : `${suggestion.set.label} · AI Homework`);
    }
    setFormMessage(
      language === 'zh'
        ? `AI 草案已匹配到 ${suggestion.set.label}，共 ${suggestion.items.length} 道题。发布前可继续调整。`
        : `AI draft matched ${suggestion.set.label} with ${suggestion.items.length} questions. Review before publishing.`,
    );
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draftItems.length) return;
    setDraftItems((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const submit = async (status: 'draft' | 'published') => {
    if (!title.trim() || !draftItems.length) {
      setFormMessage(language === 'zh' ? '请填写作业名称并至少添加一道题。' : 'Add a title and at least one question.');
      return;
    }
    const profileIds = new Set(profiles.map((profile) => profile.userId));
    const audienceStudentIds = demoMode
      ? studentIds
      : studentIds.filter((studentId) => isSupabaseUuid(studentId) && profileIds.has(studentId));
    if (!assignedToAll && !audienceStudentIds.length) {
      setFormMessage(
        language === 'zh'
          ? '请选择至少一名有效学生，或选择“发布给全部学生”。'
          : 'Select at least one valid student or assign to everyone.',
      );
      return;
    }
    setFormMessage(null);
    setSavingStatus(status);
    try {
      const input: CreateHomeworkInput = {
        title: title.trim(),
        description: description.trim(),
        dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        status,
        sourceType,
        assignedToAll,
        studentIds: audienceStudentIds,
        aiInstruction: sourceType === 'ai' ? aiInstruction : undefined,
        items: draftItems,
      };
      const result = editingAssignmentId
        ? await updateAssignment(editingAssignmentId, input)
        : await createAssignment(input);
      if (result.error) {
        setFormMessage(result.error);
        return;
      }
      setFormMessage(language === 'zh' ? (status === 'published' ? '作业已发布。' : '草稿已保存。') : status === 'published' ? 'Homework published.' : 'Draft saved.');
      resetEditor();
      setView('overview');
      if (result.assignment) setSelectedAssignmentId(result.assignment.id);
    } catch {
      setFormMessage(
        language === 'zh'
          ? '发布失败，请稍后重试。'
          : 'Publishing failed. Please try again.',
      );
    } finally {
      setSavingStatus(null);
    }
  };

  const students = useMemo(() => {
    const map = new Map<string, HomeworkProfile>();
    profiles.forEach((profile) => map.set(profile.userId, profile));
    if (!demoMode) map.delete(currentStudentId);
    attempts.forEach((attempt) => {
      if (!map.has(attempt.studentId) && !(attempt.studentId === currentStudentId && !demoMode)) {
        map.set(attempt.studentId, {
          userId: attempt.studentId,
          email: attempt.studentEmail ?? attempt.studentId.slice(0, 8),
          displayName: attempt.studentEmail?.split('@')[0] ?? attempt.studentId.slice(0, 8),
        });
      }
    });
    assignments.forEach((assignment) => {
      assignment.studentIds.forEach((studentId) => {
        if (!map.has(studentId) && !(studentId === currentStudentId && !demoMode)) {
          map.set(studentId, { userId: studentId, email: studentId.slice(0, 8), displayName: studentId.slice(0, 8) });
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [assignments, attempts, currentStudentId, demoMode, profiles]);

  const selectedStudent =
    students.find((student) => student.userId === selectedStudentId) ?? students[0] ?? null;

  const studentAssignments = useMemo(() => {
    if (!selectedStudent) return [];
    const studentId = selectedStudent.userId;
    return assignments.filter(
      (assignment) => assignment.assignedToAll || assignment.studentIds.includes(studentId),
    );
  }, [assignments, selectedStudent]);

  // 保存时未勾选学生的草稿不属于任何学生，单独展示，避免在后台中丢失。
  const unassignedDrafts = useMemo(
    () => assignments.filter((assignment) => !assignment.assignedToAll && assignment.studentIds.length === 0),
    [assignments],
  );

  const getStudentAssignmentStats = (assignment: HomeworkAssignment, studentId: string) => {
    const itemKeys = new Set(
      assignment.items.map((item) => `${item.practiceSetId}:${item.questionId}`),
    );
    const studentAttempts = attempts.filter(
      (attempt) =>
        attempt.studentId === studentId &&
        itemKeys.has(`${attempt.practiceSetId}:${attempt.questionId}`),
    );
    const completed = new Set(
      studentAttempts.map((attempt) => `${attempt.practiceSetId}:${attempt.questionId}`),
    ).size;
    const correct = studentAttempts.filter((attempt) => attempt.isCorrect).length;
    const latest = studentAttempts.map((attempt) => attempt.updatedAt).sort().at(-1);
    return {
      completed,
      total: assignment.items.length,
      accuracy: studentAttempts.length ? Math.round((correct / studentAttempts.length) * 100) : 0,
      latest,
    };
  };
  const viewingAssignment =
    selectedAssignment &&
    (studentAssignments.some((assignment) => assignment.id === selectedAssignment.id) ||
      unassignedDrafts.some((assignment) => assignment.id === selectedAssignment.id))
      ? selectedAssignment
      : null;

  const selectedStudentAttemptMap = useMemo(() => {
    if (!viewingAssignment || !selectedStudent) return new Map();
    const itemKeys = new Set(
      viewingAssignment.items.map((item) => `${item.practiceSetId}:${item.questionId}`),
    );
    return attempts
      .filter(
        (attempt) =>
          attempt.studentId === selectedStudent.userId &&
          itemKeys.has(`${attempt.practiceSetId}:${attempt.questionId}`),
      )
      .reduce<Map<string, (typeof attempts)[number]>>((map, attempt) => {
        map.set(`${attempt.practiceSetId}:${attempt.questionId}`, attempt);
        return map;
      }, new Map());
  }, [attempts, selectedStudent, viewingAssignment]);

  const reviewItems = useMemo(() => {
    if (!viewingAssignment) return [];
    return viewingAssignment.items.map((item, index) => {
      const key = `${item.practiceSetId}:${item.questionId}`;
      return {
        key,
        index,
        item,
        resolved: resolveHomeworkItem(item),
        attempt: selectedStudentAttemptMap.get(key),
      };
    });
  }, [selectedStudentAttemptMap, viewingAssignment]);
  const selectedReviewItem =
    reviewItems.find((entry) => entry.key === selectedReviewQuestionKey) ??
    reviewItems.find((entry) => entry.attempt && !entry.attempt.isCorrect) ??
    reviewItems.find((entry) => entry.attempt) ??
    reviewItems[0] ??
    null;
  const correctReviewCount = reviewItems.filter((entry) => entry.attempt?.isCorrect).length;
  const incorrectReviewCount = reviewItems.filter(
    (entry) => entry.attempt && !entry.attempt.isCorrect,
  ).length;
  const unansweredReviewCount = reviewItems.filter((entry) => !entry.attempt).length;

  if (loading) {
    return <div className="glass-panel rounded-xl p-8 text-sm text-ink-soft">{language === 'zh' ? '正在加载作业后台…' : 'Loading homework admin…'}</div>;
  }

  return (
    <section className={compact ? 'mt-10' : ''}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-nebula">
            <ClipboardPlus className="h-4 w-4" />
            {language === 'zh' ? '作业管理' : 'Homework Admin'}
          </div>
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">
            {language === 'zh' ? '创建、发布与查看整体完成情况' : 'Create, publish, and review completion'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoMode && (
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink-soft hover:border-line-strong hover:text-ink"
            >
              {language === 'zh' ? '重置演示数据' : 'Reset demo'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setView('overview')}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === 'overview' ? 'border-nebula/60 bg-nebula/15 text-ink' : 'border-line text-ink-soft'}`}
          >
            <Eye className="mr-1.5 inline h-3.5 w-3.5" />
            {language === 'zh' ? '作业与数据' : 'Assignments'}
          </button>
          <button
            type="button"
            onClick={startNewAssignment}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === 'create' ? 'border-nebula/60 bg-nebula/15 text-ink' : 'border-line text-ink-soft'}`}
          >
            <Plus className="mr-1.5 inline h-3.5 w-3.5" />
            {language === 'zh' ? '添加作业' : 'New assignment'}
          </button>
        </div>
      </div>

      {demoMode && (
        <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-xs leading-6 text-cyan-800">
          {language === 'zh'
            ? 'Preview 演示模式：创建、发布、做题和进度联动均可测试；数据保存在当前浏览器。上线时切换到 Supabase 表即可。'
            : 'Preview demo mode: creation, publishing, answering, and progress sync are testable. Data stays in this browser; production uses Supabase.'}
        </div>
      )}
      {error && <div className="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-800">{error}</div>}

      {view === 'overview' ? (
        <div className="space-y-5">
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center gap-2 px-1 pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              <UsersRound className="h-3.5 w-3.5" />
              {language === 'zh' ? `学生（${students.length}）` : `Students (${students.length})`}
            </div>
            {students.length ? (
              <div className="flex flex-wrap gap-2">
                {students.map((student) => {
                  const active = selectedStudent?.userId === student.userId;
                  return (
                    <button
                      key={student.userId}
                      type="button"
                      onClick={() => {
                        setSelectedStudentId(student.userId);
                        setSelectedAssignmentId(null);
                        setSelectedReviewQuestionKey(null);
                      }}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                        active
                          ? 'border-nebula/60 bg-nebula/15 text-ink'
                          : 'border-line bg-surface-tint text-ink-soft hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {student.displayName}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-1 text-sm text-slate-500">
                {language === 'zh' ? '暂时没有学生记录。' : 'No students yet.'}
              </div>
            )}
          </div>

          {!!unassignedDrafts.length && (
            <div className="glass-panel overflow-hidden rounded-xl">
              <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <FileEdit className="h-4 w-4 text-nebula" />
                  {language === 'zh' ? '未分配学生的草稿' : 'Unassigned drafts'}
                </div>
                <span className="text-xs text-slate-500">
                  {language === 'zh'
                    ? `${unassignedDrafts.length} 份 · 编辑后可选择学生发布`
                    : `${unassignedDrafts.length} · edit, pick students, then publish`}
                </span>
              </div>
              <div className="divide-y divide-line">
                {unassignedDrafts.map((assignment) => (
                  <div key={assignment.id} className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-ink">{assignment.title}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider ${statusStyle[assignment.status]}`}>
                          {assignment.status}
                        </span>
                        {assignment.sourceType === 'ai' && <Bot className="h-3.5 w-3.5 text-nebula" />}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                        <span>{assignment.items.length} {language === 'zh' ? '题' : 'questions'}</span>
                        <span>{formatDue(assignment.dueAt, language)}</span>
                        <span className="text-amber-600">
                          {language === 'zh' ? '尚未选择学生' : 'No students selected'}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditingAssignment(assignment)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-nebula/50 bg-nebula/10 px-3 py-1.5 text-xs font-semibold text-ink hover:border-nebula"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {language === 'zh' ? '编辑并分配' : 'Edit & assign'}
                      </button>
                      <button
                        type="button"
                        onClick={() => startDuplicatingAssignment(assignment)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-line-strong hover:text-ink"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {language === 'zh' ? '复制' : 'Duplicate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStudent ? (
            <>
              <div className="glass-panel overflow-hidden rounded-xl">
                <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-ink">{selectedStudent.displayName}</span>
                    <span className="text-xs text-slate-500">{selectedStudent.email}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {language === 'zh' ? `${studentAssignments.length} 份作业` : `${studentAssignments.length} assignments`}
                  </span>
                </div>
                {studentAssignments.length ? (
                  <div className="divide-y divide-line">
                    {studentAssignments.map((assignment) => {
                      const stats = getStudentAssignmentStats(assignment, selectedStudent.userId);
                      const percent = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
                      const isViewing = viewingAssignment?.id === assignment.id;
                      return (
                        <div key={assignment.id} className={`flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between ${isViewing ? 'bg-nebula/5' : ''}`}>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-ink">{assignment.title}</span>
                              <span className={`rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider ${statusStyle[assignment.status]}`}>
                                {assignment.status}
                              </span>
                              {assignment.sourceType === 'ai' && <Bot className="h-3.5 w-3.5 text-nebula" />}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                              <span>{assignment.items.length} {language === 'zh' ? '题' : 'questions'}</span>
                              <span>{formatDue(assignment.dueAt, language)}</span>
                              <span>
                                {language === 'zh' ? '完成' : 'Done'} {stats.completed}/{stats.total}
                              </span>
                              <span>{language === 'zh' ? '正确率' : 'Accuracy'} {stats.accuracy}%</span>
                              <span>{language === 'zh' ? '最近作答' : 'Last'} {stats.latest ? formatDue(stats.latest, language) : '—'}</span>
                            </div>
                            <div className="mt-2 h-1.5 w-48 max-w-full overflow-hidden rounded-full bg-surface-tint-strong">
                              <div className="h-full rounded-full bg-nebula" style={{ width: `${percent}%` }} />
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAssignmentId(isViewing ? null : assignment.id);
                                setSelectedReviewQuestionKey(null);
                                if (!isViewing && typeof window !== 'undefined') {
                                  window.requestAnimationFrame(() => {
                                    document.getElementById('assignment-answer-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  });
                                }
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                isViewing
                                  ? 'border-nebula/50 bg-nebula/15 text-ink'
                                  : 'border-line text-ink-soft hover:border-line-strong hover:text-ink'
                              }`}
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {isViewing
                                ? language === 'zh' ? '收起' : 'Hide'
                                : language === 'zh' ? '查看' : 'View'}
                            </button>
                            <button
                              type="button"
                              onClick={() => startDuplicatingAssignment(assignment)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-line-strong hover:text-ink"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              {language === 'zh' ? '复制' : 'Duplicate'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-5 py-10 text-center text-sm text-slate-500">
                    {language === 'zh'
                      ? '该学生还没有被分配任何作业。'
                      : 'This student has no assignments yet.'}
                  </div>
                )}
              </div>

              {viewingAssignment && (
                <div id="assignment-answer-review" className="scroll-mt-6 space-y-4">
                    <div className="glass-panel rounded-xl p-4 sm:p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                        <div className="flex items-baseline gap-3">
                          <span className="text-sm font-semibold text-ink">{viewingAssignment.title}</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider ${statusStyle[viewingAssignment.status]}`}>
                            {viewingAssignment.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {viewingAssignment.status === 'draft' && (
                            <button
                              type="button"
                              onClick={() => startEditingAssignment(viewingAssignment)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-line-strong hover:text-ink"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              {language === 'zh' ? '编辑草稿' : 'Edit draft'}
                            </button>
                          )}
                          {viewingAssignment.status === 'draft' && (
                            <button
                              type="button"
                              onClick={() => void updateAssignmentStatus(viewingAssignment.id, 'published')}
                              className="inline-flex items-center gap-1.5 rounded-full bg-nebula px-3 py-1.5 text-xs font-bold text-on-accent"
                            >
                              <Rocket className="h-3.5 w-3.5" />
                              {language === 'zh' ? '发布' : 'Publish'}
                            </button>
                          )}
                          {viewingAssignment.status === 'published' && (
                            <button
                              type="button"
                              onClick={() => void updateAssignmentStatus(viewingAssignment.id, 'draft')}
                              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-800"
                            >
                              <Undo2 className="h-3.5 w-3.5" />
                              {language === 'zh' ? '撤回' : 'Withdraw'}
                            </button>
                          )}
                          {viewingAssignment.status !== 'archived' && (
                            <button
                              type="button"
                              onClick={() => void updateAssignmentStatus(viewingAssignment.id, 'archived')}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft"
                            >
                              <Archive className="h-3.5 w-3.5" />
                              {language === 'zh' ? '归档' : 'Archive'}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold uppercase tracking-widest text-nebula">
                            {language === 'zh' ? '整份作业复盘' : 'Full assignment review'}
                          </div>
                          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="font-serif text-xl text-ink sm:text-2xl">
                              {selectedStudent.displayName} · {viewingAssignment.title}
                            </h3>
                            <span className="text-xs text-slate-500">{selectedStudent.email}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
                            <div className="text-[9px] uppercase tracking-widest text-emerald-700">{language === 'zh' ? '正确' : 'Correct'}</div>
                            <div className="mt-0.5 text-lg font-semibold text-emerald-700">{correctReviewCount}</div>
                          </div>
                          <div className="rounded-lg border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2">
                            <div className="text-[9px] uppercase tracking-widest text-rose-700">{language === 'zh' ? '错误' : 'Wrong'}</div>
                            <div className="mt-0.5 text-lg font-semibold text-rose-700">{incorrectReviewCount}</div>
                          </div>
                          <div className="rounded-lg border border-line bg-surface-tint px-3 py-2">
                            <div className="text-[9px] uppercase tracking-widest text-slate-500">{language === 'zh' ? '未答' : 'Open'}</div>
                            <div className="mt-0.5 text-lg font-semibold text-ink-soft">{unansweredReviewCount}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
                      <aside className="glass-panel h-fit rounded-xl p-3 lg:sticky lg:top-6">
                        <div className="flex items-center gap-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                          <ClipboardList className="h-3.5 w-3.5" />
                          {language === 'zh' ? '题目导航' : 'Question navigator'}
                        </div>
                        <div className="grid grid-cols-6 gap-1.5 px-1 pb-2 sm:grid-cols-10 lg:grid-cols-4">
                          {reviewItems.map((entry) => {
                            const selected = entry.key === selectedReviewItem?.key;
                            return (
                              <button
                                key={entry.key}
                                type="button"
                                onClick={() => setSelectedReviewQuestionKey(entry.key)}
                                title={entry.resolved?.step.title ?? entry.item.questionTitle ?? entry.item.questionId}
                                className={`grid h-9 w-9 place-items-center rounded-md border text-xs font-semibold transition-colors ${
                                  selected
                                    ? 'border-nebula/80 bg-nebula/20 text-ink ring-1 ring-nebula/30'
                                    : entry.attempt?.isCorrect
                                      ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 hover:border-emerald-400'
                                      : entry.attempt
                                        ? 'border-rose-500/35 bg-rose-500/10 text-rose-700 hover:border-rose-400'
                                        : 'border-line bg-surface-tint text-slate-600 hover:border-line-strong'
                                }`}
                              >
                                {entry.index + 1}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-1 space-y-1 border-t border-line px-2 pt-3 text-[10px] text-slate-500">
                          <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400" />{language === 'zh' ? '错误，建议优先讲解' : 'Incorrect — review first'}</div>
                          <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />{language === 'zh' ? '回答正确' : 'Correct'}</div>
                          <div><span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-700" />{language === 'zh' ? '尚未作答' : 'Not answered'}</div>
                        </div>
                      </aside>

                      {selectedReviewItem?.resolved ? (
                        <HomeworkQuestionReview
                          step={selectedReviewItem.resolved.step}
                          attempt={selectedReviewItem.attempt}
                          questionNumber={selectedReviewItem.index + 1}
                          total={reviewItems.length}
                          setLabel={selectedReviewItem.resolved.setLabel}
                          language={language}
                        />
                      ) : (
                        <div className="glass-panel rounded-xl p-8 text-sm text-slate-500">
                          {language === 'zh'
                            ? '无法从题库中读取这道题的完整内容。'
                            : 'The full source question could not be resolved.'}
                        </div>
                      )}
                    </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass-panel rounded-xl p-10 text-center text-sm text-slate-500">
              {language === 'zh' ? '还没有学生记录。' : 'No students yet.'}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <div className="glass-panel rounded-xl p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-nebula" />
              <h3 className="font-serif text-xl text-ink">
                {editingAssignmentId
                  ? language === 'zh' ? '编辑线上草稿' : 'Edit online draft'
                  : language === 'zh' ? '作业信息与题目' : 'Assignment details'}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs text-ink-soft">{language === 'zh' ? '作业名称' : 'Title'}</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none focus:border-nebula" placeholder={language === 'zh' ? '例如：运动学第 4 次课作业' : 'e.g. Motion · Lesson 04'} />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs text-ink-soft">{language === 'zh' ? '给学生的说明' : 'Student instructions'}</span>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-24 w-full rounded-lg border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none focus:border-nebula" />
              </label>
              <label>
                <span className="mb-2 block text-xs text-ink-soft">{language === 'zh' ? '截止时间' : 'Due date'}</span>
                <input type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} className="w-full rounded-lg border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none focus:border-nebula" />
              </label>
              <label>
                <span className="mb-2 block text-xs text-ink-soft">{language === 'zh' ? '题库章节' : 'Question bank'}</span>
                <select value={selectedSetId} onChange={(event) => setSelectedSetId(event.target.value)} className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-nebula">
                  {practiceSets.map((set) => (
                    <option key={set.id} value={set.id}>{set.system.toUpperCase()} · {set.label} ({set.steps.length})</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 rounded-xl border border-line bg-surface-tint p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={questionNumbers}
                  onChange={(event) => setQuestionNumbers(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter') addQuestionNumbers(); }}
                  className="min-h-11 flex-1 rounded-lg border border-line bg-surface-muted px-4 text-sm text-ink outline-none focus:border-nebula"
                  placeholder={language === 'zh' ? '输入题号，如：1, 2, 5-8' : 'Question numbers, e.g. 1, 2, 5-8'}
                />
                <button type="button" onClick={addQuestionNumbers} className="min-h-11 rounded-lg bg-slate-900 px-5 text-xs font-bold text-on-accent hover:bg-nebula hover:text-on-accent">
                  <Plus className="mr-1.5 inline h-4 w-4" />
                  {language === 'zh' ? '加入作业' : 'Add'}
                </button>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {language === 'zh'
                  ? '题号按当前所选题库中的显示顺序解析。加入后会保存原题库 ID，保证进度联动。'
                  : 'Numbers follow the selected bank order. Stable source IDs are stored for progress sync.'}
              </p>
            </div>

            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{language === 'zh' ? '本次作业题目' : 'Assignment questions'}</span>
                <span className="text-xs text-slate-500">{draftItems.length} {language === 'zh' ? '题' : 'items'}</span>
              </div>
              <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {draftItems.map((item, index) => {
                  const set = practiceSets.find((candidate) => candidate.id === item.practiceSetId);
                  const step = set?.steps.find((candidate) => candidate.id === item.questionId);
                  return (
                    <div key={`${item.practiceSetId}:${item.questionId}`} className="flex items-center gap-3 rounded-lg border border-line bg-surface-tint p-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-nebula/15 text-xs font-bold text-nebula">{index + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-ink">{step?.title ?? item.questionId}</div>
                        <div className="truncate text-xs text-slate-500">{set?.label}</div>
                      </div>
                      <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1.5 text-slate-500 hover:text-ink disabled:opacity-20"><ArrowUp className="h-4 w-4" /></button>
                      <button type="button" onClick={() => moveItem(index, 1)} disabled={index === draftItems.length - 1} className="p-1.5 text-slate-500 hover:text-ink disabled:opacity-20"><ArrowDown className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setDraftItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="p-1.5 text-slate-500 hover:text-rose-700"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  );
                })}
                {!draftItems.length && <div className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-slate-600">{language === 'zh' ? '通过题号或 AI 添加题目。' : 'Add questions by number or AI.'}</div>}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-panel rounded-xl p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-nebula">
                <Bot className="h-5 w-5" />
                <h3 className="font-serif text-xl text-ink">{language === 'zh' ? 'AI 自动创建' : 'AI assignment builder'}</h3>
              </div>
              <p className="text-sm leading-6 text-ink-soft">
                {language === 'zh'
                  ? '输入自然语言要求，AI 先生成可检查的选题草案；确认后与手动作业走同一发布流程。'
                  : 'Describe the goal. AI creates a reviewable draft that uses the same publish flow as manual assignments.'}
              </p>
              <textarea
                value={aiInstruction}
                onChange={(event) => setAiInstruction(event.target.value)}
                className="mt-4 min-h-28 w-full rounded-lg border border-nebula/20 bg-nebula/5 p-4 text-sm text-ink outline-none focus:border-nebula"
                placeholder={language === 'zh' ? '例如：给 Eden 生成 8 道运动学基础题，重点考察 acceleration 和速度图像。' : 'e.g. Create 8 foundation motion questions for Eden, focusing on acceleration and graphs.'}
              />
              <button type="button" onClick={generateAiDraft} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-nebula/40 bg-nebula/10 px-4 text-xs font-bold text-ink hover:bg-nebula/20">
                <Sparkles className="h-4 w-4" />
                {language === 'zh' ? '生成可编辑选题草案' : 'Generate editable draft'}
              </button>
              <div className="mt-4 rounded-lg border border-line bg-surface-muted p-3 font-mono text-[11px] leading-5 text-slate-500">
                POST /api/admin/assignments/ai<br />
                instruction + resolvedItems[] + audience + publish
              </div>
            </div>

            <div className="glass-panel rounded-xl p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-nebula" />
                <h3 className="font-serif text-lg text-ink">{language === 'zh' ? '发布对象' : 'Audience'}</h3>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-3">
                <input type="checkbox" checked={assignedToAll} onChange={(event) => setAssignedToAll(event.target.checked)} className="h-4 w-4 accent-violet-500" />
                <span className="text-sm text-ink-soft">{language === 'zh' ? '发布给全部学生' : 'Assign to all students'}</span>
              </label>
              {!assignedToAll && (
                <div className="mt-3 space-y-2">
                  {profiles.map((profile) => (
                    <label key={profile.userId} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-surface-tint p-3">
                      <input
                        type="checkbox"
                        checked={studentIds.includes(profile.userId)}
                        onChange={(event) =>
                          setStudentIds((current) =>
                            event.target.checked
                              ? [...current, profile.userId]
                              : current.filter((studentId) => studentId !== profile.userId),
                          )
                        }
                        className="h-4 w-4 accent-violet-500"
                      />
                      <span className="text-sm text-ink-soft">{profile.displayName}</span>
                      <span className="ml-auto text-xs text-slate-600">{profile.email}</span>
                    </label>
                  ))}
                </div>
              )}
              {formMessage && <div className="mt-4 rounded-lg border border-line bg-surface-tint p-3 text-xs leading-5 text-ink-soft">{formMessage}</div>}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button type="button" disabled={savingStatus !== null} onClick={() => void submit('draft')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line text-xs font-bold text-ink-soft disabled:opacity-40">
                  <FileEdit className="h-4 w-4" />
                  {savingStatus === 'draft'
                    ? language === 'zh' ? '正在保存…' : 'Saving…'
                    : editingAssignmentId
                      ? language === 'zh' ? '保存修改' : 'Save changes'
                      : language === 'zh' ? '保存草稿' : 'Save draft'}
                </button>
                <button type="button" disabled={savingStatus !== null} onClick={() => void submit('published')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-nebula text-xs font-bold text-on-accent disabled:opacity-40">
                  <Rocket className="h-4 w-4" />
                  {savingStatus === 'published'
                    ? language === 'zh' ? '正在发布…' : 'Publishing…'
                    : language === 'zh' ? '立即发布' : 'Publish'}
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                <CalendarClock className="h-3.5 w-3.5" />
                {dueAt ? formatDue(new Date(dueAt).toISOString(), language) : language === 'zh' ? '尚未设置截止日期' : 'No due date set'}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
