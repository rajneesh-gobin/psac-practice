'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Returning a child to the screen they were on after a full refresh.
//
//  ⚠ WHY THIS EXISTS. activateSubjectPack() has persisted the child's subject
//  to sessionStorage for a long time — child-scoped, with a comment saying it
//  must survive a refresh — and auth.js dutifully re-ensured the pack on the
//  way back in. Then it threw the screen away and called StudentHome.open()
//  regardless, so a child browsing French chapters who refreshed was dropped on
//  the home hub. It read as being kicked out of the subject even though the
//  subject had, in fact, already been restored.
//
//  The rules that matter are all about what must NOT be restored:
//    - a screen that does not repaint itself comes back blank or stale;
//    - a subject screen with no pack comes back empty;
//    - a screen belonging to a SIBLING must never be restored on a shared
//      phone, which is why the owner is stamped beside the screen id.
//
//  Run: node scripts/test-screen-restore.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++;
  console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const app  = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const auth = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');

// ── 1. Run the real restoreKidScreen() against a stubbed app ──────────────
// Extracted and executed rather than pattern-matched: the whole value of an
// allowlist is what it REFUSES, and only running it proves that.
section('restoreKidScreen decides correctly');
{
  const start = app.indexOf('const _REFRESH_RESTORE_SCREENS');
  const end   = app.indexOf('\n}', app.indexOf('async function restoreKidScreen'));
  ck('the restore block can be extracted from app.js', start > 0 && end > start);
  const src = app.slice(start, end + 2);

  const calls = [];
  const ctx = vm.createContext({
    console,
    SubjectHub:  { open: async id => { calls.push('SubjectHub.open:' + id); } },
    PracticeHub: { open: () => { calls.push('PracticeHub.open'); } },
    showScreen:  id => { calls.push('showScreen:' + id); },
  });
  vm.runInContext(src + '\nthis.restoreKidScreen = restoreKidScreen;'
    + '\nthis.RESTORE = _REFRESH_RESTORE_SCREENS;'
    + '\nthis.PACKDEP = _PACK_DEPENDENT_SCREENS;', ctx);
  const run = async (id, pack) => { calls.length = 0; const r = await ctx.restoreKidScreen(id, pack); return { r, calls: calls.slice() }; };

  (async () => {
    // The reported case: browsing French chapters, refresh.
    let out = await run('subject-hub', 'grade5-french');
    ck('subject-hub is restored through SubjectHub.open with the pack id',
      out.r === true && out.calls[0] === 'SubjectHub.open:grade5-french', JSON.stringify(out));
    ck('…not through a bare showScreen, which would keep the previous subject',
      !out.calls.some(c => c.startsWith('showScreen')));

    out = await run('practice-hub', 'grade5-french');
    ck('practice-hub is restored through PracticeHub.open',
      out.r === true && out.calls[0] === 'PracticeHub.open', JSON.stringify(out));

    out = await run('analytics', null);
    ck('a dispatch-rendered screen is restored with showScreen',
      out.r === true && out.calls[0] === 'showScreen:analytics', JSON.stringify(out));

    // ⚠ The refusals are the point.
    for (const id of ['subject-hub', 'chapter-select', 'syllabus']) {
      out = await run(id, null);
      ck(id + ' is REFUSED with no restored pack (it would open empty)',
        out.r === false && out.calls.length === 0, JSON.stringify(out));
    }
    for (const id of ['search', 'cloze-play', 'results', 'assignment-complete', 'exam', 'practice',
                      'minigames', 'admin', 'parent', 'teacher', 'forum', 'landing', 'auth',
                      'family-setup', 'grade-select', 'student-select']) {
      out = await run(id, 'grade5-french');
      ck(id + ' is never restored', out.r === false && out.calls.length === 0, JSON.stringify(out));
    }
    for (const bad of [null, undefined, '', 'not-a-screen', 'screen-subject-hub']) {
      out = await run(bad, 'grade5-french');
      ck('a junk screen id (' + JSON.stringify(bad) + ') is refused', out.r === false);
    }

    // A module that is not loaded must fail closed, not throw.
    const ctx2 = vm.createContext({ console, showScreen: () => {} });
    vm.runInContext(src + '\nthis.restoreKidScreen = restoreKidScreen;', ctx2);
    ck('subject-hub fails closed when SubjectHub is not loaded',
      (await ctx2.restoreKidScreen('subject-hub', 'grade5-french')) === false);
    ck('practice-hub fails closed when PracticeHub is not loaded',
      (await ctx2.restoreKidScreen('practice-hub', null)) === false);

    // A throwing module must not take the sign-in down with it.
    const ctx3 = vm.createContext({ console,
      SubjectHub: { open: async () => { throw new Error('pack fetch failed'); } },
      showScreen: () => {} });
    vm.runInContext(src + '\nthis.restoreKidScreen = restoreKidScreen;', ctx3);
    ck('a throwing restore returns false rather than propagating',
      (await ctx3.restoreKidScreen('subject-hub', 'grade5-french')) === false);

    // Every allowlisted screen must be reachable by SOME route.
    for (const id of ctx.RESTORE) {
      out = await run(id, 'grade5-french');
      ck('allowlisted screen ' + id + ' actually restores', out.r === true && out.calls.length === 1,
        JSON.stringify(out));
    }
    // Every pack-dependent screen must also be on the allowlist, or the
    // dependency guard is dead code.
    for (const id of ctx.PACKDEP) {
      ck('pack-dependent screen ' + id + ' is on the allowlist', ctx.RESTORE.has(id));
    }

    finish();
  })().catch(e => { console.error(e); process.exitCode = 1; });
}

function finish() {
  // ── 2. The wiring in showScreen() and auth.js ───────────────────────────
  section('the screen id and its owner are recorded together');
  {
    const i = app.indexOf("sessionStorage.setItem('psac-last-screen', id)");
    ck('showScreen still records psac-last-screen', i > 0);
    const near = app.slice(i, i + 700);
    ck('…and stamps psac-last-screen-owner beside it',
      /psac-last-screen-owner/.test(near), near.slice(0, 90));
    ck('…from ACTIVE_STUDENT_ID', /ACTIVE_STUDENT_ID/.test(near));

    // Entry/lock screens must stay excluded, or a restore could bypass sign-in.
    const guard = app.slice(Math.max(0, i - 400), i);
    for (const id of ['landing', 'auth', 'verify-email', 'reset-password', 'biometric-lock']) {
      ck('the recorder still excludes ' + id, guard.includes("'" + id + "'"), guard.slice(-160));
    }
  }

  section('auth.js restores before falling back to the hub');
  {
    const block = auth.slice(auth.indexOf('Restore the subject the child was using'),
                             auth.indexOf('Session guard (anti-sharing)'));
    ck('the restore block was found', block.length > 200);
    ck('it reads the owner key', /psac-last-screen-owner/.test(block));
    ck('it compares the owner to this session\'s student id',
      /lastScreenOwner === String\(sess\.id\)/.test(block),
      (block.match(/lastScreenOwner[^\n]*/) || [''])[0]);
    ck('it awaits restoreKidScreen', /await restoreKidScreen\(/.test(block));

    const iRestore = block.indexOf('await restoreKidScreen(');
    const iPack    = block.indexOf('activateSubjectPack(previousSubject)');
    const iHub     = block.indexOf('StudentHome.open()');
    ck('the pack is restored BEFORE the screen, or a subject screen paints empty',
      iPack > 0 && iRestore > iPack, 'pack@' + iPack + ' restore@' + iRestore);
    ck('the hub remains the fallback AFTER the restore attempt',
      iHub > iRestore, 'restore@' + iRestore + ' hub@' + iHub);
    ck('the pack id is only passed when a pack really was restored',
      /restoredPack \? previousSubject : null/.test(block),
      (block.match(/restoreKidScreen\([^\n]*/) || [''])[0]);
    ck('a failed restore falls through rather than returning',
      /const landed = await restoreKidScreen/.test(block) && /if \(landed\) return;/.test(block));

    // The pre-existing branches must still win: a game and an in-flight round
    // have their own resumes, and this must not have overtaken them.
    const iGame     = auth.indexOf("lastKidScreen === 'minigames'");
    const iRound    = auth.indexOf("lastKidScreen === 'practice' || lastKidScreen === 'exam'");
    const iRestoreA = auth.indexOf('await restoreKidScreen(');
    ck('the minigames resume still runs first', iGame > 0 && iGame < iRestoreA, iGame + ' vs ' + iRestoreA);
    ck('the practice/exam resume still runs first', iRound > 0 && iRound < iRestoreA, iRound + ' vs ' + iRestoreA);
  }

  section('load order');
  {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const iApp  = html.indexOf('engine/app.js');
    const iAuth = html.indexOf('engine/auth.js');
    ck('app.js still loads before auth.js, so restoreKidScreen exists when auth calls it',
      iApp > 0 && iAuth > iApp, 'app@' + iApp + ' auth@' + iAuth);
  }

  console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
  process.exitCode = fail ? 1 : 0;
}
