-- ═══════════════════════════════════════════════════════════════════════════
--  "I have done this" for work that cannot be auto-marked
--  (a PDF worksheet, a YouTube lesson, a link to another site)
--
--  A guest_assignments row is always a QUIZ: it has questions, guest_submit()
--  re-grades it server-side, and the teacher's Results screen colours the pupil
--  green off `submitted_at`. A material has none of that — nobody can mark a
--  PDF from here — so the only honest signal is the pupil's own word for it.
--  This records exactly that, and nothing more.
--
--  ⚠ IT IS A CLAIM, NOT A SCORE. The teacher UI must say "said they have done
--    this", never "completed 8/10". Presenting a self-report beside a marked
--    result as though they were the same evidence is the one thing this feature
--    must not do.
--
--  ⚠ WHY A SECOND TOKEN HASH ON guest_submissions.
--    guest_submit() deliberately NULLs open_token_hash — "one token, one
--    submission" — so that credential cannot authorise anything afterwards, and
--    widening it would re-open double submission. Ticking a worksheet, though,
--    legitimately happens after the quiz is handed in, or days later. So the
--    SESSION credential is separated from the SUBMISSION credential:
--    session_token_hash is written at open, is never cleared, and authorises
--    material marking ONLY. It can never be used to submit.
--
--  ⚠ NO INSERT/UPDATE/DELETE GRANT on the new table for anon or authenticated.
--    guest_mark_material() is the only write path, and a grant that does not
--    exist cannot be re-opened by a later policy mistake. Same rule as
--    student_question_progress.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. the session credential ──────────────────────────────────────────────
ALTER TABLE public.guest_submissions
  ADD COLUMN IF NOT EXISTS session_token_hash text;

-- ⚠ A TRIGGER, not an edit to guest_open(). guest_open is ~90 lines of PIN
--   verification, per-name and per-assignment lockout, capacity and retry
--   handling, and it sets open_token_hash in two separate branches (first open,
--   and re-open for an allowed retry). Rewriting it to touch one more column
--   would put all of that at risk to add an assignment; mirroring the value as
--   it is written cannot miss a branch and cannot change any existing decision.
--
-- ⚠ The session hash is the SAME value as the open token. That is deliberate
--   and is not a second credential to steal: after submission guest_submit()
--   NULLs open_token_hash, so the very same string can no longer submit
--   anything — it can only tick a worksheet. The pupil's browser already holds
--   it in memory, so nothing new is stored client-side either.
CREATE OR REPLACE FUNCTION public.guest_keep_session_token()
RETURNS trigger
LANGUAGE plpgsql SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF NEW.open_token_hash IS NOT NULL THEN
    NEW.session_token_hash := NEW.open_token_hash;
  END IF;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS guest_submissions_keep_session_token ON public.guest_submissions;
CREATE TRIGGER guest_submissions_keep_session_token
  BEFORE INSERT OR UPDATE OF open_token_hash ON public.guest_submissions
  FOR EACH ROW EXECUTE FUNCTION public.guest_keep_session_token();

-- ── 2. the claims ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.guest_material_completions (
  material_id  uuid        NOT NULL REFERENCES public.learning_materials(id)     ON DELETE CASCADE,
  classroom_id uuid        NOT NULL REFERENCES public.teacher_guest_classes(id)  ON DELETE CASCADE,
  -- ⚠ name_key, the same lower(btrim(name)) key guest_submissions uses. A pupil
  --   is identified here exactly as they are everywhere else in the guest flow,
  --   so the teacher's roster join keeps working unchanged.
  name_key     text        NOT NULL,
  name_display text,
  done_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (material_id, name_key)
);
CREATE INDEX IF NOT EXISTS guest_material_completions_class_idx
  ON public.guest_material_completions USING btree (classroom_id, done_at DESC);

ALTER TABLE public.guest_material_completions ENABLE ROW LEVEL SECURITY;

-- The teacher who owns the classroom may read the claims. Nobody writes
-- directly — see the grant note above.
DROP POLICY IF EXISTS "teachers read material completions" ON public.guest_material_completions;
CREATE POLICY "teachers read material completions" ON public.guest_material_completions
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teacher_guest_classes c
                  WHERE c.id = guest_material_completions.classroom_id
                    AND c.teacher_id = auth.uid()));

REVOKE ALL ON public.guest_material_completions FROM anon, authenticated;
GRANT SELECT ON public.guest_material_completions TO authenticated;

-- ── 3. the pupil marks it ──────────────────────────────────────────────────
-- ⚠ The material must actually be shared with the classroom the pupil's
--   assignment belongs to. Without that check any classroom_id + material_id
--   pair would be accepted, and a pupil could tick a worksheet belonging to
--   another teacher's class.
CREATE OR REPLACE FUNCTION public.guest_mark_material(
  p_code text, p_name text, p_token text, p_material_id uuid, p_done boolean)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a     public.guest_assignments%ROWTYPE;
  v_key   text := lower(btrim(p_name));
  v_sub   public.guest_submissions%ROWTYPE;
  v_class uuid;
BEGIN
  IF p_material_id IS NULL OR v_key = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_request');
  END IF;

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  -- Only the browser that passed the PIN for this pupil. Unlike guest_submit
  -- this hash survives submission, because ticking a worksheet afterwards is
  -- the normal case rather than an attack.
  IF v_sub.session_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.session_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  SELECT classroom_id INTO v_class FROM public.teacher_guest_access WHERE assignment_id = v_a.id;
  IF v_class IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'no_classroom'); END IF;

  IF NOT EXISTS (SELECT 1 FROM public.classroom_materials
                  WHERE material_id = p_material_id AND classroom_id = v_class) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_shared');
  END IF;

  IF coalesce(p_done, true) THEN
    INSERT INTO public.guest_material_completions (material_id, classroom_id, name_key, name_display)
    VALUES (p_material_id, v_class, v_key, btrim(p_name))
    ON CONFLICT (material_id, name_key)
    DO UPDATE SET done_at = now(), name_display = EXCLUDED.name_display;
  ELSE
    -- A pupil may untick: they tapped it by mistake, or went back to finish it.
    DELETE FROM public.guest_material_completions
     WHERE material_id = p_material_id AND name_key = v_key;
  END IF;

  RETURN jsonb_build_object('ok', true, 'done', coalesce(p_done, true), 'material_id', p_material_id);
END;
$function$;

REVOKE ALL ON FUNCTION public.guest_mark_material(text, text, text, uuid, boolean) FROM public;
-- ⚠ anon AND authenticated. A guest pupil is anon; an authenticated-only grant
--   is how the friend RPCs ended up dead. And ⚠ a newly created function
--   inherits Supabase's default privileges including anon=X, which REVOKE FROM
--   PUBLIC does not remove — so the grant is stated explicitly and proacl is
--   what to check afterwards, not this file.
GRANT EXECUTE ON FUNCTION public.guest_mark_material(text, text, text, uuid, boolean) TO anon, authenticated;

-- ── 4. what the teacher sees ───────────────────────────────────────────────
-- Per material: how many pupils in the class say they have done it, and who.
CREATE OR REPLACE FUNCTION public.teacher_material_completions(p_classroom_id uuid)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  SELECT coalesce(jsonb_object_agg(material_id, entry), '{}'::jsonb) INTO v_out
    FROM (
      SELECT material_id,
             jsonb_build_object(
               'done', count(*),
               'names', coalesce(jsonb_agg(coalesce(name_display, name_key) ORDER BY done_at DESC), '[]'::jsonb),
               'last_at', max(done_at)
             ) AS entry
        FROM public.guest_material_completions
       WHERE classroom_id = p_classroom_id
       GROUP BY material_id
    ) t;
  RETURN jsonb_build_object('ok', true,
    'expected', (SELECT count(*) FROM public.teacher_guest_pupils
                  WHERE classroom_id = p_classroom_id AND active),
    'materials', v_out);
END;
$function$;

-- ⚠ REVOKE FROM PUBLIC IS NOT ENOUGH. A newly created function inherits
--   Supabase's default privileges, which include anon=X, and revoking PUBLIC
--   only drops the PUBLIC entry — anon keeps its own. Measured on the live
--   database immediately after the first apply of this file: proacl was
--   {postgres=X,anon=X,authenticated=X,service_role=X}. The function's own
--   auth.uid() check meant an anon caller was refused anyway, but a grant that
--   should not exist is not something to leave sitting there.
--   ⚠ Check proacl after applying, not this file.
REVOKE ALL ON FUNCTION public.teacher_material_completions(uuid) FROM public;
REVOKE ALL ON FUNCTION public.teacher_material_completions(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.teacher_material_completions(uuid) TO authenticated;

-- ── 5. verification ────────────────────────────────────────────────────────
--   SELECT proname, proacl FROM pg_proc
--    WHERE proname IN ('guest_mark_material','teacher_material_completions');
--   \dp public.guest_material_completions
--   SELECT count(*) FROM public.guest_material_completions;
