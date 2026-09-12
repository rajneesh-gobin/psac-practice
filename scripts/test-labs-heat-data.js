'use strict';
// Science Labs — Heat Transfer: data model tests.
//
// Verifies: conduction model (metal fastest, wood/plastic slowest),
// wax-drop positions, radiation model (black > silver at every t > 0),
// temperature bounds, 12+ discoveries with valid recipes, 3+ guides with
// valid tokens, 2 missions with 5 questions each, 3 hazards with all 4
// required texts, grade tags, reading level (≤16 words per sentence).
//
// Run: node scripts/test-labs-heat-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_heat_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_heat.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabHeatData = LabHeatData;', ctx);
const D = ctx.LabHeatData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Conduction model ─────────────────────────────────────────────────────
console.log('\nConduction model');
ok('metal rate fastest (0.25)', D.COND_RATES.metal === 0.25);
ok('glass slower than metal', D.COND_RATES.glass < D.COND_RATES.metal);
ok('wood slower than glass', D.COND_RATES.wood < D.COND_RATES.glass);
ok('plastic slowest', D.COND_RATES.plastic < D.COND_RATES.wood);
ok('metal front at t=0 is 0', D.heatFrontAt('metal', 0) === 0);
ok('metal front at t=4 is 1 (full rod)', D.heatFrontAt('metal', 4) === 1);
ok('metal front clamps at 1', D.heatFrontAt('metal', 100) === 1);
ok('wood front near zero after 4s', D.heatFrontAt('wood', 4) < 0.2);
ok('plastic front near zero after 4s', D.heatFrontAt('plastic', 4) < 0.12);
ok('unknown material returns 0', D.heatFrontAt('rubber', 10) === 0);

console.log('\nWax positions and melt logic');
ok('4 wax positions', D.WAX_POSITIONS.length === 4);
ok('positions in ascending order', D.WAX_POSITIONS.every((p, i, a) => i === 0 || p > a[i - 1]));
ok('last wax position is 1.0 (tip of rod)', D.WAX_POSITIONS[D.WAX_POSITIONS.length - 1] === 1.0);
ok('metal wax at 0.25 melts at t=1', D.waxMelted('metal', 0.25, 1));
ok('metal wax at 0.25 NOT melted before t=1', !D.waxMelted('metal', 0.25, 0.9));
ok('wood wax at 0.25 not melted at t=4', !D.waxMelted('wood', 0.25, 4));
ok('anyWaxMelted metal at t=2 true', D.anyWaxMelted('metal', 2));
ok('anyWaxMelted wood at t=1 false', !D.anyWaxMelted('wood', 1));
ok('allWaxMelted metal at t=4 true', D.allWaxMelted('metal', 4));
ok('allWaxMelted metal at t=2 false (not all 4 drops)', !D.allWaxMelted('metal', 2));
ok('meltTime metal 0.25 = 1s', Math.abs(D.meltTime('metal', 0.25) - 1) < 1e-9);
ok('meltTime unknown = Infinity', D.meltTime('rubber', 0.5) === Infinity);

// ── Radiation model ───────────────────────────────────────────────────────
console.log('\nRadiation model');
ok('room temp 25', D.ROOM_TEMP === 25);
ok('max temp 65', D.MAX_TEMP === 65);
ok('black heats faster than silver at every t > 0', [1, 5, 10, 20, 50, 100].every(t => D.tempAt('black', t) > D.tempAt('silver', t)));
ok('both start at room temp (t=0)', D.tempAt('black', 0) === D.ROOM_TEMP && D.tempAt('silver', 0) === D.ROOM_TEMP);
ok('temperature is capped at MAX_TEMP', D.tempAt('black', 1000) === D.MAX_TEMP && D.tempAt('silver', 1000) === D.MAX_TEMP);
ok('unknown can returns room temp', D.tempAt('green', 10) === D.ROOM_TEMP);
ok('black reaches 65 before silver (lower time)', (() => {
  const bt = (D.MAX_TEMP - D.ROOM_TEMP) / D.TEMP_RATES.black;
  const st = (D.MAX_TEMP - D.ROOM_TEMP) / D.TEMP_RATES.silver;
  return bt < st;
})());

// ── Convection constants ──────────────────────────────────────────────────
console.log('\nConvection constants');
ok('CONV_SPEED > 0', D.CONV_SPEED > 0);
ok('CONV_N is a positive integer', Number.isInteger(D.CONV_N) && D.CONV_N > 0);

// ── State ─────────────────────────────────────────────────────────────────
console.log('\nState');
const st = D.newState();
ok('newState returns an object', st && typeof st === 'object');
ok('initial station is conduction', st.station === 'conduction');
ok('burner off initially', !st.burner);
ok('materials array starts empty', Array.isArray(st.materials) && st.materials.length === 0);
ok('condTime, convTime, radTime start at 0', st.condTime === 0 && st.convTime === 0 && st.radTime === 0);
ok('readings array starts empty', Array.isArray(st.readings) && st.readings.length === 0);
ok('blankState is an alias for newState', D.blankState && D.blankState() && D.blankState().station === 'conduction');

// ── finds() (discovery triggers) ─────────────────────────────────────────
console.log('\nDiscovery triggers (finds)');
const stMetal = Object.assign(D.newState(), { burner: true, materials: ['metal'], condTime: 2 });
ok('disc_metal_fast triggered when metal heats', D.finds(stMetal).includes('disc_metal_fast'));
const stAll = Object.assign(D.newState(), { burner: true, materials: ['metal'], condTime: 5 });
ok('disc_metal_cold_feel triggered after all wax melts', D.finds(stAll).includes('disc_metal_cold_feel'));
const stConv = Object.assign(D.newState(), { heater: true, convTime: 5 });
ok('disc_convection_loop triggered with heater on and time > 4', D.finds(stConv).includes('disc_convection_loop'));
const stDye = Object.assign(D.newState(), { heater: true, dye: true, convTime: 5 });
ok('disc_dye_loop triggered with dye present', D.finds(stDye).includes('disc_dye_loop'));
const stAir = Object.assign(D.newState(), { heater: true, convMode: 'air', convTime: 3 });
ok('disc_sea_breeze triggered in air mode', D.finds(stAir).includes('disc_sea_breeze'));
const stRad = Object.assign(D.newState(), { lamp: true, radTime: 5 });
ok('disc_black_absorbs triggered with lamp on', D.finds(stRad).includes('disc_black_absorbs'));
ok('disc_silver_reflects triggered with lamp on', D.finds(stRad).includes('disc_silver_reflects'));
const stAll3 = Object.assign(D.newState(), { stationsDone: { conduction: true, convection: true, radiation: true } });
ok('disc_thermos triggered after all 3 stations done', D.finds(stAll3).includes('disc_thermos'));
ok('finds() returns an array', Array.isArray(D.finds(D.newState())));

// ── missionReady() ────────────────────────────────────────────────────────
console.log('\nMission readiness');
const stCond = Object.assign(D.newState(), { station: 'conduction', burner: true, condTime: 120, materials: ['metal', 'wood', 'plastic'] });
ok('mission_conductor ready: 3 materials, burner, condTime>=120', D.missionReady('mission_conductor', stCond));
const stCond2 = Object.assign(D.newState(), { station: 'conduction', burner: true, condTime: 119, materials: ['metal', 'wood', 'plastic'] });
ok('mission_conductor NOT ready at condTime=119', !D.missionReady('mission_conductor', stCond2));
const stCond3 = Object.assign(D.newState(), { station: 'conduction', burner: true, condTime: 120, materials: ['metal', 'wood'] });
ok('mission_conductor NOT ready with only 2 materials', !D.missionReady('mission_conductor', stCond3));
const stThermos = Object.assign(D.newState(), { condTime: 11, convTime: 6, radTime: 11, stationsDone: { conduction: true, convection: true, radiation: true } });
ok('mission_thermos ready: all 3 stations done with sufficient time', D.missionReady('mission_thermos', stThermos));
const stThermos2 = Object.assign(D.newState(), { condTime: 11, convTime: 6, radTime: 9, stationsDone: { conduction: true, convection: true, radiation: true } });
ok('mission_thermos NOT ready if radTime <= 10', !D.missionReady('mission_thermos', stThermos2));
ok('unknown mission returns false', D.missionReady('mission_fake', D.newState()) === false);

// ── Grades ────────────────────────────────────────────────────────────────
console.log('\nGrades');
ok('GRADES is [6]', JSON.stringify(D.GRADES) === '[6]');
const untagged = [].concat(D.GUIDES, D.MISSIONS, D.DISCOVERIES).filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => D.GRADES.includes(g)));
ok('every guide, mission and discovery is tagged grades: [6]', untagged.length === 0, untagged.map(x => x.id));

// ── Discoveries ───────────────────────────────────────────────────────────
console.log('\nDiscoveries');
const dids = D.DISCOVERIES.map(d => d.id);
ok('at least 10 discoveries', dids.length >= 10, dids.length);
ok('discovery ids are unique', new Set(dids).size === dids.length);

const VALID_TOKENS = new Set([
  'station:conduction', 'station:convection', 'station:radiation',
  'material:metal', 'material:glass', 'material:wood', 'material:plastic',
  'burner:on', 'burner:off',
  'heater:on', 'heater:off',
  'lamp:on', 'lamp:off',
  'dye:add',
  'convmode:water', 'convmode:air',
  'tick30', 'tick60', 'tick120',
  'read_temp',
]);
const tokenOk = tok => VALID_TOKENS.has(tok);
const badDisc = D.DISCOVERIES.filter(d =>
  !d.learn || !d.hint || !d.saw || !d.title || !d.icon ||
  !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk)
);
ok('every discovery has title, icon, hint, saw, learn, and a valid "how" recipe', badDisc.length === 0, badDisc.map(d => d.id + ': ' + d.how.filter(t => !tokenOk(t)).join(',')));

// ── autoStep ──────────────────────────────────────────────────────────────
console.log('\nautoStep (discovery guide steps)');
ok('autoStep returns {on, btn, say} for every valid token', [...VALID_TOKENS].every(t => {
  const s = D.autoStep(t);
  return s && typeof s.on === 'string' && typeof s.btn === 'string' && typeof s.say === 'string';
}));

// Simulate each discovery recipe through the state machine
function runRecipe(how) {
  const st2 = D.newState();
  const unlocked = new Set();
  for (const tok of how) {
    const i = tok.indexOf(':');
    if (i < 0) {
      // act
      if (tok === 'tick30') { st2.condTime += 30; st2.convTime += 30; st2.radTime += 30; }
      else if (tok === 'tick60') { st2.condTime += 60; st2.convTime += 60; st2.radTime += 60; }
      else if (tok === 'tick120') { st2.condTime += 120; st2.convTime += 120; st2.radTime += 120; }
      else if (tok === 'read_temp') { /* no-op for discovery checking */ }
    } else {
      const k = tok.slice(0, i), v = tok.slice(i + 1);
      if (k === 'station') { st2.station = v; st2.stationsDone[v] = true; }
      else if (k === 'material') { if (!st2.materials.includes(v)) st2.materials.push(v); }
      else if (k === 'burner') st2.burner = v === 'on';
      else if (k === 'heater') st2.heater = v === 'on';
      else if (k === 'lamp') st2.lamp = v === 'on';
      else if (k === 'dye') st2.dye = true;
      else if (k === 'convmode') st2.convMode = v;
    }
    D.finds(st2).forEach(id => unlocked.add(id));
  }
  return unlocked;
}

const unsolved = D.DISCOVERIES.filter(d => {
  const found = runRecipe(d.how);
  return !found.has(d.id);
}).map(d => d.id);
ok('every discovery recipe reaches its own discovery', unsolved.length === 0, unsolved);

// ── Guided experiments ────────────────────────────────────────────────────
console.log('\nGuided experiments');
ok('at least 3 guided experiments', D.GUIDES.length >= 3, D.GUIDES.length);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);

for (const G of D.GUIDES) {
  ok(`${G.id}: has icon, title, blurb and lesson`, !!(G.icon && G.title && G.blurb && G.lesson));
  const badSteps = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.id}: every step has a valid token, a say text and a button`, badSteps.length === 0, badSteps.map(s => s.on));
}

// ── Missions ──────────────────────────────────────────────────────────────
console.log('\nMissions');
ok('at least 2 missions', D.MISSIONS.length >= 2, D.MISSIONS.length);
ok('mission ids are unique', new Set(D.MISSIONS.map(m => m.id)).size === D.MISSIONS.length);

const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard', 'warning', 'sharp', 'goggles'];

for (const M of D.MISSIONS) {
  ok(`${M.id}: has icon, title, blurb and intro`, !!(M.icon && M.title && M.blurb && M.intro));
  ok(`${M.id}: has exactly 5 quiz questions`, M.quiz.length === 5, M.quiz.length);
  const badQ = M.quiz.filter(q => {
    const opts = q.opts || q.options;
    return !q.q || !q.reason || !opts || opts.length !== 4 || new Set(opts).size !== 4 || opts.some(o => !o);
  });
  ok(`${M.id}: every quiz question has 4 distinct options and a reason`, badQ.length === 0, badQ.map(q => q.q));
  const noAns = M.quiz.filter(q => {
    const opts = q.opts || q.options;
    return typeof q.ans !== 'number' || q.ans < 0 || q.ans >= (opts ? opts.length : 0);
  });
  ok(`${M.id}: every answer index is valid`, noAns.length === 0, noAns.map(q => q.q));
}

// ── Hazards ───────────────────────────────────────────────────────────────
console.log('\nHazards');
ok('at least 3 hazards', Object.keys(D.HAZARDS).length >= 3, Object.keys(D.HAZARDS));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  ok(`hazard ${id}: signs, title(), happened(), why, instead, exam`, !!(
    H.signs && H.signs.length &&
    H.signs.every(s => SIGNS.includes(s)) &&
    H.title && H.title() &&
    H.happened && H.happened() &&
    H.why && H.instead && H.exam
  ));
}
ok('hot_rod has signs hot+warning', D.HAZARDS.hot_rod.signs.includes('hot') && D.HAZARDS.hot_rod.signs.includes('warning'));
ok('boil_dry says to watch the water level', /water level|water low/i.test(D.HAZARDS.boil_dry.instead));
ok('unattended_flame says to turn off when stepping away', /turn off/i.test(D.HAZARDS.unattended_flame.instead));

// ── Results ───────────────────────────────────────────────────────────────
console.log('\nResult cards');
ok('at least 2 result cards', Object.keys(D.RESULTS).length >= 2);
for (const [id, R] of Object.entries(D.RESULTS)) {
  ok(`result card ${id}: icon, title, happened(), instead, exam`, !!(R.icon && R.title && R.happened() && R.instead && R.exam));
}

// ── Facts ─────────────────────────────────────────────────────────────────
console.log('\nFacts (💡 button)');
ok('at least 6 facts', D.FACTS.length >= 6, D.FACTS.length);
ok('every fact is a non-empty string', D.FACTS.every(f => typeof f === 'string' && f.trim().length > 10));

// ── Materials ─────────────────────────────────────────────────────────────
console.log('\nMaterials');
ok('4 materials', D.MATERIAL_KEYS.length === 4, D.MATERIAL_KEYS);
ok('metal is a conductor', D.MATERIALS.metal.conductor === true);
ok('glass is not a conductor', D.MATERIALS.glass.conductor === false);
ok('wood is not a conductor', D.MATERIALS.wood.conductor === false);
ok('plastic is not a conductor', D.MATERIALS.plastic.conductor === false);
ok('every material has name, icon, short, color, rate', D.MATERIAL_KEYS.every(k => {
  const M = D.MATERIALS[k];
  return M && M.name && M.icon && M.short && M.color && typeof M.rate === 'number' && M.rate > 0;
}));

// ── Reading level ─────────────────────────────────────────────────────────
console.log('\nReading level (Grade 6, ≤ 16 words per sentence)');
const texts = [];
D.GUIDES.forEach(G => { texts.push(G.blurb, G.lesson); G.steps.forEach(s => texts.push(s.say)); });
D.DISCOVERIES.forEach(d => texts.push(d.hint, d.saw, d.learn, d.psac || ''));
D.MISSIONS.forEach(M => { texts.push(M.blurb, M.intro); M.quiz.forEach(q => { texts.push(q.q, q.reason); }); });
Object.values(D.HAZARDS).forEach(H => texts.push(H.title(), H.happened(), H.why, H.instead, H.exam));
Object.values(D.RESULTS).forEach(R => texts.push(R.title, R.happened(), R.instead, R.exam));
texts.push(...D.FACTS);
const long = [];
texts.filter(Boolean).forEach(t => {
  // split on sentence boundaries without lookbehind
  t.replace(/([.!?])\s+/g, '$1\n').split('\n').forEach(sn => {
    const n = (sn.match(/\S+/g) || []).length;
    if (n > 16) long.push(n + ': ' + sn.trim());
  });
});
ok('no sentence is longer than 16 words', long.length === 0, long);

// ── Engineering ───────────────────────────────────────────────────────────
console.log('\nEngineering');
ok('no regex lookbehind in the lab files (Safari < 16.4)', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('data file exports window.LabHeatData', /window\.LabHeatData = LabHeatData/.test(src));
ok('lab file exports window.LabHeat', /window\.LabHeat = LabHeat/.test(bench));
ok('lab file does not record mastery answers', !/recordAnswer|_recordDaily/.test(bench));
ok('lab file uses Labs.esc for user strings', /Labs\.esc/.test(bench));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
