'use strict';
// Science Labs: the science the Rusting Lab (PSAC Grade 6) is allowed to show.
//
// The bench draws whatever engine/labs/lab_rusting_data.js says, so a mistake
// in that file is a mistake taught to a child. This checks what can be checked
// mechanically: a nail rusts ONLY where it meets water AND air, for every
// possible tube; the PSAC 2024 Diagram 6 tubes give the paper's answer (pin B
// only); salt water rusts faster; nothing shows after one hour; every coating
// stops rust and a scratched one rusts only at the scratch; every discovery
// recipe is valid and leads to its own discovery; every card and quiz is
// complete; grades are tagged; and sentences stay short enough for a Grade 6
// reader.
//
// Run: node scripts/test-labs-rusting-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_rusting_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_rusting.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabRustingData = LabRustingData;', ctx);
const P = ctx.LabRustingData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const T = o => Object.assign(P.blankTube(), o);
const J = o => Object.assign(P.blankJar(), o);
const days = [0, 1, 2, 3, 4, 5, 6, 7];
const series = s => days.map(d => P.rustAt(s, d));

console.log('\nPSAC 2024 Q4, Diagram 6');
const A = T({ water: 'boiled', oil: true });
const B = T({ water: 'tap' });
const C = T({ cork: true, dryer: true });
ok('tube A (boiled water under oil): no air reaches the nail', P.conditions(A).air === 'no' && P.conditions(A).water === 'yes', P.conditions(A));
ok('tube B (water): water and air', P.conditions(B).air === 'yes' && P.conditions(B).water === 'yes');
ok('tube C (dry air, drying agent, cork): no water', P.conditions(C).water === 'no' && P.conditions(C).air === 'yes');
ok('A never rusts, on any day', series(A).every(f => f === 0), series(A));
ok('C never rusts, on any day', series(C).every(f => f === 0), series(C));
ok('B shows rust from day 1 and is covered by day 7', P.visible(B, 1) && P.rustAt(B, 7) === 1, series(B));
ok('"after a few days" (3): the pin that changes colour is B only', ['A', 'B', 'C'].filter((k, i) => P.visible([A, B, C][i], 3)).join() === 'B');
ok('the three tubes are the roles no_air / water_air / dry', [A, B, C].map(P.role).join() === 'no_air,water_air,dry');

console.log('\nOnly water + air rusts - every possible tube');
const combos = [];
for (const water of Object.keys(P.WATERS)) for (const oil of [false, true]) for (const dryer of [false, true]) for (const cork of [false, true]) {
  if (oil && water === 'none') continue;       // oil floats on water
  if (dryer && water !== 'none') continue;     // a drying agent goes in a tube with no water
  const s = T({ water, oil, dryer, cork });
  if (!P.isOn(s)) continue;
  combos.push(s);
}
const lie = combos.filter(s => { const c = P.conditions(s); return (P.rustAt(s, 7) > 0) !== (c.water !== 'no' && c.air !== 'no'); });
ok(`${combos.length} set-ups: rust by day 7 exactly when the nail gets water AND air`, lie.length === 0, lie);
ok('rust never shrinks as the days pass', combos.every(s => series(s).every((f, i, a) => i === 0 || f >= a[i - 1])));
ok('no rust at the start (day 0)', combos.every(s => P.rustAt(s, 0) === 0));
ok('after only one hour nothing can be seen, for any tube or jar',
   combos.concat(Object.keys(P.COATS).flatMap(c => ['tap', 'salt'].map(w => J({ coat: c, water: w })))).every(s => !P.visible(s, P.HOUR)));
ok('rust is a share of the nail: always between 0 and 1', combos.every(s => series(s).every(f => f >= 0 && f <= 1)));
const tapOil = T({ water: 'tap', oil: true }), boiledOpen = T({ water: 'boiled' }), corkOnly = T({ cork: true }), dryerOnly = T({ dryer: true });
ok('unboiled water under oil rusts a little, then stops (its air runs out)', P.visible(tapOil, 3) && P.rustAt(tapOil, 7) < 0.2 && P.rustAt(tapOil, 7) === P.rustAt(tapOil, 5), series(tapOil));
ok('boiled water with no oil rusts, but slower than tap water', P.visible(boiledOpen, 1) && days.slice(1).every(d => P.rustAt(boiledOpen, d) < P.rustAt(B, d) || P.rustAt(B, d) === 1), series(boiledOpen));
ok('"dry" air with only a cork or only a drying agent: a few spots by day 7', [corkOnly, dryerOnly].every(s => P.visible(s, 7) && P.rustAt(s, 7) < 0.2));

console.log('\nSalt water');
const Salt = T({ water: 'salt' });
ok('salt water rusts faster than tap water on days 1-6', [1, 2, 3, 4, 5, 6].every(d => P.rustAt(Salt, d) > P.rustAt(B, d)), { salt: series(Salt), tap: series(B) });
ok('…twice as fast on day 1', Math.abs(P.rustAt(Salt, 1) - 2 * P.rustAt(B, 1)) < 1e-9);
ok('salt water under oil (not boiled) only rusts a little, like tap water under oil', P.rustAt(T({ water: 'salt', oil: true }), 7) === P.rustAt(tapOil, 7));

console.log('\nStop the rust');
const protect = Object.keys(P.COATS).filter(c => P.COATS[c].protect);
ok('paint, grease, plastic and zinc are the protections', protect.join() === 'paint,grease,plastic,zinc', protect);
ok('every protected nail stays rust-free for 7 days, in tap AND salt water', protect.every(c => ['tap', 'salt'].every(w => series(J({ coat: c, water: w })).every(f => f === 0))));
ok('a bare nail in a jar rusts (half in water, half in air)', P.visible(J(), 1) && P.rustAt(J(), 7) === 1);
const scr = J({ coat: 'scratched' });
ok('a scratched painted nail rusts - but only at the scratch', P.outcome(scr).where === 'scratch' && P.visible(scr, 7) && P.rustAt(scr, 7) <= P.SCRATCH_CAP, P.outcome(scr));
ok('…in salt water the scratch rusts sooner', P.rustAt(J({ coat: 'scratched', water: 'salt' }), 0.3) > P.rustAt(scr, 0.3));
ok('a scratch where there is no water or no air does not rust', P.rustAt(T({ water: 'boiled', oil: true, coat: 'scratched' }), 7) === 0);

console.log('\nWords');
ok('shiny → spots → covered, in order', P.short(B, 0) === 'No rust' && P.short(B, 1) === 'A few rust spots' && P.short(B, 7) === 'Covered in rust');
ok('a scratched nail is described as rusting at the scratch', /scratch/.test(P.seen(scr, 7)) && P.short(scr, 7) === 'Rust at the scratch');
ok('rust is described as reddish or orange-brown', /orange-brown/.test(P.seen(B, 1)));

console.log('\nMistakes that teach');
const items = (...ss) => ss.map((s, i) => ({ id: 'ABCD'[i], s }));
const ids = arr => arr.map(m => m.id).join();
ok('the PSAC set-up earns no card at any day', days.every(d => P.mistakes('tubes', items(A, B, C), d, {}).length === 0));
ok('oil on UNBOILED water: "the water still had air in it"', ids(P.mistakes('tubes', items(tapOil), 3, {})) === 'not_boiled');
ok('boiled water with no oil: "you forgot the oil layer"', ids(P.mistakes('tubes', items(boiledOpen), 1, {})) === 'no_oil');
ok('a cork but no drying agent: "the air was not dry"', ids(P.mistakes('tubes', items(corkOnly), 7, {})) === 'damp_air');
ok('a drying agent but no cork: the same card, the other reason',
   (() => { const m = P.mistakes('tubes', items(dryerOnly), 7, {})[0]; return m && m.id === 'damp_air' && /no cork/.test(P.RESULTS.damp_air.happened(m.ctx)); })());
ok('…but not before the rust can be seen', P.mistakes('tubes', items(corkOnly), 1, {}).length === 0);
ok('looking after one hour: "too soon to tell"', ids(P.mistakes('tubes', items(B), P.HOUR, { hour: true })) === 'too_soon');
const jars = (...ss) => ss.map((s, i) => ({ id: String(i + 1), s }));
ok('coating AND water changed between jars: "two things changed"', ids(P.mistakes('coats', jars(J(), J({ coat: 'paint', water: 'salt' })), 1, {})) === 'two_vars');
ok('only the coating changed: a fair test, no card', P.mistakes('coats', jars(J(), J({ coat: 'paint' }), J({ coat: 'zinc' })), 7, {}).length === 0);
ok('only the water changed (same coating): fair, no card', P.mistakes('coats', jars(J(), J({ water: 'salt' })), 7, {}).length === 0);
ok('boiled water without an adult is the kettle hazard, and changes nothing', P.applySet('tubes', P.blankTube(), 'water', 'boiled', false).hazard === 'kettle'
   && P.applySet('tubes', P.blankTube(), 'water', 'boiled', true).s.water === 'boiled');
ok('oil needs water; a drying agent needs no water', !!P.applySet('tubes', P.blankTube(), 'oil', 'on', true).refuse && !!P.applySet('tubes', T({ water: 'tap' }), 'dryer', 'on', true).refuse);

console.log('\nMissions are reachable');
ok('"What does iron need?" is ready with the three PSAC tubes on day 3, not day 2', P.missionReady('needs', 'tubes', items(A, B, C), 3) && !P.missionReady('needs', 'tubes', items(A, B, C), 2));
ok('…and not with a tube missing', !P.missionReady('needs', 'tubes', items(A, B), 7));
const fair = jars(J(), J({ coat: 'paint' }), J({ coat: 'grease' }), J({ coat: 'plastic' }), J({ coat: 'zinc' }));
ok('"Stop the rust!" is ready with a bare nail and 4 coatings in the same water', P.missionReady('stop', 'coats', fair, 3));
ok('…but not with two waters', !P.missionReady('stop', 'coats', jars(J(), J({ coat: 'paint' }), J({ coat: 'grease' }), J({ coat: 'zinc', water: 'salt' })), 7));

console.log('\nGrades');
ok('GRADES is [6]', JSON.stringify(P.GRADES) === '[6]');
const untagged = [].concat(P.GUIDES, P.MISSIONS, P.DISCOVERIES).filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => P.GRADES.includes(g)));
ok('every guide, mission and discovery is tagged grades: [6]', untagged.length === 0, untagged.map(x => x.id));

console.log('\nDiscoveries');
const dids = P.DISCOVERIES.map(d => d.id);
ok('at least 10 discoveries, ids unique', dids.length >= 10 && new Set(dids).size === dids.length, dids.length);
const SETS = { rig: ['tubes', 'coats'], adult: ['on', 'off'], tube: P.TUBES, water: Object.keys(P.WATERS), oil: ['on', 'off'],
               dryer: ['on', 'off'], cork: ['on', 'off'], jar: P.JARS, coat: Object.keys(P.COATS), jwater: Object.keys(P.JAR_WATERS) };
const ACTS = ['wait', 'week', 'hour', 'tweezers', 'hand', 'reset'];
const tokenOk = on => { const [k, v] = on.split(':'); return v !== undefined ? !!SETS[k] && SETS[k].includes(v) : ACTS.includes(k); };
const bad = P.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe or guide picks up a nail by hand', P.DISCOVERIES.every(d => !d.how.includes('hand')) && P.GUIDES.every(G => G.steps.every(s => s.on !== 'hand')));

// A model of the bench, run through each recipe with the data file's own rules.
function runRecipe(how) {
  const st = { rig: 'tubes', adult: false,
    tubes: { rig: 'tubes', sel: 'A', items: P.newItems('tubes'), day: 0, hour: false, singles: 0 },
    coats: { rig: 'coats', sel: '1', items: P.newItems('coats'), day: 0, hour: false, singles: 0 } };
  const found = new Set(), cards = [];
  for (const t of how) {
    const [k, v] = t.split(':');
    if (k === 'rig') { st.rig = v; continue; }
    if (k === 'adult') { st.adult = v === 'on'; continue; }
    if (k === 'tube' || k === 'jar') { st.rig = k === 'tube' ? 'tubes' : 'coats'; st[st.rig].sel = v; continue; }
    if (SETS[k]) {
      const rig = (k === 'coat' || k === 'jwater') ? 'coats' : 'tubes';
      st.rig = rig;
      const r = st[rig];
      if (r.day > 0 || r.hour) { cards.push('locked ' + t); continue; }
      const res = P.applySet(rig, r.items[r.sel], k, v, st.adult);
      if (res.hazard) cards.push(res.hazard); else if (res.refuse) cards.push('refused ' + t); else r.items[r.sel] = res.s;
      continue;
    }
    const r = st[st.rig], act = P.activeItems(r.rig, r.items);
    if (k === 'wait' || k === 'week') {
      if (!act.length) { cards.push('nothing set up'); continue; }
      r.day = k === 'week' ? P.DAYS : r.day + 1; r.hour = false;
      if (k === 'wait') r.singles++;
      P.finds(r.rig, act, r.day, { singles: r.singles }).filter(x => x !== 'flaky').forEach(x => found.add(x));
      P.mistakes(r.rig, act, r.day, {}).forEach(m => cards.push(m.id));
    } else if (k === 'tweezers') {
      P.finds(r.rig, act, r.day, { tweezers: true }).filter(x => x === 'flaky').forEach(x => found.add(x));
    } else if (k === 'hour') cards.push('too_soon');
  }
  return { found, cards };
}
const unsolved = P.DISCOVERIES.map(d => ({ d, r: runRecipe(d.how) })).filter(x => !x.r.found.has(x.d.id) || x.r.cards.length)
  .map(x => x.d.id + ' -> found ' + [...x.r.found].join('/') + (x.r.cards.length ? ' cards ' + x.r.cards.join('/') : ''));
ok('every recipe leads to its own discovery with no mistake card on the way', unsolved.length === 0, unsolved);
const reachable = new Set();
P.DISCOVERIES.forEach(d => runRecipe(d.how).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => dids.includes(x)), [...reachable].filter(x => !dids.includes(x)));
ok('the bench unlocks "flaky" itself (the tweezers)', bench.includes("_discover('flaky')"));

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', P.GUIDES.length >= 3 && new Set(P.GUIDES.map(g => g.id)).size === P.GUIDES.length);
for (const G of P.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  const r = runRecipe(G.steps.map(s => s.on));
  ok(`${G.title}: ends with what they found out, and runs with no mistake card`, !!(G.lesson && G.blurb && G.icon) && r.cards.length === 0, r.cards);
}
ok('the PSAC three-tube guide ends with only nail B rusty', (() => { const G = P.GUIDES.find(g => g.id === 'three_tubes'); return runRecipe(G.steps.map(s => s.on)).found.has('needs_both'); })());
ok('the welcome card’s “Show me how” guide exists', P.GUIDES.some(g => g.id === 'three_tubes') && bench.includes('data-guide="three_tubes"'));

console.log('\nMissions, hazards and result cards');
ok('at least 2 missions', P.MISSIONS.length >= 2);
for (const M of P.MISSIONS) {
  const badQ = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(`${M.title}: has a goal, a blurb and a bench`, !!(M.intro && M.blurb && M.icon && (M.rig === 'tubes' || M.rig === 'coats')));
}
ok('the Diagram 6 question gives the paper’s answer first: Nail B only (PSAC 2024 Q4)',
   P.MISSIONS[0].quiz.some(q => /which nail changes colour/i.test(q.q) && q.options[0] === 'Nail B only' && /PSAC 2024 Q4/.test(q.why)));
ok('only PSAC papers that exist in the question bank are quoted (2021, 2024, 2025)',
   (src.match(/PSAC (\d{4})/g) || []).length > 0 && (src.match(/PSAC (\d{4})/g) || []).every(m => /202[145]/.test(m)),
   (src.match(/PSAC (\d{4})/g) || []).filter(m => !/202[145]/.test(m)));
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard'];
for (const [id, H] of Object.entries(P.HAZARDS)) {
  ok(`hazard ${id}: real signs, what happened, why, what to do instead and the exam point`,
     H.signs.length && H.signs.every(s => SIGNS.includes(s)) && H.title() && H.happened() && H.why && H.instead && H.exam);
}
ok('boiling water is a HOT hazard and says to ask an adult', P.HAZARDS.kettle.signs.includes('hot') && /ask an adult/i.test(P.HAZARDS.kettle.instead));
ok('a sharp rusty nail: tell an adult, wash the cut', /tell an adult/i.test(P.HAZARDS.sharp.instead) && /wash/i.test(P.HAZARDS.sharp.instead));
const rctx = { tube: 'A', cork: true, dryer: false, a: 'Jar 1: bare nail, tap water.', b: 'Jar 2: painted nail, salt water.' };
for (const [id, R] of Object.entries(P.RESULTS)) {
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && R.title && R.happened(rctx) && R.instead && R.exam));
}
ok('the five mistakes the brief asks for are all there', ['too_soon', 'not_boiled', 'no_oil', 'damp_air', 'two_vars'].every(id => P.RESULTS[id]));
const used = id => bench.includes(`'${id}'`) || new RegExp(`id === '${id}'`).test(bench) || src.includes(`id: '${id}'`) || src.includes(`hazard: '${id}'`);
ok('every hazard and result card can be raised', Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).every(used),
   Object.keys(P.HAZARDS).concat(Object.keys(P.RESULTS)).filter(id => !used(id)));
ok('at least 3 mistakes that teach', Object.keys(P.HAZARDS).length + Object.keys(P.RESULTS).length >= 3);
ok('the 💡 facts are there', P.FACTS.length >= 10 && P.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log('\nReading level (Grade 6)');
const texts = [];
P.GUIDES.forEach(G => { texts.push(G.blurb, G.lesson); G.steps.forEach(s => texts.push(s.say)); });
P.DISCOVERIES.forEach(d => texts.push(d.hint, d.saw, d.learn, d.psac || ''));
P.MISSIONS.forEach(M => { texts.push(M.blurb, M.intro); M.quiz.forEach(q => texts.push(q.q, q.why)); });
Object.values(P.HAZARDS).forEach(H => texts.push(H.title(), H.happened(), H.why, H.instead, H.exam));
Object.values(P.RESULTS).forEach(R => texts.push(R.title, R.happened(rctx), R.instead, R.exam));
texts.push(...P.FACTS, ...Object.values(P.SAY));
const long = [];
texts.filter(Boolean).forEach(t => t.split(/(?<=[.!?])\s+/).forEach(sn => { const n = (sn.match(/\S+/g) || []).length; if (n > 16) long.push(n + ': ' + sn); }));
ok('no sentence is longer than 16 words', long.length === 0, long);

console.log('\nEngineering');
ok('no regex lookbehind in the lab files (a Safari < 16.4 parse error)', ![src, bench].some(t => /\(\?<[=!]/.test(t)));
ok('both files export their global to window', /window\.LabRustingData = LabRustingData/.test(src) && /window\.LabRusting = LabRusting/.test(bench));
ok('the bench never records answers into mastery', !/recordAnswer|_recordDaily/.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
