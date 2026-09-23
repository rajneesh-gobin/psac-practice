-- ═══════════════════════════════════════════════════════════════════════════
--  Record what a submitted PDF looks like it might be leaking.
--
--  ⚠ THE RISK THIS ADDRESSES IS MORE LIKELY THAN COPYRIGHT. A teacher uploads a
--    worksheet with her class list on page 3. A parent scans a paper with their
--    child's name, school and a phone number in the margin. Once it is on a
--    public URL it is public — and it is a child's name.
--
--  ⚠ A HINT, NEVER A VERDICT. The scan reads the raw bytes of the PDF, which
--    only sees text that is not compressed, and half this corpus is scanned
--    images with no text layer at all. So a clean result means "nothing
--    obvious", not "nothing there" — and the review screen must say so, or the
--    flag becomes a licence to stop looking.
--
--  ⚠ The document is NOT blocked by a flag. Deciding is a person's job; this
--    only makes sure they are told where to look.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.library_documents
  ADD COLUMN IF NOT EXISTS pii_flags text[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.library_documents.pii_flags IS
  'Patterns that looked like personal data in the raw upload (email, phone, id-number). A hint for the reviewer, never a block, and never proof of absence.';
