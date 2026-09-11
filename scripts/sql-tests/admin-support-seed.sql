-- Seed for admin-support-assert.sql.
--
-- ⚠ Inserted as the superuser. RLS, the grants and the guards are what the
--   assertions test; seeding through them would be testing the seed.
--
--   Sue    admin, SUPER admin
--   Pat    admin, NOT a super admin
--   Pam    parent, owns family F1 (child Kim, and Del who was deleted)
--   Omar   parent, owns family F2 (child Ola)
--   Tim    parent, the account whose role the admins argue over

INSERT INTO auth.users (id, email, email_confirmed_at) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'sue@example.test',  now()),
  ('a0000000-0000-4000-8000-000000000002', 'pat@example.test',  now()),
  ('a0000000-0000-4000-8000-000000000003', 'pam@example.test',  now()),
  ('a0000000-0000-4000-8000-000000000004', 'omar@example.test', now()),
  ('a0000000-0000-4000-8000-000000000005', 'tim@example.test',  now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role, is_super_admin) VALUES
  ('a0000000-0000-4000-8000-000000000001', 'Sue',  'admin',  true),
  ('a0000000-0000-4000-8000-000000000002', 'Pat',  'admin',  false),
  ('a0000000-0000-4000-8000-000000000003', 'Pam',  'parent', false),
  ('a0000000-0000-4000-8000-000000000004', 'Omar', 'parent', false),
  ('a0000000-0000-4000-8000-000000000005', 'Tim',  'parent', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.families (id, parent_id, family_name) VALUES
  ('f0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000003', 'Pamfamily'),
  ('f0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000004', 'Omarfamily')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.students (id, family_id, username, display_name, grade, pin, settings, deleted_at) VALUES
  ('b0000000-0000-4000-8000-000000000001', 'f0000000-0000-4000-8000-000000000001', 'kim', 'Kim', 5, 'x',
   '{"examDisabled": false, "maxDifficulty": 4, "lockedChapters": []}'::jsonb, NULL),
  ('b0000000-0000-4000-8000-000000000002', 'f0000000-0000-4000-8000-000000000001', 'del', 'Del', 4, 'x',
   '{"examDisabled": false, "maxDifficulty": 4, "lockedChapters": []}'::jsonb, now()),
  ('b0000000-0000-4000-8000-000000000003', 'f0000000-0000-4000-8000-000000000002', 'ola', 'Ola', 6, 'x',
   '{"examDisabled": false, "maxDifficulty": 4, "lockedChapters": []}'::jsonb, NULL)
ON CONFLICT (id) DO NOTHING;
