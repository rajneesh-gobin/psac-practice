'use strict';
// ══════════════════════════════════════════════
//  MathMaster Grade 5 — Application Logic
// ══════════════════════════════════════════════

// ── STATE ─────────────────────────────────────
const S = {
  exam: { qs: [], answers: {}, flagged: new Set(), idx: 0, timer: null, duration: 0, endTime: null },
  practice: { chapterId: null, difficulty: 1, qs: [], idx: 0, hintShown: false, session: { attempted: 0, correct: 0 } },
  currentScreen: 'dashboard',
};

// ── GAMIFICATION STATE ────────────────────────
let _soundEnabled = true;
let _comboStreak  = 0;
let _audioCtx     = null;

function _getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function _playTone(freq, dur, start, ctx, vol) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(vol || 0.22, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function _playSound(type) {
  if (!_soundEnabled) return;
  try {
    const ctx = _getAudioCtx();
    const t   = ctx.currentTime;
    if      (type === 'correct') { _playTone(523, 0.15, t,      ctx, 0.18); _playTone(659, 0.2,  t + 0.1,  ctx, 0.18); }
    else if (type === 'wrong')   { _playTone(300, 0.1,  t,      ctx, 0.18); _playTone(220, 0.28, t + 0.09, ctx, 0.13); }
    else if (type === 'combo')   { _playTone(523, 0.1,  t,      ctx, 0.18); _playTone(659, 0.1,  t + 0.08, ctx, 0.18); _playTone(784, 0.2, t + 0.16, ctx, 0.22); }
    else if (type === 'levelup') { [523,659,784,1047].forEach((f,i) => _playTone(f, 0.15, t + i*0.1, ctx, 0.2)); }
  } catch (_) {}
}

function toggleSound() {
  _soundEnabled = !_soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.textContent = _soundEnabled ? '🔔 Sound On' : '🔕 Sound Off';
    btn.classList.toggle('muted', !_soundEnabled);
  }
}

function _floatXP(amount) {
  const xpEl = document.getElementById('xp-display');
  if (!xpEl) return;
  const rect = xpEl.getBoundingClientRect();
  const el   = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = `+${amount} XP ✨`;
  el.style.left = `${rect.left + rect.width / 2 - 30}px`;
  el.style.top  = `${rect.top + window.scrollY - 10}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

const _COMBO_MSGS = { 2:'🔥 2 in a row!', 3:'🔥🔥 3 in a row!', 4:'💪 4 in a row!', 5:'🔥🔥🔥 On fire!', 7:'⚡ 7 in a row!', 10:'🏆 10 in a row! LEGENDARY!' };

function _showCombo(n) {
  const msg = _COMBO_MSGS[n];
  if (!msg) return;
  const el = document.getElementById('practice-combo');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden', 'combo-out');
  void el.offsetWidth;
  el.classList.add('combo-in');
  clearTimeout(el._comboTimer);
  el._comboTimer = setTimeout(() => {
    el.classList.remove('combo-in');
    el.classList.add('combo-out');
    setTimeout(() => el.classList.add('hidden'), 350);
  }, 1800);
}

// ── STORAGE ───────────────────────────────────
let ACTIVE_STUDENT_ID = null;
let DB = {};   // populated by Auth.init() after student is selected

// ── GRADE / SUBJECT SELECTION ─────────────────
let SELECTED_GRADE = null;

// ── ASSIGNMENT MODE ───────────────────────────
let ASSIGNMENT_MODE         = false;
let ASSIGNMENT_CONFIG       = null;
let ASSIGNMENT_STUDENT_NAME = '';
let ASSIGNMENT_SCORE        = { attempted: 0, correct: 0 };
let ASSIGNMENT_IS_TEST      = false;   // test mode = no feedback until submission
let ASSIGNMENT_TEST_ANSWERS = [];      // [{question,userAnswer,correctAnswer,correct,explanation}]

function save(data) {
  if (ACTIVE_STUDENT_ID) Store.saveStudent(ACTIVE_STUDENT_ID, data);
}

// ── THEME ─────────────────────────────────────
function applyTheme(t) {
  t = t || 'light';
  document.documentElement.classList.toggle('dark', t === 'dark');
  document.getElementById('theme-icon').textContent = t === 'dark' ? '☀️' : '🌙';
  if (ACTIVE_STUDENT_ID) { DB.theme = t; save(DB); }
  ['scratchpad-exam', 'scratchpad-practice'].forEach(id => {
    const c = document.getElementById(id);
    if (c && c._ctx) c._ctx.strokeStyle = t === 'dark' ? '#fff' : '#1e293b';
  });
}
document.getElementById('theme-toggle').addEventListener('click', () => applyTheme((DB.theme || 'light') === 'dark' ? 'light' : 'dark'));
applyTheme('dark'); // default until student loads their saved theme

// ── TOAST ─────────────────────────────────────
let toastTimer;
function toast(msg, dur = 2500) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), dur);
}

// ── SCREEN NAVIGATION ─────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const sc = document.getElementById('screen-' + id);
  if (sc) { sc.classList.remove('hidden'); S.currentScreen = id; }

  // Hide header on full-page assignment screens
  const hideHeader = sc?.dataset?.hideHeader === 'true';
  const hdr = document.querySelector('header');
  if (hdr) hdr.classList.toggle('hidden', hideHeader);

  if (id === 'dashboard')       renderDashboard();
  if (id === 'analytics')       renderAnalytics();
  if (id === 'chapter-select')  renderChapterSelect();
  if (id === 'syllabus')        renderSyllabus();
  if (id === 'parent')          renderParentDashboard();
  if (id === 'subject-select')  renderSubjectSelect();
  if (id === 'student-select')  renderStudentSelect();
  if (id === 'grade-select')    renderGradeSelect();
  if (id === 'teacher' && typeof TeacherMode !== 'undefined') TeacherMode.render();
}

// back buttons
document.querySelectorAll('.back-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.target));
});

// ── STREAK ────────────────────────────────────
function updateStreak() {
  const today = new Date().toDateString();
  if (DB.stats.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  DB.stats.streak = DB.stats.lastDate === yesterday ? DB.stats.streak + 1 : 1;
  DB.stats.lastDate = today;
  if (DB.stats.streak > DB.stats.maxStreak) DB.stats.maxStreak = DB.stats.streak;
  save(DB);
  document.getElementById('streak-count').textContent = DB.stats.streak;
}

// ── CHAPTER PROGRESS ──────────────────────────
function getChapterPct(id) {
  if (!DB.chapters) return 0;
  const c = DB.chapters[id];
  if (!c || !c.attempted) return 0;
  return Math.round(c.correct / c.attempted * 100);
}
function recordAnswer(chapterId, correct) {
  if (ASSIGNMENT_MODE) {
    ASSIGNMENT_SCORE.attempted++;
    if (correct) ASSIGNMENT_SCORE.correct++;
    return;
  }
  if (!DB.chapters[chapterId]) DB.chapters[chapterId] = { attempted: 0, correct: 0 };
  DB.chapters[chapterId].attempted++;
  if (correct) DB.chapters[chapterId].correct++;
  DB.stats.totalAttempted++;
  if (correct) DB.stats.totalCorrect++;
  updateStreak();
  checkBadges();
  if (correct) gainXP();
  save(DB);
  Events.emit('answer', { chapterId, correct });
}

// ── ANSWER CHECKING ───────────────────────────
function normalise(v) {
  return String(v).toLowerCase().replace(/\s+/g, '').replace(/,/g, '')
    .replace(/rs\.?/g,'').replace(/cm2/g,'cm²').replace(/m2/g,'m²')
    .replace(/kg/g,'kg').replace(/min/g,'min').replace(/\bpm\b/g,'pm');
}
function checkAnswer(q, userAnswer) {
  if (q.type === 'symmetry') {
    try {
      const selected = JSON.parse(userAnswer || '[]');
      const ans = q.answer;
      if (selected.length !== ans.length) return false;
      const selSet = new Set(selected.map(([r,c]) => `${r},${c}`));
      return ans.every(([r,c]) => selSet.has(`${r},${c}`));
    } catch { return false; }
  }
  const ua = normalise(userAnswer);
  const correct = [q.answer, ...(q.acceptableAnswers || [])].some(a => normalise(a) === ua);
  return correct;
}

// ── SYMMETRY GRID ─────────────────────────────
window.toggleSymCell = function(el, containerId) {
  el.classList.toggle('sym-selected');
};

function renderSymmetryGrid(q, cont, selectedAnswer, disabled) {
  const { rows, cols, axis, axisPos, given, answer } = q;
  const givenSet  = new Set(given.map(([r,c])  => `${r},${c}`));
  const answerSet = new Set(answer.map(([r,c]) => `${r},${c}`));
  const isVertical = axis === 'vertical';

  // Parse previously-selected cells when disabled (post-submit)
  let selSet = new Set();
  if (disabled && selectedAnswer) {
    try { JSON.parse(selectedAnswer).forEach(([r,c]) => selSet.add(`${r},${c}`)); } catch {}
  }

  let cells = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      const isAxisCell = (isVertical && c === axisPos) || (!isVertical && r === axisPos);
      const isAnswerSide = isVertical ? (c > axisPos) : (r > axisPos);

      if (isAxisCell) {
        cells += `<div class="sym-cell ${isVertical?'sym-axis-v':'sym-axis-h'}"></div>`;
      } else if (givenSet.has(key)) {
        cells += `<div class="sym-cell sym-given"></div>`;
      } else if (isAnswerSide) {
        const isAns = answerSet.has(key);
        const wasSel = selSet.has(key);
        if (disabled) {
          let cls = 'sym-cell';
          if (isAns && wasSel)  cls += ' sym-correct';
          else if (isAns)       cls += ' sym-missed';
          else if (wasSel)      cls += ' sym-wrong';
          else                  cls += ' sym-clickable';
          cells += `<div class="${cls}" data-r="${r}" data-c="${c}"></div>`;
        } else {
          cells += `<div class="sym-cell sym-clickable" data-r="${r}" data-c="${c}" onclick="toggleSymCell(this)"></div>`;
        }
      } else {
        cells += `<div class="sym-cell sym-empty"></div>`;
      }
    }
  }

  const colsStyle = `grid-template-columns:repeat(${cols},1fr)`;
  const legend = disabled ? `
    <div class="sym-legend">
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#22c55e"></span>Correct</span>
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#f97316"></span>Missed</span>
      <span class="sym-legend-item"><span class="sym-legend-dot" style="background:#ef4444"></span>Wrong</span>
    </div>` : `<p style="font-size:0.72rem;color:#64748b;text-align:center;margin-top:4px;">Click cells on the <b>${isVertical?'right':'bottom'}</b> to complete the mirror pattern</p>`;

  cont.innerHTML = `
    <div class="sym-wrap">
      <span class="sym-label">🪞 Symmetry — ${isVertical ? 'Vertical' : 'Horizontal'} axis</span>
      <div class="sym-grid" style="${colsStyle}">${cells}</div>
      ${legend}
    </div>`;
}

// ── SYMBOL KEYBOARD ───────────────────────────
// Extra symbol rows appended to the number pad, keyed by chapterId.
// Each entry is an array of { d: display label, v: value to insert }.
// For powers the symbols go in a 4th column alongside the digit rows.
const SYMBOL_KEYS = {
  powers:   [{ d:'^',   v:'^'  }, { d:'²', v:'²' }, { d:'³', v:'³' }],
  fractions:[{ d:'/',   v:'/'  }, { d:'and', v:'and' }],
  time:     [{ d:'h',   v:'h'  }, { d:'min', v:'min' }, { d:'s', v:'s' }],
  mass:     [{ d:'kg',  v:'kg' }, { d:'g',  v:'g'  }],
  capacity: [{ d:'L',   v:'L'  }, { d:'mL', v:'mL' }],
  length:   [{ d:'km',  v:'km' }, { d:'m',  v:'m'  }, { d:'cm', v:'cm' }, { d:'mm', v:'mm' }],
  area:     [{ d:'m²',  v:'m²' }, { d:'cm²',v:'cm²'}],
  geometry: [{ d:'°',   v:'°'  }],
};

window.insertSymbol = (containerId, sym) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  const s = inp.selectionStart ?? inp.value.length;
  const e = inp.selectionEnd   ?? inp.value.length;
  inp.value = inp.value.slice(0, s) + sym + inp.value.slice(e);
  inp.selectionStart = inp.selectionEnd = s + sym.length;
  inp.focus();
};

window.numPadBackspace = (containerId) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  const s = inp.selectionStart, e = inp.selectionEnd;
  if (s !== e) {
    inp.value = inp.value.slice(0, s) + inp.value.slice(e);
    inp.selectionStart = inp.selectionEnd = s;
  } else if (s > 0) {
    inp.value = inp.value.slice(0, s - 1) + inp.value.slice(s);
    inp.selectionStart = inp.selectionEnd = s - 1;
  }
  inp.focus();
};

window.numPadClear = (containerId) => {
  const inp = document.getElementById('num-ans-' + containerId);
  if (!inp) return;
  inp.value = '';
  inp.focus();
};

// ── RENDER HELPERS ────────────────────────────
function renderAnswerArea(q, containerId, selectedAnswer, disabled) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  if (q.type === 'symmetry') {
    renderSymmetryGrid(q, cont, selectedAnswer, disabled);
    return;
  }
  if (q.type === 'mcq') {
    cont.innerHTML = (q.options || []).map((opt, i) => {
      let cls = 'mcq-opt';
      if (disabled) {
        cls += ' disabled';
        if (opt === q.answer) cls += ' correct';
        else if (opt === selectedAnswer && opt !== q.answer) cls += ' wrong';
        else if (opt === selectedAnswer) cls += ' selected';
      } else {
        if (opt === selectedAnswer) cls += ' selected';
      }
      return `<button class="${cls}" data-value="${opt}" onclick="selectMCQ(this,'${containerId}','${q.answer}',${disabled})">
        <span class="opt-letter">${String.fromCharCode(65+i)}</span>
        <span>${opt}</span>
      </button>`;
    }).join('');
  } else {
    const cls = disabled ? (checkAnswer(q, selectedAnswer) ? 'num-input correct' : 'num-input wrong') : 'num-input';
    const inputExtra = disabled ? 'disabled' : 'inputmode="decimal"';
    cont.innerHTML = `<input type="text" class="${cls}" id="num-ans-${containerId}" value="${selectedAnswer||''}" placeholder="Type your answer here…" ${inputExtra}
      onkeydown="if(event.key==='Enter'){${containerId==='exam-answer-area'?'saveCurrentExamAnswer()':'practiceSubmit()'}}" autocomplete="off">`;

    if (!disabled) {
      const chSyms = (q.chapterId && SYMBOL_KEYS[q.chapterId]) || [];
      // Powers gets a 4-column pad (digits + ^ ² ³ in same grid).
      // Other chapters: 3-column digit pad + a dedicated symbol row below.
      const isPowers = q.chapterId === 'powers';

      let padHTML = '';
      if (isPowers) {
        // 4-column grid: digit | digit | digit | symbol
        const cols4 = [
          ['7','8','9', chSyms[0]?.v ?? '^'],
          ['4','5','6', chSyms[1]?.v ?? '²'],
          ['1','2','3', chSyms[2]?.v ?? '³'],
          ['.','0','⌫','C'],
        ];
        const symVals = chSyms.map(s => s.v);
        padHTML = `<div class="num-pad num-pad-4col" role="group" aria-label="Number pad">
          ${cols4.map(row => row.map((k,ci) => {
            if (k === '⌫') return `<button type="button" class="num-pad-btn num-pad-del" onclick="numPadBackspace('${containerId}')">⌫</button>`;
            if (k === 'C')  return `<button type="button" class="num-pad-btn num-pad-clear" onclick="numPadClear('${containerId}')">C</button>`;
            const isSym = symVals.includes(k);
            return `<button type="button" class="num-pad-btn${isSym?' num-pad-sym':''}" onclick="insertSymbol('${containerId}','${k}')">${k}</button>`;
          }).join('')).join('')}
        </div>
        <p class="sym-hint">Tap <b>^</b> then the exponent &mdash; e.g. <b>5^2</b> means 5²</p>`;
      } else {
        // Standard 3-column pad
        const numRows = [['7','8','9'],['4','5','6'],['1','2','3'],['.','0','⌫']];
        padHTML = `<div class="num-pad" role="group" aria-label="Number pad">
          ${numRows.map(row => row.map(k => {
            if (k === '⌫') return `<button type="button" class="num-pad-btn num-pad-del" onclick="numPadBackspace('${containerId}')">⌫</button>`;
            return `<button type="button" class="num-pad-btn" onclick="insertSymbol('${containerId}','${k}')">${k}</button>`;
          }).join('')).join('')}
          <button type="button" class="num-pad-btn num-pad-clear" onclick="numPadClear('${containerId}')">C</button>
          <button type="button" class="num-pad-btn num-pad-space" onclick="insertSymbol('${containerId}',' ')">SPC</button>
          <button type="button" class="num-pad-btn num-pad-minus" onclick="insertSymbol('${containerId}','-')">−</button>
        </div>`;

        // Symbol row for chapters that need special chars
        if (chSyms.length) {
          padHTML += `
          <div class="sym-keyboard" role="toolbar" aria-label="Symbol keyboard">
            <span class="sym-label">Insert:</span>
            ${chSyms.map(k => `<button type="button" class="sym-btn" onclick="insertSymbol('${containerId}','${k.v}')">${k.d}</button>`).join('')}
          </div>`;
        }
      }

      const padId = 'numpad-' + containerId;
      cont.innerHTML += `
        <button type="button" class="numpad-toggle" onclick="
          var p=document.getElementById('${padId}');
          var show=p.style.display==='none'||!p.style.display;
          p.style.display=show?'block':'none';
          this.classList.toggle('active',show);
        " title="Show / hide keypad">⌨️ Keypad</button>
        <div id="${padId}" style="display:none">${padHTML}</div>`;
      setTimeout(() => document.getElementById('num-ans-' + containerId)?.focus(), 50);
    }
  }
}

window.selectMCQ = (btn, containerId, correctAnswer, disabled) => {
  if (disabled) return;
  document.querySelectorAll(`#${containerId} .mcq-opt`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

function getSelectedAnswer(containerId, qType) {
  if (qType === 'mcq') {
    const sel = document.querySelector(`#${containerId} .mcq-opt.selected`);
    return sel ? sel.dataset.value : null;
  }
  if (qType === 'symmetry') {
    const selected = [];
    document.querySelectorAll(`#${containerId} .sym-clickable.sym-selected`).forEach(el => {
      selected.push([parseInt(el.dataset.r), parseInt(el.dataset.c)]);
    });
    selected.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return JSON.stringify(selected);
  }
  const inp = document.getElementById('num-ans-' + containerId);
  return inp ? inp.value.trim() : null;
}

// ── CONFETTI ──────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#00d2d3','#ff9f43'];
  const particles = Array.from({length:160}, () => ({
    x: Math.random() * canvas.width, y: -20,
    r: rnd(4, 10), col: cols[rnd(0, cols.length-1)],
    vx: (Math.random()-0.5)*5, vy: rnd(2, 5),
    angle: Math.random()*360, va: (Math.random()-0.5)*12
  }));
  let af;
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    particles.forEach(p => {
      if (p.y > canvas.height + 20) return;
      alive++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 0.6);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.angle += p.va;
    });
    if (alive > 0) af = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  frame();
  setTimeout(() => { cancelAnimationFrame(af); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 6000);
}

// ── BADGES ────────────────────────────────────
function checkBadges() {
  BADGES.forEach(b => {
    if (DB.badges.includes(b.id)) return;
    try {
      if (b.cond(DB.stats, DB.chapters)) {
        DB.badges.push(b.id);
        save(DB);
        showBadgeAlert(b);
      }
    } catch(e) {}
  });
}
function showBadgeAlert(b) {
  const el = document.createElement('div');
  el.className = 'fixed top-20 right-4 z-50 bg-yellow-400 text-yellow-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 badge-pop';
  el.innerHTML = `<span class="text-2xl">${b.icon}</span><div><div class="font-bold text-sm">Badge Unlocked!</div><div class="text-xs">${b.name}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── XP & LEVELS (Phase 4) ─────────────────────
const XP_PER_ANSWER  = 10;
const XP_THRESHOLDS  = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];
const LEVEL_NAMES    = ['Beginner','Explorer','Learner','Practiser','Achiever','Expert','Champion','Master','Genius','Legend'];

function getLevel(xp) {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function gainXP() {
  DB.xp = (DB.xp || 0) + XP_PER_ANSWER;
  const newLevel = getLevel(DB.xp);
  const oldLevel = DB.level || 1;
  DB.level = newLevel;
  if (newLevel > oldLevel) { _playSound('levelup'); showLevelUp(newLevel); }
  updateXPBar();
}

function updateXPBar() {
  const xp = DB.xp || 0;
  const lv = DB.level || 1;
  const el = document.getElementById('xp-display');
  if (!el) return;
  const curr = XP_THRESHOLDS[lv - 1] || 0;
  const next = XP_THRESHOLDS[lv]     || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const pct  = lv >= XP_THRESHOLDS.length ? 100 : Math.min(100, Math.round((xp - curr) / (next - curr) * 100));
  el.innerHTML = `<span class="text-xs font-bold text-purple-700 dark:text-purple-300">⭐ Lv.${lv}</span>
    <div style="width:48px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#8b5cf6,#6366f1);border-radius:3px"></div>
    </div>`;
}

function showLevelUp(level) {
  toast(`🎉 Level Up! You're now Level ${level} — ${LEVEL_NAMES[level - 1] || ''}!`, 4000);
  launchConfetti();
}

// ── FAMILY LEADERBOARD ────────────────────────
function _renderLeaderboard() {
  const el = document.getElementById('pd-leaderboard');
  if (!el) return;
  const accounts = Store.getAccounts();
  if (accounts.length < 2) { el.innerHTML = '<p class="text-xs text-gray-400 dark:text-gray-500 text-center py-2">Add more children to see the leaderboard.</p>'; return; }

  const ranked = accounts.map(a => {
    const d = Store.loadStudent(a.id);
    const acc = d.stats.totalAttempted ? Math.round(d.stats.totalCorrect / d.stats.totalAttempted * 100) : 0;
    return { ...a, xp: d.xp || 0, acc, level: d.level || 1 };
  }).sort((a, b) => b.xp - a.xp || b.acc - a.acc);

  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = ranked.map((a, i) => `
    <div class="flex items-center gap-3 py-2 ${a.id === ACTIVE_STUDENT_ID ? 'font-bold' : ''}">
      <span class="text-lg w-6 text-center shrink-0">${medals[i] || `${i+1}.`}</span>
      <span class="text-xl select-none">${a.avatar}</span>
      <div class="flex-1 min-w-0">
        <div class="text-sm text-gray-800 dark:text-white truncate">${a.name}${a.id === ACTIVE_STUDENT_ID ? ' <span class="text-xs text-blue-400 font-normal">(active)</span>' : ''}</div>
        <div class="text-xs text-gray-400">Lv.${a.level} · ${a.xp} XP · ${a.acc}% accuracy</div>
      </div>
    </div>`).join('<hr class="border-gray-100 dark:border-gray-700">');
}

// ── PARENT DASHBOARD ──────────────────────────
function renderParentDashboard() {
  const acct  = Auth.getActiveAccount() || {};
  const el    = id => document.getElementById(id);
  const stats = DB.stats || {};
  const acc   = stats.totalAttempted ? Math.round(stats.totalCorrect / stats.totalAttempted * 100) : 0;

  // Child card
  if (el('pd-avatar')) el('pd-avatar').textContent = acct.avatar || '🧒';
  if (el('pd-name'))   el('pd-name').textContent   = acct.name   || 'Student';
  if (el('pd-level'))  el('pd-level').textContent  = `Level ${DB.level || 1} — ${LEVEL_NAMES[(DB.level||1)-1]}`;
  if (el('pd-xp'))     el('pd-xp').textContent     = `${DB.xp || 0} XP · ${acc}% accuracy`;

  // Student switcher dropdown
  const sw = el('pd-student-switch');
  if (sw) {
    const accounts = Store.getAccounts();
    sw.innerHTML = accounts.map(a =>
      `<option value="${a.id}" ${a.id === ACTIVE_STUDENT_ID ? 'selected' : ''}>${a.avatar} ${a.name}</option>`
    ).join('');
  }

  // ── Progress tab ──────────────────────────
  if (el('pd-total'))  el('pd-total').textContent  = stats.totalAttempted || 0;
  if (el('pd-acc'))    el('pd-acc').textContent    = acc + '%';
  if (el('pd-streak')) el('pd-streak').textContent = (stats.streak || 0) + ' 🔥';
  if (el('pd-badges')) el('pd-badges').textContent = (DB.badges || []).length;

  const tbody = el('pd-chapters');
  if (tbody) {
    tbody.innerHTML = CHAPTERS.map(ch => {
      const c        = (DB.chapters || {})[ch.id] || { attempted: 0, correct: 0 };
      const pct      = c.attempted ? Math.round(c.correct / c.attempted * 100) : 0;
      const barColor = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
      const locked   = (DB.restrictions?.lockedChapters || []).includes(ch.id) ? ' 🔒' : '';
      const bar = `<div style="display:inline-flex;align-items:center;gap:6px">
        <div style="width:60px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:${barColor};border-radius:3px"></div>
        </div><span>${pct}%</span></div>`;
      return `<tr class="border-b border-gray-100 dark:border-gray-700">
        <td class="py-2 pr-2 text-sm text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}${locked}</td>
        <td class="py-2 text-sm text-center text-gray-500">${c.attempted}</td>
        <td class="py-2 text-sm text-center text-gray-500">${c.correct}</td>
        <td class="py-2 text-sm">${bar}</td>
      </tr>`;
    }).join('');
  }

  // Family code display
  const fcEl = el('pd-family-code');
  if (fcEl && typeof Store !== 'undefined') {
    Store.getMyFamily().then(f => { if (f && fcEl) fcEl.textContent = f.family_code; }).catch(() => {});
  }

  const pdStudents = el('pd-all-students');
  if (pdStudents) {
    const accounts = Store.getAccounts();
    pdStudents.innerHTML = accounts.length
      ? accounts.map(a => {
          const d     = Store.loadStudent(a.id);
          const p     = d.stats.totalAttempted ? Math.round(d.stats.totalCorrect / d.stats.totalAttempted * 100) : 0;
          const lname = LEVEL_NAMES[Math.min((d.level || 1) - 1, LEVEL_NAMES.length - 1)];
          const isMe  = a.id === ACTIVE_STUDENT_ID;
          return `<div class="flex items-center gap-3 p-3 rounded-xl ${isMe ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700/50'}">
            <span class="text-2xl select-none">${a.avatar}</span>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm text-gray-800 dark:text-white truncate">${a.name}${isMe ? ' <span class="text-xs text-blue-400 font-normal">(active)</span>' : ''}</div>
              <div class="text-xs text-gray-400">Lv.${d.level||1} ${lname} · ${d.xp||0} XP · ${p}% accuracy · ${d.stats.totalAttempted} done</div>
            </div>
            <div class="flex gap-1.5 shrink-0 flex-wrap">
              ${!isMe ? `<button onclick="Auth.loginStudent('${a.id}');Auth.exitParentMode()" class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg hover:bg-blue-200 transition-colors">Switch</button>` : ''}
              <button onclick="Auth.editStudent('${a.id}')" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg hover:bg-gray-200 transition-colors">Edit</button>
              <button onclick="Auth.confirmResetStudentProgress('${a.id}','${a.name.replace(/'/g,"\\'")}')" class="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2.5 py-1 rounded-lg hover:bg-yellow-200 transition-colors">Reset</button>
              <button onclick="Auth.deleteStudent('${a.id}')" class="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg hover:bg-red-200 transition-colors">Delete</button>
            </div>
          </div>`;
        }).join('')
      : '<p class="text-sm text-gray-400 py-3">No children yet — click ➕ Add Child to get started.</p>';
  }

  // ── Family leaderboard ────────────────────
  _renderLeaderboard();

  // ── Assignments tab ───────────────────────
  const chSelect = el('pd-assign-chapter');
  if (chSelect && !chSelect.children.length) {
    chSelect.innerHTML = `<option value="">Any Chapter</option>` +
      CHAPTERS.map(ch => `<option value="${ch.id}">${ch.icon} ${ch.name}</option>`).join('');
  }
  const asgList = el('pd-asgn-list');
  if (asgList) {
    const asgns = DB.assignments || [];
    const DLABELS = ['','Basic','Medium','Hard','Word Problems'];
    asgList.innerHTML = asgns.length ? asgns.map(a => {
      const ch  = CHAPTERS.find(c => c.id === a.chapterId);
      const dlv = a.difficulty ? (DLABELS[a.difficulty] || `L${a.difficulty}`) : 'All Levels';
      return `<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <span class="text-xl select-none">${ch?.icon || '📚'}</span>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm text-gray-800 dark:text-white">${ch?.name || 'Any Chapter'} — ${dlv}</div>
          ${a.note ? `<div class="text-xs text-gray-400 italic">"${a.note}"</div>` : ''}
          <div class="text-xs text-gray-400">${new Date(a.createdAt).toLocaleDateString()}</div>
        </div>
        <button onclick="Auth.removeAssignment('${a.id}')"
          class="shrink-0 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg hover:bg-red-200 transition-colors">Remove</button>
      </div>`;
    }).join('') : '<p class="text-sm text-gray-400 text-center py-4">No assignments yet. Add one above.</p>';
  }

  // ── Controls tab ──────────────────────────
  const maxDiff   = DB.restrictions?.maxDifficulty ?? 4;
  const examOff   = DB.restrictions?.examDisabled  ?? false;
  const lockedChs = DB.restrictions?.lockedChapters || [];

  [1,2,3,4].forEach(lv => { const r = el(`pd-maxdiff-${lv}`); if (r) r.checked = maxDiff === lv; });
  const examToggle = el('pd-exam-toggle');
  if (examToggle) examToggle.checked = !examOff;

  const chLocks = el('pd-chapter-locks');
  if (chLocks) {
    chLocks.innerHTML = CHAPTERS.map(ch => {
      const isLocked = lockedChs.includes(ch.id);
      return `<label class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
        <input type="checkbox" ${!isLocked ? 'checked' : ''} onchange="Auth.toggleChapterLock('${ch.id}', !this.checked)"
          class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}</span>
        ${isLocked ? '<span class="ml-auto text-xs text-red-400">Locked 🔒</span>' : ''}
      </label>`;
    }).join('');
  }
}

// ── SCRATCHPAD ────────────────────────────────
function initScratchpad(id) {
  const canvas = document.getElementById(id);
  if (!canvas || canvas._initialized) return;
  canvas._initialized = true;
  canvas.width = canvas.offsetWidth || 240;
  canvas.height = parseInt(canvas.getAttribute('height')) || 200;
  const ctx = canvas.getContext('2d');
  canvas._ctx = ctx;
  ctx.strokeStyle = DB.theme === 'dark' ? '#fff' : '#1e293b';
  ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let drawing = false, lx = 0, ly = 0;
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - r.left) * (canvas.width / r.width), y: (src.clientY - r.top) * (canvas.height / r.height) };
  };
  const start = e => { drawing = true; const p = pos(e); lx = p.x; ly = p.y; };
  const draw = e => {
    if (!drawing) return; e.preventDefault();
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke();
    lx = p.x; ly = p.y;
  };
  const stop = () => drawing = false;
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseleave', stop);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stop);
}
function clearScratch(id) {
  const c = document.getElementById(id);
  if (c && c._ctx) c._ctx.clearRect(0, 0, c.width, c.height);
}

// ── DASHBOARD ─────────────────────────────────
function _greeting() {
  const h = new Date().getHours();
  if (h < 12) return ['Good morning', '☀️'];
  if (h < 17) return ['Good afternoon', '🌤️'];
  return ['Good evening', '🌙'];
}

function renderDashboard() {
  if (!ACTIVE_STUDENT_ID) return; // guard: no student loaded yet
  const _acct  = (typeof Auth !== 'undefined') && Auth.getActiveAccount();
  const nameEl = document.getElementById('welcome-name');
  const greetEl = document.getElementById('dashboard-greeting');
  if (_acct) {
    if (nameEl) nameEl.textContent = _acct.name;
    if (greetEl) {
      const [greet, emoji] = _greeting();
      greetEl.innerHTML = `${greet}, <span id="welcome-name">${_acct.name}</span>! ${emoji}`;
    }
  }

  // Show "Subjects" button only when multiple subject packs are registered
  const subjectBtn = document.getElementById('btn-change-subject');
  if (subjectBtn) {
    const multiSubject = typeof SUBJECT_PACKS !== 'undefined' && SUBJECT_PACKS.length > 1;
    subjectBtn.classList.toggle('hidden', !multiSubject);
  }

  // Stats bar
  const acc = DB.stats.totalAttempted ? Math.round(DB.stats.totalCorrect / DB.stats.totalAttempted * 100) : 0;
  document.getElementById('dash-total-q').textContent = DB.stats.totalAttempted;
  document.getElementById('dash-accuracy').textContent = acc;
  document.getElementById('dash-exams').textContent = DB.stats.examCount;
  document.getElementById('streak-count').textContent = DB.stats.streak;

  // Assignments banner
  const asgns     = DB.assignments || [];
  const asgBanner = document.getElementById('assignments-banner');
  const asgList   = document.getElementById('assignments-list');
  if (asgBanner && asgList) {
    if (asgns.length) {
      asgBanner.classList.remove('hidden');
      asgList.innerHTML = asgns.map(a => {
        const ch  = CHAPTERS.find(c => c.id === a.chapterId);
        const dlv = a.difficulty ? `Level ${a.difficulty}` : 'All Levels';
        return `<div class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
          <span class="text-xl select-none">${ch?.icon || '📚'}</span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-gray-800 dark:text-white truncate">${ch?.name || a.chapterId}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">${dlv}${a.note ? ' · ' + a.note : ''}</div>
          </div>
          <button onclick="startAssignment('${a.id}')"
            class="shrink-0 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
            Start →
          </button>
        </div>`;
      }).join('');
    } else {
      asgBanner.classList.add('hidden');
    }
  }

  // Exam mode visibility (respect restrictions)
  const examCard = document.getElementById('btn-exam-mode');
  if (examCard) {
    const disabled = DB.restrictions?.examDisabled;
    examCard.style.opacity   = disabled ? '0.4' : '';
    examCard.style.pointerEvents = disabled ? 'none' : '';
    examCard.title = disabled ? 'Exam mode is currently locked by your parent' : '';
  }

  // Mastery grid (with lock overlay for restricted chapters)
  const locked = DB.restrictions?.lockedChapters || [];
  const mg = document.getElementById('mastery-grid');
  mg.innerHTML = CHAPTERS.map(ch => {
    const pct     = getChapterPct(ch.id);
    const col     = pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#3b82f6';
    const isLocked = locked.includes(ch.id);
    const click   = isLocked ? `toast('🔒 This chapter is locked by your parent.', 2000)` : `startChapterDirect('${ch.id}')`;
    const lockBadge = isLocked ? '<span class="text-xs ml-1" title="Locked">🔒</span>' : '';
    return `<div class="mastery-item ${isLocked ? 'opacity-50' : 'cursor-pointer hover:opacity-80'} transition-opacity" onclick="${click}">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}${lockBadge}</span>
        <span class="text-xs font-bold text-gray-500 dark:text-gray-400">${pct}%</span>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${pct}%;background:${col}"></div></div>
    </div>`;
  }).join('');

  // Badges
  const bg = document.getElementById('badges-grid');
  bg.innerHTML = BADGES.map(b => {
    const earned = DB.badges.includes(b.id);
    return `<div class="badge-item ${earned ? '' : 'locked'}" title="${b.desc}">
      <span class="badge-icon">${b.icon}</span>
      <span class="badge-name">${b.name}</span>
    </div>`;
  }).join('');
}

// ── CHAPTER SELECT ─────────────────────────────
function renderChapterSelect() {
  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = CHAPTERS.map(ch => {
    const pct = getChapterPct(ch.id);
    const c = DB.chapters[ch.id] || { attempted: 0, correct: 0 };
    return `<button class="chapter-card" onclick="startChapterDirect('${ch.id}')">
      <div class="text-3xl mb-2">${ch.icon}</div>
      <div class="font-bold text-gray-800 dark:text-white text-sm mb-1">${ch.name}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Part ${ch.part} · ${c.attempted} attempted</div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${pct}%;background:${pct>=80?'#22c55e':pct>=50?'#f59e0b':'#3b82f6'}"></div></div>
      <div class="text-xs mt-1 font-medium" style="color:${pct>=80?'#22c55e':pct>=50?'#f59e0b':'#3b82f6'}">${pct}% mastery</div>
    </button>`;
  }).join('');
}

window.startAssignment = function(assignId) {
  const a = (DB.assignments || []).find(x => x.id === assignId);
  if (!a) return;
  const diff = a.difficulty || 1;
  startChapterDirect(a.chapterId, diff);
};

function startChapterDirect(chapterId, forceDiff) {
  const locked = DB.restrictions?.lockedChapters || [];
  if (locked.includes(chapterId)) { toast('🔒 This chapter is locked by your parent.', 2000); return; }
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;
  const diff = Math.min(forceDiff || 1, maxDiff);
  S.practice.chapterId = chapterId;
  S.practice.difficulty = diff;
  S.practice.qs = [];
  S.practice.idx = 0;
  S.practice.session = { attempted: 0, correct: 0 };
  loadPracticeQuestion();
  showScreen('practice');
  const ch = CHAPTERS.find(c => c.id === chapterId);
  document.getElementById('practice-ch-name').textContent = ch ? `${ch.icon} ${ch.name}` : chapterId;
  updateDiffBtns(1);
  setTimeout(() => { initScratchpad('scratchpad-practice'); }, 100);
}

// ── EXAM MODE ─────────────────────────────────
document.getElementById('btn-exam-mode').addEventListener('click', () => {
  if (DB.restrictions?.examDisabled) { toast('🔒 Exam mode is locked by your parent.', 2000); return; }
  showScreen('exam-config');
});
document.getElementById('btn-chapter-mode').addEventListener('click', () => { showScreen('chapter-select'); });
document.getElementById('btn-syllabus-mode').addEventListener('click', () => showScreen('syllabus'));
document.getElementById('btn-weak-areas').addEventListener('click', startWeakAreaDrill);

document.getElementById('start-exam-btn').addEventListener('click', () => {
  const type = document.querySelector('input[name="exam-type"]:checked')?.value || 'full';
  if (type === 'print') { generatePrintablePaper(); return; }
  startExam(type);
});

function startExam(type) {
  const paper = assembleExamPaper(type);
  S.exam.qs = paper.questions;
  S.exam.answers = {};
  S.exam.flagged = new Set();
  S.exam.idx = 0;
  S.exam.type = type;
  S.exam.duration = paper.durationMins * 60;
  S.exam.endTime = Date.now() + S.exam.duration * 1000;
  showScreen('exam');
  renderExamNavGrid();
  renderExamQuestion();
  startExamTimer();
  document.getElementById('exam-q-total').textContent = S.exam.qs.length;
}

function generatePrintablePaper() {
  const year = new Date().getFullYear();

  // Build pools: Section A (Q1-30 mixed difficulty), Section B (Q31-40 hardest)
  const secAPool = shuffle(STATIC_QUESTIONS.filter(q => q.difficulty <= 3));
  const secBPool = shuffle(STATIC_QUESTIONS.filter(q => q.difficulty === 4));

  // Ensure chapter spread for Section A
  const secA = [];
  const usedIds = new Set();
  const chapters = [...new Set(STATIC_QUESTIONS.map(q => q.chapterId))];
  // 1-2 questions per chapter first pass
  for (const ch of chapters) {
    const pick = secAPool.find(q => q.chapterId === ch && !usedIds.has(q.id));
    if (pick) { secA.push(pick); usedIds.add(pick.id); }
    if (secA.length >= 30) break;
  }
  // Fill remaining from pool, sorted easy→hard
  for (const q of secAPool) {
    if (secA.length >= 30) break;
    if (!usedIds.has(q.id)) { secA.push(q); usedIds.add(q.id); }
  }
  secA.sort((a, b) => a.difficulty - b.difficulty);

  // Section B: 10 L4 word problems from varied chapters
  const secB = [];
  const usedB = new Set();
  for (const ch of shuffle(chapters)) {
    const pick = secBPool.find(q => q.chapterId === ch && !usedB.has(q.id));
    if (pick) { secB.push(pick); usedB.add(pick.id); }
    if (secB.length >= 10) break;
  }
  // Top up if needed from L3
  if (secB.length < 10) {
    for (const q of shuffle(STATIC_QUESTIONS.filter(q => q.difficulty === 3))) {
      if (secB.length >= 10) break;
      if (!usedB.has(q.id) && !usedIds.has(q.id)) { secB.push(q); usedB.add(q.id); }
    }
  }

  const diffLabel = d => ['','⭐ Basic','⭐⭐ Medium','⭐⭐⭐ Hard','🏆 Challenge'][d] || '';
  const chName = id => (CHAPTERS.find(c => c.id === id) || {}).name || id;

  function renderQ(q, num, marks) {
    const stripHTML = s => s.replace(/<[^>]+>/g, '');
    let body = `<div class="q-text">${q.question}`;
    if (q.type === 'mcq' && q.options) {
      body += `<div class="mcq-opts">`;
      ['A','B','C','D'].forEach((ltr, i) => {
        body += `<span class="mcq-opt"><span class="bubble"></span> <b>${ltr}.</b> ${q.options[i] || ''}</span>`;
      });
      body += `</div>`;
    } else {
      body += `<div class="ans-line"><span class="ans-label">Answer:</span><span class="ans-blank"></span></div>`;
    }
    body += `</div>`;
    return `
      <tr class="q-row">
        <td class="q-num">${num}</td>
        <td class="q-body">
          <div class="q-meta">${chName(q.chapterId)}</div>
          ${body}
        </td>
        <td class="q-marks">${marks}</td>
      </tr>`;
  }

  const secARows = secA.slice(0, 30).map((q, i) => renderQ(q, i + 1, 2)).join('');
  const secBRows = secB.slice(0, 10).map((q, i) => renderQ(q, i + 31, 4)).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Grade 5 Mathematics — Mock Exam ${year}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; color: #111; padding: 20px; background: #fff; }
  .no-print { background:#1d4ed8; color:#fff; border:none; padding:10px 22px; font-size:13pt; border-radius:6px; cursor:pointer; margin-bottom:18px; display:inline-block; }
  .no-print:hover { background:#1e40af; }
  @media print { .no-print { display:none; } body { padding:10px; } }

  .paper { max-width: 800px; margin: 0 auto; }
  .header-box { border: 2px solid #111; padding: 12px 16px; margin-bottom: 14px; text-align: center; }
  .header-box .ministry { font-size:8.5pt; letter-spacing:1px; text-transform:uppercase; color:#555; }
  .header-box .title { font-size:15pt; font-weight:bold; margin: 6px 0 2px; text-transform:uppercase; letter-spacing:1px; }
  .header-box .subtitle { font-size:11pt; font-weight:bold; }
  .header-box .meta { display:flex; justify-content:center; gap:30px; margin-top:8px; font-size:9.5pt; }

  .student-box { border: 1px solid #888; padding: 8px 12px; margin-bottom: 14px; display: flex; gap: 30px; font-size: 10pt; }
  .student-field { flex: 1; }
  .student-field .label { font-size: 8pt; color:#555; text-transform:uppercase; letter-spacing:.5px; }
  .student-field .line { border-bottom: 1px solid #555; min-width: 140px; height: 20px; margin-top:2px; }

  .instructions { background: #f8f8f8; border: 1px solid #ccc; padding: 8px 12px; margin-bottom:14px; font-size: 9.5pt; border-radius:4px; }
  .instructions b { display:block; margin-bottom:4px; }

  .section-head { background: #1e3a5f; color: #fff; padding: 6px 12px; font-size: 11pt; font-weight: bold; margin: 14px 0 4px; letter-spacing:.5px; }
  .section-sub { font-size: 9pt; background: #e8eef5; padding: 4px 12px; margin-bottom: 6px; color: #333; }

  table { width: 100%; border-collapse: collapse; }
  .q-row { border-bottom: 1px solid #ddd; }
  .q-row:last-child { border-bottom: 2px solid #888; }
  .q-num { width: 30px; font-weight: bold; padding: 6px 4px 6px 0; vertical-align:top; text-align:right; color:#1e3a5f; font-size:10pt; }
  .q-body { padding: 6px 8px; vertical-align:top; }
  .q-marks { width: 38px; text-align:center; padding: 6px 2px; vertical-align:top; border-left: 1px solid #bbb; font-size: 9.5pt; color:#555; }
  .q-meta { font-size: 7.5pt; color: #888; margin-bottom: 2px; text-transform:uppercase; letter-spacing:.4px; }
  .q-text { font-size: 10.5pt; line-height: 1.5; }

  .mcq-opts { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 6px; font-size:10pt; }
  .mcq-opt { display: flex; align-items: center; gap: 5px; min-width: 140px; }
  .bubble { width: 14px; height: 14px; border: 1.5px solid #333; border-radius: 50%; display:inline-block; flex-shrink:0; }

  .ans-line { display: flex; align-items: flex-end; gap: 6px; margin-top: 8px; }
  .ans-label { font-size: 9pt; color: #555; white-space: nowrap; }
  .ans-blank { flex: 1; max-width: 200px; border-bottom: 1px solid #444; height: 18px; }

  .marks-header { text-align:right; font-size:9pt; color:#555; padding: 3px 4px 3px 0; font-style:italic; }

  .total-row td { border-top: 2px solid #333; padding: 6px 4px; font-weight:bold; font-size:10.5pt; }
  .footer { margin-top: 20px; border-top: 1px solid #bbb; padding-top: 8px; font-size: 8.5pt; color: #777; text-align:center; }
</style>
</head>
<body>
<div class="paper">
  <button class="no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="header-box">
    <div class="ministry">Republic of Mauritius — Ministry of Education</div>
    <div class="title">End-of-Year Assessment ${year}</div>
    <div class="subtitle">Mathematics &nbsp;|&nbsp; Grade 5</div>
    <div class="meta">
      <span><b>Duration:</b> 1 hour 30 minutes</span>
      <span><b>Total Marks:</b> 100</span>
      <span><b>Date:</b> ______________________</span>
    </div>
  </div>

  <div class="student-box">
    <div class="student-field"><div class="label">Full Name</div><div class="line"></div></div>
    <div class="student-field"><div class="label">Class</div><div class="line"></div></div>
    <div class="student-field"><div class="label">Index Number</div><div class="line"></div></div>
  </div>

  <div class="instructions">
    <b>Instructions to candidates:</b>
    Write your name, class and index number in the spaces provided above.
    Answer <b>all</b> questions. For Section A MCQ questions, circle or shade the correct letter.
    For Section B, show all working clearly. Marks may be awarded for correct working.
  </div>

  <!-- SECTION A -->
  <div class="section-head">SECTION A &nbsp;—&nbsp; 60 Marks &nbsp;(Questions 1–30)</div>
  <div class="section-sub">Answer all 30 questions. Each question carries <b>2 marks</b>. Write your answer on the line provided. For MCQ, circle or fill in the correct letter.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secARows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section A Total</td><td style="text-align:center;">/ 60</td></tr>
  </table>

  <!-- SECTION B -->
  <div class="section-head">SECTION B &nbsp;—&nbsp; 40 Marks &nbsp;(Questions 31–40)</div>
  <div class="section-sub">Answer all 10 questions. Each question carries <b>4 marks</b>. Show all working. Read each problem carefully.</div>
  <table>
    <tr><td></td><td></td><td class="marks-header">Marks</td></tr>
    ${secBRows}
    <tr class="total-row"><td colspan="2" style="text-align:right;padding-right:8px;">Section B Total</td><td style="text-align:center;">/ 40</td></tr>
  </table>

  <table style="margin-top:14px;">
    <tr class="total-row">
      <td style="text-align:right;padding-right:8px;border-top:2px solid #333;">GRAND TOTAL</td>
      <td style="text-align:center;border-top:2px solid #333;border-left:1px solid #bbb;width:38px;">/ 100</td>
    </tr>
  </table>

  <div class="footer">
    Generated by PSAC Master · MIE Mauritius Curriculum · psac-master &nbsp;|&nbsp;
    This is a practice paper — not an official MIE document.
  </div>
</div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    toast('⚠️ Please allow pop-ups to open the printable paper.', 4000);
  }
}

function startExamTimer() {
  clearInterval(S.exam.timer);
  S.exam.timer = setInterval(() => {
    const left = Math.max(0, Math.round((S.exam.endTime - Date.now()) / 1000));
    const m = Math.floor(left / 60), s = left % 60;
    const el = document.getElementById('exam-timer');
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (left <= 60) el.classList.add('timer-low'); else el.classList.remove('timer-low');
    if (left === 0) { clearInterval(S.exam.timer); submitExam(); }
  }, 1000);
}

function renderExamQuestion() {
  const q = S.exam.qs[S.exam.idx];
  if (!q) return;
  const ch = CHAPTERS.find(c => c.id === q.chapterId);
  const lvlText = ['','⭐ Basic','⭐⭐ Medium','⭐⭐⭐ Hard','🏆 Word Problem'][q.difficulty] || '';

  document.getElementById('exam-q-badge').textContent = `Q${S.exam.idx + 1}`;
  document.getElementById('exam-q-chapter').textContent = ch ? ch.name : '';
  document.getElementById('exam-q-level').textContent = lvlText;
  document.getElementById('exam-q-num').textContent = S.exam.idx + 1;
  document.getElementById('exam-q-text').innerHTML = q.question;
  document.getElementById('exam-hint-box').classList.add('hidden');

  const saved = S.exam.answers[S.exam.idx];
  renderAnswerArea(q, 'exam-answer-area', saved, false);

  // Update progress
  const pct = ((S.exam.idx) / S.exam.qs.length) * 100;
  document.getElementById('exam-progress-bar').style.width = pct + '%';

  // Nav
  document.getElementById('exam-prev-btn').disabled = S.exam.idx === 0;
  document.getElementById('exam-next-btn').textContent = S.exam.idx === S.exam.qs.length - 1 ? 'Review →' : 'Next →';
  updateNavGrid();

  const flagBtn = document.getElementById('exam-flag-btn');
  flagBtn.textContent = S.exam.flagged.has(S.exam.idx) ? '🚩 Flagged' : '🚩 Flag';
}

function renderExamNavGrid() {
  const grid = document.getElementById('exam-nav-grid');
  grid.innerHTML = S.exam.qs.map((_, i) => {
    let cls = 'nav-btn unanswered';
    if (S.exam.flagged.has(i)) cls = 'nav-btn flagged';
    else if (S.exam.answers[i] != null) cls = 'nav-btn answered';
    if (i === S.exam.idx) cls = 'nav-btn current';
    return `<button class="${cls}" onclick="examGoTo(${i})">${i+1}</button>`;
  }).join('');
}
function updateNavGrid() {
  const btns = document.querySelectorAll('#exam-nav-grid .nav-btn');
  btns.forEach((btn, i) => {
    btn.className = 'nav-btn ';
    if (S.exam.flagged.has(i)) btn.className += 'flagged';
    else if (S.exam.answers[i] != null) btn.className += 'answered';
    else btn.className += 'unanswered';
    if (i === S.exam.idx) btn.className = 'nav-btn current';
  });
}
window.examGoTo = (i) => { saveCurrentExamAnswer(); S.exam.idx = i; renderExamQuestion(); };

function saveCurrentExamAnswer() {
  const q = S.exam.qs[S.exam.idx];
  const ans = getSelectedAnswer('exam-answer-area', q?.type);
  if (ans != null && ans !== '') S.exam.answers[S.exam.idx] = ans;
}

document.getElementById('exam-prev-btn').addEventListener('click', () => {
  saveCurrentExamAnswer(); if (S.exam.idx > 0) { S.exam.idx--; renderExamQuestion(); }
});
document.getElementById('exam-next-btn').addEventListener('click', () => {
  saveCurrentExamAnswer();
  if (S.exam.idx < S.exam.qs.length - 1) { S.exam.idx++; renderExamQuestion(); }
});
document.getElementById('exam-flag-btn').addEventListener('click', () => {
  S.exam.flagged.has(S.exam.idx) ? S.exam.flagged.delete(S.exam.idx) : S.exam.flagged.add(S.exam.idx);
  document.getElementById('exam-flag-btn').textContent = S.exam.flagged.has(S.exam.idx) ? '🚩 Flagged' : '🚩 Flag';
  updateNavGrid();
});
document.getElementById('exam-hint-btn').addEventListener('click', () => {
  const q = S.exam.qs[S.exam.idx];
  document.getElementById('exam-hint-text').textContent = q?.hint || 'No hint available.';
  document.getElementById('exam-hint-box').classList.toggle('hidden');
});
document.getElementById('exit-exam-btn').addEventListener('click', () => {
  if (confirm('Exit this exam? All your answers will be lost.')) {
    clearInterval(S.exam.timer);
    S.exam.qs = []; S.exam.answers = {}; S.exam.flagged = new Set();
    showScreen('dashboard');
  }
});
document.getElementById('submit-exam-btn').addEventListener('click', () => {
  if (confirm('Submit your exam now? You can\'t go back after submission.')) submitExam();
});

function submitExam() {
  clearInterval(S.exam.timer);
  saveCurrentExamAnswer();
  const timeTaken = Math.round((S.exam.duration - Math.max(0, (S.exam.endTime - Date.now()) / 1000)));
  let correct = 0;
  const chapterStats = {};
  S.exam.qs.forEach((q, i) => {
    if (!chapterStats[q.chapterId]) chapterStats[q.chapterId] = { name: CHAPTERS.find(c=>c.id===q.chapterId)?.name||q.chapterId, total: 0, correct: 0 };
    chapterStats[q.chapterId].total++;
    const ans = S.exam.answers[i];
    const ok = ans != null && checkAnswer(q, ans);
    if (ok) { correct++; chapterStats[q.chapterId].correct++; }
    recordAnswer(q.chapterId, ok);
  });
  const total = S.exam.qs.length;
  const pct = Math.round(correct / total * 100);
  DB.stats.examCount++;
  if (pct > DB.stats.bestScore) DB.stats.bestScore = pct;
  DB.examHistory.unshift({ date: new Date().toLocaleDateString(), pct, correct, total, type: S.exam.type || 'exam' });
  if (DB.examHistory.length > 20) DB.examHistory.pop();
  save(DB);
  if (pct >= 80) launchConfetti();
  renderResults(correct, total, pct, timeTaken, chapterStats);
  showScreen('results');
}

function renderResults(correct, total, pct, timeTaken, chapterStats) {
  const banner = document.getElementById('results-banner');
  const emoji = pct>=90?'🏆':pct>=70?'🎉':pct>=50?'👍':'💪';
  const grade = pct>=90?'Outstanding — A+':pct>=80?'Excellent — A':pct>=70?'Good — B':pct>=60?'Satisfactory — C':pct>=50?'Pass — D':'Needs more practice — Try again!';
  const cls = pct>=70?'banner-a':pct>=50?'banner-b':pct>=30?'banner-c':'banner-f';
  banner.className = `rounded-2xl p-8 text-white text-center shadow-xl ${cls}`;
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-score').textContent = `${pct}%`;
  document.getElementById('result-grade').textContent = grade;
  const m = Math.floor(timeTaken/60), s = timeTaken%60;
  document.getElementById('result-details').textContent = `${correct} / ${total} correct · ${m}m ${s}s`;

  // Chapter breakdown
  document.getElementById('results-chapter-breakdown').innerHTML = Object.entries(chapterStats).map(([id, st]) => {
    const p = Math.round(st.correct/st.total*100);
    const col = p>=80?'#22c55e':p>=50?'#f59e0b':'#ef4444';
    return `<div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-700 dark:text-gray-300">${st.name}</span>
        <span class="font-bold" style="color:${col}">${st.correct}/${st.total} (${p}%)</span>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${p}%;background:${col}"></div></div>
    </div>`;
  }).join('');

  // Question review
  document.getElementById('results-review').innerHTML = S.exam.qs.map((q, i) => {
    const ua = S.exam.answers[i];
    const ok = ua != null && checkAnswer(q, ua);
    const ch = CHAPTERS.find(c=>c.id===q.chapterId);
    return `<div class="border-l-4 ${ok?'border-green-400':'border-red-400'} pl-4 py-2">
      <div class="flex items-start gap-2">
        <span class="text-lg shrink-0">${ok?'✅':'❌'}</span>
        <div class="flex-1 text-sm">
          <div class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Q${i+1} · ${ch?.name||''}</div>
          <div class="font-medium text-gray-800 dark:text-gray-200">${q.question}</div>
          ${!ok?`<div class="mt-1 text-red-600 dark:text-red-400">Your answer: ${ua||'(not answered)'}</div>`:''}
          <div class="mt-1 text-green-600 dark:text-green-400 font-medium">✓ Correct: ${q.answer}</div>
          <div class="mt-1 text-gray-500 dark:text-gray-400 text-xs">${q.explanation}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

document.getElementById('new-exam-btn').addEventListener('click', () => showScreen('exam-config'));
document.getElementById('results-home-btn').addEventListener('click', () => showScreen('dashboard'));

// ── PRACTICE MODE ─────────────────────────────
document.getElementById('practice-back-btn').addEventListener('click', () => {
  S.practice.difficulty = 1; // reset from any subsection mode
  showScreen('chapter-select');
});

document.getElementById('difficulty-btns').addEventListener('click', e => {
  const btn = e.target.closest('.diff-btn');
  if (!btn) return;
  const level = parseInt(btn.dataset.level);
  S.practice.difficulty = level;
  S.practice.idx = 0;
  S.practice.qs = [];
  updateDiffBtns(level);
  loadPracticeQuestion();
});

function updateDiffBtns(active) {
  const maxDiff = DB.restrictions?.maxDifficulty ?? 4;
  document.querySelectorAll('.diff-btn').forEach(b => {
    const lv = parseInt(b.dataset.level);
    const locked = lv > maxDiff;
    b.classList.toggle('active', active !== null && lv === active);
    b.classList.toggle('opacity-30', locked);
    b.classList.toggle('cursor-not-allowed', locked);
    b.title = locked ? '🔒 This difficulty is locked by your parent' : '';
    b.disabled = locked;
  });
  const labels = ['','⭐ Level 1 — Basic','⭐⭐ Level 2 — Medium','⭐⭐⭐ Level 3 — Hard','🏆 Level 4 — Word Problems'];
  document.getElementById('practice-diff-badge').textContent = active === null ? '📋 Topic Practice' : (labels[active] || '');
}

function loadPracticeQuestion() {
  if (!S.practice.qs.length || S.practice.idx >= S.practice.qs.length) {
    // Subsection mode (difficulty===null) — don't reload with chapter generator
    if (S.practice.difficulty !== null) {
      S.practice.qs = getQuestionsForChapter(S.practice.chapterId, S.practice.difficulty, 20);
    }
    S.practice.idx = 0;
  }
  const q = S.practice.qs[S.practice.idx];
  if (!q) return;

  // Progress bar
  const _pbar = document.getElementById('practice-progress-bar');
  if (_pbar && S.practice.qs.length > 1) {
    const _pct = Math.round(S.practice.idx / S.practice.qs.length * 100);
    _pbar.style.width = _pct + '%';
  }

  // Question entrance animation
  const _qText = document.getElementById('practice-q-text');
  if (_qText) {
    _qText.classList.remove('question-enter');
    void _qText.offsetWidth; // force reflow
    _qText.innerHTML = q.question;
    _qText.classList.add('question-enter');
  } else {
    document.getElementById('practice-q-text').innerHTML = q.question;
  }

  document.getElementById('practice-hint-box').classList.add('hidden');
  S.practice.hintShown = false;
  document.getElementById('practice-q-counter').textContent =
    `Question ${S.practice.idx + 1} of ${S.practice.qs.length}`;
  document.getElementById('practice-feedback').classList.add('hidden');
  document.getElementById('practice-submit-btn').classList.remove('hidden');
  document.getElementById('practice-next-btn').classList.add('hidden');
  renderAnswerArea(q, 'practice-answer-area', null, false);
  updateSessionStats();
}

document.getElementById('practice-hint-btn').addEventListener('click', () => {
  const q = S.practice.qs[S.practice.idx];
  document.getElementById('practice-hint-text').textContent = q?.hint || 'No hint.';
  document.getElementById('practice-hint-box').classList.toggle('hidden');
  S.practice.hintShown = true;
});

document.getElementById('practice-submit-btn').addEventListener('click', practiceSubmit);
document.getElementById('practice-next-btn').addEventListener('click', practiceNext);

function practiceSubmit() {
  const q = S.practice.qs[S.practice.idx];
  const ua = getSelectedAnswer('practice-answer-area', q?.type);
  if (q?.type !== 'symmetry' && !ua) { toast('Please answer the question first! 📝'); return; }
  const ok = checkAnswer(q, ua);

  // ── TEST MODE: record silently, advance immediately ──────────────
  if (ASSIGNMENT_IS_TEST) {
    ASSIGNMENT_TEST_ANSWERS.push({
      question:      q.question,
      userAnswer:    ua || '—',
      correctAnswer: q.answer,
      correct:       ok,
      explanation:   q.explanation || '',
    });
    ASSIGNMENT_SCORE.attempted++;
    if (ok) ASSIGNMENT_SCORE.correct++;
    S.practice.session.attempted++;
    if (ok) S.practice.session.correct++;
    updateSessionStats();

    const isLast = S.practice.idx >= S.practice.qs.length - 1;
    if (isLast) {
      _submitTestAssignment();
    } else {
      S.practice.idx++;
      loadPracticeQuestion();
    }
    return;
  }
  // ── PRACTICE MODE (existing behaviour) ──────────────────────────

  // Combo + sounds (before rendering so float appears at correct time)
  if (ok) {
    _comboStreak++;
    _floatXP(XP_PER_ANSWER);
    _playSound('correct');
    _showCombo(_comboStreak);
  } else {
    _comboStreak = 0;
    _playSound('wrong');
  }

  // show correct/wrong state
  renderAnswerArea(q, 'practice-answer-area', ua, true);

  // Feedback
  const answerLine = q.type === 'symmetry'
    ? 'The correct cells are shown in <b style="color:#22c55e">green</b>. Missed cells in orange, wrong selections in red.'
    : `Not quite. Correct answer: <b>${q.answer}</b>`;
  const fb = document.getElementById('practice-feedback');
  fb.className = `mb-4 p-4 rounded-xl ${ok ? 'feedback-correct' : 'feedback-wrong'}`;
  fb.innerHTML = `
    <div class="flex items-start gap-3">
      <span class="text-2xl">${ok ? '🎉' : '💡'}</span>
      <div>
        <div class="font-bold mb-1">${ok ? 'Correct! Well done!' : answerLine}</div>
        <div class="text-sm">${q.explanation}</div>
      </div>
    </div>`;
  // Entrance animation — remove old class first, force reflow, re-add
  fb.classList.remove('hidden', 'feedback-pop', 'feedback-shake');
  void fb.offsetWidth;
  fb.classList.add(ok ? 'feedback-pop' : 'feedback-shake');

  // Stats
  S.practice.session.attempted++;
  if (ok) S.practice.session.correct++;
  recordAnswer(S.practice.chapterId, ok);
  updateSessionStats();

  document.getElementById('practice-submit-btn').classList.add('hidden');
  document.getElementById('practice-next-btn').classList.remove('hidden');
}

function practiceNext() {
  S.practice.idx++;
  if (S.practice.idx >= S.practice.qs.length) {
    if (ASSIGNMENT_MODE) {
      showAssignmentComplete();
      return;
    }
    if (S.practice.difficulty !== null) {
      S.practice.qs = getQuestionsForChapter(S.practice.chapterId, S.practice.difficulty, 20);
    }
    S.practice.idx = 0;
    toast('🔄 New set of questions loaded!', 2000);
  }
  loadPracticeQuestion();
}

// ── ASSIGNMENT MODE FUNCTIONS ─────────────────
function renderAssignmentEntrance(config) {
  ASSIGNMENT_CONFIG = config;
  const chNames = (config.chapters || []).map(cid => {
    const ch = CHAPTERS.find(c => c.id === cid);
    return ch ? `${ch.icon} ${ch.name}` : cid;
  });
  const diffLabel = !config.difficulty ? 'Mixed levels' : `Level ${config.difficulty}`;
  const el = id => document.getElementById(id);
  if (el('assign-title'))  el('assign-title').textContent  = config.label || 'Assignment';
  if (el('assign-meta'))   el('assign-meta').textContent   =
    `${chNames.join(', ') || 'All chapters'} · ${diffLabel} · ${config.count || 10} questions`;
  if (el('assign-random-badge')) el('assign-random-badge').classList.toggle('hidden', !config.random);
}

window.startAssignmentPractice = function() {
  const nameInput = document.getElementById('assign-student-name');
  const name = (nameInput?.value || '').trim();
  if (!name) { toast('Please enter your name first! 📝', 2000); return; }

  const cfg = ASSIGNMENT_CONFIG;

  // Block / allow re-attempt for test-mode assignments
  if (cfg.mode === 'test' && typeof TeacherMode !== 'undefined') {
    const attempts = TeacherMode.getAttemptCount(cfg.id, name);
    if (attempts > 0) {
      const hasRetry = TeacherMode.hasRetry(cfg.id, name);
      if (hasRetry) {
        toast('🔄 Retry granted by your teacher. Good luck!', 2500);
      } else {
        toast('You already submitted this test. Ask your teacher if you need to retry.', 4000);
        return;
      }
    }
  }

  ASSIGNMENT_STUDENT_NAME = name;
  ASSIGNMENT_MODE         = true;
  ASSIGNMENT_IS_TEST      = cfg.mode === 'test';
  ASSIGNMENT_SCORE        = { attempted: 0, correct: 0 };
  ASSIGNMENT_TEST_ANSWERS = [];

  // Reset breakdown div so stale test results don't appear in practice mode
  const _bd = document.getElementById('asgn-complete-breakdown');
  if (_bd) { _bd.innerHTML = ''; _bd.classList.add('hidden'); }

  // Build question pool from config
  let pool = STATIC_QUESTIONS;
  if (cfg.chapters && cfg.chapters.length) pool = pool.filter(q => cfg.chapters.includes(q.chapterId));
  if (cfg.difficulty)                      pool = pool.filter(q => q.difficulty === cfg.difficulty);
  if (cfg.random !== false)                pool = shuffle([...pool]);
  const questions = pool.slice(0, cfg.count || 10);

  if (!questions.length) {
    toast('No questions available for this assignment. Please contact your teacher.', 4000);
    ASSIGNMENT_MODE = false;
    return;
  }

  // Load into practice state
  S.practice.chapterId = cfg.chapters?.[0] || 'assignment';
  S.practice.difficulty = cfg.difficulty || null;
  S.practice.qs         = questions;
  S.practice.idx        = 0;
  S.practice.hintShown  = false;
  S.practice.session    = { attempted: 0, correct: 0 };

  showScreen('practice');
  document.getElementById('practice-ch-name').textContent = `📋 ${cfg.label || 'Assignment'}`;
  document.getElementById('practice-back-btn').classList.add('hidden');
  document.getElementById('difficulty-btns').classList.add('hidden');
  updateDiffBtns(null);

  if (ASSIGNMENT_IS_TEST) {
    document.getElementById('practice-hint-btn').classList.add('hidden');
    document.getElementById('practice-submit-btn').textContent = '→ Submit Answer';
  }

  loadPracticeQuestion();
};

function _submitTestAssignment() {
  const { attempted, correct } = ASSIGNMENT_SCORE;
  const pct = attempted ? Math.round(correct / attempted * 100) : 0;

  // Save result to teacher dashboard
  if (typeof TeacherMode !== 'undefined' && ASSIGNMENT_CONFIG?.id) {
    TeacherMode.saveResult(ASSIGNMENT_CONFIG.id, ASSIGNMENT_STUDENT_NAME, {
      score:   correct,
      total:   attempted,
      pct,
      answers: ASSIGNMENT_TEST_ANSWERS.map(a => ({
        question:      a.question,
        userAnswer:    a.userAnswer,
        correctAnswer: a.correctAnswer,
        correct:       a.correct,
      })),
      timestamp: Date.now(),
    });
  }

  // Render per-question breakdown on the complete screen
  const breakdown = document.getElementById('asgn-complete-breakdown');
  if (breakdown) {
    breakdown.innerHTML = ASSIGNMENT_TEST_ANSWERS.map((a, i) => `
      <div class="flex items-start gap-3 p-3 rounded-xl text-sm mb-2
        ${a.correct ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}">
        <span class="text-base shrink-0 mt-0.5">${a.correct ? '✅' : '❌'}</span>
        <div class="flex-1 min-w-0">
          <div class="text-gray-800 dark:text-white font-medium mb-1">Q${i + 1}: ${a.question}</div>
          ${!a.correct
            ? `<div class="text-xs text-red-600 dark:text-red-400 mb-0.5">Your answer: <b>${a.userAnswer}</b> &nbsp;·&nbsp; Correct: <b>${a.correctAnswer}</b></div>`
            : ''}
          <div class="text-xs text-gray-500 dark:text-gray-400">${a.explanation}</div>
        </div>
      </div>`).join('');
    breakdown.classList.remove('hidden');
  }

  ASSIGNMENT_IS_TEST = false;
  showAssignmentComplete();
}

function showAssignmentComplete() {
  const { attempted, correct } = ASSIGNMENT_SCORE;
  const pct   = attempted ? Math.round(correct / attempted * 100) : 0;
  const grade = pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good job!' : pct >= 40 ? '📚 Keep practising!' : '💪 You can do it!';
  const el    = id => document.getElementById(id);

  // Notify parent by email (fire-and-forget, only on Netlify)
  if (location.protocol !== 'file:' && ASSIGNMENT_CONFIG) {
    const sess = typeof Store !== 'undefined' && Store.getStudentSession();
    if (sess?.id) {
      fetch('/.netlify/functions/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Student-Id': sess.id },
        body: JSON.stringify({
          studentId:       sess.id,
          assignmentLabel: ASSIGNMENT_CONFIG.label || 'Assignment',
          score:           correct,
          total:           attempted,
          pct,
        }),
      }).catch(() => {});
    }
  }

  if (el('asgn-complete-name'))  el('asgn-complete-name').textContent  = ASSIGNMENT_STUDENT_NAME;
  if (el('asgn-complete-score')) el('asgn-complete-score').textContent = `${correct} / ${attempted}`;
  if (el('asgn-complete-pct'))   el('asgn-complete-pct').textContent   = `${pct}%`;
  if (el('asgn-complete-grade')) el('asgn-complete-grade').textContent = grade;
  if (el('asgn-complete-title')) el('asgn-complete-title').textContent = ASSIGNMENT_CONFIG?.label || 'Assignment';

  ASSIGNMENT_MODE    = false;
  ASSIGNMENT_IS_TEST = false;

  // Restore practice screen
  document.getElementById('practice-back-btn')?.classList.remove('hidden');
  document.getElementById('difficulty-btns')?.classList.remove('hidden');
  document.getElementById('practice-hint-btn')?.classList.remove('hidden');
  const submitBtn = document.getElementById('practice-submit-btn');
  if (submitBtn) submitBtn.textContent = '✅ Check Answer';

  if (pct >= 80) launchConfetti();
  showScreen('assignment-complete');
}

function updateSessionStats() {
  const { attempted, correct } = S.practice.session;
  document.getElementById('sess-attempted').textContent = attempted;
  document.getElementById('sess-correct').textContent = correct;
  document.getElementById('sess-acc').textContent = attempted ? Math.round(correct/attempted*100)+'%' : '—';
}

// ── ANALYTICS ─────────────────────────────────
document.getElementById('analytics-btn').addEventListener('click', () => showScreen('analytics'));

function renderAnalytics() {
  const acc = DB.stats.totalAttempted ? Math.round(DB.stats.totalCorrect / DB.stats.totalAttempted * 100) : 0;
  document.getElementById('a-total').textContent = DB.stats.totalAttempted;
  document.getElementById('a-acc').textContent = acc + '%';
  document.getElementById('a-streak').textContent = DB.stats.streak + '🔥';
  document.getElementById('a-exams').textContent = DB.stats.examCount;

  document.getElementById('analytics-chapters').innerHTML = CHAPTERS.map(ch => {
    const c = DB.chapters[ch.id] || { attempted: 0, correct: 0 };
    const p = c.attempted ? Math.round(c.correct/c.attempted*100) : 0;
    const col = p>=80?'#22c55e':p>=50?'#f59e0b':'#ef4444';
    return `<div>
      <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-700 dark:text-gray-300">${ch.icon} ${ch.name}</span>
        <span class="font-bold" style="color:${col}">${c.correct}/${c.attempted} (${p}%)</span>
      </div>
      <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${p}%;background:${col}"></div></div>
    </div>`;
  }).join('');

  const hist = document.getElementById('exam-history-list');
  if (!DB.examHistory.length) {
    hist.innerHTML = '<p class="text-sm text-gray-400 dark:text-gray-500">No exams yet. Take your first exam!</p>';
  } else {
    hist.innerHTML = DB.examHistory.map(e => {
      const col = e.pct>=80?'text-green-600 dark:text-green-400':e.pct>=50?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400';
      return `<div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <span class="text-sm text-gray-600 dark:text-gray-400">${e.date} · ${e.total}Q exam</span>
        <span class="font-bold ${col}">${e.pct}% (${e.correct}/${e.total})</span>
      </div>`;
    }).join('');
  }
}

document.getElementById('export-btn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `psac-master-progress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  toast('📥 Progress exported!');
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset ALL progress? This cannot be undone.')) {
    DB = defaultStore();
    save(DB);
    toast('🗑 Progress reset.');
    renderAnalytics();
  }
});

// ── SYLLABUS BROWSER ──────────────────────────
function renderSyllabus() {
  const list = document.getElementById('syllabus-list');
  if (!list) return;

  list.innerHTML = CHAPTERS.map(ch => {
    const syl = SYLLABUS[ch.id];
    const subsections = syl ? syl.subsections : [];
    const chPct = getChapterPct(ch.id);
    const chColor = chPct >= 80 ? '#22c55e' : chPct >= 50 ? '#f59e0b' : '#3b82f6';

    const subsHTML = subsections.map(sub => {
      // Count questions tagged with this subsection
      const qCount = STATIC_QUESTIONS.filter(q =>
        q.chapterId === ch.id && q.subsection === sub.id
      ).length;
      const hasQs = qCount >= 1;
      const statusDot = hasQs
        ? `<span class="text-xs text-green-600 dark:text-green-400 font-medium">${qCount} questions</span>`
        : `<span class="text-xs text-gray-400">practice available</span>`;

      return `<div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <span class="text-gray-400">▸</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 truncate">${sub.name}</span>
          <span class="shrink-0">${statusDot}</span>
        </div>
        <button class="shrink-0 ml-3 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors font-medium"
          onclick="startSubsectionPractice('${ch.id}','${sub.id}','${sub.name.replace(/'/g, "\\'")}')">
          Practise →
        </button>
      </div>`;
    }).join('');

    return `<div class="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${ch.icon}</span>
          <div>
            <span class="font-bold text-gray-800 dark:text-white">${ch.name}</span>
            <span class="ml-2 text-xs text-gray-400">Part ${ch.part}</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold" style="color:${chColor}">${chPct}%</span>
          <button class="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            onclick="event.stopPropagation();startChapterDirect('${ch.id}')">All levels →</button>
          <span class="text-gray-400 text-sm">▾</span>
        </div>
      </div>
      <div class="px-5 py-1">${subsHTML || '<p class="text-sm text-gray-400 py-3">No subsections defined yet.</p>'}</div>
    </div>`;
  }).join('');
}

window.startSubsectionPractice = function(chapterId, subsectionId, subsectionName) {
  S.practice.chapterId = chapterId;
  S.practice.difficulty = null; // subsection mode — no level filter
  S.practice.qs = getQuestionsForSubsection(chapterId, subsectionId, 20);
  S.practice.idx = 0;
  S.practice.session = { attempted: 0, correct: 0 };
  loadPracticeQuestion();
  showScreen('practice');
  const ch = CHAPTERS.find(c => c.id === chapterId);
  document.getElementById('practice-ch-name').textContent =
    `${ch ? ch.icon : ''} ${ch ? ch.name : chapterId} — ${subsectionName}`;
  updateDiffBtns(null);
  setTimeout(() => initScratchpad('scratchpad-practice'), 100);
};

// ── FORMULA MODAL ─────────────────────────────
window.showFormulaModal = function() {
  const chId = S.practice.chapterId;
  const f = FORMULAS[chId];
  if (!f) { toast('No formula card for this chapter yet.', 2000); return; }
  document.getElementById('formula-title').textContent = f.title;
  document.getElementById('formula-list').innerHTML = f.facts.map(fact =>
    `<li class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
      <span class="text-blue-500 mt-0.5 shrink-0">▸</span>
      <span>${fact}</span>
    </li>`
  ).join('');
  document.getElementById('formula-modal').style.display = 'flex';
};

window.closeFormulaModal = function() {
  document.getElementById('formula-modal').style.display = 'none';
};

// Close formula modal when clicking backdrop
document.getElementById('formula-modal').addEventListener('click', function(e) {
  if (e.target === this) closeFormulaModal();
});

// ── HELP MODAL ────────────────────────────────
window.showHelpModal = function() {
  const chId = S.practice.chapterId;
  const h = (typeof CHAPTER_HELP !== 'undefined') && CHAPTER_HELP[chId];
  if (!h) { toast('No help content for this chapter yet.', 2000); return; }

  const ch = CHAPTERS.find(c => c.id === chId);
  document.getElementById('help-chapter-title').textContent =
    `${ch ? ch.icon + ' ' : ''}${ch ? ch.name : chId} — Video Help`;
  document.getElementById('help-video-credit').textContent =
    `"${h.title}" · ${h.channel}`;

  const frame  = document.getElementById('help-video-frame');
  const ytLink = document.getElementById('help-yt-link');
  frame.src = `https://www.youtube.com/embed/${h.videoId}?rel=0`;
  if (ytLink) ytLink.href = `https://www.youtube.com/watch?v=${h.videoId}`;

  document.getElementById('help-bullets').innerHTML = h.bullets.map(b =>
    `<li class="flex gap-2"><span class="shrink-0">&bull;</span><span>${b}</span></li>`
  ).join('');

  document.getElementById('help-modal').style.display = 'flex';
};

window.closeHelpModal = function() {
  document.getElementById('help-video-frame').src = '';
  document.getElementById('help-modal').style.display = 'none';
};

document.getElementById('help-modal').addEventListener('click', function(e) {
  if (e.target === this) closeHelpModal();
});

// ── WEAK AREA DRILL ───────────────────────────
function startWeakAreaDrill() {
  // Find chapters with accuracy < 60% (or never attempted → treat as 0%)
  const weakChapters = CHAPTERS
    .map(ch => ({ id: ch.id, pct: getChapterPct(ch.id) }))
    .filter(ch => ch.pct < 60)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3); // target 3 weakest

  if (!weakChapters.length) {
    // All strong — just do a random drill
    toast('Great job! No weak areas found. Starting random drill.', 2500);
    startExam('drill');
    return;
  }

  const weakIds = weakChapters.map(c => c.id);
  const pool = shuffle(STATIC_QUESTIONS.filter(q =>
    weakIds.includes(q.chapterId) && q.difficulty >= 1 && q.difficulty <= 3
  )).slice(0, 15);

  if (!pool.length) { startExam('drill'); return; }

  const chNames = weakChapters.map(c => {
    const ch = CHAPTERS.find(x => x.id === c.id);
    return ch ? ch.name : c.id;
  }).join(', ');

  toast(`💪 Targeting: ${chNames}`, 3000);

  S.exam.qs = pool;
  S.exam.answers = {};
  S.exam.flagged = new Set();
  S.exam.idx = 0;
  S.exam.type = 'weak';
  S.exam.duration = 15 * 60;
  S.exam.endTime = Date.now() + S.exam.duration * 1000;
  showScreen('exam');
  renderExamNavGrid();
  renderExamQuestion();
  startExamTimer();
  document.getElementById('exam-q-total').textContent = S.exam.qs.length;
}

// ── STUDENT SELECTOR ──────────────────────────
function renderStudentSelect() {
  const container = document.getElementById('student-cards');
  if (!container) return;
  const accounts = Store.getAccounts();
  if (!accounts.length) { Auth.init(); return; }
  container.innerHTML = accounts.map(acc => {
    const d     = Store.loadStudent(acc.id);
    const lname = LEVEL_NAMES[Math.min((d.level || 1) - 1, LEVEL_NAMES.length - 1)];
    return `<button class="track-card group flex flex-col items-center text-center w-40"
        onclick="Auth.loginStudent('${acc.id}')">
      <div class="text-5xl mb-3 select-none">${acc.avatar}</div>
      <div class="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${acc.name}</div>
      <div class="text-xs text-gray-400 mt-1">⭐ Lv.${d.level||1} ${lname}</div>
      <div class="text-xs text-gray-400">${d.xp||0} XP</div>
    </button>`;
  }).join('');
}

// ── GRADE SELECTOR ────────────────────────────
function renderGradeSelect() {
  const container = document.getElementById('grade-cards');
  if (!container) return;
  const packs = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];

  // Unique grades, sorted
  const grades = [...new Set(packs.map(p => p.grade))].sort((a, b) => a - b);

  container.innerHTML = grades.map(grade => {
    const gradePacks = packs.filter(p => p.grade === grade);
    const hasActive  = gradePacks.some(p => !p.comingSoon);
    const soon       = !hasActive;
    const subjects   = gradePacks.map(p => p.subject).join(' · ');
    const count      = gradePacks.length;
    const click      = soon
      ? `toast('Grade ${grade} is coming soon! 🚀', 2000)`
      : `selectGrade(${grade})`;

    return `
      <button type="button" class="track-card ${soon ? 'opacity-70 cursor-default' : 'cursor-pointer group'} relative text-left"
        onclick="${click}" ${soon ? 'disabled' : ''}>
        ${soon ? '<div class="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</div>' : ''}
        <div class="text-4xl mb-3 select-none">${soon ? '🔜' : '🎓'}</div>
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-1 ${soon ? '' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors">
          Grade ${grade}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">
          ${soon ? 'Coming soon — check back later!' : `${count} subject${count !== 1 ? 's' : ''} available`}
        </p>
        ${!soon ? `<div class="flex flex-wrap gap-2"><span class="chip blue">${subjects}</span></div>` : ''}
      </button>`;
  }).join('');
}

window.selectGrade = function(grade) {
  SELECTED_GRADE = grade;
  showScreen('subject-select');
};

// ── SUBJECT SELECTOR ──────────────────────────
function renderSubjectSelect() {
  const container = document.getElementById('subject-cards');
  if (!container) return;

  // Filter to selected grade; fall back to all if none chosen
  const all   = typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : [];
  const packs = SELECTED_GRADE ? all.filter(p => p.grade === SELECTED_GRADE) : all;

  // Update heading
  const heading = document.getElementById('subject-select-heading');
  if (heading) heading.textContent = SELECTED_GRADE ? `Grade ${SELECTED_GRADE} — Choose a Subject` : 'Choose a Subject';

  container.innerHTML = packs.map(pack => {
    const soon  = !!pack.comingSoon;
    const clsOp = soon ? 'opacity-70 cursor-default' : 'cursor-pointer group';
    const badge = soon
      ? '<span class="chip amber">Coming Soon</span>'
      : `<span class="chip blue">${pack.chapters.length} chapters</span>`;
    const onclk = soon ? `toast('Coming soon!', 2000)` : `selectSubject('${pack.id}')`;
    return `
      <button type="button" class="track-card ${clsOp} relative text-left" onclick="${onclk}" ${soon ? 'disabled' : ''}>
        ${soon ? '<div class="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">Coming Soon</div>' : ''}
        <div class="text-4xl mb-3 select-none">${pack.icon}</div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1 ${soon ? '' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors">
          ${pack.subject}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${pack.curriculum}</p>
        <div class="flex flex-wrap gap-2">${badge}</div>
      </button>`;
  }).join('');
}

window.selectSubject = function(id) {
  const pack = (typeof SUBJECT_PACKS !== 'undefined' ? SUBJECT_PACKS : []).find(p => p.id === id);
  if (pack && pack.comingSoon) { toast(`${pack.name} Grade ${pack.grade} is coming soon! 🚀`, 2500); return; }
  showScreen('dashboard');
};

// ── INIT ──────────────────────────────────────
document.getElementById('clear-scratch-practice').addEventListener('click', () => clearScratch('scratchpad-practice'));
document.getElementById('clear-scratch-exam').addEventListener('click', () => clearScratch('scratchpad-exam'));

// Animate mastery bars after a short delay (so CSS transition fires)
setTimeout(() => { document.querySelectorAll('.mastery-bar-fill').forEach(el => { el.style.width = el.style.width; }); }, 100);

// Init scratchpads when their screen becomes visible
const practiceObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-practice')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-practice');
  }
});
const examObserver = new MutationObserver(() => {
  if (!document.getElementById('screen-exam')?.classList.contains('hidden')) {
    initScratchpad('scratchpad-exam');
  }
});
const pScreen = document.getElementById('screen-practice');
const eScreen = document.getElementById('screen-exam');
if (pScreen) practiceObserver.observe(pScreen, { attributes: true, attributeFilter: ['class'] });
if (eScreen) examObserver.observe(eScreen, { attributes: true, attributeFilter: ['class'] });

console.log(`✅ PSAC Master loaded. ${STATIC_QUESTIONS.length} static questions across ${CHAPTERS.length} chapters.`);

// ── OFFLINE DETECTION (K) ─────────────────────
(function _initOffline() {
  const banner = document.getElementById('offline-banner');
  if (!banner) return;
  function _update() {
    banner.classList.toggle('hidden', navigator.onLine);
  }
  window.addEventListener('online',  _update);
  window.addEventListener('offline', _update);
  _update(); // set correct state on load
}());
