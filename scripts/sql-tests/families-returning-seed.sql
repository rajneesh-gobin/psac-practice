-- Seed for families-returning-assert.sql, against the REAL schema.
-- Only the three people; the assertions create the families themselves, because
-- creating one through RLS with a RETURNING clause is precisely what is on test.
INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'alice@example.test'),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.test'),
  ('33333333-3333-3333-3333-333333333333', 'carol@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice', 'parent'),
  ('22222222-2222-2222-2222-222222222222', 'Bob',   'parent'),
  ('33333333-3333-3333-3333-333333333333', 'Carol', 'parent')
ON CONFLICT (id) DO NOTHING;
