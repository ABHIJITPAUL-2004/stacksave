# StackSave

StackSave is a small SaaS-style web app that helps startups figure out if they are overspending on AI tools like ChatGPT, Claude, Cursor, GitHub Copilot, Gemini and others.

The idea came from seeing how many small teams keep paying for overlapping AI subscriptions without really knowing if the plans actually fit their usage. The app audits a team's current AI stack and suggests cheaper or better optimized alternatives.

This project is being built as part of the Credex Web Development Internship assignment.

---

## What it currently does

* Lets users add multiple AI tools and plans
* Calculates estimated monthly + yearly AI spend
* Detects obvious overpayment situations
* Suggests better plans or consolidation opportunities
* Generates personalized audit summaries using AI
* Shows estimated savings in a dashboard format

---

## Tech Stack

* Next.js
* React
* JavaScript
* Tailwind CSS
* Supabase (planned)
* Vercel deployment

---

## Running locally

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Why I built it this way

I wanted the project to feel closer to a real startup product instead of a normal college assignment. Most of the focus went into:

* product flow
* audit reasoning
* usability
* clean UI
* realistic recommendations

instead of just adding random features.

I also tried keeping the architecture simple enough to move fast during the 7-day timeline.

---

## Current status

Still actively building and improving features daily.

Upcoming work:

* public shareable audit URLs
* lead capture flow
* testing
* deployment optimization
* accessibility improvements

---

## Notes

The audit logic is rules-based intentionally. AI is only used for generating personalized summaries, not for financial calculations.

Some pricing assumptions may change over time as vendors update their plans.
