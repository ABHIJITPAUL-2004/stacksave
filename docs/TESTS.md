# Suggested Tests

## Audit Engine

- returns zero savings for an already optimized stack
- recommends ChatGPT Plus when ChatGPT Team has fewer than 3 seats
- recommends Cursor Pro when Cursor Business is used by a solo developer
- flags enterprise plans for small teams
- flags seat count greater than team size
- detects overlapping general assistant subscriptions
- detects overlapping coding assistant subscriptions

## Pricing Engine

- calculates monthly spend as plan price times seats
- returns the correct best-fit plan for tiny teams
- handles unknown tools safely
- handles usage-based plans without crashing
