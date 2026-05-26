# Architecture Notes

## Day 3 Audit Engine

The audit engine is organized as pure JavaScript functions so it can later move behind an API route without changing the business logic.

```txt
lib/auditEngine/
  auditEngine.js
  pricingEngine.js
  recommendationEngine.js
  savingsCalculator.js
  rules/
    planRules.js
    seatRules.js
    stackRules.js
```

## Current Data Flow

1. User enters spend inputs on `/audit`.
2. The form validates with `react-hook-form` and `zod`.
3. Inputs are saved to `localStorage`.
4. `/results` reads the saved input.
5. `runAudit()` transforms inputs into structured recommendations.

## Why Deterministic Rules

The audit engine should be financially defensible. Static business rules make each recommendation traceable, testable, and easy to adjust as pricing assumptions change.

## Day 6 Supabase Persistence Flow

```txt
/results
  Save report
    -> POST /api/audits
      -> validate input with zod
      -> run deterministic audit engine
      -> save public-safe totals, recommendations, and summary to Supabase
      -> return /results/[auditId]

/results/[id]
  -> validate id as UUID
  -> fetch audit by id
  -> render aggregate report only
  -> generate dynamic Open Graph metadata
```

The public route intentionally does not render email, company, role, or private lead metadata. The UUID is the public report identifier for the internship build, which keeps the database simple and avoids maintaining a second public id column.

## Why Supabase

Supabase is a good fit for StackSave because the product needs a small relational backend quickly: persisted reports, lead capture, SQL constraints, JSON support, and a clean path to authentication later. PostgreSQL keeps the finance-related records structured while still allowing flexible recommendation payloads.

## Why JSONB

Recommendations are stored as `jsonb` because each audit can produce different recommendation types with different metadata. Keeping recommendations in JSONB avoids creating several premature rule-specific tables while still allowing PostgreSQL to store and query the data reliably.

## Why API Routes

The browser never writes directly to Supabase. Client components call Next.js API routes, and those routes validate input with `zod`, run deterministic server logic, and then write to Supabase. In production, a server-only service role key is preferred. During the internship setup, the API can also use Supabase's publishable key with narrow RLS insert policies for `audits` and `leads`.

## Day 5 Lead Flow

```txt
/results or /results/[id]
  User sees savings first
  User submits lead form
    -> POST /api/leads
      -> honeypot check
      -> basic rate limit
      -> zod validation
      -> save lead to Supabase with duplicate protection
      -> send best-effort Resend confirmation email
```

Lead capture intentionally happens after value is shown. This keeps the funnel aligned with the assignment requirement and feels more trustworthy than gating the report.
