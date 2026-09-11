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
for (const [name, list] of [['objects', L.OBJECTS], ['guided experiments', L.GUIDES], ['missions', L.MISSIONS], ['discoveries', L.DISCOVERIES], ['jobs', L.JOBS]]) {
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
  const [k, v] = on.split(':');
  if (k === 'station') return !!L.station(v);
  if (k === 'lights') return v === 'on' || v === 'off';
  if (k === 'test') return !!L.obj(v);
  if (k === 'sort') return !!L.PROPS[v] && L.STATIONS.some(s => s.prop === v);
  if (k === 'job') return L.JOBS.some(j => j.id === v);
  return false;
};
const badDisc = L.DISCOVERIES.filter(d => !d.title || !d.icon || !d.hint || !d.saw || !d.rule || !d.learn || !d.unlock || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery has a clue, what you saw, the rule, why it matters and a valid “how to find it” recipe', badDisc.length === 0, ids(badDisc));

// A model of the bench: follow a recipe and report what unlocks - and any card
// that would interrupt it.
function run(steps) {
  const st = { station: 'magnet', lights: true, results: {} }, ev = [], cards = [];
  for (const on of steps) {
    const [k, v] = on.split(':');
    if (k === 'station') st.station = v;
    else if (k === 'lights') st.lights = v === 'on';
    else if (k === 'test') {
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
  return { ev, cards };
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
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
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

console.log('\nReading level (a 9-year-old: short sentences)');
const texts = [];
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
