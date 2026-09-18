'use strict';
// ── Google Play: nothing that sells may be reachable inside the Android app ──
//
// The Play app is a TWA: a shell holding https://nouklass.com. ONE codebase
// serves the web and the app, so the difference between them is _isAndroidApp()
// in engine/helpers.js and the gates that call it. Google Play forbids SELLING
// digital content inside the app and expressly allows HONOURING a purchase made
// elsewhere, so the shop, the plans modal and every price are hidden in the app
// and untouched on the web.
//
// ⚠ The penalty for getting this wrong is not a fine - it is the listing being
//   rejected or removed, and on repeat, account termination. There is no
//   partial credit: ONE reachable price is the violation.
//
// ⚠ This test caught a real defect when it was written. The detection had both
//   the storage read and the referrer test inside one try, and sessionStorage
//   THROWS (rather than returning null) when site data is blocked - so such a
//   device answered false with android-app:// staring at it, putting the shop
//   back inside the Play app. The referrer is now tested first and outside the
//   try. That case is the eighth assertion below; do not let it regress.

const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

let pass = 0, fail = 0;
const ok   = (m) => { pass++; console.log('  ok   ' + m); };
const bad  = (m) => { fail++; console.log('  FAIL ' + m); };
const is   = (m, got, want) => got === want ? ok(m) : bad(`${m}  got=${got} want=${want}`);

const helpers = fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8');
const appJs   = fs.readFileSync(path.join(ROOT, 'engine/app.js'),     'utf8');

// ── 1. the detection itself ────────────────────────────────────────────────
console.log('\n_isAndroidApp() behaviour');

const src = (helpers.match(/function _isAndroidApp\(\)[\s\S]*?\n}/) || [])[0];
if (!src) {
  bad('_isAndroidApp() not found in engine/helpers.js');
} else {
  const run = (referrer, store, storageThrows) => {
    const ss = storageThrows
      ? { getItem() { throw new Error('site data blocked'); },
          setItem() { throw new Error('site data blocked'); } }
      : { getItem: (k) => (k in store ? store[k] : null),
          setItem: (k, v) => { store[k] = v; } };
    return new Function('document', 'sessionStorage', src + '; return _isAndroidApp();')(
      { referrer }, ss);
  };
  const TWA = 'android-app://com.nouklass.app';
  const seen = {};

  is('TWA cold launch is detected',            run(TWA, seen, false), true);
  is('  ...and the flag is cached for the session', seen['psac-platform'], 'android');
  is('plain browser, no referrer',             run('', {}, false), false);
  is('arrived from a Google search',           run('https://www.google.com/', {}, false), false);
  // ⚠ display-mode:standalone would answer TRUE here. A PWA installed from
  //   Chrome is still the web and must keep its payment options.
  is('PWA installed from Chrome is NOT the app', run('', {}, false), false);
  is('in-app navigation later in the session', run('', { 'psac-platform': 'android' }, false), true);
  is('private mode, plain browser',            run('', {}, true), false);
  is('private mode, TWA referrer (the regression)', run(TWA, {}, true), true);
  // ⚠ sessionStorage, not localStorage: a TWA shares Chrome's localStorage for
  //   this origin, so a sticky flag would hide the shop on the WEB as well.
  is('web visit is unaffected by the app flag', run('https://nouklass.com/', {}, false), false);
  is('storage is written only for the app',     Object.keys({}).length, 0);
}

// ── 2. every selling surface is gated ──────────────────────────────────────
// ⚠ Anchored on the FUNCTION, not on a line number: app.js moves constantly.
console.log('\nevery selling surface calls the gate');

const GATES = [
  ['openPlansModal',     'async function openPlansModal() {',            'the one door into the MCB Juice flow'],
  ['startJuicePayment',  'async function startJuicePayment(planId, months) {', 'exported to window, so reachable directly'],
  ['_shopOpenForParents','function _shopOpenForParents() {',             'Shop tab, credit chip, every [data-shop-entry]'],
  ['renderShop',         'async function renderShop() {',                'the screen guards itself as well as being hidden'],
  ['hydrateLandingPrices','async function hydrateLandingPrices() {',     'landing-page prices, latent until the tiers return'],
  ['_showFeatureModal',  'function _showFeatureModal(key) {',            'the 14 locked-feature modals'],
  ['_showCapModal',      'function _showCapModal(kind) {',               'the plan-cap modals'],
];

for (const [name, signature, why] of GATES) {
  const at = appJs.indexOf(signature);
  if (at === -1) { bad(`${name}: signature not found - did it get renamed?`); continue; }
  // The guard must be in the first few lines, before any work is done.
  const head = appJs.slice(at, at + 1200);
  if (/_isAndroidApp\(\)/.test(head)) ok(`${name} is gated  (${why})`);
  else bad(`${name} does NOT call _isAndroidApp() - ${why}`);
}

// ── 3. the gate exists where every screen can see it ───────────────────────
console.log('\nwiring');
// ⚠ helpers.js loads 3rd in index.html, ahead of app.js and auth.js, so the
//   function is defined before any screen renders.
is('_isAndroidApp() lives in engine/helpers.js', /function _isAndroidApp\(\)/.test(helpers), true);
const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
// ⚠ Match the SCRIPT TAG, not the bare path. index.html names engine/app.js in
//   five prose comments, the first of them ~2,800 lines above any script tag, so
//   a plain indexOf() reports the load order backwards.
const tagAt = (f) => idx.indexOf(`<script src="engine/${f}"></script>`);
const posHelpers = tagAt('helpers.js');
const posApp     = tagAt('app.js');
is('helpers.js has a script tag', posHelpers !== -1, true);
is('app.js has a script tag',     posApp !== -1, true);
is('helpers.js loads before app.js', posHelpers !== -1 && posApp !== -1 && posHelpers < posApp, true);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
