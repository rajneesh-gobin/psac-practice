-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — GUEST ASSIGNMENT HARDENING
--
--  Three defects found while reviewing the guest flow. All three are in code
--  I wrote in supabase-guest-assignments.sql.
--
--  H1  PIN brute-force. guest_pin_attempts is keyed (assignment_id, name_key),
--      so the 5-try lockout is PER NAME. An attacker just varies the name:
--      10,000 possible PINs / 5 tries = 2,000 names and they are in. Adds a
--      per-ASSIGNMENT counter on top of the per-name one.
--
--  H2  Seat leak. guest_open() inserted the submission row (reserving one of
--      max_students) as soon as a child opened the link. One mistyped name
--      burned a seat permanently. Capacity is now counted against children who
--      actually SUBMITTED, plus anyone who started recently.
--
--  H3  Decorative timer. duration_mins was enforced only by client JS, so a
--      refresh reset it and guest_submit never checked elapsed time. Now
--      recorded server-side and flagged on submit.
--
--  Safe to run: the guest tables are empty, and every change is additive.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── H1 · per-assignment brute-force counter ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.guest_assignment_attempts (
  assignment_id uuid        PRIMARY KEY REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  fails         int         NOT NULL DEFAULT 0,
  window_start  timestamptz NOT NULL DEFAULT now(),
  locked_until  timestamptz
);

ALTER TABLE public.guest_assignment_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.guest_assignment_attempts FROM anon, authenticated;

-- Records a failure and returns true when the WHOLE assignment is locked.
-- Window resets hourly so a legitimately busy class is not punished for a
-- scattering of typos across the afternoon.
CREATE OR REPLACE FUNCTION public.guest_note_failure(p_assignment uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_max     CONSTANT int := 40;                       -- fails per hour, all names
  v_lock    CONSTANT interval := interval '15 minutes';
  v_row     public.guest_assignment_attempts%ROWTYPE;
BEGIN
  INSERT INTO public.guest_assignment_attempts (assignment_id, fails, window_start)
  VALUES (p_assignment, 1, now())
  ON CONFLICT (assignment_id) DO UPDATE
    SET fails = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                     THEN 1 ELSE public.guest_assignment_attempts.fails + 1 END,
        window_start = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                            THEN now() ELSE public.guest_assignment_attempts.window_start END
  RETURNING * INTO v_row;

  IF v_row.fails >= v_max THEN
    UPDATE public.guest_assignment_attempts
       SET locked_until = now() + v_lock WHERE assignment_id = p_assignment;
    RETURN true;
  END IF;
  RETURN false;
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_note_failure(uuid) FROM public, anon, authenticated;


-- ── guest_open, rewritten with H1 + H2 + H3 ─────────────────────────────────
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
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- H1: assignment-wide lock beats any per-name reset.
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

  IF NOT FOUND THEN
    -- H2: only SUBMITTED children, plus anyone who started within the last two
    -- hours, count against capacity. An abandoned typo frees its seat.
    SELECT count(*) INTO v_taken FROM public.guest_submissions
     WHERE assignment_id = v_a.id
       AND (submitted_at IS NOT NULL OR started_at > now() - interval '2 hours');
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions (assignment_id, name_display, name_key, ip, user_agent)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua);
  ELSE
    -- H3: a granted retry restarts the clock.
    UPDATE public.guest_submissions SET started_at = now() WHERE id = v_sub.id;
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'is_retry', coalesce(v_sub.retry_allowed, false));
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_open(text,text,text,text,text) FROM public, anon, authenticated;


-- ── H3 · guest_submit records overtime ──────────────────────────────────────
-- Deliberately NOT rejected: a child who ran over should not lose their work,
-- and clock skew or a slow phone should not void an honest attempt. The
-- teacher sees the flag and the elapsed time and decides.
ALTER TABLE public.guest_submissions
  ADD COLUMN IF NOT EXISTS elapsed_secs int,
  ADD COLUMN IF NOT EXISTS over_time    boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.guest_submit(
  p_code text, p_name text, p_answers jsonb, p_score int, p_total int
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_a   public.guest_assignments%ROWTYPE;
  v_key text := lower(btrim(p_name));
  v_sub public.guest_submissions%ROWTYPE;
  v_pct int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
  v_el  int;
  v_over boolean := false;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  v_el := extract(epoch FROM (now() - v_sub.started_at))::int;
  IF v_a.duration_mins IS NOT NULL THEN
    v_over := v_el > (v_a.duration_mins * 60) + 60;   -- 60s grace for slow submits
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false, submitted_at = now(),
         elapsed_secs = v_el, over_time = v_over
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label,
    'elapsed_secs', v_el, 'over_time', v_over);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_submit(text,text,jsonb,int,int) FROM public, anon, authenticated;


-- ── Surface the new fields to the teacher ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.guest_results(p_assignment_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_a public.guest_assignments%ROWTYPE; v_rows jsonb;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', s.name_display, 'name_key', s.name_key,
           'score', s.score, 'total', s.total, 'pct', s.pct,
           'attempt', s.attempt, 'retry_allowed', s.retry_allowed,
           'elapsed_secs', s.elapsed_secs, 'over_time', s.over_time,
           'answers', s.answers, 'submitted_at', s.submitted_at)
         ORDER BY s.submitted_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows FROM public.guest_submissions s WHERE s.assignment_id = v_a.id;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object('id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'question_ids', v_a.question_ids, 'question_count', v_a.question_count,
      'classroom', v_a.classroom_label, 'due_at', v_a.due_at,
      'expires_at', v_a.expires_at, 'status', v_a.status, 'max_students', v_a.max_students),
    'submissions', v_rows);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.guest_results(uuid) TO authenticated;

COMMIT;

NOTIFY pgrst, 'reload schema';
