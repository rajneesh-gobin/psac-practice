-- ═══════════════════════════════════════════════════════════════════════════
--  The classroom calendar — who can write it, and what the class page shows.
--
--  ⚠ The teacher's writes go through RLS on teacher_class_events, so those
--    run as `authenticated` with test.uid set. Running them as the superuser
--    would prove nothing about ownership.
--  ⚠ materials_library_open() is service_role-only and SECURITY DEFINER, so
--    it is exercised as the superuser: what is under test is the DECISION -
--    the events of THIS classroom, and no other, behind the PIN.
--
--  Every check prints PASS or FAIL with the name of the rule.
-- ═══════════════════════════════════════════════════════════════════════════

SET search_path = public, extensions;

-- ── Seed, as the superuser ────────────────────────────────────────────────
DO $$
DECLARE v_t uuid := '11111111-1111-1111-1111-111111111111';
        v_o uuid := '22222222-2222-2222-2222-222222222222';
        v_s uuid := '33333333-3333-3333-3333-333333333333';
        v_c1 uuid; v_c2 uuid; v_c3 uuid;
BEGIN
  INSERT INTO auth.users(id) VALUES (v_t), (v_o), (v_s);
  INSERT INTO profiles(id, full_name, role, teacher_status)
    VALUES (v_t, 'Miss T', 'teacher', 'approved'),
           (v_o, 'Mr O',   'teacher', 'approved'),
           (v_s, 'Ms S',   'teacher', 'suspended');

  INSERT INTO teacher_guest_classes(id, teacher_id, name, active, access_type, grade, materials_code)
    VALUES (gen_random_uuid(), v_t, 'Grade 5 Blue', true, 'shared', 5, 'CALBLUE001') RETURNING id INTO v_c1;
  UPDATE teacher_guest_classes
     SET class_pin_lookup = encode(hmac('4321', secret, 'sha256'), 'hex')
   WHERE id = v_c1;
  INSERT INTO teacher_guest_classes(id, teacher_id, name, active, access_type, grade, materials_code)
    VALUES (gen_random_uuid(), v_t, 'Grade 6 Red', true, 'shared', 6, 'CALRED0001') RETURNING id INTO v_c2;
  UPDATE teacher_guest_classes
     SET class_pin_lookup = encode(hmac('8765', secret, 'sha256'), 'hex')
   WHERE id = v_c2;

  INSERT INTO teacher_guest_classes(id, teacher_id, name, active, access_type, grade)
    VALUES (gen_random_uuid(), v_s, 'Grade 4 Gray', true, 'shared', 4) RETURNING id INTO v_c3;

  -- Worksheets: one current for Blue (with a file), one a month past its
  -- deadline for Blue (must not be sent), one current for Red.
  INSERT INTO physical_homework(teacher_id, classroom_id, title, subject, description, file_path, file_name, file_size, expires_at)
    VALUES (v_t, v_c1, 'Fractions sheet', 'maths', 'Q1-10', 'x/a.pdf', 'a.pdf', 1234, now() + interval '3 days'),
           (v_t, v_c1, 'Old sheet', 'maths', NULL, NULL, NULL, NULL, now() - interval '30 days'),
           (v_t, v_c2, 'Red sheet', 'english', NULL, NULL, NULL, NULL, now() + interval '1 day');

  CREATE TEMP TABLE _ids(k text primary key, v uuid);
  INSERT INTO _ids VALUES ('teacher', v_t), ('other', v_o), ('suspended', v_s), ('blue', v_c1), ('red', v_c2), ('gray', v_c3);
  -- The blocks below run as `authenticated`, which owns nothing.
  GRANT SELECT ON _ids TO authenticated;
END $$;

-- ── The owning teacher writes her own calendar ────────────────────────────
SET ROLE authenticated;
SET test.uid = '11111111-1111-1111-1111-111111111111';

DO $$
DECLARE v_blue uuid := (SELECT v FROM _ids WHERE k = 'blue');
        v_red  uuid := (SELECT v FROM _ids WHERE k = 'red');
        n integer; v_id uuid;
BEGIN
  INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
    VALUES (v_blue, '11111111-1111-1111-1111-111111111111', current_date + 7, 'exam', 'Maths test')
    RETURNING id INTO v_id;
  RAISE NOTICE '%', CASE WHEN v_id IS NOT NULL THEN 'PASS' ELSE 'FAIL' END || ': the owning teacher can add an exam to her classroom';

  INSERT INTO teacher_class_events(classroom_id, teacher_id, date, end_date, kind, title, notes)
    VALUES (v_blue, '11111111-1111-1111-1111-111111111111', current_date + 10, current_date + 12, 'absent', 'Away at a workshop', 'Mr K covers');
  INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
    VALUES (v_red, '11111111-1111-1111-1111-111111111111', current_date + 3, 'due', 'Project hand-in');
  INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
    VALUES (v_blue, '11111111-1111-1111-1111-111111111111', current_date - 90, 'event', 'Ancient history');

  SELECT count(*) INTO n FROM teacher_class_events WHERE classroom_id = v_blue;
  RAISE NOTICE '%', CASE WHEN n = 3 THEN 'PASS' ELSE 'FAIL' END || ': she reads back her own three Blue rows (' || n || ')';

  BEGIN
    INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
      VALUES (v_blue, '11111111-1111-1111-1111-111111111111', current_date, 'party', 'Nope');
    RAISE NOTICE 'FAIL: an unknown kind was accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'PASS: an unknown kind is refused by the CHECK';
  END;
  BEGIN
    INSERT INTO teacher_class_events(classroom_id, teacher_id, date, end_date, kind, title)
      VALUES (v_blue, '11111111-1111-1111-1111-111111111111', current_date + 5, current_date + 2, 'absent', 'Backwards');
    RAISE NOTICE 'FAIL: an end date before the start was accepted';
  EXCEPTION WHEN check_violation THEN
    RAISE NOTICE 'PASS: an end date before the start is refused';
  END;
  BEGIN
    INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
      VALUES (v_blue, '22222222-2222-2222-2222-222222222222', current_date, 'event', 'Forged teacher_id');
    RAISE NOTICE 'FAIL: a row claiming another teacher_id was accepted';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'PASS: a row claiming another teacher_id is refused by RLS';
  END;
END $$;

-- ── A stranger, and a suspended teacher, write nothing ────────────────────
SET test.uid = '22222222-2222-2222-2222-222222222222';
DO $$
DECLARE v_blue uuid := (SELECT v FROM _ids WHERE k = 'blue'); n integer;
BEGIN
  SELECT count(*) INTO n FROM teacher_class_events WHERE classroom_id = v_blue;
  RAISE NOTICE '%', CASE WHEN n = 0 THEN 'PASS' ELSE 'FAIL' END || ': another teacher reads none of Blue''s calendar (' || n || ')';
  BEGIN
    INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
      VALUES (v_blue, '22222222-2222-2222-2222-222222222222', current_date, 'exam', 'Not my class');
    RAISE NOTICE 'FAIL: another teacher wrote into Blue''s calendar';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'PASS: another teacher cannot write into Blue''s calendar';
  END;
  -- ⚠ A DELETE that matches no row raises nothing: count what it touched.
  WITH d AS (DELETE FROM teacher_class_events WHERE classroom_id = v_blue RETURNING id)
    SELECT count(*) INTO n FROM d;
  RAISE NOTICE '%', CASE WHEN n = 0 THEN 'PASS' ELSE 'FAIL' END || ': another teacher''s DELETE touches nothing (' || n || ')';
END $$;

-- Ms S OWNS the Gray classroom, so ownership alone would let her write; the
-- approved-teacher test is what must stop her.
SET test.uid = '33333333-3333-3333-3333-333333333333';
DO $$
DECLARE v_gray uuid := (SELECT v FROM _ids WHERE k = 'gray');
BEGIN
  BEGIN
    INSERT INTO teacher_class_events(classroom_id, teacher_id, date, kind, title)
      VALUES (v_gray, '33333333-3333-3333-3333-333333333333', current_date, 'exam', 'Suspended');
    RAISE NOTICE 'FAIL: a suspended teacher wrote to her own classroom''s calendar';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'PASS: a suspended teacher cannot write even to her own classroom';
  END;
END $$;

RESET ROLE;

-- ── The class page returns THIS classroom's events, and only those ────────
DO $$
DECLARE r jsonb; n integer; kinds text;
BEGIN
  PERFORM set_config('request.jwt.claim.role', 'service_role', true);

  r := materials_library_open('CALBLUE001', 'Sam', '4321', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN r->>'ok' = 'true' THEN 'PASS' ELSE 'FAIL' END || ': the shared PIN opens Blue';
  n := jsonb_array_length(coalesce(r->'events', '[]'::jsonb));
  RAISE NOTICE '%', CASE WHEN n = 2 THEN 'PASS' ELSE 'FAIL' END || ': Blue''s page carries its two current events, not the 90-day-old one and not Red''s (' || n || ')';
  SELECT string_agg(e->>'kind', ',' ORDER BY e->>'date') INTO kinds FROM jsonb_array_elements(r->'events') e;
  RAISE NOTICE '%', CASE WHEN kinds = 'exam,absent' THEN 'PASS' ELSE 'FAIL' END || ': in date order with kind, title, date, end_date and notes (' || coalesce(kinds, '') || ')';
  RAISE NOTICE '%', CASE WHEN (SELECT bool_and(e ? 'title' AND e ? 'date' AND e ? 'end_date' AND e ? 'notes') FROM jsonb_array_elements(r->'events') e) THEN 'PASS' ELSE 'FAIL' END || ': every event carries the fields the page renders';
  RAISE NOTICE '%', CASE WHEN r ? 'materials' AND r ? 'assignments' THEN 'PASS' ELSE 'FAIL' END || ': materials and assignments are still returned beside events';
  n := jsonb_array_length(coalesce(r->'worksheets', '[]'::jsonb));
  RAISE NOTICE '%', CASE WHEN n = 1 AND r->'worksheets'->0->>'title' = 'Fractions sheet' THEN 'PASS' ELSE 'FAIL' END || ': Blue''s page carries its one current worksheet, not the month-old one and not Red''s (' || n || ')';
  RAISE NOTICE '%', CASE WHEN (r->'worksheets'->0 ? 'expires_at') AND (r->'worksheets'->0 ? 'file_path') AND (r->'worksheets'->0 ? 'file_name') THEN 'PASS' ELSE 'FAIL' END || ': a worksheet carries its deadline and the storage key the Worker signs';

  r := materials_library_open('CALRED0001', 'Sam', '8765', '1.2.3.4', false);
  n := jsonb_array_length(coalesce(r->'events', '[]'::jsonb));
  RAISE NOTICE '%', CASE WHEN n = 1 AND r->'events'->0->>'kind' = 'due' THEN 'PASS' ELSE 'FAIL' END || ': Red''s page carries only its own hand-in date (' || n || ')';
  RAISE NOTICE '%', CASE WHEN jsonb_array_length(r->'worksheets') = 1 AND r->'worksheets'->0->>'title' = 'Red sheet' THEN 'PASS' ELSE 'FAIL' END || ': Red''s page carries only its own worksheet';

  r := materials_library_open('CALBLUE001', 'Sam', '0000', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN r->>'ok' = 'false' AND NOT (r ? 'events') THEN 'PASS' ELSE 'FAIL' END || ': a wrong PIN gets no events (the PIN is the gate, not the code)';

  r := materials_library_open('CALBLUE001', NULL, NULL, '1.2.3.4', true);
  RAISE NOTICE '%', CASE WHEN r->>'ok' = 'true' AND NOT (r ? 'events') AND NOT (r ? 'worksheets') THEN 'PASS' ELSE 'FAIL' END || ': the info call (before the PIN) carries no events and no worksheets either';
END $$;
