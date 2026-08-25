-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — mint_student_session()
--
--  Issues the x-student-token session token that RLS uses to identify a
--  student (students are not Supabase Auth users, so there is no auth.uid()).
--
--  WHY THIS IS A WRAPPER, NOT A REPLACEMENT
--  supabase-rls-migration.sql Part 3 proposed rewriting verify_student_pin().
--  That was risky: the deployed body has drifted from every copy in the repo
--  and was never diffed, and it sits on the login path — a mistake locks every
--  student out.
--
--  This function instead CALLS the existing verify_student_pin() and appends a
--  session token to whatever it returns. Consequences:
--    • verify_student_pin() is not modified at all — zero risk to login;
--    • lockout, expiry, attempt counting and the non-enumerating error message
--      are inherited automatically, whatever the deployed body actually does;
--    • the response is a strict superset, so the client can call this one
--      function instead of verify_student_pin and change nothing else.
--
--  Run AFTER: supabase-rls-migration.sql (needs student_sessions + pgcrypto).
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

CREATE OR REPLACE FUNCTION public.mint_student_session(p_username text, p_pin text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_token  text;
  v_ttl    CONSTANT interval := interval '30 days';
BEGIN
  -- Delegate the whole credential check. If it fails for any reason (bad PIN,
  -- lockout, expired account) we return its verdict verbatim and mint nothing.
  v_result := public.verify_student_pin(p_username, p_pin);

  IF NOT coalesce((v_result ->> 'ok')::boolean, false) THEN
    RETURN v_result;
  END IF;

  v_id := (v_result -> 'student' ->> 'id')::uuid;
  IF v_id IS NULL THEN
    -- Defensive: the deployed verify_student_pin should always include the
    -- student object on success, but never mint a token we cannot attribute.
    RETURN jsonb_build_object('ok', false, 'error', 'no_student_id');
  END IF;

  -- Anti-sharing: a fresh login kills every other device immediately.
  -- (Previously this depended on a 5-minute session_version poll.)
  DELETE FROM public.student_sessions WHERE student_id = v_id;
  DELETE FROM public.student_sessions WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_id, now() + v_ttl);

  RETURN v_result || jsonb_build_object('session_token', v_token);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.mint_student_session(text, text) TO anon, authenticated;

-- Explicit logout: drops every session for the calling student.
CREATE OR REPLACE FUNCTION public.end_student_session()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_id uuid := public.current_student_id();
BEGIN
  IF v_id IS NOT NULL THEN
    DELETE FROM public.student_sessions WHERE student_id = v_id;
  END IF;
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.end_student_session() TO anon, authenticated;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. A bad login mints nothing and leaks nothing:
--      SELECT public.mint_student_session('zzz_no_such_user', '0000');
--      -- expect {"ok": false, "error": "invalid_credentials"}
--      SELECT count(*) FROM public.student_sessions;   -- unchanged
--
-- 2. A real login returns ok:true AND a 64-char hex session_token:
--      SELECT public.mint_student_session('<username>', '<pin>');
--
-- 3. Only the hash is stored — the raw token must appear nowhere:
--      SELECT token_hash, student_id, expires_at FROM public.student_sessions;
--
-- 4. Logging in again replaces the row rather than adding one (anti-sharing):
--      SELECT count(*) FROM public.student_sessions WHERE student_id = '<id>';  -- 1
