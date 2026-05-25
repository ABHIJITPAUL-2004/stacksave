# Security Notes

## Environment Variables

- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server.
- `RESEND_API_KEY` is used only on the server.
- `.env.local` must not be committed.
- `.env.example` contains placeholders only.

## Public Reports

Public report pages expose only:

- aggregate savings
- recommendations
- tool-level report data
- summary text

They do not expose:

- email
- company name
- role
- private lead metadata

## Abuse Protection

Day 5 uses a honeypot field and a small in-memory rate limiter for lead submissions. This keeps the prototype lightweight while blocking basic automated spam.
