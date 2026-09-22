-- MANUAL CUTOVER: run only after the signed-URL application code is deployed
-- and verified in production.
begin;

update storage.buckets
set public = false
where id = 'student-work';

drop policy if exists "sw_public_read" on storage.objects;

commit;
