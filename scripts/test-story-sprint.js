'use strict';
// Story Sprint 📖 — measured checks through the REAL module in a VM.
//
// ⚠⚠ THE CHECK THIS FILE EXISTS FOR: the clock must not be running while the
//    child is reading. The design note states the reason in its own
//    parenthesis — "never punish slow readers for reading" — and it is the
//    only rule that makes this game fair to the child who most needs it. So it
//    is asserted as BEHAVIOUR (no interval exists during the reading phase),
//    not as a comment anyone can move.
//
// Also checked: passages are original and self-contained, every question is
// answerable from its own passage, the picker honours the child's enabled
// languages, a timeout ends the passage rather than the run, and the reading
// screen carries no timer markup at all.
//
// Run: node scripts/test-story-sprint.js
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
// ⚠ setInterval is TRACKED, not stubbed away: whether a timer exists during
//   the reading phase is the whole point of this file.
let liveIntervals = 0;
const ctx = {
  window: {}, navigator: {}, console, Date, Math, JSON, URL,
  document: { getElementById: () => stubEl(), createElement: () => stubEl() },
  sessionStorage: { setItem() {}, getItem: () => null, removeItem() {} },
  setTimeout: fn => { fn(); return 0; }, clearTimeout() {},
  setInterval: () => { liveIntervals++; return liveIntervals; },
  clearInterval: id => { if (id) liveIntervals = Math.max(0, liveIntervals - 1); },
  confirm: () => true, toast() {}, save() {},
  DB: { stats: { totalAttempted: 0 }, games: {}, restrictions: {} },
};
vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: path.basename(f) });
run('engine/helpers.js');
run('engine/game_settings.js');
run('engine/minigame_story.js');
run('engine/minigame.js');
const MG = vm.runInContext('MiniGames', ctx);
const bank = ctx.window.MINIGAME_STORY || [];

// ── 1: the passages ─────────────────────────────────────────────────────────
check(bank.length >= 12, 'the bank holds a real set of passages', String(bank.length));
check(new Set(bank.map(p => p.id)).size === bank.length, 'passage ids are unique');
for (const b of [1, 2, 3]) {
  const g = bank.filter(p => p.band === b);
  check(g.length >= 4, `band ${b} can fill most of a run`, String(g.length));
  // ⚠ "English and French mixed by the child's packs" needs both to exist in
  //   every band, or a French-only child gets dealt out of their own level.
  check(g.some(p => p.lang === 'en') && g.some(p => p.lang === 'fr'),
    `band ${b} has both English and French passages`);
}

for (const p of bank) {
  const at = p.id || '(no id)';
  check(['en', 'fr'].includes(p.lang), `${at} — has a language`);
  check(typeof p.title === 'string' && p.title.length > 3, `${at} — has a title`);
  const words = p.text.split(/\s+/).length;
  // ⚠ Long enough to comprehend, short enough to hold. Under ~40 words there is
  //   nothing to ask; over ~170 it is a reading test with a memory tax.
  check(words >= 40 && words <= 170, `${at} — passage length is sane`, words + ' words');
  check(p.questions.length === 3, `${at} — exactly three questions`);
  for (const q of p.questions) {
    check(q.options.length === 4, `${at} — four options`);
    check(q.options.includes(q.answer), `${at} — the answer is one of the options`);
    check(new Set(q.options).size === 4, `${at} — no repeated option`);
    check(q.q.trim().length > 8, `${at} — the question is a real question`);
  }
  // ⚠ NOT EXTRACTED FROM THE QUESTION BANK — the design note forbids it
  //   because bank comprehension items embed their passage as stimulus HTML.
  //   Any HTML here is a sign something was lifted.
  check(!/<[a-z][^>]*>/i.test(p.text), `${at} — the passage is plain text, not stimulus HTML`);
}

// ⚠ A comprehension game must not reward general knowledge. Every answer needs
//   support in ITS OWN passage: at least one content word of the answer has to
//   appear in the text, or be derivable from it. This is a floor, not proof —
//   it catches an answer imported from somewhere else entirely.
const STOP = new Set(['the', 'a', 'an', 'of', 'to', 'in', 'is', 'it', 'and', 'or', 'for', 'on', 'at',
  'was', 'were', 'that', 'they', 'their', 'with', 'from', 'not', 'but', 'more', 'than', 'its',
  'le', 'la', 'les', 'un', 'une', 'de', 'des', 'du', 'et', 'ou', 'est', 'sont', 'il', 'elle',
  'pour', 'dans', 'que', 'qui', 'ne', 'pas', 'au', 'aux', 'son', 'sa', 'ses', 'plus']);
// ⚠ INFERENCE QUESTIONS ARE EXEMPT, and flagged in the data rather than
//   avoided. The best comprehension question is the one whose answer is NOT in
//   the passage's own words — the child joins two sentences to get there. This
//   heuristic cannot tell that apart from an answer that wandered in from
//   nowhere, so the data says which is which, and the cap below keeps the
//   exemption from becoming a way to switch the check off.
let unsupported = 0;
for (const p of bank) {
  const text = p.text.toLowerCase();
  for (const q of p.questions) {
    if (q.inference) continue;
    const words = q.answer.toLowerCase().replace(/[^\p{L}\s']/gu, ' ').split(/\s+/)
      .filter(w => w.length > 3 && !STOP.has(w));
    if (!words.length) continue;
    if (!words.some(w => text.includes(w.slice(0, Math.max(4, w.length - 2))))) {
      unsupported++;
      if (bad.length < 25) bad.push(`${p.id} — answer has no support in the passage: "${q.answer}"`);
    }
  }
}
check(unsupported === 0, 'every literal answer is supported by its own passage', String(unsupported));

// ⚠ At most one inference question per passage: two out of three and the
//   exemption has quietly become "this passage is not checked".
const overInferred = bank.filter(p => p.questions.filter(q => q.inference).length > 1);
check(overInferred.length === 0, 'no passage leans on more than one inference question',
  overInferred.map(p => p.id).join(', '));
// And they must stay the exception across the bank, not the norm.
const infTotal = bank.reduce((n, p) => n + p.questions.filter(q => q.inference).length, 0);
const qTotal = bank.reduce((n, p) => n + p.questions.length, 0);
check(infTotal <= Math.ceil(qTotal * 0.25), 'inference questions stay a minority',
  `${infTotal} of ${qTotal}`);

// ── 2: the picker ───────────────────────────────────────────────────────────
let short = 0, dup = 0, wrongLang = 0;
for (let band = 1; band <= 3; band++) {
  for (let n = 0; n < 30; n++) {
    const run5 = MG._stPick(band, ['en', 'fr']);
    if (run5.length !== 5) short++;
    if (new Set(run5.map(p => p.id)).size !== run5.length) dup++;
  }
  // ⚠ A parent who switched French off must never be dealt a French passage.
  for (let n = 0; n < 20; n++) {
    if (MG._stPick(band, ['en']).some(p => p.lang !== 'en')) wrongLang++;
    if (MG._stPick(band, ['fr']).some(p => p.lang !== 'fr')) wrongLang++;
  }
}
check(short === 0, 'every run deals five passages', String(short));
check(dup === 0, 'no passage repeats inside a run', String(dup));
check(wrongLang === 0, 'the picker honours the enabled languages', String(wrongLang));
check(typeof MG._stLangs === 'function' && MG._stLangs().length > 0, 'a language set is always resolved');

// ── 3: THE RULE — no clock while reading ────────────────────────────────────
liveIntervals = 0;
MG.startStory();
let d = MG._stDebug();
check(!!d, 'a game starts');
check(d.phase === 'read', 'a run opens on the reading screen', d && d.phase);
// ⚠⚠ THE CHECK. Not "there is a comment saying so" — no interval exists.
check(liveIntervals === 0, 'NO timer is running while the child reads', String(liveIntervals));
check(d.timerRunning === false, 'and the game agrees it has no timer yet');

// Reading as long as you like changes nothing.
MG._stDebug(); MG._stDebug();
check(liveIntervals === 0, 'still no timer after time spent on the reading screen');

// ⚠ And answering is impossible before the child says they are ready, so the
//   reading screen cannot be skipped into a scored state.
MG.stAnswer('anything');
check(MG._stDebug().score === 0, 'nothing can be answered from the reading screen');

MG.stBeginQuiz();
d = MG._stDebug();
check(d.phase === 'quiz', 'the quiz starts on the tap');
check(liveIntervals === 1, 'the clock starts only then', String(liveIntervals));
check(d.timerRunning === true, 'and the game agrees the timer is live');

// ── 4: gameplay ─────────────────────────────────────────────────────────────
d = MG._stDebug();
MG.stAnswer(d.question.answer);
d = MG._stDebug();
check(d.correct === 1 && d.score > 0, 'a correct answer scores');
check(d.locked === true, 'answering locks the question');
MG.stNext();
check(MG._stDebug().qi === 1, 'Next advances within the passage');

// Finish the passage correctly and check the perfect bonus and the pause.
for (let i = 0; i < 2; i++) {
  const s = MG._stDebug();
  if (s.phase !== 'quiz') break;
  MG.stAnswer(s.question.answer);
  MG.stNext();
}
d = MG._stDebug();
check(d.phase === 'passage-end', 'a finished passage pauses before the next one', d && d.phase);
check(d.perfects === 1, 'three out of three counts as a perfect passage', String(d && d.perfects));
// ⚠ The clock must be off again between passages — the next reading screen is
//   as untimed as the first.
check(liveIntervals === 0, 'the clock stops between passages', String(liveIntervals));

MG.stNextPassage();
d = MG._stDebug();
check(d.phase === 'read', 'the next passage opens on its own reading screen');
check(liveIntervals === 0, 'and again with no clock running', String(liveIntervals));

// Play the rest through to the end.
let guard = 0;
while (MG._stDebug() && !MG._stDebug().over && guard++ < 200) {
  const s = MG._stDebug();
  if (s.phase === 'read') MG.stBeginQuiz();
  else if (s.phase === 'passage-end') MG.stNextPassage();
  else if (s.locked) MG.stNext();
  else MG.stAnswer(s.question.answer);
}
const done = MG._stDebug();
check(done && done.over === true, 'a run of five passages ends');
check(liveIntervals === 0, 'no timer is left running at the end', String(liveIntervals));
const saved = ctx.DB.games.story;
check(!!saved && saved.plays === 1, 'the run is recorded');
check(saved && saved.bestAccuracy === 100, 'a perfect run stores 100% accuracy', JSON.stringify(saved));

// ── 5: source rules ─────────────────────────────────────────────────────────
const mg = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const stBlock = (mg.match(/══ STORY SPRINT[\s\S]*?(?=\n\s*\/\/ ══ [A-Z]|function open\(\) \{)/) || [''])[0];
check(stBlock.length > 1000, 'found the Story Sprint block');

// ⚠ Only ONE place may start the clock, and it must be the finished-reading tap.
const starts = (stBlock.match(/_stTimer = setInterval\(/g) || []).length;
check(starts === 1, 'exactly one place starts the clock', String(starts));
check(/function stBeginQuiz\(\)[\s\S]*?_stTimer = setInterval\(/.test(stBlock),
  'the clock starts inside stBeginQuiz(), the finished-reading tap');
// ⚠ The reading screen must not even render a timer element.
const readScreen = (stBlock.match(/if \(_st\.phase === 'read'\)[\s\S]*?return;/) || [''])[0];
check(readScreen.length > 200, 'found the reading screen render');
check(!/st-timebar|st-time-num/.test(readScreen), 'the reading screen renders no timer at all');

check(!/recordAnswer\s*\(/.test(stBlock), 'the game never calls recordAnswer()');
check(!/_recordDaily\s*\(/.test(stBlock), 'the game never calls _recordDaily()');
check((stBlock.match(/_awardRun\(/g) || []).length === 1,
  'a finished run awards points once, through _awardRun');

check(html.includes('engine/minigame_story.js'), 'the data file is a script tag in index.html');
check(sw.includes("'/engine/minigame_story.js'"), 'the data file is pre-cached in sw.js');
// ⚠⚠ THE SCRIPT TAG, NOT THE STRING. index.html names engine/minigame.js in a
//   PROSE COMMENT about 6,400 lines above the script tags — the landing deck
//   explains there that its game slide borrows the real .bq-* classes this file
//   paints with. A bare indexOf therefore finds the comment, every data file
//   sorts AFTER it, and this check could not pass however the tags were
//   ordered. It was red in four suites at once, which means the load order it
//   exists to protect had been unverified in all four. test-french-ninja.js and
//   test-minigame-arcade.js already anchor on the quote; these did not.
const _tagAt = (src) => html.indexOf('<script src="' + src + '"');
check(_tagAt('engine/minigame_story.js') > -1 && _tagAt('engine/minigame_story.js') < _tagAt('engine/minigame.js'),
  'the data file loads BEFORE minigame.js');
check(/mg-card-live mg-card-st/.test(mg), 'the hub card is live, not a teaser');
check(/\.mg-card-st /.test(css) && /\.st-readcard /.test(css), 'the game is styled');
check(/saved\.game === 'story'/.test(mg), 'a refresh can resume a run');

// ⚠ All four promised games are built — no teaser card may remain in the hub.
const teasers = (mg.match(/class="mg-card mg-card-soon"/g) || []).length;
check(teasers === 0, 'no COMING SOON teaser is left in the hub', String(teasers));

for (const fn of ['startStory', 'stBeginQuiz', 'stAnswer', 'stNext', 'stNextPassage', 'stQuit', 'stShare', 'stShareTo', '_stDebug', '_stPick', '_stLangs']) {
  check(typeof MG[fn] === 'function', `MiniGames.${fn} is exported`);
}

console.log(`${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
