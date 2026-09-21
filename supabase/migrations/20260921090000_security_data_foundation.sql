-- Phase 1 security/data-foundation hardening.
-- This migration is intentionally additive/reversible at the Git level and
-- can be rolled back independently from later question-bank migrations.

-- 1) Practice permissions: keep the database contract aligned with the
-- learner-facing systems supported by the application.
alter table public.practice_permissions
  drop constraint if exists practice_permissions_system_check;

alter table public.practice_permissions
  add constraint practice_permissions_system_check
  check (
    system in (
      'ap-physics-1',
      'ap-physics-2',
      'ap-c-mech',
      'ap-c-em',
      'igcse',
      'competition',
      'bpho',
      'a-level',
      'physics-bowl'
    )
  );

-- 2) Homework item visibility must inherit the visibility of its parent
-- assignment. The previous policy only checked that a parent row existed.
drop policy if exists "assignment_items_student_read"
  on public.assignment_items;

create policy "assignment_items_student_read"
  on public.assignment_items for select
  using (
    exists (
      select 1
      from public.assignments
      where assignments.id = assignment_items.assignment_id
        and assignments.status = 'published'
        and (
          assignments.assigned_to_all
          or exists (
            select 1
            from public.assignment_students
            where assignment_students.assignment_id = assignments.id
              and assignment_students.student_id = auth.uid()
          )
        )
    )
  );

-- 3) Student handwritten work is private learning data. Keep the bucket
-- private and authorize reads only for the owner or a practice administrator.
update storage.buckets
set public = false
where id = 'student-work';

drop policy if exists "sw_public_read" on storage.objects;
drop policy if exists "sw_select_own_or_admin" on storage.objects;

create policy "sw_select_own_or_admin"
on storage.objects for select to authenticated
using (
  bucket_id = 'student-work'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.is_practice_admin()
  )
);
