'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Magnets (Science, Grades 4 & 8)
//
//  Grade 4: horseshoe magnet on a bench; 8 objects on a shelf. Tap an object
//  and it flies to the magnet - magnetic objects stick to a pole, the rest
//  fall to the bench and stay there. A sorting board under the shelf.
//
//  Grade 8: two bar magnets; flip B's poles; move close; iron filings field
//  view; a plotting compass; induced magnetism with a soft iron nail and a
//  steel nail.
//
//  A child opens on an EXPERIMENT (lab_experiment.js, LAB_SPEC.md §10): the
//  `experiment` adapter at the bottom is what the runner drives. The guide
//  box, the glow and the bench picture are this file's; everything else in an
//  experiment is the runner's.
//
//  ⚠ All science content comes from LabMagnetsData. Fix wrong results THERE.
//  ⚠ Every experiment step is a TAP: the shelf buttons, the sort buttons and
//    the Grade 8 tool buttons. Nothing a step points at is drag-only.
//  ⚠ A wrong option listed by the current experiment step is HEARD, not done
//    (`_expWrong`): the runner shows its card and the bench stays as it was.
//  ⚠ Grade 4: 🔊 read-aloud on coach and guide box (never auto-plays).
//  ⚠ Only the <canvas> animates. Nothing here transforms .screen (ui-css.md).
//  ⚠ Calm Mode: animations show end state immediately, no movement.
//  ⚠ MutationObserver restarts the loop when the screen becomes visible again.
// ══════════════════════════════════════════════
const LabMagnets = (() => {
  'use strict';
  const P  = () => LabMagnetsData;
  const ID = 'magnets';

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  // ── State ────────────────────────────────────
  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _obs = null, _clock = 0, _instant = false;
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _tipIdx = -1, _talking = false;
  let _quiet = false;      // an experiment's silent set-up: no coach, no cards, no toasts
  let _log = [];           // the notebook, oldest first
  let _focus = null;       // Set of tokens whose controls stay visible, or null for all

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
      rest: {},          // id → { type, k }: where a tested object now lies
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
          <div id="lab-magnets-controls">${_is4() ? _g4Controls() : _g8Controls()}</div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            ${sayCoach}
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <p class="lab-task-strip">${_is4() ? 'Tap a thing on the shelf - does the 🧲 magnet pull it?' : 'Flip the poles, sprinkle filings, place the compass - map the field.'}</p>
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
    return `<div class="lab-magnets-shelf" id="lab-magnets-shelf" role="group" aria-label="Things to test">${_shelfHTML()}</div>
    <div class="lab-magnets-sort" id="lab-magnets-sort" role="group" aria-label="Sorting board">${_sortHTML()}</div>`;
  }
  function _shelfHTML() {
    const objs = _mine(P().OBJECTS);
    return objs.map(o => `<button type="button" class="lab-magnets-obj${_g4 && _g4.tested[o.id] ? ' is-tested' : ''}" data-obj="${esc(o.id)}" aria-label="${esc(o.label)}">
        <span aria-hidden="true">${esc(o.icon)}</span>
        <em>${esc(o.label)}</em>
      </button>`).join('');
  }
  // The sorting board: every unsorted object gets a row with the two group
  // buttons - a tap, never a drag. Below it, the two groups as sorted so far.
  function _sortHTML() {
    const objs = _mine(P().OBJECTS), sorted = (_g4 && _g4.sorted) || {};
    const rows = objs.filter(o => !sorted[o.id]).map(o => `<div class="lab-magnets-sort-row" data-sort-row="${esc(o.id)}">
        <span>${esc(o.icon)} ${esc(o.label)}</span>
        <button type="button" class="lab-btn lab-btn-sm" data-sort-obj="${esc(o.id)}:magnetic">🧲 Magnetic</button>
        <button type="button" class="lab-btn lab-btn-sm" data-sort-obj="${esc(o.id)}:nonmagnetic">❌ Non-magnetic</button>
      </div>`).join('');
    const zone = key => objs.filter(o => sorted[o.id] === key).map(o => `<span class="lab-magnets-sorted">${esc(o.icon)} ${esc(o.label)}</span>`).join('');
    return `<div class="lab-magnets-tosort">${rows}</div>
      <div class="lab-magnets-sort-groups">
        <div class="lab-magnets-sort-group is-magnetic" data-sort-target="magnetic">
          <h3>🧲 Magnetic</h3>
          <div class="lab-magnets-sort-zone" id="lab-sort-magnetic">${zone('magnetic')}</div>
        </div>
        <div class="lab-magnets-sort-group is-nonmagnetic" data-sort-target="nonmagnetic">
          <h3>❌ Non-magnetic</h3>
          <div class="lab-magnets-sort-zone" id="lab-sort-nonmagnetic">${zone('nonmagnetic')}</div>
        </div>
      </div>`;
  }

  function _g8Controls() {
    const induced = _g8 && _g8.induced;
    return `<div class="lab-magnets-g8-controls" id="lab-magnets-g8-controls">
      <div class="lab-magnets-row" data-row="poles">
        <button type="button" class="lab-tool" data-act="flip-b" id="lab-flip-b">↔ Flip magnet B</button>
        <button type="button" class="lab-tool" data-act="distance" id="lab-distance">${_g8 && _g8.distance === 'close' ? '📏 Move apart' : '📏 Move close'}</button>
      </div>
      <div class="lab-magnets-row" data-row="field">
        <button type="button" class="lab-tool lab-magnets-toggle" data-act="filings" id="lab-filings">✨ Iron filings</button>
        <button type="button" class="lab-tool lab-magnets-toggle" data-act="compass" id="lab-compass">🧭 Plotting compass</button>
        <button type="button" class="lab-tool lab-magnets-toggle" data-act="induced" id="lab-induced">🪛 Induced mode</button>
        <button type="button" class="lab-tool" data-act="drop" id="lab-drop">💥 Drop magnet</button>
      </div>
      ${induced ? `<div class="lab-magnets-row lab-magnets-induced" data-row="induced">
        <button type="button" class="lab-tool" data-act="touch-nail">${_g8.inducedNailTouching ? '↑ Remove soft iron nail' : '↓ Touch soft iron nail to magnet'}</button>
        <button type="button" class="lab-tool" data-act="touch-steel">${_g8.inducedSteelTouching ? '↑ Remove steel nail' : '↓ Touch steel nail to magnet'}</button>
      </div>` : ''}
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
    if (_is8()) _syncG8Btns();
    _applyFocus();
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
      if (f.t >= 1) { f.t = 1; fx.splice(i, 1); if (f.done) f.done(); }
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
  const _g4Geo = () => {
    const rOuter = Math.min(_W, _H) * 0.28;
    return { cx: _W / 2, cy: _H * 0.42, rOuter, rInner: rOuter * 0.6 };
  };
  // Where a tested object comes to rest: stuck under a pole (alternating
  // poles, stacking down), or lying along the bench floor.
  function _restPos(type, k) {
    const g = _g4Geo();
    if (type === 'attract') {
      const side = k % 2 ? 1 : -1;
      return { x: g.cx + side * (g.rOuter + g.rInner) / 2, y: g.cy + 18 + Math.floor(k / 2) * 24 };
    }
    const span = Math.max(80, _W - 56);
    return { x: 28 + ((k * 54) % span), y: _H - 16 - 15 };
  }
  function _drawG4(c) {
    if (!_g4) return;
    const calm = Labs.calm();
    const { cx, cy, rOuter, rInner } = _g4Geo();
    // Horseshoe magnet body (U shape)
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
    const poleX = (rOuter + rInner) / 2;
    c.fillStyle = '#FFFFFF';
    c.font = `bold ${Math.max(11, _H * 0.06)}px sans-serif`;
    c.textAlign = 'center';
    c.fillText('N', cx - poleX, cy - 4);
    c.fillText('S', cx + poleX, cy - 4);
    c.textAlign = 'start';
    // Objects at rest
    for (const [id, r] of Object.entries(_g4.rest)) {
      const obj = P().objById(id);
      if (!obj) continue;
      const p = _restPos(r.type, r.k);
      _drawObj(c, obj, p.x, p.y, 26);
    }
    // Animate objects
    for (const f of _g4.fx) {
      const obj = P().objById(f.id);
      if (!obj) continue;
      const end = _restPos(f.type, f.k);
      const t = calm ? 1 : f.t;
      let x, y;
      if (f.type === 'attract') {
        x = f.sx + (end.x - f.sx) * t;
        y = f.sy + (end.y - f.sy) * t;
      } else {
        // up toward the magnet, then it drops to the floor
        const near = { x: cx + (end.x > cx ? 1 : -1) * rInner * 0.5, y: cy + rOuter * 0.5 };
        if (t < 0.5) { const u = t * 2; x = f.sx + (near.x - f.sx) * u; y = f.sy + (near.y - f.sy) * u; }
        else { const u = (t - 0.5) * 2; x = near.x + (end.x - near.x) * u; y = near.y + (end.y - near.y) * (u * u); }
      }
      _drawObj(c, obj, x, y, 28);
    }
    // Drag ghost
    if (_g4.dragging) {
      const obj = P().objById(_g4.dragging.id);
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
      const attract = P().force(_g8.poleA, _g8.poleB) === 'attract';
      _drawForceArrows(c, midX, magY + magH / 2, gap, attract, close);
    }
    // Iron filings (a still picture: it shows in Calm Mode too)
    if (_g8.filings) _drawFilings(c, midX, magY + magH / 2, _g8.poleA, _g8.poleB, gap, magW, magH);
    // Compass
    if (_g8.compassPlaced) _drawCompass(c, midX, magY + magH / 2 + _H * 0.2, P().needle(_g8.poleA, _g8.poleB).dir);
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
    c.font = '10px sans-serif'; c.fillStyle = '#2C3E50'; c.textBaseline = 'bottom';
    c.fillText(facing === 'right' ? 'A' : 'B', x + w / 2, y - 3);
    c.textAlign = 'start'; c.textBaseline = 'alphabetic';
  }

  // Attract: the arrows point at each other. Repel: away. Close: bigger.
  function _drawForceArrows(c, midX, midY, gap, attract, close) {
    const arLen = close ? 34 : 22, arHead = close ? 8 : 6;
    const col = attract ? '#27AE60' : '#E74C3C';
    c.strokeStyle = col; c.fillStyle = col;
    c.lineWidth = close ? 3.5 : 2.5;
    const arrow = (x0, dir) => {
      const x1 = x0 + dir * arLen;
      c.beginPath(); c.moveTo(x0, midY); c.lineTo(x1, midY); c.stroke();
      c.beginPath();
      c.moveTo(x1, midY);
      c.lineTo(x1 - dir * arHead, midY - arHead);
      c.lineTo(x1 - dir * arHead, midY + arHead);
      c.closePath(); c.fill();
    };
    // A's arrow starts at A's pole face; B's at B's. Toward each other = attract.
    arrow(midX - gap / 2 + 4, attract ? 1 : -1);
    arrow(midX + gap / 2 - 4, attract ? -1 : 1);
    c.font = `bold ${close ? 13 : 11}px sans-serif`; c.fillStyle = attract ? '#1E8449' : '#B03A2E';
    c.textAlign = 'center'; c.textBaseline = 'top';
    c.fillText(attract ? 'Attract' : 'Repel', midX, midY + 12);
    c.textAlign = 'start'; c.textBaseline = 'alphabetic';
  }

  // Unlike poles: curves cross the gap from A's pole to B's. Like poles: the
  // lines leaving each pole bend AWAY from the gap and back over their own
  // magnet - they never meet.
  function _drawFilings(c, midX, midY, poleA, poleB, gap, magW, magH) {
    const repel = P().force(poleA, poleB) === 'repel';
    const numLines = 14;
    c.save();
    c.globalAlpha = 0.6;
    c.strokeStyle = '#6E4B1A';
    c.lineWidth = 1.2;
    for (let i = 0; i < numLines; i++) {
      const angle = (Math.PI * i) / numLines;
      if (!repel) {
        for (const side of [-1, 1]) {
          const sx = midX - side * gap * 0.5 - side * magW * 0.4;
          const ex = midX + side * gap * 0.5 + side * magW * 0.2;
          const cp1x = sx + side * 50 * Math.cos(angle) * 0.9;
          const cp1y = midY - 60 * Math.sin(angle);
          const cp2x = ex - side * 50 * Math.cos(angle) * 0.9;
          const cp2y = midY - 60 * Math.sin(angle);
          c.beginPath();
          c.moveTo(sx, midY);
          c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, midY);
          c.stroke();
        }
      } else {
        for (const side of [-1, 1]) {
          const sgn = i % 2 ? -1 : 1;
          const amp = (magH * 0.5 + 8) + (i >> 1) * 7;
          const sx = midX + side * (gap * 0.5 - 2);          // the pole face
          const ex = sx + side * magW * 1.05;                 // the far end of the same magnet
          c.beginPath();
          c.moveTo(sx, midY - sgn * (i >> 1) * 2);
          c.bezierCurveTo(sx - side * 14, midY - sgn * amp, ex - side * magW * 0.5, midY - sgn * amp * 1.15, ex, midY - sgn * (magH * 0.5 + 2));
          c.stroke();
        }
      }
    }
    c.restore();
  }

  function _drawCompass(c, x, y, dir) {
    const r = 18;
    const ang = { right: 0, down: Math.PI * 0.5, left: Math.PI, up: -Math.PI * 0.5 }[dir] || 0;
    c.save();
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = '#F8F8F0'; c.fill();
    c.strokeStyle = '#555'; c.lineWidth = 1.5; c.stroke();
    c.beginPath();
    c.moveTo(x + Math.cos(ang + Math.PI) * r * 0.8, y + Math.sin(ang + Math.PI) * r * 0.8);
    c.lineTo(x + Math.cos(ang) * r * 0.8, y + Math.sin(ang) * r * 0.8);
    c.strokeStyle = '#C0392B'; c.lineWidth = 3; c.stroke();
    c.font = 'bold 9px sans-serif'; c.fillStyle = '#333';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('N', x + Math.cos(ang) * (r + 8), y + Math.sin(ang) * (r + 8));
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
      const st = e.target.closest('[data-sort-obj]');
      if (st) { const [id, grp] = st.dataset.sortObj.split(':'); _sortObj(id, grp); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { startMission(m.dataset.mission); return; }
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
      if (_nearMagnet(x, y)) _testObj(id);
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
      case 'quiz': _quiz(); break;
      // Grade 8 controls
      case 'flip-b':   if (_g8) _flipB(); break;
      case 'distance': if (_g8) _setDistance(_g8.distance === 'far' ? 'close' : 'far'); break;
      case 'filings':  if (_g8) _setFilings(!_g8.filings); break;
      case 'compass':  if (_g8) _setCompass(!_g8.compassPlaced); break;
      case 'induced':  if (_g8) _setInduced(!_g8.induced); break;
      case 'drop':     if (_g8) _drop(); break;
      case 'touch-nail':  if (_g8) _setTouch('nail', !_g8.inducedNailTouching); break;
      case 'touch-steel': if (_g8) _setTouch('steel', !_g8.inducedSteelTouching); break;
    }
  }

  // ── Grade 8 actions ──────────────────────────
  // Each one names the token it is about to fire FIRST, so a wrong option in
  // an experiment step is heard without the bench changing.
  function _flipB() {
    if (!_is8() || !_g8) return;
    const next = _g8.poleB === 'N' ? 'S' : 'N';
    const tok = 'poles:' + _g8.poleA + next;
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    _setPoles(_g8.poleA, next);
  }
  function _setPoles(a, b) {
    if (!_g8) return;
    _g8.poleA = a; _g8.poleB = b;
    _note(P().NOTE.poles(a, b));
    if (_g8.compassPlaced) _note(P().NOTE.compass(a, b));
    _syncG8Btns();
    _coachG8Poles();
    _fireEvent('poles:' + a + b);
  }
  function _setDistance(v) {
    if (!_g8) return;
    const tok = 'distance:' + v;
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    _g8.distance = v;
    _note(P().NOTE.distance(v === 'close'));
    _syncG8Btns();
    _coach(v === 'close' ? 'The magnets are close. The force is much stronger now - look at the arrows.' : 'The magnets are further apart. The force is weaker.');
    _fireEvent(tok);
  }
  function _setFilings(on) {
    if (!_g8) return;
    const tok = 'filings:on';
    if (on && _expWrong(tok)) { _guideEvent(tok); return; }
    _g8.filings = on;
    _syncG8Btns();
    if (on) {
      _note(P().NOTE.filings(_g8.poleA, _g8.poleB));
      _coach('Iron filings on. You can see the magnetic field lines.');
      _fireEvent(tok);
    } else _coach('Iron filings off.');
  }
  function _setCompass(on) {
    if (!_g8) return;
    const tok = 'compass:place';
    if (on && _expWrong(tok)) { _guideEvent(tok); return; }
    _g8.compassPlaced = on;
    _syncG8Btns();
    if (on) {
      _note(P().NOTE.compass(_g8.poleA, _g8.poleB));
      _coach('Plotting compass placed. Its N end points along the field line.');
      _fireEvent(tok);
    } else _coach('Compass removed.');
  }
  function _setInduced(on) {
    if (!_g8) return;
    const tok = 'induced:on';
    if (on && _expWrong(tok)) { _guideEvent(tok); return; }
    _g8.induced = on;
    if (!on) { _g8.inducedNailTouching = _g8.inducedSteelTouching = false; }
    _renderControls();
    _coach(on ? 'Induced mode on. Touch a nail to the magnet.' : 'Induced mode off.');
    if (on) _fireEvent(tok);
  }
  function _drop() {
    if (!_g8) return;
    const tok = 'drop:magnet';
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    _g8.dropped = true;
    _note(P().NOTE.drop());
    _coach('You dropped the magnet! Dropping a magnet can weaken it by disrupting its domains.');
    _fireEvent(tok);
  }
  function _setTouch(kind, on) {
    if (!_g8 || !_g8.induced) return;
    const tok = `induced:${on ? 'touch' : 'remove'}:${kind}`;
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    if (kind === 'nail') {
      _g8.inducedNailTouching = on;
      _g8.inducedNailMag = on;                   // soft iron: only while it touches
      _coach(on ? 'The soft iron nail is touching the magnet. It is a magnet now, by induction - it holds a clip!'
                : 'Off the magnet, the soft iron nail lost its magnetism. The clip dropped. Soft iron is a temporary magnet.');
    } else {
      _g8.inducedSteelTouching = on;
      if (on) _g8.inducedSteelMag = true;        // steel keeps it
      _coach(on ? 'The steel nail is touching the magnet and is now magnetised by induction.'
                : 'The steel nail kept its magnetism! It still holds the clip. Hard steel keeps magnetism.');
    }
    _note(P().NOTE.induced(kind, on));
    _renderControls();
    _fireEvent(tok);
  }

  function _coachG8Poles() {
    if (!_g8) return;
    const config = _g8.poleA + _g8.poleB;
    if (config === 'NS') _coach('North meets South - unlike poles attract! They pull toward each other.');
    else if (config === 'NN') _coach('North meets North - like poles repel! They push each other apart.');
    else if (config === 'SS') _coach('South meets South - like poles repel! They push each other apart.');
    else if (config === 'SN') _coach('South meets North - unlike poles attract!');
  }

  function _syncG8Btns() {
    if (!_g8) return;
    const fb = $('lab-filings');   if (fb) fb.classList.toggle('is-on', _g8.filings);
    const cb = $('lab-compass');   if (cb) cb.classList.toggle('is-on', _g8.compassPlaced);
    const ib = $('lab-induced');   if (ib) ib.classList.toggle('is-on', _g8.induced);
    const db = $('lab-distance');  if (db) db.textContent = _g8.distance === 'close' ? '📏 Move apart' : '📏 Move close';
  }

  // ── Grade 4 actions ──────────────────────────
  function _tapObj(id) { _testObj(id); }

  function _testObj(id) {
    if (!_g4) return;
    const obj = P().objById(id);
    if (!obj) return;
    const tok = 'drag:' + id;
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    if (_g4.busy) { _coach('Wait - something is happening. Try again in a moment.'); return; }
    const type = obj.magnetic ? 'attract' : 'bounce';
    delete _g4.rest[id];
    const used = new Set(Object.values(_g4.rest).filter(r => r.type === type).map(r => r.k));
    let k = 0; while (used.has(k)) k++;
    _g4.busy = true;
    _g4.tested[id] = type;
    const done = () => {
      _g4.busy = false;
      _g4.rest[id] = { type, k };
      _note(P().NOTE.test(obj));
      _renderShelf();
      _coach(obj.magnetic ? `Yes! The ${obj.label.toLowerCase()} is pulled to the magnet. It is a magnetic material!`
                          : `No! The ${obj.label.toLowerCase()} is not pulled. It fell. It is a non-magnetic material.`);
      _fireEvent(tok);
    };
    if (_instant || _quiet || Labs.calm()) { done(); return; }
    _g4.fx.push({ id, type, k, t: 0, dur: 0.9, sx: _W / 2, sy: _H * 0.9, done });
  }

  function _renderShelf() {
    const shelf = $('lab-magnets-shelf');
    if (!shelf || !_g4) return;
    shelf.innerHTML = _shelfHTML();
    _applyFocus();
  }
  function _renderSort() {
    const board = $('lab-magnets-sort');
    if (!board || !_g4) return;
    board.innerHTML = _sortHTML();
    _applyFocus();
  }
  function _renderControls() {
    const host = $('lab-magnets-controls');
    if (!host) return;
    host.innerHTML = _is4() ? _g4Controls() : _g8Controls();
    if (_is8()) _syncG8Btns();
    _applyFocus();
  }

  function _sortObj(id, group) {
    if (!_g4) return;
    const obj = P().objById(id);
    if (!obj || (group !== 'magnetic' && group !== 'nonmagnetic')) return;
    const tok = `sort:${id}:${group}`;
    if (_expWrong(tok)) { _guideEvent(tok); return; }
    const correct = (group === 'magnetic') === obj.magnetic;
    if (!correct) {
      if (_quiet) return;
      Labs.resultCard({
        icon: '❌', title: 'Wrong group!',
        happened: obj.magnetic ? `The ${obj.label.toLowerCase()} is MAGNETIC. The magnet pulls it.` : `The ${obj.label.toLowerCase()} is NOT magnetic. The magnet does not pull it.`,
        instead: obj.magnetic ? `Put the ${obj.label.toLowerCase()} in the Magnetic group. It has iron in it.` : `Put the ${obj.label.toLowerCase()} in the Non-magnetic group. Only iron and steel are magnetic.`,
        exam: 'Magnets attract only iron and steel. Everything else is non-magnetic.',
      });
      return;
    }
    _g4.sorted[id] = group;
    _note(P().NOTE.sort(obj, group));
    _renderSort();
    _coach(`Correct! The ${obj.label.toLowerCase()} goes in the ${group === 'magnetic' ? 'Magnetic' : 'Non-magnetic'} group.`);
    _fireEvent(tok);
    _fireEvent('sort:' + id);
  }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    if (_quiet) return;
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

  // The notebook (what the child saw, oldest first). Six lines is a page.
  function _note(text) {
    if (!text) return;
    _log.push(String(text));
    if (_log.length > 40) _log.splice(0, _log.length - 40);
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
    if (!_quiet) _checkDisc(token);
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
  // A guide is one of the data file's GUIDES (Explore) or an ad-hoc definition
  // from the experiment runner ({ exp: true, steps: [{ on, any, options, wrong, say }] }).
  const _gdef = () => _guide && (_guide.def || _mine(P().GUIDES).find(g => g.id === _guide.id)) || null;

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(P().GUIDES).find(g => g.id === idOrDef);
    if (!G) return;
    _mission = null;
    // An experiment's guide runs on the bench the runner already set up - the
    // set-up IS the experiment; never wipe it.
    if (!G.exp) {
      if (_is4()) _resetG4();
      if (_is8()) _resetG8();
      _renderControls();
    }
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _guideEnter();
    if (!G.exp) {
      const zone = $('lab-magnets-zone');
      if (zone && zone.getBoundingClientRect().top < 0) zone.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
    }
  }

  // An observation step whose setting is already in place needs no tap. A
  // decision (ask/options) is never skipped: the child must choose.
  function _satisfied(s) {
    if (!s || !s.on || s.options || s.any || !_g8) return false;
    const [k, v, w] = s.on.split(':');
    switch (k) {
      case 'poles': return _g8.poleA + _g8.poleB === v;
      case 'distance': return _g8.distance === v;
      case 'filings': return _g8.filings === (v === 'on');
      case 'compass': return _g8.compassPlaced === (v === 'place');
      case 'induced':
        if (!w) return _g8.induced === (v === 'on');
        return _g8.induced && (w === 'nail' ? _g8.inducedNailTouching : _g8.inducedSteelTouching) === (v === 'touch');
    }
    return false;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    _hush();
    let s = G.steps[_guide.step];
    while (s && _satisfied(s)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
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
    if (!G.exp) _renderPanel();
    _highlight();
    if (G.exp && experiment.hooks.step) experiment.hooks.step(_guide.step);
  }

  // A step is met by its `on` token, or by any token in `any`. The runner
  // hears every token first, so a listed wrong choice can explain itself.
  const _stepHit = (s, token) => !!s && (s.any ? s.any.includes(token) : s.on === token);
  const _expWrong = tok => { const G = _gdef(), s = G && G.exp && G.steps[_guide.step]; return !!(s && s.wrong && s.wrong[tok]); };
  function _guideEvent(token) {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (G.exp && experiment.hooks.token) experiment.hooks.token(token, s);
    if (_stepHit(s, token)) { _guide.step++; _guideEnter(); }
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
    if (G.exp) { _stopGuide(true); if (experiment.hooks.done) experiment.hooks.done(); return; }
    const st = Labs.store(ID);
    if (!st.guides) st.guides = {};
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
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
    _hush();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel();
    _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or test freely.');
  }

  // The control(s) a token belongs to. A sort token names one group button;
  // the bare `sort:<id>` of the Explore guides names both buttons of that row.
  function _selsFor(tok) {
    const [k, v, w] = String(tok).split(':');
    switch (k) {
      case 'drag': return [`[data-obj="${v}"]`];
      case 'sort': return w ? [`[data-sort-obj="${v}:${w}"]`] : [`[data-sort-obj="${v}:magnetic"]`, `[data-sort-obj="${v}:nonmagnetic"]`];
      case 'poles': return ['[data-act="flip-b"]'];
      case 'distance': return ['[data-act="distance"]'];
      case 'filings': return ['[data-act="filings"]'];
      case 'compass': return ['[data-act="compass"]'];
      case 'induced': return w ? [`[data-act="touch-${w}"]`] : ['[data-act="induced"]'];
      case 'drop': return ['[data-act="drop"]'];
    }
    return [];
  }
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const toks = s.options || s.any || (s.on ? [s.on] : []);
    const els = [];
    toks.forEach(t => _selsFor(t).forEach(sel => { const el = _root.querySelector(sel); if (el && !el.hidden && !els.includes(el)) els.push(el); }));
    if (!els.length) return;
    els.forEach(el => el.classList.add('is-next'));
    if (!G.exp) els[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    const guideBox = _root.querySelector('#lab-guide');
    _root.querySelectorAll('[data-act],[data-obj],[data-sort-obj]').forEach(other => {
      if (!els.some(el => other === el || el.contains(other) || other.contains(el))
          && !(guideBox && guideBox.contains(other))) {
        other.classList.add('is-guide-dim');
      }
    });
  }

  // ══ Experiments (lab_experiment.js) ═══════════
  // focus(tokens): show only the controls an experiment's steps use; null shows
  // everything. Applied after every render of the shelf, the board and the tools.
  const _actFor = tok => {
    const [k, , w] = String(tok).split(':');
    return { poles: 'flip-b', distance: 'distance', filings: 'filings', compass: 'compass', drop: 'drop' }[k]
      || (k === 'induced' ? (w ? 'touch-' + w : 'induced') : null);
  };
  function _applyFocus() {
    if (!_root) return;
    const on = !!_focus;
    const has = tok => on && _focus.has(tok);
    const anyShown = el => [...el.querySelectorAll('button')].some(b => !b.hidden);
    // Grade 4: the shelf and the sorting board
    _root.querySelectorAll('[data-obj]').forEach(b => { b.hidden = on && !has('drag:' + b.dataset.obj); });
    const shelf = $('lab-magnets-shelf'); if (shelf) shelf.hidden = on && !anyShown(shelf);
    _root.querySelectorAll('[data-sort-obj]').forEach(b => {
      const [id, grp] = b.dataset.sortObj.split(':');
      b.hidden = on && !(has(`sort:${id}:${grp}`) || has('sort:' + id));
    });
    _root.querySelectorAll('[data-sort-row]').forEach(r => { r.hidden = on && !anyShown(r); });
    const board = $('lab-magnets-sort');
    if (board) board.hidden = on && !anyShown(board) && !Object.keys((_g4 && _g4.sorted) || {}).length;
    // Grade 8: the tool rows
    const acts = on ? new Set([..._focus].map(_actFor).filter(Boolean)) : null;
    _root.querySelectorAll('#lab-magnets-g8-controls [data-act]').forEach(b => { b.hidden = on && !acts.has(b.dataset.act); });
    _root.querySelectorAll('#lab-magnets-g8-controls .lab-magnets-row').forEach(r => { r.hidden = on && !anyShown(r); });
    const tools = $('lab-magnets-g8-controls'); if (tools) tools.hidden = on && !anyShown(tools);
  }

  // One token, done as if tapped. Setup runs this with _quiet on.
  function _do(tok) {
    const [k, v, w] = String(tok).split(':');
    switch (k) {
      case 'drag': _testObj(v); break;
      case 'sort': { const o = P().objById(v); if (o) _sortObj(v, w || (o.magnetic ? 'magnetic' : 'nonmagnetic')); break; }
      case 'poles': if (_g8 && v && v.length === 2) _setPoles(v[0], v[1]); break;
      case 'distance': _setDistance(v); break;
      case 'filings': _setFilings(v === 'on'); break;
      case 'compass': _setCompass(v === 'place'); break;
      case 'induced': if (w) _setTouch(w, v === 'touch'); else _setInduced(v === 'on'); break;
      case 'drop': _drop(); break;
    }
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
      _hush(); _mission = null; _guide = null; _log = []; _panel = 'sandbox';
      if (_is4()) _resetG4();
      if (_is8()) _resetG8();
      _renderControls(); _renderPanel(); _readouts();
      const box = $('lab-guide'); if (box) { box.hidden = true; box.innerHTML = ''; }
      _highlight();
    },
    apply: tok => { _quiet = true; try { _do(tok); } finally { _quiet = false; } },
    guide: def => startGuide(def),
    stop: () => _stopGuide(true),
    evidence: () => _log.slice(-6),
    focus: toks => { _focus = toks ? new Set(toks) : null; _applyFocus(); },
    selector: tok => _selsFor(tok)[0] || null,
    hooks: {},
  };

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
      title: M.title,
      onDone: r => {
        const score = r && typeof r === 'object' ? r.firstTry : Number(r) || 0;
        const st = Labs.store(ID);
        if (!st.missions) st.missions = {};
        st.missions[M.id] = Math.max(st.missions[M.id] || 0, score);
        Labs.persist();
        _mission = null;
        _coach('Mission complete! Explore the bench or try another mission.');
        _renderPanel();
        Labs.missionDone({ icon: M.icon, title: M.title, score, total: M.quiz.length, stars: Math.round(score / M.quiz.length * 3),
                           onAgain: () => startMission(M.id) });
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
      if (G.exp) return '';
      const s = G.steps[_guide && _guide.step];
      if (!s) return '<p class="lab-panel-empty">All steps done!</p>';
      return `<div class="lab-panel-section"><h3>Current step</h3><p>${esc(s.say)}</p></div>`;
    }
    const guides = _mine(P().GUIDES);
    const st = Labs.store(ID);
    const mission = _mission ? `<div class="lab-panel-section">
      <h3>Mission</h3>
      <button type="button" class="lab-btn lab-btn-primary" data-act="quiz">Start questions →</button>
      <button type="button" class="lab-link" data-act="exit-mission">Exit mission</button>
    </div>` : '';
    return mission + `<div class="lab-panel-section">
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
      ? 'Welcome to the Magnets lab! Tap any object to bring it near the horseshoe magnet. See which ones are pulled!'
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
          <p>Magnetic objects stick to the magnet. Non-magnetic ones fall to the bench.</p>
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
      grade: _grade(), panel: _panel, guide: _guide ? { id: _guide.id, step: _guide.step, exp: !!(_guide.def && _guide.def.exp) } : null,
      mission: _mission ? { id: _mission.id } : null,
      g4: _g4 ? { tested: { ..._g4.tested }, sorted: { ..._g4.sorted }, rest: { ..._g4.rest } } : null,
      g8: _g8 ? { poleA: _g8.poleA, poleB: _g8.poleB, distance: _g8.distance, filings: _g8.filings, compassPlaced: _g8.compassPlaced, induced: _g8.induced,
                  inducedNailTouching: _g8.inducedNailTouching, inducedSteelTouching: _g8.inducedSteelTouching,
                  inducedNailMag: _g8.inducedNailMag, inducedSteelMag: _g8.inducedSteelMag, dropped: _g8.dropped } : null,
      events: _events ? [..._events] : [],
      log: _log.slice(),
      focus: _focus ? [..._focus] : null,
      store: Labs.store(ID),
    };
  }

  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => _mine(P().GUIDES),
    start: startGuide,
    snapshot: () => ({ _panel, _guide, _g4, _g8, _events, _log }),
    restore: state => { ({ _panel, _guide, _g4, _g8, _events } = state); _log = state._log || []; },
    refresh: () => { if (_guide) _guideEnter(); },
    stop: () => { _stopGuide(true); }
  };
  return { study, experiment, mount, unmount, startGuide, startMission, act: _do, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMagnets = LabMagnets;
