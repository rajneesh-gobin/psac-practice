'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Circuit Board (Physics, NCE Grade 9, P5 Electricity)
//
//  A board of 4 × 3 connection points. Pick a part (wire, cell, bulb, switch,
//  ammeter, voltmeter, resistor, fuse) and tap a space between two points to
//  place it; ✋ opens and closes switches, unscrews bulbs and turns cells
//  round. Close the switch and the charge flows. Picture view or circuit-
//  diagram view with standard symbols. Sandbox, guided experiments, two
//  Missions and a collection of Discoveries.
//
//  ⚠ Every current, voltage, brightness and fault comes from
//    lab_circuit_data.js (LabCircuitData.solve). This file draws it. If a bulb
//    looks wrong on screen, fix the DATA, not the drawing.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ The spaces on the board are real <button>s laid over the canvas, so a tap,
//    a keyboard and a screen reader all place parts the same way. Drag (a part
//    from the palette onto a space) is for mouse and pen only.
//  ⚠ Calm Mode and reduced motion: the circuit is still solved and drawn, the
//    charge dots stand still, effects apply at once.
//  ⚠ FOUR LEVELS: Labs.grade() is 4, 6, 7 or 9, and only that grade's guides,
//    missions and discoveries show (LAB_SPEC §9). Grades 4 and 6 get simpler
//    words, read-aloud 🔊, things to test in a gap (conductors / insulators)
//    and the ⚠️ "Would it be safe?" row; meters, resistors and fuses are
//    Grade 7 and 9 only. Grade 7 (NCE, g7s-electricity) is about the parts and
//    their standard symbols, series and parallel, where each meter goes and
//    cells adding up - it has the ⚠️ row too, and NO Q = It, W = QV or V = IR
//    arithmetic (that is Grade 9). Its discoveries, like the primary ones, are
//    unlocked by facts worked out in the data file. Everything Grade 9 does is
//    unchanged.
// ══════════════════════════════════════════════
const LabCircuit = (() => {
  const D = () => LabCircuitData;
  const FRAME_MS = 1000 / 30;
  const FX_DUR = { short: 1.2, pop: 0.8, fuse: 0.8, zap: 1.0 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const f2 = x => (Math.round(x * 100) / 100).toFixed(2);
  const f1 = x => (Math.round(x * 10) / 10).toFixed(1);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _layout = {}, _sol = null, _view = 'picture', _tool = 'hand', _t = 0;
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _log = [], _readings = [], _fx = [], _busy = false, _instant = false;
  let _tipIdx = -1, _undo = [], _hadGap = false, _vmSeen = false, _drag = null, _suppressClick = false;
  let _talking = false, _obs = null, _lastGrade = null;
  let _tests = {}, _gapPrev = false, _gapFilled = false, _warm = false;   // Grades 4 and 6 only

  // ── The grade the board is being used at ──
  // Labs.grade() is 4, 6 or 9; a grade this lab has no level for is 9.
  const _g = () => {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 9;
    return D().GRADES.includes(g) ? g : 9;
  };
  const _primary = () => _g() <= 6;
  const _is7 = () => _g() === 7;
  // Grades 4, 6 and 7 unlock discoveries by the facts the data file works out.
  const _byFacts = () => _g() !== 9;
  const _mine = list => D().forGrade(list, _g());
  const _discs = () => _mine(D().DISCOVERIES);
  // A grade has its own wording for some cards: short_circuit → short_circuit_p
  // (Grades 4/6) or g7_short_circuit (Grade 7).
  const _cid = base => {
    const H = D().HAZARDS, R = D().RESULTS;
    if (_is7()) return H['g7_' + base] || R['g7_' + base] ? 'g7_' + base : base;
    return _primary() && (H[base + '_p'] || R[base + '_p']) ? base + '_p' : base;
  };
  const _job = k => (_primary() && D().JOBS_P[k]) || (_is7() && D().JOBS_7[k]) || D().KINDS[k].job;
  const _lc = k => D().KINDS[k].name.toLowerCase();
  // The first-visit welcome is shown once per grade.
  const _introKey = () => (_g() === 9 ? 'intro' : 'intro' + _g());
  // The same rule as Labs' own cards: PSAC up to Grade 6, the NCE paper at 9.
  const _examHead = () => (_g() <= 6 ? '📝 In the PSAC exam' : _g() >= 9 ? '📝 On the NCE paper' : '📝 In your exams');

  const TOOL_INFO = {
    hand:   { icon: '✋', name: 'Hand', meta: 'Switch, unscrew, turn round' },
    eraser: { icon: '🧽', name: 'Remove', meta: 'Take a part off' },
  };
  const toolName = t => (TOOL_INFO[t] || D().KINDS[t] || {}).name || t;

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    const g = _g(), P = g <= 6;
    return `<div class="lab lab-circuit${P ? ' is-primary' : ''}">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${g === 9 ? 'Physics' : 'Science'} · Grade ${g}</span><h1>Circuit Board</h1></div>
        <div class="lab-top-actions">
          ${D().symbolsFor(g) ? '<button type="button" id="lab-circuit-view" class="lab-circuit-viewbtn" data-act="view" aria-pressed="false"><span aria-hidden="true" id="lab-circuit-view-ico">✏️</span><span id="lab-circuit-view-label">Symbols</span></button>' : ''}
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the board works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap lab-circuit-wrap" id="lab-circuit-zone">
            <canvas id="lab-circuit-canvas" role="img" aria-label="A circuit board"></canvas>
            <div class="lab-circuit-slots" id="lab-circuit-slots"></div>
            <div class="lab-chip lab-circuit-chip" id="lab-circuit-chip"></div>
            <div class="lab-circuit-status" id="lab-circuit-status"></div>
            <div class="lab-contents lab-circuit-contents" id="lab-circuit-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            ${P ? '<button type="button" class="lab-coach-tip lab-circuit-say" data-act="say-coach" aria-label="Read this aloud">🔊</button>' : ''}
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div class="lab-task-strip">Build a circuit: connect the components and check if the bulb lights up.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-circuit-palette" class="lab-circuit-palette-wrap"></div>
          <div class="lab-tools lab-circuit-actions${P ? ' is-two' : ''}">
            ${P ? '' : '<button type="button" class="lab-tool" data-act="read"><span aria-hidden="true">📝</span>Take a reading</button>'}
            <button type="button" class="lab-tool" data-act="undo"><span aria-hidden="true">↩️</span>Undo</button>
            <button type="button" class="lab-tool" data-act="clear"><span aria-hidden="true">🗑️</span>Clear the board</button>
          </div>
          ${P || g === 7 ? `<section class="lab-circuit-safety" aria-label="Would it be safe?">
            <p class="lab-hint"><b>⚠️ Would it be safe?</b> Tap one to see what would happen.</p>
            <div class="lab-tools lab-circuit-actions">
              <button type="button" class="lab-tool" data-act="mains"><span aria-hidden="true">🔌</span>Wall socket</button>
              <button type="button" class="lab-tool" data-act="wet"><span aria-hidden="true">💧</span>Wet hands</button>
              <button type="button" class="lab-tool" data-act="cable"><span aria-hidden="true">✂️</span>Split cable</button>
            </div></section>` : ''}
        </div>
        <div class="lab-side">
          <div class="lab-tabs" role="tablist" aria-label="Bench, missions and discoveries">
            <button type="button" role="tab" data-panel="sandbox">⚡ Bench</button>
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
    // ⚠ The board, a mission and a guide survive leaving the lab - but not a
    //   change of grade: a Grade 9 ammeter has no place on a Grade 4 bench.
    const g = _g();
    if (_lastGrade !== null && _lastGrade !== g) {
      _layout = {}; _undo = []; _readings = []; _log = []; _tests = {}; _fx = []; _t = 0;
      _mission = null; _guide = null; _tool = 'hand'; _panel = 'sandbox'; _busy = false;
    }
    _lastGrade = g;
    if (!D().symbolsFor(g)) _view = 'picture';
    root.innerHTML = _shellHTML();
    _cv = $('lab-circuit-canvas');
    _cx = _cv.getContext('2d');
    _sol = D().solve(_layout);
    _buildSlots();
    _resize();
    _wire();
    _renderPalette();
    _renderPanel();
    _syncView();
    _paint();
    const st = Labs.store('circuit');
    if (!st[_introKey()]) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick a guided experiment or a mission below - or build your own circuit.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    // ⚠ Leaving the Labs screen must stop speech at once, and coming back must
    //   restart the loop: once the loop sees it is off-screen it stops for good
    //   (the Rusting Lab measured both).
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
    _drag = null;
    _root = null; _cv = null; _cx = null;
  }

  function _geom() {
    const C = D(), mx = Math.max(34, Math.round(_W * 0.09)), top = 76, bot = 56;
    const gx = (_W - 2 * mx) / (C.COLS - 1), gy = (_H - top - bot) / (C.ROWS - 1);
    return { gx, gy, pt: n => [mx + (n % C.COLS) * gx, top + Math.floor(n / C.COLS) * gy] };
  }
  function _slotMid(g, s) { const a = g.pt(s.a), b = g.pt(s.b); return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(260, wrap.clientWidth || 320);
    const h = Math.round(Math.min(440, Math.max(316, w * 0.9)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    _cv.width = Math.round(w * dpr); _cv.height = Math.round(h * dpr);
    _cv.style.height = h + 'px';
    _W = w; _H = h;
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = _geom(), box = $('lab-circuit-slots');
    if (box) box.querySelectorAll('[data-slot]').forEach(b => {
      const m = _slotMid(g, D().SLOTS[b.dataset.slot]);
      b.style.left = m[0] + 'px'; b.style.top = m[1] + 'px';
    });
    _draw(0);
  }

  // One real button per space on the board, laid over the canvas.
  function _buildSlots() {
    const box = $('lab-circuit-slots');
    if (!box) return;
    box.innerHTML = Object.keys(D().SLOTS).map(id => `<button type="button" class="lab-circuit-slot" data-slot="${id}"></button>`).join('');
  }

  // ══ Events ═══════════════════════════════════
  function _wire() {
    _root.onclick = e => {
      if (_suppressClick) { _suppressClick = false; return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act); return; }
      const sl = e.target.closest('[data-slot]');
      if (sl) { tapSlot(sl.dataset.slot); return; }
      const tl = e.target.closest('[data-tool]');
      if (tl) { setTool(tl.dataset.tool); if (tl.closest('#lab-panel')) _showStage(); return; }
      const bd = e.target.closest('[data-build]');
      if (bd) { build(bd.dataset.build); _showStage(); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
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
    _root.onpointerdown = e => {
      const item = e.target.closest('#lab-circuit-palette [data-tool]');
      if (!item || e.pointerType === 'touch' || e.button !== 0) return;
      const t = item.dataset.tool;
      if (!D().KINDS[t]) return;
      _drag = { tool: t, x: e.clientX, y: e.clientY, id: e.pointerId, ghost: null };
      window.addEventListener('pointermove', _onMove);
      window.addEventListener('pointerup', _onUp, { once: true });
    };
  }
  function _slotAt(x, y) {
    const el = document.elementFromPoint(x, y);
    return el && el.closest ? el.closest('[data-slot]') : null;
  }
  function _onMove(e) {
    if (!_drag || e.pointerId !== _drag.id) return;
    if (!_drag.ghost) {
      if (Math.hypot(e.clientX - _drag.x, e.clientY - _drag.y) < 8) return;
      const g = document.createElement('div');
      g.className = 'lab-ghost';
      g.textContent = D().KINDS[_drag.tool].icon + ' ' + D().KINDS[_drag.tool].name;
      _root.appendChild(g);
      _drag.ghost = g;
    }
    _drag.ghost.style.left = e.clientX + 'px';
    _drag.ghost.style.top = e.clientY + 'px';
    _root.querySelectorAll('.lab-circuit-slot.is-over').forEach(b => b.classList.remove('is-over'));
    const s = _slotAt(e.clientX, e.clientY);
    if (s) s.classList.add('is-over');
  }
  function _onUp(e) {
    window.removeEventListener('pointermove', _onMove);
    const d = _drag; _drag = null;
    if (!d || !d.ghost) return;
    d.ghost.remove();
    _root && _root.querySelectorAll('.lab-circuit-slot.is-over').forEach(b => b.classList.remove('is-over'));
    _suppressClick = true;
    const s = _slotAt(e.clientX, e.clientY);
    if (s) { setTool(d.tool); place(s.dataset.slot, d.tool); }
  }

  // On a phone the shelf sits below the board: bring the board back into view.
  function _showStage() {
    const z = $('lab-circuit-zone');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'say-coach': { const el = $('lab-coach-text'); if (el) _say(el.textContent); break; }
      case 'say-guide': { const G = _gdef(), s = G && G.steps[_guide.step]; if (s) _say(s.say); break; }
      case 'mains': _danger('mains'); break;
      case 'wet': _danger('wet_hands'); break;
      case 'cable': _danger('cable'); break;
      case 'view': setView(_view === 'picture' ? 'symbols' : 'picture'); break;
      case 'read': read(); break;
      case 'undo': undo(); break;
      case 'clear': clearBoard(); break;
      case 'quiz': _quiz(); break;
      case 'clear-table': _readings = []; _refresh(); _coach('Readings table cleared.'); break;
      case 'exit-mission': _mission = null; _coach('Back to free building. The board is all yours.'); _renderPanel(); break;
      case 'guide-stop': _stopGuide(false); break;
    }
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
    const f = D().FACTS_BY_GRADE[_g()] || D().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }
  function _guard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    return true;
  }

  // ══ Actions ══════════════════════════════════
  // ══ Read aloud (Grades 4 and 6) ══════════════
  // Never automatic: only the 🔊 buttons call _say(). Speech stops on every new
  // coach line, guide step, overlay, unmount and screen change.
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
    const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{3030}\u{FE0F}\u{200D}]/gu, '')
      .replace(/→/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-GB'; u.rate = 0.95;
    const v = _voice(); if (v) u.voice = v;
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    try { ss.speak(u); } catch (e) { _talking = false; }
  }
  // cancel() only while speaking - cancel-then-speak stalls Chrome.
  function _hush() {
    if (!_talking) return;
    _talking = false;
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  }
  // Every overlay goes through here, so speech never talks over a card.
  const _ov = (html, o) => { _hush(); return Labs.overlay(html, o); };

  function _snap() { _undo.push(JSON.stringify(_layout)); if (_undo.length > 30) _undo.shift(); }
  const _switchSlot = () => Object.keys(_layout).sort().find(k => _layout[k].kind === 'switch');

  function setTool(t) {
    if (!D().KINDS[t] && !TOOL_INFO[t]) return;
    _tool = t;
    _renderPalette();
    _renderSlots();
    const K = D().KINDS[t];
    _coach(t === 'hand' ? '✋ Tap a switch to open or close it, a bulb to unscrew it, or a cell to turn it round.'
      : t === 'eraser' ? '🧽 Tap a part on the board to take it off.'
      : K.obj ? `${K.icon} ${K.name} picked. Now tap the gap in the circuit to test it.`
      : `${K.icon} ${K.name} picked. Now tap a space between two points on the board. ${_job(t)}`);
  }

  // What a tap on a space does depends on the part in the hand.
  function tapSlot(slot) {
    if (!_guard() || !D().SLOTS[slot]) return;
    const p = _layout[slot];
    if (_tool === 'eraser') { if (p) remove(slot); else _coach('That space is already empty.'); return; }
    if (_tool === 'hand') { if (p) _operate(slot); else _coach('An empty space. Pick a part from the palette under the board, then tap here to place it.'); return; }
    if (p && p.kind === _tool) { _operate(slot); return; }
    place(slot, _tool);
  }

  function _operate(slot) {
    const p = _layout[slot];
    if (!p) return;
    if (p.kind === 'switch') toggleSwitch(p.open, slot);
    else if (p.kind === 'bulb') setBulb(slot, !(p.out || p.blown));
    else if (p.kind === 'cell') flip(slot);
    else if (p.kind === 'fuse' && p.blown) { _snap(); p.blown = false; _t = 0; _coach('New fuse fitted. If whatever made the current too big is still there, it will melt again.'); _afterChange('fuse:new'); }
    else if (D().OBJECTS[p.kind]) _coach(`That is the ${_lc(p.kind)} you are testing. Pick another thing and tap here to swap it.`);
    else _coach(`That is a ${toolName(p.kind).toLowerCase()} - there is nothing to switch. Use 🧽 Remove to take it off.`);
  }

  function place(slot, kind) {
    const K = D().KINDS[kind];
    if (!K || !D().SLOTS[slot] || !_guard()) return;
    _snap();
    const was = _layout[slot];
    _layout[slot] = kind === 'switch' ? { kind, open: true } : { kind };
    _t = 0;
    _coach(was ? `${K.name} in place of the ${toolName(was.kind).toLowerCase()}.`
      : K.obj ? `${K.name} in the gap. Close the switch to test it.`
      : kind === 'cell' ? (_primary() ? 'Cell placed. Its + end has the gold cap. Tap it with ✋ to turn it round.'
                                      : 'Cell placed. Its long line (+) is the end with the gold cap. Tap it with ✋ to turn it round.')
      : kind === 'switch' ? 'Switch placed - it starts OPEN. Tap it with ✋ to close it.'
      : kind === 'ammeter' ? 'Ammeter placed. It measures the current flowing THROUGH it, so it belongs in the loop.'
      : kind === 'voltmeter' ? 'Voltmeter placed. It measures the voltage between its two ends, so it goes ACROSS a component.'
      : `${K.name} placed.`);
    _afterChange('place:' + slot + ':' + kind);
  }

  function remove(slot) {
    if (!_guard() || !_layout[slot]) return;
    _snap();
    const k = _layout[slot].kind;
    delete _layout[slot];
    _t = 0;
    _coach(`${toolName(k)} taken off the board.`);
    _afterChange('remove:' + slot);
  }

  function toggleSwitch(on, at) {
    if (!_guard()) return;
    const slot = at || _switchSlot();
    if (!slot) { _coach('There is no switch on the board. Pick 🔘 Switch and put one in the loop.'); return; }
    const p = _layout[slot];
    const want = on === undefined ? p.open : !!on;
    if (want === !p.open) return;
    _snap();
    p.open = !want;
    _t = 0;
    _afterChange(want ? 'switch:on' : 'switch:off');
  }

  function setBulb(slot, out) {
    const p = _layout[slot];
    if (!_guard() || !p || p.kind !== 'bulb') return;
    _snap();
    if (p.blown) { _layout[slot] = { kind: 'bulb' }; _coach('A new bulb, screwed into the holder.'); _t = 0; _afterChange('bulb:' + slot + ':in'); return; }
    if (!!p.out === !!out) return;
    p.out = !!out;
    _t = 0;
    _afterChange('bulb:' + slot + ':' + (out ? 'out' : 'in'));
  }

  function flip(slot) {
    const p = _layout[slot];
    if (!_guard() || !p || p.kind !== 'cell') return;
    _snap();
    p.flip = !p.flip;
    _t = 0;
    _coach('Cell turned round: its + terminal now faces the other way.');
    _afterChange('flip:' + slot);
  }

  function build(id) {
    if (!D().PRESETS[id] || !_guard()) return;
    if (_mission && (_mission.id === 'light' || _mission.kind === 'torch' || _mission.kind === 'diagram')) { _coach('This mission is to build the circuit yourself - part by part. You can do it!'); return; }
    if (_mission && _mission.kind === 'fix') { _coach('Mend this torch yourself - no ready-made circuits in this mission!'); return; }
    if (_mission && _mission.kind === 'meters7') { _coach('Add the two meters to this circuit yourself - no ready-made layouts in this mission!'); return; }
    _snap();
    _layout = D().layoutOf(id);
    _hadGap = false; _vmSeen = false; _t = 0; _gapFilled = false;
    if (_tool !== 'hand') { _tool = 'hand'; _renderPalette(); }
    _coach(`${D().PRESETS[id].name}. The switch is open - tap it with ✋ (or use the yellow box) to close it.`);
    _afterChange('build:' + id);
  }

  function clearBoard() {
    if (!_guard()) return;
    if (!Object.keys(_layout).length) { _coach('The board is already empty.'); return; }
    _snap();
    _layout = {}; _t = 0; _hadGap = false;
    _coach('Board cleared. Pick a part from the palette, then tap a space to place it.');
    _afterChange('clear');
  }

  function undo() {
    if (!_guard()) return;
    if (!_undo.length) { _coach('Nothing to undo.'); return; }
    _layout = JSON.parse(_undo.pop());
    _t = 0;
    _coach('Undone.');
    _afterChange('undo');
  }

  function setView(v) {
    if (v !== 'picture' && v !== 'symbols') return;
    if (v === 'symbols' && !D().symbolsFor(_g())) return;
    _view = v;
    _syncView();
    _coach(v === 'symbols' ? (_primary() ? '✏️ Symbols view: the same circuit, drawn with simple symbols. This is an extra - you will use it at secondary school.'
                                         : '✏️ Circuit-diagram view: every part drawn with its standard symbol, the way the exam draws it.')
                           : '🖼️ Picture view: the real components on the board.');
    _checkDisc('view:' + v, _sol);
    _draw(0);
    _refresh();
    _guideEvent('view:' + v);
  }
  function _syncView() {
    const b = $('lab-circuit-view');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_view === 'symbols'));
    $('lab-circuit-view-label').textContent = _view === 'symbols' ? 'Picture' : 'Symbols';
    $('lab-circuit-view-ico').textContent = _view === 'symbols' ? '🖼️' : '✏️';
    b.setAttribute('aria-label', _view === 'symbols' ? 'Show the picture view' : 'Show the circuit-diagram view with standard symbols');
  }

  // ══ After every change: solve, then look for what went wrong ══
  function _afterChange(evt) {
    const prev = _sol;
    const C = D();
    _sol = C.solve(_layout);
    const fz = C.fusesOver(_sol);
    if (fz.length) {
      fz.forEach(k => { _layout[k].blown = true; });
      _sol = C.solve(_layout);
      _logEntry({ title: 'The fuse melted', obs: 'The current shot up past 3 A, so the thin wire inside the fuse melted and broke the circuit. Nothing else got hot: the fuse protected the circuit.' });
      _discover('fuse_blows');
      _coach('🧵 The fuse melted! The current got far too big, so it broke the circuit - that is its job. Undo the change that caused it, then tap the fuse with ✋ to fit a new one.');
      _fxAdd('fuse', null, fz[0]);
    }
    const dg = C.diagnose(_layout, _sol);
    if (dg.short) {
      if (dg.via === 'ammeter') _result('ammeter_parallel', {}, 'short', true);
      else _hazard('short_circuit', dg);
      _paint();
      return;
    }
    let carded = false;
    const P = _primary();
    if (dg.over.length) {
      const k = dg.over[0], v = _sol.bulbs[k].V, cells = _sol.cells;
      dg.over.forEach(b => { _layout[b].blown = true; });
      _sol = C.solve(_layout);
      _logEntry({ title: 'A bulb blew', bad: true, obs: P ? `${cells} cells were too much for the bulb: its thin wire got too hot and melted.`
                                                          : `${f1(v)} V across a bulb made for 3 V: the filament overheated and melted.` });
      _result('bulb_blown', { cells, v: f1(v) }, 'pop', false, k);
      carded = true;
    }
    if (!carded && !P) {
      if (dg.vmSeries.length) {
        if (!_vmSeen) { _vmSeen = true; _result('voltmeter_series', { v: f2(_sol.meters[dg.vmSeries[0]].value) }, null, false); carded = true; }
      } else _vmSeen = false;
    }
    const gap = C.hasGap(_layout);
    if (_byFacts()) {
      // Grades 4, 6 and 7: a gap, no cell, or cells facing each other each get a card.
      if (_gapPrev && !gap && /^place:.*:wire$/.test(evt)) _gapFilled = true;
      _gapPrev = gap;
      if (P) _recordTests();
      const m = carded ? null : C.primaryMistake(_layout, _sol, evt);
      if (m) { _result(m, {}, null, false); carded = true; }
    } else {
      if (!carded && evt === 'switch:on' && gap) { _result('open_circuit', {}, null, false); carded = true; }
      if (gap) _hadGap = true;
    }
    _warm = false;
    if (!carded) (P ? _narrateP : _narrate)(evt, prev);
    _checkDisc(evt, prev, fz.length > 0);
    _missionEvent(evt, prev);
    _paint();
    _guideEvent(evt);
  }

  // What the lab assistant says about what just happened, and the notebook.
  function _narrate(evt, prev) {
    const C = D(), s = _sol, lit = C.litBulbs(s), arr = C.arrangement(s);
    const words = lit.map(k => C.brightnessWord(s.bulbs[k].brightness));
    if (evt === 'switch:on') {
      if (lit.length) {
        _coach(lit.length === 1 ? `The bulb lights (${words[0]})! The circuit is complete, so ${_is7() ? 'the current' : 'charge'} flows all the way round - watch the moving dots.`
          : `${lit.length} bulbs light: ${words.join(' and ')}. ${arr === 'series' ? 'One loop, shared voltage - so each is dim.' : arr === 'parallel' ? 'Each has its own branch and the full voltage.' : ''}`);
        _logEntry({ title: 'Switch closed', obs: `${C.ARR_NAMES[arr][0].toUpperCase() + C.ARR_NAMES[arr].slice(1)}: ${lit.length === 1 ? 'the bulb is ' + words[0] : 'the bulbs are ' + words.join(' and ')}.` });
      } else if (s.cells >= 2 && s.cellI < 1e-3 && !C.hasGap(_layout)) {
        _coach('The loop is complete, but nothing lights. Are the cells facing the same way? Look at the + ends.');
      } else if (!s.cells) _coach(`Switch closed - but there is no cell to push ${_is7() ? 'a current' : 'the charge'} round. Add a 🔋 cell.`);
    } else if (evt === 'switch:off' && prev && C.litBulbs(prev).length) {
      _coach('Switch open: the circuit is broken, so the current stops everywhere and the bulbs go out.');
      _logEntry({ title: 'Switch opened', obs: 'Every bulb went out at once: an open switch is a gap, and no current flows anywhere in the loop.' });
    } else if (/^bulb:.*:out$/.test(evt) && prev) {
      const pa = C.arrangement(prev);
      if (pa === 'series') { _coach('Unscrewed one - and the other went out too! A series circuit has only one path.'); _logEntry({ title: 'Series: one bulb unscrewed', obs: 'The other bulb went out as well. The only path was broken.' }); }
      else if (pa === 'parallel' && lit.length) { _coach('Unscrewed one - the other keeps shining, just as bright. It has its own path.'); _logEntry({ title: 'Parallel: one bulb unscrewed', obs: 'The other bulb stayed lit at full brightness. Its own branch is still complete.' }); }
      else _coach('Bulb unscrewed from its holder - that makes a gap.');
    } else if (/^bulb:.*:in$/.test(evt)) _coach('Bulb back in its holder.');
    else if (/^flip:/.test(evt) && s.cells >= 2 && s.cellI < 1e-3 && lit.length === 0 && prev && C.litBulbs(prev).length) {
      _coach('The bulb went out! The two cells now push in opposite directions and cancel each other.');
      _logEntry({ title: 'Cells facing each other', obs: 'With one cell turned round the bulb went out: +1.5 V − 1.5 V = 0 V.' });
    } else if (evt.startsWith('place:') && lit.length && prev && !C.litBulbs(prev).length) {
      _coach(`The bulb lights! The last gap is closed, so ${_is7() ? 'the current' : 'the charge'} can flow all the way round.`);
    }
  }

  // ══ Hazards and mistakes ════════════════════
  // Grades 4/6: what the lab assistant says, in Grade 4-6 words.
  function _narrateP(evt, prev) {
    const C = D(), s = _sol, lit = C.litBulbs(s), prevLit = prev ? C.litBulbs(prev) : [];
    const tests = C.objectTests(_layout).filter(t => t.result);
    if (tests.length && (evt === 'switch:on' || /^place:/.test(evt))) {
      const t = tests.find(x => evt === `place:${x.slot}:${x.obj}`) || tests[0], n = _lc(t.obj);
      const dim = lit.some(k => s.bulbs[k].brightness < 0.5);
      _coach(t.result === 'conductor' ? `The bulb lights${dim ? ', but only dimly' : ''}! The ${n} lets electricity through. It is a conductor.`
                                      : `The bulb stays dark. The ${n} stops the electricity. It is an insulator.`);
      return;
    }
    const bright = lit.some(k => s.bulbs[k].brightness >= 3);
    if (evt === 'switch:on' && lit.length) {
      _coach(bright ? 'The bulb lights up - very brightly! Two cells push harder than one.'
                    : 'The bulb lights up! The circuit is complete, so electricity flows all the way round. Watch the moving dots.');
      _logEntry({ title: 'Switch closed', obs: bright ? 'The bulb lit very brightly with two cells.' : 'The circuit was complete, and the bulb lit.' });
    } else if (evt === 'switch:off' && prevLit.length) {
      _coach('Switch open: that makes a gap, so the electricity stops and the bulb goes out.');
      _logEntry({ title: 'Switch opened', obs: 'The bulb went out. An open switch is a gap in the circuit.' });
    } else if (/^bulb:.*:out$/.test(evt) && prevLit.length) {
      _coach('You unscrewed the bulb. That makes a gap, so the light goes out.');
      _logEntry({ title: 'Bulb unscrewed', obs: 'The light went out. A loose bulb makes a gap.' });
    } else if (/^bulb:.*:in$/.test(evt)) _coach('Bulb screwed back in.');
    else if (evt.startsWith('place:') && lit.length && !prevLit.length) _coach('The bulb lights! The last gap is closed, so electricity can flow all the way round.');
    else if (/^place:.*:cell$/.test(evt) && bright) _coach('A second cell - the bulb is much brighter now!');
  }

  // Grades 4/6: remember what each thing tested as, and note it the first time.
  function _recordTests() {
    const C = D();
    for (const t of C.objectTests(_layout)) {
      if (!t.result) continue;
      const first = !_tests[t.obj];
      _tests[t.obj] = t.result;
      if (!first) continue;
      const O = C.OBJECTS[t.obj], name = O.name.toLowerCase();
      _logEntry({ title: `Tested: ${O.name}`, obs: t.result === 'conductor'
        ? `The bulb lit${O.R > 1 ? ', but dimly' : ''}. The ${name} is a conductor.` : `The bulb stayed dark. The ${name} is an insulator.` });
    }
  }

  function _hazard(base, dg) {
    const id = _cid(base), H = D().HAZARDS[id], P = _primary(), sc = base === 'short_circuit';
    const st = Labs.store('circuit');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    if (sc) _logEntry({ title: 'Short circuit!', bad: true, obs: P ? 'The electricity took a short cut round the bulb. The wire and the cell got hot, and the bulb went dark.'
      : `A huge current (about ${Math.round(_sol.cellI)} A) rushed round a path with almost no resistance. The wire and the cell got hot and no bulb lit.` });
    else _logEntry({ title: H.title(dg), bad: true, obs: H.log });
    _busy = true;
    _coach(sc ? '🔥 Short circuit! Look at the wire glowing…' : '⚡ Stop! Look at the board…');
    _fxAdd(H.fx, () => {
      _busy = false;
      _hush();
      Labs.hazardCard({ signs: H.signs, title: H.title(dg), happened: H.happened(dg), why: H.why, instead: H.instead, exam: H.exam,
        button: sc ? 'Take that wire off' : 'Got it - I will stay safe',
        onClose: () => {
          if (sc) { _restore(); _coach(P ? 'I took that wire off again. Always keep the bulb in the loop.' : 'I’ve taken back the move that caused the short circuit. Keep a bulb or a resistor in every loop.'); }
          else _coach('Remember: our cells are safe to use. Sockets, wet hands and damaged cables are not. Ask an adult.');
        } });
    });
  }

  // Grades 4/6: the ⚠️ "Would it be safe?" row - dangers that exist only at home.
  function _danger(id) {
    if (_g() === 9 || !_guard() || !D().HAZARDS[_cid(id)]) return;
    _hazard(id, null);
  }

  function _result(base, ctx, fx, undoAfter, slot) {
    const id = _cid(base), R = D().RESULTS[id];
    const st = Labs.store('circuit');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    // Mending a torch means closing the switch to see what is still wrong: not a mistake.
    if (_mission && !(_mission.kind === 'fix' && base === 'open_circuit')) _mission.mistakes++;
    if (base !== 'bulb_blown') _logEntry({ title: R.title(ctx), bad: true, obs: R.happened(ctx) });
    _busy = true;
    const show = () => {
      _busy = false;
      _hush();
      Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead, exam: R.exam,
        button: undoAfter ? 'Take the meter out' : 'Got it',
        onClose: () => {
          if (undoAfter) { _restore(); _coach('Meter taken back off. Put the ammeter IN the loop, where a wire was.'); }
          else if (base === 'open_circuit') _coach('Find the gap: follow the loop round from the cell and fill the empty space with a wire.');
          else if (base === 'voltmeter_series') _coach('Put a wire back where the voltmeter is, then connect the voltmeter across the bulb.');
          else if (base === 'bulb_blown') _coach('Put a 〰️ wire in place of one cell, then tap the bulb with ✋ to fit a new one.');
          else if (base === 'cells_wrong') _coach('Tap one of the cells with ✋ to turn it round.');
          else if (base === 'no_cell') _coach('Pick 🔋 Cell under the board and put it in the loop.');
        } });
    };
    if (fx) _fxAdd(fx, show, slot); else show();
  }

  // Back to the layout before the move that caused the trouble.
  function _restore() {
    if (_undo.length) _layout = JSON.parse(_undo.pop());
    _t = 0;
    _sol = D().solve(_layout);
    _vmSeen = D().diagnose(_layout, _sol).vmSeries.length > 0;
    _paint();
  }

  // ══ Readings ═════════════════════════════════
  function read() {
    if (!_guard()) return;
    const C = D(), s = _sol || C.solve(_layout);
    const r = C.reading(_layout, s, _t);
    const lit = C.litBulbs(s);
    if (!r.amps.length && !r.volts.length) {
      _coach('There is no meter on the board. Put an ⏲️ ammeter IN the loop, or a 🎚️ voltmeter ACROSS a bulb, to measure.');
      _logEntry({ title: 'Looked at the circuit', obs: lit.length ? `${C.ARR_NAMES[r.arr]}: ${r.bulbs.filter(w => w !== 'off').join(', ')}. (No meter to measure with.)` : 'Nothing is lit. (No meter to measure with.)' });
      _guideEvent('read');
      return;
    }
    _readings.push(r);
    const parts = [];
    if (r.amps.length) parts.push(`current ${r.amps.map(a => f2(a) + ' A').join(' and ')}`);
    if (r.volts.length) parts.push(`voltage ${r.volts.map(v => f2(v) + ' V').join(' and ')}`);
    // ⚠ Grade 7 reads the meters but does no Q = It or V = IR arithmetic - that is Grade 9.
    const g9 = !_is7();
    let formula = '';
    if (g9 && r.Q != null) formula = `In ${r.t} s: Q = It = ${f2(r.amps[0])} A × ${r.t} s = ${f1(r.Q)} C` + (r.W != null ? `;  W = QV = ${f1(r.Q)} C × ${f2(r.volts[0])} V = ${f1(r.W)} J` : '');
    else if (g9 && r.amps.length && r.volts.length && r.amps[0] > 0.01 && lit.length === 1) formula = `R = V ÷ I = ${f2(r.volts[0])} V ÷ ${f2(r.amps[0])} A = ${f1(C.resistance(r.volts[0], r.amps[0]))} Ω`;
    _logEntry({ title: `Reading: ${r.label}`, obs: parts.join(', ') + '.', formula });
    _coach(`📝 Recorded: ${parts.join(', ')}.${g9 && r.Q != null ? ` And ${f1(r.Q)} C of charge has flowed so far.` : ''}`);
    // Discoveries a reading can unlock
    const amm = Object.keys(s.meters).filter(k => s.meters[k].kind === 'ammeter' && s.meters[k].value > 0.01);
    const vms = Object.keys(s.meters).filter(k => s.meters[k].kind === 'voltmeter' && s.meters[k].value > 0.1);
    const matchesBulb = v => lit.some(k => Math.abs(s.bulbs[k].V - v) < 0.02);
    if (amm.some(k => C.ammeterInSeries(s, k))) _discover('ammeter_read');
    if (vms.some(k => matchesBulb(s.meters[k].value))) _discover('voltmeter_read');
    if (amm.length >= 2 && amm.every(k => Math.abs(s.meters[k].value - s.meters[amm[0]].value) < 0.005)) _discover('same_current');
    if (C.arrangement(s) === 'series' && lit.length === 2 && vms.some(k => matchesBulb(s.meters[k].value) && s.meters[k].value < 0.8 * s.cells * C.EMF)) _discover('volts_share');
    if (amm.length && _t >= 10 - 1e-9) _discover('charge_flow');
    if (_is7()) _checkDiscP('read', s);
    _missionRead(s, r);
    _refresh();
    _guideEvent('read');
  }

  // ══ Discoveries from the state of the board ═══
  // Grades 4/6/7: a discovery is unlocked by its `when` fact, worked out in the data file.
  function _checkDiscP(evt, prev, warm, fuse) {
    const f = D().facts({ layout: _layout, sol: _sol, prev, evt, view: _view, tests: _tests, gapFilled: _gapFilled, warm: !!warm, fuse: !!fuse });
    if (D().litBulbs(_sol).length) _gapFilled = false;
    for (const d of _discs()) if (d.when && f.has(d.when)) _discover(d.id);
  }

  function _checkDisc(evt, prev, fuse) {
    if (_byFacts()) { _checkDiscP(evt, prev, false, fuse); return; }
    const C = D(), s = _sol, lit = C.litBulbs(s), arr = C.arrangement(s);
    const prevLit = prev ? C.litBulbs(prev) : [], prevArr = prev ? C.arrangement(prev) : 'none';
    if (lit.length) _discover('first_light');
    if (lit.length && _hadGap) { _hadGap = false; _discover('gap_fixed'); }
    if (evt === 'switch:off' && prevLit.length && !lit.length) _discover('switch_off');
    if (arr === 'series' && lit.length === 2) _discover('series_dim');
    if (arr === 'parallel' && lit.every(k => s.bulbs[k].brightness >= 0.9)) _discover('parallel_bright');
    if (/^bulb:.*:out$/.test(evt)) {
      if (prevArr === 'series' && !lit.length) _discover('series_break');
      if (prevArr === 'parallel' && lit.length === 1 && s.bulbs[lit[0]].brightness >= 0.9) _discover('parallel_independent');
    }
    if (lit.some(k => s.bulbs[k].brightness >= 3)) _discover('more_cells');
    if (/^flip:/.test(evt) && s.cells >= 2 && s.cellI < 1e-3 && !C.hasGap(_layout) && Object.values(_layout).some(p => p.kind === 'bulb')) _discover('cells_oppose');
    const res = s.els.filter(e => e.kind === 'resistor' && Math.abs(e.I) > 0.01);
    if (res.length && lit.some(k => Math.abs(s.bulbs[k].I - Math.abs(res[0].I)) < 1e-3 && s.bulbs[k].brightness < 0.5)) _discover('resistor_dims');
    if (_view === 'symbols' && lit.length) _discover('diagram_view');
  }

  // ══ Simulation clock (Q = It needs time) ═════
  function _step(dt) {
    if (!dt || !_sol) return;
    if (_sol.flowing) _t += dt;
    // A bulb left on for 10 s has got warm (Grades 4/6: light AND heat).
    if (!_warm && _primary() && _t >= 10 - 1e-9 && D().litBulbs(_sol).length) { _warm = true; _checkDiscP('warm', _sol, true); _readouts(); }
    const G = _gdef(), s = G && G.steps[_guide.step];
    if (s && s.on.startsWith('wait:') && _t >= +s.on.split(':')[1] - 1e-9) _guideEvent(s.on);
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = _mine(D().MISSIONS).find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _layout = M.kind === 'sort' ? D().layoutOf('tester') : M.kind === 'fix' ? D().layoutOf('broken') : M.kind === 'meters7' ? D().layoutOf('single') : {};
    _undo = []; _t = 0; _hadGap = false; _vmSeen = false; _fx = []; _tests = {}; _gapFilled = false; _gapPrev = D().hasGap(_layout);
    _mission = { id, kind: M.kind || null, hazards: 0, mistakes: 0, success: false, read: false, series: null, parallel: null, sBreak: false, pBreak: false, tested: {} };
    _sol = D().solve(_layout);
    _tool = id === 'light' || M.kind === 'torch' || M.kind === 'diagram' ? 'cell' : M.kind === 'meters7' ? 'ammeter' : 'hand';
    _panel = 'missions';
    _coach(M.intro);
    _renderPalette();
    _renderPanel();
    _paint();
  }

  function _has(kind) { return Object.values(_layout).some(p => p.kind === kind); }
  function _lightProgress() {
    const all = ['cell', 'bulb', 'switch', 'ammeter'].every(_has);
    return { parts: all, loop: all && !D().hasGap(_layout), lit: D().litBulbs(_sol).length > 0, read: _mission.read };
  }
  function _missionRead(s, r) {
    const ms = _mission, C = D();
    if (!ms || ms.success) return;
    if (ms.id === 'light') {
      const sw = Object.keys(_layout).filter(k => _layout[k].kind === 'switch');
      const inSeries = Object.keys(s.meters).some(k => C.ammeterInSeries(s, k));
      const controls = sw.some(k => !_layout[k].open && C.switchControls(_layout, k));
      if (C.litBulbs(s).length && inSeries && controls) {
        ms.read = true; ms.success = true;
        _coach(`🎯 ${f2(r.amps[0])} A through a lit bulb, measured in series, with a switch that controls it. Tap “Answer the questions”!`);
      } else if (!C.litBulbs(s).length) _coach('The bulb is not lit yet - is the loop complete and the switch closed?');
      else if (!inSeries) _coach('Put the ammeter IN the loop, so all the current passes through it.');
      else _coach('Put a switch in the loop too, so it can turn the bulb on and off - then close it.');
    } else if (ms.id === 'compare') {
      const arr = C.arrangement(s), inSeries = Object.keys(s.meters).some(k => C.ammeterInSeries(s, k));
      if (arr === 'series' && inSeries) { ms.series = r.amps[0]; _coach(`Series reading: ${f2(r.amps[0])} A. Now unscrew one bulb with ✋.`); }
      else if (arr === 'parallel' && inSeries) { ms.parallel = r.amps[0]; _coach(`Parallel reading: ${f2(r.amps[0])} A. Now unscrew one bulb with ✋.`); }
      else _coach('Read with both bulbs lit and the ammeter next to the cell - lay out one of the two circuits from the mission box.');
      _missionCheck();
    } else if (ms.kind === 'meters7') {
      const m = C.meterChecks(s);
      if (m.ammeter && m.voltmeter) {
        ms.read = true; ms.success = true;
        _coach(`🎯 ${f2(r.amps[0])} A through the lamp and ${f2(m.volts[0])} V across it, each meter in the right place. Tap “Answer the questions”!`);
      } else if (!C.litBulbs(s).length) _coach('The lamp is not lit yet - is the loop complete and the switch closed?');
      else if (!m.ammeter) _coach('Put the ammeter IN the loop, in place of a wire, so all the current flows through it.');
      else _coach('Now the voltmeter: connect it ACROSS the lamp, one lead to each end of it.');
    }
  }
  function _missionEvent(evt, prev) {
    const ms = _mission, C = D();
    if (ms && ms.kind && !ms.success) { _missionP(evt, prev); return; }
    if (!ms || ms.success || ms.id !== 'compare' || !prev || !/^bulb:.*:out$/.test(evt)) return;
    const pa = C.arrangement(prev), lit = C.litBulbs(_sol);
    if (pa === 'series' && !lit.length) ms.sBreak = true;
    if (pa === 'parallel' && lit.length === 1) ms.pBreak = true;
    _missionCheck();
  }
  function _missionCheck() {
    const ms = _mission;
    if (!ms || ms.success || ms.id !== 'compare') return;
    if (ms.series != null && ms.parallel != null && ms.sBreak && ms.pBreak) {
      ms.success = true;
      _coach('🎯 Both circuits built, measured and tested. Tap “Answer the questions” to finish the mission.');
    }
  }

  // Grades 4/6: a torch to build, a torch to mend, or six things to sort.
  // Grade 7: a circuit from its diagram, series and parallel, or the two meters.
  function _torchWorks() {
    const C = D();
    return C.litBulbs(_sol).length > 0 && Object.keys(_layout).some(k => _layout[k].kind === 'switch' && !_layout[k].open && C.switchControls(_layout, k));
  }
  const DIAGRAM_PARTS = ['cell', 'switch', 'bulb', 'resistor'];
  function _missionP(evt, prev) {
    const ms = _mission, C = D();
    if (ms.kind === 'sort') {
      C.objectTests(_layout).forEach(t => { if (t.result) ms.tested[t.obj] = t.result; });
      if (C.TEST_OBJECTS.every(o => ms.tested[o])) { ms.success = true; _coach('🎯 All six things tested! Tap “Answer the questions” to finish.'); }
    } else if (ms.kind === 'sp7') {
      if (prev && /^bulb:.*:out$/.test(evt || '')) {
        const pa = C.arrangement(prev), lit = C.litBulbs(_sol);
        if (pa === 'series' && !lit.length && !ms.sBreak) { ms.sBreak = true; if (!ms.pBreak) _coach('Series: one lamp out, and the other went out too. Now lay out the parallel circuit.'); }
        if (pa === 'parallel' && lit.length === 1 && !ms.pBreak) { ms.pBreak = true; if (!ms.sBreak) _coach('Parallel: one lamp out, and the other stayed on. Now lay out the series circuit.'); }
      }
      if (ms.sBreak && ms.pBreak) { ms.success = true; _coach('🎯 Both circuits built and tested. Tap “Answer the questions” to finish the mission.'); }
    } else if (ms.kind === 'diagram') {
      if (_torchWorks() && C.oneLoop(_sol, DIAGRAM_PARTS)) { ms.success = true; _coach('🎯 Just like the diagram: four parts in one loop, and the switch works. Tap “Answer the questions”.'); }
      else if (_torchWorks()) _coach('The lamp lights - but the diagram has all four parts in ONE loop. Check the resistor and the switch are in it.');
    } else if (ms.kind === 'meters7') {
      // A reading finishes this one (see _missionRead).
    } else if (_torchWorks() && (ms.kind !== 'torch' || ['cell', 'bulb', 'switch'].every(_has))) {
      ms.success = true;
      _coach(ms.kind === 'fix' ? '🎯 Fixed! The torch lights, and the switch works. Tap “Answer the questions”.'
                               : '🎯 Your torch works, and the switch turns it on and off. Tap “Answer the questions”.');
    }
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    _hush();
    const M = D().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.mistakes) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('circuit');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      if (ms.kind) {
        lines.push(ms.hazards ? `${ms.hazards} danger${ms.hazards === 1 ? '' : 's'} (a short circuit, a socket, wet hands or a split cable) - none next time for an extra star.` : 'Safe all the way through. 🦺');
        lines.push(ms.mistakes ? `${ms.mistakes} wiring mistake${ms.mistakes === 1 ? '' : 's'} (${_is7() ? 'a gap, a meter in the wrong place, a burnt-out lamp, cells the wrong way' : 'a gap, a blown bulb, cells the wrong way'}).` : 'No wiring mistakes. 🔌');
      } else {
        lines.push(ms.hazards ? `${ms.hazards} short circuit${ms.hazards === 1 ? '' : 's'} - none next time for an extra star.` : 'No short circuits. 🔥');
        lines.push(ms.mistakes ? `${ms.mistakes} wiring mistake${ms.mistakes === 1 ? '' : 's'} (a meter in the wrong place, a gap, a blown bulb).` : 'Every meter in the right place. ⏲️');
      }
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or go and hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box, and
  // makes the same control glow. Nothing is locked: the pupil can wander off
  // and the guide waits. A guide is one of LabCircuitData.GUIDES (by id), or
  // one built from a discovery's recipe.
  const _gdef = () => _guide && (_guide.def || D().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || _mine(D().GUIDES).find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _layout = {}; _undo = []; _t = 0; _hadGap = false; _vmSeen = false; _fx = [];
    _tests = {}; _gapFilled = false; _gapPrev = false;
    _sol = D().solve(_layout);
    _tool = 'hand';
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPalette();
    _renderPanel();
    _paint();
    _guideEnter();
    const z = $('lab-circuit-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step already true on the board is skipped. Actions never are.
  function _satisfied(on) {
    const [k, a, b] = on.split(':');
    const p = _layout[a];
    switch (k) {
      case 'place': return !!p && p.kind === b && !p.blown && !p.out;
      case 'switch': { const sw = _switchSlot(); return !!sw && (a === 'on' ? !_layout[sw].open : _layout[sw].open); }
      case 'bulb': return !!p && p.kind === 'bulb' && (b === 'out' ? !!p.out : !p.out);
      case 'view': return _view === a;
      case 'remove': return !p;
      default: return false;
    }
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
      const meta = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>`;
      box.innerHTML = `${_primary() ? `<div class="lab-circuit-guide-head">${meta}<button type="button" class="lab-btn lab-btn-sm lab-circuit-say" data-act="say-guide" aria-label="Read this step aloud">🔊</button></div>` : meta}
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${s.btn && s.on.startsWith('build:')
          ? `<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>`
          : ''}
        <div class="lab-guide-actions">
          ${s.btn && !s.on.startsWith('build:') ? '<button type="button" class="lab-guide-hint-btn" data-guide-hint aria-label="Show me where to go">💡 Hint</button>' : ''}
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
    if (s && s.on === token) { _guide.step++; _guideEnter(); if (s.btn && !s.on.startsWith('build:')) _coachGuide(s.on); }
    else _highlight();
  }

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const [k, a, b] = s.on.split(':');
    switch (k) {
      case 'build': build(a); break;
      case 'place': if (_tool !== b) { _tool = b; _renderPalette(); } place(a, b); break;
      case 'remove': remove(a); break;
      case 'switch': toggleSwitch(a === 'on'); break;
      case 'bulb': setBulb(a, b === 'out'); break;
      case 'flip': flip(a); break;
      case 'read': read(); break;
      case 'view': setView(a); break;
    }
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

  // Brief positive narration shown when the student performs the bench action themselves.
  // Not called for build steps (auto-execute) or wait steps (no btn).
  function _coachGuide(on) {
    const [k, a, b] = on.split(':');
    if (k === 'place') { const K = D().KINDS[b]; if (K) _coach(`${K.name} placed! Now see what the circuit does.`); }
    else if (k === 'remove') _coach('Part removed. On to the next step!');
    else if (k === 'switch') _coach(a === 'on' ? 'Switch closed! Current is flowing — watch the bulb!' : 'Switch open. The circuit is broken — the bulb goes out.');
    else if (k === 'bulb') _coach(b === 'out' ? 'Bulb unscrewed. What happened to the other one?' : 'Bulb screwed back in.');
    else if (k === 'flip') _coach('Cell turned round! Watch what happens when they face each other.');
    else if (k === 'read') _coach('Reading taken — check your lab notebook for the values!');
    else if (k === 'view') _coach(a === 'symbols' ? 'Circuit-diagram view — this is how physicists draw it!' : 'Picture view — back to the real components!');
  }

  // ── Discoveries: every card opens ─────────────
  function _autoStep(on) {
    const [k, a, b] = on.split(':');
    const C = D(), P = _primary();
    switch (k) {
      case 'build': return P ? { on, say: `Set out ${C.PRESETS[a].name.toLowerCase()}.`, btn: '🔌 Set out the circuit' }
                             : { on, say: `Lay out: ${C.PRESETS[a].name.toLowerCase()}.`, btn: '🔌 Lay out the circuit' };
      case 'place': return C.KINDS[b].obj ? { on, say: `Put the ${_lc(b)} in the glowing gap.`, btn: `${C.KINDS[b].icon} Put in the ${_lc(b)}` }
                                          : { on, say: `Put a ${C.KINDS[b].name.toLowerCase()} in the glowing space.`, btn: `${C.KINDS[b].icon} Place the ${C.KINDS[b].name.toLowerCase()}` };
      case 'remove': return { on, say: 'Take the glowing part off the board.', btn: '🧽 Remove it' };
      case 'switch': return a === 'on' ? { on, say: 'Close the switch.', btn: '🔘 Close the switch' } : { on, say: 'Open the switch.', btn: '🔘 Open the switch' };
      case 'bulb': return b === 'out' ? { on, say: 'Unscrew the glowing bulb from its holder.', btn: '🔧 Unscrew the bulb' } : { on, say: 'Screw the bulb back in.', btn: '🔧 Screw it back in' };
      case 'flip': return { on, say: 'Turn the glowing cell round, so its + end faces the other way.', btn: '🔄 Turn the cell round' };
      case 'read': return { on, say: 'Take a reading from the meters.', btn: '📝 Take a reading' };
      case 'wait': return { on, say: P ? `Leave the bulb on for ${a} seconds. Watch it closely.` : `Leave the current flowing for ${a} seconds…` };
      case 'view': return a === 'symbols' ? { on, say: 'Switch to the circuit-diagram view.', btn: '✏️ Show the circuit symbols' } : { on, say: 'Switch back to the picture view.', btn: '🖼️ Show the picture' };
    }
    return { on, say: on };
  }

  function discoveryGuide(id) {
    const d = _discs().find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = _discs().find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('circuit').disc[id];
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
        ${d.formula ? `<section class="lab-hz-sec"><h3>The rule</h3><p class="lab-eq">${esc(d.formula)}</p></section>` : ''}
        <section class="lab-hz-sec is-exam"><h3>Why it happens</h3><p>${esc(d.learn)}</p></section>
        ${d.exam ? `<section class="lab-hz-sec"><h3>${_examHead()}</h3><p>${esc(d.exam)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>Close</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-disc-go="${id}" data-autofocus>Do it again →</button>
      </div>`, { cls: 'is-done' });
  }

  function _guideDone() {
    const G = _gdef();
    if (!G) return;
    const st = Labs.store('circuit');
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
    _coach(`Experiment complete: ${G.title}. Pick the next one below, try a mission, or build freely.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment below, or build freely.');
  }

  // The yellow glow on whatever the current guide step wants tapped.
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, a, b] = s.on.split(':');
    const sels = [];
    switch (k) {
      case 'place': sels.push(`#lab-circuit-slots [data-slot="${a}"]`); if (_tool !== b) sels.push(`#lab-circuit-palette [data-tool="${b}"]`); break;
      case 'remove': sels.push(`#lab-circuit-slots [data-slot="${a}"]`); if (_tool !== 'eraser') sels.push('#lab-circuit-palette [data-tool="eraser"]'); break;
      case 'switch': { const sw = _switchSlot(); if (sw) sels.push(`#lab-circuit-slots [data-slot="${sw}"]`); break; }
      case 'bulb': case 'flip': sels.push(`#lab-circuit-slots [data-slot="${a}"]`); break;
      case 'read': sels.push('.lab-circuit-actions [data-act="read"]'); break;
      case 'view': sels.push('#lab-circuit-view'); break;
    }
    const guideBox = _root.querySelector('#lab-guide');
    let firstEl = null;
    sels.forEach(sel => {
      const el = _root.querySelector(sel);
      if (el) { el.classList.add('is-next'); if (!firstEl) firstEl = el; }
    });
    if (firstEl) {
      firstEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      _root.querySelectorAll('[data-act],[data-slot],[data-tool]').forEach(other => {
        if (!other.classList.contains('is-next') && !(guideBox && guideBox.contains(other))) {
          other.classList.add('is-guide-dim');
        }
      });
    }
  }

  function _startHTML() {
    const st = Labs.store('circuit');
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
        <li><b>Follow the yellow box</b> under the board. The thing to tap next glows yellow.</li>
        <li>${_primary() ? '<b>Watch the bulb</b> - the moving dots show the electricity flowing.' : '<b>Watch the circuit</b> - the moving dots are the current - then read your notebook.'}</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_mine(D().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>${_primary() ? 'questions · earn stars' : 'exam-style questions · earn stars'}</small></h3>
      <div class="lab-start-list">${_mine(D().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or build freely: pick a part under the board, then tap a space to place it.</p>
    </section>`;
  }

  // ══ Panels ═══════════════════════════════════
  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
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
  // ⚠ Only THIS grade's discoveries count. Labs.discover()'s own "(n/total)"
  //   counts every key in the store - every grade's - so the count is put in
  //   the title here instead, from this grade's set.
  function _discover(id) {
    const all = _discs(), d = all.find(x => x.id === id);
    if (!d) return;
    const st = Labs.store('circuit');
    if (st.disc[id]) return;
    const n = all.filter(x => st.disc[x.id]).length + 1;
    if (Labs.discover('circuit', id, { title: `${d.title} (${n}/${all.length})` })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n'), all = _discs(), st = Labs.store('circuit');
    if (n) n.textContent = `${all.filter(d => st.disc[d.id]).length}/${all.length}`;
  }

  function _shelfHTML() {
    const C = D(), g = _g(), P = g <= 6;
    const card = k => {
      const K = C.KINDS[k];
      return `<button type="button" class="lab-circuit-kind${_tool === k ? ' is-on' : ''}" data-tool="${k}">
          <span class="lab-circuit-pic" aria-hidden="true">${K.icon}</span>
          ${P ? '' : `<span class="lab-circuit-kind-sym" title="Circuit symbol">${C.SYMBOL[k]}</span>`}
          <span class="lab-item-text"><b>${esc(K.name)}</b><small>${esc(_job(k))}</small></span></button>`;
    };
    return `<section class="lab-shelf" id="lab-circuit-shelf" aria-label="Components">
      <div class="lab-shelf-head"><h2 class="lab-circuit-h">${P ? 'The parts' : 'Components and their symbols'}</h2><p class="lab-hint">Tap one to pick it, then tap a space on the board.</p></div>
      <div class="lab-circuit-kinds">${C.kindsFor(g).map(card).join('')}</div>
      ${P ? `<div class="lab-shelf-head lab-circuit-quick-h"><h2 class="lab-circuit-h">Things to test</h2><p class="lab-hint">Put one in a gap and close the switch. Does the bulb light?</p></div>
      <div class="lab-circuit-kinds">${C.TEST_OBJECTS.map(card).join('')}</div>` : ''}
      <div class="lab-shelf-head lab-circuit-quick-h"><h2 class="lab-circuit-h">Quick layouts</h2><p class="lab-hint">A ready-made circuit to start from.</p></div>
      <div class="lab-circuit-quick">${(C.QUICK_BY_GRADE[g] || C.QUICK).map(id => `<button type="button" class="lab-btn lab-btn-sm" data-build="${id}">${esc(C.PRESETS[id].name)}</button>`).join('')}</div>
    </section>`;
  }

  // Grades 4/6: the notebook's results table - what each thing did to the bulb.
  function _testsTable() {
    const C = D(), rows = C.TEST_OBJECTS.filter(o => _tests[o]);
    if (!rows.length) return '';
    return `<div class="lab-table-wrap"><table class="lab-table">
      <caption>Conductor or insulator?</caption>
      <thead><tr><th scope="col">Thing</th><th scope="col">Made of</th><th scope="col">Bulb</th><th scope="col">So it is</th></tr></thead>
      <tbody>${rows.map(o => { const O = C.OBJECTS[o], on = _tests[o] === 'conductor';
        return `<tr><td>${O.icon} ${esc(O.name)}</td><td>${esc(O.made)}</td><td>${on ? (O.R > 1 ? 'lit (dim)' : 'lit') : 'dark'}</td><td><b>${on ? 'a conductor' : 'an insulator'}</b></td></tr>`; }).join('')}</tbody></table></div>`;
  }

  function _notebookHTML() {
    const rows = _readings.slice(-8).reverse();
    const tbl = _primary() ? _testsTable() : rows.length ? `<div class="lab-table-wrap"><table class="lab-table">
      <caption>Meter readings</caption>
      <thead><tr><th scope="col">Circuit</th><th scope="col">Current</th><th scope="col">Voltage</th><th scope="col">Bulbs</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td>${esc(r.label)}</td><td>${r.amps.length ? r.amps.map(a => f2(a) + ' A').join(', ') : '-'}</td>
        <td>${r.volts.length ? r.volts.map(v => f2(v) + ' V').join(', ') : '-'}</td><td>${esc(r.bulbs.join(', ') || '-')}</td></tr>`).join('')}</tbody></table></div>
      <p class="lab-fair">⏲️ Ammeter in series, voltmeter across. <button type="button" class="lab-link" data-act="clear-table">Clear table</button></p>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 14).map(e => `<li class="${e.note ? 'is-note' : ''}${e.bad ? ' lab-circuit-log-bad' : ''}">
          <b>${esc(e.title)}</b><p>${esc(e.obs)}</p>
          ${e.formula ? `<p class="lab-eq">${esc(e.formula)}</p>` : ''}</li>`).join('')}</ol>`
      : `<p class="lab-empty">${_primary() ? 'What you see appears here as you build and test.' : 'Your observations and meter readings appear here as you build.'}</p>`;
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${tbl}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('circuit');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">${_primary() ? 'Build it, test it, answer the questions, earn up to three stars.' : 'Build it, measure it, answer the exam-style questions, earn up to three stars.'}</p>
      ${_mine(D().MISSIONS).map(M => {
        const best = st.missions[M.id]?.stars || 0;
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
    const M = D().MISSIONS.find(x => x.id === ms.id);
    const li = (done, text) => `<li class="${done ? 'is-done' : ''}">${esc(text)}</li>`;
    let body;
    if (ms.kind === 'torch') {
      const parts = ['cell', 'bulb', 'switch'].every(_has), loop = parts && !D().hasGap(_layout);
      body = `<ul class="lab-steps">
          ${li(parts, 'Put a cell, a bulb and a switch on the board')}
          ${li(loop, 'Join them into ONE loop with wires')}
          ${li(ms.success, 'Close the switch - the bulb lights')}${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Hint: the outer ring of spaces makes one loop. The parts are under the board.</p>`;
    } else if (ms.kind === 'fix') {
      const whole = {};
      Object.keys(_layout).forEach(k => { whole[k] = _layout[k].kind === 'bulb' ? { kind: 'bulb' } : _layout[k]; });
      const gapOk = !D().hasGap(whole), bulbOk = !Object.values(_layout).some(p => p.kind === 'bulb' && (p.out || p.blown));
      body = `<ul class="lab-steps">
          ${li(gapOk, 'Fault 1: find the gap and fill it with a wire')}
          ${li(bulbOk, 'Fault 2: find the loose bulb and screw it in with ✋')}
          ${li(ms.success, 'Close the switch - the torch lights')}${li(false, 'Answer the questions')}</ul>`;
    } else if (ms.kind === 'diagram') {
      const parts = DIAGRAM_PARTS.every(_has), loop = parts && !D().hasGap(_layout);
      body = `<div class="lab-circuit-target">${D().DIAGRAM_G7}</div>
        <ul class="lab-steps">
          ${li(parts, 'Put the four parts in the diagram on the board')}
          ${li(loop, 'Join them into ONE loop with wires, in the same order')}
          ${li(ms.success, 'Close the switch - the lamp lights')}${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Hint: the outer ring of spaces makes one loop. The parts are under the board.</p>`;
    } else if (ms.kind === 'sp7') {
      body = `<div class="lab-circuit-quick">
          <button type="button" class="lab-btn lab-btn-sm" data-build="series2">🔗 Lay out: series</button>
          <button type="button" class="lab-btn lab-btn-sm" data-build="parallel2">🔀 Lay out: parallel</button></div>
        <ul class="lab-steps">
          ${li(ms.sBreak, 'Series: close the switch, then unscrew one lamp - watch the other')}
          ${li(ms.pBreak, 'Parallel: close the switch, then unscrew one lamp - watch the other')}${li(false, 'Answer the questions')}</ul>`;
    } else if (ms.kind === 'meters7') {
      body = `<ul class="lab-steps">
          ${li(_has('ammeter') && _has('voltmeter'), 'Put an ammeter IN the loop and a voltmeter ACROSS the lamp')}
          ${li(D().litBulbs(_sol).length > 0, 'Close the switch - the lamp lights')}
          ${li(ms.read, 'Take a reading with both meters in the right places')}${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Hint: swap a wire in the loop for the ammeter. For the voltmeter, add a short wire up from each end of the lamp, then put the voltmeter between them.</p>`;
    } else if (ms.kind === 'sort') {
      body = `<ul class="lab-steps">${D().TEST_OBJECTS.map(o => {
          const O = D().OBJECTS[o], r = ms.tested[o];
          return li(!!r, `${O.icon} ${O.name}${r ? (r === 'conductor' ? ': the bulb lights - a conductor' : ': the bulb stays dark - an insulator') : ''}`);
        }).join('')}${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Pick a thing under the board, tap the gap on the right, then close the switch.</p>`;
    } else if (ms.id === 'light') {
      const p = _lightProgress();
      body = `<ul class="lab-steps">
          ${li(p.parts, 'Put a cell, a bulb, a switch and an ammeter on the board')}
          ${li(p.loop, 'Join them into ONE complete loop with wires')}
          ${li(p.lit, 'Close the switch - the bulb lights')}
          ${li(p.read, 'Take a reading with the ammeter in series')}${li(false, 'Answer the questions')}</ul>
        <p class="lab-progress-text">Hint: the outer ring of spaces makes one loop. Parts go under the board.</p>`;
    } else {
      body = `<div class="lab-circuit-quick">
          <button type="button" class="lab-btn lab-btn-sm" data-build="series_amm">🔗 Lay out: series</button>
          <button type="button" class="lab-btn lab-btn-sm" data-build="parallel_amm">🔀 Lay out: parallel</button></div>
        <ul class="lab-steps">
          ${li(ms.series != null, `Series: close the switch, take a reading${ms.series != null ? ` (${f2(ms.series)} A)` : ''}`)}
          ${li(ms.sBreak, 'Series: unscrew one bulb - watch the other')}
          ${li(ms.parallel != null, `Parallel: close the switch, take a reading${ms.parallel != null ? ` (${f2(ms.parallel)} A)` : ''}`)}
          ${li(ms.pBreak, 'Parallel: unscrew one bulb - watch the other')}${li(false, 'Answer the questions')}</ul>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('circuit');
    const all = _discs();
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  // ── The palette under the board ──
  function _renderPalette() {
    const c = $('lab-circuit-palette');
    if (!c) return;
    const C = D(), P = _primary();
    // Grades 4/6: a bigger picture and no symbol (Grade 4 has no symbols at all).
    const btn = t => {
      const K = C.KINDS[t], T = TOOL_INFO[t];
      const inner = K ? `<span class="lab-circuit-tool-top${P ? ' is-big' : ''}"><span aria-hidden="true">${K.icon}</span>${P ? '' : C.SYMBOL[t]}</span><b>${esc(K.name)}</b>`
                      : `<span class="lab-circuit-tool-top${P ? ' is-big' : ''}"><span aria-hidden="true">${T.icon}</span></span><b>${esc(T.name)}</b>`;
      return `<button type="button" class="lab-circuit-tool" data-tool="${t}" aria-pressed="${_tool === t}" title="${esc(K ? (P ? _job(t) : K.meta) : T.meta)}">${inner}</button>`;
    };
    c.innerHTML = `<div class="lab-circuit-palette" role="toolbar" aria-label="Parts and tools">${C.toolsFor(_g()).map(btn).join('')}</div>
    ${P ? `<p class="lab-hint lab-circuit-phint"><b>Things to test:</b> put one in a gap, then close the switch.</p>
    <div class="lab-circuit-palette" role="toolbar" aria-label="Things to test">${C.TEST_OBJECTS.map(btn).join('')}</div>` : ''}
    <p class="lab-hint lab-circuit-phint">${_tool === 'hand' ? '✋ Tap a switch, a bulb or a cell on the board to use it.' : _tool === 'eraser' ? '🧽 Tap a part on the board to remove it.' : `Now tap a space on the board to place the ${esc(toolName(_tool).toLowerCase())}.`} <span class="lab-circuit-drag">With a mouse you can also drag a part onto the board.</span></p>`;
    _root && _root.querySelectorAll('.lab-circuit-kind').forEach(b => b.classList.toggle('is-on', b.dataset.tool === _tool));
    _highlight();
  }

  function _renderSlots() {
    const box = $('lab-circuit-slots');
    if (!box) return;
    const C = D();
    box.classList.toggle('is-placing', _tool !== 'hand');
    box.querySelectorAll('[data-slot]').forEach(b => {
      const id = b.dataset.slot, p = _layout[id], S = C.SLOTS[id];
      b.classList.toggle('is-empty', !p);
      let what = 'empty';
      if (p) {
        what = C.KINDS[p.kind].name.toLowerCase();
        if (p.kind === 'switch') what += p.open ? ', open' : ', closed';
        if (p.kind === 'bulb') what += p.blown ? ', blown' : p.out ? ', unscrewed' : _sol && _sol.bulbs[id] && _sol.bulbs[id].lit ? `, lit (${C.brightnessWord(_sol.bulbs[id].brightness)})` : ', off';
        if (p.kind === 'fuse' && p.blown) what += ', melted';
        if ((p.kind === 'ammeter' || p.kind === 'voltmeter') && _sol && _sol.meters[id]) what += `, reading ${_meterText(p.kind, _sol.meters[id].value)}`;
      }
      b.setAttribute('aria-label', `${S.name}: ${what}`);
    });
  }

  function _meterText(kind, v) {
    const C = D();
    if (_sol && _sol.short && v > C.FS[kind]) return 'off the scale';
    return kind === 'ammeter' ? f2(v) + ' A' : f2(v) + ' V';
  }

  function _paint() {
    _renderSlots();
    _readouts();
    _refresh();
    _draw(0);
  }

  function _intro() {
    const first = _mine(D().GUIDES)[0];
    if (_primary()) {
      _ov(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">💡</p>
        <h2 id="lab-ov-title">Welcome to the Circuit Board</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will show you how to light a bulb, one tap at a time.</li>
          <li><b>Build.</b> Pick a part under the board: a wire, a cell, a bulb or a switch. Then tap a space to put it there.</li>
          <li><b>Switch on.</b> Tap the switch with ✋ to close it. The moving dots show electricity flowing.</li>
          <li><b>Test things.</b> Put a spoon, a coin or a ruler in a gap. Does the bulb light?</li>
          <li><b>Stay safe.</b> The ⚠️ buttons show why sockets, wet hands and split cables are dangerous. Our cells are safe.</li>
          <li><b>Earn stars.</b> Missions end with questions. There are ${_discs().length} discoveries to collect.</li>
        </ul>
        <p class="lab-hint">Tap 🔊 next to my words and I will read them to you.</p>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('circuit'); st[_introKey()] = true; Labs.persist();
        _coach('Pick a part under the board, then tap a space to put it there. Or start a guided experiment below.');
      } });
      return;
    }
    const done = () => { const st = Labs.store('circuit'); st[_introKey()] = true; Labs.persist(); };
    if (_is7()) {
      _ov(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">💡</p>
        <h2 id="lab-ov-title">Welcome to the Circuit Board</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through a circuit and its symbols, one tap at a time.</li>
          <li><b>Build.</b> Pick a part under the board - a wire, a cell, a lamp, a switch, a resistor or a meter - then tap a space between two points.</li>
          <li><b>Read the symbols.</b> ✏️ at the top redraws your circuit as a circuit diagram, with the standard symbols.</li>
          <li><b>Measure.</b> An ammeter goes IN the loop; a voltmeter goes ACROSS a part. 📝 records what they read.</li>
          <li><b>Stay safe.</b> A short circuit gets hot. The ⚠️ buttons show why sockets, wet hands and split cables are dangerous.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. There are ${_discs().length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => { done(); _coach('Pick a part under the board, then tap a space to place it - or start a guided experiment below.'); } });
      return;
    }
    _ov(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">💡</p>
        <h2 id="lab-ov-title">Welcome to the Circuit Board</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through lighting your first bulb, one tap at a time.</li>
          <li><b>Build.</b> Pick a part under the board - a wire, a cell, a bulb, a switch, a meter - then tap a space between two points to place it.</li>
          <li><b>Switch on.</b> Tap a switch with ✋ to close it. The moving dots show the current; bulbs glow as brightly as the maths says.</li>
          <li><b>Draw it like the exam.</b> ✏️ at the top shows your circuit with standard symbols.</li>
          <li><b>Get it wrong safely.</b> Make a short circuit or put a meter in the wrong place and see what would really happen. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${_discs().length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('circuit'); st[_introKey()] = true; Labs.persist();
        _coach('Pick a part under the board, then tap a space to place it - or start a guided experiment below.');
      } });
  }

  // Grades 4/6: the words a 9-11-year-old needs, and the safety rules.
  function _helpP() {
    const C = D(), g = _g();
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Circuit Board works</h2>
      <div class="lab-help">
        <section><h3>Using the board</h3><ul>
          <li>Pick a part under the board, then tap a space between two points.</li>
          <li>✋ Hand: tap a switch to open or close it, a bulb to unscrew it, a cell to turn it round.</li>
          <li>🧽 Remove takes a part off. ↩️ Undo takes back your last move.</li>
          <li>To test a thing, put it in a gap in the circuit and close the switch.</li></ul></section>
        <section><h3>Words to know</h3><ul>
          <li><b>Circuit</b>: a complete loop that electricity flows round.</li>
          <li><b>Cell</b>: gives the circuit its energy. A battery is one or more cells.</li>
          <li><b>Switch</b>: opens and closes a gap in the circuit.</li>
          <li><b>Conductor</b>: a material that lets electricity pass, like metal.</li>
          <li><b>Insulator</b>: a material that stops electricity, like plastic, rubber or wood.</li>
          <li><b>Short circuit</b>: a short cut round the bulb. It makes the wire hot.</li></ul></section>
        ${C.symbolsFor(g) ? `<section><h3>Symbols (an extra)</h3><p class="lab-hint">You will use these at secondary school. They are beyond the PSAC syllabus.</p>
          <div class="lab-table-wrap"><table class="lab-table lab-circuit-symtable"><thead><tr><th scope="col">Part</th><th scope="col">Symbol</th></tr></thead>
          <tbody>${C.kindsFor(g).map(k => `<tr><td>${C.KINDS[k].icon} ${esc(C.KINDS[k].name)}</td><td class="lab-circuit-symcell">${C.SYMBOL[k]}</td></tr>`).join('')}</tbody></table></div></section>` : ''}
        <section><h3>Stay safe</h3><ul>
          <li>The cells in this lab are safe to touch, even with wet hands.</li>
          <li>Mains electricity from a socket is not. Never push anything into a socket.</li>
          <li>Never touch a switch or a plug with wet hands.</li>
          <li>Never touch a split or damaged cable. Ask an adult.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the board</button></div>`,
      { cls: 'is-help' });
  }

  // Grade 7: the parts, their symbols and the words - no Q = It, W = QV or V = IR.
  function _help7() {
    const C = D();
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Circuit Board works</h2>
      <div class="lab-help">
        <section><h3>Using the board</h3><ul>
          <li>Pick a part under the board, then tap a space between two points. Tap a filled space to swap its part.</li>
          <li>✋ Hand: tap a switch to open or close it, a lamp to unscrew it, a cell to turn it round.</li>
          <li>🧽 Remove takes a part off. ↩️ Undo takes back your last move.</li>
          <li>📝 Take a reading records the meters in your notebook. ✏️ at the top redraws the board as a circuit diagram.</li></ul></section>
        <section><h3>Circuit symbols</h3>
          <div class="lab-table-wrap"><table class="lab-table lab-circuit-symtable"><thead><tr><th scope="col">Part</th><th scope="col">Symbol</th><th scope="col">What it does</th></tr></thead>
          <tbody>${C.kindsFor(7).map(k => `<tr><td>${C.KINDS[k].icon} ${esc(C.KINDS[k].name)}</td><td class="lab-circuit-symcell">${C.SYMBOL[k]}</td><td>${esc(_job(k))}</td></tr>`).join('')}</tbody></table></div></section>
        <section><h3>Words to know</h3><ul>
          <li><b>Current</b>: the flow of electricity round a circuit. It is measured in amperes (A) with an ammeter.</li>
          <li><b>Voltage</b>: the push from the cell that drives the current. It is measured in volts (V) with a voltmeter.</li>
          <li><b>Resistance</b>: how much a part opposes the current. It is measured in ohms (Ω).</li>
          <li><b>Series</b>: parts one after another in a single loop. <b>Parallel</b>: parts side by side, each on its own branch.</li>
          <li><b>Conductor</b>: a material that lets a current through, like copper. <b>Insulator</b>: one that stops it, like plastic.</li></ul></section>
        <section><h3>The rules</h3><ul>
          <li>A lamp lights only in a complete (closed) circuit.</li>
          <li>Series: one path, so one break stops everything; the lamps share the voltage.</li>
          <li>Parallel: each branch has its own path and the full voltage, so it works on its own.</li>
          <li>Ammeter IN SERIES. Voltmeter ACROSS the part.</li>
          <li>Cells in series add their voltages: 1.5 V + 1.5 V = 3 V.</li></ul></section>
        <section><h3>Safety</h3><ul>
          <li>Never join the two ends of a cell with just a wire - a short circuit makes the wire and the cell hot.</li>
          <li>Never experiment with mains sockets (230 V in Mauritius), and never touch a switch or a plug with wet hands.</li>
          <li>Never touch a split or damaged cable. Tell an adult.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the board</button></div>`,
      { cls: 'is-help' });
  }

  function _help() {
    if (_primary()) { _helpP(); return; }
    if (_is7()) { _help7(); return; }
    const C = D();
    _ov(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Circuit Board works</h2>
      <div class="lab-help">
        <section><h3>Using the board</h3><ul>
          <li>Pick a part under the board, then tap a space between two points. Tap a filled space to swap its part.</li>
          <li>✋ Hand: tap a switch to open or close it, a bulb to unscrew it, a cell to turn it round.</li>
          <li>🧽 Remove takes a part off. ↩️ Undo takes back your last move.</li>
          <li>📝 Take a reading records the meters in your notebook. ✏️ at the top shows the circuit diagram.</li></ul></section>
        <section><h3>Components and symbols</h3>
          <div class="lab-table-wrap"><table class="lab-table lab-circuit-symtable"><thead><tr><th scope="col">Part</th><th scope="col">Symbol</th><th scope="col">What it does</th></tr></thead>
          <tbody>${Object.keys(C.KINDS).map(k => `<tr><td>${C.KINDS[k].icon} ${esc(C.KINDS[k].name)}</td><td class="lab-circuit-symcell">${C.SYMBOL[k]}</td><td>${esc(C.KINDS[k].job)}</td></tr>`).join('')}</tbody></table></div></section>
        <section><h3>The rules</h3><ul>
          <li>A bulb lights only in a complete (closed) circuit.</li>
          <li>Series: one path. The current is the same everywhere; the voltages add up to the supply.</li>
          <li>Parallel: each branch has the full voltage and works on its own.</li>
          <li>Ammeter IN SERIES. Voltmeter ACROSS the component.</li>
          <li>Cells in series add: 1.5 V + 1.5 V = 3 V.</li></ul></section>
        <section><h3>The formulas</h3>
          <p class="lab-eq">Q = It   (charge = current × time)</p>
          <p class="lab-eq">W = QV   (energy = charge × potential difference)</p>
          <p class="lab-eq">V = IR   (resistance = voltage ÷ current)</p>
          <p class="lab-hint">On this board every bulb is 3 Ω and every cell 1.5 V, so one bulb on one cell takes 0.5 A.</p></section>
        <section><h3>Safety</h3><ul>
          <li>Never connect a wire straight across a cell - a short circuit makes the wire and the cell hot.</li>
          <li>Never experiment with mains sockets (230 V in Mauritius), and never touch a switch or plug with wet hands.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the board</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_sol) return;
    const C = D(), s = _sol;
    const sw = Object.keys(_layout).filter(k => _layout[k].kind === 'switch');
    const swText = !sw.length ? 'no switch' : sw.every(k => _layout[k].open) ? 'switch open' : 'switch closed';
    const chip = $('lab-circuit-chip');
    const P = _primary();
    if (chip) chip.innerHTML = `${s.flowing ? (P ? '⚡ Electricity flowing' : '⚡ Current flowing') : s.short ? '🔥 Short circuit' : (P ? '○ No electricity flowing' : '○ No current')} <small>${s.cells} cell${s.cells === 1 ? '' : 's'} · ${swText}</small>`;
    const st = $('lab-circuit-status');
    if (st) {
      const chips = [];
      const amm = Object.keys(s.meters).filter(k => s.meters[k].kind === 'ammeter');
      if (s.short) chips.push('<span class="lab-chip is-danger">🔥 Wire hot!</span>');
      else if (s.flowing && amm.length && !_is7()) chips.push(`<span class="lab-chip">⏱️ ${Math.floor(_t)} s</span>`);
      else if (P && s.flowing && _t >= 10 - 1e-9 && C.litBulbs(s).length) chips.push('<span class="lab-chip">🔥 Bulb warm</span>');
      st.innerHTML = chips.join('');
    }
    const c = $('lab-circuit-contents');
    if (c) {
      const ms = Object.keys(s.meters).sort().map(k => `${s.meters[k].kind === 'ammeter' ? 'Ammeter' : 'Voltmeter'} ${_meterText(s.meters[k].kind, s.meters[k].value)}`);
      const amm = Object.keys(s.meters).filter(k => s.meters[k].kind === 'ammeter');
      if (ms.length) {
        let txt = ms.join(' · ');
        if (s.flowing && amm.length && _t >= 1 && !_is7()) txt += ` · Q = It = ${f1(C.charge(C.round2(s.meters[amm[0]].value), Math.floor(_t)))} C`;
        c.textContent = txt;
      } else {
        const n = {};
        Object.values(_layout).forEach(p => { n[p.kind] = (n[p.kind] || 0) + 1; });
        const bits = Object.keys(C.KINDS).filter(k => n[k]).map(k => `${n[k]} ${C.KINDS[k].name.toLowerCase()}${n[k] > 1 ? 's' : ''}`);
        c.textContent = bits.length ? 'On the board: ' + bits.join(' · ') : 'The board is empty - pick a part below and tap a space.';
      }
    }
    if (_cv) {
      const lit = C.litBulbs(s).length;
      _cv.setAttribute('aria-label', `A circuit board in ${_view === 'symbols' ? 'circuit-diagram' : 'picture'} view: ${Object.keys(_layout).length} parts, ${lit} bulb${lit === 1 ? '' : 's'} lit, ${s.flowing ? 'current flowing' : 'no current'}.`);
    }
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, slot) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.6, done, slot });
  }

  // ══ Drawing ══════════════════════════════════
  const COL = { board: '#E6D3A8', board2: '#D4BA87', hole: 'rgba(90,70,40,0.55)', peg: '#B8913F', pegHi: '#E9CD7E',
                wire: '#C62828', wireHi: 'rgba(255,170,160,0.8)', paper: '#FBFAF4', grid: 'rgba(40,70,100,0.07)', ink: '#18222C',
                dot: '#FFE082', dotEdge: 'rgba(90,60,0,0.7)', dotSym: '#1E88E5', empty: 'rgba(60,50,30,0.22)' };

  function _draw(dt) {
    if (!_cx || !_sol) return;
    const c = _cx, g = _geom(), C = D(), sym = _view === 'symbols';
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (sym) {
      c.fillStyle = COL.paper; c.fillRect(0, 0, _W, _H);
      c.strokeStyle = COL.grid; c.lineWidth = 1;
      for (let x = 0; x < _W; x += 16) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, _H); c.stroke(); }
      for (let y = 0; y < _H; y += 16) { c.beginPath(); c.moveTo(0, y); c.lineTo(_W, y); c.stroke(); }
    } else {
      const bg = c.createLinearGradient(0, 0, 0, _H);
      bg.addColorStop(0, COL.board); bg.addColorStop(1, COL.board2);
      c.fillStyle = bg; c.fillRect(0, 0, _W, _H);
      c.fillStyle = 'rgba(90,70,40,0.12)';
      for (let x = 10; x < _W; x += 14) for (let y = 10; y < _H; y += 14) { c.beginPath(); c.arc(x, y, 1.1, 0, Math.PI * 2); c.fill(); }
    }
    // empty spaces: a faint dotted line between the two points
    c.setLineDash([3, 5]); c.strokeStyle = COL.empty; c.lineWidth = 1.5;
    for (const id of Object.keys(C.SLOTS)) {
      if (_layout[id]) continue;
      const s = C.SLOTS[id], a = g.pt(s.a), b = g.pt(s.b);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    }
    c.setLineDash([]);
    const parts = Object.keys(_layout).filter(id => C.SLOTS[id]);
    // leads and wires
    for (const id of parts) _drawLeads(g, id, sym);
    // short-circuit glow
    if (_sol.short) {
      const hot = C.diagnose(_layout, _sol).hot, pulse = Labs.calm() ? 1 : 0.7 + 0.3 * Math.sin(_clock * 9);
      for (const id of hot) {
        const s = C.SLOTS[id], a = g.pt(s.a), b = g.pt(s.b);
        c.strokeStyle = `rgba(255,80,20,${0.45 * pulse})`; c.lineWidth = 14; c.lineCap = 'round';
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
        c.strokeStyle = `rgba(255,200,60,${0.8 * pulse})`; c.lineWidth = 4;
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
      }
    }
    _drawDots(g, sym);
    for (const id of parts) if (_layout[id].kind !== 'wire') _drawBody(g, id, sym);
    if (_primary() && _sol.flowing && _t >= 10 - 1e-9) _drawHeat(g);
    _drawNodes(g, sym);
    _drawFx(dt, g);
    c.restore();
  }

  function _ends(g, id) {
    const s = D().SLOTS[id], A = g.pt(s.a), B = g.pt(s.b);
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [(B[0] - A[0]) / L, (B[1] - A[1]) / L];
    const half = Math.min(L * 0.3, 30);
    return { s, A, B, L, u, half, mid: [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], ang: Math.atan2(u[1], u[0]) };
  }
  function _line(a, b, col, w) {
    const c = _cx;
    c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round';
    c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
  }
  function _drawLeads(g, id, sym) {
    const p = _layout[id], e = _ends(g, id);
    // A thing being tested: the leads (the tester's clips) reach right up to it.
    const inner = D().OBJECTS[p.kind] ? (sym ? 14 : p.kind === 'coin' ? 11 : e.half * 0.85) : e.half;
    const segs = p.kind === 'wire' ? [[e.A, e.B]]
      : [[e.A, [e.mid[0] - e.u[0] * inner, e.mid[1] - e.u[1] * inner]], [[e.mid[0] + e.u[0] * inner, e.mid[1] + e.u[1] * inner], e.B]];
    for (const [a, b] of segs) {
      if (sym) _line(a, b, COL.ink, 2.2);
      else { _line(a, b, COL.wire, 5); _line(a, b, COL.wireHi, 1.3); }
    }
  }

  // Charge dots, spaced along every part carrying a current, moving from + round to −.
  function _drawDots(g, sym) {
    const c = _cx, short = _sol.short;
    for (const el of _sol.els) {
      const I = Math.abs(el.I);
      if (I < 1e-3 || el.kind === 'voltmeter') continue;
      const e = _ends(g, el.slot), sp = 18;
      const speed = short ? 260 : 26 + 80 * Math.min(I, 1.5);
      const off = (_clock * speed) % sp;
      const from = el.I >= 0 ? e.A : e.B, to = el.I >= 0 ? e.B : e.A;
      const dx = (to[0] - from[0]) / e.L, dy = (to[1] - from[1]) / e.L;
      c.fillStyle = short ? '#FF7043' : sym ? COL.dotSym : COL.dot;
      c.strokeStyle = sym ? 'rgba(255,255,255,0.9)' : COL.dotEdge; c.lineWidth = 1;
      for (let d = off; d < e.L; d += sp) {
        c.beginPath(); c.arc(from[0] + dx * d, from[1] + dy * d, 2.6, 0, Math.PI * 2); c.fill(); c.stroke();
      }
    }
  }

  function _drawNodes(g, sym) {
    const c = _cx, C = D(), count = new Array(C.NODES).fill(0);
    Object.keys(_layout).forEach(id => { const s = C.SLOTS[id]; if (s) { count[s.a]++; count[s.b]++; } });
    for (let n = 0; n < C.NODES; n++) {
      const [x, y] = g.pt(n);
      if (sym) {
        if (count[n] >= 3) { c.fillStyle = COL.ink; c.beginPath(); c.arc(x, y, 3.6, 0, Math.PI * 2); c.fill(); }
        else if (!count[n]) { c.fillStyle = 'rgba(24,34,44,0.25)'; c.beginPath(); c.arc(x, y, 2, 0, Math.PI * 2); c.fill(); }
      } else if (count[n]) {
        c.fillStyle = COL.peg; c.beginPath(); c.arc(x, y, 5.5, 0, Math.PI * 2); c.fill();
        c.fillStyle = COL.pegHi; c.beginPath(); c.arc(x - 1.5, y - 1.5, 2, 0, Math.PI * 2); c.fill();
      } else {
        c.fillStyle = COL.hole; c.beginPath(); c.arc(x, y, 3.2, 0, Math.PI * 2); c.fill();
      }
    }
  }

  function _text(t, x, y, font, col, align) {
    const c = _cx;
    c.font = font; c.fillStyle = col; c.textAlign = align || 'center'; c.textBaseline = 'middle';
    c.fillText(t, x, y);
    c.textBaseline = 'alphabetic';
  }

  function _drawBody(g, id, sym) {
    const c = _cx, C = D(), p = _layout[id], e = _ends(g, id), h = e.half;
    const bulb = _sol.bulbs[id], meter = _sol.meters[id];
    const elongated = p.kind === 'cell' || p.kind === 'switch' || p.kind === 'resistor' || p.kind === 'fuse' || !!C.OBJECTS[p.kind];
    // a glow under a lit bulb, in both views
    if (p.kind === 'bulb' && bulb && bulb.lit) {
      const bb = Math.min(4, bulb.brightness), r = 14 + 20 * Math.sqrt(bb);
      const gl = c.createRadialGradient(e.mid[0], e.mid[1], 2, e.mid[0], e.mid[1], r);
      gl.addColorStop(0, `rgba(255,236,140,${Math.min(0.95, 0.35 + 0.3 * bb)})`); gl.addColorStop(1, 'rgba(255,220,90,0)');
      c.fillStyle = gl; c.beginPath(); c.arc(e.mid[0], e.mid[1], r, 0, Math.PI * 2); c.fill();
    }
    c.save();
    c.translate(e.mid[0], e.mid[1]);
    if (elongated) c.rotate(e.ang);
    const ps = p.flip ? -1 : 1;   // local +x points at the slot's b end
    if (sym) {
      c.strokeStyle = COL.ink; c.fillStyle = COL.ink; c.lineWidth = 2.2; c.lineCap = 'round';
      const lead = (x0, x1) => { c.beginPath(); c.moveTo(x0, 0); c.lineTo(x1, 0); c.stroke(); };
      switch (p.kind) {
        case 'cell':
          lead(-h, -4); lead(4, h);
          c.fillStyle = COL.paper; c.fillRect(-3.5, -14, 7, 28);
          c.lineWidth = 2.2; c.beginPath(); c.moveTo(4 * ps, -13); c.lineTo(4 * ps, 13); c.stroke();
          c.lineWidth = 5; c.beginPath(); c.moveTo(-4 * ps, -7); c.lineTo(-4 * ps, 7); c.stroke();
          break;
        case 'switch':
          lead(-h, -11); lead(11, h);
          c.beginPath(); c.arc(-11, 0, 2.6, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(11, 0, 2.6, 0, Math.PI * 2); c.fill();
          c.beginPath(); c.moveTo(-11, 0); c.lineTo(p.open ? 8 : 11, p.open ? -11 : 0); c.stroke();
          break;
        case 'resistor':
          lead(-h, -14); lead(14, h); c.fillStyle = COL.paper; c.fillRect(-14, -6, 28, 12); c.strokeRect(-14, -6, 28, 12);
          break;
        case 'fuse':
          c.fillStyle = COL.paper; c.fillRect(-14, -5, 28, 10); c.strokeRect(-14, -5, 28, 10);
          if (p.blown) { lead(-h, -4); lead(4, h); } else lead(-h, h);
          break;
        case 'bulb': {
          c.fillStyle = bulb && bulb.lit ? 'rgba(255,238,150,0.85)' : COL.paper;
          c.strokeStyle = p.blown ? '#8A8F94' : COL.ink;
          c.beginPath(); c.arc(0, p.out ? -8 : 0, 12, 0, Math.PI * 2); c.fill();
          if (p.out) c.setLineDash([3, 3]);
          c.stroke(); c.setLineDash([]);
          const k = 8.4, oy = p.out ? -8 : 0;
          c.beginPath(); c.moveTo(-k, oy - k); c.lineTo(k, oy + k); c.moveTo(k, oy - k); c.lineTo(-k, oy + k); c.stroke();
          break;
        }
        case 'ammeter': case 'voltmeter':
          c.fillStyle = COL.paper; c.beginPath(); c.arc(0, 0, 12, 0, Math.PI * 2); c.fill(); c.stroke();
          _text(p.kind === 'ammeter' ? 'A' : 'V', 0, 1, '700 13px system-ui, sans-serif', COL.ink);
          break;
        default: if (C.OBJECTS[p.kind]) _drawObj(p.kind, h, true);
      }
    } else {
      switch (p.kind) {
        case 'cell': {
          c.fillStyle = '#263238'; c.beginPath(); c.roundRect ? c.roundRect(-h, -11, 2 * h, 22, 4) : c.rect(-h, -11, 2 * h, 22); c.fill();
          c.fillStyle = '#C9A227'; c.fillRect(ps > 0 ? h - 9 : -h, -11, 9, 22);
          c.fillRect(ps > 0 ? h : -h - 4, -5, 4, 10);
          break;
        }
        case 'switch':
          c.fillStyle = '#8D6E63'; c.fillRect(-h, -7, 2 * h, 14);
          c.fillStyle = '#C9A227'; c.beginPath(); c.arc(-h + 7, 0, 4, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(h - 7, 0, 4, 0, Math.PI * 2); c.fill();
          c.save(); c.translate(-h + 7, 0); c.rotate(p.open ? -0.6 : 0);
          c.strokeStyle = '#B0BEC5'; c.lineWidth = 4; c.lineCap = 'round';
          c.beginPath(); c.moveTo(0, 0); c.lineTo(2 * h - 14, 0); c.stroke();
          c.fillStyle = '#37474F'; c.beginPath(); c.arc(2 * h - 16, 0, 3.5, 0, Math.PI * 2); c.fill();
          c.restore();
          break;
        case 'resistor':
          c.fillStyle = '#E8D2A6'; c.strokeStyle = '#8D6E63'; c.lineWidth = 1;
          c.beginPath(); c.roundRect ? c.roundRect(-h * 0.8, -7, 1.6 * h, 14, 6) : c.rect(-h * 0.8, -7, 1.6 * h, 14); c.fill(); c.stroke();
          [['#F57C00', -9], ['#111', -3], ['#D4AF37', 5]].forEach(([col, x]) => { c.fillStyle = col; c.fillRect(x, -7, 3, 14); });
          break;
        case 'fuse':
          c.fillStyle = 'rgba(220,236,246,0.9)'; c.strokeStyle = '#78909C'; c.lineWidth = 1;
          c.fillRect(-h * 0.8, -6, 1.6 * h, 12); c.strokeRect(-h * 0.8, -6, 1.6 * h, 12);
          c.fillStyle = '#B0BEC5'; c.fillRect(-h * 0.8 - 3, -7, 6, 14); c.fillRect(h * 0.8 - 3, -7, 6, 14);
          c.strokeStyle = p.blown ? '#5D4037' : '#8D6E63'; c.lineWidth = 1.2;
          if (p.blown) { c.beginPath(); c.moveTo(-h * 0.8, 0); c.lineTo(-3, 1); c.moveTo(3, -1); c.lineTo(h * 0.8, 0); c.stroke(); c.fillStyle = 'rgba(60,40,30,0.35)'; c.beginPath(); c.arc(0, 0, 5, 0, Math.PI * 2); c.fill(); }
          else { c.beginPath(); c.moveTo(-h * 0.8, 0); c.lineTo(h * 0.8, 0); c.stroke(); }
          break;
        case 'bulb': {
          const oy = p.out ? -12 : -5;
          c.fillStyle = '#607D8B'; c.fillRect(-12, 5, 24, 9);
          if (p.out) { c.fillStyle = '#263238'; c.fillRect(-6, 5, 12, 3); }
          const lit = bulb && bulb.lit, bb = lit ? Math.min(1, bulb.brightness) : 0;
          c.fillStyle = p.blown ? 'rgba(110,110,110,0.75)' : lit ? `rgba(255,236,150,${0.55 + 0.4 * bb})` : 'rgba(236,243,247,0.9)';
          c.strokeStyle = '#90A4AE'; c.lineWidth = 1.2;
          c.beginPath(); c.arc(0, oy - 4, 12, 0, Math.PI * 2); c.fill(); c.stroke();
          c.strokeStyle = p.blown ? '#3E2723' : lit ? '#FF8F00' : '#6D4C41'; c.lineWidth = 1.4;
          c.beginPath();
          if (p.blown) { c.moveTo(-5, oy); c.lineTo(-2, oy - 5); c.moveTo(2, oy - 6); c.lineTo(5, oy); }
          else { c.moveTo(-5, oy); c.lineTo(-3, oy - 6); c.lineTo(-1, oy); c.lineTo(1, oy - 6); c.lineTo(3, oy); c.lineTo(5, oy - 6); }
          c.stroke();
          break;
        }
        case 'ammeter': case 'voltmeter': {
          const FS = C.FS[p.kind], v = meter ? meter.value : 0, frac = Math.min(1.08, v / FS);
          c.fillStyle = '#FAFAF5'; c.strokeStyle = '#37474F'; c.lineWidth = 1.4;
          c.beginPath(); c.roundRect ? c.roundRect(-20, -18, 40, 36, 6) : c.rect(-20, -18, 40, 36); c.fill(); c.stroke();
          c.strokeStyle = '#90A4AE'; c.lineWidth = 1; c.beginPath(); c.arc(0, 6, 15, Math.PI * 1.15, Math.PI * 1.85); c.stroke();
          const a = Math.PI * (1.15 + 0.7 * frac);
          c.strokeStyle = _sol.short && v > FS ? '#D32F2F' : '#C62828'; c.lineWidth = 1.6;
          c.beginPath(); c.moveTo(0, 6); c.lineTo(Math.cos(a) * 14, 6 + Math.sin(a) * 14); c.stroke();
          _text(p.kind === 'ammeter' ? 'A' : 'V', 0, 11, '800 10px system-ui, sans-serif', '#37474F');
          break;
        }
        default: if (C.OBJECTS[p.kind]) _drawObj(p.kind, h, false);
      }
    }
    c.restore();
    // labels, always upright
    if (p.kind === 'cell') {
      const px = e.mid[0] + e.u[0] * ps * (h - 4), py = e.mid[1] + e.u[1] * ps * (h - 4);
      if (sym) _text('+', e.mid[0] + e.u[0] * ps * 10 + (e.s.dir === 'h' ? 0 : 12), e.mid[1] + e.u[1] * ps * 10 + (e.s.dir === 'h' ? -16 : 0), '800 11px system-ui, sans-serif', COL.ink);
      else {
        _text('+', px, py, '800 12px system-ui, sans-serif', '#1B1B1B');
        _text('1.5V', e.mid[0] - e.u[0] * ps * 4, e.mid[1] - e.u[1] * ps * 4, '700 8px system-ui, sans-serif', '#ECEFF1');
      }
    }
    if (meter) {
      const txt = _meterText(p.kind, meter.value);
      const [ox, oy] = sym ? (e.s.dir === 'h' ? [0, 24] : [30, 0]) : [0, e.s.dir === 'h' ? 28 : 0];
      if (!sym && e.s.dir === 'v') _text(txt, e.mid[0], e.mid[1] - 4, '800 9px system-ui, sans-serif', '#1B2A24');
      else if (!sym) { _pill(txt, e.mid[0] + ox, e.mid[1] + oy); }
      else _pill(txt, e.mid[0] + ox, e.mid[1] + oy);
    }
    if (p.kind === 'bulb' && (p.blown || p.out)) {
      const [ox, oy] = e.s.dir === 'h' ? [0, 26] : [30, 0];
      _pill(p.blown ? 'blown' : 'unscrewed', e.mid[0] + ox, e.mid[1] + oy);
    }
    // No standard symbol exists for "a thing being tested": its picture sits in a box.
    if (sym && C.OBJECTS[p.kind]) _text(C.OBJECTS[p.kind].icon, e.mid[0], e.mid[1] + 1, '13px system-ui, sans-serif', COL.ink);
  }

  // Grades 4/6: the things to test, drawn along the slot (local x runs along it).
  function _drawObj(k, h, sym) {
    const c = _cx;
    if (sym) { c.fillStyle = COL.paper; c.strokeStyle = COL.ink; c.lineWidth = 1.6; c.fillRect(-14, -10, 28, 20); c.strokeRect(-14, -10, 28, 20); return; }
    switch (k) {
      case 'spoon':
        c.fillStyle = '#B0BEC5'; c.strokeStyle = '#78909C'; c.lineWidth = 1;
        c.beginPath(); c.ellipse(-h * 0.55, 0, 9, 7, 0, 0, Math.PI * 2); c.fill(); c.stroke();
        c.fillRect(-h * 0.55 + 8, -2, h * 1.4 - 8, 4);
        break;
      case 'coin':
        c.fillStyle = '#D4A537'; c.strokeStyle = '#8D6E1F'; c.lineWidth = 1.4;
        c.beginPath(); c.arc(0, 0, 11, 0, Math.PI * 2); c.fill(); c.stroke();
        c.beginPath(); c.arc(0, 0, 7.5, 0, Math.PI * 2); c.stroke();
        break;
      case 'lead':
        c.fillStyle = '#37474F'; c.fillRect(-h * 0.85, -2.5, h * 1.7, 5);
        c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(-h * 0.85, -2.5, h * 1.7, 1.4);
        break;
      case 'rubber':
        c.fillStyle = '#F48FB1'; c.fillRect(-14, -7, 16, 14);
        c.fillStyle = '#64B5F6'; c.fillRect(2, -7, 12, 14);
        c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 1; c.strokeRect(-14, -7, 28, 14);
        break;
      case 'ruler':
        c.fillStyle = 'rgba(144,202,249,0.9)'; c.strokeStyle = '#5C8FB8'; c.lineWidth = 1;
        c.fillRect(-h * 0.85, -6, h * 1.7, 12); c.strokeRect(-h * 0.85, -6, h * 1.7, 12);
        c.strokeStyle = '#2F5C80';
        for (let i = 0, x = -h * 0.8; x < h * 0.82; i++, x += 5) { c.beginPath(); c.moveTo(x, -6); c.lineTo(x, i % 2 ? -3 : 0); c.stroke(); }
        break;
      case 'stick':
        c.fillStyle = '#A1887F'; c.fillRect(-h * 0.85, -4, h * 1.7, 8);
        c.strokeStyle = '#6D4C41'; c.lineWidth = 0.8;
        c.beginPath(); c.moveTo(-h * 0.75, -1); c.lineTo(h * 0.55, -1); c.moveTo(-h * 0.45, 2); c.lineTo(h * 0.75, 2); c.stroke();
        break;
    }
  }

  // Grades 4/6: heat rising off a bulb that has been on for 10 s (still, in Calm Mode).
  function _drawHeat(g) {
    const c = _cx, C = D(), ph = Labs.calm() ? 0 : _clock * 4;
    c.strokeStyle = 'rgba(230,90,30,0.75)'; c.lineWidth = 2; c.lineCap = 'round';
    for (const k of C.litBulbs(_sol)) {
      const [x, y] = _slotMid(g, C.SLOTS[k]);
      for (let i = -1; i <= 1; i++) {
        c.beginPath();
        for (let j = 0; j <= 12; j++) {
          const yy = y - 24 - j * 1.8, xx = x + i * 9 + Math.sin(j * 0.7 + ph + i) * 2.5;
          if (j) c.lineTo(xx, yy); else c.moveTo(xx, yy);
        }
        c.stroke();
      }
    }
  }
  function _pill(t, x, y) {
    const c = _cx;
    c.font = '700 10px system-ui, sans-serif';
    const w = c.measureText(t).width + 10;
    const xx = Math.max(w / 2 + 2, Math.min(_W - w / 2 - 2, x));
    c.fillStyle = 'rgba(255,255,255,0.92)'; c.strokeStyle = 'rgba(0,0,0,0.25)'; c.lineWidth = 1;
    c.beginPath(); c.roundRect ? c.roundRect(xx - w / 2, y - 8, w, 16, 8) : c.rect(xx - w / 2, y - 8, w, 16); c.fill(); c.stroke();
    _text(t, xx, y, '700 10px system-ui, sans-serif', '#1B2A24');
  }

  function _drawFx(dt, g) {
    const c = _cx, C = D();
    for (let k = _fx.length - 1; k >= 0; k--) {
      const f = _fx[k];
      f.t += dt;
      const p = Math.min(1, f.t / f.dur);
      if (f.type === 'short') {
        const cell = Object.keys(_layout).find(id => _layout[id].kind === 'cell');
        const at = cell ? _slotMid(g, C.SLOTS[cell]) : [_W / 2, _H / 2];
        const gl = c.createRadialGradient(at[0], at[1], 0, at[0], at[1], 40 + 60 * p);
        gl.addColorStop(0, `rgba(255,140,50,${0.8 * (1 - p)})`); gl.addColorStop(1, 'rgba(255,80,20,0)');
        c.fillStyle = gl; c.fillRect(0, 0, _W, _H);
        for (let i = 0; i < 4; i++) {
          c.fillStyle = `rgba(90,90,90,${0.35 * (1 - p)})`;
          c.beginPath(); c.arc(at[0] + (i - 1.5) * 10, at[1] - 16 - 40 * p - i * 4, 6 + 8 * p, 0, Math.PI * 2); c.fill();
        }
        c.font = `800 ${Math.round(16 + 10 * p)}px system-ui, sans-serif`; c.textAlign = 'center';
        c.lineWidth = 4; c.strokeStyle = '#1B2A24'; c.strokeText('HOT!', at[0], at[1] - 26 - 14 * p);
        c.fillStyle = '#FF8C42'; c.fillText('HOT!', at[0], at[1] - 26 - 14 * p);
      } else if ((f.type === 'pop' || f.type === 'fuse') && f.slot && C.SLOTS[f.slot]) {
        const at = _slotMid(g, C.SLOTS[f.slot]), r = (f.type === 'pop' ? 50 : 30) * (0.3 + p);
        const gl = c.createRadialGradient(at[0], at[1], 0, at[0], at[1], r);
        gl.addColorStop(0, `rgba(255,255,255,${1 - p})`); gl.addColorStop(0.5, `rgba(255,210,80,${0.8 * (1 - p)})`); gl.addColorStop(1, 'rgba(255,160,40,0)');
        c.fillStyle = gl; c.beginPath(); c.arc(at[0], at[1], r, 0, Math.PI * 2); c.fill();
      }
      else if (f.type === 'zap') {
        // Mains, wet hands, a split cable: a flash and a lightning bolt before the card.
        const x = _W / 2, y = _H / 2, s = 1 + 0.4 * p;
        c.fillStyle = `rgba(255,250,200,${0.85 * (1 - p)})`; c.fillRect(0, 0, _W, _H);
        c.fillStyle = `rgba(255,200,0,${1 - 0.6 * p})`; c.strokeStyle = '#1B2A24'; c.lineWidth = 3; c.lineJoin = 'round';
        c.beginPath(); c.moveTo(x + 8 * s, y - 40 * s); c.lineTo(x - 14 * s, y + 4 * s); c.lineTo(x, y + 4 * s);
        c.lineTo(x - 8 * s, y + 40 * s); c.lineTo(x + 16 * s, y - 6 * s); c.lineTo(x + 2 * s, y - 6 * s); c.closePath(); c.fill(); c.stroke();
        c.font = `800 ${Math.round(18 + 8 * p)}px system-ui, sans-serif`; c.textAlign = 'center';
        c.lineWidth = 4; c.strokeText('DANGER!', x, y - 50 * s); c.fillStyle = '#E53935'; c.fillText('DANGER!', x, y - 50 * s);
      }
      if (f.t >= f.dur) { _fx.splice(k, 1); if (f.done) f.done(); }
    }
  }

  function _animate(dt) {
    if (!dt) return;
    if (!Labs.calm()) _clock += dt;
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
    _animate(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let k = 0; k < n; k++) _step(0.05); _readouts(); }
  function _debug() {
    const s = _sol || D().solve(_layout);
    const bulbs = {}, meters = {};
    Object.keys(s.bulbs).forEach(k => { bulbs[k] = { I: s.bulbs[k].I, V: s.bulbs[k].V, b: s.bulbs[k].brightness, lit: s.bulbs[k].lit }; });
    Object.keys(s.meters).forEach(k => { meters[k] = s.meters[k].value; });
    return { layout: JSON.parse(JSON.stringify(_layout)), view: _view, tool: _tool, t: _t, clock: _clock, busy: _busy, panel: _panel,
             cellI: s.cellI, short: s.short, flowing: s.flowing, arrangement: D().arrangement(s), bulbs, meters,
             guide: _guide && { id: _guide.id, step: _guide.step }, grade: _g(), tests: Object.assign({}, _tests),
             readings: _readings.map(r => ({ label: r.label, amps: r.amps, volts: r.volts, Q: r.Q })),
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, success: _mission.success, hazards: _mission.hazards, mistakes: _mission.mistakes,
                                    read: _mission.read, series: _mission.series, parallel: _mission.parallel, sBreak: _mission.sBreak, pBreak: _mission.pBreak,
                                    kind: _mission.kind, tested: Object.assign({}, _mission.tested) } };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, build, place, remove, tapSlot, toggleSwitch, setBulb, flip,
           read, setView, setTool, undo, clearBoard, danger: _danger, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabCircuit = LabCircuit;
