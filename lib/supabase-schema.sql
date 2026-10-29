-- Uploaded files tracking
create table if not exists uploads (
  id uuid default gen_random_uuid() primary key,
  filename text not null,
  file_type text not null,
  size_kb numeric,
  status text default 'PROCESSING', -- PROCESSING, PARSED, ERROR
  created_at timestamptz default now()
);

-- Individual transactions/expenses from uploaded files
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  upload_id uuid references uploads(id) on delete cascade,
  date text,
  description text,
  amount numeric,
  category text,
  deductible_amount numeric default 0,
  deductible_pct text,
  form text,
  is_unclassified boolean default false,
  created_at timestamptz default now()
);

-- Tax analysis results (one row per analysis run)
create table if not exists tax_analysis (
  id uuid default gen_random_uuid() primary key,
  gross_revenue numeric,
  total_expenses numeric,
  net_profit numeric,
  total_deductions numeric,
  federal_income_tax numeric,
  se_tax numeric,
  mo_state_tax numeric,
  qbi_deduction numeric,
  total_tax numeric,
  effective_rate numeric,
  created_at timestamptz default now()
);

-- Opportunities/loopholes found
create table if not exists opportunities (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references tax_analysis(id) on delete cascade,
  priority text, -- HIGH, MEDIUM, LOW
  title text,
  estimated_savings text,
  why text,
  action text,
  tool_to_run text,
  created_at timestamptz default now()
);

-- Quarterly tax payments
create table if not exists quarterly_payments (
  id uuid default gen_random_uuid() primary key,
  quarter text,
  period text,
  due_date text,
  federal numeric,
  state_tax numeric,
  status text default 'DUE', -- PAID, DUE, UPCOMING
  paid_date text,
  created_at timestamptz default now()
);
