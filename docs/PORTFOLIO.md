# Portfolio Material

## Resume Bullets

- Built StackSave, a production-style AI spend audit SaaS using Next.js App Router, React, Tailwind CSS, Supabase, and Resend.
- Implemented a deterministic recommendation engine that analyzes AI tool spend, seat counts, plan fit, vendor overlap, and annualized savings.
- Integrated Supabase persistence with UUID public report URLs, JSONB recommendation storage, RLS policies, and lead capture.
- Added CI, Vitest unit coverage, route-level loading states, error boundaries, and accessibility polish for deployment readiness.

## GitHub Description

AI Spend Audit SaaS that helps startups identify overspending across tools like
ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and API usage. Built with
Next.js, Tailwind CSS, Supabase, deterministic savings logic, shareable reports,
lead capture, tests, and CI.

## LinkedIn Post Draft

I built StackSave, an AI Spend Audit SaaS MVP for startups that want to
understand where their AI tooling budget is leaking.

The app collects spend data across tools like ChatGPT, Claude, Cursor, GitHub
Copilot, Gemini, OpenAI API, and Anthropic API, then produces a report with
monthly savings, annual impact, and practical recommendations.

What I focused on:

- Next.js App Router and Tailwind CSS
- Dynamic audit form with validation and local persistence
- Deterministic savings and recommendation engine
- Supabase persistence with shareable report URLs
- Lead capture and Resend email flow
- Vitest coverage, CI, error states, and accessibility polish

The goal was to make it feel like an early-stage SaaS MVP rather than a tutorial
project: clear product thinking, traceable logic, and a deployable architecture.

## Elevator Pitch

StackSave helps startup teams audit their AI tool spending. Instead of guessing
whether the company is overpaying for ChatGPT, Claude, Cursor, Copilot, Gemini,
and API usage, teams enter their stack and get a shareable savings report with
specific optimization recommendations.

The core audit logic is deterministic, so the numbers are explainable. AI is
used only for narrative summaries, not financial calculations.

## Interview Talking Points

- Next.js was used for colocated routes, API endpoints, public report pages, and Vercel-friendly deployment.
- Supabase was used because the product needed relational persistence quickly without building a custom backend.
- JSONB stores recommendations because recommendation payloads evolve faster than the core audit table.
- API routes keep validation and privileged database access out of client components.
- Deterministic rules make savings calculations auditable and easier to test than AI-generated recommendations.
