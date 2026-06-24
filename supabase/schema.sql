create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid references auth.users(id) on delete set null,
  source text not null default 'manual',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_bootstrap_emails (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_invite_codes (
  id uuid primary key default gen_random_uuid(),
  code_digest text not null unique,
  label text,
  expires_at timestamptz,
  max_uses integer,
  use_count integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create table if not exists public.practice_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  student_email text,
  display_name text,
  practice_set_id text not null,
  practice_set_title text not null,
  question_id text not null,
  question_title text not null,
  answer text not null,
  score numeric not null,
  max_score numeric not null,
  is_correct boolean not null default false,
  tags text[] not null default '{}',
  result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists practice_submissions_student_created_idx
  on public.practice_submissions (student_id, created_at desc);

create index if not exists practice_submissions_created_idx
  on public.practice_submissions (created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function public.bootstrap_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null or current_email = '' then
    return false;
  end if;

  if exists (select 1 from public.admin_bootstrap_emails where lower(email) = current_email) then
    insert into public.admin_users (user_id, granted_by, source)
    values (auth.uid(), auth.uid(), 'bootstrap_email')
    on conflict (user_id) do nothing;
    return true;
  end if;

  return false;
end;
$$;

create or replace function public.redeem_admin_code(raw_code text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  matched_id uuid;
begin
  if auth.uid() is null or length(trim(raw_code)) < 6 then
    return false;
  end if;

  update public.admin_invite_codes
  set use_count = use_count + 1
  where code_digest = encode(digest(trim(raw_code), 'sha256'), 'hex')
    and revoked_at is null
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses)
  returning id into matched_id;

  if matched_id is null then
    return false;
  end if;

  insert into public.admin_users (user_id, granted_by, source)
  values (auth.uid(), auth.uid(), 'invite_code')
  on conflict (user_id) do nothing;

  return true;
end;
$$;

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_bootstrap_emails enable row level security;
alter table public.admin_invite_codes enable row level security;
alter table public.practice_submissions enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (user_id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "admin_users_select_own_or_admin" on public.admin_users;
create policy "admin_users_select_own_or_admin"
  on public.admin_users for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "admin_users_insert_admin" on public.admin_users;
create policy "admin_users_insert_admin"
  on public.admin_users for insert
  with check (public.is_admin());

drop policy if exists "admin_bootstrap_emails_admin_only" on public.admin_bootstrap_emails;
create policy "admin_bootstrap_emails_admin_only"
  on public.admin_bootstrap_emails for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_invite_codes_admin_only" on public.admin_invite_codes;
create policy "admin_invite_codes_admin_only"
  on public.admin_invite_codes for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "practice_submissions_select_own_or_admin" on public.practice_submissions;
create policy "practice_submissions_select_own_or_admin"
  on public.practice_submissions for select
  using (student_id = auth.uid() or public.is_admin());

drop policy if exists "practice_submissions_insert_own" on public.practice_submissions;
create policy "practice_submissions_insert_own"
  on public.practice_submissions for insert
  with check (student_id = auth.uid());

drop policy if exists "practice_submissions_update_admin" on public.practice_submissions;
create policy "practice_submissions_update_admin"
  on public.practice_submissions for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "practice_submissions_delete_admin" on public.practice_submissions;
create policy "practice_submissions_delete_admin"
  on public.practice_submissions for delete
  using (public.is_admin());

-- After creating the Supabase project, insert your own login email once:
-- insert into public.admin_bootstrap_emails (email) values ('your-email@example.com');
--
-- To create an admin code later:
-- insert into public.admin_invite_codes (code_digest, label, max_uses)
-- values (encode(digest('replace-with-a-long-random-code', 'sha256'), 'hex'), 'Initial admin code', 3);
