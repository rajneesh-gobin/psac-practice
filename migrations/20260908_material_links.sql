-- ═══════════════════════════════════════════════════════════════════════════
--  Learning materials that are a LINK, not an uploaded file
--  (YouTube video, or a PDF that already lives somewhere else)
--
--  WHY A MIGRATION IS UNAVOIDABLE HERE
--  Measured against the LIVE table on 2026-09-08 (PostgREST OpenAPI, not the
--  dump): learning_materials requires id, title, file_path, file_name and
--  link_expiry_seconds. There is no column that can hold a URL, and both
--  file_path and file_name are NOT NULL, so a link row cannot be inserted at
--  all. This is the "real incompatibility" test in CLAUDE.md, not a ceremonial
--  migration: the format genuinely does not fit the table.
--
--  ⚠ NOT a second table. A pupil's Materials list, the classroom Materials
--    section and the teacher's own tab all read one list and sort it with one
--    comparator (sortMaterials() in engine/helpers.js, copied in guest.js). A
--    separate learning_material_links table would give every one of those
--    readers a second source to merge, and the junction table
--    classroom_materials would need a twin. One table, one discriminator.
--
--  ⚠ NO new GRANT is needed, and that was checked rather than assumed.
--    public.learning_materials carries TABLE-level grants
--    (GRANT ... ON public.learning_materials TO anon, authenticated,
--    service_role), so a new column inherits them. Contrast public.students,
--    which has COLUMN-level SELECT grants and where adding deleted_at silently
--    emptied the parent dashboard until a GRANT SELECT (col) was added beside
--    it. Verify with \dp public.learning_materials before trusting this note.
--
--  ⚠ Existing rows are untouched: source_type defaults to 'file', which is
--    exactly what all of them are. Measured 2026-09-08: 2 live rows.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. the discriminator and the URL ───────────────────────────────────────
ALTER TABLE public.learning_materials
  ADD COLUMN IF NOT EXISTS source_type  text NOT NULL DEFAULT 'file';
ALTER TABLE public.learning_materials
  ADD COLUMN IF NOT EXISTS external_url text;

-- ── 2. a link row has no file ──────────────────────────────────────────────
-- These two are NOT NULL today, which is what blocks a link outright.
ALTER TABLE public.learning_materials ALTER COLUMN file_path SET DEFAULT NULL;
ALTER TABLE public.learning_materials ALTER COLUMN file_name SET DEFAULT NULL;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_attribute
             WHERE attrelid = 'public.learning_materials'::regclass
               AND attname = 'file_path' AND attnotnull) THEN
    ALTER TABLE public.learning_materials ALTER COLUMN file_path DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_attribute
             WHERE attrelid = 'public.learning_materials'::regclass
               AND attname = 'file_name' AND attnotnull) THEN
    ALTER TABLE public.learning_materials ALTER COLUMN file_name DROP NOT NULL;
  END IF;
END $$;

-- ── 3. the integrity the dropped NOT NULLs used to provide ─────────────────
-- ⚠ Dropping NOT NULL without this would allow a row that is neither a file
--   nor a link — it would appear in every teacher's list and every pupil's
--   list as an untappable ghost. The CHECK is what keeps "every material is
--   openable" true, which is the property the NOT NULLs were really enforcing.
-- ⚠ external_url is deliberately constrained to http/https. A material URL is
--   rendered into an href on the pupil page; javascript: and data: URLs are
--   refused HERE as well as in the browser, because the browser check is the
--   one an attacker controls.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conrelid = 'public.learning_materials'::regclass
                   AND conname = 'learning_materials_source_ck') THEN
    ALTER TABLE public.learning_materials
      ADD CONSTRAINT learning_materials_source_ck CHECK (
        (source_type = 'file'
           AND file_path IS NOT NULL AND file_name IS NOT NULL)
        OR
        (source_type = 'link'
           AND external_url IS NOT NULL
           AND external_url ~* '^https?://[^[:space:]]+$')
      );
  END IF;
END $$;

-- ── 4. the calendar view reads by date ─────────────────────────────────────
-- The Materials tab can group by the day a file was shared. classroom_materials
-- is already keyed (material_id, classroom_id); this is the index for "what did
-- I share, and when", which is the query the calendar month grid runs.
CREATE INDEX IF NOT EXISTS learning_materials_teacher_created_idx
  ON public.learning_materials USING btree (teacher_id, created_at DESC);
CREATE INDEX IF NOT EXISTS classroom_materials_assigned_idx
  ON public.classroom_materials USING btree (classroom_id, assigned_at DESC);

-- ── 5. verification ────────────────────────────────────────────────────────
-- Run after applying. Expect: source_type NOT NULL default 'file',
-- external_url nullable, file_path/file_name nullable, the CHECK present,
-- and every pre-existing row still source_type = 'file'.
--
--   SELECT attname, attnotnull FROM pg_attribute
--    WHERE attrelid = 'public.learning_materials'::regclass AND attnum > 0
--    ORDER BY attnum;
--   SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint
--    WHERE conrelid = 'public.learning_materials'::regclass;
--   SELECT source_type, count(*) FROM public.learning_materials GROUP BY 1;
--   \dp public.learning_materials
