-- Create an assignment, its items, and audience in one transaction.

create or replace function public.create_homework_assignment(
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
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_assignment_id uuid;
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

  if not p_assigned_to_all and coalesce(array_length(p_student_ids, 1), 0) = 0 then
    raise exception 'Select at least one valid student.';
  end if;

  insert into public.assignments (
    title,
    description,
    status,
    source_type,
    due_at,
    published_at,
    assigned_to_all,
    ai_instruction,
    created_by
  )
  values (
    p_title,
    p_description,
    p_status,
    p_source_type,
    p_due_at,
    case when p_status = 'published' then now() else null end,
    p_assigned_to_all,
    p_ai_instruction,
    auth.uid()
  )
  returning id into new_assignment_id;

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
      new_assignment_id,
      coalesce((item ->> 'position')::integer, 0),
      item ->> 'practice_set_id',
      item ->> 'question_id',
      item ->> 'practice_set_title',
      item ->> 'question_title'
    );
  end loop;

  if not p_assigned_to_all then
    insert into public.assignment_students (assignment_id, student_id)
    select new_assignment_id, student_id
    from unnest(p_student_ids) as student_id;
  end if;

  return new_assignment_id;
end;
$$;

revoke all on function public.create_homework_assignment(
  text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from public;

grant execute on function public.create_homework_assignment(
  text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) to authenticated;
