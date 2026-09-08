'use strict';
// Does every pack a parent can SEE actually have something behind it?
//
// WHY THIS EXISTS
// `comingSoon: false` is the single switch that puts a pack in front of a parent
// and a child: `Shop.sellableSubjects`, the plan chapter picker, the calendar and
// search subject filters and `_subjectChips` all key on it. Flipping it is one
// character, and nothing checked that the content had arrived first.
//
// ⚠ MEASURED 2026-09-08: `grade9-english`, `grade9-french` and
//   `grade9-social-modern-studies` were flipped to `comingSoon: false` while each
//   still held ONE sample question - against 17, 11 and 17 declared chapters.
//   The only thing that noticed was `test-exam-paper-shape.js`, and what it said
//   was "a full exam dealt 1 of 40 questions" - which reads as a bug in the exam
//   assembler, not as "this pack should not be live yet". A child opening that
//   subject gets a chapter grid where every chapter is empty.
//   ⚠ Content was arriving into those packs while this file was being written, so
//     the exact counts move. What does not move is the shape of the defect: the
//     flag went first and the content followed, and only luck decides how long
//     the gap lasts. This check closes that gap from the flag's side.
//
// ⚠ THIS READS SOURCE, NOT THE BUILT BUNDLES, on purpose - unlike most checks in
//   this repo. The question here is "has the content been written", and the
//   answer must not depend on whether someone remembered to rebuild. A pack that
//   is empty in source is empty however fresh the bundle is; the bundle-vs-source
//   hazard belongs to the checks that ask whether a FIELD survived the build.
//
// ⚠ LIVE PACKS COME FROM THE GENERATED INDEX. A hard-coded grade list silently
//   skipped grade9-maths the day it went live, and grepping the manifests for
//   /comingSoon:\s*false/ matches the comment every placeholder pack carries
//   ("5. Set comingSoon: false."), which reports all 30 of them live.
//
//   node scripts/test-live-pack-content.js

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const { loadSubject } = require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

// Each pack is executed once and reused - loadSubject() runs every question file
// in the pack through the real sandbox, and three passes over 23 packs is 69
// needless executions.
const SRC = new Map();
function questionsOf(id) {
  if (!SRC.has(id)) {
    try { SRC.set(id, loadSubject(id)); } catch (e) { SRC.set(id, e); }
  }
  return SRC.get(id);
}

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };

// An exam is 40 questions. A pack that cannot cover one is not a subject yet.
const EXAM_SIZE = 40;

const packs = [];
{
  const ctx = { registerSubject: p => packs.push(p), console: { log() {} }, window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8'), ctx);
}
const LIVE = packs.filter(p => !p.comingSoon).sort((a, b) => a.id < b.id ? -1 : 1);

console.log('\nEvery live pack has real content behind it (' + LIVE.length + ' live packs)');

for (const pack of LIVE) {
  const qs = questionsOf(pack.id);
  if (qs instanceof Error) { bad(pack.id + ': source will not load — ' + qs.message); continue; }

  const byChapter = new Map();
  for (const q of qs) byChapter.set(q.chapterId, (byChapter.get(q.chapterId) || 0) + 1);

  const declared = (pack.chapters || []).map(c => c.id);
  const empty = declared.filter(id => !byChapter.has(id));

  if (empty.length) {
    // Name every one. "Some chapters are empty" is not something anyone can act on.
    bad(pack.id + ': comingSoon is false but ' + empty.length + ' of ' + declared.length +
      ' chapters have NO questions — a child opening this subject gets an empty grid: ' +
      empty.join(', '));
  } else {
    ok(pack.id + ': all ' + declared.length + ' chapters have questions (' + qs.length + ' items)');
  }

  if (qs.length < EXAM_SIZE) {
    bad(pack.id + ': ' + qs.length + ' question(s) in the whole pack — an exam is ' +
      EXAM_SIZE + ', so this pack cannot deal one');
  }
}

// A tagged question whose chapter the pack does not declare is unreachable from
// every screen — the mirror of the empty-chapter case above, and the same class
// of defect the subsection invariant exists for one level down.
console.log('\nNo questions are tagged to a chapter the pack does not declare');
for (const pack of LIVE) {
  const qs = questionsOf(pack.id);
  if (qs instanceof Error) continue;
  const declared = new Set((pack.chapters || []).map(c => c.id));
  const orphan = new Map();
  for (const q of qs) {
    if (declared.has(q.chapterId)) continue;
    orphan.set(q.chapterId, (orphan.get(q.chapterId) || 0) + 1);
  }
  if (orphan.size) {
    bad(pack.id + ': ' + [...orphan].map(([c, n]) => n + ' item(s) on undeclared chapter "' + c + '"').join('; '));
  } else {
    ok(pack.id);
  }
}

// ⚠ THIS PASS REVIEWS, IT NEVER FAILS — deliberately, the same call
//   audit-difficulty-labels.js makes. "Enough content to be worth opening" is a
//   judgement, and a judgement that stops the build gets worked around rather
//   than answered. A chapter with ZERO questions above is indefensible and is a
//   hard failure; a chapter with four is thin, which is a decision for whoever
//   is writing it. 20 is the same floor audit-content-coverage.js already calls
//   a permanent gap for a single SUBSECTION, and a chapter holds several.
console.log('\nReview — live packs that are thin per chapter (not a failure)');
let thin = 0;
for (const pack of LIVE) {
  const qs = questionsOf(pack.id);
  if (qs instanceof Error) continue;
  const n = (pack.chapters || []).length;
  if (!n) continue;
  const per = qs.length / n;
  if (per >= 20) continue;
  thin++;
  console.log('  note  ' + pack.id + ': ' + qs.length + (qs.length === 1 ? ' item over ' : ' items over ') + n +
    ' chapters = ' + per.toFixed(1) + ' per chapter. It is LIVE to parents at this depth.');
}
if (!thin) console.log('  none — every live pack averages 20+ questions per chapter');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
