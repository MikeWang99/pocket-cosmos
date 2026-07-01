create extension if not exists pgcrypto;

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  student_email text,
  practice_set_id text not null,
  practice_set_title text not null,
  question_id text not null,
  question_title text not null,
  answer text not null default '',
  score numeric not null default 0,
  max_score numeric not null default 1,
  is_correct boolean not null default false,
  tags text[] not null default '{}',
  result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, practice_set_id, question_id)
);

create index if not exists practice_attempts_student_set_idx
  on public.practice_attempts (student_id, practice_set_id, updated_at desc);

alter table public.practice_attempts enable row level security;

drop policy if exists "practice_attempts_select_own" on public.practice_attempts;
create policy "practice_attempts_select_own"
  on public.practice_attempts for select
  using (student_id = auth.uid());

drop policy if exists "practice_attempts_insert_own" on public.practice_attempts;
create policy "practice_attempts_insert_own"
  on public.practice_attempts for insert
  with check (student_id = auth.uid());

drop policy if exists "practice_attempts_update_own" on public.practice_attempts;
create policy "practice_attempts_update_own"
  on public.practice_attempts for update
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

drop policy if exists "practice_attempts_delete_own" on public.practice_attempts;
create policy "practice_attempts_delete_own"
  on public.practice_attempts for delete
  using (student_id = auth.uid());
