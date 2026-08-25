-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — REFERRAL SYSTEM
--
--  Every parent/teacher profile gets a short, shareable referral_code. When a
--  brand-new account finishes family-setup (or teacher bootstrap) with a
--  pending code in hand, record_referral() credits whoever owns that code.
--
--  Scope, deliberately: this only records who invited whom and shows the
--  referrer their list + count. No reward logic (free tier months, plan
--  upgrades, etc.) exists yet — `referrals.status` already distinguishes
--  'joined' from 'subscribed' so that can be layered on later without another
--  migration, but nothing currently flips a row to 'subscribed'.
--
--  Why a dedicated code instead of reusing families.family_code: family_code
--  is shown to a parent as a private "add another device to this family"
--  secret (see Auth.completeSetup toast) — never meant to be pasted into a
--  WhatsApp group. Conflating the two would mean a publicly shared referral
--  link doubles as a family-join secret.
--
--  Privacy: the referrer only ever sees the referred person's display name
--  and join date via my_referrals() — never their email, and never a raw
--  SELECT on other people's profiles (profiles_select still only allows
--  id = auth.uid() OR is_admin()). Both RPCs are SECURITY DEFINER specifically
--  so they can look up "whose code is this" / "who did I refer" without
--  widening that policy.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1 · Column: profiles.referral_code ──────────────────────────────────────
-- Volatile DEFAULT ⇒ Postgres evaluates it per-row on ADD COLUMN, so every
-- existing profile gets its own code in this same statement, not just new ones.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referral_code text
    DEFAULT upper(substr(md5(gen_random_uuid()::text), 1, 8));

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_referral_code_key') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_referral_code_key UNIQUE (referral_code);
  END IF;
END
$do$;

ALTER TABLE public.profiles ALTER COLUMN referral_code SET NOT NULL;

CREATE INDEX IF NOT EXISTS profiles_referral_code_idx ON public.profiles(referral_code);


-- ── 2 · Table: referrals ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.referrals (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status      text        NOT NULL DEFAULT 'joined',
  created_at  timestamptz NOT NULL DEFAULT now()
);

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'referrals_referred_id_key') THEN
    ALTER TABLE public.referrals ADD CONSTRAINT referrals_referred_id_key UNIQUE (referred_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'referrals_no_self_chk') THEN
    ALTER TABLE public.referrals ADD CONSTRAINT referrals_no_self_chk CHECK (referrer_id <> referred_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'referrals_status_chk') THEN
    ALTER TABLE public.referrals ADD CONSTRAINT referrals_status_chk CHECK (status IN ('joined','subscribed'));
  END IF;
END
$do$;

CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON public.referrals(referrer_id);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Only the referrer may read their own rows. There is deliberately no
-- INSERT/UPDATE/DELETE policy — every write goes through record_referral()
-- below, which is SECURITY DEFINER and can only ever credit auth.uid() as the
-- referred party, never forge a row on someone else's behalf.
DROP POLICY IF EXISTS referrals_select_own ON public.referrals;
CREATE POLICY referrals_select_own ON public.referrals FOR SELECT
  USING (referrer_id = auth.uid());


-- ── 3 · Record a referral (called once, right after a new profile is created) ─
CREATE OR REPLACE FUNCTION public.record_referral(p_code text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_uid      uuid := auth.uid();
  v_referrer uuid;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF p_code IS NULL OR btrim(p_code) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_code');
  END IF;

  -- Idempotent: a retried call (flaky network, double-tap) must not error out
  -- or create a second row — it just reports the no-op.
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
  END IF;

  SELECT id INTO v_referrer FROM public.profiles
    WHERE referral_code = upper(btrim(p_code));

  IF v_referrer IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  IF v_referrer = v_uid THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self_referral');
  END IF;

  INSERT INTO public.referrals (referrer_id, referred_id) VALUES (v_referrer, v_uid);

  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN unique_violation THEN
  -- Race: two calls landed together. Same outcome as the EXISTS check above.
  RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.record_referral(text) FROM public, anon;
GRANT  EXECUTE ON FUNCTION public.record_referral(text) TO authenticated;


-- ── 4 · Read my referrals (list + client computes the count from array length) ─
CREATE OR REPLACE FUNCTION public.my_referrals()
RETURNS TABLE(referred_name text, status text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, extensions AS $fn$
  SELECT p.full_name, r.status, r.created_at
  FROM public.referrals r
  JOIN public.profiles p ON p.id = r.referred_id
  WHERE r.referrer_id = auth.uid()
  ORDER BY r.created_at DESC;
$fn$;

REVOKE EXECUTE ON FUNCTION public.my_referrals() FROM public, anon;
GRANT  EXECUTE ON FUNCTION public.my_referrals() TO authenticated;

COMMIT;

NOTIFY pgrst, 'reload schema';


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Every existing profile got a unique code:
--      SELECT count(*), count(DISTINCT referral_code) FROM public.profiles;
--
-- 2. As user A, find your own code (only your own row is readable):
--      SELECT referral_code FROM public.profiles WHERE id = auth.uid();
--
-- 3. As freshly-signed-up user B, credit A's code:
--      SELECT public.record_referral('ABCD1234');   -- {"ok": true}
--      SELECT public.record_referral('ABCD1234');   -- {"ok": false, "error": "already_referred"}
--      SELECT public.record_referral(<own code>);    -- {"ok": false, "error": "self_referral"}
--
-- 4. As user A, see who you referred:
--      SELECT * FROM public.my_referrals();          -- one row: B's name, 'joined', now()
--
-- 5. As user B (or anyone else), confirm you can't see A's referral list:
--      SELECT * FROM public.referrals WHERE referrer_id = '<A's id>';  -- 0 rows
