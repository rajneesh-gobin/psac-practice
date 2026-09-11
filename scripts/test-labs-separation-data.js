'use strict';
// Science Labs: the chemistry the Separation Station is allowed to show.
//
// The bench draws whatever engine/labs/lab_separation_data.js says, so a mistake
// in that file is a mistake taught to a child. This checks what can be checked
// mechanically: the boiling and subliming points, the steam volume, the
// solubility maths behind crystallisation, which technique separates which
// mixture and why, that the correct distillation rig passes and every faulty
// rig maps to its own specific error, that every discovery recipe is written in
// real guide steps, and that every quiz, hazard and result card is complete.
//
// Run: node scripts/test-labs-separation-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src = read('engine', 'labs', 'lab_separation_data.js');
const bench = read('engine', 'labs', 'lab_separation.js');
const core = read('engine', 'labs', 'lab_core.js');
const manifest = read('subjects', 'grade9-chemistry', '_manifest.js');
const blueprint = read('docs', 'nce-grade9', 'blueprint-science.md');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabSeparationData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b, tol) => Math.abs(a - b) <= tol;

console.log('\nGrounded in the syllabus');
['distillation', 'crystallization', 'sublimation', 'apparatus_diagrams', 'choosing_a_technique'].forEach(id =>
  ok(`grade9-chemistry C2 declares the subsection "${id}"`, manifest.includes(`id: '${id}'`)));
const g9 = Object.keys(D.TECHNIQUES).filter(t => D.TECHNIQUES[t].grade === 9).sort();
ok('the Grade 9 techniques are exactly the three C2 names: crystallisation, sublimation, distillation',
   g9.join() === 'crystallisation,distillation,sublimation', g9);
ok('filtration is offered only as the Grade 8 technique it is', D.TECHNIQUES.filtration.grade === 8);

console.log('\nBoiling points, subliming and steam');
ok('water boils at 100 °C', D.POINTS.water.boils === 100);
ok('salt boils far above water (1413 °C), so it stays in the flask', D.POINTS.salt.boils === 1413 && D.POINTS.salt.boils > D.POINTS.water.boils);
ok('iodine and ammonium chloride sublime; sand and salt do not',
   D.POINTS.iodine.sublimes && D.POINTS.nh4cl.sublimes && !D.POINTS.sand.sublimes && !D.POINTS.salt.sublimes);
ok('iodine melts at 113.7 °C and boils at 184.3 °C (why the bench says "heat gently")', D.POINTS.iodine.melts === 113.7 && D.POINTS.iodine.boils === 184.3);
const steam = (1 / 18.015) * 0.082057 * 373.15 * 1000;
ok(`1 cm³ of water makes about ${D.STEAM_PER_CM3} cm³ of steam (ideal gas at 100 °C: ${steam.toFixed(0)})`, near(D.STEAM_PER_CM3, steam, steam * 0.02));
const sea = D.FLASKS.sea;
ok('the sea water is real sea water: 35 g of salt per litre', near(sea.grams / sea.vol * 1000, 35, 0.01));
const dTb = 0.512 * ((sea.grams / 58.44) / (sea.vol / 1000)) * 2;
ok(`sea water boils about ${sea.elev} °C above pure water (Kb·m·i = ${dTb.toFixed(2)} °C)`, near(sea.elev, dTb, 0.1));
ok('liquidBoils: sea water 100.6 °C, inky water 100 °C', D.liquidBoils('sea', 100) === 100.6 && D.liquidBoils('ink', 100) === 100);
ok('the salty liquid boils hotter as it is boiled down', D.liquidBoils('sea', 50) > D.liquidBoils('sea', 100));
ok('…but the thermometer at the side arm reads the VAPOUR: the bench uses the boiling point of water there',
   /toward\(D\.read, SD\.POINTS\.water\.boils/.test(bench));

console.log('\nThe distillation rig');
const P = D.DISTIL;
ok('the correct rig passes with no errors and nothing missing', D.checkRig(D.RIGS.correct.parts).ok && D.checkRig(D.RIGS.ink.parts).ok);
ok('an empty bench is missing all six parts', D.checkRig({}).missing.length === 6 && D.PART_ORDER.length === 6);
const expect = { water_top: ['water_top'], thermo_liquid: ['thermo_liquid'], sealed: ['sealed'], no_granules: ['bumping'], two_errors: ['water_top', 'thermo_liquid'] };
for (const [rig, errs] of Object.entries(expect)) {
  const got = D.checkRig(D.RIGS[rig].parts);
  ok(`faulty rig "${rig}" maps to exactly its own error: ${errs.join(' + ')}`, got.errors.join() === errs.join() && !got.missing.length, got);
}
// Every combination of choices: the errors are exactly the wrong choices made.
const opts = D.PART_ORDER.map(k => Object.keys(D.PARTS[k].options));
let combos = 0, badCombo = [];
(function walk(i, parts) {
  if (i === D.PART_ORDER.length) {
    combos++;
    const want = D.PART_ORDER.map(k => D.PARTS[k].wrong && D.PARTS[k].wrong[parts[k]]).filter(Boolean).sort();
    const got = D.checkRig(parts);
    if (got.errors.slice().sort().join() !== want.join() || got.ok !== !want.length) badCombo.push({ parts, got: got.errors });
    return;
  }
  for (const o of opts[i]) walk(i + 1, Object.assign({}, parts, { [D.PART_ORDER[i]]: o }));
})(0, {});
ok(`all ${combos} ways of building the rig report exactly the mistakes made`, combos === 32 && !badCombo.length, badCombo.slice(0, 3));
ok('every wrong choice is a hazard or a result card the bench can show',
   D.PART_ORDER.every(k => !D.PARTS[k].wrong || Object.values(D.PARTS[k].wrong).every(w => D.RESULTS[w] || Object.values(D.HAZARDS).some(h => h.card === w))));
ok('the dangerous errors are hazards and come first; the wrong-but-safe ones are result cards',
   D.ERROR_ORDER.slice(0, 2).every(e => Object.values(D.HAZARDS).some(h => h.card === e)) && D.ERROR_ORDER.slice(2).every(e => D.RESULTS[e]));
ok('a sealed rig is a GAS UNDER PRESSURE hazard; no granules is a HOT hazard',
   D.HAZARDS.sealed.signs.includes('pressure') && D.HAZARDS.bumping.signs.includes('hot'));
ok('water in at the top leaves the jacket mostly empty, and it then condenses little', P.topFill < 0.5 && P.condenseTop < 0.5 && P.condenseFull === 1);
ok('a full run (25 cm³) fits before the flask is boiled down to its minimum', FLASK_OK());
function FLASK_OK() { return sea.vol - P.minLeft >= P.target + P.vapourDelay * P.evap; }
ok('a sealed rig gives way long before a run could finish', P.burstAt < P.target);
ok('the result cards for a faulty rig come before a run could reach 25 cm³',
   Math.max(P.cardWaterTop, P.cardThermo) * P.evap < P.target);

console.log('\nCrystallisation');
const S = D.SOLUBILITY;
ok('copper(II) sulfate solubility rises with temperature', S.every((r, i) => i === 0 || (r[0] > S[i - 1][0] && r[1] > S[i - 1][1])));
ok('solubility: 20.7 g at 20 °C, 75.4 g at 100 °C per 100 g of water', D.solubility(20) === 20.7 && D.solubility(100) === 75.4);
ok('interpolated: about 22.65 g at 25 °C', near(D.solubility(25), 22.65, 1e-9));
const K = D.CRYSTAL, cp = D.crystalPoint(), crust = D.crustPoint();
ok(`the starting solution (${K.grams} g in ${K.water} cm³) is NOT saturated at room temperature`, K.grams * 100 / K.water < D.solubility(D.ROOM));
ok(`crystallisation point ≈ 39.7 cm³ of water left (9 g ÷ 22.65 g/100 g); crust point ≈ 11.9 cm³`, near(cp, 39.74, 0.05) && near(crust, 11.94, 0.05));
ok('the crystallisation point comes after the start and before the crust', K.water > cp && cp > crust && crust > K.dry);
ok('a solution at the crystallisation point is saturated at exactly room temperature', near(D.saturatedAt(K.grams, cp), D.ROOM, 1e-6));
ok('saturatedAt and solubility are inverses', [30, 45, 70].every(w => near(D.solubility(D.saturatedAt(K.grams, w * 0.4)), K.grams * 100 / (w * 0.4), 1e-6)));
ok('stopped too soon: nothing crystallises at room temperature', D.crystalsAt(K.grams, 50, D.ROOM) === 0 && D.crystalsAt(K.grams, K.water, D.ROOM) === 0);
ok('past the crystallisation point, crystals come out as it cools', D.crystalsAt(K.grams, cp - 5, D.ROOM) > 0 && D.crystalsAt(K.grams, cp - 5, 90) === 0);
ok('slow cooling is slower than fast cooling', K.coolSlow < K.coolFast);

console.log('\nSublimation');
ok('the correct sublimation set-up passes for both mixtures',
   ['iodine', 'nh4cl'].every(m => D.checkSublime({ mixture: m, place: 'hood', cover: 'funnel_plug' }).ok));
ok('open bench → fumes hazard; no funnel → nothing collected; funnel with no plug → escapes up the stem',
   D.checkSublime({ mixture: 'iodine', place: 'bench', cover: 'funnel_plug' }).errors.join() === 'fumes'
   && D.checkSublime({ mixture: 'iodine', place: 'hood', cover: 'none' }).errors.join() === 'no_funnel'
   && D.checkSublime({ mixture: 'iodine', place: 'hood', cover: 'funnel' }).errors.join() === 'no_plug');
ok('a funnel with a plug catches all the vapour, without a plug some, with nothing none', D.CATCH.funnel_plug === 1 && D.CATCH.funnel > 0 && D.CATCH.funnel < 1 && D.CATCH.none === 0);
ok('fumes on the open bench are a HARMFUL (irritant) hazard', D.HAZARDS.fumes.signs.includes('irritant'));
ok('both sublimation mixtures pair a subliming solid with one that does not',
   D.POINTS[Object.keys(D.SUBLIME_MIXES)[0]].sublimes && D.POINTS.nh4cl.sublimes && D.SUBLIME_MIXES.iodine.other === 'sand' && D.SUBLIME_MIXES.nh4cl.other === 'salt');

console.log('\nWhich technique separates which mixture, and why');
const techs = Object.keys(D.TECHNIQUES);
ok('every technique has its own principle', techs.every(t => D.PRINCIPLES[D.TECH_PRINCIPLE[t]]) && new Set(techs.map(t => D.TECH_PRINCIPLE[t])).size === techs.length);
const expected = { sea_water: 'distillation', ink: 'distillation', cuso4: 'crystallisation', iodine_sand: 'sublimation', nh4cl_salt: 'sublimation', sand_water: 'filtration' };
for (const m of D.MIXTURES) {
  ok(`${m.name} → ${expected[m.id]} (${D.TECH_PRINCIPLE[m.tech]})`, m.tech === expected[m.id]);
  const others = techs.filter(t => t !== m.tech).sort();
  ok(`${m.name}: every wrong technique says what would really happen`, Object.keys(m.wrong).sort().join() === others.join() && others.every(t => m.wrong[t].length > 20));
}
ok('the paper pair: water from sea water by distillation, iodine from sand by sublimation (Chemistry 2024 Q2(a))',
   D.MIXTURES.find(m => m.id === 'sea_water').tech === 'distillation' && D.MIXTURES.find(m => m.id === 'iodine_sand').tech === 'sublimation');

console.log('\nDiscoveries');
const ids = D.DISCOVERIES.map(d => d.id);
ok(`at least 12 discoveries (${ids.length})`, ids.length >= 12);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const MODES = ['distil', 'crystal', 'sublime', 'choose'];
const tokenOk = on => {
  const [k, a, b] = on.split(':');
  switch (k) {
    case 'goggles': case 'heat': case 'heat-off': case 'rod': case 'drop': case 'reset': return a === undefined;
    case 'mode': return MODES.includes(a);
    case 'part': return !!((D.PARTS[a] && D.PARTS[a].options[b]) || (D.SUB_PARTS[a] && D.SUB_PARTS[a].options[b]));
    case 'build': return !!D.RIGS[a];
    case 'cool': return a === 'slow' || a === 'fast';
    case 'choose': return !!D.MIXTURES.find(m => m.id === a);
    case 'wait': return ['boil', '100', 'distillate', 'crystals', 'sublimate'].includes(a);
    case 'card': return !!(D.RESULTS[a] || Object.values(D.HAZARDS).some(h => h.card === a));
  }
  return false;
};
const modeOf = on => { const [k, a] = on.split(':'); return k === 'part' ? (D.PARTS[a] ? 'distil' : 'sublime') : k === 'build' || k === 'drop' ? 'distil' : k === 'rod' || k === 'cool' ? 'crystal' : k === 'choose' ? 'choose' : null; };
const badDisc = D.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length
  || !d.how.every(tokenOk) || !d.how[0].startsWith('mode:') || d.how.some(on => modeOf(on) && modeOf(on) !== d.how[0].split(':')[1]));
ok('every discovery has a title, a clue, what you saw, why it happens, and a valid recipe that starts on the right bench', badDisc.length === 0, badDisc.map(d => d.id));
ok('a recipe that heats puts goggles on first', D.DISCOVERIES.every(d => !d.how.includes('heat') || d.how.indexOf('goggles') > -1 && d.how.indexOf('goggles') < d.how.indexOf('heat')));
ok('a recipe that waits for a card ends there, and that card unlocks that discovery',
   D.DISCOVERIES.filter(d => d.how.some(s => s.startsWith('card:'))).every(d => { const c = d.how[d.how.length - 1]; return c.startsWith('card:') && D.CARD_DISC[c.slice(5)] === d.id; }));
ok('every faulty rig has a discovery that builds it and waits for its own card',
   ['water_top', 'thermo_liquid', 'sealed', 'no_granules'].every(r => {
     const err = D.checkRig(D.RIGS[r].parts).errors[0], card = D.RESULTS[err] ? err : Object.values(D.HAZARDS).find(h => h.card === err).card;
     return D.DISCOVERIES.some(d => d.how.includes('build:' + r) && d.how.includes('card:' + card));
   }));
ok('every card id maps to a real discovery, and every card is used by a recipe',
   Object.entries(D.CARD_DISC).every(([c, id]) => ids.includes(id) && D.DISCOVERIES.find(d => d.id === id).how.includes('card:' + c)));
const unreachable = ids.filter(id => !Object.values(D.CARD_DISC).includes(id) && !bench.includes(`'${id}'`));
ok('every discovery can be found (named by a card or by the bench)', unreachable.length === 0, unreachable);

console.log('\nGuided experiments');
ok(`at least 3 guided experiments (${D.GUIDES.length})`, D.GUIDES.length >= 3);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || (/^(wait|card):/.test(s.on) ? !!s.btn : !s.btn));
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is “watch”`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
  ok(`${G.title}: goggles before any heating`, !G.steps.some(s => s.on === 'heat') || G.steps.findIndex(s => s.on === 'goggles') < G.steps.findIndex(s => s.on === 'heat'));
}
const rig = D.GUIDES.find(g => g.id === 'rig');
const rigParts = {};
rig.steps.filter(s => s.on.startsWith('part:')).forEach(s => { const [, k, v] = s.on.split(':'); rigParts[k] = v; });
ok('the "Build a distillation rig" guide builds a rig that passes the check', D.checkRig(rigParts).ok, rigParts);
const iodineGuide = D.GUIDES.find(g => g.id === 'iodine'), subParts = {};
iodineGuide.steps.filter(s => s.on.startsWith('part:')).forEach(s => { const [, k, v] = s.on.split(':'); subParts[k] = v; });
ok('the iodine guide works in the fume cupboard under a plugged funnel', D.checkSublime(subParts).ok, subParts);

console.log('\nMissions, hazards and result cards');
ok(`at least 2 missions (${D.MISSIONS.length})`, D.MISSIONS.length >= 2);
for (const M of D.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, bad.length === 0 && M.quiz.length >= 4, bad.map(q => q.q));
  ok(`${M.title}: runs on a real bench and says what to do`, MODES.includes(M.mode) && !!(M.intro && M.blurb && M.icon));
}
const allQ = D.MISSIONS.flatMap(M => M.quiz.map(q => q.q + ' ' + q.options[0]));
ok('the paper shapes are asked: label from a word bank, where water enters the condenser, two errors in a rig, a sublimation precaution',
   allQ.some(q => /Word bank/i.test(q)) && allQ.some(q => /ENTER the condenser/.test(q)) && allQ.some(q => /two errors/.test(q)) && allQ.some(q => /cotton wool plug/.test(q)));
const kinds = new Set([...core.match(/const SIGN_LABELS = \{([\s\S]*?)\};/)[1].matchAll(/(\w+):/g)].map(m => m[1]));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  const c = { what: 'the sea water', solid: 'iodine', fumes: 'Violet iodine vapour spread.' };
  ok(`hazard ${id}: real signs, and what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => kinds.has(s)) && H.title(c) && H.happened(c) && H.why && H.instead && H.exam && /Chemistry 20\d\d Q/.test(H.exam));
}
for (const [id, R] of Object.entries(D.RESULTS)) {
  const c = { reading: '100.7', elev: true, water: 50, vapour: 'violet iodine vapour', solid: 'iodine', why: 'x', right: 'distillation' };
  const v = x => (typeof x === 'function' ? x(c) : x);
  ok(`result card ${id}: what happened, what to do instead and the exam point`, !!(R.icon && v(R.title) && v(R.happened) && v(R.instead) && R.exam));
}
const mistakes = Object.keys(D.CARD_DISC).length;
ok(`at least 3 mistakes that teach (${mistakes}: ${Object.keys(D.HAZARDS).length} hazards incl. goggles, ${Object.keys(D.RESULTS).length} result cards)`, mistakes >= 3);
const refs = [...new Set([...src.matchAll(/(20\d\d) Q(\d)\(/g)].map(m => `Chemistry ${m[1]} Q${m[2]}`))];
const unknown = refs.filter(r => !blueprint.includes(r));
ok(`every paper reference (${refs.length}) is a real Chemistry question in blueprint-science.md`, refs.length >= 5 && unknown.length === 0, unknown);
ok(`at least 10 true facts for the 💡 button (${D.FACTS.length})`, D.FACTS.length >= 10 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
