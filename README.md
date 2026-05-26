# StackSave

StackSave is an AI spend audit SaaS MVP for startups. It helps teams understand
where they may be overspending on AI tools such as ChatGPT, Claude, Cursor,
GitHub Copilot, Gemini, OpenAI API, and Anthropic API.

The app collects a team’s AI stack, runs deterministic savings logic, and
generates a shareable report with monthly savings, annual impact, and practical
recommendations.

## Problem

Fast-moving teams often buy AI tools seat by seat. Over time, that creates
unused seats, overlapping subscriptions, oversized enterprise plans, and
unclear ownership. StackSave turns that messy spend into a focused audit report.

## Features

- Modern SaaS landing page
- Dynamic AI tool spend form
- Zod + React Hook Form validation
- localStorage form persistence
- Deterministic audit and recommendation engine
- Savings calculations for monthly and annual impact
- AI-generated summary with deterministic fallback
- Public shareable audit reports
- Supabase persistence for audits and leads
- Lead capture with duplicate handling
- Resend transactional email support
- Loading states, error boundaries, and not-found states
- Vitest unit tests and GitHub Actions CI

## Screenshots

Screenshots from the final local QA pass:

![Landing page](/screenshots/landing.png)

![Audit form](/screenshots/audit-form.png)

![Results dashboard](/screenshots/results-dashboard.png)

![Public report](/screenshots/public-report.png)

![Mobile results](/screenshots/mobile-results.png)

## Tech Stack

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Supabase
- Resend
- Anthropic Messages API
- Vitest
- GitHub Actions
- Vercel

## Architecture

```txt
app/
  api/
  audit/
  results/
components/
  audit/
  lead-capture/
  results/
  ui/
data/
docs/
hooks/
lib/
  ai/
  auditEngine/
  db/
  email/
  security/
  supabase/
tests/
  audit/
utils/
```

The audit engine is intentionally deterministic. AI is used for presentation
summaries, while savings, recommendations, and financial calculations stay
traceable in JavaScript rules.

Supabase stores public-safe audit reports and lead records. Recommendations are
stored as JSONB because rule output can evolve without forcing premature table
splits.

## Getting Started

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment Variables

Create `.env.local`:

```env
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-20250514

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=StackSave <onboarding@resend.dev>
```

Notes:

- `.env.local` is gitignored.
- Use Supabase’s newer `sb_publishable_...` key format.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is kept as a compatibility alias.
- Keep service role, Resend, and AI API keys server-side only.

## Supabase Setup

Run the SQL in `docs/SUPABASE_SCHEMA.sql` inside the Supabase SQL Editor.

The schema creates:

- `audits`
- `leads`
- UUID primary keys
- JSONB recommendations
- foreign key relationship from leads to audits
- RLS policies for the current app flow

## Scripts

```bash
npm run dev
npm run lint
npm test
npm run build
npm run start
```

## Testing

Vitest covers the deterministic audit logic:

```txt
tests/
  audit/
    auditEngine.test.js
    recommendationEngine.test.js
    savingsCalculator.test.js
```

Run:

```bash
npm test
```

## CI/CD

GitHub Actions runs on pushes and pull requests to `main`:

```bash
npm ci
npm run lint
npm test
npm run build
```

Workflow file:

```txt
.github/workflows/ci.yml
```

## Deployment

Deploy with Vercel as a standard Next.js project. Add the environment variables
listed above in Vercel project settings, then run a production smoke test:

1. Complete an audit.
2. Save the report.
3. Open the generated public URL.
4. Submit the lead form.
5. Confirm Supabase rows exist in `audits` and `leads`.

More details: `docs/DEPLOYMENT.md`.

Current status: local production build passes. Vercel CLI is available, but
deployment requires logging in to the owner’s Vercel account.

## Security Notes

- `.env.local` is ignored.
- Public reports expose aggregate audit data only.
- Lead details are not shown on public report pages.
- API input is validated before writes.
- Supabase RLS is enabled.
- Resend failures do not block lead capture.

## Future Improvements

- Authentication and team workspaces
- Historical spend tracking
- CSV import/export
- PDF report export
- Admin dashboard
- Stripe billing
- Better usage-based API spend modeling

## Project Status

StackSave is ready for final internship review and portfolio presentation as an
early-stage SaaS MVP.
