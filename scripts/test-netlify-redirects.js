'use strict';
// ── What the publish root actually serves ─────────────────────────────────
//
//   node scripts/test-netlify-redirects.js
//
// `publish = "."` serves the REPO ROOT, and a CLI deploy uploads from local
// disk rather than from git — so being gitignored ships a file rather than
// excluding it. What keeps anything private is a hand-written list of 404
// redirects in netlify.toml, and a hand-written list goes stale silently.
//
// ⚠ IT ALREADY HAD. Measured against production 2026-09-08, anonymous:
//     /netlify/question-bundles/grade5-maths.json  200, 651 KB of real
//                                                  questions WITH ANSWERS
//     /netlify/functions/questions.js              200, 36 KB — the source of
//                                                  the entitlement enforcement
//     /docs/content-coverage-plan.md               200, 8.8 KB
//   `/subjects/*/questions/*` had been blocked for a long time; the bundles
//   directory is written by the build, joined the publish root later, and
//   nobody added it. That is the whole failure mode.
//
// So this test inverts the list: it walks the tree and fails on any path that
// is neither ALLOWED (the app genuinely serves it) nor blocked by a rule. A new
// directory or a stray root script cannot ship unnoticed any more.
//
// ⚠ READING A PROBE OF THIS SITE. Two different 404s come back and they mean
//   opposite things:
//     404 with ~398 KB  = a rule fired (the SPA shell, served at status 404).
//     404 with ~4.2 KB  = Netlify's own "not found" — the file was not in that
//                         deploy. NOT blocked; it will be served the first time
//                         a deploy contains it.
//   Several paths this test now guards were the second kind, i.e. safe only by
//   luck. Do not read a 404 as proof of a rule.
//
// ⚠ THE INVERSE MATTERS AS MUCH. `/netlify/*` must NOT catch
//   `/.netlify/functions/*` — a leading dot, a different first segment. If it
//   did, every question, login and payment call in the app would 404.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function _ignoredByGit(p) {
  try { execFileSync('git', ['check-ignore', '-q', p], { cwd: ROOT }); return true; }
  catch { return false; }
}

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

// ── Parse netlify.toml ────────────────────────────────────────────────────
const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
const rules = [];
for (const block of toml.split(/\[\[redirects\]\]/).slice(1)) {
  const stop = block.search(/\n\s*\[\[?[a-z]/i);
  const b = stop < 0 ? block : block.slice(0, stop);
  const g = k => (new RegExp('^\\s*' + k + '\\s*=\\s*"?([^"\\n]+)"?', 'm').exec(b) || [])[1];
  const from = g('from');
  if (!from) continue;
  rules.push({
    from: from.trim(),
    to: (g('to') || '').trim(),
    status: +(g('status') || 200),
    force: /^\s*force\s*=\s*true/m.test(b),
  });
}

// ── Netlify path matching ─────────────────────────────────────────────────
// A `*` is a splat. A trailing splat matches the rest of the path; a splat in
// the middle matches one or more segments. ⚠ A LEADING splat does not work —
// that is why "/*.md" matches nothing and each .md file has its own rule, and
// the same is true of a partial-segment splat like "/dbg*". Both shapes are
// rejected below rather than silently believed.
function ruleMatches(from, urlPath) {
  if (!from.includes('*')) return from === urlPath;
  const re = '^' + from.split('*').map(p =>
    p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.+') + '$';
  return new RegExp(re).test(urlPath);
}
function verdict(urlPath) {
  for (const r of rules) if (ruleMatches(r.from, urlPath)) return r;
  return null;
}
const blocked = p => { const r = verdict(p); return !!r && r.status === 404; };

// ── 1. Rule shapes that do nothing ────────────────────────────────────────
console.log('rule shapes');
for (const r of rules) {
  const segs = r.from.split('/');
  const bad = segs.some(s => s.includes('*') && s !== '*');
  ok(!bad, `"${r.from}" uses a partial-segment splat, which Netlify does not match`);
}
ok(rules.length > 30, `netlify.toml carries a real rule list (${rules.length})`);

// ── 2. The functions must survive the /netlify/* block ────────────────────
console.log('\nthe function routes still work');
for (const p of ['/.netlify/functions/questions', '/.netlify/functions/contact-message',
                 '/.netlify/functions/parent-pin-signin']) {
  ok(!blocked(p), `${p} is NOT caught by a 404 rule`);
}
const apiRules = rules.filter(r => r.from.startsWith('/api/'));
// 14, counted in the file. The 28 in CLAUDE.md is the 404 list, not this one -
// two different numbers that are easy to confuse.
ok(apiRules.length >= 14, `the /api/ aliases are present (${apiRules.length})`);
for (const r of apiRules) {
  ok(!blocked(r.from), `${r.from} is not shadowed by a 404 rule`);
  const fn = r.to.replace('/.netlify/functions/', '');
  ok(fs.existsSync(path.join(ROOT, 'netlify', 'functions', fn + '.js')),
     `${r.from} points at a function that exists (${fn}.js)`);
}

// ── 3. The measured leaks are closed ──────────────────────────────────────
console.log('\nthe paths measured live at 200 are blocked');
for (const p of [
  '/netlify/question-bundles/grade5-maths.json',
  '/netlify/functions/questions.js',
  '/netlify/lib/questions-sandbox.js',
  '/netlify/import-questions.js',
  '/docs/content-coverage-plan.md',
  '/dbg18.js',
  '/test.py',
  // ⚠ Caught live: an assembled .deploy/ directory carrying
  //   .deploy/subjects/*/questions/ - the question SOURCE with answers. The
  //   rule for /subjects/*/questions/* does not match a /.deploy/ prefix.
  '/.deploy/index.html',
  '/.deploy/subjects/grade5-maths/questions/ch01_numbers.js',
]) ok(blocked(p), `${p} is blocked`);

console.log('\nand the ones that were unblocked but merely absent');
for (const p of [
  '/past-papers/nce/2025-Mathematics.pdf',   // copyrighted source material
  '/past-papers/syllabus/NCF 7 to 9_230524.pdf',
  '/exam_papers/grade1/anything.pdf',
  '/migrations/20260908_material_completions.sql',
  '/tmp/scratch.json',
  '/node_modules/nodemailer/package.json',
]) ok(blocked(p), `${p} is blocked`);

console.log('\nthe long-standing blocks still hold');
for (const p of ['/CLAUDE.md', '/supabase-schema.sql', '/scripts/check.js', '/.env',
                 '/package.json', '/dev-server.js', '/.import-conflicts/x.json',
                 '/subjects/grade5-maths/questions/ch01_numbers.js'])
  ok(blocked(p), `${p} is blocked`);

// ── 4. What the app needs must NOT be blocked ─────────────────────────────
console.log('\nwhat the app serves is reachable');
for (const p of ['/index.html', '/style.css', '/sw.js', '/manifest.json',
                 '/guest.html', '/guest.js', '/vote.html', '/score.html',
                 '/image-credits.html',
                 '/engine/app.js', '/engine/nce_paper_admin.js',
                 '/subjects/_index.js', '/subjects/grade9-maths/_manifest.js',
                 '/assets/questions/provenance.json', '/icons/icon-192.png'])
  ok(!blocked(p), `${p} is reachable`);

// ── 5. The walk: anything new is either allowed or blocked ────────────────
// This is the part that does not go stale. ALLOW lists what the app actually
// serves; everything else in the publish root has to be blocked by a rule.
const ALLOW_DIRS = ['assets', 'engine', 'fonts', 'icons', 'subjects'];
const ALLOW_ROOT_FILES = new Set([
  'index.html', 'guest.html', 'guest.js', 'vote.html', 'score.html',
  'image-credits.html', 'style.css', 'sw.js', 'manifest.json',
  // Consumed by Netlify itself and never served from the CDN.
  'netlify.toml',
  // Not deployed: git metadata and editor/tooling dotfiles.
  '.gitignore', '.gitattributes', '.env.example', 'README.md',
]);
const SKIP_DIRS = new Set(['.git', 'node_modules']);

console.log('\nevery path in the publish root is allowed or blocked');
const strays = [];
for (const name of fs.readdirSync(ROOT)) {
  if (SKIP_DIRS.has(name)) continue;
  const full = path.join(ROOT, name);
  let st; try { st = fs.statSync(full); } catch { continue; }
  if (st.isDirectory()) {
    if (ALLOW_DIRS.includes(name)) continue;
    // ⚠ `.netlify/` CANNOT be blocked by a path rule: it is the same prefix
    //   Netlify serves functions from, and a 404 on it would take every
    //   function down. It is excluded from the deploy by Netlify itself and
    //   is listed in .gitignore; that is the only thing standing between its
    //   state file and the CDN, so it is asserted rather than blocked.
    if (name === '.netlify') { ok(_ignoredByGit('.netlify'), '.netlify/ is gitignored (it cannot be blocked by a rule)'); continue; }
    if (!blocked('/' + name + '/anything')) strays.push(name + '/');
  } else {
    if (ALLOW_ROOT_FILES.has(name)) continue;
    if (name.startsWith('.')) continue;
    if (!blocked('/' + name)) strays.push(name);
  }
}
ok(strays.length === 0,
   'unblocked and not allowlisted: ' + strays.join(', ')
   + ' — add a [[redirects]] 404 in netlify.toml, or add it to ALLOW_* here if the app serves it');

// node_modules and .git are skipped by the walk, so assert them explicitly.
ok(blocked('/node_modules/x/package.json'), 'node_modules is blocked by rule');

// ── 6. subjects/ is allowed, but its question SOURCE is not ───────────────
console.log('\nsubjects/ is served, its question source is not');
ok(!blocked('/subjects/grade4-maths/_manifest.js'), 'a pack manifest is reachable (PackLoader needs it)');
ok(blocked('/subjects/grade4-maths/questions/ch01_numbers.js'), 'its question source is not');
ok(blocked('/subjects/grade9-maths/questions/ch19_geometry_revision.js'),
   'the newest question file is covered by the same rule');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exitCode = fail ? 1 : 0;
