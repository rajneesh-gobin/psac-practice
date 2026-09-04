'use strict';
// Number Ninja 🥷 — measured checks, not eyeballed:
//   1. Generator: for every belt, the stated answer is re-derived independently
//      from the question text (a generator whose distractors are right but
//      whose answer is wrong would look fine in play and teach wrong maths).
//   2. Options: 4, unique, contain the answer, all positive integers.
//   3. Gameplay: a perfect run through the REAL module ends as black-belt
//      master; an all-wrong run ends after exactly 3 lives with 0 belts.
// Loads engine/minigame.js itself in a VM with a stub DOM — no reimplementation.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  if (bad.length < 20) bad.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

// ── Stub DOM: every element answers with inert classList/style ──
const stubEl = () => ({
  classList: { add() {}, remove() {}, toggle() {} },
  style: {}, textContent: '', className: '', innerHTML: '',
  appendChild() {}, remove() {},
});
const ctx = {
  window: {}, navigator: {}, console, Date, Math, JSON,
  document: { getElementById: () => stubEl(), createElement: () => stubEl() },
  sessionStorage: { setItem() {}, getItem: () => null, removeItem() {} },
  setTimeout: fn => { fn(); return 0; },            // synchronous: the sim drives turn by turn
  clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  confirm: () => true, toast() {}, save() {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'engine', 'minigame.js'), 'utf8'), ctx, { filename: 'minigame.js' });
// top-level `const MiniGames` lives in the script scope, not on the context
const MG = vm.runInContext('MiniGames', ctx);
check(!!MG && typeof MG.startNinja === 'function', 'minigame.js loads and exports startNinja');

// ── 1+2: generator soundness, answers re-derived from the text ──
// − is U+2212, × and ÷ as printed by the generator.
const evalText = t => {
  let m;
  if ((m = t.match(/^(\d+) \+ \? = (\d+)$/))) return +m[2] - +m[1];
  if ((m = t.match(/^\? × (\d+) = (\d+)$/))) return +m[2] / +m[1];
  if ((m = t.match(/^(\d+) × (\d+) \+ (\d+)$/))) return +m[1] * +m[2] + +m[3];
  if ((m = t.match(/^(\d+) × (\d+) − (\d+)$/))) return +m[1] * +m[2] - +m[3];
  if ((m = t.match(/^(\d+) \+ (\d+)$/))) return +m[1] + +m[2];
  if ((m = t.match(/^(\d+) − (\d+)$/))) return +m[1] - +m[2];
  if ((m = t.match(/^(\d+) × (\d+)$/))) return +m[1] * +m[2];
  if ((m = t.match(/^(\d+) ÷ (\d+)$/))) return +m[1] / +m[2];
  if ((m = t.match(/^Double of (\d+)$/))) return +m[1] * 2;
  if ((m = t.match(/^Half of (\d+)$/))) return +m[1] / 2;
  if ((m = t.match(/^¼ of (\d+)$/))) return +m[1] / 4;
  if ((m = t.match(/^¾ of (\d+)$/))) return +m[1] * 3 / 4;
  if ((m = t.match(/^10% of (\d+)$/))) return +m[1] / 10;
  if ((m = t.match(/^25% of (\d+)$/))) return +m[1] / 4;
  if ((m = t.match(/^50% of (\d+)$/))) return +m[1] / 2;
  return NaN;
};
for (let belt = 0; belt < 7; belt++) {
  let badAnswer = 0, badOptions = 0, unparsed = 0;
  for (let i = 0; i < 500; i++) {
    const q = MG._njMakeQ(belt);
    const derived = evalText(q.text);
    if (Number.isNaN(derived)) unparsed++;
    else if (derived !== q.answer) badAnswer++;
    const ok = Array.isArray(q.options) && q.options.length === 4
      && new Set(q.options).size === 4 && q.options.includes(q.answer)
      && q.options.every(o => Number.isInteger(o) && o > 0);
    if (!ok) badOptions++;
    if (!Number.isInteger(q.answer) || q.answer <= 0) badAnswer++;
  }
  check(unparsed === 0, `belt ${belt}: every question text parses`, `${unparsed} unparsed`);
  check(badAnswer === 0, `belt ${belt}: stated answer matches the sum`, `${badAnswer} wrong`);
  check(badOptions === 0, `belt ${belt}: 4 unique positive options incl. answer`, `${badOptions} bad`);
}

// ── 3: gameplay through the real module ──
const rightIdx = () => { const d = MG._njDebug(); return d.q.options.indexOf(d.q.answer); };
const wrongIdx = () => { const d = MG._njDebug(); return d.q.options.findIndex(o => o !== d.q.answer); };

MG.startNinja();
let steps = 0;
while (!MG._njDebug().over && steps++ < 40) MG.njAnswer(rightIdx());
let d = MG._njDebug();
check(d.over && d.beltsDone === 7 && d.sliced === 35, 'perfect run ends as black-belt master (7 belts, 35 sums)', JSON.stringify({ over: d.over, beltsDone: d.beltsDone, sliced: d.sliced }));
check(d.score > 0, 'perfect run scores points', String(d.score));
check(ctx.DB.games.ninja && ctx.DB.games.ninja.bestBelts === 7 && ctx.DB.games.ninja.bestScore === d.score, 'best saved to DB.games.ninja', JSON.stringify(ctx.DB.games.ninja));

MG.startNinja();
steps = 0;
while (!MG._njDebug().over && steps++ < 10) MG.njAnswer(wrongIdx());
d = MG._njDebug();
check(d.over && d.lives === 0 && d.beltsDone === 0 && d.sliced === 0, 'all-wrong run ends after 3 lives with no belt', JSON.stringify({ over: d.over, lives: d.lives, beltsDone: d.beltsDone }));
check(ctx.DB.games.ninja.plays === 2, 'plays counted', String(ctx.DB.games.ninja.plays));
check(ctx.DB.games.ninja.bestBelts === 7, 'a worse run never lowers the best', String(ctx.DB.games.ninja.bestBelts));

// answering after the game is over must be a no-op
const before = JSON.stringify(MG._njDebug());
MG.njAnswer(0);
check(JSON.stringify(MG._njDebug()) === before, 'answer after game over is ignored');

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.error(bad.map(b => `  ✗ ${b}`).join('\n')); process.exit(1); }
