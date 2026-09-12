'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Quadrat Field (Biology, NCE Grade 9 · B3 Biodiversity)
//
//  A top-down 20 m × 20 m study plot in a Mauritian forest clearing, with
//  four real species growing in patches: invasive strawberry guava, privet and
//  lantana, and seedlings of the endemic Mauritian ebony. Throw a 1 m × 1 m
//  quadrat at random coordinates (or - the mistake - put it where the plants
//  are thickest), look inside it, count one species with the edge rule (tap
//  the plants yourself, or let the lab count), repeat, and estimate the
//  population: mean per quadrat × (plot area ÷ quadrat area). Then let a
//  cyclone, a drought, ten years of invasion, deforestation or a conservation
//  team change the plot, and survey it again.
//  Guided experiments, three Missions and a collection of Discoveries.
//
//  ⚠ Every outcome comes from lab_quadrat_data.js (LabQuadratData). This file
//    only moves things over time and draws them. If a count looks wrong on
//    screen, fix the DATA, not the animation.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the survey still runs and the plot still
//    shows its state, but nothing moves and effects apply at once.
//  ⚠ Every control is a real <button>. Tapping the picture (to choose a
//    square, or to tick a plant while counting) is an extra, never the only way.
// ══════════════════════════════════════════════
const LabQuadrat = (() => {
  const P = () => LabQuadratData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { throw: 0.8, fast: 0.28, bars: 1.0, edge: 1.0, census: 1.2, event: 1.1, prick: 0.9 };
  const TOP = 70, BOT = 28;      // canvas px kept clear for the chips and the status strip
  const ZM = 0.3;                // metres of ground shown around the frame in the quadrat view

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const num = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const dp2 = n => String(Math.round(n * 100) / 100);
  const dp1 = n => String(Math.round(n * 10) / 10);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0, _dpr = 1;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _events = [], _plants = null, _sp = 'guava', _gloves = false, _view = 'field';
  let _series = null, _serialN = 0, _q = null, _hist = [], _log = [];
  let _panel = 'sandbox', _mission = null, _guide = null, _lastQuiz = null;
  let _fx = [], _shake = 0, _busy = false, _instant = false, _colors = null, _tipIdx = -1;
  let _seed = (Date.now() >>> 0), _rand = null, _fieldCv = null, _fieldDirty = true, _estShow = null;

  const SP = sp => P().SPECIES[sp || _sp];

  function _newSeries() {
    _serialN++;
    _series = { id: _serialN, sp: _sp, key: _events.join('>'), year: P().yearOf(_events), quads: [], est: null };
    _q = null; _estShow = null;
    if (_view === 'zoom') _view = 'field';
  }
  function _resetBench() {
    _events = []; _plants = P().makeField([]); _sp = 'guava'; _gloves = false; _view = 'field';
    _fx = []; _busy = false; _shake = 0;
    _newSeries();
    _fieldDirty = true;
    if (!_rand) _rand = P().rng(_seed);
  }
  const _mkQ = (x, y, how) => ({ x, y, how, counted: false, count: null, marks: new Set(), cls: P().classify(_plants, _sp, x, y) });
  const _takenKeys = () => _series.quads.map(q => P().key(q.x, q.y));
  const _prickly = q => P().countQuad(_plants, 'lantana', q.x, q.y, 'all') > 0;

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-quadrat">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Biology · Grade 9</span><h1>Quadrat Field</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-quadrat-gloves" class="lab-goggles lab-quadrat-gloves" data-act="gloves" aria-pressed="false"><span aria-hidden="true">🧤</span><span id="lab-quadrat-gloves-label">Gloves off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-seg lab-quadrat-views" role="group" aria-label="What the picture shows">
            <button type="button" data-set="view" data-v="field">🗺 The plot</button>
            <button type="button" data-set="view" data-v="zoom">🔍 In the quadrat</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-quadrat-stage">
            <canvas id="lab-canvas" role="img" aria-label="A study plot in a forest clearing, seen from above"></canvas>
            <div class="lab-quadrat-chips" id="lab-quadrat-chips"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Place your quadrat and count the organisms inside it.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools" id="lab-quadrat-tools">
            <button type="button" class="lab-tool" data-act="throw"><span aria-hidden="true">🎲</span>Throw at random</button>
            <button type="button" class="lab-tool" data-act="count"><span aria-hidden="true">✅</span>Count (edge rule)</button>
            <button type="button" class="lab-tool" data-act="auto5"><span aria-hidden="true">⏩</span>5 more at random</button>
            <button type="button" class="lab-tool" data-act="estimate"><span aria-hidden="true">🧮</span>Estimate</button>
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
    if (!_plants) _resetBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _cv.onclick = _onCanvas;
    _resize();
    _wire();
    _renderPanel();
    _syncSet();
    _readouts();
    const st = Labs.store('quadrat');
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or survey the plot yourself.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _stop();
    _root = null; _cv = null; _cx = null; _fieldCv = null; _fieldDirty = true;
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), ink: v('--lab-ink', '#14211D'),
                muted: v('--lab-muted', '#56665F'), surface: v('--lab-surface', '#FFFFFF') };
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(440, Math.max(300, w * 0.94)));
    _dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * _dpr); _cv.height = Math.round(h * _dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(_dpr, 0, 0, _dpr, 0, 0);
    _readColors();
    _fieldDirty = true;
    _draw(0);
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      const s = e.target.closest('[data-set]');
      if (s) { _set(s.dataset.set, s.dataset.v); if (s.closest('.lab-panel')) _showStage(); return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); if (a.closest('.lab-panel')) _showStage(); return; }
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
      if (m) { startMission(m.dataset.mission); }
    };
  }
  function _showStage() {
    const z = $('lab-quadrat-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A tap on the picture: on the plot it CHOOSES a square (not random); in the
  // quadrat view it ticks or unticks one plant of the species being counted.
  function _onCanvas(e) {
    if (_busy || !_cv) return;
    const r = _cv.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (_view === 'field') {
      const g = _fieldGeom();
      const mx = (x - g.x0) / g.k, my = (y - g.y0) / g.k;
      if (mx < 0 || my < 0 || mx >= P().FIELD.w || my >= P().FIELD.h) return;
      place(Math.floor(mx), Math.floor(my));
      return;
    }
    if (!_q || _q.counted) return;
    const z = _zoomGeom(), c = _q.cls;
    const ids = new Set([...c.in, ...c.edge_in, ...c.edge_out]);
    let best = null, bd = Infinity;
    _plants.forEach(p => {
      if (!ids.has(p.id)) return;
      const px = z.sx(p.x), py = z.sy(p.y), d = Math.hypot(px - x, py - y);
      if (d < bd) { bd = d; best = p; }
    });
    if (best && bd <= Math.max(18, P().R * z.k + 8)) tapPlant(best.id);
  }

  function tapPlant(id) {
    if (!_q || _q.counted || _busy) return;
    if (_q.marks.has(id)) _q.marks.delete(id); else _q.marks.add(id);
    _readouts();
  }

  function _do(tok) {
    const i = tok.indexOf(':');
    if (i > 0) _set(tok.slice(0, i), tok.slice(i + 1));
    else _act(tok);
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free surveying. The plot is all yours.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) { const id = _mission.id; startMission(id); } break;
      case 'guide-stop': _stopGuide(false); break;
      case 'gloves': _set('gloves', _gloves ? 'off' : 'on'); break;
      case 'throw': throwQ(); break;
      case 'thick': thick(); break;
      case 'count': count('rule'); break;
      case 'record': record(); break;
      case 'untap': if (_q && !_q.counted) { _q.marks.clear(); _readouts(); _coach('Ticks cleared. Tap each plant to count it again.'); } break;
      case 'auto5': auto5(); break;
      case 'estimate': estimate(); break;
      case 'new': newSurvey(); break;
      case 'census': census(); break;
      case 'restore': restore(); break;
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

  // ══ Settings ═════════════════════════════════
  function _set(k, v) {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return; }
    const D = P();
    switch (k) {
      case 'species': {
        if (!D.SPECIES[v]) return;
        if (v === _sp) { _coach(`You are already counting ${SP().plural}.`); break; }
        const had = _series.quads.length;
        _sp = v;
        _fieldDirty = true;
        if (had) _newSeries();
        else { _series.sp = v; if (_q) _q = _mkQ(_q.x, _q.y, _q.how); }
        const S = SP();
        _coach(`Counting ${S.plural} now - ${S.local}, ${S.latin}. ${D.STATUS_WORDS[S.status]}: ${S.meta.split('. ').slice(-1)[0].toLowerCase()}.${had ? ' A new species needs a new results table.' : ''}`);
        break;
      }
      case 'gloves':
        _gloves = v === 'on';
        _coach(_gloves ? 'Gloves on. Some plants in this clearing have prickles - now you can part them safely.'
                       : 'Gloves off. Careful: some plants here have prickly stems.');
        break;
      case 'view':
        if (v !== 'field' && v !== 'zoom') return;
        if (v === 'zoom' && !_q) { _coach('Throw the quadrat first - then you can look inside it.'); return; }
        _view = v;
        break;
      case 'count':
        if (v === 'all' || v === 'inside') count(v);
        return;
      case 'event':
        if (!D.EVENTS[v]) return;
        _event(v);
        return;
      default: return;
    }
    _after(k + ':' + v);
  }

  // After any change: repaint and tell the guide.
  function _after(token) {
    _syncSet();
    _readouts();
    _refresh();
    _guideEvent(token);
  }

  function _syncSet() {
    if (!_root) return;
    const cur = { species: _sp, gloves: _gloves ? 'on' : 'off', view: _view };
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set;
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === b.dataset.v));
    });
    const gb = $('lab-quadrat-gloves');
    if (gb) {
      gb.classList.toggle('is-on', _gloves);
      gb.setAttribute('aria-pressed', String(_gloves));
      const l = $('lab-quadrat-gloves-label');
      if (l) l.textContent = _gloves ? 'Gloves on' : 'Put on gloves';
    }
  }

  // ══ Placing the quadrat ══════════════════════
  function throwQ() {
    if (_busy) return;
    const sq = P().randomSquares(_rand, 1, _takenKeys())[0];
    if (!sq) { _coach('Every square in the plot has been sampled - start a new survey.'); return; }
    _place(sq[0], sq[1], 'random', 'throw');
  }
  function thick() {
    if (_busy) return;
    const sq = P().thickest(_plants, _sp, 1, _takenKeys())[0];
    if (!sq) return;
    _place(sq[0], sq[1], 'thick', 'thick');
  }
  // Choosing a square yourself (a tap on the plot) - not random either.
  function place(x, y) {
    if (_busy) return;
    x = Math.floor(+x); y = Math.floor(+y);
    if (!(x >= 0 && y >= 0 && x < P().FIELD.w && y < P().FIELD.h)) return;
    if (_takenKeys().includes(P().key(x, y))) { _coach('That square is already in your table. Choose another.'); return; }
    _place(x, y, 'chosen', 'place');
  }
  function _place(x, y, how, token) {
    _busy = true; _estShow = null; _view = 'field';
    _fxAdd('throw', () => {
      _busy = false;
      _q = _mkQ(x, y, how);
      _view = 'zoom';
      const S = SP();
      _coach(how === 'random' ? `The quadrat landed at the random coordinates x = ${x} m, y = ${y} m. Count the ${S.plural} inside it.`
        : how === 'thick' ? `You put the quadrat at x = ${x} m, y = ${y} m - right in the thickest patch of ${S.short}. Count what is inside…`
        : `You chose the square at x = ${x} m, y = ${y} m. Count the ${S.plural} inside it.`);
      _after(token);
    }, { x, y });
  }

  // ══ Counting ═════════════════════════════════
  function _countGuard() {
    if (_busy) return false;
    if (!_q) { _coach('Throw the quadrat first - 🎲 under the picture.'); return false; }
    if (_q.counted) { _coach('This quadrat is already in your table. Throw the quadrat again for the next one.'); return false; }
    if (!_gloves && _prickly(_q)) { _hazard('lantana'); return false; }
    return true;
  }

  // rule: 'rule' (the edge rule) · 'all' (everything touching the frame) · 'inside' (wholly inside only)
  function count(rule) {
    if (!_countGuard()) return;
    const D = P(), c = _q.cls, right = D.countBy(c, 'rule'), S = SP();
    const tok = rule === 'rule' ? 'count' : 'count:' + rule;
    if (rule !== 'rule') {
      const said = D.countBy(c, rule);
      if (said !== right) { _edgeMistake(rule, said, right); return; }
      _record(right, false);
      _coach(`No ${S.plural} crossed the ${rule === 'all' ? 'bottom or right' : 'top or left'} side this time, so it made no difference: ${right}. Next time it will - use the edge rule every time.`);
      _after(tok);
      return;
    }
    _record(right, false);
    const bits = [];
    if (c.edge_in.length) bits.push(`${c.edge_in.length} on the top or left side counted`);
    if (c.edge_out.length) bits.push(`${c.edge_out.length} on the bottom or right side left out`);
    _coach(`${right} ${right === 1 ? S.plural.replace(/s$/, '') : S.plural} in this quadrat${bits.length ? ' (' + bits.join(', ') + ')' : ''} - recorded in your table.`
      + (_series.quads.length < P().MIN_Q ? ' Throw again: one square metre is not enough.' : ''));
    _after(tok);
  }

  // The pupil's own tally, from the plants they ticked.
  function record() {
    if (!_countGuard()) return;
    const D = P(), c = _q.cls, marks = _q.marks;
    const ruleSet = new Set([...c.in, ...c.edge_in]);
    if (!marks.size && ruleSet.size) {
      _coach(`Tap each ${SP().plural.replace(/s$/, '')} in the 🔍 quadrat view to tick it, then record your count - or use ✅ Count.`);
      if (_view !== 'zoom') { _view = 'zoom'; _readouts(); }
      return;
    }
    if (marks.size === ruleSet.size && [...marks].every(id => ruleSet.has(id))) {
      _record(ruleSet.size, false);
      _coach(`Exactly right: ${ruleSet.size}. You followed the edge rule - recorded in your table.`);
      _after('record');
      return;
    }
    const extraOut = [...marks].filter(id => c.edge_out.includes(id)).length;
    const missIn = c.edge_in.filter(id => !marks.has(id)).length;
    const missCore = c.in.filter(id => !marks.has(id)).length;
    if (extraOut && !missIn && !missCore) { _edgeMistake('all', marks.size, ruleSet.size); return; }
    if (missIn && !extraOut && !missCore) { _edgeMistake('inside', marks.size, ruleSet.size); return; }
    const tips = [];
    if (missCore) tips.push(`${missCore} inside the frame ${missCore === 1 ? 'is' : 'are'} not ticked yet`);
    if (missIn) tips.push(`${missIn} on the top or left side should be counted`);
    if (extraOut) tips.push(`${extraOut} on the bottom or right side should be left out`);
    _coach(`Not quite - you ticked ${marks.size}. ${tips.join('; ')}. ${D.countBy(c, 'rule') === 0 ? '' : 'Look again, or use ✅ Count.'}`);
  }

  function _record(n, quiet) {
    const q = _q;
    q.counted = true; q.count = n;
    _series.quads.push({ i: _series.quads.length + 1, x: q.x, y: q.y, count: n, how: q.how, spp: P().speciesIn(_plants, q.x, q.y) });
    P().countDiscoveries(_series).forEach(_discover);
    if (!quiet) _readouts();
  }

  function _edgeMistake(mode, said, right) {
    const D = P(), cen = D.census(_plants, _sp);
    const pct = cen.rule ? (mode === 'all' ? Math.round((cen.all / cen.rule - 1) * 100) : Math.round((1 - cen.inside / cen.rule) * 100)) : 0;
    if (_mission) _mission.errors++;
    const ids = mode === 'all' ? _q.cls.edge_out.slice() : _q.cls.edge_in.slice();
    _busy = true; _view = 'zoom';
    _readouts();
    _fxAdd('edge', () => {
      _busy = false;
      _readouts();
      const R = D.RESULTS.edge;
      Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ mode, name: SP().plural, said, right, extra: Math.abs(said - right), pct }),
        instead: R.instead, exam: R.exam, onClose: () => _coach('Count this quadrat again - ✅ with the edge rule, or tick the right plants.') });
    }, { ids, mode });
  }

  // Five more quadrats, thrown at random and counted with the edge rule.
  function auto5() {
    if (_busy) return;
    const list = P().randomSquares(_rand, 5, _takenKeys());
    if (!list.length) { _coach('Every square in the plot has been sampled - start a new survey.'); return; }
    _busy = true; _estShow = null; _view = 'field';
    const got = [];
    const next = i => {
      if (i >= list.length) {
        _busy = false;
        _coach(`${got.length} more quadrat${got.length === 1 ? '' : 's'} thrown at random and counted: ${got.join(', ')}. That makes ${_series.quads.length} in your table.`);
        _after('auto5');
        return;
      }
      const [x, y] = list[i];
      _fxAdd('throw', () => {
        _q = _mkQ(x, y, 'random');
        if (!_gloves && _prickly(_q)) { _busy = false; _view = 'zoom'; _readouts(); _refresh(); _hazard('lantana'); return; }
        const n = P().countBy(_q.cls, 'rule');
        _record(n, true);
        got.push(n);
        _readouts(); _refresh();
        next(i + 1);
      }, { x, y, fast: true });
    };
    next(0);
  }

  // ══ The estimate ═════════════════════════════
  function estimate() {
    if (_busy) return;
    const s = _series, qs = s.quads, D = P(), S = SP();
    if (!qs.length) { _coach('Count at least one quadrat first - 🎲 throw it, then ✅ count it.'); return; }
    const e = D.estimate(qs.map(q => q.count)), trueN = D.truePop(_plants, _sp);
    const random = qs.every(q => q.how === 'random');
    const entry = { sp: _sp, n: e.n, total: e.total, mean: e.mean, est: e.rounded, trueN, random, key: s.key, year: s.year,
                    series: s.id, counts: qs.map(q => q.count) };
    _hist.unshift(entry);
    if (_hist.length > 30) _hist.length = 30;
    s.est = entry;
    const off = trueN ? Math.round(Math.abs(entry.est - trueN) / trueN * 100) : 0;
    const offWords = !trueN ? (entry.est ? 'there are none left' : 'none, and you found none')
      : entry.est === trueN ? 'spot on' : `${off}% too ${entry.est > trueN ? 'high' : 'low'}`;
    _logEntry({ title: `Estimate: ${num(entry.est)} ${S.plural}`,
      obs: `${e.n} quadrat${e.n === 1 ? '' : 's'}${random ? ' at random' : ', not all at random'} · mean ${dp2(e.mean)} per quadrat × ${e.factor} ≈ ${num(entry.est)}. The true population (the lab counted every plant) is ${num(trueN)}: ${offWords}.` });
    let card = null;
    const cen = D.census(_plants, _sp);
    if (!random) {
      const chosen = qs.filter(q => q.how !== 'random');
      card = _resCard('biased', { name: S.plural, thick: chosen.every(q => q.how === 'thick'), k: chosen.length, mean: dp2(e.mean),
        est: num(entry.est), trueN: num(trueN), times: trueN ? dp1(entry.est / trueN) : '-' });
      if (_mission && _mission.id !== 'random') _mission.errors++;
    } else if (e.n < D.MIN_Q) {
      card = _resCard('too_few', { n: e.n, est: num(entry.est), min: cen.min, max: cen.max, lo: num(cen.min * e.factor), hi: num(cen.max * e.factor) });
      if (_mission) _mission.errors++;
    } else {
      D.estimateDiscoveries({ sp: _sp, n: e.n, random, events: _events, history: _hist }).forEach(_discover);
    }
    const msg = _missionEstimate(entry);
    _busy = true; _view = 'field';
    _estShow = { est: entry.est, trueN, n: e.n, k: 0, range: !random ? null : e.n < D.MIN_Q ? [cen.min * e.factor, cen.max * e.factor] : null, bad: !!card };
    _readouts(); _refresh();
    _fxAdd('bars', () => {
      _busy = false;
      if (_estShow) _estShow.k = 1;
      _readouts(); _refresh();
      if (card) card();
      else _coach(msg || `Estimate: ${num(entry.est)} ${S.plural}. The true population is ${num(trueN)} - ${offWords}.`
        + (e.n < D.MISSION_Q ? ` More quadrats would make it more reliable.` : ''));
      if (card && msg) _coach(msg);
      _guideEvent('estimate');
    });
  }

  function _resCard(id, ctx) {
    const R = P().RESULTS[id];
    return () => Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened(ctx), instead: R.instead, exam: R.exam,
      onClose: () => { if (!(_mission && _mission.id === 'random' && id === 'biased')) _coach(id === 'biased'
        ? 'Tap 🧹 New survey, then throw the quadrat at random - 🎲.' : 'Throw more quadrats at random, then estimate again.'); } });
  }

  // ══ Census, new survey, what happens to the plot ═══
  function census() {
    if (_busy) return;
    const D = P(), c = D.census(_plants, _sp), trueN = D.truePop(_plants, _sp), S = SP();
    _busy = true; _view = 'field'; _estShow = null;
    _fxAdd('census', () => {
      _busy = false;
      _logEntry({ title: `Census: all 400 squares (${S.plural})`, note: true,
        obs: `With the edge rule: ${num(c.rule)} - exactly the true population (${num(trueN)}). Counting every plant touching a frame: ${num(c.all)}, too many. Only the ones wholly inside: ${num(c.inside)}, too few.` });
      _discover('census');
      const last = _series.est && _series.est.sp === _sp ? ` Your estimate was ${num(_series.est.est)}.` : '';
      _coach(`The ranger team counted all 400 squares: ${num(c.rule)} ${S.plural} with the edge rule - exactly the true number.${last} A census like this takes days; a sample takes an hour.`);
      _after('census');
    });
  }

  function newSurvey() {
    if (_busy) return;
    _newSeries();
    _coach(`A new, empty results table for ${SP().plural}. Throw the quadrat to begin.`);
    _after('new');
  }

  function restore() {
    if (_busy) return;
    _events = []; _plants = P().makeField([]); _fieldDirty = true;
    _newSeries();
    _coach('The plot is back as it was at the start - year 0.');
    _after('restore');
  }

  function _event(id) {
    const D = P(), E = D.EVENTS[id];
    const before = {};
    D.SPECIES_ORDER.forEach(sp => { before[sp] = D.truePop(_plants, sp); });
    _busy = true; _view = 'field'; _estShow = null;
    _fxAdd('event', () => {
      _busy = false;
      _events.push(id);
      _plants = D.makeField(_events);
      _fieldDirty = true;
      const hadQ = _series.quads.length;
      _newSeries();
      const line = D.SPECIES_ORDER.map(sp => `${D.SPECIES[sp].short} ${before[sp]} → ${D.truePop(_plants, sp)}`).join(' · ');
      _logEntry({ title: `${E.icon} ${E.name} · year ${_series.year}`, obs: `${E.say} Ranger’s full count: ${line}.`, note: true });
      _coach(`${E.say}${hadQ ? ' Your old table is closed.' : ''} Survey the plot again.`);
      _after('event:' + id);
    }, { id });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id) {
    const H = P().HAZARDS[id];
    const st = Labs.store('quadrat');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    _busy = true; _view = 'zoom';
    _readouts();
    _fxAdd('prick', () => {
      _busy = false;
      _readouts();
      Labs.hazardCard({ signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Gloves on - try again safely',
        onClose: () => _coach('Tap 🧤 Gloves on, then count the quadrat again.') });
    });
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = P().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _resetBench();
    _sp = M.sp; _series.sp = M.sp; _fieldDirty = true;
    _mission = { id, errors: 0, success: false, stage: 0, biased: null, random: null, results: [], counts: null };
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
    _syncSet();
    _readouts();
  }

  // What an estimate means for the mission. Returns what the assistant says, or null.
  function _missionEstimate(e) {
    const ms = _mission;
    if (!ms) return null;
    const D = P(), M = D.MISSIONS.find(x => x.id === ms.id);
    if (e.sp !== M.sp) return `This mission counts the ${D.SPECIES[M.sp].plural}.`;
    if (ms.id === 'estimate') {
      if (!e.random) return null;
      if (e.n < D.MISSION_Q) return `${e.n} quadrats so far - the mission needs at least ${D.MISSION_Q}. Keep throwing, then estimate again.`;
      if (!ms.success) { ms.success = true; ms.counts = e.counts; Labs.confetti(); }
      return `Estimate from ${e.n} random quadrats: ${num(e.est)}. The true population is ${num(e.trueN)}. Tap “Answer the questions”.`;
    }
    if (ms.id === 'random') {
      const allChosen = _series.quads.every(q => q.how !== 'random');
      if (!e.random && allChosen && e.n >= D.MIN_Q) ms.biased = e;
      else if (!e.random) return allChosen ? `Put at least ${D.MIN_Q} quadrats in chosen spots before you estimate.` : 'Keep the two surveys apart: tap 🧹 New survey, then use ONLY chosen spots or ONLY random throws.';
      else if (e.n >= D.MISSION_Q) ms.random = e;
      else return `${e.n} random quadrats so far - this survey needs at least ${D.MISSION_Q}.`;
      if (ms.biased && ms.random) {
        if (!ms.success) { ms.success = true; Labs.confetti(); }
        return `Chosen spots: ${num(ms.biased.est)} · random: ${num(ms.random.est)} · true: ${num(e.trueN)}. Tap “Answer the questions”.`;
      }
      return ms.biased ? `Chosen-spot estimate: ${num(ms.biased.est)}. Now tap 🧹 New survey and throw at least ${D.MISSION_Q} quadrats at random.`
        : `Random estimate: ${num(ms.random.est)}. Now the other survey: 🧹 New survey, then 🎯 put ${D.MIN_Q} quadrats where the guava is thickest.`;
    }
    // threat: survey → 10 years → survey → weed → survey
    if (!e.random || e.n < D.MIN_Q) return null;
    const want = M.stages[ms.stage];
    if (!want) return null;
    if (e.key !== want.join('>')) return 'Follow the steps in order: survey, ⏩ 10 years of invasion, survey, 🧑‍🌾 weed out the invaders, survey. Tap “Start the mission again” if the plot has changed some other way.';
    ms.results.push(e); ms.stage++;
    if (ms.stage >= M.stages.length) {
      ms.success = true; Labs.confetti();
      return `Survey 3: ${num(e.est)} (true ${num(e.trueN)}). All three surveys done - tap “Answer the questions”.`;
    }
    return ms.stage === 1 ? `Survey 1: ${num(e.est)} (true ${num(e.trueN)}). Now tap ⏩ 10 years of invasion in the set-up, then survey again.`
      : `Survey 2: ${num(e.est)} (true ${num(e.trueN)}). Now tap 🧑‍🌾 Weed out the invaders, then survey a third time.`;
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const D = P(), M = D.MISSIONS.find(x => x.id === ms.id);
    const qs = (M.calc && ms.counts) ? [D.calcQuestion(ms.counts, D.SPECIES[M.sp].plural)].concat(M.quiz) : M.quiz;
    _lastQuiz = qs;
    Labs.quiz(qs, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.errors) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('quadrat');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} in the field - a clean, safe survey earns an extra star.` : 'A fair, careful and safe survey. 🟩');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or go and hunt for discoveries.'); } });
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
    _renderPanel();
    _syncSet();
    _readouts();
    _guideEnter();
    const z = $('lab-quadrat-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _satisfied(tok) {
    const [k, v] = tok.split(':');
    if (v === undefined) return false;
    switch (k) {
      case 'species': return _sp === v;
      case 'gloves': return _gloves === (v === 'on');
      case 'view': return _view === v;
    }
    return false;
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    let s = G.steps[_guide.step];
    while (s && _satisfied(s.on)) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
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
    if (s && s.on === token) { _guide.step++; _guideEnter(); if (!token.startsWith('wait:')) _coachGuide(token); }
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

  function _coachGuide(on) {
    const [k, v] = on.split(':');
    if (k === 'gloves') { _coach(v === 'on' ? 'Gloves on. Good field safety.' : 'Gloves off.'); return; }
    if (k === 'species') { _coach('Species selected. Look for it in the quadrat.'); return; }
    if (k === 'view') { _coach('View changed.'); return; }
    if (on === 'throw') { _coach('Quadrat thrown randomly. Count everything inside it.'); return; }
    if (on === 'thick') { _coach('Boundary checked. Only count organisms fully inside.'); return; }
    if (on === 'count' || k === 'count') {
      if (v === 'all') { _coach('All organisms counted.'); return; }
      if (v === 'inside') { _coach('Inside count done.'); return; }
      _coach('Count recorded. Keep going — more quadrats means more accuracy.'); return;
    }
    if (on === 'record') { _coach('Result recorded in the notebook.'); return; }
    if (on === 'auto5') { _coach('Five quadrats sampled automatically.'); return; }
    if (on === 'estimate') { _coach('Population estimated. The formula: mean per quadrat × total area ÷ quadrat area.'); return; }
    if (on === 'new') { _coach('New quadrat placed.'); return; }
    if (on === 'census') { _coach('Full census done. Compare with the estimate.'); return; }
    if (k === 'event') { _coach('Environmental event noted.'); return; }
    if (on === 'restore') { _coach('Habitat restored.'); return; }
    _coach('Good — on to the next step.');
  }

  // The words for a discovery's "how" tokens.
  function _autoStep(on) {
    const [k, v] = on.split(':');
    const D = P();
    switch (k) {
      case 'species': { const S = D.SPECIES[v]; return { on, say: `Choose what to count: ${S.plural} (${D.STATUS_WORDS[S.status].toLowerCase()}).`, btn: `${S.icon} ${S.name}` }; }
      case 'gloves': return v === 'on' ? { on, say: 'Put your gloves on - some plants here have prickles.', btn: '🧤 Gloves on' } : { on, say: 'Take your gloves off.', btn: 'Gloves off' };
      case 'view': return v === 'zoom' ? { on, say: 'Look inside the quadrat.', btn: '🔍 In the quadrat' } : { on, say: 'Look at the whole plot.', btn: '🗺 The plot' };
      case 'throw': return { on, say: 'Throw the quadrat at random coordinates.', btn: '🎲 Throw at random' };
      case 'thick': return { on, say: 'Put the quadrat where the plants are thickest.', btn: '🎯 Where it is thickest' };
      case 'count': return v === undefined ? { on, say: 'Count the plants inside with the edge rule.', btn: '✅ Count (edge rule)' }
        : v === 'all' ? { on, say: 'Count every plant touching the frame.', btn: 'Count every plant touching' } : { on, say: 'Count only the plants wholly inside.', btn: 'Count only wholly inside' };
      case 'record': return { on, say: 'Record the plants you ticked.', btn: '✔ Record my ticks' };
      case 'auto5': return { on, say: 'Throw and count five quadrats at random.', btn: '⏩ 5 at random' };
      case 'estimate': return { on, say: 'Work out the estimate: mean per quadrat × (400 m² ÷ 1 m²).', btn: '🧮 Work out the estimate' };
      case 'new': return { on, say: 'Start a new, empty results table.', btn: '🧹 New survey' };
      case 'census': return { on, say: 'Count every one of the 400 squares - a census.', btn: '🔢 Count every square' };
      case 'event': { const E = D.EVENTS[v]; return { on, say: `${E.name}: ${E.blurb.toLowerCase()}.`, btn: `${E.icon} ${E.name}` }; }
      case 'restore': return { on, say: 'Put the plot back as it was at the start.', btn: '↺ Restore the plot' };
    }
    return { on, say: on, btn: on };
  }

  function discoveryGuide(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _formulaHTML() {
    return `<section class="lab-hz-sec"><h3>The formula</h3>
      <p class="lab-eq">${esc(P().EST_FORMULA)}</p>
      <p class="lab-quadrat-note">Example: five 1 m² quadrats hold 4, 6, 5, 7 and 3 plants. Mean = 25 ÷ 5 = 5. In a 400 m² plot: 5 × (400 ÷ 1) = 2000.</p></section>`;
  }

  function _discDetail(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('quadrat').disc[id];
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
        ${d.formula ? _formulaHTML() : ''}
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
    const st = Labs.store('quadrat');
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : P().GUIDES.find(g => !st.guides[g.id]);
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
    const el = _root.querySelector('.lab-body ' + _selFor(s.on));
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
    const st = Labs.store('quadrat');
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
        <li><b>Watch the plot</b>, then read your results table in the lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${P().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${P().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or survey freely: set it up below.</p>
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
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover('quadrat', id, { title: d && d.title, total: P().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store('quadrat').disc).length}/${P().DISCOVERIES.length}`;
  }

  function _opt(k, v, label, small) {
    return `<button type="button" class="lab-quadrat-opt" data-set="${k}" data-v="${v}" aria-pressed="false">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _btn(act, label, small, cls) {
    return `<button type="button" class="lab-quadrat-opt${cls ? ' ' + cls : ''}" data-act="${act}">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _shelfHTML() {
    const D = P();
    return `<section class="lab-shelf lab-quadrat-set" aria-label="Set up the survey">
      <h2>Set up the survey</h2>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">1 · What to count</span>
        <div class="lab-quadrat-opts">${D.SPECIES_ORDER.map(sp => { const S = D.SPECIES[sp]; return _opt('species', sp, `${S.icon} ${esc(S.name)}`, D.STATUS_WORDS[S.status] + ' · ' + S.local); }).join('')}</div></div>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">2 · Safety</span>
        <div class="lab-quadrat-opts is-two">${_opt('gloves', 'on', '🧤 Gloves on')}${_opt('gloves', 'off', '✋ Bare hands')}</div></div>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">3 · Place the quadrat</span>
        <div class="lab-quadrat-opts is-two">${_btn('throw', '🎲 Random coordinates', 'two random numbers: x and y')}${_btn('thick', '🎯 Where it is thickest', 'you choose the spot', 'is-warn')}</div>
        <p class="lab-hint">Or tap a square on the plot to choose it yourself.</p></div>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">4 · Count it</span>
        <div class="lab-quadrat-opts is-two">${_btn('count', '✅ Edge rule', 'top/left side: count · bottom/right: not')}${_opt('count', 'all', 'Every plant touching', 'all of them on the frame', '')}${_opt('count', 'inside', 'Only wholly inside', 'none on the frame')}${_btn('record', '✔ Record my ticks', 'tap plants in 🔍 first')}${_btn('untap', '✖ Clear my ticks', 'start the tally again')}</div>
        <p class="lab-hint">In 🔍 the quadrat view, tap each plant to tick it, then record your count.</p></div>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">5 · The survey</span>
        <div class="lab-quadrat-opts is-two">${_btn('new', '🧹 New survey', 'an empty results table')}${_btn('census', '🔢 Count every square', 'a census of all 400')}</div></div>
      <div class="lab-quadrat-row"><span class="lab-quadrat-label">6 · What happens to the plot</span>
        <div class="lab-quadrat-opts">${D.EVENT_ORDER.map(id => { const E = D.EVENTS[id]; return _opt('event', id, `${E.icon} ${esc(E.name)}`, E.blurb); }).join('')}${_btn('restore', '↺ Restore the plot', 'back to year 0')}</div></div>
      <p class="lab-hint">${esc(D.FIELD.place)}: ${D.FIELD.w} m × ${D.FIELD.h} m = ${D.FIELD.area} m². The quadrat is ${D.QUAD.side} m × ${D.QUAD.side} m.</p>
    </section>`;
  }

  function _chartSVG(s) {
    const qs = s.quads;
    if (qs.length < 2) return '';
    const D = P(), f = D.FIELD.area / D.QUAD.area;
    let tot = 0;
    const run = qs.map((q, i) => { tot += q.count; return tot / (i + 1) * f; });
    const tr = s.est ? s.est.trueN : null;
    const top = Math.max(1, ...run, tr || 0) * 1.1;
    const W = 300, H = 110, L = 38, B = 18, T = 8;
    const x = i => L + (W - L - 8) * (qs.length === 1 ? 0 : i / (qs.length - 1));
    const y = v => T + (H - T - B) * (1 - v / top);
    const pts = run.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    return `<svg class="lab-quadrat-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="The running estimate after each quadrat">
      <line class="is-axis" x1="${L}" y1="${T}" x2="${L}" y2="${H - B}"/><line class="is-axis" x1="${L}" y1="${H - B}" x2="${W - 4}" y2="${H - B}"/>
      <text x="${L - 4}" y="${T + 8}" text-anchor="end">${num(top)}</text><text x="${L - 4}" y="${H - B}" text-anchor="end">0</text>
      <text x="${L}" y="${H - 4}">1</text><text x="${W - 8}" y="${H - 4}" text-anchor="end">quadrat ${qs.length}</text>
      ${tr != null ? `<line class="is-true" x1="${L}" y1="${y(tr).toFixed(1)}" x2="${W - 8}" y2="${y(tr).toFixed(1)}"/><text class="is-true-t" x="${W - 8}" y="${(y(tr) - 4).toFixed(1)}" text-anchor="end">true ${num(tr)}</text>` : ''}
      <polyline class="is-run" stroke-width="2" points="${pts}"/>
      ${run.map((v, i) => `<circle class="is-dot" cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2"/>`).join('')}
    </svg>`;
  }

  function _notebookHTML() {
    const D = P(), s = _series, S = D.SPECIES[s.sp];
    let body = '';
    if (s.quads.length) {
      const e = D.estimate(s.quads.map(q => q.count));
      const rows = s.quads.slice(-40).map(q => `<tr><th scope="row">${q.i}</th><td>${q.x}, ${q.y}</td><td>${q.how === 'random' ? 'random' : 'chosen'}</td><td><b>${q.count}</b></td><td>${q.spp.length} <small>${esc(q.spp.map(sp => D.SPECIES[sp].short).join(', '))}</small></td></tr>`).join('');
      body = `<div class="lab-table-wrap"><table class="lab-table">
          <caption>Survey ${s.id}: ${esc(S.plural)} · year ${s.year}</caption>
          <thead><tr><th scope="col">Quadrat</th><th scope="col">x, y / m</th><th scope="col">Placed</th><th scope="col">Number</th><th scope="col">Species present</th></tr></thead>
          <tbody>${rows}</tbody></table></div>
        <p class="lab-quadrat-sum">Total = ${e.total} · Mean = ${e.total} ÷ ${e.n} = <b>${dp2(e.mean)}</b> per quadrat</p>
        ${s.est && s.est.n === e.n
          ? `<p class="lab-eq">Estimate = ${dp2(e.mean)} × (${D.FIELD.area} m² ÷ ${D.QUAD.area} m²) ≈ ${num(s.est.est)}</p>
             <p class="lab-quadrat-true">True population (the lab counted every plant): ${num(s.est.trueN)}</p>`
          : '<p class="lab-hint">Tap 🧮 Estimate to scale the mean up to the whole plot.</p>'}
        ${_chartSVG(s)}`;
    } else {
      body = `<p class="lab-empty">Survey ${s.id}: ${esc(S.plural)} · year ${s.year}. Your counts appear here, one row per quadrat.</p>`;
    }
    const hist = _hist.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Every estimate</caption>
        <thead><tr><th scope="col">Species</th><th scope="col">Year</th><th scope="col">Quadrats</th><th scope="col">Estimate</th><th scope="col">True</th></tr></thead>
        <tbody>${_hist.slice(0, 10).map(h => `<tr><td>${esc(D.SPECIES[h.sp].short)}</td><td>${h.year}</td><td>${h.n}${h.random ? '' : ' <small>chosen</small>'}</td><td><b>${num(h.est)}</b></td><td>${num(h.trueN)}</td></tr>`).join('')}</tbody></table></div>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${body}${hist}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('quadrat');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Survey fairly and safely, answer the exam-style questions, earn up to three stars.</p>
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
    const D = P(), M = D.MISSIONS.find(x => x.id === ms.id);
    const tick = b => b ? 'is-done' : '';
    const rnd = _series.quads.filter(q => q.how === 'random').length;
    let body = '';
    if (ms.id === 'estimate') {
      body = `<ul class="lab-steps">
        <li class="${tick(_gloves)}">🧤 Gloves on</li>
        <li class="${tick(_sp === 'guava')}">🍒 Count the strawberry guava</li>
        <li class="${tick(rnd >= D.MISSION_Q)}">🎲 At least ${D.MISSION_Q} quadrats at random, each counted with the edge rule</li>
        <li class="${tick(ms.success)}">🧮 Work out the estimate</li>
        <li>📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${Math.min(rnd, D.MISSION_Q)} of ${D.MISSION_Q} random quadrats in this survey</p>`;
    } else if (ms.id === 'random') {
      body = `<ul class="lab-steps">
        <li class="${tick(ms.biased)}">🎯 Put ${D.MIN_Q} quadrats where the guava is thickest, count them, 🧮 estimate</li>
        <li class="${tick(ms.random)}">🧹 New survey, then ${D.MISSION_Q} or more at random 🎲, count them, 🧮 estimate</li>
        <li class="${tick(ms.success)}">⚖️ Compare with the true population</li>
        <li>📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${ms.biased ? `Chosen spots: ${num(ms.biased.est)}` : 'Chosen spots: -'} · ${ms.random ? `random: ${num(ms.random.est)}` : 'random: -'}</p>`;
    } else {
      const st = ms.stage;
      body = `<ul class="lab-steps">
        <li class="${tick(st >= 1)}">🎲 Survey 1: ${D.MIN_Q}+ random quadrats of guava, 🧮 estimate</li>
        <li class="${tick(_events.includes('spread') || st >= 2)}">⏩ 10 years of invasion</li>
        <li class="${tick(st >= 2)}">🎲 Survey 2, 🧮 estimate</li>
        <li class="${tick(_events.includes('weed') || st >= 3)}">🧑‍🌾 Weed out the invaders</li>
        <li class="${tick(st >= 3)}">🎲 Survey 3, 🧮 estimate</li>
        <li>📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${ms.results.map((r, i) => `Survey ${i + 1}: ${num(r.est)} (true ${num(r.trueN)})`).join(' · ') || 'No surveys yet'}</p>`;
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
    const st = Labs.store('quadrat');
    const all = P().DISCOVERIES;
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
        <p class="lab-done-icon" aria-hidden="true">🟩</p>
        <h2 id="lab-ov-title">Welcome to the Quadrat Field</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first survey, one tap at a time.</li>
          <li><b>A real Mauritian habitat.</b> A forest clearing in Black River Gorges, with endemic ebony seedlings and invasive strawberry guava, privet and lantana.</li>
          <li><b>Throw, count, estimate.</b> Throw a 1 m quadrat at random, count one species inside it, repeat - and estimate how many grow in the whole plot.</li>
          <li><b>Change the plot.</b> A cyclone, a drought, ten years of invasion, deforestation - or a conservation team. Then survey it again.</li>
          <li><b>Get it wrong safely.</b> Make a mistake and you’ll see what happened and what to do instead.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${P().DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="first" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('quadrat'); st.intro = true; Labs.persist();
        _coach('Pick a guided experiment below, or throw the quadrat yourself.');
      } });
  }

  function _help() {
    const D = P();
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Quadrat Field works</h2>
      <div class="lab-help">
        <section><h3>A quadrat</h3><ul>
          <li>A square frame of known area - here 1 m × 1 m - laid on the ground so the organisms inside it can be counted.</li>
          <li>It suits plants and slow-moving animals: they stay inside long enough to be counted.</li></ul></section>
        <section><h3>Estimating a population</h3><ol class="lab-disc-steps">
          <li>Place the quadrat at RANDOM - two random numbers give its x and y coordinates.</li>
          <li>Count the individuals of one species inside it.</li>
          <li>Repeat - at least ${D.MIN_Q} times, ${D.MISSION_Q} or more is better.</li>
          <li>Mean = total counted ÷ number of quadrats.</li></ol>
          <p class="lab-eq">${esc(D.EST_FORMULA)}</p></section>
        <section><h3>Plants on the frame</h3><ul>
          <li>Use ONE rule every time. Here: count a plant that crosses the TOP or LEFT side; leave out one that crosses the BOTTOM or RIGHT side.</li>
          <li>The edge rule is beyond the NCE syllabus, but it keeps your counts fair.</li></ul></section>
        <section><h3>The species</h3><ul>
          ${D.SPECIES_ORDER.map(sp => { const S = D.SPECIES[sp]; return `<li><b>${esc(S.name)}</b> (${esc(S.local)}) - ${esc(D.STATUS_WORDS[S.status].toLowerCase())}.</li>`; }).join('')}
          <li><b>Endemic</b>: found naturally in one place and nowhere else on Earth. <b>Invasive alien</b>: brought in by people, spreading at the expense of native species.</li></ul></section>
        <section><h3>Threats to biodiversity</h3><ul>
          <li>Natural: cyclones and droughts.</li>
          <li>Human: deforestation, pollution, habitat degradation and invasive alien species.</li>
          <li>The counts in this plot are a model; the species and the threats are real.</li></ul></section>
        <section><h3>Fieldwork safety</h3><ul>
          <li>Wear gloves and long sleeves - lantana has prickly stems.</li>
          <li>Never eat any fruit, berry or leaf you find. Wash your hands afterwards.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the field</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_series) return;
    const D = P(), S = SP();
    const chips = $('lab-quadrat-chips');
    if (chips) {
      let h = `<span class="lab-chip">${S.icon} ${esc(S.name)}</span>`;
      if (_view === 'zoom' && _q) {
        h += `<span class="lab-chip">📍 x ${_q.x} m, y ${_q.y} m</span>`;
        h += _q.counted ? `<span class="lab-chip lab-quadrat-count">Counted: <b>${_q.count}</b></span>`
                        : `<span class="lab-chip lab-quadrat-count">Ticked: <b>${_q.marks.size}</b></span>`;
      } else {
        const n = _series.quads.length;
        h += `<span class="lab-chip lab-quadrat-count">🟩 <b>${n}</b> quadrat${n === 1 ? '' : 's'}</span>`;
        h += `<span class="lab-chip">📅 Year ${_series.year}</span>`;
        h += `<span class="lab-chip${_gloves ? '' : ' is-warm'}">🧤 ${_gloves ? 'Gloves on' : 'No gloves'}</span>`;
      }
      chips.innerHTML = h;
    }
    const c = $('lab-contents');
    if (c) {
      c.textContent = _view === 'zoom' && _q
        ? 'On the frame: top/left side ✓ count · bottom/right ✗ leave out'
        : `Plot ${D.FIELD.w} m × ${D.FIELD.h} m = ${D.FIELD.area} m² · quadrat ${D.QUAD.side} m × ${D.QUAD.side} m`;
    }
    _syncSet();
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    const d = data || {};
    _fx.push({ type, t: 0, dur: type === 'throw' && d.fast ? FX_DUR.fast : (FX_DUR[type] || 0.5), done, data: d });
  }

  // ══ Drawing ══════════════════════════════════
  function _fieldGeom() {
    const D = P();
    const side = Math.max(120, Math.min(_W - 34, _H - TOP - BOT));
    const x0 = Math.max(24, (_W - side) / 2 + 6), y0 = TOP;
    return { side, x0, y0, k: side / D.FIELD.w };
  }
  function _zoomGeom() {
    const span = 1 + 2 * ZM;
    const avail = Math.min(_W - 20, _H - TOP - BOT);
    const k = avail / span;
    const ox = (_W - avail) / 2, oy = TOP + ((_H - TOP - BOT) - avail) / 2;
    const qx = _q ? _q.x : 0, qy = _q ? _q.y : 0;
    return { k, ox, oy, avail, sx: x => ox + (x - (qx - ZM)) * k, sy: y => oy + (y - (qy - ZM)) * k };
  }

  function _renderField() {
    const D = P(), g = _fieldGeom();
    if (!_fieldCv) _fieldCv = document.createElement('canvas');
    const px = Math.ceil(g.side * _dpr);
    _fieldCv.width = px; _fieldCv.height = px;
    const c = _fieldCv.getContext('2d');
    c.setTransform(_dpr, 0, 0, _dpr, 0, 0);
    const s = g.side, k = g.k;
    c.fillStyle = '#8DBB6A'; c.fillRect(0, 0, s, s);
    const r = D.rng(99);
    for (let i = 0; i < 70; i++) {
      c.fillStyle = r() < 0.5 ? 'rgba(120,90,50,0.13)' : 'rgba(55,105,40,0.16)';
      c.beginPath(); c.ellipse(r() * s, r() * s, 6 + r() * 22, 4 + r() * 14, r() * 3, 0, Math.PI * 2); c.fill();
    }
    if (_events.includes('clear')) {
      c.fillStyle = '#B38B5B'; c.fillRect(14 * k, 0, 6 * k, s);
      c.strokeStyle = 'rgba(90,60,30,0.35)'; c.lineWidth = 1;
      for (let x = 14.5; x < 20; x += 0.75) { c.beginPath(); c.moveTo(x * k, 0); c.lineTo(x * k, s); c.stroke(); }
    }
    for (let i = 0; i <= D.FIELD.w; i++) {
      c.strokeStyle = i % 5 === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)';
      c.lineWidth = i % 5 === 0 ? 1 : 0.5;
      c.beginPath(); c.moveTo(i * k, 0); c.lineTo(i * k, s); c.moveTo(0, i * k); c.lineTo(s, i * k); c.stroke();
    }
    const others = _plants.filter(p => p.sp !== _sp), mine = _plants.filter(p => p.sp === _sp);
    c.globalAlpha = 0.5;
    others.forEach(p => { c.fillStyle = D.SPECIES[p.sp].leaf; c.beginPath(); c.arc(p.x * k, p.y * k, Math.max(1, 0.1 * k), 0, Math.PI * 2); c.fill(); });
    c.globalAlpha = 1;
    const S = SP(), rr = Math.max(1.6, 0.13 * k);
    c.fillStyle = S.color; c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 0.5;
    mine.forEach(p => { c.beginPath(); c.arc(p.x * k, p.y * k, rr, 0, Math.PI * 2); c.fill(); c.stroke(); });
    if (_events.includes('weed')) {
      c.setLineDash([4, 3]); c.strokeStyle = '#5B3A1E'; c.lineWidth = 2; c.strokeRect(1, 1, s - 2, s - 2); c.setLineDash([]);
    }
    _fieldDirty = false;
  }

  function _draw(dt) {
    if (!_cx || !_plants) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((Math.random() - 0.5) * 8 * _shake, (Math.random() - 0.5) * 8 * _shake);
      _shake = Math.max(0, _shake - dt * 1.4);
    }
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    if (_view === 'zoom' && _q) _drawZoom(); else _drawField();
    _drawFx(dt);
    c.restore();
  }

  function _drawField() {
    const c = _cx, D = P(), g = _fieldGeom();
    if (_fieldDirty || !_fieldCv) _renderField();
    c.drawImage(_fieldCv, g.x0, g.y0, g.side, g.side);
    c.strokeStyle = 'rgba(40,60,30,0.8)'; c.lineWidth = 1.5; c.strokeRect(g.x0, g.y0, g.side, g.side);
    c.fillStyle = _colors.muted; c.font = '600 9px system-ui, sans-serif';
    c.textAlign = 'center';
    for (let i = 0; i <= D.FIELD.w; i += 5) c.fillText(String(i), g.x0 + i * g.k, g.y0 - 3);
    c.textAlign = 'right';
    for (let i = 5; i <= D.FIELD.h; i += 5) c.fillText(String(i), g.x0 - 3, g.y0 + i * g.k + 3);
    c.textAlign = 'left'; c.fillText('m', g.x0 + g.side + 3, g.y0 - 3);
    _series.quads.forEach(q => {
      c.strokeStyle = q.how === 'random' ? 'rgba(255,255,255,0.95)' : 'rgba(255,140,40,0.95)'; c.lineWidth = 1.4;
      c.strokeRect(g.x0 + q.x * g.k, g.y0 + q.y * g.k, g.k, g.k);
    });
    if (_q && !_fx.some(f => f.type === 'throw')) {
      c.strokeStyle = '#FFD200'; c.lineWidth = 2.4;
      c.strokeRect(g.x0 + _q.x * g.k - 1, g.y0 + _q.y * g.k - 1, g.k + 2, g.k + 2);
    }
    if (_estShow) _drawEst(g);
  }

  // The consequence of an estimate, on the picture: your number against the true one.
  function _drawEst(g) {
    const c = _cx, e = _estShow, k = Math.max(0, Math.min(1, e.k));
    const hi = Math.max(e.est, e.trueN, e.range ? e.range[1] : 0, 1);
    const pw = Math.min(g.side - 12, 260), px = g.x0 + (g.side - pw) / 2, ph = e.range ? 70 : 54, py = g.y0 + g.side - ph - 6;
    c.fillStyle = 'rgba(255,255,255,0.93)'; c.strokeStyle = 'rgba(0,0,0,0.2)'; c.lineWidth = 1;
    c.beginPath(); c.rect(px, py, pw, ph); c.fill(); c.stroke();
    const bx = px + 78, bw = pw - 86;
    const bar = (y, v, col, label) => {
      c.fillStyle = '#14211D'; c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'left';
      c.fillText(label, px + 6, y + 9);
      c.fillStyle = col; c.fillRect(bx, y, Math.max(1, bw * (v / hi) * k), 12);
      c.fillStyle = '#14211D'; c.textAlign = 'right';
      const t = num(Math.round(v * k));
      c.fillText(t, Math.min(px + pw - 4, bx + Math.max(1, bw * (v / hi) * k) + c.measureText(t).width + 4), y + 10);
    };
    bar(py + 8, e.est, e.bad ? '#C0262D' : '#1D6A96', 'Your estimate');
    bar(py + 28, e.trueN, '#23734A', 'True number');
    if (e.range) {
      const y = py + 52;
      c.fillStyle = '#14211D'; c.textAlign = 'left'; c.fillText('1 quadrat:', px + 6, y + 8);
      const a = bx + bw * (e.range[0] / hi) * k, b = bx + bw * (e.range[1] / hi) * k;
      c.strokeStyle = '#A85B0B'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(a, y + 4); c.lineTo(b, y + 4); c.moveTo(a, y); c.lineTo(a, y + 8); c.moveTo(b, y); c.lineTo(b, y + 8); c.stroke();
    }
  }

  function _plantGlyph(c, sp, x, y, r, faded) {
    const S = P().SPECIES[sp];
    c.globalAlpha = faded ? 0.32 : 1;
    if (sp === 'ebony') {
      c.fillStyle = S.leaf;
      c.beginPath(); c.ellipse(x - r * 0.45, y, r * 0.6, r * 0.32, -0.5, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.ellipse(x + r * 0.45, y, r * 0.6, r * 0.32, 0.5, 0, Math.PI * 2); c.fill();
      c.fillStyle = S.color; c.beginPath(); c.arc(x, y, r * 0.28, 0, Math.PI * 2); c.fill();
    } else {
      c.fillStyle = S.leaf; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      c.fillStyle = S.color;
      const dots = sp === 'lantana' ? 5 : sp === 'guava' ? 3 : 0;
      for (let i = 0; i < dots; i++) { const a = i * 2.4; c.beginPath(); c.arc(x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45, r * 0.22, 0, Math.PI * 2); c.fill(); }
      if (sp === 'privet') { c.strokeStyle = S.color; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y, r * 0.55, 0, Math.PI * 2); c.stroke(); }
    }
    if (!faded) { c.strokeStyle = 'rgba(0,0,0,0.5)'; c.lineWidth = 1; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke(); }
    c.globalAlpha = 1;
  }

  function _drawZoom() {
    const c = _cx, D = P(), z = _zoomGeom(), q = _q;
    c.save();
    c.beginPath(); c.rect(z.ox, z.oy, z.avail, z.avail); c.clip();
    c.fillStyle = '#8DBB6A'; c.fillRect(z.ox, z.oy, z.avail, z.avail);
    const rr = D.rng(1000 + q.x * 31 + q.y * 977);
    for (let i = 0; i < 26; i++) {
      c.fillStyle = rr() < 0.5 ? 'rgba(120,90,50,0.14)' : 'rgba(55,105,40,0.18)';
      c.beginPath(); c.ellipse(z.ox + rr() * z.avail, z.oy + rr() * z.avail, 10 + rr() * 30, 6 + rr() * 16, rr() * 3, 0, Math.PI * 2); c.fill();
    }
    if (_events.includes('clear') && q.x + 1 + ZM > 14) { c.fillStyle = '#B38B5B'; c.fillRect(z.sx(14), z.oy, z.avail, z.avail); }
    const pr = D.R * z.k;
    const near = _plants.filter(p => p.x > q.x - ZM - 0.2 && p.x < q.x + 1 + ZM + 0.2 && p.y > q.y - ZM - 0.2 && p.y < q.y + 1 + ZM + 0.2);
    near.filter(p => p.sp !== _sp).forEach(p => _plantGlyph(c, p.sp, z.sx(p.x), z.sy(p.y), pr * 1.1, true));
    near.filter(p => p.sp === _sp).forEach(p => _plantGlyph(c, p.sp, z.sx(p.x), z.sy(p.y), pr, false));
    c.restore();
    // the frame: its string grid, the two sides that count (green) and the two that do not (orange)
    const fx = z.sx(q.x), fy = z.sy(q.y), fs = z.k;
    c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      c.beginPath(); c.moveTo(fx + fs * i / 5, fy); c.lineTo(fx + fs * i / 5, fy + fs); c.moveTo(fx, fy + fs * i / 5); c.lineTo(fx + fs, fy + fs * i / 5); c.stroke();
    }
    c.lineWidth = 5; c.lineCap = 'round';
    c.strokeStyle = '#2E9E4F'; c.beginPath(); c.moveTo(fx, fy + fs); c.lineTo(fx, fy); c.lineTo(fx + fs, fy); c.stroke();
    c.strokeStyle = '#E0671F'; c.beginPath(); c.moveTo(fx + fs, fy); c.lineTo(fx + fs, fy + fs); c.lineTo(fx, fy + fs); c.stroke();
    c.lineCap = 'butt';
    c.font = '700 10px system-ui, sans-serif';
    c.fillStyle = '#1B6B35'; c.textAlign = 'left'; c.fillText('✓ top & left: count', fx, fy - 7);
    c.fillStyle = '#A3470F'; c.textAlign = 'right'; c.fillText('bottom & right: leave out ✗', fx + fs, fy + fs + 15);
    // ticks, or the lab's own numbered count
    const byId = new Map(near.map(p => [p.id, p]));
    const cls = q.cls;
    if (q.counted) {
      [...cls.in, ...cls.edge_in].forEach((id, i) => {
        const p = byId.get(id); if (!p) return;
        const x = z.sx(p.x), y = z.sy(p.y);
        c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(x + pr * 0.8, y - pr * 0.8, 7.5, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#14211D'; c.font = '800 9px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText(String(i + 1), x + pr * 0.8, y - pr * 0.8 + 3);
      });
      cls.edge_out.forEach(id => {
        const p = byId.get(id); if (!p) return;
        c.strokeStyle = '#C0262D'; c.lineWidth = 2.2; const x = z.sx(p.x), y = z.sy(p.y), a = pr * 0.7;
        c.beginPath(); c.moveTo(x - a, y - a); c.lineTo(x + a, y + a); c.moveTo(x + a, y - a); c.lineTo(x - a, y + a); c.stroke();
      });
    } else {
      q.marks.forEach(id => {
        const p = byId.get(id); if (!p) return;
        const x = z.sx(p.x), y = z.sy(p.y);
        c.strokeStyle = '#FFFFFF'; c.lineWidth = 2.5; c.beginPath(); c.arc(x, y, pr + 3, 0, Math.PI * 2); c.stroke();
        c.fillStyle = '#FFFFFF'; c.font = '800 11px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('✓', x, y + 4);
      });
    }
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'throw': {
          if (_view !== 'field') break;
          const g = _fieldGeom();
          const tx = g.x0 + (f.data.x + 0.5) * g.k, ty = g.y0 + (f.data.y + 0.5) * g.k;
          const sx = _W / 2, sy = _H + 20;
          const e = 1 - (1 - k) * (1 - k);
          const x = sx + (tx - sx) * e, y = sy + (ty - sy) * e - Math.sin(Math.PI * k) * _H * 0.25;
          const size = 40 + (g.k - 40) * e;
          c.save(); c.translate(x, y); c.rotate((1 - e) * Math.PI * 3);
          c.strokeStyle = '#FFD200'; c.lineWidth = 3; c.strokeRect(-size / 2, -size / 2, size, size);
          c.restore();
          break;
        }
        case 'bars':
          if (_estShow) _estShow.k = 1 - (1 - k) * (1 - k);
          break;
        case 'edge': {
          if (!_q || _view !== 'zoom') break;
          const z = _zoomGeom(), pr = P().R * z.k, a = 0.5 + 0.5 * Math.sin(k * Math.PI * 6);
          const set = new Set(f.data.ids);
          _plants.forEach(p => {
            if (!set.has(p.id)) return;
            c.strokeStyle = f.data.mode === 'all' ? `rgba(192,38,45,${a})` : `rgba(228,161,27,${a})`;
            c.lineWidth = 4; c.beginPath(); c.arc(z.sx(p.x), z.sy(p.y), pr + 6, 0, Math.PI * 2); c.stroke();
          });
          break;
        }
        case 'census': {
          if (_view !== 'field') break;
          const g = _fieldGeom(), rows = Math.floor(k * P().FIELD.h);
          c.fillStyle = 'rgba(255,255,255,0.28)'; c.fillRect(g.x0, g.y0, g.side, rows * g.k);
          c.strokeStyle = '#FFD200'; c.lineWidth = 2; c.strokeRect(g.x0, g.y0 + rows * g.k, g.side, g.k);
          c.fillStyle = '#14211D'; c.font = '800 13px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText(`Counting square ${Math.min(400, Math.round(k * 400))} of 400…`, _W / 2, g.y0 + g.side / 2);
          break;
        }
        case 'event': {
          const id = f.data.id, a = Math.sin(Math.PI * k);
          const tint = { cyclone: '60,70,90', drought: '240,170,60', spread: '40,110,50', clear: '150,110,60', weed: '90,160,90' }[id] || '0,0,0';
          c.fillStyle = `rgba(${tint},${0.45 * a})`; c.fillRect(0, 0, _W, _H);
          if (id === 'cyclone') {
            _shake = Math.max(_shake, 0.5 * a);
            c.strokeStyle = `rgba(255,255,255,${0.8 * a})`; c.lineWidth = 3;
            for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(_W / 2, _H / 2, 30 + j * 26, k * 12 + j, k * 12 + j + 4); c.stroke(); }
          }
          c.font = '46px system-ui, sans-serif'; c.textAlign = 'center';
          c.globalAlpha = a; c.fillText(P().EVENTS[id].icon, _W / 2, _H / 2 + 16); c.globalAlpha = 1;
          break;
        }
        case 'prick': {
          _shake = Math.max(_shake, 0.6 * (1 - k));
          c.fillStyle = `rgba(192,38,45,${0.35 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          c.font = '44px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText('✋', _W / 2, _H / 2 + 14);
          break;
        }
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
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) {
    _instant = !!(o && o.instant);
    if (o && o.seed != null) { _seed = o.seed >>> 0; _rand = P().rng(_seed); }
  }
  // Runs the effects forward without waiting for the screen.
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n && _fx.length; i++) { if (_cx) _draw(0.05); else _drawFx(0.05); }
    _readouts();
  }
  function _debug() {
    const s = _series;
    return { busy: _busy, view: _view, sp: _sp, gloves: _gloves, events: _events.slice(), panel: _panel, fx: _fx.length,
             q: _q && { x: _q.x, y: _q.y, how: _q.how, counted: _q.counted, count: _q.count, marks: [..._q.marks],
                        cls: { in: _q.cls.in.slice(), edge_in: _q.cls.edge_in.slice(), edge_out: _q.cls.edge_out.slice() } },
             series: s && { id: s.id, sp: s.sp, key: s.key, year: s.year, n: s.quads.length, counts: s.quads.map(q => q.count), hows: s.quads.map(q => q.how), est: s.est && s.est.est },
             hist: _hist.slice(0, 5).map(h => ({ sp: h.sp, n: h.n, est: h.est, trueN: h.trueN, random: h.random, key: h.key })),
             est: _estShow && { est: _estShow.est, trueN: _estShow.trueN, k: _estShow.k },
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success, stage: _mission.stage,
                                   biased: _mission.biased && _mission.biased.est, random: _mission.random && _mission.random.est },
             quiz: _lastQuiz && _lastQuiz.map(q => ({ q: q.q, a: q.options[0] })),
             geom: _W ? (() => { const g = _fieldGeom(); return { x0: g.x0, y0: g.y0, k: g.k, side: g.side }; })() : null,
             zoomPts: _view === 'zoom' && _q && _W ? (() => {
               const z = _zoomGeom(), o = {};
               [..._q.cls.in, ..._q.cls.edge_in, ..._q.cls.edge_out].forEach(id => { const p = _plants.find(pp => pp.id === id); if (p) o[id] = [z.sx(p.x), z.sy(p.y)]; });
               return o; })() : null,
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, set: _set, act: _do, place, tapPlant, count, estimate,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabQuadrat = LabQuadrat;
