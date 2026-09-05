-- physical_homework: teacher uploads a worksheet (PDF/image) and assigns it to a
-- classroom. Students complete it offline and hand it in physically.
-- Idempotent — safe to run more than once.

CREATE TABLE IF NOT EXISTS public.physical_homework (
  id           uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  teacher_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  classroom_id uuid NOT NULL REFERENCES public.teacher_guest_classes(id) ON DELETE CASCADE,
  title        text NOT NULL,
  subject      text,
  description  text,
  file_path    text,
  file_name    text,
  file_size    bigint,
  expires_at   timestamptz NOT NULL,
  created_at   timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS ph_teacher_idx   ON public.physical_homework(teacher_id);
CREATE INDEX IF NOT EXISTS ph_classroom_idx ON public.physical_homework(classroom_id);
CREATE INDEX IF NOT EXISTS ph_expires_idx   ON public.physical_homework(expires_at);

ALTER TABLE public.physical_homework ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "physical_homework_teacher" ON public.physical_homework;
CREATE POLICY "physical_homework_teacher" ON public.physical_homework
  FOR ALL
  TO authenticated
  USING  (teacher_id = auth.uid())
  WITH CHECK (teacher_id = auth.uid());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.physical_homework TO authenticated;
