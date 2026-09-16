-- ─────────────────────────────────────────────────────────────────────────
-- Class hub: show a pupil their OWN past marks (per-pupil PIN only)
-- 2026-09-16
--
-- ⚠ THIS DELIBERATELY NARROWS A DELIBERATE OMISSION. materials_library_open()
--   has always withheld the score, and its own comment gives the reason:
--   "a mark belongs on the teacher screen until they have looked at it, and
--   children comparing marks on a shared tablet is exactly what this must not
--   enable." Both halves were right, and both are addressed rather than waved
--   away:
--     • SHARED PIN / open link -> score still absent. v_key is a typed name
--       anyone in the room can type, so a mark shown there is a mark shown to
--       whoever typed it. Unchanged.
--     • PER-PUPIL PIN -> v_key is that pupil row id and it takes their own
--       PIN to reach. A child sees only their own.
--   ⚠ And nothing NEW is disclosed either way: guest.js already shows this
--     exact percentage the moment the child submits. This shows the same
--     number to the same child later, behind a credential they already hold.
--
-- ⚠ Still NO answers and NO question_ids: which questions were wrong stays
--   with the teacher. Only the mark the child already saw comes back.
-- ⚠ Latest attempt only (ORDER BY submitted_at DESC LIMIT 1) - a retry should
--   read as the result that stands, not a history a child can be judged on.
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.materials_library_open(p_code text, p_name text DEFAULT ''::text, p_pin text DEFAULT ''::text, p_ip text DEFAULT ''::text, p_info boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  c        public.teacher_guest_classes%ROWTYPE;
  pupil    public.teacher_guest_pupils%ROWTYPE;
  t        public.teacher_guest_class_throttle%ROWTYPE;
  v_src    text;
  v_who    text;
  v_key    text;
  v_mats   jsonb;
  v_work   jsonb;
BEGIN
  IF p_code IS NULL OR upper(btrim(p_code)) !~ '^[A-Z0-9]{10}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  SELECT * INTO c FROM public.teacher_guest_classes
    WHERE materials_code = upper(btrim(p_code)) AND deleted_at IS NULL;
  -- ⚠ ONE answer for "no such code", "switched off", "class archived" and
  --   "class deleted". Telling them apart would let anyone with a code
  --   discover that a classroom exists and when it was retired.
  IF NOT FOUND OR NOT c.active THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- The same teacher test teacher_guest_open() applies before letting a child
  -- into an assignment. A disabled, expired or unapproved teacher's shelf goes
  -- away with the rest of their work, rather than outliving it.
  IF NOT EXISTS (SELECT 1 FROM public.profiles
                  WHERE id = c.teacher_id AND NOT coalesce(disabled, false)
                    AND (expires_at IS NULL OR expires_at > now())
                    AND (role = 'admin' OR (role = 'teacher' AND teacher_status = 'approved'))) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- ── The gate description. No PIN needed to learn WHICH form to draw, and
  --    nothing behind the gate is returned here.
  IF p_info THEN
    RETURN jsonb_build_object('ok', true, 'access_mode',
      CASE WHEN c.access_type = 'shared' THEN 'shared_pin' ELSE 'pupil_pin' END,
      'classroom', jsonb_build_object('name', c.name, 'grade', c.grade));
  END IF;

  -- ── Throttle. ⚠ Only FAILURES are counted, below: a child reopening this
  --    page all afternoon must never lock themselves out of their own hub.
  DELETE FROM public.teacher_guest_class_throttle
    WHERE classroom_id = c.id AND since < now() - interval '1 day';
  v_src := encode(digest(coalesce(p_ip, ''), 'sha256'), 'hex');
  INSERT INTO public.teacher_guest_class_throttle(classroom_id, source)
    VALUES (c.id, v_src) ON CONFLICT DO NOTHING;
  SELECT * INTO t FROM public.teacher_guest_class_throttle
    WHERE classroom_id = c.id AND source = v_src FOR UPDATE;
  IF t.since < now() - interval '15 minutes' THEN
    UPDATE public.teacher_guest_class_throttle SET attempts = 0, since = now()
      WHERE classroom_id = c.id AND source = v_src;
    t.attempts := 0;
  END IF;
  -- ⚠ A whole class shares one school NAT, so this ceiling counts WRONG PINs
  --   from an entire classroom. 30 is high enough not to punish a class and
  --   low enough that 10,000 combinations are out of reach.
  IF t.attempts >= 30 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked');
  END IF;

  IF c.access_type = 'shared' THEN
    IF c.class_pin_lookup IS NULL OR p_pin !~ '^\d{4}$'
       OR encode(hmac(p_pin, c.secret, 'sha256'), 'hex') <> c.class_pin_lookup THEN
      UPDATE public.teacher_guest_class_throttle SET attempts = t.attempts + 1
        WHERE classroom_id = c.id AND source = v_src;
      RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
        'attemptsLeft', greatest(0, 30 - t.attempts - 1));
    END IF;
    v_who := btrim(p_name);
    IF v_who IS NULL OR length(v_who) NOT BETWEEN 1 AND 40 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'name_required');
    END IF;
    -- ⚠ Matches teacher_guest_open()'s shared_pin key exactly, or "done" would
    --   never line up with the submission the child actually made.
    v_key := 'shared:' || lower(v_who);
  ELSE
    SELECT s.* INTO pupil FROM public.teacher_guest_pupils s
      WHERE s.classroom_id = c.id AND s.active
        AND p_pin ~ '^\d{4}$'
        AND s.pin_lookup = encode(hmac(p_pin, c.secret, 'sha256'), 'hex');
    IF NOT FOUND THEN
      UPDATE public.teacher_guest_class_throttle SET attempts = t.attempts + 1
        WHERE classroom_id = c.id AND source = v_src;
      RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
        'attemptsLeft', greatest(0, 30 - t.attempts - 1));
    END IF;
    v_who := pupil.name;
    v_key := pupil.id::text;
  END IF;

  -- ⚠ A correct PIN CLEARS the counter. Otherwise a class of thirty signing in
  --   normally, with the ordinary handful of typos between them, walks the
  --   count up all day and locks the room out by the afternoon.
  UPDATE public.teacher_guest_class_throttle SET attempts = 0, since = now()
    WHERE classroom_id = c.id AND source = v_src;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id',                  m.id,
           'title',               m.title,
           'description',         m.description,
           'subject',             m.subject,
           'grade',               m.grade,
           'file_path',           m.file_path,
           'file_name',           m.file_name,
           'file_size',           m.file_size,
           'link_expiry_seconds', m.link_expiry_seconds,
           'source_type',         m.source_type,
           'external_url',        m.external_url,
           'created_at',          m.created_at,
           'shared_at',           coalesce(cm.assigned_at, m.created_at)
         ) ORDER BY coalesce(cm.assigned_at, m.created_at) DESC), '[]'::jsonb)
    INTO v_mats
    FROM public.classroom_materials cm
    JOIN public.learning_materials m ON m.id = cm.material_id
   WHERE cm.classroom_id = c.id;

  -- ── The homework set for this class ─────────────────────────────────────
  -- ⚠ NO question_ids, NO answers, and NO other pupil. `done` is THIS child's
  --   own row, and the SCORE is deliberately absent: a mark belongs on the
  --   teacher's screen until they have looked at it, and children comparing
  --   marks on a shared tablet is exactly what this must not enable.
  -- ⚠ A per-pupil classroom also honours the ROSTER: work set for six named
  --   pupils must not appear on the other twenty-four's hub.
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'code',           a.code,
           'title',          a.title,
           'subject',        a.subject_pack_id,
           'question_count', a.question_count,
           'duration_mins',  a.duration_mins,
           'due_at',         a.due_at,
           'expires_at',     a.expires_at,
           'done',           EXISTS (SELECT 1 FROM public.guest_submissions g
                                      WHERE g.assignment_id = a.id AND g.name_key = v_key
                                        AND g.submitted_at IS NOT NULL),
           -- ⚠ THE CHILD'S OWN MARK, and ONLY on a per-pupil PIN classroom.
           --   The comment above says the score is deliberately absent because
           --   'children comparing marks on a shared tablet is exactly what this
           --   must not enable'. That reasoning holds ENTIRELY for a shared PIN,
           --   where v_key is a typed name anyone in the room can type. It does
           --   not hold for a per-pupil PIN: v_key is that pupil's row id, and
           --   seeing it requires their own PIN.
           --   ⚠ And it discloses NOTHING NEW: guest.js already shows this exact
           --   percentage the moment the child submits. This is the same number,
           --   shown again to the same child, behind a credential.
           --   ⚠ Still NO answers, NO question_ids, and NO other pupil's mark.
           'score',          CASE WHEN c.access_type <> 'shared' THEN (
                               SELECT g.score FROM public.guest_submissions g
                                WHERE g.assignment_id = a.id AND g.name_key = v_key
                                  AND g.submitted_at IS NOT NULL
                                ORDER BY g.submitted_at DESC LIMIT 1) END,
           'total',          CASE WHEN c.access_type <> 'shared' THEN (
                               SELECT g.total FROM public.guest_submissions g
                                WHERE g.assignment_id = a.id AND g.name_key = v_key
                                  AND g.submitted_at IS NOT NULL
                                ORDER BY g.submitted_at DESC LIMIT 1) END,
           'pct',            CASE WHEN c.access_type <> 'shared' THEN (
                               SELECT g.pct FROM public.guest_submissions g
                                WHERE g.assignment_id = a.id AND g.name_key = v_key
                                  AND g.submitted_at IS NOT NULL
                                ORDER BY g.submitted_at DESC LIMIT 1) END,
           'submitted_at',   CASE WHEN c.access_type <> 'shared' THEN (
                               SELECT g.submitted_at FROM public.guest_submissions g
                                WHERE g.assignment_id = a.id AND g.name_key = v_key
                                  AND g.submitted_at IS NOT NULL
                                ORDER BY g.submitted_at DESC LIMIT 1) END
         ) ORDER BY coalesce(a.due_at, a.expires_at)), '[]'::jsonb)
    INTO v_work
    FROM public.guest_assignments a
    JOIN public.teacher_guest_access ac ON ac.assignment_id = a.id
   WHERE ac.classroom_id = c.id
     AND a.deleted_at IS NULL
     AND a.status = 'active'
     AND a.expires_at > now()
     AND (c.access_type = 'shared'
          OR NOT EXISTS (SELECT 1 FROM public.teacher_guest_roster r WHERE r.assignment_id = a.id)
          OR EXISTS (SELECT 1 FROM public.teacher_guest_roster r
                      WHERE r.assignment_id = a.id AND r.pupil_id::text = v_key));

  RETURN jsonb_build_object('ok', true,
    'name', v_who,
    'classroom', jsonb_build_object('name', c.name, 'grade', c.grade),
    'materials', v_mats,
    'assignments', v_work);
END;
$function$

