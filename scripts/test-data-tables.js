'use strict';
// Data questions must SHOW their data, and the six fruit variants must agree
// with the answers the bank stores for them.
//
// ⚠ The fruit answers are the point. One file computes the numbers, draws the
// table and writes the answer, so nothing inside it can disagree with itself —
// which is exactly why a mistake there is invisible. This recomputes all six
// variants for all twenty values of n from the row values shown in the drawn
// table, independently of the code that wrote them.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sb = require('../netlify/lib/questions-sandbox.js');

const ROOT = path.resolve(__dirname, '..');

// Every question that used to describe a table in prose.
const DRAWN = {
  'grade4-maths':   ['g4m-data-014'],
  'grade5-maths':   ['CH_GRP04', 'CH_GRP08', 'CH_GRP11'],
  'grade5-science': ['g5sci-wm-016'],
  'grade7-maths':   ['g7m-statistics-006'],
  'grade9-social-modern-studies': ['g9sms-v040', 'g9sms-v074', 'g9sms-v075', 'g9sms-v082', 'g9sms-v084', 'g9sms-my020'],
  'grade9-physics': ['g9s-p3-v093'],
  'grade9-biology': ['g9s-bpi-030'],
};

const results = [];
const check = (name, fn) => {
  try { fn(); results.push([true, name]); }
  catch (e) { results.push([false, name + ' - ' + e.message]); }
};

const byId = new Map();
for (const packId of Object.keys(DRAWN).concat(['grade5-maths'])) {
  const pack = sb.loadPack(packId);
  for (const q of (pack.practice || []).concat(pack.papers || [])) byId.set(q.id, q);
}

const strip = q => (q.question || '').replace(/<table[\s\S]*?<\/table>/g, '');
const cells = q => Array.from((q.question || '').matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g))
  .map(m => m[1].replace(/<[^>]+>/g, '').trim());

check('every listed question draws a real table', () => {
  const bare = [];
  for (const ids of Object.values(DRAWN)) {
    for (const id of ids) {
      const q = byId.get(id);
      if (!q) { bare.push(id + ' (not loadable)'); continue; }
      if (!/<table class="q-table">/.test(q.question)) bare.push(id);
    }
  }
  assert.deepEqual(bare, []);
});

check('no listed question still lists its data in prose', () => {
  // The whole point: the child should have to read the table.
  const leaky = [];
  for (const ids of Object.values(DRAWN)) {
    for (const id of ids) {
      const q = byId.get(id);
      if (q && /[A-Za-z0-9]{2,}\s*[=:]\s*[0-9]/.test(strip(q))) leaky.push(id);
    }
  }
  assert.deepEqual(leaky, []);
});

check('no table cell reads as a fraction to _prettyMath', () => {
  // ⚠ _prettyMath() rewrites a/b in TEXT NODES into stacked fraction markup, and
  // a table cell is a text node like any other: "12/60" in a cell would silently
  // become a fraction glyph.
  // ⚠ Tested against the REAL hazard, not against the character. The tally
  // convention this bank already uses writes a group of five as "||||/", and
  // _FRAC_RE (engine/app.js) needs a digit or □ on both sides of the slash — so
  // a blanket "no slash" rule would ban the established notation while catching
  // nothing that actually breaks.
  const FRAC = /(^|[^\w\/.])(\d{1,3}|□)\s*\/\s*(\d{1,3}|□)(?=$|[^\w\/]|\.(?!\d))/;
  const bad = [];
  for (const ids of Object.values(DRAWN)) {
    for (const id of ids) {
      const q = byId.get(id);
      if (q && cells(q).some(c => FRAC.test(c))) bad.push(id);
    }
  }
  assert.deepEqual(bad, []);
});

check('the shared style exists and no question re-states it inline', () => {
  const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
  assert.match(css, /\.q-table\s*\{/, 'style.css must carry the .q-table rule');
  assert.match(css, /\.q-table th/, 'header cells need their own rule');
  // The printable paper is a separate document that does not load style.css.
  const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  assert.ok(app.includes('.q-table,.picto-table{border-collapse:collapse'),
    'the print stylesheet needs its own copy, or these tables print borderless');
});

check('read-aloud pairs each cell with its heading', () => {
  // A table read in document order is "Fruits chosen Pupils 1 5 2 7" - eight
  // numbers a child cannot pair with anything.
  const app = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  assert.match(app, /function _ttsTable\(/, '_ttsTable must exist');
  assert.match(app, /querySelectorAll\('table'\)\.forEach/,
    '_ttsText must replace tables before reading the clone');
});

// ── The fruit rotation ──────────────────────────────────────────────────────
check('the fruit items ask six different questions', () => {
  const fruit = [...byId.values()].filter(q => /^g5x-graphs-\d\d$/.test(q.id));
  assert.equal(fruit.length, 20, 'expected 20 fruit items');
  const asks = new Set(fruit.map(q => strip(q).replace(/<[^>]+>/g, '').replace(/\d+/g, '#')));
  assert.ok(asks.size >= 6, 'only ' + asks.size + ' distinct questions across 20 items');
});

check('every fruit answer is recomputed from the table it shows', () => {
  const wrong = [];
  for (let n = 1; n <= 20; n++) {
    const id = 'g5x-graphs-' + String(n).padStart(2, '0');
    const q = byId.get(id);
    if (!q) { wrong.push(id + ' missing'); continue; }

    // Read the three pupil counts back out of the drawn table, not out of the
    // formula that made them.
    const c = cells(q);
    const at = c.indexOf('Pupils');
    assert.ok(at >= 0, id + ': no Pupils column');
    const shown = [c[at + 2], c[at + 4], c[at + 6]];
    const [a, b] = [Number(shown[0]), Number(shown[1])];
    const cc = shown[2] === '?' ? null : Number(shown[2]);
    const text = strip(q).replace(/<[^>]+>/g, '');
    const given = Number(String(q.answer).replace(/[^0-9.]/g, ''));

    let expect;
    if (/percentage/i.test(text)) {
      const total = a + b + cc;
      expect = (b + cc) * 100 / total;
      if (!Number.isInteger(expect)) wrong.push(id + ': percentage is not whole (' + expect + ')');
    } else if (cc === null) {
      // missing row: recover it from the total stated in the question
      const stated = Number((text.match(/Altogether\s+([\d,]+)\s+fruits/) || [])[1].replace(/,/g, ''));
      expect = (stated - a - 2 * b) / 3;
      if (!Number.isInteger(expect)) wrong.push(id + ': missing row is not whole (' + expect + ')');
    } else if (/costs Rs/i.test(text)) {
      const price = Number((text.match(/costs Rs\s*(\d+)/) || [])[1]);
      expect = price * (a + 2 * b + 3 * cc);
    } else if (/one more fruit/i.test(text)) {
      expect = (a + 2 * b + 3 * cc) + (a + b + cc);
    } else if (/more than one/i.test(text)) {
      expect = 2 * b + 3 * cc;
    } else {
      expect = a + 2 * b + 3 * cc;
    }
    if (given !== expect) wrong.push(id + ': stored ' + given + ', table gives ' + expect);
  }
  assert.deepEqual(wrong, []);
});

check('no fruit variant repeats an answer', () => {
  const seen = {};
  for (let n = 1; n <= 20; n++) {
    const q = byId.get('g5x-graphs-' + String(n).padStart(2, '0'));
    if (!q) continue;
    const shape = strip(q).replace(/<[^>]+>/g, '').replace(/\d+/g, '#');
    (seen[shape] = seen[shape] || []).push(String(q.answer));
  }
  const dupes = Object.entries(seen)
    .filter(([, a]) => new Set(a).size < a.length)
    .map(([k, a]) => k.slice(0, 50) + ' -> ' + a.join(','));
  assert.deepEqual(dupes, [], 'a child meeting two of these would answer twice from memory');
});

check('the fruit levels are not all 4', () => {
  // 20 items at Level 4 that are one question is what this replaced.
  const levels = new Set();
  for (let n = 1; n <= 20; n++) {
    const q = byId.get('g5x-graphs-' + String(n).padStart(2, '0'));
    if (q) levels.add(q.difficulty);
  }
  assert.ok(levels.size > 1, 'every variant still claims the same level');
});

const failed = results.filter(r => !r[0]);
results.forEach(([ok, name]) => console.log('  ' + (ok ? 'ok  ' : 'FAIL') + ' ' + name));
console.log('  ' + (results.length - failed.length) + ' passed, ' + failed.length + ' failed');
if (failed.length) process.exitCode = 1;
