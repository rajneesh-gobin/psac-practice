-- Seed for points-assert.sql.
--
-- ⚠ Runs BEFORE the migration, on purpose. §10 of the migration carries each
--   child's old XP forward out of student_progress, and a backfill with nothing
--   to back fill proves nothing. The rows below are what it has to find.
--
-- ⚠ Inserted as the superuser. RLS is what the assertions test; seeding through
--   it would be testing the seed.
--
-- Three families, because the interesting cases are all between children:
--   Ayesha  family A, account 30 days old, 1,250 legacy XP
--   Dev     family B, account 30 days old, no legacy XP
--   Zoe     family C, account created NOW — too new to pay a friend bonus

INSERT INTO auth.users (id, email) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'anna@example.test'),
  ('b2222222-2222-2222-2222-222222222222', 'brian@example.test'),
  ('c3333333-3333-3333-3333-333333333333', 'cara@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Anna',  'parent'),
  ('b2222222-2222-2222-2222-222222222222', 'Brian', 'parent'),
  ('c3333333-3333-3333-3333-333333333333', 'Cara',  'parent')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.families (id, parent_id, family_name) VALUES
  ('aaaa0000-0000-0000-0000-00000000000a', 'a1111111-1111-1111-1111-111111111111', 'Anna Family'),
  ('bbbb0000-0000-0000-0000-00000000000b', 'b2222222-2222-2222-2222-222222222222', 'Brian Family'),
  ('cccc1111-0000-0000-0000-00000000000e', 'c3333333-3333-3333-3333-333333333333', 'Cara Family')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.students
  (id, family_id, username, display_name, pin, settings, grade, friend_code, created_at) VALUES
  ('cccc0000-0000-0000-0000-00000000000c', 'aaaa0000-0000-0000-0000-00000000000a',
   'ayesha', 'Ayesha', '1234', '{}'::jsonb, 6, 'AYESHA01', now() - interval '30 days'),
  ('dddd0000-0000-0000-0000-00000000000d', 'bbbb0000-0000-0000-0000-00000000000b',
   'dev',    'Dev',    '5678', '{}'::jsonb, 6, 'DEV00001', now() - interval '30 days'),
  ('eeee0000-0000-0000-0000-00000000000e', 'cccc1111-0000-0000-0000-00000000000e',
   'zoe',    'Zoe',    '9012', '{}'::jsonb, 6, 'ZOE00001', now())
ON CONFLICT (id) DO NOTHING;

-- Ayesha has 1,250 XP under the OLD flat 10-per-answer scheme. Level 3 on the
-- new curve (801-1499), so the carry-over is visible rather than cosmetic.
INSERT INTO public.student_progress (student_id, data) VALUES
  ('cccc0000-0000-0000-0000-00000000000c', '{"xp":1250,"level":9}'::jsonb),
  ('dddd0000-0000-0000-0000-00000000000d', '{"xp":0}'::jsonb)
ON CONFLICT (student_id) DO UPDATE SET data = EXCLUDED.data;

-- Questions at each difficulty, so "an L4 is worth four times an L1" is tested
-- against the real column rather than a constant.
INSERT INTO public.questions (id, subject_id, chapter_id, grade, difficulty, data) VALUES
  ('g6sci-air-001', 'grade6-science', 'g6-air', 6, 1, '{"type":"mcq"}'::jsonb),
  ('g6sci-air-002', 'grade6-science', 'g6-air', 6, 2, '{"type":"mcq"}'::jsonb),
  ('g6sci-air-003', 'grade6-science', 'g6-air', 6, 3, '{"type":"mcq"}'::jsonb),
  ('g6sci-air-004', 'grade6-science', 'g6-air', 6, 4, '{"type":"mcq"}'::jsonb),
  ('g6sci-air-005', 'grade6-science', 'g6-air', 6, 3, '{"type":"mcq"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Real sessions, so current_student_id() is exercised as written rather than
-- stubbed: it hashes the header token with sha256 and looks it up here.
INSERT INTO public.student_sessions (token_hash, student_id, expires_at) VALUES
  (encode(extensions.digest('ayesha-token-0123456789abcdefghij', 'sha256'), 'hex'),
   'cccc0000-0000-0000-0000-00000000000c', now() + interval '1 day'),
  (encode(extensions.digest('dev-token-0123456789abcdefghijklm', 'sha256'), 'hex'),
   'dddd0000-0000-0000-0000-00000000000d', now() + interval '1 day'),
  (encode(extensions.digest('zoe-token-0123456789abcdefghijklm', 'sha256'), 'hex'),
   'eeee0000-0000-0000-0000-00000000000e', now() + interval '1 day')
ON CONFLICT DO NOTHING;
