-- ─────────────────────────────────────────────────────────────────────────
-- Admin › Members — how much is each family actually USING the app?
-- 2026-09-16
--
-- The members list could say who an account IS and how many children it has,
-- but nothing about whether anyone ever answers a question. Points are the
-- honest usage signal: they are minted in the database on a FIRST CORRECT
-- answer and paid once per question ever, so they cannot be inflated by replay
-- and they do not drift with a device clock.
--
-- ⚠ WHY AN RPC AND NOT A QUERY. `public.student_points` has NO RLS policies and
--   is granted to postgres and service_role ONLY — `authenticated` cannot read
--   a single row, so the admin panel cannot sum it from the browser however the
--   query is written. Measured, not assumed: information_schema.role_table_grants
--   lists no grantee but those two.
--
-- ⚠ It is SECURITY DEFINER and therefore gated on is_admin() as its FIRST act.
--   Without that it would be a public endpoint returning every family's
--   activity keyed by the parent's id.
-- ⚠ It takes the ids the caller is already looking at, and returns nothing for
--   any other — no list, no search, no paging. It cannot enumerate the user
--   base, which is the same rule admin-member-emails.js follows.
--
-- ⚠ TOTAL POINTS IS NOT A USAGE MEASURE, and must not be presented as one.
--   Measured 2026-09-16: of 6,658 points on production, 6,440 (97%) are kind
--   'legacy' - a ONE-OFF carry-forward of XP from before points were minted in
--   the database. Only 173 came from answering questions and 45 from games.
--   Ranking families by total points ranks them by history, not by activity: a
--   family showing 3,043 points had answered 75 questions, and one showing 530
--   had answered NONE.
--   So this returns three separate numbers and lets the UI say which is which:
--     questions - count of first-correct answers (the honest usage signal)
--     earned    - points from real activity, legacy EXCLUDED
--     points    - the grand total, legacy included, for reconciliation only
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.admin_family_points(p_parents uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
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
             max(sp.updated_at)                        AS last_seen
        FROM public.families f
        -- ⚠ LEFT JOIN throughout. A family with no children, or children who
        --   have never answered anything, must come back as 0 — not be absent,
        --   which the client would have to guess about.
        LEFT JOIN public.students s
               ON s.family_id = f.id AND s.deleted_at IS NULL
        LEFT JOIN public.student_points sp ON sp.student_id = s.id
        LEFT JOIN LATERAL (
               SELECT count(*) FILTER (WHERE e.kind = 'question') AS n,
                      coalesce(sum(e.points) FILTER (WHERE e.kind <> 'legacy'), 0) AS earned
                 FROM public.student_point_events e
                WHERE e.student_id = s.id
             ) qa ON true
       WHERE f.parent_id = ANY(p_parents)
       GROUP BY f.parent_id
    ) x;

  RETURN jsonb_build_object('ok', true, 'families', coalesce(v, '{}'::jsonb));
END $function$;

-- ⚠ An admin is `authenticated`; a child (anon + token) has no business here.
--   A new function inherits EXECUTE for PUBLIC and anon is a member of PUBLIC,
--   so the REVOKE names both explicitly — REVOKE FROM anon alone does not drop
--   the `=X` PUBLIC entry.
REVOKE ALL ON FUNCTION public.admin_family_points(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_family_points(uuid[]) TO authenticated, service_role;
