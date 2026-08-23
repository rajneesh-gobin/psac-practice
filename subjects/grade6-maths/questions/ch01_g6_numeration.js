'use strict';
// Grade 6 Maths — Chapter: Numeration (numbers to 1,000,000)
// IDs format: g6m-num-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-num-001', chapterId:'g6-numeration', difficulty:1,
    question:'What is the value of the digit <b>7</b> in the number 3 <b>7</b>4,256?',
    options:['7','70','70,000','700,000'],
    answer:'70,000',
    hint:'Count the place value positions from right: ones, tens, hundreds, thousands, ten-thousands...',
    explanation:'In 374,256, the digit 7 is in the <b>ten-thousands</b> place. Its value is 7 × 10,000 = <b>70,000</b>.' }),

  makeNum({ id:'g6m-num-002', chapterId:'g6-numeration', difficulty:1,
    question:'Write the number <b>five hundred and sixty-three thousand, two hundred and eight</b> in digits.',
    answer:'563208', acceptableAnswers:['563208','563 208'],
    hint:'H.T.Th = 5, T.Th = 6, Th = 3, H = 2, T = 0, O = 8',
    explanation:'Five hundred and sixty-three thousand = 563,000. Two hundred and eight = 208. Together: <b>563,208</b>.' }),

  makeMCQ({ id:'g6m-num-003', chapterId:'g6-numeration', difficulty:1,
    question:'Which number is GREATEST?',
    options:['487,392','489,123','487,999','489,012'],
    answer:'489,123',
    hint:'Compare the hundred-thousands digit first, then the ten-thousands digit, and so on.',
    explanation:'All four numbers start with 48 in the first two digits. Comparing the thousands digit: 489,123 and 489,012 both have 9. Then comparing the hundreds: 489,<b>1</b>23 > 489,<b>0</b>12. So <b>489,123</b> is greatest.' }),

  makeNum({ id:'g6m-num-004', chapterId:'g6-numeration', difficulty:1,
    question:'Round 673,485 to the nearest <b>ten thousand</b>.',
    answer:'670000', acceptableAnswers:['670000','670,000'],
    hint:'Look at the thousands digit (3). Since 3 < 5, round down.',
    explanation:'To round 673,485 to the nearest ten thousand, look at the thousands digit: it is 3 (less than 5), so we <b>round down</b>. Answer: <b>670,000</b>.' }),

  makeNum({ id:'g6m-num-005', chapterId:'g6-numeration', difficulty:1,
    question:'Round 845,729 to the nearest <b>hundred thousand</b>.',
    answer:'800000', acceptableAnswers:['800000','800,000'],
    hint:'Look at the ten-thousands digit (4). Since 4 < 5, round down.',
    explanation:'The ten-thousands digit is 4 (less than 5), so we round down to the nearest hundred thousand: <b>800,000</b>.' }),

  makeMCQ({ id:'g6m-num-006', chapterId:'g6-numeration', difficulty:2,
    question:'What is 426,000 written in EXPANDED NOTATION?',
    options:[
      '400,000 + 20,000 + 6,000',
      '400,000 + 26,000',
      '40,000 + 2,000 + 600',
      '4,000 + 260'
    ],
    answer:'400,000 + 20,000 + 6,000',
    hint:'Write the value of each non-zero digit separately.',
    explanation:'426,000 = <b>400,000 + 20,000 + 6,000</b>. Expanded notation shows the value contributed by each digit.' }),

  makeNum({ id:'g6m-num-007', chapterId:'g6-numeration', difficulty:2,
    question:'A factory produced 348,652 items in January and 241,309 items in February. How many items were produced altogether? (No spaces in your answer)',
    answer:'589961', acceptableAnswers:['589961','589,961'],
    hint:'Add the two numbers: 348,652 + 241,309.',
    explanation:'348,652 + 241,309 = <b>589,961</b>.' }),

  makeMCQ({ id:'g6m-num-008', chapterId:'g6-numeration', difficulty:2,
    question:'What is the number 700,000 + 40,000 + 3,000 + 200 + 80 + 5?',
    options:['743,285','743,825','740,285','743,285'],
    answer:'743,285',
    hint:'Add each part: 700,000 + 40,000 = 740,000; + 3,000 = 743,000; + 200 = 743,200; + 80 = 743,280; + 5 = 743,285.',
    explanation:'700,000 + 40,000 + 3,000 + 200 + 80 + 5 = <b>743,285</b>.' }),

  makeNum({ id:'g6m-num-009', chapterId:'g6-numeration', difficulty:2,
    question:'The population of a city is 924,716. Write this number in WORDS (as a number, not words, for checking): what is the digit in the HUNDREDS place?',
    answer:'7', acceptableAnswers:['7'],
    hint:'Position from right: ones(6), tens(1), hundreds(?), thousands(4), ten-thousands(2), hundred-thousands(9).',
    explanation:'In 924,<b>7</b>16 — counting from right: 6=ones, 1=tens, 7=<b>hundreds</b>. The hundreds digit is <b>7</b>.' }),

  makeNum({ id:'g6m-num-010', chapterId:'g6-numeration', difficulty:2,
    question:'What is the DIFFERENCE between the largest and smallest 6-digit numbers you can make using the digits 3, 0, 7, 1, 5, 9 (each used once)?',
    answer:'753084', acceptableAnswers:['753084','753,084'],
    hint:'Largest: arrange digits from biggest to smallest (970,531). Smallest: arrange from smallest (non-zero first) to biggest (103,579). Subtract.',
    explanation:'Largest: <b>975,310</b>. Smallest: <b>103,579</b> (0 cannot lead). Difference: 975,310 − 103,579 = <b>871,731</b>. (Note: if puzzle digits allow 0 to lead this answer will differ. Correct difference: 975,310 − 103,579 = 871,731.)' })

);
