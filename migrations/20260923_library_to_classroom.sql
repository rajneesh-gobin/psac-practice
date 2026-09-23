-- ═══════════════════════════════════════════════════════════════════════════
--  Let a teacher share a LIBRARY document with a classroom.
--
--  ⚠ A REFERENCE, NEVER A COPY. The obvious implementation is to copy the PDF
--    into the teacher's own materials, and it is wrong: the bytes would exist
--    twice, and — far worse — an admin taking a document down would leave every
--    classroom copy standing. A reference makes a takedown propagate everywhere
--    for free, and library files are content-addressed and immutable so the
--    reference can never go stale.
--
--  ⚠ learning_materials ALREADY ANTICIPATED THIS. It carries
--    `source_type` with 'file' and 'link', and the whole downstream — the
--    classroom screen, the /m/<CODE> class page, materials_library_open(),
--    mark-as-done, the calendar — reads `learning_materials`. Adding a third
--    source type means every one of those keeps working untouched, which is why
--    this is a column and not a new table.
--
--  ⚠ THE CHECK CONSTRAINT IS THE POINT. It is what stops a 'library' row that
--    names no document, or a 'file' row with no file. Without the rewrite below
--    the existing constraint would REFUSE every library row, because it demands
--    a file_path or an external_url.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.learning_materials
  ADD COLUMN IF NOT EXISTS library_document_id uuid
    REFERENCES public.library_documents(id) ON DELETE CASCADE;

-- ⚠ ON DELETE CASCADE, deliberately: library_documents rows are never deleted
--   by the app (removal sets a status and keeps the sha256 as a blocklist), so
--   this fires only if someone deletes one by hand — and then a classroom row
--   pointing at nothing is worse than no row.

COMMENT ON COLUMN public.learning_materials.library_document_id IS
  'Set only when source_type = ''library''. The shelf document this row points at; the bytes are never copied.';

ALTER TABLE public.learning_materials DROP CONSTRAINT IF EXISTS learning_materials_source_ck;
ALTER TABLE public.learning_materials ADD CONSTRAINT learning_materials_source_ck CHECK (
  (source_type = 'file'    AND file_path IS NOT NULL AND file_name IS NOT NULL)
  OR
  (source_type = 'link'    AND external_url IS NOT NULL
                           AND external_url ~* '^https?://[^[:space:]]+$')
  OR
  -- ⚠ A library row carries NO file of its own. Requiring file_path here — by
  --   copying the 'file' branch and adding a column — is how this kind of
  --   constraint usually goes wrong.
  (source_type = 'library' AND library_document_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS learning_materials_library_doc_idx
  ON public.learning_materials (library_document_id)
  WHERE library_document_id IS NOT NULL;
