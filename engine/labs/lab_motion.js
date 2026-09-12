'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Motion Track (Physics, NCE Grade 9, P4 Motion)
//
//  A trolley on a 2.0 m track (flat, or a ramp raised 2-50 cm), light gates at
//  every 0.5 m mark or a hand stopwatch, a stop block, and a data logger that
//  draws the speed-time graph live as the trolley rolls. Plus a walk on the
//  school field for distance and displacement. Sandbox, two Missions and a
//  collection of Discoveries.
//
//  ⚠ Every time, speed, gradient, area and route length comes from
//    lab_motion_data.js (LabMotionData). This file only scales those numbers
//    to the canvas. If a number looks wrong on screen, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen.
//  ⚠ Calm Mode and reduced motion: a run or a walk completes at once - the
//    full graph and the final position are drawn straight away.
//  ⚠ Every control is a real <button>; there is no drag in this lab.
// ══════════════════════════════════════════════
const LabMotion = (() => {
  const D = () => LabMotionData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { fall: 1.3, mark: 0.7 };
  const WALK_SEC = 3;           // a walk plays out in 3 real seconds (speeded up)

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _b = null, _panel = 'sandbox', _mission = null, _guide = null;
  let _log = [], _runs = [], _walks = [], _fx = [], _busy = false, _instant = false;
  let _run = null, _walk = null, _fall = null, _runN = 0, _swK = 0, _said = {}, _tipIdx = -1;

  function _newBench(setup) {
    return { setup: setup || 'ramp', h: 20, start: 'rest', timer: 'gates', block: true, meaning: 'accel',
             route: 'straight', disp: 'straight', last: null, ghost: [], show: null, grad: null, area: null, walked: null };
  }

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-motion">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Physics · Grade 9</span><h1>Motion Track</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-motion-block" class="lab-goggles" data-act="block" aria-pressed="true"><span aria-hidden="true">🧱</span><span id="lab-motion-block-label">Stop block on</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the track works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-motion-zone">
            <canvas id="lab-motion-canvas" role="img" aria-label="A trolley on a ramp and a speed-time graph"></canvas>
            <div class="lab-chip lab-motion-chip" id="lab-motion-chip"></div>
            <div class="lab-motion-status" id="lab-motion-status"></div>
            <div class="lab-motion-contents" id="lab-motion-contents" aria-live="polite"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Set the variables and observe how motion changes.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-motion-controls" class="lab-motion-controls"></div>
        </div>
        <div class="lab-side">
          <div class="lab-tabs" role="tablist" aria-label="Bench, missions and discoveries">
            <button type="button" role="tab" data-panel="sandbox">🛷 Bench</button>
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
    _cv = $('lab-motion-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _renderControls();
    _syncBlock();
    _readouts();
    const st = Labs.store('motion');
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
    if (_run) _finishRun();
    if (_walk) _finishWalk();
    _fx = []; _fall = null; _busy = false;
    _root = null; _cv = null; _cx = null;
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(520, Math.max(340, w * 1.05)));
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
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const hb = e.target.closest('[data-h]');
      if (hb) { stepHeight(+hb.dataset.h); return; }
      const so = e.target.closest('[data-set]');
      if (so) { setOpt(so.dataset.set, so.dataset.v); return; }
      const rt = e.target.closest('[data-route]');
      if (rt) { setRoute(rt.dataset.route); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const add = e.target.closest('[data-add]');
      if (add) { place(add.dataset.id); _showStage(); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
    };
  }

  // On a phone the shelf sits below the bench: bring the bench back into view.
  function _showStage() {
    const z = $('lab-motion-zone');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'block': setBlock(!_b.block); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'run': run(); break;
      case 'gradient': gradient(); break;
      case 'area': area(); break;
      case 'walk': walk(); break;
      case 'clear': clearGraph(); break;
      case 'quiz': _quiz(); break;
      case 'clear-table': _runs = []; _walks = []; _refresh(); _coach('Results tables cleared. Take some fresh readings.'); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. The track is all yours.'); _renderPanel(); break;
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
  const f1 = x => D().f1(x), f2 = x => D().f2(x);

  // ══ Actions: setting up ══════════════════════
  function place(id) {
    const S = D().SETUPS[id];
    if (!S || !_guard()) return;
    if (_mission && _mission.setup !== id) { _coach(`This mission uses the ${D().SETUPS[_mission.setup].name.toLowerCase()}. Leave the mission to try something else.`); return; }
    if (_b.setup !== id) { _b.setup = id; _b.show = null; }
    _coach(id === 'ramp' ? 'The trolley is at the top of a 2.0 m track, with a mark every 0.5 m. Set the height, then tap ▶ to let go.'
      : 'Out on the school field with a tape measure and a compass. Pick a route, then jog it.');
    _afterChange();
    _guideEvent('setup:' + id);
  }

  function setHeight(h) {
    const H = D().HEIGHTS;
    if (!H.includes(h) || !_guard() || _b.setup !== 'ramp') return;
    if (_b.h === h) return;
    _b.h = h;
    _coach(h === 0 ? 'Track flat on the bench.' : h === 2 ? 'Raised just 2 cm: enough to cancel friction. A friction-compensated runway.'
      : `Top of the ramp raised to ${h} cm - a slope of about ${Math.round(D().angleDeg(h))}°.`);
    _afterChange();
    _guideEvent('height:' + h);
  }
  function stepHeight(d) {
    const H = D().HEIGHTS, k = H.indexOf(_b.h) + d;
    if (k < 0 || k >= H.length) { _coach(d < 0 ? 'The track is already flat.' : 'That’s as high as this ramp goes - 50 cm.'); return; }
    setHeight(H[k]);
  }

  const OPTS = { start: ['rest', 'push'], timer: ['gates', 'stopwatch'], meaning: ['accel', 'speed'], disp: ['straight', 'path'] };
  function setOpt(k, v) {
    if (!OPTS[k] || !OPTS[k].includes(v) || !_guard()) return;
    if (_b[k] === v) { _guideEvent(k + ':' + v); return; }
    _b[k] = v;
    const say = {
      'start:rest': 'From rest: you just let go - no push.',
      'start:push': 'You’ll give the trolley a gentle push of 1.0 m/s as you let go.',
      'timer:gates': 'Light gates on: each one times the trolley as it breaks its beam - no reaction time.',
      'timer:stopwatch': 'Hand stopwatch: you start it when you see the trolley move, and stop it at the end.',
      'meaning:accel': 'The gradient of a speed-time graph will be recorded as an acceleration, in m/s².',
      'meaning:speed': 'The gradient will be recorded as a speed, in m/s. Is that what a gradient on this graph means?',
      'disp:straight': 'Displacement: the straight line from start to finish, with its direction.',
      'disp:path': 'You’ll measure the displacement along the path you walked. Is that right?',
    };
    _coach(say[k + ':' + v]);
    _afterChange();
    _guideEvent(k + ':' + v);
  }

  function setBlock(on) {
    if (!_guard()) return;
    if (_b.block === !!on) { _guideEvent(on ? 'block:on' : 'block:off'); return; }
    _b.block = !!on;
    _coach(_b.block ? 'Stop block clamped at the bottom of the ramp. It will stop the trolley safely.'
                    : 'Stop block removed. There is nothing at the end of the ramp now…');
    _syncBlock();
    _afterChange();
    _guideEvent(_b.block ? 'block:on' : 'block:off');
  }
  function _syncBlock() {
    const b = $('lab-motion-block');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_b.block));
    b.classList.toggle('is-on', _b.block);
    const l = $('lab-motion-block-label');
    if (l) l.textContent = _b.block ? 'Stop block on' : 'Stop block off';
  }

  function setRoute(id) {
    if (!D().ROUTES[id] || !_guard()) return;
    if (_b.setup !== 'walk') { _coach('Routes are for the walk on the field. Pick it from the shelf.'); return; }
    if (_b.route !== id) { _b.route = id; _b.walked = null; }
    const R = D().ROUTES[id];
    _coach(`Route: ${R.name.toLowerCase()} - ${R.meta}. Tap 🚶 to jog it.`);
    _afterChange();
    _guideEvent('route:' + id);
  }

  function clearGraph() {
    if (!_guard()) return;
    _b.last = null; _b.ghost = []; _b.show = null;
    _coach('Graph cleared. Your results stay in the notebook.');
    _afterChange();
  }

  // ══ Actions: a run down the ramp ═════════════
  function run() {
    if (!_guard()) return;
    if (_b.setup !== 'ramp') { _coach('Put the trolley and ramp on the bench first.'); return; }
    const p = D().plan(_b.h, _b.start);
    if (_b.last) { _b.ghost.unshift(_b.last.p); _b.ghost.length = Math.min(_b.ghost.length, 2); }
    _b.last = null; _b.show = null;
    _run = { p, t: 0 };
    _busy = true;
    _coach(!p.moving ? 'You let go…' : p.start === 'push' ? 'A gentle push - off it goes! Watch the speed-time graph draw itself.'
      : 'Released! Watch the speed-time graph draw itself as the trolley rolls.');
    _readouts();
    if (_instant || Labs.calm()) _finishRun();
  }

  function _finishRun() {
    const p = _run.p;
    _run = null;
    if (p.moving && p.reached && !_b.block) { _busy = false; _hazard('no_block', { v: p.vEnd }); return; }
    _busy = false;
    const k = _b.timer === 'stopwatch' ? _swK++ : 0;
    const row = D().reading(p, _b.timer, k);
    Object.assign(row, { n: ++_runN, a: null, aBad: false, d: null });
    _runs.unshift(row);
    if (_runs.length > 12) _runs.length = 12;
    _b.last = { p, row };
    if (!p.moving) {
      _logEntry({ title: `Run ${row.n}: released on a ${_b.h ? 'friction-compensated runway' : 'flat track'}`, obs: 'The trolley did not move. The data logger drew a line along the time axis: speed 0 m/s.' });
      _coach('Nothing happened! With no slope pulling it, a trolley at rest stays at rest. Look at the graph - a line along the time axis.');
    } else {
      const what = p.a > 1e-9 ? 'speeding up steadily' : p.a < -1e-9 ? 'slowing down steadily' : 'at a constant speed';
      _logEntry({ title: `Run ${row.n}: ramp ${p.h} cm, ${p.start === 'push' ? 'pushed' : 'from rest'}${row.timer === 'stopwatch' ? ', hand-timed' : ''}`, bad: !row.ok,
        obs: `2.0 m in ${f2(row.t)} s${row.timer === 'stopwatch' ? ' (by hand)' : ''}, ${what}. Speed at the end ${f2(row.vEnd)} m/s.`,
        formula: `average speed = distance ÷ time = 2.0 m ÷ ${f2(row.t)} s = ${f2(row.avg)} m/s` });
      _coach(p.a > 1e-9 ? `${f2(row.t)} s for the 2.0 m. The line sloped up in a straight line - uniform acceleration. Find its gradient with 📐.`
        : p.a < -1e-9 ? 'The line sloped DOWN: friction slowed the trolley. That is a deceleration.'
        : 'A horizontal line: the speed never changed. Constant speed, zero acceleration.');
    }
    if (!p.moving) _discover('stationary');
    if (p.moving && p.u === 0 && p.a > 0) _discover('from_rest');
    if (p.moving && p.u > 0 && p.a > 0) _discover('push_accel');
    if (p.moving && Math.abs(p.a) < 1e-12) _discover('constant');
    if (p.moving && p.a < 0) _discover('slowing');
    if (p.moving && p.reached && _b.block && p.vEnd >= D().FAST_END) _discover('stop_block');
    if (new Set(_runs.filter(r => r.moving && r.start === 'rest').map(r => r.h)).size >= 2) _discover('steeper');
    const same = _runs.filter(r => r.timer === 'stopwatch' && r.moving && r.h === row.h && r.start === row.start);
    if (row.timer === 'stopwatch' && same.length >= 3) _discover('repeats');
    if (_mission && row.timer === 'stopwatch') _mission.mistakes++;
    _afterChange();
    if (row.timer === 'stopwatch' && row.moving && !_said.stopwatch) {
      _said.stopwatch = true;
      _card('stopwatch', row, () => _coach('Switch the timing back to ⚡ Light gates - or run it three times and take the mean.'));
    }
    _guideEvent('run');
  }

  function gradient() {
    if (!_guard()) return;
    if (_b.setup !== 'ramp') { _coach('The gradient is read from the speed-time graph of a trolley run.'); return; }
    const L = _b.last;
    if (!L) { _coach('Run the trolley first - there is no line to measure yet.'); return; }
    const g = D().gradientRead(L.p);
    _b.show = 'gradient'; _b.grad = g;
    if (_b.meaning === 'speed' && L.p.moving) {
      L.row.a = g.a; L.row.aBad = true;
      if (_mission) _mission.mistakes++;
      _logEntry({ title: `Run ${L.row.n}: gradient - check it`, bad: true, obs: `You recorded the gradient as a speed: ${f2(g.a)} m/s.` });
      _afterChange();
      _card('gradient_speed', Object.assign({ vEnd: L.row.vEnd }, g), () => _coach('Tap “Acceleration” under “Gradient means”, then find the gradient again.'));
      _guideEvent('gradient-bad');
      return;
    }
    L.row.a = g.a; L.row.aBad = false;
    _logEntry({ title: `Run ${L.row.n}: gradient of the line`, formula: `gradient = Δv ÷ Δt = ${f2(g.dv)} m/s ÷ ${f1(g.dt)} s = ${f2(g.a)} m/s²`,
      obs: g.a > 0 ? `The acceleration is ${f2(g.a)} m/s²: the speed rose by ${f2(g.a)} m/s every second.`
        : g.a < 0 ? `The gradient is negative: a deceleration of ${f2(-g.a)} m/s².` : 'The gradient is zero: no acceleration.' });
    if (L.p.moving) _discover('gradient');
    if (_mission && _mission.id === 'accel' && L.row.timer === 'gates' && L.row.start === 'rest' && L.p.moving && L.p.a > 0) _mission.heights[L.row.h] = true;
    _coach(g.a > 0 ? `Gradient = ${f2(g.dv)} ÷ ${f1(g.dt)} = ${f2(g.a)} m/s². That is the acceleration.` : `Gradient = ${f2(g.a)} m/s².`);
    _missionCheck();
    _afterChange();
    _guideEvent('gradient');
  }

  function area() {
    if (!_guard()) return;
    if (_b.setup !== 'ramp') { _coach('The area is under the line of a speed-time graph.'); return; }
    const L = _b.last;
    if (!L) { _coach('Run the trolley first - there is no line yet.'); return; }
    const A = D().areaRead(L.p);
    _b.show = 'area'; _b.area = A;
    L.row.d = A.d;
    _logEntry({ title: `Run ${L.row.n}: area under the line`, formula: `area = ${A.working}`,
      obs: L.p.moving ? `The area under the line is ${f1(A.d)} m - the distance the trolley travelled, the length of the track.` : 'No area under the line: the trolley went nowhere.' });
    if (L.p.moving) _discover('area');
    if (_mission && _mission.id === 'accel' && L.p.moving) _mission.area = true;
    _coach(L.p.moving ? `Area = ${A.working}. Exactly the 2.0 m of track: area under a speed-time graph = distance.` : 'No area - no distance.');
    _missionCheck();
    _afterChange();
    _guideEvent('area');
  }

  // ══ Actions: a walk on the field ═════════════
  function walk() {
    if (!_guard()) return;
    if (_b.setup !== 'walk') { _coach('Go out onto the field first - pick the walk from the shelf.'); return; }
    const w = D().walk(_b.route);
    _walk = { id: _b.route, w, f: 0 };
    _b.walked = null;
    _busy = true;
    _coach(`Jogging “${D().ROUTES[_b.route].name}” at ${D().JOG} m/s - speeded up so you don’t have to wait.`);
    _readouts();
    if (_instant || Labs.calm()) _finishWalk();
  }

  function _finishWalk() {
    const { id, w } = _walk;
    _walk = null; _busy = false;
    const ok = _b.disp === 'straight' || w.same;
    const row = Object.assign({ route: id, disp: _b.disp, ok, recorded: ok ? w.displacement : w.distance }, w);
    _walks.unshift(row);
    if (_walks.length > 10) _walks.length = 10;
    _b.walked = { id, w };
    const R = D().ROUTES[id];
    _logEntry({ title: `Walk: ${R.name}`, bad: !ok,
      obs: ok ? `Distance ${f1(w.distance)} m; displacement ${f1(w.displacement)} m${w.displacement > 0 ? ' ' + w.dir : ''}. Time ${Math.round(w.time)} s.`
              : `You recorded displacement = ${f1(w.distance)} m, measured along the path.`,
      formula: `average speed = ${f1(w.distance)} m ÷ ${Math.round(w.time)} s = ${f2(w.avgSpeed)} m/s · average velocity = ${f1(w.displacement)} m ÷ ${Math.round(w.time)} s = ${f2(w.avgVel)} m/s` });
    if (ok) {
      if (id === 'back') _discover('there_back');
      if (id === 'corner') _discover('corner');
      if (id === 'straight') _discover('straight_same');
      if (id === 'track') _discover('track_velocity');
      _coach(w.same ? `Straight line: distance and displacement are both ${f1(w.distance)} m - but only the displacement has a direction (${w.dir}).`
        : w.displacement === 0 ? `Distance ${f1(w.distance)} m, but displacement 0 m - you finished where you started!`
        : `Distance ${f1(w.distance)} m, but displacement only ${f1(w.displacement)} m, ${w.dir}. The red arrow is the displacement.`);
    }
    if (new Set(_walks.map(r => r.route)).size >= 2) _discover('scalar_vector');
    if (_mission && _mission.id === 'disp') { if (ok) _mission.routes[id] = true; else _mission.mistakes++; }
    _missionCheck();
    _afterChange();
    if (!ok) _card('disp_path', w, () => _coach('Tap “Start → finish” under Displacement, then jog it again.'));
    _guideEvent('walk');
  }

  // Everything a pupil does ends here: repaint.
  function _afterChange() {
    _renderControls();
    _readouts();
    _refresh();
  }

  // ══ Cards ════════════════════════════════════
  // A wrong-but-safe mistake: flash the reading on the canvas, then the card.
  function _card(kind, ctx, after) {
    const R = D().RESULTS[kind];
    _busy = true;
    _fxAdd('mark', () => {
      _busy = false;
      Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead, exam: R.exam,
        button: 'Got it - try again', onClose: after });
    });
  }

  function _hazard(id, ctx) {
    const H = D().HAZARDS[id];
    const st = Labs.store('motion');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _busy = true;
    _fall = { t: 0, v: ctx.v || 0 };
    _fxAdd(H.fx, () => {
      _busy = false;
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: 'Got it - try again safely',
        onClose: () => { _fall = null; _coach('Tap 🧱 at the top to clamp the stop block on, then run it again.'); _highlight(); } });
    });
    _afterChange();
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    if (_run) { _run.t += dt; if (_run.t >= _run.p.dur) _finishRun(); }
    if (_walk) { _walk.f += dt / WALK_SEC; if (_walk.f >= 1) _finishWalk(); }
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = D().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _reset(M.setup);
    _mission = { id, setup: M.setup, heights: {}, area: false, routes: {}, hazards: 0, mistakes: 0, success: false };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
    _renderControls();
    _readouts();
  }

  function _missionProgress() {
    const ms = _mission;
    if (ms.id === 'accel') { const n = Object.keys(ms.heights).length; return { n, area: ms.area, done: n >= 2 && ms.area }; }
    const n = Object.keys(ms.routes).length;
    return { n, track: !!ms.routes.track, done: n >= 3 && !!ms.routes.track };
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
      const st = Labs.store('motion');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} - keep the stop block on for an extra star.` : 'No safety mistakes. 🧱');
      lines.push(ms.mistakes ? `${ms.mistakes} reading${ms.mistakes === 1 ? '' : 's'} taken the wrong way - ${ms.id === 'accel' ? 'light gates, and the gradient is an acceleration' : 'displacement is the straight line from start to finish'}.`
        : ms.id === 'accel' ? 'Every run timed by light gates, every gradient an acceleration. 📐' : 'Every displacement measured start to finish. 🧭');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or go and hunt for discoveries.'); } });
    } });
  }

  function _reset(setup) {
    if (_run) _run = null;
    if (_walk) _walk = null;
    _b = _newBench(setup || 'ramp');
    _fx = []; _fall = null; _busy = false; _said = {};
    _syncBlock();
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box, and
  // makes the same control glow. Nothing is locked: the guide waits. A guide is
  // one of LabMotionData.GUIDES, or one built from a discovery's recipe.
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
    const z = $('lab-motion-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step already true on the bench is skipped. Actions never are.
  function _satisfied(on) {
    const [k, v] = on.split(':');
    switch (k) {
      case 'setup': return _b.setup === v;
      case 'height': return _b.setup === 'ramp' && _b.h === +v;
      case 'start': case 'timer': case 'meaning': case 'disp': return _b[k] === v;
      case 'block': return v === 'on' ? _b.block : !_b.block;
      case 'route': return _b.setup === 'walk' && _b.route === v;
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
    if (s && s.on === token) { _guide.step++; _guideEnter(); if (!s.on.startsWith('wait:')) _coachGuide(s.on); }
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
      case 'height': if (_b.setup !== 'ramp') place('ramp'); setHeight(+v); break;
      case 'start': case 'timer': case 'meaning': case 'disp': setOpt(k, v); break;
      case 'block': setBlock(v === 'on'); break;
      case 'route': if (_b.setup !== 'walk') place('walk'); setRoute(v); break;
      case 'run': run(); break;
      case 'gradient': gradient(); break;
      case 'area': area(); break;
      case 'walk': walk(); break;
    }
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

  function _coachGuide(on) {
    const [k, v] = on.split(':');
    if (k === 'setup')        _coach(v === 'ramp' ? 'Track set up. Check it is straight and the sensor is connected.' : 'Out on the field. Take your measurements carefully.');
    else if (k === 'height')  _coach(+v === 0 ? 'Track laid flat.' : `Ramp set to ${v} cm. A steeper ramp means more acceleration.`);
    else if (k === 'start')   _coach('Trolley ready. Release it smoothly — don\'t push.');
    else if (k === 'timer' && v === 'on')  _coach('Timer started. Watch the speed–time graph build.');
    else if (k === 'timer' && v === 'off') _coach('Timer stopped. Look at the graph shape.');
    else if (k === 'block' && v === 'on')  _coach('Block in place. The trolley will stop here.');
    else if (k === 'block' && v === 'off') _coach('Block removed.');
    else if (k === 'meaning') _coach('Graph section identified. Think about what that shape means.');
    else if (k === 'route')   _coach('Route selected. Walk it at a steady pace.');
    else if (k === 'disp')    _coach('Distance set.');
    else if (on === 'run')    _coach('Run complete. Examine the speed–time graph.');
    else if (on === 'gradient')     _coach('Gradient calculated. That is the acceleration.');
    else if (on === 'gradient-bad') _coach('Incorrect gradient — see the result card.');
    else if (on === 'area')   _coach('Area under the graph calculated. That is the distance.');
    else if (on === 'walk')   _coach('Walked the route. Compare with the trolley run.');
    else _coach('Good — on to the next step.');
  }

  // ── Discoveries: every card opens ─────────────
  function _autoStep(on) {
    const [k, v] = on.split(':');
    const S = D().SETUPS, R = D().ROUTES;
    switch (k) {
      case 'setup': return v === 'ramp' ? { on, say: 'Put the trolley and ramp on the bench.', btn: '🛷 Set up the ramp' }
                                         : { on, say: 'Go out onto the school field with a tape measure and a compass.', btn: `${S.walk.icon} Go to the field` };
      case 'height': return +v === 0 ? { on, say: 'Lay the track flat (0 cm).', btn: '▼ Lay the track flat' }
        : { on, say: `Set the raised end of the ramp to ${v} cm${+v === 2 ? ' - just enough to cancel friction' : ''}.`, btn: `▲ Set the ramp to ${v} cm` };
      case 'start': return v === 'push' ? { on, say: 'This time give the trolley a gentle push.', btn: '👋 Choose “Pushed”' }
                                         : { on, say: 'Let go from rest - no push.', btn: '✋ Choose “From rest”' };
      case 'timer': return v === 'stopwatch' ? { on, say: 'Time the run with a hand stopwatch instead of the light gates.', btn: '⏱️ Use a stopwatch' }
                                              : { on, say: 'Time the run with the light gates.', btn: '⚡ Use the light gates' };
      case 'block': return v === 'on' ? { on, say: 'Clamp the stop block at the bottom of the ramp.', btn: '🧱 Fit the stop block' }
                                       : { on, say: 'Take the stop block away.', btn: '🧱 Remove the stop block' };
      case 'meaning': return v === 'accel' ? { on, say: 'The gradient of a speed-time graph is an acceleration.', btn: '📐 Gradient means acceleration' }
                                            : { on, say: 'Record the gradient as a speed.', btn: 'Gradient means speed' };
      case 'route': return { on, say: `Choose the route “${R[v].name}” (${R[v].meta}).`, btn: `${R[v].icon} ${R[v].name}` };
      case 'disp': return v === 'straight' ? { on, say: 'Measure the displacement in a straight line from start to finish.', btn: '📏 Start → finish' }
                                            : { on, say: 'Measure the displacement along the path.', btn: '〰️ Along the path' };
      case 'run': return { on, say: 'Let the trolley go and watch the graph draw itself.', btn: '▶ Run the trolley' };
      case 'gradient': return { on, say: 'Draw a triangle on the line and find its gradient.', btn: '📐 Find the gradient' };
      case 'area': return { on, say: 'Shade the area under the line.', btn: '▦ Shade the area' };
      default: return { on, say: 'Jog the route.', btn: '🚶 Jog the route' };
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
    const found = !!Labs.store('motion').disc[id];
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
    const st = Labs.store('motion');
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
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    let sel = null;
    switch (k) {
      case 'setup': sel = `[data-add="setup"][data-id="${v}"]`; break;
      case 'height': sel = `[data-h="${+v > _b.h ? 1 : -1}"]`; break;
      case 'start': case 'timer': case 'meaning': case 'disp': sel = `[data-set="${k}"][data-v="${v}"]`; break;
      case 'block': sel = '#lab-motion-block'; break;
      case 'route': sel = `[data-route="${v}"]`; break;
      default: sel = `#lab-motion-controls [data-act="${k}"]`;
    }
    const el = sel && _root.querySelector(sel);
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-act],[data-add],[data-set],[data-h],[data-route]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  function _startHTML() {
    const st = Labs.store('motion');
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
        <li><b>Follow the yellow box</b> under the track. The thing to tap next glows yellow.</li>
        <li><b>Watch the graph</b> draw itself, then read your results in the lab notebook.</li>
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

  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    const sh = $('lab-motion-shelf');
    if (sh) sh.outerHTML = _shelfHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover('motion', id, { title: d && d.title, total: D().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store('motion').disc).length}/${D().DISCOVERIES.length}`;
  }

  function _shelfHTML() {
    const S = D().SETUPS;
    return `<section class="lab-shelf" id="lab-motion-shelf" aria-label="Shelf">
      <div class="lab-shelf-head"><h2 class="lab-motion-shelf-h">Apparatus</h2><p class="lab-hint">Tap to set it up.</p></div>
      <div class="lab-items">${Object.keys(S).map(id => `<button type="button" class="lab-item${_b.setup === id ? ' lab-motion-on' : ''}" data-add="setup" data-id="${id}" aria-pressed="${_b.setup === id}">
        <span class="lab-motion-ico" aria-hidden="true">${S[id].icon}</span>
        <span class="lab-item-text"><b>${esc(S[id].name)}</b><small>${esc(S[id].meta)}</small></span></button>`).join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const tbl = [];
    const L = _b.last;
    if (L && L.row.timer === 'gates' && L.p.moving) {
      tbl.push(`<div class="lab-table-wrap"><table class="lab-table lab-motion-table">
        <caption>Light gates - run ${L.row.n} (ramp ${L.row.h} cm, ${L.row.start === 'push' ? 'pushed' : 'from rest'})</caption>
        <thead><tr><th scope="col">Distance / m</th><th scope="col">Time / s</th><th scope="col">Speed / m/s</th></tr></thead>
        <tbody><tr><td>0.0</td><td>0.00</td><td>${f2(L.p.u)}</td></tr>${D().gates(L.p).map(g => `<tr><td>${f1(g.x)}</td><td>${f2(g.t)}</td><td>${f2(g.v)}</td></tr>`).join('')}</tbody></table></div>`);
    }
    if (_runs.length) {
      tbl.push(`<div class="lab-table-wrap"><table class="lab-table lab-motion-table">
        <caption>Trolley runs on the 2.0 m track</caption>
        <thead><tr><th scope="col">Run</th><th scope="col">Ramp</th><th scope="col">Time / s</th><th scope="col">Average speed / m/s</th><th scope="col">Acceleration / m/s²</th><th scope="col">Distance / m</th></tr></thead>
        <tbody>${_runs.map(r => `<tr class="${r.ok ? '' : 'lab-motion-bad-row'}"><td>${r.n}</td><td>${r.h} cm${r.start === 'push' ? ' 👋' : ''}</td>
          <td>${r.moving ? f2(r.t) + (r.timer === 'stopwatch' ? ' ⏱️' : '') : '-'}</td><td>${r.moving ? f2(r.avg) : '0.00'}</td>
          <td>${r.a == null ? '-' : r.aBad ? `<span class="lab-motion-bad">${f2(r.a)} m/s ✗</span>` : f2(r.a)}</td>
          <td>${r.d == null ? '-' : f1(r.d)}${r.ok ? '' : ' <span class="lab-motion-bad">✗ hand-timed</span>'}</td></tr>`).join('')}</tbody></table></div>`);
      const sw = _runs.filter(r => r.timer === 'stopwatch' && r.moving);
      const key = sw.length && (sw[0].h + '|' + sw[0].start);
      const same = sw.filter(r => r.h + '|' + r.start === key);
      if (same.length >= 2) {
        const m = D().mean(same.map(r => r.t));
        tbl.push(`<p class="lab-motion-mean">⏱️ Mean of ${same.length} hand timings at ${same[0].h} cm: ${f2(m)} s (light gates: ${f2(same[0].tTrue)} s).</p>`);
      }
    }
    if (_walks.length) {
      tbl.push(`<div class="lab-table-wrap"><table class="lab-table lab-motion-table">
        <caption>Routes on the field (jogging at ${D().JOG} m/s)</caption>
        <thead><tr><th scope="col">Route</th><th scope="col">Distance / m</th><th scope="col">Displacement</th><th scope="col">Time / s</th><th scope="col">Av. speed / m/s</th><th scope="col">Av. velocity / m/s</th></tr></thead>
        <tbody>${_walks.map(r => `<tr class="${r.ok ? '' : 'lab-motion-bad-row'}"><td>${esc(D().ROUTES[r.route].name)}</td><td>${f1(r.distance)}</td>
          <td>${f1(r.recorded)} m${r.ok && r.displacement > 0 ? ' ' + esc(r.dir) : ''}</td><td>${Math.round(r.time)}</td><td>${f2(r.avgSpeed)}</td>
          <td>${r.ok ? f2(r.avgVel) : '<span class="lab-motion-bad">✗ along the path</span>'}</td></tr>`).join('')}</tbody></table></div>`);
    }
    if (_runs.length || _walks.length) tbl.push('<p class="lab-fair">📏 speed = distance ÷ time · acceleration = change in speed ÷ time. <button type="button" class="lab-link" data-act="clear-table">Clear tables</button></p>');
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 14).map(e => `<li class="${e.bad ? 'lab-motion-log-bad' : ''}">
          <b>${esc(e.title)}</b><p>${esc(e.obs)}</p>
          ${e.formula ? `<p class="lab-eq">${esc(e.formula)}</p>` : ''}</li>`).join('')}</ol>`
      : '<p class="lab-empty">Your times, speeds and observations appear here as you experiment.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${tbl.join('')}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('motion');
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
    const body = ms.id === 'accel'
      ? `<ul class="lab-steps">${li(_b.block, '🧱 Stop block fitted')}${li(_b.timer === 'gates', '⚡ Light gates timing')}
          ${li(p.n >= 2, `Gradient of the line from two different heights, from rest (${Math.min(2, p.n)} of 2)`)}
          ${li(p.area, '▦ Area shaded under a line')}${li(false, 'Answer the questions')}</ul>
          <p class="lab-progress-text">Change the height with ▲ ▼ under the track. Every run goes in the notebook below.</p>`
      : `<ul class="lab-steps">${li(p.n >= 3, `Three routes, distance and displacement (${Math.min(3, p.n)} of 3)`)}
          ${li(p.track, '🏟️ Once round the running track')}${li(false, 'Answer the questions')}</ul>
          <p class="lab-progress-text">Pick a route under the map, then jog it. Every route goes in the notebook below.</p>`;
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('motion');
    const all = D().DISCOVERIES;
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  // ── Controls under the track ──
  function _renderControls() {
    const c = $('lab-motion-controls');
    if (!c) return;
    const b = _b;
    const tool = (act, icon, label, pressed) =>
      `<button type="button" class="lab-tool" data-act="${act}"${pressed === undefined ? '' : ` aria-pressed="${pressed}"`}><span aria-hidden="true">${icon}</span>${esc(label)}</button>`;
    const seg = (k, label, opts) => `<div class="lab-motion-optrow"><span>${esc(label)}</span>
      <div class="lab-motion-seg" role="group" aria-label="${esc(label)}">${opts.map(([v, t]) =>
        `<button type="button" data-set="${k}" data-v="${v}" aria-pressed="${b[k] === v}">${esc(t)}</button>`).join('')}</div></div>`;
    let html = '';
    if (b.setup === 'ramp') {
      const sub = b.h === 0 ? 'flat track' : b.h === 2 ? 'cancels friction' : `slope about ${Math.round(D().angleDeg(b.h))}°`;
      html += `<div class="lab-motion-hrow" role="group" aria-label="Height of the ramp">
          <button type="button" class="lab-btn lab-motion-hbtn" data-h="-1" aria-label="Lower the ramp">▼ Lower</button>
          <p class="lab-motion-hval"><b>${b.h} cm</b><small>${esc(sub)}</small></p>
          <button type="button" class="lab-btn lab-motion-hbtn" data-h="1" aria-label="Raise the ramp">▲ Raise</button>
        </div>
        ${seg('start', 'Start', [['rest', '✋ From rest'], ['push', '👋 Pushed']])}
        ${seg('timer', 'Timing', [['gates', '⚡ Light gates'], ['stopwatch', '⏱️ Stopwatch']])}
        ${seg('meaning', 'Gradient means', [['accel', 'Acceleration'], ['speed', 'Speed']])}
        <div class="lab-motion-tools">
          ${tool('run', '▶', b.start === 'push' ? 'Push the trolley' : 'Release the trolley')}
          ${tool('gradient', '📐', 'Find the gradient', b.show === 'gradient')}
          ${tool('area', '▦', 'Shade the area', b.show === 'area')}
          ${tool('clear', '🧽', 'Clear the graph')}
        </div>`;
    } else {
      const R = D().ROUTES;
      html += `<div class="lab-motion-routes" role="group" aria-label="Route">${Object.keys(R).map(id =>
          `<button type="button" class="lab-btn lab-motion-route" data-route="${id}" aria-pressed="${b.route === id}"><span>${R[id].icon} ${esc(R[id].name)}</span><small>${esc(R[id].meta)}</small></button>`).join('')}</div>
        ${seg('disp', 'Displacement is measured', [['straight', '📏 Start → finish'], ['path', '〰️ Along the path']])}
        <div class="lab-motion-tools">${tool('walk', '🚶', 'Jog the route')}</div>`;
    }
    c.innerHTML = html;
    _highlight();
  }

  function _intro() {
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🛷</p>
        <h2 id="lab-ov-title">Welcome to the Motion Track</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first run, one tap at a time.</li>
          <li><b>Experiment.</b> Raise the ramp, let the trolley go, and watch its speed-time graph draw itself.</li>
          <li><b>Read the graph like the exam.</b> The gradient is the acceleration; the area under the line is the distance.</li>
          <li><b>Get it wrong safely.</b> Time it by hand, misread the gradient, mix up distance and displacement - or forget the stop block - and see what would have happened.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${D().DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="ramp" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('motion'); st.intro = true; Labs.persist();
        _coach('Tap ▶ under the track to let the trolley go - and watch the graph.');
      } });
  }

  function _help() {
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Motion Track works</h2>
      <div class="lab-help">
        <section><h3>Using the track</h3><ul>
          <li>▲ ▼ change the height of the raised end of the ramp (0-50 cm).</li>
          <li>▶ lets the trolley go (from rest, or with a gentle push). A data logger draws its speed-time graph.</li>
          <li>📐 draws a triangle on the line and works out its gradient; ▦ shades the area under the line.</li>
          <li>The walk on the field compares distance with displacement.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Clamp a stop block (or a padded catch box) at the bottom of every ramp.</li>
          <li>Never catch a moving trolley by hand, and keep feet and bags clear of the end of the bench.</li>
          <li>Never ride on or throw a trolley.</li></ul></section>
        <section><h3>The rules</h3><ul>
          <li>speed = distance ÷ time (m/s) · average speed = total distance ÷ total time</li>
          <li>acceleration = change in velocity ÷ time taken (m/s²)</li>
          <li>speed-time graph: gradient = acceleration, area under the line = distance</li>
          <li>horizontal line = constant speed; line on the time axis = at rest</li>
          <li>scalars (distance, speed) have size only; vectors (displacement, velocity) have size and direction</li></ul>
          <p class="lab-hint">${esc(D().MODEL_NOTE)}</p></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the track</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_b) return;
    const b = _b;
    const chip = $('lab-motion-chip');
    if (chip) {
      if (b.setup === 'walk') {
        const R = D().ROUTES[b.route];
        chip.innerHTML = _walk ? `⏱ t = ${Math.round(_walk.f * _walk.w.time)} s <small>speeded up</small>` : `${R.icon} ${esc(R.name)} <small>${esc(R.meta)}</small>`;
      } else if (_run) {
        const s = D().state(_run.p, _run.t);
        chip.innerHTML = `⏱ t = ${f2(_run.t)} s · v = ${f2(s.v)} m/s <small>data logger</small>`;
      } else chip.innerHTML = `🛷 Ramp ${b.h} cm <small>${b.start === 'push' ? 'pushed' : 'from rest'} · ${b.timer === 'gates' ? 'light gates' : 'stopwatch'}</small>`;
    }
    const st = $('lab-motion-status');
    if (st) {
      const chips = [];
      if (b.setup === 'ramp') {
        if (!b.block) chips.push('<span class="lab-chip is-danger">🧱 No stop block!</span>');
        if (b.timer === 'stopwatch') chips.push('<span class="lab-chip is-warm">⏱️ Timed by hand</span>');
        if (b.meaning === 'speed') chips.push('<span class="lab-chip is-warm">📈 Gradient read as a speed</span>');
      } else if (b.disp === 'path') chips.push('<span class="lab-chip is-warm">〰️ Displacement along the path</span>');
      st.innerHTML = chips.join('');
    }
    const c = $('lab-motion-contents');
    if (c) {
      const L = b.last;
      if (b.setup === 'walk') {
        const w = b.walked && b.walked.id === b.route && b.walked.w;
        c.textContent = _walk ? 'Jogging…' : w ? `Distance ${f1(w.distance)} m · displacement ${f1(w.displacement)} m${w.displacement > 0 ? ' ' + w.dir : ''} · time ${Math.round(w.time)} s`
          : 'Pick a route, then tap 🚶 Jog the route.';
      } else if (_run) c.textContent = 'Rolling… the data logger is drawing the speed-time graph.';
      else if (L && b.show === 'gradient') c.textContent = `Your reading: gradient = ${f2(b.grad.dv)} m/s ÷ ${f1(b.grad.dt)} s = ${f2(b.grad.a)} ${L.row.aBad ? 'm/s ✗' : 'm/s²'}`;
      else if (L && b.show === 'area') c.textContent = `Your reading: area under the line = ${b.area.working}`;
      else if (L) c.textContent = L.p.moving ? `Run ${L.row.n}: 2.0 m in ${f2(L.row.t)} s${L.row.timer === 'stopwatch' ? ' (by hand)' : ''} · speed at the end ${f2(L.row.vEnd)} m/s` : `Run ${L.row.n}: the trolley stayed at rest.`;
      else c.textContent = `Ready: ramp raised ${b.h} cm. Tap ▶ to let the trolley go.`;
    }
    if (_cv) _cv.setAttribute('aria-label', b.setup === 'walk' ? `A map of the school field showing the route: ${D().ROUTES[b.route].name.toLowerCase()}`
      : `A trolley on a ramp raised ${b.h} cm, and its speed-time graph`);
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done });
  }

  // ══ Drawing ══════════════════════════════════
  const COL = { wall: '#EEF3F4', wall2: '#D9E4E7', bench: '#B58E62', benchEdge: '#8C6A45', floor: '#8E9BA1', track: '#66767F', mark: '#26343B',
                trolley: '#D64541', wheel: '#1E2528', block: '#6B4A2B', gate: '#3A4A52', beam: '#FF3B30', beamOff: '#7A3B38',
                paper: '#FFFFFF', grid: '#E3EBEE', grid2: '#C5D3D8', axis: '#1F2A30', ink: '#1F2A30', muted: '#5B6B73',
                line: '#C0262D', ghost: 'rgba(90,110,120,0.5)', tri: '#1D6A96', area: 'rgba(35,115,74,0.25)', areaEdge: '#23734A', bad: '#C0262D',
                grass: '#5E9E5A', grass2: '#67A763', path: 'rgba(255,255,255,0.95)', trail: '#FFD54A', disp: '#E53935', lane: '#B5533C' };
  const FONT = (w, s) => `${w} ${s}px system-ui, -apple-system, "Segoe UI", sans-serif`;

  function _draw(dt) {
    if (!_cx || !_b) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_b.setup === 'walk') _drawField();
    else { _drawTrack(); _drawGraph(); }
    _drawFx(dt);
    c.restore();
  }

  // ── The track (top third of the canvas) ──
  function _tg() {
    const bot = Math.round(_H * 0.36);
    const benchY = bot - 30, floorY = bot - 3;
    const Lpx = _W - 100, s = D().sinTheta(_b.h), cs = Math.sqrt(1 - s * s);
    const end = [24 + Lpx, benchY - 3];
    const start = [end[0] - Lpx * cs, end[1] - Lpx * s];
    return { bot, benchY, floorY, Lpx, s, cs, start, end, edge: end[0] + 24, d: [cs, s], n: [s, -cs], k: Lpx / D().TRACK };
  }
  const _along = (g, x) => [g.start[0] + x * g.k * g.cs, g.start[1] + x * g.k * g.s];

  function _trolley(p, ang, cardOn) {
    const c = _cx;
    c.save();
    c.translate(p[0], p[1]);
    c.rotate(ang);
    c.fillStyle = COL.trolley; c.strokeStyle = '#7E1F1C'; c.lineWidth = 1.2;
    c.beginPath(); c.rect(-17, -15, 30, 10); c.fill(); c.stroke();
    if (cardOn) { c.fillStyle = '#1E2528'; c.fillRect(-6, -24, 10, 9); }
    c.fillStyle = COL.wheel;
    [-11, 7].forEach(x => { c.beginPath(); c.arc(x, -4, 4, 0, Math.PI * 2); c.fill(); });
    c.restore();
  }

  function _trolleyX() {
    if (_run) return D().state(_run.p, _run.t).x;
    if (_b.last && _b.last.p.moving) return _b.last.p.dist;
    return 0;
  }

  function _drawTrack() {
    const c = _cx, g = _tg(), b = _b, M = D();
    const bg = c.createLinearGradient(0, 0, 0, g.bot);
    bg.addColorStop(0, COL.wall); bg.addColorStop(1, COL.wall2);
    c.fillStyle = bg; c.fillRect(0, 0, _W, g.bot);
    c.fillStyle = COL.floor; c.fillRect(0, g.floorY, _W, g.bot - g.floorY);
    // bench and its legs
    c.fillStyle = COL.bench; c.fillRect(0, g.benchY, g.edge, 8);
    c.fillStyle = COL.benchEdge; c.fillRect(0, g.benchY + 8, g.edge, 2);
    c.fillRect(10, g.benchY + 10, 6, g.floorY - g.benchY - 10); c.fillRect(g.edge - 14, g.benchY + 10, 6, g.floorY - g.benchY - 10);
    // books under the raised end
    if (b.h > 0) {
      const h = g.benchY - g.start[1] - 2, n = Math.max(1, Math.round(h / 9));
      for (let k = 0; k < n; k++) {
        c.fillStyle = ['#2E6DA4', '#C9A227', '#7B4B94', '#3C8D5A'][k % 4];
        c.fillRect(g.start[0] - 6, g.benchY - (k + 1) * h / n, 22, h / n - 1);
      }
      // Under the ramp, only when there is room (the chip always says the height).
      if (g.Lpx * g.s >= 22) {
        c.fillStyle = COL.muted; c.font = FONT(700, 10); c.textAlign = 'left';
        c.fillText(`${b.h} cm`, g.start[0] + 20, g.benchY - 5);
      }
    }
    // the track
    c.strokeStyle = COL.track; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(g.start[0], g.start[1]); c.lineTo(g.end[0], g.end[1]); c.stroke();
    // marks every 0.5 m
    c.font = FONT(600, 9); c.textAlign = 'center'; c.fillStyle = COL.mark; c.strokeStyle = COL.mark; c.lineWidth = 1.2;
    for (let x = 0; x <= M.TRACK + 1e-9; x += M.MARK) {
      const p = _along(g, x);
      c.beginPath(); c.moveTo(p[0] + g.n[0] * 4, p[1] + g.n[1] * 4); c.lineTo(p[0] - g.n[0] * 5, p[1] - g.n[1] * 5); c.stroke();
      if (x > 0) c.fillText(x === M.TRACK ? '2.0 m' : x.toFixed(1), p[0] - g.n[0] * 13, p[1] - g.n[1] * 13 + 3);
    }
    // light gates
    const tx = _trolleyX();
    if (b.timer === 'gates') {
      for (let x = M.MARK; x <= M.TRACK + 1e-9; x += M.MARK) {
        const p = _along(g, x), q = [p[0] + g.n[0] * 30, p[1] + g.n[1] * 30];
        c.strokeStyle = COL.gate; c.lineWidth = 2;
        c.beginPath(); c.moveTo(p[0] + g.n[0] * 2, p[1] + g.n[1] * 2); c.lineTo(q[0], q[1]); c.stroke();
        c.fillStyle = COL.gate; c.fillRect(q[0] - 4, q[1] - 3, 8, 6);
        const hit = (_run || (b.last && b.last.p.moving)) && Math.abs(tx - x) < 0.08;
        c.fillStyle = hit ? COL.beam : COL.beamOff;
        c.beginPath(); c.arc(q[0], q[1] + 7, hit ? 3.5 : 2, 0, Math.PI * 2); c.fill();
      }
    }
    // stop block
    if (b.block) {
      const e = g.end, n = g.n, d = g.d;
      c.fillStyle = COL.block;
      c.beginPath(); c.moveTo(e[0] + d[0] * 2, e[1] + d[1] * 2); c.lineTo(e[0] + d[0] * 9, e[1] + d[1] * 9);
      c.lineTo(e[0] + d[0] * 9 + n[0] * 16, e[1] + d[1] * 9 + n[1] * 16); c.lineTo(e[0] + d[0] * 2 + n[0] * 16, e[1] + d[1] * 2 + n[1] * 16); c.closePath(); c.fill();
    } else {
      c.font = '16px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText('👟', g.edge + 26, g.floorY - 2);
    }
    // the trolley (while it is falling the effect draws it)
    if (!_fall) {
      const p = _along(g, Math.min(tx, M.TRACK)), back = 1;
      _trolley([p[0] - g.d[0] * back + g.n[0] * 1, p[1] - g.d[1] * back + g.n[1] * 1], Math.atan2(g.s, g.cs), b.timer === 'gates');
    }
  }

  // ── The speed-time graph (bottom two thirds) ──
  function _gg() {
    const top = Math.round(_H * 0.36);
    return { top, x0: 44, x1: _W - 14, y0: _H - 30, y1: top + 30 };
  }
  function _drawGraph() {
    const c = _cx, g = _gg(), A = D().AXES, b = _b;
    const X = t => g.x0 + t / A.tMax * (g.x1 - g.x0), Y = v => g.y0 - v / A.vMax * (g.y0 - g.y1);
    c.fillStyle = COL.paper; c.fillRect(0, g.top, _W, _H - g.top);
    c.fillStyle = COL.ink; c.font = FONT(800, 11); c.textAlign = 'left';
    c.fillText('Speed-time graph (data logger)', 10, g.top + 16);
    if (b.timer === 'stopwatch') {
      const late = D().REACT[((_swK % 3) + 3) % 3];
      const shown = _run ? Math.max(0, _run.t - late) : (b.last && b.last.row.timer === 'stopwatch' && b.last.p.moving ? b.last.row.t : 0);
      c.fillStyle = '#1F2A30'; c.fillRect(_W - 78, g.top + 4, 68, 18);
      c.fillStyle = '#9CF29C'; c.font = FONT(700, 11); c.textAlign = 'center';
      c.fillText(`⏱ ${f2(shown)} s`, _W - 44, g.top + 17);
    }
    // grid
    for (let t = 0; t <= A.tMax + 1e-9; t += A.tStep) {
      const major = Math.abs(t / A.tLabel - Math.round(t / A.tLabel)) < 1e-9;
      c.strokeStyle = major ? COL.grid2 : COL.grid; c.lineWidth = 1;
      c.beginPath(); c.moveTo(X(t), g.y1); c.lineTo(X(t), g.y0); c.stroke();
    }
    for (let v = 0; v <= A.vMax + 1e-9; v += A.vStep) {
      const major = Math.abs(v / A.vLabel - Math.round(v / A.vLabel)) < 1e-9;
      c.strokeStyle = major ? COL.grid2 : COL.grid;
      c.beginPath(); c.moveTo(g.x0, Y(v)); c.lineTo(g.x1, Y(v)); c.stroke();
    }
    c.strokeStyle = COL.axis; c.lineWidth = 2;
    c.beginPath(); c.moveTo(g.x0, g.y1 - 6); c.lineTo(g.x0, g.y0); c.lineTo(g.x1 + 4, g.y0); c.stroke();
    c.fillStyle = COL.ink; c.font = FONT(600, 10);
    c.textAlign = 'center';
    for (let t = 0; t <= A.tMax + 1e-9; t += A.tLabel) c.fillText(String(t), X(t), g.y0 + 13);
    c.textAlign = 'right';
    for (let v = 0; v <= A.vMax + 1e-9; v += A.vLabel) c.fillText(String(v), g.x0 - 5, Y(v) + 3.5);
    c.textAlign = 'center'; c.font = FONT(700, 10);
    c.fillText('time / s', (g.x0 + g.x1) / 2, g.y0 + 26);
    c.save(); c.translate(13, (g.y0 + g.y1) / 2); c.rotate(-Math.PI / 2); c.fillText('speed / m/s', 0, 0); c.restore();

    const line = (p, tTo, col, w, drop) => {
      c.strokeStyle = col; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round';
      c.beginPath();
      if (!p.moving) { c.moveTo(X(0), g.y0 - 1.5); c.lineTo(X(Math.min(tTo, p.dur)), g.y0 - 1.5); }
      else {
        const t = Math.min(tTo, p.dur);
        c.moveTo(X(0), Y(p.u)); c.lineTo(X(t), Y(p.u + p.a * t));
        if (drop && t >= p.dur - 1e-9) c.lineTo(X(t), g.y0);
      }
      c.stroke();
    };
    b.ghost.forEach(p => line(p, p.dur, COL.ghost, 2, true));
    const L = b.last;
    if (L && b.show === 'area' && L.p.moving) {
      const p = L.p;
      c.fillStyle = COL.area; c.strokeStyle = COL.areaEdge; c.lineWidth = 1;
      c.beginPath(); c.moveTo(X(0), g.y0); c.lineTo(X(0), Y(p.u)); c.lineTo(X(p.tEnd), Y(p.vEnd)); c.lineTo(X(p.tEnd), g.y0); c.closePath(); c.fill();
      c.fillStyle = COL.areaEdge; c.font = FONT(800, 11); c.textAlign = 'center';
      c.fillText(`area = ${f1(b.area.d)} m`, X(p.tEnd * 0.62), Y(Math.max(0.25, (p.u + p.vEnd) * 0.22)));
    }
    if (_run) {
      line(_run.p, _run.t, COL.line, 2.6, false);
      const s = D().state(_run.p, _run.t);
      c.fillStyle = COL.line; c.beginPath(); c.arc(X(Math.min(_run.t, _run.p.dur)), _run.p.moving ? Y(s.v) : g.y0 - 1.5, 4, 0, Math.PI * 2); c.fill();
    } else if (L) line(L.p, L.p.dur, COL.line, 2.6, true);
    if (L && b.show === 'gradient') {
      const q = b.grad, col = L.row.aBad ? COL.bad : COL.tri;
      const A1 = [X(q.t1), Y(q.v1)], B1 = [X(q.t2), Y(q.v1)], C1 = [X(q.t2), Y(q.v2)];
      c.setLineDash([5, 4]); c.strokeStyle = col; c.lineWidth = 1.8;
      c.beginPath(); c.moveTo(A1[0], A1[1]); c.lineTo(B1[0], B1[1]); c.lineTo(C1[0], C1[1]); c.stroke(); c.setLineDash([]);
      c.fillStyle = col; c.font = FONT(700, 10);
      // Inside the triangle when its base is on the time axis (the tick labels
      // sit below it); otherwise on the side of the base away from the line.
      const above = q.v1 < 0.3 || q.dv < 0;
      c.textAlign = 'center'; c.fillText(`Δt = ${f1(q.dt)} s`, (A1[0] + B1[0]) / 2, B1[1] + (above ? -6 : 13));
      if (Math.abs(q.dv) > 1e-9) {
        c.textAlign = B1[0] > _W - 90 ? 'right' : 'left';
        c.fillText(`Δv = ${f2(q.dv)} m/s`, B1[0] + (B1[0] > _W - 90 ? -6 : 6), (B1[1] + C1[1]) / 2 + 3);
      }
      c.font = FONT(800, 11); c.textAlign = 'left';
      c.fillText(`gradient = ${f2(q.a)} ${L.row.aBad ? 'm/s ✗' : 'm/s²'}`, g.x0 + 8, g.y1 + 2);
    }
  }

  // ── The school field ──
  function _fieldMap() {
    const R = D().ROUTES[_b.route], pts = R.pts;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
    const w = Math.max(maxx - minx, 30), h = Math.max(maxy - miny, 30);
    const top = 44, bot = _H - 40;
    const s = Math.min((_W - 80) / w, (bot - top) / h);
    const cxW = (minx + maxx) / 2, cyW = (miny + maxy) / 2, cyS = (top + bot) / 2;
    return { R, pts, s, P: p => [_W / 2 + (p[0] - cxW) * s, cyS - (p[1] - cyW) * s] };
  }
  function _pointAt(pts, frac) {
    const total = D().pathLength(pts);
    let left = total * Math.max(0, Math.min(1, frac));
    for (let k = 1; k < pts.length; k++) {
      const a = pts[k - 1], b = pts[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (left <= L) return { p: [a[0] + (b[0] - a[0]) * left / (L || 1), a[1] + (b[1] - a[1]) * left / (L || 1)], k };
      left -= L;
    }
    return { p: pts[pts.length - 1], k: pts.length - 1 };
  }
  function _drawField() {
    const c = _cx, m = _fieldMap(), b = _b;
    c.fillStyle = COL.grass; c.fillRect(0, 0, _W, _H);
    let step = 10;
    while (step * m.s < 18) step *= 2;
    const o = m.P([0, 0]);
    c.fillStyle = COL.grass2;
    for (let k = -40; k < 40; k += 2) { const x = o[0] + k * step * m.s; if (x > -step * m.s && x < _W) c.fillRect(x, 0, step * m.s, _H); }
    c.strokeStyle = 'rgba(255,255,255,0.18)'; c.lineWidth = 1;
    for (let k = -40; k <= 40; k++) {
      const x = o[0] + k * step * m.s, y = o[1] - k * step * m.s;
      if (x >= 0 && x <= _W) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, _H); c.stroke(); }
      if (y >= 0 && y <= _H) { c.beginPath(); c.moveTo(0, y); c.lineTo(_W, y); c.stroke(); }
    }
    // scale bar and compass
    c.fillStyle = '#fff'; c.fillRect(12, _H - 22, step * m.s, 3);
    c.font = FONT(700, 10); c.textAlign = 'left'; c.fillText(`${step} m`, 12, _H - 27);
    c.textAlign = 'center'; c.fillText('N', _W - 20, _H - 42);
    c.strokeStyle = '#fff'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(_W - 20, _H - 14); c.lineTo(_W - 20, _H - 36); c.lineTo(_W - 25, _H - 29); c.moveTo(_W - 20, _H - 36); c.lineTo(_W - 15, _H - 29); c.stroke();
    // the route
    const scr = m.pts.map((p, k) => { const q = m.P(p); return (b.route === 'back' && k === 2) ? [q[0], q[1] + 6] : q; });
    if (b.route === 'back') scr[1] = [scr[1][0], scr[1][1] + 3];
    if (b.route === 'track') {
      c.strokeStyle = COL.lane; c.lineWidth = 12; c.lineJoin = 'round';
      c.beginPath(); scr.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
    }
    c.setLineDash([6, 5]); c.strokeStyle = COL.path; c.lineWidth = 2;
    c.beginPath(); scr.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.setLineDash([]);
    // how far along
    const done = b.walked && b.walked.id === b.route;
    const frac = _walk ? _walk.f : done ? 1 : 0;
    if (frac > 0) {
      const at = _pointAt(m.pts, frac);
      const trail = scr.slice(0, at.k);
      let head = m.P(at.p);
      if (b.route === 'back' && at.k === 2) head = [head[0], head[1] + 6 * ((at.p[0] <= 40 ? (40 - at.p[0]) / 40 : 0))];
      c.strokeStyle = COL.trail; c.lineWidth = 4; c.lineCap = 'round';
      c.beginPath(); trail.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.lineTo(head[0], head[1]); c.stroke();
      c.font = '18px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('🏃', head[0], head[1] - 10); c.textBaseline = 'alphabetic';
      c.fillStyle = '#fff'; c.font = FONT(800, 11);
      c.fillText(`distance so far: ${f1(frac * D().walk(b.route).distance)} m`, _W / 2, _H - 8);
    }
    // start and finish
    const S0 = scr[0], F0 = scr[scr.length - 1];
    c.fillStyle = '#1B5E20'; c.beginPath(); c.arc(S0[0], S0[1], 6, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff'; c.font = FONT(800, 10); c.textAlign = 'center';
    c.fillText(Math.hypot(F0[0] - S0[0], F0[1] - S0[1]) < 10 ? 'start = finish' : 'start', S0[0], S0[1] + 18);
    if (Math.hypot(F0[0] - S0[0], F0[1] - S0[1]) >= 10) { c.font = '16px system-ui, sans-serif'; c.fillText('🏁', F0[0] + 4, F0[1] - 6); }
    // the displacement, once the route is done
    if (done && !_walk) {
      const w = b.walked.w, a = m.P(m.pts[0]), z = m.P(m.pts[m.pts.length - 1]);
      c.strokeStyle = COL.disp; c.fillStyle = COL.disp; c.lineWidth = 3.5;
      if (w.displacement < 1e-6) {
        c.beginPath(); c.arc(a[0], a[1], 13, 0, Math.PI * 2); c.stroke();
        c.font = FONT(800, 11); c.textAlign = 'center';
        c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,0.55)'; c.strokeText('displacement = 0 m', a[0], a[1] - 20); c.fillText('displacement = 0 m', a[0], a[1] - 20);
      } else {
        const u = [(z[0] - a[0]), (z[1] - a[1])], L = Math.hypot(u[0], u[1]), e = [u[0] / L, u[1] / L];
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(z[0] - e[0] * 4, z[1] - e[1] * 4); c.stroke();
        c.beginPath(); c.moveTo(z[0], z[1]); c.lineTo(z[0] - e[0] * 12 - e[1] * 6, z[1] - e[1] * 12 + e[0] * 6); c.lineTo(z[0] - e[0] * 12 + e[1] * 6, z[1] - e[1] * 12 - e[0] * 6); c.closePath(); c.fill();
        const mid = [(a[0] + z[0]) / 2 + e[1] * 16, (a[1] + z[1]) / 2 - e[0] * 16 + 4];
        c.font = FONT(800, 11); c.textAlign = 'center';
        c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,0.55)';
        const txt = `displacement ${f1(w.displacement)} m`;
        c.strokeText(txt, Math.max(70, Math.min(_W - 70, mid[0])), mid[1]); c.fillText(txt, Math.max(70, Math.min(_W - 70, mid[0])), mid[1]);
      }
    }
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let k = _fx.length - 1; k >= 0; k--) {
      const f = _fx[k];
      f.t += dt;
      const p = Math.min(1, f.t / f.dur);
      if (f.type === 'mark') {
        c.strokeStyle = `rgba(192,38,45,${0.9 * Math.sin(Math.PI * p)})`; c.lineWidth = 5;
        c.strokeRect(3, _b.setup === 'walk' ? 3 : _gg().top + 3, _W - 6, _H - (_b.setup === 'walk' ? 6 : _gg().top + 6));
      } else if (f.type === 'fall' && _fall) {
        const g = _tg(), v = _fall.v * g.k, t = f.t, grav = 10 * g.k;
        let x = g.end[0] + g.d[0] * v * t, y = g.end[1] + g.d[1] * v * t + 0.5 * grav * t * t;
        const landed = y >= g.floorY - 4;
        if (landed) y = g.floorY - 4;
        _trolley([x, y], landed ? 0.5 : Math.atan2(g.d[1] * v + grav * t, g.d[0] * v), true);
        if (landed || p > 0.5) {
          c.font = FONT(900, 18); c.textAlign = 'center';
          c.lineWidth = 4; c.strokeStyle = '#1B2A24'; c.strokeText('CRASH!', Math.min(_W - 40, x), g.floorY - 30);
          c.fillStyle = '#FF8C42'; c.fillText('CRASH!', Math.min(_W - 40, x), g.floorY - 30);
        }
      }
      if (f.t >= f.dur) { _fx.splice(k, 1); if (f.done) f.done(); }
    }
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
    _clock += dt;
    const moving = !!(_run || _walk);
    _step(dt);
    _draw(dt);
    _uiAcc += dt;
    if (moving || _uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  // Deterministic stepping for the headless tests: runs, walks and effects
  // finish at once, and simulated seconds pass without waiting for real ones.
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let k = 0; k < n; k++) _step(0.05); _readouts(); }
  function _debug() {
    const b = _b || _newBench();
    return { setup: b.setup, h: b.h, start: b.start, timer: b.timer, block: b.block, meaning: b.meaning, route: b.route, disp: b.disp,
             busy: _busy, panel: _panel, running: !!_run, runT: _run ? _run.t : null, walking: !!_walk, walkF: _walk ? _walk.f : null,
             show: b.show, fall: !!_fall, fx: _fx.length,
             last: b.last && Object.assign({ a: b.last.p.a, dur: b.last.p.dur }, b.last.row),
             grad: b.grad, area: b.area && { d: b.area.d, shape: b.area.shape },
             guide: _guide && { id: _guide.id, step: _guide.step },
             runs: _runs.map(r => ({ n: r.n, h: r.h, start: r.start, timer: r.timer, t: r.t, avg: r.avg, vEnd: r.vEnd, a: r.a, aBad: r.aBad, d: r.d, ok: r.ok })),
             walks: _walks.map(r => ({ route: r.route, distance: r.distance, displacement: r.displacement, recorded: r.recorded, ok: r.ok })),
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, heights: Object.keys(_mission.heights).map(Number), area: _mission.area,
                                    routes: Object.keys(_mission.routes), mistakes: _mission.mistakes, hazards: _mission.hazards, success: _mission.success } };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, place, setHeight, stepHeight, setOpt, setBlock, setRoute,
           run, gradient, area, walk, clearGraph, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMotion = LabMotion;
