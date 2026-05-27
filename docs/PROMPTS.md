```md id="v92kpl"
# Prompt Notes

This file documents a few important AI-assisted prompts used during development.  
AI tools were mainly used for brainstorming, refactoring help, debugging support, and improving developer workflow — not for generating the entire application automatically.

---

## Founder Summary Prompt

Location:
`lib/prompts/summaryPrompt.js`

Purpose:
Generate a short founder-facing savings summary after the audit is completed.

Constraints used in the prompt:
- keep response concise
- avoid fake calculations
- use deterministic savings numbers from backend logic
- explain possible causes of wasted SaaS spend
- suggest realistic next actions

Important:
AI is only used for wording and summaries.  
All calculations and recommendation logic are deterministic and handled separately in the application code.

---

## Deployment + Environment Debugging

AI assistance was also used during:
- Supabase integration
- environment variable debugging
- Vercel deployment fixes
- Resend email setup
- SQL schema troubleshooting

Most of the implementation still required manual debugging, configuration, and testing because deployment/runtime issues were highly project-specific.

---

## Reflection

One of the biggest lessons during development was learning where AI assistance is actually useful and where manual engineering work is still necessary. AI helped speed up repetitive tasks and debugging, but database setup, deployment configuration, environment management, and architecture decisions still required hands-on iteration and understanding.
```
