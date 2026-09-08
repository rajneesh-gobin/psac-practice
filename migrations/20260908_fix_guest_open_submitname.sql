-- ═══════════════════════════════════════════════════════════════════════════
--  FIX (3 of 3): the classroom sign-in returned the pupil's KEY under a name
--  the Lambda does not read
--
--  teacher_guest_open() returns  'submitName' → key   (camelCase)
--  assignment-open.js reads      result.submit_name   (snake_case)
--
--  So `submit_name` was always undefined, the Lambda fell back to
--  `result.name`, and the browser then sent the pupil's DISPLAY NAME as the
--  identity on every later call. Every one of those looks the pupil up by
--    name_key = lower(btrim(p_name))
--  which for a per-pupil-PIN sign-in is the pupil's UUID, not their name — so
--  guest_submit(), guest_mark_material() and guest_set_my_name() all answered
--  'no_session'. Measured end to end before this fix.
--
--  ⚠ The RPC is the outlier, so the RPC is what changes. The legacy guest_open()
--    already returns snake_case ('is_retry', …) and the Lambda is written for
--    it; "fixing" the Lambda instead would break the legacy path that works.
--
--  ⚠ 'is_retry' is deliberately NOT added here. The Lambda reads it and this
--    function never returned it, so isRetry has always been false for classroom
--    assignments. That is a behaviour question (should reopening an allowed
--    retry announce itself?) rather than a broken lookup, and it is recorded
--    rather than guessed at.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  v_def  text;
  v_hits int;
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'teacher_guest_open' AND p.prokind = 'f';

  IF v_def IS NULL THEN
    RAISE NOTICE 'teacher_guest_open not found — nothing to fix';
    RETURN;
  END IF;

  v_hits := (length(v_def) - length(replace(v_def, '''submitName''', ''))) / length('''submitName''');
  IF v_hits = 0 THEN
    RAISE NOTICE 'teacher_guest_open already returns submit_name';
    RETURN;
  END IF;
  IF v_hits <> 1 THEN
    RAISE EXCEPTION 'expected exactly 1 submitName key, found %', v_hits;
  END IF;

  EXECUTE replace(v_def, '''submitName''', '''submit_name''');
  RAISE NOTICE 'teacher_guest_open: submitName → submit_name';
END $$;

-- ── verification ───────────────────────────────────────────────────────────
--   SELECT 1 FROM pg_proc p, unnest(string_to_array(pg_get_functiondef(p.oid), chr(10))) l
--    WHERE p.proname='teacher_guest_open' AND l LIKE '%submitName%';   -- expect 0 rows
