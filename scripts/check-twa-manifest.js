'use strict';
// ── Check (and optionally fix) the generated twa-manifest.json ──────────────
//
// Run AFTER `bubblewrap init`, from anywhere:
//   node scripts/check-twa-manifest.js C:\nouklass-android           # report
//   node scripts/check-twa-manifest.js C:\nouklass-android --fix     # apply
//
// ⚠ The TWA project lives OUTSIDE this repo on purpose, so this takes the path
//   as an argument rather than guessing. .gitignore and prepare-deploy both
//   refuse twa-manifest.json and nouklass-android/ in case one ever wanders in.
//
// ⚠⚠ THE ONE THAT SILENTLY BREAKS A FEATURE: enableNotifications. The app uses
//    web push (pushManager.subscribe / Notification.requestPermission,
//    engine/app.js). Bubblewrap only declares POST_NOTIFICATIONS when this is
//    true, and on Android 13+ that permission is required - so with it false the
//    child is never prompted, nothing arrives, and there is no error anywhere to
//    debug. It is one boolean and it is invisible when wrong.
//
// ⚠ targetSdkVersion is NOT a twa-manifest field - it lives in
//   app/build.gradle. Bubblewrap 1.25.0's template already ships
//   compileSdkVersion 36 / targetSdkVersion 36, which is above the 35 Play now
//   requires, so there is nothing to bump. This script checks the Gradle file
//   rather than repeating the claim.

const fs   = require('fs');
const path = require('path');

const dir = process.argv[2];
const FIX = process.argv.includes('--fix');
if (!dir) {
  console.error('usage: node scripts/check-twa-manifest.js <path-to-twa-project> [--fix]');
  process.exit(2);
}

const mfPath = path.join(dir, 'twa-manifest.json');
if (!fs.existsSync(mfPath)) {
  console.error(`\n  No twa-manifest.json at ${mfPath}`);
  console.error('  Run `bubblewrap init --manifest https://nouklass.com/manifest.json` there first.');
  console.error('  ⚠ bubblewrap is INTERACTIVE - it cannot be driven from a non-interactive shell');
  console.error('    (it dies with "ERR_USE_AFTER_CLOSE: readline was closed").\n');
  process.exit(1);
}

const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
let pass = 0, fail = 0, fixed = 0;
const ok  = (m) => { pass++; console.log('  ok     ' + m); };
const bad = (m) => { fail++; console.log('  FAIL   ' + m); };

// [key, wanted, why, fixable]
const WANT = [
  ['packageId',      'com.nouklass.app',
   'must match .well-known/assetlinks.json EXACTLY, or the app opens with an address bar', true],
  ['host',           'nouklass.com', 'the verified domain', true],
  ['startUrl',       '/',
   'no query string: sw.js matches with caches.match() and no ignoreSearch, so "/?x=y" '
   + 'misses the cached "/" and a cold OFFLINE launch lands on "Offline - resource not cached yet."', true],
  ['themeColor',     '#3b82f6', 'from manifest.json', true],
  ['backgroundColor','#1e1b4b', 'the splash screen', true],
  ['orientation',    'portrait', 'matches manifest.json portrait-primary', true],
  ['display',        'standalone', 'no browser chrome', true],
  ['enableNotifications', true,
   'declares POST_NOTIFICATIONS. Without it web push SILENTLY never works on Android 13+', true],
  ['minSdkVersion',  21, 'Android 5.0+', true],
];

console.log('\ntwa-manifest.json  ' + mfPath + '\n');
for (const [key, want, why, fixable] of WANT) {
  const got = mf[key];
  if (got === want) { ok(`${key} = ${JSON.stringify(want)}`); continue; }
  if (FIX && fixable) { mf[key] = want; fixed++; console.log(`  FIXED  ${key}: ${JSON.stringify(got)} -> ${JSON.stringify(want)}`); continue; }
  bad(`${key} is ${JSON.stringify(got)}, want ${JSON.stringify(want)}\n         ${why}`);
}

// Icons - the maskable one must be the SQUARED-OFF variant. The OS crops a
// maskable icon and fills nothing in, so the rounded rx=115 artwork shows four
// transparent corner wedges on a square-mask launcher.
const iconChecks = [
  ['iconUrl',         'icon-512.png',          'purpose:"any" - keeps the rounded corners'],
  ['maskableIconUrl', 'icon-512-maskable.png', 'purpose:"maskable" - squared-off, opaque background'],
];
for (const [key, needle, why] of iconChecks) {
  const v = String(mf[key] || '');
  v.includes(needle) ? ok(`${key} points at ${needle}`)
                     : bad(`${key} is ${JSON.stringify(mf[key])}, expected it to contain ${needle}\n         ${why}`);
}

// Signing key
if (mf.signingKey && mf.signingKey.path) {
  const kp = mf.signingKey.path;
  ok(`signingKey.alias = ${JSON.stringify(mf.signingKey.alias)}`);
  fs.existsSync(kp) ? ok('the keystore exists at ' + kp)
                    : bad('signingKey.path does not exist: ' + kp);
  // ⚠ The one file that cannot be regenerated. Inside the repo it is one
  //   `git add -A` from being published.
  if (/psac-practice/i.test(kp.replace(/\\/g, '/'))) {
    bad('THE KEYSTORE IS INSIDE THE REPO. Move it out - it can never be regenerated, '
      + 'and a CLI deploy uploads from local disk.');
  }
} else {
  bad('no signingKey configured');
}

// targetSdk lives in Gradle, not here.
const gradle = path.join(dir, 'app', 'build.gradle');
if (fs.existsSync(gradle)) {
  const g = fs.readFileSync(gradle, 'utf8');
  const t = (g.match(/targetSdkVersion\s+(\d+)/) || [])[1];
  if (!t) bad('app/build.gradle declares no targetSdkVersion');
  else if (Number(t) >= 35) ok(`app/build.gradle targetSdkVersion ${t} (Play requires >= 35)`);
  else bad(`app/build.gradle targetSdkVersion ${t} - Play requires >= 35 for new apps`);
} else {
  console.log('  note   app/build.gradle not generated yet - run `bubblewrap init` first');
}

if (FIX && fixed) {
  fs.writeFileSync(mfPath, JSON.stringify(mf, null, 2) + '\n', 'utf8');
  console.log(`\n  wrote ${fixed} change(s). ⚠ Run \`bubblewrap update\` so the Android project picks them up.`);
}

console.log(`\n${pass} passed, ${fail} failed${fixed ? `, ${fixed} fixed` : ''}`);
if (fail && !FIX) console.log('Re-run with --fix to apply the fixable ones.\n'); else console.log('');
process.exit(fail ? 1 : 0);
