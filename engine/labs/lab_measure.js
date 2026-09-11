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
// ══════════════════════════════════════════════
const LabMeasure = (() => {
  const LAB = 'measure';
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { flash: 0.9, burst: 1.2 };
  const MAX_ZOOM = 3;
  const OK_C = '#23734A', BAD_C = '#C0262D';

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const DATA = () => LabMeasureData;

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _inst = null, _spec = null, _zoom = 1, _eye = 'level', _align = 'end', _tared = false, _timed = false;
  let _clock = { run: false, t: 0, target: 0, speed: 1 };
  let _phase = 0, _marks = [], _hit = false, _map = null, _burst = 0;
  let _panel = 'sandbox', _group = 'length', _mission = null, _guide = null;
  let _rows = [], _log = [], _fx = [], _busy = false, _instant = false, _colors = null, _tipIdx = -1;

  const _I = () => (_inst ? DATA().INSTRUMENTS[_inst] : null);
  const _S = () => (_spec ? DATA().SPECIMENS[_spec] : null);
  const _opts = () => ({ align: _align, eye: _eye, tared: _tared, timed: _timed });
  const _m = () => DATA().measure(_inst, _spec, _opts());
  const _kind = () => (_I() ? _I().kind : null);

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-measure">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Physics · Grade 9</span><h1>Measurement Lab</h1></div>
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
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools">
            <button type="button" class="lab-tool" data-act="zin"><span aria-hidden="true">🔍</span>Zoom in</button>
            <button type="button" class="lab-tool" data-act="zout"><span aria-hidden="true">🔎</span>Zoom out</button>
            <button type="button" class="lab-tool" data-act="eye"><span aria-hidden="true">👁️</span><b id="lab-measure-eye">Eye: level</b></button>
            <button type="button" class="lab-tool" data-act="ctx"><span aria-hidden="true" id="lab-measure-ctx-ico">📖</span><b id="lab-measure-ctx">How to read</b></button>
          </div>
          <form class="lab-measure-read" id="lab-measure-read" autocomplete="off">
            <label for="lab-measure-input">Your reading</label>
            <div class="lab-measure-row">
              <button type="button" class="lab-btn" data-act="neg" id="lab-measure-neg" aria-label="Make the reading negative" hidden>±</button>
              <input id="lab-measure-input" class="lab-measure-input" type="text" inputmode="decimal" enterkeyhint="done" spellcheck="false">
              <span class="lab-measure-unit" id="lab-measure-unit"></span>
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
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _readouts();
    const st = Labs.store(LAB);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or measure anything you like from the shelf.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
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
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
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
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = DATA().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Choosing and setting up ══════════════════
  function _clearReading() {
    _marks = []; _hit = false;
    const inp = $('lab-measure-input');
    if (inp) { inp.value = ''; inp.classList.remove('is-right', 'is-wrong'); }
  }

  function selectInstrument(id, quiet) {
    const I = DATA().INSTRUMENTS[id];
    if (!I || _busy) return;
    _inst = id; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _group = I.group;
    _clearReading();
    if (!quiet) {
      _coach(`${I.name}: reads to ${I.prec}. ${I.worn ? 'It is an OLD one - check its zero first. ' : ''}Now pick something to measure.`);
      _renderPanel();
    }
    _readouts();
    if (!quiet) _guideEvent('inst:' + id);
  }

  function selectSpecimen(id) {
    const D = DATA(), I = _I();
    if (_busy) return;
    if (!I) { _coach('Pick an instrument first.'); return; }
    if (!D.specimensFor(_inst).includes(id)) return;
    const m = D.measure(_inst, id, Object.assign(_opts(), { timed: false }));
    if (!m.ok && m.why === 'range') { _coach(m.msg); return; }
    _spec = id; _timed = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _clearReading();
    if (!m.ok && m.why === 'burst') { _burstHazard(); return; }
    const S = _S();
    if (m.ok) _coach(id === 'closed' ? `Nothing to measure: ${S.label[I.quantity]}. ${I.kind === 'balance' ? 'What does it read?' : 'Does it read zero?'}` : `Measuring ${S.label[I.quantity]}. ${I.how}`);
    else _coach(m.msg);
    if (_inst === 'balance' && id !== 'closed' && !_tared) _coach(`The ${S.name.toLowerCase()} is on the pan. ${I.how}`);
    _renderPanel();
    _readouts();
    _guideEvent('spec:' + id);
  }

  function zoomIn() {
    if (!_canZoom()) { _coach(_inst ? 'The balance shows its reading as digits - there is nothing to zoom.' : 'Pick an instrument first.'); return; }
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
  const _canZoom = () => !!_inst && _kind() !== 'balance';

  function setEye(pos) {
    if (_inst !== 'cylinder') { _coach('Move your eye when you read the measuring cylinder - that is where parallax shows most.'); return; }
    _eye = pos;
    _clearReading();
    _coach(pos === 'level' ? 'Eye level with the bottom of the meniscus - looking straight at the scale. Now read it.'
                           : `Eye ${pos} the level. Follow the dashed line: where it crosses the scale is what you would read from there.`);
    _readouts();
    _guideEvent('eye:' + pos);
  }
  function _cycleEye() {
    if (_inst !== 'cylinder') { setEye('level'); return; }
    setEye(_eye === 'level' ? 'above' : _eye === 'above' ? 'below' : 'level');
  }

  function setAlign(a) {
    if (_inst !== 'rule') return;
    _align = a;
    _clearReading();
    _coach(a === 'mark' ? 'The object now starts at the 1.0 cm mark. Read its far end and subtract 1.0 cm.'
                        : 'The object is pushed against the end of the ruler. Look closely at that end…');
    _readouts();
    _guideEvent('align:' + a);
  }

  function tare() {
    if (_inst !== 'balance') return;
    if (_spec && _spec !== 'closed') { _coach(`Take the ${_S().name.toLowerCase()} off first - tap “Nothing” so the pan is empty, then zero it.`); return; }
    _tared = true;
    _clearReading();
    _coach('Zeroed: the empty balance now reads 0.0 g. Anything you put on it is read directly.');
    _readouts();
    _guideEvent('tare');
  }

  function startTiming() {
    if (_inst !== 'stopwatch') return;
    const S = _S();
    if (!S) { _coach('Pick something to time first.'); return; }
    if (_clock.run) { _coach('It’s already timing - watch it.'); return; }
    _timed = false;
    _clearReading();
    _clock = { run: true, t: 0, target: S.time, speed: S.speed || 1 };
    _coach(S.swings ? 'Go! Start as the bob is let go… the stopwatch stops after 10 swings.' : 'Go! The stopwatch stops when the water boils.');
    _readouts();
    if (_instant || Labs.calm()) _finishTiming();
  }
  function _finishTiming() {
    _clock.run = false; _clock.t = _clock.target; _timed = true;
    _coach('Stopped. Read the small minute dial and the big second hand, then type the time in SECONDS.');
    _readouts();
    _guideEvent('start');
  }

  // The fourth tool does whatever this instrument needs.
  function _ctxDef() {
    const k = _kind();
    if (k === 'rule') return { ico: '📍', label: _align === 'end' ? 'Start: ruler end' : 'Start: 1 cm mark' };
    if (k === 'vernier' || k === 'micrometer') return { ico: '🤏', label: 'Close the jaws' };
    if (k === 'balance') return { ico: '0️⃣', label: _tared ? 'Zeroed ✓' : 'Zero (tare)' };
    if (k === 'stopwatch') return { ico: '▶️', label: _clock.run ? 'Timing…' : 'Start timing', off: !_spec || _clock.run };
    return { ico: '📖', label: 'How to read', off: !_inst };
  }
  function _ctx() {
    const k = _kind();
    if (k === 'rule') setAlign(_align === 'end' ? 'mark' : 'end');
    else if (k === 'vernier' || k === 'micrometer') selectSpecimen('closed');
    else if (k === 'balance') tare();
    else if (k === 'stopwatch') startTiming();
    else if (_inst) _coach('📖 ' + _I().how);
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
  function check(value) {
    const D = DATA(), inp = $('lab-measure-input');
    if (_busy) return;
    const m = _m();
    if (!m.ok) { _coach(m.msg); return; }
    if (value != null && inp) inp.value = typeof value === 'number' ? D.fmt(value, m.dp) : String(value);
    const v = D.parseReading(inp ? inp.value : '');
    if (v == null) { _coach(`Type your reading as a number, in ${m.unit}.`); return; }
    const verdict = D.judge(m, v).verdict;
    if (inp) { inp.classList.toggle('is-right', verdict === 'ok'); inp.classList.toggle('is-wrong', verdict !== 'ok'); }
    if (verdict === 'ok') { _accept(m, v); return; }
    if (_mission) _mission.wrong++;
    const I = _I(), typed = D.fmt(v, m.dp) + ' ' + m.unit;
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
    check(m.want);
  }
  function misread(kind) {
    const m = _m();
    if (!m.ok || !(m.mistakes[kind] || []).length) { if (m.msg) _coach(m.msg); return; }
    check(m.mistakes[kind][0]);
  }

  function _markable(m) { return ['rule', 'vernier', 'micrometer', 'cylinder', 'thermometer'].includes(DATA().INSTRUMENTS[m.inst].kind); }

  function _accept(m) {
    const D = DATA(), I = _I();
    _hit = true;
    _marks = _markable(m) && I.kind !== 'vernier' && I.kind !== 'micrometer' ? [{ u: m.scale, c: OK_C, t: '✓' }] : [];
    if (m.spec === 'closed') {
      _logEntry({ title: `${I.short}: zero check`, note: true,
        obs: m.want === 0 ? `It reads ${D.fmt(0, m.dp)} ${m.unit} with nothing to measure - no zero error.`
                          : `It reads ${m.want > 0 ? '+' : ''}${D.fmt(m.want, m.dp)} ${m.unit} with nothing to measure: a zero error. Correct every reading: true = reading − zero error.` });
    } else _row(m);
    _coach('✅ Correct! ' + m.work);
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
  const MISTAKE_TOKEN = { parallax: 'misread:apparent', meniscus_top: 'misread:top', zero_raw: 'misread:raw', end_error: 'misread:end' };

  function _mistake(kind, m, v) {
    const D = DATA(), I = _I(), S = _S();
    const f = x => D.fmt(x, m.dp) + ' ' + m.unit;
    let ctx = {}, disc = null, after = null;
    if (kind === 'parallax') {
      ctx = { pos: _eye, typed: f(v), want: f(m.scale) };
      _marks = [{ u: m.apparent, c: BAD_C, t: 'you read' }, { u: m.scale, c: OK_C, t: 'true level' }];
      disc = _eye === 'above' ? 'parallax_high' : 'parallax_low';
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
    }, { lines: [`You read ${f(v)} ✗`, kind === 'zero_raw' ? `True ${f(m.want)} ✓` : `True ${f(m.want)} ✓`] });
  }

  function _result(kind, ctx, onClose) {
    const R = DATA().RESULTS[kind];
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
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Get a new thermometer',
        onClose: () => {
          _burst = 0; _spec = null; _clearReading(); _readouts(); _renderPanel();
          _coach('A new clinical thermometer. It is only for 35-42 °C - for hot water, pick the laboratory thermometer.');
        } });
    });
  }

  // ══ Notebook ═════════════════════════════════
  function _row(m) {
    const D = DATA(), I = _I(), S = _S();
    _rows.unshift({ what: S.label[I.quantity], inst: I.short, value: D.fmt(m.want, m.dp) + ' ' + m.unit,
                    conv: D.convert(m.quantity, m.want, m.unit), prec: I.prec.split(' · ')[0] });
    if (_rows.length > 30) _rows.length = 30;
  }
  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 30) _log.length = 30;
  }
  function _notebookHTML() {
    const table = _rows.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Readings</caption>
        <thead><tr><th scope="col">Measuring</th><th scope="col">Instrument</th><th scope="col">Reading</th><th scope="col">Reads to</th></tr></thead>
        <tbody>${_rows.slice(0, 14).map(r => `<tr><th scope="row">${esc(r.what)}</th><td>${esc(r.inst)}</td>
          <td><b>${esc(r.value)}</b><span class="lab-measure-conv">${esc(r.conv)}</span></td><td class="lab-measure-prec">${esc(r.prec)}</td></tr>`).join('')}</tbody>
      </table></div>` : '';
    const notes = _log.length ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>` : '';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>
      ${table}${notes}${!table && !notes ? '<p class="lab-empty">Your readings appear here, with their units, what they are in other units and how precisely the instrument reads.</p>' : ''}</section>`;
  }

  // ══ Missions ═════════════════════════════════
  const _mdef = () => _mission && DATA().MISSIONS.find(x => x.id === _mission.id);

  function startMission(id) {
    const M = DATA().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _inst = null; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false; _align = 'end';
    _clearReading();
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
    const t = M.tasks.find(x => !ms.done[x.id] && x.inst === m.inst && x.spec === m.spec && (!x.eye || x.eye === _eye));
    if (!t) return;
    ms.done[t.id] = true;
    const n = M.tasks.filter(x => ms.done[x.id]).length;
    if (n === M.tasks.length) {
      ms.success = true;
      Labs.confetti();
      setTimeout(() => _coach('🎯 All done! Tap “Answer the questions” to finish the mission.'), 0);
    }
  }

  function choose(instId) {
    const ms = _mission, D = DATA();
    if (!ms || ms.id !== 'choose' || ms.success || _busy) return;
    const C = D.CHOICES[ms.i], I = D.INSTRUMENTS[instId];
    if (!C || !I) return;
    selectInstrument(instId, true);
    if (instId === C.best) {
      _logEntry({ title: `Job ${ms.i + 1}: ${C.job}`, obs: `${I.name} ✓ - ${C.why}` });
      ms.i++;
      if (ms.i >= D.CHOICES.length) { ms.success = true; Labs.confetti(); _coach('🧰 Every job has its tool! Tap “Answer the questions” to finish.'); }
      else _coach(`✅ Yes - the ${I.name.toLowerCase()}: ${C.why} Next job!`);
      _renderPanel();
    } else {
      ms.cards++;
      const B = D.INSTRUMENTS[C.best];
      _renderPanel();
      _result('wrong_tool', { inst: I.name, reason: D.wrongToolReason(C, instId), best: B.name, bestWhy: C.why },
        () => _coach(`Job ${ms.i + 1}: ${C.job}. Try again.`));
    }
    _readouts();
  }

  function _quiz() {
    const ms = _mission, M = _mdef();
    if (!ms || !ms.success || !M) return;
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
      if (ms.id === 'choose') lines.push(ms.cards ? `${ms.cards} wrong pick${ms.cards === 1 ? '' : 's'} - every job right first time for an extra star.` : 'Every job right first time. 🧰');
      else if (ms.cards || ms.wrong > 2) lines.push(`${ms.cards} error card${ms.cards === 1 ? '' : 's'} and ${ms.wrong} wrong reading${ms.wrong === 1 ? '' : 's'} - read carefully for an extra star.`);
      else lines.push('Every reading right, no errors. 📏');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or hunt for discoveries.'); } });
    } });
  }

  function _missionListHTML() {
    const st = Labs.store(LAB);
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Do the measuring, answer the exam-style questions, earn up to three stars.</p>
      ${DATA().MISSIONS.map(M => {
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
    if (ms.id === 'choose') {
      const C = D.CHOICES[ms.i];
      body = `<ul class="lab-steps">${D.CHOICES.map((c, k) => `<li class="${k < ms.i ? 'is-done' : ''}">${esc(c.job)}</li>`).join('')}
          <li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
        ${C && !ms.success ? `<p class="lab-measure-job"><small>Job ${ms.i + 1} of ${D.CHOICES.length} · which instrument?</small>${esc(C.job)}</p>
          <div class="lab-items">${D.CHOICE_INSTRUMENTS.map(id => _instButton(id, 'data-choose')).join('')}</div>` : ''}`;
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
  const _gdef = () => _guide && (_guide.def || DATA().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || DATA().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _inst = null; _spec = null; _zoom = 1; _eye = 'level'; _tared = false; _timed = false;
    _clock = { run: false, t: 0, target: 0, speed: 1 };
    _clearReading();
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
    if (k === 'eye') return _inst === 'cylinder' && _eye === v;
    if (k === 'align') return _inst === 'rule' && _align === v;
    if (k === 'tare') return _inst === 'balance' && _tared;
    if (k === 'zoom') return _zoom >= MAX_ZOOM;
    return false;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
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
    if (!s) return;
    const [k, v] = s.on.split(':');
    if (k === 'inst') selectInstrument(v);
    else if (k === 'spec') selectSpecimen(v);
    else if (k === 'zoom') zoomIn();
    else if (k === 'eye') setEye(v);
    else if (k === 'align') setAlign(v);
    else if (k === 'tare') tare();
    else if (k === 'start') startTiming();
    else if (k === 'read') showReading();
    else if (k === 'misread') misread(v);
  }

  // A discovery's recipe, in words a pupil can follow.
  function _autoStep(on) {
    const D = DATA(), [k, v] = on.split(':');
    if (k === 'inst') { const I = D.INSTRUMENTS[v]; return { on, say: `Pick the ${I.name.toLowerCase()}.`, btn: `${I.icon} Pick the ${I.short.toLowerCase()}` }; }
    if (k === 'spec') {
      if (v === 'closed') return { on, say: 'Close it with nothing to measure (jaws shut, or the pan empty).', btn: '🤏 Nothing - close it' };
      const S = D.SPECIMENS[v];
      return { on, say: `Choose the ${S.name.toLowerCase()} to measure.`, btn: `${S.icon} ${S.name}` };
    }
    if (k === 'zoom') return { on, say: 'Zoom in on the scale.', btn: '🔍 Zoom in' };
    if (k === 'eye') return v === 'level' ? { on, say: 'Bring your eye level with the bottom of the meniscus.', btn: '👁️ Eye level' }
                                          : { on, say: `Move your eye ${v} the water level.`, btn: `👁️ Eye ${v}` };
    if (k === 'align') return v === 'mark' ? { on, say: 'Line the object up with the 1 cm mark.', btn: '📍 Start at the 1 cm mark' }
                                           : { on, say: 'Push the object up against the very end of the ruler.', btn: '📍 Start at the ruler’s end' };
    if (k === 'tare') return { on, say: 'With the pan empty, press Zero (tare).', btn: '0️⃣ Zero the balance' };
    if (k === 'start') return { on, say: 'Start the stopwatch and let it run until it stops.', btn: '▶️ Start timing' };
    if (k === 'misread') {
      const M = { apparent: ['Read the mark where your line of sight (the dashed line) crosses the scale.', '✏️ Read it from there'],
                  top: ['Read the mark level with the EDGES of the water, where it curves up the glass.', '✏️ Read the top of the curve'],
                  raw: ['Read the scales and write the reading down just as it is - without checking the zero.', '✏️ Write the scale reading down'],
                  end: ['Read the mark at the far end and write that down as the length.', '✏️ Write the far-end reading down'] }[v];
      return { on, say: M[0], btn: M[1] };
    }
    return { on, say: 'Read the scale and type your reading - or let me show you how.', btn: '✏️ Show me the reading' };
  }

  function discoveryGuide(id) {
    const d = DATA().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = DATA().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
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
    const st = Labs.store(LAB);
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : DATA().GUIDES.find(g => !st.guides[g.id]);
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
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    const sel = k === 'inst' ? `[data-inst="${v}"]`
      : k === 'spec' ? `[data-spec="${v}"]`
      : k === 'zoom' ? '[data-act="zin"]'
      : k === 'eye' ? '[data-act="eye"]'
      : (k === 'align' || k === 'tare' || k === 'start') ? '[data-act="ctx"]'
      : '[data-act="check"]';
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
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${M.id}">${best ? 'Play again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Choose</b> a guided experiment (the best place to start) or a mission.</li>
        <li><b>Follow the yellow box</b> under the scale. The thing to tap next glows yellow.</li>
        <li><b>Zoom in, read the scale</b> and type your reading. Every reading goes in your lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${DATA().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${DATA().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or measure freely: pick an instrument from the shelf below.</p>
    </section>`;
  }

  function _instButton(id, attr) {
    const I = DATA().INSTRUMENTS[id];
    const on = attr === 'data-inst' && _inst === id;
    return `<button type="button" class="lab-item" ${attr}="${id}" aria-pressed="${on}">
      <span class="lab-measure-ico" aria-hidden="true">${I.icon}</span>
      <span class="lab-item-text"><b>${esc(I.name)}</b><small>${esc(I.meta)}</small></span></button>`;
  }

  function _shelfHTML() {
    const D = DATA();
    const insts = Object.keys(D.INSTRUMENTS).filter(id => D.INSTRUMENTS[id].group === _group);
    const I = _I();
    const specs = I ? D.specimensFor(_inst).map(id => {
      const S = D.SPECIMENS[id];
      return `<button type="button" class="lab-item" data-spec="${id}" aria-pressed="${_spec === id}">
        <span class="lab-measure-ico" aria-hidden="true">${S.icon}</span>
        <span class="lab-item-text"><b>${esc(id === 'closed' ? (I.kind === 'balance' ? 'Nothing - empty pan' : 'Nothing - jaws closed') : S.name)}</b>
        <small>${esc(id === 'closed' ? 'Check the zero' : QUANTITY_WORD[I.quantity])}</small></span></button>`;
    }).join('') : '';
    return `<section class="lab-shelf" aria-label="Instruments">
      <div class="lab-shelf-head">
        <div class="lab-seg" role="group" aria-label="Instruments">
          <button type="button" data-group="length" aria-pressed="${_group === 'length'}">📏 Length</button>
          <button type="button" data-group="other" aria-pressed="${_group === 'other'}">🧪 Other</button>
        </div>
        <p class="lab-hint">1 · Pick an instrument.</p>
      </div>
      <div class="lab-items">${insts.map(id => _instButton(id, 'data-inst')).join('')}</div>
      ${I ? `<p class="lab-hint lab-measure-step">2 · What will you measure with the ${esc(I.name.toLowerCase())}?</p>
        <div class="lab-items">${specs}</div>` : ''}
    </section>`;
  }
  const QUANTITY_WORD = { length: 'length / diameter', volume: 'volume', time: 'time', temp: 'temperature', mass: 'mass' };

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.getAttribute('role') === 'tab') b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission
      ? _missionHTML() + (_mission.id === 'choose' ? '' : _shelfHTML()) + _notebookHTML()
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
  function _discover(id) {
    const d = DATA().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover(LAB, id, { title: d && d.title, total: DATA().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store(LAB).disc).length}/${DATA().DISCOVERIES.length}`;
  }

  function _foundHTML() {
    const st = Labs.store(LAB);
    const all = DATA().DISCOVERIES;
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what you saw and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _intro() {
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

  function _help() {
    const D = DATA();
    const units = ['length', 'mass', 'volume', 'time', 'temp'].map(q => {
      const Q = D.QUANTITIES[q];
      const inst = Object.values(D.INSTRUMENTS).filter(i => i.quantity === q && !i.worn).map(i => i.short).join(', ');
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
          ${Object.values(D.INSTRUMENTS).filter(i => !i.worn).map(i => `<li><b>${esc(i.name)}</b> (to ${esc(i.prec)}): ${esc(i.how)}</li>`).join('')}</ul></section>
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
    if (chip) chip.innerHTML = I ? `${I.icon} ${esc(I.short)} <small>reads to ${esc(I.prec)}</small>` : 'Pick an instrument';
    const st = $('lab-status');
    if (st) {
      const chips = [];
      if (_canZoom() && _zoom > 1) chips.push(`<span class="lab-chip">🔍 ${_zoom}×</span>`);
      if (_inst === 'cylinder' && _eye !== 'level') chips.push(`<span class="lab-chip is-warm">👁️ Eye ${_eye} the level</span>`);
      if (I && I.worn) chips.push('<span class="lab-chip is-warm">⚠️ Old - check its zero</span>');
      if (_inst === 'balance' && _tared) chips.push('<span class="lab-chip">0️⃣ Zeroed</span>');
      if (_clock.run) chips.push('<span class="lab-chip">⏱️ Timing…</span>');
      st.innerHTML = chips.join('');
    }
    const c = $('lab-contents');
    if (c) {
      if (S && I) {
        let t = 'Measuring: ' + S.label[I.quantity];
        if (_inst === 'cylinder' && S.before != null) t += ` · water before: ${S.before} cm³`;
        if (_inst === 'rule') t += _align === 'end' ? ' · lined up with the ruler’s end' : ' · starts at the 1.0 cm mark';
        c.textContent = t;
      } else c.textContent = I ? 'Now pick something to measure from the shelf.' : 'Pick an instrument from the shelf below.';
    }
    const zin = _root.querySelector('[data-act="zin"]'), zout = _root.querySelector('[data-act="zout"]');
    if (zin) zin.disabled = !_canZoom() || _zoom >= MAX_ZOOM;
    if (zout) zout.disabled = !_canZoom() || _zoom <= 1;
    const eye = _root.querySelector('[data-act="eye"]');
    if (eye) eye.disabled = _inst !== 'cylinder';
    const eyeL = $('lab-measure-eye');
    if (eyeL) eyeL.textContent = 'Eye: ' + (_inst === 'cylinder' ? _eye : 'level');
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
    const inp = $('lab-measure-input'), btn = _root && _root.querySelector('[data-act="check"]');
    const ready = !!m.ok && !_busy;
    if (inp) inp.disabled = !ready;
    if (btn) btn.disabled = !ready;
    const u = $('lab-measure-unit');
    if (u) u.textContent = I ? I.unit : '';
    const neg = $('lab-measure-neg');
    if (neg) neg.hidden = !(I && I.kind === 'vernier');
    const h = $('lab-measure-hint');
    if (h) h.textContent = !I ? 'Pick an instrument and something to measure.'
      : m.ok ? `The ${I.name.toLowerCase()} reads to ${I.prec.split(' · ')[0]}. Type the reading in ${I.unit}.`
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
      if (z === 1) return { ppu: (_H - 40) / 114, focus: 52 };
      return { ppu: z === 2 ? 6 : 14, focus: m.ok ? m.scale : 50 };
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
      default: _drawEmpty();
    }
    _drawMarks();
    _drawFx(dt);
    c.restore();
  }

  function _drawEmpty() {
    const c = _cx;
    c.fillStyle = _colors.muted; c.textAlign = 'center';
    _font(15, 700);
    c.fillText('📏 🔧 🗜️ 🧪 ⏱️ 🌡️ ⚖️', _W / 2, _H * 0.42);
    _font(13, 600);
    c.fillText('Pick an instrument from the shelf below', _W / 2, _H * 0.56);
  }

  function _line(x1, y1, x2, y2, col, w) {
    const c = _cx;
    c.strokeStyle = col; c.lineWidth = w || 1;
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  }

  // ── Metre rule ──
  function _drawRule() {
    const c = _cx, D = DATA(), m = _m(), S = _S();
    const { ppu, focus } = _view();
    const X = u => _W / 2 + (u - focus) * ppu;
    const top = _H * 0.5, h = 46, worn = D.RULE.wornMm;
    const x0 = X(worn), x1 = Math.min(_W + 20, X(1000));
    c.fillStyle = '#EEDBA6'; c.strokeStyle = 'rgba(70,45,10,0.6)'; c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(x1, top); c.lineTo(x0, top);
    const jag = Math.max(2, Math.min(7, ppu * 0.6));
    for (let i = 1; i <= 6; i++) c.lineTo(x0 + (i % 2 ? jag : 0), top + (h * i) / 6);
    c.lineTo(x1, top + h); c.closePath(); c.fill(); c.stroke();
    const u0 = Math.max(worn + 1, Math.floor(focus - _W / 2 / ppu) - 1), u1 = Math.min(1000, Math.ceil(focus + _W / 2 / ppu) + 1);
    c.fillStyle = '#1B1B1B'; c.textAlign = 'center';
    _font(ppu >= 6 ? 12 : 10);
    for (let u = u0; u <= u1; u++) {
      const big = u % 10 === 0, mid = u % 5 === 0;
      if (!big && !mid && ppu < 2.2) continue;
      if (!big && ppu < 0.8) continue;
      const len = big ? 17 : mid ? 12 : 7;
      _line(X(u), top, X(u), top + len, '#1B1B1B', big ? 1.4 : 1);
      if (big && (ppu * 10 >= 13 || u % 50 === 0)) c.fillText(String(u / 10), X(u), top + len + 12);
    }
    _font(10); c.textAlign = 'right'; c.fillStyle = '#6B5A30';
    c.fillText('cm', _W - 6, top + h - 5);
    _map = { axis: 'x', f: X, a: top - 44, b: top + h };
    if (!S || !m.ok) return;
    const xs = X(m.start), xf = X(m.scale);
    const oh = _spec === 'paper' ? 5 : _spec === 'wire' ? 9 : _spec === 'pencil' ? 20 : 26;
    const oy = top - oh;
    if (_spec === 'pencil') {
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

  // ── Measuring cylinder ──
  function _drawCylinder() {
    const c = _cx, D = DATA(), m = _m(), S = _S();
    const { ppu, focus } = _view();
    const Y = v => _H / 2 - (v - focus) * ppu;
    const cx = _W * 0.4, hw = clamp(20 + ppu * 2, 26, 46), xl = cx - hw, xr = cx + hw;
    const yBase = Y(-3), yLip = Y(108);
    const V = m.ok ? m.scale : (S ? (S.before || 0) : 0);
    // foot and glass
    c.fillStyle = 'rgba(150,175,185,0.6)';
    c.fillRect(xl - 16, yBase, hw * 2 + 32, 7);
    if (V > 0) {
      const yB = Y(V), yT = Y(V + D.MENISCUS), w = hw * 0.55;
      c.fillStyle = 'rgba(122,182,222,0.5)';
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
    if (_spec === 'stone') {
      const sy = yBase - 4, s = clamp(ppu * 2.2, 8, hw * 0.8);
      c.fillStyle = '#7D7A73'; c.strokeStyle = '#3F3D39'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(cx - s, sy); c.lineTo(cx - s * 0.7, sy - s * 0.8); c.lineTo(cx + s * 0.2, sy - s); c.lineTo(cx + s, sy - s * 0.4); c.lineTo(cx + s * 0.8, sy); c.closePath(); c.fill(); c.stroke();
    }
    c.strokeStyle = _colors.glass; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(xl, yLip); c.lineTo(xl, yBase); c.lineTo(xr, yBase); c.lineTo(xr, yLip); c.stroke();
    _line(xr - 6, Math.max(yLip, -10) + 10, xr - 6, Math.min(yBase, _H + 10) - 10, _colors.hi, 3);
    // scale on the front of the glass
    const v0 = Math.max(0, Math.floor(focus - (_H / 2) / ppu) - 1), v1 = Math.min(100, Math.ceil(focus + (_H / 2) / ppu) + 1);
    c.fillStyle = _colors.ink; c.textAlign = 'right';
    _font(ppu >= 6 ? 12 : 9);
    for (let v = v0; v <= v1; v++) {
      const big = v % 10 === 0, mid = v % 5 === 0;
      if (!big && !mid && ppu < 2.4) continue;
      const len = big ? 16 : mid ? 11 : 6;
      _line(xl, Y(v), xl + len, Y(v), _colors.ink, big ? 1.4 : 1);
      if (big) c.fillText(String(v), xl - 5, Y(v) + 4);
    }
    _font(10); c.textAlign = 'left'; c.fillStyle = _colors.muted;
    c.fillText('cm³', xl + 4, Math.max(14, yLip + 14));
    _map = { axis: 'y', f: Y, a: xl - 34, b: xr + 8 };
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
    // the beaker the bulb sits in
    if (S && _spec !== 'body' && yb < _H + 40) {
      const bw = 58, bt = yb - 44;
      c.fillStyle = _spec === 'ice' ? 'rgba(210,235,245,0.7)' : _spec === 'tap' ? 'rgba(170,212,232,0.5)' : 'rgba(240,190,150,0.45)';
      c.fillRect(sx - bw, bt + 8, bw * 2, yb + 22 - bt - 8);
      c.strokeStyle = _colors.glass; c.lineWidth = 2;
      c.beginPath(); c.moveTo(sx - bw, bt); c.lineTo(sx - bw, yb + 22); c.lineTo(sx + bw, yb + 22); c.lineTo(sx + bw, bt); c.stroke();
      if (_spec === 'ice') { c.fillStyle = 'rgba(255,255,255,0.9)'; c.strokeStyle = 'rgba(120,170,190,0.9)'; [[-44, 12], [18, 18], [-20, 26], [30, -2]].forEach(([dx, dy]) => { c.beginPath(); c.rect(sx + dx, bt + dy, 16, 14); c.fill(); c.stroke(); }); }
      if (_spec === 'boiling' || _spec === 'hot') {
        const n = _spec === 'boiling' ? 10 : 3;
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
      const whole = fine ? n % 10 === 0 : n % 10 === 0, mid = n % 5 === 0;
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
      if (_spec === 'stone') { c.moveTo(_W / 2 - 30, py + 6); c.lineTo(_W / 2 - 18, py - 18); c.lineTo(_W / 2 + 10, py - 24); c.lineTo(_W / 2 + 30, py - 6); c.lineTo(_W / 2 + 24, py + 6); c.closePath(); }
      else if (_spec === 'coin') c.ellipse(_W / 2, py + 2, 24, 6, 0, 0, Math.PI * 2);
      else c.arc(_W / 2, py - 6, 13, 0, Math.PI * 2);
      c.fill(); c.stroke();
    }
  }

  // Red and green lines across the scale: where the pupil read, and the truth.
  function _drawMarks() {
    if (!_map || !_marks.length) return;
    const c = _cx;
    _font(10, 800);
    _marks.forEach((mk, i) => {
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
    if (!_root || !_cv || !_cv.isConnected) return;
    if (typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') return;
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
             marks: _marks.map(x => x.t) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, selectInstrument, selectSpecimen, zoomIn, zoomOut,
           setEye, setAlign, tare, startTiming, check, showReading, misread, choose, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMeasure = LabMeasure;
