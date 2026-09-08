'use strict';
// Integrity checks on every inline <svg> figure in the grade9-maths bank.
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
const PACK = 'subjects/grade9-maths/questions';

const ctx = { STATIC_QUESTIONS: [], console, Math, JSON, window: {} };
ctx.window.STATIC_QUESTIONS = ctx.STATIC_QUESTIONS;
vm.createContext(ctx);
for (const f of ['engine/helpers.js', 'engine/assessment.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
}
for (const f of fs.readdirSync(path.join(ROOT, PACK)).sort()) {
  if (!f.endsWith('.js')) continue;
  vm.runInContext(fs.readFileSync(path.join(ROOT, PACK, f), 'utf8'), ctx, { filename: f });
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

console.log('grade9-maths: ' + ctx.STATIC_QUESTIONS.length + ' questions, '
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
