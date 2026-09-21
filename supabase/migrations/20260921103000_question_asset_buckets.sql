-- Storage layout for scalable question-bank assets.
--
-- question-assets: private figures and choice images used by gated
-- learner-facing question pages. Serve them through short-lived signed URLs
-- (or an authenticated server endpoint) so paid question media cannot be
-- fetched directly by guessing an object path.
-- source-documents: private source PDFs / archival originals used for import
-- and audit; only practice administrators may read or write them.

insert into storage.buckets (id, name, public)
values ('question-assets', 'question-assets', false)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('source-documents', 'source-documents', false)
on conflict (id) do update set public = excluded.public;

drop policy if exists "question_assets_admin_select" on storage.objects;
create policy "question_assets_admin_select"
on storage.objects for select to authenticated
using (bucket_id = 'question-assets' and public.is_practice_admin());

drop policy if exists "question_assets_admin_insert" on storage.objects;
create policy "question_assets_admin_insert"
on storage.objects for insert to authenticated
with check (bucket_id = 'question-assets' and public.is_practice_admin());

drop policy if exists "question_assets_admin_update" on storage.objects;
create policy "question_assets_admin_update"
on storage.objects for update to authenticated
using (bucket_id = 'question-assets' and public.is_practice_admin())
with check (bucket_id = 'question-assets' and public.is_practice_admin());

drop policy if exists "question_assets_admin_delete" on storage.objects;
create policy "question_assets_admin_delete"
on storage.objects for delete to authenticated
using (bucket_id = 'question-assets' and public.is_practice_admin());

drop policy if exists "source_documents_admin_select" on storage.objects;
create policy "source_documents_admin_select"
on storage.objects for select to authenticated
using (bucket_id = 'source-documents' and public.is_practice_admin());

drop policy if exists "source_documents_admin_insert" on storage.objects;
create policy "source_documents_admin_insert"
on storage.objects for insert to authenticated
with check (bucket_id = 'source-documents' and public.is_practice_admin());

drop policy if exists "source_documents_admin_update" on storage.objects;
create policy "source_documents_admin_update"
on storage.objects for update to authenticated
using (bucket_id = 'source-documents' and public.is_practice_admin())
with check (bucket_id = 'source-documents' and public.is_practice_admin());

drop policy if exists "source_documents_admin_delete" on storage.objects;
create policy "source_documents_admin_delete"
on storage.objects for delete to authenticated
using (bucket_id = 'source-documents' and public.is_practice_admin());
