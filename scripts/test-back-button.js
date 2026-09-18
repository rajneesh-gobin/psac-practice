'use strict';
// ── Android / browser Back walks screens instead of closing the app ─────────
//
// ⚠ Before this, engine/app.js contained NO pushState at all: navigation was
//   showScreen(id) and nothing else, so history held exactly one entry. A TWA
//   maps Android's hardware/gesture Back to history.back(), so Back from ANY
//   screen finished the activity - back out of question 30 of an exam and the
//   app closed. On Android that reads as a crash.
//
// ⚠ This is stateful in a way that cannot be verified by reading. The harness
//   below extracts the real block out of engine/app.js and runs it against a
//   genuine history stack, a fake DOM and a fake _Dialogs, so the assertions
//   exercise the shipped code rather than a paraphrase of it.

const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0;
const ok  = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fail++; console.log('  FAIL ' + m); };
const is  = (m, got, want) => (JSON.stringify(got) === JSON.stringify(want))
  ? ok(m) : bad(`${m}  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`);

const appJs = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');

// ── extract the shipped block ──────────────────────────────────────────────
const start = appJs.indexOf('// ── ANDROID / BROWSER BACK');
const endMark = "window.addEventListener('popstate', (e) => {";
const endAt = appJs.indexOf(endMark, start);
if (start === -1 || endAt === -1) { bad('the ANDROID / BROWSER BACK block was not found in engine/app.js'); process.exit(1); }
// the listener body ends at the first "\n});" after it
const close = appJs.indexOf('\n});', endAt);
const SRC = appJs.slice(start, close + 4);

// ── the fakes ──────────────────────────────────────────────────────────────
function makeHistory() {
  const entries = [{ state: null }];
  let i = 0;
  return {
    get state() { return i >= 0 ? entries[i].state : null; },
    pushState(st) { entries.splice(i + 1); entries.push({ state: st }); i = entries.length - 1; },
    replaceState(st) { entries[i] = { state: st }; },
    // Returns the state now current, or the sentinel LEFT when we fall off the
    // bottom of our own stack - which is the app closing, and is correct.
    _back() { if (i <= 0) { i = -1; return 'LEFT'; } i--; return entries[i].state; },
    _depth() { return entries.length; },
    _index() { return i; },
  };
}

function harness({ dialogOpen = null, exam = null, screen = 'student-home' } = {}) {
  const history = makeHistory();
  const shown = [];
  const clicked = [];

  const exitBtn = { click: () => clicked.push('exit-exam-btn') };
  const document = { getElementById: (id) => (id === 'exit-exam-btn' ? exitBtn : null) };

  // A modal, modelled the way _Dialogs actually holds one.
  const closedDialogs = [];
  const el = dialogOpen ? {
    id: dialogOpen,
    classList: { contains: (c) => c === 'hidden' ? false : false, add: (c) => closedDialogs.push(dialogOpen + ':' + c) },
  } : null;
  const _Dialogs = {
    _stack: el ? [{ el }] : [],
    _closeControl: () => ({ click: () => closedDialogs.push(dialogOpen + ':control') }),
  };

  const S = { currentScreen: screen, exam: exam || {} };
  let onPop = null;
  const window = { addEventListener: (ev, fn) => { if (ev === 'popstate') onPop = fn; } };
  const location = { href: 'https://nouklass.com/' };

  const fn = new Function(
    'history', 'document', 'window', 'location', 'S', '_Dialogs', 'showScreen', 'exports',
    SRC + '\n;exports.recordScreen=_recordScreen;exports.histScreen=_histScreen;');

  const exported = {};
  // `redirect` models showScreen()'s own guards: _KID_ONLY_SCREENS bouncing a
  // parent session, _ADULT_ONLY_SCREENS bouncing a child, a plan gate opening a
  // modal instead. The real function resolves those before it records anything.
  const api = { redirect: {} };
  // showScreen mirrors the shipped call: record only when the screen changes.
  const showScreen = (id) => {
    const dest = api.redirect[id] || id;
    shown.push(dest);
    if (S.currentScreen !== dest) { S.currentScreen = dest; exported.recordScreen(dest); }
  };
  fn(history, document, window, location, S, _Dialogs, showScreen, exported);

  return Object.assign(api, {
    history, shown, clicked, closedDialogs, S, exported,
    // navigate as the app does
    go(id) { showScreen(id); },
    seed(id) { S.currentScreen = null; this.go(id); },
    back() {
      const st = history._back();
      if (st === 'LEFT') return 'LEFT';
      onPop({ state: st });
      return 'HANDLED';
    },
  });
}

// ── 1. the stack ───────────────────────────────────────────────────────────
console.log('\nhistory stack');
{
  const h = harness();
  h.seed('student-home');
  is('the first screen REPLACES, so Back leaves in one press', h.history._depth(), 1);
  h.go('subject-select');
  h.go('chapter-select');
  is('each new screen pushes one entry', h.history._depth(), 3);
  h.go('chapter-select');
  is('navigating to the SAME screen pushes nothing', h.history._depth(), 3);
}

// ── 2. walking back ────────────────────────────────────────────────────────
console.log('\nwalking back');
{
  const h = harness();
  h.seed('student-home'); h.go('subject-select'); h.go('chapter-select');
  h.shown.length = 0;
  h.back(); is('Back shows the previous screen', h.shown, ['subject-select']);
  h.back(); is('Back again shows the one before', h.shown, ['subject-select', 'student-home']);
  is('Back from the first screen LEAVES the app', h.back(), 'LEFT');
}

// ── 3. replaying history must not re-record ────────────────────────────────
// ⚠ Without _navPopping, showScreen() during a popstate would push the screen
//   we just came back to, and Back would ping-pong forever between two screens.
console.log('\nreplay guard');
{
  const h = harness();
  h.seed('student-home'); h.go('subject-select'); h.go('chapter-select');
  const before = h.history._depth();
  h.back();
  is('going back does not grow the stack', h.history._depth(), before);
  h.back();
  is('and still does not', h.history._depth(), before);
}

// ── 4. entry screens are excluded ──────────────────────────────────────────
// ⚠ Same set as psac-last-screen: a signed-in child pressing Back must not land
//   on the sign-in screen.
console.log('\nentry screens');
{
  for (const id of ['landing', 'auth', 'verify-email', 'reset-password', 'biometric-lock']) {
    const h = harness();
    h.seed(id);
    is(`${id} records no history entry`, h.history.state, null);
  }
}

// ── 5. a modal swallows the Back press ─────────────────────────────────────
// ⚠ Closed through the modal's OWN control, never by hiding the wrapper - that
//   is what runs its cleanup (a document keydown listener, focus restore).
console.log('\nmodals');
{
  const h = harness({ dialogOpen: 'modal-plans' });
  h.seed('student-home'); h.go('subject-select');
  const depth = h.history._depth();
  h.shown.length = 0;
  h.back();
  is('Back closes the dialog through its own control', h.closedDialogs, ['modal-plans:control']);
  is('...and does NOT navigate', h.shown, []);
  is('...and the screen entry is kept, so depth is unchanged', h.history._depth(), depth);
}

// ── 6. mid-exam ────────────────────────────────────────────────────────────
// ⚠ Reuses #exit-exam-btn so the wording and the cleanup (_clearExamResume, the
//   timer, the answers) stay one implementation rather than a second copy.
console.log('\nmid-exam');
{
  const h = harness({ exam: { qs: [1, 2, 3], idx: 29 }, screen: 'exam' });
  h.seed('student-home'); h.go('exam');
  h.shown.length = 0;
  h.back();
  is('Back mid-exam triggers the existing Exit confirm', h.clicked, ['exit-exam-btn']);
  is('...and does NOT silently leave the paper', h.shown, []);
}
{
  const h = harness({ exam: { qs: [] }, screen: 'exam' });
  h.seed('student-home'); h.go('exam');
  h.shown.length = 0;
  h.back();
  is('a finished exam (no questions in flight) navigates normally', h.shown, ['student-home']);
}

// ── 6b. a guard may refuse the replayed screen ─────────────────────────────
// ⚠ showScreen() bounces a kid-only screen in a parent session, an adult-only
//   screen in a child session, and opens a modal for a plan-gated one. Those
//   redirects run with _navPopping still true so they record nothing, which
//   would leave history pointing at a screen we are not showing and make the
//   NEXT Back skip a step.
console.log('\nredirected replay');
{
  const h = harness();
  h.seed('student-home');
  h.go('practice');
  h.go('results');
  // From here on, 'practice' is refused and bounces to the parent dashboard -
  // exactly what _KID_ONLY_SCREENS does to a parent session.
  h.redirect = { practice: 'parent' };
  const depthBefore = h.history._depth();
  h.shown.length = 0;
  h.back();   // target 'practice', but the guard lands us on 'parent'
  is('the guard redirected us', h.shown, ['parent']);
  is('history is corrected to where we actually landed',
     h.history.state && h.history.state.screen, h.S.currentScreen);
  // ⚠ replaceState, not push: the user pressed Back ONCE and must not have to
  //   press it again to get past a screen they were never shown.
  is('...by replacing, so the stack does not grow',
     h.history._depth(), depthBefore);
}

// ── 7. the replaceState callers must carry state through ───────────────────
// ⚠ Five callers passed null or {} and would wipe .screen off the CURRENT
//   entry, after which Back reads no target and leaves the app - and only on the
//   paths that clean a URL, so it would look random.
console.log('\nreplaceState callers');
{
  for (const f of ['engine/auth.js', 'engine/profile_install.js']) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const wipes = [...src.matchAll(/history\.replaceState\(\s*(null|\{\})\s*,/g)];
    wipes.length ? bad(`${f} still has ${wipes.length} replaceState call(s) that wipe history.state`)
                 : ok(`${f} carries history.state through every replaceState`);
  }
}

// ── 8. wiring ──────────────────────────────────────────────────────────────
console.log('\nwiring');
is('showScreen() records only on a real change',
   /const _screenChanged = _prevScreen !== id;[\s\S]{0,400}?if \(_screenChanged\) _recordScreen\(id\);/.test(appJs), true);
is('the excluded-screen list has ONE definition',
   (appJs.match(/'verify-email', 'reset-password', 'biometric-lock'/g) || []).length, 1);
is('the URL is never rewritten (no route this SPA cannot serve)',
   !/pushState\([^)]*,\s*''\s*,\s*['"`]\//.test(SRC), true);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
