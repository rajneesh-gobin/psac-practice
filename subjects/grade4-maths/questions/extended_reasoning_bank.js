'use strict';
// Grade 4 Maths — reasoning word problems, 20 per chapter, four situations each.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09 with `scripts/audit-difficulty-labels.js`. grade4-maths
// held 662 items shaped like this:
//
//   L1  67    L2 507    L3 24    L4 64
//
// and 58 of those 88 L3/L4 items were in ONE chapter, g4-data. The other five
// chapters carried between four and seven reasoning items each — seven out of
// 140 in Numeration, seven out of 100 in Four Operations, four out of 31 in
// Geometry. A Grade 4 child could practise a chapter to exhaustion and never
// meet a question with two steps in it.
//
// ⚠ The pack's 62% stem duplication is NOT what this file fixes, and those
//   drills are not a defect: "Calculate: # + #" nineteen times is honest L1/L2
//   practice and a nine-year-old needs it. The defect was that drills were
//   nearly ALL there was. Do not "de-duplicate" the coverage_*.js files by
//   deleting them.
//
// ⚠ GRADE 4, NOT GRADE 5. Two or three steps, not five; numbers to about
//   10,000; fractions with denominators a child can picture. The Grade 5 bank
//   (subjects/grade5-maths/questions/extended_reasoning_bank.js) is the shape to
//   copy, one level up.
//
// ⚠ Every division must come out exact. Writing the Grade 5 rewrite surfaced
//   94.5° angles, 22.5 walkers and "42.5 g per person" inside worked routes —
//   a correct final answer reached through a step no child would have written.

(function () {
  const add = (chapterId, subsection, key, n, question, answer, hint, explanation, difficulty = 4) => {
    const q = makeNum({ id: `g4m-rsn-${key}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty, question, answer: String(answer), hint, explanation });
    // ⚠ makeNum always fills acceptableAnswers; dropped when it only repeats
    //   `answer`, because every reader falls back to `q.acceptableAnswers ||
    //   [q.answer]` and the offline question cache is budgeted in bytes.
    if (q.acceptableAnswers && q.acceptableAnswers.length === 1
        && q.acceptableAnswers[0] === q.answer) delete q.acceptableAnswers;
    STATIC_QUESTIONS.push(q);
  };
  const gb = v => v.toLocaleString('en-GB');

  for (let n = 1; n <= 20; n++) {
    const s = n % 4;

    { // ── Numeration: place value and rounding used to DECIDE something
      if (s === 0) {
        // ⚠ Coefficients kept small enough that a + b never passes the target:
        // at n = 20 the old pair reached 8,180 and asked for −180 more bottle tops.
        const a = 1340 + n * 97, b = 980 + n * 63, target = 8000;
        add('g4-numeration', 'word_problems', 'num', n,
          `A school wants to collect <b>${gb(target)}</b> bottle tops. Two classes bring <b>${gb(a)}</b> and <b>${gb(b)}</b>. How many more are needed?`,
          target - a - b,
          'Add the two amounts, then take that from the target.',
          `${gb(a)} + ${gb(b)} = ${gb(a + b)}. ${gb(target)} − ${gb(a + b)} = <b>${gb(target - a - b)}</b>.`);
      } else if (s === 1) {
        const th = 2 + (n % 7), h = 1 + (n % 9), t = 3 + (n % 6), u = n % 10;
        const num = th * 1000 + h * 100 + t * 10 + u;
        add('g4-numeration', 'place_value', 'num', n,
          `A number is made of <b>${th}</b> thousands, <b>${h}</b> hundreds, <b>${t}</b> tens and <b>${u}</b> units. What is the value of its <b>hundreds</b> digit?`,
          h * 100,
          'The hundreds digit is worth the digit times 100.',
          `The number is ${gb(num)}. Its hundreds digit is ${h}, worth ${h} × 100 = <b>${h * 100}</b>.`);
      } else if (s === 2) {
        const price = 1870 + n * 63;
        add('g4-numeration', 'rounding', 'num', n,
          `A trip costs <b>Rs ${gb(price)}</b>. Rounded to the nearest <b>hundred</b>, about how much is that?`,
          Math.round(price / 100) * 100,
          'Look at the tens digit to decide which hundred is nearer.',
          `${gb(price)} rounds to <b>Rs ${gb(Math.round(price / 100) * 100)}</b>.`);
      } else {
        const start = 45 + n * 3, step = 4 + (n % 6);
        add('g4-numeration', 'patterns', 'num', n,
          `A pattern goes <b>${start}</b>, <b>${start + step}</b>, <b>${start + 2 * step}</b>, … What is the <b>6th</b> number?`,
          start + 5 * step,
          'Find the step first. The 6th number is five steps on from the first.',
          `The step is ${step}. ${start} + 5 × ${step} = <b>${start + 5 * step}</b>.`);
      }
    }

    { // ── Four operations: two steps, and the second is never the same one
      if (s === 0) {
        const rows = 6 + (n % 8), per = 12 + n, broken = 3 + (n % 7);
        add('g4-four-ops', 'word_problems', 'ops', n,
          `A tray holds <b>${rows}</b> rows of <b>${per}</b> eggs. <b>${broken}</b> eggs are broken. How many eggs are left whole?`,
          rows * per - broken,
          'Multiply to find all the eggs, then take away the broken ones.',
          `${rows} × ${per} = ${rows * per}. ${rows * per} − ${broken} = <b>${rows * per - broken}</b>.`);
      } else if (s === 1) {
        // ⚠ total is built FROM groups, or 108 pupils in 5 teams is 21.6 each.
        const groups = 4 + (n % 5), total = groups * (24 + n);
        add('g4-four-ops', 'division', 'ops', n,
          `<b>${total}</b> pupils are put into <b>${groups}</b> equal teams. How many pupils are in <b>two</b> of those teams?`,
          total / groups * 2,
          'Find one team first, then double it.',
          `${total} ÷ ${groups} = ${total / groups} per team. Two teams = <b>${total / groups * 2}</b>.`);
      } else if (s === 2) {
        const perDay = 25 + n, days = 5 + (n % 3), extra = 14 + (n % 9);
        add('g4-four-ops', 'word_problems', 'ops', n,
          `A baker makes <b>${perDay}</b> loaves a day for <b>${days}</b> days, then <b>${extra}</b> more on Sunday. How many loaves altogether?`,
          perDay * days + extra,
          'Work out the whole week first, then add Sunday.',
          `${perDay} × ${days} = ${perDay * days}. + ${extra} = <b>${perDay * days + extra}</b>.`);
      } else {
        // ⚠ An even amount spent, or the two children share Rs 304.50 each.
        const spent = 340 + n * 16, had = 1000;
        add('g4-four-ops', 'word_problems', 'ops', n,
          `A girl has <b>Rs ${gb(had)}</b>. She spends <b>Rs ${gb(spent)}</b> and shares what is left <b>equally between herself and her brother</b>. How much does each get?`,
          (had - spent) / 2,
          'Find what is left, then split it in two.',
          `${gb(had)} − ${gb(spent)} = ${gb(had - spent)}. ${gb(had - spent)} ÷ 2 = <b>Rs ${gb((had - spent) / 2)}</b>.`);
      }
    }

    { // ── Fractions: a fraction of a quantity is always a STEP
      if (s === 0) {
        const d = [2, 4, 5, 10][n % 4], trays = 2 + (n % 4), total = d * trays * (2 + (n % 3));
        const left = total - total / d;
        add('g4-fractions', 'word_problems', 'frac', n,
          `A box holds <b>${total}</b> sweets. <b>1/${d}</b> are given away and the rest are shared equally into <b>${trays}</b> bags. How many sweets are in each bag?`,
          left / trays,
          `Find 1/${d} of ${total}, take it off, then divide by ${trays}.`,
          `Given away = ${total} ÷ ${d} = ${total / d}. Left = ${left}. ${left} ÷ ${trays} = <b>${left / trays}</b>.`);
      } else if (s === 1) {
        const d = 8, a = 1 + (n % 3), b = 2 + (n % 4), total = d * (3 + n);
        add('g4-fractions', 'add_sub', 'frac', n,
          `A jug holds <b>${total}</b> ml. <b>${a}/${d}</b> is poured out, then <b>${b}/${d}</b> more. How many millilitres are left?`,
          total - total * (a + b) / d,
          'Add the two fractions first, then find that much of the total.',
          `${a}/${d} + ${b}/${d} = ${a + b}/${d}. That is ${total * (a + b) / d} ml. Left = <b>${total - total * (a + b) / d} ml</b>.`);
      } else if (s === 2) {
        const d = [3, 4, 5][n % 3], whole = d * (5 + n), part = whole / d;
        add('g4-fractions', 'fraction_of', 'frac', n,
          `<b>1/${d}</b> of a class is <b>${part}</b> pupils. How many pupils are in the whole class?`,
          whole,
          `If one part is ${part}, all ${d} parts is ${part} × ${d}.`,
          `${part} × ${d} = <b>${whole}</b>.`);
      } else {
        const t1 = 4 * (3 + n), t2 = 2 * (8 + n);
        add('g4-fractions', 'word_problems', 'frac', n,
          `Class A has <b>${t1}</b> pupils and <b>1/4</b> wear glasses. Class B has <b>${t2}</b> pupils and <b>1/2</b> wear glasses. How many wear glasses altogether?`,
          t1 / 4 + t2 / 2,
          'Work out each class separately — the fractions are of different totals.',
          `A: ${t1} ÷ 4 = ${t1 / 4}. B: ${t2} ÷ 2 = ${t2 / 2}. Together = <b>${t1 / 4 + t2 / 2}</b>.`);
      }
    }

    { // ── Geometry: an angle or perimeter fact applied, not recited
      if (s === 0) {
        const a = 40 + n, b = 55 + n;
        add('g4-geometry', 'angles', 'geo', n,
          `A triangle has angles of <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`,
          180 - a - b,
          'The three angles of a triangle add up to 180°.',
          `180 − (${a} + ${b}) = <b>${180 - a - b}°</b>.`);
      } else if (s === 1) {
        const w = 5 + (n % 8), l = w + 4 + (n % 5);
        add('g4-geometry', 'perimeter', 'geo', n,
          `A rectangle is <b>${l} cm</b> long and <b>${w} cm</b> wide. A second rectangle has the <b>same perimeter</b> but is <b>${l + 2} cm</b> long. How wide is the second one?`,
          (l + w) - (l + 2),
          'Half the perimeter is one length plus one width.',
          `Perimeter = 2 × (${l} + ${w}) = ${2 * (l + w)} cm. Half = ${l + w}. Width = ${l + w} − ${l + 2} = <b>${(l + w) - (l + 2)} cm</b>.`);
      } else if (s === 2) {
        const x = 30 + n * 2;
        add('g4-geometry', 'angles', 'geo', n,
          `Two angles lie together on a straight line. One is <b>${x}°</b>. How big is the other?`,
          180 - x,
          'Angles on a straight line add up to 180°.',
          `180 − ${x} = <b>${180 - x}°</b>.`);
      } else {
        const side = 6 + (n % 9);
        add('g4-geometry', 'perimeter', 'geo', n,
          `A square has a perimeter of <b>${4 * side} cm</b>. What is the length of <b>one</b> side?`,
          side,
          'A square has four equal sides.',
          `${4 * side} ÷ 4 = <b>${side} cm</b>.`);
      }
    }

    { // ── Measures: the unit asked for is not the unit given
      if (s === 0) {
        const kg = 2 + (n % 7), g = 250 + 50 * (n % 6), packs = 3 + (n % 4);
        add('g4-measures', 'mass', 'meas', n,
          `One bag of rice weighs <b>${kg} kg ${g} g</b>. What do <b>${packs}</b> bags weigh, in <b>grams</b>?`,
          packs * (kg * 1000 + g),
          'Turn one bag into grams first, then multiply.',
          `One bag = ${gb(kg * 1000 + g)} g. × ${packs} = <b>${gb(packs * (kg * 1000 + g))} g</b>.`);
      } else if (s === 1) {
        const L = 4 + (n % 8), used = 600 + 100 * (n % 5);
        add('g4-measures', 'capacity', 'meas', n,
          `A bottle holds <b>${L} L</b>. <b>${used} ml</b> is poured out. How many <b>millilitres</b> are left?`,
          L * 1000 - used,
          'Change litres to millilitres before subtracting.',
          `${L} L = ${gb(L * 1000)} ml. − ${used} = <b>${gb(L * 1000 - used)} ml</b>.`);
      } else if (s === 2) {
        const items = 4 + (n % 6), each = 35 + n, paid = 500;
        add('g4-measures', 'money', 'meas', n,
          `A pupil buys <b>${items}</b> pens at <b>Rs ${each}</b> each and pays with <b>Rs ${paid}</b>. How much change does she get?`,
          paid - items * each,
          'Find the cost first, then take it from what she paid.',
          `${items} × ${each} = Rs ${gb(items * each)}. ${paid} − ${gb(items * each)} = <b>Rs ${gb(paid - items * each)}</b>.`);
      } else {
        const h = 1 + (n % 4), m = 20 + 5 * (n % 8), extra = 25 + (n % 7) * 5;
        add('g4-measures', 'time', 'meas', n,
          `A journey takes <b>${h} h ${m} min</b>. A second journey takes <b>${extra} min</b>. How long are both, in <b>minutes</b>?`,
          h * 60 + m + extra,
          'Turn the hours into minutes, then add.',
          `${h} h ${m} min = ${h * 60 + m} min. + ${extra} = <b>${h * 60 + m + extra} min</b>.`);
      }
    }
  }
})();
