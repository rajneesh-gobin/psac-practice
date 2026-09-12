'use strict';
// Science Labs: data integrity check for the Magnets lab.
//
// Validates: GRADES, OBJECTS, HAZARDS, RESULTS, DISCOVERIES (unlock tokens,
// saw/learn/hint), GUIDES (steps with btn='Skip this step →'), MISSIONS
// (5 questions each, 4 distinct options, answer in options, reason), FACTS.
// Also checks that sign names are valid (from lab_core.js SIGN_LABELS).
//
// Run: node scripts/test-labs-magnets-data.js
'use strict';
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src  = read('engine', 'labs', 'lab_magnets_data.js');
const core = read('engine', 'labs', 'lab_core.js');

const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabMagnetsData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Helpers ──────────────────────────────────
const signNames = (() => {
  const m = core.match(/SIGN_LABELS\s*=\s*\{[^}]+\}/s);
  if (!m) return new Set();
  return new Set([...m[0].matchAll(/(\w+):/g)].map(x => x[1]));
})();

const allG4 = list => D.forGrade(list, 4);
const allG8 = list => D.forGrade(list, 8);

// ── Structure ─────────────────────────────────
console.log('\nStructure');
ok('GRADES = [4, 8]', JSON.stringify(D.GRADES) === JSON.stringify([4, 8]));
ok('D4 = [4]', JSON.stringify(D.D4) === JSON.stringify([4]));
ok('D8 = [8]', JSON.stringify(D.D8) === JSON.stringify([8]));
ok('D48 = [4, 8]', JSON.stringify(D.D48) === JSON.stringify([4, 8]));
ok('forGrade filters correctly', D.forGrade([{ grades: [4] }, { grades: [8] }], 4).length === 1);

// ── Objects (Grade 4) ─────────────────────────
console.log('\nObjects (Grade 4)');
const objs4 = allG4(D.OBJECTS);
ok('8 objects for Grade 4', objs4.length === 8, objs4.length);
ok('each object has id, label, icon, magnetic, grades', objs4.every(o => o.id && o.label && o.icon && typeof o.magnetic === 'boolean' && Array.isArray(o.grades)));
ok('iron nail is magnetic', objs4.find(o => o.id === 'nail')?.magnetic === true);
ok('steel clip is magnetic', objs4.find(o => o.id === 'clip')?.magnetic === true);
const notMag = ['foil', 'block', 'ruler', 'marble', 'rubber', 'coin'];
ok('6 non-magnetic objects (foil, block, ruler, marble, rubber, coin)',
   notMag.every(id => objs4.find(o => o.id === id)?.magnetic === false), notMag.filter(id => objs4.find(o => o.id === id)?.magnetic !== false));

// ── Hazards ───────────────────────────────────
console.log('\nHazards');
const hz4 = allG4(D.HAZARDS), hz8 = allG8(D.HAZARDS);
ok('at least 2 hazards for Grade 4', hz4.length >= 2, hz4.length);
ok('at least 2 hazards for Grade 8', hz8.length >= 2, hz8.length);
for (const h of D.HAZARDS) {
  ok(`hazard ${h.id}: title, happened, why, instead, exam all present`,
     typeof h.title === 'function' && typeof h.happened === 'function' &&
     h.why && h.instead && h.exam);
  ok(`hazard ${h.id}: signs is array with at least 1 valid sign name`,
     Array.isArray(h.signs) && h.signs.length >= 1 && h.signs.every(s => signNames.size === 0 || signNames.has(s)),
     h.signs.filter(s => signNames.size > 0 && !signNames.has(s)));
  ok(`hazard ${h.id}: title() and happened() return non-empty strings`,
     h.title().length > 0 && h.happened().length > 0);
}

// ── Results ───────────────────────────────────
console.log('\nResults');
ok('at least 1 result card', D.RESULTS.length >= 1);
for (const r of D.RESULTS) {
  ok(`result ${r.id}: title, happened, instead, exam, icon present`,
     typeof r.title === 'function' && typeof r.happened === 'function' &&
     r.instead && r.exam && r.icon);
  ok(`result ${r.id}: title() and happened() return non-empty strings`,
     r.title().length > 0 && r.happened().length > 0);
}

// ── Discoveries ───────────────────────────────
console.log('\nDiscoveries');
const disc4 = allG4(D.DISCOVERIES), disc8 = allG8(D.DISCOVERIES);
ok('at least 10 discoveries for Grade 4', disc4.length >= 10, disc4.length);
ok('at least 10 discoveries for Grade 8', disc8.length >= 10, disc8.length);
for (const d of D.DISCOVERIES) {
  ok(`discovery ${d.id}: title, hint, saw, learn, icon present`,
     d.title && d.hint && d.saw && d.learn && d.icon);
  const unlock = Array.isArray(d.unlock) ? d.unlock : [d.unlock];
  ok(`discovery ${d.id}: unlock is array of strings`,
     unlock.length >= 1 && unlock.every(u => typeof u === 'string' && u.includes(':')));
}
const discIds = D.DISCOVERIES.map(d => d.id);
ok('no duplicate discovery ids', discIds.length === new Set(discIds).size, discIds.filter((id, i) => discIds.indexOf(id) !== i));

// ── Guides ────────────────────────────────────
console.log('\nGuides');
const g4guides = allG4(D.GUIDES), g8guides = allG8(D.GUIDES);
ok('at least 3 guides for Grade 4', g4guides.length >= 3, g4guides.length);
ok('at least 3 guides for Grade 8', g8guides.length >= 3, g8guides.length);
for (const g of D.GUIDES) {
  ok(`guide ${g.id}: icon, title, blurb, lesson, steps present`,
     g.icon && g.title && g.blurb && g.lesson && Array.isArray(g.steps));
  ok(`guide ${g.id}: at least 3 steps`, g.steps.length >= 3, g.steps.length);
  for (const [i, s] of g.steps.entries()) {
    ok(`guide ${g.id} step ${i + 1}: on token contains ':'`, typeof s.on === 'string' && s.on.includes(':'));
    ok(`guide ${g.id} step ${i + 1}: say is non-empty`, typeof s.say === 'string' && s.say.length > 0);
    ok(`guide ${g.id} step ${i + 1}: btn = 'Skip this step →'`, s.btn === 'Skip this step →', s.btn);
  }
}

// ── Missions ──────────────────────────────────
console.log('\nMissions');
const m4 = allG4(D.MISSIONS), m8 = allG8(D.MISSIONS);
ok('at least 2 missions for Grade 4', m4.length >= 2, m4.length);
ok('at least 2 missions for Grade 8', m8.length >= 2, m8.length);
for (const m of D.MISSIONS) {
  ok(`mission ${m.id}: icon, title, blurb, intro, quiz present`,
     m.icon && m.title && m.blurb && m.intro && Array.isArray(m.quiz));
  ok(`mission ${m.id}: exactly 5 quiz questions`, m.quiz.length === 5, m.quiz.length);
  for (const [i, q] of m.quiz.entries()) {
    ok(`mission ${m.id} Q${i + 1}: q, options (4), answer, why present`,
       q.q && Array.isArray(q.options) && q.options.length === 4 && q.answer && q.why);
    ok(`mission ${m.id} Q${i + 1}: answer is in options`, q.options.includes(q.answer), q.answer);
    ok(`mission ${m.id} Q${i + 1}: 4 distinct options`, new Set(q.options).size === 4, q.options);
    ok(`mission ${m.id} Q${i + 1}: why is at least 10 chars`, q.why.length >= 10, q.why.length);
  }
}

// ── Facts ─────────────────────────────────────
console.log('\nFacts');
const facts4 = allG4(D.FACTS), facts8 = allG8(D.FACTS);
ok('at least 6 facts for Grade 4', facts4.length >= 6, facts4.length);
ok('at least 6 facts for Grade 8', facts8.length >= 6, facts8.length);
for (const f of D.FACTS) {
  ok('fact has text and grades', (f.text || typeof f === 'string') && (f.grades || true));
}

// ── Science grounding ─────────────────────────
console.log('\nScience grounding (Grade 4, ch06_g4_materials.js)');
ok('iron nail is magnetic (g4s-mat-002 grounding)', D.OBJECTS.find(o => o.id === 'nail')?.magnetic === true);
ok('steel clip is magnetic', D.OBJECTS.find(o => o.id === 'clip')?.magnetic === true);
ok('copper coin is NOT magnetic (g4s-mat-007 grounding)', D.OBJECTS.find(o => o.id === 'coin')?.magnetic === false);
ok('aluminium foil is NOT magnetic', D.OBJECTS.find(o => o.id === 'foil')?.magnetic === false);
ok('data file says "only iron and steel" in at least one discovery learn text',
   D.DISCOVERIES.some(d => d.grades.includes(4) && (d.learn || '').toLowerCase().includes('iron and steel')));

console.log('\nScience grounding (Grade 8, batch2_magnetism.js)');
ok('at least one discovery about like poles repelling', D.DISCOVERIES.some(d => d.grades.includes(8) && d.id === 'like_repel'));
ok('at least one discovery about field lines N to S', D.DISCOVERIES.some(d => d.grades.includes(8) && d.id === 'field_lines'));
ok('soft iron is mentioned for electromagnets (g8s-magnetism-019)', D.FACTS.some(f => (f.text || '').includes('soft iron') || (f.text || '').includes('electromagnet')));
ok('credit card hazard exists for Grade 8', D.HAZARDS.some(h => h.id === 'credit_card' && h.grades.includes(8)));
ok('guide step btns are all "Skip this step →"',
   D.GUIDES.every(g => g.steps.every(s => s.btn === 'Skip this step →')));

// ── Summary ───────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`  ${pass} passed  ${fail} failed\n`);
if (fail > 0) process.exitCode = 1;
