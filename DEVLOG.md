# DEVLOG

## Day 2 - Spend Input System

### Completed

- Added the `/audit` route for collecting AI tool spend data.
- Installed `react-hook-form`, `zod`, and `@hookform/resolvers`.
- Created reusable form components:
  - `ToolCard`
  - `SpendInput`
  - `PlanSelector`
  - `TeamSizeInput`
  - `UseCaseSelector`
- Added centralized AI tool and pricing metadata in `data/tools.js`.
- Added validation schema in `lib/auditSchema.js`.
- Added localStorage autosave so form data survives refreshes.
- Kept the scope focused on data collection only.

### Not Included Yet

- Backend persistence
- Supabase integration
- Authentication
- AI-generated summary
- Audit scoring engine

### Notes

The form is designed to produce clean structured data first. This makes Day 3 easier because the next layer can read from a predictable schema instead of parsing loose UI state.
