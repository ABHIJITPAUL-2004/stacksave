# Pricing Data Notes

## Purpose

This document records the pricing assumptions used by the deterministic audit
engine. The goal is to keep recommendation logic traceable and easy to update
as vendor pricing changes.

## Data Sources

- Public pricing pages for AI tools referenced in the product.
- Manual review of common seat-based plans and usage-based API models.
- Internal rule definitions stored in `lib/auditEngine/rules/`.

## How Pricing Is Used

- Tool plan data is compared against the team’s reported usage.
- Seat-based tools are evaluated for unused seats and oversized tiers.
- API tools are evaluated using the reported spend level and practical
  optimization assumptions.
- Recommendations are generated only when the savings case is strong enough to
  be defensible.

## Maintenance Notes

- Update this file whenever a pricing rule changes.
- Keep rule changes aligned with `tests/audit/` so finance outputs stay
  deterministic.
- Favor explicit assumptions over hidden constants in component code.

## Recommended Fields

When adding or revising a pricing entry, capture:

- vendor name
- plan or tier name
- billing unit
- monthly price or pricing formula
- typical target user segment
- rule notes or caveats

## Practical Reminder

Pricing data should be treated as a product assumption, not as a universal
market truth. The audit is strongest when it explains why a recommendation is
reasonable instead of pretending to be a live procurement feed.