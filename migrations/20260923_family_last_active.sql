-- ═══════════════════════════════════════════════════════════════════════════
--  admin_family_points: "last active" must mean ACTIVITY, not POINTS.
--
--  WHY — reported from the admin Members list: a family showed
--  "📊 Usage: 0 questions answered · 0 points earned · last active never"
--  while the child's own panel underneath showed "1 answered" and a timestamp
--  from the same afternoon.
--
--  Measured on the live row (student 00634313…, family of 8a1c4452…):
--      student_question_progress : 1 row, last_seen_at 2026-09-23 12:36:19
--      student_points            : 0 rows
--      student_point_events      : 0 rows
--
--  The child practised one question and got it WRONG. Points are only awarded
--  for a correct answer, so no student_points row was ever created, and
--  last_seen came from `max(sp.updated_at)` over that empty table — NULL, which
--  the client prints as "never".
--
--  ⚠ THIS HID EXACTLY THE CHILDREN AN ADMIN MOST WANTS TO SEE. A child who
--    practises and answers everything incorrectly earns nothing, and therefore
--    read as having never opened the app. "Struggling" and "absent" looked
--    identical.
--
--  ⚠ GREATEST, not coalesce: in PostgreSQL GREATEST ignores NULL arguments and
--    returns NULL only when every argument is NULL — so a child with points but
--    no progress rows, or progress but no points, still reports the later of
--    whatever exists, and a child with neither still reports "never".
--
--  Only the last_seen expression changes. `questions` and `earned` still count
--  points events on purpose: they are labelled "answered correctly for the
--  first time" in the UI, which is a different question from "was here".
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
           'children',  x.children,
           'last_seen', x.last_seen
         )), '{}'::jsonb)
    INTO v
    FROM (
      SELECT f.parent_id,
             coalesce(sum(sp.points), 0)::bigint       AS points,
             coalesce(sum(qa.n), 0)::bigint            AS questions,
             coalesce(sum(qa.earned), 0)::bigint       AS earned,
             count(DISTINCT s.id)                      AS children,
             -- ⚠ the fix: the later of "earned a point" and "answered anything"
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
                        WHERE pr.student_id = s.id)                AS seen
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
