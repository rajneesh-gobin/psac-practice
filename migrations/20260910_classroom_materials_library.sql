-- ═══════════════════════════════════════════════════════════════════════════
--  The class hub — one permanent, PIN-GATED link to a classroom's shelf.
--
--  WHY: sharing a material today produces a SIGNED STORAGE URL for exactly one
--  file (teacher_classroom_detail.shareMaterial → createSignedUrl), and
--  learning_materials.link_expiry_seconds defaults to 3600 — so the WhatsApp
--  message a teacher sends is one file that stops working in an hour, and a
--  second file means a second message. Pupils accumulate a chat full of dead
--  links. This gives the class ONE address that never changes and always shows
--  everything: the materials AND the homework the teacher has set, with the
--  signed URLs minted fresh on every visit.
--
--  ⚠⚠ THE PIN IS THE GATE, NOT THE CODE. The first draft of this migration made
--    the link open to anyone who had it, on the grounds that the existing share
--    already did that. That was wrong twice over: a classroom's whole shelf is
--    not one file, and this link also lists the homework codes for the class.
--    A pupil now proves who they are the SAME way they already do for
--    homework — their own 4-digit PIN in a per-pupil classroom, the shared
--    class PIN plus a name in a shared one. The code says WHICH class; the PIN
--    says you belong to it.
--
--  ⚠ THROTTLED, because a 4-digit PIN with unlimited guesses is not a PIN.
--    teacher_guest_throttle is keyed on assignment_id and cannot be reused, so
--    this carries its own table keyed on the classroom. Only FAILURES count —
--    a child reopening the page all afternoon must never lock themselves out.
--
--  ⚠ Materials and homework only. The hub never reveals other pupils, their
--    marks, the class PIN or anybody's answers — a forwarded link plus a
--    guessed PIN must not hand over the class register.
--
--  ⚠ Written from the LIVE definitions (pg_get_functiondef). After applying,
--    REGENERATE:  SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js
--
--  Idempotent. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. The classroom's hub code ─────────────────────────────────────────────
-- NULL means "no hub link", which is the state every existing classroom starts
-- in and the state `off` returns it to. A boolean as well as a code would let
-- the two disagree; one nullable column cannot.
ALTER TABLE public.teacher_guest_classes
  ADD COLUMN IF NOT EXISTS materials_code text;

COMMENT ON COLUMN public.teacher_guest_classes.materials_code IS
  'Public code for this classroom''s permanent PIN-gated hub at /m/<CODE>, or NULL when the teacher has not switched one on. Rotating it kills every link already shared. The code names the class; the pupil''s PIN is what opens it.';

DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.teacher_guest_classes'::regclass
      AND conname  = 'teacher_guest_classes_materials_code_ck'
  ) THEN
    ALTER TABLE public.teacher_guest_classes
      ADD CONSTRAINT teacher_guest_classes_materials_code_ck
      CHECK (materials_code IS NULL OR materials_code ~ '^[A-Z0-9]{10}$');
  END IF;
END
$do$;

-- Partial, so the many NULLs do not collide with each other.
CREATE UNIQUE INDEX IF NOT EXISTS teacher_guest_classes_materials_code_uq
  ON public.teacher_guest_classes (materials_code)
  WHERE materials_code IS NOT NULL;

-- ⚠ No column GRANT needed: teacher_guest_classes has relacl for postgres and
--   service_role only, RLS on and zero policies, so every read and write goes
--   through a SECURITY DEFINER function. Measured, not assumed.

-- ── 2. PIN throttle, keyed on the CLASSROOM ─────────────────────────────────
-- ⚠ teacher_guest_throttle keys on assignment_id NOT NULL and is cleaned per
--   assignment, so it cannot carry this. A separate small table is cheaper than
--   making that column nullable and auditing every reader of it.
CREATE TABLE IF NOT EXISTS public.teacher_guest_class_throttle (
  classroom_id uuid NOT NULL,
  source       text NOT NULL,
  attempts     integer NOT NULL DEFAULT 0,
  since        timestamp with time zone NOT NULL DEFAULT now()
);

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_class_throttle_pkey'
                    AND conrelid = 'public.teacher_guest_class_throttle'::regclass) THEN
    ALTER TABLE public.teacher_guest_class_throttle
      ADD CONSTRAINT teacher_guest_class_throttle_pkey PRIMARY KEY (classroom_id, source);
  END IF;
END
$do$;

ALTER TABLE public.teacher_guest_class_throttle ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.teacher_guest_class_throttle FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_guest_class_throttle TO service_role;

-- ── 3. The teacher switches the hub on, rotates it, switches it off ─────────
-- A dedicated function rather than another branch of teacher_guest_manage:
-- that body is 250 lines and reproducing it to add three ELSIFs is how a
-- CREATE OR REPLACE rolls an unrelated fix backwards.
CREATE OR REPLACE FUNCTION public.teacher_classroom_materials_link(p_classroom uuid, p_action text DEFAULT 'get'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  c     public.teacher_guest_classes%ROWTYPE;
  v_new text;
  tries integer;
  ch    integer;
  -- ⚠ No 0/O/1/I/L/5/S/2/Z/8/B. This gets read off a whiteboard and typed by a
  --   nine-year-old; the same reason the Juice payment reference drops them.
  alpha text := 'ACDEFGHJKMNPQRTUVWXY34679';
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;

  SELECT * INTO c FROM public.teacher_guest_classes
    WHERE id = p_classroom AND teacher_id = auth.uid() AND deleted_at IS NULL FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Classroom unavailable'; END IF;

  IF p_action = 'off' THEN
    UPDATE public.teacher_guest_classes SET materials_code = NULL WHERE id = c.id;
    RETURN jsonb_build_object('ok', true, 'code', NULL, 'access_type', c.access_type);
  END IF;

  -- ⚠ 'get' NEVER MINTS. Opening the Materials tab reads this, and a read that
  --   creates a public address as a side effect would put every classroom a
  --   teacher merely LOOKED at on the open internet. Minting is 'create', and
  --   a teacher only reaches it by tapping the button that says so.
  IF p_action = 'get' THEN
    RETURN jsonb_build_object('ok', true, 'code', c.materials_code,
                              'access_type', c.access_type);
  END IF;

  IF p_action NOT IN ('create', 'rotate') THEN RAISE EXCEPTION 'Unknown action'; END IF;

  -- 'create' is idempotent on purpose: a teacher tapping Share twice must be
  -- sent to the SAME address, or the second tap silently orphans the first
  -- message. Only 'rotate' deliberately breaks the links already shared.
  IF p_action = 'create' AND c.materials_code IS NOT NULL THEN
    RETURN jsonb_build_object('ok', true, 'code', c.materials_code, 'created', false,
                              'access_type', c.access_type);
  END IF;

  FOR tries IN 1..40 LOOP
    v_new := '';
    FOR ch IN 1..10 LOOP
      v_new := v_new || substr(alpha, (get_byte(gen_random_bytes(1), 0) % length(alpha)) + 1, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes WHERE materials_code = v_new);
    v_new := NULL;
  END LOOP;
  IF v_new IS NULL THEN RAISE EXCEPTION 'Could not create a hub code, please try again'; END IF;

  UPDATE public.teacher_guest_classes SET materials_code = v_new WHERE id = c.id;
  RETURN jsonb_build_object('ok', true, 'code', v_new, 'created', true,
    'access_type', c.access_type, 'replaced', c.materials_code IS NOT NULL);
END;
$function$;

REVOKE ALL ON FUNCTION public.teacher_classroom_materials_link(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.teacher_classroom_materials_link(uuid, text) TO authenticated, service_role;

-- ── 4. The pupil's side, behind their PIN ───────────────────────────────────
-- ⚠ service_role ONLY. It is reached through netlify/functions/materials-
--   library.js, which is also the only thing that can turn a file_path into a
--   signed URL and the only place the caller's real IP is known.
CREATE OR REPLACE FUNCTION public.materials_library_open(
  p_code text,
  p_name text DEFAULT ''::text,
  p_pin  text DEFAULT ''::text,
  p_ip   text DEFAULT ''::text,
  p_info boolean DEFAULT false)
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
                                        AND g.submitted_at IS NOT NULL)
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
$function$;

-- The one-argument draft never shipped, but drop it so a database that briefly
-- had it cannot end up with two overloads a named PostgREST call can satisfy.
DROP FUNCTION IF EXISTS public.materials_library_open(text);

REVOKE ALL ON FUNCTION public.materials_library_open(text, text, text, text, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.materials_library_open(text, text, text, text, boolean) TO service_role;

COMMIT;
