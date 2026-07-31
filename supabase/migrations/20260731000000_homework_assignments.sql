create extension if not exists pgcrypto;

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  source_type text not null default 'manual'
    check (source_type in ('manual', 'ai')),
  due_at timestamptz,
  published_at timestamptz,
  assigned_to_all boolean not null default false,
  ai_instruction text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignment_items (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  position integer not null check (position >= 0),
  practice_set_id text not null,
  question_id text not null,
  practice_set_title text,
  question_title text,
  created_at timestamptz not null default now(),
  unique (assignment_id, position),
  unique (assignment_id, practice_set_id, question_id)
);

create table if not exists public.assignment_students (
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (assignment_id, student_id)
);

create index if not exists assignments_status_due_idx
  on public.assignments (status, due_at, created_at desc);

create index if not exists assignment_items_source_question_idx
  on public.assignment_items (practice_set_id, question_id);

create index if not exists assignment_students_student_idx
  on public.assignment_students (student_id, assigned_at desc);

create or replace function public.touch_assignment_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists assignments_touch_updated_at on public.assignments;
create trigger assignments_touch_updated_at
before update on public.assignments
for each row execute function public.touch_assignment_updated_at();

alter table public.assignments enable row level security;
alter table public.assignment_items enable row level security;
alter table public.assignment_students enable row level security;

drop policy if exists "assignments_admin_all" on public.assignments;
create policy "assignments_admin_all"
  on public.assignments for all
  using (public.is_practice_admin())
  with check (public.is_practice_admin());

drop policy if exists "assignments_student_read_published" on public.assignments;
create policy "assignments_student_read_published"
  on public.assignments for select
  using (
    status = 'published'
    and (
      assigned_to_all
      or exists (
        select 1
        from public.assignment_students
        where assignment_students.assignment_id = assignments.id
          and assignment_students.student_id = auth.uid()
      )
    )
  );

drop policy if exists "assignment_items_admin_all" on public.assignment_items;
create policy "assignment_items_admin_all"
  on public.assignment_items for all
  using (public.is_practice_admin())
  with check (public.is_practice_admin());

drop policy if exists "assignment_items_student_read" on public.assignment_items;
create policy "assignment_items_student_read"
  on public.assignment_items for select
  using (
    exists (
      select 1
      from public.assignments
      where assignments.id = assignment_items.assignment_id
    )
  );

drop policy if exists "assignment_students_admin_all" on public.assignment_students;
create policy "assignment_students_admin_all"
  on public.assignment_students for all
  using (public.is_practice_admin())
  with check (public.is_practice_admin());

drop policy if exists "assignment_students_student_read_own" on public.assignment_students;
create policy "assignment_students_student_read_own"
  on public.assignment_students for select
  using (student_id = auth.uid());

grant select on public.assignments to authenticated;
grant select on public.assignment_items to authenticated;
grant select on public.assignment_students to authenticated;
grant insert, update, delete on public.assignments to authenticated;
grant insert, update, delete on public.assignment_items to authenticated;
grant insert, update, delete on public.assignment_students to authenticated;

