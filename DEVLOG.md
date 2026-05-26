# DEVLOG

## Day 2 - Spend Input System

### Completed

- Added the `/audit` route for collecting AI tool spend data.
- Installed `react-hook-form`, `zod`, and `@hookform/resolvers`.
- Created reusable form components:
  - `ToolCard`
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

## Day 5 - Backend Flow and Shareable Audits, Part 2

### Completed

- Added `POST /api/leads` for post-value lead capture.
- Added reusable `saveLead()` database helper.
- Added Resend transactional email integration.
- Added confirmation email copy for normal and high-savings audits.
- Added honeypot field to reduce bot submissions.
- Added lightweight in-memory rate limiting for lead submissions.
- Added duplicate lead handling per email and audit.
- Replaced CTA mailto links with embedded lead capture forms.

### Abuse Protection

Day 5 uses two lightweight protections:

- Honeypot field: catches simple bots that fill hidden fields.
- Basic IP rate limit: limits repeated submissions per minute.

This is enough for an internship SaaS prototype without adding hCaptcha friction before the product is validated.

### Email Notes

Email sending is best-effort. If Resend is not configured, the app still saves the lead and returns a graceful response.

## Day 6 - Supabase Integration, Part 1

### Completed

- Added a reusable public Supabase client in `lib/supabase.js`.
- Added `.env.local` template values for local Supabase setup.
- Updated Supabase schema to use UUID audit IDs, public-safe audit totals, JSONB recommendations, and lead records.
- Updated audit database helpers:
  - `createAudit()`
  - `getAuditById()`
- Updated lead database helper:
  - `saveLead()`
- Updated `POST /api/audits` to validate input, run the audit engine, save public-safe results, and return `/results/[id]`.
- Added `GET /api/audits?id=` and `GET /api/audits/[id]` for audit fetching.
- Updated public report pages to fetch audits by UUID.
- Added loading and not-found states for shared audit URLs.
- Kept service role access server-only through API routes.

### Notes

Supabase is used for durable persistence, while deterministic audit calculations remain inside the application. Recommendations are stored as JSONB because the shape can evolve as rules become more sophisticated.

## Day 6 - Production Polish, Part 2

### Completed

- Installed and configured Vitest.
- Added unit tests for:
  - savings calculations
  - recommendation creation and sorting
  - end-to-end audit engine output
- Added GitHub Actions CI in `.github/workflows/ci.yml`.
- Added route loading states for `/results` and `/results/[id]`.
- Added app-level and results-level error boundaries.
- Improved accessibility with:
  - skip-to-content link
  - visible keyboard focus styles
  - labeled primary navigation
  - decorative icons marked as hidden
- Removed the unused `SpendInput` component.
- Updated README, architecture, security, and testing documentation.

### Verification

- `npm run lint`
- `npm test`
- `npm run build`

### Notes

Part 2 focused on stability and confidence rather than redesign. The core
product experience stays the same, but the project is now safer to deploy and
easier to maintain.

## Day 7 - Final Submission Prep

### Completed

- Removed the accidental nested duplicate project scaffold.
- Removed unused default public SVG assets.
- Added final reviewer-focused README content.
- Added project screenshots under `public/screenshots`.
- Added final documentation:
  - `docs/DEMO_DATA.md`
  - `docs/DEPLOYMENT.md`
  - `docs/PORTFOLIO.md`
- Performed local app QA across:
  - landing page
  - audit form
  - audit calculations
  - results dashboard
  - public audit URL
  - invalid report URL
  - Supabase audit persistence
  - lead API persistence
- Fixed public report tool-count display when reports are loaded from compact Supabase records.
- Confirmed Vercel CLI is available, but deployment requires account login.

### Verification

- `npm run lint`
- `npm test`
- `npm run build`

### Notes

Day 7 focused on presentation and credibility. The app now reads as a cohesive
early-stage SaaS MVP with a clear problem, traceable logic, working persistence,
tests, CI, and portfolio material.
