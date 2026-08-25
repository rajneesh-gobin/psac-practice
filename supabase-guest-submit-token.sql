-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — GUEST SUBMISSION INTEGRITY
--
--  B1  Anyone could overwrite anyone's marks.
--      assignment-submit takes { code, name, answers } and guest_submit only
--      checked that a submission row existed. The share code goes to the whole
--      class on WhatsApp and first names are public, so a child could submit as
--      a classmate and replace their score. Requiring the PIN does not help -
--      every pupil in the class has the same PIN.
--
--      Fix: guest_open() now issues a per-attempt token, returned ONLY to the
--      browser that answered the PIN correctly. guest_submit() requires it.
--      A classmate cannot guess 32 bytes of random hex.
--
--  B2  The timer reset on every refresh.
--      guest_open's ELSE branch reset started_at whenever an unfinished row
--      existed, so a child could refresh for a fresh clock. started_at is now
--      only reset for a genuine granted retry.
--
--  Safe to run: the guest tables are empty.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- Only the hash is stored, same as student_sessions: a database leak must not
-- hand out the ability to submit as somebody else.
ALTER TABLE public.guest_submissions
  ADD COLUMN IF NOT EXISTS open_token_hash text;

CREATE OR REPLACE FUNCTION public.guest_open(
  p_code text, p_name text, p_pin text, p_ip text DEFAULT NULL, p_ua text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_a          public.guest_assignments%ROWTYPE;
  v_key        text;
  v_att        public.guest_pin_attempts%ROWTYPE;
  v_glob       public.guest_assignment_attempts%ROWTYPE;
  v_max_tries  CONSTANT int := 5;
  v_lock_mins  CONSTANT int := 10;
  v_taken      int;
  v_sub        public.guest_submissions%ROWTYPE;
  v_locked_all boolean;
  v_token      text;
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  SELECT * INTO v_glob FROM public.guest_assignment_attempts WHERE assignment_id = v_a.id;
  IF FOUND AND v_glob.locked_until IS NOT NULL AND v_glob.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_glob.locked_until - now()))::int, 'scope', 'assignment');
  END IF;

  SELECT * INTO v_att FROM public.guest_pin_attempts
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF FOUND AND v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_att.locked_until - now()))::int, 'scope', 'name');
  END IF;

  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  IF v_a.pin_hash IS NULL OR crypt(p_pin, v_a.pin_hash) <> v_a.pin_hash THEN
    v_locked_all := public.guest_note_failure(v_a.id);
    INSERT INTO public.guest_pin_attempts (assignment_id, name_key, attempts, updated_at)
    VALUES (v_a.id, v_key, 1, now())
    ON CONFLICT (assignment_id, name_key) DO UPDATE
      SET attempts     = public.guest_pin_attempts.attempts + 1,
          locked_until = CASE WHEN public.guest_pin_attempts.attempts + 1 >= v_max_tries
                              THEN now() + (v_lock_mins || ' minutes')::interval END,
          updated_at   = now()
    RETURNING * INTO v_att;

    IF v_locked_all THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked', 'secsLeft', 900, 'scope', 'assignment');
    END IF;
    IF v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked',
        'secsLeft', v_lock_mins * 60, 'scope', 'name');
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
      'attemptsLeft', greatest(0, v_max_tries - v_att.attempts));
  END IF;

  DELETE FROM public.guest_pin_attempts WHERE assignment_id = v_a.id AND name_key = v_key;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;

  IF FOUND AND v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken',
      'name', v_sub.name_display, 'pct', v_sub.pct);
  END IF;

  -- B1: a fresh token for every successful open.
  v_token := encode(gen_random_bytes(32), 'hex');

  IF NOT FOUND THEN
    SELECT count(*) INTO v_taken FROM public.guest_submissions
     WHERE assignment_id = v_a.id
       AND (submitted_at IS NOT NULL OR started_at > now() - interval '2 hours');
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions
      (assignment_id, name_display, name_key, ip, user_agent, open_token_hash)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua,
            encode(digest(v_token, 'sha256'), 'hex'));
  ELSE
    -- B2: the clock restarts ONLY for a genuine granted retry. Reopening an
    -- unfinished attempt keeps the original started_at, so refreshing the page
    -- no longer buys more time.
    UPDATE public.guest_submissions
       SET open_token_hash = encode(digest(v_token, 'sha256'), 'hex'),
           started_at = CASE WHEN v_sub.retry_allowed THEN now() ELSE started_at END
     WHERE id = v_sub.id;
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'token', v_token,
    'is_retry', coalesce(v_sub.retry_allowed, false));
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_open(text,text,text,text,text) FROM public, anon, authenticated;


CREATE OR REPLACE FUNCTION public.guest_submit(
  p_code text, p_name text, p_answers jsonb, p_score int, p_total int, p_token text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_a    public.guest_assignments%ROWTYPE;
  v_key  text := lower(btrim(p_name));
  v_sub  public.guest_submissions%ROWTYPE;
  v_pct  int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
  v_el   int;
  v_over boolean := false;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  -- B1: only the browser that opened this attempt may submit it.
  IF v_sub.open_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.open_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  v_el := extract(epoch FROM (now() - v_sub.started_at))::int;
  IF v_a.duration_mins IS NOT NULL THEN
    v_over := v_el > (v_a.duration_mins * 60) + 60;
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false, submitted_at = now(),
         elapsed_secs = v_el, over_time = v_over,
         open_token_hash = NULL          -- one token, one submission
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label,
    'elapsed_secs', v_el, 'over_time', v_over);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_submit(text,text,jsonb,int,int,text) FROM public, anon, authenticated;

-- Drop the old 5-argument signature so nothing can call the unauthenticated
-- version by accident.
DROP FUNCTION IF EXISTS public.guest_submit(text, text, jsonb, int, int);

COMMIT;

NOTIFY pgrst, 'reload schema';
