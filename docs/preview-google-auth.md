# Preview Auth

This branch keeps the account modal, Google login, email login, and practice progress behind Preview-only settings so production can stay unchanged.

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
2. Enable Google in Supabase Auth providers if Google login should be tested.
3. Add the Preview deployment URL and local development URL to the Supabase redirect allow list.
4. In the Google OAuth app, add the Supabase Google callback URL shown in the Supabase provider settings.
5. Keep the email provider enabled for email login, email signup, and password recovery.

## Email signup flow

The UI uses a standard modal flow:

1. The student enters an email address.
2. Supabase sends an email verification OTP or magic link.
3. After verification, the student sets a password.

Supabase's default hosted email template may show only a verification link. The code supports that link and will return the student to the password setup step, but showing a visible numeric code in the email requires editable email templates through custom SMTP, a Send Email hook, or a Supabase plan that allows template customization.

The browser uses the Supabase anon key and row-level security. It never uses the service role key.
