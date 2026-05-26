# StackSave

StackSave is a SaaS project designed to help startups and small teams understand where they may be overspending on AI tools.

The platform analyzes usage across tools like ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini, then generates practical cost-saving recommendations through a clean audit dashboard experience.

This project was built as part of a SaaS internship project with a focus on scalable frontend architecture, reusable UI systems, and deterministic audit logic before adding full backend intelligence.

---

## Features

### Landing Experience
- Modern dark SaaS landing page
- Fully responsive UI
- Reusable component architecture
- Clean and scalable folder structure

### AI Spend Audit
- Dynamic AI tool input cards
- Add/remove tool support
- Monthly spend and seat tracking
- Team size and use-case collection
- Form validation using Zod + React Hook Form
- Local persistence with localStorage

### Audit Intelligence
- Deterministic recommendation engine
- Pricing assumption system
- Savings calculations
- Plan downgrade suggestions
- Seat cleanup detection
- Vendor consolidation recommendations

### Results Dashboard
- Savings overview section
- Spend comparison summaries
- Founder-style AI summaries
- Fallback summaries when AI fails
- Shareable public report pages

### Backend & Infrastructure
- Supabase audit persistence
- Public-safe audit report routes
- Lead capture flow
- Transactional email support using Resend
- Basic rate limiting and duplicate lead handling

---

# Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- lucide-react
- react-hook-form
- zod
- @hookform/resolvers
- Supabase
- Resend
- Anthropic Messages API

---

# Project Structure

```txt
app/
components/
components/audit/
components/ui/
data/
docs/
lib/
lib/auditEngine/
public/
tests/
utils/
```

---

# Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run test:watch
```

---

# Environment Variables

Create a `.env.local` file in the root directory and add:

```env
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-20250514

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=StackSave <onboarding@resend.dev>
```

Important:
- Never commit `.env.local`
- Keep service role keys server-only
- Store all API keys securely
- Use the newer Supabase publishable key format for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is kept as a compatibility alias for older examples

---

# Supabase Setup

Run the SQL in `docs/SUPABASE_SCHEMA.sql` inside the Supabase SQL Editor.

The Day 6 schema uses:

- `audits` for public-safe saved audit reports
- `leads` for post-report contact capture
- UUID audit IDs for shareable `/results/[id]` pages
- `jsonb` recommendations so rule output can evolve without immediate table redesign

The app writes through Next.js API routes instead of directly from the browser. This keeps validation, error handling, and server-only credentials in one backend layer.

---

# Testing and CI

Vitest covers the deterministic audit logic:

```txt
tests/
  audit/
    auditEngine.test.js
    recommendationEngine.test.js
    savingsCalculator.test.js
```

GitHub Actions runs:

```bash
npm ci
npm run lint
npm test
npm run build
```

The workflow lives in `.github/workflows/ci.yml`.

---

# Production Readiness

Day 6 added:

- route-level loading states
- app and results error boundaries
- visible keyboard focus styles
- skip-to-content link
- labeled primary navigation
- public report not-found UI
- CI pipeline for lint, test, and build verification
- dead component cleanup

---

# Roadmap

### Current
- AI spend audit workflow
- Deterministic savings engine
- Results dashboard
- Public audit reports
- Lead capture system
- Full Supabase persistence for saved reports and leads

### Planned
- Authentication
- Team collaboration
- Real AI recommendation logic
- Stripe billing integration
- Historical analytics
- Exportable reports
- Admin dashboard

---

# Notes

The current version intentionally uses deterministic audit rules instead of fully AI-generated recommendations to keep the system predictable and transparent during development.

AI summaries are layered on top primarily for presentation and user experience.

The platform architecture is designed to support future scaling into a production SaaS product.
