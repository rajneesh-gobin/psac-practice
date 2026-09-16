-- ─────────────────────────────────────────────────────────────────────────
-- Length and blank guards on the user-writable text that had none
-- 2026-09-16
--
-- ⚠ THE UI's maxlength IS NOT A VALIDATION. Every one of these columns is
--   reachable by a direct PostgREST call with whatever the caller likes; the
--   `maxlength="40"` on the family-name field stops a typist, not an attacker.
--   Measured on production before writing this, as `authenticated` inside a
--   rolled-back transaction:
--     families.family_name   100,000 chars ACCEPTED, and "        " ACCEPTED
--     profiles.teacher_note  100,000 chars ACCEPTED
--     students.display_name  200 chars refused (a CHECK already exists) but
--                            "     " ACCEPTED
--   Already correctly capped, and left alone: profiles.full_name (120),
--   students.display_name (80) / username (60), forum_posts, forum_replies,
--   classroom_posts, learning_materials, schedule_entries, the guest tables.
--
-- ⚠ WHY family_name MATTERS MOST: children type it on the login screen along
--   with their username and PIN. A blank or whitespace-only family name is one
--   nobody can type, so it locks every child in that family out; a 100,000-char
--   one is stored, indexed and rendered everywhere the family is listed.
--
-- ⚠ btrim() IN THE CHECK, not just a length test. "   " has length 3 and passes
--   a naive `length >= 1` while being unusable as a login credential. The test
--   has to be on the trimmed value.
--
-- ⚠ Every constraint is written `col IS NULL OR (...)` to match the existing
--   ones on these tables, so a nullable column stays nullable. A NOT NULL here
--   would be a different decision and would break rows these tables allow today.
--
-- Safe against live data, measured first: longest family_name 25, longest
-- teacher_note 30, zero blank names, zero blank usernames, zero reports.
-- ─────────────────────────────────────────────────────────────────────────

DO $$
BEGIN
  -- ── families.family_name — a login credential ──────────────────────────
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'families_name_len'
                    AND conrelid = 'public.families'::regclass) THEN
    ALTER TABLE public.families ADD CONSTRAINT families_name_len
      CHECK (family_name IS NULL OR (length(btrim(family_name)) BETWEEN 1 AND 60));
  END IF;

  -- ── profiles.teacher_note — written by the APPLICANT, not only an admin ──
  -- database.md lists teacher_note among the columns deliberately left out of
  -- guard_profiles_privileged(), precisely because a non-admin applicant writes
  -- it. That makes an unbounded length a user-supplied one.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_teacher_note_len'
                    AND conrelid = 'public.profiles'::regclass) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_note_len
      CHECK (teacher_note IS NULL OR length(teacher_note) <= 500);
  END IF;

  -- ── students — the length caps exist; the BLANK case did not ───────────
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_display_name_notblank'
                    AND conrelid = 'public.students'::regclass) THEN
    ALTER TABLE public.students ADD CONSTRAINT students_display_name_notblank
      CHECK (display_name IS NULL OR length(btrim(display_name)) >= 1);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_username_notblank'
                    AND conrelid = 'public.students'::regclass) THEN
    ALTER TABLE public.students ADD CONSTRAINT students_username_notblank
      CHECK (username IS NULL OR length(btrim(username)) >= 1);
  END IF;

  -- ── question_reports — free text from a signed-in user ─────────────────
  -- ⚠ anon can NOT insert these: measured, RLS refuses it (42501). CLAUDE.md
  --   still says anon can, and that note is out of date. A signed-in child or
  --   parent can, so the text is still user-supplied and still needs a bound.
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_message_len'
                    AND conrelid = 'public.question_reports'::regclass) THEN
    ALTER TABLE public.question_reports ADD CONSTRAINT question_reports_message_len
      CHECK (message IS NULL OR length(message) <= 4000);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_qtext_len'
                    AND conrelid = 'public.question_reports'::regclass) THEN
    ALTER TABLE public.question_reports ADD CONSTRAINT question_reports_qtext_len
      CHECK (question_text IS NULL OR length(question_text) <= 8000);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_admin_note_len'
                    AND conrelid = 'public.question_reports'::regclass) THEN
    ALTER TABLE public.question_reports ADD CONSTRAINT question_reports_admin_note_len
      CHECK (admin_note IS NULL OR length(admin_note) <= 4000);
  END IF;
END $$;
