-- Assertions for migrations/20260909_points_and_leaderboard.sql.
--
-- ⚠ These run as `anon`, never as the superuser. A child session IS anon plus
--   an x-student-token header — RLS and the grants are half of what is being
--   tested, and a superuser is subject to neither.
--
-- Identity is switched by setting `request.headers`, which the REAL
-- current_student_id() reads, hashes and looks up in student_sessions. Nothing
-- here is stubbed: the seed inserted genuine session rows.

\set ON_ERROR_STOP on

\set AYESHA '''cccc0000-0000-0000-0000-00000000000c'''
\set DEV    '''dddd0000-0000-0000-0000-00000000000d'''
\set ZOE    '''eeee0000-0000-0000-0000-00000000000e'''

-- ══ 1. shape and grants ════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: shape and grants'; END $$;

SELECT CASE WHEN to_regclass('public.student_points') IS NOT NULL
       THEN 'PASS  student_points exists' ELSE 'FAIL  student_points missing' END;

SELECT CASE WHEN to_regclass('public.student_point_events') IS NOT NULL
       THEN 'PASS  student_point_events exists' ELSE 'FAIL  ledger missing' END;

-- The unique key IS the anti-abuse mechanism. Without it every guarantee here
-- collapses into "the client probably will not ask twice".
SELECT CASE WHEN EXISTS (
         SELECT 1 FROM pg_constraint
         WHERE conrelid = 'public.student_point_events'::regclass
           AND contype = 'u'
           AND (SELECT array_agg(attname ORDER BY attname)
                  FROM pg_attribute
                 WHERE attrelid = conrelid AND attnum = ANY(conkey))
               = ARRAY['kind','ref','student_id']::name[])
       THEN 'PASS  ledger is unique on (student_id, kind, ref)'
       ELSE 'FAIL  ledger has no (student_id, kind, ref) unique constraint' END;

-- No write grant: the RPCs are the only writers, the same shape as credit_ledger.
SELECT CASE WHEN NOT (
         has_table_privilege('anon',          'public.student_points', 'INSERT') OR
         has_table_privilege('anon',          'public.student_points', 'UPDATE') OR
         has_table_privilege('authenticated', 'public.student_points', 'INSERT') OR
         has_table_privilege('authenticated', 'public.student_points', 'UPDATE') OR
         has_table_privilege('anon',          'public.student_point_events', 'INSERT') OR
         has_table_privilege('authenticated', 'public.student_point_events', 'INSERT'))
       THEN 'PASS  no direct write grant on either table'
       ELSE 'SECURITY FINDING  a child can write points directly' END;

-- ⚠ Supabase grants EXECUTE to anon on every new function by default; the
--   migration REVOKEs it. If that revoke ever stops working, a child can mint
--   themselves any number they like, and nothing else in this file would notice.
SELECT CASE WHEN NOT has_function_privilege('anon',
         'public._award_points(uuid, text, text, integer)', 'EXECUTE')
       THEN 'PASS  _award_points is not callable by anon'
       ELSE 'SECURITY FINDING  anon can call _award_points and name its own amount' END;

SELECT CASE WHEN has_function_privilege('anon', 'public.award_activity_points(text, text)', 'EXECUTE')
       THEN 'PASS  award_activity_points is callable by a child (anon)'
       ELSE 'FAIL  a child session cannot call award_activity_points' END;

-- ══ 2. the level curve ═════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: level curve'; END $$;

SELECT CASE WHEN public.points_level(0)     = 1
             AND public.points_level(300)   = 1
             AND public.points_level(301)   = 2
             AND public.points_level(800)   = 2
             AND public.points_level(801)   = 3
             AND public.points_level(9300)  = 10
             AND public.points_level(13000) = 12
             AND public.points_level(99999) = 12
       THEN 'PASS  level boundaries are exactly as specified'
       ELSE 'FAIL  level boundaries are wrong' END;

-- ══ 3. the legacy carry-over ═══════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: legacy carry-over'; END $$;

-- The migration was applied TWICE by the runner. If the backfill were not
-- guarded, Ayesha would be sitting on 2,500.
SELECT CASE WHEN (SELECT points FROM public.student_points WHERE student_id = :AYESHA) = 1250
       THEN 'PASS  1,250 legacy XP carried forward exactly once'
       ELSE 'FAIL  legacy carry-over is '
            || coalesce((SELECT points FROM public.student_points WHERE student_id = :AYESHA)::text, 'missing')
            || ', expected 1250' END;

SELECT CASE WHEN (SELECT count(*) FROM public.student_point_events
                   WHERE student_id = :AYESHA AND kind = 'legacy') = 1
       THEN 'PASS  one legacy ledger row after two migration runs'
       ELSE 'FAIL  the migration is not rerunnable: legacy paid more than once' END;

SELECT CASE WHEN (SELECT legacy_bonus FROM public.student_points WHERE student_id = :AYESHA) = 1250
       THEN 'PASS  legacy_bonus records what was carried, separately from the total'
       ELSE 'FAIL  legacy_bonus not recorded' END;

-- Nobody is demoted: 1,250 was Level 9 on the old ten-level curve and is
-- Level 3 on the new one, but the child keeps every point they earned.
SELECT CASE WHEN (SELECT level FROM public.student_points WHERE student_id = :AYESHA) = 3
       THEN 'PASS  stored level agrees with the curve' ELSE 'FAIL  stored level wrong' END;

-- ══ 4. a question pays once, ever ══════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: questions'; END $$;

SET ROLE anon;
SET request.headers = '{"x-student-token":"ayesha-token-0123456789abcdefghij"}';

SELECT CASE WHEN public.current_student_id() = :AYESHA
       THEN 'PASS  the token resolves to Ayesha (real current_student_id)'
       ELSE 'FAIL  session not resolved — every assertion below is meaningless' END;

-- A difficulty-3 question, answered correctly, first time: 3 points.
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-003","chapter_id":"g6-air","correct":true,"event_key":"k1"}]'::jsonb
       ) ->> 'awarded')::int = 3
       THEN 'PASS  a first correct L3 answer pays 3'
       ELSE 'FAIL  L3 did not pay 3' END;

-- The SAME question again. This is the rule the whole feature turns on.
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-003","chapter_id":"g6-air","correct":true,"event_key":"k2"}]'::jsonb
       ) ->> 'awarded')::int = 0
       THEN 'PASS  the same question answered right again pays 0'
       ELSE 'SECURITY FINDING  a question can be farmed for points by repeating it' END;

-- Difficulty is read from the questions table, not from anything the client said.
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-001","chapter_id":"g6-air","correct":true,"event_key":"k3"},
           {"question_id":"g6sci-air-004","chapter_id":"g6-air","correct":true,"event_key":"k4"}]'::jsonb
       ) ->> 'awarded')::int = 5
       THEN 'PASS  L1 pays 1 and L4 pays 4, from questions.difficulty'
       ELSE 'FAIL  difficulty is not driving the award' END;

-- Wrong first, then right. The child who learns it must be paid the same as the
-- child who guessed it — that is the whole pedagogy of the app.
SELECT public.record_question_progress(
  '[{"question_id":"g6sci-air-005","chapter_id":"g6-air","correct":false,"event_key":"k5"}]'::jsonb);

SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-005","chapter_id":"g6-air","correct":true,"event_key":"k6"}]'::jsonb
       ) ->> 'awarded')::int = 3
       THEN 'PASS  wrong-then-correct still pays in full'
       ELSE 'FAIL  a child who had to learn it was not paid' END;

-- A wrong answer pays nothing.
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"g6sci-air-002","chapter_id":"g6-air","correct":false,"event_key":"k7"}]'::jsonb
       ) ->> 'awarded')::int = 0
       THEN 'PASS  a wrong answer pays nothing' ELSE 'FAIL  a wrong answer paid' END;

-- An id the server has never heard of pays the floor, not the maximum.
SELECT CASE WHEN (public.record_question_progress(
         '[{"question_id":"generated-not-in-bank","chapter_id":"g6-air","correct":true,"event_key":"k8"}]'::jsonb
       ) ->> 'awarded')::int = 1
       THEN 'PASS  an unknown question id pays the floor (1)'
       ELSE 'FAIL  unknown ids are not paying the floor' END;

-- 1250 legacy + 3 + 1 + 4 + 3 + 1 = 1262
SELECT CASE WHEN (public.get_my_points() ->> 'points')::int = 1262
       THEN 'PASS  the running total is exactly right (1262)'
       ELSE 'FAIL  total is ' || (public.get_my_points() ->> 'points') || ', expected 1262' END;

-- ══ 5. games ═══════════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: games'; END $$;

SELECT CASE WHEN (public.award_activity_points('game', 'quickfire:2026-09-09:1') ->> 'awarded')::int = 5
       THEN 'PASS  a finished game run pays 5' ELSE 'FAIL  game run did not pay 5' END;

SELECT CASE WHEN (public.award_activity_points('game', 'quickfire:2026-09-09:1') ->> 'awarded')::int = 0
       THEN 'PASS  the same run replayed pays 0' ELSE 'FAIL  a run can be claimed twice' END;

SELECT public.award_activity_points('game', 'ninja:2026-09-09:1');
SELECT public.award_activity_points('game', 'explorer:2026-09-09:1');

-- The cap is ACROSS ALL GAMES, so a child cannot rotate through seven of them.
SELECT CASE WHEN (public.award_activity_points('game', 'battle:2026-09-09:1') ->> 'awarded')::int = 0
       THEN 'PASS  the 4th game run of the day pays 0 (cap is across all games)'
       ELSE 'SECURITY FINDING  games are not capped per day' END;

-- ⚠ The client never sends an amount, and cannot invent a kind that pays.
SELECT CASE WHEN (public.award_activity_points('legacy', 'v2') ->> 'error') = 'unknown_kind'
       THEN 'PASS  a client cannot mint a "legacy" award'
       ELSE 'SECURITY FINDING  award_activity_points accepts arbitrary kinds' END;

SELECT CASE WHEN (public.award_activity_points('question', 'g6sci-air-002') ->> 'error') = 'unknown_kind'
       THEN 'PASS  a client cannot mint a question award directly'
       ELSE 'SECURITY FINDING  questions can be paid without answering them' END;

SELECT CASE WHEN (public.award_activity_points('game', 'has spaces and $') ->> 'error') = 'bad_ref'
       THEN 'PASS  a malformed ref is refused' ELSE 'FAIL  ref shape is not checked' END;

-- ══ 6. timetable ═══════════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: timetable'; END $$;

SELECT CASE WHEN (public.award_activity_points('timetable', 'entry-0001') ->> 'awarded')::int = 10
       THEN 'PASS  a planned session done pays 10' ELSE 'FAIL  timetable did not pay 10' END;

-- The child's plan re-renders constantly; every one of those calls must be free.
SELECT CASE WHEN (public.award_activity_points('timetable', 'entry-0001') ->> 'awarded')::int = 0
       THEN 'PASS  re-rendering the plan pays nothing more'
       ELSE 'FAIL  a plan entry pays on every render' END;

-- ══ 7. friends — and why re-inviting pays nothing ══════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: friends'; END $$;

SELECT CASE WHEN (public.add_friend('DEV00001') ->> 'awarded')::int = 25
       THEN 'PASS  adding a friend pays 25' ELSE 'FAIL  friend add did not pay 25' END;

-- ⚠ RESET ROLE to read the tables directly. anon has NO select grant on
--   student_points — that is the design, and the failure to remember it here is
--   itself evidence the grant is real. Identity goes straight back to anon.
RESET ROLE;
SELECT CASE WHEN (SELECT points FROM public.student_points WHERE student_id = :DEV) = 25
       THEN 'PASS  the friend who was added is paid as well'
       ELSE 'FAIL  only the inviter was paid' END;
SET ROLE anon;

-- ⚠⚠ THE REQUIREMENT: unfriend, re-add, get nothing.
SELECT public.remove_friend(:DEV);

RESET ROLE;
SELECT CASE WHEN (SELECT count(*) FROM public.student_friends
                   WHERE student_id_a = :DEV OR student_id_b = :DEV) = 0
       THEN 'PASS  remove_friend really deleted the friendship'
       ELSE 'FAIL  the friendship survived, so the next assertion proves nothing' END;
SET ROLE anon;

SELECT CASE WHEN (public.add_friend('DEV00001') ->> 'awarded')::int = 0
       THEN 'PASS  delete-and-re-invite pays 0 — the ledger outlives the friendship'
       ELSE 'SECURITY FINDING  friend points can be farmed by removing and re-adding' END;

-- A brand-new account cannot be farmed this afternoon.
SELECT CASE WHEN (public.add_friend('ZOE00001') ->> 'awarded')::int = 0
       THEN 'PASS  a friend whose account is under 24h old pays nothing'
       ELSE 'SECURITY FINDING  20 throwaway accounts pay out immediately' END;

-- ...but the friendship itself is still made. The guard is on the points, not
-- on the child's ability to have friends.
RESET ROLE;
SELECT CASE WHEN EXISTS (SELECT 1 FROM public.student_friends
                          WHERE (student_id_a = :AYESHA AND student_id_b = :ZOE)
                             OR (student_id_b = :AYESHA AND student_id_a = :ZOE))
       THEN 'PASS  the friendship is still created, only the bonus is withheld'
       ELSE 'FAIL  the age guard blocked the friendship itself' END;

-- Zoe was never paid, so she must have no ledger row at all.
SELECT CASE WHEN (SELECT count(*) FROM public.student_point_events
                   WHERE student_id = :ZOE AND kind = 'friend') = 0
       THEN 'PASS  the too-new account has no friend ledger row either'
       ELSE 'FAIL  a row was written for an unpaid friendship, blocking a later legitimate award' END;
SET ROLE anon;

SELECT CASE WHEN (public.add_friend('AYESHA01') ->> 'error') = 'self'
       THEN 'PASS  a child cannot friend themselves for points' ELSE 'FAIL  self-friend allowed' END;

-- The friends board must read the SAME score as the global one. It used to rank
-- by data->>'xp', the browser-written number, which would have left the board a
-- child looks at daily cheatable while the global one was not.
SELECT CASE WHEN (SELECT xp FROM public.get_my_friends() WHERE friend_code = 'DEV00001') = 25
       THEN 'PASS  the friends board reads student_points, not the blob'
       ELSE 'FAIL  friends board xp is ' || coalesce((SELECT xp FROM public.get_my_friends() WHERE friend_code = 'DEV00001')::text,'null') END;

-- ══ 8. the leaderboard kill switch ═════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: leaderboard kill switch'; END $$;

-- ⚠ OFF BY DEFAULT, with nothing configured at all. A global board shows every
--   child a list of strangers; it must not appear because someone deployed.
SELECT CASE WHEN public.leaderboard_enabled() = false
       THEN 'PASS  the global leaderboard is OFF by default'
       ELSE 'SECURITY FINDING  the global leaderboard is on without an admin enabling it' END;

-- Off is enforced in the data, not by hiding a button.
SELECT CASE WHEN (SELECT count(*) FROM public.get_points_leaderboard(NULL, 50)) = 0
       THEN 'PASS  while off, the board returns no rows to anyone'
       ELSE 'SECURITY FINDING  the board serves rows while disabled' END;

SELECT CASE WHEN (public.get_my_points_rank(NULL) ->> 'error') = 'leaderboard_disabled'
       THEN 'PASS  while off, rank says so — distinctly from "you are last"'
       ELSE 'FAIL  rank does not report the disabled state' END;

-- A half-configured blob (the admin has touched other settings but never this
-- one) must still read as off, not as "missing therefore true".
RESET ROLE;
INSERT INTO public.mm_data (key, value) VALUES ('global_settings', '{"registration_open": true}'::jsonb)
  ON CONFLICT (key) DO UPDATE SET value = excluded.value;
SET ROLE anon;

SELECT CASE WHEN public.leaderboard_enabled() = false
       THEN 'PASS  a global_settings blob with no leaderboard key still reads OFF'
       ELSE 'SECURITY FINDING  a missing key defaults to on' END;

-- ── now switch it on, as an admin would ────────────────────────────────────
RESET ROLE;
UPDATE public.mm_data
   SET value = value || '{"leaderboard_enabled": true}'::jsonb
 WHERE key = 'global_settings';
SET ROLE anon;

SELECT CASE WHEN public.leaderboard_enabled() = true
       THEN 'PASS  an admin turning it on takes effect immediately'
       ELSE 'FAIL  the switch did not turn on' END;

-- ══ 8. the leaderboard ═════════════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: leaderboard'; END $$;

SELECT CASE WHEN (SELECT rank FROM public.get_points_leaderboard(NULL, 50) WHERE is_me) = 1
       THEN 'PASS  Ayesha leads the board and is flagged as herself'
       ELSE 'FAIL  is_me / rank wrong' END;

-- ⚠ A leaderboard is a public surface: a child sees rows about children they
--   have never met. It must carry a name and a score and nothing that lets one
--   child reach another — no student id, no friend code, no family.
SELECT CASE WHEN pg_get_function_result(
                  (SELECT oid FROM pg_proc WHERE proname = 'get_points_leaderboard')
                ) NOT ILIKE '%friend_code%'
       THEN 'PASS  the leaderboard exposes no friend_code'
       ELSE 'SECURITY FINDING  the leaderboard leaks a friend code' END;

SELECT CASE WHEN pg_get_function_result(
                  (SELECT oid FROM pg_proc WHERE proname = 'get_points_leaderboard')
                ) NOT ILIKE '%uuid%'
       THEN 'PASS  the leaderboard exposes no student id'
       ELSE 'SECURITY FINDING  the leaderboard leaks student ids' END;

-- A child ranked against their own grade, which is the only ranking that means
-- anything to them.
SELECT CASE WHEN (SELECT count(*) FROM public.get_points_leaderboard(6, 50)) >= 2
       THEN 'PASS  the board filters by grade' ELSE 'FAIL  grade filter returned too little' END;

SELECT CASE WHEN (SELECT count(*) FROM public.get_points_leaderboard(4, 50)) = 0
       THEN 'PASS  a grade with no scores is empty, not everybody'
       ELSE 'FAIL  the grade filter is not applied' END;

-- A child with 0 points is not on the board at all — a leaderboard of children
-- who have never answered anything is noise, and being last is not motivating.
SELECT CASE WHEN NOT EXISTS (
         SELECT 1 FROM public.get_points_leaderboard(NULL, 200) WHERE points = 0)
       THEN 'PASS  children with no points are not listed' ELSE 'FAIL  zero-point rows listed' END;

SELECT CASE WHEN (public.get_my_points_rank(NULL) ->> 'rank')::int = 1
       THEN 'PASS  get_my_points_rank agrees with the board' ELSE 'FAIL  rank disagrees' END;

-- ══ 9. no session, no points ═══════════════════════════════════════════════
DO $$ BEGIN RAISE NOTICE '-- points: no session'; END $$;

SET request.headers = '{}';

SELECT CASE WHEN (public.award_activity_points('game', 'quickfire:2026-09-09:9') ->> 'error')
              = 'not_a_student_session'
       THEN 'PASS  no token, no award' ELSE 'SECURITY FINDING  points awarded without a session' END;

SELECT CASE WHEN (public.get_my_points() ->> 'error') = 'not_a_student_session'
       THEN 'PASS  no token, no score read' ELSE 'FAIL  score readable without a session' END;

-- An expired or forged token is the same "no" as no token at all.
SET request.headers = '{"x-student-token":"forged-token-0123456789abcdefghijkl"}';

SELECT CASE WHEN (public.award_activity_points('timetable', 'entry-9999') ->> 'error')
              = 'not_a_student_session'
       THEN 'PASS  a forged token earns nothing'
       ELSE 'SECURITY FINDING  an unrecognised token was accepted' END;

RESET ROLE;
