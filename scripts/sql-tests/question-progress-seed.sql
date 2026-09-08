-- Seed for question-progress-assert.sql, against the REAL schema plus
-- migrations/20260908_chapter_question_progress.sql.
--
-- Two unrelated families, so "another family cannot read this child's progress"
-- is a real assertion rather than a self-comparison.
--
-- ⚠ Rows are inserted as the superuser on purpose. RLS is what the assertions
--   test; seeding through it would be testing the seed.

INSERT INTO auth.users (id, email) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'anna@example.test'),
  ('b2222222-2222-2222-2222-222222222222', 'brian@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Anna',  'parent'),
  ('b2222222-2222-2222-2222-222222222222', 'Brian', 'parent')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.families (id, parent_id, family_name) VALUES
  ('aaaa0000-0000-0000-0000-00000000000a',
   'a1111111-1111-1111-1111-111111111111', 'Anna Family'),
  ('bbbb0000-0000-0000-0000-00000000000b',
   'b2222222-2222-2222-2222-222222222222', 'Brian Family')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.students (id, family_id, username, display_name, pin, settings) VALUES
  ('cccc0000-0000-0000-0000-00000000000c',
   'aaaa0000-0000-0000-0000-00000000000a', 'ayesha', 'Ayesha', '1234', '{}'::jsonb),
  ('dddd0000-0000-0000-0000-00000000000d',
   'bbbb0000-0000-0000-0000-00000000000b', 'dev',    'Dev',    '5678', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Ayesha has legacy answeredIds and no per-question rows yet, so the backfill
-- has something real to convert.
INSERT INTO public.student_progress (student_id, data) VALUES
  ('cccc0000-0000-0000-0000-00000000000c',
   '{"chapters":{"g6-air":{"attempted":9,"correct":6,"answeredIds":["g6sci-air-001","g6sci-air-002","g6sci-air-003"]},
                 "g6-materials":{"attempted":2,"correct":2,"answeredIds":["g6sci-mat-001"]}}}'::jsonb)
ON CONFLICT (student_id) DO UPDATE SET data = EXCLUDED.data;

-- One row belonging to Brian's child, which Anna must never be able to read.
INSERT INTO public.student_question_progress
  (student_id, question_id, chapter_id, state, attempts, correct_attempts)
VALUES
  ('dddd0000-0000-0000-0000-00000000000d', 'g6sci-air-001', 'g6-air', 'secure', 1, 1)
ON CONFLICT (student_id, question_id) DO NOTHING;
