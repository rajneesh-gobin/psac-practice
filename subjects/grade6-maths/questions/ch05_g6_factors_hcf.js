'use strict';
// Grade 6 Maths — Chapter: Factors, HCF & LCM
// IDs format: g6m-hcf-NNN

// Factor tree SVG for 36
const _SVG_TREE = `<svg viewBox="0 0 220 120" width="220" height="120" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <text x="110" y="18" text-anchor="middle" font-size="12" fill="#1e40af" font-weight="bold">36</text>
  <line x1="90" y1="22" x2="65" y2="42" stroke="#64748b" stroke-width="1.5"/>
  <line x1="130" y1="22" x2="155" y2="42" stroke="#64748b" stroke-width="1.5"/>
  <text x="60" y="54" text-anchor="middle" font-size="11" fill="#334155">4</text>
  <text x="160" y="54" text-anchor="middle" font-size="11" fill="#334155">9</text>
  <line x1="50" y1="58" x2="35" y2="76" stroke="#64748b" stroke-width="1.5"/>
  <line x1="70" y1="58" x2="85" y2="76" stroke="#64748b" stroke-width="1.5"/>
  <line x1="150" y1="58" x2="135" y2="76" stroke="#64748b" stroke-width="1.5"/>
  <line x1="170" y1="58" x2="185" y2="76" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="33" cy="84" r="10" fill="#dc2626" opacity="0.8"/>
  <text x="33" y="88" text-anchor="middle" font-size="9" fill="white" font-weight="bold">2</text>
  <circle cx="87" cy="84" r="10" fill="#dc2626" opacity="0.8"/>
  <text x="87" y="88" text-anchor="middle" font-size="9" fill="white" font-weight="bold">2</text>
  <circle cx="133" cy="84" r="10" fill="#dc2626" opacity="0.8"/>
  <text x="133" y="88" text-anchor="middle" font-size="9" fill="white" font-weight="bold">3</text>
  <circle cx="187" cy="84" r="10" fill="#dc2626" opacity="0.8"/>
  <text x="187" y="88" text-anchor="middle" font-size="9" fill="white" font-weight="bold">3</text>
  <text x="110" y="110" text-anchor="middle" font-size="7.5" fill="#475569">36 = 2 &#215; 2 &#215; 3 &#215; 3 = 2&#178; &#215; 3&#178;</text>
  <text x="110" y="120" text-anchor="middle" font-size="6.5" fill="#64748b">Red circles = prime factors</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-hcf-001', chapterId:'g6-factors-hcf', difficulty:1,
    question:'What is a PRIME NUMBER?',
    options:[
      'A number divisible by itself only',
      'A number that has exactly two factors: 1 and itself',
      'An even number greater than 2',
      'A number divisible by 2 and 3'
    ],
    answer:'A number that has exactly two factors: 1 and itself',
    hint:'Examples: 2, 3, 5, 7, 11, 13... Is 1 prime?',
    explanation:'A <b>prime number</b> has exactly <b>two factors</b>: 1 and itself. Examples: 2, 3, 5, 7, 11. Note: 1 is NOT prime (it has only one factor). 2 is the only even prime number.' }),

  makeMCQ({ id:'g6m-hcf-002', chapterId:'g6-factors-hcf', difficulty:1,
    question:'Which of these numbers is a COMPOSITE number?',
    options:['7','13','15','19'],
    answer:'15',
    hint:'A composite number has more than 2 factors.',
    explanation:'<b>15</b> is composite — its factors are 1, 3, 5 and 15 (more than 2 factors). 7, 13 and 19 are all prime (exactly 2 factors each).' }),

  makeMCQ({ id:'g6m-hcf-003', chapterId:'g6-factors-hcf', difficulty:2,
    question:`${_SVG_TREE}Using the factor tree, what is the prime factorisation of 36?`,
    options:['2 × 2 × 9','4 × 9','2 × 2 × 3 × 3','2 × 18'],
    answer:'2 × 2 × 3 × 3',
    hint:'Look at the red circles in the factor tree — these are all prime.',
    explanation:'From the factor tree: 36 = 4 × 9 = (2 × 2) × (3 × 3) = <b>2 × 2 × 3 × 3</b> = 2² × 3². This is the prime factorisation — all factors are prime numbers.' }),

  makeNum({ id:'g6m-hcf-004', chapterId:'g6-factors-hcf', difficulty:2,
    question:'Find the <b>Highest Common Factor (HCF)</b> of 24 and 36.',
    answer:'12', acceptableAnswers:['12'],
    hint:'Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. What is the biggest common one?',
    explanation:'Factors of 24: 1, 2, 3, 4, 6, 8, <b>12</b>, 24. Factors of 36: 1, 2, 3, 4, 6, 9, <b>12</b>, 18, 36. The highest common factor is <b>12</b>.' }),

  makeNum({ id:'g6m-hcf-005', chapterId:'g6-factors-hcf', difficulty:2,
    question:'Find the <b>Lowest Common Multiple (LCM)</b> of 4 and 6.',
    answer:'12', acceptableAnswers:['12'],
    hint:'Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... What is the first common multiple?',
    explanation:'Multiples of 4: 4, 8, <b>12</b>, 16, 20... Multiples of 6: 6, <b>12</b>, 18... The first number in both lists is <b>12</b>, so LCM(4, 6) = 12.' }),

  makeNum({ id:'g6m-hcf-006', chapterId:'g6-factors-hcf', difficulty:2,
    question:'Find the HCF of 18 and 30.',
    answer:'6', acceptableAnswers:['6'],
    hint:'List all factors of each number, then find the biggest shared factor.',
    explanation:'Factors of 18: 1, 2, 3, <b>6</b>, 9, 18. Factors of 30: 1, 2, 3, 5, <b>6</b>, 10, 15, 30. HCF = <b>6</b>.' }),

  makeNum({ id:'g6m-hcf-007', chapterId:'g6-factors-hcf', difficulty:2,
    question:'Find the LCM of 5 and 8.',
    answer:'40', acceptableAnswers:['40'],
    hint:'Since 5 and 8 share no common factors (HCF = 1), LCM = 5 × 8.',
    explanation:'5 and 8 share no common factors other than 1 (they are co-prime). LCM = 5 × 8 = <b>40</b>.' }),

  makeMCQ({ id:'g6m-hcf-008', chapterId:'g6-factors-hcf', difficulty:2,
    question:'Two bells ring at the same time. Bell A rings every 4 minutes, Bell B rings every 6 minutes. After how many minutes will they NEXT ring together?',
    options:['4 minutes','6 minutes','10 minutes','12 minutes'],
    answer:'12 minutes',
    hint:'This is a Lowest Common Multiple problem.',
    explanation:'We need the LCM of 4 and 6. LCM(4, 6) = <b>12</b>. They will next ring together after 12 minutes.' }),

  makeTF({ id:'g6m-hcf-009', chapterId:'g6-factors-hcf', difficulty:1,
    question:'The number 1 is a prime number.',
    answer:false,
    hint:'A prime must have exactly TWO factors.',
    explanation:'<b>1 is NOT prime</b>. It has only one factor (itself). A prime number must have exactly two distinct factors: 1 and itself. 1 has only one factor (1), so it is neither prime nor composite.' }),

  makeNum({ id:'g6m-hcf-010', chapterId:'g6-factors-hcf', difficulty:2,
    question:'A shopkeeper has 48 apples and 36 oranges. He wants to pack them into bags with the SAME number of each fruit in every bag, with no fruit left over. What is the maximum number of bags he can make?',
    answer:'12', acceptableAnswers:['12'],
    hint:'Find the HCF of 48 and 36.',
    explanation:'We need HCF(48, 36). Factors of 48: 1,2,3,4,6,8,<b>12</b>,16,24,48. Factors of 36: 1,2,3,4,6,9,<b>12</b>,18,36. HCF = 12. He can make <b>12 bags</b> (each with 4 apples and 3 oranges).' })

);
