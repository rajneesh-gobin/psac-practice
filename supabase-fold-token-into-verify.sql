-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — fold session minting INTO verify_student_pin()
--
--  WHY
--  Browsers get PostgREST 42883 (undefined_function) for the newly created
--  mint_student_session(), while server-side HTTP clients on the same machine
--  get HTTP 200. Chrome, Chrome-incognito and Edge all fail, so it is not a
--  cookie, cache or browser issue. Whatever the cause, PostgREST will not route
--  browser calls to the NEW function name — but it routes fine to the
--  pre-existing verify_student_pin().
--
--  So: stop introducing a new route. Keep the name and signature PostgREST
--  already knows, and change what it does.
--
--  HOW (without ever reading the deployed body)
--    1. RENAME the existing function to verify_student_pin_core. A rename
--       preserves the body, language, SECURITY DEFINER flag and owner exactly —
--       so the credential logic we cannot see is carried over untouched.
--    2. CREATE verify_student_pin() with the SAME name and signature, which
--       calls _core and appends session_token to its result.
--    3. Revoke _core from clients so nobody can bypass minting.
--
--  Net effect: the client keeps calling verify_student_pin (a route that
--  already works), and now receives a session_token.
--
--  Run AFTER: supabase-rls-migration.sql (needs student_sessions + pgcrypto).
--  Idempotent — safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1 · Rename the existing implementation, once ────────────────────────────
DO $do$
DECLARE
  v_has_original boolean;
  v_has_core     boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'verify_student_pin'
      AND pg_get_function_identity_arguments(p.oid) = 'p_username text, p_pin text'
  ) INTO v_has_original;

  SELECT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'verify_student_pin_core'
  ) INTO v_has_core;

  IF v_has_original AND NOT v_has_core THEN
    EXECUTE 'ALTER FUNCTION public.verify_student_pin(text, text) RENAME TO verify_student_pin_core';
    RAISE NOTICE 'Renamed verify_student_pin -> verify_student_pin_core';
  ELSIF v_has_core THEN
    RAISE NOTICE 'verify_student_pin_core already exists - skipping rename';
  ELSE
    RAISE EXCEPTION 'verify_student_pin(text,text) not found - nothing to wrap';
  END IF;
END
$do$;


-- ── 2 · Re-create verify_student_pin as a token-minting wrapper ─────────────
-- Same name, same argument names, same return type: PostgREST's existing route
-- keeps resolving, because it builds its call by name rather than by OID.
CREATE OR REPLACE FUNCTION public.verify_student_pin(p_username text, p_pin text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_token  text;
  v_ttl    CONSTANT interval := interval '30 days';
BEGIN
  -- Delegate the entire credential check. Lockout, account expiry, attempt
  -- counting and the non-enumerating error message all behave exactly as
  -- before, because this is literally the same code under a new name.
  v_result := public.verify_student_pin_core(p_username, p_pin);

  IF NOT coalesce((v_result ->> 'ok')::boolean, false) THEN
    RETURN v_result;                      -- failure: return verbatim, mint nothing
  END IF;

  v_id := (v_result -> 'student' ->> 'id')::uuid;
  IF v_id IS NULL THEN
    RETURN v_result;                      -- degrade gracefully rather than break login
  END IF;

  -- Anti-sharing: a fresh login invalidates every other device immediately.
  DELETE FROM public.student_sessions WHERE student_id = v_id;
  DELETE FROM public.student_sessions WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_id, now() + v_ttl);

  RETURN v_result || jsonb_build_object('session_token', v_token);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.verify_student_pin(text, text) TO anon, authenticated;

-- Clients must not be able to call the raw checker and skip minting.
REVOKE EXECUTE ON FUNCTION public.verify_student_pin_core(text, text) FROM anon, authenticated, public;


-- ── 3 · Keep mint_student_session working (now a thin alias) ────────────────
-- verify_student_pin already mints, so this just forwards. Harmless if the
-- browser can never reach it; correct if it later starts resolving.
CREATE OR REPLACE FUNCTION public.mint_student_session(p_username text, p_pin text)
RETURNS jsonb LANGUAGE sql SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT public.verify_student_pin(p_username, p_pin);
$fn$;

GRANT EXECUTE ON FUNCTION public.mint_student_session(text, text) TO anon, authenticated;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Bad credentials still rejected, nothing minted:
--      SELECT public.verify_student_pin('zzz_nobody', '0000');
--      SELECT count(*) FROM public.student_sessions;
--
-- 2. Real login returns ok:true AND a 64-char session_token:
--      SELECT public.verify_student_pin('eee', '1111');
--
-- 3. Exactly one session row per student, replaced on each login:
--      SELECT student_id, left(token_hash, 12) AS hash, expires_at
--      FROM public.student_sessions;
--
-- 4. The raw checker is no longer client-callable (expect false):
--      SELECT has_function_privilege('anon',
--        'public.verify_student_pin_core(text,text)', 'EXECUTE');
