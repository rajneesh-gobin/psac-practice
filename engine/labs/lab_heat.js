'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Heat Transfer Lab (Science, PSAC Grade 6)
//
//  Three stations switchable by tabs in the stage:
//   - CONDUCTION: metal, glass, wood and plastic rods over a Bunsen burner;
//     wax drops melt from the flame end first. Metal wins every time.
//   - CONVECTION: a beaker of water with a heating coil; coloured particles
//     show the rising hot / sinking cool loop. Toggle to "Air" to see a room.
//   - RADIATION: two cans (black, silver) under a lamp; thermometer needles
//     show the black can heating up faster.
//  Guided experiments, two Missions, Discoveries, and 🔊 read-aloud on the
//  lab assistant and guide box (never automatic).
//
//  ⚠ Every rate, temperature, quiz question and text comes from
//    engine/labs/lab_heat_data.js (LabHeatData). If a result looks wrong,
//    fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here touches .screen (ui-css.md).
//  ⚠ Calm Mode / prefers-reduced-motion: actions show their end state at once.
//  ⚠ Speech is cancelled on every guide step, overlay, unmount and screen
//    change — speech outlives the DOM that started it.
//  ⚠ No regex lookbehind anywhere — Safari <16.4 parse error.
// ══════════════════════════════════════════════
const LabHeat = (() => {
  const P = () => LabHeatData;
  const ID = 'heat';
  const FRAME_MS = 1000 / 30;
  const EXP_SPEED = 12;       // experiment-seconds per real second (for tick)
  const TICK_S = { tick30: 30, tick60: 60, tick120: 120 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _st = null, _panel = 'sandbox', _mission = null, _guide = null;
  let _fx = [], _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _talking = false, _obs = null;
  let _convPhase = 0;          // 0–1, advances continuously for convection particles
  let _flamePh = 0;            // 0–1, flame flicker phase
  let _log = [];               // notebook entries

  // ── Init ────────────────────────────────────────────────────────────────
  function _resetBench() {
    _st = P().newState();
    _busy = false; _fx = []; _log = []; _convPhase = 0; _flamePh = 0;
  }

  // ── Shell ────────────────────────────────────────────────────────────────
  function _shellHTML() {
    return `<div class="lab lab-heat">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade 6</span><h1>Heat Transfer</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How this lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-heat-stabs" role="group" aria-label="Choose a station">
            <button type="button" data-set="station" data-v="conduction">🔥 Conduction</button>
            <button type="button" data-set="station" data-v="convection">🌊 Convection</button>
            <button type="button" data-set="station" data-v="radiation">☀️ Radiation</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-heat-stage">
            <canvas id="lab-heat-canvas" role="img" aria-label="Heat transfer experiment"></canvas>
            <div class="lab-heat-chips" id="lab-heat-chips"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="say-coach" aria-label="Read this aloud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <p class="lab-task-strip">Visit 🔥 Conduction, 🌊 Convection and ☀️ Radiation — discover how heat travels!</p>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-heat-tools" id="lab-heat-tools"></div>
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

  // ── Mount / unmount ──────────────────────────────────────────────────────
  function mount(root) {
    _root = root;
    if (!_st) _resetBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-heat-canvas');
    _cx = _cv.getContext('2d');
    _cv.addEventListener('click', _canvasTap);
    _resize();
    _wire();
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission. Carry on where you left off.');
    else _coach(Object.keys(st.guides || {}).length
      ? 'Welcome back! Pick a guided experiment or try a mission.'
      : '👋 New here? Pick a guided experiment below. I will show you what to tap next.');
    if (!_resizeWired) {
      window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); });
      _resizeWired = true;
    }
    if (_obs) _obs.disconnect();
    const scr = root.closest('.screen');
    if (scr && typeof MutationObserver !== 'undefined') {
      _obs = new MutationObserver(() => {
        if (scr.classList.contains('hidden')) { _hush(); _stop(); }
        else if (_root && _cv && !_raf) _start();
      });
      _obs.observe(scr, { attributes: true, attributeFilter: ['class'] });
    }
    _start();
  }

  function unmount() {
    _hush();
    if (_obs) { _obs.disconnect(); _obs = null; }
    _stop();
    _root = null; _cv = null; _cx = null;
  }

  // ── Canvas setup ─────────────────────────────────────────────────────────
  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#F0F6F8'), bot: v('--lab-cv-bot', '#DDE8EA'),
                bench: v('--lab-bench', '#C4D5D0'), rack: v('--lab-rack', '#9AB0AA'),
                glass: v('--lab-glass', 'rgba(40,80,100,.55)'), ink: v('--lab-ink', '#14211D') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(400, Math.max(280, w * 0.88)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _readColors();
    _draw(0);
  }

  // ── Events ───────────────────────────────────────────────────────────────
  function _wire() {
    _root.onclick = e => {
      const s = e.target.closest('[data-set]');
      if (s) { _set(s.dataset.set, s.dataset.v); _showStage(); return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
    };
  }

  function _canvasTap(e) {
    // Tap a rod to select it as the material in conduction station
    if (_st.station !== 'conduction') return;
    const mats = _st.materials;
    if (!mats.length) return;
    const r = _cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (_W / r.width);
    const slot = _W / Math.max(1, mats.length);
    const i = Math.floor(x / slot);
    if (mats[i] && mats[i] !== _st.selMat) {
      _st.selMat = mats[i];
      _syncSet();
      const M = P().MATERIALS[mats[i]];
      _coach('Selected: ' + (M ? M.name : mats[i]) + '. Look at the wax drops on this one.');
    }
  }

  function _showStage() {
    const z = $('lab-heat-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80)
      z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _do(tok) {
    const i = tok.indexOf(':');
    if (i > 0) _set(tok.slice(0, i), tok.slice(i + 1));
    else _act(tok);
  }

  function _act(act) {
    switch (act) {
      case 'hub':     _hush(); Labs.backToHub(); break;
      case 'help':    _help(); break;
      case 'tip':     _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) _say(el.textContent); break; }
      case 'say-guide': { const G = _gdef(), s = G && G.steps[_guide.step]; if (s) _say(s.say); break; }
      case 'quiz':    _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) startMission(_mission.id); break;
      case 'guide-stop': _stopGuide(false); break;
      case 'tick30':  _tick(30); break;
      case 'tick60':  _tick(60); break;
      case 'tick120': _tick(120); break;
      case 'read_temp': _readTemp(); break;
      case 'reset':   _reset(); break;
      case 'dye':     _addDye(); break;
    }
  }

  function _set(k, v) {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return; }
    const st = _st;
    switch (k) {
      case 'station': {
        if (v !== 'conduction' && v !== 'convection' && v !== 'radiation') return;
        st.station = v;
        _syncSet();
        _renderTools();
        _readouts();
        const msgs = { conduction: 'Conduction station. Add materials to the rack, then turn on the burner.',
                       convection: 'Convection station. Turn on the heater and watch the water move.',
                       radiation: 'Radiation station. Turn on the lamp and compare the two cans.' };
        _coach(msgs[v]);
        _after('station:' + v);
        break;
      }
      case 'material': {
        if (!P().MATERIALS[v]) return;
        if (st.station !== 'conduction') _set('station', 'conduction');
        if (st.burner) { _coach('Turn off the burner first before changing the materials.'); return; }
        if (!st.materials.includes(v)) {
          if (st.materials.length >= 4) { _coach('The rack is full. Remove one to add another, or start again.'); return; }
          st.materials.push(v);
          _coach('Added the ' + P().MATERIALS[v].name + ' to the rack. Turn on the burner when ready.');
        } else {
          st.selMat = v;
          _coach(P().MATERIALS[v].name + ' selected. Look at its wax drops.');
        }
        _after('material:' + v);
        break;
      }
      case 'burner': {
        if (st.station !== 'conduction') _set('station', 'conduction');
        if (v === 'on') {
          if (!st.materials.length) { _coach('Put at least one material on the rack first.'); return; }
          st.burner = true;
          _coach('Burner on! Watch the wax drops. Which material heats up first?');
        } else {
          st.burner = false;
          _coach('Burner off. The rods will cool down slowly.');
        }
        _after('burner:' + v);
        break;
      }
      case 'heater': {
        if (st.station !== 'convection') _set('station', 'convection');
        if (v === 'on') {
          st.heater = true;
          _coach('Heater on! Watch the particles. Hot water rises; cool water sinks.');
        } else {
          st.heater = false;
          _coach('Heater off. The convection current will slow down.');
        }
        _after('heater:' + v);
        break;
      }
      case 'lamp': {
        if (st.station !== 'radiation') _set('station', 'radiation');
        if (v === 'on') {
          st.lamp = true;
          _coach('Lamp on! Both cans get the same light. Watch the thermometers.');
        } else {
          st.lamp = false;
          _coach('Lamp off. The cans will slowly cool back to room temperature.');
        }
        _after('lamp:' + v);
        break;
      }
      case 'convmode': {
        if (st.station !== 'convection') _set('station', 'convection');
        if (v !== 'water' && v !== 'air') return;
        st.convMode = v;
        _syncSet();
        _coach(v === 'air'
          ? 'Air convection: warm air over the land rises; cool sea air moves in. This is the Mauritian sea breeze!'
          : 'Water convection: hot water rises from the coil; cool water sinks to replace it.');
        _after('convmode:' + v);
        break;
      }
    }
  }

  function _tick(expSec) {
    if (_busy) { _coach('One thing at a time.'); return; }
    const st = _st;
    let coach = '';
    if (st.station === 'conduction') {
      if (!st.burner) { _coach('Turn on the burner first.'); return; }
      if (!st.materials.length) { _coach('Put materials on the rack first.'); return; }
      const from = st.condTime;
      st.condTime += expSec;
      if (!st.stationsDone) st.stationsDone = {};
      st.stationsDone.conduction = true;
      const D = P();
      const melted = st.materials.filter(m => D.anyWaxMelted(m, st.condTime) && !D.anyWaxMelted(m, from));
      if (melted.length) {
        coach = melted.map(m => D.MATERIALS[m].name + ' — wax drops melting!').join(' ');
      } else {
        const hot = st.materials.filter(m => D.anyWaxMelted(m, st.condTime));
        const cool = st.materials.filter(m => !D.anyWaxMelted(m, st.condTime));
        coach = (hot.length ? hot.map(m => D.MATERIALS[m].short).join(', ') + ' heating up. ' : '') +
                (cool.length ? cool.map(m => D.MATERIALS[m].short).join(', ') + ' still cool. ' : '');
      }
      _logEntry({ title: Math.round(st.condTime) + ' s', obs: st.materials.map(m => D.MATERIALS[m].short + ': ' + _waxStatus(m, st.condTime)).join(' · ') });
    } else if (st.station === 'convection') {
      if (!st.heater) { _coach('Turn on the heater first.'); return; }
      st.convTime += expSec;
      if (!st.stationsDone) st.stationsDone = {};
      st.stationsDone.convection = true;
      coach = st.dye ? 'The dye drop is circulating around the loop!' : 'The convection current is flowing. Add a dye drop to see it!';
    } else {
      if (!st.lamp) { _coach('Turn on the lamp first.'); return; }
      st.radTime += expSec;
      if (!st.stationsDone) st.stationsDone = {};
      st.stationsDone.radiation = true;
      const bT = Math.round(P().tempAt('black', st.radTime));
      const sT = Math.round(P().tempAt('silver', st.radTime));
      coach = 'Black can: ' + bT + ' °C. Silver can: ' + sT + ' °C. The black can is ' + (bT - sT) + ' °C warmer!';
    }
    _coach(coach);
    _checkFinds();
    _checkMission();
    _readouts();
    _refresh();
    _guideEvent(st.station === 'conduction' ? 'tick120' : st.station === 'convection' ? 'tick30' : 'tick60');
    // For the specific tick token
    const tokMap = { 30: 'tick30', 60: 'tick60', 120: 'tick120' };
    if (tokMap[expSec]) _guideEvent(tokMap[expSec]);
  }

  function _addDye() {
    const st = _st;
    if (st.station !== 'convection') { _set('station', 'convection'); }
    if (!st.heater) { _coach('Turn on the heater first, then add the dye drop.'); return; }
    if (st.dye) { _coach('There is already a dye drop in the water. Watch it circulate!'); return; }
    st.dye = true;
    _coach('Dye drop added! Watch it follow the convection current around the loop.');
    _after('dye:add');
  }

  function _readTemp() {
    const st = _st;
    if (st.station !== 'radiation') _set('station', 'radiation');
    if (!st.lamp) { _coach('Turn on the lamp first, then read the temperature.'); return; }
    const bT = Math.round(P().tempAt('black', st.radTime));
    const sT = Math.round(P().tempAt('silver', st.radTime));
    st.readings.push({ t: Math.round(st.radTime), black: bT, silver: sT });
    _logEntry({ title: 'Temperature at ' + Math.round(st.radTime) + ' s', obs: 'Black can: ' + bT + ' °C | Silver can: ' + sT + ' °C | Difference: ' + (bT - sT) + ' °C' });
    _coach('Black can: ' + bT + ' °C. Silver can: ' + sT + ' °C. Write this in your notebook.');
    _checkFinds();
    _refresh();
    _guideEvent('read_temp');
  }

  function _reset() {
    if (_busy) { _coach('One thing at a time.'); return; }
    const station = _st.station;
    const prev = _st.stationsDone || {};
    _st = P().newState();
    _st.station = station;
    _st.stationsDone = prev;
    _log = [];
    _coach('Fresh start. Set up the experiment again.');
    _syncSet();
    _renderTools();
    _renderPanel();
    _readouts();
  }

  // After any action: repaint and advance the guide.
  function _after(token) {
    _syncSet();
    _readouts();
    _refresh();
    _guideEvent(token);
  }

  function _waxStatus(mat, t) {
    const D = P();
    const melted = D.WAX_POSITIONS.filter(p => D.waxMelted(mat, p, t)).length;
    if (melted === 0) return 'no wax melted';
    if (melted === D.WAX_POSITIONS.length) return 'all wax melted!';
    return melted + '/' + D.WAX_POSITIONS.length + ' wax drops melted';
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 30) _log.length = 30;
  }

  // ── Findings / hazards ───────────────────────────────────────────────────
  function _checkFinds() {
    P().finds(_st).forEach(_discover);
  }

  function _checkMission() {
    const ms = _mission;
    if (!ms || ms.success) return;
    if (P().missionReady(ms.id, _st)) {
      ms.success = true;
      _coach('Mission experiment done! Look at your notebook, then tap "Answer the questions".');
      Labs.confetti();
      _refresh();
    }
  }

  // Hazard cards triggered by specific dangerous actions
  function _triggerHazard(id) {
    const H = P().HAZARDS[id];
    if (!H) return;
    const st = Labs.store(ID);
    st.hazards = st.hazards || {};
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    _hush();
    _busy = true;
    _fxAdd('flash', () => {
      _busy = false;
      _card('hazard', { signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Got it — I will be safe', onClose: () => _coach('Always be careful with heat. Ask an adult if you are not sure.') });
    });
  }

  // ── Read aloud ────────────────────────────────────────────────────────────
  function _voice() {
    try {
      const vs = (window.speechSynthesis.getVoices && window.speechSynthesis.getVoices()) || [];
      const en = vs.filter(v => /^en/i.test(v.lang || ''));
      return en.find(v => /en[-_]GB/i.test(v.lang) && v.localService) || en.find(v => v.localService) || en[0] || null;
    } catch (e) { return null; }
  }
  function _say(text) {
    const ss = window.speechSynthesis;
    if (!ss || typeof SpeechSynthesisUtterance === 'undefined') { _coach('Read-aloud does not work in this browser.'); return; }
    _hush();
    const clean = String(text || '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
      .replace(/[→°]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-GB'; u.rate = 0.92;
    const v = _voice(); if (v) u.voice = v;
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    try { ss.speak(u); } catch (e) { _talking = false; }
  }
  function _hush() {
    if (!_talking) return;
    _talking = false;
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  // ── Coach ────────────────────────────────────────────────────────────────
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    _hush();
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = P().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  function _ov(html, o) { _hush(); return Labs.overlay(html, o); }
  function _card(kind, o) {
    _hush();
    if (kind === 'hazard') Labs.hazardCard(o); else Labs.resultCard(o);
    const h = document.querySelector('#lab-overlay .is-exam h3');
    if (h) h.textContent = '📝 In the PSAC exam';
  }

  // ── Sync selected state to buttons ───────────────────────────────────────
  function _syncSet() {
    if (!_root || !_st) return;
    const st = _st;
    const cur = {
      station: st.station,
      burner: st.burner ? 'on' : 'off',
      heater: st.heater ? 'on' : 'off',
      lamp: st.lamp ? 'on' : 'off',
      convmode: st.convMode,
    };
    // Add each material as "material:X" = "true" if present
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set, v = b.dataset.v;
      if (k === 'material') {
        b.setAttribute('aria-pressed', String(st.materials.includes(v)));
      } else if (k in cur) {
        b.setAttribute('aria-pressed', String(cur[k] === v));
      }
    });
  }

  // ── Tools panel ──────────────────────────────────────────────────────────
  function _renderTools() {
    const box = $('lab-heat-tools');
    if (!box || !_st) return;
    const st = _st;
    const D = P();

    let station = '';
    if (st.station === 'conduction') {
      const lockMsg = st.burner ? 'Turn off burner to change' : '';
      station = `<div class="lab-heat-shelf" id="lab-heat-shelf">
        <h3>Add to rack</h3>
        <div class="lab-heat-mats">${D.MATERIAL_KEYS.map(m => {
          const M = D.MATERIALS[m];
          const on = st.materials.includes(m);
          return `<button type="button" class="lab-tool lab-heat-matbtn${on ? ' is-on' : ''}" data-set="material" data-v="${m}" aria-pressed="${on}"
            ${(on && st.burner) ? 'title="' + esc(lockMsg) + '"' : ''}>${M.icon} ${esc(M.short)}</button>`;
        }).join('')}</div>
        <div class="lab-heat-burner-row">
          <button type="button" class="lab-tool${st.burner ? ' is-on' : ''}" data-set="burner" data-v="${st.burner ? 'off' : 'on'}" aria-pressed="${st.burner}">
            <span aria-hidden="true">🔥</span>${st.burner ? 'Burner ON' : 'Turn on burner'}
          </button>
        </div>
      </div>`;
    } else if (st.station === 'convection') {
      station = `<div class="lab-heat-shelf" id="lab-heat-shelf">
        <div class="lab-heat-row">
          <button type="button" class="lab-tool${st.heater ? ' is-on' : ''}" data-set="heater" data-v="${st.heater ? 'off' : 'on'}" aria-pressed="${st.heater}">
            <span aria-hidden="true">🔌</span>${st.heater ? 'Heater ON' : 'Turn on heater'}
          </button>
          <button type="button" class="lab-tool${st.dye ? ' is-on' : ''}" data-act="dye" aria-pressed="${st.dye}">
            <span aria-hidden="true">🔵</span>Add dye drop
          </button>
        </div>
        <div class="lab-heat-row">
          <button type="button" class="lab-tool${st.convMode === 'water' ? ' is-on' : ''}" data-set="convmode" data-v="water" aria-pressed="${st.convMode === 'water'}">
            <span aria-hidden="true">💧</span>Water
          </button>
          <button type="button" class="lab-tool${st.convMode === 'air' ? ' is-on' : ''}" data-set="convmode" data-v="air" aria-pressed="${st.convMode === 'air'}">
            <span aria-hidden="true">🌬️</span>Air
          </button>
        </div>
      </div>`;
    } else {
      station = `<div class="lab-heat-shelf" id="lab-heat-shelf">
        <div class="lab-heat-row">
          <button type="button" class="lab-tool${st.lamp ? ' is-on' : ''}" data-set="lamp" data-v="${st.lamp ? 'off' : 'on'}" aria-pressed="${st.lamp}">
            <span aria-hidden="true">💡</span>${st.lamp ? 'Lamp ON' : 'Turn on lamp'}
          </button>
          <button type="button" class="lab-tool" data-act="read_temp">
            <span aria-hidden="true">🌡️</span>Read temperature
          </button>
        </div>
      </div>`;
    }

    box.innerHTML = station +
      `<div class="lab-heat-timebtns">
        <button type="button" class="lab-tool" data-act="tick30"><span aria-hidden="true">⏩</span>30 seconds</button>
        <button type="button" class="lab-tool" data-act="tick60"><span aria-hidden="true">⏩</span>1 minute</button>
        <button type="button" class="lab-tool" data-act="tick120"><span aria-hidden="true">⏩</span>2 minutes</button>
        <button type="button" class="lab-tool" data-act="reset"><span aria-hidden="true">🔄</span>Start again</button>
      </div>`;
    _syncSet();
    _highlight();
  }

  // ── Readouts (chips) ──────────────────────────────────────────────────────
  function _readouts() {
    if (!_root || !_st) return;
    const st = _st, D = P();
    const chips = $('lab-heat-chips');
    if (!chips) return;
    let h = '';
    if (st.station === 'conduction') {
      h += '<span class="lab-chip">⏱ ' + Math.round(st.condTime) + ' s</span>';
      if (st.burner) h += '<span class="lab-chip is-warm">🔥 Burner on</span>';
      if (st.materials.length) {
        const hot = st.materials.filter(m => D.anyWaxMelted(m, st.condTime));
        if (hot.length) h += '<span class="lab-chip is-warm">🕯️ ' + hot.map(m => D.MATERIALS[m].short).join(', ') + ' melting</span>';
      }
    } else if (st.station === 'convection') {
      h += '<span class="lab-chip">⏱ ' + Math.round(st.convTime) + ' s</span>';
      if (st.heater) h += '<span class="lab-chip is-warm">🔌 Heater on</span>';
      if (st.dye) h += '<span class="lab-chip">🔵 Dye circulating</span>';
    } else {
      h += '<span class="lab-chip">⏱ ' + Math.round(st.radTime) + ' s</span>';
      if (st.lamp) h += '<span class="lab-chip is-warm">💡 Lamp on</span>';
      h += '<span class="lab-chip">⬛ ' + Math.round(D.tempAt('black', st.radTime)) + ' °C</span>';
      h += '<span class="lab-chip">⬜ ' + Math.round(D.tempAt('silver', st.radTime)) + ' °C</span>';
    }
    chips.innerHTML = h;
  }

  // ── Panels ────────────────────────────────────────────────────────────────
  function _startHTML() {
    const st = Labs.store(ID);
    const guide = G => {
      const done = !!(st.guides && st.guides[G.id]);
      return `<div class="lab-start-card${done ? ' is-done' : ''}">
        <span class="lab-start-icon" aria-hidden="true">${G.icon}</span>
        <span class="lab-start-text"><b>${esc(G.title)}${done ? ' <em>✓ done</em>' : ''}</b><small>${esc(G.blurb)}</small></span>
        <button type="button" class="lab-btn lab-btn-sm${done ? '' : ' lab-btn-primary'}" data-guide="${G.id}">${done ? 'Again' : 'Start'}</button>
      </div>`;
    };
    const mission = M => {
      const best = (st.missions && st.missions[M.id] && st.missions[M.id].stars) || 0;
      return `<div class="lab-start-card">
        <span class="lab-start-icon" aria-hidden="true">${M.icon}</span>
        <span class="lab-start-text"><b>${esc(M.title)}</b><small>${esc(M.blurb)}</small>${Labs.stars(best)}</span>
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button>
      </div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Choose</b> a guided experiment below. It is the best place to start.</li>
        <li><b>Follow the yellow box</b> under the picture. The thing to tap next glows yellow.</li>
        <li><b>Explore</b> all three stations: Conduction, Convection and Radiation.</li>
      </ol>
      <h3>🧭 Guided experiments <small>step by step · start here</small></h3>
      <div class="lab-start-list">${P().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${P().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or explore freely: switch stations and try things out.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _notebookHTML();
    _syncSet();
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
  }

  function _discover(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover(ID, id, { title: d && d.title, total: P().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = Object.keys(Labs.store(ID).disc || {}).length + '/' + P().DISCOVERIES.length;
  }

  // ── Notebook ──────────────────────────────────────────────────────────────
  function _notebookHTML() {
    const st = _st;
    const D = P();
    let table = '';
    if (st.station === 'radiation' && st.readings.length) {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Temperature readings</caption>
        <thead><tr><th scope="col">Time (s)</th><th scope="col">Black can (°C)</th><th scope="col">Silver can (°C)</th><th scope="col">Difference</th></tr></thead>
        <tbody>${st.readings.map(r => `<tr><td>${r.t}</td><td>${r.black}</td><td>${r.silver}</td><td>+${r.black - r.silver}</td></tr>`).join('')}</tbody>
      </table></div>
      <p class="lab-fair">⚖️ Fair test: same lamp, same distance, only the can colour changes.</p>`;
    } else if (st.station === 'conduction' && st.materials.length) {
      const rows = st.materials.map(m => {
        const front = (D.heatFrontAt(m, st.condTime) * 100).toFixed(0);
        const melted = D.WAX_POSITIONS.filter(p => D.waxMelted(m, p, st.condTime)).length;
        return `<tr><th scope="row">${esc(D.MATERIALS[m].name)}</th><td>${melted}/${D.WAX_POSITIONS.length}</td><td>${front}%</td><td>${D.MATERIALS[m].conductor ? '✓ good' : '✗ poor'}</td></tr>`;
      }).join('');
      if (rows) table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Conduction after ${Math.round(st.condTime)} s</caption>
        <thead><tr><th scope="col">Material</th><th scope="col">Wax melted</th><th scope="col">Heat front</th><th scope="col">Conductor?</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <p class="lab-fair">⚖️ Fair test: same rod length, same flame, only the material changes.</p>`;
    }
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">What you observe appears here as you experiment.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${table}${list}</section>`;
  }

  // ── Missions ──────────────────────────────────────────────────────────────
  const _missionDef = () => _mission && P().MISSIONS.find(x => x.id === _mission.id);

  function startMission(id) {
    const M = P().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _mission = { id, errors: 0, success: false };
    _panel = 'missions';
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    _coach(M.intro);
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = _missionDef();
    _hush();
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.errors) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const lSt = Labs.store(ID);
      lSt.missions = lSt.missions || {};
      const prev = lSt.missions[ms.id] || {};
      lSt.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? ms.errors + ' mistake' + (ms.errors === 1 ? '' : 's') + ' on the bench. A safe, careful run earns an extra star.' : 'A careful and safe experiment! ⚖️');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or hunt for discoveries.'); } });
    } });
  }

  function _missionListHTML() {
    const lSt = Labs.store(ID);
    return `<section class="lab-missions"><h2>Missions</h2>
      <p class="lab-hint">Do the experiment safely and fairly. Answer the exam-style questions. Earn up to three stars.</p>
      ${P().MISSIONS.map(M => {
        const best = (lSt.missions && lSt.missions[M.id] && lSt.missions[M.id].stars) || 0;
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
    const M = _missionDef();
    const st = _st;
    const tick = b => b ? 'is-done' : '';
    let body = '';
    if (ms.id === 'mission_conductor') {
      body = `<ul class="lab-steps">
        <li class="${tick(st.materials.length >= 3)}">🪵 Put at least 3 materials on the rack</li>
        <li class="${tick(st.burner)}">🔥 Turn on the burner</li>
        <li class="${tick(st.condTime >= 30)}">⏩ Wait at least 30 s (${Math.round(st.condTime)} s so far)</li>
        <li class="${tick(st.condTime >= 120)}">⏩ Wait 2 minutes total</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    } else {
      const done = Object.keys(st.stationsDone || {});
      body = `<ul class="lab-steps">
        <li class="${tick(done.includes('conduction'))}">🔥 Run the conduction experiment</li>
        <li class="${tick(done.includes('convection'))}">🌊 Watch the convection loop</li>
        <li class="${tick(done.includes('radiation'))}">☀️ Observe the radiation race</li>
        <li class="${tick(st.radTime > 10)}">🌡️ Take temperature readings</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <p class="lab-hint">${esc(M.intro)}</p>
      ${body}
      ${ms.success
        ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>'
        : '<button type="button" class="lab-link" data-act="mission-restart">Start the mission again</button>'}
    </section>`;
  }

  // ── Discoveries ───────────────────────────────────────────────────────────
  function _foundHTML() {
    const lSt = Labs.store(ID);
    const all = P().DISCOVERIES;
    const n = all.filter(d => lSt.disc && lSt.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why. Locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => {
        const found = !!(lSt.disc && lSt.disc[d.id]);
        return found
          ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
          : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`;
      }).join('')}</div></section>`;
  }

  function _discDetail(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const lSt = Labs.store(ID);
    const found = !!(lSt.disc && lSt.disc[d.id]);
    if (!found) {
      _ov(`<div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(d.hint)}</h2>
          <section class="lab-hz-sec is-do lab-done-lesson"><h3>How to find it</h3>
            <ol class="lab-disc-steps">${d.how.map(on => `<li>${esc(P().autoStep(on).say)}</li>`).join('')}</ol></section>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${d.id}" data-autofocus>Show me how →</button>
        </div>`, { cls: 'is-done' });
      return;
    }
    _ov(`<div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${d.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(d.saw)}</p></section>
        <section class="lab-hz-sec"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
        ${d.psac ? `<section class="lab-hz-sec is-exam"><h3>📝 In the PSAC exam</h3><p>${esc(d.psac)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${d.id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  // ── Guided experiments ────────────────────────────────────────────────────
  const _gdef = () => _guide && (_guide.def || P().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || P().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    _guideEnter();
    const z = $('lab-heat-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _satisfied(tok) {
    const i = tok.indexOf(':');
    if (i < 0) return false;
    const k = tok.slice(0, i), v = tok.slice(i + 1);
    const st = _st;
    switch (k) {
      case 'station': return st.station === v;
      case 'material': return st.materials.includes(v);
      case 'burner': return (st.burner ? 'on' : 'off') === v;
      case 'heater': return (st.heater ? 'on' : 'off') === v;
      case 'lamp': return (st.lamp ? 'on' : 'off') === v;
      case 'dye': return st.dye;
      case 'convmode': return st.convMode === v;
    }
    return false;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    _hush();
    let s = G.steps[_guide.step];
    while (s && _satisfied(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<div class="lab-heat-guide-head">
          <p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
          <button type="button" class="lab-btn lab-btn-sm" data-act="say-guide" aria-label="Read this step aloud">🔊</button>
        </div>
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

  function discoveryGuide(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(P().autoStep) });
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const lSt = Labs.store(ID);
    if (!G.adhoc) { lSt.guides = lSt.guides || {}; lSt.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : P().GUIDES.find(g => !(lSt.guides && lSt.guides[g.id]));
    _ov(`<div class="lab-done">
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
    _coach('Experiment complete: ' + G.title + '. Try the next one, or explore on your own.');
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    _hush();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or explore freely.');
  }

  function _selFor(tok) {
    const i = tok.indexOf(':');
    return i > 0 ? `[data-set="${tok.slice(0, i)}"][data-v="${tok.slice(i + 1)}"]`
                 : `[data-act="${tok}"]`;
  }
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-heat ' + _selFor(s.on));
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-act],[data-set]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  // ── Intro / help ─────────────────────────────────────────────────────────
  function _intro() {
    _ov(`<div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🔥</p>
        <h2 id="lab-ov-title">Welcome to the Heat Transfer Lab</h2>
        <ul class="lab-intro-list">
          <li><b>Three stations.</b> Conduction, Convection and Radiation — explore all three.</li>
          <li><b>Conduction:</b> wax drops melt along a metal rod, wood and plastic.</li>
          <li><b>Convection:</b> watch coloured particles circle in a heated beaker.</li>
          <li><b>Radiation:</b> a black can heats faster than a silver one under the lamp.</li>
          <li><b>🔊 Read aloud.</b> Tap 🔊 and I will read the words to you.</li>
          <li><b>Earn stars.</b> Complete missions and find ${P().DISCOVERIES.length} discoveries.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I will explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="guide_conduction" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const lSt = Labs.store(ID); lSt.intro = true; Labs.persist();
        _coach('Pick a guided experiment below, or switch to a station and explore freely.');
      } });
  }

  function _help() {
    _ov(`<h2 id="lab-ov-title" class="lab-help-title">How the Heat Transfer Lab works</h2>
      <div class="lab-help">
        <section><h3>Three ways heat can travel</h3><ul>
          <li><b>Conduction:</b> heat travels through a solid, particle by particle. Metal conducts well; wood and plastic do not.</li>
          <li><b>Convection:</b> heat travels through a liquid or gas by making it move — warm fluid rises, cool fluid sinks.</li>
          <li><b>Radiation:</b> heat travels as invisible waves, even through empty space. The Sun heats the Earth this way.</li></ul></section>
        <section><h3>Conduction station</h3><ul>
          <li>Add materials to the rack. Turn on the burner. Watch the wax drops.</li>
          <li>Metal wax drops melt quickly. Wood and plastic take much longer.</li></ul></section>
        <section><h3>Convection station</h3><ul>
          <li>Turn on the heater. Add a dye drop. Watch the convection loop.</li>
          <li>Switch to "Air" to see the same thing in a room — or in Mauritius!</li></ul></section>
        <section><h3>Radiation station</h3><ul>
          <li>Turn on the lamp. Read both thermometers. The black can heats faster.</li>
          <li>In Mauritius, dark clothing gets hotter in the sun than light clothing.</li></ul></section>
        <section><h3>Stay safe</h3><ul>
          <li>Never touch a heated metal rod with your bare hand. Use tongs.</li>
          <li>Never leave a beaker on a heater unwatched. It can boil dry.</li>
          <li>Always ask an adult when using a real Bunsen burner.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ── Canvas drawing ────────────────────────────────────────────────────────
  const _lerpColor = (a, b, t) => {
    const ca = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    const cb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    return 'rgb(' + ca.map((v, i) => Math.round(v + (cb[i] - v) * t)).join(',') + ')';
  };

  function _draw(dt) {
    if (!_cx || !_st) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(0, 0, _W, _H);
    const bench = _H * 0.72;
    c.fillStyle = _colors.bench; c.fillRect(0, bench, _W, _H - bench);
    switch (_st.station) {
      case 'conduction': _drawConduction(bench, dt); break;
      case 'convection': _drawConvection(bench, dt); break;
      case 'radiation':  _drawRadiation(bench, dt); break;
    }
    c.restore();
  }

  // ── Conduction drawing ────────────────────────────────────────────────────
  function _drawConduction(bench, dt) {
    if (!_cx) return;
    const c = _cx, D = P(), st = _st;
    const mats = st.materials;
    if (!mats.length) {
      _drawEmptyRack(bench);
      return;
    }
    const N = mats.length;
    const slot = _W / N;
    const rodBottom = bench - 6;        // rod rests on the bench at this y
    const rodLen = Math.min(200, _H * 0.58);
    const rodTop = rodBottom - rodLen;
    const rodW = 7;

    // Rack bar
    c.fillStyle = '#7A6040';
    c.fillRect(slot * 0.1, rodTop - 12, _W - slot * 0.2, 10);
    c.fillRect(slot * 0.1, bench - 5, _W - slot * 0.2, 6);

    // Flame / burner
    if (st.burner) {
      if (!Labs.calm()) _flamePh = (_flamePh + (dt || 0) * 5) % 1;
      // Wide heat source under all rods
      const flameH = 28 + Math.sin(_flamePh * Math.PI * 2) * 4;
      const flameGrad = c.createLinearGradient(0, rodBottom, 0, rodBottom - flameH);
      flameGrad.addColorStop(0, '#E84A0A');
      flameGrad.addColorStop(0.5, '#F4B800');
      flameGrad.addColorStop(1, 'rgba(255,220,0,0)');
      c.fillStyle = flameGrad;
      c.beginPath();
      c.ellipse(_W / 2, rodBottom - flameH * 0.5, _W * 0.5, flameH * 0.6, 0, 0, Math.PI * 2);
      c.fill();
    } else {
      // Burner body (no flame)
      c.fillStyle = '#5A5A5A';
      c.fillRect(_W * 0.1, bench - 8, _W * 0.8, 8);
    }

    mats.forEach((mat, i) => {
      const cx = slot * (i + 0.5);
      const M = D.MATERIALS[mat];
      const front = D.heatFrontAt(mat, st.condTime);
      const frontY = rodBottom - front * rodLen;
      const isSel = mat === st.selMat;

      // Rod background
      c.fillStyle = M.color;
      c.fillRect(cx - rodW / 2, rodTop, rodW, rodLen);

      // Heat gradient overlay
      if (front > 0 && st.burner) {
        const hg = c.createLinearGradient(0, rodBottom, 0, frontY);
        hg.addColorStop(0, 'rgba(230,70,0,0.65)');
        hg.addColorStop(0.6, 'rgba(200,120,0,0.35)');
        hg.addColorStop(1, 'rgba(200,120,0,0)');
        c.fillStyle = hg;
        c.fillRect(cx - rodW / 2, frontY, rodW, rodBottom - frontY);
      }

      // Wax drops
      D.WAX_POSITIONS.forEach(pos => {
        const wy = rodBottom - pos * rodLen;
        const melted = D.waxMelted(mat, pos, st.condTime);
        if (!melted) {
          c.fillStyle = '#F0E070';
          c.beginPath(); c.arc(cx + rodW / 2 + 4, wy, 5, 0, Math.PI * 2); c.fill();
          c.strokeStyle = '#C8B820'; c.lineWidth = 1;
          c.beginPath(); c.arc(cx + rodW / 2 + 4, wy, 5, 0, Math.PI * 2); c.stroke();
        } else {
          // Small drip below
          c.fillStyle = 'rgba(210,170,20,0.4)';
          c.beginPath(); c.arc(cx + rodW / 2 + 4, wy + 8, 2.5, 0, Math.PI * 2); c.fill();
        }
      });

      // Selection highlight
      if (isSel && N > 1) {
        c.save(); c.setLineDash([4, 3]);
        c.strokeStyle = '#E4A11B'; c.lineWidth = 2;
        c.strokeRect(cx - rodW / 2 - 6, rodTop - 6, rodW + 12, rodLen + 12);
        c.restore();
      }

      // Label
      c.fillStyle = _colors.ink; c.textAlign = 'center'; c.font = '600 10px system-ui,sans-serif';
      c.fillText(M.short, cx, bench + 18);
    });
  }

  function _drawEmptyRack(bench) {
    const c = _cx;
    c.fillStyle = '#7A6040';
    c.fillRect(_W * 0.1, bench * 0.35, _W * 0.8, 10);
    c.fillRect(_W * 0.1, bench - 5, _W * 0.8, 6);
    c.fillStyle = _colors.ink; c.textAlign = 'center'; c.font = '600 13px system-ui,sans-serif';
    c.fillText('Add materials to the rack →', _W / 2, bench * 0.6);
  }

  // ── Convection drawing ────────────────────────────────────────────────────
  function _drawConvection(bench, dt) {
    const c = _cx, st = _st, D = P();
    if (st.convMode === 'air') {
      _drawAirConvection(bench, dt);
      return;
    }
    // Beaker
    const bx = _W * 0.15, bw = _W * 0.70, by = bench - _H * 0.52, bh = _H * 0.48;
    // Water fill
    c.fillStyle = 'rgba(140,200,235,0.45)';
    c.fillRect(bx + 2, by + 2, bw - 4, bh - 2);
    // Heating coil at bottom
    if (st.heater) {
      const coilY = bench - 18;
      for (let k = 0; k < 5; k++) {
        const t = k / 4;
        c.strokeStyle = k % 2 ? '#D84000' : '#E06000';
        c.lineWidth = 3;
        c.beginPath(); c.arc(bx + 20 + t * (bw - 40), coilY, 7, 0, Math.PI); c.stroke();
      }
    }
    // Convection particles
    if (st.heater || st.convTime > 0) {
      if (!Labs.calm()) _convPhase = (_convPhase + (dt || 0) * D.CONV_SPEED) % 1;
      const speed = st.heater ? 1 : 0.3;
      for (let k = 0; k < D.CONV_N; k++) {
        const ph = (_convPhase * speed + k / D.CONV_N) % 1;
        // Elliptical loop: x oscillates, y moves counterclockwise
        const px = bx + bw / 2 + Math.sin(ph * Math.PI * 2) * (bw * 0.32);
        const py = by + bh / 2 - Math.cos(ph * Math.PI * 2) * (bh * 0.38);
        // Color: red near bottom (hot, ph~0), blue near top (cool, ph~0.5)
        const hotness = 1 - (1 - Math.cos(ph * Math.PI * 2)) / 2;
        const r = Math.round(hotness * 220 + (1 - hotness) * 30);
        const bl = Math.round(hotness * 30 + (1 - hotness) * 200);
        c.fillStyle = 'rgba(' + r + ',60,' + bl + ',0.75)';
        c.beginPath(); c.arc(px, py, 4.5, 0, Math.PI * 2); c.fill();
      }
      // Dye particle
      if (st.dye) {
        const ph2 = (_convPhase * speed + 0.05) % 1;
        const dx = bx + bw / 2 + Math.sin(ph2 * Math.PI * 2) * (bw * 0.32);
        const dy2 = by + bh / 2 - Math.cos(ph2 * Math.PI * 2) * (bh * 0.38);
        c.fillStyle = 'rgba(80,0,180,0.9)';
        c.beginPath(); c.arc(dx, dy2, 6, 0, Math.PI * 2); c.fill();
      }
    }
    // Beaker glass
    c.strokeStyle = _colors.glass; c.lineWidth = 2;
    c.beginPath(); c.moveTo(bx, by); c.lineTo(bx, bench); c.lineTo(bx + bw, bench); c.lineTo(bx + bw, by); c.stroke();
    // Labels
    c.fillStyle = _colors.ink; c.textAlign = 'center'; c.font = '700 11px system-ui,sans-serif';
    if (st.heater) {
      c.fillStyle = '#D84000'; c.fillText('hot ↑', bx + bw / 2 - 12, by + bh * 0.3);
      c.fillStyle = '#1A6080'; c.fillText('↓ cool', bx + bw / 2 + 18, by + bh * 0.7);
    }
  }

  function _drawAirConvection(bench, dt) {
    const c = _cx, st = _st, D = P();
    // Room outline
    const rx = _W * 0.05, rw = _W * 0.90, ry = _H * 0.06, rh = bench - ry;
    c.strokeStyle = '#8A9A90'; c.lineWidth = 2;
    c.strokeRect(rx, ry, rw, rh);

    // Radiator / heater on left wall
    const hh = rh * 0.35, hy = ry + rh - hh - 10;
    c.fillStyle = st.heater ? '#E05010' : '#B0B0B0';
    c.fillRect(rx + 4, hy, 16, hh);
    for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(0,0,0,0.15)'; c.fillRect(rx + 6, hy + k * (hh / 4) + 3, 12, 2); }

    // Air convection particles
    if (st.heater || st.convTime > 0) {
      if (!Labs.calm()) _convPhase = (_convPhase + (dt || 0) * D.CONV_SPEED * 0.7) % 1;
      for (let k = 0; k < 12; k++) {
        const ph = (_convPhase + k / 12) % 1;
        const px = rx + 20 + (rw - 40) * Math.abs(Math.sin(ph * Math.PI));
        const py = ry + rh - 20 - (rh - 40) * (ph < 0.5 ? (ph * 2) : (2 - ph * 2));
        const hotness = ph < 0.1 ? 1 : ph > 0.9 ? 1 : Math.max(0, 1 - Math.abs(ph - 0.1) / 0.35);
        const r = Math.round(hotness * 210 + (1 - hotness) * 30);
        const bl = Math.round(hotness * 30 + (1 - hotness) * 190);
        c.fillStyle = 'rgba(' + r + ',70,' + bl + ',0.65)';
        c.beginPath(); c.arc(px, py, 4, 0, Math.PI * 2); c.fill();
      }
    }

    // Labels
    c.fillStyle = _colors.ink; c.textAlign = 'left'; c.font = '700 10px system-ui,sans-serif';
    c.fillText('Heater (land)', rx + 24, hy - 4);
    if (st.heater) {
      c.fillStyle = '#D84000'; c.fillText('warm air rises ↑', rx + 30, ry + rh * 0.4);
      c.fillStyle = '#1A6080'; c.fillText('cool air sinks ↓', rx + rw * 0.5, ry + rh * 0.75);
    }
    c.fillStyle = _colors.ink; c.textAlign = 'right'; c.font = '700 10px system-ui,sans-serif';
    c.fillText('Sea (cool air)', rx + rw - 6, hy + hh / 2);
  }

  // ── Radiation drawing ─────────────────────────────────────────────────────
  function _drawRadiation(bench) {
    const c = _cx, st = _st, D = P();
    const tB = D.tempAt('black', st.radTime);
    const tS = D.tempAt('silver', st.radTime);

    // Lamp at top center
    const lampX = _W / 2, lampY = _H * 0.1;
    if (st.lamp) {
      // Light rays
      c.strokeStyle = 'rgba(255,230,100,0.6)'; c.lineWidth = 2;
      for (let k = 0; k < 8; k++) {
        const a = -Math.PI / 2 + (k - 3.5) * 0.32;
        c.beginPath(); c.moveTo(lampX + Math.cos(a) * 18, lampY + Math.sin(a) * 18);
        c.lineTo(lampX + Math.cos(a) * 50, lampY + Math.sin(a) * 50); c.stroke();
      }
    }
    c.fillStyle = st.lamp ? '#F4C400' : '#999';
    c.beginPath(); c.arc(lampX, lampY, 14, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#555'; c.lineWidth = 2;
    c.beginPath(); c.arc(lampX, lampY, 14, 0, Math.PI * 2); c.stroke();

    // Two cans
    const canW = 44, canH = 80;
    const leftCx = _W * 0.28, rightCx = _W * 0.72;
    const canTop = bench - canH - 10;

    [[leftCx, '#1A1A1A', tB, 'Black'], [rightCx, '#E8E8E8', tS, 'Silver']].forEach(([cx, col, temp, label]) => {
      // Can body
      c.fillStyle = col;
      c.fillRect(cx - canW / 2, canTop, canW, canH);
      c.strokeStyle = '#555'; c.lineWidth = 1.5;
      c.strokeRect(cx - canW / 2, canTop, canW, canH);
      // Temperature glow overlay
      const glow = (temp - D.ROOM_TEMP) / (D.MAX_TEMP - D.ROOM_TEMP);
      if (glow > 0) {
        c.fillStyle = 'rgba(220,80,0,' + (glow * 0.22) + ')';
        c.fillRect(cx - canW / 2, canTop, canW, canH);
      }
      // Thermometer
      const thX = cx, thBottom = canTop - 8, thTop = thBottom - 55, thW = 8;
      const fillFrac = Math.min(1, (temp - D.ROOM_TEMP) / (D.MAX_TEMP - D.ROOM_TEMP));
      const fillY = thBottom - fillFrac * (thBottom - thTop - 10);
      c.strokeStyle = '#555'; c.lineWidth = 1.5;
      c.strokeRect(thX - thW / 2, thTop, thW, thBottom - thTop);
      c.fillStyle = temp > D.ROOM_TEMP + 15 ? '#E84A0A' : '#4A90D9';
      c.fillRect(thX - thW / 2 + 1.5, fillY, thW - 3, thBottom - fillY);
      // Temperature label
      c.fillStyle = _colors.ink; c.textAlign = 'center'; c.font = '700 11px system-ui,sans-serif';
      c.fillText(Math.round(temp) + ' °C', thX, thTop - 4);
      c.font = '600 10px system-ui,sans-serif';
      c.fillText(label, cx, bench + 16);
    });
  }

  // ── Effects ───────────────────────────────────────────────────────────────
  function _fxAdd(type, done) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: type === 'flash' ? 0.5 : 0.6, done });
  }
  function _stepFx(dt) {
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i]; f.t += dt;
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
    if (_fx.some(f => f.type === 'flash') && _cx) {
      const f = _fx.find(x => x.type === 'flash');
      const k = Math.sin(Math.PI * Math.min(1, f.t / f.dur));
      _cx.fillStyle = 'rgba(220,60,0,' + (0.3 * k) + ')';
      _cx.fillRect(0, 0, _W, _H);
    }
  }

  // ── Loop ─────────────────────────────────────────────────────────────────
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) { _hush(); return; }
    const scr = _root.closest('.screen');
    if ((typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') ||
        (scr && scr.classList.contains('hidden'))) { _hush(); return; }
    _raf = requestAnimationFrame(_loop);
    if (document.hidden) { _hush(); _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    _draw(dt);
    _stepFx(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ── Test hooks ────────────────────────────────────────────────────────────
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick_hook(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n; i++) {
      _stepFx(0.05);
      _convPhase = (_convPhase + 0.05 * P().CONV_SPEED) % 1;
    }
    _readouts();
  }
  function _debug() {
    if (!_st) return { error: 'not mounted' };
    const st = _st;
    return {
      station: st.station, busy: _busy, panel: _panel, talking: _talking, looping: !!_raf,
      condTime: Math.round(st.condTime), convTime: Math.round(st.convTime), radTime: Math.round(st.radTime),
      burner: st.burner, heater: st.heater, lamp: st.lamp, dye: st.dye,
      materials: st.materials.slice(), readings: st.readings.length,
      stationsDone: Object.keys(st.stationsDone || {}),
      guide: _guide && { id: _guide.id, step: _guide.step },
      mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success },
    };
  }

  return { mount, unmount, startGuide, discoveryGuide, startMission,
           set: _set, act: _do, tick: _tick, addDye: _addDye, readTemp: _readTemp,
           _test, _tick: _tick_hook, _debug };
})();
if (typeof window !== 'undefined') window.LabHeat = LabHeat;
