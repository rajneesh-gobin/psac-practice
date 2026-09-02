-- ═══════════════════════════════════════════════════════════════════════════
--  CO-PARENT ACCESS  —  a second (or third) adult login on the SAME family
--
--  Problem: families.parent_id is a single uuid, so a family has exactly one
--  adult login. A couple either shares one password or one of them has no
--  access at all. Sharing is what people actually do, and it is the worst
--  option: the same credential opens the forum under one name, the credits
--  balance, and every child's record.
--
--  Shape: a family_members join table, and ONE new predicate
--  is_family_member(family_id) that means "owner OR accepted co-parent".
--
--  Why that is a small change: authorisation in this database already funnels
--  through owns_student() -> owns_student_txt(), which 11 policies call. Widen
--  owns_student() and all 11 inherit co-parent access WITHOUT a single policy
--  being rewritten. Only 5 functions and 2 policies name f.parent_id directly.
--
--  ⚠ HOW THIS FILE EDITS THEM, AND WHY IT LOOKS ODD
--  CLAUDE.md rule #1: never author a policy change from supabase-schema.sql,
--  it is stale. That applies just as much to function bodies — restating a
--  five-page body from the dump would silently revert any fix made since.
--  So Part 3 does not restate anything. It reads the LIVE definition out of
--  pg_get_functiondef() / pg_policies, replaces only the ownership predicate
--  inside it, and re-executes. If the expected predicate is not found it
--  RAISEs, the transaction rolls back, and nothing is half-applied.
--
--  Idempotent. Safe to re-run. Run it in a transaction and inspect Part 6's
--  output before committing:
--
--      BEGIN;
--      \i supabase-coparent.sql
--      -- read the NOTICEs, then:
--      COMMIT;   (or ROLLBACK;)
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────
--  PART 1 · Tables
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.family_members (
  family_id  uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id    uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'coparent',
  invited_by uuid        REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (family_id, user_id),
  CONSTRAINT family_members_role_chk CHECK (role IN ('owner', 'coparent'))
);

-- One adult belongs to one family. Without this a single account could be a
-- co-parent on many families and the client's "my family" lookup, which takes
-- the first row, would pick a different one depending on row order.
CREATE UNIQUE INDEX IF NOT EXISTS family_members_one_family_per_user
  ON public.family_members (user_id);

CREATE INDEX IF NOT EXISTS family_members_family_idx
  ON public.family_members (family_id);

-- Mirrors student_invites exactly: 32 random bytes, SHA-256 stored only,
-- single use, short expiry. The raw token is returned once, to the caller,
-- and never stored.
CREATE TABLE IF NOT EXISTS public.family_invites (
  token_hash text        PRIMARY KEY,
  family_id  uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  created_by uuid        REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used_at    timestamptz,
  used_by    uuid        REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS family_invites_family_idx
  ON public.family_invites (family_id);

-- Deny-all on both, like student_invites and credit_ledger. No grant at all is
-- stronger than a policy: a later policy mistake cannot open a hole where
-- there is no grant behind it. Every read and write goes through the
-- SECURITY DEFINER functions in Part 4.
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_invites ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.family_members FROM anon, authenticated;
REVOKE ALL ON public.family_invites FROM anon, authenticated;


-- ─────────────────────────────────────────────────────────────────────────
--  PART 2 · The one new predicate
-- ─────────────────────────────────────────────────────────────────────────

-- "owner OR accepted co-parent of this family".
--
-- ⚠ Granted to anon AS WELL AS authenticated. A child session is anon plus a
--   token header, and this runs inside policies declared TO public which a
--   child's queries also evaluate. An authenticated-only grant is how the
--   friend RPCs ended up dead (CLAUDE.md rule #3).
CREATE OR REPLACE FUNCTION public.is_family_member(p_family uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family AND f.parent_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM public.family_members m
             WHERE m.family_id = p_family AND m.user_id = auth.uid())
  );
$$;

REVOKE ALL     ON FUNCTION public.is_family_member(uuid) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.is_family_member(uuid) TO anon, authenticated;

-- Is the caller the OWNER (not merely a member)? Membership management is
-- owner-only, otherwise a co-parent could remove the owner from their own
-- family — the one asymmetry in an otherwise equal relationship.
CREATE OR REPLACE FUNCTION public.is_family_owner(p_family uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (SELECT 1 FROM public.families f
                  WHERE f.id = p_family AND f.parent_id = auth.uid());
$$;

REVOKE ALL     ON FUNCTION public.is_family_owner(uuid) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.is_family_owner(uuid) TO anon, authenticated;


-- ─────────────────────────────────────────────────────────────────────────
--  PART 3 · Widen the existing checks — against the LIVE definitions
--
--  Nothing below restates a body. Each block reads what is actually deployed,
--  swaps the ownership predicate, and re-executes it.
-- ─────────────────────────────────────────────────────────────────────────

DO $migrate$
DECLARE
  -- The 5 functions that name f.parent_id directly. Everything else reaches
  -- ownership through owns_student(), the first entry here.
  v_targets text[] := ARRAY[
    'public.owns_student(uuid)',
    'public.parent_of_classroom_member(uuid)',
    'public.set_student_pin(uuid, text)',
    'public.soft_delete_student(uuid)',
    'public.create_student_with_pin(uuid, text, text, text, integer, text, jsonb)'
  ];
  v_sig     text;
  v_oid     oid;
  v_def     text;
  v_new     text;
  v_hits    int;
  v_total   int := 0;
BEGIN
  FOREACH v_sig IN ARRAY v_targets LOOP
    BEGIN
      v_oid := v_sig::regprocedure::oid;
    EXCEPTION WHEN undefined_function OR invalid_text_representation THEN
      RAISE NOTICE 'skip: % is not present on this database', v_sig;
      CONTINUE;
    END;

    v_def := pg_get_functiondef(v_oid);

    -- Already migrated on an earlier run.
    IF position('is_family_member' in v_def) > 0 THEN
      RAISE NOTICE 'skip: % already widened', v_sig;
      CONTINUE;
    END IF;

    -- Two spellings appear across these bodies. Replace whichever is present;
    -- the alias is always the families table.
    v_new := replace(v_def, 'f.parent_id = auth.uid()', 'public.is_family_member(f.id)');
    v_new := replace(v_new, 'families.parent_id = auth.uid()', 'public.is_family_member(families.id)');

    IF v_new = v_def THEN
      RAISE EXCEPTION
        'co-parent migration: no ownership predicate found in %. The live body '
        'differs from what this migration expects — inspect it with '
        'pg_get_functiondef(''%''::regprocedure) and widen it by hand.', v_sig, v_sig;
    END IF;

    -- How many sites were swapped, for the audit line in Part 6.
    v_hits := (length(v_def) - length(replace(v_def, 'parent_id = auth.uid()', '')))
              / length('parent_id = auth.uid()');
    v_total := v_total + v_hits;

    EXECUTE v_new;
    RAISE NOTICE 'widened % (% ownership check(s))', v_sig, v_hits;
  END LOOP;

  RAISE NOTICE 'co-parent: % ownership check(s) widened across functions', v_total;
END
$migrate$;


-- The two policies that name parent_id directly. Policies have no
-- CREATE OR REPLACE, so these are ALTERed in place from their live expression.
DO $policies$
DECLARE
  v_qual  text;
  v_check text;
BEGIN
  -- ── families_own ──
  SELECT qual, with_check INTO v_qual, v_check
    FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'families' AND policyname = 'families_own';

  IF NOT FOUND THEN
    RAISE NOTICE 'skip: policy families_own not present';
  ELSIF position('is_family_member' in coalesce(v_qual, '')) > 0 THEN
    RAISE NOTICE 'skip: families_own already widened';
  ELSIF position('parent_id = auth.uid()' in coalesce(v_qual, '')) = 0 THEN
    RAISE EXCEPTION
      'co-parent migration: families_own USING clause is not the expected shape. '
      'Live value: %', v_qual;
  ELSE
    -- Read side widens to any member. The WRITE side deliberately does NOT:
    -- renaming the family or changing family_code stays with the owner, and
    -- a co-parent must never be able to re-point parent_id at themselves.
    --
    -- ⚠ The owner term is ADDED TO, never replaced. Replacing it — which is what
    -- this did — broke creating a family outright: PostgREST inserts with
    -- INSERT ... RETURNING, RETURNING is checked against the USING clause, and
    -- is_family_member() has to LOOK THE NEW ROW UP. It is STABLE, so the row it
    -- is being asked about is not yet in its snapshot, it answers false, and the
    -- insert dies with "new row violates row-level security policy for table
    -- families" — while the WITH CHECK it names was passing all along. Keeping
    -- `parent_id = auth.uid()` as a SAME-ROW predicate costs nothing (it is
    -- already one of is_family_member's two branches, so this widens nothing for
    -- an existing row) and needs no lookup.
    EXECUTE format(
      'ALTER POLICY families_own ON public.families USING (%s) WITH CHECK (%s)',
      replace(v_qual, 'parent_id = auth.uid()',
              '(parent_id = auth.uid() OR public.is_family_member(id))'),
      coalesce(v_check, 'true')
    );
    RAISE NOTICE 'widened policy families_own (read side only)';
  END IF;

  -- ── students_parent ──
  -- USING already routes through owns_student_txt(), which Part 3 widened, so
  -- only the WITH CHECK (insert/update of a student row) needs touching.
  SELECT qual, with_check INTO v_qual, v_check
    FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'students' AND policyname = 'students_parent';

  IF NOT FOUND THEN
    RAISE NOTICE 'skip: policy students_parent not present';
  ELSIF position('is_family_member' in coalesce(v_check, '')) > 0 THEN
    RAISE NOTICE 'skip: students_parent already widened';
  ELSIF position('parent_id = auth.uid()' in coalesce(v_check, '')) = 0 THEN
    RAISE EXCEPTION
      'co-parent migration: students_parent WITH CHECK is not the expected shape. '
      'Live value: %', v_check;
  ELSE
    EXECUTE format(
      'ALTER POLICY students_parent ON public.students USING (%s) WITH CHECK (%s)',
      v_qual,
      'public.is_admin() OR public.is_family_member(family_id)'
    );
    RAISE NOTICE 'widened policy students_parent (WITH CHECK)';
  END IF;
END
$policies$;


-- ─────────────────────────────────────────────────────────────────────────
--  PART 4 · Membership RPCs
-- ─────────────────────────────────────────────────────────────────────────

-- Total adults per family, owner included. A cap keeps a co-parent invite from
-- becoming a way to resell one subscription to a group.
CREATE OR REPLACE FUNCTION public.family_member_cap()
RETURNS int LANGUAGE sql IMMUTABLE AS $$ SELECT 3 $$;

-- Everyone on the account, for the settings screen. Returns the caller's own
-- family only; a co-parent sees the same list the owner does.
CREATE OR REPLACE FUNCTION public.list_family_members()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_family uuid;
  v_rows   jsonb;
  v_invite jsonb;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    SELECT m.family_id INTO v_family FROM public.family_members m WHERE m.user_id = auth.uid();
  END IF;
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', true, 'members', '[]'::jsonb, 'pending', null);
  END IF;

  SELECT coalesce(jsonb_agg(x ORDER BY x->>'role' DESC, x->>'name'), '[]'::jsonb)
    INTO v_rows
    FROM (
      -- The owner, from families.parent_id, so this is correct even for a
      -- family that predates the backfill in Part 5.
      SELECT jsonb_build_object(
               'user_id', p.id, 'name', p.full_name, 'role', 'owner',
               'is_me', p.id = auth.uid(), 'since', f.created_at
             ) AS x
        FROM public.families f JOIN public.profiles p ON p.id = f.parent_id
       WHERE f.id = v_family
      UNION ALL
      SELECT jsonb_build_object(
               'user_id', p.id, 'name', p.full_name, 'role', m.role,
               'is_me', p.id = auth.uid(), 'since', m.created_at
             )
        FROM public.family_members m JOIN public.profiles p ON p.id = m.user_id
       WHERE m.family_id = v_family AND m.role <> 'owner'
    ) s;

  -- An unused, unexpired invite, so the owner can see one is outstanding and
  -- revoke it. The token itself is NOT returned — it exists only in the link
  -- that was already shared.
  SELECT jsonb_build_object('created_at', i.created_at, 'expires_at', i.expires_at)
    INTO v_invite
    FROM public.family_invites i
   WHERE i.family_id = v_family AND i.used_at IS NULL AND i.expires_at > now()
   ORDER BY i.created_at DESC LIMIT 1;

  RETURN jsonb_build_object(
    'ok', true, 'family_id', v_family, 'members', v_rows,
    'pending', v_invite, 'cap', public.family_member_cap(),
    'is_owner', public.is_family_owner(v_family)
  );
END;
$$;

REVOKE ALL     ON FUNCTION public.list_family_members() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.list_family_members() TO authenticated;


-- Mint a co-parent invite link. Owner only.
CREATE OR REPLACE FUNCTION public.create_coparent_invite(p_hours int DEFAULT 48)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_family uuid;
  v_token  text;
  v_exp    timestamptz;
  v_hours  int := least(greatest(coalesce(p_hours, 48), 1), 168);
  v_count  int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    -- A co-parent asking to invite another co-parent lands here.
    RETURN jsonb_build_object('ok', false, 'error', 'not_owner');
  END IF;

  SELECT 1 + count(*) INTO v_count
    FROM public.family_members m WHERE m.family_id = v_family AND m.role <> 'owner';
  IF v_count >= public.family_member_cap() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cap_reached',
                              'cap', public.family_member_cap());
  END IF;

  -- Replace any outstanding invite, so the last link sent is the only one that
  -- works — same rule as create_student_invite.
  DELETE FROM public.family_invites WHERE family_id = v_family AND used_at IS NULL;
  DELETE FROM public.family_invites WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  v_exp   := now() + (v_hours || ' hours')::interval;

  INSERT INTO public.family_invites (token_hash, family_id, created_by, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_family, auth.uid(), v_exp);

  RETURN jsonb_build_object('ok', true, 'token', v_token, 'expires_at', v_exp);
END;
$$;

REVOKE ALL     ON FUNCTION public.create_coparent_invite(int) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.create_coparent_invite(int) TO authenticated;


CREATE OR REPLACE FUNCTION public.revoke_coparent_invite()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_family uuid;
  v_n      int;
BEGIN
  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_owner');
  END IF;
  DELETE FROM public.family_invites WHERE family_id = v_family AND used_at IS NULL;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN jsonb_build_object('ok', true, 'revoked', v_n);
END;
$$;

REVOKE ALL     ON FUNCTION public.revoke_coparent_invite() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.revoke_coparent_invite() TO authenticated;


-- Accept an invite. The caller must already be signed in with THEIR OWN
-- account — the link never carries a credential, it only says which family to
-- join once you have proved who you are.
CREATE OR REPLACE FUNCTION public.accept_coparent_invite(p_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_inv    public.family_invites%ROWTYPE;
  v_now    timestamptz := now();
  v_count  int;
  v_owner  uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT * INTO v_inv FROM public.family_invites
   WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex');

  -- One generic answer for missing / used / expired, so a probe cannot learn
  -- which tokens ever existed.
  IF NOT FOUND OR v_inv.used_at IS NOT NULL OR v_inv.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT f.parent_id INTO v_owner FROM public.families f WHERE f.id = v_inv.family_id;
  IF v_owner = auth.uid() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self');
  END IF;

  -- Idempotent: re-opening the link after it worked is a success, not an error.
  IF EXISTS (SELECT 1 FROM public.family_members m
              WHERE m.family_id = v_inv.family_id AND m.user_id = auth.uid()) THEN
    UPDATE public.family_invites
       SET used_at = coalesce(used_at, v_now), used_by = coalesce(used_by, auth.uid())
     WHERE token_hash = v_inv.token_hash;
    RETURN jsonb_build_object('ok', true, 'family_id', v_inv.family_id, 'already', true);
  END IF;

  -- One adult, one family (see family_members_one_family_per_user).
  IF EXISTS (SELECT 1 FROM public.family_members m WHERE m.user_id = auth.uid())
     OR EXISTS (SELECT 1 FROM public.families f WHERE f.parent_id = auth.uid()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_in_a_family');
  END IF;

  SELECT 1 + count(*) INTO v_count
    FROM public.family_members m WHERE m.family_id = v_inv.family_id AND m.role <> 'owner';
  IF v_count >= public.family_member_cap() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cap_reached');
  END IF;

  INSERT INTO public.family_members (family_id, user_id, role, invited_by)
  VALUES (v_inv.family_id, auth.uid(), 'coparent', v_inv.created_by);

  UPDATE public.family_invites
     SET used_at = v_now, used_by = auth.uid()
   WHERE token_hash = v_inv.token_hash;

  RETURN jsonb_build_object('ok', true, 'family_id', v_inv.family_id);
END;
$$;

REVOKE ALL     ON FUNCTION public.accept_coparent_invite(text) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.accept_coparent_invite(text) TO authenticated;


-- Remove someone. The owner can remove any co-parent; a co-parent can remove
-- only themselves (leave). Nobody can remove the owner — that would orphan the
-- family, and families.parent_id is what every fallback path reads.
CREATE OR REPLACE FUNCTION public.remove_family_member(p_user uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_family uuid;
  v_owner  uuid;
  v_n      int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT m.family_id INTO v_family FROM public.family_members m WHERE m.user_id = p_user;
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_member');
  END IF;

  SELECT f.parent_id INTO v_owner FROM public.families f WHERE f.id = v_family;
  IF p_user = v_owner THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cannot_remove_owner');
  END IF;

  IF auth.uid() <> v_owner AND auth.uid() <> p_user THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  -- .select('id') equivalent: a DELETE that matches nothing must not read as
  -- success. That misreading is how a deleted child came back as a duplicate.
  DELETE FROM public.family_members WHERE family_id = v_family AND user_id = p_user;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n = 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_member');
  END IF;

  RETURN jsonb_build_object('ok', true, 'removed', p_user, 'left', auth.uid() = p_user);
END;
$$;

REVOKE ALL     ON FUNCTION public.remove_family_member(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.remove_family_member(uuid) TO authenticated;


-- Which family does this adult belong to? The client asks this only when the
-- ownership lookup it already does returns nothing, so an existing owner's
-- login path is completely unchanged.
CREATE OR REPLACE FUNCTION public.my_member_family()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_row jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  SELECT jsonb_build_object(
           'id', f.id, 'family_name', f.family_name, 'family_code', f.family_code,
           'parent_id', f.parent_id, 'created_at', f.created_at, 'my_role', m.role
         )
    INTO v_row
    FROM public.family_members m JOIN public.families f ON f.id = m.family_id
   WHERE m.user_id = auth.uid()
   LIMIT 1;
  RETURN v_row;
END;
$$;

REVOKE ALL     ON FUNCTION public.my_member_family() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.my_member_family() TO authenticated;


-- ─────────────────────────────────────────────────────────────────────────
--  PART 5 · Backfill
-- ─────────────────────────────────────────────────────────────────────────

-- Give every existing family an explicit owner row. is_family_member() reads
-- families.parent_id directly as well, so nothing depends on this — it exists
-- so family_members is a complete picture for anyone querying it later.
INSERT INTO public.family_members (family_id, user_id, role)
SELECT f.id, f.parent_id, 'owner'
  FROM public.families f
  JOIN public.profiles p ON p.id = f.parent_id
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────────
--  PART 6 · Verify before COMMIT
-- ─────────────────────────────────────────────────────────────────────────

DO $verify$
DECLARE
  v_left int;
  v_fn   text;
BEGIN
  -- Any function still deciding ownership the old way?
  SELECT count(*), string_agg(p.oid::regprocedure::text, ', ')
    INTO v_left, v_fn
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public'
     -- prokind 'f' = a plain function. pg_get_functiondef() RAISES on an
     -- aggregate or a window function ("array_agg is an aggregate function"),
     -- which would abort the whole migration in its own verification step.
     AND p.prokind = 'f'
     AND pg_get_functiondef(p.oid) LIKE '%parent_id = auth.uid()%'
     AND p.proname NOT IN ('is_family_member', 'is_family_owner',
                           'list_family_members', 'create_coparent_invite',
                           'revoke_coparent_invite', 'accept_coparent_invite',
                           'remove_family_member', 'my_member_family');

  IF v_left > 0 THEN
    RAISE NOTICE '';
    RAISE NOTICE '  ⚠ % function(s) still check parent_id directly: %', v_left, v_fn;
    RAISE NOTICE '    A co-parent will be refused by those. Review each one.';
  ELSE
    RAISE NOTICE '  ok  no function decides ownership by parent_id alone';
  END IF;

  RAISE NOTICE '  ok  families with an owner row: %',
    (SELECT count(*) FROM public.family_members WHERE role = 'owner');
END
$verify$;
