#!/usr/bin/env node
'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The content preflight — the five commands that must pass after any
//  content or chapter change, in the one order that works:
//
//    1 build-subject-index       regenerates subjects/_index.js
//    2 test-subsection-invariant declared vs tagged subsection ids
//    3 build-questions           rebuilds netlify/question-bundles/
//    4 test-live-pack-content    a live pack must actually hold questions
//    5 check                     static checks, incl. index drift from (1)
//
//  Order is load-bearing: (5) fails on the index drift that (1) fixes, and
//  (3) must see the manifests (1) has just rewritten. Each step runs as its
//  OWN node process — the builders and the tests each define STATIC_QUESTIONS
//  and the question factories at global scope, so one process would collide.
//
//  And, only when asked for by name:
//
//    6 import-questions          upsert the verified corpus into Supabase
//
//  ⚠ STEPS 1-5 ARE LOCAL. They write files in this repo and read nothing over
//  the network, which is what makes this command safe to run on a whim - and
//  running it on a whim is the point. Step 6 writes to the PRODUCTION database.
//  It therefore exists only when --import (or --import-dry-run) asks for it,
//  never by default, and it never runs after a failed step - not even under
//  --keep-going, whose whole job is to carry on past failures.
//
//  ⚠ The gates are worth having in front of a write. The importer runs its own
//  fail-closed preflight, but that one checks a QUESTION (unique id, known
//  type, required fields, difficulty 1-4, chapterId present). It does not check
//  the subsection invariant, whether a live pack holds real content, or index
//  drift. Steps 2, 4 and 5 do, and nothing used to stop you importing a corpus
//  that failed all three.
//
//  Run:  node scripts/preflight.js [--keep-going] [--only=1,3] [--quiet]
//        node scripts/preflight.js --import-dry-run   # reads the DB, writes nothing
//        node scripts/preflight.js --import           # checks, then writes
//  Exit: 0 all passed, 1 something failed, 2 the command line was wrong.
// ══════════════════════════════════════════════════════════════════════════

const { spawnSync } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

const num = n => n.toLocaleString('en-US');
const lines = out => out.split(/\r?\n/);
const grab = (out, re) => { const m = out.match(re); return m ? m[1].trim() : ''; };

// A step that PASSES still has something to say, and under --quiet its output
// is thrown away — so every step names, in one line, what it measured. These
// are the counts CLAUDE.md says to re-measure from the built bundles rather
// than quote from a .md; the preflight computes them, so it should report them.
const SUMMARY = {
  imported: out => {
    const n = re => { const m = out.match(re); return m ? m[1].trim() : null; };
    const added = n(/^New\s+([\d,]+)/m), updated = n(/^Updated\s+([\d,]+)/m);
    const verified = n(/verified: ([\d,]+)/), failed = n(/failed\/unverified: ([\d,]+)/);
    if (added === null && updated === null) return '';
    // ⚠ A clean re-import is "0 new, ~560 updated", not zero writes - an
    //   unchanged row is deliberately not rewritten, and that is not a failure.
    return `${added} new · ${updated} updated`
      + (verified ? ` · ${verified} verified` : '')
      + (failed && failed !== '0' ? ` · ${failed} FAILED` : '');
  },

  index: out => grab(out, /_index\.js\s+—\s+(.+)$/m),

  tests: out => {
    const m = out.match(/(\d+) passed, (\d+) failed/g);
    return m ? m[m.length - 1] : '';
  },

  bundles: out => {
    let grades = 0, qs = 0, past = 0;
    for (const l of lines(out)) {
      const g = l.match(/^grade\d+\.json\s+—\s+\d+ subjects, (\d+) questions/);
      if (g) { grades++; qs += Number(g[1]); continue; }
      const p = l.match(/^past-papers\.json\s+—\s+(\d+) questions/);
      if (p) past = Number(p[1]);
    }
    if (!grades) return '';
    return `${grades} grades, ${num(qs)} questions + ${num(past)} past-paper items`;
  },

  checks: out => {
    const n = lines(out).filter(l => /^\s{2}ok\s{2}/.test(l)).length;
    return n ? `${n} checks passed` : '';
  },
};

const STEPS = [
  { script: 'scripts/build-subject-index.js',       label: 'regenerate subjects/_index.js',
    summary: SUMMARY.index, watch: 'subjects/_index.js' },
  { script: 'scripts/test-subsection-invariant.js', label: 'declared subsections == tagged subsections',
    summary: SUMMARY.tests },
  { script: 'netlify/build-questions.js',           label: 'rebuild the question bundles',
    summary: SUMMARY.bundles },
  { script: 'scripts/test-live-pack-content.js',    label: 'live packs hold real content',
    summary: SUMMARY.tests },
  { script: 'scripts/check.js',                     label: 'static checks (index drift, sw shell, LOCAL_FILES)',
    summary: SUMMARY.checks },
];

// ⚠ A review that fails nothing is invisible: the thin-pack notes, and the
// `skip <file>: <error>` a question file throws on during the build — which is
// exactly how 365 French questions once went missing from the database with a
// warning in a summary nobody read. Collected and re-printed under the summary.
const NOTE_RE = /^\s*(?:note\b|warn(?:ing)?\b|skip\b|⚠)/i;
const FAIL_RE = /(?:^|\s)(?:FAIL\b|✗|✖|Error:)/;

const ESC   = String.fromCharCode(27);
const color = process.stdout.isTTY && !process.env.NO_COLOR;
const BOLD  = color ? ESC + '[1m'  : '';
const DIM   = color ? ESC + '[2m'  : '';
const RED   = color ? ESC + '[31m' : '';
const GREEN = color ? ESC + '[32m' : '';
const AMBER = color ? ESC + '[33m' : '';
const OFF   = color ? ESC + '[0m'  : '';

const USAGE = [
  'Usage: node scripts/preflight.js [--keep-going] [--only=1,3] [--quiet] [--list]',
  '                                 [--import | --import-dry-run]',
  '',
  '  (no flag)          Steps 1-5. Local only: writes files in this repo,',
  '                     touches no network and no database.',
  '  --import           Also run step 6 — upsert the corpus into Supabase.',
  '                     Skipped if any earlier step failed.',
  '  --import-dry-run   Step 6 as a dry run: reads the database, reports what',
  '                     would change, writes nothing.',
  '  --keep-going       Carry on past a failed step (never into step 6).',
  '  --only=1,3         Run just these steps.',
  '  --quiet            Suppress the output of steps that pass (never step 6).',
  '  --list             Print the steps and exit.',
  '',
  '  --import and --import-dry-run both need SUPABASE_SERVICE_ROLE_KEY.',
].join('\n');

const args = process.argv.slice(2);
// ⚠ AN UNKNOWN OR MISSPELLED FLAG IS NEVER IGNORED - the same rule
// netlify/import-questions.js keeps, for the same reason. Ignoring "--imports"
// would run the local steps and let you walk away believing you had imported.
const KNOWN = ['--keep-going', '--quiet', '--list', '-h', '--help', '--import', '--import-dry-run'];
const badArg = args.find(a => !KNOWN.includes(a) && !a.startsWith('--only='));
if (badArg) {
  console.error('Unknown option ' + JSON.stringify(badArg) + '\n\n' + USAGE);
  process.exit(2);
}

const keepGoing = args.includes('--keep-going');
const quiet     = args.includes('--quiet');
const importMode = args.includes('--import') ? 'live'
  : args.includes('--import-dry-run') ? 'dry-run' : null;
const onlyArg   = args.find(a => a.startsWith('--only='));
const only      = onlyArg
  ? new Set(onlyArg.slice('--only='.length).split(',').map(s => Number(s.trim())).filter(Boolean))
  : null;

// ⚠ Refuse BEFORE anything runs. Discovering the credential is missing at step
// 6, after a minute of building, is how a run ends with five green steps and no
// import - which reads as success.
if (importMode && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is not set, and ' + (importMode === 'live' ? '--import' : '--import-dry-run')
    + ' needs it.\nNothing has run. Set it and try again, or drop the flag for the local steps only.');
  process.exit(2);
}

if (importMode) {
  STEPS.push({
    script: 'netlify/import-questions.js',
    args: importMode === 'dry-run' ? ['--dry-run'] : [],
    label: importMode === 'dry-run'
      ? 'read the database and report what WOULD change'
      : 'upsert the verified corpus into Supabase',
    summary: SUMMARY.imported,
    // Both are gated behind the five checks; only one of them writes.
    isImport: true,
    writes: importMode === 'live',
  });
}

if (args.includes('--list') || args.includes('-h') || args.includes('--help')) {
  console.log('Steps, in the order they must run:\n');
  STEPS.forEach((s, i) => console.log(`  ${i + 1}. node ${s.script}  — ${s.label}`));
  if (!importMode) console.log('\n  6. node netlify/import-questions.js  — only with --import or --import-dry-run');
  console.log('\n' + USAGE);
  process.exit(0);
}

const fingerprint = rel => {
  try {
    return crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex');
  } catch { return null; }
};

const results = [];
const notes = [];
let failed = false;
const started = Date.now();

for (let i = 0; i < STEPS.length; i++) {
  const step = STEPS[i];
  const n = i + 1;
  if (only && !only.has(n)) { results.push({ n, step, status: 'skipped', ms: 0 }); continue; }

  // ⚠ THE GATE. --keep-going exists to carry on past a failure, and carrying
  //   on INTO a production write is the one thing it must never do.
  if (step.isImport && failed) {
    console.error(`\n${RED}── ${n}/${STEPS.length} · skipped: an earlier step failed.${OFF} `
      + 'Nothing was sent to the database.');
    results.push({ n, step, status: 'skipped', ms: 0 });
    continue;
  }
  if (step.writes) {
    console.log(`\n${AMBER}${BOLD}⚠ WRITING TO THE PRODUCTION DATABASE${OFF}`);
  }
  console.log(`\n${BOLD}── ${n}/${STEPS.length} · node ${step.script}${OFF} — ${step.label}`);
  const before = step.watch ? fingerprint(step.watch) : null;
  const t0 = Date.now();
  // ⚠ Always piped, never 'inherit': the summary is derived from what the step
  // PRINTED, and there is no second copy of it. Each step is well under a
  // second, so its output lands as one block instead of streaming.
  const r = spawnSync(process.execPath, [path.join(ROOT, step.script), ...(step.args || [])], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  });
  const ms = Date.now() - t0;
  const code = r.status === null ? 1 : r.status;
  const ok   = code === 0 && !r.error;

  const stdout = r.stdout ? r.stdout.toString() : '';
  const stderr = r.stderr ? r.stderr.toString() : '';
  const out = stdout + stderr;

  // ⚠ A write to production is never silenced by --quiet.
  if (!quiet || !ok || step.isImport) {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  }
  if (r.error) console.error(`  ✗ could not run: ${r.error.message}`);

  for (const l of lines(out)) if (NOTE_RE.test(l)) notes.push({ n, text: l.trim() });

  let headline = '';
  if (ok && step.summary) { try { headline = step.summary(out) || ''; } catch { headline = ''; } }
  if (step.watch && before !== null) {
    const changed = fingerprint(step.watch) !== before;
    headline += (headline ? ' · ' : '')
      + (changed ? `${step.watch} REWRITTEN — commit it` : `${step.watch} unchanged`);
  }

  const firstFail = ok ? '' : (lines(out).find(l => FAIL_RE.test(l)) || '').trim();

  results.push({ n, step, status: ok ? 'passed' : 'FAILED', ms, code, headline, firstFail });
  if (!ok) {
    failed = true;
    if (!keepGoing) {
      console.error(`\n${RED}Stopped at step ${n} (exit ${code}).${OFF} `
        + 'Fix it and re-run, or pass --keep-going to see every failure.');
      break;
    }
  }
}

console.log(`\n${BOLD}Preflight summary${OFF}`);
for (const r of results) {
  const mark = r.status === 'passed' ? `${GREEN}ok${OFF}    `
    : r.status === 'skipped' ? 'skip  '
      : `${RED}FAIL${OFF}  `;
  const time = r.status === 'skipped' ? '' : ` (${(r.ms / 1000).toFixed(1)}s)`;
  const noteCount = notes.filter(x => x.n === r.n).length;
  const tail = r.status === 'FAILED'
    ? ` — exit ${r.code}${r.firstFail ? ': ' + r.firstFail : ''}`
    : (r.headline ? ` — ${r.headline}` : '')
      + (noteCount ? `${AMBER} · ${noteCount} note${noteCount === 1 ? '' : 's'}${OFF}` : '');
  console.log(`  ${mark}${r.n}. ${r.step.script}${time}${tail}`);
}
const notRun = STEPS.length - results.length;
if (notRun > 0) console.log(`  ${notRun} step(s) not run.`);
console.log(`  ${DIM}${((Date.now() - started) / 1000).toFixed(1)}s total${OFF}`);

if (notes.length) {
  console.log(`\n${BOLD}Reviews and warnings${OFF} ${DIM}(nothing failed on these)${OFF}`);
  const SHOWN = 15;
  for (const nt of notes.slice(0, SHOWN)) console.log(`  ${AMBER}${nt.n}.${OFF} ${nt.text}`);
  if (notes.length > SHOWN) console.log(`  … and ${notes.length - SHOWN} more, above.`);
}

process.exit(failed ? 1 : 0);
