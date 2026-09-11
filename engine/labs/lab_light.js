'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Light Bench (Physics, NCE Grade 9, P2 Light)
//
//  A ray box (or a laser pointer) on a sheet of paper, with a plane mirror, a
//  rectangular glass block, or three cards with holes. Draw the normal, place
//  the protractor, turn the ray box and read the angles. Sandbox, two Missions
//  and a collection of Discoveries.
//
//  ⚠ Every ray, angle and reading comes from lab_light_data.js
//    (LabLightData). This file scales those results to the canvas and draws
//    them. If a ray looks wrong on screen, fix the DATA, not the drawing.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the rays are drawn at full length at once,
//    nothing travels along them, and effects apply at once.
//  ⚠ Drag is for mouse and pen only (the ray box on the canvas, apparatus from
//    the shelf). On touch a drag would fight the page scroll, so the big
//    buttons are the way that always works - also for keyboard users.
// ══════════════════════════════════════════════
const LabLight = (() => {
  const D = () => LabLightData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { flash: 1.0, burn: 0.9, reading: 0.8 };
  const GROW_SEC = 0.6;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _b = null, _panel = 'sandbox', _mission = null, _guide = null;
  let _log = [], _readings = [], _fx = [], _busy = false, _instant = false;
  let _tipIdx = -1, _drag = null, _turn = null, _suppressClick = false;

  function _newBench(setup) {
    return { setup: setup === undefined ? 'mirror' : setup, source: 'raybox', power: false, heat: 0, wasHot: false, used: false,
             beta: 30, tau: 0, normal: false, prot: false, ref: 'normal', eye: 'above',
             lifted: false, traced: null, aligned: true, looking: false, beamT: 0, shown: null };
  }
  const _i = () => Math.abs(_b.beta + _b.tau);
  const _optical = () => _b.setup === 'mirror' || _b.setup === 'block';
  const _src = () => D().SOURCES[_b.source];
  const _surfName = () => _b.setup === 'block' ? 'block' : 'mirror';

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-light">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Physics · Grade 9</span><h1>Light Bench</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-light-power" class="lab-goggles" data-act="power" aria-pressed="false"><span aria-hidden="true">💡</span><span id="lab-light-power-label">Ray box off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the bench works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-light-zone">
            <canvas id="lab-light-canvas" role="img" aria-label="A ray box on a sheet of paper"></canvas>
            <div class="lab-chip lab-light-chip" id="lab-light-chip"></div>
            <div class="lab-status" id="lab-light-status"></div>
            <div class="lab-contents lab-light-contents" id="lab-light-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-light-controls" class="lab-light-controls"></div>
        </div>
        <div class="lab-side">
          <div class="lab-tabs" role="tablist" aria-label="Bench, missions and discoveries">
            <button type="button" role="tab" data-panel="sandbox">🔦 Bench</button>
            <button type="button" role="tab" data-panel="missions">🎯 Missions</button>
            <button type="button" role="tab" data-panel="found">✨ Discoveries <b id="lab-found-n"></b></button>
          </div>
          <div id="lab-panel" class="lab-panel" role="tabpanel"></div>
        </div>
      </div>
    </div>`;
  }

  function mount(root) {
    _root = root;
    if (!_b) _b = _newBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-light-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _renderControls();
    _syncPower();
    _readouts();
    const st = Labs.store('light');
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or explore freely.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _stop();
    _drag = null; _turn = null;
    _root = null; _cv = null; _cx = null;
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(400, Math.max(260, w * 0.74)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _draw(0);
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      if (_suppressClick) { _suppressClick = false; return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const rot = e.target.closest('[data-rot]');
      if (rot) { rotate(rot.dataset.rot, +rot.dataset.d); return; }
      const rf = e.target.closest('[data-ref]');
      if (rf) { setRef(rf.dataset.ref); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const add = e.target.closest('[data-add]');
      if (add) { _addFrom(add); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { startMission(m.dataset.mission); }
    };
    _root.onpointerdown = e => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      if (e.target === _cv) { _turnStart(e); return; }
      const item = e.target.closest('[data-add]');
      if (!item) return;
      _drag = { item, x: e.clientX, y: e.clientY, id: e.pointerId, ghost: null };
      window.addEventListener('pointermove', _onMove);
      window.addEventListener('pointerup', _onUp, { once: true });
    };
  }

  // ── Drag the ray box round the point of incidence (mouse / pen) ──
  function _turnStart(e) {
    if (!_optical() || _busy) return;
    const g = _geom(), r = _cv.getBoundingClientRect();
    const [bx, by] = _toPx(g, D().trace(_traceArgs()).box);
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (Math.hypot(x - bx, y - by) > Math.max(34, g.U * 0.55)) return;
    _turn = { id: e.pointerId, moved: false };
    e.preventDefault();
    window.addEventListener('pointermove', _turnMove);
    window.addEventListener('pointerup', _turnEnd, { once: true });
  }
  function _turnMove(e) {
    if (!_turn || e.pointerId !== _turn.id || !_cv) return;
    const g = _geom(), r = _cv.getBoundingClientRect();
    const dx = e.clientX - r.left - g.P[0], dy = e.clientY - r.top - g.P[1];
    const L = D().LIMITS;
    let beta = Math.round(Math.atan2(-dx, -dy) * 180 / Math.PI);
    beta = Math.max(L.betaMin, Math.min(L.betaMax, beta));
    beta = Math.max(-L.maxI - _b.tau, Math.min(L.maxI - _b.tau, beta));
    if (beta !== _b.beta) { _b.beta = beta; _b.shown = null; _turn.moved = true; _readouts(); }
  }
  function _turnEnd() {
    window.removeEventListener('pointermove', _turnMove);
    const t = _turn; _turn = null;
    if (t && t.moved) { _suppressClick = true; _afterTurn(false); }
  }

  // ── Drag apparatus from the shelf onto the bench (mouse / pen) ──
  function _overZone(x, y) {
    const z = $('lab-light-zone');
    if (!z) return false;
    const r = z.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }
  function _onMove(e) {
    if (!_drag || e.pointerId !== _drag.id) return;
    if (!_drag.ghost) {
      if (Math.hypot(e.clientX - _drag.x, e.clientY - _drag.y) < 8) return;
      const g = document.createElement('div');
      g.className = 'lab-ghost';
      g.textContent = (_drag.item.querySelector('.lab-light-ico')?.textContent || '') + ' ' + (_drag.item.querySelector('b')?.textContent || '');
      _root.appendChild(g);
      _drag.ghost = g;
    }
    _drag.ghost.style.left = e.clientX + 'px';
    _drag.ghost.style.top = e.clientY + 'px';
    $('lab-light-zone')?.classList.toggle('is-over', _overZone(e.clientX, e.clientY));
  }
  function _onUp(e) {
    window.removeEventListener('pointermove', _onMove);
    const d = _drag; _drag = null;
    if (!d || !d.ghost) return;
    d.ghost.remove();
    $('lab-light-zone')?.classList.remove('is-over');
    _suppressClick = true;
    if (_overZone(e.clientX, e.clientY)) _addFrom(d.item);
  }

  function _addFrom(el) {
    if (el.dataset.add === 'setup') place(el.dataset.id);
    else setSource(el.dataset.id);
    _showStage();
  }
  // On a phone the shelf sits below the bench: bring the bench back into view.
  function _showStage() {
    const z = $('lab-light-zone');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'power': power(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'normal': toggleNormal(); break;
      case 'protractor': toggleProtractor(); break;
      case 'eye': toggleEye(); break;
      case 'read': read(); break;
      case 'look': look(); break;
      case 'card': moveCard(); break;
      case 'lift': lift(); break;
      case 'pack': pack(); break;
      case 'quiz': _quiz(); break;
      case 'clear-table': _readings = []; _refresh(); _coach('Results table cleared. Take some fresh readings.'); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. The bench is all yours.'); _renderPanel(); break;
      case 'guide-stop': _stopGuide(false); break;
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
    const f = D().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  function _guard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    return true;
  }

  // ══ Actions ══════════════════════════════════
  function place(id) {
    const S = D().SETUPS[id];
    if (!S || !_guard()) return;
    if (_mission && _mission.setup !== id) { _coach(`This mission uses the ${D().SETUPS[_mission.setup].name.toLowerCase()}. Leave the mission to try something else.`); return; }
    Object.assign(_b, { setup: id, beta: 30, tau: 0, normal: false, prot: false, lifted: false, traced: null, aligned: true, looking: false, shown: null, beamT: 0 });
    _coach(id === 'mirror' ? 'A plane mirror on a sheet of paper. Switch on the ray box and turn it with the ↺ ↻ buttons.'
      : id === 'block' ? 'A rectangular glass block. Shine the ray at its long side and watch what happens inside the glass.'
      : 'Three cards with a hole in each, and the lamp behind them. Are the holes in a straight line? Look through them.');
    _afterChange();
    _guideEvent('setup:' + id);
  }

  function setSource(id) {
    const S = D().SOURCES[id];
    if (!S || !_guard()) return;
    if (_b.source === id) { _coach(`The ${S.name.toLowerCase()} is already on the bench.`); return; }
    _b.source = id; _b.beamT = 0; _b.looking = false;
    _coach(S.laser ? 'Laser pointer on the bench. It makes a thin, very bright beam - look at the spot it makes, NEVER into the beam.'
                   : 'The ray box is back: a lamp behind a narrow slit, giving a single ray of light.');
    _syncPower();
    _afterChange();
    _guideEvent('source:' + id);
  }

  function power(on) {
    if (!_guard()) return;
    const want = on === undefined ? !_b.power : !!on;
    if (want === _b.power) return;
    _b.power = want; _b.beamT = 0; _b.looking = false;
    if (want) { _b.used = true; }
    const S = _src();
    if (want) _coach(_b.setup === 'cards' ? `${S.short} on. Now look through the holes - can you see it?`
      : _b.setup ? `${S.short} on. Follow the ray: where does it go after it meets the ${_surfName()}?`
      : `${S.short} on - but there is nothing on the bench for the ray to hit. Pick apparatus from the shelf.`);
    else _coach(S.hot && _b.heat > D().HEAT.hot ? 'Switched off. The lamp housing stays hot for a while - leave it to cool before you touch it.' : 'Switched off.');
    _syncPower();
    _afterChange();
    _guideEvent(want ? 'power:on' : 'power:off');
  }
  function _syncPower() {
    const b = $('lab-light-power');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_b.power));
    b.classList.toggle('is-on', _b.power);
    const l = $('lab-light-power-label');
    if (l) l.textContent = `${_src().short} ${_b.power ? 'on' : 'off'}`;
  }

  function toggleNormal() {
    if (!_guard()) return;
    if (!_optical()) { _coach('The normal belongs to a surface: put the mirror or the glass block on the bench first.'); return; }
    _b.normal = !_b.normal;
    if (_b.normal) {
      _discover('normal');
      _coach(_b.setup === 'block' ? 'Normals drawn - dashed, at 90° to the glass, where the ray goes in and where it comes out.'
                                  : 'Normal drawn: a dashed line at 90° to the mirror, through the point where the ray hits it.');
    } else _coach('Normal rubbed out.');
    _afterChange();
    if (_b.normal) _guideEvent('normal');
  }

  function toggleProtractor() {
    if (!_guard()) return;
    if (!_optical()) { _coach('The protractor measures angles at the mirror or the glass block.'); return; }
    if (_b.prot) { _b.prot = false; _b.shown = null; _coach('Protractor put away.'); _afterChange(); return; }
    placeProtractor(_b.ref);
  }
  function placeProtractor(ref) {
    if (!_optical()) return;
    _b.prot = true; _b.ref = ref === 'surface' ? 'surface' : 'normal'; _b.shown = null;
    _coach(_b.ref === 'normal'
      ? 'Protractor in place, its centre on the point where the ray hits. It counts from the normal: 0° along the normal.'
      : `Protractor in place - but counting from the ${_surfName() === 'block' ? 'glass surface' : 'mirror'}. Is that where angles in a ray diagram are measured from?`);
    _afterChange();
    _guideEvent('protractor:' + _b.ref);
  }
  function setRef(ref) {
    if (!_guard()) return;
    if (!_b.prot) { placeProtractor(ref); return; }
    if (_b.ref === ref) return;
    placeProtractor(ref);
  }

  function toggleEye() {
    if (!_guard()) return;
    _b.eye = _b.eye === 'above' ? 'side' : 'above';
    _b.shown = null;
    _coach(_b.eye === 'above' ? 'Eye directly above the scale, looking straight down. That is how to read it.'
                              : 'Now you are looking at the protractor from one side…');
    _afterChange();
    _guideEvent('eye:' + _b.eye);
  }

  // kind 'box' turns the ray box, 'tilt' turns the mirror or block. d = ±1.
  function rotate(kind, d) {
    if (!_guard() || !_optical()) return;
    const L = D().LIMITS;
    if (kind === 'box') {
      const nb = _b.beta + d * L.step;
      if (nb < L.betaMin || nb > L.betaMax || Math.abs(nb + _b.tau) > L.maxI) { _coach(nb < L.betaMin ? 'The ray box is already straight in front - turn the other way.' : 'That’s as far as it goes: any further and the ray only grazes the surface.'); return; }
      _b.beta = nb;
    } else {
      const nt = _b.tau + d * L.tiltStep;
      if (nt < L.tauMin || nt > L.tauMax || Math.abs(_b.beta + nt) > L.maxI) { _coach(`The ${_surfName()} won’t turn any further that way.`); return; }
      _b.tau = nt;
    }
    _afterTurn(kind === 'tilt');
  }
  function setAngle(n) {
    if (!_optical()) return;
    const L = D().LIMITS;
    _b.beta = Math.max(L.betaMin, Math.min(L.betaMax, n - _b.tau));
    _afterTurn(false);
  }
  function setTilt(n) {
    if (!_optical()) return;
    const L = D().LIMITS;
    _b.tau = Math.max(L.tauMin, Math.min(L.tauMax, n));
    if (Math.abs(_b.beta + _b.tau) > L.maxI) _b.beta = Math.sign(_b.beta + _b.tau) * L.maxI - _b.tau;
    _afterTurn(true);
  }
  function _afterTurn(tilted) {
    _b.shown = null;
    if (_b.power && !tilted && !_mission && !_guide) _coach(`Ray box turned. Measure the angle of incidence with the protractor to find out what it is now.`);
    if (tilted) _coach(_b.tau ? `The ${_surfName()} is turned ${Math.abs(_b.tau)}° ${_b.tau > 0 ? 'clockwise' : 'anticlockwise'}. The normal turned with it.` : `The ${_surfName()} is straight again.`);
    _afterChange();
    _guideEvent('angle:' + _i());
    if (tilted) _guideEvent('tilt:' + _b.tau);
  }

  function read() {
    if (!_guard()) return;
    if (!_optical()) { _coach('Readings are taken at the mirror or the glass block.'); return; }
    if (!_b.power) { _coach('Switch on the ray box first - no ray, nothing to measure.'); return; }
    if (_b.lifted) { _coach('Put the block back on its outline first (tap “Put block back”).'); return; }
    if (!_b.prot) { _coach('Place the protractor first: centre on the point where the ray hits the surface.'); return; }
    if (_b.ref === 'normal' && !_b.normal) { _coach('Draw the normal first - you count the angles from it.'); return; }
    const r = D().reading({ setup: _b.setup, beta: _b.beta, tau: _b.tau, ref: _b.ref, eye: _b.eye });
    _b.shown = r;
    _readings.push(r);
    if (_mission) { _mission.readings.push(r); if (!r.ok) _mission.mistakes++; }
    const what = _b.setup === 'mirror' ? 'reflection' : 'refraction';
    if (!r.ok) {
      _logEntry({ title: `Reading at the ${_surfName()} - check it`, bad: true,
        obs: `You read i = ${r.i}° and r = ${r.r}°. Something went wrong with how it was measured.` });
      _busy = true;
      const kind = r.faults[0];
      _fxAdd('reading', () => {
        _busy = false;
        const R = D().RESULTS[kind], ctx = r;
        Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead, exam: R.exam,
          button: 'Got it - measure again',
          onClose: () => _coach(kind === 'surface' ? 'Tap “From the normal” under the bench, then read again.' : 'Tap 👁️ to put your eye back above the scale, then read again.') });
      });
      _afterChange();
      _guideEvent('read-bad');
      return;
    }
    if (_b.setup === 'mirror') {
      _logEntry({ title: 'Reading at the plane mirror', formula: `i = ${r.i}°   r = ${r.r}°`,
        obs: r.i === 0 ? 'Along the normal: the ray went straight back.' : `Angle of incidence ${r.i}°, angle of ${what} ${r.r}°. They are equal.` });
      _discover('law_reflection');
      if (new Set(_readings.filter(x => x.ok && x.setup === 'mirror').map(x => x.i)).size >= 3) _discover('three_angles');
      _coach(r.i === 0 ? 'i = 0° and r = 0°: along the normal the ray comes straight back.' : `i = ${r.i}°, r = ${r.r}°. Equal! Try another angle - does it still work?`);
    } else {
      _logEntry({ title: 'Reading at the glass block', formula: `i = ${r.i}°   r = ${r.r}°`,
        obs: r.i === 0 ? 'Along the normal: the ray went straight into the glass without bending.'
          : `Angle of incidence ${r.i}° in the air, angle of refraction ${r.r}° in the glass: it bent towards the normal. It left the far side at ${r.e}° - the same angle it went in.` });
      if (r.i > 0) _discover('refract_in');
      if (new Set(_readings.filter(x => x.ok && x.setup === 'block' && x.i > 0).map(x => x.i)).size >= 3) _discover('refract_angles');
      _coach(r.i === 0 ? 'i = 0°, r = 0°: no bending along the normal.' : `i = ${r.i}°, r = ${r.r}°. Smaller inside the glass - it bent towards the normal.`);
    }
    _missionCheck();
    _afterChange();
    _guideEvent('read');
  }

  function look() {
    if (!_guard()) return;
    if (_b.setup !== 'cards') { _coach('Looking through the holes is for the three-card experiment. Pick it from the shelf.'); return; }
    _b.looking = true;
    const S = _src();
    if (_b.power && S.laser && _b.aligned) { _afterChange(); _hazard('laser_eye', {}); return; }
    if (!_b.power) {
      _discover('luminous');
      _logEntry({ title: 'Looking with the lamp off', obs: 'Nothing to see at all. The cards and the holes are non-luminous: with no luminous source, no light reaches your eye.' });
      _coach('Darkness. The lamp is the only luminous thing here - with it off, you can’t see even the cards.');
    } else if (_b.aligned) {
      _discover('straight_line');
      _logEntry({ title: 'Holes in a straight line', obs: 'You can see the lamp through all three holes: light travels in a straight line from the lamp to your eye.' });
      _coach('You can see the lamp! All three holes are on one straight line. Now try moving the middle card.');
    } else {
      _discover('blocked');
      _logEntry({ title: 'One card out of line', obs: 'The lamp has disappeared. Light stops on the middle card - it cannot bend round it to reach your eye.' });
      _coach(S.laser ? 'The laser spot is on the middle card, so nothing reaches your eye. (Still: never look along a laser.)' : 'The lamp has gone! Light can’t bend round the card - it travels in straight lines.');
    }
    _afterChange();
    _guideEvent('look');
  }

  function moveCard() {
    if (!_guard() || _b.setup !== 'cards') return;
    _b.aligned = !_b.aligned; _b.looking = false; _b.beamT = _b.power ? 0 : _b.beamT;
    _coach(_b.aligned ? 'The middle card is back in line with the other two.' : 'The middle card is now to one side - its hole is out of line.');
    _afterChange();
    _guideEvent(_b.aligned ? 'cards:align' : 'cards:move');
  }

  function lift() {
    if (!_guard() || _b.setup !== 'block') return;
    if (_b.lifted) { _b.lifted = false; _b.traced = null; _b.beamT = 0; _coach('Block back on its outline.'); _afterChange(); return; }
    if (!_b.power) { _coach('Switch on the ray box first, so there is a ray to trace.'); return; }
    const t = D().trace({ setup: 'block', beta: _b.beta, tau: _b.tau, lifted: false });
    _b.traced = t; _b.lifted = true; _b.shown = null; _b.beamT = 0;
    if (_mission) _mission.lifted = true;
    if (t.i > 0) {
      const mm = t.shift * D().BLOCK.thicknessMm;
      _discover('parallel_out');
      _logEntry({ title: 'Traced and lifted the block', formula: 'emergent ray ∥ incident ray',
        obs: `Your pencil trace: the ray came out of the block parallel to the ray that went in, shifted sideways by about ${Math.round(mm)} mm.` });
      _coach('Look at the trace: the ray that came out is parallel to the one that went in - just shifted sideways.');
    } else {
      _logEntry({ title: 'Traced and lifted the block', obs: 'At 0° the trace is one straight line: no bend going in, no bend coming out, no shift.' });
      _coach('At 0° the whole trace is one straight line. Try it at an angle to see the sideways shift.');
    }
    _missionCheck();
    _afterChange();
    _guideEvent('lift');
  }

  function pack() {
    if (!_guard()) return;
    if (_b.power) { _coach('Switch the ray box off first.'); return; }
    if (_b.heat > D().HEAT.hot) { _hazard('hot_lamp', {}); return; }
    if (_b.used) _discover('safe_pack');
    const keep = { heat: _b.heat, source: _b.source };
    _b = _newBench(null);
    Object.assign(_b, keep);
    _coach('Packed away safely, held by the base. Pick apparatus from the shelf to start again.');
    _afterChange();
    _guideEvent('pack');
  }

  // Everything a pupil does ends here: state discoveries, repaint.
  function _afterChange() {
    _checkState();
    _renderControls();
    _readouts();
    _refresh();
  }
  function _checkState() {
    const b = _b;
    if (!b.power) return;
    if (_optical()) _discover('beam');
    if (b.setup === 'mirror' && _i() === 0) _discover('along_normal');
    if (b.setup === 'mirror' && b.tau !== 0) _discover('turn_mirror');
    if (b.setup === 'block' && !b.lifted && _i() === 0) _discover('block_straight');
    if (b.setup === 'cards' && _src().laser && b.aligned) _discover('laser_spot');
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id, ctx) {
    const H = D().HAZARDS[id];
    const st = Labs.store('light');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _busy = true;
    _fxAdd(H.fx, () => {
      _busy = false;
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: 'Got it - try again safely',
        onClose: () => {
          _b.looking = false;
          if (id === 'laser_eye') _coach('Switch the laser off, or swap it for the ray box, before you look through the holes. With a laser, look at the spot on the screen.');
          else _coach('Let the ray box cool - watch the 🌡️ chip - then pack it away by its base.');
          _readouts();
        } });
    });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    const H = D().HEAT, b = _b;
    if (b.power && _src().hot) b.heat = Math.min(1, b.heat + dt / H.riseSec);
    else b.heat = Math.max(0, b.heat - dt / H.fallSec);
    const hot = b.heat > H.hot;
    if (b.wasHot && !hot) { b.wasHot = false; _guideEvent('cool'); }
    if (hot) b.wasHot = true;
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = D().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _reset(M.setup);
    _mission = { id, setup: M.setup, readings: [], hazards: 0, mistakes: 0, lifted: false, success: false };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
    _renderControls();
    _readouts();
  }

  function _missionProgress() {
    const ms = _mission;
    const ok = ms.readings.filter(r => r.ok && r.setup === ms.setup);
    const angles = new Set(ok.map(r => r.i));
    if (ms.id === 'law') return { n: angles.size, need: 3, done: angles.size >= 3 };
    const zero = angles.has(0), others = [...angles].filter(a => a > 0).length;
    return { zero, others, lifted: ms.lifted, done: zero && others >= 2 && ms.lifted };
  }
  function _missionCheck() {
    const ms = _mission;
    if (!ms || ms.success) return;
    if (_missionProgress().done) {
      ms.success = true;
      _coach('🎯 All the readings are in your notebook! Tap “Answer the questions” to finish the mission.');
    }
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = D().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.mistakes) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('light');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} - no hazards next time for an extra star.` : 'No safety mistakes. 🔦');
      lines.push(ms.mistakes ? `${ms.mistakes} reading${ms.mistakes === 1 ? '' : 's'} taken the wrong way - measure from the normal, eye straight above.` : 'Every reading measured from the normal, eye in line. 📐');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or go and hunt for discoveries.'); } });
    } });
  }

  function _reset(setup) {
    const keep = _b ? { heat: _b.heat, wasHot: _b.wasHot } : {};
    _b = _newBench(setup || 'mirror');
    Object.assign(_b, keep);
    _fx = [];
    _syncPower();
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box, and
  // makes the same control glow so the pupil learns where it is. Nothing is
  // locked: they can wander off and the guide waits. A guide is one of
  // LabLightData.GUIDES (by id), or one built from a discovery's recipe.
  const _gdef = () => _guide && (_guide.def || D().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || D().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _reset();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _renderControls();
    _readouts();
    _guideEnter();
    const z = $('lab-light-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step already true on the bench is skipped (the mirror is already there,
  // the lamp is already off…). Actions - read, look, lift, pack - never are.
  function _satisfied(on) {
    const [k, v] = on.split(':');
    switch (k) {
      case 'setup': return _b.setup === v;
      case 'source': return _b.source === v;
      case 'power': return v === 'on' ? _b.power : !_b.power;
      case 'normal': return _b.normal;
      case 'protractor': return _b.prot && _b.ref === v;
      case 'eye': return _b.eye === v;
      case 'angle': return _optical() && _i() === +v;
      case 'tilt': return _b.tau === +v;
      case 'cards': return v === 'move' ? !_b.aligned : _b.aligned;
      case 'cool': return _b.heat <= D().HEAT.hot;
      default: return false;
    }
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    let s = G.steps[_guide.step];
    while (s && _satisfied(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${s.btn ? `<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>`
                : '<p class="lab-guide-wait">⏳ Keep watching the bench…</p>'}
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
    else _highlight();
  }

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    switch (k) {
      case 'setup': place(v); break;
      case 'source': setSource(v); break;
      case 'power': power(v === 'on'); break;
      case 'normal': if (!_b.normal) toggleNormal(); break;
      case 'protractor': if (_b.prot) setRef(v); else placeProtractor(v); break;
      case 'eye': if (_b.eye !== v) toggleEye(); break;
      case 'angle': setAngle(+v); break;
      case 'tilt': setTilt(+v); break;
      case 'read': read(); break;
      case 'look': look(); break;
      case 'cards': if ((v === 'move') === _b.aligned) moveCard(); break;
      case 'lift': if (_b.lifted) lift(); lift(); break;
      case 'pack': pack(); break;
    }
  }

  // ── Discoveries: every card opens ─────────────
  function _autoStep(on) {
    const [k, v] = on.split(':');
    const S = D().SETUPS, SO = D().SOURCES;
    switch (k) {
      case 'setup': return { on, say: `Put the ${S[v].name.toLowerCase()} on the bench.`, btn: `${S[v].icon} Place the ${S[v].name.toLowerCase()}` };
      case 'source': return { on, say: v === 'laser' ? 'Swap the ray box for the laser pointer.' : 'Use the ray box as the light source.', btn: `${SO[v].icon} Use the ${SO[v].name.toLowerCase()}` };
      case 'power': return v === 'on' ? { on, say: 'Switch the light on.', btn: '💡 Switch on' } : { on, say: 'Switch the light off.', btn: '⏻ Switch off' };
      case 'normal': return { on, say: 'Draw the normal: a dashed line at 90° to the surface where the ray hits it.', btn: '📏 Draw the normal' };
      case 'protractor': return v === 'normal'
        ? { on, say: 'Place the protractor on the point where the ray hits, counting from the normal.', btn: '📐 Place the protractor' }
        : { on, say: 'Place the protractor counting from the surface.', btn: '📐 Count from the surface' };
      case 'eye': return v === 'side' ? { on, say: 'Look at the protractor from one side.', btn: '👁️ Look from the side' } : { on, say: 'Put your eye straight above the scale.', btn: '👁️ Eye above the scale' };
      case 'angle': return { on, say: `Turn the ray box until the angle of incidence is ${v}°.`, btn: `↻ Turn the ray box to ${v}°` };
      case 'tilt': return { on, say: `Turn the mirror ${Math.abs(+v)}° ${+v > 0 ? 'clockwise' : 'anticlockwise'} and watch the reflected ray.`, btn: `↻ Turn the mirror ${Math.abs(+v)}°` };
      case 'read': return { on, say: 'Read both angles on the protractor.', btn: '📝 Read the angles' };
      case 'look': return { on, say: 'Look through the holes.', btn: '👁️ Look through the holes' };
      case 'cards': return v === 'move' ? { on, say: 'Slide the middle card a little to one side.', btn: '↔ Move the middle card' } : { on, say: 'Line the middle card up again.', btn: '↔ Line it up' };
      case 'lift': return { on, say: 'Mark the rays with a pencil, then lift the block off the paper.', btn: '🧊 Trace & lift the block' };
      case 'cool': return { on, say: 'Wait for the lamp housing to cool…' };
      default: return { on, say: 'Pack the ray box away, holding it by its base.', btn: '📦 Pack away' };
    }
  }

  function discoveryGuide(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('light').disc[id];
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
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Show me how →</button>
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
        ${d.formula ? `<section class="lab-hz-sec"><h3>The rule</h3><p class="lab-eq">${esc(d.formula)}</p></section>` : ''}
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
        ${d.exam ? `<section class="lab-hz-sec"><h3>📝 On the NCE paper</h3><p>${esc(d.exam)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store('light');
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : D().GUIDES.find(g => !st.guides[g.id]);
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
    _coach(`Experiment complete: ${G.title}. Pick the next one below, try a mission, or explore freely.`);
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

  // The yellow glow on whatever the current guide step wants tapped.
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    let sel = null;
    switch (k) {
      case 'setup': sel = `[data-add="setup"][data-id="${v}"]`; break;
      case 'source': sel = `[data-add="source"][data-id="${v}"]`; break;
      case 'power': sel = '#lab-light-power'; break;
      case 'normal': sel = '[data-act="normal"]'; break;
      case 'protractor': sel = _b.prot ? `[data-ref="${v}"]` : '[data-act="protractor"]'; break;
      case 'eye': sel = '[data-act="eye"]'; break;
      case 'angle': sel = `[data-rot="box"][data-d="${+v > _i() ? 1 : -1}"]`; break;
      case 'tilt': sel = `[data-rot="tilt"][data-d="${+v > _b.tau ? 1 : -1}"]`; break;
      case 'read': sel = '[data-act="read"]'; break;
      case 'look': sel = '[data-act="look"]'; break;
      case 'cards': sel = '[data-act="card"]'; break;
      case 'lift': sel = '[data-act="lift"]'; break;
      case 'pack': sel = '[data-act="pack"]'; break;
    }
    const el = sel && _root.querySelector(sel);
    if (el) el.classList.add('is-next');
  }

  function _startHTML() {
    const st = Labs.store('light');
    const guide = G => {
      const done = !!st.guides[G.id];
      return `<div class="lab-start-card${done ? ' is-done' : ''}">
        <span class="lab-start-icon" aria-hidden="true">${G.icon}</span>
        <span class="lab-start-text"><b>${esc(G.title)}${done ? ' <em>✓ done</em>' : ''}</b><small>${esc(G.blurb)}</small></span>
        <button type="button" class="lab-btn lab-btn-sm${done ? '' : ' lab-btn-primary'}" data-guide="${G.id}">${done ? 'Again' : 'Start'}</button></div>`;
    };
    const mission = M => {
      const best = (st.missions[M.id] && st.missions[M.id].stars) || 0;
      return `<div class="lab-start-card">
        <span class="lab-start-icon" aria-hidden="true">${M.icon}</span>
        <span class="lab-start-text"><b>${esc(M.title)}</b><small>${esc(M.blurb)}</small>${Labs.stars(best)}</span>
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Choose</b> a guided experiment (the best place to start) or a mission.</li>
        <li><b>Follow the yellow box</b> under the bench. The thing to tap next glows yellow.</li>
        <li><b>Watch the ray</b>, then read your measurements in the lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${D().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${D().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or experiment freely: pick apparatus from the shelf below.</p>
    </section>`;
  }

  // ══ Panels ═══════════════════════════════════
  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
    _foundCount();
    _highlight();
  }

  // Repaint what changes while experimenting, without rebuilding the shelf
  // under a finger that is about to tap it.
  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    const sh = $('lab-light-shelf');
    if (sh) sh.outerHTML = _shelfHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is
  // saved (the Mixing Bench once showed a count one behind).
  function _discover(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover('light', id, { title: d && d.title, total: D().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store('light').disc).length}/${D().DISCOVERIES.length}`;
  }

  function _shelfHTML() {
    const S = D().SETUPS, SO = D().SOURCES;
    const item = (kind, id, x, on, sign) => `<button type="button" class="lab-item${on ? ' lab-light-on' : ''}" data-add="${kind}" data-id="${id}" aria-pressed="${on}">
        <span class="lab-light-ico" aria-hidden="true">${x.icon}</span>
        <span class="lab-item-text"><b>${esc(x.name)}</b><small>${esc(x.meta)}</small></span>
        ${sign ? `<span class="lab-item-sign" title="${esc(Labs.SIGN_LABELS[sign])}">${Labs.sign(sign, true)}</span>` : ''}</button>`;
    return `<section class="lab-shelf" id="lab-light-shelf" aria-label="Shelf">
      <div class="lab-shelf-head"><h2 class="lab-light-shelf-h">Apparatus</h2><p class="lab-hint">Tap to put it on the bench - or drag it there.</p></div>
      <div class="lab-items">${Object.keys(S).map(id => item('setup', id, S[id], _b.setup === id)).join('')}</div>
      <div class="lab-shelf-head lab-light-shelf-2"><h2 class="lab-light-shelf-h">Light source</h2></div>
      <div class="lab-items">${Object.keys(SO).map(id => item('source', id, SO[id], _b.source === id, SO[id].laser ? 'eye' : 'hot')).join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const rows = setup => _readings.filter(r => r.setup === setup);
    const mark = r => r.ok ? '' : `<span class="lab-light-bad">✗ ${r.faults[0] === 'surface' ? `measured from the ${r.setup === 'mirror' ? 'mirror' : 'surface'}` : 'parallax'}</span>`;
    const mirror = rows('mirror'), block = rows('block');
    const tbl = [];
    if (mirror.length) tbl.push(`<div class="lab-table-wrap"><table class="lab-table">
      <caption>Reflection at a plane mirror</caption>
      <thead><tr><th scope="col">Angle of incidence i</th><th scope="col">Angle of reflection r</th><th scope="col">Result</th></tr></thead>
      <tbody>${mirror.map(r => `<tr class="${r.ok ? '' : 'lab-light-bad-row'}"><td>${r.i}°</td><td>${r.r}°</td><td>${r.ok ? (r.i === r.r ? '✓ i = r' : '') : mark(r)}</td></tr>`).join('')}</tbody></table></div>`);
    if (block.length) tbl.push(`<div class="lab-table-wrap"><table class="lab-table">
      <caption>Refraction in a glass block</caption>
      <thead><tr><th scope="col">i (in air)</th><th scope="col">r (in glass)</th><th scope="col">What it did</th></tr></thead>
      <tbody>${block.map(r => `<tr class="${r.ok ? '' : 'lab-light-bad-row'}"><td>${r.i}°</td><td>${r.r}°</td><td>${r.ok ? (r.i === 0 ? 'no bend (along the normal)' : 'bent towards the normal') : mark(r)}</td></tr>`).join('')}</tbody></table></div>`);
    if (tbl.length) tbl.push('<p class="lab-fair">📐 Angles measured from the normal, eye straight above the scale. <button type="button" class="lab-link" data-act="clear-table">Clear table</button></p>');
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 14).map(e => `<li class="${e.note ? 'is-note' : ''}${e.bad ? ' lab-light-log-bad' : ''}">
          <b>${esc(e.title)}</b><p>${esc(e.obs)}</p>
          ${e.formula ? `<p class="lab-eq">${esc(e.formula)}</p>` : ''}</li>`).join('')}</ol>`
      : '<p class="lab-empty">Your readings and observations appear here as you experiment.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${tbl.join('')}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('light');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Take the readings, answer the exam-style questions, earn up to three stars.</p>
      ${D().MISSIONS.map(M => {
        const best = st.missions[M.id]?.stars || 0;
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
    const M = D().MISSIONS.find(x => x.id === ms.id);
    const p = _missionProgress();
    const li = (done, text) => `<li class="${done ? 'is-done' : ''}">${esc(text)}</li>`;
    const body = ms.id === 'law'
      ? `<ul class="lab-steps">
          ${li(_b.power, '💡 Ray box on')}${li(_b.normal, '📏 Normal drawn')}${li(_b.prot && _b.ref === 'normal', '📐 Protractor counting from the normal')}
          ${li(p.n >= 3, `Measure i and r at three different angles (${Math.min(3, p.n)} of 3)`)}${li(false, 'Answer the questions')}</ul>`
      : `<ul class="lab-steps">
          ${li(p.zero, 'Reading at 0° - along the normal')}${li(p.others >= 2, `Readings at two other angles (${Math.min(2, p.others)} of 2)`)}
          ${li(p.lifted, 'Trace the ray and lift the block')}${li(false, 'Answer the questions')}</ul>`;
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      ${body}
      <p class="lab-progress-text">Use the ↺ ↻ buttons under the bench to change the angle. Every reading goes in the notebook below.</p>
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('light');
    const all = D().DISCOVERIES;
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  // ── Controls under the bench: turn the ray box, turn the mirror, tools ──
  function _renderControls() {
    const c = $('lab-light-controls');
    if (!c) return;
    const b = _b, tool = (act, icon, label, pressed) =>
      `<button type="button" class="lab-tool" data-act="${act}"${pressed === undefined ? '' : ` aria-pressed="${pressed}"`}><span aria-hidden="true">${icon}</span>${esc(label)}</button>`;
    let html = '';
    if (_optical()) {
      const sn = b.setup === 'block' ? 'block' : 'mirror';
      html += `<div class="lab-light-turn" role="group" aria-label="Turn the apparatus">
        <button type="button" class="lab-btn lab-light-rot" data-rot="box" data-d="-1" aria-label="Turn the ray box anticlockwise"><span aria-hidden="true">↺</span> Ray box</button>
        <button type="button" class="lab-btn lab-light-rot" data-rot="box" data-d="1" aria-label="Turn the ray box clockwise"><span aria-hidden="true">↻</span> Ray box</button>
        <button type="button" class="lab-btn lab-light-rot" data-rot="tilt" data-d="-1" aria-label="Turn the ${sn} anticlockwise"><span aria-hidden="true">↺</span> ${sn === 'block' ? 'Block' : 'Mirror'}</button>
        <button type="button" class="lab-btn lab-light-rot" data-rot="tilt" data-d="1" aria-label="Turn the ${sn} clockwise"><span aria-hidden="true">↻</span> ${sn === 'block' ? 'Block' : 'Mirror'}</button>
      </div>`;
      if (b.prot) html += `<div class="lab-light-refrow"><span>Protractor counts from:</span>
        <div class="lab-seg" role="group" aria-label="Protractor counts from">
          <button type="button" data-ref="normal" aria-pressed="${b.ref === 'normal'}">The normal</button>
          <button type="button" data-ref="surface" aria-pressed="${b.ref === 'surface'}">The ${sn === 'block' ? 'surface' : 'mirror'}</button>
        </div></div>`;
      html += `<div class="lab-light-tools">
        ${tool('normal', '📏', b.normal ? 'Rub out normal' : 'Draw the normal', b.normal)}
        ${tool('protractor', '📐', b.prot ? 'Remove protractor' : 'Protractor', b.prot)}
        ${tool('eye', '👁️', b.eye === 'above' ? 'Eye: above' : 'Eye: to the side', b.eye === 'side')}
        ${tool('read', '📝', 'Read the angles')}
        ${b.setup === 'block' ? tool('lift', '🧊', b.lifted ? 'Put block back' : 'Trace & lift block', b.lifted) : ''}
        ${tool('pack', '📦', 'Pack away')}
      </div>
      <p class="lab-hint lab-light-drag">With a mouse or pen you can also drag the ray box round on the picture.</p>`;
    } else if (b.setup === 'cards') {
      html += `<div class="lab-light-tools">
        ${tool('card', '↔', b.aligned ? 'Move the middle card' : 'Line the card up', !b.aligned)}
        ${tool('look', '👁️', 'Look through the holes')}
        ${tool('pack', '📦', 'Pack away')}
      </div>`;
    } else {
      html += '<p class="lab-callout">The bench is empty. Pick a mirror, a glass block or the three cards from the shelf.</p>';
    }
    c.innerHTML = html;
    _highlight();
  }

  function _intro() {
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🔦</p>
        <h2 id="lab-ov-title">Welcome to the Light Bench</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first experiment, one tap at a time.</li>
          <li><b>Experiment.</b> Put a mirror, a glass block or three cards on the bench, switch on the ray box and turn it with the ↺ ↻ buttons.</li>
          <li><b>Measure like the exam.</b> Draw the normal, place the protractor and read the angles - they go into your lab notebook.</li>
          <li><b>Get it wrong safely.</b> Measure from the wrong line, read the scale from the side, or look into a laser - and see what would have happened. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${D().DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="reflect" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('light'); st.intro = true; Labs.persist();
        _coach('Tap 💡 at the top to switch on the ray box - then follow the ray.');
      } });
  }

  function _help() {
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Light Bench works</h2>
      <div class="lab-help">
        <section><h3>Using the bench</h3><ul>
          <li>Tap apparatus on the shelf to put it on the bench, or drag it there with a mouse.</li>
          <li>💡 at the top switches the ray box (or laser) on and off.</li>
          <li>↺ ↻ turn the ray box or the mirror / block by 5° a tap.</li>
          <li>Draw the normal, place the protractor, then “Read the angles”.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Never look into a laser beam, or straight into the ray-box lamp.</li>
          <li>Never point a laser at anyone’s face.</li>
          <li>The ray-box lamp gets hot: turn it by the base, and let it cool before packing it away.</li>
          <li>Work in a dim room, but keep the floor clear of bags and cables.</li></ul></section>
        <section><h3>The laws of reflection</h3><ul>
          <li>The angle of incidence equals the angle of reflection (i = r).</li>
          <li>The incident ray, the reflected ray and the normal lie in the same plane.</li>
          <li>Angles are measured from the NORMAL, never from the mirror.</li></ul></section>
        <section><h3>Refraction in a glass block</h3><ul>
          <li>Air → glass: bends towards the normal (r is smaller than i).</li>
          <li>Glass → air: bends away from the normal.</li>
          <li>Along the normal (i = 0°): no bending at all.</li>
          <li>The ray leaves a rectangular block parallel to the ray that went in.</li></ul>
          <p class="lab-hint">The bench uses the refractive index of glass, 1.5, to get every angle right - that number is beyond the NCE syllabus.</p></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_b) return;
    const b = _b, S = _src();
    const chip = $('lab-light-chip');
    if (chip) chip.innerHTML = `${S.icon} ${esc(S.short)} ${b.power ? 'on' : 'off'} <small>${b.setup ? esc(D().SETUPS[b.setup].name) : 'nothing on the bench'}</small>`;
    const st = $('lab-light-status');
    if (st) {
      const chips = [];
      if (b.heat > D().HEAT.hot) chips.push('<span class="lab-chip is-warm">🌡️ Lamp housing hot</span>');
      if (_optical() && b.prot && b.ref === 'surface') chips.push('<span class="lab-chip is-warm">📐 Counting from the surface</span>');
      if (_optical() && b.eye === 'side') chips.push('<span class="lab-chip is-warm">👁️ Eye to the side</span>');
      if (b.lifted) chips.push('<span class="lab-chip">✏️ Block lifted - pencil trace</span>');
      st.innerHTML = chips.join('');
    }
    const c = $('lab-light-contents');
    if (c) {
      if (b.shown) c.textContent = `Your reading: i = ${b.shown.i}°, r = ${b.shown.r}°`;
      else if (b.setup === 'cards') c.textContent = b.aligned ? 'The three holes are in a straight line.' : 'The middle card is out of line.';
      else if (_optical()) c.textContent = [b.normal ? 'normal drawn' : 'no normal yet', b.prot ? 'protractor placed' : 'no protractor'].join(' · ');
      else c.textContent = 'The bench is empty.';
    }
    if (_cv) _cv.setAttribute('aria-label', b.setup === 'cards' ? 'A lamp behind three cards with holes and a screen'
      : b.setup ? `A ${S.short.toLowerCase()} shining at a ${D().SETUPS[b.setup].name.toLowerCase()}` : 'A ray box on an empty bench');
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done });
  }

  // ══ Drawing ══════════════════════════════════
  const COL = { room: '#18222A', room2: '#10181D', paper: '#23303A', pencil: 'rgba(214,226,232,0.75)', ink: '#E6EEF2',
                ray: '#FFE9A3', rayGlow: 'rgba(255,196,64,0.35)', laser: '#FF3B30', laserGlow: 'rgba(255,40,30,0.35)',
                mirror: '#DDE6EC', glass: 'rgba(150,215,240,0.22)', glassEdge: 'rgba(190,235,250,0.9)',
                arcI: '#FFD166', arcR: '#7FDBFF', bad: '#FF7A70' };

  const _traceArgs = () => ({ setup: _b.setup || 'none', beta: _b.beta, tau: _b.tau, lifted: _b.lifted });

  function _geom() {
    const blk = _b.setup === 'block';
    const U = blk ? Math.min(_H * 0.28, _W * 0.26) : Math.min(_H * 0.36, _W * 0.30);
    return { U, P: [_W / 2, _H * (blk ? 0.42 : 0.74)] };
  }
  const _toPx = (g, p) => [g.P[0] + p[0] * g.U, g.P[1] + p[1] * g.U];
  const _ang = v => Math.atan2(v[1], v[0]);

  function _draw(dt) {
    if (!_cx || !_b) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, COL.room); bg.addColorStop(1, COL.room2);
    c.fillStyle = bg; c.fillRect(0, 0, _W, _H);
    c.fillStyle = COL.paper; c.fillRect(_W * 0.04, _H * 0.05, _W * 0.92, _H * 0.9);
    if (_b.setup === 'cards') _drawCards();
    else _drawOptical();
    _drawFx(dt);
    c.restore();
  }

  function _pathPx(g, segs) {
    const pts = [];
    segs.forEach(([a, b], k) => { if (!k) pts.push(_toPx(g, a)); pts.push(_toPx(g, b)); });
    return pts;
  }
  // Draw a polyline up to a fraction of its length - the ray growing out of the box.
  function _strokeRay(pts, frac, color, glow, width) {
    const c = _cx;
    let total = 0;
    for (let k = 1; k < pts.length; k++) total += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
    let left = total * Math.max(0, Math.min(1, frac));
    const drawn = [pts[0]];
    for (let k = 1; k < pts.length && left > 0; k++) {
      const a = pts[k - 1], b = pts[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L <= left) { drawn.push(b); left -= L; }
      else { drawn.push([a[0] + (b[0] - a[0]) * left / L, a[1] + (b[1] - a[1]) * left / L]); left = 0; }
    }
    c.lineCap = 'round'; c.lineJoin = 'round';
    [[width * 4, glow], [width, color]].forEach(([w, col]) => {
      c.beginPath(); drawn.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
      c.strokeStyle = col; c.lineWidth = w; c.stroke();
    });
    // arrowheads on each finished segment (a ray diagram always shows the direction)
    for (let k = 1; k < drawn.length; k++) {
      const a = drawn[k - 1], b = drawn[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 30) continue;
      const m = [a[0] + (b[0] - a[0]) * 0.55, a[1] + (b[1] - a[1]) * 0.55], u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
      c.beginPath(); c.moveTo(m[0] + u[0] * 7, m[1] + u[1] * 7);
      c.lineTo(m[0] - u[0] * 4 - u[1] * 5, m[1] - u[1] * 4 + u[0] * 5); c.lineTo(m[0] - u[0] * 4 + u[1] * 5, m[1] - u[1] * 4 - u[0] * 5);
      c.closePath(); c.fillStyle = color; c.fill();
    }
    return { total, drawn };
  }

  function _drawOptical() {
    const c = _cx, b = _b, g = _geom(), D0 = D();
    const t = D0.trace(_traceArgs());
    const P = g.P, U = g.U;
    const along = (v, k) => [P[0] + v[0] * k * U, P[1] + v[1] * k * U];

    // the lifted block leaves its pencil outline and the traced rays
    const HW = D0.BLOCK.widthMm / D0.BLOCK.thicknessMm / 2;
    const corners = () => {
      const a = [t.s[0] * HW, t.s[1] * HW], dn = [-t.n[0], -t.n[1]];
      return [[-a[0], -a[1]], [a[0], a[1]], [a[0] + dn[0], a[1] + dn[1]], [-a[0] + dn[0], -a[1] + dn[1]]].map(p => _toPx(g, p));
    };
    if (b.setup === 'block') {
      const q = corners();
      c.beginPath(); q.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath();
      if (!b.lifted) { c.fillStyle = COL.glass; c.fill(); c.strokeStyle = COL.glassEdge; c.lineWidth = 2; c.stroke(); }
      else { c.setLineDash([5, 4]); c.strokeStyle = COL.pencil; c.lineWidth = 1.2; c.stroke(); c.setLineDash([]); }
    }
    if (b.lifted && b.traced) {
      const tr = b.traced, pts = _pathPx(g, tr.segs);
      c.strokeStyle = COL.pencil; c.lineWidth = 1.4;
      c.beginPath(); pts.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
      // where the ray would have gone with no block: dotted, to show the shift
      const cosI = -(tr.d[0] * tr.n[0] + tr.d[1] * tr.n[1]);
      const k = 1 / Math.max(0.2, cosI) + D0.RAY_LEN;
      const far = _toPx(g, [tr.d[0] * k, tr.d[1] * k]);
      c.setLineDash([2, 4]); c.beginPath(); c.moveTo(P[0], P[1]); c.lineTo(far[0], far[1]); c.stroke(); c.setLineDash([]);
      c.fillStyle = COL.pencil; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'left';
      if (tr.i > 0) { const e = pts[pts.length - 1]; c.fillText('shifted sideways', Math.min(_W - 96, e[0] + 6), Math.min(_H - 12, e[1] - 4)); }
    }

    // the normal(s)
    if (b.normal && _optical()) {
      c.setLineDash([6, 5]); c.strokeStyle = COL.pencil; c.lineWidth = 1.4;
      const k = b.setup === 'mirror' ? 1.15 : 0.9;
      const a = along(t.n, k), z = along(t.n, b.setup === 'mirror' ? 0 : -1 - 0.9);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(z[0], z[1]); c.stroke();
      if (b.setup === 'block' && t.Q && !b.lifted) {
        const Q = _toPx(g, t.Q), q1 = [Q[0] + t.n[0] * 0.55 * U, Q[1] + t.n[1] * 0.55 * U], q2 = [Q[0] - t.n[0] * 0.8 * U, Q[1] - t.n[1] * 0.8 * U];
        c.beginPath(); c.moveTo(q1[0], q1[1]); c.lineTo(q2[0], q2[1]); c.stroke();
      }
      c.setLineDash([]);
      c.fillStyle = COL.pencil; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'left';
      c.fillText('normal', a[0] + 5, a[1] + 4);
    }

    // the mirror (silvered line, hatched behind)
    if (b.setup === 'mirror') {
      const a = along(t.s, -1.25), z = along(t.s, 1.25);
      c.strokeStyle = 'rgba(160,175,185,0.8)'; c.lineWidth = 1.2;
      for (let k = -1.2; k <= 1.2; k += 0.12) {
        const p = along(t.s, k);
        c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0] - t.n[0] * 9 - t.s[0] * 6, p[1] - t.n[1] * 9 - t.s[1] * 6); c.stroke();
      }
      c.strokeStyle = COL.mirror; c.lineWidth = 4; c.lineCap = 'round';
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(z[0], z[1]); c.stroke();
    }

    // protractor
    if (b.prot && _optical()) _drawProtractor(g, t);

    // the beam
    const S = _src();
    if (b.power) {
      const pts = _pathPx(g, t.segs);
      const frac = (Labs.calm() || _instant) ? 1 : b.beamT;
      const r = _strokeRay(pts, frac, S.laser ? COL.laser : COL.ray, S.laser ? COL.laserGlow : COL.rayGlow, S.laser ? 1.6 : 3);
      if (!Labs.calm() && !_instant && frac >= 1) _photons(pts, r.total, S.laser ? '#FFD6D2' : '#FFFFFF');
    }

    // reading arcs
    if (b.shown && _optical() && b.prot) _drawArcs(g, t, b.shown);

    // the ray box (or laser pen), aimed at P
    _drawSource(_toPx(g, t.box), t.d, U);
    if (b.prot && b.eye === 'side' && _optical()) _drawSideEye(g);
  }

  function _photons(pts, total, color) {
    const c = _cx, spacing = 34, off = (_clock * 140) % spacing;
    c.fillStyle = color;
    for (let s = off; s < total; s += spacing) {
      let left = s;
      for (let k = 1; k < pts.length; k++) {
        const a = pts[k - 1], b = pts[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (left <= L) { c.beginPath(); c.arc(a[0] + (b[0] - a[0]) * left / L, a[1] + (b[1] - a[1]) * left / L, 1.8, 0, Math.PI * 2); c.fill(); break; }
        left -= L;
      }
    }
  }

  function _drawSource(front, d, U) {
    const c = _cx, S = _src(), b = _b;
    const len = S.laser ? U * 0.55 : U * 0.62, wid = S.laser ? 9 : Math.max(18, U * 0.26);
    c.save();
    c.translate(front[0], front[1]);
    c.rotate(Math.atan2(d[1], d[0]));
    if (S.laser) {
      c.fillStyle = '#3B4750'; c.strokeStyle = '#9FB0BA'; c.lineWidth = 1.2;
      c.beginPath(); c.rect(-len, -wid / 2, len, wid); c.fill(); c.stroke();
      c.fillStyle = b.power ? COL.laser : '#5A2A2A'; c.fillRect(-len * 0.5, -wid / 2 - 3, 8, 3);
    } else {
      c.fillStyle = '#56636C'; c.strokeStyle = '#A9B8C1'; c.lineWidth = 1.4;
      c.beginPath(); c.rect(-len, -wid / 2, len, wid); c.fill(); c.stroke();
      c.fillStyle = '#2B343A'; c.fillRect(-3, -wid / 2 + 3, 3, wid - 6);
      c.fillStyle = b.power ? '#FFF1B8' : '#6E7A82'; c.fillRect(-2, -1.5, 3, 3);          // the slit
      if (b.power) { const gl = c.createRadialGradient(-len * 0.62, 0, 1, -len * 0.62, 0, wid); gl.addColorStop(0, 'rgba(255,230,150,0.9)'); gl.addColorStop(1, 'rgba(255,200,80,0)'); c.fillStyle = gl; c.fillRect(-len, -wid / 2, len * 0.8, wid); }
      if (b.heat > D().HEAT.hot) {
        c.strokeStyle = `rgba(255,120,60,${0.35 + 0.4 * b.heat})`; c.lineWidth = 1.5;
        for (let k = -1; k <= 1; k++) {
          c.beginPath();
          for (let y = 0; y < 16; y += 2) c.lineTo(-len * 0.62 + k * 7 + (Labs.calm() ? 0 : Math.sin(_clock * 6 + y / 3 + k) * 2), -wid / 2 - 3 - y);
          c.stroke();
        }
      }
    }
    c.restore();
  }

  // A full-circle protractor for the block; a half-circle on the front of the
  // mirror. Its numbers count from whichever line the pupil chose - the
  // mistake is visible before it is read.
  function _drawProtractor(g, t) {
    const c = _cx, b = _b, P = g.P, R = g.U * 0.66;
    const half = b.setup === 'mirror';
    const a0 = _ang(t.n);
    c.fillStyle = 'rgba(235,245,250,0.10)'; c.strokeStyle = 'rgba(235,245,250,0.7)'; c.lineWidth = 1.2;
    c.beginPath();
    if (half) { c.moveTo(P[0], P[1]); c.arc(P[0], P[1], R, a0 - Math.PI / 2, a0 + Math.PI / 2); c.closePath(); }
    else c.arc(P[0], P[1], R, 0, Math.PI * 2);
    c.fill(); c.stroke();
    c.font = '600 9px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    const lo = half ? -90 : -180, hi = half ? 90 : 175;
    for (let th = lo; th <= hi; th += 5) {
      const a = a0 + th * Math.PI / 180, big = th % 30 === 0, mid = th % 10 === 0;
      const r1 = R - (big ? 9 : mid ? 6 : 3.5);
      c.beginPath(); c.moveTo(P[0] + Math.cos(a) * R, P[1] + Math.sin(a) * R); c.lineTo(P[0] + Math.cos(a) * r1, P[1] + Math.sin(a) * r1);
      c.strokeStyle = 'rgba(235,245,250,0.8)'; c.lineWidth = big ? 1.3 : 0.8; c.stroke();
      if (big) {
        const fromN = Math.min(Math.abs(th), 180 - Math.abs(th));
        const v = b.ref === 'normal' ? fromN : 90 - fromN;
        c.fillStyle = v === 0 ? '#FFD166' : 'rgba(235,245,250,0.9)';
        c.fillText(String(v), P[0] + Math.cos(a) * (R - 17), P[1] + Math.sin(a) * (R - 17));
      }
    }
    c.textBaseline = 'alphabetic';
    c.beginPath(); c.arc(P[0], P[1], 2.5, 0, Math.PI * 2); c.fillStyle = '#FFD166'; c.fill();
  }

  function _drawArcs(g, t, rd) {
    const c = _cx, P = g.P, R = g.U * 0.42;
    const u = [-t.d[0], -t.d[1]];
    const outRay = _b.setup === 'mirror' ? t.out : t.inside;
    const surf = v => (v[0] * t.s[0] + v[1] * t.s[1]) >= 0 ? t.s : [-t.s[0], -t.s[1]];
    const refIn = rd.faults.includes('surface') ? surf(u) : t.n;
    const refOut = rd.faults.includes('surface') ? surf(outRay) : (_b.setup === 'mirror' ? t.n : [-t.n[0], -t.n[1]]);
    const arc = (ref, ray, label, col, rad) => {
      const a0 = _ang(ref); let dA = _ang(ray) - a0;
      while (dA > Math.PI) dA -= 2 * Math.PI;
      while (dA < -Math.PI) dA += 2 * Math.PI;
      if (Math.abs(dA) < 0.01) { c.fillStyle = col; c.font = '700 11px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText(label, P[0] + ref[0] * (rad + 16) + 14, P[1] + ref[1] * (rad + 16)); return; }
      c.beginPath(); c.arc(P[0], P[1], rad, a0, a0 + dA, dA < 0);
      c.strokeStyle = col; c.lineWidth = 2.4; c.stroke();
      // Labels sit just outside the protractor's scale, pushed away from the
      // normal, so i and r never land on each other or on the printed marks.
      const m = a0 + dA / 2, lr = g.U * 0.66 + 10, cm = Math.cos(m);
      c.font = '700 11px system-ui, sans-serif'; c.textAlign = cm < -0.15 ? 'right' : cm > 0.15 ? 'left' : 'center'; c.textBaseline = 'middle';
      const lx = P[0] + cm * lr, ly = P[1] + Math.sin(m) * lr;
      c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,0.6)'; c.strokeText(label, lx, ly);
      c.fillStyle = col; c.fillText(label, lx, ly);
      c.textBaseline = 'alphabetic';
    };
    const bad = !rd.ok;
    arc(refIn, u, `i = ${rd.i}°`, bad ? COL.bad : COL.arcI, R);
    if (outRay) arc(refOut, outRay, `r = ${rd.r}°`, bad ? COL.bad : COL.arcR, R * 0.8);
  }

  function _drawSideEye(g) {
    const c = _cx, P = g.P, R = g.U * 0.66;
    const ex = Math.max(18, P[0] - R - 30), ey = P[1] - (_b.setup === 'mirror' ? R * 0.9 : R * 0.2);
    c.font = '22px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('👁️', ex, ey);
    c.setLineDash([3, 3]); c.strokeStyle = COL.bad; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(ex + 12, ey); c.lineTo(P[0] - R * 0.3, P[1] - R * 0.55); c.stroke(); c.setLineDash([]);
    c.textBaseline = 'alphabetic';
  }

  function _drawCards() {
    const c = _cx, b = _b, S = _src();
    const y0 = _H * 0.5, ch = _H * 0.46, xs = [0.34, 0.52, 0.70].map(k => k * _W), off = b.aligned ? 0 : _H * 0.13;
    const lampX = _W * 0.12, screenX = _W * 0.9;
    // light path: lamp → first card it hits (or the screen)
    if (b.power) {
      const endX = b.aligned ? (b.looking ? _W * 0.8 : screenX) : xs[1];
      const frac = (Labs.calm() || _instant) ? 1 : b.beamT;
      const pts = [[lampX + 12, y0], [endX, y0]];
      const r = _strokeRay(pts, frac, S.laser ? COL.laser : COL.ray, S.laser ? COL.laserGlow : COL.rayGlow, S.laser ? 1.6 : 3);
      if (!Labs.calm() && !_instant && frac >= 1) _photons(pts, r.total, S.laser ? '#FFD6D2' : '#FFFFFF');
      if (frac >= 1) {
        const spotX = b.aligned ? (b.looking ? null : screenX - 2) : xs[1] - 5;
        if (spotX) { const gl = c.createRadialGradient(spotX, y0, 0, spotX, y0, 12); gl.addColorStop(0, S.laser ? 'rgba(255,60,50,0.95)' : 'rgba(255,240,190,0.95)'); gl.addColorStop(1, 'rgba(255,200,100,0)'); c.fillStyle = gl; c.beginPath(); c.arc(spotX, y0, 12, 0, Math.PI * 2); c.fill(); }
      }
    }
    // cards, each with its hole
    xs.forEach((x, k) => {
      const dy = k === 1 ? -off : 0, top = y0 - ch / 2 + dy;
      c.fillStyle = '#C9B48A'; c.strokeStyle = '#8C7650'; c.lineWidth = 1.2;
      c.fillRect(x - 5, top, 10, ch); c.strokeRect(x - 5, top, 10, ch);
      c.fillStyle = COL.paper; c.fillRect(x - 5, y0 + dy - 5, 10, 10);
      c.fillStyle = COL.pencil; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText('card ' + (k + 1), x, top + ch + 13);
    });
    // screen at the far end
    c.fillStyle = '#EEF2F4'; c.fillRect(screenX, y0 - ch * 0.42, 8, ch * 0.84);
    c.fillStyle = COL.pencil; c.fillText('screen', screenX + 2, y0 + ch * 0.42 + 13);
    // lamp
    c.fillStyle = S.laser ? '#3B4750' : '#56636C'; c.strokeStyle = '#A9B8C1';
    c.fillRect(lampX - 26, y0 - (S.laser ? 5 : 13), 38, S.laser ? 10 : 26); c.strokeRect(lampX - 26, y0 - (S.laser ? 5 : 13), 38, S.laser ? 10 : 26);
    if (b.power && !S.laser) { const gl = c.createRadialGradient(lampX, y0, 1, lampX, y0, 26); gl.addColorStop(0, 'rgba(255,235,160,0.95)'); gl.addColorStop(1, 'rgba(255,200,80,0)'); c.fillStyle = gl; c.beginPath(); c.arc(lampX, y0, 26, 0, Math.PI * 2); c.fill(); }
    c.fillStyle = COL.pencil; c.fillText(S.laser ? 'laser' : 'lamp', lampX - 7, y0 + 30);
    if (b.looking) {
      c.font = '26px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('👁️', _W * 0.81, y0); c.textBaseline = 'alphabetic';
      if (!b.power) { c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, _W, _H); c.fillStyle = COL.ink; c.font = '700 13px system-ui, sans-serif'; c.fillText('Nothing to see - no light', _W / 2, _H * 0.18); }
    }
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let k = _fx.length - 1; k >= 0; k--) {
      const f = _fx[k];
      f.t += dt;
      const p = Math.min(1, f.t / f.dur);
      if (f.type === 'flash') {
        const gl = c.createRadialGradient(_W * 0.81, _H * 0.5, 0, _W * 0.81, _H * 0.5, _W * (0.2 + p));
        gl.addColorStop(0, `rgba(255,255,255,${1 - p})`); gl.addColorStop(0.4, `rgba(255,60,50,${0.85 * (1 - p)})`); gl.addColorStop(1, 'rgba(255,40,30,0)');
        c.fillStyle = gl; c.fillRect(0, 0, _W, _H);
      } else if (f.type === 'burn') {
        const g = _geom(), t = D().trace(_traceArgs()), bx = _toPx(g, t.box);
        const gl = c.createRadialGradient(bx[0], bx[1], 0, bx[0], bx[1], 30 + 60 * p);
        gl.addColorStop(0, `rgba(255,150,60,${0.9 * (1 - p)})`); gl.addColorStop(1, 'rgba(255,90,30,0)');
        c.fillStyle = gl; c.fillRect(0, 0, _W, _H);
        c.font = `800 ${Math.round(16 + 10 * p)}px system-ui, sans-serif`; c.textAlign = 'center';
        c.lineWidth = 4; c.strokeStyle = '#1B2A24'; c.strokeText('HOT!', bx[0], bx[1] - 26 - 14 * p);
        c.fillStyle = '#FF8C42'; c.fillText('HOT!', bx[0], bx[1] - 26 - 14 * p);
      } else if (f.type === 'reading') {
        const g = _geom();
        c.strokeStyle = `rgba(255,122,112,${0.9 * Math.sin(Math.PI * p)})`; c.lineWidth = 4;
        c.beginPath(); c.arc(g.P[0], g.P[1], g.U * 0.66 + 6, 0, Math.PI * 2); c.stroke();
      }
      if (f.t >= f.dur) { _fx.splice(k, 1); if (f.done) f.done(); }
    }
  }

  function _animate(dt) {
    if (!dt) return;
    _clock += dt;
    if (Labs.calm()) { _b.beamT = 1; return; }
    if (_b.power && _b.beamT < 1) _b.beamT = Math.min(1, _b.beamT + dt / GROW_SEC);
  }

  // ══ Loop ═════════════════════════════════════
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) return;
    if (typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') return;
    _raf = requestAnimationFrame(_loop);
    if (document.hidden) { _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    _step(dt);
    _animate(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); if (_instant && _b) _b.beamT = 1; }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let k = 0; k < n; k++) _step(0.05); _readouts(); }
  function _debug() {
    const b = _b || _newBench();
    let boxPx = null;
    if (_cv && (b.setup === 'mirror' || b.setup === 'block')) {
      const g = _geom(), t = D().trace(_traceArgs()), p = _toPx(g, t.box), r = _cv.getBoundingClientRect();
      boxPx = { x: r.left + p[0], y: r.top + p[1], px: r.left + g.P[0], py: r.top + g.P[1] };
    }
    return { setup: b.setup, source: b.source, power: b.power, heat: b.heat, beta: b.beta, tau: b.tau, i: Math.abs(b.beta + b.tau),
             normal: b.normal, prot: b.prot, ref: b.ref, eye: b.eye, lifted: b.lifted, aligned: b.aligned, looking: b.looking,
             beamT: b.beamT, busy: _busy, panel: _panel, boxPx,
             guide: _guide && { id: _guide.id, step: _guide.step },
             readings: _readings.map(r => ({ setup: r.setup, i: r.i, r: r.r, ok: r.ok, faults: r.faults })),
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, n: _mission.readings.length, mistakes: _mission.mistakes, hazards: _mission.hazards,
                                    lifted: _mission.lifted, success: _mission.success } };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, place, setSource, power, toggleNormal, toggleProtractor,
           placeProtractor, setRef, toggleEye, rotate, setAngle, setTilt, read, look, moveCard, lift, pack,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabLight = LabLight;
