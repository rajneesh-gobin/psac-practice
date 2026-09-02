-- Reproduces the live failure: families_own after supabase-coparent.sql rewrote
-- its USING clause from `parent_id = auth.uid()` to `is_family_member(id)`.
--
-- ⚠ The bug is NOT that the policy fails to cover INSERT - it is FOR ALL and its
--   WITH CHECK is correct. It is that PostgREST emits INSERT ... RETURNING, and
--   RETURNING is checked against USING, where is_family_member() has to look up
--   a row that does not exist yet from its own snapshot.
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
CREATE SCHEMA IF NOT EXISTS auth;

CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('test.uid', true), '')::uuid;
$$;

DO $r$ BEGIN CREATE ROLE anon;          EXCEPTION WHEN duplicate_object THEN NULL; END $r$;
DO $r$ BEGIN CREATE ROLE authenticated; EXCEPTION WHEN duplicate_object THEN NULL; END $r$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  role text NOT NULL DEFAULT 'parent',
  full_name text NOT NULL
);

CREATE TABLE public.families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  family_name text NOT NULL DEFAULT 'My Family',
  family_code char(6) NOT NULL DEFAULT upper(substr(md5(random()::text),1,6))
);
ALTER TABLE public.families ADD CONSTRAINT families_parent_id_key UNIQUE (parent_id);

CREATE TABLE public.family_members (
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (family_id, user_id)
);

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT coalesce((SELECT p.role = 'admin' FROM public.profiles p WHERE p.id = auth.uid()), false);
$$;

-- Copied from the live definition, because it is precisely this function's
-- inability to see the row being inserted that the test is about.
CREATE OR REPLACE FUNCTION public.is_family_member(p_family uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family AND f.parent_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM public.family_members m
             WHERE m.family_id = p_family AND m.user_id = auth.uid())
  );
$$;

-- The live shape: FOR ALL, WITH CHECK correct, USING rewritten by the co-parent
-- migration. Both halves matter - a fixture with the wrong WITH CHECK would
-- fail for the wrong reason and prove nothing.
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
CREATE POLICY families_own ON public.families AS PERMISSIVE FOR ALL TO public
  USING      ((is_family_member(id) OR is_admin()))
  WITH CHECK (((parent_id = auth.uid()) OR is_admin()));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.families TO anon, authenticated;
GRANT SELECT, INSERT ON public.profiles TO anon, authenticated;
GRANT SELECT ON public.family_members TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(), public.is_family_member(uuid) TO anon, authenticated;

INSERT INTO public.profiles (id, full_name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice'),
  ('22222222-2222-2222-2222-222222222222', 'Bob'),
  ('33333333-3333-3333-3333-333333333333', 'Carol the co-parent');
