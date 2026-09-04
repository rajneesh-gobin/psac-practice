-- "Ask the Crowd" — the live audience-vote lifeline for the minigame arcade.
--
-- A child playing Peak Quest can turn one question into a short-lived public
-- poll: the app creates a row here, the child shares /v/<CODE> (vote.html), and
-- anyone with the link votes. The child's screen polls the counts live.
--
-- ⚠ THE CORRECT ANSWER IS NEVER STORED. The poll row carries question + options
-- only; which option is right stays in the child's browser. A voter cannot
-- learn the answer from the server, and neither can the child by re-reading it.
--
-- ⚠ No table grants at all — RLS on, every access through the three RPCs, same
-- discipline as credit_ledger. A later policy mistake cannot open a hole with
-- no grant behind it.
--
-- Voting dedup is deliberately soft (localStorage on vote.html, plus a hard cap
-- of 500 votes per poll and a 3-minute lifetime). This is a children's game
-- lifeline, not an election: the failure a determined double-voter can cause is
-- a skewed bar chart that vanishes three minutes later.
--
-- Run once in the Supabase SQL editor. Idempotent.
BEGIN;

DO $$ BEGIN
  IF to_regprocedure('public.current_student_id()') IS NULL
     OR to_regclass('public.students') IS NULL THEN
    RAISE EXCEPTION 'current_student_id() and students are required';
  END IF;
END $$;

-- FK to students ON DELETE CASCADE on purpose: unlike the five text-keyed
-- orphan tables, deleting a child (or the admin purge cascading through the
-- family) takes their polls with it — nothing new for admin-delete-account.js
-- to remember.
CREATE TABLE IF NOT EXISTS public.minigame_polls (
  code       text PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  question   text NOT NULL,
  options    jsonb NOT NULL,
  votes      jsonb NOT NULL DEFAULT '[0,0,0,0]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
ALTER TABLE public.minigame_polls ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.minigame_polls FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.minigame_poll_create(p_question text, p_options jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE v_student uuid := public.current_student_id(); v_code text; v_n integer;
BEGIN
  IF v_student IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_signed_in'); END IF;
  IF p_question IS NULL OR length(btrim(p_question)) NOT BETWEEN 1 AND 4000 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_question');
  END IF;
  IF jsonb_typeof(p_options) <> 'array' OR jsonb_array_length(p_options) NOT BETWEEN 2 AND 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_options');
  END IF;

  -- Housekeeping ON CREATE, not a cron: a day-old poll is unreadable anyway
  -- (results checks expiry), this just stops the table growing forever.
  DELETE FROM public.minigame_polls WHERE expires_at < now() - interval '1 day';

  -- The game hands out one crowd poll per climb; 12/hour absorbs enthusiastic
  -- replays while making the endpoint useless as free bulk storage.
  SELECT count(*) INTO v_n FROM public.minigame_polls
   WHERE student_id = v_student AND created_at > now() - interval '1 hour';
  IF v_n >= 12 THEN RETURN jsonb_build_object('ok', false, 'error', 'too_many'); END IF;

  v_code := upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
  INSERT INTO public.minigame_polls(code, student_id, question, options, votes, expires_at)
  VALUES (v_code, v_student, p_question, p_options,
          -- one zero per option, so a 2-option poll never reports phantom slots
          (SELECT jsonb_agg(0) FROM jsonb_array_elements(p_options)),
          now() + interval '3 minutes');

  RETURN jsonb_build_object('ok', true, 'code', v_code, 'seconds', 180);
END $$;

CREATE OR REPLACE FUNCTION public.minigame_poll_vote(p_code text, p_option integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE p public.minigame_polls%ROWTYPE; total integer;
BEGIN
  SELECT * INTO p FROM public.minigame_polls WHERE code = upper(btrim(p_code)) FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF p.expires_at < now() THEN RETURN jsonb_build_object('ok', false, 'error', 'closed'); END IF;
  IF p_option IS NULL OR p_option < 0 OR p_option >= jsonb_array_length(p.options) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_option');
  END IF;
  SELECT coalesce(sum(v::integer), 0) INTO total FROM jsonb_array_elements_text(p.votes) v;
  IF total >= 500 THEN RETURN jsonb_build_object('ok', false, 'error', 'full'); END IF;

  UPDATE public.minigame_polls
     SET votes = jsonb_set(votes, ARRAY[p_option::text],
                           to_jsonb(coalesce((votes->>p_option)::integer, 0) + 1))
   WHERE code = p.code
   RETURNING votes INTO p.votes;

  RETURN jsonb_build_object('ok', true, 'votes', p.votes);
END $$;

CREATE OR REPLACE FUNCTION public.minigame_poll_results(p_code text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE p public.minigame_polls%ROWTYPE;
BEGIN
  SELECT * INTO p FROM public.minigame_polls WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  RETURN jsonb_build_object('ok', true,
    'question', p.question, 'options', p.options, 'votes', p.votes,
    'seconds_left', greatest(0, floor(extract(epoch from (p.expires_at - now()))))::integer);
END $$;

-- ⚠ anon AND authenticated on all three: a child session is anon + a token
-- header (create relies on the token via current_student_id()), and a voter is
-- plain anon. authenticated-only grants are how the friend RPCs ended up dead.
REVOKE ALL ON FUNCTION public.minigame_poll_create(text, jsonb),
              public.minigame_poll_vote(text, integer),
              public.minigame_poll_results(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.minigame_poll_create(text, jsonb),
                          public.minigame_poll_vote(text, integer),
                          public.minigame_poll_results(text) TO anon, authenticated, service_role;

COMMIT;
