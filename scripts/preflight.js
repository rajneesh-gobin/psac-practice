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
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const STEPS = [
  { script: 'scripts/build-subject-index.js',       label: 'regenerate subjects/_index.js' },
  { script: 'scripts/test-subsection-invariant.js', label: 'declared subsections == tagged subsections' },
  { script: 'netlify/build-questions.js',           label: 'rebuild the question bundles' },
  { script: 'scripts/test-live-pack-content.js',    label: 'live packs hold real content' },
  { script: 'scripts/check.js',                     label: 'static checks (index drift, sw shell, LOCAL_FILES)' },
];

const ESC   = String.fromCharCode(27);
const color = process.stdout.isTTY && !process.env.NO_COLOR;
const BOLD  = color ? ESC + '[1m'  : '';
const RED   = color ? ESC + '[31m' : '';
const GREEN = color ? ESC + '[32m' : '';
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

const results = [];
let failed = false;

for (let i = 0; i < STEPS.length; i++) {
  const step = STEPS[i];
  const n = i + 1;
  if (only && !only.has(n)) { results.push({ n, step, status: 'skipped', ms: 0 }); continue; }

  console.log(`\n${BOLD}── ${n}/${STEPS.length} · node ${step.script}${OFF} — ${step.label}`);
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [path.join(ROOT, step.script)], {
    cwd: ROOT,
    stdio: quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    env: process.env,
  });
  const ms = Date.now() - t0;
  const code = r.status === null ? 1 : r.status;
  const ok   = code === 0 && !r.error;

  if (quiet && !ok) {
    if (r.stdout) process.stdout.write(r.stdout.toString());
    if (r.stderr) process.stderr.write(r.stderr.toString());
  }
  if (r.error) console.error(`  ✗ could not run: ${r.error.message}`);

  results.push({ n, step, status: ok ? 'passed' : 'FAILED', ms, code });
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
  console.log(`  ${mark}${r.n}. ${r.step.script}${time}`);
}
const notRun = STEPS.length - results.length;
if (notRun > 0) console.log(`  ${notRun} step(s) not run.`);

process.exit(failed ? 1 : 0);
