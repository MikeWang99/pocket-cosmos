-- Security and permission hardening for the learning platform.
-- This migration is intentionally additive/backward-compatible so the branch
-- can be rolled back without immediately dropping legacy columns.

-- 1) Keep the database permission vocabulary in sync with the frontend.
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

-- 2) Store private student-work object paths instead of durable public URLs.
alter table public.practice_attempts
  add column if not exists answer_image_path text;

-- Backfill paths produced by the previous getPublicUrl implementation.
update public.practice_attempts
set answer_image_path = regexp_replace(
  answer_image_url,
  '^.*/storage/v1/object/public/student-work/',
  ''
)
where answer_image_path is null
  and answer_image_url like '%/storage/v1/object/public/student-work/%';

-- Keep answer_image_url for one compatibility window. New application code
-- writes answer_image_path and resolves a short-lived signed URL at read time.

-- 3) Prepare private student-work reads without changing the bucket visibility
-- yet. The actual public -> private cutover is intentionally a manual second
-- step after the signed-URL application code is deployed and verified.
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

-- 4) Make assignment-item visibility explicit instead of relying only on the
-- parent table's RLS being applied inside the EXISTS subquery.
drop policy if exists "assignment_items_student_read" on public.assignment_items;

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
