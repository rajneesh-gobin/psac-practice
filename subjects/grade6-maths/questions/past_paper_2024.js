'use strict';
// PSAC Grade 6 Mathematics 2024 — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (mauritiuspapers.co.mu).
// Unanswerable drawing/shading questions are collected at the bottom in PSAC_PDF_QUESTIONS.

// ── SVG helpers (self-contained, unique names) ─────────────────────────────
function _g6ppClockSvg(h, m) {
  const toR = d => d * Math.PI / 180;
  const cx = 90, cy = 90, r = 78;
  const mDeg = (m / 60) * 360 - 90;
  const hDeg = ((h % 12 + m / 60) / 12) * 360 - 90;
  const mx = cx + 65 * Math.cos(toR(mDeg)), my = cy + 65 * Math.sin(toR(mDeg));
  const hx = cx + 48 * Math.cos(toR(hDeg)), hy = cy + 48 * Math.sin(toR(hDeg));
  let nums = '';
  for (let i = 1; i <= 12; i++) {
    const a = toR((i / 12) * 360 - 90);
    nums += `<text x="${(cx + 62 * Math.cos(a)).toFixed(1)}" y="${(cy + 62 * Math.sin(a) + 5).toFixed(1)}" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#222">${i}</text>`;
  }
  return `<svg viewBox="0 0 180 180" width="160" height="160" style="display:block;margin:8px auto;border-radius:50%;box-shadow:0 1px 4px #0003">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffef9" stroke="#333" stroke-width="3.5"/>
    ${nums}
    <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="#222"/>
  </svg>`;
}

function _g6ppHBarChart(title, data, xLabel) {
  const barH = 28, gap = 8, leftW = 82, rightW = 160, topPad = 30, bottomPad = 28;
  const maxVal = Math.max(...data.map(d => d.v));
  const h = data.length * (barH + gap) + topPad + bottomPad;
  const w = leftW + rightW + 20;
  let bars = '', ticks = '';
  data.forEach((d, i) => {
    const y = topPad + i * (barH + gap);
    const bw = (d.v / maxVal) * rightW;
    bars += `<text x="${leftW - 6}" y="${y + barH / 2 + 5}" text-anchor="end" font-size="12" font-family="sans-serif" fill="#333">${d.label}</text>`;
    bars += `<rect x="${leftW}" y="${y}" width="${bw.toFixed(1)}" height="${barH}" fill="#888" rx="2"/>`;
    bars += `<text x="${leftW + bw + 4}" y="${y + barH / 2 + 5}" font-size="11" fill="#555">${d.v}</text>`;
  });
  for (let v = 0; v <= maxVal; v += 2) {
    const x = leftW + (v / maxVal) * rightW;
    ticks += `<line x1="${x.toFixed(1)}" y1="${topPad}" x2="${x.toFixed(1)}" y2="${h - bottomPad}" stroke="#ddd" stroke-width="1"/>`;
    ticks += `<text x="${x.toFixed(1)}" y="${h - bottomPad + 14}" text-anchor="middle" font-size="11" fill="#666">${v}</text>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;margin:8px auto;max-width:100%">
    <text x="${w / 2}" y="18" text-anchor="middle" font-size="13" font-weight="bold" font-family="sans-serif" fill="#222">${title}</text>
    ${ticks}${bars}
    <text x="${leftW + rightW / 2}" y="${h - 4}" text-anchor="middle" font-size="11" fill="#555">${xLabel}</text>
    <line x1="${leftW}" y1="${topPad}" x2="${leftW}" y2="${h - bottomPad}" stroke="#444" stroke-width="1.5"/>
    <line x1="${leftW}" y1="${h - bottomPad}" x2="${leftW + rightW + 10}" y2="${h - bottomPad}" stroke="#444" stroke-width="1.5"/>
  </svg>`;
}

STATIC_QUESTIONS.push(

  // ── Section 1: Short-answer converted to MCQ (Qs 1–18) ─────────────────

  makeMCQ({ id:'g6m-pp24-001', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:1,
    question:'Work out:&nbsp; 504 + 294',
    options:['698','798','808','888'], answer:'798',
    hint:'Add ones: 4+4=8. Tens: 0+9=9. Hundreds: 5+2=7.',
    explanation:'504 + 294 = 798.' }),

  makeMCQ({ id:'g6m-pp24-002', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:1,
    question:'Work out:&nbsp; 859 − 321',
    options:['438','528','538','548'], answer:'538',
    hint:'Subtract digit by digit: ones 9−1=8, tens 5−2=3, hundreds 8−3=5.',
    explanation:'859 − 321 = 538.' }),

  makeMCQ({ id:'g6m-pp24-003', chapterId:'g6-geometry', subsection:'symmetry', difficulty:1,
    question:'How many lines of symmetry does an <b>equilateral triangle</b> have?',
    options:['1','2','3','6'], answer:'3',
    hint:'An equilateral triangle has 3 equal sides and 3 equal angles.',
    explanation:'An equilateral triangle has 3 lines of symmetry, one from each vertex to the midpoint of the opposite side.' }),

  makeMCQ({ id:'g6m-pp24-004', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:1,
    question:'Work out:&nbsp; 432 × 3',
    options:['1 276','1 286','1 296','1 326'], answer:'1 296',
    hint:'3×2=6, 3×3=9, 3×4=12.',
    explanation:'432 × 3 = 1 296.' }),

  makeMCQ({ id:'g6m-pp24-005', chapterId:'g6-numeration', subsection:'sequences', difficulty:1,
    question:'Write down the missing term in the sequence below.<br>30 ,&nbsp; 35 ,&nbsp; 40 ,&nbsp; <b>?</b> ,&nbsp; 50 ,&nbsp; 55',
    options:['42','44','45','48'], answer:'45',
    hint:'Look at the common difference between consecutive terms.',
    explanation:'The sequence increases by 5 each time: 40 + 5 = 45.' }),

  makeMCQ({ id:'g6m-pp24-006', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert <b>3 km</b> into m.',
    options:['300 m','3 000 m','30 000 m','300 000 m'], answer:'3 000 m',
    hint:'1 km = 1 000 m.',
    explanation:'3 × 1 000 = 3 000 m.' }),

  makeMCQ({ id:'g6m-pp24-007', chapterId:'g6-numeration', subsection:'words_digits', difficulty:1,
    question:'One hundred and two, written <b>in figures</b>, is:',
    options:['12','102','120','1 002'], answer:'102',
    hint:'"One hundred" = 100, "and two" = 2.',
    explanation:'One hundred and two = 102.' }),

  makeMCQ({ id:'g6m-pp24-008', chapterId:'g6-fractions', subsection:'equivalent', difficulty:1,
    question:'Which fraction is <b>equivalent</b> to <sup>1</sup>&frasl;<sub>4</sub>?',
    options:['<sup>2</sup>&frasl;<sub>8</sub>','<sup>2</sup>&frasl;<sub>6</sub>','<sup>3</sup>&frasl;<sub>10</sub>','<sup>3</sup>&frasl;<sub>8</sub>'], answer:'<sup>2</sup>&frasl;<sub>8</sub>',
    hint:'Multiply both numerator and denominator by the same number.',
    explanation:'1/4 × 2/2 = 2/8. The others (2/6 = 1/3, 3/10, 3/8) are not equal to 1/4.' }),

  makeMCQ({ id:'g6m-pp24-009', chapterId:'g6-numeration', subsection:'powers', difficulty:1,
    question:'Find the <b>value</b> of 6².',
    options:['12','16','36','62'], answer:'36',
    hint:'6² means 6 × 6.',
    explanation:'6 × 6 = 36.' }),

  makeMCQ({ id:'g6m-pp24-010', chapterId:'g6-fractions', subsection:'add_sub', difficulty:1,
    question:'Work out:&nbsp; <sup>5</sup>&frasl;<sub>7</sub> − <sup>2</sup>&frasl;<sub>7</sub>',
    options:['<sup>3</sup>&frasl;<sub>14</sub>','<sup>3</sup>&frasl;<sub>7</sub>','<sup>7</sup>&frasl;<sub>7</sub>','<sup>7</sup>&frasl;<sub>14</sub>'], answer:'<sup>3</sup>&frasl;<sub>7</sub>',
    hint:'Same denominator — just subtract the numerators.',
    explanation:'5/7 − 2/7 = 3/7.' }),

  makeMCQ({ id:'g6m-pp24-011', chapterId:'g6-geometry', subsection:'angles', difficulty:1,
    question:'Which of the following angles is a <b>straight angle</b>?',
    options:['90°','180°','270°','360°'], answer:'180°',
    hint:'A straight angle looks like a straight line.',
    explanation:'A straight angle = 180°. (90° = right angle, 360° = full turn.)' }),

  makeMCQ({ id:'g6m-pp24-012', chapterId:'g6-time-speed', subsection:'duration', difficulty:2,
    question:'The clockface below shows a time in the <b>afternoon</b>. Write down the time shown, in figures.<br>' + _g6ppClockSvg(4, 30),
    options:['4:00 pm','4:30 pm','5:30 pm','4:25 pm'], answer:'4:30 pm',
    hint:'The minute hand points to 6 (= 30 minutes). The hour hand is halfway between 4 and 5.',
    explanation:'Minute hand at 6 → 30 minutes. Hour hand between 4 and 5 → 4 hours. Time = 4:30 pm.' }),

  makeMCQ({ id:'g6m-pp24-013', chapterId:'g6-geometry', subsection:'angles', difficulty:2,
    question:'Two rays from a point form an angle of 334°. Calculate the size of the remaining angle <b>a</b> at the same point.',
    options:['26°','34°','56°','114°'], answer:'26°',
    hint:'Angles around a point add up to 360°.',
    explanation:'360° − 334° = 26°.' }),

  makeMCQ({ id:'g6m-pp24-014', chapterId:'g6-numeration', subsection:'compare_order', difficulty:1,
    question:'Write down the <b>largest</b> number that can be formed using the 4 digits 2, 9, 0, 5 (each once).',
    options:['9 250','9 502','9 520','5 920'], answer:'9 520',
    hint:'Put the largest digit first, then the next largest, and so on.',
    explanation:'Arrange in descending order: 9, 5, 2, 0 → 9 520.' }),

  makeMCQ({ id:'g6m-pp24-015', chapterId:'g6-four-ops', subsection:'division', difficulty:1,
    question:'Write down the correct number in the empty box.<br><b>□ ÷ 10 = 3 890</b>',
    options:['389','3 890','38 900','389 000'], answer:'38 900',
    hint:'If □ ÷ 10 = 3 890, then □ = 3 890 × 10.',
    explanation:'3 890 × 10 = 38 900.' }),

  makeMCQ({ id:'g6m-pp24-016', chapterId:'g6-area-vol', subsection:'area_rect', difficulty:1,
    question:'Find the <b>perimeter</b> of a square with side <b>7 cm</b>.',
    options:['14 cm','28 cm','49 cm','56 cm'], answer:'28 cm',
    hint:'A square has 4 equal sides. Perimeter = 4 × side.',
    explanation:'4 × 7 = 28 cm.' }),

  makeMCQ({ id:'g6m-pp24-018', chapterId:'g6-factors-hcf', subsection:'lcm', difficulty:2,
    question:'Find the <b>Lowest Common Multiple (L.C.M.)</b> of 21 and 35.',
    options:['7','56','105','735'], answer:'105',
    hint:'21 = 3 × 7. 35 = 5 × 7. LCM uses each prime factor at its highest power.',
    explanation:'LCM(21, 35) = 3 × 5 × 7 = 105.' }),

  // ── Section 2: MCQ (Qs 19–28) — as printed in paper ───────────────────

  makeMCQ({ id:'g6m-pp24-019', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:1,
    question:'How many <b>faces</b> does a <b>triangular prism</b> have?',
    options:['9','7','6','5'], answer:'5',
    hint:'A triangular prism has two triangular faces and three rectangular faces.',
    explanation:'2 triangles + 3 rectangles = 5 faces.' }),

  makeMCQ({ id:'g6m-pp24-021', chapterId:'g6-numeration', subsection:'place_value', difficulty:2,
    question:'What is the <b>value of 2</b> in the number 3.42?',
    options:['2 units','2 tenths','2 hundreds','2 hundredths'], answer:'2 hundredths',
    hint:'In 3.42: 3 is units, 4 is tenths, 2 is hundredths.',
    explanation:'The digit 2 is in the hundredths place, so its value is 2 hundredths.' }),

  makeMCQ({ id:'g6m-pp24-022', chapterId:'g6-factors-hcf', subsection:'hcf', difficulty:2,
    question:'What is the <b>Highest Common Factor (H.C.F.)</b> of 8 and 12?',
    options:['4','8','12','24'], answer:'4',
    hint:'Factors of 8: 1,2,4,8. Factors of 12: 1,2,3,4,6,12. Largest common factor?',
    explanation:'Factors of 8: {1,2,4,8}. Factors of 12: {1,2,3,4,6,12}. HCF = 4.' }),

  makeMCQ({ id:'g6m-pp24-023', chapterId:'g6-fractions', subsection:'add_sub', difficulty:2,
    question:'<sup>3</sup>&frasl;<sub>4</sub> as a <b>decimal</b> is:',
    options:['0.30','0.40','0.75','3.40'], answer:'0.75',
    hint:'Divide the numerator by the denominator: 3 ÷ 4.',
    explanation:'3 ÷ 4 = 0.75.' }),

  makeMCQ({ id:'g6m-pp24-024', chapterId:'g6-time-speed', subsection:'duration', difficulty:2,
    question:'Which of the following is a <b>leap year</b>?',
    options:['2015','2016','2017','2018'], answer:'2016',
    hint:'A leap year is divisible by 4.',
    explanation:'2016 ÷ 4 = 504 exactly → leap year. 2015, 2017, 2018 are not divisible by 4.' }),

  makeMCQ({ id:'g6m-pp24-025', chapterId:'g6-measure', subsection:'conversion', difficulty:2,
    question:'Anna has some money. After receiving <b>Rs 15</b> from her mother, she finds that she has a total of <b>Rs 25</b>. How much money did Anna have <b>at first</b>?',
    options:['Rs 10','Rs 15','Rs 35','Rs 40'], answer:'Rs 10',
    hint:'If her final amount is Rs 25 and she received Rs 15, subtract to find the original.',
    explanation:'Rs 25 − Rs 15 = Rs 10.' }),

  makeMCQ({ id:'g6m-pp24-028', chapterId:'g6-numeration', subsection:'expanded', difficulty:2,
    question:'(7 × 10) + (6 × 1) + (8 × 100) + (1 × 1 000) =',
    options:['1 867','1 876','8 176','8 716'], answer:'1 876',
    hint:'Calculate each term: 70 + 6 + 800 + 1 000.',
    explanation:'70 + 6 + 800 + 1 000 = 1 876.' }),

  // ── Section 3: Longer questions (Qs 29–45) converted to MCQ ────────────

  makeMCQ({ id:'g6m-pp24-029', chapterId:'g6-numeration', subsection:'primes', difficulty:2,
    question:'Which of the following is a <b>prime</b> number?',
    options:['51','79','87','91'], answer:'79',
    hint:'A prime number has exactly 2 factors: 1 and itself. Check by dividing by small primes.',
    explanation:'79 is prime. 51=3×17, 87=3×29, 91=7×13 — all composite.' }),

  makeMCQ({ id:'g6m-pp24-030', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:3,
    question:'Ali has <b>96</b> stickers in his collection. Ben has <b>6 times</b> as many stickers as Ali. How many stickers does Ben have?',
    options:['102','480','576','596'], answer:'576',
    hint:'Multiply Ali\'s stickers by 6.',
    explanation:'96 × 6 = 576 stickers.' }),

  makeMCQ({ id:'g6m-pp24-031', chapterId:'g6-ratio-pct', subsection:'percentage_of', difficulty:3,
    question:'There are <b>20 circles</b>. Five of them are shaded. How many <b>more</b> circles must be shaded so that <b>60%</b> of the circles are shaded?',
    options:['5','7','9','12'], answer:'7',
    hint:'Find 60% of 20 first. Then subtract the 5 already shaded.',
    explanation:'60% of 20 = 12. Already shaded: 5. More needed: 12 − 5 = 7.' }),

  makeMCQ({ id:'g6m-pp24-032', chapterId:'g6-fractions', subsection:'equivalent', difficulty:3,
    question:'Work out &nbsp;<sup>4</sup>&frasl;<sub>45</sub> ÷ <sup>8</sup>&frasl;<sub>15</sub>,&nbsp; giving your answer in its <b>simplest form</b>.',
    options:['<sup>1</sup>&frasl;<sub>6</sub>','<sup>1</sup>&frasl;<sub>3</sub>','<sup>2</sup>&frasl;<sub>3</sub>','<sup>8</sup>&frasl;<sub>675</sub>'], answer:'<sup>1</sup>&frasl;<sub>6</sub>',
    hint:'To divide by a fraction, multiply by its reciprocal: 4/45 × 15/8.',
    explanation:'4/45 × 15/8 = 60/360 = 1/6.' }),

  makeMCQ({ id:'g6m-pp24-034a', chapterId:'g6-measure', subsection:'conversion', difficulty:3,
    question:'<b>1 Pound Sterling (£) = Rs 58</b>.<br>Vina has £70. She exchanges <b>all</b> her money into rupees. How much does she get?',
    options:['Rs 3 780','Rs 4 060','Rs 4 600','Rs 5 800'], answer:'Rs 4 060',
    hint:'Multiply £70 by the exchange rate Rs 58.',
    explanation:'70 × 58 = Rs 4 060.' }),

  makeMCQ({ id:'g6m-pp24-034b', chapterId:'g6-measure', subsection:'conversion', difficulty:4,
    question:'<b>£1 = Rs 58 &nbsp;|&nbsp; €1 = Rs 50.</b><br>Vina exchanges £70 to get Rs 4 060. After spending Rs 2 560, she exchanges her remaining money into <b>Euros (€)</b>. How many euros does she receive?',
    options:['20','25','30','40'], answer:'30',
    hint:'First find the remaining rupees, then divide by the euro rate.',
    explanation:'Remaining: Rs 4 060 − Rs 2 560 = Rs 1 500. €1 = Rs 50, so 1 500 ÷ 50 = 30 euros.' }),

  makeMCQ({ id:'g6m-pp24-035a', chapterId:'g6-measure', subsection:'mass', difficulty:3,
    question:'A baker has <b>11 kg 410 g</b> of flour. He uses <b>9 kg 760 g</b>. How much flour is <b>left</b>?',
    options:['1 kg 350 g','1 kg 450 g','1 kg 650 g','2 kg 350 g'], answer:'1 kg 650 g',
    hint:'Convert to grams: 11 410 g − 9 760 g.',
    explanation:'11 410 − 9 760 = 1 650 g = 1 kg 650 g.' }),

  makeMCQ({ id:'g6m-pp24-035b', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:3,
    question:'A baker has 1 kg 650 g of flour remaining. He packs it into packets of <b>330 g</b> each. How many packets does he get?',
    options:['3','4','5','6'], answer:'5',
    hint:'Convert 1 kg 650 g to grams, then divide.',
    explanation:'1 650 ÷ 330 = 5 packets.' }),

  makeMCQ({ id:'g6m-pp24-036', chapterId:'g6-ratio-pct', subsection:'percentage_of', difficulty:4,
    question:'A cake costs <b>Rs 540</b>. The offer is: "Buy one at Rs 540, get the second at <b>50% off</b>." How much does a buyer pay in <b>total for 4 cakes</b>?',
    options:['Rs 1 080','Rs 1 350','Rs 1 620','Rs 2 160'], answer:'Rs 1 620',
    hint:'4 cakes = 2 pairs. Work out the cost of one pair first.',
    explanation:'Each pair: Rs 540 + Rs 270 (50% off) = Rs 810. 2 pairs: 2 × 810 = Rs 1 620.' }),

  makeMCQ({ id:'g6m-pp24-037a', chapterId:'g6-time-speed', subsection:'duration', difficulty:3,
    question:'Flights from Mauritius to Rodrigues depart at: Flight 1 = 09:00, Flight 2 = 09:30, Flight 3 = 10:00, <b>Flight 4 = 10:40</b>. The flight takes <b>1 hour 35 minutes</b>. At what time does Flight 4 arrive?',
    options:['11:15','12:15','12:40','11:45'], answer:'12:15',
    hint:'Add 1 hour 35 minutes to 10:40.',
    explanation:'10:40 + 1h = 11:40. 11:40 + 35 min = 12:15.' }),

  makeMCQ({ id:'g6m-pp24-037b', chapterId:'g6-time-speed', subsection:'duration', difficulty:3,
    question:'Liam reaches the airport at <b>07:45</b> to take Flight 2 (departs 09:30). The departure is <b>delayed by 20 minutes</b>. How long does Liam wait for his flight to depart?',
    options:['1 h 45 min','2 h 5 min','2 h 25 min','2 h 45 min'], answer:'2 h 5 min',
    hint:'New departure = 09:30 + 20 min = 09:50. Wait = 09:50 − 07:45.',
    explanation:'Delayed departure: 09:50. From 07:45 to 09:50 = 2 hours 5 minutes.' }),

  makeMCQ({ id:'g6m-pp24-039a', chapterId:'g6-time-speed', subsection:'speed', difficulty:3,
    question:'A car covers <b>126 km</b> between Town A and Town B in <b>2 hours</b>. Calculate the <b>average speed</b> of the car in km/h.',
    options:['63 km/h','64 km/h','128 km/h','252 km/h'], answer:'63 km/h',
    hint:'Speed = Distance ÷ Time.',
    explanation:'126 ÷ 2 = 63 km/h.' }),

  makeMCQ({ id:'g6m-pp24-039b', chapterId:'g6-time-speed', subsection:'speed', difficulty:4,
    question:'A car covers 126 km in 2 hours. A lorry covers the same 126 km at <b>42 km/h</b>. How much <b>more time</b> does the lorry take compared to the car?',
    options:['30 minutes','1 hour','2 hours','3 hours'], answer:'1 hour',
    hint:'Find lorry time: Time = Distance ÷ Speed. Then subtract car time (2 h).',
    explanation:'Lorry time: 126 ÷ 42 = 3 hours. Extra time: 3 − 2 = 1 hour.' }),

  makeMCQ({ id:'g6m-pp24-040a', chapterId:'g6-graphs', subsection:'line_graph', difficulty:2,
    question:'A line graph shows the cost of lentils. The line passes through (0, Rs 0) and (5 kg, Rs 100). What is the cost of <b>4 kg</b> of lentils?',
    options:['Rs 60','Rs 70','Rs 80','Rs 100'], answer:'Rs 80',
    hint:'The graph is a straight line through the origin. Find the cost per kg first.',
    explanation:'Rs 100 ÷ 5 kg = Rs 20/kg. 4 kg × Rs 20 = Rs 80.' }),

  makeMCQ({ id:'g6m-pp24-040b', chapterId:'g6-graphs', subsection:'line_graph', difficulty:3,
    question:'Lentils cost Rs 20 per kg (from a line graph). Rita buys <b>7 kg</b> and pays with a <b>Rs 200</b> note. How much <b>change</b> does she receive?',
    options:['Rs 40','Rs 60','Rs 70','Rs 80'], answer:'Rs 60',
    hint:'Cost of 7 kg = 7 × Rs 20. Change = Rs 200 − cost.',
    explanation:'7 × Rs 20 = Rs 140. Change: Rs 200 − Rs 140 = Rs 60.' }),

  makeMCQ({ id:'g6m-pp24-042', chapterId:'g6-ratio-pct', subsection:'increase', difficulty:4,
    question:'The price of a microwave is increased by <b>10%</b>. It now costs <b>Rs 3 740</b>. Calculate the <b>original</b> price of the microwave.',
    options:['Rs 3 374','Rs 3 400','Rs 3 630','Rs 4 114'], answer:'Rs 3 400',
    hint:'Rs 3 740 is 110% of the original price. Divide by 1.1 (or by 110, then × 100).',
    explanation:'Original = 3 740 ÷ 1.10 = Rs 3 400.' }),

  makeMCQ({ id:'g6m-pp24-043', chapterId:'g6-ratio-pct', subsection:'average', difficulty:4,
    question:'Kate scored <b>64</b> marks in English and <b>79</b> marks in French. Her <b>average</b> mark for English, French and Mathematics is <b>75</b>. How many marks did Kate score in <b>Mathematics</b>?',
    options:['68','75','79','82'], answer:'82',
    hint:'Total for 3 subjects = average × 3. Subtract English + French.',
    explanation:'Total = 75 × 3 = 225. English + French = 64 + 79 = 143. Maths = 225 − 143 = 82.' }),

  makeMCQ({ id:'g6m-pp24-044', chapterId:'g6-area-vol', subsection:'volume', difficulty:4,
    question:'The volume of a cuboid is <b>700 cm³</b>. Its height is <b>7 cm</b> and its width is <b>¼ of its length</b>. Find the <b>length</b> of the cuboid.',
    options:['10 cm','20 cm','25 cm','28 cm'], answer:'20 cm',
    hint:'Volume = length × width × height. Substitute width = length ÷ 4.',
    explanation:'700 = L × (L/4) × 7 → 700 = 7L²/4 → L² = 400 → L = 20 cm.' }),

  makeMCQ({ id:'g6m-pp24-045', chapterId:'g6-ratio-pct', subsection:'profit_loss', difficulty:4,
    question:'An apple costs <b>Rs 5.00</b>. An orange costs <b>Rs 3.50 more</b> than an apple. A fruit seller buys 250 apples and 300 oranges. After selling all of them, he makes a <b>profit of 25%</b>. Calculate the <b>total selling price</b> of the apples and oranges.',
    options:['Rs 3 800','Rs 4 560','Rs 4 750','Rs 5 000'], answer:'Rs 4 750',
    hint:'Orange price = Rs 5 + Rs 3.50 = Rs 8.50. Find total cost, then add 25%.',
    explanation:'Cost: 250×5 + 300×8.50 = 1 250 + 2 550 = Rs 3 800. Selling price = 3 800 × 1.25 = Rs 4 750.' }),

  // ── Q27: Bar chart (Phase 3 — SVG recreation) ──────────────────────────
  makeMCQ({ id:'g6m-pp24-027', chapterId:'g6-graphs', subsection:'bar_chart', difficulty:2,
    question:'The bar chart below represents the preferred ice cream flavour of a group of children.<br>' +
      _g6ppHBarChart('Ice Cream Flavour',
        [{label:'Almond',v:6},{label:'Strawberry',v:4},{label:'Chocolate',v:9},{label:'Vanilla',v:4}],
        'Number of Children') +
      'Which ice cream flavour is the <b>most popular</b> among the children?',
    options:['Almond','Chocolate','Strawberry','Vanilla'], answer:'Chocolate',
    hint:'Look at which bar is the longest.',
    explanation:'Chocolate has the highest bar (9 children), making it the most popular.' })

);

// ── PDF-only pool (questions needing drawing/shading — no auto-grade answer) ──
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6m-pp24-pdf-007b', chapterId:'g6-numeration', marks:1, year:2024, grade:6, subject:'Maths',
    question:'Write 8794 in words.',
    type:'short' },
  { id:'g6m-pp24-pdf-017', chapterId:'g6-measure', marks:1, year:2024, grade:6, subject:'Maths',
    question:'Maya has a Rs 50 note, a Rs 25 note, a 20-rupee coin, a 10-rupee coin and a 5-rupee coin. A book costs Rs 70. Tick (✓) the correct notes and/or coins to pay the exact amount.',
    type:'tick' },
  { id:'g6m-pp24-pdf-020', needsArtwork:true, chapterId:'g6-geometry', marks:1, year:2024, grade:6, subject:'Maths',
    question:'Which of the diagrams labelled A, B, C, D shows a parallelogram? (Diagrams show four quadrilaterals with tick-mark annotations.)',
    type:'mcq-diagram' },
  { id:'g6m-pp24-pdf-026', needsArtwork:true, chapterId:'g6-fractions', marks:1, year:2024, grade:6, subject:'Maths',
    question:'In which of the following diagrams (A, B, C, D) is HALF of the figure shaded?',
    type:'mcq-diagram' },
  { id:'g6m-pp24-pdf-033', chapterId:'g6-four-ops', marks:3, year:2024, grade:6, subject:'Maths',
    question:'Given that 356 × 283 = 100 748, without doing any calculation write the missing numbers: (a) 100 748 ÷ 283 = ? (b) ? × 283 = 100 748 + 283 (c) 35.6 × 2.83 = ?',
    type:'short' },
  { id:'g6m-pp24-pdf-038', needsArtwork:true, chapterId:'g6-geometry', marks:5, year:2024, grade:6, subject:'Maths',
    question:'A figure is made up of 7 identical right-angled triangles (ED = 18 cm, AE = 8 cm). (a) Find the length of CD. (b) Calculate the area of the shaded part.',
    type:'short' },
  { id:'g6m-pp24-pdf-041', chapterId:'g6-graphs', marks:7, year:2024, grade:6, subject:'Maths',
    question:'A pictogram shows restaurant customers Tue–Sat. The key is not given. (a) Which two days had the same number of customers? (b) Which day had the greatest number? (c) 250 customers visited on Friday — how many does each symbol represent? (d) Write the ratio Tuesday:Saturday in simplest form.',
    type:'short' }
);
