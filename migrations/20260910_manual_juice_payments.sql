-- ═══════════════════════════════════════════════════════════════════════════
--  Manual MCB Juice payments, end to end.
--
--  WHY MANUAL: Stripe does not accept Mauritius-registered merchants, and the
--  gateways that do (Peach, MIPS) cost Rs 550-2,200 a month before a single
--  rupee comes in. The widely used "MCB Juice plugin" for WooCommerce is not
--  an API integration either - it prints instructions and the merchant marks
--  the order paid by hand. This does the same thing properly: the parent gets
--  a reference to quote, the admin checks their Juice app, and confirming is
--  the ONLY thing that grants access.
--
--  THE FLOW
--    payment_start_juice()   parent picks a plan  -> pending row + reference
--    payment_mark_sent()     parent says they paid -> sent
--    payment_admin_confirm() admin verifies        -> confirmed + ACCESS GRANTED
--    payment_admin_reject()  admin refuses         -> rejected, nothing granted
--
--  ⚠ WHAT ACTUALLY UNLOCKS ACCESS, measured in netlify/functions/questions.js:
--      profiles.expires_at   IS the gate. Past it, the allowed list becomes
--                            exactly the live entitlements (questions.js:587).
--      subscriptions         status='active' selects which plan's features
--                            apply (questions.js:674). Its OWN expires_at is
--                            written but never read.
--    So a grant must move BOTH, or a paid parent still reads as expired while
--    holding an "active" subscription. That is why _grant() does the two
--    together and supersedes older active rows - one active row per user, and
--    no stale plan silently outliving the payment for it.
--
--  ⚠ NOTHING HERE TRUSTS THE CLIENT WITH A PRICE. The amount is read from
--    plans.price_mur inside the function. The browser only names a plan.
--
--  Idempotent. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. What a manual flow needs on the payments row ─────────────────────────
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS reference  text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS months     integer NOT NULL DEFAULT 1;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payer_note text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS claimed_at timestamp with time zone;

COMMENT ON COLUMN public.payments.reference  IS 'Short code the parent quotes in the Juice transfer note. Unique.';
COMMENT ON COLUMN public.payments.months     IS 'How many months of access this payment buys.';
COMMENT ON COLUMN public.payments.payer_note IS 'What the parent typed when they said they had paid - their Juice reference, usually.';
COMMENT ON COLUMN public.payments.claimed_at IS 'When the parent said they had sent the money. NULL until they do.';

-- ⚠ The reference is how an admin matches a Juice transfer to a row, so a
--   duplicate is a wrong grant. The index is the guard, not the generator.
CREATE UNIQUE INDEX IF NOT EXISTS payments_reference_uq
  ON public.payments (reference) WHERE reference IS NOT NULL;

-- ⚠ Idempotency for the day a real gateway webhook lands here. Peach retries a
--   non-200 for 30 days with exponential backoff and does not guarantee order,
--   so "have I already processed this?" has to be a database question.
CREATE UNIQUE INDEX IF NOT EXISTS payments_provider_ref_uq
  ON public.payments (provider, provider_ref) WHERE provider_ref IS NOT NULL;

CREATE INDEX IF NOT EXISTS payments_status_idx
  ON public.payments (status, created_at DESC);

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conrelid = 'public.payments'::regclass
                    AND conname  = 'payments_status_check') THEN
    ALTER TABLE public.payments ADD CONSTRAINT payments_status_check
      CHECK (status IN ('pending','sent','confirmed','rejected','failed'));
  END IF;
END
$do$;

-- ── 2. Where the Juice number lives ─────────────────────────────────────────
-- mm_data, like every other setting. Admin-writable, and read by everyone
-- through the function below rather than by opening the row.
INSERT INTO public.mm_data (key, value)
VALUES ('payment_settings', jsonb_build_object(
  'juice_enabled', false,
  'juice_number',  '',
  'juice_name',    '',
  'juice_note',    'Send the exact amount and put the reference in the message.'
))
ON CONFLICT (key) DO NOTHING;

-- ⚠ Builds the object field by field ON PURPOSE. Returning the stored jsonb
--   whole would publish whatever an admin later adds to that key - an internal
--   note, a threshold, a second number - to every signed-out visitor.
CREATE OR REPLACE FUNCTION public.payment_settings()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT jsonb_build_object(
    'juice_enabled', coalesce((v ->> 'juice_enabled')::boolean, false),
    'juice_number',  coalesce(v ->> 'juice_number', ''),
    'juice_name',    coalesce(v ->> 'juice_name', ''),
    'juice_note',    coalesce(v ->> 'juice_note', '')
  )
  FROM (SELECT coalesce((SELECT value FROM public.mm_data WHERE key = 'payment_settings'), '{}'::jsonb) AS v) s;
$function$;

-- ── 3. The parent starts a payment ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.payment_start_juice(p_plan_id text, p_months integer DEFAULT 1)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'pg_temp'
AS $function$
DECLARE
  -- No 0/O/1/I/L: this gets read off a screen and typed into a Juice message.
  ALPHABET constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  v_uid    uuid := auth.uid();
  v_cfg    jsonb := public.payment_settings();
  v_plan   public.plans%ROWTYPE;
  v_months integer := greatest(1, least(12, coalesce(p_months, 1)));
  v_open   integer;
  v_row    public.payments%ROWTYPE;
  v_ref    text;
  i        integer;
  t        integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF coalesce((v_cfg ->> 'juice_enabled')::boolean, false) IS NOT TRUE
     OR coalesce(v_cfg ->> 'juice_number', '') = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'juice_disabled');
  END IF;

  SELECT * INTO v_plan FROM public.plans WHERE id = p_plan_id;
  IF NOT FOUND OR v_plan.is_active IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_plan');
  END IF;
  -- A free plan has nothing to pay for, and charging Rs 0 would produce a
  -- reference an admin can never match to a transfer.
  IF coalesce(v_plan.price_mur, 0) <= 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'plan_not_purchasable');
  END IF;

  -- ⚠ Reuse rather than pile up. A parent who taps Buy four times must end up
  --   with ONE reference, or the admin sees four rows for one transfer and has
  --   to guess which to confirm.
  SELECT * INTO v_row FROM public.payments
   WHERE user_id = v_uid AND plan_id = p_plan_id AND months = v_months
     AND status IN ('pending','sent') AND reference IS NOT NULL
   ORDER BY created_at DESC LIMIT 1;
  IF FOUND THEN
    RETURN jsonb_build_object('ok', true, 'reused', true,
      'payment_id', v_row.id, 'reference', v_row.reference,
      'amount_mur', v_row.amount_mur, 'months', v_row.months,
      'status', v_row.status, 'plan_name', v_plan.name,
      'juice_number', v_cfg ->> 'juice_number', 'juice_name', v_cfg ->> 'juice_name',
      'juice_note', v_cfg ->> 'juice_note');
  END IF;

  SELECT count(*) INTO v_open FROM public.payments
   WHERE user_id = v_uid AND status IN ('pending','sent');
  IF v_open >= 5 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'too_many_open');
  END IF;

  FOR t IN 1..20 LOOP
    v_ref := '';
    FOR i IN 1..6 LOOP
      v_ref := v_ref || substr(ALPHABET, 1 + (get_byte(gen_random_bytes(1), 0) % length(ALPHABET)), 1);
    END LOOP;
    BEGIN
      INSERT INTO public.payments (user_id, plan_id, amount_mur, provider, status, reference, months)
      VALUES (v_uid, v_plan.id, v_plan.price_mur * v_months, 'juice', 'pending', v_ref, v_months)
      RETURNING * INTO v_row;
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      v_row.id := NULL;   -- collided; go round again
    END;
  END LOOP;

  IF v_row.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'reference_unavailable');
  END IF;

  RETURN jsonb_build_object('ok', true, 'reused', false,
    'payment_id', v_row.id, 'reference', v_row.reference,
    'amount_mur', v_row.amount_mur, 'months', v_row.months,
    'status', v_row.status, 'plan_name', v_plan.name,
    'juice_number', v_cfg ->> 'juice_number', 'juice_name', v_cfg ->> 'juice_name',
    'juice_note', v_cfg ->> 'juice_note');
END
$function$;

-- ── 4. The parent says they have sent it ────────────────────────────────────
-- Grants NOTHING. It moves the row up the admin's queue and records whatever
-- reference the parent read off their own Juice receipt.
CREATE OR REPLACE FUNCTION public.payment_mark_sent(p_payment_id uuid, p_payer_note text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.payments%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT * INTO v_row FROM public.payments
   WHERE id = p_payment_id AND user_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', true, 'status', 'confirmed', 'already', true);
  END IF;
  IF v_row.status NOT IN ('pending','sent') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_open');
  END IF;

  UPDATE public.payments
     SET status     = 'sent',
         claimed_at = coalesce(claimed_at, now()),
         payer_note = nullif(btrim(coalesce(p_payer_note, '')), '')
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'status', 'sent');
END
$function$;

-- ── 5. The grant ────────────────────────────────────────────────────────────
-- ⚠ The ONLY place access is created. Everything above this line is paperwork.
CREATE OR REPLACE FUNCTION public.payment_admin_confirm(p_payment_id uuid, p_provider_ref text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_row     public.payments%ROWTYPE;
  v_from    timestamptz;
  v_new_exp timestamptz;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_admin');
  END IF;

  SELECT * INTO v_row FROM public.payments WHERE id = p_payment_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;

  -- ⚠ Idempotent, and deliberately NOT an error. Two admins on the same queue,
  --   or one double-tap, must not grant two months for one transfer.
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', true, 'already', true,
      'expires_at', (SELECT expires_at FROM public.profiles WHERE id = v_row.user_id));
  END IF;
  IF v_row.status = 'rejected' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_rejected');
  END IF;

  -- ⚠ Extend from whichever is later. Confirming a renewal three days early
  --   must not throw away the days already paid for.
  SELECT greatest(now(), coalesce(expires_at, now())) INTO v_from
    FROM public.profiles WHERE id = v_row.user_id FOR UPDATE;
  IF v_from IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_account');
  END IF;
  v_new_exp := v_from + (v_row.months || ' months')::interval;

  -- One active subscription per user. A superseded row keeps its history but
  -- stops selecting a plan, so an old tier cannot outlive the payment for it.
  UPDATE public.subscriptions
     SET status = 'superseded'
   WHERE user_id = v_row.user_id AND status = 'active';

  INSERT INTO public.subscriptions (user_id, plan_id, status, started_at, expires_at)
  VALUES (v_row.user_id, v_row.plan_id, 'active', now(), v_new_exp);

  -- THE gate questions.js reads.
  UPDATE public.profiles SET expires_at = v_new_exp WHERE id = v_row.user_id;

  UPDATE public.payments
     SET status       = 'confirmed',
         processed_at = now(),
         provider_ref = coalesce(nullif(btrim(coalesce(p_provider_ref, '')), ''), provider_ref)
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'already', false,
    'user_id', v_row.user_id, 'plan_id', v_row.plan_id,
    'months', v_row.months, 'expires_at', v_new_exp);
END
$function$;

-- ── 6. Refusing one ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.payment_admin_reject(p_payment_id uuid, p_reason text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_row public.payments%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_admin');
  END IF;

  SELECT * INTO v_row FROM public.payments WHERE id = p_payment_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;
  -- ⚠ A confirmed payment is never rejected here. Access has already been
  --   granted; taking it back is a separate, deliberate act with its own
  --   audit trail, not a one-tap undo on a queue screen.
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_confirmed');
  END IF;

  UPDATE public.payments
     SET status       = 'rejected',
         processed_at = now(),
         notes        = nullif(btrim(coalesce(p_reason, '')), '')
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'status', 'rejected');
END
$function$;

-- ── 7. Grants ───────────────────────────────────────────────────────────────
-- ⚠ A CHILD NEVER CALLS ANY OF THESE. Paying is a parent's job and confirming
--   is an admin's, so anon is granted only the settings reader - which the
--   landing page shows to signed-out visitors.
GRANT EXECUTE ON FUNCTION public.payment_settings() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_start_juice(p_plan_id text, p_months integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_mark_sent(p_payment_id uuid, p_payer_note text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_admin_confirm(p_payment_id uuid, p_provider_ref text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_admin_reject(p_payment_id uuid, p_reason text) TO authenticated, service_role;

-- ⚠ REVOKING FROM anon IS NOT ENOUGH, and the harness caught exactly that:
--   a new function carries EXECUTE for PUBLIC (the '=X' entry), anon is a
--   member of PUBLIC, so has_function_privilege('anon', ...) stayed true after
--   revoking anon's own grant. PUBLIC has to lose it first; the named roles
--   above keep their explicit grants. ⚠ Check proacl afterwards, not this file.
REVOKE EXECUTE ON FUNCTION public.payment_start_juice(p_plan_id text, p_months integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.payment_mark_sent(p_payment_id uuid, p_payer_note text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.payment_admin_confirm(p_payment_id uuid, p_provider_ref text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.payment_admin_reject(p_payment_id uuid, p_reason text) FROM PUBLIC, anon;

COMMIT;
