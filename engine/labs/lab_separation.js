'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Separation Station (Chemistry, NCE Grade 9)
//
//  Four benches in one: build and run a simple distillation rig, crystallise
//  copper(II) sulfate, sublime iodine (or ammonium chloride) out of a mixture,
//  and choose the right technique for a mixture. Guided experiments, three
//  Missions and a collection of Discoveries - the Mixing Bench pattern.
//
//  ⚠ Every temperature, rate, rig check and outcome comes from
//    lab_separation_data.js (LabSeparationData). This file only moves amounts
//    over time and draws them. If something looks wrong on screen, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the simulation still runs and the rig still
//    shows its state, but nothing moves and effects apply at once.
//  ⚠ Every control is a real <button> that works with a tap; nothing needs a drag.
// ══════════════════════════════════════════════
const LabSeparation = (() => {
  const SD = LabSeparationData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { spit: 0.9, bump: 1.25, burst: 1.3, haze: 1.5, rod: 1.1, drop: 1.0 };
  const VW = 340, VH = 260;   // the scene is drawn in this design space and scaled to fit

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const f1 = n => (Math.round(n * 10) / 10).toFixed(1);
  const f0 = n => String(Math.round(n));
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const toward = (x, to, step) => (x < to ? Math.min(to, x + step) : Math.max(to, x - step));
  const val = (x, c) => (typeof x === 'function' ? x(c || {}) : x);
  const rnd = () => Math.random();

  const MODES = {
    distil:  { icon: '⚗️', name: 'Distillation',     label: 'Distil' },
    crystal: { icon: '💎', name: 'Crystallisation',  label: 'Crystallise' },
    sublime: { icon: '🟣', name: 'Sublimation',      label: 'Sublime' },
    choose:  { icon: '🤔', name: 'Which technique?', label: 'Which technique?' },
  };
  const MODE_INTRO = {
    distil:  'Distillation: build the rig from the shelf below - tap a choice for each part. Then goggles on and heat.',
    crystal: 'Crystallisation: a basin of blue copper(II) sulfate solution. Heat it, test it with the glass rod, then let it cool.',
    sublime: 'Sublimation: choose the mixture, where to work and what goes over the dish. Then heat it gently.',
    choose:  'Which technique? Pick one for each mixture - then the reason it works.',
  };
  const CARD_NEXT = {
    water_top: 'Fix it on the shelf: Liebig condenser → water IN at the bottom. Then heat again.',
    thermo_liquid: 'Fix it on the shelf: thermometer → bulb level with the side arm. Then heat again.',
    dryness: 'Tap “Start again” for a fresh basin of solution - and stop at the crystallisation point this time.',
    too_early: 'Tap “Start again” - and keep heating until the glass-rod test shows crystals.',
    no_funnel: 'Put an inverted funnel with a cotton wool plug over the dish, then heat again.',
    no_plug: 'Choose “Funnel + cotton wool plug” on the shelf, then heat again.',
    wrong_tech: 'Try another technique for this mixture.',
  };

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0, _s = 1, _ox = 0, _oy = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _mode = 'distil', _goggles = false, _panel = 'sandbox', _mission = null, _guide = null;
  let _log = [], _parts = [], _fx = [], _cards = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1;
  let _dist = null, _cry = null, _sub = null, _ch = null;

  // ══ State ════════════════════════════════════
  function _newDist(parts, T) {
    const p = Object.assign({ flask: null, granules: null, thermo: null, condenser: null, receiver: null, burner: null }, parts || {});
    return { parts: p, heat: false, T: T == null ? SD.ROOM : T, vol: p.flask ? SD.FLASKS[p.flask].vol : 0, dist: 0, escaped: 0,
             boilT: 0, boiling: false, jacket: p.condenser ? (p.condenser === 'bottom' ? 1 : SD.DISTIL.topFill) : 0, pressure: 0,
             heatT: 0, nextRead: 0, readings: [], read: SD.ROOM, done: false, flagged: {}, saidBoil: false, said100: false };
  }
  function _newCry() {
    const K = SD.CRYSTAL;
    return { heat: false, heated: false, T: SD.ROOM, water: K.water, grams: K.grams, cool: null, crystals: 0,
             onset: null, crust: false, dry: false, done: false, rods: [], rodOK: false };
  }
  function _newSub(parts) {
    const p = Object.assign({ mixture: null, place: null, cover: null }, parts || {});
    return { parts: p, heat: false, heatT: 0, subT: 0, left: p.mixture ? SD.SUBLIME_MIXES[p.mixture].grams : 0,
             sublimate: 0, escaped: 0, done: false, flagged: {} };
  }
  function _newCh() { return { idx: 0, phase: 'tech', done: {}, order: [] }; }
  function _resetAll() {
    _dist = _newDist(); _cry = _newCry(); _sub = _newSub(); _ch = _newCh();
    _parts = []; _cards = []; _fx = [];
  }
  const _state = () => (_mode === 'distil' ? _dist : _mode === 'crystal' ? _cry : _mode === 'sublime' ? _sub : null);
  const _heating = () => { const s = _state(); return !!(s && s.heat); };
  function _allHeatOff() { if (_dist) { _dist.heat = false; _dist.boiling = false; } if (_cry) _cry.heat = false; if (_sub) _sub.heat = false; }
  const _curMix = () => SD.MIXTURES[_ch.idx];

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-separation">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Chemistry · Grade 9</span><h1>Separation Station</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-goggles" class="lab-goggles" data-act="goggles" aria-pressed="false"><span aria-hidden="true">🥽</span><span id="lab-goggles-label">Goggles off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the Separation Station works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-sep-stage">
            <canvas id="lab-canvas" role="img" aria-label="Separation apparatus on the bench"></canvas>
            <div class="lab-chip lab-ph" id="lab-read"></div>
            <div class="lab-status" id="lab-status"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-separation-tools" id="lab-tools"></div>
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
    if (!_dist) _resetAll();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _syncTools();
    _syncGoggles();
    _readouts();
    const st = Labs.store('separation');
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or build something on the bench.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _stop();
    _root = null; _cv = null; _cx = null;
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), bench: v('--lab-bench', '#B9CAC6'),
                glass: v('--lab-glass', 'rgba(34,58,68,.62)'), hi: v('--lab-glass-hi', 'rgba(255,255,255,.75)'),
                ink: v('--lab-ink', '#14211D'), muted: v('--lab-muted', '#56665F'), ok: v('--lab-ok', '#23734A') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(400, Math.max(260, w * 0.78)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _s = Math.min(w / VW, h / VH); _ox = (w - VW * _s) / 2; _oy = (h - VH * _s) / 2;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _readColors();
    _draw(0);
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const md = e.target.closest('[data-mode]');
      if (md) { setMode(md.dataset.mode); return; }
      const pt = e.target.closest('[data-part]');
      if (pt) { setPart(pt.dataset.part, pt.dataset.opt); return; }
      const tc = e.target.closest('[data-tech]');
      if (tc) { pickTech(tc.dataset.tech); return; }
      const wy = e.target.closest('[data-why]');
      if (wy) { pickWhy(wy.dataset.why); return; }
      const mx = e.target.closest('[data-mix]');
      if (mx) { _selectMix(mx.dataset.mix); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
    };
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'goggles': goggles(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'heat': if (_heating()) heatOff(); else heatOn(); break;
      case 'drop': drop(); break;
      case 'rod': rod(); break;
      case 'cool-slow': cool('slow'); break;
      case 'cool-fast': cool('fast'); break;
      case 'reset': reset(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. Every bench is yours.'); _renderPanel(); break;
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
    const f = SD.FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Common actions ═══════════════════════════
  function goggles() {
    _goggles = !_goggles;
    _syncGoggles();
    _coach(_goggles ? 'Goggles on. Now you are ready to heat things.'
                    : 'Goggles off. You will need them again before you heat anything.');
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

  function setMode(m, silent) {
    if (!MODES[m] || _busy) return;
    const M = _mission && SD.MISSIONS.find(x => x.id === _mission.id);
    if (M && m !== M.mode) { _coach(`You are on a mission on the ${MODES[M.mode].name.toLowerCase()} bench. Leave the mission to switch.`); return; }
    const changed = m !== _mode;
    if (changed) {
      _allHeatOff();
      _mode = m; _parts = [];
      _renderPanel(); _syncTools(); _readouts(); _setAria();
      if (!silent) _coach(MODE_INTRO[m]);
    }
    _guideEvent('mode:' + m);
  }
  function _setAria() {
    if (!_cv) return;
    _cv.setAttribute('aria-label', { distil: 'A simple distillation rig on the bench', crystal: 'An evaporating basin of copper(II) sulfate solution on a tripod',
      sublime: 'An evaporating dish on a tripod, for sublimation', choose: 'A beaker holding a mixture to separate' }[_mode]);
  }

  function setPart(k, v) {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return; }
    if (SD.PARTS[k]) _setDistPart(k, v);
    else if (SD.SUB_PARTS[k]) _setSubPart(k, v);
  }

  function heatOn() {
    if (_busy || _mode === 'choose') return;
    if (_mode === 'distil') {
      const D = _dist, chk = SD.checkRig(D.parts);
      if (chk.missing.length) { _coach(`The rig is not finished. Still to add: ${chk.missing.map(k => SD.PARTS[k].name.toLowerCase()).join(', ')}.`); return; }
      if (D.done) { _coach('This run is finished. Tap “Clear the bench” to start again with a fresh flask.'); return; }
      if (!_goggles) { _hazard('no_goggles', { what: 'the ' + SD.FLASKS[D.parts.flask].long }); return; }
      D.heat = true;
      _coach('Burner on. Watch the thermometer and the flask.');
    } else if (_mode === 'crystal') {
      const C = _cry;
      if (C.dry) { _coach('The basin is dry and the crystals are spoilt. Tap “Start again” for fresh solution.'); return; }
      if (C.cool) { _coach('It is cooling now. Tap “Start again” for a fresh solution.'); return; }
      if (!_goggles) { _hazard('no_goggles', { what: 'the copper(II) sulfate solution' }); return; }
      C.heat = true; C.heated = true;
      _coach('Heating the solution. Water is evaporating - test it with the glass rod every so often.');
    } else {
      const U = _sub, chk = SD.checkSublime(U.parts);
      if (chk.missing.length) { _coach(`Not ready yet. Still to choose: ${chk.missing.map(k => SD.SUB_PARTS[k].name.toLowerCase()).join(', ')}.`); return; }
      if (U.done) { _coach('It has all sublimed. Tap “Clear the bench” to start again.'); return; }
      const M = SD.SUBLIME_MIXES[U.parts.mixture];
      if (!_goggles) { _hazard('no_goggles', { what: 'the ' + M.short }); return; }
      U.heat = true;
      _coach(`${M.heat}. Watch the dish - and the space above it.`);
    }
    _syncTools(); _readouts();
    _guideEvent('heat');
  }

  function heatOff() {
    const s = _state();
    if (!s || !s.heat) return;
    s.heat = false;
    if (_mode === 'distil') { _dist.boiling = false; _coach('Burner off.'); }
    else if (_mode === 'crystal') _coach(_cry.heated ? 'Heat off. Now let it cool - slowly or quickly?' : 'Heat off.');
    else _coach('Burner off.');
    _syncTools(); _readouts();
    _guideEvent('heat-off');
  }

  function reset() {
    if (_busy) return;
    if (_mode === 'distil') { _dist = _newDist(); _coach('Clean glassware. Build the rig again from the shelf.'); }
    else if (_mode === 'crystal') { _cry = _newCry(); _coach('A fresh basin: 60 cm³ of water with 9 g of copper(II) sulfate dissolved.'); }
    else if (_mode === 'sublime') { _sub = _newSub(); _coach('A clean dish. Choose the mixture, where to work and the cover.'); }
    else { _ch = _newCh(); if (_mission && _mission.id === 'sorter') _mission.success = false; _coach('All six mixtures are back in the queue.'); }
    _parts = []; _cards = [];
    _afterChange('reset');
  }

  function _afterChange(token) {
    _readouts(); _refreshBench(); _syncTools(); _refresh();
    if (token) _guideEvent(token);
  }

  // ══ Distillation ═════════════════════════════
  function _partSay(k, v) {
    const F = SD.FLASKS;
    return {
      flask: { sea: 'Round-bottom flask of sea water in place.', ink: 'Round-bottom flask of inky water in place.' },
      granules: { yes: 'A few anti-bumping granules are in the flask.', no: 'No anti-bumping granules this time…' },
      thermo: { arm: 'Thermometer in, its bulb level with the side arm - it will measure the vapour.', liquid: 'Thermometer in, with its bulb down in the liquid.' },
      condenser: { bottom: 'Liebig condenser on. Cold water goes in at the bottom and out at the top.', top: 'Liebig condenser on - with the cold water going in at the top.' },
      receiver: { open: 'Open conical flask ready to collect the distillate.', sealed: 'Conical flask sealed with a rubber bung.' },
      burner: { yes: 'Bunsen burner, tripod and gauze under the flask.' },
    }[k][v] || (F[v] ? F[v].name : '');
  }

  function _setDistPart(k, v) {
    const P = SD.PARTS[k];
    if (!P.options[v]) return;
    if (_mode !== 'distil') setMode('distil', true);
    if (_mode !== 'distil') return;
    const D = _dist;
    if (D.heat) { _coach('Turn the heat off before you change the apparatus.'); return; }
    if (k === 'granules' && v === 'yes' && D.T > 50) {
      _coach('Wait! Never add anti-bumping granules to a hot liquid - it can boil up violently. Let the flask cool first.');
      return;
    }
    const parts = Object.assign({}, D.parts, { [k]: v });
    _dist = _newDist(parts, parts.flask === D.parts.flask ? D.T : SD.ROOM);
    _parts = [];
    const chk = SD.checkRig(parts);
    _coach(_partSay(k, v) + (chk.missing.length ? '' : ' The rig is complete - goggles on, then tap 🔥 Heat.'));
    _afterChange('part:' + k + ':' + v);
  }

  function build(rigId) {
    const R = SD.RIGS[rigId];
    if (!R || _busy) return;
    if (_mode !== 'distil') setMode('distil', true);
    if (_mode !== 'distil') return;
    _dist = _newDist(Object.assign({}, R.parts));
    _parts = [];
    _coach(`Set up: ${R.label}. ${SD.checkRig(R.parts).ok ? 'Goggles on, then heat.' : 'Heat it and see what happens.'}`);
    _afterChange('build:' + rigId);
  }

  function _stepDist(dt) {
    const D = _dist, P = SD.DISTIL, p = D.parts;
    if (p.condenser) D.jacket = toward(D.jacket, p.condenser === 'bottom' ? 1 : P.topFill, P.fillRate * dt);
    if (!p.flask) return;
    const bp = SD.liquidBoils(p.flask, D.vol);
    if (D.heat) { D.heatT += dt; D.T = Math.min(bp, D.T + P.heatRate * dt); }
    else D.T = Math.max(SD.ROOM, D.T - P.coolRate * dt);
    const boiling = D.heat && D.T >= bp - 1e-9;
    if (boiling && !D.boiling) {
      D.boiling = true;
      if (p.granules === 'no') { D.heat = false; D.boiling = false; _hazard('bumping', {}); return; }
      if (!D.saidBoil) {
        D.saidBoil = true;
        _logEntry({ title: 'It boils', note: true,
          obs: `The ${SD.FLASKS[p.flask].long} boils. Vapour rises up the neck of the flask and into the side arm.` });
        _coach('Boiling! Follow the vapour up the neck, along the side arm and into the condenser.');
      }
      _guideEvent('wait:boil');
    }
    if (!boiling) D.boiling = false;
    if (p.thermo === 'liquid') D.read = D.T;
    else if (p.thermo === 'arm') {
      const hot = D.boiling && D.boilT >= P.vapourDelay;
      D.read = hot ? toward(D.read, SD.POINTS.water.boils, 160 * dt) : toward(D.read, SD.ROOM, 8 * dt);
    }
    if (D.boiling) {
      D.boilT += dt;
      const e = Math.min(P.evap * dt, Math.max(0, D.vol - P.minLeft));
      D.vol -= e;
      if (D.boilT >= P.vapourDelay) {
        const k = P.condenseTop + (P.condenseFull - P.condenseTop) * clamp((D.jacket - P.topFill) / (1 - P.topFill), 0, 1);
        D.dist += e * k;
        if (p.receiver !== 'sealed') D.escaped += e * (1 - k);
      }
      if (p.receiver === 'sealed') {
        D.pressure += e;
        if (D.pressure >= P.burstAt) { D.heat = false; D.boiling = false; _hazard('sealed', {}); return; }
      }
      if (p.thermo === 'arm' && !D.said100 && D.read >= SD.POINTS.water.boils - 0.05) {
        D.said100 = true;
        _logEntry({ title: 'Thermometer reading', obs: 'The thermometer at the side arm has climbed to 100 °C and stays there: the vapour going into the condenser is water.' });
        _discover('d_100');
        _guideEvent('wait:100');
      }
      const chk = SD.checkRig(p);
      const errs = chk.errors.filter(x => SD.RESULTS[x]);
      const due = errs.some(x => D.boilT >= (x === 'water_top' ? P.cardWaterTop : P.cardThermo));
      if (due && !D.flagged.any) {
        D.flagged.any = true; D.heat = false; D.boiling = false;
        _syncTools();
        errs.forEach(x => _result(x, x === 'thermo_liquid' ? { reading: f1(D.read), elev: SD.FLASKS[p.flask].elev > 0 } : {}));
        return;
      }
      if (chk.ok && !D.done && D.dist >= P.target - 1e-9) { D.done = true; D.heat = false; D.boiling = false; _distDone(); return; }
      if (D.vol <= P.minLeft + 1e-9 && D.heat) { D.heat = false; D.boiling = false; _coach('Heat off - never boil a flask dry.'); _syncTools(); }
    }
    if ((D.heat || D.boiling) && D.heatT >= D.nextRead - 1e-9) {
      D.readings.push({ t: Math.round(D.heatT), read: p.thermo ? D.read : null, dist: D.dist });
      if (D.readings.length > 12) D.readings.shift();
      D.nextRead += P.readEvery;
      _refresh();
    }
  }

  function _distDone() {
    const D = _dist, F = SD.FLASKS[D.parts.flask];
    _logEntry({ title: `Distilled: ${F.name.toLowerCase()}`,
      obs: `${f0(D.dist)} cm³ of clear, colourless distillate collected in the conical flask. The thermometer at the side arm read 100 °C: the vapour was water. The ${F.solute} stayed behind in the flask, now more concentrated (${f0(D.vol)} cm³ left).` });
    _discover(D.parts.flask === 'sea' ? 'd_sea' : 'd_ink');
    const ms = _mission;
    if (ms && ms.id === 'seawater') {
      if (D.parts.flask === 'sea') {
        ms.success = true;
        _coach('🎯 25 cm³ of pure water from sea water! Tap “Answer the questions” to finish the mission.');
        Labs.confetti();
      } else _coach('That was inky water - this mission needs SEA water. Clear the bench and build it again.');
    } else _coach(`${f0(D.dist)} cm³ of pure water collected. Try 💧 “Test a drop” to prove nothing is dissolved in it.`);
    _syncTools(); _refresh();
    _guideEvent('wait:distillate');
  }

  function drop() {
    if (_busy || _mode !== 'distil') return;
    const D = _dist;
    if (D.dist < 1) { _coach('Collect some distillate first - then test a drop of it.'); return; }
    const F = SD.FLASKS[D.parts.flask];
    _busy = true;
    _fxAdd('drop', () => {
      _busy = false;
      _logEntry({ title: 'Drop test', obs: `A drop of the distillate evaporated on a watch glass and left no residue at all. A drop of the ${F.long} left ${F.residue}. The distillate is pure water.` });
      _discover('d_residue');
      _coach('No residue: nothing was dissolved in the distillate. It is pure water.');
      _guideEvent('drop');
    });
  }

  // ══ Crystallisation ══════════════════════════
  function _stepCry(dt) {
    const C = _cry, K = SD.CRYSTAL;
    if (C.heat) {
      C.T = Math.min(K.boils, C.T + K.heatRate * dt);
      if (C.T >= K.boils) {
        C.water = Math.max(0, C.water - K.evap * dt);
        if (!C.crust && C.water <= SD.crustPoint()) {
          C.crust = true;
          _logEntry({ title: 'Crust forming', note: true, obs: 'Crystals are forming even in the boiling solution, round the edge of the basin, and it has started to spit.' });
          _coach('Careful! Crystals are forming in the hot basin and it is starting to spit. Turn the heat off now!');
        }
        if (C.water <= K.dry) {
          C.water = 0; C.heat = false; C.dry = true;
          _syncTools();
          _busy = true;
          _fxAdd('spit', () => { _busy = false; _result('dryness', {}); });
        }
      }
    } else if (C.cool && !C.done) {
      C.T = Math.max(SD.ROOM, C.T - (C.cool === 'slow' ? K.coolSlow : K.coolFast) * dt);
      const g = SD.crystalsAt(C.grams, C.water, C.T);
      C.crystals = g;
      if (g > 0 && C.onset == null) {
        C.onset = SD.saturatedAt(C.grams, C.water);
        _logEntry({ title: 'Crystals appear', note: true,
          obs: `The first crystals appeared at about ${f0(C.onset)} °C - the temperature at which ${f0(C.water)} cm³ of water can no longer hold ${K.grams} g of copper(II) sulfate.` });
      }
      if (C.T <= SD.ROOM + 1e-9) {
        C.done = true;
        if (g <= 1e-9) _result('too_early', { water: f0(C.water) });
        else _cryDone();
        _syncTools();
      }
    } else if (!C.heat && !C.cool && C.T > SD.ROOM && !C.heated) C.T = Math.max(SD.ROOM, C.T - K.coolSlow * dt);
  }

  function rod() {
    if (_busy || _mode !== 'crystal') return;
    const C = _cry;
    if (C.dry) { _coach('The basin is dry - nothing to test. Tap “Start again”.'); return; }
    if (C.cool) { _coach('The glass-rod test is for the HOT solution, before you cool it.'); return; }
    if (C.T < SD.CRYSTAL.rodMinT) { _coach('Heat the solution first - the glass-rod test tells you when a HOT solution is ready.'); return; }
    const positive = C.water <= SD.crystalPoint();
    _busy = true;
    _fxAdd('rod', () => {
      _busy = false;
      C.rods.push({ water: C.water, positive });
      if (positive) {
        C.rodOK = true;
        _logEntry({ title: 'Glass-rod test', obs: `Crystals formed on the rod as the drop cooled, with ${f0(C.water)} cm³ of water left. This is the crystallisation point: stop heating.` });
        _discover('c_rod');
        _coach('Crystals on the rod! This is the crystallisation point - turn the heat off, then let it cool.');
        _guideEvent('rod');
      } else {
        _logEntry({ title: 'Glass-rod test', note: true, obs: `No crystals on the rod (${f0(C.water)} cm³ of water left): not saturated enough yet. Keep heating.` });
        _coach('No crystals on the rod yet - keep heating, then test again.');
      }
      _refresh();
    }, { positive });
  }

  function cool(kind) {
    if (_busy || _mode !== 'crystal') return;
    const C = _cry;
    if (C.heat) { _coach('Turn the heat off first, then let it cool.'); return; }
    if (C.dry) { _coach('The basin is dry. Tap “Start again”.'); return; }
    if (C.cool) { _coach('It is already cooling.'); return; }
    if (!C.heated) { _coach('Heat the solution first, to evaporate some of the water.'); return; }
    C.cool = kind === 'fast' ? 'fast' : 'slow';
    _coach(C.cool === 'slow' ? 'Left to cool slowly (time-lapse - really this takes hours). Watch the basin…'
                             : 'Standing the basin in cold water to cool it quickly…');
    _syncTools(); _readouts();
    _guideEvent('cool:' + C.cool);
  }

  function _cryDone() {
    const C = _cry, slow = C.cool === 'slow';
    _logEntry({ title: slow ? 'Big crystals' : 'Tiny crystals',
      obs: slow
        ? `As the solution cooled slowly to ${SD.ROOM} °C, a few large, well-shaped blue crystals of copper(II) sulfate grew in the basin.`
        : `Cooled quickly to ${SD.ROOM} °C, the solution filled with lots of tiny blue crystals.` });
    _discover(slow ? 'c_big' : 'c_small');
    const ms = _mission;
    if (ms && ms.id === 'crystals') {
      if (slow) { ms.success = true; _coach('🎯 Big blue crystals! Tap “Answer the questions” to finish the mission.'); Labs.confetti(); }
      else _coach('Tiny crystals - for this mission you need BIG ones. Tap “Start again” and cool it slowly.');
    } else _coach(slow ? 'Slow cooling gave big crystals. Try cooling quickly next time and compare.' : 'Fast cooling gave tiny crystals. Try cooling slowly and compare.');
    _refresh();
    _guideEvent('wait:crystals');
  }

  // ══ Sublimation ══════════════════════════════
  function _subSay(k, v) {
    return {
      mixture: { iodine: 'Iodine and sand in an evaporating dish, on a tripod and gauze.', nh4cl: 'Ammonium chloride and salt in an evaporating dish, on a tripod and gauze.' },
      place: { hood: 'Working in the fume cupboard - its fan draws fumes away.', bench: 'Working on the open bench…' },
      cover: { funnel_plug: 'An inverted funnel over the dish, with a cotton wool plug in its stem.', funnel: 'An inverted funnel over the dish - no plug.', none: 'Nothing over the dish.' },
    }[k][v];
  }
  function _setSubPart(k, v) {
    const P = SD.SUB_PARTS[k];
    if (!P.options[v]) return;
    if (_mode !== 'sublime') setMode('sublime', true);
    if (_mode !== 'sublime') return;
    if (_sub.heat) { _coach('Turn the heat off before you change anything.'); return; }
    const parts = Object.assign({}, _sub.parts, { [k]: v });
    _sub = _newSub(parts);
    _parts = [];
    const chk = SD.checkSublime(parts);
    _coach(_subSay(k, v) + (chk.missing.length ? '' : ' Ready - goggles on, then heat.'));
    _afterChange('part:' + k + ':' + v);
  }

  function _stepSub(dt) {
    const U = _sub;
    if (!U.heat) return;
    const M = SD.SUBLIME_MIXES[U.parts.mixture];
    U.heatT += dt;
    if (U.heatT < M.onset) return;
    if (U.parts.place === 'bench' && !U.flagged.fumes) {
      U.flagged.fumes = true; U.heat = false;
      _hazard('fumes', { solid: M.solid, fumes: M.fumes });
      return;
    }
    const s = Math.min(M.rate * dt, U.left);
    U.left -= s; U.subT += dt;
    const k = SD.CATCH[U.parts.cover];
    U.sublimate += s * k; U.escaped += s * (1 - k);
    if (U.parts.cover !== 'funnel_plug' && U.subT >= SD.SUB.cardAfter && !U.flagged.card) {
      U.flagged.card = true; U.heat = false;
      _syncTools();
      _result(U.parts.cover === 'none' ? 'no_funnel' : 'no_plug', { vapour: M.vapour, solid: M.solid });
      return;
    }
    if (U.left <= 1e-6) { U.left = 0; U.heat = false; U.done = true; _subDone(); }
  }

  function _subDone() {
    const U = _sub, M = SD.SUBLIME_MIXES[U.parts.mixture];
    _logEntry({ title: `Sublimation: ${M.name.toLowerCase()}`,
      obs: `${M.vapour[0].toUpperCase() + M.vapour.slice(1)} rose from the dish without any melting, and ${M.sublimate} formed on the cool inside of the funnel - the sublimate (${f1(U.sublimate)} g). The ${M.other} stayed in the dish.` });
    _discover(U.parts.mixture === 'iodine' ? 's_iodine' : 's_nh4cl');
    _coach(`It has all sublimed. The ${M.solid} is on the funnel; the ${M.other} is left in the dish.`);
    _syncTools(); _refresh();
    _guideEvent('wait:sublimate');
  }

  // ══ Which technique? ═════════════════════════
  function _selectMix(id) {
    const i = SD.MIXTURES.findIndex(m => m.id === id);
    if (i < 0 || _busy) return;
    if (_mode !== 'choose') setMode('choose', true);
    if (_mode !== 'choose') return;
    _ch.idx = i; _ch.phase = 'tech';
    _refreshBench(); _readouts(); _highlight();
  }

  function pickTech(t) {
    if (_busy || _mode !== 'choose') return;
    const mx = _curMix();
    if (!mx || _ch.done[mx.id] || _ch.phase !== 'tech' || !SD.TECHNIQUES[t]) return;
    if (t === mx.tech) {
      _ch.phase = 'why';
      _coach(`Yes - ${SD.TECHNIQUES[t].name.toLowerCase()}. Now pick the reason it works.`);
    } else {
      _result('wrong_tech', { why: mx.wrong[t], right: mx.tech });
    }
    _refreshBench(); _readouts(); _highlight();
  }

  function pickWhy(p) {
    if (_busy || _mode !== 'choose') return;
    const mx = _curMix();
    if (!mx || _ch.phase !== 'why' || !SD.PRINCIPLES[p]) return;
    const T = SD.TECHNIQUES[mx.tech];
    if (p !== SD.TECH_PRINCIPLE[mx.tech]) {
      if (_mission) _mission.mistakes++;
      const other = Object.keys(SD.TECH_PRINCIPLE).find(k => SD.TECH_PRINCIPLE[k] === p);
      _coach(`Not that one - that is the idea behind ${SD.TECHNIQUES[other].name.toLowerCase()}. Why does ${T.name.toLowerCase()} work here?`);
      return;
    }
    _ch.done[mx.id] = true; _ch.order.push(mx.id);
    _logEntry({ title: `${mx.name} → ${T.name}`, obs: `You want ${mx.want}. ${SD.PRINCIPLES[p]}` });
    _discover('ch_right');
    const all = SD.MIXTURES.every(m => _ch.done[m.id]);
    if (all) {
      _discover('ch_all');
      if (_mission && _mission.id === 'sorter') { _mission.success = true; _coach('🎯 All six sorted! Tap “Answer the questions” to finish the mission.'); Labs.confetti(); }
      else _coach('All six mixtures sorted - you are a technique expert.');
    } else {
      _ch.idx = SD.MIXTURES.findIndex(m => !_ch.done[m.id]);
      _ch.phase = 'tech';
      _coach(`Right: ${T.name.toLowerCase()}. Next mixture…`);
    }
    _refreshBench(); _readouts(); _refresh();
    _guideEvent('choose:' + mx.id);
  }

  function choose(id) {
    const mx = SD.MIXTURES.find(m => m.id === id);
    if (!mx) return;
    if (_mode !== 'choose') setMode('choose', true);
    if (_ch.done[id]) { _guideEvent('choose:' + id); return; }
    _selectMix(id);
    pickTech(mx.tech);
    pickWhy(SD.TECH_PRINCIPLE[mx.tech]);
  }

  // ══ Hazards and result cards ═════════════════
  function _hazard(id, ctx) {
    const H = SD.HAZARDS[id];
    const st = Labs.store('separation');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _allHeatOff(); _syncTools();
    _busy = true;
    _fxAdd(H.fx, () => {
      _busy = false;
      if (H.card) _discover(SD.CARD_DISC[H.card]);
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: H.reset ? 'Get fresh glassware' : 'Got it - try again safely',
        onClose: () => { _afterHazard(id); if (H.card) _guideEvent('card:' + H.card); } });
    });
  }
  function _afterHazard(id) {
    if (id === 'no_goggles') _coach('Tap 🥽 at the top to put your goggles on, then heat again.');
    else if (id === 'bumping') {
      _dist.T = SD.ROOM; _dist.boiling = false; _dist.heatT = 0; _dist.readings = []; _dist.nextRead = 0;
      _coach('The flask has been left to cool. Add anti-bumping granules on the shelf, then heat again.');
    } else if (id === 'sealed') { _dist = _newDist(); _coach('Fresh glassware. Build the rig again - and leave the conical flask OPEN.'); }
    else if (id === 'fumes') { _sub = _newSub(_sub.parts); _coach('Move it into the fume cupboard (shelf below), then heat again.'); }
    _readouts(); _refreshBench(); _syncTools();
  }

  function _result(id, ctx) {
    if (SD.CARD_DISC[id]) _discover(SD.CARD_DISC[id]);
    if (_mission) _mission.mistakes++;
    _cards.push({ id, ctx: ctx || {} });
    _showCard();
  }
  function _showCard() {
    if (!_cards.length || _busy || $('lab-overlay')) return;
    const k = _cards.shift(), R = SD.RESULTS[k.id];
    Labs.resultCard({ icon: R.icon, title: val(R.title, k.ctx), happened: val(R.happened, k.ctx), instead: val(R.instead, k.ctx),
      exam: R.exam, button: _cards.length ? 'Next →' : 'Got it',
      onClose: () => {
        _guideEvent('card:' + k.id);
        if (_cards.length) _showCard();
        else if (CARD_NEXT[k.id]) _coach(CARD_NEXT[k.id]);
      } });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    if (_mode === 'distil') _stepDist(dt);
    else if (_mode === 'crystal') _stepCry(dt);
    else if (_mode === 'sublime') _stepSub(dt);
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = SD.MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _mission = null;
    _resetAll();
    _allHeatOff();
    _mode = M.mode;
    _mission = { id, hazards: 0, mistakes: 0, success: false };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel(); _syncTools(); _readouts(); _setAria();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = SD.MISSIONS.find(x => x.id === ms.id);
    const allow = ms.id === 'sorter' ? 1 : 0;
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.mistakes > allow) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('separation');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} - no hazards next time for an extra star.` : 'No safety mistakes. 🥽');
      if (ms.id === 'seawater') lines.push(ms.mistakes ? 'Your rig had a mistake in it - build it right first time for another star.' : 'Rig built right first time. ⚗️');
      else if (ms.id === 'crystals') lines.push(ms.mistakes ? 'Heated to dryness or cooled too soon - stop exactly at the crystallisation point for another star.' : 'Stopped at exactly the right moment. 💎');
      else lines.push(ms.mistakes > allow ? `${ms.mistakes} wrong picks - one slip is allowed for the star.` : 'Sorted with hardly a slip. 🧰');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or go and hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  const _gdef = () => _guide && (_guide.def || SD.GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || SD.GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _resetAll();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel(); _syncTools(); _readouts();
    _guideEnter();
    const z = $('lab-sep-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step that is already true is skipped, so the guide never waits for
  // something the pupil did before it asked.
  function _alreadyDone(on) {
    const [k, a, b] = on.split(':');
    if (k === 'goggles') return _goggles;
    if (k === 'mode') return _mode === a;
    if (k === 'part') return SD.PARTS[a] ? (_mode === 'distil' && _dist.parts[a] === b) : (_mode === 'sublime' && _sub.parts[a] === b);
    if (k === 'heat') return _heating();
    if (k === 'choose') return !!_ch.done[a];
    return false;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    let s = G.steps[_guide.step];
    while (s && _alreadyDone(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${s.btn ? `<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>`
                : '<p class="lab-guide-wait">⏳ Keep watching the apparatus…</p>'}
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

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const [k, a, b] = s.on.split(':');
    if (k === 'goggles') { if (!_goggles) goggles(); }
    else if (k === 'mode') setMode(a);
    else if (k === 'part') setPart(a, b);
    else if (k === 'build') build(a);
    else if (k === 'heat') heatOn();
    else if (k === 'heat-off') heatOff();
    else if (k === 'rod') rod();
    else if (k === 'cool') cool(a);
    else if (k === 'drop') drop();
    else if (k === 'reset') reset();
    else if (k === 'choose') choose(a);
  }

  // ── Discoveries: every card opens ─────────────
  function _autoStep(on) {
    const [k, a, b] = on.split(':');
    if (k === 'goggles') return { on, say: 'Put on your goggles first - you are going to heat something.', btn: '🥽 Put on goggles' };
    if (k === 'mode') return { on, say: `Open the ${MODES[a].name.toLowerCase()} bench.`, btn: `${MODES[a].icon} ${MODES[a].name}` };
    if (k === 'build') {
      const R = SD.RIGS[a];
      return { on, say: `Set up ${R.label}.${SD.checkRig(R.parts).ok ? '' : ' Look closely at the picture - then see what happens.'}`, btn: '🔧 Set it up' };
    }
    if (k === 'part') {
      const P = SD.PARTS[a] || SD.SUB_PARTS[a];
      return { on, say: `${P.name}: ${P.options[b]}.`, btn: `${P.icon} ${P.options[b]}` };
    }
    if (k === 'heat') return { on, say: 'Light the burner and start heating.', btn: '🔥 Start heating' };
    if (k === 'heat-off') return { on, say: 'Turn the heat off.', btn: '🧯 Turn off the heat' };
    if (k === 'rod') return { on, say: 'Dip a glass rod in and take it out. No crystals on it? Keep heating and test again.', btn: '🥢 Test with the glass rod' };
    if (k === 'cool') return a === 'slow'
      ? { on, say: 'Leave the basin to cool slowly.', btn: '🐢 Leave to cool slowly' }
      : { on, say: 'Stand the basin in cold water to cool it quickly.', btn: '❄️ Cool it quickly' };
    if (k === 'drop') return { on, say: 'Put a drop of the distillate on a watch glass and let it evaporate.', btn: '💧 Test a drop' };
    if (k === 'reset') return { on, say: 'Clear the bench.', btn: '🧽 Clear the bench' };
    if (k === 'choose') {
      const mx = SD.MIXTURES.find(m => m.id === a), T = SD.TECHNIQUES[mx.tech];
      return { on, say: `${mx.name} - you want ${mx.want}. Which technique, and why?`, btn: `${T.icon} ${T.name}` };
    }
    if (k === 'wait') return { on, say: { boil: 'Watch - it is heating up…', 100: 'Watch the thermometer…', distillate: 'Watch the distillate collect…',
      crystals: 'Watch the crystals grow as it cools…', sublimate: 'Watch the vapour and the funnel above it…' }[a] || 'Keep watching…' };
    return { on, say: 'Watch what happens…' };
  }

  function discoveryGuide(id) {
    const d = SD.DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = SD.DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('separation').disc[id];
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
    const st = Labs.store('separation');
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : SD.GUIDES.find(g => !st.guides[g.id]);
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
    const [k, a, b] = s.on.split(':');
    let sel = null;
    if (k === 'goggles') sel = '#lab-goggles';
    else if (k === 'mode') sel = `[data-mode="${a}"]`;
    else if (k === 'part') sel = `[data-part="${a}"][data-opt="${b}"]`;
    else if (k === 'heat' || k === 'heat-off') sel = '.lab-tools [data-act="heat"]';
    else if (k === 'rod') sel = '.lab-tools [data-act="rod"]';
    else if (k === 'cool') sel = `.lab-tools [data-act="cool-${a}"]`;
    else if (k === 'drop') sel = '.lab-tools [data-act="drop"]';
    else if (k === 'reset') sel = '.lab-tools [data-act="reset"]';
    else if (k === 'choose') {
      const mx = SD.MIXTURES.find(m => m.id === a);
      if (mx && _curMix().id === a) sel = _ch.phase === 'tech' ? `[data-tech="${mx.tech}"]` : `[data-why="${SD.TECH_PRINCIPLE[mx.tech]}"]`;
      else sel = `[data-mix="${a}"]`;
    }
    const el = sel && _root.querySelector(sel);
    if (el) el.classList.add('is-next');
  }

  // ══ Panels ═══════════════════════════════════
  function _startHTML() {
    const st = Labs.store('separation');
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
        <li><b>Follow the yellow box</b> under the picture. The thing to tap next glows yellow.</li>
        <li><b>Watch the apparatus</b>, then read what happened in your lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${SD.GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${SD.MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or experiment freely: pick a technique below and build it yourself.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.closest('.lab-tabs')) b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _benchHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _modesHTML() + _benchHTML() + _notebookHTML();
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
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  function _refreshBench() {
    const b = $('lab-bench');
    if (b) b.outerHTML = _benchHTML();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    if (!id) return;
    const d = SD.DISCOVERIES.find(x => x.id === id);
    if (Labs.discover('separation', id, { title: d && d.title, total: SD.DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store('separation').disc).length}/${SD.DISCOVERIES.length}`;
  }

  function _modesHTML() {
    if (_mission) return '';
    return `<div class="lab-separation-modes" role="group" aria-label="Choose a technique">${Object.keys(MODES).map(m =>
      `<button type="button" data-mode="${m}" aria-pressed="${_mode === m}"><span aria-hidden="true">${MODES[m].icon}</span> ${esc(MODES[m].label)}</button>`).join('')}</div>`;
  }

  function _partRows(table, order, parts) {
    return order.map(k => {
      const P = table[k];
      return `<div class="lab-separation-part">
        <div class="lab-separation-part-head"><span aria-hidden="true">${P.icon}</span><span class="lab-separation-part-name"><b>${esc(P.name)}</b><small>${esc(P.hint)}</small></span></div>
        <div class="lab-separation-opts">${Object.keys(P.options).map(o =>
          `<button type="button" class="lab-separation-opt" data-part="${k}" data-opt="${o}" aria-pressed="${parts[k] === o}">${esc(P.options[o])}</button>`).join('')}</div>
      </div>`;
    }).join('');
  }

  function _benchHTML() {
    if (_mode === 'distil') {
      const chk = SD.checkRig(_dist.parts), n = SD.PART_ORDER.length - chk.missing.length;
      return `<section class="lab-shelf" id="lab-bench" aria-label="Distillation apparatus">
        <div class="lab-shelf-head"><h2>Distillation apparatus</h2><p class="lab-hint">Tap a choice to put that part on the rig.</p></div>
        ${_partRows(SD.PARTS, SD.PART_ORDER, _dist.parts)}
        <p class="lab-separation-rigstate${chk.missing.length ? '' : ' is-ok'}">${n} of ${SD.PART_ORDER.length} parts on the bench${chk.missing.length ? '' : ' - ready to heat'}</p>
      </section>`;
    }
    if (_mode === 'crystal') {
      const K = SD.CRYSTAL;
      return `<section class="lab-shelf" id="lab-bench" aria-label="Crystallisation">
        <div class="lab-shelf-head"><h2>Crystallisation</h2></div>
        <p class="lab-hint">An evaporating basin on a tripod and gauze holds ${K.water} cm³ of water with ${K.grams} g of copper(II) sulfate dissolved in it. Use the buttons under the picture: 🔥 heat, 🥢 glass rod, then cool.</p>
        <div class="lab-table-wrap"><table class="lab-table lab-separation-sol">
          <caption>Solubility of copper(II) sulfate (grams in 100 g of water)</caption>
          <thead><tr><th scope="row">°C</th>${SD.SOLUBILITY.map(r => `<th scope="col">${r[0]}</th>`).join('')}</tr></thead>
          <tbody><tr><th scope="row">g</th>${SD.SOLUBILITY.map(r => `<td>${r[1]}</td>`).join('')}</tr></tbody></table></div>
        <p class="lab-hint">Hot water holds far more than cold - that is why crystals form as it cools.</p>
      </section>`;
    }
    if (_mode === 'sublime') {
      const chk = SD.checkSublime(_sub.parts);
      return `<section class="lab-shelf" id="lab-bench" aria-label="Sublimation apparatus">
        <div class="lab-shelf-head"><h2>Sublimation apparatus</h2><p class="lab-hint">An evaporating dish on a tripod and gauze, over a Bunsen burner.</p></div>
        ${_partRows(SD.SUB_PARTS, SD.SUB_ORDER, _sub.parts)}
        <p class="lab-separation-rigstate${chk.missing.length ? '' : ' is-ok'}">${chk.missing.length ? 'Choose one of each to get ready.' : 'Ready to heat.'}</p>
      </section>`;
    }
    const mx = _curMix(), n = Object.keys(_ch.done).length, done = !!_ch.done[mx.id];
    let body;
    if (done) body = `<p class="lab-separation-q is-ok">✓ Sorted: ${esc(SD.TECHNIQUES[mx.tech].name)}</p>`;
    else if (_ch.phase === 'tech') body = `<p class="lab-separation-q">1 · Which technique?</p>
      <div class="lab-separation-choices">${Object.keys(SD.TECHNIQUES).map(t => {
        const T = SD.TECHNIQUES[t];
        return `<button type="button" class="lab-separation-choice" data-tech="${t}"><b><span aria-hidden="true">${T.icon}</span> ${esc(T.name)}</b><small>Keeps ${esc(T.gets)}</small></button>`;
      }).join('')}</div>`;
    else body = `<p class="lab-separation-q">2 · Why does ${esc(SD.TECHNIQUES[mx.tech].name.toLowerCase())} work here?</p>
      <div class="lab-separation-why">${Object.keys(SD.PRINCIPLES).map(p =>
        `<button type="button" class="lab-separation-choice" data-why="${p}">${esc(SD.PRINCIPLES[p])}</button>`).join('')}</div>`;
    return `<section class="lab-shelf" id="lab-bench" aria-label="Which technique?">
      <div class="lab-shelf-head"><h2>Which technique?</h2><p class="lab-hint">${n} of ${SD.MIXTURES.length} sorted</p></div>
      <div class="lab-separation-chips">${SD.MIXTURES.map((m, i) =>
        `<button type="button" class="lab-separation-chip${_ch.done[m.id] ? ' is-done' : ''}" data-mix="${m.id}" aria-pressed="${i === _ch.idx}">${_ch.done[m.id] ? '✓ ' : ''}${esc(m.name)}</button>`).join('')}</div>
      <div class="lab-separation-mix"><b>${esc(mx.name)}</b><small>You want: ${esc(mx.want)}</small></div>
      ${body}
    </section>`;
  }

  function _notebookHTML() {
    let table = '';
    if (_mode === 'distil' && _dist.readings.length) {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Readings: heating the ${esc(SD.FLASKS[_dist.parts.flask].long)} (${esc(SD.TIME_LAPSE)})</caption>
        <thead><tr><th scope="col">Time (min)</th><th scope="col">Thermometer (°C)</th><th scope="col">Distillate (cm³)</th></tr></thead>
        <tbody>${_dist.readings.map(r => `<tr><td>${r.t}</td><td>${r.read == null ? '-' : f1(r.read)}</td><td>${f1(r.dist)}</td></tr>`).join('')}</tbody></table></div>`;
    } else if (_mode === 'crystal' && _cry.rods.length) {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Glass-rod tests</caption>
        <thead><tr><th scope="col">Water left (cm³)</th><th scope="col">Crystals on the rod?</th></tr></thead>
        <tbody>${_cry.rods.slice(-8).map(r => `<tr><td>${f0(r.water)}</td><td>${r.positive ? 'Yes - stop heating' : 'No - keep heating'}</td></tr>`).join('')}</tbody></table></div>`;
    } else if (_mode === 'choose' && _ch.order.length) {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Results: choosing a technique</caption>
        <thead><tr><th scope="col">Mixture</th><th scope="col">Technique</th></tr></thead>
        <tbody>${_ch.order.map(id => { const m = SD.MIXTURES.find(x => x.id === id); return `<tr><th scope="row">${esc(m.name)}</th><td>${esc(SD.TECHNIQUES[m.tech].name)}</td></tr>`; }).join('')}</tbody></table></div>`;
    }
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 14).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">Your observations and readings appear here as you experiment.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${table}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('separation');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Finish the experiment, answer the exam-style questions, earn up to three stars.</p>
      ${SD.MISSIONS.map(M => {
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
    const M = SD.MISSIONS.find(x => x.id === ms.id);
    const li = (done, text) => `<li class="${done ? 'is-done' : ''}">${esc(text)}</li>`;
    let body = '';
    if (ms.id === 'seawater') {
      const D = _dist, chk = SD.checkRig(D.parts);
      body = `<ul class="lab-steps">
        ${li(_goggles, '🥽 Goggles on')}
        ${li(!chk.missing.length, `Build the rig (${SD.PART_ORDER.length - chk.missing.length} of ${SD.PART_ORDER.length} parts)`)}
        ${li(D.heatT > 0 || D.done, 'Heat the flask of sea water')}
        ${li(ms.success, `Collect ${SD.DISTIL.target} cm³ of distillate`)}
        ${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Distillate: ${f1(D.dist)} of ${SD.DISTIL.target} cm³</p>`;
    } else if (ms.id === 'crystals') {
      const C = _cry;
      body = `<ul class="lab-steps">
        ${li(_goggles, '🥽 Goggles on')}
        ${li(C.heated, 'Heat to evaporate some water')}
        ${li(C.rodOK, 'Find the crystallisation point with the glass rod')}
        ${li(C.cool === 'slow', 'Turn off the heat and cool it slowly')}
        ${li(ms.success, 'Grow big crystals')}
        ${li(false, 'Answer the questions')}</ul>`;
    } else {
      const n = Object.keys(_ch.done).length;
      body = `<ul class="lab-steps">
        ${li(n === SD.MIXTURES.length, `Choose the technique and the reason for all ${SD.MIXTURES.length} mixtures`)}
        ${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">${n} of ${SD.MIXTURES.length} mixtures sorted</p>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('separation');
    const all = SD.DISCOVERIES;
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _syncTools() {
    const t = $('lab-tools');
    if (!t) return;
    const btn = (act, icon, label, extra) => `<button type="button" class="lab-tool" data-act="${act}"${extra || ''}><span aria-hidden="true">${icon}</span><em>${esc(label)}</em></button>`;
    const h = _heating();
    const heat = btn('heat', h ? '🧯' : '🔥', h ? 'Stop heating' : (_mode === 'sublime' ? 'Heat gently' : 'Heat'), ` aria-pressed="${h}"`);
    let html;
    if (_mode === 'distil') html = heat + btn('drop', '💧', 'Test a drop') + btn('reset', '🧽', 'Clear the bench');
    else if (_mode === 'crystal') html = heat + btn('rod', '🥢', 'Glass rod') + btn('cool-slow', '🐢', 'Cool slowly') + btn('cool-fast', '❄️', 'Cool quickly') + btn('reset', '🧽', 'Start again');
    else if (_mode === 'sublime') html = heat + btn('reset', '🧽', 'Clear the bench');
    else html = btn('reset', '🧽', 'Start the sort again');
    t.innerHTML = html;
    _highlight();
  }

  function _intro() {
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">⚗️</p>
        <h2 id="lab-ov-title">Welcome to the Separation Station</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through building a distillation rig, one tap at a time.</li>
          <li><b>Four benches.</b> Distil sea water, grow copper(II) sulfate crystals, sublime iodine - and choose the right technique for a mixture.</li>
          <li><b>Build it yourself.</b> Put each part where you think it goes. If it is wrong, you will see exactly what happens.</li>
          <li><b>Get it wrong safely.</b> Heat a sealed rig or forget the granules and you’ll see the hazard, what happened, and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${SD.DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="rig" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('separation'); st.intro = true; Labs.persist();
        _coach('First rule of the lab: tap 🥽 to put on your goggles before you heat anything.');
      } });
  }

  function _help() {
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Separation Station works</h2>
      <div class="lab-help">
        <section><h3>Using the benches</h3><ul>
          <li>Pick a technique: Distil, Crystallise, Sublime or Which technique?</li>
          <li>Build the apparatus by tapping a choice for each part on the shelf.</li>
          <li>Use the buttons under the picture to heat, test and cool. ${esc(SD.TIME_LAPSE)}.</li>
          <li>Everything you see and measure goes into the lab notebook.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Goggles on before you heat anything.</li>
          <li>Anti-bumping granules in the flask BEFORE heating - never into a hot liquid.</li>
          <li>Never heat a closed (sealed) apparatus.</li>
          <li>Heat iodine only in a fume cupboard, under a funnel with a cotton wool plug.</li>
          <li>Never boil a flask or a basin dry.</li></ul></section>
        <section><h3>Which technique?</h3>
          <div class="lab-table-wrap"><table class="lab-table"><thead><tr><th scope="col">Technique</th><th scope="col">Use it to keep…</th></tr></thead>
          <tbody>${Object.keys(SD.TECHNIQUES).map(t => `<tr><th scope="row">${SD.TECHNIQUES[t].icon} ${esc(SD.TECHNIQUES[t].name)}</th><td>${esc(SD.TECHNIQUES[t].gets)}. ${esc(SD.PRINCIPLES[SD.TECH_PRINCIPLE[t]])}</td></tr>`).join('')}</tbody></table></div></section>
        <section><h3>Useful numbers</h3><ul>
          <li>Water boils at ${SD.POINTS.water.boils} °C; salt boils at ${SD.POINTS.salt.boils} °C.</li>
          <li>Iodine sublimes on gentle heating (heated strongly, it melts at ${SD.POINTS.iodine.melts} °C - beyond the NCE syllabus).</li>
          <li>1 cm³ of water makes about ${SD.STEAM_PER_CM3} cm³ of steam.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_dist) return;
    const rd = $('lab-read'), st = $('lab-status'), ct = $('lab-contents');
    const chip = (t, cls) => `<span class="lab-chip${cls ? ' ' + cls : ''}">${t}</span>`;
    let r = '', chips = [], text = '';
    if (_mode === 'distil') {
      const D = _dist, p = D.parts;
      r = p.thermo ? `🌡️ ${f1(D.read)} °C <small>${p.thermo === 'arm' ? 'at the side arm' : 'bulb in the liquid'}</small>` : '🌡️ <small>no thermometer yet</small>';
      if (D.heat) chips.push(chip('🔥 Heating', 'is-warm'));
      if (D.boiling) chips.push(chip('♨️ Boiling'));
      if (p.receiver === 'sealed' && D.pressure > 0.3) chips.push(chip('⚠️ Pressure rising!', 'is-danger'));
      else if (D.escaped > 0.5 && D.boiling) chips.push(chip('💨 Steam escaping', 'is-warm'));
      text = p.flask ? `Flask: ${f0(D.vol)} cm³ of ${SD.FLASKS[p.flask].name.toLowerCase()} · Distillate: ${f1(D.dist)} cm³` : 'Build the rig: tap the parts on the shelf below.';
    } else if (_mode === 'crystal') {
      const C = _cry;
      r = `🌡️ ${f0(C.T)} °C <small>${f1(C.water)} cm³ of water left</small>`;
      if (C.heat) chips.push(chip(C.T >= SD.CRYSTAL.boils ? '♨️ Evaporating' : '🔥 Heating', 'is-warm'));
      if (C.crust && !C.dry && C.heat) chips.push(chip('⚠️ Spitting!', 'is-danger'));
      if (C.cool && !C.done) chips.push(chip(C.cool === 'slow' ? '🐢 Cooling slowly' : '❄️ Cooling quickly'));
      if (C.onset != null) chips.push(chip(`💎 Crystals from ${f0(C.onset)} °C`));
      text = C.dry ? 'The basin is dry: a white powder.' : `Evaporating basin: ${SD.CRYSTAL.grams} g of copper(II) sulfate in ${f1(C.water)} cm³ of water`;
    } else if (_mode === 'sublime') {
      const U = _sub, M = U.parts.mixture && SD.SUBLIME_MIXES[U.parts.mixture];
      r = M ? `${U.heat ? '🔥 ' + esc(M.heat) : 'Burner off'} <small>sublimate: ${f1(U.sublimate)} g</small>` : '<small>Choose a mixture on the shelf below</small>';
      if (U.parts.place === 'hood') chips.push(chip('🏠 Fume cupboard'));
      if (U.heat && U.heatT >= (M ? M.onset : 99)) chips.push(chip('💨 Subliming', 'is-warm'));
      text = M ? `Dish: ${f1(U.left)} g of ${M.short} + ${M.other} · On the funnel: ${f1(U.sublimate)} g` : 'The dish is empty.';
    } else {
      const mx = _curMix();
      r = `Sorted ${Object.keys(_ch.done).length} of ${SD.MIXTURES.length}`;
      text = `${mx.name} - you want ${mx.want}`;
    }
    if (rd) rd.innerHTML = r;
    if (st) st.innerHTML = chips.join('');
    if (ct) ct.textContent = text;
    const pr = _root.querySelector('#lab-mission .lab-progress-text');
    if (pr && _mission && _mission.id === 'seawater') pr.textContent = `Distillate: ${f1(_dist.dist)} of ${SD.DISTIL.target} cm³`;
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    const f = { type, t: 0, dur: FX_DUR[type] || 0.6, done, data: data || {} };
    if (type === 'spit' || type === 'bump' || type === 'burst') f.parts = _burst(type);
    _fx.push(f);
  }
  function _burst(type) {
    const out = [], n = type === 'burst' ? 40 : 22;
    for (let i = 0; i < n; i++) {
      const a = type === 'burst' ? rnd() * Math.PI * 2 : -Math.PI / 2 + (rnd() - 0.5) * 1.5;
      const sp = type === 'burst' ? 90 + rnd() * 200 : 70 + rnd() * 130;
      out.push({ x: 0, y: 0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 1.4 + rnd() * 2.6, rot: rnd() * 6 });
    }
    return out;
  }

  // ══ Particles ════════════════════════════════
  // Distillation vapour travels along one path: up the neck, along the side
  // arm, down the inner tube of the condenser, into the receiver.
  const P0 = [116, 100], P1 = [252, 152];
  const _cond = t => [P0[0] + (P1[0] - P0[0]) * t, P0[1] + (P1[1] - P0[1]) * t];
  const _flaskLevel = v => 180 - (v / 100) * 34;
  const _recvLevel = v => 240 - (Math.min(v, 60) / 60) * 36;
  function _vapourPath(lvl) { return [[70, lvl], [70, 86], [80, 86], P0, P1, [267, 198]]; }
  function _along(path, s) {
    for (let i = 1; i < path.length; i++) {
      const [x0, y0] = path[i - 1], [x1, y1] = path[i], L = Math.hypot(x1 - x0, y1 - y0);
      if (s <= L) return { x: x0 + (x1 - x0) * s / L, y: y0 + (y1 - y0) * s / L, seg: i };
      s -= L;
    }
    const e = path[path.length - 1];
    return { x: e[0], y: e[1], seg: path.length, end: true };
  }
  const _condFrac = () => {
    const P = SD.DISTIL;
    return P.condenseTop + (P.condenseFull - P.condenseTop) * clamp((_dist.jacket - P.topFill) / (1 - P.topFill), 0, 1);
  };

  function _animate(dt) {
    if (!dt || Labs.calm()) return;
    const add = o => { if (_parts.length < 260) _parts.push(o); };
    if (_mode === 'distil') {
      const D = _dist, lvl = _flaskLevel(D.vol);
      if (D.parts.flask && D.heat && D.T > 70) {
        const rate = D.boiling ? 34 : (D.T - 70) / 30 * 8;
        D._b = (D._b || 0) + rate * dt;
        while (D._b >= 1) { D._b -= 1; add({ k: 'b', x: 50 + rnd() * 40, y: 177, r: 0.8 + rnd() * 2, vy: 24 + rnd() * 30 }); }
      }
      if (D.boiling) {
        D._v = (D._v || 0) + 7 * dt;
        while (D._v >= 1) { D._v -= 1; add({ k: 'v', s: 0, sp: 62 + rnd() * 22, cond: rnd() < _condFrac() }); }
      }
      const path = _vapourPath(lvl), recv = _recvLevel(D.dist);
      for (let i = _parts.length - 1; i >= 0; i--) {
        const q = _parts[i];
        if (q.k === 'b') { q.y -= q.vy * dt; q.x += Math.sin(q.y * 0.3) * 0.3; if (q.y <= lvl + 1 || !D.parts.flask) _parts.splice(i, 1); }
        else if (q.k === 'v') {
          q.s += q.sp * dt;
          const at = _along(path, q.s);
          q.x = at.x; q.y = at.y; q.seg = at.seg;
          if (at.end) {
            _parts.splice(i, 1);
            if (q.cond) add({ k: 'd', x: 267, y: 198, vy: 20 });
            else if (D.parts.receiver !== 'sealed') add({ k: 'st', x: 270, y: 184, vy: -22, life: 0 });
          }
        } else if (q.k === 'd') { q.vy += 400 * dt; q.y += q.vy * dt; if (q.y >= recv) _parts.splice(i, 1); }
        else if (q.k === 'st') { q.y += q.vy * dt; q.x += Math.sin(q.life * 4) * 0.4; q.life += dt; if (q.life > 1.4) _parts.splice(i, 1); }
        else _parts.splice(i, 1);
      }
    } else if (_mode === 'crystal') {
      const C = _cry, lvl = 170 - (C.water / 60) * 40;
      if (C.heat && C.T >= SD.CRYSTAL.boils) {
        C._w = (C._w || 0) + 6 * dt;
        while (C._w >= 1) { C._w -= 1; add({ k: 'w', x: 128 + rnd() * 84, y: lvl - 2, vy: -(26 + rnd() * 14), life: 0, ph: rnd() * 6 }); }
        C._b = (C._b || 0) + 20 * dt;
        while (C._b >= 1) { C._b -= 1; if (C.water > 2) add({ k: 'b', x: 140 + rnd() * 60, y: 166, r: 0.8 + rnd() * 1.4, vy: 20 + rnd() * 20 }); }
      }
      for (let i = _parts.length - 1; i >= 0; i--) {
        const q = _parts[i];
        if (q.k === 'w') { q.y += q.vy * dt; q.life += dt; q.x += Math.sin(q.ph + q.life * 3) * 0.5; if (q.life > 1.6) _parts.splice(i, 1); }
        else if (q.k === 'b') { q.y -= q.vy * dt; if (q.y <= lvl + 1) _parts.splice(i, 1); }
        else _parts.splice(i, 1);
      }
    } else if (_mode === 'sublime') {
      const U = _sub, M = U.parts.mixture && SD.SUBLIME_MIXES[U.parts.mixture];
      if (M && U.heat && U.heatT >= M.onset && U.left > 0) {
        U._v = (U._v || 0) + 10 * dt;
        while (U._v >= 1) { U._v -= 1; add({ k: 'sv', x: 146 + rnd() * 48, y: 163, vy: -(24 + rnd() * 16), vx: (rnd() - 0.5) * 12, life: 0, escape: rnd() >= SD.CATCH[U.parts.cover] }); }
      }
      const cover = U.parts.cover;
      for (let i = _parts.length - 1; i >= 0; i--) {
        const q = _parts[i];
        if (q.k !== 'sv') { _parts.splice(i, 1); continue; }
        q.life += dt; q.y += q.vy * dt; q.x += q.vx * dt;
        if (cover === 'funnel' || cover === 'funnel_plug') {
          if (q.y > 92) { const hw = 6 + (q.y - 92) / 70 * 40; q.x = clamp(q.x, 170 - hw, 170 + hw); }
          else if (!q.escape) { _parts.splice(i, 1); continue; }
          else q.x = clamp(q.x, 166, 174);
        }
        if (q.y < -10 || q.life > 6) _parts.splice(i, 1);
      }
    }
  }

  // ══ Drawing ══════════════════════════════════
  function _text(c, t, x, y, align, color, size, weight) {
    c.font = `${weight || 600} ${size || 9}px system-ui, sans-serif`;
    c.textAlign = align || 'center';
    c.fillStyle = color || _colors.muted;
    c.fillText(t, x, y);
  }
  function _tube(c, pts, w) {
    c.lineJoin = 'round'; c.lineCap = 'butt';
    c.beginPath();
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    c.strokeStyle = _colors.glass; c.lineWidth = w + 3; c.stroke();
    c.strokeStyle = _colors.top; c.lineWidth = w; c.stroke();
  }
  function _dash(c, fn) {
    c.save(); c.setLineDash([4, 4]); c.strokeStyle = _colors.muted; c.lineWidth = 1.5; c.globalAlpha = 0.7;
    c.beginPath(); fn(); c.stroke(); c.restore();
  }
  function _burner(c, x, on) {
    c.fillStyle = '#5E6B70'; c.fillRect(x - 15, 234, 30, 6);
    c.fillStyle = '#8A979C'; c.fillRect(x - 5, 202, 10, 32);
    c.fillStyle = '#4A5559'; c.fillRect(x - 5, 222, 10, 3);
    if (!on) return;
    const fl = Labs.calm() ? 0 : rnd() * 2;
    c.fillStyle = 'rgba(90,150,255,0.55)';
    c.beginPath(); c.moveTo(x - 6, 202); c.quadraticCurveTo(x - 5, 190 - fl, x, 184 - fl); c.quadraticCurveTo(x + 5, 190 - fl, x + 6, 202); c.closePath(); c.fill();
    c.fillStyle = 'rgba(40,80,220,0.85)';
    c.beginPath(); c.moveTo(x - 3, 202); c.quadraticCurveTo(x - 2, 196, x, 192); c.quadraticCurveTo(x + 2, 196, x + 3, 202); c.closePath(); c.fill();
  }
  function _tripod(c, x, gy) {
    c.lineCap = 'round';
    c.strokeStyle = '#6F7D82'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(x - 26, gy); c.lineTo(x - 36, 240); c.moveTo(x + 26, gy); c.lineTo(x + 36, 240); c.stroke();
    c.strokeStyle = '#9AA6AA'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(x - 34, gy); c.lineTo(x + 34, gy); c.stroke();
    c.strokeStyle = 'rgba(110,122,128,0.6)'; c.lineWidth = 1;
    for (let i = -30; i <= 28; i += 6) { c.beginPath(); c.moveTo(x + i, gy - 1.5); c.lineTo(x + i + 3, gy + 1.5); c.stroke(); }
  }
  function _flaskPath(c) {
    const cx = 70, cy = 150, r = 30, nl = 62, nr = 78, top = 62;
    const dy = Math.sqrt(r * r - (nl - cx) * (nl - cx));
    c.moveTo(nl, top); c.lineTo(nl, cy - dy);
    c.arc(cx, cy, r, Math.atan2(-dy, nl - cx), Math.atan2(-dy, nr - cx), true);
    c.lineTo(nr, top);
  }
  function _recvPath(c) {
    c.moveTo(262, 186); c.lineTo(262, 198); c.lineTo(242, 240); c.lineTo(298, 240); c.lineTo(278, 198); c.lineTo(278, 186);
  }
  function _arrowHead(c, x, y, ang, col) {
    c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = col;
    c.beginPath(); c.moveTo(5, 0); c.lineTo(-4, -4); c.lineTo(-4, 4); c.closePath(); c.fill(); c.restore();
  }

  function _drawDistil(c) {
    const D = _dist, p = D.parts, calm = Labs.calm() || _instant;
    const lvl = _flaskLevel(D.vol);
    _tripod(c, 70, 182);
    if (p.burner) _burner(c, 70, D.heat);
    else _dash(c, () => c.rect(62, 202, 16, 38));

    // flask, its liquid, granules and bubbles
    if (p.flask) {
      const F = SD.FLASKS[p.flask];
      c.save();
      c.beginPath(); c.arc(70, 150, 28.4, 0, Math.PI * 2); c.rect(63.4, 60, 13.2, 72); c.clip();
      let surge = 0;
      const bf = _fx.find(f => f.type === 'bump');
      if (bf) surge = Math.sin(Math.min(1, bf.t / bf.dur) * Math.PI) * 60;
      c.fillStyle = _rgba(F.color, p.flask === 'ink' ? Math.min(0.95, 0.72 + (100 - D.vol) / 300) : 0.7);
      c.fillRect(38, lvl - surge, 64, 190 - lvl + surge);
      c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(42, lvl - surge); c.lineTo(98, lvl - surge); c.stroke();
      if (p.granules === 'yes') {
        c.fillStyle = '#F4F4F0'; c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 0.8;
        [[60, 176], [66, 178], [73, 177.5], [79, 176], [70, 174.5]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 1.9, 0, Math.PI * 2); c.fill(); c.stroke(); });
      }
      c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 0.8;
      if (calm) {
        if (D.boiling) for (let j = 0; j < 12; j++) { c.beginPath(); c.arc(50 + ((j * 29) % 40), lvl + 4 + ((j * 17) % 24), 1.3, 0, Math.PI * 2); c.stroke(); }
      } else _parts.forEach(q => { if (q.k === 'b') { c.beginPath(); c.arc(q.x, q.y, q.r, 0, Math.PI * 2); c.stroke(); } });
      c.restore();
      c.beginPath(); _flaskPath(c);
      c.strokeStyle = _colors.glass; c.lineWidth = 2.2; c.stroke();
      c.beginPath(); c.arc(70, 150, 23, Math.PI * 1.05, Math.PI * 1.35); c.strokeStyle = _colors.hi; c.lineWidth = 2.5; c.stroke();
    } else _dash(c, () => _flaskPath(c));

    // side arm (part of the distillation flask)
    if (p.flask) _tube(c, [[78, 86], [P0[0], P0[1]]], 4.5);

    // condenser
    if (p.condenser) {
      const J0 = _cond(0.12), J1 = _cond(0.88);
      c.lineCap = 'butt';
      c.beginPath(); c.moveTo(J0[0], J0[1]); c.lineTo(J1[0], J1[1]);
      c.strokeStyle = _colors.glass; c.lineWidth = 22; c.stroke();
      c.strokeStyle = _colors.top; c.lineWidth = 19; c.stroke();
      const n = [-0.3571, 0.9341], w = 19 * clamp(D.jacket, 0, 1), off = 9.5 - w / 2;
      if (w > 0.3) {
        c.beginPath(); c.moveTo(J0[0] + n[0] * off, J0[1] + n[1] * off); c.lineTo(J1[0] + n[0] * off, J1[1] + n[1] * off);
        c.strokeStyle = 'rgba(110,185,235,0.8)'; c.lineWidth = w; c.stroke();
      }
      _tube(c, [P0, P1, [267, 198]], 4.5);
      // nipples and hoses: lower end (underside) and upper end (top side)
      const lo = _cond(0.8), up = _cond(0.2);
      const loE = [lo[0] + n[0] * 17, lo[1] + n[1] * 17], upE = [up[0] - n[0] * 17, up[1] - n[1] * 17];
      _tube(c, [[lo[0] + n[0] * 10, lo[1] + n[1] * 10], loE], 3.5);
      _tube(c, [[up[0] - n[0] * 10, up[1] - n[1] * 10], upE], 3.5);
      c.strokeStyle = '#5B8FB0'; c.lineWidth = 3; c.lineCap = 'round';
      c.beginPath(); c.moveTo(loE[0], loE[1]); c.quadraticCurveTo(212, 178, 204, 192); c.stroke();
      c.beginPath(); c.moveTo(upE[0], upE[1]); c.quadraticCurveTo(150, 76, 158, 64); c.stroke();
      const inLow = p.condenser === 'bottom', blue = '#1F6FB5';
      if (inLow) { _arrowHead(c, loE[0] + 1, loE[1] + 3, -1.9, blue); _arrowHead(c, 158, 62, -1.3, blue); }
      else { _arrowHead(c, upE[0] - 1, upE[1] - 2, 1.2, blue); _arrowHead(c, 204, 195, 2.0, blue); }
      _text(c, inLow ? 'water in' : 'water out', 204, 205, 'center', blue, 8.5, 700);
      _text(c, inLow ? 'water out' : 'water in', 160, 56, 'center', blue, 8.5, 700);
      _text(c, 'Liebig condenser', 202, 113, 'center');
    } else _dash(c, () => { const a = _cond(0.12), b = _cond(0.88), n = [-0.3571, 0.9341];
      c.moveTo(a[0] - n[0] * 11, a[1] - n[1] * 11); c.lineTo(b[0] - n[0] * 11, b[1] - n[1] * 11);
      c.moveTo(a[0] + n[0] * 11, a[1] + n[1] * 11); c.lineTo(b[0] + n[0] * 11, b[1] + n[1] * 11); });

    // receiver and distillate
    if (p.receiver) {
      c.save(); c.beginPath(); _recvPath(c); c.clip();
      if (D.dist > 0) { c.fillStyle = 'rgba(190,225,240,0.75)'; const y = _recvLevel(D.dist); c.fillRect(240, y, 60, 242 - y); }
      c.restore();
      c.beginPath(); _recvPath(c); c.strokeStyle = _colors.glass; c.lineWidth = 2.2; c.stroke();
      if (p.receiver === 'sealed') {
        c.fillStyle = '#8A5A2E';
        c.beginPath(); c.moveTo(259, 180); c.lineTo(281, 180); c.lineTo(279, 192); c.lineTo(261, 192); c.closePath(); c.fill();
        if (p.condenser) _tube(c, [[266, 178], [267, 198]], 4.5);
      }
      _text(c, 'conical flask', 270, 253);
      if (D.dist > 3) _text(c, 'distillate', 270, 234, 'center', _colors.ink, 8);
    } else _dash(c, () => _recvPath(c));

    // thermometer through a bung in the neck
    if (p.thermo) {
      const by = p.thermo === 'arm' ? 86 : 164;
      c.fillStyle = '#FFFFFF'; c.strokeStyle = _colors.glass; c.lineWidth = 1;
      c.fillRect(67.6, 18, 4.8, by - 18); c.strokeRect(67.6, 18, 4.8, by - 18);
      const top = by - 4 - clamp(D.read / 110, 0, 1) * (by - 26);
      c.fillStyle = '#D0312D'; c.fillRect(69.3, top, 1.4, by - top);
      c.beginPath(); c.arc(70, by + 1.2, 3.2, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#8A5A2E'; c.fillRect(60.5, 56, 19, 9);
      _text(c, 'thermometer', 76, 26, 'left');
    } else _dash(c, () => { c.moveTo(70, 18); c.lineTo(70, 86); });
    if (p.flask) { _text(c, 'flask', 22, 118); _text(c, 'side arm', 84, 76, 'left'); }
    if (p.burner) _text(c, 'heat', 96, 230, 'left');

    // vapour, drips and escaping steam
    if (!calm) {
      _parts.forEach(q => {
        if (q.k === 'v') {
          const inCond = q.seg >= 5 || (q.seg === 4 && q.x > _cond(0.35)[0]);
          if (q.cond && inCond) { c.fillStyle = 'rgba(70,150,220,0.9)'; c.beginPath(); c.arc(q.x, q.y + 1, 1.7, 0, Math.PI * 2); c.fill(); }
          else { c.fillStyle = 'rgba(255,255,255,0.75)'; c.beginPath(); c.arc(q.x, q.y, 2.6, 0, Math.PI * 2); c.fill(); }
        } else if (q.k === 'd') { c.fillStyle = 'rgba(70,150,220,0.95)'; c.beginPath(); c.arc(q.x, q.y, 1.8, 0, Math.PI * 2); c.fill(); }
        else if (q.k === 'st') { c.fillStyle = `rgba(235,242,246,${0.8 * (1 - q.life / 1.4)})`; c.beginPath(); c.arc(q.x, q.y, 3 + q.life * 7, 0, Math.PI * 2); c.fill(); }
      });
    } else if (D.boiling) {
      c.fillStyle = 'rgba(255,255,255,0.75)';
      [[70, 100], [70, 90], [92, 90], [104, 95]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 2.6, 0, Math.PI * 2); c.fill(); });
      if (D.dist > 0) { c.fillStyle = 'rgba(70,150,220,0.95)'; c.beginPath(); c.arc(267, 204, 1.8, 0, Math.PI * 2); c.fill(); }
      if (D.escaped > 0.5) { c.fillStyle = 'rgba(235,242,246,0.7)'; c.beginPath(); c.arc(270, 176, 6, 0, Math.PI * 2); c.fill(); }
    }
    if (p.receiver === 'sealed' && D.pressure > SD.DISTIL.burstAt * 0.5 && !calm) _shake = Math.max(_shake, 0.25);
  }

  function _basinPath(c) { c.moveTo(112, 124); c.quadraticCurveTo(170, 216, 228, 124); c.closePath(); }
  const _basinY = x => { const t = (x - 112) / 116; return 124 + 184 * t * (1 - t); };
  const LARGE = [[141, 12], [156, 15], [172, 11], [187, 14], [201, 10]];
  const SMALL = Array.from({ length: 28 }, (_, i) => [128 + i * 3, 2.4 + ((i * 37) % 10) / 5.5, ((i * 53) % 7) - 3]);
  function _crystal(c, x, y, s) {
    c.beginPath();
    c.moveTo(x - s * 0.62, y); c.lineTo(x - s * 0.2, y - s * 0.55); c.lineTo(x + s * 0.62, y - s * 0.35); c.lineTo(x + s * 0.2, y + s * 0.2); c.closePath();
    c.fillStyle = '#1D6FCB'; c.fill(); c.strokeStyle = '#0B4A90'; c.lineWidth = 0.8; c.stroke();
    c.beginPath(); c.moveTo(x - s * 0.3, y - s * 0.2); c.lineTo(x + s * 0.25, y - s * 0.3); c.strokeStyle = 'rgba(255,255,255,0.55)'; c.stroke();
  }

  function _drawCrystal(c) {
    const C = _cry, K = SD.CRYSTAL, calm = Labs.calm() || _instant;
    const lvl = 170 - (C.water / 60) * 40;
    if (C.cool === 'fast') {
      c.fillStyle = 'rgba(150,200,235,0.45)'; c.fillRect(92, 150, 156, 40);
      c.strokeStyle = _colors.glass; c.lineWidth = 2; c.strokeRect(92, 130, 156, 60);
      _text(c, 'cold water', 170, 204);
    } else {
      _tripod(c, 170, 172);
      _burner(c, 170, C.heat);
      _text(c, 'tripod & gauze', 212, 166, 'left');
    }
    c.save(); c.beginPath(); _basinPath(c); c.clip();
    if (C.dry) {
      c.fillStyle = '#EEF3F6'; c.fillRect(110, 160, 120, 14);
      c.fillStyle = 'rgba(160,190,215,0.9)';
      for (let i = 0; i < 26; i++) c.fillRect(126 + ((i * 41) % 88), 160 + ((i * 13) % 8), 2, 2);
    } else {
      const conc = C.grams / Math.max(1, C.water);
      c.fillStyle = _rgba(K.color, Math.min(0.92, 0.42 + (conc - 0.15) * 1.3));
      c.fillRect(110, lvl, 120, 175 - lvl);
      c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(114, lvl); c.lineTo(226, lvl); c.stroke();
      if (C.crust) { c.fillStyle = 'rgba(205,228,248,0.95)'; for (let i = 0; i < 10; i++) { const x = 118 + i * 11; c.fillRect(x, lvl - 1, 3, 3); } }
      if (C.crystals > 0 || C.done) {
        const fin = SD.crystalsAt(C.grams, C.water, SD.ROOM);
        const gf = C.done ? 1 : clamp(C.crystals / Math.max(1e-6, fin), 0, 1), k = Math.sqrt(gf);
        if (C.cool === 'slow') LARGE.forEach(([x, s]) => _crystal(c, x, _basinY(x) - 2 - s * 0.2, s * k));
        else SMALL.forEach(([x, s, j]) => _crystal(c, x, _basinY(x) - 2 + j * 0.3, s * (0.4 + 0.6 * k)));
      }
      if (!calm) {
        c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 0.8;
        _parts.forEach(q => { if (q.k === 'b') { c.beginPath(); c.arc(q.x, q.y, q.r, 0, Math.PI * 2); c.stroke(); } });
      }
    }
    c.restore();
    c.beginPath(); _basinPath(c); c.strokeStyle = '#9EAAB0'; c.lineWidth = 3; c.stroke();
    c.beginPath(); c.moveTo(108, 124); c.lineTo(232, 124); c.strokeStyle = '#B8C3C8'; c.lineWidth = 3; c.stroke();
    _text(c, 'evaporating basin', 170, 116);
    if (!calm) _parts.forEach(q => {
      if (q.k !== 'w') return;
      c.strokeStyle = `rgba(255,255,255,${0.75 * (1 - q.life / 1.6)})`; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(q.x, q.y); c.quadraticCurveTo(q.x + 4, q.y - 5, q.x, q.y - 10); c.stroke();
    });
    else if (C.heat && C.T >= K.boils) {
      c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 1.4;
      [150, 172, 192].forEach(x => { c.beginPath(); c.moveTo(x, lvl - 4); c.quadraticCurveTo(x + 4, lvl - 10, x, lvl - 16); c.stroke(); });
    }
  }

  const _dishPath = c => { c.moveTo(128, 160); c.quadraticCurveTo(170, 192, 212, 160); c.closePath(); };
  const GRAINS = Array.from({ length: 60 }, (_, i) => [136 + ((i * 47) % 68), 161 + ((i * 23) % 11), i]);
  const DEPOSIT = Array.from({ length: 70 }, (_, i) => {
    const t = ((i * 37) % 70) / 70, side = i % 2 ? 1 : -1;
    return [170 + side * (8 + t * 34) - side * 3, 94 + t * 56];
  });

  function _drawSublime(c) {
    const U = _sub, p = U.parts, M = p.mixture && SD.SUBLIME_MIXES[p.mixture], calm = Labs.calm() || _instant;
    if (p.place === 'hood') {
      c.strokeStyle = '#7B8A8F'; c.lineWidth = 5; c.strokeRect(14, 8, 312, 238);
      c.fillStyle = '#7B8A8F'; c.fillRect(14, 8, 312, 18);
      _text(c, 'FUME CUPBOARD', 170, 21, 'center', '#FFFFFF', 9, 800);
      c.fillStyle = 'rgba(170,210,228,0.16)'; c.fillRect(17, 26, 306, 44);
      c.strokeStyle = 'rgba(95,140,160,0.7)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(17, 70); c.lineTo(323, 70); c.stroke();
      c.strokeStyle = _colors.muted; c.lineWidth = 1.5;
      [120, 220].forEach(x => { c.beginPath(); c.moveTo(x, 50); c.lineTo(x, 34); c.stroke(); _arrowHead(c, x, 33, -Math.PI / 2, _colors.muted); });
    } else if (p.place === 'bench') _text(c, 'open bench', 30, 30, 'left');
    _tripod(c, 170, 178);
    _burner(c, 170, U.heat);
    if (M) {
      c.save(); c.beginPath(); _dishPath(c); c.clip();
      const frac = U.left / M.grams;
      GRAINS.forEach(([x, y, i]) => {
        const solid = i % 2 === 0;
        if (solid && (i / 60) >= frac) return;
        c.fillStyle = solid ? M.solidColor : M.otherColor;
        c.fillRect(x, y, 2.6, 2.6);
      });
      c.restore();
    }
    c.beginPath(); _dishPath(c); c.strokeStyle = '#9EAAB0'; c.lineWidth = 2.6; c.stroke();
    _text(c, 'evaporating dish', 216, 176, 'left');
    if (p.cover === 'funnel' || p.cover === 'funnel_plug') {
      if (M && U.sublimate > 0) {
        const n = Math.round(DEPOSIT.length * clamp(U.sublimate / M.grams, 0, 1));
        c.fillStyle = M.deposit; c.strokeStyle = 'rgba(0,0,0,0.25)'; c.lineWidth = 0.5;
        DEPOSIT.slice(0, n).forEach(([x, y]) => { c.fillRect(x - 1.3, y - 1.3, 2.6, 2.6); c.strokeRect(x - 1.3, y - 1.3, 2.6, 2.6); });
      }
      c.strokeStyle = _colors.glass; c.lineWidth = 2.4; c.lineJoin = 'round';
      c.beginPath(); c.moveTo(122, 162); c.lineTo(164, 92); c.lineTo(164, 40); c.moveTo(218, 162); c.lineTo(176, 92); c.lineTo(176, 40); c.stroke();
      _text(c, 'inverted funnel', 196, 110, 'left');
      if (p.cover === 'funnel_plug') {
        c.fillStyle = '#FBFBF8'; c.strokeStyle = 'rgba(0,0,0,0.25)'; c.lineWidth = 0.8;
        [[166, 44], [174, 45], [170, 39], [168, 50], [173, 51]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4, 0, Math.PI * 2); c.fill(); c.stroke(); });
        _text(c, 'cotton wool', 184, 44, 'left');
      }
      if (U.sublimate > 0.05) _text(c, 'sublimate', 140, 118, 'right', _colors.ink, 8.5);
    }
    if (M) {
      if (!calm) _parts.forEach(q => {
        if (q.k !== 'sv') return;
        c.fillStyle = _rgba(M.vapourColor, 0.55 * clamp(1 - q.life / 6, 0.2, 1));
        c.beginPath(); c.arc(q.x, q.y, 3 + Math.min(4, q.life * 2), 0, Math.PI * 2); c.fill();
      });
      else if (U.heat && U.heatT >= M.onset) {
        c.fillStyle = _rgba(M.vapourColor, 0.5);
        [[160, 150], [178, 138], [168, 122], [172, 104]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4.5, 0, Math.PI * 2); c.fill(); });
      }
    }
  }

  function _drawChoose(c) {
    const mx = _curMix(), done = !!_ch.done[mx.id], L = mx.look;
    _text(c, mx.name, 170, 30, 'center', _colors.ink, 15, 800);
    _text(c, 'You want: ' + mx.want, 170, 48, 'center', _colors.muted, 10, 600);
    c.save();
    c.beginPath(); c.moveTo(122, 72); c.lineTo(122, 218); c.lineTo(218, 218); c.lineTo(218, 72); c.clip();
    if (L.liquid) { c.fillStyle = _rgba(L.liquid, 0.75); c.fillRect(120, 118, 100, 102); }
    const g = (col, n, y0, h) => { c.fillStyle = col; for (let i = 0; i < n; i++) c.fillRect(126 + ((i * 47) % 88), y0 + ((i * 29) % h), 3, 3); };
    if (L.other) g(L.other, L.liquid ? 70 : 60, L.liquid ? 204 : 186, L.liquid ? 12 : 30);
    if (L.solid) g(L.solid, 60, 187, 28);
    c.restore();
    c.strokeStyle = _colors.glass; c.lineWidth = 2.4; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(116, 70); c.lineTo(122, 76); c.lineTo(122, 218); c.lineTo(218, 218); c.lineTo(218, 76); c.stroke();
    if (done) _text(c, '✓ ' + SD.TECHNIQUES[mx.tech].name, 170, 246, 'center', _colors.ok, 13, 800);
    else _text(c, _ch.phase === 'why' ? SD.TECHNIQUES[mx.tech].name + ' - but why?' : 'Which technique?', 170, 246, 'center', _colors.muted, 12, 700);
  }

  function _rgba(hex, a) {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  }

  function _draw(dt) {
    if (!_cx || !_dist || !_colors) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((rnd() - 0.5) * 9 * _shake, (rnd() - 0.5) * 9 * _shake);
      _shake = Math.max(0, _shake - dt * 1.4);
    }
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    c.fillStyle = _colors.bench; c.fillRect(-12, _oy + 240 * _s, _W + 24, _H);
    c.translate(_ox, _oy); c.scale(_s, _s);
    if (_mode === 'distil') _drawDistil(c);
    else if (_mode === 'crystal') _drawCrystal(c);
    else if (_mode === 'sublime') _drawSublime(c);
    else _drawChoose(c);
    _drawFx(c, dt);
    c.restore();
  }

  function _fxOrigin() {
    return _mode === 'distil' ? [70, 64] : _mode === 'crystal' ? [170, 128] : [170, 158];
  }
  function _drawFx(c, dt) {
    const full = [-_ox / _s, -_oy / _s, _W / _s, _H / _s];
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      if (f.type === 'spit' || f.type === 'bump') {
        const [x, y] = f.type === 'bump' ? [70, 62] : _fxOrigin();
        if (f.type === 'bump') _shake = Math.max(_shake, 0.8 * (1 - k));
        f.parts.forEach(q => {
          const px = x + q.vx * f.t, py = y + q.vy * f.t + 220 * f.t * f.t;
          c.fillStyle = `rgba(255,${f.type === 'bump' ? 245 : 200},${f.type === 'bump' ? 235 : 150},${0.95 - k * 0.6})`;
          c.strokeStyle = 'rgba(160,80,40,0.45)'; c.lineWidth = 0.8;
          c.beginPath(); c.arc(px, py, q.r * (1 + 2 * k), 0, Math.PI * 2); c.fill(); c.stroke();
        });
        const vg = c.createRadialGradient(170, 130, 60, 170, 130, 260);
        vg.addColorStop(0, 'rgba(210,60,30,0)'); vg.addColorStop(1, `rgba(210,60,30,${0.4 * Math.sin(Math.PI * k)})`);
        c.fillStyle = vg; c.fillRect(full[0], full[1], full[2], full[3]);
      } else if (f.type === 'burst') {
        _shake = Math.max(_shake, 1 - k);
        const cl = c.createRadialGradient(120, 140, 0, 120, 140, 30 + 260 * k);
        cl.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - k)})`); cl.addColorStop(1, 'rgba(240,244,246,0)');
        c.fillStyle = cl; c.fillRect(full[0], full[1], full[2], full[3]);
        f.parts.forEach(q => {
          const px = 120 + q.vx * f.t, py = 140 + q.vy * f.t + 160 * f.t * f.t;
          c.save(); c.translate(px, py); c.rotate(q.rot + f.t * 8);
          c.fillStyle = 'rgba(200,228,240,0.9)'; c.strokeStyle = _colors.glass; c.lineWidth = 0.8;
          c.beginPath(); c.moveTo(-q.r * 2, 0); c.lineTo(0, -q.r * 1.4); c.lineTo(q.r * 1.8, q.r); c.closePath(); c.fill(); c.stroke();
          c.restore();
        });
      } else if (f.type === 'haze') {
        const M = _sub.parts.mixture ? SD.SUBLIME_MIXES[_sub.parts.mixture] : SD.SUBLIME_MIXES.iodine;
        const hz = c.createRadialGradient(170, 150, 10, 170, 150, 40 + 300 * k);
        hz.addColorStop(0, _rgba(M.vapourColor, 0.75)); hz.addColorStop(1, _rgba(M.vapourColor, 0));
        c.fillStyle = hz; c.fillRect(full[0], full[1], full[2], full[3]);
      } else if (f.type === 'rod') {
        const lvl = 170 - (_cry.water / 60) * 40;
        const dip = k < 0.45 ? k / 0.45 : k < 0.55 ? 1 : 1 - (k - 0.55) / 0.45;
        const tx = 250 - dip * 58, ty = 40 + dip * (lvl + 8 - 40);
        c.strokeStyle = 'rgba(210,232,240,0.95)'; c.lineWidth = 3.4; c.lineCap = 'round';
        c.beginPath(); c.moveTo(tx + 50, ty - 60); c.lineTo(tx, ty); c.stroke();
        c.strokeStyle = _colors.glass; c.lineWidth = 1; c.stroke();
        if (f.data.positive && k > 0.6) {
          c.fillStyle = '#1D6FCB';
          [[0, 0], [2, -3], [-2, -2], [1, -6]].forEach(([dx, dy]) => c.fillRect(tx + dx - 1, ty + dy - 1, 2.4, 2.4));
        }
      } else if (f.type === 'drop') {
        const wx = 205, wy = 226;
        c.strokeStyle = _colors.glass; c.lineWidth = 1.6;
        c.beginPath(); c.moveTo(wx - 16, wy - 3); c.quadraticCurveTo(wx, wy + 6, wx + 16, wy - 3); c.stroke();
        _text(c, 'watch glass', wx, wy + 14);
        if (k < 0.4) { c.fillStyle = 'rgba(70,150,220,0.95)'; c.beginPath(); c.arc(wx, wy - 40 + k / 0.4 * 38, 2.2, 0, Math.PI * 2); c.fill(); }
        else { const r = 3.5 * (1 - (k - 0.4) / 0.6); if (r > 0.2) { c.fillStyle = 'rgba(70,150,220,0.7)'; c.beginPath(); c.ellipse(wx, wy - 1, r * 1.8, r * 0.6, 0, 0, Math.PI * 2); c.fill(); } }
      }
      if (f.t >= f.dur) {
        _fx.splice(i, 1);
        if (f.done) f.done();
      }
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
    _step(dt);
    _animate(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); _showCard(); }
  }

  // ══ Test hooks ═══════════════════════════════
  // Deterministic stepping for the headless tests: effects apply at once and
  // simulated seconds pass without waiting for real ones.
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n; i++) _step(0.05);
    _readouts(); _showCard();
  }
  function _debug() {
    const D = _dist || _newDist(), C = _cry || _newCry(), U = _sub || _newSub(), K = _ch || _newCh();
    return { mode: _mode, goggles: _goggles, busy: _busy, panel: _panel, guide: _guide && { id: _guide.id, step: _guide.step },
             dist: { parts: Object.assign({}, D.parts), heat: D.heat, T: D.T, read: D.read, vol: D.vol, dist: D.dist, boiling: D.boiling,
                     jacket: D.jacket, pressure: D.pressure, done: D.done, readings: D.readings.length, escaped: D.escaped },
             cry: { heat: C.heat, T: C.T, water: C.water, cool: C.cool, crystals: C.crystals, onset: C.onset, done: C.done, dry: C.dry, rods: C.rods.length, rodOK: C.rodOK },
             sub: { parts: Object.assign({}, U.parts), heat: U.heat, left: U.left, sublimate: U.sublimate, escaped: U.escaped, done: U.done },
             ch: { idx: K.idx, phase: K.phase, done: Object.keys(K.done) },
             cards: _cards.length, particles: _parts.length, fx: _fx.length,
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && Object.assign({}, _mission) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, setMode, setPart, build, heatOn, heatOff, rod, cool, drop,
           reset, goggles, pickTech, pickWhy, choose, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabSeparation = LabSeparation;
