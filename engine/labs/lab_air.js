'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Air & Burning (Science, PSAC Grades 4 and 6)
//
//  Grade 4: a candle under jars of three sizes, a glass pushed into water, a
//  balloon balance. Grade 6: candles P, Q, R and S with an oxygen reading, a
//  fire safety yard (the fire triangle; oil and electrical fires), and what
//  burning makes (a misty cold jar, limewater). The grade comes from
//  Labs.grade(); a lab only ever shows that grade's stations, guides,
//  missions and discoveries (docs/labs/LAB_SPEC.md §9).
//
//  ⚠ Every result, time, reading, hazard and question comes from
//    lab_air_data.js (LabAirData) - including the rules themselves:
//    LabAirData.apply(state, token, grade) runs one action and this file only
//    animates what it returns. If a result looks wrong, fix the DATA.
//  ⚠ Reading level of a 9-11-year-old: 🔊 read-aloud on the lab assistant and
//    on the guide box. Speech NEVER auto-plays and is cancelled on every step
//    change, overlay, unmount and screen change.
//  ⚠ Only the <canvas> animates. Nothing here transforms .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: an action shows its end state at once.
//  ⚠ Leaving the Labs screen stops speech and the loop; coming back restarts
//    the loop (a MutationObserver on the screen - the Rusting Lab pattern).
// ══════════════════════════════════════════════
const LabAir = (() => {
  const D = () => LabAirData;
  const LAB = 'air';
  const FRAME_MS = 1000 / 30;
  const DUR = { blow: 0.9, push: 1.1, tilt: 1.3, bottle: 1.2, fill: 1.0, letout: 1.3, ignite: 0.7, method: 1.4, crack: 0.9,
                hold: 1.3, lime: 1.3, control: 1.0, peek: 0.8 };
  const FX_DUR = { flare: 0.8, flash: 0.6, crack: 0.8, fireball: 0.8, zap: 0.8 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0, _obs = null;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _st = null, _stGrade = null, _panel = 'sandbox', _mission = null, _guide = null;
  let _scene = null, _pending = null, _busy = false, _instant = false, _fx = [];
  let _runs = [], _log = [], _view = {}, _verdict = '', _verdictBad = false, _watch = 0, _tipIdx = -1, _talking = false;

  // The grade the lab is used at (Labs.grade(): Grade 5 arrives here as 4).
  const _g = () => { const g = typeof Labs.grade === 'function' ? Number(Labs.grade()) : 0; return D().GRADES.includes(g) ? g : D().GRADES[0]; };
  const _forGrade = list => D().forGrade(list, _g());
  const _still = () => _instant || Labs.calm() || !_cx;
  const _durOf = a => a.type === 'burn' ? Math.max(1, a.sim / D().SPEED) : (DUR[a.type] || 0);
  const _S = () => D().station(_st.station);

  function _fresh() {
    _st = D().newState(_g()); _stGrade = _g();
    _runs = []; _log = []; _view = {}; _verdict = ''; _verdictBad = false; _watch = 0;
    _mission = null; _guide = null; _scene = null; _pending = null; _busy = false; _fx = [];
  }

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-air">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade ${esc(_g())}</span><h1>Air &amp; Burning</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-air-safety" id="lab-air-safety"></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How Air and Burning works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-air-zone">
            <canvas id="lab-air-canvas" role="img" aria-label="A candle on a table"></canvas>
            <div class="lab-air-tl">
              <div class="lab-chip lab-air-chip" id="lab-air-chip"></div>
              <div class="lab-air-status" id="lab-air-status"></div>
            </div>
            <div class="lab-air-verdict" id="lab-air-verdict" aria-live="polite" hidden></div>
            <div class="lab-contents" id="lab-air-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="say-coach" aria-label="Read this out loud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-air-controls" class="lab-air-controls"></div>
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
    if (!_st || _stGrade !== _g()) _fresh();
    if (_busy && _pending) { const p = _pending; _pending = null; _busy = false; if (_scene) _scene.t = 1; _outcome(p.r, p.tok); }
    root.innerHTML = _shellHTML();
    _cv = $('lab-air-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderTop();
    _renderPanel();
    _renderControls();
    _readouts();
    const st = Labs.store(LAB);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission. Carry on!');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick an experiment or a mission. Or explore on your own.'
      : '👋 New here? Pick a guided experiment below. I will show you what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
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
    if (_busy && _pending) { const p = _pending; _pending = null; _busy = false; if (_scene) _scene.t = 1; if (p.r.anim && p.r.anim.type === 'burn') D().settle(_st); }
    _fx = [];
    _root = null; _cv = null; _cx = null;
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(360, Math.max(250, w * 0.7)));
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
      const t = e.target.closest('[data-tok]');
      if (t) { act(t.dataset.tok); _showStage(t); return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
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
  // On a phone the controls sit below the picture: bring the picture back into view.
  function _showStage(el) {
    if (!el || !el.closest('#lab-air-controls')) return;
    const z = $('lab-air-zone');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(a) {
    switch (a) {
      case 'hub': Labs.backToHub(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) speak(el.textContent); break; }
      case 'say-guide': { const el = _root && _root.querySelector('#lab-guide .lab-guide-say'); if (el) speak(el.textContent); break; }
      case 'quiz': _quiz(); break;
      case 'clear': _runs = []; _log = []; D().newSeries(_st); _refresh(); _coach('Notebook cleared. Start a new set of tests!'); break;
      case 'exit-mission': _mission = null; _coach('Back to exploring. Try anything you like.'); _renderPanel(); _renderControls(); break;
      case 'guide-stop': _stopGuide(false); break;
    }
  }

  // ══ Read aloud (never auto-plays) ═════════════
  const _synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  // Emoji and arrows are read out as their names ("candle", "right arrow").
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
    const ss = _synth();
    const t = _plain(text);
    if (!ss || !t || typeof SpeechSynthesisUtterance === 'undefined') return false;
    _hush();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-GB'; u.rate = 0.95;
    const v = _voice();
    if (v) { try { u.voice = v; } catch (e) {} }
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    ss.speak(u);
    return true;
  }
  // Cancel only when something is speaking - cancel-then-speak stalls Chrome.
  function _hush() {
    const ss = _synth();
    if (!ss) return;
    if (_talking || ss.speaking || ss.pending) { try { ss.cancel(); } catch (e) {} }
    _talking = false;
  }
  // Every overlay goes through here, so speech never talks over a card.
  function _ov(fn) { _hush(); return fn(); }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el || !text) return;
    if (el.textContent !== text) _hush();
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = _forGrade(D().FACTS);
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx].t);
  }

  // ══ Actions: every control is a token for LabAirData.apply ══
  function act(tok) {
    if (!_st || !_root) return false;
    if (tok === 'peek') return _peek();
    if (_busy) { _coach('One thing at a time. Watch this first!'); return false; }
    const r = D().apply(_st, tok, _g());
    if (!r.ok) { if (r.say) _coach(r.say); _renderTop(); _renderControls(); _readouts(); return false; }
    const dur = r.anim ? _durOf(r.anim) : 0;
    if (r.anim) _scene = Object.assign({ station: _st.station, t: 0, dur }, r.anim);
    if (r.anim && dur && !_still()) {
      _busy = true; _pending = { r, tok };
      _verdict = ''; _verdictBad = false;
      if (r.anim.type === 'burn') _coach(r.anim.covered ? 'The jar is on. Watch the flame…' : 'Timing the open candle. Watch the flame…');
      _afterChange();
      return true;
    }
    if (_scene && r.anim) _scene.t = 1;
    _outcome(r, tok);
    return true;
  }
  // Lifting the jar while the candle is still burning under it.
  function _peek() {
    if (!_busy || !_scene || _scene.type !== 'burn' || !_scene.covered || _scene.t >= 1) return false;
    const r = D().apply(_st, 'peek', _g());
    if (!r.ok) return false;
    _pending = null; _busy = false; _watch = 0;
    _scene = { station: 'jars', type: 'peek', t: _still() ? 1 : 0, dur: DUR.peek };
    _outcome(r, 'peek');
    return true;
  }

  function _verdictFor(r) {
    if (r.hazard) return '⚠ Stop!';
    const a = r.anim || {};
    switch (a.type) {
      case 'burn': return a.covered ? `Out at ${r.events[0].measured} s` : 'Still burning';
      case 'blow': return 'Out!';
      case 'push': return 'Tissue dry';
      case 'tilt': return 'Tissue wet';
      case 'bottle': return 'Bubbles!';
      case 'fill': return 'Level';
      case 'letout': return 'Full side down';
      case 'ignite': return '🔥 Burning';
      case 'method': return a.out ? 'Fire out' : 'Still burning';
      case 'hold': return a.warm ? 'No mist' : 'Misty!';
      case 'lime': return 'Milky!';
      case 'control': return 'Clear';
    }
    if (r.result === 'peek') return 'Flame back';
    return '';
  }

  // The end of every action: repaint, log, discover, and any card.
  function _outcome(r, tok) {
    const g = _g();
    if (r.anim && r.anim.type === 'burn') D().settle(_st);
    _coach(r.say);
    _verdict = _verdictFor(r);
    _verdictBad = !!(r.hazard || r.result);
    const a = r.anim && r.anim.type;
    if (a === 'hold') _view.mist = !r.anim.warm;
    if (a === 'lime') _view.lime = true;
    if (a === 'control') _view.control = true;
    if (a === 'ignite') _view.cover = false;
    if (a === 'method') _view.cover = r.anim.method === 'blanket' && !!r.anim.out;
    r.events.forEach(ev => {
      if (ev.kind === 'run') {
        _watch = ev.measured;
        _runs.push({ jar: ev.jar, candle: ev.candle, measured: ev.measured, covered: ev.covered, good: ev.good, fair: ev.fair, o2: ev.o2End });
        _logEntry({ title: `${D().jarName(ev.jar, g)} · ${D().CANDLES[ev.candle].name.toLowerCase()}`, obs: r.say, bad: !ev.good || !ev.fair });
      } else _logEntry({ title: D().stepText(tok, g, _st).btn, obs: r.say });
      if (_mission) { const k = D().keyOf(ev); if (k) _mission.keys.add(k); }
      _checkDisc(ev);
    });
    if (_mission) _missionCheck();
    if (r.hazard) _hazard(r.hazard, r.ctx || {}, !!(r.anim && r.anim.type !== 'light'));
    else if (r.result) {
      if (_mission) _mission.mistakes++;
      _resultCard(r.result, r.ctx || {});
    }
    _afterChange();
    if (!r.hazard && !r.result) _guideEvent(tok);
  }

  // Everything a pupil does ends here: repaint.
  function _afterChange() {
    _renderTop();
    _renderControls();
    _readouts();
    _refresh();
  }

  // ══ Discoveries (data-driven: LabAirData.DISCOVERIES + unlocks) ══
  function _checkDisc(ev) {
    _forGrade(D().DISCOVERIES).forEach(d => { if (D().unlocks(d.unlock, ev)) _discover(d.id); });
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const all = _forGrade(D().DISCOVERIES);
    const d = all.find(x => x.id === id);
    if (d && Labs.discover(LAB, id, { title: d.title, total: all.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const all = _forGrade(D().DISCOVERIES), disc = Labs.store(LAB).disc;
    n.textContent = `${all.filter(d => disc[d.id]).length}/${all.length}`;
  }

  // ══ Hazards and "what went wrong" cards ══════
  // `animated`: the canvas already showed the consequence (a cracked jar, a fireball).
  function _hazard(id, ctx, animated) {
    const H = D().HAZARDS[id];
    const st = Labs.store(LAB);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _logEntry({ title: `⚠ ${H.title(ctx)}`, bad: true, obs: H.happened(ctx) });
    const show = () => {
      _busy = false;
      _ov(() => Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: 'Got it - stay safe',
        onClose: () => { _coach(H.after); _afterChange(); } }));
    };
    const fx = H.fx || 'flash';
    if (!animated && !_still()) { _busy = true; _fx.push({ type: fx, t: 0, dur: FX_DUR[fx] || 0.6, done: show }); }
    else show();
  }
  function _resultCard(id, ctx) {
    const R = D().RESULTS[id];
    _logEntry({ title: `${R.icon} ${R.title(ctx)}`, bad: true, obs: R.happened(ctx) });
    _ov(() => Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead, exam: R.exam,
      button: 'Got it', onClose: () => _coach(R.instead) }));
  }

  // ══ Missions ═════════════════════════════════
  const _M = id => _forGrade(D().MISSIONS).find(x => x.id === id);
  function startMission(id) {
    const M = _M(id);
    if (!M || _busy) return;
    _stopGuide(true);
    _mission = { id, keys: new Set(), hazards: 0, mistakes: 0, success: false };
    D().newSeries(_st);
    if (M.station && _st.station !== M.station) D().apply(_st, 'station:' + M.station, _g());
    _panel = 'missions';
    _coach(M.intro);
    _afterChange();
    _renderPanel();
  }
  function _missionCheck() {
    const ms = _mission;
    if (!ms || ms.success) return;
    if (D().missionProgress(_M(ms.id), ms.keys).done) {
      ms.success = true;
      _coach('🎯 Mission done! Tap “Answer the questions” to finish.');
    }
  }
  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = _M(ms.id);
    _ov(() => Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.mistakes) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(LAB);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.hazards ? `${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'}. Stay safe for an extra star.` : 'No safety mistakes. 👍');
      lines.push(ms.mistakes ? `${ms.mistakes} test${ms.mistakes === 1 ? '' : 's'} went wrong. Test carefully for an extra star.` : 'Every test was done right. 🧪');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      _ov(() => Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _renderControls(); _coach('Mission saved! Try another mission, or hunt for discoveries.'); } }));
    } }));
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box, and
  // makes the same control glow. A guide is one of GUIDES, or one built from a
  // discovery's recipe. Steps already true on the bench are skipped
  // (LabAirData.satisfied).
  const _gdef = () => _guide && (_guide.def || _forGrade(D().GUIDES).find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _forGrade(D().GUIDES).find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _renderControls();
    _readouts();
    _guideEnter();
    const z = $('lab-air-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    _hush();
    let s = G.steps[_guide.step];
    while (s && D().satisfied(_st, s)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step, txt = D().stepText(s, _g(), _st);
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <div class="lab-air-sayrow"><p class="lab-guide-say">${esc(txt.say)}</p>
          <button type="button" class="lab-coach-tip" data-act="say-guide" aria-label="Read this step out loud">🔊</button></div>
        <button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(txt.btn)}</button>
        <button type="button" class="lab-link" data-act="guide-stop">Stop the guide</button>`;
      box.hidden = false;
    }
    _highlight();
  }

  function _guideEvent(tok) {
    const G = _gdef();
    if (!G) return;
    if (G.steps[_guide.step] === tok) { _guide.step++; _guideEnter(); }
    else _highlight();
  }

  // The guide's button always completes its step: it first puts right
  // whatever the pupil changed meanwhile (a jar still on, an unlit candle).
  function _guideDo() {
    const G = _gdef();
    if (!G || _busy) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const k = s.split(':')[0];
    const where = D().TOK_STATION[k];
    if (where && !where.includes(_st.station)) act('station:' + where[0]);
    const needFlame = () => { if (_st.jarOn) act('reset'); if (!_st.lit) { if (!_st.safety) act('safety:on'); act('light'); } };
    if (k === 'burn') { needFlame(); if (_st.watch !== 'ready') act('watch:ready'); }
    if (k === 'light' && !_st.safety) act('safety:on');
    if (k === 'blow') needFlame();
    if (k === 'hold' || k === 'lime') { needFlame(); if (k === 'hold' && _st.jartemp !== 'cold') act('jartemp:cold'); }
    if (k === 'letout' && _st.balloons !== 'full') act('fill');
    act(s);
  }

  // ── Discoveries: every card opens ─────────────
  function discoveryGuide(id) {
    const d = _forGrade(D().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.slice() });
  }

  function _discDetail(id) {
    const d = _forGrade(D().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store(LAB).disc[id];
    if (!found) {
      _ov(() => Labs.overlay(`
        <div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(d.hint)}</h2>
          <section class="lab-hz-sec is-do lab-done-lesson"><h3>How to find it</h3>
            <ol class="lab-disc-steps">${D().recipeTexts(d.how, _g()).map(t => `<li>${esc(t.say)}</li>`).join('')}</ol></section>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Show me how →</button>
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
        <section class="lab-hz-sec"><h3>The rule</h3><p class="lab-eq">${esc(d.rule)}</p></section>
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' }));
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store(LAB);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _forGrade(D().GUIDES).find(g => !st.guides[g.id]);
    _ov(() => Labs.overlay(`
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
      </div>`, { cls: 'is-done' }));
    _coach(`Well done: ${G.title}! Pick the next one, try a mission, or explore.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    _hush();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment, or explore freely.');
  }

  // The yellow glow on whatever the current guide step wants tapped.
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const where = D().TOK_STATION[s.split(':')[0]];
    const sel = where && !where.includes(_st.station) ? `[data-tok="station:${where[0]}"]` : `[data-tok="${s}"]`;
    const el = _root.querySelector(sel);
    if (el) el.classList.add('is-next');
  }

  // ══ Panels ═══════════════════════════════════
  function _startHTML() {
    const st = Labs.store(LAB);
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
        <li><b>Pick</b> an experiment. Start here!</li>
        <li><b>Follow the yellow box.</b> The thing to tap glows yellow.</li>
        <li><b>Watch</b> what happens. Your results go in the notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>step by step</small></h3>
      <div class="lab-start-list">${_forGrade(D().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>questions · earn stars</small></h3>
      <div class="lab-start-list">${_forGrade(D().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or explore freely: pick a test under the picture.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.closest('.lab-tabs')) b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _notebookHTML();
    _foundCount();
    _highlight();
  }

  // Repaint what changes while testing, without rebuilding under a finger.
  function _refresh() {
    ['lab-notebook', 'lab-mission'].forEach(id => {
      const el = $(id);
      if (el) el.outerHTML = id === 'lab-notebook' ? _notebookHTML() : _missionHTML();
    });
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }

  function _notebookHTML() {
    const g = _g();
    const rows = _runs.slice(-10);
    const tbl = rows.length ? `<div class="lab-table-wrap"><table class="lab-table lab-air-table">
      <caption>My candle timings</caption>
      <thead><tr><th scope="col">Jar</th><th scope="col">Candle</th><th scope="col">Time</th>${g === 6 ? '<th scope="col">Oxygen at the end</th>' : ''}<th scope="col">Check</th></tr></thead>
      <tbody>${rows.map(r => `<tr><th scope="row">${esc(D().jarName(r.jar, g))}</th><td>${esc(D().CANDLES[r.candle].name)}</td>
        <td>${r.covered ? `${r.measured} s` : `over ${r.measured} s`}</td>${g === 6 ? `<td>${r.covered ? `about ${r.o2}%` : `${r.o2}%`}</td>` : ''}
        <td${!r.good || !r.fair ? ' class="is-bad"' : ''}>${!r.good ? 'started late' : !r.fair ? 'not fair' : '✓'}</td></tr>`).join('')}</tbody></table></div>
      <p class="lab-fair">⚖️ Fair test: change only the jar, keep the same candle. <button type="button" class="lab-link" data-act="clear">Clear notebook</button></p>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 12).map(e => `<li class="${e.bad ? 'lab-air-log-bad' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">Your results appear here as you test.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${tbl}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store(LAB);
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Do the tests, answer the questions, earn up to three stars.</p>
      ${_forGrade(D().MISSIONS).map(M => {
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
    const M = _M(ms.id);
    const p = D().missionProgress(M, ms.keys);
    const runs = M.reqs.some(r => r.key.startsWith('run:'));
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <ul class="lab-steps">${p.rows.map(r => `<li class="${r.done ? 'is-done' : ''}">${esc(r.label)}</li>`).join('')}
        <li>Answer the questions</li></ul>
      <p class="lab-progress-text">${runs ? 'Use the same candle every time. Get the stopwatch ready before each jar.' : 'Use the buttons under the picture.'}</p>
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store(LAB);
    const all = _forGrade(D().DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  // ── The safety toggle in the top bar ──────────
  function _renderTop() {
    const b = $('lab-air-safety');
    if (!b || !_st) return;
    b.dataset.tok = _st.safety ? 'safety:off' : 'safety:on';
    b.setAttribute('aria-pressed', String(!!_st.safety));
    b.setAttribute('aria-label', _st.safety ? 'Hair tied back and sleeves rolled up. Tap to undo.' : 'Tie your hair back and roll up your sleeves');
    b.textContent = _st.safety ? '🎀 Hair tied' : '🎀 Tie hair';
  }

  // ── Controls under the picture ────────────────
  const _btn = (tok, label, cls) => `<button type="button" class="lab-btn ${cls || ''}" data-tok="${esc(tok)}">${esc(label)}</button>`;
  const _lbl = tok => D().stepText(tok, _g(), _st).btn;
  function _renderControls() {
    const c = $('lab-air-controls');
    if (!c || !_st) return;
    const g = _g(), S = _S();
    const opt = (tok, label, small, on) => `<button type="button" class="lab-air-opt" data-tok="${esc(tok)}" aria-pressed="${!!on}">${esc(label)}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
    let body = '';
    if (S.id === 'jars') {
      const running = _busy && _scene && _scene.type === 'burn' && _scene.covered;
      const acts = [
        _btn('light', _st.lit ? '🕯️ The candle is lit' : _lbl('light')),
        _btn('watch:ready', _st.watch === 'ready' ? '⏱ Stopwatch ready ✓' : '⏱ Get the stopwatch ready'),
        _btn('burn', _lbl('burn'), 'lab-btn-primary'),
      ];
      if (g === 4) acts.push(_btn('blow', _lbl('blow')));
      if (running) acts.push(_btn('peek', '👀 Lift the jar a little', 'lab-air-risky'));
      if (_st.jarOn) acts.push(_btn('reset', _lbl('reset'), 'lab-btn-primary'), _btn('lift', '✋ Lift it now', 'lab-air-risky'), _btn('tap', '🚿 Cool it under the cold tap', 'lab-air-risky'));
      body = `<p class="lab-air-label">Jar</p>
        <div class="lab-air-pick" role="group" aria-label="Choose a jar">${D().JAR_ORDER.map(id => {
          const J = D().JARS[id];
          return opt(`jar:${id}`, g === 6 ? (id === 'none' ? 'No jar (S)' : `Jar ${J.letter}`) : J.name, J.ml ? `${J.ml} mL` : 'open air', _st.jar === id);
        }).join('')}</div>
        <p class="lab-air-label">Candle</p>
        <div class="lab-air-pick" role="group" aria-label="Choose a candle">${Object.values(D().CANDLES).map(C => opt(`candle:${C.id}`, C.name, C.flame, _st.candle === C.id)).join('')}</div>
        <div class="lab-air-acts">${acts.join('')}</div>`;
    } else if (S.id === 'space') {
      body = `<div class="lab-air-acts">${['push', 'tilt', 'bottle'].map(t => _btn(t, _lbl(t))).join('')}</div>`;
    } else if (S.id === 'weight') {
      body = `<div class="lab-air-acts">${['fill', 'letout'].map(t => _btn(t, _lbl(t))).join('')}</div>`;
    } else if (S.id === 'fire') {
      body = `<p class="lab-air-label">Fire</p>
        <div class="lab-air-pick" role="group" aria-label="Choose a fire">${Object.values(D().FIRES).map(F => opt(`fire:${F.id}`, `${F.icon} ${F.name}`, '', _st.fire === F.id && !_st.fireOut)).join('')}</div>
        <p class="lab-air-label">Put it out with…</p>
        <div class="lab-air-acts">${Object.keys(D().METHODS).map(m => _btn(`method:${m}`, _lbl(`method:${m}`))).join('')}</div>`;
    } else if (S.id === 'products') {
      body = `<p class="lab-air-label">The jar</p>
        <div class="lab-air-pick" role="group" aria-label="Cold or warm jar">${['cold', 'warm'].map(v => opt(`jartemp:${v}`, _lbl(`jartemp:${v}`), '', _st.jartemp === v)).join('')}</div>
        <div class="lab-air-acts">${[_btn('light', _st.lit ? '🕯️ The candle is lit' : _lbl('light')), _btn('hold', _lbl('hold'), 'lab-btn-primary'),
          _btn('lime', _lbl('lime')), _btn('control', _lbl('control'))].join('')}</div>`;
    }
    c.innerHTML = `
      <div class="lab-air-stations" role="group" aria-label="Tests">
        ${_forGrade(D().STATIONS).map(s => `<button type="button" class="lab-air-st" data-tok="station:${s.id}" aria-pressed="${s.id === S.id}"><span aria-hidden="true">${s.icon}</span>${esc(s.name)}</button>`).join('')}
      </div>
      <p class="lab-air-ask"><b>${S.icon} ${esc(S.ask)}</b> ${esc(S.how)}</p>
      ${body}`;
    _highlight();
  }

  function _intro() {
    const first = _forGrade(D().GUIDES)[0];
    _ov(() => Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🕯️</p>
        <h2 id="lab-ov-title">Welcome to Air &amp; Burning</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will show you each tap.</li>
          <li><b>Air is real.</b> It takes up space, it has weight, and a flame needs it.</li>
          <li><b>Stay safe.</b> Tie your hair back. Only an adult lights a flame.</li>
          <li><b>Mistakes teach.</b> Some stop the test and tell you why. Nothing here can hurt you.</li>
          <li><b>Earn stars</b> in missions. There are ${_forGrade(D().DISCOVERIES).length} discoveries to find!</li>
        </ul>
        <p class="lab-hint">Tap 🔊 to hear the helper read out loud.</p>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(LAB); st.intro = true; Labs.persist();
        _coach('Pick a test under the picture. Then follow the buttons.');
      } }));
  }

  function _help() {
    const g = _g();
    const words = g === 6
      ? [['Oxygen', 'The gas in air that a flame needs. Dry air is 21% oxygen.'],
         ['Fire triangle', 'A fire needs fuel, heat and oxygen. Take one away and it goes out.'],
         ['Carbon dioxide', 'A gas that burning makes. It does not burn, so it puts fires out.'],
         ['Limewater', 'A clear liquid. It turns milky when carbon dioxide gets into it.'],
         ['Condense', 'A gas turns into drops of liquid on something cold.'],
         ['Control', 'The same test without the thing you are testing, to compare.']]
      : [['Air', 'A mixture of gases all around us. You cannot see it.'],
         ['Oxygen', 'The part of the air we breathe. A flame needs it too.'],
         ['Takes up space', 'Air fills things up, even an "empty" glass.'],
         ['Weight', 'How heavy something is. Air has weight.'],
         ['Fair test', 'You change only one thing and keep the rest the same.']];
    _ov(() => Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How Air &amp; Burning works</h2>
      <div class="lab-help">
        <section><h3>Testing</h3><ul>
          <li>Pick a test under the picture: ${_forGrade(D().STATIONS).map(s => s.icon).join(' ')}.</li>
          <li>Tap the buttons. Watch what happens in the picture.</li>
          <li>Your results go in the notebook.</li>
          <li>Tap 🔊 to hear the words read out loud.</li></ul></section>
        <section><h3>Safety rules</h3><ul>
          <li>Tie long hair back and roll up your sleeves near a flame.</li>
          <li>Only an adult lights a candle. Never leave a flame alone.</li>
          <li>A jar gets hot. Let it cool, then an adult lifts it with a cloth.</li>
          ${g === 6 ? '<li>Never use water on burning oil or an electrical fire.</li>' : ''}</ul></section>
        <section><h3>Science words</h3><ul>
          ${words.map(([w, e]) => `<li><b>${esc(w)}</b>: ${esc(e)}</li>`).join('')}</ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the lab</button></div>`,
      { cls: 'is-help' }));
  }

  // ══ Readouts ═════════════════════════════════
  function _watchNow() {
    const sc = _scene;
    if (_busy && sc && sc.type === 'burn') return Math.floor(Math.max(0, sc.t * sc.sim - sc.late));
    return _watch;
  }
  function _o2Now() {
    const sc = _scene;
    if (_busy && sc && sc.type === 'burn' && sc.covered) return D().o2At(sc.t);
    return _st.jarOn ? D().O2_OUT : D().O2_AIR;
  }
  function _readouts() {
    if (!_root || !_st) return;
    const g = _g(), S = _S();
    const chip = $('lab-air-chip');
    if (chip) chip.innerHTML = `${S.icon} ${esc(S.name)}`;
    const st = $('lab-air-status');
    if (st) {
      const chips = [];
      if ((S.id === 'jars' || S.id === 'products') && !_st.safety) chips.push('<span class="lab-chip is-warm">⚠ Hair loose</span>');
      if (S.id === 'jars') {
        chips.push(`<span class="lab-chip">⏱ ${_watchNow()} s</span>`);
        if (g === 6) chips.push(`<span class="lab-chip">O₂ ${_o2Now()}%</span>`);
      }
      st.innerHTML = chips.join('');
    }
    const vd = $('lab-air-verdict');
    if (vd) { vd.textContent = _verdict; vd.hidden = !_verdict; vd.classList.toggle('is-bad', _verdictBad); }
    const c = $('lab-air-contents');
    let line = '';
    if (S.id === 'jars') line = `${D().jarName(_st.jar, g)} · ${D().CANDLES[_st.candle].name.toLowerCase()}${_st.lit ? ' · lit' : ''}`;
    else if (S.id === 'fire') line = _st.fire ? `${D().FIRES[_st.fire].name}${_st.fireOut ? ': out' : ': burning'}` : 'Ask the firefighter for a fire.';
    else if (S.id === 'products') line = `${_st.jartemp === 'cold' ? 'Cold' : 'Warm'} jar${_st.lit ? ' · candle lit' : ''}`;
    if (c) c.textContent = line;
    if (_cv) _cv.setAttribute('aria-label', `${S.name}${line ? `: ${line}` : ''}${_verdict ? `. ${_verdict}` : ''}`);
  }

  // ══ Drawing ══════════════════════════════════
  const ease = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  const seg = (t, a, b) => ease((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;
  const _k = () => Math.max(0.7, Math.min(1.3, _H / 280));
  const _hash = i => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };

  function _draw(dt) {
    if (!_cx || !_st) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    const sc = _scene && _scene.station === _st.station ? _scene : null;
    switch (_st.station) {
      case 'jars': _drawJars(sc); break;
      case 'space': _drawSpace(sc); break;
      case 'weight': _drawWeight(sc); break;
      case 'fire': _drawFire(sc); break;
      case 'products': _drawProducts(sc); break;
    }
    _drawFx(dt);
    c.restore();
  }

  function _room(top, bot) {
    const g = _cx.createLinearGradient(0, 0, 0, _H);
    g.addColorStop(0, top || '#EEF3F4'); g.addColorStop(1, bot || '#DCE6E5');
    _cx.fillStyle = g; _cx.fillRect(0, 0, _W, _H);
  }
  function _table(y) {
    const c = _cx;
    c.fillStyle = '#C9A57A'; c.fillRect(0, y, _W, _H - y);
    c.fillStyle = '#A9835A'; c.fillRect(0, y, _W, 4);
  }
  function _text(t, x, y, o = {}) {
    const c = _cx;
    c.fillStyle = o.color || '#4B5563'; c.font = `${o.w || 700} ${Math.round((o.size || 11) * _k())}px system-ui, sans-serif`;
    c.textAlign = o.align || 'center'; c.textBaseline = 'alphabetic'; c.fillText(t, x, y);
  }
  function _flame(x, y, k, big, scale) {
    if (k <= 0.02) return;
    const c = _cx, h = (big ? 40 : 28) * _k() * k * (scale || 1), w = h * 0.42;
    const f = _still() ? 1 : 1 + 0.07 * Math.sin(_clock * 19) + 0.04 * Math.sin(_clock * 31 + 1);
    const top = y - h * f;
    const glow = c.createRadialGradient(x, y - h * 0.45, 1, x, y - h * 0.45, h * 1.2);
    glow.addColorStop(0, `rgba(255,210,90,${0.35 * Math.min(1, k)})`); glow.addColorStop(1, 'rgba(255,210,90,0)');
    c.fillStyle = glow; c.beginPath(); c.arc(x, y - h * 0.45, h * 1.2, 0, Math.PI * 2); c.fill();
    const g = c.createLinearGradient(x, top, x, y);
    g.addColorStop(0, '#FFF3B0'); g.addColorStop(0.55, '#FFB22E'); g.addColorStop(1, '#FF7A1A');
    c.fillStyle = g;
    c.beginPath(); c.moveTo(x, top); c.quadraticCurveTo(x + w, y - h * 0.35, x, y); c.quadraticCurveTo(x - w, y - h * 0.35, x, top); c.fill();
    c.fillStyle = 'rgba(70,120,255,0.55)'; c.beginPath(); c.ellipse(x, y - h * 0.12, w * 0.28, h * 0.12, 0, 0, Math.PI * 2); c.fill();
  }
  // A candle standing on `baseY`. Returns the top of the wick.
  function _candle(x, baseY, big) {
    const c = _cx, s = _k(), w = (big ? 30 : 16) * s, h = (big ? 44 : 40) * s;
    c.fillStyle = '#F5E9CF'; c.strokeStyle = '#C9B894'; c.lineWidth = 1.5;
    c.fillRect(x - w / 2, baseY - h, w, h); c.strokeRect(x - w / 2, baseY - h, w, h);
    c.strokeStyle = '#333'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, baseY - h); c.lineTo(x, baseY - h - 6 * s); c.stroke();
    return baseY - h - 5 * s;
  }
  function _smoke(x, y, a) {
    const c = _cx, s = _k();
    c.strokeStyle = `rgba(120,120,120,${0.5 * a})`; c.lineWidth = 2; c.lineCap = 'round';
    const drift = _still() ? 0 : Math.sin(_clock * 2) * 3;
    for (let i = 0; i < 2; i++) {
      c.beginPath(); c.moveTo(x, y);
      c.bezierCurveTo(x + 8 * s + drift, y - 12 * s, x - 8 * s, y - 24 * s, x + 4 * s + drift + i * 5, y - 38 * s);
      c.stroke();
    }
  }
  // An upside-down jar standing on `bottomY` (its open end).
  function _jar(x, bottomY, ml, o = {}) {
    const c = _cx, s = _k(), w = 44 * s * Math.cbrt(ml / 250), h = w * 1.3, top = bottomY - h, r = 10 * s;
    c.save();
    c.fillStyle = o.mist ? 'rgba(235,244,248,0.75)' : 'rgba(190,225,240,0.22)';
    c.beginPath(); c.moveTo(x - w / 2, bottomY); c.lineTo(x - w / 2, top + r); c.quadraticCurveTo(x - w / 2, top, x - w / 2 + r, top);
    c.lineTo(x + w / 2 - r, top); c.quadraticCurveTo(x + w / 2, top, x + w / 2, top + r); c.lineTo(x + w / 2, bottomY);
    c.fill();
    c.strokeStyle = o.hot ? '#E0762B' : '#6F9FB3'; c.lineWidth = o.hot ? 3.5 : 2.5; c.stroke();
    c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(x - w / 2 + 6 * s, top + 14 * s); c.lineTo(x - w / 2 + 6 * s, bottomY - 8 * s); c.stroke();
    if (o.mist) {
      c.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 26; i++) { c.beginPath(); c.arc(x - w / 2 + 5 + _hash(i) * (w - 10), top + 5 + _hash(i + 50) * h * 0.55, 1.2 + _hash(i + 9) * 1.4, 0, Math.PI * 2); c.fill(); }
    }
    if (o.hot) _text('HOT', x, top - 4 * s, { color: '#C2410C', size: 10, w: 800 });
    c.restore();
    return { w, h, top };
  }
  function _stopwatch(x, y, val) {
    const c = _cx, s = _k(), r = 17 * s;
    c.fillStyle = '#374151'; c.fillRect(x - 3 * s, y - r - 7 * s, 6 * s, 6 * s);
    c.fillStyle = '#FFFFFF'; c.strokeStyle = '#374151'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
    const a = ((val % 60) / 60) * Math.PI * 2 - Math.PI / 2;
    c.strokeStyle = '#DC2626'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8); c.stroke();
    _text(`${val} s`, x, y + r + 14 * s, { color: '#1F2937', size: 12, w: 800 });
  }

  function _drawJars(sc) {
    const c = _cx, s = _k();
    _room();
    const tableY = _H * 0.84, cx = _W * 0.5, big = _st.candle === 'big';
    const J = D().JARS[_st.jar];
    let k = _st.lit ? 1 : 0, jarDy = null, smoke = 0, hot = _st.hot;
    if (sc && sc.type === 'burn') {
      const t = sc.t;
      if (sc.covered) {
        const land = 0.12;
        jarDy = lerp(_H * 0.6, 0, seg(t, 0, land));
        const f = Math.max(0, (t - land) / (1 - land));
        k = f < 0.6 ? 1 : Math.max(0, 1 - (f - 0.6) / 0.4);
        if (t >= 1) { k = 0; smoke = 1; } else hot = false;
      } else k = 1;
    } else if (sc && sc.type === 'blow') { k = 1 - seg(sc.t, 0.25, 0.8); smoke = seg(sc.t, 0.6, 1); }
    else if (sc && sc.type === 'peek' && sc.t < 1) { jarDy = lerp(16 * s, _H * 0.6, seg(sc.t, 0.5, 1)); k = lerp(0.35, 1, seg(sc.t, 0, 0.6)); }
    if (_st.jarOn && jarDy === null) { jarDy = 0; smoke = 0.6; }
    _table(tableY);
    const wickY = _candle(cx, tableY, big);
    const lean = sc && sc.type === 'blow' && !_still() ? 7 * s * seg(sc.t, 0, 0.4) : 0;
    _flame(cx + lean, wickY + 2, k, big);
    if (smoke) _smoke(cx, wickY, smoke);
    if (sc && sc.type === 'blow' && sc.t < 0.7) {
      c.strokeStyle = 'rgba(96,140,190,0.7)'; c.lineWidth = 2; c.lineCap = 'round';
      for (let i = 0; i < 3; i++) { const y = wickY - 10 * s + i * 8 * s, x0 = cx - 70 * s + sc.t * 40 * s; c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 + 26 * s, y); c.stroke(); }
    }
    if (sc && sc.type === 'crack' && sc.t < 1) {
      const p = sc.t;
      c.fillStyle = 'rgba(170,215,232,0.95)'; c.strokeStyle = '#5E9FB8'; c.lineWidth = 1;
      for (let i = 0; i < 7; i++) { const px = cx + (i - 3) * 14 * s * (1 + p), py = tableY - 60 * s + p * 55 * s + i * 2; c.beginPath(); c.moveTo(px, py - 6); c.lineTo(px + 7, py + 4); c.lineTo(px - 6, py + 5); c.closePath(); c.fill(); c.stroke(); }
    }
    if (J.ml) {
      if (jarDy !== null) _jar(cx, tableY - jarDy, J.ml, { hot });
      else { _jar(_W * 0.82, tableY, J.ml, {}); _text(`${J.ml} mL`, _W * 0.82, tableY + 16 * s, { size: 11 }); }
    }
    _stopwatch(_W * 0.14, _H * 0.62, _watchNow());
  }

  function _drawSpace(sc) {
    const c = _cx, s = _k();
    _room();
    const L = _W * 0.1, R = _W * 0.9, top = _H * 0.4, bot = _H * 0.93;
    c.fillStyle = 'rgba(64,150,210,0.35)'; c.fillRect(L, top, R - L, bot - top);
    c.strokeStyle = '#7FA7B8'; c.lineWidth = 3; c.beginPath(); c.moveTo(L, _H * 0.3); c.lineTo(L, bot); c.lineTo(R, bot); c.lineTo(R, _H * 0.3); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 2; c.beginPath(); c.moveTo(L + 2, top); c.lineTo(R - 2, top); c.stroke();
    // The glass, open end down, a dry tissue pressed into its top.
    const gx = _W * 0.34, gw = 54 * s, gh = 74 * s, upY = top - 14 * s, downY = bot - 10 * s;
    const p = sc && (sc.type === 'push' || sc.type === 'tilt') ? sc.t : 1;
    let by = upY, ang = 0, fillK = 0, wet = false;
    if (_st.glass === 'pushed') { by = sc && sc.type === 'push' ? lerp(upY, downY, seg(p, 0, 0.7)) : downY; fillK = 0.12 * Math.max(0, Math.min(1, (by - top) / (downY - top))); }
    else if (_st.glass === 'tilted') {
      by = downY;
      const tilting = sc && sc.type === 'tilt';
      ang = tilting ? lerp(0, 0.5, seg(p, 0, 0.45)) : 0.5;
      fillK = tilting ? lerp(0.12, 0.85, seg(p, 0.3, 1)) : 0.85;
      wet = !tilting || p > 0.6;
    }
    c.save(); c.translate(gx, by); c.rotate(ang);
    c.fillStyle = 'rgba(64,150,210,0.5)'; c.fillRect(-gw / 2, -gh * fillK, gw, gh * fillK);
    c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillRect(-gw / 2, -gh, gw, gh * (1 - fillK));
    c.fillStyle = wet ? '#9FB3C2' : '#FFFFFF'; c.strokeStyle = '#B7C4CC'; c.lineWidth = 1;
    c.fillRect(-gw / 2 + 5 * s, -gh + 4 * s, gw - 10 * s, 16 * s); c.strokeRect(-gw / 2 + 5 * s, -gh + 4 * s, gw - 10 * s, 16 * s);
    c.strokeStyle = '#5E8FA3'; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(-gw / 2, 0); c.lineTo(-gw / 2, -gh); c.lineTo(gw / 2, -gh); c.lineTo(gw / 2, 0); c.stroke();
    c.restore();
    _text(wet ? 'wet tissue' : 'dry tissue', gx, _H * 0.14, { size: 11, color: wet ? '#1D4ED8' : '#374151' });
    if (sc && sc.type === 'tilt' && p < 1 && !_still()) {
      c.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 7; i++) { const q = (p * 1.8 + i * 0.15) % 1; c.beginPath(); c.arc(gx + gw * 0.55 + Math.sin(i + q * 6) * 4, lerp(by - 6 * s, top, q), 3 + (i % 3), 0, Math.PI * 2); c.fill(); }
    }
    // The "empty" bottle, held under the water.
    const bx = _W * 0.68, bb = bot - 8 * s, bw = 30 * s, bh = 62 * s;
    const sq = sc && sc.type === 'bottle' ? Math.sin(Math.PI * seg(sc.t, 0, 0.7)) : 0;
    c.fillStyle = 'rgba(210,235,245,0.55)'; c.strokeStyle = '#4A90B8'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(bx - bw / 2, bb); c.lineTo(bx - bw / 2 + sq * 8 * s, bb - bh * 0.55); c.lineTo(bx - bw / 2, bb - bh * 0.8);
    c.lineTo(bx - 6 * s, bb - bh); c.lineTo(bx + 6 * s, bb - bh); c.lineTo(bx + bw / 2, bb - bh * 0.8); c.lineTo(bx + bw / 2 - sq * 8 * s, bb - bh * 0.55); c.lineTo(bx + bw / 2, bb); c.closePath();
    c.fill(); c.stroke();
    if (sq > 0.05 && !_still()) {
      c.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 6; i++) { const q = (sc.t * 2 + i * 0.17) % 1; c.beginPath(); c.arc(bx + Math.sin(i * 2 + q * 5) * 5, lerp(bb - bh, top, q), 3 + (i % 2), 0, Math.PI * 2); c.fill(); }
    }
    if (sc && sc.type === 'bottle' && (sc.t >= 1 || _still())) _text('bubbles!', bx, top - 8 * s, { size: 11, color: '#1D4ED8' });
    _text('water', R - 22 * s, bot - 6 * s, { size: 10 });
  }

  function _drawWeight(sc) {
    const c = _cx, s = _k();
    _room();
    const cx = _W / 2, pivotY = _H * 0.24, L = Math.min(_W * 0.74, 320 * s), full = 30 * s, flat = 9 * s;
    let rL = flat, rR = flat, ang = 0;
    const b = _st.balloons, t = sc ? sc.t : 1;
    if (b === 'full') { rL = rR = sc && sc.type === 'fill' ? lerp(flat, full, seg(t, 0, 0.8)) : full; }
    else if (b === 'one') {
      rL = full;
      rR = sc && sc.type === 'letout' ? lerp(full, flat, seg(t, 0, 0.6)) : flat;
      ang = sc && sc.type === 'letout' ? lerp(0, -0.16, seg(t, 0.4, 1)) : -0.16;
    }
    c.strokeStyle = '#6B5B45'; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, pivotY); c.stroke();
    c.save(); c.translate(cx, pivotY); c.rotate(ang);
    c.fillStyle = '#A9835A'; c.fillRect(-L / 2, -4, L, 8);
    c.restore();
    c.fillStyle = '#374151'; c.beginPath(); c.arc(cx, pivotY, 5, 0, Math.PI * 2); c.fill();
    const end = side => ({ x: cx + side * (L / 2) * Math.cos(ang), y: pivotY + side * (L / 2) * Math.sin(ang) });
    [[-1, rL, '#E0483E'], [1, rR, '#2F7FD1']].forEach(([side, r, col]) => {
      const e = end(side), sy = e.y + 22 * s;
      c.strokeStyle = '#6B5B45'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(e.x, e.y); c.lineTo(e.x, sy); c.stroke();
      c.fillStyle = col; c.beginPath(); c.ellipse(e.x, sy + r * 1.1, r * 0.85, r * 1.1, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(e.x - r * 0.3, sy + r * 0.7, r * 0.18, r * 0.3, 0, 0, Math.PI * 2); c.fill();
      _text(r > flat * 1.5 ? 'full' : 'empty', e.x, sy + r * 2.2 + 16 * s, { size: 11 });
    });
    if (b === 'one' && (!sc || sc.type !== 'letout' || t >= 1)) _text('The full side went down!', cx, _H * 0.95, { size: 12, color: '#B91C1C' });
  }

  function _fireBase(fire, cx, gy, o = {}) {
    const c = _cx, s = _k();
    if (fire === 'wood') {
      c.fillStyle = '#3F3F46'; c.fillRect(cx - 62 * s, gy - 12 * s, 124 * s, 12 * s);
      const off = o.raked || 0;
      c.fillStyle = '#7C4A21';
      c.save(); c.translate(cx - off * 90 * s, gy - 18 * s); c.rotate(-0.25); c.fillRect(-40 * s, -6 * s, 80 * s, 12 * s); c.restore();
      c.save(); c.translate(cx + off * 90 * s, gy - 18 * s); c.rotate(0.25); c.fillRect(-40 * s, -6 * s, 80 * s, 12 * s); c.restore();
      return gy - 24 * s;
    }
    if (fire === 'oil') {
      c.fillStyle = '#9CA3AF'; c.fillRect(cx - 52 * s, gy - 42 * s, 104 * s, 42 * s);
      c.fillStyle = o.stoveOff ? '#6B7280' : '#DC2626'; c.beginPath(); c.arc(cx + 36 * s, gy - 20 * s, 6 * s, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#1F2937'; c.fillRect(cx - 44 * s, gy - 56 * s, 88 * s, 14 * s); c.fillRect(cx + 44 * s, gy - 52 * s, 34 * s, 5 * s);
      if (o.stoveOff) _text('OFF', cx + 36 * s, gy - 4 * s, { size: 10, color: '#111' });
      return gy - 56 * s;
    }
    c.fillStyle = '#E5E7EB'; c.fillRect(cx - 80 * s, gy - 140 * s, 160 * s, 140 * s);
    c.fillStyle = '#FFFFFF'; c.strokeStyle = '#9CA3AF'; c.lineWidth = 1.5;
    c.fillRect(cx - 24 * s, gy - 100 * s, 48 * s, 48 * s); c.strokeRect(cx - 24 * s, gy - 100 * s, 48 * s, 48 * s);
    c.fillStyle = '#111827'; c.fillRect(cx - 16 * s, gy - 88 * s, 32 * s, 26 * s);
    c.strokeStyle = '#111827'; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, gy - 62 * s); c.quadraticCurveTo(cx + 10 * s, gy - 20 * s, cx + 60 * s, gy - 8 * s); c.stroke();
    c.fillStyle = o.off ? '#16A34A' : '#DC2626'; c.fillRect(cx + 40 * s, gy - 130 * s, 26 * s, 16 * s);
    _text(o.off ? 'OFF' : 'ON', cx + 53 * s, gy - 118 * s, { size: 9, color: '#FFFFFF' });
    return gy - 88 * s;
  }
  function _bigFire(x, y, k) {
    if (k <= 0.02) return;
    const s = _k();
    _flame(x - 22 * s, y + 4, k * 0.8, true);
    _flame(x + 22 * s, y + 4, k * 0.85, true);
    _flame(x, y + 2, k * 1.25, true);
  }
  function _drawFire(sc) {
    const c = _cx, s = _k();
    _room('#DDE8EF', '#C8D5DB');
    const gy = _H * 0.88, cx = _W * 0.5;
    c.fillStyle = '#A8A29E'; c.fillRect(0, gy, _W, _H - gy);
    const fire = _st.fire;
    if (!fire) { _text('Ask the firefighter for a fire.', cx, _H * 0.5, { size: 13 }); _text('👩‍🚒', cx, _H * 0.35, { size: 30 }); return; }
    const m = sc && sc.type === 'method' ? sc : null, t = sc ? sc.t : 1;
    const raked = fire === 'wood' && ((m && m.method === 'fueloff') ? seg(t, 0, 0.5) : (_st.fireOut && _view.raked ? 1 : 0));
    const top = _fireBase(fire, cx, gy, { raked, stoveOff: fire === 'oil' && m && m.method === 'fueloff', off: fire === 'elec' && _st.off });
    let k = !_st.fireOut ? 1 : 0;
    if (sc && sc.type === 'ignite') k = seg(t, 0, 1);
    else if (m) {
      if (m.hazard && fire === 'oil') k = t < 0.3 ? 1 : lerp(1, 2.8, seg(t, 0.3, 0.7)) * (1 - seg(t, 0.9, 1));
      else if (m.out) k = lerp(1, 0, seg(t, 0.35, 0.95));
      else k = 1;
    }
    _bigFire(cx, top, k);
    if (m && t < 1 && !_still()) {
      if (m.method === 'water') {
        c.fillStyle = 'rgba(59,130,246,0.85)';
        for (let i = 0; i < 12; i++) { const q = (t * 2 + i * 0.09) % 1; c.beginPath(); c.arc(cx - 70 * s + q * 70 * s + i * 3, lerp(_H * 0.1, top, q), 3, 0, Math.PI * 2); c.fill(); }
      } else if (m.method === 'co2') {
        c.fillStyle = `rgba(245,248,250,${0.8 * (1 - seg(t, 0.7, 1))})`;
        for (let i = 0; i < 9; i++) { const r = (10 + i * 3) * s * seg(t, 0, 0.6); c.beginPath(); c.arc(cx + (i - 4) * 12 * s, top - 10 * s + Math.sin(i) * 8 * s, r, 0, Math.PI * 2); c.fill(); }
      }
      if (m.hazard && fire === 'elec' && t > 0.3) { c.fillStyle = `rgba(250,204,21,${1 - t})`; c.fillRect(0, 0, _W, _H); }
    }
    const blanket = (m && m.method === 'blanket') ? seg(t, 0, 0.5) : (_st.fireOut && _view.cover ? 1 : 0);
    if (blanket > 0) {
      c.fillStyle = '#8B5E3C'; c.strokeStyle = '#5B3A22'; c.lineWidth = 2;
      const y = lerp(-60 * s, top - 30 * s, blanket);
      c.beginPath(); c.moveTo(cx - 70 * s, y + 50 * s); c.quadraticCurveTo(cx, y - 10 * s, cx + 70 * s, y + 50 * s); c.closePath(); c.fill(); c.stroke();
    }
    if (_st.fireOut && (!m || t >= 1)) _smoke(cx, top - 10 * s, 0.8);
  }

  function _beaker(x, baseY, milky, clearTo, o = {}) {
    const c = _cx, s = _k(), w = 40 * s, h = 58 * s, top = baseY - h;
    const shake = o.shake && !_still() ? Math.sin(_clock * 40) * 3 : 0;
    c.save(); c.translate(shake, 0);
    const k = Math.max(0, Math.min(1, milky));
    c.fillStyle = `rgba(${Math.round(lerp(205, 246, k))},${Math.round(lerp(232, 246, k))},${Math.round(lerp(242, 240, k))},${lerp(0.55, 0.97, k)})`;
    if (clearTo) c.fillRect(x - w / 2 + 2, top + h * 0.45, w - 4, h * 0.55 - 2);
    c.strokeStyle = '#6F9FB3'; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(x - w / 2, top); c.lineTo(x - w / 2, baseY); c.lineTo(x + w / 2, baseY); c.lineTo(x + w / 2, top); c.stroke();
    c.restore();
  }
  function _drawProducts(sc) {
    const s = _k();
    _room();
    const tableY = _H * 0.86, cx = _W * 0.5;
    _table(tableY);
    const wickY = _candle(cx, tableY, _st.candle === 'big');
    _flame(cx, wickY + 2, _st.lit ? 1 : 0, _st.candle === 'big');
    const hold = sc && sc.type === 'hold' && sc.t < 1 ? sc : null;
    if (hold || _view.mist) {
      const mist = hold ? (hold.warm ? 0 : seg(hold.t, 0.3, 1)) : 1;
      const y = hold ? lerp(_H * 0.1, wickY - 16 * s, seg(hold.t, 0, 0.3)) : wickY - 16 * s;
      _jar(cx, y, 250, { mist: mist > 0.5 });
    }
    const lime = sc && sc.type === 'lime' && sc.t < 1 ? seg(sc.t, 0.2, 0.9) : (_view.lime ? 1 : 0);
    _beaker(_W * 0.16, tableY, lime, _view.lime || !!(sc && sc.type === 'lime'), { shake: sc && sc.type === 'lime' && sc.t < 0.6 });
    _text('flame gas', _W * 0.16, tableY + 16 * s, { size: 10 });
    _beaker(_W * 0.84, tableY, 0, _view.control || !!(sc && sc.type === 'control'), { shake: sc && sc.type === 'control' && sc.t < 0.6 });
    _text('fresh air', _W * 0.84, tableY + 16 * s, { size: 10 });
    if (_view.lime) _text('milky', _W * 0.16, tableY - 64 * s, { size: 11, color: '#374151' });
    if (_view.control) _text('clear', _W * 0.84, tableY - 64 * s, { size: 11, color: '#374151' });
  }

  // ══ Effects ══════════════════════════════════
  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const p = Math.min(1, f.t / f.dur);
      if (f.type === 'flare' || f.type === 'fireball') {
        c.fillStyle = `rgba(255,150,40,${0.55 * (1 - p)})`; c.fillRect(0, 0, _W, _H);
        _flame(_W / 2, _H * 0.7, 2.4 * (1 - p * 0.5), true);
      } else if (f.type === 'flash') {
        c.fillStyle = `rgba(220,38,38,${0.35 * (1 - p)})`; c.fillRect(0, 0, _W, _H);
      } else if (f.type === 'zap') {
        c.fillStyle = `rgba(255,250,200,${0.85 * (1 - p)})`; c.fillRect(0, 0, _W, _H);
      } else if (f.type === 'crack') {
        c.strokeStyle = `rgba(30,41,59,${1 - p})`; c.lineWidth = 2;
        c.beginPath(); c.moveTo(_W / 2 - 20, _H * 0.4); c.lineTo(_W / 2 + 5, _H * 0.55); c.lineTo(_W / 2 - 8, _H * 0.62); c.lineTo(_W / 2 + 18, _H * 0.75); c.stroke();
      }
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
  }

  function _animate(dt) {
    if (!dt) return;
    _clock += dt;
    const sc = _scene;
    if (sc && sc.t < 1) {
      sc.t = Labs.calm() ? 1 : Math.min(1, sc.t + dt / (sc.dur || 1));
      if (sc.t >= 1 && _pending) { const p = _pending; _pending = null; _busy = false; if (p.r.anim && p.r.anim.type === 'method' && p.r.anim.method === 'fueloff') _view.raked = true; _outcome(p.r, p.tok); }
    }
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
    if (document.hidden) { _last = ts; return; }
    if (_last && ts - _last < FRAME_MS - 1) return;
    const dt = _last ? Math.min(0.1, (ts - _last) / 1000) : 0;
    _last = ts;
    _animate(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) {
    _instant = !!(o && o.instant);
    if (_instant && _scene && _scene.t < 1) { _scene.t = 1; if (_pending) { const p = _pending; _pending = null; _busy = false; _outcome(p.r, p.tok); } }
  }
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n; i++) { _animate(0.05); _drawFx(0.05); }
    _readouts();
  }
  function _debug() {
    const st = _st ? Object.assign({}, _st, { running: !!(_st && _st.running), prev: _st && _st.prev ? Object.assign({}, _st.prev) : null }) : null;
    return { grade: _g(), state: st, station: _st && _st.station, busy: _busy, panel: _panel, verdict: _verdict,
             scene: _scene && { type: _scene.type, t: _scene.t, covered: !!_scene.covered },
             watch: _watch, runs: _runs.map(r => Object.assign({}, r)), talking: _talking, looping: !!_raf,
             guide: _guide && { id: _guide.id, step: _guide.step }, view: Object.assign({}, _view),
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, keys: [..._mission.keys], mistakes: _mission.mistakes, hazards: _mission.hazards, success: _mission.success } };
  }

  return { mount, unmount, act, startGuide, startMission, discoveryGuide, speak, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabAir = LabAir;
