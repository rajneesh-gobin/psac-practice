-- ═══════════════════════════════════════════════════════════════════════════
--  Length caps on the text columns a user can write
--
--  WHAT THIS IS NOT FOR
--  ⚠ It is NOT SQL-injection defence, and nothing here should be mistaken for
--    it. This app issues no SQL: every write goes through PostgREST or a
--    SECURITY DEFINER function with typed parameters, so a value is data at
--    every step and can never become syntax. Measured 2026-09-08: 0 raw SQL
--    strings, 74 .rpc() calls, 40 rest/v1 fetches. Adding "sanitisation" for
--    SQLi here would be theatre, and worse, it would suggest the real defence
--    lives in string filtering rather than in parameterisation.
--
--  ⚠ It is NOT XSS defence either. That lives at render time — _attr()/esc() in
--    engine/*.js and guest.js. A stored `<script>` is harmless until something
--    prints it unescaped, and escaping at write time would corrupt legitimate
--    text (a teacher writing "5 < 7" in a description).
--
--  WHAT IT IS FOR
--  `text` in Postgres is unbounded. Several of these columns are written by the
--  BROWSER directly through PostgREST — learning_materials.title/description,
--  profiles.full_name, students.display_name, schedule_entries.notes, the forum
--  bodies — where the only limit today is an HTML maxlength attribute, which is
--  one devtools edit away from irrelevant. Nothing stops a megabyte title that
--  then has to be fetched, cached and rendered on a child's phone for every
--  pupil in the class.
--
--  A CHECK is the only limit a browser cannot bypass, and it is enforced for
--  the service role too — so a bug in a Lambda cannot write one either.
--
--  ⚠ CAPS ARE DELIBERATELY GENEROUS, well above both the UI's maxlength and the
--    longest row that exists. The job is to stop the absurd, not to enforce
--    product rules in the schema: a cap set to the current UI limit turns a
--    later copy change into a database error.
--
--  Measured before choosing them (longest existing value):
--    learning_materials.title 16 · description 0 · guest_assignments.title 39
--    teacher_guest_classes.name 12 · teacher_guest_pupils.name 10
--    profiles.full_name 20 · students.display_name 13 · username 20
--    schedule_entries.notes 0 · forum_posts.title 58 · body 1000
--    forum_replies.body 187
--  Every cap below is comfortably above its column's longest row, so adding
--  them cannot reject data that already exists.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  r record;
  caps constant text[][] := ARRAY[
    -- table,                    column,          cap
    ['learning_materials',       'title',           '200'],
    ['learning_materials',       'description',     '500'],
    ['learning_materials',       'subject',          '60'],
    ['learning_materials',       'file_name',       '260'],   -- a real filename
    ['learning_materials',       'external_url',   '2000'],   -- browsers stop caring past ~2k
    ['teacher_guest_classes',    'name',             '80'],
    ['teacher_guest_pupils',     'name',             '80'],
    ['guest_assignments',        'title',           '200'],
    ['guest_assignments',        'teacher_label',   '120'],
    ['guest_assignments',        'classroom_label', '120'],
    ['profiles',                 'full_name',       '120'],
    ['students',                 'display_name',     '80'],
    ['students',                 'username',         '60'],
    ['schedule_entries',         'notes',          '1000'],
    ['forum_posts',              'title',           '200'],
    ['forum_posts',              'body',           '5000'],
    ['forum_replies',            'body',           '5000']
  ];
  i int;
  v_tbl text; v_col text; v_cap text; v_name text; v_longest bigint;
BEGIN
  FOR i IN 1 .. array_length(caps, 1) LOOP
    v_tbl := caps[i][1]; v_col := caps[i][2]; v_cap := caps[i][3];
    v_name := v_tbl || '_' || v_col || '_len_ck';

    -- Skip anything not present in this database rather than failing the run.
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                    WHERE table_schema='public' AND table_name=v_tbl AND column_name=v_col) THEN
      RAISE NOTICE 'skip %.% (no such column)', v_tbl, v_col;
      CONTINUE;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = v_name) THEN
      CONTINUE;   -- already applied
    END IF;

    -- ⚠ Refuse rather than truncate if real data would violate the cap. A
    --   migration that silently shortens someone's text is worse than one that
    --   stops and asks.
    EXECUTE format('SELECT coalesce(max(length(%I)),0) FROM public.%I', v_col, v_tbl) INTO v_longest;
    IF v_longest > v_cap::bigint THEN
      RAISE EXCEPTION 'existing %.% is % chars, longer than the proposed cap of %',
        v_tbl, v_col, v_longest, v_cap;
    END IF;

    EXECUTE format(
      'ALTER TABLE public.%I ADD CONSTRAINT %I CHECK (%I IS NULL OR length(%I) <= %s)',
      v_tbl, v_name, v_col, v_col, v_cap);
    RAISE NOTICE 'capped %.% at % chars', v_tbl, v_col, v_cap;
  END LOOP;
END $$;

-- ── verification ───────────────────────────────────────────────────────────
--   SELECT conrelid::regclass AS tbl, conname, pg_get_constraintdef(oid)
--     FROM pg_constraint WHERE conname LIKE '%_len_ck' ORDER BY 1, 2;
