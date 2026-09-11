'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Photosynthesis Lab (Biology, NCE Grade 9)
//
//  Two rigs on one bench:
//   - POND: pondweed under a funnel in a beaker (water bath), a lamp that
//     moves, a heat shield, three kinds of water, a thermometer - count the
//     oxygen bubbles for a minute and test the gas with a glowing splint.
//   - LEAF: prepare a plant (destarch, foil, soda-lime flask, a day of light),
//     pick a leaf and run the starch test: boil → ethanol in a water bath →
//     rinse → iodine.
//  Guided experiments, three Missions and a collection of Discoveries.
//
//  ⚠ Every outcome comes from lab_photo_data.js (LabPhotoData). This file only
//    moves things over time and draws them. If a result looks wrong on screen,
//    fix the DATA, not the animation.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the simulation still runs and the rig still
//    shows its state, but nothing moves and effects apply at once.
//  ⚠ Every control is a tap on a real <button>; there is nothing to drag.
// ══════════════════════════════════════════════
const LabPhoto = (() => {
  const P = () => LabPhotoData;
  const FRAME_MS = 1000 / 30;
  const COUNT_SEC = 6;          // real seconds that stand for the counted minute
  const FX_DUR = { dip: 0.7, fire: 1.3, splint: 0.9, drip: 0.6, day: 0.9 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _rig = 'pond', _pond = null, _leaf = null, _bunsen = false, _bathHot = false;
  let _prev = null, _runs = [], _leafRuns = [], _log = [];
  let _panel = 'sandbox', _mission = null, _guide = null;
  let _parts = [], _fx = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _said = {}, _emit = 0;
  // Primary levels (Grades 4 and 6): two pots, seed dishes, waterweed.
  let _g = 9, _pots = null, _seeds = null, _weed = null, _wprev = null, _wruns = [], _potRuns = [], _seedRuns = [];
  let _lapse = null, _talking = false, _obs = null;

  // The grade the lab is being used at (Labs.grade(), LAB_SPEC §9). Anything
  // the lab has no level for is the original Grade 9 level.
  function _grade() {
    let g = null;
    try { g = typeof Labs.grade === 'function' ? Number(Labs.grade()) : null; } catch (e) { g = null; }
    return P().LEVELS[g] ? g : 9;
  }
  const _primary = () => _g !== 9;
  const _mine = list => list.filter(x => (x.grades || [9]).includes(_g));
  const _level = () => P().LEVELS[_g];
  const _introKey = () => _g === 9 ? 'intro' : 'intro_g' + _g;

  function _newPots() { return { sel: 'A', twin: true, A: P().newPot(), B: P().newPot(), day: 0, res: null, check: null }; }
  function _newSeeds() { const d = {}; P().DISHES.forEach(i => { d[i] = P().newDish(); }); return { sel: 1, dishes: d, day: 0, res: null, look: false }; }
  function _newWeed() {
    return { dist: 30, lampOn: true, water: 'soda', temp: P().ROOM_TEMP, shield: false, counting: null, last: null, gas: 0, heatNow: 0, relit: 0 };
  }
  // The waterweed is drawn by the pondweed painter: give it the pondweed's shape.
  const _weedView = () => Object.assign({}, _weed, { water: P().WEED_WATERS[_weed.water].model });

  function _newPond() {
    return { dist: 30, lampOn: true, water: 'low', temp: P().ROOM_TEMP, shield: false, counting: null, last: null, gas: 0, heatNow: 0, relit: 0 };
  }
  function _newLeaf(plant) {
    return { plant: plant || 'green', destarched: false, cover: 'none', day: null, picked: false,
             steps: [], tested: false, map: null, setup: null, reading: null };
  }
  function _resetBench() {
    _pond = _newPond(); _leaf = _newLeaf('green'); _bunsen = false; _bathHot = false;
    _prev = null; _parts = []; _fx = []; _said = {}; _busy = false;
    _pots = _newPots(); _seeds = _newSeeds(); _weed = _newWeed(); _wprev = null; _wruns = []; _lapse = null;
    if (_level() && !_level().rigs.includes(_rig)) _rig = _level().rigs[0];
  }
  const _setup = () => ({ plant: _leaf.plant, destarched: _leaf.destarched, cover: _leaf.cover, day: _leaf.day });

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    const Lv = _level(), prim = _primary();
    return `<div class="lab lab-photo${prim ? ' is-primary' : ''}">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${esc(Lv.eyebrow)}</span><h1>Photosynthesis Lab</h1></div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-seg lab-photo-rigs" role="group" aria-label="Choose the rig">
            ${Lv.rigs.map(r => `<button type="button" data-set="rig" data-v="${r}">${P().RIG_NAMES[r]}</button>`).join('')}
          </div>
          <div class="lab-canvas-wrap" id="lab-photo-stage">
            <canvas id="lab-canvas" role="img" aria-label="${prim ? 'Plants on the bench' : 'The photosynthesis bench'}"></canvas>
            <div class="lab-photo-chips" id="lab-photo-chips"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            ${prim ? '<button type="button" class="lab-coach-tip lab-photo-say" data-act="say-coach" aria-label="Read this aloud">🔊</button>' : ''}
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-photo-tools" id="lab-photo-tools"></div>
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
    // ⚠ The module outlives the screen: a bench left at one grade must not
    //   greet a pupil at another with its guide, mission or notebook.
    const g = _grade();
    if (!_pond || g !== _g) {
      _g = g; _guide = null; _mission = null; _panel = 'sandbox';
      _runs = []; _leafRuns = []; _log = []; _potRuns = []; _seedRuns = []; _tipIdx = -1;
      _rig = _level().rigs[0];
      _resetBench();
    }
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _cv.addEventListener('click', _canvasTap);
    _resize();
    _wire();
    _renderPanel();
    _renderTools();
    _syncSet();
    _readouts();
    const st = Labs.store('photo');
    const prim = _primary();
    if (!st[_introKey()]) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach(prim ? 'Back on your mission. Carry on where you left off.' : 'Back on your mission - carry on where you left off.');
    else _coach(_mine(P().GUIDES).some(G => st.guides[G.id])
      ? (prim ? 'Welcome back! Pick a guided experiment or a mission below.' : 'Welcome back! Pick a guided experiment or a mission below - or set up the rig yourself.')
      : (prim ? '👋 New here? Pick a guided experiment below. I will show you what to tap.' : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.'));
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    // ⚠ Leaving the Labs screen must stop speech at once, and coming back must
    //   restart the loop: once the loop sees it is off-screen it stops for good.
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

  // ══ Read aloud (primary levels; never automatic) ══
  const _synth = () => (typeof window !== 'undefined' && window.speechSynthesis) || null;
  // Emoji and arrows would be read out by name ("light bulb", "right arrow").
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
  function _say(text) {
    const ss = _synth(), t = _plain(text);
    if (!ss || typeof SpeechSynthesisUtterance === 'undefined') { _coach('Read-aloud does not work in this browser.'); return; }
    if (!t) return;
    _hush();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-GB'; u.rate = 0.95;
    const v = _voice(); if (v) { try { u.voice = v; } catch (e) {} }
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    try { ss.speak(u); } catch (e) { _talking = false; }
  }
  // Cancel only when something is speaking - cancel-then-speak stalls Chrome.
  function _hush() {
    const ss = _synth();
    if (!ss) { _talking = false; return; }
    if (_talking || ss.speaking || ss.pending) { try { ss.cancel(); } catch (e) {} }
    _talking = false;
  }
  // Every overlay goes through these, so speech never talks over a card.
  function _overlay(html, o) { _hush(); return Labs.overlay(html, o); }
  function _hazardCard(o) { _hush(); return Labs.hazardCard(o); }
  function _resultCard(o) { _hush(); return Labs.resultCard(o); }

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
    const h = Math.round(Math.min(380, Math.max(250, w * 0.7)));
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
  // On a phone the controls sit below the rig: bring the rig back into view so
  // the pupil sees what their tap did.
  function _showStage() {
    const z = $('lab-photo-stage');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // Tapping a pot or a dish on the picture chooses it (the shelf buttons do
  // the same, and are the way that always works).
  function _canvasTap(e) {
    if (!_primary() || _busy || !_cv) return;
    const r = _cv.getBoundingClientRect(), x = (e.clientX - r.left) / (r.width || 1);
    if (_rig === 'pots') { const id = x < 0.5 ? 'A' : 'B'; if (id === 'A' || _pots.twin) _set('pot', id); }
    else if (_rig === 'seeds') _set('dish', String(Math.min(4, Math.max(1, Math.floor(x * 4) + 1))));
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
      case 'say-guide': { const el = _root && _root.querySelector('#lab-guide .lab-guide-say'); if (el) _say(el.textContent); break; }
      case 'week': if (_primary()) week(); break;
      case 'days': if (_primary()) days(); break;
      case 'look': if (_primary()) look(); break;
      case 'wcount': if (_primary()) wcount(); break;
      case 'wcloser': case 'wfurther': {
        if (!_primary()) break;
        const D = P().WEED_DISTS, i = D.indexOf(_weed.dist);
        const j = act === 'wcloser' ? Math.min(D.length - 1, i + 1) : Math.max(0, i - 1);
        if (j === i) { _coach(act === 'wcloser' ? 'The lamp is as close as it goes: 20 cm.' : 'The lamp is as far as it goes: 50 cm.'); break; }
        _set('wdist', String(D[j]));
        break;
      }
      case 'fresh': if (_primary()) fresh(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. The bench is all yours.'); _renderPanel(); break;
      case 'mission-restart': if (_mission) { const id = _mission.id; startMission(id); } break;
      case 'guide-stop': _stopGuide(false); break;
      case 'closer': case 'further': {
        const D = P().DISTANCES, i = D.indexOf(_pond.dist);
        const j = act === 'closer' ? Math.max(0, i - 1) : Math.min(D.length - 1, i + 1);
        if (j === i) { _coach(act === 'closer' ? 'The lamp is as close as it goes: 10 cm.' : 'The lamp is as far as it goes: 50 cm.'); break; }
        _set('dist', String(D[j]));
        break;
      }
      case 'count': count(); break;
      case 'splint': splint(); break;
      case 'destarch': destarch(); break;
      case 'pick': pick(); break;
      case 'boil': boil(); break;
      case 'ethanol': ethanol(false); break;
      case 'flame': ethanol(true); break;
      case 'rinse': rinse(); break;
      case 'iodine': iodine(); break;
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
    const f = _primary() ? P().FACTS_G[_g] : P().FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Settings ═════════════════════════════════
  const POT_KEYS = ['pot', 'spot', 'drink', 'soil', 'leaves', 'twin'];
  const SEED_KEYS = ['dish', 'wet', 'place'];
  const WEED_KEYS = ['wlamp', 'wdist', 'wwater'];
  const G9_KEYS = ['dist', 'lamp', 'water', 'temp', 'shield', 'plant', 'cover', 'day', 'bunsen'];
  function _set(k, v) {
    if (_busy) { _coach(_primary() ? 'One thing at a time. Let that finish first.' : 'One thing at a time - let that finish first.'); return; }
    if (_primary()) { if (G9_KEYS.includes(k)) return; if (_setPrimary(k, v)) return; }
    else if (POT_KEYS.includes(k) || SEED_KEYS.includes(k) || WEED_KEYS.includes(k)) return;
    const p = _pond;
    const pondKey = ['dist', 'lamp', 'water', 'temp', 'shield'].includes(k);
    if (pondKey && p.counting) { _coach('Wait for the count to finish before you change anything.'); return; }
    if (pondKey && _rig !== 'pond') { _rig = 'pond'; _renderTools(); if (_panel !== 'found') _renderPanel(); }
    const leafKey = ['plant', 'cover', 'day', 'bunsen'].includes(k);
    if (leafKey && _rig !== 'leaf') { _rig = 'leaf'; _renderTools(); if (_panel !== 'found') _renderPanel(); }
    switch (k) {
      case 'rig':
        if (v !== 'pond' && v !== 'leaf') return;
        if (p.counting) { _coach('Wait for the count to finish first.'); return; }
        _rig = v;
        _renderTools();
        if (_panel !== 'found') _renderPanel();
        _coach(v === 'pond'
          ? 'The pondweed rig: move the lamp, change the water, then count the bubbles for a minute.'
          : 'The starch-test bench: prepare a plant, pick a leaf, then test it for starch - boil, ethanol, rinse, iodine.');
        break;
      case 'dist': {
        const d = +v;
        if (!P().DISTANCES.includes(d)) return;
        p.dist = d;
        if (!p.lampOn) _coach(`Lamp moved to ${d} cm - but it is switched off, so the room is still dark.`);
        else _coach(`Lamp at ${d} cm. Light intensity: ${Math.round(P().light(d, true))} units${d <= 15 && !p.shield ? ' - close enough to warm the water. Is the heat shield in?' : '.'}`);
        break;
      }
      case 'lamp':
        p.lampOn = v === 'on';
        _coach(p.lampOn ? 'Lamp on.' : 'Lamp off. The room is dark - the lamp was its only light.');
        break;
      case 'water':
        if (!P().WATERS[v]) return;
        p.water = v;
        _coach(v === 'none' ? 'Fresh tube of boiled and cooled water: boiling drove out the dissolved carbon dioxide.'
          : v === 'low' ? 'Pond water: it holds only a little dissolved carbon dioxide.'
          : 'Sodium hydrogencarbonate added: it gives off carbon dioxide in the water - plenty for the pondweed.');
        break;
      case 'temp': {
        const t = +v;
        if (!P().TEMPS.includes(t)) return;
        p.temp = t;
        _coach(`Water bath set to ${t} °C.${t >= 40 ? ' That is hot for a pondweed.' : ''}`);
        break;
      }
      case 'shield':
        p.shield = v === 'on';
        _coach(p.shield ? 'Heat shield in: a glass tank of water between the lamp and the tube soaks up the lamp’s heat.'
                        : 'Heat shield out. A close lamp can now warm the water.');
        break;
      case 'plant':
        if (!P().PLANTS[v]) return;
        _leaf = _newLeaf(v);
        _coach(v === 'variegated' ? 'A variegated plant: its leaves are green in the middle and white at the edges. The white parts have no chlorophyll.'
                                  : 'A green plant that has been on a sunny windowsill.');
        break;
      case 'cover':
        if (!P().COVERS[v]) return;
        if (_leaf.day) { _coach('The plant has already had its day. Set up the cover BEFORE the day - choose the plant again to start over.'); return; }
        _leaf.cover = v; _leaf.picked = false; _leaf.tested = false; _leaf.steps = [];
        _coach(v === 'foil' ? 'A strip of foil fixed across the middle of one leaf - no light can reach under it.'
          : v === 'sodalime' ? 'One leaf sealed in a flask with soda lime, which absorbs carbon dioxide from the air inside.'
          : v === 'flask' ? 'One leaf sealed in the same kind of flask, but WITHOUT soda lime - the control.'
          : 'Nothing covering the leaves.');
        break;
      case 'day':
        if (v !== 'light' && v !== 'dark') return;
        _busy = true;
        _fxAdd('day', () => {
          _busy = false;
          _leaf.day = v; _leaf.picked = false; _leaf.tested = false; _leaf.steps = [];
          _coach(v === 'light' ? 'A whole day in sunlight. Now pick a leaf and test it for starch.' : 'A day in the dark - no light for photosynthesis.');
          _after('day:' + v);
        }, { night: v === 'dark' });
        return;
      case 'bunsen':
        _bunsen = v === 'on';
        if (_bunsen) _bathHot = true;
        _renderTools();
        _coach(_bunsen ? 'Bunsen lit. The water in the beaker is boiling.' : 'Bunsen off. The water stays hot for a good while - hot enough for a water bath.');
        break;
      default: return;
    }
    _after(k + ':' + v);
  }

  // The primary settings (pots, seed dishes, waterweed). Returns true when the
  // key was handled - or refused - here.
  function _freshWeek() { if (_pots.day || _pots.res) { _pots.day = 0; _pots.res = null; _pots.check = null; } }
  function _freshSeeds() { if (_seeds.day || _seeds.res) { _seeds.day = 0; _seeds.res = null; } _seeds.look = false; }
  function _setPrimary(k, v) {
    const D = P();
    if (k === 'rig') {
      if (!_level().rigs.includes(v)) return true;
      if (_weed.counting) { _coach('Wait for the count to finish first.'); return true; }
      _rig = v;
      _renderTools();
      if (_panel !== 'found') _renderPanel();
      _coach(v === 'pots' ? (_g === 4 ? 'Two plant pots. Change where one stands, its water or its soil. Then wait 7 days.'
                                      : 'Two plant pots. Take away light, water or leaves from one. Then wait 7 days.')
        : v === 'seeds' ? 'Four dishes of bean seeds on cotton wool. Change a dish, then wait 4 days.'
        : 'Waterweed under a funnel. Move the lamp, then count the bubbles for a minute.');
      _after('rig:' + v);
      return true;
    }
    const rigFor = POT_KEYS.includes(k) ? 'pots' : SEED_KEYS.includes(k) ? 'seeds' : WEED_KEYS.includes(k) ? 'weed' : null;
    if (!rigFor) return true;
    if (!_level().rigs.includes(rigFor) || (k === 'soil' && _g !== 4) || (k === 'leaves' && _g !== 6)) return true;
    if (rigFor === 'weed' && _weed.counting) { _coach('Wait for the count to finish before you change anything.'); return true; }
    if (_rig !== rigFor) { _rig = rigFor; _renderTools(); if (_panel !== 'found') _renderPanel(); }
    if (rigFor === 'pots') {
      const s = _pots;
      if (k === 'pot') {
        if (v !== 'A' && v !== 'B') return true;
        if (v === 'B' && !s.twin) { _coach('There is no pot B. Choose “Two plants” first.'); return true; }
        s.sel = v;
        _coach(`Pot ${v} chosen. Now change ONE thing about it.`);
      } else if (k === 'twin') {
        if (v !== 'on' && v !== 'off') return true;
        s.twin = v === 'on';
        if (!s.twin) s.sel = 'A';
        _freshWeek();
        _coach(s.twin ? 'Two plants side by side. Pot B can be your test plant.' : 'Only one plant now: pot A. What will you compare it with?');
      } else {
        const map = { spot: D.SPOTS, drink: D.DRINKS, soil: D.SOILS, leaves: D.LEAVES };
        if (!map[k][v]) return true;
        s[s.sel][k] = v;
        _freshWeek();
        const n = 'Pot ' + s.sel;
        const say = {
          spot: { sun: `${n} is on the sunny windowsill.`, dark: `${n} is in the dark cupboard. It is warm there, but dark.`,
                  lamp: `${n} is right under a lamp. The bulb gets very hot…` },
          drink: { some: `${n} gets a little water every day.`, none: `${n} gets no water at all.`, flood: `${n} will stand in water all week.` },
          soil: { rich: `${n} has soil with compost. It is full of minerals.`, sand: `${n} has plain sand. Sand has hardly any minerals.` },
          leaves: { on: `${n} keeps its leaves.`, off: `All the leaves are cut off ${n.toLowerCase()}.` },
        };
        _coach(say[k][v]);
      }
    } else if (rigFor === 'seeds') {
      const s = _seeds;
      if (k === 'dish') {
        if (!D.DISHES.includes(+v)) return true;
        s.sel = +v;
        _coach(`Dish ${v} chosen.`);
      } else {
        const map = { wet: D.WETS, place: D.PLACES };
        if (!map[k][v]) return true;
        s.dishes[s.sel][k] = v;
        _freshSeeds();
        const n = 'Dish ' + s.sel;
        const say = {
          wet: { damp: `${n}: damp cotton wool.`, dry: `${n}: dry cotton wool. No water.`, drown: `${n}: the seeds are under water. No air can reach them.` },
          place: { cupboard: `${n} is in the warm dark cupboard.`, window: `${n} is on the sunny windowsill.`, fridge: `${n} is in the cold fridge. It is cold and dark.` },
        };
        _coach(say[k][v]);
      }
    } else {
      const w = _weed;
      if (k === 'wlamp') {
        if (v !== 'on' && v !== 'off') return true;
        w.lampOn = v === 'on';
        _coach(w.lampOn ? 'Lamp on.' : 'Lamp off. The room is dark now.');
      } else if (k === 'wdist') {
        if (!D.WEED_DISTS.includes(+v)) return true;
        w.dist = +v;
        _coach(w.lampOn ? `Lamp at ${v} cm from the waterweed.` : `Lamp moved to ${v} cm. It is still switched off.`);
      } else {
        if (!D.WEED_WATERS[v]) return true;
        w.water = v;
        _coach(v === 'soda' ? 'Pond water with baking soda. It has carbon dioxide in it.' : 'Boiled and cooled water. Boiling drove out the carbon dioxide.');
      }
    }
    _after(k + ':' + v);
    return true;
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
    const cur = { rig: _rig, dist: String(_pond.dist), lamp: _pond.lampOn ? 'on' : 'off', water: _pond.water,
                  temp: String(_pond.temp), shield: _pond.shield ? 'on' : 'off', plant: _leaf.plant, cover: _leaf.cover, day: _leaf.day || '' };
    if (_primary()) {
      const pt = _pots[_pots.sel], ds = _seeds.dishes[_seeds.sel];
      Object.assign(cur, { pot: _pots.sel, twin: _pots.twin ? 'on' : 'off', spot: pt.spot, drink: pt.drink, soil: pt.soil, leaves: pt.leaves,
        dish: String(_seeds.sel), wet: ds.wet, place: ds.place, wlamp: _weed.lampOn ? 'on' : 'off', wdist: String(_weed.dist), wwater: _weed.water });
    }
    _root.querySelectorAll('[data-set]').forEach(b => {
      const k = b.dataset.set;
      if (k in cur) b.setAttribute('aria-pressed', String(cur[k] === b.dataset.v));
    });
    const ps = $('lab-photo-prep');
    if (ps) ps.textContent = _prepText();
  }

  // ══ Pondweed ═════════════════════════════════
  function count() {
    if (_busy) return;
    if (_rig !== 'pond') { _set('rig', 'pond'); }
    const p = _pond;
    if (p.counting) { _coach('Already counting - keep watching the bubbles.'); return; }
    const run = P().countRun(p);
    p.counting = { t: 0, run, shown: 0 };
    _coach(run.lampOn ? 'Counting the bubbles for one minute… watch the funnel.' : 'Counting for one minute, in the dark…');
    if (_instant || Labs.calm()) _finishCount();
    _readouts();
  }

  function _finishCount() {
    const p = _pond, c = p.counting;
    if (!c) return;
    p.counting = null;
    const run = c.run;
    p.gas += run.bubbles;
    p.last = run;
    p.heatNow = 0;
    run.n = _runs.length + 1;
    _runs.unshift(run);
    if (_runs.length > 30) _runs.length = 30;
    const prev = _prev;
    _prev = run;
    const W = P().WATERS[run.water];
    _logEntry({ title: `Count ${run.n}: ${run.bubbles} bubbles per minute`,
      obs: `${run.lampOn ? `Lamp at ${run.dist} cm` : 'Lamp off'} · ${W.name.toLowerCase()} · ${run.temp === run.tempEnd ? run.temp + ' °C' : run.temp + ' → ' + run.tempEnd + ' °C'}. ${run.bubbles === 0 ? 'Not a single bubble.' : `Limited by ${P().LIMIT_WORDS[P().limiting({ dist: run.dist, lampOn: run.lampOn, water: run.water, temp: run.temp })]}.`}` });
    P().pondDiscoveries(prev, run).forEach(_discover);
    let card = null;
    if (_mission && (_mission.id === 'light' || _mission.id === 'needs')) card = _missionRun(run);
    else {
      const ch = P().changedVars(prev, run);
      if (ch.length >= 2 && !_said.twoVars) { _said.twoVars = true; card = _twoVarsCard(ch, prev, run); }
      else if (run.heated && !_said.heat) { _said.heat = true; card = _heatCard(run); }
      else _coach(run.bubbles === 0
        ? (run.lampOn ? 'No bubbles at all. Something the pondweed needs is missing.' : 'No bubbles in the dark. Photosynthesis needs light.')
        : `${run.bubbles} bubbles per minute - recorded in your notebook. Change ONE thing and count again.`);
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent('count');
  }

  function _twoVarsCard(ch, a, b) {
    const R = P().RESULTS.two_vars;
    const list = ch.map(x => P().VAR_NAMES[x]);
    const words = list.length > 1 ? list.slice(0, -1).join(', ') + ' and ' + list[list.length - 1] : list[0];
    return () => Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ list: words, a: a.bubbles, b: b.bubbles }),
      instead: R.instead, exam: R.exam, onClose: () => _coach('Change one thing at a time. Everything else stays the same.') });
  }
  function _heatCard(run) {
    const R = P().RESULTS.lamp_heat;
    return () => Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ dist: run.dist, t0: run.temp, t1: run.tempEnd }),
      instead: R.instead, exam: R.exam, onClose: () => _coach('Tap “Heat shield: In” in the set-up, then count again.') });
  }

  function _missionRun(run) {
    const ms = _mission;
    if (ms.id === 'light') {
      if (!run.lampOn) { _coach('For this mission the lamp stays ON - you are changing its distance.'); return null; }
      if (run.heated) { ms.errors++; return _heatCard(run); }
      if (!ms.base && run.water !== 'high') { _coach('Add sodium hydrogencarbonate first, so carbon dioxide does not hold the rate back. Then count again.'); return null; }
      if (ms.base && (run.water !== ms.base.water || run.temp !== ms.base.temp)) {
        ms.errors++;
        const ch = ['light'];
        if (run.water !== ms.base.water) ch.push('co2');
        if (run.temp !== ms.base.temp) ch.push('temp');
        return _twoVarsCard(ch, ms.base, run);
      }
      ms.base = ms.base || { water: run.water, temp: run.temp, bubbles: run.bubbles, light: run.light };
      ms.results[run.dist] = run.bubbles;
      const n = Object.keys(ms.results).length;
      if (n >= 4 && !ms.success) { ms.success = true; _coach('Four distances tested fairly! Look at your table, then tap “Answer the questions”.'); Labs.confetti(); }
      else if (!ms.success) _coach(`Recorded: ${run.bubbles} bubbles per minute at ${run.dist} cm (${n}/4). Now change ONLY the distance.`);
      return null;
    }
    // needs: four tests, light × carbon dioxide
    if (run.heated) { ms.errors++; return _heatCard(run); }
    if (ms.base && run.temp !== ms.base.temp) {
      ms.errors++;
      return _twoVarsCard(['temp'].concat(run.lampOn !== ms.base.lampOn ? ['light'] : []).concat((run.water !== 'none') !== (ms.base.water !== 'none') ? ['co2'] : []), ms.base, run);
    }
    if (run.lampOn && ms.baseDist && run.dist !== ms.baseDist) {
      _coach(`Keep the lamp at ${ms.baseDist} cm for every test - the distance is a controlled variable here.`);
      return null;
    }
    ms.base = ms.base || { temp: run.temp, lampOn: run.lampOn, water: run.water, bubbles: run.bubbles, light: run.light };
    if (run.lampOn) ms.baseDist = ms.baseDist || run.dist;
    const key = (run.lampOn ? 'L' : 'l') + (run.water !== 'none' ? 'C' : 'c');
    ms.results[key] = run.bubbles;
    const n = Object.keys(ms.results).length;
    if (n >= 4 && !ms.success) { ms.success = true; _coach('All four tests done. Which ones made bubbles? Tap “Answer the questions”.'); Labs.confetti(); }
    else if (!ms.success) _coach(`Test recorded (${n}/4). Change the lamp or the water for the next one.`);
    return null;
  }

  function splint() {
    if (_busy) return;
    if (_rig !== 'pond') { _set('rig', 'pond'); }
    if (_pond.counting) { _coach('Let the count finish first.'); return; }
    _busy = true;
    const enough = _pond.gas >= P().GAS_FOR_SPLINT;
    _fxAdd('splint', () => {
      _busy = false;
      if (enough) {
        _pond.relit = 1;
        _discover('oxygen');
        _logEntry({ title: 'Glowing splint test', obs: 'The glowing splint relit in the gas from the tube, so the gas is OXYGEN - made by photosynthesis.', note: true });
        _coach('It relit! A glowing splint relights in oxygen. The pondweed made it by photosynthesis.');
        _pond.gas = 0;
        _after('splint');
      } else {
        _coach(_pond.gas > 0 ? 'Not enough gas in the tube yet to test. Count some more bubbles to collect it.'
                             : 'There is no gas in the tube yet. Shine the lamp on the pondweed and count some bubbles first.');
      }
    }, { lit: enough });
  }

  // ══ Primary: a week in two pots, four days of seeds, the waterweed ══
  const _words = list => list.length > 1 ? list.slice(0, -1).join(', ') + ' and ' + list[list.length - 1] : (list[0] || '');

  function fresh() {
    if (_busy) { _coach('One thing at a time. Let that finish first.'); return; }
    if (_rig === 'seeds') { const s = _seeds.sel; _seeds = _newSeeds(); _seeds.sel = s; _coach('Fresh bean seeds on damp cotton wool, in the warm dark cupboard.'); }
    else if (_rig === 'pots') { const t = _pots.twin; _pots = _newPots(); _pots.twin = t; _coach('Fresh young plants. Both pots are the same again.'); }
    else return;
    _after('fresh');
  }

  // A simulated time-lapse: the days run in _step(), so the plants grow on the
  // canvas; Calm Mode (and the tests' instant mode) jumps straight to the end.
  function week() {
    if (_busy) return;
    if (_rig !== 'pots') _set('rig', 'pots');
    const s = _pots, D = P();
    if (s.res) { _coach('That week is over. Change something to start again with new plants.'); return; }
    const check = D.potCheck(_g, s);
    s.res = {};
    (s.twin ? ['A', 'B'] : ['A']).forEach(id => { s.res[id] = D.potResult(s[id]); });
    s.check = check;
    _busy = true;
    const hot = !!(check && check.hazard);
    _lapse = { kind: 'pots', t: 0, to: hot ? 1 : D.WEEK_DAYS, sec: hot ? 1.2 : 3.5 };
    _coach(hot ? 'Fast-forwarding… watch the plant under the lamp!' : 'Fast-forwarding one week… watch both plants.');
    if (_instant || Labs.calm()) _endLapse();
    _readouts();
  }

  function days() {
    if (_busy) return;
    if (_rig !== 'seeds') _set('rig', 'seeds');
    const s = _seeds, D = P();
    if (s.res) { _coach('Those seeds are done. Change a dish to start again with new seeds.'); return; }
    s.res = {};
    D.DISHES.forEach(i => { s.res[i] = D.seedResult(s.dishes[i]); });
    s.look = false;
    _busy = true;
    _lapse = { kind: 'seeds', t: 0, to: D.SEED_DAYS, sec: 3 };
    _coach('Fast-forwarding 4 days… watch the seeds.');
    if (_instant || Labs.calm()) _endLapse();
    _readouts();
  }

  function _endLapse() {
    const L = _lapse;
    if (!L) return;
    _lapse = null;
    _busy = false;
    if (L.kind === 'pots') { _pots.day = L.to; _endWeek(); }
    else { _seeds.day = L.to; _endSeeds(); }
  }

  function _endWeek() {
    const s = _pots, D = P(), check = s.check;
    if (check && check.hazard) { _hazard(check.hazard); return; }
    const ids = s.twin ? ['A', 'B'] : ['A'];
    const run = { n: _potRuns.length + 1, twin: s.twin, pots: ids.map(id => ({ id, set: Object.assign({}, s[id]), res: s.res[id] })) };
    _potRuns.unshift(run);
    if (_potRuns.length > 12) _potRuns.length = 12;
    _logEntry({ title: `Week ${run.n}: after 7 days`, obs: run.pots.map(p => `Pot ${p.id}: ${p.res.words}`).join(' ') });
    let card = null;
    if (check && check.card) {
      if (_mission) _mission.errors++;
      card = check.card === 'two_things'
        ? _resCard('two_things', { list: _words(check.changed.map(x => D.POT_VAR_WORDS[x])) }, 'Change one thing at a time. Tap “New plants” and try again.')
        : check.card === 'flood'
          ? _resCard('flood', {}, 'A little water each day. Tap “New plants” and try again.')
          : _resCard('no_control', {}, 'Choose “Two plants”, so pot B can be the control.');
    } else D.potDiscoveries(_g, s).forEach(_discover);
    if (!card) {
      const ch = s.twin ? D.potDiff(_g, s.A, s.B) : [];
      _coach(!s.twin ? `Pot A: ${s.res.A.words} Grow a second plant next time, to compare.`
        : !ch.length ? 'Both plants were the same, so both grew the same. Change ONE thing in pot B to test it.'
        : `A fair test! Only ${D.POT_VAR_WORDS[ch[0]]} was different. Compare pot A and pot B.`);
      if (_mission) _missionPots();
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent('week');
  }

  function _missionPots() {
    const ms = _mission, D = P(), M = D.MISSIONS.find(x => x.id === ms.id);
    if (!M || !M.fair || !_pots.twin) return;
    const s = _pots, ch = D.potDiff(_g, s.A, s.B);
    const test = D.isNormal(s.A) ? s.B : D.isNormal(s.B) ? s.A : null;
    if (ch.length !== 1 || !M.fair.includes(ch[0]) || !test || test[ch[0]] !== D.POT_TEST_VALUE[ch[0]]) {
      if (!ms.success) _coach('That is not one of the two tests. Look at the list in the mission.');
      return;
    }
    ms.results[ch[0]] = true;
    const n = M.fair.filter(f => ms.results[f]).length;
    if (n >= M.fair.length && !ms.success) { ms.success = true; _coach('Both fair tests done! Tap “Answer the questions”.'); Labs.confetti(); }
    else if (!ms.success) _coach(`Fair test ${n} of ${M.fair.length} done. Now the other test. Change only that one thing.`);
  }

  function _endSeeds() {
    const s = _seeds, D = P();
    const run = { n: _seedRuns.length + 1, dishes: D.DISHES.map(i => ({ i, set: Object.assign({}, s.dishes[i]), res: s.res[i] })) };
    _seedRuns.unshift(run);
    if (_seedRuns.length > 8) _seedRuns.length = 8;
    _logEntry({ title: `Seeds ${run.n}: after 4 days`, obs: run.dishes.map(d => `Dish ${d.i}: ${d.res.words}`).join(' ') });
    const check = D.seedCheck(s.dishes);
    let card = null;
    if (check) {
      if (_mission) _mission.errors++;
      card = _resCard('fridge_two', {}, 'Compare the fridge with the warm dark cupboard. Then try again.');
    } else D.seedDiscoveries(s.dishes).forEach(_discover);
    if (!card) {
      const n = run.dishes.filter(d => d.res.sprouted).length;
      _coach(n ? `${n} of 4 dishes sprouted. What was different about the others?` : 'No seeds sprouted at all. Something they need is missing.');
      const ms = _mission;
      if (ms && ms.id === 'g4_seeds') {
        const M = D.MISSIONS.find(x => x.id === 'g4_seeds'), got = D.seedDiscoveries(s.dishes);
        if (M.finds.every(f => got.includes(f)) && !ms.success) { ms.success = true; _coach('Water, warmth and air: all three found! Tap “Answer the questions”.'); Labs.confetti(); }
        else if (!ms.success) _coach('Not all three yet. Set the dishes like the list in the mission, then wait 4 days.');
      }
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent('days');
  }

  function look() {
    if (_busy) return;
    if (_rig !== 'seeds') _set('rig', 'seeds');
    const s = _seeds;
    if (!s.res || s.day < 3) { _coach('Nothing to see yet. Wait 4 days first.'); return; }
    if (!s.res[s.sel].sprouted) { _coach(`Dish ${s.sel} did not sprout. Choose a dish that did.`); return; }
    s.look = true;
    _discover('g4_root');
    _logEntry({ title: 'A close look', obs: 'A white root came out first and grew down. Then a shoot grew up.', note: true });
    _coach('Look! The root came out first and grows down. Then the shoot grows up.');
    _after('look');
  }

  function wcount() {
    if (_busy) return;
    if (_rig !== 'weed') _set('rig', 'weed');
    const w = _weed;
    if (w.counting) { _coach('Already counting. Keep watching the bubbles.'); return; }
    const run = P().weedRun(w);
    w.counting = { t: 0, run, shown: 0 };
    _coach(run.lampOn ? 'Counting the bubbles for one minute… watch the funnel.' : 'Counting for one minute, in the dark…');
    if (_instant || Labs.calm()) _finishWeed();
    _readouts();
  }

  function _finishWeed() {
    const w = _weed, c = w.counting, D = P();
    if (!c) return;
    w.counting = null;
    const run = c.run;
    run.n = _wruns.length + 1;
    w.gas += run.bubbles;
    w.last = run;
    _wruns.unshift(run);
    if (_wruns.length > 30) _wruns.length = 30;
    const prev = _wprev;
    _wprev = run;
    _logEntry({ title: `Count ${run.n}: ${run.bubbles} bubbles in a minute`,
      obs: `${run.lampOn ? `Lamp at ${run.dist} cm` : 'Lamp off'} · ${D.WEED_WATERS[run.water].name.toLowerCase()}. ${run.bubbles === 0 ? 'Not one bubble.' : 'The bubbles are oxygen.'}` });
    D.weedDiscoveries(prev, run, _wruns).forEach(_discover);
    let card = null;
    const ch = D.weedDiff(prev, run);
    if (ch.length >= 2) {
      if (_mission) _mission.errors++;
      card = _resCard('two_things', { weed: true, list: _words(ch.map(x => D.WEED_VAR_WORDS[x])) }, 'Change one thing at a time. Everything else stays the same.');
    } else {
      _coach(run.bubbles === 0
        ? (run.lampOn ? 'No bubbles at all. Something the waterweed needs is missing.' : 'No bubbles in the dark. Plants need light to make food.')
        : `${run.bubbles} bubbles in a minute. Change ONE thing and count again.`);
      if (_mission && _mission.id === 'g6_gases') _missionWeed(run);
    }
    _readouts();
    _refresh();
    if (card) card();
    _guideEvent('wcount');
  }

  function _missionWeed(run) {
    const ms = _mission, M = P().MISSIONS.find(x => x.id === 'g6_gases');
    if (run.lampOn && ms.baseDist && run.dist !== ms.baseDist) { _coach(`Keep the lamp at ${ms.baseDist} cm for every count. It must not change.`); return; }
    const t = M.tests.findIndex(x => x.lampOn === run.lampOn && x.water === run.water);
    if (t < 0) { _coach('That test is not on the list. Look at the three tests in the mission.'); return; }
    if (run.lampOn) ms.baseDist = ms.baseDist || run.dist;
    ms.results[t] = run.bubbles;
    const n = Object.keys(ms.results).length;
    if (n >= M.tests.length && !ms.success) { ms.success = true; _coach('All three tests done. Which one made bubbles? Tap “Answer the questions”.'); Labs.confetti(); }
    else if (!ms.success) _coach(`Test recorded (${n} of 3). Change ONE thing for the next test.`);
  }

  // ══ Leaf and starch test ═════════════════════
  function _leafGuard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    if (_rig !== 'leaf') { _set('rig', 'leaf'); }
    return true;
  }
  function _testGuard() {
    if (!_leafGuard()) return false;
    if (!_leaf.picked) { _coach('Pick a leaf first - the ✂️ button in the set-up.'); return false; }
    if (_leaf.tested) { _coach('This leaf has been tested. Pick another leaf to test again.'); return false; }
    return true;
  }

  function destarch() {
    if (!_leafGuard()) return;
    _busy = true;
    _fxAdd('day', () => {
      _busy = false;
      _leaf.destarched = true; _leaf.day = null; _leaf.picked = false; _leaf.tested = false; _leaf.steps = [];
      _coach('48 hours in a dark cupboard. With no light it cannot photosynthesise, so it used up the starch in its leaves: the plant is destarched.');
      _after('destarch');
    }, { night: true });
  }

  function pick() {
    if (!_leafGuard()) return;
    const s = _setup();
    _leaf.picked = true; _leaf.tested = false; _leaf.steps = []; _leaf.reading = null;
    _leaf.setup = s;
    _leaf.map = P().starchMap(s);
    _coach(`Leaf picked and laid on the white tile${s.cover === 'foil' ? ' - foil off, the strip marked with dashes' : ''}. Now test it for starch: boil it first.`);
    _after('pick');
  }

  function boil() {
    if (!_testGuard()) return;
    if (!_bunsen) { _coach('The water is not boiling. Light the Bunsen first.'); return; }
    if (_leaf.steps.includes('boil')) { _coach('It has already been boiled.'); return; }
    _busy = true;
    _fxAdd('dip', () => {
      _busy = false;
      _leaf.steps.push('boil');
      const late = _leaf.steps.includes('ethanol');
      _coach(late ? 'Boiled - but AFTER the ethanol. That order will not work well…'
                  : 'Boiled for a minute. The leaf went limp and dark: its cells are dead, so chemicals can now get in. Next: turn the Bunsen off.');
      _after('boil');
    }, { to: 'beaker' });
  }

  function ethanol(overFlame) {
    if (!_leafGuard()) return;
    if (overFlame) {
      if (!_bunsen) { _coach('The Bunsen is off - and good: ethanol never goes near a flame.'); return; }
      _hazard('ethanol_flame');
      return;
    }
    if (!_testGuard()) return;
    if (_leaf.steps.includes('ethanol')) { _coach('The leaf has already been in the ethanol.'); return; }
    if (_bunsen) { _hazard('ethanol_lit'); return; }
    if (!_bathHot) { _coach('The water bath is cold. Light the Bunsen to heat the water, turn it OFF, then bring the ethanol.'); return; }
    _busy = true;
    _fxAdd('dip', () => {
      _busy = false;
      const boiled = _leaf.steps.includes('boil');
      _leaf.steps.push('ethanol');
      if (boiled) {
        _discover('chlorophyll_out');
        _logEntry({ title: 'Ethanol in a water bath', obs: 'The leaf turned white and the ethanol turned green: the chlorophyll dissolved out of the leaf. The leaf is now brittle.', note: true });
        _coach('The leaf went white and the ethanol green - the chlorophyll is out. It is brittle now: rinse it in warm water.');
      } else {
        _coach('Only a little green came out - the leaf is still green. Its cells were never killed by boiling.');
      }
      _after('ethanol');
    }, { to: 'tube' });
  }

  function rinse() {
    if (!_testGuard()) return;
    if (_leaf.steps.includes('rinse')) { _coach('Already rinsed.'); return; }
    _busy = true;
    _fxAdd('dip', () => {
      _busy = false;
      _leaf.steps.push('rinse');
      _coach(_leaf.steps.includes('ethanol') ? 'Rinsed in warm water: soft again and flat on the tile. Now the iodine.' : 'Rinsed in warm water.');
      _after('rinse');
    }, { to: 'beaker' });
  }

  function iodine() {
    if (!_testGuard()) return;
    _busy = true;
    _fxAdd('drip', () => {
      _busy = false;
      const L = _leaf, s = L.setup;
      L.steps.push('iodine');
      L.tested = true;
      L.reading = P().starchReading(L.steps);
      const clear = L.reading === 'clear';
      const said = clear ? P().describe(s, L.map)
        : L.reading === 'masked' ? 'The leaf stayed dark green under the brown iodine - impossible to read.'
        : 'Pale green with faint patches - the iodine could not get into the cells. Impossible to read.';
      _leafRuns.unshift({ setup: s, reading: L.reading, text: said });
      if (_leafRuns.length > 20) _leafRuns.length = 20;
      _logEntry({ title: 'Iodine test', obs: said });
      let card = null, errs = 0;
      if (L.reading === 'masked') { errs++; card = _resCard('no_ethanol', {}); }
      else if (L.reading === 'no_boil') { errs++; card = _resCard('no_boil', { late: L.steps.includes('boil') }); }
      else if (s.plant === 'variegated' && s.cover === 'foil') { errs++; card = _resCard('two_vars_leaf', {}); }
      else if (P().isExperiment(s) && !s.destarched) { errs++; card = _resCard('not_destarched', { cover: s.cover }); }
      else P().leafDiscoveries(s).forEach(_discover);
      if (clear && !card) _coach(`${said}${L.steps.includes('rinse') ? '' : ' (It cracked a little when you flattened it - rinse in warm water after the ethanol next time.)'}`);
      const ms = _mission;
      if (ms && ms.id === 'starch') {
        ms.errors += errs;
        if (clear && !card && s.plant === 'variegated' && s.destarched && s.day === 'light' && s.cover === 'none') {
          ms.success = true;
          _coach('Only the green parts turned blue-black! Tap “Answer the questions” to finish the mission.');
          Labs.confetti();
        } else if (!card) _coach('That was not the mission leaf: a VARIEGATED plant, destarched, then a day in sunlight, with nothing covering it.');
      }
      _readouts();
      _refresh();
      if (card) card();
      _guideEvent('iodine');
    });
  }

  function _resCard(id, ctx, closeMsg) {
    const R = P().RESULTS[id];
    return () => _resultCard({ icon: R.icon, title: R.title, happened: R.happened(ctx), instead: R.instead, exam: R.exam,
      onClose: () => _coach(closeMsg || 'Pick another leaf and try again - every step in its place.') });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id) {
    const H = P().HAZARDS[id];
    const st = Labs.store('photo');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.errors++;
    // The hot lamp: the scorching has already played on the canvas (the week
    // stopped on day 1); the plant goes back to the windowsill when the card closes.
    if (id === 'hot_lamp') {
      _hazardCard({ signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Lamp away - try again safely',
        onClose: () => {
          ['A', 'B'].forEach(k => { if (_pots[k].spot === 'lamp') _pots[k].spot = 'sun'; });
          _pots.day = 0; _pots.res = null; _pots.check = null;
          _syncSet(); _readouts();
          _coach('The lamp is away and the plant is back on the windowsill. Sunlight is best.');
        } });
      return;
    }
    _busy = true;
    _fxAdd('fire', () => {
      _busy = false;
      _bunsen = false;
      _renderTools();
      _readouts();
      _hazardCard({ signs: H.signs, title: H.title(), happened: H.happened(), why: H.why, instead: H.instead, exam: H.exam,
        button: 'Fire out - try again safely',
        onClose: () => _coach('The fire is out and the Bunsen is off. Ethanol goes only in a water bath, with no flame anywhere near.') });
    }, { over: id === 'ethanol_flame' });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    if (_primary()) {
      if (_lapse) {
        _lapse.t += dt;
        const k = Math.min(1, _lapse.t / _lapse.sec);
        (_lapse.kind === 'pots' ? _pots : _seeds).day = _lapse.to * k;
        if (k >= 1) _endLapse();
      }
      const w = _weed.counting;
      if (w) {
        w.t += dt;
        w.shown = Math.round(w.run.bubbles * Math.min(1, w.t / COUNT_SEC));
        if (w.t >= COUNT_SEC) _finishWeed();
      }
      return;
    }
    const c = _pond.counting;
    if (c) {
      c.t += dt;
      const k = Math.min(1, c.t / COUNT_SEC);
      c.shown = Math.round(c.run.bubbles * k);
      _pond.heatNow = (c.run.tempEnd - c.run.temp) * k;
      if (c.t >= COUNT_SEC) _finishCount();
    }
    if (_pond.relit > 0) _pond.relit = Math.max(0, _pond.relit - dt / 3);
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = P().MISSIONS.find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _resetBench();
    _rig = M.rig;
    _mission = { id, results: {}, errors: 0, success: false, base: null, baseDist: null };
    _panel = 'missions';
    _coach(M.intro);
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = P().MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.errors) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('photo');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      lines.push(ms.errors ? `${ms.errors} mistake${ms.errors === 1 ? '' : 's'} on the bench - a clean run earns an extra star.` : 'A clean, fair, safe experiment. ⚖️');
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
    _renderTools();
    _renderPanel();
    _syncSet();
    _readouts();
    _guideEnter();
    const z = $('lab-photo-stage');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  // A step whose setting is already in place needs no tap.
  function _satisfied(tok) {
    const [k, v] = tok.split(':');
    if (v === undefined) return false;
    switch (k) {
      case 'rig': return _rig === v;
      case 'dist': return _pond.dist === +v;
      case 'lamp': return _pond.lampOn === (v === 'on');
      case 'water': return _pond.water === v;
      case 'temp': return _pond.temp === +v;
      case 'shield': return _pond.shield === (v === 'on');
      case 'plant': return _leaf.plant === v && !_leaf.destarched && _leaf.cover === 'none' && !_leaf.day && !_leaf.picked;
      case 'cover': return _leaf.cover === v && !_leaf.day;
      case 'bunsen': return _bunsen === (v === 'on');
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
      case 'rig': return v === 'pond' ? { on, say: 'Go to the pondweed rig.', btn: '🌿 Pondweed rig' } : { on, say: 'Go to the starch-test bench.', btn: '🍃 Starch-test bench' };
      case 'dist': return { on, say: `Put the lamp ${v} cm from the pondweed.`, btn: `💡 Lamp at ${v} cm` };
      case 'lamp': return v === 'off' ? { on, say: 'Switch the lamp off - the room is dark.', btn: '🌑 Lamp off' } : { on, say: 'Switch the lamp on.', btn: '💡 Lamp on' };
      case 'water': return v === 'none' ? { on, say: 'Fill the tube with boiled and cooled water - it has no carbon dioxide.', btn: '💧 Boiled & cooled water' }
        : v === 'low' ? { on, say: 'Use ordinary pond water.', btn: '💧 Pond water' }
        : { on, say: 'Add sodium hydrogencarbonate for plenty of carbon dioxide.', btn: '🧂 Add sodium hydrogencarbonate' };
      case 'temp': return { on, say: `Set the water bath to ${v} °C.`, btn: `🌡️ ${v} °C` };
      case 'shield': return v === 'on' ? { on, say: 'Put the heat shield between the lamp and the tube.', btn: '🧊 Heat shield in' } : { on, say: 'Take the heat shield out.', btn: 'Heat shield out' };
      case 'count': return { on, say: 'Count the bubbles for one minute.', btn: '⏱ Count for 1 minute' };
      case 'splint': return { on, say: 'Test the gas collected in the tube with a glowing splint.', btn: '🪵 Glowing splint' };
      case 'plant': return { on, say: `Choose the ${D.PLANTS[v].name.toLowerCase()}.`, btn: `${D.PLANTS[v].icon} ${D.PLANTS[v].name}` };
      case 'destarch': return { on, say: 'Destarch the plant: 48 hours in a dark cupboard.', btn: '🌑 Destarch (48 h dark)' };
      case 'cover': return v === 'foil' ? { on, say: 'Fix a strip of foil across the middle of one leaf.', btn: '🔲 Foil strip on' }
        : v === 'sodalime' ? { on, say: 'Seal one leaf in a flask with soda lime, which absorbs carbon dioxide.', btn: '⚗️ Flask + soda lime' }
        : v === 'flask' ? { on, say: 'Seal one leaf in a flask WITHOUT soda lime - the control.', btn: '⚖️ Flask, no soda lime' }
        : { on, say: 'Take any cover off the leaves.', btn: 'No cover' };
      case 'day': return v === 'light' ? { on, say: 'Give the plant a day in sunlight.', btn: '☀️ A day in sunlight' } : { on, say: 'Keep the plant in the dark for a day.', btn: '🌙 A day in the dark' };
      case 'pick': return { on, say: 'Pick a leaf and lay it on the white tile.', btn: '✂️ Pick a leaf' };
      case 'bunsen': return v === 'on' ? { on, say: 'Light the Bunsen to boil the water.', btn: '🔥 Light the Bunsen' } : { on, say: 'Turn the Bunsen OFF - ethanol is next.', btn: '⭕ Turn the Bunsen off' };
      case 'boil': return { on, say: 'Boil the leaf in water for about a minute.', btn: '♨️ Boil the leaf' };
      case 'ethanol': return { on, say: 'Warm the leaf in ethanol, standing in the hot water bath.', btn: '🧴 Ethanol in the water bath' };
      case 'rinse': return { on, say: 'Rinse the leaf in warm water to soften it.', btn: '🚿 Rinse in warm water' };
      case 'iodine': return { on, say: 'Add iodine solution to the leaf on the white tile.', btn: '🟤 Add iodine solution' };
    }
    return { on, say: on, btn: on };
  }

  function discoveryGuide(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _eqHTML() {
    const E = P().EQUATION;
    return `<section class="lab-hz-sec"><h3>The equation</h3>
      <p class="lab-eq">${esc(E.word)}</p><p class="lab-photo-over">(${esc(E.over)})</p>
      <p class="lab-eq is-sym">${esc(E.sym)}</p><p class="lab-photo-over">${esc(E.symNote)}</p></section>`;
  }

  function _discDetail(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('photo').disc[id];
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
        ${d.eq ? _eqHTML() : ''}
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
    const st = Labs.store('photo');
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
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const el = _root.querySelector('.lab-body ' + _selFor(s.on));
    if (el) el.classList.add('is-next');
  }

  // ══ Panels ═══════════════════════════════════
  function _startHTML() {
    const st = Labs.store('photo');
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
        <li><b>Watch the rig</b>, then read your results in the lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${P().GUIDES.map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${P().MISSIONS.map(mission).join('')}</div>
      <p class="lab-hint">Or experiment freely: set up the rig below.</p>
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
  // Every discovery goes through here so the ✨ counter repaints AFTER it is saved.
  function _discover(id) {
    const d = P().DISCOVERIES.find(x => x.id === id);
    if (Labs.discover('photo', id, { title: d && d.title, total: P().DISCOVERIES.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (n) n.textContent = `${Object.keys(Labs.store('photo').disc).length}/${P().DISCOVERIES.length}`;
  }

  function _renderTools() {
    const box = $('lab-photo-tools');
    if (!box) return;
    const sign = k => `<i class="lab-photo-toolsign">${Labs.sign(k, true)}</i>`;
    if (_rig === 'pond') {
      box.className = 'lab-tools lab-photo-tools';
      box.innerHTML = `
        <button type="button" class="lab-tool" data-act="closer"><span aria-hidden="true">◀</span>Lamp closer</button>
        <button type="button" class="lab-tool" data-act="further"><span aria-hidden="true">▶</span>Lamp further</button>
        <button type="button" class="lab-tool" data-act="count"><span aria-hidden="true">⏱</span>Count 1 minute</button>
        <button type="button" class="lab-tool" data-act="splint"><span aria-hidden="true">🪵</span>Glowing splint</button>`;
    } else {
      box.className = 'lab-tools lab-photo-tools is-six';
      box.innerHTML = `
        <button type="button" class="lab-tool" data-set="bunsen" data-v="${_bunsen ? 'off' : 'on'}" aria-pressed="${_bunsen}"><span aria-hidden="true">${_bunsen ? '⭕' : '🔥'}</span>${_bunsen ? 'Bunsen off' : 'Light Bunsen'}</button>
        <button type="button" class="lab-tool" data-act="boil"><span aria-hidden="true">♨️</span>Boil in water</button>
        <button type="button" class="lab-tool" data-act="ethanol">${sign('flammable')}<span aria-hidden="true">🧴</span>Ethanol, water bath</button>
        <button type="button" class="lab-tool lab-photo-danger" data-act="flame">${sign('flammable')}<span aria-hidden="true">🔥</span>Ethanol over flame</button>
        <button type="button" class="lab-tool" data-act="rinse"><span aria-hidden="true">🚿</span>Rinse, warm water</button>
        <button type="button" class="lab-tool" data-act="iodine">${sign('irritant')}<span aria-hidden="true">🟤</span>Iodine solution</button>`;
    }
    _highlight();
  }

  function _opt(k, v, label, small) {
    return `<button type="button" class="lab-photo-opt" data-set="${k}" data-v="${v}" aria-pressed="false">${label}${small ? `<small>${esc(small)}</small>` : ''}</button>`;
  }
  function _prepText() {
    const L = _leaf, D = P();
    const bits = [D.PLANTS[L.plant].name];
    bits.push(L.destarched ? 'destarched (48 h dark)' : 'not destarched');
    if (L.cover !== 'none') bits.push(D.COVERS[L.cover].name.toLowerCase());
    if (L.day) bits.push(L.day === 'light' ? 'a day in sunlight' : 'a day in the dark');
    if (L.picked) bits.push(L.tested ? 'leaf tested' : 'leaf picked');
    return 'Plant: ' + bits.join(' · ');
  }
  function _shelfHTML() {
    const D = P();
    if (_rig === 'pond') {
      return `<section class="lab-shelf lab-photo-set" aria-label="Set up the pondweed rig">
        <h2>Set up the pondweed</h2>
        <div class="lab-photo-row"><span class="lab-photo-label">💡 Lamp distance</span>
          <div class="lab-photo-opts">${D.DISTANCES.map(d => _opt('dist', d, d + ' cm')).join('')}</div></div>
        <div class="lab-photo-row"><span class="lab-photo-label">Lamp</span>
          <div class="lab-photo-opts">${_opt('lamp', 'on', '💡 On')}${_opt('lamp', 'off', '🌑 Off')}</div></div>
        <div class="lab-photo-row"><span class="lab-photo-label">💧 Water in the tube</span>
          <div class="lab-photo-opts is-wide">${Object.keys(D.WATERS).map(w => _opt('water', w, D.WATERS[w].name, D.WATERS[w].meta)).join('')}</div></div>
        <div class="lab-photo-row"><span class="lab-photo-label">🌡️ Water-bath temperature</span>
          <div class="lab-photo-opts">${D.TEMPS.map(t => _opt('temp', t, t + ' °C')).join('')}</div></div>
        <div class="lab-photo-row"><span class="lab-photo-label">🧊 Heat shield (tank of water)</span>
          <div class="lab-photo-opts">${_opt('shield', 'on', 'In')}${_opt('shield', 'off', 'Out')}</div></div>
        <p class="lab-hint">The room is dark: the lamp is the only light. Change one thing, then ⏱ count for a minute.</p>
      </section>`;
    }
    return `<section class="lab-shelf lab-photo-set" aria-label="Prepare the plant">
      <h2>Prepare the plant</h2>
      <div class="lab-photo-row"><span class="lab-photo-label">1 · Plant</span>
        <div class="lab-photo-opts is-wide">${Object.keys(D.PLANTS).map(k => _opt('plant', k, D.PLANTS[k].icon + ' ' + D.PLANTS[k].name, D.PLANTS[k].meta)).join('')}</div></div>
      <div class="lab-photo-row"><span class="lab-photo-label">2 · Before the experiment</span>
        <div class="lab-photo-opts is-wide"><button type="button" class="lab-photo-opt" data-act="destarch">🌑 Destarch<small>48 hours in a dark cupboard</small></button></div></div>
      <div class="lab-photo-row"><span class="lab-photo-label">3 · Cover one leaf</span>
        <div class="lab-photo-opts is-wide">${Object.keys(D.COVERS).map(k => _opt('cover', k, D.COVERS[k].name, D.COVERS[k].meta)).join('')}</div></div>
      <div class="lab-photo-row"><span class="lab-photo-label">4 · Leave it for a day</span>
        <div class="lab-photo-opts is-wide">${_opt('day', 'light', '☀️ In sunlight')}${_opt('day', 'dark', '🌙 In the dark')}</div></div>
      <div class="lab-photo-row"><span class="lab-photo-label">5 · Test it</span>
        <div class="lab-photo-opts is-wide"><button type="button" class="lab-photo-opt" data-act="pick">✂️ Pick a leaf<small>then use the buttons under the picture</small></button></div></div>
      <p class="lab-hint" id="lab-photo-prep">${esc(_prepText())}</p>
    </section>`;
  }

  function _notebookHTML() {
    const D = P(), ms = _mission;
    let table = '';
    if (ms && ms.id === 'light') {
      const ds = D.DISTANCES.slice().reverse();
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Results: lamp distance and the rate of photosynthesis</caption>
        <thead><tr><th scope="col">Lamp distance / cm</th><th scope="col">Light intensity / units</th><th scope="col">Bubbles per minute</th></tr></thead>
        <tbody>${ds.map(d => `<tr><th scope="row">${d}</th><td>${Math.round(D.light(d, true))}</td><td>${ms.results[d] != null ? ms.results[d] : '<span class="lab-muted">-</span>'}</td></tr>`).join('')}</tbody></table></div>
        <p class="lab-fair">⚖️ Fair test: only the distance changes. Same pondweed, same water, same temperature.</p>`;
    } else if (ms && ms.id === 'needs') {
      const M = D.MISSIONS.find(x => x.id === 'needs');
      table = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Results: light and carbon dioxide (Biology 2024 Q5(b))</caption>
        <thead><tr><th scope="col">Test</th><th scope="col">Light</th><th scope="col">Carbon dioxide</th><th scope="col">Bubbles per minute</th></tr></thead>
        <tbody>${M.tests.map((t, i) => { const k = (t.lampOn ? 'L' : 'l') + (t.co2 ? 'C' : 'c'); return `<tr><th scope="row">${i + 1}</th><td>${t.lampOn ? 'present' : 'absent'}</td><td>${t.co2 ? 'present' : 'absent'}</td><td>${ms.results[k] != null ? ms.results[k] : '<span class="lab-muted">-</span>'}</td></tr>`; }).join('')}</tbody></table></div>`;
    }
    const runs = _runs.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Every pondweed count</caption>
        <thead><tr><th scope="col">#</th><th scope="col">Lamp</th><th scope="col">Water</th><th scope="col">°C</th><th scope="col">Bubbles / min</th></tr></thead>
        <tbody>${_runs.slice(0, 10).map(r => `<tr><th scope="row">${r.n}</th><td>${r.lampOn ? r.dist + ' cm' : 'off'}</td><td>${esc(D.WATERS[r.water].short)}</td><td>${r.temp === r.tempEnd ? r.temp : r.temp + '→' + r.tempEnd}</td><td><b>${r.bubbles}</b></td></tr>`).join('')}</tbody></table></div>` : '';
    const leaves = _leafRuns.length ? `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Starch tests</caption>
        <thead><tr><th scope="col">The leaf</th><th scope="col">With iodine</th></tr></thead>
        <tbody>${_leafRuns.slice(0, 8).map(r => `<tr><td>${esc(_setupWords(r.setup))}</td><td>${esc(r.text)}</td></tr>`).join('')}</tbody></table></div>` : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 10).map(e => `<li class="${e.note ? 'is-note' : ''}"><b>${esc(e.title)}</b><p>${esc(e.obs)}</p></li>`).join('')}</ol>`
      : '<p class="lab-empty">Your counts and starch tests appear here as you experiment.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${table}${runs}${leaves}${list}</section>`;
  }
  function _setupWords(s) {
    const D = P();
    const b = [D.PLANTS[s.plant].name.replace(' plant', '') + ' leaf', s.destarched ? 'destarched' : 'not destarched'];
    if (s.cover !== 'none') b.push(D.COVERS[s.cover].name.toLowerCase());
    if (s.day) b.push(s.day === 'light' ? 'a day in light' : 'a day in the dark');
    return b.join(', ');
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('photo');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Do the experiment fairly and safely, answer the exam-style questions, earn up to three stars.</p>
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
    const M = P().MISSIONS.find(x => x.id === ms.id);
    let body = '';
    if (ms.id === 'light') {
      const n = Object.keys(ms.results).length;
      body = `<ul class="lab-steps">
        <li class="${_pond.water === 'high' || ms.base ? 'is-done' : ''}">🧂 Add sodium hydrogencarbonate (plenty of carbon dioxide)</li>
        <li class="${_pond.shield ? 'is-done' : ''}">🧊 Put the heat shield in</li>
        <li class="${n >= 4 ? 'is-done' : ''}">⏱ Count at 4 different distances - change only the distance</li>
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${n} of 4 distances tested</p>`;
    } else if (ms.id === 'needs') {
      const n = Object.keys(ms.results).length;
      body = `<ul class="lab-steps">${M.tests.map(t => { const k = (t.lampOn ? 'L' : 'l') + (t.co2 ? 'C' : 'c'); return `<li class="${ms.results[k] != null ? 'is-done' : ''}">${esc(t.label)}</li>`; }).join('')}
        <li class="${ms.success ? 'is-done' : ''}">📝 Answer the questions</li></ul>
        <p class="lab-progress-text">${n} of 4 tests done · CO₂ absent = boiled &amp; cooled water · CO₂ present = sodium hydrogencarbonate</p>`;
    } else {
      const L = _leaf;
      const tick = b => b ? 'is-done' : '';
      body = `<ul class="lab-steps">
        <li class="${tick(L.plant === 'variegated')}">🪴 Choose the variegated plant</li>
        <li class="${tick(L.plant === 'variegated' && L.destarched)}">🌑 Destarch it</li>
        <li class="${tick(L.plant === 'variegated' && L.destarched && L.day === 'light')}">☀️ A day in sunlight</li>
        <li class="${tick(L.picked)}">✂️ Pick a leaf</li>
        <li class="${tick(L.steps.includes('boil'))}">♨️ Boil it in water</li>
        <li class="${tick(L.steps.includes('ethanol'))}">🧴 Ethanol in a water bath</li>
        <li class="${tick(L.steps.includes('rinse'))}">🚿 Rinse in warm water</li>
        <li class="${tick(L.tested)}">🟤 Iodine solution</li>
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
    const st = Labs.store('photo');
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
        <p class="lab-done-icon" aria-hidden="true">🌿</p>
        <h2 id="lab-ov-title">Welcome to the Photosynthesis Lab</h2>
        <ul class="lab-intro-list">
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first experiment, one tap at a time.</li>
          <li><b>Pondweed and a lamp.</b> Move the lamp, change the water and the temperature, and count the oxygen bubbles.</li>
          <li><b>The starch test.</b> Prepare a plant, pick a leaf, then boil, ethanol, rinse and iodine - in the right order.</li>
          <li><b>Get it wrong safely.</b> Make a mistake and you’ll see what happened and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${P().DISCOVERIES.length} discoveries to collect.</li>
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="bubbles" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('photo'); st.intro = true; Labs.persist();
        _coach('Pick a guided experiment below, or set up the pondweed rig yourself.');
      } });
  }

  function _help() {
    const E = P().EQUATION;
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Photosynthesis Lab works</h2>
      <div class="lab-help">
        <section><h3>Photosynthesis</h3>
          <p class="lab-eq">${esc(E.word)}</p><p class="lab-hint">Light energy is absorbed by chlorophyll. The glucose is stored in the leaf as starch; the oxygen is given off.</p></section>
        <section><h3>The pondweed rig</h3><ul>
          <li>The room is dark - the lamp is the only light. A closer lamp gives brighter light.</li>
          <li>The bubbles are oxygen. Count them for a minute to compare the rate.</li>
          <li>Pond water has a little carbon dioxide; sodium hydrogencarbonate gives plenty; boiled and cooled water has none.</li>
          <li>The heat shield stops a close lamp warming the water.</li></ul></section>
        <section><h3>The starch test, in order</h3><ol class="lab-disc-steps">
          <li>Boil the leaf in water - kills the cells so chemicals can get in.</li>
          <li>Bunsen OFF, then warm the leaf in ethanol in the hot water bath - removes the chlorophyll.</li>
          <li>Rinse in warm water - softens the brittle leaf.</li>
          <li>Iodine solution on a white tile: blue-black = starch, orange-brown = no starch.</li></ol></section>
        <section><h3>A fair test</h3><ul>
          <li><b>Independent variable</b>: the one thing you change.</li>
          <li><b>Dependent variable</b>: what you measure (bubbles per minute, starch or not).</li>
          <li><b>Controlled variables</b>: everything you keep the same.</li>
          <li>Destarch a plant (48 h in the dark) before a starch experiment.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Ethanol is flammable: never heat it over a flame; turn the Bunsen off first.</li>
          <li>Iodine solution is harmful: keep it off your skin and out of your eyes.</li>
          <li>Boiling water scalds: use forceps to move the leaf.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_pond) return;
    const D = P(), p = _pond, L = _leaf;
    const chips = $('lab-photo-chips');
    if (chips) {
      let h = '';
      if (_rig === 'pond') {
        const lu = Math.round(D.light(p.dist, p.lampOn));
        const tNow = Math.round((p.temp + (p.counting ? p.heatNow : 0)) * 10) / 10;
        h += p.lampOn ? `<span class="lab-chip">💡 ${p.dist} cm <small>light ${lu} units</small></span>` : '<span class="lab-chip">🌑 Lamp off <small>dark room</small></span>';
        h += `<span class="lab-chip${p.counting && p.heatNow >= 1 ? ' is-warm' : ''}">🌡️ ${tNow} °C</span>`;
        h += `<span class="lab-chip">💧 ${esc(D.WATERS[p.water].short)}</span>`;
        if (p.counting) h += `<span class="lab-chip lab-photo-count">⏱ Counting… <b>${p.counting.shown}</b></span>`;
        else if (p.last) h += `<span class="lab-chip lab-photo-count">Last count: <b>${p.last.bubbles}</b> <small>bubbles/min</small></span>`;
      } else {
        h += `<span class="lab-chip">${_bunsen ? '🔥 Bunsen lit' : '⭕ Bunsen off'}</span>`;
        h += `<span class="lab-chip">♨️ Water ${_bathHot ? 'hot' : 'cold'}</span>`;
        if (L.picked && L.tested) h += `<span class="lab-chip lab-photo-count">${L.reading === 'clear' ? '🟤 Result ready' : '❓ Cannot read it'}</span>`;
      }
      chips.innerHTML = h;
    }
    const c = $('lab-contents');
    if (c) {
      // One short line: it sits over the bottom of the picture.
      if (_rig === 'pond') c.textContent = `Heat shield ${p.shield ? 'in' : 'out'} · ${p.gas > 0 ? 'gas collected in the tube' : 'no gas collected yet'}`;
      else c.textContent = L.picked ? `Leaf: ${L.steps.length ? L.steps.join(' → ') : 'not tested yet'}` : 'Prepare the plant, then ✂️ pick a leaf';
    }
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    _fx.push({ type, t: 0, dur: FX_DUR[type] || 0.5, done, data: data || {} });
  }

  // ══ Drawing ══════════════════════════════════
  function _rgba(hex, a) {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  }

  function _pondGeom() {
    const bw = Math.min(150, _W * 0.36), bx = _W - bw - Math.max(12, _W * 0.05);
    // Kept below the two rows of readout chips (the gas collects at the top of
    // the tube, so it must never sit under them) and above the status strip.
    const bTop = _H * 0.42, bBot = _H * 0.84, wTop = bTop + (bBot - bTop) * 0.1;
    const wx = bx + bw / 2;
    const fm = bBot - 8, fw = bw * 0.62, apex = fm - bw * 0.3, stemTop = wTop + 14;
    const tubeTop = _H * 0.27, tw = 16;
    const D = P().DISTANCES, f = (_pond.dist - D[0]) / (D[D.length - 1] - D[0]);
    const lampX = (bx - 22) - f * (bx - 22 - 30), lampY = _H * 0.62;
    return { bw, bx, bTop, bBot, wTop, wx, fm, fw, apex, stemTop, tubeTop, tw, lampX, lampY };
  }

  function _animate(dt) {
    if (!dt || Labs.calm() || _rig !== 'pond') { if (_rig !== 'pond') _parts = []; return; }
    const g = _pondGeom(), p = _pond;
    const r = P().rate({ dist: p.dist, lampOn: p.lampOn, water: p.water, temp: p.temp + (p.counting ? p.heatNow : 0) });
    _emit += (r / COUNT_SEC) * dt;
    while (_emit >= 1 && _parts.length < 120) {
      _emit -= 1;
      _parts.push({ x: g.wx + (Math.random() - 0.5) * g.fw * 0.5, y: g.fm - 10 - Math.random() * 8, r: 1.4 + Math.random() * 1.6, vy: 60 + Math.random() * 30, ph: Math.random() * 6 });
    }
    if (_emit > 1) _emit = 1;
    const gasY = _gasY(g);
    for (let i = _parts.length - 1; i >= 0; i--) {
      const b = _parts[i];
      b.y -= b.vy * dt;
      if (b.y < g.apex + 4) b.x += (g.wx - b.x) * Math.min(1, dt * 8);
      else b.x += Math.sin(b.ph + b.y * 0.08) * 0.3;
      if (b.y <= gasY + 2) _parts.splice(i, 1);
    }
  }
  function _gasY(g) {
    const len = (g.apex - 6) - g.tubeTop;
    return g.tubeTop + 4 + Math.min(len * 0.7, (_pond.gas / 80) * len * 0.6);
  }

  function _draw(dt) {
    if (!_cx || !_pond) return;
    const c = _cx;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((Math.random() - 0.5) * 8 * _shake, (Math.random() - 0.5) * 8 * _shake);
      _shake = Math.max(0, _shake - dt * 1.4);
    }
    if (_rig === 'pond') _drawPond(); else _drawLeafBench();
    _drawFx(dt);
    c.restore();
  }

  function _drawPond() {
    const c = _cx, g = _pondGeom(), p = _pond, D = P();
    const dark = !p.lampOn;
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, dark ? '#1A2330' : _colors.top); bg.addColorStop(1, dark ? '#10161F' : _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    c.fillStyle = dark ? '#28323A' : _colors.bench; c.fillRect(-12, g.bBot, _W + 24, _H - g.bBot + 12);

    const L = D.light(p.dist, p.lampOn);
    if (!dark) {
      const a = Math.max(0.08, Math.min(0.5, 0.05 + L / 220));
      const lg = c.createLinearGradient(g.lampX, 0, g.bx + g.bw, 0);
      lg.addColorStop(0, `rgba(255,225,110,${a})`); lg.addColorStop(1, `rgba(255,225,110,${a * 0.35})`);
      c.fillStyle = lg;
      c.beginPath(); c.moveTo(g.lampX + 12, g.lampY - 9); c.lineTo(g.bx + g.bw, g.bTop - 6); c.lineTo(g.bx + g.bw, g.bBot); c.lineTo(g.lampX + 12, g.lampY + 9); c.closePath(); c.fill();
    }
    // ruler along the bench: the distance
    c.strokeStyle = dark ? '#8FA3B0' : _colors.ink; c.lineWidth = 1;
    const ry = g.bBot + 9;
    c.beginPath(); c.moveTo(g.lampX, ry); c.lineTo(g.wx, ry); c.stroke();
    [g.lampX, g.wx].forEach(x => { c.beginPath(); c.moveTo(x, ry - 4); c.lineTo(x, ry + 4); c.stroke(); });
    c.font = '700 11px system-ui, sans-serif'; c.textAlign = 'center';
    const lx = (g.lampX + g.wx) / 2, lt = p.dist + ' cm', lw = c.measureText(lt).width + 8;
    c.fillStyle = dark ? '#28323A' : _colors.bench; c.fillRect(lx - lw / 2, ry - 7, lw, 14);
    c.fillStyle = dark ? '#DCE6EE' : _colors.ink; c.fillText(lt, lx, ry + 4);

    // heat shield: a thin glass tank of water between lamp and beaker
    if (p.shield) {
      const sx = Math.max(g.lampX + 16, g.bx - 16);
      c.fillStyle = 'rgba(150,205,240,0.5)'; c.strokeStyle = 'rgba(70,130,170,0.9)'; c.lineWidth = 1.5;
      c.fillRect(sx, g.bTop + 4, 9, g.bBot - g.bTop - 4); c.strokeRect(sx, g.bTop + 4, 9, g.bBot - g.bTop - 4);
    }

    // beaker and water
    const warm = p.counting ? Math.min(1, p.heatNow / 6) : 0;
    c.fillStyle = warm > 0.05 ? `rgba(${170 + 60 * warm},${212 - 40 * warm},${232 - 90 * warm},0.5)` : 'rgba(170,212,232,0.45)';
    c.fillRect(g.bx + 2, g.wTop, g.bw - 4, g.bBot - g.wTop - 2);
    if (p.water === 'high') {
      c.fillStyle = 'rgba(255,255,255,0.55)';
      for (let i = 0; i < 14; i++) { c.beginPath(); c.arc(g.bx + 8 + ((i * 37) % (g.bw - 16)), g.wTop + 10 + ((i * 23) % (g.bBot - g.wTop - 20)), 1, 0, Math.PI * 2); c.fill(); }
    }
    // pondweed under the funnel
    c.strokeStyle = '#2F8F46'; c.lineWidth = 2.4; c.lineCap = 'round';
    for (let i = -2; i <= 2; i++) {
      c.beginPath(); c.moveTo(g.wx + i * 7, g.bBot - 4);
      c.quadraticCurveTo(g.wx + i * 12, g.fm - 20, g.wx + i * 4, g.fm - 26 + Math.abs(i) * 3); c.stroke();
      for (let k = 0; k < 3; k++) {
        const yy = g.bBot - 10 - k * 8, xx = g.wx + i * (7 + k * 1.5);
        c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx + 5, yy - 3); c.moveTo(xx, yy); c.lineTo(xx - 5, yy - 3); c.stroke();
      }
    }
    // funnel (upside down) and stem
    c.strokeStyle = _colors.glass; c.lineWidth = 2;
    c.beginPath(); c.moveTo(g.wx - g.fw / 2, g.fm); c.lineTo(g.wx - 4, g.apex); c.lineTo(g.wx - 4, g.stemTop);
    c.moveTo(g.wx + g.fw / 2, g.fm); c.lineTo(g.wx + 4, g.apex); c.lineTo(g.wx + 4, g.stemTop); c.stroke();
    // inverted test tube over the stem, full of water, gas at the top
    const ttB = g.apex - 6;
    c.fillStyle = 'rgba(170,212,232,0.4)';
    c.fillRect(g.wx - g.tw / 2, g.tubeTop, g.tw, ttB - g.tubeTop);
    const gy = _gasY(g);
    c.fillStyle = _pond.relit > 0 ? `rgba(255,240,190,${0.6 + 0.3 * _pond.relit})` : (dark ? '#1A2330' : _colors.top);
    c.fillRect(g.wx - g.tw / 2 + 1, g.tubeTop + 1, g.tw - 2, gy - g.tubeTop);
    c.strokeStyle = _colors.glass; c.lineWidth = 2;
    c.beginPath(); c.moveTo(g.wx - g.tw / 2, ttB); c.lineTo(g.wx - g.tw / 2, g.tubeTop + g.tw / 2);
    c.arc(g.wx, g.tubeTop + g.tw / 2, g.tw / 2, Math.PI, 0); c.lineTo(g.wx + g.tw / 2, ttB); c.stroke();
    // bubbles
    if (Labs.calm() || _instant) {
      const r = D.rate(p), k = Math.min(16, Math.round(r / 2.5));
      c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1;
      for (let j = 0; j < k; j++) {
        const f = ((j * 53) % 97) / 97, y = g.fm - 12 - f * (g.fm - 12 - gy - 4);
        const x = y < g.apex ? g.wx + ((j % 3) - 1) * 2 : g.wx + (((j * 29) % 21) - 10) * (y - g.apex) / (g.fm - g.apex);
        c.beginPath(); c.arc(x, y, 1.6, 0, Math.PI * 2); c.stroke();
      }
    } else {
      c.strokeStyle = 'rgba(255,255,255,0.9)'; c.fillStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 1;
      _parts.forEach(b => { c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2); c.fill(); c.stroke(); });
    }
    // beaker glass
    c.strokeStyle = _colors.glass; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(g.bx, g.bTop); c.lineTo(g.bx, g.bBot); c.lineTo(g.bx + g.bw, g.bBot); c.lineTo(g.bx + g.bw, g.bTop); c.stroke();
    // thermometer
    const thx = g.bx + g.bw - 10, thTop = g.bTop - 18, thBot = g.bBot - 12;
    const tNow = p.temp + (p.counting ? p.heatNow : 0);
    c.fillStyle = 'rgba(255,255,255,0.85)'; c.strokeStyle = _colors.glass; c.lineWidth = 1;
    c.fillRect(thx - 3, thTop, 6, thBot - thTop); c.strokeRect(thx - 3, thTop, 6, thBot - thTop);
    c.fillStyle = '#D8323A';
    const colH = (thBot - thTop - 6) * Math.min(1, tNow / 60);
    c.fillRect(thx - 1.5, thBot - colH, 3, colH);
    c.beginPath(); c.arc(thx, thBot + 2, 5, 0, Math.PI * 2); c.fill();
    c.fillStyle = dark ? '#DCE6EE' : _colors.ink; c.font = '700 10px system-ui, sans-serif'; c.textAlign = 'right';
    c.fillText(Math.round(tNow) + ' °C', thx + 8, thTop - 4);
    // lamp
    c.fillStyle = dark ? '#56626B' : '#5A6670';
    c.fillRect(g.lampX - 3, g.lampY, 6, g.bBot - g.lampY);
    c.fillRect(g.lampX - 14, g.bBot - 5, 28, 5);
    c.beginPath(); c.moveTo(g.lampX - 12, g.lampY - 16); c.lineTo(g.lampX + 8, g.lampY - 12); c.lineTo(g.lampX + 8, g.lampY + 12); c.lineTo(g.lampX - 12, g.lampY + 16); c.closePath();
    c.fillStyle = '#3E4A52'; c.fill();
    c.beginPath(); c.arc(g.lampX + 10, g.lampY, 8, 0, Math.PI * 2);
    if (!dark) {
      const glow = c.createRadialGradient(g.lampX + 10, g.lampY, 1, g.lampX + 10, g.lampY, 22);
      glow.addColorStop(0, '#FFFBE0'); glow.addColorStop(0.4, 'rgba(255,220,90,0.9)'); glow.addColorStop(1, 'rgba(255,220,90,0)');
      c.fillStyle = glow; c.fill();
      c.beginPath(); c.arc(g.lampX + 10, g.lampY, 22, 0, Math.PI * 2); c.fill();
    } else { c.fillStyle = '#7B8288'; c.fill(); }
    if (dark) {
      c.fillStyle = '#DCE6EE'; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'left';
      c.fillText('DARK ROOM · LAMP OFF', 10, _H * 0.3);
    }
  }

  function _leafColor(k) {
    const L = _leaf, s = L.steps, I = P().IODINE;
    if (!L.tested) {
      const iB = s.indexOf('boil'), iE = s.indexOf('ethanol');
      if (iE >= 0 && iB >= 0 && iB < iE) return '#EFE8CC';
      if (iE >= 0) return k.green ? '#86B872' : '#EDEBD6';
      if (iB >= 0) return k.green ? '#2E7A3D' : '#E3E0C4';
      return k.green ? '#3FA052' : '#F1EFD9';
    }
    if (L.reading === 'clear') return k.starch ? I.starch : I.none;
    if (L.reading === 'masked') return k.green ? '#3A4F26' : I.brown;
    return k.green ? '#7FA366' : I.brown;
  }

  // A cell whose centre falls just outside the leaf outline is still drawn
  // inside its edge: paint it like the nearest leaf cell. Painted as "not
  // leaf" it showed as white tips on a plain green leaf - a variegated leaf
  // by accident, in the one lab where that matters.
  function _inward(get, q, r) {
    let k = get(q, r), qq = q, rr = r;
    for (let i = 0; i < 10 && !k.leaf; i++) {
      if (qq !== 4) qq += qq < 4 ? 1 : -1;
      else rr += rr < 2.5 ? 1 : -1;
      k = get(qq, rr);
    }
    return k;
  }

  function _drawLeafShape(cx, cy, w, h, colorAt, dashCols) {
    const c = _cx, D = P(), cw = w / D.LEAF_W, ch = h / D.LEAF_H;
    const x0 = cx - w / 2, y0 = cy - h / 2;
    c.save();
    c.beginPath(); c.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2); c.clip();
    for (let r = 0; r < D.LEAF_H; r++) for (let q = 0; q < D.LEAF_W; q++) {
      c.fillStyle = colorAt(q, r);
      c.fillRect(x0 + q * cw - 0.5, y0 + r * ch - 0.5, cw + 1, ch + 1);
    }
    c.strokeStyle = 'rgba(0,0,0,0.18)'; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(x0, cy); c.lineTo(x0 + w, cy); c.stroke();
    if (dashCols) {
      c.setLineDash([3, 3]); c.strokeStyle = 'rgba(0,0,0,0.45)';
      c.beginPath(); c.moveTo(x0 + dashCols[0] * cw, y0); c.lineTo(x0 + dashCols[0] * cw, y0 + h);
      c.moveTo(x0 + dashCols[1] * cw, y0); c.lineTo(x0 + dashCols[1] * cw, y0 + h); c.stroke(); c.setLineDash([]);
    }
    c.restore();
    c.strokeStyle = 'rgba(20,60,30,0.6)'; c.lineWidth = 1.2;
    c.beginPath(); c.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.moveTo(cx - w / 2, cy); c.lineTo(cx - w / 2 - 8, cy + 3); c.stroke();
  }

  function _drawLeafBench() {
    const c = _cx, D = P(), L = _leaf;
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    const bench = _H * 0.8;   // the labels under it stay clear of the status strip
    c.fillStyle = _colors.bench; c.fillRect(-12, bench, _W + 24, _H - bench + 12);
    c.fillStyle = _colors.ink; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center';

    // ── the plant
    const px = _W * 0.17, potW = Math.min(52, _W * 0.13), potTop = bench - potW * 0.8;
    c.fillStyle = '#B5653A';
    c.beginPath(); c.moveTo(px - potW / 2, potTop); c.lineTo(px + potW / 2, potTop); c.lineTo(px + potW * 0.36, bench); c.lineTo(px - potW * 0.36, bench); c.closePath(); c.fill();
    c.strokeStyle = '#3B7A34'; c.lineWidth = 3;
    const stemTop = potTop - _H * 0.4;
    c.beginPath(); c.moveTo(px, potTop); c.lineTo(px, stemTop); c.stroke();
    const lw = Math.min(56, _W * 0.15), lh = lw * 0.55;
    const leaves = [[px - lw * 0.55, stemTop + _H * 0.3, true], [px + lw * 0.55, stemTop + _H * 0.18, false], [px - lw * 0.5, stemTop + _H * 0.07, true]];
    leaves.forEach(([x, y], i) => {
      if (i === 1 && L.picked) return;
      const cover = i === 1 ? L.cover : 'none';
      _drawLeafShape(x, y, lw, lh, (q, r) => {
        const k = _inward((a, b) => D.cellInfo(a, b, L.plant, 'none'), q, r);
        return k.green ? (L.destarched && !L.day ? '#3A8C4B' : '#3FA052') : '#F1EFD9';
      });
      if (cover === 'foil') {
        c.fillStyle = 'rgba(190,196,202,0.95)'; c.fillRect(x - lw / 2 + 3 * lw / D.LEAF_W, y - lh / 2 - 2, 3 * lw / D.LEAF_W, lh + 4);
      } else if (cover === 'sodalime' || cover === 'flask') {
        c.strokeStyle = _colors.glass; c.lineWidth = 1.5;
        c.beginPath(); c.ellipse(x, y + 4, lw * 0.62, lh * 1.05, 0, 0, Math.PI * 2); c.stroke();
        if (cover === 'sodalime') { c.fillStyle = '#F4F4F4'; for (let j = 0; j < 7; j++) { c.beginPath(); c.arc(x - 12 + j * 4, y + lh * 0.9, 2, 0, Math.PI * 2); c.fill(); } }
      }
    });
    if (L.destarched && !L.day) {
      c.fillStyle = 'rgba(16,20,32,0.72)';
      c.fillRect(px - lw * 1.25, stemTop - 10, lw * 2.5, bench - stemTop + 8);
      c.fillStyle = '#E6EBF2'; c.fillText('48 h in the dark', px, stemTop + 4);
    }
    if (L.day) { c.font = '16px system-ui, sans-serif'; c.fillText(L.day === 'light' ? '☀️' : '🌙', px + lw * 0.9, stemTop); c.font = '600 10px system-ui, sans-serif'; }
    c.fillStyle = _colors.ink; c.fillText(D.PLANTS[L.plant].name, px, bench + 12);

    // ── Bunsen, tripod and the beaker of water
    const bxc = _W * 0.5, bwid = Math.min(70, _W * 0.19), tripTop = bench - _H * 0.22;
    c.fillStyle = '#4B5560'; c.fillRect(bxc - 14, bench - 6, 28, 6); c.fillRect(bxc - 4, bench - _H * 0.16, 8, _H * 0.16 - 6);
    if (_bunsen) {
      const fl = c.createLinearGradient(0, bench - _H * 0.16, 0, tripTop + 4);
      fl.addColorStop(0, 'rgba(60,110,255,0.95)'); fl.addColorStop(1, 'rgba(120,170,255,0.2)');
      c.fillStyle = fl;
      const flick = (Labs.calm() || _instant) ? 0 : Math.random() * 3;
      c.beginPath(); c.moveTo(bxc - 5, bench - _H * 0.16); c.quadraticCurveTo(bxc, tripTop - flick, bxc + 5, bench - _H * 0.16); c.fill();
    }
    c.strokeStyle = '#3C4650'; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(bxc - bwid * 0.6, bench); c.lineTo(bxc - bwid * 0.5, tripTop); c.moveTo(bxc + bwid * 0.6, bench); c.lineTo(bxc + bwid * 0.5, tripTop);
    c.moveTo(bxc - bwid * 0.65, tripTop); c.lineTo(bxc + bwid * 0.65, tripTop); c.stroke();
    const bkTop = tripTop - _H * 0.27;
    c.fillStyle = _bathHot ? 'rgba(200,220,235,0.6)' : 'rgba(170,212,232,0.45)';
    c.fillRect(bxc - bwid / 2 + 2, bkTop + (tripTop - bkTop) * 0.3, bwid - 4, (tripTop - bkTop) * 0.7 - 2);
    if (_bunsen) {
      c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1;
      const tt = performance.now() / 400;
      for (let j = 0; j < 8; j++) { const f = ((j * 37 + (Labs.calm() || _instant ? 0 : tt * 20)) % 50) / 50; c.beginPath(); c.arc(bxc - bwid / 2 + 8 + ((j * 13) % (bwid - 16)), tripTop - 4 - f * (tripTop - bkTop) * 0.6, 2, 0, Math.PI * 2); c.stroke(); }
    }
    if (_bathHot) {
      c.strokeStyle = 'rgba(160,170,180,0.6)'; c.lineWidth = 1.5;
      for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(bxc + k * 12, bkTop); c.quadraticCurveTo(bxc + k * 12 + 6, bkTop - 12, bxc + k * 12, bkTop - 22); c.stroke(); }
    }
    if (L.steps.includes('ethanol')) {
      const etx = bxc + bwid * 0.18;
      c.fillStyle = L.steps.indexOf('boil') >= 0 && L.steps.indexOf('boil') < L.steps.indexOf('ethanol') ? 'rgba(70,160,70,0.85)' : 'rgba(150,200,150,0.6)';
      c.fillRect(etx - 6, bkTop - 6, 12, (tripTop - bkTop) * 0.7);
      c.strokeStyle = _colors.glass; c.lineWidth = 1.5; c.strokeRect(etx - 6, bkTop - 14, 12, (tripTop - bkTop) * 0.7 + 8);
    }
    c.strokeStyle = _colors.glass; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(bxc - bwid / 2, bkTop); c.lineTo(bxc - bwid / 2, tripTop - 1); c.lineTo(bxc + bwid / 2, tripTop - 1); c.lineTo(bxc + bwid / 2, bkTop); c.stroke();
    c.fillStyle = _colors.ink; c.fillText('Water bath', bxc, bench + 12);

    // ── white tile and the picked leaf
    const tx = _W * 0.83, tw = Math.min(110, _W * 0.28), th = tw * 0.72, ty = bench - th - 6;
    c.fillStyle = '#FFFFFF'; c.strokeStyle = 'rgba(0,0,0,0.2)'; c.lineWidth = 1;
    c.fillRect(tx - tw / 2, ty, tw, th); c.strokeRect(tx - tw / 2, ty, tw, th);
    if (L.picked && L.map) {
      const s = L.setup || _setup();
      _drawLeafShape(tx, ty + th / 2, tw * 0.84, th * 0.72, (q, r) => _leafColor(_inward((a, b) => L.map[b][a], q, r)), s.cover === 'foil' ? [3, 6] : null);
      if (L.tested) {
        c.fillStyle = 'rgba(184,105,42,0.5)';
        for (let j = 0; j < 4; j++) { c.beginPath(); c.arc(tx - tw * 0.3 + j * tw * 0.2, ty + th * 0.2, 2.5, 0, Math.PI * 2); c.fill(); }
      }
    } else {
      c.fillStyle = 'rgba(0,0,0,0.35)'; c.fillText('No leaf yet', tx, ty + th / 2 + 3);
    }
    c.fillStyle = _colors.ink; c.fillText('White tile', tx, bench + 12);
  }

  function _drawFx(dt) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'day': {
          const a = Math.sin(Math.PI * k);
          c.fillStyle = f.data.night ? `rgba(10,14,30,${0.75 * a})` : `rgba(255,236,150,${0.55 * a})`;
          c.fillRect(0, 0, _W, _H);
          c.font = '28px system-ui, sans-serif'; c.textAlign = 'center';
          c.fillText(f.data.night ? '🌙' : '☀️', _W * 0.1 + k * _W * 0.8, _H * 0.2 - Math.sin(Math.PI * k) * _H * 0.08);
          break;
        }
        case 'dip': {
          const from = { x: _W * 0.83, y: _H * 0.6 }, to = { x: f.data.to === 'tube' ? _W * 0.54 : _W * 0.5, y: _H * 0.4 };
          const u = k < 0.5 ? k * 2 : (1 - k) * 2;
          const x = from.x + (to.x - from.x) * u, y = from.y + (to.y - from.y) * u;
          c.fillStyle = 'rgba(70,150,80,0.9)'; c.beginPath(); c.ellipse(x, y, 14, 8, 0.3, 0, Math.PI * 2); c.fill();
          break;
        }
        case 'drip': {
          const y = _H * 0.25 + k * _H * 0.35;
          c.fillStyle = '#B8692A'; c.beginPath(); c.arc(_W * 0.83, y, 4, 0, Math.PI * 2); c.fill();
          c.fillStyle = '#6B4A2A'; c.fillRect(_W * 0.83 - 3, _H * 0.1, 6, _H * 0.12);
          break;
        }
        case 'fire': {
          _shake = Math.max(_shake, 0.7 * (1 - k));
          const x = _W * 0.5, y = _H * 0.36;
          for (let j = 0; j < 5; j++) {
            const h = 30 + 50 * Math.sin(Math.PI * Math.min(1, k * 1.4)) + Math.random() * 12;
            const fx = x + (j - 2) * 9 + (Math.random() - 0.5) * 4;
            const fl = c.createLinearGradient(0, y, 0, y - h);
            fl.addColorStop(0, 'rgba(255,200,60,0.95)'); fl.addColorStop(0.5, 'rgba(255,120,30,0.8)'); fl.addColorStop(1, 'rgba(220,40,20,0)');
            c.fillStyle = fl; c.beginPath(); c.moveTo(fx - 8, y); c.quadraticCurveTo(fx, y - h * 1.2, fx + 8, y); c.fill();
          }
          c.fillStyle = `rgba(255,120,40,${0.25 * Math.sin(Math.PI * k)})`; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'splint': {
          const g = _pondGeom();
          const sx = g.wx + 90 - k * 84, sy = g.tubeTop - 30 + k * 26;
          c.strokeStyle = '#A0703C'; c.lineWidth = 4; c.lineCap = 'round';
          c.beginPath(); c.moveTo(sx + 60, sy - 26); c.lineTo(sx, sy); c.stroke();
          if (f.data.lit && k > 0.7) {
            const fl = c.createRadialGradient(sx, sy - 6, 1, sx, sy - 6, 14);
            fl.addColorStop(0, '#FFF6C2'); fl.addColorStop(0.5, '#FFB020'); fl.addColorStop(1, 'rgba(255,120,0,0)');
            c.fillStyle = fl; c.beginPath(); c.ellipse(sx, sy - 8, 7, 13, 0, 0, Math.PI * 2); c.fill();
          } else {
            c.fillStyle = '#FF5A1F'; c.beginPath(); c.arc(sx, sy, 3.5, 0, Math.PI * 2); c.fill();
          }
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
    _animate(dt);
    _draw(dt);
    _uiAcc += dt;
    if (_uiAcc > 0.25) { _uiAcc = 0; _readouts(); }
  }

  // ══ Test hooks ═══════════════════════════════
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _step(0.05); _readouts(); }
  function _debug() {
    const p = _pond || _newPond(), L = _leaf || _newLeaf();
    return { rig: _rig, busy: _busy, panel: _panel, bunsen: _bunsen, bathHot: _bathHot,
             pond: { dist: p.dist, lampOn: p.lampOn, water: p.water, temp: p.temp, shield: p.shield, gas: p.gas, counting: !!p.counting,
                     last: p.last && { bubbles: p.last.bubbles, dist: p.last.dist, temp: p.last.temp, tempEnd: p.last.tempEnd } },
             runs: _runs.length,
             leaf: { plant: L.plant, destarched: L.destarched, cover: L.cover, day: L.day, picked: L.picked, steps: L.steps.slice(), tested: L.tested, reading: L.reading },
             guide: _guide && { id: _guide.id, step: _guide.step },
             mission: _mission && { id: _mission.id, results: Object.assign({}, _mission.results), errors: _mission.errors, success: _mission.success },
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs) };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, set: _set, act: _do, count,
           _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabPhoto = LabPhoto;
