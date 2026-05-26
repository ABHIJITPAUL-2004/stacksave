# Testing Strategy

StackSave uses Vitest for fast unit tests around the deterministic business
logic. The first production-readiness suite focuses on code that directly
affects financial output.

## Commands

```bash
npm test
npm run test:watch
```

CI runs the non-watch command.

## Current Coverage

```txt
tests/
  audit/
    auditEngine.test.js
    recommendationEngine.test.js
    savingsCalculator.test.js
```

## What Is Tested

- numeric coercion and safe savings calculations
- monthly and annual savings math
- recommendation creation and sorting
- end-to-end audit result shape
- empty audit input handling

## Why This Scope

The audit engine is deterministic, so it should be protected before adding
more UI polish or AI-generated explanations. The tests intentionally avoid
snapshot-heavy component assertions because the dashboard copy and layout are
still moving during the internship build.

## Next Tests

- pricing engine best-fit plan selection
- API route validation failures
- lead duplicate handling
- public report not-found behavior
