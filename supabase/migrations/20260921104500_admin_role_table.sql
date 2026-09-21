-- Replace hard-coded admin email checks with a role table.
-- The email literal below is used only once to bootstrap the existing owner;
-- ongoing authorization is based exclusively on auth.users.id.

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;
revoke all on public.app_admins from anon, authenticated;

insert into public.app_admins (user_id)
select id
from auth.users
where lower(email) = 'mike.wang.de@gmail.com'
on conflict (user_id) do nothing;

create or replace function public.is_practice_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_practice_admin() to authenticated;
