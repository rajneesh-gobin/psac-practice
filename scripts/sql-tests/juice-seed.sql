-- Seed for juice-assert.sql.
--
-- ⚠ Inserted as the superuser. RLS and the grants are what the assertions
--   test; seeding through them would be testing the seed.
--
-- Three accounts, because the interesting cases are all about who may do what:
--   Priya   a parent, no access yet          (expires_at NULL)
--   Ravi    a parent whose access runs to +10 days  (renewal must ADD, not reset)
--   Probe   a parent used only for the start/clamp probes, so the rows they
--           leave behind never make another assertion ambiguous
--   Admin   role = 'admin', the only one who may confirm

INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'priya@example.test'),
  ('22222222-2222-2222-2222-222222222222', 'ravi@example.test'),
  ('33333333-3333-3333-3333-333333333333', 'probe@example.test'),
  ('99999999-9999-9999-9999-999999999999', 'admin@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role, expires_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Priya', 'parent', NULL),
  ('22222222-2222-2222-2222-222222222222', 'Ravi',  'parent', now() + interval '10 days'),
  ('33333333-3333-3333-3333-333333333333', 'Probe', 'parent', NULL),
  ('99999999-9999-9999-9999-999999999999', 'Admin', 'admin',  NULL)
ON CONFLICT (id) DO NOTHING;

-- One purchasable plan, one free one, one switched off. The last two exist so
-- the "what may be bought" checks have something real to refuse.
INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active) VALUES
  ('family',  'Family',   450, 3, '{"printable_papers": true}'::jsonb,  true),
  ('free',    'Free',       0, 1, '{"printable_papers": false}'::jsonb, true),
  ('retired', 'Retired',  300, 2, '{}'::jsonb,                          false)
ON CONFLICT (id) DO NOTHING;

-- Ravi already holds a plan. Confirming a new payment must supersede it rather
-- than leave two rows claiming to be active.
INSERT INTO public.subscriptions (user_id, plan_id, status, started_at, expires_at)
VALUES ('22222222-2222-2222-2222-222222222222', 'free', 'active',
        now() - interval '20 days', now() + interval '10 days');

-- Juice switched ON, with a number. Both are required before anything can be
-- started, and the "switched off" case is asserted by turning it off later.
INSERT INTO public.mm_data (key, value)
VALUES ('payment_settings', jsonb_build_object(
  'juice_enabled', true,
  'juice_number',  '5xxx xxxx',
  'juice_name',    'PSAC Practice Ltd',
  'juice_note',    'Send the exact amount and put the reference in the message.',
  'internal_only', 'THIS MUST NEVER REACH A BROWSER'
))
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
