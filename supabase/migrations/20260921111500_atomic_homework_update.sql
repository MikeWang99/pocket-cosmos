-- Atomically replace a draft assignment's metadata, items, and audience.
-- A single RPC prevents partially updated homework when one client-side write fails.

create or replace function public.update_draft_assignment(
  p_assignment_id uuid,
  p_title text,
  p_description text,
  p_status text,
  p_source_type text,
  p_due_at timestamptz,
  p_assigned_to_all boolean,
  p_ai_instruction text,
  p_items jsonb,
  p_student_ids uuid[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
begin
  if not public.is_practice_admin() then
    raise exception 'Administrator access is required.';
  end if;

  if p_status not in ('draft', 'published', 'archived') then
    raise exception 'Invalid assignment status.';
  end if;

  if p_source_type not in ('manual', 'ai') then
    raise exception 'Invalid assignment source type.';
  end if;

  if jsonb_typeof(coalesce(p_items, '[]'::jsonb)) <> 'array' then
    raise exception 'Assignment items must be a JSON array.';
  end if;

  -- Lock the draft row so two teacher sessions cannot replace it concurrently.
  perform 1
  from public.assignments
  where id = p_assignment_id
    and status = 'draft'
  for update;

  if not found then
    raise exception 'Only draft assignments can be edited.';
  end if;

  delete from public.assignment_items
  where assignment_id = p_assignment_id;

  for item in
    select value from jsonb_array_elements(coalesce(p_items, '[]'::jsonb))
  loop
    insert into public.assignment_items (
      assignment_id,
      position,
      practice_set_id,
      question_id,
      practice_set_title,
      question_title
    )
    values (
      p_assignment_id,
      coalesce((item ->> 'position')::integer, 0),
      item ->> 'practice_set_id',
      item ->> 'question_id',
      item ->> 'practice_set_title',
      item ->> 'question_title'
    );
  end loop;

  delete from public.assignment_students
  where assignment_id = p_assignment_id;

  if not p_assigned_to_all then
    if coalesce(array_length(p_student_ids, 1), 0) = 0 then
      raise exception 'Select at least one valid student.';
    end if;

    insert into public.assignment_students (assignment_id, student_id)
    select p_assignment_id, student_id
    from unnest(p_student_ids) as student_id;
  end if;

  update public.assignments
  set
    title = p_title,
    description = p_description,
    status = p_status,
    source_type = p_source_type,
    due_at = p_due_at,
    published_at = case when p_status = 'published' then now() else null end,
    assigned_to_all = p_assigned_to_all,
    ai_instruction = p_ai_instruction,
    updated_at = now()
  where id = p_assignment_id;
end;
$$;

revoke all on function public.update_draft_assignment(
  uuid, text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from public;

grant execute on function public.update_draft_assignment(
  uuid, text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) to authenticated;
