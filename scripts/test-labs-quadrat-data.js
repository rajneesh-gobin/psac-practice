'use strict';
// Science Labs: the biology and the arithmetic the Quadrat Field is allowed to show.
//
// The bench draws whatever engine/labs/lab_quadrat_data.js says, so a mistake
// in that file is a mistake taught to a child. This checks what can be checked
// mechanically: the estimate formula against the question bank's own worked
// examples, the edge rule (every plant counted in exactly one of the 400
// squares), that random sampling with more quadrats converges on the true
// population while choosing the thickest spots overestimates (seeded, so it is
// the same every run), what each threat does to the plot, every discovery
// recipe valid and leading to its own discovery, and every card and quiz
// complete.
//
// Run: node scripts/test-labs-quadrat-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_quadrat_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_quadrat.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabQuadratData = LabQuadratData;', ctx);
const Q = ctx.LabQuadratData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b) => Math.abs(a - b) < 1e-9;

console.log('\nThe estimate (the question bank’s own worked examples)');
const E = (c, A, q) => Q.estimate(c, A, q);
ok('five 1 m² quadrats 4, 6, 5, 7, 3: mean 5 (g9s-b3-023, v039)', near(E([4, 6, 5, 7, 3]).mean, 5) && near(E([4, 6, 5, 3, 7]).mean, 5));
ok('…in a 200 m² field: 1000', near(E([4, 6, 5, 7, 3], 200).est, 1000));
ok('8 plants in one 1 m² quadrat, 200 m² field: 1600 (g9s-b3-022)', near(E([8], 200).est, 1600));
ok('mean 5 per m², 350 m² field: 1750 (g9s-b3-024)', near(E([5], 350).est, 1750));
ok('10 quadrats with 30 in total, 100 m² field: 300 (v030)', near(E([3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 100).est, 300) && near(E([0, 6, 2, 4, 3, 5, 1, 3, 2, 4], 100).est, 300));
ok('8 in one 1 m² quadrat, 50 m² field: 400 (v036)', near(E([8], 50).est, 400));
ok('12 in a 0.5 m² quadrat, 20 m² field: 480 (v037)', near(E([12], 20, 0.5).est, 480));
ok('20 in a 2 m × 2 m quadrat, 400 m² meadow: 2000 (v038)', near(E([20], 400, 4).est, 2000));
ok('five 0.25 m² quadrats 4, 7, 3, 6, 5: 20 per m² (bpi-033)', near(E([4, 7, 3, 6, 5], 1, 0.25).est, 20));
ok('the lab’s own plot: factor 400 (400 m² ÷ 1 m²)', E([1]).factor === 400 && Q.FIELD.area === Q.FIELD.w * Q.FIELD.h && Q.QUAD.area === Q.QUAD.side * Q.QUAD.side);
ok('the formula names the mean, the plot area and the quadrat area', /mean/.test(Q.EST_FORMULA) && /area of the plot/.test(Q.EST_FORMULA) && /area of one quadrat/.test(Q.EST_FORMULA));
ok('rounded is the nearest whole plant', E([1, 2, 2]).rounded === 667 && E([0, 0, 1]).rounded === 133);

console.log('\nThe plot');
const f0 = Q.makeField([]);
ok('the same plot every time (seeded)', JSON.stringify(Q.makeField([])) === JSON.stringify(f0));
ok('every plant lies inside the plot, clear of its outer edge', f0.every(p => p.x >= Q.R && p.x <= Q.FIELD.w - Q.R && p.y >= Q.R && p.y <= Q.FIELD.h - Q.R));
ok('true populations are the numbers in the species table', Q.SPECIES_ORDER.every(sp => Q.truePop(f0, sp) === Q.SPECIES[sp].n), Q.SPECIES_ORDER.map(sp => Q.truePop(f0, sp)));
ok('species statuses: ebony endemic; guava, privet and lantana invasive aliens',
   Q.SPECIES.ebony.status === 'endemic' && ['guava', 'privet', 'lantana'].every(sp => Q.SPECIES[sp].status === 'invasive'));
ok('the plants grow in patches: guava counts per square range from 0 to at least 8', (() => { const c = Q.census(f0, 'guava'); return c.min === 0 && c.max >= 8; })());
ok('…but no square holds more than 16 of one species (a child can tap-count it)', Q.SPECIES_ORDER.every(sp => Q.census(f0, sp).max <= 16), Q.SPECIES_ORDER.map(sp => Q.census(f0, sp).max));
ok('ids are unique', new Set(f0.map(p => p.id)).size === f0.length);

console.log('\nThe edge rule');
const P = (x, y) => ({ x, y });
ok('wholly inside: counted', Q.where(P(5.5, 5.5), 5, 5) === 'in');
ok('crossing the LEFT side: counted', Q.where(P(5.03, 5.5), 5, 5) === 'edge_in');
ok('crossing the TOP side: counted', Q.where(P(5.5, 5.03), 5, 5) === 'edge_in');
ok('crossing the RIGHT side: not counted', Q.where(P(5.97, 5.5), 5, 5) === 'edge_out');
ok('crossing the BOTTOM side: not counted', Q.where(P(5.5, 5.97), 5, 5) === 'edge_out');
ok('crossing the top-right corner: not counted (it touches the right side)', Q.where(P(5.97, 5.03), 5, 5) === 'edge_out');
ok('crossing the top-left corner: counted', Q.where(P(5.03, 5.03), 5, 5) === 'edge_in');
ok('well outside: not in the quadrat', Q.where(P(7, 5.5), 5, 5) === 'out' && Q.where(P(5.5, 4.5), 5, 5) === 'out');
ok('a plant on a grid line is counted in exactly one of the two squares it crosses',
   [[5.97, 5.5], [5.5, 5.97], [5.97, 5.97], [5.03, 5.03]].every(([x, y]) => {
     const p = P(x, y); let n = 0;
     for (let qy = 3; qy <= 7; qy++) for (let qx = 3; qx <= 7; qx++) { const w = Q.where(p, qx, qy); if (w === 'in' || w === 'edge_in') n++; }
     return n === 1; }));
const fields = [[], ['cyclone'], ['drought'], ['spread'], ['clear'], ['weed'], ['spread', 'weed'], ['cyclone', 'clear', 'drought']];
let censusOk = true, allHigh = true, insideLow = true;
fields.forEach(ev => {
  const f = Q.makeField(ev);
  Q.SPECIES_ORDER.forEach(sp => {
    const c = Q.census(f, sp), T = Q.truePop(f, sp);
    if (c.rule !== T) censusOk = false;
    if (T && !(c.all > c.rule)) allHigh = false;
    if (T && !(c.inside < c.rule)) insideLow = false;
  });
});
ok('counting all 400 squares with the edge rule gives EXACTLY the true population - every species, every event', censusOk);
ok('counting every plant touching a frame always gives too many', allHigh);
ok('counting only the plants wholly inside always gives too few', insideLow);
const cg = Q.census(f0, 'guava');
ok('…by a visible amount for guava (at least 15% each way)', cg.all / cg.rule > 1.15 && cg.inside / cg.rule < 0.85, cg);
const cls = Q.classify(f0, 'guava', 4, 5);
ok('countBy: rule = in + edge_in, all = everything touching, inside = in', Q.countBy(cls, 'rule') === cls.in.length + cls.edge_in.length
   && Q.countBy(cls, 'all') === cls.in.length + cls.edge_in.length + cls.edge_out.length && Q.countBy(cls, 'inside') === cls.in.length);
ok('the species list of a square is every species counted there', (() => {
  for (const [x, y] of Q.squares()) { const s = Q.speciesIn(f0, x, y); if (s.some(sp => Q.countQuad(f0, sp, x, y) === 0) || Q.SPECIES_ORDER.some(sp => !s.includes(sp) && Q.countQuad(f0, sp, x, y) > 0)) return false; }
  return true; })());

console.log('\nRandom sampling converges; choosing the spots does not');
ok('400 squares, x and y from 0 to 19', Q.squares().length === 400 && Q.squares().every(([x, y]) => x >= 0 && x < 20 && y >= 0 && y < 20));
const rs = Q.randomSquares(Q.rng(1), 30, ['0,0', '1,0']);
ok('random squares are all different and never one already used', new Set(rs.map(([x, y]) => Q.key(x, y))).size === 30 && !rs.some(([x, y]) => Q.key(x, y) === '0,0' || Q.key(x, y) === '1,0'));
ok('the same seed gives the same throws (the tests are deterministic)', JSON.stringify(Q.randomSquares(Q.rng(42), 10)) === JSON.stringify(Q.randomSquares(Q.rng(42), 10)));
const errOf = (sp, n, seeds, field) => {
  const f = field || f0, T = Q.truePop(f, sp);
  let e = 0;
  for (let s = 1; s <= seeds; s++) {
    const sq = Q.randomSquares(Q.rng(1000 + s * 13 + n), n);
    e += Math.abs(Q.estimate(sq.map(([x, y]) => Q.countQuad(f, sp, x, y))).est - T) / T;
  }
  return e / seeds;
};
for (const sp of ['guava', 'privet', 'ebony']) {
  const e = [3, 5, 10, 20, 40].map(n => errOf(sp, n, 300));
  ok(`${sp}: the average error shrinks with every step up in quadrats (3, 5, 10, 20, 40)`, e.every((v, i) => i === 0 || v < e[i - 1]), e.map(v => Math.round(v * 100) + '%'));
}
ok('guava: 40 random quadrats are within 20% on average; 3 are not', errOf('guava', 40, 300) < 0.2 && errOf('guava', 3, 300) > 0.4);
const mean400 = (() => { let t = 0; for (let s = 1; s <= 400; s++) { const sq = Q.randomSquares(Q.rng(s), 10); t += Q.estimate(sq.map(([x, y]) => Q.countQuad(f0, 'guava', x, y))).est; } return t / 400; })();
ok('random sampling is unbiased: the average of 400 ten-quadrat estimates is within 5% of the truth', Math.abs(mean400 / 900 - 1) < 0.05, Math.round(mean400));
const th = Q.thickest(f0, 'guava', 5);
const thEst = Q.estimate(th.map(([x, y]) => Q.countQuad(f0, 'guava', x, y))).est;
ok('the thickest squares come first and never repeat', th.map(([x, y]) => Q.countQuad(f0, 'guava', x, y)).every((c, i, a) => i === 0 || c <= a[i - 1]) && new Set(th.map(([x, y]) => Q.key(x, y))).size === 5);
ok('five quadrats in the thickest guava: an estimate more than 3× the true population', thEst > 3 * 900, thEst);
ok('…and every one of 300 random ten-quadrat surveys lands closer to the truth than that',
   (() => { for (let s = 1; s <= 300; s++) { const sq = Q.randomSquares(Q.rng(s * 7), 10); if (Math.abs(Q.estimate(sq.map(([x, y]) => Q.countQuad(f0, 'guava', x, y))).est - 900) >= Math.abs(thEst - 900)) return false; } return true; })());
ok('biased placement overestimates for every species', Q.SPECIES_ORDER.every(sp => { const t = Q.thickest(f0, sp, 5); return Q.estimate(t.map(([x, y]) => Q.countQuad(f0, sp, x, y))).est > Q.truePop(f0, sp); }));
ok('no lantana grows in the thickest guava squares (the “Why random?” mission is not a hazard trap)', Q.thickest(f0, 'guava', 8).every(([x, y]) => Q.countQuad(f0, 'lantana', x, y, 'all') === 0));

console.log('\nWhat happens to the plot');
const pop = ev => { const f = Q.makeField(ev); const o = {}; Q.SPECIES_ORDER.forEach(sp => { o[sp] = Q.truePop(f, sp); }); return o; };
const b = pop([]);
const cy = pop(['cyclone']), dr = pop(['drought']), sp1 = pop(['spread']), cl = pop(['clear']), wd = pop(['weed']);
ok('a cyclone lowers every species', Q.SPECIES_ORDER.every(s => cy[s] < b[s]), cy);
ok('a drought lowers every species, the ebony seedlings by the biggest share', Q.SPECIES_ORDER.every(s => dr[s] < b[s]) && Q.SPECIES_ORDER.every(s => s === 'ebony' || dr.ebony / b.ebony < dr[s] / b[s]), dr);
ok('ten years of invasion: guava, privet and lantana rise, the ebony falls', sp1.guava > b.guava && sp1.privet > b.privet && sp1.lantana > b.lantana && sp1.ebony < b.ebony, sp1);
ok('clearing a strip removes every plant in it and none outside it', Q.makeField(['clear']).every(p => p.x < 14) && Q.SPECIES_ORDER.every(s => cl[s] === f0.filter(p => p.sp === s && p.x < 14).length), cl);
ok('weeding removes every invasive plant and the ebony seedlings increase', wd.guava === 0 && wd.privet === 0 && wd.lantana === 0 && wd.ebony > b.ebony, wd);
ok('years: invasion +10, weeding +5, cyclone +1, clearing 0', Q.yearOf(['spread']) === 10 && Q.yearOf(['spread', 'weed']) === 15 && Q.yearOf(['cyclone']) === 1 && Q.yearOf(['clear']) === 0);
ok('the mission quiz’s numbers are the model’s own', Q.TRUE.guava0 === b.guava && Q.TRUE.guava1 === sp1.guava && Q.TRUE.ebony1 === sp1.ebony && Q.TRUE.ebony2 === pop(['spread', 'weed']).ebony
   && Q.TRUE.guava1 > Q.TRUE.guava0 && Q.TRUE.ebony1 < Q.TRUE.ebony0 && Q.TRUE.ebony2 > Q.TRUE.ebony1);
ok('every event has a name, an icon, a kind and what it did', Q.EVENT_ORDER.every(id => { const e = Q.EVENTS[id]; return e.name && e.icon && e.say && e.blurb && ['natural', 'human', 'conservation'].includes(e.kind); }));
ok('the syllabus threats are all here: cyclone and drought (natural), invasion and deforestation (human), and conservation',
   Q.EVENTS.cyclone.kind === 'natural' && Q.EVENTS.drought.kind === 'natural' && Q.EVENTS.spread.kind === 'human' && Q.EVENTS.clear.kind === 'human' && Q.EVENTS.weed.kind === 'conservation');

console.log('\nThe calculation question, from the pupil’s own counts');
const sets = [[4, 6, 5, 7, 3], [0, 0, 0, 0, 0], [1], [3, 0, 7, 1, 2, 9, 0, 4, 2, 5], [0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0], [12, 15, 14, 16, 22]];
for (const c of sets) {
  const q = Q.calcQuestion(c, 'strawberry guava plants');
  const e = Q.estimate(c);
  ok(`[${c.join(',')}]: 4 distinct options, the first is round(mean × 400) = ${e.rounded}, and the reason shows the working`,
     q.options.length === 4 && new Set(q.options).size === 4 && q.options[0] === String(e.rounded) && /Mean = /.test(q.why) && q.q.length > 20, q);
}

console.log('\nDiscoveries');
const ids = Q.DISCOVERIES.map(d => d.id);
ok('at least 12 discoveries, ids unique', ids.length >= 12 && new Set(ids).size === ids.length, ids.length);
const tokenOk = on => {
  const [k, v] = on.split(':');
  const sets2 = { species: Q.SPECIES_ORDER, gloves: ['on', 'off'], view: ['field', 'zoom'], count: ['all', 'inside'], event: Q.EVENT_ORDER };
  if (v !== undefined) return !!sets2[k] && sets2[k].includes(v);
  return ['throw', 'thick', 'count', 'record', 'auto5', 'estimate', 'new', 'census', 'restore'].includes(k);
};
const bad = Q.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery says what you saw, why, and has a valid “how to find it” recipe', bad.length === 0, bad.map(d => d.id));
ok('no recipe or guide ever places a quadrat by choice or breaks the edge rule',
   Q.DISCOVERIES.map(d => d.how).concat(Q.GUIDES.map(G => G.steps.map(s => s.on))).every(how => !how.some(t => t === 'thick' || t === 'count:all' || t === 'count:inside')));

// A small model of the bench, run through each recipe with a seeded generator.
function runRecipe(how, seed) {
  const r = Q.rng(seed);
  let events = [], plants = Q.makeField([]), sp = 'guava', gloves = false, series = { sp, key: '', quads: [] }, q = null;
  const hist = [], found = new Set(), cards = [];
  const newSeries = () => { series = { sp, key: events.join('>'), quads: [] }; q = null; };
  const taken = () => series.quads.map(x => Q.key(x.x, x.y));
  const countIt = rule => {
    if (!q || q.counted) { cards.push('nothing to count'); return false; }
    if (!gloves && Q.countQuad(plants, 'lantana', q.x, q.y, 'all') > 0) { cards.push('lantana'); return false; }
    const c = Q.classify(plants, sp, q.x, q.y);
    if (rule !== 'rule' && Q.countBy(c, rule) !== Q.countBy(c, 'rule')) { cards.push('edge'); return false; }
    q.counted = true;
    series.quads.push({ x: q.x, y: q.y, count: Q.countBy(c, 'rule'), how: q.how });
    Q.countDiscoveries(series).forEach(x => found.add(x));
    return true;
  };
  for (const t of how) {
    const [k, v] = t.split(':');
    if (k === 'species') { if (v !== sp) { const had = series.quads.length; sp = v; if (had) newSeries(); else series.sp = v; } }
    else if (k === 'gloves') gloves = v === 'on';
    else if (k === 'throw') { const s = Q.randomSquares(r, 1, taken())[0]; q = { x: s[0], y: s[1], how: 'random' }; }
    else if (k === 'thick') { const s = Q.thickest(plants, sp, 1, taken())[0]; q = { x: s[0], y: s[1], how: 'thick' }; }
    else if (k === 'count') countIt(v || 'rule');
    else if (k === 'auto5') { for (const s of Q.randomSquares(r, 5, taken())) { q = { x: s[0], y: s[1], how: 'random' }; if (!countIt('rule')) break; } }
    else if (k === 'estimate') {
      const e = Q.estimate(series.quads.map(x => x.count)), random = series.quads.every(x => x.how === 'random');
      hist.unshift({ sp, n: e.n, random, key: series.key });
      if (!random) cards.push('biased'); else if (e.n < Q.MIN_Q) cards.push('too_few');
      else Q.estimateDiscoveries({ sp, n: e.n, random, events, history: hist }).forEach(x => found.add(x));
    }
    else if (k === 'census') found.add('census');
    else if (k === 'new') newSeries();
    else if (k === 'event') { events.push(v); plants = Q.makeField(events); newSeries(); }
    else if (k === 'restore') { events = []; plants = Q.makeField([]); newSeries(); }
  }
  return { found, cards };
}
const unsolved = [];
for (const d of Q.DISCOVERIES) {
  for (const seed of [1, 7, 42, 2026, 90210]) {
    const res = runRecipe(d.how, seed);
    if (!res.found.has(d.id) || res.cards.length) { unsolved.push(`${d.id} (seed ${seed}) -> found ${[...res.found].join('/')}${res.cards.length ? ' cards ' + res.cards.join('/') : ''}`); break; }
  }
}
ok('every recipe leads to its own discovery with no mistake card on the way (5 seeds each)', unsolved.length === 0, unsolved);
const reachable = new Set();
Q.DISCOVERIES.forEach(d => runRecipe(d.how, 3).found.forEach(x => reachable.add(x)));
ok('every id the model can unlock is a real discovery', [...reachable].every(x => ids.includes(x)), [...reachable].filter(x => !ids.includes(x)));
ok('the bench names the discovery it unlocks outside the data functions', bench.includes("'census'"));
ok('without gloves, a survey that reaches the lantana patch is stopped by the hazard', runRecipe(['species:lantana', 'thick', 'count'], 1).cards.includes('lantana'));
ok('the model’s mistakes: chosen spots → biased card; 3 quadrats → too few', runRecipe(['gloves:on', 'thick', 'count', 'estimate'], 1).cards.includes('biased')
   && runRecipe(['gloves:on', 'throw', 'count', 'throw', 'count', 'throw', 'count', 'estimate'], 1).cards.includes('too_few'));

console.log('\nGuided experiments');
ok('at least 3 guided experiments, ids unique', Q.GUIDES.length >= 3 && new Set(Q.GUIDES.map(g => g.id)).size === Q.GUIDES.length);
for (const G of Q.GUIDES) {
  const badS = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step names a real action, says what to do and has a button`, badS.length === 0, badS);
  const cards = [1, 7, 42].map(s => runRecipe(G.steps.map(x => x.on), s).cards).flat();
  ok(`${G.title}: ends with what they found out, and runs with no mistake card`, !!(G.lesson && G.blurb && G.icon) && cards.length === 0, cards);
}

console.log('\nMissions, hazards and result cards');
ok('at least 2 missions', Q.MISSIONS.length >= 2);
for (const M of Q.MISSIONS) {
  const badQ = M.quiz.filter(q => !q.q || !q.why || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some(o => !o));
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 5 && badQ.length === 0, badQ.map(q => q.q));
  ok(`${M.title}: has a goal, a blurb, an icon and a species`, !!(M.intro && M.blurb && M.icon && Q.SPECIES[M.sp]));
}
ok('a mission asks for the estimate calculation (the pupil’s own numbers, plus a worked one)', Q.MISSIONS.some(M => M.calc && M.quiz.some(q => /Estimate the number/.test(q.q))));
ok('a mission asks how to make the estimate more reliable', Q.MISSIONS.some(M => M.quiz.some(q => /more reliable/.test(q.q) && /more quadrats/i.test(q.options[0]))));
ok('a mission asks why quadrats are placed at random', Q.MISSIONS.some(M => M.quiz.some(q => /random/.test(q.q) && /bias|represent/i.test(q.options[0]))));
ok('the Mauritian paper references are there: kestrel (2022 Q5), invasive aliens (2022 Q1(5)), pink pigeon (2023 Q1(10))',
   Q.MISSIONS.some(M => M.quiz.some(q => /2022 Q5\b/.test(q.why) && /kestrel/i.test(q.q))) && Q.MISSIONS.some(M => M.quiz.some(q => /2022 Q1\(5\)/.test(q.why)))
   && Q.MISSIONS.some(M => M.quiz.some(q => /2023 Q1\(10\)/.test(q.why) && /pink pigeon/i.test(q.options[0]))));
ok('the pink-pigeon question’s wrong answers are all introduced species', (() => { const q = Q.MISSIONS.flatMap(M => M.quiz).find(x => /endemic to Mauritius/.test(x.q)); return q && /myna/.test(q.options[1]) && /guava/i.test(q.options[2]) && /snail/.test(q.options[3]); })());
const SIGNS = ['corrosive', 'explosive', 'flammable', 'pressure', 'toxic', 'irritant', 'oxidising', 'electric', 'hot', 'eye', 'biohazard'];
for (const [id, H] of Object.entries(Q.HAZARDS)) {
  ok(`hazard ${id}: real signs, what happened, why, what to do instead and the exam point`,
     H.signs.length && H.signs.every(s => SIGNS.includes(s)) && H.title() && H.happened() && H.why && H.instead && H.exam);
}
ok('the lantana hazard is the only field hazard, and lantana is the species marked prickly', Object.keys(Q.HAZARDS).join() === 'lantana' && Q.SPECIES.lantana.prickly && !Q.SPECIES.guava.prickly);
const rctx = { name: 'strawberry guava plants', thick: true, k: 5, mean: '10.2', est: '4,080', trueN: '900', times: '4.5', n: 2, min: 0, max: 14, lo: '0', hi: '5,600', mode: 'all', said: 9, right: 7, extra: 2, pct: 30 };
for (const [id, R] of Object.entries(Q.RESULTS)) {
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && R.title && R.happened(rctx) && R.instead && R.exam));
}
ok('the biased card explains a thickest-patch overestimate and a hand-chosen square', /thickest/.test(Q.RESULTS.biased.happened(rctx)) && /chose where/.test(Q.RESULTS.biased.happened(Object.assign({}, rctx, { thick: false }))));
ok('the edge card explains too many and too few', /too HIGH/.test(Q.RESULTS.edge.happened(rctx)) && /too LOW/.test(Q.RESULTS.edge.happened(Object.assign({}, rctx, { mode: 'inside' }))));
const used = id => bench.includes(`'${id}'`) || bench.includes(`RESULTS.${id}`) || bench.includes(`HAZARDS.${id}`);
ok('every hazard and result card is used by the bench', Object.keys(Q.HAZARDS).concat(Object.keys(Q.RESULTS)).every(used),
   Object.keys(Q.HAZARDS).concat(Object.keys(Q.RESULTS)).filter(id => !used(id)));
ok('at least 3 mistakes that teach', Object.keys(Q.HAZARDS).length + Object.keys(Q.RESULTS).length >= 3);
ok('the 💡 facts are there', Q.FACTS.length >= 10 && Q.FACTS.every(f => typeof f === 'string' && f.length > 20));
const texts = Q.DISCOVERIES.map(d => d.learn).concat(Object.values(Q.RESULTS).map(R => R.instead), Q.MISSIONS.flatMap(M => M.quiz.map(q => q.why)));
ok('the edge rule is labelled beyond the NCE syllabus wherever it is taught', texts.filter(t => /edge rule|rule itself/i.test(t)).every(t => /beyond the NCE syllabus/.test(t)) && texts.some(t => /edge rule/i.test(t)));
ok('the counts are called a model, not real data', /model/i.test(src) && /model/i.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
