-- ═══════════════════════════════════════════════════════════════════════════
--  A pupil may correct their own name, and the teacher sees every change
--
--  WHY THIS IS SAFE HERE, AND ONLY HERE
--  teacher_guest_open() resolves a per-pupil PIN sign-in as:
--      key := pupil.id::text;  display := pupil.name;
--  The identity key is the pupil's UUID. The NAME is only a label, so changing
--  it cannot orphan a submission, a PIN attempt or a material completion —
--  every one of those joins on the id.
--
--  ⚠ THE SHARED-PIN MODE IS DELIBERATELY EXCLUDED. There,
--  teacher_guest_open() does `display := btrim(p_name)` and the name IS the
--  key: renaming would strand the pupil's existing work under the old key and
--  let one child type another child's name. That mode gets its own identity
--  first (the device code, the next piece of work); until then
--  guest_set_my_name() refuses it rather than corrupting anything.
--
--  ⚠ A NAME IS NOT A CREDENTIAL, but it IS how a teacher recognises a child in
--  a results list. So every change is recorded — old value, new value, who did
--  it, when — and the teacher can see the trail. A child quietly renaming
--  themselves to another child's name would otherwise be invisible.
--
--  ⚠ THE HISTORY IS WRITTEN BY A TRIGGER, not by the RPC. The teacher can
--  already rename a pupil from the Classroom screen, and a second write path
--  would have to be found and edited. A trigger on the column cannot miss a
--  caller, present or future.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. the trail ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teacher_guest_pupil_names (
  id         bigserial PRIMARY KEY,
  pupil_id   uuid NOT NULL REFERENCES public.teacher_guest_pupils(id) ON DELETE CASCADE,
  old_name   text,
  new_name   text NOT NULL,
  -- 'pupil' when the change arrived through the guest RPC (no auth.uid()),
  -- 'teacher' when it came from a signed-in adult. Derived in the trigger, so
  -- the caller cannot claim to be someone else.
  changed_by text NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS teacher_guest_pupil_names_pupil_idx
  ON public.teacher_guest_pupil_names USING btree (pupil_id, changed_at DESC);

ALTER TABLE public.teacher_guest_pupil_names ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "teachers read pupil name history" ON public.teacher_guest_pupil_names;
CREATE POLICY "teachers read pupil name history" ON public.teacher_guest_pupil_names
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_guest_pupils p
                   JOIN public.teacher_guest_classes c ON c.id = p.classroom_id
                  WHERE p.id = teacher_guest_pupil_names.pupil_id
                    AND c.teacher_id = auth.uid()));

REVOKE ALL ON public.teacher_guest_pupil_names FROM anon, authenticated;
GRANT SELECT ON public.teacher_guest_pupil_names TO authenticated;

-- ── 2. record every rename, whoever makes it ───────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_guest_log_pupil_name()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  -- Only an actual change. A save that does not alter the name writes nothing,
  -- or the trail fills with noise and stops being readable.
  IF TG_OP = 'UPDATE' AND coalesce(OLD.name, '') IS NOT DISTINCT FROM coalesce(NEW.name, '') THEN
    RETURN NEW;
  END IF;
  INSERT INTO public.teacher_guest_pupil_names (pupil_id, old_name, new_name, changed_by)
  VALUES (NEW.id,
          CASE WHEN TG_OP = 'UPDATE' THEN OLD.name ELSE NULL END,
          NEW.name,
          CASE WHEN auth.uid() IS NOT NULL THEN 'teacher' ELSE 'pupil' END);
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS teacher_guest_pupils_name_log ON public.teacher_guest_pupils;
CREATE TRIGGER teacher_guest_pupils_name_log
  AFTER INSERT OR UPDATE OF name ON public.teacher_guest_pupils
  FOR EACH ROW EXECUTE FUNCTION public.teacher_guest_log_pupil_name();

-- ── 3. the pupil changes their own name ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.guest_set_my_name(
  p_code text, p_name text, p_token text, p_new_name text)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a     public.guest_assignments%ROWTYPE;
  v_key   text := lower(btrim(p_name));
  v_sub   public.guest_submissions%ROWTYPE;
  v_new   text;
  v_pupil public.teacher_guest_pupils%ROWTYPE;
BEGIN
  -- ⚠ Collapse whitespace and strip control characters. This string is rendered
  --   into the teacher's results list and into a share message; the escaping at
  --   those ends is the guard, but a name should not carry newlines regardless.
  v_new := btrim(regexp_replace(coalesce(p_new_name, ''), '[[:cntrl:]]+', ' ', 'g'));
  v_new := regexp_replace(v_new, '\s+', ' ', 'g');
  IF length(v_new) < 2 OR length(v_new) > 40 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_name');
  END IF;

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  IF v_sub.session_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.session_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  -- ⚠ Only per-pupil-PIN sign-ins. There name_key is the pupil's UUID, so the
  --   name is a label and renaming is safe. In shared-PIN mode the name IS the
  --   key — see the header.
  IF v_key !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_supported');
  END IF;

  SELECT * INTO v_pupil FROM public.teacher_guest_pupils WHERE id = v_key::uuid AND active;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_pupil'); END IF;

  -- The roster name. The trigger above writes the history row.
  UPDATE public.teacher_guest_pupils SET name = v_new WHERE id = v_pupil.id;

  -- ⚠ Existing submissions carry a name_display snapshot. Leaving it stale
  --   would show the teacher the OLD name against work already handed in, which
  --   is exactly the confusion this feature is meant to remove. name_key is
  --   untouched — that is the identity and it does not move.
  UPDATE public.guest_submissions SET name_display = v_new WHERE name_key = v_key;
  UPDATE public.guest_material_completions SET name_display = v_new WHERE name_key = v_key;

  RETURN jsonb_build_object('ok', true, 'name', v_new);
END;
$function$;

REVOKE ALL ON FUNCTION public.guest_set_my_name(text, text, text, text) FROM public;
-- A guest pupil is anon. ⚠ And check proacl afterwards: a new function inherits
-- Supabase's default anon grant, which REVOKE FROM PUBLIC does not remove.
GRANT EXECUTE ON FUNCTION public.guest_set_my_name(text, text, text, text) TO anon, authenticated;

-- ── 4. what the teacher sees ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.teacher_pupil_name_history(p_classroom_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  -- ⚠ Only renames, not the row created when the teacher first added the pupil
  --   (old_name IS NULL). A "history" that lists every pupil once, saying they
  --   were named when created, is noise a teacher has to read past.
  SELECT coalesce(jsonb_agg(e ORDER BY e->>'changed_at' DESC), '[]'::jsonb) INTO v_out
    FROM (
      SELECT jsonb_build_object(
               'pupil_id', h.pupil_id, 'old_name', h.old_name, 'new_name', h.new_name,
               'changed_by', h.changed_by, 'changed_at', h.changed_at) AS e
        FROM public.teacher_guest_pupil_names h
        JOIN public.teacher_guest_pupils p ON p.id = h.pupil_id
       WHERE p.classroom_id = p_classroom_id AND h.old_name IS NOT NULL
       ORDER BY h.changed_at DESC
       LIMIT 200
    ) t;
  RETURN jsonb_build_object('ok', true, 'changes', v_out);
END;
$function$;

REVOKE ALL ON FUNCTION public.teacher_pupil_name_history(uuid) FROM public;
REVOKE ALL ON FUNCTION public.teacher_pupil_name_history(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.teacher_pupil_name_history(uuid) TO authenticated;

-- ── 5. verification ────────────────────────────────────────────────────────
--   SELECT proname, proacl FROM pg_proc
--    WHERE proname IN ('guest_set_my_name','teacher_pupil_name_history');
--   \dp public.teacher_guest_pupil_names
--   SELECT changed_by, count(*) FROM public.teacher_guest_pupil_names GROUP BY 1;
