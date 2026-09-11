'use strict';
// Science Labs: the science the Food Tests lab is allowed to show.
//
// The bench draws whatever engine/labs/lab_food_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks: that every test and
// colour is grounded in the app's own Grade 8 pack; that every colour is real
// (the Benedict's ladder runs blue → green → yellow → orange → brick-red, iodine
// goes blue-black, Biuret purple); which food gives which result in every test;
// that Benedict's needs heat, Biuret needs time and a grease spot needs to dry;
// that a dirty spatula gives a false positive; that every discovery recipe is
// valid and unlocks its own card; and that every quiz, hazard and result card is
// complete.
//
// Run: node scripts/test-labs-food-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src = read('engine', 'labs', 'lab_food_data.js');
const bench = read('engine', 'labs', 'lab_food.js');
const core = read('engine', 'labs', 'lab_core.js');
const manifest = read('subjects', 'grade8-science', '_manifest.js');
const qdir = path.join(ROOT, 'subjects', 'grade8-science', 'questions');
const q8 = fs.readdirSync(qdir).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(qdir, f), 'utf8')).join('\n');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabFoodData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── colour maths ──
const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
function hue(hex) {
  const [r, g, b] = rgb(hex), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return 0;
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60; return h < 0 ? h + 360 : h;
}
const lum = hex => { const [r, g, b] = rgb(hex); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };

console.log('\nGrounded in the Grade 8 pack');
ok('grade8-science declares chapter g8s-food', /id: 'g8s-food'/.test(manifest));
ok('its syllabus says "Test a food sample to identify its components"', /Test a food sample to identify its components/.test(manifest));
const cite = ['g8s-food-016', 'g8s-food-011', 'g8s-hd-015', 'g8s-hd-022', 'g8s-inquiry-001', 'g8s-hd-008'];
ok(`the lab rests on real Grade 8 questions (${cite.join(', ')})`, cite.every(id => q8.includes(`'${id}'`)), cite.filter(id => !q8.includes(`'${id}'`)));
ok('…and the data file names each of them', cite.every(id => src.includes(id)));
const say = ['Benedict’s solution', 'brick-red', 'blue-black', 'orange-brown', 'Biuret', 'purple', 'grease-spot', 'ethanol test', 'emulsion test', 'Chemicals are never tasted'];
ok('the pack itself names every test and colour the lab uses', say.every(w => q8.includes(w)), say.filter(w => !q8.includes(w)));
ok('iodine: orange-brown → blue-black (g8s-food-011)', D.TESTS.iodine.before === 'orange-brown' && D.TESTS.iodine.after === 'blue-black' && D.TESTS.iodine.nutrient === 'starch');
ok('Benedict’s: blue → brick-red, for reducing sugar, heated (g8s-food-016)', D.TESTS.benedicts.before === 'blue' && D.TESTS.benedicts.after === 'brick-red' && D.TESTS.benedicts.nutrient === 'sugar');
ok('Biuret: blue → purple, for protein (g8s-food-016)', D.TESTS.biuret.before === 'blue' && D.TESTS.biuret.after === 'purple' && D.TESTS.biuret.nutrient === 'protein');
ok('fat: the grease-spot test and the ethanol (emulsion) test', D.TESTS.paper.nutrient === 'fat' && D.TESTS.ethanol.nutrient === 'fat');
ok('anything beyond the pack is labelled "beyond the Grade 8 syllabus" (sucrose, a non-reducing sugar)',
   D.FOODS.sucrose.nonReducing && /beyond the Grade 8 syllabus/.test(D.FOODS.sucrose.rich) && /beyond the Grade 8 syllabus/.test(D.DISCOVERIES.find(d => d.id === 'sucrose_blue').learn));
ok('no NCE/PSAC paper reference is quoted - there is no Grade 8 paper in the repo', !/20\d\d Q\d/.test(src));

console.log('\nColours are real');
const C = D.COLORS;
ok('every colour is a #rrggbb hex', Object.values(C).every(h => /^#[0-9A-F]{6}$/i.test(h)));
const L = D.LADDER;
ok('the Benedict’s ladder is blue, green, yellow, orange, brick-red', L.map(x => x.word).join() === 'blue,green,yellow,orange,brick-red');
const hs = L.map(x => hue(x.hex));
ok(`…and its hues really run that way (${hs.map(h => Math.round(h)).join(' > ')})`, hs.every((h, i) => i === 0 || h < hs[i - 1]) && hs[0] > 190 && hs[0] < 240 && hs[4] < 20);
ok('brick-red is darker than orange', lum(C.bBrick) < lum(C.bOrange));
ok(`iodine is orange-brown (hue ${Math.round(hue(C.iodine))}°) and blue-black is nearly black and bluish`,
   hue(C.iodine) > 18 && hue(C.iodine) < 40 && lum(C.blueBlack) < 0.1 && hue(C.blueBlack) > 200 && hue(C.blueBlack) < 260);
ok(`Biuret blue is blue; purple (hue ${Math.round(hue(C.purple))}°) and lilac are purple, lilac the paler`,
   hue(C.biuretBlue) > 200 && hue(C.biuretBlue) < 240 && hue(C.purple) > 260 && hue(C.purple) < 300 && hue(C.lilac) > 245 && hue(C.lilac) < 290 && lum(C.lilac) > lum(C.purple));
ok('cloudy white is lighter than clear water', lum(C.cloudy) > lum(C.clear));

console.log('\nWhich food gives which result (every test finished properly)');
const DONE = { heat: 99, t: 99, dry: true };
const W = { iodine: 'orange-brown', benedicts: 'blue', biuret: 'blue', paper: 'no spot - the water dried away', ethanol: 'clear' };
const expect = {
  water:     {},
  cornflour: { iodine: 'blue-black' },
  glucose:   { benedicts: 'brick-red' },
  sucrose:   {},
  gelatine:  { biuret: 'purple' },
  oil:       { paper: 'a translucent spot', ethanol: 'cloudy white' },
  milk:      { benedicts: 'orange', biuret: 'purple', paper: 'a faint translucent spot', ethanol: 'slightly cloudy white' },
  mystery:   { iodine: 'blue-black', benedicts: 'brick-red' },
};
ok('every food on the shelf is in the table', D.SHELF_FOODS.every(f => expect[f]) && Object.keys(expect).every(f => D.FOODS[f]));
for (const [food, pos] of Object.entries(expect)) {
  const bad = [];
  for (const test of D.SHELF_TESTS) {
    const r = D.resultFor(test, food, null, DONE), want = pos[test] || W[test];
    if (!r || r.word !== want || r.positive !== !!pos[test] || !r.finished || r.fromTrace) bad.push({ test, got: r && r.word, want });
  }
  ok(`${D.FOODS[food].name}: ${Object.keys(pos).length ? Object.entries(pos).map(([t, w]) => `${t} ${w}`).join(', ') : 'no test is positive'}`, !bad.length, bad);
}
ok('a positive result names its nutrient, a negative one says it is absent',
   D.resultFor('iodine', 'cornflour', null, DONE).meaning === 'starch present' && D.resultFor('benedicts', 'water', null, DONE).meaning === 'no reducing sugar');
ok('water (the control) is negative in every test', D.SHELF_TESTS.every(t => !D.resultFor(t, 'water', null, DONE).positive));
ok('each food’s main nutrient is found by its own test and NOT by the others (one test answers one question)',
   ['cornflour', 'glucose', 'gelatine'].every(f => D.SHELF_TESTS.filter(t => D.resultFor(t, f, null, DONE).positive).length === 1));

console.log('\nHeat, time and drying');
const B = D.BENEDICT;
ok(`Benedict’s works hot: the bath (${D.BATH.temp} °C) is above the ${B.minT} °C it needs, and below boiling`, D.BATH.temp > B.minT && D.BATH.temp < 100 && B.heatFor > 0);
ok('unheated Benedict’s stays blue for EVERY food (a false negative for sugar)',
   Object.keys(D.FOODS).every(f => { const r = D.resultFor('benedicts', f, null, { heat: 0 }); return r.word === 'blue' && !r.positive && !r.finished && r.unheated; }));
const walk = [0, 0.3, 0.5, 0.8, 1].map(p => D.resultFor('benedicts', 'glucose', null, { heat: p * B.heatFor }).word);
ok(`as glucose heats, Benedict’s climbs the ladder (${walk.join(' → ')})`, walk.join() === 'blue,green,yellow,orange,brick-red', walk);
const milkWalk = [0.4, 1].map(p => D.resultFor('benedicts', 'milk', null, { heat: p * B.heatFor }).word);
ok('milk stops at orange - it never reaches brick-red', milkWalk[1] === 'orange' && milkWalk[0] !== 'brick-red');
ok('the ladder never goes backwards while heating', Object.keys(D.FOODS).every(f => {
  const steps = [0, 1, 2, 3, 4, 5, 6].map(k => L.findIndex(x => x.word === D.resultFor('benedicts', f, null, { heat: k * B.heatFor / 6 }).word));
  return steps.every((s, i) => i === 0 || s >= steps[i - 1]);
}));
const U = D.BIURET;
ok(`Biuret: full colour after ${U.develop} min; reading before ${U.readAfter} min is too soon`, U.readAfter < U.develop && U.readAfter > 0);
ok('gelatine with Biuret is still blue at first, lilac while changing, purple when done',
   D.resultFor('biuret', 'gelatine', null, { t: 0 }).word === 'blue' && /lilac/.test(D.resultFor('biuret', 'gelatine', null, { t: U.develop * 0.6 }).word)
   && !D.resultFor('biuret', 'gelatine', null, { t: U.develop * 0.6 }).finished && D.resultFor('biuret', 'gelatine', null, { t: U.develop }).word === 'purple');
ok('a wet grease spot looks see-through for EVERY food, and is never a finished result',
   Object.keys(D.FOODS).every(f => { const r = D.resultFor('paper', f, null, { dry: false }); return r.wet && !r.positive && !r.finished; }));
ok(`the spot dries in ${D.PAPER.dry} min; then water leaves nothing`, D.PAPER.dry > 0 && D.resultFor('paper', 'water', null, { dry: true }).word === 'no spot - the water dried away');
ok('iodine and the ethanol test give their result at once', D.resultFor('iodine', 'cornflour', null, {}).finished && D.resultFor('ethanol', 'oil', null, {}).finished);

console.log('\nContamination: a dirty spatula');
const dirty = D.resultFor('benedicts', 'cornflour', 'glucose', DONE);
ok('cornflour with a trace of glucose turns Benedict’s green - a false positive, flagged as from the trace', dirty.word === 'green' && dirty.positive && dirty.fromTrace, dirty);
ok('a trace of cornflour turns the water control blue-black - and is flagged', D.resultFor('iodine', 'water', 'cornflour', DONE).fromTrace);
ok('a food’s own nutrient is never blamed on a trace (milk with a glucose trace is still orange, not from the trace)',
   (r => r.word === 'orange' && !r.fromTrace)(D.resultFor('benedicts', 'milk', 'glucose', DONE)));
ok('a trace is always only "a little" (level 1)', ['starch', 'sugar', 'protein', 'fat'].every(n => Object.keys(D.FOODS).every(f => D.levels('water', f, n).tr <= 1)));

console.log('\nDiscoveries');
const gradesOf = x => x.grades || [8];
const ids = D.DISCOVERIES.map(d => d.id);
ok(`at least 12 discoveries (${ids.length})`, D.forGrade(D.DISCOVERIES, 8).length >= 12);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const WAITS = D.WAITS;
const tokenOk = on => {
  const [k, a] = on.split(':');
  if (['goggles', 'bath', 'burner-off', 'rinse', 'read', 'clean'].includes(k)) return a === undefined;
  if (WAITS.includes(k)) return a === undefined;
  if (k === 'slot') return +a >= 1 && +a <= D.SLOTS;
  if (k === 'food') return !!D.FOODS[a] && !D.FOODS[a].missionOnly;
  if (k === 'test') return !!D.TESTS[a];
  if (k === 'card') return !!D.RESULTS[a];
  return false;
};
const badDisc = D.DISCOVERIES.filter(d => !d.title || !d.icon || !d.hint || !d.saw || !d.learn || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk) || !(d.rule || d.card));
ok('every discovery has a title, a clue, what you saw, why it happens, a valid recipe and a way to unlock', badDisc.length === 0, badDisc.map(d => d.id));
// The slot a recipe ends on, and what is in it.
function lastTube(how) {
  let sel = 1; const tubes = {};
  for (const on of how) {
    const [k, a] = on.split(':');
    if (k === 'slot') sel = +a;
    if (k === 'food') tubes[sel] = { food: a };
    if (k === 'test') tubes[sel].test = a;
  }
  return tubes[sel];
}
const ruleBad = D.DISCOVERIES.filter(d => d.rule).filter(d => {
  const t = lastTube(d.how);
  return !t || !t.test || !D.discoveriesFor(t.test, t.food, D.resultFor(t.test, t.food, null, DONE)).includes(d.id) || d.how[d.how.length - 1] !== 'read';
});
ok('every rule discovery’s recipe ends with a reading that really unlocks it', ruleBad.length === 0, ruleBad.map(d => d.id));
const cardBad = D.DISCOVERIES.filter(d => d.card).filter(d => d.how[d.how.length - 1] !== 'card:' + d.card || d.how[d.how.length - 2] !== 'read');
ok('every card discovery’s recipe ends: read, then its own card', cardBad.length === 0, cardBad.map(d => d.id));
ok('every result card has a discovery that shows it', Object.keys(D.RESULTS).every(c => D.DISCOVERIES.some(d => d.card === c)) && D.CARD_ORDER.slice().sort().join() === Object.keys(D.RESULTS).sort().join());
ok('an unfinished reading unlocks nothing', D.discoveriesFor('benedicts', 'glucose', D.resultFor('benedicts', 'glucose', null, { heat: 0 })).length === 0);
// Recipe safety and fairness.
const needsG = on => on === 'test:biuret' || on === 'bath';
const unsafe = D.DISCOVERIES.filter(d => d.how.some(needsG) && !(d.how.indexOf('goggles') > -1 && d.how.indexOf('goggles') < d.how.findIndex(needsG)));
ok('a recipe with Biuret or heating puts goggles on first', unsafe.length === 0, unsafe.map(d => d.id));
const fire = [...D.DISCOVERIES.map(d => d.how), ...D.GUIDES.map(G => G.steps.map(s => s.on))].filter(h => h.includes('test:ethanol'))
  .filter(h => h.indexOf('burner-off') < 0 || h.indexOf('burner-off') > h.indexOf('test:ethanol') || h.includes('bath'));
ok('every ethanol recipe turns the burner off first and never heats', fire.length === 0);
const waitsOk = h => h.every((on, i) => {
  const before = h.slice(0, i);
  if (on === 'heated') return before.includes('test:benedicts') && before.includes('bath');
  if (on === 'developed') return before.includes('test:biuret');
  if (on === 'dry') return before.includes('test:paper');
  return true;
});
ok('a wait (heated / developed / dry) only comes after the thing it waits for',
   D.DISCOVERIES.every(d => waitsOk(d.how)) && D.GUIDES.every(G => waitsOk(G.steps.map(s => s.on))));
const unrinsed = h => { let last = null, dirty = false;
  for (const on of h) { if (on === 'rinse') dirty = false; if (on.startsWith('food:')) { if (dirty && last !== on) return true; dirty = true; last = on; } } return false; };
ok('only the contamination recipe skips rinsing the spatula between two foods',
   D.DISCOVERIES.filter(d => unrinsed(d.how)).map(d => d.id).join() === 'dirty_spatula' && !D.GUIDES.some(G => unrinsed(G.steps.map(s => s.on))));
ok('every discovery can be found (a reading rule or a card)', D.DISCOVERIES.every(d => d.rule || d.card));

console.log('\nGuided experiments');
const guides = D.forGrade(D.GUIDES, 8);
ok(`at least 3 guided experiments (${guides.length})`, guides.length >= 3);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || (WAITS.includes(s.on) || s.on.startsWith('card:') ? !!s.btn : !s.btn));
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is a wait`, bad.length === 0, bad);
  ok(`${G.title}: blurb, icon and what they found out`, !!(G.lesson && G.blurb && G.icon));
  const h = G.steps.map(s => s.on), final = lastTube(h);
  ok(`${G.title}: its last reading is a finished result`, h[h.length - 1] !== 'read' || D.resultFor(final.test, final.food, null, DONE).finished);
}
const same = G => { const tubes = {}; let sel = 1; G.steps.forEach(s => { const [k, a] = s.on.split(':'); if (k === 'slot') sel = +a; if (k === 'food') tubes[sel] = { food: a }; if (k === 'test') tubes[sel].test = a; }); return Object.values(tubes); };
ok('a guide that compares two tubes with one test includes a water control', D.GUIDES.every(G => {
  const t = same(G), byTest = {};
  t.forEach(x => { (byTest[x.test] = byTest[x.test] || []).push(x.food); });
  return Object.values(byTest).every(f => f.length < 2 || f.includes('water'));
}));
ok('the guides cover all four nutrients', ['starch', 'sugar', 'protein', 'fat'].every(n => D.GUIDES.some(G => G.steps.some(s => s.on.startsWith('test:') && D.TESTS[s.on.split(':')[1]].nutrient === n))));

console.log('\nMissions');
const missions = D.forGrade(D.MISSIONS, 8);
ok(`at least 2 missions (${missions.length})`, missions.length >= 2);
const optLabel = o => (typeof o === 'object' ? o.label : o);
for (const M of D.MISSIONS) {
  const bad = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options.map(optLabel)).size !== 4
    || q.options.some(o => typeof o === 'object' && !(o.label && /^<svg[\s\S]*<\/svg>$/.test(o.svg))));
  ok(`${M.title}: ${M.quiz.length} questions (at least 5), each with 4 distinct options and a reason`, bad.length === 0 && M.quiz.length >= 5, bad.map(q => q.q));
  ok(`${M.title}: intro, blurb and icon`, !!(M.intro && M.blurb && M.icon));
  const pics = M.quiz.filter(q => typeof q.options[0] === 'object');
  ok(`${M.title}: each picture option shows the colour its label names`,
     pics.every(q => q.options.every(o => { const hex = Object.values(C).find(h => o.svg.includes(`fill="${h}"`)); return hex && [...L.filter(x => x.hex === hex).map(x => x.word), ...(hex === C.blueBlack ? ['blue-black'] : []), ...(hex === C.iodine ? ['orange-brown'] : []), ...(hex === C.purple ? ['purple'] : [])].includes(o.label.toLowerCase()); })));
}
ok('missions use picture options for "which tube shows a positive result"', D.MISSIONS.filter(M => M.quiz.some(q => typeof q.options[0] === 'object')).length === 2);
const nm = D.MISSIONS.find(M => M.id === 'name_it');
ok('Name that nutrient: each food’s accepted test really finds its main nutrient',
   Object.entries(nm.foods).every(([f, ts]) => ts.every(t => D.resultFor(t, f, null, DONE).positive)));
const my = D.MISSIONS.find(M => M.id === 'mystery');
const myPos = D.SHELF_TESTS.filter(t => D.resultFor(t, 'mystery', null, DONE).positive).map(t => D.TESTS[t].nutrient);
ok(`The mystery powder: powder X really contains starch and reducing sugar only (${myPos.join(', ')})`, myPos.join() === 'starch,sugar');
ok('…so the quiz answer matches what the tests show', my.quiz[0].options[0] === 'Starch and reducing sugar');
ok('…and the mission needs all four nutrient tests', my.needs.join() === 'iodine,benedicts,biuret,fat');
ok('no quiz question is repeated', new Set(D.MISSIONS.flatMap(M => M.quiz.map(q => q.q))).size === D.MISSIONS.reduce((a, M) => a + M.quiz.length, 0));

console.log('\nHazards and result cards');
const kinds = new Set([...core.match(/const SIGN_LABELS = \{([\s\S]*?)\};/)[1].matchAll(/(\w+):/g)].map(m => m[1]));
ok('the shell has the mandatory "Wear eye protection" sign (goggles)', /goggles:\s*'Wear eye protection'/.test(core));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  const c = { tube: 2, lit: true, food: 'milk' };
  ok(`hazard ${id}: real signs, and what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => kinds.has(s)) && H.title(c) && H.happened(c) && H.why && H.instead && H.exam && H.fx);
}
ok('heating in the flame: HOT + goggles', D.HAZARDS.flame_heat.signs.join() === 'hot,goggles' && /point/i.test(D.HAZARDS.flame_heat.instead));
ok('Biuret without goggles: CORROSIVE + goggles (sodium hydroxide, g8s-hd-008)', D.HAZARDS.biuret_eyes.signs.join() === 'corrosive,goggles' && /sodium hydroxide/.test(D.HAZARDS.biuret_eyes.why));
ok('ethanol near a flame: FLAMMABLE', D.HAZARDS.ethanol_flame.signs.join() === 'flammable' && D.HAZARDS.ethanol_flame.happened({ lit: false }) !== D.HAZARDS.ethanol_flame.happened({ lit: true }));
ok('tasting in the lab: TOXIC (g8s-inquiry-001)', D.HAZARDS.tasting.signs.join() === 'toxic');
ok('no card borrows "eye" (Bright light) for a splash', !Object.values(D.HAZARDS).some(H => H.signs.includes('eye')));
for (const [id, R] of Object.entries(D.RESULTS)) {
  const c = { tube: 2, food: 'cornflour', Food: 'Cornflour', word: 'green', nutrient: 'reducing sugar', trace: 'glucose', n: 2, test: 'Iodine solution' };
  const v = x => (typeof x === 'function' ? x(c) : x);
  ok(`result card ${id}: icon, what happened, what to do instead and the exam point`, !!(R.icon && v(R.title) && v(R.happened) && v(R.instead) && R.exam));
}
const mistakes = Object.keys(D.HAZARDS).length + Object.keys(D.RESULTS).length;
ok(`at least 3 mistakes that teach (${mistakes}: ${Object.keys(D.HAZARDS).length} hazards, ${Object.keys(D.RESULTS).length} result cards)`, mistakes >= 3);
ok('the exam heading is left to the shell (no hard-coded "In your exams")', !/In your exams/.test(src + bench) && !/examLabel/.test(src + bench));
ok(`at least 10 true facts for the 💡 button (${D.FACTS.length})`, D.FACTS.length >= 10 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log('\nGrade 8');
ok('GRADES is [8]', D.GRADES.join() === '8');
const tagged = [...D.GUIDES, ...D.MISSIONS, ...D.DISCOVERIES];
ok('every guide, mission and discovery is tagged Grade 8', tagged.every(x => Array.isArray(x.grades) && x.grades.join() === '8'), tagged.filter(x => !x.grades).map(x => x.id));
ok('the shell registers the food lab for Grade 8', /L\('food',[^\n]*\[8\]/.test(core));
ok('the bench never records practice answers (no recordAnswer / _recordDaily)', !/recordAnswer|_recordDaily/.test(bench));
ok('the bench asks Labs.grade() for its grade', /Labs\.grade\(\)/.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
