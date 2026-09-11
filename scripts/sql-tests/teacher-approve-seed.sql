-- Seed for teacher-approve-assert.sql.
--
-- ⚠ Inserted as the superuser. RLS, the grants and the role guard are what the
--   assertions test; seeding through them would be testing the seed.
--
-- One account per case, so no assertion depends on the order of another:
--   Tara  confirmed email, never decided          → auto-approved when ON
--   Uma   never clicked the verification link      → queue, even when ON
--   Rex   rejected by an admin                     → queue, even when ON
--   Nia   set back to 'none' by an admin           → queue, even when ON
--   Sam   suspended                                → refused, as before
--   Otto  applies while the switch is OFF          → queue
--   Gil   applies while the switch holds a string  → queue, and no error
--   Mal   tries to flip the switch / self-approve  → nothing
--   Admin role = 'admin'

INSERT INTO auth.users (id, email, email_confirmed_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'tara@example.test', now()),
  ('22222222-2222-2222-2222-222222222222', 'uma@example.test',  NULL),
  ('33333333-3333-3333-3333-333333333333', 'rex@example.test',  now()),
  ('44444444-4444-4444-4444-444444444444', 'nia@example.test',  now()),
  ('55555555-5555-5555-5555-555555555555', 'sam@example.test',  now()),
  ('66666666-6666-6666-6666-666666666666', 'otto@example.test', now()),
  ('77777777-7777-7777-7777-777777777777', 'gil@example.test',  now()),
  ('88888888-8888-8888-8888-888888888888', 'mal@example.test',  now()),
  ('99999999-9999-9999-9999-999999999999', 'admin@example.test', now())
ON CONFLICT (id) DO NOTHING;

-- The admin first: teacher_decided_by below references this row.
INSERT INTO public.profiles (id, full_name, role) VALUES
  ('99999999-9999-9999-9999-999999999999', 'Admin', 'admin')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role, teacher_status, teacher_decided_at, teacher_decided_by) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Tara', 'parent', 'none',      NULL, NULL),
  ('22222222-2222-2222-2222-222222222222', 'Uma',  'parent', 'none',      NULL, NULL),
  ('33333333-3333-3333-3333-333333333333', 'Rex',  'parent', 'rejected',  now() - interval '3 days', '99999999-9999-9999-9999-999999999999'),
  ('44444444-4444-4444-4444-444444444444', 'Nia',  'parent', 'none',      now() - interval '2 days', '99999999-9999-9999-9999-999999999999'),
  ('55555555-5555-5555-5555-555555555555', 'Sam',  'parent', 'suspended', now() - interval '1 day',  '99999999-9999-9999-9999-999999999999'),
  ('66666666-6666-6666-6666-666666666666', 'Otto', 'parent', 'none',      NULL, NULL),
  ('77777777-7777-7777-7777-777777777777', 'Gil',  'parent', 'none',      NULL, NULL),
  ('88888888-8888-8888-8888-888888888888', 'Mal',  'parent', 'none',      NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- The switch starts OFF, as it ships.
INSERT INTO public.mm_data (key, value)
VALUES ('global_settings', '{"registration_open": true, "teacher_auto_approve": false}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = public.mm_data.value || EXCLUDED.value;
