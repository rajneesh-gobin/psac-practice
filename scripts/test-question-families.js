'use strict';
// Question families: several questions on ONE context whose variants change what
// the pupil has to do. Two rules, both from prompt.md, both invisible when broken:
//   · mixed practice must not deal variants back to back (it reads as padding);
//   · a paper must not carry two variants of one family (one leaks the other).
//
// ⚠ The family is derived from the ID, never from a question field — a new field
//   would have to be added to engine/helpers.js AND all three server copies AND
//   their export lists, which is how makeCloze, learnMore and subsection were
//   each silently stripped from the built bundle. So the FIRST thing measured
//   here is that the id convention actually parses, including for the three
//   science packs that share the g9s- prefix.
//
// ⚠ And the second is that spacing never DROPS a question. A rule that quietly
//   turned a 40-question paper into 37 would be a worse bug than the repetition
//   it fixes — which is exactly how the cloze exclusion hid for so long.
//
// Run: node scripts/test-question-families.js
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails++; console.log('  FAIL ' + msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b),
  msg + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');

function makeCtx(opts) {
  opts = opts || {};
  const ctx = vm.createContext({
    console: { log() {}, warn() {}, error() {} },
    window: {},
    DB: opts.DB || { restrictions: {} },
    CHAPTERS: opts.chapters || [],
    packGenerators: () => (opts.generators || {}),
    _planAllowsChapter: () => true,
  });
  for (const f of ['engine/helpers.js', 'engine/questions_engine.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^﻿/, ''), ctx, { filename: f });
  }
  ctx.STATIC_QUESTIONS = vm.runInContext('STATIC_QUESTIONS', ctx);
  for (const q of (opts.questions || [])) ctx.STATIC_QUESTIONS.push(q);
  ctx.fam = vm.runInContext('_familyOf', ctx);
  ctx.space = vm.runInContext('spaceFamilies', ctx);
  ctx.mixed = vm.runInContext('getMixedQuestions', ctx);
  ctx.paper = vm.runInContext('assembleExamPaper', ctx);
  ctx.forChapter = vm.runInContext('getQuestionsForChapter', ctx);
  return ctx;
}

// ── 1. The id convention parses, and touches nothing that already exists ──
{
  const c = makeCtx({});
  eq(c.fam({ id: 'g9sms-fam-007-c' }), 'g9sms-fam-007', 'a plain -fam- id yields its family');
  eq(c.fam({ id: 'g9eng-fam-001-a' }), 'g9eng-fam-001', 'first variant of a family');
  // The three sciences share the g9s- prefix on purpose; each carries its own infix.
  eq(c.fam({ id: 'g9s-bfam-012-d' }), 'g9s-bfam-012', 'biology infix parses');
  eq(c.fam({ id: 'g9s-cfam-003-b' }), 'g9s-cfam-003', 'chemistry infix parses');
  eq(c.fam({ id: 'g9s-pfam-044-e' }), 'g9s-pfam-044', 'physics infix parses');

  // ⚠ Nothing that already exists may start being treated as a family. These are
  //   real ids from the current bank.
  for (const id of ['g9m-nrb-104-aii', 'g9m-vis-003-a', 'g9m-multi-003-b',
                    'g9ict-int-202-a', 'g9s-inq-c042', 'g9eng-litv-097',
                    'g5sc-plants-001', 'g9sms-sb-007']) {
    ok(c.fam({ id }) === null, 'existing id is not read as a family: ' + id);
  }
  ok(c.fam({}) === null, 'a question with no id is not a family');
  ok(c.fam(null) === null, 'null is not a family');
}

// ── 2. Spacing separates variants without ever losing one ──────────────────
{
  const c = makeCtx({});
  const q = id => ({ id });
  const list = ['g9x-fam-001-a', 'g9x-fam-001-b', 'g9x-fam-001-c',
                'g9x-other-1', 'g9x-other-2', 'g9x-other-3'].map(q);
  const out = c.space(list);
  eq(out.length, list.length, 'nothing is dropped');
  eq(new Set(out.map(x => x.id)).size, list.length, 'nothing is duplicated');
  let adjacent = 0;
  for (let i = 1; i < out.length; i++) {
    const f = c.fam(out[i - 1]);
    if (f && c.fam(out[i]) === f) adjacent++;
  }
  eq(adjacent, 0, 'no two variants of one family end up side by side');

  // ⚠ The honest case: when there is nothing legal to swap in, keep the
  //   question rather than drop it.
  const allOne = ['g9x-fam-002-a', 'g9x-fam-002-b', 'g9x-fam-002-c'].map(q);
  const out2 = c.space(allOne);
  eq(out2.length, 3, 'an all-one-family list keeps all three rather than thinning');
  eq(out2.map(x => x.id), allOne.map(x => x.id), 'and leaves them in order, since no swap is legal');

  eq(c.space([]).length, 0, 'an empty list is fine');
  eq(c.space(null).length, 0, 'so is null');
}

// ── 4. Mixed practice, through the real function ───────────────────────────
{
  const questions = [];
  // One chapter: four families of four variants, plus filler, all L2.
  for (let f = 1; f <= 4; f++) {
    for (const v of ['a', 'b', 'c', 'd']) {
      questions.push({ id: `g9x-fam-00${f}-${v}`, type: 'mcq', chapterId: 'ch1', difficulty: 2,
        question: 'Q', options: ['1', '2', '3', '4'], answer: '1' });
    }
  }
  for (let i = 0; i < 8; i++) {
    questions.push({ id: `g9x-plain-${i}`, type: 'mcq', chapterId: 'ch1', difficulty: 2,
      question: 'Q', options: ['1', '2', '3', '4'], answer: '1' });
  }
  const c = makeCtx({ questions });
  let worstAdjacent = 0, minLen = 99;
  for (let run = 0; run < 40; run++) {
    const got = c.mixed('ch1', 4, 20);
    minLen = Math.min(minLen, got.length);
    let adj = 0;
    for (let i = 1; i < got.length; i++) {
      const f = c.fam(got[i - 1]);
      if (f && c.fam(got[i]) === f) adj++;
    }
    worstAdjacent = Math.max(worstAdjacent, adj);
  }
  eq(minLen, 20, 'a 20-question round is still 20 questions, every time');
  eq(worstAdjacent, 0, 'across 40 shuffles, variants never come out consecutive');
}

// ── 5. A paper never carries two variants of one family ────────────────────
{
  const questions = [];
  const chapters = [];
  // Three chapters, each almost entirely made of family variants - the hard case,
  // because thinning must not be allowed to shorten the paper.
  for (let ch = 1; ch <= 3; ch++) {
    chapters.push({ id: 'ch' + ch, name: 'Chapter ' + ch, examWeight: 13 });
    for (let f = 1; f <= 6; f++) {
      for (const [vi, v] of ['a', 'b', 'c'].entries()) {
        questions.push({ id: `g9x-fam-${ch}${String(f).padStart(2, '0')}-${v}`,
          type: 'mcq', chapterId: 'ch' + ch, difficulty: (vi % 3) + 1,
          question: 'Q', options: ['1', '2', '3', '4'], answer: '1' });
      }
    }
    for (let i = 0; i < 12; i++) {
      questions.push({ id: `g9x-p${ch}-${i}`, type: 'mcq', chapterId: 'ch' + ch,
        difficulty: (i % 3) + 1, question: 'Q', options: ['1', '2', '3', '4'], answer: '1' });
    }
  }
  const c = makeCtx({ questions, chapters });
  let short = 0, leaked = 0, dup = 0;
  for (let run = 0; run < 30; run++) {
    const p = c.paper('full');
    if (p.questions.length !== 40) short++;
    const fams = p.questions.map(q => c.fam(q)).filter(Boolean);
    if (fams.length !== new Set(fams).size) leaked++;
    if (p.questions.length !== new Set(p.questions.map(q => q.id)).size) dup++;
  }
  eq(short, 0, 'a full paper is 40 questions on every run - thinning never shortens it');
  eq(leaked, 0, 'no paper carries two variants of the same family');
  eq(dup, 0, 'and no paper repeats a question id');
}

// ── 6. Every edited file parses ────────────────────────────────────────────
{
  const { execFileSync } = require('node:child_process');
  for (const f of ['engine/questions_engine.js', 'engine/helpers.js']) {
    let good = true;
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); } catch (_) { good = false; }
    ok(good, f + ' passes node --check');
  }
}

console.log(`Question families: ${checks - fails}/${checks} checks passed.`);
if (fails) process.exitCode = 1;
