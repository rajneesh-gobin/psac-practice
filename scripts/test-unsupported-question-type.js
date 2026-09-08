'use strict';
// ── A question type with no renderer must REFUSE, not draw a number pad ───
//
// Two independent guards, tested independently, because each has been the only
// thing standing between a child and a nonsense screen at some point:
//
//   1. isPoolQuestion() keeps 'cloze' and 'task' out of every practice and
//      exam pool, so they never reach a renderer at all.
//   2. renderAnswerArea() refuses any type it does not know, so if guard 1 is
//      ever edited away the failure is a visible message rather than an
//      inputmode="decimal" digit pad under "construct the angle bisector".
//
// ⚠ Guard 2 exists precisely BECAUSE guard 1 can be edited away. Testing only
//   guard 1 would pass on the day someone deletes it.
//
//   node scripts/test-unsupported-question-type.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

// ── Extract a top-level function ──────────────────────────────────────────
// A top-level `function foo(` runs until the first `}` alone at column 0, and
// that is all this needs to know.
//
// ⚠ Counting braces was tried first and FAILED on the real file: app.js
//   contains `/[.*+?^${}()|[\]\\]/g` (braces inside a regex literal) and
//   template literals whose `${...}` holds nested braces and apostrophes, so a
//   naive scanner loses its depth and reports "unbalanced braces" on a
//   perfectly valid function.
//
// ⚠ Line endings are normalised to LF FIRST. CLAUDE.md records a harness that
//   matched on a "\n  }\n" pattern and reported "could not extract" — which
//   reads as "the function is gone" — while the function was present and
//   correct, because the file was CRLF. Measured here: engine/app.js is LF but
//   engine/questions_engine.js is mixed, so neither can be assumed.
function extractFunction(src, name) {
  const s = src.replace(/\r\n/g, '\n');
  const start = s.indexOf('function ' + name + '(');
  if (start === -1) throw new Error(`could not find function ${name}`);
  const end = s.indexOf('\n}\n', start);
  if (end === -1) throw new Error(`could not find the end of ${name}`);
  return s.slice(start, end + 2);
}

// ── Guard 1: the pools ────────────────────────────────────────────────────
console.log('guard 1 — isPoolQuestion()');
{
  const src = fs.readFileSync(path.join(ROOT, 'engine', 'questions_engine.js'), 'utf8');
  const excluded = src.match(/const _POOL_TYPES_EXCLUDED = new Set\(\[([^\]]*)\]\)/);
  ok(!!excluded, '_POOL_TYPES_EXCLUDED is declared');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(
    excluded[0] + ';\n' + extractFunction(src, 'isPoolQuestion') + ';\n', sandbox);
  const q = t => ({ question: 'x', type: t });
  ok(sandbox.isPoolQuestion(q('mcq')), 'mcq is dealt');
  ok(sandbox.isPoolQuestion(q('numeric')), 'numeric is dealt');
  ok(sandbox.isPoolQuestion(q('text')), 'text is dealt');
  ok(sandbox.isPoolQuestion(q('multi')), 'multi is dealt');
  ok(sandbox.isPoolQuestion(q('symmetry')), 'symmetry is dealt');
  ok(sandbox.isPoolQuestion(q('expr')), 'expr (algebraic answer) is dealt');
  ok(sandbox.isPoolQuestion(q('slots')), 'slots (multi-blank answer) is dealt');
  ok(sandbox.isPoolQuestion(q('symmetry-line')), 'symmetry-line is dealt');
  ok(!sandbox.isPoolQuestion(q('cloze')), 'cloze is NOT dealt');
  ok(!sandbox.isPoolQuestion(q('task')), 'task is NOT dealt');
  ok(!sandbox.isPoolQuestion({ type: 'mcq' }), 'a question with no text is NOT dealt');
}

// ── Guard 2: the renderer ─────────────────────────────────────────────────
console.log('guard 2 — renderAnswerArea()');
{
  const src = fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8');
  const fn = extractFunction(src, 'renderAnswerArea');
  ok(fn.length > 200, 'renderAnswerArea extracted');

  // Minimal DOM + the handful of app globals the function reaches for. Every
  // stub is deliberately dumb: if the function starts depending on something
  // real, this test breaks loudly instead of testing a different code path.
  // ⚠ The stub grows as the real function does. renderAnswerArea now clears a
  //   layout class at the top (`cont.classList.remove('pr-answers-pair')`), so
  //   a bare object without classList throws before any branch is reached — the
  //   whole suite died with "Cannot read properties of undefined". Keeping the
  //   stub minimal is deliberate: when it stops being enough, that is a signal
  //   the function changed, not noise to be padded away.
  const el = {
    innerHTML: '', id: 'ans',
    _classes: new Set(),
    classList: {
      add: c => el._classes.add(c),
      remove: c => el._classes.delete(c),
      contains: c => el._classes.has(c),
      toggle: (c, on) => { const want = on === undefined ? !el._classes.has(c) : !!on;
                           want ? el._classes.add(c) : el._classes.delete(c); return want; },
    },
  };
  const sandbox = {
    console: { warn: (...a) => sandbox._warnings.push(a.join(' ')), log: () => {} },
    _warnings: [],
    document: { getElementById: id => (id === 'ans' ? el : null) },
    // The numeric branch asks whether it is on a phone before drawing its pad.
    // Answering "desktop" keeps that branch on its widest path, which is the
    // one carrying the inputmode="decimal" input this test looks for.
    window: { matchMedia: () => ({ matches: false }) },
    // The numeric branch schedules a focus. Running it immediately (rather
    // than swallowing it) keeps the stub honest: if that callback ever starts
    // doing real work, this test sees it.
    setTimeout: fn => { try { fn(); } catch (e) {} },
    renderSymmetryGrid: () => { el.innerHTML = '<div class="sym-grid"></div>'; },
    renderSymmetryLine: () => { el.innerHTML = '<svg class="symline-svg"></svg>'; },
    checkAnswer: () => false,
    matchTypedAnswer: () => ({ ok: false, slip: false }),
    Assessment: { markExpression: () => ({ correct: false, earned: 0 }),
                  markPart: () => ({ correct: false, earned: 1, manual: false }) },
    _attr: s => String(s == null ? '' : s).replace(/"/g, '&quot;'),
    _prettyMath: s => String(s == null ? '' : s),
    // The MCQ branch now measures option length to decide a two-column layout.
    _plainText: s => String(s == null ? '' : s).replace(/<[^>]+>/g, ''),
    SYMBOL_KEYS: {},
  };
  vm.createContext(sandbox);
  vm.runInContext(fn, sandbox);

  const render = q => { el.innerHTML = ''; sandbox._warnings.length = 0; sandbox.renderAnswerArea(q, 'ans', '', false); return el.innerHTML; };
  const NUMPAD = /inputmode="decimal"/;
  const REFUSAL = /answer-unsupported/;

  // Every ordinary answer-area type in the built bundles must still render.
  ok(/mcq-opt/.test(render({ id: 'a', type: 'mcq', question: 'q', options: ['1', '2'], answer: '1' })),
     'mcq still renders its options');
  ok(/opt-letter/.test(render({ id: 'a', type: 'multi', question: 'q', options: ['1', '2', '3'], answer: ['1'] })),
     'multi still renders');
  ok(/sym-grid/.test(render({ id: 'a', type: 'symmetry', question: 'q' })),
     'symmetry still routes to its own grid');
  ok(/symline-svg/.test(render({ id: 'a', type: 'symmetry-line', question: 'q' })),
     'symmetry-line routes to its drawing surface');
  ok(/inputmode="text"/.test(render({ id: 'a', type: 'text', question: 'q', answer: 'mot' })),
     'text still renders a TEXT input, not a digit pad');
  // ⚠ An ALGEBRAIC answer must get a TEXT input. Projected as 'numeric' it
  //   would get inputmode="decimal" - a digit pad that cannot type a letter,
  //   a caret or a plus, under "Simplify (a^5)^4".
  const ex = render({ id: 'a', type: 'expr', question: 'q', answer: 'a^8', acceptableAnswers: ['a^8'] });
  ok(/inputmode="text"/.test(ex), 'expr renders a TEXT input');
  ok(!NUMPAD.test(ex), 'expr does NOT get a digit pad');
  ok(!REFUSAL.test(ex), 'expr is not refused');
  ok(/^/.test(ex), 'expr tells the child how to type a power');

  // ⚠ A multi-blank answer must render SEVERAL boxes, not one. Before the
  //   slots renderer existed, `blanks` and `cells` were print-only: a child
  //   met them on the paper and could not practise them at all.
  const sl = render({ id: 'a', type: 'slots', question: 'q', marks: 4,
    slotResponse: { kind: 'blanks', answer: [['2'], ['-1']], labels: ['x', 'y'] } });
  ok((sl.match(/slot-input/g) || []).length === 2, 'slots renders one input per blank');
  ok(/inputmode="text"/.test(sl), 'slot boxes take text, not a digit pad');
  ok(!NUMPAD.test(sl), 'slots does NOT get a digit pad');
  ok(!REFUSAL.test(sl), 'slots is not refused');
  ok(sl.indexOf('<i>x</i> =') !== -1,
     'a named unknown is labelled on its box, as the paper prints it');
  ok(/aria-label="Answer box 1 of 2"/.test(sl), 'each box names its position for a screen reader');
  // Every box the same width: the class carries the width, no inline sizing.
  ok(!/style="width/.test(sl), 'no box is sized to its own answer');

  const num = render({ id: 'a', type: 'numeric', question: 'q', answer: '4' });
  ok(NUMPAD.test(num), 'numeric still renders the numeric input');
  ok(!REFUSAL.test(num), 'numeric is not refused');

  // The whole point.
  for (const t of ['task', 'blanks', 'cells', 'drawing', 'written', 'construction', 'whatever']) {
    const html = render({ id: 'a', type: t, question: 'q', answer: 'x' });
    ok(REFUSAL.test(html), `type "${t}" is refused`);
    ok(!NUMPAD.test(html), `type "${t}" does NOT get a number pad`);
    ok(sandbox._warnings.some(w => w.indexOf(t) !== -1),
       `type "${t}" warns to the console naming the type`);
  }

  // A refusal must say something a nine-year-old can act on, not a type name.
  const msg = render({ id: 'a', type: 'drawing', question: 'q' });
  ok(/paper/i.test(msg), 'the refusal tells the child where the question CAN be done');
  ok(!/drawing/i.test(msg.replace(/<!--[\s\S]*?-->/g, '')),
     'the refusal does not leak the internal type name to the child');
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
