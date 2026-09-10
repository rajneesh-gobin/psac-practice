'use strict';
// Grade 8 Mathematics - Algebraic Expressions, batch 2 (012-020).
// The first eleven items expand or factorise a single bracket. These add double
// brackets, a constant term rather than a coefficient, factorising to a COMMON
// BRACKET, a partly-factorised expression to reject, adding algebraic fractions
// with different denominators, cancelling a whole bracket, and one expression
// simplified and then evaluated.

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-algebra-012', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'expanding_brackets',
    question: 'Expand and simplify: <b>(x + 3)(x + 5)</b>',
    options: ['x&sup2; + 8x + 15', 'x&sup2; + 15x + 8', 'x&sup2; + 8x + 8', 'x&sup2; + 2x + 15'],
    answer: 'x&sup2; + 8x + 15',
    hint: 'Every term in the first bracket must multiply every term in the second &mdash; four products in all.',
    explanation: 'x&times;x = x&sup2;, x&times;5 = 5x, 3&times;x = 3x and 3&times;5 = 15, so x&sup2; + 8x + 15. x&sup2; + 15x + 8 swaps the two numbers over, x&sup2; + 8x + 8 adds 3 and 5 instead of multiplying them, and x&sup2; + 2x + 15 subtracts them.'
  }),

  makeNum({
    id: 'g8m-algebra-013', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'expanding_brackets',
    question: 'Expand and simplify <b>5(2x &minus; 3) &minus; 4(x &minus; 7)</b>. What is the <b>constant term</b> of your answer?',
    answer: 13,
    hint: 'The minus sign in front of the second bracket multiplies BOTH terms inside it.',
    explanation: '5(2x &minus; 3) = 10x &minus; 15 and &minus;4(x &minus; 7) = &minus;4x + 28, giving 6x + 13, so the constant term is 13. Answering &minus;43 comes from writing &minus;28 instead of +28, which is the commonest slip here.'
  }),

  makeMCQ({
    id: 'g8m-algebra-014', chapterId: 'g8m-algebra', difficulty: 4,
    subsection: 'expanding_brackets',
    question: 'A rectangle has length <b>(x + 4) cm</b> and width <b>3 cm</b>. Its <b>perimeter</b> is <b>26 cm</b>. What is the value of <b>x</b>?',
    options: ['6', '5', '9', '4'],
    answer: '6',
    hint: 'Write the perimeter as 2(length + width) first, then expand and solve.',
    explanation: 'Perimeter = 2(x + 4 + 3) = 2x + 14, so 2x + 14 = 26, 2x = 12 and x = 6. Answering 9 solves x + 4 + 3 = 16 and uses only one length and one width; answering 5 forgets to double the width.'
  }),

  makeMCQ({
    id: 'g8m-algebra-015', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'factorising',
    question: 'Factorise <b>completely</b>: <b>18x&sup2;y &minus; 12xy&sup2;</b>',
    options: ['6xy(3x &minus; 2y)', '3xy(6x &minus; 4y)', '2xy(9x &minus; 6y)', '6x(3xy &minus; 2y)'],
    answer: '6xy(3x &minus; 2y)',
    hint: 'Take out the biggest number that divides both, and every letter that appears in both terms.',
    explanation: 'The highest common factor is 6xy, leaving 3x &minus; 2y. The other three all multiply back correctly but are not COMPLETE: 3xy(6x &minus; 4y) and 2xy(9x &minus; 6y) leave a factor of 2 inside the bracket, and 6x(3xy &minus; 2y) leaves a y behind.'
  }),

  makeNum({
    id: 'g8m-algebra-016', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'factorising',
    question: '<b>24a + 36</b> is factorised completely and written as <b>k(2a + 3)</b>. What is the value of <b>k</b>?',
    answer: 12,
    hint: 'Compare the 36 in the original with the 3 inside the bracket.',
    explanation: '12 &times; 2a = 24a and 12 &times; 3 = 36, so k = 12. Answering 6 gives 6(2a + 3) = 12a + 18, which is only half of the original expression.'
  }),

  makeMCQ({
    id: 'g8m-algebra-017', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'factorising',
    question: 'Factorise: <b>5(x + 2) + y(x + 2)</b>',
    options: ['(x + 2)(5 + y)', '(x + 2)(5y)', '(x + 5)(y + 2)', '5y(x + 2)'],
    answer: '(x + 2)(5 + y)',
    hint: 'The common factor does not have to be a number or a letter &mdash; here it is a whole bracket.',
    explanation: 'Both terms contain (x + 2), so take it out: (x + 2)(5 + y). The 5 and the y are ADDED, not multiplied, so (x + 2)(5y) and 5y(x + 2) are both wrong, and (x + 5)(y + 2) shuffles the numbers between the brackets.'
  }),

  makeMCQ({
    id: 'g8m-algebra-018', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'algebraic_fractions',
    question: 'Simplify: <b>x/3 + x/4</b>',
    options: ['7x/12', '2x/12', '2x/7', 'x&sup2;/12'],
    answer: '7x/12',
    hint: 'You cannot add the tops until the bottoms match. What is the lowest common denominator of 3 and 4?',
    explanation: 'Over 12 the fractions are 4x/12 and 3x/12, which add to 7x/12. 2x/7 adds the tops and the bottoms separately, which is never allowed, and x&sup2;/12 multiplies the fractions instead of adding them.'
  }),

  makeMCQ({
    id: 'g8m-algebra-019', chapterId: 'g8m-algebra', difficulty: 3,
    subsection: 'algebraic_fractions',
    question: 'Simplify fully: <b>(4x + 8) / (x + 2)</b>',
    options: ['4', '4x', 'x + 4', '4x + 8'],
    answer: '4',
    hint: 'Factorise the top before you cancel anything. You may only cancel a whole bracket.',
    explanation: '4x + 8 = 4(x + 2), so the (x + 2) on the top and bottom cancel and just 4 is left. Cancelling the 8 with the 2, or the x with the 4x, cancels part of a sum, which changes the value.'
  }),

  makeNum({
    id: 'g8m-algebra-020', chapterId: 'g8m-algebra', difficulty: 4,
    subsection: 'algebraic_fractions',
    question: 'Simplify <b>(6x&sup2;y) / (9xy&sup2;)</b> as far as possible, then find its <b>value</b> when <b>x = 6</b> and <b>y = 2</b>.',
    answer: 2,
    hint: 'Cancel the number part and each letter separately first &mdash; the numbers will be much smaller afterwards.',
    explanation: '6/9 cancels to 2/3, x&sup2;/x leaves x and y/y&sup2; leaves 1/y, so the expression is 2x/(3y). Putting x = 6 and y = 2 gives 12 &divide; 6 = 2. Substituting before simplifying works too but means handling 432 &divide; 216.'
  })

);
