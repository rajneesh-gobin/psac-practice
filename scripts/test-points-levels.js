'use strict';
// The level curve exists TWICE. This checks the two copies still agree.
//
// Run: node scripts/test-points-levels.js
//
// WHY THIS EXISTS
// points_level() in SQL decides the level stored in student_points and shown on
// the leaderboard. POINTS_THRESHOLDS in engine/app.js decides the level in the
// header chip and the width of the progress bar. They are the same rule written
// in two languages, in two files, that nothing else connects — the exact shape
// CLAUDE.md lists under "code that is duplicated on purpose", and every entry on
// that list got there by drifting first.
//
// The failure is quiet and nasty: a child's own header says Level 6 and the
// leaderboard beside their name says Level 5. Nothing errors, nothing logs, and
// the child is simply told two different things about themselves.
//
// ⚠ Reads the SQL as TEXT, on purpose. Running it would need a database, and
//   the question here is whether the two source files agree — which must be
//   answerable in CI, offline, before anything is deployed.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'engine', 'app.js');
const SQL = path.join(ROOT, 'migrations', '20260909_points_and_leaderboard.sql');

let failures = 0;
const fail = (m) => { console.error('  ✗ ' + m); failures++; };
const pass = (m) => console.log('  ✓ ' + m);

// ── the JS copy ────────────────────────────────────────────────────────────
const app = fs.readFileSync(APP, 'utf8');

const thrM = app.match(/const POINTS_THRESHOLDS\s*=\s*\[([^\]]+)\]/);
if (!thrM) { console.error('POINTS_THRESHOLDS not found in engine/app.js'); process.exit(2); }
const jsThresholds = thrM[1].split(',').map(s => Number(s.trim()));

const namesM = app.match(/const LEVEL_NAMES\s*=\s*\[([^\]]+)\]/);
if (!namesM) { console.error('LEVEL_NAMES not found in engine/app.js'); process.exit(2); }
const jsNames = namesM[1].split(',').map(s => s.trim().replace(/^'|'$/g, ''));

// ── the SQL copy ───────────────────────────────────────────────────────────
if (!fs.existsSync(SQL)) { console.error('migration not found: ' + SQL); process.exit(2); }
const sql = fs.readFileSync(SQL, 'utf8');

const fnM = sql.match(/CREATE OR REPLACE FUNCTION public\.points_level[\s\S]*?\$function\$([\s\S]*?)\$function\$/);
if (!fnM) { console.error('points_level() not found in the migration'); process.exit(2); }

// WHEN p_points >= <n> THEN <level>
const rungs = [...fnM[1].matchAll(/WHEN\s+p_points\s*>=\s*(\d+)\s+THEN\s+(\d+)/g)]
  .map(m => ({ points: Number(m[1]), level: Number(m[2]) }));

if (!rungs.length) { console.error('no WHEN rungs parsed out of points_level()'); process.exit(2); }

// SQL is written highest-first; the thresholds array is lowest-first and its
// index IS the level - 1, with level 1 implicit at 0.
const sqlThresholds = [0, ...rungs.slice().sort((a, b) => a.points - b.points).map(r => r.points)];

console.log('Level curve parity — engine/app.js vs points_level()\n');

// ── 1. same number of levels ───────────────────────────────────────────────
if (jsThresholds.length !== sqlThresholds.length) {
  fail(`level count differs: JS has ${jsThresholds.length}, SQL has ${sqlThresholds.length}`);
} else {
  pass(`both define ${jsThresholds.length} levels`);
}

// ── 2. same boundaries ─────────────────────────────────────────────────────
const n = Math.min(jsThresholds.length, sqlThresholds.length);
let same = true;
for (let i = 0; i < n; i++) {
  if (jsThresholds[i] !== sqlThresholds[i]) {
    fail(`level ${i + 1} starts at ${jsThresholds[i]} in JS but ${sqlThresholds[i]} in SQL`);
    same = false;
  }
}
if (same) pass('every level boundary matches');

// ── 3. the SQL rungs name the levels the array position implies ────────────
for (const r of rungs) {
  const idx = sqlThresholds.indexOf(r.points);
  if (idx < 0) continue;
  if (r.level !== idx + 1) {
    fail(`SQL returns level ${r.level} at ${r.points}, but that is boundary #${idx + 1}`);
  }
}

// ── 4. a name per level ────────────────────────────────────────────────────
if (jsNames.length !== jsThresholds.length) {
  fail(`LEVEL_NAMES has ${jsNames.length} entries for ${jsThresholds.length} levels`
     + ' — the top level would render with a blank name');
} else {
  pass(`${jsNames.length} level names for ${jsThresholds.length} levels`);
}

// ── 5. strictly increasing ─────────────────────────────────────────────────
// A flat or descending step makes getLevel() return the wrong level for an
// entire band, and the progress bar divide by zero.
for (let i = 1; i < jsThresholds.length; i++) {
  if (!(jsThresholds[i] > jsThresholds[i - 1])) {
    fail(`thresholds are not strictly increasing at level ${i + 1}: `
       + `${jsThresholds[i - 1]} → ${jsThresholds[i]}`);
  }
}

// ── 6. the two implementations agree on every boundary value ───────────────
// Off-by-one at a boundary is the whole failure mode: "301 or more is Level 2"
// against "more than 301 is Level 2" differs for exactly one child at a time,
// which is how it survives review.
function jsLevel(points) {
  for (let i = jsThresholds.length - 1; i >= 0; i--) if (points >= jsThresholds[i]) return i + 1;
  return 1;
}
function sqlLevel(points) {
  for (const r of rungs) if (points >= r.points) return r.level;  // highest-first, as written
  return 1;
}
let boundaryOk = true;
for (const t of sqlThresholds) {
  for (const p of [t - 1, t, t + 1]) {
    if (p < 0) continue;
    if (jsLevel(p) !== sqlLevel(p)) {
      fail(`at ${p} points: JS says level ${jsLevel(p)}, SQL says level ${sqlLevel(p)}`);
      boundaryOk = false;
    }
  }
}
if (boundaryOk) pass('both agree on every boundary, and either side of it');

// ── 7. the curve is reachable ──────────────────────────────────────────────
// Measured: the difficulty mix averages ~2.4 points a question and one grade
// holds roughly 4,000 questions, so ~9,600 points is a full grade answered once.
// A top level far beyond that is a level no child ever sees.
const top = jsThresholds[jsThresholds.length - 1];
if (top > 20000) {
  fail(`top level starts at ${top} — a full grade is worth about 9,600 points, `
     + 'so this is unreachable. Re-measure before raising it.');
} else {
  pass(`top level at ${top} points is reachable (a full grade ≈ 9,600)`);
}

console.log('');
if (failures) {
  console.error(`FAILED — ${failures} problem${failures === 1 ? '' : 's'}.`);
  console.error('The level curve is defined in engine/app.js AND in points_level() in');
  console.error('migrations/20260909_points_and_leaderboard.sql. Change both together.');
  process.exit(1);
}
console.log('PASSED — the level curve agrees in both places.');
