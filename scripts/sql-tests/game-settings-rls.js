'use strict';
// Game Settings live in students.settings. This proves, against the LIVE
// database and inside a transaction that is always rolled back, that:
//   • a child session (anon + x-student-token) can READ its settings row
//   • that same child CANNOT update it (0 rows, no error — the RLS shape)
//   • the family's parent (authenticated JWT) CAN update it
//   • a stranger (another authenticated user) cannot
//
// It needs no fixture on disk: the family, child and session are created and
// discarded in one DO block that ends with RAISE EXCEPTION carrying the
// measurements — the exception is what rolls everything back, and the
// Management API hands the message straight back to us.
//
// Run: SUPABASE_ACCESS_TOKEN=sbp_… node scripts/sql-tests/game-settings-rls.js
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const REF   = process.env.SUPABASE_PROJECT_REF || 'xawvjwsiqhtxgpocdqgm';
if (!TOKEN) { console.error('SUPABASE_ACCESS_TOKEN is not set.'); process.exit(2); }

const SQL = `
DO $$
DECLARE
  u   uuid := gen_random_uuid();
  u2  uuid := gen_random_uuid();
  f   uuid;
  s   uuid;
  tok text := 'gs-rls-' || replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
  n   int;
  r   jsonb := '{}'::jsonb;
BEGIN
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
  VALUES (u,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'gs-rls-' || u  || '@example.invalid', '', now(), now(), '{}', '{}'),
         (u2, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'gs-rls-' || u2 || '@example.invalid', '', now(), now(), '{}', '{}');
  INSERT INTO public.profiles (id, role, full_name) VALUES (u, 'parent', 'GS RLS probe'), (u2, 'parent', 'GS RLS stranger')
  ON CONFLICT (id) DO UPDATE SET role = 'parent';
  INSERT INTO public.families (parent_id, family_name) VALUES (u, 'gs-rls-probe-' || u) RETURNING id INTO f;
  INSERT INTO public.students (family_id, username, display_name, pin, settings, grade)
  VALUES (f, 'gsprobe', 'GS Probe', '0000', '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb, 5) RETURNING id INTO s;
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(extensions.digest(tok, 'sha256'), 'hex'), s, now() + interval '1 hour');

  -- 1. The child: anon role + the session token header, no JWT.
  PERFORM set_config('request.headers', json_build_object('x-student-token', tok)::text, true);
  PERFORM set_config('request.jwt.claims', '', true);
  PERFORM set_config('request.jwt.claim.sub', '', true);
  SET LOCAL ROLE anon;
  r := r || jsonb_build_object('child_resolves', (SELECT public.current_student_id() = s));
  r := r || jsonb_build_object('child_reads_own_row', (SELECT count(id) FROM public.students WHERE id = s));
  r := r || jsonb_build_object('child_reads_settings', (SELECT settings IS NOT NULL FROM public.students WHERE id = s));
  UPDATE public.students SET settings = settings || '{"games":{"mode":"custom","subjects":["maths"]}}'::jsonb WHERE id = s;
  GET DIAGNOSTICS n = ROW_COUNT;
  r := r || jsonb_build_object('child_update_rows', n);
  RESET ROLE;
  r := r || jsonb_build_object('games_after_child', (SELECT settings -> 'games' FROM public.students WHERE id = s));

  -- 2. A stranger: authenticated, but not in the family.
  PERFORM set_config('request.headers', '', true);
  PERFORM set_config('request.jwt.claims', json_build_object('sub', u2, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', u2::text, true);
  SET LOCAL ROLE authenticated;
  UPDATE public.students SET settings = settings || '{"games":{"mode":"weak"}}'::jsonb WHERE id = s;
  GET DIAGNOSTICS n = ROW_COUNT;
  r := r || jsonb_build_object('stranger_update_rows', n);
  RESET ROLE;

  -- 3. The parent: authenticated with their own JWT sub.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', u, 'role', 'authenticated')::text, true);
  PERFORM set_config('request.jwt.claim.sub', u::text, true);
  SET LOCAL ROLE authenticated;
  UPDATE public.students SET settings = settings || '{"games":{"mode":"weak","roundLength":15,"subjects":["maths","science"]}}'::jsonb WHERE id = s;
  GET DIAGNOSTICS n = ROW_COUNT;
  r := r || jsonb_build_object('parent_update_rows', n);
  r := r || jsonb_build_object('parent_reads_back', (SELECT settings -> 'games' ->> 'roundLength' FROM public.students WHERE id = s));
  RESET ROLE;
  r := r || jsonb_build_object('games_after_parent', (SELECT settings -> 'games' FROM public.students WHERE id = s));
  r := r || jsonb_build_object('other_settings_kept', (SELECT settings ->> 'maxDifficulty' FROM public.students WHERE id = s));

  RAISE EXCEPTION 'GS_RLS_RESULT %', r::text;
END $$;`;

(async () => {
  const r = await fetch('https://api.supabase.com/v1/projects/' + REF + '/database/query', {
    method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SQL }),
  });
  const text = await r.text();
  const i = text.indexOf('GS_RLS_RESULT ');
  if (i < 0) { console.error('HARNESS FAIL: no result marker in reply (HTTP ' + r.status + '): ' + text.slice(0, 600)); process.exit(1); }
  const tail = text.slice(i + 'GS_RLS_RESULT '.length);
  let depth = 0, end = -1;
  for (let k = 0; k < tail.length; k++) { if (tail[k] === '{') depth++; else if (tail[k] === '}') { depth--; if (!depth) { end = k + 1; break; } } }
  const m = JSON.parse(tail.slice(0, end).replace(/\\"/g, '"'));
  let fails = 0;
  const ck = (name, ok, detail) => { if (ok) { console.log('  ok   ' + name); return; } fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : '')); };
  ck('the fixture session resolves to the child', m.child_resolves === true, JSON.stringify(m.child_resolves));
  ck('the child can read its own students row', m.child_reads_own_row === 1, JSON.stringify(m.child_reads_own_row));
  ck('…including settings (games settings reach the child)', m.child_reads_settings === true);
  ck('the child\'s UPDATE of settings touches 0 rows', m.child_update_rows === 0, JSON.stringify(m.child_update_rows));
  ck('and left no games key behind', m.games_after_child === null, JSON.stringify(m.games_after_child));
  ck('a stranger\'s UPDATE touches 0 rows', m.stranger_update_rows === 0, JSON.stringify(m.stranger_update_rows));
  ck('the parent\'s UPDATE touches 1 row', m.parent_update_rows === 1, JSON.stringify(m.parent_update_rows));
  ck('the parent reads the new value back', m.parent_reads_back === '15', JSON.stringify(m.parent_reads_back));
  ck('the saved games object is intact', m.games_after_parent && m.games_after_parent.mode === 'weak' && Array.isArray(m.games_after_parent.subjects), JSON.stringify(m.games_after_parent));
  ck('the other restriction keys survived the merge', m.other_settings_kept === '4', JSON.stringify(m.other_settings_kept));
  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed (transaction rolled back — nothing was written)');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e.message); process.exit(1); });
