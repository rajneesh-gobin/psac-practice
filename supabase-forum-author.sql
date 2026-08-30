-- ═══════════════════════════════════════════════════════════════════════════
--  supabase-forum-author.sql
--  Forum: stop clients asserting who they are
--
--  RUN THIS ONCE in the Supabase SQL editor. Idempotent — re-running it changes
--  nothing, so it is safe to run again if you are unsure whether it went
--  through the first time.
--
--  Was Part 7 of supabase-migration.sql; split into its own file on 2026-08-30
--  so it can be run independently of the rest of that migration, which is still
--  outstanding. It has no dependency on any other part.
--
--  ⚠ THIS IS THE SERVER HALF OF A SECURITY FIX. engine/forum.js has already
--  stopped SENDING author_type — but until this runs, nothing stops a crafted
--  request from setting it and minting a teacher badge.
-- ═══════════════════════════════════════════════════════════════════════════
--
--  THE PROBLEM
--  forum_posts.author_name and author_type were written straight from the
--  browser:
--      .insert({ category, title, body, author_name: name, author_type: type })
--  and posts_insert only checked
--      WITH CHECK (current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL)
--  i.e. "somebody is signed in", nothing about WHO. So any parent or child
--  could post with author_type = 'teacher' and any author_name they liked, and
--  engine/forum.js renders a green "(T)" badge off exactly that column. An
--  adult-authority badge anyone can mint, on a forum used by primary-school
--  children.
--
--  author_id / author_student_id were safe-by-default (DEFAULT auth.uid() /
--  current_student_id()), but ⚠ a DEFAULT only applies when the column is
--  OMITTED — an explicit value in the insert overrode it, and nothing checked.
--
--  THE FIX
--  1. A BEFORE INSERT trigger overwrites all four identity columns from the
--     caller's real session. The client can send whatever it likes; it is
--     discarded. Deliberately a trigger and not just a policy: a policy can
--     only reject, and rejecting would break every already-deployed client
--     that still sends the fields.
--  2. WITH CHECK pins the id columns as well, so the trigger is not the only
--     thing standing between a caller and a forged author_id.
--
--  IMPACT ON EXISTING DATA
--  • No posts or replies are deleted.
--  • Historical posts claiming a 'teacher' or 'admin' badge whose author does
--    not actually hold that role are demoted to 'parent'. The post stays; it
--    loses a badge it was never entitled to. Step 3 has a commented preview
--    SELECT — run that first if you want to see which rows will change.
--  • New posts take author_name from the account (students: display_name,
--    parents: profiles.full_name) instead of from the request.
--
--  ROLLBACK, if ever needed:
--    DROP TRIGGER IF EXISTS forum_posts_set_author   ON public.forum_posts;
--    DROP TRIGGER IF EXISTS forum_replies_set_author ON public.forum_replies;
--    DROP FUNCTION IF EXISTS public.forum_set_author();
--  The two INSERT policies would also need restoring from supabase-schema.sql.
--  Demoted author_type values are NOT restored — they were wrong to begin with.
-- ═══════════════════════════════════════════════════════════════════════════


-- ── 1 · Derive the author from the session, never from the payload ──────────
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

  IF v_sid IS NOT NULL THEN
    -- A child. display_name is the only name they can post under.
    SELECT s.display_name INTO v_name FROM public.students s WHERE s.id = v_sid;
    v_type := 'student';
    NEW.author_student_id := v_sid;
    NEW.author_id         := NULL;
  ELSE
    -- A parent, teacher or admin. The ROLE COLUMN decides the badge — this is
    -- the whole point: 'teacher' is now a fact about the row in profiles, not
    -- a string the browser chose.
    SELECT p.full_name,
           CASE WHEN p.is_super_admin THEN 'admin' ELSE COALESCE(p.role, 'parent') END
      INTO v_name, v_type
      FROM public.profiles p WHERE p.id = v_uid;
    v_type := COALESCE(v_type, 'parent');
    NEW.author_id         := v_uid;
    NEW.author_student_id := NULL;
  END IF;

  -- Only fall back to what the client sent when there is genuinely no name on
  -- the account (a parent who never completed setup). Trimmed and length-capped
  -- so the fallback cannot be used to smuggle a long or blank display name.
  v_name := NULLIF(btrim(COALESCE(v_name, '')), '');
  IF v_name IS NULL THEN
    v_name := NULLIF(btrim(COALESCE(NEW.author_name, '')), '');
  END IF;
  NEW.author_name := left(COALESCE(v_name, 'Anonymous'), 60);
  NEW.author_type := v_type;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS forum_posts_set_author ON public.forum_posts;
CREATE TRIGGER forum_posts_set_author
  BEFORE INSERT ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.forum_set_author();

DROP TRIGGER IF EXISTS forum_replies_set_author ON public.forum_replies;
CREATE TRIGGER forum_replies_set_author
  BEFORE INSERT ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.forum_set_author();


-- ── 2 · Pin the identity columns in the policy too ──────────────────────────
-- Belt and braces. The trigger already overwrites these, but a policy that
-- still accepts any author_id means the trigger is the only thing between a
-- caller and a forged row — and a future ALTER that disables the trigger would
-- silently reopen this.
--
-- ⚠ THESE MUST KEEP `auth.uid() IS NOT NULL`, i.e. ADULTS ONLY.
-- An earlier draft of this file replaced these policies with
--     ((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)) AND ...
-- which would have silently UNDONE supabase-forum-adults.sql and let children
-- post on the forum again. That draft was written from supabase-schema.sql,
-- which still shows the pre-forum-adults policy — the dump is stale, the live
-- database is not. Verified against the live policies on 2026-08-30:
--     posts_insert / replies_insert:
--       ((auth.uid() IS NOT NULL) AND ((author_id IS NULL) OR (author_id = auth.uid())))
-- What is added below is only the author_student_id clause, so the adults-only
-- rule and the author_id pin both survive unchanged.
--
-- The trigger in step 1 still has a student branch. It is unreachable while
-- these policies stand, and deliberately kept: if student posting is ever
-- re-enabled, identity is already derived correctly rather than trusted.
DROP POLICY IF EXISTS posts_insert ON public.forum_posts;
CREATE POLICY posts_insert ON public.forum_posts AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (
    (auth.uid() IS NOT NULL)
    AND ((author_id IS NULL) OR (author_id = auth.uid()))
    AND (author_student_id IS NULL)
  );

DROP POLICY IF EXISTS replies_insert ON public.forum_replies;
CREATE POLICY replies_insert ON public.forum_replies AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (
    (auth.uid() IS NOT NULL)
    AND ((author_id IS NULL) OR (author_id = auth.uid()))
    AND (author_student_id IS NULL)
  );


-- ── 3 · Existing rows ───────────────────────────────────────────────────────
-- Demote any historical post claiming teacher/admin whose author_id does not
-- actually hold that role. Nothing is deleted — the post stays, it just loses
-- a badge it was never entitled to.
--
-- PREVIEW FIRST (optional). Uncomment and run this on its own to see exactly
-- which rows the two UPDATEs below will change, before you change them:
--
--   SELECT id, created_at, author_name, author_type, left(title, 60) AS title
--     FROM public.forum_posts f
--    WHERE f.author_type IN ('teacher', 'admin')
--      AND NOT EXISTS (
--        SELECT 1 FROM public.profiles p
--         WHERE p.id = f.author_id
--           AND (p.role = f.author_type
--                OR (f.author_type = 'admin' AND p.is_super_admin)))
--    ORDER BY created_at DESC;

UPDATE public.forum_posts f
   SET author_type = 'parent'
 WHERE f.author_type IN ('teacher', 'admin')
   AND NOT EXISTS (
     SELECT 1 FROM public.profiles p
      WHERE p.id = f.author_id
        AND (p.role = f.author_type OR (f.author_type = 'admin' AND p.is_super_admin))
   );

UPDATE public.forum_replies f
   SET author_type = 'parent'
 WHERE f.author_type IN ('teacher', 'admin')
   AND NOT EXISTS (
     SELECT 1 FROM public.profiles p
      WHERE p.id = f.author_id
        AND (p.role = f.author_type OR (f.author_type = 'admin' AND p.is_super_admin))
   );


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY (run after)
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Triggers exist:
--      SELECT tgname FROM pg_trigger
--       WHERE tgname IN ('forum_posts_set_author','forum_replies_set_author');
--    → expect 2 rows
--
-- 2. No unearned badges remain:
--      SELECT count(*) FROM public.forum_posts f
--       WHERE f.author_type IN ('teacher','admin')
--         AND NOT EXISTS (SELECT 1 FROM public.profiles p
--                          WHERE p.id = f.author_id
--                            AND (p.role = f.author_type
--                                 OR (f.author_type='admin' AND p.is_super_admin)));
--    → expect 0
--
-- 3. Impersonation is refused. Signed in as a NON-teacher, this must come back
--    with author_type 'parent' or 'student' — never 'teacher':
--      INSERT INTO public.forum_posts (category, title, body, author_name, author_type)
--      VALUES ('general','test','test','Mrs Somebody','teacher')
--      RETURNING author_name, author_type;
--    Then remove the test row:
--      DELETE FROM public.forum_posts WHERE title = 'test' AND body = 'test';
--
--    ⚠ Run step 3 from the APP (signed in as a normal user), not from the SQL
--    editor. The editor connects as a superuser, where auth.uid() and
--    current_student_id() are both NULL — the trigger raises not_authenticated
--    and you learn nothing about how a real client is treated.
