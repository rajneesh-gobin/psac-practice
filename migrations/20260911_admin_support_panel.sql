-- ═══════════════════════════════════════════════════════════════════════════
--  Admin › Members: fix a family's settings without signing in as them
--
--  Three changes, all additive for every non-admin user:
--
--  1. guard_profiles_privileged(): only a SUPER admin may grant or remove admin
--     rights, or touch is_super_admin. Before this, is_admin() passed the guard
--     outright, and `authenticated` holds table-level UPDATE on profiles, so any
--     admin could make anyone an admin - or make themselves super admin - with
--     one PostgREST call. The Members-tab role <select> was not super-admin
--     gated either (admin.js changeRole).
--     ⚠ Scoped to the ADMIN boundary on purpose. admin_set_teacher_status()
--       moves role between 'parent' and 'teacher' as a plain admin and must keep
--       working; request_teacher_access() uses psac.priv_write and is untouched.
--     ⚠ RAISES rather than silently reverting, for admins only. A silent revert
--       is right for a parent (whole-row saves must not error on an unchanged
--       column) but would show an admin "Role updated" over a refusal.
--     ⚠ Measured before writing: both production admins are super admins, so
--       this removes a power nobody legitimately uses today.
--
--  2. admin_actions: who changed what, for whom. Written ONLY by the two
--     SECURITY DEFINER functions below - authenticated has SELECT (admin-only by
--     policy) and no INSERT/UPDATE/DELETE grant, the same pattern as
--     credit_ledger. No foreign keys, like security_events: the record must
--     outlive the account it is about.
--
--  3. admin_patch_student_settings(student, patch, reason): a super admin
--     changes a child's parent controls KEY BY KEY. The parent's own screen
--     writes the whole settings object, so writing the whole object from the
--     admin side would silently undo whatever the parent changed meanwhile.
--     Only the nine parent-control keys are accepted, each type-checked; a JSON
--     null removes a key. admin_log_action() records the admin actions that do
--     not go through here (force logout, child PIN reset).
--
--  ⚠ Never applied from supabase-schema.sql: it overwrites function bodies.
--    Before applying to production, diff the LIVE guard_profiles_privileged()
--    body (pg_get_functiondef) against section 1's starting point below.
--  Safe to rerun. Tested by scripts/sql-tests/run-admin-support-tests.sh.
--
--  Rollback of section 1 only: re-create guard_profiles_privileged() with its
--  first statement back to
--      IF public.is_admin() OR public.priv_write_allowed() THEN RETURN NEW; END IF;
--  Sections 2 and 3 add objects nothing else depends on.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. Admin rights are a super admin's to give ─────────────────────────────
CREATE OR REPLACE FUNCTION public.guard_profiles_privileged()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE v_tampered text[] := '{}';
BEGIN
  IF public.priv_write_allowed() THEN
    RETURN NEW;
  END IF;

  IF public.is_admin() THEN
    -- coalesce: a NULL role must compare as "not admin", not as unknown.
    IF (NEW.is_super_admin IS DISTINCT FROM OLD.is_super_admin
        OR (coalesce(NEW.role, '') = 'admin') <> (coalesce(OLD.role, '') = 'admin'))
       AND NOT public.is_super_admin() THEN
      RAISE EXCEPTION 'only_super_admin: only a super admin can grant or remove admin rights'
        USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  -- ⚠ Record WHAT was attempted before reverting it. Comparing NEW to OLD after
  -- the assignments below can only ever be false, which would make the security
  -- log permanently empty.
  IF NEW.role           IS DISTINCT FROM OLD.role           THEN v_tampered := array_append(v_tampered, 'role'); END IF;
  IF NEW.is_super_admin IS DISTINCT FROM OLD.is_super_admin THEN v_tampered := array_append(v_tampered, 'is_super_admin'); END IF;
  IF NEW.credits        IS DISTINCT FROM OLD.credits        THEN v_tampered := array_append(v_tampered, 'credits'); END IF;
  IF NEW.expires_at     IS DISTINCT FROM OLD.expires_at     THEN v_tampered := array_append(v_tampered, 'expires_at'); END IF;
  IF NEW.disabled       IS DISTINCT FROM OLD.disabled       THEN v_tampered := array_append(v_tampered, 'disabled'); END IF;
  IF NEW.blocked_until  IS DISTINCT FROM OLD.blocked_until  THEN v_tampered := array_append(v_tampered, 'blocked_until'); END IF;
  IF NEW.referral_code  IS DISTINCT FROM OLD.referral_code  THEN v_tampered := array_append(v_tampered, 'referral_code'); END IF;

  -- Silently reverted rather than raised: the app updates whole rows in places,
  -- and erroring on an UNCHANGED privileged column would break ordinary saves.
  NEW.role           := OLD.role;
  NEW.is_super_admin := OLD.is_super_admin;
  NEW.disabled       := OLD.disabled;
  NEW.expires_at     := OLD.expires_at;
  NEW.referral_code  := OLD.referral_code;
  NEW.credits        := OLD.credits;
  NEW.blocked_until  := OLD.blocked_until;

  -- ⚠ teacher_status / teacher_tier / teacher_decided_* are deliberately NOT in
  -- that list. request_teacher_access() is SECURITY DEFINER but runs for a
  -- non-admin applicant, so guarding those columns would silently break every
  -- teacher application. They are also inert on their own: is_approved_teacher()
  -- requires role='teacher' AND teacher_status='approved', and `role` is
  -- guarded above — so setting the status by hand grants nothing.
  -- deleted_at is likewise left alone: delete_my_account() and
  -- restore_my_account() are the owner's own to use.

  IF array_length(v_tampered, 1) > 0 THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (OLD.id, 'privileged_update_blocked',
            jsonb_build_object('table', 'profiles', 'columns', to_jsonb(v_tampered)));
  END IF;

  RETURN NEW;
END;
$function$;

-- ── 2. The record of what admins changed ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_actions (
  id             bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  admin_id       uuid,
  target_user    uuid,
  target_student uuid,
  action         text NOT NULL,
  detail         jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS admin_actions_student_idx ON public.admin_actions (target_student, created_at DESC);
CREATE INDEX IF NOT EXISTS admin_actions_user_idx    ON public.admin_actions (target_user, created_at DESC);

ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_actions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.admin_actions TO authenticated;
GRANT ALL    ON public.admin_actions TO service_role;

DROP POLICY IF EXISTS admin_actions_select ON public.admin_actions;
CREATE POLICY admin_actions_select ON public.admin_actions
  FOR SELECT TO authenticated
  USING (public.is_admin());

-- ── 3a. Change a child's parent controls, key by key ────────────────────────
CREATE OR REPLACE FUNCTION public.admin_patch_student_settings(
  p_student uuid, p_patch jsonb, p_reason text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_row     public.students%ROWTYPE;
  v_parent  uuid;
  v_before  jsonb;
  v_after   jsonb;
  v_prev    jsonb := '{}'::jsonb;
  v_changed jsonb := '{}'::jsonb;
  k text;
  v jsonb;
BEGIN
  IF NOT (public.is_admin() AND public.is_super_admin()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_patch IS NULL OR jsonb_typeof(p_patch) <> 'object' OR p_patch = '{}'::jsonb THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_patch');
  END IF;

  -- Only parent controls, each with the type the app reads. Anything else -
  -- a typo, or an attempt to smuggle a key the app might one day trust - is
  -- refused whole, before anything is written.
  FOR k, v IN SELECT * FROM jsonb_each(p_patch) LOOP
    IF k IN ('examDisabled', 'hintsDisabled', 'minigamesDisabled', 'crossGradeSearch', 'crossGradePractice') THEN
      IF jsonb_typeof(v) NOT IN ('boolean', 'null') THEN
        RETURN jsonb_build_object('ok', false, 'error', 'bad_value', 'key', k);
      END IF;
    ELSIF k = 'maxDifficulty' THEN
      IF jsonb_typeof(v) <> 'number' OR (v #>> '{}')::numeric NOT IN (1, 2, 3, 4) THEN
        RETURN jsonb_build_object('ok', false, 'error', 'bad_value', 'key', k);
      END IF;
    ELSIF k = 'lockedChapters' THEN
      IF jsonb_typeof(v) <> 'array' OR jsonb_array_length(v) > 1000
         OR EXISTS (SELECT 1 FROM jsonb_array_elements(v) e
                     WHERE jsonb_typeof(e) <> 'string' OR length(e #>> '{}') NOT BETWEEN 1 AND 100) THEN
        RETURN jsonb_build_object('ok', false, 'error', 'bad_value', 'key', k);
      END IF;
    ELSIF k = 'allowedGrades' THEN
      IF jsonb_typeof(v) <> 'array' OR jsonb_array_length(v) > 9
         OR EXISTS (SELECT 1 FROM jsonb_array_elements(v) e
                     WHERE jsonb_typeof(e) <> 'number' OR (e #>> '{}')::numeric NOT IN (1, 2, 3, 4, 5, 6, 7, 8, 9)) THEN
        RETURN jsonb_build_object('ok', false, 'error', 'bad_value', 'key', k);
      END IF;
    ELSIF k = 'games' THEN
      IF jsonb_typeof(v) NOT IN ('object', 'null') OR length(v::text) > 4000 THEN
        RETURN jsonb_build_object('ok', false, 'error', 'bad_value', 'key', k);
      END IF;
    ELSE
      RETURN jsonb_build_object('ok', false, 'error', 'bad_key', 'key', k);
    END IF;
  END LOOP;

  SELECT * INTO v_row FROM public.students
   WHERE id = p_student AND deleted_at IS NULL
   FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;
  SELECT f.parent_id INTO v_parent FROM public.families f WHERE f.id = v_row.family_id;

  v_before := coalesce(v_row.settings, '{}'::jsonb);
  v_after  := v_before;
  FOR k, v IN SELECT * FROM jsonb_each(p_patch) LOOP
    IF jsonb_typeof(v) = 'null' THEN
      IF v_before ? k THEN
        v_after   := v_after - k;
        v_prev    := v_prev    || jsonb_build_object(k, v_before -> k);
        v_changed := v_changed || jsonb_build_object(k, v);
      END IF;
    ELSIF (v_before -> k) IS DISTINCT FROM v THEN
      v_after   := v_after     || jsonb_build_object(k, v);
      v_prev    := v_prev      || jsonb_build_object(k, v_before -> k);
      v_changed := v_changed   || jsonb_build_object(k, v);
    END IF;
  END LOOP;

  IF v_changed = '{}'::jsonb THEN
    RETURN jsonb_build_object('ok', true, 'changed', false, 'settings', v_before);
  END IF;

  UPDATE public.students SET settings = v_after WHERE id = p_student;

  INSERT INTO public.admin_actions (admin_id, target_user, target_student, action, detail)
  VALUES (auth.uid(), v_parent, p_student, 'student_settings',
          jsonb_build_object('before', v_prev, 'after', v_changed,
                             'reason', nullif(left(btrim(coalesce(p_reason, '')), 300), '')));

  RETURN jsonb_build_object('ok', true, 'changed', true, 'settings', v_after);
END;
$function$;

-- ── 3b. Record an admin action that happened elsewhere ──────────────────────
-- ⚠ Called from the admin's own browser after the fact, so it is an admin's
--   note, not evidence - the same standing as a `client:` security event. The
--   settings changes that matter are recorded by 3a itself, server-side.
CREATE OR REPLACE FUNCTION public.admin_log_action(
  p_action text, p_target_user uuid DEFAULT NULL, p_target_student uuid DEFAULT NULL,
  p_detail jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_action IS NULL OR p_action !~ '^[a-z][a-z_]{2,39}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_action');
  END IF;
  IF p_detail IS NOT NULL AND (jsonb_typeof(p_detail) <> 'object' OR length(p_detail::text) > 4000) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_detail');
  END IF;
  INSERT INTO public.admin_actions (admin_id, target_user, target_student, action, detail)
  VALUES (auth.uid(), p_target_user, p_target_student, p_action, coalesce(p_detail, '{}'::jsonb));
  RETURN jsonb_build_object('ok', true);
END;
$function$;

-- ⚠ A new function inherits Supabase's default EXECUTE for anon; REVOKE FROM
--   PUBLIC alone does not remove that. Name anon explicitly (database.md rule 4).
REVOKE ALL ON FUNCTION public.admin_patch_student_settings(uuid, jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_log_action(text, uuid, uuid, jsonb)       FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_patch_student_settings(uuid, jsonb, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_log_action(text, uuid, uuid, jsonb)       TO authenticated, service_role;

COMMIT;
