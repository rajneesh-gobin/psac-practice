'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Materials Tester (Science, PSAC Grade 4, Materials & Properties)
//
//  A tray of everyday objects and seven test stations: a magnet, a torch and
//  screen, a battery bulb tester, a bowl of water, a water drop, a bend test
//  and "Where from?". Tap a station, tap an object: the canvas animates the
//  test and the result goes in the notebook and on the sorting board. Plus
//  "Right material for the job", three Missions and a set of Discoveries.
//
//  ⚠ Every result, answer, hazard and question comes from lab_materials_data.js
//    (LabMaterialsData). This file only draws it. If a result looks wrong on
//    screen, fix the DATA, not the drawing.
//  ⚠ Grade 4 reading level (docs/labs/LAB_SPEC.md §8): short sentences, one
//    instruction per step, 🔊 read-aloud on the lab assistant and the guide
//    box. Speech NEVER auto-plays and is cancelled on every step change,
//    overlay, unmount and screen change.
//  ⚠ Only the <canvas> animates. Nothing here transforms .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: a test shows its end state at once.
//  ⚠ Tap is the way that always works. Drag (mouse / pen only) drops an object
//    from the tray onto the picture, which runs the same test.
// ══════════════════════════════════════════════
const LabMaterials = (() => {
  const D = () => LabMaterialsData;
  const LAB = 'materials';
  const FRAME_MS = 1000 / 30;
  const DUR = { magnet: 1.3, torch: 1.2, circuit: 1.1, bowl: 1.6, drop: 1.3, bend: 1.2, origin: 0.9 };
  const FX_DUR = { zap: 0.8 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _clock = 0;
  let _b = null, _panel = 'sandbox', _mission = null, _guide = null;
  let _log = [], _results = {}, _fx = [], _busy = false, _instant = false;
  let _tipIdx = -1, _drag = null, _suppressClick = false, _sortProp = 'magnetic';
  let _seenMetalCard = false, _talking = false;

  function _newBench() {
    return { station: 'magnet', lights: true, power: 'battery', obj: null, scene: null };
  }
  // The grade the lab is being used at: the shell will say (LAB_SPEC §8); until
  // it does, this lab's own grade.
  const _grade = () => (typeof Labs.grade === 'function' && Labs.grade()) || D().GRADES[0];
  const _forGrade = list => { const g = _grade(); const l = list.filter(x => !x.grades || x.grades.includes(g)); return l.length ? l : list; };
  const _objects = () => _forGrade(D().OBJECTS);
  const _st = () => D().station(_b.station);

  // ══ Pictures ═════════════════════════════════
  // Each object is a few SVG paths on a 40 × 40 grid: [fill, d, stroke, width].
  // The same paths draw the tray icons (inline SVG) and the canvas (Path2D).
  const ICONS = {
    nail:    [['#8A949C', 'M9 7h22v5H9z'], ['#8A949C', 'M18 12h4v19l-2 6-2-6z'], ['#C3CBD1', 'M19 13h1v17h-1z']],
    pin:     [['#8A949C', 'M20 4a3.5 3.5 0 1 1 0 7a3.5 3.5 0 1 1 0-7z'], ['#9AA4AB', 'M19.3 10.5h1.4v23l-.7 3-.7-3z']],
    foil:    [['#CDD5DA', 'M6 11l7-4 7 3 8-3 6 4-2 7 3 8-4 7-8-1-7 2-7-3 2-8z', '#8E9BA3', 1.2], ['none', 'M12 14l6 4 5-3 6 5M10 24l7-2 6 4 7-3', '#A2AEB5', 1]],
    copper:  [['none', 'M6 31c4-10 9-12 12-6s8 4 9-6 5-11 8-12', '#C46A2D', 3.2]],
    lead:    [['#3D4247', 'M5 18.5h28l3 1.5-3 1.5H5z']],
    bottle:  [['rgba(150,205,235,0.55)', 'M16 9h8v3l3 4v19a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V16l3-4z', '#4A90B8', 1.4], ['#2F7FD1', 'M15.5 4h9v5h-9z']],
    glass:   [['rgba(185,228,244,0.45)', 'M8 8h24v24H8z', '#5E9FB8', 1.6], ['none', 'M12 27l13-13M17 29l10-10', '#FFFFFF', 1.6]],
    frosted: [['rgba(232,238,242,0.95)', 'M8 8h24v24H8z', '#8FA5B0', 1.6], ['#C3D0D6', 'M12 12h2v2h-2zM18 15h2v2h-2zM25 11h2v2h-2zM14 21h2v2h-2zM22 22h2v2h-2zM27 27h2v2h-2zM11 28h2v2h-2z']],
    paper:   [['rgba(246,246,238,0.9)', 'M9 5h17l6 6v24H9z', '#A9A99E', 1.2], ['none', 'M26 5v6h6', '#A9A99E', 1.2]],
    wood:    [['#C98E52', 'M5 12h30v17H5z', '#94612F', 1.2], ['none', 'M8 17c6-2 12 2 24-1M8 23c7 1 14-2 24 1', '#9C6634', 1.1]],
    cork:    [['#C9A06B', 'M12 9h16l-2 23H14z', '#9C7644', 1.2], ['#A9804C', 'M16 14h1.6v1.6H16zM22 17h1.6v1.6H22zM18 23h1.6v1.6H18zM21 27h1.6v1.6H21z']],
    stone:   [['#8E918C', 'M7 26c-2-8 4-14 12-14s15 5 13 13-7 9-14 9-10-2-11-8z', '#6B6E69', 1.2], ['none', 'M14 18c3-2 6-2 8 0', '#B5B8B2', 1.4]],
    ball:    [['#E0483E', 'M20 6a14 14 0 1 1 0 28a14 14 0 1 1 0-28z', '#B32F27', 1.2], ['none', 'M8 16c7 5 17 5 24 0', '#F7C6C2', 1.6]],
    towel:   [['#F4F1EA', 'M6 11h28v19H6z', '#BDB5A6', 1.2], ['#3E7CB1', 'M6 24h28v2.4H6zM6 27.5h28v1.2H6z']],
    sponge:  [['#F2CF3D', 'M6 15h28v16H6z', '#C9A51E', 1.2], ['#3A9D5D', 'M6 10h28v5H6z'], ['#D4AE22', 'M10 20h2v2h-2zM17 24h2v2h-2zM24 19h2v2h-2zM28 26h2v2h-2zM13 27h2v2h-2z']],
  };
  // The colour of each object when the bend test draws it as a bar.
  const BAR = { nail: '#8A949C', pin: '#9AA4AB', foil: '#CDD5DA', copper: '#C46A2D', lead: '#3D4247', bottle: 'rgba(120,190,230,0.85)',
                glass: 'rgba(150,210,232,0.85)', frosted: '#D6E0E5', paper: '#EAE9DE', wood: '#C98E52', cork: '#C9A06B',
                stone: '#8E918C', ball: '#E0483E', towel: '#F1EDE3', sponge: '#F2CF3D' };
  const THIN = { foil: 1, paper: 1, towel: 1, copper: 1, pin: 1 };
  // Where the material comes from, as a picture.
  const SRC = { wood: '🌳', cork: '🌳', ball: '🌳', towel: '🌿', stone: '⛰️' };

  const _svg = id => `<svg viewBox="0 0 40 40" class="lab-materials-ico" aria-hidden="true">${(ICONS[id] || []).map(([f, d, s, w]) =>
    `<path d="${d}" fill="${f}"${s ? ` stroke="${s}" stroke-width="${w || 1}" stroke-linecap="round" stroke-linejoin="round"` : ''}/>`).join('')}</svg>`;
  const _paths = new Map();
  const _p2d = d => { if (!_paths.has(d)) _paths.set(d, new Path2D(d)); return _paths.get(d); };
  function _icon(id, cx, cy, size, o = {}) {
    const c = _cx, parts = ICONS[id];
    if (!parts) return;
    c.save();
    c.translate(cx, cy);
    if (o.rot) c.rotate(o.rot);
    c.scale((size / 40) * (o.sx || 1), (size / 40) * (o.sy || 1));
    c.translate(-20, -20);
    if (o.alpha != null) c.globalAlpha = o.alpha;
    parts.forEach(([f, d, s, w]) => {
      const p = _p2d(d);
      if (f && f !== 'none') { c.fillStyle = f; c.fill(p); }
      if (s) { c.strokeStyle = s; c.lineWidth = w || 1; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(p); }
    });
    if (o.wet) { c.globalAlpha = 0.28; c.fillStyle = '#20364D'; parts.forEach(([f, d]) => { if (f && f !== 'none') c.fill(_p2d(d)); }); }
    c.restore();
  }

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-materials">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">Science · Grade ${esc(_grade())}</span><h1>Materials Tester</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the Materials Tester works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-materials-zone">
            <canvas id="lab-materials-canvas" role="img" aria-label="A magnet over a table"></canvas>
            <div class="lab-materials-tl">
              <div class="lab-chip lab-materials-chip" id="lab-materials-chip"></div>
              <div class="lab-materials-status" id="lab-materials-status"></div>
            </div>
            <div class="lab-materials-verdict" id="lab-materials-verdict" aria-live="polite" hidden></div>
            <div class="lab-contents" id="lab-materials-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip lab-materials-say" data-act="say-coach" aria-label="Read this out loud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div id="lab-materials-controls" class="lab-materials-controls"></div>
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
    if (!_b) _b = _newBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-materials-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _renderControls();
    _readouts();
    const st = Labs.store(LAB);
    if (!st.intro) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission. Carry on!');
    else _coach(Object.keys(st.guides).length
      ? 'Welcome back! Pick an experiment or a mission. Or test anything you like.'
      : '👋 New here? Pick a guided experiment below. I will show you what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _hush();
    _stop();
    _drag = null;
    if (_b && _b.scene && _b.scene.t < 1) { _b.scene.t = 1; _b.scene.done = null; _busy = false; }
    _root = null; _cv = null; _cx = null;
  }

  function _resize() {
    const wrap = _cv.parentElement;
    const w = Math.max(240, wrap.clientWidth || 320);
    const h = Math.round(Math.min(360, Math.max(250, w * 0.66)));
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
      if (_suppressClick) { _suppressClick = false; return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const sn = e.target.closest('[data-station]');
      if (sn) { setStation(sn.dataset.station); return; }
      const ob = e.target.closest('[data-obj]');
      if (ob) { test(ob.dataset.obj); _showStage(); return; }
      const pw = e.target.closest('[data-power]');
      if (pw) { setPower(pw.dataset.power); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const so = e.target.closest('[data-sort]');
      if (so) { openSort(so.dataset.sort); return; }
      const un = e.target.closest('[data-untested]');
      if (un) { _untested(un.dataset.untested); return; }
      const gs = e.target.closest('[data-guess]');
      if (gs) { const [p, o, v] = gs.dataset.guess.split('|'); guess(p, o, v); return; }
      const tf = e.target.closest('[data-test-first]');
      if (tf) { const [p, o] = tf.dataset.testFirst.split('|'); _testFirst(p, o); return; }
      const jp = e.target.closest('[data-job-pick]');
      if (jp) { const [j, o] = jp.dataset.jobPick.split('|'); pickJob(j, o); return; }
      const jb = e.target.closest('[data-job]');
      if (jb) { openJob(jb.dataset.job); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { startMission(m.dataset.mission); }
    };
    _root.onpointerdown = e => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      const item = e.target.closest('[data-obj]');
      if (!item) return;
      _drag = { item, x: e.clientX, y: e.clientY, id: e.pointerId, ghost: null };
      window.addEventListener('pointermove', _onMove);
      window.addEventListener('pointerup', _onUp, { once: true });
    };
  }

  // ── Drag an object from the tray onto the picture (mouse / pen) ──
  function _overZone(x, y) {
    const z = $('lab-materials-zone');
    if (!z) return false;
    const r = z.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }
  function _onMove(e) {
    if (!_drag || e.pointerId !== _drag.id) return;
    if (!_drag.ghost) {
      if (Math.hypot(e.clientX - _drag.x, e.clientY - _drag.y) < 8) return;
      const g = document.createElement('div');
      g.className = 'lab-ghost';
      g.textContent = _drag.item.querySelector('b')?.textContent || '';
      _root.appendChild(g);
      _drag.ghost = g;
    }
    _drag.ghost.style.left = e.clientX + 'px';
    _drag.ghost.style.top = e.clientY + 'px';
    $('lab-materials-zone')?.classList.toggle('is-over', _overZone(e.clientX, e.clientY));
  }
  function _onUp(e) {
    window.removeEventListener('pointermove', _onMove);
    const d = _drag; _drag = null;
    if (!d || !d.ghost) return;
    d.ghost.remove();
    $('lab-materials-zone')?.classList.remove('is-over');
    _suppressClick = true;
    if (_overZone(e.clientX, e.clientY)) test(d.item.dataset.obj);
  }
  // On a phone the tray sits below the picture: bring the picture back into view.
  function _showStage() {
    const z = $('lab-materials-zone');
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
      case 'lights': setLights(!_b.lights); break;
      case 'quiz': _quiz(); break;
      case 'clear-table': _results = {}; _log = []; _refresh(); _coach('Notebook cleared. Test some more things!'); break;
      case 'exit-mission': _mission = null; _coach('Back to free testing. Test anything you like.'); _renderPanel(); _renderControls(); break;
      case 'guide-stop': _stopGuide(false); break;
    }
  }

  // ══ Read aloud (never auto-plays) ═════════════
  const _synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  // Emoji and arrows are read out as their names ("light bulb", "right arrow").
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
    if (!el) return;
    if (el.textContent !== text) _hush();
    el.textContent = text;
    el.classList.remove('is-new'); void el.offsetWidth; el.classList.add('is-new');
  }
  function _nextTip() {
    const f = D().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }
  function _guard() {
    if (_busy) { _coach('One test at a time. Watch this one first!'); return false; }
    return true;
  }

  // ══ Actions ══════════════════════════════════
  function setStation(id) {
    const S = D().station(id);
    if (!S || !_guard()) return;
    if (_b.station !== id) { _b.station = id; _b.scene = null; _b.obj = null; }
    _coach(`${S.icon} ${S.name}. ${S.how} ${S.ask}`);
    _afterChange();
    _renderControls();
    _guideEvent('station:' + id);
  }

  function setLights(on) {
    if (!_guard()) return;
    _b.lights = !!on;
    if (_b.scene && _b.scene.st === 'torch') _b.scene = null;
    _coach(on ? 'Room lights on. It is hard to see torch light in a bright room.' : 'Room lights off. Now the torch light is easy to see.');
    _renderControls();
    _readouts();
    _guideEvent(on ? 'lights:on' : 'lights:off');
  }

  function setPower(p) {
    if (!_guard()) return;
    if (p === 'socket') {
      _b.power = 'socket';
      _renderControls();
      _hazard('mains', { name: _b.obj ? D().obj(_b.obj).name : '' });
      return;
    }
    _b.power = 'battery';
    _coach('The tester uses one small battery. That is safe to touch.');
    _renderControls();
  }

  // Put an object at the current station and run the test.
  function test(objId) {
    const o = D().obj(objId);
    if (!o || !_guard()) return;
    const st = _b.station;
    const scene = { st, obj: objId, value: D().result(st, objId), t: 0,
                    fair: !(st === 'torch' && _b.lights),
                    broken: st === 'bend' && (o.material === 'glass' || o.material === 'frosted') };
    _b.obj = objId;
    _b.scene = scene;
    _busy = true;
    _renderControls();
    _readouts();
    _play(scene, () => { _busy = false; _finish(scene); });
  }

  function _play(scene, done) {
    if (_instant || Labs.calm() || !_cx) { scene.t = 1; done(); return; }
    scene.done = done;
  }

  function _finish(sc) {
    const o = D().obj(sc.obj), S = D().station(sc.st);
    if (!sc.fair) {
      if (_mission) _mission.mistakes++;
      _logEntry({ title: `${S.icon} ${o.name} - not a fair test`, bad: true, obs: 'The room lights were on, so the result could not be seen.' });
      _afterChange();
      _resultCard('lights_on', { name: o.name }, () => _coach('Tap 🌙 “Lights off”, then test it again.'));
      return;
    }
    _results[sc.obj] = _results[sc.obj] || {};
    _results[sc.obj][sc.st] = sc.value;
    _logEntry({ title: `${S.icon} ${o.name}`, obs: sc.broken ? `It did not bend. It cracked! ${D().materialName(sc.obj)} is rigid.` : D().say(sc.st, sc.obj),
                bad: sc.broken });
    _coach(sc.broken ? 'Crack! Glass does not bend. It breaks.' : D().say(sc.st, sc.obj));
    if (_mission) {
      const M = D().MISSIONS.find(x => x.id === _mission.id);
      if (M.station === sc.st) _mission.tested.add(sc.obj);
      _missionCheck();
    }
    _checkDisc({ station: sc.st, obj: sc.obj, value: sc.value });
    _afterChange();
    _guideEvent('test:' + sc.obj);
    if (sc.broken) { _hazard('glass', { name: o.name }); return; }
    if (sc.st === 'magnet' && D().isMetal(sc.obj) && !sc.value && !_guide && !_seenMetalCard) {
      _seenMetalCard = true;
      _resultCard('all_metals', { name: o.name, material: D().materialName(sc.obj) },
        () => _coach('Only iron and steel stick. Try the other metals!'));
    }
  }

  // ── The sorting board ─────────────────────────
  function openSort(prop) {
    if (!D().PROPS[prop] || prop === 'heat') return;
    _sortProp = prop;
    if (_panel !== 'sandbox') _panel = 'sandbox';
    _renderPanel();
    const el = $('lab-materials-sort');
    if (el && el.getBoundingClientRect().top > window.innerHeight) el.scrollIntoView({ block: 'nearest' });
    const groups = _sortGroups(prop).filter(g => g.items.length).length;
    _coach(groups ? `Your ${D().PROPS[prop].name.toLowerCase()} results, sorted into groups.` : 'Nothing tested yet for this board. Test some things first!');
    _checkDisc({ sort: prop, full: groups >= 2 });
    _guideEvent('sort:' + prop);
  }
  const _stationFor = prop => D().STATIONS.find(s => s.prop === prop);
  function _sortGroups(prop) {
    const S = _stationFor(prop);
    return D().PROPS[prop].values.map(v => ({ v, items: _objects().filter(o => _results[o.id] && S && S.id in _results[o.id] && _results[o.id][S.id] === v.v) }));
  }
  function _untested(objId) {
    const o = D().obj(objId), P = D().PROPS[_sortProp];
    if (!o || !P) return;
    _ov(() => Labs.overlay(`
      <div class="lab-done">
        <div class="lab-materials-bigico" aria-hidden="true">${_svg(objId)}</div>
        <p class="lab-rs-kicker">Not tested yet</p>
        <h2 id="lab-ov-title">Where does the ${esc(o.name.toLowerCase())} go?</h2>
        <p class="lab-hint">Test it - or put it in a group yourself.</p>
      </div>
      <div class="lab-ov-actions lab-materials-guess">
        ${P.values.map(v => `<button type="button" class="lab-btn" data-ov-close data-guess="${_sortProp}|${objId}|${String(v.v)}">🤔 ${esc(_cap(v.word))}</button>`).join('')}
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-test-first="${_sortProp}|${objId}" data-autofocus>🧪 Test it</button>
      </div>`, { cls: 'is-done' }));
  }
  function guess(prop, objId) {
    const o = D().obj(objId);
    if (!o) return;
    if (_mission) _mission.mistakes++;
    _logEntry({ title: `🤔 ${o.name} - a guess`, bad: true, obs: 'Put in a group without a test. A guess is not a result.' });
    _resultCard('guess', { name: o.name }, () => _coach('Tap an object at a station to test it. Then it sorts itself.'));
  }
  function _testFirst(prop, objId) {
    const S = _stationFor(prop);
    if (!S) return;
    if (_b.station !== S.id) setStation(S.id);
    if (S.id === 'torch' && _b.lights) setLights(false);
    test(objId);
    _showStage();
  }

  // ── Right material for the job ────────────────
  function openJob(jobId) {
    const J = D().JOBS.find(j => j.id === jobId);
    if (!J) return;
    const order = J.choices.slice().sort(() => Math.random() - 0.5);
    _ov(() => Labs.overlay(`
      <div class="lab-done lab-materials-jobcard">
        <p class="lab-done-icon" aria-hidden="true">${J.icon}</p>
        <p class="lab-rs-kicker">Right material for the job</p>
        <h2 id="lab-ov-title">${esc(J.ask)}</h2>
        <div class="lab-materials-choices">${order.map(id => `<button type="button" class="lab-materials-choice" data-job-pick="${J.id}|${id}">
          ${_svg(id)}<span><b>${esc(D().materialName(id))}</b><small>like the ${esc(D().obj(id).name.toLowerCase())}</small></span></button>`).join('')}</div>
        <div class="lab-quiz-fb" id="lab-materials-jobfb" aria-live="polite"></div>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn" data-ov-close data-autofocus>Close</button></div>`, { cls: 'is-done' }));
  }
  // `quiet` (a guide step) answers without the overlay.
  function pickJob(jobId, objId, quiet) {
    const J = D().JOBS.find(j => j.id === jobId), r = D().judge(jobId, objId);
    if (!J || !r) return;
    const fb = !quiet && $('lab-materials-jobfb');
    if (fb) {
      const card = fb.closest('.lab-ov-card');
      card.querySelectorAll('[data-job-pick]').forEach(b => {
        if (b.dataset.jobPick === `${jobId}|${objId}`) b.classList.add(r.ok ? 'is-right' : 'is-wrong');
        if (r.ok) b.disabled = true;
      });
      const next = r.ok && D().JOBS.find(j => j.id !== jobId && !_jobsDone().has(j.id) && _forGrade([j]).length);
      fb.innerHTML = `<p class="${r.ok ? 'is-right' : 'is-wrong'}"><b>${r.ok ? 'Yes!' : 'Not quite.'}</b> ${esc(r.text)}</p>
        ${r.ok && next ? `<button type="button" class="lab-btn lab-btn-primary" data-job="${next.id}">Next job: ${esc(next.title)} →</button>` : ''}`;
    }
    if (!r.ok) { _coach(r.text + ' Try another one.'); return; }
    const st = Labs.store(LAB);
    st.jobs = st.jobs || {};
    st.jobs[jobId] = Date.now();
    Labs.persist();
    _logEntry({ title: `${J.icon} ${J.title}: ${D().materialName(objId)}`, obs: J.why });
    _coach(`Yes! ${J.why}`);
    if (_mission) { _mission.jobs.add(jobId); _missionCheck(); }
    _checkDisc({ job: jobId });
    _refresh();
    _guideEvent('job:' + jobId);
  }
  const _jobsDone = () => new Set(Object.keys(Labs.store(LAB).jobs || {}));

  // Everything a pupil does ends here: repaint.
  function _afterChange() {
    _renderControls();
    _readouts();
    _refresh();
  }

  // ══ Discoveries (data-driven: see LabMaterialsData.DISCOVERIES) ══
  function _checkDisc(ev) {
    D().DISCOVERIES.forEach(d => {
      const u = d.unlock;
      let hit = false;
      if (u.station) hit = ev.station === u.station && (u.value === undefined || u.value === ev.value)
        && (!u.obj || u.obj === ev.obj) && (u.metal === undefined || D().isMetal(ev.obj) === u.metal);
      else if (u.sort) hit = ev.sort === u.sort && !!ev.full;
      else if (u.job) hit = !!ev.job;
      if (hit) _discover(d.id);
    });
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover(LAB, id, { title: d && d.title, total: D().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store(LAB).disc).length}/${D().DISCOVERIES.length}`;
  }

  // ══ Hazards and "what went wrong" cards ══════
  function _hazard(id, ctx) {
    const H = D().HAZARDS[id];
    const st = Labs.store(LAB);
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _logEntry({ title: `⚠ ${H.title(ctx)}`, bad: true, obs: H.happened(ctx) });
    _busy = true;
    const show = () => {
      _busy = false;
      _ov(() => Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: 'Got it - test safely',
        onClose: () => {
          if (id === 'mains') { _b.power = 'battery'; _coach('Back to the battery tester. It is safe.'); }
          else { _b.scene = null; _b.obj = null; _coach('A new glass tile is on the tray. Glass cannot be bent - try something else.'); }
          _renderControls(); _readouts();
        } }));
    };
    if (H.fx && FX_DUR[H.fx]) _fxAdd(H.fx, show); else show();
  }
  function _resultCard(id, ctx, after) {
    const R = D().RESULTS[id];
    _ov(() => Labs.resultCard({ icon: R.icon, title: R.title(ctx), happened: R.happened(ctx), instead: R.instead, exam: R.exam,
      button: 'Got it', onClose: after }));
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = D().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _mission = { id, tested: new Set(), jobs: new Set(), hazards: 0, mistakes: 0, success: false };
    if (M.station) { _b.station = M.station; _b.scene = null; _b.obj = null; }
    _panel = 'missions';
    _coach(M.intro);
    _renderPanel();
    _renderControls();
    _readouts();
  }
  function _missionProgress() {
    const ms = _mission, M = D().MISSIONS.find(x => x.id === ms.id);
    const rows = M.reqs.map(r => {
      let n;
      if (r.jobs) n = ms.jobs.size;
      else if (r.ids) n = r.ids.filter(i => ms.tested.has(i)).length;
      else n = [...ms.tested].filter(i => r.filter === 'any' || (r.filter === 'metal') === D().isMetal(i)).length;
      const need = r.jobs || r.count;
      return { label: r.label, n: Math.min(n, need), need, done: n >= need };
    });
    return { rows, done: rows.every(r => r.done) };
  }
  function _missionCheck() {
    const ms = _mission;
    if (!ms || ms.success) return;
    if (_missionProgress().done) {
      ms.success = true;
      _coach('🎯 Mission done! Tap “Answer the questions” to finish.');
    }
  }
  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = D().MISSIONS.find(x => x.id === ms.id);
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
      lines.push(ms.mistakes ? `${ms.mistakes} unfair test${ms.mistakes === 1 ? '' : 's'} or guess${ms.mistakes === 1 ? '' : 'es'}. Test fairly for an extra star.` : 'Every test was fair. 🧪');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      _ov(() => Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _renderControls(); _coach('Mission saved! Try another mission, or hunt for discoveries.'); } }));
    } }));
  }

  // ══ Guided experiments ═══════════════════════
  // A guide names ONE next action, puts a button for it in the yellow box, and
  // makes the same control glow. Nothing is locked: the pupil can wander off
  // and the guide waits. A guide is one of GUIDES, or one built from a
  // discovery's recipe.
  const _gdef = () => _guide && (_guide.def || D().GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || D().GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _renderControls();
    _readouts();
    _guideEnter();
    const z = $('lab-materials-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // The station a test step belongs to: the last station step before it.
  function _stationAt(G, i) {
    for (let k = i - 1; k >= 0; k--) if (G.steps[k].on.startsWith('station:')) return G.steps[k].on.split(':')[1];
    return null;
  }
  // A step already true on the bench is skipped. Tests, sorts and jobs never are.
  function _satisfied(on) {
    const [k, v] = on.split(':');
    if (k === 'station') return _b.station === v;
    if (k === 'lights') return v === 'off' ? !_b.lights : _b.lights;
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
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <div class="lab-materials-sayrow"><p class="lab-guide-say">${esc(s.say)}</p>
          <button type="button" class="lab-coach-tip lab-materials-say" data-act="say-guide" aria-label="Read this step out loud">🔊</button></div>
        <button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>
        <button type="button" class="lab-link" data-act="guide-stop">Stop the guide</button>`;
      box.hidden = false;
    }
    _highlight();
  }

  function _guideEvent(token) {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (s && s.on === token) {
      const want = token.startsWith('test:') && _stationAt(G, _guide.step);
      if (want && _b.station !== want) { _highlight(); return; }
      _guide.step++;
      _guideEnter();
    } else _highlight();
  }

  function _guideDo() {
    const G = _gdef();
    if (!G) return;
    const s = G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    switch (k) {
      case 'station': setStation(v); break;
      case 'lights': setLights(v === 'on'); break;
      case 'test': {
        const want = _stationAt(G, _guide.step);
        if (want && _b.station !== want) setStation(want);
        if (_b.station === 'torch' && _b.lights) setLights(false);
        test(v);
        break;
      }
      case 'sort': openSort(v); break;
      case 'job': { const J = D().JOBS.find(j => j.id === v); if (J) pickJob(v, J.choices[0], true); break; }
    }
  }

  // ── Discoveries: every card opens ─────────────
  function _autoStep(on) {
    const [k, v] = on.split(':');
    if (k === 'station') { const S = D().station(v); return { on, say: `Choose the ${S.name.toLowerCase()}.`, btn: `${S.icon} Choose the ${S.name.toLowerCase()}` }; }
    if (k === 'lights') return v === 'off' ? { on, say: 'Switch the room lights off.', btn: '🌙 Lights off' } : { on, say: 'Switch the room lights on.', btn: '💡 Lights on' };
    if (k === 'test') { const o = D().obj(v); return { on, say: `Test the ${o.name.toLowerCase()}.`, btn: `🧪 Test the ${o.name.toLowerCase()}` }; }
    if (k === 'sort') return { on, say: 'Open the sorting board. See your results in groups.', btn: '📋 Open the sorting board' };
    const J = D().JOBS.find(j => j.id === v);
    return { on, say: `Choose the best material for ${J.title.toLowerCase()}.`, btn: `🧰 Choose for ${J.title.toLowerCase()}` };
  }
  function discoveryGuide(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = D().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store(LAB).disc[id];
    if (!found) {
      _ov(() => Labs.overlay(`
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
        <section class="lab-hz-sec is-exam"><h3>Why it matters</h3><p>${esc(d.learn)}</p></section>
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
        <button type="button" class="lab-btn" data-ov-close>Test freely</button>
        ${G.adhoc
          ? '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="found" data-autofocus>Back to my discoveries →</button>'
          : next
            ? `<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${next.id}" data-autofocus>Next: ${esc(next.title)} →</button>`
            : '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-panel="missions" data-autofocus>Try a mission →</button>'}
      </div>`, { cls: 'is-done' }));
    _coach(`Well done: ${G.title}! Pick the next one, try a mission, or test freely.`);
    Labs.confetti();
  }

  function _stopGuide(silent) {
    const had = !!_guide;
    _guide = null;
    _hush();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (had) _renderPanel(); else _highlight();
    if (!silent) _coach('Guide stopped. Pick another experiment, or test freely.');
  }

  // The yellow glow on whatever the current guide step wants tapped.
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, v] = s.on.split(':');
    let sel = null;
    if (k === 'station') sel = `[data-station="${v}"]`;
    else if (k === 'lights') sel = '[data-act="lights"]';
    else if (k === 'test') { const want = _stationAt(G, _guide.step); sel = want && _b.station !== want ? `[data-station="${want}"]` : `#lab-materials-controls [data-obj="${v}"]`; }
    else if (k === 'sort') sel = `[data-sort="${v}"]`;
    else if (k === 'job') sel = `#lab-panel [data-job="${v}"]`;
    const el = sel && _root.querySelector(sel);
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
        <li><b>Watch</b> the test. Your results go in the notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>step by step</small></h3>
      <div class="lab-start-list">${_forGrade(D().GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>questions · earn stars</small></h3>
      <div class="lab-start-list">${_forGrade(D().MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or test freely: pick a test, then tap an object.</p>
    </section>`;
  }

  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => { if (b.closest('.lab-tabs')) b.setAttribute('aria-selected', String(b.dataset.panel === _panel)); });
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission ? _missionHTML() + _notebookHTML() : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _sortHTML() + _jobsHTML() + _notebookHTML();
    _foundCount();
    _highlight();
  }

  // Repaint what changes while testing, without rebuilding under a finger.
  function _refresh() {
    ['lab-notebook', 'lab-mission', 'lab-materials-sort', 'lab-materials-jobs'].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.outerHTML = id === 'lab-notebook' ? _notebookHTML() : id === 'lab-mission' ? _missionHTML()
        : id === 'lab-materials-sort' ? _sortHTML() : _jobsHTML();
    });
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }

  const _cap = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const _chip = (o, attrs) => `<span class="lab-materials-chipobj"${attrs || ''}>${_svg(o.id)}<span>${esc(o.name)}</span></span>`;

  function _sortHTML() {
    const S = _stationFor(_sortProp);
    const groups = _sortGroups(_sortProp);
    const untested = _objects().filter(o => !(_results[o.id] && S.id in _results[o.id]));
    const cantTest = _objects().filter(o => _results[o.id] && S.id in _results[o.id] && _results[o.id][S.id] === null);
    return `<section class="lab-shelf lab-materials-sort" id="lab-materials-sort" aria-label="Sort it">
      <div class="lab-shelf-head"><h2>📋 Sort it</h2><p class="lab-hint">Your test results, in groups.</p></div>
      <div class="lab-materials-sortpick" role="group" aria-label="Which test to sort by">
        ${D().STATIONS.map(s => `<button type="button" class="lab-btn lab-btn-sm" data-sort="${s.prop}" aria-pressed="${s.prop === _sortProp}"><span aria-hidden="true">${s.icon}</span> ${esc(D().PROPS[s.prop].name)}</button>`).join('')}
      </div>
      <div class="lab-materials-cols">${groups.map(g => `<div class="lab-materials-col">
          <h3>${esc(_cap(g.v.word))}</h3><p class="lab-hint">${esc(g.v.explain)}</p>
          <div class="lab-materials-chips">${g.items.length ? g.items.map(o => _chip(o)).join('') : '<span class="lab-empty">Nothing yet</span>'}</div>
        </div>`).join('')}</div>
      ${cantTest.length ? `<p class="lab-hint">Could not test: ${cantTest.map(o => esc(o.name)).join(', ')}.</p>` : ''}
      ${untested.length ? `<h3 class="lab-materials-untested-h">Not tested yet <small>tap one</small></h3>
        <div class="lab-materials-chips">${untested.map(o => `<button type="button" class="lab-materials-chipobj is-untested" data-untested="${o.id}">${_svg(o.id)}<span>${esc(o.name)}</span></button>`).join('')}</div>` : ''}
    </section>`;
  }

  function _jobsHTML() {
    const done = _jobsDone();
    return `<section class="lab-shelf lab-materials-jobs" id="lab-materials-jobs" aria-label="Right material for the job">
      <div class="lab-shelf-head"><h2>🧰 Right material for the job</h2><p class="lab-hint">Pick the best material. Use your test results!</p></div>
      <div class="lab-materials-joblist">${_forGrade(D().JOBS).map(J => `<button type="button" class="lab-item${done.has(J.id) ? ' lab-materials-done' : ''}" data-job="${J.id}">
          <span class="lab-materials-jobico" aria-hidden="true">${J.icon}</span>
          <span class="lab-item-text"><b>${esc(J.title)}</b><small>${done.has(J.id) ? '✓ solved' : 'Tap to choose'}</small></span></button>`).join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const tested = _objects().filter(o => _results[o.id]);
    const cell = (o, s) => {
      if (!(s.id in (_results[o.id] || {}))) return '<td class="lab-muted">-</td>';
      const v = _results[o.id][s.id];
      const w = v === null ? 'can’t test' : (D().valueOf(s.prop, v) || {}).word;
      return `<td>${esc(w)}</td>`;
    };
    const tbl = tested.length ? `<div class="lab-table-wrap"><table class="lab-table lab-materials-table">
      <caption>My results</caption>
      <thead><tr><th scope="col">Object</th>${D().STATIONS.map(s => `<th scope="col" title="${esc(s.name)}"><span aria-hidden="true">${s.icon}</span><span class="lab-materials-sr">${esc(s.name)}</span></th>`).join('')}</tr></thead>
      <tbody>${tested.map(o => `<tr><th scope="row">${esc(o.name)}</th>${D().STATIONS.map(s => cell(o, s)).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="lab-fair">🧪 Every test done the same way: a fair test. <button type="button" class="lab-link" data-act="clear-table">Clear notebook</button></p>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 12).map(e => `<li class="${e.bad ? 'lab-materials-log-bad' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
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
    const p = _missionProgress();
    const S = M.station && D().station(M.station);
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" data-act="exit-mission">Leave mission</button></div>
      <ul class="lab-steps">${p.rows.map(r => `<li class="${r.done ? 'is-done' : ''}">${esc(r.label)} (${r.n} of ${r.need})</li>`).join('')}
        <li>Answer the questions</li></ul>
      <p class="lab-progress-text">${S ? `Use the ${esc(S.icon + ' ' + S.name.toLowerCase())}. Tap objects on the tray under the picture.` : 'Choose a job below. Pick the best material.'}</p>
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>${M.reqs.some(r => r.jobs) ? _jobsHTML() : ''}`;
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

  // ── Controls under the picture: stations, options, the tray ──
  function _renderControls() {
    const c = $('lab-materials-controls');
    if (!c || !_b) return;
    const S = _st();
    let opts = '';
    if (S.id === 'torch') opts = `<div class="lab-materials-opts">
        <button type="button" class="lab-btn lab-materials-opt${_b.lights ? '' : ' is-dark'}" data-act="lights" aria-pressed="${!_b.lights}">${_b.lights ? '🌙 Lights off' : '💡 Lights on'}</button>
        <span class="lab-hint">${_b.lights ? 'The room lights are on.' : 'The room is dark. Good for the torch!'}</span></div>`;
    else if (S.id === 'circuit') opts = `<div class="lab-materials-opts"><span class="lab-hint">Power from:</span>
        <div class="lab-seg lab-materials-power" role="group" aria-label="Power for the tester">
          <button type="button" data-power="battery" aria-pressed="${_b.power === 'battery'}">🔋 Battery</button>
          <button type="button" data-power="socket" aria-pressed="${_b.power === 'socket'}">🔌 Wall socket</button>
        </div></div>`;
    const done = o => _results[o.id] && S.id in _results[o.id];
    c.innerHTML = `
      <div class="lab-materials-stations" role="group" aria-label="Test stations">
        ${D().STATIONS.map(s => `<button type="button" class="lab-materials-st" data-station="${s.id}" aria-pressed="${s.id === S.id}"><span aria-hidden="true">${s.icon}</span>${esc(s.name)}</button>`).join('')}
      </div>
      <p class="lab-materials-ask"><b>${S.icon} ${esc(S.ask)}</b> ${esc(S.how)}</p>
      ${opts}
      <div class="lab-materials-tray" role="group" aria-label="Objects to test">
        ${_objects().map(o => `<button type="button" class="lab-materials-obj${_b.obj === o.id ? ' is-on' : ''}${done(o) ? ' is-tested' : ''}" data-obj="${o.id}" aria-label="Test the ${esc(o.name.toLowerCase())}">
          ${_svg(o.id)}<b>${esc(o.name)}</b>${done(o) ? '<i aria-hidden="true">✓</i>' : ''}</button>`).join('')}
      </div>
      <p class="lab-hint lab-materials-drag">With a mouse you can also drag an object onto the picture.</p>`;
    _highlight();
  }

  function _intro() {
    _ov(() => Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🧲</p>
        <h2 id="lab-ov-title">Welcome to the Materials Tester</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how”. I will show you each tap.</li>
          <li><b>Test things.</b> Pick a test: magnet, torch, bulb, water or bend. Then tap an object.</li>
          <li><b>Sort them.</b> Your results go into groups on the sorting board.</li>
          <li><b>Stay safe.</b> Some mistakes stop the test and tell you why. Nothing here can hurt you.</li>
          <li><b>Earn stars</b> in missions. There are ${D().DISCOVERIES.length} discoveries to find!</li>
        </ul>
        <p class="lab-hint">Tap 🔊 to hear the helper read out loud.</p>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="magnet" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store(LAB); st.intro = true; Labs.persist();
        _coach('Pick a test under the picture. Then tap an object to test it.');
      } }));
  }

  function _help() {
    _ov(() => Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Materials Tester works</h2>
      <div class="lab-help">
        <section><h3>Testing</h3><ul>
          <li>Pick a test under the picture: 🧲 🔦 💡 💧 🌧️ 🤏 🌳.</li>
          <li>Tap an object on the tray. Watch what happens.</li>
          <li>Your result goes in the notebook and on the sorting board.</li>
          <li>Tap 🔊 to hear the words read out loud.</li></ul></section>
        <section><h3>Safety rules</h3><ul>
          <li>Only test electricity with a small battery. Never use a wall socket or a plug.</li>
          <li>Never try to bend glass. If glass breaks, tell an adult.</li></ul></section>
        <section><h3>Science words</h3><ul>
          ${D().STATIONS.map(s => D().PROPS[s.prop].values.map(v => `<li><b>${esc(_cap(v.word))}</b>: ${esc(v.explain)}</li>`).join('')).join('')}</ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to testing</button></div>`,
      { cls: 'is-help' }));
  }

  // ══ Readouts ═════════════════════════════════
  function _verdict(sc) {
    if (!sc || sc.t < 1) return '';
    if (!sc.fair) return '❓ Too bright to tell';
    if (sc.broken) return '💥 Cracked!';
    if (sc.value === null) return '🤷 Can’t bend-test';
    const v = D().valueOf(D().station(sc.st).prop, sc.value);
    return v ? _cap(v.word) : '';
  }
  function _readouts() {
    if (!_root || !_b) return;
    const S = _st(), sc = _b.scene;
    const chip = $('lab-materials-chip');
    if (chip) chip.innerHTML = `${S.icon} ${esc(S.name)} <small>${esc(S.ask)}</small>`;
    const vd = $('lab-materials-verdict');
    if (vd) { const t = _verdict(sc); vd.textContent = t; vd.hidden = !t; vd.classList.toggle('is-bad', !!(sc && (!sc.fair || sc.broken))); }
    const st = $('lab-materials-status');
    if (st) {
      const chips = [];
      if (S.id === 'torch') chips.push(_b.lights ? '<span class="lab-chip is-warm">💡 Room lights on</span>' : '<span class="lab-chip">🌙 Room dark</span>');
      if (S.id === 'circuit') chips.push(`<span class="lab-chip">🔋 ${D().TESTER.volts} V battery</span>`);
      st.innerHTML = chips.join('');
    }
    const c = $('lab-materials-contents');
    const o = _b.obj && D().obj(_b.obj);
    if (c) c.textContent = o ? `Testing: ${o.name}` : 'Tap an object below to test it.';
    if (_cv) _cv.setAttribute('aria-label', `${S.name} test${o ? ` with the ${o.name.toLowerCase()}` : ''}${sc && sc.t >= 1 && _verdict(sc) ? `: ${_verdict(sc)}` : ''}`);
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done });
  }

  // ══ Drawing ══════════════════════════════════
  const ease = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  const seg = (t, a, b) => ease((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;

  function _draw(dt) {
    if (!_cx || !_b) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    const sc = _b.scene && _b.scene.st === _b.station ? _b.scene : null;
    const t = sc ? sc.t : 0;
    switch (_b.station) {
      case 'magnet': _drawMagnet(sc, t); break;
      case 'torch': _drawTorch(sc, t); break;
      case 'circuit': _drawCircuit(sc, t); break;
      case 'bowl': _drawBowl(sc, t); break;
      case 'drop': _drawDrop(sc, t); break;
      case 'bend': _drawBend(sc, t); break;
      case 'origin': _drawOrigin(sc, t); break;
    }
    _drawFx(dt);
    c.restore();
  }

  function _room(dark) {
    const c = _cx, bg = c.createLinearGradient(0, 0, 0, _H);
    if (dark) { bg.addColorStop(0, '#111823'); bg.addColorStop(1, '#0B1018'); }
    else { bg.addColorStop(0, '#F4EFE4'); bg.addColorStop(1, '#E7DECB'); }
    c.fillStyle = bg; c.fillRect(0, 0, _W, _H);
  }
  function _table(y, dark) {
    const c = _cx;
    c.fillStyle = dark ? '#2A2520' : '#C9A57A'; c.fillRect(0, y, _W, _H - y);
    c.fillStyle = dark ? '#3A332B' : '#A9835A'; c.fillRect(0, y, _W, 4);
  }
  const _sz = k => Math.min(_W, _H * 1.4) * k;

  function _drawMagnet(sc, t) {
    const c = _cx, tableY = _H * 0.82, size = _sz(0.17);
    _room(false); _table(tableY, false);
    const cx = _W * 0.56, rest = tableY - size * 0.42;
    const r = size * 0.46, lw = size * 0.3;
    const y0 = _H * 0.34, tipGap = r * 0.9 + lw * 0.6;
    const y1 = rest - size * 0.55 - tipGap;
    const my = sc ? lerp(y0, y1, seg(t, 0, 0.45)) : y0;
    let oy = rest, rot = 0;
    if (sc && sc.value) oy = lerp(rest, my + tipGap + size * 0.4, seg(t, 0.5, 0.78));
    else if (sc && t > 0.5 && t < 0.8 && !Labs.calm() && !_instant) rot = Math.sin(t * 60) * 0.03;
    c.strokeStyle = '#6B5B45'; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, my - r - lw / 2); c.stroke();
    c.lineCap = 'butt'; c.lineWidth = lw; c.strokeStyle = '#D7263D';
    c.beginPath(); c.moveTo(cx - r, my + r * 0.9); c.lineTo(cx - r, my); c.arc(cx, my, r, Math.PI, 0); c.lineTo(cx + r, my + r * 0.9); c.stroke();
    c.fillStyle = '#C9D1D6';
    c.fillRect(cx - r - lw / 2, my + r * 0.9, lw, lw * 0.6); c.fillRect(cx + r - lw / 2, my + r * 0.9, lw, lw * 0.6);
    c.fillStyle = '#fff'; c.font = `800 ${Math.round(lw * 0.55)}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('N', cx - r, my + r * 0.45); c.fillText('S', cx + r, my + r * 0.45);
    c.textBaseline = 'alphabetic';
    if (sc && sc.value && t > 0.4 && t < 0.8 && !Labs.calm() && !_instant) {
      c.strokeStyle = 'rgba(215,38,61,0.45)'; c.lineWidth = 1.5;
      for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(cx, my + tipGap, r * 0.6 + k * 8 + (_clock * 30 % 8), 0.25 * Math.PI, 0.75 * Math.PI); c.stroke(); }
    }
    if (sc) _icon(sc.obj, cx, oy, size, { rot });
  }

  function _drawTorch(sc, t) {
    const c = _cx, dark = !_b.lights, tableY = _H * 0.86;
    _room(dark); _table(tableY, dark);
    const ty = _H * 0.48, tx = _W * 0.1, ox = _W * 0.46, sx = _W * 0.85, size = _sz(0.15);
    const scrH = _H * 0.5;
    c.fillStyle = dark ? '#2E3644' : '#FFFFFF'; c.strokeStyle = dark ? '#566174' : '#B9B2A2'; c.lineWidth = 1.5;
    c.fillRect(sx, ty - scrH / 2, 10, scrH); c.strokeRect(sx, ty - scrH / 2, 10, scrH);
    c.fillStyle = dark ? '#8A94A6' : '#6D6656'; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center';
    c.fillText('screen', sx + 5, ty + scrH / 2 + 12);
    const on = !!sc, bt = sc ? seg(t, 0, 0.45) : 0, show = sc ? seg(t, 0.45, 0.9) : 0;
    const lens = [tx + 22, ty];
    if (on) {
      const a0 = dark ? 0.5 : 0.14;
      const hb = _H * 0.13, hs = _H * 0.22;
      const reach = lerp(lens[0], ox, bt);
      c.fillStyle = `rgba(255,236,150,${a0})`;
      c.beginPath(); c.moveTo(lens[0], ty - 6); c.lineTo(reach, ty - 6 - (hb - 6) * (reach - lens[0]) / (ox - lens[0])); c.lineTo(reach, ty + 6 + (hb - 6) * (reach - lens[0]) / (ox - lens[0])); c.lineTo(lens[0], ty + 6); c.fill();
      if (show > 0) {
        const v = sc.value, k = !sc.fair ? 0.15 : v === 'transparent' ? 1 : v === 'translucent' ? 0.32 : 0;
        if (k > 0) {
          c.fillStyle = `rgba(255,236,150,${a0 * k * show})`;
          c.beginPath(); c.moveTo(ox, ty - hb); c.lineTo(sx, ty - hs); c.lineTo(sx, ty + hs); c.lineTo(ox, ty + hb); c.fill();
        }
        const spotA = !sc.fair ? 0.12 : v === 'opaque' ? 0.9 : v === 'transparent' ? 0.95 : 0.45;
        const g = c.createRadialGradient(sx + 2, ty, 0, sx + 2, ty, hs * (v === 'translucent' ? 1.25 : 1));
        g.addColorStop(0, `rgba(255,246,200,${spotA * show})`); g.addColorStop(v === 'translucent' ? 0.3 : 0.75, `rgba(255,240,170,${spotA * show * (v === 'translucent' ? 0.6 : 0.85)})`); g.addColorStop(1, 'rgba(255,230,140,0)');
        c.fillStyle = g; c.fillRect(sx - 2, ty - hs * 1.3, 14, hs * 2.6);
        if (sc.fair && v === 'opaque') { c.fillStyle = `rgba(12,14,18,${0.92 * show})`; c.beginPath(); c.ellipse(sx + 5, ty, 7, size * 0.62, 0, 0, Math.PI * 2); c.fill(); }
        if (!sc.fair && t >= 1) { c.fillStyle = '#A33'; c.font = '700 12px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('Too bright to see!', (ox + sx) / 2, ty - hs - 8); }
      }
    }
    c.fillStyle = '#4B5563'; c.fillRect(tx - 26, ty - 10, 40, 20);
    c.fillStyle = '#374151'; c.beginPath(); c.moveTo(tx + 14, ty - 10); c.lineTo(tx + 22, ty - 15); c.lineTo(tx + 22, ty + 15); c.lineTo(tx + 14, ty + 10); c.fill();
    c.fillStyle = on ? '#FFF3B0' : '#9CA3AF'; c.fillRect(tx + 20, ty - 13, 3, 26);
    c.fillStyle = dark ? '#8A94A6' : '#6D6656'; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('torch', tx - 4, ty + 26);
    if (sc) { c.fillStyle = dark ? '#3C4658' : '#8C7B62'; c.fillRect(ox - 2, ty + size * 0.45, 4, tableY - ty - size * 0.45); _icon(sc.obj, ox, ty, size); }
  }

  function _drawCircuit(sc, t) {
    const c = _cx, size = _sz(0.13);
    _room(false);
    const cy = _H * 0.74, cellX = _W * 0.24, bx = _W * 0.5, by = _H * 0.22, br = Math.min(_H * 0.085, 26);
    const clipA = _W * 0.62, clipB = _W * 0.8, gx = (clipA + clipB) / 2, topY = by + br + 16;
    c.strokeStyle = '#3F4750'; c.lineWidth = 3; c.lineJoin = 'round'; c.lineCap = 'round';
    c.beginPath(); c.moveTo(cellX - 30, cy); c.lineTo(_W * 0.08, cy); c.lineTo(_W * 0.08, topY); c.lineTo(bx - 7, topY); c.lineTo(bx - 7, by + br); c.stroke();
    c.beginPath(); c.moveTo(bx + 7, by + br); c.lineTo(bx + 7, topY); c.lineTo(_W * 0.92, topY); c.lineTo(_W * 0.92, cy); c.lineTo(clipB + 12, cy); c.stroke();
    c.beginPath(); c.moveTo(cellX + 30, cy); c.lineTo(clipA - 12, cy); c.stroke();
    // the cell (a 1.5 V battery)
    c.fillStyle = '#2F3A45'; c.fillRect(cellX - 30, cy - 13, 54, 26);
    c.fillStyle = '#C8A13A'; c.fillRect(cellX + 24, cy - 13, 6, 26); c.fillRect(cellX + 30, cy - 5, 4, 10);
    c.fillStyle = '#fff'; c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText(`${D().TESTER.volts} V`, cellX - 4, cy + 4);
    c.fillStyle = '#6D6656'; c.font = '600 10px system-ui, sans-serif'; c.fillText('battery', cellX, cy + 26);
    // the clips and the gap
    c.fillStyle = '#B42318'; c.fillRect(clipA - 14, cy - 5, 14, 10);
    c.fillStyle = '#1F2937'; c.fillRect(clipB, cy - 5, 14, 10);
    c.fillStyle = '#6D6656'; c.fillText('gap', gx, cy + 26);
    // the bulb
    const lit = sc && sc.fair && sc.value ? seg(t, 0.5, 0.85) : 0;
    if (lit > 0) {
      const g = c.createRadialGradient(bx, by, br * 0.3, bx, by, br * 3);
      g.addColorStop(0, `rgba(255,236,120,${0.9 * lit})`); g.addColorStop(1, 'rgba(255,220,90,0)');
      c.fillStyle = g; c.beginPath(); c.arc(bx, by, br * 3, 0, Math.PI * 2); c.fill();
      c.strokeStyle = `rgba(245,180,20,${lit})`; c.lineWidth = 2.5;
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; c.beginPath(); c.moveTo(bx + Math.cos(a) * br * 1.35, by + Math.sin(a) * br * 1.35); c.lineTo(bx + Math.cos(a) * br * 1.8, by + Math.sin(a) * br * 1.8); c.stroke(); }
    }
    c.fillStyle = lit > 0 ? `rgba(255,${240 - 20 * lit},${170 - 90 * lit},0.95)` : 'rgba(225,235,240,0.85)';
    c.strokeStyle = '#7C8B93'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(bx, by, br, 0, Math.PI * 2); c.fill(); c.stroke();
    c.strokeStyle = lit > 0 ? '#C2410C' : '#6B7280'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(bx - 7, by + br); c.lineTo(bx - 5, by); c.lineTo(bx - 2, by - 5); c.lineTo(bx + 2, by + 3); c.lineTo(bx + 5, by - 3); c.lineTo(bx + 7, by + br); c.stroke();
    c.fillStyle = '#9CA3AF'; c.fillRect(bx - 9, by + br - 2, 18, 8);
    if (sc) {
      const oy = lerp(_H * 0.45, cy, seg(t, 0, 0.45));
      _icon(sc.obj, gx, oy, size);
    }
  }

  function _drawBowl(sc, t) {
    const c = _cx, size = _sz(0.14);
    _room(false);
    const top = _H * 0.32, bot = _H * 0.9, L = _W * 0.2, R = _W * 0.8, surf = _H * 0.46;
    const inset = (_W * 0.08);
    const edgeAt = y => { const k = (y - top) / (bot - top); return [L + inset * k, R - inset * k]; };
    const bowl = () => { c.beginPath(); c.moveTo(L, top); c.lineTo(R, top); c.lineTo(R - inset, bot); c.lineTo(L + inset, bot); c.closePath(); };
    bowl(); c.fillStyle = 'rgba(200,225,235,0.25)'; c.fill();
    let oy = _H * 0.1, wet = false;
    const floatY = surf - size * 0.05, sinkY = bot - size * 0.4;
    if (sc) {
      const drop = seg(t, 0, 0.3);
      oy = lerp(_H * 0.12, floatY, drop);
      if (t > 0.3) {
        if (sc.value === 'sinks') oy = lerp(floatY, sinkY, seg(t, 0.3, 0.95));
        else if (sc.value === 'soaks') { wet = t > 0.45; oy = t < 0.6 ? floatY : lerp(floatY, sinkY, seg(t, 0.6, 1)); }
        else if (!Labs.calm() && !_instant && t < 1) oy = floatY + Math.sin(t * 22) * 5 * (1 - t);
      }
      _icon(sc.obj, _W / 2, oy, size, { wet });
    }
    const [wl, wr] = edgeAt(surf);
    c.beginPath(); c.moveTo(wl, surf); c.lineTo(wr, surf); c.lineTo(R - inset, bot); c.lineTo(L + inset, bot); c.closePath();
    c.fillStyle = 'rgba(64,150,210,0.42)'; c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 2; c.beginPath(); c.moveTo(wl + 4, surf); c.lineTo(wr - 4, surf); c.stroke();
    bowl(); c.strokeStyle = '#7FA7B8'; c.lineWidth = 2.5; c.stroke();
    c.fillStyle = '#6D6656'; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'left'; c.fillText('water', wr - 40, surf + 16);
  }

  function _drawDrop(sc, t) {
    const c = _cx, tableY = _H * 0.8, size = _sz(0.26);
    _room(false); _table(tableY, false);
    const cx = _W / 2, oy = tableY - size * 0.36, topY = oy - size * 0.2;
    const tipY = _H * 0.3;
    c.fillStyle = 'rgba(210,230,240,0.7)'; c.strokeStyle = '#7FA7B8'; c.lineWidth = 1.5;
    c.fillRect(cx - 4, _H * 0.1, 8, tipY - _H * 0.1); c.strokeRect(cx - 4, _H * 0.1, 8, tipY - _H * 0.1);
    c.fillStyle = '#D97706'; c.beginPath(); c.ellipse(cx, _H * 0.08, 11, 12, 0, 0, Math.PI * 2); c.fill();
    if (!sc) return;
    _icon(sc.obj, cx, oy, size);
    const fall = seg(t, 0, 0.35);
    if (t < 0.35) {
      c.fillStyle = 'rgba(64,150,210,0.9)'; c.beginPath(); c.arc(cx, lerp(tipY + 5, topY, fall), 5, 0, Math.PI * 2); c.fill();
      return;
    }
    if (sc.value === 'absorbent') {
      const k = seg(t, 0.35, 0.85);
      c.fillStyle = `rgba(30,55,85,${0.32 * k})`; c.beginPath(); c.ellipse(cx, topY + 4, size * 0.3 * k + 2, size * 0.1 * k + 1, 0, 0, Math.PI * 2); c.fill();
      if (k < 1) { c.fillStyle = `rgba(64,150,210,${0.9 * (1 - k)})`; c.beginPath(); c.arc(cx, topY, 7 * (1 - k) + 1, 0, Math.PI * 2); c.fill(); }
    } else {
      c.fillStyle = 'rgba(64,150,210,0.85)'; c.beginPath(); c.ellipse(cx, topY - 3, 9, 6, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.85)'; c.beginPath(); c.arc(cx - 3, topY - 5, 2, 0, Math.PI * 2); c.fill();
    }
  }

  function _drawBend(sc, t) {
    const c = _cx;
    _room(false);
    const y = _H * 0.56, L = Math.min(_W * 0.56, 320), x0 = _W / 2 - L / 2, x1 = _W / 2 + L / 2;
    const hand = (x, flip) => { c.fillStyle = '#E8B98F'; c.strokeStyle = '#B98563'; c.lineWidth = 1.5; c.beginPath(); c.roundRect ? c.roundRect(x - 18, y - 22, 36, 44, 12) : c.rect(x - 18, y - 22, 36, 44); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(150,100,70,0.7)'; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(x + (flip ? -8 : 8), y + k * 9); c.lineTo(x + (flip ? 4 : -4), y + k * 9); c.stroke(); } };
    if (!sc) { hand(x0, false); hand(x1, true); return; }
    const id = sc.obj, col = BAR[id] || '#999', th = THIN[id] ? 9 : 18;
    c.lineCap = 'round';
    if (sc.value === null) {
      const sq = Labs.calm() || _instant ? 0 : Math.sin(t * Math.PI) * 0.12;
      _icon(id, _W / 2, y, _sz(0.22), { sx: 1 + sq, sy: 1 - sq });
      return;
    }
    const shake = sc.value === 'rigid' && !Labs.calm() && !_instant && t > 0.2 && t < 0.9 ? Math.sin(t * 70) * 1.5 : 0;
    if (sc.broken && t >= 0.5) {
      const k = seg(t, 0.5, 1), drop = k * _H * 0.18;
      c.strokeStyle = col; c.lineWidth = th;
      c.save(); c.translate(x0, y); c.rotate(0.12 * k); c.beginPath(); c.moveTo(0, 0); c.lineTo(L / 2 - 6, drop * 0.3); c.stroke(); c.restore();
      c.save(); c.translate(x1, y); c.rotate(-0.12 * k); c.beginPath(); c.moveTo(0, 0); c.lineTo(-L / 2 + 6, drop * 0.3); c.stroke(); c.restore();
      c.fillStyle = 'rgba(170,215,232,0.95)'; c.strokeStyle = '#5E9FB8'; c.lineWidth = 1;
      [[-14, 10], [6, 22], [18, 8], [-4, 30]].forEach(([dx, dy], i) => { const px = _W / 2 + dx, py = y + dy * k + drop * 0.4; c.beginPath(); c.moveTo(px, py - 5); c.lineTo(px + 6, py + 3 + i); c.lineTo(px - 5, py + 4); c.closePath(); c.fill(); c.stroke(); });
    } else if (id === 'lead' && t >= 0.55) {
      const k = seg(t, 0.55, 0.9);
      c.strokeStyle = col; c.lineWidth = th;
      c.save(); c.translate(x0, y); c.rotate(-0.1 * k); c.beginPath(); c.moveTo(0, 0); c.lineTo(L / 2 - 5, 0); c.stroke(); c.restore();
      c.save(); c.translate(x1, y); c.rotate(0.1 * k); c.beginPath(); c.moveTo(0, 0); c.lineTo(-L / 2 + 5, 0); c.stroke(); c.restore();
      c.fillStyle = '#6D6656'; c.font = '700 12px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('snap!', _W / 2, y - 26);
    } else {
      const sag = sc.value === 'flexible' ? -_H * 0.26 * seg(t, 0.1, 0.8) : 0;
      c.strokeStyle = col; c.lineWidth = th;
      c.beginPath(); c.moveTo(x0, y + shake); c.quadraticCurveTo(_W / 2, y + sag * 2 + shake, x1, y + shake); c.stroke();
      if (id === 'towel') { c.strokeStyle = '#3E7CB1'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y + 5); c.quadraticCurveTo(_W / 2, y + sag * 2 + 5, x1, y + 5); c.stroke(); }
      if (sc.broken && t > 0.35) { c.strokeStyle = '#1F2937'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(_W / 2 - 4, y - th / 2); c.lineTo(_W / 2 + 3, y - 2); c.lineTo(_W / 2 - 3, y + 3); c.lineTo(_W / 2 + 4, y + th / 2); c.stroke(); }
    }
    hand(x0, false); hand(x1, true);
  }

  function _drawOrigin(sc, t) {
    const c = _cx;
    _room(false);
    if (!sc) return;
    const o = D().obj(sc.obj), size = _sz(0.2), nat = sc.value === 'natural';
    _icon(sc.obj, _W * 0.25, _H * 0.5, size);
    const k = seg(t, 0, 0.7), ax0 = _W * 0.64, ax1 = _W * 0.38;
    c.strokeStyle = '#7C6F5A'; c.lineWidth = 3; c.lineCap = 'round';
    const ax = lerp(ax0, ax1, k);
    c.beginPath(); c.moveTo(ax0, _H * 0.5); c.lineTo(ax, _H * 0.5); c.stroke();
    if (k > 0.95) { c.beginPath(); c.moveTo(ax1 + 10, _H * 0.5 - 8); c.lineTo(ax1, _H * 0.5); c.lineTo(ax1 + 10, _H * 0.5 + 8); c.stroke(); }
    c.globalAlpha = seg(t, 0.2, 0.8);
    c.font = `${Math.round(size * 0.9)}px system-ui, "Segoe UI Emoji", "Apple Color Emoji", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(SRC[o.id] || (o.material === 'iron' ? '⛏️' : '🏭'), _W * 0.76, _H * 0.46);
    c.textBaseline = 'alphabetic';
    c.font = '800 14px system-ui, sans-serif'; c.fillStyle = nat ? '#23734A' : '#1D6A96';
    c.fillText(nat ? 'Natural' : 'Man-made', _W * 0.76, _H * 0.46 + size * 0.75);
    c.globalAlpha = 1;
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let k = _fx.length - 1; k >= 0; k--) {
      const f = _fx[k];
      f.t += dt;
      const p = Math.min(1, f.t / f.dur);
      if (f.type === 'zap') {
        c.fillStyle = `rgba(255,250,200,${0.85 * (1 - p)})`; c.fillRect(0, 0, _W, _H);
        c.save(); c.translate(_W / 2, _H / 2); c.scale(2.6 + p, 2.6 + p);
        c.fillStyle = `rgba(250,204,21,${1 - p * 0.6})`; c.strokeStyle = `rgba(17,17,17,${1 - p * 0.6})`; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(3.5, -20); c.lineTo(-8, 2); c.lineTo(-1, 2); c.lineTo(-5, 20); c.lineTo(9, -4); c.lineTo(2, -4); c.closePath(); c.fill(); c.stroke();
        c.restore();
      }
      if (f.t >= f.dur) { _fx.splice(k, 1); if (f.done) f.done(); }
    }
  }

  function _animate(dt) {
    if (!dt) return;
    _clock += dt;
    const sc = _b.scene;
    if (sc && sc.t < 1) {
      sc.t = Labs.calm() ? 1 : Math.min(1, sc.t + dt / (DUR[sc.st] || 1));
      if (sc.t >= 1 && sc.done) { const d = sc.done; sc.done = null; d(); }
    }
  }

  // ══ Loop ═════════════════════════════════════
  function _start() { _stop(); _last = 0; _raf = requestAnimationFrame(_loop); }
  function _stop() { if (_raf) cancelAnimationFrame(_raf); _raf = 0; }
  function _loop(ts) {
    _raf = 0;
    if (!_root || !_cv || !_cv.isConnected) { _hush(); return; }
    if (typeof S !== 'undefined' && S && S.currentScreen && S.currentScreen !== 'labs') { _hush(); return; }
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
    if (_instant && _b && _b.scene && _b.scene.t < 1) { const sc = _b.scene; sc.t = 1; if (sc.done) { const d = sc.done; sc.done = null; d(); } }
  }
  function _tick(sec) {
    const n = Math.ceil(sec / 0.05);
    for (let k = 0; k < n; k++) { _animate(0.05); _drawFx(0.05); }
    _readouts();
  }
  function _debug() {
    const b = _b || _newBench(), sc = b.scene;
    return { station: b.station, lights: b.lights, power: b.power, obj: b.obj, busy: _busy, panel: _panel, sortProp: _sortProp,
             scene: sc && { st: sc.st, obj: sc.obj, value: sc.value, fair: sc.fair, broken: sc.broken, t: sc.t },
             verdict: _verdict(sc), results: JSON.parse(JSON.stringify(_results)), talking: _talking,
             guide: _guide && { id: _guide.id, step: _guide.step },
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, tested: [..._mission.tested], jobs: [..._mission.jobs], mistakes: _mission.mistakes,
                                    hazards: _mission.hazards, success: _mission.success } };
  }

  return { mount, unmount, setStation, setLights, setPower, test, openSort, guess, openJob, pickJob, startMission, startGuide,
           discoveryGuide, speak, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMaterials = LabMaterials;
