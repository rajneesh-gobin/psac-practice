'use strict';
// Science Labs: the science Air & Burning (PSAC Grades 4 and 6) is allowed to show.
//
// The bench animates whatever engine/labs/lab_air_data.js says - and the
// rules of the bench itself live there too (LabAirData.apply). So this test
// runs the real experiment: every guided experiment and every discovery recipe
// is played through apply() at its own grade, exactly as the guide button
// would, and must finish with no hazard or "what went wrong" card and unlock
// what it promises. It also checks the numbers (burn time grows with the air,
// halves with a big flame; oxygen 21% → 16%; dry air adds to 100%), the fire
// triangle table, every hazard and result card, the two grade levels, every
// quiz, the PSAC references, the reading level and the stylesheet.
//
// Run: node scripts/test-labs-air-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_air_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_air.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_air.css'), 'utf8');
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const Q6 = f => fs.readFileSync(path.join(ROOT, 'subjects', 'grade6-science', 'questions', f), 'utf8');
const Q4 = f => fs.readFileSync(path.join(ROOT, 'subjects', 'grade4-science', 'questions', f), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabAirData = LabAirData;', ctx);
const L = ctx.LabAirData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const ids = list => list.map(x => x.id);
const G4 = list => L.forGrade(list, 4), G6 = list => L.forGrade(list, 6);

// Plays tokens through the bench's own rules. Steps already true are skipped
// (as the guide does). Returns every event, card and failed step.
function play(steps, g, st) {
  st = st || L.newState(g);
  const events = [], cards = [], failed = [], says = [];
  for (const tok of steps) {
    if (L.satisfied(st, tok)) continue;
    const r = L.apply(st, tok, g);
    if (!r.ok) { failed.push(tok + (r.say ? ' (' + r.say + ')' : '')); continue; }
    if (r.say) says.push(r.say);
    if (r.anim && r.anim.type === 'burn') L.settle(st);
    events.push(...r.events);
    if (r.hazard) cards.push('hazard:' + r.hazard);
    if (r.result) cards.push('result:' + r.result);
  }
  return { st, events, cards, failed, says };
}

console.log('\nGrades');
ok('the lab declares GRADES = [4, 6]', JSON.stringify(Array.from(L.GRADES)) === '[4,6]');
for (const [name, list] of [['stations', L.STATIONS], ['guided experiments', L.GUIDES], ['missions', L.MISSIONS], ['discoveries', L.DISCOVERIES], ['facts', L.FACTS]]) {
  const bad = list.filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => L.GRADES.includes(g)));
  ok(`every one of the ${list.length} ${name} carries grades from [4, 6]`, bad.length === 0, bad.map(x => x.id || x.t));
}
for (const g of [4, 6]) {
  const f = list => L.forGrade(list, g);
  ok(`Grade ${g}: at least 3 guided experiments, 2 missions, 10 discoveries, 10 facts`,
     f(L.GUIDES).length >= 3 && f(L.MISSIONS).length >= 2 && f(L.DISCOVERIES).length >= 10 && f(L.FACTS).length >= 10,
     { guides: f(L.GUIDES).length, missions: f(L.MISSIONS).length, disc: f(L.DISCOVERIES).length, facts: f(L.FACTS).length });
  const mistakes = Object.values(L.HAZARDS).filter(h => h.grades.includes(g)).length + Object.values(L.RESULTS).filter(r => r.grades.includes(g)).length;
  ok(`Grade ${g}: at least 3 mistakes that teach (hazard or result cards) - ${mistakes}`, mistakes >= 3);
  ok(`Grade ${g}: at least 3 stations`, f(L.STATIONS).length >= 3);
}
ok('Grade 4 and Grade 6 are different levels: no guide, mission or discovery is shared',
   [L.GUIDES, L.MISSIONS, L.DISCOVERIES].every(list => list.every(x => x.grades.length === 1)));
const qs4 = new Set(G4(L.MISSIONS).flatMap(m => m.quiz.map(q => q.q))), qs6 = G6(L.MISSIONS).flatMap(m => m.quiz.map(q => q.q));
ok('no quiz question is shared between the grades', qs6.every(q => !qs4.has(q)));
const g4text = JSON.stringify([G4(L.GUIDES), G4(L.MISSIONS), G4(L.DISCOVERIES), G4(L.FACTS)]);
ok('Grade 4 content stays at Grade 4: no limewater, fire triangle, extinguishers or oxygen percentages',
   !/limewater|fire triangle|extinguisher|\d+(\.\d+)?%/i.test(g4text), (g4text.match(/limewater|fire triangle|extinguisher|\d+(\.\d+)?%/i) || [])[0]);
const g6text = JSON.stringify([G6(L.GUIDES), G6(L.MISSIONS), G6(L.DISCOVERIES)]);
ok('Grade 6 teaches its own syllabus: the fire triangle, carbon dioxide, limewater, oxygen at 21%',
   /fire triangle/i.test(g6text) && /carbon dioxide/i.test(g6text) && /limewater/i.test(g6text) && /21%/.test(g6text));
ok('the fire yard and "what burning makes" are Grade 6 only; the glass and the balloons are Grade 4 only',
   String(L.station('fire').grades) === '6' && String(L.station('products').grades) === '6' && String(L.station('space').grades) === '4' && String(L.station('weight').grades) === '4'
   && !L.apply(L.newState(4), 'station:fire', 4).ok && !L.apply(L.newState(6), 'station:space', 6).ok);

console.log('\nCandles and jars (g4s-air-005, g4sci-hd-021, PSAC 2021)');
const bt = L.burnTime;
ok('small candle: small jar 6 s, medium 12 s, large 24 s', bt('small', 'small') === 6 && bt('medium', 'small') === 12 && bt('large', 'small') === 24);
ok('twice the air, twice the time - for both candles',
   ['small', 'big'].every(c => bt('medium', c) === 2 * bt('small', c) && bt('large', c) === 2 * bt('medium', c)));
ok('a bigger flame goes out sooner under the same jar (the big candle takes half the time)',
   ['small', 'medium', 'large'].every(j => bt(j, 'big') < bt(j, 'small') && bt(j, 'big') * 2 === bt(j, 'small')));
ok('with no jar there is no burn time: it keeps burning', bt('none', 'small') === null && bt('none', 'big') === null);
ok('the open candle is timed for longer than any covered one lasts', L.UNCOVERED_CAP > Math.max(...['small', 'medium', 'large'].flatMap(j => ['small', 'big'].map(c => bt(j, c)))));
ok('the jar volumes double: 250, 500, 1000 mL', L.JARS.small.ml === 250 && L.JARS.medium.ml === 500 && L.JARS.large.ml === 1000);
ok('the PSAC letters: P, Q, R under the small, medium and large jars; S with no jar',
   L.JARS.small.letter === 'P' && L.JARS.medium.letter === 'Q' && L.JARS.large.letter === 'R' && L.JARS.none.letter === 'S'
   && /Four identical candles P, Q, R, and S/.test(Q6('past_paper_2021.js')) && /answer:'Candle S'/.test(Q6('past_paper_2021.js')));
ok('a late stopwatch still reads at least 1 s on the quickest burn', Math.min(...['small', 'medium', 'large'].flatMap(j => ['small', 'big'].map(c => bt(j, c)))) - L.LATE_S >= 1);
ok('oxygen falls from 21% in fresh air to about 16% when the flame dies - never to 0',
   L.o2At(0) === 21 && L.o2At(1) === 16 && L.o2At(0.5) === 18.5 && L.O2_OUT > 0 && L.O2_OUT < L.O2_AIR);
let mono = true; for (let i = 0; i < 10; i++) if (L.o2At((i + 1) / 10) > L.o2At(i / 10)) mono = false;
ok('the oxygen reading only ever goes down during a burn', mono);
const sum = L.AIR.reduce((a, x) => a + x.pct, 0);
ok('dry air adds up to 100%: nitrogen 78.1, oxygen 21, carbon dioxide 0.03, others 0.87 (MIE Table 2)',
   Math.abs(sum - 100) < 1e-9 && L.AIR[0].pct === 78.1 && L.AIR[1].pct === 21 && L.AIR[2].pct === 0.03);
ok('…the same figures as the app' + "'" + 's own Grade 6 question g6sci-air-012', /Nitrogen 78\.1%<\/b>, Oxygen 21\.0%, Carbon dioxide 0\.03%/.test(Q6('ch01_g6_air.js')));
ok('the Grade 4 bank says a small jar puts the candle out sooner than a large one (g4sci-hd-021)', /small jar and goes out after 10 seconds/.test(Q4('depth_hard.js')) && /large jar burns for 40 seconds/.test(Q4('depth_hard.js')));

console.log('\nThe fire triangle (g6sci-air-001/002/003/009)');
const sides = { heat: 0, oxygen: 0, fuel: 0 };
const tbl = [];
for (const f of Object.keys(L.FIRES)) for (const m of Object.keys(L.METHODS)) for (const off of [false, true]) {
  const r = L.fireResult(f, m, off);
  tbl.push({ f, m, off, r });
  if (r && r.out) sides[r.side]++;
}
ok('every fire × method (power on or off) has an outcome and a sentence', tbl.every(x => x.r && x.r.say && x.r.say.length > 10), tbl.filter(x => !x.r).map(x => x.f + '/' + x.m));
ok('a wood fire goes out every way: water (heat), blanket and CO₂ (oxygen), raking it away (fuel)',
   L.fireResult('wood', 'water').side === 'heat' && L.fireResult('wood', 'blanket').side === 'oxygen' && L.fireResult('wood', 'co2').side === 'oxygen'
   && L.fireResult('wood', 'fueloff').side === 'fuel' && ['water', 'blanket', 'co2', 'fueloff'].every(m => L.fireResult('wood', m).out));
ok('all three sides of the triangle can be removed', sides.heat > 0 && sides.oxygen > 0 && sides.fuel > 0, sides);
ok('water on burning oil is a hazard; so is water on an electrical fire, power on or off',
   L.fireResult('oil', 'water').hazard === 'oil_water' && L.fireResult('elec', 'water', false).hazard === 'elec_water' && L.fireResult('elec', 'water', true).hazard === 'elec_water');
ok('carbon dioxide is never a hazard and always puts a fire out (g6sci-air-003)', Object.keys(L.FIRES).every(f => [false, true].every(off => !L.fireResult(f, 'co2', off).hazard && L.fireResult(f, 'co2', off).out)));
ok('the safe way for the pan of oil is the fire blanket; turning off the stove alone leaves it burning',
   L.fireResult('oil', 'blanket').best && L.fireResult('oil', 'blanket').out && !L.fireResult('oil', 'fueloff').out && !L.fireResult('oil', 'co2').best);
ok('an electrical fire: power off first, then CO₂ or a blanket; a blanket on a live wire does not stay out',
   L.fireResult('elec', 'co2', true).best && !L.fireResult('elec', 'co2', false).best && L.fireResult('elec', 'blanket', true).out && !L.fireResult('elec', 'blanket', false).out && L.fireResult('elec', 'fueloff').off);
ok('the question bank agrees: water removes heat, foam smothers (oxygen), CO₂ for electrical fires',
   /Which part of the fire triangle does water target\?[\s\S]{0,120}answer:'Heat'/.test(Q6('ch01_g6_air.js'))
   && /smother it\. Which side of the Fire Triangle[\s\S]{0,120}answer:'Oxygen'/.test(Q6('ch01_g6_air.js'))
   && /electrical fire\?[\s\S]{0,160}answer:'Carbon dioxide extinguisher'/.test(Q6('ch01_g6_air.js')));

console.log('\nThe bench rules (apply)');
let p = play(['station:jars', 'light'], 4);
ok('lighting with loose hair: the hair hazard, and no flame', p.cards.join() === 'hazard:hair' && !p.st.lit);
p = play(['safety:on', 'light', 'watch:ready', 'burn'], 4);
ok('a covered burn: one run event, timed from the start, jar left hot on the candle', p.events.length === 1 && p.events[0].good && p.events[0].measured === 6 && p.st.jarOn && p.st.hot && !p.st.lit && !p.cards.length, p);
const hot = L.apply(p.st, 'lift', 4);
ok('grabbing the hot jar: the hot-jar hazard', hot.hazard === 'hot_jar');
const tap = L.apply(p.st, 'tap', 4);
ok('cooling it under the cold tap: the crack hazard, and a new jar', tap.hazard === 'crack' && !p.st.jarOn);
p = play(['safety:on', 'light', 'burn'], 4);
ok('forgetting the stopwatch: the "started late" card, and the time is short by LATE_S', p.cards.join() === 'result:late' && p.events[0].measured === 6 - L.LATE_S && !p.events[0].good);
p = play(['safety:on', 'light', 'watch:ready', 'burn', 'jar:large', 'candle:big', 'light', 'watch:ready', 'burn'], 4);
ok('changing the jar AND the candle: the "not a fair test" card', p.cards.join() === 'result:unfair' && p.events[1].fair === false);
p = play(['safety:on', 'light', 'watch:ready', 'burn', 'jar:large', 'light', 'watch:ready', 'burn'], 4);
ok('changing only the jar: fair, and no card', !p.cards.length && p.events[1].fair && p.events[1].prev.jar === 'small');
L.newSeries(p.st);
{
  const q = play(['candle:big', 'light', 'watch:ready', 'burn'], 4, p.st);
  ok('a new set of tests (a mission, a cleared notebook) is never "unfair" against an older test', !q.cards.length && q.events[0].fair && q.events[0].prev === null, q);
}
{
  const st = L.newState(4);
  ['safety:on', 'light', 'watch:ready'].forEach(t => L.apply(st, t, 4));
  L.apply(st, 'burn', 4);
  const r = L.apply(st, 'peek', 4);
  ok('lifting the jar mid-burn: the "you lifted the jar" card, the flame back, the run not counted', r.result === 'peek' && st.lit && !st.jarOn && st.prev === null);
}
p = play(['station:products', 'safety:on', 'jartemp:warm', 'light', 'hold'], 6);
ok('a warm jar over the flame: the "jar was warm" card, and no water seen', p.cards.join() === 'result:warm_jar' && p.events[0].warm === true);
p = play(['station:fire', 'fire:oil', 'method:water'], 6);
ok('water on the pan of oil: the oil hazard', p.cards.join() === 'hazard:oil_water');
p = play(['station:fire', 'fire:elec', 'method:water'], 6);
ok('water on the electrical fire: the electric hazard', p.cards.join() === 'hazard:elec_water');
ok('a burn cannot start with the jar still on, or with no flame', !L.apply(L.newState(4), 'burn', 4).ok);

console.log('\nDiscoveries');
ok('discovery ids are unique', new Set(ids(L.DISCOVERIES)).size === L.DISCOVERIES.length);
const badDisc = L.DISCOVERIES.filter(d => !d.title || !d.icon || !d.hint || !d.saw || !d.rule || !d.learn || !d.unlock || !Array.isArray(d.how) || !d.how.length
  || !L.recipeTexts(d.how, d.grades[0]).every(t => t.say && t.btn));
ok('every discovery has a clue, what you saw, the rule, why it happens and a worded “how to find it” recipe', badDisc.length === 0, ids(badDisc));
const unsolved = [];
for (const d of L.DISCOVERIES) {
  const g = d.grades[0], r = play(d.how, g);
  if (r.failed.length || r.cards.length || !r.events.some(e => L.unlocks(d.unlock, e))) unsolved.push({ id: d.id, failed: r.failed, cards: r.cards });
}
ok('every discovery recipe, played through the bench at its own grade, unlocks its own card with no hazard or result card', unsolved.length === 0, unsolved);
ok('the compare rules need a fair, well-timed pair: a late run or an unfair pair unlocks nothing that compares',
   !L.unlocks({ kind: 'run', compare: 'jar' }, { kind: 'run', covered: true, jar: 'large', candle: 'small', good: false, fair: true, prev: { jar: 'small', candle: 'small' } })
   && !L.unlocks({ kind: 'run', compare: 'jar' }, { kind: 'run', covered: true, jar: 'large', candle: 'big', good: true, fair: false, prev: { jar: 'small', candle: 'small' } }));
ok('no recipe lights a flame before tying hair back, or uses water on oil or electrics',
   L.DISCOVERIES.concat(L.GUIDES.map(g => ({ how: g.steps }))).every(d => { const i = d.how.indexOf('light'); return i < 0 || d.how.slice(0, i).includes('safety:on'); })
   && !/fire:(oil|elec)[^\]]*method:water/.test(JSON.stringify(L.DISCOVERIES.map(d => d.how.join(' ')))));

console.log('\nGuided experiments');
ok('guide ids are unique', new Set(ids(L.GUIDES)).size === L.GUIDES.length);
const says = [];
for (const G of L.GUIDES) {
  const g = G.grades[0];
  const r = play(G.steps, g);
  says.push(...r.says);
  const worded = G.steps.every(t => { const x = L.stepText(t, g, { jar: 'small', fire: 'wood' }); return x.say && x.btn; });
  ok(`Grade ${g} · ${G.title}: every step is worded, runs with no failed step, hazard or card, and has a lesson`,
     worded && !r.failed.length && !r.cards.length && !!(G.lesson && G.blurb && G.icon), { failed: r.failed, cards: r.cards });
}
const pq = play(L.GUIDES.find(g => g.id === 'pqrs').steps, 6);
ok('Candles P, Q, R and S: P goes out first, R last, and S is still burning at the end',
   pq.events.map(e => e.jar).join() === 'small,medium,large,none' && pq.events[0].measured < pq.events[1].measured && pq.events[1].measured < pq.events[2].measured
   && !pq.events[3].covered && pq.events[3].measured > pq.events[2].measured);
const g4 = play(L.GUIDES.find(g => g.id === 'jars').steps, 4);
ok('Grade 4 "Candle under a jar": the small jar 6 s, the large 24 s', g4.events.map(e => e.measured).join() === '6,24');

console.log('\nMissions');
ok('mission ids are unique', new Set(ids(L.MISSIONS)).size === L.MISSIONS.length);
const RECIPE = {
  jar_race: ['station:jars', 'safety:on', 'jar:small', 'light', 'watch:ready', 'burn', 'jar:medium', 'light', 'watch:ready', 'burn', 'jar:large', 'light', 'watch:ready', 'burn'],
  air_there: ['station:space', 'push', 'tilt', 'bottle', 'station:weight', 'fill', 'letout'],
  pqrs: ['station:jars', 'safety:on', 'jar:small', 'light', 'watch:ready', 'burn', 'jar:medium', 'light', 'watch:ready', 'burn', 'jar:large', 'light', 'watch:ready', 'burn', 'jar:none', 'light', 'watch:ready', 'burn'],
  fire_officer: ['station:fire', 'fire:wood', 'method:water', 'fire:oil', 'method:blanket', 'fire:elec', 'method:fueloff', 'method:co2'],
  burn_makes: ['station:products', 'safety:on', 'light', 'hold', 'lime', 'control'],
};
const keysOf = r => new Set(r.events.map(L.keyOf).filter(Boolean));
for (const M of L.MISSIONS) {
  const g = M.grades[0];
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`Grade ${g} · ${M.title}: 5 questions, each with 4 distinct options and a reason`, M.quiz.length === 5 && bad.length === 0, bad.map(q => q.q));
  const r = play(RECIPE[M.id], g);
  ok(`Grade ${g} · ${M.title}: its requirements can be met on the bench with no card on the way, and it has an intro and a blurb`,
     !!RECIPE[M.id] && !r.failed.length && !r.cards.length && L.missionProgress(M, keysOf(r)).done && !!(M.intro && M.blurb && M.icon && L.station(M.station)), { failed: r.failed, cards: r.cards });
}
{
  const mixed = play(['station:jars', 'safety:on', 'jar:small', 'light', 'watch:ready', 'burn', 'jar:medium', 'candle:big', 'light', 'watch:ready', 'burn', 'jar:large', 'light', 'watch:ready', 'burn'], 4);
  ok('Jar race with two different candles is not done: the comparison must use one candle', !L.missionProgress(L.MISSIONS.find(m => m.id === 'jar_race'), keysOf(mixed)).done);
  const hurried = play(['station:fire', 'fire:wood', 'method:water', 'fire:oil', 'method:co2', 'fire:elec', 'method:co2'], 6);
  ok('Fire safety officer is not done by CO₂ on oil or on a live electrical fire - only the safe way counts', !L.missionProgress(L.MISSIONS.find(m => m.id === 'fire_officer'), keysOf(hurried)).done);
  const late = play(['station:jars', 'safety:on', 'jar:small', 'light', 'burn'], 4);
  ok('a run timed late earns no mission tick', keysOf(late).size === 0);
}
const quiz = (id, re) => L.MISSIONS.find(m => m.id === id).quiz.find(q => re.test(q.q));
ok('Jar race: "which goes out first" is the small jar - and it does', /small jar/.test(quiz('jar_race', /goes out first/).options[0]) && bt('small', 'small') < bt('large', 'small'));
ok('Candles P, Q, R and S: the answer is candle S, and the oxygen answer is the AIR figure',
   /Candle S/.test(quiz('pqrs', /burns longest/).options[0]) && quiz('pqrs', /how much of dry air is oxygen/).options[0] === L.AIR[1].pct + '%');
ok('Fire safety officer: the blanket removes oxygen, as the fire table says', quiz('fire_officer', /fire blanket/).options[0] === 'Oxygen' && L.fireResult('wood', 'blanket').side === 'oxygen');
ok('Air is really there: the full balloon goes down', /full balloon/.test(quiz('air_there', /Which side goes down/).options[0]));

console.log('\nHazards and "what went wrong" cards');
const signKinds = (core.match(/SIGN_LABELS = \{([^}]*)\}/) || [, ''])[1];
for (const [id, H] of Object.entries(L.HAZARDS)) {
  ok(`hazard ${id} has real signs and all four texts: what happened, why, what to do instead, the exam point - plus what the helper says after`,
     H.signs.length && H.signs.every(s => new RegExp('\\b' + s + ':').test(signKinds)) && H.title({}) && H.happened({}) && H.why && H.instead && H.exam && H.after && H.grades.length);
  ok(`hazard ${id}: an adult is part of the safe way`, /adult/i.test(H.instead));
}
ok('a candle flame is a "hot" sign, never the chemical "flammable" (the hair card)', L.HAZARDS.hair.signs.includes('hot') && !L.HAZARDS.hair.signs.includes('flammable'));
ok('"flammable" appears only where a flammable material burns: the pan of oil', Object.entries(L.HAZARDS).filter(([, h]) => h.signs.includes('flammable')).map(([k]) => k).join() === 'oil_water');
ok('the cracked jar carries the "sharp" sign; the hot jar the "hot" sign; no card borrows the chemical "irritant"',
   L.HAZARDS.crack.signs.includes('sharp') && L.HAZARDS.hot_jar.signs.includes('hot') && !Object.values(L.HAZARDS).some(h => h.signs.includes('irritant')));
ok('the electrical fire carries the "electric" sign and says water conducts', L.HAZARDS.elec_water.signs.includes('electric') && /conducts/.test(L.HAZARDS.elec_water.why));
ok('the oil and electrical hazards are Grade 6 only', String(L.HAZARDS.oil_water.grades) === '6' && String(L.HAZARDS.elec_water.grades) === '6');
const c = { jar: 'small jar', candle: 'big candle', time: 3, measured: 1, late: 2 };
for (const [id, R] of Object.entries(L.RESULTS)) {
  ok(`result card ${id} says what happened, what to do instead and the exam point`, R.icon && R.title(c) && R.happened(c).length > 20 && R.instead && R.exam && R.grades.length);
}
ok('the unfair-test card names both things that changed, and says change only one', /jar AND the candle/.test(L.RESULTS.unfair.happened(c)) && /only one thing/.test(L.RESULTS.unfair.instead));
ok('the late card shows the wrong and the right time', /showed 1 s, not 3 s/.test(L.RESULTS.late.happened(c)));
ok('no exam text hard-codes the “In the PSAC exam” heading (the shell adds it)', !/In the PSAC exam/.test(src));
ok('nothing to copy at home: no matches, lighters or petrol, and "ask an adult" is on the safety rules', !/\b(matches|lighter|petrol|kerosene)\b/i.test(JSON.stringify([L.GUIDES, L.DISCOVERIES, L.FACTS]))
   && /Only an adult/.test(L.HAZARDS.hair.instead));

console.log('\nPSAC references (only ones found in grade6-science past_paper_*.js)');
const refs = [...new Set((src.match(/PSAC \d{4}(?: Q\w+)?/g) || []))];
const refOk = r => {
  const [, y, q] = r.match(/PSAC (\d{4})(?: (Q\w+))?/);
  const f = path.join(ROOT, 'subjects', 'grade6-science', 'questions', `past_paper_${y}.js`);
  if (!fs.existsSync(f)) return false;
  const t = fs.readFileSync(f, 'utf8');
  return /PSAC Grade 6 Science/.test(t) && (!q || new RegExp('// ── ' + q + ':').test(t));
};
ok('every PSAC paper the lab quotes has its past-paper file (and question) in the app: ' + refs.join(', '), refs.length > 0 && refs.every(refOk), refs.filter(r => !refOk(r)));
ok('PSAC 2021: the candles P, Q, R, S question is in that paper', /Four identical candles/.test(Q6('past_paper_2021.js')));
ok('PSAC 2024 Q1: "Which gas is necessary for burning?" - oxygen', /necessary for <b>burning<\/b>[\s\S]{0,120}answer:'Oxygen'/.test(Q6('past_paper_2024.js')));
ok('PSAC 2019, 2021 and 2022: carbon dioxide puts out fires',
   ['2019', '2021', '2022'].every(y => /fire[\s\S]{0,140}answer:'Carbon dioxide'/.test(Q6(`past_paper_${y}.js`))));

console.log('\nReading level (a 9-11-year-old: short sentences)');
const texts = [...says];
L.GUIDES.forEach(g => { texts.push(g.blurb, g.lesson); g.steps.forEach(t => texts.push(L.stepText(t, g.grades[0], { jar: 'small', fire: 'wood' }).say)); });
L.DISCOVERIES.forEach(d => { texts.push(d.hint, d.saw, d.learn); L.recipeTexts(d.how, d.grades[0]).forEach(t => texts.push(t.say)); });
L.MISSIONS.forEach(m => { texts.push(m.blurb, m.intro); m.quiz.forEach(q => texts.push(q.q, q.why, ...q.options)); });
L.STATIONS.forEach(s => texts.push(s.ask, s.how));
Object.values(L.HAZARDS).forEach(h => texts.push(h.why, h.instead, h.happened({}), h.after, h.exam));
Object.values(L.RESULTS).forEach(r => texts.push(r.instead, r.happened(c), r.exam));
for (const f of Object.keys(L.FIRES)) for (const m of Object.keys(L.METHODS)) for (const off of [false, true]) texts.push(L.fireResult(f, m, off).say);
L.FACTS.forEach(f => texts.push(f.t));
const long = [];
texts.forEach(t => String(t).split(/(?<=[.!?])\s+/).forEach(sn => { const n = sn.split(/\s+/).filter(w => /\w/.test(w)).length; if (n > 18) long.push(n + ': ' + sn); }));
ok(`no sentence over 18 words in ${texts.length} texts a child reads (the spec says about 15)`, long.length === 0, long.slice(0, 6));

console.log('\nThe bench and its stylesheet');
const shared = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'labs.css'), 'utf8');
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
const foreign = [...new Set(cssNoComments.match(/\.[a-z][\w-]*/g) || [])]
  .filter(k => !k.startsWith('.lab-air') && !k.startsWith('.is-') && !shared.includes(k + ' ') && !shared.includes(k + '{') && !shared.includes(k + ',') && !shared.includes(k + '.') && !shared.includes(k + '['));
ok('every class the stylesheet defines starts .lab-air (the rest are shared labs.css classes it adjusts)', foreign.length === 0, foreign);
ok('no regex lookbehind in the lab (a parse error on Safari < 16.4)', !/\(\?<[=!]/.test(src + bench));
ok('the bench runs the data file' + "'" + 's rules (LabAirData.apply) and never invents an outcome', /D\(\)\.apply\(/.test(bench) && !/burnTime\(|fireResult\(/.test(bench));
ok('the bench draws every station', L.STATIONS.every(s => new RegExp(`case '${s.id}':`).test(bench)));
ok('the bench never records a result through recordAnswer or _recordDaily', !/recordAnswer|_recordDaily/.test(bench));
ok('speech is cancelled on step change, overlays, unmount and screen change',
   /function _guideEnter\(\)[\s\S]{0,120}_hush\(\)/.test(bench) && /function _ov\(fn\) \{ _hush\(\)/.test(bench) && /function unmount\(\) \{\s*_hush\(\)/.test(bench)
   && /classList\.contains\('hidden'\)\) \{ _hush\(\); _stop\(\); \}/.test(bench) && /currentScreen !== 'labs'\)[^\n]*\{ _hush\(\); return; \}/.test(bench));
ok('speech is never started without a tap (speak() is only called from the 🔊 buttons)', (bench.match(/[^.\w]speak\(/g) || []).length === 3);
ok('the loop restarts when the Labs screen comes back (a MutationObserver on the screen)', /new MutationObserver\([\s\S]{0,160}_start\(\)/.test(bench));
ok('the bench shows only its grade: stations, guides, missions and discoveries all pass through _forGrade',
   /_forGrade\(D\(\)\.STATIONS\)/.test(bench) && /_forGrade\(D\(\)\.GUIDES\)/.test(bench) && /_forGrade\(D\(\)\.MISSIONS\)/.test(bench) && /_forGrade\(D\(\)\.DISCOVERIES\)/.test(bench));
ok('the eyebrow shows the grade in use', /Science · Grade \$\{esc\(_g\(\)\)\}/.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
