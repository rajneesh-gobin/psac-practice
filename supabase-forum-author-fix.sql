-- ═══════════════════════════════════════════════════════════════════════════
--  supabase-forum-author-fix.sql
--  Fix: forum posts fail with 42501 when a parent posts from a shared device.
--
--  RUN ONCE in the Supabase SQL editor. Idempotent — CREATE OR REPLACE is safe
--  to re-run. The triggers themselves are unchanged (same function name).
--
--  THE BUG
--  x-student-token is attached to every non-auth PostgREST request globally
--  (engine/supabase.js). So when a parent posts on the forum while a student
--  session is also active on the device, the database receives BOTH:
--    auth.uid()           → parent UUID  (from the Supabase JWT)
--    current_student_id() → student UUID (from the x-student-token header)
--
--  The original forum_set_author trigger checked `v_sid IS NOT NULL` FIRST,
--  so it took the student branch and set NEW.author_student_id = v_sid.
--  The posts_insert WITH CHECK then failed:
--    AND (author_student_id IS NULL)   ← FALSE → 42501
--
--  THE FIX
--  Check v_uid IS NOT NULL first. A parent JWT always takes priority on the
--  forum because the forum is adults-only — `auth.uid() IS NOT NULL` is already
--  required by every INSERT policy. The student branch is only reached when
--  there is genuinely no JWT (which the INSERT policy would then reject anyway).
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.forum_set_author()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_sid  uuid := current_student_id();
  v_name text;
  v_type text;
BEGIN
  IF v_uid IS NULL AND v_sid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '42501';
  END IF;

  -- ⚠ JWT wins. On a shared device the client sends BOTH a parent JWT and a
  -- student token. The forum is adults-only, so the parent's identity takes
  -- priority. Checking v_uid first prevents the student branch from running
  -- and setting author_student_id, which would then fail the WITH CHECK.
  IF v_uid IS NOT NULL THEN
    SELECT p.full_name,
           CASE WHEN p.is_super_admin THEN 'admin' ELSE COALESCE(p.role, 'parent') END
      INTO v_name, v_type
      FROM public.profiles p WHERE p.id = v_uid;
    v_type            := COALESCE(v_type, 'parent');
    NEW.author_id         := v_uid;
    NEW.author_student_id := NULL;
  ELSE
    -- No JWT but a student token is present. The INSERT policy requires
    -- auth.uid() IS NOT NULL, so this branch is currently unreachable — kept
    -- for forward-compatibility if student posting is ever re-enabled.
    SELECT s.display_name INTO v_name FROM public.students s WHERE s.id = v_sid;
    v_type                := 'student';
    NEW.author_student_id := v_sid;
    NEW.author_id         := NULL;
  END IF;

  v_name := NULLIF(btrim(COALESCE(v_name, '')), '');
  IF v_name IS NULL THEN
    v_name := NULLIF(btrim(COALESCE(NEW.author_name, '')), '');
  END IF;
  NEW.author_name := left(COALESCE(v_name, 'Anonymous'), 60);
  NEW.author_type := v_type;

  RETURN NEW;
END;
$$;


-- ── Verify ────────────────────────────────────────────────────────────────
-- 1. Confirm the function was updated (check the body):
--      SELECT prosrc FROM pg_proc WHERE proname = 'forum_set_author';
--    → should contain "v_uid IS NOT NULL" before the student branch
--
-- 2. Confirm triggers still exist (no change needed — same function name):
--      SELECT tgname FROM pg_trigger
--       WHERE tgname IN ('forum_posts_set_author','forum_replies_set_author');
--    → expect 2 rows
--
-- 3. Test from the app signed in as a parent (NOT the SQL editor — superuser
--    has no auth.uid()): post to the forum. Should succeed.
