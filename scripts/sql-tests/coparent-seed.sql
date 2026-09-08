-- Seed for coparent-assert.sql, against the REAL schema from supabase-schema.sql.
--
-- It replaces the old coparent-fixture.sql, which hand-built a stand-in copy of
-- the tables and the PRE-migration function bodies so that supabase-coparent.sql
-- could perform string surgery on them. There is no migration to perform surgery
-- any more — the end state ships in supabase-schema.sql — so the fixture's job is
-- now only to put three people and one family in front of the assertions.
--
-- ⚠ Rows are inserted as the superuser on purpose. RLS is what the assertions
--   test; seeding through it would be testing the seed.

INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'alice@example.test'),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.test'),
  ('33333333-3333-3333-3333-333333333333', 'mallory@example.test')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice',   'parent'),
  ('22222222-2222-2222-2222-222222222222', 'Bob',     'parent'),
  ('33333333-3333-3333-3333-333333333333', 'Mallory', 'parent')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.families (id, parent_id, family_name) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '11111111-1111-1111-1111-111111111111', 'Alice Family')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.students (id, family_id, username, display_name, pin, settings) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd',
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'kid', 'Kid', '1234', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- The owner row §12 of supabase-schema.sql backfills. The seed inserts this
-- family AFTER the schema has run, so it must create its own — production has
-- one for every family, and remove_family_member() reads family_members to tell
-- 'cannot_remove_owner' from 'not_a_member'.
INSERT INTO public.family_members (family_id, user_id, role) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '11111111-1111-1111-1111-111111111111', 'owner')
ON CONFLICT DO NOTHING;
