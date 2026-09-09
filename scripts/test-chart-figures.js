'use strict';
// The baked chart figures: still current, still cheap, and still consistent
// with the answer key they were drawn for.
//
// ⚠ The last one is the point. The figure and the answer live in two different
// files now - the data in scripts/build-chart-figures.js, the answer in the
// question source - and a transposed pair of bars is invisible to every other
// test in this repo while being completely wrong to a child. So: where the
// question says "most", the tallest bar must BE the answer; where it says
// "total", the bars must add up to it.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '..');
const sb = require('../netlify/lib/questions-sandbox.js');
const FIGURES = require('./build-chart-figures.js').FIGURES;

const results = [];
const check = (name, fn) => {
  try { fn(); results.push([true, name]); }
  catch (e) { results.push([false, name + ' - ' + e.message]); }
};

// ── Still current ───────────────────────────────────────────────────────────
check('every figure matches its generator', () => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/build-chart-figures.js'), '--check'],
    { cwd: ROOT, stdio: 'pipe' });
});

// ── Load what a child would actually be dealt ───────────────────────────────
const byId = new Map();
for (const packId of [...new Set(FIGURES.map(f => f.file.split('/')[1]))]) {
  const pack = sb.loadPack(packId);
  for (const q of (pack.practice || []).concat(pack.papers || [])) byId.set(q.id, q);
}

check('every figure reached the corpus', () => {
  const missing = FIGURES.filter(f => !byId.has(f.id)).map(f => f.id);
  assert.deepEqual(missing, [], 'not loadable: ' + missing.join(', '));
});

check('every figure question draws a chart', () => {
  const bare = FIGURES.filter(f => !/<svg class="q-chart"/.test((byId.get(f.id) || {}).question || ''));
  assert.deepEqual(bare.map(f => f.id), []);
});

check('no question still lists its data in prose', () => {
  // The whole point was to stop handing the child the numbers in a sentence.
  const leaky = FIGURES.filter(f => {
    const prose = ((byId.get(f.id) || {}).question || '').replace(/<svg[\s\S]*?<\/svg>/g, '');
    return /[A-Za-z]{2,}\s*[=:]\s*\d/.test(prose);
  });
  assert.deepEqual(leaky.map(f => f.id), []);
});

// ── Self-contained ──────────────────────────────────────────────────────────
check('each figure paints its own background', () => {
  // Clicking a figure re-serialises it into a data: URI over a BLACK lightbox
  // backdrop, where no stylesheet of ours applies. A CSS-only background left
  // dark ink on black.
  const naked = FIGURES.filter(f => !/<rect width="100%" height="100%"[^>]*fill="#fff"/
    .test((byId.get(f.id) || {}).question || ''));
  assert.deepEqual(naked.map(f => f.id), []);
});

check('style.css carries the .q-chart rule', () => {
  const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
  assert.match(css, /\.q-chart\s*\{/, 'the figures size themselves from this rule');
});

// ── Cheap ───────────────────────────────────────────────────────────────────
check('no figure exceeds its byte ceiling', () => {
  // ⚠ The offline question cache is budgeted in BYTES with very little
  // headroom - the first draft of these charts (2,699 bytes each) pushed
  // grade5-english out of Grade 5's cache and test-question-cache-budget.js
  // failed. This is the early warning for the same mistake.
  const fat = [];
  for (const f of FIGURES) {
    const svg = (((byId.get(f.id) || {}).question || '').match(/<svg[\s\S]*?<\/svg>/) || [''])[0];
    if (svg.length > 1800) fat.push(f.id + ' (' + svg.length + 'B)');
  }
  assert.deepEqual(fat, [], 'over 1800 bytes: ' + fat.join(', '));
});

// ── Consistent with the answer key ──────────────────────────────────────────
const num = v => Number(String(v).replace(/[^0-9.-]/g, ''));

check('"most"/"least" questions point at the right bar', () => {
  const wrong = [];
  for (const f of FIGURES) {
    const q = byId.get(f.id);
    if (!q) continue;
    // ⚠ "I scored at least 70 in half my subjects" is not a question about the
    // shortest bar. Strip the quantifier before looking for a superlative -
    // and strip it by rewriting, not with a lookbehind, which this project
    // bans outright (it is a PARSE error on Safari < 16.4).
    const tail = f.tail.replace(/\bat (least|most)\b/gi, '');
    const wantMax = /\b(most|greatest|highest|tallest|largest)\b/i.test(tail);
    const wantMin = /\b(least|fewest|lowest|smallest)\b/i.test(tail);
    if (!wantMax && !wantMin) continue;
    const values = f.data.map(d => d[1]);
    const target = wantMax ? Math.max(...values) : Math.min(...values);
    const labels = f.data.filter(d => d[1] === target).map(d => d[0]);
    // The answer may be the label itself ('Van') or a longer word the label
    // abbreviates ('Wed' for 'Wednesday'), so match on the prefix either way.
    const answer = String(q.answer).trim();
    const hit = labels.some(l => l.toLowerCase() === answer.toLowerCase()
      || answer.toLowerCase().startsWith(l.toLowerCase())
      || l.toLowerCase().startsWith(answer.toLowerCase()));
    if (!hit) wrong.push(f.id + ': answer "' + answer + '" is not ' + (wantMax ? 'the tallest' : 'the shortest')
      + ' bar (' + labels.join('/') + ')');
  }
  assert.deepEqual(wrong, []);
});

check('"total" and "average" questions add up', () => {
  const wrong = [];
  for (const f of FIGURES) {
    const q = byId.get(f.id);
    if (!q) continue;
    const values = f.data.map(d => d[1]);
    const sum = values.reduce((a, b) => a + b, 0);
    const answer = num(q.answer);
    if (!Number.isFinite(answer)) continue;
    if (/\btotal\b/i.test(f.tail) && !/twice|more|fewer/i.test(f.tail) && answer !== sum) {
      wrong.push(f.id + ': answer ' + answer + ' but the bars total ' + sum);
    }
    if (/\b(average|mean)\b/i.test(f.tail) && /what is/i.test(f.tail)) {
      const mean = sum / values.length;
      if (Math.abs(answer - mean) > 0.001) {
        wrong.push(f.id + ': answer ' + answer + ' but the bars mean ' + mean);
      }
    }
  }
  assert.deepEqual(wrong, []);
});

check('a chart never prints the number the question asks for', () => {
  // "How many pupils prefer Dogs?" with 450 printed over the Dogs bar is not a
  // question. Those figures must be drawn with values:false.
  const given = [];
  for (const f of FIGURES) {
    if (f.values === false) continue;
    const q = byId.get(f.id);
    if (!q || q.type !== 'mcq') continue;
    // Only the shape that reads ONE bar off the chart: "how many … <Label>?"
    const m = /how many .*\b([A-Z][a-z]+)\b\s*\?/.exec(f.tail.replace(/<[^>]+>/g, ''));
    if (!m) continue;
    const row = f.data.find(d => d[0].toLowerCase() === m[1].toLowerCase());
    if (row && num(q.answer) === row[1]) given.push(f.id + ': ' + m[1] + ' = ' + row[1] + ' is printed on the bar');
  }
  assert.deepEqual(given, []);
});

const failed = results.filter(r => !r[0]);
results.forEach(([ok, name]) => console.log('  ' + (ok ? 'ok  ' : 'FAIL') + ' ' + name));
console.log('  ' + FIGURES.length + ' figures · ' + (results.length - failed.length)
  + ' passed, ' + failed.length + ' failed');
if (failed.length) process.exitCode = 1;
