'use strict';
// Grade 7 Maths — g7m-fractions, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-fractions-012', chapterId:'g7m-fractions', difficulty:2,
    subsection:'comparing_fractions',
    question:'Which of these fractions is CLOSEST to 1?',
    options:['7/8','3/4','2/3','3/5'],
    answer:'7/8',
    hint:'A fraction is close to 1 when the numerator is close to the denominator.',
    explanation:'7/8 is only 1/8 short of a whole, while 3/4 is 1/4 short, 2/3 is 1/3 short and 3/5 is 2/5 short. The smallest gap wins, so a bigger denominator does not automatically mean a smaller fraction.' }),

  makeMCQ({ id:'g7m-fractions-013', chapterId:'g7m-fractions', difficulty:3,
    subsection:'comparing_fractions',
    question:'Yash says 3/8 is greater than 2/5 "because 8 is greater than 5". Which comparison is actually correct?',
    options:['3/8 is less than 2/5','3/8 is equal to 2/5','3/8 is greater than 2/5','2/5 is less than 3/8'],
    answer:'3/8 is less than 2/5',
    hint:'Put both fractions over the same denominator, or turn each into a decimal.',
    explanation:'Over 40ths, 3/8 = 15/40 and 2/5 = 16/40, so 3/8 is the smaller one (0.375 against 0.4). The last two options are the same wrong claim written two ways, and the fractions are clearly not equal.' }),

  makeNum({ id:'g7m-fractions-014', chapterId:'g7m-fractions', difficulty:2,
    subsection:'converting',
    question:'Write 3/8 as a decimal.',
    answer:0.375,
    hint:'A fraction bar is a division sign: work out 3 ÷ 8.',
    explanation:'3 ÷ 8 = 0.375. Dividing the other way round, 8 ÷ 3, gives 2.66… which is bigger than 1 and cannot be right for a fraction smaller than a whole.' }),

  makeMCQ({ id:'g7m-fractions-015', chapterId:'g7m-fractions', difficulty:2,
    subsection:'converting',
    question:'Which decimal is equal to 5/8?',
    options:['0.625','0.58','0.85','0.375'],
    answer:'0.625',
    hint:'Divide 5 by 8, or start from 1/8 = 0.125 and multiply.',
    explanation:'1/8 = 0.125, so 5/8 = 5 × 0.125 = 0.625. Writing the digits 5 and 8 straight after the point gives 0.58, reversing them gives 0.85, and 0.375 is 3/8.' }),

  makeNum({ id:'g7m-fractions-016', chapterId:'g7m-fractions', difficulty:2,
    subsection:'converting',
    question:'Convert the mixed number 2 3/5 to an improper fraction. Type the NUMERATOR only.',
    answer:13,
    hint:'Multiply the whole number by the denominator, then add the numerator on.',
    explanation:'2 × 5 = 10, then 10 + 3 = 13, so the fraction is 13/5. Answering 6 multiplies 2 by 3 and forgets the denominator; answering 5 just repeats the denominator.' }),

  makeMCQ({ id:'g7m-fractions-017', chapterId:'g7m-fractions', difficulty:3,
    subsection:'converting',
    question:'Which of these is NOT equal to 0.25?',
    options:['2/5','1/4','25/100','5/20'],
    answer:'2/5',
    hint:'Simplify each fraction, or turn each one into a decimal, before deciding.',
    explanation:'2/5 = 0.4, so it is the odd one out. 1/4, 25/100 and 5/20 all simplify to one quarter, which is 0.25. Reading 0.25 as "twenty-five" and picking the fraction with a 2 and a 5 in it is the trap here.' }),

  makeNum({ id:'g7m-fractions-018', chapterId:'g7m-fractions', difficulty:3,
    subsection:'operations_fractions',
    question:'Calculate 3/4 ÷ 3/8. Give your answer as a whole number.',
    answer:2,
    hint:'To divide by a fraction, turn the second fraction upside down and multiply.',
    explanation:'3/4 ÷ 3/8 = 3/4 × 8/3 = 24/12 = 2. Multiplying instead of inverting gives 9/32, and inverting the FIRST fraction gives 4/3 × 3/8 = 1/2. Both are smaller than 1, which cannot be right: dividing by a fraction below 1 always makes a number bigger.' }),

  makeMCQ({ id:'g7m-fractions-019', chapterId:'g7m-fractions', difficulty:3,
    subsection:'operations_fractions',
    question:'What is 5/6 − 1/2 + 1/3?',
    options:['2/3','1/2','5/6','1'],
    answer:'2/3',
    hint:'Rewrite all three fractions over 6 before adding or subtracting anything.',
    explanation:'5/6 − 3/6 + 2/6 = 4/6 = 2/3. Doing the addition before the subtraction gives 5/6 − 5/6 = 0, and adding all three numerators over 6 without converting gives 5/6.' }),

  makeNum({ id:'g7m-fractions-020', chapterId:'g7m-fractions', difficulty:4,
    subsection:'operations_fractions',
    question:'A water tank at a Grade 7 school holds 240 litres when full. On Monday 1/3 of the water is used. On Tuesday 1/4 of what is LEFT is used. How many litres remain on Wednesday morning?',
    answer:120,
    hint:'Tuesday\'s fraction is taken from what survived Monday, not from the full tank.',
    explanation:'Monday uses 240 ÷ 3 = 80 litres, leaving 160. Tuesday uses 160 ÷ 4 = 40 litres, leaving 120. Taking 1/4 of the FULL 240 gives 60 and an answer of 100 — the usual mistake — and adding 1/3 + 1/4 first gives 7/12 of 240 and an answer of 100 too.' })

);
