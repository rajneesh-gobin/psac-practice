-- ─────────────────────────────────────────────────────────────────────────
-- Close the co-parent family takeover (pending.md item 0) — 2026-09-16
--
-- BEFORE (one FOR ALL policy):
--   USING      ((parent_id = auth.uid()) OR is_family_member(id) OR is_admin())
--   WITH CHECK ((parent_id = auth.uid()) OR is_admin())
--
-- A co-parent passed USING because they ARE a member, and passed WITH CHECK
-- because the row they wrote named THEMSELVES as parent_id. So
--     UPDATE families SET parent_id = auth.uid() WHERE id = <their family>
-- succeeded and they became the owner. ⚠ MEASURED ON PRODUCTION, as
-- `authenticated` in a rolled-back transaction, with a real co-parent row:
-- 1 row changed. The vulnerability was real, not theoretical.
--
-- ⚠ A STRANGER NEVER COULD: USING fails for a non-member, and an UPDATE whose
--   USING matches no row changes nothing and raises nothing.
--
-- ⚠⚠ THE ONE-LINE FIX PREVIOUSLY WRITTEN OUT AT THE END OF supabase-schema.sql
--    IS ITSELF BROKEN, and applying it took family creation down on production
--    until it was reverted. It kept a single FOR ALL policy and narrowed
--    WITH CHECK to `(parent_id = auth.uid() AND is_family_owner(id)) OR is_admin()`.
--    `is_family_owner()` is STABLE and LOOKS THE ROW UP, so for a family being
--    INSERTed in that same statement it answers false — the new tuple is not in
--    its snapshot. Every new parent got 42501 on family creation. This is
--    database.md rule 2 from the other direction: there, a USING clause was
--    checked on INSERT; here, a WITH CHECK predicate cannot see the row it is
--    checking. A lookup-based predicate must never gate an INSERT.
--
-- THE FIX: split the one FOR ALL policy into four, so INSERT is never subjected
-- to an ownership lookup that cannot succeed.
--   SELECT — unchanged, so co-parent reads are untouched.
--   INSERT — `parent_id = auth.uid()`: you may only create a family you own.
--            No lookup, so it works for a row that does not exist yet.
--   UPDATE — USING unchanged (co-parents may still target the row), WITH CHECK
--            demands you are ALREADY the owner in the committed snapshot, which
--            is exactly what a takeover is not.
--   DELETE — owner or admin only. ⚠ A co-parent could previously delete the
--            whole family outright under the FOR ALL USING clause; that is the
--            same class of hole and is closed here.
--
-- ⚠ COST, ACCEPTED KNOWINGLY: a co-parent can no longer rename the family
--   (`Store.updateFamilyName`). Production has ZERO co-parent memberships, so
--   nobody is affected today, and the client hides the control from non-owners
--   rather than offering a button that cannot work. If co-parent renaming is
--   wanted later, the shape is a SECURITY DEFINER function for that ONE column
--   — never a wider policy, which re-opens this.
--
-- Verified on production as `authenticated`, every check inside BEGIN…ROLLBACK,
-- with a real co-parent membership row (scripts/sql-tests/families-rls.md):
--   1 new family INSERT+RETURNING .......... 1 row      (the regression above)
--   2 co-parent takeover ................... 42501 refused
--   3 co-parent can still read ............. 1 row
--   4 co-parent rename ..................... 42501 refused  (accepted)
--   5 co-parent delete family .............. 0 rows
--   6 owner rename ......................... 1 row
--   7 owner reads own family ............... 1 row
--   8 stranger reads ....................... 0 rows
-- ⚠ 0 rows and 42501 are NOT the same event: a USING failure matches no row
--   silently, a WITH CHECK failure raises. A test that accepts "not 1" for both
--   cannot tell a closed hole from a broken feature.
-- ─────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS families_own ON public.families;
DROP POLICY IF EXISTS families_sel ON public.families;
DROP POLICY IF EXISTS families_ins ON public.families;
DROP POLICY IF EXISTS families_upd ON public.families;
DROP POLICY IF EXISTS families_del ON public.families;

CREATE POLICY families_sel ON public.families FOR SELECT TO public
  USING ((parent_id = auth.uid()) OR is_family_member(id) OR is_admin());

CREATE POLICY families_ins ON public.families FOR INSERT TO public
  WITH CHECK ((parent_id = auth.uid()) OR is_admin());

CREATE POLICY families_upd ON public.families FOR UPDATE TO public
  USING      ((parent_id = auth.uid()) OR is_family_member(id) OR is_admin())
  WITH CHECK (((parent_id = auth.uid()) AND is_family_owner(id)) OR is_admin());

CREATE POLICY families_del ON public.families FOR DELETE TO public
  USING ((parent_id = auth.uid()) OR is_admin());
