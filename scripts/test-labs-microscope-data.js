'use strict';
// Science Labs: the biology and maths the Microscope is allowed to show.
//
// The bench draws whatever engine/labs/lab_microscope_data.js says, so a
// mistake in that file is a mistake taught to a child. This checks what can be
// checked mechanically: total magnification is eyepiece × objective; the focus
// model behaves like a real microscope (low power first is safe, the coarse
// knob at high power loses the image or cracks the slide, the fine focus
// finishes the job); every magnification sum - both ways, with the mm ↔ µm
// conversion, including the paper's ×15 000 and ×8000 shapes - comes out
// right; the cell sizes are real; the smear puts the right cell under the
// pointer; every discovery recipe is valid and leads to its own discovery; and
// every card and quiz is complete.
//
// Run: node scripts/test-labs-microscope-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_microscope_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_microscope.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabMicroscopeData = LabMicroscopeData;', ctx);
const D = ctx.LabMicroscopeData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));

console.log('\nTotal magnification = eyepiece × objective');
const products = {};
D.EYEPIECES.forEach(e => D.OBJECTIVES.forEach(o => { products[e + 'x' + o] = D.total(e, o); }));
ok('every eyepiece × objective pair is the product', Object.entries(products).every(([k, v]) => { const [e, o] = k.split('x').map(Number); return v === e * o; }), products);
ok('×10 × ×4 = ×40, ×10 × ×10 = ×100, ×10 × ×40 = ×400', D.total(10, 4) === 40 && D.total(10, 10) === 100 && D.total(10, 40) === 400);
ok('×15 × ×4 = ×60 and ×15 × ×40 = ×600', D.total(15, 4) === 60 && D.total(15, 40) === 600);
ok('the objectives are the school set: ×4, ×10, ×40', D.OBJECTIVES.join() === '4,10,40');
ok('a stronger objective shows a smaller field of view', D.fieldOfViewMm(10, 4) > D.fieldOfViewMm(10, 10) && D.fieldOfViewMm(10, 10) > D.fieldOfViewMm(10, 40));
ok('field of view at ×40 is 4.5 mm and at ×400 is 0.45 mm (the numbers the discovery quotes)',
   near(D.fieldOfViewMm(10, 4), 4.5) && near(D.fieldOfViewMm(10, 40), 0.45)
   && /4\.5 mm/.test(D.DISCOVERIES.find(d => d.id === 'smaller_field').learn) && /0\.45 mm/.test(D.DISCOVERIES.find(d => d.id === 'smaller_field').learn));
ok('the picture is enlarged more at higher power', D.viewUm(10, 40) < D.viewUm(10, 10) && D.viewUm(10, 10) < D.viewUm(10, 4));

console.log('\nFocusing like a real microscope');
const Z = D;
const all5 = [Z.Z_START, Z.COARSE, Z.FINE, ...Object.values(Z.FOCUS_AT), ...D.OBJECTIVES.map(Z.lowerTo)].every(n => n % 5 === 0);
ok('every knob position is a whole number of fine steps (the image can land exactly sharp)', all5);
ok('each objective is sharp at its focus point, with room to spare above the slide',
   D.OBJECTIVES.every(o => Z.focusWord(Z.FOCUS_AT[o], o) === 'sharp' && Z.clearance(Z.FOCUS_AT[o], o) > 0));
ok('the high-power lens sits closest to the slide and has the least depth of focus',
   Z.WORK_DIST[40] < Z.WORK_DIST[10] && Z.WORK_DIST[10] < Z.WORK_DIST[4] && Z.DEPTH[40] < Z.DEPTH[10] && Z.DEPTH[10] < Z.DEPTH[4]);
ok('“lower it, watching from the side” leaves the lens just above the slide at every power',
   D.OBJECTIVES.every(o => Z.clearance(Z.lowerTo(o), o) === Z.LOWER_GAP));
for (const o of [4, 10]) {
  let z = Z.lowerTo(o), coarse = 0, fine = 0;
  while (!['near', 'sharp'].includes(Z.focusWord(z, o)) && coarse < 20) { z += Z.COARSE; coarse++; }
  const nearAfterCoarse = Z.focusWord(z, o);
  while (Z.focusWord(z, o) !== 'sharp' && fine < 20) { z += Z.FINE; fine++; }
  ok(`×${o}: from “lowered”, coarse UP finds the image (${coarse} turns), fine focus makes it sharp (${fine} turns)`,
     coarse >= 1 && coarse <= 4 && nearAfterCoarse === 'near' && fine >= 1 && fine <= 4 && Z.clearance(z, o) > 0, { coarse, fine, nearAfterCoarse });
  ok(`×${o}: after lowering, turning the coarse knob DOWN cracks the slide`, Z.clearance(Z.lowerTo(o) - Z.COARSE, o) <= 0);
}
ok('switching ×4 → ×10 from a sharp image: still sharp (the objectives are parfocal)', Z.focusWord(Z.FOCUS_AT[4], 10) === 'sharp');
ok('switching ×4 → ×40 from a sharp image: nearly sharp, lens clear of the slide', Z.focusWord(Z.FOCUS_AT[4], 40) === 'near' && Z.clearance(Z.FOCUS_AT[4], 40) > 0);
ok('…one turn of the FINE focus up makes it sharp', Z.focusWord(Z.FOCUS_AT[4] + Z.FINE, 40) === 'sharp');
ok('at high power the COARSE knob up loses the image; down cracks the slide',
   !['near', 'sharp'].includes(Z.focusWord(Z.FOCUS_AT[40] + Z.COARSE, 40)) && Z.clearance(Z.FOCUS_AT[40] - Z.COARSE, 40) <= 0);
ok('starting on high power and lowering the lens watching from the side, one coarse turn down cracks it',
   Z.clearance(Z.lowerTo(40) - Z.COARSE, 40) <= 0);
ok('swinging ×40 in while the stage is set for a lowered ×4 hits the slide', Z.clearance(Z.lowerTo(4), 40) <= 0);

console.log('\nLight');
ok('the lamp is brighter than a mirror, and off is dark', D.LIGHTS.lamp.level > D.LIGHTS.mirror.level && D.LIGHTS.off.level === 0);
ok('high power is dimmer than low power with the same light', D.brightness('lamp', 'mid', 40) < D.brightness('lamp', 'mid', 4));
ok('at ×400 a nearly closed diaphragm is too dark; wide open is not',
   D.brightness('lamp', 'narrow', 40) < D.DARK_BELOW && D.brightness('lamp', 'wide', 40) >= D.DARK_BELOW);
ok('a half-open diaphragm is bright enough everywhere with the lamp or the mirror',
   D.OBJECTIVES.every(o => D.brightness('lamp', 'mid', o) >= D.DARK_BELOW && D.brightness('mirror', 'mid', o) >= D.DARK_BELOW));

console.log('\nBlood cells');
const C = D.CELLS;
ok('a red blood cell is 7-8 µm across', C.rbc.sizeUm >= 7 && C.rbc.sizeUm <= 8 && /7-8 µm/.test(C.rbc.range));
ok('white cells are bigger than red cells; a lymphocyte is smaller than a phagocyte', C.phago.sizeUm > C.rbc.sizeUm && C.lympho.sizeUm >= C.rbc.sizeUm && C.lympho.sizeUm < C.phago.sizeUm);
ok('platelets are the smallest, 2-3 µm, and have no nucleus', C.platelet.sizeUm >= 2 && C.platelet.sizeUm <= 3 && C.platelet.nucleus === 'none');
ok('red cells have no nucleus; a phagocyte’s is lobed; a lymphocyte’s is large and round',
   C.rbc.nucleus === 'none' && C.phago.nucleus === 'lobed' && C.lympho.nucleus === 'round' && /biconcave/.test(C.rbc.look));
ok('each cell’s job is the textbook one', /oxygen/.test(C.rbc.job) && /haemoglobin/.test(C.rbc.job) && /engulf/i.test(C.phago.job)
   && /antibod/.test(C.lympho.job) && /clot/.test(C.platelet.job));
ok('plasma is described as the liquid part', /liquid/.test(D.PLASMA) && /pale yellow/.test(D.PLASMA));

console.log('\nThe smear under the pointer');
ok('the grid has a pointer cell for every field', (() => { for (let x = D.FIELD_X[0]; x <= D.FIELD_X[1]; x++) for (let y = D.FIELD_Y[0]; y <= D.FIELD_Y[1]; y++) if (!D.POINTER[x + ',' + y]) return false; return true; })());
ok('every kind of cell can be found somewhere on the slide', D.CELL_IDS.every(id => Object.values(D.POINTER).includes(id)));
ok('red cells outnumber every other kind under the pointer', (() => { const n = {}; Object.values(D.POINTER).forEach(t => n[t] = (n[t] || 0) + 1); return D.CELL_IDS.every(t => t === 'rbc' || n.rbc > n[t]); })());
ok('the centre field is a red cell; left → phagocyte, right → lymphocyte, up → platelet (the recipes rely on it)',
   D.under({ x: 0, y: 0 }) === 'rbc' && D.under(D.move({ x: 0, y: 0 }, 'left')) === 'phago'
   && D.under(D.move({ x: 0, y: 0 }, 'right')) === 'lympho' && D.under(D.move({ x: 0, y: 0 }, 'up')) === 'platelet');
ok('moving the slide stops at the edge of the smear', D.move({ x: 2, y: 0 }, 'left').edge === true);
const fc = D.fieldCells(1, 0), fc2 = D.fieldCells(1, 0);
ok('the smear is the same every time (deterministic)', JSON.stringify(fc) === JSON.stringify(fc2));
let overlapBad = [];
for (let x = -2; x <= 2; x++) for (let y = -1; y <= 1; y++) {
  const cells = D.fieldCells(x, y), mid = D.POINTER[x + ',' + y];
  const c0 = cells.find(c => c.x === 0 && c.y === 0);
  if (mid === 'gap' ? !!c0 : !(c0 && c0.type === mid)) overlapBad.push(x + ',' + y + ' centre');
  if (c0) cells.forEach(c => { if (c !== c0 && Math.hypot(c.x, c.y) < (C[c.type].sizeUm + C[c0.type].sizeUm) / 2) overlapBad.push(x + ',' + y + ' overlaps'); });
  if (mid === 'gap' && cells.some(c => Math.hypot(c.x, c.y) < 8)) overlapBad.push(x + ',' + y + ' gap not clear');
}
ok('the pointer cell sits alone at the centre of its field, never covered by a neighbour', overlapBad.length === 0, overlapBad);

console.log('\nMagnification = image size ÷ actual size (1 mm = 1000 µm)');
ok('1 mm = 1000 µm, both ways', D.UM_PER_MM === 1000 && D.mmToUm(1) === 1000 && D.umToMm(8) === 0.008 && D.mmToUm(0.002) === 2);
ok('red cell drawn 60 mm, real 8 µm: 60 ÷ 0.008 = ×7500', D.magnification(60, 8) === 7500);
ok('phagocyte drawn 36 mm, real 12 µm: ×3000', D.magnification(36, 12) === 3000);
ok('the paper’s ×15 000 case: a 30 mm drawing is 30 ÷ 15 000 = 0.002 mm = 2 µm', D.actualMm(30, 15000) === 0.002 && D.actualUm(30, 15000) === 2);
ok('another ×15 000 case: 45 mm → 0.003 mm = 3 µm', D.actualMm(45, 15000) === 0.003 && D.actualUm(45, 15000) === 3);
ok('the 2024 ×8000 case: 40 mm → 0.005 mm (the mark scheme’s example); 80 mm → 0.01 mm', D.actualMm(40, 8000) === 0.005 && D.actualMm(80, 8000) === 0.01);
ok('the question bank’s cases agree: 58 mm ÷ 0.0058 mm = 10 000; 45 mm, 9 µm = ×5000; 36 mm, 9 µm = ×4000',
   D.magnification(58, 5.8) === 10000 && D.magnification(45, 9) === 5000 && D.magnification(36, 9) === 4000);
ok('both directions agree: image = actual × magnification', D.imageMm(8, 7500) === 60 && D.imageMm(2, 15000) === 30);
ok('numbers are written the way the working is: 7500, 15 000, 0.002', D.fmt(7500) === '7500' && D.fmt(15000) === '15 000' && D.fmt(0.002) === '0.002' && D.fmt(450000) === '450 000');

console.log('\nThe printed figures');
ok('four figures: two find-the-magnification, two find-the-actual-size', D.FIGURES.length === 4
   && D.FIGURES.filter(f => f.mode === 'findM').length === 2 && D.FIGURES.filter(f => f.mode === 'findActual').length === 2);
for (const f of D.FIGURES) {
  const realUm = f.mode === 'findM' ? f.actualUm : D.actualUm(f.imageMm, f.mag);
  ok(`${f.title}: its real size is the cell’s real size (${realUm} µm)`, realUm === C[f.cell].sizeUm, realUm);
  ok(`${f.title}: the ruler is longer than the drawing, and the inner part smaller than the cell`,
     D.rulerLen(f) > f.imageMm && (f.innerMm === null || f.innerMm < f.imageMm) && f.eyeMm !== f.imageMm);
  const right = D.work(f, { ruler: 'cell', converted: f.mode === 'findM' || f.askUnit === 'µm', op: 'divide' });
  ok(`${f.title}: measured, converted where needed, divided → ${right.shown}, correct`, right.correct && right.error === null, right);
}
const rbc = D.figure('rbc'), pl = D.figure('platelet'), ly = D.figure('lympho');
const noConv = D.work(rbc, { ruler: 'cell', converted: false, op: 'divide' });
ok('no conversion on the red cell: ×7.5, exactly 1000 times too small, flagged no_convert', noConv.error === 'no_convert' && noConv.value === 7.5 && near(noConv.value * 1000, noConv.right));
const noConvP = D.work(pl, { ruler: 'cell', converted: false, op: 'divide' });
ok('platelet answer left in mm when µm was asked: 0.002 “µm” is 1000 times too small, flagged no_convert', noConvP.error === 'no_convert' && near(noConvP.value * 1000, noConvP.right) && noConvP.unit === 'mm');
const ly1 = D.work(ly, { ruler: 'cell', converted: false, op: 'divide' });
ok('lymphocyte ×8000, asked in mm: no conversion needed - 0.01 mm is correct', ly1.correct && ly1.shown === '0.01 mm');
const wd = D.work(rbc, { ruler: 'inner', converted: true, op: 'divide' });
ok('measuring the pale centre instead of the whole cell is flagged wrong_dim (×3000, not ×7500)', wd.error === 'wrong_dim' && wd.value === 3000);
const be = D.work(rbc, { ruler: 'eye', converted: true, op: 'divide' });
ok('guessing by eye is flagged by_eye', be.error === 'by_eye' && be.value !== be.right);
const mu = D.work(pl, { ruler: 'cell', converted: false, op: 'multiply' });
ok('multiplying by the magnification is flagged multiply (a 450 m platelet)', mu.error === 'multiply' && mu.value === 450000);
const wl = D.workLines(pl, { ruler: 'cell', converted: true, op: 'divide' }).join(' | ');
ok('the working is written out: image, ÷ magnification, × 1000', /Image size = 30 mm/.test(wl) && /30 ÷ 15 000 = 0\.002 mm/.test(wl) && /0\.002 × 1000 = 2 µm/.test(wl), wl);
const wl2 = D.workLines(rbc, { ruler: 'cell', converted: true, op: 'divide' }).join(' | ');
ok('…and for a magnification: 8 µm = 0.008 mm, 60 ÷ 0.008 = ×7500', /8 µm = 8 ÷ 1000 = 0\.008 mm/.test(wl2) && /60 ÷ 0\.008 = ×7500/.test(wl2), wl2);
ok('the notebook drawings have whole-number magnifications', Object.keys(D.DRAW).every(k => Number.isInteger(D.magnification(D.DRAW[k].widthMm, C[k].sizeUm))));
ok('a red cell drawn 40 mm wide is ×5000 (the drawing discovery’s rule)', D.magnification(D.DRAW.rbc.widthMm, C.rbc.sizeUm) === 5000
   && /×5000/.test(D.DISCOVERIES.find(d => d.id === 'drawing').formula));

console.log('\nDiscoveries');
const ids = D.DISCOVERIES.map(d => d.id);
ok('at least 12 discoveries, ids unique', ids.length >= 12 && new Set(ids).size === ids.length, ids.length);
const SETS = { rig: ['scope', 'measure'], slide: Object.keys(D.SLIDES), light: Object.keys(D.LIGHTS), diaphragm: Object.keys(D.DIAPHRAGM),
  eye: D.EYEPIECES.map(String), obj: D.OBJECTIVES.map(String), coarse: ['up', 'down'], fine: ['up', 'down'], focus: ['near', 'sharp'],
  move: Object.keys(D.MOVES), id: D.CELL_IDS, fig: D.FIGURES.map(f => f.id), ruler: ['cell', 'inner', 'eye'] };
const ACTS = ['clips', 'lower', 'draw', 'convert', 'divide', 'multiply', 'answer'];
const tokenOk = on => { const [k, v] = on.split(':'); return v !== undefined ? !!SETS[k] && SETS[k].includes(v) : ACTS.includes(k); };
const bad = D.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe or guide ever takes a dangerous step', D.DISCOVERIES.map(d => d.how).concat(D.GUIDES.map(G => G.steps.map(s => s.on)))
   .every(h => !h.some(t => ['prick', 'sun', 'coarse:down', 'multiply'].includes(t))));

// A small model of the bench, run through each recipe with the data functions.
function runRecipe(how) {
  const s = { slide: null, clipped: false, light: 'off', diaph: 'mid', eye: 10, obj: 10, z: D.Z_START, pos: { x: 0, y: 0 } };
  let w = { fig: 'rbc', ruler: null, converted: false, op: null };
  const found = new Set(), cards = [];
  const V = () => D.view(s);
  const disc = (prev, tok) => D.scopeDiscoveries(prev, V(), tok).forEach(x => found.add(x));
  const knob = (k, dir) => {
    const nz = D.clampZ(s.z + (dir === 'up' ? 1 : -1) * (k === 'coarse' ? D.COARSE : D.FINE));
    if (s.slide && D.clearance(nz, s.obj) <= 0) { cards.push('crack'); return; }
    const prev = V(); s.z = nz;
    if (k === 'coarse' && s.obj === 40 && prev.seen && !V().seen) cards.push('lost_image');
    disc(prev, k + ':' + dir);
  };
  for (const t of how) {
    if (cards.length) break;
    const [k, v] = t.split(':');
    const prev = V();
    if (k === 'focus') {
      for (let n = 0; n < 40 && !(v === 'sharp' ? V().sharp : V().seen) && !cards.length; n++) {
        if (!V().visible) { cards.push('dark'); break; }
        knob(v === 'near' ? 'coarse' : 'fine', s.z < D.FOCUS_AT[s.obj] ? 'up' : 'down');
      }
      continue;
    }
    if (k === 'coarse' || k === 'fine') { knob(k, v); continue; }
    if (k === 'slide') { s.slide = v; s.clipped = false; s.z = D.Z_START; s.pos = { x: 0, y: 0 }; }
    else if (k === 'clips') s.clipped = !!s.slide;
    else if (k === 'light') s.light = v; else if (k === 'diaphragm') s.diaph = v; else if (k === 'eye') s.eye = +v;
    else if (k === 'obj') { if (s.slide && D.clearance(s.z, +v) <= 0) { cards.push('crack'); continue; } s.obj = +v; }
    else if (k === 'lower') { if (s.slide && s.z > D.lowerTo(s.obj)) s.z = D.lowerTo(s.obj); }
    else if (k === 'move') { const r = D.move(s.pos, v); s.pos = { x: r.x, y: r.y }; }
    else if (k === 'id') { const r = D.identify(V(), v); if (r.ok) found.add(v); else cards.push('id:' + r.why); }
    else if (k === 'draw') { const r = D.identify(V(), V().under); if (r.ok) found.add('drawing'); else cards.push('draw:' + r.why); }
    else if (k === 'fig') w = { fig: v, ruler: null, converted: false, op: null };
    else if (k === 'ruler') w = { fig: w.fig, ruler: v, converted: false, op: null };
    else if (k === 'convert') w.converted = true;
    else if (k === 'divide' || k === 'multiply') w.op = k;
    else if (k === 'answer') { const f = D.figure(w.fig), r = D.work(f, w); if (r.correct) D.measureDiscoveries(f, r).forEach(x => found.add(x)); else cards.push(r.error); }
    if (['slide', 'clips', 'light', 'diaphragm', 'eye', 'obj', 'lower', 'move'].includes(k)) disc(prev, t);
  }
  return { found, cards };
}
const unsolved = D.DISCOVERIES.map(d => ({ d, r: runRecipe(d.how) })).filter(x => !x.r.found.has(x.d.id) || x.r.cards.length)
  .map(x => x.d.id + ' -> found ' + [...x.r.found].join('/') + (x.r.cards.length ? ' cards ' + x.r.cards.join('/') : ''));
ok('every recipe leads to its own discovery with no mistake on the way', unsolved.length === 0, unsolved);
const reachable = new Set();
D.DISCOVERIES.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => ids.includes(x)), [...reachable].filter(x => !ids.includes(x)));
ok('the bench names the discovery it unlocks outside the data functions', bench.includes("_discover('drawing')"));
ok('the mistakes really are mistakes in the model: high power first + coarse down cracks; skipping the conversion is caught',
   runRecipe(['slide:blood', 'clips', 'light:lamp', 'obj:40', 'lower', 'coarse:down']).cards[0] === 'crack'
   && runRecipe(['rig:measure', 'fig:rbc', 'ruler:cell', 'divide', 'answer']).cards[0] === 'no_convert'
   && runRecipe([...['rig:scope', 'slide:blood', 'clips', 'light:lamp', 'obj:4', 'lower', 'focus:near', 'focus:sharp', 'obj:40', 'focus:sharp'], 'coarse:up']).cards[0] === 'lost_image');

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', D.GUIDES.length >= 3 && new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  const r = runRecipe(G.steps.map(s => s.on));
  ok(`${G.title}: ends with what they found out, and runs with no mistake`, !!(G.lesson && G.blurb && G.icon) && r.cards.length === 0, r.cards);
}
ok('a guide starts on low power and focuses upwards', (() => { const s = D.GUIDES[0].steps.map(x => x.on); return s.indexOf('obj:4') < s.indexOf('lower') && s.indexOf('lower') < s.indexOf('focus:near'); })());
ok('the ×15 000 paper question is a guide', D.GUIDES.some(G => G.steps.some(s => s.on === 'fig:platelet')));

console.log('\nMissions');
ok('at least 2 missions', D.MISSIONS.length >= 2);
const firstNum = s => { const m = /[\d][\d\s]*\.?\d*/.exec(String(s)); return m ? +m[0].replace(/\s/g, '') : NaN; };
for (const Ms of D.MISSIONS) {
  const badQ = Ms.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${Ms.title}: ${Ms.quiz.length} questions, each with 4 distinct options and a reason`, Ms.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(`${Ms.title}: has a goal, a blurb and a bench`, !!(Ms.intro && Ms.blurb && Ms.icon && (Ms.rig === 'scope' || Ms.rig === 'measure')));
  for (const q of Ms.quiz.filter(x => x.calc)) {
    const c = q.calc;
    const want = c.kind === 'total' ? D.total(c.eye, c.obj) : c.kind === 'mag' ? D.magnification(c.imageMm, c.actualUm)
      : c.kind === 'actualMm' ? D.actualMm(c.imageMm, c.mag) : D.UM_PER_MM;
    ok(`“${q.q.slice(0, 60)}…”: the first option (${q.options[0]}) is the computed answer, ${want}`, near(firstNum(q.options[0]), want) && near(c.answer, want), { opt: q.options[0], want });
  }
}
ok('the magnification mission quotes the paper references', (() => { const q = D.MISSIONS.find(m => m.id === 'mag').quiz.map(x => x.why).join(' '); return /2023 Q5\(a\)/.test(q) && /2024 Q4\(e\)\(ii\)/.test(q); })());
ok('the magnification mission includes a ×15 000 calculation', D.MISSIONS.find(m => m.id === 'mag').quiz.some(q => q.calc && q.calc.mag === 15000));
ok('the cells mission needs all four kinds', D.MISSIONS.find(m => m.id === 'cells').need.join() === D.CELL_IDS.join());
ok('the magnification mission needs a find-M and the ×15 000 figure', D.MISSIONS.find(m => m.id === 'mag').need.map(D.figure).some(f => f.mode === 'findM')
   && D.MISSIONS.find(m => m.id === 'mag').need.map(D.figure).some(f => f.mag === 15000));

console.log('\nHazards, result cards and facts');
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard'];
const hctx = { knob: 'coarse', obj: 40 };
for (const [id, H] of Object.entries(D.HAZARDS)) {
  ok(`hazard ${id}: real signs, what happened, why, what to do instead and the exam point`,
     H.signs.length && H.signs.every(s => SIGNS.includes(s)) && H.title(hctx) && H.happened(hctx) && H.why && H.instead && H.exam);
}
ok('blood is a BIOHAZARD, direct sunlight an EYE hazard, the cracked slide a warning', D.HAZARDS.blood.signs.includes('biohazard') && D.HAZARDS.sun.signs.includes('eye') && D.HAZARDS.crack.signs.length > 0);
ok('the crack card tells you to start on low power and focus away from the slide', /LOW-power/.test(D.HAZARDS.crack.instead) && /UP, away from the slide/.test(D.HAZARDS.crack.instead));
ok('the crack card works for the nosepiece too', /swung the ×40/.test(D.HAZARDS.crack.happened({ knob: 'nosepiece', obj: 40 })));
ok('the blood card is factual: prepared sterile slides, never share lancets', /prepared/.test(D.HAZARDS.blood.instead) && /sterile/.test(D.HAZARDS.blood.instead) && /share/.test(D.HAZARDS.blood.instead));
const rctx = { mode: 'findM', image: '60', actual: '8', mag: '15 000', mm: '0.002', shown: '×7.5', rightShown: '×7500', innerName: 'the pale centre', inner: '24', eye: '50', wrongMm: '450 000', metres: '450', total: 400 };
for (const [id, R] of Object.entries(D.RESULTS)) {
  const txt = R.happened(rctx) + R.happened(Object.assign({}, rctx, { mode: 'findActual' }));
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && R.title && txt && !/undefined/.test(txt) && R.instead && R.exam));
}
ok('the no-conversion card shows the ×1000 error', /1000 times too small/.test(D.RESULTS.no_convert.happened(rctx)) && /1 mm = 1000 µm/.test(D.RESULTS.no_convert.instead));
const used = id => bench.includes(`'${id}'`) || bench.includes(`RESULTS.${id}`) || bench.includes(`HAZARDS.${id}`);
const allCards = Object.keys(D.HAZARDS).concat(Object.keys(D.RESULTS));
ok('every hazard and result card is reachable from the bench', allCards.every(id => used(id) || /RESULTS\[r\.error\]/.test(bench)), allCards.filter(id => !used(id)));
ok('every error work() can return has a result card', ['no_convert', 'wrong_dim', 'by_eye', 'multiply'].every(e => !!D.RESULTS[e]));
ok('at least 3 mistakes that teach', allCards.length >= 3, allCards.length);
ok('the 💡 facts are there', D.FACTS.length >= 10 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));
const texts = D.DISCOVERIES.map(d => d.learn + ' ' + d.saw).concat(D.FACTS);
ok('nothing beyond the syllabus is unlabelled: the inverted image, the field of view, cell counts',
   texts.every(t => !/upside down|field of view is|4\.5 mm|cubic millimetre|million/i.test(t) || /beyond the NCE syllabus/.test(t)),
   texts.filter(t => /upside down|field of view is|4\.5 mm|cubic millimetre|million/i.test(t) && !/beyond the NCE syllabus/.test(t)));
ok('the paper references are real ones from the blueprint (2023 Q5(a), 2024 Q4(e)(ii))',
   /2023 Q5\(a\)/.test(Object.values(D.RESULTS).map(r => r.exam).join(' ')) && /2024 Q4\(e\)\(ii\)/.test(Object.values(D.RESULTS).map(r => r.exam).join(' ')));
ok('no regex lookbehind anywhere in the lab (Safari)', !/\(\?<[=!]/.test(src) && !/\(\?<[=!]/.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
