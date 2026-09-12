'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Measurement Lab (Physics, NCE Grade 9 · P1 Measurements)
//
//  A shelf of instruments - metre rule, vernier calipers, micrometer,
//  measuring cylinder, stopwatch, two thermometers, a balance - and things to
//  measure. The scale is drawn on the canvas where the data says it is; the
//  pupil zooms in, reads it and types the reading. Sandbox, guided
//  experiments, three Missions and a collection of Discoveries.
//
//  ⚠ Every true value, precision, range and mistake comes from
//    lab_measure_data.js (LabMeasureData). This file only draws scales and
//    asks LabMeasureData.judge() whether a reading is right. If a reading is
//    wrong on screen, fix the DATA, not the drawing.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the stopwatch still stops at the right
//    time and every scale is still drawn, but nothing moves and effects apply
//    at once.
//  ⚠ Every control is a real <button>; there is no drag here at all, so a tap
//    is the one way everything works.
//  ⚠ GRADE 4 (PSAC) is a separate set in the same bench: its own shelf (ruler,
//    tape, jug, thermometer, kitchen scale, stopwatch), guides, missions and
//    discoveries, chosen by Labs.grade() through LabMeasureData.forGrade(). A
//    Grade 4 reading is a number AND a unit; 🔊 reads the assistant and the
//    guide box aloud (never by itself), and speech stops on every step,
//    overlay, unmount and screen change. Progress shares Labs.store('measure')
//    but never an id: every Grade 4 id starts g4_ and the welcome flag is
//    `intro4`, so the two grades cannot overwrite each other.
//  ⚠ GRADES 7 AND 8 are two more sets on one shelf (group g78): a measuring
//    cylinder and a balance shared by both, a block ruler (Grade 7) and a
//    density bench (Grade 8). Like Grade 4 a reading is a number AND a unit;
//    unlike it, its own cards (parallax78, bubble78, flip8…), ids g7_/g8_ and
//    welcome flags intro7/intro8. The cylinder's fourth tool taps a bubble
//    free, or lifts the cylinder - and drops it (a hazard).
// ══════════════════════════════════════════════
const LabMeasure = (() => {
  const LAB = 'measure';
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { flash: 0.9, burst: 1.2, splash: 1.0, crack: 0.9 };
  const MAX_ZOOM = 3;
  const OK_C = '#23734A', BAD_C = '#C0262D';

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const DATA = () => LabMeasureData;

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _inst = null, _spec = null, _zoom = 1, _eye = 'level', _align = 'end', _tared = false, _timed = false, _tapped = false;
  let _clock = { run: false, t: 0, target: 0, speed: 1 };
  let _phase = 0, _marks = [], _hit = false, _map = null, _burst = 0;
  let _panel = 'sandbox', _group = 'length', _mission = null, _guide = null;
  let _rows = [], _log = [], _fx = [], _busy = false, _instant = false, _colors = null, _tipIdx = -1;
  let _stGrade = null, _trial = -1, _readTrial = -1, _trialVals = [], _crack = 0, _splash = 0, _bk = null, _talking = false, _obs = null;

  const _I = () => (_inst ? DATA().INSTRUMENTS[_inst] : null);
  const _S = () => (_spec ? DATA().SPECIMENS[_spec] : null);
  const _opts = () => ({ align: _align, eye: _eye, tared: _tared, timed: _timed, tapped: _tapped, trial: Math.max(0, _trial) });
  // The grade the lab is used at (Labs.grade(); a Grade 5 pupil arrives as 4).
  const _g = () => { const g = typeof Labs.grade === 'function' ? Number(Labs.grade()) : 9; return DATA().GRADES.includes(g) ? g : 9; };
  // _kid: a reading is a number AND a unit, with 🔊 (Grades 4, 7, 8).
  // _mid: the lower-secondary sets, Grades 7 and 8.
  const _kid = () => _g() < 9;
  const _mid = () => _g() === 7 || _g() === 8;
  const _units = () => DATA().UNIT_CHOICES_BY_GRADE[_g()] || DATA().UNIT_CHOICES;
  // A Grade 7/8 card for each mistake judge() can name.
  const CARD78 = { apparent: 'parallax78', top: 'top78', level: 'level78', bubble: 'bubble78', raw: 'raw78', area: 'area78', sum: 'area78',
                   flip: 'flip8', dlevel: 'level8', total: 'total8' };
  const _forG = list => DATA().forGrade(list, _g());
  const _introKey = () => (_g() === 9 ? 'intro' : 'intro' + _g());
  const _markS = I => DATA().fmt(I.step, I.dp) + ' ' + I.unit;
  const _m = () => DATA().measure(_inst, _spec, _opts());
  const _kind = () => (_I() ? _I().kind : null);

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-measure">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${_kid() ? `Science · Grade ${esc(_g())}` : 'Physics · Grade 9'}</span><h1>Measurement Lab</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the Measurement Lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-measure-stage">
            <canvas id="lab-canvas" role="img" aria-label="The measuring instrument, drawn to scale"></canvas>
            <div class="lab-chip lab-ph" id="lab-measure-chip"></div>
            <div class="lab-status" id="lab-status"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            ${_kid() ? '<button type="button" class="lab-coach-tip" data-act="say-coach" aria-label="Read this out loud">🔊</button>' : ''}
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <p class="lab-task-strip" id="lab-measure-strip">Pick an instrument from the shelf → then measure the specimen.</p>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools">
            <button type="button" class="lab-tool" data-act="zin"><span aria-hidden="true">🔍</span>Zoom in</button>
            <button type="button" class="lab-tool" data-act="zout"><span aria-hidden="true">🔎</span>Zoom out</button>
            <button type="button" class="lab-tool" data-act="eye"><span aria-hidden="true">👁️</span><b id="lab-measure-eye">Eye: level</b></button>
            <button type="button" class="lab-tool" data-act="ctx"><span aria-hidden="true" id="lab-measure-ctx-ico">📖</span><b id="lab-measure-ctx">How to read</b></button>
          </div>
          <form class="lab-measure-read" id="lab-measure-read" autocomplete="off">
            <label for="lab-measure-input">${_kid() ? 'Your reading: number and unit' : 'Your reading'}</label>
            <div class="lab-measure-row">
              <button type="button" class="lab-btn" data-act="neg" id="lab-measure-neg" aria-label="Make the reading negative" hidden>±</button>
              <input id="lab-measure-input" class="lab-measure-input" type="text" inputmode="decimal" enterkeyhint="done" spellcheck="false">
              ${_kid() ? `<select id="lab-measure-uselect" class="lab-measure-uselect" aria-label="Unit"><option value="">unit?</option>${_units().map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join('')}</select>` : ''}
              <span class="lab-measure-unit" id="lab-measure-unit"${_kid() ? ' hidden' : ''}></span>
              <button type="button" class="lab-btn lab-btn-primary" data-act="check">Check</button>
            </div>
            <p class="lab-hint" id="lab-measure-hint"></p>
          </form>
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
    if (_stGrade !== _g()) _reset();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _readouts();
    const st = Labs.store(LAB);
    const back = _forG(DATA().GUIDES).some(G => st.guides[G.id]);
    if (!st[_introKey()]) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach(_kid() ? 'Back on your mission. Carry on!' : 'Back on your mission - carry on where you left off.');
    else if (_kid()) _coach(back ? 'Welcome back! Pick an experiment or a mission. Or measure anything on the shelf.'
      : '👋 New here? Pick a guided experiment below. I will show you what to tap.');
    else _coach(back
      ? 'Welcome back! Pick a guided experiment or a mission below - or measure anything you like from the shelf.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    // Leaving the Labs screen stops speech and the loop; coming back restarts it.
    if (_obs) _obs.disconnect();
    const scr = root.closest('.screen');
    if (scr && typeof MutationObserver !== 'undefined') {
      _obs = new MutationObserver(() => {
        if (scr.classList.contains('hidden')) { _hush(); _stop(); }
        else if (_root && _cv && _cv.isConnected && !_raf) _start();
      });
      _obs.observe(scr, { attributes: true, attributeFilter: ['class'] });
    }
    _start();
  }

  // Another grade is another bench: its own shelf, guides, missions and notebook.
  function _reset() {
    _stGrade = _g();
    _inst = null; _spec = null; _zoom = 1; _eye = 'level'; _align = 'end'; _tared = false; _timed = false; _tapped = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _marks = []; _hit = false; _burst = 0; _crack = 0; _splash = 0; _fx = []; _busy = false;
    _panel = 'sandbox'; _group = _stGrade === 9 ? 'length' : _stGrade === 4 ? 'g4' : 'g78'; _mission = null; _guide = null;
    _rows = []; _log = []; _tipIdx = -1; _trial = -1; _readTrial = -1; _trialVals = [];
  }

  function unmount() {
    _hush();
    if (_obs) { _obs.disconnect(); _obs = null; }
    _stop();
    _root = null; _cv = null; _cx = null; _map = null;
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), bench: v('--lab-bench', '#B9CAC6'),
                glass: v('--lab-glass', 'rgba(34,58,68,.62)'), hi: v('--lab-glass-hi', 'rgba(255,255,255,.75)'),
                ink: v('--lab-ink', '#14211D'), muted: v('--lab-muted', '#56665F') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(390, Math.max(270, w * 0.78)));
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
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-hint]')) { _guideHint(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const ch = e.target.closest('[data-choose]');
      if (ch) { choose(ch.dataset.choose); return; }
      const it = e.target.closest('[data-inst]');
      if (it) { selectInstrument(it.dataset.inst); _showStage(); return; }
      const sp = e.target.closest('[data-spec]');
      if (sp) { selectSpecimen(sp.dataset.spec); _showStage(); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const g = e.target.closest('[data-group]');
      if (g) { _group = g.dataset.group; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) startMission(m.dataset.mission);
    };
    const form = $('lab-measure-read');
    if (form) form.onsubmit = e => { e.preventDefault(); check(); };
    const inp = $('lab-measure-input');
    if (inp) inp.oninput = () => inp.classList.remove('is-right', 'is-wrong');
    const us = $('lab-measure-uselect');
    if (us && inp) us.onchange = () => inp.classList.remove('is-right', 'is-wrong');
  }

  // On a phone the shelf sits below the stage: bring the scale back into view
  // so the pupil sees what their tap did.
  function _showStage() {
    const z = $('lab-measure-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) speak(el.textContent); break; }
      case 'say-guide': { const el = _root && _root.querySelector('#lab-guide .lab-guide-say'); if (el) speak(el.textContent); break; }
      case 'zin': zoomIn(); break;
      case 'zout': zoomOut(); break;
      case 'eye': _cycleEye(); break;
      case 'ctx': _ctx(); break;
      case 'check': check(); break;
      case 'neg': _negate(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free measuring. The shelf is all yours.'); _renderPanel(); break;
      case 'guide-stop': _stopGuide(false); break;
    }
  }

  // ══ Coach ════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (!el) return;
    if (el.textContent !== text) _hush();
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = DATA().FACTS_BY_GRADE[_g()] || DATA().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Read aloud (Grade 4; never auto-plays) ═══
  const _synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  // Emoji and arrows would be read out by their names ("ruler", "right arrow").
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

  // ══ Choosing and setting up ══════════════════
  function _clearReading() {
    _marks = []; _hit = false;
    const inp = $('lab-measure-input');
    if (inp) { inp.value = ''; inp.classList.remove('is-right', 'is-wrong'); }
    const us = $('lab-measure-uselect');
    if (us) us.value = '';
  }

  function selectInstrument(id, quiet) {
    const I = DATA().INSTRUMENTS[id];
    if (!I || _busy || !_forG([I]).length) return;
    _inst = id; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false; _tapped = false;
    if (I.grades) _align = 'end';
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _trial = -1; _readTrial = -1; _trialVals = [];
    _group = I.group;
    _clearReading();
    if (!quiet) {
      _coach(I.grades ? `${I.name}: ${I.prec}. ${I.hello}`
        : `${I.name}: reads to ${I.prec}. ${I.worn ? 'It is an OLD one - check its zero first. ' : ''}Now pick something to measure.`);
      _renderPanel();
    }
    _readouts();
    if (!quiet) _guideEvent('inst:' + id);
  }

  function selectSpecimen(id) {
    const D = DATA(), I = _I();
    if (_busy) return;
    if (!I) { _coach(_kid() ? 'Pick a tool first.' : 'Pick an instrument first.'); return; }
    if (!D.specimensFor(_inst, _g()).includes(id)) return;
    const m = D.measure(_inst, id, Object.assign(_opts(), { timed: false, tapped: false }));
    if (!m.ok && m.why === 'range') { _coach(m.msg); return; }
    _spec = id; _timed = false; _tapped = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _trial = -1; _readTrial = -1; _trialVals = [];
    _clearReading();
    if (!m.ok && m.why === 'burst') { _burstHazard(); return; }
    if (!m.ok && m.why === 'hazard') { _hazard4(m.hazard); return; }
    const S = _S();
    if (m.ok) _coach(id === 'closed' ? `Nothing to measure: ${S.label[I.quantity]}. ${I.kind === 'balance' ? 'What does it read?' : 'Does it read zero?'}` : `Measuring ${S.label[I.quantity]}. ${I.how}`);
    else _coach(m.msg);
    if (I.kind === 'balance' && id !== 'closed' && !_tared) _coach(`The ${S.name.toLowerCase()} is on the pan. ${I.how}`);
    if (m.ok && S.bubble) _coach(`Measuring ${S.label[I.quantity]}. Look closely: an air bubble is stuck to it.`);
    if (I.kind === 'dial' && !_tared) _coach(`The ${S.name.toLowerCase()} is on the scale. But did the pointer start at 0?`);
    _renderPanel();
    _readouts();
    _guideEvent('spec:' + id);
  }

  function zoomIn() {
    if (!_canZoom()) {
      _coach(!_inst ? (_kid() ? 'Pick a tool first.' : 'Pick an instrument first.')
        : _kind() === 'balance' ? 'The balance shows its reading as digits - there is nothing to zoom.'
        : 'Nothing to zoom: every number you need is on the picture.');
      return;
    }
    if (_zoom < MAX_ZOOM) _zoom++;
    else _coach('That is as close as it goes.');
    _readouts();
    _guideEvent('zoom');
  }
  function zoomOut() {
    if (!_canZoom() || _zoom <= 1) return;
    _zoom--;
    _readouts();
  }
  const _canZoom = () => !!_inst && !['balance', 'density', 'block'].includes(_kind());

  function setEye(pos) {
    if (_kind() !== 'cylinder') { _coach(_kid() && !_mid() ? 'Move your eye when you read the measuring jug.' : 'Move your eye when you read the measuring cylinder - that is where parallax shows most.'); return; }
    _eye = pos;
    _clearReading();
    if (_kid()) _coach(pos === 'level' ? 'Eye level with the liquid. Now read the mark.' : `Eye ${pos} the liquid. Follow the dashed line to the scale.`);
    else _coach(pos === 'level' ? 'Eye level with the bottom of the meniscus - looking straight at the scale. Now read it.'
                                : `Eye ${pos} the level. Follow the dashed line: where it crosses the scale is what you would read from there.`);
    _readouts();
    _guideEvent('eye:' + pos);
  }
  function _cycleEye() {
    if (_kind() !== 'cylinder') { setEye('level'); return; }
    setEye(_eye === 'level' ? 'above' : _eye === 'above' ? 'below' : 'level');
  }

  // Grade 9 lines the object up with the 1 cm mark ('mark'); Grade 4 with 0 ('zero').
  function setAlign(a) {
    const I = _I();
    if (!I || I.kind !== 'rule' || I.endMm === 0) return;
    _align = a;
    _clearReading();
    if (I.endMm != null) _coach(a === 'zero' ? 'The end of the object is on 0 now. Read the mark at the other end.'
                                             : 'The object is pushed against the end of the ruler. Where is the 0 mark?');
    else _coach(a === 'mark' ? 'The object now starts at the 1.0 cm mark. Read its far end and subtract 1.0 cm.'
                             : 'The object is pushed against the end of the ruler. Look closely at that end…');
    _readouts();
    _guideEvent('align:' + a);
  }

  function tare() {
    if (_kind() === 'dial') {
      const S = _S();
      if (_tared && S) { _coach('The scale is already set to 0.'); return; }
      _spec = null; _tared = true;
      _clearReading();
      _coach(S ? `I took the ${S.name.toLowerCase()} off and set the pointer to 0. Now put it back on.` : 'The pointer is on 0 now. Put something on the scale.');
      _renderPanel();
      _readouts();
      _guideEvent('tare');
      return;
    }
    if (_kind() !== 'balance') return;
    if (_spec && _spec !== 'closed') { _coach(`Take the ${_S().name.toLowerCase()} off first - tap “Nothing” so the pan is empty, then zero it.`); return; }
    _tared = true;
    _clearReading();
    _coach('Zeroed: the empty balance now reads 0.0 g. Anything you put on it is read directly.');
    _readouts();
    _guideEvent('tare');
  }

  // Each Start is one more try: a thing with `trials` (the Grade 4 ball) takes
  // the time of that try, so repeated timings can disagree.
  function startTiming() {
    if (_kind() !== 'stopwatch') return;
    const S = _S();
    if (!S) { _coach('Pick something to time first.'); return; }
    if (_clock.run) { _coach(_kid() ? 'It is timing now. Watch it.' : 'It’s already timing - watch it.'); return; }
    _timed = false;
    _clearReading();
    _trial++;
    _clock = { run: true, t: 0, target: S.trials ? S.trials[_trial % S.trials.length] : S.time, speed: S.speed || 1 };
    _coach(S.trials ? `Go! Try ${_trial + 1}: the ball is rolling…` : S.swings ? 'Go! Start as the bob is let go… the stopwatch stops after 10 swings.' : 'Go! The stopwatch stops when the water boils.');
    _readouts();
    if (_instant || Labs.calm()) _finishTiming();
  }
  function _finishTiming() {
    _clock.run = false; _clock.t = _clock.target; _timed = true;
    _coach(_kid() ? 'Stopped! Read where the red hand points. Type the seconds and pick the unit.'
                  : 'Stopped. Read the small minute dial and the big second hand, then type the time in SECONDS.');
    _readouts();
    _guideEvent('start');
  }

  // The Grade 4 thermometer's glass is thin: stirring with it snaps it.
  function stir() {
    const I = _I();
    if (!I || I.kind !== 'thermometer' || !I.stir || _busy) return;
    if (!_spec) { _coach('Put the thermometer in some water first.'); return; }
    _hazard4('snapped');
  }

  // Grades 7-8: tapping the glass frees a bubble clinging to the solid.
  function tapGlass() {
    const S = _S();
    if (_kind() !== 'cylinder' || !S || !S.bubble || _busy) return;
    if (_tapped) { _coach('The bubble has gone already. Read the level.'); return; }
    _tapped = true;
    _clearReading();
    _coach('Tap, tap. The bubble floated up and popped, and the water level fell a little. Now read it.');
    _readouts();
    _guideEvent('tap');
  }
  // Grades 7-8: lifting the cylinder to your eye - it slips and smashes.
  function liftCylinder() {
    if (_kind() !== 'cylinder' || !_spec || _busy) return;
    _hazard4('cyl_dropped');
  }
  const _bubbleOn = () => { const S = _S(); return !!(S && S.bubble && !_tapped); };

  // The fourth tool does whatever this instrument needs.
  function _ctxDef() {
    const k = _kind(), I = _I();
    if (k === 'cylinder' && _mid()) return _bubbleOn() ? { ico: '👆', label: 'Tap the glass' } : { ico: '✋', label: 'Lift it to read', off: !_spec };
    if (k === 'block' || k === 'density') return { ico: '📖', label: 'How to work it out' };
    if (k === 'rule' && I.endMm === 0) return { ico: '📖', label: 'How to read' };
    if (k === 'rule' && I.endMm != null) return { ico: '📍', label: _align === 'end' ? 'Start: ruler end' : 'Start: 0 mark' };
    if (k === 'rule') return { ico: '📍', label: _align === 'end' ? 'Start: ruler end' : 'Start: 1 cm mark' };
    if (k === 'vernier' || k === 'micrometer') return { ico: '🤏', label: 'Close the jaws' };
    if (k === 'balance') return { ico: '0️⃣', label: _tared ? 'Zeroed ✓' : 'Zero (tare)' };
    if (k === 'dial') return { ico: '0️⃣', label: _tared ? 'On 0 ✓' : 'Set to 0' };
    if (k === 'stopwatch') return { ico: '▶️', label: _clock.run ? 'Timing…' : (_timed && _S() && _S().trials ? 'Time it again' : 'Start timing'), off: !_spec || _clock.run };
    if (k === 'thermometer' && I.stir) return { ico: '🥄', label: 'Stir with it', off: !_spec };
    return { ico: '📖', label: 'How to read', off: !_inst };
  }
  function _ctx() {
    const k = _kind(), I = _I();
    if (k === 'cylinder' && _mid()) { if (_bubbleOn()) tapGlass(); else liftCylinder(); }
    else if (k === 'rule' && I.endMm !== 0) setAlign(_align === 'end' ? (I.endMm != null ? 'zero' : 'mark') : 'end');
    else if (k === 'vernier' || k === 'micrometer') selectSpecimen('closed');
    else if (k === 'balance' || k === 'dial') tare();
    else if (k === 'stopwatch') startTiming();
    else if (k === 'thermometer' && I.stir) stir();
    else if (_inst) _coach('📖 ' + I.how);
  }

  function _negate() {
    const inp = $('lab-measure-input');
    if (!inp) return;
    const v = inp.value.trim();
    inp.value = /^[-−]/.test(v) ? v.replace(/^[-−]/, '') : '−' + v;
    inp.classList.remove('is-right', 'is-wrong');
    try { inp.focus({ preventScroll: true }); } catch (e) {}
  }

  // ══ Reading ══════════════════════════════════
  // Grade 4 types a number AND picks a unit (judgeUnit); Grade 9 types a
  // number in the unit shown (judge).
  function check(value, unit) {
    const D = DATA(), inp = $('lab-measure-input'), us = $('lab-measure-uselect');
    if (_busy) return;
    const m = _m();
    if (!m.ok) { _coach(m.msg); return; }
    if (value != null && inp) inp.value = typeof value === 'number' ? D.fmt(value, m.dp) : String(value);
    if (unit != null && us) us.value = unit;
    const kid = !!(us && _kid());
    const v = D.parseReading(inp ? inp.value : '');
    if (v == null) { _coach(kid ? 'Type your reading as a number first.' : `Type your reading as a number, in ${m.unit}.`); return; }
    const u = kid ? us.value : m.unit;
    const J = kid ? D.judgeUnit(m, v, u) : D.judge(m, v);
    const verdict = J.verdict;
    if (verdict === 'nounit') { _coach(D.UNIT_HINT[_g()] || D.UNIT_HINT[4]); return; }
    if (inp) { inp.classList.toggle('is-right', verdict === 'ok'); inp.classList.toggle('is-wrong', verdict !== 'ok'); }
    if (verdict === 'ok') { _accept(m, v); return; }
    if (_mission) _mission.wrong++;
    const I = _I(), typed = D.fmt(v, m.dp) + ' ' + u;
    if (kid && _mid()) {
      if (verdict === 'unit') {
        const U = D.UNITS[u], mw = (U.q === 'force' && m.quantity === 'mass') || (U.q === 'mass' && m.quantity === 'force');
        _mistake(mw ? 'mass_weight' : 'wrong_unit78', m, v, { unit: u, sameQ: J.sameQ });
        return;
      }
      if (CARD78[verdict]) { _mistake(CARD78[verdict], m, v, { verdict }); return; }
      if (verdict === 'sign') _coach(`You added the ${D.fmt(m.zero, m.dp)} g instead of taking it away. True mass = reading − empty reading.`);
      else if (verdict === 'near') _coach(I.kind === 'density' ? 'Close! Check your division, to two decimal places.' : 'Close! Look again at which mark is nearest. Zoom in if you need to.');
      else _coach(`Not quite - ${typed} is not it. ${I.how}`);
      return;
    }
    if (kid) {
      switch (verdict) {
        case 'unit': _mistake('wrong_unit', m, v, { unit: u, sameQ: J.sameQ }); break;
        case 'end': _mistake('ruler_end4', m, v); break;
        case 'apparent': _mistake('parallax4', m, v); break;
        case 'raw': _mistake('not_zeroed', m, v); break;
        case 'near': _coach('Close! Count the marks again. Zoom in if you need to.'); break;
        default: _coach(`Not quite - ${typed} is not it. ${I.how}`);
      }
      return;
    }
    switch (verdict) {
      case 'apparent': _mistake('parallax', m, v); break;
      case 'top': _mistake('meniscus_top', m, v); break;
      case 'raw': _mistake('zero_raw', m, v); break;
      case 'end': _mistake('end_error', m, v); break;
      case 'sign': _coach(`You ADDED the zero error. Take it away instead: true reading = scale reading − zero error.`); break;
      case 'far': _coach(`${typed} is where the far end is - but it started at the 1.0 cm mark, not at 0. Subtract 1.0 cm.`); break;
      case 'level': _coach(`${typed} is the new water level. Subtract the ${m.before} cm³ of water that was there before the stone went in.`); break;
      case 'units': _coach('That looks like minutes and seconds run together. The answer must be in SECONDS: minutes × 60 + seconds.'); break;
      case 'near': _coach(I.kind === 'vernier' ? 'Close! Look again at which vernier line lines up best with a main-scale line - zoom in.'
                         : 'Close! Look again at which mark is nearest - zoom in if you need to.'); break;
      default: _coach(`Not quite - ${typed} isn’t it. ${I.how}`);
    }
  }

  function showReading() {
    const m = _m();
    if (!m.ok) { _coach(m.msg); return; }
    check(m.want, m.unit);
  }
  // misread('unit') writes the right number with the wrong unit (Grade 4).
  function misread(kind) {
    const m = _m();
    if (kind === 'unit') { if (!m.ok || !m.wrongUnit) { if (m.msg) _coach(m.msg); return; } check(m.want, m.wrongUnit); return; }
    // misread('weight') writes a mass in newtons (Grades 7-8).
    if (kind === 'weight') { if (!m.ok || m.quantity !== 'mass') { if (m.msg) _coach(m.msg); return; } check(m.want, 'N'); return; }
    if (!m.ok || !(m.mistakes[kind] || []).length) { if (m.msg) _coach(m.msg); return; }
    check(m.mistakes[kind][0], m.unit);
  }

  function _markable(m) { return ['rule', 'vernier', 'micrometer', 'cylinder', 'thermometer', 'dial'].includes(DATA().INSTRUMENTS[m.inst].kind); }

  function _accept(m) {
    const D = DATA(), I = _I(), S = _S();
    _hit = true;
    _marks = _markable(m) && I.kind !== 'vernier' && I.kind !== 'micrometer' ? [{ u: m.scale, c: OK_C, t: '✓' }] : [];
    // A try is counted once: typing the same try again is not a new result.
    if (S && S.trials) {
      if (_readTrial === _trial) { _coach(`✅ Yes, ${D.fmt(m.want, m.dp)} s. Press “Time it again” for another try.`); return; }
      _readTrial = _trial;
      _trialVals.push(m.want);
    }
    if (m.spec === 'closed') {
      _logEntry({ title: `${I.short}: zero check`, note: true,
        obs: _mid() ? (m.want === 0 ? 'It reads 0.0 g with nothing on the pan. Ready to weigh.'
                                    : `It reads ${D.fmt(m.want, m.dp)} g with nothing on the pan. Press Zero, or take ${D.fmt(m.want, m.dp)} g off every reading.`)
          : m.want === 0 ? `It reads ${D.fmt(0, m.dp)} ${m.unit} with nothing to measure - no zero error.`
                         : `It reads ${m.want > 0 ? '+' : ''}${D.fmt(m.want, m.dp)} ${m.unit} with nothing to measure: a zero error. Correct every reading: true = reading − zero error.` });
    } else _row(m);
    let say = '✅ Correct! ' + m.work;
    if (S && S.trials && _trialVals.length >= 2) {
      const odd = D.oddOne(_trialVals);
      say += ` Your times: ${_trialVals.join(' s, ')} s.`;
      if (odd && odd.odd === m.want) say += ` ${m.want} s is the odd one out. Time it again!`;
      else if (odd) say += ` That agrees: the ball takes ${odd.usual} s.`;
    }
    _coach(say);
    _okDiscoveries(m).forEach(_discover);
    _missionTick(m);
    _refresh();
    if (m.tooCoarse) {
      const S = _S();
      const stepS = D.fmt(I.step, I.dp) + ' ' + I.unit;
      _result('too_coarse', { typedS: m.wantS, inst: I.name.toLowerCase(), stepS, spec: S.label.length,
        ratio: m.want === 0 ? 'bigger than the whole thing you are measuring' : `${Math.round(I.step / m.want * 100)}% of the whole measurement`,
        better: D.betterFor(m.spec) }, () => _guideEvent('read'));
    } else _guideEvent('read');
  }

  // Which discoveries a CORRECT reading unlocks.
  function _okDiscoveries(m) {
    const I = DATA().INSTRUMENTS[m.inst], out = [];
    if (m.spec === 'closed') return out;
    if (DATA().mid(I)) {
      const g = _g();
      if (g === 7) {
        if (m.inst === 'cyl78' && m.spec === 'water78' && _eye === 'level') out.push('g7_cyl_read');
        if (m.inst === 'cyl78' && m.spec === 'stone78') out.push('g7_displace');
        if (m.inst === 'cyl78' && m.spec === 'bubble78' && _tapped) out.push('g7_bubble_free');
        if (m.inst === 'block7') out.push('g7_block');
        if (m.inst === 'bal78' && !m.zero) out.push('g7_balance');
      }
      if (g === 8 && m.inst === 'dens8') out.push({ alu8: 'g8_alu', steel8: 'g8_steel', copper8: 'g8_copper', stone8: 'g8_stone',
                                                   cork8: 'g8_cork', wood8: 'g8_wood', ice8: 'g8_ice', oil8: 'g8_oil' }[m.spec]);
      return out.filter(Boolean);
    }
    if (I.grades) {
      if (m.inst === 'ruler30' && m.start === 0) out.push('g4_ruler_zero');
      if (m.inst === 'tape') out.push('g4_tape');
      if (m.inst === 'jug' && _eye === 'level') out.push('g4_jug_read');
      if (m.inst === 'thermo4') out.push({ ice4: 'g4_ice', tap4: 'g4_thermo_2s', hot4: 'g4_hot_adult' }[m.spec]);
      if (m.inst === 'scale4' && !m.zero) out.push('g4_scale_zero');
      if (m.inst === 'watch4' && _trialVals.length >= 3) out.push('g4_repeat');
      return out.filter(Boolean);
    }
    if (m.inst === 'cylinder') out.push(m.spec === 'stone' ? 'displacement' : 'cyl_read');
    if (I.kind === 'rule' && !m.tooCoarse) out.push('rule_read');
    if (I.kind === 'vernier' && !m.tooCoarse) out.push(m.zero > 0 ? 'zero_pos' : m.zero < 0 ? 'zero_neg' : 'vernier_read');
    if (m.inst === 'micrometer') out.push('micrometer_read');
    if (m.inst === 'balance') out.push('balance_zero');
    if (m.inst === 'stopwatch') out.push(m.spec === 'pendulum' ? 'pendulum' : 'stopwatch_read');
    if (m.inst === 'thermometer' && m.spec === 'ice') out.push('ice_point');
    if (m.inst === 'thermometer' && m.spec === 'boiling') out.push('boil_point');
    if (m.inst === 'clinical') out.push('clinical');
    if (m.tooCoarse) out.push('too_coarse');
    return out;
  }

  // ══ Mistakes that teach ══════════════════════
  // The consequence is drawn on the scale first (a red mark where the pupil
  // read, a green one at the truth), then the card explains it.
  const MISTAKE_TOKEN = { parallax: 'misread:apparent', meniscus_top: 'misread:top', zero_raw: 'misread:raw', end_error: 'misread:end',
                          parallax4: 'misread:apparent', ruler_end4: 'misread:end', not_zeroed: 'misread:raw', wrong_unit: 'misread:unit',
                          parallax78: 'misread:apparent', top78: 'misread:top', level78: 'misread:level', bubble78: 'misread:bubble', raw78: 'misread:raw',
                          area78: 'misread:area', wrong_unit78: 'misread:unit', mass_weight: 'misread:weight', flip8: 'misread:flip', level8: 'misread:dlevel',
                          total8: 'misread:total' };
  // Which discovery a Grade 7/8 card unlocks, at each grade.
  function _disc78(kind, m) {
    const g = _g();
    if (g === 7) return { parallax78: _eye === 'above' ? 'g7_par_above' : 'g7_par_below', top78: 'g7_top', level78: 'g7_start', bubble78: 'g7_bubble',
                          raw78: 'g7_raw', area78: 'g7_area', mass_weight: 'g7_weight' }[kind] || null;
    if (g === 8) return { flip8: 'g8_flip', level8: 'g8_final', total8: 'g8_total', mass_weight: 'g8_weight',
                          wrong_unit78: m.quantity === 'density' ? 'g8_kgm3' : null }[kind] || null;
    return null;
  }

  function _mistake(kind, m, v, extra) {
    const D = DATA(), I = _I(), S = _S();
    const f = x => D.fmt(x, m.dp) + ' ' + m.unit;
    let ctx = {}, disc = null, after = null, youS = f(v);
    if (kind === 'parallax' || kind === 'parallax4') {
      ctx = { pos: _eye, typed: f(v), want: f(m.scale) };
      _marks = [{ u: m.apparent, c: BAD_C, t: 'you read' }, { u: m.scale, c: OK_C, t: 'true level' }];
      disc = kind === 'parallax4' ? (_eye === 'above' ? 'g4_jug_above' : 'g4_jug_below') : (_eye === 'above' ? 'parallax_high' : 'parallax_low');
    } else if (kind === 'ruler_end4') {
      ctx = { spec: S.name.toLowerCase(), typed: f(v) };
      _marks = [{ u: m.start, c: BAD_C, t: 'ruler end' }, { u: 0, c: OK_C, t: '0 mark' }];
      disc = 'g4_ruler_end';
      after = () => { _align = 'zero'; _clearReading(); _readouts(); _coach('Now the end is on 0. Read the mark at the other end.'); };
    } else if (kind === 'not_zeroed') {
      ctx = { spec: S.name.toLowerCase(), typed: f(v), zero: f(m.zero), want: f(m.want) };
      _marks = [{ u: m.read, c: BAD_C, t: 'you read' }, { u: m.want, c: OK_C, t: 'true' }];
      disc = 'g4_scale_raw';
      after = () => _coach('Now tap “Set to 0”. Then weigh it again.');
    } else if (kind === 'wrong_unit' || kind === 'wrong_unit78' || kind === 'mass_weight') {
      const U = D.UNITS[extra.unit], R = D.UNITS[m.unit], fct = U.f / R.f;
      youS = D.fmt(v, m.dp) + ' ' + extra.unit;
      ctx = { typed: youS, want: f(m.want), u: extra.unit, uName: U.name, uq: D.QUANTITIES[U.q].kid, ru: m.unit, rName: R.name,
              rq: D.QUANTITIES[R.q].kid, inst: I.name.toLowerCase(), sameQ: !!extra.sameQ, factor: fct >= 1 ? fct : Math.round(1 / fct), bigger: fct > 1 };
      _marks = [];
      disc = kind === 'wrong_unit' ? 'g4_unit' : _disc78(kind, m);
    } else if (D.RESULTS[kind] && (D.RESULTS[kind].grades || []).some(x => x === 7 || x === 8)) {
      // Grades 7-8: the numbers behind the reading, for the card to show.
      const In = m.info || {}, n = x => String(D.clean(x)), dm = m.dims || [];
      ctx = { typed: f(v), typedN: n(v), want: f(m.want), spec: S.name.toLowerCase(), pos: _eye, levelS: f(m.scale), levelN: m.level, before: m.before != null ? m.before : In.before,
              bubble: m.bubble, zeroS: f(m.zero), readS: f(m.read), l: dm[0], w: dm[1], h: dm[2], kind: extra && extra.verdict,
              mass: n(In.mass), Vn: n(In.V), after: In.after, full: In.full, empty: In.empty };
      if (kind === 'parallax78') _marks = [{ u: m.apparent, c: BAD_C, t: 'you read' }, { u: m.scale, c: OK_C, t: 'true level' }];
      else if (kind === 'top78') _marks = [{ u: m.top, c: BAD_C, t: 'top of curve' }, { u: m.scale, c: OK_C, t: 'bottom' }];
      else if (kind === 'level78') _marks = [{ u: m.level, c: BAD_C, t: 'new level' }, { u: m.before, c: OK_C, t: 'first reading' }];
      else if (kind === 'bubble78') _marks = [{ u: m.level, c: BAD_C, t: 'with bubble' }, { u: m.level - m.bubble, c: OK_C, t: 'without' }];
      else _marks = [];
      disc = _disc78(kind, m);
      if (kind === 'bubble78') after = () => _coach('Now tap the glass to free the bubble. Then read the level again.');
      if (kind === 'raw78') after = () => _coach('Take it off, press Zero with the pan empty, then weigh it again.');
    } else if (kind === 'meniscus_top') {
      ctx = { typed: f(v), want: f(m.scale) };
      _marks = [{ u: m.top, c: BAD_C, t: 'top of curve' }, { u: m.scale, c: OK_C, t: 'bottom' }];
      disc = 'meniscus_top';
    } else if (kind === 'zero_raw') {
      const zeroS = (m.zero > 0 ? '+' : '') + f(m.zero);
      ctx = { inst: I.name.toLowerCase(), empty: I.kind === 'balance' ? 'the pan is empty' : 'its jaws are closed',
              zeroS, typedS: f(v), readS: f(m.read), wantS: f(m.want) };
      _marks = I.kind === 'vernier' ? [{ u: m.scale, c: BAD_C, t: 'vernier zero' }, { u: m.jaw, c: OK_C, t: 'jaw' }] : [];
      disc = 'zero_raw';
    } else if (kind === 'end_error') {
      ctx = { spec: S.name.toLowerCase(), typed: f(v) };
      _marks = [{ u: m.start, c: BAD_C, t: 'worn end' }, { u: DATA().RULE.markMm, c: OK_C, t: '1 cm mark' }];
      disc = 'end_error';
      after = () => { _align = 'mark'; _clearReading(); _readouts(); _coach('Now the object starts at the 1.0 cm mark. Read its far end and subtract 1.0 cm.'); };
    }
    const st = Labs.store(LAB);
    st.mistakes = st.mistakes || {};
    st.mistakes[kind] = (st.mistakes[kind] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.cards++;
    if (disc) _discover(disc);
    _busy = true;
    _fxAdd('flash', () => {
      _busy = false;
      _result(kind, ctx, () => { if (after) after(); _guideEvent(MISTAKE_TOKEN[kind]); });
    }, { lines: [`You read ${youS} ✗`, `True ${f(m.want)} ✓`] });
  }

  function _result(kind, ctx, onClose) {
    const R = DATA().RESULTS[kind];
    _hush();
    Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead(ctx), exam: R.exam,
      button: 'Got it', onClose: () => { if (onClose) onClose(); } });
  }

  function _burstHazard() {
    const H = DATA().HAZARDS.clinical_burst, S = _S();
    const st = Labs.store(LAB);
    st.hazards.clinical_burst = (st.hazards.clinical_burst || 0) + 1;
    Labs.persist();
    if (_mission) _mission.cards++;
    const ctx = { what: S.name.toLowerCase(), temp: S.temp };
    _busy = true;
    _burst = 0.001;
    _readouts();
    _fxAdd('burst', () => {
      _busy = false;
      _hush();
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Get a new thermometer',
        onClose: () => {
          _burst = 0; _spec = null; _clearReading(); _readouts(); _renderPanel();
          _coach('A new clinical thermometer. It is only for 35-42 °C - for hot water, pick the laboratory thermometer.');
        } });
    });
  }

  // Grade 4: kettle water poured by the pupil (hot) and a thermometer used to
  // stir (sharp). The splash or the crack is drawn first, then the card.
  function _hazard4(id) {
    const H = DATA().HAZARDS[id], S = _S();
    if (!H) return;
    const st = Labs.store(LAB);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.cards++;
    const ctx = { what: S ? S.name.toLowerCase() : 'the water' };
    _busy = true;
    if (H.fx === 'crack') _crack = 0.001;
    if (H.fx === 'splash') _splash = 0.001;
    _renderPanel();
    _readouts();
    _fxAdd(H.fx, () => {
      _busy = false;
      _hush();
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why, instead: H.instead, exam: H.exam,
        button: H.button,
        onClose: () => { _crack = 0; _splash = 0; _spec = null; _clearReading(); _readouts(); _renderPanel(); _coach(H.after); } });
    });
  }

  // ══ Notebook ═════════════════════════════════
  function _row(m) {
    const D = DATA(), I = _I(), S = _S(), kid = !!I.grades, g78 = D.mid(I);
    _rows.unshift({ what: S.label[I.quantity] + (S.trials ? ` (try ${_trialVals.length})` : ''), inst: I.short, value: D.fmt(m.want, m.dp) + ' ' + m.unit,
                    conv: D.convert(m.quantity, m.want, m.unit, g78 ? _g() : kid), prec: g78 ? I.prec : kid ? _markS(I) : I.prec.split(' · ')[0] });
    if (_rows.length > 30) _rows.length = 30;
  }
  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 30) _log.length = 30;
  }
  function _notebookHTML() {
    const table = _rows.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Readings</caption>
        <thead><tr><th scope="col">Measuring</th><th scope="col">${_kid() ? 'Tool' : 'Instrument'}</th><th scope="col">Reading</th><th scope="col">${_kid() && !_mid() ? 'Each mark' : 'Reads to'}</th></tr></thead>
        <tbody>${_rows.slice(0, 14).map(r => `<tr><th scope="row">${esc(r.what)}</th><td>${esc(r.inst)}</td>
          <td><b>${esc(r.value)}</b><span class="lab-measure-conv">${esc(r.conv)}</span></td><td class="lab-measure-prec">${esc(r.prec)}</td></tr>`).join('')}</tbody>
      </table></div>` : '';
    const notes = _log.length ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>` : '';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>
      ${table}${notes}${!table && !notes ? `<p class="lab-empty">${_kid() ? 'Your readings appear here, each with its unit.' : 'Your readings appear here, with their units, what they are in other units and how precisely the instrument reads.'}</p>` : ''}</section>`;
  }

  // ══ Missions ═════════════════════════════════
  const _mdef = () => _mission && _forG(DATA().MISSIONS).find(x => x.id === _mission.id);

  function startMission(id) {
    const M = _forG(DATA().MISSIONS).find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _inst = null; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false; _align = 'end';
    _trial = -1; _readTrial = -1; _trialVals = [];
    _clearReading();
    _tapped = false;
    _mission = { id, done: {}, i: 0, cards: 0, wrong: 0, success: false };
    _panel = 'missions';
    if (id === 'vernier') selectInstrument('vernier', true);
    _coach(M.intro);
    _renderPanel();
    _readouts();
  }

  function _missionTick(m) {
    const ms = _mission, M = _mdef();
    if (!ms || !M || !M.tasks || ms.success) return;
    const fits = x => !ms.done[x.id] && x.inst === m.inst && x.spec === m.spec;
    const t = M.tasks.find(x => fits(x) && (!x.eye || x.eye === _eye) && (!x.align || x.align === _align) && (!x.tared || _tared));
    if (!t) { const need = M.tasks.find(x => fits(x) && x.need); if (need) _coach('✅ Right reading! ' + need.need); return; }
    ms.done[t.id] = true;
    const n = M.tasks.filter(x => ms.done[x.id]).length;
    if (n === M.tasks.length) {
      ms.success = true;
      Labs.confetti();
      setTimeout(() => _coach('🎯 All done! Tap “Answer the questions” to finish the mission.'), 0);
    }
  }

  // A mission with `choices` is "Right tool for the job" (Grade 9 or Grade 4).
  function choose(instId) {
    const ms = _mission, D = DATA(), M = _mdef();
    if (!ms || !M || !M.choices || ms.success || _busy) return;
    const C = M.choices[ms.i], I = D.INSTRUMENTS[instId];
    if (!C || !I) return;
    selectInstrument(instId, true);
    if (instId === C.best) {
      _logEntry({ title: `Job ${ms.i + 1}: ${C.job}`, obs: `${I.name} ✓ - ${C.why}` });
      ms.i++;
      if (ms.i >= M.choices.length) { ms.success = true; Labs.confetti(); _coach('🧰 Every job has its tool! Tap “Answer the questions” to finish.'); }
      else _coach(`✅ Yes - the ${I.name.toLowerCase()}: ${C.why} Next job!`);
      _renderPanel();
    } else {
      ms.cards++;
      const B = D.INSTRUMENTS[C.best];
      _renderPanel();
      _result(I.grades ? 'wrong_tool4' : 'wrong_tool', { inst: I.name, reason: D.wrongToolReason(C, instId), best: B.name, bestWhy: C.why },
        () => _coach(`Job ${ms.i + 1}: ${C.job}${/[?.!]$/.test(C.job) ? '' : '.'} Try again.`));
    }
    _readouts();
  }

  function _quiz() {
    const ms = _mission, M = _mdef();
    if (!ms || !ms.success || !M) return;
    _hush();
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.cards || ms.wrong > 2) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store(LAB);
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      if (M.choices) lines.push(ms.cards ? `${ms.cards} wrong pick${ms.cards === 1 ? '' : 's'} - every job right first time for an extra star.` : 'Every job right first time. 🧰');
      else if (ms.cards || ms.wrong > 2) lines.push(`${ms.cards} ${_kid() ? 'mistake' : 'error'} card${ms.cards === 1 ? '' : 's'} and ${ms.wrong} wrong reading${ms.wrong === 1 ? '' : 's'} - read carefully for an extra star.`);
      else lines.push(_kid() ? 'Every reading right, no mistakes. 📏' : 'Every reading right, no errors. 📏');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or hunt for discoveries.'); } });
    } });
  }

  function _missionListHTML() {
    const st = Labs.store(LAB);
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">${_kid() ? 'Measure, answer the questions and earn up to three stars.' : 'Do the measuring, answer the exam-style questions, earn up to three stars.'}</p>
      ${_forG(DATA().MISSIONS).map(M => {
        const best = (st.missions[M.id] && st.missions[M.id].stars) || 0;
        return `<article class="lab-mission-card">
          <span class="lab-mission-icon" aria-hidden="true">${M.icon}</span>
          <div><h3>${esc(M.title)}</h3><p>${esc(M.blurb)}</p>${Labs.stars(best)}</div>
          <button type="button" class="lab-btn lab-btn-primary" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button>
        </article>`;
      }).join('')}</section>`;
  }

  function _missionHTML() {
    const ms = _mission, M = _mdef(), D = DATA();
    if (!ms || !M) return '';
    let body;
    if (M.choices) {
      const C = M.choices[ms.i];
      body = `<ul class="lab-steps">${M.choices.map((c, k) => `<li class="${k < ms.i ? 'is-done' : ''}">${esc(c.job)}</li>`).join('')}
          <li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
        ${C && !ms.success ? `<p class="lab-measure-job"><small>Job ${ms.i + 1} of ${M.choices.length} · which ${_kid() ? 'tool' : 'instrument'}?</small>${esc(C.job)}</p>
          <div class="lab-items">${M.pick.map(id => _instButton(id, 'data-choose')).join('')}</div>` : ''}`;
      void D;
    } else {
      const n = M.tasks.filter(x => ms.done[x.id]).length;
      body = `<ul class="lab-steps">${M.tasks.map(t => `<li class="${ms.done[t.id] ? 'is-done' : ''}">${esc(t.text)}</li>`).join('')}
          <li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
        <p class="lab-progress-text">${n} of ${M.tasks.length} readings done</p>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box and
  // makes the same control glow. Nothing is locked: the pupil can wander off
  // and the guide waits. A guide is one of LabMeasureData.GUIDES, or one built
  // on the spot from a discovery's recipe.
  const _gdef = () => _guide && (_guide.def || _forG(DATA().GUIDES).find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _forG(DATA().GUIDES).find(g => g.id === idOrDef);
    if (!G || _busy) return;
    if (Labs.studyBegin && Labs.studyBegin('measure', G, () => startGuide(idOrDef))) return;
    _mission = null;
    _inst = null; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _clearReading();
    _trial = -1; _readTrial = -1; _trialVals = [];
    _tapped = false;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _readouts();
    _guideEnter();
    const z = $('lab-measure-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step that is already true (eye already level, already zoomed right in)
  // is skipped rather than asking the pupil to do nothing.
  function _satisfied(on) {
    const [k, v] = on.split(':');
    if (k === 'eye') return _kind() === 'cylinder' && _eye === v;
    if (k === 'align') return _kind() === 'rule' && _align === v;
    if (k === 'tare') return (_kind() === 'balance' || _kind() === 'dial') && _tared;
    if (k === 'tap') return _kind() === 'cylinder' && _tapped;
    if (k === 'zoom') return _zoom >= MAX_ZOOM;
    return false;
  }

  function _guideEnter() {
    if (Labs.studyCheckpoint) Labs.studyCheckpoint('measure');
    const G = _gdef();
    if (!G) return;
    _hush();
    let s = G.steps[_guide.step];
    while (s && _satisfied(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const k = s.on.split(':')[0], v = s.on.split(':')[1];
    if (k === 'inst' && DATA().INSTRUMENTS[v] && _group !== DATA().INSTRUMENTS[v].group) { _group = DATA().INSTRUMENTS[v].group; if (_panel === 'sandbox') _renderPanel(); }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, j) => `<i class="${j < i ? 'is-done' : j === i ? 'is-now' : ''}"></i>`).join('')}</div>
        ${_kid() ? `<div class="lab-measure-sayrow"><p class="lab-guide-say">${esc(s.say)}</p>
          <button type="button" class="lab-coach-tip" data-act="say-guide" aria-label="Read this step out loud">🔊</button></div>`
          : `<p class="lab-guide-say">${esc(s.say)}</p>`}
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
    // A mistake card can do a step for the pupil (after the gap-before-0 card
    // the pencil is moved to 0): move on rather than ask for it again.
    else if (s && _satisfied(s.on)) _guideEnter();
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

  // A discovery's recipe, in words a pupil can follow.
  function _autoStep(on) {
    const D = DATA(), [k, v] = on.split(':'), kid = _kid();
    if (k === 'inst') { const I = D.INSTRUMENTS[v]; return { on, say: `Pick the ${I.name.toLowerCase()}.`, btn: `${I.icon} Pick the ${I.short.toLowerCase()}` }; }
    if (k === 'spec') {
      if (v === 'closed') return { on, say: 'Close it with nothing to measure (jaws shut, or the pan empty).', btn: '🤏 Nothing - close it' };
      const S = D.SPECIMENS[v];
      return { on, say: `Choose the ${S.name.toLowerCase()} to measure.`, btn: `${S.icon} ${S.name}` };
    }
    if (k === 'zoom') return { on, say: 'Zoom in on the scale.', btn: '🔍 Zoom in' };
    if (k === 'eye' && kid) return v === 'level' ? { on, say: 'Bend down. Get your eye level with the liquid.', btn: '👁️ Eye level' }
                                                 : { on, say: `Move your eye ${v} the liquid.`, btn: `👁️ Eye ${v}` };
    if (k === 'eye') return v === 'level' ? { on, say: 'Bring your eye level with the bottom of the meniscus.', btn: '👁️ Eye level' }
                                          : { on, say: `Move your eye ${v} the water level.`, btn: `👁️ Eye ${v}` };
    if (k === 'align' && kid) return v === 'zero' ? { on, say: 'Line the object up with the 0 mark.', btn: '📍 Start at 0' }
                                                  : { on, say: 'Push the object against the very end of the ruler.', btn: '📍 Start at the ruler’s end' };
    if (k === 'align') return v === 'mark' ? { on, say: 'Line the object up with the 1 cm mark.', btn: '📍 Start at the 1 cm mark' }
                                           : { on, say: 'Push the object up against the very end of the ruler.', btn: '📍 Start at the ruler’s end' };
    if (k === 'tare') return kid && !_mid() ? { on, say: 'Turn the knob so the pointer is on 0.', btn: '0️⃣ Set to 0' }
                                            : { on, say: 'With the pan empty, press Zero (tare).', btn: '0️⃣ Zero the balance' };
    if (k === 'tap') return { on, say: 'Tap the side of the glass to free the air bubble.', btn: '👆 Tap the glass' };
    if (k === 'start') return kid ? { on, say: 'Press Start. The stopwatch stops by itself.', btn: '▶️ Start timing' }
                                  : { on, say: 'Start the stopwatch and let it run until it stops.', btn: '▶️ Start timing' };
    if (k === 'misread') {
      const M = (kid
        ? { apparent: ['Read the mark where the dashed line meets the scale.', '✏️ Read it from there'],
            end: ['Read the mark at the other end. Write that down as the length.', '✏️ Write that reading down'],
            raw: _mid() ? ['Write down the mass shown, without zeroing the balance.', '✏️ Write the mass down'] : ['Read the pointer. Do not set the scale to 0.', '✏️ Read the pointer'],
            unit: ['Type the right number, but pick a different unit.', '✏️ Write it with the wrong unit'],
            top: ['Read the mark level with the EDGE of the water, where it curves up the glass.', '✏️ Read the top of the curve'],
            level: ['Write down the new water level as the volume.', '✏️ Write down the new level'],
            bubble: ['Work out the volume with the bubble still stuck on.', '✏️ Read it with the bubble'],
            area: ['Multiply only the length and the width.', '✏️ Multiply two sides'],
            flip: ['Divide the volume by the mass.', '✏️ Divide volume by mass'],
            dlevel: ['Divide the mass by the final water level.', '✏️ Divide by the final level'],
            total: ['Use the full reading, cylinder and all, as the mass.', '✏️ Use the full reading'],
            weight: ['Write the mass with newtons (N) as the unit.', '✏️ Write it in newtons'] }
        : { apparent: ['Read the mark where your line of sight (the dashed line) crosses the scale.', '✏️ Read it from there'],
            top: ['Read the mark level with the EDGES of the water, where it curves up the glass.', '✏️ Read the top of the curve'],
            raw: ['Read the scales and write the reading down just as it is - without checking the zero.', '✏️ Write the scale reading down'],
            end: ['Read the mark at the far end and write that down as the length.', '✏️ Write the far-end reading down'] })[v];
      return { on, say: M[0], btn: M[1] };
    }
    return kid ? { on, say: 'Read the scale. Type the number and pick the unit - or let me show you.', btn: '✏️ Show me the reading' }
               : { on, say: 'Read the scale and type your reading - or let me show you how.', btn: '✏️ Show me the reading' };
  }

  function discoveryGuide(id) {
    const d = _forG(DATA().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = _forG(DATA().DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    _hush();
    const found = !!Labs.store(LAB).disc[id];
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
        <section class="lab-hz-sec"><h3>The rule</h3><p class="lab-eq is-sym">${esc(d.eq)}</p></section>
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
    if (Labs.studyComplete && Labs.studyComplete('measure', G)) { _stopGuide(true); return; }
    const st = Labs.store(LAB);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    _hush();
    const next = G.adhoc ? null : _forG(DATA().GUIDES).find(g => !st.guides[g.id]);
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${G.icon}</p>
        <p class="lab-rs-kicker">Experiment complete</p>
        <h2 id="lab-ov-title">${esc(G.title)}</h2>
        <section class="lab-hz-sec is-exam lab-done-lesson"><h3>What you found out</h3><p>${esc(G.lesson)}</p></section>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Measure freely</button>
        ${G.adhoc
          ? '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="found" data-autofocus>Back to my discoveries →</button>'
          : next
            ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${next.id}" data-autofocus>Next: ${esc(next.title)} →</button>`
            : '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>'}
      </div>`, { cls: 'is-done' });
    _coach(`Experiment complete: ${G.title}. Pick the next one below, try a mission, or measure freely.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or measure freely.');
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
    const sel = k === 'inst' ? `[data-inst="${v}"]`
      : k === 'spec' ? `[data-spec="${v}"]`
      : k === 'zoom' ? '[data-act="zin"]'
      : k === 'eye' ? '[data-act="eye"]'
      : (k === 'align' || k === 'tare' || k === 'start' || k === 'tap') ? '[data-act="ctx"]'
      : '[data-act="check"]';
    const el = _root.querySelector(sel);
    if (el) {
      el.classList.add('is-next');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      const guideBox = _root.querySelector('#lab-guide');
      _root.querySelectorAll('[data-act],[data-inst],[data-spec]').forEach(other => {
        if (other !== el && !el.contains(other) && !other.contains(el)
            && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
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
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">${_kid() ? `
        <li><b>Choose</b> a guided experiment or a mission.</li>
        <li><b>Follow the yellow box.</b> The thing to tap next glows yellow.</li>
        <li><b>Read the scale.</b> Type the number, pick the unit, tap Check.</li>` : `
        <li><b>Choose</b> a guided experiment (the best place to start) or a mission.</li>
        <li><b>Follow the yellow box</b> under the scale. The thing to tap next glows yellow.</li>
        <li><b>Zoom in, read the scale</b> and type your reading. Every reading goes in your lab notebook.</li>`}
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_forG(DATA().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>${_kid() ? 'questions · earn stars' : 'exam-style questions · earn stars'}</small></h3>
      <div class="lab-start-list">${_forG(DATA().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">${_kid() ? 'Or measure on your own: pick a tool from the shelf below.' : 'Or measure freely: pick an instrument from the shelf below.'}</p>
    </section>`;
  }

  function _instButton(id, attr) {
    const I = DATA().INSTRUMENTS[id];
    const on = attr === 'data-inst' && _inst === id;
    return `<button type="button" class="lab-item" ${attr}="${id}" aria-pressed="${on}">
      <span class="lab-measure-ico" aria-hidden="true">${I.icon}</span>
      <span class="lab-item-text"><b>${esc(I.name)}</b><small>${esc(I.meta)}</small></span></button>`;
  }

  // The shelf holds only this grade's instruments; Grade 9 splits them into
  // Length / Other, Grade 4 has one short shelf.
  function _shelfHTML() {
    const D = DATA(), kid = _kid();
    const all = Object.keys(D.INSTRUMENTS).filter(id => _forG([D.INSTRUMENTS[id]]).length);
    const groups = [...new Set(all.map(id => D.INSTRUMENTS[id].group))];
    const insts = groups.length > 1 ? all.filter(id => D.INSTRUMENTS[id].group === _group) : all;
    const I = _I();
    const words = kid ? KID_WORD : QUANTITY_WORD;
    const specs = I ? D.specimensFor(_inst, _g()).map(id => {
      const S = D.SPECIMENS[id];
      return `<button type="button" class="lab-item" data-spec="${id}" aria-pressed="${_spec === id}">
        <span class="lab-measure-ico" aria-hidden="true">${S.icon}</span>
        <span class="lab-item-text"><b>${esc(id === 'closed' ? (I.kind === 'balance' ? 'Nothing - empty pan' : 'Nothing - jaws closed') : S.name)}</b>
        <small>${esc(id === 'closed' ? 'Check the zero' : words[I.quantity])}</small></span></button>`;
    }).join('') : '';
    return `<section class="lab-shelf" aria-label="Instruments">
      <div class="lab-shelf-head">
        ${groups.length > 1 ? `<div class="lab-seg" role="group" aria-label="Instruments">
          <button type="button" data-group="length" aria-pressed="${_group === 'length'}">📏 Length</button>
          <button type="button" data-group="other" aria-pressed="${_group === 'other'}">🧪 Other</button>
        </div>` : ''}
        <p class="lab-hint">1 · Pick ${kid ? 'a tool' : 'an instrument'}.</p>
      </div>
      <div class="lab-items">${insts.map(id => _instButton(id, 'data-inst')).join('')}</div>
      ${I ? `<p class="lab-hint lab-measure-step">2 · What will you measure with the ${esc(I.name.toLowerCase())}?</p>
        <div class="lab-items">${specs}</div>` : ''}
    </section>`;
  }
  const QUANTITY_WORD = { length: 'length / diameter', volume: 'volume', time: 'time', temp: 'temperature', mass: 'mass' };
  const KID_WORD = { length: 'length', volume: 'how much liquid', time: 'time', temp: 'how hot', mass: 'how heavy' };

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.getAttribute('role') === 'tab') b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission
      ? _missionHTML() + (_mdef() && _mdef().choices ? '' : _shelfHTML()) + _notebookHTML()
      : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
    _foundCount();
    _highlight();
  }

  // Repaint what changes while measuring without rebuilding the shelf under a
  // finger that is about to tap it.
  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  // Counts are this grade's only. The shell's toast counts every discovery the
  // lab has saved, so it is given a total only while those are all this grade's.
  function _discover(id) {
    const all = _forG(DATA().DISCOVERIES), d = all.find(x => x.id === id);
    if (!d) return;
    const onlyThis = Object.keys(Labs.store(LAB).disc).every(k => all.some(x => x.id === k));
    if (Labs.discover(LAB, id, { title: d.title, total: onlyThis ? all.length : undefined })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const all = _forG(DATA().DISCOVERIES), disc = Labs.store(LAB).disc;
    n.textContent = `${all.filter(d => disc[d.id]).length}/${all.length}`;
  }

  function _foundHTML() {
    const st = Labs.store(LAB);
    const all = _forG(DATA().DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what you saw and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _introKid() {
    const first = _forG(DATA().GUIDES)[0];
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">📏</p>
        <h2 id="lab-ov-title">Welcome to the Measurement Lab</h2>
        ${_mid() ? `<ul class="lab-intro-list">${DATA().INTRO_BY_GRADE[_g()].map(([b, t]) => `<li><b>${esc(b)}</b> ${esc(t)}</li>`).join('')}
          <li><b>Earn stars</b> in missions. There are ${_forG(DATA().DISCOVERIES).length} discoveries to find!</li>
        </ul>` : `<ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will show you each tap.</li>
          <li><b>Measure.</b> Pick a tool. Pick something to measure. Read the scale.</li>
          <li><b>Write the unit.</b> Type the number, then pick cm, ml, °C, g or s.</li>
          <li><b>Mistakes are fine here.</b> Try one and see what goes wrong.</li>
          <li><b>Earn stars</b> in missions. There are ${_forG(DATA().DISCOVERIES).length} discoveries to find!</li>
        </ul>`}
        <p class="lab-hint">Tap 🔊 to hear the helper read out loud.</p>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(LAB); st[_introKey()] = true; Labs.persist();
        _coach('Pick a tool from the shelf. Then pick something to measure.');
      } });
  }

  function _intro() {
    _hush();
    if (_kid()) { _introKid(); return; }
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">📏</p>
        <h2 id="lab-ov-title">Welcome to the Measurement Lab</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first reading, one tap at a time.</li>
          <li><b>Measure.</b> Pick an instrument, pick something to measure, zoom in on the scale and type what you read.</li>
          <li><b>Real scales.</b> The vernier, the micrometer, the meniscus - drawn exactly where the true value puts them.</li>
          <li><b>Get it wrong safely.</b> Parallax, zero error, the worn end of a ruler: make the mistake and see what it does to your reading.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${DATA().DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="cylinder" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(LAB); st.intro = true; Labs.persist();
        _coach('Pick an instrument from the shelf, then something to measure with it.');
      } });
  }

  function _helpKid() {
    const D = DATA();
    const g78 = _mid();
    const rows = _forG(Object.values(D.INSTRUMENTS)).map(I => `<tr><th scope="row">${esc(I.name)}</th><td>${esc(D.QUANTITIES[I.quantity].kid)}</td><td>${esc(I.unit)}</td><td>${esc(g78 ? I.prec : _markS(I))}</td></tr>`).join('');
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Measurement Lab works</h2>
      <div class="lab-help">
        <section><h3>Using the lab</h3><ul>
          <li>Pick a tool, then something to measure.</li>
          <li>🔍 Zoom in to see the marks. On the ${g78 ? 'measuring cylinder' : 'jug'}, 👁️ moves your eye.</li>
          <li>Type the number. Pick the unit. Tap Check.</li>
          <li>Tap 🔊 to hear the words read out loud.</li></ul></section>
        <section><h3>Each tool and its unit</h3>
          <div class="lab-table-wrap"><table class="lab-measure-units"><thead><tr><th scope="col">Tool</th><th scope="col">Measures</th><th scope="col">Unit</th><th scope="col">${g78 ? 'Reads to' : 'Each mark'}</th></tr></thead>
            <tbody>${rows}</tbody></table></div>
          <p class="lab-hint">${esc(D.HELP_HINT[_g()] || D.HELP_HINT[4])}</p></section>
        <section><h3>Good measuring</h3><ul>${(D.RULES_BY_GRADE[_g()] || D.RULES4).map(r => `<li>${esc(r)}</li>`).join('')}</ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the lab</button></div>`,
      { cls: 'is-help' });
  }

  function _help() {
    _hush();
    if (_kid()) { _helpKid(); return; }
    const D = DATA();
    const units = ['length', 'mass', 'volume', 'time', 'temp'].map(q => {
      const Q = D.QUANTITIES[q];
      const inst = _forG(Object.values(D.INSTRUMENTS)).filter(i => i.quantity === q && !i.worn).map(i => i.short).join(', ');
      return `<tr><th scope="row">${esc(Q.name)}</th><td>${esc(Q.si)} (${esc(Q.sym)})</td><td>${esc(Q.lab)}</td><td>${esc(inst)}</td></tr>`;
    }).join('');
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Measurement Lab works</h2>
      <div class="lab-help">
        <section><h3>Using the lab</h3><ul>
          <li>Pick an instrument, then something to measure with it.</li>
          <li>🔍 Zoom in until you can see the smallest marks. On the measuring cylinder, 👁️ moves your eye.</li>
          <li>Type your reading and tap Check. Use ± for a negative zero error.</li>
          <li>The fourth tool changes: line up a ruler, close the jaws, zero the balance, start the stopwatch.</li></ul></section>
        <section><h3>How to read each instrument</h3><ul>
          ${_forG(Object.values(D.INSTRUMENTS)).filter(i => !i.worn).map(i => `<li><b>${esc(i.name)}</b> (to ${esc(i.prec)}): ${esc(i.how)}</li>`).join('')}</ul></section>
        <section><h3>SI units</h3>
          <div class="lab-table-wrap"><table class="lab-measure-units"><thead><tr><th scope="col">Quantity</th><th scope="col">SI unit</th><th scope="col">In the lab</th><th scope="col">Instrument</th></tr></thead>
            <tbody>${units}</tbody></table></div>
          <p class="lab-hint">1 cm = 10 mm · 1 m = 100 cm · 1 cm³ = 1 ml · 1000 cm³ = 1 dm³ · 1 kg = 1000 g · 1 min = 60 s · K = °C + 273</p></section>
        <section><h3>The two errors to beat</h3><ul>
          <li><b>Parallax error</b>: your eye is not level with the mark. Look at the scale at right angles.</li>
          <li><b>Zero (end) error</b>: the instrument does not start at zero, or the ruler’s end is worn. Check the zero; start from a clear mark and subtract.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the lab</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root) return;
    const D = DATA(), I = _I(), S = _S();
    const chip = $('lab-measure-chip');
    if (chip) chip.innerHTML = I ? `${I.icon} ${esc(I.short)} <small>${I.grades && !D.mid(I) ? 'each mark ' + esc(_markS(I)) : 'reads to ' + esc(I.prec)}</small>` : (_kid() ? 'Pick a tool' : 'Pick an instrument');
    const strip = $('lab-measure-strip');
    if (strip) {
      if (!I) strip.textContent = _kid() ? 'Pick a tool from the shelf → the scale appears here.' : 'Pick an instrument from the shelf → its scale appears here.';
      else if (!S) strip.textContent = _kid() ? `Good! Now pick what you will measure with the ${I.name.toLowerCase()}.` : `${I.name} ready. Now pick something to measure.`;
      else strip.textContent = _kid() ? 'Read the scale — zoom in to see the marks.' : 'Read the scale at eye level — zoom in to see the smallest marks.';
    }
    const st = $('lab-status');
    if (st) {
      const chips = [];
      if (_canZoom() && _zoom > 1) chips.push(`<span class="lab-chip">🔍 ${_zoom}×</span>`);
      if (_kind() === 'cylinder' && _eye !== 'level') chips.push(`<span class="lab-chip is-warm">👁️ Eye ${_eye} the level</span>`);
      if (I && I.worn) chips.push('<span class="lab-chip is-warm">⚠️ Old - check its zero</span>');
      if (_kind() === 'balance' && _tared) chips.push('<span class="lab-chip">0️⃣ Zeroed</span>');
      if (_kind() === 'cylinder' && _bubbleOn()) chips.push('<span class="lab-chip is-warm">🫧 Air bubble on it</span>');
      if (_kind() === 'dial' && _tared) chips.push('<span class="lab-chip">0️⃣ On 0</span>');
      if (S && S.trials && _trial >= 0) chips.push(`<span class="lab-chip">Try ${_trial + 1}</span>`);
      if (_clock.run) chips.push('<span class="lab-chip">⏱️ Timing…</span>');
      st.innerHTML = chips.join('');
    }
    const c = $('lab-contents');
    if (c) {
      if (S && I) {
        let t = 'Measuring: ' + S.label[I.quantity];
        if (I.kind === 'cylinder' && S.before != null) t += ` · water before: ${S.before} cm³`;
        if (I.kind === 'cylinder' && _bubbleOn()) t += ' · an air bubble is stuck to it';
        if (_inst === 'rule') t += _align === 'end' ? ' · lined up with the ruler’s end' : ' · starts at the 1.0 cm mark';
        if (I.kind === 'rule' && I.endMm < 0) t += _align === 'end' ? ' · pushed against the ruler’s end' : ' · starts at 0';
        c.textContent = t;
      } else c.textContent = I ? 'Now pick something to measure from the shelf.' : (_kid() ? 'Pick a tool from the shelf below.' : 'Pick an instrument from the shelf below.');
    }
    const zin = _root.querySelector('[data-act="zin"]'), zout = _root.querySelector('[data-act="zout"]');
    if (zin) zin.disabled = !_canZoom() || _zoom >= MAX_ZOOM;
    if (zout) zout.disabled = !_canZoom() || _zoom <= 1;
    const eye = _root.querySelector('[data-act="eye"]');
    if (eye) eye.disabled = _kind() !== 'cylinder';
    const eyeL = $('lab-measure-eye');
    if (eyeL) eyeL.textContent = 'Eye: ' + (_kind() === 'cylinder' ? _eye : 'level');
    const cd = _ctxDef();
    const ctx = _root.querySelector('[data-act="ctx"]');
    if (ctx) ctx.disabled = !!cd.off;
    const ci = $('lab-measure-ctx-ico'), cl = $('lab-measure-ctx');
    if (ci) ci.textContent = cd.ico;
    if (cl) cl.textContent = cd.label;
    _syncForm();
    void D;
  }

  function _syncForm() {
    const I = _I(), m = _m();
    const inp = $('lab-measure-input'), btn = _root && _root.querySelector('[data-act="check"]'), us = $('lab-measure-uselect');
    const ready = !!m.ok && !_busy;
    if (inp) inp.disabled = !ready;
    if (btn) btn.disabled = !ready;
    if (us) us.disabled = !ready;
    const u = $('lab-measure-unit');
    if (u) u.textContent = I ? I.unit : '';
    const neg = $('lab-measure-neg');
    if (neg) neg.hidden = !(I && I.kind === 'vernier');
    const h = $('lab-measure-hint');
    if (h) h.textContent = !I ? (_kid() ? 'Pick a tool and something to measure.' : 'Pick an instrument and something to measure.')
      : m.ok ? (I.kind === 'density' ? 'Work out mass ÷ volume. Type the number, then pick the unit.'
                : I.kind === 'block' ? 'Multiply the three sides. Type the number, then pick the unit.'
                : DATA().mid(I) ? `The ${I.name.toLowerCase()} reads to ${I.prec.split(' (')[0]}. Type the number, then pick the unit.`
                : I.grades ? `Each mark is ${_markS(I)}. Type the number, then pick the unit.`
                         : `The ${I.name.toLowerCase()} reads to ${I.prec.split(' · ')[0]}. Type the reading in ${I.unit}.`)
      : m.msg;
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.6, done, data: data || {} });
  }

  // ══ Drawing ══════════════════════════════════
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  function _font(px, w) { _cx.font = `${w || 600} ${Math.round(px)}px system-ui, -apple-system, "Segoe UI", sans-serif`; }

  // Pixels per scale unit, and the scale value at the centre of the canvas.
  function _view() {
    const k = _kind(), m = _m(), I = _I(), z = _zoom;
    if (k === 'rule' && I.endMm != null) {
      const start = _align === 'end' && I.endMm < 0 ? I.endMm : 0;
      const far = m.ok ? m.scale : start + 150;
      if (z === 1) {
        const lo = Math.min(I.endMm, start) - 8, hi = Math.max(I.endMm < 0 ? I.maxMm + 10 : 300, far + 40) + 8;
        return { ppu: (_W - 16) / (hi - lo), focus: (lo + hi) / 2 };
      }
      return { ppu: z === 2 ? 3 : 7, focus: far };
    }
    if (k === 'rule') {
      const start = _align === 'end' ? DATA().RULE.wornMm : DATA().RULE.markMm;
      const far = m.ok ? m.scale : start + 40;
      if (z === 1) { const vis = Math.max(60, far + 16); return { ppu: (_W - 24) / vis, focus: vis / 2 - 4 }; }
      return { ppu: z === 2 ? 6 : 14, focus: far };
    }
    if (k === 'vernier') {
      const sc = m.ok ? m.scale : (I.zero || 0) * 10;
      if (z === 1) return { ppu: (_W - 20) / 178, focus: 76 };
      return { ppu: z === 2 ? 7 : 16, focus: sc + 4.5 };
    }
    if (k === 'micrometer') {
      const sc = m.ok ? m.scale : 0;
      if (z === 1) return { ppu: (_W - 20) / 36, focus: 15 };
      const ppu = z === 2 ? 9 : 20;
      return { ppu, focus: sc - (_W * 0.12) / ppu };
    }
    if (k === 'cylinder') {
      const G = _cylGeo(I);
      if (z === 1) return { ppu: (_H - 40) / (G.max * 1.14), focus: G.max * 0.52 };
      return { ppu: G.zp[z - 2], focus: m.ok ? m.scale : G.max / 2 };
    }
    if (k === 'thermometer') {
      const S = _S(), T = S ? S.temp : (I.min + I.max) / 2;
      const span = I.max - I.min;
      if (z === 1) return { ppu: (_H - 50) / (span * 1.14 + (I.step < 1 ? 1.2 : 12)), focus: (I.min + I.max) / 2 - span * 0.05 };
      const f = clamp(T, I.min, I.max + 2);
      return I.step < 1 ? { ppu: z === 2 ? 60 : 120, focus: f } : { ppu: z === 2 ? 5 : 11, focus: f };
    }
    return { ppu: 1, focus: 0 };
  }

  function _draw(dt) {
    if (!_cx) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_burst > 0 && !Labs.calm()) c.translate((Math.random() - 0.5) * 6 * Math.max(0, 1 - _burst), (Math.random() - 0.5) * 6 * Math.max(0, 1 - _burst));
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-10, -10, _W + 20, _H + 20);
    c.fillStyle = _colors.bench; c.fillRect(-10, _H * 0.93, _W + 20, _H * 0.1);
    _map = null;
    switch (_kind()) {
      case 'rule': _drawRule(); break;
      case 'vernier': _drawVernier(); break;
      case 'micrometer': _drawMicrometer(); break;
      case 'cylinder': _drawCylinder(); break;
      case 'thermometer': _drawThermometer(); break;
      case 'stopwatch': _drawStopwatch(); break;
      case 'balance': _drawBalance(); break;
      case 'dial': _drawDial(); break;
      case 'block': _drawBlock(); break;
      case 'density': _drawDensity(); break;
      default: _drawEmpty();
    }
    _drawMarks();
    _drawFx(dt);
    c.restore();
  }

  function _drawEmpty() {
    const c = _cx;
    c.fillStyle = _colors.muted; c.textAlign = 'center';
    // Draw a simple lab icon — nothing that looks like a selectable instrument.
    _font(40, 400);
    c.fillText('🔬', _W / 2, _H * 0.38);
    _font(14, 700);
    c.fillText(_kid() ? '↓  Pick a tool from the shelf below' : '↓  Pick an instrument from the shelf below', _W / 2, _H * 0.56);
    _font(12, 400);
    c.fillText(_kid() ? 'Tap it — the scale will appear here.' : 'Tap one — its scale will appear here.', _W / 2, _H * 0.68);
  }

  function _line(x1, y1, x2, y2, col, w) {
    const c = _cx;
    c.strokeStyle = col; c.lineWidth = w || 1;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  }

  // ── Metre rule (Grade 9) · 30 cm ruler and tape measure (Grade 4) ──
  function _drawRule() {
    const c = _cx, D = DATA(), I = _I(), m = _m(), S = _S();
    const g4 = I.endMm != null;
    const { ppu, focus } = _view();
    const X = u => _W / 2 + (u - focus) * ppu;
    const top = _H * 0.5, h = 46, worn = D.RULE.wornMm;
    const endMm = g4 ? I.endMm : worn, maxMm = g4 ? I.maxMm : 1000;
    const x0 = X(endMm), x1 = Math.min(_W + 20, X(maxMm + (g4 && I.endMm < 0 ? 10 : 0)));
    c.fillStyle = g4 && I.endMm === 0 ? '#F5D23A' : '#EEDBA6'; c.strokeStyle = 'rgba(70,45,10,0.6)'; c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(x1, top); c.lineTo(x0, top);
    if (g4) c.lineTo(x0, top + h);
    else { const jag = Math.max(2, Math.min(7, ppu * 0.6)); for (let i = 1; i <= 6; i++) c.lineTo(x0 + (i % 2 ? jag : 0), top + (h * i) / 6); }
    c.lineTo(x1, top + h); c.closePath(); c.fill(); c.stroke();
    if (g4 && I.endMm === 0) { c.fillStyle = '#8A8F94'; c.fillRect(x0 - 5, top - 6, 5, h + 12); }
    const u0 = Math.max(g4 ? 0 : worn + 1, Math.floor(focus - _W / 2 / ppu) - 1), u1 = Math.min(maxMm, Math.ceil(focus + _W / 2 / ppu) + 1);
    // Grade 4 numbers every cm when there is room, else every 5, 10 or 50 cm.
    const lab = g4 ? ([10, 50, 100, 500, 1000].find(s => ppu * s >= 24) || 1000) : 0;
    const tickEvery = g4 && ppu * 10 < 3 ? 50 : 10;
    c.fillStyle = '#1B1B1B'; c.textAlign = 'center';
    _font(ppu >= 6 ? 12 : 10);
    for (let u = u0; u <= u1; u++) {
      const big = u % 10 === 0, mid = u % 5 === 0;
      if (!big && !mid && ppu < 2.2) continue;
      if (!big && ppu < 0.8) continue;
      if (g4 && big && u % tickEvery !== 0 && u % lab !== 0) continue;
      const len = big ? 17 : mid ? 12 : 7;
      _line(X(u), top, X(u), top + len, '#1B1B1B', big ? 1.4 : 1);
      if (g4 ? big && u % lab === 0 : big && (ppu * 10 >= 13 || u % 50 === 0)) c.fillText(String(u / 10), X(u), top + len + 12);
    }
    _font(10); c.textAlign = 'right'; c.fillStyle = '#6B5A30';
    c.fillText('cm', _W - 6, top + h - 5);
    _map = { axis: 'x', f: X, a: top - 44, b: top + h };
    if (!S || !m.ok) return;
    const xs = X(m.start), xf = X(m.scale);
    const shp = S.shape || _spec;
    const oh = shp === 'paper' ? 5 : shp === 'wire' ? 9 : shp === 'pencil' ? 20 : 26;
    const oy = top - oh;
    if (shp === 'pencil') {
      const tip = Math.min((xf - xs) * 0.12, 26);
      c.fillStyle = '#F2C230'; c.strokeStyle = '#6B5210'; c.lineWidth = 1;
      c.beginPath(); c.rect(xs, oy, xf - xs - tip, oh); c.fill(); c.stroke();
      c.fillStyle = '#E8C9A0';
      c.beginPath(); c.moveTo(xf - tip, oy); c.lineTo(xf, oy + oh / 2); c.lineTo(xf - tip, oy + oh); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#333'; c.beginPath(); c.moveTo(xf - tip * 0.3, oy + oh * 0.35); c.lineTo(xf, oy + oh / 2); c.lineTo(xf - tip * 0.3, oy + oh * 0.65); c.closePath(); c.fill();
    } else {
      c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1;
      c.beginPath(); c.rect(xs, oy, Math.max(1, xf - xs), oh); c.fill(); c.stroke();
    }
    c.setLineDash([3, 3]);
    _line(xs, oy - 6, xs, top + 4, 'rgba(20,33,29,0.55)', 1);
    _line(xf, oy - 6, xf, top + 4, 'rgba(20,33,29,0.55)', 1);
    c.setLineDash([]);
  }

  // ── Vernier caliper ──
  function _drawVernier() {
    const c = _cx, D = DATA(), I = _I(), m = _m(), S = _S();
    const { ppu, focus } = _view();
    const X = u => _W / 2 + (u - focus) * ppu;
    const zMm = (I.zero || 0) * 10;
    const jaw = m.ok ? m.jaw : 0, sc = m.ok ? m.scale : zMm;
    const by = _H * 0.2, bh = 36, edge = by + bh, low = _H * 0.8;
    // beam and main scale
    c.fillStyle = '#D9E0E5'; c.strokeStyle = 'rgba(30,45,55,0.7)'; c.lineWidth = 1.2;
    c.beginPath(); c.rect(X(-16), by, X(162) - X(-16), bh); c.fill(); c.stroke();
    c.fillStyle = '#C3CCD3';
    c.beginPath(); c.moveTo(X(-16), edge); c.lineTo(X(0), edge); c.lineTo(X(0), low); c.lineTo(X(-10), low); c.lineTo(X(-16), low - 12); c.closePath(); c.fill(); c.stroke();
    const u0 = Math.max(0, Math.floor(focus - _W / 2 / ppu) - 1), u1 = Math.min(150, Math.ceil(focus + _W / 2 / ppu) + 1);
    c.fillStyle = '#111'; c.textAlign = 'center';
    _font(ppu >= 7 ? 12 : 9);
    for (let u = u0; u <= u1; u++) {
      const big = u % 10 === 0, mid = u % 5 === 0;
      if (!big && !mid && ppu < 2.5) continue;
      const len = big ? 18 : mid ? 13 : 8;
      _line(X(u), edge, X(u), edge - len, '#111', big ? 1.4 : 1);
      if (big && ppu * 10 >= 12) c.fillText(String(u / 10), X(u), by + 11);
    }
    // slider with the vernier scale and the moving jaw
    const sx0 = X(jaw - 2), sx1 = X(sc + 13);
    c.fillStyle = 'rgba(236,241,244,0.96)'; c.strokeStyle = 'rgba(30,45,55,0.7)';
    c.beginPath(); c.rect(sx0, edge, Math.max(10, sx1 - sx0), 34); c.fill(); c.stroke();
    c.fillStyle = '#C3CCD3';
    c.beginPath(); c.moveTo(X(jaw), edge + 34); c.lineTo(X(jaw), low); c.lineTo(X(jaw) + Math.max(8, ppu * 8), low); c.lineTo(X(jaw) + Math.max(14, ppu * 12), edge + 34); c.closePath(); c.fill(); c.stroke();
    const hitK = _hit && m.ok && m.parts ? m.parts.div : -1;
    c.fillStyle = '#111';
    _font(ppu >= 12 ? 11 : 9);
    for (let k = 0; k <= 10; k++) {
      const x = X(sc + 0.9 * k), len = k % 5 === 0 ? 16 : 10;
      _line(x, edge, x, edge + len, k === hitK ? OK_C : '#111', k === hitK ? 2.6 : (k % 5 === 0 ? 1.4 : 1));
      if (k % 5 === 0 || ppu >= 12) c.fillText(String(k), x, edge + len + 10);
    }
    if (hitK >= 0) { const mm = Math.round(sc + 0.9 * hitK); _line(X(mm), edge, X(mm), edge - 18, OK_C, 2.6); }
    // labels, and the object between the jaws
    _font(10, 700); c.fillStyle = _colors.muted; c.textAlign = 'left';
    c.fillText('main scale', 8, by - 6);
    c.textAlign = 'center'; c.fillStyle = '#3A4A52';
    if (sx1 - sx0 > 60) c.fillText('vernier scale', clamp(X(sc + 4.5), 40, _W - 40), edge + 48);
    if (S && _spec !== 'closed' && m.ok) {
      c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1;
      const yT = _H * 0.56, yB = _H * 0.76;
      c.beginPath(); c.rect(X(0), yT, Math.max(1, X(jaw) - X(0)), yB - yT); c.fill(); c.stroke();
    }
    _map = { axis: 'x', f: X, a: by, b: edge + 34 };
    void D;
  }

  // ── Micrometer screw gauge ──
  function _drawMicrometer() {
    const c = _cx, D = DATA(), m = _m();
    const { ppu, focus } = _view();
    const X = u => _W / 2 + (u - focus) * ppu;
    const R = m.ok ? m.scale : 0, p = D.micrometerParts(R);
    const dy = _H * 0.52, sh = 30;
    // a small, not-to-scale frame so the pupil knows what they are looking at
    c.save(); c.translate(10, 10);
    c.strokeStyle = 'rgba(30,45,55,0.8)'; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(8, 12); c.lineTo(8, 40); c.quadraticCurveTo(8, 52, 22, 52); c.lineTo(58, 52); c.quadraticCurveTo(70, 52, 70, 40); c.lineTo(70, 22); c.stroke();
    c.fillStyle = '#9AA5AE'; c.fillRect(4, 8, 10, 10); c.fillRect(22, 9, 48, 8);
    if (_spec && _spec !== 'closed') { c.fillStyle = (D.SPECIMENS[_spec] || {}).color || '#999'; c.fillRect(15, 8, 6, 10); }
    c.restore();
    // sleeve (only the part left of the thimble shows)
    const xl = X(-2.5), xr = X(R);
    c.fillStyle = '#DDE3E7'; c.strokeStyle = 'rgba(30,45,55,0.7)'; c.lineWidth = 1.2;
    c.beginPath(); c.rect(xl, dy - sh / 2, Math.max(4, xr - xl), sh); c.fill(); c.stroke();
    _line(xl, dy, xr, dy, '#111', 1.3);
    c.fillStyle = _colors.ink; c.textAlign = 'center';
    _font(ppu >= 9 ? 12 : 9);
    for (let h = 0; h <= Math.floor(R * 2 + 1e-9); h++) {
      const u = h / 2, x = X(u);
      if (x < -5 || x > _W + 5) continue;
      if (h % 2 === 0) {
        const big = (u % 5 === 0);
        _line(x, dy, x, dy - (big ? 13 : 9), '#111', 1.2);
        if (big && ppu * 5 >= 14) c.fillText(String(u), x, dy - 17);
      } else _line(x, dy, x, dy + 9, '#111', 1.1);
    }
    // thimble, whose left edge sits at the reading
    const tw = clamp(_W * 0.3, 70, 130), th = clamp(_H * 0.5, 88, 160);
    const grd = c.createLinearGradient(0, dy - th / 2, 0, dy + th / 2);
    grd.addColorStop(0, '#B7C1C8'); grd.addColorStop(0.5, '#E6EBEE'); grd.addColorStop(1, '#AEB9C1');
    c.fillStyle = grd; c.strokeStyle = 'rgba(30,45,55,0.75)';
    c.beginPath(); c.rect(xr, dy - th / 2, tw, th); c.fill(); c.stroke();
    c.save();
    c.beginPath(); c.rect(xr, dy - th / 2 + 2, tw, th - 4); c.clip();
    const sp = clamp(ppu * 0.9, 7, 18), t0 = p.thimble;
    _font(sp >= 12 ? 11 : 9); c.textAlign = 'left'; c.fillStyle = '#111';
    for (let d = t0 - 7; d <= t0 + 7; d++) {
      const y = dy - (d - t0) * sp;
      const dd = ((d % 50) + 50) % 50, big = dd % 5 === 0;
      const hit = _hit && d === t0;
      _line(xr, y, xr + (big ? 16 : 9), y, hit ? OK_C : '#111', hit ? 2.6 : 1.1);
      if (big) c.fillText(String(dd), xr + 20, y + 4);
    }
    c.restore();
    _map = { axis: 'x', f: X, a: dy - 22, b: dy + 22 };
  }

  // ── Measuring cylinder (Grade 9) and measuring jug (Grade 4) ──
  // A vessel's scale: the cylinder has 1 cm³ marks numbered every 10 with a
  // longer one every 5; the jug 50 ml marks numbered every 100.
  function _cylGeo(I) {
    return { max: I.max || 100, mark: I.mark || 1, num: I.num || 10, mid: I.mark ? 0 : 5, zp: I.zoomPx || [6, 14] };
  }

  function _drawCylinder() {
    const c = _cx, D = DATA(), I = _I(), m = _m(), S = _S(), G = _cylGeo(I);
    const { ppu, focus } = _view();
    const Y = v => _H / 2 - (v - focus) * ppu;
    const cx = _W * 0.4, hw = I.wide ? clamp(_W * 0.2, 56, 90) : clamp(20 + ppu * 2, 26, 46), xl = cx - hw, xr = cx + hw;
    const yBase = Y(-0.03 * G.max), yLip = Y(1.08 * G.max);
    let V = m.ok ? m.scale : (S ? (S.before || 0) : 0);
    // Grades 7-8: the big stone pushes the water over the top.
    const spilling = _splash > 0 && S && S.hazard === 'spill';
    if (spilling) V = G.max * 1.06;
    // foot and glass
    c.fillStyle = 'rgba(150,175,185,0.6)';
    c.fillRect(xl - 16, yBase, hw * 2 + 32, 7);
    if (V > 0) {
      const men = I.meniscus != null ? I.meniscus : D.MENISCUS;
      const yB = Y(V), yT = Y(V + (men || G.mark * 0.15)), w = hw * 0.55;
      c.fillStyle = S && S.liquid ? S.liquid : 'rgba(122,182,222,0.5)';
      c.beginPath();
      c.moveTo(xl, yBase); c.lineTo(xl, yT);
      c.bezierCurveTo(xl + w * 0.08, yB, xl + w * 0.45, yB, xl + w, yB);
      c.lineTo(xr - w, yB);
      c.bezierCurveTo(xr - w * 0.45, yB, xr - w * 0.08, yB, xr, yT);
      c.lineTo(xr, yBase); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(20,80,130,0.9)'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(xl, yT); c.bezierCurveTo(xl + w * 0.08, yB, xl + w * 0.45, yB, xl + w, yB);
      c.lineTo(xr - w, yB); c.bezierCurveTo(xr - w * 0.45, yB, xr - w * 0.08, yB, xr, yT); c.stroke();
    }
    if (_spec === 'stone' || (S && S.shape === 'stone')) {
      const sy = yBase - 4, s = clamp(ppu * 2.2 * (S && S.volume > 30 ? 1.5 : 1), 8, hw * 0.85);
      c.fillStyle = S && S.color ? S.color : '#7D7A73'; c.strokeStyle = '#3F3D39'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(cx - s, sy); c.lineTo(cx - s * 0.7, sy - s * 0.8); c.lineTo(cx + s * 0.2, sy - s); c.lineTo(cx + s, sy - s * 0.4); c.lineTo(cx + s * 0.8, sy); c.closePath(); c.fill(); c.stroke();
      // Grades 7-8: an air bubble clinging to the top of the rough stone
      if (_bubbleOn()) {
        c.fillStyle = 'rgba(255,255,255,0.85)'; c.strokeStyle = 'rgba(20,80,130,0.9)';
        c.beginPath(); c.arc(cx + s * 0.1, sy - s - Math.max(3, s * 0.22), Math.max(3, s * 0.22), 0, Math.PI * 2); c.fill(); c.stroke();
      }
    } else if (S && S.shape === 'block') {
      const s = clamp(ppu * 2, 8, hw * 0.7);
      c.fillStyle = S.color; c.strokeStyle = '#3F3D39'; c.lineWidth = 1;
      c.beginPath(); c.rect(cx - s, yBase - 4 - s * 1.2, s * 2, s * 1.2); c.fill(); c.stroke();
    }
    c.strokeStyle = _colors.glass; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(xl, yLip); c.lineTo(xl, yBase); c.lineTo(xr, yBase); c.lineTo(xr, yLip); c.stroke();
    _line(xr - 6, Math.max(yLip, -10) + 10, xr - 6, Math.min(yBase, _H + 10) - 10, _colors.hi, 3);
    if (I.wide) {
      const ht = Y(G.max * 0.85), hb = Y(G.max * 0.35);
      c.strokeStyle = _colors.glass; c.lineWidth = 4;
      if (hb - ht > 20) { c.beginPath(); c.moveTo(xr, ht); c.bezierCurveTo(xr + 34, ht, xr + 34, hb, xr, hb); c.stroke(); }
    }
    // scale on the front of the glass
    const v0 = Math.max(0, focus - (_H / 2) / ppu - G.mark), v1 = Math.min(G.max, focus + (_H / 2) / ppu + G.mark);
    c.fillStyle = _colors.ink; c.textAlign = 'right';
    _font(ppu * G.mark >= 6 ? 12 : 9);
    for (let n = Math.ceil(v0 / G.mark); n <= Math.floor(v1 / G.mark); n++) {
      const v = n * G.mark;
      const big = v % G.num === 0, mid = G.mid ? v % G.mid === 0 : false;
      if (!big && !mid && ppu * G.mark < 2.4) continue;
      const len = big ? 16 : mid ? 11 : (I.wide ? 10 : 6);
      _line(xl, Y(v), xl + len, Y(v), _colors.ink, big ? 1.4 : 1);
      if (big) c.fillText(String(v), xl - 5, Y(v) + 4);
    }
    _font(10); c.textAlign = 'left'; c.fillStyle = _colors.muted;
    c.fillText(I.unit, xl + 4, Math.max(14, yLip + 14));
    _map = { axis: 'y', f: Y, a: xl - 34, b: xr + 8 };
    // Grades 7-8: water over the lip, down the glass and across the floor
    if (spilling) {
      const yl = Math.max(yLip, 4), yb = Math.min(yBase + 7, _H * 0.95);
      c.fillStyle = 'rgba(122,182,222,0.75)';
      c.fillRect(xr, yl, 5, yb - yl); c.fillRect(xl - 5, yl, 5, yb - yl);
      c.beginPath(); c.ellipse(cx, yb + 2, hw * 2.2, 5, 0, 0, Math.PI * 2); c.fill();
    }
    // Grades 7-8: cracked glass (a block dropped in, or the cylinder dropped)
    if (_crack > 0) {
      const yb = Math.min(yBase, _H - 8), yc = yb - Math.min(60, (yBase - yLip) * 0.3);
      c.strokeStyle = '#222'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(xl, yc); c.lineTo(xl + hw * 0.5, yc + 10); c.lineTo(xl + hw * 0.8, yc - 6); c.lineTo(cx + hw * 0.3, yc + 14); c.lineTo(xr, yc + 4); c.stroke();
      c.beginPath(); c.moveTo(cx, yb); c.lineTo(cx - 6, yb - 16); c.lineTo(cx + 4, yb - 26); c.stroke();
      c.fillStyle = '#C9D6DC';
      for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(xr + 10 + i * 12, yb + 4); c.lineTo(xr + 16 + i * 12, yb - 2 - (i % 3) * 3); c.lineTo(xr + 20 + i * 12, yb + 4); c.closePath(); c.fill(); }
    }
    // the eye, and its line of sight to the scale
    if (m.ok) {
      const xe = _W - 24;
      const ye = clamp(Y(V) + (_eye === 'above' ? -_H * 0.26 : _eye === 'below' ? _H * 0.26 : 0), 16, _H - 16);
      const ya = Y(m.apparent);
      c.setLineDash([5, 4]);
      _line(xe - 14, ye, xl, ya, _eye === 'level' ? 'rgba(35,115,74,0.9)' : 'rgba(192,38,45,0.9)', 1.5);
      c.setLineDash([]);
      c.fillStyle = '#fff'; c.strokeStyle = '#222'; c.lineWidth = 1.6;
      c.beginPath(); c.ellipse(xe, ye, 13, 8, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.fillStyle = '#233'; c.beginPath(); c.arc(xe - 4, ye, 3.6, 0, Math.PI * 2); c.fill();
    }
  }

  // ── Thermometers ──
  function _drawThermometer() {
    const c = _cx, I = _I(), S = _S();
    const { ppu, focus } = _view();
    const Y = v => _H / 2 - (v - focus) * ppu;
    const fine = I.step < 1;
    const sx = _W * 0.36, sw = 14;
    const yTop = Y(I.max + (fine ? 0.4 : 5)), yBot = Y(I.min - (fine ? 0.35 : 4));
    const yb = yBot + 12;
    // the beaker the bulb sits in (a Grade 4 thing says how it looks)
    const look = S ? (S.look || _spec) : null;
    _bk = null;
    if (S && look !== 'body' && yb < _H + 40) {
      const bw = 58, bt = yb - 44;
      _bk = { x: sx, y: bt };
      c.fillStyle = look === 'ice' ? 'rgba(210,235,245,0.7)' : look === 'tap' ? 'rgba(170,212,232,0.5)' : 'rgba(240,190,150,0.45)';
      c.fillRect(sx - bw, bt + 8, bw * 2, yb + 22 - bt - 8);
      c.strokeStyle = _colors.glass; c.lineWidth = 2;
      c.beginPath(); c.moveTo(sx - bw, bt); c.lineTo(sx - bw, yb + 22); c.lineTo(sx + bw, yb + 22); c.lineTo(sx + bw, bt); c.stroke();
      if (look === 'ice') { c.fillStyle = 'rgba(255,255,255,0.9)'; c.strokeStyle = 'rgba(120,170,190,0.9)'; [[-44, 12], [18, 18], [-20, 26], [30, -2]].forEach(([dx, dy]) => { c.beginPath(); c.rect(sx + dx, bt + dy, 16, 14); c.fill(); c.stroke(); }); }
      if (look === 'boiling' || look === 'hot') {
        const n = look === 'boiling' ? 10 : 3;
        for (let i = 0; i < n; i++) {
          const f = Labs.calm() ? (i / n) : ((_phase * 0.7 + i / n) % 1);
          c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1;
          c.beginPath(); c.arc(sx - bw + 8 + ((i * 37) % (bw * 2 - 16)), yb + 18 - f * (yb + 10 - bt), 2.4, 0, Math.PI * 2); c.stroke();
        }
      }
    }
    // stem, bulb, thread
    c.fillStyle = 'rgba(255,255,255,0.85)'; c.strokeStyle = _colors.glass; c.lineWidth = 2;
    c.beginPath(); c.moveTo(sx - sw / 2, yb - 6); c.lineTo(sx - sw / 2, yTop + sw / 2); c.arc(sx, yTop + sw / 2, sw / 2, Math.PI, 0); c.lineTo(sx + sw / 2, yb - 6); c.stroke(); c.fill();
    c.beginPath(); c.arc(sx, yb, 11, 0, Math.PI * 2); c.fillStyle = '#D8323A'; c.fill(); c.stroke();
    let T = S ? S.temp : 24;
    if (S && T < I.min) T = I.min - (fine ? 0.25 : 2);
    let yT = Y(T);
    if (_burst > 0) yT = yTop - 10;
    c.fillStyle = '#D8323A';
    c.fillRect(sx - 2, Math.max(yT, yTop - 12), 4, yb - Math.max(yT, yTop - 12));
    // scale
    const lo = Math.max(I.min, focus - (_H / 2) / ppu - 1), hi = Math.min(I.max, focus + (_H / 2) / ppu + 1);
    const tx = sx + sw / 2 + 3;
    c.fillStyle = _colors.ink; c.textAlign = 'left';
    _font(ppu * I.step >= 5 ? 12 : 10);
    const n0 = Math.ceil(lo / I.step - 1e-9), n1 = Math.floor(hi / I.step + 1e-9);
    for (let n = n0; n <= n1; n++) {
      const v = Math.round(n * I.step * 10) / 10;
      const whole = I.num ? Math.abs(v % I.num) < 1e-9 : n % 10 === 0, mid = I.num ? false : n % 5 === 0;
      const px = ppu * I.step;
      if (!whole && !mid && px < 2.4) continue;
      if (!whole && px * 5 < 2.4) continue;
      const len = whole ? 14 : mid ? 10 : 6;
      _line(tx, Y(v), tx + len, Y(v), _colors.ink, whole ? 1.4 : 1);
      if (whole) c.fillText(String(v), tx + len + 3, Y(v) + 4);
    }
    _font(10); c.fillStyle = _colors.muted;
    c.fillText('°C', tx + 2, Math.max(14, yTop - 6));
    if (_spec === 'body') { _font(11, 700); c.textAlign = 'right'; c.fillText('under the arm', sx - 16, clamp(yb, 20, _H - 30)); }
    _map = { axis: 'y', f: Y, a: sx - 16, b: tx + 44 };
    if (_burst > 0 && !Labs.calm()) {
      c.strokeStyle = '#222'; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(sx - 7, yTop + 20); c.lineTo(sx + 3, yTop + 32); c.lineTo(sx - 4, yTop + 44); c.lineTo(sx + 6, yTop + 58); c.stroke();
      c.fillStyle = '#C9CED3';
      for (let i = 0; i < 7; i++) { c.beginPath(); c.arc(sx + 30 + i * 9, yTop + 24 + ((i * 17) % 30), 3, 0, Math.PI * 2); c.fill(); }
    }
    // Grade 4: snapped near the bulb - a jagged break and drops of red liquid.
    if (_crack > 0) {
      c.strokeStyle = '#222'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(sx - sw / 2 - 3, yb - 24); c.lineTo(sx - 2, yb - 18); c.lineTo(sx + 3, yb - 26); c.lineTo(sx + sw / 2 + 3, yb - 20); c.stroke();
      c.fillStyle = '#D8323A';
      for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(sx + 16 + i * 8, yb - 8 + ((i * 7) % 12), 2.4, 0, Math.PI * 2); c.fill(); }
    }
  }

  // ── Stopwatch ──
  function _drawStopwatch() {
    const c = _cx, S = _S();
    const t = _clock.t;
    const k = [1, 1.45, 2][_zoom - 1];
    const r0 = Math.min(_W * 0.27, _H * 0.36), r = r0 * k;
    const a = ((t % 60) / 60) * Math.PI * 2;
    const bx = _W * 0.64, by = _H * 0.52;
    const cx = bx - Math.sin(a) * r * (1 - 1 / k) * 0.9, cy = by + Math.cos(a) * r * (1 - 1 / k) * 0.9;
    // the event being timed
    if (S && k === 1) {
      if (_spec === 'pendulum') {
        const px = _W * 0.17, py = _H * 0.1, L = _H * 0.6, T = S.time / S.swings;
        const ang = 0.34 * Math.cos((2 * Math.PI * t) / T);
        const x = px + Math.sin(ang) * L, y = py + Math.cos(ang) * L;
        _line(px - 26, py, px + 26, py, '#555', 4);
        _line(px, py, x, y, '#333', 1.4);
        c.fillStyle = '#B5651D'; c.beginPath(); c.arc(x, y, 11, 0, Math.PI * 2); c.fill();
        _font(11, 700); c.fillStyle = _colors.muted; c.textAlign = 'center';
        c.fillText(`swings: ${Math.min(S.swings, Math.floor(t / T + 1e-9))}`, px, _H * 0.9);
      } else if (S.look === 'ball') {
        // Grade 4: a ball rolling down a slope, timed try after try
        const x0 = _W * 0.03, y0 = _H * 0.3, x1 = _W * 0.36, y1 = _H * 0.86;
        c.fillStyle = '#C9B08A'; c.strokeStyle = '#7A6440'; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.lineTo(x0, y1); c.closePath(); c.fill(); c.stroke();
        const T = _clock.target || S.time, f = T ? Math.min(1, t / T) : 0, br = 9, ang = Math.atan2(y1 - y0, x1 - x0);
        const px = x0 + (x1 - x0) * f, py = y0 + (y1 - y0) * f;
        c.fillStyle = '#F4F4F0'; c.strokeStyle = '#222';
        c.beginPath(); c.arc(px + Math.sin(ang) * br, py - Math.cos(ang) * br, br, 0, Math.PI * 2); c.fill(); c.stroke();
        _font(11, 700); c.fillStyle = _colors.muted; c.textAlign = 'center';
        c.fillText(_trial >= 0 ? `try ${_trial + 1}` : 'ready', (x0 + x1) / 2, _H * 0.95);
      } else {
        const hx = _W * 0.17, hy = _H * 0.78;
        c.fillStyle = '#555'; c.fillRect(hx - 36, hy, 72, 12);
        c.fillStyle = '#D9483B'; c.fillRect(hx - 30, hy + 2, 60, 3);
        c.strokeStyle = _colors.glass; c.lineWidth = 2;
        c.fillStyle = 'rgba(170,212,232,0.55)'; c.fillRect(hx - 24, hy - 40, 48, 38);
        c.beginPath(); c.moveTo(hx - 26, hy - 58); c.lineTo(hx - 26, hy); c.lineTo(hx + 26, hy); c.lineTo(hx + 26, hy - 58); c.stroke();
        const f = S.time ? t / S.time : 0, nb = Math.round(f * f * 10);
        for (let i = 0; i < nb; i++) {
          const q = Labs.calm() ? i / Math.max(1, nb) : ((_phase * 0.9 + i / Math.max(1, nb)) % 1);
          c.strokeStyle = 'rgba(255,255,255,0.95)'; c.lineWidth = 1;
          c.beginPath(); c.arc(hx - 18 + ((i * 13) % 36), hy - 6 - q * 30, 2.2, 0, Math.PI * 2); c.stroke();
        }
        if (f >= 1) { _font(11, 700); c.fillStyle = _colors.muted; c.textAlign = 'center'; c.fillText('boiling!', hx, hy - 66); }
      }
    }
    // case and face
    c.fillStyle = '#2E3A40'; c.fillRect(cx - r * 0.12, cy - r - 18, r * 0.24, 14);
    c.beginPath(); c.arc(cx, cy, r + 7, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#FBFBF8'; c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    _font(Math.max(9, r * 0.12), 700); c.textAlign = 'center';
    for (let i = 0; i < 60; i++) {
      const aa = (i / 60) * Math.PI * 2, s = Math.sin(aa), co = -Math.cos(aa);
      const inner = r * (i % 5 === 0 ? 0.82 : 0.9);
      _line(cx + s * inner, cy + co * inner, cx + s * r * 0.97, cy + co * r * 0.97, '#111', i % 5 === 0 ? 1.6 : 1);
      if (i % 5 === 0) c.fillText(String(i === 0 ? 60 : i), cx + s * r * 0.68, cy + co * r * 0.68 + r * 0.045);
    }
    // minute dial: 30 minutes a turn
    const mx = cx, my = cy - r * 0.36, mr = r * 0.2;
    c.strokeStyle = '#444'; c.lineWidth = 1; c.beginPath(); c.arc(mx, my, mr, 0, Math.PI * 2); c.stroke();
    _font(Math.max(7, r * 0.075), 700);
    for (let i = 0; i < 30; i++) {
      const aa = (i / 30) * Math.PI * 2, s = Math.sin(aa), co = -Math.cos(aa);
      _line(mx + s * mr * (i % 5 === 0 ? 0.72 : 0.84), my + co * mr * (i % 5 === 0 ? 0.72 : 0.84), mx + s * mr, my + co * mr, '#333', 1);
      if (i % 10 === 0 || (k > 1 && i % 5 === 0)) c.fillText(String(i), mx + s * mr * 0.46, my + co * mr * 0.46 + 3);
    }
    const ma = (t / 60 / 30) * Math.PI * 2;
    _line(mx, my, mx + Math.sin(ma) * mr * 0.85, my - Math.cos(ma) * mr * 0.85, '#1D3F6E', 2);
    _font(Math.max(7, r * 0.07), 600); c.fillStyle = '#666'; c.fillText('min', mx, my + mr + r * 0.1);
    // second hand
    _line(cx - Math.sin(a) * r * 0.12, cy + Math.cos(a) * r * 0.12, cx + Math.sin(a) * r * 0.93, cy - Math.cos(a) * r * 0.93, '#C0262D', 2);
    c.fillStyle = '#C0262D'; c.beginPath(); c.arc(cx, cy, 4, 0, Math.PI * 2); c.fill();
  }

  // ── Electronic balance ──
  function _drawBalance() {
    const c = _cx, D = DATA(), I = _I(), S = _S();
    const mass = S && _spec !== 'closed' ? S.mass : 0;
    const shown = D.clean(mass + (_tared ? 0 : I.zero));
    const bx = _W * 0.16, bw = _W * 0.68, by = _H * 0.56, bh = _H * 0.3;
    c.fillStyle = '#E3E8EB'; c.strokeStyle = 'rgba(30,45,55,0.6)'; c.lineWidth = 1.4;
    c.beginPath(); c.rect(bx, by, bw, bh); c.fill(); c.stroke();
    c.fillStyle = '#9AA5AE'; c.fillRect(_W / 2 - 5, by - 20, 10, 20);
    c.fillStyle = '#C7CFD5'; c.beginPath(); c.ellipse(_W / 2, by - 22, bw * 0.34, 7, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    const dw = Math.min(bw * 0.62, 190), dh = Math.min(bh * 0.46, 44), dx = _W / 2 - dw / 2, dyy = by + bh * 0.22;
    c.fillStyle = '#16231F'; c.beginPath(); c.rect(dx, dyy, dw, dh); c.fill();
    c.fillStyle = '#7CF2A0'; _font(Math.min(30, dh * 0.62), 800); c.textAlign = 'right';
    c.fillText(D.fmt(shown, 1), dx + dw - 30, dyy + dh * 0.72);
    _font(Math.min(16, dh * 0.36), 700); c.fillText('g', dx + dw - 10, dyy + dh * 0.72);
    _font(10, 700); c.fillStyle = _colors.muted; c.textAlign = 'left';
    c.fillText('ZERO', bx + 10, by + bh - 10);
    if (S && _spec !== 'closed') {
      const py = by - 30;
      c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1;
      c.beginPath();
      if (_spec === 'stone' || S.shape === 'stone') { c.moveTo(_W / 2 - 30, py + 6); c.lineTo(_W / 2 - 18, py - 18); c.lineTo(_W / 2 + 10, py - 24); c.lineTo(_W / 2 + 30, py - 6); c.lineTo(_W / 2 + 24, py + 6); c.closePath(); }
      else if (_spec === 'coin') c.ellipse(_W / 2, py + 2, 24, 6, 0, 0, Math.PI * 2);
      else c.arc(_W / 2, py - 6, 13, 0, Math.PI * 2);
      c.fill(); c.stroke();
    }
  }

  // ── A block in oblique view, sides labelled (Grades 7-8) ──
  // (cx, cy) is the middle of the drawing; maxPx the longest side on screen.
  function _box(cx, cy, dims, color, maxPx) {
    const c = _cx, [l, w, h] = dims;
    const k = maxPx / Math.max(l, h, w * 0.7);
    const L = l * k, H = h * k, d = w * k * 0.55, ox = d * 0.8, oy = d * 0.6;
    const x0 = cx - (L + ox) / 2, y0 = cy + (H + oy) / 2;
    c.strokeStyle = 'rgba(0,0,0,0.55)'; c.lineWidth = 1.2;
    c.fillStyle = color; c.beginPath(); c.rect(x0, y0 - H, L, H); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x0, y0 - H); c.lineTo(x0 + ox, y0 - H - oy); c.lineTo(x0 + L + ox, y0 - H - oy); c.lineTo(x0 + L, y0 - H); c.closePath();
    c.fill(); c.fillStyle = 'rgba(255,255,255,0.3)'; c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x0 + L, y0); c.lineTo(x0 + L + ox, y0 - oy); c.lineTo(x0 + L + ox, y0 - H - oy); c.lineTo(x0 + L, y0 - H); c.closePath();
    c.fillStyle = color; c.fill(); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fill(); c.stroke();
    _font(12, 800); c.fillStyle = _colors.ink;
    c.textAlign = 'center'; c.fillText(`${l} cm`, x0 + L / 2, y0 + 15);
    c.textAlign = 'right'; c.fillText(`${h} cm`, x0 - 5, y0 - H / 2 + 4);
    c.textAlign = 'left'; c.fillText(`${w} cm`, Math.min(x0 + L + ox + 5, _W - 38), y0 - H - oy / 2 + 4);
    return { x0, y0, L, H, ox, oy };
  }

  function _drawBlock() {
    const c = _cx, S = _S();
    c.textAlign = 'center';
    if (!S) { _font(13, 600); c.fillStyle = _colors.muted; c.fillText('Pick a block to measure', _W / 2, _H * 0.45); return; }
    _box(_W / 2, _H * 0.46, S.dims, S.color, Math.min(_W * 0.46, _H * 0.5));
    _font(12, 700); c.fillStyle = _colors.muted; c.textAlign = 'center';
    c.fillText('length × width × height = ?', _W / 2, _H * 0.88);
    if (_hit) { _font(15, 800); c.fillStyle = OK_C; c.fillText(`${S.dims.join(' × ')} = ${S.volume} cm³ ✓`, _W / 2, _H * 0.1); }
  }

  // ── Density bench (Grade 8) ── the balance (mass), the volume, and - once
  // the density is right - a tank of water where it floats or sinks.
  function _drawDensity() {
    const c = _cx, D = DATA(), S = _S(), m = _m();
    c.textAlign = 'center';
    if (!S || !m.ok) { _font(13, 600); c.fillStyle = _colors.muted; c.fillText('Pick something to find its density', _W / 2, _H * 0.45); return; }
    const In = m.info, n = x => String(D.clean(x));
    const ph = _hit ? _H * 0.58 : _H * 0.86;
    // the balance
    const bw = Math.min(_W * 0.42, 180), bx = _W * 0.25 - bw / 2, by = ph * 0.46, bh = ph * 0.34;
    c.fillStyle = '#E3E8EB'; c.strokeStyle = 'rgba(30,45,55,0.6)'; c.lineWidth = 1.2;
    c.beginPath(); c.rect(bx, by, bw, bh); c.fill(); c.stroke();
    c.fillStyle = '#C7CFD5'; c.beginPath(); c.ellipse(bx + bw / 2, by - 5, bw * 0.34, 5, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    const dw = bw * 0.8, dh = Math.min(bh * 0.55, 28), dx = bx + (bw - dw) / 2, dy = by + (bh - dh) / 2;
    c.fillStyle = '#16231F'; c.fillRect(dx, dy, dw, dh);
    c.fillStyle = '#7CF2A0'; _font(Math.min(17, dh * 0.64), 800); c.textAlign = 'right';
    c.fillText(D.fmt(In.liquid ? In.full : In.mass, 1) + ' g', dx + dw - 6, dy + dh * 0.72);
    const px = bx + bw / 2, py = by - 10;
    c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = 1;
    if (In.liquid) {
      c.fillRect(px - 7, py - 26, 14, 26);
      c.strokeStyle = _colors.glass; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(px - 8, py - 40); c.lineTo(px - 8, py); c.lineTo(px + 8, py); c.lineTo(px + 8, py - 40); c.stroke();
    } else if (In.dims) { c.beginPath(); c.rect(px - 18, py - 16, 36, 16); c.fill(); c.stroke(); }
    else { c.beginPath(); c.moveTo(px - 18, py); c.lineTo(px - 12, py - 14); c.lineTo(px + 6, py - 18); c.lineTo(px + 18, py - 6); c.lineTo(px + 14, py); c.closePath(); c.fill(); c.stroke(); }
    _font(11, 700); c.fillStyle = _colors.muted; c.textAlign = 'center';
    c.fillText('MASS', px, 16);
    if (In.liquid) c.fillText(`empty cylinder: ${n(In.empty)} g`, px, by + bh + 14);
    // the volume
    const rx = _W * 0.75;
    c.fillText('VOLUME', rx, 16);
    if (In.dims) _box(rx, ph * 0.52, In.dims, S.color, Math.min(_W * 0.2, ph * 0.38));
    else {
      const cw = 30, ct = ph * 0.14, cb = ph * 0.86, Yv = v => cb - (v / 100) * (cb - ct), top = In.liquid ? In.V : In.after;
      c.fillStyle = In.liquid ? S.color : 'rgba(122,182,222,0.6)';
      c.fillRect(rx - cw / 2, Yv(top), cw, cb - Yv(top));
      if (!In.liquid) { c.fillStyle = S.color; c.fillRect(rx - 8, cb - 12, 16, 12); }
      c.strokeStyle = _colors.glass; c.lineWidth = 2;
      c.beginPath(); c.moveTo(rx - cw / 2, ct); c.lineTo(rx - cw / 2, cb); c.lineTo(rx + cw / 2, cb); c.lineTo(rx + cw / 2, ct); c.stroke();
      _font(11, 800); c.fillStyle = _colors.ink;
      c.textAlign = 'left'; c.fillText(`${n(top)} cm³`, rx + cw / 2 + 4, Yv(top) + 4);
      if (!In.liquid) {
        c.setLineDash([3, 3]); _line(rx - cw / 2 - 6, Yv(In.before), rx + cw / 2, Yv(In.before), BAD_C, 1.4); c.setLineDash([]);
        c.textAlign = 'right'; c.fillStyle = BAD_C; c.fillText(`${n(In.before)} cm³`, rx - cw / 2 - 8, Yv(In.before) + 4);
      }
    }
    // float or sink
    if (_hit) {
      const ty = ph + 6, tb = _H * 0.92, tx0 = _W * 0.1, tx1 = _W * 0.9, wl = ty + (tb - ty) * 0.34;
      c.fillStyle = 'rgba(122,182,222,0.35)'; c.fillRect(tx0, wl, tx1 - tx0, tb - wl);
      let label;
      if (In.liquid) {
        c.fillStyle = S.color; c.globalAlpha = 0.8; c.fillRect(tx0, wl - 12, tx1 - tx0, 12); c.globalAlpha = 1;
        label = `${S.name.toLowerCase()} floats on water`;
      } else {
        const hh = Math.min(tb - wl - 4, 30), ww = hh * 1.6, xb = _W / 2 - ww / 2;
        const frac = m.floats ? m.want / D.WATER : 1, yt = m.floats ? wl - hh * (1 - frac) : tb - hh;
        c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = 1;
        c.beginPath(); c.rect(xb, yt, ww, hh); c.fill(); c.stroke();
        c.fillStyle = 'rgba(122,182,222,0.45)'; c.fillRect(xb, Math.max(yt, wl), ww, yt + hh - Math.max(yt, wl));
        label = m.floats ? `floats: ${Math.round(frac * 100)}% under the water` : 'sinks to the bottom';
      }
      _line(tx0, wl, tx1, wl, 'rgba(20,80,130,0.9)', 1.4);
      c.strokeStyle = _colors.glass; c.lineWidth = 2;
      c.beginPath(); c.moveTo(tx0, ty); c.lineTo(tx0, tb); c.lineTo(tx1, tb); c.lineTo(tx1, ty); c.stroke();
      _font(12, 800); c.fillStyle = _colors.ink; c.textAlign = 'center';
      c.fillText(`${D.fmt(m.want, 2)} g/cm³ - ${label}`, _W / 2, ty + 12);
    }
  }

  // ── Kitchen scale (Grade 4) ──
  // A round dial, 0 at the top and clockwise to 1000 g, marks every 20 g. Its
  // pointer rests at 40 g until the knob sets it to 0. Zooming enlarges the
  // dial around the pointer tip, as the stopwatch does around its hand.
  function _drawDial() {
    const c = _cx, D = DATA(), I = _I(), S = _S();
    const mass = S ? S[I.quantity] : 0;
    const shown = D.clean(mass + (_tared ? 0 : I.zero));
    const k = [1, 1.8, 2.8][_zoom - 1];
    const r0 = Math.min(_W * 0.26, _H * 0.27), r = r0 * k;
    const TH = v => (v / I.max) * Math.PI * 2 * 0.9;
    const th = TH(shown);
    const bx = _W / 2, by = _H * 0.6;
    const cx = bx - Math.sin(th) * r * (1 - 1 / k) * 0.9, cy = by + Math.cos(th) * r * (1 - 1 / k) * 0.9;
    if (k === 1) {
      c.fillStyle = '#E3E8EB'; c.strokeStyle = 'rgba(30,45,55,0.6)'; c.lineWidth = 1.4;
      c.beginPath(); c.rect(cx - r * 1.25, cy - r * 1.15, r * 2.5, r * 2.3); c.fill(); c.stroke();
      c.fillStyle = '#C7CFD5';
      c.beginPath(); c.ellipse(cx, cy - r * 1.15 - 7, r * 0.95, 7, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      if (S) {
        c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1;
        c.beginPath(); c.ellipse(cx, cy - r * 1.15 - 20, 22, 13, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      }
      c.fillStyle = '#9AA5AE'; c.beginPath(); c.arc(cx + r * 1.05, cy + r * 0.95, 7, 0, Math.PI * 2); c.fill();
      _font(10, 700); c.fillStyle = _colors.muted; c.textAlign = 'right';
      c.fillText('knob', cx + r * 1.05 - 10, cy + r * 0.95 + 4);
    }
    c.fillStyle = '#FBFBF8'; c.strokeStyle = '#3A4A52'; c.lineWidth = 2;
    c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#111'; c.textAlign = 'center';
    _font(Math.max(9, Math.min(14, r * 0.12)), 700);
    for (let v = 0; v <= I.max; v += I.step) {
      const a = TH(v), s = Math.sin(a), co = -Math.cos(a), big = v % I.num === 0;
      const inner = r * (big ? 0.8 : 0.88);
      _line(cx + s * inner, cy + co * inner, cx + s * r * 0.97, cy + co * r * 0.97, '#111', big ? 1.6 : 1);
      if (big) c.fillText(String(v), cx + s * r * 0.66, cy + co * r * 0.66 + 4);
    }
    c.fillStyle = _colors.muted; c.fillText('g', cx, cy + r * 0.4);
    const s = Math.sin(th), co = -Math.cos(th);
    _line(cx - s * r * 0.1, cy - co * r * 0.1, cx + s * r * 0.92, cy + co * r * 0.92, '#C0262D', 2.4);
    c.fillStyle = '#C0262D'; c.beginPath(); c.arc(cx, cy, 4, 0, Math.PI * 2); c.fill();
    _map = { axis: 'dial', cx, cy, r, th: TH };
  }

  // Red and green lines across the scale: where the pupil read, and the truth.
  function _drawMarks() {
    if (!_map || !_marks.length) return;
    const c = _cx;
    _font(10, 800);
    _marks.forEach((mk, i) => {
      if (_map.axis === 'dial') {
        const a = _map.th(mk.u), s = Math.sin(a), co = -Math.cos(a);
        _line(_map.cx + s * _map.r * 0.35, _map.cy + co * _map.r * 0.35, _map.cx + s * _map.r * 1.02, _map.cy + co * _map.r * 1.02, mk.c, 2.4);
        c.fillStyle = mk.c; c.textAlign = 'center';
        c.fillText(mk.t, clamp(_map.cx + s * _map.r * 1.14, 30, _W - 30), clamp(_map.cy + co * _map.r * 1.14 + (i ? 12 : 0), 12, _H - 6));
        return;
      }
      const p = _map.f(mk.u);
      if (!(p > -2 && p < (_map.axis === 'x' ? _W : _H) + 2)) return;
      c.fillStyle = mk.c;
      if (_map.axis === 'y') {
        _line(_map.a, p, _map.b, p, mk.c, 2.4);
        c.textAlign = 'left'; c.fillText(mk.t, _map.b + 3, p + (i ? 12 : -4));
      } else {
        _line(p, _map.a, p, _map.b, mk.c, 2.4);
        c.textAlign = 'center'; c.fillText(mk.t, clamp(p, 30, _W - 30), i ? _map.b + 12 : _map.a - 4);
      }
    });
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      if (f.type === 'flash') {
        const lines = f.data.lines || [];
        const w = Math.min(_W - 24, 230), h = 18 + lines.length * 18;
        c.globalAlpha = k < 0.85 ? 1 : (1 - k) / 0.15;
        c.fillStyle = 'rgba(255,255,255,0.95)'; c.strokeStyle = BAD_C; c.lineWidth = 2;
        c.beginPath(); c.rect(_W / 2 - w / 2, 12, w, h); c.fill(); c.stroke();
        _font(13, 800); c.textAlign = 'center';
        lines.forEach((l, j) => { c.fillStyle = j === 0 ? BAD_C : OK_C; c.fillText(l, _W / 2, 32 + j * 18); });
        c.globalAlpha = 1;
      } else if (f.type === 'crack') {
        _crack = k;
      } else if (f.type === 'splash') {
        _splash = k;
        const sx = _bk ? _bk.x : _W * 0.36, sy = _bk ? _bk.y : _H * 0.6;
        for (let j = 0; j < 9; j++) {
          const a = -Math.PI / 2 + (j - 4) * 0.3, d = 10 + k * 60;
          c.fillStyle = `rgba(120,180,230,${Math.max(0, 1 - k)})`;
          c.beginPath(); c.arc(sx + Math.cos(a) * d, sy + Math.sin(a) * d + k * k * 50, 3.2, 0, Math.PI * 2); c.fill();
        }
        c.fillStyle = `rgba(255,255,255,${0.4 * (1 - k)})`; c.fillRect(0, 0, _W, _H);
      } else if (f.type === 'burst') {
        _burst = k;
        c.fillStyle = `rgba(255,255,255,${0.5 * (1 - k)})`; c.fillRect(0, 0, _W, _H);
      }
      if (f.t >= f.dur) { _fx.splice(i, 1); if (f.done) f.done(); }
    }
  }

  // ══ Loop ═════════════════════════════════════
  function _step(dt) {
    if (!dt) return;
    _phase += dt;
    if (_clock.run) {
      _clock.t = Math.min(_clock.target, _clock.t + dt * _clock.speed);
      if (_clock.t >= _clock.target) _finishTiming();
    }
  }
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
    _step(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _step(0.05); _readouts(); if (_cx) _draw(0); }
  function _debug() {
    const m = _inst ? _m() : null;
    return { inst: _inst, spec: _spec, zoom: _zoom, eye: _eye, align: _align, tared: _tared, timed: _timed, clock: Object.assign({}, _clock),
             ok: !!(m && m.ok), want: m && m.ok ? m.want : null, busy: _busy, panel: _panel,
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, done: Object.keys(_mission.done), i: _mission.i, cards: _mission.cards, wrong: _mission.wrong, success: _mission.success },
             rows: _rows.slice(0, 6).map(r => r.what + ': ' + r.value), log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             marks: _marks.map(x => x.t),
             grade: _g(), trial: _trial, trials: _trialVals.slice(), unit: $('lab-measure-uselect') ? $('lab-measure-uselect').value : null,
             talking: _talking, looping: !!_raf, crack: _crack, splash: _splash, tapped: _tapped, hit: _hit };
  }


  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => _forG(DATA().GUIDES),
    start: startGuide,
    snapshot: () => _busy ? null : ({ _inst, _spec, _zoom, _eye, _align, _tared, _timed, _tapped, _clock, _phase, _marks, _hit, _panel, _group, _guide, _rows, _log, _stGrade, _trial, _readTrial, _trialVals, _bk }),
    restore: state => { ({ _inst, _spec, _zoom, _eye, _align, _tared, _timed, _tapped, _clock, _phase, _marks, _hit, _panel, _group, _guide, _rows, _log, _stGrade, _trial, _readTrial, _trialVals, _bk } = state); },
    refresh: () => { if (_guide) _guideEnter(); },
    stop: () => { _stopGuide(true); }
  };
  return { study, mount, unmount, startMission, startGuide, discoveryGuide, selectInstrument, selectSpecimen, zoomIn, zoomOut,
           setEye, setAlign, tare, tapGlass, liftCylinder, startTiming, stir, check, showReading, misread, choose, speak, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMeasure = LabMeasure;
