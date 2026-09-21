-- Device-independent reset marker for practice progress.

create table if not exists public.practice_progress_resets (
  student_id uuid not null references auth.users(id) on delete cascade,
  practice_set_id text not null,
  reset_at timestamptz not null default now(),
  primary key (student_id, practice_set_id)
);

alter table public.practice_progress_resets enable row level security;

drop policy if exists "practice_progress_resets_select_own"
  on public.practice_progress_resets;
create policy "practice_progress_resets_select_own"
  on public.practice_progress_resets for select
  using (student_id = auth.uid());

drop policy if exists "practice_progress_resets_upsert_own"
  on public.practice_progress_resets;
create policy "practice_progress_resets_upsert_own"
  on public.practice_progress_resets for insert
  with check (student_id = auth.uid());

drop policy if exists "practice_progress_resets_update_own"
  on public.practice_progress_resets;
create policy "practice_progress_resets_update_own"
  on public.practice_progress_resets for update
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

grant select, insert, update on public.practice_progress_resets to authenticated;
