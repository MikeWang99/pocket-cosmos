create or replace function public.is_practice_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = any (
    array[
      'mike.wang.de@gmail.com'
    ]
  );
$$;

grant execute on function public.is_practice_admin() to authenticated;

drop policy if exists "practice_attempts_select_own" on public.practice_attempts;
drop policy if exists "practice_attempts_select_own_or_admin" on public.practice_attempts;

create policy "practice_attempts_select_own_or_admin"
  on public.practice_attempts for select
  using (student_id = auth.uid() or public.is_practice_admin());

create index if not exists practice_attempts_admin_review_idx
  on public.practice_attempts (student_email, practice_set_id, updated_at desc);
