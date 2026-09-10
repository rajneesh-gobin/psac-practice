'use strict';
// Grade 7 Maths — Money (g7m-money), batch 2B
// IDs: g7m-money-009 … -020

(function () {

STATIC_QUESTIONS.push(

  makeNum({ id:'g7m-money-009', chapterId:'g7m-money', difficulty:3,
    subsection:'money_operations',
    question:'At the market, onions cost Rs 45 per kg and tomatoes Rs 60 per kg. Mrs Jhugroo buys 3 kg of onions and 2 kg of tomatoes. How much does she pay, in rupees?',
    answer:255,
    hint:'Work out the cost of each vegetable separately before adding.',
    explanation:'Onions: 3 × 45 = Rs 135. Tomatoes: 2 × 60 = Rs 120. Total = <b>Rs 255</b>. Adding 45 + 60 first and multiplying by 5 gives Rs 525, which charges the wrong price for both.' }),

  makeMCQ({ id:'g7m-money-010', chapterId:'g7m-money', difficulty:4,
    subsection:'money_operations',
    question:'Devi buys 4 exercise books at Rs 35 each and one geometry set at Rs 120. She pays with a Rs 500 note. How much change does she receive?',
    options:['Rs 240','Rs 200','Rs 260','Rs 345'],
    answer:'Rs 240',
    hint:'Find the total spent first — the geometry set is one item, not four.',
    explanation:'The books cost 4 × 35 = Rs 140, plus Rs 120 makes Rs 260, so the change is 500 − 260 = <b>Rs 240</b>. Rs 260 is the amount spent, not the change, and Rs 345 charges for only one book.' }),

  makeNum({ id:'g7m-money-011', chapterId:'g7m-money', difficulty:4,
    subsection:'money_operations',
    question:'A family has a monthly budget of Rs 12,000. They spend 40% of it on food and a further Rs 2,500 on transport. How many rupees are left?',
    answer:4700,
    hint:'A percentage and a fixed amount cannot be subtracted in the same step — turn the 40% into rupees first.',
    explanation:'Food is 40% of 12,000 = Rs 4,800, so 12,000 − 4,800 − 2,500 = <b>Rs 4,700</b>. Treating the Rs 2,500 as a percentage, or forgetting it altogether, gives Rs 7,200.' }),

  makeMCQ({ id:'g7m-money-012', chapterId:'g7m-money', difficulty:2,
    subsection:'money_operations',
    question:'A shop takes Rs 5 off the price of every item during a sale. Sara buys 6 items, each priced Rs 48 before the sale. What does she pay?',
    options:['Rs 258','Rs 240','Rs 283','Rs 288'],
    answer:'Rs 258',
    hint:'The Rs 5 comes off each item, not off the bill once.',
    explanation:'Each item costs 48 − 5 = Rs 43, so 6 × 43 = <b>Rs 258</b>. Taking Rs 5 off the total only gives Rs 283, and Rs 288 is the price with no discount at all.' }),

  makeNum({ id:'g7m-money-013', chapterId:'g7m-money', difficulty:2,
    subsection:'profit_loss',
    question:'A trader buys an item for Rs 250 and sells it for Rs 310. What is the profit as a <b>percentage</b> of the cost price?',
    answer:24,
    hint:'Find the profit in rupees first, then compare it with the COST price.',
    explanation:'Profit = 310 − 250 = Rs 60, and 60 ÷ 250 × 100 = <b>24%</b>. Comparing the profit with the selling price instead gives about 19%, but profit percentage is always worked out on the cost price.' }),

  makeMCQ({ id:'g7m-money-014', chapterId:'g7m-money', difficulty:3,
    subsection:'profit_loss',
    question:'An article is sold for Rs 690, giving the shopkeeper a profit of 15%. What was the cost price?',
    options:['Rs 600','Rs 575','Rs 625','Rs 660'],
    answer:'Rs 600',
    hint:'The selling price is 115% of the cost price, not 100%.',
    explanation:'Rs 690 represents 115% of the cost, so the cost is 690 ÷ 1.15 = <b>Rs 600</b>. Taking 15% off Rs 690 gives Rs 586.50, because that works out 15% of the wrong amount.' }),

  makeNum({ id:'g7m-money-015', chapterId:'g7m-money', difficulty:4,
    subsection:'profit_loss',
    question:'A trader buys 20 mangoes for Rs 300 altogether and sells them at Rs 20 each. What is his total profit, in rupees?',
    answer:100,
    hint:'Work out what he takes in from selling all 20 before you compare it with what he paid.',
    explanation:'He takes in 20 × 20 = Rs 400 and paid Rs 300, so the profit is <b>Rs 100</b>. Answering Rs 20 compares one mango’s selling price with nothing, and Rs 5 is the profit on a single mango (Rs 20 − Rs 15).' }),

  makeMCQ({ id:'g7m-money-016', chapterId:'g7m-money', difficulty:2,
    subsection:'profit_loss',
    question:'A shopkeeper makes a <b>loss</b> on an item when …',
    options:['the selling price is below the cost price','the selling price is above the cost price','the cost price is below the discount','the profit is greater than the cost price'],
    answer:'the selling price is below the cost price',
    hint:'A loss means less money comes back than went out.',
    explanation:'A loss happens when <b>the selling price is below the cost price</b> — the shopkeeper gets back less than was paid. Selling above the cost price is a profit, and the other two statements compare quantities that have nothing to do with a loss.' }),

  makeNum({ id:'g7m-money-017', chapterId:'g7m-money', difficulty:3,
    subsection:'currency',
    question:'A bank uses the rate 1 pound sterling = Rs 58. How many rupees does a tourist receive for £250?',
    answer:14500,
    hint:'Each pound is worth 58 rupees, so decide whether the rupee amount should be larger or smaller.',
    explanation:'250 × 58 = <b>Rs 14,500</b>. Dividing instead would give about £4.31, an amount far smaller than the £250 handed over, which shows the operation was the wrong way round.' }),

  makeMCQ({ id:'g7m-money-018', chapterId:'g7m-money', difficulty:3,
    subsection:'currency',
    question:'A tourist changes Rs 9,000 and receives €180. What exchange rate did the bank use?',
    options:['Rs 50 per euro','Rs 45 per euro','Rs 55 per euro','Rs 60 per euro'],
    answer:'Rs 50 per euro',
    hint:'The rate tells you how many rupees make one euro. Share the rupees between the euros.',
    explanation:'9,000 ÷ 180 = <b>Rs 50 per euro</b>. Check it: 180 × 50 = Rs 9,000. The other rates would have given 200, about 164 and 150 euros instead.' }),

  makeMCQ({ id:'g7m-money-019', chapterId:'g7m-money', difficulty:4,
    subsection:'currency',
    question:'A phone costs $220 in the United States, where 1 US dollar = Rs 46. The same phone costs Rs 11,500 in Mauritius. Which is cheaper, and by how much?',
    options:['the US price, by Rs 1,380','the US price, by Rs 1,150','the Mauritian price, by Rs 1,380','the Mauritian price, by Rs 2,200'],
    answer:'the US price, by Rs 1,380',
    hint:'You cannot compare dollars with rupees — put both prices into the same currency first.',
    explanation:'220 × 46 = Rs 10,120, which is less than Rs 11,500, so <b>the US price is cheaper by Rs 1,380</b>. Comparing 220 with 11,500 directly makes the US price look far cheaper than it really is.' }),

  makeNum({ id:'g7m-money-020', chapterId:'g7m-money', difficulty:4,
    subsection:'currency',
    question:'Before a trip, Ravi changes Rs 24,000 into euros at Rs 48 per euro. He spends €350 and changes the rest back at Rs 46 per euro. How many rupees does he get back?',
    answer:6900,
    hint:'Three steps: rupees to euros, euros spent, then euros back to rupees at the NEW rate.',
    explanation:'24,000 ÷ 48 = €500; after spending €350 he has €150 left; 150 × 46 = <b>Rs 6,900</b>. Changing back at Rs 48 would give Rs 7,200 — the two rates are deliberately different, which is how a bank makes its money.' })

);

})();
