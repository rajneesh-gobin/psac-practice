'use strict';
// Probe for the grade9-social-modern-studies depth batches.
//
// ⚠ It reads SOURCE through netlify/lib/questions-sandbox.js, never the built
//   bundles — those are shared output, they are stale in the middle of a batch,
//   and scripts/test-option-parity.js reading them is exactly why a batch must
//   not be judged by it while it is running (batch_plan.md §7).
//
// Usage:  node scripts/probe-sms-depth.js [id-prefix]
//   with a prefix (e.g. g9sms-dpa-) it checks that batch's items in detail;
//   with no prefix it prints the whole pack's per-chapter / per-subsection
//   state, which is what the dispatcher reads between batches.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const PACK = 'grade9-social-modern-studies';
const EXCLUDED = new Set(['cloze', 'task', 'errorhunt']);
const FLOOR = 20;          // items per declared subsection
const L4_PER_CHAPTER = 20; // applied items per chapter

const { loadSubject } = require(path.join(ROOT, 'netlify/lib/questions-sandbox.js'));

const mctx = { registerSubject: (p) => { mctx.__P = p; }, console: { log() {} }, window: {}, STATIC_QUESTIONS: [] };
vm.createContext(mctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'subjects', PACK, '_manifest.js'), 'utf8'), mctx);
const P = mctx.__P;
const SYL = P.syllabus || {};

const all = loadSubject(PACK).filter((q) => q && q.question && !EXCLUDED.has(q.type));
const prefix = process.argv[2] || '';
const mine = prefix ? all.filter((q) => String(q.id || '').startsWith(prefix)) : [];

let fails = 0;
const bad = (id, msg) => { fails++; console.log('  FAIL ' + id + ' — ' + msg); };

// ── 1. corpus-wide id uniqueness ────────────────────────────────────────────
{
  const seen = new Set();
  for (const q of loadSubject(PACK)) {
    if (seen.has(q.id)) bad(q.id, 'DUPLICATE id inside this pack');
    seen.add(q.id);
  }
}

// ── 2. the batch's own items ────────────────────────────────────────────────
if (prefix) {
  console.log(prefix + '*  —  ' + mine.length + ' items');
  const chIds = new Set(P.chapters.map((c) => c.id));
  for (const q of mine) {
    const d = Number(q.difficulty);
    if (!(d >= 1 && d <= 4)) bad(q.id, 'difficulty ' + q.difficulty + ' is not 1-4');
    if (!chIds.has(q.chapterId)) bad(q.id, 'chapter ' + q.chapterId + ' is not declared by the pack');
    const subs = ((SYL[q.chapterId] || {}).subsections || []).map((s) => s.id);
    // ⚠ A chapter that declares NO subsections is a real shape and its items
    //   must carry none — demanding one would hide them from the syllabus
    //   screen. See the longer note in probe-pack-depth.js.
    if (subs.length && !q.subsection) bad(q.id, 'no subsection, but ' + q.chapterId + ' declares ' + subs.length);
    else if (!subs.length && q.subsection) bad(q.id, 'has subsection "' + q.subsection + '" but ' + q.chapterId + ' declares none');
    else if (subs.length && !subs.includes(q.subsection)) bad(q.id, 'subsection "' + q.subsection + '" is not declared on ' + q.chapterId);
    if (!q.hint) bad(q.id, 'no hint');
    if (!q.explanation || q.explanation.length < 60) bad(q.id, 'explanation missing or under 60 chars');
    // ⚠ makeTF() produces an `mcq` with exactly TWO options. Demanding four
    //   makes a legitimate factory look broken — see probe-pack-depth.js.
    if (q.type === 'mcq') {
      const n = (q.options || []).length;
      if (n !== 4 && n !== 2) bad(q.id, 'has ' + n + ' options; expected 4, or 2 for a true/false item');
      else {
        if (!q.options.includes(q.answer)) bad(q.id, 'answer is not byte-identical to any option');
        if (new Set(q.options).size !== n) bad(q.id, 'duplicate options');
      }
    }
    const h = String(q.hint || '').toLowerCase();
    const a = String(q.answer || '').toLowerCase();
    if (a.length > 12 && h.includes(a.slice(0, 30))) bad(q.id, 'the hint contains the answer');
  }

  // option-length parity, the same measure test-option-parity.js applies
  const mcq = mine.filter((q) => q.type === 'mcq' && q.options);
  if (mcq.length) {
    let longest = 0, spread = 0, wide = [];
    for (const q of mcq) {
      const lens = q.options.map((o) => String(o).replace(/<[^>]*>/g, '').length);
      const al = String(q.answer).replace(/<[^>]*>/g, '').length;
      const max = Math.max(...lens);
      if (al === max && lens.filter((l) => l === max).length === 1) longest++;
      const s = max - Math.min(...lens);
      spread += s;
      if (s >= 12) wide.push(q.id + ' (' + s + ')');
    }
    const pctLongest = 100 * longest / mcq.length;
    const meanSpread = spread / mcq.length;
    console.log('  option parity: answer uniquely longest ' + pctLongest.toFixed(1) + '% (limit 42)'
      + ' · mean spread ' + meanSpread.toFixed(1) + ' chars (limit 12)');
    if (pctLongest >= 42) bad(prefix, 'answer is the longest option too often');
    if (meanSpread >= 12) bad(prefix, 'mean option spread too wide');
    if (wide.length) console.log('  wide spreads: ' + wide.slice(0, 12).join(', '));
  }

  const types = {};
  mine.forEach((q) => { types[q.type] = (types[q.type] || 0) + 1; });
  console.log('  types: ' + JSON.stringify(types));
  const diffs = [1, 2, 3, 4].map((d) => d + ':' + mine.filter((q) => Number(q.difficulty) === d).length);
  console.log('  difficulty: ' + diffs.join('  '));
  console.log('');
}

// ── 3. the pack's state against both targets ────────────────────────────────
console.log('chapter                        pool   L4   subsections below ' + FLOOR);
let owedFloor = 0, owedL4 = 0;
for (const c of P.chapters) {
  const list = ((SYL[c.id] || {}).subsections || []);
  const chQs = all.filter((q) => q.chapterId === c.id);
  const l4 = chQs.filter((q) => Number(q.difficulty) === 4).length;
  const thin = list.map((s) => {
    const n = chQs.filter((q) => q.subsection === s.id).length;
    return n < FLOOR ? s.id + ' ' + n : null;
  }).filter(Boolean);
  owedFloor += list.reduce((a, s) => a + Math.max(0, FLOOR - chQs.filter((q) => q.subsection === s.id).length), 0);
  owedL4 += Math.max(0, L4_PER_CHAPTER - l4);
  console.log('  ' + c.id.padEnd(30) + String(chQs.length).padStart(5) + String(l4).padStart(5)
    + '   ' + (thin.length ? thin.join(', ') : 'all at ' + FLOOR));
}
console.log('');
console.log('pack: ' + all.length + ' poolable · still owed ' + owedFloor + ' to the subsection floor · '
  + owedL4 + ' to ' + L4_PER_CHAPTER + ' L4 per chapter');
console.log(fails ? 'FAILED ' + fails + ' check(s)' : 'no structural problems found');
process.exit(fails ? 1 : 0);
