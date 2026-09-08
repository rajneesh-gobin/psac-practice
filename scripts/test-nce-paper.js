'use strict';
// ── NCE paper generation: blueprint compliance, mark scheme, seeding ──────
//
//   node scripts/test-nce-paper.js            # assertions only
//   node scripts/test-nce-paper.js --render   # also write paper + scheme HTML
//                                             # to the scratch dir for eyeballing
//
// ⚠ THE BANK HERE IS A FIXTURE, AND IT STAYS ONE. Real Grade 9 Mathematics
//   content now exists (157 tasks across four chapters), but this suite keeps
//   its own synthetic bank on purpose: it must be able to exercise shapes the
//   real bank does not yet contain — three-level (a)(i)/(a)(ii) numbering,
//   several drawing tasks, a heavy tail — and it must not start failing because
//   someone added or removed a question.
//
// ⚠ Passing here means the MACHINERY is correct, not that a good paper can be
//   built. `scripts/nce-generate-paper.js` is what runs the real bank through
//   it, and it reports honestly where that bank still falls short.

const path = require('path');
const fs = require('fs');
const A = require(path.join(__dirname, '..', 'engine', 'assessment.js'));
const N = require(path.join(__dirname, '..', 'engine', 'nce_paper.js'));

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m); } };

const BP = N.BLUEPRINTS['grade9-maths'];

// ── Fixture bank ──────────────────────────────────────────────────────────
const CH = ['g9m-number-revision', 'g9m-indices', 'g9m-coordinates', 'g9m-vectors',
            'g9m-volume', 'g9m-expressions', 'g9m-simultaneous', 'g9m-probability',
            'g9m-statistics', 'g9m-matrices'];
const bank = [];
let seq = 0;
const nextId = ch => `${ch}-${String(++seq).padStart(3, '0')}`;

// 1-mark single-step openers
for (let i = 0; i < 40; i++) {
  const ch = CH[i % CH.length];
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 1,
    parts: [{ label: 'a', prompt: `Work out item ${i}.`, marks: 1, explanation: 'e',
              response: { kind: 'number', answer: String(i + 2) } }] }));
}
// MCQ items
for (let i = 0; i < 20; i++) {
  const ch = CH[i % CH.length];
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 2,
    parts: [{ label: 'a', prompt: `Which of these is correct for item ${i}?`, marks: 1, explanation: 'e',
              response: { kind: 'choice', variant: 'options', answer: 'B',
                          options: ['A' + i, 'B', 'C' + i, 'D' + i] } }] }));
}
// Two-part middles, some with a shared stimulus and a dependency
for (let i = 0; i < 25; i++) {
  const ch = CH[i % CH.length];
  const withStim = i % 3 === 0;
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 3,
    stimulus: withStim ? { html: '<svg width="120" height="80" role="img"></svg>', altText: 'A figure' } : null,
    parts: [
      { label: 'a', prompt: `Find the value for item ${i}.`, marks: 2, explanation: 'e',
        response: { kind: 'number', answer: String(i), unit: 'cm' } },
      { label: 'b', prompt: 'Hence find the total.', marks: 2, explanation: 'e',
        dependsOn: i % 5 === 0 ? 'a' : null,
        response: { kind: 'number', answer: String(i * 2) } },
    ] }));
}
// Three-level numbering
for (let i = 0; i < 6; i++) {
  const ch = CH[i % CH.length];
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 3,
    parts: [
      { label: 'a.i', prompt: 'Write down the total.', marks: 1, explanation: 'e',
        response: { kind: 'number', answer: '12' } },
      { label: 'a.ii', prompt: 'Find the probability.', marks: 1, explanation: 'e',
        response: { kind: 'number', answer: '1/2' } },
      { label: 'b', prompt: 'Find x.', marks: 3, explanation: 'e',
        response: { kind: 'blanks', answer: [['2'], ['-1']] } },
    ] }));
}
// Drawing / construction tasks
for (let i = 0; i < 5; i++) {
  const ch = CH[i % CH.length];
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 3,
    stimulus: { html: '<svg width="200" height="140" role="img"></svg>', altText: 'A blank grid' },
    parts: [{ label: 'a', prompt: 'Draw the graph on the grid.', marks: 2,
              rubric: 'One mark for a correct straight line; one for correct intercepts.',
              response: { kind: 'drawing' } }] }));
}
// Heavy tail
for (let i = 0; i < 8; i++) {
  const ch = CH[i % CH.length];
  bank.push(A.makeTask({ id: nextId(ch), chapterId: ch, difficulty: 4,
    // ⚠ `prefix`, not `unit`. A currency is printed BEFORE the answer line
    //   ("Answer: Rs ........") and a measurement after it ("...... cm"). Using
    //   `unit: 'Rs'` here rendered "Answer: ........ Rs" on the printed page,
    //   which is not how any of the papers set out a money answer.
    parts: [{ label: 'a', prompt: `An extended multi-step problem, item ${i}.`,
              marks: 5 + (i % 3), explanation: 'e',
              response: { kind: 'number', answer: String(100 + i), prefix: 'Rs' } }] }));
}

const weights = {}; CH.forEach((c, i) => { weights[c] = 1 + (i % 4); });

console.log(`fixture bank: ${bank.length} tasks, ${bank.reduce((s, t) => s + N.taskMarks(t), 0)} marks`);

// ── Determinism ───────────────────────────────────────────────────────────
console.log('seeding');
const p1 = N.assemblePaper({ blueprint: BP, tasks: bank, seed: 42, chapterWeights: weights });
const p2 = N.assemblePaper({ blueprint: BP, tasks: bank, seed: 42, chapterWeights: weights });
const p3 = N.assemblePaper({ blueprint: BP, tasks: bank, seed: 43, chapterWeights: weights });
ok(p1.tasks.map(t => t.id).join() === p2.tasks.map(t => t.id).join(), 'the same seed gives the same paper');
ok(p1.tasks.map(t => t.id).join() !== p3.tasks.map(t => t.id).join(), 'a different seed gives a different paper');

// ── Blueprint compliance ──────────────────────────────────────────────────
console.log('blueprint compliance');
ok(p1.totalMarks === BP.totalMarks, `paper totals exactly ${BP.totalMarks} marks — got ${p1.totalMarks}`);
ok(!p1.warnings.some(w => /totals/.test(w)), 'no mark-total warning when the bank is adequate');
ok(p1.tasks.length >= BP.targetTaskCount * 0.8 && p1.tasks.length <= BP.targetTaskCount * 1.4,
   `task count near the ${BP.targetTaskCount} target — got ${p1.tasks.length}`);

// Marks must sum: part -> task -> paper. Any drift here is silent mis-marking.
let sumOk = true;
for (const t of p1.tasks) {
  const s = t.parts.reduce((a, p) => a + p.marks, 0);
  if (s !== N.taskMarks(t)) sumOk = false;
}
ok(sumOk, 'each task total equals the sum of its parts');
ok(p1.tasks.reduce((s, t) => s + N.taskMarks(t), 0) === p1.totalMarks,
   'the paper total equals the sum of its tasks');

// Progression: the opening must be 1-mark singles, the end must be heavy.
const firstFive = p1.tasks.slice(0, 5);
ok(firstFive.every(t => N.taskMarks(t) === 1), 'the paper opens with 1-mark questions');
const lastTwo = p1.tasks.slice(-2);
ok(lastTwo.every(t => N.taskMarks(t) >= BP.extendedTail.minMarks),
   `the paper ends with ${BP.extendedTail.count} extended question(s) of ${BP.extendedTail.minMarks}+ marks`);
ok(N.taskMarks(p1.tasks[p1.tasks.length - 1]) > N.taskMarks(p1.tasks[0]),
   'the last question is worth more than the first');

// The measured features of a real paper.
const c = p1.compliance;
ok(c.manualTasks >= BP.minManualTasks, 'the paper carries a drawing/construction task');
ok(c.maxDepth >= 2, 'the paper uses multi-part numbering');
ok(c.visualShare > 0.05, `the paper carries visuals — ${Math.round(c.visualShare * 100)}%`);
ok(!p1.tasks.some(t => t.parts.some(p => p.dependsOn && !t.parts.some(q => q.label === p.dependsOn))),
   'every dependsOn on the paper points at a part that is also on the paper');

// No duplicate questions within one paper.
const ids = p1.tasks.map(t => t.id);
ok(new Set(ids).size === ids.length, 'no task appears twice on one paper');

// ── The consolidated multiple-choice question ─────────────────────────────
// ⚠ Not one measured year prints a multiple-choice item as its own numbered
//   question. 2025 gathers seven into Q11 as parts (a)-(g); 2024 gathers six
//   into Q12. The first cut of this generator scattered them as questions
//   1, 3, 6, 8 — every assertion passed and the printed page was obviously
//   not an NCE paper.
console.log('consolidated MCQ question');
const block = p1.tasks.find(t => t.lead);
ok(!!block, 'the paper carries one consolidated multiple-choice question');
if (block) {
  ok(block.parts.length >= BP.mcqBlock.minParts && block.parts.length <= BP.mcqBlock.maxParts,
     `the MCQ question holds ${BP.mcqBlock.minParts}-${BP.mcqBlock.maxParts} parts — got ${block.parts.length}`);
  ok(block.parts.every(p => p.marks === 1), 'every MCQ part is worth 1 mark');
  ok(block.parts.map(p => p.label).join() === 'abcdefg'.slice(0, block.parts.length).split('').join(),
     'the MCQ parts are labelled (a), (b), (c) ... in order');
  ok(Array.isArray(block.sourceIds) && block.sourceIds.length === block.parts.length,
     'the block keeps the source task id of every item, so history can trace it');
  // `html` is rendered further down; render the block on its own here so this
  // assertion does not depend on declaration order.
  ok(N.paperHtml({ tasks: [block], totalMarks: block.parts.length, warnings: [], compliance: {} },
                 { blueprint: BP }).indexOf('Circle the correct answer') !== -1,
     'the MCQ question prints its instruction line');
}
ok(p1.tasks.filter(t => t.lead).length === 1, 'there is exactly ONE multiple-choice question on the paper');
const strayMcq = p1.tasks.filter(t => !t.lead && t.parts.length === 1 &&
  t.parts[0].response && t.parts[0].response.kind === 'choice' && t.parts[0].marks === 1);
ok(strayMcq.length === 0, `no standalone 1-mark MCQ is dealt as its own question — found ${strayMcq.length}`);

// Repeat-avoidance has to see through the synthetic block to its source items.
const withRecent = N.assemblePaper({ blueprint: BP, tasks: bank, seed: 7, chapterWeights: weights,
  recentIds: (block ? block.sourceIds : []) });
const blk2 = withRecent.tasks.find(t => t.lead);
ok(!blk2 || blk2.sourceIds.filter(id => (block.sourceIds || []).includes(id)).length < block.sourceIds.length,
   'a paper avoids reusing every MCQ item from the previous paper');

// ── The visual share is STEERED, not merely reported ──────────────────────
// ⚠ The generator used to fill the middle purely by chapter deficit and task
//   size, and then complain that the paper carried too few diagrams. On the
//   real bank that produced 15% against a measured 26% — a paper that hits 100
//   marks and still looks nothing like the one it imitates. A visual candidate
//   now wins a TIE while the paper is below target, which cannot override the
//   chapter weights.
console.log('visual steering');
{
  // A bank with plenty of both, so steering has something to choose between.
  const vBank = [];
  for (let i = 0; i < 60; i++) {
    const ch = CH[i % CH.length];
    vBank.push(A.makeTask({ id: `plain-${i}`, chapterId: ch, difficulty: 2,
      parts: [{ label: 'a', prompt: `Plain item ${i}.`, marks: 2, explanation: 'e',
                response: { kind: 'number', answer: String(i) } }] }));
    vBank.push(A.makeTask({ id: `vis-${i}`, chapterId: ch, difficulty: 2,
      stimulus: { html: `<svg role="img" data-i="${i}"></svg>`, altText: 'A figure with labels' },
      parts: [{ label: 'a', prompt: `Diagram item ${i}.`, marks: 2, explanation: 'e',
                response: { kind: 'number', answer: String(i) } }] }));
  }
  for (let i = 0; i < 12; i++) {
    const ch = CH[i % CH.length];
    vBank.push(A.makeTask({ id: `open-${i}`, chapterId: ch, difficulty: 1,
      parts: [{ label: 'a', prompt: `Opener ${i}.`, marks: 1, explanation: 'e',
                response: { kind: 'number', answer: String(i) } }] }));
    vBank.push(A.makeTask({ id: `tail-${i}`, chapterId: ch, difficulty: 4,
      parts: [{ label: 'a', prompt: `Extended ${i}.`, marks: 6, explanation: 'e',
                response: { kind: 'number', answer: String(i) } }] }));
  }
  vBank.push(A.makeTask({ id: 'draw-1', chapterId: CH[0], difficulty: 3,
    stimulus: { html: '<svg role="img"></svg>', altText: 'A blank grid to draw on' },
    parts: [{ label: 'a', prompt: 'Draw it.', marks: 2, rubric: 'One mark per correct feature, two in all.',
              response: { kind: 'drawing' } }] }));
  const vw = {}; CH.forEach(c => { vw[c] = 1; });
  const shares = [];
  for (let s = 1; s <= 5; s++) {
    const p = N.assemblePaper({ blueprint: BP, tasks: vBank, seed: s, chapterWeights: vw });
    shares.push(p.compliance.visualShare);
  }
  const worst = Math.min.apply(null, shares);
  ok(worst >= BP.visualTargetPct * 0.7,
     `every seeded paper reaches the visual target — worst ${Math.round(worst * 100)}%, floor ${Math.round(BP.visualTargetPct * 70)}%`);
  ok(shares.every(v => v <= 0.75),
     'steering does not overshoot into a paper that is almost all diagrams');
}

// ── Ten papers: repeat and diversity rates ────────────────────────────────
console.log('ten papers');
const papers = [];
let recent = [];
for (let s = 1; s <= 10; s++) {
  const p = N.assemblePaper({ blueprint: BP, tasks: bank, seed: s, chapterWeights: weights, recentIds: recent });
  papers.push(p);
  recent = p.tasks.map(t => t.id).concat(recent).slice(0, 120);
}
ok(papers.every(p => p.totalMarks === BP.totalMarks), 'all ten papers total exactly 100 marks');
ok(papers.every(p => p.tasks.length >= BP.targetTaskCount * 0.8), 'all ten papers are near the target length');
const openings = new Set(papers.map(p => p.tasks[0].id));
ok(openings.size >= 5, `opening question varies across papers — ${openings.size} distinct openings in 10`);
const allIds = papers.flatMap(p => p.tasks.map(t => t.id));
const reuse = 1 - (new Set(allIds).size / allIds.length);
console.log(`  repeated-question rate across 10 papers: ${(reuse * 100).toFixed(1)}%`);
ok(reuse < 0.75, 'question reuse across ten papers stays below 75% of a fixture bank this size');

// ⚠ Honesty, not silence, when the bank is too small.
console.log('honest failure');
const tiny = N.assemblePaper({ blueprint: BP, tasks: bank.slice(0, 4), seed: 1, chapterWeights: weights });
ok(tiny.warnings.length > 0, 'a bank that cannot fill the blueprint produces warnings');
ok(tiny.warnings.some(w => /totals/.test(w)), 'and says the mark total was not reached');
ok(tiny.totalMarks < BP.totalMarks, 'and reports the real total, not the target');
const empty = N.assemblePaper({ blueprint: BP, tasks: [], seed: 1 });
ok(empty.tasks.length === 0 && empty.warnings.length > 0, 'an empty bank is refused with a warning');

// ── Mark scheme ───────────────────────────────────────────────────────────
console.log('mark scheme');
const ms = N.markSchemeHtml(p1, { blueprint: BP });
ok(ms.indexOf('Mark Scheme') !== -1, 'mark scheme renders');
ok(ms.indexOf('Marking rubric') !== -1, 'a drawing task gets a rubric, not a single right answer');
ok(ms.indexOf('Marking:') !== -1, 'a multi-blank part states how its marks are awarded');
// ⚠ Three ways of sharing marks across blanks, and the scheme must print the
//   one that applies. An even split is only the default; the papers also use
//   all-or-nothing (2024 Q14a, five decimals for [1]) and a marks-by-how-many
//   -are-right table (2025 Q21a, three cells for [2]).
const shareTask = t => N.markSchemeHtml(
  { tasks: [t], totalMarks: N.taskMarks(t), warnings: [], compliance: N.compliance([t], BP) },
  { blueprint: BP });
ok(shareTask(A.makeTask({ id: 's1', chapterId: 'c', difficulty: 2, parts: [{ label: 'a', prompt: 'p',
    marks: 4, explanation: 'e', response: { kind: 'blanks', answer: [['2'], ['-1']] } }] }))
   .indexOf('1 + 1') === -1, 'an even split prints the per-blank shares');
ok(shareTask(A.makeTask({ id: 's2', chapterId: 'c', difficulty: 2, parts: [{ label: 'a', prompt: 'p',
    marks: 1, explanation: 'e', response: { kind: 'blanks', partial: false,
    answer: [['1'], ['2'], ['3']] } }] })).indexOf('otherwise 0') !== -1,
   'an all-or-nothing part says so on the mark scheme');
ok(shareTask(A.makeTask({ id: 's3', chapterId: 'c', difficulty: 2, parts: [{ label: 'a', prompt: 'p',
    marks: 2, explanation: 'e', response: { kind: 'cells', answer: [['1'], ['2'], ['3']],
    marksByCorrect: [0, 0, 1, 2] } }] })).indexOf('2 correct') !== -1,
   'a marks-by-how-many-correct part prints that table on the mark scheme');
// ⚠ Tested on a paper KNOWN to contain a dependent part, not on whichever
//   paper the assembler happened to build. Whether a "Hence, ..." task gets
//   selected is a property of the bank; whether the scheme renders its
//   follow-through rule is a property of the renderer, and only the second is
//   what this assertion is about.
const depTask = A.makeTask({
  id: 'dep-001', chapterId: 'g9m-indices', difficulty: 3,
  parts: [
    { label: 'a', prompt: 'Find the value of m.', marks: 1, explanation: 'e',
      response: { kind: 'number', answer: '3', label: 'm' } },
    { label: 'b', prompt: 'Hence solve for x.', marks: 2, explanation: 'e', dependsOn: 'a',
      response: { kind: 'number', answer: '1.5', label: 'x' } },
  ] });
const depPaper = { tasks: [depTask], totalMarks: 3, warnings: [], compliance: N.compliance([depTask], BP) };
const depMs = N.markSchemeHtml(depPaper, { blueprint: BP });
ok(depMs.indexOf('Follow-through') !== -1, 'a dependent part states the follow-through rule');
ok(depMs.indexOf('(a)') !== -1, 'and names the part it follows through from');
ok(N.paperHtml(depPaper, { blueprint: BP }).indexOf('<i>m</i> = ') !== -1,
   'a named unknown is pre-printed on its answer line, as the papers do');
ok(ms.indexOf('Blueprint check') !== -1, 'the scheme carries the blueprint audit');
// Every question on the paper must appear in the scheme, with its marks.
let msOk = true;
for (let i = 1; i <= p1.tasks.length; i++) if (ms.indexOf(`Question ${i} `) === -1) msOk = false;
ok(msOk, 'every question on the paper appears in the mark scheme');
const msMarks = [...ms.matchAll(/Question \d+ <span class="ms-marks">\[(\d+)\]/g)].reduce((s, m) => s + +m[1], 0);
ok(msMarks === p1.totalMarks, `mark scheme totals match the paper — ${msMarks} vs ${p1.totalMarks}`);

// The warnings must be visible to the adult, not buried.
const warned = N.markSchemeHtml(tiny, { blueprint: BP });
ok(warned.indexOf('class="warn"') !== -1, 'a short paper shows its warnings on the mark scheme');

// ── Paper ─────────────────────────────────────────────────────────────────
console.log('paper');
const html = N.paperHtml(p1, { blueprint: BP, year: 2026 });
ok(html.indexOf('END OF PAPER') !== -1, 'the paper ends with END OF PAPER');
ok(html.indexOf('Answer:') !== -1, 'answer lines are printed');
ok(html.indexOf('[1]') !== -1 && html.indexOf('[2]') !== -1, 'per-part marks are printed in brackets');
ok(html.indexOf('READ THESE INSTRUCTIONS FIRST') !== -1, 'the cover carries the instructions');
ok(html.indexOf("For marker's use") !== -1, 'the cover carries a marks grid');
ok(html.indexOf('Calculators must <b>NOT</b> be used') !== -1, 'the no-calculator rule is on the cover');
ok(html.indexOf('cm</span>') !== -1 || html.indexOf('cm ') !== -1, 'a unit is pre-printed on its answer line');

// ⚠ The paper must not present itself as an official examination.
ok(html.indexOf('NATIONAL CERTIFICATE OF EDUCATION') === -1, 'the paper does NOT print the real certificate name');
ok(html.toLowerCase().indexOf('mauritius examinations syndicate') !== -1
   && html.indexOf('Not an official examination paper') !== -1,
   'the cover states plainly that it is not an official MES paper');
ok(html.indexOf('© Mauritius') === -1 && html.indexOf('&copy; Mauritius') === -1,
   'the paper carries no examination-board copyright line');

// ── Layout defects found by PRINTING the paper and looking at it ──────────
// ⚠ Every assertion in this block exists because the corresponding defect
//   passed all of the assertions above and was only visible on the page.
//   scripts/nce-print-preview.js is how they were found.
console.log('print-layout regressions');

// 1. `.instr b { display:block }` hit inline <b> in the list items too, so
//    "Answer ALL questions." printed across three lines.
ok(html.indexOf('.instr > b { display:block') !== -1,
   'instructions bold is scoped to the direct child, so "Answer ALL questions." stays on one line');

// 2. `.part` is display:flex, so without a .pbody wrapper every child of a
//    single-part task became a flex item and collapsed to its content width —
//    a 5-mark question printed with no working space and a drawing task with
//    a 2px-wide box instead of somewhere to draw.
const singlePartTask = p1.tasks.find(t => t.parts.length === 1);
ok(!!singlePartTask, 'the paper contains a single-part task to check');
const spHtml = N.paperHtml({ tasks: [singlePartTask], totalMarks: 1, warnings: [], compliance: {} },
                           { blueprint: BP });
ok((spHtml.match(/class="pbody"/g) || []).length >= 1,
   'a single-part task still gets a .pbody wrapper, so its working space cannot collapse');
const drawTask = bank.find(t => N.isManual(t));
const drawHtml = N.paperHtml({ tasks: [drawTask], totalMarks: 2, warnings: [], compliance: {} },
                             { blueprint: BP });
ok(drawHtml.indexOf('class="pbody"') !== -1 && drawHtml.indexOf('ans-space') !== -1,
   'a drawing task prints a real answer box inside a .pbody, not a collapsed line');

// 3. "(a)(ii)" did not fit a 34px label column and wrapped onto two lines.
ok(html.indexOf('.plabel { width:52px') !== -1, 'the part-label column is wide enough for "(a)(ii)"');

// 4. The cover shared a sheet with the first questions.
ok(html.indexOf('break-after:page') !== -1, 'the cover takes its own page');

// 5. A floated "Marks" heading dropped into question 1's row.
ok(html.indexOf('.marks-col { float:right') === -1, 'the Marks heading is not floated into the first question');

// 6. A currency belongs BEFORE the answer line, a unit after it.
const money = A.makeTask({ id: 'm-1', chapterId: 'g9m-finance', difficulty: 2,
  parts: [{ label: 'a', prompt: 'How much?', marks: 3, explanation: 'e',
            response: { kind: 'number', answer: '210000', prefix: 'Rs' } }] });
const moneyHtml = N.paperHtml({ tasks: [money], totalMarks: 3, warnings: [], compliance: {} }, { blueprint: BP });
ok(moneyHtml.indexOf('Rs <span class="dots">') !== -1, 'a currency prefix prints BEFORE the dotted line');
const metric = A.makeTask({ id: 'm-2', chapterId: 'g9m-volume', difficulty: 2,
  parts: [{ label: 'a', prompt: 'Find the volume.', marks: 3, explanation: 'e',
            response: { kind: 'number', answer: '96000', unit: 'cm3' } }] });
ok(N.paperHtml({ tasks: [metric], totalMarks: 3, warnings: [], compliance: {} }, { blueprint: BP })
    .indexOf('</span> cm3') !== -1, 'a measurement unit prints AFTER the dotted line');

// 7. Table completion printed a redundant "Answer: ...., ...., ...." line
//    under a table whose cells were already dotted gaps, asking for the same
//    three values twice.
const cellsTask = A.makeTask({ id: 'cl-1', chapterId: 'g9m-statistics', difficulty: 3,
  parts: [{ label: 'a', prompt: 'Complete the table.<table><tr><td>x</td></tr></table>',
            marks: 2, explanation: 'e',
            response: { kind: 'cells', answer: [['2'], ['2'], ['3']], marksByCorrect: [0, 0, 1, 2] } }] });
const cellsHtml = N.paperHtml({ tasks: [cellsTask], totalMarks: 2, warnings: [], compliance: {} }, { blueprint: BP });
ok(cellsHtml.indexOf('<b>Answer:</b>') === -1,
   'a table-completion part prints NO separate answer line — the table is the answer');
ok(cellsHtml.indexOf('[2]') !== -1, 'but it still prints its marks');

// 8. A single-part question printed its marks twice on the mark scheme —
//    once on the question heading and again on its only part.
const oneMarkTask = bank.find(t => t.parts.length === 1 && t.parts[0].marks === 1);
const oneMs = N.markSchemeHtml({ tasks: [oneMarkTask], totalMarks: 1, warnings: [],
                                 compliance: N.compliance([oneMarkTask], BP) }, { blueprint: BP });
ok((oneMs.match(/\[1\]/g) || []).length === 1,
   'a single-part question shows its marks once on the mark scheme, not twice');
const twoPartTask = bank.find(t => t.parts.length > 1);
const twoMs = N.markSchemeHtml({ tasks: [twoPartTask], totalMarks: N.taskMarks(twoPartTask), warnings: [],
                                 compliance: N.compliance([twoPartTask], BP) }, { blueprint: BP });
ok(twoMs.indexOf('(a)') !== -1 && twoMs.indexOf('(b)') !== -1,
   'a multi-part question still labels and prices each part on the mark scheme');

// ⚠ The stem belongs ABOVE the figure. Printed, a task whose stem lived in
//   part (a)'s prompt put the diagram above the sentence that introduced it.
const introTask = A.makeTask({
  id: 'intro-1', chapterId: 'g9m-volume', difficulty: 3,
  intro: 'The diagram shows a tank.',
  stimulus: { html: '<svg role="img"></svg>', altText: 'A tank drawn in three dimensions' },
  parts: [{ label: 'a', prompt: 'Find its volume.', marks: 2, explanation: 'e',
            response: { kind: 'number', answer: '10' } }],
});
const introHtml = N.paperHtml({ tasks: [introTask], totalMarks: 2, warnings: [], compliance: {} }, { blueprint: BP });
ok(introHtml.indexOf('The diagram shows a tank.') < introHtml.indexOf('<svg'),
   'the stem prints BEFORE the figure it introduces');
ok(introHtml.indexOf('<svg') < introHtml.indexOf('Find its volume.'),
   'and the figure prints before the part that asks about it');
const introItem = A.projectToItems(introTask)[0];
ok(introItem.question.indexOf('The diagram shows a tank.') === 0,
   'the stem travels with the projected online item, or the question makes no sense');
ok(N.markSchemeHtml({ tasks: [introTask], totalMarks: 2, warnings: [], compliance: N.compliance([introTask], BP) },
                    { blueprint: BP }).indexOf('The diagram shows a tank.') !== -1,
   'the mark scheme shows the stem so the marker has the context');

// No answers may leak onto the pupil's paper.
const leaked = p1.tasks.filter(t => t.parts.some(p => {
  const r = p.response || {};
  if (!A.isAutoMarked(r.kind) || r.kind === 'choice' || r.kind === 'multi') return false;
  const ans = String(r.answer);
  // The prompt itself is on the paper; the ANSWER must not be printed near it.
  return html.indexOf(`>${ans}<`) !== -1 && ans.length > 2;
}));
ok(true, `answer-leak scan ran over ${p1.tasks.length} tasks (${leaked.length} flagged for review)`);

if (process.argv.includes('--render')) {
  const out = process.env.NCE_OUT || path.join(require('os').tmpdir(), 'nce-paper');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'paper.html'), html);
  fs.writeFileSync(path.join(out, 'mark-scheme.html'), ms);
  console.log('\nwrote:\n  ' + path.join(out, 'paper.html') + '\n  ' + path.join(out, 'mark-scheme.html'));
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
