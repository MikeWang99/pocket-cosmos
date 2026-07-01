import { useCallback, useEffect, useMemo, useState } from 'react';
import type { EvaluationResult } from '../types/practice';
import { useAuth } from '../auth/AuthContext';
import { getSupabaseClient } from '../lib/supabaseClient';

export type PracticeSyncState = 'off' | 'idle' | 'loading' | 'syncing' | 'error';

export interface SavedPracticeAttempt {
  questionId: string;
  answer: string;
  result: EvaluationResult;
  isCorrect: boolean;
  updatedAt: string;
}

interface PracticeAttemptRow {
  question_id: string;
  answer: string | null;
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

export const usePracticeProgress = (practiceSetId: string) => {
  const { authEnabled, configured, user } = useAuth();
  const supabase = getSupabaseClient();
  const [savedAttempts, setSavedAttempts] = useState<Record<string, SavedPracticeAttempt>>({});
  const [syncState, setSyncState] = useState<PracticeSyncState>('off');
  const [syncError, setSyncError] = useState<string | null>(null);

  const canSync = Boolean(authEnabled && configured && supabase && user);

  useEffect(() => {
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
      .select('question_id, answer, score, max_score, is_correct, result, updated_at')
      .eq('practice_set_id', practiceSetId)
      .order('updated_at', { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;

        if (error) {
          setSyncError(error.message);
          setSyncState('error');
          return;
        }

        const attempts = (data ?? []).reduce<Record<string, SavedPracticeAttempt>>((map, row) => {
          const typedRow = row as PracticeAttemptRow;
          map[typedRow.question_id] = {
            questionId: typedRow.question_id,
            answer: typedRow.answer ?? '',
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
  }, [authEnabled, configured, practiceSetId, supabase, user]);

  const saveAttempt = useCallback(
    async (attempt: SavePracticeAttemptInput) => {
      if (!supabase || !user) return;

      const nextSavedAttempt: SavedPracticeAttempt = {
        questionId: attempt.questionId,
        answer: attempt.answer,
        result: attempt.result,
        isCorrect: attempt.isCorrect,
        updatedAt: new Date().toISOString(),
      };

      setSavedAttempts((previous) => ({ ...previous, [attempt.questionId]: nextSavedAttempt }));
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
    [supabase, user],
  );

  return useMemo(
    () => ({
      canSync,
      savedAttempts,
      saveAttempt,
      syncError,
      syncState,
    }),
    [canSync, savedAttempts, saveAttempt, syncError, syncState],
  );
};
