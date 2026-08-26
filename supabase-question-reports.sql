-- Run in Supabase SQL editor.
-- Creates the question_reports table used by Store.reportQuestion().
-- Schema matches what store.js expects exactly.
-- Safe to re-run (IF NOT EXISTS / CREATE INDEX IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS public.question_reports (
  id            UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id   TEXT    NOT NULL,
  question_text TEXT,
  message       TEXT    NOT NULL,
  student_id    UUID    REFERENCES public.students(id) ON DELETE SET NULL,
  status        TEXT    NOT NULL DEFAULT 'open',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS qreports_status_idx ON public.question_reports (status, created_at DESC);
CREATE INDEX IF NOT EXISTS qreports_qid_idx    ON public.question_reports (question_id);

ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- Students (anon callers, no JWT) can insert reports.
-- This is intentional: PIN-authenticated students do not hold a Supabase JWT,
-- so their _sb client runs as anon. Restricting to authenticated would silently
-- drop every report a student submits.
DROP POLICY IF EXISTS "anon can insert question reports" ON public.question_reports;
CREATE POLICY "anon can insert question reports"
  ON public.question_reports FOR INSERT TO anon
  WITH CHECK (true);

-- Authenticated admins can read and update all reports.
DROP POLICY IF EXISTS "admins manage question reports" ON public.question_reports;
CREATE POLICY "admins manage question reports"
  ON public.question_reports FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Grant column-level access so the anon insert policy can actually write.
GRANT INSERT ON public.question_reports TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_reports TO authenticated;
