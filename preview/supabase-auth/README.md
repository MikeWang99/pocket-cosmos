# Supabase Auth Preview Archive

This folder keeps the removed login/admin module for offline preview work.

The production site no longer imports these files. GitHub Pages only deploys the `main` branch, so this preview archive is not served at `pocket-cosmos.com`.

Archived pieces:

- `src/AuthContext.tsx`
- `src/components/AuthModal.tsx`
- `src/components/AuthStatusButton.tsx`
- `src/components/AdminSection.tsx`
- `src/lib/supabase.ts`
- `supabase/schema.sql`
- `supabase/README.md`

When the login module is ready again, rebuild it behind a preview-only feature flag or on a non-deploying branch first. Do not re-enable the top navigation, sidebar Admin tab, or practice submission sync on production until the auth flow has been tested end to end locally.
