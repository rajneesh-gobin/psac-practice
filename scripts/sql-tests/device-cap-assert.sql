-- ═══════════════════════════════════════════════════════════════════════════
--  One attempt per device — the RULE, exercised against a real postgres.
--
--  ⚠ Run as the SUPERUSER on purpose, unlike coparent-assert.sql. Nothing here
--    tests RLS: teacher_guest_open and teacher_guest_entry are SECURITY
--    DEFINER, service_role-only, and reached from a Netlify function. What is
--    under test is the DECISION, and the decision is the same for every caller.
--
--  The shape of every check is: do the thing, then print PASS or FAIL with the
--  name of the rule. run-device-cap-tests.sh greps for FAIL.
-- ═══════════════════════════════════════════════════════════════════════════

SET search_path = public, extensions;

DO $$
DECLARE
  v_teacher uuid := gen_random_uuid();
  v_a       uuid;
  v_code    text := 'DEVCAP01';
  v_dev_a   text := repeat('a', 32);
  v_dev_b   text := repeat('b', 32);
  r         jsonb;
  n         integer;
  say       text;
BEGIN
  -- ⚠ teacher_guest_submission_guard() refuses any INSERT into
  --   guest_submissions unless auth.role() is service_role. In production the
  --   caller is netlify/functions/assignment-open.js holding the service key,
  --   so claiming that role here is FAITHFUL, not a way round the guard —
  --   without it this file would only ever prove the guard works.
  PERFORM set_config('request.jwt.claim.role', 'service_role', true);

  -- ── A teacher who passes the profiles test in teacher_guest_open ─────────
  INSERT INTO auth.users(id) VALUES (v_teacher);
  INSERT INTO profiles(id, full_name, role, teacher_status) VALUES (v_teacher, 'Miss T', 'teacher', 'approved');

  -- ── An open-link assignment, capped ─────────────────────────────────────
  INSERT INTO guest_assignments(teacher_id, code, title, subject_pack_id,
                                chapter_ids, question_ids, pin_hash, status, expires_at)
    VALUES (v_teacher, v_code, 'Fractions', 'grade5-maths',
            '["fractions"]'::jsonb, '["q1"]'::jsonb, 'x', 'active', now() + interval '2 days')
    RETURNING id INTO v_a;
  INSERT INTO teacher_guest_access(assignment_id, mode, one_per_device)
    VALUES (v_a, 'nickname', true);

  -- ── 1 · The first child opens and submits ───────────────────────────────
  r := teacher_guest_open(v_code, 'Sam', '', '1.2.3.4', false, v_dev_a);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean THEN 'PASS  first open succeeds'
                         ELSE 'FAIL  first open succeeds (' || coalesce(r->>'error','?') || ')' END;

  SELECT count(*) INTO n FROM guest_submissions
    WHERE assignment_id = v_a AND device_code = v_dev_a;
  RAISE NOTICE '%', CASE WHEN n = 1 THEN 'PASS  the device is recorded on the attempt'
                         ELSE 'FAIL  the device is recorded on the attempt' END;

  UPDATE guest_submissions SET submitted_at = now() WHERE assignment_id = v_a;

  -- ── 2 · THE BUG. Same device, a made-up name ────────────────────────────
  r := teacher_guest_open(v_code, 'Sam2', '', '1.2.3.4', false, v_dev_a);
  RAISE NOTICE '%', CASE WHEN r->>'error' = 'device_used'
                         THEN 'PASS  a second name on the SAME device is refused'
                         ELSE 'FAIL  a second name on the SAME device is refused (got '
                              || coalesce(r->>'error', r->>'ok') || ')' END;
  RAISE NOTICE '%', CASE WHEN r->>'other_name' = 'Sam'
                         THEN 'PASS  …and the refusal names who already finished'
                         ELSE 'FAIL  …and the refusal names who already finished' END;

  -- ── 3 · The same name is still answered by name_taken, not the cap ──────
  r := teacher_guest_open(v_code, 'Sam', '', '1.2.3.4', false, v_dev_a);
  RAISE NOTICE '%', CASE WHEN r->>'error' = 'name_taken'
                         THEN 'PASS  the SAME name still answers name_taken'
                         ELSE 'FAIL  the SAME name still answers name_taken (got '
                              || coalesce(r->>'error','ok') || ')' END;

  -- ── 4 · A DIFFERENT device is a different child, and must get in ────────
  r := teacher_guest_open(v_code, 'Ava', '', '1.2.3.4', false, v_dev_b);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  another device is another child, and is let in'
                         ELSE 'FAIL  another device is another child, and is let in ('
                              || coalesce(r->>'error','?') || ')' END;

  -- ── 5 · ⚠ FAILS OPEN. No device code (private browsing) is never capped ─
  r := teacher_guest_open(v_code, 'Noor', '', '1.2.3.4', false, '');
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  a browser with no device code is NOT locked out'
                         ELSE 'FAIL  a browser with no device code is NOT locked out ('
                              || coalesce(r->>'error','?') || ')' END;
  r := teacher_guest_open(v_code, 'Zed', '', '1.2.3.4', false, 'not-a-device-code');
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  a malformed device code is NOT locked out either'
                         ELSE 'FAIL  a malformed device code is NOT locked out either' END;

  -- ── 6 · A teacher-granted retry overrules the cap ───────────────────────
  UPDATE guest_submissions SET submitted_at = now(), retry_allowed = true
    WHERE assignment_id = v_a AND name_key = 'sam';
  r := teacher_guest_open(v_code, 'Sam', '', '1.2.3.4', false, v_dev_a);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  a teacher-granted retry still opens'
                         ELSE 'FAIL  a teacher-granted retry still opens ('
                              || coalesce(r->>'error','?') || ')' END;

  -- ── 7 · With the switch OFF, nothing changes from before ────────────────
  UPDATE teacher_guest_access SET one_per_device = false WHERE assignment_id = v_a;
  UPDATE guest_submissions SET submitted_at = now(), retry_allowed = false
    WHERE assignment_id = v_a;
  r := teacher_guest_open(v_code, 'Sam3', '', '1.2.3.4', false, v_dev_a);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  with the switch OFF a new name is allowed, as before'
                         ELSE 'FAIL  with the switch OFF a new name is allowed, as before ('
                              || coalesce(r->>'error','?') || ')' END;

  -- ── 8 · The default is OFF for an assignment nobody configured ──────────
  SELECT count(*) INTO n FROM teacher_guest_access WHERE one_per_device IS NULL;
  RAISE NOTICE '%', CASE WHEN n = 0 THEN 'PASS  one_per_device is never null'
                         ELSE 'FAIL  one_per_device is never null' END;

  -- ── 9 · The CHECK refuses a device code that is not 32 hex ──────────────
  BEGIN
    UPDATE guest_submissions SET device_code = 'nope' WHERE assignment_id = v_a;
    say := 'FAIL  a malformed device code is rejected by the CHECK';
  EXCEPTION WHEN check_violation THEN
    say := 'PASS  a malformed device code is rejected by the CHECK';
  END;
  RAISE NOTICE '%', say;
END $$;
