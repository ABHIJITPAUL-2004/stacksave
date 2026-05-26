# Security Notes

## Environment Variables

- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is safe to expose to the browser, but
  still relies on RLS policies for write safety.
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

## RLS Policies

Supabase row-level security is enabled on `audits` and `leads`.

- `audits` can be read publicly because public report URLs are part of the product.
- `audits` can be inserted only when numeric totals are non-negative and recommendations are a JSON array.
- `leads` can be inserted only with a non-empty email and valid team size.
- `leads` can be selected so the API can perform duplicate checks.

For a production SaaS, the preferred setup is to use a server-only service role
key in API routes and tighten public insert policies further.
