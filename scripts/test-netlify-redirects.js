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

// ── 5. The walk: everything STAGED is something the app means to serve ────
// ⚠⚠ THIS USED TO WALK THE REPO ROOT AND ASK netlify.toml. Production moved to
//    Cloudflare, which serves the STAGED directory — .deploy/, built by
//    scripts/prepare-deploy.js from an ALLOWLIST — and never reads
//    netlify.toml at all. Measured 2026-09-23, the old walk named backups/,
//    .wrangler/, workers/, wrangler.toml, lab_migration.sql, prompt.md,
//    PREDEPLOY.md and four root PDFs as "unblocked and not allowlisted". NOT
//    ONE of them is staged, so not one was ever reachable. It cried wolf about
//    files that cannot ship while being BLIND to the only directory that does
//    — which is exactly where this project's two real leaks lived (the
//    question bundles under netlify/, then subjects/*/questions/*.js, both
//    measured answering 200 on nouklass.com).
// ⚠ THE ALLOWLIST IS READ FROM prepare-deploy.js, never copied here. A second
//   hand-maintained list is a list that drifts, and the drift always favours
//   the test passing.
const DEPLOY = path.join(ROOT, '.deploy');
const pdSrc = fs.readFileSync(path.join(ROOT, 'scripts', 'prepare-deploy.js'), 'utf8');
const listOf = (name) => {
  const m = new RegExp('const ' + name + ' = \\[([\\s\\S]*?)\\n?\\];').exec(pdSrc);
  if (!m) return null;
  // ⚠⚠ STRIP COMMENTS BEFORE READING THE QUOTES. prepare-deploy.js explains
  //    itself in // comments, and one of them says "a children's app". That
  //    apostrophe opens a quoted span that swallows the next real entries, so
  //    the allowlist came back at HALF its true length and this check reported
  //    faq.html, privacy.html, robots.txt, sitemap.xml, style.css, sw.js,
  //    manifest.json, guest.js and materials.js as strays - nine files the
  //    deploy stages on purpose.
  const body = m[1].replace(/\/\/[^\n]*/g, '');
  return [...body.matchAll(/'([^']+)'/g)].map(x => x[1]);
};
const STAGE_DIRS = listOf('DIRS');
const STAGE_FILES = listOf('FILES');

console.log('\nwhat the deploy stages is what the app serves');
ok(Array.isArray(STAGE_DIRS) && STAGE_DIRS.length > 0, 'prepare-deploy.js DIRS allowlist is readable');
ok(Array.isArray(STAGE_FILES) && STAGE_FILES.length > 0, 'prepare-deploy.js FILES allowlist is readable');

// The allowlist must not name anything that is obviously not web content. This
// holds even when .deploy/ has not been built, so the check never goes quiet.
const NEVER_STAGE = ['netlify', 'workers', 'backups', 'migrations', 'scripts', 'docs', '.git', 'node_modules', '.wrangler'];
for (const bad of NEVER_STAGE)
  ok(!(STAGE_DIRS || []).includes(bad), `the deploy allowlist does not stage ${bad}/`);

if (!fs.existsSync(DEPLOY)) {
  console.log('  note  .deploy/ is not built — run node scripts/prepare-deploy.js to check the staged tree itself');
} else {
  // Nothing may sit in the staged root that the allowlist did not put there.
  // ⚠ prepare-deploy writes these itself; they are output, not input.
  const GENERATED = ['_headers', '_redirects'];
  const allowed = new Set([...(STAGE_DIRS || []), ...(STAGE_FILES || []), ...GENERATED]);
  const strays = fs.readdirSync(DEPLOY).filter(n => !allowed.has(n));
  ok(strays.length === 0, 'nothing is staged that the allowlist did not name: ' + (strays.join(', ') || 'none'));

  // ⚠ The two holes that were REAL, asserted against the staged tree rather
  //   than against a redirect rule that no longer runs anywhere.
  ok(!fs.existsSync(path.join(DEPLOY, 'netlify')),
     'the built question bundles are not staged (they answered 200 in production once)');
  const withSource = (STAGE_DIRS || []).includes('subjects')
    ? fs.readdirSync(path.join(DEPLOY, 'subjects'), { withFileTypes: true })
        .filter(e => e.isDirectory() && fs.existsSync(path.join(DEPLOY, 'subjects', e.name, 'questions')))
        .map(e => e.name)
    : [];
  ok(withSource.length === 0,
     'no pack ships its question SOURCE: ' + (withSource.slice(0, 6).join(', ') || 'none'));
  ok(fs.existsSync(path.join(DEPLOY, 'subjects', '_index.js')),
     'the pack index IS staged (PackLoader needs it)');
  for (const secret of ['.env', '.git', 'node_modules', 'wrangler.toml', 'supabase-schema.sql'])
    ok(!fs.existsSync(path.join(DEPLOY, secret)), `${secret} is not staged`);
}


// ── 6. subjects/ is allowed, but its question SOURCE is not ───────────────
console.log('\nsubjects/ is served, its question source is not');
ok(!blocked('/subjects/grade4-maths/_manifest.js'), 'a pack manifest is reachable (PackLoader needs it)');
ok(blocked('/subjects/grade4-maths/questions/ch01_numbers.js'), 'its question source is not');
ok(blocked('/subjects/grade9-maths/questions/ch19_geometry_revision.js'),
   'the newest question file is covered by the same rule');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exitCode = fail ? 1 : 0;
