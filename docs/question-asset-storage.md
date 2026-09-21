# Question asset storage

Pocket Cosmos separates code, question metadata, public question media, private source documents, and private student work.

## Storage buckets

- `question-assets`: private figures, diagrams, and choice images for gated question banks. Store bucket/path references and resolve them to short-lived signed URLs only after authorization.
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
5. Store the resulting bucket/path in `question_assets` or in the import payload. Do not persist public URLs or short-lived signed URLs. Resolve private media only after the learner has passed the same entitlement check as the question body.

Use `--bucket source-documents` for original PDFs. That bucket is private and requires an admin session or server-side service role for access.

## Existing assets

Existing `public/` assets remain in place during the migration so production URLs do not break. Move them in batches only after references are rewritten and verified in Preview.


## Public samples

Public sample questions may continue to use version-controlled static assets while the migration is incremental. If a dedicated public-sample bucket is introduced later, keep it separate from `question-assets` so making samples public can never expose the paid bank.
