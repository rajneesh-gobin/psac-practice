'use strict';
// Grade 2 Maths — word problems, 12 per chapter, four situations each.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09 with `scripts/audit-difficulty-labels.js`:
//
//   grade2-maths   499 items   L1 319   L2 166   L3 14   L4 0
//
// Fourteen reasoning items across eight chapters, and 30% of the pack was
// `# + # = ?` / `# − # = ?` / `# × # = ?` repeated (runs of 28, 27 and 22).
// The drills stay — a seven-year-old needs them — but they were nearly all
// there was.
//
// ⚠ CEILING IS L4, but earned: L4 here means TWO steps where the second is a
//   different operation from the first, or a quantity the question never
//   states. A one-step story is L2. See the grade5-maths bank for what the
//   dilution looks like when that line is not held.
// ⚠ Numbers stay inside 100 and multiplication stays in the 2, 5 and 10 tables,
//   matching the chapter names.
// ⚠ Every division must come out exact.

(function () {
  const add = (chapterId, subsection, key, n, question, answer, hint, explanation, difficulty) => {
    const q = makeNum({ id: `g2m-rsn-${key}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty, question, answer: String(answer), hint, explanation });
    if (q.acceptableAnswers && q.acceptableAnswers.length === 1
        && q.acceptableAnswers[0] === q.answer) delete q.acceptableAnswers;
    STATIC_QUESTIONS.push(q);
  };

  for (let n = 1; n <= 12; n++) {
    const s = n % 4;

    { // Numbers to 100
      if (s === 0) {
        const t = 3 + (n % 7), u = 2 + (n % 8);
        add('g2mth-numbers', 'place_value', 'num', n,
          `A number has <b>${t}</b> tens and <b>${u}</b> units. What is <b>10 more</b> than it?`,
          t * 10 + u + 10, 'Build the number first, then add ten.',
          `The number is ${t * 10 + u}. ${t * 10 + u} + 10 = <b>${t * 10 + u + 10}</b>.`, 3);
      } else if (s === 1) {
        const a = 40 + n * 3, b = 20 + n * 2;
        add('g2mth-numbers', 'ordering_comparing', 'num', n,
          `Ravi counted <b>${a}</b> shells and Ann counted <b>${b}</b>. How many more did Ravi count?`,
          a - b, 'Take the smaller number from the bigger one.',
          `${a} − ${b} = <b>${a - b}</b>.`, 2);
      } else if (s === 2) {
        const a = 30 + n * 4;
        add('g2mth-numbers', 'odd_even_100', 'num', n,
          `<b>${a}</b> pupils line up in <b>pairs</b>. How many pairs are there?`,
          a / 2, 'Each pair is two pupils.',
          `${a} ÷ 2 = <b>${a / 2}</b> pairs.`, 3);
      } else {
        const a = 25 + n * 5;
        add('g2mth-numbers', 'place_value', 'num', n,
          `Round <b>${a}</b> to the nearest <b>ten</b>.`,
          Math.round(a / 10) * 10, 'Look at the units digit.',
          `${a} rounds to <b>${Math.round(a / 10) * 10}</b>.`, 2);
      }
    }

    { // Addition to 100 — a second step that is not another addition
      if (s === 0) {
        const a = 24 + n * 3, b = 17 + n * 2;
        add('g2mth-addition', 'addition_problems', 'add', n,
          `A shop sells <b>${a}</b> buns on Monday and <b>${b}</b> on Tuesday. How many in the two days?`,
          a + b, 'Add the two days.',
          `${a} + ${b} = <b>${a + b}</b>.`, 2);
      } else if (s === 1) {
        const a = 18 + n * 2, b = 15 + n, target = 60 + n * 5;
        add('g2mth-addition', 'addition_problems', 'add', n,
          `A class collects <b>${a}</b> tins, then <b>${b}</b> more. They want <b>${target}</b> tins. How many more are still needed?`,
          target - a - b, 'Add what they have, then see how far off the target it is.',
          `${a} + ${b} = ${a + b}. ${target} − ${a + b} = <b>${target - a - b}</b>.`, 4);
      } else if (s === 2) {
        const a = 12 + n, b = 9 + n, c = 7 + n;
        add('g2mth-addition', 'mental_addition', 'add', n,
          `Three boxes hold <b>${a}</b>, <b>${b}</b> and <b>${c}</b> pencils. How many pencils altogether?`,
          a + b + c, 'Add all three boxes.',
          `${a} + ${b} + ${c} = <b>${a + b + c}</b>.`, 3);
      } else {
        const total = 55 + n * 3, part = 22 + n;
        add('g2mth-addition', 'column_addition', 'add', n,
          `Two classes have <b>${total}</b> pupils altogether. One class has <b>${part}</b>. How many are in the other?`,
          total - part, 'The two classes add up to the total.',
          `${total} − ${part} = <b>${total - part}</b>.`, 3);
      }
    }

    { // Subtraction to 100
      if (s === 0) {
        const a = 60 + n * 3, b = 24 + n * 2;
        add('g2mth-subtraction', 'subtraction_problems', 'sub', n,
          `A jar holds <b>${a}</b> sweets. <b>${b}</b> are eaten. How many are left?`,
          a - b, 'Take away the ones eaten.',
          `${a} − ${b} = <b>${a - b}</b>.`, 2);
      } else if (s === 1) {
        const start = 80 + n * 2, out = 25 + n, back = 12 + n;
        add('g2mth-subtraction', 'subtraction_problems', 'sub', n,
          `A bus has <b>${start}</b> seats. <b>${out}</b> people get on, then <b>${back}</b> more. How many seats are still empty?`,
          start - out - back, 'Count everybody on board first.',
          `${out} + ${back} = ${out + back} people. ${start} − ${out + back} = <b>${start - out - back}</b>.`, 4);
      } else if (s === 2) {
        const a = 45 + n * 3, b = 28 + n;
        add('g2mth-subtraction', 'mental_subtraction', 'sub', n,
          `Sara has <b>${a}</b> stickers and Jo has <b>${b}</b>. How many more has Sara?`,
          a - b, 'Find the difference.',
          `${a} − ${b} = <b>${a - b}</b>.`, 2);
      } else {
        const had = 70 + n * 2, left = 26 + n;
        add('g2mth-subtraction', 'column_subtraction', 'sub', n,
          `A tank had <b>${had}</b> litres. Now it has <b>${left}</b>. How many litres were used?`,
          had - left, 'The amount used is the difference.',
          `${had} − ${left} = <b>${had - left}</b>.`, 3);
      }
    }

    { // Multiplication — 2s, 5s and 10s only
      if (s === 0) {
        const rows = 2 + (n % 4), per = 5;
        add('g2mth-multiplication', 'times_5_10', 'mul', n,
          `<b>${rows}</b> plates each hold <b>${per}</b> cakes. How many cakes altogether?`,
          rows * per, 'Count in fives.',
          `${rows} × ${per} = <b>${rows * per}</b>.`, 2);
      } else if (s === 1) {
        const bags = 3 + (n % 5), per = 10, given = 5 + (n % 6);
        add('g2mth-multiplication', 'times_5_10', 'mul', n,
          `<b>${bags}</b> bags hold <b>${per}</b> marbles each. <b>${given}</b> marbles are given away. How many are left?`,
          bags * per - given, 'Count all the marbles first, then take some away.',
          `${bags} × ${per} = ${bags * per}. ${bags * per} − ${given} = <b>${bags * per - given}</b>.`, 4);
      } else if (s === 2) {
        const groups = 4 + (n % 5);
        add('g2mth-multiplication', 'repeated_addition', 'mul', n,
          `<b>${groups}</b> children each have <b>2</b> hands. How many hands altogether?`,
          groups * 2, 'Two for each child.',
          `${groups} × 2 = <b>${groups * 2}</b>.`, 2);
      } else {
        const total = 10 * (2 + (n % 5));
        add('g2mth-multiplication', 'times_5_10', 'mul', n,
          `<b>${total}</b> pencils are packed <b>10</b> to a box. How many boxes?`,
          total / 10, 'How many tens make the total?',
          `${total} ÷ 10 = <b>${total / 10}</b>.`, 3);
      }
    }

    { // Fractions — halves and quarters of a real quantity
      if (s === 0) {
        const a = 2 * (6 + n);
        add('g2mth-fractions', 'half', 'fra', n,
          `<b>${a}</b> apples are shared equally between <b>2</b> children. How many does each get?`,
          a / 2, 'Half of the apples each.',
          `${a} ÷ 2 = <b>${a / 2}</b>.`, 2);
      } else if (s === 1) {
        const a = 4 * (3 + n);
        add('g2mth-fractions', 'quarter', 'fra', n,
          `A cake is cut into <b>4</b> equal parts. There are <b>${a}</b> cherries spread evenly over it. How many cherries are on <b>one quarter</b>?`,
          a / 4, 'One quarter is one of four equal parts.',
          `${a} ÷ 4 = <b>${a / 4}</b>.`, 3);
      } else if (s === 2) {
        const a = 2 * (8 + n);
        add('g2mth-fractions', 'half', 'fra', n,
          `<b>${a}</b> children are in a hall. <b>Half</b> go outside. How many are still inside?`,
          a / 2, 'Half stay in.',
          `${a} ÷ 2 = <b>${a / 2}</b>.`, 3);
      } else {
        const a = 4 * (4 + n);
        add('g2mth-fractions', 'comparing_fractions', 'fra', n,
          `<b>${a}</b> sweets are in a bag. Ann eats <b>one quarter</b>. How many sweets are left?`,
          a - a / 4, 'Find a quarter first, then take it off.',
          `${a} ÷ 4 = ${a / 4}. ${a} − ${a / 4} = <b>${a - a / 4}</b>.`, 4);
      }
    }

    { // Measurement — cm/m, kg, litres
      if (s === 0) {
        const a = 40 + n * 5, b = 25 + n * 2;
        add('g2mth-measurement', 'length_cm_m', 'mea', n,
          `A rope is <b>${a}</b> cm. Another is <b>${b}</b> cm. How long are both together?`,
          a + b, 'Add the two lengths.',
          `${a} + ${b} = <b>${a + b}</b> cm.`, 2);
      } else if (s === 1) {
        const m = 2 + (n % 5), cm = 30 + n * 4;
        add('g2mth-measurement', 'length_cm_m', 'mea', n,
          `A ribbon is <b>${m} m</b> long. <b>${cm} cm</b> is cut off. How many <b>centimetres</b> are left?`,
          m * 100 - cm, 'Change metres to centimetres first. 1 m = 100 cm.',
          `${m} m = ${m * 100} cm. ${m * 100} − ${cm} = <b>${m * 100 - cm}</b> cm.`, 4);
      } else if (s === 2) {
        const bags = 3 + (n % 5), kg = 2 + (n % 4);
        add('g2mth-measurement', 'mass_kg', 'mea', n,
          `<b>${bags}</b> bags of rice weigh <b>${kg} kg</b> each. What do they weigh altogether?`,
          bags * kg, 'Multiply the bags by the mass of one.',
          `${bags} × ${kg} = <b>${bags * kg}</b> kg.`, 3);
      } else {
        const total = 20 + n * 2, used = 8 + n;
        add('g2mth-measurement', 'capacity_litres', 'mea', n,
          `A drum holds <b>${total}</b> litres. <b>${used}</b> litres are used. How many litres are left?`,
          total - used, 'Take away what was used.',
          `${total} − ${used} = <b>${total - used}</b> litres.`, 2);
      }
    }

    { // Time — o'clock, half past, days
      if (s === 0) {
        const h = 1 + (n % 9);
        add('g2mth-time', 'oclock_halfpast', 'tim', n,
          `A film starts at <b>${h} o'clock</b> and lasts <b>2</b> hours. At what o'clock does it end? Give the hour only.`,
          h + 2, 'Add two hours to the starting hour.',
          `${h} + 2 = <b>${h + 2}</b> o'clock.`, 2);
      } else if (s === 1) {
        const weeks = 2 + (n % 6);
        add('g2mth-time', 'days_months', 'tim', n,
          `How many <b>days</b> are there in <b>${weeks}</b> weeks?`,
          weeks * 7, 'A week has 7 days.',
          `${weeks} × 7 = <b>${weeks * 7}</b>.`, 3);
      } else if (s === 2) {
        const weeks = 2 + (n % 4), extra = 3 + (n % 4);
        add('g2mth-time', 'calendar', 'tim', n,
          `A holiday lasts <b>${weeks}</b> weeks and <b>${extra}</b> days. How many days is that?`,
          weeks * 7 + extra, 'Change the weeks into days, then add the extra days.',
          `${weeks} × 7 = ${weeks * 7}. ${weeks * 7} + ${extra} = <b>${weeks * 7 + extra}</b>.`, 4);
      } else {
        const h = 2 + (n % 8);
        add('g2mth-time', 'oclock_halfpast', 'tim', n,
          `How many <b>minutes</b> are there in <b>${h}</b> hours?`,
          h * 60, 'An hour has 60 minutes.',
          `${h} × 60 = <b>${h * 60}</b>.`, 3);
      }
    }

    { // Shapes and Space
      if (s === 0) {
        const t = 3 + (n % 5);
        add('g2mth-shapes', '2d_shapes', 'shp', n,
          `<b>${t}</b> rectangles are drawn. How many sides altogether?`,
          t * 4, 'A rectangle has 4 sides.',
          `${t} × 4 = <b>${t * 4}</b>.`, 2);
      } else if (s === 1) {
        const c = 2 + (n % 4);
        add('g2mth-shapes', '3d_shapes', 'shp', n,
          `<b>${c}</b> cubes are on a table. How many faces are there altogether?`,
          c * 6, 'A cube has 6 faces.',
          `${c} × 6 = <b>${c * 6}</b>.`, 3);
      } else if (s === 2) {
        const side = 3 + (n % 7);
        add('g2mth-shapes', '2d_shapes', 'shp', n,
          `A square has sides of <b>${side}</b> cm. What is the distance all the way round it?`,
          side * 4, 'A square has four equal sides.',
          `${side} × 4 = <b>${side * 4}</b> cm.`, 3);
      } else {
        const tri = 2 + (n % 4), sq = 2 + (n % 3);
        add('g2mth-shapes', 'symmetry', 'shp', n,
          `A pattern uses <b>${tri}</b> triangles and <b>${sq}</b> squares. How many corners altogether?`,
          tri * 3 + sq * 4, 'Triangles have 3 corners, squares have 4.',
          `${tri} × 3 = ${tri * 3}, ${sq} × 4 = ${sq * 4}. Total = <b>${tri * 3 + sq * 4}</b>.`, 4);
      }
    }
  }
})();
