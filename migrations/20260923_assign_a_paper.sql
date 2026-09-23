-- ═══════════════════════════════════════════════════════════════════════════
--  Assign a library paper to a child, for a day.
--
--  ⚠ TWO GAPS, AND THE SECOND IS THE BIGGER ONE.
--    1. There was no way to assign a library document at all — a teacher could
--       share one to a class as a MATERIAL, which puts it on the class page but
--       never makes it dated work, and a parent had no path whatsoever.
--    2. `due_date` has existed on this table and is referenced NOWHERE in the
--       application: zero hits across engine/ and workers/. Store.createAssignment()
--       never accepted a date and never wrote one, and both live rows have
--       due_date NULL. So "assign it for Tuesday" did not work for ordinary
--       chapter practice either. The column was added by a migration and the
--       feature behind it was never built.
--
--  This migration does the database half of both: a paper can be the subject of
--  an assignment, and a date means something.
--
--  ⚠ NOT A COPY, A REFERENCE — the same rule the classroom share follows. The
--    assignment points at the library document; taking the document down takes
--    the work with it rather than leaving a dated task pointing at nothing.
--
--  ⚠ THE CHECK SAYS "NOT BOTH", NOT "EXACTLY ONE". Both existing rows are
--    chapter work and would pass either way, but an assignment with neither is
--    a shape this table has always allowed (a bare note to a child), and
--    tightening that here would fail rows this migration has no business
--    judging. It rules out only the one combination that cannot be rendered:
--    a row that is a chapter task AND a paper at the same time.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.student_assignments
  ADD COLUMN IF NOT EXISTS library_document_id uuid
    REFERENCES public.library_documents(id) ON DELETE CASCADE;

COMMENT ON COLUMN public.student_assignments.library_document_id IS
  'Set when the assigned work is a library document rather than a chapter. Mutually exclusive with chapter_id; the bytes are never copied.';

COMMENT ON COLUMN public.student_assignments.due_date IS
  'The day the work is for. NULL means "any time" — a child sees it in their list but it is not placed on a date.';

ALTER TABLE public.student_assignments DROP CONSTRAINT IF EXISTS student_assignments_one_kind_chk;
ALTER TABLE public.student_assignments ADD CONSTRAINT student_assignments_one_kind_chk CHECK (
  NOT (chapter_id IS NOT NULL AND library_document_id IS NOT NULL)
);

-- "What is due, soonest first" is the query the child's list and the calendar
-- both want, and neither could ask it before.
CREATE INDEX IF NOT EXISTS student_assignments_due_idx
  ON public.student_assignments (student_id, due_date)
  WHERE completed_at IS NULL;

CREATE INDEX IF NOT EXISTS student_assignments_library_idx
  ON public.student_assignments (library_document_id)
  WHERE library_document_id IS NOT NULL;
