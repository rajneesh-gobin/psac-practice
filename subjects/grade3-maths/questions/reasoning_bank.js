'use strict';
// Grade 3 Maths — word problems, 12 per chapter, four situations each.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09 with `scripts/audit-difficulty-labels.js`:
//
//   grade3-maths   541 items   L1 231   L2 241   L3 27   L4 42
//
// Better than Grades 1 and 2, but 38% of the pack was bare arithmetic repeated —
// runs of 48 (`# × # = ?`), 36 (`# + # = ?`), 36 (`# − # = ?`) and 20 (`# ÷ #`).
// Sixty-nine reasoning items across nine chapters is thin for the year a child
// first meets multi-step work.
//
// ⚠ L4 means TWO steps with a derived quantity, or THREE steps. A one-step story
//   is L2 and a plain two-step is L3. Held deliberately: grade5-maths carried
//   twenty two-step items at L4 until 2026-09-09.
// ⚠ Numbers stay inside 1,000 and tables inside 10, matching the chapter names.
// ⚠ Every division must come out exact — build the total FROM the divisor.

(function () {
  const add = (chapterId, subsection, key, n, question, answer, hint, explanation, difficulty) => {
    const q = makeNum({ id: `g3m-rsn-${key}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty, question, answer: String(answer), hint, explanation });
    if (q.acceptableAnswers && q.acceptableAnswers.length === 1
        && q.acceptableAnswers[0] === q.answer) delete q.acceptableAnswers;
    STATIC_QUESTIONS.push(q);
  };
  const gb = v => v.toLocaleString('en-GB');

  for (let n = 1; n <= 12; n++) {
    const s = n % 4;

    { // Numbers to 1000
      if (s === 0) {
        const h = 2 + (n % 7), t = 1 + (n % 8), u = 3 + (n % 6);
        add('g3mth-numbers', 'place_value_hto', 'num', n,
          `A number has <b>${h}</b> hundreds, <b>${t}</b> tens and <b>${u}</b> units. What is <b>100 more</b> than it?`,
          h * 100 + t * 10 + u + 100, 'Build the number, then add one hundred.',
          `The number is ${h * 100 + t * 10 + u}. + 100 = <b>${h * 100 + t * 10 + u + 100}</b>.`, 3);
      } else if (s === 1) {
        const a = 340 + n * 27;
        add('g3mth-numbers', 'ordering_rounding', 'num', n,
          `A school has <b>${gb(a)}</b> books. Rounded to the nearest <b>hundred</b>, about how many is that?`,
          Math.round(a / 100) * 100, 'Look at the tens digit.',
          `${gb(a)} rounds to <b>${gb(Math.round(a / 100) * 100)}</b>.`, 2);
      } else if (s === 2) {
        const a = 480 + n * 13, b = 265 + n * 9;
        add('g3mth-numbers', 'comparing', 'num', n,
          `Village A has <b>${gb(a)}</b> people and Village B has <b>${gb(b)}</b>. How many more live in A?`,
          a - b, 'Take the smaller from the bigger.',
          `${gb(a)} − ${gb(b)} = <b>${gb(a - b)}</b>.`, 2);
      } else {
        const start = 125 + n * 7, step = 25;
        add('g3mth-numbers', 'ordering_rounding', 'num', n,
          `A count goes up in <b>25</b>s from <b>${start}</b>. What is the <b>4th</b> number?`,
          start + 3 * step, 'The 4th number is three steps after the first.',
          `${start} + 3 × 25 = <b>${start + 3 * step}</b>.`, 3);
      }
    }

    { // Addition with regrouping
      if (s === 0) {
        const a = 236 + n * 17, b = 148 + n * 11;
        add('g3mth-addition', 'add_word_problems', 'add', n,
          `A farm collects <b>${gb(a)}</b> eggs in May and <b>${gb(b)}</b> in June. How many in the two months?`,
          a + b, 'Add the two months.',
          `${gb(a)} + ${gb(b)} = <b>${gb(a + b)}</b>.`, 2);
      } else if (s === 1) {
        const a = 185 + n * 9, b = 137 + n * 6, target = 600 + n * 20;
        add('g3mth-addition', 'add_word_problems', 'add', n,
          `A charity has <b>${gb(a)}</b> tins, then receives <b>${gb(b)}</b> more. It needs <b>${gb(target)}</b>. How many more are still needed?`,
          target - a - b, 'Total what it has, then compare with the target.',
          `${gb(a)} + ${gb(b)} = ${gb(a + b)}. ${gb(target)} − ${gb(a + b)} = <b>${gb(target - a - b)}</b>.`, 4);
      } else if (s === 2) {
        const a = 92 + n * 6, b = 78 + n * 5, c = 64 + n * 4;
        add('g3mth-addition', 'adding_3digit', 'add', n,
          `Three classes raise <b>Rs ${gb(a)}</b>, <b>Rs ${gb(b)}</b> and <b>Rs ${gb(c)}</b>. How much altogether?`,
          a + b + c, 'Add all three amounts.',
          `${gb(a)} + ${gb(b)} + ${gb(c)} = <b>Rs ${gb(a + b + c)}</b>.`, 3);
      } else {
        const total = 520 + n * 15, part = 245 + n * 7;
        add('g3mth-addition', 'adding_2digit', 'add', n,
          `Two shops sold <b>${gb(total)}</b> tickets between them. One sold <b>${gb(part)}</b>. How many did the other sell?`,
          total - part, 'The two shops add up to the total.',
          `${gb(total)} − ${gb(part)} = <b>${gb(total - part)}</b>.`, 3);
      }
    }

    { // Subtraction with regrouping
      if (s === 0) {
        const a = 425 + n * 13, b = 168 + n * 8;
        add('g3mth-subtraction', 'sub_word_problems', 'sub', n,
          `A library has <b>${gb(a)}</b> books. <b>${gb(b)}</b> are borrowed. How many are on the shelves?`,
          a - b, 'Take away the borrowed books.',
          `${gb(a)} − ${gb(b)} = <b>${gb(a - b)}</b>.`, 2);
      } else if (s === 1) {
        const start = 800, spent1 = 145 + n * 7, spent2 = 96 + n * 5;
        add('g3mth-subtraction', 'sub_word_problems', 'sub', n,
          `A man has <b>Rs ${gb(start)}</b>. He spends <b>Rs ${gb(spent1)}</b>, then <b>Rs ${gb(spent2)}</b>. How much is left?`,
          start - spent1 - spent2, 'Add both amounts spent, then take that off.',
          `${gb(spent1)} + ${gb(spent2)} = ${gb(spent1 + spent2)}. ${gb(start)} − ${gb(spent1 + spent2)} = <b>Rs ${gb(start - spent1 - spent2)}</b>.`, 4);
      } else if (s === 2) {
        const a = 356 + n * 11, b = 198 + n * 6;
        add('g3mth-subtraction', 'subtracting_3digit', 'sub', n,
          `School A has <b>${gb(a)}</b> pupils, School B has <b>${gb(b)}</b>. How many more are at A?`,
          a - b, 'Find the difference.',
          `${gb(a)} − ${gb(b)} = <b>${gb(a - b)}</b>.`, 2);
      } else {
        const had = 640 + n * 12, left = 275 + n * 5;
        add('g3mth-subtraction', 'subtracting_2digit', 'sub', n,
          `A tank had <b>${gb(had)}</b> litres. Now <b>${gb(left)}</b> remain. How many litres were used?`,
          had - left, 'The amount used is the difference.',
          `${gb(had)} − ${gb(left)} = <b>${gb(had - left)}</b>.`, 3);
      }
    }

    { // Multiplication tables
      if (s === 0) {
        const rows = 6 + (n % 5), per = 7;
        add('g3mth-multiplication', 'times_6_to_10', 'mul', n,
          `<b>${rows}</b> boxes each hold <b>${per}</b> pencils. How many pencils altogether?`,
          rows * per, 'Multiply the boxes by what each holds.',
          `${rows} × ${per} = <b>${rows * per}</b>.`, 2);
      } else if (s === 1) {
        const packs = 4 + (n % 6), per = 8, broken = 5 + (n % 7);
        add('g3mth-multiplication', 'times_6_to_10', 'mul', n,
          `<b>${packs}</b> packs hold <b>${per}</b> glasses each. <b>${broken}</b> glasses break. How many are left whole?`,
          packs * per - broken, 'Count all the glasses first, then take off the broken ones.',
          `${packs} × ${per} = ${packs * per}. ${packs * per} − ${broken} = <b>${packs * per - broken}</b>.`, 4);
      } else if (s === 2) {
        const a = 12 + n, b = 6;
        add('g3mth-multiplication', 'multiply_2digit', 'mul', n,
          `A shop sells <b>${a}</b> boxes of eggs. Each box holds <b>${b}</b> eggs. How many eggs is that?`,
          a * b, 'Multiply the boxes by the eggs in one.',
          `${a} × ${b} = <b>${a * b}</b>.`, 3);
      } else {
        const rows = 5 + (n % 5), per = 9, price = 4;
        add('g3mth-multiplication', 'times_6_to_10', 'mul', n,
          `<b>${rows}</b> trays hold <b>${per}</b> buns each. Each bun costs <b>Rs ${price}</b>. What do all the buns cost?`,
          rows * per * price, 'Count the buns first, then price them.',
          `${rows} × ${per} = ${rows * per} buns. ${rows * per} × ${price} = <b>Rs ${gb(rows * per * price)}</b>.`, 4);
      }
    }

    { // Division
      if (s === 0) {
        const groups = 4 + (n % 5), each = 6 + (n % 4);
        add('g3mth-division', 'sharing_equally', 'div', n,
          `<b>${groups * each}</b> sweets are shared equally among <b>${groups}</b> children. How many does each get?`,
          each, 'Share the sweets between the children.',
          `${groups * each} ÷ ${groups} = <b>${each}</b>.`, 2);
      } else if (s === 1) {
        const per = 5 + (n % 4), boxes = 7 + (n % 5), spare = 2 + (n % 3);
        add('g3mth-division', 'dividing_simple', 'div', n,
          `<b>${per * boxes + spare}</b> apples are packed <b>${per}</b> to a box. How many apples are <b>left over</b>?`,
          spare, 'Fill as many boxes as you can and see what will not fill another.',
          `${per * boxes + spare} ÷ ${per} = ${boxes} boxes, remainder <b>${spare}</b>.`, 3);
      } else if (s === 2) {
        const teams = 6 + (n % 4), each = 8;
        add('g3mth-division', 'sharing_equally', 'div', n,
          `<b>${teams * each}</b> pupils make <b>${teams}</b> equal teams. How many pupils are in <b>two</b> teams?`,
          each * 2, 'Find one team first, then double it.',
          `${teams * each} ÷ ${teams} = ${each}. Two teams = <b>${each * 2}</b>.`, 4);
      } else {
        const total = 9 * (5 + (n % 6));
        add('g3mth-division', 'mult_div_link', 'div', n,
          `<b>${total}</b> chairs are put into rows of <b>9</b>. How many rows are there?`,
          total / 9, 'How many nines make the total?',
          `${total} ÷ 9 = <b>${total / 9}</b>.`, 3);
      }
    }

    { // Fractions
      if (s === 0) {
        const a = 4 * (5 + n);
        add('g3mth-fractions', 'halves_quarters', 'fra', n,
          `A box holds <b>${a}</b> pencils. <b>One quarter</b> are red. How many are red?`,
          a / 4, 'One quarter means one of four equal parts.',
          `${a} ÷ 4 = <b>${a / 4}</b>.`, 2);
      } else if (s === 1) {
        const a = 3 * (6 + n);
        add('g3mth-fractions', 'thirds_three_quarters', 'fra', n,
          `<b>${a}</b> children are in a hall. <b>Two thirds</b> go outside. How many are still inside?`,
          a / 3, 'Two thirds go, so one third stays.',
          `One third = ${a} ÷ 3 = ${a / 3}. That is who stays: <b>${a / 3}</b>.`, 4);
      } else if (s === 2) {
        const a = 4 * (4 + n);
        add('g3mth-fractions', 'halves_quarters', 'fra', n,
          `A rope is <b>${a}</b> m long. <b>Three quarters</b> is used. How many metres are used?`,
          a / 4 * 3, 'Find one quarter, then take three of them.',
          `${a} ÷ 4 = ${a / 4}. ${a / 4} × 3 = <b>${a / 4 * 3}</b> m.`, 4);
      } else {
        const a = 2 * (9 + n);
        add('g3mth-fractions', 'ordering_fractions', 'fra', n,
          `<b>${a}</b> marbles are shared. Amit takes <b>half</b>. How many are left?`,
          a / 2, 'Half is taken, half is left.',
          `${a} ÷ 2 = <b>${a / 2}</b>.`, 2);
      }
    }

    { // Measurement — m/cm, kg/g, L/ml
      if (s === 0) {
        const m = 3 + (n % 6), cm = 40 + n * 5;
        add('g3mth-measurement', 'length_m_cm', 'mea', n,
          `A plank is <b>${m} m ${cm} cm</b> long. How many <b>centimetres</b> is that?`,
          m * 100 + cm, '1 m = 100 cm.',
          `${m} × 100 = ${m * 100}. ${m * 100} + ${cm} = <b>${m * 100 + cm}</b> cm.`, 3);
      } else if (s === 1) {
        const kg = 2 + (n % 5), g = 350 + n * 20, bags = 3 + (n % 3);
        add('g3mth-measurement', 'mass_kg_g', 'mea', n,
          `One bag weighs <b>${kg} kg ${g} g</b>. What do <b>${bags}</b> bags weigh, in <b>grams</b>?`,
          bags * (kg * 1000 + g), 'Change one bag to grams first, then multiply.',
          `One bag = ${gb(kg * 1000 + g)} g. × ${bags} = <b>${gb(bags * (kg * 1000 + g))}</b> g.`, 4);
      } else if (s === 2) {
        const L = 4 + (n % 6), ml = 250 + n * 30;
        add('g3mth-measurement', 'capacity_l_ml', 'mea', n,
          `A bucket holds <b>${L} L</b>. <b>${ml} ml</b> is poured out. How many <b>millilitres</b> are left?`,
          L * 1000 - ml, '1 L = 1,000 ml.',
          `${L} L = ${gb(L * 1000)} ml. − ${ml} = <b>${gb(L * 1000 - ml)}</b> ml.`, 4);
      } else {
        const a = 120 + n * 8, b = 75 + n * 4;
        add('g3mth-measurement', 'length_m_cm', 'mea', n,
          `A blue rope is <b>${a}</b> cm and a red one is <b>${b}</b> cm. How much longer is the blue one?`,
          a - b, 'Find the difference.',
          `${a} − ${b} = <b>${a - b}</b> cm.`, 2);
      }
    }

    { // Geometry — perimeter, area, angles
      if (s === 0) {
        const l = 7 + (n % 8), w = 4 + (n % 6);
        add('g3mth-geometry', 'perimeter_area', 'geo', n,
          `A rectangle is <b>${l} cm</b> long and <b>${w} cm</b> wide. What is the distance all the way round it?`,
          2 * (l + w), 'Add a length and a width, then double.',
          `2 × (${l} + ${w}) = <b>${2 * (l + w)}</b> cm.`, 3);
      } else if (s === 1) {
        const l = 6 + (n % 7), w = 5 + (n % 5);
        add('g3mth-geometry', 'perimeter_area', 'geo', n,
          `A garden is <b>${l} m</b> by <b>${w} m</b>. A shed <b>2 m</b> by <b>3 m</b> stands on it. What area of garden is left?`,
          l * w - 6, 'Find the garden area, then take away the shed.',
          `${l} × ${w} = ${l * w} m². Shed = 6 m². Left = <b>${l * w - 6}</b> m².`, 4);
      } else if (s === 2) {
        const per = 4 * (5 + (n % 7));
        add('g3mth-geometry', 'perimeter_area', 'geo', n,
          `A square has a distance of <b>${per} cm</b> all the way round. How long is one side?`,
          per / 4, 'A square has four equal sides.',
          `${per} ÷ 4 = <b>${per / 4}</b> cm.`, 3);
      } else {
        const t = 3 + (n % 5), sq = 2 + (n % 4);
        add('g3mth-geometry', 'shapes_properties', 'geo', n,
          `A shape picture uses <b>${t}</b> triangles and <b>${sq}</b> squares. How many sides are there altogether?`,
          t * 3 + sq * 4, 'Triangles have 3 sides, squares have 4.',
          `${t} × 3 = ${t * 3}, ${sq} × 4 = ${sq * 4}. Total = <b>${t * 3 + sq * 4}</b>.`, 4);
      }
    }

    { // Time and Calendar
      if (s === 0) {
        const h = 1 + (n % 5), m = 15 + (n % 4) * 10;
        add('g3mth-time', 'elapsed_time', 'tim', n,
          `A lesson lasts <b>${h} h ${m} min</b>. How many <b>minutes</b> is that?`,
          h * 60 + m, 'An hour has 60 minutes.',
          `${h} × 60 = ${h * 60}. + ${m} = <b>${h * 60 + m}</b> min.`, 3);
      } else if (s === 1) {
        const startM = (8 + (n % 4)) * 60 + (n % 4) * 15, dur = 45 + n * 5;
        const end = startM + dur;
        const hhmm = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
        add('g3mth-time', 'elapsed_time', 'tim', n,
          `A class starts at <b>${hhmm(startM)}</b> and lasts <b>${dur}</b> minutes. What time does it end? Give HH:MM.`,
          hhmm(end), 'Add the minutes on, carrying every 60 into an hour.',
          `${hhmm(startM)} + ${dur} min = <b>${hhmm(end)}</b>.`, 4);
      } else if (s === 2) {
        const weeks = 3 + (n % 6), days = 2 + (n % 5);
        add('g3mth-time', 'calendar_dates', 'tim', n,
          `A trip lasts <b>${weeks}</b> weeks and <b>${days}</b> days. How many days is that?`,
          weeks * 7 + days, 'A week has 7 days.',
          `${weeks} × 7 = ${weeks * 7}. + ${days} = <b>${weeks * 7 + days}</b>.`, 3);
      } else {
        const h = 2 + (n % 6);
        add('g3mth-time', 'reading_clock', 'tim', n,
          `A journey takes <b>${h}</b> hours and <b>30</b> minutes. How many <b>minutes</b> is that?`,
          h * 60 + 30, 'Change the hours to minutes, then add 30.',
          `${h} × 60 = ${h * 60}. + 30 = <b>${h * 60 + 30}</b>.`, 3);
      }
    }
  }
})();
