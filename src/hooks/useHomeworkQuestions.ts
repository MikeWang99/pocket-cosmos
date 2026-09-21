import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { ResolvedHomeworkItem } from '../homework/types';

export function useHomeworkQuestions(assignmentId: string | null) {
  const { session } = useAuth();
  const [items, setItems] = useState<ResolvedHomeworkItem[]>([]);
  const [loading, setLoading] = useState(Boolean(assignmentId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assignmentId || !session?.access_token) {
      setItems([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    setLoading(true);
    setError(null);

    void fetch(`/api/homework/assignments/${encodeURIComponent(assignmentId)}/questions`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          items?: ResolvedHomeworkItem[];
          error?: string;
        };
        if (!response.ok) throw new Error(payload.error ?? 'Unable to load assignment questions.');
        return payload.items ?? [];
      })
      .then((nextItems) => {
        if (!mounted) return;
        setItems(nextItems);
      })
      .catch((cause: unknown) => {
        if (!mounted || controller.signal.aborted) return;
        setItems([]);
        setError(cause instanceof Error ? cause.message : 'Unable to load assignment questions.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [assignmentId, session?.access_token]);

  return { items, loading, error };
}
