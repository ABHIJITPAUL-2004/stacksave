# Email Notes

StackSave uses Resend for transactional email.

## Required Environment Variables

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=StackSave <onboarding@resend.dev>
```

## Current Email

The app sends a simple confirmation email after a lead is captured. The message includes:

- acknowledgement that the audit was received
- estimated monthly savings
- estimated annual savings
- high-savings note when monthly savings exceed `$500`

Email failures are non-blocking so lead capture does not break if Resend is not configured.
