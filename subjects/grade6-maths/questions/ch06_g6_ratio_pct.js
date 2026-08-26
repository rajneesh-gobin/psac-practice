'use strict';
// Grade 6 Maths - Chapter: Ratio, Average & Percentage
// IDs format: g6m-pct-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-pct-001', chapterId:'g6-ratio-pct', subsection:'ratio_simplify', difficulty:1,
    question:'Write the ratio 12 : 8 in its SIMPLEST form. (Write as A:B, e.g. 3:2)',
    answer:'3:2', acceptableAnswers:['3:2','3 : 2'],
    hint:'Divide both numbers by their HCF. HCF(12,8) = 4.',
    explanation:'HCF(12, 8) = 4. Divide both: 12÷4 = 3, 8÷4 = 2. Simplest form: <b>3:2</b>.' }),

  makeNum({ id:'g6m-pct-002', chapterId:'g6-ratio-pct', subsection:'ratio_divide', difficulty:2,
    question:'Divide Rs 240 in the ratio 3 : 5. What is the <b>larger share</b>? (Rs)',
    answer:'150', acceptableAnswers:['150','Rs 150'],
    hint:'Total parts = 3 + 5 = 8. Each part = 240 ÷ 8 = 30. Larger share = 5 × 30.',
    explanation:'Total parts = 3 + 5 = 8. Value of 1 part = 240 ÷ 8 = Rs 30. Smaller share = 3 × 30 = Rs 90. Larger share = 5 × 30 = <b>Rs 150</b>.' }),

  makeNum({ id:'g6m-pct-003', chapterId:'g6-ratio-pct', subsection:'average', difficulty:2,
    question:'Find the AVERAGE of: 14, 18, 22, 10, 16.',
    answer:'16', acceptableAnswers:['16'],
    hint:'Average = Sum ÷ Number of values. Sum = 14+18+22+10+16.',
    explanation:'Sum = 14 + 18 + 22 + 10 + 16 = 80. Number of values = 5. Average = 80 ÷ 5 = <b>16</b>.' }),

  makeNum({ id:'g6m-pct-004', chapterId:'g6-ratio-pct', subsection:'average', difficulty:2,
    question:'The average of five numbers is 30. Four of the numbers are 25, 35, 28 and 32. What is the <b>fifth number</b>?',
    answer:'30', acceptableAnswers:['30'],
    hint:'Total sum = average × 5 = 150. Subtract the four known numbers.',
    explanation:'Total sum = 30 × 5 = 150. Sum of four numbers = 25+35+28+32 = 120. Fifth number = 150 − 120 = <b>30</b>.' }),

  makeNum({ id:'g6m-pct-005', chapterId:'g6-ratio-pct', subsection:'percentage_of', difficulty:1,
    question:'What is <b>25%</b> of Rs 800?',
    answer:'200', acceptableAnswers:['200','Rs 200'],
    hint:'25% = 25/100 = 1/4. Divide 800 by 4.',
    explanation:'25% of 800 = (25 ÷ 100) × 800 = 0.25 × 800 = <b>200</b>.' }),

  makeNum({ id:'g6m-pct-006', chapterId:'g6-ratio-pct', subsection:'discount', difficulty:2,
    question:'A shirt costs Rs 600. It is sold at a <b>20% discount</b>. What is the sale price?',
    answer:'480', acceptableAnswers:['480','Rs 480'],
    hint:'Discount amount = 20% of 600. Sale price = 600 − discount.',
    explanation:'Discount = 20% of Rs 600 = (20÷100) × 600 = Rs 120. Sale price = 600 − 120 = <b>Rs 480</b>.' }),

  makeNum({ id:'g6m-pct-007', chapterId:'g6-ratio-pct', subsection:'profit_loss', difficulty:2,
    question:'A bag is bought for Rs 400 and sold for Rs 500. What is the PERCENTAGE PROFIT?',
    answer:'25', acceptableAnswers:['25','25%'],
    hint:'Profit = Selling price − Cost price. % profit = (profit ÷ cost price) × 100.',
    explanation:'Profit = 500 − 400 = Rs 100. Percentage profit = (100 ÷ 400) × 100 = <b>25%</b>.' }),

  makeMCQ({ id:'g6m-pct-008', chapterId:'g6-ratio-pct', subsection:'conversion', difficulty:2,
    question:'In a class, 18 out of 30 students are girls. What percentage of the class are girls?',
    options:['18%','30%','60%','40%'],
    answer:'60%',
    hint:'Percentage = (part ÷ whole) × 100. Part = 18, whole = 30.',
    explanation:'Percentage = (18 ÷ 30) × 100 = 0.6 × 100 = <b>60%</b>.' }),

  makeNum({ id:'g6m-pct-009', chapterId:'g6-ratio-pct', subsection:'conversion', difficulty:2,
    question:'Convert <b>3/4</b> to a percentage.',
    answer:'75', acceptableAnswers:['75','75%'],
    hint:'Divide 3 by 4, then multiply by 100.',
    explanation:'3 ÷ 4 = 0.75. 0.75 × 100 = <b>75%</b>.' }),

  makeNum({ id:'g6m-pct-010', chapterId:'g6-ratio-pct', subsection:'ratio_divide', difficulty:2,
    question:'Three friends share Rs 540 in the ratio 2 : 3 : 4. How much does the friend with the <b>smallest share</b> receive? (Rs)',
    answer:'120', acceptableAnswers:['120','Rs 120'],
    hint:'Total parts = 2+3+4 = 9. Each part = 540 ÷ 9 = 60. Smallest share = 2 × 60.',
    explanation:'Total parts = 9. Each part = Rs 540 ÷ 9 = Rs 60. Smallest share (2 parts) = 2 × 60 = <b>Rs 120</b>.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-pct-011', chapterId:'g6-ratio-pct', subsection:'increase', difficulty:2,
    question:'A shirt costs Rs 350. Its price is INCREASED by 20%. What is the new price?',
    answer:'420', acceptableAnswers:['420','Rs 420'],
    hint:'Increase = 20% of 350. New price = 350 + increase.',
    explanation:'Increase = 20% × 350 = (20÷100) × 350 = Rs 70. New price = 350 + 70 = <b>Rs 420</b>. Shortcut: new price = 120% of 350 = 1.20 × 350 = Rs 420.' }),

  makeNum({ id:'g6m-pct-012', chapterId:'g6-ratio-pct', subsection:'discount', difficulty:2,
    question:'A television costs Rs 12,500. It is offered at a 15% DISCOUNT. What is the sale price?',
    answer:'10625', acceptableAnswers:['10625','Rs 10,625','10,625'],
    hint:'Discount = 15% × 12,500. Sale price = 12,500 − discount.',
    explanation:'Discount = 15% × 12,500 = (15÷100) × 12,500 = Rs 1,875. Sale price = 12,500 − 1,875 = <b>Rs 10,625</b>.' }),

  makeNum({ id:'g6m-pct-013', chapterId:'g6-ratio-pct', subsection:'increase', difficulty:2,
    question:'After a 25% increase, a bag costs Rs 500. What was the ORIGINAL price?',
    answer:'400', acceptableAnswers:['400','Rs 400'],
    hint:'Rs 500 = 125% of the original. Original = 500 ÷ 1.25 = 500 × (100/125).',
    explanation:'New price = 125% of original. Original = 500 × (100/125) = 500 × 4/5 = <b>Rs 400</b>. Check: 400 + 25% of 400 = 400 + 100 = Rs 500 ✓.' }),

  makeNum({ id:'g6m-pct-014', chapterId:'g6-ratio-pct', subsection:'ratio_simplify', difficulty:2,
    question:'In a class of 40 students, the ratio of boys to girls is 3 : 5. How many GIRLS are in the class?',
    answer:'25', acceptableAnswers:['25'],
    hint:'Total parts = 3 + 5 = 8. Girls = 5 parts. Each part = 40 ÷ 8 = 5.',
    explanation:'Total parts = 3 + 5 = 8. Each part = 40 ÷ 8 = 5. Girls = 5 × 5 = <b>25 girls</b>. Boys = 3 × 5 = 15. Check: 15 + 25 = 40 ✓.' }),

  makeNum({ id:'g6m-pct-015', chapterId:'g6-ratio-pct', subsection:'conversion', difficulty:2,
    question:'A student scored 72 out of 90 in a test. What PERCENTAGE did she score? (Round to nearest whole number if needed)',
    answer:'80', acceptableAnswers:['80','80%'],
    hint:'Percentage = (score ÷ total) × 100.',
    explanation:'Percentage = (72 ÷ 90) × 100 = 0.8 × 100 = <b>80%</b>.' }),

  makeMCQ({ id:'g6m-pct-016', chapterId:'g6-ratio-pct', subsection:'ratio_divide', difficulty:2,
    question:'A recipe uses flour and sugar in the ratio 4 : 1. If 400 g of flour is used, how much SUGAR is needed?',
    options:['25 g','100 g','40 g','160 g'],
    answer:'100 g',
    hint:'If flour : sugar = 4 : 1, and flour = 400 g, then sugar = 400 ÷ 4.',
    explanation:'Ratio flour:sugar = 4:1. If flour = 400 g, then sugar = 400 × (1/4) = <b>100 g</b>. When one quantity in a ratio is known, find the unit (1 part) and scale.' }),

  makeNum({ id:'g6m-pct-017', chapterId:'g6-ratio-pct', subsection:'profit_loss', difficulty:2,
    question:'An article is bought for Rs 800 and sold for Rs 700. What is the PERCENTAGE LOSS?',
    answer:'12.5', acceptableAnswers:['12.5','12.5%'],
    hint:'Loss = Cost price − Selling price. % loss = (Loss ÷ Cost price) × 100.',
    explanation:'Loss = 800 − 700 = Rs 100. % Loss = (100 ÷ 800) × 100 = 12.5%. So the seller made a <b>12.5% loss</b>.' }),

  makeNum({ id:'g6m-pct-018', chapterId:'g6-ratio-pct', subsection:'average', difficulty:2,
    question:'The average weight of 4 suitcases is 18 kg. A 5th suitcase weighing 28 kg is added. What is the new AVERAGE weight of all 5 suitcases?',
    answer:'20', acceptableAnswers:['20','20 kg'],
    hint:'Total of 4 cases = 4 × 18 = 72 kg. Total of 5 cases = 72 + 28. New average = total ÷ 5.',
    explanation:'Total of 4 suitcases = 4 × 18 = 72 kg. Total of 5 = 72 + 28 = 100 kg. New average = 100 ÷ 5 = <b>20 kg</b>.' }),

  makeNum({ id:'g6m-pct-019', chapterId:'g6-ratio-pct', subsection:'profit_loss', difficulty:4,
    question:'A shopkeeper buys 50 mangoes for Rs 100 and sells them for Rs 2.50 each. Five mangoes are damaged and cannot be sold. What is his PERCENTAGE PROFIT on the transaction?',
    answer:'12.5', acceptableAnswers:['12.5','12.5%'],
    hint:'Revenue = 45 × Rs 2.50. Cost = Rs 100. Profit = Revenue − Cost. % = (Profit ÷ Cost) × 100.',
    explanation:'Mangoes sold = 50 − 5 = 45. Revenue = 45 × 2.50 = Rs 112.50. Cost = Rs 100. Profit = 112.50 − 100 = Rs 12.50. % Profit = (12.50 ÷ 100) × 100 = <b>12.5%</b>.' })

);
