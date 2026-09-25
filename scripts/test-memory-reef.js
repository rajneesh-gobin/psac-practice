'use strict';
// Memory Reef 🐠 — measured checks through the REAL module in a VM:
//   1. Pair bank: enough per band, valid shape, and NO duplicate French or
//      English word anywhere (the board invariant depends on it).
//   2. Picker: fills every board size, never repeats a word on a board, and
//      never puts two pairs of the same `group` together.
//   3. Gameplay: a perfect run keeps every pearl; a run of pure misses floors
//      at one pearl per pair and still finishes; bests save per board size.
//   4. Wiring: the data file is loaded and pre-cached, the hub card is live,
//      and the game never touches recordAnswer()/_recordDaily().
//
// Run: node scripts/test-memory-reef.js
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
// ⚠ setTimeout runs SYNCHRONOUSLY here on purpose: the mismatch peek is a
//   timeout, and a real one would make every miss test asynchronous for no gain.
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
run('engine/minigame_pairs.js');
run('engine/minigame.js');
const MG = vm.runInContext('MiniGames', ctx);
const bank = ctx.window.MINIGAME_PAIRS || [];

// ── 1: the pair bank ────────────────────────────────────────────────────────
check(bank.length >= 50, 'the bank holds a real spread of pairs', String(bank.length));
check(bank.every(p => typeof p.fr === 'string' && p.fr.length > 1
  && typeof p.en === 'string' && p.en.length > 1 && [1, 2, 3].includes(p.band)),
'every pair has a French side, an English side and a valid band');

// ⚠ THE BOARD INVARIANT RESTS ON THIS. If two pairs share an English word, a
//   board holding both has two right answers for one shell and marks one wrong.
check(new Set(bank.map(p => p.fr)).size === bank.length, 'every French word appears once');
check(new Set(bank.map(p => p.en)).size === bank.length, 'every English word appears once');

// The biggest board is 5x4 = 10 pairs, and it is dealt from band 3 first.
for (const b of [1, 2, 3]) {
  check(bank.filter(p => p.band === b).length >= 10,
    `band ${b} can fill the largest board on its own`,
    String(bank.filter(p => p.band === b).length));
}
// ⚠ UTF-8 integrity: this file is edited on Windows, where a bad round-trip
//   turns "fenêtre" into mojibake and the game silently teaches wrong spelling.
check(bank.some(p => /[éèêàçûôîï]/.test(p.fr)), 'French accents survived the encoding');
check(!bank.some(p => /Ã|Â|â€/.test(p.fr + p.en)), 'no mojibake in the bank');

// ⚠ A cognate is a free tile — matchable without knowing any French.
const cognates = bank.filter(p => p.fr.replace(/^(le |la |les |l')/, '').toLowerCase() === p.en.toLowerCase());
check(cognates.length === 0, 'no pair is a straight cognate', cognates.map(p => p.fr).join('; '));

// ── 2: the picker, over many boards ─────────────────────────────────────────
let shortBoard = 0, dupWord = 0, dupGroup = 0;
for (const want of [6, 8, 10]) {
  for (let band = 1; band <= 3; band++) {
    for (let n = 0; n < 40; n++) {
      const picked = MG._reefPick(band, want);
      if (picked.length !== want) { shortBoard++; continue; }
      const frs = picked.map(p => p.fr), ens = picked.map(p => p.en);
      if (new Set(frs).size !== want || new Set(ens).size !== want) dupWord++;
      const groups = picked.filter(p => p.group).map(p => p.group);
      if (new Set(groups).size !== groups.length) dupGroup++;
    }
  }
}
check(shortBoard === 0, 'every board size fills completely', String(shortBoard));
check(dupWord === 0, 'no board repeats a French or English word', String(dupWord));
// ⚠ This is the check that stops "l'armoire"/wardrobe and "le placard"/cupboard
//   landing together, which is a board a child can lose while being right.
check(dupGroup === 0, 'no board holds two pairs from the same confusable group', String(dupGroup));

// ── 3: gameplay ─────────────────────────────────────────────────────────────
// A perfect dive: flip the two halves of each pair in turn, never a miss.
MG.startReef();
let d = MG._rfDebug();
check(!!d, 'a game starts');
check(d.cards.length === d.pairs * 2, 'the board holds two cards per pair');
check([6, 8, 10].includes(d.pairs), 'board size is one of the three', String(d.pairs));
const startPearls = d.pearls;
check(startPearls === d.pairs * 3, 'the shell starts with three pearls per pair');

const idxOf = (cards, pair, side) => cards.findIndex(c => c.pair === pair && c.side === side);
for (let p = 0; p < d.pairs; p++) {
  const cur = MG._rfDebug();
  if (!cur) break;
  MG.rfTap(idxOf(cur.cards, p, 'fr'));
  MG.rfTap(idxOf(cur.cards, p, 'en'));
}
const after = MG._rfDebug();
check(after && after.over === true, 'a complete board finishes the game');
check(after && after.wasted === 0, 'a perfect dive wastes no turns');
check(after && after.pearls === startPearls, 'a perfect dive keeps every pearl');
const saved = ctx.DB.games.reef;
check(!!saved && saved.plays === 1, 'the dive is recorded');
const sizeKey = Object.keys(saved.sizes || {})[0];
check(!!sizeKey && /^\d+×\d+$/.test(sizeKey), 'bests are stored per board size', sizeKey);
check(saved.sizes[sizeKey].bestFlips === after.turns,
  'bestFlips is seeded from the first run, not left at zero', JSON.stringify(saved.sizes[sizeKey]));

// ⚠ FEWER flips is better, so a WORSE later run must not overwrite bestFlips.
const firstFlips = saved.sizes[sizeKey].bestFlips;
MG.startReef();
let miss = MG._rfDebug();
// Force wasted turns by pairing each French card with the WRONG English card.
let guard = 0;
while (miss && !miss.over && guard++ < 400) {
  const cards = miss.cards;
  const unmatched = [...new Set(cards.map(c => c.pair))].filter(p => !miss.matched.includes(p));
  if (unmatched.length < 2) break;
  MG.rfTap(idxOf(cards, unmatched[0], 'fr'));
  MG.rfTap(idxOf(cards, unmatched[1], 'en'));
  miss = MG._rfDebug();
  if (miss && miss.pearls <= miss.pairs) break;
}
const missed = MG._rfDebug();
check(missed && missed.wasted > 0, 'mismatched flips are counted as wasted');
check(missed && missed.pearls >= missed.pairs,
  'pearls never fall below one per pair', missed && String(missed.pearls));
check(missed && missed.pearls < startPearls, 'a wasted turn costs a pearl');

// ── 4: wiring ───────────────────────────────────────────────────────────────
const mg = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');

check(html.includes('engine/minigame_pairs.js'), 'the data file is a script tag in index.html');
// ⚠ cache.addAll() is ALL-OR-NOTHING: a data file missing from SHELL_FILES
//   would take the entire offline shell down with it, not just this game.
check(sw.includes("'/engine/minigame_pairs.js'"), 'the data file is pre-cached in sw.js');
// ⚠⚠ THE SCRIPT TAG, NOT THE STRING. index.html names engine/minigame.js in a
//   PROSE COMMENT about 6,400 lines above the script tags — the landing deck
//   explains there that its game slide borrows the real .bq-* classes this file
//   paints with. A bare indexOf therefore finds the comment, every data file
//   sorts AFTER it, and this check could not pass however the tags were
//   ordered. It was red in four suites at once, which means the load order it
//   exists to protect had been unverified in all four. test-french-ninja.js and
//   test-minigame-arcade.js already anchor on the quote; these did not.
const _tagAt = (src) => html.indexOf('<script src="' + src + '"');
check(_tagAt('engine/minigame_pairs.js') > -1 && _tagAt('engine/minigame_pairs.js') < _tagAt('engine/minigame.js'),
  'the data file loads BEFORE minigame.js');
check(/mg-card-live mg-card-rf/.test(mg), 'the hub card is live, not a teaser');
// ⚠ Assert on the CARD MARKUP, not on the words. The design-intent comment near
//   the top of minigame.js names every built game a few lines after the string
//   "mg-card-soon", so a prose match reported a teaser that does not exist.
check((mg.match(/class="mg-card mg-card-soon"/g) || []).length === 0,
  'no COMING SOON teaser card is left in the hub');
check(/\.mg-card-rf /.test(css) && /\.rf-board /.test(css), 'the board is styled');
// ⚠ --rf-cols, not a hard-coded 4: the 5x4 board would otherwise be dealt as
//   five rows of four, a different and much harder game.
check(/grid-template-columns:repeat\(var\(--rf-cols/.test(css), 'the grid reads its column count from the board');

// ⚠ THE RULE EVERY GAME INHERITS. A replay must not distort the mastery,
//   mistake and daily reporting parents rely on.
// ⚠ Stop at the NEXT game banner, not at open() — the same trap that made
//   test-french-ninja.js fail when THIS game was added after it. Batch 2 will
//   sit between Memory Reef and open(), and this block must not swallow it.
const reefBlock = (mg.match(/══ MEMORY REEF[\s\S]*?(?=\n\s*\/\/ ══ [A-Z]|function open\(\) \{)/) || [''])[0];
check(reefBlock.length > 1000, 'found the Memory Reef block');
check(!/recordAnswer\s*\(/.test(reefBlock), 'the game never calls recordAnswer()');
check(!/_recordDaily\s*\(/.test(reefBlock), 'the game never calls _recordDaily()');
check(/_awardRun\('reef'\)/.test(reefBlock), 'a finished run awards points through the shared cap');
// ⚠ A face-down shell must not name its word to a screen reader.
check(/Hidden shell/.test(reefBlock), 'face-down shells do not leak their word in aria-label');

for (const fn of ['startReef', 'rfTap', 'rfQuit', 'rfShare', 'rfShareTo', '_rfDebug', '_reefPick']) {
  check(typeof MG[fn] === 'function', `MiniGames.${fn} is exported`);
}

console.log(`${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
