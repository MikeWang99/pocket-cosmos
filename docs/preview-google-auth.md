# Preview Google Auth

This branch keeps Google login and practice progress behind Preview-only settings so production can stay unchanged.

## Vercel Preview environment variables

Set these for the Preview environment only:

```bash
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Leave `NEXT_PUBLIC_AUTH_ENABLED` unset or `false` in Production until the flow has been tested.

## Supabase setup

1. Run `supabase/migrations/20260701000000_create_practice_attempts.sql` in the Supabase SQL editor.
2. Enable Google in Supabase Auth providers.
3. Add the Preview deployment URL and local development URL to the Supabase redirect allow list.
4. In the Google OAuth app, add the Supabase Google callback URL shown in the Supabase provider settings.

The browser uses the Supabase anon key and row-level security. It never uses the service role key.
