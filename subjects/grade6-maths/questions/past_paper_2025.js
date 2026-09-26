'use strict';
// PSAC 2025 Grade 6 Mathematics — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (Examiners' Report 2025).
// ⚠ Alt text never names the answer.
// Q23 and Q25 require diagrams and are in PSAC_PDF_QUESTIONS below.

STATIC_QUESTIONS.push(

  // ── Q1–Q11 & Q13–Q18: Short-answer items converted to MCQ ────────────────

  makeMCQ({ id:'g6m-pp25-001', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:1,
    question:'Calculate: 543 + 201',
    options:['634','734','744','844'],
    answer:'744',
    hint:'Add the ones, then tens, then hundreds.',
    explanation:'543 + 201 = 744. (3+1=4, 4+0=4, 5+2=7)',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-002', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:1,
    question:'Calculate: 857 − 326',
    options:['521','531','541','533'],
    answer:'531',
    hint:'Subtract ones, tens, hundreds in turn.',
    explanation:'857 − 326 = 531. (7−6=1, 5−2=3, 8−3=5)',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-003', chapterId:'g6-geometry', subsection:'2d_shapes', difficulty:1,
    question:'A quadrilateral with <b>only one pair of parallel sides</b> is called a <b>___</b>.',
    options:['Rhombus','Kite','Parallelogram','Trapezium'],
    answer:'Trapezium',
    hint:'A parallelogram has TWO pairs of parallel sides. Which shape has exactly one?',
    explanation:'A trapezium has exactly one pair of parallel sides. A parallelogram, rhombus and rectangle each have two pairs.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-004', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:1,
    question:'Calculate: 602 × 4',
    options:['2308','2318','2408','2418'],
    answer:'2408',
    hint:'4 × 600 = 2400, then 4 × 2 = 8.',
    explanation:'602 × 4 = (600 × 4) + (2 × 4) = 2400 + 8 = 2408.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-005', chapterId:'g6-fractions', subsection:'equivalent', difficulty:1,
    question:'Write <b>10/25</b> in its lowest terms.',
    options:['1/5','2/5','2/3','3/5'],
    answer:'2/5',
    hint:'What is the HCF of 10 and 25?',
    explanation:'HCF(10, 25) = 5. 10÷5 = 2, 25÷5 = 5. So 10/25 = 2/5.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-006', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert <b>6 km</b> into metres.',
    options:['600 m','6 000 m','60 000 m','600 000 m'],
    answer:'6 000 m',
    hint:'1 km = 1 000 m',
    explanation:'6 km = 6 × 1 000 m = 6 000 m.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-007', chapterId:'g6-numeration', subsection:'words_digits', difficulty:1,
    question:'Write in <b>figures</b>: four hundred and sixty-nine.',
    options:['469','496','649','694'],
    answer:'469',
    hint:'Hundreds first, then tens, then ones: 4 hundreds, 6 tens, 9 ones.',
    explanation:'Four hundred = 400, sixty = 60, nine = 9. Total: 469.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-008', chapterId:'g6-fractions', subsection:'add_sub', difficulty:1,
    question:'A strip is divided into 10 equal squares. <b>3 squares are shaded</b>. What fraction of the strip is <b>NOT</b> shaded?',
    options:['3/10','7/10','3/7','7/3'],
    answer:'7/10',
    hint:'10 squares total, 3 shaded → how many are unshaded?',
    explanation:'10 − 3 = 7 squares are not shaded. Fraction not shaded = 7/10.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-009', chapterId:'g6-four-ops', subsection:'division', difficulty:1,
    question:'Calculate: 1 536 ÷ 3',
    options:['412','512','532','612'],
    answer:'512',
    hint:'Try 3 × 500 = 1500, then 3 × 12 = 36.',
    explanation:'1 536 ÷ 3 = 512. Check: 512 × 3 = 1 536 ✓',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-010', chapterId:'g6-fractions', subsection:'add_sub', difficulty:1,
    question:'Calculate: 4/13 + 5/13',
    options:['8/13','9/13','9/26','1/13'],
    answer:'9/13',
    hint:'Same denominator — just add the numerators.',
    explanation:'4/13 + 5/13 = (4+5)/13 = 9/13.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-011', chapterId:'g6-numeration', subsection:'powers', difficulty:1,
    question:'Find the value of <b>7²</b>.',
    options:['14','21','49','77'],
    answer:'49',
    hint:'7² means 7 × 7.',
    explanation:'7² = 7 × 7 = 49.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-012', chapterId:'g6-geometry', subsection:'angles', difficulty:1,
    question:'An <b>obtuse</b> angle measures <b>___</b>.',
    options:['less than 90°','exactly 90°','between 90° and 180°','more than 180°'],
    answer:'between 90° and 180°',
    hint:'Acute < 90°, Right = 90°, Obtuse = ?, Reflex > 180°',
    explanation:'An obtuse angle is greater than 90° but less than 180°. More than 180° would be a reflex angle.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-013', chapterId:'g6-factors-hcf', subsection:'hcf', difficulty:1,
    question:'Find the <b>H.C.F.</b> of 10 and 15.',
    options:['2','3','5','10'],
    answer:'5',
    hint:'List the factors of 10 and 15 and find the highest one they share.',
    explanation:'Factors of 10: 1, 2, 5, 10. Factors of 15: 1, 3, 5, 15. Highest common factor = 5.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-014', chapterId:'g6-numeration', subsection:'compare_order', difficulty:1,
    question:'Arrange in <b>ascending order</b>: 9 403 &nbsp; 4 903 &nbsp; 3 409 &nbsp; 3 490',
    options:['3 490, 3 409, 4 903, 9 403','3 409, 3 490, 4 903, 9 403','3 409, 4 903, 3 490, 9 403','9 403, 4 903, 3 490, 3 409'],
    answer:'3 409, 3 490, 4 903, 9 403',
    hint:'Look at the thousands digit first, then the hundreds.',
    explanation:'3 409 < 3 490 (same thousands, 400 < 490) < 4 903 < 9 403. Ascending = smallest first.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-015', chapterId:'g6-geometry', subsection:'angles', difficulty:2,
    question:'Two angles lie on a straight line. One angle is 147°. Find the other angle <i>x</i>.',
    options:['33°','43°','53°','63°'],
    answer:'33°',
    hint:'Angles on a straight line add up to 180°.',
    explanation:'x = 180° − 147° = 33°. Angles on a straight line are supplementary (sum = 180°).',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-016', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:1,
    question:'Express <b>17/7</b> as a mixed number.',
    options:['1 3/7','2 1/7','2 3/7','3 1/7'],
    answer:'2 3/7',
    hint:'How many times does 7 go into 17? What is the remainder?',
    explanation:'17 ÷ 7 = 2 remainder 3, so 17/7 = 2 3/7.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-017', chapterId:'g6-decimals', subsection:'operations', difficulty:2,
    question:'Calculate: <b>0.3 × 1.5</b>',
    options:['0.045','0.45','4.5','45'],
    answer:'0.45',
    hint:'3 × 15 = 45. Count the decimal places (1 + 1 = 2 total).',
    explanation:'0.3 × 1.5: ignore decimals → 3 × 15 = 45. Two decimal places total → 0.45.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-018', chapterId:'g6-decimals', subsection:'operations', difficulty:1,
    question:'Calculate: <b>10.4 ÷ 2</b>',
    options:['0.52','5.02','5.2','52'],
    answer:'5.2',
    hint:'10 ÷ 2 = 5, and 0.4 ÷ 2 = 0.2.',
    explanation:'10.4 ÷ 2 = (10 ÷ 2) + (0.4 ÷ 2) = 5 + 0.2 = 5.2.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-019', chapterId:'g6-numeration', subsection:'place_value', difficulty:1,
    question:'In the number <b>53 264</b>, what is the <b>place value</b> of the digit 2?',
    options:['Ones','Tens','Hundreds','Thousands'],
    answer:'Hundreds',
    hint:'Write the digits in a place-value table: ten-thousands, thousands, hundreds, tens, ones.',
    explanation:'53 264: 5=ten-thousands, 3=thousands, <b>2=hundreds</b>, 6=tens, 4=ones.',
    learnMore:'📄 PSAC 2025 exam.' }),

  // ── Q19–Q28: Paper MCQ section ───────────────────────────────────────────

  makeMCQ({ id:'g6m-pp25-020', chapterId:'g6-factors-hcf', subsection:'lcm', difficulty:1,
    question:'Find the <b>L.C.M.</b> of 6 and 8.',
    options:['6','8','12','24'],
    answer:'24',
    hint:'List multiples of 6 and 8 until you find the first one they share.',
    explanation:'Multiples of 6: 6, 12, 18, 24… Multiples of 8: 8, 16, 24… LCM = 24.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-021', chapterId:'g6-factors-hcf', subsection:'primes', difficulty:1,
    question:'Which of the following numbers is <b>composite</b>?',
    options:['17','27','37','47'],
    answer:'27',
    hint:'A composite number has factors other than 1 and itself.',
    explanation:'27 = 3 × 9 = 3 × 3 × 3, so it has factors 1, 3, 9, 27 — it is composite. 17, 37, 47 are all prime.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-022', chapterId:'g6-ratio-pct', subsection:'percentage_of', difficulty:1,
    question:'Write <b>4/5</b> as a percentage.',
    options:['40%','50%','60%','80%'],
    answer:'80%',
    hint:'Multiply top and bottom to make the denominator 100, OR multiply 4/5 by 100.',
    explanation:'4/5 × 100 = 400/5 = 80%.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-023', chapterId:'g6-numeration', subsection:'place_value', difficulty:1,
    question:'Which number is <b>1 000 more</b> than 39 200?',
    options:['38 200','39 300','40 200','49 200'],
    answer:'40 200',
    hint:'Adding 1 000 increases the thousands digit by 1.',
    explanation:'39 200 + 1 000 = 40 200.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-024', chapterId:'g6-geometry', subsection:'2d_shapes', difficulty:2,
    question:'A <b>regular quadrilateral</b> is a quadrilateral where all sides <b>and</b> all angles are equal. Which shape is a regular quadrilateral?',
    options:['Rhombus','Parallelogram','Rectangle','Square'],
    answer:'Square',
    hint:'A rhombus has equal sides but its angles are not all 90°. A rectangle has equal angles but not always equal sides.',
    explanation:'A square has four equal sides AND four equal angles (all 90°). It is the only regular quadrilateral.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-025', chapterId:'g6-area-vol', subsection:'surface_area', difficulty:2,
    question:'The <b>total surface area</b> of a cube is <b>54 cm²</b>. Find the area of <b>one face</b>.',
    options:['3 cm²','9 cm²','18 cm²','27 cm²'],
    answer:'9 cm²',
    hint:'A cube has 6 identical faces.',
    explanation:'Total surface area = 6 × one face. One face = 54 ÷ 6 = 9 cm².',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-026', chapterId:'g6-numeration', subsection:'expanded', difficulty:2,
    question:'Find the value of: <b>(3 × 10) + (5 × 100) + (2 × 1) + (6 × 1 000)</b>',
    options:['6 523','6 325','6 532','6 253'],
    answer:'6 532',
    hint:'Work out each part: 30, 500, 2, 6 000. Then add.',
    explanation:'30 + 500 + 2 + 6 000 = 6 532.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6m-pp25-027', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:1,
    question:'Jasmine has <b>25 stickers</b>. She gives some away and now has <b>16 left</b>. How many stickers did she give away?',
    options:['9','11','16','25'],
    answer:'9',
    hint:'25 − ? = 16',
    explanation:'25 − 16 = 9 stickers given away.',
    learnMore:'📄 PSAC 2025 exam.' }),

  // ── Long-answer items converted to word problems ─────────────────────────

  makeNum({ id:'g6m-pp25-028', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'Samuel has <b>84 paper clips</b>. Alex has <b>4 times as many</b> paper clips as Samuel. How many paper clips does Alex have?',
    answer:336,
    hint:'Multiply Samuel\'s amount by 4.',
    explanation:'4 × 84 = 336 paper clips.' }),

  makeNum({ id:'g6m-pp25-029', chapterId:'g6-area-vol', subsection:'volume', difficulty:4,
    question:'A cuboid has a <b>volume of 350 cm³</b>. Its length is <b>10 cm</b> and its width is <b>7 cm</b>. Find the <b>height</b> of the cuboid.',
    answer:5,
    hint:'Volume = length × width × height. Rearrange to find height.',
    explanation:'Height = Volume ÷ (l × w) = 350 ÷ (10 × 7) = 350 ÷ 70 = 5 cm.' }),

  makeNum({ id:'g6m-pp25-030', chapterId:'g6-geometry', subsection:'perimeter', difficulty:4,
    question:'Triangle ABC is isosceles with AB = AC. The perimeter is <b>40 cm</b> and BC = <b>10 cm</b>. Find the length of <b>AC</b>.',
    answer:15,
    hint:'Perimeter = AB + BC + AC. Since AB = AC, these two sides share the remaining perimeter.',
    explanation:'AB + AC = 40 − 10 = 30 cm. Since AB = AC, each = 30 ÷ 2 = 15 cm.' }),

  makeNum({ id:'g6m-pp25-031', chapterId:'g6-ratio-pct', subsection:'discount', difficulty:4,
    question:'An item has a <b>20% discount</b>. After the discount, the <b>sale price is Rs 6 480</b>. Find the <b>original price</b>.',
    answer:8100,
    hint:'If 20% is taken off, the sale price is 80% of the original. So 80% = Rs 6 480.',
    explanation:'80% = Rs 6 480. Original (100%) = 6 480 × 100 ÷ 80 = Rs 8 100.' }),

  makeNum({ id:'g6m-pp25-032', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'A supermarket sells: Book = Rs 150, Packet of pencils = Rs 125.30, Pack of copybooks = Rs 210.<br>Find the cost of <b>2 packets of pencils</b>.',
    answer:250.60,
    acceptableAnswers:[250.6],
    hint:'Multiply Rs 125.30 by 2.',
    explanation:'2 × Rs 125.30 = Rs 250.60.' }),

  makeNum({ id:'g6m-pp25-033', chapterId:'g6-ratio-pct', subsection:'conversion', difficulty:4,
    question:'1 Euro (€) = Rs 55. Misha has <b>€ 650</b>. She exchanges all her money into rupees. How many <b>rupees</b> does she receive?',
    answer:35750,
    hint:'Multiply the number of euros by the rate.',
    explanation:'€ 650 × Rs 55 = Rs 35 750.' }),

  makeNum({ id:'g6m-pp25-034', chapterId:'g6-time-speed', subsection:'speed', difficulty:4,
    question:'Mike cycles from Town A to Town B, a distance of <b>34 km</b>. His journey takes <b>2 hours 50 minutes</b>. Calculate Mike\'s <b>average speed</b> in km/h.',
    answer:12,
    hint:'Convert 2 h 50 min to hours: 2 + 50/60 = 17/6 h. Speed = Distance ÷ Time.',
    explanation:'Time = 2 h 50 min = 2 + 50/60 = 17/6 h. Speed = 34 ÷ 17/6 = 34 × 6/17 = 12 km/h.' }),

  makeNum({ id:'g6m-pp25-035', chapterId:'g6-graphs', subsection:'averages', difficulty:4,
    question:'A bakery sells cupcakes each day. From Monday to Friday, the totals are 14, 17, 19, 15, and 11. Find the <b>total number of cupcakes sold from Monday to Friday</b>.',
    answer:76,
    hint:'Add all five daily totals.',
    explanation:'14 + 17 + 19 + 15 + 11 = 76 cupcakes.' }),

  makeNum({ id:'g6m-pp25-036', chapterId:'g6-graphs', subsection:'averages', difficulty:4,
    question:'A bakery sells cupcakes each day. The <b>average</b> for the whole week (7 days) is <b>16</b>. Monday–Friday total is 76. Saturday sold <b>twice as many as Sunday</b>.<br>Find the number of cupcakes sold on <b>Sunday</b>.',
    answer:12,
    hint:'Total for week = 16 × 7 = 112. Saturday + Sunday = 112 − 76 = 36. Let Sunday = x, Saturday = 2x.',
    explanation:'Total week = 16 × 7 = 112. Sat + Sun = 112 − 76 = 36. If Sun = x and Sat = 2x: 3x = 36, so x = 12. Sunday = 12.' }),

  makeNum({ id:'g6m-pp25-037', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'Ella buys <b>10 apples and 6 bananas</b> for <b>Rs 210</b>. Noel buys <b>3 apples and 2 bananas</b> for <b>Rs 65</b>.<br>Find the cost of <b>1 banana</b>.',
    answer:10,
    hint:'Notice that 10a + 6b = 210 and 3a + 2b = 65. Multiply the second equation by 3: 9a + 6b = 195. Subtract.',
    explanation:'10a + 6b = 210 and 3a + 2b = 65. Multiply second by 3: 9a + 6b = 195. Subtract: a = 15. Then 3(15) + 2b = 65 → 2b = 20 → b = Rs 10.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g6m-pp25-pdf-q7b', chapterId:'g6-numeration', marks:1, year:2025, grade:6, subject:'Mathematics',
    question:'Write in words: 1 342',
    markScheme:'one thousand three hundred and forty-two',
    type:'short' },

  { id:'g6m-pp25-pdf-q23', chapterId:'g6-geometry', marks:1, year:2025, grade:6, subject:'Mathematics',
    question:'(Q23) Which of the four diagrams (A, B, C, D) shows a reflex angle? (Diagram needed.)',
    markScheme:'B',
    type:'diagram' },

  { id:'g6m-pp25-pdf-q25', chapterId:'g6-geometry', marks:1, year:2025, grade:6, subject:'Mathematics',
    question:'(Q25) The diagram shows a compass with an arrow labelled R. In which direction is arrow R pointing? (Compass diagram needed.)',
    markScheme:'North East',
    type:'diagram' },

  { id:'g6m-pp25-pdf-q30', chapterId:'g6-four-ops', marks:3, year:2025, grade:6, subject:'Mathematics',
    question:'Given that 421 × 534 = 224 814, write down the answer to:\n(a) 224 814 ÷ 421\n(b) ___ × 534 = 224 814 + 534\n(c) 53.4 × 4.21',
    markScheme:'(a) 534 (b) 422 (c) 224.814',
    type:'short' },

  { id:'g6m-pp25-pdf-q32', chapterId:'g6-four-ops', marks:1, year:2025, grade:6, subject:'Mathematics',
    question:'There are 202 pupils. Each packet contains 16 erasers. Find the smallest number of packets needed so that every pupil gets one eraser.',
    markScheme:'13 (since 202 ÷ 16 = 12.625, round up to 13)',
    type:'short' },

  { id:'g6m-pp25-pdf-q33', chapterId:'g6-factors-hcf', marks:2, year:2025, grade:6, subject:'Mathematics',
    question:'From the list: 90, 2 400, 170, 83, 602, 125, 1 934\n(a) Write down the number that is divisible by 100.\n(b) Write down the number that is less than (10 × 13) AND is a multiple of 10.',
    markScheme:'(a) 2 400 (b) 90',
    type:'short' },

  { id:'g6m-pp25-pdf-q36b', chapterId:'g6-four-ops', marks:2, year:2025, grade:6, subject:'Mathematics',
    question:'A supermarket sells: Book = Rs 150, Packet of pencils = Rs 125.30, Pack of copybooks = Rs 210. Prisca buys a pack of copybooks, a book and 2 packets of pencils. She pays with two Rs 500 notes. How much change does she receive?',
    markScheme:'Total = 210 + 150 + 250.60 = 610.60. Change = 1000 − 610.60 = Rs 389.40',
    type:'short' },

  { id:'g6m-pp25-pdf-q37b', chapterId:'g6-ratio-pct', marks:2, year:2025, grade:6, subject:'Mathematics',
    question:'1 Pound Sterling (£) = Rs 60. 1 Euro (€) = Rs 55. After exchanging €650 to rupees, Misha spends Rs 28 550. She then exchanges her remaining money into Pound Sterling (£). How much does she receive in £?',
    markScheme:'Remaining rupees = 35 750 − 28 550 = Rs 7 200. £ = 7 200 ÷ 60 = £120',
    type:'short' },

  { id:'g6m-pp25-pdf-q38', chapterId:'g6-graphs', marks:4, year:2025, grade:6, subject:'Mathematics',
    question:'A bar chart shows rainfall over 5 days: Mon=30mm, Tue=10mm, Wed=40mm, Thu=30mm, Fri=missing. Total for the week = 120mm.\n(a) How much rainfall was recorded on Friday?\n(b) Complete the bar chart to show Friday\'s rainfall.\n(c) On which day was the greatest amount recorded?\n(d) Calculate the angle representing Thursday\'s rainfall on a pie chart.',
    markScheme:'(a) 10mm (b) bar of 10mm (c) Wednesday (d) 30/120 × 360 = 90°',
    type:'diagram' },

  { id:'g6m-pp25-pdf-q39', chapterId:'g6-time-speed', marks:2, year:2025, grade:6, subject:'Mathematics',
    question:'A zoo is open Mon–Fri: 10 a.m. to 5 p.m. and Sat–Sun: 9.30 a.m. to 6 p.m.\n(a) At what time does the zoo close on Tuesdays?\n(b) For how long is the zoo open on Saturdays?',
    markScheme:'(a) 5 p.m. (b) 8 h 30 min',
    type:'short' },

  { id:'g6m-pp25-pdf-q40', chapterId:'g6-four-ops', marks:3, year:2025, grade:6, subject:'Mathematics',
    question:'Ticket prices: Age ≤4 = Free, 5–15 = Rs 250, 16–60 = Rs 300, ≥61 = Rs 275. Brinda (41), husband (45), father (63), Anna (4), Jessie (13) visit the park.\n(a) How much does Brinda pay for the whole family?\n(b) Jessie needs to be at least 130 cm tall for the Monkey Swing. Jessie is 1½ m tall. (i) Can Jessie go on the Monkey Swing? (ii) Give a reason.',
    markScheme:'(a) Rs 300 + Rs 300 + Rs 275 + Rs 0 + Rs 250 = Rs 1 125 (b)(i) Yes (b)(ii) Jessie is 150 cm which is greater than 130 cm',
    type:'short' },

  { id:'g6m-pp25-pdf-q41a', chapterId:'g6-time-speed', marks:2, year:2025, grade:6, subject:'Mathematics',
    question:'Mike cycles from Town A to Town B. He leaves Town A at 10:15. His journey takes 2 hours 50 minutes. At what time does he reach Town B?',
    markScheme:'10:15 + 2h 50min = 13:05',
    type:'short' },

  { id:'g6m-pp25-pdf-q42', chapterId:'g6-fractions', marks:3, year:2025, grade:6, subject:'Mathematics',
    question:'(a) Write down a fraction equivalent to 4/5.\n(b) Bottles A, B, C, D contain: A=17/20 litre, B=4/5 litre, C=7/10 litre, D=19/40 litre.\n(i) Which bottle has the greatest volume of water?\n(ii) Find the total amount of water in bottles B and C. Give your answer in mL.',
    markScheme:'(a) any equivalent e.g. 8/10 (b)(i) Bottle A (b)(ii) 4/5 + 7/10 = 8/10 + 7/10 = 15/10 = 3/2 L = 1 500 mL',
    type:'short' },

  { id:'g6m-pp25-pdf-q43c', chapterId:'g6-graphs', marks:1, year:2025, grade:6, subject:'Mathematics',
    question:'Each symbol = 4 cupcakes. Draw a pictogram for Tuesday (17 cupcakes).',
    markScheme:'4 full symbols and a quarter symbol (4¼ symbols)',
    type:'diagram' },

  { id:'g6m-pp25-pdf-q44', chapterId:'g6-geometry', marks:3, year:2025, grade:6, subject:'Mathematics',
    question:'A graph shows points A(1,1), B(2,4) and C(4,4).\n(a) State the coordinates of A.\n(b) Plot and label point D so that ABCD is a parallelogram.\n(c) Find the area of parallelogram ABCD.',
    markScheme:'(a) (1,1) (b) D at (3,1) (c) base=BC=2 units, height=3 units, area=6 square units',
    type:'diagram' }

);
