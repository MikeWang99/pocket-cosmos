-- Phase 2: deterministic question-bank synchronization.
-- Adds a stable content hash so immutable versions are created only when
-- question content actually changes.

alter table public.questions
  add column if not exists position integer;

create index if not exists questions_practice_set_position_idx
  on public.questions (practice_set_id, position);

alter table public.question_versions
  add column if not exists content_hash text;

create unique index if not exists question_versions_question_hash_uidx
  on public.question_versions (question_id, content_hash)
  where content_hash is not null;

create or replace function public.resolve_latest_question_version_id(
  p_practice_set_id text,
  p_question_id text
)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select qv.id
  from public.questions q
  join public.question_versions qv on qv.question_id = q.id
  where q.practice_set_id = p_practice_set_id
    and q.legacy_question_id = p_question_id
    and q.status = 'active'
  order by qv.version desc
  limit 1;
$$;

revoke all on function public.resolve_latest_question_version_id(text, text)
  from public, anon, authenticated;
grant execute on function public.resolve_latest_question_version_id(text, text)
  to service_role;

create or replace function public.backfill_assignment_question_versions()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.assignment_items ai
  set question_version_id = public.resolve_latest_question_version_id(
    ai.practice_set_id,
    ai.question_id
  )
  where ai.question_version_id is null
    and public.resolve_latest_question_version_id(
      ai.practice_set_id,
      ai.question_id
    ) is not null;

  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;

revoke all on function public.backfill_assignment_question_versions()
  from public, anon, authenticated;
grant execute on function public.backfill_assignment_question_versions()
  to service_role;
