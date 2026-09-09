'use strict';
// Does every question's OWN answer grade as correct?
//
// WHY THIS EXISTS
// Nothing else asks this. Every harness in the repo checks the SHAPE of a
// question — that its options are unique, that its answer is among them, that
// its subsection is declared — and none of them runs the grader. A question
// whose key the marker rejects is invisible: it builds, it ships, it renders,
// and a child who answers it perfectly is told they are wrong.
//
// It matters most for TYPED answers. `makeText` grades through
// matchTypedAnswer(), which folds case, whitespace and (unless strictAccents)
// accents — so a key carrying a trailing space, a stray full stop, an HTML
// entity or a wrapping quote can fail against itself. Three Grade 9 packs had
// no typed items at all until the question-family batch added 85 of them, so
// this path was almost untravelled.
//
// ⚠ It grades through netlify/lib/questions-sandbox.js — the SERVER marker, the
//   one that decides what a child is actually told. Not a reimplementation.
//
// Three assertions per question:
//   1. the key itself is accepted;
//   2. every acceptableAnswers entry is accepted;
//   3. an obviously wrong answer is REJECTED — a grader that says yes to
//      everything would pass (1) and (2) and be worse than useless.
//
//   node scripts/test-answer-gradability.js            live packs
//   node scripts/test-answer-gradability.js --all      every registered pack
//   node scripts/test-answer-gradability.js --batch    the -fam- batch only
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const { loadSubject, checkAnswer } = require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

const ALL = process.argv.includes('--all');
const BATCH_ONLY = process.argv.includes('--batch');
const FAM = /fam-\d+-[a-z]{1,2}$/;

const vm = require('node:vm');
const packs = [];
{
  const c = { registerSubject: p => packs.push(p), console: { log() {} }, window: {} };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8'), c);
}
const targets = packs.filter(p => ALL || !p.comingSoon).map(p => p.id).sort();

// A string no key should ever equal. Deliberately not empty and not numeric:
// checkAnswer rejects empty input by contract, so an empty probe would "pass"
// against a broken grader.
const NONSENSE = 'zzqqxx nonsense answer 9137';

// ⚠ NOT every type is graded by comparing against `q.answer` as it is stored.
//   A `symmetry` item stores its answer as an array of [row, col] pairs and the
//   marker expects the user's selection as a JSON STRING, so handing it the
//   array coerces to "1,4,2,6,…", fails JSON.parse and grades as wrong. Six
//   grade5-maths items were reported as broken by an earlier version of this
//   file for exactly that reason — the harness was wrong, not the questions.
//   Probe each type the way the app actually submits it.
const probeFor = q => q.type === 'symmetry' ? JSON.stringify(q.answer) : q.answer;
const nonsenseFor = q => q.type === 'symmetry' ? JSON.stringify([[97, 98], [98, 97]]) : NONSENSE;
// `symmetry-line` is marked by SymmetryLine.checkAnswer against a stored line
// spec rather than a submitted value; it has its own harness
// (scripts/test-symmetry-line.js) and is not gradable through this probe.
const SELF_MARKED = new Set(['symmetry-line']);

let keyFail = [], acceptFail = [], graderOpen = [], skipped = 0, checked = 0;

for (const pack of targets) {
  let qs = [];
  try { qs = loadSubject(pack); } catch (e) { console.log('  note  ' + pack + ' failed to load: ' + e.message); continue; }
  for (const q of qs) {
    if (BATCH_ONLY && !FAM.test(q.id || '')) continue;
    // A past-paper item has no gradable answer by design, and the pool types the
    // engine excludes (cloze/task/errorhunt) are marked by their own renderers.
    if (!q || q.answer === undefined || q.answer === null || String(q.answer) === '') { skipped++; continue; }
    if (q.type === 'cloze' || q.type === 'task' || q.type === 'errorhunt') { skipped++; continue; }
    if (SELF_MARKED.has(q.type)) { skipped++; continue; }
    checked++;

    let ok = false;
    try { ok = checkAnswer(q, probeFor(q)); } catch (e) { ok = false; }
    if (!ok) keyFail.push({ pack, id: q.id, type: q.type, answer: String(q.answer).slice(0, 70) });

    for (const alt of (q.acceptableAnswers || [])) {
      if (alt === q.answer) continue;
      let a = false;
      try { a = checkAnswer(q, alt); } catch (e) { a = false; }
      if (!a) acceptFail.push({ pack, id: q.id, alt: String(alt).slice(0, 60) });
    }

    let wrong = true;
    try { wrong = checkAnswer(q, nonsenseFor(q)); } catch (e) { wrong = false; }
    if (wrong) graderOpen.push({ pack, id: q.id, type: q.type });
  }
}

const scope = BATCH_ONLY ? 'the -fam- batch' : (ALL ? 'every registered pack' : 'every live pack');
console.log('');
console.log('Graded ' + checked + ' question(s) across ' + targets.length + ' pack(s) — ' + scope
  + '; ' + skipped + ' skipped (no gradable answer by design).');
console.log('');

let fails = 0;
function report(list, headline, fmt) {
  if (!list.length) { console.log('  ok    ' + headline.ok); return; }
  fails++;
  console.log('  FAIL  ' + list.length + ' ' + headline.bad);
  for (const r of list.slice(0, 15)) console.log('        ' + fmt(r));
  if (list.length > 15) console.log('        … and ' + (list.length - 15) + ' more');
}

report(keyFail,
  { ok: "every question's own answer grades as correct",
    bad: "question(s) whose OWN answer the marker rejects — a child who answers perfectly is told they are wrong:" },
  r => r.pack + '/' + r.id + ' [' + r.type + '] answer=' + JSON.stringify(r.answer));

report(acceptFail,
  { ok: 'every acceptableAnswers alternative is accepted',
    bad: 'alternative answer(s) listed as acceptable that the marker rejects:' },
  r => r.pack + '/' + r.id + ' alt=' + JSON.stringify(r.alt));

report(graderOpen,
  { ok: 'a nonsense answer is rejected everywhere',
    bad: 'question(s) that accept a NONSENSE answer — anything typed would be marked right:' },
  r => r.pack + '/' + r.id + ' [' + r.type + ']');

console.log('');
console.log('Answer gradability: ' + (3 - fails) + ' of 3 checks passed.');
if (fails) process.exitCode = 1;
