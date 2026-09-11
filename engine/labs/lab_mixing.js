'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Mixing Bench (Chemistry, NCE Grade 9 · Science, Grade 8)
//
//  ⚠ TWO LEVELS: Labs.grade() is 8 or 9 (anything else gets 9). Only that
//    grade's guides, missions and discoveries are shown (LabChem.forGrade), and
//    a discovery from the other level is never unlocked here. Grade 8 has its
//    own shelf (kitchen acids and bases, marble chips), litmus paper, limewater
//    and a pH that stays between the pHs of what was mixed (LabChem.pHMix).
//
//  One test tube; a shelf of dilute acids, an alkali, water, universal
//  indicator and eight metals; a lighted splint, a glowing splint, a bung.
//  Sandbox, two Missions and a collection of Discoveries.
//
//  ⚠ Every outcome comes from lab_chem_data.js (LabChem). This file only moves
//    amounts over time and draws them. If a reaction looks wrong on screen,
//    fix the DATA, not the animation.
//  ⚠ Only the <canvas> animates. Nothing here puts a transform on .screen - a
//    transformed ancestor re-anchors every position:fixed child (ui-css.md).
//  ⚠ Calm Mode and reduced motion: the simulation still runs and the tube
//    still shows its state, but nothing moves and effects apply at once.
//  ⚠ Drag is for mouse and pen only. On touch, a drag from the shelf would
//    fight the page scroll, so a TAP adds the item - which also works for
//    keyboard and switch users.
// ══════════════════════════════════════════════
const LabMixing = (() => {
  const TUBE_CAP = 20;        // cm³ the tube may hold
  const TUBE_VIS = 24;        // cm³ drawn from the round bottom to the lip
  const DROP = 0.25;          // cm³ per dropper drop of 1.0 mol/dm³ → 0.25 mmol
  const FRAME_MS = 1000 / 30; // a low-end phone does not need 60 fps for bubbles
  const FX_DUR = { pour: 0.65, drop: 0.36, splint: 0.9, pop: 0.75, explode: 1.15, splash: 0.95, bung: 0.95, streak: 1.4 };

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const fmt = n => String(Math.round(n * 10) / 10);

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false;
  let _tube = null, _goggles = false, _panel = 'sandbox', _shelf = 'liquid', _mission = null, _guide = null;
  let _log = [], _parts = [], _fx = [], _shake = 0, _busy = false, _instant = false;
  let _colors = null, _tipIdx = -1, _said = {}, _drag = null, _suppressClick = false;
  let _grade = null;          // the level on the bench: 8 or 9

  function _newTube() {
    return { v: 0, h: 0, oh: 0, chloride: 0, sulfate: 0, added: {}, indicator: false, metals: [],
             ion: null, ionAmt: 0, cloudy: 0, gas: 0, pressure: 0, bung: false, warm: 0,
             demo: false, acidOut: false, neutralised: false,
             co2: 0, fizz: 0, facc: 0, lime: null, paper: null, tooMuch: false };
  }
  const _pH = () => _grade === 8
    ? LabChem.pHMix(_tube.h, _tube.oh, _tube.v, Object.keys(_tube.added))
    : LabChem.pH(_tube.h, _tube.oh, _tube.v);

  // ── Grade levels (LAB_SPEC §9) ──
  const _g8 = () => _grade === 8;
  function _readGrade() {
    const g = typeof Labs !== 'undefined' && typeof Labs.grade === 'function' ? Number(Labs.grade()) : 9;
    return g === 8 ? 8 : 9;
  }
  const _mine = list => LabChem.forGrade(list, _grade || 9);
  const _solid = id => (_g8() ? LabChem.SOLIDS8 : LabChem.METALS)[id];
  const _kind = k => (k === 'solid' ? 'metal' : k);
  const _introKey = () => (_g8() ? 'intro8' : 'intro');
  // The drop-by-drop missions: Hit pH 7 (sodium hydroxide) and Settle the Stomach (antacid).
  const _dropBase = () => (_mission ? (_mission.id === 'neutral' ? 'naoh' : _mission.base || null) : null);
  const _isDrop = () => !!_dropBase();
  const _held = () => Object.keys(_tube.added).filter(k => k !== 'indicator' && k !== 'water');
  const _lname = id => LabChem.LIQUIDS[id].name.toLowerCase();

  function _medium() {
    const t = _tube;
    if (t.v <= 0) return 'dry';
    const net = t.h - t.oh;
    if (_g8()) return net > 0.01 ? (t.added.hcl ? 'hcl' : 'weak') : net < -0.01 ? 'alkali' : 'neutral';
    if (net > 0.01) return t.chloride > 0 ? 'hcl' : 'h2so4';
    if (net < -0.01) return 'naoh';
    return 'water';
  }
  // At Grade 8 only the lab acid and alkali are corrosive - vinegar is not.
  const _corrosiveInTube = () => Math.abs(_tube.h - _tube.oh) > 0.01 && (!_g8() || !!(_tube.added.hcl || _tube.added.naoh));

  // ══ Shell ════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-mixing">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${_g8() ? 'Science · Grade 8' : 'Chemistry · Grade 9'}</span><h1>Mixing Bench</h1></div>
        <div class="lab-top-actions">
          <button type="button" id="lab-goggles" class="lab-goggles" data-act="goggles" aria-pressed="false"><span aria-hidden="true">🥽</span><span id="lab-goggles-label">Goggles off</span></button>
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the bench works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-canvas-wrap" id="lab-drop-zone">
            <canvas id="lab-canvas" role="img" aria-label="A test tube on the bench"></canvas>
            <div class="lab-chip lab-ph" id="lab-ph"></div>
            <div class="lab-status" id="lab-status"></div>
            <div class="lab-contents" id="lab-contents"></div>
          </div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite"></p>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show me a science fact">💡</button>
          </div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools">${_g8() ? `
            <button type="button" class="lab-tool" data-act="litmus-red"><span aria-hidden="true">🟥</span>Red litmus</button>
            <button type="button" class="lab-tool" data-act="litmus-blue"><span aria-hidden="true">🟦</span>Blue litmus</button>
            <button type="button" class="lab-tool" data-act="splint"><span aria-hidden="true">🔥</span>Lighted splint</button>
            <button type="button" class="lab-tool" data-act="lime"><span aria-hidden="true">🥛</span>Limewater</button>
            <button type="button" class="lab-tool" data-act="taste"><span aria-hidden="true">👅</span>Taste it</button>
            <button type="button" class="lab-tool" data-act="rinse"><span aria-hidden="true">🧽</span>Empty &amp; rinse</button>` : `
            <button type="button" class="lab-tool" data-act="splint"><span aria-hidden="true">🔥</span>Lighted splint</button>
            <button type="button" class="lab-tool" data-act="glow"><span aria-hidden="true">🪵</span>Glowing splint</button>
            <button type="button" class="lab-tool" id="lab-bung-btn" data-act="bung"><span aria-hidden="true">🟫</span><em>Put bung in</em></button>
            <button type="button" class="lab-tool" data-act="rinse"><span aria-hidden="true">🧽</span>Empty &amp; rinse</button>`}
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
    const g = _readGrade();
    // A different grade is a different bench: nothing in one level's tube,
    // notebook, mission or guide carries into the other.
    if (g !== _grade || !_tube) {
      _grade = g; _tube = _newTube(); _log = []; _mission = null; _guide = null; _goggles = false;
      _shelf = 'liquid'; _panel = 'sandbox'; _said = {}; _parts = []; _fx = []; _busy = false; _tipIdx = -1;
    }
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _renderPanel();
    _syncGoggles();
    _readouts();
    const st = Labs.store('mixing');
    if (!st[_introKey()]) _intro();
    else if (_guide) _guideEnter();
    else if (_mission) _coach('Back on your mission - carry on where you left off.');
    else _coach(_mine(LabChem.GUIDES).some(G => st.guides[G.id])
      ? 'Welcome back! Pick a guided experiment or a mission below - or explore freely with the shelf.'
      : '👋 New here? Pick a guided experiment below and I’ll show you exactly what to tap.');
    if (!_resizeWired) { window.addEventListener('resize', () => { if (_cv && _cv.isConnected) _resize(); }); _resizeWired = true; }
    _start();
  }

  function unmount() {
    _stop();
    _drag = null;
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
      if (_suppressClick) { _suppressClick = false; return; }
      const cc = e.target.closest('[data-conclude]');
      if (cc) { conclude(cc.dataset.conclude); return; }
      const a = e.target.closest('[data-act]');
      if (a) { _act(a.dataset.act, a); return; }
      const gd = e.target.closest('[data-guide]');
      if (gd) { startGuide(gd.dataset.guide); return; }
      if (e.target.closest('[data-guide-do]')) { _guideDo(); return; }
      const dg = e.target.closest('[data-disc-go]');
      if (dg) { discoveryGuide(dg.dataset.discGo); return; }
      const dc = e.target.closest('[data-disc]');
      if (dc) { _discDetail(dc.dataset.disc); return; }
      const add = e.target.closest('[data-add]');
      if (add) { _addFrom(add); return; }
      const p = e.target.closest('[data-panel]');
      if (p) { _panel = p.dataset.panel; _renderPanel(); return; }
      const sh = e.target.closest('[data-shelf]');
      if (sh) { _shelf = sh.dataset.shelf; _renderPanel(); return; }
      const m = e.target.closest('[data-mission]');
      if (m) { startMission(m.dataset.mission); return; }
      const d = e.target.closest('[data-drop]');
      if (d) { drop(d.dataset.drop === 'acid' ? 1 : +d.dataset.drop, d.dataset.drop === 'acid'); }
    };
    _root.onpointerdown = e => {
      const item = e.target.closest('[data-add]');
      if (!item || e.pointerType === 'touch' || e.button !== 0) return;
      _drag = { item, x: e.clientX, y: e.clientY, id: e.pointerId, ghost: null };
      window.addEventListener('pointermove', _onMove);
      window.addEventListener('pointerup', _onUp, { once: true });
    };
  }

  function _overZone(x, y) {
    const z = $('lab-drop-zone');
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
      g.innerHTML = _drag.item.querySelector('.lab-swatch')?.outerHTML || '';
      g.insertAdjacentHTML('beforeend', `<span>${esc(_drag.item.querySelector('b')?.textContent || '')}</span>`);
      _root.appendChild(g);
      _drag.ghost = g;
    }
    _drag.ghost.style.left = e.clientX + 'px';
    _drag.ghost.style.top = e.clientY + 'px';
    $('lab-drop-zone')?.classList.toggle('is-over', _overZone(e.clientX, e.clientY));
  }
  function _onUp(e) {
    window.removeEventListener('pointermove', _onMove);
    const d = _drag; _drag = null;
    if (!d || !d.ghost) return;
    d.ghost.remove();
    $('lab-drop-zone')?.classList.remove('is-over');
    _suppressClick = true;   // the click that follows this pointerup is the drag, not a tap
    if (_overZone(e.clientX, e.clientY)) _addFrom(d.item);
  }

  function _addFrom(el) {
    if (el.dataset.add === 'liquid') addLiquid(el.dataset.id);
    else addMetal(el.dataset.id);
    _showTube();
  }
  // On a phone the shelf sits below the tube: bring the tube back into view so
  // the pupil sees what their tap did.
  function _showTube() {
    const z = $('lab-drop-zone');
    if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.bottom < 80 || r.top > window.innerHeight - 80) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _act(act) {
    switch (act) {
      case 'hub': Labs.backToHub(); break;
      case 'goggles': goggles(); break;
      case 'help': _help(); break;
      case 'tip': _nextTip(); break;
      case 'splint': splint(true); break;
      case 'glow': splint(false); break;
      case 'bung': bung(); break;
      case 'rinse': rinse(); break;
      case 'litmus-red': litmus('red'); break;
      case 'litmus-blue': litmus('blue'); break;
      case 'lime': limewater(); break;
      case 'taste': taste(); break;
      case 'quiz': _quiz(); break;
      case 'exit-mission': _mission = null; _coach('Back to free experimenting. The shelf is all yours.'); _renderPanel(); break;
      case 'neutral-restart': _prepNeutral(); _renderPanel(); break;
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
  // Once per tube: a hint that would nag if repeated.
  function _say(key, text) { if (_said[key]) return; _said[key] = true; _coach(text); }
  function _nextTip() {
    const f = _g8() ? LabChem.FACTS8 : LabChem.FACTS;
    _tipIdx = (_tipIdx + 1) % f.length;
    _coach('💡 ' + f[_tipIdx]);
  }

  // ══ Actions ══════════════════════════════════
  function goggles() {
    _goggles = !_goggles;
    _syncGoggles();
    _coach(_goggles ? 'Goggles on. Now you’re ready for acids and alkalis.'
                    : 'Goggles off. You’ll need them again before you touch an acid or an alkali.');
    if (_goggles && _isDrop() && _mission.waiting) { _prepNeutral(); _renderPanel(); }
    if (_goggles) _guideEvent('goggles');
    else _highlight();
  }
  function _syncGoggles() {
    const b = $('lab-goggles');
    if (!b) return;
    b.setAttribute('aria-pressed', String(_goggles));
    b.classList.toggle('is-on', _goggles);
    const l = $('lab-goggles-label');
    if (l) l.textContent = _goggles ? 'Goggles on' : 'Goggles off';
  }

  function _guard() {
    if (_busy) { _coach('One thing at a time - let that finish first.'); return false; }
    if (_tube.bung) { _coach('Take the bung out first - you can’t add anything to a sealed tube.'); return false; }
    if (_tube.demo) { _coach('The teacher demo is still behind the safety screen. Tap “Empty & rinse” to start again.'); return false; }
    return true;
  }

  function addLiquid(id) {
    const L = LabChem.LIQUIDS[id];
    if (!L || !_guard()) return;
    if (_isDrop()) { _coach(`This mission uses the dropper below - add the ${_g8() ? 'antacid' : 'sodium hydroxide'} one drop at a time.`); return; }
    if (L.hazard) { _hazard(L.hazard, { what: L.name.toLowerCase() }); return; }
    if (_tube.v + L.pour > TUBE_CAP + 1e-9) {
      _coach(`The tube already holds ${fmt(_tube.v)} cm³. An overfilled tube spills when it fizzes - tap “Empty & rinse” to start again.`);
      return;
    }
    if (L.corrosive && !_goggles) { _hazard(_g8() ? 'g8_no_goggles' : 'no_goggles', { what: L.name.toLowerCase() }); return; }
    if (_mission && _mission.id === 'race' && (id === 'h2so4')) _say('race-acid', 'For the race, keep the acid the same: use dilute HYDROCHLORIC acid for every metal. Otherwise it isn’t a fair test.');
    // pH Survey: a second sample into a tube that still holds the first.
    const held = _held();
    const mixFrom = _mission && _mission.id === 'g8_survey' && !L.indicator && id !== 'water' && held.length && !held.includes(id) ? held[0] : null;
    _busy = true;
    _fxAdd('pour', () => { _busy = false; _applyLiquid(id, L.pour, false); if (mixFrom) _mixed(id, mixFrom); }, { color: L.swatch });
  }

  function _applyLiquid(id, amt, silent) {
    const L = LabChem.LIQUIDS[id], t = _tube;
    const acidBefore = t.h - t.oh > 0.01, alkBefore = t.oh - t.h > 0.01, hadInd = t.indicator;
    // Grade 8: baking soda is a hydrogencarbonate, so it gives off carbon
    // dioxide as it neutralises an acid - whichever one is poured into the other.
    let fizz = 0;
    if (_g8()) {
      if (L.fizz && acidBefore) fizz = Math.min(amt * L.oh, t.h - t.oh);
      else if (L.h > 0 && alkBefore && t.added.bakingsoda) fizz = Math.min(amt * L.h, t.oh - t.h, t.added.bakingsoda * LabChem.LIQUIDS.bakingsoda.oh);
    }
    t.v += amt; t.h += amt * L.h; t.oh += amt * L.oh;
    if (L.anion) t[L.anion] += amt * L.h;
    if (L.indicator) t.indicator = true;
    if (L.cloudy) t.cloudy = Math.max(t.cloudy, L.cloudy);
    t.added[id] = (t.added[id] || 0) + amt;
    if (fizz > 0.01) { t.co2 += fizz; t.fizz = Math.min(6, 2 + fizz); }
    // A liquid is a new condition: every metal still there gets looked at again.
    t.metals.forEach(m => { m.armed = true; });
    if (fizz > 0.01) _discover('g8_soda_fizz');
    if (!silent) {
      if ((L.oh > 0 && acidBefore) || (L.h > 0 && alkBefore)) { if (_g8()) _neutralised8(id, fizz > 0.01); else _neutralised(); }
      else if (L.indicator) {
        const p = _pH();
        if (p != null) _coach(`Universal indicator turns ${LabChem.indicatorName(p)}: pH ${p.toFixed(1)} - ${LabChem.pHMeaning(p)}.`);
      } else if (id === 'water' && acidBefore) _coach('Water dilutes the acid, so the pH rises a little - but it is still an acid.');
      else if (L.corrosive && !t.indicator && !t.metals.length) _say('ind', L.h > 0
        ? 'Acid in the tube. Add universal indicator to see how acidic it is - or drop in a metal.'
        : 'Alkali in the tube. Add universal indicator to see its pH - or try an acid with it.');
      else if (_g8() && L.sample && !t.indicator && !t.metals.length) _say('ind', 'Now test it: add universal indicator, or dip a strip of litmus paper.');
    }
    _checkIndicator();
    _readouts();
    if (!silent) _guideEvent('liquid:' + id);
    if (!silent && _g8() && L.indicator && hadInd && !t.tooMuch) {
      t.tooMuch = true;
      const R = LabChem.RESULTS8.indicator;
      Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened(), instead: R.instead, exam: R.exam });
    }
  }

  function _mixed(id, from) {
    const ms = _mission;
    if (!ms) return;
    if (ms.mixed) { _coach('Mixed samples again. Tap “Empty & rinse” before each new sample.'); return; }
    ms.mixed = true;
    const R = LabChem.RESULTS8.mixed;
    Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ added: _lname(id), held: _lname(from) }),
      instead: R.instead, exam: R.exam, button: 'Empty & rinse, then carry on',
      onClose: () => { rinse(); _refresh(); } });
  }

  function _neutralised() {
    const t = _tube;
    if (t.neutralised) return;
    t.neutralised = true;
    const N = LabChem.NEUTRAL[t.chloride > 0 ? 'hcl' : 'h2so4'];
    _logEntry({ title: 'Acid + alkali',
      obs: `No fizzing and nothing to see - but a reaction happened: the acid and the alkali neutralised each other, making ${N.salt} and water${t.indicator ? '. Watch the indicator move towards green' : ''}. The tube feels slightly warm.`,
      word: N.word, sym: N.sym });
    _discover('neutralise');
    _coach(t.indicator ? 'Neutralisation! Acid and alkali cancel each other out - watch the indicator colour.'
                       : 'Nothing to see? A neutralisation still happened. Add universal indicator to watch it.');
  }

  function _neutralised8(id, fizzed) {
    const t = _tube;
    if (t.neutralised) return;
    t.neutralised = true;
    const B = LabChem.BASES8;
    const base = B.includes(id) ? id : (B.find(b => t.added[b]) || 'naoh');
    const N = LabChem.neutral8(t.added.hcl ? 'hcl' : 'weak', base);
    _logEntry({ title: 'Acid + base',
      obs: fizzed ? `Fizzing! The ${_lname(base)} neutralised the acid and gave off carbon dioxide gas.`
                  : `Nothing fizzed - but the acid and the ${_lname(base)} neutralised each other, making ${N.salt} and water${t.indicator ? '. Watch the indicator colour change' : ''}.`,
      word: N.word, sym: N.sym });
    _coach(fizzed ? 'Fizz! Baking soda neutralises an acid AND gives off carbon dioxide. Test the gas with 🥛 limewater.'
      : t.indicator ? 'Neutralisation! The acid and the base cancel each other out - watch the indicator colour.'
                    : 'A neutralisation happened, even with nothing to see. Add universal indicator to find the pH.');
  }

  function addMetal(id) {
    const M = _solid(id), t = _tube;
    if (!M || !_guard()) return;
    if (_isDrop()) { _coach(_g8() ? 'No solids in this mission - just acid, antacid and indicator.' : 'No metals in this mission - just acid, alkali and indicator.'); return; }
    if (_mission && _mission.id === 'g8_survey') { _coach('This survey is about liquids. Test each sample with universal indicator - leave the solids for later.'); return; }
    if (_mission && _mission.id === 'race' && t.metals.length) {
      _coach('Fair test: one metal per clean tube. Tap “Empty & rinse”, pour fresh acid, then add the next metal.');
      return;
    }
    const med = _medium();
    if (M.alkali) {
      if (med === 'dry') { _coach(`${M.name} is stored under oil because it reacts with air and water. Nobody touches it with bare hands - and it never goes in a dry tube.`); return; }
      const pureWater = med === 'water' && !t.metals.length && !t.added.hcl && !t.added.h2so4 && !t.added.naoh;
      if (!pureWater) { _hazard('alkali_metal', { metal: M.name, medium: med }); return; }
      _busy = true;
      _fxAdd('drop', () => {
        _busy = false;
        t.demo = true;
        t.metals.push({ id, left: M.piece, t: 0, rate: 0, key: id + '|water', locked: true, float: true, dx: 0, vx: 40, armed: true, seen: {} });
        _coach('Teacher demo, behind the safety screen: a piece the size of a grain of rice, in water only. Watch it go!');
        _readouts();
        _guideEvent('metal:' + id);
      }, { color: M.color });
      return;
    }
    if (med !== 'dry' && _corrosiveInTube() && !_goggles) {
      const what = (_g8() ? 'the tube of ' : 'a metal into the ') + (t.h > t.oh ? 'acid' : 'alkali');
      _hazard(_g8() ? 'g8_no_goggles' : 'no_goggles', { what });
      return;
    }
    _busy = true;
    _fxAdd('drop', () => {
      _busy = false;
      t.metals.push({ id, left: M.piece, t: 0, rate: 0, key: null, armed: true, seen: {} });
      if (med === 'dry') _coach(M.plural
        ? `The ${M.name.toLowerCase()} are sitting in a dry tube. Pour a liquid on them to see if they react.`
        : `The ${M.name.toLowerCase()} is sitting in a dry tube. Pour a liquid on it to see if it reacts.`);
      _readouts();
      _guideEvent((_g8() ? 'solid:' : 'metal:') + id);
    }, { color: M.color });
  }

  function splint(lit) {
    if (_busy) return;
    if (_tube.bung) { _coach('Take the bung out first, then test the gas at the mouth of the tube.'); return; }
    _busy = true;
    _fxAdd('splint', () => {
      _busy = false;
      const g = _tube.gas;
      if (lit) {
        if (g > 0.03) {
          _tube.gas = 0;
          _fxAdd('pop');
          _discover(_g8() ? 'g8_pop' : 'pop_test');
          _logEntry({ title: 'Lighted splint test', obs: 'Squeaky pop! The gas burned with a squeaky pop, so it is HYDROGEN.', note: true });
          _coach('Squeaky pop = hydrogen. Every metal that fizzes in acid makes it. Which metal fizzes fastest?');
          _guideEvent('pop');
        } else if (_g8() && _tube.co2 > 0.03) {
          _discover('g8_splint_out');
          _logEntry({ title: 'Lighted splint test', obs: 'The flame went out, with no pop. The gas is not hydrogen - carbon dioxide puts a flame out.', note: true });
          _coach('No pop - the flame went out. Carbon dioxide does not burn. Check it with 🥛 limewater.');
          _guideEvent('out');
        } else {
          _coach(_tube.v > 0 ? 'Nothing happened - there isn’t enough gas yet. Wait for fizzing, then hold the splint at the mouth of the tube.'
                             : 'The tube is empty. Make a gas first: an acid plus a metal.');
        }
      } else if (g > 0.03) {
        _discover('glowing_h2');
        _logEntry({ title: 'Glowing splint test', obs: 'The glowing splint did NOT relight. Relighting is the test for oxygen, so this gas is not oxygen.', note: true });
        _coach('Ruling a gas out is good science too. Now try the lighted splint.');
        _guideEvent('glow');
      } else {
        _coach('The glowing splint did not relight - there is no oxygen here. (There’s no gas to test yet either.)');
      }
    }, { lit });
  }

  function bung() {
    const t = _tube;
    if (_busy) return;
    if (t.bung) { t.bung = false; t.pressure = 0; _coach('Bung out. The tube is open again.'); }
    else if (t.v <= 0) { _coach('There’s nothing in the tube to seal yet.'); }
    else {
      t.bung = true; t.pressure = 0;
      _coach(t.metals.some(m => m.rate > 0)
        ? 'Bung in… but the fizzing hasn’t stopped. Keep an eye on the pressure.'
        : 'Bung in. With no reaction going on, the tube is safely sealed.');
    }
    _readouts();
  }

  function rinse() {
    if (_busy) return;
    if (_isDrop()) { _prepNeutral(); _renderPanel(); return; }
    _reset();
    _coach(_mission && _mission.id === 'race' ? 'Clean tube. Pour fresh hydrochloric acid, then add the next metal.'
      : _mission && _mission.id === 'g8_survey' ? 'Clean tube. Pour the next sample, then add universal indicator.'
      : 'Clean, empty tube. What will you try next?');
    _readouts();
    _guideEvent('rinse');
  }
  function _reset() { _tube = _newTube(); _parts = []; _said = {}; }

  // ── Grade 8 tests: litmus paper, limewater - and the one you never do ──
  function litmus(color) {
    if (_busy) return;
    const t = _tube;
    if (t.v <= 0) { _coach('The tube is empty. Pour a liquid in first, then dip the litmus paper.'); return; }
    const to = LabChem.litmus(color, _pH());
    t.paper = { from: color, to };
    const changed = to !== color, Name = color === 'red' ? 'Red' : 'Blue';
    const what = _held().map(_lname).join(' and ') || 'water';
    _log.forEach(e => { if (e.ask && !e.answer) e.answer = 'skip'; });
    _logEntry({ title: `${Name} litmus paper`, note: true, what,
      obs: changed ? `The ${color} litmus paper turned ${to}.` : `The ${color} litmus paper stayed ${color} - no change.`,
      ask: !changed && color === 'red' ? 'litmus' : null });
    if (changed) _discover(color === 'blue' ? 'g8_litmus_acid' : 'g8_litmus_alkali');
    _coach(changed ? (to === 'red' ? 'Blue litmus turned red: it is an acid.' : 'Red litmus turned blue: it is an alkali.')
      : color === 'red' ? 'Red litmus stayed red. What does that tell you? Choose in your lab notebook.'
                        : 'Blue litmus stayed blue, so it is not an acid. It could be neutral or an alkali.');
    _readouts();
    _guideEvent('litmus:' + color);
  }

  // What a pupil decides from red litmus that stayed red.
  function conclude(ans) {
    const e = _log.find(x => x.ask === 'litmus' && !x.answer);
    if (!e) return;
    e.answer = ans;
    _refresh();
    if (ans === 'acid') {
      const R = LabChem.RESULTS8.litmus;
      Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ what: e.what }), instead: R.instead, exam: R.exam,
        onClose: () => _coach('Try blue litmus: an acid turns it red. Or add universal indicator to find the pH.') });
      return;
    }
    _discover('g8_litmus_logic');
    _coach('Exactly. Red litmus staying red only rules out an alkali. Blue litmus or universal indicator would tell you if it is an acid or neutral.');
    _guideEvent('conclude');
  }

  function limewater() {
    if (_busy) return;
    const t = _tube;
    if (t.co2 > 0.03) {
      t.lime = 'milky';
      _discover('g8_limewater');
      _logEntry({ title: 'Limewater test', note: true, obs: 'The limewater turned milky, so the gas is CARBON DIOXIDE.' });
      _coach('Milky limewater = carbon dioxide. An acid with a carbonate always gives it off.');
      _guideEvent('lime');
    } else if (t.gas > 0.03) {
      t.lime = 'clear';
      _logEntry({ title: 'Limewater test', note: true, obs: 'The limewater stayed clear, so the gas is not carbon dioxide.' });
      _coach('Clear limewater: not carbon dioxide. Try the 🔥 lighted splint instead.');
    } else {
      _coach(t.v > 0 ? 'There is no gas to test yet. Wait for fizzing first.'
                     : 'The tube is empty. Make a gas first: an acid with marble chips, or with a metal.');
    }
    _readouts();
  }

  function taste() {
    if (_busy) return;
    if (_tube.v <= 0) { _coach('Nothing to taste - and in a lab you never taste anything, not even to check.'); return; }
    _hazard('g8_taste', { what: _held().map(_lname).join(' and ') || 'water' });
  }

  // ══ Hazards ══════════════════════════════════
  function _hazard(id, ctx) {
    const H = LabChem.HAZARDS[id];
    const st = Labs.store('mixing');
    st.hazards[id] = (st.hazards[id] || 0) + 1;
    Labs.persist();
    if (_mission) _mission.hazards++;
    _busy = true;
    _fxAdd(H.fx, () => {
      _busy = false;
      Labs.hazardCard({ signs: H.signs, title: H.title(ctx), happened: H.happened(ctx), why: H.why,
        instead: H.instead, exam: H.exam, button: H.reset ? 'Get a fresh tube' : 'Got it - try again safely',
        onClose: () => {
          if (H.reset) { _reset(); _coach('Fresh tube ready. Remember: alkali metals never go near acids.'); _readouts(); }
          else if (id === 'no_goggles' || id === 'g8_no_goggles') _coach('Tap 🥽 at the top to put your goggles on, then try again.');
          else if (id === 'g8_taste') _coach('Use an indicator instead: dip 🟦 blue litmus, or add universal indicator.');
          else if (id === 'g8_bleach') _coach('The bleach stays in its bottle. Pick something else from the shelf.');
        } });
    });
  }

  // ══ Simulation ═══════════════════════════════
  function _step(dt) {
    if (!dt) return;
    const t = _tube;
    let made = 0, madeCO2 = 0;
    const med = _medium();
    for (const m of t.metals) {
      if (m.left <= 1e-6) continue;
      const key = m.locked ? m.key : m.id + '|' + med;
      const rx = m.locked ? LabChem.REACTIONS[m.key] : _g8() ? LabChem.reaction8(m.id, med) : LabChem.reaction(m.id, med);
      if (key !== m.key) { m.key = key; m.t = 0; }
      m.t += dt;
      let rate = 0;
      if (rx && (rx.kind === 'react' || rx.kind === 'demo')) {
        rate = rx.rate;
        if (rx.lag && m.t < rx.lag) rate = rx.lagRate;
        if (rx.stopAfter && m.t > rx.stopAfter) rate = rx.lateRate;
        rate = Math.min(rate, m.left / dt);
        if (rx.uses) {
          const avail = rx.uses === 'h' ? t.h - t.oh : t.oh - t.h;
          const max = Math.max(0, avail) / (rx.per * dt);
          if (rate > max) {
            rate = max;
            if (!t.acidOut && m.left > 0.05) {
              t.acidOut = true;
              const S = _solid(m.id);
              _logEntry({ title: 'Reaction stopped', note: true,
                obs: `The ${rx.uses === 'h' ? 'acid' : 'alkali'} is used up, so the reaction stops - some ${S.name.toLowerCase()} ${S.plural ? 'are' : 'is'} left over.` });
            }
          }
        }
        const n = rate * dt;
        m.left -= n;
        if (rx.uses === 'h') t.h -= n * rx.per;
        if (rx.uses === 'oh') t.oh -= n * rx.per;
        if (rx.makesOH) t.oh += n * rx.makesOH;
        made += n * rx.h2;
        madeCO2 += n * (rx.co2 || 0);
        if (rx.ion) { t.ion = rx.ion; t.ionAmt += n; }
        if (rx.cloudy) t.cloudy = Math.min(1, t.cloudy + n * 1.4);
        if (rx.warm && rate > 0.04) t.warm = 1;
      }
      m.rate = rate;
      m.rx = rx;
      if (rx && m.armed && !m.seen[key] && (m.t >= 2.5 || rx.kind === 'demo')) {
        m.seen[key] = true; m.armed = false;
        _observe(m, rx, key);
      }
      if (m.left <= 1e-6 && !m.gone) {
        m.gone = true; m.left = 0; m.rate = 0;
        const S = _solid(m.id), name = S.name.toLowerCase();
        _logEntry({ title: 'All reacted', note: true, obs: S.plural
          ? `The ${name} have completely reacted - there are none left in the tube.`
          : `The ${name} has completely reacted - there is none left in the tube.` });
        if (m.float) { t.demo = false; _coach('Demo over. The water is now alkaline - add universal indicator to see. Then empty & rinse.'); _guideEvent('demo-end'); }
      }
    }
    t.gas = t.gas * Math.exp(-dt / 6) + made;
    t.co2 = t.co2 * Math.exp(-dt / 6) + madeCO2;
    if (t.fizz > 0) t.fizz = Math.max(0, t.fizz - dt);
    t.warm = Math.max(0, t.warm - dt / 10);
    if (t.bung) {
      t.pressure += made;
      if (t.pressure > 0.2) { t.bung = false; t.pressure = 0; _hazard('sealed_tube', {}); }
    }
    _checkIndicator();
  }

  function _observe(m, rx, key) {
    const M = _solid(m.id);
    const med = key.split('|')[1];
    // Calcium makes plain water alkaline within a second, so by the time it is
    // observed the tube reads as "sodium hydroxide solution". Name what the
    // pupil actually poured.
    const medName = med === 'naoh' && !_tube.added.naoh ? 'water' : med;
    _logEntry({ title: `${M.name} + ${(_g8() ? LabChem.MEDIUM_NAMES8 : LabChem.MEDIUM_NAMES)[medName]}`, obs: rx.obs, word: rx.word || '', sym: rx.sym || '' });
    if (rx.disc) _discover(rx.disc);
    if (rx.kind === 'none' && m.id === 'copper' && (med === 'hcl' || med === 'h2so4')) {
      _coach('Copper didn’t react at all. It sits below hydrogen in the reactivity series - too unreactive to push hydrogen out of the acid.');
    } else if (rx.kind === 'react' && rx.co2) {
      _say('gas', 'Fizzing! Which gas is it? Test it with 🥛 limewater - or hold the 🔥 lighted splint at the mouth of the tube.');
    } else if ((rx.kind === 'react' || rx.kind === 'demo') && rx.h2 && rx.rate >= 0.004) {
      _say('gas', 'Bubbles! Which gas is it? Hold the 🔥 lighted splint at the mouth of the tube.');
    } else if (rx.lag) {
      _say('al', 'Be patient with aluminium - its oxide layer has to go before it really gets going.');
    }
    const ms = _mission;
    if (ms && ms.id === 'race' && med === 'hcl' && ms.metals.includes(m.id) && !ms.results[m.id] && _tube.metals.length === 1) {
      ms.results[m.id] = { rating: LabChem.fizzRating(rx), obs: rx.obs };
      const done = ms.metals.filter(x => ms.results[x]).length;
      if (done === ms.metals.length) {
        ms.success = true;
        _coach('All four metals tested! Tap “Answer the questions” to finish the race.');
      } else {
        _coach(`Recorded in your notebook (${done}/${ms.metals.length}). Empty & rinse for a fair test, then try the next metal.`);
      }
      _refresh();
    }
    _guideEvent('observe');
  }

  function _checkIndicator() {
    const t = _tube;
    if (!t.indicator || t.v <= 0) return;
    if (_g8()) { _checkIndicator8(); return; }
    const p = _pH();
    if (p < 3) _discover('ind_acid');
    else if (p > 11) _discover('ind_alkali');
    else if (Math.abs(p - 7) < 0.5) _discover('ind_neutral');
  }

  // Grade 8: universal indicator in ONE substance names that substance's pH,
  // and in the pH Survey it fills that row of the results table.
  function _checkIndicator8() {
    const t = _tube, p = _pH(), held = _held();
    if (!t.metals.length && held.length <= 1) {
      const s = held[0] || 'water';
      if (LabChem.IND8[s]) _discover(LabChem.IND8[s]);
      const ms = _mission;
      if (ms && ms.id === 'g8_survey' && held.length === 1 && ms.samples.includes(s) && !ms.results[s]) {
        ms.results[s] = { p: Math.round(p) };
        const done = ms.samples.filter(x => ms.results[x]).length;
        if (done === ms.samples.length) { ms.success = true; _coach('All five tested! Tap “Answer the questions” to finish the survey.'); }
        else _coach(`Recorded: ${_lname(s)}, ${LabChem.indicatorName(p)}, pH ${Math.round(p)} (${done}/${ms.samples.length}). Empty & rinse, then test the next sample.`);
        _refresh();
      }
    }
    if (t.added.antacid && (t.added.hcl || t.added.vinegar || t.added.lemon) && Math.abs(p - 7) < 0.5) _discover('g8_antacid');
  }

  // ══ Missions ═════════════════════════════════
  function startMission(id) {
    const M = _mine(LabChem.MISSIONS).find(x => x.id === id);
    if (!M || _busy) return;
    _stopGuide(true);
    _reset();
    _mission = { id, metals: M.metals || [], samples: M.samples || [], base: M.base || null, results: {}, hazards: 0,
                 drops: 0, acidDrops: 0, overshot: false, mixed: false, success: false, waiting: false };
    _panel = 'missions';
    _coach(M.intro);
    if (_isDrop()) _prepNeutral();
    _renderPanel();
    _readouts();
  }

  function _prepNeutral() {
    if (!_mission) return;
    if (!_goggles) {
      _mission.waiting = true;
      _coach(_g8() ? 'Put on your 🥽 goggles first - this mission uses a lab acid.' : 'Put on your 🥽 goggles first - this mission uses an acid AND an alkali.');
      return;
    }
    _mission.waiting = false;
    _mission.drops = 0; _mission.acidDrops = 0; _mission.success = false;
    _reset();
    _applyLiquid('hcl', 5, true);
    _applyLiquid('indicator', 0.15, true);
    _coach(_g8() ? '5 cm³ of dilute hydrochloric acid with universal indicator: red, pH 0 - an upset stomach. Add antacid until it turns green.'
                 : '5 cm³ of dilute hydrochloric acid with universal indicator: red, pH 0. Add sodium hydroxide until it turns green.');
    _readouts();
  }

  function drop(n, acid) {
    const ms = _mission;
    if (!ms || !_isDrop() || ms.waiting || _busy) return;
    if (_tube.v + DROP * n > TUBE_CAP) { _coach('The tube is nearly full. Tap “Start again”.'); return; }
    const id = acid ? 'hcl' : _dropBase();
    let k = 0;
    _busy = true;
    const one = () => {
      _fxAdd('drop', () => {
        _applyLiquid(id, DROP, true);
        if (acid) ms.acidDrops++; else ms.drops++;
        const net = _tube.h - _tube.oh;
        // Near the end point a drop makes a green flash where it lands before
        // the swirl mixes it in - the real sign that you are close.
        if (!acid && net > 1e-9 && net <= 0.75 + 1e-9) _fxAdd('streak');
        k++;
        if (k < n) one(); else _afterDrops();
      }, { color: LabChem.LIQUIDS[id].swatch });
    };
    one();
  }

  function _afterDrops() {
    const ms = _mission;
    _busy = false;
    const p = _pH(), net = _tube.h - _tube.oh;
    if (!ms.success && Math.abs(p - 7) < 0.5) {
      ms.success = true;
      if (_g8()) {
        _discover('g8_antacid');
        const N = LabChem.neutral8('hcl', 'antacid');
        _logEntry({ title: 'Neutralised!', obs: 'The indicator turned green: pH 7. The antacid cancelled out the acid exactly, leaving magnesium chloride solution.',
                    word: N.word, sym: N.sym });
      } else {
        _discover('neutralise');
        _discover('ind_neutral');
        _logEntry({ title: 'Neutralised!', obs: 'The indicator turned green: pH 7. The acid and the alkali cancelled out exactly, leaving sodium chloride solution - salt water.',
                    word: LabChem.NEUTRAL.hcl.word, sym: LabChem.NEUTRAL.hcl.sym });
      }
      _coach('🎯 Green - pH 7, exactly neutral! Tap “Answer the questions” to finish the mission.');
      Labs.confetti();
    } else if (!ms.success && p > 7.5) {
      if (!ms.overshot && _g8()) {
        ms.overshot = true;
        const R = LabChem.RESULTS8.overshoot;
        Labs.resultCard({ icon: R.icon, title: R.title, happened: R.happened({ drops: ms.drops, p: p.toFixed(1), colour: LabChem.indicatorName(p) }),
          instead: R.instead, exam: R.exam, button: 'Fix it with a drop of acid',
          onClose: () => _coach('Add hydrochloric acid one drop at a time to come back to green.') });
      } else if (!ms.overshot) {
        ms.overshot = true;
        Labs.resultCard({ icon: '🟣', title: 'Overshot - now it’s alkaline',
          happened: `Drop ${ms.drops} took the tube from acidic straight to pH ${p.toFixed(1)}: purple, strongly alkaline. Near the end point, a single drop of alkali is enough to swing it.`,
          instead: 'Add the alkali one drop at a time and swirl after each one. When a drop makes a green flash that fades, you are only a drop or two away - slow right down.',
          exam: 'Neutralisation: acid + alkali → salt + water. At pH 7, universal indicator is green.',
          button: 'Fix it with a drop of acid',
          onClose: () => _coach('Add hydrochloric acid one drop at a time to come back to green.') });
      } else _coach(`Still alkaline (pH ${p.toFixed(1)}). One drop of acid at a time.`);
    } else if (!ms.success && p < 6.5) {
      _coach(net <= 1.0 + 1e-9 ? 'Close! The colour flashes green where the drops land. One drop at a time now.'
                               : `Still ${LabChem.indicatorName(p)} - plenty of acid left. You can add 5 drops at a time for now.`);
    }
    _refresh();
    _readouts();
  }

  function _quiz() {
    const ms = _mission;
    if (!ms || !ms.success) return;
    const M = LabChem.MISSIONS.find(x => x.id === ms.id);
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      let s = 3;
      if (ms.hazards) s--;
      if (ms.overshot || ms.mixed) s--;
      if (r.firstTry < r.total - 1) s--;
      s = Math.max(1, s);
      const st = Labs.store('mixing');
      const prev = st.missions[ms.id] || {};
      st.missions[ms.id] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = [];
      if (ms.hazards) lines.push(`${ms.hazards} safety mistake${ms.hazards === 1 ? '' : 's'} - no hazards next time for an extra star.`);
      else lines.push('No safety mistakes. 🥽');
      if (ms.id === 'neutral') lines.push(ms.overshot ? 'You overshot pH 7 once - go drop by drop near the end.' : `Hit pH 7 in ${ms.drops} drops without overshooting.`);
      else if (ms.id === 'g8_antacid') lines.push(ms.overshot ? 'You overshot pH 7 once - go drop by drop near the end.' : `Neutralised in ${ms.drops} drops without overshooting.`);
      else if (ms.id === 'g8_survey') lines.push(ms.mixed ? 'Two samples got mixed once - one sample per clean tube.' : 'Every sample in its own clean tube. 🧽');
      if (r.firstTry < r.total - 1) lines.push('Get all but one question right first time for another star.');
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => startMission(ms.id),
        onClose: () => { _mission = null; _renderPanel(); _coach('Mission saved. Try the other mission, or go and hunt for discoveries.'); } });
    } });
  }

  // ══ Guided experiments ═══════════════════════
  // For the pupil who lands here and does not know what to do: a guide names
  // ONE next action, puts a button for it right under the tube, and makes the
  // same item glow on the shelf so they learn where things are. Nothing is
  // locked - they can wander off, experiment, and the guide waits for them.
  // A guide is one of LabChem.GUIDES (by id), or one built on the spot from a
  // discovery's recipe (an object, `adhoc`).
  const _gdef = () => _guide && (_guide.def || LabChem.GUIDES.find(g => g.id === _guide.id));

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || LabChem.GUIDES.find(g => g.id === idOrDef);
    if (!G || _busy) return;
    _mission = null;
    _reset();
    _guide = { id: G.id, step: 0, def: adhoc || null };
    _panel = 'sandbox';
    _renderPanel();
    _readouts();
    _guideEnter();
    const z = $('lab-drop-zone');
    if (z && z.getBoundingClientRect().top < 0) z.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' });
  }

  function _guideEnter() {
    const G = _gdef();
    if (!G) return;
    let s = G.steps[_guide.step];
    while (s && s.on === 'goggles' && _goggles) { _guide.step++; s = G.steps[_guide.step]; }
    if (!s) { _guideDone(); return; }
    const kind = _kind(s.on.split(':')[0]);
    if ((kind === 'liquid' || kind === 'metal') && _shelf !== kind) { _shelf = kind; if (_panel === 'sandbox') _renderPanel(); }
    const box = $('lab-guide');
    if (box) {
      const n = G.steps.length, i = _guide.step;
      box.innerHTML = `<p class="lab-guide-meta">${G.icon} ${esc(G.title)} · Step ${i + 1} of ${n}</p>
        <div class="lab-guide-dots" aria-hidden="true">${G.steps.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</div>
        <p class="lab-guide-say">${esc(s.say)}</p>
        ${s.btn ? `<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-guide-do>${esc(s.btn)}</button>`
                : '<p class="lab-guide-wait">⏳ Keep watching the tube…</p>'}
        <button type="button" class="lab-link" style="min-height:44px" data-act="guide-stop">Stop the guide</button>`;
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
    const [k, id] = s.on.split(':');
    const kind = _kind(k);
    if (kind === 'goggles') { if (!_goggles) goggles(); }
    else if (kind === 'liquid') addLiquid(id);
    else if (kind === 'metal') addMetal(id);
    else if (kind === 'rinse') rinse();
    else if (kind === 'pop' || kind === 'out') splint(true);
    else if (kind === 'glow') splint(false);
    else if (kind === 'litmus') litmus(id);
    else if (kind === 'lime') limewater();
    else if (kind === 'conclude') conclude('notalk');
  }

  // ── Discoveries: every card opens ─────────────
  // A pupil who unlocked three by tapping around could not tell what any of
  // them meant, and a locked card's clue alone did not say what to do.
  function _autoStep(on) {
    const [k, id] = on.split(':');
    if (k === 'goggles') return { on, say: 'Put on your goggles first - you will be using an acid or an alkali.', btn: '🥽 Put on goggles' };
    if (k === 'liquid') {
      const L = LabChem.LIQUIDS[id];
      if (id === 'indicator') return { on, say: 'Add a few drops of universal indicator.', btn: '🌈 Add universal indicator' };
      if (id === 'water') return { on, say: 'Pour some water into the tube.', btn: '💧 Pour water' };
      return { on, say: `Pour ${L.name.toLowerCase()} into the tube.`, btn: `🧪 Pour ${L.short.toLowerCase()}` };
    }
    if (k === 'metal') {
      const M = LabChem.METALS[id], n = M.name.toLowerCase();
      return M.alkali
        ? { on, say: `Your teacher adds a tiny piece of ${n} - behind a safety screen.`, btn: `Add ${n} (teacher demo)` }
        : { on, say: `Add ${n} to the tube.`, btn: `Add ${n}` };
    }
    if (k === 'solid') { const n = LabChem.SOLIDS8[id].name.toLowerCase(); return { on, say: `Add ${n} to the tube.`, btn: `Add ${n}` }; }
    if (k === 'litmus') return { on, say: `Dip a strip of ${id} litmus paper into the liquid.`, btn: `${id === 'red' ? '🟥' : '🟦'} Dip ${id} litmus` };
    if (on === 'lime') return { on, say: 'Test the gas: bubble it through limewater.', btn: '🥛 Test with limewater' };
    if (on === 'out') return { on, say: 'Test the gas: hold a lighted splint at the mouth of the tube.', btn: '🔥 Use the lighted splint' };
    if (on === 'conclude') return { on, say: 'Red litmus stayed red. Choose what the test really tells you.', btn: '🤔 So it is not an alkali' };
    if (on === 'observe') return { on, say: 'Watch the tube for a few seconds…' };
    if (on === 'demo-end') return { on, say: 'Watch until it has all gone…' };
    if (on === 'pop') return { on, say: 'Test the gas: hold a lighted splint at the mouth of the tube.', btn: '🔥 Use the lighted splint' };
    if (on === 'glow') return { on, say: 'Now test the gas with a glowing splint.', btn: '🪵 Use the glowing splint' };
    return { on, say: 'Empty and rinse the tube.', btn: '🧽 Empty & rinse' };
  }

  function discoveryGuide(id) {
    const d = _mine(LabChem.DISCOVERIES).find(x => x.id === id);
    if (!d) return;
    startGuide({ id: 'disc-' + id, adhoc: true, icon: d.icon, title: d.title, lesson: d.learn, steps: d.how.map(_autoStep) });
  }

  function _discDetail(id) {
    const d = LabChem.DISCOVERIES.find(x => x.id === id);
    if (!d) return;
    const found = !!Labs.store('mixing').disc[id];
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
    const rx = d.rx ? LabChem.REACTIONS[d.rx] : d.rx8 ? LabChem.REACTIONS8[d.rx8] : null;
    const eq = rx ? { word: rx.word, sym: rx.sym } : d.eq ? LabChem.NEUTRAL[d.eq] : d.word ? { word: d.word, sym: d.sym || '' } : null;
    Labs.overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${d.icon}</p>
        <p class="lab-rs-kicker">Discovery</p>
        <h2 id="lab-ov-title">${esc(d.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What you saw</h3><p>${esc(rx ? rx.obs : d.saw)}</p></section>
        ${eq && eq.word ? `<section class="lab-hz-sec"><h3>The equation</h3><p class="lab-eq">${esc(eq.word)}</p>${eq.sym ? `<p class="lab-eq is-sym">${esc(eq.sym)}</p>` : ''}</section>` : ''}
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
    const st = Labs.store('mixing');
    // A discovery's "Show me how" is not one of the four guided experiments;
    // the discovery it unlocked is the record of it.
    if (!G.adhoc) { st.guides[G.id] = Date.now(); Labs.persist(); }
    _stopGuide(true);
    const next = G.adhoc ? null : _mine(LabChem.GUIDES).find(g => !st.guides[g.id]);
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
    if (!silent) _coach('Guide stopped. Pick another experiment below, or explore freely with the shelf.');
  }

  // The yellow glow on whatever the current guide step wants tapped.
  function _highlight() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    const G = _gdef();
    const s = G && G.steps[_guide.step];
    if (!s) return;
    const [k, id] = s.on.split(':');
    const kind = _kind(k);
    const sel = kind === 'goggles' ? '#lab-goggles'
      : (kind === 'liquid' || kind === 'metal') ? `[data-add="${kind}"][data-id="${id}"]`
      : kind === 'rinse' ? '.lab-tools [data-act="rinse"]'
      : (kind === 'pop' || kind === 'out') ? '.lab-tools [data-act="splint"]'
      : kind === 'glow' ? '.lab-tools [data-act="glow"]'
      : kind === 'litmus' ? `.lab-tools [data-act="litmus-${id}"]`
      : kind === 'lime' ? '.lab-tools [data-act="lime"]'
      : kind === 'conclude' ? '[data-conclude="notalk"]' : null;
    const el = sel && _root.querySelector(sel);
    if (el) el.classList.add('is-next');
  }

  // What the Bench tab opens with when nothing is under way: what this page is
  // for, and every way to start - guided experiments first, then missions.
  function _startHTML() {
    const st = Labs.store('mixing');
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
        <li><b>Follow the yellow box</b> under the test tube. The thing to tap next glows yellow.</li>
        <li><b>Watch the tube</b>, then read what happened in your lab notebook.</li>
      </ol>
      <h3>🧭 Guided experiments <small>start here · step by step</small></h3>
      <div class="lab-start-list">${_mine(LabChem.GUIDES).map(guide).join('')}</div>
      <h3>🎯 Missions <small>exam-style questions · earn stars</small></h3>
      <div class="lab-start-list">${_mine(LabChem.MISSIONS).map(mission).join('')}</div>
      <p class="lab-hint">Or experiment freely: pick anything from the shelf below.</p>
    </section>`;
  }

  // ══ Panels ═══════════════════════════════════
  function _renderPanel() {
    if (!_root) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    const p = $('lab-panel');
    if (!p) return;
    if (_panel === 'found') p.innerHTML = _foundHTML();
    else if (_panel === 'missions') p.innerHTML = _mission
      ? _missionHTML() + (_mission.id === 'race' || _mission.id === 'g8_survey' ? _shelfHTML() + _notebookHTML() : _notebookHTML())
      : _missionListHTML();
    else p.innerHTML = (_guide || _mission ? '' : _startHTML()) + _shelfHTML() + _notebookHTML();
    _foundCount();
    _highlight();
  }

  // Repaint the parts that change while experimenting, without rebuilding the
  // shelf under a finger that is about to tap it.
  function _refresh() {
    const nb = $('lab-notebook');
    if (nb) nb.outerHTML = _notebookHTML();
    const mi = $('lab-mission');
    if (mi) mi.outerHTML = _missionHTML();
    if (_panel === 'found') { const p = $('lab-panel'); if (p) p.innerHTML = _foundHTML(); }
    _foundCount();
    _highlight();
  }
  // Every discovery goes through here so the ✨ counter repaints AFTER it is
  // saved. Calling Labs.discover() straight after _logEntry() - whose refresh
  // had already painted - left the counter one discovery behind ("0/21" with
  // two found).
  // ⚠ Only this grade's discoveries: the other level's are never unlocked here.
  function _discover(id) {
    const all = _mine(LabChem.DISCOVERIES);
    const d = all.find(x => x.id === id);
    if (!d) return;
    if (Labs.discover('mixing', id, { title: d.title, total: all.length })) _refresh();
  }
  function _foundCount() {
    const n = $('lab-found-n');
    if (!n) return;
    const st = Labs.store('mixing'), all = _mine(LabChem.DISCOVERIES);
    n.textContent = `${all.filter(d => st.disc[d.id]).length}/${all.length}`;
  }

  function _shelfHTML() {
    const L = LabChem.LIQUIDS, M = _g8() ? LabChem.SOLIDS8 : LabChem.METALS;
    const liquid = id => {
      const x = L[id];
      return `<button type="button" class="lab-item${x.hazard ? ' is-danger' : ''}" data-add="liquid" data-id="${id}">
        <span class="lab-swatch is-liquid" style="--sw:${x.swatch}"></span>
        <span class="lab-item-text"><b>${esc(x.name)}</b><small>${esc(x.meta)}</small></span>
        ${x.corrosive ? `<span class="lab-item-sign" title="Corrosive">${Labs.sign('corrosive', true)}</span>` : ''}</button>`;
    };
    const metal = id => {
      const x = M[id];
      return `<button type="button" class="lab-item${x.alkali ? ' is-danger' : ''}" data-add="metal" data-id="${id}">
        <span class="lab-swatch is-metal is-${x.look}" style="--sw:${x.color}"><i>${x.sym.length <= 2 ? x.sym : ''}</i></span>
        <span class="lab-item-text"><b>${esc(x.name)}</b><small>${esc(x.meta)}</small></span>
        ${x.alkali ? `<span class="lab-item-sign" title="Explosive and flammable">${Labs.sign('flammable', true)}</span>` : ''}</button>`;
    };
    const items = _g8()
      ? (_shelf === 'metal'
        ? ['magnesium', 'zinc', 'marble'].map(metal)
        : ['lemon', 'vinegar', 'salt', 'bakingsoda', 'toothpaste', 'antacid', 'hcl', 'naoh', 'water', 'indicator', 'bleach'].map(liquid))
      : _shelf === 'metal'
        ? ['magnesium', 'zinc', 'iron', 'copper', 'aluminium', 'calcium', 'sodium', 'potassium'].map(metal)
        : ['hcl', 'h2so4', 'naoh', 'water', 'indicator'].map(liquid);
    return `<section class="lab-shelf" aria-label="Shelf">
      <div class="lab-shelf-head">
        <div class="lab-seg" role="group" aria-label="Shelf">
          <button type="button" data-shelf="liquid" aria-pressed="${_shelf === 'liquid'}">Liquids</button>
          <button type="button" data-shelf="metal" aria-pressed="${_shelf === 'metal'}">${_g8() ? 'Solids' : 'Metals'}</button>
        </div>
        <p class="lab-hint">Tap to add to the tube - or drag it there.</p>
      </div>
      <div class="lab-items">${items.join('')}</div>
    </section>`;
  }

  function _notebookHTML() {
    const ms = _mission;
    let race = '';
    if (ms && ms.id === 'race') {
      race = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Results: metals in dilute hydrochloric acid</caption>
        <thead><tr><th scope="col">Metal</th><th scope="col">Fizzing</th><th scope="col">What you saw</th></tr></thead>
        <tbody>${ms.metals.map(id => {
          const r = ms.results[id];
          return `<tr><th scope="row">${esc(LabChem.METALS[id].name)}</th>
            <td>${r ? `<span class="lab-fizz" role="img" aria-label="${r.rating} of 4">${'●'.repeat(r.rating)}${'○'.repeat(4 - r.rating)}</span>` : '<span class="lab-muted">not tested</span>'}</td>
            <td>${r ? esc(LabChem.FIZZ_WORDS[r.rating]) : ''}</td></tr>`;
        }).join('')}</tbody></table></div>
        <p class="lab-fair">⚖️ Fair test: same acid, same volume, one metal per clean tube.</p>`;
    } else if (ms && ms.id === 'g8_survey') {
      race = `<div class="lab-table-wrap"><table class="lab-table">
        <caption>Results: kitchen samples with universal indicator</caption>
        <thead><tr><th scope="col">Sample</th><th scope="col">Colour</th><th scope="col">pH</th><th scope="col">Acid, neutral or alkali?</th></tr></thead>
        <tbody>${ms.samples.map(id => {
          const r = ms.results[id];
          return `<tr><th scope="row">${esc(LabChem.LIQUIDS[id].name)}</th>
            <td>${r ? `<i aria-hidden="true" style="display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:-1px;background:${LabChem.indicatorColor(r.p)}"></i> ${esc(LabChem.indicatorName(r.p))}` : '<span class="lab-muted">not tested</span>'}</td>
            <td>${r ? r.p : ''}</td><td>${r ? (r.p < 7 ? 'acid' : r.p > 7 ? 'alkali' : 'neutral') : ''}</td></tr>`;
        }).join('')}</tbody></table></div>
        <p class="lab-fair">🧽 One sample per clean tube: empty and rinse between samples.</p>`;
    }
    const ask = e => !e.ask ? ''
      : !e.answer ? `<p><b>What can you say?</b></p><div class="lab-dropper">
          <button type="button" class="lab-btn lab-btn-sm" data-conclude="acid">So it is an acid</button>
          <button type="button" class="lab-btn lab-btn-sm" data-conclude="notalk">So it is not an alkali</button></div>`
      : e.answer === 'notalk' ? '<p>✓ You decided: it is not an alkali.</p>'
      : e.answer === 'acid' ? '<p>✗ You decided: it is an acid - but red litmus cannot show that.</p>' : '';
    const list = _log.length
      ? `<ol class="lab-log">${_log.slice(0, 14).map(e => `<li class="${e.note ? 'is-note' : ''}">
          <b>${esc(e.title)}</b><p>${esc(e.obs)}</p>
          ${e.word ? `<p class="lab-eq">${esc(e.word)}</p>` : ''}
          ${e.sym ? `<p class="lab-eq is-sym">${esc(e.sym)}</p>` : ''}${ask(e)}</li>`).join('')}</ol>`
      : '<p class="lab-empty">Your observations appear here as you experiment - with the word and symbol equations.</p>';
    return `<section class="lab-notebook" id="lab-notebook" aria-label="Lab notebook"><h2>Lab notebook</h2>${race}${list}</section>`;
  }

  function _logEntry(e) {
    _log.unshift(e);
    if (_log.length > 40) _log.length = 40;
    _refresh();
  }

  function _missionListHTML() {
    const st = Labs.store('mixing');
    return `<section class="lab-missions"><h2>Missions</h2><p class="lab-hint">Finish the experiment, answer the exam-style questions, earn up to three stars.</p>
      ${_mine(LabChem.MISSIONS).map(M => {
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
    const M = LabChem.MISSIONS.find(x => x.id === ms.id);
    let body = '';
    if (ms.id === 'race') {
      const done = ms.metals.filter(x => ms.results[x]).length;
      body = `<ul class="lab-steps">
        <li class="${_goggles ? 'is-done' : ''}">🥽 Goggles on</li>
        ${ms.metals.map(id => `<li class="${ms.results[id] ? 'is-done' : ''}">Test ${esc(LabChem.METALS[id].name.toLowerCase())} in dilute hydrochloric acid</li>`).join('')}
        <li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
        <p class="lab-progress-text">${done} of ${ms.metals.length} metals tested</p>`;
    } else if (ms.id === 'g8_survey') {
      const done = ms.samples.filter(x => ms.results[x]).length;
      body = `<ul class="lab-steps">
        ${ms.samples.map(id => `<li class="${ms.results[id] ? 'is-done' : ''}">Test ${esc(_lname(id))} with universal indicator</li>`).join('')}
        <li class="${ms.success ? 'is-done' : ''}">Answer the questions</li></ul>
        <p class="lab-progress-text">${done} of ${ms.samples.length} samples tested</p>`;
    } else {
      const p = _tube.v > 0 ? _pH() : null;
      const col = p != null ? LabChem.indicatorColor(p) : 'transparent';
      body = ms.waiting
        ? '<p class="lab-callout">🥽 Put on your goggles (top of the screen) to begin.</p>'
        : `<div class="lab-target">
            <div class="lab-target-now"><i style="background:${col}"></i><span><small>Now</small><b>pH ${p != null ? p.toFixed(1) : '-'}</b></span></div>
            <div class="lab-target-goal"><i style="background:${LabChem.indicatorColor(7)}"></i><span><small>Goal</small><b>pH 7</b></span></div>
          </div>
          <p class="lab-progress-text">${esc(LabChem.LIQUIDS[_dropBase()].short)} added: ${ms.drops} drop${ms.drops === 1 ? '' : 's'} (${fmt(ms.drops * DROP)} cm³)</p>
          <div class="lab-dropper">
            <button type="button" class="lab-btn lab-btn-primary" data-drop="1">💧 Add 1 drop</button>
            <button type="button" class="lab-btn" data-drop="5">💧 Add 5 drops</button>
            ${ms.overshot && !ms.success ? '<button type="button" class="lab-btn lab-btn-warn" data-drop="acid">↩ 1 drop of acid</button>' : ''}
          </div>
          <button type="button" class="lab-link" style="min-height:44px" data-act="neutral-restart">Start again with fresh acid</button>`;
    }
    return `<section class="lab-mission" id="lab-mission" aria-label="Mission">
      <div class="lab-mission-head"><span aria-hidden="true">${M.icon}</span><h2>${esc(M.title)}</h2>
        <button type="button" class="lab-link" style="min-height:44px" data-act="exit-mission">Leave mission</button></div>
      ${body}
      ${ms.success ? '<button type="button" class="lab-btn lab-btn-primary lab-btn-wide" data-act="quiz">📝 Answer the questions</button>' : ''}
    </section>`;
  }

  function _foundHTML() {
    const st = Labs.store('mixing');
    const all = _mine(LabChem.DISCOVERIES);
    const n = all.filter(d => st.disc[d.id]).length;
    return `<section class="lab-found"><h2>Discoveries <span>${n} of ${all.length}</span></h2>
      <p class="lab-hint">Tap any card. Found ones show what happened and why; locked ones show you how to find them.</p>
      <div class="lab-found-grid">${all.map(d => st.disc[d.id]
        ? `<button type="button" class="lab-found-card is-found" data-disc="${d.id}"><span aria-hidden="true">${d.icon}</span><b>${esc(d.title)}</b><small class="lab-found-tap">What happened? →</small></button>`
        : `<button type="button" class="lab-found-card" data-disc="${d.id}"><span aria-hidden="true">❔</span><b>Not found yet</b><small>Clue: ${esc(d.hint)}</small><small class="lab-found-tap">How do I find it? →</small></button>`).join('')}
      </div></section>`;
  }

  function _intro() {
    const n = _mine(LabChem.DISCOVERIES).length, first = _mine(LabChem.GUIDES)[0];
    Labs.overlay(`
      <div class="lab-intro">
        <p class="lab-done-icon" aria-hidden="true">🧪</p>
        <h2 id="lab-ov-title">Welcome to the Mixing Bench</h2>
        <ul class="lab-intro-list">${_g8() ? `
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first experiment, one tap at a time.</li>
          <li><b>Experiment.</b> Tap a liquid or a solid on the shelf to add it to the test tube - or drag it there.</li>
          <li><b>Test it.</b> Universal indicator gives the pH. Litmus paper says acid or alkali. A splint and limewater tell you which gas.</li>
          <li><b>Get it wrong safely.</b> Make a mistake and you’ll see what happened, and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${n} discoveries to collect.</li>` : `
          <li><b>New here?</b> Tap “Show me how” and I’ll walk you through your first experiment, one tap at a time.</li>
          <li><b>Experiment.</b> Tap a liquid or a metal on the shelf to add it to the test tube - or drag it there.</li>
          <li><b>Watch and read.</b> Every reaction goes into your lab notebook with its word and symbol equations.</li>
          <li><b>Get it wrong safely.</b> Make a mistake and you’ll see the hazard, what happened, and what to do instead. Nothing here can hurt you.</li>
          <li><b>Earn stars.</b> Missions end with exam-style questions. And there are ${n} discoveries to collect.</li>`}
        </ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-ov-close>I’ll explore on my own</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-guide="${first.id}" data-autofocus>Show me how →</button>
      </div>`,
      { cls: 'is-intro', onClose: () => {
        const st = Labs.store('mixing'); st[_introKey()] = true; Labs.persist();
        _coach('First rule of the lab: tap 🥽 to put on your goggles. Then pick something from the shelf.');
      } });
  }

  function _help() {
    if (_g8()) { _help8(); return; }
    const ladder = [['K', 'Potassium', 'violent with water'], ['Na', 'Sodium', 'violent with water'], ['Ca', 'Calcium', 'fizzes with water'],
      ['Mg', 'Magnesium', 'vigorous with acid'], ['Al', 'Aluminium', 'acid, after its oxide layer'], ['Zn', 'Zinc', 'steady with acid'],
      ['Fe', 'Iron', 'slow with acid'], ['H', 'Hydrogen', ''], ['Cu', 'Copper', 'no reaction with acid']];
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Mixing Bench works</h2>
      <div class="lab-help">
        <section><h3>Using the bench</h3><ul>
          <li>Tap an item on the shelf to add it to the tube, or drag it onto the tube.</li>
          <li>Liquids go in 5 cm³ at a time; indicator is 3 drops.</li>
          <li>Test a gas at the mouth of the tube with the lighted or glowing splint.</li>
          <li>“Empty &amp; rinse” gives you a clean tube.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Goggles on before any acid or alkali.</li>
          <li>Never seal a tube that is giving off a gas.</li>
          <li>Alkali metals are for a teacher demo only - never in acid.</li>
          <li>Never fill a test tube more than about a third when it will fizz.</li>
          <li>Never taste or smell chemicals directly.</li></ul></section>
        <section><h3>The reactivity series</h3>
          <ol class="lab-ladder">${ladder.map(([s, n, note]) => `<li class="${s === 'H' ? 'is-h' : ''}"><b>${s}</b><span>${n}</span><small>${note}</small></li>`).join('')}</ol>
          <p class="lab-hint">Most reactive at the top. Metals above hydrogen push hydrogen out of acids.</p></section>
        <section><h3>Universal indicator</h3>
          <div class="lab-scale" role="img" aria-label="Universal indicator colours from pH 1 red to pH 14 purple">${LabChem.INDICATOR.slice(1).map((c, i) => `<span style="background:${c}">${i + 1}</span>`).join('')}</div>
          <p class="lab-hint">Red: strongly acidic · green: neutral (pH 7) · purple: strongly alkaline.</p></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  function _help8() {
    const scale = [['2', 'Lemon juice'], ['3', 'Vinegar'], ['7', 'Water, salt solution'], ['8', 'Baking soda'],
                   ['9', 'Toothpaste'], ['10', 'Antacid'], ['13', 'Bleach']];
    Labs.overlay(`
      <h2 id="lab-ov-title" class="lab-help-title">How the Mixing Bench works</h2>
      <div class="lab-help">
        <section><h3>Using the bench</h3><ul>
          <li>Tap an item on the shelf to add it to the tube, or drag it onto the tube.</li>
          <li>Liquids go in 5 cm³ at a time; universal indicator is 3 drops.</li>
          <li>Dip red or blue litmus paper to test a liquid.</li>
          <li>Test a gas with the lighted splint or with limewater.</li>
          <li>“Empty &amp; rinse” gives you a clean tube.</li></ul></section>
        <section><h3>Lab safety rules</h3><ul>
          <li>Goggles on before any lab acid or alkali.</li>
          <li>Never taste a chemical to test it - use an indicator.</li>
          <li>Never bring cleaners such as bleach from home.</li>
          <li>One sample per clean tube.</li>
          <li>A splash in your eye? Rinse with lots of water and tell your teacher.</li></ul></section>
        <section><h3>The pH scale</h3>
          <div class="lab-scale" role="img" aria-label="Universal indicator colours from pH 1 red to pH 14 purple">${LabChem.INDICATOR.slice(1).map((c, i) => `<span style="background:${c}">${i + 1}</span>`).join('')}</div>
          <p class="lab-hint">Below 7: acidic · 7: neutral · above 7: alkaline. Red: strongly acidic · green: neutral · purple: strongly alkaline.</p>
          <ol class="lab-ladder">${scale.map(([p, n]) => `<li><b>${p}</b><span>${esc(n)}</span><small>${esc(LabChem.indicatorName(+p))}</small></li>`).join('')}</ol></section>
        <section><h3>Litmus and gas tests</h3><ul>
          <li>An acid turns blue litmus <b>red</b>. An alkali turns red litmus <b>blue</b>.</li>
          <li>Hydrogen: a lighted splint gives a squeaky pop.</li>
          <li>Carbon dioxide: limewater turns milky, and a lighted splint goes out.</li></ul></section>
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Back to the bench</button></div>`,
      { cls: 'is-help' });
  }

  // ══ Readouts ═════════════════════════════════
  function _readouts() {
    if (!_root || !_tube) return;
    const t = _tube, p = _pH();
    const ph = $('lab-ph');
    if (ph) {
      if (t.v <= 0) ph.innerHTML = 'Empty tube';
      else if (!t.indicator) ph.innerHTML = 'pH ? <small>add universal indicator to find out</small>';
      else ph.innerHTML = `<i style="background:${LabChem.indicatorColor(p)}"></i>pH ${p.toFixed(1)} <small>${LabChem.indicatorName(p)} · ${LabChem.pHMeaning(p)}</small>`;
    }
    const c = $('lab-contents');
    if (c) {
      const bits = Object.keys(t.added).filter(k => k !== 'indicator')
        .map(k => `${LabChem.LIQUIDS[k].short.toLowerCase()} ${fmt(t.added[k])} cm³`);
      if (t.indicator) bits.push('indicator');
      t.metals.forEach(m => bits.push(_solid(m.id).name.toLowerCase() + (m.left <= 0 ? ' (used up)' : '')));
      c.textContent = bits.length ? 'In the tube: ' + bits.join(' · ') : 'The test tube is clean and empty.';
    }
    const s = $('lab-status');
    if (s) {
      const chips = [];
      if (t.demo) chips.push('<span class="lab-chip">🛡️ Behind the safety screen</span>');
      if (t.warm > 0.3) chips.push('<span class="lab-chip is-warm">🌡️ Tube feels warm</span>');
      if (t.fizz > 0.3) chips.push('<span class="lab-chip">🫧 Fizzing</span>');
      if (t.paper) chips.push(`<span class="lab-chip">${t.paper.from === 'red' ? '🟥 Red' : '🟦 Blue'} litmus: ${t.paper.to === t.paper.from ? 'no change' : 'turned ' + t.paper.to}</span>`);
      if (t.lime) chips.push(`<span class="lab-chip">🥛 Limewater ${t.lime}</span>`);
      if (t.bung && t.pressure > 0.04) chips.push('<span class="lab-chip is-danger">⚠️ Pressure rising!</span>');
      else if (t.bung) chips.push('<span class="lab-chip">🟫 Sealed</span>');
      else if (t.gas > 0.03 || t.co2 > 0.03) chips.push('<span class="lab-chip">💨 Gas at the mouth</span>');
      s.innerHTML = chips.join('');
    }
    const b = $('lab-bung-btn');
    if (b) { const em = b.querySelector('em'); if (em) em.textContent = t.bung ? 'Take bung out' : 'Put bung in'; b.setAttribute('aria-pressed', String(t.bung)); }
    if (_isDrop() && !_busy) {
      const now = _root.querySelector('.lab-target-now');
      if (now && p != null) { now.querySelector('i').style.background = LabChem.indicatorColor(p); now.querySelector('b').textContent = 'pH ' + p.toFixed(1); }
    }
  }

  // ══ Effects ══════════════════════════════════
  function _fxAdd(type, done, data) {
    if (_instant || Labs.calm() || !_cx) { if (done) done(); return; }
    const f = { type, t: 0, dur: FX_DUR[type] || 0.5, done, data: data || {} };
    if (type === 'explode' || type === 'splash' || type === 'bung') f.parts = _burst(type);
    _fx.push(f);
  }
  function _burst(type) {
    const out = [], n = type === 'explode' ? 48 : 18;
    for (let i = 0; i < n; i++) {
      const a = type === 'explode' ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const sp = type === 'explode' ? 120 + Math.random() * 260 : 90 + Math.random() * 170;
      out.push({ x: 0, y: 0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 1.5 + Math.random() * 3,
                 c: type === 'explode' ? ['#FFD166', '#F4845F', '#FFFFFF', '#F25C54'][i % 4] : '#E0F2FE' });
    }
    return out;
  }

  // ══ Drawing ══════════════════════════════════
  function _geom() {
    const tw = Math.max(54, Math.min(86, _W * 0.2));
    const cx = _W / 2, r = tw / 2, top = _H * 0.13, bot = _H * 0.86;
    return { cx, tw, r, top, bot, left: cx - r, right: cx + r };
  }
  function _surfaceY(g, v) {
    const frac = Math.min(1, v / TUBE_VIS);
    return g.bot - 3 - frac * (g.bot - g.top - 12);
  }
  function _tubePath(g, inset) {
    const c = _cx, l = g.left + inset, r = g.right - inset, rad = (r - l) / 2, by = g.bot - g.r;
    c.beginPath();
    c.moveTo(l, g.top + (inset ? 2 : 0));
    c.lineTo(l, by);
    c.arc(g.cx, by, rad, Math.PI, 0, true);
    c.lineTo(r, g.top + (inset ? 2 : 0));
  }
  function _rgba(hex, a) {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  }
  function _shade(hex, k) {
    const h = String(hex).replace('#', '');
    if (h.length !== 6) return hex;
    return '#' + [0, 2, 4].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('');
  }
  function _liquidFill() {
    const t = _tube, p = _pH();
    // Grade 8, too much indicator: a colour too deep to match to the chart.
    if (t.indicator && p != null && _g8() && (t.added.indicator || 0) > 0.2) return _rgba(_shade(LabChem.indicatorColor(p), 0.5), 0.96);
    if (t.indicator && p != null) return _rgba(LabChem.indicatorColor(p), 0.82);
    if (t.ion && t.ionAmt > 0.06) return _rgba(t.ion, Math.min(0.78, 0.22 + t.ionAmt * 0.6));
    return 'rgba(170,212,232,0.38)';
  }
  function _metalXY(i, n, g) {
    return { x: g.cx + (i - (n - 1) / 2) * g.tw * 0.3, y: g.bot - 9 };
  }

  function _animate(dt) {
    if (!dt || Labs.calm()) return;
    const g = _geom(), t = _tube, sy = _surfaceY(g, t.v);
    const n = t.metals.length;
    t.metals.forEach((m, i) => {
      if (m.float) {
        m.vx += (Math.random() - 0.5) * 900 * dt;
        m.vx = Math.max(-120, Math.min(120, m.vx));
        m.dx += m.vx * dt;
        const lim = g.r - 10;
        if (m.dx > lim) { m.dx = lim; m.vx = -Math.abs(m.vx); }
        if (m.dx < -lim) { m.dx = -lim; m.vx = Math.abs(m.vx); }
        return;
      }
      if (m.rate <= 0 || t.v <= 0) return;
      m.acc = (m.acc || 0) + m.rate * 320 * dt;
      const p = _metalXY(i, n, g);
      while (m.acc >= 1 && _parts.length < 220) {
        m.acc -= 1;
        _parts.push({ x: p.x + (Math.random() - 0.5) * 16, y: p.y - 4, r: 1.2 + Math.random() * 2.4,
                      vy: 45 + Math.random() * 55, ph: Math.random() * 6 });
      }
    });
    // Grade 8: baking soda meeting an acid fizzes all through the liquid.
    if (t.fizz > 0 && t.v > 0) {
      t.facc += Math.min(1, t.fizz / 3) * 70 * dt;
      while (t.facc >= 1 && _parts.length < 220) {
        t.facc -= 1;
        _parts.push({ x: g.cx + (Math.random() - 0.5) * g.tw * 0.6, y: g.bot - 10, r: 1 + Math.random() * 2.2,
                      vy: 55 + Math.random() * 60, ph: Math.random() * 6 });
      }
    }
    for (let i = _parts.length - 1; i >= 0; i--) {
      const b = _parts[i];
      b.y -= b.vy * dt;
      b.x += Math.sin(b.ph + b.y * 0.07) * 0.35;
      if (b.y <= sy + 2 || t.v <= 0) _parts.splice(i, 1);
    }
  }

  function _drawMetal(m, x, y) {
    const c = _cx, M = _solid(m.id);
    const s = Math.max(0.18, Math.sqrt(Math.max(0, m.left) / M.piece));
    if (m.left <= 0) return;
    c.fillStyle = M.color; c.strokeStyle = 'rgba(0,0,0,0.28)'; c.lineWidth = 1;
    switch (M.look) {
      case 'ribbon': {
        c.save(); c.translate(x, y - 7); c.rotate(-1.15);
        const w = 30 * s;
        c.beginPath(); c.rect(-w / 2, -2.5, w, 5); c.fill(); c.stroke();
        c.restore(); break;
      }
      case 'granule':
        [[-6, 0], [5, -1], [0, -7]].forEach(([dx, dy]) => { c.beginPath(); c.arc(x + dx, y + dy, 5.5 * s + 1, 0, Math.PI * 2); c.fill(); c.stroke(); });
        break;
      case 'filings': {
        const k = Math.ceil(16 * s);
        for (let i = 0; i < k; i++) { c.beginPath(); c.arc(x + ((i * 37) % 23) - 11, y - ((i * 17) % 9), 1.8, 0, Math.PI * 2); c.fill(); }
        break;
      }
      case 'turnings':
        c.strokeStyle = M.color; c.lineWidth = 2.2;
        for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(x + (i - 1) * 7, y - 4 - (i % 2) * 3, 4.5 * s + 1, 0.3, Math.PI * 1.7); c.stroke(); }
        break;
      case 'foil': {
        const pts = 7, rr = 8 * s + 2;
        c.beginPath();
        for (let i = 0; i < pts; i++) { const a = (i / pts) * Math.PI * 2, j = rr * (0.7 + ((i * 29) % 7) / 20); c.lineTo(x + Math.cos(a) * j, y - 5 + Math.sin(a) * j * 0.7); }
        c.closePath(); c.fill(); c.stroke(); break;
      }
      case 'lump':
        c.beginPath(); c.arc(x, y, 6.5 * s + 1.5, 0, Math.PI * 2);
        c.fillStyle = '#EEF1F4'; c.fill(); c.stroke(); break;
      case 'chips':
        [[-7, 0, 6], [5, -1, 5], [-1, -8, 5]].forEach(([dx, dy, rr]) => {
          const q = rr * s + 1.5, px = x + dx, py = y + dy;
          c.beginPath(); c.moveTo(px - q, py + q * 0.6); c.lineTo(px - q * 0.3, py - q); c.lineTo(px + q, py - q * 0.2); c.lineTo(px + q * 0.5, py + q * 0.8);
          c.closePath(); c.fill(); c.stroke();
        });
        break;
    }
  }

  // Grade 8 test pieces beside the tube: the litmus strip, and the limewater.
  function _drawPaper(g, p) {
    const c = _cx, x = g.left - 26, w = 12, y0 = g.top - 24, mid = g.top + 16, y1 = g.top + 50;
    const col = k => (k === 'red' ? '#DD5A52' : '#4C7BD6');
    c.fillStyle = col(p.from); c.fillRect(x, y0, w, mid - y0);
    c.fillStyle = col(p.to); c.fillRect(x, mid, w, y1 - mid);
    c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 1; c.strokeRect(x, y0, w, y1 - y0);
  }
  function _drawLime(g, state) {
    const c = _cx, w = 18, x = g.right + 22, top = g.top + 30, bot = g.bot - 30, lvl = top + (bot - top) * 0.35;
    c.fillStyle = state === 'milky' ? 'rgba(246,246,240,0.96)' : 'rgba(200,228,240,0.45)';
    c.fillRect(x, lvl, w, bot - lvl);
    c.strokeStyle = _colors.glass; c.lineWidth = 2; c.strokeRect(x, top, w, bot - top);
    c.fillStyle = _colors.ink; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center';
    c.fillText('limewater', x + w / 2, bot + 13);
  }

  function _draw(dt) {
    if (!_cx || !_tube) return;
    const c = _cx, g = _geom(), t = _tube;
    c.save();
    c.clearRect(0, 0, _W, _H);
    if (_shake > 0) {
      c.translate((Math.random() - 0.5) * 9 * _shake, (Math.random() - 0.5) * 9 * _shake);
      _shake = Math.max(0, _shake - dt * 1.4);
    }
    const bg = c.createLinearGradient(0, 0, 0, _H);
    bg.addColorStop(0, _colors.top); bg.addColorStop(1, _colors.bot);
    c.fillStyle = bg; c.fillRect(-12, -12, _W + 24, _H + 24);
    c.fillStyle = _colors.bench; c.fillRect(-12, _H * 0.92, _W + 24, _H * 0.1);
    // test-tube rack: a bar the tube sits through, two feet
    c.fillStyle = _colors.rack;
    c.fillRect(g.cx - g.tw * 1.6, g.bot - g.r * 1.9, g.tw * 3.2, 7);
    c.fillRect(g.cx - g.tw * 1.5, g.bot - g.r * 1.9, 5, _H * 0.92 - (g.bot - g.r * 1.9));
    c.fillRect(g.cx + g.tw * 1.5 - 5, g.bot - g.r * 1.9, 5, _H * 0.92 - (g.bot - g.r * 1.9));

    // liquid, metals and bubbles, clipped to the inside of the glass
    c.save();
    _tubePath(g, 3); c.clip();
    const sy = _surfaceY(g, t.v);
    if (t.v > 0) {
      c.fillStyle = _liquidFill();
      c.fillRect(g.left, sy, g.tw, g.bot - sy + 4);
      if (t.cloudy > 0.02) { c.fillStyle = `rgba(246,246,242,${Math.min(0.65, t.cloudy * 0.65)})`; c.fillRect(g.left, sy, g.tw, g.bot - sy + 4); }
      c.beginPath(); c.moveTo(g.left, sy - 1); c.quadraticCurveTo(g.cx, sy + 5, g.right, sy - 1);
      c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 1.5; c.stroke();
    }
    const n = t.metals.length;
    t.metals.forEach((m, i) => {
      if (m.float) _drawMetal(m, g.cx + (m.dx || 0), sy - 1);
      else { const p = _metalXY(i, n, g); _drawMetal(m, p.x, p.y); }
    });
    if (Labs.calm() || _instant) {
      // Still, but not blank: a fixed spray of bubbles shows how hard it fizzes.
      t.metals.forEach((m, i) => {
        if (m.float || m.rate <= 0) return;
        const p = _metalXY(i, n, g), k = Math.min(18, Math.round(m.rate * 180) + 1);
        for (let j = 0; j < k; j++) {
          const f = ((j * 53) % 97) / 97;
          c.beginPath(); c.arc(p.x + ((j * 29) % 23) - 11, p.y - 8 - f * (p.y - 8 - sy - 6), 1.8, 0, Math.PI * 2);
          c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1; c.stroke();
        }
      });
      if (t.fizz > 0 && t.v > 0) for (let j = 0; j < 16; j++) {
        const f = ((j * 53) % 97) / 97;
        c.beginPath(); c.arc(g.cx + ((j * 31) % 29) - 14, g.bot - 12 - f * (g.bot - 12 - sy - 6), 1.8, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1; c.stroke();
      }
    } else {
      c.strokeStyle = 'rgba(255,255,255,0.85)'; c.fillStyle = 'rgba(255,255,255,0.18)'; c.lineWidth = 1;
      _parts.forEach(b => { c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2); c.fill(); c.stroke(); });
    }
    c.restore();

    // demo: fizz and flame around a floating alkali metal
    t.metals.forEach(m => {
      if (!m.float || m.left <= 0) return;
      const x = g.cx + (m.dx || 0), y = sy - 2;
      if (!Labs.calm()) for (let k = 0; k < 6; k++) {
        c.beginPath(); c.arc(x + (Math.random() - 0.5) * 22, y - Math.random() * 6, 1 + Math.random() * 1.6, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255,255,255,0.8)'; c.fill();
      }
      const rx = LabChem.REACTIONS[m.key];
      if (rx && rx.flame) {
        const fl = c.createRadialGradient(x, y - 12, 1, x, y - 12, 16);
        fl.addColorStop(0, 'rgba(255,255,255,0.95)'); fl.addColorStop(0.35, _rgba(rx.flame, 0.9)); fl.addColorStop(1, _rgba(rx.flame, 0));
        c.fillStyle = fl;
        c.beginPath(); c.ellipse(x, y - 12, 9, 15 + (Labs.calm() ? 0 : Math.random() * 4), 0, 0, Math.PI * 2); c.fill();
      }
    });

    // the glass
    _tubePath(g, 0);
    c.lineWidth = 2.5; c.strokeStyle = _colors.glass; c.stroke();
    c.beginPath(); c.moveTo(g.left + 7, g.top + 12); c.lineTo(g.left + 7, g.bot - g.r - 4);
    c.strokeStyle = _colors.hi; c.lineWidth = 3; c.stroke();
    c.beginPath(); c.ellipse(g.cx, g.top, g.r + 3, 4, 0, 0, Math.PI * 2);
    c.strokeStyle = _colors.glass; c.lineWidth = 2; c.stroke();
    if (t.paper) _drawPaper(g, t.paper);
    if (t.lime) _drawLime(g, t.lime);

    if (t.bung) {
      c.fillStyle = '#8A5A2E';
      c.beginPath();
      c.moveTo(g.left - 4, g.top - 14); c.lineTo(g.right + 4, g.top - 14);
      c.lineTo(g.right - 2, g.top + 10); c.lineTo(g.left + 2, g.top + 10); c.closePath(); c.fill();
    }

    // shimmer over a warm tube
    if (t.warm > 0.3 && !Labs.calm()) {
      c.strokeStyle = `rgba(255,140,60,${0.35 * t.warm})`; c.lineWidth = 1.5;
      const ph = performance.now() / 300;
      for (let k = -1; k <= 1; k++) {
        c.beginPath();
        for (let yy = 0; yy < 30; yy += 3) c.lineTo(g.cx + k * 12 + Math.sin(ph + yy / 5 + k) * 3, g.top - 8 - yy);
        c.stroke();
      }
    }

    if (t.demo) {
      c.fillStyle = 'rgba(150,200,230,0.16)'; c.strokeStyle = 'rgba(95,150,185,0.85)'; c.lineWidth = 2;
      const sx = g.left - 34, sw = g.tw + 68, st = g.top - 26;
      c.fillRect(sx, st, sw, g.bot - st + 6); c.strokeRect(sx, st, sw, g.bot - st + 6);
      c.fillStyle = _colors.ink; c.font = '600 10px system-ui, sans-serif'; c.textAlign = 'center';
      c.fillText('SAFETY SCREEN · TEACHER DEMO', g.cx, st - 6);
    }

    _drawFx(dt, g, sy);
    c.restore();
  }

  function _drawFx(dt, g, sy) {
    const c = _cx;
    for (let i = _fx.length - 1; i >= 0; i--) {
      const f = _fx[i];
      f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      switch (f.type) {
        case 'pour': {
          const bx = g.cx - _W * 0.27, by = g.top - _H * 0.02;
          c.save(); c.translate(bx, by); c.rotate(-0.25 - k * 0.9);
          c.fillStyle = 'rgba(255,255,255,0.7)'; c.strokeStyle = _colors.glass; c.lineWidth = 2;
          c.beginPath(); c.rect(-11, -30, 22, 34); c.fill(); c.stroke();
          c.fillStyle = _rgba(f.data.color || '#CFE8F3', 0.9); c.fillRect(-9, -8, 18, 10);
          c.restore();
          if (k > 0.2 && k < 0.95) {
            c.strokeStyle = _rgba(f.data.color || '#CFE8F3', 0.95); c.lineWidth = 4; c.lineCap = 'round';
            c.beginPath(); c.moveTo(bx + 12, by - 20); c.quadraticCurveTo(g.cx - 10, g.top - 36, g.cx, Math.max(g.top + 6, sy - 4)); c.stroke();
          }
          break;
        }
        case 'drop': {
          const y = (g.top - 26) + k * (Math.max(g.top, sy) - (g.top - 26));
          c.fillStyle = _rgba(f.data.color || '#CFE8F3', 0.95); c.strokeStyle = 'rgba(0,0,0,0.25)';
          c.beginPath(); c.arc(g.cx, y, 4.5, 0, Math.PI * 2); c.fill(); c.stroke();
          break;
        }
        case 'splint': {
          const sx = g.right + 90 - k * 80, syy = g.top - 36 + k * 24;
          c.strokeStyle = '#A0703C'; c.lineWidth = 4; c.lineCap = 'round';
          c.beginPath(); c.moveTo(sx + 70, syy - 30); c.lineTo(sx, syy); c.stroke();
          if (f.data.lit) {
            const fl = c.createRadialGradient(sx, syy - 8, 1, sx, syy - 8, 12);
            fl.addColorStop(0, '#FFF6C2'); fl.addColorStop(0.5, '#FFB020'); fl.addColorStop(1, 'rgba(255,120,0,0)');
            c.fillStyle = fl; c.beginPath(); c.ellipse(sx, syy - 8, 6, 12, 0, 0, Math.PI * 2); c.fill();
          } else {
            c.fillStyle = '#FF5A1F'; c.shadowColor = '#FF5A1F'; c.shadowBlur = 10;
            c.beginPath(); c.arc(sx, syy, 3.5, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
          }
          break;
        }
        case 'pop': {
          const x = g.cx, y = g.top - 6;
          const fl = c.createRadialGradient(x, y, 0, x, y, 12 + 40 * k);
          fl.addColorStop(0, `rgba(255,236,150,${1 - k})`); fl.addColorStop(1, 'rgba(255,200,80,0)');
          c.fillStyle = fl; c.beginPath(); c.arc(x, y, 12 + 40 * k, 0, Math.PI * 2); c.fill();
          c.save(); c.globalAlpha = 1 - k * 0.7; c.font = `800 ${Math.round(18 + 16 * k)}px system-ui, sans-serif`; c.textAlign = 'center';
          c.lineWidth = 4; c.strokeStyle = '#1B2A24'; c.strokeText('POP!', x + 30, y - 10 - 18 * k);
          c.fillStyle = '#FFC53D'; c.fillText('POP!', x + 30, y - 10 - 18 * k); c.restore();
          break;
        }
        case 'explode': {
          _shake = Math.max(_shake, 1 - k);
          const x = g.cx, y = sy;
          const fl = c.createRadialGradient(x, y, 0, x, y, 30 + _W * 0.6 * k);
          fl.addColorStop(0, `rgba(255,255,255,${0.95 * (1 - k)})`); fl.addColorStop(0.3, `rgba(255,170,60,${0.8 * (1 - k)})`); fl.addColorStop(1, 'rgba(255,90,40,0)');
          c.fillStyle = fl; c.fillRect(0, 0, _W, _H);
          f.parts.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; c.fillStyle = p.c; c.beginPath(); c.arc(x + p.x, y + p.y, p.r, 0, Math.PI * 2); c.fill(); });
          break;
        }
        case 'splash': {
          const x = g.cx, y = g.top;
          f.parts.forEach(p => {
            const px = x + p.vx * f.t, py = y + p.vy * f.t + 200 * f.t * f.t;
            c.fillStyle = `rgba(220,240,255,${0.9 - k * 0.6})`; c.strokeStyle = 'rgba(40,80,110,0.5)';
            c.beginPath(); c.arc(px, py, p.r * (1 + 5 * k), 0, Math.PI * 2); c.fill(); c.stroke();
          });
          const vg = c.createRadialGradient(_W / 2, _H / 2, _H * 0.2, _W / 2, _H / 2, _W * 0.8);
          vg.addColorStop(0, 'rgba(200,30,30,0)'); vg.addColorStop(1, `rgba(200,30,30,${0.45 * Math.sin(Math.PI * k)})`);
          c.fillStyle = vg; c.fillRect(0, 0, _W, _H);
          break;
        }
        case 'bung': {
          _shake = Math.max(_shake, 0.6 * (1 - k));
          const y = g.top - k * _H * 0.9;
          c.save(); c.translate(g.cx + k * 40, y); c.rotate(k * 5);
          c.fillStyle = '#8A5A2E'; c.fillRect(-g.r - 3, -10, g.tw + 6, 20); c.restore();
          f.parts.forEach(p => { c.fillStyle = `rgba(210,235,250,${1 - k})`; c.beginPath(); c.arc(g.cx + p.vx * f.t * 0.6, g.top + p.vy * f.t * 0.9, p.r, 0, Math.PI * 2); c.fill(); });
          break;
        }
        case 'streak': {
          c.fillStyle = `rgba(60,190,110,${0.75 * (1 - k)})`;
          c.beginPath(); c.ellipse(g.cx, sy + 6, g.r - 6, 7, 0, 0, Math.PI * 2); c.fill();
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
  // Deterministic stepping for the headless tests: effects apply at once and
  // simulated seconds pass without waiting for real ones.
  function _test(o) { _instant = !!(o && o.instant); }
  function _tick(sec) { const n = Math.ceil(sec / 0.05); for (let i = 0; i < n; i++) _step(0.05); _readouts(); }
  function _debug() {
    const t = _tube || _newTube();
    return { grade: _grade, v: t.v, h: t.h, oh: t.oh, pH: _tube ? _pH() : null, indicator: t.indicator, gas: t.gas, bung: t.bung, demo: t.demo,
             co2: t.co2, fizz: t.fizz, lime: t.lime, paper: t.paper, added: Object.assign({}, t.added),
             goggles: _goggles, busy: _busy, panel: _panel, guide: _guide && { id: _guide.id, step: _guide.step },
             metals: t.metals.map(m => ({ id: m.id, left: m.left, rate: m.rate, key: m.key })),
             log: _log.slice(0, 6).map(e => e.title + ': ' + e.obs),
             mission: _mission && { id: _mission.id, results: Object.keys(_mission.results), drops: _mission.drops,
                                    overshot: _mission.overshot, mixed: _mission.mixed, success: _mission.success, hazards: _mission.hazards, waiting: _mission.waiting } };
  }

  return { mount, unmount, startMission, startGuide, discoveryGuide, addLiquid, addMetal, splint, bung, rinse, goggles, drop,
           litmus, limewater, taste, conclude, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabMixing = LabMixing;
