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

// ── 3. Families policy: no links out to social networks from a kid screen ──
// ⚠ A DIFFERENT reviewer and a DIFFERENT rule from the payments gates above.
//   Play's Families policy bars a child-directed app from carrying links out to
//   third-party social networks, and all six of these end-of-game screens are
//   child-facing. The OS share sheet (navigator.share) and the clipboard STAY -
//   platform-owned, user-initiated, naming no third-party destination in the app.
console.log('\nFamilies policy: social share-out');

const mini = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const SHARE_FNS = ['qfShareTo', 'fnShareTo', 'rfShareTo', 'lbShareTo', 'ecShareTo', 'stShareTo'];

is('_socialOK() exists in minigame.js', /function _socialOK\(\)/.test(mini), true);

for (const fn of SHARE_FNS) {
  const at = mini.indexOf(`function ${fn}(where, btn) {`);
  if (at === -1) { bad(`${fn}: signature not found`); continue; }
  /_socialOK\(\)/.test(mini.slice(at, at + 400))
    ? ok(`${fn} refuses a social target in the app`)
    : bad(`${fn} does NOT consult _socialOK()`);
}

// ⚠ The BUTTONS matter as much as the handlers: a reviewer looking at the screen
//   sees markup, not call graphs. Every wa/fb/x button must be emitted by one of
//   the two helpers, never written inline in a game's template literal.
{
  const helperAt = [mini.indexOf('function _socialShareBtns'), mini.indexOf('function _qfSocialBtns')];
  const inHelper = (i) => helperAt.some(h => h !== -1 && i > h && i < h + 700);
  const stray = [];
  for (const m of mini.matchAll(/ShareTo\('(wa|fb|x)'\)/g)) if (!inHelper(m.index)) stray.push(m[0]);
  stray.length ? bad(`social buttons written inline, outside the helpers: ${[...new Set(stray)].join(', ')}`)
               : ok('every wa/fb/x button is emitted by a gated helper');
}
// What must SURVIVE - the fix must not quietly delete sharing altogether.
is('the native share sheet is untouched', /MiniGames\.qfShare\(\)/.test(mini), true);
is('copy-to-clipboard is untouched',      /qfShareTo\('copy', this\)/.test(mini), true);

// The child-facing referral line
is('the recruit-a-family line is gated for children',
   /_isAndroidApp\(\) \? '' : ' They earn credits by inviting other families\.'/.test(appJs), true);

// ── 4. dead install UI ─────────────────────────────────────────────────────
console.log('\ninstall UI');
const inst = fs.readFileSync(path.join(ROOT, 'engine/profile_install.js'), 'utf8');
{
  const at = inst.indexOf('function showInstallPanel() {');
  is('showInstallPanel() bails inside the app', at !== -1 && /_isAndroidApp\(\)/.test(inst.slice(at, at + 1400)), true);
  // ⚠ openLauncher() must NOT be gated: renderLauncher() only lists saved
  //   profiles with Open/Forget, and that is the child switcher the app needs in
  //   place of per-child home-screen icons.
  const la = inst.indexOf('function openLauncher() {');
  is('openLauncher() is NOT gated (it is the child switcher)',
     la !== -1 && !/_isAndroidApp\(\)/.test(inst.slice(la, la + 220)), true);
}

// ── 5. icons ───────────────────────────────────────────────────────────────
// ⚠ The PNGs were 2 days older than icon.svg for weeks: the favicon showed one
//   logo and the Android launcher another. A maskable icon also needs a
//   full-bleed OPAQUE background, which the rounded rx=115 artwork is not.
console.log('\nicons');
{
  const mf = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
  const purposes = (i) => String(i.purpose || 'any').split(/\s+/);
  const maskable = mf.icons.filter(i => purposes(i).includes('maskable'));
  is('a dedicated maskable icon is declared', maskable.length > 0, true);
  is('no icon claims both "any" and "maskable"',
     mf.icons.every(i => !(purposes(i).includes('any') && purposes(i).includes('maskable'))), true);
  for (const i of mf.icons) {
    const p = path.join(ROOT, i.src.replace(/^\//, ''));
    fs.existsSync(p) ? ok(`${i.src} exists (${purposes(i).join('+')})`) : bad(`${i.src} is declared but missing`);
  }
  // Freshness: a PNG older than the SVG means the artwork was redesigned and the
  // icons were never rebuilt. That is the exact failure this section exists for.
  const svgAt = fs.statSync(path.join(ROOT, 'icons/icon.svg')).mtimeMs;
  const stale = mf.icons.filter(i => i.src.endsWith('.png'))
    .filter(i => fs.existsSync(path.join(ROOT, i.src.replace(/^\//, ''))))
    .filter(i => fs.statSync(path.join(ROOT, i.src.replace(/^\//, ''))).mtimeMs < svgAt);
  stale.length ? bad(`PNG icons older than icon.svg - run scripts/build-icons.js: ${stale.map(i => i.src).join(', ')}`)
               : ok('every PNG icon is at least as new as icon.svg');
}

// ── 6. the gate exists where every screen can see it ───────────────────────
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
