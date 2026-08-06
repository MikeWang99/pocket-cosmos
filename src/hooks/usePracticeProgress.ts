import { useCallback, useEffect, useMemo, useState } from 'react';
import type { EvaluationResult } from '../types/practice';
import { useAuth } from '../auth/AuthContext';
import {
  PRACTICE_PROGRESS_EVENT,
  SHARED_PRACTICE_ATTEMPTS_KEY,
  readStored,
  writeStored,
} from '../homework/storage';
import type { HomeworkAttempt } from '../homework/types';
import { getSupabaseClient } from '../lib/supabaseClient';

export type PracticeSyncState = 'off' | 'idle' | 'loading' | 'syncing' | 'error';

export interface SavedPracticeAttempt {
  questionId: string;
  answer: string;
  answerImageUrl?: string;
  result: EvaluationResult;
  isCorrect: boolean;
  updatedAt: string;
}

interface PracticeAttemptRow {
  question_id: string;
  answer: string | null;
  answer_image_url: string | null;
  score: number | string;
  max_score: number | string;
  is_correct: boolean;
  result: unknown;
  updated_at: string;
}

interface SavePracticeAttemptInput {
  practiceSetId: string;
  practiceSetTitle: string;
  questionId: string;
  questionTitle: string;
  answer: string;
  answerImageUrl?: string;
  score: number;
  maxScore: number;
  isCorrect: boolean;
  tags: string[];
  result: EvaluationResult;
}

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

const resetStorageKey = (studentId: string, practiceSetId: string) =>
  `pocket-cosmos:practice-reset:${studentId}:${practiceSetId}`;

const readResetTimestamp = (studentId: string | undefined, practiceSetId: string) => {
  if (!studentId || typeof window === 'undefined') return 0;
  const value = window.localStorage.getItem(resetStorageKey(studentId, practiceSetId));
  return value ? Number(value) || 0 : 0;
};

export const usePracticeProgress = (practiceSetId: string) => {
  const { authEnabled, configured, user } = useAuth();
  const supabase = getSupabaseClient();
  const [savedAttempts, setSavedAttempts] = useState<Record<string, SavedPracticeAttempt>>({});
  const [syncState, setSyncState] = useState<PracticeSyncState>('off');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [resetVersion, setResetVersion] = useState(0);
  const demoMode = process.env.NEXT_PUBLIC_HOMEWORK_DEMO === 'true';

  const canSync = Boolean(authEnabled && configured && supabase && user);

  useEffect(() => {
    if (demoMode) {
      const loadLocalAttempts = () => {
        const stored = readStored<Record<string, HomeworkAttempt>>(SHARED_PRACTICE_ATTEMPTS_KEY, {});
        const attempts = Object.values(stored)
          .filter((attempt) => attempt.practiceSetId === practiceSetId)
          .reduce<Record<string, SavedPracticeAttempt>>((map, attempt) => {
            map[attempt.questionId] = {
              questionId: attempt.questionId,
              answer: attempt.answer,
              result: attempt.result,
              isCorrect: attempt.isCorrect,
              updatedAt: attempt.updatedAt,
            };
            return map;
          }, {});
        setSavedAttempts(attempts);
        setSyncState('idle');
      };
      loadLocalAttempts();
      window.addEventListener(PRACTICE_PROGRESS_EVENT, loadLocalAttempts);
      window.addEventListener('storage', loadLocalAttempts);
      return () => {
        window.removeEventListener(PRACTICE_PROGRESS_EVENT, loadLocalAttempts);
        window.removeEventListener('storage', loadLocalAttempts);
      };
    }

    if (!authEnabled) {
      setSyncState('off');
      setSavedAttempts({});
      return;
    }

    if (!configured || !supabase || !user) {
      setSyncState('idle');
      setSavedAttempts({});
      return;
    }

    let mounted = true;
    setSyncState('loading');
    setSyncError(null);

    supabase
      .from('practice_attempts')
      .select('question_id, answer, answer_image_url, score, max_score, is_correct, result, updated_at')
      .eq('practice_set_id', practiceSetId)
      .order('updated_at', { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;

        if (error) {
          setSyncError(error.message);
          setSyncState('error');
          return;
        }

        const resetAt = readResetTimestamp(user.id, practiceSetId);
        const attempts = (data ?? []).reduce<Record<string, SavedPracticeAttempt>>((map, row) => {
          const typedRow = row as PracticeAttemptRow;
          const updatedAt = Date.parse(typedRow.updated_at);
          if (resetAt && Number.isFinite(updatedAt) && updatedAt <= resetAt) return map;

          map[typedRow.question_id] = {
            questionId: typedRow.question_id,
            answer: typedRow.answer ?? '',
            answerImageUrl: typedRow.answer_image_url ?? undefined,
            result: normalizeResult(typedRow),
            isCorrect: typedRow.is_correct,
            updatedAt: typedRow.updated_at,
          };
          return map;
        }, {});

        setSavedAttempts(attempts);
        setSyncState('idle');
      });

    return () => {
      mounted = false;
    };
  }, [authEnabled, configured, demoMode, practiceSetId, resetVersion, supabase, user]);

  const resetSavedAttempts = useCallback(() => {
    setSavedAttempts({});
    if (demoMode) {
      const stored = readStored<Record<string, HomeworkAttempt>>(SHARED_PRACTICE_ATTEMPTS_KEY, {});
      Object.keys(stored).forEach((key) => {
        if (stored[key].practiceSetId === practiceSetId) delete stored[key];
      });
      writeStored(SHARED_PRACTICE_ATTEMPTS_KEY, stored);
      return;
    }
    if (!user || typeof window === 'undefined') return;
    window.localStorage.setItem(resetStorageKey(user.id, practiceSetId), String(Date.now()));
    setResetVersion((version) => version + 1);
  }, [demoMode, practiceSetId, user]);

  const saveAttempt = useCallback(
    async (attempt: SavePracticeAttemptInput) => {
      const nextSavedAttempt: SavedPracticeAttempt = {
        questionId: attempt.questionId,
        answer: attempt.answer,
        answerImageUrl: attempt.answerImageUrl,
        result: attempt.result,
        isCorrect: attempt.isCorrect,
        updatedAt: new Date().toISOString(),
      };

      setSavedAttempts((previous) => ({ ...previous, [attempt.questionId]: nextSavedAttempt }));
      if (demoMode) {
        const stored = readStored<Record<string, HomeworkAttempt>>(SHARED_PRACTICE_ATTEMPTS_KEY, {});
        stored[`${attempt.practiceSetId}:${attempt.questionId}`] = {
          studentId: 'demo-student-eden',
          studentEmail: 'eden@example.com',
          practiceSetId: attempt.practiceSetId,
          questionId: attempt.questionId,
          answer: attempt.answer,
          answerImageUrl: attempt.answerImageUrl,
          score: attempt.score,
          maxScore: attempt.maxScore,
          isCorrect: attempt.isCorrect,
          result: attempt.result,
          updatedAt: nextSavedAttempt.updatedAt,
        };
        writeStored(SHARED_PRACTICE_ATTEMPTS_KEY, stored);
        setSyncState('idle');
        return;
      }

      if (!supabase || !user) return;
      setSyncState('syncing');
      setSyncError(null);

      const { error } = await supabase.from('practice_attempts').upsert(
        {
          student_id: user.id,
          student_email: user.email ?? null,
          practice_set_id: attempt.practiceSetId,
          practice_set_title: attempt.practiceSetTitle,
          question_id: attempt.questionId,
          question_title: attempt.questionTitle,
          answer: attempt.answer,
          answer_image_url: attempt.answerImageUrl ?? null,
          score: attempt.score,
          max_score: attempt.maxScore,
          is_correct: attempt.isCorrect,
          tags: attempt.tags,
          result: attempt.result,
          updated_at: nextSavedAttempt.updatedAt,
        },
        { onConflict: 'student_id,practice_set_id,question_id' },
      );

      if (error) {
        setSyncError(error.message);
        setSyncState('error');
        return;
      }

      setSyncState('idle');
    },
    [demoMode, supabase, user],
  );

  return useMemo(
    () => ({
      canSync,
      resetSavedAttempts,
      savedAttempts,
      saveAttempt,
      syncError,
      syncState,
    }),
    [canSync, resetSavedAttempts, savedAttempts, saveAttempt, syncError, syncState],
  );
};
