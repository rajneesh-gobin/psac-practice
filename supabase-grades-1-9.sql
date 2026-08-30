-- ══════════════════════════════════════════════════════════════════════════
--  OPEN THE APP TO GRADES 1-9
--  Run this in the Supabase SQL editor. Idempotent: re-running changes nothing.
--
--  WHY THIS IS SO SHORT
--    Almost nothing in the database knows what a grade is. `students.grade` is a
--    plain `integer NOT NULL DEFAULT 5` with no CHECK, `questions.grade` is the
--    same, and every screen in the app derives its grade list from the JS
--    subject packs at runtime. Exactly ONE constraint in the whole schema names
--    the grades 4, 5 and 6, and it is on the teacher classrooms table.
--
--  WHAT WOULD HAPPEN WITHOUT IT
--    A teacher creating a Grade 2 or Grade 8 classroom gets
--      new row for relation "classrooms" violates check constraint
--      "classrooms_grade_level_check"
--    Nothing else in the app fails. Children can already be enrolled in any
--    grade as far as Postgres is concerned — which is precisely why the
--    PARENT-facing grade dropdowns are deliberately still limited to the grades
--    that have content (see _populateGradeSelects in engine/app.js). The
--    database is not the thing stopping a child being put in an empty grade,
--    and it never was.
--
--  ⚠ A RANGE, NOT A LIST. The old constraint spelled out ARRAY[4,5,6], so
--    adding grades meant a migration. `BETWEEN 1 AND 9` covers the whole of
--    Mauritian basic education (primary G1-6 + lower secondary G7-9) and needs
--    no further migration when a pack is filled in. It is still bounded on
--    purpose: an unconstrained integer would let a typo create a "Grade 55"
--    classroom that no subject pack can ever match.
-- ══════════════════════════════════════════════════════════════════════════

-- ── Classrooms: allow grades 1-9 ─────────────────────────────────────────
ALTER TABLE public.classrooms
  DROP CONSTRAINT IF EXISTS classrooms_grade_level_check;

ALTER TABLE public.classrooms
  ADD CONSTRAINT classrooms_grade_level_check
  CHECK (grade_level IS NULL OR (grade_level BETWEEN 1 AND 9));

-- ── Nothing else needs changing ──────────────────────────────────────────
--   students.grade          integer NOT NULL DEFAULT 5   — no constraint, no change
--   questions.grade         integer                      — no constraint, no change
--   create_student_with_pin(p_grade integer DEFAULT 5)   — passes the value through
--   mm_data.global_settings.disabled_grades              — a jsonb array, grade-blind
--   plans.allowed_chapters / chapter_entitlements        — keyed on chapter id
--
--   The question bundles the Netlify function serves are per-grade files built
--   by netlify/build-questions.js, which now DISCOVERS grades from the
--   subjects/ directory instead of looping [4,5,6]. Adding a pack needs no
--   database change at all.

-- ── Verification ─────────────────────────────────────────────────────────
-- Should print the new BETWEEN expression, and nothing mentioning 4, 5, 6:
--
--   SELECT conname, pg_get_constraintdef(oid) AS definition
--   FROM   pg_constraint
--   WHERE  conrelid = 'public.classrooms'::regclass
--     AND  conname  = 'classrooms_grade_level_check';
--
-- Should succeed (then roll back, so nothing is left behind):
--
--   BEGIN;
--     INSERT INTO public.classrooms (teacher_id, name, grade_level)
--     VALUES (auth.uid(), 'grade-2 probe', 2);
--     INSERT INTO public.classrooms (teacher_id, name, grade_level)
--     VALUES (auth.uid(), 'grade-9 probe', 9);
--   ROLLBACK;
