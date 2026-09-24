'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Food Groups & Teeth (Science, PSAC Grade 6)
//
//  Two stations on one bench:
//   - MEAL BUILDER: a plate divided into 5 segments. Tap a food from the shelf
//     to place it in the correct group segment. "Check my meal" evaluates the
//     balance. An iodine dropper tests foods for starch.
//   - TEETH LABELLER: a canvas half-jaw of 7 teeth. Tap a tooth on the canvas
//     or its named button under it → its label chip appears and the coach
//     reads what it does.
//  Opens on an EXPERIMENT (lab_experiment.js: Aim → Predict → Do → See →
//  Check → Done) built from EXPERIMENTS in the data file; the `experiment`
//  adapter at the end of this file is the contract (LAB_SPEC.md §10). The
//  free bench with its guides, two Missions, 15 Discoveries and 🔊 read-aloud
//  (never automatic) survives as Explore.
//
//  ⚠ Every outcome comes from lab_nutrition_data.js (LabNutritionData). This
//    file only draws and moves. If a food is in the wrong group, fix the DATA.
//  ⚠ Only the <canvas> animates. Nothing here touches .screen (ui-css.md).
//  ⚠ Calm Mode and reduced motion: animations apply at once; canvas still shows.
//  ⚠ Speech is cancelled on every step change, overlay, unmount and screen
//    change — speech outlives the DOM that started it.
// ══════════════════════════════════════════════
const LabNutrition = (() => {
  const P = () => LabNutritionData;
  const ID = 'nutrition';
  const FRAME_MS = 1000 / 30;

  const $ = id => document.getElementById(id);
  const esc = s => Labs.esc(s);
  const calm = () => Labs.calm();

  let _root = null, _cv = null, _cx = null, _W = 0, _H = 0;
  let _raf = 0, _last = 0, _uiAcc = 0, _resizeWired = false, _draggingOver = false;
  let _station = 'meal';
  let _meal = null;          // { plate: {carbs,protein,fat,vitamins,water}, activeTest, testedFoods }
  let _tappedTeeth = null;   // Set of tooth ids tapped this session
  let _guide = null, _guideStep = 0;
  let _mission = null, _missionStep = 0;
  let _panel = 'sandbox';
  let _log = [], _fx = [], _busy = false, _instant = false;
  let _tipIdx = -1, _talking = false;
  let _highlight = null;     // { type:'tooth'|'group'|'food', id, t } for canvas flash
  let _checkAnim = 0;        // 0-1 bounce when check is pressed
  let _focus = null;         // Set of tokens an experiment shows, or null for everything
  let _silent = false;       // true while experiment.apply() sets the bench up: no toasts, no speech

  function _resetBench() {
    _meal = P().blankMeal();
    _tappedTeeth = new Set();
    _fx = []; _busy = false; _log = []; _tipIdx = -1; _highlight = null; _checkAnim = 0;
    _station = 'meal'; _guide = null; _guideStep = 0; _mission = null; _missionStep = 0;
    _panel = 'sandbox';
  }

  // ══ Shell ═══════════════════════════════════════════════════════════════════
  function _shellHTML() {
    return `<div class="lab lab-nutrition">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-act="hub" aria-label="Back to Science Labs">←</button>
        <div class="lab-top-title">
          <span class="lab-eyebrow">Science · Grade 6</span>
          <h1>Food Groups &amp; Teeth</h1>
        </div>
        <div class="lab-top-actions">
          <button type="button" class="lab-icon-btn" data-act="help" aria-label="How the lab works">?</button>
        </div>
      </header>
      <div class="lab-body">
        <div class="lab-stage">
          <div class="lab-nutrition-stations" role="group" aria-label="Choose a station">
            <button type="button" data-set="station" data-v="meal" class="lab-nutrition-stn-btn is-active">🍽️ Meal Builder</button>
            <button type="button" data-set="station" data-v="teeth" class="lab-nutrition-stn-btn">🦷 Teeth Lab</button>
          </div>
          <div class="lab-canvas-wrap" id="lab-nutrition-stage">
            <canvas id="lab-canvas" role="img" aria-label="Food groups plate and teeth diagram"></canvas>
            <div class="lab-nutrition-chips" id="lab-nutrition-chips"></div>
          </div>
          <div class="lab-nutrition-shelf" id="lab-nutrition-shelf"></div>
          <div class="lab-coach">
            <span class="lab-coach-face" aria-hidden="true">🧑‍🔬</span>
            <p id="lab-coach-text" aria-live="polite">Welcome! Choose a station to start.</p>
            <button type="button" class="lab-coach-tip lab-nutrition-say" data-act="say-coach" aria-label="Read this aloud">🔊</button>
            <button type="button" class="lab-coach-tip" data-act="tip" aria-label="Show a science fact">💡</button>
          </div>
          <div class="lab-task-strip">↓ Pick a food from the shelf - it lands on the plate.</div>
          <div id="lab-guide" class="lab-guide" aria-live="polite" hidden></div>
          <div class="lab-tools lab-nutrition-tools" id="lab-nutrition-tools"></div>
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

  // ══ Mount / unmount ═════════════════════════════════════════════════════════
  function mount(root) {
    _root = root;
    if (!_meal) _resetBench();
    root.innerHTML = _shellHTML();
    _cv = $('lab-canvas');
    _cx = _cv.getContext('2d');
    _resize();
    _wire();
    _cv.addEventListener('click', _onCanvasClick);
    _renderPanel();
    _renderShelf();
    _renderTools();
    _syncStationBtns();
    _applyFocus();
    _loop(performance.now());
    const st = Labs.store(ID);
    if (!st.intro) _intro();
  }

  function unmount() {
    _ttsStop();
    _focus = null;
    cancelAnimationFrame(_raf); _raf = 0;
  }

  // ══ Canvas loop ══════════════════════════════════════════════════════════════
  function _loop(now) {
    const dt = Math.min(now - _last, 100);
    _last = now;
    _uiAcc += dt;
    if (_uiAcc >= FRAME_MS) {
      _uiAcc %= FRAME_MS;
      _drawFrame(dt / 1000);
    }
    _raf = requestAnimationFrame(_loop);
  }

  function _resize() {
    const wrap = $('lab-nutrition-stage');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    // Height from width, never from the wrap: the experiment runner parks the
    // guide box inside the wrap, so measuring it would grow the canvas each time.
    _W = rect.width; _H = Math.min(_W, 340);
    _cv.width = Math.round(_W * dpr);
    _cv.height = Math.round(_H * dpr);
    _cv.style.width = _W + 'px'; _cv.style.height = _H + 'px';
    _cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!_resizeWired) {
      _resizeWired = true;
      window.addEventListener('resize', _resize, { passive: true });
    }
  }

  // ══ Drawing ══════════════════════════════════════════════════════════════════
  function _drawFrame(dt) {
    if (!_cx) return;
    // Advance highlight fade
    if (_highlight) { _highlight.t = Math.max(0, _highlight.t - (calm() ? 1 : dt * 2)); if (_highlight.t === 0) _highlight = null; }
    if (_checkAnim > 0) _checkAnim = Math.max(0, _checkAnim - dt * 3);
    _cx.clearRect(0, 0, _W, _H);
    if (_station === 'meal') _drawMealStation();
    else _drawTeethStation();
  }

  // ── Meal Builder ─────────────────────────────────────────────────────────────
  function _drawMealStation() {
    const cx = _cx;
    const cx0 = _W / 2, cy0 = _H / 2 - 20;
    const r = Math.min(_W, _H) * 0.38;
    const groups = P().GROUP_IDS;
    const slice = (Math.PI * 2) / groups.length;
    const plate_r = r * 1.07;

    // Plate shadow
    cx.save();
    cx.shadowColor = 'rgba(0,0,0,0.12)'; cx.shadowBlur = 18;
    cx.beginPath(); cx.arc(cx0, cy0, plate_r, 0, Math.PI * 2);
    cx.fillStyle = '#F5F0E8'; cx.fill();
    cx.restore();

    // Draw wedges
    groups.forEach((gid, i) => {
      const startA = slice * i - Math.PI / 2;
      const endA = startA + slice;
      const g = P().FOOD_GROUPS[gid];
      const filled = _meal.plate[gid] !== null;
      const isNext = _guideIsNext('food:' + _guideExpectedFood(gid)) || _guideIsNext('food:' + _meal.plate[gid]);

      cx.save();
      cx.beginPath();
      cx.moveTo(cx0, cy0);
      cx.arc(cx0, cy0, r, startA, endA);
      cx.closePath();
      cx.fillStyle = filled ? g.color : '#E8E4DC';
      cx.globalAlpha = filled ? 1 : 0.65;
      cx.fill();
      if (isNext && !filled) {
        cx.strokeStyle = '#FFF'; cx.lineWidth = 3;
        cx.setLineDash([5, 3]); cx.stroke(); cx.setLineDash([]);
      }
      cx.globalAlpha = 1;
      cx.restore();

      // Label
      const midA = startA + slice / 2;
      const lx = cx0 + Math.cos(midA) * r * 0.62;
      const ly = cy0 + Math.sin(midA) * r * 0.62;
      cx.save();
      cx.font = filled ? 'bold 11px sans-serif' : '10px sans-serif';
      cx.textAlign = 'center'; cx.textBaseline = 'middle';
      cx.fillStyle = filled ? '#333' : '#777';
      const label = g.short;
      cx.fillText(label, lx, ly - (filled ? 8 : 0));

      if (filled) {
        const fid = _meal.plate[gid];
        const food = P().FOODS[fid];
        cx.font = '18px sans-serif';
        cx.fillText(food.icon, lx, ly + 8);
      }
      cx.restore();
    });

    // Centre plate circle
    cx.save();
    cx.beginPath(); cx.arc(cx0, cy0, r * 0.22, 0, Math.PI * 2);
    cx.fillStyle = '#FFF'; cx.fill();
    cx.strokeStyle = '#DDD'; cx.lineWidth = 1.5; cx.stroke();
    const balance = P().isBalanced(_meal.plate);
    cx.font = '20px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
    cx.fillText(balance ? '✅' : '🍽️', cx0, cy0);
    cx.restore();

    // Drop-here ring while dragging a food over the plate
    if (_draggingOver) {
      cx.save();
      cx.strokeStyle = '#3b82f6';
      cx.lineWidth = 3;
      cx.setLineDash([7, 4]);
      cx.beginPath(); cx.arc(cx0, cy0, plate_r + 7, 0, Math.PI * 2); cx.stroke();
      cx.setLineDash([]);
      cx.restore();
    }

    // Check animation bounce
    if (_checkAnim > 0) {
      const scale = 1 + _checkAnim * 0.08;
      cx.save();
      cx.translate(cx0, cy0); cx.scale(scale, scale); cx.translate(-cx0, -cy0);
      cx.strokeStyle = '#27AE60'; cx.lineWidth = 3;
      cx.beginPath(); cx.arc(cx0, cy0, plate_r + 4, 0, Math.PI * 2); cx.stroke();
      cx.restore();
    }

    // Test result indicators (small coloured dots near tested foods)
    if (_meal.activeTest && _meal.testedFoods.length) {
      _meal.testedFoods.forEach(fid => {
        const res = P().testResult(_meal.activeTest, fid);
        if (!res) return;
        const grp = P().foodGroup(fid);
        const gi = P().GROUP_IDS.indexOf(grp);
        if (gi < 0) return;
        const midA = slice * gi - Math.PI / 2 + slice / 2;
        const dx = cx0 + Math.cos(midA) * r * 0.85;
        const dy = cy0 + Math.sin(midA) * r * 0.85;
        cx.save();
        cx.beginPath(); cx.arc(dx, dy, 7, 0, Math.PI * 2);
        cx.fillStyle = res.positive ? '#141633' : '#B8651B';
        cx.fill(); cx.restore();
      });
    }
  }

  function _guideExpectedFood(gid) {
    const t = _stepToks(_curStep()).find(tok => tok.indexOf('food:') === 0 && P().foodGroup(tok.slice(5)) === gid);
    return t ? t.slice(5) : null;
  }

  // ── Teeth Labeller ───────────────────────────────────────────────────────────
  // Where the half jaw sits on the canvas - shared by the drawing and the tap.
  function _jawGeom() {
    const slots = P().JAW_SLOTS;  // ['molar','molar','premolar','premolar','canine','incisor','incisor']
    const n = slots.length;
    const tw = Math.min((_W - 32) / n, 60);
    return { slots, n, tw, startX: (_W - tw * n) / 2, baseY: _H * 0.62, gumH: 22 };
  }
  function _toothAt(x, y) {
    const { slots, n, tw, startX, baseY, gumH } = _jawGeom();
    if (y < baseY - gumH - 44 || y > baseY + 12) return null;
    const i = Math.floor((x - startX) / tw);
    return i >= 0 && i < n ? slots[i] : null;
  }
  function _onCanvasClick(e) {
    if (_station !== 'teeth' || !_cv) return;
    const r = _cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const type = _toothAt((e.clientX - r.left) * (_W / r.width), (e.clientY - r.top) * (_H / r.height));
    if (type) _onToothTap(type);
  }

  function _drawTeethStation() {
    const cx = _cx;
    const { slots, n, tw, startX, baseY, gumH } = _jawGeom();

    // Gum line
    cx.save();
    cx.fillStyle = '#F7A8A8';
    cx.beginPath();
    cx.rect(startX - 8, baseY - gumH, tw * n + 16, gumH + 10);
    cx.fill();
    cx.restore();

    // Draw each tooth
    slots.forEach((type, i) => {
      const tx = startX + i * tw + tw * 0.1;
      const twidth = tw * 0.8;
      const tooth = P().TEETH[type];
      const tapped = _tappedTeeth.has(type);
      const isNextType = _guideIsNextTooth(type);

      // Crown height varies by tooth type
      const crownH = type === 'molar' ? 36 : type === 'premolar' ? 32 : type === 'canine' ? 40 : 28;
      const ty = baseY - gumH - crownH;

      // Canine has a pointed top
      cx.save();
      cx.beginPath();
      if (type === 'canine') {
        cx.moveTo(tx, baseY - gumH);
        cx.lineTo(tx + twidth, baseY - gumH);
        cx.lineTo(tx + twidth * 0.8, ty + 10);
        cx.lineTo(tx + twidth / 2, ty);
        cx.lineTo(tx + twidth * 0.2, ty + 10);
        cx.closePath();
      } else if (type === 'molar' || type === 'premolar') {
        // Flat top with ridges
        cx.roundRect ? cx.roundRect(tx, ty, twidth, crownH, [4, 4, 0, 0])
          : (cx.rect(tx, ty, twidth, crownH));
        cx.closePath();
      } else {
        // Incisor: chisel shape (slightly tapered)
        cx.moveTo(tx + twidth * 0.1, baseY - gumH);
        cx.lineTo(tx + twidth * 0.9, baseY - gumH);
        cx.lineTo(tx + twidth, ty);
        cx.lineTo(tx, ty);
        cx.closePath();
      }

      const fillColor = tapped ? '#A8D8EA' : (isNextType ? '#FFFDE7' : '#FFFFFF');
      cx.fillStyle = fillColor;
      cx.fill();
      cx.strokeStyle = tapped ? '#2196F3' : (isNextType ? '#FFC107' : '#BDBDBD');
      cx.lineWidth = tapped ? 2.5 : (isNextType ? 2 : 1.5);
      cx.stroke();

      // Ridge marks for premolars and molars
      if (type === 'premolar' || type === 'molar') {
        const ridges = type === 'molar' ? 3 : 2;
        cx.save(); cx.strokeStyle = '#CCC'; cx.lineWidth = 1;
        for (let r = 1; r <= ridges; r++) {
          const rx = tx + (twidth / (ridges + 1)) * r;
          cx.beginPath(); cx.moveTo(rx, ty + 4); cx.lineTo(rx, ty + crownH - 4); cx.stroke();
        }
        cx.restore();
      }

      // Glow for next-step tooth
      if (isNextType && !calm()) {
        cx.save(); cx.globalAlpha = 0.3 + 0.3 * Math.sin(Date.now() / 300);
        cx.strokeStyle = '#FFC107'; cx.lineWidth = 4;
        cx.strokeRect(tx - 2, ty - 2, twidth + 4, crownH + gumH + 4);
        cx.restore();
      }

      cx.restore();
    });

    // Labels for tapped tooth types
    const labeled = new Set();
    slots.forEach((type, i) => {
      if (!_tappedTeeth.has(type) || labeled.has(type)) return;
      labeled.add(type);
      const midX = startX + (slots.lastIndexOf(type) + slots.indexOf(type)) / 2 * tw + tw / 2;
      const tooth = P().TEETH[type];
      cx.save();
      cx.font = 'bold 10px sans-serif'; cx.textAlign = 'center';
      cx.fillStyle = '#1565C0';
      cx.fillText(tooth.name, midX, baseY + 18);
      cx.restore();
    });

    // Dental health summary at bottom
    const all4 = P().TOOTH_IDS.every(t => _tappedTeeth.has(t));
    if (all4) {
      cx.save();
      cx.font = 'bold 12px sans-serif'; cx.textAlign = 'center';
      cx.fillStyle = '#2E7D32';
      cx.fillText('All ' + P().TOTAL_TEETH + ' adult teeth in two rows!', _W / 2, _H - 12);
      cx.restore();
    }
  }

  const _guideIsNext = token => _stepToks(_curStep()).includes(token);
  const _guideIsNextTooth = type => _guideIsNext('tooth:' + type);

  // ══ Interactions ════════════════════════════════════════════════════════════
  function _wire() {
    const root = _root;
    root.addEventListener('click', _onClick, { passive: true });
    root.addEventListener('touchend', _onTouch, { passive: false });
  }

  function _onTouch(e) {
    const btn = e.target.closest('button[data-act],button[data-set],button[data-panel],.lab-nutrition-food-btn,.lab-nutrition-tooth-btn');
    if (btn) { e.preventDefault(); btn.click(); }
  }

  function _onClick(e) {
    const el = e.target.closest('[data-act],[data-set],[data-panel],.lab-nutrition-food-btn,.lab-nutrition-tooth-btn');
    if (!el) return;
    if (el.dataset.food) { _onFoodTap(el.dataset.food); return; }
    if (el.dataset.tooth) { _onToothTap(el.dataset.tooth); return; }
    const act = el.dataset.act;
    const panel = el.dataset.panel;
    const setK = el.dataset.set, setV = el.dataset.v;
    if (panel) { _switchPanel(panel); return; }
    if (setK === 'station') { _switchStation(setV); return; }
    if (act === 'hub') { Labs.backToHub(); return; }
    if (act === 'help') { _showHelp(); return; }
    if (act === 'say-coach') { _sayCoach(); return; }
    if (act === 'say-guide') { _sayGuide(); return; }
    if (act === 'tip') { _showTip(); return; }
    if (act === 'check') { _checkMeal(); return; }
    if (act === 'guide-start') { startGuide(el.dataset.guide); return; }
    if (act === 'guide-hint') { _guideHint(); return; }
    if (act === 'guide-stop') { _stopGuide(false); return; }
    if (act === 'test') { _activateTest(el.dataset.testid); return; }
    if (act === 'read') { _doRead(); return; }
    if (act === 'label') { _doLabel(); return; }
  }

  // ── Station switch ────────────────────────────────────────────────────────────
  function _switchStation(v) {
    if (_mission || !P().SETS.station.includes(v)) return;
    if (_expWrong('station:' + v)) { _guideEvent('station:' + v); return; }
    _ttsStop();
    _station = v;
    _syncStationBtns();
    _renderShelf();
    _renderTools();
    _renderChips();
    if (!_silent) _coach(v === 'meal' ? 'Meal Builder: tap a food to place it on the plate.'
                                      : 'Teeth Lab: tap each tooth to learn what it does.');
    _guideEvent('station:' + v);
  }

  function _syncStationBtns() {
    _root.querySelectorAll('[data-set="station"]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.v === _station);
    });
  }

  // ── Food placement ────────────────────────────────────────────────────────────
  function _onFoodTap(foodId) {
    const f = P().FOODS[foodId];
    if (!f) return;
    if (_expWrong('food:' + foodId)) { _guideEvent('food:' + foodId); return; }

    if (_meal.activeTest) {
      // Test mode: record this food as tested
      const T = P().FOOD_TESTS[_meal.activeTest];
      const res = P().testResult(_meal.activeTest, foodId);
      const nutrient = T.nutrient.split(' ')[0];
      if (!_meal.testedFoods.includes(foodId)) {
        _meal.testedFoods.push(foodId);
        _log.push(f.name + ' + ' + T.short + ': ' + res.word + (res.positive ? ' - ' + nutrient + ' found.' : ' - no ' + nutrient + '.'));
      }
      _coach(f.name + ': ' + T.short + ' is ' + res.word + '. ' + T.note);
      _guideEvent('food:' + foodId);
      return;
    }

    const group = P().foodGroup(foodId);
    if (!group) return;
    const g = P().FOOD_GROUPS[group];

    if (_meal.plate[group] !== null) {
      _coach(f.name + ' is a ' + g.short + '. That section already has food!');
      return;
    }

    _meal.plate[group] = foodId;
    _log.push(f.name + ' went into ' + g.name + ': ' + g.function.toLowerCase());
    _coach(f.name + ': a ' + g.short + '. ' + g.function);
    _highlight = { type: 'group', id: group, t: 1 };

    _discover(group === 'carbs' ? 'carbs_energy'
      : group === 'protein' ? 'protein_repair'
      : group === 'fat' ? 'fat_store'
      : group === 'vitamins' ? 'vit_protect'
      : 'water_life');

    _renderShelf();
    _renderPanel();
    _guideEvent('food:' + foodId);
  }

  // ── Meal check ────────────────────────────────────────────────────────────────
  // In an experiment the See screen states the result, so no card opens here:
  // an overlay would sit on top of the runner's own next stop.
  function _checkMeal() {
    if (_expWrong('check')) { _guideEvent('check'); return; }
    _checkAnim = 1;
    if (P().isBalanced(_meal.plate)) {
      _coach(P().SAY.balanced);
      _log.push('Checked the plate: all five groups filled. Balanced!');
      _discover('balanced_plate');
      if (!_expOn()) Labs.resultCard({ icon: '✅', title: 'Balanced meal!',
        happened: () => 'Your plate has all five food groups. That is a balanced meal.',
        instead: 'Eat like this every day to stay healthy.',
        exam: '📝 In the PSAC exam: a balanced diet has food from all five groups.' });
    } else {
      const missing = P().missingGroups(_meal.plate).map(g => P().FOOD_GROUPS[g].name);
      _coach('Missing: ' + missing.join(', ') + '. Try to fill every section.');
      _log.push('Checked the plate: missing ' + missing.join(', ') + '. Not balanced.');
      if (!_expOn()) Labs.hazardCard(P().HAZARDS.missing_group, {});
    }
    _guideEvent('check');
  }

  // ── Test activation ───────────────────────────────────────────────────────────
  function _activateTest(testId) {
    const T = P().FOOD_TESTS[testId];
    if (!T) return;
    if (_expWrong('test:' + testId)) { _guideEvent('test:' + testId); return; }
    _meal.activeTest = testId;
    _meal.testedFoods = [];
    _coach('Test: ' + T.note + ' Tap a food to test it.');
    _renderTools();
    _guideEvent('test:' + testId);
  }

  // ── Tooth tap ─────────────────────────────────────────────────────────────────
  function _onToothTap(toothId) {
    const tooth = P().TEETH[toothId];
    if (!tooth) return;
    if (_expWrong('tooth:' + toothId)) { _guideEvent('tooth:' + toothId); return; }
    if (!_tappedTeeth.has(toothId)) _log.push(tooth.name + ': ' + tooth.function.toLowerCase());
    _tappedTeeth.add(toothId);
    const say = P().SAY[toothId];
    _coach(say);
    if (!calm() && !_silent) _speak(say);

    const discMap = { incisor: 'incisor_cuts', canine: 'canine_tears', premolar: 'premolar_crush', molar: 'molar_grind' };
    _discover(discMap[toothId]);
    _syncToothBtns();
    _renderChips();
    _guideEvent('tooth:' + toothId);
  }

  function _syncToothBtns() {
    _root.querySelectorAll('.lab-nutrition-tooth-btn').forEach(b => {
      const on = _tappedTeeth.has(b.dataset.tooth);
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  // ── Label action ──────────────────────────────────────────────────────────────
  function _doLabel() {
    if (_expWrong('label')) { _guideEvent('label'); return; }
    const all4 = P().TOOTH_IDS.every(t => _tappedTeeth.has(t));
    if (all4) {
      _discover('dental_health');
      _coach('All four tooth types labelled! Adults have ' + P().TOTAL_TEETH + ' teeth in total.');
      _log.push('Labelled all four tooth types. An adult has ' + P().TOTAL_TEETH + ' teeth.');
    } else {
      _discover('dental_acid');
      _coach('Fizzy drinks are acidic. They wear away tooth enamel over time.');
      _log.push('Labelled ' + _tappedTeeth.size + ' of 4 tooth types.');
    }
    _renderPanel();
    _guideEvent('label');
  }

  // ══ Guide system ════════════════════════════════════════════════════════════
  // A guide is one of P().GUIDES by id, or an ad-hoc def from the experiment
  // runner (lab_experiment.js): { exp: true, steps: [{ on | any, options,
  // wrong, say }] }. A step is met by its `on` token or any token in `any`.
  const _stepToks = s => (s ? (s.options || s.any || (s.on ? [s.on] : [])) : []);
  const _curStep = () => (_guide && _guide.steps[_guideStep]) || null;
  const _stepHit = (s, token) => !!s && (s.any ? s.any.includes(token) : s.on === token);
  const _expOn = () => !!(_guide && _guide.exp);
  // A token the current experiment step lists as WRONG is only heard: no food
  // lands, no tooth lights, no test starts - the runner's card explains why.
  const _expWrong = tok => { const s = _curStep(); return !!(_expOn() && s && s.wrong && s.wrong[tok]); };

  function startGuide(idOrDef) {
    const adhoc = typeof idOrDef === 'object' && idOrDef;
    const G = adhoc || P().GUIDES.find(g => g.id === idOrDef);
    if (!G) return;
    if (Labs.studyBegin && Labs.studyBegin('nutrition', G, () => startGuide(idOrDef))) return;
    _ttsStop();
    _mission = null;
    _guide = G; _guideStep = 0;
    // An experiment's guide runs on the bench the runner already set up - the
    // plate or the jaw IS the experiment; never move the child off it.
    if (!G.exp) {
      const first = G.steps[0];
      if (first && first.on && first.on.indexOf('station:') === 0) _switchStation(first.on.slice(8));
    }
    _guideEnter();
  }

  function _guideEnter() {
    if (Labs.studyCheckpoint) Labs.studyCheckpoint('nutrition');
    if (!_guide) return;
    const s = _curStep();
    if (!s) { _guideDone(); return; }
    _renderGuide();
    if (s.say) _coach(s.say);
    if (_guide.exp && experiment.hooks.step) experiment.hooks.step(_guideStep);
  }

  // Every bench action reports its token here. The runner hears it first, so
  // a listed wrong choice can explain itself; a hit moves the guide on.
  function _guideEvent(token) {
    if (!_guide) return;
    const s = _curStep();
    if (_guide.exp && experiment.hooks.token) experiment.hooks.token(token, s);
    if (!_stepHit(s, token)) return;
    _guideStep++;
    _ttsStop();
    _guideEnter();
  }

  function _guideDone() {
    const G = _guide;
    if (!G) return;
    if (G.exp) { _stopGuide(true); if (experiment.hooks.done) experiment.hooks.done(); return; }
    if (Labs.studyComplete) Labs.studyComplete('nutrition', G);
    _stopGuide(true);
    if (G.lesson) _coach(G.lesson);
  }

  function _stopGuide(silent) {
    _guide = null; _guideStep = 0;
    _ttsStop();
    const box = $('lab-guide');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    _highlightGuide();
    _renderPanel();
    if (!silent) _coach('Guide stopped. Pick another one below, or explore freely.');
  }

  function _guideHint() {
    _highlightGuide();
    const el = _root.querySelector('.is-next');
    if (!el) return;
    el.classList.remove('is-idle-hint');
    void el.offsetWidth;
    el.classList.add('is-idle-hint');
    el.addEventListener('animationend', () => el.classList.remove('is-idle-hint'), { once: true });
    if (!_expOn()) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // The control a token belongs to: the glow lands on it and the tests tap it.
  function _selFor(tok) {
    const i = String(tok).indexOf(':');
    const k = i > 0 ? tok.slice(0, i) : tok, v = i > 0 ? tok.slice(i + 1) : null;
    switch (k) {
      case 'food':    return `.lab-nutrition-food-btn[data-food="${v}"]`;
      case 'station': return `[data-set="station"][data-v="${v}"]`;
      case 'test':    return `[data-act="test"][data-testid="${v}"]`;
      case 'tooth':   return `.lab-nutrition-tooth-btn[data-tooth="${v}"]`;
      case 'check': case 'read': case 'label': return `[data-act="${k}"]`;
    }
    return null;
  }

  function _highlightGuide() {
    if (!_root) return;
    _root.querySelectorAll('.is-next').forEach(el => el.classList.remove('is-next'));
    _root.querySelectorAll('.is-guide-dim').forEach(el => el.classList.remove('is-guide-dim'));
    const s = _curStep();
    if (!s) return;
    const els = _stepToks(s).map(t => { const sel = _selFor(t); return sel && _root.querySelector(sel); }).filter(Boolean);
    if (!els.length) return;
    els.forEach(el => el.classList.add('is-next'));
    if (!_expOn()) els[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    const guideBox = _root.querySelector('#lab-guide');
    _root.querySelectorAll('[data-act],[data-set],.lab-nutrition-food-btn,.lab-nutrition-tooth-btn').forEach(other => {
      if (!els.some(el => other === el || el.contains(other) || other.contains(el))
          && !(guideBox && guideBox.contains(other))) {
        other.classList.add('is-guide-dim');
      }
    });
  }

  function _renderGuide() {
    const el = $('lab-guide');
    if (!el) return;
    const s = _curStep();
    if (!s) { el.hidden = true; el.innerHTML = ''; _highlightGuide(); return; }
    el.hidden = false;
    el.innerHTML = '<div class="lab-nutrition-guide-inner">'
      + '<span class="lab-nutrition-guide-title lab-guide-meta">' + esc(_guide.title) + ' · Step ' + (_guideStep + 1) + ' of ' + _guide.steps.length + '</span>'
      + '<p class="lab-guide-say">' + esc(s.say || s.ask || '') + '</p>'
      + '<div class="lab-guide-actions">'
      + '<button type="button" class="lab-guide-hint-btn" data-act="guide-hint" aria-label="Show me where to go">💡 Hint</button>'
      + '<button type="button" class="lab-nutrition-say-guide lab-coach-tip" data-act="say-guide" aria-label="Read guide aloud">🔊</button>'
      + (_guide.exp ? '' : '<button type="button" class="lab-link" data-act="guide-stop">Stop guide</button>')
      + '</div>'
      + '</div>';
    _highlightGuide();
  }

  // One token, done as if tapped. The set-up before an Aim runs through here
  // silently (experiment.apply); the free bench itself never calls it.
  function _do(token) {
    const i = String(token).indexOf(':');
    const k = i > 0 ? token.slice(0, i) : token, v = i > 0 ? token.slice(i + 1) : null;
    if (k === 'food') _onFoodTap(v);
    else if (k === 'tooth') _onToothTap(v);
    else if (k === 'station') _switchStation(v);
    else if (k === 'test') _activateTest(v);
    else if (token === 'check') _checkMeal();
    else if (token === 'read') _doRead();
    else if (token === 'label') _doLabel();
    else if (token === 'reset') { _meal = P().blankMeal(); _tappedTeeth = new Set(); _renderShelf(); _renderTools(); _renderChips(); }
  }

  function _doRead() {
    if (_expWrong('read')) { _guideEvent('read'); return; }
    if (!_meal.activeTest || !_meal.testedFoods.length) {
      _coach('Pick a food to test first.'); return;
    }
    const T = P().FOOD_TESTS[_meal.activeTest];
    const pos = _meal.testedFoods.filter(f => { const r = P().testResult(_meal.activeTest, f); return r && r.positive; });
    const names = pos.map(f => P().FOODS[f].name).join(' and ');
    _coach('Tested: ' + _meal.testedFoods.length + ' foods. ' + (pos.length ? names + ' turned ' + T.after + '.' : 'None turned ' + T.after + '.'));
    _log.push(T.short + ' on ' + _meal.testedFoods.length + ' foods: ' + (pos.length ? names + ' turned ' + T.after : 'none turned ' + T.after) + '.');
    const TEST_DISC = { iodine: 'starch_iodine', biuret: 'protein_biuret', grease: 'fat_spot' };
    if (pos.length && TEST_DISC[_meal.activeTest]) _discover(TEST_DISC[_meal.activeTest]);
    _meal.activeTest = null;
    _renderTools();
    _renderPanel();
    _guideEvent('read');
  }

  // ══ Experiments (lab_experiment.js, LAB_SPEC.md §10) ════════════════════════
  // focus(tokens): show only the controls an experiment's steps use; null shows
  // everything. Re-applied after every render of the stations, shelf and tools.
  function _applyFocus() {
    if (!_root) return;
    const on = !!_focus;
    const tokOf = b => b.dataset.food ? 'food:' + b.dataset.food
      : b.dataset.tooth ? 'tooth:' + b.dataset.tooth
      : b.dataset.set === 'station' ? 'station:' + b.dataset.v
      : b.dataset.act === 'test' ? 'test:' + b.dataset.testid
      : b.dataset.act;
    _root.querySelectorAll('.lab-nutrition-food-btn, .lab-nutrition-tooth-btn, [data-set="station"], .lab-nutrition-tools .lab-tool, [data-act="label"]')
      .forEach(b => { b.hidden = on && !_focus.has(tokOf(b)); });
    const anyShown = el => [...el.querySelectorAll('button')].some(b => !b.hidden);
    ['.lab-nutrition-stations', '#lab-nutrition-shelf', '#lab-nutrition-tools'].forEach(sel => {
      const el = _root.querySelector(sel); if (el) el.hidden = on && !anyShown(el);
    });
    const sep = _root.querySelector('.lab-nutrition-tools-sep');
    if (sep) sep.hidden = on && ![..._root.querySelectorAll('[data-act="test"]')].some(b => !b.hidden);
  }

  const experiment = {
    list: () => (P().EXPERIMENTS || []).filter(e => !e.grades || e.grades.includes(Number(Labs.grade()))),
    question: ref => {
      if (ref && typeof ref === 'object') return ref;
      const [m, i] = String(ref).split(':');
      const M = P().MISSIONS.find(x => x.id === m);
      return M ? M.quiz[Number(i)] : null;
    },
    reset: () => {
      _ttsStop();
      _resetBench();
      // A clean bench shows every control. The runner narrows it again with
      // focus([]) for an Aim; after Explore nothing must stay hidden.
      _focus = null;
      _syncStationBtns(); _renderShelf(); _renderTools(); _renderChips(); _renderPanel();
      const box = $('lab-guide'); if (box) { box.hidden = true; box.innerHTML = ''; }
      _highlightGuide();
    },
    apply: tok => { _silent = true; try { _do(tok); } finally { _silent = false; } },
    guide: def => startGuide(def),
    stop: () => _stopGuide(true),
    evidence: () => _log.slice(-6),
    focus: toks => { _focus = toks ? new Set(toks) : null; _applyFocus(); },
    selector: _selFor,
    hooks: {},
  };

  // ══ Panel rendering ══════════════════════════════════════════════════════════
  function _switchPanel(p) {
    _ttsStop();
    _panel = p;
    _renderPanel();
  }

  function _renderPanel() {
    const el = $('lab-panel');
    if (!el) return;
    _root.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.panel === _panel)));
    if (_panel === 'sandbox') _renderSandbox(el);
    else if (_panel === 'missions') _renderMissions(el);
    else _renderFound(el);
    const store = Labs.store(ID);
    const found = $('lab-found-n');
    if (found) found.textContent = (store.discoveries || []).length + '/' + P().DISCOVERIES.length;
  }

  function _renderSandbox(el) {
    const guides = P().GUIDES;
    let html = '<div class="lab-start"><p class="lab-start-q">What would you like to do?</p>'
      + '<div class="lab-start-list">';
    guides.forEach(G => {
      html += '<button type="button" class="lab-start-item" data-act="guide-start" data-guide="' + esc(G.id) + '">'
        + '<span aria-hidden="true">' + G.icon + '</span>'
        + '<span><strong>' + esc(G.title) + '</strong><br><small>' + esc(G.blurb) + '</small></span>'
        + '</button>';
    });
    html += '</div>';
    if (_log.length) {
      html += '<details class="lab-notebook"><summary>📓 Notebook (' + _log.length + ')</summary><ul class="lab-log">'
        + _log.slice(-12).map(e => '<li>' + esc(e) + '</li>').join('') + '</ul></details>';
    }
    html += '</div>';
    el.innerHTML = html;
  }

  function _renderMissions(el) {
    const store = Labs.store(ID);
    let html = '<div class="lab-missions">';
    P().MISSIONS.forEach(M => {
      const stars = ((store.missions || {})[M.id] || {}).stars || 0;
      html += '<div class="lab-mission-card">'
        + '<button type="button" class="lab-mission-start" data-act="mission-start" data-mid="' + esc(M.id) + '">'
        + M.icon + ' ' + esc(M.title) + '</button>'
        + '<p class="lab-hint">' + esc(M.blurb) + '</p>'
        + '<span class="lab-stars">' + ('⭐'.repeat(stars) || '-') + '</span>'
        + '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
    el.querySelectorAll('[data-act="mission-start"]').forEach(b => {
      b.addEventListener('click', () => _startMission(b.dataset.mid), { once: true });
    });
  }

  function _renderFound(el) {
    const store = Labs.store(ID);
    const found = new Set(store.discoveries || []);
    let html = '<div class="lab-found-list">';
    P().DISCOVERIES.forEach(D => {
      const unlocked = found.has(D.id);
      html += '<div class="lab-found-card' + (unlocked ? ' lab-found-card--found' : '') + '">'
        + '<span class="lab-found-icon" aria-hidden="true">' + D.icon + '</span>'
        + '<div>'
        + (unlocked
          ? '<strong>' + esc(D.title) + '</strong><p>' + esc(D.saw) + '</p><p>' + esc(D.learn) + '</p>'
            + '<button type="button" class="lab-btn-sm" data-act="guide-start" data-guide="' + esc(_guideForDiscovery(D.id)) + '">Do it again →</button>'
          : '<em>' + esc(D.hint) + '</em>'
            + '<button type="button" class="lab-btn-sm" data-act="guide-start" data-guide="' + esc(_guideForDiscovery(D.id)) + '">Show me how →</button>')
        + '</div></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function _guideForDiscovery(discId) {
    // Map discovery to the guide that unlocks it
    const map = {
      carbs_energy: 'balanced_meal', protein_repair: 'balanced_meal', fat_store: 'balanced_meal',
      vit_protect: 'balanced_meal', water_life: 'balanced_meal', balanced_plate: 'balanced_meal',
      starch_iodine: 'iodine_test', protein_biuret: 'iodine_test', fat_spot: 'iodine_test',
      incisor_cuts: 'label_teeth', canine_tears: 'label_teeth', premolar_crush: 'label_teeth',
      molar_grind: 'label_teeth', dental_acid: 'label_teeth', dental_health: 'label_teeth',
    };
    return map[discId] || 'balanced_meal';
  }

  // ══ Missions ════════════════════════════════════════════════════════════════
  function _startMission(mid) {
    const M = P().MISSIONS.find(m => m.id === mid);
    if (!M) return;
    _ttsStop();
    _mission = M; _missionStep = 0;
    _coach(M.intro);
    // ⚠ Same contract as every other bench: Labs.quiz(questions, { title,
    //   onDone }) and Labs.missionDone({ … }). This used to pass a third
    //   argument and a positional missionDone, so both missions could be
    //   played but never saved a star.
    Labs.quiz(M.quiz, { title: M.title, onDone: r => {
      const s = r.firstTry >= r.total - 1 ? 3 : r.firstTry >= r.total - 2 ? 2 : 1;
      const st = Labs.store(ID);
      const prev = st.missions[mid] || {};
      st.missions[mid] = { stars: Math.max(prev.stars || 0, s), last: s, at: Date.now() };
      Labs.persist();
      const lines = s === 3 ? ['Every food group and every tooth in the right place. 🥗']
        : [`${r.total - r.firstTry} to look at again. All but one right first time earns three stars.`];
      Labs.missionDone({ icon: M.icon, title: M.title, stars: s, score: r.firstTry, total: r.total, lines,
        onAgain: () => _startMission(mid),
        onClose: () => { _mission = null; _renderPanel(); } });
    } });
  }

  // ══ Chips (tooth label chips) ════════════════════════════════════════════════
  function _renderChips() {
    const el = $('lab-nutrition-chips');
    if (!el || _station !== 'teeth') { if (el) el.innerHTML = ''; return; }
    el.innerHTML = [..._tappedTeeth].map(t => {
      const tooth = P().TEETH[t];
      return '<span class="lab-chip lab-nutrition-tooth-chip">' + esc(tooth.name) + ' - ' + esc(tooth.function) + '</span>';
    }).join('');
  }

  // ══ Shelf ════════════════════════════════════════════════════════════════════
  function _renderShelf() {
    const el = $('lab-nutrition-shelf');
    if (!el) return;
    if (_station === 'meal') {
      const shelf = P().SHELF_FOODS;
      el.innerHTML = '<div class="lab-nutrition-food-row" role="group" aria-label="Foods">'
        + shelf.map(fid => {
          const f = P().FOODS[fid];
          const placed = P().GROUP_IDS.some(g => _meal.plate[g] === fid);
          return '<button type="button" class="lab-nutrition-food-btn lab-nutrition-food-item'
            + (placed ? ' lab-nutrition-food-placed' : '') + '"'
            + ' data-food="' + esc(fid) + '" aria-label="' + esc(f.name) + '"'
            + (placed ? ' aria-disabled="true"' : '') + '>'
            + '<span aria-hidden="true">' + f.icon + '</span>'
            + '<span class="lab-nutrition-food-name">' + esc(f.name) + '</span>'
            + '</button>';
        }).join('')
        + '</div>';
      el.querySelectorAll('.lab-nutrition-food-btn:not(.lab-nutrition-food-placed)').forEach(btn => _wireFoodDrag(btn));
    } else {
      // Teeth station: one named button per tooth type under the jaw. Tapping
      // a tooth on the canvas does the same thing (_onCanvasClick).
      el.innerHTML = '<div class="lab-nutrition-tooth-row" role="group" aria-label="Tooth types">'
        + P().TOOTH_IDS.map(type => {
          const tooth = P().TEETH[type], on = _tappedTeeth.has(type);
          return '<button type="button" class="lab-nutrition-tooth-btn' + (on ? ' is-on' : '') + '" data-tooth="' + esc(type) + '"'
            + ' aria-pressed="' + on + '">🦷 ' + esc(tooth.name) + '</button>';
        }).join('')
        + '<button type="button" class="lab-btn lab-nutrition-label-btn" data-act="label">🏷️ Label teeth</button>'
        + '</div>';
      _renderChips();
    }
    _applyFocus();
  }

  // ══ Tools (check button + test dropper) ═════════════════════════════════════
  function _renderTools() {
    const el = $('lab-nutrition-tools');
    if (!el) return;
    if (_station === 'meal') {
      let html = '<button type="button" class="lab-tool lab-nutrition-check" data-act="check">✅ Check my meal</button>';
      html += '<span class="lab-nutrition-tools-sep">Tests:</span>';
      P().TEST_IDS.forEach(tid => {
        const T = P().FOOD_TESTS[tid];
        const active = _meal.activeTest === tid;
        html += '<button type="button" class="lab-tool' + (active ? ' is-active' : '') + '" data-act="test" data-testid="' + esc(tid) + '">'
          + esc(T.short) + '</button>';
      });
      if (_meal.activeTest) {
        html += '<button type="button" class="lab-tool" data-act="read">🔎 Read</button>';
      }
      el.innerHTML = html;
    } else {
      el.innerHTML = '';
    }
    _applyFocus();
  }

  // ══ Coach and TTS ════════════════════════════════════════════════════════════
  function _coach(text) {
    const el = $('lab-coach-text');
    if (el) el.textContent = text;
    _talking = false;
  }

  function _sayCoach() {
    const el = $('lab-coach-text');
    if (el) _speak(el.textContent);
  }

  function _sayGuide() {
    const el = $('lab-guide');
    if (el) _speak(el.innerText.replace(/[🔊→]/g, ''));
  }

  function _speak(text) {
    if (!window.speechSynthesis || !text || _silent) return;
    _ttsStop();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB'; utt.rate = 0.9;
    _talking = true;
    utt.onend = () => { _talking = false; };
    window.speechSynthesis.speak(utt);
  }

  function _ttsStop() {
    if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    _talking = false;
  }

  // ══ Tip / welcome ════════════════════════════════════════════════════════════
  function _showTip() {
    _tipIdx = (_tipIdx + 1) % P().FACTS.length;
    _coach(P().FACTS[_tipIdx]);
  }

  function _showHelp() {
    Labs.overlay(
      '<h2 id="lab-ov-title">🥦 Food Groups &amp; Teeth</h2>'
      + '<p>There are two stations:</p>'
      + '<ul><li><strong>Meal Builder</strong> - tap (or drag) foods to fill the plate. Get all five groups for a balanced meal. Use the test droppers to test foods.</li>'
      + '<li><strong>Teeth Lab</strong> - tap each tooth in the diagram to learn its name and job.</li></ul>'
      + '<p>Try a guided experiment to get started!</p>'
      + '<div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Got it</button></div>'
    );
  }

  function _intro() {
    Labs.overlay(
      '<div class="lab-intro">'
      + '<p class="lab-done-icon" aria-hidden="true">🥦</p>'
      + '<h2 id="lab-ov-title">Food Groups &amp; Teeth</h2>'
      + '<p>Two stations to explore:</p>'
      + '<ul class="lab-intro-list">'
      + '<li><strong>Meal Builder</strong> - place one food from each group on the plate.</li>'
      + '<li><strong>Teeth Lab</strong> - tap each tooth to learn its name and job.</li>'
      + '</ul>'
      + '</div>'
      + '<div class="lab-ov-actions">'
      + '<button type="button" class="lab-btn" data-ov-close>I\'ll explore on my own</button>'
      + '<button type="button" class="lab-btn lab-btn-primary" data-ov-close data-act="guide-start" data-guide="balanced_meal" data-autofocus>Show me how →</button>'
      + '</div>',
      { cls: 'is-intro', onClose: () => { Labs.store(ID).intro = true; Labs.persist(ID); } }
    );
  }

  // ── Food drag-and-drop (Meal Builder) ───────────────────────────────────────
  function _wireFoodDrag(btn) {
    const foodId = btn.dataset.food;
    let ghost = null, offX = 0, offY = 0;

    function onMove(e) {
      if (!ghost) return;
      e.preventDefault();
      ghost.style.left = (e.clientX - offX) + 'px';
      ghost.style.top  = (e.clientY - offY) + 'px';
      const cvr = _cv ? _cv.getBoundingClientRect() : null;
      const over = !!(cvr &&
        e.clientX >= cvr.left && e.clientX <= cvr.right &&
        e.clientY >= cvr.top  && e.clientY <= cvr.bottom);
      if (_draggingOver !== over) _draggingOver = over;
    }

    function onEnd(e) {
      btn.removeEventListener('pointermove', onMove);
      if (ghost) { ghost.remove(); ghost = null; }
      btn.classList.remove('is-dragging');
      const wasOver = _draggingOver;
      _draggingOver = false;
      if (wasOver) _onFoodTap(foodId);
    }

    btn.addEventListener('pointerdown', e => {
      if (_station !== 'meal') return;
      if (btn.classList.contains('lab-nutrition-food-placed')) return;
      e.preventDefault();
      const rect = btn.getBoundingClientRect();
      offX = e.clientX - rect.left;
      offY = e.clientY - rect.top;
      ghost = btn.cloneNode(true);
      ghost.classList.add('is-ghost');
      ghost.removeAttribute('id');
      ghost.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;margin:0;'
        + 'left:' + rect.left + 'px;top:' + rect.top + 'px;'
        + 'width:' + rect.width + 'px;height:' + rect.height + 'px;';
      document.body.appendChild(ghost);
      btn.classList.add('is-dragging');
      btn.setPointerCapture(e.pointerId);
      btn.addEventListener('pointermove', onMove, { passive: false });
      btn.addEventListener('pointerup',      onEnd, { once: true });
      btn.addEventListener('pointercancel',  onEnd, { once: true });
    });
  }

  // ══ Discovery helper ═════════════════════════════════════════════════════════
  function _discover(discId) {
    const D = P().DISCOVERIES.find(d => d.id === discId);
    if (!D || _silent) return;
    Labs.discover(ID, discId, { title: D.title, total: P().DISCOVERIES.length });
    _renderPanel();
  }

  // ══ Test hooks ═══════════════════════════════════════════════════════════════
  function _test(opts) {
    _instant = !!(opts && opts.instant);
  }

  function _tick(seconds) {
    // No time-based simulation; no-op but required by spec
  }

  function _debug() {
    return {
      station: _station,
      plate: Object.assign({}, _meal.plate),
      tappedTeeth: [..._tappedTeeth],
      guide: _guide ? _guide.id : null,
      guideStep: _guideStep,
      exp: _expOn(),
      focus: _focus ? [..._focus] : null,
      activeTest: _meal.activeTest,
      testedFoods: _meal.testedFoods.slice(),
      panel: _panel,
      log: _log.slice(),
    };
  }


  // Explicit persistence boundary: no DOM nodes, timers, listeners or canvas contexts.
  const study = {
    guides: () => P().GUIDES,
    start: startGuide,
    snapshot: () => _busy ? null : ({ _station, _meal, _tappedTeeth, _guide, _guideStep, _panel, _log }),
    restore: state => { ({ _station, _meal, _tappedTeeth, _guide, _guideStep, _panel, _log } = state); },
    refresh: () => { if (_guide) _renderGuide(); },
    stop: () => _stopGuide(true),
  };
  return { study, experiment, mount, unmount, startGuide, _test, _tick, _debug };
})();
if (typeof window !== 'undefined') window.LabNutrition = LabNutrition;
