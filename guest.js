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
  code: '', name: '', assignment: null, questions: [],
  idx: 0, answers: [], answered: false, endAt: null, timer: null, result: null,
};

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
function initGate() {
  if (!S.code) {
    $('g-title').textContent = 'Link not complete';
    $('g-sub').textContent = 'Ask your teacher to resend the homework link.';
    $('g-go').disabled = true;
    return;
  }
  $('g-sub').textContent = 'Code ' + S.code + ' · enter your name and PIN';
  $('g-name').focus();

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
  if (!name)            { err('Please enter your first name.'); $('g-name').focus(); return; }
  if (!/^\d{4}$/.test(pin)) { err('The PIN is 4 digits.'); $('g-pin').focus(); return; }

  err('');
  const btn = $('g-go');
  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span> Opening…';

  let r;
  try {
    r = await api('/api/assignment-open', { code: S.code, name, pin });
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
      err('Someone called "' + name + '" already did this. If that is not you, '
        + 'add your surname initial - e.g. "' + name + ' B".');
      $('g-name').focus();
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
  S.assignment = r.assignment;
  S.questions  = r.questions || [];
  S.answers    = [];
  S.idx        = 0;

  if (S.assignment.durationMins) {
    S.endAt = Date.now() + S.assignment.durationMins * 60000;
    S.timer = setInterval(tickTimer, 1000);
  }
  $('q-who').textContent = S.name + ' · ' + (S.assignment.title || 'Homework');
  show('s-quiz');
  renderQuestion();
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
    box.innerHTML = q.options.map((o, i) =>
      '<button class="opt" data-v="' + esc(o) + '">'
      + '<span class="ltr">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o) + '</span></button>'
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

function currentAnswer() {
  const q = S.questions[S.idx];
  if (q.type === 'mcq') {
    const sel = $('q-answers').querySelector('.opt.sel');
    return sel ? sel.dataset.v : '';
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
        const v = b.dataset.v;
        if (normalise(v) === normalise(q.answer)) b.classList.add('ok');
        else if (v === ua) b.classList.add('no');
        b.classList.remove('sel');
      });
    } else if ($('q-num')) {
      $('q-num').disabled = true;
    }

    $('q-fb').className = 'fb on ' + (ok ? 'ok' : 'no');
    $('q-fb').innerHTML = ok
      ? '<b>Correct! 🎉</b>' + esc(q.explanation || '')
      : '<b>Answer: ' + esc(q.answer) + '</b>' + esc(q.explanation || '');

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
      { code: S.code, name: S.name, answers: S.answers });
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
      + (d.correct ? '' : '<br><span class="muted">You: ' + esc(d.userAnswer || '—')
          + ' · Correct: ' + esc(d.correctAnswer) + '</span>')
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
  x.fillText('PSAC PRACTICE  🇲🇺', W / 2, 120);

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
    + ((S.assignment && S.assignment.title) || 'homework') + '" 🇲🇺📚';
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
        .then(() => alert('Result copied — paste it into WhatsApp.'))
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
