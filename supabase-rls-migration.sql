-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — RLS LOCKDOWN MIGRATION
--
--  Replaces the permissive "anon_all" policies (USING (true) WITH CHECK (true))
--  with per-role, per-row policies.
--
--  APPROACH FOR STUDENTS
--  Students are not Supabase Auth users. verify_student_pin() now mints an
--  opaque session token, stores only its SHA-256 hash, and returns it.
--  The client sends it back as the header  x-student-token .
--  public.current_student_id() resolves that header to a student UUID, so
--  policies read as   student_id = current_student_id()   — the same shape as
--  auth.uid(). No Netlify proxy, no shadow auth users.
--
--  ⚠ READ PART 7 BEFORE RUNNING. Until the app is updated to send the header,
--    student-facing screens will break. Part 7 is a temporary bridge that
--    keeps them working while still closing the worst holes immediately.
--
--  Run in: Supabase → SQL Editor. Idempotent — safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── PART 0 · Prerequisites ──────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- digest(), gen_random_bytes(), crypt()

-- push_subscriptions does not exist in production yet (verified) — create it
-- here so the push feature stops failing and so RLS can be applied to it.
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id    uuid        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subscription  jsonb       NOT NULL,
  reminder_time text,                       -- "HH:MM" Mauritius time (UTC+4)
  created_at    timestamptz DEFAULT now(),
  UNIQUE (student_id)
);


-- ── PART 1 · Helper functions ───────────────────────────────────────────────
-- All are SECURITY DEFINER + STABLE.
--   SECURITY DEFINER: they read tables that are themselves protected by RLS.
--     Without it, a policy on profiles that queries profiles recurses infinitely.
--     (The "admin_all" policy in supabase-db-patch.sql has exactly that bug —
--      it does EXISTS(SELECT 1 FROM profiles …) inside a policy ON profiles.)
--   STABLE: lets Postgres evaluate once per statement instead of once per row.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT coalesce((SELECT p.role = 'admin' FROM public.profiles p WHERE p.id = auth.uid()), false);
$fn$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT coalesce((SELECT p.is_super_admin FROM public.profiles p WHERE p.id = auth.uid()), false);
$fn$;

-- true when the signed-in parent owns this student
CREATE OR REPLACE FUNCTION public.owns_student(p_student uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT EXISTS (
    SELECT 1
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
    WHERE s.id = p_student
      AND f.parent_id = auth.uid()
  );
$fn$;

-- Same, for tables where student_id is TEXT (student_progress, study_schedules,
-- schedule_entries). Guards the cast so malformed text returns false, not an error.
CREATE OR REPLACE FUNCTION public.owns_student_txt(p_student text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
  SELECT CASE
           WHEN p_student ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
           THEN public.owns_student(p_student::uuid)
           ELSE false
         END;
$fn$;


-- ── PART 2 · Student sessions ───────────────────────────────────────────────
-- Only the SHA-256 hash of the token is stored, so a database leak does not
-- hand out live sessions.

CREATE TABLE IF NOT EXISTS public.student_sessions (
  token_hash text        PRIMARY KEY,
  student_id uuid        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  user_agent text
);
CREATE INDEX IF NOT EXISTS student_sessions_student_idx ON public.student_sessions(student_id);
CREATE INDEX IF NOT EXISTS student_sessions_expiry_idx  ON public.student_sessions(expires_at);

-- Resolve the x-student-token request header to a student id.
-- Returns NULL when absent, malformed, unknown or expired → policies then deny.
CREATE OR REPLACE FUNCTION public.current_student_id()
RETURNS uuid LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_raw text;
  v_tok text;
  v_id  uuid;
BEGIN
  BEGIN
    v_raw := current_setting('request.headers', true);   -- NULL outside PostgREST
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_raw IS NULL OR v_raw = '' THEN RETURN NULL; END IF;

  BEGIN
    v_tok := (v_raw::json ->> 'x-student-token');
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_tok IS NULL OR length(v_tok) < 32 THEN RETURN NULL; END IF;

  SELECT s.student_id INTO v_id
  FROM public.student_sessions s
  WHERE s.token_hash = encode(digest(v_tok, 'sha256'), 'hex')
    AND s.expires_at > now()
  LIMIT 1;

  RETURN v_id;
END;
$fn$;

REVOKE ALL ON FUNCTION public.current_student_id()      FROM public;
GRANT EXECUTE ON FUNCTION public.current_student_id()      TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin()                TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin()          TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.owns_student(uuid)        TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.owns_student_txt(text)    TO anon, authenticated;


-- ── PART 3 · verify_student_pin — now also mints a session ──────────────────
-- ⚠ The deployed function differs from supabase-db-patch.sql (production returns
--   'invalid_credentials'; the repo copy returns 'User not found', which leaks
--   whether a username exists). BEFORE APPLYING, capture the live definition:
--
--     SELECT pg_get_functiondef('public.verify_student_pin(text,text)'::regprocedure);
--
--   and diff it against the body below. The version here preserves the
--   non-enumerating behaviour and the existing return shape (ok / student /
--   locked / secsLeft / attemptsLeft / error) and only ADDS `session_token`,
--   so current app code keeps working unchanged.

CREATE OR REPLACE FUNCTION public.verify_student_pin(p_username text, p_pin text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_student      public.students%ROWTYPE;
  v_max_tries    CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl          CONSTANT interval := interval '30 days';
  v_attempts     int;
  v_locked_until timestamptz;
  v_settings     jsonb;
  v_now          timestamptz := now();
  v_ok           boolean;
  v_token        text;
BEGIN
  SELECT * INTO v_student FROM public.students
  WHERE lower(username) = lower(p_username) LIMIT 1;

  -- Same generic error whether or not the user exists: no enumeration.
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_settings     := coalesce(v_student.settings, '{}'::jsonb);
  v_attempts     := coalesce((v_settings ->> 'pin_attempts')::int, 0);
  v_locked_until := (v_settings ->> 'pin_locked_until')::timestamptz;

  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  -- bcrypt, with a plaintext fallback for un-migrated dev rows
  IF v_student.pin IS NULL THEN
    v_ok := false;
  ELSIF v_student.pin = p_pin THEN
    v_ok := true;
  ELSE
    v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;

  -- ── wrong PIN ──
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students
         SET settings = settings || jsonb_build_object(
               'pin_attempts', v_attempts,
               'pin_locked_until', v_now + (v_lockout_secs || ' seconds')::interval)
       WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students
       SET settings = settings || jsonb_build_object('pin_attempts', v_attempts)
     WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  -- ── correct PIN ──
  UPDATE public.students
     SET settings = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: a fresh login invalidates every other device instantly
  -- (previously this relied on a 5-minute session_version poll).
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,            -- ← NEW: client must send as x-student-token
    'student', jsonb_build_object(
      'id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at
    )
  );
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.verify_student_pin(text, text) TO anon, authenticated;

-- Explicit logout (call from the app on sign-out).
CREATE OR REPLACE FUNCTION public.end_student_session()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE v_id uuid := public.current_student_id();
BEGIN
  IF v_id IS NOT NULL THEN
    DELETE FROM public.student_sessions WHERE student_id = v_id;
  END IF;
END;
$fn$;
GRANT EXECUTE ON FUNCTION public.end_student_session() TO anon, authenticated;


-- ── PART 4 · Drop EVERY existing policy on the target tables ────────────────
-- Not just the ones named "anon_all": production has drifted from the repo
-- (e.g. login_events is anon-readable despite being documented INSERT-only),
-- so we clear the slate rather than guess policy names.

DO $do$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = ANY (ARRAY[
        'profiles','families','students','student_progress','student_assignments',
        'mm_data','question_reports','plans','subscriptions','payments',
        'login_events','forum_posts','forum_replies',
        'study_schedules','schedule_entries','push_subscriptions','student_sessions'])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END
$do$;

-- Enable RLS everywhere. A table with RLS on and no matching policy denies by
-- default — that is the behaviour we want for anything not listed below.
DO $do$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles','families','students','student_progress','student_assignments',
    'mm_data','question_reports','plans','subscriptions','payments',
    'login_events','forum_posts','forum_replies',
    'study_schedules','schedule_entries','push_subscriptions','student_sessions']
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END
$do$;
-- Deliberately NOT using FORCE ROW LEVEL SECURITY. FORCE applies policies to the
-- table owner as well, which would break this migration's own machinery:
--   • verify_student_pin() is SECURITY DEFINER and INSERTs into student_sessions,
--     a table that intentionally has RLS on and no policies — under FORCE that
--     insert would be denied and PIN login would stop working entirely;
--   • is_admin() reads profiles from inside a policy ON profiles — under FORCE
--     that reintroduces the infinite recursion this file is fixing.
-- ENABLE (without FORCE) is what actually gates anon/authenticated, which is the
-- threat here. service_role (Netlify Functions) has BYPASSRLS and is unaffected.


-- ── PART 5 · Per-table policies ─────────────────────────────────────────────
-- TYPE NOTE: student_id is UUID on some tables and TEXT on others in this
-- database (student_progress, study_schedules and schedule_entries are declared
-- TEXT; student_assignments differs from its documented type). Every student-id
-- comparison below therefore normalises BOTH sides with ::text, and all
-- ownership checks go through owns_student_txt(). This is type-agnostic and
-- cannot raise "operator does not exist: text = uuid" whichever way a column is
-- declared. The cost is that these predicates cannot use a uuid index — at the
-- current data volume (single-digit rows per table) that is irrelevant, but if
-- student_progress ever grows large, unify the column types and drop the casts.

-- ......................................................... profiles
-- Own row, plus admins. is_admin() is SECURITY DEFINER, so no recursion.
CREATE POLICY profiles_select ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());
CREATE POLICY profiles_insert ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());              -- self-provision during family setup
CREATE POLICY profiles_update ON public.profiles FOR UPDATE
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());
CREATE POLICY profiles_delete ON public.profiles FOR DELETE
  USING (public.is_admin());

-- ......................................................... families
CREATE POLICY families_own ON public.families FOR ALL
  USING (parent_id = auth.uid() OR public.is_admin())
  WITH CHECK (parent_id = auth.uid() OR public.is_admin());

-- ......................................................... students
-- Parent manages their children; admin sees all; a student may read ONLY their
-- own row (needed by the session guard and by _resumeStudent, which poll
-- session_version / expires_at).
CREATE POLICY students_parent ON public.students FOR ALL
  USING (public.owns_student_txt(id::text) OR public.is_admin())
  WITH CHECK (
    public.is_admin()
    OR family_id::text IN (SELECT f.id::text FROM public.families f WHERE f.parent_id = auth.uid())
  );
CREATE POLICY students_self_read ON public.students FOR SELECT
  USING (id::text = public.current_student_id()::text);

-- ......................................................... student_progress
-- student_id is TEXT here.
CREATE POLICY progress_rw ON public.student_progress FOR ALL
  USING (
    student_id::text = public.current_student_id()::text
    OR public.owns_student_txt(student_id::text)
    OR public.is_admin()
  )
  WITH CHECK (
    student_id::text = public.current_student_id()::text
    OR public.owns_student_txt(student_id::text)
    OR public.is_admin()
  );

-- ......................................................... student_assignments
-- Parents create/remove; students read and mark complete.
CREATE POLICY assignments_select ON public.student_assignments FOR SELECT
  USING (student_id::text = public.current_student_id()::text
         OR public.owns_student_txt(student_id::text) OR public.is_admin());
CREATE POLICY assignments_insert ON public.student_assignments FOR INSERT
  WITH CHECK (public.owns_student_txt(student_id::text) OR public.is_admin());
CREATE POLICY assignments_update ON public.student_assignments FOR UPDATE
  USING (student_id::text = public.current_student_id()::text
         OR public.owns_student_txt(student_id::text) OR public.is_admin())
  WITH CHECK (student_id::text = public.current_student_id()::text
         OR public.owns_student_txt(student_id::text) OR public.is_admin());
CREATE POLICY assignments_delete ON public.student_assignments FOR DELETE
  USING (public.owns_student_txt(student_id::text) OR public.is_admin());

-- ......................................................... mm_data
-- Students are not authenticated but DO need global_settings at login, so that
-- one key is world-readable (it holds no secrets). Every other key is admin-only
-- — this keeps the generic KV store from becoming an accidental secret leak.
CREATE POLICY mmdata_read_global ON public.mm_data FOR SELECT
  USING (key = 'global_settings' OR public.is_admin());
CREATE POLICY mmdata_write_admin ON public.mm_data FOR INSERT
  WITH CHECK (public.is_admin());
CREATE POLICY mmdata_update_admin ON public.mm_data FOR UPDATE
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY mmdata_delete_admin ON public.mm_data FOR DELETE
  USING (public.is_admin());

-- ......................................................... question_reports
-- Insert requires a real identity (student session or signed-in adult) so the
-- table cannot be flooded anonymously. Only admins may read or triage.
CREATE POLICY reports_insert ON public.question_reports FOR INSERT
  WITH CHECK (public.current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL);
CREATE POLICY reports_select_admin ON public.question_reports FOR SELECT
  USING (public.is_admin());
CREATE POLICY reports_update_admin ON public.question_reports FOR UPDATE
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ......................................................... plans
-- Public pricing; admins edit.
CREATE POLICY plans_read ON public.plans FOR SELECT USING (true);
CREATE POLICY plans_write ON public.plans FOR UPDATE
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY plans_insert ON public.plans FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY plans_delete ON public.plans FOR DELETE USING (public.is_admin());

-- ......................................................... subscriptions / payments
-- Owner reads their own; only admins (and service_role) write. Billing rows must
-- never be client-writable.
CREATE POLICY subs_select ON public.subscriptions FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY subs_write ON public.subscriptions FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY pay_select ON public.payments FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY pay_write ON public.payments FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ......................................................... login_events
-- Append-only audit log. Readable by admins only (it holds IPs, user agents and
-- device fingerprints — today it is world-readable, which is the worst finding
-- in this table set).
CREATE POLICY login_insert ON public.login_events FOR INSERT
  WITH CHECK (public.current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL);
CREATE POLICY login_select_admin ON public.login_events FOR SELECT
  USING (public.is_admin());

-- ......................................................... forum
-- The forum has no author id column — author_name is client-supplied text, so
-- "authors may delete their own posts" cannot be expressed safely today.
-- Add stamped author columns; the DEFAULTs mean NO app change is required.
ALTER TABLE public.forum_posts   ADD COLUMN IF NOT EXISTS author_id         uuid DEFAULT auth.uid();
ALTER TABLE public.forum_posts   ADD COLUMN IF NOT EXISTS author_student_id uuid DEFAULT public.current_student_id();
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_id         uuid DEFAULT auth.uid();
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_student_id uuid DEFAULT public.current_student_id();

CREATE POLICY posts_read ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY posts_insert ON public.forum_posts FOR INSERT
  WITH CHECK (public.current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL);
CREATE POLICY posts_update_admin ON public.forum_posts FOR UPDATE      -- close / reopen
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY posts_delete ON public.forum_posts FOR DELETE
  USING (author_id = auth.uid() OR author_student_id = public.current_student_id() OR public.is_admin());

CREATE POLICY replies_read ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY replies_insert ON public.forum_replies FOR INSERT
  WITH CHECK (public.current_student_id() IS NOT NULL OR auth.uid() IS NOT NULL);
CREATE POLICY replies_delete ON public.forum_replies FOR DELETE
  USING (author_id = auth.uid() OR author_student_id = public.current_student_id() OR public.is_admin());
-- NOTE: rows created before this migration have NULL author columns, so only
-- admins can delete them. That is intentional — their authorship is unprovable.

-- ......................................................... calendar
-- Parents own the timetable; students may read theirs.
CREATE POLICY sched_parent ON public.study_schedules FOR ALL
  USING (public.owns_student_txt(student_id::text) OR public.is_admin())
  WITH CHECK (public.owns_student_txt(student_id::text) OR public.is_admin());
CREATE POLICY sched_student_read ON public.study_schedules FOR SELECT
  USING (student_id::text = public.current_student_id()::text);

CREATE POLICY entries_parent ON public.schedule_entries FOR ALL
  USING (public.owns_student_txt(student_id::text) OR public.is_admin())
  WITH CHECK (public.owns_student_txt(student_id::text) OR public.is_admin());
CREATE POLICY entries_student_read ON public.schedule_entries FOR SELECT
  USING (student_id::text = public.current_student_id()::text);

-- ......................................................... push_subscriptions
-- No client policies at all → RLS denies everyone. Only the Netlify Functions,
-- which use the service_role key, can touch this table. That is correct: push
-- endpoints are credentials.

-- ......................................................... student_sessions
-- Likewise: no policies. Token hashes are reachable only via the SECURITY
-- DEFINER functions above.

-- ......................................................... teachers
-- Per the brief, teachers get NO direct table access until classroom tables
-- exist. They are ordinary authenticated users, so every policy above already
-- denies them anything they do not personally own.


-- ── PART 6 · Column-level hardening ─────────────────────────────────────────
-- RLS is row-level; it cannot stop a permitted reader from selecting the PIN
-- hash. Revoke the columns outright.
REVOKE SELECT (pin)      ON public.students FROM anon, authenticated;
REVOKE SELECT (pin_hash) ON public.students FROM anon, authenticated;
-- ⚠ Any client query doing  select('*')  on students will now ERROR.
--    In this codebase that is Store.findStudentByUsername() (local-dev path only);
--    every other caller already selects explicit columns. Fix it to an explicit
--    column list when you update the app.


-- ── PART 7 · TEMPORARY COMPATIBILITY BRIDGE ─────────────────────────────────
--  ⚠⚠ READ THIS ⚠⚠
--  The app does not send x-student-token yet, so current_student_id() returns
--  NULL and every student-facing screen (progress save, assignments, today's
--  plan, forum posting, question reports) would break the moment you commit.
--
--  The policies below re-open ONLY the student-owned tables to anon, so the app
--  keeps working while you ship the client change. Everything genuinely
--  sensitive is already locked by Parts 5–6 even with this bridge in place:
--      families, students (incl. usernames + PIN hashes), profiles,
--      payments, subscriptions, login_events, mm_data, question_reports
--  are protected from the moment you run this file.
--
--  DELETE THIS ENTIRE BLOCK once the app sends the header. Verify first with:
--      SELECT public.current_student_id();   -- from the app, must be non-NULL
--
--  To go straight to full lockdown, comment out this block before running.

CREATE POLICY bridge_progress   ON public.student_progress    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY bridge_assign     ON public.student_assignments FOR SELECT USING (true);
CREATE POLICY bridge_assign_upd ON public.student_assignments FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY bridge_sched      ON public.study_schedules     FOR SELECT USING (true);
CREATE POLICY bridge_entries    ON public.schedule_entries    FOR SELECT USING (true);
CREATE POLICY bridge_posts_ins  ON public.forum_posts         FOR INSERT WITH CHECK (true);
CREATE POLICY bridge_reps_ins   ON public.forum_replies       FOR INSERT WITH CHECK (true);
CREATE POLICY bridge_reports    ON public.question_reports    FOR INSERT WITH CHECK (true);
CREATE POLICY bridge_login      ON public.login_events        FOR INSERT WITH CHECK (true);
CREATE POLICY bridge_students   ON public.students            FOR SELECT USING (true);
--  ^ bridge_students is the loosest one: it re-exposes usernames/display names
--    to anon because the session guard polls students.session_version directly.
--    It is the FIRST bridge policy to remove.

-- Removal script (run after the app update):
--   DROP POLICY IF EXISTS bridge_progress   ON public.student_progress;
--   DROP POLICY IF EXISTS bridge_assign     ON public.student_assignments;
--   DROP POLICY IF EXISTS bridge_assign_upd ON public.student_assignments;
--   DROP POLICY IF EXISTS bridge_sched      ON public.study_schedules;
--   DROP POLICY IF EXISTS bridge_entries    ON public.schedule_entries;
--   DROP POLICY IF EXISTS bridge_posts_ins  ON public.forum_posts;
--   DROP POLICY IF EXISTS bridge_reps_ins   ON public.forum_replies;
--   DROP POLICY IF EXISTS bridge_reports    ON public.question_reports;
--   DROP POLICY IF EXISTS bridge_login      ON public.login_events;
--   DROP POLICY IF EXISTS bridge_students   ON public.students;

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  PART 8 · Verification — run these after committing
-- ═══════════════════════════════════════════════════════════════════════════

-- 8.1 Every policy now in force:
-- SELECT tablename, policyname, cmd, qual
--   FROM pg_policies WHERE schemaname='public' ORDER BY tablename, policyname;

-- 8.2 Any table left with an unrestricted policy (bridge_* are the expected hits):
-- SELECT tablename, policyname, cmd FROM pg_policies
--  WHERE schemaname='public' AND (qual = 'true' OR with_check = 'true')
--  ORDER BY tablename;

-- 8.3 Any public table with RLS still disabled:
-- SELECT c.relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
--  WHERE n.nspname='public' AND c.relkind='r' AND NOT c.relrowsecurity;

-- 8.4 External check — from a terminal, using ONLY the publishable key.
--     families/students/login_events/payments must all return 0 rows or 401.
--     (students will still return rows until bridge_students is dropped.)
--
--   curl -s -H "apikey: <PUBLISHABLE_KEY>" -H "Authorization: Bearer <PUBLISHABLE_KEY>" \
--        -H "Prefer: count=exact" -H "Range: 0-0" \
--        "https://<project>.supabase.co/rest/v1/families?select=id"
