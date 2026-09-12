'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Physical & Chemical Changes (Science, Grades 7 and 8)
//
//  "The Change Lab" — ten scenarios, each animated on canvas.
//  The child watches, then classifies the change (physical / chemical),
//  chips in their reasoning, and unlocks a Discovery card.
//  Grade 8 sees an extra layer: which observable signs are present?
//
//  ⚠ All science (scenario names, classifications, signs, word equations,
//    discovery text) comes from lab_changes_data.js (LabChangesData).
//    This file only animates and handles interaction.
//  ⚠ Only the <canvas> animates. Nothing here adds transform/filter to
//    .screen or its ancestors (ui-css.md).
//  ⚠ Calm Mode / prefers-reduced-motion: the animation still shows the
//    scenario state, but nothing moves between frames.
//  ⚠ LAB_SPEC §9: Labs.grade() is 7 or 8. Guides, missions and
//    discoveries are filtered by grade before anything is shown.
// ══════════════════════════════════════════════
const LabChanges = (() => {
  const ID = 'changes';
  const FRAME_MS = 1000 / 30;
  const WATCH_DUR = 3.0;     // seconds before classify chips appear
  const ANIM_DUR = 2.8;      // seconds for the scenario animation to complete

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const D = () => LabChangesData;

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _resizeWired = false;
  let _grade = null;
  let _current = null;     // scenario object
  let _phaseT = 0;         // seconds since scenario started
  let _phase = 'idle';     // 'idle' | 'watch' | 'classify' | 'reveal'
  let _chips = null;       // { newSub: null|bool, reversible: null|bool }
  let _signsChosen = null; // Set of sign ids chosen (Grade 8)
  let _signsFound = null;  // Set of all sign ids found this session (Grade 8)
  let _classified = null;  // Set of scenario ids correctly classified this session
  let _guide = null;       // { id, step, def? }
  let _drag = null;        // pointer drag state: { ghost, offX, offY }
  let _mission = null;     // { id }
  let _panel = 'sandbox';
  let _tipIdx = -1;
  let _said = {};
  let _instant = false;
  let _colors = null;

  // ── Grade level ──────────────────────────────
  function _readGrade() {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 7;
    return g === 8 ? 8 : 7;
  }
  const _g8 = () => _grade === 8;
  const _mine = list => D().forGrade(list, _grade || 7);
  const _eyebrow = () => `Science · Grade ${_grade}`;

  // ── Shell ────────────────────────────────────
  function _shellHTML() {
    return `<div class="lab lab-changes">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title">
          <span class="lab-eyebrow" id="lab-changes-eyebrow">${esc(_eyebrow())}</span>
          <h1>The Change Lab</h1>
        </div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-changes-stage">
            <canvas id="lab-canvas" role="img" aria-label="A science scenario playing on the bench"></canvas>
            <div class="lab-changes-label" id="lab-changes-name" aria-live="polite"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Sort each change: is it <strong>Physical</strong> or <strong>Chemical</strong>?</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-changes-classify" id="lab-changes-classify" hidden>
            <div class="lab-changes-chips" id="lab-changes-chips"></div>
            <div class="lab-changes-signs-wrap" id="lab-changes-signs-wrap" hidden></div>
            </div>
          <div class="lab-changes-reveal" id="lab-changes-reveal" hidden></div>
        </div>
        <div class="lab-side">
          <div class="lab-tabs" role="tablist" aria-label="Bench, missions and discoveries">
            <button type="button" role="tab" data-panel="sandbox">🧪 Bench</button>
            <button type="button" role="tab" data-panel="missions">🎯 Missions</button>
            <button type="button" role="tab" data-panel="found">✨ Discoveries <b id="lab-found-n"></b></button>
          </div>
          <div id="lab-panel" class="lab-panel" role="tabpanel"></div>
        </div>
      </div>
    </div>`;
  }

  // ── Mount / unmount ───────────────────────────
  function mount(root) {
    _root = root;
    const g = _readGrade();
    if (g !== _grade) {
      _grade = g;
      _current = null; _phase = 'idle'; _phaseT = 0;
      _chips = null; _signsChosen = null;
      _signsFound = new Set(); _classified = new Set();
      _guide = null; _mission = null; _panel = 'sandbox';
      _said = {}; _tipIdx = -1;
    }
    if (!_signsFound) _signsFound = new Set();
    if (!_classified) _classified = new Set();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else _coach(_mine(D().GUIDES).some(G => st.guides[G.id])
      ? 'Welcome back! Pick a guided experiment or explore the scenarios yourself.'
      : '👋 New here? Pick "Sort the changes" below and I\'ll guide you step by step.');
    if (!_resizeWired) {
      window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); });
      _resizeWired = true;
    }
    _start();
  }

  function unmount() {
    _stop();
    _root = null; _cv = null; _cx = null;
  }

  // ── Resize & colors ───────────────────────────
  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = {
      bg:    v('--lab-changes-bg',    '#EBF4F8'),
      bench: v('--lab-changes-bench', '#BED6DF'),
      ink:   v('--lab-changes-ink',   '#1A2E35'),
      hi:    v('--lab-changes-hi',    'rgba(255,255,255,0.8)'),
    };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(320, Math.max(200, w * 0.6)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _readColors();
    _draw();
  }

  // ── Animation loop ────────────────────────────
  function _start() {
    _last = performance.now();
    const loop = now => {
      if (!_cv || !_cv.isConnected) { _raf = 0; return; }
      const dt = Math.min(0.2, (now - _last) / 1000);
      _last = now;
      _tick(dt);
      _raf = requestAnimationFrame(loop);
    };
    _raf = requestAnimationFrame(loop);
  }
  function _stop() { if (_raf) { cancelAnimationFrame(_raf); _raf = 0; } }

  function _tick(dt) {
    if (_phase === 'watch') {
      const dur = _instant ? 0 : WATCH_DUR;
      _phaseT = Math.min(_phaseT + dt, dur + 0.5);
      if (_phaseT >= dur && $('lab-changes-classify') && $('lab-changes-classify').hidden) {
        $('lab-changes-classify').hidden = false;
        _renderChips();
        _coach('Drag the card to the right bucket — or just tap Physical or Chemical.');
      }
    }
    _draw();
  }

  // ── Wire ─────────────────────────────────────
  function _wire() {
    _root.onclick = e => {
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const sc = e.target.closest('[data-scenario]');
      if (sc) { selectScenario(sc.dataset.scenario); return; }
      const zn = e.target.closest('[data-zone]');
      if (zn && _phase === 'watch') { _classifyDirect(zn.dataset.zone); return; }
      const ch = e.target.closest('[data-chip]');
      if (ch) { _tapChip(ch.dataset.chip, ch.dataset.val); return; }
      const sg = e.target.closest('[data-sign]');
      if (sg) { identifySign(sg.dataset.sign); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const ms = e.target.closest('[data-mission]');
      if (ms) { startMission(ms.dataset.mission); return; }
    };
  }

  function _act(act) {
    switch (act) {
      case 'hub':    Labs.backToHub(); break;
      case 'help':   _help(); break;
      case 'tip':    _nextTip(); break;
      case 'submit': _submit(); break;
      case 'next':   _nextScenario(); break;
      case 'guide-stop': _stopGuide(false); break;
    }
  }

  // ── Coach ─────────────────────────────────────
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _say(key, text) { if (_said[key]) return; _said[key] = true; _coach(text); }
  function _nextTip() {
    const f = D().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ── Readouts ──────────────────────────────────
  function _readouts() {
    const n = $('lab-changes-name');
    if (n) n.textContent = _current ? _current.name : '';
    _renderFoundCount();
  }
  function _renderFoundCount() {
    const b = $('lab-found-n');
    if (!b) return;
    const st = Labs.store(ID);
    const total = _mine(D().DISCOVERIES).length;
    const found = Object.keys(st.disc || {}).filter(id => {
      const disc = D().DISCOVERIES.find(d => d.id === id);
      return disc && disc.grades.includes(_grade);
    }).length;
    b.textContent = found ? `${found}/${total}` : '';
  }

  // ── Scenario selection ────────────────────────
  function selectScenario(id) {
    const sc = _mine(D().SCENARIOS).find(s => s.id === id);
    if (!sc) return;
    _current = sc;
    _phase = 'watch';
    _phaseT = 0;
    _chips = { newSub: null, reversible: null };
    _signsChosen = new Set();
    _said = {};
    const classify = $('lab-changes-classify');
    const reveal = $('lab-changes-reveal');
    if (classify) { classify.hidden = true; }
    if (reveal) { reveal.hidden = true; }
    _readouts();
    _coach(`Watch: ${sc.name}. Is a new substance formed? Can you reverse it?`);
    _guideEvent('watch:' + id);
    if (_instant && classify) { classify.hidden = false; _renderChips(); }
    _renderPanel();
  }

  // ── Classification chips ──────────────────────
  function _renderChips() {
    const el = $('lab-changes-chips');
    if (!el) return;
    const sc = _current;
    el.innerHTML = `
      <p class="lab-changes-drag-prompt">Where does this change belong?</p>
      <div class="lab-changes-drag-area">
        <div class="lab-changes-drag-card" id="lab-changes-drag-card" aria-label="${sc ? esc(sc.name) : 'scenario'}" role="img">
          <span class="lab-changes-drag-icon" aria-hidden="true">${sc ? sc.icon : '🔬'}</span>
          <span class="lab-changes-drag-name">${sc ? esc(sc.name) : ''}</span>
          <span class="lab-changes-drag-hint">drag or tap a bucket</span>
        </div>
      </div>
      <div class="lab-changes-zones">
        <button type="button" class="lab-changes-zone is-physical" data-zone="physical" aria-label="Physical change">
          <span class="lab-changes-zone-icon" aria-hidden="true">🔄</span>
          <span class="lab-changes-zone-label">Physical<br>Change</span>
        </button>
        <button type="button" class="lab-changes-zone is-chemical" data-zone="chemical" aria-label="Chemical change">
          <span class="lab-changes-zone-icon" aria-hidden="true">⚗️</span>
          <span class="lab-changes-zone-label">Chemical<br>Change</span>
        </button>
      </div>`;
    const sw = $('lab-changes-signs-wrap');
    if (sw) {
      if (_g8() && sc && _phase !== 'idle') {
        sw.hidden = false;
        const signs = D().SIGNS;
        sw.innerHTML = '<p class="lab-changes-sign-label">Signs observed (Grade 8):</p><div class="lab-changes-signs">'
          + Object.keys(signs).map(sid => `<button type="button" class="lab-changes-sign-chip${_signsChosen && _signsChosen.has(sid) ? ' is-sel' : ''}" data-sign="${sid}">${signs[sid].icon} ${esc(signs[sid].name)}</button>`).join('')
          + '</div>';
      } else sw.hidden = true;
    }
    const card = $('lab-changes-drag-card');
    if (card) _wireDrag(card);
  }

  function _tapChip(chip, val) {
    if (!_chips || _phase !== 'watch') return;
    _chips[chip] = (val === 'true');
    _renderChips();
  }

  // ── Sign identification (Grade 8) ─────────────
  function identifySign(signId) {
    if (!D().SIGNS[signId] || !_g8()) return;
    if (!_signsChosen) _signsChosen = new Set();
    _signsChosen.has(signId) ? _signsChosen.delete(signId) : _signsChosen.add(signId);
    _signsFound.add(signId);
    _renderChips();
    const sign = D().SIGNS[signId];
    _coach(`${sign.icon} ${sign.name}: ${sign.desc}`);
    _guideEvent('sign:' + signId);
    if (_g8() && _signsFound.size >= 4) _discover('g8_disc_signs');
    if (_g8() && _signsChosen.has('heat')) _discover('g8_disc_exothermic');
    if (_g8() && _signsChosen.has('temperature_drop')) _discover('g8_disc_endothermic');
    if (_g8() && _signsChosen.has('precipitate') && _current && _current.id === 'precipitate'
        && _classified.has('precipitate')) _discover('g8_disc_precipitate');
  }

  // ── Submit classification ─────────────────────
  function _submit() {
    if (!_current || !_chips || _chips.newSub === null || _chips.reversible === null) return;
    const sc = _current;
    const correct = (_chips.newSub === sc.newSubstance) && (_chips.reversible === sc.reversible);
    const wrongSub = _chips.newSub !== sc.newSubstance;
    const wrongRev = _chips.reversible !== sc.reversible;
    _phase = 'reveal';
    _renderReveal(sc, correct, wrongSub, wrongRev);
    if (correct) {
      _classified.add(sc.id);
      _guideEvent('classify');
      if (sc.disc) _discover(sc.disc);
      if (!_classified.has('_phys') && sc.type === 'physical') {
        _classified.add('_phys');
        _discover('disc_physical');
      }
      if (!_classified.has('_chem') && sc.type === 'chemical') {
        _classified.add('_chem');
        _discover('disc_chemical');
      }
    } else {
      _showResultCard(sc, wrongSub, wrongRev);
    }
    _renderPanel();
  }

  function _showResultCard(sc, wrongSub, wrongRev) {
    const R = D().RESULTS;
    if (wrongSub && sc.id === 'dissolving') {
      Labs.resultCard({ icon: R.dissolving_chemical.icon, title: R.dissolving_chemical.title,
        happened: R.dissolving_chemical.happened(), instead: R.dissolving_chemical.instead,
        exam: R.dissolving_chemical.exam });
      return;
    }
    if (wrongRev && sc.id === 'burning') {
      Labs.resultCard({ icon: R.burning_reversible.icon, title: R.burning_reversible.title,
        happened: R.burning_reversible.happened(), instead: R.burning_reversible.instead,
        exam: R.burning_reversible.exam });
      return;
    }
    const type = sc.newSubstance ? 'chemical' : 'physical';
    Labs.resultCard({ icon: sc.icon, title: `That is a ${type} change`,
      happened: `You said the change is ${sc.type === 'physical' ? 'chemical' : 'physical'} — but ${sc.name.toLowerCase()} is a ${type} change.`,
      instead: sc.explanation,
      exam: sc.wordEq ? `Word equation: ${sc.wordEq}` : `No new substance is formed — physical change.` });
  }

  function _renderReveal(sc, correct, wrongSub, wrongRev) {
    const box = $('lab-changes-reveal');
    if (!box) return;
    box.hidden = false;
    box.className = `lab-changes-reveal ${correct ? 'is-correct' : 'is-wrong'}`;
    const cls = sc.type === 'physical' ? 'is-physical' : 'is-chemical';
    const label = sc.type === 'physical' ? '🔄 Physical change' : '⚗️ Chemical change';
    box.innerHTML = `
      <div class="lab-changes-reveal-badge ${cls}">${label}</div>
      <p class="lab-changes-reveal-exp">${esc(sc.explanation)}</p>
      ${sc.wordEq ? `<p class="lab-eq">${esc(sc.wordEq)}</p>` : ''}
      ${sc.sym ? `<p class="lab-eq is-sym">${esc(sc.sym)}</p>` : ''}
      <button type="button" class="lab-btn lab-btn-wide" data-act="next" style="margin-top:.5rem">
        ${correct ? '✅ Next scenario →' : '↩️ Try another'}</button>`;
    _coach(correct
      ? `Correct! ${sc.type === 'physical' ? 'Physical' : 'Chemical'} change. ${sc.disc ? 'Discovery unlocked!' : ''}`
      : `Not quite. ${sc.explanation.slice(0, 80)}…`);
  }

  function _nextScenario() {
    const classify = $('lab-changes-classify');
    const reveal = $('lab-changes-reveal');
    if (classify) classify.hidden = true;
    if (reveal) reveal.hidden = true;
    _current = null;
    _phase = 'idle';
    _phaseT = 0;
    _chips = null;
    _signsChosen = null;
    _said = {};
    _renderPanel();
    _readouts();
    _coach('Choose the next scenario from the list below, or try a guided experiment.');
  }

  // ── Canvas drawing ────────────────────────────
  function _draw() {
    if (!_cx || !_W) return;
    const cx = _cx, W = _W, H = _H;
    const t = _phase === 'watch' ? Math.min(1, _phaseT / Math.max(0.1, ANIM_DUR)) : (_phase === 'idle' ? 0 : 1);
    if (!_colors) _readColors();
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = _colors.bg;
    cx.fillRect(0, 0, W, H);
    _drawBench(cx, W, H);
    if (!_current) { _drawIdlePrompt(cx, W, H); return; }
    switch (_current.id) {
      case 'melting':    _drawMelting(cx, W, H, t); break;
      case 'dissolving': _drawDissolving(cx, W, H, t); break;
      case 'cutting':    _drawCutting(cx, W, H, t); break;
      case 'boiling':    _drawBoiling(cx, W, H, t); break;
      case 'burning':    _drawBurning(cx, W, H, t); break;
      case 'rusting':    _drawRusting(cx, W, H, t); break;
      case 'cooking':    _drawCooking(cx, W, H, t); break;
      case 'fizzing':    _drawFizzing(cx, W, H, t); break;
      case 'combustion': _drawCombustion(cx, W, H, t); break;
      case 'precipitate':_drawPrecipitate(cx, W, H, t); break;
      default:           _drawIdlePrompt(cx, W, H);
    }
  }

  function _lerp(a, b, t) { return a + (b - a) * t; }
  function _ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function _col(r1, g1, b1, r2, g2, b2, t) {
    return `rgb(${Math.round(_lerp(r1, r2, t))},${Math.round(_lerp(g1, g2, t))},${Math.round(_lerp(b1, b2, t))})`;
  }

  function _roundRect(cx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    cx.beginPath();
    cx.moveTo(x + r, y);
    cx.lineTo(x + w - r, y); cx.quadraticCurveTo(x + w, y, x + w, y + r);
    cx.lineTo(x + w, y + h - r); cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    cx.lineTo(x + r, y + h); cx.quadraticCurveTo(x, y + h, x, y + h - r);
    cx.lineTo(x, y + r); cx.quadraticCurveTo(x, y, x + r, y);
    cx.closePath();
  }

  function _drawBench(cx, W, H) {
    cx.fillStyle = _colors.bench;
    _roundRect(cx, 8, H - 20, W - 16, 20, 4);
    cx.fill();
  }

  function _drawIdlePrompt(cx, W, H) {
    cx.fillStyle = _colors.ink;
    cx.globalAlpha = 0.3;
    cx.font = `${Math.round(H * 0.07)}px sans-serif`;
    cx.textAlign = 'center'; cx.textBaseline = 'middle';
    cx.fillText('Choose a scenario', W / 2, H / 2);
    cx.globalAlpha = 1;
    cx.textAlign = 'start'; cx.textBaseline = 'alphabetic';
  }

  // ── Scenario drawings ─────────────────────────
  // Each takes cx, W, H, t (0-1, where 0=before, 1=after)

  function _drawMelting(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    // Draw beaker outline
    cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
    cx.strokeRect(cx0 - 36, bY - 80, 72, 80);
    // Ice cube (shrinks) → water (grows)
    const iceH = _lerp(54, 0, e), waterH = _lerp(0, 40, e);
    const iceY = bY - iceH;
    if (iceH > 2) {
      cx.fillStyle = _col(200, 230, 245, 100, 180, 220, e);
      cx.fillRect(cx0 - 28, iceY, 56, iceH);
      // crystal lines
      cx.strokeStyle = 'rgba(160,200,230,0.6)'; cx.lineWidth = 1;
      for (let i = 1; i < 3; i++) {
        cx.beginPath(); cx.moveTo(cx0 - 28, iceY + iceH * i / 3); cx.lineTo(cx0 + 28, iceY + iceH * i / 3); cx.stroke();
      }
    }
    if (waterH > 0) {
      cx.fillStyle = '#5DA9D0';
      cx.fillRect(cx0 - 28, bY - waterH, 56, waterH);
      // ripple line
      cx.strokeStyle = 'rgba(255,255,255,0.5)'; cx.lineWidth = 1;
      cx.beginPath(); cx.moveTo(cx0 - 28, bY - waterH + 4); cx.lineTo(cx0 + 28, bY - waterH + 4); cx.stroke();
    }
    // Labels
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    if (t < 0.5) { cx.fillText('Ice (H₂O)', cx0, 28); }
    else { cx.fillText('Water (H₂O)', cx0, 28); }
    cx.textAlign = 'start';
  }

  function _drawDissolving(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    // Beaker
    cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
    cx.strokeRect(cx0 - 38, bY - 85, 76, 85);
    // Water fill
    cx.fillStyle = _col(210, 238, 255, 200, 228, 248, e);
    cx.fillRect(cx0 - 36, bY - 50, 72, 50);
    // Salt grains (fade out)
    cx.globalAlpha = 1 - e;
    cx.fillStyle = '#FFFFFF';
    const grains = [[cx0 - 15, bY - 65], [cx0, bY - 70], [cx0 + 14, bY - 63],
                    [cx0 - 20, bY - 58], [cx0 + 5, bY - 56], [cx0 + 18, bY - 62]];
    for (const [gx, gy] of grains) {
      cx.fillRect(gx - 4, gy - 4, 8, 8);
    }
    cx.globalAlpha = 1;
    // Label
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.5 ? 'Salt + water' : 'Salt solution', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawCutting(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, pY = H - 30, pH = 65, pW = 80;
    if (t < 0.3) {
      // Whole paper
      cx.fillStyle = '#FFFDE7'; cx.strokeStyle = '#C8B900'; cx.lineWidth = 1.5;
      cx.fillRect(cx0 - pW / 2, pY - pH, pW, pH); cx.strokeRect(cx0 - pW / 2, pY - pH, pW, pH);
    } else {
      // Two halves separating
      const sep = _lerp(0, 14, _ease((t - 0.3) / 0.7));
      cx.fillStyle = '#FFFDE7'; cx.strokeStyle = '#C8B900'; cx.lineWidth = 1.5;
      cx.fillRect(cx0 - pW / 2, pY - pH, pW / 2 - sep / 2, pH);
      cx.strokeRect(cx0 - pW / 2, pY - pH, pW / 2 - sep / 2, pH);
      cx.fillRect(cx0 + sep / 2, pY - pH, pW / 2 - sep / 2, pH);
      cx.strokeRect(cx0 + sep / 2, pY - pH, pW / 2 - sep / 2, pH);
      // Scissors
      cx.globalAlpha = Math.min(1, (t - 0.3) * 3);
      cx.fillStyle = '#607D8B'; cx.font = `${Math.round(H * 0.12)}px sans-serif`;
      cx.textAlign = 'center'; cx.fillText('✂️', cx0, pY - pH - 12);
      cx.globalAlpha = 1; cx.textAlign = 'start';
    }
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText('Paper', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawBoiling(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
    cx.strokeRect(cx0 - 38, bY - 85, 76, 85);
    cx.fillStyle = '#5DA9D0';
    cx.fillRect(cx0 - 36, bY - 50, 72, 50);
    // Bubbles rising
    const nBubbles = Math.round(_lerp(0, 5, e));
    cx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < nBubbles; i++) {
      const bx = cx0 - 20 + i * 10;
      const by = bY - 20 - (_instant ? 15 : ((performance.now() / 400 + i * 0.7) % 1) * 30);
      cx.beginPath(); cx.arc(bx, by, 4, 0, Math.PI * 2); cx.fill();
    }
    // Steam
    cx.globalAlpha = e * 0.7;
    cx.strokeStyle = '#FFFFFF'; cx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const sx = cx0 - 16 + i * 16, baseY = bY - 86;
      cx.beginPath();
      cx.moveTo(sx, baseY);
      cx.quadraticCurveTo(sx + 8, baseY - 15, sx, baseY - 30);
      cx.stroke();
    }
    cx.globalAlpha = 1;
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.5 ? 'Water (liquid)' : 'Steam (gas)', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawBurning(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    // Candle body (shrinks)
    const candleH = _lerp(65, 25, e);
    cx.fillStyle = '#FFF8C2'; cx.strokeStyle = '#D4C000'; cx.lineWidth = 1.5;
    cx.fillRect(cx0 - 12, bY - candleH, 24, candleH);
    cx.strokeRect(cx0 - 12, bY - candleH, 24, candleH);
    // Wick
    cx.strokeStyle = '#555'; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(cx0, bY - candleH); cx.lineTo(cx0, bY - candleH - 6); cx.stroke();
    // Flame
    const fH = _lerp(0, 28, Math.min(1, e * 3));
    if (fH > 2) {
      const flicker = _instant ? 0 : Math.sin(performance.now() / 120) * 3;
      cx.fillStyle = '#FF8C00'; cx.globalAlpha = 0.9;
      cx.beginPath();
      cx.ellipse(cx0 + flicker, bY - candleH - fH / 2 - 6, 9, fH / 2, 0, 0, Math.PI * 2);
      cx.fill();
      cx.fillStyle = '#FFE066'; cx.globalAlpha = 0.8;
      cx.beginPath();
      cx.ellipse(cx0 + flicker * 0.5, bY - candleH - fH / 3 - 6, 5, fH / 3, 0, 0, Math.PI * 2);
      cx.fill();
      cx.globalAlpha = 1;
    }
    // Smoke
    cx.globalAlpha = e * 0.5;
    cx.strokeStyle = '#888'; cx.lineWidth = 1.5;
    const smkY = bY - candleH - fH - 6;
    cx.beginPath(); cx.moveTo(cx0, smkY); cx.quadraticCurveTo(cx0 + 10, smkY - 20, cx0, smkY - 40); cx.stroke();
    cx.globalAlpha = 1;
    // Labels
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.4 ? 'Wax + oxygen' : 'CO₂ + water vapour', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawRusting(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, nY = H - 30;
    // Nail body
    const nailColor = _col(130, 130, 130, 150, 80, 30, e);
    cx.fillStyle = nailColor;
    _roundRect(cx, cx0 - 8, nY - 90, 16, 80, 4); cx.fill();
    // Nail head
    cx.fillStyle = _col(110, 110, 110, 130, 70, 25, e);
    cx.fillRect(cx0 - 18, nY - 90, 36, 14);
    // Rust patches
    cx.fillStyle = `rgba(180,90,20,${e * 0.8})`;
    const patches = [[cx0 - 5, nY - 70, 14, 12], [cx0 - 8, nY - 50, 10, 16], [cx0 + 2, nY - 35, 8, 10]];
    for (const [px, py, pw, ph] of patches) {
      _roundRect(cx, px, py, pw, ph, 3); cx.fill();
    }
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.5 ? 'Iron nail' : 'Iron oxide (rust)', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawCooking(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, pY = H - 18;
    // Pan
    cx.fillStyle = '#37474F'; _roundRect(cx, cx0 - 55, pY - 20, 110, 20, 4); cx.fill();
    cx.fillStyle = '#546E7A'; cx.fillRect(cx0 - 50, pY - 22, 100, 6);
    // Egg white (clears → white)
    const ewColor = _col(255, 253, 240, 255, 255, 255, e);
    cx.fillStyle = ewColor;
    cx.beginPath(); cx.ellipse(cx0, pY - 28, 32, 20, 0, 0, Math.PI * 2); cx.fill();
    // Yolk
    cx.fillStyle = '#FFC107';
    cx.beginPath(); cx.arc(cx0, pY - 30, 10, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.5 ? 'Raw egg white' : 'Cooked protein', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawFizzing(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    // Two beakers merging
    if (t < 0.35) {
      // Two separate
      cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
      cx.strokeRect(cx0 - 62, bY - 60, 44, 60);
      cx.fillStyle = '#E8C858'; cx.fillRect(cx0 - 60, bY - 35, 40, 35); // vinegar
      cx.strokeRect(cx0 + 18, bY - 60, 44, 60);
      cx.fillStyle = '#F5F5F0'; cx.fillRect(cx0 + 20, bY - 40, 40, 40); // baking soda
      cx.fillStyle = _colors.ink; cx.font = `${Math.round(H * 0.055)}px sans-serif`;
      cx.textAlign = 'center';
      cx.fillText('Vinegar', cx0 - 40, bY - 65); cx.fillText('Baking soda', cx0 + 40, bY - 65);
    } else {
      // Combined with bubbles
      cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
      cx.strokeRect(cx0 - 40, bY - 75, 80, 75);
      cx.fillStyle = _col(232, 200, 88, 230, 240, 245, _ease((t - 0.35) / 0.65));
      cx.fillRect(cx0 - 38, bY - 50, 76, 50);
      // bubbles
      const nb = Math.round(_lerp(0, 7, _ease((t - 0.35) / 0.65)));
      cx.fillStyle = 'rgba(255,255,255,0.7)';
      for (let i = 0; i < nb; i++) {
        const bx = cx0 - 30 + (i * 11);
        const by = _instant ? bY - 30 : bY - 15 - ((performance.now() / 300 + i * 0.4) % 1) * 38;
        cx.beginPath(); cx.arc(bx, by, 4, 0, Math.PI * 2); cx.fill();
      }
    }
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.35 ? 'Vinegar + baking soda' : 'CO₂ gas produced!', cx0, 26);
    cx.textAlign = 'start';
  }

  function _drawCombustion(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    // Dish / watch glass
    cx.fillStyle = '#B0BEC5';
    cx.beginPath(); cx.ellipse(cx0, bY - 10, 48, 12, 0, 0, Math.PI * 2); cx.fill();
    if (t < 0.4) {
      // Silver ribbon
      cx.fillStyle = _col(192, 192, 192, 240, 240, 240, e * 2);
      cx.fillRect(cx0 - 4, bY - 70, 8, 56);
    } else if (t < 0.65) {
      // Flash
      const fl = _ease((t - 0.4) / 0.25);
      cx.globalAlpha = fl;
      cx.fillStyle = '#FFFFFF';
      cx.beginPath(); cx.arc(cx0, bY - 42, 35, 0, Math.PI * 2); cx.fill();
      cx.fillStyle = '#FFFDE7';
      cx.beginPath(); cx.arc(cx0, bY - 42, 22, 0, Math.PI * 2); cx.fill();
      cx.globalAlpha = 1;
    } else {
      // White powder
      cx.fillStyle = '#F0F0F0';
      cx.beginPath(); cx.ellipse(cx0, bY - 14, 36, 8, 0, 0, Math.PI * 2); cx.fill();
      cx.strokeStyle = '#D0D0D0'; cx.lineWidth = 1;
      cx.beginPath(); cx.ellipse(cx0, bY - 14, 36, 8, 0, 0, Math.PI * 2); cx.stroke();
    }
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    if (t < 0.4) cx.fillText('Mg ribbon', cx0, 28);
    else if (t < 0.65) cx.fillText('Brilliant white flame!', cx0, 28);
    else cx.fillText('MgO (white powder)', cx0, 28);
    cx.textAlign = 'start';
  }

  function _drawPrecipitate(cx, W, H, t) {
    const e = _ease(t);
    const cx0 = W / 2, bY = H - 22;
    if (t < 0.4) {
      // Two beakers
      cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
      cx.strokeRect(cx0 - 60, bY - 65, 44, 65);
      cx.fillStyle = '#2060D0'; cx.fillRect(cx0 - 58, bY - 40, 40, 40); // CuSO4 blue
      cx.strokeRect(cx0 + 16, bY - 65, 44, 65);
      cx.fillStyle = '#E8F5E9'; cx.fillRect(cx0 + 18, bY - 40, 40, 40); // NaOH clear
      cx.fillStyle = _colors.ink; cx.font = `${Math.round(H * 0.05)}px sans-serif`;
      cx.textAlign = 'center';
      cx.fillText('CuSO₄ (blue)', cx0 - 38, bY - 70);
      cx.fillText('NaOH', cx0 + 38, bY - 70);
    } else {
      // Mixed — precipitate forming
      const pe = _ease((t - 0.4) / 0.6);
      cx.strokeStyle = '#7AAABB'; cx.lineWidth = 2;
      cx.strokeRect(cx0 - 42, bY - 75, 84, 75);
      cx.fillStyle = _col(40, 120, 210, 120, 180, 200, pe);
      cx.fillRect(cx0 - 40, bY - 50, 80, 50);
      // Precipitate at bottom
      cx.fillStyle = _col(40, 120, 210, 0, 137, 123, pe);
      const precH = _lerp(0, 18, pe);
      cx.fillRect(cx0 - 40, bY - precH, 80, precH);
    }
    cx.fillStyle = _colors.ink; cx.font = `bold ${Math.round(H * 0.065)}px sans-serif`;
    cx.textAlign = 'center';
    cx.fillText(t < 0.4 ? 'CuSO₄ + NaOH' : 'Cu(OH)₂ precipitate!', cx0, 28);
    cx.textAlign = 'start';
  }

  // ── Help / intro ──────────────────────────────
  function _help() {
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">🔥</p>
        <p class="lab-rs-kicker">How The Change Lab works</p>
        <h2 id="lab-ov-title">The Change Lab</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>The idea</h3>
          <p>Pick a scenario. Watch what happens. Then classify the change as physical or chemical, using two questions:</p>
          <ol><li>Was a new substance formed?</li><li>Is the change reversible?</li></ol></section>
        <section class="lab-hz-sec is-exam"><h3>Physical vs. chemical</h3>
          <p><strong>Physical:</strong> no new substance (melting, dissolving, cutting). <strong>Chemical:</strong> new substance always formed (burning, rusting, cooking).</p>
          ${_g8() ? '<p><strong>Grade 8 extra:</strong> after classifying, tap the signs you observed (colour change, gas, heat, precipitate).</p>' : ''}</section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Got it!</button>
      </div>`, { cls: 'is-done' });
  }

  // ── Drag-to-classify ─────────────────────────
  function _wireDrag(card) {
    let ghost = null, offX = 0, offY = 0;

    function onMove(e) {
      if (!ghost) return;
      e.preventDefault();
      ghost.style.left = (e.clientX - offX) + 'px';
      ghost.style.top  = (e.clientY - offY) + 'px';
      _root.querySelectorAll('.lab-changes-zone').forEach(z => {
        const r = z.getBoundingClientRect();
        z.classList.toggle('is-over',
          e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom);
      });
    }

    function onEnd(e) {
      card.removeEventListener('pointermove', onMove);
      if (ghost) { ghost.remove(); ghost = null; }
      card.classList.remove('is-dragging');
      let zone = null;
      _root.querySelectorAll('.lab-changes-zone').forEach(z => {
        const r = z.getBoundingClientRect();
        z.classList.remove('is-over');
        if (e.clientX >= r.left && e.clientX <= r.right &&
            e.clientY >= r.top  && e.clientY <= r.bottom) zone = z.dataset.zone;
      });
      _drag = null;
      if (zone) _classifyDirect(zone);
    }

    card.addEventListener('pointerdown', e => {
      if (_phase !== 'watch') return;
      e.preventDefault();
      const rect = card.getBoundingClientRect();
      offX = e.clientX - rect.left;
      offY = e.clientY - rect.top;
      ghost = card.cloneNode(true);
      ghost.classList.add('is-ghost');
      ghost.removeAttribute('id');
      ghost.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;margin:0;'
        + 'left:' + rect.left + 'px;top:' + rect.top + 'px;width:' + rect.width + 'px;';
      document.body.appendChild(ghost);
      card.classList.add('is-dragging');
      card.setPointerCapture(e.pointerId);
      _drag = { ghost, offX, offY };
      card.addEventListener('pointermove', onMove, { passive: false });
      card.addEventListener('pointerup',      onEnd, { once: true });
      card.addEventListener('pointercancel',  onEnd, { once: true });
    });
  }

  function _classifyDirect(type) {
    if (!_current || _phase !== 'watch') return;
    const sc = _current;
    const correct = type === sc.type;
    _chips = { newSub: type === 'chemical', reversible: type === 'physical' };
    const wrongSub = !correct;
    _phase = 'reveal';
    _renderReveal(sc, correct, wrongSub, false);
    if (correct) {
      _classified.add(sc.id);
      _guideEvent('classify');
      if (sc.disc) _discover(sc.disc);
      if (!_classified.has('_phys') && sc.type === 'physical') {
        _classified.add('_phys'); _discover('disc_physical');
      }
      if (!_classified.has('_chem') && sc.type === 'chemical') {
        _classified.add('_chem'); _discover('disc_chemical');
      }
    } else {
      _showResultCard(sc, wrongSub, false);
    }
    _renderPanel();
  }

  function _intro() {
    const st = Labs.store(ID);
    st.intro = true;
    Labs.persist();
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">🔥</p>
        <p class="lab-rs-kicker">Welcome to</p>
        <h2 id="lab-ov-title">The Change Lab</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you will do</h3>
          <p>Watch 10 different scenarios — melting, burning, rusting and more. For each one, decide: is it a <strong>physical change</strong> or a <strong>chemical change</strong>?</p>
          <p>The two key questions: <strong>Was a new substance formed?</strong> and <strong>Is it reversible?</strong></p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore freely</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="sort" data-autofocus>Show me how →</button>
      </div>`, { cls: 'is-done' });
  }

  // ── Panel rendering ───────────────────────────
  function _renderPanel() {
    const el = $('lab-panel');
    if (!el) return;
    // Sync tab highlights
    _root.querySelectorAll('[role="tab"]').forEach(b => {
      b.setAttribute('aria-selected', b.dataset.panel === _panel ? 'true' : 'false');
    });
    if (_panel === 'sandbox') el.innerHTML = _sandboxHTML();
    else if (_panel === 'missions') el.innerHTML = _missionsHTML();
    else el.innerHTML = _foundHTML();
  }

  function _sandboxHTML() {
    const scenarios = _mine(D().SCENARIOS);
    const guides = _mine(D().GUIDES);
    const st = Labs.store(ID);
    if (_phase === 'idle' || _phase === 'reveal') {
      return `<div class="lab-start">
        <p class="lab-start-head">What would you like to do?</p>
        <p class="lab-start-sub">Guided experiments</p>
        ${guides.map(G => `<button type="button" class="lab-start-item" data-guide="${G.id}">
          <span class="lab-start-icon" aria-hidden="true">${G.icon}</span>
          <span class="lab-start-text"><b>${esc(G.title)}</b><br><small>${esc(G.blurb)}</small></span>
          ${st.guides[G.id] ? '<span class="lab-found-badge">✓</span>' : ''}
        </button>`).join('')}
        <p class="lab-start-sub">Scenarios — pick one to classify</p>
        <div class="lab-changes-scenario-list">
          ${scenarios.map(sc => `<button type="button" class="lab-changes-scenario-item" data-scenario="${sc.id}">
            <span class="lab-changes-sc-icon" aria-hidden="true">${sc.icon}</span>
            <span class="lab-changes-sc-name">${esc(sc.name)}</span>
            ${_classified.has(sc.id) ? '<span class="lab-changes-sc-done" aria-label="classified">✓</span>' : ''}
          </button>`).join('')}
        </div>
      </div>`;
    }
    return `<div class="lab-start">
      <p class="lab-start-head">Classifying: ${esc(_current ? _current.name : '')}</p>
      <p class="lab-start-sub">Other scenarios</p>
      <div class="lab-changes-scenario-list">
        ${scenarios.map(sc => `<button type="button" class="lab-changes-scenario-item${sc.id === (_current && _current.id) ? ' is-active' : ''}" data-scenario="${sc.id}">
          <span class="lab-changes-sc-icon" aria-hidden="true">${sc.icon}</span>
          <span class="lab-changes-sc-name">${esc(sc.name)}</span>
          ${_classified.has(sc.id) ? '<span class="lab-changes-sc-done">✓</span>' : ''}
        </button>`).join('')}
      </div>
    </div>`;
  }

  function _missionsHTML() {
    const missions = _mine(D().MISSIONS);
    const st = Labs.store(ID);
    return `<div class="lab-missions">
      ${missions.map(M => {
        const best = st.missions[M.id];
        const stars = best ? best.stars : 0;
        return `<button type="button" class="lab-mission-item" data-mission="${M.id}">
          <span class="lab-mission-icon" aria-hidden="true">${M.icon}</span>
          <span class="lab-mission-info"><b>${esc(M.title)}</b><br><small>${esc(M.blurb)}</small></span>
          <span class="lab-mission-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
        </button>`;
      }).join('')}
    </div>`;
  }

  function _foundHTML() {
    const discs = _mine(D().DISCOVERIES);
    const st = Labs.store(ID);
    return `<div class="lab-found">
      ${discs.map(d => {
        const found = !!(st.disc || {})[d.id];
        return found
          ? `<button type="button" class="lab-found-item is-found" data-disc="${d.id}">
              <span class="lab-found-icon" aria-hidden="true">${d.icon}</span>
              <span class="lab-found-title">${esc(d.title)}</span>
             </button>`
          : `<button type="button" class="lab-found-item" data-disc="${d.id}">
              <span class="lab-found-icon is-locked" aria-hidden="true">❔</span>
              <span class="lab-found-title lab-hint">${esc(d.hint)}</span>
             </button>`;
      }).join('')}
    </div>`;
  }

  // ── Discovery detail ──────────────────────────
  function _discDetail(id) {
    const disc = D().DISCOVERIES.find(d => d.id === id);
    if (!disc) return;
    const found = !!( Labs.store(ID).disc || {})[id];
    if (!found) {
      Labs.overlay(`
        <div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(disc.hint)}</h2>
          <section class="lab-hz-sec is-do lab-done-lesson"><h3>How to find it</h3>
            <ol class="lab-disc-steps">${disc.how.map(on => `<li>${esc(_autoStep(on).say)}</li>`).join('')}</ol></section>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Show me how →</button>
        </div>`, { cls: 'is-done' });
      return;
    }
    const sc = D().SCENARIOS.find(s => s.disc === id);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${disc.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(disc.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(disc.saw)}</p></section>
        ${sc && sc.wordEq ? `<section class="lab-hz-sec"><h3>Word equation</h3><p class="lab-eq">${esc(sc.wordEq)}</p>${sc.sym ? `<p class="lab-eq is-sym">${esc(sc.sym)}</p>` : ''}</section>` : ''}
        <section class="lab-hz-sec is-exam"><h3>What it means</h3><p>${esc(disc.learn)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  // ── Discover ──────────────────────────────────
  function _discover(id) {
    const disc = D().DISCOVERIES.find(d => d.id === id);
    if (!disc) return;
    if (!disc.grades.includes(_grade)) return;
    const total = _mine(D().DISCOVERIES).length;
    Labs.discover(ID, id, { title: disc.title, total });
    _renderFoundCount();
    _renderPanel();
  }

  // ── Guide system ──────────────────────────────
  const _gdef = () => _guide && (_guide.def || D().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || D().GUIDES.find(g => g.id === idOrDef);
    if (!G) return;
    _mission = null;
    _current = null; _phase = 'idle'; _phaseT = 0;
    const classify = $('lab-changes-classify');
    const reveal = $('lab-changes-reveal');
    if (classify) classify.hidden = true;
    if (reveal) reveal.hidden = true;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _guideEnter();
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        <div class="lab-guide-actions">
          <button type="button" class="lab-guide-hint-btn" data-guide-hint aria-label="Show me where to go">💡 Hint</button>
          <button type="button" class="lab-link" data-act="guide-stop">Stop guide</button>
        </div>`;
      box.hidden = false;
    }
    _highlight();
  }

  function _guideEvent(token) {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (s && s.on === token) { _guide.step++; _guideEnter(); }
  }

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const on = s.on;
    if (on.startsWith('watch:')) selectScenario(on.slice(6));
    else if (on.startsWith('sign:')) identifySign(on.slice(5));
    // 'classify' — child must do it via chips
  }

  function _guideHint() {
    _highlight();
    const el = _root.querySelector('.is-next');
    if (!el) return;
    el.classList.remove('is-idle-hint');
    void el.offsetWidth;
    el.classList.add('is-idle-hint');
    el.addEventListener('animationend', () => el.classList.remove('is-idle-hint'), { once: true });
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function _stopGuide(silent) {
    _guide = null;
    const box = $('lab-guide');
    if (box) box.hidden = true;
    if (!silent) _coach('Guide stopped. The bench is all yours.');
    _renderPanel();
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store(ID);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    if (G.adhoc && G.discId) _discover(G.discId);
    _stopGuide(true);
    const next = G.adhoc ? null : _mine(D().GUIDES).find(g => !st.guides[g.id]);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${G.icon}</p>
        <p class="lab-rs-kicker">Experiment complete</p>
        <h2 id="lab-ov-title">${esc(G.title)}</h2>
        <section class="lab-hz-sec is-exam lab-done-lesson"><h3>What you found out</h3><p>${esc(G.lesson)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore freely</button>
        ${G.adhoc
          ? '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="found" data-autofocus>Back to my discoveries →</button>'
          : next
            ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${next.id}" data-autofocus>Next: ${esc(next.title)} →</button>`
            : '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>'}
      </div>`, { cls: 'is-done' });
  }

  function _highlight() {
    const G = _gdef();
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    let el = null;
    if (s.on.startsWith('watch:')) {
      el = _root.querySelector(`[data-scenario="${s.on.slice(6)}"]`);
    } else if (s.on.startsWith('sign:')) {
      el = _root.querySelector(`[data-sign="${s.on.slice(5)}"]`);
    } else if (s.on === 'classify') {
      el = $('lab-changes-submit');
    }
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-scenario],[data-sign],[data-act]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  // ── Discovery guide ───────────────────────────
  function _autoStep(on) {
    const Sc = D().SCENARIOS;
    const Sg = D().SIGNS;
    if (on.startsWith('watch:')) {
      const id = on.slice(6);
      const sc = Sc.find(s => s.id === id);
      const name = sc ? sc.name : id;
      return { on, say: `Watch the scenario: ${name}.`, btn: `▶️ Watch: ${name}` };
    }
    if (on === 'classify') return { on, say: 'Use the chips to classify: physical or chemical?' };
    if (on.startsWith('sign:')) {
      const sid = on.slice(5);
      const sign = Sg[sid];
      return { on, say: sign ? `Identify the sign: ${sign.name}.` : on, btn: sign ? `${sign.icon} ${sign.name}` : on };
    }
    return { on, say: on };
  }

  function discoveryGuide(id) {
    const disc = _mine(D().DISCOVERIES).find(d => d.id === id);
    if (!disc) return;
    startGuide({ id: 'disc-' + id, adhoc: true, discId: id, icon: disc.icon, title: disc.title, lesson: disc.learn, steps: disc.how.map(_autoStep) });
  }

  // ── Mission system ────────────────────────────
  function startMission(id) {
    const M = _mine(D().MISSIONS).find(m => m.id === id);
    if (!M) return;
    _stopGuide(true);
    _mission = { id, hazards: 0 };
    _coach(M.intro);
    _panel = 'missions';
    _renderPanel();
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(ID);
      const prev = st.missions[id] || {};
      st.missions[id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      if (r.firstTry < r.total - 1) lines.push('Get all but one right first try for an extra star.');
      else lines.push('All questions right first try. 🎉');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or hunt for discoveries.'); } });
    } });
  }

  // ── Test hooks ────────────────────────────────
  function _testHook({ instant } = {}) {
    _instant = !!instant;
    const classify = $('lab-changes-classify');
    if (_instant && _current && classify) { classify.hidden = false; _renderChips(); }
  }
  function _debug() {
    const st = Labs.store(ID);
    return {
      grade: _grade, current: _current ? _current.id : null,
      phase: _phase, panel: _panel,
      guide: _guide ? (_guide.def ? 'adhoc' : _guide.id) : null,
      guideStep: _guide ? _guide.step : -1,
      mission: _mission ? _mission.id : null,
      discCount: Object.keys(st.disc || {}).filter(id => {
        const d = D().DISCOVERIES.find(x => x.id === id);
        return d && d.grades.includes(_grade);
      }).length,
      classifiedCount: _classified ? _classified.size : 0,
      chips: _chips ? Object.assign({}, _chips) : null,
    };
  }

  return { mount, unmount, _test: _testHook, _tick, _debug, startGuide, startMission, selectScenario, discoveryGuide, identifySign };
})();
if (typeof window !== 'undefined') window.LabChanges = LabChanges;
