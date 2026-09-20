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

// The bench's own rules (lab_heat.js _set / _tick / _addDye / _readTemp),
// replayed on the data's state: a wait moves ONLY the current station's clock
// and needs its heat on; the rack refuses a material while the burner is lit
// and a burner with nothing on it; dye needs the heater; a reading needs the
// lamp. Every action scores discoveries (finds), as _after() does.
// ⚠ The old replay advanced all three clocks at once and marked a station
//   done on arrival, so it passed recipes the bench refused (disc_thermos lit
//   an empty rack and never waited at two of its three stations).
function sim() {
  const st = D.newState();
  const found = new Set(), refused = [], log = [], after = [];
  const score = () => D.finds(st).forEach(id => found.add(id));
  const run = tok => {
    if (tok === 'dye:add') {
      if (st.station !== 'convection') run('station:convection');
      if (!st.heater || st.dye) { refused.push(tok); return; }
      st.dye = true; score(); return;
    }
    const i = tok.indexOf(':');
    if (i < 0) {
      const n = { tick30: 30, tick60: 60, tick120: 120 }[tok];
      if (n) {
        if (st.station === 'conduction') { if (!st.burner || !st.materials.length) { refused.push(tok); return; } st.condTime += n; }
        else if (st.station === 'convection') { if (!st.heater) { refused.push(tok); return; } st.convTime += n; log.push('conv'); }
        else { if (!st.lamp) { refused.push(tok); return; } st.radTime += n; }
        if (st.station === 'conduction') log.push('cond');
        st.stationsDone[st.station] = true; score(); return;
      }
      if (tok === 'read_temp') {
        if (st.station !== 'radiation') run('station:radiation');
        if (!st.lamp) { refused.push(tok); return; }
        st.readings.push({ t: Math.round(st.radTime), black: Math.round(D.tempAt('black', st.radTime)), silver: Math.round(D.tempAt('silver', st.radTime)) });
        log.push('read'); score(); return;
      }
      if (tok === 'reset') { const s = st.station, done = st.stationsDone; Object.assign(st, D.newState(), { station: s, stationsDone: done }); log.length = 0; return; }
      refused.push(tok); return;
    }
    const k = tok.slice(0, i), v = tok.slice(i + 1);
    switch (k) {
      case 'station': if (!['conduction', 'convection', 'radiation'].includes(v)) { refused.push(tok); return; } st.station = v; break;
      case 'material':
        if (!D.MATERIALS[v]) { refused.push(tok); return; }
        if (st.station !== 'conduction') run('station:conduction');
        if (st.burner) { refused.push(tok); return; }
        if (!st.materials.includes(v)) { if (st.materials.length >= 4) { refused.push(tok); return; } st.materials.push(v); } else st.selMat = v;
        break;
      case 'burner':
        if (st.station !== 'conduction') run('station:conduction');
        if (v === 'on' && !st.materials.length) { refused.push(tok); return; }
        st.burner = v === 'on'; break;
      case 'heater': if (st.station !== 'convection') run('station:convection'); st.heater = v === 'on'; break;
      case 'lamp': if (st.station !== 'radiation') run('station:radiation'); st.lamp = v === 'on'; break;
      case 'convmode': if (st.station !== 'convection') run('station:convection'); if (v !== 'water' && v !== 'air') { refused.push(tok); return; } st.convMode = v; break;
      default: refused.push(tok); return;
    }
    score();
  };
  const snap = () => JSON.parse(JSON.stringify(st));
  return { st, found, refused, log, run: tok => { run(tok); after.push(snap()); }, after };
}

const unsolved = D.DISCOVERIES.filter(d => {
  const b = sim();
  d.how.forEach(b.run);
  return b.refused.length || !b.found.has(d.id);
}).map(d => { const b = sim(); d.how.forEach(b.run); return d.id + (b.refused.length ? ' (bench refused ' + b.refused.join(',') + ')' : ' (never found)'); });
ok('every discovery recipe reaches its own discovery on the bench\'s own rules', unsolved.length === 0, unsolved);

// ── Guided experiments ────────────────────────────────────────────────────
console.log('\nGuided experiments');
ok('at least 3 guided experiments', D.GUIDES.length >= 3, D.GUIDES.length);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);

for (const G of D.GUIDES) {
  ok(`${G.id}: has icon, title, blurb and lesson`, !!(G.icon && G.title && G.blurb && G.lesson));
  const badSteps = G.steps.filter(s => !tokenOk(s.on) || !s.say);
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
  // Labs.quiz's schema: { q, options, why }, first option = the answer (it
  // shuffles). The bench crashed on an {opts, ans, reason} schema once.
  const badQ = M.quiz.filter(q => !q.q || !q.why || !Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${M.id}: every quiz question has 4 distinct options and a reason`, badQ.length === 0, badQ.map(q => q.q));
  const noAns = M.quiz.filter(q => q.ans !== undefined || q.opts !== undefined || q.reason !== undefined);
  ok(`${M.id}: every question uses the shell schema (answer first, no ans/opts/reason)`, noAns.length === 0, noAns.map(q => q.q));
}

// ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ─────────────────────
// The shape is checked by scripts/test-labs-experiments-data.js. This is the
// part only this lab can check: every token is one the bench performs, every
// instruction names its button, every check ref is a real question, and the
// See is TRUE - the set-up and every right path are replayed on the bench's
// own rules and the facts the See claims are read off the final state.
console.log('\nExperiments');
const EX = D.EXPERIMENTS || [];
ok('the data file exports EXPERIMENTS (3 to 5 at Grade 6)', Array.isArray(EX) && EX.length >= 3 && EX.length <= 5, EX.length);
ok('experiment ids are unique', new Set(EX.map(e => e.id)).size === EX.length);
ok('every experiment is Grade 6 only', EX.every(e => Array.isArray(e.grades) && e.grades.join() === '6'), EX.map(e => e.grades));
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const coreChapters = ((core.match(/heat:\s*\{\s*6:\s*\[([^\]]*)\]/) || [])[1] || '').match(/'([^']+)'/g) || [];
const heatChapters = coreChapters.map(s => s.replace(/'/g, ''));
ok('lab_core.js lists the Heat lab\'s Grade 6 chapters', heatChapters.length >= 1, heatChapters);
ok('every experiment teaches a chapter lab_core.js lists for this lab at Grade 6', EX.every(e => heatChapters.includes(e.chapter)), EX.map(e => e.id + ':' + e.chapter));
ok('both listed chapters get at least one experiment', heatChapters.every(ch => EX.some(e => e.chapter === ch)), heatChapters);
ok('experiment 1 is the exam-shaped rod race: all four rods already on the rack, flame lit', EX[0] && EX[0].id === 'rod_race' && D.MATERIAL_KEYS.every(m => EX[0].setup.includes('material:' + m)) && EX[0].setup.includes('burner:on'));

// The visible label of each control (lab_heat.js _shellHTML / _renderTools),
// emoji stripped. A `say` must contain the one it points at.
const LABEL = {
  'station:conduction': 'Conduction', 'station:convection': 'Convection', 'station:radiation': 'Radiation',
  'burner:on': 'Turn on burner', 'burner:off': 'Burner ON', 'heater:on': 'Turn on heater', 'heater:off': 'Heater ON',
  'lamp:on': 'Turn on lamp', 'lamp:off': 'Lamp ON', 'dye:add': 'Add dye drop', 'convmode:water': 'Water', 'convmode:air': 'Air',
  tick30: '30 seconds', tick60: '1 minute', tick120: '2 minutes', read_temp: 'Read temperature', reset: 'Start again',
};
D.MATERIAL_KEYS.forEach(m => { LABEL['material:' + m] = D.MATERIALS[m].short; });
// Material buttons are drawn from the data (`${M.icon} ${esc(M.short)}`); every other label is literal in the bench.
const literal = Object.entries(LABEL).filter(([k]) => !k.startsWith('material:')).map(([, l]) => l);
ok('every control label in this test is really in the bench source', literal.every(l => bench.includes(l)) && /\$\{M\.icon\} \$\{esc\(M\.short\)\}/.test(bench), literal.filter(l => !bench.includes(l)));
const plain = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
const stepToks = s => s.options || s.any || (s.on ? [s.on] : []);
const question = ref => {
  if (ref && typeof ref === 'object') return ref;
  const [mid, i] = String(ref).split(':');
  const M = D.MISSIONS.find(x => x.id === mid);
  return M ? M.quiz[Number(i)] : null;
};
// Every right path: the set-up, then each step's `on` (or each of its `any`).
const paths = e => e.steps.reduce((acc, s) => acc.flatMap(p => (s.any || [s.on]).map(t => p.concat(t))), [[]]);
const melted = (st, m) => D.WAX_POSITIONS.filter(p => D.waxMelted(m, p, st.condTime)).length;
// What each See claims, read off the states after the set-up and after each step.
const TRUTH = {
  rod_race: (setup, steps) => {
    const s1 = steps[0], s2 = steps[1], errs = [];
    if (!(setup.burner && setup.materials.length === 4 && setup.condTime === 0)) errs.push('set-up: four rods, flame lit, no time passed');
    if (!(s1.condTime === 30 && D.allWaxMelted('metal', s1.condTime))) errs.push('after 30 s the metal rod has melted all four drops');
    if (!['glass', 'wood', 'plastic'].every(m => melted(s1, m) === 0)) errs.push('after 30 s no other rod has melted a drop');
    if (!(s2.condTime === 150 && melted(s2, 'glass') === 1 && melted(s2, 'wood') === 1 && melted(s2, 'plastic') === 0)) errs.push('two minutes later: glass 1, wood 1, plastic 0 drops melted, got ' + ['glass', 'wood', 'plastic'].map(m => m + '=' + melted(s2, m)));
    return errs;
  },
  handle: (setup, steps) => {
    const end = steps[steps.length - 1], errs = [];
    const handle = end.materials.find(m => m !== 'metal');
    if (!(setup.materials.join() === 'metal' && !setup.burner)) errs.push('set-up: the metal rod alone, flame off');
    if (!(['wood', 'plastic'].includes(handle) && end.materials.length === 2)) errs.push('the handle is wood or plastic beside the metal rod');
    if (!(end.burner && end.condTime === 60)) errs.push('one minute over a lit flame');
    if (!D.allWaxMelted('metal', end.condTime)) errs.push('metal melted all its wax');
    if (melted(end, handle) !== 0) errs.push('the handle rod melted no drop');
    return errs;
  },
  warm_water: (setup, steps) => {
    const end = steps[steps.length - 1], errs = [];
    if (!(setup.station === 'convection' && setup.convMode === 'water' && !setup.heater)) errs.push('set-up: the beaker of water, heater off');
    if (!(end.heater && end.dye && end.convMode === 'water' && end.convTime >= 30)) errs.push('heater on, dye in, still water, 30 s passed');
    return errs;
  },
  lamp_cans: (setup, steps, e) => {
    const end = steps[steps.length - 1], errs = [];
    if (!(setup.station === 'radiation' && !setup.lamp && setup.radTime === 0)) errs.push('set-up: lamp off, cans at room temperature');
    if (!(end.lamp && end.radTime === 60 && end.readings.length === 1)) errs.push('lamp on, one minute, one reading');
    const said = (e.see.saw.match(/(\d+) °C/g) || []).map(s => parseInt(s, 10));
    const r = end.readings[0] || {};
    if (!(said.length === 2 && said[0] === r.black && said[1] === r.silver)) errs.push('See quotes the reading: black ' + r.black + ', silver ' + r.silver + ', said ' + said);
    if (!(r.black > r.silver && r.silver > D.ROOM_TEMP)) errs.push('both warmed, black more');
    return errs;
  },
  sea_breeze: (setup, steps) => {
    const end = steps[steps.length - 1], errs = [];
    if (!(setup.station === 'convection' && setup.convMode === 'air' && !setup.heater)) errs.push('set-up: the room of air, heater off');
    if (!(end.heater && end.convMode === 'air' && end.convTime >= 30)) errs.push('heater on in the air view, 30 s passed');
    return errs;
  },
};
for (const e of EX) {
  const t = e.id;
  const badTok = [].concat(e.setup, ...e.steps.map(stepToks)).filter(x => !tokenOk(x));
  ok(`${t}: every set-up and step token is one the bench performs`, badTok.length === 0, badTok);
  const unnamed = e.steps.filter(s => s.say && s.on && !plain(s.say).includes(plain(LABEL[s.on] || ' ')));
  ok(`${t}: every instruction names the control it points at`, unnamed.length === 0, unnamed.map(s => s.say + ' ⇒ ' + LABEL[s.on]));
  const asks = e.steps.filter(s => s.ask);
  ok(`${t}: every ask lists 2+ options with its answer among them; every wrong is a listed option that is not an answer`,
     asks.every(s => Array.isArray(s.options) && s.options.length >= 2 && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on))
       && Object.keys(s.wrong || {}).every(k => s.options.includes(k) && k !== s.on && !(s.any || []).includes(k) && s.wrong[k].length > 15)), asks);
  const refs = e.check.map(question);
  ok(`${t}: 2-3 check questions resolve, each with 4 distinct options and a reason`, e.check.length >= 2 && e.check.length <= 3 && refs.every(q => q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && q.why), e.check.map(r => typeof r === 'object' ? 'inline' : r));
  ok(`${t}: no invented paper reference in the exam line`, typeof e.exam === 'string' && !/20\d\d\s*Q\d/.test(e.exam), e.exam);
  const quoted = (e.exam.match(/Exam question: (.+?\?)/) || [])[1];
  if (quoted) {
    const bank = fs.readdirSync(path.join(ROOT, 'subjects', 'grade6-science', 'questions')).map(f => fs.readFileSync(path.join(ROOT, 'subjects', 'grade6-science', 'questions', f), 'utf8')).join('\n').replace(/<br>/g, ' ');
    ok(`${t}: the quoted exam question is in subjects/grade6-science/questions`, bank.includes(quoted), quoted);
  }
  ok(`${t}: the See is TRUE on every right path`, !!TRUTH[t], 'no truth function for ' + t);
  if (!TRUTH[t]) continue;
  for (const p of paths(e)) {
    const b = sim();
    e.setup.forEach(b.run);
    const setup = JSON.parse(JSON.stringify(b.st));
    const steps = p.map(tok => { b.run(tok); return JSON.parse(JSON.stringify(b.st)); });
    ok(`${t} [${p.join(' → ')}]: the bench performs every token`, b.refused.length === 0, b.refused);
    const errs = TRUTH[t](setup, steps, e);
    ok(`${t} [${p.join(' → ')}]: what the See says is what the bench shows`, errs.length === 0, errs);
    ok(`${t} [${p.join(' → ')}]: the notebook holds evidence for the See`, b.log.length >= 1, b.log);
  }
  for (const s of asks) for (const w of Object.keys(s.wrong || {})) {
    // A wrong option is heard, not performed (lab_heat.js _expWrong) - so the
    // right path above is the only path. It still has to be a real control.
    ok(`${t}: wrong option ${w} is a real control the child could tap`, tokenOk(w) && !!LABEL[w]);
  }
}
const inline = EX.flatMap(e => e.check.filter(r => typeof r === 'object').map(r => r.q));
ok('no inline check question repeats a mission question or another inline one', new Set(inline).size === inline.length && !inline.some(q => D.MISSIONS.some(M => M.quiz.some(x => x.q === q))));
ok('the bench exports the experiment adapter (list, question, reset, apply, guide, stop, evidence, focus, selector, hooks)',
   ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('\\b' + k + ':').test(bench.slice(bench.indexOf('const experiment = {')))) && /return \{ study, experiment,/.test(bench));
ok('the bench hears every token before matching, matches `any`, hands Done to the runner, and never resets for an exp guide',
   /experiment\.hooks\.token\(token, s\)/.test(bench) && /s\.any\.includes\(token\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /experiment\.hooks\.step\(_guide\.step\)/.test(bench) && !/function startGuide[\s\S]{0,400}_resetBench\(\)/.test(bench));
ok('a wrong option is heard but not performed (_expWrong in _set and _act), and set-up is silent', /_expWrong\(k \+ ':' \+ v\)/.test(bench) && /_expWrong\(_actTok\(act\)\)/.test(bench) && /_silent = true/.test(bench));
ok('the dye button is reachable as a token (selector, apply and focus all map dye:add ↔ data-act="dye")', /tok === 'dye:add'\) return '\[data-act="dye"\]'/.test(bench) && /tok === 'dye:add'\) \{ _addDye\(\)/.test(bench) && /act === 'dye' \? 'dye:add'/.test(bench));
ok('a wait fires only the wait that was tapped (no station default)', !/_guideEvent\(st\.station === 'conduction' \? 'tick120'/.test(bench));

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
(D.EXPERIMENTS || []).forEach(e => {
  texts.push(e.title, e.aim, e.see.saw, e.see.learn, e.exam, e.predict.q);
  e.predict.options.forEach(o => texts.push(o.label, o.sub || ''));
  e.steps.forEach(s => { texts.push(s.say || s.ask); Object.values(s.wrong || {}).forEach(w => texts.push(w)); });
  e.check.forEach(r => { if (typeof r === 'object') texts.push(r.q, r.why, ...r.options); });
});
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
