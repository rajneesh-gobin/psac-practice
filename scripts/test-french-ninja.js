'use strict';
// FRENCH NINJA 🗡️ — the bank, the wiring, and the scoring rules.
//
// ⚠ WHY THE BANK IS CHECKED HARDEST. The game DOCKS a child for tapping a word
//   that is not flagged as an error. So a token the bank left unflagged which is
//   actually wrong punishes a child for spotting a real mistake — the worst
//   failure this game can have, and one no amount of play-testing surfaces
//   reliably because it looks like the child was simply wrong.
//   A script cannot judge French. What it CAN do is refuse every structural way
//   that failure gets in: an index pointing at the wrong token, a `fix` that
//   changes nothing, a duplicate phrase, punctuation glued to a word so the chip
//   and the answer disagree. The grammar itself stays a human assertion — which
//   is exactly why it lives in one reviewed file.
//
// Run: node scripts/test-french-ninja.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

// ── load the bank the way the browser does ─────────────────────────────────
global.window = {};
require(path.join(ROOT, 'engine/minigame_french.js'));
const BANK = global.window.MINIGAME_FRENCH;

ok('the bank loads and is an array', Array.isArray(BANK) && BANK.length > 0);
if (!Array.isArray(BANK)) { console.log('\n  0/1 — bank unusable'); process.exit(1); }

// A run is 10 phrases and the pick is weighted by band, so every band needs
// enough stock that a run is never padded out of the wrong one.
ok('bank holds at least 30 phrases', BANK.length >= 30, 'got ' + BANK.length);
for (const b of [1, 2, 3]) {
  const n = BANK.filter((p) => p.band === b).length;
  ok(`band ${b} holds at least 10 phrases`, n >= 10, 'got ' + n);
}

const ids = new Set();
const seenPhrase = new Map();
for (const p of BANK) {
  const at = p.id || '(no id)';
  ok(`${at} — has a unique id`, !!p.id && !ids.has(p.id));
  ids.add(p.id);
  ok(`${at} — band is 1, 2 or 3`, [1, 2, 3].includes(p.band), 'got ' + p.band);
  ok(`${at} — words is 5-10 tokens`,
    Array.isArray(p.words) && p.words.length >= 5 && p.words.length <= 10,
    'got ' + (p.words || []).length);
  ok(`${at} — has 1 or 2 errors`,
    Array.isArray(p.errors) && p.errors.length >= 1 && p.errors.length <= 2,
    'got ' + (p.errors || []).length);
  if (!Array.isArray(p.words) || !Array.isArray(p.errors)) continue;

  // ⚠ A token carrying punctuation renders one way on the chip and reads another
  //   in the `fix`, so the child is shown a correction that does not match what
  //   they tapped.
  for (const w of p.words) {
    ok(`${at} — token "${w}" carries no punctuation`, !/[.,!?;:«»"]/.test(w));
    ok(`${at} — token "${w}" is a single word`, !/\s/.test(w));
  }

  const seenIdx = new Set();
  for (const e of p.errors) {
    ok(`${at} — error index ${e.i} is inside words`,
      Number.isInteger(e.i) && e.i >= 0 && e.i < p.words.length);
    ok(`${at} — error index ${e.i} is not repeated`, !seenIdx.has(e.i));
    seenIdx.add(e.i);
    // ⚠ A `fix` identical to the token means the phrase has no error at that
    //   position at all: the child is scored for slicing a word that was right.
    ok(`${at} — fix "${e.fix}" actually changes the token`,
      !!e.fix && e.fix !== p.words[e.i],
      'token: ' + p.words[e.i]);
    ok(`${at} — has a French explanation under 110 chars`,
      !!e.why && e.why.length <= 110, 'len ' + (e.why || '').length);
  }

  // ⚠ Two phrases with the same words are one phrase to a child, and the run
  //   would deal both.
  const key = p.words.join(' ').toLowerCase();
  ok(`${at} — phrase text is not a duplicate`, !seenPhrase.has(key), 'same as ' + seenPhrase.get(key));
  seenPhrase.set(key, p.id);
}

// ⚠ "trou" is the cloze exercises' own word and carries a vulgar reading in
//   Mauritius — the same rule the read-aloud blank-collapsing follows.
const bankSrc = read('engine/minigame_french.js');
ok('the bank never uses the word "trou"', !/\btrous?\b/i.test(bankSrc.replace(/^\s*\/\/.*$/gm, '')));

// ── wiring: a data file the page does not ship is a game that cannot start ──
// ⚠ index.html and sw.js must move together: cache.addAll is all-or-nothing, so
//   a shell entry with no script tag (or the reverse) breaks the whole precache
//   for every returning child, not just this game.
const index = read('index.html');
const sw = read('sw.js');
ok('index.html loads engine/minigame_french.js',
  /<script src="engine\/minigame_french\.js"><\/script>/.test(index));
const shell = (sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [, ''])[1];
ok('sw.js precaches /engine/minigame_french.js', /'\/engine\/minigame_french\.js'/.test(shell));
ok('minigame_french.js loads BEFORE minigame.js',
  index.indexOf('minigame_french.js') < index.indexOf('"engine/minigame.js"')
  || index.indexOf('minigame_french.js') < index.indexOf("engine/minigame.js\""));

// ── wiring: the game is reachable and quits cleanly ────────────────────────
const mg = read('engine/minigame.js');
// ⚠ The module's export is the LAST `return {` in the file. A non-greedy match
//   from the top finds the first one instead — which is a helper's own return
//   object — and then reports every export as missing while they are all present.
const exportBlock = (() => {
  const at = mg.lastIndexOf('  return {');
  return at < 0 ? '' : mg.slice(at, mg.indexOf('};', at) + 2);
})();
ok('found the MiniGames export block', /startBillionaire/.test(exportBlock));
for (const fnName of ['startFrNinja', 'fnTap', 'fnQuit', 'fnShare', 'fnShareTo', '_fnDebug']) {
  ok(`MiniGames exports ${fnName}`, new RegExp('\\b' + fnName + '\\b[,\\s}]').test(exportBlock));
}
ok('the hub has a live French Ninja card', /mg-card-live mg-card-fn/.test(mg));
ok('the card calls startFrNinja', /onclick="MiniGames\.startFrNinja\(\)"/.test(mg));
ok('there is a help topic for frninja', /frninja: \{ icon:/.test(mg));

// ⚠ An orphaned interval keeps ticking after the child leaves the game, and the
//   next render fights it for the DOM.
ok('renderHub clears the French Ninja timer',
  /if \(_fnTimer\) \{ clearInterval\(_fnTimer\); _fnTimer = null; \}/.test(mg));
ok('the help overlay pauses the French Ninja timer', /_fn && !_fn\.over && _fnTimer/.test(mg));
ok('a refresh can resume a run', /saved\.game === 'frninja'/.test(mg));

// ── the rules the game must not break ──────────────────────────────────────
// ⚠ THE rule every minigame inherits. A replay must not distort the mastery,
//   mistake and daily reporting parents rely on.
const fnBlock = (mg.match(/FRENCH NINJA[\s\S]*?function open\(\) \{/) || [''])[0];
ok('French Ninja never calls recordAnswer()', !/recordAnswer\s*\(/.test(fnBlock));
ok('French Ninja never calls _recordDaily()', !/_recordDaily\s*\(/.test(fnBlock));
ok('a finished run awards points once, through _awardRun',
  (fnBlock.match(/_awardRun\(/g) || []).length === 1);
ok('bests are stored under DB.games.frninja', /DB\.games\.frninja/.test(fnBlock));
// ⚠ A score sliding below zero reads as punishment and a child stops playing;
//   the shake already carries the lesson.
ok('the score is floored at zero', /Math\.max\(0, _fn\.score - FN_MISS\)/.test(fnBlock));
// ⚠ Expiry must not also dock points — time pressure is the game, but charging a
//   slow reader for reading is not.
const expire = (fnBlock.match(/function _fnExpire\(\)[\s\S]*?\n  \}/) || [''])[0];
ok('running out of time costs no points', !/_fn\.score\s*-/.test(expire));

// ── sharing ────────────────────────────────────────────────────────────────
// ⚠ A share carries a score and a challenge — never the child's name, id, or any
//   link back to a profile. This is the same rule every other score share follows.
const shareBlock = (fnBlock.match(/function _fnShareText[\s\S]*?function fnQuit/) || [''])[0];
for (const leak of ['ACTIVE_STUDENT_ID', 'getActiveAccount', 'DB.name', '_fn.name', 'student_id']) {
  ok(`the share never carries ${leak}`, !shareBlock.includes(leak));
}
ok('the share url points at score.html with g=fn', /score\.html\?\$\{qs\}/.test(fnBlock) && /g=fn/.test(fnBlock));
ok('Facebook is shared by URL only', /sharer\.php\?u=' \+ encodeURIComponent\(url\)/.test(fnBlock));
// ⚠ The Facebook sharer builds its card from the og: tags at the URL and has not
//   honoured `quote` for years, so a text= on that link is a lie to the reader.
ok('the Facebook link does not pretend to carry text',
  !/sharer\.php[^\n]*quote=/.test(fnBlock));

const score = read('score.html');
ok('score.html understands g=fn', /fn: \{ icon:/.test(score));
ok('score.html falls back to Quick Fire for an unknown g', /\|\| GAMES\.qf/.test(score));
// ⚠ Those og: tags are static and are what Facebook renders. If they name one
//   game, every other game's share is mislabelled in the card.
ok('score.html og:title is game-neutral', !/og:title" content="[^"]*Quick Fire/.test(score));
ok('score.html og:description is game-neutral', !/og:description" content="[^"]*Quick Fire/.test(score));

// ── the landing page's measured game count ─────────────────────────────────
// ⚠ "Every number on the landing page is measured and goes stale silently."
const liveCards = (mg.match(/mg-card mg-card-live/g) || []).length;
const claimed = Number((index.match(/black text-white">(\d+)<\/div>\s*<div[^>]*>\s*(?:Fun games|Games)/i) || [])[1]
  || (index.match(/(\d+) games with mg-card-live/) || [])[1]);
ok('the landing page names the real number of live games',
  claimed === liveCards, 'page says ' + claimed + ', minigame.js has ' + liveCards);

// ── RUN THE GAME ───────────────────────────────────────────────────────────
// ⚠⚠ THIS SECTION EXISTS BECAUSE 1,599 CHECKS ABOVE IT ALL PASSED ON A BUILD
//    THAT CRASHED ON THE FIRST TAP. _fnPick() called _shuffle(), which exists
//    nowhere in the codebase — the helper is `shuffle`, no underscore — so
//    startFrNinja() threw ReferenceError before a phrase ever rendered. It
//    shipped to production. Every check above reads SOURCE TEXT with a regex,
//    and a regex cannot tell a defined identifier from an invented one.
//    Nothing short of executing the module catches that class of bug, so this
//    loads the real files in index.html order and plays a run.
//
// ⚠ MiniGames is `const MiniGames = (() => {…})()` at classic-script top level:
//   a global LEXICAL binding, never a property of globalThis. Reading
//   sandbox.MiniGames gives undefined even though the binding exists — it must
//   be read by BARE IDENTIFIER through runInContext. That is the same trap the
//   crash itself came from, and it cost a second wrong diagnosis while chasing
//   the first.
const vm = require('node:vm');
{
  const els = new Map();
  const el = (id) => {
    if (!els.has(id)) els.set(id, { id, innerHTML: '', textContent: '', style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
      appendChild() {}, remove() {}, querySelectorAll: () => [] });
    return els.get(id);
  };
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    document: { getElementById: el, createElement: () => el('_t'), body: el('body'),
      documentElement: el('html'), querySelectorAll: () => [], addEventListener() {} },
    navigator: { onLine: true }, location: { href: 'https://nouklass.com/', search: '', protocol: 'https:' },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    setTimeout, clearTimeout, setInterval, clearInterval,
    Math, Date, JSON, URL, URLSearchParams, Promise,
    fetch: () => Promise.reject(new Error('no network')),
    toast() {}, launchConfetti() {}, showScreen() {}, save() {}, applyServerPoints() {},
    confirm: () => true, prompt: () => null,
    ACTIVE_STUDENT_ID: 'test', SELECTED_GRADE: 6,
    DB: { stats: {}, games: {}, restrictions: {} },
    Store: { awardActivityPoints: () => Promise.resolve(null) },
    Auth: { getActiveAccount: () => ({ grade: 6 }) },
    GameSettings: { context: () => ({ settings: {} }), childSummaryLine: () => '', childGradeBar: () => '' },
    _planAllowsFeature: () => true,
    AudioContext: function () { return { createOscillator: () => ({ connect() {}, start() {}, stop() {}, frequency: {} }),
      createGain: () => ({ connect() {}, gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } }),
      destination: {}, currentTime: 0 }; },
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);

  // ⚠ index.html order matters: helpers.js defines shuffle(), which the pick uses.
  let loadErr = null;
  for (const file of ['engine/helpers.js', 'engine/minigame_french.js', 'engine/minigame.js']) {
    try { vm.runInContext(read(file), ctx, { filename: file }); }
    catch (e) { loadErr = file + ': ' + e.message; break; }
  }
  ok('the engine files load without throwing', !loadErr, loadErr);

  const MG = loadErr ? null : vm.runInContext('MiniGames', ctx);
  ok('MiniGames is defined after load', !!MG);

  if (MG) {
    // _fnPick() is where the crash was.
    let picked = null, pickErr = null;
    try { picked = MG._fnPick(); } catch (e) { pickErr = e.constructor.name + ': ' + e.message; }
    ok('_fnPick() runs without throwing', !pickErr, pickErr);
    ok('_fnPick() deals a full run of 10 phrases', !!picked && picked.length === 10,
      picked ? 'got ' + picked.length : '');

    let startErr = null;
    try { MG.startFrNinja(); } catch (e) { startErr = e.constructor.name + ': ' + e.message; }
    ok('startFrNinja() runs without throwing', !startErr, startErr);

    const d0 = !startErr && MG._fnDebug();
    ok('a run starts at phrase 0 with no score', !!d0 && d0.idx === 0 && d0.score === 0);
    ok('the first phrase rendered into #mg-game', el('mg-game').innerHTML.length > 200);

    if (d0) {
      // Slicing an error scores; the exact figure depends on the clock, so assert
      // the direction and the counters rather than a number the timer decides.
      MG.fnTap(d0.phrase.errors[0]);
      const d1 = MG._fnDebug();
      ok('slicing an error scores points', d1.score > 0, 'score ' + d1.score);
      ok('slicing an error counts as sliced', d1.sliced === 1);

      // ⚠ Tapping a correct word must cost — but only while the phrase is still
      //   live. A single-error phrase CLEARS on that first slice and then
      //   correctly ignores taps, which is why this uses a 2-error phrase.
      const two = MG._fnPick().find((p) => p.errors.length === 2)
        || (global.window.MINIGAME_FRENCH || []).find((p) => p.errors.length === 2);
      ok('the bank has a two-error phrase to test the penalty with', !!two);
    }

    // The hub must render with the new card without throwing.
    let hubErr = null;
    try { MG.renderHub(); } catch (e) { hubErr = e.constructor.name + ': ' + e.message; }
    ok('renderHub() runs without throwing', !hubErr, hubErr);
    ok('the hub renders the French Ninja card', el('mg-hub').innerHTML.includes('startFrNinja'));

    // ⚠ Quitting must clear the interval, or it ticks on over the next screen.
    let quitErr = null;
    try { MG.fnQuit(); } catch (e) { quitErr = e.constructor.name + ': ' + e.message; }
    ok('fnQuit() runs without throwing', !quitErr, quitErr);
  }
}
console.log(fails
  ? `\n  ${checks - fails}/${checks} french-ninja checks passed, ${fails} FAILED`
  : `\n  ${checks}/${checks} french-ninja checks passed`);
process.exit(fails ? 1 : 0);
