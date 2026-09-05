-- report_error.sql
-- Additive migration: question report inbox (admin replies + student follow-ups).
-- Safe to re-run on a database that already has supabase-question-reports.sql applied.
-- Run in Supabase SQL editor. All changes are additive — no existing data is touched.

-- Require current_student_id() — it is defined by supabase-student-plan-features.sql
-- and has been applied to production. Fail early rather than silently creating
-- RPCs that reference a non-existent function.
DO $$ BEGIN
  IF to_regprocedure('public.current_student_id()') IS NULL THEN
    RAISE EXCEPTION 'current_student_id() is required — apply supabase-student-plan-features.sql first';
  END IF;
END $$;

-- ── 1. Extend question_reports ────────────────────────────────────────────────
ALTER TABLE public.question_reports
  ADD COLUMN IF NOT EXISTS updated_at            TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS admin_note            TEXT,
  ADD COLUMN IF NOT EXISTS chapter_id            TEXT,
  ADD COLUMN IF NOT EXISTS report_type           TEXT        DEFAULT 'other',
  ADD COLUMN IF NOT EXISTS student_last_seen_at  TIMESTAMPTZ;

-- Back-fill updated_at from created_at for existing rows so the inbox sort is sane.
UPDATE public.question_reports SET updated_at = created_at WHERE updated_at IS NULL;

-- Valid statuses:
--   open       — new, no admin action taken
--   in_review  — admin has replied (set automatically by the trigger below)
--   resolved   — admin fixed or confirmed the question is correct
--   wont_fix   — reviewed and no change needed

-- ── 2. Messages table ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.question_report_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id   UUID        NOT NULL REFERENCES public.question_reports(id) ON DELETE CASCADE,
  author_type TEXT        NOT NULL CHECK (author_type IN ('admin', 'student')),
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS qrmsgs_report_idx
  ON public.question_report_messages (report_id, created_at);

ALTER TABLE public.question_report_messages ENABLE ROW LEVEL SECURITY;

-- Admins have full access.
DROP POLICY IF EXISTS "admins manage report messages" ON public.question_report_messages;
CREATE POLICY "admins manage report messages"
  ON public.question_report_messages FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_report_messages TO authenticated;

-- ── 3. Trigger: auto-update updated_at + status on new message ────────────────
CREATE OR REPLACE FUNCTION public._qr_on_message()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.question_reports SET updated_at = NOW()
  WHERE id = NEW.report_id;
  -- When an admin replies, advance status from 'open' to 'in_review' so the
  -- student sees a visual change in their inbox without the admin having to
  -- manually set it.
  IF NEW.author_type = 'admin' THEN
    UPDATE public.question_reports
    SET status = 'in_review'
    WHERE id = NEW.report_id AND status = 'open';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS qr_on_message ON public.question_report_messages;
CREATE TRIGGER qr_on_message
  AFTER INSERT ON public.question_report_messages
  FOR EACH ROW EXECUTE FUNCTION public._qr_on_message();

-- ── 4. RPC: student reads their own reports ───────────────────────────────────
-- SECURITY DEFINER so it can call current_student_id() which reads the
-- x-student-token request header — students have no Supabase JWT.
CREATE OR REPLACE FUNCTION public.get_student_reports(p_student_id uuid DEFAULT NULL)
RETURNS TABLE (
  id                   uuid,
  question_id          text,
  question_text        text,
  message              text,
  status               text,
  report_type          text,
  chapter_id           text,
  created_at           timestamptz,
  updated_at           timestamptz,
  student_last_seen_at timestamptz,
  reply_count          bigint,
  last_admin_message   text
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
  v_sid uuid;
BEGIN
  v_sid := current_student_id();

  IF v_sid IS NULL THEN
    -- Parent previewing a child (no student token, but has a JWT)
    IF p_student_id IS NOT NULL AND auth.uid() IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM public.students s
        JOIN public.families f ON f.id = s.family_id
        WHERE s.id = p_student_id
          AND (f.parent_id = auth.uid()
               OR EXISTS (
                 SELECT 1 FROM public.family_members fm
                 WHERE fm.family_id = f.id AND fm.user_id = auth.uid()
               ))
      ) THEN
        v_sid := p_student_id;
      ELSE
        RAISE EXCEPTION 'not_authorized';
      END IF;
    ELSE
      RETURN; -- no identity: return empty
    END IF;
  END IF;

  RETURN QUERY
  SELECT
    qr.id,
    qr.question_id,
    left(coalesce(qr.question_text, ''), 300)::text,
    qr.message,
    coalesce(qr.status, 'open'),
    coalesce(qr.report_type, 'other'),
    qr.chapter_id,
    qr.created_at,
    coalesce(qr.updated_at, qr.created_at),
    qr.student_last_seen_at,
    (SELECT count(*) FROM public.question_report_messages m
     WHERE m.report_id = qr.id AND m.author_type = 'admin')::bigint,
    (SELECT m2.message FROM public.question_report_messages m2
     WHERE m2.report_id = qr.id AND m2.author_type = 'admin'
     ORDER BY m2.created_at DESC LIMIT 1)::text
  FROM public.question_reports qr
  WHERE qr.student_id = v_sid
  ORDER BY coalesce(qr.updated_at, qr.created_at) DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_student_reports(uuid) TO anon, authenticated;

-- ── 5. RPC: student sends a follow-up message ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.add_report_message(p_report_id uuid, p_message text)
RETURNS uuid
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
  v_sid   uuid;
  v_new   uuid;
BEGIN
  v_sid := current_student_id();
  IF v_sid IS NULL THEN
    RAISE EXCEPTION 'no_student';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.question_reports
    WHERE id = p_report_id AND student_id = v_sid
  ) THEN
    RAISE EXCEPTION 'not_authorized';
  END IF;

  p_message := trim(left(p_message, 1000));
  IF length(p_message) = 0 THEN
    RAISE EXCEPTION 'empty_message';
  END IF;

  INSERT INTO public.question_report_messages (report_id, author_type, message)
  VALUES (p_report_id, 'student', p_message)
  RETURNING id INTO v_new;

  -- Re-open a resolved/closed report so admin notices the follow-up.
  UPDATE public.question_reports
  SET status = 'open', updated_at = NOW()
  WHERE id = p_report_id AND status IN ('resolved', 'wont_fix');

  RETURN v_new;
END;
$$;

GRANT EXECUTE ON FUNCTION public.add_report_message(uuid, text) TO anon, authenticated;

-- ── 6. RPC: student marks a report as seen ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.mark_report_seen(p_report_id uuid)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
  v_sid uuid;
BEGIN
  v_sid := current_student_id();
  IF v_sid IS NULL THEN RETURN; END IF;

  UPDATE public.question_reports
  SET student_last_seen_at = NOW()
  WHERE id = p_report_id AND student_id = v_sid;
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_report_seen(uuid) TO anon, authenticated;

-- ── 7. Index for the student inbox query (student_id lookup) ──────────────────
CREATE INDEX IF NOT EXISTS qreports_student_idx
  ON public.question_reports (student_id, updated_at DESC);
