'use strict';
// Integrity checks on every inline <svg> figure in the Grade 9 banks.
//
// ⚠ THIS USED TO SCAN grade9-maths ONLY, and that is how a whole pack of new
//   figures escaped it: the Grade 9 SCIENCE bank is ~20% inline SVG (circuit
//   diagrams, ray diagrams, speed-time graphs, instrument scales) and this
//   tripwire had never looked at a single one of them. PACKS is a list now, so
//   a new pack is added by naming it rather than by remembering to.
//
//   node scripts/test-svg-figures.js
//
// ⚠ THIS IS A TRIPWIRE, NOT VISUAL QA. It cannot tell you a diagram is
//   readable, that a label sits in the right angle, or that a figure shows the
//   shape the question describes - three defects that all shipped and were
//   found only by printing the figures and looking at them
//   (scripts/nce-print-preview.js on a sheet of the distinct figures).
//   What it does catch is the one class that is mechanically decidable and
//   completely invisible otherwise: an HTML breakout tag inside an svg.
//
// ⚠ THE BREAKOUT CHECK IS THE POINT OF THIS FILE.
//   <i>, <b>, <em>, <span>, <p> and friends are on the HTML parser's
//   "exit foreign content" list. Written inside an <svg> - which is exactly
//   what you do when you reuse a question's own HTML as a diagram label - the
//   parser CLOSES THE SVG at that tag and reparses everything after it as
//   sibling HTML. The figure loses everything past that point and the tail
//   prints loose on the page. Nothing throws. The question loads, marks and
//   passes every other test. Ten figures shipped like this: nine in
//   ch19_geometry_revision.js and the NCE 2025 Q24 rectangle in
//   ch09_expressions.js. Inside an svg, italic is
//   <tspan font-style="italic">.
//
// The out-of-viewBox check is deliberately CONSERVATIVE and advisory. It
// estimates text width from the character count, which no font honours
// exactly, and it cannot follow a transform - so rotated axis titles are
// skipped rather than guessed at. It fails the run only on a clip wide enough
// to remove a whole character, because that is the case that changes what the
// figure SAYS: a height label reading "0 cm" where the answer needs 10.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
// ⚠ Add a pack here the moment it starts carrying inline SVG. A pack that is
//   not in this list is not checked, and nothing anywhere else will notice.
const PACKS = [
  'subjects/grade9-maths/questions',
  // ⚠ grade9-science WAS SPLIT into three packs on 2026-09-08 and this list
  //   still named the old directory. existsSync() skips a missing one SILENTLY,
  //   so the run went 991 questions / 159 figures -> 712 / 125 and reported
  //   PASS: 34 science figures stopped being checked and nothing said so.
  //   That is the same failure this file's header warns about.
  // ⚠ grade9-ict was LIVE with 469 questions and had never been checked by
  //   this harness at all; the three placeholder packs are listed too so the
  //   gap cannot re-form on the day they ship content.
  'subjects/grade9-english/questions',
  'subjects/grade9-french/questions',
  'subjects/grade9-ict/questions',
  'subjects/grade9-social-modern-studies/questions',
  'subjects/grade9-biology/questions',
  'subjects/grade9-chemistry/questions',
  'subjects/grade9-physics/questions',
  // ⚠ Les trois « Description d'Images » : la séquence de trois images est
  //   dessinée en svg inline, et personne ne la vérifiait. Elles passent
  //   proprement. ⚠ D'AUTRES PACKS PORTENT AUSSI DU SVG INLINE et ne sont
  //   toujours pas listés ici - grade{1,2,4,5,6}-maths, grade{4,5,6}-science,
  //   grade{4,5,6}-history : mesuré, les ajouter aujourd'hui lève 151 alertes
  //   de largeur estimée sur du contenu qui n'a pas changé, donc c'est un
  //   chantier à part, pas un oubli.
  'subjects/grade4-french/questions',
  'subjects/grade5-french/questions',
  'subjects/grade6-french/questions',
];

const ctx = { STATIC_QUESTIONS: [], console, Math, JSON, window: {} };
ctx.window.STATIC_QUESTIONS = ctx.STATIC_QUESTIONS;
vm.createContext(ctx);
for (const f of ['engine/helpers.js', 'engine/assessment.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
}
// ⚠⚠ A NAMED PACK THAT IS GONE IS AN ERROR, NOT A SKIP, and a grade-9 pack
//   this list does not name is an error too. The old code skipped a missing
//   directory silently, so when grade9-science was split the harness quietly
//   stopped checking its figures and still printed PASS. Both halves are
//   asserted here because both halves have to hold: the list must not name a
//   directory that has gone, and it must name every grade-9 questions
//   directory that exists.
{
  const missing = PACKS.filter(p => !fs.existsSync(path.join(ROOT, p)));
  if (missing.length) {
    console.error("PACKS names a directory that does not exist: " + missing.join(", "));
    process.exit(1);
  }
  const live = fs.readdirSync(path.join(ROOT, "subjects"))
    .filter(d => /^grade9-/.test(d))
    .filter(d => fs.existsSync(path.join(ROOT, "subjects", d, "questions")))
    .map(d => "subjects/" + d + "/questions");
  const unlisted = live.filter(p => PACKS.indexOf(p) === -1);
  if (unlisted.length) {
    console.error("a grade-9 pack ships questions this harness does not check: " + unlisted.join(", "));
    process.exit(1);
  }
}

for (const PACK of PACKS) {
  const dir = path.join(ROOT, PACK);
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith('.js')) continue;
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: PACK + '/' + f });
  }
}

// The HTML spec's "any other start tag" breakout list for foreign content.
const BREAKOUT = ['b', 'big', 'blockquote', 'body', 'br', 'center', 'code', 'dd',
  'div', 'dl', 'dt', 'em', 'embed', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'hr', 'i', 'img', 'li', 'listing', 'menu', 'meta', 'nobr', 'ol', 'p',
  'pre', 'ruby', 's', 'small', 'span', 'strong', 'strike', 'sub', 'sup',
  'table', 'tt', 'u', 'ul', 'var'];

// Roughly the widest a character gets in a 1em sans-serif digit/letter mix.
// Under-estimating is the safe direction here: it costs a missed warning, not
// a false failure on a figure that is actually fine.
const EM = 0.52;
const SLACK = 2;

let pass = 0, fail = 0;
const ok = (cond, msg) => { if (cond) pass++; else { fail++; console.log('  FAIL ' + msg); } };

const figures = new Map();
function collect(o, id) {
  if (typeof o === 'string') {
    let m; const re = /<svg\b[^>]*>[\s\S]*?<\/svg>/g;
    while ((m = re.exec(o))) if (!figures.has(m[0])) figures.set(m[0], id);
    return;
  }
  if (Array.isArray(o)) return o.forEach(v => collect(v, id));
  if (o && typeof o === 'object') return Object.values(o).forEach(v => collect(v, id));
}
ctx.STATIC_QUESTIONS.forEach(q => collect(q, q.id));

console.log(PACKS.map(p => p.split('/')[1]).join(' + ') + ': '
  + ctx.STATIC_QUESTIONS.length + ' questions, '
  + figures.size + ' distinct figures');

console.log('\nno HTML breakout tag inside an svg');
for (const [svg, id] of figures) {
  const hit = BREAKOUT.find(t => new RegExp('<' + t + '(\\s|/|>)', 'i').test(svg));
  ok(!hit, id + ' contains <' + hit + '> inside its svg - the parser ends the '
    + 'svg there and the rest of the figure prints as loose HTML');
}

console.log('\nevery svg declares a viewBox and an accessible role');
for (const [svg, id] of figures) {
  ok(/viewBox="0 0 [\d.]+ [\d.]+"/.test(svg), id + ' has no origin-anchored viewBox');
  ok(/role="img"/.test(svg), id + ' has no role="img"');
}

console.log('\nno label clipped by its own viewBox');
let skipped = 0;
for (const [svg, id] of figures) {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  if (!vb) continue;
  const W = +vb[1], H = +vb[2];
  // A <g transform> moves everything below it; the flat coordinates in the
  // text nodes are then not page coordinates and nothing here can say where
  // they land. Skipping is the honest answer.
  if (/<g[^>]*transform=/.test(svg)) { skipped++; continue; }
  let t; const re = /<text\s+x="(-?[\d.]+)"\s+y="(-?[\d.]+)"([^>]*)>([\s\S]*?)<\/text>/g;
  while ((t = re.exec(svg))) {
    if (/transform=/.test(t[3])) { skipped++; continue; }
    const x = +t[1], y = +t[2];
    const size = +((/font-size="([\d.]+)"/.exec(t[3]) || [])[1] || 13);
    const chars = t[4].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, 'X').length;
    const w = chars * size * EM;
    const anchor = (/text-anchor="(\w+)"/.exec(t[3]) || [])[1] || 'start';
    const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    const per = size * EM;
    const cut = Math.max(0, -x0, x0 + w - W, size - y, y - H);
    ok(cut <= Math.max(SLACK, per - SLACK),
      id + ': "' + t[4].replace(/<[^>]*>/g, '').slice(0, 20) + '" is cut by ~'
      + cut.toFixed(0) + 'px (box ' + W + 'x' + H + ')');
  }
}
if (skipped) console.log('  (' + skipped + ' transformed text nodes not measured)');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exitCode = fail ? 1 : 0;
