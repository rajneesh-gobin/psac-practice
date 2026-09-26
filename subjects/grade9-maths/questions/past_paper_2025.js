'use strict';
// ─────────────────────────────────────────────────────────────────────────────
//  NCE 2025 Grade 9 Mathematics (N510) — past paper question bank
//  Source: Mauritius Examinations Syndicate, NCE 2025 Mathematics paper
//  (31 questions, 100 marks, 23 pages).
// ─────────────────────────────────────────────────────────────────────────────

// ── Section A: Very Short Answer (Q1–Q10, 1 mark each) ──────────────────────

STATIC_QUESTIONS.push(
  makeNum({ id:'g9m-pp25-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out:<br><br><span style="font-family:monospace;font-size:1.2em">  8 4 9<br>&minus; 5 2 3<br>──────</span>',
    answer:'326',
    hint:'Subtract column by column.',
    explanation:'849 &minus; 523 = 326. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out: &nbsp; 2.1 + 0.5',
    answer:'2.6',
    hint:'Align the decimal points and add.',
    explanation:'2.1 + 0.5 = 2.6. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-003', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Work out: &nbsp; <sup>9</sup>&frasl;<sub>17</sub> &minus; <sup>3</sup>&frasl;<sub>17</sub>',
    answer:'6/17',
    hint:'Subtract the numerators; the denominator stays the same.',
    explanation:'<sup>9</sup>&frasl;<sub>17</sub> &minus; <sup>3</sup>&frasl;<sub>17</sub> = <sup>6</sup>&frasl;<sub>17</sub>. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-004', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Find &nbsp; &sup3;&radic;8',
    answer:'2',
    hint:'Which number cubed equals 8?',
    explanation:'2 &times; 2 &times; 2 = 8, so &sup3;&radic;8 = 2. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-005', chapterId:'g9m-matrices', subsection:'order_types_operations',
    difficulty:1,
    question:'State the <b>order</b> of the matrix &nbsp; <span style="font-family:monospace">(3, 1)</span> &nbsp; (a column vector with top entry 3 and bottom entry 1).',
    answer:'2 by 1',
    hint:'Count rows &times; columns.',
    explanation:'The matrix has 2 rows and 1 column, so its order is 2 &times; 1. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-006', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Express 13% as a <b>fraction</b>.',
    answer:'13/100',
    hint:'Percent means per hundred.',
    explanation:'13% = <sup>13</sup>&frasl;<sub>100</sub>. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-007', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:1,
    question:'Circle the <b>composite</b> number in the list below.<br><br>2 &nbsp;&nbsp; 13 &nbsp;&nbsp; 27 &nbsp;&nbsp; 41',
    options:['27', '2', '13', '41'],
    answer:'27',
    hint:'A composite number has more than two factors.',
    explanation:'27 = 3 &times; 9 = 3 &times; 3 &times; 3, so it has more than two factors and is composite. 2, 13 and 41 are prime. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-008', chapterId:'g9m-capacity', subsection:'units_and_problems',
    difficulty:1,
    question:'Convert 5 L into mL.',
    answer:'5000',
    hint:'1 L = 1000 mL.',
    explanation:'5 &times; 1000 = 5000 mL. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-009', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Evaluate: &nbsp; 3 &times; (4 &minus; 2) + 5',
    answer:'11',
    hint:'Brackets first, then multiplication, then addition.',
    explanation:'3 &times; (4&minus;2) + 5 = 3 &times; 2 + 5 = 6 + 5 = 11. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-010', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Expand: &nbsp; 4(x + 2)',
    answer:'4x+8',
    hint:'Multiply 4 by each term inside the brackets.',
    explanation:'4(x + 2) = 4x + 8. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-011', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:1,
    question:'Factorise: &nbsp; 6x &minus; 15',
    answer:'3(2x-5)',
    hint:'Find the HCF of 6x and 15.',
    explanation:'HCF = 3. &nbsp; 6x &minus; 15 = 3(2x &minus; 5). 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-012', chapterId:'g9m-indices', subsection:'laws',
    difficulty:1,
    question:'Simplify: &nbsp; (a&sup5;)&sup4;',
    answer:'a^20',
    hint:'Use the power law: multiply the indices.',
    explanation:'(a&sup5;)&sup4; = a<sup>5&times;4</sup> = a<sup>20</sup>. 📄 NCE 2025 Maths exam.' }),

  // ── Q11 MCQ block (a)–(g), 1 mark each ─────────────────────────────────────
  makeMCQ({ id:'g9m-pp25-013', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'What is the <b>value</b> of 3 in 21.03?',
    options:['3 hundredths', '3 tens', '3 tenths', '3 hundreds'],
    answer:'3 hundredths',
    hint:'The decimal places after the point are: tenths, hundredths, thousandths.',
    explanation:'In 21.03 the digit 3 is in the hundredths place. Value = 0.03 = 3 hundredths. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-014', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:2,
    question:'Which of the following is an <b>irrational</b> number?',
    options:['&radic;5', '&radic;25', '<sup>22</sup>&frasl;<sub>7</sub>', '0.25'],
    answer:'&radic;5',
    hint:'An irrational number cannot be written as a fraction of two integers.',
    explanation:'&radic;5 &approx; 2.2360... is non-terminating and non-repeating, so irrational. &radic;25 = 5, <sup>22</sup>&frasl;<sub>7</sub> and 0.25 are all rational. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-015', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry',
    difficulty:1, needsArtwork:true,
    question:'A vertical line meets a horizontal base. Angle x is between the vertical and a second line. The angle between that second line and the horizontal is 55&deg;. What is the <b>value</b> of angle x?',
    options:['35°', '45°', '125°', '135°'],
    answer:'35°',
    hint:'The angles in a right angle must add to 90°.',
    explanation:'x + 55° = 90° (right angle). x = 35°. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-016', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:1,
    question:'Convert 2 kg 350 g into <b>grams</b>.',
    options:['2350 g', '235 g', '23.50 g', '2.350 g'],
    answer:'2350 g',
    hint:'1 kg = 1000 g.',
    explanation:'2 kg = 2000 g. 2000 + 350 = 2350 g. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-017', chapterId:'g9m-coordinates', subsection:'gradient',
    difficulty:2, needsArtwork:true,
    question:'Which one of the following lines has a <b>gradient of zero</b>?',
    options:['A horizontal line (y = constant)', 'A vertical line (x = constant)', 'A line going up to the right', 'A line going down to the right'],
    answer:'A horizontal line (y = constant)',
    hint:'Gradient = rise &divide; run. A flat line has no rise.',
    explanation:'A horizontal line has zero rise for any run, so its gradient = 0/run = 0. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-018', chapterId:'g9m-number-revision', subsection:'ratio_and_measures',
    difficulty:1,
    question:'A bag of flour weighs 15 kg. What is the mass of <b>4</b> such bags?',
    options:['60 kg', '11 kg', '19 kg', '30 kg'],
    answer:'60 kg',
    hint:'Multiply 15 by 4.',
    explanation:'15 &times; 4 = 60 kg. 📄 NCE 2025 Maths exam.' }),

  makeMCQ({ id:'g9m-pp25-019', chapterId:'g9m-expressions', subsection:'binomials_and_factorising',
    difficulty:2,
    question:'What is the <b>LCM</b> of 4x and 12y?',
    options:['12xy', '4x', '12y', '24xy'],
    answer:'12xy',
    hint:'Find the smallest expression divisible by both 4x and 12y.',
    explanation:'12xy &divide; 4x = 3y ✓ and 12xy &divide; 12y = x ✓. LCM = 12xy. 📄 NCE 2025 Maths exam.' }),

  // ── Q12 onwards ─────────────────────────────────────────────────────────────
  makeMCQ({ id:'g9m-pp25-020', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages',
    difficulty:1,
    question:'Circle the <b>smallest</b> number from the list: &nbsp; 2.05 &nbsp;&nbsp; 2.5 &nbsp;&nbsp; 2.55 &nbsp;&nbsp; 2.005',
    options:['2.005', '2.05', '2.5', '2.55'],
    answer:'2.005',
    hint:'Compare the decimal digits place by place.',
    explanation:'2.005 &lt; 2.05 &lt; 2.5 &lt; 2.55. The smallest is 2.005. 📄 NCE 2025 Maths exam.' }),

  makeNum({ id:'g9m-pp25-021', chapterId:'g9m-indices', subsection:'laws',
    difficulty:2,
    question:'Find the value of m, if &nbsp; 27 = 3<sup>m</sup>.',
    answer:'3',
    hint:'Express 27 as a power of 3.',
    explanation:'3&sup3; = 27, so m = 3. 📄 NCE 2025 Maths exam.' })
);

// ── Structured Questions ─────────────────────────────────────────────────────

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(

  { id:'g9m-pp25-pdf-001', chapterId:'g9m-number-revision', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Evaluate &nbsp; <sup>1</sup>&frasl;<sub>2</sub> + <sup>1</sup>&frasl;<sub>3</sub>. &nbsp; [2]<br><br>(b) Mira has Rs 360. She gives <sup>2</sup>&frasl;<sub>5</sub> of her money to Tim. How much money does Tim receive? &nbsp; [2]',
    markScheme:'(a) 1/2 + 1/3 = 3/6 + 2/6 = 5/6 [M1, A1]\n(b) 2/5 × 360 = Rs 144 [M1, A1]' },

  { id:'g9m-pp25-pdf-002', chapterId:'g9m-inequalities', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) A number line has a solid dot at &minus;1 and an open circle at 3, with the region between shaded. Tick the inequality that correctly describes the set: &nbsp; &minus;1 &le; x &le; 3 &nbsp; | &nbsp; &minus;1 &lt; x &le; 3 &nbsp; | &nbsp; &minus;1 &le; x &lt; 3 &nbsp; | &nbsp; &minus;1 &lt; x &lt; 3 &nbsp; [1]<br><br>(b) Solve the inequality: &nbsp; &minus;5x &gt; 20. &nbsp; [2]',
    markScheme:'(a) −1 ≤ x < 3 (solid dot means ≤, open circle means <) [B1]\n(b) Divide by −5 (reverse the inequality): x < −4 [M1, A1]' },

  { id:'g9m-pp25-pdf-003', chapterId:'g9m-patterns', marks:2, year:2025, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'(a) Write down the missing term in the sequence:<br>(2, 3), (3, 5), (4, 7), (___, ___). &nbsp; [1]<br><br>(b) In the Venn diagram, shade the region representing A &cup; B. &nbsp; [1]',
    markScheme:'(a) (5, 9) — both components increase by 1 and 2 respectively [B1]\n(b) Both circles and their intersection shaded [B1]' },

  { id:'g9m-pp25-pdf-004', chapterId:'g9m-matrices', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'P = (8, &minus;5) and Q = (3, 2) are column vectors. Find:<br><br>(a) P &minus; Q &nbsp; [2]<br>(b) 2Q &nbsp; [2]',
    markScheme:'(a) P−Q = (8−3, −5−2) = (5, −7) [M1, A1]\n(b) 2Q = (6, 4) [M1, A1]' },

  { id:'g9m-pp25-pdf-005', chapterId:'g9m-indices', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) Find the value of m, if 27 = 3<sup>m</sup>. &nbsp; [1]<br><br>(b) Hence, solve: &nbsp; 3<sup>6x</sup> &divide; 3<sup>4x</sup> = 27. &nbsp; [2]',
    markScheme:'(a) m = 3 [B1]\n(b) 3^(6x−4x) = 3^(2x) = 27 = 3³ → 2x = 3 → x = 3/2 [M1, A1]' },

  { id:'g9m-pp25-pdf-006', chapterId:'g9m-coordinates', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'A line passes through the points A(0, 1) and B(3, 7).<br><br>(a) Find the <b>gradient</b> of line AB. &nbsp; [2]<br>(b) State the <b>equation</b> of line AB. &nbsp; [1]',
    markScheme:'(a) m = (7−1)/(3−0) = 6/3 = 2 [M1, A1]\n(b) Using A(0,1): y = 2x + 1 [B1]' },

  { id:'g9m-pp25-pdf-007', chapterId:'g9m-number-revision', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'12 men take 20 days to build a house. How many days would it take for 10 men to build a similar house? [Assume they work at the same rate.]',
    markScheme:'Total work = 12 × 20 = 240 man-days [M1]. 10 men: 240 ÷ 10 = 24 days [M1, A1]' },

  { id:'g9m-pp25-pdf-008', chapterId:'g9m-vectors', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Point A is mapped onto point B under translation T.<br><br>(a) Tick the column vector that correctly shows T. Options: (&minus;3, &minus;4) or (3, 4) or (3, &minus;4). &nbsp; [1]<br><br>(b) Find the <b>magnitude</b> of column vector T. &nbsp; [2]',
    markScheme:'(a) T = (3, 4) — B is 3 right and 4 up from A [B1]\n(b) |T| = √(3²+4²) = √25 = 5 [M1, A1]' },

  { id:'g9m-pp25-pdf-009', chapterId:'g9m-statistics', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'A bar chart shows goals scored in 12 football matches: 0 goals in 2 matches, 1 goal in 4 matches, 2 goals in 2 matches, 3 goals in 3 matches, 4 goals in 1 match.<br><br>(a) Using the bar chart, complete the frequency table for the missing values (0 goals and 2 goals). &nbsp; [2]<br>(b) Find the <b>mean</b> number of goals scored per match. &nbsp; [2]',
    markScheme:'(a) 0 goals → 2 matches; 2 goals → 2 matches [B2]\n(b) Mean = (0×2+1×4+2×2+3×3+4×1)/12 = (0+4+4+9+4)/12 = 21/12 = 1.75 goals [M1, A1]' },

  { id:'g9m-pp25-pdf-010', chapterId:'g9m-number-revision', marks:5, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'(a) A plan is drawn to a scale of 1:400. A wall is represented by 7.5 cm on the plan. Find the actual length of the wall in <b>metres</b>. &nbsp; [2]<br><br>(b) Solve: &nbsp; p&sup2; &minus; 10p + 10 = &minus;14. &nbsp; [3]',
    markScheme:'(a) Actual = 7.5 × 400 = 3000 cm = 30 m [M1, A1]\n(b) p²−10p+24 = 0 [M1]. (p−4)(p−6) = 0 [M1]. p = 4 or p = 6 [A1]' },

  { id:'g9m-pp25-pdf-011', chapterId:'g9m-manipulation', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'A formula is given by A = &pi;r&sup2; + &pi;rl.<br><br>(a) Calculate the value of A when r = 7 cm and l = 4 cm. Leave your answer in terms of &pi;. &nbsp; [2]<br>(b) Make l the subject of the formula. &nbsp; [2]',
    markScheme:'(a) A = π(49) + π(7)(4) = 49π + 28π = 77π [M1, A1]\n(b) A − πr² = πrl → l = (A − πr²)/(πr) [M1, A1]' },

  { id:'g9m-pp25-pdf-012', chapterId:'g9m-expressions', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'ABCD is a rectangle. DC = (3x + 1) cm, BC = (x + 1) cm. P is a point on AB such that AP = (2 &minus; x) cm.<br><br>(a) Find an expression for PB in its simplest form. &nbsp; [2]<br>(b) Find an expression for the area of rectangle ABCD. &nbsp; [2]',
    markScheme:'(a) AB = DC = 3x+1. PB = AB − AP = (3x+1) − (2−x) = 4x − 1 [M1, A1]\n(b) Area = DC × BC = (3x+1)(x+1) = 3x²+4x+1 [M1, A1]' },

  { id:'g9m-pp25-pdf-013', chapterId:'g9m-simultaneous', marks:4, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'Solve the simultaneous equations:<br><br>3x &minus; y = 7<br>2x + 3y = 1',
    markScheme:'From eq1: y = 3x−7 [M1]. Sub into eq2: 2x+3(3x−7)=1 → 2x+9x−21=1 → 11x=22 → x=2 [M1, A1]. y=3(2)−7=−1 [A1]' },

  { id:'g9m-pp25-pdf-014', chapterId:'g9m-geometry-revision', marks:6, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'The exterior angles of a triangle are in the ratio 5 : 6 : 7.<br><br>(a) Calculate the <b>difference</b> between the greatest and smallest exterior angles. &nbsp; [4]<br>(b) Find the greatest <b>interior</b> angle of the triangle. &nbsp; [2]',
    markScheme:'(a) Sum of exterior angles = 360°. Total parts = 5+6+7=18. Each part = 360/18 = 20°. Smallest = 5×20 = 100°; greatest = 7×20 = 140°. Difference = 40° [M3, A1]\n(b) Greatest interior = 180°−100° = 80° (interior and exterior are supplementary; smallest exterior gives greatest interior) [M1, A1]' },

  { id:'g9m-pp25-pdf-015', chapterId:'g9m-finance', marks:3, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'John deposits Rs 200 000 in a bank for a period of 30 months at a simple interest rate of 3% per annum.<br><br>Find the <b>total</b> amount John will receive when he withdraws his money after 30 months.',
    markScheme:'Time = 30/12 = 2.5 years [B1]. SI = 200000×3×2.5/100 = Rs 15000 [M1]. Total = 200000+15000 = Rs 215000 [A1]' },

  { id:'g9m-pp25-pdf-016', chapterId:'g9m-volume', marks:7, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'Rectangular water tank A has dimensions 80 cm &times; 30 cm &times; 60 cm.<br><br>(a) Tank A is <sup>2</sup>&frasl;<sub>3</sub> full of water. Calculate the <b>volume of water</b> in Tank A. &nbsp; [3]<br><br>(b) The water from Tank A is poured into a cylindrical container B with radius 10 cm. During pouring, 6 L of water is lost. Find the <b>depth of water</b> h cm in container B. Give your answer in terms of &pi;. &nbsp; [4]',
    markScheme:'(a) V(tank) = 80×30×60 = 144000 cm³. V(water) = 2/3 × 144000 = 96000 cm³ [M2, A1]\n(b) 6 L = 6000 cm³ lost. Water in B = 96000−6000 = 90000 cm³. πr²h = 90000 → 100πh = 90000 → h = 900/π cm [M3, A1]' },

  { id:'g9m-pp25-pdf-017', chapterId:'g9m-coordinates', marks:5, year:2025, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'Three lines x = 1, x = 5 and y = 2 are shown on a graph.<br><br>(a) On the same Cartesian plane, draw the graph of y = x + 4. &nbsp; [2]<br>(b) What is the special name of the figure enclosed by the four straight lines? &nbsp; [1]<br>(c) Calculate the <b>area</b> of the figure formed. &nbsp; [2]',
    markScheme:'(a) Line y=x+4 through (0,4), (1,5) etc. drawn correctly [B2]\n(b) Trapezium [B1]\n(c) Vertices: (1,2),(5,2),(5,9),(1,5). Parallel sides: at x=1: height=5−2=3; at x=5: height=9−2=7. Area = ½(3+7)×4 = 20 sq units [M1, A1]' },

  { id:'g9m-pp25-pdf-018', chapterId:'g9m-trigonometry', marks:8, year:2025, grade:9,
    subject:'Mathematics', type:'written', needsArtwork:true,
    question:'OBC is a sector of a circle with centre O and radius OB = OC = 14 cm. AO = 7 cm. Angle BOA = 60&deg;.<br>[sin 60&deg; = 0.87, cos 60&deg; = 0.5, tan 60&deg; = 1.73]<br><br>(a) Find the length of AC. Give your answer to the nearest whole number. &nbsp; [3]<br>(b) Find the length of arc BC. (Use &pi; = <sup>22</sup>&frasl;<sub>7</sub>.) &nbsp; [2]<br>(c) Find the <b>perimeter</b> of the shaded region ABC. &nbsp; [3]',
    markScheme:'(a) In right triangle OAC: tan 60° = AC/OA → AC = 7 × 1.73 = 12.11 ≈ 12 cm [M2, A1]\n(b) Arc BC = (60/360)×2×22/7×14 = (1/6)×88 = 14⅔ cm [M1, A1]\n(c) AB = OB−OA = 14−7 = 7 cm. Perimeter = AB+AC+arc BC = 7+12+14⅔ = 33⅔ cm [M2, A1]' },

  { id:'g9m-pp25-pdf-019', chapterId:'g9m-probability', marks:5, year:2025, grade:9,
    subject:'Mathematics', type:'written',
    question:'A bag contains 12 red balls and x blue balls. A ball is chosen at random.<br><br>(a)(i) Write down, in terms of x, the <b>total number of balls</b>. &nbsp; [1]<br>(a)(ii) Find, in terms of x, the probability that a <b>red</b> ball is chosen. &nbsp; [1]<br>(b) Given that the probability of choosing a <b>blue</b> ball is <sup>3</sup>&frasl;<sub>5</sub>, find the value of x. &nbsp; [3]',
    markScheme:'(a)(i) Total = 12 + x [B1]\n(a)(ii) P(red) = 12/(12+x) [B1]\n(b) P(blue) = x/(12+x) = 3/5 → 5x = 3(12+x) → 5x = 36+3x → 2x = 36 → x = 18 [M2, A1]' }
);
