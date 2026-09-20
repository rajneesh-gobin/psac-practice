-- ═══════════════════════════════════════════════════════════════════════════
--  Classroom calendar — 2026-09-20
--
--  A teacher writes dated items on ONE classroom's calendar: an exam, a
--  hand-in date, days they will be away, or any other event. Pupils read them
--  on the class page (/m/<CODE>) behind their ordinary PIN, alongside the
--  homework due dates and shared files that already carry dates of their own.
--
--  ⚠ Per classroom, never per teacher. A teacher with three classes has three
--    exam dates; an event row belongs to exactly one classroom.
--  ⚠ The pupil never reads the table. Like every other byte on the class page
--    it arrives through materials_library_open() (service_role only, reached
--    from the Worker), which now returns an 'events' key. The teacher's own
--    reads and writes go through RLS: same-row teacher_id, ownership of the
--    classroom, and the same approved-teacher test the manage RPCs apply.
--  ⚠ Idempotent: every statement guards itself, and the function is CREATE OR
--    REPLACE from the live body, so re-running is a no-op.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.teacher_class_events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid NOT NULL REFERENCES public.teacher_guest_classes(id) ON DELETE CASCADE,
  teacher_id   uuid NOT NULL,
  date         date NOT NULL,
  end_date     date,
  kind         text NOT NULL DEFAULT 'event',
  title        text NOT NULL,
  notes        text,
  created_at   timestamp with time zone NOT NULL DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'teacher_class_events_kind_chk') THEN
    ALTER TABLE public.teacher_class_events
      ADD CONSTRAINT teacher_class_events_kind_chk CHECK (kind IN ('exam', 'due', 'absent', 'event'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'teacher_class_events_title_len_chk') THEN
    ALTER TABLE public.teacher_class_events
      ADD CONSTRAINT teacher_class_events_title_len_chk CHECK (char_length(btrim(title)) BETWEEN 1 AND 120);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'teacher_class_events_notes_len_chk') THEN
    ALTER TABLE public.teacher_class_events
      ADD CONSTRAINT teacher_class_events_notes_len_chk CHECK (notes IS NULL OR char_length(notes) <= 500);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'teacher_class_events_span_chk') THEN
    ALTER TABLE public.teacher_class_events
      ADD CONSTRAINT teacher_class_events_span_chk CHECK (end_date IS NULL OR end_date >= date);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS teacher_class_events_class_date_idx
  ON public.teacher_class_events USING btree (classroom_id, date);

ALTER TABLE public.teacher_class_events ENABLE ROW LEVEL SECURITY;

-- ⚠ teacher_guest_classes carries grants for service_role ONLY (every read
--   of it goes through a SECURITY DEFINER RPC), so a policy cannot subquery it
--   directly - the first draft did, and every teacher write failed with
--   "permission denied for table teacher_guest_classes" on the throwaway
--   postgres. The ownership test therefore lives in a definer function.
CREATE OR REPLACE FUNCTION public.teacher_owns_guest_classroom(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.teacher_guest_classes c
                  WHERE c.id = p_classroom AND c.teacher_id = auth.uid() AND c.deleted_at IS NULL);
$function$;
REVOKE ALL ON FUNCTION public.teacher_owns_guest_classroom(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.teacher_owns_guest_classroom(uuid) TO authenticated, service_role;

-- ⚠ USING keeps a same-row predicate (teacher_id = auth.uid()) - a USING
--   clause is checked on INSERT too whenever the statement RETURNs, which
--   PostgREST does for every .insert().select(). The ownership lookup is on a
--   DIFFERENT table, so it is safe to gate an INSERT with (the families
--   lesson was a lookup of the row being inserted).
DROP POLICY IF EXISTS class_events_teacher ON public.teacher_class_events;
CREATE POLICY class_events_teacher ON public.teacher_class_events
  FOR ALL
  TO authenticated
  USING (
    teacher_id = auth.uid()
    AND public.teacher_guest_authorized()
    AND public.teacher_owns_guest_classroom(classroom_id)
  )
  WITH CHECK (
    teacher_id = auth.uid()
    AND public.teacher_guest_authorized()
    AND public.teacher_owns_guest_classroom(classroom_id)
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_class_events TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_class_events TO service_role;

-- ── materials_library_open(): the class page now carries 'events' ─────────
-- The body below is the LIVE one (read from pg_proc on 2026-09-20), with one
-- declaration, one query and one return key added. Nothing else changed.
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
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id',       e.id,
           'date',     e.date,
           'end_date', e.end_date,
           'kind',     e.kind,
           'title',    e.title,
           'notes',    e.notes
         ) ORDER BY e.date, e.created_at), '[]'::jsonb)
    INTO v_events
    FROM public.teacher_class_events e
   WHERE e.classroom_id = c.id
     AND coalesce(e.end_date, e.date) >= current_date - 60;

  RETURN jsonb_build_object('ok', true,
    'name', v_who,
    'classroom', jsonb_build_object('name', c.name, 'grade', c.grade),
    'materials', v_mats,
    'assignments', v_work,
    'events', v_events);
END;
$function$;
