'use strict';
// Grade 6 Maths - Chapter: Fractions (equivalent, simplify, add/subtract, mixed numbers)
// IDs format: g6m-frac-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-frac-001', chapterId:'g6-fractions', subsection:'equivalent', difficulty:1,
    question:'Which fraction is EQUIVALENT to 2/3?',
    options:['4/9','6/9','3/6','4/7'],
    answer:'6/9',
    hint:'Multiply both numerator and denominator of 2/3 by the same number.',
    explanation:'2/3 = 2×3 / 3×3 = <b>6/9</b>. Equivalent fractions are made by multiplying (or dividing) top and bottom by the same number.' }),

  makeMCQ({ id:'g6m-frac-002', chapterId:'g6-fractions', subsection:'equivalent', difficulty:1,
    question:'Simplify 18/24 to its LOWEST TERMS.',
    options:['9/12','6/8','3/4','2/3'],
    answer:'3/4',
    hint:'Find the HCF of 18 and 24, then divide both by it.',
    explanation:'HCF(18, 24) = 6. 18÷6 = 3, 24÷6 = 4. Simplified: <b>3/4</b>.' }),

  makeNum({ id:'g6m-frac-003', chapterId:'g6-fractions', subsection:'add_sub', difficulty:1,
    question:'Calculate: 3/8 + 2/8 (Write your answer as a fraction, e.g. 5/8)',
    answer:'5/8', acceptableAnswers:['5/8'],
    hint:'Same denominator - just add the numerators.',
    explanation:'When fractions have the same denominator: 3/8 + 2/8 = (3+2)/8 = <b>5/8</b>.' }),

  makeNum({ id:'g6m-frac-004', chapterId:'g6-fractions', subsection:'equivalent', difficulty:2,
    question:'Calculate: 1/2 + 1/3 (Simplify your answer if possible, e.g. 5/6)',
    answer:'5/6', acceptableAnswers:['5/6'],
    hint:'Find the LCM of 2 and 3, which is 6. Convert both fractions to sixths.',
    explanation:'LCM(2,3) = 6. 1/2 = 3/6. 1/3 = 2/6. Sum = 3/6 + 2/6 = <b>5/6</b>.' }),

  makeNum({ id:'g6m-frac-005', chapterId:'g6-fractions', subsection:'equivalent', difficulty:2,
    question:'Calculate: 3/4 − 1/6 (Write as a fraction in simplest form)',
    answer:'7/12', acceptableAnswers:['7/12'],
    hint:'LCM(4,6) = 12. Convert: 3/4 = 9/12, 1/6 = 2/12. Subtract.',
    explanation:'LCM(4,6) = 12. 3/4 = 9/12. 1/6 = 2/12. 9/12 − 2/12 = <b>7/12</b>.' }),

  makeMCQ({ id:'g6m-frac-006', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'Convert the mixed number 2 3/5 to an improper fraction.',
    options:['13/5','23/5','11/5','10/5'],
    answer:'13/5',
    hint:'Multiply the whole number by the denominator, then add the numerator: (2×5)+3 = 13.',
    explanation:'2 3/5 = (2 × 5 + 3) / 5 = <b>13/5</b>. To convert a mixed number: multiply whole part by denominator, add numerator, keep same denominator.' }),

  makeMCQ({ id:'g6m-frac-007', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'Convert the improper fraction 17/4 to a mixed number.',
    options:['4 1/4','4 3/4','3 1/4','4 2/4'],
    answer:'4 1/4',
    hint:'Divide 17 by 4. The quotient is the whole number, the remainder is the new numerator.',
    explanation:'17 ÷ 4 = 4 remainder 1. So 17/4 = <b>4 1/4</b>.' }),

  makeMCQ({ id:'g6m-frac-008', chapterId:'g6-fractions', subsection:'comparing', difficulty:2,
    question:'Which fraction is GREATER: 3/4 or 5/7?',
    options:['3/4','5/7','They are equal','Cannot be determined'],
    answer:'3/4',
    hint:'Convert both to the same denominator (LCM of 4 and 7 = 28). 3/4=21/28, 5/7=20/28.',
    explanation:'LCM(4,7)=28. 3/4 = 21/28. 5/7 = 20/28. Since 21/28 > 20/28, <b>3/4 is greater</b>.' }),

  makeNum({ id:'g6m-frac-009', chapterId:'g6-fractions', subsection:'fraction_of', difficulty:2,
    question:'John ate 1/4 of a pizza and Mary ate 3/8. What fraction of the pizza was eaten altogether?',
    answer:'5/8', acceptableAnswers:['5/8'],
    hint:'Add 1/4 + 3/8. Convert 1/4 to eighths first.',
    explanation:'1/4 = 2/8. 2/8 + 3/8 = <b>5/8</b> of the pizza was eaten.' }),

  makeNum({ id:'g6m-frac-010', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'A ribbon is 2 1/2 metres long. 3/4 of a metre is cut off. How many metres are left? (Write as a mixed number, e.g. 1 3/4)',
    answer:'1 3/4', acceptableAnswers:['1 3/4','7/4','1.75'],
    hint:'2 1/2 = 5/2 = 10/4. Subtract 3/4 from 10/4.',
    explanation:'2 1/2 = 10/4. 10/4 − 3/4 = 7/4 = <b>1 3/4 metres</b> remaining.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-frac-011', chapterId:'g6-fractions', subsection:'equivalent', difficulty:2,
    question:'Calculate: 2/3 × 3/4 (Write in simplest form)',
    answer:'1/2', acceptableAnswers:['1/2','2/4'],
    hint:'Multiply numerators together, denominators together. Then simplify.',
    explanation:'2/3 × 3/4 = (2×3)/(3×4) = 6/12 = <b>1/2</b>. Shortcut (cross-cancellation): 2/3 × 3/4 → cancel the 3s → 2/1 × 1/4 = 2/4 = 1/2. The MIE Grade 6 textbook introduces fraction × fraction in Part 1.' }),

  makeNum({ id:'g6m-frac-012', chapterId:'g6-fractions', subsection:'multiply_divide', difficulty:2,
    question:'Calculate: 3/4 ÷ 1/2 (Write as a whole number or fraction)',
    answer:'3/2', acceptableAnswers:['3/2','1 1/2','1.5'],
    hint:'To divide by a fraction, multiply by its RECIPROCAL: flip the second fraction.',
    explanation:'3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = <b>3/2 = 1 1/2</b>. Rule: Keep the first fraction, Change ÷ to ×, Flip the second fraction (reciprocal). "Keep, Change, Flip" is the MIE Grade 6 method.' }),

  makeNum({ id:'g6m-frac-013', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'Calculate: 2 1/4 × 2/3 (Write as a mixed number or fraction)',
    answer:'3/2', acceptableAnswers:['3/2','1 1/2','1.5'],
    hint:'Convert 2 1/4 to an improper fraction first: (2×4+1)/4 = 9/4. Then multiply.',
    explanation:'2 1/4 = 9/4. Then: 9/4 × 2/3 = 18/12 = 3/2 = <b>1 1/2</b>. Always convert mixed numbers to improper fractions before multiplying or dividing.' }),

  makeNum({ id:'g6m-frac-014', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'Calculate: 1 2/3 + 2 3/4 (Write as a mixed number, e.g. 4 5/12)',
    answer:'4 5/12', acceptableAnswers:['4 5/12','53/12'],
    hint:'Add the whole numbers. Then add the fractions using LCM(3,4)=12.',
    explanation:'Whole numbers: 1 + 2 = 3. Fractions: 2/3 + 3/4 = 8/12 + 9/12 = 17/12 = 1 5/12. Total: 3 + 1 5/12 = <b>4 5/12</b>.' }),

  makeNum({ id:'g6m-frac-015', chapterId:'g6-fractions', subsection:'proper_improper', difficulty:2,
    question:'Calculate: 3 1/2 − 1 3/4 (Write as a mixed number, e.g. 1 3/4)',
    answer:'1 3/4', acceptableAnswers:['1 3/4','7/4'],
    hint:'Convert to improper fractions: 3 1/2 = 7/2 = 14/4. Subtract 7/4.',
    explanation:'3 1/2 = 7/2 = 14/4. 1 3/4 = 7/4. 14/4 − 7/4 = 7/4 = <b>1 3/4</b>. Alternatively: borrow from 3: 2 + 1 1/2 = 2 + 6/4; subtract 1 3/4: (2−1) + (6/4 − 3/4) = 1 3/4.' }),

  makeMCQ({ id:'g6m-frac-016', chapterId:'g6-fractions', subsection:'add_sub', difficulty:2,
    question:'Convert 3/8 to a DECIMAL.',
    options:['0.38','0.375','0.83','0.3'],
    answer:'0.375',
    hint:'Divide the numerator by the denominator: 3 ÷ 8.',
    explanation:'3 ÷ 8 = <b>0.375</b>. Method: 3.000 ÷ 8: 30÷8=3 rem 6; 60÷8=7 rem 4; 40÷8=5. So 3/8 = 0.375. Common fractions to know: 1/4=0.25, 1/2=0.5, 3/4=0.75, 1/8=0.125, 3/8=0.375, 5/8=0.625, 7/8=0.875.' }),

  makeNum({ id:'g6m-frac-017', chapterId:'g6-fractions', subsection:'add_sub', difficulty:2,
    question:'A farm has 240 animals. 5/8 of them are cows. How many COWS are on the farm?',
    answer:'150', acceptableAnswers:['150'],
    hint:'Find 5/8 of 240: multiply 240 × 5/8, or find 1/8 first then multiply by 5.',
    explanation:'1/8 of 240 = 240 ÷ 8 = 30. 5/8 of 240 = 30 × 5 = <b>150 cows</b>. MIE Grade 6 method: always find the unit fraction (1/8) first, then multiply by the required number of parts (5).' }),

  makeMCQ({ id:'g6m-frac-018', chapterId:'g6-fractions', subsection:'comparing', difficulty:2,
    question:'Which is GREATER: 2/3 or 3/5?',
    options:['2/3','3/5','They are equal','Cannot be determined'],
    answer:'2/3',
    hint:'Find the LCM of 3 and 5 = 15. Convert both to fifteenths.',
    explanation:'LCM(3,5) = 15. 2/3 = 10/15. 3/5 = 9/15. Since 10/15 > 9/15, <b>2/3 is greater</b>. To compare fractions with different denominators, always convert to the same denominator first.' }),

  makeNum({ id:'g6m-frac-019', chapterId:'g6-fractions', subsection:'word_probs', difficulty:4,
    question:'Priya spent 1/4 of her pocket money on sweets and 2/5 on a book. What FRACTION of her money has she spent altogether? If she started with Rs 200, how much does she have LEFT? (Answer: remaining amount in Rs)',
    answer:'70', acceptableAnswers:['70','Rs 70'],
    hint:'Add the fractions spent: 1/4 + 2/5. Find the remaining fraction. Apply to Rs 200.',
    explanation:'Spent: 1/4 + 2/5 = 5/20 + 8/20 = 13/20. Remaining: 1 − 13/20 = 7/20. Amount left: 7/20 × 200 = <b>Rs 70</b>.' })

);
