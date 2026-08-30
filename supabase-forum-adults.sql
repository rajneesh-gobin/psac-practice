-- ══════════════════════════════════════════════════════════════════════════
--  The community forum is for PARENTS and TEACHERS
--  Run this in the Supabase SQL editor. Idempotent: re-running changes nothing.
--
--  WHAT WAS OPEN
--    posts_read / replies_read were `USING (true)`. Not "readable by every
--    logged-in user" — readable by ANYONE holding the public anon key, which is
--    published in the page source. A child, and an unauthenticated visitor,
--    could list every post in the forum.
--
--    posts_insert / replies_insert allowed
--        current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL
--    so a signed-in CHILD could post and reply, and forum_posts even carries an
--    `author_student_id uuid DEFAULT current_student_id()` column for exactly
--    that case.
--
--  WHAT THIS CHANGES
--    Both reads and writes now require a Supabase Auth user — auth.uid(). A
--    student session is anon plus an x-student-token header and has no
--    auth.uid(), so it is excluded by construction rather than by a check
--    somebody has to remember to write.
--
--  ⚠ Hiding the button in the header is NOT what does this. That is the UI half
--    (see _ADULT_ONLY_SCREENS in engine/app.js); this file is the half a
--    devtools console cannot argue with.
--
--  ⚠ EXISTING student-authored posts are NOT deleted. They stay, they remain
--    visible to the adults who can still read the forum, and the delete policies
--    are deliberately left alone so an administrator can still tidy them up.
--    Removing content somebody wrote is a moderation decision, not a migration.
-- ══════════════════════════════════════════════════════════════════════════

-- ── Posts ────────────────────────────────────────────────────────────────
drop policy if exists posts_read on public.forum_posts;
create policy posts_read on public.forum_posts as permissive for select to public
  using (auth.uid() is not null);

drop policy if exists posts_insert on public.forum_posts;
create policy posts_insert on public.forum_posts as permissive for insert to public
  -- ⚠ author_id must be the caller. Without this half, any signed-in adult
  -- could post under somebody else's id simply by sending one.
  with check (auth.uid() is not null and (author_id is null or author_id = auth.uid()));

-- ── Replies ──────────────────────────────────────────────────────────────
drop policy if exists replies_read on public.forum_replies;
create policy replies_read on public.forum_replies as permissive for select to public
  using (auth.uid() is not null);

drop policy if exists replies_insert on public.forum_replies;
create policy replies_insert on public.forum_replies as permissive for insert to public
  with check (auth.uid() is not null and (author_id is null or author_id = auth.uid()));

-- ── Deliberately unchanged ───────────────────────────────────────────────
--   posts_delete / replies_delete keep their `author_student_id =
--   current_student_id()` branch. It is dead for new content (a child can no
--   longer create any) and harmless for old content (a child can no longer read
--   the forum to find a post to delete), but removing it would also remove the
--   only non-admin route by which an existing student-authored post could ever
--   be cleaned up if the rule is ever relaxed again.
--
--   posts_update_admin stays admin-only, as before.

-- ── Verification ─────────────────────────────────────────────────────────
-- Should list exactly the four policies above with their new expressions:
--
--   SELECT polname,
--          pg_get_expr(polqual,      polrelid) AS using_expr,
--          pg_get_expr(polwithcheck, polrelid) AS check_expr
--   FROM   pg_policy
--   WHERE  polrelid IN ('public.forum_posts'::regclass,
--                       'public.forum_replies'::regclass)
--   ORDER  BY polrelid::regclass::text, polname;
