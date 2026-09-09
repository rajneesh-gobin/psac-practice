'use strict';
// Grade 1 Maths — short word problems, 12 per chapter, four situations each.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09 with `scripts/audit-difficulty-labels.js`:
//
//   grade1-maths   468 items   L1 384   L2 84   L3 0   L4 0
//
// Not one question in the pack asked a child to do anything but recall or
// compute a bare sum. 31% of it was `# + # = ?` and `# − # = ?` repeated
// (runs of 35 and 36). Drill is right for six-year-olds and those files stay —
// but a child who can add needs somewhere to find out that adding is FOR
// something.
//
// ⚠ THE CEILING HERE IS L3, ON PURPOSE. "L4 = word problems" is the maths rule,
//   and by that letter a one-step Grade 1 story would qualify — which is exactly
//   the dilution that put twenty two-step items at L4 in grade5-maths. A
//   six-year-old adding three birds to two birds is L2. L3 is reserved for the
//   two genuinely harder moves at this age: working backwards to a missing
//   number, and comparing two quantities.
//
// ⚠ SENTENCES STAY SHORT. The reader assumes a child can read the question and
//   all the options; at Grade 1 that assumption is doing most of the work. One
//   clause, one number each, no subordinate clauses. See the picture-first note
//   in ENGINEERING-NOTES — this file does not solve that, it just does not make
//   it worse.
//
// ⚠ Numbers stay inside 20, matching the chapter names.

(function () {
  const add = (chapterId, subsection, key, n, question, answer, hint, explanation, difficulty) => {
    const q = makeNum({ id: `g1m-rsn-${key}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty, question, answer: String(answer), hint, explanation });
    if (q.acceptableAnswers && q.acceptableAnswers.length === 1
        && q.acceptableAnswers[0] === q.answer) delete q.acceptableAnswers;
    STATIC_QUESTIONS.push(q);
  };

  for (let n = 1; n <= 12; n++) {
    const s = n % 4;

    { // Numbers to 20 — counting on, ordering, and one comparison
      if (s === 0) {
        const a = 6 + n, b = 3 + (n % 5);
        add('g1mth-numbers', 'counting_ordering', 'num', n,
          `Sam has <b>${a}</b> shells. Ana has <b>${b}</b> shells. Who has more, and how many more?`,
          a - b, 'Take the smaller number away from the bigger one.',
          `${a} − ${b} = <b>${a - b}</b>. Sam has ${a - b} more.`, 3);
      } else if (s === 1) {
        const start = 4 + n;
        add('g1mth-numbers', 'counting_ordering', 'num', n,
          `Count on <b>3</b> from <b>${start}</b>. What number do you reach?`,
          start + 3, 'Count 3 more after the number.',
          `${start}, ${start + 1}, ${start + 2}, <b>${start + 3}</b>.`, 2);
      } else if (s === 2) {
        const a = 10 + n;
        add('g1mth-numbers', 'odd_even', 'num', n,
          `There are <b>${a}</b> socks. Can they all be put into pairs with none left over? Answer <b>1</b> for yes, <b>0</b> for no.`,
          a % 2 === 0 ? 1 : 0, 'Pairs need an even number.',
          `${a} is ${a % 2 === 0 ? 'even, so every sock has a partner' : 'odd, so one sock is left over'}. Answer <b>${a % 2 === 0 ? 1 : 0}</b>.`, 3);
      } else {
        const a = 8 + n;
        add('g1mth-numbers', 'number_words', 'num', n,
          `A book has <b>${a}</b> pages. Ravi reads <b>1</b> page. How many pages are not read?`,
          a - 1, 'One less than the number of pages.',
          `${a} − 1 = <b>${a - 1}</b>.`, 2);
      }
    }

    { // Addition — a story, then a missing addend
      if (s === 0) {
        const a = 3 + n, b = 2 + (n % 6);
        add('g1mth-addition', 'adding_within_20', 'add', n,
          `<b>${a}</b> birds sit on a wall. <b>${b}</b> more birds come. How many birds now?`,
          a + b, 'Put the two groups together.',
          `${a} + ${b} = <b>${a + b}</b>.`, 2);
      } else if (s === 1) {
        const total = 12 + n, part = 4 + (n % 5);
        add('g1mth-addition', 'number_sentences', 'add', n,
          `Meera has <b>${part}</b> beads. She needs <b>${total}</b> altogether. How many more beads does she need?`,
          total - part, 'Count up from the beads she has to the beads she needs.',
          `${part} + ? = ${total}, so ? = ${total} − ${part} = <b>${total - part}</b>.`, 3);
      } else if (s === 2) {
        const a = 2 + (n % 5), b = 3 + (n % 4), c = 1 + (n % 3);
        add('g1mth-addition', 'adding_within_20', 'add', n,
          `A box has <b>${a}</b> red pens, <b>${b}</b> blue pens and <b>${c}</b> green pens. How many pens in all?`,
          a + b + c, 'Add all three groups.',
          `${a} + ${b} + ${c} = <b>${a + b + c}</b>.`, 3);
      } else {
        const a = 5 + n;
        add('g1mth-addition', 'adding_within_10', 'add', n,
          `Tom has <b>${a}</b> marbles. He finds <b>2</b> more. How many now?`,
          a + 2, 'Two more than what he had.',
          `${a} + 2 = <b>${a + 2}</b>.`, 2);
      }
    }

    { // Subtraction — taking away, and the reverse
      if (s === 0) {
        const a = 10 + n, b = 3 + (n % 6);
        add('g1mth-subtraction', 'subtracting_within_20', 'sub', n,
          `There are <b>${a}</b> apples. <b>${b}</b> are eaten. How many are left?`,
          a - b, 'Take away the ones eaten.',
          `${a} − ${b} = <b>${a - b}</b>.`, 2);
      } else if (s === 1) {
        const start = 14 + (n % 6), left = 5 + (n % 4);
        add('g1mth-subtraction', 'missing_numbers', 'sub', n,
          `A jar had <b>${start}</b> sweets. Now there are <b>${left}</b>. How many were taken?`,
          start - left, 'How many were taken away to get from the first number to the second?',
          `${start} − ? = ${left}, so ? = ${start} − ${left} = <b>${start - left}</b>.`, 3);
      } else if (s === 2) {
        const a = 9 + (n % 8), b = 4 + (n % 5);
        add('g1mth-subtraction', 'subtracting_within_20', 'sub', n,
          `Lina has <b>${a}</b> stickers. Ben has <b>${b}</b>. How many more does Lina have?`,
          a - b, 'Find the difference between the two numbers.',
          `${a} − ${b} = <b>${a - b}</b>.`, 3);
      } else {
        const a = 8 + (n % 9);
        add('g1mth-subtraction', 'subtracting_within_10', 'sub', n,
          `<b>${a}</b> ducks are on a pond. <b>3</b> swim away. How many stay?`,
          a - 3, 'Three fewer.',
          `${a} − 3 = <b>${a - 3}</b>.`, 2);
      }
    }

    { // Shapes and Space — counting a property, not naming a shape
      if (s === 0) {
        const t = 2 + (n % 4);
        add('g1mth-shapes', '2d_shapes', 'shp', n,
          `A picture has <b>${t}</b> triangles. How many corners are there altogether?`,
          t * 3, 'A triangle has 3 corners.',
          `${t} × 3 = <b>${t * 3}</b> corners.`, 3);
      } else if (s === 1) {
        const sq = 2 + (n % 3);
        add('g1mth-shapes', 'properties_shapes', 'shp', n,
          `<b>${sq}</b> squares are drawn. How many sides are there altogether?`,
          sq * 4, 'A square has 4 sides.',
          `${sq} × 4 = <b>${sq * 4}</b> sides.`, 3);
      } else if (s === 2) {
        const a = 3 + (n % 5), b = 2 + (n % 4);
        add('g1mth-shapes', '2d_shapes', 'shp', n,
          `A box holds <b>${a}</b> circles and <b>${b}</b> squares. How many shapes are in the box?`,
          a + b, 'Add the two kinds of shape.',
          `${a} + ${b} = <b>${a + b}</b>.`, 2);
      } else {
        const steps = 4 + (n % 6);
        add('g1mth-shapes', 'position_direction', 'shp', n,
          `A frog takes <b>${steps}</b> hops forward, then <b>2</b> hops back. How many hops forward is it now?`,
          steps - 2, 'Forward hops take away the hops back.',
          `${steps} − 2 = <b>${steps - 2}</b>.`, 3);
      }
    }

    { // Measurement — comparing, which is what a Grade 1 measure question is
      if (s === 0) {
        const a = 8 + n, b = 4 + (n % 5);
        add('g1mth-measurement', 'comparing_length', 'mea', n,
          `A red ribbon is <b>${a}</b> cm. A blue one is <b>${b}</b> cm. How much longer is the red one?`,
          a - b, 'Take the shorter length from the longer one.',
          `${a} − ${b} = <b>${a - b}</b> cm.`, 3);
      } else if (s === 1) {
        const a = 5 + (n % 6), b = 3 + (n % 4);
        add('g1mth-measurement', 'comparing_mass', 'mea', n,
          `A bag holds <b>${a}</b> kg. Another holds <b>${b}</b> kg. What do both weigh together?`,
          a + b, 'Add the two masses.',
          `${a} + ${b} = <b>${a + b}</b> kg.`, 2);
      } else if (s === 2) {
        const cups = 6 + (n % 7);
        add('g1mth-measurement', 'comparing_capacity', 'mea', n,
          `A jug fills <b>${cups}</b> cups. <b>4</b> cups are drunk. How many cups are left?`,
          cups - 4, 'Four fewer cups.',
          `${cups} − 4 = <b>${cups - 4}</b>.`, 2);
      } else {
        const a = 10 + (n % 8);
        add('g1mth-measurement', 'comparing_length', 'mea', n,
          `A pencil is <b>${a}</b> cm. A crayon is <b>3</b> cm shorter. How long is the crayon?`,
          a - 3, 'Shorter means take away.',
          `${a} − 3 = <b>${a - 3}</b> cm.`, 3);
      }
    }

    { // Patterns — continue it, or find the step
      if (s === 0) {
        const start = 2 + n, step = 2;
        add('g1mth-patterns', 'number_patterns', 'pat', n,
          `A pattern goes <b>${start}</b>, <b>${start + step}</b>, <b>${start + 2 * step}</b>, … What comes next?`,
          start + 3 * step, 'The numbers go up by the same amount each time.',
          `They go up by ${step}. Next is ${start + 2 * step} + ${step} = <b>${start + 3 * step}</b>.`, 2);
      } else if (s === 1) {
        const start = 3 + n, step = 3;
        add('g1mth-patterns', 'number_patterns', 'pat', n,
          `A pattern goes <b>${start}</b>, <b>${start + step}</b>, <b>${start + 2 * step}</b>, … By how much does it go up each time?`,
          step, 'Look at the gap between two numbers next to each other.',
          `${start + step} − ${start} = <b>${step}</b>.`, 3);
      } else if (s === 2) {
        const start = 18 - (n % 6);
        add('g1mth-patterns', 'number_patterns', 'pat', n,
          `Count back in 2s: <b>${start}</b>, <b>${start - 2}</b>, <b>${start - 4}</b>, … What is the next number?`,
          start - 6, 'This pattern goes down by 2.',
          `${start - 4} − 2 = <b>${start - 6}</b>.`, 3);
      } else {
        const reps = 3 + (n % 4);
        add('g1mth-patterns', 'repeating_patterns', 'pat', n,
          `A pattern is red, blue, red, blue, … repeated <b>${reps}</b> times. How many beads is that?`,
          reps * 2, 'Each repeat uses 2 beads.',
          `${reps} × 2 = <b>${reps * 2}</b>.`, 3);
      }
    }
  }
})();
