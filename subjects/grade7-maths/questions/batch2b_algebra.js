'use strict';
// Grade 7 Maths — Algebraic Expressions (g7m-algebra), batch 2B
// IDs: g7m-algebra-009 … -020

(function () {

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-algebra-009', chapterId:'g7m-algebra', difficulty:2,
    subsection:'writing_expressions',
    question:'Which expression means “divide n by 4, then add 3”?',
    options:['(n ÷ 4) + 3','(n + 3) ÷ 4','4 ÷ (n + 3)','(n ÷ 3) + 4'],
    answer:'(n ÷ 4) + 3',
    hint:'Do the operations in the order the sentence gives them.',
    explanation:'The dividing happens first, so the answer is <b>(n ÷ 4) + 3</b>. (n + 3) ÷ 4 adds first and divides afterwards, and (n &divide; 3) + 4 swaps the 3 and the 4 around.' }),

  makeMCQ({ id:'g7m-algebra-010', chapterId:'g7m-algebra', difficulty:3,
    subsection:'writing_expressions',
    question:'A rectangle has width <i>w</i> cm and its length is 3 cm more than its width. Write an expression for its perimeter.',
    options:['4w + 6','2w + 6','4w + 3','2w + 3'],
    answer:'4w + 6',
    hint:'The perimeter uses two widths AND two lengths.',
    explanation:'The length is w + 3, so the perimeter is 2w + 2(w + 3) = <b>4w + 6</b>. 2w + 3 is only one width and one length, and 4w + 3 adds the extra 3 once instead of twice.' }),

  makeMCQ({ id:'g7m-algebra-011', chapterId:'g7m-algebra', difficulty:3,
    subsection:'writing_expressions',
    question:'A taxi charges a fixed Rs 40, plus Rs 25 for every kilometre travelled. Write an expression for the cost of a journey of <i>d</i> kilometres.',
    options:['40 + 25d','25 + 40d','(40 + 25)d','40d + 25d'],
    answer:'40 + 25d',
    hint:'Only one of the two charges depends on the distance.',
    explanation:'The Rs 40 is paid once whatever the distance, and the Rs 25 is paid for each kilometre, so the cost is <b>40 + 25d</b>. (40 + 25)d charges the fixed amount for every kilometre as well.' }),

  makeMCQ({ id:'g7m-algebra-012', chapterId:'g7m-algebra', difficulty:2,
    subsection:'writing_expressions',
    question:'In words, the expression 5n − 2 means …',
    options:['2 less than five times a number','5 less than twice a number','two times a number, less 5','five times a number, plus 2'],
    answer:'2 less than five times a number',
    hint:'Read the expression from left to right: what is done to n first?',
    explanation:'n is multiplied by 5 and then 2 is taken away, so it is <b>2 less than five times a number</b>. “5 less than twice a number” is 2n − 5, which uses the same digits in the opposite roles.' }),

  makeMCQ({ id:'g7m-algebra-013', chapterId:'g7m-algebra', difficulty:2,
    subsection:'simplifying',
    question:'Simplify: 7a + 4b − 3a − 6b',
    options:['4a − 2b','4a + 2b','10a − 2b','2a − 4b'],
    answer:'4a − 2b',
    hint:'Collect the a terms together and the b terms together — they cannot be mixed.',
    explanation:'7a − 3a = 4a and 4b − 6b = −2b, giving <b>4a − 2b</b>. 10a comes from adding the a terms instead of subtracting, and 2a − 4b swaps the two answers around.' }),

  makeMCQ({ id:'g7m-algebra-014', chapterId:'g7m-algebra', difficulty:3,
    subsection:'simplifying',
    question:'Simplify: 2(3x + 4) + 5x',
    options:['11x + 8','11x + 4','6x + 9','10x + 8'],
    answer:'11x + 8',
    hint:'Multiply everything inside the bracket by 2 before you collect like terms.',
    explanation:'2(3x + 4) = 6x + 8, then 6x + 5x = 11x, giving <b>11x + 8</b>. 11x + 4 forgets to multiply the 4 by 2, and 6x + 9 leaves the 5x out altogether.' }),

  makeNum({ id:'g7m-algebra-015', chapterId:'g7m-algebra', difficulty:2,
    subsection:'simplifying',
    question:'Simplify 8m − 3m + 2m. How many <i>m</i> are there in the answer?',
    answer:7,
    hint:'Work from left to right, keeping the sign in front of each term.',
    explanation:'8 − 3 + 2 = <b>7</b>, so the expression simplifies to 7m. Doing 8 − (3 + 2) gives 3, which treats the + 2m as though it were being subtracted too.' }),

  makeMCQ({ id:'g7m-algebra-016', chapterId:'g7m-algebra', difficulty:2,
    subsection:'simplifying',
    question:'A pupil simplified 4x + 3 to 7x. What is wrong with this?',
    options:['4x and 3 are not like terms','4x and 3 are both like terms','the answer should be 12x','x must be equal to 1'],
    answer:'4x and 3 are not like terms',
    hint:'Try x = 2 in both expressions and see whether they agree.',
    explanation:'<b>4x and 3 are not like terms</b>, so they cannot be added — 4x + 3 is already as simple as it gets. With x = 2 the original gives 11 while 7x gives 14, which proves they are not the same expression.' }),

  makeNum({ id:'g7m-algebra-017', chapterId:'g7m-algebra', difficulty:2,
    subsection:'substitution',
    question:'If x = 5, find the value of 3x − 7.',
    answer:8,
    hint:'3x means 3 × x. Replace x before you do anything else.',
    explanation:'3 × 5 = 15, and 15 − 7 = <b>8</b>. Writing 35 − 7 = 28 treats 3x as the digits 3 and 5 side by side rather than a multiplication.' }),

  makeNum({ id:'g7m-algebra-018', chapterId:'g7m-algebra', difficulty:3,
    subsection:'substitution',
    question:'If a = −2 and b = 6, find the value of 5a + b ÷ 2.',
    answer:-7,
    hint:'Division comes before addition, and multiplying by a negative number gives a negative result.',
    explanation:'5 × (−2) = −10 and 6 ÷ 2 = 3, so the value is −10 + 3 = <b>−7</b>. Adding 5a and b first and then dividing gives −2, which breaks the order of operations.' }),

  makeMCQ({ id:'g7m-algebra-019', chapterId:'g7m-algebra', difficulty:3,
    subsection:'substitution',
    question:'Temperatures convert with the formula C = 5(F − 32) ÷ 9. Find C when F = 77.',
    options:['25','30','20','45'],
    answer:'25',
    hint:'The bracket must be worked out first, before any multiplying or dividing.',
    explanation:'77 − 32 = 45, then 5 × 45 = 225 and 225 ÷ 9 = <b>25</b>. Answering 45 stops at the bracket, and forgetting the bracket entirely gives a much larger number.' }),

  makeNum({ id:'g7m-algebra-020', chapterId:'g7m-algebra', difficulty:4,
    subsection:'substitution',
    question:'The cost in rupees of hiring a hall is given by C = 2000 + 150n, where n is the number of guests. A club has Rs 6,500 to spend. What is the greatest number of guests it can invite?',
    answer:30,
    hint:'Take the fixed charge out of the budget first, then see how many guests the rest pays for.',
    explanation:'6,500 − 2,000 = Rs 4,500 left for guests, and 4,500 ÷ 150 = <b>30 guests</b>. Dividing 6,500 by 150 straight away gives about 43, which forgets that the Rs 2,000 hire charge must be paid first.' })

);

})();
