-- Remove default PUBLIC execution from security-definer RPCs.

revoke execute on function public.is_practice_admin() from public, anon;
grant execute on function public.is_practice_admin() to authenticated;

revoke execute on function public.create_homework_assignment(
  text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from public, anon;
grant execute on function public.create_homework_assignment(
  text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) to authenticated;

revoke execute on function public.update_draft_assignment(
  uuid, text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from public, anon;
grant execute on function public.update_draft_assignment(
  uuid, text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) to authenticated;

-- Trigger-only helper should not be callable through the API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Legacy admin helpers remain available after sign-in, but not anonymously.
revoke execute on function public.bootstrap_admin() from public, anon;
grant execute on function public.bootstrap_admin() to authenticated;

revoke execute on function public.redeem_admin_code(text) from public, anon;
grant execute on function public.redeem_admin_code(text) to authenticated;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.touch_assignment_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
