-- Question-bank normalization foundation.
-- Existing code-based practice sets remain the active source during migration.
-- These tables are additive so question sets can be moved incrementally.

create table if not exists public.questions (
  id text primary key,
  practice_set_id text not null,
  legacy_question_id text not null,
  status text not null default 'active'
    check (status in ('active', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (practice_set_id, legacy_question_id)
);

create table if not exists public.question_versions (
  id uuid primary key default gen_random_uuid(),
  question_id text not null references public.questions(id) on delete cascade,
  version integer not null check (version > 0),
  stem text,
  choices jsonb not null default '[]'::jsonb,
  answer jsonb not null default '{}'::jsonb,
  explanation text,
  metadata jsonb not null default '{}'::jsonb,
  source_year integer,
  source_ref text,
  created_at timestamptz not null default now(),
  unique (question_id, version)
);

create table if not exists public.question_assets (
  id uuid primary key default gen_random_uuid(),
  question_version_id uuid not null references public.question_versions(id) on delete cascade,
  role text not null
    check (role in ('stem', 'figure', 'choice', 'answer', 'source')),
  storage_bucket text not null,
  storage_path text not null,
  choice_key text,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (question_version_id, role, storage_bucket, storage_path)
);

create index if not exists questions_practice_set_idx
  on public.questions (practice_set_id, legacy_question_id);

create index if not exists question_versions_question_idx
  on public.question_versions (question_id, version desc);

create index if not exists question_assets_version_idx
  on public.question_assets (question_version_id, role, sort_order);

-- Homework assignments can gradually pin an immutable question version.
-- Nullable during the migration so all existing assignments continue working.
alter table public.assignment_items
  add column if not exists question_version_id uuid
    references public.question_versions(id) on delete restrict;

create index if not exists assignment_items_question_version_idx
  on public.assignment_items (question_version_id)
  where question_version_id is not null;

-- Keep the normalized question bank server-only until entitlement-aware
-- question APIs are introduced. Supabase projects may have permissive default
-- grants on public-schema tables, so revoke them explicitly.
alter table public.questions enable row level security;
alter table public.question_versions enable row level security;
alter table public.question_assets enable row level security;

revoke all on public.questions from anon, authenticated;
revoke all on public.question_versions from anon, authenticated;
revoke all on public.question_assets from anon, authenticated;
