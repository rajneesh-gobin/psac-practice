'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Food Tests (Science, Grade 8)
//
//  A rack of six test tubes over a long water bath, a Bunsen burner under the
//  bath, a spatula and five tests: iodine (starch), Benedict’s (reducing sugar,
//  heated), Biuret (protein), the grease spot and the ethanol test (fat).
//  Guided experiments, two Missions, Discoveries and mistakes that teach.
//
//  ⚠ Every outcome comes from lab_food_data.js (LabFoodData). This file only
//    moves time along and draws it. If a tube shows the wrong colour, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here touches .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: time still passes and colours still change,
//    but nothing moves and every effect applies at once.
//  ⚠ Leaving the Labs screen stops the loop; coming back restarts it (a
//    MutationObserver on the screen - the Rusting Lab found the loop dead).
//  ⚠ Every colour on screen is also said in words (colour-blind pupils).
// ══════════════════════════════════════════════
const LabFood = (() => {
  const P = () => LabFoodData;
  const ID = 'food';
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { food: 0.45, drop: 0.4, rub: 0.5, shake: 0.7, spit: 1.0, splash: 0.95, fire: 1.15, taste: 0.8 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _obs = null, _clock = 0;
  let _rack = null, _burner = false, _bathT = 25, _goggles = false, _spatula = null;
  let _panel = 'sandbox', _shelf = 'food', _mission = null, _guide = null;
  let _reads = [], _fx = [], _shake = 0, _busy = false, _instant = false, _colors = null, _tipIdx = -1;

  // The grade the lab is used at (LAB_SPEC §9). Only Grade 8 exists here.
  const _grade = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 0;
    return P().GRADES.includes(g) ? g : P().GRADES[0];
  };
  const _mine = list => P().forGrade(list, _grade());

  const _newSlot = () => ({ food: null, trace: null, test: null, t: 0, heat: 0, T: P().ROOM, bath: false, dry: false, fired: {} });
  function _resetRack() {
    _rack = { slots: Array.from({ length: P().SLOTS }, _newSlot), sel: 0, warned: {} };
    _spatula = null; _fx = []; _busy = false; _shake = 0;
  }
  const _cur = () => _rack.slots[_rack.sel];
  const _res = s => (s && s.food && s.test ? P().resultFor(s.test, s.food, s.trace, { heat: s.heat, t: s.t, dry: s.dry }) : null);
  const _fname = id => P().FOODS[id].name;
  const _fshort = id => P().FOODS[id].short;
  const _cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-food">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade ${esc(_grade())}</span><h1>Food Tests</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-goggles" class="lab-goggles" data-act="goggles" aria-pressed="false"><span aria-hidden="true">🥽</span><span id="lab-goggles-label">Goggles off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the food tests work">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-food-slots" id="lab-food-slots" role="group" aria-label="Choose a test tube"></div>
          <div class="lab-canvas-wrap" id="lab-food-stage">
            <canvas id="lab-food-canvas" role="img" aria-label="A rack of six test tubes above a water bath and a Bunsen burner"></canvas>
            <div class="lab-chip lab-food-now" id="lab-food-now"></div>
            <div class="lab-status" id="lab-status"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <p class="lab-task-strip">Add a sample to the tube, then add the right reagent — compare with the control!</p>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-food-tools" id="lab-food-tools">
            <button type="button" class="lab-tool" data-act="bath" id="lab-food-bath"><span aria-hidden="true">🛁</span><em>Water bath</em></button>
            <button type="button" class="lab-tool" data-act="read"><span aria-hidden="true">🔎</span>Read result</button>
            <button type="button" class="lab-tool" data-act="rinse"><span aria-hidden="true">🧽</span>Rinse spatula</button>
            <button type="button" class="lab-tool" data-act="burner" id="lab-food-burner"><span aria-hidden="true">🔥</span><em>Light burner</em></button>
            <button type="button" class="lab-tool" data-act="flame"><span aria-hidden="true">🕯️</span>Heat in flame</button>
            <button type="button" class="lab-tool" data-act="taste"><span aria-hidden="true">👅</span>Taste it</button>
            <button type="button" class="lab-tool" data-act="clean"><span aria-hidden="true">🗑️</span>Clean rack</button>
          </div>
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

  function mount(root) {
    _root = root;
    if (!_rack) _resetRack();
    root.innerHTML = _shellHTML();
    _cv = $('lab-food-canvas');
    _cx = _cv.getContext('2d');
    _cv.addEventListener('click', _canvasTap);
    _resize();
    _wire();
    _renderPanel();
    _syncGoggles();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or test any food you like.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    // ⚠ Once the loop sees it is off-screen it stops for good - coming back to
    //   the Labs screen must start it again.
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

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), bench: v('--lab-bench', '#B9CAC6'),
                rack: v('--lab-rack', '#8FA39E'), glass: v('--lab-glass', 'rgba(34,58,68,.62)'),
                hi: v('--lab-glass-hi', 'rgba(255,255,255,.75)'), ink: v('--lab-ink', '#14211D'), accent: v('--lab-accent', '#1D6A96') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(380, Math.max(270, w * 0.82)));
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
      const sl = e.target.closest('[data-slot]');
      if (sl) { select(+sl.dataset.slot); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const add = e.target.closest('[data-add]');
      if (add) { if (add.dataset.add === 'food') addFood(add.dataset.id); else addTest(add.dataset.id); _showStage(); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const sh = e.target.closest('[data-shelf]');
      if (sh) { _shelf = sh.dataset.shelf; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
    };
  }
  function _canvasTap(e) {
    const r = _cv.getBoundingClientRect();
    const i = Math.floor((e.clientX - r.left) / (r.width / P().SLOTS));
    if (i >= 0 && i < P().SLOTS) select(i + 1);
  }
  // On a phone the shelf sits below the rack: bring the rack back into view.
  function _showStage() {
    const z = $('lab-food-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'goggles': goggles(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'bath': bath(); break;
      case 'read': read(); break;
      case 'rinse': rinse(); break;
      case 'burner': burner(); break;
      case 'flame': flame(); break;
      case 'taste': taste(); break;
      case 'clean': clean(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free testing. The shelf is all yours.'); _renderPanel(); break;
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
    const f = P().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Actions ══════════════════════════════════
  function goggles() {
    _goggles = !_goggles;
    _syncGoggles();
    _coach(_goggles ? 'Goggles on. You are ready for Biuret solution and for heating.'
                    : 'Goggles off. You will need them again for Biuret solution and for heating.');
    if (_goggles) _guideEvent('goggles');
    else _highlight();
  }
  function _syncGoggles() {
    const b = $('lab-goggles');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_goggles));
    b.classList.toggle('is-on', _goggles);
    const l = $('lab-goggles-label');
    if (l) l.textContent = _goggles ? 'Goggles on' : 'Goggles off';
  }

  function _guard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    return true;
  }

  function select(n) {
    if (!(n >= 1 && n <= P().SLOTS)) return;
    _rack.sel = n - 1;
    const s = _cur();
    if (!s.food) _shelf = 'food';
    else if (!s.test) _shelf = 'test';
    _renderPanel();
    _readouts();
    _guideEvent('slot:' + n);
  }

  function addFood(id) {
    const F = P().FOODS[id];
    if (!F || !_guard()) return;
    if (F.missionOnly && !(_mission && _mission.id === F.missionOnly)) return;
    const s = _cur(), n = _rack.sel + 1;
    if (s.food) { _coach(`Tube ${n} already has ${_fshort(s.food)} in it. Choose an empty tube, or tap “Clean rack”.`); return; }
    _busy = true;
    _fxAdd('food', () => {
      _busy = false;
      s.food = id;
      if (_spatula && _spatula !== id) s.trace = _spatula;
      _spatula = id;
      _shelf = 'test';
      _coach(`Tube ${n}: ${F.name.toLowerCase()}. Now choose a test from the Tests shelf.`);
      _renderPanel();
      _readouts();
      _guideEvent('food:' + id);
    }, { i: _rack.sel, color: F.swatch });
  }

  function addTest(id) {
    const T = P().TESTS[id];
    if (!T || !_guard()) return;
    const s = _cur(), n = _rack.sel + 1;
    if (!s.food) { _coach(`Tube ${n} is empty. Add a food first - a small sample is enough.`); return; }
    if (s.test) { _coach(`Tube ${n} has already been tested with ${P().TESTS[s.test].short}. One test per tube - choose another tube.`); return; }
    if (T.corrosive && !_goggles) { _hazard('biuret_eyes', { tube: n }); return; }
    if (T.flammable && _burner) { _hazard('ethanol_flame', { lit: false }, () => { _burner = false; _coach('The fire is out and the burner is off. Now the ethanol test is safe.'); }); return; }
    _busy = true;
    _fxAdd(T.paper ? 'rub' : T.flammable ? 'shake' : 'drop', () => {
      _busy = false;
      s.test = id; s.t = 0; s.heat = 0; s.dry = false; s.fired = {};
      if (T.paper) s.bath = false;
      const r = _res(s);
      if (id === 'iodine' || id === 'ethanol') _coach(`${T.name}: ${r.word}. Tap “Read result” to record it.`);
      else if (id === 'benedicts') _coach('Blue Benedict’s solution. It only works hot: put the tube in the 🛁 water bath.');
      else if (id === 'biuret') _coach('Blue Biuret solution. Now wait a few minutes for the colour to come through.');
      else _coach('A wet spot on the filter paper. Let it dry, then hold it up to the light.');
      _renderPanel();
      _readouts();
      _guideEvent('test:' + id);
    }, { i: _rack.sel, color: T.swatch });
  }

  const _ethanolOut = () => _rack.slots.some(s => s.test === 'ethanol');

  function bath() {
    if (!_guard()) return;
    const s = _cur(), n = _rack.sel + 1;
    if (!s.food) { _coach(`Tube ${n} is empty - there is nothing to warm.`); return; }
    if (s.test === 'paper') { _coach('That is filter paper, not a tube - it cannot go in the water bath.'); return; }
    if (s.bath) { s.bath = false; _coach(`Tube ${n} is out of the water bath. It will cool down.`); _readouts(); return; }
    if (s.test === 'ethanol' || (!_burner && _ethanolOut())) {
      _hazard('ethanol_flame', { lit: true }, () => { _burner = false; _coach('The fire is out. Never heat ethanol, and never light a burner while it is on the bench.'); });
      return;
    }
    s.bath = true;
    const lit = !_burner;
    _burner = true;
    _coach(`Tube ${n} is in the water bath${lit ? ' and the Bunsen burner is lit under it' : ''}. The bath warms to about ${P().BATH.temp} °C.`
      + (_goggles ? '' : ' Put your goggles on when you heat things.'));
    _readouts();
    _guideEvent('bath');
  }

  function burner() {
    if (!_guard()) return;
    if (_burner) {
      _burner = false;
      _coach('Burner off. The water bath will slowly cool.');
      _readouts();
      _guideEvent('burner-off');
      return;
    }
    if (_ethanolOut()) { _hazard('ethanol_flame', { lit: true }, () => { _burner = false; }); return; }
    _burner = true;
    _coach(`Burner lit under the water bath. It warms to about ${P().BATH.temp} °C.`);
    _readouts();
  }

  function flame() {
    if (!_guard()) return;
    const s = _cur(), n = _rack.sel + 1;
    if (!s.food || s.test === 'paper') { _coach('There is no tube of liquid to heat here.'); return; }
    _hazard('flame_heat', { tube: n }, () => { _rack.slots[n - 1] = _newSlot(); _coach(`Tube ${n} is empty now - the liquid shot out. Use the 🛁 water bath instead.`); _renderSlots(); });
  }

  function taste() {
    if (!_guard()) return;
    const s = _cur();
    if (!s.food) { _coach('There is nothing in this tube - and nothing in a lab is for tasting anyway.'); return; }
    _hazard('tasting', { food: _fname(s.food).toLowerCase() });
  }

  function rinse() {
    if (!_guard()) return;
    _spatula = null;
    _coach('The spatula is rinsed and dried - ready for the next food.');
    _readouts();
    _guideEvent('rinse');
  }

  function clean() {
    if (!_guard()) return;
    _resetRack();
    _shelf = 'food';
    _coach('A clean rack of six tubes and a clean spatula. What will you test?');
    _renderPanel();
    _readouts();
    _guideEvent('clean');
  }

  // ══ Reading a result ═════════════════════════
  function _cardFor(s, r, n) {
    const F = P().FOODS[s.food], T = P().TESTS[s.test];
    if (r.fromTrace) return ['dirty', { tube: n, food: _fshort(s.food), word: r.word, nutrient: P().NUTRIENTS[T.nutrient], trace: _fshort(s.trace) }];
    if (s.test === 'benedicts' && r.unheated && F.sugar > 0) return ['not_heated', { tube: n, food: _fshort(s.food), Food: _cap(_fshort(s.food)) }];
    if (s.test === 'biuret' && s.t < P().BIURET.readAfter && F.protein > 0) return ['too_soon', { tube: n, food: _fshort(s.food), word: r.word }];
    if (s.test === 'paper' && !s.dry && F.fat === 0) return ['wet_spot', { food: _fshort(s.food) }];
    if (r.finished && !_rack.warned[s.test]) {
      const same = _rack.slots.filter(x => x.food && x.test === s.test);
      if (same.length >= 2 && !same.some(x => x.food === 'water')) {
        _rack.warned[s.test] = true;
        return ['no_control', { n: same.length, test: P().TESTS[s.test].name }];
      }
    }
    return null;
  }

  function read() {
    if (!_guard()) return;
    const s = _cur(), n = _rack.sel + 1;
    if (!s.food) { _coach(`Tube ${n} is empty. Add a food and a test first.`); return; }
    if (!s.test) { _coach(`Tube ${n} has ${_fshort(s.food)} but no test yet. Choose one from the Tests shelf.`); return; }
    const r = _res(s), T = P().TESTS[s.test];
    const card = _cardFor(s, r, n);
    if (card) {
      _record(s, r, n, card[0]);
      _guideEvent('read');
      _card(card[0], card[1]);
      return;
    }
    if (!r.finished) {
      if (s.test === 'benedicts') _coach(s.heat > 0 ? 'Still heating - leave it in the water bath until the colour stops changing.'
                                                     : 'Benedict’s must be heated before you can read it. Put the tube in the 🛁 water bath.');
      else if (s.test === 'biuret') _coach('Give it a few minutes - the colour is still coming through.');
      else _coach('The spot is still wet. Wait for the paper to dry, then read it.');
      return;
    }
    _record(s, r, n, null);
    _coach(`Tube ${n}: ${_fshort(s.food)} with ${T.short} - ${r.word}. That means ${r.meaning}.`);
    P().discoveriesFor(s.test, s.food, r).forEach(_discover);
    _missionRead(s, r);
    _guideEvent('read');
  }

  function _record(s, r, n, card) {
    _reads.unshift({ tube: n, food: s.food, test: s.test, word: r.word, hex: r.hex, meaning: card ? 'mistake - see the card' : r.meaning, card });
    if (_reads.length > 30) _reads.length = 30;
    _refresh();
  }

  function _card(id, ctx) {
    const R = P().RESULTS[id];
    const v = x => (typeof x === 'function' ? x(ctx) : x);
    if (_mission) _mission.mistakes++;
    const d = P().DISCOVERIES.find(x => x.card === id);
    if (d) _discover(d.id);
    Labs.resultCard({ icon: R.icon, title: v(R.title), happened: v(R.happened), instead: v(R.instead), exam: R.exam,
      onClose: () => _guideEvent('card:' + id) });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id, ctx, after) {
    const H = P().HAZARDS[id];
    const st = Labs.store(ID);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _busy = true;
    _fxAdd(H.fx, () => {
      _busy = false;
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why, instead: H.instead, exam: H.exam,
        onClose: () => { if (after) after(); _readouts(); _draw(0); } });
    }, { i: _rack.sel });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt || !_rack) return;
    const D = P(), B = D.BATH;
    const target = _burner ? B.temp : D.ROOM;
    _bathT = _bathT < target ? Math.min(target, _bathT + B.warm * dt) : Math.max(target, _bathT - B.cool * dt);
    _rack.slots.forEach(s => {
      if (!s.food) return;
      const goal = s.bath ? _bathT : D.ROOM;
      s.T = s.T < goal ? Math.min(goal, s.T + 25 * dt) : Math.max(goal, s.T - 8 * dt);
      if (!s.test) return;
      s.t += dt;
      if (s.test === 'benedicts' && s.T >= D.BENEDICT.minT) {
        s.heat += dt;
        if (s.heat >= D.BENEDICT.heatFor && !s.fired.heated) {
          s.fired.heated = true;
          const r = _res(s);
          _coach(`The colour has stopped changing: ${r.word}. Tap “Read result”.`);
          _guideEvent('heated');
        }
      }
      if (s.test === 'biuret' && s.t >= D.BIURET.develop && !s.fired.developed) {
        s.fired.developed = true;
        _guideEvent('developed');
      }
      if (s.test === 'paper' && !s.dry && s.t >= D.PAPER.dry) {
        s.dry = true;
        _guideEvent('dry');
      }
    });
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = _mine(P().MISSIONS).find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _resetRack();
    _mission = { id, results: {}, hazards: 0, mistakes: 0, success: false };
    _panel = 'missions';
    _shelf = 'food';
    _coach(M.intro);
    _renderPanel();
    _readouts();
  }

  function _missionRead(s, r) {
    const ms = _mission;
    if (!ms || ms.success) return;
    const M = P().MISSIONS.find(x => x.id === ms.id);
    if (ms.id === 'name_it') {
      const ok = M.foods[s.food];
      if (ok && ok.includes(s.test) && r.positive && !r.fromTrace) ms.results[s.food] = { test: s.test, word: r.word };
      const done = Object.keys(M.foods).filter(f => ms.results[f]).length;
      if (done === Object.keys(M.foods).length) ms.success = true;
      else if (ok && ms.results[s.food]) _coach(`Recorded (${done} of 4). Rinse the spatula, choose a new tube and test the next food.`);
    } else if (ms.id === 'mystery') {
      if (s.food === 'mystery') ms.results[s.test === 'paper' || s.test === 'ethanol' ? 'fat' : s.test] = { word: r.word, positive: r.positive };
      if (s.food === 'water') ms.results.control = { word: r.word };
      if (M.needs.every(k => ms.results[k]) && ms.results.control) ms.success = true;
    }
    if (ms.success) { _coach('🎯 Mission complete! Tap “Answer the questions” to finish.'); Labs.confetti(); }
    _refresh();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = P().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.mistakes) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(ID);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} - none next time for an extra star.` : 'No safety mistakes. 🥽');
      lines.push(ms.mistakes ? `${ms.mistakes} test mistake${ms.mistakes === 1 ? '' : 's'} (a false result) - a clean run earns another star.` : 'Every result was a fair, clean test.');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  const _gdef = () => _guide && (_guide.def || P().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(P().GUIDES).find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _resetRack();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _readouts();
    _guideEnter();
    const z = $('lab-food-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step that is already true is skipped (goggles on, burner off, tube chosen,
  // spatula clean).
  const _already = on => (on === 'goggles' && _goggles) || (on === 'burner-off' && !_burner)
    || (on === 'rinse' && !_spatula) || (on.startsWith('slot:') && _rack.sel === +on.split(':')[1] - 1);

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    let s = G.steps[_guide.step];
    while (s && _already(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const kind = s.on.split(':')[0];
    const want = kind === 'food' ? 'food' : kind === 'test' ? 'test' : null;
    if (want && _shelf !== want) { _shelf = want; if (_panel === 'sandbox') _renderPanel(); }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
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

  function _autoStep(on) {
    const [k, id] = on.split(':');
    const D = P();
    if (k === 'goggles') return { on, say: 'Put on your goggles first.', btn: '🥽 Put on goggles' };
    if (k === 'slot') return { on, say: `Choose tube ${id} in the rack.`, btn: `Choose tube ${id}` };
    if (k === 'food') return { on, say: `Add ${D.FOODS[id].name.toLowerCase()} to the tube.`, btn: `Add ${D.FOODS[id].short}` };
    if (k === 'test') return { on, say: D.TESTS[id].how, btn: id === 'paper' ? '📄 Rub on filter paper' : id === 'ethanol' ? '🍶 Do the ethanol test' : `Add ${D.TESTS[id].short}` };
    if (k === 'bath') return { on, say: 'Stand the tube in the hot water bath.', btn: '🛁 Into the water bath' };
    if (k === 'burner-off') return { on, say: 'Turn the Bunsen burner off.', btn: '🧯 Turn the burner off' };
    if (k === 'rinse') return { on, say: 'Rinse the spatula before the next food.', btn: '🧽 Rinse the spatula' };
    if (k === 'read') return { on, say: 'Read the result.', btn: '🔎 Read the result' };
    if (k === 'clean') return { on, say: 'Clean the rack.', btn: '🗑️ Clean rack' };
    if (k === 'heated') return { on, say: 'Watch the colour change as it heats…' };
    if (k === 'developed') return { on, say: 'Wait a few minutes for the colour…' };
    if (k === 'dry') return { on, say: 'Leave the paper to dry…' };
    if (k === 'card') return { on, say: 'Read what went wrong.' };
    return { on, say: on };
  }

  function discoveryGuide(id) {
    const d = _mine(P().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discTest(d) {
    const t = d.rule && d.rule.test ? d.rule.test : (d.how.find(s => s.startsWith('test:')) || '').split(':')[1];
    return t ? P().TESTS[t] : null;
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
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Show me how →</button>
        </div>`, { cls: 'is-done' });
      return;
    }
    const T = _discTest(d);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${d.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(d.saw)}</p></section>
        ${T ? `<section class="lab-hz-sec"><h3>The test</h3><p class="lab-eq">${esc(T.eq)}</p></section>` : ''}
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store(ID);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _mine(P().GUIDES).find(g => !st.guides[g.id]);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${G.icon}</p>
        <p class="lab-rs-kicker">Experiment complete</p>
        <h2 id="lab-ov-title">${esc(G.title)}</h2>
        <section class="lab-hz-sec is-exam lab-done-lesson"><h3>What you found out</h3><p>${esc(G.lesson)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Test freely</button>
        ${G.adhoc
          ? '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="found" data-autofocus>Back to my discoveries →</button>'
          : next
            ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${next.id}" data-autofocus>Next: ${esc(next.title)} →</button>`
            : '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>'}
      </div>`, { cls: 'is-done' });
    _coach(`Experiment complete: ${G.title}. Pick the next one below, try a mission, or test freely.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or test freely.');
  }

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [kind, id] = s.on.split(':');
    const sel = kind === 'goggles' ? '#lab-goggles'
      : kind === 'slot' ? `#lab-food-slots [data-slot="${id}"]`
      : (kind === 'food' || kind === 'test') ? `[data-add="${kind}"][data-id="${id}"]`
      : kind === 'bath' ? '#lab-food-tools [data-act="bath"]'
      : kind === 'burner-off' ? '#lab-food-tools [data-act="burner"]'
      : kind === 'rinse' ? '#lab-food-tools [data-act="rinse"]'
      : kind === 'read' ? '#lab-food-tools [data-act="read"]'
      : kind === 'clean' ? '#lab-food-tools [data-act="clean"]' : null;
    const el = sel && _root.querySelector(sel);
    if (el) el.classList.add('is-next');
  }

  // ══ Panels ═══════════════════════════════════
  function _startHTML() {
    const st = Labs.store(ID);
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
        <li><b>Follow the yellow box</b> under the rack. The thing to tap next glows yellow.</li>
        <li><b>Read the result</b>, then check your lab notebook: every colour is written down in words.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_mine(P().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_mine(P().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or test freely: choose a tube, add a food, then add a test.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _shelfHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
    _renderSlots();
    _foundCount();
    _highlight();
  }

  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _renderSlots();
    _foundCount();
    _highlight();
  }

  function _discover(id) {
    const all = _mine(P().DISCOVERIES);
    const d = all.find(x => x.id === id);
    if (!d) return;
    if (Labs.discover(ID, id, { title: d.title, total: all.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const all = _mine(P().DISCOVERIES), st = Labs.store(ID);
    n.textContent = `${all.filter(d => st.disc[d.id]).length}/${all.length}`;
  }

  function _slotLabel(s, i) {
    if (!s.food) return `Tube ${i + 1}: empty`;
    const r = _res(s);
    return `Tube ${i + 1}: ${_fshort(s.food)}${s.test ? ' with ' + P().TESTS[s.test].short + ' - ' + r.word : ''}`;
  }
  function _renderSlots() {
    const box = $('lab-food-slots');
    if (!box || !_rack) return;
    box.innerHTML = _rack.slots.map((s, i) => {
      const r = _res(s);
      const hex = r ? r.hex : s.food ? P().FOODS[s.food].swatch : '';
      return `<button type="button" data-slot="${i + 1}" aria-pressed="${i === _rack.sel}" aria-label="${esc(_slotLabel(s, i))}">
        <span>${i + 1}</span><i class="lab-food-dot${hex ? '' : ' is-empty'}" style="${hex ? `--c:${hex}` : ''}"></i></button>`;
    }).join('');
    _highlight();
  }

  function _shelfHTML() {
    const D = P();
    const foods = D.SHELF_FOODS.concat(_mission && _mission.id === 'mystery' ? ['mystery'] : []);
    const food = id => {
      const x = D.FOODS[id];
      return `<button type="button" class="lab-item" data-add="food" data-id="${id}">
        <span class="lab-swatch is-liquid" style="--sw:${x.swatch}"></span>
        <span class="lab-item-text"><b>${esc(x.name)}</b><small>${esc(x.meta)}</small></span></button>`;
    };
    const test = id => {
      const x = D.TESTS[id];
      const sg = x.corrosive ? 'corrosive' : x.flammable ? 'flammable' : null;
      return `<button type="button" class="lab-item" data-add="test" data-id="${id}">
        <span class="lab-swatch is-liquid" style="--sw:${x.swatch}"></span>
        <span class="lab-item-text"><b>${esc(x.name)}</b><small>${esc(x.meta)}</small></span>
        ${sg ? `<span class="lab-item-sign" title="${esc(Labs.SIGN_LABELS[sg])}">${Labs.sign(sg, true)}</span>` : ''}</button>`;
    };
    const items = _shelf === 'test' ? D.SHELF_TESTS.map(test) : foods.map(food);
    return `<section class="lab-shelf" aria-label="Shelf">
      <div class="lab-shelf-head">
        <div class="lab-seg" role="group" aria-label="Shelf">
          <button type="button" data-shelf="food" aria-pressed="${_shelf === 'food'}">Foods</button>
          <button type="button" data-shelf="test" aria-pressed="${_shelf === 'test'}">Tests</button>
        </div>
        <p class="lab-hint">Tap to add to tube ${_rack.sel + 1}.</p>
      </div>
      <div class="lab-items">${items.join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const D = P();
    const rows = _reads.slice(0, 12).map(r => `<tr class="${r.card ? 'is-mistake' : ''}"><th scope="row">${esc(_cap(_fshort(r.food)))}</th>
      <td>${esc(D.TESTS[r.test].short)}</td>
      <td><i class="lab-food-dot" style="--c:${r.hex}" aria-hidden="true"></i> ${esc(r.word)}</td><td>${esc(r.meaning)}</td></tr>`).join('');
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>
      ${rows ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Food test results</caption>
        <thead><tr><th scope="col">Food</th><th scope="col">Test</th><th scope="col">What you saw</th><th scope="col">Meaning</th></tr></thead>
        <tbody>${rows}</tbody></table></div>
        <p class="lab-fair">⚖️ Fair test: a small sample, a clean spatula, and a control tube of water tested the same way.</p>`
      : '<p class="lab-empty">Tap “Read result” and each result appears here - the colour in words, and what it means.</p>'}</section>`;
  }

  function _missionListHTML() {
    const st = Labs.store(ID);
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Finish the tests, answer the exam-style questions, earn up to three stars.</p>
      ${_mine(P().MISSIONS).map(M => {
        const best = (st.missions[M.id] && st.missions[M.id].stars) || 0;
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
    const D = P(), M = D.MISSIONS.find(x => x.id === ms.id);
    let items;
    if (ms.id === 'name_it') {
      items = Object.keys(M.foods).map(f => {
        const r = ms.results[f];
        return `<li class="${r ? 'is-done' : ''}">${esc(D.FOODS[f].name)}: ${r ? `${esc(D.TESTS[r.test].short)} - ${esc(r.word)}` : 'find its nutrient'}</li>`;
      });
    } else {
      const lab = { iodine: 'Iodine test (starch)', benedicts: 'Benedict’s test, heated (reducing sugar)', biuret: 'Biuret test (protein)', fat: 'A fat test (grease spot or ethanol)' };
      items = M.needs.map(k => `<li class="${ms.results[k] ? 'is-done' : ''}">Powder X: ${esc(lab[k])}${ms.results[k] ? ' - ' + esc(ms.results[k].word) : ''}</li>`);
      items.push(`<li class="${ms.results.control ? 'is-done' : ''}">A control: a tube of water, tested the same way</li>`);
    }
    const done = (ms.id === 'name_it' ? Object.keys(M.foods) : M.needs.concat('control')).filter(k => ms.results[k]).length;
    const total = ms.id === 'name_it' ? 4 : M.needs.length + 1;
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <ul class="lab-steps">${items.join('')}<li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
      <p class="lab-progress-text">${done} of ${total} done</p>
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store(ID);
    const all = _mine(P().DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _intro() {
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🥪</p>
        <h2 id="lab-ov-title">Welcome to Food Tests</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first food test, one tap at a time.</li>
          <li><b>Test a food.</b> Choose a tube, add a food, then add a test. A <b>reagent</b> is the chemical that changes colour.</li>
          <li><b>Read the colour.</b> Each result goes into your notebook in words: blue-black, brick-red, purple…</li>
          <li><b>Get it wrong safely.</b> Heat it the wrong way, forget your goggles or a control tube, and you’ll see what goes wrong. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. There are ${_mine(P().DISCOVERIES).length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="starch" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(ID); st.intro = true; Labs.persist();
        _coach('Start with tube 1: add a food from the shelf, then a test.');
      } });
  }

  function _help() {
    const D = P();
    const rows = D.SHELF_TESTS.map(id => {
      const T = D.TESTS[id];
      return `<tr><th scope="row">${esc(T.name)}</th><td>${esc(D.NUTRIENTS[T.nutrient])}</td><td>${esc(T.before)} → <b>${esc(T.after)}</b></td></tr>`;
    }).join('');
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the food tests work</h2>
      <div class="lab-help">
        <section><h3>Using the bench</h3><ul>
          <li>Tap a tube number (or the tube itself) to choose it.</li>
          <li>Add a food from the Foods shelf, then one test from the Tests shelf.</li>
          <li>Benedict’s needs the 🛁 water bath. Biuret needs a few minutes. A grease spot needs to dry.</li>
          <li>Tap “Read result” to record what you see. ${esc(D.TIME_LAPSE)}.</li></ul></section>
        <section><h3>The tests</h3>
          <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th scope="col">Test</th><th scope="col">Finds</th><th scope="col">Colour change</th></tr></thead>
          <tbody>${rows}</tbody></table></div></section>
        <section><h3>A fair test</h3><ul>
          <li>Use a small sample - enough to show whether the nutrient is there.</li>
          <li>Rinse the spatula between foods.</li>
          <li>Test a control: a tube of water, treated in exactly the same way.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Goggles on for Biuret solution (corrosive) and whenever you heat.</li>
          <li>Heat tubes in a water bath, never in the flame, pointing away from people.</li>
          <li>Every burner off before the ethanol test - ethanol is flammable.</li>
          <li>Never taste anything in the lab, even food.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_rack) return;
    const s = _cur(), n = _rack.sel + 1, r = _res(s), D = P();
    const now = $('lab-food-now');
    if (now) {
      if (!s.food) now.innerHTML = `Tube ${n} · empty <small>add a food</small>`;
      else if (!s.test) now.innerHTML = `<i style="background:${D.FOODS[s.food].swatch}"></i>Tube ${n} · ${esc(_fshort(s.food))} <small>now add a test</small>`;
      else {
        const state = s.test === 'benedicts' && !r.finished ? (s.heat > 0 ? 'heating…' : 'not heated yet')
          : s.test === 'biuret' && !r.finished ? 'changing…' : s.test === 'paper' && !s.dry ? 'drying…' : r.meaning;
        now.innerHTML = `<i style="background:${r.hex}"></i>Tube ${n} · ${esc(_fshort(s.food))} + ${esc(D.TESTS[s.test].short)}: ${esc(r.word)} <small>${esc(state)}</small>`;
      }
    }
    const st = $('lab-status');
    if (st) {
      const chips = [];
      if (_burner) chips.push(`<span class="lab-chip is-warm">🔥 Burner lit · bath ${Math.round(_bathT)} °C</span>`);
      else if (_bathT > D.ROOM + 2) chips.push(`<span class="lab-chip">🛁 Bath cooling · ${Math.round(_bathT)} °C</span>`);
      if (s.food && s.bath) chips.push(`<span class="lab-chip">🌡️ Tube ${n} · ${Math.round(s.T)} °C</span>`);
      st.innerHTML = chips.join('');
    }
    const c = $('lab-contents');
    if (c) c.textContent = _spatula ? `Spatula: has ${_fshort(_spatula)} on it` : 'Spatula: clean';
    const b = $('lab-food-bath');
    if (b) { const em = b.querySelector('em'); if (em) em.textContent = s.bath ? 'Out of bath' : 'Water bath'; b.setAttribute('aria-pressed', String(!!s.bath)); }
    const bu = $('lab-food-burner');
    if (bu) { const em = bu.querySelector('em'); if (em) em.textContent = _burner ? 'Burner off' : 'Light burner'; bu.setAttribute('aria-pressed', String(_burner)); }
    const slots = $('lab-food-slots');
    if (slots) _rack.slots.forEach((x, i) => {
      const btn = slots.children[i]; if (!btn) return;
      const rr = _res(x), dot = btn.querySelector('i');
      const hex = rr ? rr.hex : x.food ? D.FOODS[x.food].swatch : '';
      if (dot) { dot.style.setProperty('--c', hex || 'transparent'); dot.classList.toggle('is-empty', !hex); }
      btn.setAttribute('aria-label', _slotLabel(x, i));
    });
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done, data: data || {} });
  }

  // ══ Drawing ══════════════════════════════════
  function _geom(i) {
    const sw = _W / P().SLOTS, cx = sw * (i + 0.5);
    const tw = Math.max(14, Math.min(24, sw * 0.44));
    const top = _H * 0.25, len = _H * 0.34;
    return { sw, cx, tw, r: tw / 2, top, len, dy: _H * 0.15 };
  }
  function _rgba(hex, a) {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  }
  function _tubePath(l, r, top, bot) {
    const c = _cx, rad = (r - l) / 2, by = bot - rad;
    c.beginPath(); c.moveTo(l, top); c.lineTo(l, by); c.arc((l + r) / 2, by, rad, Math.PI, 0, true); c.lineTo(r, top);
  }

  function _drawSlot(s, i) {
    const c = _cx, g = _geom(i), D = P();
    const off = s.bath ? g.dy : 0;
    const top = g.top + off, bot = g.top + g.len + off;
    if (i === _rack.sel) {
      c.fillStyle = _rgba(_colors.accent.length === 7 ? _colors.accent : '#1D6A96', 0.13);
      c.fillRect(g.cx - g.sw / 2 + 2, _H * 0.18, g.sw - 4, _H * 0.62);
    }
    if (s.test === 'paper') {
      const size = Math.min(g.sw * 0.82, 46), y = g.top + g.len * 0.4;
      c.fillStyle = D.COLORS.paper; c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 1;
      c.fillRect(g.cx - size / 2, y - size / 2, size, size); c.strokeRect(g.cx - size / 2, y - size / 2, size, size);
      const r = _res(s);
      if (r.wet || r.positive) {
        c.fillStyle = _rgba(r.hex, r.wet ? 0.85 : 0.95);
        c.beginPath(); c.ellipse(g.cx, y, size * 0.27, size * 0.22, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.moveTo(g.cx - size * 0.15, y - 2); c.lineTo(g.cx + size * 0.15, y - 2); c.stroke();
      }
      return;
    }
    c.save();
    _tubePath(g.cx - g.r + 2, g.cx + g.r - 2, top + 2, bot - 2); c.clip();
    if (s.food) {
      const r = _res(s);
      const surf = bot - g.len * 0.44;
      c.fillStyle = _rgba(r ? r.hex : D.FOODS[s.food].swatch, 0.9);
      c.fillRect(g.cx - g.r, surf, g.tw, bot - surf + 2);
      if (r && s.test === 'ethanol' && r.positive) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(g.cx - g.r, surf, g.tw, bot - surf + 2); }
      if (s.food === 'oil' && s.test && s.test !== 'ethanol') { c.fillStyle = _rgba(D.FOODS.oil.swatch, 0.95); c.fillRect(g.cx - g.r, surf - 6, g.tw, 7); }
      if (s.food === 'oil' && !s.test) { c.fillStyle = _rgba(D.FOODS.oil.swatch, 0.95); c.fillRect(g.cx - g.r, bot - g.len * 0.18, g.tw, g.len * 0.2); }
    }
    c.restore();
    _tubePath(g.cx - g.r, g.cx + g.r, top, bot);
    c.lineWidth = 2; c.strokeStyle = _colors.glass; c.stroke();
    c.beginPath(); c.moveTo(g.cx - g.r + 4, top + 6); c.lineTo(g.cx - g.r + 4, bot - g.r - 3);
    c.strokeStyle = _colors.hi; c.lineWidth = 2; c.stroke();
  }

  function _draw(dt) {
    if (!_cx || !_rack) return;
    const c = _cx, D = P();
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) { c.translate((Math.random() - 0.5) * 8 * _shake, (Math.random() - 0.5) * 8 * _shake); _shake = Math.max(0, _shake - dt * 1.4); }
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    c.fillStyle = _colors.bench; c.fillRect(-12, _H * 0.9, _W + 24, _H * 0.12);
    // the rack
    c.fillStyle = _colors.rack;
    c.fillRect(4, _H * 0.33, _W - 8, 6);
    // the water bath: a long trough of water under the rack
    const tTop = _H * 0.62, tBot = _H * 0.82, wTop = _H * 0.655;
    const warm = Math.max(0, Math.min(1, (_bathT - D.ROOM) / (D.BATH.temp - D.ROOM)));
    c.fillStyle = `rgba(${Math.round(150 + 70 * warm)},${Math.round(200 - 40 * warm)},${Math.round(230 - 90 * warm)},0.45)`;
    c.fillRect(8, wTop, _W - 16, tBot - wTop);
    _rack.slots.forEach(_drawSlot);
    c.strokeStyle = _colors.glass; c.lineWidth = 2;
    c.beginPath(); c.moveTo(8, tTop); c.lineTo(8, tBot); c.lineTo(_W - 8, tBot); c.lineTo(_W - 8, tTop); c.stroke();
    c.fillStyle = _colors.ink; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'left';
    c.fillText(`WATER BATH ${Math.round(_bathT)} °C`, 14, tBot - 6);
    // bubbles and steam when hot
    if (_bathT > 60 && !Labs.calm()) {
      c.fillStyle = 'rgba(255,255,255,.75)';
      for (let k = 0; k < 14; k++) {
        const f = (_clock * 0.6 + k * 0.137) % 1, x = 14 + ((k * 97) % 100) / 100 * (_W - 28);
        c.beginPath(); c.arc(x, tBot - 4 - f * (tBot - wTop - 6), 1.6, 0, Math.PI * 2); c.fill();
      }
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.5;
      for (let k = 0; k < 4; k++) {
        const x = _W * (0.15 + k * 0.23);
        c.beginPath();
        for (let yy = 0; yy < 22; yy += 3) c.lineTo(x + Math.sin(_clock * 3 + yy / 4 + k) * 3, wTop - 4 - yy);
        c.stroke();
      }
    }
    // the Bunsen burner under the bath
    const bx = _W / 2;
    c.fillStyle = '#5E6B70';
    c.fillRect(bx - 5, tBot + 2, 10, _H * 0.9 - tBot - 2);
    c.fillRect(bx - 14, _H * 0.9 - 4, 28, 4);
    if (_burner) {
      const fy = tBot + 1, fl = c.createRadialGradient(bx, fy, 1, bx, fy, 12);
      fl.addColorStop(0, 'rgba(255,255,255,.95)'); fl.addColorStop(0.4, 'rgba(70,120,255,.9)'); fl.addColorStop(1, 'rgba(70,120,255,0)');
      c.fillStyle = fl; c.beginPath(); c.ellipse(bx, fy - 2, 6, 10 + (Labs.calm() ? 0 : Math.sin(_clock * 20) * 1.5), 0, 0, Math.PI * 2); c.fill();
    }
    _drawFx(dt);
    c.restore();
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      const g = _geom(f.data.i || 0), top = g.top + (_rack.slots[f.data.i || 0].bath ? g.dy : 0);
      switch (f.type) {
        case 'food': case 'drop': {
          const y = (top - 28) + k * (g.len * 0.5 + 28);
          c.fillStyle = _rgba(f.data.color || '#CFE8F3', 0.95); c.strokeStyle = 'rgba(0,0,0,.25)';
          c.beginPath(); c.arc(g.cx, y, f.type === 'food' ? 3 : 4, 0, Math.PI * 2); c.fill(); c.stroke();
          if (f.type === 'food') { c.strokeStyle = '#8A949A'; c.lineWidth = 3; c.beginPath(); c.moveTo(g.cx - 20, top - 30); c.lineTo(g.cx + 4, top - 22); c.stroke(); }
          break;
        }
        case 'rub': {
          const y = g.top + g.len * 0.4;
          c.strokeStyle = '#8A949A'; c.lineWidth = 3;
          c.beginPath(); c.moveTo(g.cx - 12 + Math.sin(k * 12) * 8, y - 16); c.lineTo(g.cx + Math.sin(k * 12) * 8, y); c.stroke();
          break;
        }
        case 'shake':
          _shake = Math.max(_shake, 0.35 * (1 - k));
          break;
        case 'spit': {
          for (let j = 0; j < 14; j++) {
            const a = -Math.PI / 2 + (j / 13 - 0.5) * 0.9, sp = 120 + (j % 5) * 30;
            c.fillStyle = `rgba(90,140,230,${0.9 - k * 0.6})`;
            c.beginPath(); c.arc(g.cx + Math.cos(a) * sp * f.t, top + Math.sin(a) * sp * f.t + 180 * f.t * f.t, 2.5, 0, Math.PI * 2); c.fill();
          }
          c.fillStyle = `rgba(200,30,30,${0.35 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'splash': {
          for (let j = 0; j < 12; j++) {
            const px = g.cx + ((j * 37) % 60 - 30) * k * 2, py = top - 10 + ((j * 23) % 30) * k;
            c.fillStyle = `rgba(90,130,210,${0.85 - k * 0.5})`;
            c.beginPath(); c.arc(px, py, 2 + 6 * k, 0, Math.PI * 2); c.fill();
          }
          c.fillStyle = `rgba(200,30,30,${0.4 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'fire': {
          _shake = Math.max(_shake, 0.5 * (1 - k));
          for (let j = 0; j < 9; j++) {
            const x = _W * (j + 0.5) / 9, h = 20 + ((j * 17) % 30) + 30 * Math.sin(Math.PI * k);
            const fl = c.createLinearGradient(x, _H * 0.6, x, _H * 0.6 - h);
            fl.addColorStop(0, 'rgba(255,200,60,.9)'); fl.addColorStop(1, 'rgba(255,90,30,0)');
            c.fillStyle = fl; c.beginPath(); c.ellipse(x, _H * 0.6 - h / 2, 9, h / 2, 0, 0, Math.PI * 2); c.fill();
          }
          break;
        }
        case 'taste':
          c.fillStyle = `rgba(200,30,30,${0.4 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          c.font = '800 34px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('✋', _W / 2, _H * 0.45);
          break;
      }
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
  }

  // ══ Loop ═════════════════════════════════════
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) return;
    const scr = _root.closest('.screen');
    if ((typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') || (scr && scr.classList.contains('hidden'))) return;
    _raf = requestAnimationFrame(_loop);
    if (document.hidden) { _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    if (!Labs.calm()) _clock += dt;
    _step(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _step(0.05); _readouts(); }
  function _debug() {
    if (!_rack) _resetRack();
    return { grade: _grade(), goggles: _goggles, burner: _burner, bathT: _bathT, sel: _rack.sel + 1, spatula: _spatula,
             busy: _busy, fx: _fx.length, looping: !!_raf, panel: _panel, shelf: _shelf,
             guide: _guide && { id: _guide.id, step: _guide.step },
             slots: _rack.slots.map(s => { const r = _res(s); return { food: s.food, trace: s.trace, test: s.test, bath: s.bath, T: Math.round(s.T),
               heat: s.heat, t: s.t, dry: s.dry, word: r ? r.word : null, finished: r ? r.finished : null }; }),
             reads: _reads.slice(0, 6).map(r => `${r.food}|${r.test}|${r.word}|${r.card || ''}`),
             mission: _mission && { id: _mission.id, results: Object.keys(_mission.results), hazards: _mission.hazards,
                                    mistakes: _mission.mistakes, success: _mission.success } };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, select, addFood, addTest, read, bath, burner, flame, taste, rinse, clean, goggles,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabFood = LabFood;
