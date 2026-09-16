-- ─────────────────────────────────────────────────────────────────────────
-- Ask a friend: minutes, not hours — and a way out. 2026-09-16
--
-- ⚠ THE ORIGINAL DURATIONS WERE WRONG FOR THE SITUATION. 1 / 6 / 24 hours was
--   designed as though this were homework a child sets down and returns to. It
--   is not: the child is MID-QUESTION, in a practice run, with the question in
--   front of them. Nobody waits 24 hours on that screen, and a link that
--   outlives the session is a public URL nobody is watching.
--   3 / 5 / 10 minutes matches what actually happens — a child messages a
--   friend and waits a moment — and matches the game's own crowd lifeline,
--   which has always been 3 minutes.
--
-- ⚠ AND A CHILD MUST BE ABLE TO GIVE UP. Without a cancel, the only honest
--   thing to do while waiting is nothing, which is the opposite of practice.
--   help_poll_cancel() closes the poll immediately so the child can answer and
--   move on, and so anyone who opens the link afterwards is told it is over
--   rather than voting into a void.
-- ─────────────────────────────────────────────────────────────────────────

-- ── 1. Minutes ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.help_poll_create(
  p_question text,
  p_options  jsonb,
  p_minutes  integer DEFAULT 5
)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_code    text;
  v_n       integer;
  v_minutes integer;
  v_expires timestamptz;
BEGIN
  IF v_student IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_signed_in'); END IF;
  IF p_question IS NULL OR length(btrim(p_question)) NOT BETWEEN 1 AND 4000 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_question');
  END IF;
  IF jsonb_typeof(p_options) <> 'array' OR jsonb_array_length(p_options) NOT BETWEEN 2 AND 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_options');
  END IF;

  -- ⚠ CHOSEN FROM A LIST, never taken as a number. An arbitrary integer here is
  --   a free "keep this public URL alive for a year" primitive.
  v_minutes := CASE coalesce(p_minutes, 5)
                 WHEN 3  THEN 3
                 WHEN 5  THEN 5
                 WHEN 10 THEN 10
                 ELSE 5
               END;

  DELETE FROM public.minigame_polls WHERE expires_at < now() - interval '1 day';

  -- A stuck child asks a few times an afternoon. Six an hour is generous for
  -- that and useless as bulk storage.
  SELECT count(*) INTO v_n FROM public.minigame_polls
   WHERE student_id = v_student AND kind = 'help' AND created_at > now() - interval '1 hour';
  IF v_n >= 6 THEN RETURN jsonb_build_object('ok', false, 'error', 'too_many'); END IF;

  v_code    := upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
  v_expires := now() + make_interval(mins => v_minutes);

  INSERT INTO public.minigame_polls(code, student_id, question, options, votes, expires_at, kind)
  VALUES (v_code, v_student, p_question, p_options,
          (SELECT jsonb_agg(0) FROM jsonb_array_elements(p_options)),
          v_expires, 'help');

  -- ⚠ expires_at is returned so the SHARE MESSAGE can name a real clock time.
  --   "closes in 5 minutes" is read whenever the message is opened, which may
  --   be four minutes later; an absolute time cannot go stale that way.
  RETURN jsonb_build_object('ok', true, 'code', v_code,
                            'seconds', v_minutes * 60, 'minutes', v_minutes,
                            'expires_at', v_expires);
END $function$;

-- ── 2. Cancel ────────────────────────────────────────────────────────────
-- ⚠ Owner only, and that is the whole security model here: current_student_id()
--   must match the row's student_id, so one child cannot close another's poll.
-- ⚠ It EXPIRES the poll rather than deleting it. A voter who already has the
--   page open then sees "voting has closed" on their next refresh, which is
--   true, instead of "this poll has finished and been tidied away", which reads
--   like a broken link. The row is removed by the ordinary housekeeping later.
CREATE OR REPLACE FUNCTION public.help_poll_cancel(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_rows    integer;
BEGIN
  IF v_student IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_signed_in'); END IF;

  UPDATE public.minigame_polls
     SET expires_at = now()
   WHERE code = upper(btrim(p_code))
     AND student_id = v_student
     AND kind = 'help'
     AND expires_at > now();
  GET DIAGNOSTICS v_rows = ROW_COUNT;

  -- ⚠ Zero rows is NOT a failure the child should see. It means the poll had
  --   already closed on its own, or they tapped cancel twice - both of which
  --   end in exactly the state they asked for.
  RETURN jsonb_build_object('ok', true, 'closed', v_rows > 0);
END $function$;

-- ⚠ A child session is `anon` plus a token header, so anon is REQUIRED.
GRANT EXECUTE ON FUNCTION public.help_poll_create(text, jsonb, integer)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.help_poll_cancel(text)
  TO anon, authenticated, service_role;
