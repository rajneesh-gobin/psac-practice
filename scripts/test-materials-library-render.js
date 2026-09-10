'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The class library page, actually RUN.
//
//  scripts/test-materials-library.js reads the source with regexes, which
//  cannot tell working code from code that throws on the first material. This
//  runs materials.js against a hand-built stub document and five deliberately
//  awkward materials: one with no date, one with a <script> in its title and
//  one whose URL is javascript:. Those last two are the checks that matter -
//  every title, description and subject on this page is teacher-typed.
//
//  ⚠ NOT a browser. It proves the three views build and escape correctly, not
//    that they look right; layout is a headless job (see
//    docs/claude/deploy-and-verification.md).
//
//  Run: node scripts/test-materials-library-render.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'materials.html'), 'utf8');
const js   = fs.readFileSync(path.join(ROOT, 'materials.js'), 'utf8');

// ── Minimal DOM ──────────────────────────────────────────────────────────
function mkEl(id) {
  const el = {
    id, _html: '', textContent: '', value: '', _cls: new Set(),
    get innerHTML() { return this._html; },
    set innerHTML(v) { this._html = String(v); },
    classList: {
      add: c => el._cls.add(c), remove: c => el._cls.delete(c),
      toggle: (c, on) => { if (on === undefined) { el._cls.has(c) ? el._cls.delete(c) : el._cls.add(c); } else if (on) el._cls.add(c); else el._cls.delete(c); },
      contains: c => el._cls.has(c),
    },
    setAttribute() {}, getAttribute() { return null; }, focus() {}, hidden: false, disabled: false,
    addEventListener() {}, querySelectorAll: () => [],
    parentNode: { classList: { add() {}, remove() {}, toggle() {} } },
  };
  return el;
}
const els = {};
const ids = ['hero', 'cls-name', 'cls-sub', 'cls-chips', 'controls', 'q', 'sorts', 'out', 'foot',
  'gate', 'gate-title', 'gate-help', 'gate-err', 'g-name', 'g-name-label', 'g-pin', 'g-pin-label', 'g-go'];
ids.forEach(i => { els[i] = mkEl(i); });

const buttons = [];
['list', 'subject', 'calendar'].forEach(v => {
  const b = mkEl('view-' + v);
  b.getAttribute = k => (k === 'data-view' ? v : null);
  buttons.push(b);
});
['recent', 'oldest', 'title'].forEach(v => {
  const b = mkEl('sort-' + v);
  b.getAttribute = k => (k === 'data-sort' ? v : null);
  buttons.push(b);
});

global.document = {
  getElementById: id => els[id] || null,
  querySelectorAll: sel => {
    if (sel === '.view-btn')  return buttons.filter(b => b.id.startsWith('view-'));
    if (sel === '.sort-btn')  return buttons.filter(b => b.id.startsWith('sort-'));
    return [];
  },
  title: '',
};
global.location = { pathname: '/m/ACDEFGHJKM', search: '', origin: 'https://x.test' };
global.URLSearchParams = URLSearchParams;
global.URL = URL;
global.localStorage = { getItem: () => null, setItem: () => {} };

// ── Stub API ─────────────────────────────────────────────────────────────
const now = Date.now();
const day = 86400000;
const MATERIALS = [
  { id: '1', title: 'Fractions worksheet', subject: 'maths', description: 'Pages 1-3',
    source_type: 'file', file_name: 'fractions.pdf', file_size: 240000,
    shared_at: new Date(now - 0 * day).toISOString(), url: 'https://s.test/a.pdf?token=1' },
  { id: '2', title: 'Long division video', subject: 'maths',
    source_type: 'link', shared_at: new Date(now - 1 * day).toISOString(),
    url: 'https://www.youtube.com/watch?v=abcdefghijk' },
  { id: '3', title: 'Comprehension passage', subject: 'english',
    source_type: 'file', file_name: 'passage.pdf', file_size: 90000,
    shared_at: new Date(now - 40 * day).toISOString(), url: 'https://s.test/b.pdf?token=2' },
  { id: '4', title: 'Untitled handout', subject: null,
    source_type: 'file', file_name: 'x.png', file_size: 1200,
    shared_at: null, created_at: null, url: null },
  { id: '5', title: '<script>alert(1)</script>', subject: 'french',
    source_type: 'file', file_name: 'y.pdf', file_size: 5000,
    shared_at: new Date(now - 1 * day).toISOString(), url: 'javascript:alert(1)' },
];

// ⚠ Two calls now, because the PIN is the gate. `info: true` must answer with
// the gate description ONLY; the PIN call answers with everything behind it.
// The stub refuses a wrong PIN so the harness can prove the gate is real.
const ASSIGNMENTS = [
  { code: 'ABC123', title: 'Fractions homework', question_count: 10,
    due_at: new Date(Date.now() + 2 * 86400000).toISOString(), done: false },
  { code: 'DEF456', title: 'Timed test: money', question_count: 15, duration_mins: 30,
    due_at: new Date(Date.now() - 86400000).toISOString(), done: false },
  { code: 'GHI789', title: 'Spelling list 3', question_count: 8,
    due_at: new Date(Date.now() + 5 * 86400000).toISOString(), done: true },
];

let lastCall = null;
global.fetch = async (_url, opts) => {
  const body = JSON.parse(opts.body);
  lastCall = body;
  if (body.info) {
    return { ok: true, json: async () => ({
      ok: true, access_mode: 'shared_pin', classroom: { name: 'Grade 5 Blue', grade: 5 } }) };
  }
  if (body.pin !== '4321') {
    return { ok: true, json: async () => ({ ok: false, error: 'bad_pin', attemptsLeft: 3 }) };
  }
  return { ok: true, json: async () => ({
    ok: true, name: body.name, classroom: { name: 'Grade 5 Blue', grade: 5 },
    materials: MATERIALS, assignments: ASSIGNMENTS }) };
};

// ── Run ──────────────────────────────────────────────────────────────────
let fail = 0;
const ck = (label, ok, extra) => {
  console.log((ok ? '  ok   ' : '  FAIL ') + label + (ok || !extra ? '' : '  [' + extra + ']'));
  if (!ok) fail++;
};

(async () => {
  // materials.js is an IIFE with no exports, so reach its internals by running
  // it with a captured scope rather than requiring it.
  let api;
  const wrapped = js.replace('load();', 'api = { S, render, applyView, renderCalendar, filtered, cardHTML, enter, renderWork };\nload();');
  // eslint-disable-next-line no-new-func
  const run = new Function('setApi', wrapped.replace('api = {', 'setApi({').replace('};\nload();', '});\nload();'));
  run(a => { api = a; });

  await new Promise(r => setTimeout(r, 30));

  const S = api.S;

  // ── The gate ──
  ck('the code was parsed from /m/<CODE>', S.code === 'ACDEFGHJKM', S.code);
  ck('the gate is shown, not the hub', !els.gate._cls.has('hidden'));
  // ⚠⚠ THE POINT OF THE GATE. Nothing behind it may be fetched until it passes.
  ck('nothing behind the gate has been fetched yet',
    S.materials.length === 0 && S.assignments.length === 0);
  ck('the info call asked for the gate only', lastCall && lastCall.info === true);
  ck('a shared-PIN class asks for a name', !els['g-name'].hidden);
  ck('the class name is shown before sign-in', els['cls-name'].textContent === 'Grade 5 Blue');

  // ── A wrong PIN ──
  els['g-name'].value = 'Sam';
  els['g-pin'].value  = '0000';
  await api.enter();
  ck('a wrong PIN is refused', /Wrong PIN/.test(els['gate-err'].textContent), els['gate-err'].textContent);
  ck('…and nothing behind the gate arrived', S.materials.length === 0);
  ck('…and the gate is still up', !els.gate._cls.has('hidden'));

  // ── The right PIN ──
  els['g-pin'].value = '4321';
  await api.enter();
  ck('the right PIN opens the hub', els.gate._cls.has('hidden'));
  ck('all five materials loaded', S.materials.length === 5, String(S.materials.length));
  ck('the three assignments loaded', S.assignments.length === 3, String(S.assignments.length));
  ck('the chips greet the pupil and count what is LEFT',
    /Sam/.test(els['cls-chips'].innerHTML) && /2 to do/.test(els['cls-chips'].innerHTML),
    els['cls-chips'].innerHTML);
  ck('the controls are revealed', !els.controls._cls.has('hidden'));

  // ── Homework ──
  S.view = 'work'; api.applyView(); api.render();
  const work = els.out.innerHTML;
  ck('homework view lists every assignment', (work.match(/<a class="hw/g) || []).length === 3);
  ck('to do comes before finished', work.indexOf('To do') < work.indexOf('Finished'));
  ck('each card links to the guest runner', /href="\/a\/ABC123"/.test(work));
  ck('an overdue one says so', /Was due/.test(work));
  ck('a finished one is marked done', /✓ Done/.test(work));
  // ⚠ A mark belongs on the teacher's screen until they have looked at it.
  ck('NO score is shown anywhere', !/%|score|mark/i.test(work.replace(/class="[^"]*"/g, '')));
  ck('sorting is hidden over homework', els.sorts._cls.has('hidden'));

  // ── List ──
  S.view = 'list'; S.sort = 'recent'; api.applyView(); api.render();
  const list = els.out.innerHTML;
  ck('list view renders a card per material', (list.match(/class="card"/g) || []).length === 5);
  ck('newest first puts today at the top',
    list.indexOf('Fractions worksheet') < list.indexOf('Comprehension passage'));
  ck('a YouTube link gets the watch label', /Watch ↗/.test(list));
  // ⚠ The two things that would be a real defect.
  ck('a script tag in a title is escaped',
    /&lt;script&gt;/.test(list) && !/<script>alert/.test(list));
  ck('a javascript: URL never becomes an href',
    !/href="javascript:/.test(list));
  ck('…and that material says it is unavailable instead of offering a dead tap',
    (list.match(/class="dead"/g) || []).length === 2);

  // ── Sort ──
  S.sort = 'oldest'; api.render();
  ck('oldest first reverses the order',
    els.out.innerHTML.indexOf('Comprehension passage') < els.out.innerHTML.indexOf('Fractions worksheet'));
  S.sort = 'title'; api.render();
  ck('name sort is alphabetical',
    els.out.innerHTML.indexOf('Comprehension passage') < els.out.innerHTML.indexOf('Fractions worksheet'));

  // ── Subject ──
  S.view = 'subject'; S.sort = 'recent'; api.applyView(); api.render();
  const subj = els.out.innerHTML;
  ck('subject view groups', (subj.match(/class="group"/g) || []).length === 4, String((subj.match(/class="group"/g) || []).length));
  ck('…and "no subject" sorts LAST, never first',
    subj.indexOf('Everything else') > subj.indexOf('maths'));

  // ── Calendar ──
  S.view = 'calendar'; api.applyView(); api.render();
  const cal = els.out.innerHTML;
  ck('calendar renders a month grid', /class="cal-grid"/.test(cal));
  ck('the sort row is hidden in calendar view', els.sorts._cls.has('hidden'));
  ck('days holding something are tappable', /class="cal-cell has/.test(cal));
  ck('a material with no date is listed rather than dropped', /No date recorded/.test(cal));
  ck('the day panel shows what was shared that day', /class="cal-day"/.test(cal));

  // ── Search ──
  S.view = 'list'; api.applyView(); S.q = 'comprehension'; api.render();
  ck('search narrows the list', (els.out.innerHTML.match(/class="card"/g) || []).length === 1);
  S.q = 'zzzz'; api.render();
  ck('no match says so rather than showing an empty page', /Nothing matches/.test(els.out.innerHTML));

  console.log('\n' + (fail ? 'FAILED: ' + fail + ' failed' : 'PASSED: all render checks passed'));
  process.exitCode = fail ? 1 : 0;
})();
