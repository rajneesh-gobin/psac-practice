'use strict';
// Brain Battle ⚔️ — measured checks through the REAL module in a VM:
//   1. Fairness: the two questions of every round share one difficulty band.
//   2. A P1-perfect / P2-wrong duel ends after 5 rounds with P1 crowned.
//   3. A 0–0 duel goes to sudden death and ends as a draw within the extra cap.
//   4. The handover screen never exposes the question; guards ignore taps in
//      the wrong phase and after the game is over.
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

const stubEl = () => ({
  classList: { add() {}, remove() {}, toggle() {} },
  style: {}, textContent: '', className: '', innerHTML: '',
  appendChild() {}, remove() {},
});
// 64 synthetic MCQs, 16 per difficulty, so every round can draw a same-band pair.
const bank = [];
for (let d = 1; d <= 4; d++) for (let i = 0; i < 16; i++)
  bank.push({ id: `t${d}-${i}`, chapterId: 'stub', type: 'mcq', difficulty: d,
    question: `Q d${d} #${i}`, options: ['w1', 'w2', 'w3', 'RIGHT'], answer: 'RIGHT' });

const ctx = {
  window: {}, navigator: {}, console, Date, Math, JSON,
  document: { getElementById: () => stubEl(), createElement: () => stubEl() },
  sessionStorage: { setItem() {}, getItem: () => null, removeItem() {} },
  setTimeout: fn => { fn(); return 0; },
  clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  confirm: () => true, toast() {}, save() {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
  STATIC_QUESTIONS: bank,
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'engine', 'minigame.js'), 'utf8'), ctx, { filename: 'minigame.js' });
const MG = vm.runInContext('MiniGames', ctx);
check(typeof MG.startBattle === 'function', 'minigame.js loads and exports startBattle');

// ── 1: same-difficulty pairing, measured over 30 picked duels ──
const diffOf = id => +String(id).match(/^t(\d)/)[1];
let mismatched = 0, picks = 0;
for (let n = 0; n < 30; n++) {
  const qs = MG._pickBattle();
  for (let r = 0; r * 2 + 1 < qs.length; r++) {
    picks++;
    // _bbTrim drops the id, so re-pick raw: match by question text prefix instead
    const d1 = +qs[r * 2].question.match(/d(\d)/)[1], d2 = +qs[r * 2 + 1].question.match(/d(\d)/)[1];
    if (d1 !== d2) mismatched++;
  }
}
check(picks >= 30 * 8 && mismatched === 0, 'every round pairs two questions of the same difficulty', `${mismatched}/${picks} mismatched`);

// ── helpers for driving a duel ──
const dbg = () => MG._bbDebug();
const playTurn = winning => {
  MG.bbReady();
  const d = dbg();
  const i = winning ? d.q.options.indexOf('RIGHT') : d.q.options.findIndex(o => o !== 'RIGHT');
  MG.bbAnswer(i);
};

// ── 2: P1 perfect, P2 always wrong ──
MG.startBattle();
check(dbg().phase === 'ready' && dbg().q === null, 'handover screen exposes no question');
MG.bbAnswer(0);                                        // tap during handover: ignored
check(dbg().scores[0] === 0 && dbg().phase === 'ready', 'answers are ignored during the handover phase');
let steps = 0;
while (!dbg().over && steps++ < 20) playTurn(dbg().turn === 0);
let d = dbg();
check(d.over && d.round === 5, 'one-sided duel ends after exactly 5 rounds', JSON.stringify({ over: d.over, round: d.round }));
check(d.scores[0] >= 500 && d.scores[1] === 0, 'P1 scores, P2 does not', JSON.stringify(d.scores));
check(ctx.DB.games.battle && ctx.DB.games.battle.plays === 1 && ctx.DB.games.battle.p1Wins === 1, 'P1 crown recorded in DB.games.battle', JSON.stringify(ctx.DB.games.battle));
const frozen = JSON.stringify(dbg());
MG.bbAnswer(0); MG.bbReady();
check(JSON.stringify(dbg()) === frozen, 'input after the duel is over is ignored');

// ── 3: both always wrong → 0–0 → sudden death → draw at the cap ──
MG.startBattle();
steps = 0;
while (!dbg().over && steps++ < 40) playTurn(false);
d = dbg();
check(d.over && d.scores[0] === 0 && d.scores[1] === 0, 'goalless duel ends', JSON.stringify(d.scores));
check(d.round === 8, 'sudden death runs exactly the 3 extra rounds before a draw', String(d.round));
check(ctx.DB.games.battle.draws === 1 && ctx.DB.games.battle.plays === 2, 'draw recorded', JSON.stringify(ctx.DB.games.battle));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.error(bad.map(b => `  ✗ ${b}`).join('\n')); process.exit(1); }
