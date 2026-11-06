begin;

-- Start from a clean slate every time you run this
truncate interviews, jobs;

insert into jobs (company, role, status, notes, created_at) values
  ('GIC',       'Software Engineer',        'applied',   null,                      '2026-01-03'),
  ('Google',    'Senior Software Engineer', 'interview', 'Interview on 2026-05-15', '2026-01-02'),
  ('Amazon',    'Backend Engineer',         'offer',     null,                      '2026-01-03'),
  ('Facebook',  'Frontend Engineer',        'applied',   null,                      '2026-01-04'),
  ('Microsoft', 'Full Stack Engineer',      'rejected',  null,                      '2026-01-05');

insert into interviews (job_id, date, done) values
  ('2', '2026-05-15', true),
  ('2', '2026-05-20', false),
  ('2', '2026-05-25', false);

commit;