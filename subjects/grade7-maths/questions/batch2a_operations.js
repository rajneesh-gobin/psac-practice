'use strict';
// Grade 7 Maths — g7m-operations, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeNum({ id:'g7m-operations-012', chapterId:'g7m-operations', difficulty:2,
    subsection:'order_operations',
    question:'Evaluate: 60 ÷ 5 + 3 × 4',
    answer:24,
    hint:'There are no brackets, so deal with the ÷ and the × before the +.',
    explanation:'60 ÷ 5 = 12 and 3 × 4 = 12, so the sum becomes 12 + 12 = 24. Working strictly left to right instead gives 60 ÷ 5 = 12, 12 + 3 = 15, 15 × 4 = 60 — the classic slip.' }),

  makeMCQ({ id:'g7m-operations-013', chapterId:'g7m-operations', difficulty:3,
    subsection:'order_operations',
    question:'Nita worked out 18 − 6 ÷ 3 and wrote 4. What did she do wrong?',
    options:['She subtracted before dividing','She divided before subtracting','She added instead of subtracting','She multiplied before dividing'],
    answer:'She subtracted before dividing',
    hint:'Undo her answer: which pair of numbers must she have combined first to reach 4?',
    explanation:'She calculated (18 − 6) ÷ 3 = 4. Division outranks subtraction, so the correct route is 6 ÷ 3 = 2 first, then 18 − 2 = 16. Dividing first is exactly what she should have done, and there is no addition or multiplication anywhere in the expression.' }),

  makeNum({ id:'g7m-operations-014', chapterId:'g7m-operations', difficulty:3,
    subsection:'order_operations',
    question:'Evaluate: 2 × 3³ − 4 × 5',
    answer:34,
    hint:'Powers are settled before multiplication, and multiplication before subtraction.',
    explanation:'3³ = 27, so 2 × 27 = 54 and 4 × 5 = 20, giving 54 − 20 = 34. Reading 3³ as 3 × 3 = 9 gives 18 − 20, and treating 2 × 3 as the base gives 6³, both far from 34.' }),

  makeMCQ({ id:'g7m-operations-015', chapterId:'g7m-operations', difficulty:2,
    subsection:'brackets',
    question:'Where must brackets be placed in <b>12 − 4 × 2</b> so that the answer is 16?',
    options:['(12 − 4) × 2','12 − (4 × 2)','12 × (4 − 2)','(12 − 4 × 2)'],
    answer:'(12 − 4) × 2',
    hint:'Brackets change the answer only if they force a different operation to go first.',
    explanation:'(12 − 4) × 2 = 8 × 2 = 16. Bracketing 4 × 2 changes nothing, because multiplication already came first, so that gives 4. 12 × (4 − 2) = 24, and brackets round the whole expression leave it as 4.' }),

  makeNum({ id:'g7m-operations-016', chapterId:'g7m-operations', difficulty:3,
    subsection:'brackets',
    question:'Evaluate: 5 × [18 − (3 + 7)]',
    answer:40,
    hint:'Clear the round brackets first, then the square brackets, and only then multiply.',
    explanation:'3 + 7 = 10, then 18 − 10 = 8, then 5 × 8 = 40. Multiplying 5 by 18 before touching the brackets gives 90 − 10 = 80, which doubles the true answer.' }),

  makeNum({ id:'g7m-operations-017', chapterId:'g7m-operations', difficulty:4,
    subsection:'brackets',
    question:'A stationery shop in Rose Hill sells notebooks at Rs 45 each and pens at Rs 15 each. Mrs Appadoo buys 3 notebooks and 4 pens and hands over a Rs 500 note. How many rupees change does she receive?',
    answer:305,
    hint:'Find the total spent inside one bracket first, then take that bracket away from 500.',
    explanation:'The bill is (3 × 45) + (4 × 15) = 135 + 60 = Rs 195, so the change is 500 − 195 = Rs 305. Writing 500 − 3 × 45 + 4 × 15 without brackets ADDS the pens to the change and gives Rs 425.' }),

  makeMCQ({ id:'g7m-operations-018', chapterId:'g7m-operations', difficulty:2,
    subsection:'properties',
    question:'Which rewriting uses the COMMUTATIVE property to make 4 × 17 × 25 easier to work out mentally?',
    options:['4 × 25 × 17','4 × 17 + 25','(4 + 25) × 17','4 × (17 + 25)'],
    answer:'4 × 25 × 17',
    hint:'The commutative property lets you reorder factors without changing the product.',
    explanation:'Swapping the order gives 4 × 25 = 100 first, so the product is 100 × 17 = 1 700. The other three change a × into a +, which changes the value entirely — reordering is allowed, replacing an operation is not.' }),

  makeNum({ id:'g7m-operations-019', chapterId:'g7m-operations', difficulty:3,
    subsection:'properties',
    question:'Use the distributive property to work out <b>6 × 47 + 6 × 53</b> without a calculator.',
    answer:600,
    hint:'The same factor appears in both products. Take it outside a bracket.',
    explanation:'6 × 47 + 6 × 53 = 6 × (47 + 53) = 6 × 100 = 600. Adding 47 and 53 and then also adding the two sixes gives 112, which double-counts the shared factor.' }),

  makeMCQ({ id:'g7m-operations-020', chapterId:'g7m-operations', difficulty:3,
    subsection:'properties',
    question:'Which of these statements is NOT always true?',
    options:['20 ÷ 4 = 4 ÷ 20','20 + 4 = 4 + 20','20 × 4 = 4 × 20','20 + 0 = 0 + 20'],
    answer:'20 ÷ 4 = 4 ÷ 20',
    hint:'Addition and multiplication can be reordered freely. Can division?',
    explanation:'20 ÷ 4 = 5 but 4 ÷ 20 = 0.2, so division is not commutative. Addition and multiplication both are, which makes the other three true for any numbers you choose.' })

);
