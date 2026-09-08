'use strict';
// learning_materials must be readable only by the teacher who uploaded it (and
// by an admin). This proves it against the LIVE database, inside a transaction
// that is always rolled back.
//
// Why it exists: the SELECT policy used to ask only "is the caller a teacher",
// with no ownership arm, and neither client query filtered by owner — so every
// teacher read every other teacher's uploads, which routinely carry pupil names
// and marks. The Delete button rendered on those rows too, where the DELETE
// policy (correctly owner-scoped) refused it: a button that was simply a lie.
//
// ⚠ The USING clause is also evaluated on INSERT whenever the statement carries
//   RETURNING, which PostgREST emits for every .insert().select(). Ownership is
//   a same-row column test so it still passes — but widening families_own with a
//   predicate that had to LOOK THE ROW UP broke family creation for two days,
//   which is why that case is asserted here rather than reasoned about.
//
// ⚠ Everything runs as `authenticated`, never the superuser. RLS does not apply
//   to a superuser, which once made every "can see the row" check pass for a
//   total stranger.
//
// It needs no fixture on disk: two teachers, one admin and two materials are
// created and discarded in one DO block that ends with RAISE EXCEPTION carrying
// the measurements — the exception is what rolls everything back.
//
// Run: SUPABASE_ACCESS_TOKEN=sbp_… node scripts/sql-tests/materials-rls.js
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const REF   = process.env.SUPABASE_PROJECT_REF || 'xawvjwsiqhtxgpocdqgm';
if (!TOKEN) { console.error('SUPABASE_ACCESS_TOKEN is not set.'); process.exit(2); }

const SQL = `
DO $$
DECLARE
  t1   uuid := gen_random_uuid();   -- owns both fixture materials
  t2   uuid := gen_random_uuid();   -- another teacher, owns none
  adm  uuid := gen_random_uuid();   -- an admin
  par  uuid := gen_random_uuid();   -- an ordinary signed-in parent
  m1   uuid;
  n    int;
  r    jsonb := '{}'::jsonb;
BEGIN
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password,
                          created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
  SELECT u, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'mat-rls-' || u || '@example.invalid', '', now(), now(), '{}'::jsonb, '{}'::jsonb
  FROM unnest(ARRAY[t1, t2, adm, par]) AS u;

  INSERT INTO public.profiles (id, full_name, role) VALUES
    (t1,  'Fixture Teacher One', 'teacher'),
    (t2,  'Fixture Teacher Two', 'teacher'),
    (adm, 'Fixture Admin',       'admin'),
    (par, 'Fixture Parent',      'parent');

  INSERT INTO public.learning_materials (teacher_id, title, file_path, file_name)
  VALUES (t1, 'mat-rls fixture A', 'mat-rls/a.pdf', 'a.pdf') RETURNING id INTO m1;
  INSERT INTO public.learning_materials (teacher_id, title, file_path, file_name)
  VALUES (t1, 'mat-rls fixture B', 'mat-rls/b.pdf', 'b.pdf');

  -- ── the owner ────────────────────────────────────────────────────────────
  PERFORM set_config('request.jwt.claims', json_build_object('sub', t1, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', t1::text, true);
  SET LOCAL ROLE authenticated;
  r := r || jsonb_build_object('owner_sees',
    (SELECT count(*) FROM public.learning_materials WHERE title LIKE 'mat-rls%'));
  RESET ROLE;

  -- ── another teacher: the whole point of the fix ──────────────────────────
  PERFORM set_config('request.jwt.claims', json_build_object('sub', t2, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', t2::text, true);
  SET LOCAL ROLE authenticated;
  r := r || jsonb_build_object('other_teacher_sees',
    (SELECT count(*) FROM public.learning_materials WHERE title LIKE 'mat-rls%'));

  -- that teacher can still create one and read it straight back
  WITH ins AS (
    INSERT INTO public.learning_materials (teacher_id, title, file_path, file_name)
    VALUES (auth.uid(), 'mat-rls own', 'mat-rls/own.pdf', 'own.pdf')
    RETURNING id
  ) SELECT count(*) INTO n FROM ins;
  r := r || jsonb_build_object('own_insert_returning', n);
  r := r || jsonb_build_object('other_teacher_sees_after',
    (SELECT count(*) FROM public.learning_materials WHERE title LIKE 'mat-rls%'));

  -- and cannot delete someone else's, which is what the button used to imply
  DELETE FROM public.learning_materials WHERE id = m1;
  GET DIAGNOSTICS n = ROW_COUNT;
  r := r || jsonb_build_object('other_teacher_delete_rows', n);
  RESET ROLE;

  -- ── an admin still sees everything ──────────────────────────────────────
  PERFORM set_config('request.jwt.claims', json_build_object('sub', adm, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', adm::text, true);
  SET LOCAL ROLE authenticated;
  r := r || jsonb_build_object('admin_sees',
    (SELECT count(*) FROM public.learning_materials WHERE title LIKE 'mat-rls%'));
  RESET ROLE;

  -- ── a signed-in parent is not a teacher and sees nothing ────────────────
  PERFORM set_config('request.jwt.claims', json_build_object('sub', par, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', par::text, true);
  SET LOCAL ROLE authenticated;
  r := r || jsonb_build_object('parent_sees',
    (SELECT count(*) FROM public.learning_materials WHERE title LIKE 'mat-rls%'));
  RESET ROLE;

  r := r || jsonb_build_object('select_policy',
    (SELECT pg_get_expr(polqual, polrelid) FROM pg_policy
      WHERE polrelid = 'public.learning_materials'::regclass
        AND polname = 'teachers can read materials'));

  RAISE EXCEPTION 'MAT_RLS_RESULT %', r::text;
END $$;`;

(async () => {
  const r = await fetch('https://api.supabase.com/v1/projects/' + REF + '/database/query', {
    method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SQL }),
  });
  const text = await r.text();
  const i = text.indexOf('MAT_RLS_RESULT ');
  if (i < 0) { console.error('HARNESS FAIL: no result marker in reply (HTTP ' + r.status + '): ' + text.slice(0, 700)); process.exit(1); }
  const tail = text.slice(i + 'MAT_RLS_RESULT '.length);
  let depth = 0, end = -1;
  for (let k = 0; k < tail.length; k++) { if (tail[k] === '{') depth++; else if (tail[k] === '}') { depth--; if (!depth) { end = k + 1; break; } } }
  const m = JSON.parse(tail.slice(0, end).replace(/\\"/g, '"'));

  let fails = 0;
  const ck = (name, ok, detail) => {
    if (ok) { console.log('  ok   ' + name); return; }
    fails++; console.log('  FAIL ' + name + (detail !== undefined ? '  -> ' + detail : ''));
  };
  ck('the owner sees both of their own materials', m.owner_sees === 2, JSON.stringify(m.owner_sees));
  ck('another teacher sees NONE of them', m.other_teacher_sees === 0, JSON.stringify(m.other_teacher_sees));
  ck('that teacher can still INSERT ... RETURNING their own', m.own_insert_returning === 1, JSON.stringify(m.own_insert_returning));
  ck('…and then sees exactly their own one', m.other_teacher_sees_after === 1, JSON.stringify(m.other_teacher_sees_after));
  ck('their DELETE of someone else\'s row touches 0 rows', m.other_teacher_delete_rows === 0, JSON.stringify(m.other_teacher_delete_rows));
  ck('an admin still sees all three', m.admin_sees === 3, JSON.stringify(m.admin_sees));
  ck('a signed-in parent sees none', m.parent_sees === 0, JSON.stringify(m.parent_sees));
  ck('the policy still carries an ownership arm',
    typeof m.select_policy === 'string' && m.select_policy.includes('teacher_id = auth.uid()'),
    JSON.stringify(m.select_policy));

  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed (transaction rolled back — nothing was written)');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e.message); process.exit(1); });
