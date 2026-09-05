-- ═══════════════════════════════════════════════════════════════════════════
--  supabase-parent-reports.sql
--  Allow authenticated parents/teachers to submit and read their own reports.
--
--  RUN ONCE in the Supabase SQL editor. Idempotent — safe to re-run.
--
--  WHAT THIS ADDS
--  A reporter_id column (DEFAULT auth.uid()) lets the DB automatically record
--  which authenticated user submitted a report. Existing student rows will have
--  reporter_id = NULL (students are anon — auth.uid() returns NULL for them),
--  which is correct: student reports are already attributed via student_id.
--
--  Two new policies:
--    • authenticated can INSERT  — parent clicks Send; reporter_id auto-fills
--    • authenticated reads own   — parent sees only their own reports
--  The existing "admins manage" (FOR ALL) policy already gives admins full
--  access, so no changes are needed there.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1 · reporter_id column ───────────────────────────────────────────────
ALTER TABLE public.question_reports
  ADD COLUMN IF NOT EXISTS reporter_id UUID
    REFERENCES auth.users(id) ON DELETE SET NULL
    DEFAULT auth.uid();

-- ── 2 · Authenticated users can INSERT their own reports ─────────────────
DROP POLICY IF EXISTS "authenticated can insert report" ON public.question_reports;
CREATE POLICY "authenticated can insert report"
  ON public.question_reports FOR INSERT TO authenticated
  WITH CHECK (reporter_id = auth.uid());

-- ── 3 · Authenticated users can SELECT their own reports ─────────────────
DROP POLICY IF EXISTS "parent can read own reports" ON public.question_reports;
CREATE POLICY "parent can read own reports"
  ON public.question_reports FOR SELECT TO authenticated
  USING (reporter_id = auth.uid());

-- ── Verify ────────────────────────────────────────────────────────────────
-- 1. Column exists:
--      SELECT column_name, column_default
--        FROM information_schema.columns
--       WHERE table_name = 'question_reports' AND column_name = 'reporter_id';
--    → expect one row with default auth.uid()
--
-- 2. Policies exist:
--      SELECT polname, polcmd FROM pg_policy
--       WHERE polrelid = 'public.question_reports'::regclass
--       ORDER BY polname;
--    → expect: "admins manage", "anon can insert", "authenticated can insert",
--               "parent can read own reports"
--
-- 3. Test from the app as a signed-in parent (NOT the SQL editor):
--      INSERT succeeds, then SELECT returns the new row.
