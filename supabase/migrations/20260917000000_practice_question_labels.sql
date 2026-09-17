create table if not exists public.practice_question_labels (
  id uuid primary key default gen_random_uuid(),
  practice_set_id text not null,
  question_id text not null,
  labels text[] not null default '{}',
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (practice_set_id, question_id)
);

create index if not exists practice_question_labels_lookup_idx
  on public.practice_question_labels (practice_set_id, question_id);

alter table public.practice_question_labels enable row level security;

drop policy if exists "practice_question_labels_admin_select" on public.practice_question_labels;
drop policy if exists "practice_question_labels_admin_insert" on public.practice_question_labels;
drop policy if exists "practice_question_labels_admin_update" on public.practice_question_labels;
drop policy if exists "practice_question_labels_admin_delete" on public.practice_question_labels;

create policy "practice_question_labels_admin_select"
  on public.practice_question_labels for select
  using (public.is_practice_admin());

create policy "practice_question_labels_admin_insert"
  on public.practice_question_labels for insert
  with check (public.is_practice_admin() and created_by = auth.uid());

create policy "practice_question_labels_admin_update"
  on public.practice_question_labels for update
  using (public.is_practice_admin())
  with check (public.is_practice_admin() and created_by = auth.uid());

create policy "practice_question_labels_admin_delete"
  on public.practice_question_labels for delete
  using (public.is_practice_admin());

grant select, insert, update, delete on public.practice_question_labels to authenticated;
