-- Phase 2 analytics: keep the immutable question version on the latest
-- practice state as well as on append-only history events.

alter table public.practice_attempts
  add column if not exists question_version_id uuid
    references public.question_versions(id) on delete set null;

create index if not exists practice_attempts_question_version_idx
  on public.practice_attempts (question_version_id)
  where question_version_id is not null;
