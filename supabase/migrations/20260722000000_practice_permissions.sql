-- Profiles table: auto-populated on user signup for admin user listing
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now()
);

-- Trigger: upsert profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', new.email)
  )
  on conflict (user_id) do update set
    email = excluded.email,
    display_name = excluded.display_name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill existing users into profiles
insert into public.profiles (user_id, email, display_name)
select
  id,
  email,
  coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name', email)
from auth.users
on conflict (user_id) do nothing;

-- Practice permissions table
create table if not exists public.practice_permissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  system text not null check (system in ('ap-c-mech', 'ap-c-em', 'igcse')),
  granted_by uuid references auth.users(id),
  granted_at timestamptz not null default now(),
  unique (user_id, system)
);

create index if not exists practice_permissions_user_idx
  on public.practice_permissions (user_id);

-- RLS: profiles
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (user_id = auth.uid() or public.is_practice_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (user_id = auth.uid());

-- RLS: practice_permissions
alter table public.practice_permissions enable row level security;

drop policy if exists "permissions_select_own_or_admin" on public.practice_permissions;
create policy "permissions_select_own_or_admin"
  on public.practice_permissions for select
  using (user_id = auth.uid() or public.is_practice_admin());

drop policy if exists "permissions_insert_admin" on public.practice_permissions;
create policy "permissions_insert_admin"
  on public.practice_permissions for insert
  with check (public.is_practice_admin());

drop policy if exists "permissions_delete_admin" on public.practice_permissions;
create policy "permissions_delete_admin"
  on public.practice_permissions for delete
  using (public.is_practice_admin());
