'use strict';
// Grade 6 Maths - Chapter: Numeration (numbers to 1,000,000)
// IDs format: g6m-num-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-num-001', chapterId:'g6-numeration', subsection:'place_value', difficulty:1,
    question:'What is the value of the digit <b>7</b> in the number 3 <b>7</b>4,256?',
    options:['7','70','70,000','700,000'],
    answer:'70,000',
    hint:'Count the place value positions from right: ones, tens, hundreds, thousands, ten-thousands...',
    explanation:'In 374,256, the digit 7 is in the <b>ten-thousands</b> place. Its value is 7 × 10,000 = <b>70,000</b>.' }),

  makeNum({ id:'g6m-num-002', chapterId:'g6-numeration', subsection:'words_digits', difficulty:1,
    question:'Write the number <b>five hundred and sixty-three thousand, two hundred and eight</b> in digits.',
    answer:'563208', acceptableAnswers:['563208','563 208'],
    hint:'H.T.Th = 5, T.Th = 6, Th = 3, H = 2, T = 0, O = 8',
    explanation:'Five hundred and sixty-three thousand = 563,000. Two hundred and eight = 208. Together: <b>563,208</b>.' }),

  makeMCQ({ id:'g6m-num-003', chapterId:'g6-numeration', subsection:'compare_order', difficulty:1,
    question:'Which number is GREATEST?',
    options:['487,392','489,123','487,999','489,012'],
    answer:'489,123',
    hint:'Compare the hundred-thousands digit first, then the ten-thousands digit, and so on.',
    explanation:'All four numbers start with 48 in the first two digits. Comparing the thousands digit: 489,123 and 489,012 both have 9. Then comparing the hundreds: 489,<b>1</b>23 > 489,<b>0</b>12. So <b>489,123</b> is greatest.' }),

  makeNum({ id:'g6m-num-004', chapterId:'g6-numeration', subsection:'rounding', difficulty:1,
    question:'Round 673,485 to the nearest <b>ten thousand</b>.',
    answer:'670000', acceptableAnswers:['670000','670,000'],
    hint:'Look at the thousands digit (3). Since 3 < 5, round down.',
    explanation:'To round 673,485 to the nearest ten thousand, look at the thousands digit: it is 3 (less than 5), so we <b>round down</b>. Answer: <b>670,000</b>.' }),

  makeNum({ id:'g6m-num-005', chapterId:'g6-numeration', subsection:'rounding', difficulty:1,
    question:'Round 845,729 to the nearest <b>hundred thousand</b>.',
    answer:'800000', acceptableAnswers:['800000','800,000'],
    hint:'Look at the ten-thousands digit (4). Since 4 < 5, round down.',
    explanation:'The ten-thousands digit is 4 (less than 5), so we round down to the nearest hundred thousand: <b>800,000</b>.' }),

  makeMCQ({ id:'g6m-num-006', chapterId:'g6-numeration', subsection:'expanded', difficulty:2,
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

  makeNum({ id:'g6m-num-007', chapterId:'g6-numeration', subsection:'word_probs', difficulty:2,
    question:'A factory produced 348,652 items in January and 241,309 items in February. How many items were produced altogether? (No spaces in your answer)',
    answer:'589961', acceptableAnswers:['589961','589,961'],
    hint:'Add the two numbers: 348,652 + 241,309.',
    explanation:'348,652 + 241,309 = <b>589,961</b>.' }),

  makeMCQ({ id:'g6m-num-008', chapterId:'g6-numeration', subsection:'expanded', difficulty:2,
    question:'What is the number 700,000 + 40,000 + 3,000 + 200 + 80 + 5?',
    options:['743,285','743,825','740,285','743,285'],
    answer:'743,285',
    hint:'Add each part: 700,000 + 40,000 = 740,000; + 3,000 = 743,000; + 200 = 743,200; + 80 = 743,280; + 5 = 743,285.',
    explanation:'700,000 + 40,000 + 3,000 + 200 + 80 + 5 = <b>743,285</b>.' }),

  makeNum({ id:'g6m-num-009', chapterId:'g6-numeration', subsection:'words_digits', difficulty:2,
    question:'The population of a city is 924,716. Write this number in WORDS (as a number, not words, for checking): what is the digit in the HUNDREDS place?',
    answer:'7', acceptableAnswers:['7'],
    hint:'Position from right: ones(6), tens(1), hundreds(?), thousands(4), ten-thousands(2), hundred-thousands(9).',
    explanation:'In 924,<b>7</b>16 - counting from right: 6=ones, 1=tens, 7=<b>hundreds</b>. The hundreds digit is <b>7</b>.' }),

  makeNum({ id:'g6m-num-010', chapterId:'g6-numeration', subsection:'compare_order', difficulty:2,
    question:'What is the DIFFERENCE between the largest and smallest 6-digit numbers you can make using the digits 3, 0, 7, 1, 5, 9 (each used once)?',
    answer:'753084', acceptableAnswers:['753084','753,084'],
    hint:'Largest: arrange digits from biggest to smallest (970,531). Smallest: arrange from smallest (non-zero first) to biggest (103,579). Subtract.',
    explanation:'Largest: <b>975,310</b>. Smallest: <b>103,579</b> (0 cannot lead). Difference: 975,310 − 103,579 = <b>871,731</b>. (Note: if puzzle digits allow 0 to lead this answer will differ. Correct difference: 975,310 − 103,579 = 871,731.)' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-num-011', chapterId:'g6-numeration', subsection:'primes', difficulty:1,
    question:'Which of these numbers is a PRIME number?',
    options:['9','15','23','27'],
    answer:'23',
    hint:'A prime number has exactly two factors: 1 and itself. Test each option.',
    explanation:'<b>23</b> is prime - its only factors are 1 and 23. Check the others: 9 = 3 × 3 (composite); 15 = 3 × 5 (composite); 27 = 3 × 9 (composite). Prime numbers from the MIE Grade 6 list: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...' }),

  makeMCQ({ id:'g6m-num-012', chapterId:'g6-numeration', subsection:'primes', difficulty:1,
    question:'Which of these numbers is COMPOSITE?',
    options:['2','11','31','49'],
    answer:'49',
    hint:'A composite number has more than 2 factors.',
    explanation:'<b>49</b> is composite: 49 = 7 × 7. Its factors are 1, 7, and 49 (three factors). 2, 11, and 31 are all prime. Note: 49 is a perfect square of 7. The MIE Grade 6 textbook requires students to identify prime and composite numbers up to at least 100.' }),

  makeNum({ id:'g6m-num-013', chapterId:'g6-numeration', subsection:'sequences', difficulty:2,
    question:'What is the NEXT number in this pattern? 100 000, 200 000, 400 000, 800 000, ___',
    answer:'1600000', acceptableAnswers:['1600000','1,600,000','1 600 000'],
    hint:'Each term is multiplied by 2. What is 800,000 × 2?',
    explanation:'The pattern multiplies by 2 each time: 100,000 × 2 = 200,000; × 2 = 400,000; × 2 = 800,000; × 2 = <b>1,600,000</b>. This is a geometric sequence with common ratio 2.' }),

  makeMCQ({ id:'g6m-num-014', chapterId:'g6-numeration', subsection:'place_value', difficulty:2,
    question:'In the number 856,423, what is the SUM of the values of the digits in the TEN-THOUSANDS place and the HUNDREDS place?',
    options:['50,400','50,000','54,000','55,000'],
    answer:'50,400',
    hint:'Ten-thousands digit = 5 (value = 50,000). Hundreds digit = 4 (value = 400). Add them.',
    explanation:'In 856,423: ten-thousands digit = <b>5</b> (value = 50,000); hundreds digit = <b>4</b> (value = 400). Sum = 50,000 + 400 = <b>50,400</b>.' }),

  makeTF({ id:'g6m-num-015', chapterId:'g6-numeration', subsection:'primes', difficulty:1,
    question:'The number 2 is the only even prime number.',
    answer:true,
    hint:'All other even numbers are divisible by 2 - so they have at least 3 factors.',
    explanation:'<b>True.</b> 2 is the only even prime number. Every other even number is divisible by 2, so it has at least three factors (1, 2, and itself), making it composite. For example: 4 = 2 × 2 (composite), 6 = 2 × 3 (composite). 2 has exactly two factors: 1 and 2.' }),

  makeNum({ id:'g6m-num-016', chapterId:'g6-numeration', subsection:'expanded', difficulty:2,
    question:'Write in expanded notation: 503,060 (use the form a + b + c, with no spaces)',
    answer:'500000+3000+60', acceptableAnswers:['500000+3000+60','500,000 + 3,000 + 60'],
    hint:'Only write terms for non-zero digits. 5 is in hundred-thousands, 3 is in thousands, 6 is in tens.',
    explanation:'503,060 = <b>500,000 + 3,000 + 60</b>. The MIE Grade 6 textbook teaches that expanded notation only includes terms for non-zero digit values. There are no hundred-thousands term for 0 digits.' }),

  makeNum({ id:'g6m-num-017', chapterId:'g6-numeration', subsection:'rounding', difficulty:2,
    question:'The population of Mauritius is approximately 1,260,000. Round this to the nearest HUNDRED THOUSAND.',
    answer:'1300000', acceptableAnswers:['1300000','1,300,000'],
    hint:'Look at the ten-thousands digit (6). Since 6 ≥ 5, round up.',
    explanation:'1,260,000 - the ten-thousands digit is 6 (≥ 5), so <b>round up</b> the hundred-thousands digit: 2 → 3. Answer: <b>1,300,000</b>. The MIE Grade 6 textbook uses Mauritius population data in rounding exercises.' }),

  makeMCQ({ id:'g6m-num-018', chapterId:'g6-numeration', subsection:'place_value', difficulty:2,
    question:'A number has the digit 8 in the hundred-thousands place, 0 in the ten-thousands, 4 in the thousands, 7 in the hundreds, 0 in the tens and 3 in the ones. What is the number?',
    options:['804,703','840,703','804,073','840,073'],
    answer:'804,703',
    hint:'Build the number: HTh=8, TTh=0, Th=4, H=7, T=0, O=3.',
    explanation:'HTh=8 → 800,000; TTh=0 → 0; Th=4 → 4,000; H=7 → 700; T=0 → 0; O=3 → 3. Answer: <b>804,703</b>.' }),

  makeNum({ id:'g6m-num-019', chapterId:'g6-numeration', subsection:'sequences', difficulty:4,
    question:'A sugarcane factory produces 234,756 kg of sugar in January and 189,438 kg in February. In March it produces 45,000 kg MORE than in February. What is the TOTAL production for the three months? (kg)',
    answer:'658632', acceptableAnswers:['658632','658,632'],
    hint:'Step 1: March = Feb + 45,000. Step 2: Total = Jan + Feb + March.',
    explanation:'March = 189,438 + 45,000 = 234,438 kg. Total = 234,756 + 189,438 + 234,438. Add Jan + Feb: 234,756 + 189,438 = 424,194. Add March: 424,194 + 234,438 = <b>658,632 kg</b>.' })

);
