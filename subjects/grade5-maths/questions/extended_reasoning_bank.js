'use strict';
// Grade 5 Maths - 20 deterministic Level-4 reasoning variants per chapter.
// Values and contexts deliberately vary while every question keeps a complete
// worked route. IDs are stable: database imports update rather than duplicate.

(function () {
  // ⚠ `difficulty` is an OPTIONAL trailing argument. Every other block in this
  //   file omits it and keeps 4; only the graphs block below varies, because it
  //   is the only one that asks more than one kind of question.
  const add = (chapterId, subsection, n, question, answer, hint, explanation, difficulty = 4) => {
    const numeric = Number(answer);
    const accepted = [String(answer)];
    // ⚠ Only when it actually differs. Under 1,000 the grouped form IS the plain
    // form, so this stored "86","86" on most of the 340 items in this file - and
    // this pack sits about 3 KB under the offline cache byte budget, where a
    // duplicated string is a pack a child loses offline.
    const grouped = Number.isFinite(numeric) ? numeric.toLocaleString('en-GB') : null;
    if (grouped && grouped !== String(answer)) accepted.push(grouped);
    const q = makeNum({ id:`g5x-${chapterId}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty, question, answer:String(answer), acceptableAnswers:accepted, hint, explanation });
    // ⚠ Dropped when it only repeats `answer`. makeNum ALWAYS fills the field,
    // so ~300 items in this file shipped `"acceptableAnswers":["1986"]` beside
    // `"answer":"1986"` - about 7 KB in a pack with under 4 KB of offline cache
    // headroom, which is a whole subject a Grade 5 child loses offline.
    // ⚠ Safe because every reader already falls back: the grader, the review
    // pane and the exam marker all read `q.acceptableAnswers || [q.answer]`.
    // ⚠ Done HERE, not in makeNum - that factory has four copies that must
    // change together (see CLAUDE.md), and this is one pack's problem.
    if (q.acceptableAnswers && q.acceptableAnswers.length === 1
        && q.acceptableAnswers[0] === q.answer) delete q.acceptableAnswers;
    STATIC_QUESTIONS.push(q);
  };

  // ⚠ ONE LINE, no indentation inside the template. Whitespace in a question
  //   string is real weight in the offline question cache, which is budgeted by
  //   string length and had about 3 KB spare for the whole of Grade 5 when these
  //   tables were written.
  const fruitTable = (a, b, c) => `<table class="q-table"><tr><th>Fruits chosen</th><th>Pupils</th></tr>`
    + `<tr><td>1</td><td>${a}</td></tr><tr><td>2</td><td>${b}</td></tr><tr><td>3</td><td>${c}</td></tr></table>`;

  for (let n = 1; n <= 20; n++) {
    const k = n + 4;

    // ⚠ EVERY block below rotates SITUATIONS, not just numbers. Each family was
    //   one sentence repeated twenty times with the values walked upward, all
    //   labelled L4: a child who solves the first solves the other nineteen
    //   without reading them, so a chapter counted twenty questions and taught
    //   one. Measured 2026-09-09 by `scripts/audit-difficulty-labels.js`, which
    //   now reports template runs for exactly this reason.
    // ⚠ Text is kept TERSE on purpose. Grade 5 sits within a few KB of its
    //   offline cache byte budget, and a wordier hint is a subject a child
    //   loses offline. Depth belongs in the steps, not the sentence length.
    const s4 = n % 4;

    { // Numeration — four situations, all ending in a comparison or a remainder
      if (s4 === 0) {
        const a=24560+n*1231, b=17890+n*917, target=100000, left=target-a-b;
        add('numeration','word_probs',n,
          `A recycling drive needs <b>${target.toLocaleString('en-GB')}</b> bottles. Two schools collect <b>${a.toLocaleString('en-GB')}</b> and <b>${b.toLocaleString('en-GB')}</b>. How many more are needed?`, left,
          'Add the two collections, then take that from 100,000.',
          `${a.toLocaleString('en-GB')} + ${b.toLocaleString('en-GB')} = ${(a+b).toLocaleString('en-GB')}. Needed = ${target.toLocaleString('en-GB')} − ${(a+b).toLocaleString('en-GB')} = <b>${left.toLocaleString('en-GB')}</b>.`);
      } else if (s4 === 1) {
        // Rounding used to decide, not just to perform.
        const cost=13480+n*713, seats=200+n*10, each=Math.round(cost/seats/10)*10;
        add('numeration','rounding',n,
          `A hall costs <b>Rs ${cost.toLocaleString('en-GB')}</b> to hire and holds <b>${seats}</b> people. The cost is shared equally and rounded to the nearest <b>Rs 10</b>. What does each person pay?`, each,
          'Divide first, then round the answer to the nearest ten.',
          `${cost.toLocaleString('en-GB')} ÷ ${seats} = ${(cost/seats).toFixed(2)}, which rounds to <b>Rs ${each}</b>.`);
      } else if (s4 === 2) {
        // Place value read backwards: build the number from a description.
        const th=3+(n%7), h=1+(n%9), t=2+(n%8), u=(n%10);
        const num=th*1000+h*100+t*10+u;
        add('numeration','place_value',n,
          `A number has <b>${th}</b> thousands, <b>${h}</b> hundreds, <b>${t}</b> tens and <b>${u}</b> units. Write the number, then say how much larger it is than <b>${(th*1000).toLocaleString('en-GB')}</b>.`, num-th*1000,
          'Build the number from its parts, then subtract.',
          `Number = ${num.toLocaleString('en-GB')}. ${num.toLocaleString('en-GB')} − ${(th*1000).toLocaleString('en-GB')} = <b>${(num-th*1000).toLocaleString('en-GB')}</b>.`);
      } else {
        // A sequence whose rule must be found before it can be continued.
        const start=120+n*7, step=6+(n%9), terms=8;
        add('numeration','sequences',n,
          `A pattern starts at <b>${start}</b> and each term is <b>${step}</b> more than the one before. What is the <b>${terms}th</b> term?`, start+step*(terms-1),
          'The 8th term is 7 steps after the first, not 8.',
          `${start} + 7 × ${step} = ${start} + ${7*step} = <b>${start+step*7}</b>.`);
      }
    }
    { // Four operations — the unit bought is rarely the unit asked for
      if (s4 === 0) {
        const boxes=12+n, per=36+2*n, classes=4+(n%5);
        const usable=Math.floor((boxes*per-2*n)/classes)*classes, kept=boxes*per-usable;
        add('four_ops','word_probs',n,
          `A school receives <b>${boxes}</b> cartons of markers with <b>${per}</b> in each. It keeps <b>${kept}</b> for the office and shares the rest equally among <b>${classes}</b> classes. How many does each class get?`, usable/classes,
          'Multiply, take off the ones kept, then divide.',
          `${boxes} × ${per} = ${boxes*per}. ${boxes*per} − ${kept} = ${usable}. ${usable} ÷ ${classes} = <b>${usable/classes}</b>.`);
      } else if (s4 === 1) {
        // A remainder that means something: how many are left over.
        const total=250+n*13, per=8+(n%5);
        add('four_ops','division',n,
          `<b>${total}</b> exercise books are packed <b>${per}</b> to a bundle. How many books are <b>left over</b> when no more full bundles can be made?`, total%per,
          'Divide and look at what will not fill another bundle.',
          `${total} ÷ ${per} = ${Math.floor(total/per)} bundles, remainder <b>${total%per}</b>.`);
      } else if (s4 === 2) {
        // Two rates compared — the child must price both before choosing.
        const single=14+n, packSize=6, packPrice=(14+n)*6-(8+n%5), want=packSize*(3+(n%4));
        const packs=want/packSize, saved=want*single-packs*packPrice;
        add('four_ops','mixed_ops',n,
          `Pens cost <b>Rs ${single}</b> each, or <b>Rs ${packPrice}</b> for a pack of <b>${packSize}</b>. A teacher needs <b>${want}</b> pens. How much does she save by buying packs instead of single pens?`, saved,
          'Price it both ways, then find the difference.',
          `Singly: ${want} × ${single} = Rs ${(want*single).toLocaleString('en-GB')}. In packs: ${packs} × ${packPrice} = Rs ${(packs*packPrice).toLocaleString('en-GB')}. Saved <b>Rs ${saved.toLocaleString('en-GB')}</b>.`);
      } else {
        // Working backwards from a total to one unknown part.
        const days=5+(n%3), perDay=40+n, extra=15+(n%7), total=days*perDay+extra;
        add('four_ops','word_probs',n,
          `A machine makes <b>${perDay}</b> tiles a day for <b>${days}</b> days, then makes some more on the last day. Altogether it makes <b>${total}</b> tiles. How many were made on the last day?`, extra,
          'Work out the tiles from the full days, then take that from the total.',
          `${days} × ${perDay} = ${days*perDay}. ${total} − ${days*perDay} = <b>${extra}</b>.`);
      }
    }
    { // Square numbers — the square is a step, never the answer
      if (s4 === 0) {
        const side=5+n, price=8+n;
        add('square_nums','word_probs',n,
          `A square courtyard has <b>${side}</b> paving slabs along each side. Each slab costs <b>Rs ${price}</b>. What do all the slabs cost?`, side*side*price,
          'Slabs = side × side, then multiply by the price.',
          `${side}² = ${side*side} slabs. ${side*side} × ${price} = <b>Rs ${(side*side*price).toLocaleString('en-GB')}</b>.`);
      } else if (s4 === 1) {
        // Given the area, find the side, then a perimeter — a square root used.
        const side=6+n, area=side*side;
        add('square_nums','square_roots',n,
          `A square garden covers <b>${area} m²</b>. A fence is put all the way round it. How many metres of fencing are needed?`, 4*side,
          'Find the side length first — which number times itself gives the area?',
          `√${area} = ${side} m. Perimeter = 4 × ${side} = <b>${4*side} m</b>.`);
      } else if (s4 === 2) {
        // Difference of two squares in a tiling context.
        const big=8+n, small=3+(n%5);
        add('square_nums','word_probs',n,
          `A square floor is <b>${big}</b> tiles along each side. A square rug covering <b>${small}</b> tiles along each side is placed on it. How many tiles are still showing?`, big*big-small*small,
          'Square both, then subtract.',
          `${big}² = ${big*big}, ${small}² = ${small*small}. ${big*big} − ${small*small} = <b>${big*big-small*small}</b>.`);
      } else {
        // A square-number pattern continued, not recited.
        const k=3+(n%8);
        add('square_nums','patterns',n,
          `Dots are arranged in squares: 1, 4, 9, 16, … How many <b>more</b> dots are in the <b>${k+1}th</b> square than the <b>${k}th</b>?`, (k+1)*(k+1)-k*k,
          'Work out both square numbers, then subtract.',
          `${k+1}² = ${(k+1)*(k+1)}, ${k}² = ${k*k}. Difference = <b>${(k+1)*(k+1)-k*k}</b>.`);
      }
    }
    { // Geometry — angle facts applied, not stated
      if (s4 === 0) {
        const a=32+n, b=48+2*n;
        add('geometry','angles',n,
          `A triangular road sign has angles of <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`, 180-a-b,
          'The three angles of a triangle total 180°.',
          `180 − (${a} + ${b}) = <b>${180-a-b}°</b>.`);
      } else if (s4 === 1) {
        // Angles on a straight line, one step removed.
        const x=35+n*3;
        add('geometry','angles',n,
          `Two angles sit side by side on a straight line. One is <b>${x}°</b>. The other is split into <b>two equal</b> angles. How big is each of those two?`, (180-x)/2,
          'Find the second angle first, then halve it.',
          `180 − ${x} = ${180-x}°. Half of that = <b>${(180-x)/2}°</b>.`);
      } else if (s4 === 2) {
        // Perimeter with one side unstated.
        const l=9+n, per=2*(l+(6+(n%7)));
        add('geometry','perimeter',n,
          `A rectangle has a perimeter of <b>${per} cm</b> and is <b>${l} cm</b> long. How wide is it?`, per/2-l,
          'Half the perimeter is one length plus one width.',
          `${per} ÷ 2 = ${per/2}. ${per/2} − ${l} = <b>${per/2-l} cm</b>.`);
      } else {
        // Interior angles of a quadrilateral, with two angles equal.
        // ⚠ b is nudged to make a+b even, or the two equal angles come out on a
        // half-degree — 94.5° is not an answer a Grade 5 child should type.
        const a=70+n; let b=95+(n%20); if ((a+b) % 2) b += 1;
        const rest=360-a-b;
        add('geometry','2d_shapes',n,
          `A quadrilateral has angles of <b>${a}°</b> and <b>${b}°</b>. The other two angles are <b>equal</b>. How big is each of them?`, rest/2,
          'The four angles of a quadrilateral total 360°.',
          `360 − (${a} + ${b}) = ${rest}. ${rest} ÷ 2 = <b>${rest/2}°</b>.`);
      }
    }
    { // Fractions — a fraction of a quantity is always a step, never the answer
      // ⚠ Denominators are chosen so every share divides exactly. The old block
      //   used `total = d*(12+n)` and then divided the REMAINDER by d again,
      //   which gave 7.8 buns per tray on four values of n.
      if (s4 === 0) {
        const d=[4,5,8,10][n%4], num=1+(n%(d-1)), trays=3+(n%4), total=d*trays*(2+(n%5));
        const left=total-total*num/d;
        add('fractions','word_probs',n,
          `A baker has <b>${total}</b> buns. She gives <b>${num}/${d}</b> of them away and packs the rest equally into <b>${trays}</b> trays. How many buns are on each tray?`, left/trays,
          `Find ${num}/${d} of ${total}, take it off, then divide by ${trays}.`,
          `Given away = ${total} ÷ ${d} × ${num} = ${total*num/d}. Left = ${left}. ${left} ÷ ${trays} = <b>${left/trays}</b>.`);
      } else if (s4 === 1) {
        // Two fractions of the same whole, then what is left.
        const d=12, a=2+(n%4), b=3+(n%5), total=d*(4+n);
        const left=total-total*a/d-total*b/d;
        add('fractions','add_sub',n,
          `A tank holds <b>${total}</b> litres. <b>${a}/${d}</b> is used on Monday and <b>${b}/${d}</b> on Tuesday. How many litres are left?`, left,
          'Add the two fractions used, then take that share off the total.',
          `Used = ${a}/${d} + ${b}/${d} = ${a+b}/${d}. That is ${total} ÷ ${d} × ${a+b} = ${total*(a+b)/d} L. Left = <b>${left} L</b>.`);
      } else if (s4 === 2) {
        // Working back from a part to the whole.
        const d=[3,4,5,6][n%4], part=(6+n)*d/1, whole=part*d/(d-1)|0;
        const num=d-1, w=(6+n)*d, p=w*num/d;
        add('fractions','fraction_of',n,
          `<b>${num}/${d}</b> of the pupils in a school is <b>${p}</b> pupils. How many pupils are there altogether?`, w,
          `If ${num} parts is ${p}, one part is ${p} ÷ ${num}.`,
          `One part = ${p} ÷ ${num} = ${p/num}. All ${d} parts = ${p/num} × ${d} = <b>${w}</b>.`);
      } else {
        // Comparing two fractions of DIFFERENT wholes — the common slip.
        // ⚠ t1 must divide by 4 and t2 by 2, or a class has 22.5 walkers.
        const t1=4*(6+n), t2=2*(18+n);
        const f1=t1*3/4, f2=t2/2;
        add('fractions','comparing',n,
          `Class A has <b>${t1}</b> pupils and <b>3/4</b> of them walk to school. Class B has <b>${t2}</b> pupils and <b>1/2</b> of them walk. How many <b>more</b> walkers does the larger group have?`, Math.abs(f1-f2),
          'Work out each group of walkers first — the fractions are of different totals.',
          `A: ${t1} ÷ 4 × 3 = ${f1}. B: ${t2} ÷ 2 = ${f2}. Difference = <b>${Math.abs(f1-f2)}</b>.`);
      }
    }
    { // Decimals — money and measures, with the decimal step buried mid-problem
      if (s4 === 0) {
        const price=12.25+n*0.35, qty=3+(n%5), paid=Math.ceil(price*qty/10)*10;
        add('decimals','word_probs',n,
          `Notebooks cost <b>Rs ${price.toFixed(2)}</b> each. Leena buys <b>${qty}</b> and pays with <b>Rs ${paid.toFixed(2)}</b>. What change does she get?`, (paid-price*qty).toFixed(2),
          'Multiply, then subtract from what she paid.',
          `${qty} × ${price.toFixed(2)} = Rs ${(price*qty).toFixed(2)}. ${paid.toFixed(2)} − ${(price*qty).toFixed(2)} = <b>Rs ${(paid-price*qty).toFixed(2)}</b>.`);
      } else if (s4 === 1) {
        // Decimal division with a unit change.
        const total=(4+n*0.5), pieces=4+(n%5);
        add('decimals','operations',n,
          `A plank <b>${total.toFixed(1)} m</b> long is cut into <b>${pieces}</b> equal pieces. How long is each piece in <b>centimetres</b>?`, Math.round(total*100/pieces),
          'Change metres to centimetres first, then divide.',
          `${total.toFixed(1)} m = ${total*100} cm. ${total*100} ÷ ${pieces} = <b>${Math.round(total*100/pieces)} cm</b>.`);
      } else if (s4 === 2) {
        // Two different priced items, one total.
        const a=(2+(n%4)), pa=8.5+n*0.25, b=(3+(n%5)), pb=15.75+n*0.5;
        const tot=a*pa+b*pb;
        add('decimals','operations',n,
          `A shopper buys <b>${a} kg</b> of onions at <b>Rs ${pa.toFixed(2)}</b> a kilogram and <b>${b} kg</b> of carrots at <b>Rs ${pb.toFixed(2)}</b> a kilogram. What is the total bill?`, tot.toFixed(2),
          'Price each item separately, then add.',
          `Onions ${a} × ${pa.toFixed(2)} = ${(a*pa).toFixed(2)}. Carrots ${b} × ${pb.toFixed(2)} = ${(b*pb).toFixed(2)}. Total <b>Rs ${tot.toFixed(2)}</b>.`);
      } else {
        // Ordering decimals in a context where the answer is a difference.
        const r=[3.05+n*0.11, 3.5+n*0.09, 3.25+n*0.1];
        const hi=Math.max(...r), lo=Math.min(...r);
        add('decimals','ordering',n,
          `Three runners recorded <b>${r[0].toFixed(2)}</b>, <b>${r[1].toFixed(2)}</b> and <b>${r[2].toFixed(2)}</b> minutes. How many minutes separate the fastest from the slowest?`, (hi-lo).toFixed(2),
          'The fastest time is the smallest number.',
          `Slowest ${hi.toFixed(2)}, fastest ${lo.toFixed(2)}. Difference = <b>${(hi-lo).toFixed(2)}</b> min.`);
      }
    }
    { // Powers — a cube or square used inside a bigger problem
      if (s4 === 0) {
        const side=2+n;
        add('powers','word_probs',n,
          `A cube-shaped box has an inside edge of <b>${side} cm</b>. How many <b>1 cm³</b> cubes fit inside?`, side**3,
          'Volume of a cube = side × side × side.',
          `${side}³ = <b>${side**3} cm³</b>.`);
      } else if (s4 === 1) {
        // Volume then a filling rate — the cube is step one of two.
        // ⚠ Volume is side³ × 1000 cm³, so the rate must divide 1000 or the
        // answer is 568.888… seconds. 200, 250 and 500 all do.
        const side=3+(n%6), rate=[200,250,500][n%3];
        add('powers','word_probs',n,
          `A cube-shaped tank has an inside edge of <b>${side*10} cm</b>. Water flows in at <b>${rate} cm³</b> a second. How many seconds does it take to fill?`, (side*10)**3/rate,
          'Find the volume first, then divide by the rate.',
          `Volume = ${side*10}³ = ${((side*10)**3).toLocaleString('en-GB')} cm³. ÷ ${rate} = <b>${(side*10)**3/rate} s</b>.`);
      } else if (s4 === 2) {
        // Comparing two powers.
        const a=2+(n%4), b=a+1;
        add('powers','calculate',n,
          `How much bigger is <b>${b}³</b> than <b>${a}³</b>?`, b**3-a**3,
          'Work out both cubes, then subtract.',
          `${b}³ = ${b**3}, ${a}³ = ${a**3}. ${b**3} − ${a**3} = <b>${b**3-a**3}</b>.`);
      } else {
        // Reading a power backwards.
        const side=2+(n%7), vol=side**3;
        add('powers','notation',n,
          `A cube has a volume of <b>${vol} cm³</b>. What is the total length of all <b>12</b> of its edges?`, 12*side,
          'Which number multiplied by itself three times gives the volume?',
          `Edge = ${side} cm because ${side}³ = ${vol}. 12 × ${side} = <b>${12*side} cm</b>.`);
      }
    }
    { // Average — the mean is an input as often as an output
      if (s4 === 0) {
        const mean=18+n, x1=mean-4, x2=mean+3, x3=mean-2, x4=mean+1;
        add('average','missing',n,
          `Five pupils average <b>${mean}</b> marks. Four scored <b>${x1}, ${x2}, ${x3}</b> and <b>${x4}</b>. What did the fifth score?`, mean*5-x1-x2-x3-x4,
          'Average × 5 gives the total. Take off the four you know.',
          `Total = ${mean} × 5 = ${mean*5}. Known = ${x1+x2+x3+x4}. Fifth = <b>${mean*5-x1-x2-x3-x4}</b>.`);
      } else if (s4 === 1) {
        // A new value changes the mean — two totals to reconcile.
        const k=4+(n%4), mean=12+n, extra=mean+((n%2)?6:-6)*2;
        const newMean=(mean*k+extra)/(k+1);
        add('average','mean',n,
          `<b>${k}</b> boxes have an average mass of <b>${mean} kg</b>. One more box of <b>${extra} kg</b> is added. What is the new average?`, Number(newMean.toFixed(2)),
          'Find the total mass, add the new box, then divide by the new count.',
          `Total = ${k} × ${mean} = ${mean*k}. New total = ${mean*k+extra} over ${k+1} boxes = <b>${Number(newMean.toFixed(2))} kg</b>.`);
      } else if (s4 === 2) {
        // Average of a rate, not of a list.
        const d1=40+2*n, d2=60+3*n, days=2;
        add('average','word_probs',n,
          `A rider travels <b>${d1} km</b> on Saturday and <b>${d2} km</b> on Sunday. What distance does he average per day over the weekend?`, (d1+d2)/days,
          'Add both distances, then share over the two days.',
          `${d1} + ${d2} = ${d1+d2}. ${d1+d2} ÷ 2 = <b>${(d1+d2)/days} km</b>.`);
      } else {
        // Working back from a target average.
        const k=4, so_far=[30+n, 34+n, 28+n], target=32+n;
        const need=target*(k)-so_far.reduce((a,b)=>a+b,0);
        add('average','word_probs',n,
          `In three tests a pupil scored <b>${so_far[0]}, ${so_far[1]}</b> and <b>${so_far[2]}</b>. What must she score in a fourth test to average <b>${target}</b>?`, need,
          'Work out the total four tests must reach, then take off what she has.',
          `Needed total = ${target} × 4 = ${target*4}. So far = ${so_far.reduce((a,b)=>a+b,0)}. She needs <b>${need}</b>.`);
      }
    }
    { // Ratio — sharing, scaling and working back from one share
      // ⚠ The old block answered `(r2-r1)*unit` with r1 free to exceed r2, so
      //   three of the twenty asked "how many MORE yellow than red" and answered
      //   −14. Differences are taken with the larger share first now.
      if (s4 === 0) {
        const r1=2+(n%4), r2=3+(n%5), unit=4+n, total=(r1+r2)*unit;
        add('ratio','word_probs',n,
          `Red and yellow flowers are planted in the ratio <b>${r1} : ${r2}</b>. There are <b>${total}</b> altogether. What is the <b>difference</b> between the two numbers of flowers?`, Math.abs(r2-r1)*unit,
          'Find one part first, then compare the two shares.',
          `Parts = ${r1+r2}. One part = ${total} ÷ ${r1+r2} = ${unit}. Difference = ${Math.abs(r2-r1)} × ${unit} = <b>${Math.abs(r2-r1)*unit}</b>.`);
      } else if (s4 === 1) {
        // Given ONE share, find the other — the whole is never stated.
        const r1=3+(n%4), r2=5+(n%6), unit=6+n;
        add('ratio','word_probs',n,
          `Money is shared between Aisha and Ben in the ratio <b>${r1} : ${r2}</b>. Aisha gets <b>Rs ${r1*unit}</b>. How much does <b>Ben</b> get?`, r2*unit,
          `Aisha's ${r1} parts are Rs ${r1*unit}, so find one part first.`,
          `One part = ${r1*unit} ÷ ${r1} = ${unit}. Ben = ${r2} × ${unit} = <b>Rs ${r2*unit}</b>.`);
      } else if (s4 === 2) {
        // A recipe scaled up — proportion, not sharing.
        // ⚠ flour is a multiple of forN, or the worked route shows "42.5 g per
        // person" — a correct final answer reached through a step no Grade 5
        // child would have written.
        const forN=4, flour=forN*(40+5*(n%8)), want=forN*(2+(n%4));
        add('ratio','word_probs',n,
          `A recipe for <b>${forN}</b> people uses <b>${flour} g</b> of flour. How much flour is needed for <b>${want}</b> people?`, flour*want/forN,
          `Find the flour for one person, then multiply by ${want}.`,
          `One person = ${flour} ÷ ${forN} = ${flour/forN} g. ${want} people = ${flour/forN} × ${want} = <b>${flour*want/forN} g</b>.`);
      } else {
        // Three-part ratio — the middle share is the one asked for.
        const a=1+(n%3), b=2+(n%4), c=3+(n%5), unit=5+n, total=(a+b+c)*unit;
        add('ratio','dividing',n,
          `<b>${total}</b> books are shared in the ratio <b>${a} : ${b} : ${c}</b> between three classes. How many does the <b>middle</b> share get?`, b*unit,
          'Add all three parts, divide to find one part, then take the middle share.',
          `Parts = ${a+b+c}. One part = ${total} ÷ ${a+b+c} = ${unit}. Middle = ${b} × ${unit} = <b>${b*unit}</b>.`);
      }
    }
    { // Percentage — every scenario needs the percentage AND something after it
      if (s4 === 0) {
        const p=[240,320,480,600,800][n%5], rate=[10,15,20,25][n%4], disc=p*rate/100;
        add('percentage','word_probs',n,
          `A shop gives a <b>${rate}%</b> discount on a bag priced at <b>Rs ${p}</b>. What is the sale price?`, p-disc,
          `Find ${rate}% of ${p}, then take it off.`,
          `Discount = ${rate}% of ${p} = Rs ${disc}. ${p} − ${disc} = <b>Rs ${p-disc}</b>.`);
      } else if (s4 === 1) {
        // Percentage of a total that must itself be worked out.
        const boys=120+4*n, girls=80+4*n, total=boys+girls;
        const rate=Math.round(boys*100/total);
        add('percentage','of_quantity',n,
          `A school has <b>${boys}</b> boys and <b>${girls}</b> girls. <b>25%</b> of the <b>girls</b> walk to school. How many girls walk?`, girls/4,
          'Only the girls matter here — find a quarter of that number.',
          `25% of ${girls} = ${girls} ÷ 4 = <b>${girls/4}</b>.`);
      } else if (s4 === 2) {
        // An increase, then a comparison with the original.
        const base=200+20*n, rate=[5,10,20,25][n%4], now=base+base*rate/100;
        add('percentage','increase',n,
          `A bus fare of <b>Rs ${base}</b> rises by <b>${rate}%</b>. A pupil travels <b>4</b> times. How much more does she pay in total than before?`, 4*(now-base),
          'Find the rise for one trip first, then multiply by 4.',
          `Rise = ${rate}% of ${base} = Rs ${now-base}. 4 trips = 4 × ${now-base} = <b>Rs ${4*(now-base)}</b>.`);
      } else {
        // Working back from the percentage to the whole.
        const part=45+3*n, rate=[10,20,25,50][n%4], whole=part*100/rate;
        add('percentage','meaning',n,
          `<b>${rate}%</b> of the pupils in a school is <b>${part}</b> pupils. How many pupils are there altogether?`, whole,
          `If ${rate}% is ${part}, work out what 100% would be.`,
          `1% = ${part} ÷ ${rate} = ${part/rate}. 100% = ${part/rate} × 100 = <b>${whole}</b>.`);
      }
    }
    { // Length — the unit asked for is rarely the unit given
      if (s4 === 0) {
        const l=8+n, w=5+(n%7), per=2*(l+w);
        add('length','word_probs',n,
          `A garden is <b>${l} m</b> by <b>${w} m</b>. A ribbon goes <b>twice</b> around its edge. How many <b>centimetres</b> of ribbon are needed?`, per*2*100,
          'One perimeter, doubled, then metres to centimetres.',
          `Perimeter = 2 × (${l}+${w}) = ${per} m. Twice = ${per*2} m = <b>${(per*200).toLocaleString('en-GB')} cm</b>.`);
      } else if (s4 === 1) {
        // Cutting with a remainder that must be reported in a different unit.
        const roll=(20+n), pieceCm=45+5*(n%6);
        const pieces=Math.floor(roll*100/pieceCm), leftCm=roll*100-pieces*pieceCm;
        add('length','conversion',n,
          `A roll of tape is <b>${roll} m</b> long. Pieces of <b>${pieceCm} cm</b> are cut from it. How many <b>centimetres</b> are left over when no more full pieces can be cut?`, leftCm,
          'Change metres to centimetres, then see what will not make another piece.',
          `${roll} m = ${roll*100} cm. ${pieces} pieces use ${pieces*pieceCm} cm. Left = <b>${leftCm} cm</b>.`);
      } else if (s4 === 2) {
        // A perimeter with one side derived from the other.
        const w=6+(n%9), l=w*2+3;
        add('length','perimeter',n,
          `A rectangle is <b>3 cm longer than twice its width</b>. Its width is <b>${w} cm</b>. What is its perimeter?`, 2*(l+w),
          'Work out the length first, then add both sides and double.',
          `Length = 2 × ${w} + 3 = ${l} cm. Perimeter = 2 × (${l} + ${w}) = <b>${2*(l+w)} cm</b>.`);
      } else {
        // Adding mixed units before dividing.
        const aM=3+(n%5), aCm=20+5*(n%8), bCm=80+10*(n%5), parts=3;
        const totalCm=Math.ceil((aM*100+aCm+bCm)/parts)*parts, extra=totalCm-(aM*100+aCm);
        add('length','conversion',n,
          `A rope is <b>${aM} m ${aCm} cm</b> long. A piece <b>${extra} cm</b> long is joined on. The rope is then cut into <b>${parts}</b> equal pieces. How long is each in centimetres?`, totalCm/parts,
          'Put everything in centimetres first, then divide.',
          `${aM} m ${aCm} cm = ${aM*100+aCm} cm. + ${extra} = ${totalCm} cm. ÷ ${parts} = <b>${totalCm/parts} cm</b>.`);
      }
    }
    { // Area — compound shapes and a cost per square metre
      if (s4 === 0) {
        const l=10+n, w=7+(n%6), bl=2+(n%4), bw=2+(n%3);
        add('area','word_probs',n,
          `A lawn is <b>${l} m</b> by <b>${w} m</b>. A flower bed <b>${bl} m</b> by <b>${bw} m</b> is made inside it. What area of lawn is left?`, l*w-bl*bw,
          'Big rectangle, take away the small one.',
          `${l} × ${w} = ${l*w} m². ${bl} × ${bw} = ${bl*bw} m². Left = <b>${l*w-bl*bw} m²</b>.`);
      } else if (s4 === 1) {
        // Area then a cost — two steps, and the rate is per m².
        const l=8+(n%9), w=6+(n%7), rate=35+5*(n%6);
        add('area','word_probs',n,
          `A floor <b>${l} m</b> by <b>${w} m</b> is tiled at <b>Rs ${rate}</b> a square metre. What does the tiling cost?`, l*w*rate,
          'Find the area, then multiply by the rate.',
          `Area = ${l} × ${w} = ${l*w} m². Cost = ${l*w} × ${rate} = <b>Rs ${(l*w*rate).toLocaleString('en-GB')}</b>.`);
      } else if (s4 === 2) {
        // An L-shape split into two rectangles.
        const a=6+(n%7), b=4+(n%5), c=3+(n%4), d=5+(n%6);
        add('area','compound',n,
          `An L-shaped room is made of two rectangles: one <b>${a} m</b> by <b>${b} m</b>, the other <b>${c} m</b> by <b>${d} m</b>. What is the total floor area?`, a*b+c*d,
          'Find each rectangle separately, then add.',
          `${a} × ${b} = ${a*b} m². ${c} × ${d} = ${c*d} m². Total = <b>${a*b+c*d} m²</b>.`);
      } else {
        // Working back from area to a missing side, then a perimeter.
        const w=4+(n%8), l=9+(n%7), area=l*w;
        add('area','rectangle',n,
          `A rectangle has an area of <b>${area} m²</b> and is <b>${w} m</b> wide. What is its perimeter?`, 2*(l+w),
          'Find the length from the area first.',
          `Length = ${area} ÷ ${w} = ${l} m. Perimeter = 2 × (${l} + ${w}) = <b>${2*(l+w)} m</b>.`);
      }
    }
    { // Capacity — a full-container answer, so remainders must be discarded
      if (s4 === 0) {
        const litres=12+n, used=250*(1+(n%4)), bottle=500;
        add('capacity','word_probs',n,
          `A canteen has <b>${litres} L</b> of juice. It uses <b>${used} mL</b> for tasting, then fills <b>${bottle} mL</b> bottles with the rest. How many <b>full</b> bottles?`, Math.floor((litres*1000-used)/bottle),
          'Litres to millilitres, take off what was used, then divide.',
          `${litres} L = ${(litres*1000).toLocaleString('en-GB')} mL. − ${used} = ${(litres*1000-used).toLocaleString('en-GB')} mL. ÷ ${bottle} = <b>${Math.floor((litres*1000-used)/bottle)}</b> full bottles.`);
      } else if (s4 === 1) {
        // Filling from several containers, answer in litres.
        const jugs=6+(n%7), each=750+50*(n%5);
        add('capacity','conversion',n,
          `<b>${jugs}</b> jugs each hold <b>${each} mL</b>. How many <b>litres</b> do they hold altogether?`, (jugs*each/1000).toFixed(2),
          'Total the millilitres first, then change to litres.',
          `${jugs} × ${each} = ${(jugs*each).toLocaleString('en-GB')} mL = <b>${(jugs*each/1000).toFixed(2)} L</b>.`);
      } else if (s4 === 2) {
        // A leak: a rate over time subtracted from a starting volume.
        const start=20+n, rate=150+10*(n%6), hours=4+(n%5);
        const left=start*1000-rate*hours;
        add('capacity','operations',n,
          `A tank holds <b>${start} L</b>. It leaks <b>${rate} mL</b> every hour for <b>${hours}</b> hours. How many <b>millilitres</b> are left?`, left,
          'Work out the whole leak first, then take it off.',
          `Leak = ${rate} × ${hours} = ${(rate*hours).toLocaleString('en-GB')} mL. ${(start*1000).toLocaleString('en-GB')} − ${(rate*hours).toLocaleString('en-GB')} = <b>${left.toLocaleString('en-GB')} mL</b>.`);
      } else {
        // Working back from bottles filled to the starting volume.
        const bottles=14+n, each=250+50*(n%4), spare=100+10*(n%9);
        add('capacity','word_probs',n,
          `A drum filled <b>${bottles}</b> bottles of <b>${each} mL</b> and had <b>${spare} mL</b> left over. How many <b>millilitres</b> did the drum hold?`, bottles*each+spare,
          'Find what the bottles took, then add what was left.',
          `${bottles} × ${each} = ${(bottles*each).toLocaleString('en-GB')} mL. + ${spare} = <b>${(bottles*each+spare).toLocaleString('en-GB')} mL</b>.`);
      }
    }
    { // Mass — kg/g conversions with a step on either side of them
      if (s4 === 0) {
        const bags=4+(n%6), kg=2+n/2, sold=1+n/4;
        add('mass','word_probs',n,
          `A grocer gets <b>${bags}</b> sacks of flour of <b>${kg.toFixed(1)} kg</b> each and sells <b>${sold.toFixed(2)} kg</b>. What mass is left, in <b>grams</b>?`, Math.round((bags*kg-sold)*1000),
          'Total the kilograms, take off what was sold, then × 1,000.',
          `${bags} × ${kg.toFixed(1)} = ${(bags*kg).toFixed(2)} kg. − ${sold.toFixed(2)} = ${(bags*kg-sold).toFixed(2)} kg = <b>${Math.round((bags*kg-sold)*1000).toLocaleString('en-GB')} g</b>.`);
      } else if (s4 === 1) {
        // Packing to a mass limit — a floor division with meaning.
        const limitKg=25+(n%10), itemG=400+50*(n%6);
        add('mass','word_probs',n,
          `A box may hold at most <b>${limitKg} kg</b>. Tins of <b>${itemG} g</b> are packed into it. What is the largest number of tins it can hold?`, Math.floor(limitKg*1000/itemG),
          'Change the limit to grams, then see how many tins fit.',
          `${limitKg} kg = ${(limitKg*1000).toLocaleString('en-GB')} g. ${(limitKg*1000).toLocaleString('en-GB')} ÷ ${itemG} = <b>${Math.floor(limitKg*1000/itemG)}</b> tins.`);
      } else if (s4 === 2) {
        // The weight of the container must be removed first.
        const grossKg=18+(n%12), boxG=650+25*(n%8), items=6+(n%7);
        const netG=grossKg*1000-boxG;
        add('mass','operations',n,
          `A crate of <b>${items}</b> equal melons weighs <b>${grossKg} kg</b> in total. The empty crate weighs <b>${boxG} g</b>. What is the mass of <b>one</b> melon, in grams? Round to the nearest gram.`, Math.round(netG/items),
          'Take the crate off first, then share between the melons.',
          `${grossKg} kg = ${(grossKg*1000).toLocaleString('en-GB')} g. − ${boxG} = ${netG.toLocaleString('en-GB')} g. ÷ ${items} = <b>${Math.round(netG/items).toLocaleString('en-GB')} g</b>.`);
      } else {
        // Comparing two masses given in different units.
        const aKg=3+(n%6), bG=2500+100*(n%9);
        add('mass','conversion',n,
          `Parcel A weighs <b>${aKg} kg</b> and parcel B weighs <b>${bG} g</b>. How many <b>grams</b> heavier is the heavier parcel?`, Math.abs(aKg*1000-bG),
          'Put both in the same unit before comparing.',
          `A = ${(aKg*1000).toLocaleString('en-GB')} g, B = ${bG.toLocaleString('en-GB')} g. Difference = <b>${Math.abs(aKg*1000-bG).toLocaleString('en-GB')} g</b>.`);
      }
    }
    { // Money & Profit/Loss — FIVE trading situations, rotated.
      // ⚠ This was one sentence twenty times ("A vendor buys 21 lunch boxes…",
      //   then 22, then 23) with the numbers walked upward, all labelled L4. A
      //   child who solves the first solves the other nineteen without reading
      //   them, so the chapter counted twenty questions and taught one.
      // ⚠ Depth is the point, not bigger numbers. The PSAC paper's fruitseller
      //   item needs FIVE steps: an unstated remainder (200 − 125), two
      //   multiplications, a sum, and a comparison against the cost. Every
      //   scenario below withholds at least one quantity the child must derive,
      //   and four of the five end in a profit-or-loss comparison rather than a
      //   single multiplication.
      const mScene = n % 5;
      if (mScene === 0) {
        // Two batches at different prices — the paper's own shape. The size of
        // the second batch is never stated.
        const total=180+5*n, cost=9000+120*n, first=100+3*n, p1=58+n, p2=p1-5;
        const rest=total-first, revenue=first*p1+rest*p2, profit=revenue-cost;
        // ⚠ The QUESTION varies too, not only the numbers. The paper splits this
        // item into (a) total selling price and (b) the profit; asking each in
        // turn gives two genuinely different problems off one situation, and
        // (a) is the harder one to skip - a child cannot guess it from the cost.
        const wantSP = n % 10 === 5;
        add('money','profit_loss',n,
          `A fruitseller buys <b>${total}</b> pineapples for <b>Rs ${cost.toLocaleString('en-GB')}</b>. He sells <b>${first}</b> of them at <b>Rs ${p1}</b> each and all the rest at <b>Rs ${p2}</b> each. ` +
          (wantSP ? `Calculate the <b>total selling price</b>.`
                  : `Is this a profit or a loss, and how much?`),
          wantSP ? revenue : Math.abs(profit),
          wantSP ? 'Find how many are left, then add what each batch brought in.'
                 : 'Find how many are left, add what each batch brought in, then compare with what he paid.',
          `Left over ${total} − ${first} = ${rest}. Batches: ${first} × ${p1} = Rs ${(first*p1).toLocaleString('en-GB')} and ${rest} × ${p2} = Rs ${(rest*p2).toLocaleString('en-GB')}. Selling price <b>Rs ${revenue.toLocaleString('en-GB')}</b>.` +
          (wantSP ? '' : ` He paid ${cost.toLocaleString('en-GB')}, so a <b>${profit>=0?'profit':'loss'} of Rs ${Math.abs(profit).toLocaleString('en-GB')}</b>.`));
      } else if (mScene === 1) {
        // Spoilage: part of the stock earns nothing, so the survivors must
        // cover the whole cost.
        const crates=8+n, per=24+n, unit=13+n, spoilt=9+2*n, sell=22+2*n;
        const stock=crates*per, cost=stock*unit, sold=stock-spoilt;
        const revenue=sold*sell, profit=revenue-cost;
        add('money','profit_loss',n,
          `A grocer buys <b>${crates}</b> crates of mangoes with <b>${per}</b> mangoes in each crate, paying <b>Rs ${unit}</b> for every mango. <b>${spoilt}</b> mangoes spoil and are thrown away. She sells all the others at <b>Rs ${sell}</b> each. What is her ${profit>=0?'profit':'loss'}?`, Math.abs(profit),
          'Count them, cost them, take off the spoilt ones, then sell the rest.',
          `${crates} × ${per} = ${stock} mangoes, costing ${stock} × ${unit} = Rs ${cost.toLocaleString('en-GB')}. Sold ${stock} − ${spoilt} = ${sold} at ${sell} = Rs ${revenue.toLocaleString('en-GB')}. ${profit>=0?'Profit':'Loss'} <b>Rs ${Math.abs(profit).toLocaleString('en-GB')}</b>.`);
      } else if (mScene === 2) {
        // Repacking: the unit that is bought is not the unit that is sold.
        // ⚠ bagKg divides kgPer exactly, so the repack never leaves a part-bag
        // the explanation would have to hand-wave away.
        const sacks=6+n, kgPer=25, perKg=32+n, bagKg=5, bagPrice=195+3*n;
        const kg=sacks*kgPer, cost=kg*perKg, bags=kg/bagKg;
        const revenue=bags*bagPrice, profit=revenue-cost;
        add('money','profit_loss',n,
          `A shopkeeper buys <b>${sacks}</b> sacks of rice weighing <b>${kgPer} kg</b> each at <b>Rs ${perKg}</b> per kilogram. He repacks all of it into <b>${bagKg} kg</b> bags and sells every bag at <b>Rs ${bagPrice}</b>. How much profit does he make?`, profit,
          'Total mass, then its cost, then how many bags it fills.',
          `${sacks} × ${kgPer} = ${kg} kg, costing ${kg} × ${perKg} = Rs ${cost.toLocaleString('en-GB')}. Bags = ${kg} ÷ ${bagKg} = ${bags}, selling for ${bags} × ${bagPrice} = Rs ${revenue.toLocaleString('en-GB')}. Profit <b>Rs ${profit.toLocaleString('en-GB')}</b>.`);
      } else if (mScene === 3) {
        // Overheads: a cost that is not the purchase price, and a per-item
        // answer at the end rather than a total.
        const items=40+2*n, unit=55+n, transport=300+10*n, sell=88+n;
        const cost=items*unit+transport, revenue=items*sell, profit=revenue-cost;
        add('money','profit_loss',n,
          `A trader buys <b>${items}</b> school bags at <b>Rs ${unit}</b> each and pays <b>Rs ${transport}</b> to have them delivered. She sells them all at <b>Rs ${sell}</b> each. What is her total ${profit>=0?'profit':'loss'}?`, Math.abs(profit),
          'The delivery is part of her cost too - add it before comparing.',
          `Bags ${items} × ${unit} = Rs ${(items*unit).toLocaleString('en-GB')}, plus ${transport} delivery = Rs ${cost.toLocaleString('en-GB')}. Money in ${items} × ${sell} = Rs ${revenue.toLocaleString('en-GB')}. ${profit>=0?'Profit':'Loss'} <b>Rs ${Math.abs(profit).toLocaleString('en-GB')}</b>.`);
      } else {
        // Working backwards from a required profit to a selling price — the
        // one direction the old template never asked for.
        // ⚠ The wanted profit is a whole multiple of the number of bottles, or
        // the price per bottle comes out in fractions of a rupee. The multiple
        // varies so the margin is not the same number every time - a child who
        // spots "always Rs 20 each" is pattern-matching, not working.
        const items=25+n, unit=64+2*n, margin=14+(n%4)*3, want=margin*items;
        const cost=items*unit, revenue=cost+want, sell=revenue/items;
        add('money','profit_loss',n,
          `A stallholder buys <b>${items}</b> water bottles at <b>Rs ${unit}</b> each. She wants a total profit of <b>Rs ${want}</b> when she has sold them all. What price must each bottle be sold at?`, sell,
          'Cost them all, add the profit she wants, then share between the bottles.',
          `Cost ${items} × ${unit} = Rs ${cost.toLocaleString('en-GB')}. She must take ${cost.toLocaleString('en-GB')} + ${want} = Rs ${revenue.toLocaleString('en-GB')}. Each = ${revenue.toLocaleString('en-GB')} ÷ ${items} = <b>Rs ${sell}</b>.`);
      }
    }
    { // Time — clock arithmetic, working backwards, and a rate over a duration
      const hhmm = m => `${String(Math.floor(m/60)%24).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
      if (s4 === 0) {
        const startH=8+(n%5), startM=15+(n%3)*10, dur=75+5*n, end=startH*60+startM+dur;
        add('time','duration',n,
          `A workshop starts at <b>${hhmm(startH*60+startM)}</b> and lasts <b>${dur}</b> minutes. What 24-hour time does it end? Give HH:MM.`, hhmm(end),
          'Add the minutes on, carrying every 60 into an hour.',
          `${hhmm(startH*60+startM)} + ${dur} min = <b>${hhmm(end)}</b>.`);
      } else if (s4 === 1) {
        // Working BACKWARDS from a finish time — the direction children miss.
        const endM=(13+(n%6))*60+(n%4)*15, dur=95+7*n;
        add('time','duration',n,
          `A film ends at <b>${hhmm(endM)}</b> after running for <b>${dur}</b> minutes. What time did it start? Give HH:MM.`, hhmm(endM-dur),
          'Count backwards from the finish time.',
          `${hhmm(endM)} − ${dur} min = <b>${hhmm(endM-dur)}</b>.`);
      } else if (s4 === 2) {
        // Two legs plus a wait, answered as hours and minutes in words.
        const leg1=40+5*(n%7), wait=15+5*(n%4), leg2=55+3*(n%9);
        const tot=leg1+wait+leg2;
        add('time','conversion',n,
          `A journey is <b>${leg1}</b> minutes, then a <b>${wait}</b> minute wait, then <b>${leg2}</b> minutes. How many <b>minutes</b> is the whole journey?`, tot,
          'Add all three parts.',
          `${leg1} + ${wait} + ${leg2} = <b>${tot} min</b> (${Math.floor(tot/60)} h ${tot%60} min).`);
      } else {
        // A repeating timetable — how many services fit in a window.
        const every=12+(n%9), fromM=(6+(n%3))*60, toM=fromM+ (2+(n%4))*60;
        add('time','duration',n,
          `Buses leave every <b>${every}</b> minutes from <b>${hhmm(fromM)}</b>. How many buses leave between <b>${hhmm(fromM)}</b> and <b>${hhmm(toM)}</b>, counting both those times?`, Math.floor((toM-fromM)/every)+1,
          'Find the length of the window in minutes, divide by the gap, then add the first bus.',
          `Window = ${toM-fromM} min. ${toM-fromM} ÷ ${every} = ${Math.floor((toM-fromM)/every)} gaps, so <b>${Math.floor((toM-fromM)/every)+1}</b> buses.`);
      }
    }
    { // Graphs: SIX questions over one frequency table.
      // ⚠ This block used to emit the same weighted-sum question twenty times
      //   over, and those twenty were 20 of the 21 Level-4 items in the whole
      //   `frequency` subsection - so a child met one question, twenty times,
      //   and it read as easy because it was familiar, not because it was easy.
      // ⚠ The variant selector must not share a modulus with a row formula.
      //   Selecting on n%6 while f3 was 3+(n%6) pinned f3 inside each variant:
      //   every "missing row" item answered 5.
      const v = (n - 1) % 6;
      const f1 = 4 + n, f2 = 6 + (n % 5), f3 = 2 + (n % 7);
      const total = f1 + 2*f2 + 3*f3, pupils = f1 + f2 + f3;
      const lead = 'The table shows how many fruits each pupil chose.';
      if (v === 0) {
        add('graphs','frequency',n,
          `${lead}${fruitTable(f1,f2,f3)}How many <b>fruits</b> were chosen altogether?`, total,
          'Each row is a number of fruits times a number of pupils. Add the three products.',
          `1×${f1} + 2×${f2} + 3×${f3} = ${f1} + ${2*f2} + ${3*f3} = <b>${total}</b> fruits.`);
      } else if (v === 1) {
        add('graphs','frequency',n,
          `${lead}${fruitTable(f1,f2,f3)}How many <b>fruits</b> were chosen by the pupils who took <b>more than one</b> fruit?`, 2*f2 + 3*f3,
          'Only the last two rows count. Multiply each row, then add the two products.',
          `2×${f2} + 3×${f3} = ${2*f2} + ${3*f3} = <b>${2*f2 + 3*f3}</b> fruits.`, 3);
      } else if (v === 2) {
        add('graphs','frequency',n,
          `${lead} One number has been rubbed out.${fruitTable(f1,f2,'?')}Altogether <b>${total}</b> fruits were chosen. How many <b>pupils</b> chose 3 fruits?`, f3,
          'Work out the fruits from the first two rows, take that off the total, then share what is left into threes.',
          `First two rows: 1×${f1} + 2×${f2} = ${f1 + 2*f2}. Left for the last row: ${total} − ${f1 + 2*f2} = ${3*f3}. ${3*f3} ÷ 3 = <b>${f3}</b> pupils.`);
      } else if (v === 3) {
        // ⚠ Own row values. On the numbers above, a percentage is whole for 3 of
        //   20 values of n and a mean for none of them - the class total is
        //   forced to 20, 25 or 50 so the answer is exact every time.
        const P = [20, 25, 50][Math.floor(n / 6) % 3];
        const p2 = 5 + (n % 5), p3 = 2 + (n % 7), p1 = P - p2 - p3;
        add('graphs','frequency',n,
          `${lead}${fruitTable(p1,p2,p3)}What <b>percentage</b> of the ${P} pupils chose <b>more than one</b> fruit?`, (p2 + p3) * (100 / P),
          `Count the pupils in the last two rows, then work out what share of ${P} that is.`,
          `${p2} + ${p3} = ${p2 + p3} pupils out of ${P}. ${p2 + p3}/${P} × 100 = <b>${(p2 + p3) * (100 / P)}%</b>.`);
      } else if (v === 4) {
        const price = 10 + (n % 5) * 2;
        add('graphs','frequency',n,
          `${lead}${fruitTable(f1,f2,f3)}Each fruit costs <b>Rs ${price}</b>. What is the <b>total cost</b> of all the fruits chosen?`, price * total,
          'Find how many fruits were chosen altogether first, then multiply by the price.',
          `Fruits = 1×${f1} + 2×${f2} + 3×${f3} = ${total}. Cost = ${total} × Rs ${price} = <b>Rs ${price * total}</b>.`);
      } else {
        add('graphs','frequency',n,
          `${lead}${fruitTable(f1,f2,f3)}If every pupil had chosen <b>one more fruit</b> than they did, how many <b>fruits</b> would have been chosen altogether?`, total + pupils,
          'One extra fruit for each pupil, so add the number of pupils to the fruits already chosen.',
          `Fruits now = ${total}. Pupils = ${f1} + ${f2} + ${f3} = ${pupils}. ${total} + ${pupils} = <b>${total + pupils}</b> fruits.`);
      }
    }
    { // Conversions — one per measure family, so the child must pick the rule
      if (s4 === 0) {
        const metres=2+n, cm=15+(n%6)*10, pieces=5+(n%5);
        const baseCm=metres*100+cm, totalCm=Math.ceil((baseCm+125+5*n)/pieces)*pieces;
        add('conversions','length',n,
          `A ribbon is <b>${metres} m ${cm} cm</b> long. A <b>${totalCm-baseCm} cm</b> piece is joined on, then it is cut into <b>${pieces}</b> equal pieces. How long is each, in centimetres?`, totalCm/pieces,
          'Everything into centimetres first, then divide.',
          `${metres} m ${cm} cm = ${baseCm} cm. + ${totalCm-baseCm} = ${totalCm} cm. ÷ ${pieces} = <b>${totalCm/pieces} cm</b>.`);
      } else if (s4 === 1) {
        // Mass, with the answer wanted in the OTHER unit.
        const kg=3+(n%9), g=250+50*(n%7), packs=4+(n%5);
        add('conversions','mass',n,
          `Each parcel weighs <b>${kg} kg ${g} g</b>. What do <b>${packs}</b> parcels weigh, in <b>grams</b>?`, packs*(kg*1000+g),
          'Turn one parcel into grams, then multiply.',
          `One = ${(kg*1000+g).toLocaleString('en-GB')} g. × ${packs} = <b>${(packs*(kg*1000+g)).toLocaleString('en-GB')} g</b>.`);
      } else if (s4 === 2) {
        // Capacity, with a subtraction before the conversion.
        const L=5+(n%8), mL=300+50*(n%9), used=1200+100*(n%6);
        add('conversions','capacity',n,
          `A container holds <b>${L} L ${mL} mL</b>. <b>${used} mL</b> is poured out. How much is left, in <b>millilitres</b>?`, L*1000+mL-used,
          'Change to millilitres first, then subtract.',
          `${L} L ${mL} mL = ${(L*1000+mL).toLocaleString('en-GB')} mL. − ${used.toLocaleString('en-GB')} = <b>${(L*1000+mL-used).toLocaleString('en-GB')} mL</b>.`);
      } else {
        // Time, converted the awkward way round.
        const h=2+(n%5), m=25+(n%7)*5, extra=40+5*(n%8);
        add('conversions','time',n,
          `A task takes <b>${h} h ${m} min</b>. A second task takes <b>${extra} min</b>. How long do both take, in <b>minutes</b>?`, h*60+m+extra,
          'Turn the hours into minutes, then add everything.',
          `${h} h ${m} min = ${h*60+m} min. + ${extra} = <b>${h*60+m+extra} min</b>.`);
      }
    }
  }
})();
