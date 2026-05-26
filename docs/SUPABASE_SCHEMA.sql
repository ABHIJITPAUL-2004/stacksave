create extension if not exists "pgcrypto";

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  total_monthly_spend numeric not null default 0 check (total_monthly_spend >= 0),
  optimized_monthly_spend numeric not null default 0 check (optimized_monthly_spend >= 0),
  total_monthly_savings numeric not null default 0 check (total_monthly_savings >= 0),
  total_annual_savings numeric not null default 0 check (total_annual_savings >= 0),
  recommendations jsonb not null default '[]'::jsonb,
  ai_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete set null,
  email text not null,
  company_name text,
  role text,
  team_size integer check (team_size is null or team_size >= 1),
  created_at timestamptz not null default now()
);

create index if not exists audits_created_at_idx on public.audits(created_at desc);
create index if not exists leads_email_idx on public.leads(email);
create index if not exists leads_audit_id_idx on public.leads(audit_id);

create unique index if not exists leads_unique_email_audit_idx
on public.leads(email, audit_id)
where audit_id is not null;

create unique index if not exists leads_unique_email_without_audit_idx
on public.leads(email)
where audit_id is null;

alter table public.audits enable row level security;
alter table public.leads enable row level security;

drop policy if exists "Public audits are readable" on public.audits;
create policy "Public audits are readable"
on public.audits
for select
using (true);

drop policy if exists "Audit reports can be created by the app" on public.audits;
create policy "Audit reports can be created by the app"
on public.audits
for insert
with check (
  total_monthly_spend >= 0
  and optimized_monthly_spend >= 0
  and total_monthly_savings >= 0
  and total_annual_savings >= 0
  and jsonb_typeof(recommendations) = 'array'
);

drop policy if exists "Leads can be created by the app" on public.leads;
create policy "Leads can be created by the app"
on public.leads
for insert
to anon, authenticated
with check (
  email <> ''
  and (team_size is null or team_size >= 1)
);

drop policy if exists "Lead duplicate checks are allowed" on public.leads;
create policy "Lead duplicate checks are allowed"
on public.leads
for select
to anon, authenticated
using (true);

-- The Next.js API routes validate input before inserting. If you add a
-- server-only service role key later, these insert policies can be tightened
-- because service-role requests bypass RLS.
