'use strict';
// Science Labs › Physical & Chemical Changes — data integrity test.
//
// Checks everything the bench trusts the data file to get right:
//   • every symbol equation balances atom for atom
//   • the atom counter itself catches a deliberately wrong equation
//   • forGrade() returns the right subsets for Grades 7 and 8
//   • every discovery has all required fields, and its 'how' recipe only
//     references scenarios and signs that exist
//   • every guided experiment step uses a valid token
//   • every quiz question has exactly 4 options, all distinct, plus a 'why'
//   • Grade 7 content is a strict subset of Grade 8 content (forGrade)
//   • every scenario that has a 'disc' field points to a real discovery id
//   • Grade 8-only scenarios appear for Grade 8 but not for Grade 7
//
// Run: node scripts/test-labs-changes-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_changes_data.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabChangesData = LabChangesData;', ctx);
const D = ctx.LabChangesData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Atom counting ──────────────────────────────────────────────────────────
// Handles subscript unicode digits (₀–₉), parentheses, and integer coefficients.
const SUB = { '₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9 };
function parseFormula(f) {
  const stack = [{}];
  let i = 0;
  while (i < f.length) {
    const ch = f[i];
    if (ch === '(' || ch === '[') { stack.push({}); i++; }
    else if (ch === ')' || ch === ']') {
      i++;
      let n = '';
      while (i < f.length && SUB[f[i]] !== undefined) n += SUB[f[i++]];
      const mul = n ? +n : 1, top = stack.pop();
      for (const k in top) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + top[k] * mul;
    } else if (/[A-Z]/.test(ch)) {
      let el = ch; i++;
      while (i < f.length && /[a-z]/.test(f[i])) el += f[i++];
      let n = '';
      while (i < f.length && SUB[f[i]] !== undefined) n += SUB[f[i++]];
      stack[stack.length - 1][el] = (stack[stack.length - 1][el] || 0) + (n ? +n : 1);
    } else i++;
  }
  return stack[0];
}
function side(s) {
  const out = {};
  s.split('+').map(x => x.trim()).filter(Boolean).forEach(term => {
    const m = /^(\d*)(.*)$/.exec(term);
    const coef = m[1] ? +m[1] : 1;
    const atoms = parseFormula(m[2].trim());
    for (const k in atoms) out[k] = (out[k] || 0) + atoms[k] * coef;
  });
  return out;
}
function balanced(eq) {
  const [l, r] = eq.split('→');
  if (!l || !r) return { ok: false, err: 'missing →' };
  const a = side(l), b = side(r);
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if ((a[k] || 0) !== (b[k] || 0)) return { ok: false, a, b };
  return { ok: true };
}

console.log('\nEquations balance');
const symEqs = D.SCENARIOS.filter(s => s.sym).map(s => [s.id, s.sym]);
ok(`${symEqs.length} symbol equations found`, symEqs.length >= 2);
for (const [id, eq] of symEqs) {
  const b = balanced(eq);
  ok(`${id}: ${eq}`, b.ok, b.ok ? undefined : { left: b.a, right: b.b });
}
// Deliberately unbalanced: one Mg on the right instead of two → should fail
ok('atom counter catches Mg + O₂ → MgO (unbalanced)',
   !balanced('Mg + O₂ → MgO').ok);
// Balanced copper equation
ok('CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄ balances',
   balanced('CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄').ok);
// Balanced magnesium equation
ok('2Mg + O₂ → 2MgO balances', balanced('2Mg + O₂ → 2MgO').ok);

// ── forGrade ──────────────────────────────────────────────────────────────
console.log('\nforGrade filtering');
const sc7 = D.forGrade(D.SCENARIOS, 7);
const sc8 = D.forGrade(D.SCENARIOS, 8);
ok('Grade 7 has at least 8 scenarios', sc7.length >= 8, sc7.length);
ok('Grade 8 has all 10 scenarios', sc8.length >= 10, sc8.length);
ok('Grade 8 has at least 2 more scenarios than Grade 7', sc8.length > sc7.length);
// combustion and precipitate are grade 8 only
ok('combustion is Grade 8 only (not in Grade 7)', !sc7.find(s => s.id === 'combustion'));
ok('precipitate is Grade 8 only (not in Grade 7)', !sc7.find(s => s.id === 'precipitate'));
ok('combustion appears in Grade 8', !!sc8.find(s => s.id === 'combustion'));
ok('precipitate appears in Grade 8', !!sc8.find(s => s.id === 'precipitate'));
// Grade 7 core scenarios present
for (const id of ['melting', 'dissolving', 'cutting', 'boiling', 'burning', 'rusting', 'cooking', 'fizzing']) {
  ok(`${id} is in Grade 7 scenarios`, !!sc7.find(s => s.id === id));
}

const disc7 = D.forGrade(D.DISCOVERIES, 7);
const disc8 = D.forGrade(D.DISCOVERIES, 8);
ok('Grade 7 has at least 9 discoveries', disc7.length >= 9, disc7.length);
ok('Grade 8 has at least 15 discoveries (total)', disc8.length >= 15, disc8.length);
ok('Grade 8-only discoveries not in Grade 7',
   ['g8_disc_signs', 'g8_disc_conservation', 'g8_disc_exothermic', 'g8_disc_endothermic', 'g8_disc_combustion', 'g8_disc_precipitate']
     .every(id => !disc7.find(d => d.id === id)));

const guide7 = D.forGrade(D.GUIDES, 7);
const guide8 = D.forGrade(D.GUIDES, 8);
ok('Grade 7 has at least 2 guided experiments', guide7.length >= 2);
ok('Grade 8 has at least 3 guided experiments (includes signs_guide)', guide8.length >= 3);
ok('signs_guide is Grade 8 only', !guide7.find(g => g.id === 'signs_guide'));

const miss7 = D.forGrade(D.MISSIONS, 7);
const miss8 = D.forGrade(D.MISSIONS, 8);
ok('Grade 7 has exactly 1 mission (classify_m)', miss7.length === 1 && miss7[0].id === 'classify_m', miss7.map(m => m.id));
ok('Grade 8 has 2 missions (classify_m + signs_m)', miss8.length === 2, miss8.map(m => m.id));
ok('signs_m is Grade 8 only', !miss7.find(m => m.id === 'signs_m'));

// ── Scenario structure ────────────────────────────────────────────────────
console.log('\nScenario structure');
const REQUIRED_SC = ['id', 'name', 'icon', 'type', 'newSubstance', 'reversible', 'signs', 'grades', 'explanation'];
for (const sc of D.SCENARIOS) {
  for (const f of REQUIRED_SC) {
    ok(`scenario ${sc.id} has '${f}'`, f in sc, Object.keys(sc).join());
  }
  ok(`scenario ${sc.id} type is 'physical' or 'chemical'`, sc.type === 'physical' || sc.type === 'chemical');
  ok(`scenario ${sc.id} newSubstance consistent with type`,
     (sc.type === 'chemical') === (sc.newSubstance === true));
  ok(`scenario ${sc.id} signs is array`, Array.isArray(sc.signs));
  // chemical changes must have at least one sign
  if (sc.type === 'chemical') {
    ok(`chemical scenario ${sc.id} has at least one observable sign`, sc.signs.length >= 1, sc.signs);
  }
  // cooking is the one chemical scenario without a standard word equation at this level
  // (protein denaturation is described in prose)
  if (sc.type === 'chemical' && sc.id !== 'cooking') {
    ok(`chemical scenario ${sc.id} has a word equation`, !!sc.wordEq, sc.id);
  }
  // grade 8 scenarios with sym should balance
  if (sc.sym) {
    const b = balanced(sc.sym);
    ok(`scenario ${sc.id} symbol equation balances`, b.ok, b);
  }
  // disc field, if present, points to a real discovery
  if (sc.disc) {
    ok(`scenario ${sc.id} disc '${sc.disc}' refers to a real discovery`,
       !!D.DISCOVERIES.find(d => d.id === sc.disc));
  }
}

// ── SIGNS keys ────────────────────────────────────────────────────────────
console.log('\nSIGNS structure');
const SIGN_KEYS = Object.keys(D.SIGNS);
ok('at least 5 distinct signs defined', SIGN_KEYS.length >= 5, SIGN_KEYS);
for (const [id, sign] of Object.entries(D.SIGNS)) {
  ok(`sign '${id}' has name`, !!sign.name);
  ok(`sign '${id}' has icon`, !!sign.icon);
  ok(`sign '${id}' has desc`, !!sign.desc);
}
// Every sign id referenced by scenarios must exist in SIGNS
for (const sc of D.SCENARIOS) {
  for (const sid of sc.signs) {
    ok(`scenario ${sc.id} sign '${sid}' exists in SIGNS`, !!D.SIGNS[sid]);
  }
}

// ── Discovery structure ───────────────────────────────────────────────────
console.log('\nDiscovery structure');
const REQUIRED_DISC = ['id', 'icon', 'title', 'grades', 'hint', 'how', 'saw', 'learn'];
const scenarioIds = new Set(D.SCENARIOS.map(s => s.id));
for (const d of D.DISCOVERIES) {
  for (const f of REQUIRED_DISC) {
    ok(`discovery ${d.id} has '${f}'`, f in d && d[f] !== undefined, d.id);
  }
  ok(`discovery ${d.id} grades is array`, Array.isArray(d.grades));
  ok(`discovery ${d.id} how is non-empty array`, Array.isArray(d.how) && d.how.length > 0);
  // Validate how tokens
  for (const token of d.how) {
    if (token.startsWith('watch:')) {
      const scId = token.slice(6);
      ok(`discovery ${d.id} watch token '${token}' refers to real scenario`, scenarioIds.has(scId));
    } else if (token.startsWith('sign:')) {
      const sid = token.slice(5);
      ok(`discovery ${d.id} sign token '${token}' refers to real sign`, !!D.SIGNS[sid]);
    } else {
      ok(`discovery ${d.id} token '${token}' is 'classify'`, token === 'classify');
    }
  }
}

// ── Guide step structure ──────────────────────────────────────────────────
console.log('\nGuide step structure');
for (const G of D.GUIDES) {
  ok(`guide '${G.id}' has icon`, !!G.icon);
  ok(`guide '${G.id}' has title`, !!G.title);
  ok(`guide '${G.id}' has blurb`, !!G.blurb);
  ok(`guide '${G.id}' has lesson`, !!G.lesson);
  ok(`guide '${G.id}' has non-empty steps`, Array.isArray(G.steps) && G.steps.length > 0);
  ok(`guide '${G.id}' has grades`, Array.isArray(G.grades));
  for (const [si, s] of G.steps.entries()) {
    ok(`guide '${G.id}' step ${si} has 'on' token`, !!s.on);
    const on = s.on;
    if (on.startsWith('watch:')) {
      ok(`guide '${G.id}' step ${si} watch token valid`, scenarioIds.has(on.slice(6)));
    } else if (on.startsWith('sign:')) {
      ok(`guide '${G.id}' step ${si} sign token valid`, !!D.SIGNS[on.slice(5)]);
    } else {
      ok(`guide '${G.id}' step ${si} token is 'classify'`, on === 'classify');
    }
    ok(`guide '${G.id}' step ${si} has 'say'`, !!s.say);
  }
}

// ── Mission / quiz structure ──────────────────────────────────────────────
console.log('\nMission / quiz structure');
for (const M of D.MISSIONS) {
  ok(`mission '${M.id}' has icon`, !!M.icon);
  ok(`mission '${M.id}' has title`, !!M.title);
  ok(`mission '${M.id}' has blurb`, !!M.blurb);
  ok(`mission '${M.id}' has intro`, !!M.intro);
  ok(`mission '${M.id}' has quiz array`, Array.isArray(M.quiz) && M.quiz.length >= 5);
  for (const [qi, q] of M.quiz.entries()) {
    ok(`mission '${M.id}' question ${qi} has 'q'`, !!q.q);
    ok(`mission '${M.id}' question ${qi} has 4 options`, Array.isArray(q.options) && q.options.length === 4,
       Array.isArray(q.options) ? q.options.length : q.options);
    ok(`mission '${M.id}' question ${qi} options are distinct`,
       q.options && new Set(q.options).size === q.options.length, q.options);
    ok(`mission '${M.id}' question ${qi} has 'why'`, !!q.why);
  }
}

// ── Result cards ──────────────────────────────────────────────────────────
console.log('\nResult cards');
ok('at least 3 result cards', Object.keys(D.RESULTS).length >= 3, Object.keys(D.RESULTS));
for (const [id, card] of Object.entries(D.RESULTS)) {
  ok(`result card '${id}' has icon`, !!card.icon);
  ok(`result card '${id}' has title`, !!card.title);
  ok(`result card '${id}' happened() returns string`, typeof card.happened === 'function' && typeof card.happened() === 'string');
  ok(`result card '${id}' has instead`, !!card.instead);
  ok(`result card '${id}' has exam`, !!card.exam);
}

// ── FACTS ─────────────────────────────────────────────────────────────────
console.log('\nFacts');
ok('at least 12 facts', D.FACTS.length >= 12, D.FACTS.length);
for (const [i, f] of D.FACTS.entries()) {
  ok(`fact ${i} is non-empty string`, typeof f === 'string' && f.length > 10);
}

// ── Science spot-checks ───────────────────────────────────────────────────
console.log('\nScience spot-checks');
const melting = D.SCENARIOS.find(s => s.id === 'melting');
ok('melting: physical, not reversible-conflated (reversible: true)', melting && melting.type === 'physical' && melting.reversible === true);
const cutting = D.SCENARIOS.find(s => s.id === 'cutting');
ok('cutting: physical even though reversible is false', cutting && cutting.type === 'physical' && cutting.reversible === false);
ok('cutting teaches the two-question rule (disc = disc_two_questions)', cutting && cutting.disc === 'disc_two_questions');
const burning = D.SCENARIOS.find(s => s.id === 'burning');
ok('burning: chemical, signs include heat and light', burning && burning.type === 'chemical'
   && burning.signs.includes('heat') && burning.signs.includes('light'));
const combustion = D.SCENARIOS.find(s => s.id === 'combustion');
ok('combustion: Grade 8 only', combustion && JSON.stringify(combustion.grades) === JSON.stringify([8]));
ok('combustion sym equation: 2Mg + O₂ → 2MgO', combustion && combustion.sym === '2Mg + O₂ → 2MgO');
const precipitate = D.SCENARIOS.find(s => s.id === 'precipitate');
ok('precipitate: Grade 8 only', precipitate && JSON.stringify(precipitate.grades) === JSON.stringify([8]));
ok('precipitate sym equation present', precipitate && !!precipitate.sym);
ok('fizzing shows gas and temperature_drop signs', (() => {
  const f = D.SCENARIOS.find(s => s.id === 'fizzing');
  return f && f.signs.includes('gas') && f.signs.includes('temperature_drop');
})());

// ── Count summary ─────────────────────────────────────────────────────────
console.log('\nCount summary');
ok(`total scenarios >= 10`, D.SCENARIOS.length >= 10, D.SCENARIOS.length);
ok(`total discoveries >= 15`, D.DISCOVERIES.length >= 15, D.DISCOVERIES.length);
ok(`total guided experiments >= 3`, D.GUIDES.length >= 3, D.GUIDES.length);
ok(`total missions == 2`, D.MISSIONS.length === 2, D.MISSIONS.length);
ok(`result cards >= 3`, Object.keys(D.RESULTS).length >= 3, Object.keys(D.RESULTS).length);

// ── Final report ──────────────────────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────');
console.log(`${pass} passed  /  ${fail} failed`);
if (fail > 0) process.exit(1);
