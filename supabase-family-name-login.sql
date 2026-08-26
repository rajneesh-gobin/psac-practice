-- ══════════════════════════════════════════════════════════════════
-- Family-name login: add p_family_name parameter to verify_student_pin
-- ══════════════════════════════════════════════════════════════════
--
-- WHY: username is unique per-family, not globally. Two children named
-- "shanvi" in different families can both be created, but the old RPC
-- used LIMIT 1 with no family filter so only one of them could log in.
-- Passing the family name at login pins the lookup to the right family.
--
-- WHAT CHANGED (only the SELECT at the top of the function):
--   old: SELECT … WHERE lower(username) = lower(p_username) LIMIT 1
--   new: if p_family_name given → JOIN families, filter by family_name
--        otherwise → old behaviour (backwards-compatible)
--
-- HOW TO RUN: paste into the Supabase SQL editor and click Run.
-- ══════════════════════════════════════════════════════════════════

-- 1. Drop the old 2-parameter overload so there is no ambiguity.
DROP FUNCTION IF EXISTS public.verify_student_pin(text, text);

-- 2. Create the new 3-parameter version.
CREATE OR REPLACE FUNCTION public.verify_student_pin(
  p_username    text,
  p_pin         text,
  p_family_name text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_student      public.students%ROWTYPE;
  v_max_tries    CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl          CONSTANT interval := interval '30 days';
  v_attempts     int;
  v_locked_until timestamptz;
  v_settings     jsonb;
  v_now          timestamptz := now();
  v_ok           boolean;
  v_token        text;
BEGIN
  -- ── Lookup: scoped to family when name is supplied ────────────────
  IF p_family_name IS NOT NULL AND trim(p_family_name) <> '' THEN
    SELECT s.* INTO v_student
    FROM   public.students s
    JOIN   public.families f ON f.id = s.family_id
    WHERE  lower(s.username)       = lower(p_username)
      AND  lower(trim(f.family_name)) = lower(trim(p_family_name));
  ELSE
    -- Fallback: old global lookup (keeps existing sessions working)
    SELECT * INTO v_student FROM public.students
    WHERE lower(username) = lower(p_username) LIMIT 1;
  END IF;

  -- Same generic error whether or not the user exists: no enumeration.
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_settings     := coalesce(v_student.settings, '{}'::jsonb);
  v_attempts     := coalesce((v_settings ->> 'pin_attempts')::int, 0);
  v_locked_until := (v_settings ->> 'pin_locked_until')::timestamptz;

  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  -- bcrypt, with a plaintext fallback for un-migrated dev rows
  IF v_student.pin IS NULL THEN
    v_ok := false;
  ELSIF v_student.pin = p_pin THEN
    v_ok := true;
  ELSE
    v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;

  -- ── Wrong PIN ────────────────────────────────────────────────────
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students
         SET settings = settings || jsonb_build_object(
               'pin_attempts', v_attempts,
               'pin_locked_until', v_now + (v_lockout_secs || ' seconds')::interval)
       WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students
       SET settings = settings || jsonb_build_object('pin_attempts', v_attempts)
     WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  -- ── Correct PIN ──────────────────────────────────────────────────
  UPDATE public.students
     SET settings = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: fresh login invalidates every other device instantly.
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,
    'student', jsonb_build_object(
      'id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at
    )
  );
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.verify_student_pin(text, text, text) TO anon, authenticated;
