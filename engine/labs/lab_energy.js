'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Work, Energy & Power (Grade 8)
//
//  Stage: an inclined plane at 30°. Two modes:
//    Lift — pull the load straight up (F = weight, d = height)
//    Ramp — pull up the inclined plane (F = weight/2, d = 2×height, W = same)
//
//  ⚠ All numbers come from LabEnergyData. This file only animates and draws.
//    Fix a wrong readout in the DATA file, not here.
//  ⚠ Only the <canvas> animates. No transform on .screen or ancestors.
//  ⚠ Calm Mode / prefers-reduced-motion: simulation still runs but jumps
//    instantly (no animation), via Labs.calm().
//  ⚠ recordAnswer() and _recordDaily() are never called from a lab.
// ══════════════════════════════════════════════
const LabEnergy = (() => {
  const ID = 'energy';
  const P = () => LabEnergyData;
  const FRAME_MS = 1000 / 30;
  const PULL_SPEED = 0.25;   // fraction of path per second (normal mode ~4 s for full pull)

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _resizeWired = false;
  let _mode = 'lift';       // 'lift' | 'ramp'
  let _massIdx = 1;         // index into P().MASSES
  let _heightIdx = 1;       // index into P().HEIGHTS
  let _pos = 0;             // 0 = bottom, 1 = top (fraction of path completed)
  let _posAnim = 0;         // display position (lags _pos for smooth animation)
  let _running = false;     // pull animation active
  let _pullDone = false;    // pull completed this session
  let _timing = false;      // timer running
  let _timeS = 0;           // seconds elapsed while timer is active
  let _timerStart = 0;      // performance.now() when timer started
  let _timedResult = null;  // { workJ, timeS, powerW } of last timed pull
  let _panel = 'bench';     // 'bench' | 'missions' | 'discoveries'
  let _guide = null;        // active GUIDE object or null
  let _guideStep = 0;       // current step index in _guide.steps
  let _mission = null;      // active MISSION or null
  let _log = [];            // notebook rows
  let _instant = false;     // test mode: skip animation
  let _flashAlpha = 0;      // hazard flash overlay

  // ── Data getters ─────────────────────────────
  function _calc() { return P().calcWork(_mode, _massIdx, _heightIdx); }
  function _mass() { return P().MASSES[_massIdx]; }
  function _height() { return P().HEIGHTS[_heightIdx]; }

  // ── Canvas setup ──────────────────────────────
  function _resize() {
    if (!_cv) return;
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    const r = _cv.parentElement.getBoundingClientRect();
    _W = r.width; _H = r.height;
    _cv.width = Math.round(_W * pr); _cv.height = Math.round(_H * pr);
    _cv.style.width = _W + 'px'; _cv.style.height = _H + 'px';
    _cx.setTransform(pr, 0, 0, pr, 0, 0);
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
    const calm = Labs.calm();
    if (_running) {
      const speed = _instant || calm ? 9999 : PULL_SPEED;
      _pos = Math.min(1, _pos + speed * dt);
      if (_pos >= 1) _completePull();
    }
    _posAnim += (_pos - _posAnim) * Math.min(1, (_instant || calm ? 9999 : 12) * dt);
    if (Math.abs(_posAnim - _pos) < 0.001) _posAnim = _pos;
    _flashAlpha = Math.max(0, _flashAlpha - 1.5 * dt);
  }

  function _completePull() {
    if (!_running) return;
    _running = false;
    _pullDone = true;

    if (_timing) {
      _timeS = (performance.now() - _timerStart) / 1000;
      _timing = false;
      const c = _calc();
      _timedResult = c ? { workJ: c.work, timeS: _timeS, powerW: P().calcPower(c.work, _timeS) } : null;
    }

    // Notebook entry
    const c = _calc();
    const M = _mass(), H = _height();
    if (c) {
      _log.push({
        mode: _mode, label: M.label, height: H.label,
        force: c.force, dist: c.dist, work: c.work,
        timeS: _timedResult ? _timedResult.timeS : null,
        powerW: _timedResult ? _timedResult.powerW : null,
      });
    }

    // Unlock rule discoveries
    const timed = !!_timedResult;
    P().discoveriesFor(_mode, _massIdx, _heightIdx, timed).forEach(_discover);

    // Show ramp efficiency result card once (after any ramp pull)
    if (_mode === 'ramp') {
      const st = Labs.store(ID);
      if (!st._shownRampEff) {
        st._shownRampEff = true;
        Labs.persist();
        setTimeout(() => _resultCard('ramp_efficiency', {}), 400);
      }
    }

    _guideEvent('pull');  // guide may have been waiting on the pull completing
    _renderReadouts();
    _renderPanel();
  }

  // ── Discoveries ───────────────────────────────
  function _discover(id) {
    const D = P().DISCOVERIES.find(d => d.id === id);
    if (!D) return;
    if (Labs.discover(ID, id, { title: D.title, total: P().forGrade(P().DISCOVERIES, 8).length })) {
      _renderPanel();
    }
  }
  function _isFound(id) { return !!(Labs.store(ID).disc && Labs.store(ID).disc[id]); }

  // ── Result / hazard cards ─────────────────────
  function _resultCard(id, ctx) {
    const R = P().RESULTS[id];
    if (!R) return;
    const v = x => (typeof x === 'function' ? x(ctx) : x);
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.resultCard({ icon: R.icon, title: v(R.title), happened: v(R.happened), instead: v(R.instead), exam: R.exam,
      onClose: () => { _guideEvent('card:' + id); _renderPanel(); } });
  }

  function _hazard(id, ctx, after) {
    const H = P().HAZARDS[id];
    if (!H) return;
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
      onClose: () => { _flashAlpha = 0; if (after) after(); _renderReadouts(); _renderPanel(); },
    });
  }

  // ── Guide ──────────────────────────────────────
  function _guideHint() {
    _renderGuide();
    const el = _root.querySelector('.is-next');
    if (!el) return;
    el.classList.remove('is-idle-hint');
    void el.offsetWidth;
    el.classList.add('is-idle-hint');
    el.addEventListener('animationend', () => el.classList.remove('is-idle-hint'), { once: true });
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function _startGuide(G, adhoc) {
    if (Labs.studyBegin && Labs.studyBegin('energy', G, () => _startGuide(G, adhoc))) return;
    _guide = G; _guideStep = 0; _adhocGuide = !!adhoc;
    _renderGuide();
    _coach(G.steps[0].say);
  }
  let _adhocGuide = false;

  function _guideEvent(token) {
    if (!_guide) return;
    const step = _guide.steps[_guideStep];
    if (!step || step.on !== token) return;
    _guideStep++;
    if (_guideStep >= _guide.steps.length) {
      // Guide complete
      const G = _guide;
      if (Labs.studyComplete && Labs.studyComplete('energy', G)) { _guide = null; _renderGuide(); return; }
      if (!_adhocGuide) {
        const st = Labs.store(ID); st.guides = st.guides || {}; st.guides[G.id] = Date.now(); Labs.persist();
      }
      _guide = null;
      _coach(G.lesson);
      _renderGuide();
      return;
    }
    const next = _guide.steps[_guideStep];
    _coach(next.say);
    _renderGuide();
  }

  function _renderGuide() {
    if (Labs.studyCheckpoint) Labs.studyCheckpoint('energy');
    const el = $('lab-guide');
    if (!el) return;
    if (!_guide) { el.classList.remove('is-visible'); return; }
    const step = _guide.steps[_guideStep];
    if (!step) { el.classList.remove('is-visible'); return; }
    el.classList.add('is-visible');
    const numEl = el.querySelector('.lab-guide-num');
    const sayEl = el.querySelector('.lab-guide-say');
    if (numEl) numEl.textContent = `Step ${_guideStep + 1} / ${_guide.steps.length}`;
    if (sayEl) sayEl.textContent = step.say;
    // Glow the next control and dim everything else.
    _root.querySelectorAll('.is-next').forEach(e => e.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(e => e.classList.remove('is-guide-dim'));
    const token = step.on;
    const [k, a] = token.split(':');
    let sel = null;
    if (k === 'mode') sel = `[data-mode="${a}"]`;
    else if (k === 'mass') sel = `[data-mass="${a}"]`;
    else if (k === 'height') sel = `[data-height="${a}"]`;
    else if (k === 'pull') sel = '[data-act="pull"]';
    else if (k === 'timer') sel = '[data-act="timer"]';
    else if (k === 'read') sel = '[data-act="read"]';
    if (sel) {
      const el2 = _root.querySelector(sel);
      if (el2) {
        el2.classList.add('is-next');
        el2.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        const guideBox = _root.querySelector('#lab-guide');
        _root.querySelectorAll('[data-act],[data-mass],[data-height],[data-mode]').forEach(other => {
          if (other !== el2 && !el2.contains(other) && !other.contains(el2)
              && !(guideBox && guideBox.contains(other))) {
            other.classList.add('is-guide-dim');
          }
        });
      }
    }
  }

  // ── Coach ──────────────────────────────────────
  function _coach(text) {
    const el = $('lab-energy-coach');
    if (el) el.textContent = text || '';
  }

  // ── Readouts (chip update) ───────────────────
  function _renderReadouts() {
    const c = _calc();
    const chip = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    chip('lab-energy-force', c ? c.force.toFixed(1) + ' N' : '— N');
    chip('lab-energy-dist',  c ? (c.dist * _posAnim).toFixed(2) + ' m' : '— m');
    chip('lab-energy-work',  c ? (c.work * _posAnim).toFixed(1) + ' J' : '— J');

    const tEl = $('lab-energy-time');
    if (tEl) {
      if (_timing) {
        const elapsed = (performance.now() - _timerStart) / 1000;
        tEl.textContent = elapsed.toFixed(1) + ' s';
      } else if (_timedResult) {
        tEl.textContent = _timedResult.timeS.toFixed(1) + ' s';
      } else {
        tEl.textContent = '— s';
      }
    }

    const pEl = $('lab-energy-power');
    if (pEl) {
      if (_timedResult && _pullDone) {
        pEl.textContent = (_timedResult.powerW !== null ? _timedResult.powerW.toFixed(2) : '—') + ' W';
      } else { pEl.textContent = '— W'; }
    }
  }

  // ── Canvas drawing ───────────────────────────
  function _draw() {
    if (!_cx) return;
    const c = _cx, W = _W, H = _H;
    c.save();
    c.clearRect(0, 0, W, H);

    // Background
    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#EDF2FF'); bg.addColorStop(1, '#F8FAFF');
    c.fillStyle = bg; c.fillRect(0, 0, W, H);

    // Floor
    c.fillStyle = '#CBD5E1';
    c.fillRect(0, H - 28, W, 28);

    const rampX0 = 30, rampY0 = H - 28;
    const rampX1 = W - 30, rampY1 = 40;

    // Ramp triangle (always drawn as reference)
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

    // Ramp surface line
    c.beginPath();
    c.moveTo(rampX0, rampY0);
    c.lineTo(rampX1, rampY1);
    c.strokeStyle = '#64748B';
    c.lineWidth = 3;
    c.stroke();

    // Angle label
    c.fillStyle = '#64748B';
    c.font = '13px sans-serif';
    c.fillText('30°', rampX0 + 28, rampY0 - 8);

    const M = _mass();
    const objColor = M ? M.color : '#5B8DD9';
    const objSize = 22;
    let objX, objY;

    if (_mode === 'ramp') {
      // Object on the hypotenuse
      const t = _posAnim;
      objX = rampX0 + (rampX1 - rampX0) * t;
      objY = rampY0 + (rampY1 - rampY0) * t;
      // Rope: from object to top corner
      c.beginPath();
      c.moveTo(objX, objY);
      c.lineTo(rampX1, rampY1);
      c.strokeStyle = '#78716C';
      c.lineWidth = 2;
      c.setLineDash([4, 3]);
      c.stroke();
      c.setLineDash([]);
    } else {
      // Object hanging/lifting vertically: lift from bottom to near-top
      const liftX = W * 0.38;
      const liftY0 = H - 55, liftY1 = 55;
      objX = liftX;
      objY = liftY0 + (liftY1 - liftY0) * _posAnim;
      // Rope from top to object
      c.beginPath();
      c.moveTo(liftX, 16);
      c.lineTo(liftX, objY - objSize / 2);
      c.strokeStyle = '#78716C';
      c.lineWidth = 2;
      c.setLineDash([4, 3]);
      c.stroke();
      c.setLineDash([]);
      // Ceiling attachment
      c.fillStyle = '#475569';
      c.fillRect(liftX - 20, 0, 40, 16);
    }

    // The object (colored box)
    const bx = objX - objSize / 2, by = objY - objSize / 2;
    c.fillStyle = objColor;
    c.beginPath();
    c.roundRect ? c.roundRect(bx, by, objSize, objSize, 4) : c.rect(bx, by, objSize, objSize);
    c.fill();
    c.strokeStyle = '#1E293B'; c.lineWidth = 1.5; c.stroke();

    // Mass label on box
    if (M) {
      c.fillStyle = '#FFFFFF';
      c.font = 'bold 9px sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(M.label, objX, objY);
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    }

    // Height arrow (lift mode only)
    if (_mode === 'lift' && _posAnim > 0.05) {
      const liftX = W * 0.38;
      const arrowX = liftX + 22;
      const yTop = H - 55 + (55 - H + 55) * _posAnim;  // approximation
      const yBot = H - 55;
      c.strokeStyle = '#1D4ED8'; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(arrowX, yBot); c.lineTo(arrowX, objY); c.stroke();
    }

    // Hazard flash
    if (_flashAlpha > 0) {
      c.fillStyle = `rgba(200,30,30,${_flashAlpha.toFixed(2)})`;
      c.fillRect(0, 0, W, H);
    }

    c.restore();
  }

  // ── Shell HTML ────────────────────────────────
  function _shellHTML() {
    const D = P();
    const massButtons = D.MASSES.map((m, i) =>
      `<button type="button" class="lab-energy-mass-btn${i === _massIdx ? ' active' : ''}" data-mass="${i}" style="border-color:${m.color}20">${esc(m.label)}</button>`
    ).join('');
    const heightButtons = D.HEIGHTS.map((h, i) =>
      `<button type="button" class="lab-energy-height-btn${i === _heightIdx ? ' active' : ''}" data-height="${i}">${esc(h.label)}</button>`
    ).join('');
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
          <div class="lab-chip"><span>F</span><b id="lab-energy-force">— N</b></div>
          <div class="lab-chip"><span>d</span><b id="lab-energy-dist">— m</b></div>
          <div class="lab-chip lab-chip-w"><span>W</span><b id="lab-energy-work">— J</b></div>
          <div class="lab-chip"><span>t</span><b id="lab-energy-time">— s</b></div>
          <div class="lab-chip lab-chip-p"><span>P</span><b id="lab-energy-power">— W</b></div>
        </div>
      </div>

      <div class="lab-coach" id="lab-energy-coach">⚡ Welcome! Choose a mode, mass and height, then press Pull.</div>

      <div class="lab-task-strip">Set the mode, mass and height — then pull to measure work and energy!</div>
      <div class="lab-guide" id="lab-guide">
        <div class="lab-guide-num"></div>
        <div class="lab-guide-say"></div>
        <div class="lab-guide-actions">
          <button type="button" class="lab-guide-hint-btn" data-act="guide-hint" aria-label="Show me where to go">💡 Hint</button>
        </div>
      </div>
    </div>

    <div class="lab-tools">
      <div class="lab-energy-label">Mode</div>
      <div class="lab-energy-mode-bar">
        <button type="button" class="lab-energy-mode-btn${_mode === 'lift' ? ' active' : ''}" data-mode="lift" data-act="mode">↕️ Lift straight up</button>
        <button type="button" class="lab-energy-mode-btn${_mode === 'ramp' ? ' active' : ''}" data-mode="ramp" data-act="mode">⬇️ Pull up ramp</button>
      </div>
      <div class="lab-energy-label">Mass</div>
      <div class="lab-energy-mass-row">${massButtons}</div>
      <div class="lab-energy-label">Height</div>
      <div class="lab-energy-height-row">${heightButtons}</div>
      <div class="lab-energy-action-row">
        <button type="button" class="lab-btn-primary lab-energy-pull-btn" data-act="pull" aria-label="Pull the load up">⬆️ Pull!</button>
        <button type="button" class="lab-btn-secondary lab-energy-timer-btn" data-act="timer" aria-label="Start or stop timer">⏱️ Timer</button>
        <button type="button" class="lab-btn-secondary" data-act="read" aria-label="Record the reading">📋 Record</button>
      </div>
      <div class="lab-energy-action-row" id="lab-energy-misc-row">
        <button type="button" class="lab-btn-ghost" data-act="hold" aria-label="Hold still (no work done)">🤲 Hold</button>
        <button type="button" class="lab-btn-ghost" data-act="rope-release" aria-label="Let go of the rope">⚠️ Release rope</button>
      </div>
    </div>

    <nav class="lab-tabs">
      <button type="button" class="lab-tab${_panel === 'bench' ? ' active' : ''}" data-tab="bench">🧪 Bench</button>
      <button type="button" class="lab-tab${_panel === 'missions' ? ' active' : ''}" data-tab="missions">🎯 Missions</button>
      <button type="button" class="lab-tab${_panel === 'discoveries' ? ' active' : ''}" data-tab="discoveries">✨ Discoveries</button>
    </nav>

    <div class="lab-panel" id="lab-energy-bench" style="${_panel === 'bench' ? '' : 'display:none'}">
      <div id="lab-energy-bench-content"></div>
    </div>
    <div class="lab-panel" id="lab-energy-missions" style="${_panel === 'missions' ? '' : 'display:none'}">
      <div id="lab-energy-missions-content"></div>
    </div>
    <div class="lab-panel" id="lab-energy-discoveries" style="${_panel === 'discoveries' ? '' : 'display:none'}">
      <div id="lab-energy-discoveries-content"></div>
    </div>
  </div>
</div>`;
  }

  // ── Panel rendering ───────────────────────────
  function _renderPanel() {
    if (_panel === 'bench') _renderBench();
    else if (_panel === 'missions') _renderMissions();
    else if (_panel === 'discoveries') _renderDiscoveries();
  }

  function _renderBench() {
    const el = $('lab-energy-bench-content');
    if (!el) return;
    const st = Labs.store(ID);
    const guides = P().forGrade(P().GUIDES, 8);

    // If no experiments done yet and no guide active: show start panel
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

    // Guided experiments list (when guide is not active)
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

    // Notebook
    if (_log.length > 0) {
      html += `<h3 class="lab-nb-head">Lab Notebook</h3>
      <div class="lab-notebook"><div class="lab-log">`;
      _log.forEach((row, i) => {
        html += `<div class="lab-log-row">
          <span class="lab-log-n">${i + 1}</span>
          <span>${row.mode === 'ramp' ? 'Ramp' : 'Lift'} · ${esc(row.label)} · ${esc(row.height)}</span>
          <span>F = ${row.force} N · d = ${row.dist} m · W = ${row.work} J</span>
          ${row.powerW !== null ? `<span>t = ${row.timeS.toFixed(1)} s · P = ${row.powerW} W</span>` : ''}
        </div>`;
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
      instead: '① Choose a mode (Lift or Ramp), mass and height.\n② Press Pull to run the experiment.\n③ Press Timer before pulling to measure power.\n④ Press Record to add a notebook entry and advance the guide.\n\nFormulas: W = F × d · GPE = mgh · P = W ÷ t',
      exam: '📝 In the NCE exam — Work, Energy & Power is an examWeight 3 chapter.',
      onClose: () => {},
    });
  }

  // ── Event handling ────────────────────────────
  function _onAction(e) {
    const t = e.target.closest('[data-act],[data-tab],[data-guide],[data-mission],[data-disc],[data-mode],[data-mass],[data-height]');
    if (!t) return;

    if (t.dataset.tab) {
      _panel = t.dataset.tab;
      _root.querySelectorAll('.lab-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === _panel));
      _root.querySelectorAll('.lab-panel').forEach(p => { p.style.display = (p.id === 'lab-energy-' + _panel) ? '' : 'none'; });
      _renderPanel();
      return;
    }
    if (t.dataset.mode) {
      _mode = t.dataset.mode;
      _pos = 0; _posAnim = 0; _running = false; _pullDone = false; _timedResult = null; _timing = false;
      _root.querySelectorAll('[data-act="mode"]').forEach(b => b.classList.toggle('active', b.dataset.mode === _mode));
      _guideEvent('mode:' + _mode);
      _renderReadouts();
      return;
    }
    if (t.dataset.mass !== undefined) {
      const idx = Number(t.dataset.mass);
      _massIdx = idx;
      _root.querySelectorAll('[data-mass]').forEach(b => b.classList.toggle('active', b.dataset.mass === String(idx)));
      _guideEvent('mass:' + idx);
      _renderReadouts();
      return;
    }
    if (t.dataset.height !== undefined) {
      const idx = Number(t.dataset.height);
      _heightIdx = idx;
      _root.querySelectorAll('[data-height]').forEach(b => b.classList.toggle('active', b.dataset.height === String(idx)));
      _guideEvent('height:' + idx);
      _renderReadouts();
      return;
    }
    if (t.dataset.guide) {
      const G = P().GUIDES.find(g => g.id === t.dataset.guide);
      if (G) { _startGuide(G, false); _renderPanel(); }
      return;
    }
    if (t.dataset.disc) {
      const D = P().DISCOVERIES.find(d => d.id === t.dataset.disc);
      if (D) {
        const G = { id: 'disc_' + D.id, title: D.title, blurb: D.hint, lesson: D.learn,
          steps: D.how.map(on => ({ on, say: _tokenSay(on), btn: _tokenBtn(on) })) };
        _startGuide(G, true);
        _panel = 'bench';
        _root.querySelectorAll('.lab-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === 'bench'));
        _root.querySelectorAll('.lab-panel').forEach(p => { p.style.display = p.id === 'lab-energy-bench' ? '' : 'none'; });
        _renderPanel();
      }
      return;
    }
    if (t.dataset.mission) {
      const M = P().MISSIONS.find(m => m.id === t.dataset.mission);
      if (M) _startMission(M);
      return;
    }

    const act = t.dataset.act;
    if (act === 'hub') { Labs.backToHub(); return; }
    if (act === 'tip') { _showTip(); return; }
    if (act === 'help') { _showHelp(); return; }

    if (act === 'pull') {
      if (_running) return;
      _pos = 0; _posAnim = 0; _running = true; _pullDone = false;
      if (_timing) _timerStart = performance.now();
      _guideEvent('pull');
      return;
    }
    if (act === 'timer') {
      if (!_timing) {
        _timing = true; _timerStart = performance.now(); _timedResult = null;
        _guideEvent('timer');
      } else {
        _timing = false; _timeS = (performance.now() - _timerStart) / 1000;
      }
      return;
    }
    if (act === 'read') {
      _guideEvent('read');
      _renderPanel();
      return;
    }
    if (act === 'guide-hint') { _guideHint(); return; }
    if (act === 'hold') {
      // Trigger no_work_held result card
      _resultCard('no_work_held', {});
      return;
    }
    if (act === 'rope-release') {
      if (_mode === 'ramp') {
        _running = false; _pos = 0; _posAnim = 0;
        _hazard('rope_release', { label: _mass() ? _mass().label : 'load' }, () => { _renderPanel(); });
      }
      return;
    }
  }

  // Token → human text helpers for "Show me how" guide steps
  function _tokenSay(token) {
    const [k, a] = token.split(':');
    if (k === 'mode' && a === 'lift') return 'Switch to "Lift straight up" mode.';
    if (k === 'mode' && a === 'ramp') return 'Switch to "Pull up ramp" mode.';
    if (k === 'mass') return `Select the ${P().MASSES[+a].label} mass.`;
    if (k === 'height') return `Set the height to ${P().HEIGHTS[+a].label}.`;
    if (k === 'pull') return 'Pull the load up now.';
    if (k === 'timer') return 'Start the timer before pulling.';
    if (k === 'read') return 'Record the reading in the notebook.';
    if (k === 'card') return 'Watch what happens.';
    return token;
  }
  function _tokenBtn(token) {
    const [k, a] = token.split(':');
    if (k === 'mode' && a === 'lift') return '↕️ Lift mode';
    if (k === 'mode' && a === 'ramp') return '⬇️ Ramp mode';
    if (k === 'mass') return P().MASSES[+a].label;
    if (k === 'height') return P().HEIGHTS[+a].label;
    if (k === 'pull') return '⬆️ Pull up';
    if (k === 'timer') return '⏱️ Start timer';
    if (k === 'read') return '📋 Record';
    if (k === 'card') return '▶️ Continue';
    return token;
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

    // First-visit welcome
    const st = Labs.store(ID);
    if (!st.intro) {
      _coach('⚡ Welcome! Choose a mode, mass and height, then press Pull to start.');
    }

    _raf = requestAnimationFrame(_loop);
    _renderReadouts();
    _renderPanel();
  }

  function unmount() {
    cancelAnimationFrame(_raf); _raf = 0;
    if (_root) { _root.removeEventListener('click', _onAction); _root = null; }
    _cv = null; _cx = null; _running = false; _timing = false; _guide = null; _mission = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function _test(opts) {
    _instant = !!(opts && opts.instant);
  }

  function _tick(seconds) {
    _step(seconds);
    if (_running && (_instant || seconds >= 10)) { _pos = 1; _posAnim = 1; _completePull(); }
  }

  function _debug() {
    return {
      mode: _mode, massIdx: _massIdx, heightIdx: _heightIdx,
      pos: _pos, running: _running, timing: _timing, timeS: _timeS,
      panel: _panel, guideActive: !!_guide, guideStep: _guideStep,
      logCount: _log.length,
      calc: _calc(),
      disc: Object.keys((Labs.store(ID).disc || {})),
    };
  }


  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => P().GUIDES,
    start: id => _startGuide(P().GUIDES.find(g => g.id === id)),
    snapshot: () => ({ _mode, _massIdx, _heightIdx, _pos, _posAnim, _pullDone, _timeS, _timedResult, _panel, _guide, _guideStep, _log, _adhocGuide }),
    restore: state => { ({ _mode, _massIdx, _heightIdx, _pos, _posAnim, _pullDone, _timeS, _timedResult, _panel, _guide, _guideStep, _log, _adhocGuide } = state); },
    refresh: () => { if (_guide) _renderGuide(); },
    stop: () => { _guide = null; _renderGuide(); _renderPanel(); }
  };
  return { study, mount, unmount, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabEnergy = LabEnergy;
