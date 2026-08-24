'use strict';
// Grade 4 Maths — Chapter: Fractions (up to tenths, comparison, addition, subtraction)
// IDs format: g4m-frac-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-frac-001', chapterId:'g4-fractions', difficulty:1,
    question:'Which fraction is GREATER: 3/8 or 5/8?',
    options:['3/8','5/8','They are equal','Cannot compare'],
    answer:'5/8',
    hint:'When fractions have the SAME denominator, the one with the bigger numerator is greater.',
    explanation:'Both fractions have denominator 8. Compare numerators: 5 > 3, so <b>5/8 > 3/8</b>. Imagine a pizza cut into 8 equal slices — 5 slices is more than 3 slices.' }),

  makeNum({ id:'g4m-frac-002', chapterId:'g4-fractions', difficulty:1,
    question:'Calculate: 1/5 + 3/5 = ?  (Write as A/B)',
    answer:'4/5', acceptableAnswers:['4/5'],
    hint:'Same denominator: just add the numerators. Keep the denominator the same.',
    explanation:'1/5 + 3/5 = (1+3)/5 = <b>4/5</b>. When denominators are the same, add the numerators and keep the denominator unchanged. MIE Grade 4: add fractions with the same denominator.' }),

  makeNum({ id:'g4m-frac-003', chapterId:'g4-fractions', difficulty:1,
    question:'Calculate: 7/8 − 3/8 = ?  (Simplify if possible)',
    answer:'1/2', acceptableAnswers:['1/2','4/8'],
    hint:'Same denominator: subtract the numerators. Then simplify.',
    explanation:'7/8 − 3/8 = (7−3)/8 = 4/8. Simplify: 4/8 = <b>1/2</b> (divide top and bottom by 4). Simplifying means writing the fraction in its lowest terms.' }),

  makeNum({ id:'g4m-frac-004', chapterId:'g4-fractions', difficulty:2,
    question:'Calculate: 1/2 + 1/4 = ?  (Write as A/B)',
    answer:'3/4', acceptableAnswers:['3/4'],
    hint:'Different denominators! Change 1/2 to quarters first: 1/2 = 2/4. Then add.',
    explanation:'Make same denominator: 1/2 = 2/4. So 2/4 + 1/4 = <b>3/4</b>. MIE Grade 4: to add fractions with different denominators, convert to a common denominator first.' }),

  makeMCQ({ id:'g4m-frac-005', chapterId:'g4-fractions', difficulty:2,
    question:'Which is the correct order from SMALLEST to GREATEST?',
    options:['1/2, 1/3, 1/4, 1/6','1/6, 1/4, 1/3, 1/2','1/4, 1/3, 1/2, 1/6','1/3, 1/2, 1/6, 1/4'],
    answer:'1/6, 1/4, 1/3, 1/2',
    hint:'All numerators are 1. A BIGGER denominator means a SMALLER fraction.',
    explanation:'For unit fractions (numerator = 1): a larger denominator gives a smaller fraction. So 1/6 < 1/4 < 1/3 < 1/2. Order: <b>1/6, 1/4, 1/3, 1/2</b>. Think: sharing 1 cake between 6 people gives less than sharing it between 2.' }),

  makeNum({ id:'g4m-frac-006', chapterId:'g4-fractions', difficulty:2,
    question:'Calculate: 3/4 − 1/8 = ?  (Write as A/B)',
    answer:'5/8', acceptableAnswers:['5/8'],
    hint:'Different denominators! Convert 3/4 to eighths: 3/4 = 6/8. Then subtract.',
    explanation:'3/4 = 6/8. So 6/8 − 1/8 = <b>5/8</b>. MIE Grade 4 method: find equivalent fractions with the same denominator, then subtract numerators.' }),

  makeTF({ id:'g4m-frac-007', chapterId:'g4-fractions', difficulty:1,
    question:'2/3 is EQUIVALENT to 4/6.',
    answer:true,
    hint:'Multiply both numerator and denominator of 2/3 by 2.',
    explanation:'<b>True.</b> 2/3 × (2/2) = 4/6. Equivalent fractions have the same value. 2/3 = 4/6 = 6/9 = 8/12... They represent the same amount.' }),

  makeNum({ id:'g4m-frac-008', chapterId:'g4-fractions', difficulty:2,
    question:'A ribbon is 9/10 m long. A piece of 3/10 m is cut off. How much ribbon is LEFT? (Write as A/B)',
    answer:'6/10', acceptableAnswers:['6/10','3/5'],
    hint:'Same denominator: subtract the numerators.',
    explanation:'9/10 − 3/10 = 6/10 = <b>3/5</b>. Both 6/10 and 3/5 are accepted (they are equivalent). Real-life fraction application from MIE Grade 4.' }),

  makeMCQ({ id:'g4m-frac-009', chapterId:'g4-fractions', difficulty:2,
    question:'Sita ate 1/4 of a pizza and Raj ate 2/4 of the same pizza. What fraction is LEFT?',
    options:['1/4','3/4','2/4','Nothing is left'],
    answer:'1/4',
    hint:'How much was eaten altogether? Then subtract from 1 whole (= 4/4).',
    explanation:'Eaten: 1/4 + 2/4 = 3/4. Left: 4/4 − 3/4 = <b>1/4</b>. The whole pizza is 4/4 (all 4 parts). Subtract the eaten portion to find what remains.' }),

  makeNum({ id:'g4m-frac-010', chapterId:'g4-fractions', difficulty:4,
    question:'A container holds exactly 1 litre of juice. Meera drinks 3/8 L and her brother drinks 1/4 L. How much juice is LEFT (in litres, as a fraction)?',
    answer:'3/8', acceptableAnswers:['3/8'],
    hint:'Convert 1/4 to eighths. Add what was drunk. Subtract from 1 (= 8/8).',
    explanation:'1/4 = 2/8. Total drunk = 3/8 + 2/8 = 5/8. Left = 8/8 − 5/8 = <b>3/8 L</b>. This is a two-step fraction word problem — a Level 3 MIE Grade 4 skill.' })

);
