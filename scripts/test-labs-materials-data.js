'use strict';
// Science Labs: the science the Materials Tester (PSAC Grade 4) is allowed to show.
//
// The bench draws whatever engine/labs/lab_materials_data.js says, so a mistake
// in that file is a mistake taught to a nine-year-old. This checks every
// object's behaviour against the Grade 4 syllabus facts (magnets pull iron and
// steel only; conductors are metals and graphite; the three light classes;
// float / sink; waterproof / absorbent; flexible / rigid; natural / man-made),
// every "right material for the job" answer, every discovery recipe (by
// running it on a model of the bench), the grade tags, the reading level, and
// every quiz, hazard and result card.
//
// Run: node scripts/test-labs-materials-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_materials_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_materials.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_materials.css'), 'utf8');
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabMaterialsData = LabMaterialsData;', ctx);
const L = ctx.LabMaterialsData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const ids = list => list.map(x => x.id);
const byMat = m => L.OBJECTS.filter(o => o.material === m).map(o => o.id);
const where = (prop, v) => L.OBJECTS.filter(o => o[prop] === v).map(o => o.id).sort();
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

console.log('\nGrades');
ok('the lab declares GRADES = [4]', JSON.stringify(Array.from(L.GRADES)) === '[4]');
for (const [name, list] of [['objects', L.OBJECTS], ['guided experiments', L.GUIDES], ['missions', L.MISSIONS], ['discoveries', L.DISCOVERIES], ['jobs', L.JOBS], ['experiments', L.EXPERIMENTS || []]]) {
  const bad = list.filter(x => !Array.isArray(x.grades) || !x.grades.length || !x.grades.every(g => L.GRADES.includes(g)));
  ok(`every one of the ${list.length} ${name} carries grades: [4]`, bad.length === 0, ids(bad));
}

console.log('\nThe tray');
ok('at least 12 everyday objects', L.OBJECTS.length >= 12, L.OBJECTS.length);
ok('object ids are unique', new Set(ids(L.OBJECTS)).size === L.OBJECTS.length);
ok('every object is made of a known material', L.OBJECTS.every(o => L.MATERIALS[o.material]));
const propBad = [];
for (const o of L.OBJECTS) for (const p of Object.keys(L.PROPS)) {
  const v = o[p];
  if (p === 'bend' && v === null) continue;
  if (!L.PROPS[p].values.some(x => x.v === v)) propBad.push(o.id + '.' + p + '=' + v);
}
ok('every object has a valid value for every property (only a bend test may be "can’t test")', propBad.length === 0, propBad);
ok('only the cork cannot be bend-tested (too short and thick) - and the bench says so', same(L.OBJECTS.filter(o => o.bend === null).map(o => o.id), ['cork']) && /too short and thick/.test(L.say('bend', 'cork')));
ok('every object says where its material comes from', L.OBJECTS.every(o => o.from && o.from.length > 10));
ok('no coins or stainless-steel spoons (their magnet result really varies)', !L.OBJECTS.some(o => /coin|spoon/i.test(o.name)));

console.log('\nMagnets (g4s-mat-002, g4s-mat-007, g4sci-hd-036)');
const magnetic = where('magnetic', true);
ok('attracted by a magnet: exactly the iron and steel objects', same(magnetic, [...byMat('iron'), ...byMat('steel')]), magnetic);
ok('at least two things are attracted and at least one other metal is not', magnetic.length >= 2 && L.OBJECTS.some(o => L.MATERIALS[o.material].metal && !o.magnetic));
ok('aluminium and copper are metals that are NOT attracted', ['aluminium', 'copper'].every(m => L.MATERIALS[m].metal && byMat(m).every(id => !L.obj(id).magnetic)));
ok('no plastic, wood, glass, rubber, cotton, stone, cork, sponge or paper is attracted',
   L.OBJECTS.filter(o => !L.MATERIALS[o.material].metal).every(o => !o.magnetic));

console.log('\nElectricity (g4s-mat-014, g4sc-mat-050/054)');
ok('conductors: every metal, plus pencil lead (graphite) - and nothing else',
   L.OBJECTS.every(o => o.conductor === (L.MATERIALS[o.material].metal || o.material === 'graphite')));
ok('pencil lead is the one conductor that is not a metal', same(L.OBJECTS.filter(o => o.conductor && !L.MATERIALS[o.material].metal).map(o => o.id), ['lead']));
ok('plastic, rubber, wood and glass are insulators', ['plastic', 'rubber', 'wood', 'glass'].every(m => byMat(m).every(id => L.obj(id).conductor === false)));
ok('the tester is a small 1.5 V cell, never the mains', L.TESTER.volts === 1.5 && L.TESTER.mainsVolts > 100);

console.log('\nLight (g4s-mat-001/004/011, g4sc-mat-052/053)');
ok('transparent: clear glass and the plastic bottle', same(where('light', 'transparent'), ['glass', 'bottle']), where('light', 'transparent'));
ok('translucent: frosted glass and tracing paper', same(where('light', 'translucent'), ['frosted', 'paper']), where('light', 'translucent'));
ok('opaque: wood, stone, metal and the rest', same(where('light', 'opaque'), L.OBJECTS.filter(o => !['glass', 'bottle', 'frosted', 'paper'].includes(o.id)).map(o => o.id)));
ok('every metal is opaque', L.OBJECTS.filter(o => L.MATERIALS[o.material].metal).every(o => o.light === 'opaque'));

console.log('\nWater');
ok('floats: cork, wood, rubber ball, plastic bottle (air inside), sponge, a flat sheet of foil', same(where('floats', 'floats'), ['cork', 'wood', 'ball', 'bottle', 'sponge', 'foil']), where('floats', 'floats'));
ok('sinks: iron nail, steel pin, copper wire, pencil lead, stone, both glasses', same(where('floats', 'sinks'), ['nail', 'pin', 'copper', 'lead', 'stone', 'glass', 'frosted']), where('floats', 'sinks'));
ok('soaks up water and then sinks: the cotton towel and the paper', same(where('floats', 'soaks'), ['towel', 'paper']));
ok('absorbent: cotton, sponge, paper and bare wood (g4s-mat-006, g4s-mat-010)', same(where('water', 'absorbent'), ['towel', 'sponge', 'paper', 'wood']));
ok('waterproof: rubber, plastic, glass, metal, stone, cork', ['ball', 'bottle', 'glass', 'nail', 'stone', 'cork'].every(id => L.obj(id).water === 'waterproof'));
ok('everything that "soaks" is absorbent', L.OBJECTS.filter(o => o.floats === 'soaks').every(o => o.water === 'absorbent'));

console.log('\nBending (g4s-mat-008, g4sc-mat-059)');
ok('flexible: copper wire, foil, rubber, plastic bottle, cotton, sponge, paper', same(where('bend', 'flexible'), ['copper', 'foil', 'ball', 'bottle', 'towel', 'sponge', 'paper']), where('bend', 'flexible'));
ok('rigid: glass, stone, wood, iron nail, steel pin, pencil lead', same(where('bend', 'rigid'), ['glass', 'frosted', 'stone', 'wood', 'nail', 'pin', 'lead']), where('bend', 'rigid'));

console.log('\nNatural or man-made (g4s-mat-003/012, g4sc-mat-051/057, g4sci-hd-037)');
ok('natural: wood, cork, stone, rubber, cotton', same(L.OBJECTS.filter(o => o.origin === 'natural').map(o => o.material), ['wood', 'cork', 'stone', 'rubber', 'cotton']));
ok('man-made: every metal, plastic, glass, sponge foam, paper, pencil lead', L.OBJECTS.filter(o => o.origin === 'man-made').every(o => ['iron', 'steel', 'aluminium', 'copper', 'plastic', 'glass', 'frosted', 'foam', 'paper', 'graphite'].includes(o.material)));
ok('glass says it is made by heating sand (hd-037)', /sand/.test(L.obj('glass').from) && /heat/.test(L.obj('glass').from));

console.log('\nHeat (g4s-mat-009, g4sci-hd-034)');
ok('good conductors of heat: the metals (and graphite); everything else is poor', L.OBJECTS.every(o => (o.heat === 'conductor') === (L.MATERIALS[o.material].metal || o.material === 'graphite')));

console.log('\nStations');
ok('seven stations, each testing a real property', L.STATIONS.length === 7 && L.STATIONS.every(s => L.PROPS[s.prop] && s.icon && s.name && s.ask && s.how));
const sayBad = [];
for (const s of L.STATIONS) for (const o of L.OBJECTS) {
  if (L.result(s.id, o.id) !== o[s.prop]) sayBad.push(s.id + '/' + o.id + ' result');
  const t = L.say(s.id, o.id);
  if (!t || t.length < 10) sayBad.push(s.id + '/' + o.id + ' say');
}
ok('every station gives each object its own property and a sentence for the helper', sayBad.length === 0, sayBad.slice(0, 5));
ok('the helper uses the science word the result earned', L.say('magnet', 'nail').includes('attracted') && L.say('torch', 'frosted').includes('translucent')
   && L.say('circuit', 'bottle').includes('insulator') && L.say('drop', 'sponge').includes('absorbent') && L.say('bend', 'copper').includes('flexible'));
ok('every science word has a Grade 4 explanation', Object.values(L.PROPS).every(p => p.values.every(v => v.word && v.is && v.explain)));

console.log('\nRight material for the job');
ok('at least 6 jobs', L.JOBS.length >= 6);
ok('job ids are unique', new Set(ids(L.JOBS)).size === L.JOBS.length);
for (const J of L.JOBS) {
  const choicesOk = J.choices.length === 4 && new Set(J.choices).size === 4 && J.choices.every(id => L.obj(id));
  const needsOk = J.needs.length && J.needs.every(n => L.PROPS[n.prop] && L.PROPS[n.prop].values.some(x => x.v === n.is) && n.must);
  const right = L.judge(J.id, J.choices[0]);
  const wrong = J.choices.slice(1).map(id => ({ id, r: L.judge(J.id, id) }));
  const mats = new Set(J.choices.map(id => L.obj(id).material));
  ok(`${J.title}: ${L.materialName(J.choices[0])} has every property the job needs; each other choice fails one, and says which`,
     choicesOk && needsOk && mats.size === 4 && right.ok && wrong.every(w => !w.r.ok && w.r.text.includes(L.materialName(w.id)) && w.r.text.includes(w.r.need.must)),
     { right, wrong: wrong.filter(w => w.r.ok).map(w => w.id) });
}
const win = L.judge('window', 'wood');
ok('a wrong pick names the property: “Wood is opaque. A window must be transparent.”', win && win.text === 'Wood is opaque. A window must be transparent.', win && win.text);
ok('the questions' + "'" + ' jobs are all here: window (g4s-mat-005), raincoat/umbrella (g4s-mat-006), cable covering (g4sc-mat-054), cooking pot (g4s-mat-009), roof (g4sc-mat-058), recycling cans (hd-036)',
   ['window', 'umbrella', 'cable', 'pot', 'roof', 'recycle'].every(id => L.JOBS.some(j => j.id === id)));

console.log('\nDiscoveries');
ok('at least 10 discoveries', L.DISCOVERIES.length >= 10, L.DISCOVERIES.length);
ok('discovery ids are unique', new Set(ids(L.DISCOVERIES)).size === L.DISCOVERIES.length);
const tokenOk = on => {
  const i = on.indexOf(':'), k = on.slice(0, i), v = on.slice(i + 1);
  if (k === 'station') return !!L.station(v);
  if (k === 'lights') return v === 'on' || v === 'off';
  if (k === 'power') return v === 'battery' || v === 'socket';
  if (k === 'test') return !!L.obj(v);
  if (k === 'sort') return !!L.PROPS[v] && L.STATIONS.some(s => s.prop === v);
  if (k === 'job' || k === 'show') return L.JOBS.some(j => j.id === v);
  if (k === 'pick') { const [j, o] = v.split(':'); const J = L.JOBS.find(x => x.id === j); return !!J && J.choices.includes(o); }
  return false;
};
const badDisc = L.DISCOVERIES.filter(d => !d.title || !d.icon || !d.hint || !d.saw || !d.rule || !d.learn || !d.unlock || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery has a clue, what you saw, the rule, why it matters and a valid “how to find it” recipe', badDisc.length === 0, ids(badDisc));

// A model of the bench: follow a recipe and report what unlocks - and any card
// that would interrupt it.
function run(steps) {
  const st = { station: 'magnet', lights: true, power: 'battery', job: null, results: {}, picks: [] }, ev = [], cards = [];
  for (const on of steps) {
    const i = on.indexOf(':'), k = on.slice(0, i), v = on.slice(i + 1);
    if (k === 'station') { st.station = v; st.job = null; }
    else if (k === 'lights') st.lights = v === 'on';
    else if (k === 'power') { if (v === 'socket') cards.push('mains'); else st.power = 'battery'; }
    else if (k === 'show') st.job = v;
    else if (k === 'pick') {
      const [j, o] = v.split(':'), r = L.judge(j, o);
      st.job = j; st.picks.push({ job: j, obj: o, ok: !!(r && r.ok) });
      if (r && r.ok) ev.push({ job: j });
    }
    else if (k === 'test') {
      st.job = null;
      if (st.station === 'torch' && st.lights) { cards.push('lights_on'); continue; }
      const o = L.obj(v);
      if (st.station === 'bend' && (o.material === 'glass' || o.material === 'frosted')) cards.push('glass');
      const value = L.result(st.station, v);
      (st.results[v] = st.results[v] || {})[st.station] = value;
      ev.push({ station: st.station, obj: v, value });
    } else if (k === 'sort') {
      const S = L.STATIONS.find(s => s.prop === v);
      const groups = L.PROPS[v].values.filter(x => L.OBJECTS.some(o => st.results[o.id] && S.id in st.results[o.id] && st.results[o.id][S.id] === x.v)).length;
      ev.push({ sort: v, full: groups >= 2 });
    } else if (k === 'job') {
      const J = L.JOBS.find(j => j.id === v);
      if (L.judge(v, J.choices[0]).ok) ev.push({ job: v });
    }
  }
  return { ev, cards, st };
}
const hits = (u, e) => u.station ? e.station === u.station && (u.value === undefined || u.value === e.value) && (!u.obj || u.obj === e.obj) && (u.metal === undefined || L.isMetal(e.obj) === u.metal)
  : u.sort ? e.sort === u.sort && !!e.full : u.job ? !!e.job : false;
const unsolved = L.DISCOVERIES.filter(d => { const r = run(d.how); return r.cards.length || !r.ev.some(e => hits(d.unlock, e)); }).map(d => d.id);
ok('every discovery recipe, followed on a model of the bench, unlocks its own card with no hazard or result card on the way', unsolved.length === 0, unsolved);
ok('every discovery can be unlocked by the bench (its unlock rule is one the bench checks)',
   L.DISCOVERIES.every(d => d.unlock.station || d.unlock.sort || d.unlock.job) && /function _checkDisc/.test(bench));
ok('no recipe tests with the room lights on, bends glass or touches the wall socket',
   L.DISCOVERIES.every(d => !d.how.includes('lights:on')) && !/socket/.test(JSON.stringify(L.DISCOVERIES.map(d => d.how))));

console.log('\nGuided experiments');
ok('at least 3 guided experiments', L.GUIDES.length >= 3, L.GUIDES.length);
ok('guide ids are unique', new Set(ids(L.GUIDES)).size === L.GUIDES.length);
for (const G of L.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say);
  const r = run(G.steps.map(s => s.on));
  ok(`${G.title}: every step names a real action, says what to do and has a button`, bad.length === 0, bad);
  ok(`${G.title}: runs with no hazard or unfair-test card, and ends with what they found out`, r.cards.length === 0 && !!(G.lesson && G.blurb && G.icon), r.cards);
}
ok('the Magnet test guide tests a metal that is NOT attracted (foil), so the lesson is seen, not told', L.GUIDES.find(g => g.id === 'magnet').steps.some(s => s.on === 'test:foil'));

console.log('\nMissions');
ok('at least 2 missions', L.MISSIONS.length >= 2, L.MISSIONS.length);
for (const M of L.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: 5 questions, each with 4 distinct options and a reason`, M.quiz.length === 5 && bad.length === 0, bad.map(q => q.q));
  const reqOk = M.reqs.every(r => r.jobs ? r.jobs <= L.JOBS.length
    : r.ids ? r.ids.every(id => L.obj(id)) && r.count <= r.ids.length
    : ['metal', 'nonmetal', 'any'].includes(r.filter) && r.count <= L.OBJECTS.filter(o => r.filter === 'any' || (r.filter === 'metal') === L.MATERIALS[o.material].metal).length);
  ok(`${M.title}: every requirement can be met with the tray, and it has an intro and a blurb`, reqOk && !!(M.intro && M.blurb && M.icon) && (M.station === null || !!L.station(M.station)));
}
const mq = id => L.MISSIONS.find(m => m.id === id).quiz;
const find = (list, re) => list.find(q => re.test(q.q));
const pair = find(mq('magnet_hunt'), /BOTH attracted/);
ok('Magnet hunt: the “both attracted” answer is iron + steel, and every wrong pair has a metal that is not attracted',
   /Iron nail and steel pin/.test(pair.options[0]) && L.obj('nail').magnetic && L.obj('pin').magnetic && pair.options.slice(1).every(o => /copper|aluminium/i.test(o)));
const q1 = find(mq('magnet_hunt'), /Which object is attracted/);
ok('Magnet hunt: “which is attracted” - the answer is the iron nail and the others are not attracted',
   q1.options[0] === 'An iron nail' && !L.obj('copper').magnetic && !L.obj('bottle').magnetic && !L.obj('wood').magnetic);
const qb = find(mq('bulb'), /makes the bulb light/);
ok('Bulb on, bulb off: the copper wire lights the bulb; the plastic, rubber and wood do not',
   qb.options[0] === 'Copper wire' && L.obj('copper').conductor && !L.obj('bottle').conductor && !L.obj('ball').conductor && !L.obj('wood').conductor);
ok('Bulb on, bulb off: the pencil-lead question agrees with the tray (a conductor, not a metal, not magnetic)',
   /conductor/.test(find(mq('bulb'), /pencil lead/).options[0]) && L.obj('lead').conductor && !L.isMetal('lead') && !L.obj('lead').magnetic);
ok('Pick the right material: the cork question agrees with the bowl of water', L.obj('cork').floats === 'floats' && L.obj('stone').floats === 'sinks');

console.log('\nHazards and "what went wrong" cards');
const signKinds = (core.match(/SIGN_LABELS = \{([^}]*)\}/) || [, ''])[1];
for (const [id, H] of Object.entries(L.HAZARDS)) {
  const c = { name: 'Glass tile' };
  ok(`hazard ${id} has real signs and all four texts: what happened, why, what to do, the exam point`,
     H.signs.length && H.signs.every(s => new RegExp('\\b' + s + ':').test(signKinds)) && H.title(c) && H.happened(c) && H.why && H.instead && H.exam);
}
ok('the wall socket: sign “electric”, and it says mains electricity can kill', L.HAZARDS.mains.signs.includes('electric') && /kill/.test(L.HAZARDS.mains.why) && /battery/.test(L.HAZARDS.mains.instead));
ok('broken glass: tell an adult, do not pick it up', /tell an adult/i.test(L.HAZARDS.glass.instead) && /not pick it up/.test(L.HAZARDS.glass.instead));
ok('no hazard is one a Grade 4 child could not meet (no chemicals, no flames)', !/acid|alkali|flame|sodium/i.test(JSON.stringify(Object.values(L.HAZARDS).map(h => [h.why, h.instead]))));
for (const [id, R] of Object.entries(L.RESULTS)) {
  const c = { name: 'Aluminium foil', material: 'Aluminium' };
  ok(`result card ${id} says what happened (naming the object), what to do instead and the exam point`, R.icon && R.title(c) && R.happened(c).includes('aluminium foil') && R.instead && R.exam);
}
ok('the "all metals stick" card says only iron and steel', /Only iron and steel/.test(L.RESULTS.all_metals.instead));
ok('the lights-on card teaches a fair test', /fair test/.test(L.RESULTS.lights_on.instead));
ok('at least 3 result cards and at least 3 mistakes that teach in all', Object.keys(L.RESULTS).length >= 3 && Object.keys(L.HAZARDS).length + Object.keys(L.RESULTS).length >= 3);
ok('at least 10 facts for the 💡 button', L.FACTS.length >= 10);
ok('a PSAC paper reference is only quoted where the app' + "'" + 's own questions quote it (PSAC 2025 Q6c)',
   (JSON.stringify(L).match(/PSAC \d{4} Q\w+/g) || []).every(r => r === 'PSAC 2025 Q6c')
   && fs.readFileSync(path.join(ROOT, 'subjects', 'grade6-science', 'questions', 'ch05_g6_energy.js'), 'utf8').includes('PSAC 2025 Q6c'));

console.log('\nExperiments (lab_experiment.js, LAB_SPEC §10)');
const EX = L.EXPERIMENTS || [];
ok('EXPERIMENTS is exported: 3 to 5 for Grade 4, ids unique, every one on g4sci-materials',
   EX.length >= 3 && EX.length <= 5 && new Set(ids(EX)).size === EX.length && EX.every(e => same(e.grades, [4]) && e.chapter === 'g4sci-materials'), ids(EX));
const plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
// The visible label of the control a token belongs to (the bench's button text without its <small> line).
const labelOf = tok => {
  const i = tok.indexOf(':'), k = tok.slice(0, i), v = tok.slice(i + 1);
  if (k === 'station') return L.station(v).name;
  if (k === 'lights') return v === 'off' ? 'Lights off' : 'Lights on';
  if (k === 'power') return v === 'battery' ? 'Battery' : 'Wall socket';
  if (k === 'test') return L.obj(v).name;
  if (k === 'pick') return L.materialName(v.split(':')[1]);
  if (k === 'sort') return L.PROPS[v].name;
  if (k === 'job') return L.JOBS.find(j => j.id === v).title;
  return '';
};
const question = ref => {
  if (ref && typeof ref === 'object') return ref;
  const [m, i] = String(ref).split(':');
  const M = L.MISSIONS.find(x => x.id === m);
  return M ? M.quiz[Number(i)] : null;
};
// What a run amounts to, so a wrong option can be compared with the right one:
// the cards it drew, the last result it produced, and whether each pick was right.
const outcome = r => {
  const last = r.ev[r.ev.length - 1];
  return JSON.stringify({ cards: r.cards, last: last ? (last.value !== undefined ? last.value : last) : null, picks: r.st.picks.map(p => p.ok) });
};
const tokensOf = s => s.options || s.any || (s.on ? [s.on] : []);
const onPath = e => [...e.setup, ...e.steps.map(s => s.on || (s.any && s.any[0]))];
// What each See sentence claims, checked against the replayed model, not against a belief.
const TRUTH = {
  magnet_pull: (r, saw, e) => r.nail.magnet === true && r.pin.magnet === true && r.copper.magnet === false
    && /pulled the iron nail and the steel pin/i.test(saw) && /did not pull the copper wire/i.test(saw)
    && e.predict.answer === 'nail' && !L.obj('copper').magnetic,
  light: (r, saw, e, st) => r.glass.torch === 'transparent' && r.frosted.torch === 'translucent' && r.wood.torch === 'opaque' && st.lights === false
    && /glass tile: bright light/i.test(saw) && /frosted glass: a dim, blurry glow/i.test(saw) && /wooden block: a dark shadow/i.test(saw)
    && e.predict.answer === 'glass',
  bulb: (r, saw, e, st) => r.copper.circuit === true && r.lead.circuit === true && r.bottle.circuit === false && st.power === 'battery'
    && /copper wire and the pencil lead lit the bulb/i.test(saw) && /plastic bottle kept it dark/i.test(saw)
    && e.predict.answer === 'bottle' && !L.isMetal('lead'),
  pot: (r, saw, e, st) => st.picks.length === 2 && st.picks.every(p => p.ok) && st.picks[0].obj === 'foil' && st.picks[1].obj === 'wood'
    && L.obj('foil').heat === 'conductor' && L.obj('wood').heat === 'insulator' && L.obj('nail').heat === 'conductor'
    && /aluminium was right for the pot/i.test(saw) && /wood was right for the spoon/i.test(saw) && e.predict.answer === 'metal',
  origin: (r, saw, e) => r.towel.origin === 'natural' && r.bottle.origin === 'man-made' && r.cork.origin === 'natural' && /plant/.test(L.obj('towel').from)
    && /cotton[^.]*natural/i.test(saw) && /plastic[^.]*man-made/i.test(saw) && /cork[^.]*natural/i.test(saw) && e.predict.answer === 'plant',
};
for (const e of EX) {
  const t = e.id;
  ok(`${t}: a question a child can say back, and a short aim`, /\?$/.test(e.title.trim()) && e.title.length <= 60 && e.aim.length >= 20 && e.aim.length <= 200 && e.aim.split(/[.!?]\s/).length <= 3, { title: e.title, aim: e.aim });
  ok(`${t}: every setup and step token is one the bench accepts`, e.setup.every(tokenOk) && e.steps.every(s => tokensOf(s).length && tokensOf(s).every(tokenOk)), { setup: e.setup, steps: e.steps.map(tokensOf) });
  ok(`${t}: 1 to 5 steps, each a decision (ask + options, the answer among them) or an observation (on + say)`,
     e.steps.length >= 1 && e.steps.length <= 5 && e.steps.every(s => s.ask ? (Array.isArray(s.options) && s.options.length >= 2 && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on))) : !!(s.on && s.say)), e.steps);
  ok(`${t}: at least one step is a decision`, e.steps.some(s => s.ask));
  ok(`${t}: the prediction is 2-4 taps with the answer among them`, e.predict && e.predict.options.length >= 2 && e.predict.options.length <= 4 && e.predict.options.some(o => o.id === e.predict.answer));
  const longSay = e.steps.map(s => (s.say || s.ask).split(/\s+/).length).filter(n => n > 12);
  ok(`${t}: every instruction is 12 words or fewer (Grade 4)`, longSay.length === 0, longSay);
  const badLabel = e.steps.filter(s => s.say && !plain(s.say).includes(plain(labelOf(s.on))));
  ok(`${t}: every observation names its control ("Tap the Iron nail")`, badLabel.length === 0, badLabel.map(s => [s.say, labelOf(s.on)]));
  const path = onPath(e);
  const r0 = run(path);
  ok(`${t}: the right path draws no hazard or result card`, r0.cards.length === 0, r0.cards);
  const wrongBad = [];
  e.steps.forEach((s, i) => {
    if (!s.wrong) return;
    const before = [...e.setup, ...e.steps.slice(0, i).map(x => x.on || x.any[0])];
    const right = outcome(run([...before, s.on || s.any[0]]));
    for (const [w, text] of Object.entries(s.wrong)) {
      if (!tokensOf(s).includes(w) || w === s.on || (s.any || []).includes(w)) wrongBad.push(`${w}: not one of the step's other options`);
      else if (outcome(run([...before, w])) === right) wrongBad.push(`${w}: the bench gives the same result as ${s.on}`);
      const name = labelOf(w);
      if (typeof text !== 'string' || text.length < 20) wrongBad.push(`${w}: no explanation`);
      else if (w.startsWith('test:') || w.startsWith('pick:')) {
        const o = L.obj(w.split(':').pop());
        if (!plain(text).includes(plain(o.name)) && !plain(text).includes(plain(L.MATERIALS[o.material].name))) wrongBad.push(`${w}: the explanation does not name ${name}`);
      }
    }
  });
  ok(`${t}: every wrong option really is wrong on the bench (a different result, or a card), and explains itself by name`, wrongBad.length === 0, wrongBad);
  const st = r0.st, tested = new Set(), named = new Set();
  for (const o of L.OBJECTS) {
    if (st.results[o.id]) tested.add(o.id);
    if (st.picks.some(p => p.ok && p.obj === o.id)) tested.add(o.id);
    const s = plain(e.see.saw);
    if (s.includes(plain(o.name)) || s.includes(plain(L.MATERIALS[o.material].name))) named.add(o.id);
  }
  ok(`${t}: the See names exactly the things the child tested on the right path (${[...tested].join(', ')})`, same(tested, named), { tested: [...tested], named: [...named] });
  const truth = TRUTH[t];
  ok(`${t}: the See is TRUE for the data model (replayed: ${JSON.stringify(st.results)})`, !!truth && truth(st.results, e.see.saw, e, st), { saw: e.see.saw, results: st.results, picks: st.picks });
  ok(`${t}: see.learn is one or two sentences`, typeof e.see.learn === 'string' && e.see.learn.length > 20 && e.see.learn.split(/[.!?]\s/).length <= 3, e.see.learn);
  const qs = (e.check || []).map(question);
  ok(`${t}: 2 or 3 check questions, each resolving to a question with 4 distinct options and a reason`,
     qs.length >= 2 && qs.length <= 3 && qs.every(q => q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && q.why), e.check);
  ok(`${t}: an exam line, and no PSAC paper quoted (there is no Grade 4 paper)`, typeof e.exam === 'string' && e.exam.length > 20 && !/PSAC \d{4}/.test(e.exam), e.exam);
}
ok('the pot experiment picks at the bench, so the bench draws jobs and their choices', /data-pick=/.test(bench) && /case 'show'/.test(bench) && /function _drawJob/.test(bench));
ok('the bench exports the experiment adapter with every hook the runner needs',
   /const experiment = \{/.test(bench) && ['list:', 'question:', 'reset:', 'apply:', 'guide:', 'stop:', 'evidence:', 'focus:', 'selector:', 'hooks:'].every(k => bench.includes(k))
   && /experiment\.hooks\.token\(token, s\)/.test(bench) && /experiment\.hooks\.step\(_guide\.step\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /const _stepHit/.test(bench));
ok('a wrong choice the experiment lists is heard by the runner: the socket is never used, and a wrong test shows its end state at once',
   /_expWrong\('power:socket'\)/.test(bench) && /_expWrong\('test:' \+ objId\)/.test(bench) && /_expWrong\('test:' \+ sc\.obj\)/.test(bench));
ok('setup tokens are applied silently (no discovery toasts, no cards)', /_quiet = true/.test(bench) && /if \(!_quiet\) _checkDisc/.test(bench));

console.log('\nReading level (a 9-year-old: short sentences)');
const texts = [];
EX.forEach(e => { texts.push(e.title, e.aim, e.see.saw, e.see.learn, e.exam, e.predict.q); e.steps.forEach(s => { texts.push(s.say || s.ask); Object.values(s.wrong || {}).forEach(w => texts.push(w)); });
  e.check.forEach(c => { if (typeof c === 'object') texts.push(c.q, c.why); }); });
L.GUIDES.forEach(g => { texts.push(g.blurb, g.lesson); g.steps.forEach(s => texts.push(s.say)); });
L.DISCOVERIES.forEach(d => texts.push(d.hint, d.saw, d.learn));
L.JOBS.forEach(j => texts.push(j.ask, j.why));
L.MISSIONS.forEach(m => { texts.push(m.blurb, m.intro); m.quiz.forEach(q => texts.push(q.q, q.why)); });
L.STATIONS.forEach(s => texts.push(s.ask, s.how));
Object.values(L.HAZARDS).forEach(h => texts.push(h.why, h.instead, h.happened({ name: 'Glass tile' })));
Object.values(L.RESULTS).forEach(r => texts.push(r.instead, r.happened({ name: 'Aluminium foil', material: 'Aluminium' })));
L.FACTS.forEach(f => texts.push(f));
const long = [];
texts.forEach(t => String(t).split(/(?<=[.!?])\s+/).forEach(sn => { const n = sn.split(/\s+/).filter(w => /\w/.test(w)).length; if (n > 18) long.push(n + ': ' + sn); }));
ok(`no sentence over 18 words in ${texts.length} texts a child reads (the spec says about 15)`, long.length === 0, long.slice(0, 6));

console.log('\nThe bench and its stylesheet');
const shared = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'labs.css'), 'utf8');
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
const foreign = [...new Set(cssNoComments.match(/\.[a-z][\w-]*/g) || [])]
  .filter(c => !c.startsWith('.lab-materials') && !c.startsWith('.is-') && !shared.includes(c + ' ') && !shared.includes(c + '{') && !shared.includes(c + ',') && !shared.includes(c + '.') && !shared.includes(c + '['));
ok('every class the stylesheet defines starts .lab-materials (the rest are shared labs.css classes it adjusts)', foreign.length === 0, foreign);
ok('no regex lookbehind in the lab (a parse error on Safari < 16.4)', !/\(\?<[=!]/.test(src + bench));
ok('the bench draws all seven stations', L.STATIONS.every(s => new RegExp(`case '${s.id}':`).test(bench)));
ok('the bench never records a result through recordAnswer or _recordDaily', !/recordAnswer|_recordDaily/.test(bench));
ok('speech is cancelled on step change, overlays, unmount and screen change',
   /function _guideEnter\(\)[\s\S]{0,120}_hush\(\)/.test(bench) && /function _ov\(fn\) \{ _hush\(\)/.test(bench) && /function unmount\(\) \{\s*_hush\(\)/.test(bench) && /currentScreen !== 'labs'\) \{ _hush\(\)/.test(bench));
ok('speech is never started without a tap (speak() is only called from the 🔊 buttons)', (bench.match(/[^.\w]speak\(/g) || []).length === 3);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
