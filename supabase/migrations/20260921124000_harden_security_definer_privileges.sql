-- Reconcile production hardening discovered during Phase 2 rollout.

revoke execute on function public.create_homework_assignment(
  text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from anon;

revoke execute on function public.update_draft_assignment(
  uuid, text, text, text, text, timestamptz, boolean, text, jsonb, uuid[]
) from anon;

revoke execute on function public.is_practice_admin() from anon;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.bootstrap_admin() from anon;
revoke execute on function public.redeem_admin_code(text) from anon;
revoke execute on function public.is_admin() from anon;

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
