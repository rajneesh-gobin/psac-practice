'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Magnets (Science, Grades 4 & 8)
//
//  Grade 4: horseshoe magnet on a bench; 8 objects on a shelf.
//  Tap or drag an object toward the magnet — magnetic objects fly in and
//  stick; non-magnetic objects bounce away. Sorting board on the left.
//
//  Grade 8: two bar magnets; flip poles; iron filings field view; induced
//  magnetism experiment with soft iron nail and hard steel nail.
//
//  ⚠ All science content comes from LabMagnetsData. Fix wrong results THERE.
//  ⚠ Guide steps require actual student interaction — 💡 Hint shakes the target.
//  ⚠ Grade 4: 🔊 read-aloud on coach and guide box (never auto-plays).
//  ⚠ Only the <canvas> animates. Nothing here transforms .screen (ui-css.md).
//  ⚠ Calm Mode: animations show end state immediately, no movement.
//  ⚠ MutationObserver restarts the loop when the screen becomes visible again.
// ══════════════════════════════════════════════
const LabMagnets = (() => {
  'use strict';
  const P  = () => LabMagnetsData;
  const ID = 'magnets';
  const FRAME_MS = 1000 / 30;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  // ── State ────────────────────────────────────
  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _obs = null, _clock = 0, _instant = false;
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _tipIdx = -1, _talking = false;

  // Grade 4 bench state
  let _g4 = null;
  // Grade 8 bench state
  let _g8 = null;
  // Fired events for discovery tracking
  let _events = null;

  const _grade  = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 0;
    return P().GRADES.includes(g) ? g : P().GRADES[0];
  };
  const _mine   = list => P().forGrade(list, _grade());
  const _is4    = () => _grade() === 4;
  const _is8    = () => _grade() === 8;

  function _resetG4() {
    _g4 = {
      dragging: null,    // { id, x, y, startX, startY }
      tested: {},        // id → 'attract' | 'bounce'
      sorted: {},        // id → 'magnetic' | 'nonmagnetic'
      fx: [],            // active animations
      busy: false,
    };
  }

  function _resetG8() {
    _g8 = {
      poleA: 'N',        // left magnet's facing pole (toward center)
      poleB: 'S',        // right magnet's facing pole (toward center)
      distance: 'far',   // 'far' | 'close'
      filings: false,
      compassPlaced: false,
      induced: false,
      inducedNailTouching: false,  // soft iron nail touching magnet
      inducedSteelTouching: false, // hard steel nail touching magnet
      inducedNailMag: false,       // soft iron nail still magnetised
      inducedSteelMag: false,      // hard steel nail still magnetised
      dropped: false,
      fx: [],
    };
  }

  // ══ Shell HTML ═══════════════════════════════
  function _shellHTML() {
    const g = _grade();
    const sayCoach = _is4() ? `<button type="button" class="lab-coach-say lab-magnets-say" data-act="say-coach" aria-label="Read this out loud">🔊</button>` : '';
    return `<div class="lab lab-magnets">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title">
          <span class="lab-eyebrow">Science · Grade ${esc(g)}</span>
          <h1>Magnets</h1>
        </div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the Magnets lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-magnets-zone">
            <canvas id="lab-magnets-canvas" role="img" aria-label="${_is4() ? 'A horseshoe magnet on a bench with objects on a shelf' : 'Two bar magnets on a bench'}"></canvas>
            <div class="lab-magnets-overlay" id="lab-magnets-overlay" aria-live="polite"></div>
          </div>
          ${_is4() ? _g4Controls() : _g8Controls()}
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            ${sayCoach}
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <p class="lab-task-strip">Drag objects to the 🧲 magnet — which ones are attracted?</p>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
        </div>
        <div class="lab-side">
          <div class="lab-tabs" role="tablist" aria-label="Bench, missions and discoveries">
            <button type="button" role="tab" data-panel="sandbox">🧲 Bench</button>
            <button type="button" role="tab" data-panel="missions">🎯 Missions</button>
            <button type="button" role="tab" data-panel="found">✨ Discoveries <b id="lab-found-n"></b></button>
          </div>
          <div id="lab-panel" class="lab-panel" role="tabpanel"></div>
        </div>
      </div>
    </div>`;
  }

  function _g4Controls() {
    const objs = _mine(P().OBJECTS);
    return `<div class="lab-magnets-shelf" id="lab-magnets-shelf" role="group" aria-label="Objects to test">
      ${objs.map(o => `<button type="button" class="lab-magnets-obj ${_g4 && _g4.tested[o.id] ? 'is-tested' : ''}" data-obj="${esc(o.id)}" aria-label="${esc(o.label)}">
        <span aria-hidden="true">${esc(o.icon)}</span>
        <em>${esc(o.label)}</em>
      </button>`).join('')}
    </div>
    <div class="lab-magnets-sort" id="lab-magnets-sort">
      <div class="lab-magnets-sort-group is-magnetic" data-sort-target="magnetic">
        <h3>🧲 Magnetic</h3>
        <div class="lab-magnets-sort-zone" id="lab-sort-magnetic"></div>
      </div>
      <div class="lab-magnets-sort-group is-nonmagnetic" data-sort-target="nonmagnetic">
        <h3>❌ Non-magnetic</h3>
        <div class="lab-magnets-sort-zone" id="lab-sort-nonmagnetic"></div>
      </div>
    </div>`;
  }

  function _g8Controls() {
    return `<div class="lab-magnets-g8-controls" id="lab-magnets-g8-controls">
      <button type="button" class="lab-tool" data-act="flip-b" id="lab-flip-b">↔ Flip magnet B</button>
      <button type="button" class="lab-tool" data-act="distance" id="lab-distance">📏 Move close</button>
      <button type="button" class="lab-tool lab-magnets-toggle" data-act="filings" id="lab-filings">〰 Iron filings</button>
      <button type="button" class="lab-tool lab-magnets-toggle" data-act="compass" id="lab-compass">🧭 Plotting compass</button>
      <button type="button" class="lab-tool lab-magnets-toggle" data-act="induced" id="lab-induced">🪛 Induced mode</button>
      <button type="button" class="lab-tool" data-act="drop" id="lab-drop">💥 Drop magnet</button>
    </div>`;
  }

  // ══ Mount / Unmount ══════════════════════════
  function mount(root) {
    _root = root;
    if (!_events) _events = new Set();
    if (_is4() && !_g4) _resetG4();
    if (_is8() && !_g8) _resetG8();
    root.innerHTML = _shellHTML();
    _cv = $('lab-magnets-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach(_is4() ? 'Back on your mission. Carry on!' : 'Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides || {}).length
      ? (_is4() ? 'Welcome back! Pick a guide or a mission. Or test any object you like.' : 'Welcome back! Pick a guided experiment or a mission below.')
      : (_is4() ? '👋 New here? Pick a guided experiment below. I will show you what to tap.' : '👋 New here? Pick a guided experiment below and I\'ll show you exactly what to tap.'));
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
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
  let _resizeWired = false;

  function unmount() {
    _hush();
    if (_obs) { _obs.disconnect(); _obs = null; }
    _stop();
    _root = null; _cv = null; _cx = null;
  }

  // ══ Layout ═══════════════════════════════════
  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(360, Math.max(220, w * 0.7)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width  = Math.round(w * dpr);
    _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _draw(0);
  }

  // ══ Animation loop ═══════════════════════════
  function _start() {
    if (_raf) return;
    _last = 0;
    _raf = requestAnimationFrame(_loop);
  }
  function _stop() { if (_raf) { cancelAnimationFrame(_raf); _raf = 0; } }
  function _loop(ts) {
    if (!_cv || !_cv.isConnected) { _stop(); return; }
    _raf = requestAnimationFrame(_loop);
    if (!_last) { _last = ts; return; }
    const dt = Math.min(ts - _last, 100) / 1000;
    _last = ts;
    _clock += dt;
    _tickFx(dt);
    _draw(dt);
  }
  function _tickFx(dt) {
    const fx = _is4() ? (_g4 && _g4.fx) : (_g8 && _g8.fx);
    if (!fx) return;
    for (let i = fx.length - 1; i >= 0; i--) {
      const f = fx[i];
      f.t += dt / f.dur;
      if (f.t >= 1) { f.t = 1; if (f.done) f.done(); fx.splice(i, 1); }
    }
  }

  // ══ Drawing ══════════════════════════════════
  function _draw(dt) {
    if (!_cx) return;
    const c = _cx;
    c.clearRect(0, 0, _W, _H);
    // Bench surface
    c.fillStyle = '#E8DFD0';
    c.fillRect(0, 0, _W, _H);
    // Bench edge
    c.fillStyle = '#C4B89A';
    c.fillRect(0, _H - 16, _W, 16);
    if (_is4()) _drawG4(c);
    else _drawG8(c);
  }

  // ── Grade 4 drawing ──────────────────────────
  function _drawG4(c) {
    if (!_g4) return;
    const calm = Labs.calm();
    const cx = _W / 2, cy = _H * 0.42;
    // Horseshoe magnet body (U shape)
    const rOuter = Math.min(_W, _H) * 0.28;
    const rInner = rOuter * 0.6;
    c.beginPath();
    c.arc(cx, cy, rOuter, Math.PI, 0);
    c.arc(cx, cy, rInner, 0, Math.PI, true);
    c.closePath();
    c.fillStyle = '#C0392B';
    c.fill();
    c.strokeStyle = '#7B1A0F';
    c.lineWidth = 2;
    c.stroke();
    // Pole labels
    const leftX  = cx - rOuter;
    const rightX = cx + rOuter;
    const poleY  = cy + 14;
    c.fillStyle = '#FFFFFF';
    c.font = `bold ${Math.max(11, _H * 0.06)}px sans-serif`;
    c.textAlign = 'center';
    c.fillText('N', leftX, poleY);
    c.fillText('S', rightX, poleY);
    c.textAlign = 'start';
    // Animate objects
    const fx = _g4.fx;
    for (const f of fx) {
      const obj = P().OBJECTS.find(o => o.id === f.id);
      if (!obj) continue;
      let x, y;
      if (f.type === 'attract') {
        const tx = cx - rOuter + 20, ty = cy + rOuter * 0.3;
        const t = calm ? 1 : f.t;
        x = f.sx + (tx - f.sx) * t;
        y = f.sy + (ty - f.sy) * t;
      } else {
        const tx = f.sx + (f.sx > cx ? 60 : -60);
        const ty = f.sy + 60;
        const t = calm ? 1 : f.t;
        x = f.sx + (tx - f.sx) * t;
        y = f.sy + (ty - f.sy) * t;
      }
      _drawObj(c, obj, x, y, 28);
    }
    // Drag ghost
    if (_g4.dragging) {
      const obj = P().OBJECTS.find(o => o.id === _g4.dragging.id);
      if (obj) _drawObj(c, obj, _g4.dragging.x, _g4.dragging.y, 30);
    }
  }

  function _drawObj(c, obj, x, y, size) {
    c.font = `${size}px sans-serif`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(obj.icon, x, y);
    c.textAlign = 'start';
    c.textBaseline = 'alphabetic';
  }

  // ── Grade 8 drawing ──────────────────────────
  function _drawG8(c) {
    if (!_g8) return;
    const calm = Labs.calm();
    const close = _g8.distance === 'close';
    const gap = close ? _W * 0.12 : _W * 0.22;
    const midX = _W / 2;
    const magW = _W * 0.28, magH = _H * 0.22;
    const magY = _H * 0.38;
    const aRight = midX - gap / 2;
    const bLeft  = midX + gap / 2;
    // Magnet A (left, facing right with poleA)
    _drawBarMagnet(c, aRight - magW, magY, magW, magH, _g8.poleA, 'right');
    // Magnet B (right, facing left with poleB)
    _drawBarMagnet(c, bLeft, magY, magW, magH, _g8.poleB, 'left');
    // Force arrows
    if (!_g8.filings && !_g8.induced) {
      const attract = _g8.poleA !== _g8.poleB;
      _drawForceArrows(c, midX, magY + magH / 2, gap, attract);
    }
    // Iron filings
    if (_g8.filings && !calm) _drawFilings(c, midX, magY + magH / 2, _g8.poleA, _g8.poleB, gap, magW);
    // Compass
    if (_g8.compassPlaced) _drawCompass(c, midX, magY + magH / 2 + _H * 0.18, _g8.poleA !== _g8.poleB ? 'NS' : 'NN');
    // Induced mode
    if (_g8.induced) _drawInduced(c, midX, magY + magH + 30);
  }

  function _drawBarMagnet(c, x, y, w, h, nearPole, facing) {
    // Left half: one colour, right half: other
    const isNearN = nearPole === 'N';
    const leftCol  = facing === 'right' ? (isNearN ? '#2980B9' : '#C0392B') : (isNearN ? '#C0392B' : '#2980B9');
    const rightCol = facing === 'right' ? (isNearN ? '#C0392B' : '#2980B9') : (isNearN ? '#2980B9' : '#C0392B');
    const midX = x + w / 2;
    // Left half
    c.fillStyle = leftCol;
    c.beginPath(); c.rect(x, y, w / 2, h); c.fill();
    // Right half
    c.fillStyle = rightCol;
    c.beginPath(); c.rect(midX, y, w / 2, h); c.fill();
    // Border
    c.strokeStyle = '#2C3E50'; c.lineWidth = 1.5;
    c.strokeRect(x, y, w, h);
    // Labels
    c.font = `bold ${Math.max(9, h * 0.45)}px sans-serif`;
    c.fillStyle = '#FFFFFF'; c.textAlign = 'center'; c.textBaseline = 'middle';
    const leftLabel  = facing === 'right' ? (isNearN ? 'S' : 'N') : (isNearN ? 'N' : 'S');
    const rightLabel = facing === 'right' ? (isNearN ? 'N' : 'S') : (isNearN ? 'S' : 'N');
    c.fillText(leftLabel,  x + w * 0.25, y + h / 2);
    c.fillText(rightLabel, x + w * 0.75, y + h / 2);
    c.textAlign = 'start'; c.textBaseline = 'alphabetic';
  }

  function _drawForceArrows(c, midX, midY, gap, attract) {
    const arLen = 24, arHead = 6;
    c.strokeStyle = attract ? '#27AE60' : '#E74C3C';
    c.lineWidth = 2.5;
    const dirs = attract ? [-1, 1] : [1, -1];
    // Left arrow
    const lx = midX - gap / 2 - 10;
    c.beginPath(); c.moveTo(lx, midY); c.lineTo(lx + dirs[0] * arLen, midY); c.stroke();
    c.beginPath();
    c.moveTo(lx + dirs[0] * arLen, midY);
    c.lineTo(lx + dirs[0] * (arLen - arHead), midY - arHead);
    c.lineTo(lx + dirs[0] * (arLen - arHead), midY + arHead);
    c.closePath(); c.fillStyle = attract ? '#27AE60' : '#E74C3C'; c.fill();
    // Right arrow
    const rx = midX + gap / 2 + 10;
    c.beginPath(); c.moveTo(rx, midY); c.lineTo(rx + dirs[1] * arLen, midY); c.stroke();
    c.beginPath();
    c.moveTo(rx + dirs[1] * arLen, midY);
    c.lineTo(rx + dirs[1] * (arLen - arHead), midY - arHead);
    c.lineTo(rx + dirs[1] * (arLen - arHead), midY + arHead);
    c.closePath(); c.fill();
    // Label
    c.font = '11px sans-serif'; c.fillStyle = attract ? '#1E8449' : '#B03A2E';
    c.textAlign = 'center'; c.textBaseline = 'top';
    c.fillText(attract ? 'Attract' : 'Repel', midX, midY + 10);
    c.textAlign = 'start'; c.textBaseline = 'alphabetic';
  }

  function _drawFilings(c, midX, midY, poleA, poleB, gap, magW) {
    const repel = poleA === poleB;
    const numLines = 14;
    c.save();
    c.globalAlpha = 0.55;
    for (let i = 0; i < numLines; i++) {
      const angle = (Math.PI * i) / numLines;
      const spread = repel ? 1.3 : 0.9;
      for (const side of [-1, 1]) {
        const sx = midX - side * gap * 0.5 - side * magW * 0.4;
        const ex = midX + side * gap * 0.5 + side * magW * 0.2;
        const cp1x = sx + side * 50 * Math.cos(angle) * spread;
        const cp1y = midY - 60 * Math.sin(angle);
        const cp2x = ex - side * 50 * Math.cos(angle) * spread;
        const cp2y = midY - 60 * Math.sin(angle);
        c.beginPath();
        c.moveTo(sx, midY);
        c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, midY);
        c.strokeStyle = '#6E4B1A';
        c.lineWidth = 1.2;
        c.stroke();
      }
    }
    c.restore();
  }

  function _drawCompass(c, x, y, config) {
    const r = 18;
    c.save();
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = '#F8F8F0'; c.fill();
    c.strokeStyle = '#555'; c.lineWidth = 1.5; c.stroke();
    // Needle: N pole points toward south of field (away from N magnet)
    const needleAngle = config === 'NS' ? 0 : Math.PI * 0.5;
    c.beginPath();
    c.moveTo(x + Math.cos(needleAngle + Math.PI) * r * 0.8, y + Math.sin(needleAngle + Math.PI) * r * 0.8);
    c.lineTo(x + Math.cos(needleAngle) * r * 0.8, y + Math.sin(needleAngle) * r * 0.8);
    c.strokeStyle = '#C0392B'; c.lineWidth = 3; c.stroke();
    c.font = '8px sans-serif'; c.fillStyle = '#333';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('N', x + Math.cos(needleAngle) * (r + 8), y + Math.sin(needleAngle) * (r + 8));
    c.restore();
  }

  function _drawInduced(c, midX, topY) {
    const nailColor = '#8A949C';
    const steelColor = '#6C757D';
    const nailX = midX - 50, steelX = midX + 30;
    // Labels
    c.font = '10px sans-serif'; c.fillStyle = '#333'; c.textAlign = 'center';
    c.fillText('Soft iron nail', nailX, topY - 4);
    c.fillText('Steel nail', steelX, topY - 4);
    // Soft iron nail
    c.fillStyle = _g8.inducedNailTouching || _g8.inducedNailMag ? '#3498DB' : nailColor;
    c.fillRect(nailX - 6, topY, 12, 40);
    c.fillStyle = '#555'; c.fillRect(nailX - 10, topY, 20, 8);
    // Steel nail
    c.fillStyle = _g8.inducedSteelTouching || _g8.inducedSteelMag ? '#E74C3C' : steelColor;
    c.fillRect(steelX - 6, topY, 12, 40);
    c.fillStyle = '#555'; c.fillRect(steelX - 10, topY, 20, 8);
    // Paper clips below (show clips attached if magnetised)
    const nailMag = _g8.inducedNailTouching || _g8.inducedNailMag;
    const steelMag = _g8.inducedSteelTouching || _g8.inducedSteelMag;
    if (nailMag) { c.fillStyle = '#95A5A6'; c.fillRect(nailX - 4, topY + 42, 8, 6); }
    if (steelMag) { c.fillStyle = '#95A5A6'; c.fillRect(steelX - 4, topY + 42, 8, 6); }
    c.textAlign = 'start';
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const obj = e.target.closest('[data-obj]');
      if (obj) { _tapObj(obj.dataset.obj); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { startMission(m.dataset.mission); return; }
      const st = e.target.closest('[data-sort-obj]');
      if (st) { const [id, grp] = st.dataset.sortObj.split(':'); _sortObj(id, grp); return; }
    };
    // Drag support on canvas (Grade 4)
    if (_is4()) _wireG4Drag();
  }

  function _wireG4Drag() {
    _cv.addEventListener('pointerdown', e => {
      if (e.pointerType === 'touch') return;
      const r = _cv.getBoundingClientRect();
      const x = (e.clientX - r.left) * (_W / r.width);
      const y = (e.clientY - r.top)  * (_H / r.height);
      const hit = _g4HitTest(x, y);
      if (!hit) return;
      e.preventDefault();
      _g4.dragging = { id: hit, x, y, startX: x, startY: y };
      _cv.setPointerCapture(e.pointerId);
    });
    _cv.addEventListener('pointermove', e => {
      if (!_g4 || !_g4.dragging) return;
      const r = _cv.getBoundingClientRect();
      _g4.dragging.x = (e.clientX - r.left) * (_W / r.width);
      _g4.dragging.y = (e.clientY - r.top)  * (_H / r.height);
    });
    _cv.addEventListener('pointerup', e => {
      if (!_g4 || !_g4.dragging) return;
      const r = _cv.getBoundingClientRect();
      const x = (e.clientX - r.left) * (_W / r.width);
      const y = (e.clientY - r.top)  * (_H / r.height);
      const id = _g4.dragging.id;
      _g4.dragging = null;
      if (_nearMagnet(x, y)) _testObj(id, x, y);
    });
  }

  function _g4HitTest(x, y) {
    // Shelf items are drawn in the shelf div, not on canvas — taps handled there.
    return null;
  }
  function _nearMagnet(x, y) {
    const cx = _W / 2, cy = _H * 0.42;
    return Math.hypot(x - cx, y - cy) < _W * 0.35;
  }

  function _act(act) {
    switch (act) {
      case 'hub':   Labs.backToHub(); break;
      case 'help':  _help(); break;
      case 'tip':   _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) speak(el.textContent); break; }
      case 'say-guide': { const el = _root && _root.querySelector('#lab-guide .lab-guide-say'); if (el) speak(el.textContent); break; }
      case 'exit-mission': _mission = null; _coach(_is4() ? 'Back to free testing. Test any object you like.' : 'Back to free testing. The bench is all yours.'); _renderPanel(); break;
      case 'guide-stop': _stopGuide(false); break;
      // Grade 8 controls
      case 'flip-b':   if (_is8() && _g8) { _g8.poleB = _g8.poleB === 'N' ? 'S' : 'N'; _fireEvent('poles:' + _g8.poleA + _g8.poleB); _syncG8Btns(); _coachG8Poles(); } break;
      case 'distance': if (_is8() && _g8) { _g8.distance = _g8.distance === 'far' ? 'close' : 'far'; _fireEvent('distance:' + _g8.distance); _syncG8Btns(); _coach(_g8.distance === 'close' ? 'The magnets are close. The force is much stronger now.' : 'The magnets are further apart. The force is weaker.'); } break;
      case 'filings': if (_is8() && _g8) { _g8.filings = !_g8.filings; if (_g8.filings) _fireEvent('filings:on'); _syncG8Btns(); _coach(_g8.filings ? 'Iron filings mode on. You can see the magnetic field lines.' : 'Iron filings off.'); } break;
      case 'compass': if (_is8() && _g8) { _g8.compassPlaced = !_g8.compassPlaced; if (_g8.compassPlaced) _fireEvent('compass:place'); _syncG8Btns(); _coach(_g8.compassPlaced ? 'Plotting compass placed. Its north pole points along the field line.' : 'Compass removed.'); } break;
      case 'induced': if (_is8() && _g8) { _g8.induced = !_g8.induced; if (_g8.induced) _fireEvent('induced:on'); _syncG8Btns(); _coach(_g8.induced ? 'Induced mode on. Tap a nail to touch it to the magnet.' : 'Induced mode off.'); _renderPanel(); } break;
      case 'drop':    if (_is8() && _g8) { _g8.dropped = true; _fireEvent('drop:magnet'); _coach('You dropped the magnet! Dropping a magnet can weaken it by disrupting its domains.'); } break;
      case 'touch-nail':  if (_is8() && _g8 && _g8.induced) { _touchInduced('nail'); } break;
      case 'touch-steel': if (_is8() && _g8 && _g8.induced) { _touchInduced('steel'); } break;
    }
  }

  function _coachG8Poles() {
    if (!_g8) return;
    const config = _g8.poleA + _g8.poleB;
    if (config === 'NS') _coach('North meets South — unlike poles attract! They pull toward each other.');
    else if (config === 'NN') _coach('North meets North — like poles repel! They push each other apart.');
    else if (config === 'SS') _coach('South meets South — like poles repel! They push each other apart.');
    else if (config === 'SN') _coach('South meets North — unlike poles attract!');
  }

  function _syncG8Btns() {
    if (!_g8) return;
    const t = id => { const b = $(id); if (b) b.classList.toggle('is-on', !!_g8[id.replace('lab-', '').replace('-', '')]); };
    const fb = $('lab-filings');   if (fb) fb.classList.toggle('is-on', _g8.filings);
    const cb = $('lab-compass');   if (cb) cb.classList.toggle('is-on', _g8.compassPlaced);
    const ib = $('lab-induced');   if (ib) ib.classList.toggle('is-on', _g8.induced);
    const db = $('lab-distance');  if (db) db.textContent = _g8.distance === 'close' ? '📏 Move apart' : '📏 Move close';
  }

  function _touchInduced(type) {
    if (!_g8) return;
    if (type === 'nail') {
      _g8.inducedNailTouching = !_g8.inducedNailTouching;
      if (_g8.inducedNailTouching) {
        _fireEvent('induced:touch:nail');
        _coach('The soft iron nail is touching the magnet. It is now magnetised by induction!');
        _g8.inducedNailMag = true;
      } else {
        _fireEvent('induced:remove:nail');
        _g8.inducedNailMag = false;
        _coach('The soft iron nail lost its magnetism when removed. Soft iron is a temporary magnet.');
      }
    } else {
      _g8.inducedSteelTouching = !_g8.inducedSteelTouching;
      if (_g8.inducedSteelTouching) {
        _fireEvent('induced:touch:steel');
        _coach('The steel nail is touching the magnet and is now magnetised by induction.');
        _g8.inducedSteelMag = true;
      } else {
        _fireEvent('induced:remove:steel');
        _coach('The steel nail kept its magnetism! Hard steel retains magnetism even after removal.');
      }
    }
  }

  function _tapObj(id) {
    if (!_g4) return;
    _testObj(id, _W / 2, _H * 0.6);
  }

  function _testObj(id, x, y) {
    if (!_g4) return;
    if (_g4.busy) { _coach('Wait — something is happening. Try again in a moment.'); return; }
    const obj = P().OBJECTS.find(o => o.id === id);
    if (!obj) return;
    _g4.busy = true;
    const type = obj.magnetic ? 'attract' : 'bounce';
    _g4.tested[id] = type;
    _g4.fx.push({ id, type, t: 0, dur: _instant ? 0.01 : 1.0, sx: x, sy: y, done: () => {
      _g4.busy = false;
      _fireEvent('drag:' + id);
      _renderShelf();
      if (obj.magnetic) _coach(_is4() ? `Yes! The ${obj.label.toLowerCase()} is attracted. It is a magnetic material!` : '');
      else _coach(_is4() ? `No! The ${obj.label.toLowerCase()} is not attracted. It is a non-magnetic material.` : '');
    }});
    if (_instant || Labs.calm()) {
      _g4.fx.forEach(f => { f.t = 1; if (f.done) { f.done(); } });
      _g4.fx = [];
    }
    _renderShelf();
  }

  function _renderShelf() {
    const shelf = $('lab-magnets-shelf');
    if (!shelf || !_g4) return;
    const objs = _mine(P().OBJECTS);
    shelf.innerHTML = objs.map(o => `<button type="button" class="lab-magnets-obj${_g4.tested[o.id] ? ' is-tested' : ''}" data-obj="${esc(o.id)}" aria-label="${esc(o.label)}">
      <span aria-hidden="true">${esc(o.icon)}</span>
      <em>${esc(o.label)}</em>
    </button>`).join('');
    // Sort zone items (drag-to-sort within sort groups not implemented — use panel buttons)
  }

  function _sortObj(id, group) {
    if (!_g4) return;
    const obj = P().OBJECTS.find(o => o.id === id);
    if (!obj) return;
    const correct = (group === 'magnetic') === obj.magnetic;
    if (!correct) {
      const msg = obj.magnetic
        ? `${obj.label} is actually MAGNETIC — it is attracted to magnets!`
        : `${obj.label} is NOT magnetic — it is not attracted to magnets!`;
      if (typeof Labs.resultCard === 'function') Labs.resultCard({ icon: '❌', title: 'Wrong group!', body: msg });
      else _coach(msg);
      return;
    }
    _g4.sorted[id] = group;
    _fireEvent('sort:' + id);
    _renderSortZone();
    _coach(`Correct! The ${obj.label.toLowerCase()} goes in the ${group === 'magnetic' ? 'magnetic' : 'non-magnetic'} group.`);
  }

  function _renderSortZone() {
    if (!_g4) return;
    const objs = _mine(P().OBJECTS);
    const zones = { magnetic: $('lab-sort-magnetic'), nonmagnetic: $('lab-sort-nonmagnetic') };
    for (const [key, el] of Object.entries(zones)) {
      if (!el) continue;
      el.innerHTML = objs.filter(o => _g4.sorted[o.id] === key)
        .map(o => `<span class="lab-magnets-sorted">${esc(o.icon)} ${esc(o.label)}</span>`).join('');
    }
    // Render sort buttons for unsorted tested objects
    const panel = $('lab-panel');
    if (!panel || _panel !== 'sandbox') return;
    _renderPanel();
  }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el || !text) return;
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }

  function _nextTip() {
    const facts = _mine(P().FACTS);
    _tipIdx = (_tipIdx + 1) % facts.length;
    const tip = facts[_tipIdx];
    _coach('💡 ' + (tip.text || tip));
  }

  // ══ Read aloud (Grade 4 — never auto-plays) ══
  const _synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  const _plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
  function _voice() {
    const ss = _synth();
    const vs = ss && typeof ss.getVoices === 'function' ? ss.getVoices() || [] : [];
    const norm = v => (v.lang || '').replace('_', '-').toLowerCase();
    for (const m of [v => norm(v) === 'en-gb', v => norm(v).startsWith('en-'), v => norm(v).startsWith('en')]) {
      const hit = vs.filter(m);
      if (hit.length) return hit.find(v => v.localService) || hit[0];
    }
    return null;
  }
  function speak(text) {
    if (!_is4()) return false;
    const ss = _synth();
    const t = _plain(text);
    if (!ss || !t || typeof SpeechSynthesisUtterance === 'undefined') return false;
    _hush();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-GB'; u.rate = 0.9;
    const v = _voice();
    if (v) { try { u.voice = v; } catch (e2) {} }
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    ss.speak(u);
    return true;
  }
  function _hush() {
    const ss = _synth();
    if (!ss) return;
    if (_talking || ss.speaking || ss.pending) { try { ss.cancel(); } catch (e2) {} }
    _talking = false;
  }
  function _ov(fn) { _hush(); return fn(); }

  // ══ Discoveries ══════════════════════════════
  function _fireEvent(token) {
    if (!_events) _events = new Set();
    _events.add(token);
    _guideEvent(token);
    _checkDisc(token);
  }

  function _checkDisc(token) {
    const st = Labs.store(ID);
    if (!st.disc) st.disc = {};
    const g = _grade();
    for (const d of P().DISCOVERIES) {
      if (!d.grades.includes(g)) continue;
      if (st.disc[d.id]) continue;
      const unlock = Array.isArray(d.unlock) ? d.unlock : [d.unlock];
      if (unlock.every(u => _events.has(u))) {
        st.disc[d.id] = Date.now();
        Labs.persist();
        Labs.discover(ID, d.id, { title: d.title, total: P().forGrade(P().DISCOVERIES, g).length });
        _renderFound();
      }
    }
  }

  function _renderFound() {
    const n = $('lab-found-n');
    if (!n) return;
    const st = Labs.store(ID);
    const disc = st.disc || {};
    const total = P().forGrade(P().DISCOVERIES, _grade()).length;
    const found = Object.keys(disc).filter(k => P().DISCOVERIES.find(d => d.id === k && d.grades.includes(_grade()))).length;
    n.textContent = found > 0 ? `${found}/${total}` : '';
  }

  function _discDetail(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const st = Labs.store(ID);
    const found = !!(st.disc && st.disc[id]);
    if (!found) {
      _ov(() => Labs.overlay(`
        <div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(d.hint)}</h2>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
        </div>`, { cls: 'is-done' }));
      return;
    }
    _ov(() => Labs.overlay(`
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
        <button type="button" class="lab-btn" data-ov-close data-autofocus>Close</button>
      </div>`, { cls: 'is-done' }));
  }

  // ══ Guide system ══════════════════════════════
  function startGuide(id) {
    const G = _mine(P().GUIDES).find(g => g.id === id);
    if (!G) return;
    _mission = null;
    if (_is4() && _g4) _resetG4();
    if (_is8() && _g8) _resetG8();
    _guide = { id: G.id, step: 0 };
    _panel = 'sandbox';
    _renderPanel();
    _guideEnter();
    const zone = $('lab-magnets-zone');
    if (zone && zone.getBoundingClientRect().top < 0) zone.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _gdef() {
    if (!_guide) return null;
    return _mine(P().GUIDES).find(g => g.id === _guide.id) || null;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) { _guideDone(); return; }
    _hush();
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      const sayBtn = _is4() ? `<button type="button" class="lab-magnets-say" data-act="say-guide" aria-label="Read this out loud">🔊</button>` : '';
      box.innerHTML = `<p class="lab-guide-meta">${esc(G.icon)} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${sayBtn}
        <div class="lab-guide-actions"><button type="button" class="lab-guide-hint-btn" data-guide-hint>💡 Hint</button></div>
        <button type="button" class="lab-link" data-act="guide-stop">Stop the guide</button>`;
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

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store(ID);
    if (!st.guides) st.guides = {};
    st.guides[G.id] = Date.now();
    Labs.persist();
    _stopGuide(true);
    const next = _mine(P().GUIDES).find(g => !((st.guides || {})[g.id]));
    _ov(() => Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${G.icon}</p>
        <p class="lab-rs-kicker">Experiment complete</p>
        <h2 id="lab-ov-title">${esc(G.title)}</h2>
        <section class="lab-hz-sec is-exam lab-done-lesson"><h3>What you found out</h3><p>${esc(G.lesson)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Test freely</button>
        ${next
          ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${esc(next.id)}" data-autofocus>Next: ${esc(next.title)} →</button>`
          : '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>'}
      </div>`, { cls: 'is-done' }));
    _coach(`Experiment complete: ${G.title}.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or test freely.');
  }

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide && _guide.step] || null;
    if (!s) return;
    const [kind] = s.on.split(':');
    if (kind === 'drag' || kind === 'sort') {
      const id = s.on.split(':')[1];
      const btn = _root.querySelector(`[data-obj="${id}"]`);
      if (btn) {
        btn.classList.add('is-next');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        const guideBox = _root.querySelector('#lab-guide');
        _root.querySelectorAll('[data-act],[data-obj]').forEach(other => {
          if (other !== btn && !btn.contains(other) && !other.contains(btn)
              && !(guideBox && guideBox.contains(other))) {
            other.classList.add('is-guide-dim');
          }
        });
      }
    }
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = _mine(P().MISSIONS).find(m => m.id === id);
    if (!M) return;
    _guide = null; _stopGuide(true);
    _mission = { id: M.id, q: 0, score: 0 };
    _panel = 'sandbox';
    _renderPanel();
    _coach(M.intro || 'Answer the questions!');
  }

  function _quiz() {
    if (!_mission) return;
    const M = _mine(P().MISSIONS).find(m => m.id === _mission.id);
    if (!M) return;
    Labs.quiz(M.quiz, {
      onDone: (score, total) => {
        const st = Labs.store(ID);
        if (!st.missions) st.missions = {};
        st.missions[M.id] = Math.max(st.missions[M.id] || 0, score);
        Labs.persist();
        Labs.missionDone(score, total, M.title);
        _mission = null;
        _coach('Mission complete! Explore the bench or try another mission.');
        _renderPanel();
      },
    });
  }

  // ══ Panel ════════════════════════════════════
  function _renderPanel() {
    const el = $('lab-panel');
    if (!el) return;
    _renderFound();
    _syncTabs();
    if (_panel === 'sandbox')  el.innerHTML = _sandboxPanel();
    else if (_panel === 'missions') el.innerHTML = _missionsPanel();
    else if (_panel === 'found')    el.innerHTML = _foundPanel();
  }

  function _syncTabs() {
    if (!_root) return;
    _root.querySelectorAll('[role="tab"]').forEach(t => {
      t.setAttribute('aria-selected', t.dataset.panel === _panel ? 'true' : 'false');
    });
  }

  function _sandboxPanel() {
    const G = _gdef();
    if (G) {
      const s = G.steps[_guide && _guide.step];
      if (!s) return '<p class="lab-panel-empty">All steps done!</p>';
      return `<div class="lab-panel-section"><h3>Current step</h3><p>${esc(s.say)}</p></div>`;
    }
    if (_is4() && _g4) {
      // Show sort panel for tested but not-yet-sorted objects
      const objs = _mine(P().OBJECTS);
      const toSort = objs.filter(o => _g4.tested[o.id] && !_g4.sorted[o.id]);
      const sortHTML = toSort.length ? `<div class="lab-panel-section">
        <h3>Sort these objects</h3>
        ${toSort.map(o => `<div class="lab-magnets-sort-row">
          <span>${esc(o.icon)} ${esc(o.label)}</span>
          <button type="button" class="lab-btn" data-sort-obj="${esc(o.id)}:magnetic">🧲 Magnetic</button>
          <button type="button" class="lab-btn" data-sort-obj="${esc(o.id)}:nonmagnetic">❌ Non-magnetic</button>
        </div>`).join('')}
      </div>` : '';
      const guides = _mine(P().GUIDES);
      const st = Labs.store(ID);
      const guideHTML = `<div class="lab-panel-section">
        <h3>Guided experiments</h3>
        ${guides.map(g => `<button type="button" class="lab-guide-card${(st.guides || {})[g.id] ? ' is-done' : ''}" data-guide="${esc(g.id)}">
          <span aria-hidden="true">${g.icon}</span>
          <b>${esc(g.title)}</b>
          <small>${esc(g.blurb)}</small>
        </button>`).join('')}
      </div>`;
      return sortHTML + guideHTML;
    }
    // Grade 8
    const guides = _mine(P().GUIDES);
    const st = Labs.store(ID);
    const induced = _g8 && _g8.induced;
    const inducedControls = induced ? `<div class="lab-panel-section">
      <h3>Induced magnetism</h3>
      <button type="button" class="lab-tool" data-act="touch-nail">${_g8.inducedNailTouching ? '↑ Remove soft iron nail' : '↓ Touch soft iron nail to magnet'}</button>
      <button type="button" class="lab-tool" data-act="touch-steel">${_g8.inducedSteelTouching ? '↑ Remove steel nail' : '↓ Touch steel nail to magnet'}</button>
    </div>` : '';
    return inducedControls + `<div class="lab-panel-section">
      <h3>Guided experiments</h3>
      ${guides.map(g => `<button type="button" class="lab-guide-card${(st.guides || {})[g.id] ? ' is-done' : ''}" data-guide="${esc(g.id)}">
        <span aria-hidden="true">${g.icon}</span>
        <b>${esc(g.title)}</b>
        <small>${esc(g.blurb)}</small>
      </button>`).join('')}
    </div>`;
  }

  function _missionsPanel() {
    const missions = _mine(P().MISSIONS);
    const st = Labs.store(ID);
    return missions.map(m => {
      const best = (st.missions || {})[m.id] || 0;
      const active = _mission && _mission.id === m.id;
      return `<div class="lab-panel-section">
        <button type="button" class="lab-mission-card${active ? ' is-active' : ''}" data-mission="${esc(m.id)}">
          <span aria-hidden="true">${m.icon}</span>
          <b>${esc(m.title)}</b>
          <small>${esc(m.blurb)}</small>
          ${best ? `<span class="lab-mission-stars">${Labs.stars(Math.round(best / m.quiz.length * 3))}</span>` : ''}
        </button>
        ${active ? `<button type="button" class="lab-btn lab-btn-primary" data-act="quiz">Start questions →</button>
          <button type="button" class="lab-link" data-act="exit-mission">Exit mission</button>` : ''}
      </div>`;
    }).join('') || '<p class="lab-panel-empty">No missions yet.</p>';
  }

  function _foundPanel() {
    const st = Labs.store(ID);
    const disc = st.disc || {};
    const all = _mine(P().DISCOVERIES);
    return all.map(d => {
      const found = !!disc[d.id];
      return `<button type="button" class="lab-disc-card${found ? ' is-found' : ''}" data-disc="${esc(d.id)}">
        <span aria-hidden="true">${found ? d.icon : '❔'}</span>
        <b>${found ? esc(d.title) : 'Locked'}</b>
        <small>${esc(d.hint)}</small>
      </button>`;
    }).join('') || '<p class="lab-panel-empty">No discoveries yet.</p>';
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    _renderFound();
  }

  // ══ Intro / Help ═════════════════════════════
  function _intro() {
    const st = Labs.store(ID);
    st.intro = true;
    Labs.persist();
    const text = _is4()
      ? 'Welcome to the Magnets lab! Tap any object to bring it near the horseshoe magnet. See which ones are attracted!'
      : 'Welcome to the Magnets lab! Use the controls to explore poles, iron filings and induced magnetism.';
    _coach(text);
  }

  function _help() {
    _ov(() => Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">🧲</p>
        <p class="lab-rs-kicker">How this lab works</p>
        <h2 id="lab-ov-title">Magnets Lab</h2>
      </div>
      <div class="lab-hz-body">
        ${_is4() ? `<section class="lab-hz-sec"><h3>Grade 4</h3>
          <p>Tap any object on the shelf to test it near the horseshoe magnet.</p>
          <p>Magnetic objects are attracted. Non-magnetic ones bounce away.</p>
          <p>Sort the objects on the board below. Then try a guided experiment!</p>
        </section>` : `<section class="lab-hz-sec"><h3>Grade 8</h3>
          <p>Use the controls to flip poles, reveal field lines with iron filings, and explore induced magnetism.</p>
          <p>The arrows show whether the magnets attract or repel.</p>
        </section>`}
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Let's go!</button>
      </div>`, { cls: 'is-done' }));
  }

  // ══ Test interface ════════════════════════════
  // Used by scripts/test-labs-magnets.js.
  function _test({ instant = false } = {}) { _instant = instant; }
  function _tick(s) { _clock += s; }
  function _debug() {
    return {
      grade: _grade(), panel: _panel, guide: _guide ? { id: _guide.id, step: _guide.step } : null,
      mission: _mission ? { id: _mission.id } : null,
      g4: _g4 ? { tested: { ..._g4.tested }, sorted: { ..._g4.sorted } } : null,
      g8: _g8 ? { poleA: _g8.poleA, poleB: _g8.poleB, filings: _g8.filings, induced: _g8.induced } : null,
      events: _events ? [..._events] : [],
      store: Labs.store(ID),
    };
  }

  return { mount, unmount, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMagnets = LabMagnets;
