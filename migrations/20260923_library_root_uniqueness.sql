-- ═══════════════════════════════════════════════════════════════════════════
--  Make a TOP-LEVEL library section unique by slug.
--
--  ⚠ MEASURED, NOT REASONED. 20260923_library.sql carries
--      CONSTRAINT library_sections_slug_unique UNIQUE (parent_id, slug)
--    and that constraint does NOT do what it looks like it does for a top-level
--    shelf. In Postgres two NULLs are DISTINCT, so (NULL, 'grade-6') can be
--    inserted any number of times. Probed on the live database immediately
--    after applying it:
--
--      insert into library_sections (parent_id, slug, name)
--        values (null,'dupe-probe','A'), (null,'dupe-probe','B');
--      -- both rows inserted, no error
--
--  The consequence is not theoretical: the publish script upserts the section
--  tree on every run, so the SECOND run would have created a second "Grade 6",
--  a second "Grade 9" and so on - and the shelf would render each grade twice,
--  with the documents split arbitrarily between the copies.
--
--  A partial unique index is the fix that works on every Postgres version.
--  (PG15's `UNIQUE NULLS NOT DISTINCT` would also do it, but this does not
--  depend on the server version and says plainly which case it covers.)
--
--  ⚠ The child case was always fine: a subject row has a real parent_id, so
--    the original constraint already stops "Grade 6 / english" twice.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE UNIQUE INDEX IF NOT EXISTS library_sections_root_slug_unique
  ON public.library_sections (slug)
  WHERE parent_id IS NULL;
