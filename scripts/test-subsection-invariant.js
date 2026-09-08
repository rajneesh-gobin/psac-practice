'use strict';
// Do the declared subsection ids and the tagged subsection ids match, per chapter?
//
// WHY THIS EXISTS
// CLAUDE.md has called this an invariant for a long time, and it was broken in
// five chapters at once (measured 2026-09-08, all pre-existing):
//
//   grade6-maths  / g6-time-speed       22 items tagged `word_probs`, undeclared
//   grade4-french / g4fr-lecture         4 items across three undeclared tags
//   grade6-french / g6fr-lecture         3 items across three undeclared tags
//   grade6-science/ g6-animals           1 item tagged `diagrams`, undeclared
//   grade5-history/ g5enr-personalities  `independence` declared with 0 items
//
// Neither half is cosmetic. A tagged id with no declaration HIDES those
// questions from the per-subsection Practise screen — 22 elapsed-time word
// problems a child could not reach. A declared id with no questions opens an
// empty screen. `audit-content-coverage.js` already counted undeclared tags,
// but it prints a total rather than naming them and never fails, which is
// exactly how five of them survived.
//
// ⚠ Run `node netlify/build-questions.js` first. This reads the BUILT bundles,
//   because a subsection dropped at build time would still look right in the
//   source — the standing hazard in this repo.
//
// ⚠ The engine files declare their globals with const/let, so helpers.js,
//   questions_engine.js and the manifest must run as ONE script; separate
//   vm.runInContext() calls do not share lexical bindings.
//
//   node scripts/test-subsection-invariant.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUNDLES = path.join(ROOT, 'netlify', 'question-bundles');

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };

// ⚠ LIVE PACKS COME FROM THE GENERATED INDEX, NOT FROM A HARD-CODED GRADE
//   LIST AND NOT FROM MANIFEST SOURCE TEXT. A [4, 5, 6] list silently skipped
//   grade9-maths the day it went live - this suite reported all-green while
//   ignoring the pack that had just been enabled. And grepping the manifests
//   for /comingSoon:\s*false/ matches the comment every placeholder pack
//   carries ("5. Set comingSoon: false."), which reports all 30 of them live.
//   `subjects/_index.js` is generated, holds real JSON values, and check.js
//   already fails if it drifts from the manifests.
const LIVE = (function () {
  const idx = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  const out = [];
  const re = /"id":"(grade\d-[a-z-]+)"([\s\S]{0,400}?)"comingSoon":(true|false)/g;
  let m;
  while ((m = re.exec(idx))) if (m[3] === 'false') out.push(m[1]);
  return out.sort();
})();

function readPack(pack) {
  const bundleFile = path.join(BUNDLES, pack + '.json');
  if (!fs.existsSync(bundleFile)) return null;

  const src = ['engine/helpers.js', 'engine/questions_engine.js', `subjects/${pack}/_manifest.js`]
    .map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');

  const ctx = {
    console: { log() {}, warn() {}, error() {} }, Math, JSON, Date,
    __PACK: pack, __OUT: null,
    PSAC_PDF_QUESTIONS: [], SUBJECT_PACKS: {}, DB: { restrictions: {} },
    registerSubject(p) { ctx.SUBJECT_PACKS[p.id] = p; },
    registerHelp() {},
  };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext('var CHAPTERS = [];\n' + src + `
;
__OUT = {
  syllabus: SUBJECT_PACKS[__PACK].syllabus || {},
  chapters: SUBJECT_PACKS[__PACK].chapters.map(c => c.id),
};
`, ctx, { filename: pack });

  const tagged = {};
  for (const q of JSON.parse(fs.readFileSync(bundleFile, 'utf8'))) {
    if (!q.subsection) continue;
    (tagged[q.chapterId] = tagged[q.chapterId] || new Set()).add(q.subsection);
  }
  return { ...ctx.__OUT, tagged };
}

console.log('\nDeclared and tagged subsection ids match, per chapter');
for (const pack of LIVE) {
  const p = readPack(pack);
  if (!p) { bad(`${pack}: no built bundle — run node netlify/build-questions.js first`); continue; }

  const problems = [];
  for (const ch of p.chapters) {
    const declared = new Set((((p.syllabus[ch] || {}).subsections) || []).map(s => s.id));
    const tagged = p.tagged[ch] || new Set();
    if (!declared.size && !tagged.size) continue;

    // A chapter with tags but no declaration block at all hides every one of them.
    if (!declared.size) {
      problems.push(`${ch}: ${tagged.size} subsection(s) tagged with no declaration block, all hidden — ${[...tagged].join(', ')}`);
      continue;
    }
    const empty = [...declared].filter(id => !tagged.has(id));
    const undeclared = [...tagged].filter(id => !declared.has(id));
    if (undeclared.length) problems.push(`${ch}: tagged but NOT declared (hidden from Practise) — ${undeclared.join(', ')}`);
    if (empty.length) problems.push(`${ch}: declared but EMPTY (opens blank) — ${empty.join(', ')}`);
  }

  if (problems.length) for (const m of problems) bad(`${pack} / ${m}`);
  else ok(`${pack}: ${p.chapters.length} chapters, every declared id has questions and every tag is declared`);
}

// ── Packs still being written ───────────────────────────────────────────────
// ⚠ REPORTED, NEVER FAILED. A comingSoon pack has empty declared subsections by
//   definition — that is what the flag is for — so failing here would make the
//   test useless during exactly the phase it is most needed.
//
//   But the OTHER half of the invariant is already meaningful: an id tagged on
//   real questions with no declaration behind it will hide those questions the
//   instant the pack goes live, and the author has no way to notice. Measured
//   2026-09-08 while grade9-ict was being written a chapter every ~45 seconds:
//   the manifest declared `formulae_basics`/`cell_references` from the syllabus
//   doc while the author was tagging `formulas`/`cells_ranges` from the actual
//   papers — 16 questions already mismatched, and nothing said so.
//
// ⚠ Where both exist, THE AUTHOR'S TAG WINS. It is attached to real questions
//   and is usually derived from what the papers ask; a declared id is only ever
//   a plan. Rename the declaration, not the questions.
const HIDDEN = (function () {
  const idx = fs.readFileSync(path.join(ROOT, 'subjects', '_index.js'), 'utf8');
  const out = [];
  const re = /"id":"(grade\d-[a-z-]+)"([\s\S]{0,400}?)"comingSoon":(true|false)/g;
  let m;
  while ((m = re.exec(idx))) if (m[3] === 'true') out.push(m[1]);
  return out.sort();
})();

const notes = [];
for (const pack of HIDDEN) {
  const p = readPack(pack);
  if (!p) continue;
  for (const ch of p.chapters) {
    const declared = new Set((((p.syllabus[ch] || {}).subsections) || []).map(s => s.id));
    const tagged = p.tagged[ch] || new Set();
    if (!tagged.size) continue;
    const undeclared = [...tagged].filter(id => !declared.has(id));
    if (undeclared.length) {
      notes.push(`${pack} / ${ch}: tagged but NOT declared — ${undeclared.join(', ')}`);
    }
  }
}
if (notes.length) {
  console.log('\n  ⚠ still comingSoon, so not a failure — but these tags are already');
  console.log('    orphaned and would be hidden the moment the pack goes live:');
  for (const n of notes) console.log('      ' + n);
} else if (HIDDEN.length) {
  console.log(`\n  ✓ ${HIDDEN.length} comingSoon packs: no orphaned tags`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
