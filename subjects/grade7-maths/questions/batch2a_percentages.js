'use strict';
// Grade 7 Maths — g7m-percentages, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-percentages-012', chapterId:'g7m-percentages', difficulty:1,
    subsection:'percent_basics',
    question:'What is 3/5 written as a percentage?',
    options:['60%','35%','53%','30%'],
    answer:'60%',
    hint:'Change the fraction so that its denominator is 100.',
    explanation:'3/5 = 60/100 = 60%, because multiplying both parts by 20 keeps the fraction the same. 35% and 53% simply reuse the digits 3 and 5, and 30% comes from multiplying 3 by 10 instead of 20.' }),

  makeMCQ({ id:'g7m-percentages-013', chapterId:'g7m-percentages', difficulty:2,
    subsection:'percent_basics',
    question:'Which of these amounts is the SMALLEST?',
    options:['0.4','45%','1/2','9/20'],
    answer:'0.4',
    hint:'Write every one of them as a decimal before you compare.',
    explanation:'0.4 is the smallest: 45% = 0.45, 1/2 = 0.5 and 9/20 = 0.45 as well. A number with fewer digits after the point is not automatically smaller — 0.4 wins here on value, not on length.' }),

  makeNum({ id:'g7m-percentages-014', chapterId:'g7m-percentages', difficulty:2,
    subsection:'percent_quantity',
    question:'Increase 450 by 12%.',
    answer:504,
    hint:'Work out the extra 12% first, then put it back on top of the 450.',
    explanation:'1% of 450 is 4.5, so 12% is 12 × 4.5 = 54, and 450 + 54 = 504. Answering 54 stops at the increase itself, and 396 takes the 12% off instead of adding it on.' }),

  makeNum({ id:'g7m-percentages-015', chapterId:'g7m-percentages', difficulty:3,
    subsection:'percent_quantity',
    question:'35% of a number is 84. What is the number?',
    answer:240,
    hint:'If 35 parts are 84, first work out what ONE part is worth.',
    explanation:'84 ÷ 35 = 2.4, so 1% is 2.4 and the whole 100% is 2.4 × 100 = 240. Finding 35% of 84 instead gives 29.4 — a smaller number, when the answer here must be bigger than 84.' }),

  makeMCQ({ id:'g7m-percentages-016', chapterId:'g7m-percentages', difficulty:3,
    subsection:'percent_quantity',
    question:'Devi wants 15% of Rs 640 and starts by working out 640 ÷ 15. Which calculation should she do instead?',
    options:['Work out 640 × 15 ÷ 100','Work out 640 ÷ 15 × 100','Work out 640 ÷ 100 ÷ 15','Work out 15 ÷ 640 × 100'],
    answer:'Work out 640 × 15 ÷ 100',
    hint:'"Per cent" means "out of a hundred", so the 100 belongs underneath.',
    explanation:'15% of 640 is 640 × 15 ÷ 100 = Rs 96. The second and third options divide by 15 rather than multiply, and the last one finds what percentage 15 is OF 640, which is a completely different question.' }),

  makeNum({ id:'g7m-percentages-017', chapterId:'g7m-percentages', difficulty:2,
    subsection:'percent_quantity',
    question:'In a Grade 7 class of 45 pupils, 40% travel to school by bus. How many pupils travel by bus?',
    answer:18,
    hint:'10% of the class is easy to find first.',
    explanation:'10% of 45 is 4.5, so 40% is 4 × 4.5 = 18 pupils. Answering 27 gives the number who do NOT take the bus, which is the other 60%.' }),

  makeNum({ id:'g7m-percentages-018', chapterId:'g7m-percentages', difficulty:3,
    subsection:'percent_problems',
    question:'A bicycle bought for Rs 4 800 is later sold for Rs 5 400. What is the percentage profit? Type the number only.',
    answer:12.5,
    hint:'Profit percentage is always worked out on the price you PAID.',
    explanation:'The profit is 5 400 − 4 800 = Rs 600, and 600 ÷ 4 800 = 0.125 = 12.5%. Dividing the profit by the SELLING price gives about 11.1%, which is the usual slip — the cost price is the base.' }),

  makeNum({ id:'g7m-percentages-019', chapterId:'g7m-percentages', difficulty:4,
    subsection:'percent_problems',
    question:'A shop marks a ceiling fan at Rs 2 500. During a sale the shopkeeper takes 20% off, and then adds 15% VAT to the reduced price. How many rupees does the customer pay in the end?',
    answer:2300,
    hint:'Work in two stages, and remember the VAT is charged on the SALE price, not on Rs 2 500.',
    explanation:'20% off 2 500 leaves 2 500 − 500 = Rs 2 000. VAT of 15% on 2 000 is Rs 300, so the customer pays 2 000 + 300 = Rs 2 300. Cancelling the two percentages as "20 − 15 = 5% off" gives Rs 2 375, because the two percentages are taken of different amounts.' }),

  makeMCQ({ id:'g7m-percentages-020', chapterId:'g7m-percentages', difficulty:3,
    subsection:'percent_problems',
    question:'After a 10% increase, a bus fare is now Rs 33. What was the fare BEFORE the increase?',
    options:['Rs 30','Rs 29.70','Rs 23','Rs 36.30'],
    answer:'Rs 30',
    hint:'Rs 33 stands for 110% of the old fare, not 100% of it.',
    explanation:'110% is Rs 33, so 1% is Rs 0.30 and 100% is Rs 30. Check: 10% of 30 is 3, and 30 + 3 = 33. Taking 10% OFF 33 gives Rs 29.70, which is not the same thing, and Rs 36.30 adds another 10% on top.' })

);
