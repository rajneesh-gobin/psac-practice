-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — REMOVE THE TEMPORARY BRIDGE POLICIES
--
--  supabase-rls-migration.sql Part 7 added `bridge_*` policies with
--  USING (true) so the app kept working while it did not yet send the
--  x-student-token header. Those policies are the last remaining hole:
--  student_progress, student_assignments and the students roster are still
--  world-readable through them.
--
--  ⚠ DO NOT RUN THIS UNTIL ALL THREE ARE TRUE:
--     1. supabase-student-session-rpc.sql has been run
--     2. The updated engine/ code is DEPLOYED (not just committed)
--     3. You have logged in as a student on the deployed site and confirmed
--        the app works — see the pre-flight check below
--
--  Running it early does not lose data, but every student screen goes blank
--  until the app is deployed.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── PRE-FLIGHT (run these first, do not skip) ───────────────────────────────
--
-- A. A session token is actually being minted:
--      SELECT count(*) FROM public.student_sessions;      -- expect >= 1
--
-- B. In the DEPLOYED app, log in as a student, open DevTools → Network, click
--    any request to /rest/v1/ and confirm the request headers include:
--      x-student-token: <64 hex chars>
--    If it is missing, setStudentToken() is not reaching the client — check
--    the console for the "[supabase] _sb.rest.headers unavailable" error.
--    STOP HERE if the header is absent.
--
-- C. Confirm practice still saves: answer one question, reload, check the
--    dashboard counter went up.


BEGIN;

DROP POLICY IF EXISTS bridge_students   ON public.students;
DROP POLICY IF EXISTS bridge_progress   ON public.student_progress;
DROP POLICY IF EXISTS bridge_assign     ON public.student_assignments;
DROP POLICY IF EXISTS bridge_assign_upd ON public.student_assignments;
DROP POLICY IF EXISTS bridge_sched      ON public.study_schedules;
DROP POLICY IF EXISTS bridge_entries    ON public.schedule_entries;
DROP POLICY IF EXISTS bridge_posts_ins  ON public.forum_posts;
DROP POLICY IF EXISTS bridge_reps_ins   ON public.forum_replies;
DROP POLICY IF EXISTS bridge_reports    ON public.question_reports;
DROP POLICY IF EXISTS bridge_login      ON public.login_events;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. No permissive policies left anywhere (expect only intentional ones:
--    plans_read, posts_read, replies_read — all deliberately public):
--      SELECT tablename, policyname, cmd FROM pg_policies
--       WHERE schemaname='public' AND (qual='true' OR with_check='true')
--       ORDER BY tablename;
--
-- 2. With ONLY the publishable key and NO x-student-token, every one of these
--    must return 0 rows:
--      curl -H "apikey: <KEY>" -H "Authorization: Bearer <KEY>" \
--           "https://<project>.supabase.co/rest/v1/students?select=id"
--      ... same for student_progress, student_assignments, study_schedules
--
-- 3. Re-run the app smoke test: student login, practice, exam, dashboard,
--    parent dashboard, forum post.


-- ═══════════════════════════════════════════════════════════════════════════
--  ROLLBACK (if something breaks and you need students working immediately)
-- ═══════════════════════════════════════════════════════════════════════════
-- BEGIN;
-- CREATE POLICY bridge_students   ON public.students            FOR SELECT USING (true);
-- CREATE POLICY bridge_progress   ON public.student_progress    FOR ALL    USING (true) WITH CHECK (true);
-- CREATE POLICY bridge_assign     ON public.student_assignments FOR SELECT USING (true);
-- CREATE POLICY bridge_assign_upd ON public.student_assignments FOR UPDATE USING (true) WITH CHECK (true);
-- CREATE POLICY bridge_sched      ON public.study_schedules     FOR SELECT USING (true);
-- CREATE POLICY bridge_entries    ON public.schedule_entries    FOR SELECT USING (true);
-- CREATE POLICY bridge_posts_ins  ON public.forum_posts         FOR INSERT WITH CHECK (true);
-- CREATE POLICY bridge_reps_ins   ON public.forum_replies       FOR INSERT WITH CHECK (true);
-- CREATE POLICY bridge_reports    ON public.question_reports    FOR INSERT WITH CHECK (true);
-- CREATE POLICY bridge_login      ON public.login_events        FOR INSERT WITH CHECK (true);
-- COMMIT;
