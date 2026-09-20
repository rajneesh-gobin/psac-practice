'use strict';
// Every live subject must have its own colours, icon and tagline - on the
// practice hub AND on the subject-select cards.
//
// ⚠ WHY THIS EXISTS. Reported from the app 2026-09-19: on Grades 1-3 the
//   Health Education and SSEE books were grey spines with a 📚 on them, beside
//   coloured Maths / English / French. Both maps in engine/app.js are keyed by
//   the subject NAME and only ever held the five core PSAC subjects, so the six
//   subjects added since (Health Education, SSEE, ICT, Social & Modern Studies,
//   Biology, Chemistry, Physics) all fell through to a grey default. Nothing
//   noticed, because a fallback renders perfectly - it just says nothing.
//
// ⚠ THE SUBJECT LIST IS DERIVED from subjects/_index.js, never written here.
//   Hard-coding it would move the staleness out of app.js and into this file,
//   which is the whole defect again.
//
// A comingSoon pack is REVIEWED, not failed: it has no content yet and its
// subject name can still change before it goes live.
//
// Run: node scripts/test-subject-book-art.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : '')); }
};

// ── what actually ships ─────────────────────────────────────────────────────
const packs = [];
for (const ln of fs.readFileSync(path.join(ROOT, 'subjects/_index.js'), 'utf8').split(/\r?\n/)) {
  if (!ln.startsWith('registerSubject(')) continue;
  try { packs.push(JSON.parse(ln.slice('registerSubject('.length, ln.lastIndexOf('});') + 1))); } catch (_) {}
}
ok('read the generated pack index', packs.length > 0);

const subjectsOf = (list) => {
  const out = new Map();
  for (const p of list) {
    const s = p.subject || p.name || '';
    if (s && !out.has(s)) out.set(s, []);
    if (s) out.get(s).push(p.grade);
  }
  return out;
};
const liveSubjects = subjectsOf(packs.filter((p) => !p.comingSoon));
const soonSubjects = subjectsOf(packs.filter((p) => p.comingSoon));
ok('found live subjects', liveSubjects.size >= 5, [...liveSubjects.keys()].join(', '));

// ── the maps ────────────────────────────────────────────────────────────────
const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
const keysOf = (name) => {
  const at = app.indexOf('const ' + name + ' = {');
  if (at < 0) return null;
  // The maps are closed by a `};` at the start of a line or two spaces in.
  const close = [app.indexOf('\n};', at), app.indexOf('\n  };', at)].filter((i) => i > 0).sort((a, b) => a - b)[0];
  const block = app.slice(at, close > 0 ? close : at + 4000);
  return new Set([...block.matchAll(/'([^']+)'\s*:/g)].map((m) => m[1]));
};

const MAPS = [
  // map name            how a subject name becomes its key
  ['BOOK_COLORS',          (s) => s.toLowerCase()],
  ['BOOK_ICONS',           (s) => s.toLowerCase()],
  ['BOOK_TAGLINES',        (s) => s.toLowerCase()],
  ['_SUBJECT_THEME',       (s) => s],
  ['_SUBJECT_BORDER_COLOR',(s) => s],
];

for (const [name, key] of MAPS) {
  const keys = keysOf(name);
  ok(name + ' found in engine/app.js', !!keys);
  if (!keys) continue;
  for (const [subj, grades] of liveSubjects) {
    ok(name + ' has a row for "' + subj + '"', keys.has(key(subj)),
       'live in grade' + (grades.length > 1 ? 's ' : ' ') + grades.join(', ')
       + ' - without it the child gets the grey fallback');
  }
  for (const [subj] of soonSubjects) {
    if (!keys.has(key(subj))) console.log('  REVIEW  ' + name + ' has no row for "' + subj + '" (comingSoon)');
  }
}

// ⚠ The hub falls back to the pack's own declared icon before 📚, so a subject
//   added tomorrow is never an anonymous stack of books.
ok('the book icon falls back to the pack icon, not 📚',
   /BOOK_ICONS\[k\]\s*\|\|\s*\(pack && pack\.icon\)\s*\|\|\s*'📚'/.test(app));
ok('_renderBooks passes the pack to _bookIcon', /_bookIcon\(subj,\s*pack\)/.test(app));

console.log((fails ? 'FAILED  ' : 'PASSED  ') + (checks - fails) + '/' + checks + ' checks');
process.exit(fails ? 1 : 0);
