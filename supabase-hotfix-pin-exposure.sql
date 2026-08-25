-- ═══════════════════════════════════════════════════════════════════════════
--  URGENT HOTFIX — plaintext PIN exposure
--
--  Two defects, both live right now:
--
--  1. supabase-rls-migration.sql Part 6 used:
--         REVOKE SELECT (pin) ON public.students FROM anon, authenticated;
--     That is INEFFECTIVE. Supabase grants table-wide SELECT on public tables
--     to anon/authenticated, and a table-level grant implies every column — a
--     column-level REVOKE cannot subtract from it. To restrict columns you must
--     REVOKE on the TABLE and then GRANT the safe columns back explicitly.
--
--  2. All student PINs are still plaintext (verified: 0 rows match '$2%',
--     3 rows do not). The bcrypt path in verify_student_pin() has never been
--     exercised, so the plaintext fallback is currently the ONLY way anyone
--     can log in.
--
--  Net effect: any holder of the publishable key — which ships in
--  engine/supabase.js — can read every child's username AND plaintext PIN.
--
--  Run this in the Supabase SQL Editor now.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1 · Hash the existing plaintext PINs in place ───────────────────────────
-- crypt() with a bcrypt salt. This preserves each child's current PIN (they can
-- still log in with the same 4 digits) while removing the plaintext from the DB.
-- verify_student_pin() already tries bcrypt, so no code change is required.
UPDATE public.students
   SET pin = crypt(pin, gen_salt('bf'))
 WHERE pin IS NOT NULL
   AND pin NOT LIKE '$2%';          -- skip anything already bcrypt

-- ── 2 · Make the column privileges actually restrictive ─────────────────────
-- Revoke the table-wide grant, then hand back only the non-secret columns.
REVOKE SELECT ON public.students FROM anon, authenticated;

GRANT SELECT (
  id, family_id, username, display_name, avatar,
  grade, settings, session_version, expires_at, created_at
) ON public.students TO anon, authenticated;

-- pin and pin_hash are deliberately absent from that list, so they are now
-- unreadable by anon/authenticated even through a policy that matches the row.
-- The SECURITY DEFINER RPCs (verify_student_pin, set_student_pin) run as the
-- table owner and are unaffected, as is service_role.

-- INSERT/UPDATE/DELETE grants are untouched; RLS policies still gate the rows.
-- Writing to pin stays possible for the owning parent, which is what
-- set_student_pin() needs.

COMMIT;


-- ═══════════════════════════════════════════════════════════════════════════
--  VERIFY (run separately, after committing)
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. No plaintext PINs remain — expect 0:
--      SELECT count(*) FROM public.students WHERE pin IS NOT NULL AND pin NOT LIKE '$2%';
--
-- 2. From a terminal, with ONLY the publishable key — expect 42501 permission denied:
--      curl -s -H "apikey: <KEY>" -H "Authorization: Bearer <KEY>" \
--           "https://<project>.supabase.co/rest/v1/students?select=pin&limit=0"
--
-- 3. Confirm a child can still log in with their existing PIN before you
--    consider this done.


-- ═══════════════════════════════════════════════════════════════════════════
--  AFTERWARDS — rotate the PINs
-- ═══════════════════════════════════════════════════════════════════════════
-- Hashing removes future exposure but does not undo past exposure. Those three
-- PINs were readable by anyone holding the publishable key for the whole life
-- of the project. Have the parent set a new PIN for each child from the parent
-- dashboard (which calls set_student_pin() and therefore stores bcrypt).
--
-- Only once every PIN is bcrypt should the plaintext branch be removed from
-- verify_student_pin(). Until then, removing it locks all three students out.
