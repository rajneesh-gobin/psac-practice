'use strict';
// Build a clean publish directory, so a CLI deploy ships the SITE and nothing else.
//
//   node scripts/prepare-deploy.js
//   netlify deploy --prod --dir=.deploy --functions=netlify/functions
//
// WHY THIS EXISTS
// `publish = "."` serves the repo root, and `netlify deploy --dir=.` uploads
// from LOCAL DISK — not from git, so .gitignore excludes nothing (CLAUDE.md
// records that as measured, not assumed). Netlify has no publish-exclude, so
// every deploy currently carries the whole working tree. Measured 2026-09-08:
//
//     past-papers/   147 MB   129 copyrighted MES/MIE exam PDFs
//     .netlify/       60 MB   the CLI's own local state and cache
//     netlify/        21 MB   functions + question-bundles (see below)
//     exam_papers/     3 MB   more of the same PDFs
//     .env                    THE SUPABASE SERVICE ROLE KEY
//
// The PDFs and the bundles are already 404'd by netlify.toml, but a redirect is
// applied at REQUEST time — the files are still uploaded and still sit on the
// CDN. And `.env` has never been protected by anything except a line in
// CLAUDE.md telling a human to move it out of the tree before every deploy.
//
// ⚠ ALLOWLIST, NOT DENYLIST. A denylist means every new scratch file at the
//   repo root ships by default, and this root has collected dbg18.js, dbg23.js,
//   dbg25.js, dbg27.js, test.py, tmp/, floor-check-report.json and
//   ext-images-result.json without anyone deciding to publish them. With an
//   allowlist the failure mode inverts: something NEEDED goes missing, and the
//   checks below fail loudly instead of a secret shipping quietly.
//
// ⚠ netlify/ is deliberately NOT published. The functions are deployed
//   separately by `--functions=netlify/functions`, which reads the REPO, and
//   `included_files` in netlify.toml resolves against the repo root too — so
//   the publish directory never needed them. Leaving them in is what made
//   /netlify/question-bundles/grade5-maths.json answer 200 with 651 KB of real
//   questions AND their answers, bypassing every entitlement check in
//   functions/questions.js.
//   ⚠ Verify the questions endpoint immediately after the first staged deploy.
//      401 from /.netlify/functions/questions means the function shipped; a 404
//      means it did not, and the deploy must be redone with --dir=. until this
//      script is corrected. That is the one thing here that cannot be proven
//      without an actual deploy.
//
// ⚠ subjects/ IS published, in full. The manifests must reach the browser
//   (PackLoader injects them), and subjects/**/questions/* is already blocked
//   by a redirect that scripts/test-netlify-redirects.js asserts. Excluding the
//   question sources here would save ~4 MB and risk breaking the Lambda's view
//   of them for no proportionate gain.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '.deploy');

// Directories copied whole.
const DIRS = ['engine', 'subjects', 'assets', 'fonts', 'icons'];

// Root files, named individually — never a glob. `*.js` at this root would pick
// up dev-server.js and four dbg*.js scratch files.
const FILES = [
  'index.html', 'guest.html', 'vote.html', 'score.html', 'image-credits.html',
  'materials.html',
  'style.css', 'sw.js', 'manifest.json', 'guest.js', 'materials.js',
];

// Anything matching these must never appear in the output, whatever the lists
// above say. A second, independent gate on the things that actually matter.
// ⚠ The directory rules are anchored to the START of the path. An unanchored
//   /past-papers/ also matches assets/past-papers/, which is the CROPPED
//   ARTWORK the question bank genuinely displays — a different thing that
//   happens to share a name. The first run of this script refused to deploy
//   over exactly that.
//   .env, .git, node_modules and the file extensions stay unanchored: those are
//   wrong at any depth.
const FORBIDDEN = [
  /(^|\/)\.env$/, /(^|\/)\.git($|\/)/, /(^|\/)node_modules($|\/)/,
  /^past-papers($|\/)/, /^exam_papers($|\/)/,
  /^\.netlify($|\/)/, /^netlify($|\/)/, /^\.import-conflicts($|\/)/,
  /\.pdf$/i, /\.sql$/i,
];

let copied = 0;
let bytes = 0;

function copyDir(relSrc) {
  const abs = path.join(ROOT, relSrc);
  if (!fs.existsSync(abs)) { console.warn('  ⚠ missing, skipped: ' + relSrc); return; }
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = relSrc + '/' + e.name;
    if (e.isDirectory()) copyDir(rel);
    else copyFile(rel);
  }
}

function copyFile(rel) {
  const from = path.join(ROOT, rel);
  const to = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  copied++;
  bytes += fs.statSync(from).size;
}

function dirSize(abs) {
  let n = 0, t = 0;
  const stack = [abs];
  while (stack.length) {
    const d = stack.pop();
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) stack.push(f); else { n++; t += fs.statSync(f).size; }
    }
  }
  return [n, t];
}

// ── clear the staging directory ─────────────────────────────────────────────
// ⚠ Fenced. A recursive delete on a mis-resolved path is not a mistake anyone
//   gets to make twice, so the target must literally be <repo>/.deploy.
(function clearStaging() {
  const resolved = path.resolve(OUT);
  if (resolved !== path.resolve(ROOT, '.deploy')) {
    throw new Error('refusing to clear an unexpected staging directory: ' + resolved);
  }
  if (fs.existsSync(resolved)) fs.rmSync(resolved, { recursive: true, force: true });
  fs.mkdirSync(resolved, { recursive: true });
})();

console.log('\nStaging a clean publish directory\n');
for (const d of DIRS) copyDir(d);
for (const f of FILES) {
  if (fs.existsSync(path.join(ROOT, f))) copyFile(f);
  else console.warn('  ⚠ missing, skipped: ' + f);
}
console.log('  copied ' + copied + ' files, ' + (bytes / 1024 / 1024).toFixed(2) + ' MB');

// ── checks ──────────────────────────────────────────────────────────────────
let failed = 0;
const fail = (m) => { console.log('  FAIL ' + m); failed++; };
const ok = (m) => console.log('  ok   ' + m);

// 1. nothing forbidden made it in
const staged = [];
(function walk(d, rel) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walk(path.join(d, e.name), r); else staged.push(r);
  }
})(OUT, '');
const leaked = staged.filter(f => FORBIDDEN.some(re => re.test(f)));
if (leaked.length) fail('forbidden paths in the output: ' + leaked.slice(0, 6).join(', '));
else ok('no secrets, PDFs, SQL, netlify/ or .netlify/ in the output');

// 2. every pre-cached shell file exists
// ⚠ cache.addAll() is ALL-OR-NOTHING: one missing file and the service worker
//   install rejects wholesale, leaving no offline shell at all.
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const shell = [...((sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [, ''])[1])
  .matchAll(/'([^']+)'/g)].map(m => m[1]).filter(f => f !== '/');
const missingShell = shell.filter(f => !fs.existsSync(path.join(OUT, f.replace(/^\//, ''))));
if (missingShell.length) fail('SHELL_FILES missing from the output: ' + missingShell.join(', '));
else ok('all ' + shell.length + ' pre-cached shell files are present');

// 3. every local script/style/link the HTML pages ask for resolves
const htmlRefs = [];
for (const f of FILES.filter(x => x.endsWith('.html'))) {
  const p = path.join(OUT, f);
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  for (const m of s.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|data:|mailto:|#|\/\/)/.test(u)) continue;
    htmlRefs.push([f, u.replace(/^\//, '').split('?')[0]]);
  }
}
const brokenRefs = htmlRefs.filter(([, u]) => u && !fs.existsSync(path.join(OUT, u)));
if (brokenRefs.length) fail('unresolved references: ' + brokenRefs.slice(0, 6).map(r => r[0] + ' -> ' + r[1]).join(', '));
else ok('all ' + htmlRefs.length + ' local references in the HTML pages resolve');

// 4. the saving, stated plainly
const [srcN, srcT] = dirSize(ROOT === OUT ? OUT : ROOT);
const [outN, outT] = dirSize(OUT);
console.log('\n  repo tree:  ' + String(srcN).padStart(6) + ' files  ' + (srcT / 1024 / 1024).toFixed(1) + ' MB');
console.log('  published:  ' + String(outN).padStart(6) + ' files  ' + (outT / 1024 / 1024).toFixed(1) + ' MB');

if (failed) {
  console.log('\n  ' + failed + ' check(s) failed — DO NOT DEPLOY THIS DIRECTORY\n');
  process.exit(1);
}
console.log('\n  ready:  netlify deploy --prod --dir=.deploy --functions=netlify/functions\n');
