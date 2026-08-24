-- ═══════════════════════════════════════════════════════════════
--  PSAC Exam Practice — Calendar Migration
--  Run this in your Supabase project → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ── 1. study_schedules ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.study_schedules (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id   TEXT        NOT NULL,          -- TEXT (not UUID) to support all ID formats
  parent_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  settings     JSONB       NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS study_schedules_student_idx
  ON public.study_schedules(student_id);

-- ── 2. schedule_entries ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.schedule_entries (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id   UUID        NOT NULL REFERENCES public.study_schedules(id) ON DELETE CASCADE,
  student_id    TEXT        NOT NULL,
  date          DATE        NOT NULL,
  topic_label   TEXT        NOT NULL,
  entry_type    TEXT        NOT NULL DEFAULT 'study',
  duration_mins INTEGER,
  notes         TEXT,
  subject_id    TEXT,
  chapter_id    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS schedule_entries_schedule_idx
  ON public.schedule_entries(schedule_id);
CREATE INDEX IF NOT EXISTS schedule_entries_student_date
  ON public.schedule_entries(student_id, date);

-- ── 3. RLS — allow full access via anon key ──────────────────
ALTER TABLE public.study_schedules  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_all" ON public.study_schedules;
DROP POLICY IF EXISTS "anon_all" ON public.schedule_entries;

CREATE POLICY "anon_all" ON public.study_schedules
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.schedule_entries
  FOR ALL USING (true) WITH CHECK (true);

-- ── 4. Fix student_progress if student_id is UUID type ───────
--  Check first by running:
--    SELECT data_type FROM information_schema.columns
--    WHERE table_name = 'student_progress' AND column_name = 'student_id';
--
--  If it says "uuid", run the two lines below; otherwise skip them.
--
-- ALTER TABLE public.student_progress DROP CONSTRAINT IF EXISTS student_progress_pkey;
-- ALTER TABLE public.student_progress ALTER COLUMN student_id TYPE TEXT;
-- ALTER TABLE public.student_progress ADD PRIMARY KEY (student_id);
