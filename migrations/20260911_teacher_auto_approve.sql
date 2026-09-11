-- ═══════════════════════════════════════════════════════════════════════════
--  Teacher applications: optional auto-approval once the email is verified
--
--  Admin › Content › Registration carries a switch,
--  mm_data['global_settings'].teacher_auto_approve, OFF by default. Off, nothing
--  changes: every application waits in the admin queue. On, request_teacher_access()
--  approves the applicant ITSELF — role 'teacher', status 'approved', tier
--  'unverified' — but only when BOTH hold:
--    · the address is confirmed (auth.users.email_confirmed_at). That is the
--      click on the verification link: mailer_autoconfirm is OFF on this
--      project, so the timestamp cannot exist without it.
--      ⚠ If autoconfirm is ever switched on, this stops meaning "they clicked".
--    · no admin has ever decided on them (teacher_decided_at IS NULL). Someone
--      rejected, suspended or set back to 'none' goes to the queue as before —
--      the switch must never overturn a decision a person made.
--
--  ⚠ The decision is made HERE, never in the browser. The switch lives in
--    mm_data, whose INSERT/UPDATE/DELETE policies are is_admin() only, and
--    profiles.role is guarded by guard_profiles_privileged(), which this function
--    passes with the same transaction-local psac.priv_write flag purchase_chapter()
--    uses.
--  ⚠ The switch is compared as JSON `true`, not cast with ::boolean — a cast
--    throws on a stray string and would take every teacher application down.
--  ⚠ An auto-approval records teacher_decided_by = NULL, where
--    admin_set_teacher_status() always records the admin; admin_teacher_requests()
--    reports that as `auto`. (If the deciding admin's profile is ever deleted the
--    FK sets NULL too, so an old manual approval could then read as auto.)
--  ⚠ No new function, so no new grant: CREATE OR REPLACE keeps each ACL.
--  Safe to rerun.
--  Tested by scripts/sql-tests/run-teacher-approve-tests.sh.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.request_teacher_access(p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_cur text; v_role text; v_decided timestamptz;
        v_auto boolean; v_confirmed boolean;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT teacher_status, role, teacher_decided_at INTO v_cur, v_role, v_decided
    FROM public.profiles WHERE id = v_uid;
  IF v_cur IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_profile');
  END IF;

  IF v_role = 'admin' OR (v_role = 'teacher' AND v_cur = 'approved') THEN
    RETURN jsonb_build_object('ok', true, 'status', 'approved', 'note', 'already_a_teacher');
  END IF;
  IF v_cur = 'pending'   THEN RETURN jsonb_build_object('ok', true, 'status', 'pending'); END IF;
  -- A rejection is not permanent, but it must be re-reviewed, so re-applying is
  -- allowed and simply puts them back in the queue.
  IF v_cur = 'suspended' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'suspended');
  END IF;

  v_auto := coalesce((SELECT value -> 'teacher_auto_approve' = 'true'::jsonb
                        FROM public.mm_data WHERE key = 'global_settings'), false);
  -- ⚠ The first function in this schema to read auth.users. Should the owner
  --   ever lose SELECT on it, fail towards "not confirmed" (the queue), never
  --   towards an error that takes every teacher application down.
  BEGIN
    SELECT email_confirmed_at IS NOT NULL INTO v_confirmed FROM auth.users WHERE id = v_uid;
  EXCEPTION WHEN insufficient_privilege OR undefined_table OR undefined_column THEN
    v_confirmed := false;
  END;

  IF v_auto AND coalesce(v_confirmed, false) AND v_cur = 'none' AND v_decided IS NULL THEN
    PERFORM set_config('psac.priv_write', 'on', true);
    UPDATE public.profiles
       SET teacher_status = 'approved',
           teacher_tier   = 'unverified',
           role           = 'teacher',
           teacher_note   = left(btrim(coalesce(p_note, '')), 500),
           teacher_requested_at = now(),
           teacher_decided_at   = now(),
           teacher_decided_by   = NULL
     WHERE id = v_uid;
    PERFORM set_config('psac.priv_write', 'off', true);
    RETURN jsonb_build_object('ok', true, 'status', 'approved', 'note', 'auto_approved');
  END IF;

  UPDATE public.profiles
     SET teacher_status = 'pending',
         teacher_note   = left(btrim(coalesce(p_note, '')), 500),
         teacher_requested_at = now(),
         teacher_decided_at = NULL,
         teacher_decided_by = NULL
   WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'status', 'pending');
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_teacher_requests()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_rows jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'full_name', p.full_name, 'role', p.role,
           'status', p.teacher_status, 'tier', coalesce(p.teacher_tier,'unverified'),
           'note', p.teacher_note, 'requested_at', p.teacher_requested_at,
           'decided_at', p.teacher_decided_at,
           'auto', (p.teacher_status = 'approved' AND p.teacher_decided_at IS NOT NULL
                    AND p.teacher_decided_by IS NULL))
         ORDER BY (p.teacher_status = 'pending') DESC, p.teacher_requested_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.profiles p
   WHERE p.teacher_status <> 'none' OR p.role = 'teacher';
  RETURN jsonb_build_object('ok', true, 'requests', v_rows);
END;
$function$;
