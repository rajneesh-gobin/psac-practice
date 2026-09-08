-- ═══════════════════════════════════════════════════════════════════════════
--  FIX (2 of 2): the classroom sign-in path had three independent breakages
--
--  Found by driving guest.html against the real endpoints. Each one alone makes
--  a pupil sign-in impossible, which is why guest_submissions is empty: it is
--  not that nobody has used the classroom flow, it is that nobody has ever been
--  able to.
--
--    1. writes guest_submissions.display_name — no such column (fixed in
--       20260908_fix_guest_open_column.sql)
--    2. reads public.guest_questions — no such table, anywhere. It appears in
--       supabase-schema.sql only because the dump reproduces this function body
--       faithfully. Nothing creates it and nothing else references it.
--    3. stores the attempt token as crypt(token, gen_salt('bf')) — a BCRYPT
--       hash — while guest_submit() verifies it as
--       encode(digest(p_token,'sha256'),'hex'). Those can never match, so even
--       past the first two faults every submission would have failed
--       'bad_token'.
--
--  ── 2: why '[]' and not a new table ──────────────────────────────────────
--  netlify/functions/assignment-open.js does not use this field. It builds the
--  question list itself:
--        const qs = loadQuestionSet(a.subject_pack_id, a.question_ids || []);
--  and returns `questions: qs.map(...)`. The RPC's `questions` key is dead
--  weight that only serves to make the whole call fail. Creating a
--  guest_questions table would add a second, duplicate source of questions for
--  the same assignment — exactly the drift the single question loader exists to
--  prevent. The key is kept (returning '[]') rather than removed, so nothing
--  that reads the shape of this response breaks.
--
--  ── 3: sha256, matching the verifier ─────────────────────────────────────
--  ⚠ The direction of this fix matters. guest_submit() is also used by the
--  legacy guest_open() path, which stores sha256 and works. Changing the
--  VERIFIER to bcrypt would fix this function and break that one. The storer is
--  what is wrong, so the storer is what changes.
--  ⚠ It is not a downgrade in strength. This token is 32 random bytes from
--  gen_random_bytes — there is nothing to brute-force and no password to
--  protect. bcrypt buys nothing here and is simply the wrong function.
--
--  ⚠ Patched from pg_get_functiondef, with an exact-occurrence guard, for the
--    same reason as the first fix: ~90 lines of PIN, lockout and capacity logic
--    that must not change.
--
--  ⚠ Safe to rerun.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  v_def   text;
  v_new   text;
  v_qhits int;
  v_thits int;
  v_qsub  CONSTANT text :=
    '(SELECT coalesce(jsonb_agg(q.body ORDER BY q.position),''[]'') FROM public.guest_questions q WHERE q.assignment_id=a.id)';
  v_crypt CONSTANT text := 'crypt(token,gen_salt(''bf''))';
BEGIN
  SELECT pg_get_functiondef(p.oid) INTO v_def
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname = 'teacher_guest_open' AND p.prokind = 'f';

  IF v_def IS NULL THEN
    RAISE NOTICE 'teacher_guest_open not found — nothing to fix';
    RETURN;
  END IF;

  v_qhits := (length(v_def) - length(replace(v_def, v_qsub,  ''))) / length(v_qsub);
  v_thits := (length(v_def) - length(replace(v_def, v_crypt, ''))) / length(v_crypt);

  IF v_qhits = 0 AND v_thits = 0 THEN
    RAISE NOTICE 'teacher_guest_open already fixed';
    RETURN;
  END IF;

  -- Refuse to guess if the body has moved on since this was written.
  IF v_qhits > 1 OR v_thits > 2 THEN
    RAISE EXCEPTION 'unexpected shape: % question subquery, % crypt call(s)', v_qhits, v_thits;
  END IF;

  v_new := replace(v_def, v_qsub, '''[]''::jsonb');
  v_new := replace(v_new, v_crypt, 'encode(digest(token,''sha256''),''hex'')');

  EXECUTE v_new;
  RAISE NOTICE 'teacher_guest_open: % question subquery, % token hash(es) corrected', v_qhits, v_thits;
END $$;

-- ── verification ───────────────────────────────────────────────────────────
--  Expect 0 rows from each:
--   SELECT 1 FROM pg_proc p, unnest(string_to_array(pg_get_functiondef(p.oid), chr(10))) l
--    WHERE p.proname='teacher_guest_open' AND (l LIKE '%guest_questions%' OR l LIKE '%gen_salt%');
