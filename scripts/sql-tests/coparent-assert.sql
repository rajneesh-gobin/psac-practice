\set ON_ERROR_STOP on
\pset pager off

CREATE OR REPLACE FUNCTION pg_temp.ck(name text, got boolean, want boolean) RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  IF got IS NOT DISTINCT FROM want THEN
    RAISE NOTICE '  ok   %', name;
  ELSE
    RAISE EXCEPTION '  FAIL % (got %, want %)', name, got, want;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION pg_temp.cks(name text, got text, want text) RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  IF got IS NOT DISTINCT FROM want THEN
    RAISE NOTICE '  ok   %  [%]', name, got;
  ELSE
    RAISE EXCEPTION '  FAIL % (got %, want %)', name, got, want;
  END IF;
END $$;

-- ⚠ Everything below runs as `authenticated`, NOT as the superuser.
--   RLS does not apply to a superuser or to a table's owner, so running these
--   as postgres made every "sees the family row" assertion vacuous — it passed
--   for a total stranger too. Running as a real client role also exercises the
--   EXECUTE grants on the new functions, which is the other half of what can
--   silently go wrong (the friend RPCs were authenticated-only and dead).
SET ROLE authenticated;

\echo ''
\echo '=== 1. BEFORE any invite: Bob is a stranger to the family ==='
SET test.uid = '22222222-2222-2222-2222-222222222222';
SELECT pg_temp.ck('bob is not a family member',
  public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), false);
SELECT pg_temp.ck('bob does not own the child',
  public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), false);
SELECT pg_temp.ck('bob cannot set the child PIN',
  (public.set_student_pin('dddddddd-dddd-dddd-dddd-dddddddddddd','1234')->>'ok')::boolean, false);

\echo ''
\echo '=== 2. Alice (owner) still has everything she had ==='
SET test.uid = '11111111-1111-1111-1111-111111111111';
SELECT pg_temp.ck('alice is a member',   public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);
SELECT pg_temp.ck('alice is the owner',  public.is_family_owner('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);
SELECT pg_temp.ck('alice owns the child',public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), true);
SELECT pg_temp.ck('alice can set the PIN',
  (public.set_student_pin('dddddddd-dddd-dddd-dddd-dddddddddddd','1234')->>'ok')::boolean, true);
SELECT pg_temp.ck('alice sees her family row via RLS',
  EXISTS(SELECT 1 FROM public.families WHERE id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);

\echo ''
\echo '=== 3. Alice mints an invite ==='
CREATE TEMP TABLE tok AS SELECT public.create_coparent_invite(48) AS r;
SELECT pg_temp.ck('invite ok', (SELECT (r->>'ok')::boolean FROM tok), true);
SELECT pg_temp.ck('token is 64 hex chars', (SELECT (r->>'token') ~ '^[0-9a-f]{64}$' FROM tok), true);

-- family_invites is deny-all to client roles, so reading it back at all needs
-- the superuser. That the next line is necessary IS the first assertion: a
-- client reaching this table directly would be the bug.
DO $$ BEGIN
  PERFORM 1 FROM public.family_invites;
  RAISE EXCEPTION '  FAIL authenticated can read family_invites directly';
EXCEPTION
  WHEN insufficient_privilege THEN RAISE NOTICE '  ok   family_invites is unreadable by a client';
  WHEN others THEN RAISE;
END $$;

RESET ROLE;
SELECT pg_temp.ck('raw token is NOT stored',
  (SELECT EXISTS(SELECT 1 FROM public.family_invites i, tok WHERE i.token_hash = (tok.r->>'token'))), false);
SELECT pg_temp.ck('only the sha256 is stored',
  (SELECT EXISTS(SELECT 1 FROM public.family_invites i, tok
                  WHERE i.token_hash = encode(digest(tok.r->>'token','sha256'),'hex'))), true);
SET ROLE authenticated;

\echo ''
\echo '=== 4. A stranger cannot mint an invite for someone elses family ==='
SET test.uid = '33333333-3333-3333-3333-333333333333';
SELECT pg_temp.cks('mallory refused', public.create_coparent_invite(48)->>'error', 'not_owner');

\echo ''
\echo '=== 5. Wrong / malformed tokens are refused, with one generic answer ==='
SET test.uid = '22222222-2222-2222-2222-222222222222';
SELECT pg_temp.cks('garbage token',  public.accept_coparent_invite('nope')->>'error', 'invalid_link');
SELECT pg_temp.cks('well-formed but wrong token',
  public.accept_coparent_invite(repeat('a',64))->>'error', 'invalid_link');

\echo ''
\echo '=== 6. Bob accepts ==='
SELECT pg_temp.ck('accept ok',
  (SELECT (public.accept_coparent_invite(r->>'token')->>'ok')::boolean FROM tok), true);

\echo ''
\echo '=== 7. Bob now has the SAME access as Alice (this is the whole feature) ==='
SELECT pg_temp.ck('bob is a family member', public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);
SELECT pg_temp.ck('bob owns the child now', public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), true);
SELECT pg_temp.ck('bob via owns_student_txt (what 11 policies call)',
  public.owns_student_txt('dddddddd-dddd-dddd-dddd-dddddddddddd'), true);
SELECT pg_temp.ck('bob can set the child PIN',
  (public.set_student_pin('dddddddd-dddd-dddd-dddd-dddddddddddd','4321')->>'ok')::boolean, true);
SELECT pg_temp.ck('bob can add a child',
  (public.create_student_with_pin('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','kai','Kai')->>'ok')::boolean, true);
SELECT pg_temp.ck('bob can soft-delete a child',
  (public.soft_delete_student('dddddddd-dddd-dddd-dddd-dddddddddddd')->>'ok')::boolean, true);
-- put it back for later assertions
UPDATE public.students SET deleted_at = NULL WHERE id='dddddddd-dddd-dddd-dddd-dddddddddddd';

\echo ''
\echo '=== 8. RLS: bob reads the family row and the children rows ==='
SELECT pg_temp.ck('bob sees the family row',
  EXISTS(SELECT 1 FROM public.families WHERE id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);
SELECT pg_temp.ck('bob sees the child row',
  EXISTS(SELECT 1 FROM public.students WHERE id='dddddddd-dddd-dddd-dddd-dddddddddddd'), true);
SELECT pg_temp.ck('bob resolves his family via my_member_family()',
  (public.my_member_family()->>'id') = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
SELECT pg_temp.cks('bobs role', public.my_member_family()->>'my_role', 'coparent');

\echo ''
\echo '=== 9. Mallory STILL sees nothing (the negative case that matters) ==='
SET test.uid = '33333333-3333-3333-3333-333333333333';
SELECT pg_temp.ck('mallory not a member', public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), false);
SELECT pg_temp.ck('mallory does not own the child', public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), false);
SELECT pg_temp.ck('mallory sees no family row',
  EXISTS(SELECT 1 FROM public.families WHERE id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), false);
SELECT pg_temp.ck('mallory sees no child row',
  EXISTS(SELECT 1 FROM public.students WHERE id='dddddddd-dddd-dddd-dddd-dddddddddddd'), false);

\echo ''
\echo '=== 10. The invite is single use ==='
SELECT pg_temp.cks('replay by mallory refused',
  (SELECT public.accept_coparent_invite(r->>'token')->>'error' FROM tok), 'invalid_link');

\echo ''
\echo '=== 11. Owner-only membership management ==='
SET test.uid = '22222222-2222-2222-2222-222222222222';
SELECT pg_temp.cks('coparent cannot invite another',
  public.create_coparent_invite(48)->>'error', 'not_owner');
SELECT pg_temp.cks('coparent cannot remove the owner',
  public.remove_family_member('11111111-1111-1111-1111-111111111111')->>'error', 'cannot_remove_owner');

\echo ''
\echo '=== 12. The write side of families stays with the owner ==='
SET test.uid = '22222222-2222-2222-2222-222222222222';
DO $$
BEGIN
  -- WITH CHECK still requires parent_id = auth.uid(), so a co-parent cannot
  -- seize the family by re-pointing it at themselves.
  BEGIN
    UPDATE public.families SET parent_id = auth.uid()
     WHERE id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    RAISE EXCEPTION '  FAIL coparent was able to seize the family';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE '  ok   coparent cannot re-point parent_id at themselves';
  END;
END $$;

\echo ''
\echo '=== 13. Bob leaves; access is revoked immediately ==='
SELECT pg_temp.ck('bob can remove himself',
  (public.remove_family_member('22222222-2222-2222-2222-222222222222')->>'ok')::boolean, true);
SELECT pg_temp.ck('bob no longer a member', public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), false);
SELECT pg_temp.ck('bob no longer owns the child', public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), false);
SELECT pg_temp.ck('bob sees no child row', EXISTS(SELECT 1 FROM public.students WHERE id='dddddddd-dddd-dddd-dddd-dddddddddddd'), false);

\echo ''
\echo '=== 14. Alice is untouched by all of it ==='
SET test.uid = '11111111-1111-1111-1111-111111111111';
SELECT pg_temp.ck('alice still owns the child', public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), true);
SELECT pg_temp.ck('alice still sees her family', EXISTS(SELECT 1 FROM public.families WHERE id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), true);
SELECT pg_temp.ck('list shows just alice now',
  (SELECT jsonb_array_length(public.list_family_members()->'members')) = 1, true);

\echo ''
\echo '=== 15. Signed-out caller gets nothing ==='
SET test.uid = '';
SELECT pg_temp.ck('anon is not a member', public.is_family_member('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), false);
SELECT pg_temp.ck('anon owns nothing', public.owns_student('dddddddd-dddd-dddd-dddd-dddddddddddd'), false);

\echo ''
\echo 'ALL CO-PARENT ASSERTIONS PASSED'
