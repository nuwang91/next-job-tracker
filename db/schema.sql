create table if not exists jobs (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company    text not null,
  role       text not null,
  status     text not null check (status in ('applied', 'interview', 'offer', 'rejected')),
  notes      text,
  created_at timestamptz not null default now()
);

create table if not exists interviews (
  id     text primary key default gen_random_uuid()::text,
  job_id integer not null references jobs (id) on delete cascade,
  date   timestamptz not null,
  done   boolean not null default false
);