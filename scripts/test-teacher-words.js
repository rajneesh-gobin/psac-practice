'use strict';
// Stage 5: the teacher's words.
//
//   node scripts/test-teacher-words.js
//
// ⚠ A COPY PASS DRIFTS BACK unless something holds it. The app already said
//   "My classes" in the tab strip while saying "Create your first classroom"
//   directly underneath — nobody chose that, it accumulated. This test reads
//   only what a teacher can actually SEE and fails on the vocabulary that was
//   deliberately retired.
//
// ⚠⚠ IT MUST NOT READ IDENTIFIERS. "classroom" appears hundreds of times as
//    classroom_id, p_classroom, tc-classroom-detail, the classrooms table and
//    element ids. Flagging those would make this test noise, and a noisy test
//    gets deleted. Everything below is extracted from visible text, visible
//    attributes, and the arguments of the functions that show a message.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const ok = (m) => console.log('  ✓ ' + m);
const bad = (m, d) => { failures++; console.log('  ✗ ' + m + (d !== undefined ? '\n      ' + d : '')); };
const check = (cond, m, d) => cond ? ok(m) : bad(m, d);

// ── What a teacher can see ────────────────────────────────────────────────
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').split('\n');
const from = html.findIndex(l => l.includes('id="screen-teacher"'));
const to = html.findIndex(l => l.includes('id="screen-assignment"'));
const teacherHtml = html.slice(from, to).join('\n');

// ⚠ Text between tags, plus the three attributes a person reads. NOT ids,
//   classes, onclick bodies or data-*.
const visibleHtml = []
  .concat([...teacherHtml.matchAll(/>([^<>{}`]{4,120})</g)].map(m => m[1]))
  .concat([...teacherHtml.matchAll(/(?:placeholder|title|aria-label)="([^"]{4,120})"/g)].map(m => m[1]))
  .map(s => s.replace(/&amp;/g, '&').trim())
  .filter(Boolean);

// ⚠ Only the ARGUMENTS of the functions that put words on screen.
const MODULES = ['teacher.js', 'teacher_home.js', 'teacher_workspace.js',
                 'teacher_guest_classes.js', 'teacher_classroom_detail.js'];
const visibleJs = [];
for (const f of MODULES) {
  const s = fs.readFileSync(path.join(ROOT, 'engine', f), 'utf8');
  for (const m of s.matchAll(/(?:toast|notice|say|message|confirm)\(\s*[`'"]([^`'"\n]{8,160})[`'"]/g)) {
    visibleJs.push({ f, t: m[1] });
  }
}

console.log("The teacher's words\n");

// ── 1. class, not classroom ───────────────────────────────────────────────
// ⚠ The strip said "My classes" while the button under it said "Create your
//   first classroom". Two words for one thing, on one screen.
console.log('One word for a class');
{
  const offenders = visibleHtml.filter(t => /\bclassrooms?\b/i.test(t));
  check(offenders.length === 0, 'no teacher screen says "classroom"',
    offenders.map(o => '"' + o + '"').join('\n      '));

  const jsOff = visibleJs.filter(x => /\bclassrooms?\b/i.test(x.t));
  check(jsOff.length === 0, 'and neither does any message it shows',
    jsOff.map(o => o.f + ': "' + o.t + '"').join('\n      '));

  // The positive: the word it DOES use.
  check(visibleHtml.some(t => /My classes/.test(t)), '…the word is "class"');
}

// ── 2. work, not assignment ───────────────────────────────────────────────
console.log('\nOne word for what you set');
{
  // ⚠ "Assignment" survives in two places on purpose and they are NOT teacher
  //   screens: the pupil's own completion screen (#asgn-complete-title) and
  //   the guest assignment flow. This slice is the teacher board only.
  const offenders = visibleHtml.filter(t => /\bassignments?\b/i.test(t));
  check(offenders.length === 0, 'the teacher board does not say "assignment"',
    offenders.map(o => '"' + o + '"').join('\n      '));
  const jsOff = visibleJs.filter(x => /\bassignments?\b/i.test(x.t));
  check(jsOff.length === 0, 'and neither do its messages',
    jsOff.map(o => o.f + ': "' + o.t + '"').join('\n      '));
}

// ── 3. no developer words ─────────────────────────────────────────────────
console.log('\nNothing borrowed from the codebase');
{
  // ⚠ Each of these was really on screen. "legacy" is what a developer calls
  //   the old option; a teacher needs to know which one to pick.
  const JARGON = [
    [/\blegacy\b/i, 'legacy'],
    [/\bgradebook\b/i, 'gradebook'],
    [/\bstandalone\b/i, 'standalone'],
    [/\broster\b/i, 'roster'],
    [/\bmetadata\b/i, 'metadata'],
    [/\bcache\b/i, 'cache'],
  ];
  for (const [re, word] of JARGON) {
    const hits = visibleHtml.filter(t => re.test(t)).concat(visibleJs.filter(x => re.test(x.t)).map(x => x.t));
    check(hits.length === 0, `no screen says "${word}"`, hits.map(h => '"' + h + '"').join('\n      '));
  }
}

// ── 4. the counters name the places they open ─────────────────────────────
// ⚠ The four numbers above the class nav are also its four doors. A counter
//   labelled "resources" opening a section called "Files" reads as a fifth
//   place that does not exist.
console.log('\nThe counters and the sections agree');
{
  const stats = [...teacherHtml.matchAll(/tc-cd-stat-(\w+)">-<\/strong><span>([^<]+)</g)]
    .map(m => ({ id: m[1], label: m[2] }));
  check(stats.length === 4, 'there are four counters', JSON.stringify(stats));
  const navLabels = [...teacherHtml.matchAll(/data-sec="(\w+)"[^>]*>[^<]*<span>([^<]+)</g)]
    .map(m => ({ sec: m[1], label: m[2].toLowerCase() }));
  const words = navLabels.map(n => n.label);
  check(words.includes('files'), 'the nav says "Files"', JSON.stringify(words));
  check(stats.some(s => /files/i.test(s.label)), '…and so does the counter that opens it',
    JSON.stringify(stats.map(s => s.label)));
  check(!stats.some(s => /resource/i.test(s.label)), 'nothing still says "resources"',
    JSON.stringify(stats.map(s => s.label)));
}

// ── 5. nothing points at a door that is gone ──────────────────────────────
console.log('\nNothing points somewhere that no longer exists');
{
  const all = visibleHtml.concat(visibleJs.map(x => x.t));
  // ⚠ These two outlived the things they named for weeks.
  check(!all.some(t => /Classrooms tab/i.test(t)), 'nothing sends you to a "Classrooms tab"');
  check(!all.some(t => /More menu/i.test(t)), 'nothing sends you to a "More menu"');
  // The Library absorbed My files; no copy should still call it a tab.
  check(!all.some(t => /My files tab/i.test(t)), 'nothing calls My files a tab');
}

console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
process.exit(failures ? 1 : 0);
