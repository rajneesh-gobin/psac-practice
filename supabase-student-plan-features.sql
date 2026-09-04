-- Lets a CHILD session find out which plan applies to it.
--
-- The bug (measured 2026-09-04 by signing in as a real child): auth.js read
-- `families.parent_id` to reach the plan, but `families_own` is
--   parent_id = auth.uid() OR is_family_member(id) OR is_admin()
-- and all three arms need auth.uid(). A child is **anon + a token header**, so
-- the read returned nothing, `_planFeaturesState` went to 'failed', and every
-- child login logged "plan limits are NOT being applied this session". It had
-- never once succeeded.
--
-- ⚠ THE OBVIOUS FIX IS THE WRONG ONE. Adding a child arm to `families_own`
-- would let a child SELECT the whole family row - including `family_code`,
-- which is the PRIVATE JOIN SECRET (deliberately not the public
-- `referral_code`). A child's device is the least trusted one in the family.
-- So the table policy is left exactly as it is and the child gets a function
-- that returns the plan and nothing else: no family_code, no parent_id, no
-- credits, no family name.
--
-- ⚠ It also avoids the trap in CLAUDE.md rule 2 entirely: widening a USING
-- clause with a predicate that has to look the row up is what broke family
-- creation for two days, because USING is checked on INSERT ... RETURNING too.
-- Touching no policy cannot reintroduce that.
--
-- Run once in the Supabase SQL editor. Idempotent.
BEGIN;

DO $$ BEGIN
  IF to_regprocedure('public.current_student_id()') IS NULL
     OR to_regclass('public.plans') IS NULL
     OR to_regclass('public.subscriptions') IS NULL THEN
    RAISE EXCEPTION 'current_student_id(), plans and subscriptions are all required';
  END IF;
END $$;

-- p_student is optional. A child may omit it (their token answers the question);
-- a parent PREVIEWING a child passes it, because that path has no student token
-- at all and authorises through the parent's JWT instead.
CREATE OR REPLACE FUNCTION public.student_plan_features(p_student uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE v_student uuid; v_parent uuid; v_plan text; v_features jsonb;
BEGIN
  v_student := coalesce(p_student, public.current_student_id());
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_student');
  END IF;

  -- Asking about a child that is not the token holder requires an adult who
  -- actually belongs to that family. A child probing a sibling's id has no
  -- auth.uid(), so every arm below is false for them.
  IF public.current_student_id() IS DISTINCT FROM v_student THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.students s
        JOIN public.families f ON f.id = s.family_id
       WHERE s.id = v_student
         AND (f.parent_id = auth.uid() OR public.is_family_member(f.id) OR public.is_admin())
    ) THEN
      RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
    END IF;
  END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.students s JOIN public.families f ON f.id = s.family_id
   WHERE s.id = v_student;
  IF v_parent IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_family');
  END IF;

  SELECT sub.plan_id, p.features INTO v_plan, v_features
    FROM public.subscriptions sub
    JOIN public.plans p ON p.id = sub.plan_id
   WHERE sub.user_id = v_parent AND sub.status = 'active'
   ORDER BY sub.started_at DESC
   LIMIT 1;

  -- No active subscription is a real answer, not a failure: it means free. The
  -- client must be able to tell that apart from "could not find out", because
  -- only the first one may switch capping on.
  IF v_plan IS NULL THEN
    SELECT p.id, p.features INTO v_plan, v_features FROM public.plans p WHERE p.id = 'free';
  END IF;

  RETURN jsonb_build_object('ok', true,
    'plan_id',  coalesce(v_plan, 'free'),
    'features', coalesce(v_features, '{}'::jsonb));
END $$;

-- ⚠ anon AND authenticated. A child session is anon plus a token header - an
-- authenticated-only grant is exactly how the friend RPCs ended up dead.
REVOKE ALL ON FUNCTION public.student_plan_features(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.student_plan_features(uuid) TO anon, authenticated, service_role;

COMMIT;
