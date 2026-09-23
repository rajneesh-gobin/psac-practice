-- ═══════════════════════════════════════════════════════════════════════════
--  Putting a library paper on a CLASS's day.
--
--  ⚠ A TEACHER CANNOT WRITE student_assignments, AND THAT IS NOT A BUG.
--    The INSERT policy on student_assignments is `owns_student_txt(student_id)
--    OR is_admin()` — the row is the FAMILY's. A teacher's pupils are not
--    students rows they own; in a guest classroom they are not students rows at
--    all. So the parent half of "assign this paper" and the teacher half of it
--    land in two different tables by design, and the one migration that tried
--    to serve both would have needed the teacher to be able to write into other
--    people's families.
--
--    Parent  →  student_assignments.library_document_id  (20260923_assign_a_paper.sql)
--    Teacher →  a class MATERIAL, plus this: a dated event on the class calendar.
--
--  ⚠ guest_assignments IS THE WRONG TABLE FOR THIS and was checked before this
--    was written: it is a QUESTION SET (question_ids, question_count, pin_hash,
--    duration_mins) sat inside the app and marked automatically. A PDF past
--    paper has none of those and is worked on paper. Forcing one into that
--    shape would mean inventing a question count for a document that has no
--    questions in the database at all.
--
--  ⚠ kind='due' ALREADY EXISTS in the CHECK constraint and nothing had ever
--    written one (0 rows of any kind on this table). This is the feature that
--    column was waiting for, the same way due_date was.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.teacher_class_events
  ADD COLUMN IF NOT EXISTS library_document_id uuid
    REFERENCES public.library_documents(id) ON DELETE CASCADE;

COMMENT ON COLUMN public.teacher_class_events.library_document_id IS
  'Set when this dated event is a library document the class is to work on. A reference, never a copy — taking the document down takes the dated work with it.';

-- The class page asks "what is this class working on, and when", which is a
-- classroom + date scan. Without this it is a sequential scan per class page.
CREATE INDEX IF NOT EXISTS teacher_class_events_library_idx
  ON public.teacher_class_events (library_document_id)
  WHERE library_document_id IS NOT NULL;
