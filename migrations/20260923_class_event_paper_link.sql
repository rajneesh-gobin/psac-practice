-- ═══════════════════════════════════════════════════════════════════════════
--  Let the class page open the paper a dated entry is about.
--
--  ⚠ THE ROW WAS ALREADY RIGHT; THE READ WAS NOT. 20260923_assign_a_paper_class.sql
--    added teacher_class_events.library_document_id and Library.confirmAssign()
--    writes it. Both calendars rendered the entry correctly as a title and a
--    date, and neither could link to the file, because neither READ the column.
--
--  ⚠ THIS IS THE WHOLE FUNCTION, REGENERATED FROM pg_get_functiondef AND
--    PATCHED IN ONE PLACE. It is not hand-written from the schema dump, and it
--    is not a wrapper around a renamed original — pupil identity, PIN checking,
--    material signing and homework scoping are all unchanged and none of them
--    was retyped.
-- ═══════════════════════════════════════════════════════════════════════════

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
  v_events jsonb;
  v_sheets jsonb;
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

  -- ── The class calendar ──────────────────────────────────────────────────
  -- Exams, hand-in dates, days the teacher is away, and anything else the
  -- teacher wrote on this classroom's calendar. Read-only for the pupil; the
  -- teacher writes through RLS on teacher_class_events. The last 60 days are
  -- kept so a child can still see what they missed; nothing older is sent.
  -- ⚠ A jsonb_build_object NEVER PICKS UP A NEW COLUMN FOR FREE, and that is
  --   why a dated paper was not tappable on the class page: the column existed
  --   on the table and was written correctly, this function simply never
  --   mentioned it, and the omission is invisible — nothing errors, the field
  --   is just absent.
  -- ⚠ AN ID AND A FILENAME, NEVER A URL. The page builds the link the same way
  --   every other surface does (seeded → /library/<filename>, contributed → the
  --   worker, which re-checks the document is still published). A URL baked in
  --   here would be a second definition of where a document lives.
  -- ⚠ The LEFT JOIN is filtered to status='published', so an unpublished paper
  --   leaves the date on the calendar with nothing to open rather than handing
  --   out a link to a withdrawn file.
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id',       e.id,
           'date',     e.date,
           'end_date', e.end_date,
           'kind',     e.kind,
           'title',    e.title,
           'notes',    e.notes,
           'library_document_id', e.library_document_id,
           'doc_filename', d.filename,
           'doc_storage',  d.storage
         ) ORDER BY e.date, e.created_at), '[]'::jsonb)
    INTO v_events
    FROM public.teacher_class_events e
    LEFT JOIN public.library_documents d
           ON d.id = e.library_document_id AND d.status = 'published'
   WHERE e.classroom_id = c.id
     AND coalesce(e.end_date, e.date) >= current_date - 60;

  -- ── Worksheets set for this class ──────────────────────────────────────
  -- physical_homework: a paper task the teacher uploaded (or just described)
  -- with a deadline. Kept a fortnight past its deadline so a child can still
  -- find one they missed; nothing older is sent. file_path is a storage key
  -- for the Worker to sign per visit - it never reaches the browser.
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id',          w.id,
           'title',       w.title,
           'subject',     w.subject,
           'description', w.description,
           'file_path',   w.file_path,
           'file_name',   w.file_name,
           'file_size',   w.file_size,
           'expires_at',  w.expires_at,
           'created_at',  w.created_at
         ) ORDER BY w.expires_at), '[]'::jsonb)
    INTO v_sheets
    FROM public.physical_homework w
   WHERE w.classroom_id = c.id
     AND w.expires_at > now() - interval '14 days';

  RETURN jsonb_build_object('ok', true,
    'name', v_who,
    'classroom', jsonb_build_object('name', c.name, 'grade', c.grade),
    'materials', v_mats,
    'assignments', v_work,
    'events', v_events,
    'worksheets', v_sheets);
END;
$function$;


-- ⚠ THE REAL SIGNATURE IS FIVE ARGUMENTS, not two. A GRANT naming the wrong
-- one does not error loudly here — it fails with "function does not exist",
-- and a CREATE OR REPLACE that silently created a SECOND overload would leave
-- the class page calling the old body forever.
GRANT EXECUTE ON FUNCTION public.materials_library_open(text, text, text, text, boolean) TO anon, authenticated;
