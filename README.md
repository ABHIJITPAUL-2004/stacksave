# StackSave

AI Spend Audit is a SaaS internship project for helping startups understand and reduce overspending on AI tools such as ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini.

## Day 1 Scope

- Next.js App Router project initialized with JavaScript
- Tailwind CSS configured through the default Next.js setup
- Dark, modern SaaS landing page
- Reusable landing page components
- Clean folder structure for future modules
- No authentication, backend, database, or audit engine yet

## Tech Stack

- Next.js
- JavaScript
- Tailwind CSS
- React
- lucide-react
- react-hook-form
- zod
- @hookform/resolvers

## Project Structure

```txt
app/
components/
components/audit/
components/ui/
data/
lib/
public/
utils/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in the browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Suggested Day 1 Commits

```bash
git add .
git commit -m "Initialize Next.js app with Tailwind"
git commit -m "Build Day 1 SaaS landing page"
git commit -m "Add reusable components and project README"
```

## Day 2 Scope

- `/audit` route for spend data collection
- Dynamic add/remove AI tool cards
- Tool name, plan, monthly spend, and seat inputs
- Team size and primary use case fields
- Validation with react-hook-form and zod
- Local persistence with localStorage
- Centralized tool and pricing metadata in `data/tools.js`

## Suggested Day 2 Commits

```bash
git add .
git commit -m "Add spend audit form route"
git commit -m "Create reusable audit form components"
git commit -m "Add validation and local form persistence"
```

## Day 3 Direction

- Add a read-only audit results preview route
- Convert collected form data into structured summary cards
- Keep recommendations static until real audit rules are designed
- Plan Supabase tables before writing database code
