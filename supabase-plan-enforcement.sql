-- ═══════════════════════════════════════════════════════════════════════════
--  PLAN ENFORCEMENT — SERVER SIDE
--
--  Run this in the Supabase SQL editor. Idempotent: re-running changes nothing.
--
--  Everything here is inert until plan enforcement is switched on in
--  Admin → Settings (mm_data.global_settings.plan_enforcement_enabled = true).
--  Until then plan_enforcement_on() returns false and every check below is a
--  no-op, exactly like window.PLAN_ENFORCEMENT on the client.
-- ═══════════════════════════════════════════════════════════════════════════


-- ── 1 · Effective plan for a user ─────────────────────────────────────────
-- Active subscription wins; otherwise the 'free' row. Mirrors
-- Store.getUserPlan() in engine/store.js — if that resolution ever changes,
-- change it in both places or the server and the browser will disagree about
-- what a family has paid for.
--
-- expires_at is honoured here but NOT in the client version: a lapsed
-- subscription still reads as 'active' in the browser until someone flips the
-- row. The server is the one that must not be fooled.
CREATE OR REPLACE FUNCTION public.plan_for_user(p_uid uuid)
RETURNS public.plans
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_plan public.plans;
BEGIN
  IF p_uid IS NULL THEN
    SELECT p.* INTO v_plan FROM public.plans p WHERE p.id = 'free' LIMIT 1;
    RETURN v_plan;
  END IF;

  SELECT p.* INTO v_plan
    FROM public.subscriptions s
    JOIN public.plans p ON p.id = s.plan_id
   WHERE s.user_id = p_uid
     AND s.status  = 'active'
     AND (s.expires_at IS NULL OR s.expires_at > now())
   ORDER BY s.started_at DESC
   LIMIT 1;

  IF FOUND THEN RETURN v_plan; END IF;

  SELECT p.* INTO v_plan FROM public.plans p WHERE p.id = 'free' LIMIT 1;
  RETURN v_plan;   -- NULL if no 'free' row exists; callers must tolerate that
END;
$function$;


-- ── 2 · Is plan enforcement switched on? ──────────────────────────────────
-- Compared as jsonb rather than cast to boolean on purpose: a stray string in
-- that key would make `::boolean` raise, and an admin settings typo must never
-- be able to break every child's login.
CREATE OR REPLACE FUNCTION public.plan_enforcement_on()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce(
    (SELECT d.value -> 'plan_enforcement_enabled' = 'true'::jsonb
       FROM public.mm_data d
      WHERE d.key = 'global_settings'
      LIMIT 1),
    false)
$function$;


-- ── 3 · max_children ──────────────────────────────────────────────────────
-- A TRIGGER, not a check inside create_student_with_pin(), so that every
-- insert path is covered: that RPC today, a direct insert under RLS, and any
-- future RPC nobody remembers to update. The RPC additionally traps the error
-- below to return the usual { ok:false, error:... } shape.
--
-- Reads plans.max_children — the COLUMN, which is what the plans list and the
-- pricing page display. features->>'max_children' is a second, unused copy of
-- the same idea; the admin form is being changed to stop writing it.
CREATE OR REPLACE FUNCTION public.enforce_max_children()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_parent uuid;
  v_max    integer;
  v_count  integer;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NEW; END IF;
  -- An admin adding a child on someone's behalf (support, migration) is not
  -- the person being sold to.
  IF public.is_admin() THEN RETURN NEW; END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.families f WHERE f.id = NEW.family_id;
  IF v_parent IS NULL THEN RETURN NEW; END IF;

  -- Read it NULLABLE, then decide. `coalesce(..., 1)` here was a fail-CLOSED
  -- bug: a composite-returning function in FROM always yields a row, so when
  -- plan_for_user() returns NULL (no 'free' row, or an unseeded plans table)
  -- p.max_children is NULL, the coalesce turned that into 1, and every family
  -- was hard-capped at one child - with the IF below unreachable dead code.
  -- No plan information must mean NO limit, the same as everywhere else here.
  SELECT p.max_children INTO v_max
    FROM public.plan_for_user(v_parent) p;
  IF v_max IS NULL THEN RETURN NEW; END IF;

  -- Soft-deleted children do not count: a parent who removed one has freed the
  -- slot, and charging them for a row they cannot see would be indefensible.
  SELECT count(*) INTO v_count
    FROM public.students s
   WHERE s.family_id = NEW.family_id
     AND s.deleted_at IS NULL;

  IF v_count >= v_max THEN
    RAISE EXCEPTION 'plan_child_limit:%', v_max
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS students_max_children ON public.students;
CREATE TRIGGER students_max_children
  BEFORE INSERT ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.enforce_max_children();


-- ── 4 · create_student_with_pin: report the limit cleanly ─────────────────
-- Unchanged from the deployed version except for the new check_violation arm
-- in the exception block. Without it the trigger's error surfaces to the
-- parent as a raw Postgres message.
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

  -- Letters, digits, dot and underscore; must start with a letter; 3-20 chars.
  -- Matches _USERNAME_RE in engine/auth.js - change both together.
  --
  -- The old rule was only "not blank", so a space or a symbol got through and
  -- produced an account whose username the child could not reliably retype.
  -- Checked AFTER lower(btrim(...)) for the same reason the insert does it:
  -- trailing whitespace is invisible in the field it was typed into.
  IF p_username IS NULL
     OR lower(btrim(p_username)) !~ '^[a-z][a-z0-9._]{2,19}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_username');
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
      crypt(p_pin, gen_salt('bf')),          -- ← hashed DURING insert
      coalesce(p_settings, '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb)
    )
    RETURNING id INTO v_id;
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
    WHEN check_violation THEN
      -- Raised by the students_max_children trigger. SQLERRM is
      -- 'plan_child_limit:<n>' — split the cap out so the client can say it.
      IF SQLERRM LIKE 'plan_child_limit:%' THEN
        RETURN jsonb_build_object(
          'ok', false, 'error', 'plan_child_limit',
          'limit', nullif(split_part(SQLERRM, ':', 2), '')::integer);
      END IF;
      RAISE;
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


-- ── 4b · Plan features, resolved from a student or a parent ───────────────
-- One round trip for the Netlify functions, which otherwise need three
-- (student → family → parent → subscription → plan).
--
-- Returns NULL when enforcement is OFF. NULL means "no restrictions" to every
-- caller, so a function that forgets to special-case the switch still behaves
-- correctly rather than locking everyone out of a paid feature.
CREATE OR REPLACE FUNCTION public.plan_features_for_student(p_student uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_parent uuid;
  v_plan   public.plans;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NULL; END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
   WHERE s.id = p_student AND s.deleted_at IS NULL;

  IF v_parent IS NULL THEN RETURN NULL; END IF;

  SELECT p.* INTO v_plan FROM public.plan_for_user(v_parent) p;
  RETURN coalesce(v_plan.features, '{}'::jsonb);
END;
$function$;

CREATE OR REPLACE FUNCTION public.plan_features_for_user(p_uid uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_plan public.plans;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NULL; END IF;
  SELECT p.* INTO v_plan FROM public.plan_for_user(p_uid) p;
  RETURN coalesce(v_plan.features, '{}'::jsonb);
END;
$function$;


-- ── 4c · Promotional "was" prices ─────────────────────────────────────────
-- Rendered as a struck-out original beside the live price, with a "Save N%"
-- badge (see _planPromo / _planSaveLabel in engine/app.js).
--
-- Lives in features, NOT a new column: listPlans() selects an explicit column
-- list, so a column a not-yet-migrated database lacks would fail that query
-- with 42703 and blank the whole plans modal. An absent key simply means "no
-- promotion", which is the correct default.
--
-- Only written where it is not already set, so re-running this file never
-- overwrites a price an admin has since changed in the Plans tab. Only applied
-- when the promo price is genuinely higher than the live one - the renderer
-- refuses to strike anything else, and seeding a value it would ignore just
-- leaves confusing data behind.
UPDATE public.plans
   SET features = coalesce(features, '{}'::jsonb) || jsonb_build_object('price_was_mur', 350)
 WHERE id = 'starter'
   AND price_mur < 350
   AND coalesce(features, '{}'::jsonb) -> 'price_was_mur' IS NULL;

UPDATE public.plans
   SET features = coalesce(features, '{}'::jsonb) || jsonb_build_object('price_was_mur', 500)
 WHERE id = 'premium'
   AND price_mur < 500
   AND coalesce(features, '{}'::jsonb) -> 'price_was_mur' IS NULL;


-- ── 4d · Teacher plan ─────────────────────────────────────────────────────
-- Created as a DRAFT (is_active = false) on purpose: listPlans() filters on
-- is_active, so nothing shows it to anyone until it is switched to Live in
-- Admin → Plans. A half-priced, half-configured tier appearing on the public
-- pricing page the moment this file runs would be worse than no tier at all.
--
-- price_mur is 0 as a PLACEHOLDER, not a decision - set the real price in the
-- Plans tab (or here) before going Live, or a professional tier reads as free.
--
-- ON CONFLICT DO NOTHING, so re-running this file never overwrites the price,
-- name, caps or chapter list once they have been tuned in the admin panel.
INSERT INTO public.plans (id, name, price_mur, max_children, is_active, features)
VALUES (
  'teacher',
  'Teacher',
  0,
  5,
  false,
  jsonb_build_object(
    -- null = unlimited for every cap; a teacher tier should not be rationed.
    'allowed_chapters',    null,
    'daily_question_cap',  null,
    'weekly_exam_cap',     null,
    'hints_per_question',  null,
    -- The point of the tier: it is the one that may apply for tutor access.
    'tutor_status',        true,
    'printable_papers',    true,
    'advanced_analytics',  true,
    'timetable_generator', true,
    'push_reminders',      true,
    'weekly_digest_enabled', true,
    'past_papers',         true,
    'question_search',     true,
    'community_forum',     true,
    'study_calendar',      true,
    'weak_area_drill',     true
  )
)
ON CONFLICT (id) DO NOTHING;


-- ── 4e · Ambiguous family names ───────────────────────────────────────────
-- "Two families share this name, so we cannot tell which account this is."
--
-- That message is a GUARD, not a feature: families.family_name is one of the
-- three things a child types to log in, but only id, parent_id and family_code
-- are unique. When two families share a name the guard is the only thing
-- stopping a child being logged into a stranger's account - so it must stay.
-- What follows removes the situation that triggers it.
--
-- TWO layers, because they solve different halves:
--
--   Layer 1 unblocks anyone stuck RIGHT NOW, with no data cleanup: the family
--   box also accepts the 6-character FAMILY CODE, which is already UNIQUE and
--   therefore never ambiguous. The parent reads it off Settings → Family Login.
--
--   Layer 2 stops new collisions being created, by making family_name unique
--   case-insensitively - which is what the client has always assumed (see
--   Store.createFamily, which maps 23505 to "that name is already in use").


-- Layer 1 ── verify_student_pin: try the family CODE before the family NAME.
-- Identical to the deployed version except for the lookup block at the top.
CREATE OR REPLACE FUNCTION public.verify_student_pin(
  p_username    text,
  p_pin         text,
  p_family_name text DEFAULT NULL
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $function$
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
    -- (a) FAMILY CODE first. families_family_code_key makes it unique, so this
    -- can never be ambiguous. Tried before the name so that a family which has
    -- literally named itself after another family's code still cannot hijack
    -- the lookup. Costs nothing when the child typed a name: no row matches.
    SELECT s.* INTO v_student
    FROM   public.students s
    JOIN   public.families f ON f.id = s.family_id
    WHERE  lower(s.username)        = lower(p_username)
      AND  f.family_code            = upper(trim(p_family_name))
      AND  s.deleted_at IS NULL;

    -- (b) FAMILY NAME, with the ambiguity guard intact.
    IF NOT FOUND THEN
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
    END IF;
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
$function$;


-- Layer 2 ── stop new duplicates. Guarded, because the index CANNOT be created
-- while duplicates already exist and this file must not abort half-applied.
-- If it reports duplicates, resolve them with the queries at the bottom and
-- re-run this file; everything else here will already have been applied.
DO $dup$
DECLARE
  v_dupes int;
BEGIN
  SELECT count(*) INTO v_dupes FROM (
    SELECT lower(trim(family_name)) FROM public.families
     GROUP BY 1 HAVING count(*) > 1
  ) d;

  IF v_dupes > 0 THEN
    RAISE WARNING
      'families_name_unique_ci NOT created: % duplicated family name(s) already exist. '
      'Affected children can log in with their 6-character FAMILY CODE meanwhile. '
      'See the diagnostic queries at the end of this file.', v_dupes;
  ELSE
    CREATE UNIQUE INDEX IF NOT EXISTS families_name_unique_ci
      ON public.families (lower(trim(family_name)));
    RAISE NOTICE 'families_name_unique_ci created - duplicate family names are now rejected.';
  END IF;
END
$dup$;


-- ── 5 · Grants ────────────────────────────────────────────────────────────
-- plan_for_user is readable by anon as well: a student token is anon, and a
-- future server check on a student's own plan would need it. It exposes only
-- plan rows, which plans_read already makes world-readable (USING (true)).
GRANT EXECUTE ON FUNCTION public.plan_for_user(uuid)   TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.plan_enforcement_on() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.plan_features_for_student(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.plan_features_for_user(uuid)    TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_student_with_pin(uuid, text, text, text, integer, text, jsonb) TO authenticated;


-- ── 6 · Verify ────────────────────────────────────────────────────────────
-- Run these after the file. Nothing here changes data.
--
--   SELECT public.plan_enforcement_on();            -- expect false until you switch it on
--   SELECT id, name, max_children FROM public.plans ORDER BY price_mur;
--   SELECT tgname FROM pg_trigger WHERE tgrelid = 'public.students'::regclass
--                                   AND NOT tgisinternal;
--
--   -- Did the unique index get created?
--   SELECT indexname FROM pg_indexes
--    WHERE tablename = 'families' AND indexname = 'families_name_unique_ci';


-- ── 7 · Resolving duplicate family names ──────────────────────────────────
-- Run these BY HAND if Layer 2 above reported duplicates. Not executable here:
-- which family keeps the name is a judgement about real people's accounts, and
-- renaming the wrong one locks that family's children out until the parent is
-- told the new name.
--
--   -- 1. WHICH names are duplicated, and who owns them:
--   SELECT lower(trim(f.family_name)) AS name, f.id, f.family_code,
--          f.created_at, u.email,
--          (SELECT count(*) FROM public.students s
--            WHERE s.family_id = f.id AND s.deleted_at IS NULL) AS children
--     FROM public.families f
--     JOIN auth.users u ON u.id = f.parent_id
--    WHERE lower(trim(f.family_name)) IN (
--            SELECT lower(trim(family_name)) FROM public.families
--             GROUP BY 1 HAVING count(*) > 1)
--    ORDER BY name, f.created_at;
--
--   -- 2. Which CHILDREN are actually affected (same username AND same family
--   --    name is what makes a login ambiguous - a duplicate name alone does
--   --    not, if the usernames differ):
--   SELECT lower(trim(f.family_name)) AS family, lower(s.username) AS username,
--          count(*) AS clashing_children
--     FROM public.students s
--     JOIN public.families f ON f.id = s.family_id
--    WHERE s.deleted_at IS NULL
--    GROUP BY 1, 2 HAVING count(*) > 1;
--
--   -- 3. Rename the LATER family (keep the older one's name), then tell that
--   --    parent. Their children log in with the new name from then on:
--   -- UPDATE public.families SET family_name = 'New name here'
--   --  WHERE id = '<the family id from query 1>';


-- ── 8 · One-off: carry weekly_digest → weekly_digest_enabled ──────────────
-- The plan-level key was renamed to stop it colliding with the PARENT's own
-- preferences.weekly_digest opt-out. Deployed rows still carry the old name,
-- and the admin form treats an ABSENT key as "allowed" - so the first Save of
-- the free plan would have silently switched the weekly digest ON for it.
-- Carry the old value across explicitly instead of letting a save decide.
UPDATE public.plans
   SET features = (features - 'weekly_digest')
                  || jsonb_build_object('weekly_digest_enabled', features -> 'weekly_digest')
 WHERE features ? 'weekly_digest'
   AND NOT (features ? 'weekly_digest_enabled');

-- Retired keys: early_access gated nothing and was removed from the admin form;
-- features.max_children was a dead duplicate of the plans.max_children COLUMN,
-- which is the one the pricing page and the students_max_children trigger read.
UPDATE public.plans
   SET features = features - 'early_access' - 'max_children'
 WHERE features ?| array['early_access', 'max_children'];
