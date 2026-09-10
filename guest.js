'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Guest assignment runner.
//
//  Standalone: no engine/*.js, no supabase-js, no Tailwind. Talks only to
//  /api/assignment-open and /api/assignment-submit. Kept small on purpose -
//  this loads on a phone, over mobile data, from a WhatsApp link.
//
//  Answer matching here mirrors engine/app.js so the instant feedback a child
//  sees agrees with the server. The SERVER re-grades on submit and its result
//  is the one stored and shown, so a disagreement can never inflate a score.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const $ = id => document.getElementById(id);
const show = id => document.querySelectorAll('.screen')
  .forEach(s => s.classList.toggle('on', s.id === id));

const S = {
  code: '', name: '', submitName: '', access: null, classroomId: null,
  token: '', assignment: null, questions: [],
  idx: 0, answers: [], answered: false, endAt: null, timer: null, result: null,
  materials: [], matSort: 'recent',
  // material_id -> true. What this pupil says they have done. Held in memory
  // and echoed by the server on every tap, so the button never shows a state
  // the database has not actually accepted.
  doneMaterials: {},
};

// localStorage helpers for shared-PIN classroom nicknames
function _nickKey(id) { return 'psac_guest_nick_' + String(id || ''); }
function _loadNick(id) {
  try { return id ? (localStorage.getItem(_nickKey(id)) || '') : ''; } catch(_) { return ''; }
}
function _saveNick(id, name) {
  try { if (id && name) localStorage.setItem(_nickKey(id), String(name).slice(0, 40)); } catch(_) {}
}

// ── This device's code ────────────────────────────────────────────────────
// ⚠ A DEVICE code, not a person. 32 random hex characters from
// crypto.getRandomValues, kept in this browser only. Nothing in it is derived
// from the child or the hardware — it is not a fingerprint, and it cannot be
// re-derived if cleared. Two children sharing a tablet share one code; one
// child on two tablets has two.
//
// It exists because a shared-PIN class identifies children BY NAME, and
// teacher_guest_open() therefore cannot tell "another child claiming this name"
// from "the same child who reloaded the page" — it refused both. The code is
// what separates them.
//
// ⚠ Per browser, not per classroom: the same tablet in two classes is the same
// tablet, and the server scopes the row by classroom anyway.
const DEVICE_KEY = 'psac_guest_device_v1';
function _deviceCode() {
  try {
    let v = localStorage.getItem(DEVICE_KEY);
    if (v && /^[0-9a-f]{32}$/.test(v)) return v;
    const b = new Uint8Array(16);
    (self.crypto || window.crypto).getRandomValues(b);
    v = Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(DEVICE_KEY, v);
    return v;
  } catch (_) {
    // Private mode, or storage refused. The flow still works — the child simply
    // gets the old behaviour, so this must never throw into sign-in.
    return '';
  }
}

// ── Share code: /a/ABC123 , or ?code=ABC123 ───────────────────────────────
(function readCode() {
  const m = location.pathname.match(/\/a\/([A-Za-z0-9]{4,12})/);
  S.code = (m ? m[1] : new URLSearchParams(location.search).get('code') || '')
    .trim().toUpperCase();
})();

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function fmtDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('en-GB',
      { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch (e) { return ''; }
}
function err(msg) {
  const el = $('g-err');
  el.textContent = msg;
  el.classList.toggle('on', !!msg);
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  // Functions answer 200 + {ok:false} for expected outcomes; anything else is a fault.
  if (!res.ok) throw new Error('http_' + res.status);
  return res.json();
}

// ── Answer matching (mirrors engine/app.js normalise/checkAnswer) ─────────
function normalise(v) {
  return String(v == null ? '' : v).toLowerCase()
    .replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g, '').replace(/cm2/g, 'cm²').replace(/m2/g, 'm²')
    .replace(/kg/g, 'kg').replace(/min/g, 'min').replace(/\bpm\b/g, 'pm');
}
function isCorrect(q, ua) {
  if (ua == null || ua === '') return false;
  const n = normalise(ua);
  return [q.answer].concat(q.acceptableAnswers || []).some(a => normalise(a) === n);
}

// ══════════════════════════════════════════════════════════════════════════
//  SCREEN 1 · Gate
// ══════════════════════════════════════════════════════════════════════════
async function initGate() {
  if (!S.code) {
    $('g-title').textContent = 'Link not complete';
    $('g-sub').textContent = 'Ask your teacher to resend the homework link.';
    $('g-go').disabled = true;
    return;
  }
  $('g-go').disabled = true;
  $('g-sub').textContent = 'Loading homework…';
  try {
    const info = await api('/api/assignment-open', {code:S.code, info:true});
    if (!info.ok) throw new Error('unavailable');
    S.access = info.access_mode || 'legacy';
    S.classroomId = info.classroom_id || null;
    $('g-title').textContent = info.title || 'Homework';
    // shared_pin: PIN + name (name pre-filled from localStorage if known)
    $('g-name-wrap').hidden = S.access === 'classroom_pin';
    $('g-pin-wrap').hidden  = S.access === 'nickname';
    if (S.access === 'shared_pin') {
      // Both PIN and name visible; pre-fill name from localStorage if saved
      $('g-name-wrap').hidden = false;
      $('g-pin-wrap').hidden  = false;
      const savedNick = _loadNick(S.classroomId || S.code);
      if (savedNick) $('g-name').value = savedNick;
    }
    $('g-sub').textContent =
      S.access === 'classroom_pin' ? 'Enter your own private pupil PIN. No account needed.'
      : S.access === 'shared_pin'  ? 'Enter the class PIN, then your name. Your name will be remembered on this device.'
      : S.access === 'nickname'    ? 'Enter a nickname for this assignment. No PIN needed.'
      : 'Enter your name and the assignment PIN.';
    $('g-go').disabled = false;
  } catch (_) {
    err('Could not load this homework. Check your connection or ask your teacher whether it is still open. Refresh to try again.');
    return;
  }

  $('g-pin').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
  });
  [$('g-name'), $('g-pin')].forEach(el => el.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); openAssignment(); }
  }));
  $('g-go').addEventListener('click', openAssignment);
}

async function openAssignment() {
  const name = $('g-name').value.trim();
  const pin  = $('g-pin').value.trim();
  if (!S.access) return;
  const needsName = S.access !== 'classroom_pin';
  const needsPin  = S.access !== 'nickname';
  if (needsName && !name) { err('Please enter your name.'); $('g-name').focus(); return; }
  if (needsPin  && !/^\d{4}$/.test(pin)) { err('The PIN is 4 digits.'); $('g-pin').focus(); return; }

  err('');
  const btn = $('g-go');
  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span> Opening…';

  // ⚠ Read ONCE, for every mode. It used to be minted only inside the
  //   shared-PIN branch below; the one-attempt-per-device cap needs it on the
  //   open-link path too, which is the path that had no identity at all.
  const device = _deviceCode();

  // ⚠ Claim the name for THIS device before opening. Two things depend on it:
  // the teacher gets a list of who is actually in a shared-PIN class, and this
  // child's own abandoned attempt is cleared so a reload does not answer
  // "Someone with that name has already done this assignment".
  // ⚠ Best effort. If it fails — private browsing, storage refused, the
  // endpoint not deployed yet — sign-in carries on exactly as before rather
  // than blocking a child out of their homework over a nicety. The one refusal
  // that IS surfaced is a name genuinely held by another device.
  if (S.access === 'shared_pin') {
    if (device) {
      try {
        const claim = await api('/api/guest-device', { code: S.code, device, name });
        if (claim && claim.ok === false && claim.error === 'name_taken') {
          err('Somebody else in your class is already using that name. Try adding your surname.');
          btn.disabled = false; btn.textContent = 'Start';
          $('g-name').focus();
          return;
        }
      } catch (_) { /* carry on: the claim is an improvement, not a gate */ }
    }
  }

  let r;
  try {
    r = await api('/api/assignment-open', { code: S.code, name, pin, device });
  } catch (e) {
    btn.disabled = false; btn.textContent = 'Start homework →';
    err('No connection. Check your internet and try again.');
    return;
  }

  btn.disabled = false;
  btn.textContent = 'Start homework →';

  if (!r.ok) {
    // A duplicate first name is usually a DIFFERENT child, not a repeat attempt,
    // so offer the standard classroom fix rather than a dead end.
    if (r.error === 'name_taken') {
      if (S.access === 'classroom_pin') { err('You have already submitted this homework. Ask your teacher if you need another attempt.'); return; }
      err('Someone called "' + name + '" already did this. If that is not you, '
        + 'add your surname initial - e.g. "' + name + ' B".');
      $('g-name').focus();
      return;
    }
    // ⚠ The teacher switched on one attempt per device. Name the name that
    //   already finished here: on a shared family laptop the honest answer is
    //   usually 'your brother did it', and a bare refusal reads as a bug.
    if (r.error === 'device_used') {
      err(r.other_name
        ? '"' + r.other_name + '" has already finished this homework on this device. Your teacher allowed one go per device - ask them if you need another.'
        : 'This device has already finished this homework. Ask your teacher if you need another go.');
      return;
    }
    if (r.error === 'locked') {
      const mins = Math.max(1, Math.ceil((r.secsLeft || 600) / 60));
      err('Too many wrong PINs. Try again in ' + mins + ' minute' + (mins > 1 ? 's' : '') + '.');
      return;
    }
    if (r.error === 'bad_pin' && typeof r.attemptsLeft === 'number') {
      err('Wrong PIN. ' + r.attemptsLeft + ' tr' + (r.attemptsLeft === 1 ? 'y' : 'ies') + ' left.');
      $('g-pin').value = ''; $('g-pin').focus();
      return;
    }
    err(r.message || 'Could not open this assignment.');
    return;
  }

  S.name       = r.name;
  S.submitName = r.submitName || r.name;
  // Persist name for shared_pin classrooms so the student doesn't re-enter it
  if (S.access === 'shared_pin' && r.name) _saveNick(S.classroomId || S.code, r.name);
  $('g-pin').value = '';
  // Per-attempt token from assignment-open. Held in memory only - it proves
  // THIS browser passed the PIN, and the submit endpoint refuses without it.
  S.token      = r.token || '';
  S.assignment = r.assignment;
  S.questions  = r.questions || [];
  S.answers    = [];
  S.idx        = 0;

  // Show the home screen (assignment summary + class resources) before the quiz.
  $('h-title').textContent = S.assignment.title || 'Homework';
  $('h-who').textContent   = 'Hi ' + S.name + ' 👋 - ' + S.questions.length + ' question' + (S.questions.length === 1 ? '' : 's');
  // ⚠ Only offered when this pupil signed in with their OWN PIN. In that mode
  // teacher_guest_open() sets the identity key to the pupil's UUID, so the name
  // is a label and changing it moves nothing. Under a SHARED class PIN the name
  // IS the key and renaming would strand the pupil's work — the server refuses
  // it, and the button is not drawn either, so a child is never offered
  // something that will fail.
  const canRename = S.access === 'classroom_pin' && !!S.token;
  const renameBtn = $('h-rename');
  if (renameBtn) {
    renameBtn.hidden = !canRename;
    if (canRename && !renameBtn._wired) { renameBtn._wired = true; renameBtn.addEventListener('click', changeMyName); }
  }
  show('s-home');

  // Load classroom materials in the background.
  if (S.classroomId) {
    $('h-res').style.display = '';
    loadMaterials(S.classroomId);
  }
}

function _startQuiz() {
  if (S.assignment && S.assignment.durationMins) {
    S.endAt = Date.now() + S.assignment.durationMins * 60000;
    S.timer = setInterval(tickTimer, 1000);
  }
  $('q-who').textContent = S.name + ' · ' + (S.assignment.title || 'Homework');
  show('s-quiz');
  renderQuestion();
}

$('h-start') && $('h-start').addEventListener('click', _startQuiz);

// ── Class resources ───────────────────────────────────────────────────────
// ⚠ This page loads NO engine file by design, so the sort here is its own copy
// of engine/helpers.js's sortMaterials(). Keep the two in step.
const MAT_SORTS = [['recent', '🕑 Newest'], ['subject', '📚 Subject'], ['title', '🔤 Name']];
const MAT_SORT_STORE = 'psac_guest_mat_sort';

function matSortRead() {
  try {
    const v = localStorage.getItem(MAT_SORT_STORE);
    if (v && MAT_SORTS.some(s => s[0] === v)) return v;
  } catch (_) { }
  return 'recent';
}
// shared_at is when the teacher shared the file with this class; created_at is
// only the fallback for a row from before the junction table carried a date.
function matWhen(m) { return Date.parse((m && (m.shared_at || m.created_at)) || '') || 0; }
function matTitleCmp(a, b) {
  return String(a.title || '').localeCompare(String(b.title || ''), undefined, { sensitivity: 'base' });
}
function sortMats(list, key) {
  const rows = (list || []).slice();
  // ⚠ A file with no subject sorts LAST, never first.
  const subj = m => String(m.subject || '￿').toLowerCase();
  if (key === 'subject') return rows.sort((a, b) => subj(a).localeCompare(subj(b)) || matTitleCmp(a, b));
  if (key === 'title')   return rows.sort(matTitleCmp);
  return rows.sort((a, b) => matWhen(b) - matWhen(a) || matTitleCmp(a, b));
}
function matDateText(m) {
  const t = matWhen(m);
  if (!t) return '';
  const d = new Date(t);
  const o = { day: 'numeric', month: 'short' };
  if (d.getFullYear() !== new Date().getFullYear()) o.year = 'numeric';
  return d.toLocaleDateString('en-GB', o);
}

async function loadMaterials(classroomId) {
  const list = $('h-res-list');
  if (!list) return;
  try {
    const r = await api('/api/classroom-materials', { classroom_id: classroomId });
    if (!r.ok || !r.materials || !r.materials.length) {
      $('h-res').style.display = 'none'; // nothing to show
      return;
    }
    S.materials = r.materials;
    S.matSort   = matSortRead();
    renderMaterials();
    // Wire up done screen "Class resources" button now that we know there are some.
    const dresBtn = $('d-resources');
    if (dresBtn) {
      dresBtn.style.display = '';
      dresBtn.onclick = () => show('s-home');
    }
  } catch (_) {
    $('h-res').style.display = 'none'; // network issue - hide silently
  }
}

function renderMaterials() {
  const list = $('h-res-list');
  if (!list) return;
  // One file needs no sort control - it would only be something else to read.
  const bar = S.materials.length > 1
    ? '<div class="res-sort" role="group" aria-label="Sort resources">'
      + '<span class="res-sort-label">Sort</span>'
      + MAT_SORTS.map(function (s) {
          return '<button type="button" class="res-sort-btn' + (s[0] === S.matSort ? ' on' : '')
            + '" data-sort="' + s[0] + '" aria-pressed="' + (s[0] === S.matSort) + '">' + s[1] + '</button>';
        }).join('')
      + '</div>'
    : '';

  list.innerHTML = bar + sortMats(S.materials, S.matSort).map(function (m) {
    // ⚠ A material is a stored file OR a link the teacher pasted. This page
    //   loads no engine file by design, so materialKind()/materialIcon() from
    //   engine/helpers.js are re-implemented here - the same deliberate copy the
    //   sort comparator above already is. Change both together.
    const isLink = m.source_type === 'link';
    const ytId   = isLink && /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/.test(String(m.url || ''));
    const icon = isLink
      ? (ytId ? '▶️' : (/\.pdf(\?|#|$)/i.test(String(m.url || '')) ? '📄' : '🔗'))
      : (m.file_name && m.file_name.toLowerCase().endsWith('.pdf') ? '📄' : '🖼️');
    // Where a link goes, so a pupil can see before tapping. Never the full URL.
    let host = '';
    if (isLink) { try { host = new URL(m.url).hostname.replace(/^www\./, ''); } catch (_) { } }
    const sub  = [m.subject, host, m.description].filter(Boolean).join(' · ');
    const when = matDateText(m);
    // ⚠ http/https only. This is the third check (teacher form, database CHECK,
    //   here) and it is the one that guards the href actually written to the DOM.
    const safe = /^https?:\/\//i.test(String(m.url || '')) ? m.url : '';
    const btn  = safe
      ? '<a href="' + esc(safe) + '" target="_blank" rel="noopener noreferrer" class="res-open">'
        + (isLink ? (ytId ? 'Watch ↗' : 'Open link ↗') : 'Open ↗') + '</a>'
      : '';
    // ⚠ A CLAIM, not a mark. Nobody can grade a worksheet or a video from here,
    //   so the wording is "I have done this" and the confirmation says the
    //   teacher can SEE it — never that it has been marked or scored.
    // ⚠ Needs the PIN token. Without it (the info-only preview before sign-in)
    //   the control is not drawn at all, rather than drawn and failing on tap.
    const doneMark = S.token && m.id
      ? '<button type="button" class="res-done' + (S.doneMaterials[m.id] ? ' on' : '') + '"'
        + ' data-done="' + esc(m.id) + '" aria-pressed="' + (S.doneMaterials[m.id] ? 'true' : 'false') + '">'
        + (S.doneMaterials[m.id] ? '✓ I have done this' : 'Mark as done') + '</button>'
      : '';
    return '<div class="res-card">'
      + '<div class="res-icon">' + icon + '</div>'
      + '<div class="res-body">'
      + '<div class="res-title">' + esc(m.title) + '</div>'
      + (sub ? '<div class="res-sub">' + esc(sub) + '</div>' : '')
      + (when ? '<div class="res-date">📅 Shared ' + esc(when) + '</div>' : '')
      + btn + doneMark
      + '</div></div>';
  }).join('');

  // Listeners, not inline onclick: everything in this file lives inside an IIFE
  // and is not reachable from markup.
  list.querySelectorAll('.res-sort-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      S.matSort = b.getAttribute('data-sort') || 'recent';
      try { localStorage.setItem(MAT_SORT_STORE, S.matSort); } catch (_) { }
      renderMaterials();
    });
  });

  list.querySelectorAll('.res-done').forEach(function (b) {
    b.addEventListener('click', function () { markMaterialDone(b); });
  });
}

// ⚠ Renames the LABEL, never the identity. name_key stays the pupil's UUID, so
// every submission, PIN attempt and material tick they already have follows
// them. The teacher sees the change and who made it — a child quietly taking
// another child's name must not be invisible, which is why this is recorded
// rather than silently allowed.
async function changeMyName() {
  const current = S.name || '';
  const next = prompt('What should your teacher call you?', current);
  if (next === null) return;                       // cancelled
  const clean = String(next).replace(/\s+/g, ' ').trim();
  if (clean === current) return;                   // nothing to do
  if (clean.length < 2 || clean.length > 40) {
    alert('Please use between 2 and 40 letters.');
    return;
  }
  let r = null;
  try {
    r = await api('/api/pupil-name', {
      code: S.code, name: S.submitName || S.name, token: S.token, new_name: clean,
    });
  } catch (_) { r = null; }
  if (!r || !r.ok) {
    alert(r && r.error === 'bad_token'
      ? 'Your sign-in has expired. Enter your PIN again to change your name.'
      : r && r.error === 'not_supported'
        ? 'Your class signs in with one shared PIN, so your teacher looks after names here.'
        : 'Could not change your name just now. Please try again.');
    return;
  }
  // The SERVER's cleaned-up version, not the raw text — it collapses spaces and
  // strips control characters, and the teacher will see exactly this.
  S.name = r.name || clean;
  S.submitName = S.submitName || S.name;
  const who = $('h-who');
  if (who) who.textContent = 'Hi ' + S.name + ' 👋 - ' + S.questions.length + ' question' + (S.questions.length === 1 ? '' : 's');
  alert('Thanks — your teacher will see you as ' + S.name + '.');
}

// ⚠ The button only changes after the SERVER agrees. An optimistic tick that
// silently failed would tell a child their teacher can see work the teacher has
// no record of — the one lie this feature must not tell. The control is
// disabled while in flight so a double tap cannot toggle it twice.
async function markMaterialDone(btn) {
  const id = btn.getAttribute('data-done');
  if (!id || btn.disabled) return;
  const want = !S.doneMaterials[id];
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = want ? 'Saving…' : 'Removing…';
  let r = null;
  try {
    r = await api('/api/material-done', {
      code: S.code, name: S.submitName || S.name, token: S.token,
      material_id: id, done: want,
    });
  } catch (_) { r = null; }
  btn.disabled = false;
  if (!r || !r.ok) {
    btn.textContent = label;
    // Say what to do next, and do not pretend it saved.
    alert(r && r.error === 'bad_token'
      ? 'Your sign-in has expired. Enter your PIN again to save this.'
      : 'Could not save that just now. Please check your connection and try again.');
    return;
  }
  if (want) S.doneMaterials[id] = true; else delete S.doneMaterials[id];
  renderMaterials();
}

function tickTimer() {
  if (!S.endAt) return;
  const left = Math.max(0, Math.round((S.endAt - Date.now()) / 1000));
  const m = Math.floor(left / 60), s = left % 60;
  const el = $('q-timer');
  el.textContent = '⏱ ' + m + ':' + String(s).padStart(2, '0');
  el.style.color = left <= 60 ? 'var(--bad)' : '';
  if (left === 0) { clearInterval(S.timer); S.timer = null; finish(); }
}

// ══════════════════════════════════════════════════════════════════════════
//  SCREEN 2 · Questions
// ══════════════════════════════════════════════════════════════════════════
function renderQuestion() {
  const q = S.questions[S.idx];
  if (!q) return finish();

  S.answered = false;
  $('q-count').textContent = 'Question ' + (S.idx + 1) + ' of ' + S.questions.length;
  $('q-bar').style.width = Math.round(S.idx / S.questions.length * 100) + '%';
  $('q-text').innerHTML = q.question;   // authored content from our own repo
  $('q-fb').className = 'fb';
  $('q-btn').textContent = 'Check answer';
  $('q-btn').disabled = false;

  const box = $('q-answers');
  if (q.type === 'mcq' && q.options) {
    // ⚠ The option INDEX is the attribute, never the option text. esc() escapes
    //   & < > only, and 944 authored options contain a double quote ('No - it
    //   should be "four"'), which closed data-v early: dataset.v held a
    //   truncated answer and the server graded a correct pick as wrong.
    // ⚠ The label is authored HTML, like q.question above - 55 questions carry
    //   <sup>/<sub> in their options and 3<sup>6</sup> is not 36.
    box.innerHTML = q.options.map((o, i) =>
      '<button class="opt" data-i="' + i + '">'
      + '<span class="ltr">' + String.fromCharCode(65 + i) + '</span><span>' + o + '</span></button>'
    ).join('');
    box.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      if (S.answered) return;
      box.querySelectorAll('.opt').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
    }));
  } else {
    box.innerHTML = '<input id="q-num" type="text" inputmode="decimal" '
      + 'autocomplete="off" enterkeyhint="done" placeholder="Type your answer">';
    $('q-num').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); $('q-btn').click(); }
    });
  }
}

// The option a button stands for, read back from the question - see the
// data-i note in renderQuestion().
function optText(q, btn) {
  const o = (q.options || [])[Number(btn.dataset.i)];
  return o == null ? '' : String(o);
}

function currentAnswer() {
  const q = S.questions[S.idx];
  if (q.type === 'mcq') {
    const sel = $('q-answers').querySelector('.opt.sel');
    return sel ? optText(q, sel) : '';
  }
  const inp = $('q-num');
  return inp ? inp.value.trim() : '';
}

$('q-btn') && $('q-btn').addEventListener('click', () => {
  const q = S.questions[S.idx];
  if (!q) return;

  if (!S.answered) {
    const ua = currentAnswer();
    if (!ua) { $('q-fb').className = 'fb no on';
               $('q-fb').innerHTML = '<b>Pick an answer first</b>'; return; }

    const ok = isCorrect(q, ua);
    S.answers.push({ id: q.id, answer: ua });
    S.answered = true;

    if (q.type === 'mcq') {
      $('q-answers').querySelectorAll('.opt').forEach(b => {
        b.disabled = true;
        const v = optText(q, b);
        if (normalise(v) === normalise(q.answer)) b.classList.add('ok');
        else if (v === ua) b.classList.add('no');
        b.classList.remove('sel');
      });
    } else if ($('q-num')) {
      $('q-num').disabled = true;
    }

    $('q-fb').className = 'fb on ' + (ok ? 'ok' : 'no');
    // ⚠ The answer and the working are authored content from our own repo, the
    //   same provenance as q.question - escaping them printed the markup at the
    //   child ("= <b>256 books</b>"). 25,780 of 35,460 questions carry markup in
    //   their explanation and 51 carry it in the answer (H<sub>2</sub>O).
    $('q-fb').innerHTML = ok
      ? '<b>Correct! 🎉</b>' + (q.explanation || '')
      : '<b>Answer: ' + q.answer + '</b>' + (q.explanation || '');

    $('q-btn').textContent = (S.idx === S.questions.length - 1) ? 'Finish →' : 'Next question →';
    return;
  }

  S.idx++;
  if (S.idx >= S.questions.length) finish();
  else renderQuestion();
});

// ══════════════════════════════════════════════════════════════════════════
//  SCREEN 3 · Result
// ══════════════════════════════════════════════════════════════════════════
async function finish() {
  if (S.timer) { clearInterval(S.timer); S.timer = null; }
  show('s-done');
  $('d-pct').textContent = '…';
  $('d-score').textContent = 'Sending to your teacher…';
  $('d-sent').style.display = 'none';

  let r;
  try {
    r = await api('/api/assignment-submit',
      { code: S.code, name: S.submitName, token: S.token, answers: S.answers });
  } catch (e) {
    // Never lose the child's work to a flaky connection - let them retry.
    $('d-pct').textContent = '⚠️';
    $('d-score').textContent = 'Could not reach your teacher.';
    $('d-sent').style.display = 'block';
    $('d-sent').className = 'err on';
    $('d-sent').innerHTML = 'Not sent yet. <b>Tap “Try sending again”.</b>';
    $('d-share').textContent = '🔄 Try sending again';
    $('d-share').onclick = finish;
    return;
  }

  if (!r.ok) {
    if (r.error === 'already_submitted') {
      $('d-pct').textContent = (r.pct != null ? r.pct + '%' : '✅');
      $('d-score').textContent = 'You already submitted this homework.';
      $('d-sent').style.display = 'block';
      return;
    }
    $('d-pct').textContent = '⚠️';
    $('d-score').textContent = r.message || 'Could not save your answers.';
    return;
  }

  // The SERVER's grade is what is shown - never the local tally.
  S.result = r;
  $('d-pct').textContent   = r.pct + '%';
  $('d-score').textContent = r.score + ' out of ' + r.total + ' correct';
  $('d-sent').style.display = 'block';
  $('d-sent').className = 'sent';
  $('d-sent').textContent = 'Sent to your teacher ✅';
  $('d-share').textContent = '📤 Share my result';
  $('d-share').onclick = shareResult;
  buildReview(r.detail || []);
}

function buildReview(detail) {
  const byId = {};
  S.questions.forEach(q => { byId[q.id] = q; });
  $('d-reviewlist').innerHTML = detail.map((d, i) => {
    const q = byId[d.id] || {};
    return '<div class="rv"><span class="ic">' + (d.correct ? '✅' : '❌') + '</span>'
      + '<span><b>Q' + (i + 1) + '.</b> ' + esc(String(q.question || '').replace(/<[^>]*>/g, ' ')).slice(0, 120)
      // The pupil's own text stays escaped; the correct answer is authored.
      + (d.correct ? '' : '<br><span class="muted">You: ' + esc(d.userAnswer || '-')
          + ' · Correct: ' + d.correctAnswer + '</span>')
      + '</span></div>';
  }).join('');
  $('d-review').onclick = () => {
    const el = $('d-reviewlist');
    const open = el.style.display !== 'none';
    el.style.display = open ? 'none' : 'block';
    $('d-review').textContent = open ? 'Review my answers' : 'Hide my answers';
  };
}

// ── 1080×1080 result card ─────────────────────────────────────────────────
function drawCard() {
  const c = $('cardcanvas'), x = c.getContext('2d');
  const r = S.result || { pct: 0, score: 0, total: 0 };
  const W = 1080;

  const g = x.createLinearGradient(0, 0, W, W);
  g.addColorStop(0, '#4f46e5'); g.addColorStop(1, '#7c3aed');
  x.fillStyle = g; x.fillRect(0, 0, W, W);

  x.fillStyle = 'rgba(255,255,255,.10)';
  x.beginPath(); x.arc(900, 190, 240, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.arc(150, 930, 190, 0, Math.PI * 2); x.fill();

  x.textAlign = 'center'; x.fillStyle = '#fff';
  x.font = '600 34px system-ui,sans-serif';
  x.fillText('PSAC PRACTICE', W / 2, 120);

  x.font = '700 46px system-ui,sans-serif';
  x.fillText(clip(x, S.name || 'Student', 900), W / 2, 250);

  x.font = '400 30px system-ui,sans-serif';
  x.fillStyle = 'rgba(255,255,255,.85)';
  x.fillText(clip(x, (S.assignment && S.assignment.title) || 'Homework', 900), W / 2, 305);

  x.beginPath(); x.arc(W / 2, 590, 195, 0, Math.PI * 2);
  x.fillStyle = 'rgba(255,255,255,.15)'; x.fill();
  x.lineWidth = 14; x.strokeStyle = 'rgba(255,255,255,.35)'; x.stroke();

  // progress arc, from 12 o'clock
  x.beginPath();
  x.arc(W / 2, 590, 195, -Math.PI / 2, -Math.PI / 2 + (Math.max(0, Math.min(100, r.pct)) / 100) * Math.PI * 2);
  x.lineWidth = 14; x.strokeStyle = '#fff'; x.lineCap = 'round'; x.stroke();

  x.fillStyle = '#fff'; x.font = '800 150px system-ui,sans-serif';
  x.fillText(r.pct + '%', W / 2, 640);
  x.font = '500 34px system-ui,sans-serif';
  x.fillStyle = 'rgba(255,255,255,.9)';
  x.fillText(r.score + ' / ' + r.total + ' correct', W / 2, 700);

  const msg = r.pct >= 90 ? 'Outstanding! 🏆' : r.pct >= 70 ? 'Great work! 🎉'
            : r.pct >= 50 ? 'Good effort! 👍' : 'Keep practising! 💪';
  x.font = '700 52px system-ui,sans-serif'; x.fillStyle = '#fff';
  x.fillText(msg, W / 2, 880);

  x.font = '400 27px system-ui,sans-serif'; x.fillStyle = 'rgba(255,255,255,.75)';
  x.fillText('Practise free at psac-practice.netlify.app', W / 2, 990);
  return c;
}

function clip(ctx, text, maxW) {
  let t = String(text);
  while (ctx.measureText(t).width > maxW && t.length > 4) t = t.slice(0, -2);
  return t === String(text) ? t : t + '…';
}

function canvasBlob(c) {
  return new Promise(res => c.toBlob(res, 'image/png'));
}

async function shareResult() {
  const r = S.result;
  if (!r) return;
  const text = S.name + ' scored ' + r.pct + '% (' + r.score + '/' + r.total + ') on "'
    + ((S.assignment && S.assignment.title) || 'homework') + '" 📚';
  const url = location.origin;

  try {
    const blob = await canvasBlob(drawCard());
    const file = new File([blob], 'psac-result.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: text });
      return;
    }
    if (navigator.share) { await navigator.share({ text: text, url: url }); return; }
  } catch (e) {
    if (e && e.name === 'AbortError') return;   // user dismissed the sheet
  }
  waFallback(text + ' ' + url);
}

function waFallback(text) {
  try {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  } catch (e) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Result copied - paste it into WhatsApp.'))
        .catch(() => {});
    }
  }
}

$('d-tellparent') && $('d-tellparent').addEventListener('click', () => {
  waFallback('I did my PSAC homework on this app! Can you make me a free account '
    + 'so I can save my progress? ' + location.origin);
});

// ── Go ────────────────────────────────────────────────────────────────────
initGate();

})();
