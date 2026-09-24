'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Work, Energy & Power (Grade 8)
//
//  Stage: an inclined plane at 30°. Two modes:
//    Lift — pull the load straight up (F = weight, d = height)
//    Ramp — pull up the inclined plane (F = weight/2, d = 2×height, W = same)
//
//  Opens on an experiment (lab_experiment.js, LAB_SPEC.md §10): the runner
//  owns Aim → Predict → Do → See → Check → Done; this bench keeps its canvas,
//  its guide box, its glow, and the free Explore bench with guides, missions
//  and discoveries.
//
//  ⚠ All numbers come from LabEnergyData. This file only animates and draws.
//    Fix a wrong readout in the DATA file, not here.
//  ⚠ A pull takes the chosen speed's seconds (Fast 2 s, Slow 5 s), and that
//    is the time the notebook records - never the wall clock, so P = W ÷ t
//    is the same number on every device and in every test.
//  ⚠ Only the <canvas> animates. No transform on .screen or ancestors.
//  ⚠ Calm Mode / prefers-reduced-motion: simulation still runs but jumps
//    instantly (no animation), via Labs.calm().
//  ⚠ recordAnswer() and _recordDaily() are never called from a lab.
// ══════════════════════════════════════════════
const LabEnergy = (() => {
  const ID = 'energy';
  const P = () => LabEnergyData;
  const SLIDE_S = 1.2;      // seconds for a released load to reach the bottom (normal mode)

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _resizeWired = false;
  let _mode = 'lift';       // 'lift' | 'ramp'
  let _massIdx = 0;         // index into P().MASSES
  let _heightIdx = 0;       // index into P().HEIGHTS
  let _speedIdx = 0;        // index into P().SPEEDS
  let _pos = 0;             // 0 = bottom, 1 = top (fraction of path completed)
  let _posAnim = 0;         // display position (lags _pos for smooth animation)
  let _running = false;     // pull animation active
  let _pullDone = false;    // pull completed with the load at the top
  let _sliding = false;     // released load sliding back down
  let _slideT = 0;          // seconds into the slide
  let _timing = false;      // timer switched on: t and P chips live
  let _timedResult = null;  // { workJ, timeS, powerW } of the last timed pull
  let _panel = 'bench';     // 'bench' | 'missions' | 'discoveries'
  let _guide = null;        // active guide { id, steps, exp, adhoc, lesson, title, icon } or null
  let _guideStep = 0;       // current step index in _guide.steps
  let _mission = null;      // active MISSION or null
  let _log = [];            // notebook rows, oldest first
  let _instant = false;     // test mode: skip animation
  let _applying = false;    // experiment set-up: no toasts, no cards, no coach
  let _flashAlpha = 0;      // hazard flash overlay
  let _focus = null;        // Set of tokens whose controls stay visible, or null

  // ── Data getters ─────────────────────────────
  function _calc() { return P().calcWork(_mode, _massIdx, _heightIdx); }
  function _mass() { return P().MASSES[_massIdx]; }
  function _height() { return P().HEIGHTS[_heightIdx]; }
  function _speed() { return P().SPEEDS[_speedIdx]; }
  const _jump = () => _instant || Labs.calm();
  const _expGuide = () => !!(_guide && _guide.exp);

  // ── Canvas setup ──────────────────────────────
  function _resize() {
    if (!_cv) return;
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(360, Math.max(200, w * 0.62)));
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    _W = w; _H = h;
    _cv.width = Math.round(w * pr); _cv.height = Math.round(h * pr);
    _cv.style.height = h + 'px';
    _cx.setTransform(pr, 0, 0, pr, 0, 0);
    _draw();
  }

  // ── Animation loop ───────────────────────────
  function _loop(ts) {
    if (!_root) return;
    _raf = requestAnimationFrame(_loop);
    if (!_last) _last = ts;
    const dt = Math.min((ts - _last) / 1000, 0.1);
    _last = ts;
    _step(dt);
    _draw();
  }

  function _step(dt) {
    if (_running) {
      const perSec = _jump() ? 9999 : 1 / _speed().s;
      _pos = Math.min(1, _pos + perSec * dt);
      if (_pos >= 1) _completePull();
    }
    if (_sliding) {
      _slideT = _jump() ? SLIDE_S : Math.min(SLIDE_S, _slideT + dt);
      const t = _slideT / SLIDE_S;
      _pos = Math.max(0, 1 - t * t);   // faster and faster: GPE → KE
      if (_slideT >= SLIDE_S) _completeSlide();
    }
    _posAnim += (_pos - _posAnim) * Math.min(1, (_jump() ? 9999 : 12) * dt);
    if (Math.abs(_posAnim - _pos) < 0.001) _posAnim = _pos;
    _flashAlpha = Math.max(0, _flashAlpha - 1.5 * dt);
    if (_running || _sliding) _renderReadouts();
  }

  function _completePull() {
    if (!_running) return;
    _running = false;
    _pullDone = true;
    _pos = 1; _posAnim = _jump() ? 1 : _posAnim;

    const c = _calc();
    const M = _mass(), H = _height();
    if (_timing && c) {
      const timeS = _speed().s;
      _timedResult = { workJ: c.work, timeS, powerW: P().calcPower(c.work, timeS) };
    } else {
      _timedResult = null;
    }
    if (c) {
      _log.push({
        kind: 'pull', mode: _mode, label: M.label, height: H.label,
        force: c.force, dist: c.dist, work: c.work,
        timeS: _timedResult ? _timedResult.timeS : null,
        powerW: _timedResult ? _timedResult.powerW : null,
      });
    }

    if (!_applying) P().discoveriesFor(_mode, _massIdx, _heightIdx, !!_timedResult).forEach(_discover);
    _guideEvent('pull');

    // The friction note after a ramp pull: once in Explore, and again whenever
    // a guide is waiting for it. Never during an experiment - its steps are
    // the lesson and a card would sit on top of them.
    if (_mode === 'ramp' && !_applying && !_expGuide()) {
      const st = Labs.store(ID);
      const waiting = _guide && _stepHit(_guide.steps[_guideStep], 'card:ramp_efficiency');
      if (!st._shownRampEff || waiting) {
        st._shownRampEff = true;
        Labs.persist();
        setTimeout(() => _resultCard('ramp_efficiency', {}), _jump() ? 0 : 400);
      }
    }

    _renderReadouts();
    _renderPanel();
  }

  function _completeSlide() {
    if (!_sliding) return;
    _sliding = false;
    _pos = 0; _posAnim = _jump() ? 0 : _posAnim;
    _pullDone = false; _timedResult = null;
    const M = _mass(), H = _height();
    const gpe = P().calcGPE(_massIdx, _heightIdx);
    _log.push({ kind: 'release', label: M.label, height: H.label, gpe });
    _guideEvent('release');
    if (!_applying && !_expGuide()) {
      _hazard('rope_release', { label: M.label }, () => { _renderPanel(); });
    }
    _renderReadouts();
    _renderPanel();
  }

  // ── Discoveries ───────────────────────────────
  function _discover(id) {
    if (_applying) return;
    const D = P().DISCOVERIES.find(d => d.id === id);
    if (!D) return;
    if (Labs.discover(ID, id, { title: D.title, total: P().forGrade(P().DISCOVERIES, 8).length })) {
      _renderPanel();
    }
  }

  // ── Result / hazard cards ─────────────────────
  function _resultCard(id, ctx) {
    const R = P().RESULTS[id];
    if (!R || _applying) return;
    const v = x => (typeof x === 'function' ? x(ctx) : x);
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.resultCard({ icon: R.icon, title: v(R.title), happened: v(R.happened), instead: v(R.instead), exam: R.exam,
      onClose: () => { _guideEvent('card:' + id); _renderPanel(); } });
  }

  function _hazard(id, ctx, after) {
    const H = P().HAZARDS[id];
    if (!H || _applying) return;
    _flashAlpha = 0.55;
    const st = Labs.store(ID);
    st.hazards = st.hazards || {}; st.hazards[id] = (st.hazards[id] || 0) + 1; Labs.persist();
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.hazardCard({
      signs: H.signs,
      title: H.title(ctx || {}),
      happened: H.happened(ctx || {}),
      why: H.why,
      instead: H.instead,
      exam: H.exam,
      onClose: () => { _flashAlpha = 0; _guideEvent('card:' + id); if (after) after(); _renderReadouts(); _renderPanel(); },
    });
  }

  // ══ Guides ═══════════════════════════════════
  // A guide is { id, title, icon, lesson, steps: [{ on, any, options, wrong, say }], adhoc, exp }.
  function _startGuide(G) {
    if (!G) return;
    _mission = null;
    _guide = { id: G.id, title: G.title, icon: G.icon, lesson: G.lesson, steps: G.steps, adhoc: !!G.adhoc, exp: !!G.exp };
    _guideStep = 0;
    _panel = 'bench';
    _syncTabs();
    _guideEnter();
    if (!G.exp) _coach(G.steps[0].say);
    _renderPanel();
  }

  // A step is met by its `on` token, or by any token in `any` (an experiment
  // that accepts several answers). The runner hears every token first, so a
  // listed wrong choice can explain itself.
  const _stepHit = (s, token) => !!s && (s.any ? s.any.includes(token) : s.on === token);

  function _guideEvent(token) {
    if (!_guide) return;
    const s = _guide.steps[_guideStep];
    if (_guide.exp && experiment.hooks.token) experiment.hooks.token(token, s);
    if (!_stepHit(s, token)) return;
    _guideStep++;
    _guideEnter();
    if (_guide && !_guide.exp) _coach(_guide.steps[_guideStep].say);
  }

  function _guideEnter() {
    if (!_guide) return;
    const s = _guide.steps[_guideStep];
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      box.innerHTML = `<div class="lab-guide-num">Step ${_guideStep + 1} of ${_guide.steps.length}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        <div class="lab-guide-actions">
          <button type="button" class="lab-guide-hint-btn" data-act="guide-hint" aria-label="Show me where to go">💡 Hint</button>
          <button type="button" class="lab-link" data-act="guide-stop">Stop guide</button>
        </div>`;
      box.hidden = false;
    }
    _renderAnswers(s);
    _highlight();
    if (_guide.exp && experiment.hooks.step) experiment.hooks.step(_guideStep);
  }

  function _guideDone() {
    const G = _guide;
    if (!G) return;
    if (G.exp) { _stopGuide(true); if (experiment.hooks.done) experiment.hooks.done(); return; }
    if (!G.adhoc) {
      const st = Labs.store(ID); st.guides = st.guides || {}; st.guides[G.id] = Date.now(); Labs.persist();
    }
    _stopGuide(true);
    _coach(G.lesson);
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null; _guideStep = 0;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    _renderAnswers(null);
    _highlight();
    if (had) _renderPanel();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or explore freely.');
  }

  // Answer buttons exist only while a step offers `ans:` options.
  function _renderAnswers(step) {
    const row = $('lab-energy-answers');
    if (!row) return;
    const toks = step ? (step.options || step.any || (step.on ? [step.on] : [])).filter(t => t.startsWith('ans:')) : [];
    row.innerHTML = toks.map(t => `<button type="button" class="lab-energy-ans-btn" data-ans="${esc(t.slice(4))}">${esc(t.slice(4))}</button>`).join('');
    row.hidden = toks.length === 0;
    _applyFocus();
  }

  function _selFor(tok) {
    const i = tok.indexOf(':');
    const k = i > 0 ? tok.slice(0, i) : tok, v = i > 0 ? tok.slice(i + 1) : '';
    switch (k) {
      case 'mode':   return `[data-mode="${v}"]`;
      case 'mass':   return `[data-mass="${v}"]`;
      case 'height': return `[data-height="${v}"]`;
      case 'speed':  return `[data-speed="${v}"]`;
      case 'ans':    return `[data-ans="${v.replace(/"/g, '')}"]`;
      case 'card':   return '#lab-energy-canvas';
    }
    return `[data-act="${k}"]`;
  }

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(e => e.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(e => e.classList.remove('is-guide-dim'));
    const s = _guide && _guide.steps[_guideStep];
    if (!s) return;
    const toks = s.options || s.any || (s.on ? [s.on] : []);
    const els = toks.filter(t => !t.startsWith('card:')).map(t => _root.querySelector('.lab-energy ' + _selFor(t))).filter(Boolean);
    if (!els.length) return;
    els.forEach(el => el.classList.add('is-next'));
    if (!_guide.exp) els[0].scrollIntoView({ behavior: Labs.calm() ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
    const guideBox = _root.querySelector('#lab-guide');
    _root.querySelectorAll('[data-act],[data-mass],[data-height],[data-mode],[data-speed],[data-ans]').forEach(other => {
      if (!els.some(el => other === el || el.contains(other) || other.contains(el))
          && !(guideBox && guideBox.contains(other))) {
        other.classList.add('is-guide-dim');
      }
    });
  }

  function _guideHint() {
    _highlight();
    const el = _root.querySelector('.is-next');
    if (!el) return;
    el.classList.remove('is-idle-hint');
    void el.offsetWidth;
    el.classList.add('is-idle-hint');
    el.addEventListener('animationend', () => el.classList.remove('is-idle-hint'), { once: true });
    el.scrollIntoView({ behavior: Labs.calm() ? 'auto' : 'smooth', block: 'nearest' });
  }

  // The words for a discovery's "how" tokens - each names its control.
  function _tokenSay(token) {
    const L = P().label(token);
    const name = (L.icon ? L.icon + ' ' : '') + L.text;
    const [k] = token.split(':');
    if (k === 'mode')   return `Tap ${name} in the mode bar.`;
    if (k === 'mass')   return `Tap ${name} in the mass row.`;
    if (k === 'height') return `Tap ${name} in the height row.`;
    if (k === 'speed')  return `Tap ${name} to set the speed of the pull.`;
    if (k === 'pull')   return `Tap ${name} and watch the chips.`;
    if (k === 'timer')  return `Tap ${name} to switch the time and power chips on.`;
    if (k === 'read')   return `Tap ${name} to write the reading in your notebook.`;
    if (k === 'hold')   return `Tap ${name} and watch the Work chip.`;
    if (k === 'release') return `Tap ${name} and watch the load.`;
    if (k === 'card')   return 'Read the card, then close it.';
    return token;
  }

  // ══ Experiments (lab_experiment.js) ═══════════
  // focus(tokens): show only the controls an experiment's steps use; null
  // shows everything. Answer buttons are drawn per step, so they always show.
  function _applyFocus() {
    if (!_root) return;
    const on = !!_focus;
    const tokOf = b => b.dataset.mode ? 'mode:' + b.dataset.mode
      : b.dataset.mass !== undefined ? 'mass:' + b.dataset.mass
      : b.dataset.height !== undefined ? 'height:' + b.dataset.height
      : b.dataset.speed ? 'speed:' + b.dataset.speed
      : b.dataset.act;
    _root.querySelectorAll('.lab-tools [data-mode],.lab-tools [data-mass],.lab-tools [data-height],.lab-tools [data-speed],.lab-tools [data-act]').forEach(b => {
      b.hidden = on && !_focus.has(tokOf(b));
    });
    const anyShown = el => [...el.querySelectorAll('button')].some(b => !b.hidden);
    _root.querySelectorAll('.lab-energy-group').forEach(g => { g.hidden = on && !anyShown(g); });
    const tools = _root.querySelector('.lab-tools');
    if (tools) tools.hidden = on && !anyShown(tools);
  }

  const experiment = {
    list: () => (P().EXPERIMENTS || []).filter(e => !e.grades || e.grades.includes(Number(Labs.grade()))),
    question: ref => {
      if (ref && typeof ref === 'object') return ref;
      const [m, i] = String(ref).split(':');
      const M = P().MISSIONS.find(x => x.id === m);
      return M ? M.quiz[Number(i)] : null;
    },
    reset: () => {
      Labs.closeOverlay && Labs.closeOverlay(true);
      _mission = null; _guide = null; _guideStep = 0;
      _mode = 'lift'; _massIdx = 0; _heightIdx = 0; _speedIdx = 0;
      _pos = 0; _posAnim = 0; _running = false; _pullDone = false; _sliding = false; _slideT = 0;
      _timing = false; _timedResult = null; _flashAlpha = 0;
      _log = []; _panel = 'bench';
      const box = $('lab-guide'); if (box) { box.hidden = true; box.innerHTML = ''; }
      _renderAnswers(null);
      _syncButtons(); _syncTabs(); _highlight(); _renderReadouts(); _renderPanel(); _draw();
    },
    apply: tok => { _applying = true; try { _do(tok); } finally { _applying = false; } },
    guide: def => _startGuide(def),
    stop: () => _stopGuide(true),
    evidence: () => _log.slice(-6).map(_logText),
    focus: toks => { _focus = toks ? new Set(toks) : null; _applyFocus(); },
    selector: _selFor,
    hooks: {},
  };

  // ── Coach ──────────────────────────────────────
  function _coach(text) {
    if (_applying) return;
    const el = $('lab-energy-coach');
    if (el) el.textContent = text || '';
  }

  // ── Readouts (chip update) ───────────────────
  function _renderReadouts() {
    const c = _calc(), f = P().fmt;
    const chip = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    chip('lab-energy-force', c ? f(c.force) + ' N' : '- N');
    chip('lab-energy-dist',  c ? (c.dist * _posAnim).toFixed(2) + ' m' : '- m');
    chip('lab-energy-work',  c ? (c.work * _posAnim).toFixed(1) + ' J' : '- J');

    const tEl = $('lab-energy-time'), pEl = $('lab-energy-power');
    const s = _speed().s;
    if (tEl) {
      if (!_timing) tEl.textContent = 'off';
      else if (_running) tEl.textContent = (_pos * s).toFixed(1) + ' s';
      else if (_timedResult) tEl.textContent = f(_timedResult.timeS) + ' s';
      else tEl.textContent = '0.0 s';
    }
    if (pEl) {
      if (!_timing) pEl.textContent = 'off';
      else if (_timedResult && _pullDone && _timedResult.powerW !== null) pEl.textContent = f(_timedResult.powerW) + ' W';
      else pEl.textContent = '- W';
    }
    const tb = _root && _root.querySelector('[data-act="timer"]');
    if (tb) tb.setAttribute('aria-pressed', _timing ? 'true' : 'false');
  }

  // ── Canvas drawing ───────────────────────────
  function _draw() {
    if (!_cx) return;
    const c = _cx, W = _W, H = _H;
    c.save();
    c.clearRect(0, 0, W, H);

    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#EDF2FF'); bg.addColorStop(1, '#F8FAFF');
    c.fillStyle = bg; c.fillRect(0, 0, W, H);

    c.fillStyle = '#CBD5E1';
    c.fillRect(0, H - 28, W, 28);

    const rampX0 = 30, rampY0 = H - 28;
    const rampX1 = W - 30, rampY1 = 40;

    c.beginPath();
    c.moveTo(rampX0, rampY0);
    c.lineTo(rampX1, rampY0);
    c.lineTo(rampX1, rampY1);
    c.closePath();
    c.fillStyle = '#E2E8F0';
    c.fill();
    c.strokeStyle = '#94A3B8';
    c.lineWidth = 2;
    c.stroke();

    c.beginPath();
    c.moveTo(rampX0, rampY0);
    c.lineTo(rampX1, rampY1);
    c.strokeStyle = _mode === 'ramp' ? '#1D4ED8' : '#64748B';
    c.lineWidth = 3;
    c.stroke();

    c.fillStyle = '#64748B';
    c.font = '13px sans-serif';
    c.fillText('30°', rampX0 + 28, rampY0 - 8);

    // The stop at the bottom of the ramp (what a released load hits).
    c.fillStyle = '#475569';
    c.fillRect(rampX0 - 8, rampY0 - 14, 8, 14);

    const M = _mass();
    const objColor = M ? M.color : '#5B8DD9';
    const objSize = 24;
    let objX, objY;

    if (_mode === 'ramp') {
      const t = _posAnim;
      objX = rampX0 + (rampX1 - rampX0) * t + 10;
      objY = rampY0 + (rampY1 - rampY0) * t - 10;
      c.beginPath();
      c.moveTo(objX, objY);
      c.lineTo(rampX1, rampY1);
      c.strokeStyle = '#78716C';
      c.lineWidth = 2;
      c.setLineDash(_sliding ? [2, 6] : [4, 3]);
      c.stroke();
      c.setLineDash([]);
    } else {
      const liftX = W * 0.38;
      const liftY0 = H - 55, liftY1 = 55;
      objX = liftX;
      objY = liftY0 + (liftY1 - liftY0) * _posAnim;
      c.beginPath();
      c.moveTo(liftX, 16);
      c.lineTo(liftX, objY - objSize / 2);
      c.strokeStyle = '#78716C';
      c.lineWidth = 2;
      c.setLineDash([4, 3]);
      c.stroke();
      c.setLineDash([]);
      c.fillStyle = '#475569';
      c.fillRect(liftX - 20, 0, 40, 16);
      // Height arrow beside the load.
      if (_posAnim > 0.05) {
        const arrowX = liftX + 26;
        c.strokeStyle = '#1D4ED8'; c.lineWidth = 1.5;
        c.beginPath(); c.moveTo(arrowX, liftY0); c.lineTo(arrowX, objY); c.stroke();
        c.beginPath(); c.moveTo(arrowX - 4, objY + 6); c.lineTo(arrowX, objY); c.lineTo(arrowX + 4, objY + 6); c.stroke();
        c.fillStyle = '#1D4ED8'; c.font = 'bold 11px sans-serif';
        c.fillText(_height().label, arrowX + 6, (liftY0 + objY) / 2);
      }
    }

    const bx = objX - objSize / 2, by = objY - objSize / 2;
    c.fillStyle = objColor;
    c.beginPath();
    c.roundRect ? c.roundRect(bx, by, objSize, objSize, 4) : c.rect(bx, by, objSize, objSize);
    c.fill();
    c.strokeStyle = '#1E293B'; c.lineWidth = 1.5; c.stroke();

    if (M) {
      c.fillStyle = '#FFFFFF';
      c.font = 'bold 9px sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(M.label, objX, objY);
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    }

    if (_flashAlpha > 0) {
      c.fillStyle = `rgba(200,30,30,${_flashAlpha.toFixed(2)})`;
      c.fillRect(0, 0, W, H);
    }

    c.restore();
  }

  // ── Shell HTML ────────────────────────────────
  function _btn(tok, cls, extra = '') {
    const L = P().label(tok);
    const i = tok.indexOf(':');
    const k = i > 0 ? tok.slice(0, i) : tok, v = i > 0 ? tok.slice(i + 1) : '';
    const attr = k === 'mode' ? `data-mode="${v}" data-act="mode"` : k === 'mass' ? `data-mass="${v}"` : k === 'height' ? `data-height="${v}"`
      : k === 'speed' ? `data-speed="${v}"` : `data-act="${k}"`;
    return `<button type="button" class="${cls}" ${attr} ${extra}>${L.icon ? L.icon + ' ' : ''}${esc(L.text)}${L.sub ? `<small>${esc(L.sub)}</small>` : ''}</button>`;
  }

  function _shellHTML() {
    const D = P();
    return `
<div class="lab lab-energy" id="lab-energy-root">
  <header class="lab-top">
    <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
    <div class="lab-top-title">
      <span class="lab-eyebrow">Science · Grade 8</span>
      <h1>Work, Energy &amp; Power</h1>
    </div>
    <div class="lab-top-actions">
      <button type="button" class="lab-icon-btn" data-act="tip" aria-label="Science fact">💡</button>
      <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
    </div>
  </header>

  <div class="lab-body">
    <div class="lab-stage">
      <div class="lab-canvas-wrap">
        <canvas id="lab-energy-canvas" role="img" aria-label="An inclined plane with a load on a rope"></canvas>
        <div class="lab-energy-chips" aria-live="polite">
          <div class="lab-chip"><span>F</span><b id="lab-energy-force">- N</b></div>
          <div class="lab-chip"><span>d</span><b id="lab-energy-dist">- m</b></div>
          <div class="lab-chip lab-chip-w"><span>W</span><b id="lab-energy-work">- J</b></div>
          <div class="lab-chip"><span>t</span><b id="lab-energy-time">off</b></div>
          <div class="lab-chip lab-chip-p"><span>P</span><b id="lab-energy-power">off</b></div>
        </div>
      </div>

      <div class="lab-coach" id="lab-energy-coach">⚡ Choose a mode, mass and height, then tap Pull!</div>
      <div class="lab-task-strip">Set the mode, mass and height - then pull to measure work, energy and power!</div>
      <div class="lab-guide" id="lab-guide" aria-live="polite" hidden></div>

      <div class="lab-tools lab-energy-tools">
        <div class="lab-energy-group">
          <div class="lab-energy-label">Mode</div>
          <div class="lab-energy-mode-bar">${_btn('mode:lift', 'lab-energy-mode-btn')}${_btn('mode:ramp', 'lab-energy-mode-btn')}</div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-label">Mass</div>
          <div class="lab-energy-mass-row">${D.MASSES.map((m, i) => _btn('mass:' + i, 'lab-energy-mass-btn')).join('')}</div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-label">Height</div>
          <div class="lab-energy-height-row">${D.HEIGHTS.map((h, i) => _btn('height:' + i, 'lab-energy-height-btn')).join('')}</div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-label">Speed of the pull</div>
          <div class="lab-energy-speed-row">${D.SPEEDS.map(s => _btn('speed:' + s.id, 'lab-energy-speed-btn')).join('')}</div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-action-row">
            ${_btn('pull', 'lab-btn-primary lab-energy-pull-btn', 'aria-label="Pull the load up"')}
            ${_btn('timer', 'lab-btn-secondary lab-energy-timer-btn', 'aria-label="Timer on or off" aria-pressed="false"')}
            ${_btn('read', 'lab-btn-secondary', 'aria-label="Record the reading"')}
          </div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-action-row" id="lab-energy-misc-row">
            ${_btn('hold', 'lab-btn-ghost', 'aria-label="Hold still (no work done)"')}
            ${_btn('release', 'lab-btn-ghost', 'aria-label="Let go of the rope"')}
          </div>
        </div>
        <div class="lab-energy-group">
          <div class="lab-energy-ans-row" id="lab-energy-answers" role="group" aria-label="Your answer" hidden></div>
        </div>
      </div>
    </div>

    <div class="lab-side">
      <nav class="lab-tabs">
        <button type="button" class="lab-tab" data-tab="bench">🧪 Bench</button>
        <button type="button" class="lab-tab" data-tab="missions">🎯 Missions</button>
        <button type="button" class="lab-tab" data-tab="discoveries">✨ Discoveries</button>
      </nav>
      <div class="lab-panel" id="lab-energy-bench"><div id="lab-energy-bench-content"></div></div>
      <div class="lab-panel" id="lab-energy-missions" style="display:none"><div id="lab-energy-missions-content"></div></div>
      <div class="lab-panel" id="lab-energy-discoveries" style="display:none"><div id="lab-energy-discoveries-content"></div></div>
    </div>
  </div>
</div>`;
  }

  function _syncButtons() {
    if (!_root) return;
    _root.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === _mode));
    _root.querySelectorAll('[data-mass]').forEach(b => b.classList.toggle('active', b.dataset.mass === String(_massIdx)));
    _root.querySelectorAll('[data-height]').forEach(b => b.classList.toggle('active', b.dataset.height === String(_heightIdx)));
    _root.querySelectorAll('[data-speed]').forEach(b => b.classList.toggle('active', b.dataset.speed === _speed().id));
  }
  function _syncTabs() {
    if (!_root) return;
    _root.querySelectorAll('.lab-tab').forEach(b => { b.classList.toggle('active', b.dataset.tab === _panel); b.setAttribute('aria-selected', b.dataset.tab === _panel ? 'true' : 'false'); });
    _root.querySelectorAll('.lab-side .lab-panel').forEach(p => { p.style.display = (p.id === 'lab-energy-' + _panel) ? '' : 'none'; });
  }

  // ── Panel rendering ───────────────────────────
  function _renderPanel() {
    if (_panel === 'bench') _renderBench();
    else if (_panel === 'missions') _renderMissions();
    else if (_panel === 'discoveries') _renderDiscoveries();
  }

  function _logText(row) {
    const f = P().fmt;
    if (row.kind === 'release') return `Let go: ${row.label} slid down from ${row.height}. ${f(row.gpe)} J of GPE became movement.`;
    if (row.kind === 'hold') return 'Held still: d = 0 m, so W = 0 J.';
    if (row.kind === 'answer') return `You worked out: ${row.text} ✓`;
    const where = row.mode === 'ramp' ? `Ramp ${row.label} up to ${row.height}` : `Lift ${row.label} up ${row.height}`;
    const power = row.powerW !== null && row.powerW !== undefined ? `, t = ${f(row.timeS)} s, P = ${f(row.powerW)} W` : '';
    return `${where}: F = ${f(row.force)} N, d = ${f(row.dist)} m, W = ${f(row.work)} J${power}`;
  }

  function _renderBench() {
    const el = $('lab-energy-bench-content');
    if (!el) return;
    const st = Labs.store(ID);
    const guides = P().forGrade(P().GUIDES, 8);

    if (!_guide && _log.length === 0 && !st.intro) {
      el.innerHTML = `<div class="lab-start-wrap">
        <h2 class="lab-start-title">What would you like to do?</h2>
        <p class="lab-start-sub">Try a guided experiment to get started.</p>
        ${guides.map(G => `<button type="button" class="lab-start-item" data-guide="${G.id}">
          <span class="lab-start-icon">${esc(G.icon)}</span>
          <div><strong>${esc(G.title)}</strong><br><small>${esc(G.blurb)}</small></div>
        </button>`).join('')}
      </div>`;
      return;
    }

    let html = '';
    if (!_guide) {
      html += `<h3 class="lab-nb-head">Guided Experiments</h3>`;
      html += guides.map(G => {
        const done = st.guides && st.guides[G.id];
        return `<button type="button" class="lab-shelf lab-energy-guide-item${done ? ' lab-found' : ''}" data-guide="${G.id}">
          <span>${esc(G.icon)}</span>
          <div><strong>${esc(G.title)}</strong><br><small>${esc(G.blurb)}</small></div>
          ${done ? '<span class="lab-found-badge">✓</span>' : ''}
        </button>`;
      }).join('');
    }

    if (_log.length > 0) {
      html += `<h3 class="lab-nb-head">Lab Notebook</h3>
      <div class="lab-notebook"><div class="lab-log">`;
      _log.forEach((row, i) => {
        html += `<div class="lab-log-row"><span class="lab-log-n">${i + 1}</span><span>${esc(_logText(row))}</span></div>`;
      });
      html += '</div></div>';
    }

    el.innerHTML = html;
  }

  function _renderMissions() {
    const el = $('lab-energy-missions-content');
    if (!el) return;
    const missions = P().forGrade(P().MISSIONS, 8);
    const st = Labs.store(ID);
    let html = '<h3 class="lab-nb-head">Missions</h3>';
    missions.forEach(M => {
      const done = st.missions && st.missions[M.id];
      const stars = done ? done.stars : 0;
      html += `<div class="lab-mission-card">
        <div class="lab-mission-head">
          <span class="lab-mission-icon">${esc(M.icon)}</span>
          <div><strong>${esc(M.title)}</strong><br><small>${esc(M.blurb)}</small></div>
          <div class="lab-mission-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        </div>
        <button type="button" class="lab-btn-primary lab-mission-start" data-mission="${M.id}">
          ${stars > 0 ? 'Try again' : 'Start mission →'}
        </button>
      </div>`;
    });
    el.innerHTML = html;
  }

  function _renderDiscoveries() {
    const el = $('lab-energy-discoveries-content');
    if (!el) return;
    const all = P().forGrade(P().DISCOVERIES, 8);
    const st = Labs.store(ID);
    const found = (st.disc || {});
    const nFound = all.filter(d => found[d.id]).length;
    let html = `<p class="lab-found-count">${nFound} / ${all.length} discoveries</p>`;
    all.forEach(D => {
      const isFound = !!found[D.id];
      if (isFound) {
        html += `<div class="lab-found-card">
          <div class="lab-found-head"><span>${D.icon}</span><strong>${esc(D.title)}</strong></div>
          <p class="lab-found-saw">${esc(D.saw)}</p>
          <p class="lab-found-learn">${esc(D.learn)}</p>
          <button type="button" class="lab-btn-ghost lab-found-again" data-disc="${D.id}">Do it again →</button>
        </div>`;
      } else {
        html += `<div class="lab-locked-card">
          <div class="lab-found-head"><span>🔒</span><strong>${esc(D.title)}</strong></div>
          <p class="lab-hint">${esc(D.hint)}</p>
          <button type="button" class="lab-btn-ghost lab-disc-how" data-disc="${D.id}">Show me how →</button>
        </div>`;
      }
    });
    el.innerHTML = html;
  }

  // ── Tips / help ────────────────────────────────
  function _showTip() {
    const facts = P().FACTS;
    const f = facts[Math.floor(Math.random() * facts.length)];
    _coach('💡 ' + f);
  }

  function _showHelp() {
    Labs.resultCard({
      icon: '⚡',
      title: 'How this lab works',
      happened: 'You are on the Work, Energy & Power bench.',
      instead: '① Choose a mode (Lift or Ramp), a mass, a height and a speed.\n② Tap Pull! to raise the load and read F, d and W.\n③ Switch the Timer on before pulling to see t and P.\n④ Tap Record to write the reading in your notebook.\n\nFormulas: W = F × d · GPE = mgh · P = W ÷ t',
      exam: '📝 In the NCE exam - Work, Energy & Power is an examWeight 3 chapter.',
      onClose: () => {},
    });
  }

  // ── One token, one action ────────────────────
  // Every click and every experiment set-up goes through here.
  function _do(tok) {
    const i = tok.indexOf(':');
    const k = i > 0 ? tok.slice(0, i) : tok, v = i > 0 ? tok.slice(i + 1) : '';
    switch (k) {
      case 'mode': {
        if (v !== 'lift' && v !== 'ramp') return;
        _mode = v;
        _pos = 0; _posAnim = 0; _running = false; _sliding = false; _pullDone = false; _timedResult = null;
        _syncButtons(); _renderReadouts(); _draw();
        _guideEvent('mode:' + v);
        return;
      }
      case 'mass': {
        if (!P().MASSES[+v]) return;
        _massIdx = +v; _timedResult = null;
        _syncButtons(); _renderReadouts(); _draw();
        _guideEvent('mass:' + v);
        return;
      }
      case 'height': {
        if (!P().HEIGHTS[+v]) return;
        _heightIdx = +v; _timedResult = null;
        _syncButtons(); _renderReadouts(); _draw();
        _guideEvent('height:' + v);
        return;
      }
      case 'speed': {
        const idx = P().SPEEDS.findIndex(s => s.id === v);
        if (idx < 0) return;
        _speedIdx = idx;
        _syncButtons(); _renderReadouts();
        _guideEvent('speed:' + v);
        return;
      }
      case 'pull': {
        if (_running || _sliding) return;
        _pos = 0; _posAnim = _applying || _jump() ? 0 : _posAnim; _running = true; _pullDone = false; _timedResult = null;
        if (_applying) { _pos = 1; _posAnim = 1; _completePull(); }
        return;
      }
      case 'timer': {
        _timing = !_timing; _timedResult = null;
        _renderReadouts();
        if (_timing) _guideEvent('timer');
        return;
      }
      case 'read': {
        _guideEvent('read');
        _renderPanel();
        return;
      }
      case 'hold': {
        _log.push({ kind: 'hold' });
        _guideEvent('hold');
        _resultCard('no_work_held', {});
        _renderPanel();
        return;
      }
      case 'release': {
        if (_mode !== 'ramp' || !_pullDone || _running || _sliding) {
          _coach('Pull the load up the ramp first, then let go of the rope.');
          return;
        }
        _sliding = true; _slideT = 0;
        if (_applying || _jump()) { _slideT = SLIDE_S; _pos = 0; _posAnim = 0; _completeSlide(); }
        return;
      }
      case 'ans': {
        const s = _guide && _guide.steps[_guideStep];
        const hit = _stepHit(s, tok);
        if (hit) { _log.push({ kind: 'answer', text: v }); _renderPanel(); }
        _guideEvent(tok);
        return;
      }
      case 'card': return;   // a card token is met when the card closes
      case 'guide-hint': _guideHint(); return;
      case 'guide-stop': _stopGuide(false); return;
      case 'tip': _showTip(); return;
      case 'help': _showHelp(); return;
      case 'hub': Labs.backToHub(); return;
    }
  }

  // ── Event handling ────────────────────────────
  function _onAction(e) {
    const t = e.target.closest('[data-act],[data-tab],[data-guide],[data-mission],[data-disc],[data-mode],[data-mass],[data-height],[data-speed],[data-ans]');
    if (!t || !_root.contains(t)) return;

    if (t.dataset.tab) {
      _panel = t.dataset.tab;
      _syncTabs();
      _renderPanel();
      return;
    }
    if (t.dataset.guide) {
      const G = P().GUIDES.find(g => g.id === t.dataset.guide);
      if (G) _startGuide(G);
      return;
    }
    if (t.dataset.disc) {
      const D = P().DISCOVERIES.find(d => d.id === t.dataset.disc);
      if (D) {
        _startGuide({ id: 'disc_' + D.id, title: D.title, icon: D.icon, lesson: D.learn, adhoc: true,
          steps: D.how.map(on => ({ on, say: _tokenSay(on) })) });
      }
      return;
    }
    if (t.dataset.mission) {
      const M = P().MISSIONS.find(m => m.id === t.dataset.mission);
      if (M) _startMission(M);
      return;
    }
    if (t.dataset.mode) return _do('mode:' + t.dataset.mode);
    if (t.dataset.mass !== undefined) return _do('mass:' + t.dataset.mass);
    if (t.dataset.height !== undefined) return _do('height:' + t.dataset.height);
    if (t.dataset.speed) return _do('speed:' + t.dataset.speed);
    if (t.dataset.ans !== undefined) return _do('ans:' + t.dataset.ans);
    if (t.dataset.act) _do(t.dataset.act);
  }

  // ── Missions ──────────────────────────────────
  function _startMission(M) {
    _mission = M;
    Labs.quiz(M.quiz, {
      title: M.title,
      intro: M.intro,
      onDone: result => {
        _mission = null;
        const pct = result.firstTry / result.total;
        const stars = pct >= 0.8 ? 3 : pct >= 0.6 ? 2 : 1;
        const st = Labs.store(ID);
        st.missions = st.missions || {};
        const best = (st.missions[M.id] && st.missions[M.id].stars) || 0;
        if (stars > best) { st.missions[M.id] = { stars, score: result.firstTry, total: result.total }; Labs.persist(); }
        Labs.missionDone({ icon: M.icon, title: M.title, stars, score: result.firstTry, total: result.total, lines: [] });
        _renderPanel();
      },
    });
  }

  // ── Public API ────────────────────────────────
  function mount(root) {
    _root = root;
    root.innerHTML = _shellHTML();

    _cv = $('lab-energy-canvas');
    _cx = _cv ? _cv.getContext('2d') : null;

    if (!_resizeWired) {
      window.addEventListener('resize', _resize);
      _resizeWired = true;
    }
    _resize();

    root.addEventListener('click', _onAction);

    _guide = null; _guideStep = 0; _mission = null;
    _syncButtons(); _syncTabs(); _applyFocus();
    _last = 0;
    _raf = requestAnimationFrame(_loop);
    _renderReadouts();
    _renderPanel();
  }

  function unmount() {
    cancelAnimationFrame(_raf); _raf = 0;
    if (_root) { _root.removeEventListener('click', _onAction); _root = null; }
    _cv = null; _cx = null; _running = false; _sliding = false; _guide = null; _mission = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function _test(opts) {
    _instant = !!(opts && opts.instant);
  }

  // Advance the simulation by `seconds` without waiting for the frame loop.
  function _tick(seconds) {
    _step(seconds);
    if (_running && (_instant || seconds >= 10)) { _pos = 1; _posAnim = 1; _completePull(); }
    if (_sliding && (_instant || seconds >= 10)) { _slideT = SLIDE_S; _pos = 0; _posAnim = 0; _completeSlide(); }
    _draw();
  }

  function _debug() {
    return {
      mode: _mode, massIdx: _massIdx, heightIdx: _heightIdx, speed: _speed().id,
      pos: _pos, running: _running, sliding: _sliding, timing: _timing, pullDone: _pullDone,
      timed: _timedResult,
      panel: _panel, guideActive: !!_guide, guideStep: _guideStep,
      guide: _guide ? { id: _guide.id, step: _guideStep, exp: _guide.exp, n: _guide.steps.length } : null,
      focus: _focus ? [..._focus] : null,
      logCount: _log.length, log: _log.map(_logText),
      calc: _calc(),
      disc: Object.keys((Labs.store(ID).disc || {})),
      looping: !!_raf,
    };
  }

  const study = {
    guides: () => P().GUIDES,
    start: id => _startGuide(P().GUIDES.find(g => g.id === id)),
    stop: () => _stopGuide(true),
  };
  const startGuide = id => _startGuide(typeof id === 'object' ? id : P().GUIDES.find(g => g.id === id));
  const discoveryGuide = id => {
    const D = P().DISCOVERIES.find(d => d.id === id);
    if (D) _startGuide({ id: 'disc_' + D.id, title: D.title, icon: D.icon, lesson: D.learn, adhoc: true, steps: D.how.map(on => ({ on, say: _tokenSay(on) })) });
  };
  return { study, experiment, mount, unmount, startGuide, discoveryGuide, act: _do, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabEnergy = LabEnergy;
