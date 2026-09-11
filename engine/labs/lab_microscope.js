'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Microscope (Biology, NCE Grade 9)
//
//  Two benches in one lab:
//   - SCOPE: a light microscope drawn from the side, with its eyepiece view
//     beside it. Put on a stained blood smear, clip it, light it, choose the
//     objective, lower the lens watching from the side, focus up with the
//     coarse knob and finish with the fine knob; move the slide to bring a cell
//     under the eyepiece pointer and name it; draw it.
//   - MEASURE: a printed drawing of a blood cell and a ruler drawn to the same
//     scale. Measure it, make the units match, divide - magnification, or the
//     actual size from a printed magnification (the paper's ×15 000 question).
//  Guided experiments, three Missions and a collection of Discoveries.
//
//  ⚠ Every outcome comes from lab_microscope_data.js (LabMicroscopeData). This
//    file only moves things over time and draws them. If a result looks wrong
//    on screen, fix the DATA, not the animation.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the simulation still runs, but nothing
//    moves and effects apply at once.
//  ⚠ Every control is a tap on a real <button>; there is nothing to drag. A
//    cell is named by bringing it under the eyepiece POINTER, not by tapping
//    the picture - which is how it is done at a real microscope, too.
//  ⚠ TWO LEVELS: Labs.grade() is 7 or 9 and only that grade's guides, missions
//    and discoveries show (LAB_SPEC §9). Grade 7 makes its own slides (onion
//    skin, cheek cells, a pondweed leaf: specimen, stain, cover slip) and names
//    the PARTS of a cell under the pointer; the measuring desk, the blood
//    slides and the drawings are Grade 9 only. Everything Grade 9 does is
//    unchanged.
// ══════════════════════════════════════════════
const LabMicroscope = (() => {
  const M = () => LabMicroscopeData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { crack: 1.3, glare: 1.0, drop: 1.1, blurout: 0.7, stamp: 0.6, slip: 1.1, germs: 1.0, splash: 1.0 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _rig = 'scope', _s = null, _w = null, _labels = false;
  let _zv = 0, _pan = { x: 0, y: 0 }, _rulerT = 1, _cracked = false, _hl = null;
  let _ids = [], _drawings = [], _calcs = [], _log = [];
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _fx = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _said = {};
  let _vc = null, _vcSmall = null, _vcKey = '';
  let _lastGrade = null;
  const _cellsMemo = new Map();

  // ── The grade the microscope is being used at ──
  // Labs.grade() is 7 or 9; a grade this lab has no level for is 9.
  const _g = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 9;
    return M().GRADES.includes(g) ? g : 9;
  };
  const _is7 = () => _g() === 7;
  const _mine = list => M().forGrade(list, _g());
  const _discs = () => _mine(M().DISCOVERIES);
  const _guides = () => _mine(M().GUIDES);
  const _missions = () => _mine(M().MISSIONS);
  // A card with its own Grade 7 wording: crack → g7_crack.
  const _cid = base => (_is7() && (M().HAZARDS['g7_' + base] || M().RESULTS['g7_' + base]) ? 'g7_' + base : base);
  const _slideOk = k => !!M().SLIDES[k] && (M().SLIDES[k].grades || [9]).includes(_g());
  const _g7slide = () => !!(_s && _s.slide && M().SLIDES[_s.slide].g7);
  // The first-visit welcome is shown once per grade.
  const _introKey = () => (_is7() ? 'intro7' : 'intro');

  function _newScope() {
    return { slide: null, clipped: false, light: 'off', diaph: 'mid', eye: 10, obj: 10, z: M().Z_START, pos: { x: 0, y: 0 },
             stain: null, cover: null, lowSeen: false };
  }
  function _newSheet(fig) { return { fig: fig || 'rbc', ruler: null, converted: false, op: null, done: null }; }
  function _resetBench() {
    _s = _newScope(); _w = _newSheet('rbc'); _labels = false;
    _zv = _s.z; _pan = { x: 0, y: 0 }; _rulerT = 1; _cracked = false; _hl = null;
    _fx = []; _said = {}; _busy = false; _shake = 0;
  }
  const _view = () => M().view(_s);
  const _still = () => _instant || Labs.calm();

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-microscope">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${_is7() ? 'Science · Grade 7' : 'Biology · Grade 9'}</span><h1>Microscope</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          ${_is7() ? '' : `<div class="lab-seg lab-microscope-rigs" role="group" aria-label="Choose the bench">
            <button type="button" data-set="rig" data-v="scope">🔬 Microscope</button>
            <button type="button" data-set="rig" data-v="measure">📏 Measure a drawing</button>
          </div>`}
          <div class="lab-canvas-wrap" id="lab-microscope-stage">
            <canvas id="lab-canvas" role="img" aria-label="The microscope bench"></canvas>
            <div class="lab-microscope-chips" id="lab-microscope-chips"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-microscope-tools"></div>
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
    // A different grade is a different bench: nothing carries over.
    const g = _g();
    if (!_s || _lastGrade !== g) {
      _resetBench(); _guide = null; _mission = null; _rig = 'scope'; _panel = 'sandbox';
      _ids = []; _drawings = []; _calcs = []; _log = []; _tipIdx = -1;
    }
    _lastGrade = g;
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    const st = Labs.store('microscope');
    if (!st[_introKey()]) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or set up the microscope yourself.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _stop();
    _root = null; _cv = null; _cx = null; _vc = null; _vcSmall = null; _vcKey = '';
  }

  function _readColors() {
    const cs = getComputedStyle(_root.querySelector('.lab') || _root);
    const v = (n, d) => (cs.getPropertyValue(n) || '').trim() || d;
    _colors = { top: v('--lab-cv-top', '#E9F1F2'), bot: v('--lab-cv-bot', '#D5E2E1'), bench: v('--lab-bench', '#B9CAC6'),
                glass: v('--lab-glass', 'rgba(34,58,68,.62)'), ink: v('--lab-ink', '#14211D'), muted: v('--lab-muted', '#56665F') };
  }

  function _resize() {
    if (!_cv) return;
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = _rig === 'measure'
      ? Math.round(Math.min(420, Math.max(300, w * 0.95)))
      : Math.round(Math.min(400, Math.max(270, w * 0.85)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _vcKey = '';
    _readColors();
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
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
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
    const z = $('lab-microscope-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _do(tok) {
    if (tok === 'focus:near' || tok === 'focus:sharp') { _focusStep(tok.slice(6)); return; }
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
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. The bench is all yours.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) startMission(_mission.id); break;
      case 'guide-stop': _stopGuide(false); break;
      case 'clips': clips(); break;
      case 'lower': lower(); break;
      case 'draw': draw(); break;
      case 'labels': _toggleLabels(); break;
      case 'prick': _hazard('blood'); break;
      case 'sun': _hazard(_cid('sun')); break;
      case 'swab': _hazard('g7_swab'); break;
      case 'splash': _hazard('g7_stain'); break;
      case 'press': press(); break;
      case 'convert': convert(); break;
      case 'divide': operate('divide'); break;
      case 'multiply': operate('multiply'); break;
      case 'answer': answer(); break;
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
    const f = _is7() ? M().FACTS_G7 : M().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  function _toRig(r) {
    if (_rig === r) return;
    _rig = r;
    _labels = false;
    _resize();
    _renderTools();
    if (_panel !== 'found') _renderPanel();
  }

  // ══ Settings ═════════════════════════════════
  const SCOPE_KEYS = ['slide', 'light', 'diaphragm', 'eye', 'obj', 'coarse', 'fine', 'move', 'id', 'stain', 'cover', 'part', 'kind'];
  // Grade 7: what making each slide looks like.
  const MAKE7 = {
    onion: 'You peeled a thin layer of onion skin (the epidermis) with forceps and laid it flat in a drop of water on a clean slide, on the stage. Next: one drop of stain, then a cover slip.',
    cheek: 'You gently scraped the inside of your own cheek with a clean cotton bud and smeared it in a drop of water on a slide, on the stage. The used bud went straight into the disinfectant. Next: one drop of stain, then a cover slip.',
    leaf: 'You laid one small pondweed leaf flat in a drop of water on a slide, on the stage. It is so thin that light passes through it. Next: a cover slip - no stain needed.',
  };
  const SHEET_KEYS = ['fig', 'ruler'];
  function _set(k, v) {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return; }
    const D = M();
    if (SCOPE_KEYS.includes(k)) _toRig('scope');
    if (SHEET_KEYS.includes(k)) _toRig('measure');
    if (k !== 'rig' && SCOPE_KEYS.includes(k) && _labels) { _labels = false; _renderTools(); }
    switch (k) {
      case 'rig':
        if (v !== 'scope' && v !== 'measure') return;
        _toRig(v);
        _coach(v === 'scope'
          ? 'The microscope: slide on, clips, light, low power - then lower the lens watching from the side and focus upwards.'
          : 'The measuring desk: a printed drawing and a ruler. Measure, make the units match, then divide.');
        _after('rig:' + v);
        return;
      case 'slide': {
        if (!_slideOk(v)) return;
        const made = !!D.SLIDES[v].g7;
        if (_s.slide === v && !made) { _coach('That slide is already on the stage.'); return; }
        const prev = _view();
        _s.slide = v; _s.clipped = false; _s.z = D.Z_START; _s.pos = { x: 0, y: 0 };
        _s.stain = null; _s.cover = null; _s.lowSeen = false;
        _cracked = false; _snap();
        _mark('stage');
        _coach(made ? MAKE7[v]
          : `${D.SLIDES[v].name} on the stage, over the hole in the middle. The lens was raised first, so nothing could scrape the slide.${v === 'unstained' ? ' No stain on this one.' : ''}`);
        _scopeAfter('slide:' + v, prev);
        return;
      }
      case 'stain': {
        if (!D.STAINS[v]) return;
        if (!_g7slide()) { _coach('Make a slide first - onion skin, cheek cells or a leaf.'); return; }
        if (_s.cover) { _coach('The cover slip is already on. Add the stain BEFORE the cover slip - choose the specimen again to make a fresh slide.'); return; }
        if (_s.stain) { _coach('It already has a drop of stain. One drop is enough.'); return; }
        const prev = _view();
        _s.stain = v;
        _mark('stage');
        _coach(_s.slide === 'leaf'
          ? `${D.STAINS[v].name} added. A leaf does not need it - its chloroplasts are green already - but it does no harm.`
          : `One drop of ${D.STAINS[v].name.toLowerCase()}. It colours the parts of the cells so you can see them. Now the cover slip.`);
        _scopeAfter('stain:' + v, prev);
        return;
      }
      case 'cover': {
        if (!D.COVERS[v]) return;
        if (!_g7slide()) { _coach('Make a slide first - onion skin, cheek cells or a leaf.'); return; }
        if (_s.cover) { _coach('There is already a cover slip on this slide.'); return; }
        const prev = _view();
        _s.cover = v;
        _mark('stage');
        if (v === 'drop') {
          if (_mission) _mission.errors++;
          _coach('The cover slip fell flat onto the drop.');
          _scopeAfter('cover:drop', prev);
          _busy = true;
          _fxAdd('slip', () => {
            _busy = false;
            const R = D.RESULTS.g7_bubbles;
            Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({}), instead: R.instead, exam: R.exam,
              onClose: () => _coach('Choose the specimen again to make a fresh slide - and lower the cover slip at an angle.') });
          });
          return;
        }
        _coach('One edge first, then slowly down at an angle: the water spread out and pushed the air away. No bubbles.');
        _scopeAfter('cover:' + v, prev);
        return;
      }
      case 'part': part(v); return;
      case 'kind': kind(v); return;
      case 'light': {
        if (!D.LIGHTS[v]) return;
        const prev = _view();
        _s.light = v;
        _mark('light');
        _coach(v === 'lamp' ? 'Lamp on. Its light shines up through the diaphragm, the slide and the lenses.'
          : v === 'mirror' ? 'The mirror is tilted to catch light from a bright window and reflect it up through the slide.'
          : 'Light off. Nothing to see without light.');
        _scopeAfter('light:' + v, prev);
        return;
      }
      case 'diaphragm': {
        if (!D.DIAPHRAGM[v]) return;
        const prev = _view();
        _s.diaph = v;
        const cur = _view();
        _mark('diaphragm');
        _coach(`Diaphragm ${D.DIAPHRAGM[v].name.toLowerCase()}.${cur.dark && _s.light !== 'off' ? ' It is too dark to see - let more light through.' : v === 'narrow' ? ' Less light, but more contrast.' : ' More light passes through the slide.'}`);
        _scopeAfter('diaphragm:' + v, prev);
        return;
      }
      case 'eye': {
        const e = +v;
        if (!D.EYEPIECES.includes(e)) return;
        const prev = _view();
        _s.eye = e;
        _mark('eyepiece');
        _coach(`The ×${e} eyepiece. Total magnification = ${e} × ${_s.obj} = ×${D.total(e, _s.obj)}.`);
        _scopeAfter('eye:' + v, prev);
        return;
      }
      case 'obj': {
        const o = +v;
        if (!D.OBJECTIVES.includes(o)) return;
        if (_s.obj === o) { _coach(`The ×${o} objective is already in place.`); return; }
        if (_s.slide && D.clearance(_s.z, o) <= 0) { _crash('nosepiece', o); return; }
        const prev = _view();
        _s.obj = o;
        _mark('nosepiece');
        const cur = _view();
        let say = `${D.OBJ[o].name}: the ×${o} objective. Total magnification = ${_s.eye} × ${o} = ×${cur.total}.`;
        if (o === 40 && !(prev.sharp && prev.obj < 40)) say += ' Always find the cells on low power first - the high-power lens sits very close to the slide.';
        else if (o > prev.obj && cur.seen) say += ' Still nearly in focus - use the FINE focus only.';
        _coach(say);
        _scopeAfter('obj:' + v, prev);
        return;
      }
      case 'coarse': case 'fine':
        if (v !== 'up' && v !== 'down') return;
        _knob(k, v);
        return;
      case 'move': move(v); return;
      case 'id': identify(v); return;
      case 'fig': {
        const f = D.figure(v);
        if (!f) return;
        _w = _newSheet(v);
        _stampOff();
        _coach(`${f.title}. ${f.blurb} Lay the ruler across the whole cell first.`);
        if (_panel !== 'found') _renderPanel();
        _after('fig:' + v);
        return;
      }
      case 'ruler': {
        const f = D.figure(_w.fig);
        if (!['cell', 'inner', 'eye'].includes(v)) return;
        if (v === 'inner' && !f.innerMm) { _coach('A platelet has no nucleus - there is nothing inside it to measure.'); return; }
        const fresh = !!_w.done;
        _w = Object.assign(_newSheet(_w.fig), { ruler: v });
        _stampOff();
        _rulerT = _still() ? 1 : 0;
        const img = D.imageFor(f, v);
        _coach(v === 'eye' ? `No ruler: by eye it looks about ${D.fmt(img)} mm wide.`
          : v === 'inner' ? `The ruler is across ${f.innerName}: ${D.fmt(img)} mm.`
          : `The ruler’s 0 is on one edge of the cell, and the other edge reaches ${D.fmt(img)} mm. Image size = ${D.fmt(img)} mm.${fresh ? ' (A fresh start on this drawing.)' : ''}`);
        _after('ruler:' + v);
        return;
      }
      default: return;
    }
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
    const cur = { rig: _rig, slide: _s.slide || '', light: _s.light, diaphragm: _s.diaph, eye: String(_s.eye), obj: String(_s.obj),
                  fig: _w.fig, ruler: _w.ruler || '', stain: _s.stain || '', cover: _s.cover || '' };
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set;
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === b.dataset.v));
    });
    const c = _root.querySelector('[data-act="clips"]');
    if (c) c.setAttribute('aria-pressed', String(!!(_s.slide && _s.clipped)));
    const l = _root.querySelector('[data-act="labels"]');
    if (l) l.setAttribute('aria-pressed', String(_labels));
  }

  // Draw attention to the part a tap just used.
  function _mark(part) { _hl = { part, t: 1.6 }; }
  function _snap() { if (_still()) { _zv = _s.z; _pan = { x: _s.pos.x, y: _s.pos.y }; } }

  // ══ The microscope ═══════════════════════════
  function _scopeAfter(tok, prev) {
    const D = M();
    const cur = _view();
    _snap();
    D.scopeDiscoveries(prev, cur, tok).forEach(_discover);
    if (cur.sharp && cur.obj < 40) _s.lowSeen = true;
    if (cur.sharp && !(prev && prev.sharp && prev.total === cur.total && prev.slide === cur.slide && prev.light === cur.light)) {
      const seen = cur.g7
        ? (cur.obj === 40 ? 'The parts of a cell can be seen and named.' : cur.obj === 10 ? 'Cells bigger, fewer in view.' : 'Many small cells - too small to name their parts.')
        : (cur.obj === 40 ? 'Single cells can be seen and named.' : cur.obj === 10 ? 'Cells bigger, fewer in view.' : 'Hundreds of tiny dots - too small to name.');
      _logEntry({ title: `Sharp image at ×${cur.total}`, obs: `${D.SLIDES[cur.slide].name} · eyepiece ×${cur.eye} × objective ×${cur.obj} = ×${cur.total}. ${seen}` });
    }
    _missionScope(prev, cur, tok);
    _after(tok);
  }

  function clips() {
    if (_busy) return;
    _toRig('scope');
    if (!_s.slide) { _coach('Put a slide on the stage first, then clip it.'); return; }
    if (_s.clipped) { _coach('The slide is already held by the clips.'); return; }
    if (_g7slide() && !_s.cover) { _coach('Put a cover slip on first, then clip the slide.'); return; }
    const prev = _view();
    _s.clipped = true;
    _mark('clips');
    _coach('Stage clips on: the slide cannot slide about now.');
    _scopeAfter('clips', prev);
  }

  function lower() {
    if (_busy) return;
    _toRig('scope');
    const D = M();
    if (!_s.slide) { _coach('Put a slide on the stage first - there is nothing to lower the lens onto.'); return; }
    if (_g7slide() && !_s.cover) { _coach(D.ID_SAY_G7.uncovered); return; }
    const to = D.lowerTo(_s.obj);
    if (_s.z <= to) { _coach('The lens is already just above the slide. Now look through the eyepiece and focus UPWARDS.'); return; }
    const prev = _view();
    _s.z = to;
    _mark('coarse');
    _coach(_s.obj === 40
      ? 'Lowered, watching from the side. At high power the lens is now almost touching the slide - one wrong turn of the coarse knob would crack it. Low power first is safer.'
      : 'Watching from the side, you lowered the lens until it was just above the slide. Now look through the eyepiece and turn the coarse focus UP, away from the slide.');
    _scopeAfter('lower', prev);
  }

  function _knob(knob, dir) {
    if (_busy) return;
    const D = M();
    const step = knob === 'coarse' ? D.COARSE : D.FINE;
    const nz = D.clampZ(_s.z + (dir === 'up' ? step : -step));
    if (nz === _s.z) { _coach(dir === 'up' ? 'The lens is as high as it goes.' : 'The knob will not turn any further.'); return; }
    if (D.clearance(nz, _s.obj) <= 0) {
      if (_s.slide) { _crash(knob, _s.obj); return; }
      _coach('Stop - the lens is touching the empty stage. Turn the knob the other way.');
      return;
    }
    const prev = _view();
    _s.z = nz;
    _mark(knob);
    const cur = _view();
    let card = null;
    if (knob === 'coarse' && _s.obj === 40 && prev.seen && !cur.seen) {
      if (_mission) _mission.errors++;
      card = () => {
        const R = D.RESULTS[_cid('lost_image')];
        Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ mm: D.fmt(D.COARSE / 10), total: cur.total }), instead: R.instead, exam: R.exam,
          onClose: () => _coach('Fine focus only at high power. Try the fine focus back down a little at a time - or go back to low power.') });
      };
    } else if (D.highFirst(prev, cur, knob, _s.lowSeen)) {
      if (_mission) _mission.errors++;
      card = () => {
        const R = D.RESULTS.g7_highfirst;
        Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ mm: D.fmt(D.COARSE / 10), total: cur.total }), instead: R.instead, exam: R.exam,
          onClose: () => _coach('Swing in the ×4 objective, lower the lens watching from the side, and focus upwards. Then go to ×40.') });
      };
    }
    const mm = D.fmt(step / 10);
    const what = !_s.slide ? 'No slide on the stage.'
      : !cur.visible ? (!cur.covered ? 'No cover slip yet.' : cur.dark ? 'Too dark to see anything.' : '')
      : cur.focus === 'sharp' ? `Sharp! ×${cur.total}.`
      : cur.focus === 'near' ? (knob === 'coarse' ? 'The cells have appeared - now finish with the FINE focus.' : 'Nearly sharp - a little more.')
      : cur.focus === 'blurred' ? 'Blurred - keep going.' : 'Nothing but light yet.';
    _coach(`${knob === 'coarse' ? 'Coarse' : 'Fine'} focus ${dir}: the lens moved ${mm} mm ${dir === 'up' ? 'away from' : 'towards'} the slide. ${what}`);
    _scopeAfter(knob + ':' + dir, prev);
    if (card) { _busy = true; _fxAdd('blurout', () => { _busy = false; card(); }); }
  }

  // The guide's "do it" for a focusing step: one turn of the right knob, the right way.
  function _focusStep(kind) {
    const D = M(), v = _view();
    if (!_s.slide) { _coach('Put a slide on the stage first.'); return; }
    if (!v.covered) { _coach(D.ID_SAY_G7.uncovered); return; }
    if (!v.visible) { _coach('It is too dark to focus - switch the light on, or open the diaphragm.'); return; }
    if (kind === 'near' && v.seen) return;
    if (kind === 'sharp' && v.sharp) return;
    const F = D.FOCUS_AT[_s.obj];
    _knob(kind === 'near' ? 'coarse' : 'fine', _s.z < F ? 'up' : 'down');
  }

  function move(dir) {
    if (_busy) return;
    const D = M();
    if (!D.MOVES[dir]) return;
    if (!_s.slide) { _coach('There is no slide to move.'); return; }
    const r = D.move(_s.pos, dir);
    if (r.edge) { _coach('That is the edge of the smear - move the other way.'); return; }
    const prev = _view();
    _s.pos = { x: r.x, y: r.y };
    _mark('stage');
    const cur = _view();
    _coach(cur.seen ? `You moved the slide ${dir}. Watch which way the cells went in the eyepiece.` : `You moved the slide ${dir}.`);
    _scopeAfter('move:' + dir, prev);
  }

  function identify(guess) {
    if (_busy) return;
    const D = M();
    if (!D.CELLS[guess]) return;
    const r = D.identify(_view(), guess);
    const ms = _mission;
    if (!r.ok) {
      if (r.why === 'wrong') {
        if (ms && ms.id === 'cells') ms.errors++;
        _coach(`Not a ${D.CELLS[guess].name.toLowerCase()} - a ${D.CELLS[guess].name.toLowerCase()} is: ${D.CELLS[guess].clue.toLowerCase()}. Look again at the cell under the pointer.`);
      } else _coach(D.ID_SAY[r.why]);
      return;
    }
    const C = D.CELLS[guess];
    _discover(guess);
    _ids.unshift({ cell: guess, total: _view().total });
    if (_ids.length > 20) _ids.length = 20;
    _logEntry({ title: `Named: ${C.name}`, obs: `${C.look} ${C.job}` });
    let msg = `Yes - a ${C.name.toLowerCase()}. ${C.job}`;
    if (ms && ms.id === 'cells') {
      ms.found[guess] = true;
      const n = Object.keys(ms.found).length;
      if (n >= 4 && !ms.success) { ms.success = true; msg = 'All four found and named! Tap “Answer the questions” to finish the mission.'; Labs.confetti(); }
      else if (!ms.success) msg += ` (${n}/4 found)`;
    }
    _coach(msg);
    _after('id:' + guess);
  }

  // ══ Grade 7: name the part, and the kind of cell ══
  function part(guess) {
    if (_busy) return;
    const D = M();
    if (!D.CELL_PARTS[guess]) return;
    const v = _view();
    if (v.slide && !v.g7) return;
    const r = D.identifyPart(v, guess);
    const P = D.CELL_PARTS[guess];
    if (!r.ok) {
      if (r.why === 'unstained') { _noStain(P.name.toLowerCase()); return; }
      if (r.why === 'wrong') {
        if (_mission) _mission.errors++;
        _coach(P.plantOnly && v.kind === 'animal'
          ? `Cheek cells are animal cells - they have no ${P.name.toLowerCase()}. Look again at what is under the pointer.`
          : `Not the ${P.name.toLowerCase()} - the ${P.name.toLowerCase()} is ${P.look.charAt(0).toLowerCase() + P.look.slice(1)}. Look again at what is under the pointer.`);
      } else _coach(D.ID_SAY_G7[r.why]);
      return;
    }
    _discover('g7_' + guess);
    _ids.unshift({ part: guess, slide: v.slide, total: v.total });
    if (_ids.length > 20) _ids.length = 20;
    _logEntry({ title: `Named: ${P.name}`, obs: `${D.SLIDES[v.slide].name} at ×${v.total}. ${P.look}. ${P.job}` });
    _coach(_missionTick(guess, v, `Yes - the ${P.name.toLowerCase()}. ${P.job}`));
    _after('part:' + guess);
  }

  function kind(k) {
    if (_busy) return;
    const D = M();
    if (k !== 'plant' && k !== 'animal') return;
    const v = _view();
    if (v.slide && !v.g7) return;
    const r = D.classify(v, k);
    if (!r.ok) {
      if (r.why === 'unstained') { _noStain('kind of cell'); return; }
      if (r.why === 'wrong') {
        if (_mission) _mission.errors++;
        _coach(k === 'plant'
          ? 'Look again: is there a thick cell wall? A big clear vacuole? Green chloroplasts? Without them it is not a plant cell.'
          : 'Look again: that thick outer wall and the big clear vacuole belong to a plant cell.');
      } else _coach(D.ID_SAY_G7[r.why]);
      return;
    }
    _discover('g7_' + k);
    _logEntry({ title: `${D.SLIDES[v.slide].name}: ${k === 'plant' ? 'a plant cell' : 'an animal cell'}`,
      obs: k === 'animal' ? 'A cell membrane, cytoplasm and a nucleus - but no cell wall, no large vacuole and no chloroplasts.'
        : v.slide === 'leaf' ? 'A cell wall, a large vacuole and green chloroplasts.'
        : 'A cell wall and a large vacuole. No chloroplasts: an onion bulb grows out of the light.' });
    _coach(_missionTick(k, v, k === 'plant' ? 'Yes - a plant cell: it has a cell wall and a large vacuole.' : 'Yes - an animal cell: no cell wall, no large vacuole, no chloroplasts.'));
    _after('kind:' + k);
  }

  // A Grade 7 mission ticks off one thing the pupil found, on the right slide.
  function _missionTick(key, v, msg) {
    const ms = _mission;
    if (!ms || !ms.need.includes(key)) return msg;
    const Ms = M().MISSIONS.find(x => x.id === ms.id);
    const want = (Ms.needSlide && Ms.needSlide[key]) || Ms.slide;
    if (want && v.slide !== want) return `${msg} (For the mission, do this on the ${M().SLIDES[want].name.toLowerCase()}.)`;
    ms.found[key] = true;
    const n = ms.need.filter(x => ms.found[x]).length;
    if (n >= ms.need.length && !ms.success) { ms.success = true; Labs.confetti(); return 'All found! Tap “Answer the questions” to finish the mission.'; }
    return ms.success ? msg : `${msg} (${n}/${ms.need.length} for the mission)`;
  }

  function _noStain(what) {
    const D = M(), v = _view();
    if (_mission) _mission.errors++;
    const R = D.RESULTS.g7_nostain;
    _busy = true;
    _fxAdd('stamp', () => {
      _busy = false;
      Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ part: what, slide: D.SLIDES[v.slide].name.toLowerCase() }), instead: R.instead, exam: R.exam,
        onClose: () => _coach('Make the slide again, with one drop of stain before the cover slip.') });
    });
  }

  // Pressing on a cover slip: the thin glass cracks.
  function press() {
    if (_busy) return;
    _toRig('scope');
    if (!_g7slide() || !_s.cover) { _coach('There is no cover slip to press on. Make a slide and lower a cover slip first.'); return; }
    _cracked = true;
    _mark('stage');
    _hazard('g7_crack', { knob: 'press', obj: _s.obj });
  }

  function draw() {
    if (_busy) return;
    _toRig('scope');
    if (_g7slide()) { _coach('Name the part under the pointer instead - the drawings are for the blood slides.'); return; }
    const D = M(), v = _view();
    const r = v.under ? D.identify(v, v.under) : { ok: false, why: 'no_slide' };
    if (!r.ok) { _coach(r.why === 'wrong' ? 'Focus a cell under the pointer first.' : D.ID_SAY[r.why]); return; }
    const cell = v.under, dr = D.DRAW[cell], C = D.CELLS[cell];
    const mag = D.magnification(dr.widthMm, C.sizeUm);
    _drawings.unshift({ cell, mag });
    if (_drawings.length > 6) _drawings.length = 6;
    _discover('drawing');
    _logEntry({ title: `Drawing: ${C.name}`, obs: `Drawn ${dr.widthMm} mm wide. Real width ${C.sizeUm} µm = ${D.fmt(D.umToMm(C.sizeUm))} mm, so the drawing’s magnification = ${dr.widthMm} ÷ ${D.fmt(D.umToMm(C.sizeUm))} = ×${D.fmt(mag)}.`, note: true });
    _coach(`Drawn in your notebook: clear lines, no shading, ruled labels - and its magnification, ×${D.fmt(mag)}.`);
    _after('draw');
  }

  function _toggleLabels() {
    if (_busy) return;
    _toRig('scope');
    _labels = !_labels;
    _vcKey = '';
    _coach(_labels ? 'The parts of the microscope. Tap 🏷 Parts again to go back to the eyepiece view.' : 'Back to the eyepiece view.');
    _syncSet();
    _readouts();
  }

  // ══ The measuring desk ═══════════════════════
  function _sheetGuard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    _toRig('measure');
    if (!_w.ruler) { _coach('Measure the drawing first - choose where to lay the ruler.'); return false; }
    if (_w.done) { _coach('That answer is written. Choose a drawing, or lay the ruler again, to start another.'); return false; }
    return true;
  }
  function convert() {
    if (!_sheetGuard()) return;
    const D = M(), f = D.figure(_w.fig);
    if (f.mode === 'findActual' && f.askUnit === 'mm') { _coach('The question asks for mm - and mm ÷ magnification already gives mm. No conversion needed.'); return; }
    if (_w.converted) { _coach('The units already match.'); return; }
    _w.converted = true;
    _coach(f.mode === 'findM'
      ? `${f.actualUm} µm = ${f.actualUm} ÷ 1000 = ${D.fmt(D.umToMm(f.actualUm))} mm. Now both lengths are in mm.`
      : `mm → µm: multiply by 1000, because 1 mm = 1000 µm.`);
    _after('convert');
  }
  function operate(op) {
    if (!_sheetGuard()) return;
    const D = M(), f = D.figure(_w.fig);
    _w.op = op;
    const r = D.work(f, _w);
    _coach(op === 'divide'
      ? (f.mode === 'findM' ? `Magnification = image ÷ actual = ${D.fmt(r.image)} ÷ ${_w.converted ? D.fmt(D.umToMm(f.actualUm)) : D.fmt(f.actualUm)} = ×${D.fmt(r.value)}.`
                            : `Actual size = image ÷ magnification = ${D.fmt(r.image)} ÷ ${D.fmt(f.mag)}.`)
      : `${D.fmt(r.image)} × ${f.mode === 'findM' ? (_w.converted ? D.fmt(D.umToMm(f.actualUm)) : D.fmt(f.actualUm)) : D.fmt(f.mag)}…`);
    _after(op);
  }
  function answer() {
    if (!_sheetGuard()) return;
    const D = M(), f = D.figure(_w.fig);
    if (!_w.op) { _coach('Work it out first: divide (or multiply) before you write the answer.'); return; }
    const r = D.work(f, _w);
    _w.done = r;
    _calcs.unshift({ fig: f.id, title: f.title, lines: D.workLines(f, _w), shown: r.shown, correct: r.correct, right: r.rightShown });
    if (_calcs.length > 12) _calcs.length = 12;
    const ms = _mission;
    if (r.correct) {
      D.measureDiscoveries(f, r).forEach(_discover);
      _logEntry({ title: `${f.title}: ${r.shown} ✓`, obs: D.workLines(f, _w).join(' · ') });
      let msg = `${r.shown} - correct! ${f.mode === 'findM' ? 'No unit after a magnification.' : 'A sensible size for a blood cell.'}`;
      if (ms && ms.id === 'mag') {
        if (ms.need.includes(f.id)) ms.done[f.id] = true;
        const n = ms.need.filter(x => ms.done[x]).length;
        if (n >= ms.need.length && !ms.success) { ms.success = true; msg = 'Both drawings worked out! Tap “Answer the questions” to finish the mission.'; Labs.confetti(); }
        else if (!ms.success) msg += ms.need.includes(f.id) ? ` (${n}/${ms.need.length} mission drawings done)` : ' That one is not a mission drawing - see the mission steps.';
      }
      _coach(msg);
      _after('answer');
      return;
    }
    if (ms && ms.id === 'mag') ms.errors++;
    _logEntry({ title: `${f.title}: ${r.shown} ✗`, obs: D.workLines(f, _w).join(' · ') + ` · The answer is ${r.rightShown}.` });
    const R = D.RESULTS[r.error];
    const ctx = {
      mode: f.mode, image: D.fmt(r.image), actual: D.fmt(f.actualUm || 0), mag: D.fmt(f.mag || 0),
      mm: D.fmt(f.mag ? D.actualMm(r.image, f.mag) : 0), shown: r.shown, rightShown: r.rightShown,
      innerName: f.innerName, inner: D.fmt(f.innerMm || 0), eye: D.fmt(f.eyeMm),
      wrongMm: D.fmt(f.mag ? r.image * f.mag : 0), metres: D.fmt(f.mag ? r.image * f.mag / 1000 : 0),
    };
    _readouts();
    _refresh();
    _busy = true;
    _fxAdd('stamp', () => {
      _busy = false;
      Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened(ctx), instead: R.instead, exam: R.exam,
        onClose: () => _coach('Lay the ruler again and try once more - measure the whole cell, match the units, divide.') });
    });
    _guideEvent('answer');
  }
  function _stampOff() { _fx = _fx.filter(f => f.type !== 'stamp'); }

  // ══ Hazards ══════════════════════════════════
  function _crash(knob, obj) {
    const D = M();
    // The lens comes down onto the glass before the card.
    _s.obj = obj;
    _s.z = D.FOCUS_AT[obj] - D.WORK_DIST[obj];
    _cracked = true;
    _mark('objective');
    _hazard(_cid('crack'), { knob, obj });
  }

  function _hazard(id, ctx) {
    if (_busy) return;
    const D = M();
    _toRig('scope');
    const H = D.HAZARDS[id];
    const st = Labs.store('microscope');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    const crack = id === 'crack' || id === 'g7_crack', sun = id === 'sun' || id === 'g7_sun';
    if (sun) { _s.light = 'mirror'; _mark('light'); }
    _busy = true;
    _readouts();
    _fxAdd(crack ? 'crack' : sun ? 'glare' : id === 'g7_swab' ? 'germs' : id === 'g7_stain' ? 'splash' : 'drop', () => {
      _busy = false;
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx || {}), happened: H.happened(ctx || {}), why: H.why, instead: H.instead, exam: H.exam,
        button: crack ? 'Swept up safely - try again' : 'Got it - try again safely',
        onClose: () => {
          if (crack) {
            _s.slide = null; _s.clipped = false; _s.z = D.Z_START; _zv = _s.z; _cracked = false;
            _s.stain = null; _s.cover = null; _s.lowSeen = false;
            _coach(id === 'g7_crack'
              ? 'Your teacher swept the broken glass into the broken-glass bin. Make a new slide - lower the cover slip gently, and start on low power.'
              : 'Your teacher swept the broken slide into the broken-glass bin. Take a new slide - and start on low power.');
          } else if (sun) _coach('The mirror is back on the window. Never aim it at the Sun.');
          else if (id === 'g7_swab') _coach('A fresh cotton bud for you, and the used one straight into the disinfectant. Then wash your hands.');
          else if (id === 'g7_stain') _coach('Goggles on. Squeeze gently - one drop at a time, straight onto the specimen.');
          else _coach('Prepared slides only. They are sterile and sealed, and far better stained than anything you could make.');
          _syncSet(); _readouts(); _refresh();
        } });
    });
  }

  // ══ Missions ═════════════════════════════════
  function _missionScope(prev, cur, tok) {
    const ms = _mission;
    if (!ms || ms.id !== 'focus') return;
    if (cur.sharp && cur.slide === 'blood' && cur.obj < 40) ms.lowFirst = true;
    if (tok === 'obj:40' && !ms.lowFirst && !ms.warned) { ms.warned = true; ms.errors++; }
    if (cur.sharp && cur.slide === 'blood' && cur.obj === 40 && !ms.success) {
      if (cur.eye !== 10) { _coach('The mission asks for ×400: use the ×10 eyepiece with the ×40 objective.'); return; }
      ms.success = true;
      Labs.confetti();
      setTimeout(() => _coach('×400, sharp and safe! Tap “Answer the questions” to finish the mission.'), 0);
    }
  }

  function startMission(id) {
    const Ms = M().MISSIONS.find(x => x.id === id);
    if (!Ms || _busy) return;
    _stopGuide(true);
    _resetBench();
    _rig = Ms.rig;
    _mission = { id, errors: 0, success: false, found: {}, done: {}, need: Ms.need || [], lowFirst: false, warned: false };
    _panel = 'missions';
    _resize();
    _coach(Ms.intro);
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const Ms = M().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(Ms.quiz, { title: Ms.title, onDone: r => {
      let s = 3;
      if (ms.errors) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('microscope');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} on the bench - a clean run earns an extra star.` : 'A clean, careful, safe run. 🔬');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: Ms.icon, title: Ms.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try another mission, or go and hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  const _gdef = () => _guide && (_guide.def || M().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || M().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _resetBench();
    _rig = 'scope';
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _resize();
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
    _guideEnter();
    const z = $('lab-microscope-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step whose setting is already in place needs no tap.
  function _satisfied(tok) {
    const [k, v] = tok.split(':');
    switch (k) {
      case 'rig': return _rig === v;
      case 'slide': return _s.slide === v;
      case 'clips': return !!_s.slide && _s.clipped;
      case 'light': return _s.light === v;
      case 'diaphragm': return _s.diaph === v;
      case 'eye': return _s.eye === +v;
      case 'obj': return _s.obj === +v;
      case 'focus': { const vw = _view(); return v === 'sharp' ? vw.sharp : vw.seen; }
      case 'fig': return _w.fig === v && !_w.ruler;
      case 'ruler': return _w.ruler === v && !_w.done;
      case 'convert': return _w.converted && !_w.done;
      case 'divide': return _w.op === 'divide' && !_w.done;
      case 'stain': return _s.stain === v;
      case 'cover': return _s.cover === v;
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
        <button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>
        <button type="button" class="lab-link" data-act="guide-stop">Stop the guide</button>`;
      box.hidden = false;
    }
    _highlight();
  }

  // Any action may complete the current step - by its own token, or by
  // putting in place what a focus step asks for.
  function _guideEvent(token) {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (s && s.on === token) _guide.step++;
    _guideEnter();
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
    const D = M();
    switch (k) {
      case 'rig': return v === 'scope' ? { on, say: 'Go to the microscope.', btn: '🔬 Microscope' } : { on, say: 'Go to the measuring desk.', btn: '📏 Measure a drawing' };
      case 'slide': return ({
        blood: { on, say: 'Put the prepared, stained blood smear on the stage.', btn: '🩸 Prepared blood smear' },
        unstained: { on, say: 'Put the UNSTAINED smear on the stage.', btn: '🩸 Unstained smear' },
        onion: { on, say: 'Make a slide: a thin layer of onion skin, flat in a drop of water.', btn: '🧅 Onion skin' },
        cheek: { on, say: 'Make a slide of your OWN cheek cells, scraped with a clean cotton bud. The used bud goes into the disinfectant.', btn: '👄 My cheek cells' },
        leaf: { on, say: 'Make a slide: one small pondweed leaf, flat in a drop of water.', btn: '🌿 Pondweed leaf' },
      })[v] || { on, say: on, btn: on };
      case 'stain': return { on, say: `Add ONE drop of ${D.STAINS[v].name.toLowerCase()}.`, btn: `💧 ${D.STAINS[v].name}` };
      case 'cover': return v === 'angle' ? { on, say: 'Lower a cover slip slowly, one edge first, at an angle.', btn: '🔲 Cover slip at an angle' }
        : { on, say: 'Drop the cover slip flat.', btn: '⬇️ Drop it flat' };
      case 'part': { const P = D.CELL_PARTS[v]; return { on, say: `Name the part under the pointer: it is the ${P.name.toLowerCase()} (${P.look.charAt(0).toLowerCase() + P.look.slice(1)}).`, btn: `${P.icon} ${P.name}` }; }
      case 'kind': return v === 'plant' ? { on, say: 'Decide: a cell wall and a big vacuole - a plant cell.', btn: '🌿 Plant cell' }
        : { on, say: 'Decide: no cell wall - an animal cell.', btn: '👄 Animal cell' };
      case 'clips': return { on, say: 'Hold the slide still with the stage clips.', btn: '📎 Clip the slide' };
      case 'light': return v === 'lamp' ? { on, say: 'Switch on the lamp.', btn: '💡 Lamp on' }
        : v === 'mirror' ? { on, say: 'Use the mirror: tilt it to catch light from a bright window.', btn: '🪞 Mirror, aimed at a window' }
        : { on, say: 'Switch the light off.', btn: 'Light off' };
      case 'diaphragm': return v === 'narrow' ? { on, say: 'Close the diaphragm almost completely.', btn: '🔅 Diaphragm nearly closed' }
        : v === 'wide' ? { on, say: 'Now open the diaphragm wide.', btn: '🔆 Diaphragm wide open' } : { on, say: 'Set the diaphragm half open.', btn: 'Diaphragm half open' };
      case 'eye': return { on, say: `Put in the ×${v} eyepiece.`, btn: `👁️ ×${v} eyepiece` };
      case 'obj': return { on, say: `Turn the nosepiece to the ×${v} objective (${D.OBJ[v].name.toLowerCase()}).`, btn: `🔍 ×${v} objective` };
      case 'lower': return { on, say: 'Watching from the SIDE, lower the lens until it is just above the slide.', btn: '⬇️ Lower it, watching from the side' };
      case 'focus': return v === 'near' ? { on, say: 'Looking through the eyepiece, turn the coarse focus so the lens moves UP until the cells appear.', btn: '⤴️ Coarse focus up' }
        : { on, say: 'Turn the fine focus, a little at a time, until the cells are sharp.', btn: '🎯 Fine focus' };
      case 'coarse': case 'fine': return { on, say: `Turn the ${k} focus ${v}.`, btn: `${k === 'coarse' ? 'Coarse' : 'Fine'} ${v}` };
      case 'move': return { on, say: `Move the slide ${v}.`, btn: `${{ left: '◀', right: '▶', up: '▲', down: '▼' }[v]} Move the slide ${v}` };
      case 'id': return { on, say: `Name the cell under the pointer: it is a ${D.CELLS[v].name.toLowerCase()} (${D.CELLS[v].clue.toLowerCase()}).`, btn: `${D.CELLS[v].icon} ${D.CELLS[v].name}` };
      case 'draw': return { on, say: 'Draw the cell under the pointer in your notebook.', btn: '✏️ Draw it' };
      case 'fig': { const f = D.figure(v); return { on, say: `Choose the drawing: ${f.title.toLowerCase()} - ${f.blurb}`, btn: `${D.CELLS[f.cell].icon} ${f.title}` }; }
      case 'ruler': return v === 'cell' ? { on, say: 'Lay the ruler across the WHOLE cell, 0 on one edge.', btn: '📏 Ruler across the whole cell' }
        : v === 'inner' ? { on, say: 'Lay the ruler across the middle part only.', btn: '📏 Ruler across the middle' } : { on, say: 'Estimate the size by eye.', btn: '👁️ By eye' };
      case 'convert': return { on, say: 'Make the units match: 1 mm = 1000 µm.', btn: '🔁 Make the units match' };
      case 'divide': return { on, say: 'Divide the image size.', btn: '➗ Divide' };
      case 'multiply': return { on, say: 'Multiply.', btn: '✖ Multiply' };
      case 'answer': return { on, say: 'Write the answer.', btn: '✅ Write the answer' };
    }
    return { on, say: on, btn: on };
  }

  function discoveryGuide(id) {
    const d = M().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = M().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('microscope').disc[id];
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
        ${d.formula ? `<section class="lab-hz-sec"><h3>The rule</h3><p class="lab-eq is-sym">${esc(d.formula)}</p></section>` : ''}
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
    const st = Labs.store('microscope');
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _guides().find(g => !st.guides[g.id]);
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
    if (tok === 'focus:near' || tok === 'focus:sharp') {
      const knob = tok === 'focus:near' ? 'coarse' : 'fine';
      return `[data-set="${knob}"][data-v="${_s.z < M().FOCUS_AT[_s.obj] ? 'up' : 'down'}"]`;
    }
    const i = tok.indexOf(':');
    return i > 0 ? `[data-set="${tok.slice(0, i)}"][data-v="${tok.slice(i + 1)}"]` : `[data-act="${tok}"]`;
  }
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-body ' + _selFor(s.on));
    if (el) el.classList.add('is-next');
  }

  // ══ Panels ═══════════════════════════════════
  function _startHTML() {
    const st = Labs.store('microscope');
    const guide = G => {
      const done = !!st.guides[G.id];
      return `<div class="lab-start-card${done ? ' is-done' : ''}">
        <span class="lab-start-icon" aria-hidden="true">${G.icon}</span>
        <span class="lab-start-text"><b>${esc(G.title)}${done ? ' <em>✓ done</em>' : ''}</b><small>${esc(G.blurb)}</small></span>
        <button type="button" class="lab-btn lab-btn-sm${done ? '' : ' lab-btn-primary'}" data-guide="${G.id}">${done ? 'Again' : 'Start'}</button></div>`;
    };
    const mission = Ms => {
      const best = (st.missions[Ms.id] && st.missions[Ms.id].stars) || 0;
      return `<div class="lab-start-card">
        <span class="lab-start-icon" aria-hidden="true">${Ms.icon}</span>
        <span class="lab-start-text"><b>${esc(Ms.title)}</b><small>${esc(Ms.blurb)}</small>${Labs.stars(best)}</span>
        <button type="button" class="lab-btn lab-btn-sm" data-mission="${Ms.id}">${best ? 'Play again' : 'Start'}</button></div>`;
    };
    return `<section class="lab-start" aria-label="What to do here">
      <h2>What would you like to do?</h2>
      <ol class="lab-how">
        <li><b>Choose</b> a guided experiment (the best place to start) or a mission.</li>
        <li><b>Follow the yellow box</b> under the picture. The thing to tap next glows yellow.</li>
        <li><b>Watch the eyepiece</b>, then read your results in the lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_guides().map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_missions().map(mission).join('')}</div>
      <p class="lab-hint">${_is7() ? 'Or experiment freely: make a slide below.' : 'Or experiment freely: set up the microscope below.'}</p>
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
  // Only this grade's discoveries count here, so a Grade 7 bench never
  // collects a Grade 9 card (and the counter never mixes the two).
  function _discover(id) {
    const L = _discs(), d = L.find(x => x.id === id);
    if (!d) return;
    if (Labs.discover('microscope', id, { title: d.title, total: L.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const st = Labs.store('microscope'), L = _discs();
    n.textContent = `${L.filter(d => st.disc[d.id]).length}/${L.length}`;
  }

  function _renderTools() {
    const box = $('lab-microscope-tools');
    if (!box) return;
    const D = M();
    if (_rig === 'measure') {
      box.innerHTML = `<div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Work it out</p>
        <div class="lab-tools">
          <button type="button" class="lab-tool" data-act="convert"><span aria-hidden="true">🔁</span>Make units match</button>
          <button type="button" class="lab-tool" data-act="divide"><span aria-hidden="true">➗</span>Divide</button>
          <button type="button" class="lab-tool" data-act="multiply"><span aria-hidden="true">✖️</span>Multiply</button>
          <button type="button" class="lab-tool" data-act="answer"><span aria-hidden="true">✅</span>Write the answer</button>
        </div></div>`;
    } else {
      box.innerHTML = `<div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Focus</p>
        <div class="lab-tools lab-microscope-three">
          <button type="button" class="lab-tool" data-act="lower"><span aria-hidden="true">⬇️</span>Lower lens (watch from side)</button>
          <button type="button" class="lab-tool" data-set="coarse" data-v="up"><span aria-hidden="true">⏫</span>Coarse up</button>
          <button type="button" class="lab-tool" data-set="coarse" data-v="down"><span aria-hidden="true">⏬</span>Coarse down</button>
          <button type="button" class="lab-tool" data-set="fine" data-v="up"><span aria-hidden="true">🔼</span>Fine up</button>
          <button type="button" class="lab-tool" data-set="fine" data-v="down"><span aria-hidden="true">🔽</span>Fine down</button>
          <button type="button" class="lab-tool" data-act="labels" aria-pressed="false"><span aria-hidden="true">🏷️</span>Parts</button>
        </div></div>
        <div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Move the slide</p>
        <div class="lab-tools">
          <button type="button" class="lab-tool" data-set="move" data-v="left" aria-label="Move the slide left"><span aria-hidden="true">◀</span>Left</button>
          <button type="button" class="lab-tool" data-set="move" data-v="up" aria-label="Move the slide up"><span aria-hidden="true">▲</span>Up</button>
          <button type="button" class="lab-tool" data-set="move" data-v="down" aria-label="Move the slide down"><span aria-hidden="true">▼</span>Down</button>
          <button type="button" class="lab-tool" data-set="move" data-v="right" aria-label="Move the slide right"><span aria-hidden="true">▶</span>Right</button>
        </div></div>
        ${_is7() ? `<div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Name the part under the pointer</p>
        <div class="lab-tools lab-microscope-three">${D.PART_IDS.map(id => `<button type="button" class="lab-tool" data-set="part" data-v="${id}"><span aria-hidden="true">${D.CELL_PARTS[id].icon}</span>${esc(D.CELL_PARTS[id].name)}</button>`).join('')}</div></div>
        <div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Plant cell or animal cell?</p>
        <div class="lab-tools lab-microscope-two">
          <button type="button" class="lab-tool" data-set="kind" data-v="plant"><span aria-hidden="true">🌿</span>Plant cell</button>
          <button type="button" class="lab-tool" data-set="kind" data-v="animal"><span aria-hidden="true">👄</span>Animal cell</button></div></div>`
        : `<div class="lab-microscope-toolgrp"><p class="lab-microscope-toolhead">Name the cell under the pointer</p>
        <div class="lab-tools">${D.CELL_IDS.map(id => `<button type="button" class="lab-tool" data-set="id" data-v="${id}"><span aria-hidden="true">${D.CELLS[id].icon}</span>${esc(D.CELLS[id].short)}</button>`).join('')}</div>
        <button type="button" class="lab-btn lab-btn-wide" data-act="draw">✏️ Draw the cell in my notebook</button></div>`}`;
    }
    _syncSet();
    _highlight();
  }

  function _opt(k, v, label, small, extra) {
    return `<button type="button" class="lab-microscope-opt${extra ? ' ' + extra : ''}" data-set="${k}" data-v="${v}" aria-pressed="false">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _shelfHTML() {
    const D = M();
    const sign = k => `<i class="lab-microscope-optsign">${Labs.sign(k, true)}</i>`;
    // Clips, light, diaphragm, eyepiece and objective: the same microscope at every grade.
    const rows = n => `<div class="lab-microscope-row"><span class="lab-microscope-label">${n} · Hold it still</span>
          <div class="lab-microscope-opts is-wide"><button type="button" class="lab-microscope-opt" data-act="clips" aria-pressed="false">📎 Clip the slide<small>the two stage clips</small></button></div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">${n + 1} · Light</span>
          <div class="lab-microscope-opts is-wide">${Object.keys(D.LIGHTS).map(k => _opt('light', k, { lamp: '💡 ', mirror: '🪞 ', off: '⚫ ' }[k] + D.LIGHTS[k].name, D.LIGHTS[k].meta)).join('')}
            <button type="button" class="lab-microscope-opt lab-microscope-danger" data-act="sun">${sign('eye')}☀️ Mirror at the Sun<small>direct sunlight</small></button></div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">${n + 2} · Diaphragm</span>
          <div class="lab-microscope-opts">${Object.keys(D.DIAPHRAGM).map(k => _opt('diaphragm', k, D.DIAPHRAGM[k].name)).join('')}</div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">${n + 3} · Eyepiece</span>
          <div class="lab-microscope-opts">${D.EYEPIECES.map(e => _opt('eye', e, '×' + e)).join('')}</div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">${n + 4} · Objective (turn the nosepiece)</span>
          <div class="lab-microscope-opts">${D.OBJECTIVES.map(o => _opt('obj', o, '×' + o, D.OBJ[o].short)).join('')}</div></div>`;
    if (_rig === 'scope' && _is7()) {
      const icon = { onion: '🧅 ', cheek: '👄 ', leaf: '🌿 ' };
      return `<section class="lab-shelf lab-microscope-set" aria-label="Make a slide and set up the microscope">
        <h2>Make a slide</h2>
        <div class="lab-microscope-row"><span class="lab-microscope-label">1 · Specimen</span>
          <div class="lab-microscope-opts is-wide">${Object.keys(D.SLIDES).filter(_slideOk).map(k => _opt('slide', k, icon[k] + D.SLIDES[k].name, D.SLIDES[k].meta)).join('')}
            <button type="button" class="lab-microscope-opt lab-microscope-danger" data-act="swab">${sign('biohazard')}🦠 Borrow a used cotton bud<small>a friend’s</small></button></div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">2 · Stain (before the cover slip)</span>
          <div class="lab-microscope-opts is-wide">${Object.keys(D.STAINS).map(k => _opt('stain', k, '💧 ' + D.STAINS[k].name, D.STAINS[k].meta)).join('')}
            <button type="button" class="lab-microscope-opt lab-microscope-danger" data-act="splash">${sign('irritant')}💦 Squeeze the dropper hard<small>no goggles</small></button></div></div>
        <div class="lab-microscope-row"><span class="lab-microscope-label">3 · Cover slip</span>
          <div class="lab-microscope-opts is-wide">${Object.keys(D.COVERS).map(k => _opt('cover', k, (k === 'angle' ? '🔲 ' : '⬇️ ') + D.COVERS[k].name, D.COVERS[k].meta)).join('')}
            <button type="button" class="lab-microscope-opt lab-microscope-danger" data-act="press">${sign('sharp')}👍 Press it down hard<small>to flatten it</small></button></div></div>
        <h2>Set up the microscope</h2>
        ${rows(4)}
        <p class="lab-hint">Low power first. Then use the focus buttons under the picture, and name the part under the pointer.</p>
      </section>`;
    }
    if (_rig === 'scope') {
      return `<section class="lab-shelf lab-microscope-set" aria-label="Set up the microscope">
        <h2>Set up the microscope</h2>
        <div class="lab-microscope-row"><span class="lab-microscope-label">1 · Slide</span>
          <div class="lab-microscope-opts is-wide">${Object.keys(D.SLIDES).filter(_slideOk).map(k => _opt('slide', k, '🩸 ' + D.SLIDES[k].name, D.SLIDES[k].meta)).join('')}
            <button type="button" class="lab-microscope-opt lab-microscope-danger" data-act="prick">${sign('biohazard')}💉 Prick a finger<small>for fresh blood</small></button></div></div>
        ${rows(2)}
        <p class="lab-hint">Total magnification = eyepiece × objective. Then use the focus buttons under the picture.</p>
      </section>`;
    }
    const f = D.figure(_w.fig);
    return `<section class="lab-shelf lab-microscope-set" aria-label="Measure a drawing">
      <h2>Measure a drawing</h2>
      <div class="lab-microscope-row"><span class="lab-microscope-label">1 · Choose a printed drawing</span>
        <div class="lab-microscope-opts is-wide">${D.FIGURES.map(g => _opt('fig', g.id, D.CELLS[g.cell].icon + ' ' + g.title, g.blurb)).join('')}</div></div>
      <div class="lab-microscope-row"><span class="lab-microscope-label">2 · Lay the ruler</span>
        <div class="lab-microscope-opts is-wide">
          ${_opt('ruler', 'cell', '📏 Across the whole cell', 'edge to edge, at its widest')}
          ${f.innerMm ? _opt('ruler', 'inner', '📏 Across ' + f.innerName, 'the middle part only') : ''}
          ${_opt('ruler', 'eye', '👁️ Guess by eye', 'no ruler')}</div></div>
      <p class="lab-hint">The ruler is drawn to the same scale as the figure, just as a ruler lies on the printed page. Then use the buttons under the picture: make the units match, divide, write the answer.</p>
    </section>`;
  }

  function _cellSVG(cell) {
    const D = M(), lab = D.DRAW[cell].labels;
    const line = (x1, y1, x2, y2, t, ty) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text x="${x2 + 4}" y="${ty}">${esc(t)}</text>`;
    let shape = '', lines = '';
    if (cell === 'rbc') {
      shape = '<circle cx="62" cy="62" r="40"/><circle cx="62" cy="62" r="17" stroke-dasharray="3 3"/>';
      lines = line(96, 42, 130, 28, lab[0], 31) + line(84, 70, 130, 62, lab[1], 65) + line(66, 60, 130, 96, lab[2], 99);
    } else if (cell === 'phago') {
      shape = '<circle cx="62" cy="62" r="44"/><path d="M40 60 q6-18 20-8 q10-14 22 0 q10 6 2 18 q-8 10-18 2 q-10 10-20 2 q-12-4-6-14z"/>';
      lines = line(100, 40, 130, 28, lab[0], 31) + line(80, 88, 130, 96, lab[1], 99) + line(70, 56, 130, 62, lab[2], 65);
    } else if (cell === 'lympho') {
      shape = '<circle cx="62" cy="62" r="40"/><circle cx="64" cy="61" r="31"/>';
      lines = line(98, 44, 130, 28, lab[0], 31) + line(99, 72, 130, 96, lab[1], 99) + line(70, 60, 130, 62, lab[2], 65);
    } else {
      shape = '<path d="M50 52 q10-10 20-2 q12 4 6 16 q-4 12-18 8 q-14-6-8-22z"/>';
      lines = line(74, 50, 130, 40, lab[0], 43) + line(64, 62, 130, 80, lab[1], 83);
    }
    return `<svg class="lab-microscope-drawing" viewBox="0 0 250 124" role="img" aria-label="A labelled drawing">${shape}<g>${lines}</g></svg>`;
  }

  function _notebookHTML() {
    const D = M();
    const cellRows = _ids.filter(r => r.cell), partRows = _ids.filter(r => r.part);
    const parts = partRows.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Parts I named</caption>
        <thead><tr><th scope="col">Part</th><th scope="col">Seen in</th><th scope="col">What it looked like</th><th scope="col">Its job</th></tr></thead>
        <tbody>${partRows.slice(0, 8).map(r => { const P = D.CELL_PARTS[r.part]; return `<tr><th scope="row">${esc(P.name)}</th><td>${esc(D.SLIDES[r.slide].name)} · ×${r.total}</td><td>${esc(P.look)}</td><td>${esc(P.job)}</td></tr>`; }).join('')}</tbody></table></div>` : '';
    const ids = cellRows.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Cells I named</caption>
        <thead><tr><th scope="col">Cell</th><th scope="col">Seen at</th><th scope="col">What it looked like</th><th scope="col">Its job</th></tr></thead>
        <tbody>${cellRows.slice(0, 8).map(r => { const C = D.CELLS[r.cell]; return `<tr><th scope="row">${esc(C.name)}</th><td>×${r.total}</td><td>${esc(C.clue)}</td><td>${esc(C.job)}</td></tr>`; }).join('')}</tbody></table></div>` : '';
    const drawings = _drawings.length ? `<div class="lab-microscope-drawings">${_drawings.slice(0, 3).map(d => {
        const C = D.CELLS[d.cell], dr = D.DRAW[d.cell];
        return `<figure class="lab-microscope-fig">${_cellSVG(d.cell)}<figcaption><b>${esc(C.name)}</b> · drawing ${dr.widthMm} mm wide, real ${C.sizeUm} µm = ${D.fmt(D.umToMm(C.sizeUm))} mm · magnification = ${dr.widthMm} ÷ ${D.fmt(D.umToMm(C.sizeUm))} = ×${D.fmt(d.mag)}</figcaption></figure>`;
      }).join('')}</div>` : '';
    const calcs = _calcs.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Magnification calculations</caption>
        <thead><tr><th scope="col">Drawing</th><th scope="col">Working</th><th scope="col">Answer</th></tr></thead>
        <tbody>${_calcs.slice(0, 8).map(r => `<tr><th scope="row">${esc(r.title)}</th><td class="lab-eq">${r.lines.map(esc).join('<br>')}</td><td><b>${esc(r.shown)}</b> ${r.correct ? '✓' : `✗<br><small class="lab-muted">should be ${esc(r.right)}</small>`}</td></tr>`).join('')}</tbody></table></div>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : _is7() ? '<p class="lab-empty">What you see and the parts of cells you name appear here.</p>'
      : '<p class="lab-empty">What you see, the cells you name, your drawings and your calculations appear here.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${ids}${parts}${drawings}${calcs}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('microscope');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Work carefully and safely, answer the exam-style questions, earn up to three stars.</p>
      ${_missions().map(Ms => {
        const best = (st.missions[Ms.id] && st.missions[Ms.id].stars) || 0;
        return `<article class="lab-mission-card">
          <span class="lab-mission-icon" aria-hidden="true">${Ms.icon}</span>
          <div><h3>${esc(Ms.title)}</h3><p>${esc(Ms.blurb)}</p>${Labs.stars(best)}</div>
          <button type="button" class="lab-btn lab-btn-primary" data-mission="${Ms.id}">${best ? 'Play again' : 'Start'}</button>
        </article>`;
      }).join('')}</section>`;
  }

  function _missionHTML() {
    const ms = _mission;
    if (!ms) return '';
    const D = M();
    const Ms = D.MISSIONS.find(x => x.id === ms.id);
    const tick = b => b ? 'is-done' : '';
    let body = '';
    if (ms.id === 'focus') {
      const v = _view();
      body = `<ul class="lab-steps">
        <li class="${tick(_s.slide === 'blood' && _s.clipped)}">🩸 Stained smear on the stage, clipped</li>
        <li class="${tick(_s.light !== 'off')}">💡 Light on</li>
        <li class="${tick(ms.lowFirst)}">🔍 A sharp image on low power first</li>
        <li class="${tick(_s.obj === 40)}">🔬 The ×40 objective</li>
        <li class="${tick(ms.success || (v.sharp && _s.obj === 40))}">🎯 Sharp at ×400, fine focus only</li>
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    } else if (ms.id === 'cells') {
      const n = Object.keys(ms.found).length;
      body = `<ul class="lab-steps">${D.CELL_IDS.map(id => `<li class="${tick(ms.found[id])}">${D.CELLS[id].icon} ${esc(D.CELLS[id].name)}</li>`).join('')}
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${n} of 4 named · move the slide to find the white cells</p>`;
    } else if (Ms.needs) {
      const n = ms.need.filter(k => ms.found[k]).length;
      body = `<ul class="lab-steps">${ms.need.map(k => `<li class="${tick(ms.found[k])}">${esc(Ms.needs[k])}</li>`).join('')}
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${n} of ${ms.need.length} done · low power first, then ×400</p>`;
    } else {
      body = `<ul class="lab-steps">${ms.need.map(id => { const f = D.figure(id); return `<li class="${tick(ms.done[id])}">${D.CELLS[f.cell].icon} ${esc(f.title)}: ${esc(f.blurb)}</li>`; }).join('')}
        <li class="${tick(ms.success)}">📝 Answer the questions</li></ul>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${Ms.icon}</span><h2>${esc(Ms.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <p class="lab-hint">${esc(Ms.intro)}</p>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>'
                   : '<button type="button" class="lab-link" data-act="mission-restart">Start the mission again</button>'}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('microscope');
    const all = _discs();
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _intro() {
    const items = _is7() ? `
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first slide, one tap at a time.</li>
          <li><b>Make your own slides.</b> Onion skin, your own cheek cells and a pondweed leaf - with a stain and a cover slip.</li>
          <li><b>Name the parts.</b> Focus at ×400, move the slide and name the nucleus, the cell wall, the vacuole, a chloroplast… Then decide: plant cell or animal cell?</li>
          <li><b>Get it wrong safely.</b> Trap air bubbles, forget the stain, crack a cover slip - you’ll see what happened and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${_discs().length} discoveries to collect.</li>` : `
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first look, one tap at a time.</li>
          <li><b>Look at real blood.</b> Set up the microscope, focus a stained blood smear, go to ×400 and name red cells, white cells and platelets.</li>
          <li><b>Measure and calculate.</b> Use the ruler on a printed drawing to work out a magnification - the paper’s ×15 000 question too.</li>
          <li><b>Get it wrong safely.</b> Crack a slide, forget the units - you’ll see what happened and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${_discs().length} discoveries to collect.</li>`;
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🔬</p>
        <h2 id="lab-ov-title">Welcome to the Microscope</h2>
        <ul class="lab-intro-list">${items}
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${_guides()[0].id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('microscope'); st[_introKey()] = true; Labs.persist();
        _coach('Pick a guided experiment below, or set up the microscope yourself.');
      } });
  }

  function _help() {
    const D = M();
    if (_is7()) {
      Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Microscope works</h2>
      <div class="lab-help">
        <section><h3>The parts of the microscope</h3><ul>${D.PARTS.map(p => `<li><b>${esc(p.name)}</b> - ${esc(p.job)}</li>`).join('')}</ul></section>
        <section><h3>Making a slide</h3><ol class="lab-disc-steps">
          <li>Lay the specimen flat in a drop of water on a clean slide: a thin layer of onion skin, cells from inside your own cheek on a clean cotton bud, or one thin pondweed leaf.</li>
          <li>Add ONE drop of stain: iodine solution for onion skin, methylene blue for cheek cells. A leaf needs none - its chloroplasts are green.</li>
          <li>Lower a cover slip (a thin square of glass) slowly, one edge first, at an angle, so no air bubbles are trapped.</li></ol></section>
        <section><h3>Focusing, in order</h3><ol class="lab-disc-steps">
          <li>Slide on the stage, over the hole; clip it; light on.</li>
          <li>Turn the nosepiece to the LOW-power objective (×4).</li>
          <li>Watching from the SIDE, lower the lens until it is just above the slide.</li>
          <li>Looking through the eyepiece, turn the coarse focus so the lens moves UP, away from the slide, until the image appears.</li>
          <li>Sharpen it with the fine focus.</li>
          <li>Swing in a stronger objective; use ONLY the fine focus at high power.</li></ol></section>
        <section><h3>The parts of a cell</h3><ul>
          ${D.PART_IDS.map(id => { const P = D.CELL_PARTS[id]; return `<li><b>${esc(P.name)}</b>${P.plantOnly ? ' (plant cells only)' : ''} - ${esc(P.look)}. ${esc(P.job)}</li>`; }).join('')}</ul></section>
        <section><h3>Plant cell or animal cell?</h3>
          <p>Both have a cell membrane, cytoplasm and a nucleus. Only plant cells have a cell wall, a large vacuole and - if they get light - chloroplasts.</p>
          <p class="lab-eq">image size = actual size × magnification</p>
          <p class="lab-hint">An onion cell 0.05 mm wide looks 5 mm wide at ×100.</p></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Scrape only your own cheek, with a fresh cotton bud. Used buds go straight into disinfectant; wash your hands.</li>
          <li>Wear goggles with stains, and add one drop at a time.</li>
          <li>Never press on a cover slip. Tell your teacher about broken glass - do not pick it up.</li>
          <li>Never aim the mirror at the Sun - it can damage your eyes.</li>
          <li>Carry the microscope with one hand on the arm and one under the base.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
      return;
    }
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Microscope works</h2>
      <div class="lab-help">
        <section><h3>The parts</h3><ul>${D.PARTS.map(p => `<li><b>${esc(p.name)}</b> - ${esc(p.job)}</li>`).join('')}</ul></section>
        <section><h3>Focusing, in order</h3><ol class="lab-disc-steps">
          <li>Slide on the stage, over the hole; clip it; light on.</li>
          <li>Turn the nosepiece to the LOW-power objective (×4).</li>
          <li>Watching from the SIDE, lower the lens until it is just above the slide.</li>
          <li>Looking through the eyepiece, turn the coarse focus so the lens moves UP, away from the slide, until the image appears.</li>
          <li>Sharpen it with the fine focus.</li>
          <li>Swing in a stronger objective; use ONLY the fine focus at high power.</li></ol></section>
        <section><h3>Magnification</h3>
          <p class="lab-eq">total magnification = eyepiece × objective</p>
          <p class="lab-eq">magnification = image size ÷ actual size</p>
          <p class="lab-eq">actual size = image size ÷ magnification</p>
          <p class="lab-hint">Measure the drawing with a ruler, in mm. Put both lengths in the same unit: 1 mm = 1000 µm. A magnification has no unit.</p></section>
        <section><h3>What is in blood</h3><ul>
          ${D.CELL_IDS.map(id => `<li><b>${esc(D.CELLS[id].name)}</b> (${esc(D.CELLS[id].range)}) - ${esc(D.CELLS[id].look)} ${esc(D.CELLS[id].job)}</li>`).join('')}
          <li><b>Plasma</b> - ${esc(D.PLASMA)}</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Use only prepared, sterile blood slides. Never prick your finger or share a lancet.</li>
          <li>Never aim the mirror at the Sun - it can damage your eyes.</li>
          <li>Start on low power and focus away from the slide, so the lens never cracks it.</li>
          <li>Carry the microscope with one hand on the arm and one under the base.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_s) return;
    const D = M();
    const chips = $('lab-microscope-chips');
    const c = $('lab-contents');
    if (_rig === 'scope') {
      const v = _view();
      const focus = !_s.slide ? 'No slide' : _s.light === 'off' ? 'Light off' : v.dark ? 'Too dark' : D.FOCUS_WORDS[v.focus];
      if (chips) chips.innerHTML = `<span class="lab-chip">🔬 ×${_s.eye} × ×${_s.obj} = <b>×${v.total}</b></span>`
        + `<span class="lab-chip${v.sharp ? ' lab-microscope-ok' : ''}">🎯 ${esc(focus)}</span>`
        + `<span class="lab-chip">${_s.light === 'lamp' ? '💡 Lamp' : _s.light === 'mirror' ? '🪞 Mirror' : '⚫ No light'} <small>${esc(D.DIAPHRAGM[_s.diaph].name.toLowerCase())}</small></span>`;
      if (c) c.textContent = _labels ? 'The parts of a light microscope' : _s.slide
        ? (_g7slide()
          ? `${D.SLIDES[_s.slide].name}${_s.stain ? ' · ' + D.STAINS[_s.stain].name.toLowerCase() : ''} · ${_s.cover ? 'cover slip on' : 'no cover slip'}${_s.clipped ? ' · clipped' : ''}`
          : `${D.SLIDES[_s.slide].name}${_s.clipped ? ' · clipped' : ' · not clipped'} · view enlarged for your screen`)
        : _is7() ? 'Make a slide to begin' : 'Put a slide on the stage to begin';
    } else {
      const f = D.figure(_w.fig);
      const r = _w.ruler ? D.work(f, _w) : null;
      if (chips) chips.innerHTML = `<span class="lab-chip">📏 ${r ? (_w.ruler === 'eye' ? '≈ ' : '') + D.fmt(r.image) + ' mm' : 'Not measured'}</span>`
        + `<span class="lab-chip">${f.mode === 'findM' ? `Actual ${f.actualUm} µm` : `×${D.fmt(f.mag)}`}</span>`
        + (_w.done ? `<span class="lab-chip ${_w.done.correct ? 'lab-microscope-ok' : 'is-danger'}">${esc(_w.done.shown)} ${_w.done.correct ? '✓' : '✗'}</span>` : '');
      if (c) c.textContent = `${f.title} · ${f.blurb}`;
    }
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_still() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done, data: data || {} });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt || !_s) return;
    if (_still()) { _zv = _s.z; _pan = { x: _s.pos.x, y: _s.pos.y }; _rulerT = 1; }
    else {
      const k = Math.min(1, dt * 7);
      _zv += (_s.z - _zv) * k; if (Math.abs(_s.z - _zv) < 0.3) _zv = _s.z;
      _pan.x += (_s.pos.x - _pan.x) * k; if (Math.abs(_s.pos.x - _pan.x) < 0.002) _pan.x = _s.pos.x;
      _pan.y += (_s.pos.y - _pan.y) * k; if (Math.abs(_s.pos.y - _pan.y) < 0.002) _pan.y = _s.pos.y;
      _rulerT = Math.min(1, _rulerT + dt * 2.5);
    }
    if (_hl) { _hl.t -= dt; if (_hl.t <= 0) _hl = null; }
  }

  // ══ Drawing ══════════════════════════════════
  function _draw(dt) {
    if (!_cx || !_s) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((Math.random() - 0.5) * 8 * _shake, (Math.random() - 0.5) * 8 * _shake);
      _shake = Math.max(0, _shake - dt * 1.4);
    }
    if (_rig === 'measure') _drawMeasure();
    else if (_labels) _drawLabels();
    else _drawBench();
    _drawFx(dt);
    c.restore();
  }

  function _bg() {
    const c = _cx;
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
  }

  // The microscope seen from the side, drawn in a 44 × 100 box of `u` units.
  // Returns where each part is, for the labels and the highlight.
  function _scopeShape(ox, oy, u) {
    const c = _cx, D = M(), s = _s;
    const X = x => ox + x * u, Y = y => oy + y * u;
    const body = '#34454E', dark = '#1F2A30', metal = '#B9C4CA';
    const stageY = 62, slideTop = 60.6;
    // base and arm
    c.fillStyle = body;
    c.beginPath(); c.moveTo(X(5), Y(99)); c.lineTo(X(40), Y(99)); c.lineTo(X(38), Y(93)); c.lineTo(X(7), Y(93)); c.closePath(); c.fill();
    c.strokeStyle = body; c.lineWidth = 5 * u; c.lineCap = 'round';
    c.beginPath(); c.moveTo(X(34), Y(93)); c.lineTo(X(34), Y(60)); c.quadraticCurveTo(X(35), Y(34), X(27), Y(28)); c.stroke();
    // light source
    const lit = s.light !== 'off';
    if (s.light === 'mirror') {
      c.fillStyle = dark; c.fillRect(X(18.3), Y(86), 1.4 * u, 7 * u);
      c.save(); c.translate(X(19), Y(84)); c.rotate(-0.35);
      c.fillStyle = metal; c.beginPath(); c.ellipse(0, 0, 5 * u, 1.3 * u, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = dark; c.lineWidth = 1; c.stroke(); c.restore();
    } else {
      c.fillStyle = dark; c.beginPath(); c.ellipse(X(19), Y(92), 4.5 * u, 3 * u, 0, Math.PI, 0); c.fill();
      if (lit) {
        const g = c.createRadialGradient(X(19), Y(90), 1, X(19), Y(90), 7 * u);
        g.addColorStop(0, 'rgba(255,248,200,0.95)'); g.addColorStop(1, 'rgba(255,230,120,0)');
        c.fillStyle = g; c.beginPath(); c.arc(X(19), Y(90), 7 * u, 0, Math.PI * 2); c.fill();
      }
    }
    // the tube assembly, which moves with the focus
    const obj = s.obj;
    const clr = Math.max(0, D.clearance(_zv, obj));
    const gapU = Math.min(20, clr / 10 * 1.15);
    const L = { 4: 6, 10: 8, 40: 11 }[obj];
    const tipY = slideTop - gapU, nY = tipY - L, tubeTop = nY - 3 - 19, eyeTop = tubeTop - 6;
    // light beam up through the slide
    if (lit) {
      const a = Math.min(0.5, 0.12 + D.brightness(s.light, s.diaph, obj) * 0.45);
      c.fillStyle = `rgba(255,236,140,${a})`;
      c.beginPath(); c.moveTo(X(16.5), Y(88)); c.lineTo(X(21.5), Y(88)); c.lineTo(X(20.5), Y(tipY)); c.lineTo(X(17.5), Y(tipY)); c.closePath(); c.fill();
    }
    // diaphragm and stage
    const open = { wide: 2.6, mid: 1.6, narrow: 0.7 }[s.diaph];
    c.fillStyle = dark; c.fillRect(X(13.5), Y(65.5), (5.5 - open) * u, 1.6 * u); c.fillRect(X(19 + open), Y(65.5), (5.5 - open) * u, 1.6 * u);
    c.fillStyle = body; c.fillRect(X(6), Y(stageY), 28.5 * u, 2.4 * u);
    c.fillStyle = _colors.top; c.fillRect(X(17.4), Y(stageY), 3.2 * u, 2.4 * u);
    // slide
    if (s.slide) {
      c.fillStyle = 'rgba(200,230,240,0.9)'; c.strokeStyle = 'rgba(40,80,100,0.7)'; c.lineWidth = 1;
      c.fillRect(X(9), Y(slideTop), 20 * u, 1.4 * u); c.strokeRect(X(9), Y(slideTop), 20 * u, 1.4 * u);
      c.fillStyle = D.SLIDE_TINT[s.slide + (s.stain ? 'Stained' : '')] || D.SLIDE_TINT[s.slide];
      c.fillRect(X(15), Y(slideTop) - 1, 8 * u, 1.5);
      if (s.cover) {
        c.fillStyle = 'rgba(220,238,246,0.95)'; c.strokeStyle = 'rgba(40,80,100,0.6)';
        c.fillRect(X(14), Y(slideTop) - 2.4, 10 * u, 1.2); c.strokeRect(X(14), Y(slideTop) - 2.4, 10 * u, 1.2);
      }
      if (_cracked) {
        c.strokeStyle = '#1B1B1B'; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(X(19), Y(slideTop)); c.lineTo(X(16), Y(slideTop + 1.4)); c.moveTo(X(19), Y(slideTop)); c.lineTo(X(23), Y(slideTop + 1.4));
        c.moveTo(X(19), Y(slideTop)); c.lineTo(X(12.5), Y(slideTop + 0.6)); c.stroke();
      }
    }
    // clips
    c.fillStyle = dark;
    const clipDrop = s.slide && s.clipped ? 0 : 1.2;
    c.fillRect(X(8.5), Y(slideTop - 1 - clipDrop), 4.5 * u, 1 * u); c.fillRect(X(25), Y(slideTop - 1 - clipDrop), 4.5 * u, 1 * u);
    // focus knobs
    c.fillStyle = '#56656D';
    c.beginPath(); c.arc(X(34), Y(50), 4.2 * u, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#7A8990';
    c.beginPath(); c.arc(X(34), Y(57), 2.4 * u, 0, Math.PI * 2); c.fill();
    // rack block joining the arm to the tube
    c.fillStyle = body; c.fillRect(X(22), Y(nY - 16), 5 * u, 10 * u);
    // tube, nosepiece and objectives
    c.fillStyle = '#E8ECEE'; c.strokeStyle = dark; c.lineWidth = 1;
    c.fillRect(X(16), Y(tubeTop), 6 * u, (nY - 3 - tubeTop) * u); c.strokeRect(X(16), Y(tubeTop), 6 * u, (nY - 3 - tubeTop) * u);
    c.fillStyle = dark; c.fillRect(X(17), Y(eyeTop), 4 * u, 6 * u);
    c.fillStyle = metal; c.fillRect(X(16.5), Y(eyeTop) - 1.5, 5 * u, 1.6 * u);
    c.fillStyle = body;
    c.beginPath(); c.moveTo(X(13), Y(nY)); c.lineTo(X(25), Y(nY)); c.lineTo(X(23), Y(nY - 3)); c.lineTo(X(15), Y(nY - 3)); c.closePath(); c.fill();
    D.OBJECTIVES.filter(o => o !== obj).forEach((o, i) => {
      c.save(); c.translate(X(i ? 23.5 : 14.5), Y(nY)); c.rotate(i ? -0.5 : 0.5);
      c.fillStyle = metal; c.fillRect(-1.2 * u, 0, 2.4 * u, 4 * u);
      c.fillStyle = D.OBJ[o].band; c.fillRect(-1.2 * u, 1.4 * u, 2.4 * u, 0.7 * u); c.restore();
    });
    c.fillStyle = metal; c.fillRect(X(17.2), Y(nY), 3.6 * u, L * u);
    c.fillStyle = D.OBJ[obj].band; c.fillRect(X(17.2), Y(nY + 1.5), 3.6 * u, 0.9 * u);
    c.fillStyle = dark; c.fillRect(X(17.9), Y(tipY - 0.8), 2.2 * u, 0.8 * u);
    return {
      eyepiece: [X(19), Y(eyeTop + 2)], tube: [X(19), Y((tubeTop + nY - 3) / 2)], nosepiece: [X(19), Y(nY - 1.5)],
      objective: [X(19), Y(tipY - L / 2)], stage: [X(8), Y(stageY + 1.2)], clips: [X(10.5), Y(slideTop - 1.4)],
      diaphragm: [X(19), Y(66.3)], light: [X(19), Y(s.light === 'mirror' ? 84 : 90)], coarse: [X(34), Y(50)],
      fine: [X(34), Y(57)], arm: [X(35), Y(76)], base: [X(22), Y(96)],
    };
  }

  function _drawBench() {
    const c = _cx, D = M();
    _bg();
    c.fillStyle = _colors.bench; c.fillRect(-12, _H - 14, _W + 24, 26);
    const u = Math.min((_H - 24) / 100, (_W * 0.4) / 44);
    const at = _scopeShape(6, 6, u);
    if (_hl && at[_hl.part]) {
      const [x, y] = at[_hl.part], P = D.PARTS.find(p => p.id === _hl.part);
      const a = Math.min(1, _hl.t);
      c.strokeStyle = `rgba(228,161,27,${0.9 * a})`; c.lineWidth = 3;
      c.beginPath(); c.arc(x, y, 5.5 * u, 0, Math.PI * 2); c.stroke();
      if (P) {
        c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'left';
        // Kept left of the eyepiece view, which starts at 44u + 12.
        const tw = c.measureText(P.name).width + 8, tx = Math.max(2, Math.min(x + 6 * u, 44 * u + 6 - tw)), ty = Math.max(12, y - 7 * u);
        c.fillStyle = `rgba(255,255,255,${0.92 * a})`; c.fillRect(tx, ty - 10, tw, 14);
        c.fillStyle = `rgba(20,33,29,${a})`; c.fillText(P.name, tx + 4, ty);
      }
    }
    // The view sits below the readout chips, which run along the top right.
    const x0 = 44 * u + 12;
    const r = Math.max(60, Math.min((_W - x0) / 2 - 8, _H / 2 - 30));
    const cx = x0 + (_W - x0) / 2, cy = _H / 2 + 8;
    _drawView(cx, cy, r);
  }

  function _drawLabels() {
    const c = _cx, D = M();
    _bg();
    const left = ['eyepiece', 'tube', 'nosepiece', 'objective', 'clips', 'stage', 'diaphragm', 'light'];
    const right = ['arm', 'coarse', 'fine', 'base'];
    // Size the microscope to whatever room the longest labels leave, so no
    // label runs off either edge of a phone.
    c.font = `700 ${_W < 380 ? 9.5 : 10.5}px system-ui, sans-serif`;
    const widest = ids => Math.max(...ids.map(id => c.measureText(D.PARTS.find(p => p.id === id).name).width));
    const lw = widest(left) + 14, rw = widest(right) + 14;
    const u = Math.max(1.2, Math.min((_H - 20) / 100, (_W - lw - rw - 8) / 44));
    const ox = lw + Math.max(0, (_W - lw - rw - 44 * u) / 2), oy = 8;
    const at = _scopeShape(ox, oy, u);
    const put = (ids, side) => ids.forEach((id, i) => {
      const P = D.PARTS.find(p => p.id === id), [x, y] = at[id];
      const ly = side === 'left' ? 16 + i * ((_H - 30) / (ids.length - 1)) : _H * 0.3 + i * (_H * 0.6 / (ids.length - 1));
      const lx = side === 'left' ? ox - 6 : ox + 42 * u + 6;
      c.strokeStyle = _colors.ink; c.lineWidth = 1;
      c.beginPath(); c.moveTo(lx, ly); c.lineTo(x, y); c.stroke();
      c.fillStyle = _colors.ink; c.textAlign = side === 'left' ? 'right' : 'left';
      c.fillText(P.name, side === 'left' ? lx - 2 : lx + 2, ly + 3);
    });
    put(left, 'left'); put(right, 'right');
  }

  // The eyepiece view: the smear, blurred by how far the lens is from focus,
  // dimmed by the light, with the eyepiece pointer across it.
  function _drawView(cx, cy, r) {
    const c = _cx, D = M(), s = _s;
    c.save();
    c.fillStyle = '#0C1114';
    c.beginPath(); c.arc(cx, cy, r + 5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.clip();
    const bright = D.brightness(s.light, s.diaph, s.obj);
    if (!s.slide || s.light === 'off') {
      c.fillStyle = s.light === 'off' ? '#07090A' : `rgba(255,250,235,${Math.min(1, 0.3 + bright)})`;
      c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
    } else {
      const img = _fieldImage(Math.round(2 * r));
      if (img) c.drawImage(img, cx - r, cy - r, 2 * r, 2 * r);
      // Full brightness from a half-open diaphragm at ×400 up; below the data's
      // "too dark" line the view is nearly black.
      const b = Math.max(0, Math.min(1, (bright - 0.08) / 0.16));
      c.fillStyle = `rgba(0,0,0,${(1 - b) * 0.92})`;
      c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
    }
    if (_cracked) {
      c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(cx - r * 0.1, cy - r); c.lineTo(cx + r * 0.1, cy - r * 0.2); c.lineTo(cx - r * 0.3, cy + r * 0.3); c.lineTo(cx - r * 0.1, cy + r);
      c.moveTo(cx + r * 0.1, cy - r * 0.2); c.lineTo(cx + r, cy + r * 0.15); c.stroke();
    }
    // pointer from the left edge to the centre
    c.fillStyle = '#111';
    c.beginPath(); c.moveTo(cx - r - 2, cy - 2); c.lineTo(cx - 3, cy - 0.6); c.lineTo(cx - 3, cy + 0.6); c.lineTo(cx - r - 2, cy + 2); c.closePath(); c.fill();
    c.restore();
  }

  // The smear under the lens, rendered off screen and cached; blur is a cheap
  // downscale-and-stretch, which every browser can do (ctx.filter is not in Safari).
  function _fieldImage(size) {
    const D = M(), s = _s;
    const q = D.blur(_zv, s.obj);
    const k = q >= 3 ? 18 : 1 + Math.min(12, q * 4);
    const key = [size, s.slide, s.stain || '', s.cover || '', s.eye, s.obj, _pan.x.toFixed(3), _pan.y.toFixed(3), k.toFixed(2)].join('|');
    if (_vc && _vcKey === key) return _vc;
    if (!_vc) { _vc = document.createElement('canvas'); _vcSmall = document.createElement('canvas'); }
    _vc.width = size; _vc.height = size;
    const small = Math.max(8, Math.round(size / k));
    _vcSmall.width = small; _vcSmall.height = small;
    const g = _vcSmall.getContext('2d');
    _paintField(g, small);
    const v = _vc.getContext('2d');
    v.imageSmoothingEnabled = true;
    v.clearRect(0, 0, size, size);
    v.drawImage(_vcSmall, 0, 0, size, size);
    _vcKey = key;
    return _vc;
  }

  // Grade 7 tissue, drawn from the SAME geometry (LabMicroscopeData.partAt)
  // that decides which part is under the pointer. The image is inverted like
  // the blood smear: a point right of the pointer on the slide is drawn left.
  function _paintTissue(g, size) {
    const D = M(), s = _s, C = D.COLOURS_G7, v = _view();
    const px = size / D.viewUmG7(s.eye, s.obj);
    const P = D.G7_POINTS[s.slide];
    const cxu = P.o[0] + _pan.x * P.dx, cyu = P.o[1] + _pan.y * P.dy, half = size / 2 / px;
    const X = x => size / 2 - (x - cxu) * px, Y = y => size / 2 - (y - cyu) * px;
    if (s.slide === 'cheek') {
      const col = v.stained ? C.cheek : C.cheekPlain, T = D.CHEEK_TILE;
      g.fillStyle = col.bg; g.fillRect(0, 0, size, size);
      for (let tx = Math.floor((cxu - half) / T) - 1; tx <= Math.ceil((cxu + half) / T) + 1; tx++) {
        for (let ty = Math.floor((cyu - half) / T) - 1; ty <= Math.ceil((cyu + half) / T) + 1; ty++) {
          D.CHEEK.forEach(c => {
            const ox = tx * T + c.x, oy = ty * T + c.y;
            if (Math.abs(ox - cxu) > half + 45 || Math.abs(oy - cyu) > half + 45) return;
            g.beginPath();
            for (let k = 0; k <= 48; k++) {
              const th = k / 48 * Math.PI * 2, rr = D.cheekR(c, th);
              const x = X(ox + Math.cos(th) * rr), y = Y(oy + Math.sin(th) * rr);
              if (k) g.lineTo(x, y); else g.moveTo(x, y);
            }
            g.closePath(); g.fillStyle = col.cyto; g.fill();
            g.strokeStyle = col.mem; g.lineWidth = Math.max(0.6, D.CHEEK_MEM * px * 0.8); g.stroke();
            g.fillStyle = col.nuc; g.beginPath(); g.arc(X(ox + c.nx), Y(oy + c.ny), Math.max(0.6, D.CHEEK_NUC * px), 0, Math.PI * 2); g.fill();
          });
        }
      }
    } else {
      const T = D.TISSUE[s.slide], leaf = s.slide === 'leaf';
      const col = leaf ? C.leaf : v.stained ? C.onion : C.onionPlain;
      const dots = leaf && T.chlR * px >= 0.5;
      g.fillStyle = col.wall; g.fillRect(0, 0, size, size);
      const r0 = Math.floor((cyu - half) / T.h) - 1, r1 = Math.ceil((cyu + half) / T.h) + 1;
      for (let r = r0; r <= r1; r++) {
        const off = (r & 1) ? T.w / 2 : 0;
        const i0 = Math.floor((cxu - half - off) / T.w) - 1, i1 = Math.ceil((cxu + half - off) / T.w) + 1;
        for (let i = i0; i <= i1; i++) {
          const x0 = off + i * T.w, y0 = r * T.h;
          const rect = (a, w) => {
            const xa = X(x0 + a), xb = X(x0 + T.w - a), ya = Y(y0 + a), yb = Y(y0 + T.h - a);
            g.fillRect(Math.min(xa, xb), Math.min(ya, yb), Math.abs(xb - xa), Math.abs(yb - ya));
          };
          g.fillStyle = leaf && !dots ? '#79B25C' : col.cyto; rect(T.wall);
          g.fillStyle = col.vac; rect(T.band);
          if (dots) {
            g.fillStyle = col.chl;
            D.leafChloros(i, r).forEach(p => { g.beginPath(); g.arc(X(x0 + p.x), Y(y0 + p.y), T.chlR * px, 0, Math.PI * 2); g.fill(); });
          } else if (!leaf) {
            const n = D.onionNucleus(i, r);
            g.fillStyle = col.nuc; g.beginPath(); g.arc(X(x0 + n.x), Y(y0 + n.y), T.nucR * px, 0, Math.PI * 2); g.fill();
          }
        }
      }
    }
    if (v.bubbles) {
      D.BUBBLES.forEach(b => {
        g.fillStyle = C.bubble.fill; g.beginPath(); g.arc(X(b.x), Y(b.y), b.R * px, 0, Math.PI * 2); g.fill();
        g.strokeStyle = C.bubble.rim; g.lineWidth = Math.max(1, b.R * px * 0.18); g.stroke();
      });
    }
  }

  function _paintField(g, size) {
    const D = M(), s = _s;
    if (D.SLIDES[s.slide].g7) { _paintTissue(g, size); return; }
    const col = D.COLOURS[D.SLIDES[s.slide].stained ? 'stained' : 'unstained'];
    g.fillStyle = col.bg; g.fillRect(0, 0, size, size);
    const px = size / D.viewUm(s.eye, s.obj);          // pixels per µm
    const F = D.FIELD_UM, half = size / 2 / px;
    const cxu = _pan.x * F, cyu = _pan.y * F;
    const f0x = Math.floor((cxu - half) / F) - 1, f1x = Math.ceil((cxu + half) / F) + 1;
    const f0y = Math.floor((cyu - half) / F) - 1, f1y = Math.ceil((cyu + half) / F) + 1;
    for (let fx = f0x; fx <= f1x; fx++) for (let fy = f0y; fy <= f1y; fy++) {
      const key = fx + ',' + fy;
      if (!_cellsMemo.has(key)) _cellsMemo.set(key, D.fieldCells(fx, fy));
      _cellsMemo.get(key).forEach(cell => {
        // The microscope inverts the image: an offset on the slide appears the other way round.
        const x = size / 2 - (fx * F + cell.x - cxu) * px, y = size / 2 - (fy * F + cell.y - cyu) * px;
        const rr = D.CELLS[cell.type].sizeUm / 2 * px;
        if (x < -rr - 2 || y < -rr - 2 || x > size + rr + 2 || y > size + rr + 2) return;
        _paintCell(g, cell, x, y, rr, col);
      });
    }
  }

  function _paintCell(g, cell, x, y, rr, col) {
    if (rr < 1.6) {
      g.fillStyle = cell.type === 'rbc' ? col.rbc : cell.type === 'platelet' ? col.platelet : col.nucleus;
      const d = Math.max(1, rr * 2);
      g.fillRect(x - d / 2, y - d / 2, d, d);
      return;
    }
    switch (cell.type) {
      case 'rbc': {
        g.fillStyle = col.rbcEdge; g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.fill();
        g.fillStyle = col.rbc; g.beginPath(); g.arc(x, y, rr * 0.86, 0, Math.PI * 2); g.fill();
        g.fillStyle = col.rbcMid; g.beginPath(); g.arc(x, y, rr * 0.42, 0, Math.PI * 2); g.fill();
        break;
      }
      case 'phago': {
        g.fillStyle = col.cyto; g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.fill();
        g.fillStyle = col.grain;
        for (let i = 0; i < 9; i++) { const a = cell.rot + i * 0.7, d = rr * (0.55 + 0.35 * ((i * 37) % 10) / 10); g.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.max(1, rr * 0.06), Math.max(1, rr * 0.06)); }
        g.fillStyle = col.nucleus;
        [[-0.38, -0.08, 0.28], [0, 0.2, 0.3], [0.36, -0.1, 0.26]].forEach(([ox, oy, rs]) => {
          const ca = Math.cos(cell.rot), sa = Math.sin(cell.rot);
          g.beginPath(); g.arc(x + (ox * ca - oy * sa) * rr, y + (ox * sa + oy * ca) * rr, rs * rr, 0, Math.PI * 2); g.fill();
        });
        break;
      }
      case 'lympho': {
        g.fillStyle = col.lymCyto; g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2); g.fill();
        g.fillStyle = col.lymNuc; g.beginPath(); g.arc(x + rr * 0.06, y - rr * 0.03, rr * 0.8, 0, Math.PI * 2); g.fill();
        break;
      }
      default: {
        // Never wider than the platelet's own width: the printed one is measured.
        const r2 = Math.max(1.2, rr);
        g.fillStyle = col.platelet;
        g.beginPath(); g.ellipse(x, y, r2, r2 * 0.7, cell.rot, 0, Math.PI * 2); g.fill();
        g.fillStyle = col.nucleus;
        g.beginPath(); g.arc(x + r2 * 0.3, y + r2 * 0.12, r2 * 0.22, 0, Math.PI * 2); g.fill();
        g.beginPath(); g.arc(x - r2 * 0.35, y - r2 * 0.1, r2 * 0.16, 0, Math.PI * 2); g.fill();
      }
    }
  }

  // The printed page, the drawing and the ruler, drawn to one scale.
  function _drawMeasure() {
    const c = _cx, D = M();
    const f = D.figure(_w.fig), rl = D.rulerLen(f);
    _bg();
    c.fillStyle = '#FFFFFF'; c.strokeStyle = 'rgba(0,0,0,0.15)'; c.lineWidth = 1;
    c.fillRect(8, 8, _W - 16, _H - 16); c.strokeRect(8, 8, _W - 16, _H - 16);
    c.fillStyle = '#1B2622'; c.font = '700 11px system-ui, sans-serif'; c.textAlign = 'left';
    c.fillText(`Figure: ${f.title.toLowerCase()}`, 18, 52);
    c.font = '600 10px system-ui, sans-serif'; c.fillStyle = '#56665F';
    c.fillText(f.mode === 'findM' ? `Actual width: ${f.actualUm} µm` : `Magnification ×${D.fmt(f.mag)}`, 18, 66);
    const s = Math.min((_W - 48) / rl, (_H * 0.4) / f.imageMm);   // px per mm on this page
    const x0 = (_W - rl * s) / 2;
    const rad = f.imageMm * s / 2, cx = x0 + rad, cy = 76 + rad;
    const col = D.COLOURS.stained;
    _paintCell(c, { type: f.cell, rot: 0 }, cx, cy, rad, col);
    c.strokeStyle = 'rgba(0,0,0,0.55)'; c.lineWidth = 1.4;
    c.beginPath();
    if (f.cell === 'platelet') c.ellipse(cx, cy, rad, rad * 0.7, 0, 0, Math.PI * 2); else c.arc(cx, cy, rad, 0, Math.PI * 2);
    c.stroke();
    // the ruler
    const w = _w;
    if (w.ruler === 'eye') {
      c.strokeStyle = '#A85B0B'; c.setLineDash([4, 4]); c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(cx - rad, cy - rad - 6); c.lineTo(cx + rad, cy - rad - 6); c.stroke(); c.setLineDash([]);
      c.fillStyle = '#A85B0B'; c.font = '700 11px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText(`≈ ${D.fmt(f.eyeMm)} mm?`, cx, cy + rad + 16);
    } else if (w.ruler) {
      const len = w.ruler === 'inner' ? f.innerMm : f.imageMm;
      const start = cx - len * s / 2;
      const t = _rulerT, rh = 24;
      const ry = cy + (1 - t) * (_H - cy);
      c.fillStyle = 'rgba(247,214,120,0.86)'; c.strokeStyle = 'rgba(120,90,20,0.8)'; c.lineWidth = 1;
      const rx = start - 4;
      c.fillRect(rx, ry, rl * s + 8, rh); c.strokeRect(rx, ry, rl * s + 8, rh);
      c.strokeStyle = '#3A2A08'; c.fillStyle = '#3A2A08'; c.font = '600 8px system-ui, sans-serif'; c.textAlign = 'center';
      for (let mm = 0; mm <= rl; mm++) {
        const x = start + mm * s;
        const h = mm % 10 === 0 ? 11 : mm % 5 === 0 ? 7 : 4;
        c.globalAlpha = s < 2.5 && mm % 5 ? 0.45 : 1;
        c.beginPath(); c.moveTo(x, ry); c.lineTo(x, ry + h); c.stroke();
        c.globalAlpha = 1;
        if (mm % 10 === 0) c.fillText(String(mm / 10), x, ry + 20);
      }
      c.textAlign = 'right'; c.fillText('cm', rx - 3, ry + 20);
      if (t >= 1) {
        const xe = start + len * s;
        c.strokeStyle = '#C0262D'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(start, ry - 3); c.lineTo(start, ry + rh); c.moveTo(xe, ry - 3); c.lineTo(xe, ry + rh); c.stroke();
        c.fillStyle = '#C0262D'; c.font = '700 11px system-ui, sans-serif'; c.textAlign = 'center';
        c.fillText(`${D.fmt(len)} mm`, (start + xe) / 2, ry + rh + 13);
      }
    }
    // the working
    const lines = D.workLines(f, w);
    const done = w.done;
    c.font = '600 11px ui-monospace, Consolas, monospace'; c.textAlign = 'left';
    let y = Math.min(_H - 30 - (lines.length + (done ? 1 : 0)) * 15, cy + rad + 44);
    lines.forEach(l => { c.fillStyle = '#1B2622'; _fitText(l, 18, y, _W - 36); y += 15; });
    if (done) { c.fillStyle = done.correct ? '#23734A' : '#C0262D'; c.font = '800 12px system-ui, sans-serif'; _fitText(`Answer: ${done.shown} ${done.correct ? '✓' : '✗'}`, 18, y, _W - 36); }
  }
  function _fitText(t, x, y, max) {
    const c = _cx;
    const w = c.measureText(t).width;
    if (w <= max) { c.fillText(t, x, y); return; }
    c.save(); c.translate(x, y); c.scale(max / w, 1); c.fillText(t, 0, 0); c.restore();
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'crack':
          _shake = Math.max(_shake, 0.8 * (1 - k));
          c.fillStyle = `rgba(255,255,255,${0.35 * Math.sin(Math.PI * Math.min(1, k * 2))})`; c.fillRect(0, 0, _W, _H);
          c.fillStyle = '#C0262D'; c.font = '800 20px system-ui, sans-serif'; c.textAlign = 'center';
          if (k > 0.2) c.fillText('CRACK!', _W * 0.22, _H * 0.18);
          break;
        case 'glare': {
          const a = Math.sin(Math.PI * k);
          const g = c.createRadialGradient(_W * 0.7, _H * 0.5, 2, _W * 0.7, _H * 0.5, _W * 0.7);
          g.addColorStop(0, `rgba(255,255,245,${a})`); g.addColorStop(0.5, `rgba(255,240,170,${0.8 * a})`); g.addColorStop(1, `rgba(255,220,120,${0.3 * a})`);
          c.fillStyle = g; c.fillRect(0, 0, _W, _H);
          c.font = '30px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText('☀️', _W * 0.12 + k * _W * 0.1, _H * 0.14);
          break;
        }
        case 'drop': {
          const x = _W * 0.7, y = _H * 0.45;
          c.font = '38px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText('☝️', x, y + 34);
          c.save(); c.translate(x + 40 - k * 30, y - 30 + k * 18); c.rotate(-0.8);
          c.fillStyle = '#9AA6AC'; c.fillRect(-2, -26, 4, 26); c.fillStyle = '#3A77C2'; c.fillRect(-4, -40, 8, 16); c.restore();
          if (k > 0.55) {
            c.fillStyle = '#B3202E'; c.beginPath(); c.arc(x, y - 6, 5 + 3 * (k - 0.55), 0, Math.PI * 2); c.fill();
            c.strokeStyle = '#C0262D'; c.lineWidth = 5; c.lineCap = 'round';
            c.beginPath(); c.moveTo(x - 36, y - 40); c.lineTo(x + 36, y + 36); c.moveTo(x + 36, y - 40); c.lineTo(x - 36, y + 36); c.stroke();
          }
          break;
        }
        case 'slip': {
          // The cover slip falls flat onto the drop, and rings of trapped air appear.
          const x = _W * 0.7, y = _H * 0.5, yy = y - 60 * (1 - Math.min(1, k * 1.6));
          c.fillStyle = 'rgba(200,230,245,0.9)'; c.strokeStyle = '#2A4A5A'; c.lineWidth = 1;
          c.fillRect(x - 40, yy - 3, 80, 6); c.strokeRect(x - 40, yy - 3, 80, 6);
          if (k > 0.6) {
            c.strokeStyle = '#1F2327'; c.lineWidth = 2.5;
            [[-22, 20, 8], [6, 28, 12], [26, 16, 6]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx, y + dy, r * (k - 0.5) * 2, 0, Math.PI * 2); c.stroke(); });
          }
          break;
        }
        case 'germs': {
          c.font = '30px system-ui, sans-serif'; c.textAlign = 'center';
          c.globalAlpha = Math.sin(Math.PI * k);
          for (let i = 0; i < 3; i++) c.fillText('🦠', _W * (0.56 + 0.14 * i), _H * 0.42 + Math.sin(k * 6 + i * 2) * 10);
          c.globalAlpha = 1;
          break;
        }
        case 'splash': {
          const x = _W * 0.7, y = _H * 0.4;
          c.fillStyle = `rgba(150,80,20,${0.9 * (1 - k * 0.5)})`;
          for (let i = 0; i < 9; i++) { const a = i * 0.7, d = 10 + k * 50; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7, 4 - (i % 3), 0, Math.PI * 2); c.fill(); }
          c.font = '30px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('💦', x, y);
          break;
        }
        case 'stamp': {
          c.fillStyle = `rgba(192,38,45,${0.8 * k})`; c.font = `800 ${Math.round(60 - 20 * k)}px system-ui, sans-serif`; c.textAlign = 'center';
          c.fillText('✗', _W * 0.82, _H * 0.3);
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
    _step(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); if (_instant && _s) _snap(); }
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let i = 0; i < n; i++) { _step(0.05); _drawFx(0.05); }
    _readouts();
  }
  function _debug() {
    const s = _s || _newScope(), w = _w || _newSheet();
    const v = M().view(s);
    return { rig: _rig, busy: _busy, panel: _panel, labels: _labels, cracked: _cracked, grade: _g(),
             scope: { slide: s.slide, clipped: s.clipped, light: s.light, diaph: s.diaph, eye: s.eye, obj: s.obj, z: s.z, zv: _zv, pos: { x: s.pos.x, y: s.pos.y },
                      stain: s.stain, cover: s.cover, lowSeen: s.lowSeen },
             view: { total: v.total, focus: v.focus, sharp: v.sharp, dark: v.dark, visible: v.visible, under: v.under, covered: v.covered, stained: v.stained, bubbles: v.bubbles },
             sheet: { fig: w.fig, ruler: w.ruler, converted: w.converted, op: w.op, done: w.done && { shown: w.done.shown, correct: w.done.correct, error: w.done.error } },
             ids: _ids.map(x => x.cell), drawings: _drawings.length, calcs: _calcs.length,
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, errors: _mission.errors, success: _mission.success, found: Object.keys(_mission.found), done: Object.keys(_mission.done), lowFirst: _mission.lowFirst },
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, set: _set, act: _do,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMicroscope = LabMicroscope;
