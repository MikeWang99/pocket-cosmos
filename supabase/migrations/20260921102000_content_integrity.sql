-- Preserve learning history and freeze homework content at publish-time.

-- 1) Append-only practice attempt history. The existing practice_attempts table
-- remains the fast "latest state" table; this table records every future
-- insert/update so long-term progress is not overwritten.
create table if not exists public.practice_attempt_history (
  id uuid primary key default gen_random_uuid(),
  source_attempt_id uuid not null references public.practice_attempts(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  student_email text,
  practice_set_id text not null,
  practice_set_title text not null,
  question_id text not null,
  question_title text not null,
  answer text not null default '',
  answer_image_path text,
  answer_image_url text,
  score numeric not null default 0,
  max_score numeric not null default 1,
  is_correct boolean not null default false,
  tags text[] not null default '{}',
  result jsonb not null default '{}'::jsonb,
  recorded_at timestamptz not null default now()
);

create index if not exists practice_attempt_history_student_set_time_idx
  on public.practice_attempt_history (student_id, practice_set_id, recorded_at desc);

create index if not exists practice_attempt_history_question_time_idx
  on public.practice_attempt_history (practice_set_id, question_id, recorded_at desc);

alter table public.practice_attempt_history enable row level security;

drop policy if exists "practice_attempt_history_select_own_or_admin"
  on public.practice_attempt_history;

create policy "practice_attempt_history_select_own_or_admin"
  on public.practice_attempt_history for select
  using (student_id = auth.uid() or public.is_practice_admin());

create or replace function public.capture_practice_attempt_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.practice_attempt_history (
    source_attempt_id,
    student_id,
    student_email,
    practice_set_id,
    practice_set_title,
    question_id,
    question_title,
    answer,
    answer_image_path,
    answer_image_url,
    score,
    max_score,
    is_correct,
    tags,
    result,
    recorded_at
  )
  values (
    new.id,
    new.student_id,
    new.student_email,
    new.practice_set_id,
    new.practice_set_title,
    new.question_id,
    new.question_title,
    new.answer,
    new.answer_image_path,
    new.answer_image_url,
    new.score,
    new.max_score,
    new.is_correct,
    new.tags,
    new.result,
    coalesce(new.updated_at, now())
  );
  return new;
end;
$$;

drop trigger if exists practice_attempts_capture_history on public.practice_attempts;
create trigger practice_attempts_capture_history
after insert or update on public.practice_attempts
for each row execute function public.capture_practice_attempt_history();

-- 2) Freeze the exact question payload inside each homework item. Existing
-- rows remain compatible and fall back to the live catalog until backfilled.
alter table public.assignment_items
  add column if not exists question_snapshot jsonb;

alter table public.assignment_items
  add column if not exists question_snapshot_version smallint not null default 1;
