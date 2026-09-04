'use strict';
// Time Traveller 🕰️ — measured checks through the REAL module in a VM:
//   1. Fact bank: enough facts, valid shape, unique labels, plausible years,
//      and NO label leaks a 4-digit number (years are hidden until the reveal).
//   2. Picker: 8 rounds of 3/3/3/4… items, no event repeated in a game, never
//      two same-year events in a round, never dealt already in order, and the
//      early rounds stay in the easy band.
//   3. Gameplay: a perfect run scores 8/8 perfect rounds; a fully reversed run
//      scores 0 perfect; bests save; guards ignore taps in the wrong phase.
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
const ctx = {
  window: {}, navigator: {}, console, Date, Math, JSON,
  document: { getElementById: () => stubEl(), createElement: () => stubEl() },
  sessionStorage: { setItem() {}, getItem: () => null, removeItem() {} },
  setTimeout: fn => { fn(); return 0; },
  clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  confirm: () => true, toast() {}, save() {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'engine', 'minigame_time.js'), 'utf8'), ctx, { filename: 'minigame_time.js' });
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'engine', 'minigame.js'), 'utf8'), ctx, { filename: 'minigame.js' });
const MG = vm.runInContext('MiniGames', ctx);
const bank = ctx.window.MINIGAME_TIME || [];

// ── 1: fact bank ──
check(bank.length >= 30, 'bank holds a real spread of facts', String(bank.length));
check(new Set(bank.map(f => f.label)).size === bank.length, 'labels are unique');
check(bank.every(f => typeof f.label === 'string' && f.label.length > 8 && Number.isInteger(f.year) && f.year >= 1400 && f.year <= 2026), 'facts have labels and plausible years');
check(bank.every(f => ['mu', 'world'].includes(f.era) && [1, 2, 3].includes(f.band)), 'eras and bands valid');
const leaky = bank.filter(f => /\d{3,}/.test(f.label));
check(leaky.length === 0, 'no label leaks a year or large number', leaky.map(f => f.label).join('; '));
check(bank.filter(f => f.era === 'mu').length >= 20, 'Mauritius history is the core of the bank');
check(bank.filter(f => f.band === 1).length >= 8, 'enough band-1 facts for the easy rounds');

// ── 2: picker invariants over 60 games ──
let sizeBad = 0, repeatBad = 0, yearBad = 0, sortedBad = 0, bandBad = 0;
for (let n = 0; n < 60; n++) {
  const rounds = MG._pickTimeTravel();
  const seen = new Set();
  rounds.forEach((items, r) => {
    if (items.length !== (r < 3 ? 3 : 4)) sizeBad++;
    const years = items.map(f => f.year);
    if (new Set(years).size !== years.length) yearBad++;
    if (items.every((f, i) => !i || items[i - 1].year <= f.year)) sortedBad++;
    for (const f of items) { if (seen.has(f.label)) repeatBad++; seen.add(f.label); }
    if (r < 2) {
      const src = items.map(f => bank.find(b => b.label === f.label));
      if (src.some(b => !b || b.band !== 1)) bandBad++;
    }
  });
}
check(sizeBad === 0, 'rounds are 3,3,3 then 4 events', `${sizeBad} wrong-sized`);
check(repeatBad === 0, 'no event repeats within one game', `${repeatBad} repeats`);
check(yearBad === 0, 'never two same-year events in a round', `${yearBad} clashes`);
check(sortedBad === 0, 'events are never dealt already in order', `${sortedBad} pre-sorted`);
check(bandBad === 0, 'the first two rounds use only band-1 facts', `${bandBad} out-of-band`);

// ── 3: gameplay ──
const dbg = () => MG._ttDebug();
const playRound = correct => {
  const d = dbg();
  const order = d.items.map((f, i) => i).sort((a, b) => correct
    ? d.items[a].year - d.items[b].year : d.items[b].year - d.items[a].year);
  order.forEach(i => MG.ttPick(i));
};

MG.startTimeTravel();
check(dbg() && dbg().phase === 'play' && dbg().round === 0, 'game starts at round 1 in play phase');
MG.ttNext();                                           // next during play: ignored
check(dbg().round === 0, 'ttNext is ignored during placement');
let steps = 0;
while (!dbg().over && steps++ < 12) {
  playRound(true);
  if (!dbg().over) MG.ttNext();
}
let d = dbg();
check(d.over && d.perfect === 8, 'perfect run: 8/8 perfect rounds', JSON.stringify({ over: d.over, perfect: d.perfect }));
check(d.score >= 8 * (3 * 25 + 50), 'perfect run scores placement + bonuses', String(d.score));
const saved = ctx.DB.games.timetravel;
check(saved && saved.plays === 1 && saved.bestPerfect === 8 && saved.bestScore === d.score, 'bests saved to DB.games.timetravel', JSON.stringify(saved));

MG.startTimeTravel();
steps = 0;
while (!dbg().over && steps++ < 12) {
  playRound(false);                                    // fully reversed order
  if (!dbg().over) MG.ttNext();
}
d = dbg();
check(d.over && d.perfect === 0, 'reversed run earns no perfect rounds', String(d.perfect));
check(ctx.DB.games.timetravel.plays === 2 && ctx.DB.games.timetravel.bestPerfect === 8, 'a worse run never lowers the best', JSON.stringify(ctx.DB.games.timetravel));
const frozen = JSON.stringify(dbg());
MG.ttPick(0); MG.ttUndo(); MG.ttNext();
check(JSON.stringify(dbg()) === frozen, 'input after the journey ends is ignored');

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.error(bad.map(b => `  ✗ ${b}`).join('\n')); process.exit(1); }
