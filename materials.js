'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Class page — /m/<CODE>  ·  homework + materials, behind the pupil's PIN
//
//  Standalone: no engine/*.js, no supabase-js, no Tailwind. Talks only to
//  /api/materials-library.
//
//  ⚠ This page loads NO engine file by design, so the material helpers here
//    (kind, icon, host, the sort comparator) are a deliberate THIRD copy of
//    the pair already in engine/helpers.js and guest.js. Change all three
//    together — that is the same rule the guest page carries, for the same
//    reason.
//
//  ⚠ THE PIN IS THE GATE, NOT THE CODE. The code in the URL says WHICH class;
//    the pupil proves they belong to it with the same PIN they already use for
//    homework — their own in a per-pupil classroom, the shared class PIN plus a
//    name in a shared one. Nothing behind the gate is fetched until it passes.
//
//  ⚠ NO "Mark as done" here, deliberately. That control needs the PIN token a
//    child gets by opening an assignment (/api/material-done checks it). This
//    page has no token and never asks for one, so drawing the button would be
//    drawing a control that fails on tap. Ticking off work stays on the
//    homework page where the identity is real.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const $ = id => document.getElementById(id);

const S = {
  code: '',
  classroom: null,
  materials: [],
  assignments: [],
  access: null,     // 'pupil_pin' | 'shared_pin'
  name: '',
  view: 'work',
  sort: 'recent',
  q: '',
  // Calendar: the month on screen, and the day the reader has tapped.
  month: null,      // Date pinned to the 1st
  selDay: null,     // 'YYYY-MM-DD'
};

const VIEW_STORE = 'psac_lib_view';
const SORT_STORE = 'psac_lib_sort';
const VIEWS = ['work', 'list', 'subject', 'calendar'];
const SORTS = ['recent', 'oldest', 'title'];
// ⚠ Keyed on the class code: one tablet used for two classes must not offer the
//   wrong child's name. The PIN is NEVER stored — it is the credential.
const NAME_STORE = code => 'psac_lib_name_' + code;

function readStore(key, allowed, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v && allowed.indexOf(v) !== -1) return v;
  } catch (_) { }
  return fallback;
}
function writeStore(key, v) { try { localStorage.setItem(key, v); } catch (_) { } }

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── The code: /m/ABCDEFGHJK, or ?code=… ───────────────────────────────────
(function readCode() {
  const m = location.pathname.match(/\/m\/([A-Za-z0-9]{10})/);
  S.code = (m ? m[1] : new URLSearchParams(location.search).get('code') || '')
    .trim().toUpperCase();
})();

// ── Material helpers (third copy — see the header) ─────────────────────────
const YT_RE = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

function isLink(m) { return m && m.source_type === 'link'; }
function isYouTube(m) { return isLink(m) && YT_RE.test(String(m.url || '')); }
function icon(m) {
  if (isLink(m)) {
    if (isYouTube(m)) return '▶️';
    return /\.pdf(\?|#|$)/i.test(String(m.url || '')) ? '📄' : '🔗';
  }
  const n = String(m.file_name || '').toLowerCase();
  if (n.endsWith('.pdf')) return '📄';
  if (/\.(doc|docx|odt|txt|rtf)$/.test(n)) return '📝';
  if (/\.(xls|xlsx|csv|ods)$/.test(n)) return '📊';
  if (/\.(ppt|pptx|odp)$/.test(n)) return '📽️';
  if (/\.(mp3|m4a|wav|ogg)$/.test(n)) return '🎧';
  if (/\.(mp4|mov|webm|mkv)$/.test(n)) return '🎬';
  return '🖼️';
}
function host(m) {
  if (!isLink(m)) return '';
  try { return new URL(m.url).hostname.replace(/^www\./, ''); } catch (_) { return ''; }
}
function fmtSize(bytes) {
  const n = Number(bytes || 0);
  if (!n) return '';
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return Math.round(n / 1024) + ' KB';
  return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

// shared_at is when the teacher gave this to THIS class; created_at is only the
// fallback for a row from before the junction table carried a date.
function when(m) { return Date.parse((m && (m.shared_at || m.created_at)) || '') || 0; }
function titleCmp(a, b) {
  return String(a.title || '').localeCompare(String(b.title || ''), undefined, { sensitivity: 'base' });
}
function sortMats(list, key) {
  const rows = (list || []).slice();
  if (key === 'title')  return rows.sort(titleCmp);
  if (key === 'oldest') return rows.sort((a, b) => (when(a) || Infinity) - (when(b) || Infinity) || titleCmp(a, b));
  return rows.sort((a, b) => when(b) - when(a) || titleCmp(a, b));
}
function dateText(m) {
  const t = when(m);
  if (!t) return '';
  const d = new Date(t);
  const o = { day: 'numeric', month: 'short' };
  if (d.getFullYear() !== new Date().getFullYear()) o.year = 'numeric';
  return d.toLocaleDateString('en-GB', o);
}
// ⚠ Local device day, matching the calendar squares in the main app. This grid
//   answers "which day did I see this appear", which is a question about the
//   reader's own calendar, not about a Mauritius server day.
function dayKey(t) {
  const d = new Date(t);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
       + '-' + String(d.getDate()).padStart(2, '0');
}

// ── Talking to the hub ────────────────────────────────────────────────────
async function api(payload) {
  const res = await fetch('/api/materials-library', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ code: S.code }, payload)),
  });
  // The function answers 200 + {ok:false} for expected outcomes; anything else
  // is a fault worth a different message.
  if (!res.ok) throw new Error('http_' + res.status);
  return res.json();
}

// ── Step 1: which gate? ───────────────────────────────────────────────────
// ⚠ info:true carries NOTHING from behind the gate — just the class name and
//   which of the two forms to draw. It is asked before any PIN exists.
async function load() {
  if (!S.code) return fail('Link not complete', 'Ask your teacher to send the class link again.');

  let r;
  try { r = await api({ info: true }); }
  catch (_) {
    return fail('No connection',
      'Check your internet and refresh this page. Nothing has been lost — this link keeps working.');
  }

  if (!r || r.ok !== true) {
    if (r && r.error === 'not_ready') {
      return fail('Not ready yet', 'This class page has not been switched on yet. Ask your teacher.');
    }
    return fail('Class not found',
      'This link is not working any more. Your teacher may have replaced it — ask them for the new one.');
  }

  S.access = r.access_mode || 'pupil_pin';
  S.classroom = r.classroom || null;
  const cls = (S.classroom && S.classroom.name) || 'Your class';
  $('cls-name').textContent = cls;
  document.title = cls + ' · Class Page';
  $('cls-sub').textContent = 'Your homework and everything your teacher has shared.';
  $('foot').textContent = 'Save this link — it does not expire, and new work appears here.';

  const chips = [];
  if (S.classroom && S.classroom.grade) chips.push('Grade ' + S.classroom.grade);
  $('cls-chips').innerHTML = chips.map(c => '<span class="chip">' + esc(c) + '</span>').join('');

  showGate();
}

function showGate() {
  $('out').innerHTML = '';
  $('gate').classList.remove('hidden');

  // ⚠ In a per-pupil classroom the PIN IS the identity — asking for a name as
  //   well would invite a child to type someone else's. In a shared classroom
  //   one PIN is common to everyone, so the name is what separates them.
  const needsName = S.access === 'shared_pin';
  $('g-name-label').hidden = !needsName;
  $('g-name').hidden = !needsName;
  $('gate-help').textContent = needsName
    ? 'Type the class PIN your teacher gave you, then your name.'
    : 'Type your own four-digit PIN. Your teacher gave it to you.';

  if (needsName) {
    const saved = readName();
    if (saved) $('g-name').value = saved;
  }

  $('g-pin').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
  });
  [$('g-name'), $('g-pin')].forEach(el => el && el.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); enter(); }
  }));
  $('g-go').addEventListener('click', enter);
  (needsName && !$('g-name').value ? $('g-name') : $('g-pin')).focus();
}

function readName() {
  try { return localStorage.getItem(NAME_STORE(S.code)) || ''; } catch (_) { return ''; }
}
function saveName(v) {
  try { localStorage.setItem(NAME_STORE(S.code), String(v).slice(0, 40)); } catch (_) { }
}
function gateErr(msg) { $('gate-err').textContent = msg || ''; }

// ── Step 2: through the gate ──────────────────────────────────────────────
async function enter() {
  const name = ($('g-name').value || '').trim();
  const pin  = ($('g-pin').value  || '').trim();
  const needsName = S.access === 'shared_pin';

  if (needsName && !name) { gateErr('Please enter your name.'); $('g-name').focus(); return; }
  if (!/^\d{4}$/.test(pin)) { gateErr('The PIN is 4 digits.'); $('g-pin').focus(); return; }

  gateErr('');
  const btn = $('g-go');
  btn.disabled = true;
  btn.textContent = 'Checking…';

  let r;
  try { r = await api({ name, pin }); }
  catch (_) {
    btn.disabled = false; btn.textContent = 'See my class →';
    gateErr('No connection. Check your internet and try again.');
    return;
  }

  btn.disabled = false;
  btn.textContent = 'See my class →';

  if (!r || r.ok !== true) {
    if (r && r.error === 'bad_pin') {
      gateErr(typeof r.attemptsLeft === 'number' && r.attemptsLeft <= 5
        ? 'Wrong PIN. ' + r.attemptsLeft + ' tr' + (r.attemptsLeft === 1 ? 'y' : 'ies') + ' left.'
        : 'Wrong PIN. Check it with your teacher.');
      $('g-pin').value = ''; $('g-pin').focus();
      return;
    }
    if (r && r.error === 'locked') {
      gateErr('Too many wrong PINs. Please wait a few minutes and try again.');
      return;
    }
    gateErr((r && r.message) || 'Could not open this class page.');
    return;
  }

  // ⚠ The NAME is remembered, the PIN never is. One is a label, the other is
  //   the credential, and this runs on tablets children share.
  if (needsName && name) saveName(name);

  S.name        = r.name || name;
  S.materials   = Array.isArray(r.materials)   ? r.materials   : [];
  S.assignments = Array.isArray(r.assignments) ? r.assignments : [];
  S.classroom   = r.classroom || S.classroom;
  S.view = readStore(VIEW_STORE, VIEWS, 'work');
  S.sort = readStore(SORT_STORE, SORTS, 'recent');

  $('gate').classList.add('hidden');
  showHub();
}

function showHub() {
  const cls = (S.classroom && S.classroom.name) || 'Your class';
  $('cls-name').textContent = cls;

  const todo = S.assignments.filter(a => !a.done).length;
  const chips = [];
  if (S.name) chips.push('👋 ' + S.name);
  if (S.classroom && S.classroom.grade) chips.push('Grade ' + S.classroom.grade);
  // ⚠ Count what is LEFT, not what exists. "3 homework" over two already done
  //   is the number a child acts on.
  chips.push(todo === 0 ? '✓ Homework done' : todo === 1 ? '1 to do' : todo + ' to do');
  chips.push(S.materials.length === 1 ? '1 file' : S.materials.length + ' files');
  $('cls-chips').innerHTML = chips.map(c => '<span class="chip">' + esc(c) + '</span>').join('');

  if (!S.materials.length && !S.assignments.length) {
    $('out').innerHTML = '<div class="state"><div class="big">📭</div>'
      + '<h2>Nothing here yet</h2>'
      + '<p>Your teacher has not set any homework or shared any files with this class yet. '
      + 'Check back — this same link will show it.</p></div>';
    return;
  }

  $('controls').classList.remove('hidden');
  wireControls();
  applyView();
  render();
}

function fail(title, msg) {
  $('cls-name').textContent = title;
  $('cls-sub').textContent = '';
  $('cls-chips').innerHTML = '';
  $('controls').classList.add('hidden');
  $('out').innerHTML = '<div class="state"><div class="big">🔍</div><h2>' + esc(title) + '</h2>'
    + '<p>' + esc(msg) + '</p></div>';
  $('foot').textContent = '';
}

// ── Controls ──────────────────────────────────────────────────────────────
function wireControls() {
  document.querySelectorAll('.view-btn').forEach(b => {
    b.addEventListener('click', () => {
      S.view = b.getAttribute('data-view') || 'list';
      writeStore(VIEW_STORE, S.view);
      applyView();
      render();
    });
  });
  document.querySelectorAll('.sort-btn').forEach(b => {
    b.addEventListener('click', () => {
      S.sort = b.getAttribute('data-sort') || 'recent';
      writeStore(SORT_STORE, S.sort);
      applyView();
      render();
    });
  });
  // A search box on a list this size wants no debounce — it is filtering an
  // array already in memory, not asking the server anything.
  $('q').addEventListener('input', e => { S.q = e.target.value.trim().toLowerCase(); render(); });
}

function applyView() {
  document.querySelectorAll('.view-btn').forEach(b => {
    const on = b.getAttribute('data-view') === S.view;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  document.querySelectorAll('.sort-btn').forEach(b => {
    b.classList.toggle('on', b.getAttribute('data-sort') === S.sort);
  });
  // ⚠ Sorting a calendar is meaningless — the grid IS the order — so the sort
  //   row is hidden there rather than left on screen doing nothing.
  // ⚠ Sorting a calendar is meaningless — the grid IS the order — and the
  //   homework list is ordered by what is due next, which is the only order a
  //   child wants it in. Hidden in both rather than left on screen doing
  //   nothing.
  $('sorts').classList.toggle('hidden', S.view === 'calendar' || S.view === 'work');
  // The search box filters FILES. Leaving it over the homework list would
  // invite a child to type into a box that does not answer.
  $('q').parentNode.classList.toggle('hidden', S.view === 'work');
}

function filtered() {
  if (!S.q) return S.materials.slice();
  return S.materials.filter(m =>
    [m.title, m.subject, m.description, m.file_name, host(m)]
      .filter(Boolean).join(' ').toLowerCase().indexOf(S.q) !== -1);
}

// ── Cards ─────────────────────────────────────────────────────────────────
function cardHTML(m) {
  const link = isLink(m);
  // ⚠ http/https only. This is the last hop before an href reaches the DOM;
  //   the teacher form and the database CHECK are the other two.
  const safe = /^https?:\/\//i.test(String(m.url || '')) ? m.url : '';
  const tags = [];
  if (m.subject) tags.push('<span class="tag subj">' + esc(m.subject) + '</span>');
  if (link) { const h = host(m); if (h) tags.push('<span class="tag">' + esc(h) + '</span>'); }
  else { const sz = fmtSize(m.file_size); if (sz) tags.push('<span class="tag">' + esc(sz) + '</span>'); }
  const d = dateText(m);
  if (d) tags.push('<span class="tag">📅 ' + esc(d) + '</span>');

  const btn = safe
    ? '<a class="open" href="' + esc(safe) + '" target="_blank" rel="noopener noreferrer">'
      + (link ? (isYouTube(m) ? 'Watch ↗' : 'Open link ↗') : 'Open ↗') + '</a>'
    // ⚠ Never a dead button. A material whose file could not be signed says so
    //   in the teacher's terms rather than offering a tap that does nothing.
    : '<div class="dead">⚠ This one is not available right now — tell your teacher.</div>';

  return '<article class="card">'
    + '<div class="card-ico" aria-hidden="true">' + icon(m) + '</div>'
    + '<div>'
    + '<div class="card-title">' + esc(m.title) + '</div>'
    + (m.description ? '<div class="card-sub">' + esc(m.description) + '</div>' : '')
    + (tags.length ? '<div class="card-meta">' + tags.join('') + '</div>' : '')
    + btn
    + '</div></article>';
}

function noMatch() {
  return '<div class="state"><div class="big">🔍</div><h2>Nothing matches</h2>'
       + '<p>No material here matches “' + esc(S.q) + '”. Try a shorter word.</p></div>';
}

// ── Render ────────────────────────────────────────────────────────────────
function render() {
  const out = $('out');
  if (S.view === 'work') return renderWork(out);
  const rows = filtered();
  if (!rows.length) { out.innerHTML = noMatch(); return; }
  if (S.view === 'subject')  return renderSubject(rows, out);
  if (S.view === 'calendar') return renderCalendar(rows, out);
  out.innerHTML = sortMats(rows, S.sort).map(cardHTML).join('');
}

// ── Homework ──────────────────────────────────────────────────────────────
// ⚠ Every card is a link to /a/<CODE>, the SAME guest runner the WhatsApp link
//   opens. This page starts nothing and grades nothing — it is a way in, so a
//   child who lost the message can still find their work.
// ⚠ NO SCORE is shown, deliberately. The server does not send one: a mark
//   belongs on the teacher's screen until they have looked at it, and children
//   comparing marks on a shared tablet is what this must not enable.
function dueText(a) {
  const t = Date.parse(a.due_at || a.expires_at || '') || 0;
  if (!t) return { text: '', cls: '' };
  const d = new Date(t);
  const days = Math.floor((d.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
  const when = new Date(t).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  if (days < 0)  return { text: 'Was due ' + when, cls: 'late' };
  if (days === 0) return { text: 'Due today', cls: 'late' };
  if (days === 1) return { text: 'Due tomorrow', cls: 'due' };
  return { text: 'Due ' + when, cls: days <= 3 ? 'due' : '' };
}

function workHTML(a) {
  const due = dueText(a);
  const tags = [];
  if (a.done) tags.push('<span class="tag done">✓ Done</span>');
  else if (due.text) tags.push('<span class="tag ' + due.cls + '">' + esc(due.text) + '</span>');
  if (a.question_count) tags.push('<span class="tag">' + a.question_count + ' questions</span>');
  if (a.duration_mins)  tags.push('<span class="tag">⏱ ' + a.duration_mins + ' min</span>');
  // ⚠ A done card still shows when it was due — that is how a child checks they
  //   did the right one.
  if (a.done && due.text) tags.push('<span class="tag">' + esc(due.text) + '</span>');

  // ⚠ The code is [A-Z0-9] from the database and encodeURIComponent'd anyway.
  const href = '/a/' + encodeURIComponent(String(a.code || ''));
  return '<a class="hw' + (a.done ? ' done' : '') + '" href="' + esc(href) + '">'
    + '<div class="hw-top">'
    + '<div class="hw-ico" aria-hidden="true">' + (a.done ? '✅' : a.duration_mins ? '⏱️' : '📝') + '</div>'
    + '<div><div class="hw-title">' + esc(a.title || 'Homework') + '</div>'
    + (tags.length ? '<div class="hw-meta">' + tags.join('') + '</div>' : '')
    + '</div></div>'
    + '<span class="hw-go">' + (a.done ? 'Open again' : 'Start →') + '</span>'
    + '</a>';
}

function renderWork(out) {
  if (!S.assignments.length) {
    out.innerHTML = '<div class="state"><div class="big">🎉</div>'
      + '<h2>No homework right now</h2>'
      + '<p>Your teacher has not set anything for this class. '
      + 'Tap <b>Files</b> to see what they have shared.</p></div>';
    return;
  }
  const todo = S.assignments.filter(a => !a.done);
  const done = S.assignments.filter(a => a.done);
  // ⚠ To do FIRST and never mixed in. A child opening this page is answering
  //   one question — what do I still have to do?
  out.innerHTML =
    (todo.length
      ? '<section class="group"><div class="group-head"><h2>To do</h2>'
        + '<span class="n">' + todo.length + '</span></div>'
        + todo.map(workHTML).join('') + '</section>'
      : '<div class="state"><div class="big">🎉</div><h2>All caught up</h2>'
        + '<p>You have done every piece of homework here.</p></div>')
    + (done.length
      ? '<section class="group"><div class="group-head"><h2>Finished</h2>'
        + '<span class="n">' + done.length + '</span></div>'
        + done.map(workHTML).join('') + '</section>'
      : '');
}

function renderSubject(rows, out) {
  const groups = new Map();
  rows.forEach(m => {
    const k = (m.subject && String(m.subject).trim()) || '';
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(m);
  });
  // ⚠ "No subject" sorts LAST, never first — the same rule guest.js applies.
  const keys = Array.from(groups.keys()).sort((a, b) => {
    if (!a) return 1;
    if (!b) return -1;
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });
  out.innerHTML = keys.map(k => {
    const items = sortMats(groups.get(k), S.sort);
    return '<section class="group">'
      + '<div class="group-head"><h2>' + esc(k || 'Everything else') + '</h2>'
      + '<span class="n">' + items.length + (items.length === 1 ? ' item' : ' items') + '</span></div>'
      + items.map(cardHTML).join('')
      + '</section>';
  }).join('');
}

function renderCalendar(rows, out) {
  const byDay = new Map();
  const dated = [];
  rows.forEach(m => {
    const t = when(m);
    // A material with no date cannot go in a square. It is listed underneath
    // rather than dropped — dropping it would make the calendar quietly lie
    // about how much the class has.
    if (!t) { dated.push(m); return; }
    const k = dayKey(t);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push(m);
  });

  const days = Array.from(byDay.keys()).sort();
  if (!S.month) {
    const last = days.length ? days[days.length - 1] : dayKey(Date.now());
    const p = last.split('-');
    S.month = new Date(Number(p[0]), Number(p[1]) - 1, 1);
    S.selDay = days.length ? last : null;
  }
  // A search that empties the current month should not strand the reader on a
  // blank grid: follow the results.
  if (S.selDay && !byDay.has(S.selDay)) S.selDay = days.length ? days[days.length - 1] : null;
  if (S.selDay) {
    const p = S.selDay.split('-');
    const selMonth = new Date(Number(p[0]), Number(p[1]) - 1, 1);
    if (selMonth.getFullYear() !== S.month.getFullYear() || selMonth.getMonth() !== S.month.getMonth()) {
      S.month = selMonth;
    }
  }

  const y = S.month.getFullYear(), mo = S.month.getMonth();
  const first = new Date(y, mo, 1);
  const daysIn = new Date(y, mo + 1, 0).getDate();
  // Monday-first, the way a Mauritian school week is written.
  const pad = (first.getDay() + 6) % 7;
  const todayK = dayKey(Date.now());

  const earliest = days.length ? days[0] : null;
  const latest   = days.length ? days[days.length - 1] : null;
  const canPrev = !!earliest && (y + '-' + String(mo + 1).padStart(2, '0')) > earliest.slice(0, 7);
  const canNext = !!latest   && (y + '-' + String(mo + 1).padStart(2, '0')) < latest.slice(0, 7);

  let cells = '';
  for (let i = 0; i < pad; i++) cells += '<button type="button" class="cal-cell pad" tabindex="-1" aria-hidden="true"></button>';
  for (let d = 1; d <= daysIn; d++) {
    const k = y + '-' + String(mo + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const list = byDay.get(k);
    const cls = ['cal-cell'];
    if (list) cls.push('has');
    if (k === todayK) cls.push('today');
    if (list && k === S.selDay) cls.push('sel');
    cells += '<button type="button" class="' + cls.join(' ') + '" data-day="' + k + '"'
      + (list ? ' aria-label="' + esc(d + ' — ' + list.length + (list.length === 1 ? ' item' : ' items')) + '"' : ' disabled')
      + '>' + d + (list ? '<span class="dot"></span>' : '') + '</button>';
  }

  const monthName = first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const sel = S.selDay ? (byDay.get(S.selDay) || []) : [];
  const selLabel = S.selDay
    ? new Date(S.selDay + 'T00:00:00').toLocaleDateString('en-GB',
        { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  out.innerHTML = '<div class="cal">'
    + '<div class="cal-head">'
    + '<button type="button" class="cal-nav" data-mo="-1"' + (canPrev ? '' : ' disabled') + ' aria-label="Previous month">‹</button>'
    + '<strong>' + esc(monthName) + '</strong>'
    + '<button type="button" class="cal-nav" data-mo="1"' + (canNext ? '' : ' disabled') + ' aria-label="Next month">›</button>'
    + '</div>'
    + '<div class="cal-dow"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>'
    + '<div class="cal-grid">' + cells + '</div>'
    + '<div class="cal-legend">Tap a highlighted day to see what was shared.</div>'
    + '</div>'
    // ⚠ No panel at all when nothing is selected. "Nothing shared on that day"
    //   under a month the reader has only just paged to is an answer to a
    //   question they never asked, and reads as an error.
    + (sel.length
        ? '<div class="cal-day"><h3>' + esc(selLabel) + '</h3>' + sortMats(sel, 'recent').map(cardHTML).join('') + '</div>'
        : '')
    + (dated.length
        ? '<section class="group" style="margin-top:18px"><div class="group-head"><h2>No date recorded</h2>'
          + '<span class="n">' + dated.length + (dated.length === 1 ? ' item' : ' items') + '</span></div>'
          + dated.map(cardHTML).join('') + '</section>'
        : '');

  out.querySelectorAll('.cal-nav').forEach(b => b.addEventListener('click', () => {
    S.month = new Date(y, mo + Number(b.getAttribute('data-mo') || 0), 1);
    // ⚠ Clear the selection, never carry it: a day highlighted in September is
    //   not a day in October, and leaving it set showed October's grid with
    //   September's list underneath it.
    S.selDay = null;
    renderCalendar(filtered(), out);
  }));
  out.querySelectorAll('.cal-cell.has').forEach(b => b.addEventListener('click', () => {
    S.selDay = b.getAttribute('data-day');
    renderCalendar(filtered(), out);
  }));
}

load();

})();
