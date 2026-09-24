'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Does every /api/ path the app CALLS exist in the Worker's route table?
//
//    node scripts/test-worker-routes.js
//
// ⚠ WHY THIS EXISTS. `/api/assignment-submit` was the one Netlify function
//   never ported to Cloudflare. The route simply was not in workers/index.js,
//   and an unrouted /api/* falls through to that file's own JSON 404 — so a
//   pupil could open homework from an /a/<CODE> link, answer the whole paper,
//   and then hand in to a 404 for as long as they kept tapping "Try sending
//   again". Measured on production: /api/assignment-submit answered 404 while
//   /api/assignment-open beside it answered 405 and /api/questions answered 401.
//
// ⚠ NOTHING NOTICED FOR THE WHOLE MIGRATION. test-netlify-redirects.js checks
//   what the publish root serves, test-sw-api-routing.js checks what the service
//   worker intercepts; neither compares the caller list with the router. The
//   gap between "a handler file exists" and "a request reaches it" is exactly
//   where this bug lived, so this test reads the ROUTES table, not the folder.
//
// ⚠ IT READS THE CLIENT, NOT A LIST. A hand-written list of endpoints goes
//   stale the same way the redirects did; the callers are the source of truth.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (cond) { console.log('  ok   ' + label); return; }
  fails++;
  console.log('  FAIL ' + label + (extra ? '\n         ' + extra : ''));
};

// ── what the Worker routes ──────────────────────────────────────────────────
const idx = read('workers/index.js');
const routed = new Set([...idx.matchAll(/'(\/api\/[a-z0-9-]+)':/g)].map((m) => m[1]));
const imported = new Set([...idx.matchAll(/from\s+'\.\/api\/([a-z0-9-]+)\.js'/g)].map((m) => m[1]));

// ── what the app calls ──────────────────────────────────────────────────────
// Every shipped surface: the engine, the SPA shell and the three standalone
// pages that load no engine file (guest homework, the class page, the vote page).
const SKIP_DIRS = new Set(['node_modules', '.git', '.deploy', 'backups', 'tmp',
                           'question-bundles', 'subjects', 'scripts', 'netlify',
                           'workers', 'docs', 'assets', 'icons', 'library', 'fonts']);
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|html)$/.test(e.name) && !/\.min\.js$/.test(e.name)) out.push(p);
  }
  return out;
}
const callers = new Map();
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  for (const m of read(rel).matchAll(/['"`](\/api\/[a-z0-9-]+)/g)) {
    if (!callers.has(m[1])) callers.set(m[1], new Set());
    callers.get(m[1]).add(rel);
  }
}

console.log('\n── every /api/ path the app calls is routed ──');
ok('the app calls at least a dozen endpoints (the scan found something)',
  callers.size >= 12, 'found ' + callers.size);

const unrouted = [...callers].filter(([p]) => !routed.has(p));
ok('no /api/ path is called without a route in workers/index.js',
  unrouted.length === 0,
  unrouted.map(([p, w]) => `${p}  ← called from ${[...w].join(', ')}`).join('\n         '));

console.log('\n── the route table and the handler folder agree ──');
const apiDir = path.join(ROOT, 'workers', 'api');
const files = new Set(fs.readdirSync(apiDir).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')));
const importedWithoutFile = [...imported].filter((n) => !files.has(n));
ok('every handler workers/index.js imports exists on disk',
  importedWithoutFile.length === 0, importedWithoutFile.join(', '));

// ⚠ A file with no route is not automatically a fault — admin-compose.js and
//   the library handlers are reached through other routes or are not wired yet
//   — so this REPORTS rather than fails. The direction that must never happen
//   is the other one, and that is the assertion above.
const fileNoRoute = [...files].filter((n) => !routed.has('/api/' + n)).sort();
if (fileNoRoute.length) {
  console.log('  note workers/api/*.js with no entry in ROUTES (review, not a failure):');
  console.log('         ' + fileNoRoute.join(', '));
}

console.log('\n── the guest homework round trip is complete ──');
// ⚠ Named explicitly because this is the flow that was broken, and because a
//   pupil who cannot hand in loses work that only exists in their browser.
for (const p of ['/api/assignment-open', '/api/assignment-submit', '/api/guest-device']) {
  ok(`${p} is routed`, routed.has(p));
}
ok('guest.js still posts to /api/assignment-submit (the caller has not moved)',
  read('guest.js').includes('/api/assignment-submit'));

console.log('\n' + (fails
  ? `  ${fails} failed of ${checks}`
  : `  ${checks}/${checks} worker-route checks passed`) + '\n');
process.exit(fails ? 1 : 0);
