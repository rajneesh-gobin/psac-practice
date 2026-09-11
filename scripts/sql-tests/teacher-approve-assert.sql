-- Assertions for migrations/20260911_teacher_auto_approve.sql.
--
-- ⚠ These run as `authenticated`, never as the superuser. RLS, the grants and
--   the role guard are half of what is being tested, and a superuser is
--   subject to none of them.
--
-- The question this file answers: "can anyone become a teacher without either
-- an admin approving them, or the admin's switch being on AND their own email
-- being verified?" Every SECURITY FINDING line is one way that could happen.

\set ON_ERROR_STOP on

\set TARA  '''11111111-1111-1111-1111-111111111111'''
\set UMA   '''22222222-2222-2222-2222-222222222222'''
\set REX   '''33333333-3333-3333-3333-333333333333'''
\set NIA   '''44444444-4444-4444-4444-444444444444'''
\set SAM   '''55555555-5555-5555-5555-555555555555'''
\set OTTO  '''66666666-6666-6666-6666-666666666666'''
\set GIL   '''77777777-7777-7777-7777-777777777777'''
\set MAL   '''88888888-8888-8888-8888-888888888888'''
\set ADMIN '''99999999-9999-9999-9999-999999999999'''

-- ══ 1. Grants did not move ═════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: grants'; END $$;
SELECT CASE WHEN has_function_privilege('authenticated', 'public.request_teacher_access(text)', 'EXECUTE')
       THEN 'PASS  a signed-in adult can still apply'
       ELSE 'FAIL  request_teacher_access lost its grant' END;

-- ══ 2. Switch OFF: nothing changes ═════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: switch off'; END $$;
SET ROLE authenticated;
SET test.uid = :OTTO;
WITH r AS (SELECT public.request_teacher_access('switch is off') AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switch off: a verified applicant waits for an admin'
       ELSE 'SECURITY FINDING switch off still granted: ' || j::text END FROM r;
RESET ROLE;
SELECT CASE WHEN (SELECT role FROM public.profiles WHERE id = :OTTO) = 'parent'
       THEN 'PASS  switch off: role stays parent'
       ELSE 'SECURITY FINDING switch off: role changed' END;

-- ══ 3. Only an admin can turn it on ════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: who may flip the switch'; END $$;
SET ROLE authenticated;
SET test.uid = :MAL;
DO $$ BEGIN
  UPDATE public.mm_data SET value = value || '{"teacher_auto_approve": true}'::jsonb
   WHERE key = 'global_settings';
EXCEPTION WHEN insufficient_privilege THEN NULL; END $$;
DO $$ BEGIN
  INSERT INTO public.mm_data (key, value) VALUES ('global_settings', '{"teacher_auto_approve": true}'::jsonb)
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
EXCEPTION WHEN insufficient_privilege OR check_violation THEN NULL; END $$;
RESET ROLE;
SELECT CASE WHEN coalesce((SELECT value -> 'teacher_auto_approve' = 'true'::jsonb
                             FROM public.mm_data WHERE key = 'global_settings'), false)
       THEN 'SECURITY FINDING a non-admin switched auto-approval on'
       ELSE 'PASS  a non-admin cannot switch auto-approval on' END;

-- The switch is useless to an attacker only because role is guarded. Prove it.
SET ROLE authenticated;
SET test.uid = :MAL;
DO $$ BEGIN
  UPDATE public.profiles SET role = 'teacher', teacher_status = 'approved' WHERE id = auth.uid();
EXCEPTION WHEN insufficient_privilege THEN NULL; END $$;
SELECT CASE WHEN public.is_approved_teacher()
       THEN 'SECURITY FINDING a parent approved themselves by writing their own row'
       ELSE 'PASS  writing your own profile row grants nothing' END;
RESET ROLE;
UPDATE public.profiles SET teacher_status = 'none' WHERE id = :MAL;

SET ROLE authenticated;
SET test.uid = :ADMIN;
UPDATE public.mm_data SET value = value || '{"teacher_auto_approve": true}'::jsonb
 WHERE key = 'global_settings';
RESET ROLE;
SELECT CASE WHEN (SELECT value -> 'teacher_auto_approve' FROM public.mm_data WHERE key = 'global_settings') = 'true'::jsonb
       THEN 'PASS  an admin can switch auto-approval on'
       ELSE 'FAIL  the admin could not switch auto-approval on' END;

-- ══ 4. Switch ON ═══════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: switch on'; END $$;
SET ROLE authenticated;
SET test.uid = :TARA;
WITH r AS (SELECT public.request_teacher_access('Signed up via the teacher tab.') AS j)
SELECT CASE WHEN j ->> 'status' = 'approved' AND j ->> 'note' = 'auto_approved'
       THEN 'PASS  switch on: a verified, undecided applicant is approved'
       ELSE 'FAIL  switch on did not approve Tara: ' || j::text END FROM r;
SELECT CASE WHEN public.is_approved_teacher()
       THEN 'PASS  is_approved_teacher() agrees'
       ELSE 'FAIL  approved but is_approved_teacher() says no' END;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'note' = 'already_a_teacher'
       THEN 'PASS  re-applying after approval is a no-op'
       ELSE 'FAIL  re-applying: ' || j::text END FROM r;
RESET ROLE;
SELECT CASE WHEN (SELECT row(role, teacher_status, teacher_tier, teacher_decided_by IS NULL, teacher_decided_at IS NOT NULL)::text
                    FROM public.profiles WHERE id = :TARA) = '(teacher,approved,unverified,t,t)'
       THEN 'PASS  auto-approval: role teacher, UNVERIFIED tier, decided by nobody'
       ELSE 'FAIL  auto-approval wrote ' || (SELECT row(role, teacher_status, teacher_tier, teacher_decided_by, teacher_decided_at)::text
                                              FROM public.profiles WHERE id = :TARA) END;

SET ROLE authenticated;
SET test.uid = :UMA;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switch on: an UNVERIFIED email still waits'
       ELSE 'SECURITY FINDING an unverified email was approved: ' || j::text END FROM r;

SET test.uid = :REX;
WITH r AS (SELECT public.request_teacher_access('please reconsider') AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switch on: someone an admin REJECTED goes back to the queue'
       ELSE 'SECURITY FINDING the switch overturned a rejection: ' || j::text END FROM r;

SET test.uid = :NIA;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switch on: someone an admin set back to none goes to the queue'
       ELSE 'SECURITY FINDING the switch overturned an admin revoke: ' || j::text END FROM r;

SET test.uid = :SAM;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'error' = 'suspended'
       THEN 'PASS  switch on: a suspended teacher is still refused'
       ELSE 'SECURITY FINDING the switch lifted a suspension: ' || j::text END FROM r;

SET test.uid = :OTTO;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switch on: an application filed while OFF stays for the admin'
       ELSE 'FAIL  a queued application was approved by the switch: ' || j::text END FROM r;
RESET ROLE;

SELECT CASE WHEN (SELECT count(*) FROM public.profiles
                   WHERE id IN (:UMA, :REX, :NIA, :SAM, :OTTO) AND role = 'teacher') = 0
       THEN 'PASS  none of the five refused cases holds the teacher role'
       ELSE 'SECURITY FINDING a refused case holds the teacher role' END;

-- ══ 5. A malformed switch reads as OFF and breaks nothing ══════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: malformed switch'; END $$;
UPDATE public.mm_data SET value = value || '{"teacher_auto_approve": "yes"}'::jsonb WHERE key = 'global_settings';
SET ROLE authenticated;
SET test.uid = :GIL;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  a string in the switch is OFF, and applying still works'
       ELSE 'FAIL  malformed switch: ' || j::text END FROM r;
RESET ROLE;

-- ══ 6. The admin queue tells the two kinds of approval apart ═══════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: admin queue'; END $$;
SET ROLE authenticated;
SET test.uid = :ADMIN;
SELECT CASE WHEN (public.admin_set_teacher_status(:OTTO::uuid, 'approved', 'unverified') ->> 'ok') = 'true'
       THEN 'PASS  an admin can still approve by hand'
       ELSE 'FAIL  manual approval broke' END;
WITH q AS (SELECT public.admin_teacher_requests() -> 'requests' AS a)
SELECT CASE WHEN EXISTS (SELECT 1 FROM q, jsonb_array_elements(q.a) e WHERE e ->> 'id' = :TARA AND (e ->> 'auto')::boolean)
            AND EXISTS (SELECT 1 FROM q, jsonb_array_elements(q.a) e WHERE e ->> 'id' = :OTTO AND NOT (e ->> 'auto')::boolean)
       THEN 'PASS  the queue marks Tara auto and Otto manual'
       ELSE 'FAIL  the queue cannot tell auto from manual' END;
SET test.uid = :MAL;
SELECT CASE WHEN (public.admin_teacher_requests() ->> 'ok') = 'false'
       THEN 'PASS  a non-admin cannot read the queue'
       ELSE 'SECURITY FINDING a non-admin read the teacher queue' END;
RESET ROLE;

-- ══ 7. Switched back OFF, the next applicant waits again ═══════════════════
DO $$ BEGIN RAISE NOTICE '-- teacher approve: switch off again'; END $$;
SET ROLE authenticated;
SET test.uid = :ADMIN;
UPDATE public.mm_data SET value = value || '{"teacher_auto_approve": false}'::jsonb WHERE key = 'global_settings';
SET test.uid = :MAL;
WITH r AS (SELECT public.request_teacher_access(NULL) AS j)
SELECT CASE WHEN j ->> 'status' = 'pending'
       THEN 'PASS  switched back off: a verified applicant waits again'
       ELSE 'SECURITY FINDING switching off did not take effect: ' || j::text END FROM r;
RESET ROLE;
