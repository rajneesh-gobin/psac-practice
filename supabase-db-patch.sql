-- ═══════════════════════════════════════════════════════════════════════════
--  MathMaster — DB Alignment Patch
--  Run this in Supabase → SQL Editor
--  Fixes: C-2 (admin RLS), C-3 (plans RLS), H-1 (missing plans),
--         H-2 (verify_student_pin lockout + expiry), M-1 (hide PIN from response)
-- ═══════════════════════════════════════════════════════════════════════════

-- ── C-2: Admin can read ALL profiles (not just their own) ────────────────
-- The existing "user_owns" policy only returns the admin's own row.
-- Add a second policy that grants full access when the caller's role = admin.

DROP POLICY IF EXISTS "admin_all" ON public.profiles;
CREATE POLICY "admin_all" ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin')
    )
  );

-- ── C-3: Admin can UPDATE the plans table ────────────────────────────────
-- Current policy is SELECT-only (anon_read). Add an UPDATE policy for admins.

DROP POLICY IF EXISTS "admin_update" ON public.plans;
CREATE POLICY "admin_update" ON public.plans
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin')
    )
  );

-- ── H-1: Seed missing plan rows (starter + premium) ──────────────────────
-- subscriptions.plan_id and payments.plan_id FK → plans(id)
-- Activating any non-free plan caused a FK violation.

INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
VALUES
  ('starter', 'Starter', 150, 2,
   '["Unlimited practice questions","Progress tracking","Community forum","Priority support"]',
   true),
  ('premium', 'Premium', 350, 5,
   '["Unlimited practice questions","Progress tracking","Community forum","Priority support","Teacher access","Printable exam papers","Advanced analytics"]',
   true)
ON CONFLICT (id) DO UPDATE
  SET name        = EXCLUDED.name,
      price_mur   = EXCLUDED.price_mur,
      max_children= EXCLUDED.max_children,
      features    = EXCLUDED.features,
      is_active   = EXCLUDED.is_active;

-- ── H-2 + M-1: Improved verify_student_pin ───────────────────────────────
-- Fixes:
--   H-2: Now checks students.expires_at and returns 'account_expired'
--   H-2: PIN attempt tracking via students.settings jsonb (no extra table needed)
--   M-1: PIN hash is excluded from the returned student object

-- Ensure pgcrypto is available for crypt():
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.verify_student_pin(
  p_username TEXT,
  p_pin      TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student        public.students%ROWTYPE;
  v_max_tries      CONSTANT INT    := 5;
  v_lockout_secs   CONSTANT INT    := 300; -- 5 minutes
  v_attempts       INT;
  v_locked_until   TIMESTAMPTZ;
  v_settings       JSONB;
  v_now            TIMESTAMPTZ := NOW();
  v_pin_correct    BOOLEAN;
BEGIN
  -- 1. Find student (case-insensitive username)
  SELECT * INTO v_student
  FROM public.students
  WHERE lower(username) = lower(p_username)
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'User not found');
  END IF;

  -- 2. Check account expiry
  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  -- 3. Read lockout state from settings jsonb
  v_settings    := COALESCE(v_student.settings, '{}'::jsonb);
  v_attempts    := COALESCE((v_settings->>'pin_attempts')::INT, 0);
  v_locked_until := (v_settings->>'pin_locked_until')::TIMESTAMPTZ;

  -- 4. Check if currently locked out
  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object(
      'ok',        false,
      'locked',    true,
      'secsLeft',  EXTRACT(EPOCH FROM (v_locked_until - v_now))::INT
    );
  END IF;

  -- 5. Verify PIN (supports both plaintext dev PINs and bcrypt prod hashes)
  IF v_student.pin IS NULL THEN
    v_pin_correct := false;
  ELSIF v_student.pin = p_pin THEN
    -- plaintext match (dev / pre-bcrypt migration)
    v_pin_correct := true;
  ELSE
    -- bcrypt match
    v_pin_correct := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;

  -- 6a. PIN correct → reset attempt counter, return student (without pin hash)
  IF v_pin_correct THEN
    UPDATE public.students
    SET settings = settings
      - 'pin_attempts'
      - 'pin_locked_until'
    WHERE id = v_student.id;

    RETURN jsonb_build_object(
      'ok',     true,
      'student', (
        SELECT jsonb_build_object(
          'id',              id,
          'family_id',       family_id,
          'username',        username,
          'display_name',    display_name,
          'avatar',          avatar,
          'grade',           grade,
          'settings',        settings,
          'session_version', session_version,
          'expires_at',      expires_at
        )
        FROM public.students WHERE id = v_student.id
      )
    );
  END IF;

  -- 6b. PIN wrong → increment attempts, maybe lock
  v_attempts := v_attempts + 1;
  IF v_attempts >= v_max_tries THEN
    -- Lock out for 5 minutes
    UPDATE public.students
    SET settings = settings
      || jsonb_build_object('pin_attempts', v_attempts, 'pin_locked_until', v_now + (v_lockout_secs || ' seconds')::INTERVAL)
    WHERE id = v_student.id;

    RETURN jsonb_build_object(
      'ok',           false,
      'locked',       true,
      'secsLeft',     v_lockout_secs,
      'attemptsLeft', 0
    );
  ELSE
    UPDATE public.students
    SET settings = settings || jsonb_build_object('pin_attempts', v_attempts)
    WHERE id = v_student.id;

    RETURN jsonb_build_object(
      'ok',           false,
      'error',        'Incorrect PIN',
      'attemptsLeft', v_max_tries - v_attempts
    );
  END IF;
END;
$$;

-- Grant execute to anon and authenticated roles (needed for client-side RPC calls):
GRANT EXECUTE ON FUNCTION public.verify_student_pin(TEXT, TEXT) TO anon, authenticated;

-- ── Also fix set_student_pin to clear lockout state on PIN change ─────────
CREATE OR REPLACE FUNCTION public.set_student_pin(
  p_student_id UUID,
  p_pin        TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.students
  SET pin      = crypt(p_pin, gen_salt('bf')),
      settings = settings - 'pin_attempts' - 'pin_locked_until'
  WHERE id = p_student_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_student_pin(UUID, TEXT) TO anon, authenticated;
