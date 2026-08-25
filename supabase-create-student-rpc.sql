-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — create_student_with_pin()
--
--  PROBLEM
--    Store.createStudent() was changed to insert a student WITHOUT a pin and
--    hash it immediately afterwards, so that no plaintext PIN ever reaches a
--    column. That fails in this database:
--      null value in column "pin" of relation "students" violates not-null
--    students.pin is NOT NULL in production (DB_RESTORE_REFERENCE.txt documents
--    it as nullable - more schema drift).
--
--  SOLUTION
--    Do the whole thing in one statement inside the database: INSERT with
--    crypt(p_pin, gen_salt('bf')) inline. The PIN is hashed DURING insertion,
--    which satisfies NOT NULL, never stores plaintext, and removes the need for
--    the create-then-rollback dance in the client.
--
--  NOTE the search_path: `public, extensions`. pgcrypto lives in `extensions`
--  on Supabase, and omitting it is what broke student login earlier today
--  (function crypt(text, text) does not exist).
--
--  Idempotent.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

CREATE OR REPLACE FUNCTION public.create_student_with_pin(
  p_family_id    uuid,
  p_username     text,
  p_display_name text,
  p_avatar       text    DEFAULT NULL,   -- emoji default lives in the body, not
                                         -- the signature: a non-ASCII literal in
                                         -- a signature is one more thing that can
                                         -- be mangled by an editor or client encoding
  p_grade        int     DEFAULT 5,
  p_pin          text    DEFAULT NULL,
  p_settings     jsonb   DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_id  uuid;
  v_row jsonb;
BEGIN
  -- Only the owning parent (or an admin) may add a child to a family.
  -- SECURITY DEFINER bypasses RLS, so this check is the access control.
  IF NOT (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family_id AND f.parent_id = auth.uid())
    OR public.is_admin()
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  IF p_username IS NULL OR btrim(p_username) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_username');
  END IF;

  BEGIN
    INSERT INTO public.students
      (family_id, username, display_name, avatar, grade, pin, settings)
    VALUES (
      p_family_id,
      lower(btrim(p_username)),
      btrim(coalesce(p_display_name, p_username)),
      coalesce(nullif(btrim(coalesce(p_avatar, '')), ''), '🧒'),
      coalesce(p_grade, 5),
      crypt(p_pin, gen_salt('bf')),          -- ← hashed DURING insert
      coalesce(p_settings, '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb)
    )
    RETURNING id INTO v_id;
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END;

  -- Return the row WITHOUT pin/pin_hash.
  SELECT jsonb_build_object(
           'id', id, 'family_id', family_id, 'username', username,
           'display_name', display_name, 'avatar', avatar, 'grade', grade,
           'settings', settings, 'session_version', session_version,
           'expires_at', expires_at, 'created_at', created_at)
    INTO v_row
    FROM public.students WHERE id = v_id;

  RETURN jsonb_build_object('ok', true, 'student', v_row);
END;
$fn$;

-- Parents/admins only - never anon.
REVOKE EXECUTE ON FUNCTION public.create_student_with_pin(uuid, text, text, text, int, text, jsonb) FROM public, anon;
GRANT  EXECUTE ON FUNCTION public.create_student_with_pin(uuid, text, text, text, int, text, jsonb) TO authenticated;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Add a child from the parent dashboard. It should succeed.
--
-- 2. The PIN must be bcrypt, never plaintext (expect 0):
--      SELECT count(*) FROM public.students
--       WHERE pin IS NOT NULL AND pin NOT LIKE '$2%';
--
-- 3. The new child can log in with the PIN you set:
--      SELECT public.verify_student_pin('<new-username>', '<pin>');
--
-- 4. A duplicate username returns a clean error rather than a raw 23505:
--      -- try adding the same username twice in the UI
--
-- OPTIONAL: if you would rather keep the two-step client flow instead, the
-- alternative is to relax the constraint:
--      ALTER TABLE public.students ALTER COLUMN pin DROP NOT NULL;
-- That is NOT recommended - it permits rows that can never be logged into.
