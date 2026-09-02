-- Extend remembered student sessions from 30 to 90 days.
--
-- Run this file once in the Supabase SQL editor. It is deliberately
-- standalone: do not re-run the historical schema or migration files.
-- Existing valid sessions are also extended below. Logout, PIN changes,
-- administrator revocation and a new login on another device still end a
-- session immediately.

CREATE OR REPLACE FUNCTION public.verify_student_pin(
  p_username text, p_pin text, p_family_name text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_student public.students%ROWTYPE;
  v_max_tries CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl CONSTANT interval := interval '90 days';
  v_attempts int;
  v_locked_until timestamptz;
  v_matches int;
  v_now timestamptz := now();
  v_ok boolean;
  v_token text;
BEGIN
  IF p_family_name IS NOT NULL AND trim(p_family_name) <> '' THEN
    SELECT count(*) INTO v_matches FROM public.students s
      JOIN public.families f ON f.id = s.family_id
      WHERE lower(s.username) = lower(p_username)
        AND lower(trim(f.family_name)) = lower(trim(p_family_name))
        AND s.deleted_at IS NULL;
    IF v_matches > 1 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'ambiguous_family');
    END IF;
    SELECT s.* INTO v_student FROM public.students s
      JOIN public.families f ON f.id = s.family_id
      WHERE lower(s.username) = lower(p_username)
        AND lower(trim(f.family_name)) = lower(trim(p_family_name))
        AND s.deleted_at IS NULL;
  ELSE
    SELECT * INTO v_student FROM public.students
      WHERE lower(username) = lower(p_username) AND deleted_at IS NULL LIMIT 1;
  END IF;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;
  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_attempts := greatest(coalesce(v_student.pin_attempts, 0),
    coalesce((coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_attempts')::int, 0));
  v_locked_until := coalesce(v_student.pin_locked_until,
    (coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_locked_until')::timestamptz);
  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  IF v_student.pin IS NULL THEN v_ok := false;
  ELSIF v_student.pin = p_pin THEN v_ok := true;
  ELSE v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students SET pin_attempts = v_attempts,
        pin_locked_until = v_now + (v_lockout_secs || ' seconds')::interval,
        settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students SET pin_attempts = v_attempts,
      settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  UPDATE public.students SET pin_attempts = 0, pin_locked_until = NULL,
    settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;
  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
    VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);
  RETURN jsonb_build_object('ok', true, 'session_token', v_token,
    'student', jsonb_build_object('id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at));
END;
$fn$;

CREATE OR REPLACE FUNCTION public.redeem_student_invite(p_token text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_inv public.student_invites%ROWTYPE;
  v_student public.students%ROWTYPE;
  v_token text;
  v_now timestamptz := now();
  v_ttl CONSTANT interval := interval '90 days';
BEGIN
  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  SELECT * INTO v_inv FROM public.student_invites
    WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex');
  IF NOT FOUND OR v_inv.used_at IS NOT NULL OR v_inv.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  SELECT * INTO v_student FROM public.students
    WHERE id = v_inv.student_id AND deleted_at IS NULL;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;
  UPDATE public.student_invites SET used_at = v_now WHERE token_hash = v_inv.token_hash;
  UPDATE public.students SET pin_attempts = 0, pin_locked_until = NULL WHERE id = v_student.id;
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;
  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
    VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);
  RETURN jsonb_build_object('ok', true, 'session_token', v_token,
    'student', jsonb_build_object('id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at));
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.verify_student_pin(text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_student_invite(text) TO anon, authenticated;

-- Keep users who are already signed in from getting a shorter legacy expiry.
UPDATE public.student_sessions
SET expires_at = now() + interval '90 days'
WHERE expires_at > now();
