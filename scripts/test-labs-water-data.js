'use strict';
// Science Labs: the science Water & States (PSAC Grade 4) is allowed to show.
//
// The bench draws whatever engine/labs/lab_water_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: ice melts at 0 °C and water boils at 100 °C, the temperature
// stays put while the state changes, no water is ever lost or made (it only
// changes state or leaves as steam), water freezes at 0 °C; heat, wind and a
// wider surface each speed up evaporation and a lid stops it; an unfair test
// is caught and a fair one is not; the jar makes rain only with water, a lid
// and enough warmth; every discovery recipe leads to its own discovery with
// no mistake card on the way; every card and quiz is complete; grades are
// tagged; and sentences stay short enough for a Grade 4 reader. Since
// 2026-09-20 it also checks the five EXPERIMENTS (lab_experiment.js): every
// set-up and step token is one the bench accepts, every "say" names the
// button it points at, the check refs resolve, and every See text is TRUE -
// the set-up and the right path are replayed through the data file's own
// model and the result compared with the words.
//
// Run: node scripts/test-labs-water-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_water_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_water.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabWaterData = LabWaterData;', ctx);
const P = ctx.LabWaterData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const at = (s, place) => Object.assign({}, s, { place });
const run = (s, n) => P.heatRun(s, n);

console.log('\nThe two fixed points');
ok('ice melts at 0 °C and water boils at 100 °C', P.MELT_C === 0 && P.BOIL_C === 100);
ok('the room is warmer than 0 °C and the freezer colder', P.ROOM_C > 0 && P.FREEZER_C < 0 && P.ICE_C < 0 && P.TAP_C > 0);

console.log('\nIce on the hot plate, minute by minute');
const ice = P.heatNew('ice');
const hot = run(at(ice, 'hot'), 20);
const Ts = hot.map(s => s.T);
ok('the ice warms up to 0 °C first, and melts only when it gets there',
   hot.every(s => !(s.water > 0 && s.ice > 0) || s.T === 0) && hot.filter(s => s.T < 0).every(s => s.water === 0), Ts);
ok('while ice and water are both there, the thermometer stays at 0 °C', hot.filter(s => s.ice > 0 && s.water > 0).length >= 2
   && hot.filter(s => s.ice > 0 && s.water > 0).every(s => s.T === 0));
ok('once the ice has gone, the water warms to 100 °C and never above it', hot.every(s => s.T <= 100) && hot.some(s => s.T === 100));
ok('while it boils, it stays at 100 °C and the water level falls',
   (() => { const b = hot.filter(s => P.phase(s) === 'boiling'); return b.length >= 3 && b.every(s => s.T === 100) && b.every((s, i) => i === 0 || s.water <= b[i - 1].water); })());
ok('no water is lost or made: ice + water + steam is always 100 g',
   hot.every(s => s.ice + s.water + s.gone === P.MASS), hot.map(s => s.ice + s.water + s.gone));
ok('the temperature never goes down on the hot plate', Ts.every((t, i) => i === 0 || t >= Ts[i - 1]));
const empty = hot.find(s => s.ice === 0 && s.water === 0);
ok('at last it boils dry, and the adult switches the hot plate off', !!empty && empty.gone === P.MASS && empty.off === true && empty.place === 'table', empty);
ok('the order: solid → melting → liquid → boiling → empty',
   (() => { const seq = [P.phase(ice)].concat(hot.map(P.phase)).filter((p, i, a) => i === 0 || p !== a[i - 1]); return seq.join() === 'solid,melting,liquid,boiling,empty'; })(),
   [P.phase(ice)].concat(hot.map(P.phase)).filter((p, i, a) => i === 0 || p !== a[i - 1]));
ok('steam shows only from very hot water, never from ice', hot.filter(P.steamy).every(s => s.water > 0 && s.T >= P.STEAMY_C) && !P.steamy(ice));

console.log('\nIn the freezer and on the table');
const water = P.heatNew('water');
const cold = run(at(water, 'freezer'), 14);
ok('tap water starts as a liquid at 20 °C', P.phase(water) === 'liquid' && water.T === 20);
ok('in the freezer it cools to 0 °C and freezes at 0 °C', cold.filter(s => s.ice > 0 && s.water > 0).every(s => s.T === 0) && cold.some(s => P.phase(s) === 'freezing'));
ok('…then it is solid ice, colder than 0 °C, but never colder than the freezer',
   cold[cold.length - 1].water === 0 && cold[cold.length - 1].T < 0 && cold.every(s => s.T >= P.FREEZER_C), cold.map(s => s.T));
ok('…and no water is lost in the freezer', cold.every(s => s.ice + s.water + s.gone === P.MASS));
const room = run(ice, 40);
ok('ice on the table melts too - slower than on the hot plate',
   room.some(s => P.phase(s) === 'melting') && room.findIndex(s => s.ice === 0) > hot.findIndex(s => s.ice === 0), { room: room.findIndex(s => s.ice === 0), hot: hot.findIndex(s => s.ice === 0) });
ok('…and the water then warms to room temperature, no further', room[room.length - 1].T === P.ROOM_C && room.every(s => s.T <= P.ROOM_C));
ok('boiling water left on the table cools down towards the room', (() => { const r = run(at(hot.find(s => P.phase(s) === 'boiling'), 'table'), 10); return r[0].T < 100 && r[r.length - 1].T >= P.ROOM_C && r.every((s, i) => i === 0 || s.T <= r[i - 1].T); })());
ok('water never boils on the table or in the freezer', room.concat(cold).every(s => P.phase(s) !== 'boiling'));

console.log('\nThe thermometer');
ok('reading while ice melts gives 0 °C and the "zero" discovery', (() => { const s = hot.find(x => P.phase(x) === 'melting'); return s.T === 0 && P.readFinds(s).join() === 'zero'; })());
ok('reading while water freezes gives 0 °C and "zero" too', (() => { const s = cold.find(x => P.phase(x) === 'freezing'); return s.T === 0 && P.readFinds(s).join() === 'zero'; })());
ok('reading while it boils gives 100 °C and "boil"', (() => { const s = hot.find(x => P.phase(x) === 'boiling'); return s.T === 100 && P.readFinds(s).join() === 'boil'; })());
ok('solid ice at 0 °C with no water yet is not the melting point reading', P.readFinds(Object.assign(P.heatNew('ice'), { T: 0 })).length === 0);
ok('reading from above is wrong - and says more than 100 °C for boiling water', P.angleRead(100) !== 100 && P.angleRead(100) > 100);
ok('temperatures print with a real minus sign', P.fmtC(-18) === '−18 °C' && P.fmtC(100) === '100 °C');

console.log('\nThe hot plate needs an adult');
ok('the hot plate without an adult is the hotplate hazard', P.applyHeat(ice, 'place', 'hot', false).hazard === 'hotplate');
ok('…and with an adult it heats', P.applyHeat(ice, 'place', 'hot', true).s.place === 'hot');
ok('the freezer and the table need no adult', P.applyHeat(ice, 'place', 'freezer', false).s.place === 'freezer' && P.applyHeat(ice, 'place', 'table', false).s.place === 'table');
ok('choosing what to start with gives a fresh beaker', P.applyHeat(hot[8], 'start', 'water', false).s.min === 0 && P.applyHeat(hot[8], 'start', 'water', false).s.water === 100);

console.log('\nThe drying race');
const Dsh = o => Object.assign(P.blankDish(), o);
const base = Dsh({});
ok('a narrow cup of water in the shade dries slowly, but it does dry', P.dryRate(base) > 0 && P.dryLeft(base, 6) < base.amt && P.dryLeft(base, 6) > 0);
ok('the sun speeds up evaporation', P.dryRate(Dsh({ spot: 'sun' })) > P.dryRate(base));
ok('wind (a fan) speeds up evaporation', P.dryRate(Dsh({ fan: true })) > P.dryRate(base));
ok('a wide plate (bigger surface) speeds up evaporation', P.dryRate(Dsh({ cont: 'plate' })) > P.dryRate(base));
ok('all three together are fastest', P.dryRate(Dsh({ spot: 'sun', fan: true, cont: 'plate' })) > Math.max(P.dryRate(Dsh({ spot: 'sun' })), P.dryRate(Dsh({ fan: true })), P.dryRate(Dsh({ cont: 'plate' }))));
ok('a lid stops it: no water escapes, whatever else', ['cup', 'plate'].every(c => ['sun', 'shade'].every(s => [true, false].every(f => P.dryRate(Dsh({ cont: c, spot: s, fan: f, lid: true })) === 0))));
ok('water left never goes below 0 and never rises', [base, Dsh({ spot: 'sun', fan: true, cont: 'plate' })].every(d => [0, 1, 2, 3, 4, 5, 6].every((h, i, a) => P.dryLeft(d, h) >= 0 && (i === 0 || P.dryLeft(d, h) <= P.dryLeft(d, a[i - 1])))));
ok('twice the water takes longer to dry', P.dryLeft(Dsh({ amt: 60, spot: 'sun', cont: 'plate' }), 6) > P.dryLeft(Dsh({ spot: 'sun', cont: 'plate' }), 6) || P.dryLeft(Dsh({ amt: 60, spot: 'sun', cont: 'plate' }), 3) > P.dryLeft(Dsh({ spot: 'sun', cont: 'plate' }), 3));
const dishes = (...ds) => { const o = {}; ds.forEach((d, i) => { o['ABC'[i]] = d; }); return o; };
const ids = arr => arr.map(m => m.id).join();
ok('A as it is, B in the sun, C with a fan: fair - sun and wind are both tested', P.dryMistakes(dishes(base, Dsh({ spot: 'sun' }), Dsh({ fan: true })), 1).length === 0
   && P.fairFactors(dishes(base, Dsh({ spot: 'sun' }), Dsh({ fan: true }))).sort().join() === 'fan,spot');
ok('B with the sun AND a fan, nothing to compare it with: "two things changed"', ids(P.dryMistakes(dishes(base, Dsh({ spot: 'sun', fan: true }), base), 1)) === 'two_vars');
ok('…and the card names what changed', /the sun and the fan/.test(P.RESULTS.two_vars.happened(P.dryMistakes(dishes(base, Dsh({ spot: 'sun', fan: true }), base), 1)[0].ctx)));
ok('more water AND the sun: "not the same amount of water"', ids(P.dryMistakes(dishes(base, Dsh({ spot: 'sun', amt: 60 }), base), 1)) === 'amounts');
ok('only the amount changed: a fair test of the amount, no card', P.dryMistakes(dishes(base, Dsh({ amt: 60 }), base), 1).length === 0);
ok('a chain is fair: A plain, B sun, C sun + fan', P.dryMistakes(dishes(base, Dsh({ spot: 'sun' }), Dsh({ spot: 'sun', fan: true })), 3).length === 0);
ok('no card before any time has passed', P.dryMistakes(dishes(base, Dsh({ spot: 'sun', fan: true }), base), 0).length === 0);
ok('each fair pair unlocks its own discovery after 2 hours', P.dryFinds(dishes(base, Dsh({ spot: 'sun' }), Dsh({ cont: 'plate' })), 2).sort().join() === 'sun_dries,wide_dries'
   && P.dryFinds(dishes(base, Dsh({ spot: 'sun' }), base), 1).length === 0);

console.log('\nThe water cycle jar');
const J = o => Object.assign(P.blankJar(), o);
ok('warm water makes more vapour than cold water', P.jarVapour(J({ water: 'warm' })) > P.jarVapour(J({ water: 'cold' })) && P.jarVapour(J({ water: 'cold' })) > 0);
ok('the sun adds warmth: more vapour', P.jarVapour(J({ water: 'cold', spot: 'sun' })) > P.jarVapour(J({ water: 'cold' })));
ok('an empty jar makes no vapour', P.jarVapour(J({})) === 0 && P.jarStage(J({}), 3) === 'dry');
ok('no lid: the vapour escapes - no drops, ever', [1, 2, 3].every(n => P.jarDrops(J({ water: 'warm', spot: 'sun' }), n) === 0 && P.jarStage(J({ water: 'warm', spot: 'sun' }), n) === 'escape'));
ok('a cold lid (ice) makes more drops than cling film', P.jarDrops(J({ water: 'warm', lid: 'ice' }), 1) > P.jarDrops(J({ water: 'warm', lid: 'film' }), 1));
ok('warm water + ice lid: drops, then rain by 20 minutes', P.jarStage(J({ water: 'warm', lid: 'ice' }), 1) !== 'rain' && P.jarStage(J({ water: 'warm', lid: 'ice' }), 2) === 'rain');
ok('cold water + ice lid in the shade: a few drops by 30 minutes, no rain', ['few', 'many'].includes(P.jarStage(J({ water: 'cold', lid: 'ice' }), 3)));
ok('cold water + ice lid on a sunny window: rain by 30 minutes', P.jarStage(J({ water: 'cold', lid: 'ice', spot: 'sun' }), 3) === 'rain');
ok('drops only grow as time passes', [0, 1, 2, 3].every((n, i, a) => i === 0 || P.jarDrops(J({ water: 'warm', lid: 'film' }), n) >= P.jarDrops(J({ water: 'warm', lid: 'film' }), a[i - 1])));
ok('boiling water: the kettle hazard without an adult, a cracked jar with one', P.applyJar(J({}), 'jwater', 'boiling', false).hazard === 'kettle' && P.applyJar(J({}), 'jwater', 'boiling', true).hazard === 'crack');
ok('an open jar with water earns the "vapour escaped" card', ids(P.jarMistakes(J({ water: 'warm' }), 1)) === 'no_lid' && P.jarMistakes(J({ water: 'warm', lid: 'ice' }), 3).length === 0);

console.log('\nGrades');
ok('GRADES is [4]', JSON.stringify(P.GRADES) === '[4]');
const untagged = [].concat(P.GUIDES, P.MISSIONS, P.DISCOVERIES, P.EXPERIMENTS || []).filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => P.GRADES.includes(g)));
ok('every guide, mission, discovery and experiment is tagged grades: [4]', untagged.length === 0, untagged.map(x => x.id));

console.log('\nDiscoveries');
const dids = P.DISCOVERIES.map(d => d.id);
ok('at least 10 discoveries, ids unique', dids.length >= 10 && new Set(dids).size === dids.length, dids.length);
const SETS = { rig: ['heat', 'dry', 'jar'], adult: ['on', 'off'], start: Object.keys(P.STARTS), place: Object.keys(P.PLACES), name: ['steam', 'smoke'],
               dish: P.DISHES, cont: Object.keys(P.CONTS), spot: Object.keys(P.SPOTS), fan: ['on', 'off'], lid: ['on', 'off'], amt: P.AMTS.map(String),
               jwater: Object.keys(P.JAR_WATERS), jlid: Object.keys(P.JAR_LIDS), jplace: Object.keys(P.JAR_SPOTS) };
const ACTS = ['min', 'five', 'read', 'angle', 'catch', 'hand', 'hour', 'six', 'ten', 'reset'];
const tokenOk = on => { const [k, v] = on.split(':'); return v !== undefined ? !!SETS[k] && SETS[k].includes(v) : ACTS.includes(k); };
const bad = P.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.rule || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, the rule, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe or guide puts a hand in the steam, calls it smoke, or uses boiling water in the jar',
   [].concat(P.DISCOVERIES.map(d => d.how), P.GUIDES.map(G => G.steps.map(s => s.on))).every(h => !h.includes('hand') && !h.includes('name:smoke') && !h.includes('jwater:boiling') && !h.includes('angle')));

// A model of the bench, run through each recipe with the data file's own rules.
function runRecipe(how) {
  const st = { rig: 'heat', adult: false, heat: P.heatNew('ice'), flags: {},
               dry: { sel: 'A', items: P.newDishes(), h: 0, cards: {} }, jar: { j: P.blankJar(), steps: 0, cards: {} } };
  const found = new Set(), cards = [];
  for (const t of how) {
    const [k, v] = t.split(':');
    if (k === 'rig') { st.rig = v; continue; }
    if (k === 'adult') { st.adult = v === 'on'; continue; }
    if (k === 'start' || k === 'place') {
      st.rig = 'heat';
      const r = P.applyHeat(st.heat, k, v, st.adult);
      if (r.hazard) cards.push(r.hazard); else if (r.refuse) cards.push('refused ' + t); else st.heat = r.s;
      continue;
    }
    if (k === 'name') {
      if (!P.steamy(st.heat)) cards.push('nothing rising'); else if (v === 'smoke') cards.push('smoke'); else { found.add('steam'); st.flags.steam = true; }
      continue;
    }
    if (k === 'min' || k === 'five') {
      const prev = st.heat, fr = P.heatRun(prev, k === 'min' ? 1 : 5);
      st.heat = fr[fr.length - 1];
      P.heatFinds(prev, st.heat).forEach(x => found.add(x));
      continue;
    }
    if (k === 'read') { P.readFinds(st.heat).forEach(x => { found.add(x); st.flags[x] = true; }); continue; }
    if (k === 'angle') { cards.push('angle'); continue; }
    if (k === 'catch') { if (P.steamy(st.heat)) { found.add('condense'); st.flags.caught = true; } else cards.push('no steam'); continue; }
    if (k === 'hand') { if (P.steamy(st.heat)) cards.push('steam'); continue; }
    if (k === 'dish') { st.rig = 'dry'; st.dry.sel = v; continue; }
    if (['cont', 'spot', 'fan', 'lid', 'amt'].includes(k)) {
      st.rig = 'dry';
      if (st.dry.h > 0) { cards.push('locked ' + t); continue; }
      const r = P.applyDry(st.dry.items[st.dry.sel], k, v);
      if (r.refuse) cards.push('refused ' + t); else st.dry.items[st.dry.sel] = r.s;
      continue;
    }
    if (k === 'hour' || k === 'six') {
      if (st.dry.h >= P.DRY_HOURS) { cards.push('race over'); continue; }
      st.dry.h = k === 'six' ? P.DRY_HOURS : st.dry.h + 1;
      P.dryFinds(st.dry.items, st.dry.h).forEach(x => found.add(x));
      P.dryMistakes(st.dry.items, st.dry.h).forEach(m => cards.push(m.id));
      continue;
    }
    if (['jwater', 'jlid', 'jplace'].includes(k)) {
      st.rig = 'jar';
      if (st.jar.steps > 0) { cards.push('locked ' + t); continue; }
      const r = P.applyJar(st.jar.j, k, v, st.adult);
      if (r.hazard) cards.push(r.hazard); else if (r.refuse) cards.push('refused ' + t); else st.jar.j = r.s;
      continue;
    }
    if (k === 'ten') {
      if (st.jar.j.water === 'none') { cards.push('empty jar'); continue; }
      if (st.jar.steps >= P.JAR_STEPS) { cards.push('jar over'); continue; }
      st.jar.steps++;
      P.jarFinds(st.jar.j, st.jar.steps).forEach(x => found.add(x));
      P.jarMistakes(st.jar.j, st.jar.steps).forEach(m => cards.push(m.id));
      continue;
    }
    if (k === 'reset') continue;
    cards.push('unknown ' + t);
  }
  return { found, cards, st };
}
const unsolved = P.DISCOVERIES.map(d => ({ d, r: runRecipe(d.how) })).filter(x => !x.r.found.has(x.d.id) || x.r.cards.length)
  .map(x => x.d.id + ' -> found ' + [...x.r.found].join('/') + (x.r.cards.length ? ' cards ' + x.r.cards.join('/') : ''));
ok('every recipe leads to its own discovery with no mistake card on the way', unsolved.length === 0, unsolved);
const reachable = new Set();
P.DISCOVERIES.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => dids.includes(x)), [...reachable].filter(x => !dids.includes(x)));
ok('every discovery is unlocked by some recipe', dids.every(id => reachable.has(id)), dids.filter(id => !reachable.has(id)));
ok('the bench unlocks "steam" and "condense" itself', bench.includes("_discover('steam')") && bench.includes("_discover('condense')"));

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', P.GUIDES.length >= 3 && new Set(P.GUIDES.map(g => g.id)).size === P.GUIDES.length);
for (const G of P.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  const r = runRecipe(G.steps.map(s => s.on));
  ok(`${G.title}: ends with what they found out, and runs with no mistake card`, !!(G.lesson && G.blurb && G.icon) && r.cards.length === 0, r.cards);
}
ok('“From ice to steam” reads 0 °C, then 100 °C, names the steam and catches it',
   (() => { const r = runRecipe(P.GUIDES.find(g => g.id === 'ice_steam').steps.map(s => s.on)); return ['zero', 'boil', 'steam', 'condense'].every(x => r.found.has(x)); })());
ok('the welcome card’s “Show me how” guide exists', P.GUIDES.some(g => g.id === 'ice_steam') && bench.includes('data-guide="ice_steam"'));

console.log('\nExperiments (lab_experiment.js, LAB_SPEC.md §10)');
const EX = P.EXPERIMENTS || [];
ok('the data file exports EXPERIMENTS', Array.isArray(EX) && EX.length > 0);
ok('5 experiments at Grade 4, ids unique, every one teaches g4sci-water',
   EX.length === 5 && new Set(EX.map(e => e.id)).size === EX.length && EX.every(e => e.chapter === 'g4sci-water' && JSON.stringify(e.grades) === '[4]'), EX.map(e => [e.id, e.chapter, e.grades]));
ok('experiment 1 is the exam-shaped one: what happens to ice when it is heated (g4s-wat-006)', EX[0] && EX[0].id === 'ice_heated' && /ice is heated/.test(EX[0].title));
// The visible label of every control (lab_water.js draws them): a step's `say`
// must name the one it points at, with the emoji and any <small> line dropped.
const TOOL_LABEL = { min: 'Wait 1 minute', five: 'Wait 5 minutes', read: 'Read at eye level', angle: 'Read from above', catch: 'Cold plate over it',
                     hand: 'Feel the steam', reset: 'Start again', hour: 'Wait 1 hour', six: 'Wait to hour 6', ten: 'Wait 10 minutes' };
const RIG_LABEL = { heat: 'Heat &amp; cool', dry: 'Drying race', jar: 'Water cycle' };
ok('the tool and bench labels this test knows are the ones the bench draws',
   Object.values(TOOL_LABEL).concat(Object.values(RIG_LABEL), ['It is steam', 'It is smoke', 'Ask adult helper']).every(l => bench.includes(l)),
   Object.values(TOOL_LABEL).concat(Object.values(RIG_LABEL)).filter(l => !bench.includes(l)));
function labelFor(tok) {
  const [k, v] = tok.split(':');
  if (v === undefined) return TOOL_LABEL[k] || null;
  switch (k) {
    case 'rig': return RIG_LABEL[v].replace('&amp;', '&');
    case 'adult': return 'Ask adult helper';
    case 'start': return P.STARTS[v].name;
    case 'place': return P.PLACES[v].name;
    case 'name': return v === 'steam' ? 'It is steam' : 'It is smoke';
    case 'dish': return v;
    case 'cont': return P.CONTS[v].name;
    case 'spot': return P.SPOTS[v].name;
    case 'fan': case 'lid': return v === 'on' ? 'Yes' : 'No';
    case 'amt': return v + ' ml';
    case 'jwater': return P.JAR_WATERS[v].name;
    case 'jlid': return P.JAR_LIDS[v].name;
    case 'jplace': return P.JAR_SPOTS[v].name;
  }
  return null;
}
const plain = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
const stepToks = s => s.options || s.any || (s.on ? [s.on] : []);
const rightPath = e => e.setup.concat(e.steps.map(s => s.on || (s.any && s.any[0])));
const rigOf = e => (e.setup.find(t => /^rig:/.test(t)) || 'rig:heat').slice(4);
// What each See claims, checked against the replayed model (runRecipe above).
const SEE_TRUE = {
  ice_heated: (r, e) => { const h = r.st.heat; return h.ice === 0 && h.water > 0 && h.T > P.ROOM_C && r.found.has('zero') && r.found.has('melt') && /melted/.test(e.see.saw) && /0 °C/.test(e.see.saw); },
  boil: (r, e) => { const h = r.st.heat; return P.phase(h) === 'boiling' && h.T === P.BOIL_C && ['boil', 'steam', 'condense'].every(x => r.found.has(x)) && r.st.flags.caught && /100 °C/.test(e.see.saw) && /drops/.test(e.see.saw); },
  freeze: (r, e) => { const h = r.st.heat; return h.water === 0 && h.ice === P.MASS && h.T < 0 && r.found.has('zero') && r.found.has('freeze') && /froze/.test(e.see.saw) && /0 °C/.test(e.see.saw) && /colder/.test(e.see.saw); },
  rain_jar: (r, e) => P.jarStage(r.st.jar.j, r.st.jar.steps) === 'rain' && r.st.jar.j.lid === 'ice' && r.found.has('jar_cycle') && /rain/.test(e.see.saw) && /drops/i.test(e.see.saw),
  drying_race: (r, e) => { const it = r.st.dry.items, h = r.st.dry.h, L = id => P.dryLeft(it[id], h);
    return h === P.DRY_HOURS && L('C') < L('B') && L('B') < L('A') && r.found.has('sun_dries') && r.found.has('wind_dries') && /dish C/i.test(e.see.saw) && /least/.test(e.see.saw) && /dish A/i.test(e.see.saw) && /most/.test(e.see.saw); },
};
ok('every experiment has a See truth check in this test', EX.every(e => typeof SEE_TRUE[e.id] === 'function'), EX.map(e => e.id).filter(id => !SEE_TRUE[id]));
for (const e of EX) {
  const t = e.id;
  ok(`${t}: the title is a question a child can say back, the aim one or two short sentences`,
     /\?$/.test(e.title) && e.title.length >= 8 && e.title.length <= 60 && e.aim.length >= 20 && e.aim.length <= 200 && e.aim.split(/[.!?]\s/).length <= 3, { title: e.title, aim: e.aim });
  const badSetup = e.setup.filter(tok => !tokenOk(tok));
  ok(`${t}: every set-up token is one the bench accepts`, badSetup.length === 0, badSetup);
  const badStep = e.steps.filter(s => !stepToks(s).every(tokenOk) || !(s.say || s.ask) || !stepToks(s).length);
  ok(`${t}: every step token is real, and each step says something`, badStep.length === 0, badStep);
  const wc = e.steps.map(s => String(s.say || s.ask).split(/\s+/).length);
  ok(`${t}: 1 to 5 steps, each under 25 words (${wc.join('/')})`, e.steps.length >= 1 && e.steps.length <= 5 && wc.every(n => n <= 25), wc);
  const asks = e.steps.filter(s => s.ask);
  ok(`${t}: at least one step is a decision`, asks.length >= 1);
  ok(`${t}: every decision lists its answer among 2+ options; every wrong option is a listed, different option with an explanation`,
     asks.every(s => Array.isArray(s.options) && s.options.length >= 2 && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on))
       && Object.keys(s.wrong || {}).every(k => s.options.includes(k) && k !== s.on && !(s.any || []).includes(k) && s.wrong[k].length > 15)), asks);
  ok(`${t}: no wrong option is a hazard the bench would have to fire (the bench only hears it)`,
     asks.every(s => Object.keys(s.wrong || {}).every(k => !['hand', 'angle', 'jwater:boiling'].includes(k))) && /_expWrong\(/.test(bench));
  const unnamed = e.steps.filter(s => s.say && s.on).filter(s => { const l = labelFor(s.on); return !l || !plain(s.say).includes(plain(l)); });
  ok(`${t}: every wait-and-watch instruction names the button it points at`, unnamed.length === 0, unnamed.map(s => [s.on, labelFor(s.on), s.say]));
  ok(`${t}: every step token has a control the test can tap (a wait has its own button)`, e.steps.every(s => stepToks(s).every(tok => labelFor(tok))), e.steps.flatMap(stepToks).filter(tok => !labelFor(tok)));
  const p = e.predict;
  ok(`${t}: the prediction is 2-4 taps and its answer is one of them`, p && Array.isArray(p.options) && p.options.length >= 2 && p.options.length <= 4 && p.options.every(o => o.id && o.label) && p.options.some(o => o.id === p.answer), p);
  const r = runRecipe(rightPath(e));
  ok(`${t}: the set-up and the right path run on the bench with no hazard or mistake card`, r.cards.length === 0, r.cards);
  ok(`${t}: the See text is TRUE for the replayed model ("${e.see.saw.slice(0, 40)}…")`, SEE_TRUE[e.id] && SEE_TRUE[e.id](r, e),
     { heat: r.st.heat, dry: Object.fromEntries(P.DISHES.map(id => [id, P.dryLeft(r.st.dry.items[id], r.st.dry.h)])), jar: r.st.jar, found: [...r.found] });
  ok(`${t}: See says what was learnt`, typeof e.see.learn === 'string' && e.see.learn.length > 20);
  const qs = e.check.map(ref => typeof ref === 'object' ? ref : (M => M && M.quiz[+ref.split(':')[1]])(P.MISSIONS.find(M => M.id === ref.split(':')[0])));
  ok(`${t}: 2-3 check questions resolve, each with 4 distinct options and a reason`,
     e.check.length >= 2 && e.check.length <= 3 && new Set(e.check.map(c => JSON.stringify(c))).size === e.check.length
       && qs.every(q => q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && q.why), e.check);
  const rig = rigOf(e);
  ok(`${t}: every mission question it checks with comes from the bench it ran on (${rig})`,
     e.check.every(ref => typeof ref === 'object' || (P.MISSIONS.find(M => M.id === ref.split(':')[0]) || {}).rig === rig), e.check);
  ok(`${t}: has an exam line that quotes no paper (the Grade 4 question files hold none)`, typeof e.exam === 'string' && e.exam.length > 10 && !/PSAC \d{4}/.test(e.exam), e.exam);
}
ok('the bench exports the experiment adapter the runner needs',
   ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('^\\s+' + k + ':', 'm').test(bench.slice(bench.indexOf('const experiment = {'), bench.indexOf('hooks: {},') + 12))) && /return \{ study, experiment,/.test(bench));
ok('set-up is silent: no discovery toast and no card while apply() runs', /if \(_silent\) return;/.test(bench) && /_silent = true;/.test(bench));
ok('an experiment guide never wipes the bench the runner set up', /if \(!G\.exp\) _resetBench\(\);/.test(bench));

console.log('\nMissions, hazards and result cards');
ok('at least 2 missions', P.MISSIONS.length >= 2);
for (const M of P.MISSIONS) {
  const badQ = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(`${M.title}: has a goal, a blurb and a bench`, !!(M.intro && M.blurb && M.icon && ['heat', 'dry', 'jar'].includes(M.rig)));
}
const G1 = runRecipe(P.GUIDES.find(g => g.id === 'ice_steam').steps.map(s => s.on));
ok('"Ice to steam" is ready after the guided steps, not before', P.missionReady('states', { flags: G1.st.flags }) && !P.missionReady('states', { flags: { zero: true, boil: true } }));
const race = runRecipe(['dish:B', 'spot:sun', 'dish:C', 'fan:on', 'hour', 'hour', 'hour']);
ok('"The drying race" is ready at hour 3 with two fair tests, not at hour 2', P.missionReady('race', { items: race.st.dry.items, h: 3 }) && !P.missionReady('race', { items: race.st.dry.items, h: 2 }));
ok('…but not with an unfair dish', !P.missionReady('race', { items: dishes(base, Dsh({ spot: 'sun' }), Dsh({ fan: true, cont: 'plate', amt: 60 })), h: 6 }));
ok('"Rain in a jar" is ready when it rains under a lid', P.missionReady('cycle', { j: J({ water: 'warm', lid: 'ice' }), steps: 2 }) && !P.missionReady('cycle', { j: J({ water: 'warm', lid: 'ice' }), steps: 1 }));
ok('the answers are the science: 0 °C melts, 100 °C boils, precipitation is rain',
   P.MISSIONS[0].quiz[0].options[0] === '0 °C' && P.MISSIONS[0].quiz[1].options[0] === '100 °C'
   && P.MISSIONS[2].quiz.some(q => /falls from clouds/.test(q.q) && q.options[0] === 'Precipitation'));
ok('only the PSAC paper found in the question bank is quoted (PSAC 2022, Question 1)',
   (src.match(/PSAC (\d{4})/g) || []).length > 0 && (src.match(/PSAC (\d{4})/g) || []).every(m => m === 'PSAC 2022'),
   (src.match(/PSAC (\d{4})/g) || []));
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard', 'warning', 'sharp'];
for (const [id, H] of Object.entries(P.HAZARDS)) {
  ok(`hazard ${id}: real signs, what happened, why, what to do instead and the exam point`,
     H.signs.length && H.signs.every(s => SIGNS.includes(s)) && H.title() && H.happened() && H.why && H.instead && H.exam);
}
ok('the hot plate, the steam and the kettle are HOT hazards; the hot plate and kettle say ask an adult',
   ['hotplate', 'steam', 'kettle'].every(id => P.HAZARDS[id].signs.includes('hot')) && /ask an adult/i.test(P.HAZARDS.hotplate.instead) && /ask an adult/i.test(P.HAZARDS.kettle.instead));
ok('a cracked glass jar is SHARP, never the chemical "irritant" sign', P.HAZARDS.crack.signs.includes('sharp') && Object.values(P.HAZARDS).every(H => !H.signs.includes('irritant')));
const rctx = { seen: 104, real: 100, dish: 'B', other: 'A', n: 2, what: 'the sun and the fan', amt: 60, otherAmt: 30 };
for (const [id, R] of Object.entries(P.RESULTS)) {
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && R.title && R.happened(rctx) && R.instead && R.exam));
}
ok('the wrong-but-safe mistakes the brief asks for are there: unfair test, thermometer at an angle, steam called smoke',
   ['two_vars', 'amounts', 'angle', 'smoke', 'no_lid'].every(id => P.RESULTS[id]));
ok('the exam heading is never hardcoded in the lab (the shell adds it)', !/In the PSAC exam/.test(src + bench));
const used = id => bench.includes(`'${id}'`) || src.includes(`id: '${id}'`) || src.includes(`hazard: '${id}'`) || src.includes(`'${id}' : '`) || src.includes(`? '${id}'`) || src.includes(`: '${id}' }`);
ok('every hazard and result card can be raised', Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).every(used),
   Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).filter(id => !used(id)));
ok('at least 3 mistakes that teach', Object.keys(P.HAZARDS).length + Object.keys(P.RESULTS).length >= 3);
ok('the 💡 facts are there', P.FACTS.length >= 10 && P.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log('\nReading level (Grade 4)');
const texts = [];
P.GUIDES.forEach(G => { texts.push(G.blurb, G.lesson); G.steps.forEach(s => texts.push(s.say)); });
P.DISCOVERIES.forEach(d => texts.push(d.hint, d.saw, d.learn, d.psac || ''));
P.MISSIONS.forEach(M => { texts.push(M.blurb, M.intro); M.quiz.forEach(q => texts.push(q.q, q.why)); });
(P.EXPERIMENTS || []).forEach(e => {
  texts.push(e.title, e.aim, e.predict.q, e.see.saw, e.see.learn, e.exam);
  e.predict.options.forEach(o => texts.push(o.label, o.sub || ''));
  e.steps.forEach(s => { texts.push(s.say || s.ask); Object.values(s.wrong || {}).forEach(w => texts.push(w)); });
  e.check.forEach(c => { if (typeof c === 'object') texts.push(c.q, c.why); });
});
Object.values(P.HAZARDS).forEach(H => texts.push(H.title(), H.happened(), H.why, H.instead, H.exam));
Object.values(P.RESULTS).forEach(R => texts.push(R.title, R.happened(rctx), R.instead, R.exam));
texts.push(...P.FACTS, ...Object.values(P.SAY), ...Object.values(P.JAR_SEEN));
const long = [];
texts.filter(Boolean).forEach(t => t.split(/[.!?]\s+/).forEach(sn => { const n = (sn.match(/\S+/g) || []).length; if (n > 16) long.push(n + ': ' + sn); }));
ok('no sentence is longer than 16 words', long.length === 0, long);

console.log('\nEngineering');
ok('no regex lookbehind in the lab files (a Safari < 16.4 parse error)', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('both files export their global to window', /window\.LabWaterData = LabWaterData/.test(src) && /window\.LabWater = LabWater/.test(bench));
ok('the bench never records answers into mastery', !/recordAnswer|_recordDaily/.test(bench));
// (No line-ending check: the two JS files are CRLF in the repository and the
// css is LF - line endings differ per file in this project, by history.)

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
