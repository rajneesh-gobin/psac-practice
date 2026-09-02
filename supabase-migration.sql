-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — THE migration to run
--
--  Paste into the Supabase SQL editor and Run. Every statement is idempotent:
--  re-running it changes nothing. Written 2026-08-26 against the live schema
--  (see supabase-schema.sql, which is a dump of what is actually deployed).
--
--  Parts 1–4 are outstanding fixes and run unattended.
--  Part 5 is judgement calls — DESTRUCTIVE or disruptive, left commented out
--  with the query to inspect first. Read it; do not paste it blind.
--
--  ── What is already live (verified 2026-08-26, re-asserted here for drift) ──
--    • soft_delete_student renames on delete;  verify_student_pin filters deleted_at
--    • set_student_pin writes students.pin (not pin_hash)
--    • GRANT SELECT (deleted_at) — without it the parent dashboard shows no children
--    • students_live_username_key replaces the blanket UNIQUE (family_id, username)
-- ═══════════════════════════════════════════════════════════════════════════


-- ═══ 1 · students: columns, grants, uniqueness ═════════════════════════════
-- ⚠ students has COLUMN-LEVEL SELECT grants (so pin stays unreadable). A column
--   added without its own GRANT is as unreadable as the PIN: every query that
--   selects or filters on it fails with 42501 "permission denied for table
--   students", and the client turns that into an empty list. This is what made
--   the parent dashboard show zero children. Keep the ADD COLUMN and the GRANT
--   together, always.
ALTER TABLE public.students  ADD COLUMN IF NOT EXISTS deleted_at       timestamptz;
ALTER TABLE public.students  ADD COLUMN IF NOT EXISTS pin_attempts     integer NOT NULL DEFAULT 0;
ALTER TABLE public.students  ADD COLUMN IF NOT EXISTS pin_locked_until timestamptz;
ALTER TABLE public.profiles  ADD COLUMN IF NOT EXISTS preferences      jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles  ADD COLUMN IF NOT EXISTS deleted_at       timestamptz;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS show_hints boolean NOT NULL DEFAULT true;

GRANT SELECT (deleted_at) ON public.students TO anon, authenticated;
-- pin, pin_hash, pin_attempts and pin_locked_until are deliberately NOT granted.

-- A soft-deleted child keeps its row, so it keeps holding its username. The
-- delete renames it out of the way; this index lets only the LIVE names compete.
CREATE UNIQUE INDEX IF NOT EXISTS students_live_username_key
  ON public.students (family_id, username) WHERE deleted_at IS NULL;

DO $do$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'students_live_username_key') THEN
    ALTER TABLE public.students DROP CONSTRAINT IF EXISTS students_family_id_username_key;
  ELSE
    RAISE WARNING 'students_live_username_key missing — keeping the blanket constraint. '
                  'Look for duplicate live (family_id, username) rows.';
  END IF;
END
$do$;

-- Any child soft-deleted before the rename existed is still holding a live name.
-- The '.del.' guard makes this a no-op on a database that is already correct.
UPDATE public.students
   SET username = username || '.del.' || left(replace(id::text, '-', ''), 8)
 WHERE deleted_at IS NOT NULL
   AND position('.del.' in username) = 0;


-- ═══ 1b · Refuse a child whose login would be ambiguous ════════════════════
-- A child logs in with (family name, username, PIN). Uniqueness was only ever
-- enforced on (family_id, username), so if two families share a name, adding a
-- child whose username already exists in the other one creates a login nobody
-- can use — and the parent is told nothing, because within THEIR family the
-- username really was free. Part 3 makes that login fail with a clear message;
-- this refuses to create the situation in the first place.
--
-- Once families_name_key (Part 1c) is in place this can never fire. It is kept
-- as the belt to that braces, and it is what protects the window in between.
CREATE OR REPLACE FUNCTION public.create_student_with_pin(
  p_family_id uuid, p_username text, p_display_name text,
  p_avatar text DEFAULT NULL::text, p_grade integer DEFAULT 5,
  p_pin text DEFAULT NULL::text, p_settings jsonb DEFAULT NULL::jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_id  uuid;
  v_row jsonb;
BEGIN
  -- Only the owning parent (or an admin) may add a child to a family.
  -- SECURITY DEFINER bypasses RLS, so this check is the access control.
  IF NOT (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family_id AND f.parent_id = auth.uid())
    OR public.is_admin()
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  IF p_username IS NULL OR btrim(p_username) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_username');
  END IF;

  -- Same username, under a DIFFERENT family that happens to share this family's
  -- name. The child would exist but could never log in, because the two are
  -- indistinguishable at the login screen.
  --
  -- Reported as plain 'username_taken' — the same code the unique violation
  -- below returns — ON PURPOSE. A distinct code would tell one parent that some
  -- other family exists, shares their family name, and has a child called this,
  -- and it would say so in the network response whatever the UI printed. The
  -- parent does not need to know why; they need to pick another username.
  IF EXISTS (
    SELECT 1
    FROM   public.students s
    JOIN   public.families f2 ON f2.id = s.family_id
    JOIN   public.families f1 ON f1.id = p_family_id
    WHERE  s.deleted_at IS NULL
      AND  f2.id <> f1.id
      AND  lower(trim(f2.family_name)) = lower(trim(f1.family_name))
      AND  lower(s.username) = lower(btrim(p_username))
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END IF;

  BEGIN
    INSERT INTO public.students
      (family_id, username, display_name, avatar, grade, pin, settings)
    VALUES (
      p_family_id,
      lower(btrim(p_username)),
      btrim(coalesce(p_display_name, p_username)),
      coalesce(nullif(btrim(coalesce(p_avatar, '')), ''), '🧒'),
      coalesce(p_grade, 5),
      crypt(p_pin, gen_salt('bf')),          -- hashed DURING insert
      coalesce(p_settings, '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb)
    )
    RETURNING id INTO v_id;
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END;

  -- Return the row WITHOUT pin/pin_hash.
  SELECT jsonb_build_object(
           'id', id, 'family_id', family_id, 'username', username,
           'display_name', display_name, 'avatar', avatar, 'grade', grade,
           'settings', settings, 'session_version', session_version,
           'expires_at', expires_at, 'created_at', created_at)
    INTO v_row
    FROM public.students WHERE id = v_id;

  RETURN jsonb_build_object('ok', true, 'student', v_row);
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.create_student_with_pin(uuid, text, text, text, integer, text, jsonb) FROM anon;
GRANT  EXECUTE ON FUNCTION public.create_student_with_pin(uuid, text, text, text, integer, text, jsonb) TO authenticated;


-- ═══ 1c · One family name per family ═══════════════════════════════════════
-- family_name is a login credential, but families only had unique indexes on
-- id, parent_id and family_code. Two families called "gobin" is how a child
-- ended up unable to log in at all.
--
-- Applied automatically once no duplicates remain. While any exist this WARNS
-- and lists them rather than aborting the migration — so fix the duplicates,
-- re-run this file, and the index appears.
DO $do$
DECLARE v_dupes text;
BEGIN
  SELECT string_agg(name || ' (x' || c || ')', ', ')
    INTO v_dupes
    FROM (SELECT lower(trim(family_name)) AS name, count(*) AS c
            FROM public.families GROUP BY 1 HAVING count(*) > 1) d;

  IF v_dupes IS NULL THEN
    CREATE UNIQUE INDEX IF NOT EXISTS families_name_key
      ON public.families (lower(trim(family_name)));
    RAISE NOTICE 'families_name_key applied — family names are now unique.';
  ELSE
    RAISE WARNING 'Duplicate family names, index NOT applied: %. Rename one of each '
                  '(Account & Settings -> Family Login) and re-run this file. Their '
                  'children type that name at login, so tell them.', v_dupes;
  END IF;
END
$do$;


-- ═══ 2 · set_student_pin — write the column verify_student_pin reads ═══════
-- create_student_with_pin writes students.pin and verify_student_pin reads it,
-- but this used to write students.pin_hash and set pin = NULL. students.pin is
-- NOT NULL, so the UPDATE raised 23502 and rolled back: every PIN change from
-- the parent dashboard silently did nothing while reporting success. Nothing
-- anywhere reads students.pin_hash.
CREATE OR REPLACE FUNCTION public.set_student_pin(p_student_id uuid, p_pin text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_found uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unauthorized');
  END IF;

  IF p_pin !~ '^[0-9]{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  SELECT s.id INTO v_found
  FROM families f
  JOIN students s ON s.family_id = f.id
  WHERE s.id = p_student_id
    AND (f.parent_id = auth.uid() OR public.is_admin())
  LIMIT 1;

  IF v_found IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'forbidden');
  END IF;

  -- Clears the lockout in BOTH places it has ever been kept, so a PIN reset
  -- always lifts it.
  UPDATE students
     SET pin              = crypt(p_pin, gen_salt('bf', 8)),
         pin_hash         = NULL,
         pin_attempts     = 0,
         pin_locked_until = NULL,
         settings         = coalesce(settings, '{}'::jsonb)
                              - 'pin_attempts' - 'pin_locked_until'
   WHERE id = p_student_id;

  RETURN jsonb_build_object('ok', true);
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.set_student_pin(uuid, text) FROM anon;
GRANT  EXECUTE ON FUNCTION public.set_student_pin(uuid, text) TO authenticated;


-- ═══ 3 · verify_student_pin ════════════════════════════════════════════════
-- Three things beyond the plain credential check:
--   a. deleted_at IS NULL on both lookups — a removed child must not be able to
--      log in with their old username, family name and PIN.
--   b. AMBIGUOUS FAMILY NAMES. families.family_name is not unique (only id,
--      parent_id and family_code are) yet it is one of the three things a child
--      types to log in. plpgsql SELECT ... INTO takes an arbitrary first row and
--      reports nothing, so when two families share a name the losing child just
--      "has the wrong PIN" for ever. Observed live: two parents each had a
--      family called "gobin" containing a child called "shanvi". Say so instead.
--   c. The lockout counters live in students.pin_attempts / pin_locked_until,
--      NOT in students.settings. settings is also the parent's Controls blob and
--      the client writes it wholesale, so every chapter lock or difficulty
--      change used to wipe the brute-force counter.
CREATE OR REPLACE FUNCTION public.verify_student_pin(
  p_username    text,
  p_pin         text,
  p_family_name text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $fn$
DECLARE
  v_student      public.students%ROWTYPE;
  v_max_tries    CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl          CONSTANT interval := interval '30 days';
  v_attempts     int;
  v_locked_until timestamptz;
  v_matches      int;
  v_now          timestamptz := now();
  v_ok           boolean;
  v_token        text;
BEGIN
  IF p_family_name IS NOT NULL AND trim(p_family_name) <> '' THEN
    SELECT count(*) INTO v_matches
    FROM   public.students s
    JOIN   public.families f ON f.id = s.family_id
    WHERE  lower(s.username)          = lower(p_username)
      AND  lower(trim(f.family_name)) = lower(trim(p_family_name))
      AND  s.deleted_at IS NULL;
    IF v_matches > 1 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'ambiguous_family');
    END IF;

    SELECT s.* INTO v_student
    FROM   public.students s
    JOIN   public.families f ON f.id = s.family_id
    WHERE  lower(s.username)          = lower(p_username)
      AND  lower(trim(f.family_name)) = lower(trim(p_family_name))
      AND  s.deleted_at IS NULL;
  ELSE
    -- Fallback: global lookup, kept so existing sessions keep working.
    SELECT * INTO v_student FROM public.students
    WHERE lower(username) = lower(p_username) AND deleted_at IS NULL LIMIT 1;
  END IF;

  -- Same generic error whether or not the user exists: no enumeration.
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  -- greatest()/coalesce so a counter still sitting in settings mid-migration is
  -- not silently forgiven.
  v_attempts     := greatest(
                      coalesce(v_student.pin_attempts, 0),
                      coalesce((coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_attempts')::int, 0));
  v_locked_until := coalesce(
                      v_student.pin_locked_until,
                      (coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_locked_until')::timestamptz);

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

  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students
         SET pin_attempts     = v_attempts,
             pin_locked_until = v_now + (v_lockout_secs || ' seconds')::interval,
             settings         = settings - 'pin_attempts' - 'pin_locked_until'
       WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students
       SET pin_attempts = v_attempts,
           settings     = settings - 'pin_attempts' - 'pin_locked_until'
     WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  UPDATE public.students
     SET pin_attempts     = 0,
         pin_locked_until = NULL,
         settings         = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: a fresh login invalidates every other device instantly.
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,
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

GRANT EXECUTE ON FUNCTION public.verify_student_pin(text, text, text) TO anon, authenticated;

-- Carry any counter still in settings over to the columns, then stop using it.
UPDATE public.students
   SET pin_attempts     = greatest(coalesce(pin_attempts, 0),
                                   coalesce((settings ->> 'pin_attempts')::int, 0)),
       pin_locked_until = coalesce(pin_locked_until,
                                   (settings ->> 'pin_locked_until')::timestamptz),
       settings         = settings - 'pin_attempts' - 'pin_locked_until'
 WHERE settings ? 'pin_attempts' OR settings ? 'pin_locked_until';


-- ═══ 3b · One-tap login links for a new child ══════════════════════════════
-- A parent creates a child and wants to WhatsApp them a link that just signs
-- them in. The obvious implementation - put the PIN in the URL - is the wrong
-- one: a PIN never expires and never changes by itself, so a forwarded message,
-- a screenshot or a browser history entry is a permanent key to that account,
-- and the anti-sharing session_version machinery cannot see it happen.
--
-- Instead the link carries a random 32-byte token that is SINGLE USE and
-- SHORT LIVED, and only ever a hash of it is stored - the same shape as
-- student_sessions. Redeeming it mints an ordinary student session, so
-- everything downstream (RLS, the anti-sharing guard, logout) is unchanged.
-- Worst case for a leaked link is one session before the child uses it, which
-- the child then notices because their own link says "already used".
CREATE TABLE IF NOT EXISTS public.student_invites (
  token_hash text        PRIMARY KEY,
  student_id uuid        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  created_by uuid        REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used_at    timestamptz
);

CREATE INDEX IF NOT EXISTS student_invites_student_idx
  ON public.student_invites (student_id);

-- Deny-all, like student_sessions: the raw token must never be readable, and
-- the two SECURITY DEFINER functions below are the only way in.
ALTER TABLE public.student_invites ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.student_invites FROM anon, authenticated;

-- Mint a link for one child. Replaces any unused link for that child, so the
-- last one the parent sent is the only one that works.
CREATE OR REPLACE FUNCTION public.create_student_invite(p_student uuid, p_hours int DEFAULT 48)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_token text;
  v_exp   timestamptz;
  v_hours int := least(greatest(coalesce(p_hours, 48), 1), 168);
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.students s
      JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND s.deleted_at IS NULL
       AND (f.parent_id = auth.uid() OR public.is_admin())
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  DELETE FROM public.student_invites WHERE student_id = p_student AND used_at IS NULL;
  DELETE FROM public.student_invites WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  v_exp   := now() + (v_hours || ' hours')::interval;

  INSERT INTO public.student_invites (token_hash, student_id, created_by, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), p_student, auth.uid(), v_exp);

  RETURN jsonb_build_object('ok', true, 'token', v_token, 'expires_at', v_exp);
END;
$$;

REVOKE ALL     ON FUNCTION public.create_student_invite(uuid, int) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.create_student_invite(uuid, int) TO authenticated;

-- Redeem it. Callable by anon - the child is not signed in yet, and the token
-- IS the credential. Returns exactly the payload verify_student_pin returns on
-- success, so the client logs in through the same path.
CREATE OR REPLACE FUNCTION public.redeem_student_invite(p_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_inv     public.student_invites%ROWTYPE;
  v_student public.students%ROWTYPE;
  v_token   text;
  v_now     timestamptz := now();
  v_ttl     CONSTANT interval := interval '30 days';
BEGIN
  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT * INTO v_inv FROM public.student_invites
   WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex');

  -- One generic answer for missing / already used / expired. Distinguishing
  -- them would let someone probe which tokens ever existed.
  IF NOT FOUND OR v_inv.used_at IS NOT NULL OR v_inv.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT * INTO v_student FROM public.students
   WHERE id = v_inv.student_id AND deleted_at IS NULL;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  UPDATE public.student_invites SET used_at = v_now WHERE token_hash = v_inv.token_hash;

  -- A link is a fresh login, so it behaves like one: the lockout clears and
  -- every other device is signed out.
  UPDATE public.students
     SET pin_attempts = 0, pin_locked_until = NULL
   WHERE id = v_student.id;

  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,
    'student', jsonb_build_object(
      'id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_student_invite(text) TO anon, authenticated;


-- ═══ 4 · soft_delete_student — also stop the push reminders ════════════════
-- It cleared student_sessions but not push_subscriptions, and push-reminders.js
-- selects purely on reminder_time — it never joins students. A removed child
-- kept getting a daily "time to study" notification.
CREATE OR REPLACE FUNCTION public.soft_delete_student(p_student uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ok  boolean;
  v_hit int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  -- SECURITY DEFINER bypasses RLS, so this is the access control.
  SELECT EXISTS (
    SELECT 1 FROM public.students s
      JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND (f.parent_id = auth.uid() OR public.is_admin())
  ) INTO v_ok;
  IF NOT v_ok THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  -- The rename is what frees the name for immediate re-use; students_live_username_key
  -- then only sees live rows.
  UPDATE public.students
     SET deleted_at = now(),
         username   = username || '.del.' || left(replace(id::text, '-', ''), 8)
   WHERE id = p_student AND deleted_at IS NULL;
  GET DIAGNOSTICS v_hit = ROW_COUNT;

  DELETE FROM public.student_sessions   WHERE student_id = p_student;
  DELETE FROM public.push_subscriptions WHERE student_id = p_student;

  -- Report a no-op rather than claiming success: the caller hides the child on
  -- the strength of this answer.
  IF v_hit = 0 THEN
    RETURN jsonb_build_object('ok', true, 'already_deleted', true);
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL     ON FUNCTION public.soft_delete_student(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.soft_delete_student(uuid) TO authenticated;

-- Catch up the children deleted before that DELETE existed.
DELETE FROM public.push_subscriptions ps
 USING public.students s
 WHERE s.id = ps.student_id AND s.deleted_at IS NOT NULL;


-- ═══════════════════════════════════════════════════════════════════════════
--  5 · JUDGEMENT CALLS — read, decide, then uncomment. Not run by default.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 5a · Rename a duplicate family ──────────────────────────────────────────
-- Part 1c applies the unique index by itself once no duplicates remain, so the
-- only manual step is choosing the new name. Which family keeps "gobin" is not
-- something a migration can decide.
--
--   SELECT f.id, f.family_name, p.full_name AS parent,
--          (SELECT count(*) FROM public.students s
--            WHERE s.family_id = f.id AND s.deleted_at IS NULL) AS children
--   FROM public.families f LEFT JOIN public.profiles p ON p.id = f.parent_id
--   WHERE lower(trim(f.family_name)) IN (
--     SELECT lower(trim(family_name)) FROM public.families
--     GROUP BY 1 HAVING count(*) > 1);
--
-- Rename in Account & Settings → Family Login (preferred — the app then tells
-- you if the new name is taken too), or here, then re-run this file:
--
-- UPDATE public.families SET family_name = 'gobin-b' WHERE id = '<uuid>';
--
-- Their children type that name at login, so tell them.

-- ── 5b · Orphaned rows (DESTRUCTIVE) ────────────────────────────────────────
-- student_progress, student_assignments, schedule_entries and study_schedules
-- hold student_id as TEXT with NO foreign key, while every other child table
-- uses uuid REFERENCES students(id). Nothing cascades, so a hard-deleted child
-- leaves its rows behind for ever. Counted 2026-08-26: 94 orphaned schedule
-- entries, 1 orphaned progress row.
--
-- An "orphan" also looks exactly like a row whose student is mid-restore, so
-- look before deleting:
--
--   SELECT student_id, count(*) FROM public.schedule_entries e
--   WHERE NOT EXISTS (SELECT 1 FROM public.students s WHERE s.id::text = e.student_id)
--   GROUP BY 1;
--
-- DELETE FROM public.schedule_entries e
--  WHERE NOT EXISTS (SELECT 1 FROM public.students s WHERE s.id::text = e.student_id);
-- DELETE FROM public.student_progress p
--  WHERE NOT EXISTS (SELECT 1 FROM public.students s WHERE s.id::text = p.student_id);
--
-- Converting those four columns to uuid + ON DELETE CASCADE is the real fix,
-- but it means rewriting owns_student_txt() and the policies that compare ::text.

-- ── 5c · Stray mm_data key ──────────────────────────────────────────────────
-- Only 'global_settings' is read by the app; the other key is a whole student
-- progress blob left over from the pre-Supabase localStorage design.
--
--   SELECT key FROM public.mm_data;
-- DELETE FROM public.mm_data WHERE key <> 'global_settings';


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY (run after)
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. deleted_at readable — expect one row:
--      SELECT column_name FROM information_schema.column_privileges
--      WHERE table_name='students' AND column_name='deleted_at'
--        AND grantee='authenticated' AND privilege_type='SELECT';
--
-- 2. No live child holds a '.del.' name, no deleted child holds a clean one:
--      SELECT username, deleted_at IS NOT NULL AS deleted FROM public.students
--      ORDER BY deleted;
--
-- 3. A wrong PIN increments the COLUMN and leaves settings untouched:
--      SELECT public.verify_student_pin('shanvi1','0000','gobin');
--      SELECT username, pin_attempts, settings FROM public.students WHERE username='shanvi1';
--    (then clear it: reset that child's PIN from the parent dashboard)
--
-- 4. Counters survive a parent Controls toggle — flip one, re-run query 3.


-- ═══════════════════════════════════════════════════════════════════════════
--  PART 6 — FRIEND LEADERBOARD
--  Safe to re-run (idempotent). No destructive steps.
-- ═══════════════════════════════════════════════════════════════════════════

-- 6-A  friend_code column on students
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS friend_code text;

-- Generate an 8-char uppercase alphanumeric code for every student that
-- doesn't have one yet.  pgcrypto must already be enabled (it is, Part 1).
UPDATE public.students
SET    friend_code = upper(substring(encode(gen_random_bytes(6),'hex') from 1 for 8))
WHERE  friend_code IS NULL;

-- Ensure uniqueness going forward (existing rows already unique after UPDATE).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename='students' AND indexname='students_friend_code_key'
  ) THEN
    ALTER TABLE public.students ADD CONSTRAINT students_friend_code_key UNIQUE (friend_code);
  END IF;
END$$;

-- Allow the authenticated role to read this column.
GRANT SELECT (friend_code) ON public.students TO anon, authenticated;

-- 6-B  student_friends table
CREATE TABLE IF NOT EXISTS public.student_friends (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id_a  uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  student_id_b  uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  created_at    timestamptz NOT NULL DEFAULT now(),
  -- canonical ordering: a < b (UUID text comparison)
  CONSTRAINT student_friends_order  CHECK (student_id_a < student_id_b),
  CONSTRAINT student_friends_unique UNIQUE (student_id_a, student_id_b)
);

ALTER TABLE public.student_friends ENABLE ROW LEVEL SECURITY;

-- A student can see pairs they are part of.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename='student_friends' AND policyname='friends_select'
  ) THEN
    CREATE POLICY friends_select ON public.student_friends
      FOR SELECT
      USING (
        student_id_a = public.current_student_id() OR
        student_id_b = public.current_student_id()
      );
  END IF;
END$$;

-- A student can remove a pair they are part of.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename='student_friends' AND policyname='friends_delete'
  ) THEN
    CREATE POLICY friends_delete ON public.student_friends
      FOR DELETE
      USING (
        student_id_a = public.current_student_id() OR
        student_id_b = public.current_student_id()
      );
  END IF;
END$$;

GRANT SELECT, DELETE ON public.student_friends TO authenticated;

-- 6-C  add_friend(p_friend_code text) → jsonb
--      Called by the accepting student.  Returns {ok:true} or {error:'...'}.
CREATE OR REPLACE FUNCTION public.add_friend(p_friend_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller uuid := public.current_student_id();
  v_target uuid;
  v_a      uuid;
  v_b      uuid;
  v_count  int;
BEGIN
  IF v_caller IS NULL THEN
    RETURN jsonb_build_object('error', 'not_authenticated');
  END IF;

  SELECT id INTO v_target
  FROM   public.students
  WHERE  friend_code = upper(p_friend_code)
    AND  deleted_at IS NULL;

  IF v_target IS NULL THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;

  IF v_target = v_caller THEN
    RETURN jsonb_build_object('error', 'self');
  END IF;

  -- Enforce max 20 friends per student.
  SELECT count(*) INTO v_count
  FROM   public.student_friends
  WHERE  student_id_a = v_caller OR student_id_b = v_caller;

  IF v_count >= 20 THEN
    RETURN jsonb_build_object('error', 'max_friends');
  END IF;

  -- Canonical ordering.
  IF v_caller < v_target THEN
    v_a := v_caller; v_b := v_target;
  ELSE
    v_a := v_target; v_b := v_caller;
  END IF;

  INSERT INTO public.student_friends (student_id_a, student_id_b)
  VALUES (v_a, v_b)
  ON CONFLICT DO NOTHING;   -- idempotent

  RETURN jsonb_build_object('ok', true);
END;
$$;

GRANT EXECUTE ON FUNCTION public.add_friend(text) TO anon, authenticated;

-- 6-D  get_my_friends() → setof record
--      Returns the leaderboard data for every friend of the calling student.
--      XP/level/stats live in student_progress.data (JSONB), not on the students row.
--      ⚠ Cannot use CREATE OR REPLACE when adding columns — must DROP first if re-running.
DROP FUNCTION IF EXISTS public.get_my_friends();
CREATE FUNCTION public.get_my_friends()
RETURNS TABLE (
  id              uuid,
  display_name    text,
  avatar          text,
  grade           text,
  friend_code     text,
  xp              int,
  level           int,
  streak          int,
  total_attempted int,
  total_correct   int
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    s.id,
    s.display_name,
    s.avatar,
    s.grade::text,
    s.friend_code,
    coalesce((sp.data->>'xp')::int,    0) AS xp,
    coalesce((sp.data->>'level')::int, 1) AS level,
    coalesce((sp.data->'stats'->>'streak')::int, 0) AS streak,
    coalesce((sp.data->'stats'->>'totalAttempted')::int, 0) AS total_attempted,
    coalesce((sp.data->'stats'->>'totalCorrect')::int,   0) AS total_correct
  FROM public.student_friends f
  JOIN public.students s
    ON s.id = CASE
                WHEN f.student_id_a = public.current_student_id() THEN f.student_id_b
                ELSE f.student_id_a
              END
  LEFT JOIN public.student_progress sp ON sp.student_id = s.id::text
  WHERE (f.student_id_a = public.current_student_id()
     OR  f.student_id_b = public.current_student_id())
    AND s.deleted_at IS NULL
  ORDER BY xp DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_my_friends() TO anon, authenticated;

-- 6-E  get_my_friend_code() → text
CREATE OR REPLACE FUNCTION public.get_my_friend_code()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT friend_code
  FROM   public.students
  WHERE  id = public.current_student_id()
    AND  deleted_at IS NULL;
$$;

GRANT EXECUTE ON FUNCTION public.get_my_friend_code() TO anon, authenticated;

-- 6-F  remove_friend(p_friend_id uuid) → void
CREATE OR REPLACE FUNCTION public.remove_friend(p_friend_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.student_friends
  WHERE (student_id_a = public.current_student_id() AND student_id_b = p_friend_id)
     OR (student_id_b = public.current_student_id() AND student_id_a = p_friend_id);
$$;

GRANT EXECUTE ON FUNCTION public.remove_friend(uuid) TO anon, authenticated;

-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY Part 6 (run after)
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Every student has a code:
--      SELECT count(*) FROM public.students WHERE friend_code IS NULL;
--    → expect 0
--
-- 2. Functions exist:
--      SELECT routine_name FROM information_schema.routines
--      WHERE routine_schema='public'
--        AND routine_name IN ('add_friend','get_my_friends','get_my_friend_code','remove_friend');
--    → expect 4 rows
--
-- 3. Canonical ordering is enforced:
--      INSERT INTO public.student_friends (student_id_a, student_id_b)
--      VALUES ('bbbb...','aaaa...');  -- should fail CHECK constraint
