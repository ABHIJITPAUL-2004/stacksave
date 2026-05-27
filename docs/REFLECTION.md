# Reflection Notes

## Project Outcome

StackSave demonstrates a complete internship-ready SaaS MVP: a landing page,
an audit intake flow, deterministic savings logic, a shareable results page,
and persistence for audits and leads.

## What Worked Well

- Keeping savings and recommendation logic deterministic made the product
  easier to test and explain.
- Splitting the UI into landing, audit, and results surfaces kept the product
  readable and maintainable.
- Using Supabase for persistence kept the backend lightweight while still
  supporting relational data and RLS.

## Tradeoffs

- The product favors traceable finance logic over AI-generated automation.
- The current release is optimized for a polished MVP rather than deep account
  management or multi-workspace features.
- Some future capabilities, such as usage-based spend modeling, will need more
  product data before they can be made reliable.

## Lessons Learned

- Clear financial assumptions matter more than flashy outputs.
- Public reports should reveal only aggregate values and avoid exposing private
  lead details.
- A small, well-tested rules engine is a stronger foundation than early
  over-automation.

## Next Iteration

The next version should focus on stronger data capture, richer pricing
coverage, and tighter conversion analytics so the audit can evolve from an MVP
demo into a repeatable sales tool.