-- ─────────────────────────────────────────────────────────────────────────
-- Make the daily counter honest. 2026-09-16
--
-- ⚠ THE COUNTER WAS UNDER-COUNTING. When the budget landed, only the two BULK
--   senders (admin-broadcast, weekly-digest) reserved from it. The three
--   transactional senders — the admin activation email, the homework notice and
--   the teacher approval — sent without recording anything at all.
--
--   So the counter tracked bulk only, while the PROVIDER counted everything.
--   80 bulk plus 30 transactional is 110 real sends against Resend's 100, and
--   the counter would still read 80 and cheerfully authorise more. The 20-email
--   reserve was notional: it protected headroom nothing was measured against.
--
-- The fix is a record-only increment. Transactional mail is still NEVER refused
-- — it just says what it spent, so the bulk ceiling means something.
--
-- ⚠ It has no ceiling and cannot fail. A send that has ALREADY HAPPENED must be
--   recorded whatever the count now reads; refusing to record it would be the
--   one thing worse than not counting it.
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.mail_quota_record(p_n integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_sent integer;
BEGIN
  IF p_n IS NULL OR p_n <= 0 THEN RETURN jsonb_build_object('ok', true, 'recorded', 0); END IF;

  INSERT INTO public.mail_quota(day, sent) VALUES (current_date, p_n)
  ON CONFLICT (day) DO UPDATE
    SET sent = public.mail_quota.sent + p_n, updated_at = now()
  RETURNING sent INTO v_sent;

  RETURN jsonb_build_object('ok', true, 'recorded', p_n, 'sent_today', v_sent);
END $function$;

REVOKE ALL ON FUNCTION public.mail_quota_record(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mail_quota_record(integer) TO service_role;
