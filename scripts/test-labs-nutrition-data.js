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
// A minimal model of the bench (lab_nutrition.js) - the same rules, with no
// canvas: a food lands in its group's section only while a test is not
// running and the section is empty; while a test runs, tapping a food tests
// it; Read closes the test and keeps the readings; Label reads the jaw.
// Returns { found: Set, cards: [], state, errs: [] }.
function runRecipe(how) {
  const state = { station: 'meal', plate: {}, activeTest: null, testedFoods: [], reads: [], tappedTeeth: new Set(), checked: null, labelled: null };
  P.GROUP_IDS.forEach(g => { state.plate[g] = null; });
  const found = new Set(), cards = [], errs = [];

  const GROUP_DISC = { carbs: 'carbs_energy', protein: 'protein_repair', fat: 'fat_store', vitamins: 'vit_protect', water: 'water_life' };
  const TOOTH_DISC = { incisor: 'incisor_cuts', canine: 'canine_tears', premolar: 'premolar_crush', molar: 'molar_grind' };
  const TEST_DISC  = { iodine: 'starch_iodine', biuret: 'protein_biuret', grease: 'fat_spot' };

  for (const token of how) {
    const [k, v] = token.split(':');
    if (k === 'station') { state.station = v; continue; }
    if (k === 'food') {
      if (state.activeTest) {
        if (!state.testedFoods.includes(v)) state.testedFoods.push(v);
        continue;
      }
      const group = P.foodGroup(v);
      if (group && state.plate[group] === null) {
        state.plate[group] = v;
        if (GROUP_DISC[group]) found.add(GROUP_DISC[group]);
      } else errs.push(`${token}: the ${group} section already holds ${state.plate[group]}`);
      continue;
    }
    if (k === 'test') { state.activeTest = v; state.testedFoods = []; continue; }
    if (k === 'tooth') {
      state.tappedTeeth.add(v);
      if (TOOTH_DISC[v]) found.add(TOOTH_DISC[v]);
      continue;
    }
    if (token === 'check') {
      state.checked = P.isBalanced(state.plate);
      if (state.checked) found.add('balanced_plate');
      else cards.push('missing_group');
      continue;
    }
    if (token === 'read') {
      if (!state.activeTest || !state.testedFoods.length) { errs.push('read with nothing tested'); continue; }
      const key = TEST_DISC[state.activeTest];
      state.reads = state.testedFoods.map(f => Object.assign({ test: state.activeTest, food: f }, P.testResult(state.activeTest, f)));
      if (key && state.reads.some(r => r.positive)) found.add(key);
      state.activeTest = null;
      continue;
    }
    if (token === 'label') {
      state.labelled = state.tappedTeeth.size >= 4 ? 'all' : 'some';
      if (state.labelled === 'all') found.add('dental_health');
      else found.add('dental_acid');
      continue;
    }
    if (token === 'reset') {
      P.GROUP_IDS.forEach(g => { state.plate[g] = null; });
      state.activeTest = null; state.testedFoods = []; state.reads = []; state.tappedTeeth.clear();
      continue;
    }
  }
  return { found, cards, state, errs };
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
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say);
  ok(G.title + ': every step has a valid token and say', badS.length === 0, badS.map(s => s.on));
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
(P.EXPERIMENTS || []).forEach(e => {
  texts.push(e.title, e.aim, e.see.saw, e.see.learn, e.exam, e.predict.q);
  e.predict.options.forEach(o => texts.push(o.label, o.sub));
  e.steps.forEach(s => { texts.push(s.say, s.ask); Object.values(s.wrong || {}).forEach(w => texts.push(w)); });
  e.check.forEach(c => { if (typeof c === 'object') texts.push(c.q, c.why, ...c.options); });
});
const long = [];
texts.filter(Boolean).forEach(t => {
  t.split(/(?<=[.!?])\s+/).forEach(sn => {
    const n = (sn.match(/\S+/g) || []).length;
    if (n > 15) long.push(n + ': ' + sn);
  });
});
ok('no sentence is longer than 15 words', long.length === 0, long.slice(0, 5));

// ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ───────────────────────────
console.log('\nExperiments (lab_experiment.js)');
const EX = P.EXPERIMENTS;
ok('EXPERIMENTS is exported', Array.isArray(EX) && EX.length > 0);
const ex6 = P.forGrade(EX || [], 6);
ok(`3 to 5 experiments at Grade 6 (${ex6.length})`, ex6.length >= 3 && ex6.length <= 5);
ok('experiment ids are unique', new Set(EX.map(e => e.id)).size === EX.length);
ok('every experiment teaches g6-animals at Grade 6 only', EX.every(e => e.chapter === 'g6-animals' && Array.isArray(e.grades) && e.grades.join() === '6'));
// The bench's visible labels (lab_nutrition.js: _shellHTML, _renderShelf, _renderTools).
const CONTROL_LABEL = { check: 'Check my meal', read: 'Read', label: 'Label teeth', 'station:meal': 'Meal Builder', 'station:teeth': 'Teeth Lab' };
const labelFor = tok => {
  const [k, v] = tok.split(':');
  if (k === 'food') return P.FOODS[v].name;
  if (k === 'tooth') return P.TEETH[v].name;
  if (k === 'test') return P.FOOD_TESTS[v].short;
  return CONTROL_LABEL[tok];
};
ok('every bench label the test relies on is really in the bench markup',
   ['Check my meal', 'Read', 'Label teeth', 'Meal Builder', 'Teeth Lab'].every(l => bench.includes(l)) && /data-act="read"/.test(bench) && /data-act="label"/.test(bench) && /data-tooth=/.test(bench));
const plain = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
const stepToks = s => s.options || s.any || (s.on ? [s.on] : []);
const optLabel = o => (typeof o === 'object' ? o.label : o);
// What the See must state, and what the replayed bench must really hold.
const SEE_TRUE = {
  energy_food:   (st, saw) => st.plate.carbs === 'bread' && st.plate.protein === 'egg' && st.plate.vitamins === 'orange'
                              && ['bread', 'egg', 'orange', 'carbs', 'protein', 'vitamins'].every(w => saw.includes(w)),
  balanced_meal: (st, saw) => st.checked === true && P.isBalanced(st.plate) && /five/.test(saw) && /balanced/.test(saw),
  starch_iodine: (st, saw) => ['bread', 'rice'].every(f => st.reads.some(r => r.food === f && r.positive && r.word === 'blue-black'))
                              && ['orange', 'butter'].every(f => st.reads.some(r => r.food === f && !r.positive && r.word === 'orange-brown'))
                              && ['bread', 'rice', 'orange', 'butter', 'blue-black', 'orange-brown'].every(w => saw.includes(w)),
  teeth_jobs:    (st, saw) => P.TOOTH_IDS.every(t => st.tappedTeeth.has(t)) && st.labelled === 'all' && P.TOOTH_IDS.every(t => saw.includes(t)),
};
ok('every experiment has a See-truth rule in this test', EX.every(e => typeof SEE_TRUE[e.id] === 'function'), EX.map(e => e.id).filter(id => !SEE_TRUE[id]));
for (const e of EX) {
  const t = e.id;
  ok(`${t}: the title is a question a child can say back, and the aim is short`, /\?$/.test(e.title) && e.title.length <= 60 && e.aim.length >= 20 && e.aim.length <= 200, { title: e.title, aim: e.aim.length });
  const badSetup = e.setup.filter(on => !tokenOk(on));
  ok(`${t}: every set-up token is one the bench performs`, badSetup.length === 0, badSetup);
  const badStep = e.steps.filter(s => !stepToks(s).every(tokenOk) || !(s.say || s.ask));
  ok(`${t}: every step token is real and each step says or asks something`, badStep.length === 0, badStep);
  ok(`${t}: 1 to 5 steps, each under 25 words`, e.steps.length >= 1 && e.steps.length <= 5 && e.steps.every(s => String(s.say || s.ask).split(/\s+/).length <= 25), e.steps.map(s => String(s.say || s.ask).split(/\s+/).length));
  const asks = e.steps.filter(s => s.ask);
  ok(`${t}: every ask lists its answer among 2+ options, and every wrong option is a listed, different option that explains itself`,
     asks.every(s => Array.isArray(s.options) && s.options.length >= 2 && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on))
       && Object.keys(s.wrong || {}).every(k => s.options.includes(k) && k !== s.on && !(s.any || []).includes(k) && s.wrong[k].length > 15)), asks);
  ok(`${t}: at least one step is a decision`, asks.length >= 1);
  const unnamed = e.steps.filter(s => s.say && s.on).filter(s => !plain(s.say).includes(plain(labelFor(s.on))));
  ok(`${t}: every instruction names the control it points at`, unnamed.length === 0, unnamed.map(s => s.say + ' <- ' + labelFor(s.on)));
  // Replay the set-up and the right answer of every step through the model.
  const r = runRecipe(e.setup.concat(e.steps.map(s => s.any ? s.any[0] : s.on)));
  ok(`${t}: the set-up and the right path work on the bench (no full section, no empty read)`, r.errs.length === 0 && r.cards.length === 0, { errs: r.errs, cards: r.cards });
  ok(`${t}: the See is TRUE for what the bench ends up holding`, SEE_TRUE[t] && SEE_TRUE[t](r.state, e.see.saw.toLowerCase()), { saw: e.see.saw, plate: r.state.plate, reads: r.state.reads.map(x => x.food + ':' + x.word), teeth: [...r.state.tappedTeeth], labelled: r.state.labelled, checked: r.state.checked });
  // Every OTHER right answer of an `any` step must also work (the child may pick any).
  const anyPaths = e.steps.flatMap((s, i) => (s.any || []).slice(1).map(tok => e.setup.concat(e.steps.map((x, j) => j === i ? tok : (x.any ? x.any[0] : x.on)))));
  ok(`${t}: every alternative right answer also reaches a true See (${anyPaths.length} paths)`, anyPaths.every(p => { const rr = runRecipe(p); return rr.errs.length === 0 && rr.cards.length === 0 && SEE_TRUE[t](rr.state, e.see.saw.toLowerCase()); }));
  ok(`${t}: See says what was learnt`, typeof e.see.learn === 'string' && e.see.learn.length > 20);
  const p = e.predict;
  ok(`${t}: the prediction has 2-4 tappable options and its answer is one of them`, p && p.options.length >= 2 && p.options.length <= 4 && p.options.every(o => o.id && o.label) && p.options.some(o => o.id === p.answer), p);
  const qs = e.check.map(ref => typeof ref === 'object' ? ref : (M => M && M.quiz[+ref.split(':')[1]])(P.MISSIONS.find(M => M.id === ref.split(':')[0])));
  ok(`${t}: 2-3 check questions resolve, each with 4 distinct options and a reason`,
     e.check.length >= 2 && e.check.length <= 3 && qs.every(q => q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options.map(optLabel)).size === 4 && q.why), e.check.map(r => typeof r === 'object' ? 'inline' : r));
  ok(`${t}: an exam line`, typeof e.exam === 'string' && e.exam.length > 10);
}
// A paper is quoted only if that year's PSAC file holds a g6-animals item.
const fsq = require('node:fs');
const years = [...new Set((src.match(/PSAC (20\d\d)/g) || []).map(m => m.slice(5)))];
ok(`every PSAC year quoted (${years.join(', ')}) is a paper in the question files with a g6-animals item`,
   years.length > 0 && years.every(y => { const f = path.join(ROOT, 'subjects', 'grade6-science', 'questions', `past_paper_${y}.js`); return fsq.existsSync(f) && /g6-animals/.test(fsq.readFileSync(f, 'utf8')); }), years);
ok('no question number is quoted (the files carry years, not numbering)', !/PSAC 20\d\d Q\d/.test(src));
ok('experiment 1 is the exam-shaped one: energy / growth / health foods on the plate', EX[0] && EX[0].id === 'energy_food' && EX[0].steps.length === 3 && EX[0].steps.every(s => s.ask));
ok('the teeth experiment uses tappable tooth controls, never a canvas position', (e => e && e.steps.every(s => stepToks(s).every(tok => /^tooth:|^label$/.test(tok))))(EX.find(e => e.id === 'teeth_jobs')));
const inline = EX.flatMap(e => e.check.filter(r => typeof r === 'object').map(r => r.q));
ok('no inline check question repeats a mission question or another inline one', new Set(inline).size === inline.length && !inline.some(q => P.MISSIONS.some(M => M.quiz.some(x => x.q === q))));
ok('every discovery, guide and mission still runs in Explore (nothing removed for the experiments)', P.GUIDES.length >= 3 && P.MISSIONS.length >= 2 && P.DISCOVERIES.length >= 15);

// ── Engineering ────────────────────────────────────────────────────────────────
console.log('\nEngineering');
ok('no regex lookbehind in the lab files', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('data file exports global to window', /window\.LabNutritionData = LabNutritionData/.test(src));
ok('bench file exports global to window', /window\.LabNutrition = LabNutrition/.test(bench));
ok('bench never records answers into mastery', !/recordAnswer|_recordDaily/.test(bench));
ok('the bench exports the experiment adapter (list, question, reset, apply, guide, stop, evidence, focus, selector, hooks)',
   ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('\\b' + k + ':').test(bench.slice(bench.indexOf('const experiment = {')))) && /return \{ study, experiment,/.test(bench));
ok('the bench hears every token before matching, matches `any`, hands Done to the runner and never resets an exp guide',
   /experiment\.hooks\.token\(token, s\)/.test(bench) && /s\.any\.includes\(token\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /experiment\.hooks\.step\(_guideStep\)/.test(bench) && /if \(!G\.exp\) \{/.test(bench));
ok('a wrong option is heard, not acted on, in every bench action', ['food:', 'tooth:', 'test:', 'station:', "'check'", "'read'", "'label'"].every(k => bench.includes(`_expWrong(${k}`) || bench.includes(`_expWrong('${k.replace(/'/g, '')}`)), null);
ok('experiment.reset() shows every control again (focus cleared), whatever the runner hid last',
   /reset: \(\) => \{[\s\S]*?_focus = null;[\s\S]*?_renderShelf\(\)/.test(bench.slice(bench.indexOf('const experiment = {'))));
ok('no result or hazard card opens on Check during an experiment (the See states it)', /if \(!_expOn\(\)\) Labs\.resultCard/.test(bench) && /if \(!_expOn\(\)\) Labs\.hazardCard/.test(bench));
ok('the mission quiz keeps the shell contract fixed on 2026-09-19 (Labs.quiz(questions, { title, onDone }) and Labs.missionDone({ … }))',
   /Labs\.quiz\(M\.quiz, \{ title: M\.title, onDone: r => \{/.test(bench) && /Labs\.missionDone\(\{ icon: M\.icon/.test(bench) && !/Labs\.quiz\(M\.quiz, M\./.test(bench) && !/Labs\.missionDone\(M\.icon/.test(bench));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
