-- ─────────────────────────────────────────────────────────────────────────
-- A daily send budget, reserved before sending. 2026-09-16
--
-- Resend's free tier allows 100 emails a day. Without a budget the 101st send
-- simply fails at the provider, part-way through a broadcast, and the admin
-- learns about it from a failure count — after some recipients got the message
-- and others did not, with no record of which.
--
-- ⚠ RESERVE FIRST, SEND SECOND. `mail_quota_take` is an atomic reservation
--   under a row lock, not a read-then-write. Two admins broadcasting at once,
--   or a broadcast racing the Sunday digest cron, would both read "80 left" and
--   both send 80. The lock is the whole point of this being a function.
--
-- ⚠ current_date, NOT the Mauritius day key. Every OTHER day boundary in this
--   project is Mauritius local time (_muDayKey) because it describes when a
--   CHILD worked. This one describes when a PROVIDER's counter resets, and
--   Resend resets on UTC. Using the Mauritius day here would drift four hours
--   from the real cap and over-send every evening.
--
-- ⚠ A RESERVE IS KEPT BACK FOR TRANSACTIONAL MAIL. Bulk may take only
--   (cap - reserve); an activation email, a password-related notice or a
--   homework result is never refused by this. Letting a newsletter consume the
--   quota that a parent's account-activation email needs is the wrong failure:
--   one is a courtesy, the other is someone locked out.
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.mail_quota (
  day        date PRIMARY KEY,
  sent       integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mail_quota ENABLE ROW LEVEL SECURITY;

-- ⚠ No policy and no grant to anon/authenticated at all. Only the Worker (service
--   role) touches this, and a table with no write grant cannot be opened later
--   by a policy mistake — the same reasoning as credit_ledger and security_events.
GRANT SELECT, INSERT, UPDATE ON public.mail_quota TO service_role;

-- ── Reserve ──────────────────────────────────────────────────────────────
-- Returns how many sends were actually granted, which may be fewer than asked
-- for and may be zero. The caller must send exactly `granted`, never `p_want`.
CREATE OR REPLACE FUNCTION public.mail_quota_take(
  p_want    integer,
  p_cap     integer DEFAULT 100,
  p_reserve integer DEFAULT 0
)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_sent      integer;
  v_ceiling   integer;
  v_granted   integer;
BEGIN
  IF p_want IS NULL OR p_want < 0 THEN p_want := 0; END IF;
  -- Bulk stops at (cap - reserve); transactional passes p_reserve = 0 and may
  -- use the whole cap.
  v_ceiling := greatest(0, coalesce(p_cap, 100) - greatest(0, coalesce(p_reserve, 0)));

  INSERT INTO public.mail_quota(day, sent) VALUES (current_date, 0)
  ON CONFLICT (day) DO NOTHING;

  -- ⚠ FOR UPDATE. Without it two concurrent senders both read the same count
  --   and both believe they have the whole remainder.
  SELECT sent INTO v_sent FROM public.mail_quota WHERE day = current_date FOR UPDATE;

  v_granted := greatest(0, least(p_want, v_ceiling - v_sent));

  IF v_granted > 0 THEN
    UPDATE public.mail_quota
       SET sent = sent + v_granted, updated_at = now()
     WHERE day = current_date;
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'granted',   v_granted,
    'deferred',  p_want - v_granted,
    'sent_today', v_sent + v_granted,
    'remaining', greatest(0, v_ceiling - v_sent - v_granted),
    'ceiling',   v_ceiling,
    'cap',       coalesce(p_cap, 100));
END $function$;

-- ── Give back ────────────────────────────────────────────────────────────
-- ⚠ A reservation that was not spent MUST be returned, or a provider outage
--   burns the day's budget without a single email being delivered.
CREATE OR REPLACE FUNCTION public.mail_quota_release(p_n integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_sent integer;
BEGIN
  IF p_n IS NULL OR p_n <= 0 THEN RETURN jsonb_build_object('ok', true, 'released', 0); END IF;
  UPDATE public.mail_quota
     SET sent = greatest(0, sent - p_n), updated_at = now()
   WHERE day = current_date
  RETURNING sent INTO v_sent;
  RETURN jsonb_build_object('ok', true, 'released', p_n, 'sent_today', coalesce(v_sent, 0));
END $function$;

-- ── Peek (read-only, for the dry run) ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.mail_quota_peek(
  p_cap     integer DEFAULT 100,
  p_reserve integer DEFAULT 0
)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT jsonb_build_object(
    'ok', true,
    'sent_today', coalesce((SELECT sent FROM public.mail_quota WHERE day = current_date), 0),
    'remaining',  greatest(0, greatest(0, coalesce(p_cap,100) - greatest(0, coalesce(p_reserve,0)))
                              - coalesce((SELECT sent FROM public.mail_quota WHERE day = current_date), 0)),
    'ceiling',    greatest(0, coalesce(p_cap,100) - greatest(0, coalesce(p_reserve,0))),
    'cap',        coalesce(p_cap, 100));
$function$;

-- ⚠ service_role ONLY. These are called by the Worker with the service key; a
--   browser that could reserve quota could exhaust the day's budget for free.
REVOKE ALL ON FUNCTION public.mail_quota_take(integer, integer, integer)    FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mail_quota_release(integer)                   FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mail_quota_peek(integer, integer)             FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mail_quota_take(integer, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.mail_quota_release(integer)                TO service_role;
GRANT EXECUTE ON FUNCTION public.mail_quota_peek(integer, integer)          TO service_role;
