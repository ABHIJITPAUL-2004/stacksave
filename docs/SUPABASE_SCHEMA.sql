create extension if not exists "pgcrypto";

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default encode(gen_random_bytes(8), 'hex'),
  audit_input jsonb not null,
  audit_result jsonb not null,
  ai_summary text,
  total_monthly_savings numeric not null default 0,
  total_annual_savings numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete set null,
  email text not null,
  company_name text,
  role text,
  team_size integer,
  source text not null default 'results',
  created_at timestamptz not null default now()
);

create index if not exists audits_public_id_idx on public.audits(public_id);
create index if not exists leads_email_idx on public.leads(email);
create index if not exists leads_audit_id_idx on public.leads(audit_id);

alter table public.audits enable row level security;
alter table public.leads enable row level security;

drop policy if exists "Public audits are readable by public id" on public.audits;
create policy "Public audits are readable by public id"
on public.audits
for select
using (true);

-- Writes are performed with the server-side service role key only.
-- No public insert policies are needed for Day 5.
