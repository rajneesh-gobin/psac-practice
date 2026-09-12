'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Sun, Earth & Moon (Grades 6 & 7)
//
//  Two-grade lab on a single 2D orrery canvas (side/top-down view):
//   Sun (left) · Earth (centre-right) · Moon orbiting Earth.
//  Grade 6: day/night, shadow stick through the day, eclipses — simple terms.
//  Grade 7: all of G6 plus manual phase stepping, tidal locking, axial tilt.
//
//  ⚠ Every science value comes from LabSunmoonData. This file only animates.
//  ⚠ Only the <canvas> animates. No transform on .screen or ancestors.
//  ⚠ Calm Mode / reduced motion: simulation still runs, nothing moves.
//  ⚠ Speech cancelled on every step change, overlay, unmount and screen change.
//  ⚠ Grade filter: Labs.grade() → only that grade's guides/missions/discoveries.
//  ⚠ Read-aloud 🔊 on coach and guide box; never auto-play; English voice.
// ══════════════════════════════════════════════
const LabSunmoon = (() => {
  const D = () => LabSunmoonData;
  const ID = 'sunmoon';
  const FRAME_MS = 1000 / 30;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  // ── State ──────────────────────────────────
  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _obs = null;
  let _spinning = false, _orbiting = false, _stickOn = false;
  let _moonAngle = Math.PI;      // π = new moon (between Earth and Sun)
  let _earthSpin = 0.5;          // 0–1; 0.5 = Mauritius at noon (facing Sun-left side)
  let _observeTime = 'noon';     // 'sunrise' | 'noon' | 'sunset'
  let _eclipseType = null;       // 'solar' | 'lunar' | null
  let _phasesVisited = new Set();
  let _stickObserved = 0;
  let _solarSeen = false, _lunarSeen = false;
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _fx = [], _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _talking = false;
  let _log = [], _instant_spin = false;
  let _lastGrade = null;

  // ── Helpers ────────────────────────────────
  const _g = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 6;
    return D().GRADES.includes(g) ? g : 6;
  };
  const _mine = list => D().forGrade(list, _g());
  const _calm = () => typeof Labs !== 'undefined' && Labs.calm && Labs.calm();

  // ── Phase index ─────────────────────────────
  function _phaseIdx() { return D().phaseIdxFromAngle(_moonAngle); }
  function _phaseName() { return D().PHASES[_phaseIdx()].name; }

  // ── Eclipse detection ────────────────────────
  // Solar eclipse: Moon near new moon position (moonAngle ≈ π), within ±22°.
  // Lunar eclipse: Moon near full moon position (moonAngle ≈ 0/2π), within ±22°.
  const _ECLIPSE_TOL = 22 * Math.PI / 180;
  function _getEclipseType() {
    const a = _moonAngle % (2 * Math.PI);
    const fromNew  = Math.min(Math.abs(a - Math.PI), 2 * Math.PI - Math.abs(a - Math.PI));
    const fromFull = Math.min(a, 2 * Math.PI - a);
    if (fromNew  < _ECLIPSE_TOL) return 'solar';
    if (fromFull < _ECLIPSE_TOL) return 'lunar';
    return null;
  }
  // Day-time for observer (earthSpin 0.25–0.75 = facing toward-Sun side).
  function _dayTime() { const s = _earthSpin; return s > 0.25 && s < 0.75; }

  // ── Shell HTML ──────────────────────────────
  function _shellHTML() {
    return `<div class="lab lab-sunmoon">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title">
          <span class="lab-eyebrow" id="lab-sunmoon-eyebrow">Science · Grade ${_g()}</span>
          <h1>Sun, Earth &amp; Moon</h1>
        </div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-sunmoon-stage">
            <canvas id="lab-canvas" role="img" aria-label="Animated diagram of the Sun, Earth and Moon"></canvas>
            <div class="lab-sunmoon-chips" id="lab-sunmoon-chips"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🔭</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-sunmoon-say lab-coach-tip" data-act="say-coach" aria-label="Read this aloud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Move the Sun, Moon and Earth to explore day, night and lunar phases.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-sunmoon-tools" id="lab-sunmoon-tools"></div>
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

  // ── Mount / Unmount ─────────────────────────
  function mount(root) {
    _root = root;
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else _coach(_mine(D().GUIDES).filter(g => !st.guides[g.id]).length > 0
      ? '👋 Pick a guided experiment below. I will show you what to tap.'
      : 'Welcome back! Pick a mission or hunt for more discoveries.');
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

  // ── Read-aloud ──────────────────────────────
  function _voice() {
    try {
      const vs = (window.speechSynthesis.getVoices && window.speechSynthesis.getVoices()) || [];
      const en = vs.filter(v => /^en/i.test(v.lang || ''));
      return en.find(v => /en[-_]GB/i.test(v.lang) && v.localService) || en.find(v => v.localService) || en[0] || null;
    } catch (e) { return null; }
  }
  function _say(text) {
    const ss = window.speechSynthesis;
    if (!ss || typeof SpeechSynthesisUtterance === 'undefined') { _coach('Read-aloud is not available in this browser.'); return; }
    _hush();
    const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
      .replace(/→/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-GB'; u.rate = 0.95;
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

  // ── Coach ───────────────────────────────────
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    _hush();
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const facts = _mine(D().FACTS);
    _tipIdx = (_tipIdx + 1) % facts.length;
    _coach('💡 ' + facts[_tipIdx].text);
  }

  function _ov(html, o) { _hush(); return Labs.overlay(html, o); }
  function _card(kind, o) {
    _hush();
    if (kind === 'hazard') Labs.hazardCard(o); else Labs.resultCard(o);
    const h = document.querySelector('#lab-overlay .is-exam h3');
    if (h) h.textContent = '📝 In the PSAC exam';
  }

  // ── Events ──────────────────────────────────
  function _wire() {
    _root.onclick = e => {
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const s = e.target.closest('[data-set]');
      if (s) { _set(s.dataset.set, s.dataset.v); return; }
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

  function _act(act) {
    switch (act) {
      case 'hub':       _hush(); Labs.backToHub(); break;
      case 'help':      _help(); break;
      case 'tip':       _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) _say(el.textContent); break; }
      case 'say-guide': { const G = _gdef(), s = G && G.steps[_guide.step]; if (s) _say(s.say); break; }
      case 'quiz':      _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free exploring.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) startMission(_mission.id); break;
      case 'guide-stop': _stopGuide(false); break;
      case 'reset':     _reset(); break;
      case 'spin':      _toggleSpin(); break;
      case 'orbit':     _toggleOrbit(); break;
      case 'stick':     _toggleStick(); break;
      case 'observe':   _observe(); break;
      case 'phase-next': _nextPhase(); break;
      case 'phase-prev': _prevPhase(); break;
      case 'sun-gaze':  _hazard('sun_gaze'); break;
    }
  }

  function _set(k, v) {
    switch (k) {
      case 'time':    _setTime(v); break;
      case 'eclipse': _setEclipse(v); break;
    }
  }

  function _do(tok) {
    const i = tok.indexOf(':');
    if (i > 0) _set(tok.slice(0, i), tok.slice(i + 1));
    else _act(tok);
  }

  // ── Controls ─────────────────────────────────
  function _toggleSpin() {
    _spinning = !_spinning;
    _syncSet();
    _coach(_spinning
      ? 'Earth is spinning! Watch the day and night sides change.'
      : 'Earth stopped spinning. Look at which side is lit by the Sun.');
    _after(_spinning ? 'spin:on' : 'spin:off');
  }

  function _toggleOrbit() {
    _orbiting = !_orbiting;
    _syncSet();
    _coach(_orbiting
      ? 'The Moon is orbiting Earth. Watch it move around.'
      : 'The Moon stopped. Which phase can you see?');
    _after(_orbiting ? 'orbit:on' : 'orbit:off');
  }

  function _toggleStick() {
    _stickOn = !_stickOn;
    _syncSet();
    if (_stickOn && !_dayTime()) {
      _coach('The shadow stick is on Earth, but Mauritius is in darkness. Spin Earth to the day side first.');
      _resultCard('shadow_night');
    } else {
      _coach(_stickOn
        ? 'Shadow stick placed on Earth at Mauritius. Set the time to see how the shadow changes.'
        : 'Shadow stick removed.');
    }
    _after(_stickOn ? 'stick:on' : 'stick:off');
  }

  function _setTime(v) {
    const times = { sunrise: 0.28, noon: 0.5, sunset: 0.72 };
    if (!(v in times)) return;
    _observeTime = v;
    _earthSpin = times[v];
    _stickObserved++;
    _syncSet();
    const msgs = {
      sunrise: 'Sunrise. The Sun is just above the horizon. Shadows are at their longest.',
      noon: 'Noon. The Sun is at its highest. Shadows are at their shortest.',
      sunset: 'Sunset. The Sun is low again. Shadows are long and point east.',
    };
    _coach(msgs[v] || 'Time set.');
    _after('time:' + v);
  }

  function _setEclipse(v) {
    if (v === 'solar')  { _moonAngle = Math.PI;  _eclipseType = 'solar';  _solarSeen = true; }
    if (v === 'lunar')  { _moonAngle = 0;         _eclipseType = 'lunar';  _lunarSeen = true; }
    _phasesVisited.add(_phaseIdx());
    _syncSet();
    if (v === 'solar') _coach('Solar eclipse! The Moon is directly between Earth and the Sun. Never look directly at this.');
    if (v === 'lunar')  _coach('Lunar eclipse! Earth\'s shadow is falling on the Moon. It goes dark.');
    _after('eclipse:' + v);
    _checkFinds();
  }

  function _nextPhase() {
    _moonAngle = (_moonAngle + Math.PI / 4) % (2 * Math.PI);
    const idx = _phaseIdx();
    _phasesVisited.add(idx);
    const ph = D().PHASES[idx];
    _coach(ph.name + '. ' + _phaseCoachLine(idx));
    _eclipseType = _getEclipseType();
    if (_eclipseType === 'solar') _solarSeen = true;
    if (_eclipseType === 'lunar') _lunarSeen = true;
    _after('phase:' + idx);
    _checkFinds();
  }

  function _prevPhase() {
    _moonAngle = ((_moonAngle - Math.PI / 4) + 2 * Math.PI) % (2 * Math.PI);
    const idx = _phaseIdx();
    _phasesVisited.add(idx);
    _coach(D().PHASES[idx].name + '. ' + _phaseCoachLine(idx));
    _eclipseType = _getEclipseType();
    _after('phase:' + idx);
  }

  function _phaseCoachLine(idx) {
    const lines = [
      'The Moon is between Earth and the Sun. We see the dark side.',
      'A thin sliver of lit Moon grows on the right.',
      'Half the Moon is lit. This is called First Quarter.',
      'More than half is lit — a gibbous Moon.',
      'The whole lit side faces us. Full Moon!',
      'The lit part starts to shrink.',
      'Half lit again, on the other side.',
      'Just a thin crescent left. Almost new moon again.',
    ];
    return lines[idx] || '';
  }

  function _observe() {
    _stickObserved++;
    const et = _getEclipseType();
    if (et) {
      if (et === 'solar') { _solarSeen = true; _coach('Solar eclipse observed! The Moon\'s shadow covers part of Earth.'); }
      if (et === 'lunar')  { _lunarSeen = true; _coach('Lunar eclipse observed! Earth\'s shadow is on the Moon.'); }
    } else if (_spinning) {
      _coach('Earth is spinning. See the dark night side and the lit day side.');
    } else {
      _coach('The observer is on the ' + (_dayTime() ? 'day' : 'night') + ' side of Earth.');
    }
    _after('observe');
    _checkFinds();
  }

  function _reset() {
    _spinning = false; _orbiting = false; _stickOn = false;
    _moonAngle = Math.PI; _earthSpin = 0.5; _observeTime = 'noon';
    _eclipseType = null; _stickObserved = 0; _solarSeen = false; _lunarSeen = false;
    _syncSet();
    _coach('Reset. Earth and Moon are back to the starting position.');
    _after('reset');
  }

  function _resultCard(id) {
    const R = D().RESULTS[id];
    if (!R) return;
    setTimeout(() => {
      _card('result', { icon: R.icon, title: R.title, happened: R.happened({}), instead: R.instead, exam: R.exam,
        onClose: () => _coach('Try again with the observer on the day side.') });
    }, 200);
  }

  // ── Hazards ──────────────────────────────────
  function _hazard(id) {
    const H = D().HAZARDS[id];
    const st = Labs.store(ID);
    st.hazards = st.hazards || {};
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    _hush();
    _card('hazard', { signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
      button: 'Got it — use eclipse glasses',
      onClose: () => _coach('Remember: never look directly at the Sun or at a solar eclipse without certified eclipse glasses.') });
  }

  // ── After any change ─────────────────────────
  function _after(token) {
    _syncSet(); _readouts(); _refresh(); _guideEvent(token);
  }

  function _syncSet() {
    if (!_root) return;
    const ey = $('lab-sunmoon-eyebrow');
    if (ey) ey.textContent = 'Science · Grade ' + _g();
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set, v = b.dataset.v;
      const cur = { spin: _spinning ? 'on' : 'off', orbit: _orbiting ? 'on' : 'off',
                    stick: _stickOn ? 'on' : 'off', time: _observeTime };
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === v));
    });
  }

  // ── Discoveries ──────────────────────────────
  function _state() {
    return { grade: _g(), spinning: _spinning, orbiting: _orbiting, stickOn: _stickOn,
             observeTime: _observeTime, eclipseType: _eclipseType, phasesVisited: _phasesVisited,
             stickObserved: _stickObserved, solarSeen: _solarSeen, lunarSeen: _lunarSeen,
             dayTime: _dayTime(), moonAngle: _moonAngle };
  }

  function _checkFinds() {
    const ids = D().finds(_state());
    let changed = false;
    ids.forEach(id => { if (_discover(id)) changed = true; });
    if (changed) _refresh();
  }

  function _discover(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return false;
    return Labs.discover(ID, id, { title: d.title, total: _mine(D().DISCOVERIES).length });
  }

  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const mine = _mine(D().DISCOVERIES);
    const found = mine.filter(d => Labs.store(ID).disc[d.id]).length;
    n.textContent = `${found}/${mine.length}`;
  }

  // ── Missions ─────────────────────────────────
  const _missionDef = () => _mission && _mine(D().MISSIONS).find(x => x.id === _mission.id);

  function startMission(id) {
    const M = _mine(D().MISSIONS).find(x => x.id === id);
    if (!M) return;
    _stopGuide(true);
    _reset();
    _mission = { id, errors: 0, success: false };
    _panel = 'missions';
    _renderTools(); _renderPanel(); _syncSet(); _readouts();
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
      const st = Labs.store(ID);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} during the experiment.` : 'A clean, careful experiment. ⭐');
      if (r.firstTry < r.total - 1) lines.push('Get all but one right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission or hunt for discoveries.'); } });
    } });
  }

  // ── Guided experiments ────────────────────────
  const _gdef = () => _guide && (_guide.def || _mine(D().GUIDES).find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(D().GUIDES).find(g => g.id === idOrDef);
    if (!G) return;
    _mission = null;
    _reset();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderTools(); _renderPanel(); _syncSet(); _readouts();
    _guideEnter();
    const z = $('lab-sunmoon-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: _calm() ? 'auto' : 'smooth' });
  }

  function _satisfied(tok) {
    if (!tok) return false;
    const [k, v] = tok.split(':');
    switch (k) {
      case 'spin':    return _spinning === (v === 'on');
      case 'orbit':   return _orbiting === (v === 'on');
      case 'stick':   return _stickOn === (v === 'on');
      case 'time':    return _observeTime === v;
      case 'eclipse': return _eclipseType === v;
      case 'phase':   return _phaseIdx() === Number(v);
      case 'observe': return _stickObserved > 0 || _solarSeen || _lunarSeen;
      case 'reset':   return false;
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
      box.innerHTML = `<div class="lab-sunmoon-guide-head">
          <p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
          <button type="button" class="lab-btn lab-btn-sm lab-sunmoon-say" data-act="say-guide" aria-label="Read this step aloud">🔊</button>
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

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (s) _do(s.on);
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
    const [k, v] = on.split(':');
    switch (k) {
      case 'spin':    return v === 'on' ? { on, say: 'Tap "Spin Earth" to start Earth rotating.', btn: '🌍 Spin Earth' }
                                        : { on, say: 'Stop Earth spinning.', btn: '⏸ Stop spinning' };
      case 'orbit':   return v === 'on' ? { on, say: 'Tap "Orbit Moon" to start the Moon moving.', btn: '🌙 Orbit Moon' }
                                        : { on, say: 'Tap "Orbit Moon" to stop it.', btn: '⏸ Stop Moon' };
      case 'stick':   return v === 'on' ? { on, say: 'Tap "Shadow Stick" to place a stick on Earth.', btn: '📏 Shadow Stick' }
                                        : { on, say: 'Tap "Shadow Stick" to remove it.', btn: '📏 Remove stick' };
      case 'time':    return { on, say: `Set the time to ${v}.`, btn: `⏰ Set to ${v[0].toUpperCase() + v.slice(1)}` };
      case 'eclipse': return v === 'solar'
        ? { on, say: 'Tap "Solar Eclipse Position" to move the Moon in front of the Sun.', btn: '🌑 Solar Eclipse Position' }
        : { on, say: 'Tap "Lunar Eclipse Position" to move the Moon behind Earth.', btn: '🌕 Lunar Eclipse Position' };
      case 'phase':   return { on, say: `Tap "Next Phase" to advance to phase ${+v + 1}.`, btn: '▶ Next Phase' };
      case 'observe': return { on, say: 'Tap "Observe" to record what you see.', btn: '👁 Observe' };
      case 'reset':   return { on, say: 'Tap "Reset" to start again.', btn: '🔄 Reset' };
    }
    return { on, say: on, btn: on };
  }

  function discoveryGuide(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
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
        <section class="lab-hz-sec"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
        ${d.psac ? `<section class="lab-hz-sec is-exam"><h3>📝 In the PSAC exam</h3><p>${esc(d.psac)}</p></section>` : ''}
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
    const next = G.adhoc ? null : _mine(D().GUIDES).find(g => !st.guides[g.id]);
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
    _coach(`Done: ${G.title}. Pick the next experiment below or try a mission.`);
    Labs.confetti();
    _checkFinds();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null; _hush();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below or explore freely.');
  }

  function _selFor(tok) {
    const [k, v] = tok.split(':');
    switch (k) {
      case 'spin':    return v === 'on' ? '[data-act="spin"]' : '[data-act="spin"]';
      case 'orbit':   return '[data-act="orbit"]';
      case 'stick':   return '[data-act="stick"]';
      case 'time':    return `[data-set="time"][data-v="${v}"]`;
      case 'eclipse': return `[data-set="eclipse"][data-v="${v}"]`;
      case 'phase':   return '[data-act="phase-next"]';
      case 'observe': return '[data-act="observe"]';
      case 'reset':   return '[data-act="reset"]';
    }
    return '[data-act="observe"]';
  }

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide && _guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-sunmoon ' + _selFor(s.on));
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

  // ── Panels ───────────────────────────────────
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
        <li><b>Pick a guided experiment.</b> It is the best place to start.</li>
        <li><b>Follow the yellow box</b> below the picture. It shows what to tap next.</li>
        <li><b>Watch the Sun, Earth and Moon</b> move and change.</li>
      </ol>
      <h3>🧭 Guided experiments <small>step by step</small></h3>
      <div class="lab-start-list">${_mine(D().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_mine(D().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or explore freely with the controls below.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found')     p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _notebookHTML();
    _syncSet(); _foundCount(); _highlight();
  }

  function _refresh() {
    const nb = $('lab-sunmoon-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount(); _highlight();
  }

  function _notebookHTML() {
    const rows = _log.slice(0, 8);
    const list = rows.length
      ? `<ol class="lab-log">${rows.map(e => `<li><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">Your observations appear here as you explore.</p>';
    return `<section class="lab-notebook" id="lab-sunmoon-notebook" aria-label="Lab notebook">
      <h2>Notebook</h2>${list}</section>`;
  }

  function _logEntry(e) { _log.unshift(e); if (_log.length > 20) _log.length = 20; _refresh(); }

  function _missionListHTML() {
    const st = Labs.store(ID);
    return `<section class="lab-missions"><h2>Missions</h2>
      <p class="lab-hint">Do the experiment, then answer the questions. Earn up to three stars.</p>
      ${_mine(D().MISSIONS).map(M => {
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
    const M = _missionDef();
    if (!M) return '';
    const st = _state();
    const ready = D().missionReady(ms.id, st);
    if (ready && !ms.success) { ms.success = true; Labs.confetti(); _coach('You have done the experiment! Now answer the questions.'); }

    let steps = '';
    if (ms.id === 'shadow_detective') {
      steps = `<ul class="lab-steps">
        <li class="${_stickOn ? 'is-done' : ''}">📏 Turn on the Shadow Stick</li>
        <li class="${_stickObserved >= 1 ? 'is-done' : ''}">🌅 Observe at sunrise</li>
        <li class="${_observeTime === 'noon' && _stickObserved >= 2 ? 'is-done' : ''}">🌞 Observe at noon</li>
        <li class="${_stickObserved >= 3 ? 'is-done' : ''}">🌇 Observe at sunset</li>
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>`;
    } else if (ms.id === 'eclipse_spotter') {
      steps = `<ul class="lab-steps">
        <li class="${_orbiting ? 'is-done' : ''}">🌙 Orbit the Moon</li>
        <li class="${_solarSeen ? 'is-done' : ''}">🌑 See a solar eclipse</li>
        <li class="${_lunarSeen ? 'is-done' : ''}">🌕 See a lunar eclipse</li>
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>`;
    } else if (ms.id === 'phase_tracker') {
      steps = `<ul class="lab-steps">
        <li class="${_phasesVisited.size >= 4 ? 'is-done' : ''}">🌒 See 4 or more phases (${_phasesVisited.size} so far)</li>
        <li class="${_phasesVisited.size >= 8 ? 'is-done' : ''}">🌕 Complete all 8 phases</li>
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>`;
    } else {
      steps = `<ul class="lab-steps">
        <li class="${_spinning ? 'is-done' : ''}">🌍 Spin Earth to observe seasons</li>
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>`;
    }

    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <p class="lab-hint">${esc(M.intro)}</p>
      ${steps}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>'
                   : '<button type="button" class="lab-link" data-act="mission-restart">Start the mission again</button>'}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store(ID);
    const all = _mine(D().DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why. Locked ones give a clue.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How? →</small></button>`).join('')}
      </div></section>`;
  }

  // ── Tools ─────────────────────────────────────
  function _renderTools() {
    const box = $('lab-sunmoon-tools');
    if (!box) return;
    const is7 = _g() === 7;
    box.innerHTML = `
      <button type="button" class="lab-tool" data-act="spin" aria-pressed="${_spinning}"><span aria-hidden="true">🌍</span>Spin Earth</button>
      <button type="button" class="lab-tool" data-act="orbit" aria-pressed="${_orbiting}"><span aria-hidden="true">🌙</span>Orbit Moon</button>
      <button type="button" class="lab-tool" data-act="stick" aria-pressed="${_stickOn}"><span aria-hidden="true">📏</span>Shadow Stick</button>
      <button type="button" class="lab-tool" data-act="observe"><span aria-hidden="true">👁</span>Observe</button>
      ${is7 ? `<button type="button" class="lab-tool" data-act="phase-prev"><span aria-hidden="true">◀</span>Prev Phase</button>
               <button type="button" class="lab-tool" data-act="phase-next"><span aria-hidden="true">▶</span>Next Phase</button>` : ''}
      <button type="button" class="lab-tool lab-sunmoon-time" data-set="time" data-v="sunrise" aria-pressed="${_observeTime==='sunrise'}">🌅 Sunrise</button>
      <button type="button" class="lab-tool lab-sunmoon-time" data-set="time" data-v="noon" aria-pressed="${_observeTime==='noon'}">🌞 Noon</button>
      <button type="button" class="lab-tool lab-sunmoon-time" data-set="time" data-v="sunset" aria-pressed="${_observeTime==='sunset'}">🌇 Sunset</button>
      <button type="button" class="lab-tool" data-set="eclipse" data-v="solar">🌑 Solar Eclipse</button>
      <button type="button" class="lab-tool" data-set="eclipse" data-v="lunar">🌕 Lunar Eclipse</button>
      <button type="button" class="lab-tool lab-sunmoon-danger" data-act="sun-gaze" title="Hazard">${Labs.sign('eye', true)}<span aria-hidden="true">👁</span>Look at Sun</button>
      <button type="button" class="lab-tool" data-act="reset"><span aria-hidden="true">🔄</span>Reset</button>`;
    _highlight();
  }

  // ── Intro / Help ─────────────────────────────
  function _intro() {
    const g = _g();
    const firstGuide = _mine(D().GUIDES)[0];
    _ov(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🌍</p>
        <h2 id="lab-ov-title">Welcome to the Sun, Earth &amp; Moon Lab</h2>
        <ul class="lab-intro-list">
          <li><b>Grade ${g}.</b> ${g === 6 ? 'Learn about day and night, shadows and eclipses.' : 'Explore moon phases, tidal locking, and seasons.'}</li>
          <li><b>Start with a guided experiment.</b> The yellow box tells you what to tap next.</li>
          <li><b>Spin Earth</b> to create day and night. <b>Orbit the Moon</b> to see it move.</li>
          <li><b>Find ${_mine(D().DISCOVERIES).length} discoveries.</b> Some unlock automatically as you experiment.</li>
          <li><b>🔊</b> Tap the speaker to hear the words read aloud.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore on my own</button>
        ${firstGuide ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${firstGuide.id}" data-autofocus>Show me how →</button>` : ''}
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(ID); st.intro = true; Labs.persist();
        _coach('Pick a guided experiment below to start.');
      } });
  }

  function _help() {
    const g = _g();
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Sun, Earth &amp; Moon Lab works</h2>
      <div class="lab-help">
        <section><h3>The diagram</h3>
          <p class="lab-hint">The Sun is on the left (yellow glow). Earth is to the right. The Moon orbits Earth.</p></section>
        <section><h3>Day and night</h3><ul>
          <li>The left side of Earth faces the Sun — that side has <b>day</b>.</li>
          <li>The right side faces away — <b>night</b>.</li>
          <li>Earth rotates once every <b>24 hours</b>, giving us day and night.</li></ul></section>
        <section><h3>Shadows</h3><ul>
          <li>The shadow stick stands at <b>Mauritius</b>.</li>
          <li>At noon the Sun is highest — shadow is <b>shortest</b>.</li>
          <li>At sunrise and sunset the Sun is low — shadow is <b>longest</b>.</li></ul></section>
        <section><h3>Eclipses</h3><ul>
          <li><b>Solar:</b> Moon between Earth and Sun. Moon blocks the Sun.</li>
          <li><b>Lunar:</b> Earth between Sun and Moon. Earth's shadow covers the Moon.</li>
          <li>Never look directly at the Sun or a solar eclipse without eclipse glasses.</li></ul></section>
        ${g >= 7 ? `<section><h3>Moon phases (Grade 7)</h3><ul>
          <li>There are <b>8 phases</b>: new, crescent, quarter, gibbous, full, gibbous, quarter, crescent.</li>
          <li><b>Waxing</b> = lit part growing. <b>Waning</b> = lit part shrinking.</li>
          <li>A full cycle takes about <b>29.5 days</b>.</li>
          <li>The Moon always shows the same face — <b>tidal locking</b>.</li></ul></section>` : ''}
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the lab</button></div>`,
      { cls: 'is-help' });
  }

  // ── Readouts ──────────────────────────────────
  function _readouts() {
    if (!_root) return;
    const chips = $('lab-sunmoon-chips');
    if (!chips) return;
    const ph = D().PHASES[_phaseIdx()];
    let h = `<span class="lab-chip">${ph.icon} <b>${ph.name}</b></span>`;
    if (_eclipseType) h += `<span class="lab-chip is-warm">${_eclipseType === 'solar' ? '🌑 Solar Eclipse' : '🌕 Lunar Eclipse'}</span>`;
    if (_stickOn) {
      const slen = _shadowLengthLabel();
      h += `<span class="lab-chip">📏 Shadow: ${slen}</span>`;
    }
    if (_spinning) h += '<span class="lab-chip">🔄 Spinning</span>';
    chips.innerHTML = h;
  }

  function _shadowLengthLabel() {
    const obs = _earthSpin;
    const angle = Math.abs(obs - 0.5) * 2 * Math.PI; // 0=noon, π/2=sunrise
    if (angle > Math.PI * 0.45) return 'very long';
    if (angle > Math.PI * 0.3)  return 'long';
    if (angle > Math.PI * 0.15) return 'medium';
    return 'short';
  }

  // ── Canvas ────────────────────────────────────
  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(280, wrap.clientWidth || 320);
    const h = Math.round(Math.min(380, Math.max(260, w * 0.78)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width  = Math.round(w * dpr);
    _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _readColors();
    _draw(0);
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = {
      space:  v('--lab-cv-top', '#0f172a'),
      space2: v('--lab-cv-bot', '#1e1b4b'),
      ink:    v('--lab-ink',    '#e2e8f0'),
    };
  }

  // Draw a moon-phase disk (lit side always toward Sun = left in our canvas).
  // phaseIdx: 0=new…4=full…7=waning crescent.
  // For the orrery Moon body (small circle) we just tint based on position.
  function _drawPhaseDisk(cx, cy, r, phaseIdx) {
    const c = _cx;
    const dark = '#1e1b4b', lit = '#fffde7';
    c.save();
    c.beginPath(); c.arc(cx, cy, r, 0, 2 * Math.PI); c.clip();
    // Fill all dark first
    c.fillStyle = dark; c.fillRect(cx - r - 1, cy - r - 1, 2 * r + 2, 2 * r + 2);
    if (phaseIdx === 0) { c.restore(); return; }   // new moon
    if (phaseIdx === 4) {                            // full moon
      c.fillStyle = lit; c.fillRect(cx - r - 1, cy - r - 1, 2 * r + 2, 2 * r + 2);
      c.restore(); return;
    }
    // Waxing (1-3): lit side grows on the right (standard Northern Hemisphere diagram).
    // Waning (5-7): lit side shrinks from right.
    const isWaxing = phaseIdx < 4;
    // Ellipse semi-axis for terminator: negative = bow faces left (waxing crescent), positive = bow faces right (gibbous).
    const ax = r * Math.cos(phaseIdx * Math.PI / 4); // varies -r to +r
    // Draw lit right half
    c.fillStyle = lit;
    c.fillRect(cx, cy - r - 1, r + 1, 2 * r + 2);
    if (!isWaxing) {
      // Waning: also fill left half
      c.fillRect(cx - r - 1, cy - r - 1, r + 1, 2 * r + 2);
    }
    // Draw ellipse to carve out the shadowed part of the visible face
    c.fillStyle = dark;
    c.beginPath();
    if (isWaxing) {
      // Carve crescent from gibbous
      if (ax > 0) c.ellipse(cx, cy, ax, r, 0, -Math.PI / 2, Math.PI / 2);
      else        c.ellipse(cx, cy, -ax, r, 0, Math.PI / 2, -Math.PI / 2);
    } else {
      if (ax < 0) {
        // Waning gibbous: fill left plus terminator
        c.fillRect(cx - r - 1, cy - r - 1, r + 1, 2 * r + 2);
        c.beginPath(); c.fillStyle = dark;
        c.ellipse(cx, cy, -ax, r, 0, Math.PI / 2, -Math.PI / 2);
      } else {
        c.ellipse(cx, cy, ax, r, 0, -Math.PI / 2, Math.PI / 2);
      }
    }
    c.fill();
    c.restore();
  }

  function _draw(dt) {
    if (!_cx) return;
    const c = _cx;
    c.save(); c.clearRect(0, 0, _W, _H);

    // ── Space background ──
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, '#0f172a'); bg.addColorStop(1, '#1e1b4b');
    c.fillStyle = bg; c.fillRect(0, 0, _W, _H);

    // Stars
    c.fillStyle = 'rgba(255,255,255,0.7)';
    const rnd = k => (Math.sin(k * 12.9898 + 78.233) * 43758.5453) % 1;
    const posW = _W * 0.82; // keep stars in left region, away from panel area
    for (let i = 0; i < 60; i++) {
      const sx = rnd(i + 1) * posW, sy = rnd(i + 31) * _H;
      const sr = 0.5 + rnd(i + 61) * 1.2;
      c.beginPath(); c.arc(sx, sy, sr, 0, 2 * Math.PI); c.fill();
    }

    // Layout constants
    const PHASE_H  = 44;               // phase strip height at bottom
    const mainH    = _H - PHASE_H;
    const CY       = mainH * 0.48;
    const SX       = _W * 0.14;        // Sun x
    const EX       = _W * 0.62;        // Earth x
    const SUN_R    = Math.min(_W * 0.09, 32);
    const EARTH_R  = Math.min(_W * 0.055, 19);
    const MOON_OR  = EARTH_R * 3.4;   // Moon orbital radius
    const MOON_R   = Math.min(EARTH_R * 0.42, 8);

    const eclipse = _getEclipseType();

    // ── Sun ──
    const sunGlow = c.createRadialGradient(SX, CY, SUN_R * 0.3, SX, CY, SUN_R * 2.5);
    sunGlow.addColorStop(0,   'rgba(253,224,71,0.95)');
    sunGlow.addColorStop(0.4, 'rgba(251,191,36,0.7)');
    sunGlow.addColorStop(1,   'rgba(251,191,36,0)');
    c.fillStyle = sunGlow; c.beginPath(); c.arc(SX, CY, SUN_R * 2.5, 0, 2 * Math.PI); c.fill();
    c.fillStyle = '#fbbf24'; c.beginPath(); c.arc(SX, CY, SUN_R, 0, 2 * Math.PI); c.fill();
    c.fillStyle = '#fef08a'; c.beginPath(); c.arc(SX, CY, SUN_R * 0.6, 0, 2 * Math.PI); c.fill();

    // ── Moon orbital path ──
    c.save(); c.setLineDash([3, 5]);
    c.strokeStyle = 'rgba(255,255,255,0.18)'; c.lineWidth = 1;
    c.beginPath(); c.arc(EX, CY, MOON_OR, 0, 2 * Math.PI); c.stroke();
    c.restore();

    // ── Eclipse cone (drawn before Earth so Earth covers it) ──
    const moonX = EX + MOON_OR * Math.cos(_moonAngle);
    const moonY = CY + MOON_OR * Math.sin(_moonAngle);
    if (eclipse === 'solar' || (_eclipseType === 'solar')) {
      // Shadow cone from Moon toward Earth
      const coneAngle = Math.atan2(0, EX - moonX);
      const coneW = EARTH_R * 0.6;
      c.save();
      const cg = c.createLinearGradient(moonX, CY, EX, CY);
      cg.addColorStop(0, 'rgba(0,0,0,0.7)');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = cg;
      c.beginPath();
      c.moveTo(moonX, moonY - MOON_R);
      c.lineTo(EX - EARTH_R * 0.3, CY - coneW);
      c.lineTo(EX - EARTH_R * 0.3, CY + coneW);
      c.lineTo(moonX, moonY + MOON_R);
      c.closePath(); c.fill();
      c.restore();
    }
    if (eclipse === 'lunar' || (_eclipseType === 'lunar')) {
      // Shadow cone from Earth away from Sun
      const coneW = EARTH_R * 0.9;
      c.save();
      const cg = c.createLinearGradient(EX, CY, EX + MOON_OR + MOON_R, CY);
      cg.addColorStop(0, 'rgba(0,0,0,0.75)');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = cg;
      c.beginPath();
      c.moveTo(EX + EARTH_R * 0.5, CY - coneW);
      c.lineTo(EX + MOON_OR + MOON_R, CY - coneW * 0.4);
      c.lineTo(EX + MOON_OR + MOON_R, CY + coneW * 0.4);
      c.lineTo(EX + EARTH_R * 0.5, CY + coneW);
      c.closePath(); c.fill();
      c.restore();
    }

    // ── Earth ──
    c.save(); c.beginPath(); c.arc(EX, CY, EARTH_R, 0, 2 * Math.PI); c.clip();
    // Day side (left half, facing Sun)
    c.fillStyle = '#1d4ed8'; c.fillRect(EX - EARTH_R - 1, CY - EARTH_R - 1, 2 * EARTH_R + 2, 2 * EARTH_R + 2);
    // Night side (right half, away from Sun)
    c.fillStyle = '#0f172a'; c.fillRect(EX, CY - EARTH_R - 1, EARTH_R + 1, 2 * EARTH_R + 2);
    // Terminator glow
    c.fillStyle = 'rgba(96,165,250,0.18)'; c.fillRect(EX - 3, CY - EARTH_R, 6, 2 * EARTH_R);
    c.restore();
    // Earth outline
    c.strokeStyle = '#60a5fa'; c.lineWidth = 1.2;
    c.beginPath(); c.arc(EX, CY, EARTH_R, 0, 2 * Math.PI); c.stroke();

    // ── Axial tilt indicator (G7) ──
    if (_g() >= 7) {
      c.save();
      c.strokeStyle = 'rgba(251,191,36,0.5)'; c.lineWidth = 1.2;
      const tiltAngle = 23.5 * Math.PI / 180;
      const axLen = EARTH_R + 9;
      c.setLineDash([3, 3]);
      c.beginPath();
      c.moveTo(EX + Math.sin(tiltAngle) * axLen, CY - Math.cos(tiltAngle) * axLen);
      c.lineTo(EX - Math.sin(tiltAngle) * axLen, CY + Math.cos(tiltAngle) * axLen);
      c.stroke();
      c.restore();
    }

    // ── Observer (Mauritius) + Shadow stick ──
    const obsAngle = _earthSpin * 2 * Math.PI; // 0=midnight(right), π=noon(left)
    const obsX = EX + EARTH_R * Math.cos(obsAngle);
    const obsY = CY + EARTH_R * Math.sin(obsAngle);
    const onDaySide = Math.cos(obsAngle) < 0; // left side = day (facing Sun)

    // Mauritius dot
    c.fillStyle = onDaySide ? '#4ade80' : '#6b7280';
    c.beginPath(); c.arc(obsX, obsY, 3, 0, 2 * Math.PI); c.fill();

    // Label Mauritius (only when near side)
    if (_stickOn || _spinning) {
      c.fillStyle = onDaySide ? '#86efac' : '#9ca3af';
      c.font = '700 8px system-ui, sans-serif'; c.textAlign = 'center';
      const lblX = EX + (EARTH_R + 13) * Math.cos(obsAngle);
      const lblY = CY + (EARTH_R + 13) * Math.sin(obsAngle);
      c.fillText('MU', lblX, lblY + 3);
    }

    if (_stickOn && onDaySide) {
      // Stick: radially outward from Earth surface
      const stickLen = 12;
      const nX = Math.cos(obsAngle), nY = Math.sin(obsAngle);
      const stickTX = obsX + nX * stickLen, stickTY = obsY + nY * stickLen;
      c.strokeStyle = '#f97316'; c.lineWidth = 2; c.lineCap = 'round';
      c.beginPath(); c.moveTo(obsX, obsY); c.lineTo(stickTX, stickTY); c.stroke();

      // Shadow: tangent to Earth surface, away from Sun
      // Sun direction from observer: (SX - obsX, CY - obsY) normalized
      const dx = SX - obsX, dy = CY - obsY, dist = Math.hypot(dx, dy) || 1;
      const sunDir = { x: dx / dist, y: dy / dist };
      // Tangent direction at observer: perpendicular to nX,nY
      const tang = { x: -nY, y: nX };
      // Shadow goes AWAY from Sun (dot product of tang with away-from-Sun dir)
      const away = { x: -sunDir.x, y: -sunDir.y };
      const dot = tang.x * away.x + tang.y * away.y;
      const shadowDir = dot >= 0 ? tang : { x: -tang.x, y: -tang.y };

      // Shadow length based on Sun's elevation at observer
      const elevation = Math.abs(Math.cos(obsAngle)); // 1=noon, 0=sunrise/sunset
      const shadowLen = Math.min(36, stickLen * Math.tan((1 - elevation) * Math.PI * 0.48 + 0.05));

      c.strokeStyle = 'rgba(0,0,0,0.6)'; c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(obsX, obsY);
      c.lineTo(obsX + shadowDir.x * shadowLen, obsY + shadowDir.y * shadowLen);
      c.stroke();

      // Shadow length annotation
      c.fillStyle = '#fb923c'; c.font = '700 7px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText(_shadowLengthLabel(), obsX + shadowDir.x * (shadowLen + 9), obsY + shadowDir.y * (shadowLen + 9) + 2);
    }

    // ── Moon ──
    c.save();
    // In lunar eclipse position, Moon is dark (Earth's shadow)
    const moonInShadow = eclipse === 'lunar';
    // Draw Moon body
    const moonPhIdx = moonInShadow ? 0 : _phaseIdx();
    // For orrery: draw Moon with top-down illumination (left=lit, right=dark), scaled by angle
    // Simple approach: draw lit/dark based on angle from Sun direction
    const moonFromSunAngle = _moonAngle; // moonAngle=π → new (dark face toward Earth), moonAngle=0 → full (lit toward Earth)
    // Fraction of lit disk visible from Earth perspective
    const litFrac = (1 - Math.cos(_moonAngle)) / 2; // 0 at new moon, 1 at full moon
    const moonColor = moonInShadow ? '#4b1c1c' : `rgba(255,253,231,${0.15 + litFrac * 0.85})`;
    c.fillStyle = '#1e1b4b'; // dark background of Moon
    c.beginPath(); c.arc(moonX, moonY, MOON_R, 0, 2 * Math.PI); c.fill();
    c.fillStyle = moonColor;
    c.beginPath(); c.arc(moonX, moonY, MOON_R * 0.95, 0, 2 * Math.PI); c.fill();
    // Moon outline
    c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 0.8;
    c.beginPath(); c.arc(moonX, moonY, MOON_R, 0, 2 * Math.PI); c.stroke();
    // Face marker for tidal locking (G7)
    if (_g() >= 7) {
      c.fillStyle = 'rgba(0,0,0,0.4)';
      // Small dot always on the Earth-facing side (toward Earth = toward center = opposite moonAngle direction)
      const faceX = moonX - MOON_R * 0.4 * Math.cos(_moonAngle);
      const faceY = moonY - MOON_R * 0.4 * Math.sin(_moonAngle);
      c.beginPath(); c.arc(faceX, faceY, 1.2, 0, 2 * Math.PI); c.fill();
    }
    c.restore();

    // ── Phase strip ──
    _drawPhaseStrip(mainH, PHASE_H);

    // ── Eclipse label ──
    if (eclipse) {
      c.fillStyle = eclipse === 'solar' ? '#fbbf24' : '#818cf8';
      c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText(eclipse === 'solar' ? '🌑 Solar Eclipse' : '🌕 Lunar Eclipse', _W * 0.38, mainH - 10);
    }

    c.restore();
  }

  function _drawPhaseStrip(y0, stripH) {
    const c = _cx;
    const n = 8, cellW = _W / n;
    const curPhase = _phaseIdx();

    c.fillStyle = 'rgba(0,0,0,0.4)';
    c.fillRect(0, y0, _W, stripH);

    for (let i = 0; i < n; i++) {
      const cx = cellW * (i + 0.5), cy = y0 + stripH / 2;
      const r = Math.min(cellW * 0.28, 12);
      const ph = D().PHASES[i];
      const isCur = i === curPhase;

      if (isCur) {
        c.fillStyle = 'rgba(251,191,36,0.18)';
        c.beginPath(); c.roundRect(cellW * i + 2, y0 + 2, cellW - 4, stripH - 4, 5); c.fill();
      }

      // Draw phase disk
      _drawPhaseDisk(cx, cy, r, i);

      // Outline
      c.strokeStyle = isCur ? '#fbbf24' : 'rgba(255,255,255,0.25)'; c.lineWidth = isCur ? 2 : 0.8;
      c.beginPath(); c.arc(cx, cy, r, 0, 2 * Math.PI); c.stroke();

      // Label
      c.fillStyle = isCur ? '#fbbf24' : 'rgba(255,255,255,0.5)';
      c.font = `${isCur ? '700' : '500'} 7px system-ui, sans-serif`; c.textAlign = 'center';
      const shortName = ph.name.split(' ').map((w, k) => k === 0 ? w.slice(0, 3) : w.slice(0, 3)).join(' ');
      c.fillText(shortName, cx, y0 + stripH - 3);
    }
  }

  // ── Animation loop ────────────────────────────
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop()  { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }

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
    _stepAnim(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.3) { _uiAcc = 0; _readouts(); }
  }

  function _stepAnim(dt) {
    if (_calm() || _instant) dt = 0;

    if (_spinning) {
      _earthSpin = (_earthSpin + dt * 0.08) % 1;
    }
    if (_orbiting) {
      _moonAngle = (_moonAngle + dt * 0.4) % (2 * Math.PI);
      const et = _getEclipseType();
      if (et && et !== _eclipseType) {
        _eclipseType = et;
        if (et === 'solar') { _solarSeen = true; _coach('Solar eclipse! The Moon is in front of the Sun.'); }
        if (et === 'lunar') { _lunarSeen = true; _coach('Lunar eclipse! Earth\'s shadow covers the Moon.'); }
        const ph = _phaseIdx();
        _phasesVisited.add(ph);
        _after('eclipse:' + et);
        _checkFinds();
      } else if (!et) {
        _eclipseType = null;
      }
      // Phase changes
      const ph = _phaseIdx();
      if (!_phasesVisited.has(ph)) {
        _phasesVisited.add(ph);
        _guideEvent('phase:' + ph);
        _checkFinds();
      }
    }
  }

  // ── Test hooks ────────────────────────────────
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _stepAnim(0.05); _readouts(); }
  function _debug() {
    return {
      grade: _g(), spinning: _spinning, orbiting: _orbiting, stickOn: _stickOn,
      moonAngle: +_moonAngle.toFixed(3), earthSpin: +_earthSpin.toFixed(3),
      phase: _phaseName(), eclipseType: _eclipseType,
      phasesVisited: [..._phasesVisited], solarSeen: _solarSeen, lunarSeen: _lunarSeen,
      panel: _panel, looping: !!_raf, talking: _talking,
      guide: _guide && { id: _guide.id, step: _guide.step },
      mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success },
    };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabSunmoon = LabSunmoon;
