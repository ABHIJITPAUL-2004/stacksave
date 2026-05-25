# DEVLOG

## Day 2 - Spend Input System

### Completed

- Added the `/audit` route for collecting AI tool spend data.
- Installed `react-hook-form`, `zod`, and `@hookform/resolvers`.
- Created reusable form components:
  - `ToolCard`
  - `SpendInput`
  - `PlanSelector`
  - `TeamSizeInput`
  - `UseCaseSelector`
- Added centralized AI tool and pricing metadata in `data/tools.js`.
- Added validation schema in `lib/auditSchema.js`.
- Added localStorage autosave so form data survives refreshes.
- Kept the scope focused on data collection only.

### Not Included Yet

- Backend persistence
- Supabase integration
- Authentication
- AI-generated summary
- Audit scoring engine

### Notes

The form is designed to produce clean structured data first. This makes Day 3 easier because the next layer can read from a predictable schema instead of parsing loose UI state.

## Day 3 - Audit Engine

### Completed

- Added a deterministic audit engine in `lib/auditEngine`.
- Added centralized static pricing assumptions in `data/pricing.js`.
- Added pure calculation utilities for monthly and annual savings.
- Added rule categories:
  - Plan downgrade opportunities
  - Enterprise overprovisioning
  - Seat inefficiency
  - Vendor consolidation
  - Use-case mismatch
- Connected the Day 2 form to a temporary `/results` page.
- Rendered readable savings metrics and recommendation cards.

### Not Included Yet

- Backend audit API
- Database persistence
- Shareable result URLs
- AI-generated executive summary
- Authenticated user accounts

### Notes

The engine intentionally uses deterministic rules instead of AI. This keeps the recommendations defensible, testable, and easier to explain to a founder or finance lead.

## Day 4 - Results Experience and AI Summary

### Completed

- Rebuilt `/results` into a polished SaaS-style audit dashboard.
- Added reusable result components:
  - `SavingsHero`
  - `AISummaryCard`
  - `SpendBreakdown`
  - `OptimizationInsights`
  - `ResultsCTA`
  - `ShareButton`
- Added `/api/summary` for founder-friendly AI summaries.
- Integrated Anthropic Messages API through direct `fetch`.
- Added deterministic fallback summaries for missing keys or API failure.
- Added conditional CTA logic:
  - savings over `$500/month` shows Credex consultation CTA
  - smaller savings show update/monitoring CTA
- Added `.env.example` for secure API key setup.

### Not Included Yet

- Authentication
- Database persistence
- Public result IDs
- Final deployment workflow
- Email capture backend

### Notes

AI is only used for narrative summarization. Calculations, recommendations, savings, and business logic remain deterministic inside the audit engine.

## Day 5 - Backend Flow and Shareable Audits, Part 1

### Completed

- Installed `@supabase/supabase-js`.
- Added server-side Supabase client setup.
- Added database helpers for creating and fetching audits.
- Added SQL schema for `audits` and `leads`.
- Added `POST /api/audits` to save audit inputs and deterministic results.
- Added `GET /api/audits/[id]` to fetch public-safe audit reports.
- Added `/results/[id]` for shareable public report pages.
- Added dynamic Open Graph and Twitter metadata for shared audit URLs.
- Added a save-report panel to create a persistent public URL.

### Security Notes

- Supabase writes use the server-only service role key.
- Public result pages only expose aggregate report data, recommendations, and summary text.
- Email, company, and lead details are not included in public reports.
- API input is validated with `zod` before database writes.

### Paused Before Part 2

The next commit should add lead capture, transactional email, lightweight abuse protection, and final error/loading polish.
