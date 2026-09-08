-- Assertions for migrations/20260908_chapter_question_progress.sql.
--
-- ⚠ These run as `authenticated` or `anon`, NEVER as the superuser. RLS does
--   not apply to a superuser or to a table's owner, so running them as postgres
--   makes every "can see the row" assertion pass for a total stranger too.
--
-- Identity is switched with `SET test.uid`, which bootstrap.sql's auth.uid()
-- stub reads. A child has no auth.uid() at all — it is anon plus a token —
-- so the student paths are exercised by calling the RPC with p_student while
-- authenticated as the owning parent, which is the parent-preview path, and by
-- proving the anon/no-identity case is refused.

\set ON_ERROR_STOP on

DO $$ BEGIN RAISE NOTICE '── question progress: table shape'; END $$;

-- 1. the table, its key, its FK and its index all exist
SELECT CASE WHEN to_regclass('public.student_question_progress') IS NOT NULL
       THEN 'PASS  table exists' ELSE 'FAIL  table missing' END;

SELECT CASE WHEN EXISTS (
         SELECT 1 FROM pg_constraint
         WHERE conrelid = 'public.student_question_progress'::regclass
           AND contype = 'p')
       THEN 'PASS  primary key (student_id, question_id)' ELSE 'FAIL  no primary key' END;

SELECT CASE WHEN EXISTS (
         SELECT 1 FROM pg_constraint
         WHERE conrelid = 'public.student_question_progress'::regclass
           AND contype = 'f' AND confrelid = 'public.students'::regclass)
       THEN 'PASS  foreign key to students (cascades on delete)'
       ELSE 'FAIL  no foreign key to students' END;

SELECT CASE WHEN EXISTS (
         SELECT 1 FROM pg_indexes
         WHERE tablename = 'student_question_progress'
           AND indexname = 'student_question_progress_student_chapter_idx')
       THEN 'PASS  (student_id, chapter_id) index' ELSE 'FAIL  index missing' END;

-- 2. no write grant to anon or authenticated: the RPC is the only writer
SELECT CASE WHEN NOT (
         has_table_privilege('anon',          'public.student_question_progress', 'INSERT') OR
         has_table_privilege('anon',          'public.student_question_progress', 'UPDATE') OR
         has_table_privilege('anon',          'public.student_question_progress', 'DELETE') OR
         has_table_privilege('authenticated', 'public.student_question_progress', 'INSERT') OR
         has_table_privilege('authenticated', 'public.student_question_progress', 'UPDATE') OR
         has_table_privilege('authenticated', 'public.student_question_progress', 'DELETE'))
       THEN 'PASS  no direct write grant to anon or authenticated'
       ELSE 'SECURITY FINDING  direct write grant exists on student_question_progress' END;

SELECT CASE WHEN has_table_privilege('anon', 'public.student_question_progress', 'SELECT')
             AND has_table_privilege('authenticated', 'public.student_question_progress', 'SELECT')
       THEN 'PASS  read grant present for anon and authenticated'
       ELSE 'FAIL  read grant missing' END;

-- 3. SECURITY DEFINER functions have a pinned search_path
SELECT CASE WHEN (SELECT count(*) FROM pg_proc p
                  WHERE p.proname IN ('record_question_progress','backfill_question_progress')
                    AND p.prosecdef
                    AND array_to_string(coalesce(p.proconfig,'{}'), ',') LIKE '%search_path%') = 2
       THEN 'PASS  both SECURITY DEFINER functions pin search_path'
       ELSE 'SECURITY FINDING  a SECURITY DEFINER function has no pinned search_path' END;

DO $$ BEGIN RAISE NOTICE '── question progress: the write path'; END $$;

SET ROLE authenticated;

-- 4. Anna owns Ayesha, so the parent-preview write is accepted
SET test.uid = 'a1111111-1111-1111-1111-111111111111';
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","subject_pack_id":"grade6-science","correct":false,"event_key":"e1"}]'::jsonb,
         'cccc0000-0000-0000-0000-00000000000c') ->> 'ok') = 'true'
       THEN 'PASS  owning parent may record for their own child'
       ELSE 'FAIL  owning parent was refused' END;

-- 5. a first wrong answer is needs_practice
SELECT CASE WHEN state = 'needs_practice' AND attempts = 1 AND wrong_attempts = 1 AND ever_wrong
       THEN 'PASS  first wrong -> needs_practice'
       ELSE 'FAIL  first wrong gave state=' || state || ' attempts=' || attempts END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

-- 6. replaying the SAME event key changes nothing
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","correct":false,"event_key":"e1"}]'::jsonb,
  'cccc0000-0000-0000-0000-00000000000c');
SELECT CASE WHEN attempts = 1
       THEN 'PASS  replaying an event key is idempotent'
       ELSE 'FAIL  retry double-counted: attempts=' || attempts END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

-- 7. correct after wrong -> improved (not secure: one lucky answer is not enough)
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","correct":true,"event_key":"e2"}]'::jsonb,
  'cccc0000-0000-0000-0000-00000000000c');
SELECT CASE WHEN state = 'improved' AND consecutive_correct = 1 AND recovered_at IS NOT NULL
       THEN 'PASS  wrong -> correct = improved'
       ELSE 'FAIL  expected improved, got ' || state END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

-- 8. a second consecutive correct -> secure
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","correct":true,"event_key":"e3"}]'::jsonb,
  'cccc0000-0000-0000-0000-00000000000c');
SELECT CASE WHEN state = 'secure' AND consecutive_correct = 2 AND correct_attempts = 2
       THEN 'PASS  improved + correct = secure'
       ELSE 'FAIL  expected secure, got ' || state END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

-- 9. a later wrong drops it back to needs_practice
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","correct":false,"event_key":"e4"}]'::jsonb,
  'cccc0000-0000-0000-0000-00000000000c');
SELECT CASE WHEN state = 'needs_practice' AND consecutive_correct = 0
       THEN 'PASS  a later wrong returns secure -> needs_practice'
       ELSE 'FAIL  expected needs_practice, got ' || state END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

-- 10. a first correct on a never-wrong question is secure straight away
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-011","chapter_id":"g6-air","correct":true,"event_key":"f1"}]'::jsonb,
  'cccc0000-0000-0000-0000-00000000000c');
SELECT CASE WHEN state = 'secure' AND NOT ever_wrong AND attempts = 1
       THEN 'PASS  first correct (never wrong) = secure, counts retained'
       ELSE 'FAIL  expected secure, got ' || state END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-011';

DO $$ BEGIN RAISE NOTICE '── question progress: isolation between families'; END $$;

-- 11. Brian cannot write to Anna's child
SET test.uid = 'b2222222-2222-2222-2222-222222222222';
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-099","chapter_id":"g6-air","correct":true,"event_key":"x1"}]'::jsonb,
         'cccc0000-0000-0000-0000-00000000000c') ->> 'error') = 'not_authorized'
       THEN 'PASS  a stranger cannot record progress for another family''s child'
       ELSE 'SECURITY FINDING  cross-family write was not refused' END;

-- 12. Brian cannot read Anna's child's rows
SELECT CASE WHEN count(*) = 0
       THEN 'PASS  a stranger reads none of another family''s progress'
       ELSE 'SECURITY FINDING  cross-family read returned ' || count(*) || ' row(s)' END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c';

-- 13. Anna CAN read her own child's rows
SET test.uid = 'a1111111-1111-1111-1111-111111111111';
SELECT CASE WHEN count(*) >= 2
       THEN 'PASS  the owning parent reads their child''s progress'
       ELSE 'FAIL  owning parent saw ' || count(*) || ' row(s)' END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c';

-- 14. and none of Brian's
SELECT CASE WHEN count(*) = 0
       THEN 'PASS  the owning parent reads none of the other family''s progress'
       ELSE 'SECURITY FINDING  parent read ' || count(*) || ' foreign row(s)' END
FROM public.student_question_progress
WHERE student_id = 'dddd0000-0000-0000-0000-00000000000d';

-- 15. a direct INSERT is refused even for the owning parent
DO $$
BEGIN
  BEGIN
    INSERT INTO public.student_question_progress (student_id, question_id, chapter_id)
    VALUES ('cccc0000-0000-0000-0000-00000000000c', 'direct-write', 'g6-air');
    RAISE NOTICE 'SECURITY FINDING  a direct INSERT succeeded; the RPC is not the only write path';
  EXCEPTION WHEN insufficient_privilege OR others THEN
    RAISE NOTICE 'PASS  a direct INSERT is refused';
  END;
END $$;

-- 16. with no identity at all, the RPC refuses
RESET test.uid;
SET ROLE anon;
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-010","chapter_id":"g6-air","correct":true}]'::jsonb,
         'cccc0000-0000-0000-0000-00000000000c') ->> 'error') = 'not_authorized'
       THEN 'PASS  anon with no student token is refused'
       ELSE 'SECURITY FINDING  anon was able to write progress' END;

DO $$ BEGIN RAISE NOTICE '── question progress: legacy backfill'; END $$;

SET ROLE authenticated;
SET test.uid = 'a1111111-1111-1111-1111-111111111111';

-- 17. answeredIds backfills as seen-with-outcome-unknown, never as correct
SELECT CASE WHEN (public.backfill_question_progress('cccc0000-0000-0000-0000-00000000000c') ->> 'ok') = 'true'
       THEN 'PASS  backfill runs for an owned child' ELSE 'FAIL  backfill refused' END;

SELECT CASE WHEN count(*) = 4 AND bool_and(state = 'legacy_seen')
                             AND bool_and(attempts = 0)
                             AND bool_and(correct_attempts = 0)
       THEN 'PASS  legacy answeredIds become legacy_seen with no invented correctness'
       ELSE 'FAIL  backfill produced ' || count(*) || ' row(s), states: ' ||
            string_agg(DISTINCT state, ',') END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c'
  AND question_id IN ('g6sci-air-001','g6sci-air-002','g6sci-air-003','g6sci-mat-001');

-- 18. the backfill never overwrites a question that has already been answered
SELECT CASE WHEN state = 'needs_practice'
       THEN 'PASS  backfill leaves real progress untouched'
       ELSE 'FAIL  backfill overwrote a real row with ' || state END
FROM public.student_question_progress
WHERE student_id = 'cccc0000-0000-0000-0000-00000000000c' AND question_id = 'g6sci-air-010';

RESET ROLE;
RESET test.uid;
