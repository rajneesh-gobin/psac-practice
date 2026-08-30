-- ═══════════════════════════════════════════════════════════════════════════
--  supabase-indexes.sql
--  Indexes for the columns the app filters on but Postgres has to scan.
--
--  RUN THIS ONCE in the Supabase SQL editor. Idempotent (IF NOT EXISTS), and
--  it changes no data and no behaviour — only how fast the same queries run.
--
--  Found by a live audit on 2026-08-30: pg_stat_user_tables showed four tables
--  with sequential scans and ZERO index scans, i.e. every query against them
--  reads the whole table:
--
--    table                 rows   seq_scans   idx_scans   tuples_read
--    schedule_entries       247      148          0          30,310
--    student_assignments      3      603          0           1,102
--    subscriptions            1    1,048          0           1,036
--    question_reports         4      204          0             565
--
--  ⚠ Nothing is slow TODAY — the whole database is under 6 MB and a seq scan of
--  247 rows is free. This is about the shape of the growth. schedule_entries is
--  the one that matters: generateTimetable() writes roughly weeks x study-days
--  x subjects rows PER CHILD in one go, so a family of three with a term-long
--  timetable is already in the thousands, and _loadEntries() re-reads it on
--  every single calendar open.
--
--  Sizing follows the actual query shapes in the client, not a guess:
--    calendar.js:133  .eq('schedule_id', …).order('date')
--    calendar.js:368  .eq('student_id', …).not('completed_at','is',null).order('completed_at')
--    store.js:953     .eq('student_id', …).order('created_at')
--    store.js:1023    .eq('user_id', …).eq('status','active').order('started_at')
--
--  Plain CREATE INDEX, not CONCURRENTLY: every table here is small enough that
--  the build is instant, and CONCURRENTLY cannot run inside a transaction.
--  Revisit that if any of these ever reaches six figures.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Hot paths ───────────────────────────────────────────────────────────────

-- Every calendar open, for every parent. Composite because the query filters on
-- schedule_id and immediately orders by date — the index then satisfies both
-- and no sort is needed.
CREATE INDEX IF NOT EXISTS schedule_entries_schedule_date_idx
  ON public.schedule_entries (schedule_id, date);

-- Also filtered directly when a timetable is reset:
--   .delete().eq('student_id', …).eq('entry_type','study')
CREATE INDEX IF NOT EXISTS schedule_entries_student_type_idx
  ON public.schedule_entries (student_id, entry_type);

-- Parent dashboard, child dashboard, and the calendar's completed-assignment
-- rows all filter on student_id.
CREATE INDEX IF NOT EXISTS student_assignments_student_created_idx
  ON public.student_assignments (student_id, created_at DESC);

-- The calendar wants only assignments that are actually done. A partial index
-- stays small no matter how many assignments are outstanding.
CREATE INDEX IF NOT EXISTS student_assignments_completed_idx
  ON public.student_assignments (student_id, completed_at DESC)
  WHERE completed_at IS NOT NULL;

-- getUserPlan() runs on every parent dashboard load and in weekly-digest.
CREATE INDEX IF NOT EXISTS subscriptions_user_status_idx
  ON public.subscriptions (user_id, status, started_at DESC);

-- Opening a forum thread reads its replies.
CREATE INDEX IF NOT EXISTS forum_replies_post_idx
  ON public.forum_replies (post_id, created_at);

-- The admin reports tab filters by student.
CREATE INDEX IF NOT EXISTS question_reports_student_idx
  ON public.question_reports (student_id);

-- ── Unindexed foreign keys ──────────────────────────────────────────────────
-- Not on a hot read path, but an unindexed FK makes every DELETE on the PARENT
-- table scan the child table to enforce the constraint. Cheap insurance.
CREATE INDEX IF NOT EXISTS payments_plan_idx            ON public.payments (plan_id);
CREATE INDEX IF NOT EXISTS payments_user_idx            ON public.payments (user_id);
CREATE INDEX IF NOT EXISTS subscriptions_plan_idx       ON public.subscriptions (plan_id);
CREATE INDEX IF NOT EXISTS student_assignments_parent_idx ON public.student_assignments (parent_id);
CREATE INDEX IF NOT EXISTS student_friends_b_idx        ON public.student_friends (student_id_b);
CREATE INDEX IF NOT EXISTS student_invites_creator_idx  ON public.student_invites (created_by);
CREATE INDEX IF NOT EXISTS profiles_teacher_decided_idx ON public.profiles (teacher_decided_by);

-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY (run after)
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. No foreign key is left without an index:
--      SELECT c.conrelid::regclass::text tbl, a.attname col
--        FROM pg_constraint c
--        JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = c.conkey[1]
--       WHERE c.contype = 'f' AND c.connamespace = 'public'::regnamespace
--         AND NOT EXISTS (SELECT 1 FROM pg_index i
--                          WHERE i.indrelid = c.conrelid AND i.indkey[0] = c.conkey[1]);
--    → expect 0 rows
--
-- 2. The planner actually uses them (run after some real traffic — a fresh
--    index shows idx_scan = 0 until a query has had reason to use it):
--      SELECT relname, seq_scan, idx_scan FROM pg_stat_user_tables
--       WHERE schemaname = 'public'
--         AND relname IN ('schedule_entries','student_assignments','subscriptions')
--    → idx_scan should climb; seq_scan should stop climbing
--
-- 3. Confirm on one query directly:
--      EXPLAIN SELECT * FROM public.schedule_entries
--       WHERE schedule_id = '00000000-0000-0000-0000-000000000000' ORDER BY date;
--    → expect "Index Scan using schedule_entries_schedule_date_idx"
--      ⚠ On a nearly-empty table the planner may still choose a Seq Scan
--        because it is genuinely cheaper. That is correct behaviour, not a
--        failed index.
