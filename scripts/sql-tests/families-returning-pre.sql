-- Proves the fixture reproduces the reported failure before the repair runs,
-- AND that the two INSERT forms differ - which is the whole finding. If the
-- plain INSERT ever fails too, the fixture has the WITH CHECK wrong and the
-- assertions afterwards would be passing for the wrong reason.
--
-- ⚠ Wrapped in a transaction that ROLLS BACK. The plain INSERT genuinely
--   succeeds, and families.parent_id is UNIQUE - leaving that row behind made
--   the real assertions fail with 23505 instead of testing anything.
BEGIN;
SET LOCAL ROLE authenticated;
SET LOCAL test.uid = '11111111-1111-1111-1111-111111111111';

DO $pre$
DECLARE r1 text; r2 text; v uuid;
BEGIN
  BEGIN
    INSERT INTO public.families (parent_id, family_name)
    VALUES ('11111111-1111-1111-1111-111111111111', 'Plain');
    r1 := 'plain INSERT: OK';
  EXCEPTION WHEN others THEN r1 := 'plain INSERT: ' || SQLSTATE; END;

  BEGIN
    INSERT INTO public.families (parent_id, family_name)
    VALUES ('22222222-2222-2222-2222-222222222222', 'Returning')
    RETURNING id INTO v;
    r2 := 'INSERT..RETURNING: OK';
  EXCEPTION WHEN others THEN r2 := 'INSERT..RETURNING: ' || SQLSTATE; END;

  RAISE NOTICE 'PRE % | %', r1, r2;
  IF r1 <> 'plain INSERT: OK' THEN
    RAISE EXCEPTION 'fixture is wrong: the WITH CHECK is refusing a plain INSERT too';
  END IF;
  IF r2 <> 'INSERT..RETURNING: 42501' THEN
    RAISE EXCEPTION 'fixture did not reproduce the bug: RETURNING gave %', r2;
  END IF;
END $pre$;

ROLLBACK;
