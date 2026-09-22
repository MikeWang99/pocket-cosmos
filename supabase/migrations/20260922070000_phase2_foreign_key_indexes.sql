-- Phase 2 performance hardening.
-- Add covering indexes for foreign keys reported by the Supabase database advisor.
-- These are additive and safe to leave in place during application rollback.

create index if not exists admin_invite_codes_created_by_idx
  on public.admin_invite_codes (created_by);

create index if not exists admin_users_granted_by_idx
  on public.admin_users (granted_by);

create index if not exists assignments_created_by_idx
  on public.assignments (created_by);

create index if not exists practice_attempt_events_question_version_id_idx
  on public.practice_attempt_events (question_version_id);

create index if not exists practice_permissions_granted_by_idx
  on public.practice_permissions (granted_by);
