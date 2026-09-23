'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The one .env reader, and the ORDER preflight reads it in.
//
//  WHY THIS EXISTS — `node scripts/preflight.js --import`, the command
//  CLAUDE.md documents, refused with "SUPABASE_SERVICE_ROLE_KEY is not set"
//  while the key sat in .env correctly named. preflight checked process.env
//  itself; the only thing that ever read .env was netlify/import-questions.js,
//  one level down, which the guard exited before reaching. The reader had been
//  hand-written twice and simply not written a third time.
//
//  ⚠ The ordering is the whole bug, so it is asserted on the SOURCE: a require
//    that lands after the guard is the same defect with an extra file.
//
//  Run:  node scripts/test-env-loader.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const { loadEnv } = require('./lib/load-env');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-env-'));
const write = (name, body) => { const p = path.join(tmp, name); fs.writeFileSync(p, body); return p; };

// ── 1 · the CRLF trap, which is the reason there is one copy ─────────────
// A '\n' split leaves a trailing \r on every line. \r is a regex line
// terminator: `.` cannot match it and `$` will not match before it, so a
// pattern anchored with $ fails on EVERY line and the file parses to {} —
// reported as "the key is not set" while the key is right there.
{
  const p = write('crlf.env', 'PSAC_T_ONE=alpha\r\nPSAC_T_TWO=beta\r\n');
  delete process.env.PSAC_T_ONE; delete process.env.PSAC_T_TWO;
  const set = loadEnv(p);
  ok('a CRLF .env parses, which a \\n split does not', process.env.PSAC_T_ONE === 'alpha', process.env.PSAC_T_ONE);
  ok('and no value keeps a trailing carriage return',
    process.env.PSAC_T_TWO === 'beta' && !/\r/.test(process.env.PSAC_T_TWO || ''), JSON.stringify(process.env.PSAC_T_TWO));
  ok('it reports what it set', set.includes('PSAC_T_ONE') && set.includes('PSAC_T_TWO'), set);
}

// ── 2 · an LF file works identically ─────────────────────────────────────
{
  const p = write('lf.env', 'PSAC_T_LF=gamma\n');
  delete process.env.PSAC_T_LF;
  loadEnv(p);
  ok('an LF .env parses too', process.env.PSAC_T_LF === 'gamma');
}

// ── 3 · the environment always wins over the file ────────────────────────
// ⚠ A value exported in the shell or passed on the command line must beat the
//   file, or pointing a script at another project becomes impossible.
{
  const p = write('win.env', 'PSAC_T_WIN=from_file\n');
  process.env.PSAC_T_WIN = 'from_shell';
  const set = loadEnv(p);
  ok('an existing variable is never overwritten', process.env.PSAC_T_WIN === 'from_shell');
  ok('and it is not reported as set', !set.includes('PSAC_T_WIN'), set);
}

// ── 4 · the awkward lines ────────────────────────────────────────────────
{
  const p = write('odd.env', [
    '# a comment',
    '',
    '   ',
    'PSAC_T_Q="quoted"',
    "PSAC_T_SQ='single'",
    'PSAC_T_EQ=a=b=c',
    'PSAC_T_EMPTY=',
    'no_equals_here',
  ].join('\r\n'));
  ['PSAC_T_Q', 'PSAC_T_SQ', 'PSAC_T_EQ', 'PSAC_T_EMPTY'].forEach(k => delete process.env[k]);
  loadEnv(p);
  ok('double quotes are stripped', process.env.PSAC_T_Q === 'quoted', process.env.PSAC_T_Q);
  ok('single quotes are stripped', process.env.PSAC_T_SQ === 'single', process.env.PSAC_T_SQ);
  ok('only the FIRST = splits, so a value may contain more',
    process.env.PSAC_T_EQ === 'a=b=c', process.env.PSAC_T_EQ);
  ok('an empty value is still set, not skipped', process.env.PSAC_T_EMPTY === '');
  ok('comments, blanks and junk lines are ignored without throwing', true);
}

// ── 5 · no file at all ───────────────────────────────────────────────────
ok('a missing .env returns nothing and does not throw',
  Array.isArray(loadEnv(path.join(tmp, 'nope.env'))) && loadEnv(path.join(tmp, 'nope.env')).length === 0);

fs.rmSync(tmp, { recursive: true, force: true });

// ── 6 · the ordering in preflight, asserted on the source ────────────────
{
  const src = fs.readFileSync(path.join(ROOT, 'scripts', 'preflight.js'), 'utf8');
  const req = src.indexOf("require('./lib/load-env')");
  const guard = src.indexOf('!process.env.SUPABASE_SERVICE_ROLE_KEY');
  ok('preflight requires the shared loader', req !== -1);
  ok('the guard still exists - the fix was the order, not removing the check', guard !== -1);
  ok('and .env is read BEFORE the guard reads process.env', req !== -1 && guard !== -1 && req < guard,
    { req, guard });
}

// ── 7 · nobody re-implements it ──────────────────────────────────────────
// scripts/check.js enforces this repo-wide; these two are the files that each
// used to carry their own copy.
for (const rel of ['netlify/import-questions.js', 'scripts/db-query.js']) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  ok(rel + ' requires the shared loader', /require\((['"]).*lib\/load-env\1\)/.test(src));
  ok(rel + ' no longer assigns a computed env key itself',
    !/process\.env\[[^\]]+\]\s*=/.test(src));
}

console.log(`\nEnv loader: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
