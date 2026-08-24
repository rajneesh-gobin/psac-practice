'use strict';
// Grade 4 Maths - Chapter: Fractions (up to tenths, comparison, addition, subtraction)
// IDs format: g4m-frac-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-frac-001', chapterId:'g4-fractions', difficulty:1,
    question:'Which fraction is GREATER: 3/8 or 5/8?',
    options:['3/8','5/8','They are equal','Cannot compare'],
    answer:'5/8',
    hint:'When fractions have the SAME denominator, the one with the bigger numerator is greater.',
    explanation:'Both fractions have denominator 8. Compare numerators: 5 > 3, so <b>5/8 > 3/8</b>. Imagine a pizza cut into 8 equal slices - 5 slices is more than 3 slices.' }),

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
    explanation:'1/4 = 2/8. Total drunk = 3/8 + 2/8 = 5/8. Left = 8/8 − 5/8 = <b>3/8 L</b>. This is a two-step fraction word problem - a Level 3 MIE Grade 4 skill.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-frac-011', chapterId:'g4-fractions', difficulty:1,
    question:'What is 1/4 of 20?',
    answer:'5', acceptableAnswers:['5'],
    hint:'Divide 20 by the denominator (4).',
    explanation:'1/4 of 20 = 20 ÷ 4 = <b>5</b>. "A fraction of a quantity" = divide by the denominator, then multiply by the numerator. For 1/4: just divide by 4.' }),

  makeNum({ id:'g4m-frac-012', chapterId:'g4-fractions', difficulty:1,
    question:'What is 3/4 of 24?',
    answer:'18', acceptableAnswers:['18'],
    hint:'First find 1/4 of 24, then multiply by 3.',
    explanation:'1/4 of 24 = 24 ÷ 4 = 6. Then 3/4 = 3 × 6 = <b>18</b>. Method: ÷ denominator, × numerator. MIE Grade 4 fractions of quantities.' }),

  makeMCQ({ id:'g4m-frac-013', chapterId:'g4-fractions', difficulty:2,
    question:'Which fraction is EQUIVALENT to 1/2?',
    options:['2/6','3/8','4/8','3/5'],
    answer:'4/8',
    hint:'Multiply both numerator and denominator of 1/2 by the same number.',
    explanation:'1/2 × (4/4) = 4/8. Check: 1×4=4 and 2×4=8, so 4/8 = 1/2 ✓. <b>4/8</b> is equivalent to 1/2. Equivalent fractions represent the same amount.' }),

  makeMCQ({ id:'g4m-frac-014', chapterId:'g4-fractions', difficulty:2,
    question:'A number line goes from 0 to 1. Where would you place 3/5?',
    options:['Closer to 0','Exactly at the middle','Closer to 1 but not at 1','Exactly at 1'],
    answer:'Closer to 1 but not at 1',
    hint:'The midpoint is 1/2 = 2.5/5. Is 3/5 past the midpoint?',
    explanation:'The midpoint (1/2) = 2.5/5. Since 3/5 > 2.5/5, it is past the halfway point - <b>closer to 1 but not at 1</b>. It is 2/5 from 1 and 3/5 from 0.' }),

  makeNum({ id:'g4m-frac-015', chapterId:'g4-fractions', difficulty:2,
    question:'Simplify 6/10 to its LOWEST TERMS. (Write as A/B)',
    answer:'3/5', acceptableAnswers:['3/5'],
    hint:'Find the HCF of 6 and 10. Divide both by it.',
    explanation:'HCF of 6 and 10 = 2. 6÷2=3, 10÷2=5. So 6/10 = <b>3/5</b>. A fraction is in lowest terms when its numerator and denominator share no common factor other than 1.' }),

  makeMCQ({ id:'g4m-frac-016', chapterId:'g4-fractions', difficulty:2,
    question:'Which fraction is GREATER: 2/3 or 3/5?',
    options:['2/3','3/5','They are equal','Cannot compare'],
    answer:'2/3',
    hint:'Convert to the same denominator. LCM of 3 and 5 is 15. So: 2/3 = 10/15 and 3/5 = 9/15.',
    explanation:'2/3 = 10/15. 3/5 = 9/15. Since 10/15 > 9/15, <b>2/3 > 3/5</b>. To compare fractions with different denominators, convert to equivalent fractions with the same denominator.' }),

  makeNum({ id:'g4m-frac-017', chapterId:'g4-fractions', difficulty:2,
    question:'Write 0.7 as a FRACTION. (Write as A/B)',
    answer:'7/10', acceptableAnswers:['7/10'],
    hint:'0.7 means 7 tenths.',
    explanation:'0.7 = 7 tenths = <b>7/10</b>. The tenths place is the first digit after the decimal point. MIE Grade 4 connects decimals and fractions with denominator 10.' }),

  makeNum({ id:'g4m-frac-018', chapterId:'g4-fractions', difficulty:3,
    question:'Riya has 36 marbles. She gives 1/3 to Priya and 1/4 to Dev. How many marbles does Riya have LEFT?',
    answer:'15', acceptableAnswers:['15'],
    hint:'Find 1/3 of 36 and 1/4 of 36. Add them. Subtract from 36.',
    explanation:'1/3 of 36 = 12. 1/4 of 36 = 9. Given away = 12 + 9 = 21. Left = 36 − 21 = <b>15 marbles</b>. Two-step problem: fractions of a quantity, then subtraction.' }),

  makeMCQ({ id:'g4m-frac-019', chapterId:'g4-fractions', difficulty:4,
    question:'Asha walks 3/4 km to school and the same distance back home each day. Her brother walks 2 km in total each day. Who walks MORE, and by how much?',
    options:[
      'Asha - she walks 0.5 km more than her brother',
      'Her brother - he walks 0.5 km more than Asha',
      'They walk the same distance',
      'Her brother - he walks 1/4 km more'
    ],
    answer:'Her brother - he walks 0.5 km more than Asha',
    hint:'Asha\'s total = 3/4 + 3/4 = 6/4. Convert to a decimal or mixed number to compare with 2 km.',
    explanation:'Asha: 3/4 + 3/4 = 6/4 = 1½ km = 1.5 km. Her brother: 2 km. Difference: 2 − 1.5 = 0.5 km. <b>Her brother walks 0.5 km more</b> than Asha. Converting 3/4 to 0.75 makes comparison easier.' })

);
