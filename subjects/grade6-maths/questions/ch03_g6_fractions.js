'use strict';
// Grade 6 Maths — Chapter: Fractions (equivalent, simplify, add/subtract, mixed numbers)
// IDs format: g6m-frac-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-frac-001', chapterId:'g6-fractions', difficulty:1,
    question:'Which fraction is EQUIVALENT to 2/3?',
    options:['4/9','6/9','3/6','4/7'],
    answer:'6/9',
    hint:'Multiply both numerator and denominator of 2/3 by the same number.',
    explanation:'2/3 = 2×3 / 3×3 = <b>6/9</b>. Equivalent fractions are made by multiplying (or dividing) top and bottom by the same number.' }),

  makeMCQ({ id:'g6m-frac-002', chapterId:'g6-fractions', difficulty:1,
    question:'Simplify 18/24 to its LOWEST TERMS.',
    options:['9/12','6/8','3/4','2/3'],
    answer:'3/4',
    hint:'Find the HCF of 18 and 24, then divide both by it.',
    explanation:'HCF(18, 24) = 6. 18÷6 = 3, 24÷6 = 4. Simplified: <b>3/4</b>.' }),

  makeNum({ id:'g6m-frac-003', chapterId:'g6-fractions', difficulty:1,
    question:'Calculate: 3/8 + 2/8 (Write your answer as a fraction, e.g. 5/8)',
    answer:'5/8', acceptableAnswers:['5/8'],
    hint:'Same denominator — just add the numerators.',
    explanation:'When fractions have the same denominator: 3/8 + 2/8 = (3+2)/8 = <b>5/8</b>.' }),

  makeNum({ id:'g6m-frac-004', chapterId:'g6-fractions', difficulty:2,
    question:'Calculate: 1/2 + 1/3 (Simplify your answer if possible, e.g. 5/6)',
    answer:'5/6', acceptableAnswers:['5/6'],
    hint:'Find the LCM of 2 and 3, which is 6. Convert both fractions to sixths.',
    explanation:'LCM(2,3) = 6. 1/2 = 3/6. 1/3 = 2/6. Sum = 3/6 + 2/6 = <b>5/6</b>.' }),

  makeNum({ id:'g6m-frac-005', chapterId:'g6-fractions', difficulty:2,
    question:'Calculate: 3/4 − 1/6 (Write as a fraction in simplest form)',
    answer:'7/12', acceptableAnswers:['7/12'],
    hint:'LCM(4,6) = 12. Convert: 3/4 = 9/12, 1/6 = 2/12. Subtract.',
    explanation:'LCM(4,6) = 12. 3/4 = 9/12. 1/6 = 2/12. 9/12 − 2/12 = <b>7/12</b>.' }),

  makeMCQ({ id:'g6m-frac-006', chapterId:'g6-fractions', difficulty:2,
    question:'Convert the mixed number 2 3/5 to an improper fraction.',
    options:['13/5','23/5','11/5','10/5'],
    answer:'13/5',
    hint:'Multiply the whole number by the denominator, then add the numerator: (2×5)+3 = 13.',
    explanation:'2 3/5 = (2 × 5 + 3) / 5 = <b>13/5</b>. To convert a mixed number: multiply whole part by denominator, add numerator, keep same denominator.' }),

  makeMCQ({ id:'g6m-frac-007', chapterId:'g6-fractions', difficulty:2,
    question:'Convert the improper fraction 17/4 to a mixed number.',
    options:['4 1/4','4 3/4','3 1/4','4 2/4'],
    answer:'4 1/4',
    hint:'Divide 17 by 4. The quotient is the whole number, the remainder is the new numerator.',
    explanation:'17 ÷ 4 = 4 remainder 1. So 17/4 = <b>4 1/4</b>.' }),

  makeMCQ({ id:'g6m-frac-008', chapterId:'g6-fractions', difficulty:2,
    question:'Which fraction is GREATER: 3/4 or 5/7?',
    options:['3/4','5/7','They are equal','Cannot be determined'],
    answer:'3/4',
    hint:'Convert both to the same denominator (LCM of 4 and 7 = 28). 3/4=21/28, 5/7=20/28.',
    explanation:'LCM(4,7)=28. 3/4 = 21/28. 5/7 = 20/28. Since 21/28 > 20/28, <b>3/4 is greater</b>.' }),

  makeNum({ id:'g6m-frac-009', chapterId:'g6-fractions', difficulty:2,
    question:'John ate 1/4 of a pizza and Mary ate 3/8. What fraction of the pizza was eaten altogether?',
    answer:'5/8', acceptableAnswers:['5/8'],
    hint:'Add 1/4 + 3/8. Convert 1/4 to eighths first.',
    explanation:'1/4 = 2/8. 2/8 + 3/8 = <b>5/8</b> of the pizza was eaten.' }),

  makeNum({ id:'g6m-frac-010', chapterId:'g6-fractions', difficulty:2,
    question:'A ribbon is 2 1/2 metres long. 3/4 of a metre is cut off. How many metres are left? (Write as a mixed number, e.g. 1 3/4)',
    answer:'1 3/4', acceptableAnswers:['1 3/4','7/4','1.75'],
    hint:'2 1/2 = 5/2 = 10/4. Subtract 3/4 from 10/4.',
    explanation:'2 1/2 = 10/4. 10/4 − 3/4 = 7/4 = <b>1 3/4 metres</b> remaining.' })

);
