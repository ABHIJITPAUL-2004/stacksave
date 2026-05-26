# Deployment Guide

StackSave is ready for Vercel deployment as a standard Next.js App Router
project.

## Vercel Steps

1. Push the repository to GitHub.
2. Open Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the framework preset as **Next.js**.
5. Add the environment variables below.
6. Deploy.

CLI option after logging in:

```bash
npx vercel login
npx vercel --prod
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-20250514
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, and `RESEND_API_KEY` should
only be configured in Vercel project settings and local `.env.local`. They
should never be committed.

## Production Smoke Test

After deployment:

1. Open the landing page.
2. Start an audit.
3. Fill the demo data from `docs/DEMO_DATA.md`.
4. Run the audit.
5. Save the report.
6. Open the generated `/results/[id]` URL.
7. Submit the lead form.
8. Confirm rows appear in Supabase `audits` and `leads`.

## Current Local Verification

The project has been verified locally with:

```bash
npm run lint
npm test
npm run build
```

Local QA covered the landing page, audit form, results dashboard, public report
URL handling, invalid report URLs, Supabase audit save, and lead API save.

## Common Deployment Issues

- Build fails: run `npm run build` locally and fix the first error.
- Supabase inserts fail: confirm SQL schema and RLS policies were run.
- Lead email does not send: confirm Resend sender/domain settings.
- AI summary falls back: confirm `ANTHROPIC_API_KEY`; fallback summaries are expected without it.
