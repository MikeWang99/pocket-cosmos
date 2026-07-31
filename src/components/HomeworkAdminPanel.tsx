import React, { useMemo, useState } from 'react';
import {
  Archive,
  ArrowDown,
  ArrowUp,
  Bot,
  CalendarClock,
  CheckCircle2,
  ClipboardPlus,
  Eye,
  FileEdit,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  UsersRound,
} from 'lucide-react';
import { practiceSets } from '../data/practiceSets';
import { isSupabaseUuid, questionsFromNumbers } from '../homework/catalog';
import type { CreateHomeworkInput, HomeworkAssignment } from '../homework/types';
import { useHomeworkData } from '../hooks/useHomeworkData';
import { useLanguage } from '../LanguageContext';

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
  draft: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  published: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  archived: 'border-white/10 bg-white/5 text-slate-400',
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
    updateAssignmentStatus,
    resetDemo,
  } = useHomeworkData();
  const [view, setView] = useState<AdminView>('overview');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
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

  const selectedAssignment =
    assignments.find((assignment) => assignment.id === selectedAssignmentId) ??
    assignments.find((assignment) => assignment.status === 'published') ??
    assignments[0] ??
    null;

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
      const result = await createAssignment(input);
      if (result.error) {
        setFormMessage(result.error);
        return;
      }
      setFormMessage(language === 'zh' ? (status === 'published' ? '作业已发布。' : '草稿已保存。') : status === 'published' ? 'Homework published.' : 'Draft saved.');
      setTitle('');
      setDescription('');
      setDueAt('');
      setDraftItems([]);
      setQuestionNumbers('');
      setAiInstruction('');
      setSourceType('manual');
      setStudentIds(demoMode ? ['demo-student-eden'] : []);
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

  const assignmentProgress = useMemo(() => {
    if (!selectedAssignment) return [];
    const itemKeys = new Set(
      selectedAssignment.items.map((item) => `${item.practiceSetId}:${item.questionId}`),
    );
    const matchingAttempts = attempts.filter((attempt) =>
      itemKeys.has(`${attempt.practiceSetId}:${attempt.questionId}`),
    );
    const profileMap = new Map(profiles.map((profile) => [profile.userId, profile]));
    const audienceIds = new Set(
      selectedAssignment.assignedToAll
        ? [
            ...profiles.map((profile) => profile.userId),
            ...matchingAttempts.map((attempt) => attempt.studentId),
          ]
        : selectedAssignment.studentIds,
    );
    if (!demoMode) audienceIds.delete(currentStudentId);

    return Array.from(audienceIds).map((studentId) => {
      const fallbackAttempt = matchingAttempts.find((attempt) => attempt.studentId === studentId);
      const profile = profileMap.get(studentId) ?? {
        userId: studentId,
        email: fallbackAttempt?.studentEmail ?? studentId.slice(0, 8),
        displayName: fallbackAttempt?.studentEmail?.split('@')[0] ?? studentId.slice(0, 8),
      };
      const studentAttempts = attempts.filter(
        (attempt) =>
          attempt.studentId === studentId &&
          itemKeys.has(`${attempt.practiceSetId}:${attempt.questionId}`),
      );
      const completed = new Set(
        studentAttempts.map((attempt) => `${attempt.practiceSetId}:${attempt.questionId}`),
      ).size;
      const correct = studentAttempts.filter((attempt) => attempt.isCorrect).length;
      const latest = studentAttempts
        .map((attempt) => attempt.updatedAt)
        .sort()
        .at(-1);
      return {
        profile,
        completed,
        correct,
        total: selectedAssignment.items.length,
        accuracy: studentAttempts.length ? Math.round((correct / studentAttempts.length) * 100) : 0,
        latest,
      };
    }).sort((left, right) => {
      if (!left.latest && !right.latest) return left.profile.displayName.localeCompare(right.profile.displayName);
      if (!left.latest) return 1;
      if (!right.latest) return -1;
      return right.latest.localeCompare(left.latest);
    });
  }, [attempts, currentStudentId, demoMode, profiles, selectedAssignment]);

  const selectedStudentProgress =
    assignmentProgress.find((row) => row.profile.userId === selectedStudentId) ??
    assignmentProgress[0] ??
    null;
  const selectedStudentAttemptMap = useMemo(() => {
    if (!selectedAssignment || !selectedStudentProgress) return new Map();
    const itemKeys = new Set(
      selectedAssignment.items.map((item) => `${item.practiceSetId}:${item.questionId}`),
    );
    return attempts
      .filter(
        (attempt) =>
          attempt.studentId === selectedStudentProgress.profile.userId &&
          itemKeys.has(`${attempt.practiceSetId}:${attempt.questionId}`),
      )
      .reduce<Map<string, (typeof attempts)[number]>>((map, attempt) => {
        map.set(`${attempt.practiceSetId}:${attempt.questionId}`, attempt);
        return map;
      }, new Map());
  }, [attempts, selectedAssignment, selectedStudentProgress]);

  if (loading) {
    return <div className="glass-panel rounded-xl p-8 text-sm text-slate-400">{language === 'zh' ? '正在加载作业后台…' : 'Loading homework admin…'}</div>;
  }

  return (
    <section className={compact ? 'mt-10' : ''}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-nebula">
            <ClipboardPlus className="h-4 w-4" />
            {language === 'zh' ? '作业管理' : 'Homework Admin'}
          </div>
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            {language === 'zh' ? '创建、发布与查看整体完成情况' : 'Create, publish, and review completion'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoMode && (
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 hover:border-white/30 hover:text-white"
            >
              {language === 'zh' ? '重置演示数据' : 'Reset demo'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setView('overview')}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === 'overview' ? 'border-nebula/60 bg-nebula/15 text-white' : 'border-white/10 text-slate-400'}`}
          >
            <Eye className="mr-1.5 inline h-3.5 w-3.5" />
            {language === 'zh' ? '作业与数据' : 'Assignments'}
          </button>
          <button
            type="button"
            onClick={() => setView('create')}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === 'create' ? 'border-nebula/60 bg-nebula/15 text-white' : 'border-white/10 text-slate-400'}`}
          >
            <Plus className="mr-1.5 inline h-3.5 w-3.5" />
            {language === 'zh' ? '添加作业' : 'New assignment'}
          </button>
        </div>
      </div>

      {demoMode && (
        <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-xs leading-6 text-cyan-100/80">
          {language === 'zh'
            ? 'Preview 演示模式：创建、发布、做题和进度联动均可测试；数据保存在当前浏览器。上线时切换到 Supabase 表即可。'
            : 'Preview demo mode: creation, publishing, answering, and progress sync are testable. Data stays in this browser; production uses Supabase.'}
        </div>
      )}
      {error && <div className="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}

      {view === 'overview' ? (
        <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="glass-panel rounded-xl p-3">
            <div className="px-3 pb-2 pt-3 text-[10px] uppercase tracking-widest text-slate-500">
              {language === 'zh' ? `${assignments.length} 份作业` : `${assignments.length} assignments`}
            </div>
            <div className="space-y-2">
              {assignments.map((assignment) => (
                <button
                  key={assignment.id}
                  type="button"
                  onClick={() => setSelectedAssignmentId(assignment.id)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    selectedAssignment?.id === assignment.id
                      ? 'border-nebula/60 bg-nebula/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{assignment.title}</span>
                    <span className={`shrink-0 rounded-full border px-2 py-1 text-[9px] uppercase tracking-wider ${statusStyle[assignment.status]}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                    <span>{assignment.items.length} {language === 'zh' ? '题' : 'questions'}</span>
                    <span>{formatDue(assignment.dueAt, language)}</span>
                    {assignment.sourceType === 'ai' && <Bot className="h-3.5 w-3.5 text-nebula" />}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-5">
            {selectedAssignment ? (
              <>
                <div className="glass-panel rounded-xl p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-nebula">
                        {selectedAssignment.sourceType === 'ai'
                          ? language === 'zh' ? 'AI 创建' : 'Created by AI'
                          : language === 'zh' ? '手动创建' : 'Manual'}
                      </div>
                      <h3 className="mt-2 font-serif text-2xl text-white">{selectedAssignment.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{selectedAssignment.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedAssignment.status === 'draft' && (
                        <button
                          type="button"
                          onClick={() => void updateAssignmentStatus(selectedAssignment.id, 'published')}
                          className="inline-flex items-center gap-2 rounded-full bg-nebula px-4 py-2 text-xs font-bold text-white"
                        >
                          <Rocket className="h-3.5 w-3.5" />
                          {language === 'zh' ? '发布' : 'Publish'}
                        </button>
                      )}
                      {selectedAssignment.status !== 'archived' && (
                        <button
                          type="button"
                          onClick={() => void updateAssignmentStatus(selectedAssignment.id, 'archived')}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-400"
                        >
                          <Archive className="h-3.5 w-3.5" />
                          {language === 'zh' ? '归档' : 'Archive'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{language === 'zh' ? '题目' : 'Questions'}</div>
                      <div className="mt-1 text-2xl font-semibold">{selectedAssignment.items.length}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{language === 'zh' ? '学生' : 'Students'}</div>
                      <div className="mt-1 text-2xl font-semibold">{selectedAssignment.assignedToAll ? profiles.length : selectedAssignment.studentIds.length}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">{language === 'zh' ? '截止时间' : 'Due'}</div>
                      <div className="mt-2 text-sm font-semibold">{formatDue(selectedAssignment.dueAt, language)}</div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel overflow-hidden rounded-xl">
                  <div className="border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    <UsersRound className="mr-2 inline h-4 w-4" />
                    {language === 'zh' ? '学生完成情况' : 'Student progress'}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-sm">
                      <thead className="text-[10px] uppercase tracking-widest text-slate-500">
                        <tr>
                          <th className="px-5 py-3">{language === 'zh' ? '学生' : 'Student'}</th>
                          <th className="px-5 py-3">{language === 'zh' ? '完成' : 'Completed'}</th>
                          <th className="px-5 py-3">{language === 'zh' ? '正确率' : 'Accuracy'}</th>
                          <th className="px-5 py-3">{language === 'zh' ? '状态' : 'Status'}</th>
                          <th className="px-5 py-3">{language === 'zh' ? '最近作答' : 'Last activity'}</th>
                          <th className="px-5 py-3 text-right">{language === 'zh' ? '答题记录' : 'Answers'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignmentProgress.map((row) => {
                          const percent = row.total ? Math.round((row.completed / row.total) * 100) : 0;
                          const isSelected = row.profile.userId === selectedStudentProgress?.profile.userId;
                          return (
                            <tr
                              key={row.profile.userId}
                              className={`border-t border-white/5 transition-colors ${
                                isSelected ? 'bg-nebula/10' : 'hover:bg-white/[0.02]'
                              }`}
                            >
                              <td className="px-5 py-4">
                                <div className="font-semibold text-white">{row.profile.displayName}</div>
                                <div className="text-xs text-slate-500">{row.profile.email}</div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-nebula" style={{ width: `${percent}%` }} />
                                  </div>
                                  <span>{row.completed}/{row.total}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4">{row.accuracy}%</td>
                              <td className="px-5 py-4">
                                <span className={`rounded-full px-2.5 py-1 text-xs ${row.completed === row.total ? 'bg-emerald-500/10 text-emerald-300' : row.completed ? 'bg-amber-500/10 text-amber-300' : 'bg-white/5 text-slate-500'}`}>
                                  {row.completed === row.total
                                    ? language === 'zh' ? '已完成' : 'Complete'
                                    : row.completed
                                      ? language === 'zh' ? '进行中' : 'In progress'
                                      : language === 'zh' ? '未开始' : 'Not started'}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-slate-500">{row.latest ? formatDue(row.latest, language) : '—'}</td>
                              <td className="px-5 py-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudentId(row.profile.userId)}
                                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                    isSelected
                                      ? 'border-nebula/50 bg-nebula/15 text-white'
                                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                                  }`}
                                >
                                  <Eye className="mr-1.5 inline h-3.5 w-3.5" />
                                  {language === 'zh' ? '查看' : 'View'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {!assignmentProgress.length && (
                          <tr>
                            <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                              {language === 'zh'
                                ? '这份作业暂时没有可显示的学生记录。'
                                : 'No student records are available for this assignment yet.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {selectedStudentProgress && (
                  <div className="glass-panel rounded-xl p-5 sm:p-6">
                    <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-nebula">
                          {language === 'zh' ? '逐题答题记录' : 'Question-by-question answers'}
                        </div>
                        <h3 className="mt-2 font-serif text-2xl text-white">
                          {selectedStudentProgress.profile.displayName}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">{selectedStudentProgress.profile.email}</p>
                      </div>
                      <div className="text-sm text-slate-400">
                        {selectedStudentProgress.completed}/{selectedStudentProgress.total}{' '}
                        {language === 'zh' ? '题已作答' : 'answered'}
                        <span className="mx-2 text-slate-700">·</span>
                        {language === 'zh' ? '正确率' : 'Accuracy'} {selectedStudentProgress.accuracy}%
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedAssignment.items.map((item, index) => {
                        const attempt = selectedStudentAttemptMap.get(
                          `${item.practiceSetId}:${item.questionId}`,
                        );
                        return (
                          <div
                            key={`${item.practiceSetId}:${item.questionId}`}
                            className="rounded-lg border border-white/10 bg-white/[0.025] p-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-500">
                                  {language === 'zh' ? `第 ${index + 1} 题` : `Question ${index + 1}`}
                                </div>
                                <div className="mt-1 text-sm font-semibold text-white">
                                  {item.questionTitle ?? item.questionId}
                                </div>
                              </div>
                              {attempt ? (
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`rounded-full px-2.5 py-1 text-xs ${
                                      attempt.isCorrect
                                        ? 'bg-emerald-500/10 text-emerald-300'
                                        : 'bg-rose-500/10 text-rose-300'
                                    }`}
                                  >
                                    {attempt.isCorrect
                                      ? language === 'zh' ? '正确' : 'Correct'
                                      : language === 'zh' ? '错误' : 'Incorrect'}
                                  </span>
                                  <span className="text-xs font-semibold text-slate-300">
                                    {attempt.score}/{attempt.maxScore}
                                  </span>
                                </div>
                              ) : (
                                <span className="w-fit rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-500">
                                  {language === 'zh' ? '未作答' : 'Not answered'}
                                </span>
                              )}
                            </div>

                            {attempt && (
                              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
                                <div className="rounded-lg border border-white/5 bg-black/20 p-3">
                                  <div className="text-[10px] uppercase tracking-widest text-slate-500">
                                    {language === 'zh' ? '学生答案' : 'Student answer'}
                                  </div>
                                  <div className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
                                    {attempt.answer || (language === 'zh' ? '未保存文字答案' : 'No written answer saved')}
                                  </div>
                                  {!!attempt.result.misses.length && (
                                    <div className="mt-3 border-t border-white/5 pt-3">
                                      <div className="text-[10px] uppercase tracking-widest text-amber-300/70">
                                        {language === 'zh' ? '评分反馈' : 'Marking feedback'}
                                      </div>
                                      <div className="mt-2 space-y-1 text-xs leading-5 text-slate-400">
                                        {attempt.result.misses.map((miss) => (
                                          <div key={miss.id}>{miss.label}</div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="rounded-lg border border-white/5 bg-black/20 p-3 text-xs text-slate-400">
                                  <div className="text-[10px] uppercase tracking-widest text-slate-500">
                                    {language === 'zh' ? '提交时间' : 'Submitted'}
                                  </div>
                                  <div className="mt-2 text-slate-300">
                                    {formatDue(attempt.updatedAt, language)}
                                  </div>
                                  <div className="mt-4 text-[10px] uppercase tracking-widest text-slate-500">
                                    {language === 'zh' ? '题库来源' : 'Question bank'}
                                  </div>
                                  <div className="mt-2 break-words">{item.practiceSetTitle ?? item.practiceSetId}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-panel rounded-xl p-10 text-center text-sm text-slate-500">
                {language === 'zh' ? '还没有作业。点击“添加作业”开始。' : 'No assignments yet. Create the first one.'}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <div className="glass-panel rounded-xl p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-nebula" />
              <h3 className="font-serif text-xl text-white">{language === 'zh' ? '作业信息与题目' : 'Assignment details'}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs text-slate-400">{language === 'zh' ? '作业名称' : 'Title'}</span>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-nebula" placeholder={language === 'zh' ? '例如：运动学第 4 次课作业' : 'e.g. Motion · Lesson 04'} />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-xs text-slate-400">{language === 'zh' ? '给学生的说明' : 'Student instructions'}</span>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-24 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-nebula" />
              </label>
              <label>
                <span className="mb-2 block text-xs text-slate-400">{language === 'zh' ? '截止时间' : 'Due date'}</span>
                <input type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} className="w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none focus:border-nebula" />
              </label>
              <label>
                <span className="mb-2 block text-xs text-slate-400">{language === 'zh' ? '题库章节' : 'Question bank'}</span>
                <select value={selectedSetId} onChange={(event) => setSelectedSetId(event.target.value)} className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-nebula">
                  {practiceSets.map((set) => (
                    <option key={set.id} value={set.id}>{set.system.toUpperCase()} · {set.label} ({set.steps.length})</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={questionNumbers}
                  onChange={(event) => setQuestionNumbers(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter') addQuestionNumbers(); }}
                  className="min-h-11 flex-1 rounded-lg border border-white/10 bg-black/25 px-4 text-sm text-white outline-none focus:border-nebula"
                  placeholder={language === 'zh' ? '输入题号，如：1, 2, 5-8' : 'Question numbers, e.g. 1, 2, 5-8'}
                />
                <button type="button" onClick={addQuestionNumbers} className="min-h-11 rounded-lg bg-white px-5 text-xs font-bold text-black hover:bg-nebula hover:text-white">
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
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{language === 'zh' ? '本次作业题目' : 'Assignment questions'}</span>
                <span className="text-xs text-slate-500">{draftItems.length} {language === 'zh' ? '题' : 'items'}</span>
              </div>
              <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {draftItems.map((item, index) => {
                  const set = practiceSets.find((candidate) => candidate.id === item.practiceSetId);
                  const step = set?.steps.find((candidate) => candidate.id === item.questionId);
                  return (
                    <div key={`${item.practiceSetId}:${item.questionId}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-nebula/15 text-xs font-bold text-nebula">{index + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-white">{step?.title ?? item.questionId}</div>
                        <div className="truncate text-xs text-slate-500">{set?.label}</div>
                      </div>
                      <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-20"><ArrowUp className="h-4 w-4" /></button>
                      <button type="button" onClick={() => moveItem(index, 1)} disabled={index === draftItems.length - 1} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-20"><ArrowDown className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setDraftItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="p-1.5 text-slate-500 hover:text-rose-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  );
                })}
                {!draftItems.length && <div className="rounded-lg border border-dashed border-white/10 p-8 text-center text-sm text-slate-600">{language === 'zh' ? '通过题号或 AI 添加题目。' : 'Add questions by number or AI.'}</div>}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-panel rounded-xl p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-nebula">
                <Bot className="h-5 w-5" />
                <h3 className="font-serif text-xl text-white">{language === 'zh' ? 'AI 自动创建' : 'AI assignment builder'}</h3>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                {language === 'zh'
                  ? '输入自然语言要求，AI 先生成可检查的选题草案；确认后与手动作业走同一发布流程。'
                  : 'Describe the goal. AI creates a reviewable draft that uses the same publish flow as manual assignments.'}
              </p>
              <textarea
                value={aiInstruction}
                onChange={(event) => setAiInstruction(event.target.value)}
                className="mt-4 min-h-28 w-full rounded-lg border border-nebula/20 bg-nebula/5 p-4 text-sm text-white outline-none focus:border-nebula"
                placeholder={language === 'zh' ? '例如：给 Eden 生成 8 道运动学基础题，重点考察 acceleration 和速度图像。' : 'e.g. Create 8 foundation motion questions for Eden, focusing on acceleration and graphs.'}
              />
              <button type="button" onClick={generateAiDraft} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-nebula/40 bg-nebula/10 px-4 text-xs font-bold text-white hover:bg-nebula/20">
                <Sparkles className="h-4 w-4" />
                {language === 'zh' ? '生成可编辑选题草案' : 'Generate editable draft'}
              </button>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-[11px] leading-5 text-slate-500">
                POST /api/admin/assignments/ai<br />
                instruction + resolvedItems[] + audience + publish
              </div>
            </div>

            <div className="glass-panel rounded-xl p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-nebula" />
                <h3 className="font-serif text-lg text-white">{language === 'zh' ? '发布对象' : 'Audience'}</h3>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-3">
                <input type="checkbox" checked={assignedToAll} onChange={(event) => setAssignedToAll(event.target.checked)} className="h-4 w-4 accent-violet-500" />
                <span className="text-sm text-slate-300">{language === 'zh' ? '发布给全部学生' : 'Assign to all students'}</span>
              </label>
              {!assignedToAll && (
                <div className="mt-3 space-y-2">
                  {profiles.map((profile) => (
                    <label key={profile.userId} className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
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
                      <span className="text-sm text-slate-300">{profile.displayName}</span>
                      <span className="ml-auto text-xs text-slate-600">{profile.email}</span>
                    </label>
                  ))}
                </div>
              )}
              {formMessage && <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-300">{formMessage}</div>}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button type="button" disabled={savingStatus !== null} onClick={() => void submit('draft')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 text-xs font-bold text-slate-300 disabled:opacity-40">
                  <FileEdit className="h-4 w-4" />
                  {savingStatus === 'draft'
                    ? language === 'zh' ? '正在保存…' : 'Saving…'
                    : language === 'zh' ? '保存草稿' : 'Save draft'}
                </button>
                <button type="button" disabled={savingStatus !== null} onClick={() => void submit('published')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-nebula text-xs font-bold text-white disabled:opacity-40">
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
