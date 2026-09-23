'use strict';
// The UI half of assigning a paper: the Assign sheet, the child's card, and the
// calendar's due layer. No browser — these are the pure decisions pulled out of
// the three files, run directly.
//
// ⚠ WHAT THIS EXISTS TO CATCH, all of them real mistakes made while writing it:
//   · _esc() does not exist in app.js (it is _attr) — a template that calls it
//     throws at RENDER time, long after node --check has passed.
//   · a card button styled with Tailwind classes gets no rules at all: the Play
//     CDN only generates for classes present at its initial scan, and every
//     library card is injected by innerHTML afterwards.
//   · "due" merged into the calendar's _activity array would make three
//     consumers count unstarted work as done.
//   · a date walked with local getDate()/setDate() lands on the wrong day for a
//     device outside Mauritius.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const pass = (m) => console.log('  ✓ ' + m);
const fail = (m, d) => { failures++; console.log('  ✗ ' + m + (d !== undefined ? ' — ' + String(d).slice(0, 300) : '')); };
const check = (ok, m, d) => ok ? pass(m) : fail(m, d);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const lib = read('engine/library.js');
const app = read('engine/app.js');
const cal = read('engine/calendar.js');
const html = read('index.html');
const css = read('style.css');
const store = read('engine/store.js');

function fnBody(src, header) {
  const start = src.indexOf(header);
  if (start < 0) throw new Error('not found: ' + header);
  let i = src.indexOf('(', start), parens = 0;
  for (; i < src.length; i++) {
    if (src[i] === '(') parens++;
    else if (src[i] === ')' && --parens === 0) break;
  }
  let depth = 0;
  for (let j = src.indexOf('{', i); j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(start, j + 1);
  }
  throw new Error('unbalanced: ' + header);
}

console.log('Assigning a paper — the screens\n');

// ══ 1. Every function the markup calls actually exists and is exported ══════
console.log('The sheet is wired to something real');
{
  const handlers = [...html.matchAll(/Library\.(\w+)\(/g)].map(m => m[1]);
  const exported = (lib.match(/return \{[\s\S]*?\};\s*\}\)\(\);?\s*$/) || [''])[0];
  const missing = [...new Set(handlers)].filter(fn =>
    !new RegExp('(^|[\\s,{])' + fn + '\\s*(,|:|\\})').test(exported));
  check(missing.length === 0,
    'every Library.x() the HTML calls is on the exported object', missing.join(', '));

  // ⚠ An onclick in index.html referencing a function that was renamed inside
  //   the module fails silently — the button just does nothing.
  for (const fn of ['assign', 'closeAssign', 'confirmAssign', 'setAssignWhen', 'canAssign']) {
    check(new RegExp('function ' + fn + '\\b').test(lib) || new RegExp('\\b' + fn + '\\s*[,=]').test(lib),
      `Library.${fn} is defined`);
  }
  for (const id of ['modal-library-assign', 'lb-as-who', 'lb-as-when', 'lb-as-date',
                    'lb-as-date-row', 'lb-as-note', 'lb-as-status', 'lb-as-title', 'lb-as-send']) {
    check(html.includes(`id="${id}"`), `#${id} exists in index.html`);
  }
}

// ══ 2. The child's card calls helpers that EXIST ════════════════════════════
console.log('\nThe child\'s card');
{
  // ⚠ THE ONE THAT ALREADY BIT: app.js has _attr(), not _esc(). node --check
  //   passes on a call to an undefined function; the child sees a blank banner.
  check(!/_esc\(/.test(app),
    '⚠ app.js calls _attr(), never _esc() — _esc does not exist there');
  check(/function _attr\(/.test(app), 'app.js really does define _attr()');

  const body = fnBody(app, 'async function _renderStudentAssignments(studentId) {');
  check(/library_document_id/.test(body), 'the card branches on library_document_id');
  check(/Library\.hrefFor/.test(body),
    'it builds the PDF link through Library.hrefFor, not a fourth private copy');
  check(/Open the paper/.test(body), 'a paper offers a button that opens it');
  check(/sortAssignments/.test(body), 'the list is ordered soonest-first');
  check(/assignmentDueState/.test(body), 'the due chip uses the shared definition of "overdue"');
  // A paper that was taken down must not render a button to nowhere.
  check(/gone/.test(body) && /no longer available/.test(body),
    'a withdrawn paper says so instead of offering a dead button');

  const dueLabel = fnBody(app, 'function _dueDayLabel(iso) {');
  check(/timeZone: 'UTC'/.test(dueLabel) && /T00:00:00Z/.test(dueLabel),
    '⚠ the due date is read in UTC — a local Date() shifts the day west of Greenwich');
}

// ══ 3. Card buttons are real CSS, not Tailwind ══════════════════════════════
console.log('\nStyling that will actually apply');
{
  // ⚠ The Play CDN scans the initial document. .lb-assign is injected by
  //   innerHTML long afterwards, so a Tailwind class on it styles nothing.
  check(/\.lb-assign\{/.test(css), '.lb-assign has a real rule in style.css');
  check(/\.lb-when\{/.test(css), '.lb-when has a real rule in style.css');
  check(/html\.dark \.lb-when/.test(css),
    'the when-chips carry both palettes — they sit in a white sheet, not on the board');
  const card = fnBody(lib, '  function _card(doc, label) {');
  check(/class="lb-assign"/.test(card), 'the card uses the custom class, not Tailwind utilities');
  check(!/class="[^"]*\b(bg-|text-|px-|py-)/.test(card),
    'no Tailwind utility classes on the injected card', (card.match(/class="[^"]*"/g) || []).join(' '));
}

// ══ 4. One place builds a document URL ══════════════════════════════════════
console.log('\nOne definition of where a document lives');
{
  // ⚠ static → /library/<filename>; contributed → /api/library-file?id=…, which
  //   re-checks the document is still published. A copy that forgets serves an
  //   unpublished file or 404s a seeded one.
  const copies = (lib.match(/'\/api\/library-file\?id='/g) || []).length
               + (app.match(/'\/api\/library-file\?id='/g) || []).length;
  check(copies === 1, 'exactly one place turns a document into a URL', 'found ' + copies);
  check(/hrefFor: _hrefFor/.test(lib), 'and it is exported so the other screens can use it');
}

// ══ 5. The calendar keeps "happened" and "due" apart ════════════════════════
console.log('\nThe calendar');
{
  check(/let _due = \[\]/.test(cal), 'due work has its own array');
  check(/ACT_META = \{[\s\S]*?due:/.test(cal), 'ACT_META knows the due kind, so no lookup throws');
  check(/_filters = \{[^}]*due: true/.test(cal), 'and it is a layer a parent can switch off');

  // ⚠ These three read _activity on the promise that it means "what happened".
  //   If _due were merged in, each would count unstarted work as done.
  for (const fn of ['function _renderTodayActivity() {',
                    'async function getRecentActivity(studentId, days = 14) {',
                    'function doneTodayChapterIds() {']) {
    const body = fnBody(cal, fn);
    check(!/_due/.test(body),
      `${fn.match(/function (\w+)/)[1]}() still reads only what actually happened`);
  }
  const forDate = fnBody(cal, '  function _activityFor(dateStr) {');
  check(/_due/.test(forDate), 'but the day panel and the grid see both');

  const load = fnBody(cal, '  async function _loadDue() {');
  check(/if \(!a\.due_date\) continue/.test(load),
    'an undated assignment lands on no square — not on the day it was created');
  check(/completed/.test(load) === false,
    'completed work is already excluded upstream by Store.loadAssignments');

  // Hollow dot for work not yet done.
  check(/done: a\.kind !== 'due'/.test(cal),
    '⚠ a due dot is hollow — solid would read as "finished" on the month grid');
}

// ══ 6. Dates are Mauritius days, walked in UTC ══════════════════════════════
console.log('\nDays');
{
  const ctx = { _muDayKey: () => '2026-12-31' };
  vm.createContext(ctx);
  vm.runInContext(fnBody(lib, '  function _muToday() {').trim(), ctx);
  vm.runInContext(fnBody(lib, '  function _dayPlus(n) {').trim(), ctx);
  check(ctx._dayPlus(1) === '2027-01-01', 'tomorrow crosses a year end correctly', ctx._dayPlus(1));
  check(ctx._dayPlus(0) === '2026-12-31', 'zero days is today');

  const ctx2 = { _muDayKey: () => '2026-02-28' };
  vm.createContext(ctx2);
  vm.runInContext(fnBody(lib, '  function _muToday() {').trim(), ctx2);
  vm.runInContext(fnBody(lib, '  function _dayPlus(n) {').trim(), ctx2);
  check(ctx2._dayPlus(1) === '2026-03-01', 'and a non-leap February end', ctx2._dayPlus(1));

  const plus = fnBody(lib, '  function _dayPlus(n) {');
  check(/setUTCDate/.test(plus) && !/setDate\(/.test(plus),
    '⚠ the day is walked in UTC, never with local setDate()');

  // The fallback when app.js has not defined _muDayKey yet.
  const ctx3 = {};
  vm.createContext(ctx3);
  vm.runInContext(fnBody(lib, '  function _muToday() {').trim(), ctx3);
  const expect = new Date(Date.now() + 4 * 3600 * 1000).toISOString().slice(0, 10);
  check(ctx3._muToday() === expect, '⚠ the fallback is Mauritius time (UTC+4), not UTC');
}

// ══ 7. What the sheet refuses ═══════════════════════════════════════════════
console.log('\nWhat the sheet refuses to get wrong');
{
  const confirm = fnBody(lib, '  async function confirmAssign() {');
  check(/Tick at least one child or class/.test(confirm),
    'assigning to nobody is refused');
  check(/_assignWhen === 'pick' && !due/.test(confirm),
    '⚠ "Pick a day" with no date does NOT silently become "any time"');
  check(/Only \$\{res\.assigned\} of/.test(confirm),
    '⚠ a partial failure names how many children actually got it');
  check(/slice\(0, 120\)/.test(confirm),
    'the class-event title is clamped to the 120-char CHECK constraint');
  check(/slice\(0, 500\)/.test(confirm),
    'and notes to 500');
  check(/is on the class page, but the date could not be saved/.test(confirm),
    'a saved material with a failed date says exactly that, rather than claiming total failure');

  const open = fnBody(lib, '  async function assign(id) {');
  check(/_assignWhen = 'tomorrow'/.test(open),
    '⚠ the default day is TOMORROW — work set for today is overdue the moment it exists');
  check(/kids\.length === 1 && !classes\.length/.test(open),
    'one child and no classes is ticked automatically');

  // The store refuses the combination the database refuses.
  check(/chapterId && libraryDocumentId/.test(store),
    'a chapter AND a paper on one row is refused in the Store, before the database sees it');
}

// ══ 8. The shell version moved ══════════════════════════════════════════════
console.log('\nShipping');
{
  const sw = read('sw.js');
  const v = (sw.match(/SHELL_VERSION = 'shell-v(\d+)'/) || [])[1];
  check(Number(v) >= 381, 'SHELL_VERSION was bumped for the changed engine files', 'v' + v);
  for (const f of ['/engine/library.js', '/engine/calendar.js', '/engine/store.js', '/engine/app.js']) {
    check(sw.includes(`'${f}'`), `${f} is precached, so the bump reaches it`);
  }
}

console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
process.exit(failures ? 1 : 0);
