'use strict';
// Texte à Trous on the PRINTED paper.
//
// ⚠⚠ THE DISTINCTION THIS FILE DEFENDS. isPoolQuestion() excludes cloze from
//    every pool, and that must NOT change: the on-screen exam has no renderer
//    for a passage with ten gaps and no single answer, so an exam dealt one
//    "draws a number pad under a French passage". A PRINTED paper is the one
//    surface where the format works — it is how the real PSAC sets French Q6.
//    So the printable paper builds its cloze pool deliberately OUTSIDE
//    isPoolQuestion(), and this file asserts BOTH halves: the printed paper
//    can have one, and nothing else may.
//
// ⚠ And the data itself, because the paper is where a bad item becomes visible
//   to a parent: placeholders numbered 1..n in order, every banked answer
//   actually in the bank, notes aligned to gaps.
//
// Run: node scripts/test-printable-cloze.js
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

// ── 1: the exclusion still holds everywhere else ────────────────────────────
const qe = fs.readFileSync(path.join(ROOT, 'engine/questions_engine.js'), 'utf8');
const ctx = { console, STATIC_QUESTIONS: [] };
vm.createContext(ctx);
const excl = (qe.match(/const _POOL_TYPES_EXCLUDED[\s\S]*?function isPoolQuestion[^\n]*\n/) || [''])[0];
check(excl.length > 40, 'found the pool-exclusion source');
vm.runInContext(excl + '\nthis.isPool = isPoolQuestion;', ctx);
const isPool = ctx.isPool;
check(typeof isPool === 'function', 'lifted isPoolQuestion()');
check(isPool({ type: 'mcq', question: 'x' }) === true, 'an ordinary question is poolable');
// ⚠ If any of these three start returning true, the on-screen exam breaks.
for (const t of ['cloze', 'errorhunt', 'task']) {
  check(isPool({ type: t, question: 'x' }) === false, `${t} is still excluded from every pool`);
}

const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');

// ⚠ Exactly ONE place may build a cloze pool outside isPoolQuestion(), and it
//   has to be the printable paper. A second one is the on-screen exam growing
//   a bug.
const clozePools = (app.match(/type === 'cloze'/g) || []).length;
check(clozePools === 1, 'only one place in app.js pools cloze directly', String(clozePools));
const paper = app.slice(app.indexOf('function generatePrintablePaper()'));
check(/const _clozePool = STATIC_QUESTIONS\.filter/.test(paper),
  'the printable paper builds its own cloze pool');
// ⚠ The same locks and cap as the rest of the sheet — a locked chapter must
//   not leak in through the one pool that skips the usual filter.
const poolSrc = (paper.match(/const _clozePool = STATIC_QUESTIONS\.filter\([\s\S]*?\);/) || [''])[0];
check(/_activeChs\.has\(q\.chapterId\)/.test(poolSrc), 'the cloze pool honours locked chapters');
check(/q\.difficulty <= maxDiff/.test(poolSrc), 'the cloze pool honours the difficulty cap');

// ⚠ A maths paper must not grow an empty Section C.
check(/\$\{clozeItem \? `/.test(paper), 'Section C is rendered only when a cloze item was found');
check(/GRAND TOTAL[\s\S]{0,200}\/ \$\{100 \+ clozeMarks\}/.test(paper),
  'the grand total includes the cloze marks');
check(/one mark per gap/.test(paper), 'the answer key states the mark scheme');
check(/class="answer-gaps"/.test(paper), 'the answer key lists gaps individually, not as one line');

// ── 2: both item shapes render ──────────────────────────────────────────────
const block = (app.match(/function _printClozeBlock\(cz, startNum\)[\s\S]*?\n  \}/) || [''])[0];
check(block.length > 200, 'found _printClozeBlock');
// ⚠ Grade 6 is twoPart: text + textB. Rendering only `text` prints five gaps
//   and claims ten marks.
check(/cz\.textB/.test(block), 'the renderer handles the two-part (Grade 6) shape');
check(/gapAnswers\.length/.test(block), 'marks come from the real gap count');

// ── 3: the authored items ───────────────────────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (ln.startsWith('registerSubject(')) {
    try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); } catch (_) {}
  }
}
const bundles = path.join(ROOT, 'netlify/question-bundles');
const items = [];
if (fs.existsSync(bundles)) {
  for (const p of packs.filter(x => !x.comingSoon)) {
    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(bundles, p.id + '.json'), 'utf8')); } catch (_) { continue; }
    for (const q of (Array.isArray(j) ? j : (j.questions || []))) {
      if (q && q.type === 'cloze') items.push(Object.assign({ _pack: p.id }, q));
    }
  }
}
check(items.length > 0, 'found cloze items in the built bundles', String(items.length));

for (const cz of items) {
  const at = cz.id || '(no id)';
  const twoPart = !!cz.twoPart;
  const phA = [...String(cz.text || '').matchAll(/\{(\d+)\}/g)].map(m => +m[1]);
  const phB = [...String(cz.textB || '').matchAll(/\{(\d+)\}/g)].map(m => +m[1]);
  const all = phA.concat(phB);
  const ga = cz.gapAnswers || [];

  check(all.length === ga.length, `${at} — a placeholder for every answer`,
    `${all.length} placeholders vs ${ga.length} answers`);
  // ⚠ Numbered 1..n IN ORDER: the printed sup numbers and the answer key's
  //   ordered list are matched by position, so a gap out of sequence marks the
  //   child against the wrong word.
  check(all.every((v, i) => v === i + 1), `${at} — gaps run 1..n in order`, all.join(','));
  check(ga.every(a => typeof a === 'string' && a.trim()), `${at} — every gap has an answer`);

  // Part A answers must be in the bank. ⚠ Part B deliberately has NO bank.
  const aCount = twoPart ? (cz.gapsA || phA.length) : ga.length;
  const bank = cz.bank || [];
  const missing = ga.slice(0, aCount).filter(a => !bank.includes(a));
  check(missing.length === 0, `${at} — every Part A answer is in the word bank`, missing.join(', '));
  check(new Set(bank).size === bank.length, `${at} — no word repeats in the bank`);
  // ⚠ At least as many words as gaps, or the puzzle is unsolvable.
  check(bank.length >= aCount, `${at} — the bank covers its gaps`, `${bank.length} words, ${aCount} gaps`);

  if (twoPart) {
    check(phB.length > 0, `${at} — a two-part item has a Part B text`);
    check(!cz.bankB, `${at} — Part B has no bank, by design`);
    check((cz.gapsA || 0) + (cz.gapsB || 0) === ga.length,
      `${at} — gapsA + gapsB equals the answer count`);
  }
  if (Array.isArray(cz.notes) && cz.notes.length) {
    check(cz.notes.length === ga.length, `${at} — one marker note per gap`,
      `${cz.notes.length} notes vs ${ga.length} gaps`);
  }
}

// ── 4: coverage, so the request can be answered honestly ────────────────────
const byPack = {};
for (const cz of items) byPack[cz._pack] = (byPack[cz._pack] || 0) + 1;
console.log('\ncloze items per pack: ' + JSON.stringify(byPack));
const french = Object.keys(byPack).filter(k => /french/.test(k));
const english = Object.keys(byPack).filter(k => /english/.test(k));
check(french.length >= 3, 'French packs carry cloze passages', french.join(', '));
// ⚠ A REVIEW, not a failure: English cloze is content that has to be written,
//   and the printed paper already supports it the moment items exist.
if (!english.length) {
  console.log('  REVIEW  no English pack has cloze items yet — the paper supports them,');
  console.log('          but Section C will only appear for French until they are authored.');
}

console.log(`\n${pass} passed, ${fail} failed`);
if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  ✗ ' + b)); }
process.exit(fail ? 1 : 0);
