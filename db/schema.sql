create table if not exists jobs (
  id         text primary key,
  company    text not null,
  role       text not null,
  status     text not null check (status in ('applied', 'interview', 'offer', 'rejected')),
  notes      text,
  created_at timestamptz not null default now()
);

create table if not exists interviews (
  id     text primary key default gen_random_uuid()::text,
  job_id text not null references jobs (id) on delete cascade,
  date   timestamptz not null,
  done   boolean not null default false
);