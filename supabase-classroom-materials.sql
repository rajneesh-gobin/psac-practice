-- classroom_materials: records which classrooms each material is assigned to.
-- Idempotent — safe to run more than once.

CREATE TABLE IF NOT EXISTS public.classroom_materials (
  material_id  uuid NOT NULL REFERENCES public.learning_materials(id) ON DELETE CASCADE,
  classroom_id uuid NOT NULL REFERENCES public.teacher_guest_classes(id) ON DELETE CASCADE,
  assigned_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (material_id, classroom_id)
);

CREATE INDEX IF NOT EXISTS cm_material_idx  ON public.classroom_materials(material_id);
CREATE INDEX IF NOT EXISTS cm_classroom_idx ON public.classroom_materials(classroom_id);

ALTER TABLE public.classroom_materials ENABLE ROW LEVEL SECURITY;

-- Teachers manage assignments for their own materials only.
DROP POLICY IF EXISTS "classroom_materials_teacher" ON public.classroom_materials;
CREATE POLICY "classroom_materials_teacher" ON public.classroom_materials
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.learning_materials m
      WHERE m.id = material_id AND m.teacher_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.learning_materials m
      WHERE m.id = material_id AND m.teacher_id = auth.uid()
    )
  );

GRANT SELECT, INSERT, DELETE ON public.classroom_materials TO authenticated;
