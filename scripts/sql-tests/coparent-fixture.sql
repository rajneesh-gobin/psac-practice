-- Minimal stand-in for the live database: just enough of the real shapes for
-- the co-parent migration to bite on. The 5 function bodies and 2 policies are
-- copied VERBATIM from supabase-schema.sql, because it is precisely the string
-- surgery over those exact bodies that is being tested.
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS extensions;

-- auth.uid() is swappable per test via a GUC.
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('test.uid', true), '')::uuid;
$$;

DO $r$ BEGIN CREATE ROLE anon;          EXCEPTION WHEN duplicate_object THEN NULL; END $r$;
DO $r$ BEGIN CREATE ROLE authenticated; EXCEPTION WHEN duplicate_object THEN NULL; END $r$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  role text NOT NULL DEFAULT 'parent',
  full_name text NOT NULL,
  deleted_at timestamptz
);

CREATE TABLE public.families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  family_name text NOT NULL DEFAULT 'My Family',
  family_code char(6) NOT NULL DEFAULT upper(substr(md5(random()::text),1,6)),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL,
  username text NOT NULL,
  display_name text NOT NULL,
  avatar text NOT NULL DEFAULT '??',
  grade int NOT NULL DEFAULT 5,
  pin text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  session_version int NOT NULL DEFAULT 0,
  expires_at timestamptz,
  pin_hash text,
  pin_attempts int NOT NULL DEFAULT 0,
  pin_locked_until timestamptz,
  deleted_at timestamptz
);

CREATE TABLE public.classrooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code text
);
CREATE TABLE public.enrollments (
  classroom_id uuid,
  student_id uuid
);

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public','extensions' AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin');
$$;

CREATE OR REPLACE FUNCTION public.current_student_id() RETURNS uuid
LANGUAGE sql STABLE AS $$ SELECT NULL::uuid $$;

-- ── VERBATIM from supabase-schema.sql ──────────────────────────────────────
CREATE OR REPLACE FUNCTION public.owns_student(p_student uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
    WHERE s.id = p_student
      AND f.parent_id = auth.uid()
  );
$function$;

CREATE OR REPLACE FUNCTION public.owns_student_txt(p_student text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT CASE
           WHEN p_student ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
           THEN public.owns_student(p_student::uuid)
           ELSE false
         END;
$function$;

CREATE OR REPLACE FUNCTION public.parent_of_classroom_member(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments e
    JOIN public.students s ON s.id = e.student_id
    JOIN public.families f ON f.id = s.family_id
    WHERE e.classroom_id = p_classroom AND f.parent_id = auth.uid()
  );
$function$;

CREATE OR REPLACE FUNCTION public.set_student_pin(p_student_id uuid, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_ok boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.students s
    JOIN public.families f ON f.id = s.family_id
    WHERE s.id = p_student_id
    AND (f.parent_id = auth.uid() OR public.is_admin())
  ) INTO v_ok;
  IF NOT v_ok THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authorised'); END IF;
  UPDATE public.students SET pin_hash = crypt(p_pin, gen_salt('bf')) WHERE id = p_student_id;
  RETURN jsonb_build_object('ok', true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.soft_delete_student(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_ok boolean;
BEGIN
  SELECT EXISTS (
     SELECT 1 FROM public.students s
     JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND (f.parent_id = auth.uid() OR public.is_admin())
  ) INTO v_ok;
  IF NOT v_ok THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authorised'); END IF;
  UPDATE public.students SET deleted_at = now() WHERE id = p_student;
  RETURN jsonb_build_object('ok', true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text DEFAULT NULL::text, p_grade integer DEFAULT 5, p_pin text DEFAULT NULL::text, p_settings jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family_id AND f.parent_id = auth.uid())
  THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authorised'); END IF;
  INSERT INTO public.students (family_id, username, display_name, avatar, grade, pin, settings)
  VALUES (p_family_id, p_username, p_display_name, coalesce(p_avatar,'??'), p_grade, '', coalesce(p_settings,'{}'))
  RETURNING id INTO v_id;
  RETURN jsonb_build_object('ok', true, 'id', v_id);
END;
$function$;

-- ── policies, verbatim shapes ──────────────────────────────────────────────
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
CREATE POLICY families_own ON public.families AS PERMISSIVE FOR ALL TO public
  USING (((parent_id = auth.uid()) OR is_admin()))
  WITH CHECK (((parent_id = auth.uid()) OR is_admin()));

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY students_parent ON public.students AS PERMISSIVE FOR ALL TO public
  USING ((owns_student_txt((id)::text) OR is_admin()))
  WITH CHECK ((is_admin() OR ((family_id)::text IN ( SELECT (f.id)::text AS id
   FROM families f
  WHERE (f.parent_id = auth.uid())))));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.families  TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students  TO anon, authenticated;
GRANT SELECT ON public.profiles TO anon, authenticated;

-- ── seed: owner Alice, co-parent-to-be Bob, stranger Mallory, child Nadia ──
INSERT INTO public.profiles (id, full_name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice'),
  ('22222222-2222-2222-2222-222222222222', 'Bob'),
  ('33333333-3333-3333-3333-333333333333', 'Mallory');

INSERT INTO public.families (id, parent_id, family_name) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Balnac');

INSERT INTO public.students (id, family_id, username, display_name, pin) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'nadia', 'Nadia', '');
