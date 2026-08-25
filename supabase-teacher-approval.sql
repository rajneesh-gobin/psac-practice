-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — TEACHER APPROVAL / ACTIVATION
--
--  Before this, "teacher" was purely profiles.role, flipped by hand in the
--  admin panel. There was no way for a tutor to ASK for access, and no record
--  of who approved whom or when.
--
--  Model
--    profiles.teacher_status : none → pending → approved (or rejected/suspended)
--    profiles.teacher_tier   : unverified | verified   (caps, from the guest migration)
--
--  Two separate axes on purpose:
--    • teacher_status answers "may this person act as a teacher at all?"
--    • teacher_tier   answers "how much may they do?" (1/day+15 vs 3/day+40)
--    Suspending someone is then one field flip and does not disturb their role,
--    their tier, or their existing assignments.
--
--  Deliberate scope choice: CREATING new work requires an approved status, but
--  READING your own past assignments and results only requires ownership. So
--  suspension stops a teacher going forward without cutting them off from work
--  their students already submitted.
--
--  Existing role='teacher' accounts are backfilled to 'approved' so nobody who
--  is already teaching gets locked out by this migration.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1 · Columns ─────────────────────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teacher_status      text NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS teacher_note        text,          -- what the applicant told us
  ADD COLUMN IF NOT EXISTS teacher_requested_at timestamptz,
  ADD COLUMN IF NOT EXISTS teacher_decided_at  timestamptz,
  ADD COLUMN IF NOT EXISTS teacher_decided_by  uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_teacher_status_chk') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_status_chk
      CHECK (teacher_status IN ('none','pending','approved','rejected','suspended'));
  END IF;
END
$do$;

-- Backfill: anyone already teaching stays teaching.
UPDATE public.profiles
   SET teacher_status = 'approved',
       teacher_decided_at = coalesce(teacher_decided_at, now())
 WHERE role = 'teacher' AND teacher_status = 'none';

CREATE INDEX IF NOT EXISTS profiles_teacher_pending_idx
  ON public.profiles(teacher_requested_at DESC) WHERE teacher_status = 'pending';


-- ── 2 · Predicate ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_approved_teacher()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, extensions AS $fn$
  SELECT coalesce((
    SELECT (p.role = 'admin')
        OR (p.role = 'teacher' AND p.teacher_status = 'approved')
    FROM public.profiles p WHERE p.id = auth.uid()
  ), false);
$fn$;

GRANT EXECUTE ON FUNCTION public.is_approved_teacher() TO anon, authenticated;


-- ── 3 · Apply for teacher access ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.request_teacher_access(p_note text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_uid uuid := auth.uid(); v_cur text; v_role text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT teacher_status, role INTO v_cur, v_role FROM public.profiles WHERE id = v_uid;
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

  UPDATE public.profiles
     SET teacher_status = 'pending',
         teacher_note   = left(btrim(coalesce(p_note, '')), 500),
         teacher_requested_at = now(),
         teacher_decided_at = NULL,
         teacher_decided_by = NULL
   WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'status', 'pending');
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.request_teacher_access(text) TO authenticated;


-- ── 4 · My own status (for the UI) ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.my_teacher_status()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_p public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT * INTO v_p FROM public.profiles WHERE id = auth.uid();
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_profile'); END IF;
  RETURN jsonb_build_object('ok', true,
    'role', v_p.role, 'status', v_p.teacher_status,
    'tier', coalesce(v_p.teacher_tier, 'unverified'),
    'requested_at', v_p.teacher_requested_at,
    'is_teacher', (v_p.role = 'admin') OR (v_p.role = 'teacher' AND v_p.teacher_status = 'approved'));
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.my_teacher_status() TO authenticated;


-- ── 5 · Admin: the queue ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.admin_teacher_requests()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_rows jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'full_name', p.full_name, 'role', p.role,
           'status', p.teacher_status, 'tier', coalesce(p.teacher_tier,'unverified'),
           'note', p.teacher_note, 'requested_at', p.teacher_requested_at,
           'decided_at', p.teacher_decided_at)
         ORDER BY (p.teacher_status = 'pending') DESC, p.teacher_requested_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.profiles p
   WHERE p.teacher_status <> 'none' OR p.role = 'teacher';
  RETURN jsonb_build_object('ok', true, 'requests', v_rows);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.admin_teacher_requests() TO authenticated;


-- ── 6 · Admin: decide ───────────────────────────────────────────────────────
-- Approving sets role='teacher' too, so there is exactly one action to perform
-- and no way to end up approved-but-not-a-teacher.
CREATE OR REPLACE FUNCTION public.admin_set_teacher_status(
  p_user_id uuid, p_status text, p_tier text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_target public.profiles%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_status NOT IN ('pending','approved','rejected','suspended','none') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_status');
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('unverified','verified') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_tier');
  END IF;

  SELECT * INTO v_target FROM public.profiles WHERE id = p_user_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_target.role = 'admin' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cannot_modify_admin');
  END IF;

  UPDATE public.profiles
     SET teacher_status = p_status,
         teacher_tier   = coalesce(p_tier, teacher_tier, 'unverified'),
         role = CASE
                  WHEN p_status = 'approved' THEN 'teacher'
                  -- Losing teacher access returns them to a plain parent account
                  -- rather than leaving a role that no longer means anything.
                  WHEN p_status IN ('rejected','suspended','none') AND role = 'teacher' THEN 'parent'
                  ELSE role
                END,
         teacher_decided_at = now(),
         teacher_decided_by = auth.uid()
   WHERE id = p_user_id;

  RETURN jsonb_build_object('ok', true, 'status', p_status);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.admin_set_teacher_status(uuid, text, text) TO authenticated;


-- ── 7 · Gate assignment creation on approval ────────────────────────────────
-- Only the CREATE path changes. guest_results / guest_grant_retry stay keyed on
-- ownership, so a suspended teacher can still see work already submitted to them.
CREATE OR REPLACE FUNCTION public.guest_assignment_create(
  p_title           text,
  p_subject_pack_id text,
  p_chapter_ids     jsonb,
  p_question_ids    jsonb,
  p_pin             text,
  p_classroom_label text DEFAULT NULL,
  p_duration_mins   int  DEFAULT NULL,
  p_due_at          timestamptz DEFAULT NULL,
  p_expires_hours   int  DEFAULT 48
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE
  v_uid     uuid := auth.uid();
  v_role    text; v_tier text; v_status text; v_name text;
  v_today   int;  v_max_day int; v_max_stu int;
  v_code    text; v_id uuid;     v_count int;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT role, coalesce(teacher_tier,'unverified'), teacher_status, full_name
    INTO v_role, v_tier, v_status, v_name
    FROM public.profiles WHERE id = v_uid;

  -- Approval gate. 'pending' and 'suspended' get their own codes so the UI can
  -- say something useful instead of a generic refusal.
  IF v_role = 'admin' THEN
    NULL;
  ELSIF v_role <> 'teacher' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher', 'status', coalesce(v_status,'none'));
  ELSIF v_status = 'pending' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'pending_approval');
  ELSIF v_status <> 'approved' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_approved', 'status', coalesce(v_status,'none'));
  END IF;

  IF v_tier = 'verified' OR v_role = 'admin'
    THEN v_max_day := 3;  v_max_stu := 40;
    ELSE v_max_day := 1;  v_max_stu := 15;
  END IF;

  SELECT count(*) INTO v_today FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());
  IF v_today >= v_max_day THEN
    RETURN jsonb_build_object('ok', false, 'error', 'daily_limit', 'limit', v_max_day, 'tier', v_tier);
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  v_count := coalesce(jsonb_array_length(p_question_ids), 0);
  IF v_count = 0 THEN RETURN jsonb_build_object('ok', false, 'error', 'no_questions'); END IF;

  v_code := public.gen_guest_code();

  INSERT INTO public.guest_assignments (
    code, teacher_id, teacher_label, classroom_label, title, subject_pack_id,
    chapter_ids, question_ids, question_count, duration_mins, pin_hash,
    due_at, expires_at, max_students
  ) VALUES (
    v_code, v_uid, v_name, p_classroom_label, btrim(p_title), p_subject_pack_id,
    coalesce(p_chapter_ids, '[]'::jsonb), p_question_ids, v_count,
    p_duration_mins, crypt(p_pin, gen_salt('bf')),
    p_due_at, now() + (coalesce(p_expires_hours, 48) || ' hours')::interval, v_max_stu
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id, 'code', v_code,
    'max_students', v_max_stu, 'assignments_left_today', v_max_day - v_today - 1);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_assignment_create(text,text,jsonb,jsonb,text,text,int,timestamptz,int) FROM public, anon;
GRANT  EXECUTE ON FUNCTION public.guest_assignment_create(text,text,jsonb,jsonb,text,text,int,timestamptz,int) TO authenticated;

-- ── 8 · Admin notification counts ───────────────────────────────────────────
-- Cheap enough to call on every admin sign-in. Returns only counts, never the
-- underlying rows, so it stays safe to call often.
CREATE OR REPLACE FUNCTION public.admin_pending_counts()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $fn$
DECLARE v_teachers int; v_reports int;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT count(*) INTO v_teachers FROM public.profiles WHERE teacher_status = 'pending';
  SELECT count(*) INTO v_reports  FROM public.question_reports WHERE status = 'open';
  RETURN jsonb_build_object('ok', true,
    'teacher_requests', v_teachers,
    'open_reports',     v_reports,
    'total',            v_teachers + v_reports);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.admin_pending_counts() TO authenticated;

COMMIT;

NOTIFY pgrst, 'reload schema';


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Existing teachers were not locked out (expect all 'approved'):
--      SELECT full_name, role, teacher_status FROM public.profiles WHERE role='teacher';
--
-- 2. As a parent, apply, then confirm you are still NOT a teacher:
--      SELECT public.request_teacher_access('I tutor Grade 5 maths in Curepipe');
--      SELECT public.my_teacher_status();          -- is_teacher = false, status = pending
--
-- 3. Creating an assignment while pending must be refused:
--      SELECT public.guest_assignment_create('x','grade5-maths','[]'::jsonb,
--             '["q1"]'::jsonb,'1234');             -- expect error = pending_approval
--
-- 4. As an admin, review and approve:
--      SELECT public.admin_teacher_requests();
--      SELECT public.admin_set_teacher_status('<uid>','approved','unverified');
--
-- 5. Suspension returns them to a parent account but keeps their past results
--    reachable:
--      SELECT public.admin_set_teacher_status('<uid>','suspended');
--      SELECT public.guest_my_assignments();       -- still lists their assignments
