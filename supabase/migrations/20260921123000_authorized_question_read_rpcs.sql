-- Authenticated, entitlement-aware readers for normalized immutable questions.
-- These functions keep question tables server-only while allowing the app to
-- retrieve exactly the data the signed-in learner is authorized to see.

create or replace function public.get_authorized_practice_steps(
  p_practice_set_id text
)
returns table(
  sort_position integer,
  question_id text,
  question_version_id uuid,
  metadata jsonb
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  required_system text;
begin
  if auth.uid() is null then
    raise exception 'Authentication required.' using errcode = '42501';
  end if;

  select latest.metadata -> 'practiceSet' ->> 'system'
  into required_system
  from public.questions q
  join lateral (
    select qv.metadata
    from public.question_versions qv
    where qv.question_id = q.id
    order by qv.version desc
    limit 1
  ) latest on true
  where q.practice_set_id = p_practice_set_id
    and q.status = 'active'
  order by q.position
  limit 1;

  if required_system is null then
    return;
  end if;

  if not public.is_practice_admin()
     and not exists (
       select 1
       from public.practice_permissions pp
       where pp.user_id = auth.uid()
         and pp.system = required_system
     ) then
    raise exception 'Practice set is locked.' using errcode = '42501';
  end if;

  return query
  select
    q.position,
    q.legacy_question_id,
    latest.id,
    latest.metadata
  from public.questions q
  join lateral (
    select qv.id, qv.metadata
    from public.question_versions qv
    where qv.question_id = q.id
    order by qv.version desc
    limit 1
  ) latest on true
  where q.practice_set_id = p_practice_set_id
    and q.status = 'active'
  order by q.position;
end;
$$;

create or replace function public.get_authorized_assignment_question_steps(
  p_assignment_id uuid
)
returns table(
  item_id uuid,
  sort_position integer,
  question_version_id uuid,
  metadata jsonb
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required.' using errcode = '42501';
  end if;

  if not public.is_practice_admin()
     and not exists (
       select 1
       from public.assignments a
       where a.id = p_assignment_id
         and a.status = 'published'
         and (
           a.assigned_to_all
           or exists (
             select 1
             from public.assignment_students ast
             where ast.assignment_id = a.id
               and ast.student_id = auth.uid()
           )
         )
     ) then
    raise exception 'Assignment is not available.' using errcode = '42501';
  end if;

  return query
  select
    ai.id,
    ai.position,
    ai.question_version_id,
    qv.metadata
  from public.assignment_items ai
  left join public.question_versions qv
    on qv.id = ai.question_version_id
  where ai.assignment_id = p_assignment_id
  order by ai.position;
end;
$$;

revoke all on function public.get_authorized_practice_steps(text)
  from public, anon;
grant execute on function public.get_authorized_practice_steps(text)
  to authenticated;

revoke all on function public.get_authorized_assignment_question_steps(uuid)
  from public, anon;
grant execute on function public.get_authorized_assignment_question_steps(uuid)
  to authenticated;
