'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  "I have done this" — a pupil marking a PDF, video or link as attempted.
//
//  ⚠ THE POINT OF THIS FEATURE IS THAT NOTHING CAN BE MARKED. A guest
//  assignment is a quiz: guest_submit() re-grades it server-side and the teacher
//  sees a real score. A worksheet or a YouTube lesson has no such evidence, so
//  the only signal available is the pupil's own word. Most of this file asserts
//  that neither surface ever dresses that up as a result — because a self-report
//  presented beside a marked score is the one way this feature does harm.
//
//  ⚠ The second theme is the token. guest_submit() NULLs open_token_hash ("one
//  token, one submission"), so a separate session_token_hash authorises marking
//  and survives submission — ticking a worksheet after handing in the quiz is
//  normal, not an attack. It can never submit anything.
//
//  Run: node scripts/test-material-done.js
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

const mig    = fs.readFileSync(path.join(ROOT, 'migrations/20260908_material_completions.sql'), 'utf8');
const fnSrc  = fs.readFileSync(path.join(ROOT, 'netlify/functions/material-done.js'), 'utf8');
const guest  = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const gHtml  = fs.readFileSync(path.join(ROOT, 'guest.html'), 'utf8');
const detail = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');
const toml   = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const css    = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · it is a claim, not a mark ─────────────────────────────────────────
section('the wording never claims the work was marked');
{
  // The teacher-facing string is the one that matters most.
  ck('the teacher chip says "said they have done this"',
    /said they have done this/.test(detail), 'chip text not found');
  ck('…and never calls it completed or a score',
    !/completed this|scored|marked this/i.test(detail.slice(detail.indexOf('_doneChip'), detail.indexOf('_doneChip') + 900)));
  ck('the pupil button says "I have done this", not "Completed"',
    /I have done this/.test(guest) && !/>Completed</.test(guest));
  ck('the migration states the claim/score distinction in writing',
    /CLAIM, NOT A SCORE/.test(mig));
  ck('the endpoint states it too', /CLAIM, NOT A MARK/.test(fnSrc));
}

// ── 2 · the token rules ───────────────────────────────────────────────────
section('the session credential');
{
  ck('a session_token_hash column is added', /ADD COLUMN IF NOT EXISTS session_token_hash/.test(mig));
  // ⚠ A trigger, so no branch of guest_open() can be missed.
  ck('it is populated by a trigger, not by editing guest_open',
    /CREATE TRIGGER guest_submissions_keep_session_token/.test(mig));
  ck('the trigger fires on INSERT and on the token being updated',
    /BEFORE INSERT OR UPDATE OF open_token_hash/.test(mig));
  ck('it only copies a non-null token', /IF NEW\.open_token_hash IS NOT NULL/.test(mig));
  ck('guest_mark_material checks the session hash, not the submit hash',
    /v_sub\.session_token_hash IS NULL/.test(mig) && !/v_sub\.open_token_hash/.test(mig));
  ck('a wrong or missing token is refused', /'bad_token'/.test(mig));
  // ⚠ The safety property: this credential must not be able to submit.
  ck('guest_mark_material never writes a score, answers or submitted_at',
    !/\bscore\b|\banswers\b|submitted_at\s*=/.test(
      mig.slice(mig.indexOf('FUNCTION public.guest_mark_material'), mig.indexOf('teacher_material_completions'))));
}

// ── 3 · authorisation ─────────────────────────────────────────────────────
section('who may mark what');
{
  ck('the material must be shared with the pupil\'s own classroom',
    /FROM public\.classroom_materials[\s\S]{0,120}WHERE material_id = p_material_id AND classroom_id = v_class/.test(mig));
  ck('…and is refused otherwise', /'not_shared'/.test(mig));
  ck('the classroom comes from the assignment, not from the caller',
    /SELECT classroom_id INTO v_class FROM public\.teacher_guest_access/.test(mig));
  ck('a pupil with no open session is refused', /'no_session'/.test(mig));
  ck('the teacher read is scoped to classrooms they own',
    /teacher_guest_classes[\s\S]{0,80}teacher_id = auth\.uid\(\)/.test(mig));

  // ⚠ Grants. A guest is anon; a teacher is authenticated. And REVOKE FROM
  //   PUBLIC does not remove Supabase's default anon grant — measured on the
  //   live database, which is why the explicit anon revoke exists.
  ck('the pupil RPC is granted to anon AND authenticated',
    /GRANT EXECUTE ON FUNCTION public\.guest_mark_material[\s\S]{0,80}TO anon, authenticated/.test(mig));
  ck('the teacher RPC explicitly revokes anon, not just PUBLIC',
    /REVOKE ALL ON FUNCTION public\.teacher_material_completions\(uuid\) FROM anon/.test(mig));
  ck('the table has no direct write grant', /REVOKE ALL ON public\.guest_material_completions FROM anon, authenticated/.test(mig));
  ck('…only SELECT for a teacher', /GRANT SELECT ON public\.guest_material_completions TO authenticated/.test(mig));
  ck('RLS is enabled on the table', /ALTER TABLE public\.guest_material_completions ENABLE ROW LEVEL SECURITY/.test(mig));
  ck('the migration is idempotent', (mig.match(/IF NOT EXISTS/g) || []).length >= 4);
}

// ── 4 · the endpoint ──────────────────────────────────────────────────────
section('the Lambda');
{
  ck('it is POST only', /method_not_allowed/.test(fnSrc));
  // ⚠ Fail closed. A missing service key must never mean "skip the check".
  ck('a missing service key fails closed with 503', /not_configured/.test(fnSrc) && /503/.test(fnSrc));
  ck('the material id is shape-checked as a uuid', /UUID_RE\.test\(materialId\)/.test(fnSrc));
  ck('inputs are length-capped', /code\.length > 32/.test(fnSrc) && /name\.length > 80/.test(fnSrc));
  ck('it forwards to the RPC rather than writing the table itself',
    /rpc\/guest_mark_material/.test(fnSrc) && !/guest_material_completions/.test(fnSrc));
  // ⚠ Never turn a refusal into a success.
  ck('the RPC verdict is passed through unchanged', /JSON\.stringify\(out \|\| \{ ok: false/.test(fnSrc));
  ck('the request has a timeout', /AbortSignal\.timeout/.test(fnSrc));
  ck('the route is redirected in netlify.toml', /from   = "\/api\/material-done"/.test(toml));
}

// ── 5 · the pupil page ────────────────────────────────────────────────────
section('guest.html');
{
  ck('the button is only drawn once the PIN token exists',
    /const doneMark = S\.token && m\.id/.test(guest));
  // ⚠ The state must follow the SERVER, never an optimistic guess.
  // ⚠ Asserted by ORDER, not by a character-window regex: the failure branch
  // must bail out before the local state is touched. A window that happened to
  // be too short for the alert text failed this on correct code, which is the
  // kind of assertion that gets deleted rather than fixed.
  {
    const fn = guest.slice(guest.indexOf('async function markMaterialDone'));
    const iGuard = fn.indexOf('if (!r || !r.ok)');
    const iReturn = fn.indexOf('return;', iGuard);
    const iSet = fn.indexOf('S.doneMaterials[id] = true');
    ck('the tick only changes after the server agrees',
      iGuard > 0 && iReturn > iGuard && iSet > iReturn,
      'guard@' + iGuard + ' return@' + iReturn + ' set@' + iSet);
  }
  ck('a failure restores the old label and says so', /btn\.textContent = label;/.test(guest));
  ck('an expired PIN gets its own message', /bad_token/.test(guest) && /Enter your PIN again/.test(guest));
  ck('the control is disabled while in flight', /btn\.disabled = true;/.test(guest));
  ck('it can be unticked', /done: want/.test(guest) && /delete S\.doneMaterials\[id\]/.test(guest));
  ck('aria-pressed reflects the state', /aria-pressed="' \+ \(S\.doneMaterials\[m\.id\] \? 'true' : 'false'\)/.test(guest));
  ck('the button is a 44px target', /\.res-done\{[^}]*min-height:44px/.test(gHtml.replace(/\s*\n\s*/g, '')));
  // ⚠ Colour is never the only signal.
  ck('done state changes the words as well as the colour',
    /'✓ I have done this' : 'Mark as done'/.test(guest));
}

// ── 6 · the teacher view ──────────────────────────────────────────────────
section('the classroom Materials section');
{
  ck('a chip is rendered per material', /_doneChip\(f\.id\)/.test(detail));
  ck('nothing is shown when nobody has ticked it', /if \(!done\) return '';/.test(detail));
  ck('the count is shown against the class size', /' of ' \+ expected/.test(detail));
  ck('the names are in a title, not on the card', /title="\$\{esc\(names\.slice\(0, 30\)/.test(detail));
  ck('names are escaped', /esc\(names\.slice/.test(detail));
  // ⚠ A failed count must not take the materials list down with it.
  ck('a failed completion read still renders the materials',
    /catch \(_\) \{ \/\* chips stay absent \*\//.test(detail));
  ck('the completion state resets when another classroom opens',
    /_matDone = \{ expected: 0, materials: \{\} \};[\s\S]{0,400}_reset|_materials = \[\];\s*\n\s*_matDone = /.test(detail));
  ck('the chip is styled for both the sheet and the chalkboard',
    /\.tc-cd-done-chip \{/.test(css) && /#screen-teacher#screen-teacher \.tc-cd-done-chip/.test(css));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
