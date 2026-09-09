'use strict';
// Does every makeMCQ() call list its own answer among its options?
//
// WHY THIS EXISTS — and why nothing else can catch it
// makeMCQ is:
//     const others    = shuffle([...new Set(options.filter(o => o !== answer))]);
//     const finalOpts = shuffle([answer, ...others.slice(0, 3)]);
// so when `answer` is not BYTE-IDENTICAL to one of the four options, the filter
// removes nothing, `.slice(0, 3)` silently DROPS one of the author's four
// distractors at random, and the answer is added in its place.
//
// Two things follow, and both are invisible downstream:
//   1. The built question is still a well-formed 4-option MCQ whose answer is
//      present — by CONSTRUCTION. test-option-parity.js, isValidMCQ() and every
//      runtime check therefore pass. Only the SOURCE shows the mistake.
//   2. Which distractor is dropped is chosen by Math.random() at build time, so
//      the same source can produce different papers on different builds.
//
// Found via the NCE difficulty audit's `ambiguous-options` finding on
// g9s-c5-v011, where the answer read "Excess acid (or excess base) …" while the
// option read "Excess reactant …". They are the same statement, so the option
// survived alongside the key and the item offered two correct answers — about
// three times in four, depending on which distractor the shuffle threw away.
// The audit recorded it as one bad question. It is a whole class.
//
// ⚠ This instruments the REAL factory from netlify/lib/questions-sandbox.js
//   rather than parsing source text, so it cannot drift from what the build
//   actually does.
//
// Run: node scripts/test-mcq-answer-in-options.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const { buildContext } = require(path.join(ROOT, 'netlify', 'lib', 'questions-sandbox.js'));

const packs = fs.readdirSync(path.join(ROOT, 'subjects'))
  .filter(d => /^grade\d-/.test(d))
  .filter(d => fs.existsSync(path.join(ROOT, 'subjects', d, 'questions')))
  .sort();

const findings = [];
let scanned = 0, mcqs = 0, loadErrors = 0;

for (const pack of packs) {
  const dir = path.join(ROOT, 'subjects', pack, 'questions');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();

  let ctxObj;
  try { ctxObj = buildContext([], []); } catch (e) { console.error('buildContext failed: ' + e.message); process.exit(1); }

  const origMCQ = ctxObj.makeMCQ;
  ctxObj.makeMCQ = function (spec) {
    mcqs++;
    if (spec && Array.isArray(spec.options)) {
      // Compare exactly as makeMCQ does — `o !== answer`, no trimming, no
      // normalising. Anything looser would hide the very mismatch that bites.
      if (!spec.options.some(o => o === spec.answer)) {
        findings.push({
          pack, id: spec.id, answer: String(spec.answer),
          options: spec.options.map(String),
          // A near-match is the dangerous shape: the author meant one of these.
          near: spec.options.map(String).filter(o =>
            o.trim() === String(spec.answer).trim() ||
            o.replace(/\s+/g, ' ').toLowerCase().trim() === String(spec.answer).replace(/\s+/g, ' ').toLowerCase().trim()),
        });
      }
    }
    return origMCQ(spec);
  };

  const ctx = vm.createContext(ctxObj);
  for (const f of files) {
    scanned++;
    try {
      vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^﻿/, ''), ctx,
        { filename: pack + '/' + f });
    } catch (e) {
      loadErrors++;
      console.log('  note  could not run ' + pack + '/' + f + ': ' + e.message);
    }
  }
}

console.log('');
console.log('Scanned ' + scanned + ' question files across ' + packs.length + ' packs; '
  + mcqs + ' makeMCQ() calls.');
if (loadErrors) console.log(loadErrors + ' file(s) could not be executed (reported above, not counted).');
console.log('');

if (!findings.length) {
  console.log('  ok    every makeMCQ() lists its own answer among its options');
  console.log('');
  console.log('MCQ answer/option integrity: 1 passed, 0 failed.');
  return;
}

// Group by pack for a readable report.
const byPack = {};
for (const f of findings) (byPack[f.pack] ||= []).push(f);

for (const [pack, list] of Object.entries(byPack)) {
  console.log('  FAIL  ' + pack + ' — ' + list.length + ' question(s) whose answer is not one of the options:');
  for (const f of list.slice(0, 12)) {
    console.log('        ' + f.id);
    console.log('          answer : ' + JSON.stringify(f.answer.slice(0, 100)));
    for (const o of f.options) {
      const flag = f.near.includes(o) ? '  ← same statement, differs only in wording/whitespace' : '';
      console.log('          option : ' + JSON.stringify(o.slice(0, 100)) + flag);
    }
  }
  if (list.length > 12) console.log('        … and ' + (list.length - 12) + ' more');
  console.log('');
}

console.log('⚠ Each of these silently discards one authored distractor at build time,');
console.log('  and any option that restates the answer then ships beside it.');
console.log('');
console.log('MCQ answer/option integrity: 0 passed, ' + Object.keys(byPack).length + ' pack(s) failed, '
  + findings.length + ' question(s) affected.');
process.exitCode = 1;
