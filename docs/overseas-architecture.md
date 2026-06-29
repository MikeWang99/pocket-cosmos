# Pocket Cosmos Overseas Architecture

Pocket Cosmos is now structured as a Next.js app for Vercel-first overseas deployment.

## Current Stage

- Existing bilingual site and practice board run as a Next.js client experience.
- Server-side API routes are available under `app/api`.
- Login/admin code from the earlier Supabase experiment is archived in `preview/supabase-auth` and is not active in production.

## Near-Term Product Stack

- Frontend and API: Next.js on Vercel.
- Auth and data: Supabase Auth + Postgres with Row Level Security.
- AI reports: server-side API route, never direct browser-to-model calls.
- Payments: Stripe first, with Alipay and WeChat Pay enabled through supported payment methods if the merchant account is approved.
- Scheduling: server-side appointment APIs backed by a calendar provider and database records.

## Migration Rules

- Keep provider credentials in environment variables.
- Keep AI, payment, and database calls server-side.
- Model core entities in portable Postgres tables: users, students, practice submissions, reports, appointments, payments.
- Avoid hard-coding Vercel, Supabase, or model-provider assumptions inside UI components.
- Keep `/zh` and `/en` routing in mind when the product graduates from a single-page shell.

## Reserved API Surfaces

- `GET /api/health`
- `POST /api/ai/report`
- `GET /api/appointments`
- `POST /api/appointments`

These endpoints are intentionally minimal until the first real backend feature is enabled.
