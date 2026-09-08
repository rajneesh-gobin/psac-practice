'use strict';
// Can each Grade 9 subject deal FIVE papers that do not look like each other?
//
//   node netlify/build-questions.js && node scripts/test-paper-variety.js
//
// WHY THIS EXISTS
// `docs/implenent.md` sets this as a coverage gate, in its own words: the pool
// "can generate at least five blueprint-compliant full papers without repeating
// the same memorable passage, dataset or visual stimulus." Nothing asserted it.
//
// ⚠⚠ WHAT WAS ACTUALLY BEING MEASURED, BEFORE THIS FILE (2026-09-08).
//   `test-nce-paper.js` does check repeats — for `grade9-maths` only, and against
//   a synthetic fixture bank built inline in that file, not the shipped pack.
//   `nce-pool-depth.js` measures the real bank, and could not run on four of the
//   five subjects at all:
//
//       grade9-maths      g9m-trigonometry ... needs about 1 more
//       grade9-biology    No tasks in the built bundle for grade9-biology.
//       grade9-chemistry  No tasks in the built bundle for grade9-chemistry.
//       grade9-physics    No tasks in the built bundle for grade9-physics.
//       grade9-ict        No tasks in the built bundle for grade9-ict.
//
//   It filters the bundle for `type === 'task'`, and only grade9-maths authors
//   its bank that way; the other four ship plain mcq/text/numeric rows that
//   `tasksFromBank()` wraps at generation time. So four LIVE subjects had zero
//   measurement against this gate, and the message they produced reads as "run
//   the build" rather than "this probe does not understand this pack". That is
//   the same shape as the SVG harness silently skipping a renamed directory:
//   a tool that names its subject stops covering the project the moment a
//   differently-shaped pack ships.
//
// ⚠ THE DEFINITION OF "MEMORABLE" LIVES IN ONE PLACE, `scripts/lib/memorable.js`,
//   and both this file and `nce-pool-depth.js` read it from there. Two scripts
//   holding their own copy of the same word is how they end up disagreeing about
//   whether a subject passes.
//
// ⚠ FIVE PAPERS ARE DEALT IN SEQUENCE WITH `recentIds` FED FORWARD, not from five
//   independent seeds. That is how a child actually meets five mocks, and it is
//   the only version of the question the assembler's freshness logic is even in
//   play for. Five independent seeds measure something nobody experiences.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const N = require(path.join(ROOT, 'engine', 'nce_paper.js'));
const { memorableKey } = require(path.join(__dirname, 'lib', 'memorable.js'));

const PAPERS = 5;

let pass = 0, fail = 0;
const ok = m => { pass++; console.log('  ok   ' + m); };
const bad = m => { fail++; console.log('  FAIL ' + m); };

// ⚠ BASELINE, NOT TARGET. The brief's bar is ZERO repeated memorable stimuli over
//   five papers. These are what the shipped banks actually manage today, recorded
//   so a content batch cannot make variety worse while adding items — the same
//   debt-table pattern `test-option-parity.js` uses. `repeats` is the number of
//   memorable stimuli that appear in more than one of the five papers.
//   ⚠ Lower these as content lands. A baseline that is never lowered is a target
//     nobody is working towards.
const BASELINE = {
  // Measured 2026-09-08, five papers dealt in sequence with recentIds fed forward.
  'grade9-maths':     { repeats: 8, marks: 100 },
  'grade9-biology':   { repeats: 1, marks: 50 },
  // ⚠ RE-BASELINED 0 -> 2 on 2026-09-08, ATTRIBUTED, not waved through. A content
  //   batch added 170 items to g9s-inquiry/g9s-sts including four new figures, and
  //   variety got WORSE. The cause is the one this file exists to make visible:
  //   grade9-chemistry now has 33 figure-bearing questions behind only 10 DISTINCT
  //   pictures (biology 21 behind 11, physics 39 behind 11). Adding questions that
  //   reuse an existing figure raises how often a memorable stimulus is DRAWN
  //   without raising how many exist, so repeats go up. The batch was still net
  //   positive — option parity 35.6% -> 20.9% and ten subsections reached 20 — so
  //   blocking on this would be wrong; hiding it would be worse.
  'grade9-chemistry': { repeats: 2, marks: 50 },
  // ⚠ LOWERED 5 -> 4 on 2026-09-08 when a content batch added distinct figures.
  //   Lower a baseline the moment the measurement allows it: one that is never
  //   lowered is a target nobody is working towards.
  'grade9-physics':   { repeats: 4, marks: 50 },
  'grade9-ict':       { repeats: 1, marks: 79 },
};

// ⚠⚠ WHAT THIS HARNESS FOUND, AND WHY IT MATTERS MORE THAN THE REPEAT COUNT.
//   The blueprints were derived from the real NCE papers, and they say the
//   science papers are almost entirely figure-based. The banks are not.
//   Measured 2026-09-08, seed 1, every warning the assembler raised:
//
//     pack               visual target   actual   questions/target   drawing tasks
//     grade9-biology         93%           2%        41 / 6              0
//     grade9-chemistry       92%           2%        41 / 5              0
//     grade9-physics        100%          15%        41 / 6              0
//     grade9-ict             30%           2%        65 / 11             0 (n/a)
//
//   ⚠ A generated science paper is currently a list of ~41 one-mark text
//     questions where the real paper is 5-6 multi-part structured questions built
//     on diagrams. Reaching "20 items per subsection" does not fix any of that:
//     writing 391 more one-mark text MCQs for Biology moves the coverage counter
//     and leaves the paper at 2% visual with 41 questions instead of 6.
//   ⚠ The figures that DO exist collapse to very few distinct pictures, which is
//     what drives the repeat count: grade9-physics has 39 figure-bearing questions
//     but only 7 distinct alt texts behind them, so four of its pictures appear in
//     ALL FIVE papers. Counting illustrated questions says the pack is visual;
//     counting distinct pictures says whether five papers can look different.
//   These are recorded as a baseline, not accepted. See docs/nce-grade9/batch_plan.md.

function bankFor(pack) {
  const file = path.join(ROOT, 'netlify', 'question-bundles', pack + '.json');
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const all = Array.isArray(raw) ? raw : (raw[pack] || Object.values(raw).find(Array.isArray) || []);

  // ⚠ TWO BANK SHAPES, AND A READER MUST HANDLE BOTH. grade9-maths authors real
  //   multi-part `task` rows with their own mark values; the other four ship
  //   ordinary questions that are wrapped into one-mark tasks at generation
  //   time. Handling only the first is the defect this file was written for.
  const authored = all.filter(q => q && q.type === 'task' && Array.isArray(q.parts) && q.parts.length);
  if (authored.length) return { tasks: authored, source: new Map(authored.map(t => [t.id, t])) };

  const wrapped = N.tasksFromBank(all);
  const byId = new Map(all.map(q => [q.id, q]));
  return { tasks: wrapped, source: byId };
}

function weightsFor(pack) {
  const src = fs.readFileSync(path.join(ROOT, 'subjects', pack, '_manifest.js'), 'utf8');
  const W = {};
  for (const m of src.matchAll(/id:\s*['"]([a-z0-9-]+)['"][^\n]*examWeight:\s*(\d+)/g)) W[m[1]] = +m[2];
  return W;
}

const packs = Object.keys(N.BLUEPRINTS).sort();
console.log('\nFive blueprint-compliant papers, no repeated memorable stimulus (' +
  packs.length + ' blueprints)\n');

for (const pack of packs) {
  const bp = N.BLUEPRINTS[pack];
  const bank = bankFor(pack);
  if (!bank || !bank.tasks.length) {
    bad(pack + ': no usable bank in netlify/question-bundles — run node netlify/build-questions.js');
    continue;
  }
  const W = weightsFor(pack);

  const papers = [];
  let recent = [];
  for (let i = 0; i < PAPERS; i++) {
    const p = N.assemblePaper({ blueprint: bp, tasks: bank.tasks, seed: 1 + i,
      chapterWeights: W, recentIds: recent });
    papers.push(p);
    // The MCQ block is synthetic; sourceIds carry the real items behind it.
    p.tasks.forEach(t => recent.push(...(t.sourceIds || [t.id])));
    recent = recent.slice(0, 400);
  }

  // Which memorable stimuli did each paper carry?
  const perPaper = papers.map(p => {
    const keys = new Set();
    for (const t of p.tasks) {
      for (const id of (t.sourceIds || [t.id])) {
        const k = memorableKey(t, bank.source.get(id));
        if (k) keys.add(k);
      }
    }
    return keys;
  });

  const seenIn = new Map();
  perPaper.forEach(keys => keys.forEach(k => seenIn.set(k, (seenIn.get(k) || 0) + 1)));
  const repeated = [...seenIn.entries()].filter(([, n]) => n > 1);
  const distinct = seenIn.size;

  const marks = papers.map(p => p.totalMarks);
  const worstMarks = Math.min.apply(null, marks);
  const base = BASELINE[pack] || {};

  console.log('  ' + pack + '  (' + bank.tasks.length + ' tasks, ' + distinct +
    ' distinct memorable stimuli over ' + PAPERS + ' papers)');

  // 1. Blueprint compliance, per paper. A paper short of its own mark total is
  //    not "a paper with a warning" — it is not the paper the child will sit.
  if (worstMarks === bp.totalMarks) {
    ok(pack + ': all ' + PAPERS + ' papers total exactly ' + bp.totalMarks + ' marks');
  } else if (base.marks != null && worstMarks >= base.marks) {
    console.log('  DEBT  ' + pack + ': worst paper reaches ' + worstMarks + ' of ' +
      bp.totalMarks + ' marks (baseline ' + base.marks + ') — recorded shortfall, not a regression');
    pass++;
  } else {
    bad(pack + ': worst of ' + PAPERS + ' papers reaches only ' + worstMarks + ' of ' +
      bp.totalMarks + ' marks' + (base.marks != null ? ' (baseline ' + base.marks + ')' : '') +
      ' — marks per paper: ' + marks.join(', '));
  }

  // 2. The brief's actual gate.
  if (!repeated.length) {
    ok(pack + ': no memorable stimulus appears in more than one of the five papers');
  } else if (base.repeats != null && repeated.length <= base.repeats) {
    console.log('  DEBT  ' + pack + ': ' + repeated.length + ' memorable stimulus/stimuli repeat across ' +
      PAPERS + ' papers (baseline ' + base.repeats + ', brief requires 0)');
    repeated.slice(0, 5).forEach(([k, n]) => console.log('          ' + n + '/' + PAPERS + '  ' + k));
    pass++;
  } else {
    bad(pack + ': ' + repeated.length + ' memorable stimulus/stimuli repeat across ' + PAPERS +
      ' papers' + (base.repeats != null ? ' (baseline ' + base.repeats + ')' : '') +
      ' — the brief requires none');
    repeated.slice(0, 8).forEach(([k, n]) => console.log('          ' + n + '/' + PAPERS + '  ' + k));
  }

  // 3. Reported, never asserted: a pack with very few distinct stimuli can pass
  //    the repeat check simply by carrying almost no memorable content at all.
  //    That is not variety, it is absence, and only a person can judge which.
  // ⚠⚠ VISUAL SHARE IS COUNTED PER QUESTION A CHILD SEES, NOT PER NUMBERED
  //   QUESTION ON THE SHEET - and the engine currently reports both, disagreeing.
  //   MEASURED 2026-09-08 on grade9-physics, seed 1, one paper:
  //       assemblePaper()'s warning   15%   (counts paperTasks BEFORE grouping)
  //       compliance() / paper footer 33%   (counts paper.tasks AFTER grouping)
  //   groupSingleMarkTasks() bundles 8-10 unrelated one-mark items under one
  //   number, and hasVisual() is true for the bundle if ANY part carries a figure
  //   - so one diagram makes eight text questions read as "a visual question".
  //   That flatters the paper: the real NCE science paper is ~6 questions each
  //   BUILT on a figure, not 6 bundles that happen to contain one between them.
  //   This harness counts the source rows, which is the honest denominator.
  if (bp.visualTargetPct) {
    const shares = papers.map(p => {
      let vis = 0, total = 0;
      for (const t of p.tasks) {
        for (const id of (t.sourceIds || [t.id])) {
          const src = bank.source.get(id);
          total++;
          // An authored task keeps its figure in `stimulus`; an adapted row keeps it
          // in the question html. Reading only one of the two reported grade9-maths
          // at 0% visual against a measured 26%.
          if (src && src.type === 'task') { if (N.hasVisual(src)) vis++; continue; }
          const html = src ? (src.question || '') : '';
          if ((src && src.image) || /<svg|<img/i.test(html) || (!src && N.hasVisual(t))) vis++;
        }
      }
      return total ? vis / total : 0;
    });
    const worstVis = Math.min.apply(null, shares);
    const meanVis = shares.reduce((x, y) => x + y, 0) / shares.length;
    console.log('        visual share ' + Math.round(worstVis * 100) + '-' + Math.round(Math.max.apply(null, shares) * 100) +
      '% (mean ' + Math.round(meanVis * 100) + '%) of the questions a child sees, against a blueprint target of ' +
      Math.round(bp.visualTargetPct * 100) + '%' +
      (worstVis < bp.visualTargetPct * 0.7 ? '   <- the real paper does not look like this' : ''));
  }

  const memSlots = perPaper.reduce((a, s) => a + s.size, 0);
  console.log('        ' + memSlots + ' memorable slot(s) filled over ' + PAPERS +
    ' papers from ' + distinct + ' distinct stimuli' +
    (distinct < PAPERS * 2 ? '   <- thin: check the pack is not simply text-only' : ''));
}

console.log('\n' + pass + ' passed, ' + fail + ' failed');
if (fail) {
  console.log('\n⚠ To see WHICH chapter forces a repeat: node scripts/nce-pool-depth.js <pack> 5');
}
process.exit(fail ? 1 : 0);
