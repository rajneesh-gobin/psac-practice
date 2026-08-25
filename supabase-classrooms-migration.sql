-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — CLASSROOMS & ENROLLMENTS
--
--  Adds the schema the teacher role needs so teacher data stops living in
--  localStorage ("mathmaster_teacher"), which is lost on every new device.
--
--  Adds:
--    classrooms              a teacher's class (invite code, subject, grade)
--    enrollments             student ↔ classroom link
--    assignment_submissions  graded results for teacher-set work
--    student_assignments.source_type / .classroom_id
--
--  PREREQUISITE: supabase-rls-migration.sql must have been run (it defines
--  is_admin(), current_student_id(), owns_student_txt() and student_sessions).
--  Part 0 below re-creates them idempotently, so this file is safe to run
--  either way.
--
--  TYPE NOTE: student_assignments.student_id is TEXT in this database (not
--  UUID as the docs claim), while students.id is UUID. Comparisons below
--  normalise with ::text. See §V4 of PROJECT_OVERVIEW.md.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── PART 0 · Prerequisites (no-ops if the RLS migration already ran) ────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.student_sessions (
  token_hash text        PRIMARY KEY,
  student_id uuid        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  user_agent text
);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT coalesce((SELECT p.role = 'admin' FROM public.profiles p WHERE p.id = auth.uid()), false);
$fn$;

-- NEW: teacher predicate, mirroring is_admin().
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT coalesce((SELECT p.role = 'teacher' FROM public.profiles p WHERE p.id = auth.uid()), false);
$fn$;

GRANT EXECUTE ON FUNCTION public.is_teacher() TO anon, authenticated;


-- ── PART 1 · classrooms ─────────────────────────────────────────────────────
-- invite_code: 8 uppercase chars, unique, auto-generated. Deliberately excludes
-- I/O/0/1 so a child copying it off a whiteboard cannot confuse them.
CREATE OR REPLACE FUNCTION public.gen_invite_code()
RETURNS text LANGUAGE plpgsql VOLATILE AS $fn$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text;
  i   int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..8 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.classrooms c WHERE c.invite_code = out);
  END LOOP;
  RETURN out;
END;
$fn$;

CREATE TABLE IF NOT EXISTS public.classrooms (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id  uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name        text        NOT NULL,
  subject     text,                    -- 'maths' | 'french' | ... (free text)
  grade_level int         CHECK (grade_level IN (4, 5, 6)),
  schedule    text,                    -- e.g. 'Mon/Wed 4-5pm' (display only)
  invite_code text        UNIQUE NOT NULL DEFAULT public.gen_invite_code(),
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS classrooms_teacher_idx ON public.classrooms(teacher_id);
CREATE INDEX IF NOT EXISTS classrooms_code_idx    ON public.classrooms(invite_code);

-- "teacher_id must have role='teacher'" cannot be a CHECK constraint (it would
-- need a subquery), and a trigger would block admins creating classes on a
-- teacher's behalf. It is enforced in the RLS policies below instead: only a
-- caller who IS that teacher (or an admin) can insert.


-- ── PART 2 · enrollments ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.enrollments (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id   uuid        NOT NULL REFERENCES public.students(id)   ON DELETE CASCADE,
  classroom_id uuid        NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  joined_at    timestamptz NOT NULL DEFAULT now(),
  is_active    boolean     NOT NULL DEFAULT true,
  UNIQUE (student_id, classroom_id)
);

CREATE INDEX IF NOT EXISTS enrollments_student_idx   ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS enrollments_classroom_idx ON public.enrollments(classroom_id);


-- ── PART 3 · student_assignments: parent vs teacher ─────────────────────────
ALTER TABLE public.student_assignments
  ADD COLUMN IF NOT EXISTS source_type  text DEFAULT 'parent',
  ADD COLUMN IF NOT EXISTS classroom_id uuid REFERENCES public.classrooms(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS due_date     date;

-- Backfill before adding the constraint, so existing rows do not violate it.
UPDATE public.student_assignments SET source_type = 'parent' WHERE source_type IS NULL;

DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'student_assignments_source_type_chk'
  ) THEN
    ALTER TABLE public.student_assignments
      ADD CONSTRAINT student_assignments_source_type_chk
      CHECK (source_type IN ('parent', 'teacher'));
  END IF;
END
$do$;

CREATE INDEX IF NOT EXISTS assignments_classroom_idx ON public.student_assignments(classroom_id);
CREATE INDEX IF NOT EXISTS assignments_source_idx    ON public.student_assignments(source_type);


-- ── PART 4 · assignment_submissions (teacher results) ───────────────────────
-- Chosen over stuffing results into student_progress.data because:
--   • teachers must query ACROSS students ("show me the whole class"), which a
--     per-student JSON blob cannot do without scanning every row;
--   • student_progress is client-writable by the student, so a pupil could
--     edit their own marks. This table is insert-only for students.
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id uuid        REFERENCES public.student_assignments(id) ON DELETE CASCADE,
  classroom_id  uuid        REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_id    uuid        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  attempt       int         NOT NULL DEFAULT 1,
  score         int         NOT NULL DEFAULT 0,
  total         int         NOT NULL DEFAULT 0,
  pct           int         NOT NULL DEFAULT 0,
  answers       jsonb       NOT NULL DEFAULT '[]',   -- [{question,userAnswer,correctAnswer,correct}]
  retry_allowed boolean     NOT NULL DEFAULT false,
  submitted_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submissions_classroom_idx  ON public.assignment_submissions(classroom_id);
CREATE INDEX IF NOT EXISTS submissions_student_idx    ON public.assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS submissions_assignment_idx ON public.assignment_submissions(assignment_id);


-- ── PART 5 · Ownership helpers ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.owns_classroom(p_classroom uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = p_classroom AND c.teacher_id = auth.uid()
  );
$fn$;

-- Is the signed-in parent the parent of a student enrolled in this classroom?
CREATE OR REPLACE FUNCTION public.parent_of_classroom_member(p_classroom uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments e
    JOIN public.students s ON s.id = e.student_id
    JOIN public.families f ON f.id = s.family_id
    WHERE e.classroom_id = p_classroom AND f.parent_id = auth.uid()
  );
$fn$;

GRANT EXECUTE ON FUNCTION public.owns_classroom(uuid)               TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.parent_of_classroom_member(uuid)   TO anon, authenticated;


-- ── PART 6 · RLS ────────────────────────────────────────────────────────────
ALTER TABLE public.classrooms             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS classrooms_teacher     ON public.classrooms;
DROP POLICY IF EXISTS classrooms_member_read ON public.classrooms;
DROP POLICY IF EXISTS enroll_teacher         ON public.enrollments;
DROP POLICY IF EXISTS enroll_parent_read     ON public.enrollments;
DROP POLICY IF EXISTS enroll_student_read    ON public.enrollments;
DROP POLICY IF EXISTS subs_teacher           ON public.assignment_submissions;
DROP POLICY IF EXISTS subs_student_insert    ON public.assignment_submissions;
DROP POLICY IF EXISTS subs_student_read      ON public.assignment_submissions;
DROP POLICY IF EXISTS subs_parent_read       ON public.assignment_submissions;

-- ....................................................... classrooms
-- Teachers fully manage their own classes; admins see everything.
CREATE POLICY classrooms_teacher ON public.classrooms FOR ALL
  USING (teacher_id = auth.uid() OR public.is_admin())
  WITH CHECK ((teacher_id = auth.uid() AND public.is_teacher()) OR public.is_admin());

-- Enrolled students and their parents may READ the classroom row (they need the
-- name/subject/schedule for display). No write access.
CREATE POLICY classrooms_member_read ON public.classrooms FOR SELECT
  USING (
    public.parent_of_classroom_member(id)
    OR EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.classroom_id = classrooms.id
        AND e.student_id = public.current_student_id()
    )
  );
-- NOTE: joining by invite code is NOT done through this policy - a public
-- lookup by code would let anyone enumerate classrooms. It goes through the
-- join_classroom() RPC in Part 7, which is SECURITY DEFINER.

-- ....................................................... enrollments
CREATE POLICY enroll_teacher ON public.enrollments FOR ALL
  USING (public.owns_classroom(classroom_id) OR public.is_admin())
  WITH CHECK (public.owns_classroom(classroom_id) OR public.is_admin());

-- Parents see (read-only) which classes their children are in.
CREATE POLICY enroll_parent_read ON public.enrollments FOR SELECT
  USING (public.owns_student_txt(student_id::text));

-- Students see their own enrollments.
CREATE POLICY enroll_student_read ON public.enrollments FOR SELECT
  USING (student_id = public.current_student_id());

-- ....................................................... assignment_submissions
CREATE POLICY subs_teacher ON public.assignment_submissions FOR ALL
  USING (public.owns_classroom(classroom_id) OR public.is_admin())
  WITH CHECK (public.owns_classroom(classroom_id) OR public.is_admin());

-- A student may submit their own result, and read it back, but never UPDATE or
-- DELETE it - marks are append-only from the pupil's side.
CREATE POLICY subs_student_insert ON public.assignment_submissions FOR INSERT
  WITH CHECK (student_id = public.current_student_id());
CREATE POLICY subs_student_read ON public.assignment_submissions FOR SELECT
  USING (student_id = public.current_student_id());

CREATE POLICY subs_parent_read ON public.assignment_submissions FOR SELECT
  USING (public.owns_student_txt(student_id::text));


-- ── PART 7 · join_classroom RPC ─────────────────────────────────────────────
-- Joining by invite code must not require SELECT on classrooms (that would
-- allow enumeration), so it runs SECURITY DEFINER. The caller must hold a valid
-- student session OR be the parent of the student being enrolled.
CREATE OR REPLACE FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_class public.classrooms%ROWTYPE;
BEGIN
  IF NOT (p_student_id = public.current_student_id()
          OR public.owns_student(p_student_id)
          OR public.is_admin()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT * INTO v_class FROM public.classrooms
  WHERE upper(invite_code) = upper(trim(p_invite_code)) AND is_active LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  INSERT INTO public.enrollments (student_id, classroom_id)
  VALUES (p_student_id, v_class.id)
  ON CONFLICT (student_id, classroom_id)
  DO UPDATE SET is_active = true;

  RETURN jsonb_build_object(
    'ok', true,
    'classroom', jsonb_build_object(
      'id', v_class.id, 'name', v_class.name, 'subject', v_class.subject,
      'grade_level', v_class.grade_level, 'schedule', v_class.schedule)
  );
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.join_classroom(text, uuid) TO anon, authenticated;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- SELECT tablename, policyname, cmd FROM pg_policies
--  WHERE schemaname='public'
--    AND tablename IN ('classrooms','enrollments','assignment_submissions')
--  ORDER BY tablename, policyname;
--
-- With ONLY the publishable key, all three must return 0 rows:
--   curl -H "apikey: <KEY>" -H "Authorization: Bearer <KEY>" \
--        "https://<project>.supabase.co/rest/v1/classrooms?select=id"
