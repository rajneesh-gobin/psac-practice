-- ═══════════════════════════════════════════════════════════════════════════
--  The class hub — the PIN gate, and what a correct PIN gives away.
--
--  ⚠ teacher_classroom_materials_link() is called BY A TEACHER, so it is run
--    here as `authenticated` with test.uid set. Running it as the superuser
--    would make teacher_guest_authorized() the only thing under test and every
--    ownership assertion pass for a stranger.
--
--  ⚠ materials_library_open() is service_role-only and SECURITY DEFINER, so it
--    is exercised as the superuser: what is under test there is the DECISION —
--    the PIN gate, the throttle, and above all the BLAST RADIUS.
--
--  ⚠⚠ THE PIN IS THE GATE, NOT THE CODE. The first draft made the link open to
--    anyone holding it. Much of this file exists to keep that from coming back.
-- ═══════════════════════════════════════════════════════════════════════════

SET search_path = public, extensions;

-- ── Seed, as the superuser ────────────────────────────────────────────────
DO $$
DECLARE v_t uuid := '11111111-1111-1111-1111-111111111111';
        v_o uuid := '22222222-2222-2222-2222-222222222222';
        v_shared uuid; v_pupil uuid; v_m uuid; v_p1 uuid; v_p2 uuid; v_a uuid;
BEGIN
  INSERT INTO auth.users(id) VALUES (v_t), (v_o);
  INSERT INTO profiles(id, full_name, role, teacher_status)
    VALUES (v_t, 'Miss T', 'teacher', 'approved'), (v_o, 'Mr O', 'teacher', 'approved');

  -- A SHARED-PIN classroom: one class PIN, pupils tell themselves apart by name.
  INSERT INTO teacher_guest_classes(id, teacher_id, name, active, access_type, grade)
    VALUES (gen_random_uuid(), v_t, 'Grade 5 Blue', true, 'shared', 5) RETURNING id INTO v_shared;
  UPDATE teacher_guest_classes
     SET class_pin_lookup = encode(hmac('4321', secret, 'sha256'), 'hex')
   WHERE id = v_shared;

  -- A PER-PUPIL classroom: every child has their own PIN, which IS their identity.
  INSERT INTO teacher_guest_classes(id, teacher_id, name, active, access_type, grade)
    VALUES (gen_random_uuid(), v_t, 'Grade 6 Red', true, 'per_student', 6) RETURNING id INTO v_pupil;
  INSERT INTO teacher_guest_pupils(id, classroom_id, name, pin_lookup, pin_cipher)
    SELECT gen_random_uuid(), v_pupil, 'Ava',
           encode(hmac('1357', secret, 'sha256'), 'hex'),
           pgp_sym_encrypt('1357', secret) FROM teacher_guest_classes WHERE id = v_pupil
    RETURNING id INTO v_p1;
  INSERT INTO teacher_guest_pupils(id, classroom_id, name, pin_lookup, pin_cipher)
    SELECT gen_random_uuid(), v_pupil, 'Ben',
           encode(hmac('2468', secret, 'sha256'), 'hex'),
           pgp_sym_encrypt('2468', secret) FROM teacher_guest_classes WHERE id = v_pupil
    RETURNING id INTO v_p2;

  INSERT INTO learning_materials(id, teacher_id, title, subject, file_path, file_name, file_size)
    VALUES (gen_random_uuid(), v_t, 'Fractions worksheet', 'maths', 'a/b.pdf', 'b.pdf', 1000)
    RETURNING id INTO v_m;
  INSERT INTO classroom_materials(material_id, classroom_id) VALUES (v_m, v_shared);

  -- Homework for the per-pupil class: one for everybody…
  INSERT INTO guest_assignments(teacher_id, code, title, subject_pack_id, chapter_ids,
                                question_ids, pin_hash, status, expires_at, question_count)
    VALUES (v_t, 'HUBALL001', 'Fractions homework', 'grade5-maths', '["fractions"]'::jsonb,
            '["q1"]'::jsonb, 'x', 'active', now() + interval '3 days', 10)
    RETURNING id INTO v_a;
  INSERT INTO teacher_guest_access(assignment_id, mode, classroom_id)
    VALUES (v_a, 'classroom_pin', v_pupil);

  -- …one rostered to Ben only…
  INSERT INTO guest_assignments(teacher_id, code, title, subject_pack_id, chapter_ids,
                                question_ids, pin_hash, status, expires_at, question_count)
    VALUES (v_t, 'HUBBEN001', 'Extra practice for Ben', 'grade5-maths', '["fractions"]'::jsonb,
            '["q1"]'::jsonb, 'x', 'active', now() + interval '3 days', 5)
    RETURNING id INTO v_a;
  INSERT INTO teacher_guest_access(assignment_id, mode, classroom_id)
    VALUES (v_a, 'classroom_pin', v_pupil);
  INSERT INTO teacher_guest_roster(assignment_id, pupil_id) VALUES (v_a, v_p2);

  -- …and one that has EXPIRED, which must never be offered.
  INSERT INTO guest_assignments(teacher_id, code, title, subject_pack_id, chapter_ids,
                                question_ids, pin_hash, status, expires_at, question_count)
    VALUES (v_t, 'HUBOLD001', 'Last term', 'grade5-maths', '["fractions"]'::jsonb,
            '["q1"]'::jsonb, 'x', 'active', now() - interval '1 day', 10)
    RETURNING id INTO v_a;
  INSERT INTO teacher_guest_access(assignment_id, mode, classroom_id)
    VALUES (v_a, 'classroom_pin', v_pupil);

  CREATE TEMP TABLE _ids(k text primary key, v uuid);
  INSERT INTO _ids VALUES ('teacher', v_t), ('other', v_o),
                          ('shared', v_shared), ('pupilclass', v_pupil),
                          ('ava', v_p1), ('ben', v_p2);
END $$;

-- ── The teacher's own actions ─────────────────────────────────────────────
DO $$
DECLARE v_c uuid := (SELECT v FROM _ids WHERE k = 'shared');
        r jsonb; r2 jsonb; code1 text; say text;
BEGIN
  PERFORM set_config('test.uid', (SELECT v FROM _ids WHERE k = 'teacher')::text, true);

  -- ⚠⚠ A READ must not create a public address.
  r := teacher_classroom_materials_link(v_c, 'get');
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean AND r->>'code' IS NULL
                         THEN 'PASS  get on a classroom with no link returns null and mints NOTHING'
                         ELSE 'FAIL  get on a classroom with no link returns null and mints NOTHING' END;
  RAISE NOTICE '%', CASE WHEN (SELECT materials_code FROM teacher_guest_classes WHERE id = v_c) IS NULL
                         THEN 'PASS  …confirmed against the row itself'
                         ELSE 'FAIL  …confirmed against the row itself' END;
  -- The teacher's panel needs this to tell pupils WHICH PIN to bring.
  RAISE NOTICE '%', CASE WHEN r->>'access_type' = 'shared'
                         THEN 'PASS  …and it reports the classroom''s access type'
                         ELSE 'FAIL  …and it reports the classroom''s access type' END;

  r := teacher_classroom_materials_link(v_c, 'create');
  code1 := r->>'code';
  RAISE NOTICE '%', CASE WHEN code1 ~ '^[A-Z0-9]{10}$'
                         THEN 'PASS  create mints a 10-character code'
                         ELSE 'FAIL  create mints a 10-character code (' || coalesce(code1,'null') || ')' END;
  RAISE NOTICE '%', CASE WHEN code1 !~ '[O01IL]'
                         THEN 'PASS  …with no confusable characters in it'
                         ELSE 'FAIL  …with no confusable characters in it (' || code1 || ')' END;

  r2 := teacher_classroom_materials_link(v_c, 'create');
  RAISE NOTICE '%', CASE WHEN r2->>'code' = code1 AND (r2->>'created')::boolean = false
                         THEN 'PASS  create is idempotent — a second tap keeps the same link'
                         ELSE 'FAIL  create is idempotent — a second tap keeps the same link' END;

  r2 := teacher_classroom_materials_link(v_c, 'rotate');
  RAISE NOTICE '%', CASE WHEN r2->>'code' <> code1 AND (r2->>'replaced')::boolean
                         THEN 'PASS  rotate replaces it, and says that it did'
                         ELSE 'FAIL  rotate replaces it, and says that it did' END;

  BEGIN
    PERFORM teacher_classroom_materials_link(v_c, 'nonsense');
    say := 'FAIL  an unknown action is refused';
  EXCEPTION WHEN OTHERS THEN
    say := 'PASS  an unknown action is refused';
  END;
  RAISE NOTICE '%', say;

  PERFORM set_config('test.uid', (SELECT v FROM _ids WHERE k = 'other')::text, true);
  BEGIN
    PERFORM teacher_classroom_materials_link(v_c, 'get');
    say := 'FAIL  another teacher cannot read this classroom''s link';
  EXCEPTION WHEN OTHERS THEN
    say := 'PASS  another teacher cannot read this classroom''s link';
  END;
  RAISE NOTICE '%', say;

  -- Give the per-pupil class a code too, for the blocks below.
  PERFORM set_config('test.uid', (SELECT v FROM _ids WHERE k = 'teacher')::text, true);
  PERFORM teacher_classroom_materials_link((SELECT v FROM _ids WHERE k = 'pupilclass'), 'create');
END $$;

-- ── THE GATE ──────────────────────────────────────────────────────────────
DO $$
DECLARE v_s uuid := (SELECT v FROM _ids WHERE k = 'shared');
        v_p uuid := (SELECT v FROM _ids WHERE k = 'pupilclass');
        s_code text; p_code text; r jsonb; body text; i integer;
BEGIN
  PERFORM set_config('test.uid', '', true);
  SELECT materials_code INTO s_code FROM teacher_guest_classes WHERE id = v_s;
  SELECT materials_code INTO p_code FROM teacher_guest_classes WHERE id = v_p;

  -- ── info: which form to draw, and nothing else ──────────────────────────
  r := materials_library_open(s_code, '', '', '1.2.3.4', true);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean AND r->>'access_mode' = 'shared_pin'
                         THEN 'PASS  info names the shared-PIN gate'
                         ELSE 'FAIL  info names the shared-PIN gate' END;
  RAISE NOTICE '%', CASE WHEN materials_library_open(p_code, '', '', '1.2.3.4', true)->>'access_mode' = 'pupil_pin'
                         THEN 'PASS  …and the per-pupil gate'
                         ELSE 'FAIL  …and the per-pupil gate' END;
  -- ⚠⚠ THE WHOLE POINT. info must carry nothing from behind the gate.
  body := r::text;
  RAISE NOTICE '%', CASE WHEN body NOT LIKE '%materials%' AND body NOT LIKE '%assignments%'
                         THEN 'PASS  info carries NO materials and NO homework'
                         ELSE 'FAIL  info carries NO materials and NO homework' END;

  -- ── No PIN, or the wrong one, gets nothing ─────────────────────────────
  r := materials_library_open(s_code, 'Sam', '', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN r->>'error' = 'bad_pin'
                         THEN 'PASS  the code ALONE opens nothing' ELSE 'FAIL  the code ALONE opens nothing' END;
  r := materials_library_open(s_code, 'Sam', '0000', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN r->>'error' = 'bad_pin'
                         THEN 'PASS  a wrong class PIN is refused' ELSE 'FAIL  a wrong class PIN is refused' END;
  RAISE NOTICE '%', CASE WHEN (r->>'attemptsLeft')::int < 30
                         THEN 'PASS  …and a wrong PIN counts against the throttle'
                         ELSE 'FAIL  …and a wrong PIN counts against the throttle' END;

  -- ── The right PIN opens it ─────────────────────────────────────────────
  r := materials_library_open(s_code, 'Sam', '4321', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean
                         THEN 'PASS  the class PIN plus a name opens the hub'
                         ELSE 'FAIL  the class PIN plus a name opens the hub (' || coalesce(r->>'error','?') || ')' END;
  RAISE NOTICE '%', CASE WHEN jsonb_array_length(r->'materials') = 1
                         THEN 'PASS  …with the material on it' ELSE 'FAIL  …with the material on it' END;
  RAISE NOTICE '%', CASE WHEN r->>'name' = 'Sam'
                         THEN 'PASS  …greeting the name the child typed' ELSE 'FAIL  …greeting the name the child typed' END;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '4321', '1.2.3.4', false)->>'error' = 'name_required'
                         THEN 'PASS  a shared class still insists on a name'
                         ELSE 'FAIL  a shared class still insists on a name' END;

  -- ⚠ A correct PIN CLEARS the counter, or a class of thirty walks it up all day.
  RAISE NOTICE '%', CASE WHEN (SELECT attempts FROM teacher_guest_class_throttle
                                WHERE classroom_id = v_s
                                  AND source = encode(digest('1.2.3.4','sha256'),'hex')) = 0
                         THEN 'PASS  a correct PIN resets the throttle'
                         ELSE 'FAIL  a correct PIN resets the throttle' END;

  -- ── Per-pupil: the PIN IS the identity ─────────────────────────────────
  r := materials_library_open(p_code, '', '1357', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN (r->>'ok')::boolean AND r->>'name' = 'Ava'
                         THEN 'PASS  a pupil PIN opens the hub as that pupil, with no name typed'
                         ELSE 'FAIL  a pupil PIN opens the hub as that pupil, with no name typed' END;
  -- ⚠ THE ROSTER. Work set for Ben must not appear on Ava's hub.
  RAISE NOTICE '%', CASE WHEN r::text NOT LIKE '%HUBBEN001%'
                         THEN 'PASS  work rostered to another pupil is NOT listed'
                         ELSE 'FAIL  work rostered to another pupil is NOT listed' END;
  RAISE NOTICE '%', CASE WHEN r::text LIKE '%HUBALL001%'
                         THEN 'PASS  work set for the whole class IS listed'
                         ELSE 'FAIL  work set for the whole class IS listed' END;
  RAISE NOTICE '%', CASE WHEN r::text NOT LIKE '%HUBOLD001%'
                         THEN 'PASS  expired work is NOT listed' ELSE 'FAIL  expired work is NOT listed' END;

  r := materials_library_open(p_code, '', '2468', '1.2.3.4', false);
  RAISE NOTICE '%', CASE WHEN r::text LIKE '%HUBBEN001%'
                         THEN 'PASS  …and Ben DOES see the work rostered to him'
                         ELSE 'FAIL  …and Ben DOES see the work rostered to him' END;

  -- ⚠ THE BLAST RADIUS. Materials, homework codes, this child's own done-flag.
  body := r::text;
  RAISE NOTICE '%', CASE WHEN body NOT LIKE '%secret%' AND body NOT LIKE '%pin_lookup%'
                              AND body NOT LIKE '%teacher_id%'
                         THEN 'PASS  no secret, PIN lookup or teacher id in the payload'
                         ELSE 'FAIL  no secret, PIN lookup or teacher id in the payload' END;
  RAISE NOTICE '%', CASE WHEN body NOT LIKE '%question_ids%' AND body NOT LIKE '%"score"%'
                         THEN 'PASS  no question ids and no marks'
                         ELSE 'FAIL  no question ids and no marks' END;
  RAISE NOTICE '%', CASE WHEN body NOT LIKE '%Ava%'
                         THEN 'PASS  no other pupil is named' ELSE 'FAIL  no other pupil is named' END;

  -- ── The throttle actually stops ────────────────────────────────────────
  FOR i IN 1..31 LOOP
    PERFORM materials_library_open(s_code, 'Sam', '0000', '9.9.9.9', false);
  END LOOP;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, 'Sam', '4321', '9.9.9.9', false)->>'error' = 'locked'
                         THEN 'PASS  repeated wrong PINs lock that source out'
                         ELSE 'FAIL  repeated wrong PINs lock that source out' END;
  -- ⚠ Per source, so one guesser cannot lock out a whole school behind one NAT.
  RAISE NOTICE '%', CASE WHEN (materials_library_open(s_code, 'Sam', '4321', '1.2.3.4', false)->>'ok')::boolean
                         THEN 'PASS  …and a different source is unaffected'
                         ELSE 'FAIL  …and a different source is unaffected' END;

  -- ── One not_found for every kind of nothing ────────────────────────────
  RAISE NOTICE '%', CASE WHEN materials_library_open('ZZZZZZZZZZ', '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  an unknown code answers not_found' ELSE 'FAIL  an unknown code answers not_found' END;
  RAISE NOTICE '%', CASE WHEN materials_library_open('short', '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  a malformed code answers the SAME not_found' ELSE 'FAIL  a malformed code answers the SAME not_found' END;
  RAISE NOTICE '%', CASE WHEN materials_library_open(NULL, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  a null code answers the SAME not_found' ELSE 'FAIL  a null code answers the SAME not_found' END;

  UPDATE teacher_guest_classes SET active = false WHERE id = v_s;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  an archived classroom answers the SAME not_found' ELSE 'FAIL  an archived classroom answers the SAME not_found' END;
  UPDATE teacher_guest_classes SET active = true WHERE id = v_s;

  -- ⚠ profiles.disabled is guarded by a BEFORE UPDATE trigger that SILENTLY
  --   REVERTS it. Without psac.priv_write the row is untouched and this would
  --   fail against a function behaving perfectly — measured, not guessed.
  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE profiles SET disabled = true WHERE id = (SELECT v FROM _ids WHERE k = 'teacher');
  RAISE NOTICE '%', CASE WHEN (SELECT disabled FROM profiles WHERE id = (SELECT v FROM _ids WHERE k = 'teacher'))
                         THEN 'PASS  …and the test actually managed to disable them'
                         ELSE 'FAIL  …and the test actually managed to disable them' END;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  a disabled teacher takes the hub with them' ELSE 'FAIL  a disabled teacher takes the hub with them' END;
  UPDATE profiles SET disabled = false WHERE id = (SELECT v FROM _ids WHERE k = 'teacher');
  PERFORM set_config('psac.priv_write', '', true);

  -- teacher_status is deliberately NOT trigger-guarded.
  UPDATE profiles SET teacher_status = 'pending' WHERE id = (SELECT v FROM _ids WHERE k = 'teacher');
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  an unapproved teacher''s hub is closed too' ELSE 'FAIL  an unapproved teacher''s hub is closed too' END;
  UPDATE profiles SET teacher_status = 'approved' WHERE id = (SELECT v FROM _ids WHERE k = 'teacher');

  UPDATE teacher_guest_classes SET deleted_at = now() WHERE id = v_s;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  a deleted classroom answers the SAME not_found' ELSE 'FAIL  a deleted classroom answers the SAME not_found' END;
  UPDATE teacher_guest_classes SET deleted_at = NULL WHERE id = v_s;

  UPDATE teacher_guest_classes SET materials_code = NULL WHERE id = v_s;
  RAISE NOTICE '%', CASE WHEN materials_library_open(s_code, '', '', '', true)->>'error' = 'not_found'
                         THEN 'PASS  a switched-off link stops working' ELSE 'FAIL  a switched-off link stops working' END;
END $$;
