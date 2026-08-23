'use strict';
// Grade 6 Maths — Chapter: Ratio, Average & Percentage
// IDs format: g6m-pct-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-pct-001', chapterId:'g6-ratio-pct', difficulty:1,
    question:'Write the ratio 12 : 8 in its SIMPLEST form. (Write as A:B, e.g. 3:2)',
    answer:'3:2', acceptableAnswers:['3:2','3 : 2'],
    hint:'Divide both numbers by their HCF. HCF(12,8) = 4.',
    explanation:'HCF(12, 8) = 4. Divide both: 12÷4 = 3, 8÷4 = 2. Simplest form: <b>3:2</b>.' }),

  makeNum({ id:'g6m-pct-002', chapterId:'g6-ratio-pct', difficulty:2,
    question:'Divide Rs 240 in the ratio 3 : 5. What is the <b>larger share</b>? (Rs)',
    answer:'150', acceptableAnswers:['150','Rs 150'],
    hint:'Total parts = 3 + 5 = 8. Each part = 240 ÷ 8 = 30. Larger share = 5 × 30.',
    explanation:'Total parts = 3 + 5 = 8. Value of 1 part = 240 ÷ 8 = Rs 30. Smaller share = 3 × 30 = Rs 90. Larger share = 5 × 30 = <b>Rs 150</b>.' }),

  makeNum({ id:'g6m-pct-003', chapterId:'g6-ratio-pct', difficulty:2,
    question:'Find the AVERAGE of: 14, 18, 22, 10, 16.',
    answer:'16', acceptableAnswers:['16'],
    hint:'Average = Sum ÷ Number of values. Sum = 14+18+22+10+16.',
    explanation:'Sum = 14 + 18 + 22 + 10 + 16 = 80. Number of values = 5. Average = 80 ÷ 5 = <b>16</b>.' }),

  makeNum({ id:'g6m-pct-004', chapterId:'g6-ratio-pct', difficulty:2,
    question:'The average of five numbers is 30. Four of the numbers are 25, 35, 28 and 32. What is the <b>fifth number</b>?',
    answer:'30', acceptableAnswers:['30'],
    hint:'Total sum = average × 5 = 150. Subtract the four known numbers.',
    explanation:'Total sum = 30 × 5 = 150. Sum of four numbers = 25+35+28+32 = 120. Fifth number = 150 − 120 = <b>30</b>.' }),

  makeNum({ id:'g6m-pct-005', chapterId:'g6-ratio-pct', difficulty:1,
    question:'What is <b>25%</b> of Rs 800?',
    answer:'200', acceptableAnswers:['200','Rs 200'],
    hint:'25% = 25/100 = 1/4. Divide 800 by 4.',
    explanation:'25% of 800 = (25 ÷ 100) × 800 = 0.25 × 800 = <b>200</b>.' }),

  makeNum({ id:'g6m-pct-006', chapterId:'g6-ratio-pct', difficulty:2,
    question:'A shirt costs Rs 600. It is sold at a <b>20% discount</b>. What is the sale price?',
    answer:'480', acceptableAnswers:['480','Rs 480'],
    hint:'Discount amount = 20% of 600. Sale price = 600 − discount.',
    explanation:'Discount = 20% of Rs 600 = (20÷100) × 600 = Rs 120. Sale price = 600 − 120 = <b>Rs 480</b>.' }),

  makeNum({ id:'g6m-pct-007', chapterId:'g6-ratio-pct', difficulty:2,
    question:'A bag is bought for Rs 400 and sold for Rs 500. What is the PERCENTAGE PROFIT?',
    answer:'25', acceptableAnswers:['25','25%'],
    hint:'Profit = Selling price − Cost price. % profit = (profit ÷ cost price) × 100.',
    explanation:'Profit = 500 − 400 = Rs 100. Percentage profit = (100 ÷ 400) × 100 = <b>25%</b>.' }),

  makeMCQ({ id:'g6m-pct-008', chapterId:'g6-ratio-pct', difficulty:2,
    question:'In a class, 18 out of 30 students are girls. What percentage of the class are girls?',
    options:['18%','30%','60%','40%'],
    answer:'60%',
    hint:'Percentage = (part ÷ whole) × 100. Part = 18, whole = 30.',
    explanation:'Percentage = (18 ÷ 30) × 100 = 0.6 × 100 = <b>60%</b>.' }),

  makeNum({ id:'g6m-pct-009', chapterId:'g6-ratio-pct', difficulty:2,
    question:'Convert <b>3/4</b> to a percentage.',
    answer:'75', acceptableAnswers:['75','75%'],
    hint:'Divide 3 by 4, then multiply by 100.',
    explanation:'3 ÷ 4 = 0.75. 0.75 × 100 = <b>75%</b>.' }),

  makeNum({ id:'g6m-pct-010', chapterId:'g6-ratio-pct', difficulty:2,
    question:'Three friends share Rs 540 in the ratio 2 : 3 : 4. How much does the friend with the <b>smallest share</b> receive? (Rs)',
    answer:'120', acceptableAnswers:['120','Rs 120'],
    hint:'Total parts = 2+3+4 = 9. Each part = 540 ÷ 9 = 60. Smallest share = 2 × 60.',
    explanation:'Total parts = 9. Each part = Rs 540 ÷ 9 = Rs 60. Smallest share (2 parts) = 2 × 60 = <b>Rs 120</b>.' })

);
