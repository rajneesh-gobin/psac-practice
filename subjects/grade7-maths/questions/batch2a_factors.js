'use strict';
// Grade 7 Maths — g7m-factors, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-factors-012', chapterId:'g7m-factors', difficulty:2,
    subsection:'divisibility',
    question:'Which of these numbers is divisible by 8?',
    options:['216','316','428','612'],
    answer:'216',
    hint:'A number is divisible by 8 when the number made by its last THREE digits is.',
    explanation:'216 ÷ 8 = 27 exactly. The others all leave a remainder of 4: 316 ÷ 8 = 39.5, 428 ÷ 8 = 53.5 and 612 ÷ 8 = 76.5. Being even is not enough — all four numbers here are even.' }),

  makeNum({ id:'g7m-factors-013', chapterId:'g7m-factors', difficulty:3,
    subsection:'divisibility',
    question:'A digit has been rubbed out of the three-digit number 4 ★ 2, and the number is known to be divisible by 9. What is the missing digit?',
    answer:3,
    hint:'For 9 the test is on the DIGIT SUM, not on the last digit.',
    explanation:'The digits must add to a multiple of 9. 4 + ★ + 2 = 6 + ★, so ★ = 3 gives 9 and the number is 432 = 9 × 48. A digit of 0 gives a sum of 6, which passes the test for 3 but not for 9.' }),

  makeMCQ({ id:'g7m-factors-014', chapterId:'g7m-factors', difficulty:2,
    subsection:'divisibility',
    question:'Which number is divisible by 3 but NOT by 9?',
    options:['138','153','189','207'],
    answer:'138',
    hint:'Add the digits. A multiple of 3 has a digit sum in the 3 times table; a multiple of 9 needs it in the 9 times table.',
    explanation:'1 + 3 + 8 = 12, a multiple of 3 but not of 9. The other three all have digit sums that are multiples of 9: 153 gives 9, 189 gives 18 and 207 gives 9, so each of them passes BOTH tests.' }),

  makeNum({ id:'g7m-factors-015', chapterId:'g7m-factors', difficulty:3,
    subsection:'hcf_lcm',
    question:'Find the HCF (Highest Common Factor) of 42 and 70.',
    answer:14,
    hint:'Break each number into primes and keep only the primes that appear in BOTH.',
    explanation:'42 = 2 × 3 × 7 and 70 = 2 × 5 × 7, so the shared primes are 2 and 7 and the HCF is 2 × 7 = 14. Answering 7 keeps only one of the two shared primes; 210 is the LCM, which is what you get by keeping everything.' }),

  makeNum({ id:'g7m-factors-016', chapterId:'g7m-factors', difficulty:4,
    subsection:'hcf_lcm',
    question:'A Grade 7 teacher has 48 pencils, 60 erasers and 36 sharpeners. She wants to make identical gift packs for prize day, using every item with nothing left over. If she makes as MANY packs as possible, how many pencils go into each pack?',
    answer:4,
    hint:'The greatest number of packs is the HCF of the three amounts. Only then divide.',
    explanation:'HCF(48, 60, 36) = 12, so she makes 12 packs, and 48 ÷ 12 = 4 pencils in each. Answering 12 stops at the number of packs; answering 48 ÷ 4 = 12 mixes up what was asked for. Check the rest: 60 ÷ 12 = 5 erasers and 36 ÷ 12 = 3 sharpeners, both whole.' }),

  makeMCQ({ id:'g7m-factors-017', chapterId:'g7m-factors', difficulty:3,
    subsection:'hcf_lcm',
    question:'Two numbers have an HCF of 6 and an LCM of 72. One of the numbers is 24. What is the other?',
    options:['18','12','36','48'],
    answer:'18',
    hint:'For any two numbers, HCF × LCM equals the product of the numbers themselves.',
    explanation:'6 × 72 = 432, and 432 ÷ 24 = 18. Check it: HCF(24, 18) = 6 and LCM(24, 18) = 72. With 12 the LCM would be 24, with 36 the HCF would be 12, and with 48 the HCF would be 24.' }),

  makeMCQ({ id:'g7m-factors-018', chapterId:'g7m-factors', difficulty:2,
    subsection:'prime_factors',
    question:'Which of these numbers has exactly THREE different prime factors?',
    options:['30','24','32','49'],
    answer:'30',
    hint:'Count the DIFFERENT primes, not how many times each one is repeated.',
    explanation:'30 = 2 × 3 × 5, which is three different primes. 24 = 2³ × 3 has only two, 32 = 2⁵ has only one however many times the 2 is repeated, and 49 = 7² has one.' }),

  makeNum({ id:'g7m-factors-019', chapterId:'g7m-factors', difficulty:3,
    subsection:'prime_factors',
    question:'The prime factorisation of 84 is 2² × 3 × 7. How many factors does 84 have altogether, counting 1 and 84 themselves?',
    answer:12,
    hint:'Add one to each index, then multiply those results together.',
    explanation:'The indices are 2, 1 and 1, so the count is (2 + 1) × (1 + 1) × (1 + 1) = 3 × 2 × 2 = 12. Listing them confirms it: 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84. Answering 3 counts only the different primes.' }),

  makeMCQ({ id:'g7m-factors-020', chapterId:'g7m-factors', difficulty:3,
    subsection:'prime_factors',
    question:'Two numbers have prime factorisations 2² × 3 × 5 and 2 × 3² × 5. What is their LCM?',
    options:['180','60','30','360'],
    answer:'180',
    hint:'For an LCM take every prime that appears, each with its HIGHEST index.',
    explanation:'The highest powers are 2², 3² and 5, so the LCM is 4 × 9 × 5 = 180. Taking the LOWEST index of each instead gives 2 × 3 × 5 = 30, which is the HCF, and 60 is just the first number itself.' })

);
