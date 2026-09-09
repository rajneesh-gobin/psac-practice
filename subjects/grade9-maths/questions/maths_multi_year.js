'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Number Revision — fractions, decimals, percentages ─────────────────────

  makeNum({ id:'g9m-my-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Evaluate: <b>8/11 − 5/11</b>',
    answer:3/11, unit:'', tolerance:0.001,
    hint:'Subtract the numerators; the denominator stays the same.',
    explanation:'8/11 − 5/11 = <b>3/11</b> ≈ 0.2727. Fractions with the same denominator are subtracted by subtracting their numerators.' }),

  makeMCQ({ id:'g9m-my-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Express 27/100 as a decimal.',
    options:['0.27','2.7','27','0.027'], answer:'0.27',
    hint:'Dividing by 100 moves the decimal point two places to the left.',
    explanation:'27 ÷ 100 = <b>0.27</b>. The digit 7 is in the hundredths place.' }),

  makeMCQ({ id:'g9m-my-003', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:2,
    question:'Reduce 24/30 to its lowest terms.',
    options:['4/5','8/10','12/15','2/3'], answer:'4/5',
    hint:'Find the HCF of 24 and 30, then divide both by it.',
    explanation:'HCF(24, 30) = 6. So 24/30 = (24÷6)/(30÷6) = <b>4/5</b>.' }),

  makeMCQ({ id:'g9m-my-004', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:2,
    question:'What is 35% of 200?',
    options:['70','35','65','100'], answer:'70',
    hint:'Multiply 200 by 35 and divide by 100.',
    explanation:'35% of 200 = (35 ÷ 100) × 200 = 0.35 × 200 = <b>70</b>.' }),

  // ── Number Revision — ratio, proportion, measures ─────────────────────────

  makeMCQ({ id:'g9m-my-005', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:1,
    question:'Convert 7 kg to grams.',
    options:['7000 g','700 g','70 g','0.7 g'], answer:'7000 g',
    hint:'1 kg = 1000 g.',
    explanation:'7 kg × 1000 = <b>7000 g</b>.' }),

  makeMCQ({ id:'g9m-my-006', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:1,
    question:'Convert 350 cm to metres.',
    options:['3.5 m','35 m','0.35 m','350 m'], answer:'3.5 m',
    hint:'Divide by 100 to convert cm to m.',
    explanation:'350 ÷ 100 = <b>3.5 m</b>.' }),

  makeMCQ({ id:'g9m-my-007', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:2,
    question:'China is 4 hours ahead of Mauritius. When it is 17:00 in Mauritius, what time is it in China?',
    options:['21:00','13:00','01:00','17:00'], answer:'21:00',
    hint:'Add 4 hours to the Mauritius time.',
    explanation:'17:00 + 4 hours = <b>21:00</b> in China.' }),

  makeNum({ id:'g9m-my-008', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:2,
    question:'A car travels at a constant speed of 80 km/h. How far does it travel in 2.5 hours? Give your answer in km.',
    answer:200, unit:'km', tolerance:0,
    hint:'Distance = speed × time.',
    explanation:'Distance = 80 × 2.5 = <b>200 km</b>.' }),

  // ── Indices ────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-009', chapterId:'g9m-indices', subsection:'laws', difficulty:1,
    question:'Simplify (a⁴)⁵.',
    options:['a²⁰','a⁹','a²⁵','a⁴⁵'], answer:'a²⁰',
    hint:'Use the power law: (aᵐ)ⁿ = aᵐⁿ.',
    explanation:'(a⁴)⁵ = a^(4×5) = <b>a²⁰</b>.' }),

  makeMCQ({ id:'g9m-my-010', chapterId:'g9m-indices', subsection:'laws', difficulty:1,
    question:'Write 2 × 2 × 2 in index form.',
    options:['2³','3²','6','2⁶'], answer:'2³',
    hint:'Count how many times 2 appears as a factor.',
    explanation:'2 appears as a factor 3 times, so 2 × 2 × 2 = <b>2³</b>.' }),

  makeMCQ({ id:'g9m-my-011', chapterId:'g9m-indices', subsection:'laws', difficulty:2,
    question:'Simplify a⁶ ÷ a².',
    options:['a⁴','a⁸','a³','a¹²'], answer:'a⁴',
    hint:'Division law: subtract the exponents.',
    explanation:'a⁶ ÷ a² = a^(6−2) = <b>a⁴</b>.' }),

  makeMCQ({ id:'g9m-my-012', chapterId:'g9m-indices', subsection:'negative_indices', difficulty:2,
    question:'Write 1/x³ using a negative index.',
    options:['x⁻³','x³','−x³','x^(1/3)'], answer:'x⁻³',
    hint:'1/xⁿ = x⁻ⁿ.',
    explanation:'By the negative index rule, 1/x³ = <b>x⁻³</b>.' }),

  // ── Patterns & Sequences ───────────────────────────────────────────────────

  makeNum({ id:'g9m-my-013', chapterId:'g9m-patterns', subsection:'sequences_and_figures', difficulty:1,
    question:'Complete the sequence: 3, 10, 17, 24, ___.',
    answer:31, unit:'', tolerance:0,
    hint:'Find the common difference between consecutive terms.',
    explanation:'Each term increases by 7. So the next term is 24 + 7 = <b>31</b>.' }),

  makeMCQ({ id:'g9m-my-014', chapterId:'g9m-patterns', subsection:'sequences_and_figures', difficulty:2,
    question:'The nth term of a sequence is 4n − 1. What is the 5th term?',
    options:['19','20','21','18'], answer:'19',
    hint:'Substitute n = 5 into the formula.',
    explanation:'4(5) − 1 = 20 − 1 = <b>19</b>.' }),

  // ── Personal Finance ───────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-015', chapterId:'g9m-finance', subsection:'salaries_and_bills', difficulty:2,
    question:'One mobile phone costs Rs 9,000. What is the cost of 4 such phones?',
    options:['Rs 36,000','Rs 3,600','Rs 6,300','Rs 63,000'], answer:'Rs 36,000',
    hint:'Multiply the cost of one by four.',
    explanation:'4 × Rs 9,000 = <b>Rs 36,000</b>.' }),

  makeMCQ({ id:'g9m-my-016', chapterId:'g9m-finance', subsection:'salaries_and_bills', difficulty:2,
    question:'A worker earns Rs 18,000 per month. How much does she earn in a year?',
    options:['Rs 216,000','Rs 180,000','Rs 198,000','Rs 240,000'], answer:'Rs 216,000',
    hint:'Multiply the monthly salary by 12.',
    explanation:'Rs 18,000 × 12 = <b>Rs 216,000</b>.' }),

  // ── Geometry Revision ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-017', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:1,
    question:'How many sides does a hexagon have?',
    options:['6','5','7','8'], answer:'6',
    hint:'Hex- means six in Greek.',
    explanation:'A <b>hexagon</b> has <b>6</b> sides. Pentagon = 5, heptagon = 7, octagon = 8.' }),

  makeMCQ({ id:'g9m-my-018', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:1,
    question:'What is the sum of the interior angles of a triangle?',
    options:['180°','360°','270°','90°'], answer:'180°',
    hint:'All three angles add up to a straight line.',
    explanation:'The interior angles of any triangle always sum to <b>180°</b>.' }),

  makeMCQ({ id:'g9m-my-019', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:2,
    question:'Two angles on a straight line are 65° and x°. What is x?',
    options:['115°','65°','90°','245°'], answer:'115°',
    hint:'Angles on a straight line sum to 180°.',
    explanation:'65° + x = 180° → x = 180° − 65° = <b>115°</b>.' }),

  makeMCQ({ id:'g9m-my-020', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:2,
    question:'A pie chart has four sectors. One sector represents 90°. What fraction of the whole does this sector represent?',
    options:['1/4','1/3','1/2','3/4'], answer:'1/4',
    hint:'A full circle = 360°. What fraction is 90° of 360°?',
    explanation:'90° ÷ 360° = <b>1/4</b>. A 90° sector is one quarter of the circle.' }),

  // ── Trigonometry ───────────────────────────────────────────────────────────

  makeNum({ id:'g9m-my-021', chapterId:'g9m-trigonometry', subsection:'ratios_and_2d_problems', difficulty:2,
    question:'In a right-angled triangle, the opposite side is 3 cm and the hypotenuse is 5 cm. What is sin θ? Give your answer as a decimal.',
    answer:0.6, unit:'', tolerance:0.001,
    hint:'sin θ = opposite ÷ hypotenuse.',
    explanation:'sin θ = 3 ÷ 5 = <b>0.6</b>.' }),

  makeNum({ id:'g9m-my-022', chapterId:'g9m-trigonometry', subsection:'ratios_and_2d_problems', difficulty:3,
    question:'In a right-angled triangle, the adjacent side is 8 cm and the hypotenuse is 10 cm. What is angle θ in degrees? (Use cos⁻¹)',
    answer:36.87, unit:'°', tolerance:0.5,
    hint:'cos θ = adjacent ÷ hypotenuse = 8/10 = 0.8.',
    explanation:'cos θ = 8/10 = 0.8. θ = cos⁻¹(0.8) ≈ <b>36.87°</b>.' }),

  // ── Coordinates ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-023', chapterId:'g9m-coordinates', subsection:'gradient', difficulty:2,
    question:'What is the gradient of a line that passes through (0, 2) and (4, 10)?',
    options:['2','4','8','0.5'], answer:'2',
    hint:'Gradient = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁).',
    explanation:'Gradient = (10 − 2) ÷ (4 − 0) = 8 ÷ 4 = <b>2</b>.' }),

  makeMCQ({ id:'g9m-my-024', chapterId:'g9m-coordinates', subsection:'equation_of_line', difficulty:2,
    question:'A line has gradient 3 and passes through (0, −1). What is its equation?',
    options:['y = 3x − 1','y = x + 3','y = 3x + 1','y = −x + 3'], answer:'y = 3x − 1',
    hint:'Use y = mx + c, where m is the gradient and c is the y-intercept.',
    explanation:'m = 3, c = −1 → equation is <b>y = 3x − 1</b>.' }),

  // ── Vectors ────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-025', chapterId:'g9m-vectors', subsection:'column_vectors', difficulty:2,
    question:'What is the magnitude of the vector (3, 4)?',
    options:['5','7','3.5','12'], answer:'5',
    hint:'Use Pythagoras: magnitude = √(x² + y²).',
    explanation:'|v| = √(3² + 4²) = √(9 + 16) = √25 = <b>5</b>.' }),

  makeMCQ({ id:'g9m-my-026', chapterId:'g9m-vectors', subsection:'translation', difficulty:2,
    question:'Point A is at (1, 2). It is translated by vector (3, −4). What are the coordinates of the image A\'?',
    options:['(4, −2)','(−2, 6)','(3, 4)','(4, 6)'], answer:'(4, −2)',
    hint:'Add the vector components to the coordinates.',
    explanation:'A\' = (1 + 3, 2 + (−4)) = <b>(4, −2)</b>.' }),

  // ── Algebraic Expressions ──────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-027', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:1,
    question:'Simplify 4y + 9y.',
    options:['13y','36y²','4y + 9','13'], answer:'13y',
    hint:'Add the coefficients of the like terms.',
    explanation:'4y + 9y = (4 + 9)y = <b>13y</b>.' }),

  makeMCQ({ id:'g9m-my-028', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:1,
    question:'Factorise 2x + 4.',
    options:['2(x + 2)','2x(x + 2)','(x + 2)','2(x + 4)'], answer:'2(x + 2)',
    hint:'Take out the common factor of 2.',
    explanation:'2x + 4 = 2 × x + 2 × 2 = <b>2(x + 2)</b>.' }),

  makeMCQ({ id:'g9m-my-029', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:2,
    question:'Expand (x + 3)(x + 5).',
    options:['x² + 8x + 15','x² + 15x + 8','x² + 8','x² + 15'], answer:'x² + 8x + 15',
    hint:'Multiply each term in the first bracket by each term in the second.',
    explanation:'(x + 3)(x + 5) = x² + 5x + 3x + 15 = <b>x² + 8x + 15</b>.' }),

  // ── Quadratics ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-030', chapterId:'g9m-quadratics', subsection:'factorise_and_solve', difficulty:2,
    question:'Factorise x² + 5x + 6.',
    options:['(x + 2)(x + 3)','(x + 1)(x + 6)','(x + 5)(x + 1)','(x + 2)(x + 4)'], answer:'(x + 2)(x + 3)',
    hint:'Find two numbers that multiply to 6 and add to 5.',
    explanation:'2 × 3 = 6 and 2 + 3 = 5, so x² + 5x + 6 = <b>(x + 2)(x + 3)</b>.' }),

  // ── Simultaneous Equations ─────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-031', chapterId:'g9m-simultaneous', subsection:'solve_simultaneous', difficulty:2,
    question:'Solve the simultaneous equations: x + y = 10 and x − y = 4. What is x?',
    options:['7','3','4','6'], answer:'7',
    hint:'Add the two equations to eliminate y.',
    explanation:'Adding: 2x = 14 → x = <b>7</b>. Then y = 10 − 7 = 3.' }),

  // ── Matrices ───────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-032', chapterId:'g9m-matrices', subsection:'order_types_operations', difficulty:1,
    question:'What is the order of a matrix with 3 rows and 2 columns?',
    options:['3 × 2','2 × 3','6 × 1','1 × 6'], answer:'3 × 2',
    hint:'Order = rows × columns (rows first).',
    explanation:'A matrix with 3 rows and 2 columns has order <b>3 × 2</b>.' }),

  makeMCQ({ id:'g9m-my-033', chapterId:'g9m-matrices', subsection:'order_types_operations', difficulty:2,
    question:'What is the identity matrix for 2 × 2 matrices?',
    options:['[[1,0],[0,1]]','[[0,1],[1,0]]','[[1,1],[1,1]]','[[0,0],[0,0]]'], answer:'[[1,0],[0,1]]',
    hint:'When multiplied by any 2×2 matrix, it leaves it unchanged.',
    explanation:'The 2×2 identity matrix is <b>I = [[1,0],[0,1]]</b>. It has 1s on the diagonal and 0s elsewhere.' }),

  // ── Surface Area ───────────────────────────────────────────────────────────

  makeNum({ id:'g9m-my-034', chapterId:'g9m-surface-area', subsection:'nets_and_surface_area', difficulty:2,
    question:'Find the circumference of a circle with diameter 10 cm. Use π = 3.14. Give your answer in cm.',
    answer:31.4, unit:'cm', tolerance:0.1,
    hint:'Circumference = π × diameter.',
    explanation:'C = π × d = 3.14 × 10 = <b>31.4 cm</b>.' }),

  // ── Volume ─────────────────────────────────────────────────────────────────

  makeNum({ id:'g9m-my-035', chapterId:'g9m-volume', subsection:'prisms_and_cylinders', difficulty:2,
    question:'Find the volume of a cylinder with radius 3 cm and height 10 cm. Use π = 3.14. Give your answer in cm³.',
    answer:282.6, unit:'cm³', tolerance:1,
    hint:'Volume of cylinder = π × r² × h.',
    explanation:'V = 3.14 × 3² × 10 = 3.14 × 9 × 10 = <b>282.6 cm³</b>.' }),

  // ── Statistics ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-036', chapterId:'g9m-statistics', subsection:'frequency_and_averages', difficulty:2,
    question:'The ages of 5 students are: 13, 14, 14, 15, 14. What is the mode?',
    options:['14','13','15','14.5'], answer:'14',
    hint:'The mode is the value that appears most often.',
    explanation:'14 appears three times; 13 and 15 appear once each. The <b>mode</b> is <b>14</b>.' }),

  makeNum({ id:'g9m-my-037', chapterId:'g9m-statistics', subsection:'frequency_and_averages', difficulty:2,
    question:'Find the mean of the numbers: 8, 12, 15, 9, 6.',
    answer:10, unit:'', tolerance:0,
    hint:'Mean = sum ÷ count.',
    explanation:'Sum = 8 + 12 + 15 + 9 + 6 = 50. Mean = 50 ÷ 5 = <b>10</b>.' }),

  // ── Probability ────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-038', chapterId:'g9m-probability', subsection:'simple_and_combined_events', difficulty:2,
    question:'A bag contains 3 red balls and 7 blue balls. What is the probability of picking a red ball at random?',
    options:['3/10','7/10','1/3','3/7'], answer:'3/10',
    hint:'P(event) = favourable outcomes ÷ total outcomes.',
    explanation:'Total balls = 3 + 7 = 10. P(red) = 3/10 = <b>0.3</b>.' }),

  // ── Inequalities ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-039', chapterId:'g9m-inequalities', subsection:'solve_and_represent', difficulty:2,
    question:'Solve: 2x + 3 > 11.',
    options:['x > 4','x > 7','x < 4','x > 8'], answer:'x > 4',
    hint:'Subtract 3 from both sides, then divide by 2.',
    explanation:'2x + 3 > 11 → 2x > 8 → <b>x > 4</b>.' }),

  // ── Formulae & Manipulation ────────────────────────────────────────────────

  makeMCQ({ id:'g9m-my-040', chapterId:'g9m-manipulation', subsection:'formulae_and_subject', difficulty:2,
    question:'Make <i>r</i> the subject of the formula: A = πr².',
    options:['r = √(A/π)','r = A/π','r = √(πA)','r = A/(2π)'], answer:'r = √(A/π)',
    hint:'Divide both sides by π, then take the square root.',
    explanation:'A = πr² → r² = A/π → r = <b>√(A/π)</b>.' })

);
})();
