-- Append-only practice history for long-term learning analytics.
-- The existing practice_attempts table remains the fast "latest state" cache.
-- Application writes will be migrated to dual-write in a later phase.

create table if not exists public.practice_attempt_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  practice_set_id text not null,
  question_id text not null,
  question_version_id uuid references public.question_versions(id) on delete set null,
  assignment_id uuid references public.assignments(id) on delete set null,
  answer text not null default '',
  answer_image_ref text,
  score numeric not null default 0,
  max_score numeric not null default 1,
  is_correct boolean not null default false,
  tags text[] not null default '{}',
  result jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now()
);

create index if not exists practice_attempt_events_student_question_idx
  on public.practice_attempt_events
    (student_id, practice_set_id, question_id, submitted_at desc);

create index if not exists practice_attempt_events_assignment_idx
  on public.practice_attempt_events (assignment_id, submitted_at desc)
  where assignment_id is not null;

alter table public.practice_attempt_events enable row level security;

drop policy if exists "practice_attempt_events_select_own_or_admin"
  on public.practice_attempt_events;
create policy "practice_attempt_events_select_own_or_admin"
  on public.practice_attempt_events for select
  using (student_id = auth.uid() or public.is_practice_admin());

drop policy if exists "practice_attempt_events_insert_own"
  on public.practice_attempt_events;
create policy "practice_attempt_events_insert_own"
  on public.practice_attempt_events for insert
  with check (student_id = auth.uid());

grant select, insert on public.practice_attempt_events to authenticated;
