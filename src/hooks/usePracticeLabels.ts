import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getSupabaseClient } from '../lib/supabaseClient';
import { PRACTICE_LABELS, type PracticeLabel } from '../types/practice';

export type PracticeLabelSyncState = 'off' | 'loading' | 'idle' | 'syncing' | 'local';

type LabelsByQuestion = Record<string, PracticeLabel[]>;

const STORAGE_KEY = 'pocket-cosmos:practice-question-labels:v1';

const makeQuestionKey = (practiceSetId: string, questionId: string) => `${practiceSetId}:${questionId}`;

const isPracticeLabel = (value: unknown): value is PracticeLabel =>
  typeof value === 'string' && (PRACTICE_LABELS as readonly string[]).includes(value);

const readLocalLabels = (): LabelsByQuestion => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.entries(parsed).reduce<LabelsByQuestion>((result, [key, value]) => {
      if (!Array.isArray(value)) return result;
      const labels = value.filter(isPracticeLabel);
      if (labels.length) result[key] = labels;
      return result;
    }, {});
  } catch {
    return {};
  }
};

const writeLocalLabels = (labels: LabelsByQuestion) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(labels));
  } catch {
    // The UI remains usable if browser storage is unavailable.
  }
};

interface PracticeLabelRow {
  practice_set_id: string;
  question_id: string;
  labels: unknown;
}

/**
 * Stores admin annotations separately from answer progress.  This separation
 * is intentional: restarting a practice set can clear answers, but never
 * clears the teacher's question labels.
 */
export const usePracticeLabels = () => {
  const { authEnabled, configured, isAdmin, user } = useAuth();
  const supabase = getSupabaseClient();
  const [labelsByQuestion, setLabelsByQuestion] = useState<LabelsByQuestion>({});
  const [syncState, setSyncState] = useState<PracticeLabelSyncState>('off');

  const canSync = Boolean(authEnabled && configured && supabase && isAdmin && user);

  useEffect(() => {
    if (!isAdmin) {
      setLabelsByQuestion({});
      setSyncState('off');
      return undefined;
    }

    const localLabels = readLocalLabels();
    setLabelsByQuestion(localLabels);
    if (!canSync || !supabase || !user) {
      setSyncState('local');
      return undefined;
    }

    let mounted = true;
    setSyncState('loading');
    supabase
      .from('practice_question_labels')
      .select('practice_set_id, question_id, labels')
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          // Keep the local copy as a safe Preview fallback until the migration
          // has been applied to the connected Supabase project.
          setSyncState('local');
          return;
        }

        const remoteLabels = (data ?? []).reduce<LabelsByQuestion>((result, row) => {
          const typedRow = row as PracticeLabelRow;
          const labels = Array.isArray(typedRow.labels)
            ? typedRow.labels.filter(isPracticeLabel)
            : [];
          if (labels.length) result[makeQuestionKey(typedRow.practice_set_id, typedRow.question_id)] = labels;
          return result;
        }, {});
        // Once the table is available, the remote rows are authoritative. A
        // deleted label must not be resurrected by an older local snapshot.
        setLabelsByQuestion(remoteLabels);
        writeLocalLabels(remoteLabels);
        setSyncState('idle');
      }, () => {
        if (mounted) setSyncState('local');
      });

    return () => {
      mounted = false;
    };
  }, [canSync, isAdmin, supabase, user]);

  const getLabels = useCallback(
    (practiceSetId: string, questionId: string) => labelsByQuestion[makeQuestionKey(practiceSetId, questionId)] ?? [],
    [labelsByQuestion],
  );

  const toggleLabel = useCallback(
    async (practiceSetId: string, questionId: string, label: PracticeLabel) => {
      if (!isAdmin) return;

      const key = makeQuestionKey(practiceSetId, questionId);
      const currentLabels = labelsByQuestion[key] ?? [];
      const nextLabels = currentLabels.includes(label)
        ? currentLabels.filter((item) => item !== label)
        : [...currentLabels, label];
      const nextMap = { ...labelsByQuestion };
      if (nextLabels.length) nextMap[key] = nextLabels;
      else delete nextMap[key];
      setLabelsByQuestion(nextMap);
      writeLocalLabels(nextMap);

      if (!canSync || !supabase || !user) {
        setSyncState('local');
        return;
      }

      setSyncState('syncing');
      try {
        if (!nextLabels.length) {
          const { error } = await supabase
            .from('practice_question_labels')
            .delete()
            .eq('practice_set_id', practiceSetId)
            .eq('question_id', questionId);
          setSyncState(error ? 'local' : 'idle');
          return;
        }

        const { error } = await supabase.from('practice_question_labels').upsert(
          {
            practice_set_id: practiceSetId,
            question_id: questionId,
            labels: nextLabels,
            created_by: user.id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'practice_set_id,question_id' },
        );
        setSyncState(error ? 'local' : 'idle');
      } catch {
        setSyncState('local');
      }
    },
    [canSync, isAdmin, labelsByQuestion, supabase, user],
  );

  return useMemo(
    () => ({ labelsByQuestion, getLabels, toggleLabel, syncState }),
    [getLabels, labelsByQuestion, syncState, toggleLabel],
  );
};
