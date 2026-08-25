-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — FIX: pgcrypto unreachable inside SECURITY DEFINER fns
--
--  SYMPTOM
--    Student login fails. PostgREST returns 404 with:
--      {"code":"42883","message":"function crypt(text, text) does not exist"}
--    Parent login is unaffected. Logging in with a NON-EXISTENT username
--    returns 200 (because the function returns before reaching crypt).
--
--  CAUSE
--    Supabase installs pgcrypto into the `extensions` schema, not `public`.
--    Every function here was created with `SET search_path = public`, which
--    excludes `extensions`, so crypt(), gen_salt(), digest() and
--    gen_random_bytes() cannot be resolved from inside those function bodies.
--
--  WHY IT ONLY SURFACED NOW
--    While all PINs were plaintext, verify_student_pin matched on the
--    plaintext branch and never called crypt(). supabase-hotfix-pin-exposure.sql
--    bcrypted the PINs, which routed every login down the crypt() branch for
--    the first time. The hotfix's own UPDATE ... crypt(...) succeeded because
--    top-level SQL-editor statements use a search_path that DOES include
--    extensions - only the pinned functions are affected.
--
--  FIX
--    Add `extensions` to each function's search_path. Using ALTER FUNCTION
--    rather than rewriting bodies matters: verify_student_pin_core holds the
--    original deployed credential logic, which must not be edited.
--
--  Idempotent. Run this now - student login is down until you do.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

DO $do$
DECLARE
  sig  text;
  sigs text[] := ARRAY[
    -- pgcrypto users (the actual breakage)
    'public.verify_student_pin_core(text, text)',   -- crypt()
    'public.verify_student_pin(text, text)',        -- digest(), gen_random_bytes()
    'public.mint_student_session(text, text)',
    'public.current_student_id()',                  -- digest()
    'public.set_student_pin(uuid, text)',           -- crypt(), gen_salt()
    -- no pgcrypto today, but pinned to public and cheap to harden
    'public.end_student_session()',
    'public.join_classroom(text, uuid)',
    'public.is_admin()',
    'public.is_teacher()',
    'public.is_super_admin()',
    'public.owns_student(uuid)',
    'public.owns_student_txt(text)',
    'public.owns_classroom(uuid)',
    'public.parent_of_classroom_member(uuid)',
    'public.gen_invite_code()'
  ];
BEGIN
  FOREACH sig IN ARRAY sigs LOOP
    BEGIN
      EXECUTE format('ALTER FUNCTION %s SET search_path = public, extensions', sig);
      RAISE NOTICE 'search_path fixed : %', sig;
    EXCEPTION
      WHEN undefined_function THEN RAISE NOTICE 'skipped (absent): %', sig;
    END;
  END LOOP;
END
$do$;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY — run these immediately
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. THE test that actually exercises crypt(). Use a REAL username and the
--    REAL pin. A fake username proves nothing - it returns before crypt.
--      SELECT public.verify_student_pin('eee', '1111');
--    Expect ok:true plus a 64-char session_token.
--    If it still errors on crypt(), find where pgcrypto actually lives:
--      SELECT n.nspname FROM pg_extension e
--      JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pgcrypto';
--    ...and put that schema name in the search_path above instead.
--
-- 2. A wrong PIN must still be rejected (this now genuinely tests bcrypt):
--      SELECT public.verify_student_pin('eee', '9999');   -- expect ok:false
--
-- 3. Setting a PIN works (exercises crypt + gen_salt):
--      SELECT public.set_student_pin('<student-uuid>', '4321');
--
-- 4. Confirm the setting stuck:
--      SELECT p.proname, p.proconfig FROM pg_proc p
--      JOIN pg_namespace n ON n.oid = p.pronamespace
--      WHERE n.nspname='public' AND p.proname LIKE '%student%';
--    Each proconfig should read {"search_path=public, extensions"}.
