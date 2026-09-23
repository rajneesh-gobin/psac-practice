-- ═══════════════════════════════════════════════════════════════════════════
--  Let a pupil read the WHOLE conversation on their own question report.
--
--  WHY — question_report_messages is readable only by an authenticated admin
--  (a child has no JWT: they are anon plus an x-student-token). So the pupil's
--  inbox has been rendering get_student_reports().last_admin_message, which is
--  the LATEST admin message and nothing else. Two consequences, both measured
--  on the g3eng-wrt-011 report, 2026-09-23:
--
--    · a second admin reply REPLACES the first in the child's view, so a
--      follow-up correction overwrites the message it was correcting;
--    · the child's OWN follow-ups are invisible to them. add_report_message()
--      has always let them post one - it is right there in the modal - and
--      nothing has ever read them back, so a child types a reply, sends it,
--      and watches it disappear.
--
--  This adds the read side that add_report_message() has been missing.
--
--  ⚠ Identity mirrors get_student_reports() EXACTLY, including the parent
--    preview branch: a parent viewing their child's inbox has a JWT and no
--    student token, and would otherwise get an empty thread on a report they
--    can already see the summary of.
--  ⚠ Ownership is checked on the REPORT ROW, never trusted from the caller.
--  ⚠ A report that is not theirs returns EMPTY rather than raising: an error
--    that fires only for rows that exist is an existence oracle. "Not yours"
--    and "no messages" must answer identically.
--  ⚠ SECURITY DEFINER + `SET search_path = public`, matching every other
--    student-facing RPC here.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.get_student_report_thread(
  p_report_id  uuid,
  p_student_id uuid DEFAULT NULL
)
RETURNS TABLE(id uuid, author_type text, message text, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_sid uuid;
BEGIN
  v_sid := current_student_id();

  IF v_sid IS NULL THEN
    -- Parent previewing a child (no student token, but has a JWT).
    IF p_student_id IS NOT NULL AND auth.uid() IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM public.students s
        JOIN public.families f ON f.id = s.family_id
        WHERE s.id = p_student_id
          AND (f.parent_id = auth.uid()
               OR EXISTS (
                 SELECT 1 FROM public.family_members fm
                 WHERE fm.family_id = f.id AND fm.user_id = auth.uid()
               ))
      ) THEN
        v_sid := p_student_id;
      ELSE
        RAISE EXCEPTION 'not_authorized';
      END IF;
    ELSE
      RETURN; -- no identity: return empty
    END IF;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.question_reports qr
    WHERE qr.id = p_report_id AND qr.student_id = v_sid
  ) THEN
    RETURN; -- not this child's report: empty, indistinguishable from no messages
  END IF;

  RETURN QUERY
  SELECT m.id, m.author_type, m.message, m.created_at
  FROM public.question_report_messages m
  WHERE m.report_id = p_report_id
  ORDER BY m.created_at ASC;
END;
$function$;

-- ⚠ A child's session is `anon` plus a token header, so anon MUST be granted
--   or every child gets 42501 and the client turns that into an empty thread.
GRANT EXECUTE ON FUNCTION public.get_student_report_thread(uuid, uuid)
  TO anon, authenticated, service_role;
