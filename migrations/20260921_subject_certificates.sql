-- ═══════════════════════════════════════════════════════════════════════════
--  Subject certificates — the one aggregate read they need
--
--  WHY A FUNCTION AND NOT A POSTGREST QUERY
--  A certificate is per SUBJECT, not per chapter. Everything that reads
--  student_question_progress today reads ONE chapter at a time
--  (QuestionProgress.loadChapter), which is right for a Question Map and
--  useless here: the My Certificates screen shows every live subject of the
--  child's grade at once, which is 8 packs and ~120 chapters for Grade 9.
--  Doing that through PostgREST means either one request per chapter (120
--  round trips) or pulling every row the child owns (measured on production
--  2026-09-21: 862 rows across 13 children today, but a single child who
--  finishes one French pack owns 2,200 of them — ~90 KB of JSON to produce
--  two integers). PostgREST cannot GROUP BY, so the aggregate has to live
--  here.
--
--  ⚠ READ ONLY. It adds no table, no column, no index and no write path.
--    student_question_progress keeps record_question_progress() as its single
--    writer, exactly as 20260908_chapter_question_progress.sql set it up.
--
--  ⚠ GROUPED BY (subject_pack_id, chapter_id), NOT BY chapter_id ALONE.
--    Chapter ids are NOT globally unique: g9s-inquiry and g9s-sts are each
--    declared by grade9-biology, grade9-chemistry AND grade9-physics (the NCE
--    science split of 2026-09-08 divided those two chapters by subject
--    affinity rather than duplicating them). Measured on the manifests:
--    464 chapters, 4 duplicate declarations, all of them those two ids.
--    Collapsing on chapter_id alone would credit one pack's answers to
--    another pack's certificate.
--
--  ⚠ subject_pack_id CAN BE NULL and is returned as ''. backfill_question_
--    progress() inserts legacy_seen rows with no pack (chapter-wide totals
--    cannot be split back into one). Production holds 0 such rows today, but
--    the function that makes them is still callable, so the client maps an
--    empty pack back through the chapter it knows rather than dropping the
--    row. Those rows are attempts 0 and never count as mastered either way.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── the aggregate ─────────────────────────────────────────────────────────
--  p_student is optional and only honoured for an adult who owns that child,
--  or an admin — the parent-preview path has no student token and authorises
--  by JWT, exactly like record_question_progress() and student_plan_features().
--
--  ⚠ RAISES rather than returning no rows when the caller is not allowed.
--    "no rows" is a perfectly ordinary answer here (a child who has not
--    practised yet), so a silent empty result would render as a brand-new
--    account instead of as a refusal.
CREATE OR REPLACE FUNCTION public.student_subject_progress(p_student uuid DEFAULT NULL)
RETURNS TABLE (
  pack_id    text,
  chapter_id text,
  explored   integer,
  secure     integer,
  improved   integer,
  needs      integer,
  legacy     integer,
  attempts   bigint,
  correct    bigint,
  last_at    timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
BEGIN
  IF v_student IS NULL THEN
    IF p_student IS NULL THEN
      RAISE EXCEPTION 'no_student' USING ERRCODE = '28000';
    END IF;
    IF NOT (public.owns_student(p_student) OR public.is_admin()) THEN
      RAISE EXCEPTION 'not_authorized' USING ERRCODE = '42501';
    END IF;
    v_student := p_student;
  ELSIF p_student IS NOT NULL AND p_student <> v_student THEN
    -- A student token may only ever read its own rows.
    RAISE EXCEPTION 'not_authorized' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT coalesce(q.subject_pack_id, '')                                    AS pack_id,
         q.chapter_id                                                       AS chapter_id,
         count(*)::integer                                                  AS explored,
         count(*) FILTER (WHERE q.state = 'secure')::integer                AS secure,
         count(*) FILTER (WHERE q.state = 'improved')::integer              AS improved,
         count(*) FILTER (WHERE q.state = 'needs_practice')::integer        AS needs,
         count(*) FILTER (WHERE q.state = 'legacy_seen')::integer           AS legacy,
         coalesce(sum(q.attempts), 0)::bigint                               AS attempts,
         coalesce(sum(q.correct_attempts), 0)::bigint                       AS correct,
         max(q.last_seen_at)                                                AS last_at
  FROM public.student_question_progress q
  WHERE q.student_id = v_student
  GROUP BY 1, 2;
END;
$function$;

-- ── grants ────────────────────────────────────────────────────────────────
--  ⚠ A newly created function inherits Supabase's default privileges, which
--    include anon. REVOKE ... FROM PUBLIC does NOT drop that entry, so both
--    are revoked explicitly before the intended grants are made. Check proacl,
--    not this file, afterwards.
--  A child is anon + a token header, so anon must be able to execute.
REVOKE ALL ON FUNCTION public.student_subject_progress(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.student_subject_progress(uuid) TO anon, authenticated, service_role;
