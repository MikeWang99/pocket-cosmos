import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { AdminPracticeSetSummary } from '../practice/adminTypes';

export function useAdminPracticeCatalog() {
  const { isAdmin, session } = useAuth();
  const [sets, setSets] = useState<AdminPracticeSetSummary[]>([]);
  const [loading, setLoading] = useState(isAdmin);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin || !session?.access_token) {
      setSets([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    setLoading(true);
    setError(null);

    void fetch('/api/admin/practice/catalog', {
      headers: { Authorization: `Bearer ${session.access_token}` },
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          sets?: AdminPracticeSetSummary[];
          error?: string;
        };
        if (!response.ok) throw new Error(payload.error ?? 'Unable to load admin question catalog.');
        return payload.sets ?? [];
      })
      .then((nextSets) => {
        if (!mounted) return;
        setSets(nextSets);
      })
      .catch((cause: unknown) => {
        if (!mounted || controller.signal.aborted) return;
        setSets([]);
        setError(cause instanceof Error ? cause.message : 'Unable to load admin question catalog.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [isAdmin, session?.access_token]);

  return { sets, loading, error };
}
