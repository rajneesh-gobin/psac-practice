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
//  Run:  node scripts/preflight.js [--keep-going] [--only=1,3] [--quiet]
//  Exit: 0 all passed, 1 something failed.
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

const args      = process.argv.slice(2);
const keepGoing = args.includes('--keep-going');
const quiet     = args.includes('--quiet');
const onlyArg   = args.find(a => a.startsWith('--only='));
const only      = onlyArg
  ? new Set(onlyArg.slice('--only='.length).split(',').map(s => Number(s.trim())).filter(Boolean))
  : null;

if (args.includes('--list') || args.includes('-h') || args.includes('--help')) {
  console.log('Steps, in the order they must run:\n');
  STEPS.forEach((s, i) => console.log(`  ${i + 1}. node ${s.script}  — ${s.label}`));
  console.log('\nnode scripts/preflight.js [--keep-going] [--only=1,3] [--quiet] [--list]');
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

  console.log(`\n${BOLD}── ${n}/${STEPS.length} · node ${step.script}${OFF} — ${step.label}`);
  const before = step.watch ? fingerprint(step.watch) : null;
  const t0 = Date.now();
  // ⚠ Always piped, never 'inherit': the summary is derived from what the step
  // PRINTED, and there is no second copy of it. Each step is well under a
  // second, so its output lands as one block instead of streaming.
  const r = spawnSync(process.execPath, [path.join(ROOT, step.script)], {
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

  if (!quiet || !ok) {
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
