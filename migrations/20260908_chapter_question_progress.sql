-- ═══════════════════════════════════════════════════════════════════════════
--  Per-question practice progress  (chapter practice journey / Question Map)
--
--  WHY A TABLE AND NOT student_progress.data
--  Store.saveStudentProgress() upserts the WHOLE blob on every save. Two
--  devices practising the same chapter is therefore last-writer-wins over
--  everything, and the only conflict guard (loadStudentProgress comparing
--  stats.totalAttempted) protects reads, not writes. Per-question state cannot
--  survive that. Measured 2026-09-08: 14,696 questions in 160 chapters, so one
--  grade's worth of per-question records is ~255 KB of JSON rewritten on every
--  throttled save, against blobs that are 440 B - 9.7 KB today.
--  A (student_id, question_id) primary key resolves conflicts at exactly the
--  granularity that changes, and makes a retry idempotent.
--
--  ⚠ student_id is uuid WITH a real foreign key, deliberately unlike
--    student_progress.student_id (text, no FK). That legacy shape is why
--    admin-delete-account.js has to purge five tables by hand after the cascade
--    — see CLAUDE.md. This table cascades on its own and adds nothing to that
--    list.
--
--  ⚠ There is NO insert/update/delete grant on this table for anon or
--    authenticated. record_question_progress() is the only write path. A grant
--    that does not exist cannot be re-opened by a later policy mistake.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. table ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.student_question_progress (
  student_id          uuid        NOT NULL,
  question_id         text        NOT NULL,
  subject_pack_id     text,
  chapter_id          text        NOT NULL,
  first_seen_at       timestamptz NOT NULL DEFAULT now(),
  last_seen_at        timestamptz NOT NULL DEFAULT now(),
  attempts            integer     NOT NULL DEFAULT 0,
  correct_attempts    integer     NOT NULL DEFAULT 0,
  wrong_attempts      integer     NOT NULL DEFAULT 0,
  consecutive_correct integer     NOT NULL DEFAULT 0,
  last_result         text,
  ever_wrong          boolean     NOT NULL DEFAULT false,
  recovered_at        timestamptz,
  -- Derived by the RPC and stored, so the Question Map is one indexed read
  -- rather than a recomputation per cell. The RPC is the single writer, so the
  -- stored value cannot drift from the counters beside it.
  state               text        NOT NULL DEFAULT 'not_tried',
  -- Idempotency. The client sends one key per answer event; replaying it is a
  -- no-op instead of a second increment.
  last_event_key      text,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS subject_pack_id text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS recovered_at timestamptz;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS state text DEFAULT 'not_tried';
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS last_event_key text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conname = 'student_question_progress_pkey'
                   AND conrelid = 'public.student_question_progress'::regclass) THEN
    ALTER TABLE public.student_question_progress
      ADD CONSTRAINT student_question_progress_pkey PRIMARY KEY (student_id, question_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conname = 'student_question_progress_student_id_fkey'
                   AND conrelid = 'public.student_question_progress'::regclass) THEN
    ALTER TABLE public.student_question_progress
      ADD CONSTRAINT student_question_progress_student_id_fkey
      FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conname = 'student_question_progress_state_check'
                   AND conrelid = 'public.student_question_progress'::regclass) THEN
    ALTER TABLE public.student_question_progress
      ADD CONSTRAINT student_question_progress_state_check
      CHECK (state IN ('not_tried', 'needs_practice', 'improved', 'secure', 'legacy_seen'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                 WHERE conname = 'student_question_progress_last_result_check'
                   AND conrelid = 'public.student_question_progress'::regclass) THEN
    ALTER TABLE public.student_question_progress
      ADD CONSTRAINT student_question_progress_last_result_check
      CHECK (last_result IS NULL OR last_result IN ('correct', 'wrong', 'unknown'));
  END IF;
END $$;

-- The Question Map reads one chapter at a time; nothing reads by question alone.
CREATE INDEX IF NOT EXISTS student_question_progress_student_chapter_idx
  ON public.student_question_progress (student_id, chapter_id);

-- ── 2. RLS: read-only to the owner, the owning parent, and admins ──────────
ALTER TABLE public.student_question_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS sqp_read ON public.student_question_progress;
CREATE POLICY sqp_read ON public.student_question_progress
  FOR SELECT
  TO public
  USING (
    student_id = public.current_student_id()
    OR public.owns_student(student_id)
    OR public.is_admin()
  );

-- No INSERT/UPDATE/DELETE policy exists on purpose. The RPC below is
-- SECURITY DEFINER and is the only writer.

-- ── 3. the write path ─────────────────────────────────────────────────────
--  p_items: [{ question_id, chapter_id, subject_pack_id, correct, event_key }]
--  p_student is optional and only honoured for an adult who owns that child —
--  the parent-preview path has no student token and authorises by JWT, exactly
--  like student_plan_features().
CREATE OR REPLACE FUNCTION public.record_question_progress(
  p_items   jsonb,
  p_student uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_item    jsonb;
  v_written integer := 0;
  v_skipped integer := 0;
  v_qid     text;
  v_chapter text;
  v_pack    text;
  v_key     text;
  v_correct boolean;
  v_row     public.student_question_progress%ROWTYPE;
  v_state   text;
  v_cc      integer;
  v_rec     timestamptz;
BEGIN
  -- A child's own token wins. An adult may name a child they own.
  IF v_student IS NULL THEN
    IF p_student IS NULL THEN
      RETURN jsonb_build_object('ok', false, 'error', 'no_student');
    END IF;
    IF NOT public.owns_student(p_student) THEN
      RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
    END IF;
    v_student := p_student;
  ELSIF p_student IS NOT NULL AND p_student <> v_student THEN
    -- A student token may only ever write its own row.
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
  END IF;

  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_items');
  END IF;
  IF jsonb_array_length(p_items) > 100 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'too_many_items');
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_qid     := nullif(trim(v_item ->> 'question_id'), '');
    v_chapter := nullif(trim(v_item ->> 'chapter_id'), '');
    v_pack    := nullif(trim(v_item ->> 'subject_pack_id'), '');
    v_key     := nullif(trim(v_item ->> 'event_key'), '');
    v_correct := (v_item ->> 'correct')::boolean;

    CONTINUE WHEN v_qid IS NULL OR v_chapter IS NULL OR v_correct IS NULL;
    CONTINUE WHEN length(v_qid) > 128 OR length(v_chapter) > 128;

    SELECT * INTO v_row
    FROM public.student_question_progress
    WHERE student_id = v_student AND question_id = v_qid;

    -- Idempotency: the same answer event replayed by a retry changes nothing.
    IF FOUND AND v_key IS NOT NULL AND v_row.last_event_key = v_key THEN
      v_skipped := v_skipped + 1;
      CONTINUE;
    END IF;

    v_cc  := CASE WHEN v_correct THEN coalesce(v_row.consecutive_correct, 0) + 1 ELSE 0 END;
    v_rec := v_row.recovered_at;

    -- State machine. A first correct answer on a question never answered
    -- wrongly is secure; after a wrong answer it takes two consecutive correct
    -- answers, so one lucky guess does not clear it.
    IF NOT v_correct THEN
      v_state := 'needs_practice';
    ELSIF NOT coalesce(v_row.ever_wrong, false) THEN
      v_state := 'secure';
    ELSIF v_cc >= 2 THEN
      v_state := 'secure';
      v_rec   := coalesce(v_rec, now());
    ELSE
      v_state := 'improved';
      v_rec   := coalesce(v_rec, now());
    END IF;

    INSERT INTO public.student_question_progress AS t (
      student_id, question_id, subject_pack_id, chapter_id,
      first_seen_at, last_seen_at, attempts, correct_attempts, wrong_attempts,
      consecutive_correct, last_result, ever_wrong, recovered_at, state,
      last_event_key, updated_at
    ) VALUES (
      v_student, v_qid, v_pack, v_chapter,
      now(), now(), 1,
      CASE WHEN v_correct THEN 1 ELSE 0 END,
      CASE WHEN v_correct THEN 0 ELSE 1 END,
      v_cc,
      CASE WHEN v_correct THEN 'correct' ELSE 'wrong' END,
      NOT v_correct, v_rec, v_state, v_key, now()
    )
    ON CONFLICT (student_id, question_id) DO UPDATE SET
      subject_pack_id     = coalesce(EXCLUDED.subject_pack_id, t.subject_pack_id),
      chapter_id          = EXCLUDED.chapter_id,
      -- recency never goes backwards, so an older device arriving late cannot
      -- rewind it
      last_seen_at        = greatest(t.last_seen_at, EXCLUDED.last_seen_at),
      attempts            = t.attempts + 1,
      correct_attempts    = t.correct_attempts + CASE WHEN v_correct THEN 1 ELSE 0 END,
      wrong_attempts      = t.wrong_attempts   + CASE WHEN v_correct THEN 0 ELSE 1 END,
      consecutive_correct = v_cc,
      last_result         = EXCLUDED.last_result,
      ever_wrong          = t.ever_wrong OR NOT v_correct,
      recovered_at        = coalesce(t.recovered_at, EXCLUDED.recovered_at),
      state               = v_state,
      last_event_key      = coalesce(EXCLUDED.last_event_key, t.last_event_key),
      updated_at          = now();

    v_written := v_written + 1;
  END LOOP;

  RETURN jsonb_build_object('ok', true, 'written', v_written, 'skipped', v_skipped);
END;
$function$;

-- ── 4. one-time backfill from the legacy answeredIds array ────────────────
--  answeredIds records only THAT A QUESTION WAS SEEN. It carries no per-question
--  outcome, and chapter-wide totals cannot be split back into one. Those rows
--  are therefore 'legacy_seen' with attempts 0 — they count towards coverage and
--  towards nothing else, until the child answers them again.
CREATE OR REPLACE FUNCTION public.backfill_question_progress(p_student uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_caller uuid := public.current_student_id();
  v_n      integer := 0;
BEGIN
  IF p_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_student');
  END IF;
  IF v_caller IS DISTINCT FROM p_student
     AND NOT public.owns_student(p_student)
     AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
  END IF;

  INSERT INTO public.student_question_progress (
    student_id, question_id, chapter_id, first_seen_at, last_seen_at,
    attempts, correct_attempts, wrong_attempts, consecutive_correct,
    last_result, ever_wrong, state, updated_at
  )
  SELECT p_student,
         qid.value #>> '{}',
         ch.key,
         now(), now(), 0, 0, 0, 0,
         'unknown', false, 'legacy_seen', now()
  FROM public.student_progress sp
  CROSS JOIN LATERAL jsonb_each(coalesce(sp.data -> 'chapters', '{}'::jsonb)) AS ch(key, value)
  CROSS JOIN LATERAL jsonb_array_elements(
         CASE WHEN jsonb_typeof(ch.value -> 'answeredIds') = 'array'
              THEN ch.value -> 'answeredIds' ELSE '[]'::jsonb END) AS qid(value)
  WHERE sp.student_id = p_student::text
  ON CONFLICT (student_id, question_id) DO NOTHING;

  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN jsonb_build_object('ok', true, 'inserted', v_n);
END;
$function$;

-- ── 5. grants ─────────────────────────────────────────────────────────────
--  ⚠ A newly created function inherits Supabase's default privileges, which
--    include anon. REVOKE ... FROM PUBLIC does NOT drop that entry, so both are
--    revoked explicitly before the intended grants are made. Check proacl, not
--    this file, afterwards.
REVOKE ALL ON FUNCTION public.record_question_progress(jsonb, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.backfill_question_progress(uuid)      FROM PUBLIC, anon, authenticated;

-- A child is anon + a token header, so anon must be able to execute.
GRANT EXECUTE ON FUNCTION public.record_question_progress(jsonb, uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.backfill_question_progress(uuid)      TO anon, authenticated, service_role;

-- Read only. There is deliberately no INSERT/UPDATE/DELETE grant.
--
-- ⚠ A NEW TABLE IN public INHERITS SUPABASE'S DEFAULT PRIVILEGES, which grant
--   anon and authenticated everything — exactly the trap CLAUDE.md records for
--   functions, which applies to tables as well. Measured on production
--   2026-09-08: after `GRANT SELECT` alone, anon still held
--   DELETE,INSERT,REFERENCES,SELECT,TRIGGER,TRUNCATE,UPDATE. RLS still refused
--   the writes (there is no write policy), but a grant that does not exist is
--   stronger than a policy: a later policy mistake cannot open a hole behind a
--   missing grant. REVOKE FIRST, then grant back only what is intended.
--
-- ⚠ A throwaway postgres:17-alpine has no such default privileges, so a local
--   test cannot see this. scripts/sql-tests/bootstrap.sql now imitates them so
--   the assertion is real; verify against proacl on the live database too.
REVOKE ALL ON public.student_question_progress FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.student_question_progress TO anon, authenticated;
GRANT ALL    ON public.student_question_progress TO service_role;
