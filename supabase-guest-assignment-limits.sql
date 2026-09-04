-- Makes the teacher assignment caps editable from Admin → Content instead of
-- being hard-coded in guest_assignment_create().
--
-- The caps were `v_max_day := 3 / 1` and `v_max_stu := 40 / 15` written into the
-- function body, so changing either meant a migration. They now come from
-- mm_data.guest_assignment_limits, which only an admin may write (mmdata_*_admin
-- policies) and which this function re-reads on every call — the same shape as
-- shop_settings and purchase_chapter().
--
-- ⚠ The DEFAULTS BELOW ARE LOAD-BEARING and are duplicated in three places, on
-- purpose (see CLAUDE.md "Code that is duplicated on purpose"):
--   • the coalesce() chain here          — when the settings row is missing
--   • GUEST_LIMIT_DEFAULTS in admin.js   — before the row has loaded
--   • the settings row seeded at the end — what an admin first sees
-- They are today's live values, so applying this file changes no behaviour.
--
-- Run once in the Supabase SQL editor. Idempotent.
BEGIN;

DO $$ BEGIN
  IF to_regprocedure('public.guest_assignment_create(text,text,jsonb,jsonb,text,text,integer,timestamp with time zone,integer)') IS NULL
     OR to_regclass('public.mm_data') IS NULL THEN
    RAISE EXCEPTION 'guest_assignment_create() and mm_data are both required';
  END IF;
END $$;

-- One reader, so the clamping lives in exactly one place. A settings row is
-- written by a human through a form; a typo there must not be able to hand out
-- 100,000 assignments a day or, worse, a negative cap that compares false
-- against every count and silently removes the limit altogether.
--   • per_day 0 is allowed and MEANS zero — an admin turning creation off.
--   • max_students has a floor of 1: an assignment nobody can join is not a
--     setting anyone wants, it is a broken link handed to a class.
-- ⚠ jsonb_typeof() before the cast, not a bare ::integer. The value is typed by
-- a human into a form; "" or "3 " would raise 22P02 inside a SECURITY DEFINER
-- function and take assignment creation down completely, which is a far worse
-- outcome than falling back to the default for a field that reads as nonsense.
CREATE OR REPLACE FUNCTION public.guest_assignment_limits(p_tier text)
RETURNS TABLE(per_day integer, max_students integer)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public,extensions AS $$
  SELECT least(greatest(coalesce(CASE WHEN jsonb_typeof(v->k->'per_day')='number'
                                      THEN (v->k->>'per_day')::integer END, def_day), 0), 1000),
         least(greatest(coalesce(CASE WHEN jsonb_typeof(v->k->'max_students')='number'
                                      THEN (v->k->>'max_students')::integer END, def_stu), 1), 500)
  FROM (SELECT
      coalesce((SELECT value FROM public.mm_data WHERE key='guest_assignment_limits'), '{}'::jsonb) AS v,
      CASE WHEN p_tier='verified' THEN 'verified' ELSE 'unverified' END AS k,
      CASE WHEN p_tier='verified' THEN 3  ELSE 1  END AS def_day,
      CASE WHEN p_tier='verified' THEN 40 ELSE 15 END AS def_stu
  ) t;
$$;

CREATE OR REPLACE FUNCTION public.guest_assignment_create(p_title text, p_subject_pack_id text,
  p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text DEFAULT NULL::text,
  p_duration_mins integer DEFAULT NULL::integer, p_due_at timestamp with time zone DEFAULT NULL::timestamp with time zone,
  p_expires_hours integer DEFAULT 48)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
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

  -- An admin is billed at the verified rate, exactly as before this file. That
  -- is one behaviour, stated once here rather than as a third settings column
  -- nobody would remember to keep in step.
  SELECT l.per_day, l.max_students INTO v_max_day, v_max_stu
    FROM public.guest_assignment_limits(
      CASE WHEN v_tier = 'verified' OR v_role = 'admin' THEN 'verified' ELSE 'unverified' END) l;

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
$function$;

-- What the teacher screen shows BEFORE a create is attempted. Reporting a cap
-- from the browser's own copy of the defaults is how a screen ends up saying
-- "2 left today" about a limit an admin lowered an hour ago.
CREATE OR REPLACE FUNCTION public.guest_assignment_quota()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE v_uid uuid := auth.uid(); v_role text; v_tier text; v_status text;
  v_day integer; v_stu integer; v_today integer;
BEGIN
  IF v_uid IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT role, coalesce(teacher_tier,'unverified'), teacher_status
    INTO v_role, v_tier, v_status FROM public.profiles WHERE id = v_uid;
  IF NOT (v_role='admin' OR (v_role='teacher' AND v_status='approved')) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher');
  END IF;
  SELECT l.per_day, l.max_students INTO v_day, v_stu
    FROM public.guest_assignment_limits(
      CASE WHEN v_tier='verified' OR v_role='admin' THEN 'verified' ELSE 'unverified' END) l;
  SELECT count(*) INTO v_today FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());
  RETURN jsonb_build_object('ok', true, 'tier', CASE WHEN v_role='admin' THEN 'admin' ELSE v_tier END,
    'per_day', v_day, 'max_students', v_stu, 'used_today', v_today,
    'left_today', greatest(v_day - v_today, 0));
END $$;

-- guest_assignment_limits() is an internal reader for the two functions above;
-- nothing in a browser should be able to ask it about a tier that is not theirs.
REVOKE ALL ON FUNCTION public.guest_assignment_limits(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.guest_assignment_quota() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.guest_assignment_quota() TO authenticated;

-- Seed the row with today's live values so the admin form opens populated
-- rather than blank. ON CONFLICT DO NOTHING: never overwrite a row an admin has
-- already tuned, which is what makes re-running this file safe.
INSERT INTO public.mm_data (key, value)
VALUES ('guest_assignment_limits',
  '{"unverified":{"per_day":1,"max_students":15},"verified":{"per_day":3,"max_students":40}}'::jsonb)
ON CONFLICT (key) DO NOTHING;

COMMIT;
