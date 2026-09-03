import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getSupabaseClient } from '../lib/supabaseClient';

export const ALL_SYSTEMS = [
  'ap-physics-1',
  'ap-physics-2',
  'ap-c-mech',
  'ap-c-em',
  'igcse',
  'competition',
  'bpho',
  'a-level',
  'physics-bowl',
] as const;
export type PracticeSystem = (typeof ALL_SYSTEMS)[number];

interface PermissionRow {
  system: string;
}

/**
 * Returns the set of practice systems the current user is allowed to access.
 * - Admin: all systems
 * - Auth disabled / not configured: all systems (preserve existing behavior)
 * - Logged-in user: only granted systems
 * - Not logged in: empty set (locked)
 */
export function usePracticePermissions() {
  const { authEnabled, configured, isAdmin, user } = useAuth();
  const supabase = getSupabaseClient();
  const [grantedSystems, setGrantedSystems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const bypassPermissions = !authEnabled || !configured || !supabase;

  useEffect(() => {
    if (bypassPermissions || isAdmin) {
      setGrantedSystems(new Set(ALL_SYSTEMS));
      setLoading(false);
      return;
    }

    if (!user) {
      setGrantedSystems(new Set());
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    supabase
      .from('practice_permissions')
      .select('system')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          // On error, fail open to avoid locking out users due to infra issues
          setGrantedSystems(new Set(ALL_SYSTEMS));
        } else {
          setGrantedSystems(new Set((data ?? []).map((row: PermissionRow) => row.system)));
        }
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [bypassPermissions, isAdmin, user, supabase]);

  const allowedSystems = useMemo(() => grantedSystems, [grantedSystems]);

  const hasAccess = useMemo(
    () => (system: string) => bypassPermissions || isAdmin || grantedSystems.has(system),
    [bypassPermissions, isAdmin, grantedSystems],
  );

  return { allowedSystems, hasAccess, loading };
}
