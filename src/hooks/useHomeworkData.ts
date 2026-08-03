import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { createDemoAssignments, createDemoAttempts, demoProfiles } from '../homework/demoData';
import {
  DEMO_ASSIGNMENTS_KEY,
  DEMO_ATTEMPTS_KEY,
  PRACTICE_PROGRESS_EVENT,
  SHARED_PRACTICE_ATTEMPTS_KEY,
  mirrorAttemptToPracticeStore,
  persistDemoAssignments,
  persistDemoAttempts,
  readStored,
  writeStored,
} from '../homework/storage';
import type {
  AssignmentStatus,
  CreateHomeworkInput,
  HomeworkAssignment,
  HomeworkAttempt,
  HomeworkProfile,
} from '../homework/types';
import { findPracticeSet, isSupabaseUuid } from '../homework/catalog';
import { getSupabaseClient } from '../lib/supabaseClient';
import type { EvaluationResult } from '../types/practice';

interface AssignmentRow {
  id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'published' | 'archived';
  source_type: 'manual' | 'ai';
  due_at: string | null;
  published_at: string | null;
  assigned_to_all: boolean;
  ai_instruction: string | null;
  created_at: string;
  updated_at: string;
  assignment_items?: Array<{
    id: string;
    assignment_id: string;
    position: number;
    practice_set_id: string;
    question_id: string;
    practice_set_title: string | null;
    question_title: string | null;
  }>;
  assignment_students?: Array<{ student_id: string }>;
}

interface AttemptRow {
  student_id: string;
  student_email: string | null;
  practice_set_id: string;
  question_id: string;
  answer: string | null;
  score: number | string;
  max_score: number | string;
  is_correct: boolean;
  result: unknown;
  updated_at: string;
}

const previewDemoEnabled = process.env.NEXT_PUBLIC_HOMEWORK_DEMO === 'true';

const normalizeResult = (row: AttemptRow): EvaluationResult => {
  const saved = row.result as Partial<EvaluationResult> | null;
  return {
    score: Number(saved?.score ?? row.score ?? 0),
    maxScore: Number(saved?.maxScore ?? row.max_score ?? 1),
    hits: Array.isArray(saved?.hits) ? saved.hits : [],
    misses: Array.isArray(saved?.misses) ? saved.misses : [],
    suggestions: Array.isArray(saved?.suggestions) ? saved.suggestions : [],
  };
};

const normalizeAssignment = (row: AssignmentRow): HomeworkAssignment => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  status: row.status,
  sourceType: row.source_type,
  dueAt: row.due_at,
  publishedAt: row.published_at,
  assignedToAll: row.assigned_to_all,
  aiInstruction: row.ai_instruction,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  studentIds: (row.assignment_students ?? []).map((student) => student.student_id),
  items: (row.assignment_items ?? [])
    .sort((a, b) => a.position - b.position)
    .map((item) => ({
      id: item.id,
      assignmentId: item.assignment_id,
      position: item.position,
      practiceSetId: item.practice_set_id,
      questionId: item.question_id,
      practiceSetTitle: item.practice_set_title ?? undefined,
      questionTitle: item.question_title ?? undefined,
    })),
});

const normalizeAttempt = (row: AttemptRow): HomeworkAttempt => ({
  studentId: row.student_id,
  studentEmail: row.student_email,
  practiceSetId: row.practice_set_id,
  questionId: row.question_id,
  answer: row.answer ?? '',
  score: Number(row.score),
  maxScore: Number(row.max_score),
  isCorrect: row.is_correct,
  result: normalizeResult(row),
  updatedAt: row.updated_at,
});

const loadDemo = () => {
  const seededAssignments = createDemoAssignments();
  const assignments = readStored<HomeworkAssignment[]>(DEMO_ASSIGNMENTS_KEY, seededAssignments);
  const baseAttempts = readStored<HomeworkAttempt[]>(DEMO_ATTEMPTS_KEY, createDemoAttempts(assignments));
  const sharedAttempts = Object.values(
    readStored<Record<string, HomeworkAttempt>>(SHARED_PRACTICE_ATTEMPTS_KEY, {}),
  );
  const sharedKeys = new Set(
    sharedAttempts.map((attempt) => `${attempt.studentId}:${attempt.practiceSetId}:${attempt.questionId}`),
  );
  const attempts = [
    ...baseAttempts.filter(
      (attempt) => !sharedKeys.has(`${attempt.studentId}:${attempt.practiceSetId}:${attempt.questionId}`),
    ),
    ...sharedAttempts,
  ];
  if (typeof window !== 'undefined' && !window.localStorage.getItem(DEMO_ASSIGNMENTS_KEY)) {
    persistDemoAssignments(assignments);
    persistDemoAttempts(attempts);
    attempts
      .filter((attempt) => attempt.studentId === 'demo-student-eden')
      .forEach(mirrorAttemptToPracticeStore);
  }
  return { assignments, attempts };
};

export const useHomeworkData = () => {
  const { authEnabled, configured, isAdmin, user } = useAuth();
  const supabase = getSupabaseClient();
  const demoMode = previewDemoEnabled;
  const [assignments, setAssignments] = useState<HomeworkAssignment[]>([]);
  const [attempts, setAttempts] = useState<HomeworkAttempt[]>([]);
  const [profiles, setProfiles] = useState<HomeworkProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentStudentId = user?.id ?? 'demo-student-eden';

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (demoMode) {
      const demo = loadDemo();
      setAssignments(demo.assignments);
      setAttempts(demo.attempts);
      setProfiles(demoProfiles);
      setLoading(false);
      return;
    }

    if (!authEnabled || !configured || !supabase || !user) {
      setAssignments([]);
      setAttempts([]);
      setProfiles([]);
      setLoading(false);
      return;
    }

    const assignmentQuery = supabase
      .from('assignments')
      .select(
        'id, title, description, status, source_type, due_at, published_at, assigned_to_all, ai_instruction, created_at, updated_at, assignment_items(id, assignment_id, position, practice_set_id, question_id, practice_set_title, question_title), assignment_students(student_id)',
      )
      .order('created_at', { ascending: false });

    const attemptsQuery = supabase
      .from('practice_attempts')
      .select('student_id, student_email, practice_set_id, question_id, answer, score, max_score, is_correct, result, updated_at')
      .order('updated_at', { ascending: false });

    const queries: PromiseLike<unknown>[] = [assignmentQuery, attemptsQuery];
    if (isAdmin) {
      queries.push(
        supabase
          .from('profiles')
          .select('user_id, email, display_name, created_at')
          .order('created_at', { ascending: true }),
      );
    }

    const [assignmentResponse, attemptsResponse, profilesResponse] = await Promise.all(queries) as Array<{
      data: unknown;
      error: { message: string } | null;
    }>;

    const queryError = assignmentResponse.error || attemptsResponse.error || profilesResponse?.error;
    if (queryError) {
      setError(queryError.message);
      setLoading(false);
      return;
    }

    setAssignments(((assignmentResponse.data ?? []) as AssignmentRow[]).map(normalizeAssignment));
    setAttempts(((attemptsResponse.data ?? []) as AttemptRow[]).map(normalizeAttempt));
    setProfiles(
      ((profilesResponse?.data ?? []) as Array<{ user_id: string; email: string | null; display_name: string | null }>).map(
        (profile) => ({
          userId: profile.user_id,
          email: profile.email ?? profile.user_id.slice(0, 8),
          displayName: profile.display_name ?? profile.email ?? profile.user_id.slice(0, 8),
        }),
      ),
    );
    setLoading(false);
  }, [authEnabled, configured, demoMode, isAdmin, supabase, user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!demoMode) return;
    const onUpdate = () => {
      const demo = loadDemo();
      setAssignments(demo.assignments);
      setAttempts(demo.attempts);
    };
    window.addEventListener(PRACTICE_PROGRESS_EVENT, onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener(PRACTICE_PROGRESS_EVENT, onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, [demoMode]);

  const createAssignment = useCallback(
    async (input: CreateHomeworkInput) => {
      if (demoMode) {
        const timestamp = new Date().toISOString();
        const id = `demo-assignment-${Date.now()}`;
        const assignment: HomeworkAssignment = {
          id,
          title: input.title,
          description: input.description,
          status: input.status,
          sourceType: input.sourceType,
          dueAt: input.dueAt,
          publishedAt: input.status === 'published' ? timestamp : null,
          assignedToAll: input.assignedToAll,
          aiInstruction: input.aiInstruction ?? null,
          createdAt: timestamp,
          updatedAt: timestamp,
          studentIds: input.studentIds,
          items: input.items.map((item, position) => {
            const set = findPracticeSet(item.practiceSetId);
            const step = set?.steps.find((candidate) => candidate.id === item.questionId);
            return {
              id: `${id}-item-${position + 1}`,
              assignmentId: id,
              position,
              practiceSetId: item.practiceSetId,
              questionId: item.questionId,
              practiceSetTitle: set?.title,
              questionTitle: step?.title,
            };
          }),
        };
        const next = [assignment, ...assignments];
        setAssignments(next);
        persistDemoAssignments(next);
        return { assignment, error: null };
      }

      if (!supabase || !user || !isAdmin) return { assignment: null, error: 'Administrator access is required.' };
      const validStudentIds = input.assignedToAll
        ? []
        : Array.from(new Set(input.studentIds.filter(isSupabaseUuid)));
      if (!input.assignedToAll && validStudentIds.length === 0) {
        return {
          assignment: null,
          error: 'Select at least one valid student before publishing.',
        };
      }
      const { data, error: assignmentError } = await supabase
        .from('assignments')
        .insert({
          title: input.title,
          description: input.description,
          status: input.status,
          source_type: input.sourceType,
          due_at: input.dueAt,
          published_at: input.status === 'published' ? new Date().toISOString() : null,
          assigned_to_all: input.assignedToAll,
          ai_instruction: input.aiInstruction ?? null,
          created_by: user.id,
        })
        .select('id, title, description, status, source_type, due_at, published_at, assigned_to_all, ai_instruction, created_at, updated_at')
        .single();
      if (assignmentError || !data) return { assignment: null, error: assignmentError?.message ?? 'Unable to create assignment.' };

      const assignmentId = (data as AssignmentRow).id;
      const itemRows = input.items.map((item, position) => {
        const set = findPracticeSet(item.practiceSetId);
        const step = set?.steps.find((candidate) => candidate.id === item.questionId);
        return {
          assignment_id: assignmentId,
          position,
          practice_set_id: item.practiceSetId,
          question_id: item.questionId,
          practice_set_title: set?.title ?? item.practiceSetId,
          question_title: step?.title ?? item.questionId,
        };
      });
      const { error: itemError } = await supabase.from('assignment_items').insert(itemRows);
      if (itemError) {
        await supabase.from('assignments').delete().eq('id', assignmentId);
        return { assignment: null, error: itemError.message };
      }
      if (!input.assignedToAll && validStudentIds.length) {
        const { error: studentError } = await supabase.from('assignment_students').insert(
          validStudentIds.map((studentId) => ({ assignment_id: assignmentId, student_id: studentId })),
        );
        if (studentError) {
          await supabase.from('assignments').delete().eq('id', assignmentId);
          return { assignment: null, error: studentError.message };
        }
      }
      await refresh();
      return { assignment: normalizeAssignment(data as AssignmentRow), error: null };
    },
    [assignments, demoMode, isAdmin, refresh, supabase, user],
  );

  const updateAssignment = useCallback(
    async (assignmentId: string, input: CreateHomeworkInput) => {
      const existing = assignments.find((assignment) => assignment.id === assignmentId);
      if (!existing || existing.status !== 'draft') {
        return { assignment: null, error: 'Only draft assignments can be edited.' };
      }

      if (demoMode) {
        const timestamp = new Date().toISOString();
        const updated: HomeworkAssignment = {
          ...existing,
          title: input.title,
          description: input.description,
          status: input.status,
          sourceType: input.sourceType,
          dueAt: input.dueAt,
          publishedAt: input.status === 'published' ? timestamp : null,
          assignedToAll: input.assignedToAll,
          aiInstruction: input.aiInstruction ?? null,
          updatedAt: timestamp,
          studentIds: input.assignedToAll ? [] : input.studentIds,
          items: input.items.map((item, position) => {
            const set = findPracticeSet(item.practiceSetId);
            const step = set?.steps.find((candidate) => candidate.id === item.questionId);
            return {
              id: `${assignmentId}-item-${position + 1}`,
              assignmentId,
              position,
              practiceSetId: item.practiceSetId,
              questionId: item.questionId,
              practiceSetTitle: set?.title,
              questionTitle: step?.title,
            };
          }),
        };
        const next = assignments.map((assignment) => assignment.id === assignmentId ? updated : assignment);
        setAssignments(next);
        persistDemoAssignments(next);
        return { assignment: updated, error: null };
      }

      if (!supabase || !user || !isAdmin) {
        return { assignment: null, error: 'Administrator access is required.' };
      }
      const validStudentIds = input.assignedToAll
        ? []
        : Array.from(new Set(input.studentIds.filter(isSupabaseUuid)));
      if (!input.assignedToAll && validStudentIds.length === 0) {
        return { assignment: null, error: 'Select at least one valid student.' };
      }

      const itemRows = input.items.map((item, position) => {
        const set = findPracticeSet(item.practiceSetId);
        const step = set?.steps.find((candidate) => candidate.id === item.questionId);
        return {
          assignment_id: assignmentId,
          position,
          practice_set_id: item.practiceSetId,
          question_id: item.questionId,
          practice_set_title: set?.title ?? item.practiceSetId,
          question_title: step?.title ?? item.questionId,
        };
      });

      const { error: deleteItemsError } = await supabase.from('assignment_items').delete().eq('assignment_id', assignmentId);
      if (deleteItemsError) return { assignment: null, error: deleteItemsError.message };
      const { error: insertItemsError } = await supabase.from('assignment_items').insert(itemRows);
      if (insertItemsError) {
        const restoreRows = existing.items.map((item, position) => ({
          assignment_id: assignmentId,
          position,
          practice_set_id: item.practiceSetId,
          question_id: item.questionId,
          practice_set_title: item.practiceSetTitle ?? item.practiceSetId,
          question_title: item.questionTitle ?? item.questionId,
        }));
        if (restoreRows.length) await supabase.from('assignment_items').insert(restoreRows);
        return { assignment: null, error: insertItemsError.message };
      }

      const { error: deleteStudentsError } = await supabase.from('assignment_students').delete().eq('assignment_id', assignmentId);
      if (deleteStudentsError) return { assignment: null, error: deleteStudentsError.message };
      if (!input.assignedToAll) {
        const { error: insertStudentsError } = await supabase.from('assignment_students').insert(
          validStudentIds.map((studentId) => ({ assignment_id: assignmentId, student_id: studentId })),
        );
        if (insertStudentsError) return { assignment: null, error: insertStudentsError.message };
      }

      // Keep the assignment in draft while its questions and audience are replaced.
      // Publishing is the final write so students can never see a partially updated assignment.
      const { error: metadataError } = await supabase
        .from('assignments')
        .update({
          title: input.title,
          description: input.description,
          status: input.status,
          source_type: input.sourceType,
          due_at: input.dueAt,
          published_at: input.status === 'published' ? new Date().toISOString() : null,
          assigned_to_all: input.assignedToAll,
          ai_instruction: input.aiInstruction ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', assignmentId)
        .eq('status', 'draft');
      if (metadataError) return { assignment: null, error: metadataError.message };

      await refresh();
      const updated: HomeworkAssignment = {
        ...existing,
        title: input.title,
        description: input.description,
        status: input.status,
        sourceType: input.sourceType,
        dueAt: input.dueAt,
        publishedAt: input.status === 'published' ? new Date().toISOString() : null,
        assignedToAll: input.assignedToAll,
        aiInstruction: input.aiInstruction ?? null,
        studentIds: validStudentIds,
        items: itemRows.map((item, position) => ({
          id: `${assignmentId}-item-${position + 1}`,
          assignmentId,
          position,
          practiceSetId: item.practice_set_id,
          questionId: item.question_id,
          practiceSetTitle: item.practice_set_title,
          questionTitle: item.question_title,
        })),
        updatedAt: new Date().toISOString(),
      };
      return { assignment: updated, error: null };
    },
    [assignments, demoMode, isAdmin, refresh, supabase, user],
  );

  const updateAssignmentStatus = useCallback(
    async (assignmentId: string, status: AssignmentStatus) => {
      if (demoMode) {
        const next = assignments.map((assignment) =>
          assignment.id === assignmentId
            ? {
                ...assignment,
                status,
                publishedAt: status === 'published'
                  ? assignment.publishedAt ?? new Date().toISOString()
                  : status === 'draft'
                    ? null
                    : assignment.publishedAt,
                updatedAt: new Date().toISOString(),
              }
            : assignment,
        );
        setAssignments(next as HomeworkAssignment[]);
        persistDemoAssignments(next as HomeworkAssignment[]);
        return null;
      }
      if (!supabase || !isAdmin) return 'Administrator access is required.';
      const { error: updateError } = await supabase
        .from('assignments')
        .update({
          status,
          published_at: status === 'published' ? new Date().toISOString() : status === 'draft' ? null : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', assignmentId);
      if (!updateError) await refresh();
      return updateError?.message ?? null;
    },
    [assignments, demoMode, isAdmin, refresh, supabase],
  );

  const saveAttempt = useCallback(
    async (input: {
      practiceSetId: string;
      questionId: string;
      answer: string;
      score: number;
      maxScore: number;
      isCorrect: boolean;
      result: EvaluationResult;
    }) => {
      const set = findPracticeSet(input.practiceSetId);
      const step = set?.steps.find((candidate) => candidate.id === input.questionId);
      const attempt: HomeworkAttempt = {
        studentId: currentStudentId,
        studentEmail: user?.email ?? 'eden@example.com',
        ...input,
        updatedAt: new Date().toISOString(),
      };

      if (demoMode) {
        const current = readStored<HomeworkAttempt[]>(DEMO_ATTEMPTS_KEY, attempts);
        const next = [
          ...current.filter(
            (saved) =>
              !(
                saved.studentId === attempt.studentId &&
                saved.practiceSetId === attempt.practiceSetId &&
                saved.questionId === attempt.questionId
              ),
          ),
          attempt,
        ];
        setAttempts(next);
        persistDemoAttempts(next);
        mirrorAttemptToPracticeStore(attempt);
        return null;
      }

      if (!supabase || !user) return 'Sign in to save progress.';
      const { error: saveError } = await supabase.from('practice_attempts').upsert(
        {
          student_id: user.id,
          student_email: user.email ?? null,
          practice_set_id: input.practiceSetId,
          practice_set_title: set?.title ?? input.practiceSetId,
          question_id: input.questionId,
          question_title: step?.title ?? input.questionId,
          answer: input.answer,
          score: input.score,
          max_score: input.maxScore,
          is_correct: input.isCorrect,
          tags: step?.tags ?? [],
          result: input.result,
          updated_at: attempt.updatedAt,
        },
        { onConflict: 'student_id,practice_set_id,question_id' },
      );
      if (!saveError) {
        setAttempts((previous) => [
          ...previous.filter(
            (saved) =>
              !(
                saved.studentId === attempt.studentId &&
                saved.practiceSetId === attempt.practiceSetId &&
                saved.questionId === attempt.questionId
              ),
          ),
          attempt,
        ]);
      }
      return saveError?.message ?? null;
    },
    [attempts, currentStudentId, demoMode, supabase, user],
  );

  const resetDemo = useCallback(() => {
    if (!demoMode) return;
    const seededAssignments = createDemoAssignments();
    const seededAttempts = createDemoAttempts(seededAssignments);
    persistDemoAssignments(seededAssignments);
    persistDemoAttempts(seededAttempts);
    const sharedAttempts = seededAttempts
      .filter((attempt) => attempt.studentId === 'demo-student-eden')
      .reduce<Record<string, HomeworkAttempt>>((map, attempt) => {
        map[`${attempt.practiceSetId}:${attempt.questionId}`] = attempt;
        return map;
      }, {});
    writeStored(SHARED_PRACTICE_ATTEMPTS_KEY, sharedAttempts);
    setAssignments(seededAssignments);
    setAttempts(seededAttempts);
  }, [demoMode]);

  return useMemo(
    () => ({
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
      saveAttempt,
      refresh,
      resetDemo,
    }),
    [
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
      saveAttempt,
      refresh,
      resetDemo,
    ],
  );
};
