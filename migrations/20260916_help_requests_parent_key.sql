-- Add helpRequestsDisabled to the parent-control keys the admin support panel
-- may patch (Ask-a-friend, 2026-09-16). Same boolean rule as minigamesDisabled,
-- beside which it sits in the Controls card.
--
-- The body below was taken from pg_get_functiondef() on PRODUCTION and edited in
-- one place, rather than retyped from the original migration: the deployed body
-- is what had to change, and the two had already diverged once in this project.

CREATE OR REPLACE FUNCTION public.admin_patch_student_settings(p_student uuid, p_patch jsonb, p_reason text DEFAULT NULL::text)
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
    IF k IN ('examDisabled', 'hintsDisabled', 'minigamesDisabled', 'helpRequestsDisabled', 'crossGradeSearch', 'crossGradePractice') THEN
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
$function$

