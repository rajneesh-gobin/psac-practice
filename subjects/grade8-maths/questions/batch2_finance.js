'use strict';
// Grade 8 Mathematics - Personal & Household Finance, batch 2 (011-020).
// The simple-interest formula is turned round three ways (principal, time,
// total repayment), the profit items work back to a cost price and through a
// loss of stock, and the bills run a two-rate electricity tariff rather than a
// single price per unit. All money is in rupees, as on a Mauritian bill.

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8m-finance-011', chapterId: 'g8m-finance', difficulty: 3,
    subsection: 'simple_interest',
    question: 'A sum of money earns <b>Rs 900</b> simple interest in <b>3 years</b> at <b>5% per year</b>. What was the <b>principal</b>, in rupees?',
    answer: 6000,
    hint: 'Work out the interest for ONE year first, then ask what sum gives that at 5%.',
    explanation: 'Rs 900 over 3 years is Rs 300 a year, and Rs 300 is 5% of the principal, so 1% is Rs 60 and the principal is 100 &times; 60 = Rs 6,000. Dividing 900 by 5 gives 180, which is neither the interest nor the principal.'
  }),

  makeMCQ({
    id: 'g8m-finance-012', chapterId: 'g8m-finance', difficulty: 3,
    subsection: 'simple_interest',
    question: 'How long does <b>Rs 12,000</b> take to earn <b>Rs 1,800</b> simple interest at <b>5% per year</b>?',
    options: ['3 years', '2 years', '4 years', '5 years'],
    answer: '3 years',
    hint: 'How much interest does the money earn in a single year?',
    explanation: '5% of Rs 12,000 is Rs 600 a year, and 1,800 &divide; 600 = 3 years. 2 years would give Rs 1,200 and 4 years would give Rs 2,400.'
  }),

  makeNum({
    id: 'g8m-finance-013', chapterId: 'g8m-finance', difficulty: 4,
    subsection: 'simple_interest',
    question: 'Deepak borrows <b>Rs 21,600</b> at <b>10% simple interest per year</b> for <b>2 years</b>. He repays the whole amount in <b>24 equal monthly instalments</b>. How much is each instalment, in rupees?',
    answer: 1080,
    hint: 'Three steps: the interest, then the total he owes, then the share for one month.',
    explanation: 'Interest = 21,600 &times; 10% &times; 2 = Rs 4,320, so he repays 21,600 + 4,320 = Rs 25,920, and 25,920 &divide; 24 = Rs 1,080 a month. Dividing only the loan gives Rs 900 and leaves the interest unpaid.'
  }),

  makeMCQ({
    id: 'g8m-finance-014', chapterId: 'g8m-finance', difficulty: 2,
    subsection: 'profit_loss_discount',
    question: 'A trader sells a bicycle for <b>Rs 4,800</b> and makes a <b>20% profit</b>. What did the bicycle <b>cost</b> him?',
    options: ['Rs 4,000', 'Rs 3,840', 'Rs 4,200', 'Rs 3,600'],
    answer: 'Rs 4,000',
    hint: 'The profit is a percentage of the COST price, so the selling price is 120% of the cost.',
    explanation: 'Rs 4,800 is 120% of the cost, so 1% is 4,800 &divide; 120 = Rs 40 and the cost is Rs 4,000. Rs 3,840 comes from taking 20% off the selling price, which is a different calculation.'
  }),

  makeNum({
    id: 'g8m-finance-015', chapterId: 'g8m-finance', difficulty: 3,
    subsection: 'profit_loss_discount',
    question: 'A shirt marked at <b>Rs 1,200</b> is reduced by <b>25%</b> in a sale, and then a further <b>Rs 50</b> is taken off at the till. What is the <b>final price</b>, in rupees?',
    answer: 850,
    hint: 'Take the percentage off first, then the fixed amount off the new price.',
    explanation: '25% of 1,200 is Rs 300, leaving Rs 900, and 900 &minus; 50 = Rs 850. Taking the Rs 50 off first gives 1,150 then 862.50 &mdash; the order matters when one reduction is a percentage.'
  }),

  makeMCQ({
    id: 'g8m-finance-016', chapterId: 'g8m-finance', difficulty: 3,
    subsection: 'profit_loss_discount',
    question: 'A restaurant meal costs <b>Rs 640</b> before VAT. VAT is charged at <b>15%</b>. What is the <b>total to pay</b>?',
    options: ['Rs 736', 'Rs 656', 'Rs 704', 'Rs 725'],
    answer: 'Rs 736',
    hint: 'VAT is added on top, so the bill is 115% of the price before VAT.',
    explanation: '15% of 640 is Rs 96, so the total is 640 + 96 = Rs 736. Rs 656 adds Rs 16 (a tenth of the VAT), and Rs 704 adds only 10%.'
  }),

  makeMCQ({
    id: 'g8m-finance-017', chapterId: 'g8m-finance', difficulty: 4,
    subsection: 'profit_loss_discount',
    question: 'A market seller buys <b>40 kg</b> of mangoes at <b>Rs 60 per kg</b>. <b>5 kg</b> spoil and are thrown away. He sells the rest at <b>Rs 85 per kg</b>. What is his <b>profit</b>?',
    options: ['Rs 575', 'Rs 1,000', 'Rs 500', 'Rs 875'],
    answer: 'Rs 575',
    hint: 'He pays for all 40 kg but only earns money on the mangoes he can sell.',
    explanation: 'Cost = 40 &times; 60 = Rs 2,400. He sells 35 kg at Rs 85, earning Rs 2,975, so the profit is 2,975 &minus; 2,400 = Rs 575. Rs 1,000 comes from selling all 40 kg, forgetting the spoilage.'
  }),

  makeMCQ({
    id: 'g8m-finance-018', chapterId: 'g8m-finance', difficulty: 2,
    subsection: 'bills_budgeting',
    question: 'A water bill shows a <b>fixed charge of Rs 90</b>, then <b>24 m&sup3;</b> of water used, and a total of <b>Rs 570</b>. What is the charge <b>per m&sup3;</b>?',
    options: ['Rs 20 per m&sup3;', 'Rs 24 per m&sup3;', 'Rs 18 per m&sup3;', 'Rs 25 per m&sup3;'],
    answer: 'Rs 20 per m&sup3;',
    hint: 'Take the fixed charge off the total before you divide by the water used.',
    explanation: '570 &minus; 90 = Rs 480 is paid for the water itself, and 480 &divide; 24 = Rs 20 per m&sup3;. Dividing the whole Rs 570 by 24 gives Rs 23.75, which counts the fixed charge as if it were water.'
  }),

  makeNum({
    id: 'g8m-finance-019', chapterId: 'g8m-finance', difficulty: 3,
    subsection: 'bills_budgeting',
    question: 'An electricity tariff charges <b>Rs 4 per unit for the first 100 units</b>, and <b>Rs 7 per unit</b> for every unit after that. A household uses <b>250 units</b> in a month. What is the bill, in rupees?',
    answer: 1450,
    hint: 'Split the 250 units into the first 100 and the rest, and price the two parts separately.',
    explanation: 'First 100 units: 100 &times; 4 = Rs 400. The remaining 150 units: 150 &times; 7 = Rs 1,050. Total = Rs 1,450. Charging all 250 units at Rs 7 gives Rs 1,750, which ignores the cheaper first band.'
  }),

  makeNum({
    id: 'g8m-finance-020', chapterId: 'g8m-finance', difficulty: 4,
    subsection: 'bills_budgeting',
    question: 'Mrs Appadoo earns <b>Rs 26,000</b> a month. She pays <b>Rs 7,800</b> in rent, spends <b>30%</b> of her salary on food and <b>Rs 2,400</b> on transport. How much is <b>left over</b>, in rupees?',
    answer: 8000,
    hint: 'One of the three costs is a percentage &mdash; turn it into rupees before you add anything up.',
    explanation: 'Food is 30% of 26,000 = Rs 7,800, so the costs are 7,800 + 7,800 + 2,400 = Rs 18,000, leaving 26,000 &minus; 18,000 = Rs 8,000. Treating the 30% as Rs 30 or subtracting percentages from rupees gives nonsense.'
  })

);
