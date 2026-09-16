-- ─────────────────────────────────────────────────────────────────────────
-- "Ask a friend" on a practice question (2026-09-16)
--
-- Reuses the Ask-the-Crowd table the Peak Quest lifeline already writes to,
-- rather than adding a second poll system. Two things differ and both are why
-- this needs its own function rather than a wider `minigame_poll_create`:
--
--   1. LIFETIME. The game's poll is a 3-minute live moment. A child stuck on
--      homework sends a WhatsApp message and waits, so this one runs 1, 6 or 24
--      hours - chosen by the child when they create it.
--   2. BUDGET. The game hands out one crowd poll per climb and is capped at 12
--      an hour. Help requests are capped separately and lower, so an afternoon
--      of practice cannot exhaust the game's allowance or vice versa.
--
-- ⚠ CREATE OR REPLACE cannot change a signature, and two overloads a named
--   PostgREST call can both satisfy is an AMBIGUITY ERROR, not a fallback - so
--   `minigame_poll_create` is left exactly as it is and this is a new name.
--   `minigame_poll_results` and `minigame_poll_vote` keep their signatures and
--   serve both kinds; only the results body changes, to report `kind` so the
--   voting page can word itself correctly.
--
-- ⚠ THE CORRECT ANSWER IS STILL NEVER STORED. The row holds the question text
--   and the options and nothing else - that invariant is the whole reason this
--   link is safe to put on WhatsApp, and it must survive every future change.
-- ─────────────────────────────────────────────────────────────────────────

-- ── 1. Tell the two kinds apart ──────────────────────────────────────────
ALTER TABLE public.minigame_polls
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'game';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'minigame_polls_kind_check'
                    AND conrelid = 'public.minigame_polls'::regclass) THEN
    ALTER TABLE public.minigame_polls
      ADD CONSTRAINT minigame_polls_kind_check CHECK (kind IN ('game', 'help'));
  END IF;
END $$;

-- Rate limiting counts per kind and per student, and that count runs on every
-- create. Existing rows are all 'game' by virtue of the column default.
CREATE INDEX IF NOT EXISTS minigame_polls_student_kind_created_idx
  ON public.minigame_polls (student_id, kind, created_at DESC);

-- ── 2. help_poll_create ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.help_poll_create(
  p_question text,
  p_options  jsonb,
  p_minutes  integer DEFAULT 360
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
BEGIN
  IF v_student IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_signed_in'); END IF;
  IF p_question IS NULL OR length(btrim(p_question)) NOT BETWEEN 1 AND 4000 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_question');
  END IF;
  IF jsonb_typeof(p_options) <> 'array' OR jsonb_array_length(p_options) NOT BETWEEN 2 AND 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_options');
  END IF;

  -- ⚠ The duration is CHOSEN FROM A LIST, never taken as a number. An arbitrary
  --   integer here is a free "keep this public URL alive for a year" primitive.
  v_minutes := CASE coalesce(p_minutes, 360)
                 WHEN 60   THEN 60
                 WHEN 360  THEN 360
                 WHEN 1440 THEN 1440
                 ELSE 360
               END;

  DELETE FROM public.minigame_polls WHERE expires_at < now() - interval '1 day';

  -- A stuck child asks a few times an afternoon. Six an hour is generous for
  -- that and useless as bulk storage.
  SELECT count(*) INTO v_n FROM public.minigame_polls
   WHERE student_id = v_student AND kind = 'help' AND created_at > now() - interval '1 hour';
  IF v_n >= 6 THEN RETURN jsonb_build_object('ok', false, 'error', 'too_many'); END IF;

  v_code := upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
  INSERT INTO public.minigame_polls(code, student_id, question, options, votes, expires_at, kind)
  VALUES (v_code, v_student, p_question, p_options,
          (SELECT jsonb_agg(0) FROM jsonb_array_elements(p_options)),
          now() + make_interval(mins => v_minutes),
          'help');

  RETURN jsonb_build_object('ok', true, 'code', v_code, 'seconds', v_minutes * 60, 'minutes', v_minutes);
END $function$;

-- ── 3. results now reports the kind ──────────────────────────────────────
-- Same signature, so this is a body replacement and every deployed caller keeps
-- working: `kind` is an added key, nothing was removed or renamed.
CREATE OR REPLACE FUNCTION public.minigame_poll_results(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE p public.minigame_polls%ROWTYPE;
BEGIN
  SELECT * INTO p FROM public.minigame_polls WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  RETURN jsonb_build_object('ok', true,
    'question', p.question, 'options', p.options, 'votes', p.votes,
    'kind', coalesce(p.kind, 'game'),
    'seconds_left', greatest(0, floor(extract(epoch from (p.expires_at - now()))))::integer);
END $function$;

-- ── 4. Grants ────────────────────────────────────────────────────────────
-- ⚠ A child session is `anon` plus a token header, so anon is REQUIRED, not an
--   oversight. current_student_id() is what actually identifies the caller.
-- ⚠ A newly created function already carries EXECUTE for PUBLIC, and anon is a
--   member of PUBLIC - the grant below is still written explicitly so `proacl`
--   shows the intent rather than an inherited accident.
GRANT EXECUTE ON FUNCTION public.help_poll_create(text, jsonb, integer)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.minigame_poll_results(text)
  TO anon, authenticated, service_role;
