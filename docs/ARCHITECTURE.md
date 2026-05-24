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
