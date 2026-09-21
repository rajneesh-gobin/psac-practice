'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Generates subjects/_counts.js — the DENOMINATOR for subject certificates.
//
//  WHY THIS EXISTS
//  A subject certificate is "N of the subject's M questions mastered". The
//  numerator is one RPC (student_subject_progress). The denominator is M, and
//  M is only knowable from the question bank — which the My Certificates
//  screen must NOT load. A Grade 9 child has eight live packs; loading all of
//  them to draw eight cards would pull ~8 MB of questions (0.98 MB compressed
//  per grade, and the cache is budgeted in bytes) to produce eight integers.
//
//  So the per-pack, per-chapter, per-difficulty counts are computed once at
//  build time and shipped as a small table. Measured: the whole corpus fits
//  in well under 40 KB, and the file is injected ON DEMAND (CertificateStore
//  ._ensureCounts) rather than eagerly, so a child who never opens the screen
//  never pays for it.
//
//  ⚠ COUNTS WHAT A CHILD CAN ACTUALLY BE DEALT, which is isPoolQuestion():
//    cloze, errorhunt and raw NCE `task` rows are excluded from every pool,
//    so counting them would advertise a denominator no child can ever reach
//    and mastery would be unreachable in every French pack. Tasks are counted
//    through their PROJECTED items instead — questions-sandbox.js expands
//    them exactly as the built bundles and the database do.
//
//  ⚠ PAST PAPERS ARE EXCLUDED. questions-sandbox.js keeps them in a separate
//    `papers` array precisely because they are never gradable.
//
//  ⚠ GENERATED questions are excluded, and cannot be otherwise: a generator
//    mints a fresh id per call (genId), so there is no fixed number of them
//    and no durable identity to record progress against. This is the same
//    reason PracticeJourney leaves them out of coverage; the screen says so
//    rather than pretending the subject is smaller.
//
//  ⚠ BY DIFFICULTY, because a parent can cap it (DB.restrictions.maxDifficulty)
//    and a capped child's reachable total is smaller than the pack's. The
//    certificate is always scored against the WHOLE subject — a cap must not
//    quietly hand out an easier mastery — but "More info" has to be able to
//    say how many questions the cap is holding back, and it cannot say that
//    from a single total.
//
//  Run: node scripts/build-subject-counts.js
//  Verified by scripts/check.js, which fails if the table has drifted from the
//  question files on disk.
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const sandbox = require('../netlify/lib/questions-sandbox.js');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(ROOT, 'subjects', '_counts.js');

// Mirrors _POOL_TYPES_EXCLUDED / isPoolQuestion() in engine/questions_engine.js.
// ⚠ Duplicated on purpose and for the same reason every other browser/Lambda
//   pair in this repo is: there is no shared module. If that set changes, this
//   changes with it, and scripts/test-certificates.js compares the two.
const POOL_TYPES_EXCLUDED = new Set(['cloze', 'task', 'errorhunt']);
const isPool = q => !!q && !!q.question && !POOL_TYPES_EXCLUDED.has(q.type);

// PracticeJourney reads `(q.difficulty || 1) <= cap`, so an absent difficulty
// is level 1 there and must be level 1 here. Anything outside 1-4 is reported
// rather than silently folded into a neighbour.
function bucketOf(q, odd) {
  const d = q.difficulty || 1;
  if (d >= 1 && d <= 4 && Number.isInteger(d)) return d;
  odd.push(`${q.id} (difficulty ${JSON.stringify(q.difficulty)})`);
  return 4;
}

function build() {
  const odd = [];
  const packs = {};
  let totalQ = 0, totalCh = 0;

  for (const packId of sandbox.listPacks()) {
    const pack = sandbox.loadPack(packId);
    const chapters = {};
    let dup = new Set();
    for (const q of pack.practice) {
      if (!isPool(q)) continue;
      if (!q.chapterId) continue;
      // A duplicate id is one question to a child (the progress table is keyed
      // on it), so it must be one question here too.
      if (dup.has(q.id)) continue;
      dup.add(q.id);
      const row = chapters[q.chapterId] || (chapters[q.chapterId] = [0, 0, 0, 0]);
      row[bucketOf(q, odd) - 1]++;
      totalQ++;
    }
    const ids = Object.keys(chapters).sort();
    if (!ids.length) continue;
    totalCh += ids.length;
    const ordered = {};
    for (const id of ids) ordered[id] = chapters[id];
    packs[packId] = ordered;
  }

  return { packs, totalQ, totalCh, odd };
}

// ⚠ Guarded. scripts/test-certificates.js requires this file to compare its
//   copy of isPoolQuestion() against the engine's; without the guard, running
//   the test would silently REGENERATE subjects/_counts.js, which is precisely
//   what the drift check in scripts/check.js exists to detect.
function main() {
  const { packs, totalQ, totalCh, odd } = build();

  // One line per pack keeps the generated file greppable and its diffs readable
  // when a single chapter's count moves.
  const body = Object.keys(packs).sort().map(pid =>
    `  ${JSON.stringify(pid)}: ${JSON.stringify(packs[pid])},`).join('\n');

  const header = `'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  GENERATED FILE — DO NOT EDIT BY HAND.
//  Source: subjects/*/questions/*.js
//  Regenerate: node scripts/build-subject-counts.js
//
//  packId -> chapterId -> [level1, level2, level3, level4] question counts.
//  Practisable questions only: isPoolQuestion() applied, past papers and
//  generated questions excluded, NCE tasks counted through their projected
//  items. This is the DENOMINATOR of a subject certificate — see
//  engine/certificates.js.
//
//  ⚠ Injected ON DEMAND by CertificateStore, never from a <script> tag in
//    index.html. Adding it to the eager load would put this table into the
//    first paint of every child, including the ones who never open the
//    certificates screen.
// ══════════════════════════════════════════════════════════════════════════

const SUBJECT_QUESTION_COUNTS = {
`;

  const footer = `};

if (typeof window !== 'undefined') window.SUBJECT_QUESTION_COUNTS = SUBJECT_QUESTION_COUNTS;
if (typeof module !== 'undefined' && module.exports) module.exports = SUBJECT_QUESTION_COUNTS;
`;

  fs.writeFileSync(OUT, header + body + '\n' + footer, 'utf8');

  const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`subjects/_counts.js — ${Object.keys(packs).length} packs, ${totalCh} chapters, ${totalQ} practisable questions, ${kb} KB`);
  if (odd.length) {
    console.log(`⚠ ${odd.length} question(s) with a difficulty outside 1-4, counted as level 4:`);
    for (const o of odd.slice(0, 12)) console.log(`    ${o}`);
    if (odd.length > 12) console.log(`    … and ${odd.length - 12} more`);
  }
}

if (require.main === module) main();

module.exports = { build, main, isPool, POOL_TYPES_EXCLUDED };
