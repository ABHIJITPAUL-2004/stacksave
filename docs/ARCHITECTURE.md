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

## Day 5 Persistence Flow

```txt
/results
  Save report
    -> POST /api/audits
      -> validate input with zod
      -> run deterministic audit engine
      -> save public-safe result to Supabase
      -> return /results/[publicId]

/results/[id]
  -> fetch audit by public_id
  -> render aggregate report only
  -> generate dynamic Open Graph metadata
```

The public route intentionally does not render email, company, role, or private lead metadata.

## Day 5 Lead Flow

```txt
/results or /results/[id]
  User sees savings first
  User submits lead form
    -> POST /api/leads
      -> honeypot check
      -> basic rate limit
      -> zod validation
      -> save lead to Supabase
      -> send best-effort Resend confirmation email
```

Lead capture intentionally happens after value is shown. This keeps the funnel aligned with the assignment requirement and feels more trustworthy than gating the report.
