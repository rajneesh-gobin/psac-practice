'use strict';
// Potion Lab 🧪 — measured checks through the REAL module in a VM:
//   1. Round bank: shape, 2-3 cauldrons, every item in a declared category,
//      enough stock per category, no duplicate label inside a round.
//   2. Pickers: rounds ordered by band, and every cauldron gets at least one
//      item on every deal.
//   3. Gameplay: a correct tap scores and builds a streak, a wrong tap and a
//      timeout each cost exactly one beaker, three losses end the run, and
//      the right answer is always revealed.
//   4. Wiring: data file loaded and pre-cached, hub card live, and the game
//      never touches recordAnswer()/_recordDaily().
//
// ⚠ WHAT THIS FILE CANNOT CHECK is whether a classification is correct — that
//   is a human assertion, which is exactly why it lives in one reviewed data
//   file with its edge-case exclusions written down. What it CAN refuse is
//   every structural way a wrong answer gets in: an item pointing at a category
//   the round does not declare, a category with no items, a duplicate label.
//
// Run: node scripts/test-potion-lab.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
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
// ⚠ setTimeout fires synchronously so the reveal-then-advance step resolves in
//   line; setInterval is a no-op so the conveyor never ticks on its own and a
//   timeout only happens when this file asks for one.
const ctx = {
  window: {}, navigator: {}, console, Date, Math, JSON, URL,
  document: { getElementById: () => stubEl(), createElement: () => stubEl() },
  sessionStorage: { setItem() {}, getItem: () => null, removeItem() {} },
  setTimeout: fn => { fn(); return 0; },
  clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  confirm: () => true, toast() {}, save() {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
};
vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: path.basename(f) });
run('engine/helpers.js');
run('engine/game_settings.js');
run('engine/minigame_lab.js');
run('engine/minigame.js');
const MG = vm.runInContext('MiniGames', ctx);
const bank = ctx.window.MINIGAME_LAB || [];

// ── 1: the round bank ───────────────────────────────────────────────────────
check(bank.length >= 5, 'the bank holds a real set of rounds', String(bank.length));
check(new Set(bank.map(r => r.id)).size === bank.length, 'round ids are unique');
check(bank.every(r => [1, 2, 3].includes(r.band)), 'every round has a valid band');
check([1, 2, 3].every(b => bank.some(r => r.band === b)), 'all three bands are represented');

for (const r of bank) {
  const at = r.id || '(no id)';
  // ⚠ Three cauldrons is the most a thumb reaches on a phone without the
  //   labels wrapping; two is legitimate (living/non-living has two sides).
  check(r.categories.length >= 2 && r.categories.length <= 3,
    `${at} — has 2 or 3 cauldrons`, String(r.categories.length));
  check(r.categories.every(c => c.key && c.label && c.emoji),
    `${at} — every cauldron has a key, a label and an emoji`);
  check(new Set(r.categories.map(c => c.key)).size === r.categories.length,
    `${at} — cauldron keys are unique`);

  const keys = r.categories.map(c => c.key);
  // ⚠ An item pointing at an undeclared category can NEVER be sorted right —
  //   every cauldron is wrong and the child loses a beaker for free.
  const orphans = r.items.filter(i => !keys.includes(i.category));
  check(orphans.length === 0, `${at} — every item lands in a declared cauldron`,
    orphans.map(o => o.label).join('; '));

  check(r.items.every(i => i.label && i.emoji), `${at} — every item has a label and an emoji`);
  check(new Set(r.items.map(i => i.label)).size === r.items.length,
    `${at} — no duplicate item label in a round`);

  // A deal is 8 items and must be able to use every cauldron.
  for (const k of keys) {
    const n = r.items.filter(i => i.category === k).length;
    check(n >= 4, `${at} — cauldron "${k}" has enough items`, String(n));
  }
  check(r.items.length >= 10, `${at} — more items than one deal, so runs differ`, String(r.items.length));
  check(typeof r.theme === 'string' && /\?$/.test(r.theme),
    `${at} — the theme is phrased as a question`, r.theme);
}

// ⚠ The edge cases the data file promises to exclude. If one reappears, the
//   game starts docking children for defensible answers.
const allLabels = bank.flatMap(r => r.items.map(i => i.label.toLowerCase()));
for (const banned of ['seed', 'egg shell', 'wooden', 'jelly', 'toothpaste', 'smoke', 'rubber']) {
  check(!allLabels.some(l => l === banned || l.startsWith(banned + ' ')),
    `no ambiguous item slipped in: "${banned}"`);
}
// ⚠ Milk is body-building AND protective in most tables, so it must not be in
//   the food round — it is fine in the states-of-matter round as a liquid.
const foodRound = bank.find(r => /food/i.test(r.id));
check(!!foodRound && !foodRound.items.some(i => /^milk$/i.test(i.label)),
  'milk is not classified as a food group');

// ── 2: the pickers ──────────────────────────────────────────────────────────
const ordered = MG._labPickRounds();
check(ordered.length === bank.length, 'every round is dealt into a run', String(ordered.length));
let bandSlip = 0;
for (let i = 1; i < ordered.length; i++) if (ordered[i].band < ordered[i - 1].band) bandSlip++;
check(bandSlip === 0, 'rounds are ordered easiest band first', String(bandSlip));

let missingCauldron = 0, shortDeal = 0, strayItem = 0;
for (const r of bank) {
  for (let n = 0; n < 40; n++) {
    const items = MG._labPickItems(r, 8);
    if (items.length !== Math.min(8, r.items.length)) shortDeal++;
    const used = new Set(items.map(i => i.category));
    // ⚠ This is the check that stops a three-cauldron round finishing without
    //   the child ever using one of them.
    if (used.size !== r.categories.length) missingCauldron++;
    if (items.some(i => !r.items.includes(i))) strayItem++;
  }
}
check(shortDeal === 0, 'every deal is a full round', String(shortDeal));
check(missingCauldron === 0, 'every cauldron is used in every deal', String(missingCauldron));
check(strayItem === 0, 'a deal only ever holds items from its own round');

// ── 3: gameplay ─────────────────────────────────────────────────────────────
MG.startLab();
let d = MG._lbDebug();
check(!!d, 'a game starts');
check(d.lives === 3, 'the child starts with three beakers', String(d && d.lives));
check(d.score === 0 && d.ri === 0, 'a run starts at round one with no score');

// A correct tap: score up, streak up, beakers untouched.
MG.lbTap(d.item.category);
let after = MG._lbDebug();
check(after.score > 0, 'a correct tap scores');
check(after.lives === 3, 'a correct tap costs no beaker', String(after.lives));
check(after.correct === 1, 'the correct tap is counted');

// A wrong tap: exactly one beaker, and the right answer is revealed.
let cur = MG._lbDebug();
const wrongKey = cur.categories.find(k => k !== cur.item.category);
const livesBefore = cur.lives;
MG.lbTap(wrongKey);
let afterWrong = MG._lbDebug();
check(afterWrong.lives === livesBefore - 1, 'a wrong tap costs exactly one beaker',
  `${livesBefore} -> ${afterWrong.lives}`);
check(afterWrong.wrong === 1, 'the wrong tap is counted');
check(afterWrong.streak === 0, 'a wrong tap breaks the streak');

// ⚠ A run must END, not stall, once the beakers are gone.
let guard = 0;
while (MG._lbDebug() && !MG._lbDebug().over && guard++ < 200) {
  const s = MG._lbDebug();
  const wrong = s.categories.find(k => k !== s.item.category);
  MG.lbTap(wrong);
}
const done = MG._lbDebug();
check(done && done.over === true, 'losing every beaker ends the run');
check(done && done.lives <= 0, 'the run ends because the beakers ran out', String(done && done.lives));
const saved = ctx.DB.games.lab;
check(!!saved && saved.plays === 1, 'the run is recorded');
check(saved && typeof saved.bestRound === 'number', 'bestRound is stored');

// ── 4: wiring ───────────────────────────────────────────────────────────────
const mg = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

check(html.includes('engine/minigame_lab.js'), 'the data file is a script tag in index.html');
// ⚠ cache.addAll() is ALL-OR-NOTHING: a data file missing from SHELL_FILES
//   takes the whole offline shell down, not just this game.
check(sw.includes("'/engine/minigame_lab.js'"), 'the data file is pre-cached in sw.js');
check(html.indexOf('engine/minigame_lab.js') < html.indexOf('engine/minigame.js'),
  'the data file loads BEFORE minigame.js');
check(/mg-card-live mg-card-lb/.test(mg), 'the hub card is live, not a teaser');
check(!/mg-card-soon[\s\S]{0,200}Potion Lab/.test(mg), 'no COMING SOON teaser is left behind');
check(/\.mg-card-lb /.test(css) && /\.lb-cauldrons /.test(css), 'the bench is styled');
// ⚠ 2 and 3 cauldron rounds both exist, so both layouts must be styled.
check(/\.lb-cols-2 /.test(css) && /\.lb-cols-3 /.test(css), 'both cauldron layouts are styled');
// ⚠ An orphaned interval keeps ticking after the child leaves the game.
check(/if \(_lbTimer\) \{ clearInterval\(_lbTimer\); _lbTimer = null; \}/.test(mg),
  'renderHub clears the conveyor timer');
check(/saved\.game === 'lab'/.test(mg), 'a refresh can resume a run');

// ⚠ Stop at the NEXT game banner, not at open() — Batch 3 will sit after this.
const labBlock = (mg.match(/══ POTION LAB[\s\S]*?(?=\n\s*\/\/ ══ [A-Z]|function open\(\) \{)/) || [''])[0];
check(labBlock.length > 1000, 'found the Potion Lab block');
check(!/recordAnswer\s*\(/.test(labBlock), 'the game never calls recordAnswer()');
check(!/_recordDaily\s*\(/.test(labBlock), 'the game never calls _recordDaily()');
check((labBlock.match(/_awardRun\(/g) || []).length === 1,
  'a finished run awards points once, through _awardRun');

for (const fn of ['startLab', 'lbTap', 'lbQuit', 'lbShare', 'lbShareTo', '_lbDebug', '_labPickRounds', '_labPickItems']) {
  check(typeof MG[fn] === 'function', `MiniGames.${fn} is exported`);
}

console.log(`${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
