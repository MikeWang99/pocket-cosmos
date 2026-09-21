# Supabase Phase 2 rollout

Phase 2 turns the normalized question schema into an active runtime source while keeping the legacy code bank as a rollback path.

## Safety model

- Production `main` remains unchanged until Preview is accepted.
- Database migrations are additive.
- Practice reads from normalized questions only when `QUESTION_DB_READS_ENABLED=true`.
- Homework items pin immutable `question_version_id` values when normalized data exists.
- Pinned Homework never silently falls back to a newer mutable code question.
- Private question media is stored as `storage://question-assets/<path>` and signed server-side.

## Rollout order

1. Apply migrations through `20260921121000_pin_homework_question_versions.sql` to a Supabase development branch or non-production project first.
2. Run a dry sync:
   ```bash
   pnpm questions:sync
   ```
3. Synchronize the code bank:
   ```bash
   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... pnpm questions:sync -- --apply
   ```
4. Verify the database:
   ```bash
   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... pnpm db:verify
   ```
5. Deploy the Phase 2 Vercel Preview with `QUESTION_DB_READS_ENABLED=false`.
6. Smoke-test legacy fallback paths.
7. Set `QUESTION_DB_READS_ENABLED=true` in Preview only and redeploy.
8. Test:
   - anonymous public sample
   - authorized Practice set
   - locked Practice set
   - create a draft Homework
   - publish it and confirm every normalized item has `question_version_id`
   - edit the source question, sync again, and confirm the already-published Homework still serves the old pinned version
   - submit Practice and Homework answers and confirm both latest-state and append-only history writes
   - reset Practice on one device and confirm another device honors the reset marker
   - upload, view, replace, and clear private student work
9. Only after Preview passes, apply the same environment flag to Production.

## Rollback

### Application-only rollback

Set:

```
QUESTION_DB_READS_ENABLED=false
```

and redeploy. Practice immediately falls back to the server-only code bank.

### Homework

Do not clear existing `question_version_id` values during rollback. They are historical integrity references. The pinned Homework API continues to use those immutable rows.

### Database

The Phase 2 schema is additive. Prefer leaving the tables and columns in place instead of dropping them during an incident. Disabling the read flag is safer than a destructive database rollback.

## Verification expectations

`pnpm db:verify` should report:

- `questions > 0`
- `question_versions >= questions`
- `student-work.public = false`
- `question-assets.public = false`
- `source-documents.public = false`
- no missing Phase 2 tables

Older assignments may remain temporarily unpinned if their referenced question no longer exists in the synchronized bank. Review those rows before publication.
