'use strict';
// The sign-in progress overlay: it has to survive the screen switch it covers,
// and it has to come DOWN on every path that ends in an error message.
//
// ⚠ Both invariants have a matching trap in CLAUDE.md. An element inside a
// .screen is hidden by showScreen(), which is exactly the moment this one is
// still covering a dashboard that has not painted; and a bare `await` on the
// sign-in call strands the overlay over the whole app when the connection
// drops, with the form underneath and no way to reach it.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const css  = fs.readFileSync('style.css', 'utf8');
const auth = fs.readFileSync('engine/auth.js', 'utf8');
const results = [];
const check = (name, fn) => {
  try { fn(); results.push([true, name]); }
  catch (e) { results.push([false, name + ' - ' + e.message]); }
};

// ── Placement ───────────────────────────────────────────────────────────────
check('the overlay exists and starts hidden', () => {
  const m = html.match(/<div id="auth-progress"([^>]*)>/);
  assert.ok(m, 'no #auth-progress in index.html');
  assert.match(m[1], /class="hidden"/, 'it must start hidden');
  assert.match(m[1], /role="status"/, 'it must announce itself');
  assert.match(m[1], /aria-live="polite"/, 'its step text changes while it is up');
});

check('it is NOT inside a .screen', () => {
  // Every .screen and <main> is a div, so "no open div in front of it" is the
  // whole invariant: it is a direct child of body and nothing can hide it.
  const bare = html.replace(/<!--[\s\S]*?-->/g, '');
  const at = bare.indexOf('<div id="auth-progress"');
  assert.ok(at > 0, 'no #auth-progress in index.html');
  const head = bare.slice(0, at);
  const open  = (head.match(/<div\b/g)  || []).length;
  const close = (head.match(/<\/div>/g) || []).length;
  assert.equal(open - close, 0,
    'it is nested ' + (open - close) + ' level(s) deep; showScreen() would hide it '
    + 'in the middle of the hand-over');
  assert.ok(!/<main\b/.test(head) || /<\/main>/.test(head),
    'it must not sit inside <main> either');
});

check('the ids the code writes into are all present', () => {
  for (const id of ['auth-progress-title', 'auth-progress-step']) {
    assert.ok(html.includes('id="' + id + '"'), 'missing #' + id);
  }
  assert.ok(html.includes('id="auth-signin-btn"'), 'the Sign In button needs an id to show a spinner');
});

// ── Styling ─────────────────────────────────────────────────────────────────
check('the overlay is fixed and covers the viewport', () => {
  const block = css.slice(css.indexOf('#auth-progress {'), css.indexOf('#auth-progress.hidden'));
  assert.match(block, /position:\s*fixed/);
  assert.match(block, /inset:\s*0/);
});

check('nothing here transforms a .screen, main or body', () => {
  // The whole reason the overlay is a body-level sibling rather than a slide on
  // the auth card: a transformed ancestor re-anchors every position:fixed child
  // and kills native autofill popovers.
  for (const sel of ['.screen', 'main', 'body']) {
    const re = new RegExp('(^|[,}\\s])' + sel.replace('.', '\\.') + '\\s*\\{[^}]*transform', 'm');
    assert.ok(!re.test(css), sel + ' carries a transform');
  }
});

// ── Behaviour ───────────────────────────────────────────────────────────────
// Slice the three helpers out and run them against a DOM stub, so the timer,
// the "still going" message and the fade-out are exercised, not just read.
const slice = auth.slice(auth.indexOf('  let _authProgressSlowTimer = null;'),
                         auth.indexOf('  function _setBtnBusy('));

function harness() {
  const nodes = {};
  const make = () => ({
    textContent: '', style: {}, offsetWidth: 1,
    _cls: new Set(['hidden']),
    classList: {
      add: (...c) => c.forEach(x => nodes.box._cls.add(x)),
      remove: (...c) => c.forEach(x => nodes.box._cls.delete(x)),
      contains: c => nodes.box._cls.has(c),
    },
  });
  nodes.box = make();
  nodes.title = { textContent: '', style: {}, offsetWidth: 1 };
  nodes.step  = { textContent: '', style: {}, offsetWidth: 1 };
  const timers = [];
  const ctx = vm.createContext({
    _el: id => ({ 'auth-progress': nodes.box, 'auth-progress-title': nodes.title,
                  'auth-progress-step': nodes.step })[id],
    setTimeout: (fn, ms) => { timers.push({ fn, ms }); return timers.length; },
    clearTimeout: n => { if (timers[n - 1]) timers[n - 1].cancelled = true; },
  });
  vm.runInContext(slice, ctx);
  return { ctx, nodes, timers, fire: ms => timers.filter(t => t.ms === ms && !t.cancelled).forEach(t => t.fn()) };
}

check('showing it writes both lines and uncovers the box', () => {
  const h = harness();
  h.ctx._showAuthProgress('Signing you in…', 'Checking your details');
  assert.equal(h.nodes.box._cls.has('hidden'), false);
  assert.equal(h.nodes.title.textContent, 'Signing you in…');
  assert.equal(h.nodes.step.textContent, 'Checking your details');
});

check('a long wait explains itself, but not before 6s', () => {
  const h = harness();
  h.ctx._showAuthProgress('Signing you in…', 'Checking your details');
  assert.equal(h.timers[0].ms, 6000, 'the slow-connection line must not fire early');
  h.fire(6000);
  assert.match(h.nodes.step.textContent, /slow connection/);
});

check('a failure drops it at once, with the timer cancelled', () => {
  const h = harness();
  h.ctx._showAuthProgress('Signing you in…', 'Checking your details');
  h.ctx._hideAuthProgress(true);
  assert.equal(h.nodes.box._cls.has('hidden'), true, 'the error underneath must be readable immediately');
  assert.ok(h.timers.every(t => t.cancelled), 'a cancelled sign-in must not still announce a slow connection');
});

check('a success fades out over the incoming screen', () => {
  const h = harness();
  h.ctx._showAuthProgress('Signing you in…', 'Checking your details');
  h.ctx._hideAuthProgress();
  assert.equal(h.nodes.box._cls.has('auth-progress-leaving'), true, 'it must fade, not vanish');
  assert.equal(h.nodes.box._cls.has('hidden'), false, 'still covering while it fades');
  h.fire(280);
  assert.equal(h.nodes.box._cls.has('hidden'), true);
  assert.equal(h.nodes.box._cls.has('auth-progress-leaving'), false, 'the class must not survive into the next sign-in');
});

check('hiding an already-hidden overlay is a no-op', () => {
  const h = harness();
  h.ctx._hideAuthProgress();
  assert.equal(h.nodes.box._cls.has('auth-progress-leaving'), false);
});

// ── Wiring ──────────────────────────────────────────────────────────────────
check('every error path uncovers the screen', () => {
  const fn = auth.slice(auth.indexOf('  function _showAuthError(msg) {'),
                        auth.indexOf('  function _clearAuthError('));
  assert.match(fn, /_hideAuthProgress\(true\)/,
    '_showAuthError is where all eleven failure returns land');
});

check('a dropped connection cannot strand the overlay', () => {
  const fn = auth.slice(auth.indexOf('  async function emailSignIn() {'),
                        auth.indexOf('  function _showVerifyScreen('));
  assert.match(fn, /try\s*\{[\s\S]*signInWithPassword[\s\S]*\}\s*catch/,
    'the sign-in call must be caught, or a rejection leaves the veil up for good');
  assert.match(fn, /finally\s*\{\s*[\r\n]\s*_hideAuthProgress\(\);/,
    'routing must hand the screen back even when it throws');
  assert.ok(fn.indexOf('_authProgressStep(') > fn.indexOf('signInWithPassword'),
    'the second step belongs after the password check, not before it');
});

check('the child PIN sign-in is covered too', () => {
  const fn = auth.slice(auth.indexOf('  async function studentSignIn() {'),
                        auth.indexOf('  function checkStudentReady('));
  assert.match(fn, /_showAuthProgress\(/);
  assert.match(fn, /finally\s*\{[\s\S]*_hideAuthProgress\(\)/,
    'eleven early returns in _studentSignIn - only a finally covers them all');
});

const failed = results.filter(r => !r[0]);
results.forEach(([ok, name]) => console.log('  ' + (ok ? 'ok  ' : 'FAIL') + ' ' + name));
console.log('  ' + (results.length - failed.length) + ' passed, ' + failed.length + ' failed');
if (failed.length) process.exitCode = 1;
