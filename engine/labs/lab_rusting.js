'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Rusting Lab (Science, PSAC Grade 6)
//
//  Two benches:
//   - TUBES: a rack of four test tubes, each with an iron nail. The pupil fills
//     each tube (air, boiled water, tap water, salt water; oil layer, drying
//     agent, cork), then moves time on a day at a time - rust grows only
//     where the nail meets water AND air. PSAC 2024 Q4, Diagram 6.
//   - COATS: five jars of water, a nail half in each. Paint, grease, plastic,
//     zinc or a scratched coat of paint - which ones stop the rust?
//  Guided experiments, two Missions, Discoveries, and 🔊 read-aloud on the
//  lab assistant and the guide box (never automatic).
//
//  ⚠ Every outcome comes from lab_rusting_data.js (LabRustingData). This file
//    only moves time along and draws it. If a nail rusts wrongly, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here touches .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the days still pass and the rust still
//    shows, but nothing moves and every effect applies at once.
//  ⚠ Speech is cancelled on every guide step, overlay, unmount and screen
//    change - speech outlives the DOM that started it.
// ══════════════════════════════════════════════
const LabRusting = (() => {
  const P = () => LabRustingData;
  const ID = 'rusting';
  const FRAME_MS = 1000 / 30;
  const DAY_SEC = 0.7;          // real seconds for one day of the time-lapse
  const FX_DUR = { steam: 1.1, ouch: 0.8, clock: 1.0, look: 0.6 };
  const RUST = ['#B5541C', '#8B3A12', '#C96A2B'];

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _rig = 'tubes', _adult = false, _T = null, _C = null;
  let _log = [], _panel = 'sandbox', _mission = null, _guide = null;
  let _fx = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _talking = false, _obs = null;

  function _newRun(rig) {
    const ids = rig === 'tubes' ? P().TUBES : P().JARS;
    return { rig, sel: ids[0], items: P().newItems(rig), day: 0, shown: 0, hour: false, singles: 0, cards: {} };
  }
  function _resetBench() {
    _T = _newRun('tubes'); _C = _newRun('coats');
    _adult = false; _fx = []; _busy = false; _shake = 0;
  }
  const _run = () => (_rig === 'tubes' ? _T : _C);
  const _items = run => P().activeItems(run.rig, run.items);
  const _locked = run => run.day > 0 || run.hour;
  const _noun = rig => (rig === 'tubes' ? 'Tube' : 'Jar');

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-rusting">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade 6</span><h1>Rusting Lab</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-goggles" id="lab-rusting-adult" data-set="adult" data-v="on" aria-pressed="false"></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-seg lab-rusting-rigs" role="group" aria-label="Choose the experiment">
            <button type="button" data-set="rig" data-v="tubes">🧪 Three tubes</button>
            <button type="button" data-set="rig" data-v="coats">🛡️ Stop the rust</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-rusting-stage">
            <canvas id="lab-canvas" role="img" aria-label="Iron nails in test tubes and jars"></canvas>
            <div class="lab-rusting-chips" id="lab-rusting-chips"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip lab-rusting-say" data-act="say-coach" aria-label="Read this aloud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-rusting-tools" id="lab-rusting-tools"></div>
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
    if (!_T) _resetBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
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
    //   restart the loop: once the loop sees it is off-screen it stops for good,
    //   so relying on the loop alone left speech running (measured).
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
                rack: v('--lab-rack', '#8FA39E'), glass: v('--lab-glass', 'rgba(34,58,68,.62)'),
                hi: v('--lab-glass-hi', 'rgba(255,255,255,.75)'), ink: v('--lab-ink', '#14211D') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(420, Math.max(300, w * 0.92)));
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
  // Tapping a tube or a jar on the picture chooses it.
  function _canvasTap(e) {
    const r = _cv.getBoundingClientRect();
    const ids = _rig === 'tubes' ? P().TUBES : P().JARS;
    const i = Math.floor((e.clientX - r.left) / (r.width / ids.length));
    if (ids[i]) _set(_rig === 'tubes' ? 'tube' : 'jar', ids[i]);
  }
  // On a phone the set-up sits below the picture: bring the picture back.
  function _showStage() {
    const z = $('lab-rusting-stage');
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
      case 'wait': wait(false); break;
      case 'week': wait(true); break;
      case 'hour': hour(); break;
      case 'tweezers': tweezers(); break;
      case 'hand': hand(); break;
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
      .replace(/→/g, ' ').replace(/\s+/g, ' ').trim();
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
    // The shared card says "On the NCE paper"; this is a PSAC lab.
    const h = document.querySelector('#lab-overlay .is-exam h3');
    if (h) h.textContent = '📝 In the PSAC exam';
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
      if (v !== 'tubes' && v !== 'coats') return;
      _switchRig(v);
      _coach(v === 'tubes'
        ? 'The test tubes. Choose a tube, then choose what goes in it.'
        : 'Five jars of water. Each nail sits half in water, half in air. Protect some nails.');
      _after('rig:' + v);
      return;
    }
    if (k === 'adult') {
      _adult = v === 'on';
      _renderAdult();
      _coach(_adult ? 'An adult is helping. They will do the hot jobs, like boiling water.'
                    : 'No adult is helping now. Never use the kettle on your own.');
      _after('adult:' + v);
      return;
    }
    const tubeKey = ['tube', 'water', 'oil', 'dryer', 'cork'].includes(k);
    const jarKey = ['jar', 'coat', 'jwater'].includes(k);
    if (!tubeKey && !jarKey) return;
    if (tubeKey && _rig !== 'tubes') _switchRig('tubes');
    if (jarKey && _rig !== 'coats') _switchRig('coats');
    const run = _run();
    if (k === 'tube' || k === 'jar') {
      if (!run.items[v]) return;
      run.sel = v;
      _refreshShelf();
      _coach(`${_noun(run.rig)} ${v}: ${D.setupWords(run.rig, run.items[v])}.`);
      _after(k + ':' + v);
      return;
    }
    if (_locked(run)) { _coach('The nails are already in. Tap 🔄 Start again to change the set-up.'); return; }
    const res = D.applySet(run.rig, run.items[run.sel], k, v, _adult);
    if (res.hazard) { _hazard(res.hazard); return; }
    if (res.refuse) { _coach(res.refuse); return; }
    run.items[run.sel] = res.s;
    _refreshShelf();
    _coach(`${_noun(run.rig)} ${run.sel}: ${D.SAY[k + ':' + v] || D.setupWords(run.rig, res.s)}`);
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
    const b = $('lab-rusting-adult');
    if (!b) return;
    b.classList.toggle('is-on', _adult);
    b.dataset.v = _adult ? 'off' : 'on';
    b.setAttribute('aria-pressed', String(_adult));
    b.textContent = _adult ? '🧑 Adult helping' : '🧑 Adult helper: off';
    _highlight();
  }

  function _syncSet() {
    if (!_root) return;
    const t = _T.items[_T.sel], j = _C.items[_C.sel];
    const cur = { rig: _rig, tube: _T.sel, water: t.water, oil: t.oil ? 'on' : 'off', dryer: t.dryer ? 'on' : 'off',
                  cork: t.cork ? 'on' : 'off', jar: _C.sel, coat: j.coat, jwater: j.water };
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set;
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === b.dataset.v));
    });
  }

  // ══ Time passes ══════════════════════════════
  function _guard() {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return null; }
    const run = _run();
    if (!_items(run).length) { _coach('Set up a tube first. Choose a tube, then what goes in it.'); return null; }
    return run;
  }

  function wait(week) {
    const run = _guard();
    if (!run) return;
    if (run.day >= P().DAYS) { _coach('It is day 7, the end of this test. Tap 🔄 Start again for a new one.'); return; }
    const from = run.day, to = week ? P().DAYS : run.day + 1;
    run.day = to; run.hour = false;
    if (!week) run.singles++;
    _busy = true;
    _coach(week ? 'Waiting a whole week…' : 'Waiting one day…');
    _refreshShelf();
    _fxAdd('days', () => {
      _busy = false;
      run.shown = to;
      _afterWait(run, week ? 'week' : 'wait');
    }, { from, to, dur: Math.min(2.4, DAY_SEC * (to - from)), onK: k => { run.shown = from + (to - from) * k; } });
    _readouts();
  }

  function _afterWait(run, token) {
    const D = P(), items = _items(run), day = run.day, n = _noun(run.rig);
    _logEntry({ title: `Day ${day}`, obs: items.map(it => `${n} ${it.id}: ${D.short(it.s, day)}`).join(' · ') });
    D.finds(run.rig, items, day, { singles: run.singles }).filter(id => id !== 'flaky').forEach(_discover);
    let card = null;
    const m = D.mistakes(run.rig, items, day, {}).find(x => !run.cards[x.id]);
    if (m) {
      run.cards[m.id] = true;
      if (_mission) _mission.errors++;
      card = _resCard(m.id, m.ctx);
    }
    const ms = _mission;
    if (ms && !ms.success && run.rig === _missionDef().rig && D.missionReady(ms.id, run.rig, items, day)) {
      ms.success = true;
      if (!card) _coach('Mission experiment done! Look at your notebook, then tap “Answer the questions”.');
      Labs.confetti();
    } else if (!card) {
      const rusty = items.filter(it => D.visible(it.s, day)).map(it => it.id);
      const shiny = items.filter(it => !D.visible(it.s, day)).map(it => it.id);
      const list = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0];
      const nn = n.toLowerCase();
      _coach(`Day ${day}. ` + (rusty.length ? `Rust in ${nn}${rusty.length > 1 ? 's' : ''} ${list(rusty)}. ` : 'No rust anywhere yet. ')
        + (shiny.length && rusty.length ? `${nn[0].toUpperCase() + nn.slice(1)}${shiny.length > 1 ? 's' : ''} ${list(shiny)} still shiny.` : ''));
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent(token);
  }

  function hour() {
    const run = _guard();
    if (!run) return;
    if (_locked(run)) { _coach(run.day > 0 ? 'The nails have been in for days already.' : 'You already looked after one hour. Now wait a day.'); return; }
    run.hour = true;
    _busy = true;
    _refreshShelf();
    _fxAdd('clock', () => {
      _busy = false;
      _logEntry({ title: '1 hour later', obs: 'Every nail still looks shiny.' });
      const m = P().mistakes(run.rig, _items(run), P().HOUR, { hour: true })[0];
      let card = null;
      if (m && !run.cards[m.id]) {
        run.cards[m.id] = true;
        if (_mission) _mission.errors++;
        card = _resCard(m.id, m.ctx);
      } else _coach('One hour later. Every nail still looks shiny.');
      _readouts();
      _refresh();
      if (card) card();
      _guideEvent('hour');
    });
  }

  function tweezers() {
    const run = _guard();
    if (!run) return;
    const items = _items(run);
    if (!items.some(it => P().visible(it.s, run.day))) { _coach('The tweezers are ready. There is no rust to look at yet. Wait a few days.'); return; }
    _busy = true;
    _fxAdd('look', () => {
      _busy = false;
      if (P().finds(run.rig, items, run.day, { tweezers: true }).includes('flaky')) {
        _discover('flaky');
        _logEntry({ title: 'A close look with tweezers', obs: 'The rust flaked off the nail. The nail under it looked thinner.', note: true });
        _coach('The rust flakes off! Rust is weak, so the iron under it rusts next.');
      } else _coach('Only a little rust so far. Wait longer and look again.');
      _after('tweezers');
    });
  }

  function hand() {
    const run = _guard();
    if (!run) return;
    if (!_items(run).some(it => P().visible(it.s, run.day))) { _coach('Careful: nails are pointed. Use the tweezers to lift them.'); return; }
    _hazard('sharp');
  }

  function reset() {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return; }
    if (_rig === 'tubes') _T = _newRun('tubes'); else _C = _newRun('coats');
    _coach(_rig === 'tubes' ? 'Fresh, empty tubes, each with a new iron nail.' : 'Five fresh jars, each with a new bare nail.');
    _refreshShelf();
    _after('reset');
  }

  function _resCard(id, ctx) {
    const R = P().RESULTS[id];
    return () => _card('result', { icon: R.icon, title: R.title, happened: R.happened(ctx || {}), instead: R.instead, exam: R.exam,
      onClose: () => _coach('Tap 🔄 Start again and try it the right way.') });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id) {
    const H = P().HAZARDS[id];
    const st = Labs.store(ID);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    _busy = true;
    _hush();
    _fxAdd(id === 'kettle' ? 'steam' : 'ouch', () => {
      _busy = false;
      _readouts();
      _card('hazard', { signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: id === 'kettle' ? 'Got it - ask an adult' : 'Got it - use tweezers',
        onClose: () => _coach(id === 'kettle' ? 'Tap “🧑 Adult helper” first. Then choose boiled water.'
                                               : 'Tell an adult about any cut. Use the tweezers to lift nails.') });
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
    _mission = { id, errors: 0, success: false };
    _panel = 'missions';
    _renderAdult();
    _renderTools();
    _renderPanel();
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
      const st = Labs.store(ID);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} on the bench. A clean run earns an extra star.` : 'A fair, careful, safe experiment. ⚖️');
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
    const G = adhoc || P().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
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
    const z = $('lab-rusting-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step whose setting is already in place needs no tap.
  function _satisfied(tok) {
    const [k, v] = tok.split(':');
    if (v === undefined) return false;
    const t = _T.items[_T.sel], j = _C.items[_C.sel];
    switch (k) {
      case 'rig': return _rig === v;
      case 'adult': return _adult === (v === 'on');
      case 'tube': return _rig === 'tubes' && _T.sel === v;
      case 'jar': return _rig === 'coats' && _C.sel === v;
      case 'water': return _rig === 'tubes' && !_locked(_T) && t.water === v;
      case 'oil': return _rig === 'tubes' && !_locked(_T) && t.oil === (v === 'on');
      case 'dryer': return _rig === 'tubes' && !_locked(_T) && t.dryer === (v === 'on');
      case 'cork': return _rig === 'tubes' && !_locked(_T) && t.cork === (v === 'on');
      case 'coat': return _rig === 'coats' && !_locked(_C) && j.coat === v;
      case 'jwater': return _rig === 'coats' && !_locked(_C) && j.water === v;
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
      box.innerHTML = `<div class="lab-rusting-guide-head">
          <p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
          <button type="button" class="lab-btn lab-btn-sm lab-rusting-say" data-act="say-guide" aria-label="Read this step aloud">🔊</button>
        </div>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${s.btn ? `<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>`
                : '<p class="lab-guide-wait">⏳ Keep watching…</p>'}
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
    if (s) _do(s.on);
  }

  // The words for a discovery's "how" tokens.
  function _autoStep(on) {
    const [k, v] = on.split(':');
    const D = P();
    switch (k) {
      case 'rig': return v === 'tubes' ? { on, say: 'Go to the test-tube rack.', btn: '🧪 Test tubes' } : { on, say: 'Go to the five jars.', btn: '🛡️ The five jars' };
      case 'adult': return { on, say: 'Boiling water is hot. Ask an adult to help you.', btn: '🧑 Ask an adult to help' };
      case 'tube': return { on, say: `Tap tube ${v}.`, btn: `Tube ${v}` };
      case 'jar': return { on, say: `Tap jar ${v}.`, btn: `Jar ${v}` };
      case 'water': return { on, say: v === 'none' ? 'Put no water in this tube. Just air.' : `Fill the tube with ${D.WATERS[v].name.toLowerCase()}.`,
                             btn: v === 'boiled' ? '♨️ Boiled water' : v === 'salt' ? '🧂 Salt water' : v === 'tap' ? '💧 Tap water' : '💨 Just air' };
      case 'oil': return { on, say: 'Pour a thin layer of oil on top. Oil keeps air out.', btn: '🛢️ Add an oil layer' };
      case 'dryer': return { on, say: 'Add a drying agent. It soaks up water from the air.', btn: '🧂 Add a drying agent' };
      case 'cork': return { on, say: 'Close the tube with a cork.', btn: '🍾 Put the cork in' };
      case 'coat': return { on, say: `Make this nail: ${D.COATS[v].name.toLowerCase()}.`, btn: `${D.COATS[v].icon} ${D.COATS[v].name}` };
      case 'jwater': return { on, say: `Put ${D.JAR_WATERS[v].name.toLowerCase()} in this jar.`, btn: `${D.JAR_WATERS[v].icon} ${D.JAR_WATERS[v].name}` };
      case 'wait': return { on, say: 'Wait one day. Look at the nails.', btn: '🌙 Wait 1 day' };
      case 'week': return { on, say: 'Wait 7 days. Look at the nails.', btn: '⏩ Wait 7 days' };
      case 'tweezers': return { on, say: 'Look closely at the rusty nail with the tweezers.', btn: '🔍 Tweezers' };
      case 'hour': return { on, say: 'Look at the nails after one hour.', btn: '⏱ Look after 1 hour' };
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
    const next = G.adhoc ? null : P().GUIDES.find(g => !st.guides[g.id]);
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
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-rusting ' + _selFor(s.on));
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
        <li><b>Choose</b> a guided experiment. It is the best place to start.</li>
        <li><b>Follow the yellow box</b> under the picture. The thing to tap next glows yellow.</li>
        <li><b>Watch the nails</b> as the days pass. Read your notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${P().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${P().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or try your own ideas: set up the tubes below.</p>
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
    const sh = $('lab-rusting-shelf');
    if (sh) sh.outerHTML = _shelfHTML();
    _syncSet();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover(ID, id, { title: d && d.title, total: P().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store(ID).disc).length}/${P().DISCOVERIES.length}`;
  }

  function _renderTools() {
    const box = $('lab-rusting-tools');
    if (!box) return;
    box.innerHTML = `
      <button type="button" class="lab-tool" data-act="wait"><span aria-hidden="true">🌙</span>Wait 1 day</button>
      <button type="button" class="lab-tool" data-act="week"><span aria-hidden="true">⏩</span>Wait to day 7</button>
      <button type="button" class="lab-tool" data-act="hour"><span aria-hidden="true">⏱</span>Look after 1 hour</button>
      <button type="button" class="lab-tool" data-act="tweezers"><span aria-hidden="true">🔍</span>Tweezers: look closely</button>
      <button type="button" class="lab-tool lab-rusting-danger" data-act="hand"><i class="lab-rusting-toolsign">${Labs.sign('irritant', true)}</i><span aria-hidden="true">🖐️</span>Pick up by hand</button>
      <button type="button" class="lab-tool" data-act="reset"><span aria-hidden="true">🔄</span>Start again</button>`;
    _highlight();
  }

  function _opt(k, v, label, small, cls) {
    return `<button type="button" class="lab-rusting-opt${cls ? ' ' + cls : ''}" data-set="${k}" data-v="${v}" aria-pressed="false">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _pair(k, label) {
    return `<div class="lab-rusting-pair"><span>${label}</span>${_opt(k, 'on', 'Yes')}${_opt(k, 'off', 'No')}</div>`;
  }
  function _shelfHTML() {
    const D = P();
    if (_rig === 'tubes') {
      const run = _T, t = run.items[run.sel], lock = _locked(run);
      return `<section class="lab-shelf lab-rusting-set" id="lab-rusting-shelf" aria-label="Set up the test tubes">
        <h2>Set up the test tubes</h2>
        <div class="lab-rusting-row"><span class="lab-rusting-label">1 · Choose a tube</span>
          <div class="lab-rusting-opts is-four">${D.TUBES.map(id => _opt('tube', id, id, D.label('tubes', run.items[id])[0], 'is-big')).join('')}</div></div>
        <div class="lab-rusting-row"><span class="lab-rusting-label">2 · What goes in tube ${esc(run.sel)}?</span>
          <div class="lab-rusting-opts is-wide">${Object.keys(D.WATERS).map(w => _opt('water', w, D.WATERS[w].name, D.WATERS[w].meta)).join('')}</div></div>
        <div class="lab-rusting-row"><span class="lab-rusting-label">3 · Extras for tube ${esc(run.sel)}</span>
          ${_pair('oil', '🛢️ Layer of oil on top')}
          ${_pair('dryer', '🧂 Drying agent (calcium chloride)')}
          ${_pair('cork', '🍾 Cork in the top')}</div>
        <p class="lab-hint">${lock ? '🔒 The nails are in. Tap 🔄 Start again to change the tubes.'
          : `Tube ${esc(run.sel)}: ${esc(D.setupWords('tubes', t))}. Every tube holds one iron nail.`}</p>
      </section>`;
    }
    const run = _C, j = run.items[run.sel], lock = _locked(run);
    return `<section class="lab-shelf lab-rusting-set" id="lab-rusting-shelf" aria-label="Set up the jars">
      <h2>Protect the nails</h2>
      <div class="lab-rusting-row"><span class="lab-rusting-label">1 · Choose a jar</span>
        <div class="lab-rusting-opts is-five">${D.JARS.map(id => _opt('jar', id, id, D.COATS[run.items[id].coat].short, 'is-big')).join('')}</div></div>
      <div class="lab-rusting-row"><span class="lab-rusting-label">2 · The nail in jar ${esc(run.sel)}</span>
        <div class="lab-rusting-opts is-wide">${Object.keys(D.COATS).map(c => _opt('coat', c, D.COATS[c].icon + ' ' + D.COATS[c].name, D.COATS[c].meta)).join('')}</div></div>
      <div class="lab-rusting-row"><span class="lab-rusting-label">3 · Water in jar ${esc(run.sel)}</span>
        <div class="lab-rusting-opts is-wide">${Object.keys(D.JAR_WATERS).map(w => _opt('jwater', w, D.JAR_WATERS[w].icon + ' ' + D.JAR_WATERS[w].name)).join('')}</div></div>
      <p class="lab-hint">${lock ? '🔒 The nails are in. Tap 🔄 Start again to change the jars.'
        : `Jar ${esc(run.sel)}: ${esc(D.setupWords('coats', j))}. Each nail sits half in water, half in air.`}</p>
    </section>`;
  }

  function _yn(x) {
    return x === 'yes' ? '<span class="lab-rusting-yes">✓ yes</span>' : x === 'no' ? '<span class="lab-rusting-no">✗ no</span>' : '<span class="lab-rusting-some">a little</span>';
  }
  function _dot(s, day) {
    const f = P().rustAt(s, day);
    const col = f >= P().VISIBLE ? (f >= 0.5 ? RUST[1] : RUST[0]) : '#C9D1D6';
    return `<i class="lab-rusting-dot" style="background:${col}" aria-hidden="true"></i>`;
  }
  function _notebookHTML() {
    const D = P(), run = _run(), items = _items(run), day = run.day;
    const when = run.hour && day === 0 ? 'after 1 hour' : day === 0 ? 'on day 0 (set-up)' : `after ${day} day${day === 1 ? '' : 's'}`;
    const when2 = run.hour && day === 0 ? D.HOUR : day;
    let table = '';
    if (items.length && run.rig === 'tubes') {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>What I saw ${esc(when)}</caption>
        <thead><tr><th scope="col">Tube</th><th scope="col">Water?</th><th scope="col">Air?</th><th scope="col">The nail</th></tr></thead>
        <tbody>${items.map(it => { const c = D.conditions(it.s); return `<tr><th scope="row">${esc(it.id)}<br><small class="lab-muted">${esc(D.setupWords('tubes', it.s))}</small></th>
          <td>${_yn(c.water)}</td><td>${_yn(c.air)}</td><td>${_dot(it.s, when2)}${esc(D.short(it.s, when2))}</td></tr>`; }).join('')}</tbody></table></div>
        <p class="lab-fair">⚖️ Rust needs water AND air. Look for the tube with both.</p>`;
    } else if (items.length) {
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>What I saw ${esc(when)}</caption>
        <thead><tr><th scope="col">Jar</th><th scope="col">The nail</th><th scope="col">Water</th><th scope="col">Rust</th></tr></thead>
        <tbody>${items.map(it => `<tr><th scope="row">${esc(it.id)}</th><td>${esc(D.COATS[it.s.coat].name)}</td><td>${esc(D.JAR_WATERS[it.s.water].name)}</td><td>${_dot(it.s, when2)}${esc(D.short(it.s, when2))}</td></tr>`).join('')}</tbody></table></div>
        <p class="lab-fair">⚖️ Fair test: the same water in every jar. Only the coating changes.</p>`;
    }
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">What you see each day appears here.</p>';
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
      ${P().MISSIONS.map(M => {
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
    if (ms.id === 'needs') {
      const roles = D.activeItems('tubes', _T.items).map(it => D.role(it.s));
      body = `<ul class="lab-steps">
        <li class="${tick(_adult || roles.includes('no_air'))}">🧑 Ask an adult to help with the boiled water</li>
        <li class="${tick(roles.includes('no_air'))}">A tube with boiled water and an oil layer</li>
        <li class="${tick(roles.includes('water_air'))}">A tube with tap water</li>
        <li class="${tick(roles.includes('dry'))}">A tube with dry air: drying agent and cork</li>
        <li class="${tick(_T.day >= 3)}">📅 Wait at least 3 days (day ${_T.day} now)</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    } else {
      const items = D.activeItems('coats', _C.items);
      const kinds = new Set(items.filter(it => D.COATS[it.s.coat].protect).map(it => it.s.coat));
      body = `<ul class="lab-steps">
        <li class="${tick(items.some(it => it.s.coat === 'none'))}">🔩 Keep one nail bare</li>
        <li class="${tick(kinds.size >= 3)}">🛡️ Protect 3 or more nails in different ways (${kinds.size} so far)</li>
        <li class="${tick(items.every(it => it.s.water === items[0].s.water))}">⚖️ The same water in every jar</li>
        <li class="${tick(_C.day >= 3)}">📅 Wait at least 3 days (day ${_C.day} now)</li>
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
    const all = P().DISCOVERIES;
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
        <p class="lab-done-icon" aria-hidden="true">🔩</p>
        <h2 id="lab-ov-title">Welcome to the Rusting Lab</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will guide you, one tap at a time.</li>
          <li><b>Test tubes and nails.</b> Fill each tube, then let the days pass. Which nail rusts?</li>
          <li><b>Stop the rust.</b> Paint, grease, plastic or zinc. Which ones work?</li>
          <li><b>Get it wrong safely.</b> Make a mistake and see what happens. Nothing here can hurt you.</li>
          <li><b>🔊 Read aloud.</b> Tap 🔊 and I will read the words to you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. There are ${P().DISCOVERIES.length} discoveries to find.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="three_tubes" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(ID); st.intro = true; Labs.persist();
        _coach('Pick a guided experiment below, or set up the tubes yourself.');
      } });
  }

  function _help() {
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Rusting Lab works</h2>
      <div class="lab-help">
        <section><h3>What is rust?</h3>
          <p class="lab-hint">Rust is a reddish-brown, flaky layer. It forms on iron and steel. Iron needs <b>air AND water</b> to rust.</p></section>
        <section><h3>The three tubes (PSAC 2024 Diagram 6)</h3><ul>
          <li><b>A:</b> boiled water with oil on top. No air can reach the nail.</li>
          <li><b>B:</b> tap water. The nail has water and air.</li>
          <li><b>C:</b> dry air. A drying agent soaks up water, and a cork keeps damp air out.</li>
          <li><b>D:</b> try salt water here.</li></ul></section>
        <section><h3>Stop the rust</h3><ul>
          <li>Paint, grease, plastic and zinc keep air and water off the iron.</li>
          <li>Galvanised means coated with zinc.</li>
          <li>A scratch lets air and water in. Rust starts there.</li></ul></section>
        <section><h3>A fair test</h3><ul>
          <li>Change only ONE thing. Keep everything else the same.</li>
          <li>Rusting takes days. Wait long enough before you decide.</li></ul></section>
        <section><h3>Stay safe</h3><ul>
          <li>Boiling water is hot. Ask an adult to boil it for you.</li>
          <li>Rusty nails can be sharp. Use tweezers. Tell an adult about any cut.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_T) return;
    const D = P(), run = _run();
    const chips = $('lab-rusting-chips');
    if (chips) {
      let h = run.hour && run.day === 0
        ? '<span class="lab-chip">⏱ 1 hour later</span>'
        : `<span class="lab-chip">📅 Day <b>${Math.floor(run.shown + 1e-6)}</b> of ${D.DAYS}</span>`;
      if (_busy && _fx.some(f => f.type === 'days')) h += '<span class="lab-chip is-warm">⏩ Time passing…</span>';
      if (_rig === 'tubes') h += `<span class="lab-chip">${_adult ? '🧑 Adult helping' : '🧑 No adult yet'}</span>`;
      chips.innerHTML = h;
    }
    const c = $('lab-contents');
    if (c) {
      const s = run.items[run.sel], n = _noun(run.rig);
      c.textContent = _locked(run)
        ? `${n} ${run.sel}: ${D.seen(s, run.hour && run.day === 0 ? D.HOUR : run.shown)}`
        : `${n} ${run.sel}: ${D.setupWords(run.rig, s)}`;
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
      if (f.type === 'ouch') _shake = Math.max(_shake, 0.8 * (1 - k));
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
  }

  // ══ Drawing ══════════════════════════════════
  const _frac = x => x - Math.floor(x);
  const _rnd = k => _frac(Math.sin(k * 12.9898 + 78.233) * 43758.5453);

  function _draw(dt) {
    if (!_cx || !_T) return;
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
    const bench = _H * 0.72;
    c.fillStyle = _colors.bench; c.fillRect(-12, bench, _W + 24, _H - bench + 12);
    if (_rig === 'tubes') _drawTubes(bench); else _drawJars(bench);
    _drawFx();
    c.restore();
  }

  function _drawNail(x1, y1, x2, y2, s, f) {
    const c = _cx, D = P(), coat = s.coat || 'none', col = D.COATS[coat].color;
    const bare = coat === 'none';
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    let shaft = col;
    if (bare && f >= D.VISIBLE) shaft = f >= 0.6 ? '#8E4A26' : f >= 0.25 ? '#8F6A58' : col;
    c.lineCap = 'round';
    c.strokeStyle = shaft; c.lineWidth = coat === 'plastic' ? 5.5 : 3.8;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    // the head, across the shaft
    c.lineWidth = coat === 'plastic' ? 6 : 4.5;
    c.beginPath(); c.moveTo(x1 - nx * 7, y1 - ny * 7); c.lineTo(x1 + nx * 7, y1 + ny * 7); c.stroke();
    if (coat === 'grease') {
      c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(x1 + nx * 1.2, y1 + ny * 1.2); c.lineTo(x2 + nx * 1.2, y2 + ny * 1.2); c.stroke();
    }
    if (coat === 'zinc') {
      c.fillStyle = 'rgba(255,255,255,0.9)';
      for (let k = 0; k < 5; k++) { const t = 0.15 + k * 0.17; c.beginPath(); c.arc(x1 + dx * t, y1 + dy * t, 0.9, 0, Math.PI * 2); c.fill(); }
    }
    if (coat === 'scratched') {
      c.strokeStyle = '#D9DEE2'; c.lineWidth = 1.4;
      const t0 = 0.46, t1 = 0.6;
      c.beginPath(); c.moveTo(x1 + dx * t0 + nx * 1.5, y1 + dy * t0 + ny * 1.5); c.lineTo(x1 + dx * t1 - nx * 1.5, y1 + dy * t1 - ny * 1.5); c.stroke();
    }
    if (f < D.VISIBLE) return;
    const scratch = coat === 'scratched';
    const n = Math.round((scratch ? f / D.SCRATCH_CAP * 9 : f * 26));
    for (let k = 0; k < n; k++) {
      const t = scratch ? 0.44 + _rnd(k) * 0.18 : 0.06 + _rnd(k) * 0.92;
      const off = (_rnd(k + 50) - 0.5) * 3.6, r = 1.3 + _rnd(k + 90) * 1.8;
      c.fillStyle = RUST[k % 3];
      c.beginPath(); c.arc(x1 + dx * t + nx * off, y1 + dy * t + ny * off, r, 0, Math.PI * 2); c.fill();
    }
  }

  function _drawTubes(bench) {
    const c = _cx, D = P(), run = _T, ids = D.TUBES, slot = _W / ids.length;
    const top = Math.max(64, _H * 0.2), bot = bench - 8;
    const tw = Math.min(44, slot * 0.46);
    // the rack: a wooden bar behind the tubes, and its base
    c.fillStyle = '#A7835C';
    c.fillRect(slot * 0.2, top + (bot - top) * 0.3, _W - slot * 0.4, 7);
    c.fillRect(slot * 0.15, bench - 6, _W - slot * 0.3, 8);
    const day = run.hour && run.day === 0 ? D.HOUR : run.shown;
    ids.forEach((id, i) => {
      const s = run.items[id], on = D.isOn(s), cx = slot * (i + 0.5);
      c.save();
      if (!on) c.globalAlpha = 0.4;
      const wl = top + (bot - top) * 0.28;
      const path = () => {
        c.beginPath(); c.moveTo(cx - tw / 2, top); c.lineTo(cx - tw / 2, bot - tw / 2);
        c.arc(cx, bot - tw / 2, tw / 2, Math.PI, 0, true); c.lineTo(cx + tw / 2, top);
      };
      // what is inside
      c.save(); path(); c.clip();
      if (s.water !== 'none') {
        const wTop = s.oil ? wl + 9 : wl;
        c.fillStyle = s.water === 'salt' ? 'rgba(170,205,225,0.62)' : 'rgba(150,200,235,0.55)';
        c.fillRect(cx - tw, wTop, tw * 2, bot);
        if (s.oil) { c.fillStyle = 'rgba(232,190,60,0.9)'; c.fillRect(cx - tw, wl, tw * 2, 9); }
        if (s.water === 'salt') { c.fillStyle = 'rgba(255,255,255,0.95)'; for (let k = 0; k < 10; k++) c.fillRect(cx - tw / 2 + 3 + _rnd(k + i * 7) * (tw - 6), wTop + 6 + _rnd(k + 30 + i) * (bot - wTop - 10), 1.6, 1.6); }
      }
      if (s.dryer) {
        for (let k = 0; k < 9; k++) {
          c.fillStyle = k % 2 ? '#F4F4F2' : '#E2E4E0';
          c.beginPath(); c.arc(cx - tw / 2 + 5 + _rnd(k + 11) * (tw - 10), bot - 5 - _rnd(k + 21) * 12, 2.6 + _rnd(k + 31) * 1.4, 0, Math.PI * 2); c.fill();
        }
      }
      // rust flakes that have fallen to the bottom
      const f = D.rustAt(s, day);
      if (D.outcome(s).where === 'all' && f > 0.4) {
        const nFl = Math.round((f - 0.4) * 16);
        for (let k = 0; k < nFl; k++) { c.fillStyle = RUST[k % 3]; c.fillRect(cx - tw / 2 + 4 + _rnd(k + 70) * (tw - 8), bot - 3 - _rnd(k + 80) * 6, 2.2, 1.6); }
      }
      c.restore();
      // the nail: head up and to the right, like Diagram 6
      _drawNail(cx + tw * 0.22, wl + (bot - wl) * 0.18, cx - tw * 0.16, bot - 5, s, on ? f : 0);
      // glass
      c.strokeStyle = _colors.glass; c.lineWidth = 2; path(); c.stroke();
      c.strokeStyle = _colors.hi; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(cx - tw / 2 + 4, top + 6); c.lineTo(cx - tw / 2 + 4, bot - tw / 2); c.stroke();
      if (s.cork) {
        c.fillStyle = '#8A5A34';
        c.beginPath(); c.moveTo(cx - tw / 2 - 4, top - 12); c.lineTo(cx + tw / 2 + 4, top - 12); c.lineTo(cx + tw / 2 - 1, top + 8); c.lineTo(cx - tw / 2 + 1, top + 8); c.closePath(); c.fill();
      }
      c.restore();
      // a dashed box round the tube being set up
      if (run.sel === id && !_locked(run)) {
        c.save(); c.setLineDash([4, 3]); c.strokeStyle = '#E4A11B'; c.lineWidth = 2;
        c.strokeRect(cx - tw / 2 - 8, top - 18, tw + 16, bot - top + 24); c.restore();
      }
      _labels(cx, bench, id, D.label('tubes', s), on);
    });
  }

  function _drawJars(bench) {
    const c = _cx, D = P(), run = _C, ids = D.JARS, slot = _W / ids.length;
    const top = Math.max(84, _H * 0.34), bot = bench - 4;
    const jw = Math.min(50, slot * 0.72);
    const day = run.hour && run.day === 0 ? D.HOUR : run.shown;
    ids.forEach((id, i) => {
      const s = run.items[id], cx = slot * (i + 0.5), wl = top + (bot - top) * 0.42;
      c.fillStyle = s.water === 'salt' ? 'rgba(170,205,225,0.62)' : 'rgba(150,200,235,0.55)';
      c.fillRect(cx - jw / 2 + 1, wl, jw - 2, bot - wl - 1);
      if (s.water === 'salt') { c.fillStyle = 'rgba(255,255,255,0.95)'; for (let k = 0; k < 8; k++) c.fillRect(cx - jw / 2 + 4 + _rnd(k + i * 5) * (jw - 8), wl + 4 + _rnd(k + 40) * (bot - wl - 8), 1.6, 1.6); }
      const f = D.rustAt(s, day);
      if (D.outcome(s).where === 'all' && f > 0.4) {
        const nFl = Math.round((f - 0.4) * 14);
        for (let k = 0; k < nFl; k++) { c.fillStyle = RUST[k % 3]; c.fillRect(cx - jw / 2 + 4 + _rnd(k + 60) * (jw - 8), bot - 4 - _rnd(k + 61) * 4, 2.2, 1.6); }
      }
      // the nail leans out of the water: half in water, half in air
      _drawNail(cx + jw * 0.3, top - 16, cx - jw * 0.2, bot - 5, s, f);
      c.strokeStyle = _colors.glass; c.lineWidth = 2;
      c.beginPath(); c.moveTo(cx - jw / 2, top); c.lineTo(cx - jw / 2, bot); c.lineTo(cx + jw / 2, bot); c.lineTo(cx + jw / 2, top); c.stroke();
      if (run.sel === id && !_locked(run)) {
        c.save(); c.setLineDash([4, 3]); c.strokeStyle = '#E4A11B'; c.lineWidth = 2;
        c.strokeRect(cx - jw / 2 - 5, top - 22, jw + 10, bot - top + 26); c.restore();
      }
      _labels(cx, bench, id, D.label('coats', s), true);
    });
  }

  function _labels(cx, bench, id, lines, on) {
    const c = _cx;
    c.save();
    if (!on) c.globalAlpha = 0.55;
    c.fillStyle = '#FFFFFF'; c.strokeStyle = _colors.ink; c.lineWidth = 1.5;
    c.beginPath(); c.arc(cx, bench + 15, 10, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = _colors.ink; c.textAlign = 'center';
    c.font = '800 12px system-ui, sans-serif'; c.fillText(id, cx, bench + 19);
    c.font = '600 10px system-ui, sans-serif';
    if (lines[0]) c.fillText(lines[0], cx, bench + 37);
    if (lines[1]) c.fillText(lines[1], cx, bench + 49);
    c.restore();
  }

  function _drawFx() {
    const c = _cx;
    _fx.forEach(f => {
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'days': {
          const span = f.data.to - f.data.from, ph = _frac(k * span);
          const night = Math.sin(Math.PI * ph);
          c.fillStyle = `rgba(12,18,40,${0.45 * night})`; c.fillRect(0, 0, _W, _H);
          c.font = '26px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText(ph < 0.5 ? '🌙' : '☀️', _W * 0.08 + ph * _W * 0.84, 40 + Math.sin(Math.PI * ph) * -14 + 14);
          break;
        }
        case 'clock': {
          const x = _W / 2, y = _H * 0.4, r = 26;
          c.fillStyle = 'rgba(255,255,255,0.95)'; c.strokeStyle = _colors.ink; c.lineWidth = 2.5;
          c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
          const a = -Math.PI / 2 + k * Math.PI * 2;
          c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8); c.stroke();
          c.fillStyle = _colors.ink; c.font = '700 12px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText('+1 hour', x, y + r + 16);
          break;
        }
        case 'steam': {
          const x = _W / 2, y = _H * 0.5;
          c.fillStyle = '#5A6670';
          c.beginPath(); c.ellipse(x, y, 30, 24, 0, 0, Math.PI * 2); c.fill();
          c.fillRect(x + 24, y - 10, 18, 6);
          for (let j = 0; j < 6; j++) {
            const t = _frac(k * 1.6 + j / 6), sx = x + 40 + t * 30 + Math.sin(j + t * 6) * 6, sy = y - 12 - t * 70;
            c.fillStyle = `rgba(235,240,245,${0.85 * (1 - t)})`;
            c.beginPath(); c.arc(sx, sy, 7 + t * 10, 0, Math.PI * 2); c.fill();
          }
          c.fillStyle = `rgba(255,120,40,${0.22 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'ouch':
          c.fillStyle = `rgba(210,40,40,${0.3 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          c.font = '34px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText('🖐️', _W / 2, _H * 0.45);
          break;
        case 'look': {
          const x = _W * (0.25 + 0.5 * k), y = _H * 0.45;
          c.strokeStyle = _colors.ink; c.lineWidth = 3;
          c.beginPath(); c.arc(x, y, 18, 0, Math.PI * 2); c.stroke();
          c.beginPath(); c.moveTo(x + 13, y + 13); c.lineTo(x + 28, y + 28); c.stroke();
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
    _stepFx(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _stepFx(0.05); _readouts(); }
  function _debug() {
    const T = _T || _newRun('tubes'), C = _C || _newRun('coats');
    const dbgRun = r => ({ sel: r.sel, day: r.day, shown: r.shown, hour: r.hour, singles: r.singles,
      items: Object.fromEntries(Object.keys(r.items).map(id => [id, Object.assign({}, r.items[id],
        { on: r.rig === 'coats' || P().isOn(r.items[id]), rust: P().rustAt(r.items[id], r.day) })])) });
    return { rig: _rig, busy: _busy, adult: _adult, panel: _panel, talking: _talking, looping: !!_raf,
             tubes: dbgRun(T), coats: dbgRun(C),
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success },
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, set: _set, act: _do, wait,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabRusting = LabRusting;
