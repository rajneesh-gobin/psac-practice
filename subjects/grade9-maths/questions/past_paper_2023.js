'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  NCE 2023 Grade 9 Mathematics (N510) — past paper question bank
//  Source: Mauritius Examinations Syndicate, NCE 2023 Mathematics paper
//  (31 questions, 100 marks).
// ─────────────────────────────────────────────────────────────────────────────

// ── Section A: Very Short Answer (Q1–Q11, 1 mark each) ──────────────────────

STATIC_QUESTIONS.push(
  makeNum({ id:'g9m-pp23-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out:<br><br><span style="font-family:monospace;font-size:1.2em">  4 5 1<br>+ 2 3 6<br>──────</span>',
    answer:'687',
    hint:'Add column by column, carrying where needed.',
    explanation:'451 + 236 = 687. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; <sup>8</sup>&frasl;<sub>11</sub> &minus; <sup>5</sup>&frasl;<sub>11</sub>',
    answer:'3/11',
    hint:'Subtract the numerators; keep the denominator.',
    explanation:'<sup>8</sup>&frasl;<sub>11</sub> &minus; <sup>5</sup>&frasl;<sub>11</sub> = <sup>3</sup>&frasl;<sub>11</sub>. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-003', chapterId:'g9m-indices', subsection:'laws',
    difficulty:1,
    question:'Simplify &nbsp; (a&sup4;)&sup5;',
    answer:'a^20',
    hint:'Use the power law: multiply the exponents.',
    explanation:'(a&sup4;)&sup5; = a<sup>4&times;5</sup> = a<sup>20</sup>. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-004', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Calculate &nbsp; 2.3 &times; 3',
    answer:'6.9',
    hint:'Multiply 23 × 3 then adjust the decimal.',
    explanation:'2.3 &times; 3 = 6.9. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-005', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; 2 + 5 &minus; 4',
    answer:'3',
    hint:'Work left to right.',
    explanation:'2 + 5 = 7, then 7 &minus; 4 = 3. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-006', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:1,
    question:'Circle all the <b>odd numbers</b> from the list below.<br><br>23 &nbsp;&nbsp; 36 &nbsp;&nbsp; 52 &nbsp;&nbsp; 67 &nbsp;&nbsp; 48',
    options:['23 and 67', '36 and 52', '23 and 48', '52 and 67'],
    answer:'23 and 67',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'23 and 67 are odd (end in 3 and 7). 36, 52 and 48 are even. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-007', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Express &nbsp; <sup>27</sup>&frasl;<sub>100</sub> &nbsp; as a <b>decimal</b>.',
    answer:'0.27',
    hint:'Divide 27 by 100.',
    explanation:'<sup>27</sup>&frasl;<sub>100</sub> = 0.27. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-008', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'(a) Simplify &nbsp; 4y + 9y',
    answer:'13y',
    hint:'Add the coefficients.',
    explanation:'4y + 9y = 13y. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-009', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Factorise &nbsp; 2x + 4',
    answer:'2(x+2)',
    hint:'Find the HCF of 2x and 4.',
    explanation:'HCF = 2. &nbsp; 2x + 4 = 2(x + 2). 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-010', chapterId:'g9m-indices', subsection:'laws',
    difficulty:1,
    question:'Write &nbsp; 2 &times; 2 &times; 2 &nbsp; in <b>index form</b>.',
    answer:'2^3',
    hint:'How many times is 2 used as a factor?',
    explanation:'2 &times; 2 &times; 2 = 2&sup3;. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-011', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:2,
    question:'Find the <b>HCF</b> of 15 and 25.',
    answer:'5',
    hint:'List the factors of each number.',
    explanation:'Factors of 15: 1,3,5,15. Factors of 25: 1,5,25. HCF = 5. 📄 NCE 2023 Maths exam.' }),

  makeNum({ id:'g9m-pp23-012', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1, needsArtwork:true,
    question:'A number line runs from 5 to 6 and is divided into 10 equal parts. Point X is at the 3rd mark from 5.<br>Write the value of X.',
    answer:'5.3',
    hint:'Each division = 0.1. Count 3 divisions from 5.',
    explanation:'5 + 3 &times; 0.1 = 5.3. 📄 NCE 2023 Maths exam.' }),

  // ── Q12 MCQ block (a)–(h), 1 mark each ─────────────────────────────────────
  makeMCQ({ id:'g9m-pp23-013', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry',
    difficulty:1,
    question:'How many sides does a <b>hexagon</b> have?',
    options:['6', '8', '7', '5'],
    answer:'6',
    hint:'Hex- is the Greek prefix for six.',
    explanation:'A hexagon has 6 sides. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-014', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'What is the <b>value</b> of the digit 2 in the number 6231?',
    options:['200', '2000', '20', '2'],
    answer:'200',
    hint:'Look at the place value: thousands, hundreds, tens, units.',
    explanation:'In 6231 the digit 2 is in the hundreds column, so its value is 200. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-015', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Reduce &nbsp; <sup>24</sup>&frasl;<sub>30</sub> &nbsp; to its <b>lowest terms</b>.',
    options:['<sup>4</sup>&frasl;<sub>5</sub>', '<sup>8</sup>&frasl;<sub>10</sub>', '<sup>5</sup>&frasl;<sub>6</sub>', '<sup>12</sup>&frasl;<sub>15</sub>'],
    answer:'<sup>4</sup>&frasl;<sub>5</sub>',
    hint:'Find the HCF of 24 and 30.',
    explanation:'HCF(24, 30) = 6. &nbsp; <sup>24</sup>&frasl;<sub>30</sub> = <sup>4</sup>&frasl;<sub>5</sub>. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-016', chapterId:'g9m-finance', subsection:'salaries_and_bills',
    difficulty:1,
    question:'One mobile phone costs Rs 9 000. What is the cost of <b>4</b> such mobile phones?',
    options:['Rs 36 000', 'Rs 3 600', 'Rs 6 300', 'Rs 63 000'],
    answer:'Rs 36 000',
    hint:'Multiply Rs 9 000 by 4.',
    explanation:'9 000 &times; 4 = Rs 36 000. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-017', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Which one of the following is a <b>square</b> number?',
    options:['25', '30', '20', '11'],
    answer:'25',
    hint:'A square number is the result of multiplying an integer by itself.',
    explanation:'5 &times; 5 = 25. The others (30, 20, 11) are not perfect squares. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-018', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'The <b>sum</b> of two numbers is 36. One of the numbers is 20. What is the other number?',
    options:['16', '56', '36', '20'],
    answer:'16',
    hint:'Subtract 20 from 36.',
    explanation:'36 &minus; 20 = 16. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-019', chapterId:'g9m-coordinates', subsection:'gradient',
    difficulty:1, needsArtwork:true,
    question:'The graph shows point <b>A</b>. What are the <b>coordinates</b> of A?<br><small>(Point A is shown at x = 3, y = 2 on the grid.)</small>',
    options:['(3, 2)', '(2, 3)', '(0, 3)', '(2, 0)'],
    answer:'(3, 2)',
    hint:'Read x first (along), then y (up).',
    explanation:'A is at 3 on the x-axis and 2 on the y-axis, so A = (3, 2). 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-020', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry',
    difficulty:1,
    question:'What is the <b>sum</b> of the interior angles of a triangle?',
    options:['180°', '360°', '270°', '90°'],
    answer:'180°',
    hint:'Think of a triangle with angles that add to a straight line.',
    explanation:'The interior angles of any triangle sum to 180°. 📄 NCE 2023 Maths exam.' }),

  // ── Q13 onwards: short answer ──────────────────────────────────────────────
  makeNum({ id:'g9m-pp23-021', chapterId:'g9m-patterns', subsection:'sequences_and_figures',
    difficulty:1,
    question:'Complete the sequence: &nbsp; 3, &nbsp;10, &nbsp;17, &nbsp;24, &nbsp;___',
    answer:'31',
    hint:'Find the common difference.',
    explanation:'The difference is +7 each time. 24 + 7 = 31. 📄 NCE 2023 Maths exam.' }),

  makeMCQ({ id:'g9m-pp23-022', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Arrange these numbers in <b>descending order</b>: &nbsp; 5213 &nbsp; 5321 &nbsp; 5132 &nbsp; 5231',
    options:['5321, 5231, 5213, 5132', '5132, 5213, 5231, 5321', '5321, 5213, 5231, 5132', '5231, 5321, 5213, 5132'],
    answer:'5321, 5231, 5213, 5132',
    hint:'Descending means largest to smallest.',
    explanation:'5321 &gt; 5231 &gt; 5213 &gt; 5132. 📄 NCE 2023 Maths exam.' })
);

// ── Structured Questions ─────────────────────────────────────────────────────

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(

  { id:'g9m-pp23-pdf-001', chapterId:'g9m-number-revision', marks:2, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'Convert:<br>(a) 7 kg = ________ g &nbsp; [1]<br>(b) 350 cm = ________ m &nbsp; [1]',
    markScheme:'(a) 7 × 1000 = 7000 g [B1]\n(b) 350 ÷ 100 = 3.5 m [B1]' },

  { id:'g9m-pp23-pdf-002', chapterId:'g9m-number-revision', marks:3, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) China is 4 hours <b>ahead</b> of Mauritius. If it is 17:00 in Mauritius, what time is it in China? &nbsp; [1]<br><br>(b) A car travels 90 km in 3 hours. Find the <b>average speed</b> of the car. &nbsp; [2]',
    markScheme:'(a) 17:00 + 4 = 21:00 in China [B1]\n(b) Speed = 90 ÷ 3 = 30 km/h [M1, A1]' },

  { id:'g9m-pp23-pdf-003', chapterId:'g9m-manipulation', marks:2, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Solve: &nbsp; x + 3 = 12 &nbsp; [1]<br><br>(b) Which of the following number lines shows x &le; 3? Tick the correct box. &nbsp; [1]<br><br>Options shown: (1) open circle at 3, arrow going right; (2) open circle at 3, arrow going left; (3) solid dot at 3, arrow going left.',
    markScheme:'(a) x = 9 [B1]\n(b) Third number line (solid dot at 3, arrow pointing left — x ≤ 3) [B1]' },

  { id:'g9m-pp23-pdf-004', chapterId:'g9m-geometry-revision', marks:4, year:2023, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'(a) A circle has diameter 50 cm. Find its <b>radius</b>. &nbsp; [2]<br><br>(b) Three men take 18 days to build a wall. How many days will <b>one</b> man take to build the same wall? &nbsp; [2]',
    markScheme:'(a) Radius = diameter ÷ 2 = 50 ÷ 2 = 25 cm [M1, A1]\n(b) 1 man takes 3 × 18 = 54 days [M1, A1]' },

  { id:'g9m-pp23-pdf-005', chapterId:'g9m-geometry-revision', marks:6, year:2023, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'(a) Match each angle in Column A to its name in Column B. (Angles shown: reflex, acute, straight, obtuse.) &nbsp; [4]<br><br>(b) Two lines meet. One angle is 20&deg;. Find angle <i>a</i> (vertically opposite angle). &nbsp; [2]',
    markScheme:'(a) Match: reflex (>180°), acute (<90°), straight (=180°), obtuse (90°–180°). [B1 each correct match, max 4]\n(b) Vertically opposite angles are equal: a = 180° − 20° = 160° (if supplementary), or a = 20° if vertically opposite. From diagram, a + 20° = 90° → a = 70° [M1, A1] (accept correct reading from diagram)' },

  { id:'g9m-pp23-pdf-006', chapterId:'g9m-matrices', marks:4, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'Given: A = (1, 7) and B = (6, 4) as column vectors.<br><br>(a) Find A + B. &nbsp; [2]<br>(b) Find <sup>1</sup>&frasl;<sub>2</sub>B. &nbsp; [2]',
    markScheme:'(a) A + B = (1+6, 7+4) = (7, 11) [M1, A1]\n(b) ½B = (½×6, ½×4) = (3, 2) [M1, A1]' },

  { id:'g9m-pp23-pdf-007', chapterId:'g9m-expressions', marks:1, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'In the expression 4x + 1, what is the <b>coefficient</b> of x?',
    markScheme:'4 [B1]' },

  { id:'g9m-pp23-pdf-008', chapterId:'g9m-number-revision', marks:4, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Write 21.37 to 1 decimal place. &nbsp; [1]<br>(b) Find &radic;49. &nbsp; [1]<br>(c) Evaluate &nbsp; <sup>5</sup>&frasl;<sub>8</sub> &minus; <sup>1</sup>&frasl;<sub>4</sub>. &nbsp; [2]',
    markScheme:'(a) 21.4 [B1]\n(b) 7 [B1]\n(c) 5/8 − 2/8 = 3/8 [M1, A1]' },

  { id:'g9m-pp23-pdf-009', chapterId:'g9m-coordinates', marks:3, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'The equation of a straight line is y = 2x + 5.<br><br>(d)(i) What is its <b>gradient</b>? Circle the correct answer: &nbsp; 1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 5 &nbsp; [1]<br>(d)(ii) What are the coordinates of the <b>y-intercept</b>? Tick: &nbsp; (0,1) &nbsp;&nbsp; (0,2) &nbsp;&nbsp; (0,5) &nbsp; [1]<br>(e) The gradient of line S in the graph is ___ . (negative / zero / positive) &nbsp; [1]',
    markScheme:'(d)(i) gradient = 2 [B1]\n(d)(ii) y-intercept = (0, 5) [B1]\n(e) positive (line S slopes up to the right) [B1]' },

  { id:'g9m-pp23-pdf-010', chapterId:'g9m-probability', marks:2, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'A bag contains 4 white and 6 black marbles. A marble is chosen at random.<br><br>(a) Find the probability that it is <b>black</b>. &nbsp; [1]<br>(b) Find the probability that it is <b>red</b>. &nbsp; [1]',
    markScheme:'(a) P(black) = 6/10 = 3/5 [B1]\n(b) P(red) = 0 (there are no red marbles) [B1]' },

  { id:'g9m-pp23-pdf-011', chapterId:'g9m-vectors', marks:2, year:2023, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Triangle LMN has vertices L(1, 4), N(1, 1) and M(4, 1).<br><br>Draw the image of triangle LMN under a <b>reflection in the x-axis</b>. &nbsp; [2]',
    markScheme:'L → (1, −4), N → (1, −1), M → (4, −1). Correct triangle drawn [B2]' },

  { id:'g9m-pp23-pdf-012', chapterId:'g9m-quadratics', marks:4, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Factorise: &nbsp; x&sup2; + 11x + 10. &nbsp; [2]<br>(b) Hence, solve: &nbsp; x&sup2; + 11x + 10 = 0. &nbsp; [2]',
    markScheme:'(a) (x + 1)(x + 10) [M1, A1]\n(b) x = −1 or x = −10 [M1, A1]' },

  { id:'g9m-pp23-pdf-013', chapterId:'g9m-trigonometry', marks:5, year:2023, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Triangle ABC has angle ACB = 90&deg;, BC = 15 cm, AC = 8 cm. M lies on BC such that angle CAM = 40&deg;.<br>[sin 40&deg; = 0.64, cos 40&deg; = 0.77, tan 40&deg; = 0.84]<br><br>(a) Find CM. &nbsp; [2]<br>(b) Find the area of triangle ABM. &nbsp; [3]',
    markScheme:'(a) tan(CAM) = CM/AC → CM = 8 × tan 40° = 8 × 0.84 = 6.72 cm ≈ 6.7 cm [M1, A1]\n(b) MB = BC − CM = 15 − 6.72 = 8.28 cm. Area = ½ × MB × AC = ½ × 8.28 × 8 = 33.1 cm² [M2, A1]' },

  { id:'g9m-pp23-pdf-014', chapterId:'g9m-finance', marks:7, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Ali works 6 hours daily from Monday to Friday at Rs 100 per hour. On Saturday he works 2 hours 45 minutes at Rs 200 per hour. Calculate Ali\'s <b>total earnings</b> from Monday to Saturday. &nbsp; [4]<br><br>(b) Marbles are shared among 3 children. Clara gets <b>half</b> the marbles. Ben gets <b>twice</b> as many as Amy. The information is shown in a pie chart. Find the <b>angle</b> representing Ben\'s share. &nbsp; [3]',
    markScheme:'(a) Weekday: 5×6×100 = Rs 3000. Saturday: 2.75×200 = Rs 550. Total = Rs 3550 [M3, A1]\n(b) Clara = 1/2, Ben + Amy = 1/2. Ben = 2×Amy → 3×Amy = 1/2 → Amy = 1/6, Ben = 2/6 = 1/3. Angle for Ben = 1/3 × 360 = 120° [M2, A1]' },

  { id:'g9m-pp23-pdf-015', chapterId:'g9m-volume', marks:10, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'An <b>open</b> rectangular container A has length 10 cm, width 6 cm and height x cm.<br><br>(a) The total surface area of the container is 284 cm&sup2;. Find x. &nbsp; [3]<br>(b) Using your value of x, find the <b>volume</b> of Container A. &nbsp; [2]<br>(c) A cylindrical glass has radius 3 cm and height 3.5 cm. Calculate the volume. (Take &pi; = <sup>22</sup>&frasl;<sub>7</sub>.) &nbsp; [2]<br>(d) Five such cylindrical glasses are completely filled with water and poured into Container A. Find the volume of water that <b>overflows</b>. &nbsp; [3]',
    markScheme:'(a) Open box: SA = lb + 2lh + 2bh = 10×6 + 2×10×x + 2×6×x = 60 + 20x + 12x = 60+32x = 284 → 32x = 224 → x = 7 cm [M2, A1]\n(b) V = 10×6×7 = 420 cm³ [M1, A1]\n(c) V = 22/7×9×3.5 = 22/7×31.5 = 99 cm³ [M1, A1]\n(d) 5 glasses = 5×99 = 495 cm³. Overflow = 495−420 = 75 cm³ [M2, A1]' },

  { id:'g9m-pp23-pdf-016', chapterId:'g9m-finance', marks:3, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'Ann invests Rs 125 000 in a bank at <b>simple interest</b> of 2.5% per annum.<br><br>After a few years she withdraws all her money, which amounts to Rs 137 500.<br><br>For how many <b>years</b> did Ann\'s money remain in the bank?',
    markScheme:'SI = 137500 − 125000 = Rs 12500 [B1]. SI = PRT/100 → 12500 = 125000×2.5×T/100 → T = 12500×100/(125000×2.5) = 4 years [M1, A1]' },

  { id:'g9m-pp23-pdf-017', chapterId:'g9m-simultaneous', marks:4, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'Solve the simultaneous equations:<br><br>4x &minus; 5y = &minus;7<br>6x + y = 15',
    markScheme:'From eq2: y = 15−6x [M1]. Sub into eq1: 4x−5(15−6x)=−7 → 4x−75+30x=−7 → 34x=68 → x=2 [M1, A1]. y=15−12=3 [A1]' },

  { id:'g9m-pp23-pdf-018', chapterId:'g9m-geometry-revision', marks:7, year:2023, grade:9,
    subject:'Mathematics', type:'written',
    question:'In a class there are 36 students. 20 like chocolates, 18 like biscuits, 6 like neither, x like both.<br><br>(i) Represent the information on the Venn diagram. &nbsp; [3]<br>(ii) Find the value of x. &nbsp; [2]<br>(iii) How many students like <b>chocolates only</b>? &nbsp; [2]',
    markScheme:'(i) Chocolates circle: 20−x only; Biscuits circle: 18−x only; intersection: x; outside: 6. [B3]\n(ii) (20−x) + x + (18−x) + 6 = 36 → 44−x = 36 → x = 8 [M1, A1]\n(iii) Chocolates only = 20−8 = 12 [M1, A1]' }
);
