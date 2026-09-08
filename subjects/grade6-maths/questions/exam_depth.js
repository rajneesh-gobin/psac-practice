'use strict';
// Grade 6 Maths - depth for Ratio, Average & Percentage.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2023 and 2024 papers (see the block above
// `chapters:` in _manifest.js). Ratio, Average & Percentage is the biggest
// single topic in the paper at 16.5% of the marks - currency, discount, profit
// and average between them fill much of Section B - so it supplies 7 questions
// of every 40-question exam from a pool of 67. That is nine exams before a
// repeat is forced; these take it past ten.
//
// ⚠ Difficulty 4 in a maths pack means a multi-step WORD PROBLEM, not merely a
//   harder sum. That is the one pack where the L4 rule in CLAUDE.md applies as
//   written.

(function () {
  let n = 0;
  const q = (subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6m-dep-${String(n).padStart(3, '0')}`,
      chapterId: 'g6-ratio-pct', subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  q('average', 3, 'Kiran scored 68, 74 and 80 in three tests. What is his average mark?',
    ['74', '72', '76', '78'],
    'Add the three marks, then divide by 3.',
    '68 + 74 + 80 = 222, and 222 &divide; 3 = <b>74</b>.');
  q('profit_loss', 4, 'A trader buys a bag for Rs 800 and sells it for Rs 920. What is his percentage profit?',
    ['15%', '12%', '20%', '25%'],
    'Find the profit first, then compare it with the cost price.',
    'Profit = 920 &minus; 800 = Rs 120. Percentage profit = 120 &divide; 800 &times; 100 = <b>15%</b>.');
  q('increase', 4, 'The price of a fan rose by 20% to Rs 1800. What was the original price?',
    ['Rs 1500', 'Rs 1440', 'Rs 1600', 'Rs 1350'],
    'Rs 1800 stands for 120% of the old price.',
    '120% = 1800, so 1% = 15 and 100% = <b>Rs 1500</b>. Taking 20% off 1800 would give the wrong answer.');

})();
