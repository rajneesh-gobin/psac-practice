'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  NCE 2021 Grade 9 Mathematics (N510) — past paper question bank
//  Source: Mauritius Examinations Syndicate, NCE 2020-2021 Mathematics paper.
//  Note: 2021 was a COVID de-loaded paper — Translation, frequency tables and
//  possibility diagrams were NOT assessed that year.
//  Q11 MCQ block: answer keys confirmed via Examiners' Report; question text not
//  available for MCQ items — those are omitted pending a manual transcription.
// ─────────────────────────────────────────────────────────────────────────────

// ── Section A: Very Short Answer (Q1–Q10, 1 mark each) ──────────────────────

STATIC_QUESTIONS.push(
  makeNum({ id:'g9m-pp21-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out:<br><br><span style="font-family:monospace;font-size:1.2em">  4 5 7<br>+ 2 6 1<br>──────</span>',
    answer:'718',
    hint:'Add the units, then tens, then hundreds.',
    explanation:'457 + 261 = 718. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; <sup>7</sup>&frasl;<sub>9</sub> &minus; <sup>5</sup>&frasl;<sub>9</sub>',
    answer:'2/9',
    hint:'Subtract the numerators; the denominator stays the same.',
    explanation:'<sup>7</sup>&frasl;<sub>9</sub> &minus; <sup>5</sup>&frasl;<sub>9</sub> = <sup>2</sup>&frasl;<sub>9</sub>. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-003', chapterId:'g9m-indices', subsection:'laws',
    difficulty:1,
    question:'Simplify &nbsp; (x&sup3;)&sup4;',
    answer:'x^12',
    hint:'Use the power law: (x<sup>m</sup>)<sup>n</sup> = x<sup>mn</sup>.',
    explanation:'(x&sup3;)&sup4; = x<sup>3&times;4</sup> = x<sup>12</sup>. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-004', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Calculate &nbsp; 1.04 &times; 2',
    answer:'2.08',
    hint:'Multiply as whole numbers then adjust the decimal place.',
    explanation:'1.04 &times; 2 = 2.08. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-005', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Express &nbsp; <sup>23</sup>&frasl;<sub>100</sub> &nbsp; as a <b>decimal</b>.',
    answer:'0.23',
    hint:'Divide 23 by 100.',
    explanation:'<sup>23</sup>&frasl;<sub>100</sub> = 0.23. 📄 NCE 2021 Maths exam.' }),

  makeMCQ({ id:'g9m-pp21-006', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:2,
    question:'Which one of the following is an <b>irrational</b> number?',
    options:['&radic;5', '5.08', '7&frac25;', '&radic;36'],
    answer:'&radic;5',
    hint:'An irrational number cannot be expressed as a fraction of two integers.',
    explanation:'&radic;5 is irrational. 5.08 and 7&frac25; are rational fractions; &radic;36 = 6, a whole number. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-007', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Simplify &nbsp; 5x&sup2; + 2x&sup2;',
    answer:'7x^2',
    hint:'Add the coefficients of the like terms.',
    explanation:'5x&sup2; + 2x&sup2; = 7x&sup2;. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-008', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate &nbsp; 2 + 3 &times; 5',
    answer:'17',
    hint:'Use BODMAS: multiplication before addition.',
    explanation:'3 &times; 5 = 15 first, then 2 + 15 = 17. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-009', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1, needsArtwork:true,
    question:'A number line runs from 0 to 2 and is divided into 8 equal parts. Point X is at the 7th division from 0.<br>Write down the value of X.',
    answer:'1.75',
    hint:'Each division = 2 &divide; 8 = 0.25. Count 7 divisions from 0.',
    explanation:'Each interval = 0.25. 7th division = 7 &times; 0.25 = 1.75. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-010', chapterId:'g9m-indices', subsection:'laws',
    difficulty:2,
    question:'Evaluate &nbsp; 27<sup><sup>1</sup>&frasl;<sub>3</sub></sup>',
    answer:'3',
    hint:'27<sup>1/3</sup> means the cube root of 27.',
    explanation:'&sup3;&radic;27 = 3, since 3&sup3; = 27. 📄 NCE 2021 Maths exam.' }),

  makeNum({ id:'g9m-pp21-011', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:2,
    question:'Find the <b>Lowest Common Multiple (LCM)</b> of 4, 6 and 9.',
    answer:'36',
    hint:'List multiples of the largest number until you find one divisible by all three.',
    explanation:'Multiples of 9: 9, 18, 27, 36. 36 &div; 4 = 9 ✓, 36 &div; 6 = 6 ✓. LCM = 36. 📄 NCE 2021 Maths exam.' })
);

// ── Section C / Structured Questions ─────────────────────────────────────────

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(

  { id:'g9m-pp21-pdf-001', chapterId:'g9m-patterns', marks:2, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) The sequence below has a common difference. Write down the <b>next</b> term.<br><br>&minus;1, &nbsp;2, &nbsp;5, &nbsp;8, &nbsp;___<br><br>(b) A pattern of squares is built from matches. Diagram 1 uses 4 matches, Diagram 2 uses 7. Which diagram uses exactly <b>3</b> sticks on each side? Tick the correct diagram number: &nbsp; 1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 3 &nbsp;&nbsp; 4',
    markScheme:'(a) Next term = 11. [B1] Common difference = 3, so 8 + 3 = 11.\n(b) Diagram 3. [B1] The 3rd diagram in a growing square pattern first shows a full 3-stick side.' },

  { id:'g9m-pp21-pdf-002', chapterId:'g9m-number-revision', marks:2, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'Given that &radic;2 = 1.414 and &radic;20 = 4.472, find &radic;2000.<br><br>Show your working.',
    markScheme:'&radic;2000 = &radic;(100 &times; 20) = 10 &times; &radic;20 [M1]\n= 10 &times; 4.472 = 44.72 [A1]' },

  { id:'g9m-pp21-pdf-003', chapterId:'g9m-inequalities', marks:3, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Solve the inequality &nbsp; 5x + 3 &gt; 28. &nbsp; [2]<br><br>(b) Write down the <b>smallest integer</b> that satisfies the inequality in (a). &nbsp; [1]',
    markScheme:'(a) 5x > 25 [M1]; x > 5 [A1]\n(b) Smallest integer = 6 [B1]' },

  { id:'g9m-pp21-pdf-004', chapterId:'g9m-geometry-revision', marks:5, year:2021, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Triangle PQR is isosceles with PQ = PR. Lines are parallel and angle at P = 40&deg;.<br><br>(a) Find x. &nbsp;[1]<br>(b) Find y. &nbsp;[2]<br>(c) Find z. &nbsp;[2]',
    markScheme:'(a) x = 40° (base angles of isosceles triangle, or alternate angles) [B1]\n(b) Base angles: (180-40)/2 = 70°. y = 70° [M1, A1]\n(c) Co-interior angles on parallel lines sum to 180°, or use exterior angle theorem. z = 110° [M1, A1]' },

  { id:'g9m-pp21-pdf-005', chapterId:'g9m-expressions', marks:4, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Evaluate &nbsp; 22&sup2; &minus; 18&sup2; &nbsp; using the difference of two squares. &nbsp; [2]<br><br>(b) Given that a&sup2; + b&sup2; = 79 and ab = 24, find the value of (a &minus; b)&sup2;. &nbsp; [2]',
    markScheme:'(a) 22²−18² = (22+18)(22−18) = 40 × 4 = 160 [M1, A1]\n(b) (a−b)² = a²−2ab+b² = 79−2(24) = 79−48 = 31 [M1, A1]' },

  { id:'g9m-pp21-pdf-006', chapterId:'g9m-matrices', marks:5, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'Given P = <span style="font-family:monospace">[[1,4],[0,−2]]</span> and Q = <span style="font-family:monospace">[[6,3],[−1,7]]</span>, find:<br><br>(a) 3P + Q &nbsp; [2]<br>(b) PQ &nbsp; [3]',
    markScheme:'(a) 3P = [[3,12],[0,−6]]; 3P+Q = [[9,15],[−1,−13]] [M1, A1]\n(b) PQ: top-left = 1×6+4×(−1) = 2; top-right = 1×3+4×7 = 31; bottom-left = 0×6+(−2)(−1) = 2; bottom-right = 0×3+(−2)×7 = −14. PQ = [[2,31],[2,−14]] [M2, A1]' },

  { id:'g9m-pp21-pdf-007', chapterId:'g9m-trigonometry', marks:6, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'In isosceles triangle, AB = BC = 17 cm and angle BAC = 28.1&deg;. BM is perpendicular to AC.<br>[sin 28.1&deg; = 0.47, cos 28.1&deg; = 0.88]<br><br>(a) Show that BM = 8 cm. &nbsp; [3]<br>(b) Find AC. &nbsp; [3]',
    markScheme:'(a) sin(BAC) = BM/AB → BM = 17 × sin 28.1° = 17 × 0.47 ≈ 8 cm [M2, A1]\n(b) Using Pythagoras: AM² = AB²−BM² = 289−64 = 225, AM = 15 cm [M1, A1]. By symmetry AC = 2×AM = 30 cm [A1]' },

  { id:'g9m-pp21-pdf-008', chapterId:'g9m-quadratics', marks:10, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'A rectangle has length (x + 3) cm and width (x + 1) cm. Its area is 24 cm&sup2;.<br><br>(a) Show that x&sup2; + 4x &minus; 21 = 0. &nbsp; [3]<br>(b) Solve the equation x&sup2; + 4x &minus; 21 = 0. &nbsp; [3]<br>(c) Find the perimeter of the rectangle. &nbsp; [4]',
    markScheme:'(a) (x+3)(x+1) = 24 → x²+4x+3 = 24 → x²+4x−21 = 0 [M2, A1]\n(b) (x+7)(x−3) = 0 → x = 3 or x = −7. Since length must be positive, x = 3. [M2, A1]\n(c) Length = 3+3 = 6 cm, width = 3+1 = 4 cm. Perimeter = 2(6+4) = 20 cm [M2, A1, A1]' },

  { id:'g9m-pp21-pdf-009', chapterId:'g9m-vectors', marks:1, year:2021, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Triangle ABC is drawn on a grid. Reflect triangle ABC in line L.<br><br>Draw the image clearly on the grid. &nbsp; [3]',
    markScheme:'Each vertex reflected correctly in line L [B1 each vertex, max B3]' },

  { id:'g9m-pp21-pdf-010', chapterId:'g9m-probability', marks:2, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'A bag contains 3 red, 4 green and 2 white marbles. A marble is chosen at random.<br><br>(a) Find the probability that the marble is <b>green</b>. &nbsp; [1]<br>(b) Find the probability that the marble is <b>not white</b>. &nbsp; [1]',
    markScheme:'(a) P(green) = 4/9 [B1]\n(b) P(not white) = 7/9 [B1]' },

  { id:'g9m-pp21-pdf-011', chapterId:'g9m-inequalities', marks:3, year:2021, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'The diagram shows two number lines for sets A and B.<br><br>(a) Write set A in set-builder notation. &nbsp; [2]<br>(b) Describe A &cap; B. &nbsp; [1]',
    markScheme:'(a) A = {x : a ≤ x ≤ b} with correct boundary values from the diagram [B2]\n(b) A∩B is the overlapping region; state the correct interval [B1]' },

  { id:'g9m-pp21-pdf-012', chapterId:'g9m-vectors', marks:3, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'Vector CD = <sup>(12)</sup>&frasl;<sub>(&minus;5)</sub> (column vector, top 12 bottom &minus;5).<br><br>(a) Write down the column vector DC. &nbsp; [1]<br>(b) Find |CD|. &nbsp; [2]',
    markScheme:'(a) DC = (−12, 5) [B1]\n(b) |CD| = √(12²+(−5)²) = √(144+25) = √169 = 13 [M1, A1]' },

  { id:'g9m-pp21-pdf-013', chapterId:'g9m-statistics', marks:5, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'The number of marbles owned by 6 children is: 4, 4, 7, 6, 4, 5.<br><br>(a) Find the <b>mean</b> number of marbles. &nbsp; [2]<br>(b) A 7th child, Alan, joins the group. The new mean is 6. Find the number of marbles Alan has. &nbsp; [3]',
    markScheme:'(a) Mean = (4+4+7+6+4+5)/6 = 30/6 = 5 [M1, A1]\n(b) New total = 6×7 = 42. Alan has 42−30 = 12 marbles [M2, A1]' },

  { id:'g9m-pp21-pdf-014', chapterId:'g9m-simultaneous', marks:4, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'Solve the simultaneous equations:<br><br>2x + y = 5<br>3x + 2y = 7',
    markScheme:'From equation 1: y = 5−2x [M1]. Substituting: 3x+2(5−2x)=7 → 3x+10−4x=7 → −x=−3 → x=3 [M1, A1]. y = 5−2(3) = −1 [A1]' },

  { id:'g9m-pp21-pdf-015', chapterId:'g9m-coordinates', marks:5, year:2021, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'(a) Find the equation of a line through (0, 4) that is parallel to 2y = &minus;6x. &nbsp; [2]<br><br>(b) From the graph, identify the equations of lines L1, L2 and L3. &nbsp; [3]',
    markScheme:'(a) 2y=−6x → y=−3x. Parallel means same gradient m=−3, through (0,4): y=−3x+4 [M1, A1]\n(b) Read from graph; one mark per correct equation [B1×3]' },

  { id:'g9m-pp21-pdf-016', chapterId:'g9m-finance', marks:5, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'A television set costs Rs 18 000. It can be bought on hire purchase by paying a deposit of Rs 18 000 at 15% simple interest per annum for 3 years.<br><br>(a) Calculate the simple interest paid. &nbsp; [2]<br>(b) Calculate the monthly instalment. &nbsp; [3]',
    markScheme:'(a) SI = 18000×15/100×3 = Rs 8100 [M1, A1]\n(b) Total = 18000+8100 = Rs 26100. Monthly = 26100/36 = Rs 725 [M1, M1, A1]' },

  { id:'g9m-pp21-pdf-017', chapterId:'g9m-volume', marks:9, year:2021, grade:9,
    subject:'Mathematics', type:'written',
    question:'An open rectangular water tank has length 20 cm, width 15 cm and height 18 cm. Water is filled to a depth of 14 cm. A solid cylinder of diameter 10 cm and height 7 cm is placed in the tank.<br><br>(a)(i) Find the volume of water before the cylinder is placed in. &nbsp; [2]<br>(a)(ii) Find the surface area of the tank in contact with water. &nbsp; [4]<br>(b)(i) Find the volume of the cylinder. &nbsp; [2]<br>(b)(ii) Find the new water level after the cylinder is placed in. &nbsp; [3]',
    markScheme:'(a)(i) V = 20×15×14 = 4200 cm³ [M1, A1]\n(a)(ii) Base = 20×15 = 300; 2 long sides up to 14 cm = 2×20×14 = 560; 2 short sides = 2×15×14 = 420. Total = 1280 cm² [M3, A1]\n(b)(i) V = π×5²×7 = 175π ≈ 550 cm³ [M1, A1]\n(b)(ii) New water volume = 4200+550 = 4750 cm³. New depth = 4750/(20×15) ≈ 15.8 cm [M2, A1]' }
);
