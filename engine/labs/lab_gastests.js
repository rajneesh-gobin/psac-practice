'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Gas Tests (Science, Grade 7)
//
//  Three stations side by side: Oxygen (O₂), Carbon Dioxide (CO₂) and
//  Hydrogen (H₂). Each has a generator that bubbles gas into a collection
//  tube, and a set of tests (glowing splint / limewater / lighted splint).
//  Select a station, collect gas, apply a test and observe the animated result.
//
//  ⚠ Every outcome comes from lab_gastests_data.js (LabGastestsData).
//    This file only draws and animates. If a result looks wrong, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here puts transform/filter on .screen.
//  ⚠ Calm Mode: simulation still runs, effects apply at once.
//  ⚠ MutationObserver restarts the loop when the Labs screen comes back.
//  ⚠ Speech is cancelled on every step change, overlay and unmount.
//  ⚠ Never call recordAnswer() or _recordDaily() — progress through Labs.store.
// ══════════════════════════════════════════════
const LabGastests = (() => {
  const D = () => LabGastestsData;
  const ID = 'gastests';
  const FRAME_MS = 1000 / 30;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const _g = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 7;
    return D().GRADES.includes(g) ? g : D().GRADES[0];
  };
  const _mine = list => D().forGrade(list, _g());

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _obs = null;
  let _panel = 'sandbox', _mission = null, _guide = null, _guide_step = 0;
  let _goggles = false, _active = null, _said = {}, _tipIdx = -1;
  let _busy = false, _instant = false, _colors = null;
  let _fx = [], _bubbles = [];

  // Station state: track each gas station independently.
  const _newStation = () => ({ setup: false, collecting: false, collected: false,
                                fillFrac: 0, testApplied: null, result: null,
                                excessDone: false, afterpopDone: false, n2tested: false });
  let _stations = {};

  function _resetAll() {
    _stations = {};
    D().GAS_ORDER.forEach(id => { _stations[id] = _newStation(); });
    _active = null; _fx = []; _bubbles = []; _busy = false; _said = {};
  }

  const _st = () => _active ? _stations[_active] : null;

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-gastests">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade ${esc(_g())}</span><h1>Gas Tests</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-goggles" class="lab-goggles" data-act="goggles" aria-pressed="false"><span aria-hidden="true">🥽</span><span id="lab-goggles-label">Goggles off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the gas tests work">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-gastests-stations" role="group" aria-label="Select a gas station">
            ${D().GAS_ORDER.map(id => {
              const g = D().GASES[id];
              return `<button type="button" class="lab-gastests-station-btn" data-station="${esc(id)}" aria-label="${esc(g.name)} station">
                <span aria-hidden="true">${esc(g.icon)}</span>
                <span class="lab-gastests-station-name">${esc(g.name)}</span>
              </button>`;
            }).join('')}
          </div>
          <div class="lab-canvas-wrap" id="lab-gastests-stage">
            <canvas id="lab-gastests-canvas" role="img" aria-label="Three gas test stations on a lab bench"></canvas>
            <div class="lab-status" id="lab-status"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Test each gas: does it relight a glowing splint, pop with a lighted splint, or turn limewater milky?</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools" id="lab-gastests-tools">
            <button type="button" class="lab-tool" data-act="setup" id="btn-setup"><span aria-hidden="true">⚗️</span><em>Set up</em></button>
            <button type="button" class="lab-tool" data-act="collect" id="btn-collect"><span aria-hidden="true">🧪</span><em>Collect gas</em></button>
            <button type="button" class="lab-tool" data-act="test:glowing" id="btn-glowing"><span aria-hidden="true">🪵</span>Glowing splint</button>
            <button type="button" class="lab-tool" data-act="test:lit" id="btn-lit"><span aria-hidden="true">🔥</span>Lighted splint</button>
            <button type="button" class="lab-tool" data-act="test:limewater" id="btn-limewater"><span aria-hidden="true">🥛</span>Limewater</button>
            <button type="button" class="lab-tool" data-act="aircomp" id="btn-aircomp"><span aria-hidden="true">🌍</span>Air composition</button>
            <button type="button" class="lab-tool" data-act="reset-station" id="btn-reset"><span aria-hidden="true">🧽</span>Reset station</button>
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
    if (!_stations || !Object.keys(_stations).length) _resetAll();
    root.innerHTML = _shellHTML();
    _cv = $('lab-gastests-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _syncGoggles();
    _updateTools();
    const st = Labs.store(ID);
    if (!st.intro) _intro();
    else _coach('Select a gas station on the left and follow the steps — or pick a guide below.');
    if (!_resizeWired) {
      window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); });
      _resizeWired = true;
    }
    if (!_obs) {
      _obs = new MutationObserver(() => {
        const screen = document.getElementById('screen-labs');
        if (screen && screen.classList.contains('hidden')) { _hush(); _stop(); }
        else if (!_raf) _start();
      });
      const screen = document.getElementById('screen-labs');
      if (screen) _obs.observe(screen, { attributes: true, attributeFilter: ['class'] });
    }
    _start();
  }

  function unmount() {
    _hush();
    _stop();
    if (_obs) { _obs.disconnect(); _obs = null; }
    _root = null; _cv = null; _cx = null;
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = {
      top: v('--lab-cv-top', '#EEF3F8'), bot: v('--lab-cv-bot', '#D8E5EF'),
      bench: v('--lab-bench', '#B9C8D2'), rack: v('--lab-rack', '#8A9EAD'),
      glass: v('--lab-glass', 'rgba(50,70,90,.55)'), hi: v('--lab-glass-hi', 'rgba(255,255,255,.7)'),
      ink: v('--lab-ink', '#14211D'),
    };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(360, Math.max(220, w * 0.6)));
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
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const s = e.target.closest('[data-station]');
      if (s) { _selectStation(s.dataset.station); return; }
      const g = e.target.closest('[data-guide]');
      if (g) { _startGuide(g.dataset.guide); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { _startMission(m.dataset.mission); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { _discoveryGuide(dg.dataset.discGo); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      if (e.target.closest('[data-ov-close]')) {
        const ov = $('lab-overlay');
        if (ov) {
          const dgClose = e.target.closest('[data-disc-go]');
          if (!dgClose) Labs.closeOverlay();
        }
      }
    };
  }

  function _act(act) {
    if (act === 'hub') { Labs.backToHub(); return; }
    if (act === 'goggles') { _toggleGoggles(); return; }
    if (act === 'help') { _help(); return; }
    if (act === 'tip') { _nextTip(); return; }
    if (act === 'setup') { _doSetup(); return; }
    if (act === 'collect') { _doCollect(); return; }
    if (act === 'aircomp') { _doAircomp(); return; }
    if (act === 'reset-station') { _doReset(); return; }
    if (act.startsWith('test:')) { _doTest(act.slice(5)); return; }
    if (act === 'quiz') { _quiz(); return; }
    if (act === 'exit-mission') { _mission = null; _coach('Back to free experimenting.'); _renderPanel(); return; }
    if (act === 'guide-stop') { _stopGuide(false); return; }
  }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _say(key, text) { if (_said[key]) return; _said[key] = true; _coach(text); }
  function _nextTip() {
    const f = _mine(D().FACTS);
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx].t);
  }
  function _hush() {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  }

  // ══ Stations ═════════════════════════════════
  function _selectStation(id) {
    if (!D().GASES[id]) return;
    _active = id;
    const g = D().GASES[id];
    _coach(`${g.name} station selected. ${g.meta}.`);
    _updateTools();
    _renderPanel();
    _guideEvent('station:' + id);
    _draw(0);
  }

  function _syncGoggles() {
    const b = $('lab-goggles');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_goggles));
    b.classList.toggle('is-on', _goggles);
    const l = $('lab-goggles-label');
    if (l) l.textContent = _goggles ? 'Goggles on' : 'Goggles off';
  }

  function _toggleGoggles() {
    _goggles = !_goggles;
    _syncGoggles();
    _coach(_goggles ? 'Goggles on. Ready for gas tests.' : 'Goggles off — put them back on before testing.');
    if (_goggles) _guideEvent('goggles');
  }

  // ── Tools: only show relevant actions for the current state ──
  function _updateTools() {
    const st = _st();
    const show = (id, visible) => { const b = $(id); if (b) b.hidden = !visible; };
    const noStation = !_active;
    show('btn-setup',     !noStation && st && !st.setup);
    show('btn-collect',   !noStation && st && st.setup && !st.collected && !st.collecting);
    show('btn-glowing',   !noStation && st && st.collected && !st.testApplied);
    show('btn-lit',       !noStation && st && st.collected && !st.testApplied);
    show('btn-limewater', !noStation && st && st.collected && !st.testApplied);
    show('btn-aircomp',   _active === 'o2');
    show('btn-reset',     !noStation && st && (st.setup || st.collected || st.testApplied));
  }

  // ══ Actions ══════════════════════════════════
  function _doSetup() {
    const st = _st();
    if (!st || st.setup || _busy) return;
    const g = D().GASES[_active];
    if (!_goggles && (_active === 'h2' || _active === 'co2')) {
      _hazard('no_goggles_acid');
      return;
    }
    _busy = true;
    _fxAdd('bubble', () => {
      _busy = false;
      st.setup = true;
      _coach(`Generator ready. ${g.generatorFull} is producing ${g.name}. Now collect the gas.`);
      _updateTools();
      _guideEvent('setup');
      _discover('observe:' + _active);
    });
  }

  function _doCollect() {
    const st = _st();
    if (!st || !st.setup || st.collected || st.collecting || _busy) return;
    st.collecting = true;
    _busy = true;
    const gasId = _active;
    const FILL_SPEED = 0.04; // fraction per tick at 30fps
    const interval = setInterval(() => {
      if (!_cv || !_cv.isConnected) { clearInterval(interval); return; }
      const s = _stations[gasId];
      if (!s || !s.collecting) { clearInterval(interval); return; }
      const step = _instant ? 1 : FILL_SPEED;
      s.fillFrac = Math.min(1, s.fillFrac + step);
      if (s.fillFrac >= 1) {
        clearInterval(interval);
        s.collecting = false;
        s.collected = true;
        _busy = false;
        _coach(`The tube is full of ${D().GASES[gasId].name}. Now apply a test.`);
        _updateTools();
        _guideEvent('collect');
        _discover('collect:' + gasId);
      }
      _draw(0);
    }, _instant ? 0 : 30);
  }

  function _doTest(testId) {
    const st = _st();
    if (!st || !st.collected || _busy) return;
    const gasId = _active;
    const h = D().hazardFor(gasId, testId, _goggles);
    if (h) { _hazard(h); return; }
    if (!_goggles) {
      _hazard('no_goggles_acid');
      return;
    }
    _busy = true;
    const fx = testId === 'limewater' ? 'limewater' : testId === 'lit' ? 'pop' : 'glow';
    _fxAdd(fx, () => {
      _busy = false;
      st.testApplied = testId;
      const result = D().testResult(gasId, testId);
      st.result = result;
      if (result) {
        _coach(result.saw + (result.correct ? ' ✅' : ''));
        if (!result.correct) {
          _discover('wrongtest:' + gasId + ':' + testId);
        } else {
          _discover('result:' + gasId + ':' + testId);
        }
        if (result.sym) _discover('equation:' + gasId);
      }
      _updateTools();
      _guideEvent('test:' + testId);
      _guideEvent('observe');
    });
  }

  function _doAircomp() {
    _hush();
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">🌍</p>
        <p class="lab-rs-kicker">Composition of dry air</p>
        <h2 id="lab-ov-title">What is air made of?</h2>
        <div class="lab-hz-body">
          <section class="lab-hz-sec is-what">
            <h3>By percentage</h3>
            <table class="lab-table">
              <tr><th>Gas</th><th>%</th></tr>
              <tr><td>Nitrogen (N₂)</td><td>78%</td></tr>
              <tr><td>Oxygen (O₂)</td><td>21%</td></tr>
              <tr><td>Argon and other gases</td><td>0.96%</td></tr>
              <tr><td>Carbon dioxide (CO₂)</td><td>0.04%</td></tr>
            </table>
          </section>
          <section class="lab-hz-sec is-exam">
            <h3>Why it matters</h3>
            <p>Only the oxygen (21%) supports burning. Nitrogen is unreactive. Carbon dioxide is only 0.04% — so little that you need a sensitive test (limewater) to detect it.</p>
          </section>
        </div>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Got it</button>
      </div>`, { cls: 'is-done' });
    _discover('aircomp');
  }

  function _doReset() {
    if (!_active) return;
    _stations[_active] = _newStation();
    _coach('Station reset. Set up the generator again when you\'re ready.');
    _updateTools();
    _draw(0);
    _guideEvent('reset');
  }

  // ── Nitrogen test (for the glowing splint goes out discovery) ──
  function _doNitrogenTest() {
    _hush();
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">❌</p>
        <p class="lab-rs-kicker">Nitrogen + glowing splint</p>
        <h2 id="lab-ov-title">What happens in nitrogen?</h2>
        <div class="lab-hz-body">
          <section class="lab-hz-sec is-what"><h3>What you see</h3>
            <p>The glowing splint goes straight out in nitrogen.</p></section>
          <section class="lab-hz-sec is-exam"><h3>What it means</h3>
            <p>Nitrogen does not support burning. The splint going out only shows "not oxygen". It does not tell you which gas you have. You need the limewater test to confirm carbon dioxide (g7s-hd-104).</p></section>
        </div>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Got it</button>
      </div>`, { cls: 'is-done' });
    _discover('result:n2:glowing');
    _guideEvent('test_nitrogen');
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id) {
    const H = D().HAZARDS[id];
    if (!H) return;
    const st = Labs.store(ID);
    st.hazards = st.hazards || {};
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards = (_mission.hazards || 0) + 1;
    _busy = true;
    _fxAdd(H.fx || 'splash', () => {
      _busy = false;
      Labs.hazardCard({
        signs: H.signs,
        title: H.title(),
        happened: H.happened(),
        why: H.why,
        instead: H.instead,
        exam: H.exam(),
        button: 'Got it — try again safely',
        onClose: () => {
          if (id === 'no_goggles_acid' || id === 'no_goggles_h2' || id === 'no_goggles_lit_o2')
            _coach('Tap 🥽 at the top to put on your goggles, then try again.');
          else if (id === 'glowing_in_h2')
            _coach('For hydrogen: hold a LIGHTED splint at the MOUTH of the tube — not inside.');
        },
      });
    });
  }

  // ══ Discoveries ══════════════════════════════
  function _discover(eventId) {
    const disc = _mine(D().DISCOVERIES).find(d => d.unlock === eventId);
    if (!disc) return;
    const st = Labs.store(ID);
    if (!st.disc) st.disc = {};
    if (st.disc[disc.id]) return;
    st.disc[disc.id] = Date.now();
    Labs.persist();
    Labs.discover(ID, disc.id, { title: disc.title, total: _mine(D().DISCOVERIES).length });
    _updateFoundCount();
  }

  function _updateFoundCount() {
    const el = $('lab-found-n');
    if (!el) return;
    const st = Labs.store(ID);
    const found = _mine(D().DISCOVERIES).filter(d => st.disc && st.disc[d.id]).length;
    const total = _mine(D().DISCOVERIES).length;
    el.textContent = found + '/' + total;
  }

  function _discDetail(id) {
    _hush();
    const d = _mine(D().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    const st = Labs.store(ID);
    const found = !!(st.disc && st.disc[id]);
    if (!found) {
      const steps = d.how.map(tok => _stepText(tok).say).filter(Boolean);
      Labs.overlay(`
        <div class="lab-done">
          <p class="lab-done-icon" aria-hidden="true">❔</p>
          <p class="lab-rs-kicker">Locked discovery</p>
          <h2 id="lab-ov-title">Clue: ${esc(d.hint)}</h2>
          <section class="lab-hz-sec is-do lab-done-lesson"><h3>How to find it</h3>
            <ol class="lab-disc-steps">${steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
          </section>
        </div>
        <div class="lab-ov-actions">
          <button type="button" class="lab-btn" data-ov-close>Close</button>
          <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${esc(id)}" data-autofocus>Show me how →</button>
        </div>`, { cls: 'is-done' });
      return;
    }
    const result = d.saw ? d.saw : '';
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${esc(d.icon)}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(result)}</p></section>
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${esc(id)}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  function _discoveryGuide(id) {
    const d = _mine(D().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    _startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how });
  }

  // ══ Guided experiments ════════════════════════
  function _stepText(tok) {
    if (tok === 'goggles') return { say: 'Put on safety goggles.', btn: '🥽 Goggles on' };
    if (tok === 'setup')   return { say: 'Set up the generator for this station.', btn: '⚗️ Set up generator' };
    if (tok === 'collect') return { say: 'Collect the gas until the tube is full.', btn: '🧪 Collect gas' };
    if (tok === 'observe') return { say: 'Watch what happens…' };
    if (tok === 'equation') return { say: 'Read the equation on the result.', btn: '🔢 See equation' };
    if (tok === 'aircomp') return { say: 'Open the air composition display.', btn: '🌍 Air composition' };
    if (tok === 'excess')  return { say: 'Keep bubbling CO₂ through the limewater past the milky point.', btn: '🔄 Excess CO₂' };
    if (tok === 'afterpop') return { say: 'Look at the inside of the tube after the pop.', btn: '💧 After the pop' };
    if (tok === 'test_nitrogen') return { say: 'Test a tube of nitrogen with the glowing splint.', btn: '❌ Test nitrogen' };
    if (tok === 'test:glowing') return { say: 'Apply the glowing splint test.', btn: '🪵 Glowing splint' };
    if (tok === 'test:lit')     return { say: 'Apply the lighted splint at the tube mouth.', btn: '🔥 Lighted splint' };
    if (tok === 'test:limewater') return { say: 'Apply the limewater test.', btn: '🥛 Limewater' };
    if (tok.startsWith('station:')) {
      const id = tok.slice(8);
      const g = D().GASES[id];
      return g ? { say: `Select the ${g.name} station.`, btn: `${g.icon} ${g.name} station` } : { say: tok };
    }
    return { say: tok };
  }

  function _startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(D().GUIDES).find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _guide_step = 0;
    _panel = 'sandbox';
    _renderPanel();
    _guideEnter();
  }

  function _gdef() {
    if (!_guide) return null;
    return _guide.def || _mine(D().GUIDES).find(g => g.id === _guide.id);
  }

  function _guideEnter() {
    _hush();
    const G = _gdef();
    if (!G) return;
    const steps = G.steps || G.how || [];
    let idx = _guide ? _guide.step : 0;
    // Skip 'goggles' if already on, skip station if already active
    while (idx < steps.length) {
      const tok = typeof steps[idx] === 'object' ? steps[idx].on : steps[idx];
      if (tok === 'goggles' && _goggles) { idx++; continue; }
      if (tok.startsWith('station:') && _active === tok.slice(8)) { idx++; continue; }
      break;
    }
    if (_guide) _guide.step = idx;
    if (idx >= steps.length) { _guideDone(); return; }
    const rawStep = steps[idx];
    const tok = typeof rawStep === 'object' ? rawStep.on : rawStep;
    const say = typeof rawStep === 'object' ? rawStep.say : _stepText(tok).say;
    const btn = typeof rawStep === 'object' ? rawStep.btn : _stepText(tok).btn;
    const box = $('lab-guide');
    if (box) {
      const n = steps.length, i = idx;
      box.innerHTML = `<p class="lab-guide-meta">${esc(G.icon || '')} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(say)}</p>
        <div class="lab-guide-actions">
          <button type="button" class="lab-guide-hint-btn" data-guide-hint aria-label="Show me where to go">💡 Hint</button>
          <button type="button" class="lab-link" data-act="guide-stop">Stop guide</button>
        </div>`;
      box.hidden = false;
    }
  }

  function _guideEvent(token) {
    const G = _gdef();
    if (!G) return;
    const steps = G.steps || G.how || [];
    if (!_guide || _guide.step >= steps.length) return;
    const rawStep = steps[_guide.step];
    const on = typeof rawStep === 'object' ? rawStep.on : rawStep;
    if (on === token) { _guide.step++; _guideEnter(); }
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

  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const rawStep = G && (G.steps || G.how || [])[_guide ? _guide.step : 0];
    const on = typeof rawStep === 'object' ? rawStep.on : rawStep;
    if (!on) return;
    let sel = null;
    if (on === 'goggles') sel = '[data-act="goggles"]';
    else if (on.startsWith('station:')) sel = `[data-station="${on.slice(8)}"]`;
    else if (on === 'setup') sel = '[data-act="setup"]';
    else if (on === 'collect') sel = '[data-act="collect"]';
    else if (on.startsWith('test:')) sel = `[data-act="${on}"]`;
    else if (on === 'aircomp') sel = '[data-act="aircomp"]';
    const el = sel && _root.querySelector(sel);
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-act],[data-station]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store(ID);
    if (!G.adhoc) { st.guides = st.guides || {}; st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _mine(D().GUIDES).find(g => !(st.guides && st.guides[g.id]));
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${esc(G.icon || '🧪')}</p>
        <p class="lab-rs-kicker">Experiment complete</p>
        <h2 id="lab-ov-title">${esc(G.title)}</h2>
        <section class="lab-hz-sec is-exam lab-done-lesson"><h3>What you found out</h3><p>${esc(G.lesson)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore freely</button>
        ${G.adhoc
          ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="found" data-autofocus>Back to my discoveries →</button>`
          : next
            ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${esc(next.id)}" data-autofocus>Next: ${esc(next.title)} →</button>`
            : `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>`}
      </div>`, { cls: 'is-done' });
  }

  function _stopGuide(done) {
    _guide = null;
    _guide_step = 0;
    const box = $('lab-guide');
    if (box) box.hidden = true;
    if (!done) _coach('Guide stopped. The bench is all yours.');
  }

  // ══ Missions ═════════════════════════════════
  function _startMission(id) {
    const M = _mine(D().MISSIONS).find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _mission = { id, hazards: 0, success: false };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms) return;
    const M = _mine(D().MISSIONS).find(x => x.id === ms.id);
    if (!M) return;
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(ID);
      const prev = (st.missions || {})[ms.id] || {};
      st.missions = st.missions || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      if (ms.hazards) lines.push(`${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} — no hazards next time for a bonus star.`);
      else lines.push('No safety mistakes! 🥽');
      if (r.firstTry < r.total - 1) lines.push('Answer all but one first try for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => _startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission or hunt for more discoveries.'); } });
    } });
  }

  // ══ Panels ═══════════════════════════════════
  function _renderPanel() {
    const el = $('lab-panel');
    if (!el) return;
    const tabs = _root.querySelectorAll('[role="tab"]');
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.panel === _panel));
    if (_panel === 'sandbox') el.innerHTML = _sandboxHTML();
    else if (_panel === 'missions') el.innerHTML = _missionsHTML();
    else el.innerHTML = _foundHTML();
    _updateFoundCount();
  }

  function _sandboxHTML() {
    const st = Labs.store(ID);
    const doneGuides = _mine(D().GUIDES).filter(G => st.guides && st.guides[G.id]).length;
    const hasAny = doneGuides > 0 || (st.disc && Object.keys(st.disc).length > 0);
    const guides = _mine(D().GUIDES);
    const missions = _mine(D().MISSIONS);
    const st2 = _missions_star_html(st, missions);
    return `<div class="lab-start">
      <p class="lab-start-q">What would you like to do?</p>
      <ol class="lab-start-steps">
        <li>Select a gas station (O₂, CO₂ or H₂)</li>
        <li>Set up the generator</li>
        <li>Collect the gas</li>
        <li>Apply the correct test and observe the result</li>
      </ol>
      <p class="lab-start-sub">Guided experiments</p>
      <div class="lab-start-guides">${guides.map(G => `
        <button type="button" class="lab-start-guide ${st.guides && st.guides[G.id] ? 'is-done' : 'is-next'}" data-guide="${esc(G.id)}">
          <span aria-hidden="true">${esc(G.icon)}</span>
          <span>${esc(G.title)}</span>
          <span class="lab-start-arrow">→</span>
        </button>`).join('')}
      </div>
      <p class="lab-start-sub">Missions</p>
      <div class="lab-start-guides">${missions.map(M => {
        const ms = (st.missions || {})[M.id];
        const stars = ms ? '⭐'.repeat(ms.stars) : '';
        return `<button type="button" class="lab-start-guide" data-mission="${esc(M.id)}">
          <span aria-hidden="true">${esc(M.icon)}</span>
          <span>${esc(M.title)}${stars ? ' ' + stars : ''}</span>
          <span class="lab-start-arrow">→</span>
        </button>`;
      }).join('')}
      </div>
    </div>`;
  }

  function _missions_star_html(st, missions) { return ''; }

  function _missionsHTML() {
    const missions = _mine(D().MISSIONS);
    const st = Labs.store(ID);
    const ms = _mission;
    if (ms) {
      const M = missions.find(x => x.id === ms.id);
      if (!M) return '';
      return `<div class="lab-mission-active">
        <p class="lab-mission-blurb">${esc(M.blurb)}</p>
        <p class="lab-mission-hint">Apply the tests to identify the gases, then tap "Answer questions".</p>
        <button type="button" class="lab-btn lab-btn-primary" data-act="quiz">Answer questions</button>
        <button type="button" class="lab-link" data-act="exit-mission" style="min-height:44px">Exit mission</button>
      </div>`;
    }
    return `<div class="lab-mission-list">${missions.map(M => {
      const saved = (st.missions || {})[M.id];
      return `<div class="lab-mission-card">
        <div class="lab-mission-head">
          <span class="lab-mission-icon" aria-hidden="true">${esc(M.icon)}</span>
          <div>
            <p class="lab-mission-title">${esc(M.title)}</p>
            ${saved ? `<p class="lab-mission-stars">${'⭐'.repeat(saved.stars)}</p>` : ''}
          </div>
        </div>
        <p class="lab-mission-blurb">${esc(M.blurb)}</p>
        <button type="button" class="lab-btn lab-btn-primary" data-mission="${esc(M.id)}">
          ${saved ? 'Replay' : 'Start'} →
        </button>
      </div>`;
    }).join('')}</div>`;
  }

  function _foundHTML() {
    const st = Labs.store(ID);
    const discs = _mine(D().DISCOVERIES);
    const found = discs.filter(d => st.disc && st.disc[d.id]).length;
    return `<div class="lab-found-header">${found}/${discs.length} discoveries</div>
      <div class="lab-found-grid">${discs.map(d => {
        const isFound = !!(st.disc && st.disc[d.id]);
        return `<button type="button" class="lab-found-card ${isFound ? 'is-found' : ''}" data-disc="${esc(d.id)}">
          <span class="lab-found-icon" aria-hidden="true">${isFound ? esc(d.icon) : '🔒'}</span>
          <span class="lab-found-title">${isFound ? esc(d.title) : esc(d.hint)}</span>
        </button>`;
      }).join('')}</div>`;
  }

  // ══ Intro / Help ═════════════════════════════
  function _intro() {
    const st = Labs.store(ID);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">💨</p>
        <p class="lab-rs-kicker">Welcome to</p>
        <h2 id="lab-ov-title">Gas Tests</h2>
        <div class="lab-hz-body">
          <section class="lab-hz-sec is-what"><h3>What you will do</h3>
            <p>Collect three gases — oxygen, carbon dioxide and hydrogen — and test each one with the right tool: a glowing splint, limewater or a lighted splint.</p></section>
          <section class="lab-hz-sec is-exam"><h3>In the science exam</h3>
            <p>You need to know all three gas tests: which gas, which test, and what you see.</p></section>
        </div>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Explore freely</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${esc(_mine(D().GUIDES)[0].id)}" data-autofocus>Show me how →</button>
      </div>`, { cls: 'is-done' });
    st.intro = true;
    Labs.persist();
  }

  function _help() {
    _hush();
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">💨</p>
        <p class="lab-rs-kicker">How the bench works</p>
        <h2 id="lab-ov-title">Gas Tests</h2>
        <div class="lab-hz-body">
          <section class="lab-hz-sec is-what"><h3>The three stations</h3>
            <ul>
              <li><b>O₂</b> — oxygen from hydrogen peroxide + MnO₂ catalyst. Test: glowing splint (relights).</li>
              <li><b>CO₂</b> — carbon dioxide from marble chips + acid. Test: limewater (turns milky).</li>
              <li><b>H₂</b> — hydrogen from zinc + acid. Test: lighted splint at the mouth (squeaky pop).</li>
            </ul>
          </section>
          <section class="lab-hz-sec"><h3>Steps for each station</h3>
            <ol>
              <li>Put on goggles.</li>
              <li>Select a station.</li>
              <li>Set up the generator.</li>
              <li>Collect the gas.</li>
              <li>Apply the correct test.</li>
            </ol>
          </section>
          <section class="lab-hz-sec is-exam"><h3>Key fact</h3>
            <p>Glowing splint → oxygen. Limewater → CO₂. Lighted splint → hydrogen. Do not swap them.</p>
          </section>
        </div>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Got it</button>
      </div>`, { cls: 'is-done' });
  }

  // ══ FX queue ═════════════════════════════════
  function _fxAdd(name, cb) {
    const dur = { bubble: 0.9, glow: 0.8, pop: 0.75, limewater: 1.0, splash: 0.8 };
    const ms = _instant ? 0 : (dur[name] || 0.8) * 1000;
    _fx.push({ name, t: 0, dur: ms, cb });
    if (!_raf) _start();
  }

  // ══ Animation ════════════════════════════════
  function _start() {
    if (_raf) return;
    _last = 0;
    const loop = ts => {
      if (!_cv || !_cv.isConnected || (typeof currentScreen !== 'undefined' && currentScreen !== 'labs')) {
        _hush(); _raf = 0; return;
      }
      const dt = _last ? Math.min((ts - _last) / 1000, 0.1) : 0;
      _last = ts;
      _step(dt);
      _draw(dt);
      _raf = requestAnimationFrame(loop);
    };
    _raf = requestAnimationFrame(loop);
  }

  function _stop() {
    if (_raf) { cancelAnimationFrame(_raf); _raf = 0; }
    _last = 0;
  }

  function _step(dt) {
    const calm = Labs.calm();
    // FX
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += calm ? f.dur : dt * 1000;
      if (f.t >= f.dur) { const cb = f.cb; _fx.splice(i, 1); if (cb) cb(); }
    }
    // Bubble particles (not in calm mode)
    if (!calm) {
      // Create bubbles for collecting stations
      D().GAS_ORDER.forEach(id => {
        const s = _stations[id];
        if (!s) return;
        if ((s.setup && !s.collected) || s.collecting) {
          if (Math.random() < 0.4) {
            const x = _stationX(id);
            _bubbles.push({ id, x: x + (Math.random() - 0.5) * 10, y: _H * 0.75, r: 2 + Math.random() * 2,
                            vx: (Math.random() - 0.5) * 0.5, vy: -20 - Math.random() * 10, life: 1 });
          }
        }
      });
      for (let i = _bubbles.length - 1; i >= 0; i--) {
        const b = _bubbles[i];
        b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt * 1.5;
        if (b.life <= 0 || b.y < _H * 0.05) _bubbles.splice(i, 1);
      }
    } else {
      _bubbles = [];
    }
  }

  // ── Canvas drawing ──────────────────────────
  function _stationX(id) {
    const n = D().GAS_ORDER.length;
    const i = D().GAS_ORDER.indexOf(id);
    return Math.round(_W * (i + 0.5) / n);
  }

  function _draw(dt) {
    if (!_cx) return;
    const calm = Labs.calm();
    const cx = _cx, W = _W, H = _H;

    // Background
    const bg = cx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, (_colors || {}).top || '#EEF3F8');
    bg.addColorStop(1, (_colors || {}).bot || '#D8E5EF');
    cx.fillStyle = bg;
    cx.fillRect(0, 0, W, H);

    // Bench surface
    cx.fillStyle = (_colors || {}).bench || '#B9C8D2';
    cx.fillRect(0, H * 0.85, W, H * 0.15);

    const n = D().GAS_ORDER.length;
    const colW = W / n;

    // Draw each station
    D().GAS_ORDER.forEach((id, i) => {
      const g = D().GASES[id];
      const s = _stations[id];
      if (!s) return;
      const cx0 = colW * i + colW / 2;
      const isActive = _active === id;

      // Column highlight when active
      if (isActive) {
        cx.fillStyle = 'rgba(255,255,255,0.12)';
        cx.fillRect(colW * i, 0, colW, H * 0.85);
      }

      // Gas label at top
      cx.fillStyle = isActive ? '#1A3A5C' : '#4A6070';
      cx.font = `bold ${Math.round(W * 0.028)}px sans-serif`;
      cx.textAlign = 'center';
      cx.fillText(g.name, cx0, H * 0.07);
      cx.font = `${Math.round(W * 0.022)}px sans-serif`;
      cx.fillText(g.formula, cx0, H * 0.12);

      // Generator flask (when setup)
      const flaskX = cx0, flaskY = H * 0.72, flaskR = Math.min(colW * 0.22, H * 0.1);
      if (s.setup || s.collecting || s.collected) {
        // Flask body
        cx.beginPath();
        cx.ellipse(flaskX, flaskY, flaskR, flaskR * 0.7, 0, 0, Math.PI * 2);
        cx.fillStyle = 'rgba(200,230,240,0.7)';
        cx.fill();
        cx.strokeStyle = (_colors || {}).glass || 'rgba(50,70,90,.55)';
        cx.lineWidth = 1.5;
        cx.stroke();
        // Reaction contents (bubbling color)
        cx.beginPath();
        cx.ellipse(flaskX, flaskY + flaskR * 0.1, flaskR * 0.8, flaskR * 0.5, 0, 0, Math.PI * 2);
        cx.fillStyle = g.stationColor || '#B5D4E8';
        cx.fill();
        // Flask neck
        cx.fillStyle = 'rgba(200,230,240,0.7)';
        cx.strokeStyle = (_colors || {}).glass || 'rgba(50,70,90,.55)';
        cx.lineWidth = 1.5;
        cx.fillRect(flaskX - flaskR * 0.15, flaskY - flaskR * 0.7, flaskR * 0.3, flaskR * 0.5);
        cx.strokeRect(flaskX - flaskR * 0.15, flaskY - flaskR * 0.7, flaskR * 0.3, flaskR * 0.5);
      } else {
        // Empty flask placeholder
        cx.beginPath();
        cx.ellipse(flaskX, flaskY, flaskR, flaskR * 0.7, 0, 0, Math.PI * 2);
        cx.fillStyle = 'rgba(210,220,228,0.4)';
        cx.fill();
        cx.strokeStyle = 'rgba(100,130,160,0.4)';
        cx.lineWidth = 1;
        cx.stroke();
        // "Set up" label
        cx.fillStyle = 'rgba(80,110,140,0.6)';
        cx.font = `${Math.round(W * 0.019)}px sans-serif`;
        cx.fillText('Set up', flaskX, flaskY + 4);
      }

      // Collection tube
      const tubeX = cx0, tubeTop = H * 0.2, tubeH = H * 0.42, tubeW = Math.min(colW * 0.2, 24);
      // Tube outline
      cx.fillStyle = 'rgba(200,225,240,0.35)';
      cx.strokeStyle = (_colors || {}).glass || 'rgba(50,70,90,.55)';
      cx.lineWidth = 1.5;
      cx.beginPath();
      cx.roundRect(tubeX - tubeW / 2, tubeTop, tubeW, tubeH, [0, 0, tubeW / 2, tubeW / 2]);
      cx.fill(); cx.stroke();
      // Gas fill
      if (s.fillFrac > 0) {
        const fillH = tubeH * s.fillFrac;
        cx.fillStyle = g.color || '#DFF0FF';
        cx.beginPath();
        if (s.fillFrac >= 1) {
          cx.roundRect(tubeX - tubeW / 2 + 1, tubeTop + 1, tubeW - 2, tubeH - 2, [0, 0, tubeW / 2 - 1, tubeW / 2 - 1]);
        } else {
          cx.rect(tubeX - tubeW / 2 + 1, tubeTop + tubeH - fillH, tubeW - 2, fillH - 1);
        }
        cx.fill();
      }
      // Result indicator
      if (s.testApplied && s.result) {
        const res = s.result;
        const col = res.fx === 'relight' ? '#FF8C00' : res.fx === 'pop' ? '#FF6600' : res.fx === 'milky' ? '#E8F4E8' : res.fx === 'out' ? '#888' : '#CCC';
        if (res.fx === 'relight' || res.fx === 'pop') {
          // Flame glow
          cx.beginPath();
          cx.arc(tubeX, tubeTop - 8, 12, 0, Math.PI * 2);
          cx.fillStyle = 'rgba(255,140,0,0.7)';
          cx.fill();
          cx.fillStyle = '#FF8C00';
          cx.font = `${Math.round(W * 0.04)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText(res.fx === 'pop' ? '💥' : '🔥', tubeX, tubeTop - 4);
        }
        if (res.fx === 'milky') {
          // Milky overlay in tube
          cx.fillStyle = 'rgba(240,245,240,0.85)';
          cx.beginPath();
          cx.roundRect(tubeX - tubeW / 2 + 1, tubeTop + 1, tubeW - 2, tubeH - 2, [0, 0, tubeW / 2 - 1, tubeW / 2 - 1]);
          cx.fill();
          cx.fillStyle = '#5A8A5A';
          cx.font = `${Math.round(W * 0.019)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText('Milky!', tubeX, tubeTop + tubeH / 2);
        }
        if (res.fx === 'out') {
          cx.fillStyle = '#777';
          cx.font = `${Math.round(W * 0.019)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText('Out ✗', tubeX, tubeTop - 6);
        }
        if (res.fx === 'danger') {
          cx.fillStyle = '#C00';
          cx.font = `${Math.round(W * 0.024)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText('⚠️', tubeX, tubeTop - 6);
        }
        if (res.fx === 'nothing') {
          cx.fillStyle = '#888';
          cx.font = `${Math.round(W * 0.019)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText('No change', tubeX, tubeTop - 6);
        }
        if (res.fx === 'clear') {
          cx.fillStyle = '#5A7A5A';
          cx.font = `${Math.round(W * 0.019)}px sans-serif`;
          cx.textAlign = 'center';
          cx.fillText('Clear ✗', tubeX, tubeTop - 6);
        }
      }

      // Test label below tube
      if (s.testApplied) {
        const T = D().TESTS[s.testApplied];
        cx.fillStyle = s.result && s.result.correct ? '#1A6A2A' : '#8A4A1A';
        cx.font = `${Math.round(W * 0.019)}px sans-serif`;
        cx.textAlign = 'center';
        cx.fillText(T ? T.name : s.testApplied, cx0, tubeTop + tubeH + 14);
      }
    });

    // Active station indicator on bench
    if (_active) {
      const i = D().GAS_ORDER.indexOf(_active);
      const ax = colW * i + colW / 2;
      cx.fillStyle = 'rgba(50,100,180,0.25)';
      cx.fillRect(colW * i + 2, H * 0.85, colW - 4, 4);
    }

    // Bubbles
    _bubbles.forEach(b => {
      const g = D().GASES[b.id];
      cx.beginPath();
      cx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      cx.fillStyle = (g ? g.bubbleColor : '#CCE8F8') + Math.round(b.life * 0xCC).toString(16).padStart(2, '0');
      cx.fill();
    });
  }

  // ══ Test hooks (spec §5) ═════════════════════
  function _test({ instant }) {
    _instant = !!instant;
  }
  function _tick(seconds) {
    _step(seconds);
  }
  function _debug() {
    const st = Labs.store(ID);
    return {
      grade: _g(), active: _active, goggles: _goggles,
      stations: Object.fromEntries(D().GAS_ORDER.map(id => [id, _stations[id]])),
      guide: _guide ? { id: _guide.id, step: _guide.step } : null,
      mission: _mission ? { id: _mission.id } : null,
      disc: Object.keys(st.disc || {}),
    };
  }

  return { mount, unmount, _test, _tick, _debug };
})();

if (typeof window !== 'undefined') window.LabGastests = LabGastests;
