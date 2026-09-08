'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  A pupil correcting their own name, and the teacher's trail of every change.
//
//  ⚠ THE WHOLE FEATURE RESTS ON ONE FACT ABOUT teacher_guest_open():
//        classroom_pin mode →  key := pupil.id::text;  display := pupil.name;
//        shared_pin    mode →  display := btrim(p_name);   (the name IS the key)
//    So a rename is safe in the first mode and destructive in the second. Every
//    layer here — the RPC, the Lambda, the button — refuses the second mode,
//    and this file asserts each of them separately rather than trusting one.
//
//  ⚠ A name is not a credential, but it is how a teacher recognises a child.
//    A child quietly taking another child's name must leave a trace, so every
//    change is recorded with WHO made it — by a trigger on the column, which no
//    caller can bypass.
//
//  Run: node scripts/test-pupil-name-edit.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const mig    = fs.readFileSync(path.join(ROOT, 'migrations/20260908_pupil_name_edit.sql'), 'utf8');
const fnSrc  = fs.readFileSync(path.join(ROOT, 'netlify/functions/pupil-name.js'), 'utf8');
const guest  = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const gHtml  = fs.readFileSync(path.join(ROOT, 'guest.html'), 'utf8');
const detail = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');
const toml   = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const css    = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · identity is never moved ───────────────────────────────────────────
section('the rename moves the label, never the key');
{
  const fn = mig.slice(mig.indexOf('FUNCTION public.guest_set_my_name'), mig.indexOf('teacher_pupil_name_history'));
  // ⚠ THE assertion of this feature. name_key is the join for submissions, PIN
  //   attempts and material ticks; writing to it would orphan all three.
  // Assert on the SET clauses directly: name_key legitimately appears in WHERE
  // and AND predicates all over this function, so stripping them one phrasing at
  // a time is a losing game — what matters is that nothing ASSIGNS to it.
  // ⚠ Match the ASSIGNMENT POSITION, not "SET … somewhere … name_key".
  // `UPDATE … SET name_display = v_new WHERE name_key = v_key` legitimately has
  // name_key after a SET, and a span-based regex reads that as an assignment —
  // it failed on correct code twice before this was narrowed. An assignment is
  // either the first column after SET, or one after a comma.
  ck('guest_set_my_name never assigns to name_key',
    !/\bSET\s+name_key\b/.test(fn) && !/,\s*name_key\s*=/.test(fn),
    (fn.match(/\bSET\s+\w+/g) || []).join(' | '));
  ck('it updates the roster name', /UPDATE public\.teacher_guest_pupils SET name = v_new/.test(fn));
  // ⚠ …and the snapshots, or the teacher sees the OLD name against work already
  //   handed in, which is the confusion this is meant to remove.
  ck('it refreshes the submission name snapshot',
    /UPDATE public\.guest_submissions SET name_display = v_new WHERE name_key = v_key/.test(fn));
  ck('it refreshes the material-completion snapshot',
    /UPDATE public\.guest_material_completions SET name_display = v_new WHERE name_key = v_key/.test(fn));

  // ⚠ Only the per-pupil-PIN mode, recognised by the key being a UUID.
  ck('shared-PIN sign-ins are refused by shape, not by trust',
    /v_key !~ '\^\[0-9a-f\]\{8\}-/.test(fn) && /'not_supported'/.test(fn));
  ck('an inactive or missing pupil is refused', /'no_pupil'/.test(fn));
  ck('a bad session token is refused', /'bad_token'/.test(fn));
  ck('the session hash is the credential, not the submit hash',
    /v_sub\.session_token_hash/.test(fn) && !/v_sub\.open_token_hash/.test(fn));
}

// ── 2 · the name itself ───────────────────────────────────────────────────
section('what counts as a name');
{
  const fn = mig.slice(mig.indexOf('FUNCTION public.guest_set_my_name'));
  ck('control characters are stripped', /regexp_replace\(coalesce\(p_new_name, ''\), '\[\[:cntrl:\]\]\+'/.test(fn));
  ck('runs of whitespace collapse', /regexp_replace\(v_new, '\\s\+', ' ', 'g'\)/.test(fn));
  ck('2 to 40 characters', /length\(v_new\) < 2 OR length\(v_new\) > 40/.test(fn));
  ck('…and the client checks the same bounds so an empty box costs no round trip',
    /newName\.length < 2 \|\| newName\.length > 40/.test(fnSrc));
  ck('the browser uses the SERVER-cleaned name, not its own text',
    /S\.name = r\.name \|\| clean/.test(guest));
}

// ── 3 · the trail ─────────────────────────────────────────────────────────
section('every change is recorded, with who made it');
{
  ck('a history table exists', /CREATE TABLE IF NOT EXISTS public\.teacher_guest_pupil_names/.test(mig));
  // ⚠ A trigger, so a second write path (the teacher's own rename) cannot be
  //   missed, now or later.
  ck('it is written by a trigger on the column, not by the RPC',
    /CREATE TRIGGER teacher_guest_pupils_name_log/.test(mig)
    && /AFTER INSERT OR UPDATE OF name ON public\.teacher_guest_pupils/.test(mig));
  ck('who made the change is derived, never supplied by the caller',
    /CASE WHEN auth\.uid\(\) IS NOT NULL THEN 'teacher' ELSE 'pupil' END/.test(mig));
  ck('a save that changes nothing writes no history row',
    /IS NOT DISTINCT FROM coalesce\(NEW\.name, ''\)/.test(mig));
  ck('the teacher read is scoped to their own classrooms',
    /teacher_guest_classes c ON c\.id = p\.classroom_id[\s\S]{0,120}teacher_id = auth\.uid\(\)/.test(mig));
  ck('the creation row is filtered out of the teacher view', /h\.old_name IS NOT NULL/.test(mig));
  ck('RLS is on', /ALTER TABLE public\.teacher_guest_pupil_names ENABLE ROW LEVEL SECURITY/.test(mig));
  ck('no direct write grant', /REVOKE ALL ON public\.teacher_guest_pupil_names FROM anon, authenticated/.test(mig));
  ck('the teacher RPC revokes anon explicitly, not just PUBLIC',
    /REVOKE ALL ON FUNCTION public\.teacher_pupil_name_history\(uuid\) FROM anon/.test(mig));
  ck('the pupil RPC is granted to anon', /guest_set_my_name\(text, text, text, text\) TO anon, authenticated/.test(mig));
  ck('the migration is idempotent', (mig.match(/IF NOT EXISTS/g) || []).length >= 3);
}

// ── 4 · the endpoint ──────────────────────────────────────────────────────
section('the Lambda');
{
  ck('POST only', /method_not_allowed/.test(fnSrc));
  ck('a missing service key fails closed', /not_configured/.test(fnSrc) && /503/.test(fnSrc));
  ck('it forwards to the RPC and writes no table itself',
    /rpc\/guest_set_my_name/.test(fnSrc) && !/teacher_guest_pupils/.test(fnSrc));
  ck('the RPC verdict passes through unchanged', /JSON\.stringify\(out \|\| \{ ok: false/.test(fnSrc));
  ck('there is a timeout', /AbortSignal\.timeout/.test(fnSrc));
  ck('the route is redirected', /from   = "\/api\/pupil-name"/.test(toml));
}

// ── 5 · the pupil's button ────────────────────────────────────────────────
section('guest.html');
{
  ck('the button exists and starts hidden', /id="h-rename"[^>]*hidden/.test(gHtml));
  // ⚠ Not offered in shared-PIN mode. A child must never be shown a control
  //   that the server will refuse.
  ck('it is only shown for a per-pupil PIN sign-in',
    /S\.access === 'classroom_pin' && !!S\.token/.test(guest));
  ck('the listener is wired once, not on every render', /renameBtn\._wired/.test(guest));
  ck('cancelling the prompt changes nothing', /if \(next === null\) return;/.test(guest));
  ck('an unchanged name is a no-op', /if \(clean === current\) return;/.test(guest));
  ck('a refusal is explained rather than swallowed', /Could not change your name/.test(guest));
  ck('the shared-PIN refusal has its own honest message',
    /not_supported/.test(guest) && /shared PIN/.test(guest));
  ck('an expired PIN has its own message', /bad_token/.test(guest) && /Enter your PIN again/.test(guest));
}

// ── 6 · the teacher's view ────────────────────────────────────────────────
section('the classroom Pupils section');
{
  ck('the trail is rendered', /_nameHistoryHtml\(\)/.test(detail));
  ck('nothing is shown when there are no renames', /if \(!list\.length\) return '';/.test(detail));
  ck('both names are escaped', /esc\(h\.old_name \|\| '\?'\)/.test(detail) && /esc\(h\.new_name \|\| '\?'\)/.test(detail));
  ck('it says who made each change', /changed by the pupil/.test(detail) && /changed by you/.test(detail));
  ck('it is collapsed by default', /<details class="tc-cd-name-history"/.test(detail));
  ck('the list is bounded and says so', /Showing the 20 most recent/.test(detail));
  // ⚠ A failed trail must not take the pupil list down with it.
  ck('a failed history read still renders the pupils',
    /catch \(_\) \{ \/\* the pupil list still renders without it \*\//.test(detail));
  ck('the trail resets when another classroom opens', /_nameChanges = \[\];/.test(detail));
  ck('the pupil badge is the tinted one, since it is the case worth noticing',
    /\.tc-cd-name-who-pupil\s*\{ background: #fef3c7/.test(css));
  ck('the summary is a 44px target', /\.tc-cd-name-history summary \{[^}]*min-height: 44px/.test(css));
  ck('it is styled for the chalkboard too', /#screen-teacher#screen-teacher \.tc-cd-name-who-pupil/.test(css));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
