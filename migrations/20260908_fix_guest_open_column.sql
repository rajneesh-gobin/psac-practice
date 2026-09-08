-- ═══════════════════════════════════════════════════════════════════════════
--  FIX: no pupil could ever sign in to a classroom assignment
--
--  teacher_guest_open() writes the pupil's display name into
--  guest_submissions.display_name. That column does not exist and never has —
--  the column is name_display. Every sign-in through a classroom assignment
--  therefore failed with:
--      42703  column "display_name" of relation "guest_submissions" does not exist
--  and /api/assignment-open returned a bare 500 "server_error" to the child.
--
--  ⚠ FOUND BY DRIVING THE REAL PAGE, not by reading the code. It is invisible
--    from every other angle:
--      · the column list in supabase-schema.sql is correct — the typo is inside
--        a function body, and the dump reproduces the body faithfully;
--      · scripts/test-teacher-command-centre.js exercises the TEACHER side,
--        which never calls this function;
--      · guest_submit(), guest_results() and teacher_guest_results() all use
--        name_display correctly, so the schema looks consistent;
--      · and it fails only at the moment a real pupil types a real PIN.
--    "0 submissions in the database" read as "nobody has used it yet". It was
--    actually "nobody has ever been able to".
--
--  ⚠ Both call sites are in the SAME function and are the only two occurrences
--    of the string in the whole database (verified before applying). The local
--    variable is `display`, which this does not touch.
--
--  ⚠ Patched from pg_get_functiondef rather than by pasting a new body: the
--    function is ~90 lines of PIN verification, lockout and capacity logic that
--    must not change. Replacing two identifiers in the definition the database
--    itself reports cannot alter anything else.
--
--  ⚠ Safe to rerun: after the first run there is nothing left to replace, and
--    the function is simply recreated identically.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  v_def text;
  v_hits int;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'teacher_guest_open';

  IF v_def IS NULL THEN
    RAISE NOTICE 'teacher_guest_open not found — nothing to fix';
    RETURN;
  END IF;

  v_hits := (length(v_def) - length(replace(v_def, 'display_name', ''))) / length('display_name');
  IF v_hits = 0 THEN
    RAISE NOTICE 'teacher_guest_open already fixed';
    RETURN;
  END IF;

  -- Refuse to guess. If the shape ever changes, stop rather than rewrite
  -- something this migration was not written for.
  IF v_hits <> 2 THEN
    RAISE EXCEPTION 'expected exactly 2 display_name references, found %', v_hits;
  END IF;

  EXECUTE replace(v_def, 'display_name', 'name_display');
  RAISE NOTICE 'teacher_guest_open: % reference(s) corrected to name_display', v_hits;
END $$;

-- ── verification ───────────────────────────────────────────────────────────
--   SELECT count(*) FROM pg_proc p, unnest(string_to_array(pg_get_functiondef(p.oid), chr(10))) l
--    WHERE p.proname = 'teacher_guest_open' AND l LIKE '%display_name%';   -- expect 0
