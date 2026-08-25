-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — GUEST ASSIGNMENTS
--
--  Tutors send homework over WhatsApp. Children complete it with NO account:
--  just a share code, their first name, and a 4-digit PIN. Teachers never see
--  or touch child accounts.
--
--  DESIGN NOTES (deliberate departures from the brief - see the handover notes)
--
--  1. PIN hashing is bcrypt via pgcrypto, NOT scrypt in Node. We deleted the
--     scrypt Netlify functions this morning precisely to end the two-scheme
--     split; re-adding Node hashing would recreate it.
--
--  2. PIN verification + rate limiting happen INSIDE one SQL function rather
--     than in the Netlify function. Read-check-write across a network boundary
--     is racy: two parallel requests can each read attempts=4 and both proceed.
--     Doing it in one statement makes the lockout actually hold.
--
--  3. Assignment CREATION is a SECURITY DEFINER RPC called by the authenticated
--     teacher - not a Netlify function. Teachers already have a Supabase JWT, so
--     this costs zero function invocations (free-tier budget) and keeps the cap
--     enforcement server-side where it cannot be bypassed.
--
--  4. Guests never reach Postgres. All three tables have RLS enabled with NO
--     policies = deny everything. Only service_role (Netlify functions) and the
--     SECURITY DEFINER functions below can touch them.
--
--  ⚠ search_path includes `extensions` on every function: pgcrypto lives there
--    on Supabase, and omitting it is what broke student login this morning.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Teacher tier (caps) ─────────────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS teacher_tier text NOT NULL DEFAULT 'unverified';

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_teacher_tier_chk') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_tier_chk
      CHECK (teacher_tier IN ('unverified','verified'));
  END IF;
END
$do$;


-- ── 1 · guest_assignments ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.guest_assignments (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  code            text        UNIQUE NOT NULL,
  teacher_id      uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_label   text,                       -- display name shown to the child
  classroom_label text,                       -- free text, e.g. 'Grade 5 Tuition - Wed'
  title           text        NOT NULL,
  subject_pack_id text        NOT NULL,       -- e.g. 'grade5-maths'
  chapter_ids     jsonb       NOT NULL DEFAULT '[]',
  question_ids    jsonb       NOT NULL DEFAULT '[]',  -- SNAPSHOT: every child gets the same set
  question_count  int         NOT NULL DEFAULT 10,
  duration_mins   int,                        -- null = untimed
  pin_hash        text        NOT NULL,       -- bcrypt
  due_at          timestamptz,
  expires_at      timestamptz NOT NULL DEFAULT (now() + interval '48 hours'),
  max_students    int         NOT NULL DEFAULT 15,
  status          text        NOT NULL DEFAULT 'active',
  created_at      timestamptz NOT NULL DEFAULT now()
);

DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'guest_assignments_status_chk') THEN
    ALTER TABLE public.guest_assignments ADD CONSTRAINT guest_assignments_status_chk
      CHECK (status IN ('active','closed','expired'));
  END IF;
END
$do$;

CREATE INDEX IF NOT EXISTS guest_assignments_code_idx    ON public.guest_assignments(code);
CREATE INDEX IF NOT EXISTS guest_assignments_teacher_idx ON public.guest_assignments(teacher_id, created_at DESC);


-- ── 2 · guest_submissions ───────────────────────────────────────────────────
-- name_key is the identity: lower(trim(name)). One row per child per
-- assignment; a granted retry bumps `attempt` and overwrites in place, so the
-- latest attempt is always the one that counts.
CREATE TABLE IF NOT EXISTS public.guest_submissions (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id uuid        NOT NULL REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  name_display  text        NOT NULL,
  name_key      text        NOT NULL,
  answers       jsonb       NOT NULL DEFAULT '[]',
  score         int         NOT NULL DEFAULT 0,
  total         int         NOT NULL DEFAULT 0,
  pct           int         NOT NULL DEFAULT 0,
  attempt       int         NOT NULL DEFAULT 1,
  retry_allowed boolean     NOT NULL DEFAULT false,
  started_at    timestamptz NOT NULL DEFAULT now(),
  submitted_at  timestamptz,
  ip            text,
  user_agent    text,
  UNIQUE (assignment_id, name_key)
);

CREATE INDEX IF NOT EXISTS guest_submissions_assignment_idx ON public.guest_submissions(assignment_id);


-- ── 3 · guest_pin_attempts ──────────────────────────────────────────────────
-- Rate limit is PER NAME per assignment, so one child fat-fingering their PIN
-- cannot lock out the rest of the class.
CREATE TABLE IF NOT EXISTS public.guest_pin_attempts (
  assignment_id uuid        NOT NULL REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  name_key      text        NOT NULL,
  attempts      int         NOT NULL DEFAULT 0,
  locked_until  timestamptz,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (assignment_id, name_key)
);


-- ── RLS: deny everything ────────────────────────────────────────────────────
-- No policies at all. RLS-enabled + zero policies = no anon/authenticated
-- access whatsoever. service_role bypasses RLS; the SECURITY DEFINER functions
-- below run as owner. That is the entire access surface.
ALTER TABLE public.guest_assignments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_pin_attempts ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.guest_assignments  FROM anon, authenticated;
REVOKE ALL ON public.guest_submissions  FROM anon, authenticated;
REVOKE ALL ON public.guest_pin_attempts FROM anon, authenticated;


-- ── Share code generator ────────────────────────────────────────────────────
-- 6 chars, no I/O/0/1 - these get read aloud and copied off WhatsApp.
CREATE OR REPLACE FUNCTION public.gen_guest_code()
RETURNS text LANGUAGE plpgsql VOLATILE SET search_path = public, extensions AS $fn$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text; i int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..6 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.guest_assignments a WHERE a.code = out);
  END LOOP;
  RETURN out;
END;
$fn$;


-- ── CREATE (teacher, authenticated) ─────────────────────────────────────────
-- Caps are enforced here, not in the browser: unverified = 1/day & 15 students,
-- verified = 3/day & 40.
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
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_uid       uuid := auth.uid();
  v_role      text;
  v_tier      text;
  v_name      text;
  v_today     int;
  v_max_day   int;
  v_max_stu   int;
  v_code      text;
  v_id        uuid;
  v_count     int;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT role, coalesce(teacher_tier,'unverified'), full_name
    INTO v_role, v_tier, v_name
    FROM public.profiles WHERE id = v_uid;

  IF v_role IS NULL OR v_role NOT IN ('teacher','admin') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher');
  END IF;

  IF v_tier = 'verified' OR v_role = 'admin'
    THEN v_max_day := 3;  v_max_stu := 40;
    ELSE v_max_day := 1;  v_max_stu := 15;
  END IF;

  SELECT count(*) INTO v_today
    FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());

  IF v_today >= v_max_day THEN
    RETURN jsonb_build_object('ok', false, 'error', 'daily_limit',
      'limit', v_max_day, 'tier', v_tier);
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  v_count := coalesce(jsonb_array_length(p_question_ids), 0);
  IF v_count = 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_questions');
  END IF;

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
  )
  RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id, 'code', v_code,
    'max_students', v_max_stu, 'assignments_left_today', v_max_day - v_today - 1);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_assignment_create(text,text,jsonb,jsonb,text,text,int,timestamptz,int) FROM public, anon;
GRANT  EXECUTE ON FUNCTION public.guest_assignment_create(text,text,jsonb,jsonb,text,text,int,timestamptz,int) TO authenticated;


-- ── OPEN (guest, via service role only) ─────────────────────────────────────
-- Validates PIN, enforces the per-name lockout, and reserves the child's slot.
-- All in ONE transaction, so parallel requests cannot slip past the limiter.
CREATE OR REPLACE FUNCTION public.guest_open(
  p_code text, p_name text, p_pin text, p_ip text DEFAULT NULL, p_ua text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_a          public.guest_assignments%ROWTYPE;
  v_key        text;
  v_att        public.guest_pin_attempts%ROWTYPE;
  v_max_tries  CONSTANT int := 5;
  v_lock_mins  CONSTANT int := 10;
  v_taken      int;
  v_sub        public.guest_submissions%ROWTYPE;
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- Lockout check comes BEFORE the PIN check so a locked child cannot keep guessing.
  SELECT * INTO v_att FROM public.guest_pin_attempts
   WHERE assignment_id = v_a.id AND name_key = v_key;

  IF FOUND AND v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_att.locked_until - now()))::int);
  END IF;

  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  -- Wrong PIN → count it, maybe lock.
  IF v_a.pin_hash IS NULL OR crypt(p_pin, v_a.pin_hash) <> v_a.pin_hash THEN
    INSERT INTO public.guest_pin_attempts (assignment_id, name_key, attempts, updated_at)
    VALUES (v_a.id, v_key, 1, now())
    ON CONFLICT (assignment_id, name_key) DO UPDATE
      SET attempts     = public.guest_pin_attempts.attempts + 1,
          locked_until = CASE WHEN public.guest_pin_attempts.attempts + 1 >= v_max_tries
                              THEN now() + (v_lock_mins || ' minutes')::interval END,
          updated_at   = now()
    RETURNING * INTO v_att;

    IF v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked', 'secsLeft', v_lock_mins * 60);
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
      'attemptsLeft', greatest(0, v_max_tries - v_att.attempts));
  END IF;

  -- Correct PIN → clear the counter.
  DELETE FROM public.guest_pin_attempts WHERE assignment_id = v_a.id AND name_key = v_key;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;

  -- Already submitted, and no retry granted → tell the client, which offers to
  -- add a surname initial in case this is a DIFFERENT child with the same name.
  IF FOUND AND v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken',
      'name', v_sub.name_display, 'pct', v_sub.pct);
  END IF;

  IF NOT FOUND THEN
    SELECT count(*) INTO v_taken FROM public.guest_submissions WHERE assignment_id = v_a.id;
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions (assignment_id, name_display, name_key, ip, user_agent)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua);
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'is_retry', coalesce(v_sub.retry_allowed, false));
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_open(text,text,text,text,text) FROM public, anon, authenticated;


-- ── SUBMIT (guest, via service role only) ───────────────────────────────────
-- The score passed here is the SERVER's re-grade, never the browser's.
CREATE OR REPLACE FUNCTION public.guest_submit(
  p_code text, p_name text, p_answers jsonb, p_score int, p_total int
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_a   public.guest_assignments%ROWTYPE;
  v_key text := lower(btrim(p_name));
  v_sub public.guest_submissions%ROWTYPE;
  v_pct int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false,
         submitted_at = now()
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_submit(text,text,jsonb,int,int) FROM public, anon, authenticated;


-- ── TEACHER: results + retry ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.guest_results(p_assignment_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_a public.guest_assignments%ROWTYPE; v_rows jsonb;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', s.name_display, 'name_key', s.name_key,
           'score', s.score, 'total', s.total, 'pct', s.pct,
           'attempt', s.attempt, 'retry_allowed', s.retry_allowed,
           'answers', s.answers, 'submitted_at', s.submitted_at)
         ORDER BY s.submitted_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.guest_submissions s WHERE s.assignment_id = v_a.id;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object('id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'question_ids', v_a.question_ids, 'question_count', v_a.question_count,
      'classroom', v_a.classroom_label, 'due_at', v_a.due_at,
      'expires_at', v_a.expires_at, 'status', v_a.status, 'max_students', v_a.max_students),
    'submissions', v_rows);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.guest_results(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_a public.guest_assignments%ROWTYPE;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  UPDATE public.guest_submissions SET retry_allowed = true
   WHERE assignment_id = p_assignment_id AND name_key = lower(btrim(p_name_key));
  RETURN jsonb_build_object('ok', FOUND);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.guest_grant_retry(uuid, text) TO authenticated;

-- Teacher's own assignment list (for the share panel + results picker).
CREATE OR REPLACE FUNCTION public.guest_my_assignments()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_rows jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', a.id, 'code', a.code, 'title', a.title, 'classroom', a.classroom_label,
           'subject_pack_id', a.subject_pack_id, 'question_count', a.question_count,
           'duration_mins', a.duration_mins, 'due_at', a.due_at, 'expires_at', a.expires_at,
           'status', a.status, 'max_students', a.max_students, 'created_at', a.created_at,
           'submissions', (SELECT count(*) FROM public.guest_submissions s
                            WHERE s.assignment_id = a.id AND s.submitted_at IS NOT NULL))
         ORDER BY a.created_at DESC), '[]'::jsonb)
    INTO v_rows FROM public.guest_assignments a WHERE a.teacher_id = auth.uid();
  RETURN jsonb_build_object('ok', true, 'assignments', v_rows);
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.guest_my_assignments() TO authenticated;


-- ── CLEANUP (cron, service role) ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.guest_cleanup()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_expired int; v_deleted int; v_attempts int;
BEGIN
  UPDATE public.guest_assignments SET status = 'expired'
   WHERE status = 'active' AND expires_at < now();
  GET DIAGNOSTICS v_expired = ROW_COUNT;

  -- Submissions older than 90 days (children's data - do not keep it forever).
  DELETE FROM public.guest_submissions WHERE submitted_at < now() - interval '90 days';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  DELETE FROM public.guest_pin_attempts
   WHERE updated_at < now() - interval '7 days'
     AND (locked_until IS NULL OR locked_until < now());
  GET DIAGNOSTICS v_attempts = ROW_COUNT;

  RETURN jsonb_build_object('ok', true, 'expired', v_expired,
    'submissions_deleted', v_deleted, 'attempt_rows_deleted', v_attempts);
END;
$fn$;

REVOKE EXECUTE ON FUNCTION public.guest_cleanup() FROM public, anon, authenticated;

COMMIT;

-- PostgREST caches function signatures; without this the new RPCs 404 until it
-- reloads. (This cost us most of a day on mint_student_session.)
NOTIFY pgrst, 'reload schema';


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Tables are invisible to the publishable key (expect permission denied):
--      curl -H "apikey: <PUBLISHABLE>" -H "Authorization: Bearer <PUBLISHABLE>" \
--           "https://<proj>.supabase.co/rest/v1/guest_assignments?select=id"
--
-- 2. Mark yourself a teacher and create one:
--      UPDATE public.profiles SET role='teacher', teacher_tier='verified' WHERE id='<your-uid>';
--      SELECT public.guest_assignment_create(
--        'Fractions homework','grade5-maths','["fractions"]'::jsonb,
--        '["g5m-fr-001","g5m-fr-002"]'::jsonb,'1234','Grade 5 Wed',15,NULL,48);
--
-- 3. Wrong PIN five times must lock for 10 minutes, PER NAME:
--      SELECT public.guest_open('<CODE>','Ravi','0000');   -- x5
--      SELECT public.guest_open('<CODE>','Priya','1234');  -- still works
--
-- 4. Cleanup is safe to run any time:
--      SELECT public.guest_cleanup();
