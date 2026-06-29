# Pocket Cosmos Supabase Setup

This site is still deployable as a static GitHub Pages app. Supabase provides the backend for login, student answer syncing, and the admin dashboard.

## 1. Create the database

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Add the founder/admin login email:

```sql
insert into public.admin_bootstrap_emails (email)
values ('your-email@example.com');
```

After that email signs in once, `bootstrap_admin()` will automatically grant admin access.

## 2. Create optional admin invite codes

```sql
insert into public.admin_invite_codes (code_digest, label, max_uses)
values (
  encode(digest('replace-with-a-long-random-code', 'sha256'), 'hex'),
  'Initial instructor code',
  3
);
```

The plaintext code is only shown to the person you trust. The database stores its SHA-256 digest.

## 3. Configure auth providers

Enable Email OTP and Google in Supabase Auth. Use the site origin as the redirect URL:

```text
http://pocket-cosmos.com
```

WeChat login requires a WeChat Open Platform or official account app and should be enabled after that application exists.

## 4. Configure GitHub Pages build variables

Add these variables to the Pages build environment:

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The anon key is public by design. Row Level Security in `schema.sql` is what protects the data.
