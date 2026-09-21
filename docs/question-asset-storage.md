# Question asset storage

Pocket Cosmos separates code, question metadata, public question media, private source documents, and private student work.

## Storage buckets

- `question-assets`: public figures, diagrams, and choice images that are rendered in learner-facing questions.
- `source-documents`: private source PDFs and archival originals used for import/audit.
- `student-work`: private student-uploaded answer images.

## New question-bank rule

Do not commit newly generated question images or source PDFs into `public/`.

1. Generate the question bank locally.
2. Dry-run the upload:
   ```bash
   pnpm assets:upload -- --source ./output/assets --prefix ap1/unit-2
   ```
3. Review the generated manifest.
4. Upload:
   ```bash
   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
   pnpm assets:upload -- --source ./output/assets --prefix ap1/unit-2 --apply
   ```
5. Store the resulting bucket/path in `question_assets` or in the import payload. Do not persist short-lived signed URLs.

Use `--bucket source-documents` for original PDFs. That bucket is private and requires an admin session or server-side service role for access.

## Existing assets

Existing `public/` assets remain in place during the migration so production URLs do not break. Move them in batches only after references are rewritten and verified in Preview.
