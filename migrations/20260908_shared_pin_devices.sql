-- ═══════════════════════════════════════════════════════════════════════════
--  Shared-PIN classrooms: a device remembers who is using it
--
--  In a shared-PIN class every child types the SAME class PIN and then their
--  own name. teacher_guest_open() resolves that as
--        key := 'shared:' || lower(display)
--  so the NAME is the identity. There is no pupil row, and the teacher has no
--  list of who is in the class.
--
--  ⚠ IT ALSO LOCKS A CHILD OUT OF THEIR OWN NAME. teacher_guest_open() refuses
--    a second open while an unsubmitted row exists:
--        IF FOUND AND effective_mode IN ('nickname','shared_pin')
--           AND sub.submitted_at IS NULL THEN  -> 'name_taken'
--    That is meant to stop one child claiming another's name mid-lesson, but it
--    cannot tell "someone else" from "the same child who reloaded the page".
--    Measured end to end: sign in as Ben, reload, and you get
--    "Someone with that name has already done this assignment." — which is
--    both a lockout and untrue. A device code is what distinguishes the two.
--
--  ⚠ WHAT A DEVICE CODE IS, AND IS NOT. It is 32 hex characters generated in
--    the browser by crypto.getRandomValues and kept in that browser's
--    localStorage. It is NOT a fingerprint, carries nothing derived from the
--    child or the hardware, and identifies a DEVICE, not a person: two children
--    sharing a tablet collide, and one child on two devices appears twice. The
--    teacher-facing wording must say "device", never "pupil".
--
--  ⚠ WHY teacher_guest_open() IS NOT TOUCHED. It has just been found to have
--    four independent faults (see the three 20260908_fix_guest_open_* files) and
--    is ~90 lines of PIN, lockout and capacity logic. This works ALONGSIDE it:
--    guest_device_claim() clears the child's OWN stale row first, so the
--    unchanged function then takes its normal first-open path.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. the register ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teacher_guest_devices (
  classroom_id  uuid        NOT NULL REFERENCES public.teacher_guest_classes(id) ON DELETE CASCADE,
  -- 32 hex chars from the browser. Opaque and random; see the header.
  device_code   text        NOT NULL,
  name_display  text        NOT NULL,
  name_key      text        NOT NULL,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (classroom_id, device_code),
  CONSTRAINT teacher_guest_devices_code_ck CHECK (device_code ~ '^[0-9a-f]{32}$'),
  CONSTRAINT teacher_guest_devices_name_ck CHECK (length(btrim(name_display)) BETWEEN 1 AND 40)
);
-- ⚠ One name per classroom. This is what makes "that name is already taken by
--   another device" a real answer rather than a guess, and it is the constraint
--   the lockout was reaching for without being able to express it.
CREATE UNIQUE INDEX IF NOT EXISTS teacher_guest_devices_name_uq
  ON public.teacher_guest_devices (classroom_id, name_key);

ALTER TABLE public.teacher_guest_devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "teachers read class devices" ON public.teacher_guest_devices;
CREATE POLICY "teachers read class devices" ON public.teacher_guest_devices
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_guest_classes c
                  WHERE c.id = teacher_guest_devices.classroom_id AND c.teacher_id = auth.uid()));

REVOKE ALL ON public.teacher_guest_devices FROM anon, authenticated;
GRANT SELECT ON public.teacher_guest_devices TO authenticated;

-- ── 2. a device claims a name ──────────────────────────────────────────────
-- Called BEFORE teacher_guest_open(). Returns ok:true when this device may go
-- on to open the assignment under this name.
CREATE OR REPLACE FUNCTION public.guest_device_claim(
  p_code text, p_device text, p_name text)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a      public.guest_assignments%ROWTYPE;
  v_class  public.teacher_guest_classes%ROWTYPE;
  v_name   text;
  v_key    text;
  v_owner  text;
  v_subkey text;
BEGIN
  IF p_device IS NULL OR p_device !~ '^[0-9a-f]{32}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_device');
  END IF;

  v_name := btrim(regexp_replace(coalesce(p_name, ''), '[[:cntrl:]]+', ' ', 'g'));
  v_name := regexp_replace(v_name, '\s+', ' ', 'g');
  IF length(v_name) < 1 OR length(v_name) > 40 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_name');
  END IF;
  v_key := lower(v_name);

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  SELECT c.* INTO v_class FROM public.teacher_guest_classes c
    JOIN public.teacher_guest_access ac ON ac.classroom_id = c.id
   WHERE ac.assignment_id = v_a.id AND c.active;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_classroom'); END IF;
  -- ⚠ Shared classes only. A per-pupil-PIN class already has a real roster and
  --   a real identity; adding a device claim there would be a second, weaker
  --   way to become a pupil.
  IF v_class.access_type <> 'shared' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_shared');
  END IF;

  -- Is this name already registered to a DIFFERENT device in this classroom?
  SELECT device_code INTO v_owner FROM public.teacher_guest_devices
   WHERE classroom_id = v_class.id AND name_key = v_key;
  IF v_owner IS NOT NULL AND v_owner <> p_device THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken');
  END IF;

  -- Register (or refresh) this device. A device may change its name: the row is
  -- keyed on the device, so the old name is released for someone else.
  INSERT INTO public.teacher_guest_devices (classroom_id, device_code, name_display, name_key)
  VALUES (v_class.id, p_device, v_name, v_key)
  ON CONFLICT (classroom_id, device_code)
  DO UPDATE SET name_display = EXCLUDED.name_display,
                name_key     = EXCLUDED.name_key,
                last_seen_at = now();

  -- ⚠ THE LOCKOUT FIX. teacher_guest_open() refuses to reopen while an
  --   UNSUBMITTED row exists for this name. Now that the name is proven to
  --   belong to this device, that row is this child's own abandoned attempt —
  --   a reload, a flat battery, a closed tab — so it is cleared and they get a
  --   fresh start. A SUBMITTED row is never touched: that is real work.
  v_subkey := 'shared:' || v_key;
  DELETE FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_subkey AND submitted_at IS NULL;

  RETURN jsonb_build_object('ok', true, 'name', v_name);
END;
$function$;

REVOKE ALL ON FUNCTION public.guest_device_claim(text, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.guest_device_claim(text, text, text) TO anon, authenticated;

-- ── 3. the teacher's list ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_guest_device_list(p_classroom_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  -- ⚠ Only the last 6 characters of the device code leave the database. It is
  --   enough for a teacher to tell two tablets apart, and it is not a handle
  --   anyone can use to impersonate a device.
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', name_display,
           'device_tag', right(device_code, 6),
           'first_seen_at', first_seen_at,
           'last_seen_at', last_seen_at) ORDER BY last_seen_at DESC), '[]'::jsonb)
    INTO v_out
    FROM public.teacher_guest_devices WHERE classroom_id = p_classroom_id;
  RETURN jsonb_build_object('ok', true, 'devices', v_out);
END;
$function$;

REVOKE ALL ON FUNCTION public.teacher_guest_device_list(uuid) FROM public;
REVOKE ALL ON FUNCTION public.teacher_guest_device_list(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.teacher_guest_device_list(uuid) TO authenticated;

-- ── 4. verification ────────────────────────────────────────────────────────
--   SELECT proname, proacl FROM pg_proc
--    WHERE proname IN ('guest_device_claim','teacher_guest_device_list');
--   \dp public.teacher_guest_devices
