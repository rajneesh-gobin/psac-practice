'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  NCE 2022 Grade 9 Mathematics (N510) — past paper question bank
//  Source: Mauritius Examinations Syndicate, NCE 2021-2022 Mathematics paper
//  (31 questions, 100 marks).
// ─────────────────────────────────────────────────────────────────────────────

// ── Section A: Very Short Answer (Q1–Q10, 1 mark each) ──────────────────────

STATIC_QUESTIONS.push(
  makeNum({ id:'g9m-pp22-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out:<br><br><span style="font-family:monospace;font-size:1.2em">  2 3 5<br>+ 4 5 1<br>──────</span>',
    answer:'686',
    hint:'Add the digits column by column.',
    explanation:'235 + 451 = 686. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; <sup>6</sup>&frasl;<sub>7</sub> &minus; <sup>2</sup>&frasl;<sub>7</sub>',
    answer:'4/7',
    hint:'Subtract numerators; keep the denominator.',
    explanation:'<sup>6</sup>&frasl;<sub>7</sub> &minus; <sup>2</sup>&frasl;<sub>7</sub> = <sup>4</sup>&frasl;<sub>7</sub>. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-003', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:1,
    question:'Convert: &nbsp; 3 km 250 m = _________ m',
    answer:'3250',
    hint:'1 km = 1000 m, so 3 km = 3000 m.',
    explanation:'3 km = 3000 m. 3000 + 250 = 3250 m. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-004', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Find &nbsp; &radic;36',
    answer:'6',
    hint:'Which number multiplied by itself gives 36?',
    explanation:'6 &times; 6 = 36, so &radic;36 = 6. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-005', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; &minus;5 &minus; 7',
    answer:'-12',
    hint:'Adding two negative numbers gives a larger negative.',
    explanation:'&minus;5 &minus; 7 = &minus;12. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-006', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Express 0.25 as a <b>percentage</b>.',
    answer:'25',
    hint:'Multiply by 100.',
    explanation:'0.25 &times; 100 = 25%. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-007', chapterId:'g9m-indices', subsection:'laws',
    difficulty:1,
    question:'Simplify: &nbsp; x&sup6; &divide; x&sup4;',
    answer:'x^2',
    hint:'Use the division law: subtract the indices.',
    explanation:'x&sup6; &divide; x&sup4; = x<sup>6&minus;4</sup> = x&sup2;. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-008', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Simplify: &nbsp; 5ab &minus; 4ab',
    answer:'ab',
    hint:'Subtract the coefficients of the like terms.',
    explanation:'5ab &minus; 4ab = 1ab = ab. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-009', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Find the <b>Highest Common Factor (HCF)</b> of 2y&sup2; and y.',
    answer:'y',
    hint:'Look at the common factor in both terms.',
    explanation:'2y&sup2; = 2 &times; y &times; y and y = y. The HCF is y. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-010', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1, needsArtwork:true,
    question:'A number line shows: &minus;4, &minus;3, ___, &minus;1, ___, 1, 2, 3.<br>Write down the two missing values (write as: a,b).',
    answer:'-2,0',
    hint:'The values increase by 1 each step.',
    explanation:'&minus;3 then &minus;2 then &minus;1; and &minus;1 then 0 then 1. Missing values are &minus;2 and 0. 📄 NCE 2022 Maths exam.' }),

  // ── Q12 series (short answer) ──────────────────────────────────────────────
  makeNum({ id:'g9m-pp22-011', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'What is the <b>coefficient</b> of x in the expression 8x&sup2; + 3x &minus; 5?',
    answer:'3',
    hint:'The coefficient of x is the number multiplying x (not x²).',
    explanation:'In 8x&sup2; + 3x &minus; 5, the coefficient of x is 3. 📄 NCE 2022 Maths exam.' }),

  makeNum({ id:'g9m-pp22-012', chapterId:'g9m-indices', subsection:'laws',
    difficulty:2,
    question:'Solve: &nbsp; 2<sup>x</sup> = 16',
    answer:'4',
    hint:'Express 16 as a power of 2.',
    explanation:'2&sup4; = 16, so x = 4. 📄 NCE 2022 Maths exam.' })
);

// ── Structured Questions (Q12(b) onwards) ─────────────────────────────────────

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(

  { id:'g9m-pp22-pdf-001', chapterId:'g9m-expressions', marks:1, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Factorise: &nbsp; x&sup2; &minus; 9',
    markScheme:'(x + 3)(x − 3) [B1] (difference of two squares)' },

  { id:'g9m-pp22-pdf-002', chapterId:'g9m-number-revision', marks:2, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Evaluate: &nbsp; 10 &minus; 5 + <sup>3</sup>&frasl;<sub>6</sub><br><br>Give your answer as a <b>decimal</b>.',
    markScheme:'= 10 − 5 + 0.5 [M1] = 5.5 [A1]' },

  { id:'g9m-pp22-pdf-003', chapterId:'g9m-geometry-revision', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Universal set &xi; = {1, 2, 3, 4, 5, 6, 7, 8}. Set A = {1, 2, 3, 4, 6} and B = {2, 6, 8}. Elements 5 and 7 are outside both sets.<br><br>(a)(i) List all elements of A. &nbsp; [1]<br>(a)(ii) List the elements of A &cup; B. &nbsp; [1]<br>(b) Find n(A&prime; &cap; B). &nbsp; [1]',
    markScheme:'(a)(i) A = {1, 2, 3, 4, 6} [B1]\n(a)(ii) A∪B = {1, 2, 3, 4, 6, 8} [B1]\n(b) A′ = {5, 7, 8}. A′∩B = {8}. n(A′∩B) = 1 [B1]' },

  { id:'g9m-pp22-pdf-004', chapterId:'g9m-inequalities', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Solve the inequality: &nbsp; 2 &minus; 5x &lt; 12<br><br>Show your working.',
    markScheme:'−5x < 10 [M1]; dividing by −5 (reverse inequality): x > −2 [M1, A1]' },

  { id:'g9m-pp22-pdf-005', chapterId:'g9m-number-revision', marks:2, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'It is 03:30 in Chicago. Chicago is 6 hours <b>behind</b> GMT. Mauritius is 4 hours <b>ahead</b> of GMT.<br><br>What time is it in Mauritius?',
    markScheme:'GMT = 03:30 + 6:00 = 09:30 [M1]. Mauritius = 09:30 + 4:00 = 13:30 [A1]' },

  { id:'g9m-pp22-pdf-006', chapterId:'g9m-vectors', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Two vectors are equal: <b>a</b> = (5, m+n) and <b>b</b> = (m, 6).<br><br>(a) Find m. &nbsp; [1]<br>(b) Hence find n. &nbsp; [2]',
    markScheme:'(a) Equal vectors have equal components: m = 5 [B1]\n(b) m + n = 6 → 5 + n = 6 → n = 1 [M1, A1]' },

  { id:'g9m-pp22-pdf-007', chapterId:'g9m-geometry-revision', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Six square cards each have an area of 25 cm&sup2;. They are arranged in an L-shape.<br><br>Find the <b>perimeter</b> of the L-shape.',
    markScheme:'Each square has side √25 = 5 cm [B1]. Perimeter of L-shape made of 6 squares of side 5 = count outer edges. L-shape has 8 outer edges × 5 cm each in a typical arrangement. Perimeter = 40 cm [M1, A1] (accept answer from correct method with correct edge count)' },

  { id:'g9m-pp22-pdf-008', chapterId:'g9m-probability', marks:5, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) A bag contains 6 black and 4 white marbles. One marble is chosen at random.<br>Find the probability it is <b>not white</b>. &nbsp; [2]<br><br>(b) Two fair coins are tossed simultaneously.<br>(i) Complete the possibility space table (H = heads, T = tails). &nbsp; [1]<br>(ii) Find the probability of getting <b>one head and one tail</b>. &nbsp; [2]',
    markScheme:'(a) P(not white) = 6/10 = 3/5 [M1, A1]\n(b)(i) Outcomes: HH, HT, TH, TT [B1]\n(b)(ii) P(one H, one T) = 2/4 = 1/2 [M1, A1]' },

  { id:'g9m-pp22-pdf-009', chapterId:'g9m-geometry-revision', marks:4, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'Triangle ABC is equilateral. C lies on line BD. Angle ADC = 20&deg;.<br><br>(a) State one angle in an equilateral triangle. &nbsp; [1]<br>(b) Find angle CAD. &nbsp; [3]',
    markScheme:'(a) Each angle = 60° [B1]\n(b) Angle ACD = 180°−60° = 120° (angles on straight line). In triangle ACD: angle CAD + 20° + 120° = 180° → angle CAD = 40° [M2, A1]' },

  { id:'g9m-pp22-pdf-010', chapterId:'g9m-matrices', marks:5, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'S = [[4, &minus;2], [6, 0]] &nbsp; T = [[&minus;1, 5], [3, 2]]<br><br>(a) Find <sup>1</sup>&frasl;<sub>2</sub>S. &nbsp; [2]<br>(b) Find ST. &nbsp; [3]',
    markScheme:'(a) ½S = [[2, −1], [3, 0]] [M1, A1]\n(b) ST: top-left = 4×(−1)+(−2)×3 = −10; top-right = 4×5+(−2)×2 = 16; bottom-left = 6×(−1)+0×3 = −6; bottom-right = 6×5+0×2 = 30. ST = [[−10, 16], [−6, 30]] [M2, A1]' },

  { id:'g9m-pp22-pdf-011', chapterId:'g9m-trigonometry', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'In right triangle ABC, angle ABC = 90&deg;, angle BAC = 50&deg; and AC = 12 cm.<br>[sin 50&deg; = 0.77, cos 50&deg; = 0.64, tan 50&deg; = 1.19]<br><br>Find AB.',
    markScheme:'cos(BAC) = AB/AC → AB = AC × cos 50° = 12 × 0.64 = 7.68 ≈ 8 cm [M2, A1]' },

  { id:'g9m-pp22-pdf-012', chapterId:'g9m-patterns', marks:2, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'A Fibonacci-type sequence has T2 = 2&frac13; and T3 = 3.<br><br>(a) Find T1. &nbsp; [1]<br>(b) Find T4. &nbsp; [1]',
    markScheme:'(a) T1 = T3 − T2 = 3 − 2⅓ = 2/3 [B1]\n(b) T4 = T2 + T3 = 2⅓ + 3 = 5⅓ [B1]' },

  { id:'g9m-pp22-pdf-013', chapterId:'g9m-vectors', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Triangles P and Q are shown on a grid.<br><br>(a) Reflect triangle P in the x-axis. Label the image R. &nbsp; [2]<br>(b) Write down the translation vector that maps P onto Q. &nbsp; [1]',
    markScheme:'(a) Each vertex reflected correctly in x-axis [B2]\n(b) Read translation vector from grid [B1]' },

  { id:'g9m-pp22-pdf-014', chapterId:'g9m-statistics', marks:5, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'The scores of 4 students are: Léa = 8, Clara = 5, Dan = 10, Eric = 2.<br><br>(a) Who finished <b>first</b> in the bar chart (highest bar)? &nbsp; [1]<br>(b) Eight scores are: 10, 11, 11, 12, 13, 14, 15, 17. Find the <b>median</b>. &nbsp; [2]<br>(c) A frequency table shows the number of pets per family (pets 0–5, frequencies 4, 7, 4, 1, 3, 1). Find the <b>mean</b> number of pets. &nbsp; [2]',
    markScheme:'(a) Dan (score = 10) [B1]\n(b) Median = (12+13)/2 = 12.5 [M1, A1]\n(c) Total families = 4+7+4+1+3+1 = 20. Total pets = 0+7+8+3+12+5 = 35. Mean = 35/20 = 1.75 [M1, A1]' },

  { id:'g9m-pp22-pdf-015', chapterId:'g9m-number-revision', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'A laptop is on sale at Rs 40 000 after a <b>20% discount</b>.<br><br>Find the <b>original price</b> of the laptop.',
    markScheme:'Sale price = 80% of original. Original = 40000 / 0.8 = Rs 50 000 [M2, A1]' },

  { id:'g9m-pp22-pdf-016', chapterId:'g9m-coordinates', marks:6, year:2022, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'(a) Complete the table for y = 2x &minus; 1:<br><br>x = &minus;2: y = ___<br>x = 0: y = ___<br>x = 2: y = ___<br>&nbsp; [2]<br><br>(b) Draw the graph of y = 2x &minus; 1 on the axes provided. &nbsp; [2]<br><br>(c) Using your graph (or algebra), solve the simultaneous equations x + y = 2 and y = 2x &minus; 1. &nbsp; [2]',
    markScheme:'(a) x=−2: y=−5; x=0: y=−1; x=2: y=3 [B2]\n(b) Correct straight line drawn [B2]\n(c) x + (2x−1) = 2 → 3x = 3 → x = 1, y = 1 [M1, A1]' },

  { id:'g9m-pp22-pdf-017', chapterId:'g9m-coordinates', marks:5, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'A(2, 3) and B(4, &minus;1).<br><br>(a) Find the gradient of AB. &nbsp; [2]<br>(b) Find the equation of line AB. &nbsp; [3]',
    markScheme:'(a) m = (−1−3)/(4−2) = −4/2 = −2 [M1, A1]\n(b) Using A(2,3): 3 = −2(2)+c → c = 7. Equation: y = −2x + 7 [M2, A1]' },

  { id:'g9m-pp22-pdf-018', chapterId:'g9m-number-revision', marks:3, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'A car travels 180 km at an average speed of 72 km/h.<br><br>Find the time taken. Give your answer in <b>hours and minutes</b>.',
    markScheme:'Time = 180/72 = 2.5 hours [M1, A1] = 2 hours 30 minutes [A1]' },

  { id:'g9m-pp22-pdf-019', chapterId:'g9m-quadratics', marks:5, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Expand: &nbsp; x(x + 1). &nbsp; [1]<br><br>(b) The expression x(x + 1) represents consecutive integers. Given that x(x + 1) &minus; 18 = 2, find the <b>positive value of x</b>. &nbsp; [4]',
    markScheme:'(a) x² + x [B1]\n(b) x²+x−18 = 2 → x²+x−20 = 0 → (x+5)(x−4) = 0 → x = 4 (positive value) [M3, A1]' },

  { id:'g9m-pp22-pdf-020', chapterId:'g9m-volume', marks:9, year:2022, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) A cylinder has volume 735&pi; cm&sup3; and height 15 cm. Find its <b>radius</b>. &nbsp; [3]<br><br>(b) A right prism has a right-triangular cross-section with sides 3, 4 and x cm, and length 12 cm.<br>(i) Find x. &nbsp; [2]<br>(ii) Find the <b>surface area</b> of the prism. &nbsp; [4]<br>(iii) Find the <b>volume</b> of the prism. &nbsp; [2]',
    markScheme:'(a) πr²×15 = 735π → r² = 49 → r = 7 cm [M2, A1]\n(b)(i) x = √(3²+4²) = 5 cm (Pythagoras) [M1, A1]\n(b)(ii) SA = 2×(½×3×4) + 12×3 + 12×4 + 12×5 = 12+36+48+60 = 156 cm² [M3, A1]\n(b)(iii) V = ½×3×4×12 = 72 cm³ [M1, A1]' }
);
