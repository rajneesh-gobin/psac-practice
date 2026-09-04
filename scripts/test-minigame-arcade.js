'use strict';
// Word Builder + Island Explorer: data-bank integrity, full playthroughs of the
// real module (win and lose paths for both games), hub cards, and the deploy
// wiring (script tags, SW shell list). Run: node scripts/test-minigame-arcade.js
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// ── A vm context that looks enough like the browser ─────────────
const els = {};
const stubEl = id => els[id] || (els[id] = {
  id, innerHTML: '', textContent: '', disabled: false, style: {},
  classList: { _s: new Set(), add(...c) { c.forEach(x => this._s.add(x)); }, remove(...c) { c.forEach(x => this._s.delete(x)); }, toggle(c, on) { on ? this._s.add(c) : this._s.delete(c); }, contains(c) { return this._s.has(c); } },
  appendChild() {}, remove() {},
});
const storage = {};
const ctx = vm.createContext({
  window: {},
  document: { getElementById: stubEl, querySelectorAll: () => [], createElement: () => stubEl('_tmp' + Math.random()) },
  sessionStorage: { getItem: k => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); }, removeItem: k => { delete storage[k]; } },
  setTimeout: fn => { fn(); return 0; }, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
  navigator: {}, location: { protocol: 'https:', hostname: 'example.test', origin: 'https://example.test' },
  confirm: () => true, toast: () => {}, launchConfetti: () => {}, save: () => {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
  Auth: { getActiveAccount: () => ({ grade: 5 }) },
  console,
});
vm.runInContext(fs.readFileSync('engine/minigame_words.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('engine/minigame_geo.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('engine/minigame.js', 'utf8'), ctx);
const W = vm.runInContext('window.MINIGAME_WORDS', ctx);
const G = vm.runInContext('window.MINIGAME_GEO', ctx);
const MG = vm.runInContext('MiniGames', ctx);

// ── Word bank integrity ─────────────────────────────────────────
ok(W.length >= 60, `word bank has ${W.length} words`);
for (const b of [1, 2, 3]) ok(W.filter(w => w.band === b).length >= 10, `band ${b} has enough words`);
const seen = new Set();
for (const w of W) {
  ok(/^[A-Z]{4,12}$/.test(w.word), `${w.word}: A-Z only (tiles are letters)`);
  ok(!seen.has(w.word), `${w.word}: unique`); seen.add(w.word);
  ok([1, 2, 3].includes(w.band), `${w.word}: valid band`);
  ok(w.clue && w.clue.length > 10, `${w.word}: has a real clue`);
  ok(!w.clue.toUpperCase().includes(w.word), `${w.word}: clue must not spell its own answer`);
  ok(new Set(w.word).size >= 2, `${w.word}: scramble-able`);
}

// ── Geo tour integrity ──────────────────────────────────────────
ok(G.length >= 10, `tour has ${G.length} stops`);
const ids = new Set();
for (const s of G) {
  ok(s.id && !ids.has(s.id), `${s.id}: unique stop id`); ids.add(s.id);
  ok(s.name && s.icon && s.district && s.blurb, `${s.id}: complete stop card`);
  ok(Array.isArray(s.qs) && s.qs.length >= 3, `${s.id}: at least 3 questions`);
  for (const q of s.qs) {
    ok(q.options.length === 4, `${s.id}: 4 options`);
    ok(q.options.filter(o => o === q.answer).length === 1, `${s.id}: answer appears exactly once in options`);
    ok(q.explanation && q.explanation.length > 10, `${s.id}: every clue teaches with an explanation`);
  }
}

// ── Hub: both cards live, nothing left "SOON" ───────────────────
MG.renderHub();
const hub = els['mg-hub'].innerHTML;
ok(hub.includes('MiniGames.startWords()') && hub.includes('MiniGames.startExplorer()'), 'hub wires both new games');
// Other future teasers may exist, but these two must never appear as one.
ok(!hub.split('mg-card-soon').slice(1).some(b => /Word Builder|Island Explorer/.test(b)),
  'Word Builder / Island Explorer are live, not coming-soon');
ok((hub.match(/PLAY ›/g) || []).length >= 4, 'at least four playable cards (other sessions keep adding games)');

// ── Word Builder: full winning crossing ─────────────────────────
// setTimeout is synchronous here, so a completed word advances inside the tap.
MG.startWords();
let d = MG._wbDebug();
ok(d && d.idx === 0 && d.lives === 3 && d.hints === 3, 'crossing starts at stone 0, 3 lives, 3 hints');
let guard = 0;
while (!MG._wbDebug().over && guard++ < 200) {
  const before = MG._wbDebug();
  const word = before.word;
  const target = word[before.typed.length];
  let tapped = false;
  for (let i = 0; i < word.length && !tapped; i++) {
    MG.wbTap(i);
    const now = MG._wbDebug();
    if (now.over || now.idx > before.idx) { tapped = true; break; }
    if (now.typed.length > before.typed.length) {
      if (now.typed[now.typed.length - 1] === target) tapped = true;
      else MG.wbUndo();
    }
  }
  ok(tapped, `found a "${target}" tile for ${word}`);
}
d = MG._wbDebug();
ok(d.over && d.idx === 10, 'crossed all 10 stones');
const wbBest = vm.runInContext('DB.games.wordbuilder', ctx);
ok(wbBest.plays === 1 && wbBest.bestStones === 10 && wbBest.bestScore > 0, 'winning crossing saved to DB.games.wordbuilder');
ok(wbBest.bestScore >= 10 * 4 * 10 + 3 * 20 + 3 * 10, 'no-mistake crossing includes life + hint bonus');
ok(!('psac-mg-state:anon' in storage), 'finished game leaves no resume stash');

// ── Word Builder: three splashes end the crossing ───────────────
// Tapping tiles in scrambled order spells the shuffle, which _wbShuffleTiles
// guarantees differs from the word — three times through is three splashes.
MG.startWords();
guard = 0;
while (!MG._wbDebug().over && guard++ < 10) {
  const len = MG._wbDebug().word.length;
  for (let i = 0; i < len; i++) MG.wbTap(i);
}
d = MG._wbDebug();
ok(d.over && d.lives === 0, 'three wrong spellings end the game');
ok(vm.runInContext('DB.games.wordbuilder.plays', ctx) === 2, 'lost crossing still counts a play');

// ── Word Builder: resume stash while mid-game ───────────────────
MG.startWords();
const wbStash = JSON.parse(storage['psac-mg-state:anon']);
ok(wbStash.game === 'wordbuilder' && Array.isArray(wbStash.wb.words) && wbStash.wb.words.length === 10, 'mid-game crossing persists for refresh-resume');
MG.wbQuit();
ok(!('psac-mg-state:anon' in storage), 'quitting clears the stash');

// ── Island Explorer: perfect gold tour ──────────────────────────
MG.startExplorer();
let stash = JSON.parse(storage['psac-mg-state:anon']);
ok(stash.game === 'explorer' && stash.ex.qsIdx.length === G.length, 'tour persists its picked questions');
guard = 0;
while (!MG._exDebug().over && guard++ < 30) {
  const e = MG._exDebug();
  const q = G[e.idx].qs[JSON.parse(storage['psac-mg-state:anon']).ex.qsIdx[e.idx]];
  MG.exAnswer(q.options.indexOf(q.answer));
}
let e = MG._exDebug();
ok(e.over && e.stamps.length === G.length && e.stamps.every(s => s === 'gold'), 'all-first-try tour is all gold');
ok(e.score === G.length * 15 + 50, 'perfect tour scores golds + bonus');
const exBest = vm.runInContext('DB.games.explorer', ctx);
ok(exBest.bestGold === G.length && exBest.bestScore === e.score, 'perfect tour saved to DB.games.explorer');

// ── Island Explorer: wrong-wrong still reaches the next stop ────
MG.startExplorer();
{
  const qi = JSON.parse(storage['psac-mg-state:anon']).ex.qsIdx[0];
  const q = G[0].qs[qi];
  const wrongs = q.options.map((o, i) => o === q.answer ? -1 : i).filter(i => i >= 0);
  MG.exAnswer(wrongs[0]);
  ok(MG._exDebug().idx === 0 && MG._exDebug().tries === 1, 'first wrong answer allows a retry');
  MG.exAnswer(wrongs[0]);
  ok(MG._exDebug().idx === 0, 'the greyed-out option cannot be re-picked');
  MG.exAnswer(wrongs[1]);
  e = MG._exDebug();
  ok(e.idx === 1 && e.score === 0 && e.stamps[0] === null, 'two wrongs: guide explains, tour continues, no stamp');
}
MG.exQuit();

// ── Games never touch the mastery pipeline ──────────────────────
const code = fs.readFileSync('engine/minigame.js', 'utf8')
  .split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
ok(!/recordAnswer\s*\(|_recordDaily\s*\(/.test(code), 'game answers never call recordAnswer/_recordDaily');

// ── Deploy wiring ───────────────────────────────────────────────
const html = fs.readFileSync('index.html', 'utf8');
for (const f of ['minigame_words.js', 'minigame_geo.js'])
  ok(html.indexOf(`engine/${f}`) > -1 && html.indexOf(`engine/${f}`) < html.indexOf('engine/minigame.js"'), `${f} script tag loads before minigame.js`);
const sw = fs.readFileSync('sw.js', 'utf8');
for (const f of ['/engine/minigame_words.js', '/engine/minigame_geo.js'])
  ok(sw.includes(`'${f}',`), `${f} in SHELL_FILES`);

console.log(`Minigame arcade: ${checks} checks passed (banks, hub, WB win/lose/resume, EX gold/fail-forward, wiring).`);
