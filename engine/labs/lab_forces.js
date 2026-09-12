'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Forces & Pressure (Science, Grade 8)
//
//  Mode A — Force Bench: a spring balance hanging from the top. Student taps
//  objects from the shelf to hang them on the hook. The spring extends,
//  a reading chip updates, and the notebook records each measurement.
//
//  Mode B — Pressure Pad: a surface being pressed. Student chooses a pad shape
//  and a force; P = F/A is computed; the canvas shows an animated indentation.
//
//  ⚠ All science comes from lab_forces_data.js (LabForcesData).
//  ⚠ Only the <canvas> animates. No transform/filter on any ancestor.
//  ⚠ Guide steps glow the target and WAIT for the student to tap.
//     The "Skip step" button calls the action directly as a fallback only.
//  ⚠ Calm Mode: animation is instant; effects are skipped.
//  ⚠ Never calls recordAnswer() or _recordDaily().
// ══════════════════════════════════════════════
const LabForces = (() => {
  const P = () => LabForcesData;
  const ID = 'forces';
  const FRAME_MS = 1000 / 30;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _resizeWired = false, _obs = null, _clock = 0;
  let _mode = 'bench';     // 'bench' | 'pressure'
  let _hook = null;        // current object id on the hook (bench mode)
  let _pad = 'flat';       // current pad id (pressure mode)
  let _force = 10;         // current force in N (pressure mode)
  let _applied = false;    // has the student applied the current F+pad combo?
  let _reads = [];         // notebook entries { mode, label, value, unit }
  let _panel = 'sandbox';  // 'sandbox' | 'missions' | 'found'
  let _guide = null;       // { id, step, def } or null
  let _mission = null;     // { id, results:{}, success:false } or null
  let _instant = false;
  let _tipIdx = -1;
  let _springExt = 0;      // current spring extension in px (animated)
  let _indentAnim = 0;     // current indentation in px (animated)
  let _flashAlpha = 0;     // red flash for hazards
  let _colors = null;

  const _grade = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 0;
    return P().GRADES.includes(g) ? g : P().GRADES[0];
  };
  const _mine = list => P().forGrade(list, _grade());

  // ══ Shell HTML ═══════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-forces">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title">
          <span class="lab-eyebrow">Science · Grade ${esc(_grade())}</span>
          <h1>Forces &amp; Pressure</h1>
        </div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How this lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-forces-mode-bar" id="lab-forces-modebar" role="group" aria-label="Choose mode">
            <button type="button" data-act="mode-bench" aria-pressed="true">⚖️ Force Bench</button>
            <button type="button" data-act="mode-pressure" aria-pressed="false">📐 Pressure Pad</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-forces-stage">
            <canvas id="lab-forces-canvas" role="img" aria-label="Forces and pressure apparatus"></canvas>
            <div class="lab-forces-chips" id="lab-forces-chips"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Apply forces and measure the effects — push, pull, stretch or compress.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-forces-shelf" id="lab-forces-shelf"></div>
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

  // ══ Mount / Unmount ══════════════════════════
  function mount(root) {
    _root = root;
    root.innerHTML = _shellHTML();
    _cv = $('lab-forces-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderShelf();
    _renderPanel();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else _coach(_mode === 'bench'
      ? '👋 Tap an object from the shelf to hang it on the spring balance — then read its weight.'
      : '📐 Choose a pad shape and a force, then apply it to see the pressure.');
    if (!_resizeWired) {
      window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); });
      _resizeWired = true;
    }
    if (_obs) _obs.disconnect();
    const scr = root.closest('.screen');
    if (scr && typeof MutationObserver !== 'undefined') {
      _obs = new MutationObserver(() => {
        if (scr.classList.contains('hidden')) _stop();
        else if (_root && _cv && _cv.isConnected && !_raf) _start();
      });
      _obs.observe(scr, { attributes: true, attributeFilter: ['class'] });
    }
    _start();
  }

  function unmount() {
    if (_obs) { _obs.disconnect(); _obs = null; }
    _stop();
    _root = null; _cv = null; _cx = null;
  }

  // ══ Resize / Colors ══════════════════════════
  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = {
      bg:    v('--lab-forces-bg',    '#EDF4F2'),
      bench: v('--lab-forces-bench', '#C4D6D2'),
      spring:v('--lab-forces-spring','#5E7E7A'),
      hook:  v('--lab-forces-hook',  '#37474F'),
      ground:v('--lab-forces-ground','#8AAF8A'),
      sand:  v('--lab-forces-sand',  '#D9C99A'),
      ink:   v('--lab-forces-ink',   '#14211D'),
      accent:v('--lab-accent',       '#1D6A96'),
    };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(340, Math.max(220, w * 0.72)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _readColors();
    _draw(0);
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const g = e.target.closest('[data-guide]');
      if (g) { startGuide(g.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
      const ob = e.target.closest('[data-obj]');
      if (ob) { _placeObj(ob.dataset.obj); return; }
      const pd = e.target.closest('[data-pad]');
      if (pd) { _setPad(pd.dataset.pad); return; }
      const fn = e.target.closest('[data-fN]');
      if (fn) { _setForce(+fn.dataset.fN); return; }
    };
  }

  function _act(act) {
    switch (act) {
      case 'hub':          Labs.backToHub(); break;
      case 'help':         _help(); break;
      case 'tip':          _nextTip(); break;
      case 'mode-bench':   _switchMode('bench'); break;
      case 'mode-pressure':_switchMode('pressure'); break;
      case 'apply':        _applyForce(); break;
      case 'read':         _read(); break;
      case 'remove':       _removeObj(); break;
      case 'guide-stop':   _stopGuide(false); break;
      case 'quiz':         _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Mission left. Explore freely.'); _renderPanel(); break;
    }
  }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = P().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Mode switch ══════════════════════════════
  function _switchMode(m) {
    if (_mode === m) return;
    _mode = m;
    _hook = null; _applied = false;
    _springExt = 0; _indentAnim = 0;
    _syncModeBar();
    _renderShelf();
    _readouts();
    _draw(0);
    _coach(m === 'bench'
      ? 'Force Bench. Tap an object from the shelf to hang it on the spring balance.'
      : 'Pressure Pad. Choose a pad shape, then a force, then tap "Apply force".');
    _guideEvent('mode:' + m);
  }

  function _syncModeBar() {
    const mb = $('lab-forces-modebar');
    if (!mb) return;
    mb.querySelectorAll('[data-act]').forEach(b => {
      const isBench = b.dataset.act === 'mode-bench';
      b.setAttribute('aria-pressed', String(isBench === (_mode === 'bench')));
    });
  }

  // ══ Bench: objects ════════════════════════════
  function _placeObj(id) {
    const D = P(), obj = D.OBJECTS[id];
    if (!obj) return;
    if (_mode !== 'bench') { _switchMode('bench'); }
    if (!obj.maxSafe) {
      // hazard: overload
      _hazard('overload', { obj: obj.short, weight: obj.weight }, null);
      _guideEvent('card:overload');
      return;
    }
    _hook = id;
    _applied = false;
    _coach(`${obj.name} is on the hook — it weighs ${obj.weight} N. Tap "Record" to save the reading.`);
    _renderShelf();
    _readouts();
    _guideEvent('obj:' + id);
  }

  function _removeObj() {
    _hook = null; _springExt = 0;
    _coach('Object removed. Choose another from the shelf.');
    _renderShelf();
    _readouts();
    _guideEvent('remove');
  }

  // ══ Pressure: pad & force ════════════════════
  function _setPad(id) {
    if (!P().PADS[id]) return;
    _pad = id;
    _applied = false; _indentAnim = 0;
    _renderShelf();
    _readouts();
    _coach(P().PADS[id].name + ' selected. Now choose a force and tap "Apply force".');
    _guideEvent('pad:' + id);
  }

  function _setForce(n) {
    if (!P().FORCES_N.includes(n)) return;
    _force = n;
    _applied = false;
    _renderShelf();
    _coach(_force + ' N selected.');
    _guideEvent('force:' + n);
  }

  function _applyForce() {
    if (_mode !== 'pressure') return;
    _applied = true;
    const r = P().calcPressure(_force, _pad);
    if (!r) return;
    _coach(`${_force} N on ${r.areaCm2} cm² (${r.areaM2} m²) = ${r.pa.toLocaleString()} Pa. Tap "Record" to save.`);
    _readouts();
    _guideEvent('apply');
  }

  // ══ Read and record ══════════════════════════
  function _read() {
    if (_mode === 'bench') {
      if (!_hook) { _coach('Nothing on the hook yet. Tap an object from the shelf first.'); return; }
      const D = P(), obj = D.OBJECTS[_hook];
      _reads.unshift({ mode: 'bench', label: obj.name, value: obj.weight, unit: 'N',
                       sub: `mass ${obj.mass} kg · W = ${obj.mass} × 10 = ${obj.weight} N` });
      if (_reads.length > 20) _reads.length = 20;
      _coach(`Recorded: ${obj.name} weighs ${obj.weight} N.`);
      // mission tracking happens before any early return so every read counts
      _missionReadBench(_hook);
      // check for mass/weight confusion: show result card on first bench reading
      const st = Labs.store(ID);
      if (!st._shownMW) {
        st._shownMW = true; Labs.persist();
        _guideEvent('read');
        _resultCard('mass_weight', { obj: obj.short, mass: obj.mass, weight: obj.weight });
        _guideEvent('card:mass_weight');
        return;
      }
      // unlock discoveries
      P().discoveriesFor(_hook, null, null).forEach(_discover);
      _guideEvent('read');
      _renderPanel();
    } else {
      if (!_applied) { _coach('Apply a force first — choose a pad, a force, then tap "Apply force".'); return; }
      const r = P().calcPressure(_force, _pad);
      if (!r) return;
      const pad = P().PADS[_pad];
      _reads.unshift({ mode: 'pressure', label: `${pad.short} · ${_force} N`,
                       value: r.pa, unit: 'Pa',
                       sub: `F = ${_force} N · A = ${r.areaCm2} cm² = ${r.areaM2} m² · P = F÷A` });
      if (_reads.length > 20) _reads.length = 20;
      // mission tracking before any early return
      _missionReadPressure(_pad, _force);
      // unit conversion result card on first pressure reading
      const st = Labs.store(ID);
      if (!st._shownUnits) {
        st._shownUnits = true; Labs.persist();
        _guideEvent('read');
        _resultCard('wrong_units', { nPerCm2: +(r.forceN / r.areaCm2).toFixed(4) });
        _guideEvent('card:wrong_units');
        return;
      }
      P().discoveriesFor(null, _pad, _force).forEach(_discover);
      _coach(`Recorded: ${pad.name} at ${_force} N = ${r.pa.toLocaleString()} Pa.`);
      _guideEvent('read');
      _renderPanel();
    }
    _refresh();
  }

  function _resultCard(id, ctx) {
    const R = P().RESULTS[id];
    const v = x => (typeof x === 'function' ? x(ctx) : x);
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.resultCard({ icon: R.icon, title: v(R.title), happened: v(R.happened), instead: v(R.instead), exam: R.exam,
      onClose: () => { _guideEvent('card:' + id); _refresh(); } });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id, ctx, after) {
    const H = P().HAZARDS[id];
    const st = Labs.store(ID);
    st.hazards = st.hazards || {};
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards = (_mission.hazards || 0) + 1;
    _flashAlpha = 0.55;
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.hazardCard({
      signs: H.signs,
      title: H.title(ctx),
      happened: H.happened(ctx),
      why: H.why,
      instead: H.instead,
      exam: H.exam,
      onClose: () => { _flashAlpha = 0; if (after) after(); _readouts(); _draw(0); },
    });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    const calm = Labs.calm();

    // Spring extension animates toward target
    if (_mode === 'bench' && _hook) {
      const D = P(), obj = D.OBJECTS[_hook];
      const target = obj && obj.maxSafe ? Math.min(D.SPRING.maxPx, obj.weight * D.SPRING.pxPerN) : 0;
      const speed = calm ? 9999 : 140;
      _springExt += (target - _springExt) * Math.min(1, speed * dt);
      if (Math.abs(_springExt - target) < 0.5) _springExt = target;
    } else {
      _springExt = Math.max(0, _springExt - 200 * dt);
    }

    // Indentation animates toward target
    if (_mode === 'pressure' && _applied) {
      const r = P().calcPressure(_force, _pad);
      const target = r ? P().indentDepth(r.pa) : 0;
      const speed = calm ? 9999 : 120;
      _indentAnim += (target - _indentAnim) * Math.min(1, speed * dt);
      if (Math.abs(_indentAnim - target) < 0.3) _indentAnim = target;
    } else {
      _indentAnim = Math.max(0, _indentAnim - 80 * dt);
    }

    _flashAlpha = Math.max(0, _flashAlpha - 1.2 * dt);
    if (!Labs.calm()) _clock += dt;
  }

  // ══ Drawing ══════════════════════════════════
  function _draw(dt) {
    if (!_cx) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);

    // background gradient
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.bg); bg.addColorStop(1, _colors.bench);
    c.fillStyle = bg; c.fillRect(0, 0, _W, _H);

    if (_mode === 'bench') _drawBench(c);
    else _drawPressure(c);

    // hazard flash
    if (_flashAlpha > 0) {
      c.fillStyle = `rgba(200,30,30,${_flashAlpha.toFixed(2)})`;
      c.fillRect(0, 0, _W, _H);
    }

    c.restore();
  }

  function _drawBench(c) {
    const cx = _W * 0.5;

    // ceiling bar
    c.fillStyle = _colors.hook;
    c.fillRect(cx - 40, 6, 80, 10);

    // the spring
    const springTop = 16, numCoils = 8;
    const totalLen = 60 + _springExt;
    const springBot = springTop + totalLen;

    c.save();
    c.strokeStyle = _colors.spring; c.lineWidth = 2.5; c.lineCap = 'round';
    c.beginPath();
    c.moveTo(cx, springTop);
    const coilW = 14, seg = totalLen / (numCoils * 2 + 1);
    for (let i = 0; i <= numCoils * 2; i++) {
      const y = springTop + seg * (i + 0.5);
      c.lineTo(cx + (i % 2 === 0 ? coilW : -coilW), y);
    }
    c.lineTo(cx, springBot);
    c.stroke();
    c.restore();

    // hook
    c.save();
    c.strokeStyle = _colors.hook; c.lineWidth = 2.5; c.lineCap = 'round';
    c.beginPath();
    c.moveTo(cx, springBot);
    c.lineTo(cx, springBot + 12);
    c.arc(cx + 6, springBot + 12, 6, Math.PI, 0, true);
    c.stroke();
    c.restore();

    // scale marks on the spring housing
    const markTop = springTop; const markH = 70;
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(cx + 24, markTop, 14, markH);
    for (let n = 0; n <= P().SPRING.maxSafe; n += 2) {
      const y = markTop + (n / P().SPRING.maxSafe) * markH;
      c.fillStyle = _colors.ink; c.fillRect(cx + 24, y, 10, 1);
      if (n % 4 === 0) {
        c.font = '600 8px system-ui,sans-serif'; c.textAlign = 'left';
        c.fillText(n + ' N', cx + 36, y + 3);
      }
    }
    // pointer
    const ptr = markTop + (_springExt / P().SPRING.maxPx) * markH;
    c.fillStyle = _colors.accent;
    c.beginPath(); c.moveTo(cx + 22, ptr); c.lineTo(cx + 26, ptr - 4); c.lineTo(cx + 26, ptr + 4); c.closePath(); c.fill();

    // hanging object
    if (_hook) {
      const obj = P().OBJECTS[_hook];
      const oy = springBot + 18, ow = 44, oh = 30;
      c.fillStyle = obj.swatch;
      c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 1.5;
      c.fillRect(cx - ow / 2, oy, ow, oh);
      c.strokeRect(cx - ow / 2, oy, ow, oh);
      c.fillStyle = _colors.ink;
      c.font = '700 10px system-ui,sans-serif'; c.textAlign = 'center';
      c.fillText(obj.short, cx, oy + oh / 2 + 4);
    }

    // ground
    c.fillStyle = _colors.ground;
    c.fillRect(0, _H - 18, _W, 18);
    c.fillStyle = 'rgba(0,0,0,0.12)';
    c.fillRect(0, _H - 18, _W, 4);
  }

  function _drawPressure(c) {
    const padId = _pad, D = P(), pad = D.PADS[padId];

    // surface / ground material (sand/grass)
    const groundTop = _H * 0.60;
    c.fillStyle = _colors.sand;
    c.fillRect(0, groundTop, _W, _H - groundTop);
    // grass texture
    c.fillStyle = _colors.ground;
    c.fillRect(0, groundTop, _W, 8);

    // indentation in the ground
    const indW = Math.min(_W * 0.5, 20 + pad.areaCm2 * 0.6);
    const indY = groundTop + 8;
    const depth = _indentAnim;
    if (depth > 1) {
      c.fillStyle = 'rgba(100,70,40,0.5)';
      c.beginPath();
      c.ellipse(_W / 2, indY + depth, indW / 2, depth * 0.38, 0, 0, Math.PI * 2);
      c.fill();
    }

    // pad shape (presses downward from above)
    const padY = indY - 16 - (depth > 0 ? 0 : 12) + (depth > 0 ? depth : 0);
    const padW = Math.min(_W * 0.52, 18 + pad.areaCm2 * 0.58);
    const padH = padId === 'nail' ? 24 : padId === 'heel' ? 20 : 14;

    c.fillStyle = pad.swatch;
    c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 2;

    if (padId === 'nail' || padId === 'heel') {
      // tapered shape — wider at top, narrow at bottom
      c.beginPath();
      c.moveTo(_W / 2 - padW / 2, padY);
      c.lineTo(_W / 2 + padW / 2, padY);
      c.lineTo(_W / 2 + 3, padY + padH);
      c.lineTo(_W / 2 - 3, padY + padH);
      c.closePath(); c.fill(); c.stroke();
    } else {
      c.fillRect(_W / 2 - padW / 2, padY, padW, padH);
      c.strokeRect(_W / 2 - padW / 2, padY, padW, padH);
    }

    // force arrow (downward) when applied
    if (_applied && _force > 0) {
      const arrowTop = padY - 30 - (_force / 50) * 14;
      const arrowLen = 22 + (_force / 50) * 12;
      c.strokeStyle = '#C62828'; c.lineWidth = 3; c.lineCap = 'round';
      c.beginPath(); c.moveTo(_W / 2, arrowTop); c.lineTo(_W / 2, arrowTop + arrowLen); c.stroke();
      // arrowhead
      c.fillStyle = '#C62828';
      c.beginPath();
      c.moveTo(_W / 2, arrowTop + arrowLen + 8);
      c.lineTo(_W / 2 - 7, arrowTop + arrowLen - 2);
      c.lineTo(_W / 2 + 7, arrowTop + arrowLen - 2);
      c.closePath(); c.fill();
      // force label
      c.fillStyle = '#C62828';
      c.font = '700 11px system-ui,sans-serif'; c.textAlign = 'center';
      c.fillText(_force + ' N', _W / 2, arrowTop - 5);
    }

    // pad label
    c.fillStyle = _colors.ink;
    c.font = '600 10px system-ui,sans-serif'; c.textAlign = 'center';
    c.fillText(pad.short + ' · ' + pad.areaCm2 + ' cm²', _W / 2, padY - 4);

    // pressure label in the ground
    if (_applied && depth > 5) {
      const r = D.calcPressure(_force, _pad);
      if (r) {
        c.fillStyle = 'rgba(255,255,255,0.88)';
        c.font = '700 11px system-ui,sans-serif'; c.textAlign = 'center';
        c.fillText(r.pa.toLocaleString() + ' Pa', _W / 2, indY + depth + 16);
      }
    }
  }

  // ══ Loop ═════════════════════════════════════
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) return;
    const scr = _root.closest('.screen');
    if ((typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs')
        || (scr && scr.classList.contains('hidden'))) return;
    _raf = requestAnimationFrame(_loop);
    if (document.hidden) { _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    _step(dt);
    _draw(dt);
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root) return;
    const chips = $('lab-forces-chips');
    if (!chips) return;
    const bits = [];
    if (_mode === 'bench') {
      if (_hook) {
        const obj = P().OBJECTS[_hook];
        bits.push(`<span class="lab-chip">⚖️ ${esc(obj.name)}</span>`);
        bits.push(`<span class="lab-chip is-warm">${obj.weight} N</span>`);
        bits.push(`<span class="lab-chip">${obj.mass} kg</span>`);
      }
    } else {
      const pad = P().PADS[_pad];
      bits.push(`<span class="lab-chip">${esc(pad.short)}</span>`);
      bits.push(`<span class="lab-chip">${pad.areaCm2} cm²</span>`);
      bits.push(`<span class="lab-chip">${_force} N</span>`);
      if (_applied) {
        const r = P().calcPressure(_force, _pad);
        if (r) bits.push(`<span class="lab-chip is-warm">${r.pa.toLocaleString()} Pa</span>`);
      }
    }
    chips.innerHTML = bits.join('');
    _syncModeBar();
  }

  // ══ Shelf (objects or pads + force) ══════════
  function _renderShelf() {
    const box = $('lab-forces-shelf');
    if (!box) return;
    if (_mode === 'bench') {
      const items = P().SHELF_OBJECTS.map(id => {
        const obj = P().OBJECTS[id];
        const isCur = _hook === id;
        const danger = !obj.maxSafe;
        return `<button type="button" class="lab-item${isCur ? ' is-active' : ''}${danger ? ' is-danger' : ''}" data-obj="${esc(id)}" aria-pressed="${isCur}">
          <span class="lab-swatch" style="background:${obj.swatch}"></span>
          <span class="lab-item-text"><b>${esc(obj.name)}</b><small>${esc(obj.meta)}</small></span>
          ${danger ? `<span class="lab-item-sign" title="Overloads the spring balance">${Labs.sign('warning', true)}</span>` : ''}
        </button>`;
      }).join('');
      const removeBtn = _hook
        ? `<button type="button" class="lab-tool" data-act="remove"><span aria-hidden="true">❌</span> Remove</button>` : '';
      const readBtn = _hook
        ? `<button type="button" class="lab-tool lab-btn-primary" data-act="read"><span aria-hidden="true">📋</span> Record reading</button>` : '';
      box.innerHTML = `<section class="lab-shelf" aria-label="Objects shelf">
        <p class="lab-hint">Tap an object to hang it on the spring balance.</p>
        <div class="lab-items lab-forces-objects">${items}</div>
        <div class="lab-tools lab-forces-tools">${removeBtn}${readBtn}</div>
      </section>`;
    } else {
      const padItems = P().SHELF_PADS.map(id => {
        const pd = P().PADS[id];
        return `<button type="button" class="lab-item${_pad === id ? ' is-active' : ''}" data-pad="${esc(id)}" aria-pressed="${_pad === id}">
          <span class="lab-item-icon" aria-hidden="true">${esc(pd.icon)}</span>
          <span class="lab-item-text"><b>${esc(pd.name)}</b><small>${esc(pd.areaCm2)} cm² = ${esc(String(pd.areaM2))} m²</small></span>
        </button>`;
      }).join('');
      const forceItems = P().FORCES_N.map(n =>
        `<button type="button" class="lab-forces-fBtn${_force === n ? ' is-active' : ''}" data-fN="${n}" aria-pressed="${_force === n}">${n} N</button>`
      ).join('');
      const applyBtn = `<button type="button" class="lab-tool lab-btn-primary" data-act="apply">▼ Apply force</button>`;
      const readBtn = _applied ? `<button type="button" class="lab-tool" data-act="read">📋 Record</button>` : '';
      box.innerHTML = `<section class="lab-shelf" aria-label="Pressure controls">
        <p class="lab-hint">Choose a pad shape and a force, then apply.</p>
        <div class="lab-items lab-forces-pads">${padItems}</div>
        <div class="lab-forces-force-row" role="group" aria-label="Force">${forceItems}</div>
        <div class="lab-tools lab-forces-tools">${applyBtn}${readBtn}</div>
      </section>`;
    }
    _highlight();
  }

  // ══ Guide ════════════════════════════════════
  const _gdef = () => _guide && (_guide.def || _mine(P().GUIDES).find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(P().GUIDES).find(g => g.id === idOrDef);
    if (!G) return;
    if (Labs.studyBegin && Labs.studyBegin('forces', G, () => startGuide(idOrDef))) return;
    _mission = null;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _renderShelf();
    _guideEnter();
  }

  function _guideEnter() {
    if (Labs.studyCheckpoint) Labs.studyCheckpoint('forces');
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${esc(G.icon)} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) =>
          `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
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
    const [kind, id] = s.on.split(':');
    if (kind === 'mode') { _switchMode(id); }
    else if (kind === 'obj')  { _placeObj(id); }
    else if (kind === 'pad')  { _setPad(id); }
    else if (kind === 'force'){ _setForce(+id); }
    else if (kind === 'apply'){ _applyForce(); }
    else if (kind === 'read') { _read(); }
    else if (kind === 'remove'){ _removeObj(); }
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

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const [kind, id] = s.on.split(':');
    const sel = kind === 'mode' && id === 'bench' ? '[data-act="mode-bench"]'
      : kind === 'mode' && id === 'pressure'      ? '[data-act="mode-pressure"]'
      : kind === 'obj'   ? `[data-obj="${id}"]`
      : kind === 'pad'   ? `[data-pad="${id}"]`
      : kind === 'force' ? `[data-fN="${id}"]`
      : kind === 'apply' ? '[data-act="apply"]'
      : kind === 'read'  ? '[data-act="read"]'
      : null;
    const el = sel && _root.querySelector(sel);
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-act],[data-obj],[data-pad],[data-fN]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    if (Labs.studyComplete && Labs.studyComplete('forces', G)) { _stopGuide(true); return; }
    const st = Labs.store(ID);
    if (!G.adhoc) { st.guides = st.guides || {}; st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _mine(P().GUIDES).find(g => !((st.guides || {})[g.id]));
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
    _coach('Experiment done! Pick the next one below, or try a mission.');
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or explore freely.');
  }

  // ══ Discoveries ══════════════════════════════
  function discoveryGuide(id) {
    const d = _mine(P().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn,
      steps: d.how.map(on => _autoStep(on)) });
  }

  function _autoStep(on) {
    const D = P(), [k, a] = on.split(':');
    if (k === 'mode')  return { on, say: `Switch to the ${a === 'bench' ? 'Force Bench' : 'Pressure Pad'}.`, btn: a === 'bench' ? '⚖️ Force Bench' : '📐 Pressure Pad' };
    if (k === 'obj')   return { on, say: `Tap the ${D.OBJECTS[a].name.toLowerCase()} to hang it on the spring balance.`, btn: D.OBJECTS[a].icon + ' Hang ' + D.OBJECTS[a].short };
    if (k === 'pad')   return { on, say: `Choose the ${D.PADS[a].name.toLowerCase()}.`, btn: D.PADS[a].icon + ' ' + D.PADS[a].name };
    if (k === 'force') return { on, say: `Set the force to ${a} N.`, btn: a + ' N' };
    if (k === 'apply') return { on, say: 'Apply the force to the pad.', btn: '▼ Apply force' };
    if (k === 'read')  return { on, say: 'Record the reading.', btn: '📋 Record reading' };
    if (k === 'remove')return { on, say: 'Remove the object.', btn: '❌ Remove' };
    if (k === 'card')  return { on, say: 'Read the card that appears.' };
    return { on, say: on };
  }

  function _discover(id) {
    const all = _mine(P().DISCOVERIES);
    const d = all.find(x => x.id === id);
    if (!d) return;
    if (Labs.discover(ID, id, { title: d.title, total: all.length })) _refresh();
  }

  function _discDetail(id) {
    const d = _mine(P().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store(ID).disc[id];
    if (!found) {
      Labs.overlay(`
        <div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(d.hint)}</h2>
          <section class="lab-hz-sec is-do lab-done-lesson"><h3>How to find it</h3>
            <ol class="lab-disc-steps">${d.how.map(on => `<li>${esc(_autoStep(on).say)}</li>`).join('')}</ol></section>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${esc(id)}" data-autofocus>Show me how →</button>
        </div>`, { cls: 'is-done' });
      return;
    }
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${d.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(d.saw)}</p></section>
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${esc(id)}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = _mine(P().MISSIONS).find(x => x.id === id);
    if (!M) return;
    _stopGuide(true);
    _hook = null; _applied = false;
    _mission = { id, results: {}, hazards: 0, success: false };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = P().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(ID);
      const prev = (st.missions || {})[ms.id] || {};
      st.missions = st.missions || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} — avoid them for an extra star.` : 'No safety mistakes. 👍');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved! Try the other mission or hunt for discoveries.'); } });
    } });
  }

  function _missionReadBench(objId) {
    const ms = _mission;
    if (!ms) return;
    const M = P().MISSIONS.find(x => x.id === ms.id);
    if (ms.id === 'spring_survey' && M.needs.includes(objId)) {
      const obj = P().OBJECTS[objId];
      ms.results[objId] = obj.weight;
      const done = M.needs.filter(n => ms.results[n]).length;
      if (done === M.needs.length) ms.success = true;
      else _coach(`Recorded (${done} of ${M.needs.length}). Hang the next object.`);
    }
    if (ms.success) { _coach('🎯 All measured! Tap "Answer the questions" to earn stars.'); Labs.confetti(); }
    _refresh();
  }

  function _missionReadPressure(padId, forceN) {
    const ms = _mission;
    if (!ms) return;
    if (ms.id === 'pressure_detective') {
      const M = P().MISSIONS.find(x => x.id === ms.id);
      const scen = M.scenarios.find(s => s.padId === padId && s.forceN === forceN);
      if (scen) {
        ms.results[scen.label] = P().calcPressure(forceN, padId).pa;
        const done = M.scenarios.filter(s => ms.results[s.label]).length;
        if (done === M.scenarios.length) ms.success = true;
        else _coach(`Scenario recorded (${done} of ${M.scenarios.length}). Try the next one.`);
      }
    }
    if (ms.success) { _coach('🎯 All scenarios done! Tap "Answer the questions".'); Labs.confetti(); }
    _refresh();
  }

  // ══ Panel rendering ═══════════════════════════
  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _notebookHTML();
    _foundCount();
    _highlight();
  }

  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
    _renderShelf();
    _readouts();
  }

  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const all = _mine(P().DISCOVERIES), st = Labs.store(ID);
    n.textContent = `${all.filter(d => st.disc && st.disc[d.id]).length}/${all.length}`;
  }

  function _startHTML() {
    const st = Labs.store(ID);
    const guides = st.guides || {};
    const missions = st.missions || {};
    const guide = G => {
      const done = !!guides[G.id];
      return `<div class="lab-start-card${done ? ' is-done' : ''}">
        <span class="lab-start-icon" aria-hidden="true">${G.icon}</span>
        <span class="lab-start-text"><b>${esc(G.title)}${done ? ' <em>✓ done</em>' : ''}</b><small>${esc(G.blurb)}</small></span>
        <button type="button" class="lab-btn lab-btn-sm${done ? '' : ' lab-btn-primary'}" data-guide="${G.id}">${done ? 'Again' : 'Start'}</button></div>`;
    };
    const mission = M => {
      const best = ((missions[M.id] || {}).stars) || 0;
      return `<div class="lab-start-card">
        <span class="lab-start-icon" aria-hidden="true">${M.icon}</span>
        <span class="lab-start-text"><b>${esc(M.title)}</b><small>${esc(M.blurb)}</small>${Labs.stars(best)}</span>
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Force Bench</b>: tap an object to hang it on the spring balance and read its weight in N.</li>
        <li><b>Pressure Pad</b>: choose a pad shape and a force, then apply it. Watch the indentation.</li>
        <li><b>Record</b> each result in the notebook, then try a mission to earn stars.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_mine(P().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_mine(P().MISSIONS).map(mission).join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const rows = _reads.slice(0, 14).map(r =>
      `<tr><th scope="row">${esc(r.label)}</th><td class="lab-forces-val">${esc(String(r.value))}</td><td>${esc(r.unit)}</td><td>${esc(r.sub)}</td></tr>`
    ).join('');
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>
      ${rows
        ? `<div class="lab-table-wrap"><table class="lab-table"><caption>Measurements</caption>
            <thead><tr><th scope="col">Object / setup</th><th scope="col">Reading</th><th scope="col">Unit</th><th scope="col">Working</th></tr></thead>
            <tbody>${rows}</tbody></table></div>`
        : '<p class="lab-empty">Tap "Record reading" and each result appears here.</p>'}
    </section>`;
  }

  function _missionListHTML() {
    const st = Labs.store(ID);
    const missions = st.missions || {};
    return `<section class="lab-missions"><h2>Missions</h2>
      <p class="lab-hint">Complete the tasks, then answer exam-style questions to earn stars.</p>
      ${_mine(P().MISSIONS).map(M => {
        const best = ((missions[M.id] || {}).stars) || 0;
        return `<article class="lab-mission-card">
          <span class="lab-mission-icon" aria-hidden="true">${M.icon}</span>
          <div><h3>${esc(M.title)}</h3><p>${esc(M.blurb)}</p>${Labs.stars(best)}</div>
          <button type="button" class="lab-btn lab-btn-primary" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button>
        </article>`;
      }).join('')}</section>`;
  }

  function _missionHTML() {
    const ms = _mission;
    if (!ms) return '';
    const M = P().MISSIONS.find(x => x.id === ms.id);
    let items;
    if (ms.id === 'spring_survey') {
      items = M.needs.map(id => {
        const obj = P().OBJECTS[id];
        const r = ms.results[id];
        return `<li class="${r ? 'is-done' : ''}">${esc(obj.name)}: ${r !== undefined ? r + ' N' : 'hang it and record'}</li>`;
      });
    } else {
      items = M.scenarios.map(s => {
        const r = ms.results[s.label];
        return `<li class="${r !== undefined ? 'is-done' : ''}">${esc(s.label)}: ${r !== undefined ? r.toLocaleString() + ' Pa' : 'calculate'}</li>`;
      });
    }
    const total = ms.id === 'spring_survey' ? M.needs.length : M.scenarios.length;
    const done = ms.id === 'spring_survey'
      ? M.needs.filter(n => ms.results[n] !== undefined).length
      : M.scenarios.filter(s => ms.results[s.label] !== undefined).length;
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave</button></div>
      <ul class="lab-steps">${items.join('')}<li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
      <p class="lab-progress-text">${done} of ${total} done</p>
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store(ID);
    const all = _mine(P().DISCOVERIES);
    const n = all.filter(d => st.disc && st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show how to find them.</p>
      <div class="lab-found-grid">${all.map(d => (st.disc && st.disc[d.id])
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`
      ).join('')}</div></section>`;
  }

  // ══ Welcome + Help ════════════════════════════
  function _intro() {
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">⚖️</p>
        <h2 id="lab-ov-title">Welcome to Forces &amp; Pressure</h2>
        <ul class="lab-intro-list">
          <li><b>Force Bench</b>: hang objects on a spring balance and read their weight in newtons.</li>
          <li><b>Pressure Pad</b>: press different shapes into soft ground and calculate P = F ÷ A.</li>
          <li><b>Record results</b> in the lab notebook — the formula and working are shown each time.</li>
          <li><b>Make mistakes safely</b>: overload the spring, mix up mass and weight — you'll see what goes wrong.</li>
          <li><b>Earn stars</b>: two missions with exam-style questions and ${_mine(P().DISCOVERIES).length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="weigh_objects" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(ID); st.intro = true; Labs.persist();
        _coach('Start by hanging an object on the spring balance — tap anything from the shelf.');
      } });
  }

  function _help() {
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How Forces &amp; Pressure works</h2>
      <div class="lab-help">
        <section><h3>Force Bench</h3><ul>
          <li>Tap an object to hang it on the spring balance.</li>
          <li>The pointer shows the reading in newtons. Tap "Record" to save it.</li>
          <li>Weight (N) = mass (kg) × 10. Force is measured in newtons (N).</li>
          <li>Never exceed the spring balance's 10 N limit.</li></ul></section>
        <section><h3>Pressure Pad</h3><ul>
          <li>Choose a pad shape — its area is shown in cm² and m².</li>
          <li>Set the force (10, 20 or 50 N), then tap "Apply force".</li>
          <li>P = F ÷ A. Always convert area to m² first (1 cm² = 0.0001 m²).</li>
          <li>The deeper the indentation, the higher the pressure.</li></ul></section>
        <section><h3>Formulae</h3>
          <p class="lab-eq">Weight (N) = mass (kg) × g (N/kg)</p>
          <p class="lab-eq">P (Pa) = F (N) ÷ A (m²)</p>
          <p class="lab-eq">1 cm² = 0.0001 m² &nbsp;·&nbsp; 1 Pa = 1 N/m²</p></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the lab</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n; i++) _step(0.05);
    _readouts();
  }
  function _debug() {
    return {
      grade: _grade(), mode: _mode, hook: _hook, pad: _pad, force: _force,
      applied: _applied, springExt: Math.round(_springExt), indentAnim: Math.round(_indentAnim),
      panel: _panel, looping: !!_raf,
      guide: _guide && { id: _guide.id, step: _guide.step },
      mission: _mission && { id: _mission.id, results: Object.keys(_mission.results), success: _mission.success },
      reads: _reads.slice(0, 6).map(r => `${r.label}|${r.value}|${r.unit}`),
    };
  }


  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => _mine(P().GUIDES),
    start: startGuide,
    snapshot: () => ({ _mode, _hook, _pad, _force, _applied, _reads, _panel, _guide, _springExt, _indentAnim }),
    restore: state => { ({ _mode, _hook, _pad, _force, _applied, _reads, _panel, _guide, _springExt, _indentAnim } = state); },
    refresh: () => { if (_guide) _guideEnter(); },
    stop: () => { _stopGuide(true); }
  };
  return { study, mount, unmount, startGuide, discoveryGuide, startMission,
           _placeObj, _setPad, _setForce, _applyForce, _read, _removeObj, _switchMode,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabForces = LabForces;
