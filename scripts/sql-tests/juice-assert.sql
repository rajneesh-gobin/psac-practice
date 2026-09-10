-- Assertions for migrations/20260910_manual_juice_payments.sql.
--
-- ⚠ These run as `authenticated`, never as the superuser. RLS, the grants and
--   the is_admin() guard are half of what is being tested, and a superuser is
--   subject to none of them.
--
-- Identity is switched with SET test.uid, which the bootstrap's auth.uid()
-- reads. Nothing else is stubbed: every call below is the real function.

\set ON_ERROR_STOP on

\set PRIYA '''11111111-1111-1111-1111-111111111111'''
\set RAVI  '''22222222-2222-2222-2222-222222222222'''
\set PROBE '''33333333-3333-3333-3333-333333333333'''
\set ADMIN '''99999999-9999-9999-9999-999999999999'''

-- ══ 1. Shape and grants ════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: shape and grants'; END $$;

SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_indexes
         WHERE schemaname='public' AND indexname='payments_reference_uq')
       THEN 'PASS  reference is unique' ELSE 'FAIL  reference is not unique' END;

-- The idempotency key a real gateway webhook will need. Peach retries a
-- non-200 for 30 days and does not guarantee order.
SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_indexes
         WHERE schemaname='public' AND indexname='payments_provider_ref_uq')
       THEN 'PASS  (provider, provider_ref) is unique' ELSE 'FAIL  provider_ref is not unique' END;

-- ⚠ A child never pays. anon must not reach any of the four action functions.
SELECT CASE WHEN NOT (
         has_function_privilege('anon', 'public.payment_start_juice(text,integer)', 'EXECUTE') OR
         has_function_privilege('anon', 'public.payment_mark_sent(uuid,text)', 'EXECUTE') OR
         has_function_privilege('anon', 'public.payment_admin_confirm(uuid,text)', 'EXECUTE') OR
         has_function_privilege('anon', 'public.payment_admin_reject(uuid,text)', 'EXECUTE'))
       THEN 'PASS  anon cannot execute any payment action'
       ELSE 'SECURITY FINDING anon can execute a payment action' END;

SELECT CASE WHEN has_function_privilege('anon', 'public.payment_settings()', 'EXECUTE')
       THEN 'PASS  anon may read the public Juice settings'
       ELSE 'FAIL  the landing page cannot read the Juice number' END;

-- ⚠ payments is admin-write only at the RLS level. The functions are
--   SECURITY DEFINER for exactly that reason; a parent must never be able to
--   write their own payment row directly.
SET ROLE authenticated;
SET test.uid = :PRIYA;
SELECT CASE WHEN (SELECT count(*) FROM public.payments) = 0
       THEN 'PASS  a parent sees no payment rows before paying'
       ELSE 'FAIL  a parent can see payment rows that are not theirs' END;
DO $$
BEGIN
  INSERT INTO public.payments (user_id, plan_id, amount_mur, provider, status)
  VALUES (auth.uid(), 'family', 1, 'juice', 'confirmed');
  RAISE NOTICE 'SECURITY FINDING a parent inserted their own confirmed payment';
EXCEPTION WHEN insufficient_privilege OR check_violation THEN
  RAISE NOTICE 'PASS  a parent cannot insert a payment row directly [%]', SQLSTATE;
END $$;
RESET ROLE;

-- ══ 2. The settings reader publishes only what it is meant to ══════════════
DO $$ BEGIN RAISE NOTICE '-- juice: settings'; END $$;
SET ROLE authenticated;
SET test.uid = :PRIYA;
SELECT CASE WHEN public.payment_settings() ? 'juice_number'
        AND NOT (public.payment_settings() ? 'internal_only')
       THEN 'PASS  payment_settings() publishes the number and nothing else'
       ELSE 'SECURITY FINDING payment_settings() leaked a private key: '
            || public.payment_settings()::text END;
RESET ROLE;

-- ══ 3. Starting a payment ══════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: start'; END $$;
SET ROLE authenticated;
SET test.uid = :PROBE;

-- ⚠ The PRICE comes from plans.price_mur, never from the caller. There is no
--   parameter to pass one, and this is the assertion that keeps it that way.
SELECT CASE WHEN (public.payment_start_juice('family', 2) ->> 'amount_mur') = '900'
       THEN 'PASS  two months of a Rs 450 plan is Rs 900, priced server-side'
       ELSE 'SECURITY FINDING wrong amount: '
            || (public.payment_start_juice('family', 2) ->> 'amount_mur') END;

SELECT CASE WHEN (public.payment_start_juice('free', 1) ->> 'error') = 'plan_not_purchasable'
       THEN 'PASS  a free plan cannot be bought' ELSE 'FAIL  a free plan was purchasable' END;
SELECT CASE WHEN (public.payment_start_juice('retired', 1) ->> 'error') = 'unknown_plan'
       THEN 'PASS  an inactive plan cannot be bought' ELSE 'FAIL  an inactive plan was purchasable' END;
SELECT CASE WHEN (public.payment_start_juice('; drop table payments; --', 1) ->> 'error') = 'unknown_plan'
       THEN 'PASS  an unknown plan id is refused' ELSE 'FAIL  unknown plan accepted' END;

-- ⚠ Tapping Buy again must return the SAME reference. Four rows for one
--   transfer means an admin guessing which to confirm.
SELECT CASE WHEN (public.payment_start_juice('family', 2) ->> 'reference')
                 = (public.payment_start_juice('family', 2) ->> 'reference')
       THEN 'PASS  tapping Buy twice reuses one reference'
       ELSE 'FAIL  a second tap minted a second reference' END;
SELECT CASE WHEN (public.payment_start_juice('family', 2) ->> 'reused') = 'true'
       THEN 'PASS  and says so' ELSE 'FAIL  reuse not reported' END;

-- Months are clamped, not trusted.
SELECT CASE WHEN (public.payment_start_juice('family', 999) ->> 'months') = '12'
       THEN 'PASS  months clamp at 12' ELSE 'FAIL  months not clamped' END;
SELECT CASE WHEN (public.payment_start_juice('family', -5) ->> 'months') = '1'
       THEN 'PASS  months floor at 1' ELSE 'FAIL  negative months accepted' END;

-- The reference has to survive being read off a screen and typed into Juice.
SELECT CASE WHEN (public.payment_start_juice('family', 2) ->> 'reference') ~ '^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$'
       THEN 'PASS  reference is 6 unambiguous characters'
       ELSE 'FAIL  reference shape wrong' END;
RESET ROLE;

-- ══ 4. Nothing is granted before an admin confirms ═════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: no access before confirmation'; END $$;
SET ROLE authenticated;
SET test.uid = :PRIYA;
-- Priya's ONE payment: two months of the family plan. Named by (months, plan)
-- everywhere below, never by "the most recent".
SELECT public.payment_start_juice('family', 2) ->> 'reference' AS priya_ref;
SELECT public.payment_mark_sent(
  (SELECT id FROM public.payments
     WHERE user_id = auth.uid() AND plan_id = 'family' AND months = 2),
  'Juice ref 8891') ->> 'status' AS marked_sent;
RESET ROLE;

SELECT CASE WHEN (SELECT expires_at FROM public.profiles WHERE id = :PRIYA) IS NULL
       THEN 'PASS  saying "I have paid" grants nothing'
       ELSE 'SECURITY FINDING access granted without an admin confirming' END;
SELECT CASE WHEN NOT EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = :PRIYA)
       THEN 'PASS  and creates no subscription' ELSE 'SECURITY FINDING subscription created early' END;

-- ⚠ A parent must not be able to confirm their own payment.
SET ROLE authenticated;
SET test.uid = :PRIYA;
SELECT CASE WHEN (public.payment_admin_confirm(
         (SELECT id FROM public.payments
            WHERE user_id = auth.uid() AND plan_id = 'family' AND months = 2)
       ) ->> 'error') = 'not_admin'
       THEN 'PASS  a parent cannot confirm their own payment'
       ELSE 'SECURITY FINDING a parent confirmed their own payment' END;
RESET ROLE;
SELECT CASE WHEN (SELECT expires_at FROM public.profiles WHERE id = :PRIYA) IS NULL
       THEN 'PASS  and it really did nothing'
       ELSE 'SECURITY FINDING self-confirmation granted access' END;

-- ══ 5. The admin confirms ══════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: the grant'; END $$;
SET ROLE authenticated;
SET test.uid = :ADMIN;
SELECT CASE WHEN (public.payment_admin_confirm(
         (SELECT id FROM public.payments
            WHERE user_id = :PRIYA AND plan_id = 'family' AND months = 2),
         'JUICE-8891') ->> 'ok') = 'true'
       THEN 'PASS  an admin can confirm' ELSE 'FAIL  admin confirmation failed' END;
RESET ROLE;

-- ⚠ profiles.expires_at IS the gate questions.js reads. A subscription row
--   without it means a paying parent still reads as expired.
SELECT CASE WHEN (SELECT expires_at FROM public.profiles WHERE id = :PRIYA)
                 BETWEEN now() + interval '59 days' AND now() + interval '62 days'
       THEN 'PASS  two months of access lands on profiles.expires_at'
       ELSE 'FAIL  expires_at is ' || coalesce((SELECT expires_at FROM public.profiles WHERE id = :PRIYA)::text, 'NULL') END;

SELECT CASE WHEN (SELECT plan_id FROM public.subscriptions
                   WHERE user_id = :PRIYA AND status = 'active') = 'family'
       THEN 'PASS  and the active subscription selects the paid plan'
       ELSE 'FAIL  no active subscription for the paid plan' END;

-- The two must agree, or one of them is lying about when access ends.
SELECT CASE WHEN (SELECT s.expires_at FROM public.subscriptions s WHERE s.user_id = :PRIYA AND s.status='active')
                 = (SELECT p.expires_at FROM public.profiles p WHERE p.id = :PRIYA)
       THEN 'PASS  subscription and profile expiry agree'
       ELSE 'FAIL  subscription and profile expiry disagree' END;

-- ══ 6. Confirming twice ════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: idempotency'; END $$;
SET ROLE authenticated;
SET test.uid = :ADMIN;
SELECT CASE WHEN (public.payment_admin_confirm(
         (SELECT id FROM public.payments
            WHERE user_id = :PRIYA AND plan_id = 'family' AND months = 2)
       ) ->> 'already') = 'true'
       THEN 'PASS  a second confirm reports "already" instead of granting again'
       ELSE 'FAIL  double confirm was not detected' END;
RESET ROLE;

-- ⚠ THE assertion. Two admins on one queue, or one double-tap, must not buy
--   the parent four months for one transfer.
SELECT CASE WHEN (SELECT expires_at FROM public.profiles WHERE id = :PRIYA)
                 < now() + interval '62 days'
       THEN 'PASS  and did not extend the account a second time'
       ELSE 'SECURITY FINDING double confirm granted two months twice' END;
SELECT CASE WHEN (SELECT count(*) FROM public.subscriptions
                   WHERE user_id = :PRIYA AND status = 'active') = 1
       THEN 'PASS  exactly one active subscription' ELSE 'FAIL  more than one active subscription' END;

-- ══ 7. Renewing early ══════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: renewal'; END $$;
SET ROLE authenticated;
SET test.uid = :RAVI;
SELECT public.payment_start_juice('family', 1) ->> 'reference' AS ravi_ref;
RESET ROLE;
SET ROLE authenticated;
SET test.uid = :ADMIN;
SELECT public.payment_admin_confirm(
  (SELECT id FROM public.payments
     WHERE user_id = :RAVI AND plan_id = 'family' AND months = 1)) ->> 'ok' AS ravi_confirmed;
RESET ROLE;

-- ⚠ Ravi had 10 days left. One month must land at ~40 days, not ~30: paying
--   early must never throw away days already paid for.
SELECT CASE WHEN (SELECT expires_at FROM public.profiles WHERE id = :RAVI)
                 BETWEEN now() + interval '39 days' AND now() + interval '42 days'
       THEN 'PASS  renewing early adds to the days left, it does not reset them'
       ELSE 'FAIL  renewal landed at ' || (SELECT expires_at FROM public.profiles WHERE id = :RAVI)::text END;

-- ⚠ The old plan must stop selecting features the payment did not buy.
SELECT CASE WHEN (SELECT count(*) FROM public.subscriptions
                   WHERE user_id = :RAVI AND status = 'active') = 1
       THEN 'PASS  the previous plan was superseded, not left active'
       ELSE 'SECURITY FINDING two active subscriptions for one user' END;
SELECT CASE WHEN (SELECT plan_id FROM public.subscriptions
                   WHERE user_id = :RAVI AND status = 'active') = 'family'
       THEN 'PASS  and the active one is what was paid for' ELSE 'FAIL  wrong active plan' END;

-- ══ 8. Rejecting ═══════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: rejection'; END $$;
SET ROLE authenticated;
SET test.uid = :PRIYA;
SELECT public.payment_start_juice('family', 3) ->> 'reference' AS second_ref;
RESET ROLE;
SET ROLE authenticated;
SET test.uid = :ADMIN;
SELECT public.payment_admin_reject(
  (SELECT id FROM public.payments
     WHERE user_id = :PRIYA AND plan_id = 'family' AND months = 3),
  'No transfer received') ->> 'status' AS rejected;

-- ⚠ Rejection is not an undo button for a grant that already happened.
SELECT CASE WHEN (public.payment_admin_reject(
         (SELECT id FROM public.payments
            WHERE user_id = :PRIYA AND plan_id = 'family' AND months = 2)
       ) ->> 'error') = 'already_confirmed'
       THEN 'PASS  a confirmed payment cannot be rejected on the queue screen'
       ELSE 'FAIL  a confirmed payment was rejected in one tap' END;

-- ⚠ And a rejected one cannot then be confirmed.
SELECT CASE WHEN (public.payment_admin_confirm(
         (SELECT id FROM public.payments
            WHERE user_id = :PRIYA AND plan_id = 'family' AND months = 3)
       ) ->> 'error') = 'already_rejected'
       THEN 'PASS  a rejected payment cannot be confirmed afterwards'
       ELSE 'FAIL  a rejected payment was confirmed' END;
RESET ROLE;

-- ══ 9. Switched off ════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- juice: the off switch'; END $$;
UPDATE public.mm_data SET value = value || '{"juice_enabled": false}'::jsonb
 WHERE key = 'payment_settings';
SET ROLE authenticated;
SET test.uid = :RAVI;
SELECT CASE WHEN (public.payment_start_juice('family', 1) ->> 'error') = 'juice_disabled'
       THEN 'PASS  turning Juice off stops new payments at once'
       ELSE 'FAIL  a payment started while Juice was disabled' END;
RESET ROLE;

-- A number is as required as the switch: instructions with no number to send
-- to are worse than no button at all.
UPDATE public.mm_data SET value = value || '{"juice_enabled": true, "juice_number": ""}'::jsonb
 WHERE key = 'payment_settings';
SET ROLE authenticated;
SET test.uid = :RAVI;
SELECT CASE WHEN (public.payment_start_juice('family', 1) ->> 'error') = 'juice_disabled'
       THEN 'PASS  and so does an empty Juice number'
       ELSE 'FAIL  a payment started with no number to send to' END;
RESET ROLE;
