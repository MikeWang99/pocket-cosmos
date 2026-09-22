# Question Asset Storage

This document defines the storage boundary for new Pocket Cosmos question-bank imports.

## Rule

Do **not** add new question figures, answer-choice images, rendered pages, or source PDFs to `public/`.

Existing assets remain in place during the migration window. New imports use Supabase Storage.

## Buckets

### `question-assets`

Public, cacheable learner-facing assets:

- question figures
- diagrams
- answer-choice images
- other images required to render a question

Store the **storage path** in question metadata whenever possible. A public URL can be derived for rendering.

Recommended path format:

```
<system>/<course-or-bank>/<year-or-unit>/<question-id>/<asset-name>
```

Example:

```
ap-physics-1/unit-1/2026/q-004/figure-1.webp
```

### `source-documents`

Private provenance/source material:

- original PDFs
- high-resolution source scans
- files used to regenerate crops

These files should not be linked directly from the learner UI.

## Local import workflow

1. Put import files under an ignored staging directory:

```
staging/question-assets/
staging/source-documents/
```

2. Create a JSON manifest:

```json
{
  "assets": [
    {
      "localPath": "staging/question-assets/ap1/u1/q1.webp",
      "storagePath": "ap-physics-1/unit-1/2026/q-001/figure-1.webp",
      "bucket": "question-assets",
      "contentType": "image/webp"
    },
    {
      "localPath": "staging/source-documents/ap1-u1.pdf",
      "storagePath": "ap-physics-1/unit-1/2026/source.pdf",
      "bucket": "source-documents",
      "contentType": "application/pdf"
    }
  ]
}
```

3. Export credentials locally. The service-role key must never be exposed to browser code or committed to Git.

```bash
export NEXT_PUBLIC_SUPABASE_URL="..."
export SUPABASE_SERVICE_ROLE_KEY="..."
```

4. Upload:

```bash
pnpm assets:upload path/to/manifest.json
```

Use `--upsert` only when intentionally replacing an existing object.

## Migration policy

- Existing `public/` question assets are legacy-compatible and are not removed in this PR.
- New large question-bank imports must use object storage.
- Migrate old banks in small batches and verify rendered questions before deleting Git-tracked copies.
- Do not rewrite Git history until all production references have been verified against object storage and a repository backup exists.
