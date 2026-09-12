'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Water & States (Science, PSAC Grade 4)
//
//  Three benches:
//   - HEAT & COOL: a glass beaker of ice (or tap water) with a thermometer in
//     it. Put it on the table, on the hot plate (an adult switches it on) or
//     in the freezer, and let the minutes pass: ice melts at 0 °C, water boils
//     at 100 °C, steam condenses on a cold plate, water freezes.
//   - THE DRYING RACE: three dishes of water. Sun or shade, a fan, a cup or a
//     wide plate, a lid - which one dries first? A fair test.
//   - A WATER CYCLE IN A JAR: warm water, a lid with ice on top. Evaporation,
//     condensation, then "rain".
//  Guided experiments, three Missions, Discoveries, and 🔊 read-aloud on the
//  lab assistant and the guide box (never automatic).
//
//  ⚠ Every outcome comes from lab_water_data.js (LabWaterData). This file
//    only moves time along and draws it. If water behaves wrongly, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here touches .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: time still passes and the result still
//    shows, but nothing moves and every effect applies at once.
//  ⚠ Speech is cancelled on every guide step, overlay, unmount and screen
//    change - speech outlives the DOM that started it.
//  ⚠ Leaving the Labs screen stops the loop; coming back restarts it (a
//    MutationObserver on the screen - the Rusting Lab found the loop dead).
// ══════════════════════════════════════════════
const LabWater = (() => {
  const P = () => LabWaterData;
  const ID = 'water';
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { steam: 1.1, crack: 0.9, catch: 1.1, time: 1.2 };
  const RIGS = ['heat', 'dry', 'jar'];
  const HEAT_KEYS = ['start', 'place', 'name'];
  const DRY_KEYS = ['dish', 'cont', 'spot', 'fan', 'lid', 'amt'];
  const JAR_KEYS = ['jwater', 'jlid', 'jplace'];
  const RIG_SAY = {
    heat: 'The heating bench. A beaker with a thermometer in it. Where will you put it?',
    dry: 'The drying race. Three dishes of water. Change ONE thing in a dish.',
    jar: 'A glass jar. Put water in it, then choose a lid.',
  };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _rig = 'heat', _adult = false, _heat = null, _dry = null, _jar = null;
  let _log = [], _panel = 'sandbox', _mission = null, _guide = null;
  let _fx = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _talking = false, _obs = null;

  // The grade the lab is being used at (LAB_SPEC §9); this lab's own if unknown.
  const _grade = () => (typeof Labs.grade === 'function' && Labs.grade()) || P().GRADES[0];
  const _forGrade = list => { const g = _grade(); const l = list.filter(x => !x.grades || x.grades.includes(g)); return l.length ? l : list; };

  const _newHeat = start => ({ s: P().heatNew(start || 'ice'), view: null, readings: [], last: null, plate: 0, caught: false });
  const _newDry = () => ({ sel: 'A', items: P().newDishes(), h: 0, shown: 0, cards: {} });
  const _newJar = () => ({ j: P().blankJar(), steps: 0, shown: 0, cards: {} });
  function _resetBench() {
    _heat = _newHeat('ice'); _dry = _newDry(); _jar = _newJar();
    _adult = false; _fx = []; _busy = false; _shake = 0;
  }

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-water">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade ${esc(_grade())}</span><h1>Water &amp; States</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-goggles" id="lab-water-adult" data-set="adult" data-v="on" aria-pressed="false"></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-seg lab-water-rigs" role="group" aria-label="Choose the bench">
            <button type="button" data-set="rig" data-v="heat">🔥 Heat &amp; cool</button>
            <button type="button" data-set="rig" data-v="dry">☀️ Drying race</button>
            <button type="button" data-set="rig" data-v="jar">🫙 Water cycle</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-water-stage">
            <canvas id="lab-water-canvas" role="img" aria-label="Water being heated, dried and cooled on a lab bench"></canvas>
            <div class="lab-water-chips" id="lab-water-chips"></div>
            <div class="lab-contents" id="lab-water-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip lab-water-say" data-act="say-coach" aria-label="Read this aloud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Follow the guide — or explore states of water freely!</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-water-tools" id="lab-water-tools"></div>
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
    if (!_heat) _resetBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-water-canvas');
    _cx = _cv.getContext('2d');
    _cv.addEventListener('click', _canvasTap);
    _resize();
    _wire();
    _renderAdult();
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission. Carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below.'
      : '👋 New here? Pick a guided experiment below. I will show you what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    // ⚠ Leaving the Labs screen must stop speech at once, and coming back must
    //   restart the loop: once the loop sees it is off-screen it stops for good.
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

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), bench: v('--lab-bench', '#B9CAC6'),
                glass: v('--lab-glass', 'rgba(34,58,68,.62)'), hi: v('--lab-glass-hi', 'rgba(255,255,255,.75)'), ink: v('--lab-ink', '#14211D') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(400, Math.max(290, w * 0.88)));
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
      const s = e.target.closest('[data-set]');
      if (s) { _set(s.dataset.set, s.dataset.v); if (s.closest('.lab-panel')) _showStage(); return; }
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
  // Tapping a dish on the picture chooses it.
  function _canvasTap(e) {
    if (_rig !== 'dry') return;
    const r = _cv.getBoundingClientRect();
    const ids = P().DISHES;
    const i = Math.floor((e.clientX - r.left) / (r.width / ids.length));
    if (ids[i]) _set('dish', ids[i]);
  }
  // On a phone the set-up sits below the picture: bring the picture back.
  function _showStage() {
    const z = $('lab-water-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _do(tok) {
    const i = tok.indexOf(':');
    if (i > 0) _set(tok.slice(0, i), tok.slice(i + 1));
    else _act(tok);
  }

  function _act(act) {
    switch (act) {
      case 'hub': _hush(); Labs.backToHub(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) _say(el.textContent); break; }
      case 'say-guide': { const G = _gdef(), s = G && G.steps[_guide.step]; if (s) _say(s.say); break; }
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) startMission(_mission.id); break;
      case 'guide-stop': _stopGuide(false); break;
      case 'min': waitHeat(1, 'min'); break;
      case 'five': waitHeat(5, 'five'); break;
      case 'read': read(); break;
      case 'angle': readFromAbove(); break;
      case 'catch': catchSteam(); break;
      case 'hand': hand(); break;
      case 'hour': waitDry('hour'); break;
      case 'six': waitDry('six'); break;
      case 'ten': waitJar(); break;
      case 'reset': reset(); break;
    }
  }

  // ══ Read aloud ═══════════════════════════════
  // Never automatic: only the 🔊 buttons call _say().
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
    const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
      .replace(/[→←↑↓]/g, ' ').replace(/−/g, 'minus ').replace(/°C/g, ' degrees').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-GB'; u.rate = 0.95;
    const v = _voice(); if (v) u.voice = v;
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    try { ss.speak(u); } catch (e) { _talking = false; }
  }
  // cancel() only when we are speaking - cancel-then-speak stalls Chrome.
  function _hush() {
    if (!_talking) return;
    _talking = false;
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }

  // ══ Coach ════════════════════════════════════
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

  // Every overlay goes through here: speech stops first.
  function _ov(html, o) { _hush(); return Labs.overlay(html, o); }
  function _card(kind, o) {
    _hush();
    if (kind === 'hazard') Labs.hazardCard(o); else Labs.resultCard(o);
  }

  // ══ Settings ═════════════════════════════════
  function _switchRig(v) {
    _rig = v;
    _renderTools();
    if (_panel !== 'found') _renderPanel();
  }

  function _set(k, v) {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return; }
    const D = P();
    if (k === 'rig') {
      if (!RIGS.includes(v)) return;
      _switchRig(v);
      _coach(RIG_SAY[v]);
      _after('rig:' + v);
      return;
    }
    if (k === 'adult') {
      _adult = v === 'on';
      _renderAdult();
      _coach(_adult ? 'An adult is helping. They do the hot jobs: the hot plate and the kettle.'
                    : 'No adult is helping now. Never use the hot plate or kettle on your own.');
      _after('adult:' + v);
      return;
    }
    const rig = HEAT_KEYS.includes(k) ? 'heat' : DRY_KEYS.includes(k) ? 'dry' : JAR_KEYS.includes(k) ? 'jar' : null;
    if (!rig) return;
    if (_rig !== rig) _switchRig(rig);
    if (rig === 'heat') {
      if (k === 'name') { _name(v); return; }
      const res = D.applyHeat(_heat.s, k, v, _adult);
      if (res.hazard) { _hazard(res.hazard); return; }
      if (res.refuse) { _coach(res.refuse); return; }
      if (k === 'start') _heat = _newHeat(v); else _heat.s = res.s;
      _refreshShelf();
      _coach(D.SAY[k + ':' + v] || '');
      _after(k + ':' + v);
      return;
    }
    if (rig === 'dry') {
      const run = _dry;
      if (k === 'dish') {
        if (!run.items[v]) return;
        run.sel = v;
        _refreshShelf();
        _coach(run.h ? `Dish ${v}: ${D.dryLeft(run.items[v], run.h)} ml of water left.` : `Dish ${v}: ${D.dishWords(run.items[v])}.`);
        _after('dish:' + v);
        return;
      }
      if (run.h > 0) { _coach('The race has started. Tap 🔄 Start again to change the dishes.'); return; }
      const res = D.applyDry(run.items[run.sel], k, v);
      if (res.refuse) { _coach(res.refuse); return; }
      run.items[run.sel] = res.s;
      _refreshShelf();
      _coach(`Dish ${run.sel}: ${D.SAY[k + ':' + v] || D.dishWords(res.s)}`);
      _after(k + ':' + v);
      return;
    }
    const run = _jar;
    if (run.steps > 0) { _coach('The jar test has started. Tap 🔄 Start again to change it.'); return; }
    const res = D.applyJar(run.j, k, v, _adult);
    if (res.hazard) { _hazard(res.hazard); return; }
    if (res.refuse) { _coach(res.refuse); return; }
    run.j = res.s;
    _refreshShelf();
    _coach(D.SAY[k + ':' + v] || D.jarWords(res.s));
    _after(k + ':' + v);
  }

  // After any change: repaint and tell the guide.
  function _after(token) {
    _syncSet();
    _readouts();
    _refresh();
    _guideEvent(token);
  }

  function _renderAdult() {
    const b = $('lab-water-adult');
    if (!b) return;
    b.classList.toggle('is-on', _adult);
    b.dataset.v = _adult ? 'off' : 'on';
    b.setAttribute('aria-pressed', String(_adult));
    b.textContent = _adult ? '🧑 Adult helping' : '🧑 Ask adult helper';
    _highlight();
  }

  function _syncSet() {
    if (!_root || !_heat) return;
    const hs = _heat.s, d = _dry.items[_dry.sel], j = _jar.j;
    const cur = { rig: _rig, start: hs.start, place: hs.place, dish: _dry.sel, cont: d.cont, spot: d.spot,
                  fan: d.fan ? 'on' : 'off', lid: d.lid ? 'on' : 'off', amt: String(d.amt),
                  jwater: j.water, jlid: j.lid, jplace: j.spot };
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set;
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === b.dataset.v));
    });
  }

  function _guardRig(rig) {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return false; }
    if (_rig !== rig) _switchRig(rig);
    return true;
  }

  // ══ Heat & cool ══════════════════════════════
  function waitHeat(n, token) {
    if (!_guardRig('heat')) return;
    const D = P(), run = _heat, prev = run.s;
    if (prev.ice === 0 && prev.water === 0) { _coach('The beaker is empty. Tap 🔄 Start again.'); return; }
    const frames = D.heatRun(prev, n);
    run.s = frames[frames.length - 1];
    run.view = prev;
    _busy = true;
    _coach(n === 1 ? 'Waiting one minute…' : `Waiting ${n} minutes…`);
    _fxAdd('time', () => {
      _busy = false;
      run.view = null;
      _afterHeat(prev, token);
    }, { dur: Math.min(2.4, 0.45 * n), onK: k => { run.view = frames[Math.min(n - 1, Math.floor(k * n))]; } });
    _readouts();
  }

  function _afterHeat(prev, token) {
    const D = P(), s = _heat.s;
    _logEntry({ title: `Minute ${s.min}`, obs: D.heatSeen(s) });
    D.heatFinds(prev, s).forEach(_discover);
    _coach(`Minute ${s.min}. ${D.heatSeen(s)}` + (s.off ? ' The adult switched off the hot plate.' : ''));
    _refreshShelf();
    _readouts();
    _refresh();
    _guideEvent(token);
  }

  function read() {
    if (!_guardRig('heat')) return;
    const D = P(), s = _heat.s, ph = D.phase(s);
    _heat.readings.push({ min: s.min, T: s.T, what: D.heatShort(s), state: D.STATE_OF[ph] });
    _heat.last = s.T;
    const f = D.readFinds(s);
    f.forEach(_discover);
    if (_mission && _mission.id === 'states') {
      if (f.includes('zero')) _mission.flags.zero = true;
      if (f.includes('boil')) _mission.flags.boil = true;
      _missionCheck();
    }
    _logEntry({ title: `🌡️ Reading at minute ${s.min}`, obs: `${D.fmtC(s.T)}. ${D.heatSeen(s)}` });
    _coach(`The thermometer says ${D.fmtC(s.T)}.`
      + (ph === 'melting' ? ' Ice melts at 0 °C!' : ph === 'freezing' ? ' Water freezes at 0 °C!' : ph === 'boiling' ? ' Water boils at 100 °C!' : ''));
    _after('read');
  }

  function readFromAbove() {
    if (!_guardRig('heat')) return;
    const D = P(), s = _heat.s;
    if (_mission) _mission.errors++;
    _logEntry({ title: '👀 Read from above', bad: true, obs: `It looked like ${D.fmtC(D.angleRead(s.T))}. That is not a true reading.` });
    _resCard('angle', { seen: D.angleRead(s.T), real: s.T }, 'Now bend down and tap 🌡️ Read at eye level.')();
    _guideEvent('angle');
  }

  function _name(v) {
    const D = P(), s = _heat.s;
    if (v !== 'steam' && v !== 'smoke') return;
    if (!D.steamy(s)) { _coach('Nothing is rising from the beaker yet. Heat the water first.'); return; }
    if (v === 'smoke') {
      if (_mission) _mission.errors++;
      _logEntry({ title: '🏷️ Called it smoke', bad: true, obs: 'Nothing was burning. The white cloud was water.' });
      _resCard('smoke', {}, 'Tap “It is steam” to name it right.')();
      _guideEvent('name:smoke');
      return;
    }
    _discover('steam');
    if (_mission && _mission.id === 'states') { _mission.flags.steam = true; _missionCheck(); }
    _logEntry({ title: '🏷️ Named it: steam', obs: 'The cloud rising from the water is steam: water as a gas.' });
    _coach('Yes! It is steam. Steam is water as a gas.');
    _after('name:steam');
  }

  function catchSteam() {
    if (!_guardRig('heat')) return;
    if (!P().steamy(_heat.s)) { _coach('No steam to catch yet. Heat the water until it steams.'); return; }
    _busy = true;
    _fxAdd('catch', () => {
      _busy = false;
      _heat.plate = 4; _heat.caught = true;
      _discover('condense');
      if (_mission && _mission.id === 'states') { _mission.flags.caught = true; _missionCheck(); }
      _logEntry({ title: '🍽️ A cold plate over the steam', obs: 'Drops of water formed under the plate. That is condensation.', note: true });
      _coach('Drops of water under the cold plate! The steam condensed back into water.');
      _after('catch');
    });
  }

  function hand() {
    if (!_guardRig('heat')) return;
    if (P().steamy(_heat.s)) { _hazard('steam'); return; }
    _coach('Nothing hot to feel yet. But never touch a hot plate or a hot pan.');
  }

  // ══ The drying race ══════════════════════════
  function waitDry(token) {
    if (!_guardRig('dry')) return;
    const D = P(), run = _dry;
    if (run.h >= D.DRY_HOURS) { _coach('It is hour 6, the end of the race. Tap 🔄 Start again for a new race.'); return; }
    const from = run.h, to = token === 'six' ? D.DRY_HOURS : run.h + 1;
    run.h = to;
    _busy = true;
    _coach(to - from > 1 ? 'Waiting until hour 6…' : 'Waiting one hour…');
    _refreshShelf();
    _fxAdd('time', () => {
      _busy = false;
      run.shown = to;
      _afterDry(token);
    }, { dur: Math.min(2.4, 0.4 * (to - from)), onK: k => { run.shown = from + (to - from) * k; } });
    _readouts();
  }

  function _afterDry(token) {
    const D = P(), run = _dry, h = run.h;
    _logEntry({ title: `Hour ${h}`, obs: D.DISHES.map(id => `Dish ${id}: ${D.dryLeft(run.items[id], h)} ml left`).join(' · ') });
    D.dryFinds(run.items, h).forEach(_discover);
    let card = null;
    const m = D.dryMistakes(run.items, h).find(x => !run.cards[x.id]);
    if (m) {
      run.cards[m.id] = true;
      if (_mission) _mission.errors++;
      card = _resCard(m.id, m.ctx, 'Tap 🔄 Start again. Change only ONE thing per dish.');
    }
    const ms = _mission;
    if (ms && ms.id === 'race' && !ms.success && D.missionReady('race', { items: run.items, h })) {
      ms.success = true;
      if (!card) _coach('Mission experiment done! Look at your notebook, then tap “Answer the questions”.');
      Labs.confetti();
    } else if (!card) {
      const left = D.DISHES.map(id => ({ id, v: D.dryLeft(run.items[id], h) }));
      const lo = Math.min(...left.map(x => x.v)), hi = Math.max(...left.map(x => x.v));
      const list = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0];
      _coach(lo === hi
        ? `Hour ${h}. All the dishes have the same water left. Change ONE thing to see a difference.`
        : `Hour ${h}. Least water left: dish ${list(left.filter(x => x.v === lo).map(x => x.id))}. Most left: dish ${list(left.filter(x => x.v === hi).map(x => x.id))}.`);
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent(token);
  }

  // ══ The water cycle jar ══════════════════════
  function waitJar() {
    if (!_guardRig('jar')) return;
    const D = P(), run = _jar;
    if (run.j.water === 'none') { _coach('Put some water in the jar first.'); return; }
    if (run.steps >= D.JAR_STEPS) { _coach('30 minutes have passed. Tap 🔄 Start again for a new test.'); return; }
    const from = run.steps, to = from + 1;
    run.steps = to;
    _busy = true;
    _coach('Waiting ten minutes…');
    _refreshShelf();
    _fxAdd('time', () => {
      _busy = false;
      run.shown = to;
      _afterJar();
    }, { dur: 1.4, onK: k => { run.shown = from + k; } });
    _readouts();
  }

  function _afterJar() {
    const D = P(), run = _jar, j = run.j, n = run.steps, stage = D.jarStage(j, n);
    _logEntry({ title: `${n * D.JAR_STEP} minutes`, obs: D.JAR_SEEN[stage] });
    D.jarFinds(j, n).forEach(_discover);
    let card = null;
    const m = D.jarMistakes(j, n).find(x => !run.cards[x.id]);
    if (m) {
      run.cards[m.id] = true;
      if (_mission) _mission.errors++;
      card = _resCard(m.id, m.ctx, 'Tap 🔄 Start again. Put a lid on the jar.');
    }
    const ms = _mission;
    if (ms && ms.id === 'cycle' && !ms.success && D.missionReady('cycle', { j, steps: n })) {
      ms.success = true;
      if (!card) _coach('It is raining in the jar! Mission experiment done. Tap “Answer the questions”.');
      Labs.confetti();
    } else if (!card) _coach(`${n * D.JAR_STEP} minutes. ${D.JAR_SEEN[stage]}`);
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent('ten');
  }

  function reset() {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return; }
    if (_rig === 'heat') { _heat = _newHeat('ice'); _coach('A fresh beaker of ice cubes, on the table.'); }
    else if (_rig === 'dry') { _dry = _newDry(); _coach('Three fresh dishes, each with 30 ml of water.'); }
    else { _jar = _newJar(); _coach('A clean, empty glass jar.'); }
    _refreshShelf();
    _after('reset');
  }

  function _resCard(id, ctx, next) {
    const R = P().RESULTS[id];
    return () => _card('result', { icon: R.icon, title: R.title, happened: R.happened(ctx || {}), instead: R.instead, exam: R.exam,
      onClose: () => _coach(next || 'Try it the right way.') });
  }

  // ══ Hazards ══════════════════════════════════
  const HAZ_NEXT = {
    hotplate: ['Got it - ask an adult', 'Tap “🧑 Adult helper” first. Then the adult switches on the hot plate.'],
    steam: ['Got it - hands away', 'Catch the steam on a cold plate, with an oven glove. Never with your hand.'],
    kettle: ['Got it - ask an adult', 'Use warm tap water for the jar. Only an adult uses the kettle.'],
    crack: ['Got it - use warm water', 'An adult cleared up the glass. Use warm water this time, not boiling.'],
  };
  function _hazard(id) {
    const H = P().HAZARDS[id];
    const st = Labs.store(ID);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    _busy = true;
    _hush();
    _logEntry({ title: `⚠ ${H.title()}`, bad: true, obs: H.happened() });
    _fxAdd(H.fx || 'steam', () => {
      _busy = false;
      _readouts();
      const nx = HAZ_NEXT[id] || ['Got it', 'Try again safely.'];
      _card('hazard', { signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: nx[0], onClose: () => _coach(nx[1]) });
    });
  }

  // ══ Missions ═════════════════════════════════
  const _missionDef = () => _mission && P().MISSIONS.find(x => x.id === _mission.id);

  function startMission(id) {
    const M = P().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _resetBench();
    _rig = M.rig;
    _mission = { id, errors: 0, success: false, flags: {} };
    _panel = 'missions';
    _renderAdult();
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
    _coach(M.intro);
  }

  function _missionCheck() {
    const ms = _mission;
    if (!ms || ms.success || ms.id !== 'states') return;
    if (P().missionReady('states', { flags: ms.flags })) {
      ms.success = true;
      _coach('Mission experiment done! Tap “Answer the questions” to finish.');
      Labs.confetti();
    }
    _refresh();
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
      const st = Labs.store(ID);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} on the bench. A clean, safe run earns an extra star.` : 'A fair, careful, safe experiment. ⚖️');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  const _gdef = () => _guide && (_guide.def || P().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || P().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    if (Labs.studyBegin && Labs.studyBegin('water', G, () => startGuide(idOrDef))) return;
    _mission = null;
    _resetBench();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderAdult();
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
    _guideEnter();
    const z = $('lab-water-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step whose setting is already in place needs no tap.
  function _satisfied(tok) {
    const [k, v] = tok.split(':');
    if (v === undefined) return false;
    const hs = _heat.s, d = _dry.items[_dry.sel], j = _jar.j;
    const dryOpen = _rig === 'dry' && !_dry.h, jarOpen = _rig === 'jar' && !_jar.steps;
    switch (k) {
      case 'rig': return _rig === v;
      case 'adult': return _adult === (v === 'on');
      case 'start': return _rig === 'heat' && hs.start === v && hs.min === 0;
      case 'place': return _rig === 'heat' && hs.place === v;
      case 'dish': return _rig === 'dry' && _dry.sel === v;
      case 'cont': return dryOpen && d.cont === v;
      case 'spot': return dryOpen && d.spot === v;
      case 'fan': return dryOpen && d.fan === (v === 'on');
      case 'lid': return dryOpen && d.lid === (v === 'on');
      case 'amt': return dryOpen && String(d.amt) === v;
      case 'jwater': return jarOpen && j.water === v;
      case 'jlid': return jarOpen && j.lid === v;
      case 'jplace': return jarOpen && j.spot === v;
    }
    return false;
  }

  function _guideEnter() {
    if (Labs.studyCheckpoint) Labs.studyCheckpoint('water');
    const G = _gdef();
    if (!G) return;
    _hush();
    let s = G.steps[_guide.step];
    while (s && _satisfied(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<div class="lab-water-guide-head">
          <p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
          <button type="button" class="lab-btn lab-btn-sm lab-water-say" data-act="say-guide" aria-label="Read this step aloud">🔊</button>
        </div>
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

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (s) _do(s.on);
  }

  // The words for a discovery's "how" tokens.
  function _autoStep(on) {
    const [k, v] = on.split(':');
    const D = P();
    switch (k) {
      case 'rig': return v === 'heat' ? { on, say: 'Go to the heating bench.', btn: '🔥 Heat & cool' }
        : v === 'dry' ? { on, say: 'Go to the drying race.', btn: '☀️ Drying race' } : { on, say: 'Go to the glass jar.', btn: '🫙 Water cycle' };
      case 'adult': return { on, say: 'The hot plate gets very hot. Ask an adult to help you.', btn: '🧑 Ask an adult to help' };
      case 'start': return { on, say: `Start with ${D.STARTS[v].name.toLowerCase()}.`, btn: `${D.STARTS[v].icon} ${D.STARTS[v].name}` };
      case 'place': return { on, say: `Put the beaker ${D.PLACES[v].name.toLowerCase()}.`, btn: `${D.PLACES[v].icon} ${D.PLACES[v].name}` };
      case 'name': return { on, say: 'Something rises from the water. What is it?', btn: v === 'steam' ? '🏷️ It is steam' : '🏷️ It is smoke' };
      case 'min': return { on, say: 'Wait 1 minute.', btn: '⏱ Wait 1 minute' };
      case 'five': return { on, say: 'Wait 5 minutes. Watch the beaker.', btn: '⏩ Wait 5 minutes' };
      case 'read': return { on, say: 'Read the thermometer, with your eyes level.', btn: '🌡️ Read the thermometer' };
      case 'catch': return { on, say: 'Hold a cold plate over the steam. Wear an oven glove.', btn: '🍽️ Hold a cold plate over it' };
      case 'dish': return { on, say: `Tap dish ${v}.`, btn: `Dish ${v}` };
      case 'cont': return { on, say: `Use a ${D.CONTS[v].name.toLowerCase()} for this dish.`, btn: `${D.CONTS[v].icon} ${D.CONTS[v].name}` };
      case 'spot': return { on, say: `Put this dish ${D.SPOTS[v].name.toLowerCase()}.`, btn: `${D.SPOTS[v].icon} ${D.SPOTS[v].name}` };
      case 'fan': return v === 'on' ? { on, say: 'Put a fan by this dish.', btn: '🌀 Fan on' } : { on, say: 'Switch the fan off.', btn: 'No fan' };
      case 'lid': return v === 'on' ? { on, say: 'Put a lid on this dish.', btn: '🥫 Lid on' } : { on, say: 'Take the lid off.', btn: 'No lid' };
      case 'amt': return { on, say: `Put ${v} ml of water in this dish.`, btn: `💧 ${v} ml` };
      case 'hour': return { on, say: 'Wait 1 hour.', btn: '🕐 Wait 1 hour' };
      case 'six': return { on, say: 'Wait 6 hours. Compare the dishes.', btn: '⏩ Wait 6 hours' };
      case 'jwater': return { on, say: `Put ${D.JAR_WATERS[v].name.toLowerCase()} in the jar.`, btn: `${D.JAR_WATERS[v].icon} ${D.JAR_WATERS[v].name}` };
      case 'jlid': return v === 'ice' ? { on, say: 'Cover the jar with a plate. Put ice cubes on the plate.', btn: '🧊 Plate of ice' }
        : v === 'film' ? { on, say: 'Cover the jar with cling film.', btn: '🎞️ Cling film' } : { on, say: 'Leave the jar open.', btn: '⭕ No lid' };
      case 'jplace': return v === 'sun' ? { on, say: 'Put the jar on a sunny window.', btn: '☀️ Sunny window' } : { on, say: 'Put the jar in the shade.', btn: '🌳 In the shade' };
      case 'ten': return { on, say: 'Wait 10 minutes. Look under the lid.', btn: '⏱ Wait 10 minutes' };
    }
    return { on, say: on, btn: on };
  }

  function discoveryGuide(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store(ID).disc[id];
    if (!found) {
      _ov(`
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
    _ov(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${d.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(d.saw)}</p></section>
        <section class="lab-hz-sec"><h3>The science</h3><p class="lab-eq">${esc(d.rule)}</p></section>
        <section class="lab-hz-sec is-do"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
        ${d.psac ? `<section class="lab-hz-sec is-exam"><h3>📝 Exam point</h3><p>${esc(d.psac)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    if (Labs.studyComplete && Labs.studyComplete('water', G)) { _stopGuide(true); return; }
    const st = Labs.store(ID);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _forGrade(P().GUIDES).find(g => !st.guides[g.id]);
    _ov(`
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
    _coach(`Experiment complete: ${G.title}. Pick the next one below, or try a mission.`);
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
    return i > 0 ? `[data-set="${tok.slice(0, i)}"][data-v="${tok.slice(i + 1)}"]` : `[data-act="${tok}"]`;
  }
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-water ' + _selFor(s.on));
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
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Pick</b> a guided experiment. Start here!</li>
        <li><b>Follow the yellow box</b> under the picture. The thing to tap glows yellow.</li>
        <li><b>Watch the water</b> as time passes. Read your notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_forGrade(P().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_forGrade(P().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or try your own ideas: choose a bench above the picture.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.closest('.lab-tabs')) b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _shelfHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
    _syncSet();
    _foundCount();
    _highlight();
  }

  // Repaint what changes while experimenting, without rebuilding the controls.
  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  function _refreshShelf() {
    const sh = $('lab-water-shelf');
    if (sh) sh.outerHTML = _shelfHTML();
    _syncSet();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover(ID, id, { title: d && d.title, total: _forGrade(P().DISCOVERIES).length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const st = Labs.store(ID), all = _forGrade(P().DISCOVERIES);
    n.textContent = `${all.filter(d => st.disc[d.id]).length}/${all.length}`;
  }

  function _renderTools() {
    const box = $('lab-water-tools');
    if (!box) return;
    const t = (act, icon, label, cls) => `<button type="button" class="lab-tool${cls ? ' ' + cls : ''}" data-act="${act}"><span aria-hidden="true">${icon}</span>${label}</button>`;
    if (_rig === 'heat') {
      box.innerHTML = t('min', '⏱', 'Wait 1 minute') + t('five', '⏩', 'Wait 5 minutes') + t('read', '🌡️', 'Read at eye level')
        + t('angle', '👀', 'Read from above') + t('catch', '🍽️', 'Cold plate over it')
        + `<button type="button" class="lab-tool lab-water-danger" data-act="hand"><i class="lab-water-toolsign">${Labs.sign('hot', true)}</i><span aria-hidden="true">✋</span>Feel the steam</button>`
        + t('reset', '🔄', 'Start again');
    } else if (_rig === 'dry') {
      box.innerHTML = t('hour', '🕐', 'Wait 1 hour') + t('six', '⏩', 'Wait to hour 6') + t('reset', '🔄', 'Start again');
    } else {
      box.innerHTML = t('ten', '⏱', 'Wait 10 minutes') + t('reset', '🔄', 'Start again');
    }
    box.dataset.rig = _rig;
    _highlight();
  }

  function _opt(k, v, label, small, cls) {
    return `<button type="button" class="lab-water-opt${cls ? ' ' + cls : ''}" data-set="${k}" data-v="${v}" aria-pressed="false">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _pair(k, label) {
    return `<div class="lab-water-pair"><span>${label}</span>${_opt(k, 'on', 'Yes')}${_opt(k, 'off', 'No')}</div>`;
  }
  function _shelfHTML() {
    const D = P();
    if (_rig === 'heat') {
      const s = _heat.s;
      return `<section class="lab-shelf lab-water-set" id="lab-water-shelf" aria-label="Set up the beaker">
        <h2>The beaker</h2>
        <div class="lab-water-row"><span class="lab-water-label">1 · Start with</span>
          <div class="lab-water-opts is-two">${Object.keys(D.STARTS).map(k => _opt('start', k, `${D.STARTS[k].icon} ${esc(D.STARTS[k].name)}`, D.STARTS[k].meta)).join('')}</div></div>
        <div class="lab-water-row"><span class="lab-water-label">2 · Where is the beaker?</span>
          <div class="lab-water-opts is-three">${Object.keys(D.PLACES).map(k => _opt('place', k, `${D.PLACES[k].icon} ${esc(D.PLACES[k].name)}`, D.PLACES[k].meta)).join('')}</div></div>
        <div class="lab-water-row"><span class="lab-water-label">3 · What rises from the water?</span>
          <div class="lab-water-opts is-two">${_opt('name', 'steam', '🏷️ It is steam')}${_opt('name', 'smoke', '🏷️ It is smoke')}</div></div>
        <p class="lab-hint">Minute ${esc(s.min)}: ${esc(D.heatSeen(s))} The thermometer stands in the beaker.</p>
      </section>`;
    }
    if (_rig === 'dry') {
      const run = _dry, d = run.items[run.sel], lock = run.h > 0;
      return `<section class="lab-shelf lab-water-set" id="lab-water-shelf" aria-label="Set up the dishes">
        <h2>The drying race</h2>
        <div class="lab-water-row"><span class="lab-water-label">1 · Choose a dish</span>
          <div class="lab-water-opts is-three">${D.DISHES.map(id => _opt('dish', id, id, lock ? `${D.dryLeft(run.items[id], run.h)} ml left` : D.dishLabel(run.items[id]).join(', '), 'is-big')).join('')}</div></div>
        <div class="lab-water-row"><span class="lab-water-label">2 · Dish ${esc(run.sel)}: what holds the water?</span>
          <div class="lab-water-opts is-two">${Object.keys(D.CONTS).map(k => _opt('cont', k, `${D.CONTS[k].icon} ${esc(D.CONTS[k].name)}`, D.CONTS[k].meta)).join('')}</div></div>
        <div class="lab-water-row"><span class="lab-water-label">3 · Where does dish ${esc(run.sel)} go?</span>
          <div class="lab-water-opts is-two">${Object.keys(D.SPOTS).map(k => _opt('spot', k, `${D.SPOTS[k].icon} ${esc(D.SPOTS[k].name)}`)).join('')}</div></div>
        <div class="lab-water-row"><span class="lab-water-label">4 · Extras for dish ${esc(run.sel)}</span>
          ${_pair('fan', '🌀 A fan blowing on it')}
          ${_pair('lid', '🥫 A lid on top')}
          <div class="lab-water-pair"><span>💧 Water in the dish</span>${D.AMTS.map(a => _opt('amt', String(a), `${a} ml`)).join('')}</div></div>
        <p class="lab-hint">${lock ? '🔒 The race has started. Tap 🔄 Start again to change the dishes.'
          : `Dish ${esc(run.sel)}: ${esc(D.dishWords(d))}. Change ONE thing per dish.`}</p>
      </section>`;
    }
    const run = _jar, j = run.j, lock = run.steps > 0;
    return `<section class="lab-shelf lab-water-set" id="lab-water-shelf" aria-label="Set up the jar">
      <h2>The water cycle jar</h2>
      <div class="lab-water-row"><span class="lab-water-label">1 · Water in the jar</span>
        <div class="lab-water-opts is-two">${Object.keys(D.JAR_WATERS).map(k => _opt('jwater', k, `${D.JAR_WATERS[k].icon} ${esc(D.JAR_WATERS[k].name)}`, k === 'boiling' ? 'From the kettle' : '', k === 'boiling' ? 'is-hot' : '')).join('')}</div></div>
      <div class="lab-water-row"><span class="lab-water-label">2 · The lid</span>
        <div class="lab-water-opts is-three">${Object.keys(D.JAR_LIDS).map(k => _opt('jlid', k, `${D.JAR_LIDS[k].icon} ${esc(D.JAR_LIDS[k].name)}`)).join('')}</div></div>
      <div class="lab-water-row"><span class="lab-water-label">3 · Where is the jar?</span>
        <div class="lab-water-opts is-two">${Object.keys(D.JAR_SPOTS).map(k => _opt('jplace', k, `${D.JAR_SPOTS[k].icon} ${esc(D.JAR_SPOTS[k].name)}`)).join('')}</div></div>
      <p class="lab-hint">${lock ? '🔒 The test has started. Tap 🔄 Start again to change the jar.' : `The jar: ${esc(D.jarWords(j))}.`}</p>
    </section>`;
  }

  function _seen(b) { return b ? '<span class="lab-water-yes">✓ yes</span>' : '<span class="lab-water-no">not yet</span>'; }
  function _notebookHTML() {
    const D = P();
    let table = '';
    if (_rig === 'heat') {
      const rows = _heat.readings;
      table = rows.length ? `<div class="lab-table-wrap"><table class="lab-table">
          <caption>My thermometer readings</caption>
          <thead><tr><th scope="col">Minute</th><th scope="col">Temperature</th><th scope="col">What I saw</th><th scope="col">State</th></tr></thead>
          <tbody>${rows.map(r => `<tr><th scope="row">${esc(r.min)}</th><td><b>${esc(D.fmtC(r.T))}</b></td><td>${esc(r.what)}</td><td>${esc(r.state)}</td></tr>`).join('')}</tbody></table></div>
        <p class="lab-fair">🌡️ Read the thermometer with your eyes level with the line.</p>`
        : '<p class="lab-empty">Tap 🌡️ Read at eye level to add a reading to this table.</p>';
    } else if (_rig === 'dry') {
      const run = _dry, h = run.h;
      table = `<div class="lab-table-wrap"><table class="lab-table">
          <caption>Water left ${h ? `after ${h} hour${h === 1 ? '' : 's'}` : 'at the start'}</caption>
          <thead><tr><th scope="col">Dish</th><th scope="col">Set-up</th><th scope="col">Water left</th></tr></thead>
          <tbody>${D.DISHES.map(id => { const d = run.items[id], left = D.dryLeft(d, h); return `<tr><th scope="row">${esc(id)}</th><td><small>${esc(D.dishWords(d))}</small></td>
            <td><i class="lab-water-bar" aria-hidden="true"><i style="width:${Math.round((left / 60) * 100)}%"></i></i><b>${esc(left)} ml</b>${left === 0 ? ' · dry!' : ''}</td></tr>`; }).join('')}</tbody></table></div>
        <p class="lab-fair">⚖️ Fair test: change ONE thing in a dish. Keep dish A the same, to compare.</p>`;
    } else {
      const j = _jar.j, n = _jar.steps, st = D.jarStage(j, n), drops = D.jarDrops(j, n);
      table = `<div class="lab-table-wrap"><table class="lab-table">
          <caption>The water cycle after ${n * D.JAR_STEP} minutes</caption>
          <thead><tr><th scope="col">Step</th><th scope="col">What it means</th><th scope="col">Seen?</th></tr></thead>
          <tbody>
            <tr><th scope="row">Evaporation</th><td>Water turns into vapour</td><td>${_seen(n > 0 && D.jarVapour(j) > 0)}</td></tr>
            <tr><th scope="row">Condensation</th><td>Vapour turns into drops</td><td>${_seen(drops > 0)}</td></tr>
            <tr><th scope="row">Precipitation</th><td>Drops fall like rain</td><td>${_seen(st === 'rain')}</td></tr>
          </tbody></table></div>
        <p class="lab-fair">🌧️ The sun heats the sea. Vapour cools into clouds. Rain falls.</p>`;
    }
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.bad ? 'lab-water-log-bad' : e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">What you see appears here.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${table}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store(ID);
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Do the experiment fairly and safely. Answer the exam-style questions. Earn up to three stars.</p>
      ${_forGrade(P().MISSIONS).map(M => {
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
    const D = P(), M = _missionDef();
    const tick = b => (b ? 'is-done' : '');
    let body;
    if (ms.id === 'states') {
      const f = ms.flags;
      body = `<ul class="lab-steps">
        <li class="${tick(_adult)}">🧑 Ask an adult to help with the hot plate</li>
        <li class="${tick(f.zero)}">🌡️ Read 0 °C while the ice melts</li>
        <li class="${tick(f.boil)}">🌡️ Read 100 °C while the water boils</li>
        <li class="${tick(f.steam)}">🏷️ Name what rises from the water</li>
        <li class="${tick(f.caught)}">🍽️ Catch the steam on a cold plate</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    } else if (ms.id === 'race') {
      const ff = D.fairFactors(_dry.items).filter(x => x !== 'amt');
      body = `<ul class="lab-steps">
        <li class="${tick(ff.length >= 1)}">⚖️ Change ONE thing in a dish</li>
        <li class="${tick(ff.length >= 2)}">⚖️ Change a different thing in another dish (${ff.length} so far)</li>
        <li class="${tick(_dry.h >= 3)}">🕐 Wait at least 3 hours (hour ${_dry.h} now)</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    } else {
      const j = _jar.j;
      body = `<ul class="lab-steps">
        <li class="${tick(j.water === 'warm' || j.water === 'cold')}">♨️ Water in the jar</li>
        <li class="${tick(j.lid !== 'none')}">🧊 A lid on the jar</li>
        <li class="${tick(D.jarStage(j, _jar.steps) === 'rain')}">🌧️ Rain inside the jar</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <p class="lab-hint">${esc(M.intro)}</p>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>'
                   : '<button type="button" class="lab-link" data-act="mission-restart">Start the mission again</button>'}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store(ID);
    const all = _forGrade(P().DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why. Locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _intro() {
    _ov(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">💧</p>
        <h2 id="lab-ov-title">Welcome to Water &amp; States</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will guide you, one tap at a time.</li>
          <li><b>Heat and cool.</b> Melt ice, boil water and freeze it. Read the thermometer.</li>
          <li><b>The drying race.</b> What makes water evaporate faster?</li>
          <li><b>A water cycle in a jar.</b> Make it rain inside!</li>
          <li><b>Get it wrong safely.</b> Make a mistake and see what happens. Nothing here can hurt you.</li>
          <li><b>🔊 Read aloud.</b> Tap 🔊 and I will read the words to you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. There are ${_forGrade(P().DISCOVERIES).length} discoveries to find.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="ice_steam" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(ID); st.intro = true; Labs.persist();
        _coach('Pick a guided experiment below, or choose a bench and explore.');
      } });
  }

  function _help() {
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How Water &amp; States works</h2>
      <div class="lab-help">
        <section><h3>Three states of water</h3><ul>
          <li><b>Solid:</b> ice. It keeps its shape.</li>
          <li><b>Liquid:</b> water. It flows and takes the shape of its container.</li>
          <li><b>Gas:</b> steam, or water vapour. It spreads out into the air.</li></ul></section>
        <section><h3>Changes of state</h3><ul>
          <li><b>Melting:</b> ice turns into water, at 0 °C.</li>
          <li><b>Freezing:</b> water turns into ice, at 0 °C.</li>
          <li><b>Boiling:</b> water bubbles and turns into steam, at 100 °C.</li>
          <li><b>Evaporation:</b> water slowly turns into vapour, even without boiling.</li>
          <li><b>Condensation:</b> vapour cools and turns back into water drops.</li></ul></section>
        <section><h3>The water cycle</h3>
          <p class="lab-hint">Evaporation → condensation (clouds) → precipitation (rain). Then it starts again.</p></section>
        <section><h3>A fair test</h3><ul>
          <li>Change only ONE thing. Keep everything else the same.</li></ul></section>
        <section><h3>Stay safe</h3><ul>
          <li>The hot plate and the kettle are for adults.</li>
          <li>Steam burns. Never hold your hand over boiling water.</li>
          <li>Boiling water can crack a glass jar. Use warm water.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_heat) return;
    const D = P();
    const chips = $('lab-water-chips');
    const timing = _busy && _fx.some(f => f.type === 'time');
    if (chips) {
      let h = '';
      if (_rig === 'heat') {
        const s = _heat.view || _heat.s;
        h = `<span class="lab-chip">⏱ Minute <b>${s.min}</b></span><span class="lab-chip">${D.PLACES[s.place].icon} ${esc(D.PLACES[s.place].name)}</span>`;
        if (_heat.last !== null) h += `<span class="lab-chip">🌡️ Read: <b>${esc(D.fmtC(_heat.last))}</b></span>`;
      } else if (_rig === 'dry') {
        h = `<span class="lab-chip">🕐 Hour <b>${Math.floor(_dry.shown + 1e-6)}</b> of ${D.DRY_HOURS}</span>`;
      } else {
        h = `<span class="lab-chip">⏱ <b>${Math.round(_jar.shown * D.JAR_STEP)}</b> minutes</span>`;
      }
      if (timing) h += '<span class="lab-chip is-warm">⏩ Time passing…</span>';
      if (_rig !== 'dry') h += `<span class="lab-chip">${_adult ? '🧑 Adult helping' : '🧑 No adult yet'}</span>`;
      chips.innerHTML = h;
    }
    const c = $('lab-water-contents');
    if (c) {
      if (_rig === 'heat') c.textContent = `Beaker: ${D.heatSeen(_heat.view || _heat.s)}`;
      else if (_rig === 'dry') {
        const d = _dry.items[_dry.sel];
        c.textContent = _dry.h ? `Dish ${_dry.sel}: ${D.dryLeft(d, _dry.shown)} ml left` : `Dish ${_dry.sel}: ${D.dishWords(d)}`;
      } else {
        c.textContent = _jar.steps ? `Jar: ${D.JAR_SEEN[D.jarStage(_jar.j, _jar.shown)]}` : `Jar: ${D.jarWords(_jar.j)}`;
      }
    }
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    const d = data || {};
    if (_instant || Labs.calm() || !_cx) { if (d.onK) d.onK(1); if (done) done(); return; }
    _fx.push({ type, t: 0, dur: d.dur || FX_DUR[type] || 0.6, done, data: d });
  }
  function _stepFx(dt) {
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      if (f.data.onK) f.data.onK(k);
      if (f.type === 'crack') _shake = Math.max(_shake, 0.8 * (1 - k));
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
    if (_heat && _heat.plate > 0) _heat.plate = Math.max(0, _heat.plate - dt);
  }
  const _fxOf = type => _fx.find(f => f.type === type);

  // ══ Drawing ══════════════════════════════════
  const _frac = x => x - Math.floor(x);
  const _rnd = k => _frac(Math.sin(k * 12.9898 + 78.233) * 43758.5453);
  const _lerp = (a, b, t) => a + (b - a) * t;

  function _draw(dt) {
    if (!_cx || !_heat) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((Math.random() - 0.5) * 8 * _shake, (Math.random() - 0.5) * 8 * _shake);
      _shake = Math.max(0, _shake - (dt || 0) * 1.4);
    }
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    const bench = _H * 0.8;
    c.fillStyle = _colors.bench; c.fillRect(-12, bench, _W + 24, _H - bench + 12);
    if (_rig === 'heat') _drawHeat(bench); else if (_rig === 'dry') _drawDry(bench); else _drawJar(bench);
    _drawFx();
    c.restore();
  }

  function _rrect(x, y, w, h, r) {
    const c = _cx;
    c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y); c.closePath();
  }
  // Rising wisps of vapour or steam: n puffs over a band from y0 up to y1.
  function _wisps(x, w, y0, y1, n, alpha, seed) {
    const c = _cx, still = Labs.calm();
    for (let i = 0; i < n; i++) {
      const t = still ? _rnd(i + seed) : _frac(_clock * 0.35 + i / n + _rnd(i + seed) * 0.3);
      const px = x + (_rnd(i * 3 + seed) - 0.5) * w + Math.sin(t * 6 + i) * 5;
      const py = _lerp(y0, y1, t);
      c.fillStyle = `rgba(255,255,255,${alpha * (1 - t)})`;
      c.beginPath(); c.arc(px, py, 5 + t * 9, 0, Math.PI * 2); c.fill();
    }
  }
  function _emoji(ch, x, y, size) {
    const c = _cx;
    c.save(); c.font = `${size}px system-ui, "Segoe UI Emoji", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(ch, x, y); c.restore();
  }
  function _label(text, x, y, bold) {
    const c = _cx;
    c.save(); c.font = `${bold ? 800 : 600} 11px system-ui, sans-serif`; c.textAlign = 'center';
    const w = c.measureText(text).width + 10;
    c.fillStyle = 'rgba(255,255,255,0.88)'; _rrect(x - w / 2, y - 12, w, 16, 6); c.fill();
    c.fillStyle = _colors.ink; c.fillText(text, x, y); c.restore();
  }

  function _drawHeat(bench) {
    const c = _cx, D = P(), s = _heat.view || _heat.s;
    const cx = _W * 0.44, bw = Math.min(112, _W * 0.32), bh = Math.min(150, _H * 0.42);
    let base = bench;
    if (s.place === 'freezer') {
      const fx0 = cx - bw * 0.95, fx1 = cx + bw * 1.3, fy0 = bench - bh - 62;
      c.fillStyle = 'rgba(190,225,245,0.55)'; c.fillRect(fx0, fy0, fx1 - fx0, bench - fy0);
      c.strokeStyle = '#5E9DC4'; c.lineWidth = 3; c.strokeRect(fx0, fy0, fx1 - fx0, bench - fy0);
      c.fillStyle = 'rgba(255,255,255,0.9)';
      for (let k = 0; k < 18; k++) c.fillRect(fx0 + 4 + _rnd(k) * (fx1 - fx0 - 8), fy0 + 4 + _rnd(k + 9) * (bench - fy0 - 8), 2, 2);
      _label('Freezer: ' + D.fmtC(D.FREEZER_C), (fx0 + fx1) / 2, fy0 + 16, true);
    }
    if (s.place === 'hot') {
      const pw = bw * 1.6, ph = 22;
      c.fillStyle = '#4C5860'; _rrect(cx - pw / 2, bench - ph, pw, ph, 4); c.fill();
      const glow = 0.55 + (Labs.calm() ? 0 : 0.2 * Math.sin(_clock * 4));
      c.fillStyle = `rgba(232,80,40,${glow})`; c.fillRect(cx - pw / 2 + 6, bench - ph, pw - 12, 5);
      c.fillStyle = '#FF6A3D'; c.beginPath(); c.arc(cx + pw / 2 - 12, bench - ph / 2 + 2, 4, 0, Math.PI * 2); c.fill();
      base = bench - ph;
    }
    const top = base - bh, x0 = cx - bw / 2;
    // what is inside the beaker
    const waterH = (s.water / D.MASS) * bh * 0.7, wTop = base - waterH;
    if (s.water > 0) {
      const warm = Math.max(0, Math.min(1, s.T / 100));
      c.fillStyle = `rgba(${Math.round(_lerp(140, 170, warm))},${Math.round(_lerp(196, 210, warm))},${Math.round(_lerp(236, 225, warm))},0.7)`;
      c.fillRect(x0 + 2, wTop, bw - 4, waterH - 2);
    }
    const nIce = Math.ceil(s.ice / 12.5), cube = bw * 0.2;
    for (let k = 0; k < nIce; k++) {
      const col = k % 4, row = Math.floor(k / 4);
      const ix = x0 + 8 + col * (cube + 4) + (_rnd(k) - 0.5) * 3;
      const iy = s.water > 0 ? wTop - cube * 0.35 + row * cube * 0.8 : base - 4 - (row + 1) * (cube + 2);
      const sz = cube * (k === nIce - 1 ? Math.max(0.5, (s.ice % 12.5 || 12.5) / 12.5) : 1);
      c.fillStyle = 'rgba(235,248,255,0.95)'; c.strokeStyle = '#8CC3E0'; c.lineWidth = 1.2;
      _rrect(ix, iy, sz, sz, 3); c.fill(); c.stroke();
    }
    const ph = D.phase(s);
    if (ph === 'boiling' || (s.water > 0 && s.T >= D.STEAMY_C)) {
      const n = ph === 'boiling' ? 14 : 4, still = Labs.calm();
      c.fillStyle = 'rgba(255,255,255,0.85)';
      for (let k = 0; k < n; k++) {
        const t = still ? _rnd(k + 40) : _frac(_clock * 1.2 + _rnd(k + 40));
        const bx = x0 + 8 + _rnd(k + 5) * (bw - 16), by = _lerp(base - 6, wTop + 4, t);
        c.beginPath(); c.arc(bx, by, ph === 'boiling' ? 2 + _rnd(k) * 3 : 1.5, 0, Math.PI * 2); c.fill();
      }
    }
    if (D.steamy(s)) _wisps(cx, bw * 0.6, wTop - 6, top - 60, ph === 'boiling' ? 9 : 4, 0.85, 3);
    // the glass
    c.strokeStyle = _colors.glass; c.lineWidth = 2.2;
    c.beginPath(); c.moveTo(x0 - 6, top); c.lineTo(x0, top + 6); c.lineTo(x0, base); c.lineTo(x0 + bw, base); c.lineTo(x0 + bw, top); c.stroke();
    c.strokeStyle = _colors.hi; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(x0 + 5, top + 12); c.lineTo(x0 + 5, base - 6); c.stroke();
    // the thermometer, standing in the beaker, its scale to the right
    const tx = x0 + bw - 14, tTop = top - 58, tBot = base - 12;
    const yOf = t => tBot - ((t + 20) / 130) * (tBot - tTop - 8);
    c.fillStyle = '#FFFFFF'; c.strokeStyle = '#6A7A80'; c.lineWidth = 1.2;
    _rrect(tx - 4, tTop, 8, tBot - tTop, 4); c.fill(); c.stroke();
    c.fillStyle = '#D0312D';
    c.fillRect(tx - 2, yOf(s.T), 4, tBot - yOf(s.T));
    c.beginPath(); c.arc(tx, tBot, 6, 0, Math.PI * 2); c.fill();
    c.strokeStyle = _colors.ink; c.lineWidth = 1; c.fillStyle = _colors.ink; c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'left';
    [0, 100].forEach(t => { const y = yOf(t); c.beginPath(); c.moveTo(tx + 4, y); c.lineTo(tx + 20, y); c.stroke(); c.fillText(t + ' °C', tx + 22, y + 3); });
    // the cold plate, held over the steam
    const cat = _fxOf('catch');
    if (cat || _heat.plate > 0) {
      const k = cat ? Math.min(1, cat.t / cat.dur) : 1;
      const px = _lerp(_W + 60, cx - 6, k), py = top - 44;
      c.fillStyle = '#F3F5F6'; c.strokeStyle = '#9AA6AC'; c.lineWidth = 1.5;
      c.beginPath(); c.ellipse(px, py, bw * 0.62, 8, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      if (k >= 1) {
        c.fillStyle = 'rgba(90,160,215,0.9)';
        for (let i = 0; i < 9; i++) { c.beginPath(); c.arc(px - bw * 0.5 + i * bw * 0.125, py + 9 + _rnd(i) * 2, 2.2, 0, Math.PI * 2); c.fill(); }
      }
      _emoji('🧤', px + bw * 0.7, py - 2, 20);
    }
    _label(D.PLACES[s.place].name, cx, bench + 22, true);
  }

  function _drawDry(bench) {
    const c = _cx, D = P(), run = _dry, ids = D.DISHES, slot = _W / ids.length, h = run.shown;
    ids.forEach((id, i) => {
      const d = run.items[id], cx = slot * (i + 0.5), left = D.dryLeft(d, h), rate = D.dryRate(d);
      if (d.spot === 'sun') {
        c.fillStyle = 'rgba(255,214,90,0.28)'; c.fillRect(slot * i + 3, 50, slot - 6, bench - 50);
        _emoji('☀️', cx, 66, 24);
      } else {
        c.fillStyle = 'rgba(60,80,90,0.12)'; c.fillRect(slot * i + 3, 50, slot - 6, bench - 50);
        _emoji('🌳', cx, 66, 24);
      }
      let surfY, sw;
      if (d.cont === 'cup') {
        const w = Math.min(46, slot * 0.4), hh = _H * 0.3, x0 = cx - w / 2, y0 = bench - 4 - hh;
        const wh = (left / 60) * hh * 0.92;
        c.fillStyle = 'rgba(140,196,236,0.7)'; c.fillRect(x0 + 2, bench - 4 - wh, w - 4, wh);
        c.strokeStyle = _colors.glass; c.lineWidth = 2;
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0, bench - 4); c.lineTo(x0 + w, bench - 4); c.lineTo(x0 + w, y0); c.stroke();
        if (d.lid) { c.fillStyle = '#7C8A90'; c.fillRect(x0 - 3, y0 - 5, w + 6, 6); }
        surfY = bench - 4 - wh; sw = w;
      } else {
        const w = Math.min(slot * 0.82, 110);
        c.fillStyle = '#F4F6F7'; c.strokeStyle = '#9AA6AC'; c.lineWidth = 1.5;
        c.beginPath(); c.ellipse(cx, bench - 8, w / 2, 9, 0, 0, Math.PI * 2); c.fill(); c.stroke();
        if (left > 0) {
          const f = left / 60;
          c.fillStyle = `rgba(120,185,232,${0.35 + 0.5 * f})`;
          c.beginPath(); c.ellipse(cx, bench - 8, (w / 2 - 4) * (0.45 + 0.55 * f), 6, 0, 0, Math.PI * 2); c.fill();
        }
        if (d.lid) {
          c.strokeStyle = '#7C8A90'; c.lineWidth = 2.5;
          c.beginPath(); c.ellipse(cx, bench - 10, w / 2, 26, 0, Math.PI, 0); c.stroke();
        }
        surfY = bench - 12; sw = w * 0.7;
      }
      if (d.fan) {
        const fx = slot * i + 16, fy = bench - 40, a = Labs.calm() ? 0 : _clock * 9;
        c.fillStyle = '#5A6670';
        for (let b = 0; b < 3; b++) { const ang = a + b * 2.094; c.beginPath(); c.ellipse(fx + Math.cos(ang) * 6, fy + Math.sin(ang) * 6, 7, 3, ang, 0, Math.PI * 2); c.fill(); }
        c.fillRect(fx - 1.5, fy, 3, bench - fy);
        c.strokeStyle = 'rgba(90,110,120,0.55)'; c.lineWidth = 1.5;
        for (let k = 0; k < 3; k++) { const off = Labs.calm() ? 0 : _frac(_clock + k / 3) * 14; c.beginPath(); c.moveTo(fx + 12 + off, fy - 8 + k * 8); c.lineTo(fx + 26 + off, fy - 8 + k * 8); c.stroke(); }
      }
      if (!d.lid && left > 0 && rate > 0 && run.h > 0) _wisps(cx, sw, surfY - 4, surfY - 70, Math.min(8, 1 + Math.round(rate / 2)), 0.9, i * 7);
      if (run.sel === id && !run.h) {
        c.save(); c.setLineDash([4, 3]); c.strokeStyle = '#E4A11B'; c.lineWidth = 2;
        c.strokeRect(slot * i + 5, 42, slot - 10, bench - 38); c.restore();
      }
      c.save();
      c.fillStyle = '#FFFFFF'; c.strokeStyle = _colors.ink; c.lineWidth = 1.5;
      c.beginPath(); c.arc(cx, bench + 15, 10, 0, Math.PI * 2); c.fill(); c.stroke();
      c.fillStyle = _colors.ink; c.textAlign = 'center';
      c.font = '800 12px system-ui, sans-serif'; c.fillText(id, cx, bench + 19);
      c.font = '700 11px system-ui, sans-serif'; c.fillText(`${left} ml`, cx, bench + 38);
      c.font = '600 10px system-ui, sans-serif'; c.fillText(D.dishLabel(d)[1], cx, bench + 51);
      c.restore();
    });
  }

  function _drawJar(bench) {
    const c = _cx, D = P(), j = _jar.j, n = _jar.shown;
    const cx = _W * 0.5, jw = Math.min(150, _W * 0.42), jh = Math.min(200, _H * 0.56), bot = bench - 4, top = bot - jh, x0 = cx - jw / 2;
    const drops = D.jarDrops(j, n), stage = D.jarStage(j, n), vap = D.jarVapour(j);
    if (j.spot === 'sun') {
      _emoji('☀️', _W * 0.14, 64, 34);
      c.strokeStyle = 'rgba(240,180,40,0.6)'; c.lineWidth = 2;
      for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(_W * 0.2 + k * 6, 80 + k * 8); c.lineTo(x0 + 10 + k * 10, top + 40 + k * 16); c.stroke(); }
    }
    const wh = j.water === 'none' ? 0 : jh * 0.3, wTop = bot - wh;
    if (wh) {
      c.fillStyle = j.water === 'warm' ? 'rgba(160,200,230,0.72)' : 'rgba(120,180,230,0.72)';
      c.fillRect(x0 + 2, wTop, jw - 4, wh - 2);
      if (j.water === 'cold') { c.fillStyle = 'rgba(235,248,255,0.95)'; for (let k = 0; k < 3; k++) { _rrect(x0 + 14 + k * 26, wTop - 6, 16, 16, 3); c.fill(); } }
    }
    if (vap > 0 && (n > 0 || _fxOf('time'))) _wisps(cx, jw * 0.7, wTop - 4, stage === 'escape' ? top - 70 : top + 16, Math.min(9, 2 + vap * 2), 0.8, 11);
    c.strokeStyle = _colors.glass; c.lineWidth = 2.4;
    _rrect(x0, top, jw, jh, 14); c.stroke();
    c.strokeStyle = _colors.hi; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(x0 + 8, top + 16); c.lineTo(x0 + 8, bot - 16); c.stroke();
    if (j.lid === 'film') {
      c.strokeStyle = 'rgba(200,220,230,0.95)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(x0 - 4, top); c.quadraticCurveTo(cx, top + 8, x0 + jw + 4, top); c.stroke();
    } else if (j.lid === 'ice') {
      c.fillStyle = '#F3F5F6'; c.strokeStyle = '#9AA6AC'; c.lineWidth = 1.5;
      c.beginPath(); c.ellipse(cx, top - 2, jw * 0.62, 8, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.fillStyle = 'rgba(235,248,255,0.95)'; c.strokeStyle = '#8CC3E0';
      for (let k = 0; k < 4; k++) { _rrect(cx - 38 + k * 20, top - 20, 16, 14, 3); c.fill(); c.stroke(); }
    }
    if (drops > 0) {
      const nd = Math.min(24, Math.round(drops * 4)), r = Math.min(4, 1.4 + drops * 0.4);
      c.fillStyle = 'rgba(90,160,215,0.9)';
      for (let k = 0; k < nd; k++) { c.beginPath(); c.arc(x0 + 10 + _rnd(k + 60) * (jw - 20), top + 7 + _rnd(k + 70) * 5, r, 0, Math.PI * 2); c.fill(); }
    }
    if (stage === 'rain') {
      c.strokeStyle = 'rgba(80,150,210,0.9)'; c.lineWidth = 2;
      for (let k = 0; k < 7; k++) {
        const t = Labs.calm() ? _rnd(k + 90) : _frac(_clock * 0.9 + _rnd(k + 90));
        const rx = x0 + 16 + _rnd(k + 91) * (jw - 32), ry = _lerp(top + 14, wTop - 6, t);
        c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx, ry + 8); c.stroke();
      }
    }
    if (n > 0 && vap > 0) _label('↑ Evaporation', x0 + jw + 2 < _W - 50 ? x0 - 8 : cx, wTop - 22, false);
    if (drops > 0) _label('Condensation', cx, top + 36, false);
    if (stage === 'rain') _label('↓ Precipitation', cx, (top + wTop) / 2 + 10, true);
    _label(j.water === 'none' ? 'An empty jar' : D.JAR_WATERS[j.water].name, cx, bench + 22, true);
  }

  function _drawFx() {
    const c = _cx;
    _fx.forEach(f => {
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'time': {
          const x = _W - 34, y = _H * 0.3, r = 18;
          c.fillStyle = 'rgba(255,255,255,0.95)'; c.strokeStyle = _colors.ink; c.lineWidth = 2;
          c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
          const a = -Math.PI / 2 + k * Math.PI * 4;
          c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8); c.stroke();
          break;
        }
        case 'steam': {
          const x = _W / 2, y = _H * 0.55;
          for (let j = 0; j < 8; j++) {
            const t = _frac(k * 1.6 + j / 8), sx = x + (j - 4) * 10 + Math.sin(j + t * 6) * 6, sy = y - t * 110;
            c.fillStyle = `rgba(240,244,248,${0.9 * (1 - t)})`;
            c.beginPath(); c.arc(sx, sy, 8 + t * 14, 0, Math.PI * 2); c.fill();
          }
          c.fillStyle = `rgba(255,120,40,${0.25 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'crack': {
          const x = _W / 2, y = _H * 0.5;
          c.strokeStyle = '#1B2A30'; c.lineWidth = 2;
          c.beginPath(); c.moveTo(x - 10, y - 50); c.lineTo(x + 6, y - 20); c.lineTo(x - 8, y + 4); c.lineTo(x + 12, y + 40); c.stroke();
          c.beginPath(); c.moveTo(x + 6, y - 20); c.lineTo(x + 30, y - 14); c.stroke();
          c.fillStyle = `rgba(210,40,40,${0.28 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
      }
    });
  }

  // ══ Loop ═════════════════════════════════════
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) { _hush(); return; }
    // Off the Labs screen by any route - S.currentScreen, or the screen simply hidden.
    const scr = _root.closest('.screen');
    if ((typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') || (scr && scr.classList.contains('hidden'))) { _hush(); return; }
    _raf = requestAnimationFrame(_loop);
    if (document.hidden) { _hush(); _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    if (!Labs.calm()) _clock += dt;
    _stepFx(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _stepFx(0.05); _readouts(); }
  function _debug() {
    const D = P();
    const H = _heat || _newHeat('ice'), Dr = _dry || _newDry(), J = _jar || _newJar();
    return { rig: _rig, busy: _busy, adult: _adult, panel: _panel, talking: _talking, looping: !!_raf,
             heat: Object.assign({}, H.s, { phase: D.phase(H.s), steamy: D.steamy(H.s), shownMin: (H.view || H.s).min,
                                            readings: H.readings.map(r => r.T), last: H.last, caught: H.caught }),
             dry: { sel: Dr.sel, h: Dr.h, shown: Dr.shown,
                    items: Object.fromEntries(D.DISHES.map(id => [id, Object.assign({}, Dr.items[id], { rate: D.dryRate(Dr.items[id]), left: D.dryLeft(Dr.items[id], Dr.h) })])) },
             jar: Object.assign({}, J.j, { steps: J.steps, shown: J.shown, drops: D.jarDrops(J.j, J.steps), stage: D.jarStage(J.j, J.steps) }),
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success, flags: Object.assign({}, _mission.flags) },
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs) };
  }


  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => P().GUIDES,
    start: startGuide,
    snapshot: () => _busy ? null : ({ _rig, _adult, _heat, _dry, _jar, _log, _panel, _guide }),
    restore: state => { ({ _rig, _adult, _heat, _dry, _jar, _log, _panel, _guide } = state); },
    refresh: () => { if (_guide) _guideEnter(); },
    stop: () => { _stopGuide(true); }
  };
  return { study, mount, unmount, startMission, startGuide, discoveryGuide, set: _set, act: _do,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabWater = LabWater;
