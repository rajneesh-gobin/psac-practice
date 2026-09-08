'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2024 Mathematics (N510) - past-paper questions adapted to MCQ format,
//  plus the multi-part written questions verbatim for the past-papers screen.
//  Source: Mauritius Examinations Syndicate, past-papers/nce/mathematics/
//  2024-Mathematics.pdf - 33 questions, 100 marks, 2 hours, no calculator.
//
//  ⚠⚠ DO NOT TRANSCRIBE THIS PAPER FROM `pdftotext`. Every arithmetic
//     operator, radical and exponent is ABSENT from the text layer, and what
//     comes out reads like a question rather than looking like a broken one:
//         "Factorise 3x 6."        is  Factorise 3x - 6.
//         "Find 364."              is  Find the cube root of 64.
//         "Simplify (m3)5."        is  Simplify (m^3)^5.
//         "Evaluate 3 5 x 9."      is  Evaluate 3 + 5 - 9.
//         "50 2 5 4 1"             is  50 / 2 x 5 - 4 = 1.
//     A transcription taken from that text is invented, not read. There is no
//     pdftoppm/pdftocairo on this machine either - the pages here were read by
//     rendering them through Chrome's PDF viewer over CDP and looking at them
//     (scratchpad/render-pdf.js). Do the same for the other NCE papers.
//
//  ⚠ The paper's diagrams have NOT been cropped into assets/ (no rasteriser),
//    so a written question that cannot be answered without its figure carries
//    needsArtwork:true and is hidden by renderPastPapers() rather than shown
//    unanswerable. Questions whose figure can be stated fully in words - the
//    trapezium, the circle, the spinner - are written out instead and stay
//    visible, which is why only four are hidden.
//
//  ⚠ Difficulty here follows the MATHS meaning of L4: applied/multi-step word
//    problems, not "harder recall".
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ── Q1-Q11: the opening run of single-mark items ────────────────────────

  makeMCQ({ id:'g9m-pp24-001', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Work out <b>632 + 157</b>.',
    options:['789','779','785','799'], answer:'789',
    hint:'Add the units, then the tens, then the hundreds.',
    explanation:'2 + 7 = 9, 3 + 5 = 8, 6 + 1 = 7, so the total is <b>789</b>.' }),

  makeMCQ({ id:'g9m-pp24-002', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Evaluate <b>5/13 + 3/13</b>.',
    options:['8/13','8/26','15/13','2/13'], answer:'8/13',
    hint:'The denominators are already the same.',
    explanation:'With a common denominator you add only the numerators: 5 + 3 = 8, so the answer is <b>8/13</b>. The denominator does not change.' }),

  makeMCQ({ id:'g9m-pp24-003', chapterId:'g9m-capacity', subsection:'units_and_problems', difficulty:1,
    question:'Convert <b>5 kg 620 g</b> into grams.',
    options:['5620 g','5062 g','56 200 g','562 g'], answer:'5620 g',
    hint:'One kilogram is 1000 grams.',
    explanation:'5 kg = 5000 g, and 5000 + 620 = <b>5620 g</b>.' }),

  makeMCQ({ id:'g9m-pp24-004', chapterId:'g9m-indices', subsection:'laws', difficulty:1,
    question:'Find the <b>cube root of 64</b>.',
    options:['4','8','16','32'], answer:'4',
    hint:'Which number multiplied by itself three times gives 64?',
    explanation:'4 &times; 4 &times; 4 = 64, so the cube root of 64 is <b>4</b>. (8 is the <i>square</i> root of 64.)' }),

  makeMCQ({ id:'g9m-pp24-005', chapterId:'g9m-indices', subsection:'laws', difficulty:2,
    question:'Simplify <b>(m<sup>3</sup>)<sup>5</sup></b>.',
    options:['m<sup>15</sup>','m<sup>8</sup>','m<sup>35</sup>','m<sup>2</sup>'], answer:'m<sup>15</sup>',
    hint:'A power raised to a power: what do you do with the two indices?',
    explanation:'(m<sup>a</sup>)<sup>b</sup> = m<sup>a&times;b</sup>, so (m<sup>3</sup>)<sup>5</sup> = m<sup>3&times;5</sup> = <b>m<sup>15</sup></b>. Adding the indices (giving m<sup>8</sup>) is the rule for <i>multiplying</i> powers, not raising one.' }),

  makeMCQ({ id:'g9m-pp24-006', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Which of these is a <b>square number</b>: 15, 20, 36, 59, 80?',
    options:['36','20','59','80'], answer:'36',
    hint:'A square number is a whole number multiplied by itself.',
    explanation:'6 &times; 6 = 36, so <b>36</b> is a square number. None of the others is a whole number times itself.' }),

  makeMCQ({ id:'g9m-pp24-007', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:1,
    question:'Simplify <b>7x<sup>2</sup> + 2x<sup>2</sup></b>.',
    options:['9x<sup>2</sup>','9x<sup>4</sup>','14x<sup>2</sup>','5x<sup>2</sup>'], answer:'9x<sup>2</sup>',
    hint:'These are like terms - the letter and its power match.',
    explanation:'Add the coefficients and keep the term: 7 + 2 = 9, so the answer is <b>9x<sup>2</sup></b>. The index does not change when you add like terms.' }),

  makeMCQ({ id:'g9m-pp24-008', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Evaluate <b>3 + 5 &minus; 9</b>.',
    options:['-1','1','-7','17'], answer:'-1',
    hint:'Work from left to right.',
    explanation:'3 + 5 = 8, and 8 &minus; 9 = <b>-1</b>.' }),

  makeMCQ({ id:'g9m-pp24-009', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Express <b>0.31</b> as a percentage.',
    options:['31%','3.1%','310%','0.31%'], answer:'31%',
    hint:'To turn a decimal into a percentage, multiply by 100.',
    explanation:'0.31 &times; 100 = <b>31%</b>.' }),

  makeMCQ({ id:'g9m-pp24-010', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Calculate <b>3.02 &times; 4</b>.',
    options:['12.08','12.8','120.8','1.208'], answer:'12.08',
    hint:'Work out 302 &times; 4, then put the decimal point back.',
    explanation:'302 &times; 4 = 1208. There are two decimal places in 3.02, so the answer is <b>12.08</b>.' }),

  makeMCQ({ id:'g9m-pp24-011', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:2,
    question:'Factorise <b>3x &minus; 6</b>.',
    options:['3(x &minus; 2)','3(x &minus; 6)','3(x + 2)','x(3 &minus; 6)'], answer:'3(x &minus; 2)',
    hint:'What is the highest factor common to 3x and 6?',
    explanation:'3 divides both terms: 3x &divide; 3 = x and 6 &divide; 3 = 2, so 3x &minus; 6 = <b>3(x &minus; 2)</b>. Expanding it back gives 3x &minus; 6, which is the check.' }),

  // ── Q12: six one-mark multiple-choice items, as printed ─────────────────

  makeMCQ({ id:'g9m-pp24-012', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:1,
    question:'How many <b>right angles</b> are there in a rectangle?',
    options:['4','2','3','5'], answer:'4',
    hint:'Count the corners of a rectangle.',
    explanation:'Every one of a rectangle’s four corners is a right angle, so there are <b>4</b>.' }),

  makeMCQ({ id:'g9m-pp24-013', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'What is the <b>value of the 2</b> in 502.6?',
    options:['2 units','2 tens','2 tenths','2 hundreds'], answer:'2 units',
    hint:'Read the columns: hundreds, tens, units, then the decimal point.',
    explanation:'In 502.6 the digits are 5 hundreds, 0 tens, 2 units and 6 tenths, so the 2 stands for <b>2 units</b>.' }),

  makeMCQ({ id:'g9m-pp24-014', chapterId:'g9m-capacity', subsection:'units_and_problems', difficulty:2,
    question:'A clock shows 6.00 p.m. The clock is <b>20 minutes ahead of</b> the correct time. What is the correct time?',
    options:['5.40 p.m.','6.20 p.m.','5.20 p.m.','6.40 p.m.'], answer:'5.40 p.m.',
    hint:'If the clock is ahead, the real time is earlier than the clock shows.',
    explanation:'A clock that runs ahead shows a later time than it really is, so subtract: 6.00 p.m. &minus; 20 min = <b>5.40 p.m.</b>' }),

  makeMCQ({ id:'g9m-pp24-015', chapterId:'g9m-capacity', subsection:'units_and_problems', difficulty:1,
    question:'<b>130 minutes</b> is the same as:',
    options:['2 h 10 min','1 h 30 min','1 h 40 min','2 h 30 min'], answer:'2 h 10 min',
    hint:'How many whole hours fit into 130 minutes?',
    explanation:'120 minutes make 2 hours, and 130 &minus; 120 = 10 minutes left over, so 130 minutes = <b>2 h 10 min</b>.' }),

  makeMCQ({ id:'g9m-pp24-016', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:2,
    question:'What is the <b>highest common factor</b> (H.C.F.) of 3x and 6x<sup>2</sup>?',
    options:['3x','6x','3x<sup>2</sup>','6x<sup>2</sup>'], answer:'3x',
    hint:'Take the largest number that divides both, and the lowest power of x in both.',
    explanation:'3 is the highest common factor of 3 and 6, and x is the lowest power of x present in both terms, so the H.C.F. is <b>3x</b>. 6x would not divide 3x.' }),

  makeMCQ({ id:'g9m-pp24-017', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:1,
    question:'Which of the following is a <b>prime number</b>: 21, 23, 25, 27?',
    options:['23','21','25','27'], answer:'23',
    hint:'A prime number has exactly two factors: 1 and itself.',
    explanation:'21 = 3 &times; 7, 25 = 5 &times; 5 and 27 = 3 &times; 9, but <b>23</b> has no factors other than 1 and 23.' }),

  // ── Q14, Q15, Q16: ordering, equations, inequalities ────────────────────

  makeMCQ({ id:'g9m-pp24-018', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:2,
    question:'Arrange in <b>ascending</b> order: 5.62, 5.06, 5.23, 5.65, 5.006',
    options:['5.006, 5.06, 5.23, 5.62, 5.65','5.06, 5.006, 5.23, 5.62, 5.65','5.006, 5.06, 5.23, 5.65, 5.62','5.65, 5.62, 5.23, 5.06, 5.006'],
    answer:'5.006, 5.06, 5.23, 5.62, 5.65',
    hint:'Compare the tenths first, then the hundredths, then the thousandths.',
    explanation:'Every number starts with 5, so compare the decimals: 0.006 &lt; 0.06 &lt; 0.23 &lt; 0.62 &lt; 0.65. Ascending means smallest first, so <b>5.006, 5.06, 5.23, 5.62, 5.65</b>.' }),

  makeMCQ({ id:'g9m-pp24-019', chapterId:'g9m-finance', subsection:'salaries_and_bills', difficulty:3,
    question:'After a discount of <b>10%</b>, a laptop costs Rs 27 900. Find the <b>original price</b> of the laptop.',
    options:['Rs 31 000','Rs 30 690','Rs 30 000','Rs 27 900'], answer:'Rs 31 000',
    hint:'Rs 27 900 is not 100% of the price - it is what is left after 10% was taken off.',
    explanation:'After a 10% discount the customer pays 90% of the original price. So 90% = Rs 27 900, giving 1% = Rs 310 and 100% = <b>Rs 31 000</b>. Adding 10% to Rs 27 900 gives Rs 30 690, which is the common mistake - a percentage is always taken of the <i>original</i> amount.' }),

  makeMCQ({ id:'g9m-pp24-020', chapterId:'g9m-expressions', subsection:'binomials_and_factorising', difficulty:2,
    question:'Solve <b>x &minus; 5 = -7</b>.',
    options:['x = -2','x = 2','x = -12','x = 12'], answer:'x = -2',
    hint:'Add 5 to both sides.',
    explanation:'x &minus; 5 = -7, so x = -7 + 5 = <b>-2</b>. Check: -2 &minus; 5 = -7.' }),

  makeMCQ({ id:'g9m-pp24-021', chapterId:'g9m-quadratics', subsection:'factorise_and_solve', difficulty:3,
    question:'Solve <b>x<sup>2</sup> &minus; 5x + 6 = 0</b>.',
    options:['x = 2 or x = 3','x = -2 or x = -3','x = 1 or x = 6','x = -1 or x = -6'], answer:'x = 2 or x = 3',
    hint:'Find two numbers that multiply to +6 and add to -5.',
    explanation:'-2 and -3 multiply to 6 and add to -5, so x<sup>2</sup> &minus; 5x + 6 = (x &minus; 2)(x &minus; 3) = 0, giving <b>x = 2 or x = 3</b>. Note the signs: the factors are negative, so the roots are positive.' }),

  makeMCQ({ id:'g9m-pp24-022', chapterId:'g9m-inequalities', subsection:'solve_and_represent', difficulty:2,
    question:'Solve the inequality <b>2x + 3 &le; 11</b>.',
    options:['x &le; 4','x &ge; 4','x &le; 7','x &le; 8'], answer:'x &le; 4',
    hint:'Take 3 from both sides, then halve.',
    explanation:'2x + 3 &le; 11 gives 2x &le; 8, so <b>x &le; 4</b>. The inequality sign only flips when you multiply or divide by a negative number, which does not happen here.' }),

  // ── Q18-Q25: surds, order of operations, measures, formulae, matrices ───

  makeMCQ({ id:'g9m-pp24-023', chapterId:'g9m-indices', subsection:'laws', difficulty:3,
    question:'Given that the square root of 5 is 2.236 and the square root of 50 is 7.071, find the <b>square root of 5000</b>.',
    options:['70.71','22.36','223.6','707.1'], answer:'70.71',
    hint:'5000 = 100 &times; 50, and the square root of 100 is exact.',
    explanation:'5000 = 100 &times; 50, so the square root of 5000 = 10 &times; the square root of 50 = 10 &times; 7.071 = <b>70.71</b>. Splitting off a perfect square is the whole technique here.' }),

  makeMCQ({ id:'g9m-pp24-024', chapterId:'g9m-number-revision', subsection:'fractions_decimals_percentages', difficulty:3,
    question:'Where must brackets be inserted to make this true? <b>50 &divide; 2 &times; 5 &minus; 4 = 1</b>',
    options:['50 &divide; (2 &times; 5) &minus; 4','(50 &divide; 2) &times; 5 &minus; 4','50 &divide; 2 &times; (5 &minus; 4)','(50 &divide; 2 &times; 5) &minus; 4'],
    answer:'50 &divide; (2 &times; 5) &minus; 4',
    hint:'You need the division to happen last among the first three numbers - so make 2 &times; 5 into a single divisor.',
    explanation:'50 &divide; (2 &times; 5) &minus; 4 = 50 &divide; 10 &minus; 4 = 5 &minus; 4 = <b>1</b>. Without brackets the left-to-right rule gives 50 &divide; 2 &times; 5 &minus; 4 = 121.' }),

  makeMCQ({ id:'g9m-pp24-025', chapterId:'g9m-capacity', subsection:'units_and_problems', difficulty:4,
    question:'Kylie runs 1&frac34; km, then cycles 3500 m, then swims 2250 cm. What is the <b>total distance</b> she covers, <b>in metres</b>?',
    options:['5272.5 m','5522.5 m','7275 m','5250 m'], answer:'5272.5 m',
    hint:'Convert all three distances to metres before adding anything.',
    explanation:'1&frac34; km = 1750 m, the cycle is already 3500 m, and 2250 cm = 22.5 m. Total = 1750 + 3500 + 22.5 = <b>5272.5 m</b>. The trap is adding before converting.' }),

  makeMCQ({ id:'g9m-pp24-026', chapterId:'g9m-finance', subsection:'salaries_and_bills', difficulty:3,
    question:'A man invests Rs 300 000 for <b>5 years</b> at <b>2% per annum</b> simple interest. Calculate the <b>interest</b> he earns.',
    options:['Rs 30 000','Rs 6000','Rs 60 000','Rs 330 000'], answer:'Rs 30 000',
    hint:'Simple interest = principal &times; rate &times; time.',
    explanation:'Interest = 300 000 &times; 2/100 &times; 5 = 6000 &times; 5 = <b>Rs 30 000</b>. Rs 6000 is one year only; Rs 330 000 is the total amount, not the interest.' }),

  makeMCQ({ id:'g9m-pp24-027', chapterId:'g9m-manipulation', subsection:'formulae_and_subject', difficulty:4,
    question:'Make <b>a</b> the subject of the formula <b>3b = (2a &minus; 1) / (4 &minus; 5a)</b>.',
    options:['a = (12b + 1) / (15b + 2)','a = (12b &minus; 1) / (15b + 2)','a = (12b + 1) / (2 &minus; 15b)','a = (1 &minus; 12b) / (15b + 2)'],
    answer:'a = (12b + 1) / (15b + 2)',
    hint:'Multiply both sides by (4 &minus; 5a) first, then gather every term containing a on one side.',
    explanation:'3b(4 &minus; 5a) = 2a &minus; 1, so 12b &minus; 15ab = 2a &minus; 1. Move the a terms together: 12b + 1 = 2a + 15ab = a(2 + 15b). Therefore <b>a = (12b + 1) / (15b + 2)</b>.' }),

  makeMCQ({ id:'g9m-pp24-028', chapterId:'g9m-manipulation', subsection:'formulae_and_subject', difficulty:2,
    question:'If <b>A = 6m + 7n/100</b>, find A when <b>m = 2</b> and <b>n = 3</b>.',
    options:['12.21','12.7','1221','18.21'], answer:'12.21',
    hint:'Work out 6m and 7n/100 separately, then add.',
    explanation:'6m = 6 &times; 2 = 12, and 7n/100 = 21/100 = 0.21. So A = 12 + 0.21 = <b>12.21</b>.' }),

  makeMCQ({ id:'g9m-pp24-029', chapterId:'g9m-probability', subsection:'simple_and_combined_events', difficulty:2,
    question:'A spinner numbered <b>2 to 9</b> is spun once. Find the probability that it shows an <b>even number</b>.',
    options:['1/2','3/8','5/8','1/4'], answer:'1/2',
    hint:'List 2 to 9 and count how many are even out of how many in total.',
    explanation:'The numbers 2, 3, 4, 5, 6, 7, 8, 9 give 8 equally likely outcomes, of which 2, 4, 6 and 8 are even. So the probability is 4/8 = <b>1/2</b>.' }),

  makeMCQ({ id:'g9m-pp24-030', chapterId:'g9m-probability', subsection:'simple_and_combined_events', difficulty:2,
    question:'A spinner numbered <b>2 to 9</b> is spun once. Find the probability that it <b>does not</b> show 7.',
    options:['7/8','1/8','6/8','8/9'], answer:'7/8',
    hint:'How many of the eight outcomes are not a 7?',
    explanation:'There are 8 outcomes and exactly one of them is a 7, so 7 are not. The probability is <b>7/8</b> - which is also 1 &minus; 1/8.' }),

  makeMCQ({ id:'g9m-pp24-031', chapterId:'g9m-matrices', subsection:'order_types_operations', difficulty:3,
    question:'Given A = (2, -3; 0, 5) and B = (-1, 4; 6, 2), written row by row, find <b>2A &minus; B</b>.',
    options:['(5, -10; -6, 8)','(3, -10; -6, 8)','(5, -2; 6, 8)','(3, -2; 6, 12)'], answer:'(5, -10; -6, 8)',
    hint:'Double every entry of A first, then subtract the matching entry of B.',
    explanation:'2A = (4, -6; 0, 10). Subtracting B entry by entry: 4 &minus; (-1) = 5, -6 &minus; 4 = -10, 0 &minus; 6 = -6, 10 &minus; 2 = 8, giving <b>(5, -10; -6, 8)</b>. The first entry is the one people get wrong - subtracting a negative adds.' }),

  makeMCQ({ id:'g9m-pp24-032', chapterId:'g9m-coordinates', subsection:'equation_of_line', difficulty:4,
    question:'A line passes through S(-2, 3) and T(4, 5). Find the equation of the line through <b>(-3, 1)</b> that is <b>parallel</b> to ST.',
    options:['y = x/3 + 2','y = 3x + 10','y = x/3 &minus; 2','y = -3x &minus; 8'], answer:'y = x/3 + 2',
    hint:'Parallel lines share a gradient. Find the gradient of ST first.',
    explanation:'Gradient of ST = (5 &minus; 3)/(4 &minus; -2) = 2/6 = 1/3. A parallel line through (-3, 1) is y &minus; 1 = (1/3)(x + 3), so y = x/3 + 1 + 1 = <b>y = x/3 + 2</b>.' }),

  makeMCQ({ id:'g9m-pp24-033', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:4,
    question:'12 men take 15 days to build a wall. How many <b>more</b> men are needed to build the same wall in <b>10 days</b>? (All men work at the same rate.)',
    options:['6','18','8','3'], answer:'6',
    hint:'Work out the total man-days for the job first. Fewer days needs more men.',
    explanation:'The job is 12 &times; 15 = 180 man-days. In 10 days that needs 180 &divide; 10 = 18 men. The question asks how many <b>more</b>, so 18 &minus; 12 = <b>6</b>. Answering 18 is the trap.' }),

  // ── Q27-Q33: patterns, statistics, trigonometry, ratio, circles ─────────

  makeMCQ({ id:'g9m-pp24-034', chapterId:'g9m-patterns', subsection:'sequences_and_figures', difficulty:2,
    question:'Matchstick figures use 3, 5, 7, ... matchsticks for Figures 1, 2, 3. How many matchsticks does <b>Figure 5</b> use?',
    options:['11','9','13','10'], answer:'11',
    hint:'The pattern goes up by the same amount each time.',
    explanation:'The sequence 3, 5, 7 rises by 2 each figure, so Figure 4 uses 9 and Figure 5 uses <b>11</b>.' }),

  makeMCQ({ id:'g9m-pp24-035', chapterId:'g9m-patterns', subsection:'sequences_and_figures', difficulty:2,
    question:'The matchstick pattern uses 3, 5, 7, ... matchsticks. Which figure uses <b>21 matchsticks</b>?',
    options:['Figure 10','Figure 11','Figure 9','Figure 21'], answer:'Figure 10',
    hint:'The figure numbered n uses 2n + 1 matchsticks. Work backwards.',
    explanation:'2n + 1 = 21 gives 2n = 20, so n = <b>10</b>. Checking: Figure 10 uses 2(10) + 1 = 21 matchsticks.' }),

  makeMCQ({ id:'g9m-pp24-036', chapterId:'g9m-patterns', subsection:'sequences_and_figures', difficulty:3,
    question:'The matchstick pattern uses 3, 5, 7, ... matchsticks for Figures 1, 2, 3. Write the number used by <b>Figure n</b>.',
    options:['2n + 1','2n &minus; 1','n + 2','3n'], answer:'2n + 1',
    hint:'It goes up by 2 each time, so the rule starts with 2n. What must be added to make Figure 1 give 3?',
    explanation:'A rise of 2 per figure means the rule contains 2n. For n = 1, 2n = 2 but the figure uses 3, so add 1: the rule is <b>2n + 1</b>. Check n = 3: 2(3) + 1 = 7.' }),

  makeMCQ({ id:'g9m-pp24-037', chapterId:'g9m-statistics', subsection:'frequency_and_averages', difficulty:3,
    question:'36 students named a favourite dessert: ice cream 13, fruits 10, rasmalai 7, donuts 6. On a <b>pie chart</b>, what angle represents <b>fruits</b>?',
    options:['100&deg;','130&deg;','10&deg;','36&deg;'], answer:'100&deg;',
    hint:'The whole pie is 360&deg; and represents all 36 students.',
    explanation:'Fruits is 10 of 36 students, so the angle is 10/36 &times; 360&deg; = <b>100&deg;</b>. (A useful shortcut here: 36 students in 360&deg; means every student is worth exactly 10&deg;.)' }),

  makeMCQ({ id:'g9m-pp24-038', chapterId:'g9m-trigonometry', subsection:'ratios_and_2d_problems', difficulty:4,
    question:'ABCD is a trapezium with AB parallel to DC, AD = BC, AB = 8 cm and DC = 20 cm. X lies on DC so that AX is perpendicular to DC, and angle ADX = 40&deg;. Calculate <b>AX</b>. [tan 40&deg; = 0.84]',
    options:['5.04 cm','4.62 cm','7.14 cm','16.8 cm'], answer:'5.04 cm',
    hint:'Because the trapezium is symmetrical, work out DX first: the two overhangs are equal.',
    explanation:'AD = BC makes the trapezium symmetrical, so the overhang at each end is (20 &minus; 8) &divide; 2 = 6 cm, giving DX = 6 cm. In right-angled triangle ADX, tan 40&deg; = AX / DX, so AX = 6 &times; 0.84 = <b>5.04 cm</b>.' }),

  makeMCQ({ id:'g9m-pp24-039', chapterId:'g9m-number-revision', subsection:'ratio_and_measures', difficulty:3,
    question:'A sum of money is shared between Shania and Mirella in the ratio <b>2 : 5</b>. Mirella receives <b>Rs 360 more</b> than Shania. Calculate the <b>total</b> amount shared.',
    options:['Rs 840','Rs 1260','Rs 504','Rs 600'], answer:'Rs 840',
    hint:'The difference between the two shares is 3 parts. What is one part worth?',
    explanation:'The shares differ by 5 &minus; 2 = 3 parts, and that difference is Rs 360, so one part is Rs 120. The total is 2 + 5 = 7 parts = 7 &times; 120 = <b>Rs 840</b>.' }),

  makeMCQ({ id:'g9m-pp24-040', chapterId:'g9m-simultaneous', subsection:'solve_simultaneous', difficulty:4,
    question:'A pair of shoes and 3 T-shirts cost Rs 3750. Two pairs of the same shoes and 5 T-shirts cost Rs 6750. Find the cost of <b>1 pair of shoes and 4 T-shirts</b>.',
    options:['Rs 4500','Rs 3750','Rs 5250','Rs 2250'], answer:'Rs 4500',
    hint:'Call the shoes s and a T-shirt t, write both sentences as equations, and eliminate s.',
    explanation:'s + 3t = 3750 and 2s + 5t = 6750. Doubling the first gives 2s + 6t = 7500; subtracting the second leaves t = 750. Then s = 3750 &minus; 3(750) = 1500. So 1 pair of shoes and 4 T-shirts cost 1500 + 4(750) = <b>Rs 4500</b>.' }),

  makeMCQ({ id:'g9m-pp24-041', chapterId:'g9m-surface-area', subsection:'nets_and_surface_area', difficulty:2,
    question:'A circle has radius <b>13 cm</b>. Find its <b>circumference</b>, leaving your answer in terms of &pi;.',
    options:['26&pi; cm','13&pi; cm','169&pi; cm','6.5&pi; cm'], answer:'26&pi; cm',
    hint:'Circumference = 2 &times; &pi; &times; radius.',
    explanation:'C = 2&pi;r = 2 &times; &pi; &times; 13 = <b>26&pi; cm</b>. (169&pi; would be the area, &pi;r<sup>2</sup>.)' }),

  makeMCQ({ id:'g9m-pp24-042', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:2,
    question:'A and B are points on a circle with centre O. What type of triangle is <b>triangle AOB</b>?',
    options:['Isosceles','Equilateral','Scalene','Right-angled'], answer:'Isosceles',
    hint:'What can you say about OA and OB?',
    explanation:'OA and OB are both radii of the same circle, so they are equal in length. A triangle with two equal sides is <b>isosceles</b>.' }),

  makeMCQ({ id:'g9m-pp24-043', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:3,
    question:'In a circle of centre O, chord AB = 10 cm and the radius OA = 13 cm. X is the point on AB where OX is perpendicular to AB. Calculate <b>OX</b>.',
    options:['12 cm','8 cm','11 cm','17 cm'], answer:'12 cm',
    hint:'The perpendicular from the centre bisects the chord, so AX is half of AB. Then use Pythagoras.',
    explanation:'OX bisects AB, so AX = 5 cm. In right-angled triangle OXA, OX<sup>2</sup> = OA<sup>2</sup> &minus; AX<sup>2</sup> = 169 &minus; 25 = 144, so OX = <b>12 cm</b>.' }),

  makeMCQ({ id:'g9m-pp24-044', chapterId:'g9m-geometry-revision', subsection:'grade7_8_geometry', difficulty:3,
    question:'In a circle of centre O, chord AB = 10 cm and the perpendicular distance OX from O to AB is 12 cm. Calculate the <b>area of triangle OAB</b>.',
    options:['60 cm<sup>2</sup>','120 cm<sup>2</sup>','30 cm<sup>2</sup>','65 cm<sup>2</sup>'], answer:'60 cm<sup>2</sup>',
    hint:'Take AB as the base. Which length is the perpendicular height?',
    explanation:'Area = &frac12; &times; base &times; height = &frac12; &times; 10 &times; 12 = <b>60 cm<sup>2</sup></b>. OX is the height because it is perpendicular to AB.' }),

  makeMCQ({ id:'g9m-pp24-045', chapterId:'g9m-quadratics', subsection:'factorise_and_solve', difficulty:4,
    question:'Each side of a square is increased by <b>8 cm</b>. The area of the <b>new</b> square is <b>6 times its perimeter</b>. Find the length of one side of the <b>original</b> square.',
    options:['16 cm','24 cm','8 cm','12 cm'], answer:'16 cm',
    hint:'Let the new side be one letter. Write its area and its perimeter, then set area = 6 &times; perimeter.',
    explanation:'Let the new side be y, so y = original + 8. Area = y<sup>2</sup> and perimeter = 4y, so y<sup>2</sup> = 6(4y) = 24y. Dividing by y gives y = 24, so the new side is 24 cm and the original side is 24 &minus; 8 = <b>16 cm</b>.' })
);

// ── The written questions, as printed, for the read-only past-papers screen ──
// No `answer` field on any of these: they are transcriptions, never graded.
// `markScheme` powers the optional self-marking reveal.
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9m-pp24-pdf-001', chapterId:'g9m-number-revision', marks:1, year:2024, grade:9, subject:'Mathematics', type:'written',
    needsArtwork:true,
    question:'Complete the number line below. (The line is marked -15, [ ], -5, 0, [ ], 10, 15.)',
    markScheme:'The line goes up in steps of 5, so the missing values are -10 and 5.' },

  { id:'g9m-pp24-pdf-002', chapterId:'g9m-inequalities', marks:3, year:2024, grade:9, subject:'Mathematics', type:'written',
    question:'(a) Solve the inequality 2x + 3 &le; 11. [2] (b) Draw a number line to represent the inequality in part (a). [1]',
    markScheme:'(a) 2x &le; 8, so x &le; 4. (b) A number line with a SOLID (filled) circle at 4 and the line shaded to the left, towards the smaller numbers. The circle is filled because the inequality allows x to equal 4.' },

  { id:'g9m-pp24-pdf-003', chapterId:'g9m-probability', marks:4, year:2024, grade:9, subject:'Mathematics', type:'written',
    question:'In a class of 30 students, 14 play football, 17 play volleyball, x play both football and volleyball, and 6 play neither football nor volleyball. (a) By using a Venn diagram or otherwise, find the value of x. [3] (b) How many students play volleyball only? [1]',
    markScheme:'(a) Everyone is counted once: (14 &minus; x) + x + (17 &minus; x) + 6 = 30, which gives 37 &minus; x = 30, so x = 7. (b) Volleyball only = 17 &minus; 7 = 10 students.' },

  { id:'g9m-pp24-pdf-004', chapterId:'g9m-geometry-revision', marks:2, year:2024, grade:9, subject:'Mathematics', type:'written',
    needsArtwork:true,
    question:'Find angle a. (Two parallel lines are crossed by a zigzag; the angle at the upper line is 50&deg;, the angle at the lower line is 60&deg;, and a is the angle at the middle vertex.)',
    markScheme:'Draw a line through the vertex parallel to the two given lines. It splits a into two alternate angles, one equal to 50&deg; and one equal to 60&deg;, so a = 50&deg; + 60&deg; = 110&deg;.' },

  { id:'g9m-pp24-pdf-005', chapterId:'g9m-vectors', marks:6, year:2024, grade:9, subject:'Mathematics', type:'written',
    needsArtwork:true,
    question:'(a) Rectangle ABCD has vertices A(2, 1), B(4, 1), C(4, 6) and D(2, 6), drawn on a grid. (i) Translate rectangle ABCD onto A1B1C1D1 by the column vector (3, -2). [2] (ii) Reflect rectangle ABCD onto A2B2C2D2 in the y-axis. [2] (b) Using a pair of compasses, (i) construct the perpendicular bisector of QR, and (ii) construct the angle bisector of angle QPR, on the triangle PQR shown. [2]',
    markScheme:'(a)(i) Add 3 to every x and subtract 2 from every y: A1(5, -1), B1(7, -1), C1(7, 4), D1(5, 4). (a)(ii) Reflecting in the y-axis negates every x: A2(-2, 1), B2(-4, 1), C2(-4, 6), D2(-2, 6). (b) Both parts are compass constructions and must show the arcs, not just the finished line.' },

  { id:'g9m-pp24-pdf-006', chapterId:'g9m-patterns', marks:1, year:2024, grade:9, subject:'Mathematics', type:'written',
    needsArtwork:true,
    question:'Matchsticks are arranged to form a pattern. Draw Figure 4 to continue the pattern.',
    markScheme:'Figure 4 continues the pattern with one more section than Figure 3, using 9 matchsticks.' },

  { id:'g9m-pp24-pdf-007', chapterId:'g9m-statistics', marks:2, year:2024, grade:9, subject:'Mathematics', type:'written',
    question:'A teacher surveys the favourite dessert of 36 students: ice cream 13, fruits 10, rasmalai 7, donuts 6. Draw a bar chart to represent this information.',
    markScheme:'Four bars of equal width and equal spacing, with a labelled vertical axis (Number of students) and a labelled horizontal axis (Dessert). Bar heights: ice cream 13, fruits 10, rasmalai 7, donuts 6.' },

  { id:'g9m-pp24-pdf-008', chapterId:'g9m-trigonometry', marks:4, year:2024, grade:9, subject:'Mathematics', type:'written',
    question:'ABCD is a trapezium in which AD = BC, AB = 8 cm and CD = 20 cm. X is a point on DC with angle AXC = 90&deg; and angle ADX = 40&deg;. Calculate the length AX. [cos 40&deg; = 0.77, sin 40&deg; = 0.64, tan 40&deg; = 0.84]',
    markScheme:'AD = BC makes the trapezium symmetrical, so DX = (20 &minus; 8) &divide; 2 = 6 cm. In triangle ADX, tan 40&deg; = AX / DX, so AX = 6 &times; 0.84 = 5.04 cm.' },

  { id:'g9m-pp24-pdf-009', chapterId:'g9m-geometry-revision', marks:8, year:2024, grade:9, subject:'Mathematics', type:'written',
    question:'A circle has radius 13 cm and centre O. (a) Find the circumference of the circle, leaving your answer in terms of &pi;. [2] (b) A triangle AOB is drawn inside the circle with OA = 13 cm, chord AB = 10 cm and angle OXA = 90&deg;, where X lies on AB. (i) What type of triangle is triangle AOB? [1] (ii) Calculate the length of OX. [3] (iii) Calculate the area of triangle OAB. [2]',
    markScheme:'(a) C = 2&pi;r = 26&pi; cm. (b)(i) Isosceles, because OA and OB are both radii. (b)(ii) The perpendicular from the centre bisects the chord, so AX = 5 cm; then OX<sup>2</sup> = 13<sup>2</sup> &minus; 5<sup>2</sup> = 144, giving OX = 12 cm. (b)(iii) Area = &frac12; &times; 10 &times; 12 = 60 cm<sup>2</sup>.' }
);
