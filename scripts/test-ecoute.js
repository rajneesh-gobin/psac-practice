'use strict';
// Écoute ! 🦜 — measured checks through the REAL module in a VM.
//
// ⚠⚠ THE CHECK THIS FILE EXISTS FOR IS THE HOMOPHONE TABLE. The question is
//    AUDIO. If two options sound identical, the child cannot answer correctly
//    no matter how well they listened, and the game marks them wrong for
//    hearing perfectly. That is unfalsifiable from the child's side and
//    invisible in play-testing.
//    ⚠ The design note above renderHub() actually prescribes one: it says to
//    curate "vin/vingt", which are both /vɛ̃/ and are indistinguishable in
//    speech. The bank deliberately does not follow that half of the note, and
//    this table is what stops it or anything like it coming back.
//
// Also checked: the bank shape, the picker, the two modes (speech and the
// flash-card fallback for a device with no French voice), the replay cap, and
// that options stay locked until the child has actually played the question.
//
// Run: node scripts/test-ecoute.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; return; }
  fail++;
  if (bad.length < 25) bad.push(`${label}${detail ? ` — ${detail}` : ''}`);
};

const stubEl = () => ({
  classList: { add() {}, remove() {}, toggle() {} },
  style: {}, textContent: '', className: '', innerHTML: '',
  appendChild() {}, remove() {},
});
// ⚠ NO speechSynthesis in this context, on purpose: that is a real device with
//   no French voice, and the game must fall into flash-card mode rather than
//   dead-end. The speech path is asserted by reading the source below.
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
run('engine/minigame_ecoute.js');
run('engine/minigame.js');
const MG = vm.runInContext('MiniGames', ctx);
const bank = ctx.window.MINIGAME_ECOUTE || [];

// ── 1: shape ────────────────────────────────────────────────────────────────
check(bank.length >= 30, 'the bank holds a real set of items', String(bank.length));
check(new Set(bank.map(i => i.id)).size === bank.length, 'item ids are unique');
for (const b of [1, 2, 3]) {
  check(bank.filter(i => i.band === b).length >= 8,
    `band ${b} can fill a run on its own`, String(bank.filter(i => i.band === b).length));
}
for (const it of bank) {
  const at = it.id || '(no id)';
  check(Array.isArray(it.options) && it.options.length === 4, `${at} — exactly four options`);
  check(it.options.includes(it.answer), `${at} — the answer is one of the options`);
  check(new Set(it.options).size === it.options.length, `${at} — no repeated option`);
  // ⚠ In flash-card mode `say` is SHOWN, so it has to be the written form the
  //   child then picks — a phonetic respelling would be unmatchable.
  check(it.say === it.answer, `${at} — what is spoken is what is written`, `${it.say} vs ${it.answer}`);
  check(!/[\[\]\/]/.test(it.say), `${at} — say is plain text, not a phonetic transcription`, it.say);
}

// ── 2: the homophone table ──────────────────────────────────────────────────
// ⚠ Standard French homophone sets. Two members of one set inside a single
//   item's options make that item unanswerable by ear. This list is not
//   exhaustive French phonology — it is the traps that fit this bank's
//   vocabulary, and it should GROW whenever the bank does.
const HOMOPHONES = [
  ['vin', 'vingt', 'vain'], ['cou', 'coup', 'coût'], ['vers', 'verre', 'vert', 'ver'],
  ['sur', 'sûr'], ['ou', 'où'], ['mer', 'mère', 'maire'], ['dent', 'dents', 'dans'],
  ['temps', 'tant', 'tan'], ['sang', 'sans', 'cent'], ['il', 'ils'], ['elle', 'elles'],
  ['nez', 'né'], ['pouce', 'pousse'], ['cher', 'chair'], ['ami', 'amie'],
  ['mur', 'mûr'], ['chou', 'choux'], ['foie', 'fois', 'foi'], ['mais', 'mes', 'met'],
  ['peau', 'pot'], ['sot', 'seau', 'saut'], ['voix', 'voie'], ['pain', 'pin'],
  ['faim', 'fin'], ['ce', 'se'], ['sa', 'ça'], ['la', 'là'], ['et', 'est'],
  ['on', 'ont'], ['son', 'sont'], ['ver', 'verre'], ['cane', 'canne'],
  ['reine', 'renne'], ['compte', 'comte', 'conte'], ['par', 'part'],
];
let clashes = 0;
for (const it of bank) {
  const low = it.options.map(o => o.toLowerCase().trim());
  for (const set of HOMOPHONES) {
    const hits = set.filter(w => low.includes(w));
    if (hits.length > 1) {
      clashes++;
      if (bad.length < 25) bad.push(`${it.id} offers homophones: ${hits.join(' / ')}`);
    }
  }
}
check(clashes === 0, 'no item offers two options that sound identical', String(clashes));

// ⚠ And the specific one the design note asked for, called out by name so the
//   next person reads the reason rather than re-adding it.
const allOpts = bank.flatMap(i => i.options.map(o => o.toLowerCase()));
check(!(allOpts.includes('vin') && allOpts.includes('vingt'))
  || !bank.some(i => { const l = i.options.map(o => o.toLowerCase()); return l.includes('vin') && l.includes('vingt'); }),
'vin/vingt are never offered together (they are the same sound)');

// ── 3: the picker ───────────────────────────────────────────────────────────
let shortRun = 0, repeated = 0;
for (let band = 1; band <= 3; band++) {
  for (let n = 0; n < 40; n++) {
    const run10 = MG._ecPick(band);
    if (run10.length !== 10) shortRun++;
    // ⚠ The same spoken word twice in one run is a memory question the second
    //   time — the child has already been shown the answer.
    if (new Set(run10.map(i => i.say)).size !== run10.length) repeated++;
  }
}
check(shortRun === 0, 'every run is a full ten questions', String(shortRun));
check(repeated === 0, 'no run says the same word twice', String(repeated));

// ── 4: the fallback mode ────────────────────────────────────────────────────
// This VM has no speechSynthesis at all — the cheap-handset case.
check(MG._ecMode() === 'flash', 'with no speech support the game falls back to flash-card mode');

MG.startEcoute();
let d = MG._ecDebug();
check(!!d, 'a game starts with no voice installed');
check(d.mode === 'flash', 'the run is in flash-card mode', d && d.mode);
check(d.total === 10, 'a run is ten questions', String(d && d.total));
check(d.heard === false, 'the question has not been played yet');

// ⚠ Options must be refused until the child has played the question, or the
//   game is a free guess with the audio as decoration.
MG.ecAnswer(d.item.answer);
check(MG._ecDebug().locked === false, 'answering before playing is refused');
check(MG._ecDebug().score === 0, 'and scores nothing');

MG.ecListen();
d = MG._ecDebug();
check(d.heard === true, 'playing the question unlocks the options');
check(d.replaysLeft === 2, 'two replays are available', String(d.replaysLeft));

// The replay cap.
MG.ecListen(); MG.ecListen();
d = MG._ecDebug();
check(d.replaysLeft === 0 && d.replaysUsed === 2, 'replays are capped at two',
  `left ${d.replaysLeft}, used ${d.replaysUsed}`);
MG.ecListen();
d = MG._ecDebug();
check(d.replaysUsed === 2, 'a fourth play is refused', String(d.replaysUsed));

// A correct answer, with replays spent, still scores — just less.
MG.ecAnswer(d.item.answer);
d = MG._ecDebug();
check(d.locked === true, 'answering locks the question');
check(d.correct === 1 && d.score > 0, 'a correct answer scores');
const withReplays = d.score;

MG.ecNext();
d = MG._ecDebug();
check(d.idx === 1, 'Suivant advances');
check(d.heard === false && d.replaysLeft === 2, 'the next question resets replays');

// Clean first listen should be worth more than one rescued by two replays.
MG.ecListen();
d = MG._ecDebug();
MG.ecAnswer(d.item.answer);
const clean = MG._ecDebug().score - withReplays;
check(clean > withReplays, 'answering on the first listen is worth more than after two replays',
  `clean ${clean} vs ${withReplays}`);

// Finish the run.
let guard = 0;
while (MG._ecDebug() && !MG._ecDebug().over && guard++ < 60) {
  const s = MG._ecDebug();
  if (!s.locked) { if (!s.heard) MG.ecListen(); MG.ecAnswer(s.item.answer); }
  else MG.ecNext();
}
const done = MG._ecDebug();
check(done && done.over === true, 'a run of ten ends');
const saved = ctx.DB.games.ecoute;
check(!!saved && saved.plays === 1, 'the run is recorded');
check(saved && saved.bestStreak > 0, 'the streak is stored', JSON.stringify(saved));

// ── 5: the rules, read from source ──────────────────────────────────────────
const mg = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const ecBlock = (mg.match(/══ ECOUTE[\s\S]*?(?=\n\s*\/\/ ══ [A-Z]|function open\(\) \{)/) || [''])[0];
check(ecBlock.length > 1000, 'found the Écoute block');

// ⚠⚠ THE iOS RULE. speak() must be reached synchronously from a tap. If any
//   speak call ends up inside a setTimeout the game goes silent on iPhone and
//   nothing else reports it.
// ⚠ THE FIRST VERSION OF THIS CHECK DID NOT WORK, and a sabotage run is the
//   only reason that is known: it was /setTimeout\([^)]*\{[^}]*_ecSpeak/, and
//   `[^)]*` cannot cross the `()` in `setTimeout(() => {`, so it never matched
//   anything. Moving the speak into a timeout — the exact iOS bug — passed.
//   Scan each callback body instead of trying to express it as one regex.
const timeoutBodies = (() => {
  const out = [];
  let at = ecBlock.indexOf('setTimeout(');
  while (at >= 0) {
    // Walk to the matching close paren so the body is the real argument list,
    // however many braces and arrow functions are nested inside it.
    let depth = 0, i = at + 'setTimeout'.length;
    for (; i < ecBlock.length; i++) {
      const ch = ecBlock[i];
      if (ch === '(') depth++;
      else if (ch === ')') { depth--; if (depth === 0) break; }
    }
    out.push(ecBlock.slice(at, i + 1));
    at = ecBlock.indexOf('setTimeout(', i + 1);
  }
  return out;
})();
check(timeoutBodies.length > 0, 'found the setTimeout callbacks to scan');
const speaking = timeoutBodies.filter(b => /_ecSpeak\s*\(/.test(b));
check(speaking.length === 0, 'no _ecSpeak() is called from inside a setTimeout',
  speaking.map(b => b.replace(/\s+/g, ' ').slice(0, 90)).join(' | '));
check(/function ecNext\(\)[\s\S]*?_ecSpeak\(/.test(ecBlock),
  'the next question speaks from inside the Suivant tap');
// ⚠ cancel-then-speak on an idle queue is a Chrome stall (measured in app.js).
check(/speechSynthesis\.speaking \|\| speechSynthesis\.pending\) speechSynthesis\.cancel\(\)/.test(ecBlock),
  'cancel() only runs when something is actually speaking');
// ⚠ Speech outlives the DOM that started it.
check(/_ttsStop/.test(ecBlock), 'speech is stopped when the game ends or is quit');
// ⚠ The design note is explicit: audio IS the question, so there is no mute.
check(!/toggleMute|_ecMuted/.test(ecBlock), 'the game has no mute');

check(!/recordAnswer\s*\(/.test(ecBlock), 'the game never calls recordAnswer()');
check(!/_recordDaily\s*\(/.test(ecBlock), 'the game never calls _recordDaily()');
check((ecBlock.match(/_awardRun\(/g) || []).length === 1,
  'a finished run awards points once, through _awardRun');

check(html.includes('engine/minigame_ecoute.js'), 'the data file is a script tag in index.html');
check(sw.includes("'/engine/minigame_ecoute.js'"), 'the data file is pre-cached in sw.js');
check(html.indexOf('engine/minigame_ecoute.js') < html.indexOf('engine/minigame.js'),
  'the data file loads BEFORE minigame.js');
check(/mg-card-live mg-card-ec/.test(mg), 'the hub card is live, not a teaser');
// ⚠ Assert on the CARD MARKUP, not on the words — see the note in
//   test-memory-reef.js. The design-intent comment names every built game.
check((mg.match(/class="mg-card mg-card-soon"/g) || []).length === 0,
  'no COMING SOON teaser card is left in the hub');
check(/\.mg-card-ec /.test(css) && /\.ec-opts /.test(css), 'the game is styled');
check(/saved\.game === 'ecoute'/.test(mg), 'a refresh can resume a run');

for (const fn of ['startEcoute', 'ecListen', 'ecAnswer', 'ecNext', 'ecQuit', 'ecShare', 'ecShareTo', '_ecDebug', '_ecPick', '_ecMode']) {
  check(typeof MG[fn] === 'function', `MiniGames.${fn} is exported`);
}

console.log(`${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
