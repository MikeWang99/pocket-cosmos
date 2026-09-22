-- MANUAL ROLLBACK for the private student-work cutover.
-- Use only if the application must temporarily return to the legacy public URL
-- implementation while investigating an incident.
begin;

update storage.buckets
set public = true
where id = 'student-work';

drop policy if exists "sw_public_read" on storage.objects;
create policy "sw_public_read"
on storage.objects for select to public
using (bucket_id = 'student-work');

commit;
