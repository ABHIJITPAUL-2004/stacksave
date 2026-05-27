```md
# Reflection Notes

## Project Outcome

StackSave ended up becoming much more complete than what I originally planned for the internship. The final version includes a landing page, audit flow, results page, Supabase database integration, and deployment on Vercel. My original goal was honestly just to learn how people build actual SaaS-style products outside of college assignments.

## What Worked Well

One thing that worked better than expected was keeping the recommendation logic simple instead of forcing AI into every part of the app. That made the results easier to debug and explain.

Breaking the frontend into separate sections like the landing page, audit flow, and results page also helped a lot because the project became easier to manage as it grew.

Using Supabase was probably the biggest learning experience overall. Before this project I had mostly worked with local SQL databases, so learning environment variables, row-level security, deployment configs, and real production persistence took a lot of trial and error.

## Tradeoffs

Some parts of the audit logic still rely on generalized assumptions instead of real billing integrations. I focused more on getting the core MVP stable and deployed rather than building advanced dashboards or account systems.

I also spent more time solving backend and deployment issues than polishing the UI.

## Lessons Learned

This project taught me that deployment and configuration problems can easily take more time than writing frontend code itself. I also learned that building something production-like involves much more than coding pages — things like environment management, database security, API integrations, and debugging matter a lot.

Working with Supabase and Resend also made me more careful about handling secrets and separating public environment variables from server-only keys.

## Next Iteration

If I continue working on StackSave, I’d want to improve the recommendation engine so the audit becomes more context-aware for different kinds of teams instead of using broad SaaS assumptions. I’d also like to add more realistic pricing logic and better reporting features.
```
