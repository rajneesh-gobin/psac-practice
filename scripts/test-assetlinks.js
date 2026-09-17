'use strict';
// Digital Asset Links — the file that decides whether the Play app opens
// full-screen or with a browser address bar across the top.
//
// ⚠⚠ THE MISTAKE THIS FILE EXISTS TO CATCH is not a typo. It is putting the
//    UPLOAD KEY's fingerprint here when the app is enrolled in Play App
//    Signing. With Play App Signing — the default for every new app — Google
//    strips your signature and RE-SIGNS the app with their own key before it
//    reaches a phone. The fingerprint that must appear below is therefore
//    GOOGLE'S app signing key, which you can only read from the Play Console
//    after uploading, never from your own keystore. An upload-key fingerprint
//    here is well-formed, plausible, and completely wrong.
//    ⚠ And Google CACHES this file. Publishing a wrong fingerprint and fixing
//    it later leaves verification failing for hours against the cached copy,
//    so it is worth getting right before the first upload rather than after.
//
// ⚠ This test does NOT fail while the placeholder is in place — a permanently
//   red test is one people learn to ignore. It fails when the placeholder has
//   been replaced by something that is not a valid fingerprint, which is the
//   moment a mistake can actually ship.
//
// Run: node scripts/test-assetlinks.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = '.well-known/assetlinks.json';
let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  bad.push(label + (detail ? ' — ' + detail : ''));
};

const abs = path.join(ROOT, FILE);
check(fs.existsSync(abs), `${FILE} exists`);
if (!fs.existsSync(abs)) { console.log(`\n${pass} passed, ${fail} failed`); process.exit(1); }

const raw = fs.readFileSync(abs, 'utf8');
let json = null;
try { json = JSON.parse(raw); } catch (e) { check(false, 'the file is valid JSON', e.message); }
check(Array.isArray(json), 'the top level is an array');
if (!Array.isArray(json)) { console.log(`\n${pass} passed, ${fail} failed`); bad.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }

for (const entry of json) {
  check(Array.isArray(entry.relation) && entry.relation.includes('delegate_permission/common.handle_all_urls'),
    'the relation delegates all urls');
  const t = entry.target || {};
  check(t.namespace === 'android_app', 'the namespace is android_app', t.namespace);
  // ⚠ Must match the package name Bubblewrap/PWABuilder generated, exactly.
  //   A mismatch fails silently the same way a wrong fingerprint does.
  check(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(String(t.package_name || '')),
    'the package name is a valid Android package', t.package_name);

  const prints = t.sha256_cert_fingerprints;
  check(Array.isArray(prints) && prints.length > 0, 'at least one fingerprint is listed');
  if (!Array.isArray(prints)) continue;

  // A real fingerprint: 32 colon-separated hex pairs. keytool prints uppercase.
  const REAL = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;
  const PLACEHOLDER = /^REPLACE_WITH_/i;
  // ⚠ The docs' own example. If this string ever reaches the file it looks
  //   entirely real and verifies against nothing.
  const DOC_SAMPLE = /^(?:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:?)+$/i;

  for (const p of prints) {
    const s = String(p).trim();
    if (PLACEHOLDER.test(s)) {
      console.log('  REVIEW  ' + FILE + ' still holds the PLACEHOLDER fingerprint.');
      console.log('          The Play app will open with a browser address bar until it is replaced.');
      console.log('          ⚠ Take it from the Play Console (Setup → App integrity → App signing),');
      console.log('            NOT from your own keystore, if the app uses Play App Signing.');
      pass++;
      continue;
    }
    check(!DOC_SAMPLE.test(s),
      'the fingerprint is not the AA:BB:CC… sample copied out of the docs', s.slice(0, 24) + '…');
    // ⚠ Only reached once somebody has replaced the placeholder: from here on
    //   the value claims to be real, so it has to actually be well-formed.
    check(REAL.test(s),
      'the fingerprint is 32 colon-separated uppercase hex pairs',
      `${s.slice(0, 30)}… (${s.replace(/[^:]/g, '').length + 1} groups, ${s.length} chars)`);
    check(!/\s/.test(s), 'the fingerprint has no stray whitespace');
  }
}

// ⚠ Shipped by prepare-deploy only because `.well-known` is in its DIRS list.
//   It is a dotfile directory, invisible to a casual ls, and creating the file
//   without that entry deploys nothing — the app then opens with an address
//   bar, which is a symptom nobody connects back to a missing allowlist line.
const prep = fs.readFileSync(path.join(ROOT, 'scripts/prepare-deploy.js'), 'utf8');
check(/'\.well-known'/.test(prep), 'prepare-deploy.js ships the .well-known directory');

console.log(`\n${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
