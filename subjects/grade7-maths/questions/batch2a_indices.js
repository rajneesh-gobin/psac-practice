'use strict';
// Grade 7 Maths — g7m-indices, batch 2A (012–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-indices-012', chapterId:'g7m-indices', difficulty:1,
    subsection:'index_notation',
    question:'In the expression 9⁵, what name is given to the 5?',
    options:['The index','The base','The factor','The product'],
    answer:'The index',
    hint:'It is the small raised number, and it counts how many times something is written.',
    explanation:'The 5 is the index (or power) and tells you 9 is used as a factor five times; 9 is the base. A factor is one of the nines themselves, and the product is the value you get after multiplying.' }),

  makeMCQ({ id:'g7m-indices-013', chapterId:'g7m-indices', difficulty:2,
    subsection:'index_notation',
    question:'How is 3 × 3 × 5 × 5 × 5 written in index form?',
    options:['3² × 5³','3³ × 5²','3² + 5³','(3 × 5)⁵'],
    answer:'3² × 5³',
    hint:'Count how many times each different number appears, and keep the multiplication sign between them.',
    explanation:'Three appears twice and five appears three times, giving 3² × 5³. The second option swaps the two counts, the third replaces × with +, and (3 × 5)⁵ means 15 multiplied by itself five times.' }),

  makeNum({ id:'g7m-indices-014', chapterId:'g7m-indices', difficulty:2,
    subsection:'index_notation',
    question:'Ten thousand can be written as a power of ten: 10 000 = 10ⁿ. What is the value of n?',
    answer:4,
    hint:'Count the zeros after the 1.',
    explanation:'10 000 = 10 × 10 × 10 × 10, so n = 4. Counting all five digits of 10 000 gives 5, which would be 100 000 — one zero too many.' }),

  makeMCQ({ id:'g7m-indices-015', chapterId:'g7m-indices', difficulty:3,
    subsection:'index_notation',
    question:'Bimal wrote 4³ = 12 in his exercise book. What mistake did he make?',
    options:['He multiplied 4 by 3','He added 4 and 3','He divided 4 into 3','He squared 4 not cubed'],
    answer:'He multiplied 4 by 3',
    hint:'Work out what 4³ really means, then ask what calculation gives 12.',
    explanation:'4 × 3 = 12, so he treated the index as an ordinary factor; 4³ actually means 4 × 4 × 4 = 64. Adding gives 7, dividing gives a fraction, and squaring would have given 16 — none of them 12.' }),

  makeNum({ id:'g7m-indices-016', chapterId:'g7m-indices', difficulty:2,
    subsection:'evaluating_powers',
    question:'What is the value of 2⁴ × 3²?',
    answer:144,
    hint:'Work out each power on its own before you multiply the two results together.',
    explanation:'2⁴ = 16 and 3² = 9, so 16 × 9 = 144. Multiplying the bases and adding the indices (6⁶) is not a rule that exists — that shortcut only works when the BASES match.' }),

  makeMCQ({ id:'g7m-indices-017', chapterId:'g7m-indices', difficulty:3,
    subsection:'evaluating_powers',
    question:'Which of these powers has the LARGEST value?',
    options:['3⁴','2⁶','5²','4³'],
    answer:'3⁴',
    hint:'A big base does not always win. Work each one out fully before choosing.',
    explanation:'3⁴ = 81, which beats 2⁶ = 64, 4³ = 64 and 5² = 25. Choosing 5² because 5 is the biggest base ignores how small the index is.' }),

  makeNum({ id:'g7m-indices-018', chapterId:'g7m-indices', difficulty:4,
    subsection:'evaluating_powers',
    question:'In a science lesson a culture of 5 bacteria is left in a warm cupboard at 08:00. The number of bacteria doubles every hour. How many bacteria are there at 12:00?',
    answer:80,
    hint:'First count the hours that pass, then write the doubling as a power of 2.',
    explanation:'From 08:00 to 12:00 is 4 hours, so the count is 5 × 2⁴ = 5 × 16 = 80. Using 2⁵ counts five doublings for four hours and gives 160; multiplying 5 × 2 × 4 treats the index as an ordinary factor and gives 40.' }),

  makeNum({ id:'g7m-indices-019', chapterId:'g7m-indices', difficulty:3,
    subsection:'prime_factorisation',
    question:'Written as a product of prime factors, 180 = 2² × 3² × 5. Write 540 in the same way. What is the INDEX of 3 in your answer?',
    answer:3,
    hint:'540 is three times 180, and that extra 3 has to go somewhere.',
    explanation:'540 = 180 × 3 = 2² × 3² × 5 × 3 = 2² × 3³ × 5, so the index of 3 is 3. Leaving it at 2 forgets the extra factor, and 4 would make the number 1 620.' }),

  makeMCQ({ id:'g7m-indices-020', chapterId:'g7m-indices', difficulty:3,
    subsection:'prime_factorisation',
    question:'A number written as a product of prime factors is 2³ × 3 × 5². What is the number?',
    options:['600','300','150','1200'],
    answer:'600',
    hint:'Turn each power into an ordinary number first, then multiply the three of them.',
    explanation:'2³ = 8 and 5² = 25, so the number is 8 × 3 × 25 = 600. Reading 2³ as 2² gives 4 × 3 × 25 = 300, dropping the cube to a single 2 gives 150, and one doubling too many gives 1 200.' })

);
