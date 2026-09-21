import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { PracticeSetMeta, PracticeSetPayload } from '../practice/types';

export type PracticeSetAccess = 'full' | 'sample' | 'locked';

export function usePracticeCatalog() {
  const [sets, setSets] = useState<PracticeSetMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    void fetch('/api/practice/catalog')
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load practice catalog.');
        return response.json() as Promise<{ sets: PracticeSetMeta[] }>;
      })
      .then((payload) => {
        if (!mounted) return;
        setSets(payload.sets ?? []);
        setError(null);
      })
      .catch((cause: unknown) => {
        if (!mounted) return;
        setSets([]);
        setError(cause instanceof Error ? cause.message : 'Unable to load practice catalog.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { sets, loading, error };
}

export function usePracticeSet(setId: string | null) {
  const { session } = useAuth();
  const [set, setSet] = useState<PracticeSetPayload | null>(null);
  const [access, setAccess] = useState<PracticeSetAccess>('locked');
  const [loading, setLoading] = useState(Boolean(setId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!setId) {
      setSet(null);
      setAccess('locked');
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    setLoading(true);
    setError(null);

    const headers: HeadersInit = {};
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    void fetch(`/api/practice/sets/${encodeURIComponent(setId)}`, {
      headers,
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          set?: PracticeSetPayload;
          access?: 'full' | 'sample';
          error?: string;
        };

        if (!response.ok || !payload.set) {
          const error = new Error(payload.error ?? 'Unable to load practice set.');
          (error as Error & { status?: number }).status = response.status;
          throw error;
        }

        return payload;
      })
      .then((payload) => {
        if (!mounted) return;
        setSet(payload.set ?? null);
        setAccess(payload.access ?? 'locked');
        setError(null);
      })
      .catch((cause: unknown) => {
        if (!mounted || controller.signal.aborted) return;
        const status = (cause as Error & { status?: number })?.status;
        setSet(null);
        setAccess(status === 403 ? 'locked' : 'locked');
        setError(cause instanceof Error ? cause.message : 'Unable to load practice set.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [session?.access_token, setId]);

  return { set, access, loading, error };
}
