-- Adds a protected flag to the questions table.
-- Protected questions are skipped by the import script so admin edits are never overwritten.
-- Run in Supabase SQL editor after supabase-questions-table.sql.

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS protected BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS questions_protected_idx ON public.questions (protected) WHERE protected = TRUE;
