-- Object-storage foundations for question-bank assets.
-- Existing /public assets stay untouched; new question-bank imports should use
-- these buckets so the Git repository stops growing with binary content.

insert into storage.buckets (id, name, public)
values ('question-assets', 'question-assets', true)
on conflict (id) do update set public = excluded.public;

insert into storage.buckets (id, name, public)
values ('source-documents', 'source-documents', false)
on conflict (id) do update set public = excluded.public;

-- Public question assets are readable by design, but uploads are performed
-- with the service-role ingestion script. No client write policy is added.
drop policy if exists "question_assets_public_read" on storage.objects;
create policy "question_assets_public_read"
on storage.objects for select to public
using (bucket_id = 'question-assets');

-- Original source PDFs remain private. Only the practice administrator may
-- inspect them through an authenticated Supabase session.
drop policy if exists "source_documents_admin_read" on storage.objects;
create policy "source_documents_admin_read"
on storage.objects for select to authenticated
using (
  bucket_id = 'source-documents'
  and public.is_practice_admin()
);
