-- ═══════════════════════════════════════════════════════════════════════════
--  One attempt per device — a teacher-controlled cap on guest assignments.
--
--  WHY: identity in a guest assignment is the NAME. teacher_guest_open() keys
--  guest_submissions on name_key, so re-opening under the SAME name after
--  submitting is refused (name_taken / already_submitted) — but typing a
--  DIFFERENT name is a brand-new pupil as far as the server is concerned. On
--  one laptop a child can finish, reload, type "Sam2" and sit the same paper
--  again. Measured on production behaviour, not inferred.
--
--  ⚠ WHAT THIS IS AND IS NOT. The device code is 32 random hex characters
--    minted by the browser and kept in ITS localStorage (guest.js
--    `_deviceCode`). It is NOT a fingerprint: nothing in it is derived from the
--    child or the hardware, and it cannot be re-derived once cleared. So this
--    is a speed bump — incognito, a cleared browser, a second phone all defeat
--    it. It stops the casual "let me just try that again", which is the thing
--    that actually happens. The control that genuinely caps attempts is a
--    per-pupil-PIN classroom, where name_key is a pupil row id nobody can
--    invent.
--
--  ⚠ NOT IP. A Mauritian school behind one NAT, and mobile CGNAT, put a whole
--    class on a single address — an IP cap locks out twenty-nine innocent
--    children to stop one. The same reason teacher_guest_throttle already
--    raises its ceiling to 100 for nickname/shared_pin. IP stays what it is
--    here: a wrong-PIN throttle key, nothing else.
--
--  ⚠ A device that sends NOTHING is never capped, deliberately. Private
--    browsing and storage-refused both yield '' from _deviceCode(), and
--    refusing entry on a missing device code would lock a child out of their
--    homework over a browser setting. Fails OPEN, on purpose — the opposite
--    choice from an entitlement check, because this is an integrity nicety and
--    that is a paywall.
--
--  ⚠ Written from the LIVE definitions (pg_get_functiondef), not from
--    supabase-schema.sql, which is a snapshot and overwrites function bodies
--    with whatever it recorded. After applying, REGENERATE:
--       SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js
--
--  ⚠ CREATE OR REPLACE cannot change a signature. teacher_guest_open and
--    teacher_guest_entry gain p_device and teacher_guest_create_assignment
--    gains p_one_per_device, so the OLD arities are DROPPED in the same
--    transaction — two overloads a named PostgREST call can both satisfy is an
--    ambiguity error, not a fallback.
--
--  Backward compatible in the other direction: the deployed
--  assignment-open.js calls with five named arguments and the deployed teacher
--  client with nine, which the wider functions accept because the new
--  parameters default. Applying this before deploying is safe.
--
--  Idempotent. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. Which device opened this attempt ─────────────────────────────────────
-- Nullable: every existing row was opened before this column existed, and an
-- attempt from a browser that cannot store a code has no device. NULL means
-- "not known", and nothing below ever treats it as a match.
ALTER TABLE public.guest_submissions
  ADD COLUMN IF NOT EXISTS device_code text;

COMMENT ON COLUMN public.guest_submissions.device_code IS
  'The 32-hex browser-minted device code that OPENED this attempt, or NULL when the browser could not store one. Not a fingerprint; see migrations/20260910_guest_device_cap.sql.';

-- Shape-checked here as well as in guest.js and assignment-open.js. A value
-- that is not 32 hex characters is a client bug, not something to store.
DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.guest_submissions'::regclass
      AND conname  = 'guest_submissions_device_code_ck'
  ) THEN
    ALTER TABLE public.guest_submissions
      ADD CONSTRAINT guest_submissions_device_code_ck
      CHECK (device_code IS NULL OR device_code ~ '^[0-9a-f]{32}$');
  END IF;
END
$do$;

-- The cap's lookup is (assignment_id, device_code); assignment_id alone is
-- already indexed, but the pair keeps the check off a sequential scan as an
-- assignment fills up.
CREATE INDEX IF NOT EXISTS guest_submissions_device_idx
  ON public.guest_submissions (assignment_id, device_code)
  WHERE device_code IS NOT NULL;

-- ⚠ NO column GRANT is needed, and that is measured rather than assumed:
--   guest_submissions carries grants for service_role only, so anon and
--   authenticated never read this table directly — every path goes through a
--   SECURITY DEFINER function or the service key. (Contrast public.students,
--   where a missing per-column GRANT SELECT silently empties a screen.)

-- ── 2. The teacher's switch, per assignment ─────────────────────────────────
-- On teacher_guest_access, not guest_assignments: it is a property of HOW this
-- work is opened, which is exactly what that table already holds.
ALTER TABLE public.teacher_guest_access
  ADD COLUMN IF NOT EXISTS one_per_device boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.teacher_guest_access.one_per_device IS
  'When true, a device that has already SUBMITTED this assignment under one name cannot open it again under another. Default false: a shared classroom tablet legitimately serves thirty children in a row.';

-- ── 3. teacher_guest_open, now told which device is asking ──────────────────
-- The body is the live one plus the device block marked ⚠ THE CAP.
CREATE OR REPLACE FUNCTION public.teacher_guest_open(p_code text, p_name text DEFAULT ''::text, p_pin text DEFAULT ''::text, p_ip text DEFAULT ''::text, p_info boolean DEFAULT false, p_device text DEFAULT ''::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  a      public.guest_assignments%ROWTYPE;
  access public.teacher_guest_access%ROWTYPE;
  c      public.teacher_guest_classes%ROWTYPE;
  pupil  public.teacher_guest_pupils%ROWTYPE;
  sub    public.guest_submissions%ROWTYPE;
  key    text; display text; token text;
  t      public.teacher_guest_throttle%ROWTYPE;
  effective_mode text;
  v_device text;
  v_other  text;
BEGIN
  -- ⚠ Only a well-formed code counts. '' (private browsing, storage refused)
  --   becomes NULL and is never compared against anything, so a child whose
  --   browser cannot store a code is never locked out by this feature.
  v_device := lower(btrim(coalesce(p_device, '')));
  IF v_device !~ '^[0-9a-f]{32}$' THEN v_device := NULL; END IF;

  SELECT * INTO a FROM public.guest_assignments WHERE code=upper(btrim(p_code)) FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'error','not_found'); END IF;
  SELECT * INTO access FROM public.teacher_guest_access WHERE assignment_id=a.id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok',true,'legacy',true,'access_mode','legacy'); END IF;
  IF a.status <> 'active' OR a.expires_at < now() THEN RETURN jsonb_build_object('ok',false,'error','expired'); END IF;
  IF NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=a.teacher_id AND NOT coalesce(disabled,false)
    AND (expires_at IS NULL OR expires_at>now()) AND (role='admin' OR (role='teacher' AND teacher_status='approved'))) THEN
    RETURN jsonb_build_object('ok',false,'error','expired');
  END IF;
  -- Resolve effective mode: classroom_pin with shared access_type = shared_pin
  effective_mode := access.mode;
  IF access.mode = 'classroom_pin' AND access.classroom_id IS NOT NULL THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=access.classroom_id AND active;
    IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'error','expired'); END IF;
    IF c.access_type = 'shared' THEN effective_mode := 'shared_pin'; END IF;
  END IF;
  IF p_info THEN
    RETURN jsonb_build_object('ok',true,'access_mode',effective_mode,'title',a.title);
  END IF;
  DELETE FROM public.teacher_guest_throttle WHERE assignment_id=a.id AND since<now()-interval '1 day';
  INSERT INTO public.teacher_guest_throttle(assignment_id,source)
    VALUES(a.id,encode(digest(coalesce(p_ip,''),'sha256'),'hex')) ON CONFLICT DO NOTHING;
  SELECT * INTO t FROM public.teacher_guest_throttle
    WHERE assignment_id=a.id AND source=encode(digest(coalesce(p_ip,''),'sha256'),'hex') FOR UPDATE;
  IF t.since < now()-interval '10 minutes' THEN t.attempts:=0; t.since:=now(); END IF;
  IF t.attempts >= (CASE WHEN effective_mode IN ('nickname','shared_pin') THEN 100 ELSE 10 END) THEN
    RETURN jsonb_build_object('ok',false,'error','locked');
  END IF;

  IF effective_mode = 'classroom_pin' THEN
    -- Per-student PIN: each pupil has their own PIN
    SELECT s.* INTO pupil FROM public.teacher_guest_pupils s JOIN public.teacher_guest_roster r ON r.pupil_id=s.id
      WHERE r.assignment_id=a.id AND s.classroom_id=c.id AND s.active
        AND p_pin ~ '^\d{4}$' AND s.pin_lookup=encode(hmac(p_pin,c.secret,'sha256'),'hex');
    IF NOT FOUND THEN
      UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
      RETURN jsonb_build_object('ok',false,'error','bad_pin','attemptsLeft',greatest(0,10-t.attempts-1));
    END IF;
    key := pupil.id::text; display := pupil.name;

  ELSIF effective_mode = 'shared_pin' THEN
    -- Shared class PIN: verify PIN then use name
    IF c.class_pin_lookup IS NULL OR NOT (p_pin ~ '^\d{4}$') OR
       encode(hmac(p_pin, c.secret, 'sha256'), 'hex') <> c.class_pin_lookup THEN
      UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
      RETURN jsonb_build_object('ok',false,'error','bad_pin','attemptsLeft',greatest(0,10-t.attempts-1));
    END IF;
    display := btrim(p_name);
    IF display IS NULL OR length(display) NOT BETWEEN 1 AND 40 THEN
      RETURN jsonb_build_object('ok',false,'error','name_required');
    END IF;
    key := 'shared:' || lower(display);
    UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;

  ELSE
    -- Nickname mode: name only
    display := btrim(p_name);
    IF display IS NULL OR length(display) NOT BETWEEN 1 AND 40 THEN
      RETURN jsonb_build_object('ok',false,'error','name_required');
    END IF;
    key := lower(display);
    UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
  END IF;

  -- ⚠ THE CAP. Only ever about a DIFFERENT name: the same name is already
  --   answered by name_taken / already_submitted below, and a teacher who has
  --   granted a retry (retry_allowed) must not be overruled by this.
  --   Checked AFTER the PIN, so it can never be used to probe an assignment
  --   without the PIN, and only when the teacher asked for it.
  IF access.one_per_device AND v_device IS NOT NULL THEN
    SELECT g.name_display INTO v_other
      FROM public.guest_submissions g
     WHERE g.assignment_id = a.id
       AND g.device_code   = v_device
       AND g.name_key     <> key
       AND g.submitted_at IS NOT NULL
       AND NOT g.retry_allowed
     LIMIT 1;
    IF v_other IS NOT NULL THEN
      RETURN jsonb_build_object('ok',false,'error','device_used','other_name',v_other);
    END IF;
  END IF;

  SELECT * INTO sub FROM public.guest_submissions WHERE assignment_id=a.id AND name_key=key FOR UPDATE;
  IF FOUND AND sub.submitted_at IS NOT NULL AND NOT sub.retry_allowed THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  IF FOUND AND effective_mode IN ('nickname','shared_pin') AND sub.submitted_at IS NULL THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  token := encode(gen_random_bytes(32),'hex');
  IF NOT FOUND THEN
    INSERT INTO public.guest_submissions(assignment_id,name_key,name_display,open_token_hash,device_code)
      VALUES(a.id,key,display,encode(digest(token,'sha256'),'hex'),v_device);
  ELSE
    -- ⚠ coalesce, not overwrite: a reopen from a browser that has since lost
    --   its code must not erase the device that is on record for this attempt.
    UPDATE public.guest_submissions SET name_display=display,
      open_token_hash=encode(digest(token,'sha256'),'hex'),submitted_at=NULL,answers='[]',
      device_code=coalesce(v_device, device_code)
      WHERE assignment_id=a.id AND name_key=key;
  END IF;
  RETURN jsonb_build_object('ok',true,'name',display,'submit_name',key,'token',token,
    'assignment',to_jsonb(a),'questions',
    '[]'::jsonb);
END $function$;

-- ── 4. teacher_guest_entry passes the device straight through ───────────────
CREATE OR REPLACE FUNCTION public.teacher_guest_entry(p_code text, p_name text DEFAULT ''::text, p_pin text DEFAULT ''::text, p_ip text DEFAULT ''::text, p_info boolean DEFAULT false, p_device text DEFAULT ''::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF EXISTS(SELECT 1 FROM public.guest_assignments g JOIN public.teacher_guest_access a ON a.assignment_id=g.id
    JOIN public.teacher_guest_classes c ON c.id=a.classroom_id WHERE g.code=upper(btrim(p_code)) AND NOT c.active) THEN
    RETURN jsonb_build_object('ok',false,'error','expired');
  END IF;
  RETURN public.teacher_guest_open(p_code,p_name,p_pin,p_ip,p_info,p_device);
END $function$;

-- ── 5. Retire the five-argument overloads ───────────────────────────────────
-- ⚠ Order matters: entry calls open, so open cannot be dropped while the OLD
--   entry still references it — but a plpgsql body is resolved at run time, so
--   the drops are safe in either order INSIDE this transaction. Dropped after
--   both new bodies exist so no window has neither.
DROP FUNCTION IF EXISTS public.teacher_guest_entry(text, text, text, text, boolean);
DROP FUNCTION IF EXISTS public.teacher_guest_open(text, text, text, text, boolean);

-- ── 6. The teacher sets the switch when the work is created ─────────────────
CREATE OR REPLACE FUNCTION public.teacher_guest_create_assignment(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_access text, p_classroom uuid DEFAULT NULL::uuid, p_duration_mins integer DEFAULT NULL::integer, p_due_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_pupil_ids jsonb DEFAULT NULL::jsonb, p_one_per_device boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  c        public.teacher_guest_classes%ROWTYPE;
  r        jsonb;
  n        integer;
  v_hours  integer := 48;
  v_chosen uuid[]  := NULL;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_access IS NULL OR p_access NOT IN ('classroom_pin','nickname') THEN RAISE EXCEPTION 'Choose assignment access'; END IF;

  -- A due date in the past would create work nobody can open. Refuse it with
  -- words the form can show rather than letting the row be born closed.
  IF p_due_at IS NOT NULL THEN
    IF p_due_at <= now() THEN RAISE EXCEPTION 'Choose a due date in the future'; END IF;
    v_hours := greatest(1, ceil(extract(epoch FROM (p_due_at - now())) / 3600.0))::integer;
  END IF;

  IF p_classroom IS NOT NULL THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=p_classroom AND teacher_id=auth.uid() AND active FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Choose an active classroom you own'; END IF;
  END IF;

  -- Optional pupil subset. Only ids that are ACTIVE pupils of THIS classroom
  -- count; anything else in the array is ignored rather than trusted.
  IF p_pupil_ids IS NOT NULL AND jsonb_typeof(p_pupil_ids) = 'array' AND jsonb_array_length(p_pupil_ids) > 0 THEN
    IF c.id IS NULL THEN RAISE EXCEPTION 'Choose a classroom before choosing pupils'; END IF;
    SELECT array_agg(s.id) INTO v_chosen
      FROM public.teacher_guest_pupils s
      WHERE s.classroom_id = c.id AND s.active
        AND s.id::text IN (SELECT jsonb_array_elements_text(p_pupil_ids));
    IF v_chosen IS NULL OR cardinality(v_chosen) = 0 THEN RAISE EXCEPTION 'Choose at least one pupil from this classroom'; END IF;
  END IF;

  IF p_access='classroom_pin' THEN
    IF c.id IS NULL THEN RAISE EXCEPTION 'Choose a classroom for pupil PINs'; END IF;
    IF v_chosen IS NOT NULL THEN
      n := cardinality(v_chosen);
    ELSE
      SELECT count(*) INTO n FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    END IF;
    IF n=0 THEN RAISE EXCEPTION 'Add pupils first or choose nickname entry'; END IF;
  END IF;

  r:=public.guest_assignment_create(p_title,p_subject_pack_id,p_chapter_ids,p_question_ids,'0000',c.name,p_duration_mins,p_due_at,v_hours);
  IF NOT coalesce((r->>'ok')::boolean,false) THEN RETURN r; END IF;

  UPDATE public.guest_assignments SET pin_hash=crypt(encode(gen_random_bytes(32),'hex'),gen_salt('bf')),
    max_students=CASE WHEN p_access='classroom_pin' THEN greatest(max_students,n) ELSE max_students END WHERE id=(r->>'id')::uuid;
  INSERT INTO public.teacher_guest_access(assignment_id,mode,classroom_id,one_per_device)
    VALUES((r->>'id')::uuid,p_access,c.id,coalesce(p_one_per_device,false));

  IF p_access='classroom_pin' THEN
    IF v_chosen IS NOT NULL THEN
      INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils
        WHERE classroom_id=c.id AND active AND id = ANY(v_chosen);
    ELSE
      INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    END IF;
  END IF;

  RETURN r || jsonb_build_object('access_mode',p_access,'classroom_id',c.id,
    'due_at',p_due_at,'selected_pupils',CASE WHEN v_chosen IS NULL THEN NULL ELSE cardinality(v_chosen) END,
    'one_per_device',coalesce(p_one_per_device,false),
    'max_students',CASE WHEN p_access='classroom_pin' THEN greatest((r->>'max_students')::integer,n) ELSE (r->>'max_students')::integer END);
END $function$;

DROP FUNCTION IF EXISTS public.teacher_guest_create_assignment(text, text, jsonb, jsonb, text, uuid, integer, timestamp with time zone, jsonb);

-- ── 7. Grants ───────────────────────────────────────────────────────────────
-- ⚠ A newly created function inherits Supabase's default privileges INCLUDING
--   anon, and REVOKE … FROM PUBLIC does not remove that. The two guest-entry
--   functions are service_role only — they are reached through
--   netlify/functions/assignment-open.js and must not be callable from a
--   browser, where p_ip would be whatever the caller typed.
REVOKE ALL ON FUNCTION public.teacher_guest_open(text, text, text, text, boolean, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.teacher_guest_entry(text, text, text, text, boolean, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_open(text, text, text, text, boolean, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_entry(text, text, text, text, boolean, text) TO service_role;

GRANT EXECUTE ON FUNCTION public.teacher_guest_create_assignment(
  text, text, jsonb, jsonb, text, uuid, integer, timestamp with time zone, jsonb, boolean
) TO authenticated, service_role;

COMMIT;
