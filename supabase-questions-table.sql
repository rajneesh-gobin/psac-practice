-- Run once in the Supabase SQL editor.
-- Creates the questions table used by the Netlify function.
-- Safe to re-run (IF NOT EXISTS / CREATE INDEX IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS public.questions (
  id            TEXT PRIMARY KEY,
  subject_id    TEXT     NOT NULL,
  chapter_id    TEXT,
  grade         SMALLINT NOT NULL,
  difficulty    SMALLINT NOT NULL DEFAULT 1,
  is_past_paper BOOLEAN  NOT NULL DEFAULT FALSE,
  data          JSONB    NOT NULL,
  imported_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS questions_subject_id_idx  ON public.questions (subject_id);
CREATE INDEX IF NOT EXISTS questions_chapter_id_idx  ON public.questions (chapter_id);
CREATE INDEX IF NOT EXISTS questions_grade_paper_idx ON public.questions (grade, is_past_paper);

-- RLS enabled. No SELECT/INSERT/UPDATE/DELETE policies are created.
-- Only the service role key (used by the Netlify function) can access this table.
-- Anon and authenticated browser users are blocked — questions never leave the
-- server unless gated by the auth check in netlify/functions/questions.js.
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
