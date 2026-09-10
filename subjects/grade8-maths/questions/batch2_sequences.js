'use strict';
// Grade 8 Mathematics - Sequences, batch 2 (items 012-019).
// Each item changes the TASK, not just the numbers: a missing middle term, a
// term-to-term rule that is not arithmetic, running a sequence backwards, a
// two-step rule, a decreasing nth term and an nth term solved in reverse.

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-sequences-012', chapterId: 'g8m-sequences', difficulty: 2,
    subsection: 'continuing_sequences',
    question: 'One term is missing from this sequence. What is it?<br><b>2, 9, ?, 23, 30</b>',
    options: ['16', '15', '17', '14'],
    answer: '16',
    hint: 'Look at the jump from 23 to 30 to find the step, then work back from 23.',
    explanation: 'The step is 30 &minus; 23 = 7, so the missing term is 23 &minus; 7 = 16. 15 and 17 come from guessing a step of 6 or 8, and 14 is halfway between 9 and 23, which only works when the step is even.'
  }),

  makeNum({
    id: 'g8m-sequences-013', chapterId: 'g8m-sequences', difficulty: 3,
    subsection: 'continuing_sequences',
    question: 'In this sequence each term is the <b>sum of the two terms before it</b>:<br><b>4, 7, 11, 18, 29, &hellip;</b><br>What is the next term?',
    answer: 47,
    hint: 'You need the last two terms, not the difference between them.',
    explanation: '18 + 29 = 47. There is no fixed step here: the differences are 3, 4, 7, 11, so adding a constant gives the wrong answer, and doubling 29 gives 58.'
  }),

  makeMCQ({
    id: 'g8m-sequences-014', chapterId: 'g8m-sequences', difficulty: 3,
    subsection: 'continuing_sequences',
    question: 'A sequence goes <b>down by 5</b> each time. Its 4th term is 26. What is its <b>1st</b> term?',
    options: ['41', '31', '46', '11'],
    answer: '41',
    hint: 'Going backwards along the sequence means adding 5, not subtracting it.',
    explanation: 'From the 4th term back to the 1st is three steps, so add 5 three times: 26 + 15 = 41. 31 adds only one step, 46 adds four, and 11 subtracts instead of adding.'
  }),

  makeMCQ({
    id: 'g8m-sequences-015', chapterId: 'g8m-sequences', difficulty: 2,
    subsection: 'sequence_rules',
    question: 'Which rule describes this sequence?<br><b>3, 6, 12, 24, 48, &hellip;</b>',
    options: ['Multiply by 2 each time', 'Add 3 each time', 'Multiply by 3 each time', 'Add the term number each time'],
    answer: 'Multiply by 2 each time',
    hint: 'Divide one term by the term before it and see whether you always get the same number.',
    explanation: '6 &divide; 3 = 2, 12 &divide; 6 = 2, 24 &divide; 12 = 2, so each term is doubled. Adding 3 would give 3, 6, 9; multiplying by 3 would give 3, 9, 27; and adding the term number gives 3, 5, 8.'
  }),

  makeNum({
    id: 'g8m-sequences-016', chapterId: 'g8m-sequences', difficulty: 3,
    subsection: 'sequence_rules',
    question: 'A sequence starts at <b>5</b> and the rule is &ldquo;<b>double it, then subtract 1</b>&rdquo;. What is the <b>5th</b> term?',
    answer: 65,
    hint: 'Apply the whole rule once to get each new term, and write every term down.',
    explanation: '5 &rarr; 9 &rarr; 17 &rarr; 33 &rarr; 65. Doubling alone would give 80; subtracting before doubling would give 8, 14, 26, 50.'
  }),

  makeMCQ({
    id: 'g8m-sequences-017', chapterId: 'g8m-sequences', difficulty: 4,
    subsection: 'sequence_rules',
    question: 'Square tables are pushed together in one long row in a school canteen. <b>One</b> table seats 4 pupils. Every <b>extra</b> table added to the row seats 2 more pupils, because two places are lost where the tables meet. How many pupils can sit at a row of <b>12</b> tables?',
    options: ['26', '24', '28', '48'],
    answer: '26',
    hint: 'The first table is different from the rest. How many EXTRA tables are added to it?',
    explanation: '1 table seats 4, then 11 extra tables add 2 each: 4 + 11 &times; 2 = 26. 24 uses 12 extra tables instead of 11, 28 counts the first table twice, and 48 is 12 &times; 4, which forgets that places are lost at every join.'
  }),

  makeMCQ({
    id: 'g8m-sequences-018', chapterId: 'g8m-sequences', difficulty: 3,
    subsection: 'nth_term',
    question: 'Find the <b>nth term</b> of this sequence:<br><b>20, 17, 14, 11, &hellip;</b>',
    options: ['23 &minus; 3n', '20 &minus; 3n', '3n + 23', '17 &minus; 3n'],
    answer: '23 &minus; 3n',
    hint: 'The terms go down by 3, so the rule contains &minus;3n. Test your rule with n = 1.',
    explanation: 'With &minus;3n, putting n = 1 gives &minus;3, and the first term is 20, so add 23: 23 &minus; 3n. 20 &minus; 3n gives 17 as the first term, 3n + 23 increases instead of decreasing, and 17 &minus; 3n gives 14.'
  }),

  makeNum({
    id: 'g8m-sequences-019', chapterId: 'g8m-sequences', difficulty: 3,
    subsection: 'nth_term',
    question: 'The nth term of a sequence is <b>n&sup2; + 2</b>. One term of this sequence is <b>123</b>. Which <b>term number</b> is it?',
    answer: 11,
    hint: 'Undo the rule: take the 2 off first, then undo the squaring.',
    explanation: '123 &minus; 2 = 121, and &radic;121 = 11, so it is the 11th term. Dividing 123 by 2 gives 61.5, and 123 &minus; 2 = 121 is the value of n&sup2;, not of n.'
  })

);
