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
  events: [],       // the teacher's classroom calendar (dates, read-only)
  worksheets: [],   // paper tasks with a deadline (physical_homework), signed per visit
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

// ── Inline YouTube player ───────────────────────────────────────────────
// ⚠ A CLICK-TO-PLAY FACADE, not an iframe on load. A class page with ten
//   videos would otherwise open ten connections to Google before the child
//   has chosen anything - slow on a Mauritian mobile plan, and it hands
//   YouTube a page view for every video nobody watched. The thumbnail is a
//   plain image; the iframe is created on the first tap and not before.
//
// ⚠ youtube-NOCOOKIE. The player is identical, but nothing is stored until
//   play is pressed. `rel=0` keeps the end-screen suggestions to the same
//   channel, which is the closest YouTube allows to "do not send this child
//   somewhere else" - it has not been possible to remove them entirely since
//   2018, which is exactly why the fallback link and the teacher's own choice
//   of video still matter.
//
// ⚠ THE FALLBACK LINK IS NOT OPTIONAL. An uploader can forbid embedding; the
//   iframe then shows "Video unavailable" inside our page with no way out. The
//   "Watch on YouTube ↗" link is always rendered underneath.
function ytId(url) {
  const m = String(url || '').match(YT_RE);
  return m ? m[1] : null;
}

function ytBlock(id, title) {
  // ⚠ The id is matched by YT_RE as exactly 11 chars of [A-Za-z0-9_-], so it
  //   cannot carry a quote or an angle bracket. It is still escaped, because
  //   the next person to widen that regex will not read this comment.
  const vid = esc(id);
  return '<div class="yt" data-yt="' + vid + '">'
    + '<button type="button" class="yt-play" aria-label="Play video: ' + esc(title || 'video') + '">'
    + '<img class="yt-thumb" loading="lazy" alt="" '
    + 'src="https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg">'
    + '<span class="yt-btn" aria-hidden="true">▶</span>'
    + '</button></div>';
}

// One delegated listener for the whole list: the cards are re-rendered on
// every search keystroke and sort change, and per-card handlers would be
// re-bound each time.
function bindYouTube(root) {
  if (!root || root._ytBound) return;
  root._ytBound = true;
  root.addEventListener('click', function (e) {
    const btn = e.target.closest ? e.target.closest('.yt-play') : null;
    if (!btn) return;
    const box = btn.parentElement;
    const id = box && box.getAttribute('data-yt');
    if (!id) return;
    const frame = document.createElement('iframe');
    frame.className = 'yt-frame';
    frame.setAttribute('allow', 'accelerometer; encrypted-media; picture-in-picture');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    frame.setAttribute('title', 'Video');
    // autoplay=1 only because the child has just pressed play — this is a
    // response to a gesture, not an unasked-for noise.
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id)
              + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    box.innerHTML = '';
    box.appendChild(frame);
  });
}

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
  S.events      = Array.isArray(r.events)      ? r.events      : [];
  S.worksheets  = Array.isArray(r.worksheets)  ? r.worksheets  : [];
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
  const nextEv = nextEventChip();
  if (nextEv) chips.push(nextEv);
  $('cls-chips').innerHTML = chips.map(c => '<span class="chip">' + esc(c) + '</span>').join('');

  if (!S.materials.length && !S.assignments.length && !S.events.length && !S.worksheets.length) {
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

  // ⚠ A YouTube link PLAYS HERE now. Sending a nine-year-old to youtube.com
  //   puts the video their teacher chose beside a recommendation rail,
  //   autoplay and Shorts — one tap from something nobody set. The "Watch on
  //   YouTube" link stays underneath, because an uploader can forbid
  //   embedding and the iframe would then be a dead rectangle.
  const yid = (link && safe) ? ytId(safe) : null;
  const btn = safe
    ? (yid ? ytBlock(yid, m.title) : '')
      + '<a class="open" href="' + esc(safe) + '" target="_blank" rel="noopener noreferrer">'
      + (link ? (yid ? 'Watch on YouTube ↗' : 'Open link ↗') : 'Open ↗') + '</a>'
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
  // ⚠ Bound ONCE on the container, not per card: every view re-renders `out`
  //   on each keystroke and sort change, so per-card handlers would be re-bound
  //   dozens of times. bindYouTube() is idempotent and delegates.
  bindYouTube(out);
  if (S.view === 'work') return renderWork(out);
  const rows = filtered();
  // The calendar has two more sources than the file list, so an empty file
  // search must not blank it.
  if (S.view === 'calendar') return renderCalendar(rows, out);
  if (!rows.length) { out.innerHTML = noMatch(); return; }
  if (S.view === 'subject')  return renderSubject(rows, out);
  out.innerHTML = sortMats(rows, S.sort).map(cardHTML).join('');
}

// ── Homework ──────────────────────────────────────────────────────────────
// ⚠ Every card is a link to /a/<CODE>, the SAME guest runner the WhatsApp link
//   opens. This page starts nothing and grades nothing — it is a way in, so a
//   child who lost the message can still find their work.
// ⚠ A MARK IS SHOWN ONLY WHERE IT IS THE CHILD'S OWN. This said "NO SCORE is
//   shown, deliberately" and stopped being true in bfd6e46, which now renders
//   a.pct in workHTML() below — so the file argued against its own code, and
//   the next reader would have believed the comment.
//   The original worry is still the right one and is still answered, just
//   somewhere better: children comparing marks on a shared tablet. The SERVER
//   withholds the mark entirely on a shared-PIN or open-link classroom, where
//   the identity is a typed name anyone in the room can enter, so a.pct is
//   simply absent there and nothing is decided in this file.
//   ⚠ And never red — see workHTML(). A mark is a fact, not a verdict.
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
  // ⚠ THE CHILD'S OWN MARK, and only ever their own. The server withholds it
  //   entirely on a shared-PIN or open-link classroom, where the identity is a
  //   typed name anyone in the room can type — so `a.pct` is simply absent
  //   there and this adds nothing. Nothing to decide client-side.
  // ⚠ NEVER RED. A mark is a fact, not a verdict: this is the child's own
  //   screen, and the app's rule is that it does not hand out punishments
  //   (the same reason the daily goal never breaks a streak). Good marks are
  //   celebrated; everything else is stated plainly and left alone.
  if (a.done && a.pct != null) {
    const strong = Number(a.pct) >= 80;
    const detail = (a.score != null && a.total) ? a.score + ' / ' + a.total + ' · ' : '';
    tags.push('<span class="tag mark' + (strong ? ' mark-good' : '') + '">'
      + (strong ? '⭐ ' : '') + esc(detail) + a.pct + '%</span>');
  }
  else if (due.text) tags.push('<span class="tag ' + due.cls + '">' + esc(due.text) + '</span>');
  if (a.question_count) tags.push('<span class="tag">' + a.question_count + ' questions</span>');
  if (a.duration_mins)  tags.push('<span class="tag">⏱ ' + a.duration_mins + ' min</span>');
  // ⚠ A done card still shows when it was due — that is how a child checks they
  //   did the right one.
  if (a.done && due.text) tags.push('<span class="tag">' + esc(due.text) + '</span>');
  if (a.done && a.submitted_at) {
    const when = dateText({ shared_at: a.submitted_at });
    if (when) tags.push('<span class="tag">✍️ ' + esc(when) + '</span>');
  }

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

function worksheetsHTML() {
  const now = Date.now();
  const live = (S.worksheets || []).slice().sort((a, b) => (Date.parse(a.expires_at) || 0) - (Date.parse(b.expires_at) || 0));
  if (!live.length) return '';
  const current = live.filter(w => (Date.parse(w.expires_at) || 0) >= now - 86400000);
  const past = live.filter(w => (Date.parse(w.expires_at) || 0) < now - 86400000);
  return (current.length
    ? '<section class="group"><div class="group-head"><h2>📄 Worksheets</h2><span class="n">' + current.length + '</span></div>' + current.map(worksheetHTML).join('') + '</section>'
    : '')
    + (past.length
    ? '<section class="group"><div class="group-head"><h2>Past worksheets</h2><span class="n">' + past.length + '</span></div>' + past.map(worksheetHTML).join('') + '</section>'
    : '');
}
function renderWork(out) {
  const up = upcomingHTML(5);
  const sheets = worksheetsHTML();
  if (!S.assignments.length) {
    out.innerHTML = up + sheets + (sheets ? '' : '<div class="state"><div class="big">🎉</div>'
      + '<h2>No homework right now</h2>'
      + '<p>Your teacher has not set anything for this class. '
      + 'Tap <b>Files</b> to see what they have shared.</p></div>');
    wireUpNext(out);
    return;
  }
  const todo = S.assignments.filter(a => !a.done);
  const done = S.assignments.filter(a => a.done);
  // ⚠ To do FIRST and never mixed in. A child opening this page is answering
  //   one question — what do I still have to do?
  out.innerHTML = up +
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
      : '')
    + sheets;
  wireUpNext(out);
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

function wireUpNext(out) {
  if (!out || typeof out.querySelector !== 'function') return;
  const b = out.querySelector('.upnext-more');
  if (!b) return;
  b.addEventListener('click', () => {
    S.view = 'calendar';
    writeStore(VIEW_STORE, S.view);
    applyView();
    render();
  });
}

// ── The class calendar ────────────────────────────────────────────────────
// One grid, three sources: the teacher's own dated items (an exam, a hand-in
// date, days they are away, anything else), the homework due dates, and the
// day each file was shared. Events are DATE strings from the server and are
// used as-is - a date the teacher typed must never shift by a timezone.
const KIND = {
  exam:   { icon: '📝', label: 'Exam' },
  due:    { icon: '📌', label: 'Hand in' },
  absent: { icon: '🚫', label: 'Teacher away' },
  event:  { icon: '📅', label: 'Event' },
  hw:     { icon: '⏰', label: 'Homework due' },
  ws:     { icon: '📄', label: 'Worksheet due' },
  file:   { icon: '📎', label: 'File shared' },
};
// A worksheet card: title, instructions, the file if there is one, and when
// it is due. No "done" - a paper task is handed in, not ticked here.
function worksheetHTML(w) {
  const due = dueText({ due_at: w.expires_at });
  const safe = /^https?:\/\//i.test(String(w.url || '')) ? w.url : '';
  const tags = [];
  if (w.subject) tags.push('<span class="tag subj">' + esc(w.subject) + '</span>');
  if (due.text) tags.push('<span class="tag ' + due.cls + '">' + esc(due.text) + '</span>');
  const sz = fmtSize(w.file_size); if (sz) tags.push('<span class="tag">' + esc(sz) + '</span>');
  return '<article class="card ws">'
    + '<div class="card-ico" aria-hidden="true">📄</div>'
    + '<div>'
    + '<div class="card-title">' + esc(w.title || 'Worksheet') + '</div>'
    + (w.description ? '<div class="card-sub">' + esc(w.description) + '</div>' : '')
    + (tags.length ? '<div class="tags">' + tags.join('') + '</div>' : '')
    + (safe ? '<a class="open" href="' + esc(safe) + '" target="_blank" rel="noopener noreferrer">Open worksheet ↗</a>'
            : w.file_name ? '<div class="dead">⚠ The file is not available right now — tell your teacher.</div>'
            : '<div class="card-sub">On paper — your teacher will hand it out.</div>')
    + '</div></article>';
}
function kindOf(e) { return KIND[e && e.kind] ? e.kind : 'event'; }
// A calendar date is exactly YYYY-MM-DD. Anything else is dropped everywhere
// - the grid, the strip AND the header chip - or a malformed row sorts first
// as a string and the chip reads "Invalid Date".
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const validDay = v => DAY_RE.test(String(v || ''));
function lastDay(e) { return validDay(e.end_date) && e.end_date > e.date ? e.end_date : e.date; }
function addDays(k, n) {
  const p = k.split('-');
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) + n);
  return dayKey(d.getTime());
}
function dayText(k, o) {
  const p = k.split('-');
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])).toLocaleDateString('en-GB', o || { weekday: 'short', day: 'numeric', month: 'short' });
}
function spanText(e) {
  if (!e.end_date || e.end_date === e.date) return dayText(e.date);
  return dayText(e.date, { weekday: 'short', day: 'numeric', month: 'short' }) + ' – ' + dayText(e.end_date, { weekday: 'short', day: 'numeric', month: 'short' });
}
// ⚠⚠ A FOURTH COPY OF "WHERE A LIBRARY DOCUMENT LIVES", AND IT HAS TO BE.
//    This page deliberately loads no engine file, so Library.hrefFor() — the
//    single definition everywhere else — is not reachable here. The rule is the
//    same one and is recorded in CLAUDE.md's duplication table: a SEEDED
//    document is a static asset under /library/, a CONTRIBUTED one is served by
//    a worker that re-checks it is still published. Change both together.
// ⚠ doc_filename / doc_storage arrive from materials_library_open(), whose
//   LEFT JOIN is filtered to status='published' — so an unpublished paper
//   arrives with them null and simply gets no link, rather than a link to a
//   withdrawn file.
function eventPaperHref(e) {
  if (!e || !e.library_document_id) return '';
  if (e.doc_storage === 'static') return e.doc_filename ? '/library/' + e.doc_filename : '';
  return '/api/library-file?id=' + encodeURIComponent(e.library_document_id);
}
function eventHTML(e) {
  const k = kindOf(e);
  const href = eventPaperHref(e);
  return '<div class="ev ev-' + k + '">'
    + '<div class="ev-ico" aria-hidden="true">' + KIND[k].icon + '</div>'
    + '<div><div class="ev-title">' + esc(e.title || KIND[k].label) + '</div>'
    + '<div class="ev-meta">' + esc(KIND[k].label) + ' · ' + esc(spanText(e)) + '</div>'
    + (e.notes ? '<div class="ev-notes">' + esc(e.notes) + '</div>' : '')
    + (href ? '<a class="ev-paper" href="' + esc(href) + '" target="_blank" rel="noopener">📄 Open the paper</a>' : '')
    + '</div></div>';
}
// Every dated thing, keyed by local day. An absence spanning days lands on
// each of them (capped, so a typo of a year does not draw four hundred dots).
function calendarItems(rows) {
  const byDay = new Map();
  const put = (k, item) => { if (!byDay.has(k)) byDay.set(k, []); byDay.get(k).push(item); };
  (S.events || []).forEach(e => {
    if (!e || !validDay(e.date)) return;
    const last = lastDay(e);
    let k = e.date, guard = 0;
    while (k <= last && guard++ < 62) { put(k, { kind: kindOf(e), order: 0, html: eventHTML(e) }); k = addDays(k, 1); }
  });
  (S.assignments || []).forEach(a => {
    const t = Date.parse(a.due_at || a.expires_at || '') || 0;
    if (!t) return;
    put(dayKey(t), { kind: 'hw', order: 1, html: workHTML(a) });
  });
  (S.worksheets || []).forEach(w => {
    const t = Date.parse(w.expires_at || '') || 0;
    if (!t) return;
    put(dayKey(t), { kind: 'ws', order: 1, html: worksheetHTML(w) });
  });
  (rows || []).forEach(m => {
    const t = when(m);
    if (!t) return;
    put(dayKey(t), { kind: 'file', order: 2, html: cardHTML(m) });
  });
  byDay.forEach(list => list.sort((a, b) => a.order - b.order));
  return byDay;
}
// The next few things on the calendar - shown above the homework list, which
// is the screen a child opens first.
function upcomingHTML(limit) {
  const todayK = dayKey(Date.now());
  const items = [];
  (S.events || []).forEach(e => {
    if (!e || !validDay(e.date)) return;
    if (lastDay(e) < todayK) return;
    items.push({ k: e.date < todayK ? todayK : e.date, html: eventHTML(e) });
  });
  (S.assignments || []).forEach(a => {
    if (a.done) return;
    const t = Date.parse(a.due_at || a.expires_at || '') || 0;
    if (!t) return;
    const k = dayKey(t);
    if (k < todayK) return;
    items.push({ k, html: '<div class="ev ev-hw"><div class="ev-ico" aria-hidden="true">⏰</div><div><div class="ev-title">' + esc(a.title || 'Homework') + '</div><div class="ev-meta">Homework due · ' + esc(dayText(k)) + '</div></div></div>' });
  });
  (S.worksheets || []).forEach(w => {
    const t = Date.parse(w.expires_at || '') || 0;
    if (!t) return;
    const k = dayKey(t);
    if (k < todayK) return;
    items.push({ k, html: '<div class="ev ev-ws"><div class="ev-ico" aria-hidden="true">📄</div><div><div class="ev-title">' + esc(w.title || 'Worksheet') + '</div><div class="ev-meta">Worksheet due · ' + esc(dayText(k)) + '</div></div></div>' });
  });
  if (!items.length) return '';
  items.sort((a, b) => a.k.localeCompare(b.k));
  return '<section class="group upnext"><div class="group-head"><h2>📅 Coming up</h2>'
    + '<span class="n">' + items.length + '</span></div>'
    + items.slice(0, limit || 5).map(i => i.html).join('')
    + (items.length > (limit || 5) ? '<button type="button" class="upnext-more" data-view="calendar">See the whole calendar →</button>' : '')
    + '</section>';
}
function nextEventChip() {
  const todayK = dayKey(Date.now());
  const next = (S.events || []).filter(e => e && validDay(e.date) && lastDay(e) >= todayK)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (!next) return '';
  const k = kindOf(next);
  return KIND[k].icon + ' ' + (next.title || KIND[k].label) + ' · ' + dayText(next.date < todayK ? todayK : next.date, { day: 'numeric', month: 'short' });
}

function renderCalendar(rows, out) {
  const byDay = calendarItems(rows);
  // A material with no date cannot go in a square. It is listed underneath
  // rather than dropped — dropping it would make the calendar quietly lie
  // about how much the class has.
  const dated = (rows || []).filter(m => !when(m));

  const todayK = dayKey(Date.now());
  const days = Array.from(byDay.keys()).sort();
  if (!S.month) {
    // Land on THIS month: a class calendar answers "what is coming", so the
    // reader starts from today and pages either way.
    const now = new Date();
    S.month = new Date(now.getFullYear(), now.getMonth(), 1);
    S.selDay = byDay.has(todayK) ? todayK : null;
  }
  // A search that empties the selected day should not strand the reader on a
  // stale panel: drop the selection rather than show another day's list.
  if (S.selDay && !byDay.has(S.selDay)) S.selDay = null;

  const y = S.month.getFullYear(), mo = S.month.getMonth();
  const first = new Date(y, mo, 1);
  const daysIn = new Date(y, mo + 1, 0).getDate();
  // Monday-first, the way a Mauritian school week is written.
  const pad = (first.getDay() + 6) % 7;

  const monthKey = y + '-' + String(mo + 1).padStart(2, '0');
  const earliest = days.length ? (days[0] < todayK ? days[0] : todayK) : todayK;
  const latest   = days.length ? (days[days.length - 1] > todayK ? days[days.length - 1] : todayK) : todayK;
  const canPrev = monthKey > earliest.slice(0, 7);
  const canNext = monthKey < latest.slice(0, 7);

  let cells = '';
  for (let i = 0; i < pad; i++) cells += '<button type="button" class="cal-cell pad" tabindex="-1" aria-hidden="true"></button>';
  for (let d = 1; d <= daysIn; d++) {
    const k = monthKey + '-' + String(d).padStart(2, '0');
    const list = byDay.get(k);
    const cls = ['cal-cell'];
    if (list) cls.push('has');
    if (k === todayK) cls.push('today');
    if (list && k === S.selDay) cls.push('sel');
    const kinds = list ? Array.from(new Set(list.map(i => i.kind))).slice(0, 3) : [];
    cells += '<button type="button" class="' + cls.join(' ') + '" data-day="' + k + '"'
      + (list ? ' aria-label="' + esc(d + ' — ' + list.length + (list.length === 1 ? ' item' : ' items') + ': ' + kinds.map(x => KIND[x].label).join(', ')) + '"' : ' disabled')
      + '>' + d
      + (list ? '<span class="dots">' + kinds.map(x => '<i class="d-' + x + '"></i>').join('') + '</span>' : '')
      + '</button>';
  }

  const monthName = first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const sel = S.selDay ? (byDay.get(S.selDay) || []) : [];
  const selLabel = S.selDay ? dayText(S.selDay, { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  const present = Array.from(new Set(Array.from(byDay.values()).flat().map(i => i.kind)));

  out.innerHTML = '<div class="cal">'
    + '<div class="cal-head">'
    + '<button type="button" class="cal-nav" data-mo="-1"' + (canPrev ? '' : ' disabled') + ' aria-label="Previous month">‹</button>'
    + '<strong>' + esc(monthName) + '</strong>'
    + '<button type="button" class="cal-nav" data-mo="1"' + (canNext ? '' : ' disabled') + ' aria-label="Next month">›</button>'
    + '</div>'
    + '<div class="cal-dow"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>'
    + '<div class="cal-grid">' + cells + '</div>'
    + (present.length
        ? '<div class="cal-key">' + present.map(x => '<span><i class="d-' + x + '"></i>' + esc(KIND[x].label) + '</span>').join('') + '</div>'
        : '')
    + '<div class="cal-legend">Tap a highlighted day to see what is on.</div>'
    + '</div>'
    // ⚠ No panel at all when nothing is selected. "Nothing on that day" under
    //   a month the reader has only just paged to is an answer to a question
    //   they never asked, and reads as an error.
    + (sel.length
        ? '<div class="cal-day"><h3>' + esc(selLabel) + '</h3>' + sel.map(i => i.html).join('') + '</div>'
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
