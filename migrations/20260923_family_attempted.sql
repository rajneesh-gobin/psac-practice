-- ═══════════════════════════════════════════════════════════════════════════
--  admin_family_points: tell "never opened a question" apart from
--  "practised and got nothing right yet".
--
--  WHY — reported from the admin Members list. A parent row read:
--
--      ✏️ none correct yet          ← the family chip
--      📊 Usage: 0 answered correctly · 0 points earned · last active never
--      🧒 Eleah   Has not practised yet.   ← the child panel
--
--  "none correct yet" and "has not practised yet" are different claims about
--  the same family, printed three lines apart. Measured on the live row
--  (parent a81a8186…, child Eleah): student_question_progress **0 rows**,
--  student_points 0 rows, student_point_events 0 rows. The child had never
--  answered anything, so the chip was simply wrong and the child panel right.
--
--  ⚠ THIS IS AN OVERCORRECTION OF AN EARLIER FIX, not a fresh bug. The chip
--    used to say "not started", which was wrong for the opposite family — a
--    child who practises and gets everything WRONG earns no points and so
--    scored 0 on every points-derived number. It was renamed to "none correct
--    yet" to cover that case, and the rename then mislabelled every family who
--    really had not started. One label cannot carry two states; the data has to
--    separate them.
--
--  ⚠ BOTH STATES OCCUR ON PRODUCTION — this is not a theoretical distinction.
--    Measured the same day: 17 students hold a progress row, 19 hold a
--    'question' point event, and **2 students (Child2, Vilena) have attempts
--    with no correct answer at all**. Those two are exactly the children an
--    admin most wants to find, and they are the ones a points-only reading
--    hides.
--
--  THE FIX is one new number: `attempted`, the count of questions the family's
--  children have actually tried. It is the honest denominator for the
--  points-derived `questions`, so the pair can be printed together
--  ("0 correct of 3 tried") and can no longer read as a contradiction.
--
--  ⚠ Not inferred from `last_seen`. That was the cheap option and it is wrong:
--    last_seen is GREATEST(student_points.updated_at, …), and 97% of all points
--    on production are carried-forward 'legacy' XP, so a family with legacy
--    points and zero attempts carries a last_seen and would have been labelled
--    "practised". Count the attempts.
--
--  ⚠ `attempts > 0` is explicit even though it filters nothing today (measured:
--    0 of 1,496 progress rows have attempts = 0). If a future code path ever
--    pre-creates a row on SEEING a question, this number must not silently
--    start counting it as practice.
--
--  ⚠ student_points is 1:1 with a student (measured: 0 students hold more than
--    one row), so adding another LATERAL aggregate does not multiply the sums
--    that were already here.
--
--  Nothing else changes: `questions` and `earned` still count point events on
--  purpose, because the UI labels them "answered correctly for the first time",
--  which is a different question from "was here".
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.admin_family_points(p_parents uuid[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE v jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_parents IS NULL OR array_length(p_parents, 1) IS NULL THEN
    RETURN jsonb_build_object('ok', true, 'families', '{}'::jsonb);
  END IF;
  -- A page of the members list, never more.
  IF array_length(p_parents, 1) > 200 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'too_many');
  END IF;

  SELECT coalesce(jsonb_object_agg(x.parent_id::text, jsonb_build_object(
           'points',    x.points,
           'earned',    x.earned,
           'questions', x.questions,
           'attempted', x.attempted,
           'children',  x.children,
           'last_seen', x.last_seen
         )), '{}'::jsonb)
    INTO v
    FROM (
      SELECT f.parent_id,
             coalesce(sum(sp.points), 0)::bigint       AS points,
             coalesce(sum(qa.n), 0)::bigint            AS questions,
             coalesce(sum(qa.earned), 0)::bigint       AS earned,
             -- ⚠ the new number: questions TRIED, whatever the outcome. Without
             --   it "0 answered correctly" and "has not practised" are the same
             --   row and the list cannot say which.
             coalesce(sum(qa.tried), 0)::bigint        AS attempted,
             count(DISTINCT s.id)                      AS children,
             max(GREATEST(sp.updated_at, qa.seen))     AS last_seen
        FROM public.families f
        -- ⚠ LEFT JOIN throughout. A family with no children, or children who
        --   have never answered anything, must come back as 0 — not be absent,
        --   which the client would have to guess about.
        LEFT JOIN public.students s
               ON s.family_id = f.id AND s.deleted_at IS NULL
        LEFT JOIN public.student_points sp ON sp.student_id = s.id
        LEFT JOIN LATERAL (
               SELECT count(*) FILTER (WHERE e.kind = 'question') AS n,
                      coalesce(sum(e.points) FILTER (WHERE e.kind <> 'legacy'), 0) AS earned,
                      (SELECT max(pr.last_seen_at)
                         FROM public.student_question_progress pr
                        WHERE pr.student_id = s.id)                AS seen,
                      (SELECT count(*)
                         FROM public.student_question_progress pr
                        WHERE pr.student_id = s.id
                          AND pr.attempts > 0)                     AS tried
                 FROM public.student_point_events e
                WHERE e.student_id = s.id
             ) qa ON true
       WHERE f.parent_id = ANY(p_parents)
       GROUP BY f.parent_id
    ) x;

  RETURN jsonb_build_object('ok', true, 'families', coalesce(v, '{}'::jsonb));
END
$function$;

GRANT EXECUTE ON FUNCTION public.admin_family_points(uuid[]) TO authenticated, service_role;
