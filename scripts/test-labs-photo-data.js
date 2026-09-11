'use strict';
// Science Labs: the biology the Photosynthesis Lab is allowed to show.
//
// The bench draws whatever engine/labs/lab_photo_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: the rate model behaves like the syllabus says (more light,
// more bubbles, until another factor limits; nothing in the dark; a
// temperature optimum), the starch test gives the textbook result for every
// leaf and set-up, the equations are right, every discovery recipe is valid
// and actually leads to its discovery, and every card and quiz is complete.
//
// Run: node scripts/test-labs-photo-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_photo_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_photo.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabPhotoData = LabPhotoData;', ctx);
const P = ctx.LabPhotoData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const cond = o => Object.assign({ dist: 30, lampOn: true, water: 'high', temp: 25, shield: true }, o);

console.log('\nLight and the rate of photosynthesis');
ok('light intensity follows 1/distance² (10 cm is 4× 20 cm)', Math.abs(P.light(10, true) / P.light(20, true) - 4) < 1e-9);
ok('no light with the lamp off', P.light(10, false) === 0);
for (const water of ['low', 'high']) {
  const far2near = P.DISTANCES.slice().reverse().map(d => P.rate(cond({ dist: d, water })));
  ok(`${water} CO₂: the rate never falls as the lamp comes closer`, far2near.every((r, i) => i === 0 || r >= far2near[i - 1] - 1e-9), far2near);
  const lim = P.DISTANCES.slice().reverse().map(d => P.limiting(cond({ dist: d, water })));
  const firstPlateau = lim.indexOf('co2');
  ok(`${water} CO₂: while light is limiting the rate rises strictly; once CO₂ limits, it is flat`,
     far2near.every((r, i) => i === 0 || (lim[i] === 'light' ? r > far2near[i - 1] : true))
     && (firstPlateau < 0 || far2near.slice(firstPlateau).every(r => Math.abs(r - far2near[firstPlateau]) < 1e-9)), { far2near, lim });
}
ok('with plenty of CO₂ there is a visible plateau near the lamp (10-20 cm within one bubble)',
   (() => { const r = [10, 15, 20].map(d => Math.round(P.rate(cond({ dist: d })))); return Math.max(...r) - Math.min(...r) <= 1; })());
ok('far from the lamp, adding CO₂ changes nothing (light limits)',
   Math.round(P.rate(cond({ dist: 50, water: 'low' }))) === Math.round(P.rate(cond({ dist: 50, water: 'high' }))));
ok('close to the lamp, adding CO₂ raises the rate (CO₂ limits)',
   P.rate(cond({ dist: 10, water: 'high' })) > 2.5 * P.rate(cond({ dist: 10, water: 'low' })));
ok('zero in the dark, whatever else', P.TEMPS.every(t => ['none', 'low', 'high'].every(w => P.rate(cond({ lampOn: false, temp: t, water: w })) === 0)));
ok('zero with no carbon dioxide, however bright', P.DISTANCES.every(d => P.rate(cond({ dist: d, water: 'none' })) === 0));
const tf = P.TEMPS.map(t => P.tempFactor(t));
const iMax = tf.indexOf(Math.max(...tf));
ok('temperature has an optimum (30 °C) inside the range', P.TEMPS[iMax] === 30, P.TEMPS[iMax]);
ok('…rising up to it and falling after it', tf.every((f, i) => i === 0 || (i <= iMax ? f > tf[i - 1] : f < tf[i - 1])), tf);
ok('at 50 °C nothing works (enzymes destroyed)', P.tempFactor(50) === 0);
ok('temperature only matters when it is the bottleneck: far lamp, 20 °C vs 30 °C is the same',
   Math.round(P.rate(cond({ dist: 50, temp: 20 }))) === Math.round(P.rate(cond({ dist: 50, temp: 30 }))));
ok('close lamp, plenty of CO₂: 45 °C is far slower than 30 °C', P.rate(cond({ dist: 10, temp: 45 })) < 0.5 * P.rate(cond({ dist: 10, temp: 30 })));

console.log('\nA one-minute count');
const r1 = P.countRun(cond({ dist: 10, shield: false }));
ok('no heat shield, lamp at 10 cm: the water warms 6 °C and the reading is flagged', r1.tempEnd === 31 && r1.heated === true, r1);
const r2 = P.countRun(cond({ dist: 10, shield: true }));
ok('with the heat shield the temperature holds', r2.tempEnd === 25 && !r2.heated, r2);
ok('no heat from a lamp that is off', P.countRun(cond({ dist: 10, shield: false, lampOn: false })).tempEnd === 25);
ok('bubbles are whole numbers', P.DISTANCES.every(d => Number.isInteger(P.countRun(cond({ dist: d })).bubbles)));
ok('changing distance AND water is two variables', P.changedVars(P.countRun(cond({ dist: 30 })), P.countRun(cond({ dist: 10, water: 'low' }))).join() === 'light,co2');
ok('changing only the distance is one', P.changedVars(P.countRun(cond({ dist: 30 })), P.countRun(cond({ dist: 10 }))).join() === 'light');

console.log('\nThe starch test');
const S = o => Object.assign({ plant: 'green', destarched: true, cover: 'none', day: 'light' }, o);
const cells = map => map.flat().filter(k => k.leaf);
const allStarch = m => cells(m).every(k => k.starch), noStarch = m => cells(m).every(k => !k.starch);
ok('the leaf grid has leaf cells, and a variegated leaf has both green and white', cells(P.starchMap(S())).length > 20
   && cells(P.starchMap(S({ plant: 'variegated' }))).some(k => k.green) && cells(P.starchMap(S({ plant: 'variegated' }))).some(k => !k.green));
ok('a green plant from the sunlight (not destarched): starch everywhere', allStarch(P.starchMap(S({ destarched: false, day: null }))));
ok('destarched, no light since: no starch anywhere', noStarch(P.starchMap(S({ day: null }))) && noStarch(P.starchMap(S({ day: 'dark' }))));
ok('destarched, a day in the light: starch everywhere again', allStarch(P.starchMap(S())));
const vm1 = cells(P.starchMap(S({ plant: 'variegated' })));
ok('variegated: starch exactly where it was green', vm1.every(k => k.starch === k.green));
const fm = cells(P.starchMap(S({ cover: 'foil' })));
ok('foil strip: starch exactly where it was uncovered', fm.some(k => k.covered) && fm.every(k => k.starch === !k.covered));
ok('soda lime (no CO₂): no starch', noStarch(P.starchMap(S({ cover: 'sodalime' }))));
ok('control flask (no soda lime): starch', allStarch(P.starchMap(S({ cover: 'flask' }))));
const fnd = cells(P.starchMap(S({ cover: 'foil', destarched: false })));
ok('foil on a plant that was NOT destarched: starch even under the foil (the unfair test)', fnd.filter(k => k.covered).every(k => k.starch));
ok('soda lime, not destarched: old starch still there', allStarch(P.starchMap(S({ cover: 'sodalime', destarched: false }))));
ok('the right order reads clearly', P.starchReading(['boil', 'ethanol', 'rinse', 'iodine']) === 'clear');
ok('without the rinse it still reads (the leaf just cracks)', P.starchReading(['boil', 'ethanol', 'iodine']) === 'clear');
ok('no ethanol: the green masks it', P.starchReading(['boil', 'rinse', 'iodine']) === 'masked' && P.starchReading(['iodine']) === 'masked');
ok('no boiling, or boiling after the ethanol: the iodine cannot get in',
   P.starchReading(['ethanol', 'rinse', 'iodine']) === 'no_boil' && P.starchReading(['ethanol', 'boil', 'iodine']) === 'no_boil');
ok('described results are the textbook ones',
   /green.*orange-brown where it was white/i.test(P.describe(S({ plant: 'variegated' }), P.starchMap(S({ plant: 'variegated' }))))
   && /under the foil/.test(P.describe(S({ cover: 'foil' }), P.starchMap(S({ cover: 'foil' }))))
   && /^Orange-brown all over/.test(P.describe(S({ cover: 'sodalime' }), P.starchMap(S({ cover: 'sodalime' }))))
   && /^Blue-black all over/.test(P.describe(S(), P.starchMap(S()))));
ok('iodine: blue-black for starch, orange-brown for none', /^#/.test(P.IODINE.starch) && /^#/.test(P.IODINE.none) && P.IODINE.starch !== P.IODINE.none);

console.log('\nThe equation');
ok('word equation: carbon dioxide + water → glucose + oxygen', P.EQUATION.word === 'carbon dioxide + water → glucose + oxygen');
ok('light and chlorophyll are above the arrow, not reactants', /light/.test(P.EQUATION.over) && /chlorophyll/.test(P.EQUATION.over));
const SUB = { '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9 };
const atoms = side => {
  const out = {};
  side.split('+').map(s => s.trim()).forEach(t => {
    const m = /^(\d*)(.*)$/.exec(t), k = m[1] ? +m[1] : 1, f = m[2];
    for (let i = 0; i < f.length;) {
      let el = f[i++]; while (i < f.length && /[a-z]/.test(f[i])) el += f[i++];
      let n = ''; while (i < f.length && SUB[f[i]] !== undefined) n += SUB[f[i++]];
      out[el] = (out[el] || 0) + k * (n ? +n : 1);
    }
  });
  return out;
};
const [lhs, rhs] = P.EQUATION.sym.split('→').map(atoms);
ok('the symbol equation balances atom for atom (C 6, H 12, O 18)', JSON.stringify(lhs) === JSON.stringify({ C: 6, O: 18, H: 12 }) && ['C', 'H', 'O'].every(e => lhs[e] === rhs[e]), { lhs, rhs });
ok('…and it is labelled beyond the NCE syllabus', /beyond the NCE syllabus/.test(P.EQUATION.symNote));

console.log('\nDiscoveries');
const ids = P.DISCOVERIES.map(d => d.id);
ok('at least 12 discoveries, ids unique', ids.length >= 12 && new Set(ids).size === ids.length, ids.length);
const tokenOk = on => {
  const [k, v] = on.split(':');
  const sets = { rig: ['pond', 'leaf'], dist: P.DISTANCES.map(String), lamp: ['on', 'off'], water: Object.keys(P.WATERS),
                 temp: P.TEMPS.map(String), shield: ['on', 'off'], plant: Object.keys(P.PLANTS), cover: Object.keys(P.COVERS),
                 day: ['light', 'dark'], bunsen: ['on', 'off'] };
  if (v !== undefined) return !!sets[k] && sets[k].includes(v);
  return ['count', 'splint', 'destarch', 'pick', 'boil', 'ethanol', 'rinse', 'iodine'].includes(k);
};
const bad = P.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe ever heats ethanol over a flame', P.DISCOVERIES.every(d => !d.how.includes('flame')) && P.GUIDES.every(G => G.steps.every(s => s.on !== 'flame')));
ok('no recipe or guide has the Bunsen lit when the ethanol goes in',
   P.DISCOVERIES.map(d => d.how).concat(P.GUIDES.map(G => G.steps.map(s => s.on))).every(how => {
     let lit = false;
     for (const t of how) { if (t === 'bunsen:on') lit = true; if (t === 'bunsen:off') lit = false; if (t === 'ethanol' && lit) return false; }
     return true; }));

// A small model of the bench, run through each recipe: pond counts go through
// countRun/pondDiscoveries, leaf tests through starchMap/starchReading/leafDiscoveries.
function runRecipe(how) {
  const pond = { dist: 30, lampOn: true, water: 'low', temp: 25, shield: false };
  const leaf = { plant: 'green', destarched: false, cover: 'none', day: null };
  let prev = null, gas = 0, steps = null, setup = null, bunsen = false;
  const found = new Set(), cards = [];
  for (const t of how) {
    const [k, v] = t.split(':');
    if (k === 'dist') pond.dist = +v; else if (k === 'lamp') pond.lampOn = v === 'on'; else if (k === 'water') pond.water = v;
    else if (k === 'temp') pond.temp = +v; else if (k === 'shield') pond.shield = v === 'on';
    else if (k === 'plant') Object.assign(leaf, { plant: v, destarched: false, cover: 'none', day: null });
    else if (k === 'destarch') Object.assign(leaf, { destarched: true, day: null });
    else if (k === 'cover') leaf.cover = v; else if (k === 'day') leaf.day = v; else if (k === 'bunsen') bunsen = v === 'on';
    else if (k === 'count') {
      const run = P.countRun(pond);
      if (P.changedVars(prev, run).length >= 2) cards.push('two_vars');
      if (run.heated) cards.push('lamp_heat');
      P.pondDiscoveries(prev, run).forEach(x => found.add(x)); prev = run; gas += run.bubbles;
    } else if (k === 'splint') { if (gas >= P.GAS_FOR_SPLINT) found.add('oxygen'); }
    else if (k === 'pick') { setup = Object.assign({}, leaf); steps = []; }
    else if (k === 'boil') { if (!bunsen) cards.push('boil without a lit Bunsen'); steps.push('boil'); }
    else if (k === 'ethanol') { if (bunsen) cards.push('ethanol_lit'); steps.push('ethanol'); if (steps.indexOf('boil') === 0) found.add('chlorophyll_out'); }
    else if (k === 'rinse') steps.push('rinse');
    else if (k === 'iodine') {
      steps.push('iodine');
      const rd = P.starchReading(steps);
      if (rd !== 'clear') cards.push(rd);
      else if (P.isExperiment(setup) && !setup.destarched) cards.push('not_destarched');
      else P.leafDiscoveries(setup).forEach(x => found.add(x));
    }
  }
  return { found, cards };
}
const unsolved = P.DISCOVERIES.filter(d => { const r = runRecipe(d.how); return !r.found.has(d.id) || r.cards.length; })
  .map(d => { const r = runRecipe(d.how); return d.id + ' -> found ' + [...r.found].join('/') + (r.cards.length ? ' cards ' + r.cards.join('/') : ''); });
ok('every recipe leads to its own discovery with no mistake card on the way', unsolved.length === 0, unsolved);
const reachable = new Set();
P.DISCOVERIES.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => ids.includes(x)), [...reachable].filter(x => !ids.includes(x)));
ok('the bench names every discovery it unlocks outside the data functions', ['oxygen', 'chlorophyll_out'].every(id => bench.includes(`'${id}'`)));

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', P.GUIDES.length >= 3 && new Set(P.GUIDES.map(g => g.id)).size === P.GUIDES.length);
for (const G of P.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  ok(`${G.title}: ends with what they found out, and runs with no mistake card`, !!(G.lesson && G.blurb && G.icon) && runRecipe(G.steps.map(s => s.on)).cards.length === 0,
     runRecipe(G.steps.map(s => s.on)).cards);
}

console.log('\nMissions, hazards and result cards');
ok('at least 2 missions', P.MISSIONS.length >= 2);
for (const M of P.MISSIONS) {
  const badQ = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(`${M.title}: has a goal, a blurb and a rig`, !!(M.intro && M.blurb && M.icon && (M.rig === 'pond' || M.rig === 'leaf')));
}
ok('a mission asks for a controlled variable, with the paper reference (Biology 2024 Q5(b)(i))',
   P.MISSIONS.some(M => M.quiz.some(q => /controlled variable|kept constant/.test(q.q) && /2024 Q5\(b\)\(i\)/.test(q.why))));
ok('a mission asks for a conclusion from the results table', P.MISSIONS.some(M => M.quiz.some(q => /conclusion/i.test(q.q))));
ok('the 2024 Q5(b) mission has the paper’s four tests', (() => { const M = P.MISSIONS.find(m => m.id === 'needs'); return M && M.tests.length === 4
   && new Set(M.tests.map(t => `${t.lampOn}${t.co2}`)).size === 4; })());
ok('in that experiment only light + CO₂ gives bubbles, as on the paper',
   [[true, 'high'], [true, 'none'], [false, 'high'], [false, 'none']].map(([l, w]) => P.countRun(cond({ lampOn: l, water: w, dist: 20 })).bubbles > 0).join() === 'true,false,false,false');
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard'];
for (const [id, H] of Object.entries(P.HAZARDS)) {
  ok(`hazard ${id}: real signs, what happened, why, what to do instead and the exam point`,
     H.signs.length && H.signs.every(s => SIGNS.includes(s)) && H.title() && H.happened() && H.why && H.instead && H.exam);
}
ok('heating ethanol near a flame is flagged FLAMMABLE', P.HAZARDS.ethanol_flame.signs.includes('flammable') && P.HAZARDS.ethanol_lit.signs.includes('flammable'));
const rctx = { late: true, cover: 'foil', list: 'the light and the temperature', a: 10, b: 31, dist: 10, t0: 25, t1: 31 };
for (const [id, R] of Object.entries(P.RESULTS)) {
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && R.title && R.happened(rctx) && R.instead && R.exam));
}
const used = id => bench.includes(`'${id}'`) || bench.includes(`RESULTS.${id}`) || bench.includes(`HAZARDS.${id}`);
ok('every hazard and result card is used by the bench', Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).every(used),
   Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).filter(id => !used(id)));
ok('at least 3 mistakes that teach', Object.keys(P.HAZARDS).length + Object.keys(P.RESULTS).length >= 3);
ok('the 💡 facts are there', P.FACTS.length >= 10 && P.FACTS.every(f => typeof f === 'string' && f.length > 20));
ok('nothing beyond the syllabus is unlabelled: enzymes and the inverse square law say so',
   P.DISCOVERIES.concat(P.FACTS.map(f => ({ learn: f }))).every(d => !/enzyme|inverse square/i.test(d.learn) || /beyond the NCE syllabus/.test(d.learn)));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
