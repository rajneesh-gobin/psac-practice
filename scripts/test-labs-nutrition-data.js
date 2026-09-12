'use strict';
// Science Labs: the science the Nutrition Lab (PSAC Grade 6) is allowed to show.
//
// Checks: every food belongs to exactly one of the five groups; the food test
// colour changes are consistent (positive/negative); balanced plate needs all 5
// groups; every discovery has a valid recipe that leads to its own id with no
// mistake card; every guide runs clean; every mission has 5 questions with 4
// distinct options; every hazard and result card has all required fields; grades
// are tagged; and sentences stay short (≤15 words) for a Grade 6 reader.
//
// Run:  node scripts/test-labs-nutrition-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_nutrition_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_nutrition.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabNutritionData = LabNutritionData;', ctx);
const P = ctx.LabNutritionData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Token validator ────────────────────────────────────────────────────────────
const tokenOk = on => {
  const [k, v] = on.split(':');
  if (v !== undefined) return !!P.SETS[k] && P.SETS[k].includes(v);
  return P.ACTS.includes(on);
};

// ── Recipe runner ──────────────────────────────────────────────────────────────
// A minimal model of the bench state. Returns { found: Set, cards: [] }.
function runRecipe(how) {
  const state = { station: 'meal', plate: {}, activeTest: null, testedFoods: [], tappedTeeth: new Set() };
  P.GROUP_IDS.forEach(g => { state.plate[g] = null; });
  const found = new Set(), cards = [];

  const GROUP_DISC = { carbs: 'carbs_energy', protein: 'protein_repair', fat: 'fat_store', vitamins: 'vit_protect', water: 'water_life' };
  const TOOTH_DISC = { incisor: 'incisor_cuts', canine: 'canine_tears', premolar: 'premolar_crush', molar: 'molar_grind' };
  const TEST_DISC  = { iodine: 'starch_iodine', biuret: 'protein_biuret', grease: 'fat_spot' };

  for (const token of how) {
    const [k, v] = token.split(':');
    if (k === 'station') { state.station = v; continue; }
    if (k === 'food') {
      const group = P.foodGroup(v);
      if (group && state.plate[group] === null) {
        state.plate[group] = v;
        if (GROUP_DISC[group]) found.add(GROUP_DISC[group]);
      }
      state.testedFoods.push(v);
      continue;
    }
    if (k === 'test') { state.activeTest = v; continue; }
    if (k === 'tooth') {
      state.tappedTeeth.add(v);
      if (TOOTH_DISC[v]) found.add(TOOTH_DISC[v]);
      continue;
    }
    if (token === 'check') {
      if (P.isBalanced(state.plate)) found.add('balanced_plate');
      else cards.push('missing_group');
      continue;
    }
    if (token === 'read') {
      if (state.activeTest) {
        const key = TEST_DISC[state.activeTest];
        const anyPos = state.testedFoods.some(f => { const r = P.testResult(state.activeTest, f); return r && r.positive; });
        if (key && anyPos) found.add(key);
      }
      continue;
    }
    if (token === 'label') {
      if (state.tappedTeeth.size >= 4) found.add('dental_health');
      else found.add('dental_acid');
      continue;
    }
    if (token === 'reset') {
      P.GROUP_IDS.forEach(g => { state.plate[g] = null; });
      state.activeTest = null; state.testedFoods = []; state.tappedTeeth.clear();
      continue;
    }
  }
  return { found, cards };
}

// ── Food groups ────────────────────────────────────────────────────────────────
console.log('\nFood groups');
ok('GROUP_IDS has exactly 5 groups', P.GROUP_IDS.length === 5 && JSON.stringify(P.GROUP_IDS) === '["carbs","protein","fat","vitamins","water"]');
ok('every food belongs to a known group', P.FOOD_IDS.every(id => P.GROUP_IDS.includes(P.FOODS[id].group)), P.FOOD_IDS.filter(id => !P.GROUP_IDS.includes(P.FOODS[id].group)));
ok('at least 2 foods per group', P.GROUP_IDS.every(g => P.FOOD_IDS.filter(id => P.FOODS[id].group === g).length >= 2), P.GROUP_IDS.filter(g => P.FOOD_IDS.filter(id => P.FOODS[id].group === g).length < 2));
ok('SHELF_FOODS covers all 5 groups', P.GROUP_IDS.every(g => P.SHELF_FOODS.some(id => P.FOODS[id] && P.FOODS[id].group === g)));
ok('FOOD_GROUPS has all 5 keys', P.GROUP_IDS.every(g => !!P.FOOD_GROUPS[g] && P.FOOD_GROUPS[g].function && P.FOOD_GROUPS[g].deficiency));

// ── Balanced-plate logic ───────────────────────────────────────────────────────
console.log('\nBalanced plate logic');
const fullPlate = {}, emptyPlate = {};
P.GROUP_IDS.forEach(g => { fullPlate[g] = P.FOOD_IDS.find(id => P.FOODS[id].group === g); emptyPlate[g] = null; });
ok('isBalanced is true when all groups filled', P.isBalanced(fullPlate));
ok('isBalanced is false when any group is null', !P.isBalanced(emptyPlate));
ok('missingGroups returns all 5 when plate is empty', P.missingGroups(emptyPlate).length === 5);
ok('missingGroups returns 0 when plate is full', P.missingGroups(fullPlate).length === 0);
const partialPlate = Object.assign({}, emptyPlate, { carbs: 'bread' });
ok('missingGroups returns 4 when only carbs filled', P.missingGroups(partialPlate).length === 4);

// ── Food tests ─────────────────────────────────────────────────────────────────
console.log('\nFood tests');
ok('TEST_IDS has 4 tests', P.TEST_IDS.length === 4 && P.TEST_IDS.join() === 'iodine,benedict,biuret,grease');
ok('iodine positive on bread, rice, potato (starch foods)', ['bread', 'rice', 'potato'].every(f => P.testResult('iodine', f) && P.testResult('iodine', f).positive), ['bread', 'rice', 'potato'].filter(f => !(P.testResult('iodine', f) && P.testResult('iodine', f).positive)));
ok('iodine negative on orange and butter', ['orange', 'butter'].every(f => P.testResult('iodine', f) && !P.testResult('iodine', f).positive));
ok('biuret positive on egg and meat (protein)', ['egg', 'meat'].every(f => P.testResult('biuret', f) && P.testResult('biuret', f).positive));
ok('grease positive on butter and oil (fat)', ['butter', 'oil'].every(f => P.testResult('grease', f) && P.testResult('grease', f).positive));
ok('iodine negative on water_g', !P.testResult('iodine', 'water_g').positive);
ok('testResult returns null for unknown food', P.testResult('iodine', 'xyz') === null);

// ── Teeth ──────────────────────────────────────────────────────────────────────
console.log('\nTeeth');
ok('TOOTH_IDS has 4 types', P.TOOTH_IDS.length === 4 && P.TOOTH_IDS.join() === 'incisor,canine,premolar,molar');
ok('counts add up to 32', P.TOOTH_IDS.reduce((s, t) => s + P.TEETH[t].count, 0) === P.TOTAL_TEETH, P.TOOTH_IDS.map(t => P.TEETH[t].count));
ok('JAW_SLOTS has 7 entries covering all 4 types', P.JAW_SLOTS.length === 7 && P.TOOTH_IDS.every(t => P.JAW_SLOTS.includes(t)));
ok('every tooth has name, shape, position and function', P.TOOTH_IDS.every(t => P.TEETH[t].name && P.TEETH[t].shape && P.TEETH[t].position && P.TEETH[t].function));

// ── Grades ────────────────────────────────────────────────────────────────────
console.log('\nGrades');
ok('GRADES is [6]', JSON.stringify(P.GRADES) === '[6]');
const all = [].concat(P.GUIDES, P.MISSIONS, P.DISCOVERIES);
const untagged = all.filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => P.GRADES.includes(g)));
ok('every guide, mission and discovery is tagged grades: [6]', untagged.length === 0, untagged.map(x => x.id));

// ── Discoveries ────────────────────────────────────────────────────────────────
console.log('\nDiscoveries');
const dids = P.DISCOVERIES.map(d => d.id);
ok('at least 10 discoveries, ids unique', dids.length >= 10 && new Set(dids).size === dids.length, dids.length);
const badDisc = P.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery has title, icon, hint, saw, learn and a valid recipe', badDisc.length === 0, badDisc.map(d => d.id + ' bad tokens: ' + (d.how || []).filter(t => !tokenOk(t))));

const unsolved = P.DISCOVERIES.map(d => ({ d, r: runRecipe(d.how) }))
  .filter(x => !x.r.found.has(x.d.id) || x.r.cards.length > 0)
  .map(x => x.d.id + ' -> found [' + [...x.r.found].join('/') + ']' + (x.r.cards.length ? ' cards ' + x.r.cards.join('/') : ''));
ok('every recipe leads to its own discovery with no mistake card', unsolved.length === 0, unsolved);

const reachable = new Set();
P.DISCOVERIES.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every reachable id is a real discovery id', [...reachable].every(x => dids.includes(x)), [...reachable].filter(x => !dids.includes(x)));

// ── Guided experiments ─────────────────────────────────────────────────────────
console.log('\nGuided experiments');
ok('at least 3 guides, ids unique', P.GUIDES.length >= 3 && new Set(P.GUIDES.map(g => g.id)).size === P.GUIDES.length);
for (const G of P.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(G.title + ': every step has a valid token, say and btn', badS.length === 0, badS.map(s => s.on));
  const r = runRecipe(G.steps.map(s => s.on));
  ok(G.title + ': runs with no mistake card', !!(G.lesson && G.blurb && G.icon) && r.cards.length === 0, r.cards);
}

// ── Missions ───────────────────────────────────────────────────────────────────
console.log('\nMissions');
ok('at least 2 missions', P.MISSIONS.length >= 2);
for (const M of P.MISSIONS) {
  const badQ = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(M.title + ': ' + M.quiz.length + ' questions, each with 4 distinct options and a reason', M.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(M.title + ': has blurb, intro and icon', !!(M.blurb && M.intro && M.icon));
}

// ── Hazards and result cards ───────────────────────────────────────────────────
console.log('\nHazards and result cards');
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard', 'warning', 'sharp', 'goggles'];
const rctx = { food: 'butter' };
for (const [id, H] of Object.entries(P.HAZARDS)) {
  ok('hazard ' + id + ': signs, title, happened, why, instead, exam',
     H.signs.length > 0 && H.signs.every(s => SIGNS.includes(s)) && !!H.title() && !!H.happened() && !!H.why && !!H.instead && !!H.exam,
     { signs: H.signs.filter(s => !SIGNS.includes(s)) });
}
for (const [id, R] of Object.entries(P.RESULTS)) {
  ok('result card ' + id + ': icon, title, happened, instead, exam',
     !!(R.icon && R.title && R.happened(rctx) && R.instead && R.exam));
}
ok('at least 3 mistakes that teach', Object.keys(P.HAZARDS).length + Object.keys(P.RESULTS).length >= 3);
ok('missing_group hazard fires when meal is incomplete', runRecipe(['food:bread', 'check']).cards.includes('missing_group'));

// ── Coach facts ────────────────────────────────────────────────────────────────
console.log('\nCoach facts');
ok('at least 10 facts, all non-trivial strings', P.FACTS.length >= 10 && P.FACTS.every(f => typeof f === 'string' && f.length > 20));

// ── Reading level (Grade 6) ────────────────────────────────────────────────────
console.log('\nReading level (Grade 6)');
const texts = [];
P.GUIDES.forEach(G => { texts.push(G.blurb, G.lesson); G.steps.forEach(s => texts.push(s.say)); });
P.DISCOVERIES.forEach(d => texts.push(d.hint, d.saw, d.learn));
P.MISSIONS.forEach(M => { texts.push(M.blurb, M.intro); M.quiz.forEach(q => texts.push(q.q, q.why)); });
Object.values(P.HAZARDS).forEach(H => texts.push(H.title(), H.happened(), H.why, H.instead, H.exam));
Object.values(P.RESULTS).forEach(R => texts.push(R.title, R.happened(rctx), R.instead, R.exam));
texts.push(...P.FACTS, ...Object.values(P.SAY));
Object.values(P.FOOD_GROUPS).forEach(g => texts.push(g.function, g.deficiency));
const long = [];
texts.filter(Boolean).forEach(t => {
  t.split(/(?<=[.!?])\s+/).forEach(sn => {
    const n = (sn.match(/\S+/g) || []).length;
    if (n > 15) long.push(n + ': ' + sn);
  });
});
ok('no sentence is longer than 15 words', long.length === 0, long.slice(0, 5));

// ── Engineering ────────────────────────────────────────────────────────────────
console.log('\nEngineering');
ok('no regex lookbehind in the lab files', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('data file exports global to window', /window\.LabNutritionData = LabNutritionData/.test(src));
ok('bench file exports global to window', /window\.LabNutrition = LabNutrition/.test(bench));
ok('bench never records answers into mastery', !/recordAnswer|_recordDaily/.test(bench));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
