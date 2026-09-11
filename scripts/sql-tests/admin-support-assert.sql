-- Assertions for migrations/20260911_admin_support_panel.sql.
--
-- ⚠ Run as `authenticated`, never as the superuser: RLS, grants and the
--   guards are half of what is tested, and a superuser is subject to none.
-- ⚠ psql variables do not expand inside $$ bodies, so DO blocks carry literals.
--
-- Two questions:
--   1. Can anyone but a super admin grant or remove admin rights?
--   2. Can anyone but a super admin change a child's settings - or change
--      anything other than a parent control - through the new function?
-- Every SECURITY FINDING line is a yes.

\set ON_ERROR_STOP on

\set SUE  '''a0000000-0000-4000-8000-000000000001'''
\set PAT  '''a0000000-0000-4000-8000-000000000002'''
\set PAM  '''a0000000-0000-4000-8000-000000000003'''
\set OMAR '''a0000000-0000-4000-8000-000000000004'''
\set TIM  '''a0000000-0000-4000-8000-000000000005'''
\set KIM  '''b0000000-0000-4000-8000-000000000001'''
\set DEL  '''b0000000-0000-4000-8000-000000000002'''
\set OLA  '''b0000000-0000-4000-8000-000000000003'''

-- ══ 1. Grants ══════════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- admin support: grants'; END $$;
SELECT CASE WHEN has_function_privilege('anon', 'public.admin_patch_student_settings(uuid, jsonb, text)', 'EXECUTE')
       THEN 'SECURITY FINDING anon can call admin_patch_student_settings'
       ELSE 'PASS  anon cannot call admin_patch_student_settings' END;
SELECT CASE WHEN has_function_privilege('anon', 'public.admin_log_action(text, uuid, uuid, jsonb)', 'EXECUTE')
       THEN 'SECURITY FINDING anon can call admin_log_action'
       ELSE 'PASS  anon cannot call admin_log_action' END;
SELECT CASE WHEN has_function_privilege('authenticated', 'public.admin_patch_student_settings(uuid, jsonb, text)', 'EXECUTE')
       THEN 'PASS  a signed-in adult can reach the function (it decides who may act)'
       ELSE 'FAIL  authenticated cannot call admin_patch_student_settings' END;
SELECT CASE WHEN has_table_privilege('authenticated', 'public.admin_actions', 'INSERT')
             OR has_table_privilege('authenticated', 'public.admin_actions', 'UPDATE')
             OR has_table_privilege('authenticated', 'public.admin_actions', 'DELETE')
       THEN 'SECURITY FINDING authenticated can write admin_actions directly'
       ELSE 'PASS  nobody signed in can write admin_actions directly' END;
SELECT CASE WHEN has_table_privilege('anon', 'public.admin_actions', 'SELECT')
       THEN 'SECURITY FINDING anon can read admin_actions'
       ELSE 'PASS  anon cannot read admin_actions' END;

-- ══ 2. Admin rights are a super admin's to give ════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- admin support: admin rights'; END $$;
SET ROLE authenticated;
SET test.uid = :PAT;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'admin' WHERE id = 'a0000000-0000-4000-8000-000000000005';
  RAISE NOTICE 'SECURITY FINDING a plain admin made someone an admin';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'PASS  a plain admin cannot make someone an admin';
END $$;
DO $$ BEGIN
  UPDATE public.profiles SET is_super_admin = true WHERE id = auth.uid();
  RAISE NOTICE 'SECURITY FINDING a plain admin made themselves super admin';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'PASS  a plain admin cannot make themselves super admin';
END $$;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'parent' WHERE id = 'a0000000-0000-4000-8000-000000000001';
  RAISE NOTICE 'SECURITY FINDING a plain admin demoted the super admin';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'PASS  a plain admin cannot remove another admin';
END $$;
DO $$ BEGIN
  UPDATE public.profiles SET full_name = 'Pat Renamed', role = 'admin' WHERE id = auth.uid();
  RAISE NOTICE 'PASS  a whole-row save with an UNCHANGED role still works for a plain admin';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'FAIL  an unchanged-role save was refused: %', SQLERRM;
END $$;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'teacher' WHERE id = 'a0000000-0000-4000-8000-000000000005';
  RAISE NOTICE 'PASS  a plain admin can still move someone between parent and teacher';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'FAIL  parent -> teacher by a plain admin was refused: %', SQLERRM;
END $$;
SELECT CASE WHEN (public.admin_set_teacher_status(:TIM::uuid, 'suspended') ->> 'ok') = 'true'
       THEN 'PASS  admin_set_teacher_status still works for a plain admin'
       ELSE 'FAIL  admin_set_teacher_status broke' END;
RESET ROLE;
SELECT CASE WHEN (SELECT role FROM public.profiles WHERE id = :TIM) = 'parent'
            AND (SELECT is_super_admin FROM public.profiles WHERE id = :PAT) = false
            AND (SELECT role FROM public.profiles WHERE id = :SUE) = 'admin'
       THEN 'PASS  no admin rights moved while a plain admin was trying'
       ELSE 'SECURITY FINDING admin rights moved: '
            || (SELECT string_agg(full_name || '=' || role || '/' || is_super_admin, ', ') FROM public.profiles) END;

SET ROLE authenticated;
SET test.uid = :SUE;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'admin' WHERE id = 'a0000000-0000-4000-8000-000000000005';
  UPDATE public.profiles SET role = 'parent' WHERE id = 'a0000000-0000-4000-8000-000000000005';
  RAISE NOTICE 'PASS  a super admin can grant and remove admin rights';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'FAIL  the super admin was refused: %', SQLERRM;
END $$;

SET test.uid = :PAM;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'admin', full_name = 'Pam' WHERE id = auth.uid();
  RAISE NOTICE 'PASS  a parent writing role=admin on their own row is not an error (silently reverted, as before)';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'FAIL  a parent whole-row save now errors: %', SQLERRM;
END $$;
RESET ROLE;
SELECT CASE WHEN (SELECT role FROM public.profiles WHERE id = :PAM) = 'parent'
       THEN 'PASS  and the parent is still a parent'
       ELSE 'SECURITY FINDING a parent made themselves admin' END;

-- ══ 3. Who may change a child's settings ═══════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- admin support: who may patch settings'; END $$;
SET ROLE authenticated;
SET test.uid = :PAM;
SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '{"examDisabled": true}'::jsonb) ->> 'error' = 'not_authorised'
       THEN 'PASS  a parent cannot use the admin function, even on their own child'
       ELSE 'SECURITY FINDING a parent used admin_patch_student_settings' END;
SET test.uid = :PAT;
SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '{"examDisabled": true}'::jsonb) ->> 'error' = 'not_authorised'
       THEN 'PASS  a plain admin cannot change a family''s settings'
       ELSE 'SECURITY FINDING a plain admin changed a family''s settings' END;
RESET ROLE;
SELECT CASE WHEN (SELECT settings ->> 'examDisabled' FROM public.students WHERE id = :KIM) = 'false'
       THEN 'PASS  and nothing was written'
       ELSE 'SECURITY FINDING a refused caller''s patch was written' END;

-- ══ 4. What a super admin may change ═══════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- admin support: what may be patched'; END $$;
SET ROLE authenticated;
SET test.uid = :SUE;
WITH r AS (SELECT public.admin_patch_student_settings(:KIM::uuid,
             '{"examDisabled": true, "lockedChapters": ["g5m-fractions"]}'::jsonb, 'Mum asked by phone') AS j)
SELECT CASE WHEN j ->> 'ok' = 'true' AND j ->> 'changed' = 'true'
            AND j -> 'settings' ->> 'examDisabled' = 'true'
            AND j -> 'settings' -> 'lockedChapters' = '["g5m-fractions"]'::jsonb
            AND j -> 'settings' ->> 'maxDifficulty' = '4'
       THEN 'PASS  a super admin changes two keys and the rest survive'
       ELSE 'FAIL  patch: ' || j::text END FROM r;

SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '{"role": "admin"}'::jsonb) ->> 'error' = 'bad_key'
       THEN 'PASS  a key that is not a parent control is refused'
       ELSE 'SECURITY FINDING a non-control key was accepted' END;
SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '{"examDisabled": false, "pin": "1234"}'::jsonb) ->> 'error' = 'bad_key'
       THEN 'PASS  one bad key refuses the whole patch'
       ELSE 'SECURITY FINDING a patch with a bad key was partly applied' END;
SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '{"maxDifficulty": 9}'::jsonb) ->> 'error' = 'bad_value'
            AND public.admin_patch_student_settings(:KIM::uuid, '{"allowedGrades": [5, "x"]}'::jsonb) ->> 'error' = 'bad_value'
            AND public.admin_patch_student_settings(:KIM::uuid, '{"lockedChapters": "g5m-fractions"}'::jsonb) ->> 'error' = 'bad_value'
            AND public.admin_patch_student_settings(:KIM::uuid, '{"examDisabled": "yes"}'::jsonb) ->> 'error' = 'bad_value'
       THEN 'PASS  wrong types are refused (difficulty 9, a string grade, a bare string, "yes")'
       ELSE 'FAIL  a wrongly typed value was accepted' END;
SELECT CASE WHEN public.admin_patch_student_settings(:KIM::uuid, '[]'::jsonb) ->> 'error' = 'bad_patch'
            AND public.admin_patch_student_settings(:KIM::uuid, '{}'::jsonb) ->> 'error' = 'bad_patch'
       THEN 'PASS  an empty or non-object patch is refused'
       ELSE 'FAIL  an empty patch was accepted' END;
RESET ROLE;
SELECT CASE WHEN (SELECT settings FROM public.students WHERE id = :KIM)
               = '{"examDisabled": true, "maxDifficulty": 4, "lockedChapters": ["g5m-fractions"]}'::jsonb
       THEN 'PASS  refused patches wrote nothing'
       ELSE 'FAIL  settings now ' || (SELECT settings::text FROM public.students WHERE id = :KIM) END;

SET ROLE authenticated;
SET test.uid = :SUE;
SELECT public.admin_patch_student_settings(:KIM::uuid, '{"games": {"mode": "balanced"}}'::jsonb) IS NOT NULL AS set_games \gset
WITH r AS (SELECT public.admin_patch_student_settings(:KIM::uuid, '{"games": null}'::jsonb) AS j)
SELECT CASE WHEN j ->> 'ok' = 'true' AND NOT (j -> 'settings' ? 'games')
       THEN 'PASS  a JSON null removes the key'
       ELSE 'FAIL  null did not remove games: ' || j::text END FROM r;
WITH r AS (SELECT public.admin_patch_student_settings(:KIM::uuid, '{"examDisabled": true}'::jsonb) AS j)
SELECT CASE WHEN j ->> 'ok' = 'true' AND j ->> 'changed' = 'false'
       THEN 'PASS  a patch that changes nothing says so'
       ELSE 'FAIL  no-op patch: ' || j::text END FROM r;
SELECT CASE WHEN public.admin_patch_student_settings(:DEL::uuid, '{"examDisabled": true}'::jsonb) ->> 'error' = 'not_found'
       THEN 'PASS  a deleted child cannot be changed'
       ELSE 'FAIL  a deleted child was changed' END;
SELECT CASE WHEN public.admin_patch_student_settings('00000000-0000-4000-8000-000000000000'::uuid, '{"examDisabled": true}'::jsonb) ->> 'error' = 'not_found'
       THEN 'PASS  an unknown child is not_found'
       ELSE 'FAIL  unknown child' END;
RESET ROLE;
SELECT CASE WHEN (SELECT settings FROM public.students WHERE id = :OLA)
               = '{"examDisabled": false, "maxDifficulty": 4, "lockedChapters": []}'::jsonb
       THEN 'PASS  the other family''s child was never touched'
       ELSE 'FAIL  Ola changed' END;

-- ══ 5. The record ══════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- admin support: the record'; END $$;
SELECT CASE WHEN (SELECT count(*) FROM public.admin_actions WHERE target_student = :KIM AND action = 'student_settings') = 3
       THEN 'PASS  three real changes, three rows (no-ops and refusals leave none)'
       ELSE 'FAIL  expected 3 rows, got ' || (SELECT count(*) FROM public.admin_actions WHERE target_student = :KIM) END;
SELECT CASE WHEN admin_id = :SUE::uuid AND target_user = :PAM::uuid
            AND detail -> 'before' ->> 'examDisabled' = 'false'
            AND detail -> 'after'  ->> 'examDisabled' = 'true'
            AND detail -> 'before' -> 'lockedChapters' = '[]'::jsonb
            AND detail ->> 'reason' = 'Mum asked by phone'
       THEN 'PASS  the first row names the admin, the parent, before, after and the reason'
       ELSE 'FAIL  row: ' || row(admin_id, target_user, detail)::text END
  FROM public.admin_actions WHERE target_student = :KIM ORDER BY id LIMIT 1;

SET ROLE authenticated;
SET test.uid = :PAM;
SELECT CASE WHEN (SELECT count(*) FROM public.admin_actions) = 0
       THEN 'PASS  a parent reads no admin records'
       ELSE 'SECURITY FINDING a parent can read admin_actions' END;
DO $$ BEGIN
  INSERT INTO public.admin_actions (action) VALUES ('forged');
  RAISE NOTICE 'SECURITY FINDING a parent wrote an admin record';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'PASS  a parent cannot write an admin record';
END $$;
SELECT CASE WHEN public.admin_log_action('force_logout', NULL, :KIM::uuid) ->> 'error' = 'not_authorised'
       THEN 'PASS  a parent cannot log an admin action'
       ELSE 'SECURITY FINDING a parent logged an admin action' END;
SET test.uid = :PAT;
SELECT CASE WHEN (SELECT count(*) FROM public.admin_actions) >= 3
       THEN 'PASS  an admin reads the record'
       ELSE 'FAIL  an admin cannot read admin_actions' END;
SELECT CASE WHEN public.admin_log_action('force_logout', :PAM::uuid, :KIM::uuid, '{"why": "test"}'::jsonb) ->> 'ok' = 'true'
            AND public.admin_log_action('Drop Table', NULL, NULL) ->> 'error' = 'bad_action'
            AND public.admin_log_action('force_logout', NULL, NULL, '[1]'::jsonb) ->> 'error' = 'bad_detail'
       THEN 'PASS  an admin can log an action; a malformed name or detail is refused'
       ELSE 'FAIL  admin_log_action' END;
RESET ROLE;
SELECT CASE WHEN (SELECT admin_id FROM public.admin_actions WHERE action = 'force_logout') = :PAT::uuid
       THEN 'PASS  the logged action is attributed to the admin who sent it'
       ELSE 'FAIL  force_logout attribution' END;
