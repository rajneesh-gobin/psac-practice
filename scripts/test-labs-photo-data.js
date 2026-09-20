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
// Since 2026-09-20 it also checks the EXPERIMENTS (lab_experiment.js): every
// token, ref and label, and each See text replayed through the same models.
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

// Everything above and the checks below up to "Primary levels" are the
// original Grade 9 level: the content with no `grades` tag.
const G9 = x => !x.grades || x.grades.includes(9);
const D9 = P.DISCOVERIES.filter(G9), GU9 = P.GUIDES.filter(G9), M9 = P.MISSIONS.filter(G9);

console.log('\nDiscoveries');
const ids = D9.map(d => d.id);
ok('at least 12 discoveries, ids unique', ids.length >= 12 && new Set(ids).size === ids.length, ids.length);
const tokenOk = on => {
  const [k, v] = on.split(':');
  const sets = { rig: ['pond', 'leaf'], dist: P.DISTANCES.map(String), lamp: ['on', 'off'], water: Object.keys(P.WATERS),
                 temp: P.TEMPS.map(String), shield: ['on', 'off'], plant: Object.keys(P.PLANTS), cover: Object.keys(P.COVERS),
                 day: ['light', 'dark'], bunsen: ['on', 'off'] };
  if (v !== undefined) return !!sets[k] && sets[k].includes(v);
  return ['count', 'splint', 'destarch', 'pick', 'boil', 'ethanol', 'rinse', 'iodine'].includes(k);
};
const bad = D9.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe ever heats ethanol over a flame', D9.every(d => !d.how.includes('flame')) && GU9.every(G => G.steps.every(s => s.on !== 'flame')));
ok('no recipe or guide has the Bunsen lit when the ethanol goes in',
   D9.map(d => d.how).concat(GU9.map(G => G.steps.map(s => s.on))).every(how => {
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
const unsolved = D9.filter(d => { const r = runRecipe(d.how); return !r.found.has(d.id) || r.cards.length; })
  .map(d => { const r = runRecipe(d.how); return d.id + ' -> found ' + [...r.found].join('/') + (r.cards.length ? ' cards ' + r.cards.join('/') : ''); });
ok('every recipe leads to its own discovery with no mistake card on the way', unsolved.length === 0, unsolved);
const reachable = new Set();
D9.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => ids.includes(x)), [...reachable].filter(x => !ids.includes(x)));
ok('the bench names every discovery it unlocks outside the data functions', ['oxygen', 'chlorophyll_out'].every(id => bench.includes(`'${id}'`)));

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', GU9.length >= 3 && new Set(P.GUIDES.map(g => g.id)).size === P.GUIDES.length);
for (const G of GU9) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  ok(`${G.title}: ends with what they found out, and runs with no mistake card`, !!(G.lesson && G.blurb && G.icon) && runRecipe(G.steps.map(s => s.on)).cards.length === 0,
     runRecipe(G.steps.map(s => s.on)).cards);
}

console.log('\nMissions, hazards and result cards');
ok('at least 2 missions', M9.length >= 2);
for (const M of M9) {
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
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard', 'warning', 'sharp'];
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

// ══ Primary levels: PSAC Grade 4 and Grade 6 (LAB_SPEC §8, §9) ══
console.log('\nPrimary levels: grades and tags');
const PRIM = [4, 6];
const forG = (list, g) => list.filter(x => (x.grades || [9]).includes(g));
ok('the lab declares its grades: 4, 6 and 9', JSON.stringify(P.GRADES) === '[4,6,9]');
ok('every tagged item is tagged with exactly one primary grade, and its id says which',
   P.DISCOVERIES.concat(P.GUIDES, P.MISSIONS).filter(x => x.grades).every(x => x.grades.length === 1 && PRIM.includes(x.grades[0]) && x.id.startsWith(`g${x.grades[0]}_`)));
ok('no untagged (Grade 9) id looks like a primary one, so progress cannot collide',
   P.DISCOVERIES.concat(P.GUIDES, P.MISSIONS).filter(x => !x.grades).every(x => !/^g\d_/.test(x.id)));
for (const kind of ['DISCOVERIES', 'GUIDES', 'MISSIONS']) {
  const all = P[kind].map(x => x.id);
  ok(`${kind.toLowerCase()}: every id is unique across all grades`, new Set(all).size === all.length);
}
ok('each primary grade has its own rigs, and never the starch-test bench', PRIM.every(g => P.LEVELS[g].rigs.length >= 2 && !P.LEVELS[g].rigs.includes('leaf') && !P.LEVELS[g].rigs.includes('pond')));
ok('the eyebrows name the grade in use', P.LEVELS[4].eyebrow === 'Science · Grade 4' && P.LEVELS[6].eyebrow === 'Science · Grade 6' && P.LEVELS[9].eyebrow === 'Biology · Grade 9');

for (const g of PRIM) {
  console.log(`\nGrade ${g}: counts`);
  const Dg = forG(P.DISCOVERIES, g), Gg = forG(P.GUIDES, g), Mg = forG(P.MISSIONS, g);
  ok(`Grade ${g}: at least 3 guided experiments (${Gg.length})`, Gg.length >= 3);
  ok(`Grade ${g}: at least 10 discoveries (${Dg.length})`, Dg.length >= 10);
  ok(`Grade ${g}: at least 2 missions (${Mg.length}), each with 5+ questions, 4 distinct options and a reason`,
     Mg.length >= 2 && Mg.every(M => M.quiz.length >= 5 && M.quiz.every(q => q.q && q.why && q.options.length === 4 && new Set(q.options).size === 4 && q.options.every(o => o))));
  ok(`Grade ${g}: its guides open on a rig of its own grade`, P.LEVELS[g].rigs.includes(P.primaryRig(Gg[0].steps[0].on)) && Gg.some(G => G.id === P.LEVELS[g].first));
  ok(`Grade ${g}: at least 10 💡 facts`, P.FACTS_G[g].length >= 10);
  ok(`Grade ${g}: a welcome and a help page`, P.PRIMARY_TEXT[g].welcome.length >= 3 && P.PRIMARY_TEXT[g].help.length >= 3);
  const toks = Dg.flatMap(d => d.how).concat(Gg.flatMap(G => G.steps.map(s => s.on)));
  const badTok = toks.filter(t => !P.primaryStep(t) || !P.LEVELS[g].rigs.includes(P.primaryRig(t)));
  ok(`Grade ${g}: every recipe and guide step is a real action on one of its own rigs, with words`, badTok.length === 0, badTok);
  ok(`Grade ${g}: missions run on its own rigs`, Mg.every(M => P.LEVELS[g].rigs.includes(M.rig)));
}
ok('Grade 4 and Grade 6 are different levels: no shared discovery, guide, mission or question',
   (() => { const q = g => new Set(forG(P.MISSIONS, g).flatMap(M => M.quiz.map(x => x.q)));
            const a = q(4), b = q(6); return [...a].every(x => !b.has(x)); })());
ok('Grade 4 has the seed dishes and the soil; Grade 6 has the waterweed and the leaves',
   P.LEVELS[4].rigs.includes('seeds') && P.POT_VARS[4].includes('soil') && P.LEVELS[6].rigs.includes('weed') && P.POT_VARS[6].includes('leaves'));

console.log('\nPrimary science: two pots and a week');
const pr = o => P.potResult(Object.assign(P.newPot(), o));
const ideal = pr({});
ok('sun, a little water, compost soil, leaves on: green and strong, grows 7 cm', ideal.leaf === 'green' && ideal.stem === 'strong' && ideal.grew === 7 && ideal.healthy);
ok('dark cupboard: pale yellow leaves on a thin stem (it stretches for light), not healthy', pr({ spot: 'dark' }).leaf === 'yellow' && pr({ spot: 'dark' }).stem === 'thin' && !pr({ spot: 'dark' }).healthy);
ok('no water: wilted and brown, no growth', pr({ drink: 'none' }).leaf === 'brown' && pr({ drink: 'none' }).stem === 'droopy' && pr({ drink: 'none' }).grew === 0);
ok('far too much water: yellow and droopy (roots rot)', pr({ drink: 'flood' }).leaf === 'yellow' && pr({ drink: 'flood' }).stem === 'droopy');
ok('plain sand: smaller than in compost, with pale leaves (few minerals)', pr({ soil: 'sand' }).grew < ideal.grew && pr({ soil: 'sand' }).leaf === 'pale');
ok('no leaves: no food, no growth', pr({ leaves: 'off' }).grew === 0);
ok('under a hot lamp: scorched within a day', pr({ spot: 'lamp' }).leaf === 'scorched' && pr({ spot: 'lamp' }).fast);
ok('every leaf colour is drawable', ['green', 'pale', 'yellow', 'brown', 'scorched', 'none'].every(k => /^#/.test(P.LEAF_COLOURS[k])));
const S2 = (a, b, twin = true) => ({ twin, A: Object.assign(P.newPot(), a), B: Object.assign(P.newPot(), b) });
ok('two things changed between the pots: the “not a fair test” card', (P.potCheck(4, S2({}, { spot: 'dark', drink: 'none' })) || {}).card === 'two_things');
ok('one thing changed: no card, and it is a fair test', !P.potCheck(4, S2({}, { spot: 'dark' })) && P.potDiscoveries(4, S2({}, { spot: 'dark' })).includes('g4_fair'));
ok('one plant, changed, with nothing to compare: the “no control” card', (P.potCheck(6, S2({ spot: 'dark' }, {}, false)) || {}).card === 'no_control');
ok('one plant, left normal: no card', !P.potCheck(6, S2({}, {}, false)));
ok('too much water: the over-watering card', (P.potCheck(4, S2({}, { drink: 'flood' })) || {}).card === 'flood');
ok('a hot lamp stops the week with the HOT hazard', (P.potCheck(4, S2({}, { spot: 'lamp' })) || {}).hazard === 'hot_lamp' && P.HAZARDS.hot_lamp.signs.join() === 'hot');
ok('soil is a Grade 4 variable, leaves a Grade 6 one', P.potDiff(4, P.newPot(), Object.assign(P.newPot(), { leaves: 'off' })).length === 0
   && P.potDiff(6, P.newPot(), Object.assign(P.newPot(), { soil: 'sand' })).length === 0);

console.log('\nPrimary science: seeds (Grade 4)');
const dish = (wet, place) => ({ wet, place });
ok('damp, warm: sprouts - in the dark cupboard AND on the windowsill (no light needed)', P.seedSprouts(dish('damp', 'cupboard')) && P.seedSprouts(dish('damp', 'window')));
ok('dry: no sprout (water needed)', !P.seedSprouts(dish('dry', 'cupboard')));
ok('under water: no sprout (air needed)', !P.seedSprouts(dish('drown', 'cupboard')));
ok('cold fridge: no sprout (warmth needed)', !P.seedSprouts(dish('damp', 'fridge')));
ok('the root comes out before the shoot, and the shoot before the leaves',
   [1, 2, 3, 4].map(d => P.seedStage(dish('damp', 'cupboard'), d)).join() === '1,2,3,4');
ok('a seed with water but missing air or warmth only swells; a dry seed does nothing',
   P.seedStage(dish('drown', 'cupboard'), 4) === 1 && P.seedStage(dish('damp', 'fridge'), 4) === 1 && P.seedStage(dish('dry', 'window'), 4) === 0);
ok('sprouts in the dark are pale; on the windowsill green', /pale yellow/.test(P.seedResult(dish('damp', 'cupboard')).words) && /green/.test(P.seedResult(dish('damp', 'window')).words));
const dset = arr => { const o = {}; arr.forEach((d, i) => { o[i + 1] = d; }); return o; };
ok('fridge vs windowsill with no cupboard dish: the “cold AND dark” card',
   (P.seedCheck(dset([dish('damp', 'window'), dish('damp', 'fridge'), dish('damp', 'window'), dish('damp', 'window')])) || {}).card === 'fridge_two');
ok('the mission set-up finds water, warmth and air in one go',
   (() => { const M = P.MISSIONS.find(m => m.id === 'g4_seeds'); const got = P.seedDiscoveries(M.setup); return M.finds.every(f => got.includes(f)) && !P.seedCheck(M.setup); })());

console.log('\nPrimary science: waterweed (Grade 6)');
const wr = o => P.weedRun(Object.assign({ dist: 30, lampOn: true, water: 'soda' }, o)).bubbles;
ok('a closer lamp gives more bubbles: 50 cm < 30 cm < 20 cm', wr({ dist: 50 }) < wr({ dist: 30 }) && wr({ dist: 30 }) < wr({ dist: 20 }), [50, 30, 20].map(d => wr({ dist: d })));
ok('no light, no bubbles', P.WEED_DISTS.every(d => wr({ dist: d, lampOn: false }) === 0));
ok('boiled and cooled water (no carbon dioxide): no bubbles however close', P.WEED_DISTS.every(d => wr({ dist: d, water: 'boiled' }) === 0));
ok('the Gas A / Gas B mission: only light + carbon dioxide bubbles',
   P.MISSIONS.find(m => m.id === 'g6_gases').tests.map(t => wr({ lampOn: t.lampOn, water: t.water }) > 0).join() === 'false,true,false');
ok('…and its tests, in the order listed, change ONE thing each time (no unfair-test card)',
   runPrimary(6, P.MISSIONS.find(m => m.id === 'g6_gases').tests.flatMap(t => [`wlamp:${t.lampOn ? 'on' : 'off'}`, `wwater:${t.water}`, 'wcount'])).cards.length === 0);
ok('changing the light AND the water between counts is two things', P.weedDiff({ lampOn: true, dist: 30, water: 'soda' }, { lampOn: false, dist: 30, water: 'boiled' }).length === 2);
ok('the Grade 6 word equation is the syllabus one: carbon dioxide + water → food + oxygen', P.PEQ.word === 'carbon dioxide + water → food + oxygen' && /sunlight/.test(P.PEQ.over) && /chlorophyll/.test(P.PEQ.over));

console.log('\nPrimary recipes and guides');
// A small model of the primary bench, run through each recipe.
function runPrimary(g, how) {
  const pots = { sel: 'A', twin: true, A: P.newPot(), B: P.newPot() };
  const dishes = {}; P.DISHES.forEach(i => { dishes[i] = P.newDish(); });
  let dsel = 1, waited = false;
  const weed = { dist: 30, lampOn: true, water: 'soda' };
  let prev = null; const runs = [];
  const found = new Set(), cards = [];
  for (const t of how) {
    const [k, v] = t.split(':');
    if (k === 'pot') pots.sel = v;
    else if (k === 'twin') pots.twin = v === 'on';
    else if (['spot', 'drink', 'soil', 'leaves'].includes(k)) pots[pots.sel][k] = v;
    else if (k === 'week') { const c = P.potCheck(g, pots); if (c) cards.push(c.hazard || c.card); P.potDiscoveries(g, pots).forEach(x => found.add(x)); }
    else if (k === 'dish') dsel = +v;
    else if (k === 'wet' || k === 'place') { dishes[dsel][k] = v; waited = false; }
    else if (k === 'days') { const c = P.seedCheck(dishes); if (c) cards.push(c.card); P.seedDiscoveries(dishes).forEach(x => found.add(x)); waited = true; }
    else if (k === 'look') { if (waited && P.seedSprouts(dishes[dsel])) found.add('g4_root'); }
    else if (k === 'wlamp') weed.lampOn = v === 'on';
    else if (k === 'wdist') weed.dist = +v;
    else if (k === 'wwater') weed.water = v;
    else if (k === 'wcount') { const r = P.weedRun(weed); runs.unshift(r); if (P.weedDiff(prev, r).length >= 2) cards.push('two_things'); P.weedDiscoveries(prev, r, runs).forEach(x => found.add(x)); prev = r; }
  }
  return { found, cards };
}
for (const g of PRIM) {
  const Dg = forG(P.DISCOVERIES, g), idsG = Dg.map(d => d.id);
  const uns = Dg.filter(d => { const r = runPrimary(g, d.how); return !r.found.has(d.id) || r.cards.length; })
    .map(d => { const r = runPrimary(g, d.how); return d.id + ' -> ' + [...r.found].join('/') + (r.cards.length ? ' cards ' + r.cards.join('/') : ''); });
  ok(`Grade ${g}: every recipe leads to its own discovery with no mistake card`, uns.length === 0, uns);
  const reach = new Set(); Dg.forEach(d => runPrimary(g, d.how).found.forEach(x => reach.add(x)));
  ok(`Grade ${g}: every id the model unlocks is one of its own discoveries`, [...reach].every(x => idsG.includes(x)), [...reach].filter(x => !idsG.includes(x)));
  const Gg = forG(P.GUIDES, g);
  ok(`Grade ${g}: every guide has words, a button per step and a lesson, and runs with no card`,
     Gg.every(G => G.lesson && G.blurb && G.icon && G.steps.every(s => s.say) && runPrimary(g, G.steps.map(s => s.on)).cards.length === 0));
  ok(`Grade ${g}: every discovery has a clue, what you saw and why`, Dg.every(d => d.hint && d.saw && d.learn && d.title && d.icon));
}
ok('the bench names the discovery it unlocks outside the data functions (the close look)', bench.includes("'g4_root'"));

console.log('\nPrimary reading level and safety');
const primText = [];
for (const g of PRIM) {
  forG(P.GUIDES, g).forEach(G => primText.push(G.title, G.blurb, G.lesson, ...G.steps.map(s => s.say)));
  forG(P.DISCOVERIES, g).forEach(d => primText.push(d.title, d.hint, d.saw, d.learn, ...d.how.map(t => P.primaryStep(t).say)));
  forG(P.MISSIONS, g).forEach(M => { primText.push(M.title, M.blurb, M.intro, ...Object.values(M.steps || {})); M.quiz.forEach(q => primText.push(q.q, q.why, ...q.options)); });
  primText.push(...P.FACTS_G[g]);
  P.PRIMARY_TEXT[g].welcome.forEach(w => primText.push(...w));
  P.PRIMARY_TEXT[g].help.forEach(([h, items]) => primText.push(h, ...items));
}
const pctx = { list: 'where it stood and the water', weed: false };
const PCARDS = ['flood', 'two_things', 'no_control', 'fridge_two'];
PCARDS.forEach(id => { const R = P.RESULTS[id]; primText.push(R.title, R.happened(pctx), R.happened({ weed: true, list: 'the light and the water' }), R.instead, R.exam); });
const H = P.HAZARDS.hot_lamp; primText.push(H.title(), H.happened(), H.why, H.instead, H.exam);
['sun', 'dark', 'lamp'].forEach(s => ['some', 'none', 'flood'].forEach(w => primText.push(pr({ spot: s, drink: w }).words)));
[['damp', 'cupboard'], ['dry', 'window'], ['drown', 'fridge'], ['damp', 'window']].forEach(([w, p]) => primText.push(P.seedResult(dish(w, p)).words));
const sentences = s => String(s).replace(/<[^>]+>/g, '').split(/[.!?…:]\s+/).map(x => x.trim()).filter(Boolean);
const wordCount = s => s.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
const long = primText.flatMap(sentences).filter(s => wordCount(s) > 16);
ok(`reading level: every primary sentence is 16 words or fewer (${primText.length} texts)`, long.length === 0, long);
ok('no starch test at the primary levels: no iodine, ethanol, alcohol or Bunsen anywhere',
   primText.every(t => !/iodine|ethanol|alcohol|bunsen|starch test/i.test(t)));
ok('every primary card is complete: what happened, what to do instead, the exam point',
   PCARDS.every(id => { const R = P.RESULTS[id]; return R.icon && R.title && R.happened(pctx) && R.instead && R.exam; })
   && !!(H.title() && H.happened() && H.why && H.instead && H.exam));
// A PSAC paper is quoted only if it is really in the app's past-paper files.
const cites = [...new Set(primText.join(' ').match(/PSAC \d{4}/g) || [])];
const citeOk = c => { const f = path.join(ROOT, 'subjects', 'grade6-science', 'questions', `past_paper_${c.slice(5)}.js`);
  return fs.existsSync(f) && /g6-plants|photosynthesis/i.test(fs.readFileSync(f, 'utf8')); };
ok(`every PSAC paper quoted (${cites.join(', ')}) is a real past-paper file with plant questions`, cites.length > 0 && cites.every(citeOk), cites.filter(c => !citeOk(c)));

// ══ Experiments (lab_experiment.js, LAB_SPEC.md §10) ═══════════
// The contract is checked by scripts/test-labs-experiments-data.js; this is
// the bench's side of it: every setup and step token is one the bench performs
// AT THAT GRADE, every check ref is that grade's quiz question, every `say`
// names the control it points at (the text the bench renders on that button,
// emoji stripped), and - replayed through the same potResult / seedResult /
// weedRun / countRun / starchMap models the bench draws from - every See text
// is TRUE and no right path trips a hazard or a "what went wrong" card.
console.log('\nExperiments');
const X = P.EXPERIMENTS || [];
ok('the data file exports EXPERIMENTS', Array.isArray(X) && X.length > 0);
ok('experiment ids are unique and carry their grade', new Set(X.map(e => e.id)).size === X.length
   && X.every(e => Array.isArray(e.grades) && e.grades.length === 1 && e.id.startsWith('g' + e.grades[0] + '_')), X.map(e => e.id));
const XCH = { 4: 'g4sci-plants', 6: 'g6-plants', 9: 'g9s-b4-plant-nutrition' };
for (const g of [4, 6, 9]) {
  const mine = X.filter(e => e.grades.includes(g));
  ok(`Grade ${g}: 3 to 5 experiments (${mine.length}), every one on ${XCH[g]}`, mine.length >= 3 && mine.length <= 5 && mine.every(e => e.chapter === XCH[g]), mine.map(e => e.chapter));
}
ok('the first experiment at each grade is the exam-shaped one: two pots in light and dark (4), Gas A and Gas B (6), the 2024 four tests (9)',
   X.find(e => e.grades[0] === 4).id === 'g4_light' && X.find(e => e.grades[0] === 6).id === 'g6_gases' && X.find(e => e.grades[0] === 9).id === 'g9_needs');
// A token the bench performs at that grade: primary ones through primaryStep()
// on one of the grade's rigs; Grade 9 ones as the discovery recipes above.
const xTok = (t, g) => g === 9 ? (tokenOk(t) || t === 'flame') : !!(P.primaryStep(t) && P.LEVELS[g].rigs.includes(P.primaryRig(t)));
const xSteps = e => e.steps.map(s => s.on || (s.any && s.any[0]));
const strip = s => String(s).replace(/&amp;/g, '&').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
// What the bench renders on the control a token belongs to (lab_photo.js
// _renderTools / _shelfHTML / _pToolsHTML / _pShelfHTML), emoji stripped -
// the text a child reads on the glowing button.
const FIXED9 = { count: 'Count 1 minute', splint: 'Glowing splint', closer: 'Lamp closer', further: 'Lamp further', boil: 'Boil in water', ethanol: 'Ethanol, water bath',
                 flame: 'Ethanol over flame', rinse: 'Rinse, warm water', iodine: 'Iodine solution', destarch: 'Destarch', pick: 'Pick a leaf', 'bunsen:on': 'Light Bunsen', 'bunsen:off': 'Bunsen off',
                 'day:light': 'In sunlight', 'day:dark': 'In the dark', 'shield:on': 'In', 'shield:off': 'Out', 'lamp:on': 'On', 'lamp:off': 'Off' };
const FIXEDP = { week: 'Wait 7 days', fresh: 'New plants', days: 'Wait 4 days', look: 'Look closely', wcount: 'Count 1 minute', wcloser: 'Lamp closer', wfurther: 'Lamp further',
                 'twin:on': 'Two plants', 'twin:off': 'One plant', 'wlamp:on': 'On', 'wlamp:off': 'Off' };
function benchLabel(tok, g) {
  const [k, v] = tok.split(':');
  const fixed = g === 9 ? FIXED9 : FIXEDP;
  if (fixed[tok] !== undefined) return fixed[tok];
  if (k === 'rig') return strip(P.RIG_NAMES[v]);
  if (g === 9) {
    switch (k) {
      case 'dist': return v + ' cm'; case 'temp': return v + ' °C';
      case 'water': return P.WATERS[v].name; case 'plant': return P.PLANTS[v].name; case 'cover': return P.COVERS[v].name;
    }
    return null;
  }
  switch (k) {
    case 'pot': return 'Pot ' + v; case 'dish': return 'Dish ' + v; case 'wdist': return v + ' cm';
    case 'spot': return P.SPOTS[v].name; case 'drink': return P.DRINKS[v].name; case 'soil': return P.SOILS[v].name; case 'leaves': return P.LEAVES[v].name;
    case 'wet': return P.WETS[v].name; case 'place': return P.PLACES[v].name; case 'wwater': return P.WEED_WATERS[v].name;
  }
  return null;
}
ok('every fixed control label the test assumes is really rendered by the bench',
   [...new Set(Object.values(FIXED9).concat(Object.values(FIXEDP)))].every(l => bench.includes(l)), [...new Set(Object.values(FIXED9).concat(Object.values(FIXEDP)))].filter(l => !bench.includes(l)));
const plain = s => strip(s).toLowerCase();
const xQ = ref => { if (ref && typeof ref === 'object') return ref; const [m, i] = String(ref).split(':'); const M = P.MISSIONS.find(x => x.id === m); return M ? M.quiz[Number(i)] : null; };
const xQGrade = ref => { if (typeof ref === 'object') return null; const M = P.MISSIONS.find(x => x.id === ref.split(':')[0]); return M ? (M.grades || [9])[0] : null; };

// Replay the set-up and the right answer of every step, as the bench would:
// what each pot, dish, count, splint and iodine test really shows.
function replay(e) {
  const g = e.grades[0], toks = [...e.setup, ...xSteps(e)];
  const out = { cards: [], found: new Set(), counts: [], pots: null, seeds: null, look: false, leaf: null, splint: null };
  if (g !== 9) {
    const pots = { sel: 'A', twin: true, A: P.newPot(), B: P.newPot() }, dishes = {}; P.DISHES.forEach(i => { dishes[i] = P.newDish(); });
    let dsel = 1, seedRes = null, prev = null; const weed = { dist: 30, lampOn: true, water: 'soda' }, runs = [];
    for (const t of toks) {
      const [k, v] = t.split(':');
      if (k === 'rig') { if (!P.LEVELS[g].rigs.includes(v)) out.cards.push('not a Grade ' + g + ' rig: ' + v); }
      else if (k === 'pot') { if (v === 'B' && !pots.twin) out.cards.push('no pot B'); pots.sel = v; }
      else if (k === 'twin') pots.twin = v === 'on';
      else if (['spot', 'drink', 'soil', 'leaves'].includes(k)) { if (!P.POT_VARS[g].includes(k)) out.cards.push('not a Grade ' + g + ' pot variable: ' + t); pots[pots.sel][k] = v; }
      else if (k === 'week') { const c = P.potCheck(g, pots); if (c) out.cards.push(c.hazard || c.card); out.pots = { A: P.potResult(pots.A), B: pots.twin ? P.potResult(pots.B) : null }; P.potDiscoveries(g, pots).forEach(x => out.found.add(x)); }
      else if (k === 'dish') dsel = +v;
      else if (k === 'wet' || k === 'place') { dishes[dsel][k] = v; seedRes = null; }
      else if (k === 'days') { const c = P.seedCheck(dishes); if (c) out.cards.push(c.card); seedRes = {}; P.DISHES.forEach(i => { seedRes[i] = P.seedResult(dishes[i]); }); out.seeds = seedRes; P.seedDiscoveries(dishes).forEach(x => out.found.add(x)); }
      else if (k === 'look') { if (!seedRes || !seedRes[dsel].sprouted) out.cards.push('a close look at a dish that did not sprout'); else { out.look = true; out.found.add('g4_root'); } }
      else if (k === 'wlamp') weed.lampOn = v === 'on';
      else if (k === 'wdist') weed.dist = +v;
      else if (k === 'wwater') weed.water = v;
      else if (k === 'wcount') { const r = P.weedRun(weed); runs.unshift(r); if (P.weedDiff(prev, r).length >= 2) out.cards.push('two_things'); P.weedDiscoveries(prev, r, runs).forEach(x => out.found.add(x)); prev = r; out.counts.push(r.bubbles); }
      else out.cards.push('unknown token ' + t);
    }
    return out;
  }
  const pond = { dist: 30, lampOn: true, water: 'low', temp: 25, shield: false };
  const leaf = { plant: 'green', destarched: false, cover: 'none', day: null };
  let prev = null, gas = 0, steps = null, setup = null, bunsen = false, bathHot = false, picked = false;
  for (const t of toks) {
    const [k, v] = t.split(':');
    if (k === 'rig') {}
    else if (k === 'dist') pond.dist = +v; else if (k === 'lamp') pond.lampOn = v === 'on'; else if (k === 'water') pond.water = v;
    else if (k === 'temp') pond.temp = +v; else if (k === 'shield') pond.shield = v === 'on';
    else if (k === 'plant') { Object.assign(leaf, { plant: v, destarched: false, cover: 'none', day: null }); picked = false; }
    else if (k === 'destarch') { Object.assign(leaf, { destarched: true, day: null }); picked = false; }
    else if (k === 'cover') { if (leaf.day) out.cards.push('a cover after the day'); leaf.cover = v; picked = false; }
    else if (k === 'day') { leaf.day = v; picked = false; }
    else if (k === 'bunsen') { bunsen = v === 'on'; if (bunsen) bathHot = true; }
    else if (k === 'count') { const run = P.countRun(pond); if (P.changedVars(prev, run).length >= 2) out.cards.push('two_vars'); if (run.heated) out.cards.push('lamp_heat'); P.pondDiscoveries(prev, run).forEach(x => out.found.add(x)); prev = run; gas += run.bubbles; out.counts.push(run.bubbles); }
    else if (k === 'splint') { out.splint = gas >= P.GAS_FOR_SPLINT; if (out.splint) out.found.add('oxygen'); else out.cards.push('a splint with too little gas'); }
    else if (k === 'pick') { setup = Object.assign({}, leaf); steps = []; picked = true; }
    else if (k === 'boil') { if (!picked) out.cards.push('boil with no leaf'); if (!bunsen) out.cards.push('boil without a lit Bunsen'); steps.push('boil'); }
    else if (k === 'ethanol') { if (!picked) out.cards.push('ethanol with no leaf'); if (bunsen) out.cards.push('ethanol_lit'); if (!bathHot) out.cards.push('a cold water bath'); steps.push('ethanol'); }
    else if (k === 'flame') out.cards.push('ethanol_flame');
    else if (k === 'rinse') { if (!picked) out.cards.push('rinse with no leaf'); steps.push('rinse'); }
    else if (k === 'iodine') {
      if (!picked) out.cards.push('iodine with no leaf');
      steps.push('iodine');
      const rd = P.starchReading(steps);
      if (rd !== 'clear') out.cards.push(rd);
      else if (setup.plant === 'variegated' && setup.cover === 'foil') out.cards.push('two_vars_leaf');
      else if (P.isExperiment(setup) && !setup.destarched) out.cards.push('not_destarched');
      else { out.leaf = P.describe(setup, P.starchMap(setup)); P.leafDiscoveries(setup).forEach(x => out.found.add(x)); }
    }
    else out.cards.push('unknown token ' + t);
  }
  return out;
}
const xwords = s => String(s).split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
for (const e of X) {
  const t = e.id, g = e.grades[0];
  ok(`${t}: every set-up token is one the bench performs at Grade ${g}`, e.setup.every(x => xTok(x, g)), e.setup.filter(x => !xTok(x, g)));
  ok(`${t}: every step token (on, any, options) is one the bench performs at Grade ${g}`, e.steps.every(s => (s.options || s.any || [s.on]).every(x => xTok(x, g))), e.steps);
  ok(`${t}: an ask step lists 2-4 options, its answer among them, and each wrong text names a different option`,
     e.steps.filter(s => s.ask).every(s => Array.isArray(s.options) && s.options.length >= 2 && s.options.length <= 4
       && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on)) && Object.keys(s.wrong || {}).every(k => s.options.includes(k) && k !== s.on)), e.steps.filter(s => s.ask));
  ok(`${t}: every option that is not the answer explains itself`, e.steps.filter(s => s.ask).every(s => s.options.every(o => o === s.on || (s.any && s.any.includes(o)) || (s.wrong && s.wrong[o]))));
  ok(`${t}: at most 5 steps, each under 25 words${g < 9 ? ' and 16 words a sentence' : ''}`,
     e.steps.length <= 5 && e.steps.every(s => xwords(s.say || s.ask) <= 25 && (g === 9 || sentences(s.say || s.ask).every(x => wordCount(x) <= 16))), e.steps.map(s => xwords(s.say || s.ask)));
  const unnamed = e.steps.filter(s => s.say).filter(s => { const l = benchLabel(s.on, g); return !l || !plain(s.say).includes(plain(l)); }).map(s => s.say + ' ⇏ ' + benchLabel(s.on, g));
  ok(`${t}: every instruction names the control it points at (the text on the glowing button)`, unnamed.length === 0, unnamed);
  ok(`${t}: every check ref is a Grade ${g} quiz question with 4 distinct options and a reason, the answer first`,
     e.check.every(ref => { const q = xQ(ref), qg = xQGrade(ref); return !!q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && !!q.why && (qg === null || qg === g); }), e.check);
  const r = replay(e);
  ok(`${t}: the set-up and the right path trip no hazard or "what went wrong" card`, r.cards.length === 0, r.cards);
  // A PSAC paper is quoted only if it is a real past-paper file with plant questions; the NCE 2024 paper only for its pondweed Question 5.
  const cites = [...new Set(String(e.exam).match(/PSAC \d{4}/g) || [])];
  ok(`${t}: the exam line quotes only papers the bank holds`, (g === 9 ? cites.length === 0 : cites.every(citeOk)) && !/Biology 20(?!24 Q5)/.test(e.exam) && !/20\d\d Q\d/.test(e.exam.replace('2024 Q5', '')), e.exam);
}
const g9pp = fs.readFileSync(path.join(ROOT, 'subjects', 'grade9-biology', 'questions', 'past_paper_2024.js'), 'utf8');
ok('the Biology 2024 Q5 pondweed investigation the Grade 9 experiments cite is really in the bank', /Question 5\./.test(g9pp) && /pond ?weed/i.test(g9pp) && /carbon dioxide/.test(g9pp));
ok('a wrong option is only HEARD by the bench: _expWrong sits at the top of _set() and _act(), and the runner\'s card explains',
   /function _act\(act\) \{\s*if \(_expWrong\(act\)\) \{ _guideEvent\(act\); return; \}/.test(bench) && /function _set\(k, v\) \{\s*if \(_expWrong\(k \+ ':' \+ v\)\) \{ _guideEvent\(k \+ ':' \+ v\); return; \}/.test(bench));
ok('the bench exports the experiment adapter (list, question, reset, apply, guide, stop, evidence, focus, selector, hooks)',
   ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('\\b' + k + ':').test(bench.slice(bench.indexOf('const experiment = {')))) && /return \{ study, experiment,/.test(bench));
ok('the bench hears every token before matching, matches `any`, hands Done to the runner, and never wipes an experiment\'s set-up',
   /experiment\.hooks\.token\(token, s\)/.test(bench) && /s\.any\.includes\(token\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /experiment\.hooks\.step\(_guide\.step\)/.test(bench) && /if \(!G\.exp\) _resetBench\(\);/.test(bench));
ok('focus is re-applied after every render of the tools and the shelf, and set-up runs silently (no toasts, no cards)',
   (bench.match(/_applyFocus\(\);/g) || []).length >= 3 && /if \(_silent\) return;/.test(bench) && /_silent = true;/.test(bench) && /if \(_silent\) return null; _hush\(\); return Labs\.resultCard/.test(bench));

// The See text of each experiment is what the models show - numbers and colours included.
const xr = id => replay(X.find(x => x.id === id));
const saw = id => X.find(x => x.id === id).see.saw;
let r = xr('g4_light');
ok('"Does a plant need light?": pot A green and strong, pot B pale yellow on a thin stem - and the See says so',
   r.pots && r.pots.A.healthy && r.pots.B.leaf === 'yellow' && r.pots.B.stem === 'thin' && /green and strong/.test(saw('g4_light')) && /pale yellow/.test(saw('g4_light')) && /thin/.test(saw('g4_light')), r.pots);
r = xr('g4_water');
ok('"Does a plant need water?": pot B brown, wilted, no growth; pot A grew 7 cm', r.pots && r.pots.B.leaf === 'brown' && r.pots.B.grew === 0 && r.pots.A.grew === 7 && /brown/.test(saw('g4_water')) && /7 cm/.test(saw('g4_water')), r.pots);
r = xr('g4_soil');
ok('"Does a plant need good soil?": pot B in sand grew 3 cm with pale leaves, pot A 7 cm', r.pots && r.pots.B.grew === 3 && r.pots.B.leaf === 'pale' && r.pots.A.grew === 7 && /3 cm/.test(saw('g4_soil')) && /pale green/.test(saw('g4_soil')) && /7 cm/.test(saw('g4_soil')), r.pots);
r = xr('g4_seeds');
ok('"What does a seed need to sprout?": only dish 1 sprouts; dry stays hard, the fridge is too cold, under water no air',
   r.seeds && [1, 2, 3, 4].map(i => r.seeds[i].sprouted).join() === 'true,false,false,false' && /hard and dry/.test(r.seeds[2].words) && /too cold/.test(r.seeds[3].words) && /no air/.test(r.seeds[4].words)
   && /Only dish 1 sprouted/.test(saw('g4_seeds')) && /stayed hard/.test(saw('g4_seeds')) && /swelled up/.test(saw('g4_seeds')), r.seeds);
r = xr('g4_root');
ok('"Which part of a seed comes out first?": the close look at sprouted dish 1 finds the root', r.look && r.found.has('g4_root') && /root came out first/.test(saw('g4_root')) && bench.includes('A white root came out first and grew down.'));
r = xr('g6_gases');
ok('"Which gas comes out of the waterweed?": 13 bubbles with baking soda at 30 cm, none in boiled water', r.counts.join() === '13,0' && /13 bubbles/.test(saw('g6_gases')) && /none/.test(saw('g6_gases')), r.counts);
r = xr('g6_light');
ok('"Can a plant make food in the dark?": 13 bubbles, then not one with the lamp off', r.counts.join() === '13,0' && /13 bubbles/.test(saw('g6_light')) && /not one bubble/.test(saw('g6_light')), r.counts);
r = xr('g6_closer');
ok('"Does brighter light mean more bubbles?": 5 at 50 cm, 30 at 20 cm', r.counts.join() === '5,30' && /5 bubbles/.test(saw('g6_closer')) && /30/.test(saw('g6_closer')), r.counts);
r = xr('g6_leaves');
ok('"Which part of the plant makes the food?": no leaves, no growth; pot A 7 cm', r.pots && r.pots.B.grew === 0 && r.pots.B.leaf === 'none' && r.pots.A.grew === 7 && /did not grow/.test(saw('g6_leaves')) && /7 cm/.test(saw('g6_leaves')), r.pots);
r = xr('g6_dark');
ok('"Does a plant need light to make food?": pot B pale yellow and thin, pot A 7 cm', r.pots && r.pots.B.leaf === 'yellow' && r.pots.B.stem === 'thin' && r.pots.A.grew === 7 && /pale yellow/.test(saw('g6_dark')) && /7 cm/.test(saw('g6_dark')), r.pots);
r = xr('g9_needs');
ok('"What does pondweed need to make oxygen?": 30 per minute with both, 0 without carbon dioxide, 0 without light', r.counts.join() === '30,0,0' && /30 bubbles/.test(saw('g9_needs')) && /none/.test(saw('g9_needs')), r.counts);
r = xr('g9_limit');
ok('"Which factor is holding the rate back?": 10 at 20 cm, still 10 at 10 cm, 31 with sodium hydrogencarbonate - the plateau and the boost', r.counts.join() === '10,10,31' && r.found.has('plateau') && r.found.has('co2_boost') && /10 bubbles/.test(saw('g9_limit')) && /31/.test(saw('g9_limit')), { counts: r.counts, found: [...r.found] });
r = xr('g9_variegated');
ok('"Does a leaf need chlorophyll to make starch?": blue-black where green, orange-brown where white', r.leaf === 'Blue-black where the leaf was green, orange-brown where it was white.' && /green middle turned blue-black/.test(saw('g9_variegated')) && /white edges stayed orange-brown/.test(saw('g9_variegated')), r.leaf);
r = xr('g9_foil');
ok('"Does a leaf need light to make starch?": blue-black in the light, orange-brown under the foil', r.leaf === 'Blue-black where the leaf had light, orange-brown under the foil.' && /Blue-black where the leaf had light/.test(saw('g9_foil')) && /Orange-brown under the foil/.test(saw('g9_foil')), r.leaf);
r = xr('g9_oxygen');
ok('"Is the gas from the pondweed oxygen?": 31 bubbles collect enough gas and the splint relights', r.counts.join() === '31' && r.splint === true && /31 bubbles/.test(saw('g9_oxygen')) && /relit/.test(saw('g9_oxygen')), r);
// The wrong options really are what their cards say.
ok('wrong options tell the truth: a hot lamp is a hazard, a flood rots the roots, a dim lamp still bubbles, pond water still bubbles, 40 cm is dimmer, 45 °C is slower, no shield heats the water',
   (P.potCheck(4, S2({}, { spot: 'lamp' })) || {}).hazard === 'hot_lamp' && (P.potCheck(4, S2({}, { drink: 'flood' })) || {}).card === 'flood'
   && P.weedRun({ dist: 50, lampOn: true, water: 'soda' }).bubbles > 0 && P.countRun(cond({ dist: 20, water: 'low' })).bubbles > 0
   && P.light(40, true) < P.light(20, true) && P.rate(cond({ dist: 10, temp: 45 })) < P.rate(cond({ dist: 10, temp: 25 })) && P.countRun(cond({ dist: 10, shield: false })).heated
   && P.starchReading(['boil', 'iodine']) === 'masked' && /_hazard\('ethanol_lit'\)/.test(bench) && /_hazard\('ethanol_flame'\)/.test(bench));
// Reading level: Grades 4 and 6 read like the rest of the primary level, and nothing from the starch bench leaks in.
const xt = [];
for (const e of X.filter(e => e.grades[0] < 9)) {
  xt.push(e.title, e.aim, e.predict.q, ...e.predict.options.flatMap(o => [o.label, o.sub || '']), e.see.saw, e.see.learn, e.exam);
  e.steps.forEach(s => { xt.push(s.say || s.ask); Object.values(s.wrong || {}).forEach(w => xt.push(w)); });
  e.check.filter(c => typeof c === 'object').forEach(q => xt.push(q.q, q.why, ...q.options));
}
const xlong = xt.flatMap(sentences).filter(s => wordCount(s) > 16);
ok(`experiments at Grades 4 and 6: every sentence is 16 words or fewer (${xt.length} texts)`, xlong.length === 0, xlong);
ok('experiments at Grades 4 and 6: no iodine, ethanol, Bunsen or starch test', xt.every(t => !/iodine|ethanol|alcohol|bunsen|starch test/i.test(t)));
const xinline = X.flatMap(e => e.check.filter(c => typeof c === 'object').map(c => c.q));
ok('no inline check question repeats a mission question or another inline one', new Set(xinline).size === xinline.length && !xinline.some(q => P.MISSIONS.some(M => M.quiz.some(x => x.q === q))));
ok('no two grades share a check question', (() => { const by = {}; X.forEach(e => { by[e.grades[0]] = by[e.grades[0]] || new Set(); e.check.forEach(c => by[e.grades[0]].add(xQ(c).q)); });
   const gs = Object.keys(by); return gs.every((a, i) => gs.slice(i + 1).every(b => [...by[a]].every(q => !by[b].has(q)))); })());

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
