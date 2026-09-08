'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  "Who has finished?" — the completion state on the teacher Results screen.
//
//  ⚠ The data was always there. teacher_guest_results() already merges roster
//  pupils with no submission back in as { not_started: true }, and
//  TeacherInsights.state() already returned completed / working / not-started.
//  What was missing was any way to SEE it: every pupil row rendered identically
//  whatever their state, so a teacher scanning 25 names could not tell who was
//  done without reading each line.
//
//  ⚠ COLOUR IS NEVER THE ONLY SIGNAL. Each row carries a glyph and a word as
//  well as green, so the state survives a colour-vision deficiency, a greyscale
//  printout and a screenshot. That is what most of this file asserts.
//
//  Run: node scripts/test-results-completion.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const wsSrc  = fs.readFileSync(path.join(ROOT, 'engine/teacher_workspace.js'), 'utf8');
const cssSrc = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

// ── 1 · the state machine, run for real ───────────────────────────────────
section('state, from the shared insights module');
{
  const sandbox = { console, window: {}, module: { exports: {} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/teacher_insights.js'), 'utf8'), sandbox,
    { filename: 'teacher_insights.js' });
  const TI = sandbox.TeacherInsights || sandbox.window.TeacherInsights;
  ck('TeacherInsights loads and exposes state()', !!TI && typeof TI.state === 'function');

  // ⚠ The three shapes the RPC actually returns. `not_started` is set by
  // teacher_guest_results() for a roster pupil with no submission row at all;
  // a pupil who opened the work but has not submitted has NEITHER flag.
  ck('a submitted pupil is completed', TI.state({ submitted_at: '2026-09-15T10:00:00Z', score: 8, total: 10 }) === 'completed');
  ck('a roster pupil with no submission is not-started', TI.state({ not_started: true }) === 'not-started');
  ck('a pupil who opened but has not submitted is working', TI.state({}) === 'working');
  ck('a missing row is not-started, never completed', TI.state(null) === 'not-started');
  // ⚠ The dangerous direction: never report "done" for someone who is not.
  ck('nothing without submitted_at is ever completed',
    [{}, { not_started: true }, { score: 10, total: 10 }, { pct: 100 }, null, undefined]
      .every(r => TI.state(r) !== 'completed'));
}

// ── 2 · the row markup ────────────────────────────────────────────────────
section('every pupil row shows its state');
{
  ck('the row carries a state class', /class="tr-row tr-row-\$\{state\}/.test(wsSrc));
  ck('the avatar carries it too', /tr-avatar tr-avatar-\$\{state\}/.test(wsSrc));
  ck('there is a badge for all three states',
    /completed:\s*\{[^}]*tr-state-done/.test(wsSrc)
    && /working:\s*\{[^}]*tr-state-working/.test(wsSrc)
    && /'not-started':\s*\{[^}]*tr-state-idle/.test(wsSrc));
  // ⚠ The accessibility rule, asserted rather than trusted to review.
  for (const [state, glyph, label] of [['completed', '✓', 'Done'], ['working', '●', 'Working'], ['not-started', '○', 'Not started']]) {
    const block = (wsSrc.match(new RegExp("'?" + state + "'?:\\s*\\{[^}]*\\}")) || [''])[0];
    ck(state + ' has a glyph', block.includes("glyph: '" + glyph + "'"), block);
    ck(state + ' has a word, not just a colour', block.includes("label: '" + label + "'"), block);
  }
  ck('the glyph is hidden from screen readers, the word is not',
    /<span aria-hidden="true">\$\{badge\.glyph\}<\/span> \$\{badge\.label\}/.test(wsSrc));
  ck('an unknown state falls back to not-started, never to done',
    /STATE_BADGE\[state\] \|\| STATE_BADGE\['not-started'\]/.test(wsSrc));
  ck('the pupil name is still escaped', /esc\(r\.name \|\| 'Pupil'\)/.test(wsSrc));
}

// ── 3 · the card ──────────────────────────────────────────────────────────
section('the work card');
{
  ck('the completion line is green only when everyone is done',
    /c\.done >= c\.total \? ' tw-completion-all'/.test(wsSrc));
  // ⚠ This is the assertion that matters: a part-finished class must NOT read
  // as handled.
  ck('a part-finished class does NOT get the green class',
    /: c\.done \? ' tw-completion-some'/.test(wsSrc));
  ck('a tick is added only at full completion', /\$\{c\.done >= c\.total \? '✓ ' : ''\}/.test(wsSrc));
  ck('.tw-completion-all is defined', /\.tw-completion-all \{ color: #15803d/.test(cssSrc));
  ck('.tw-completion-some keeps the ordinary ink',
    /\.tw-completion-some \{ color: var\(--tp-ink\)/.test(cssSrc));
}

// ── 4 · the CSS ───────────────────────────────────────────────────────────
section('styling');
{
  for (const cls of ['tr-row-completed', 'tr-row-working', 'tr-row-not-started',
                     'tr-state-done', 'tr-state-working', 'tr-state-idle',
                     'tr-avatar-completed', 'tr-avatar-working', 'tr-avatar-not-started']) {
    ck('.' + cls + ' is styled', new RegExp('\\.' + cls + '\\b').test(cssSrc));
  }
  // ⚠ The board rule scores (1,3,1) and beats a single id, so the override must
  // use the doubled id — the same trap the rest of the command-centre CSS has.
  ck('the chalkboard override uses the doubled id',
    /#screen-teacher#screen-teacher \.tr-state-done/.test(cssSrc));
  // ⚠ A left border, not a filled row: "finished" and "may need help" are
  // independent, and a pupil can be both.
  ck('completion is a border, so it does not fight the may-need-help highlight',
    /\.tr-row-completed\s*\{ border-left: 4px solid/.test(cssSrc));
  ck('the help highlight is still a background, so both can show at once',
    /\.tr-row-help \{ background:/.test(cssSrc));

  // Contrast of each pill, computed rather than eyeballed.
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lum = c => { const s = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]; };
  const ratio = (a, b) => { const L1 = lum(hex(a)), L2 = lum(hex(b));
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
  for (const [name, bg, ink] of [
    ['tr-state-done (light)',  '#dcfce7', '#14532d'],
    ['tr-state-working (light)', '#fef3c7', '#713f12'],
    ['tr-state-idle (light)',  '#e5e7eb', '#374151'],
    ['tr-state-done (board)',  '#bbf7d0', '#052e16'],
    ['tr-state-working (board)', '#fde68a', '#451a03'],
    ['tr-state-idle (board)',  '#e5e7eb', '#1f2937'],
    ['tr-avatar-completed',    '#bbf7d0', '#14532d'],
    ['tr-avatar-working',      '#fde68a', '#713f12'],
    ['tr-avatar-not-started',  '#e5e7eb', '#4b5563'],
  ]) {
    const r = ratio(bg, ink);
    ck(name + ' clears 4.5:1', r >= 4.5, r.toFixed(1) + ':1');
  }
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
