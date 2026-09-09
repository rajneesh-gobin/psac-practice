'use strict';
(function () {

// Grade 3 Maths — Money to Rs 1000  (g3mth-mon-001 … g3mth-mon-090)
// Source: MIE Maths Grade 3 Part 2 pp.142-163
// Three subsections: coins_notes_100 · money_to_1000 · money_problems

// ── coins_notes_100 (001–030) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3mth-mon-001', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="Mauritian coins">' +
      '<svg viewBox="0 0 280 90" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="35" cy="45" r="28" fill="#D4AF37" stroke="#B8860B" stroke-width="2"/>' +
      '<text x="35" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#5D4037">Rs 1</text>' +
      '<circle cx="105" cy="45" r="28" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="2"/>' +
      '<text x="105" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#1A1A1A">Rs 5</text>' +
      '<circle cx="175" cy="45" r="28" fill="#D4AF37" stroke="#B8860B" stroke-width="2"/>' +
      '<text x="175" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#5D4037">10c</text>' +
      '<circle cx="245" cy="45" r="28" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="2"/>' +
      '<text x="245" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#1A1A1A">25c</text>' +
      '</svg></div>' +
      'Which coin has the highest value?',
    options:['Rs 1','Rs 5','10 cents','25 cents'], answer:'Rs 5',
    hint:'Compare the values of all coins shown.',
    explanation:'Rs 5 is worth more than Rs 1, 25 cents or 10 cents. <b>Rs 5</b> has the highest value.' }),

  makeMCQ({ id:'g3mth-mon-002', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'How many 10-cent coins make up Rs 1?',
    options:['5','8','10','12'], answer:'10',
    hint:'Rs 1 = 100 cents. 100 ÷ 10 = ?',
    explanation:'Rs 1 = 100 cents. 100 ÷ 10 = <b>10</b> ten-cent coins.' }),

  makeMCQ({ id:'g3mth-mon-003', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'How many 25-cent coins make up Rs 1?',
    options:['2','3','4','5'], answer:'4',
    hint:'Rs 1 = 100 cents. 100 ÷ 25 = ?',
    explanation:'100 ÷ 25 = <b>4</b> twenty-five cent coins make Rs 1.' }),

  makeMCQ({ id:'g3mth-mon-004', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three Rs 5 coins">' +
      '<svg viewBox="0 0 200 80" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="40" cy="40" r="32" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="2"/>' +
      '<text x="40" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="#1A1A1A">Rs 5</text>' +
      '<circle cx="110" cy="40" r="32" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="2"/>' +
      '<text x="110" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="#1A1A1A">Rs 5</text>' +
      '<circle cx="180" cy="40" r="32" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="2"/>' +
      '<text x="180" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="#1A1A1A">Rs 5</text>' +
      '</svg></div>' +
      'What is the total value of these 3 coins?',
    options:['Rs 10','Rs 12','Rs 15','Rs 20'], answer:'Rs 15',
    hint:'3 × Rs 5 = ?',
    explanation:'3 × Rs 5 = <b>Rs 15</b>.' }),

  makeMCQ({ id:'g3mth-mon-005', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'How much is 2 fifty-rupee notes worth?',
    options:['Rs 50','Rs 75','Rs 100','Rs 150'], answer:'Rs 100',
    hint:'2 × Rs 50 = ?',
    explanation:'2 × Rs 50 = <b>Rs 100</b>.' }),

  makeMCQ({ id:'g3mth-mon-006', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'You have 4 Rs 10 coins and 2 Rs 5 coins. How much do you have in total?',
    options:['Rs 45','Rs 50','Rs 55','Rs 60'], answer:'Rs 50',
    hint:'4 × Rs 10 = Rs 40. 2 × Rs 5 = Rs 10. Add them.',
    explanation:'Rs 40 + Rs 10 = <b>Rs 50</b>.' }),

  makeMCQ({ id:'g3mth-mon-007', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'A book costs Rs 35. You pay with a Rs 50 note. How much change do you get?',
    options:['Rs 10','Rs 15','Rs 20','Rs 25'], answer:'Rs 15',
    hint:'50 − 35 = ?',
    explanation:'Rs 50 − Rs 35 = <b>Rs 15</b> change.' }),

  makeMCQ({ id:'g3mth-mon-008', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'Which combination gives exactly Rs 20?',
    options:['3 × Rs 5 + 2 × Rs 1','2 × Rs 10','4 × Rs 5 + Rs 2','1 × Rs 10 + 3 × Rs 5'], answer:'2 × Rs 10',
    hint:'2 × Rs 10 = Rs 20.',
    explanation:'2 × Rs 10 = <b>Rs 20</b>.' }),

  makeNum({ id:'g3mth-mon-009', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Asha has 3 Rs 10 coins, 2 Rs 5 coins and 4 Rs 1 coins. How much money does she have altogether?',
    answer:44, tolerance:0,
    hint:'3×10 = 30. 2×5 = 10. 4×1 = 4. Total = ?',
    explanation:'30 + 10 + 4 = <b>Rs 44</b>.' }),

  makeMCQ({ id:'g3mth-mon-010', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'You have a Rs 100 note. You spend Rs 63. How much change do you get?',
    options:['Rs 27','Rs 33','Rs 37','Rs 47'], answer:'Rs 37',
    hint:'100 − 63 = ?',
    explanation:'100 − 63 = <b>Rs 37</b>.' }),

  makeMCQ({ id:'g3mth-mon-011', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Ravi wants to buy a pencil for Rs 12. He has 1 Rs 10 coin and 3 Rs 1 coins. Does he have enough?',
    options:['Yes, he has Rs 13','No, he only has Rs 11','Yes, he has Rs 12 exactly','No, he has Rs 10'],
    answer:'Yes, he has Rs 13',
    hint:'Rs 10 + 3 × Rs 1 = Rs 13. Is Rs 13 ≥ Rs 12?',
    explanation:'Rs 10 + Rs 3 = Rs 13. Yes, he has more than Rs 12 — he has <b>Rs 13</b>, enough to buy the pencil.' }),

  makeMCQ({ id:'g3mth-mon-012', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'What is the total of Rs 45 + Rs 38?',
    options:['Rs 73','Rs 80','Rs 83','Rs 86'], answer:'Rs 83',
    hint:'45 + 38 = ?',
    explanation:'45 + 38 = <b>Rs 83</b>.' }),

  makeMCQ({ id:'g3mth-mon-013', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'A toy costs Rs 75. You have Rs 50 and Rs 30. Do you have enough to buy it?',
    options:['Yes, you have Rs 80','Yes, you have Rs 75 exactly','No, you have Rs 70','No, you have Rs 65'],
    answer:'Yes, you have Rs 80',
    hint:'Rs 50 + Rs 30 = Rs 80. Is Rs 80 ≥ Rs 75?',
    explanation:'Rs 50 + Rs 30 = Rs 80. You have Rs 80, which is more than Rs 75. <b>Yes</b>, you have enough.' }),

  makeMCQ({ id:'g3mth-mon-014', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Meena buys a fruit for Rs 18 and a drink for Rs 12. How much does she spend altogether?',
    options:['Rs 24','Rs 28','Rs 30','Rs 32'], answer:'Rs 30',
    hint:'18 + 12 = ?',
    explanation:'Rs 18 + Rs 12 = <b>Rs 30</b>.' }),

  makeNum({ id:'g3mth-mon-015', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Dev has Rs 100. He buys a pen for Rs 28 and a ruler for Rs 15. How much money does he have left?',
    answer:57, tolerance:0,
    hint:'100 − 28 − 15 = ? Or: 100 − (28+15).',
    explanation:'28 + 15 = 43. 100 − 43 = <b>Rs 57</b>.' }),

  makeMCQ({ id:'g3mth-mon-016', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'What coins make exactly 75 cents?',
    options:['3 × 25c','7 × 10c + 1 × 5c','2 × 25c + 2 × 10c + 1 × 5c','All of the above'],
    answer:'All of the above',
    hint:'Check each: 3×25=75. 70+5=75. 50+20+5=75.',
    explanation:'3×25c = 75c. 7×10c + 5c = 75c. 2×25c + 2×10c + 5c = 75c. <b>All</b> make exactly 75 cents.' }),

  makeTF({ id:'g3mth-mon-017', chapterId:'g3mth-money', difficulty:1, subsection:'coins_notes_100',
    question:'Rs 100 is worth more than Rs 50.',
    answer:true,
    explanation:'Yes — Rs 100 > Rs 50. True!' }),

  makeMCQ({ id:'g3mth-mon-018', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'A sweet costs Rs 2. How many sweets can you buy with Rs 20?',
    options:['8','9','10','11'], answer:'10',
    hint:'20 ÷ 2 = ?',
    explanation:'20 ÷ 2 = <b>10</b> sweets.' }),

  makeMCQ({ id:'g3mth-mon-019', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Sana saves Rs 5 per day. How much does she save in 2 weeks (14 days)?',
    options:['Rs 60','Rs 65','Rs 70','Rs 75'], answer:'Rs 70',
    hint:'14 × Rs 5 = ?',
    explanation:'14 × 5 = <b>Rs 70</b>.' }),

  makeNum({ id:'g3mth-mon-020', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'You spend Rs 43 from Rs 100. How much change should you receive?',
    answer:57, tolerance:0,
    hint:'100 − 43 = ?',
    explanation:'100 − 43 = <b>Rs 57</b> change.' }),

  makeMCQ({ id:'g3mth-mon-021', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Which is greater: 4 × Rs 25 or 3 × Rs 35?',
    options:['4 × Rs 25','3 × Rs 35','Both the same','Cannot tell'], answer:'3 × Rs 35',
    hint:'4×25=100. 3×35=105. Compare.',
    explanation:'4 × 25 = Rs 100. 3 × 35 = Rs 105. <b>3 × Rs 35</b> is greater.' }),

  makeTF({ id:'g3mth-mon-022', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'2 × Rs 50 = 1 × Rs 100.',
    answer:true,
    explanation:'2 × 50 = 100. Yes — Rs 100 = two fifty-rupee notes. True!' }),

  makeMCQ({ id:'g3mth-mon-023', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'The price of a book is Rs 68 and a pencil is Rs 12. How much do both cost together?',
    options:['Rs 70','Rs 78','Rs 80','Rs 82'], answer:'Rs 80',
    hint:'68 + 12 = ?',
    explanation:'68 + 12 = <b>Rs 80</b>.' }),

  makeNum({ id:'g3mth-mon-024', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'A mango costs Rs 8. How many mangoes can you buy for Rs 72?',
    answer:9, tolerance:0,
    hint:'72 ÷ 8 = ?',
    explanation:'72 ÷ 8 = <b>9</b> mangoes.' }),

  makeMCQ({ id:'g3mth-mon-025', chapterId:'g3mth-money', difficulty:2, subsection:'coins_notes_100',
    question:'Lena has Rs 95. She needs Rs 100 to buy a gift. How much more does she need?',
    options:['Rs 3','Rs 4','Rs 5','Rs 6'], answer:'Rs 5',
    hint:'100 − 95 = ?',
    explanation:'100 − 95 = <b>Rs 5</b> more needed.' }),

  makeMCQ({ id:'g3mth-mon-026', chapterId:'g3mth-money', difficulty:3, subsection:'coins_notes_100',
    question:'Jake earns Rs 15 every day. After 6 days, he spends Rs 40. How much does he have left?',
    options:['Rs 40','Rs 45','Rs 50','Rs 55'], answer:'Rs 50',
    hint:'Earnings = 6 × 15 = 90. 90 − 40 = ?',
    explanation:'6 × 15 = Rs 90. Rs 90 − Rs 40 = <b>Rs 50</b>.' }),

  makeNum({ id:'g3mth-mon-027', chapterId:'g3mth-money', difficulty:3, subsection:'coins_notes_100',
    question:'A shopkeeper has Rs 75. A customer pays with a Rs 100 note for goods costing Rs 75. How much change does the shopkeeper give?',
    answer:25, tolerance:0,
    hint:'100 − 75 = ?',
    explanation:'100 − 75 = <b>Rs 25</b> change.' }),

  makeMCQ({ id:'g3mth-mon-028', chapterId:'g3mth-money', difficulty:3, subsection:'coins_notes_100',
    question:'Three children together have Rs 96. If they share equally, how much does each child get?',
    options:['Rs 24','Rs 30','Rs 32','Rs 36'], answer:'Rs 32',
    hint:'96 ÷ 3 = ?',
    explanation:'96 ÷ 3 = <b>Rs 32</b> each.' }),

  makeMCQ({ id:'g3mth-mon-029', chapterId:'g3mth-money', difficulty:3, subsection:'coins_notes_100',
    question:'A box of 5 pens costs Rs 35. What is the cost of one pen?',
    options:['Rs 5','Rs 6','Rs 7','Rs 8'], answer:'Rs 7',
    hint:'35 ÷ 5 = ?',
    explanation:'35 ÷ 5 = <b>Rs 7</b> per pen.' }),

  makeNum({ id:'g3mth-mon-030', chapterId:'g3mth-money', difficulty:3, subsection:'coins_notes_100',
    question:'Priya has Rs 50. She buys 3 biscuits at Rs 8 each and a drink for Rs 12. How much money does she have left?',
    answer:14, tolerance:0,
    hint:'3×8=24. 24+12=36. 50−36=?',
    explanation:'3 biscuits = Rs 24. Drink = Rs 12. Total spent = Rs 36. Change = 50 − 36 = <b>Rs 14</b>.' }),

// ── money_to_1000 (031–060) ───────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-mon-031', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:'Which note has the largest value?',
    options:['Rs 100','Rs 200','Rs 500','Rs 1000'], answer:'Rs 1000',
    hint:'Bigger number = larger value.',
    explanation:'<b>Rs 1000</b> is the largest note mentioned.' }),

  makeMCQ({ id:'g3mth-mon-032', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:'How many Rs 100 notes make Rs 1000?',
    options:['5','8','10','12'], answer:'10',
    hint:'1000 ÷ 100 = ?',
    explanation:'1000 ÷ 100 = <b>10</b> hundred-rupee notes.' }),

  makeMCQ({ id:'g3mth-mon-033', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:'How many Rs 500 notes make Rs 1000?',
    options:['1','2','3','4'], answer:'2',
    hint:'1000 ÷ 500 = ?',
    explanation:'1000 ÷ 500 = <b>2</b> five-hundred-rupee notes.' }),

  makeMCQ({ id:'g3mth-mon-034', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="banknotes">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="20" width="80" height="50" rx="4" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>' +
      '<text x="50" y="50" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Rs 100</text>' +
      '<rect x="110" y="20" width="80" height="50" rx="4" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>' +
      '<text x="150" y="50" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Rs 100</text>' +
      '<rect x="210" y="20" width="80" height="50" rx="4" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>' +
      '<text x="250" y="50" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Rs 100</text>' +
      '</svg></div>' +
      'What is the total value of these 3 notes?',
    options:['Rs 100','Rs 200','Rs 300','Rs 400'], answer:'Rs 300',
    hint:'3 × Rs 100 = ?',
    explanation:'3 × Rs 100 = <b>Rs 300</b>.' }),

  makeMCQ({ id:'g3mth-mon-035', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A bicycle costs Rs 850. You have Rs 600. How much more do you need?',
    options:['Rs 200','Rs 225','Rs 250','Rs 275'], answer:'Rs 250',
    hint:'850 − 600 = ?',
    explanation:'850 − 600 = <b>Rs 250</b> more needed.' }),

  makeMCQ({ id:'g3mth-mon-036', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A bag costs Rs 375 and a pair of shoes costs Rs 525. What is the total cost?',
    options:['Rs 800','Rs 875','Rs 900','Rs 950'], answer:'Rs 900',
    hint:'375 + 525 = ?',
    explanation:'375 + 525 = <b>Rs 900</b>.' }),

  makeNum({ id:'g3mth-mon-037', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'Ravi has Rs 1000. He buys a chair for Rs 450. How much money does he have left?',
    answer:550, tolerance:0,
    hint:'1000 − 450 = ?',
    explanation:'1000 − 450 = <b>Rs 550</b>.' }),

  makeMCQ({ id:'g3mth-mon-038', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A family spends Rs 250 on food, Rs 180 on transport and Rs 120 on clothes. What is the total spending?',
    options:['Rs 500','Rs 540','Rs 550','Rs 600'], answer:'Rs 550',
    hint:'250 + 180 + 120 = ?',
    explanation:'250 + 180 + 120 = <b>Rs 550</b>.' }),

  makeMCQ({ id:'g3mth-mon-039', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A student saves Rs 75 per week. How much does she save in 8 weeks?',
    options:['Rs 500','Rs 575','Rs 600','Rs 650'], answer:'Rs 600',
    hint:'8 × 75 = ?',
    explanation:'8 × 75 = <b>Rs 600</b>.' }),

  makeMCQ({ id:'g3mth-mon-040', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A washing machine costs Rs 1000. Mr Raj pays Rs 650 now. How much is remaining?',
    options:['Rs 300','Rs 325','Rs 350','Rs 400'], answer:'Rs 350',
    hint:'1000 − 650 = ?',
    explanation:'1000 − 650 = <b>Rs 350</b> remaining.' }),

  makeTF({ id:'g3mth-mon-041', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:'Rs 500 + Rs 500 = Rs 1000.',
    answer:true,
    explanation:'Yes — 500 + 500 = 1000. True!' }),

  makeMCQ({ id:'g3mth-mon-042', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'Four friends each contribute Rs 200 to buy a gift. What is the total amount?',
    options:['Rs 600','Rs 700','Rs 800','Rs 900'], answer:'Rs 800',
    hint:'4 × Rs 200 = ?',
    explanation:'4 × 200 = <b>Rs 800</b>.' }),

  makeMCQ({ id:'g3mth-mon-043', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A storybook costs Rs 165 and a colouring book costs Rs 95. What is the total?',
    options:['Rs 250','Rs 255','Rs 260','Rs 265'], answer:'Rs 260',
    hint:'165 + 95 = ?',
    explanation:'165 + 95 = <b>Rs 260</b>.' }),

  makeNum({ id:'g3mth-mon-044', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'Meena saves Rs 150 in January, Rs 200 in February and Rs 250 in March. How much has she saved altogether?',
    answer:600, tolerance:0,
    hint:'150 + 200 + 250 = ?',
    explanation:'150 + 200 + 250 = <b>Rs 600</b>.' }),

  makeMCQ({ id:'g3mth-mon-045', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'Which combination gives exactly Rs 1000?',
    options:['Rs 500 + Rs 400','Rs 700 + Rs 200','Rs 600 + Rs 400','Rs 750 + Rs 225'],
    answer:'Rs 600 + Rs 400',
    hint:'Check each: 500+400=900, 700+200=900, 600+400=1000, 750+225=975.',
    explanation:'600 + 400 = <b>Rs 1000</b>.' }),

  makeMCQ({ id:'g3mth-mon-046', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A TV costs Rs 900. Priya has Rs 350. Her sister gives her Rs 400. Does she have enough to buy the TV?',
    options:['Yes, she has Rs 750','Yes, she now has Rs 750, needs Rs 150 more','No, she has Rs 750','No, she needs Rs 150 more'],
    answer:'No, she needs Rs 150 more',
    hint:'350 + 400 = 750. Is 750 ≥ 900?',
    explanation:'Rs 350 + Rs 400 = Rs 750. The TV costs Rs 900. Rs 900 − Rs 750 = Rs 150 short. <b>No, she needs Rs 150 more</b>.' }),

  makeMCQ({ id:'g3mth-mon-047', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A phone costs Rs 750. You save Rs 125 per month. How many months do you need to save?',
    options:['4','5','6','7'], answer:'6',
    hint:'750 ÷ 125 = ?',
    explanation:'750 ÷ 125 = <b>6</b> months.' }),

  makeNum({ id:'g3mth-mon-048', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A family budget for the week is Rs 1000. They spend Rs 350 on food, Rs 200 on electricity and Rs 180 on transport. How much do they have left?',
    answer:270, tolerance:0,
    hint:'350 + 200 + 180 = 730. 1000 − 730 = ?',
    explanation:'Total spent = 350 + 200 + 180 = Rs 730. Remaining = 1000 − 730 = <b>Rs 270</b>.' }),

  makeMCQ({ id:'g3mth-mon-049', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A shopkeeper sells 3 shirts at Rs 200 each. He receives a Rs 1000 note. What change does he give?',
    options:['Rs 350','Rs 375','Rs 400','Rs 450'], answer:'Rs 400',
    hint:'3 × 200 = 600. 1000 − 600 = ?',
    explanation:'3 × Rs 200 = Rs 600. Change = Rs 1000 − Rs 600 = <b>Rs 400</b>.' }),

  makeMCQ({ id:'g3mth-mon-050', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'Asha earns Rs 150 each day she works. She works 5 days this week and 3 days next week. How much does she earn in both weeks?',
    options:['Rs 1000','Rs 1100','Rs 1200','Rs 1300'], answer:'Rs 1200',
    hint:'(5 + 3) × Rs 150 = 8 × 150 = ?',
    explanation:'8 × 150 = <b>Rs 1200</b>.' }),

  makeMCQ({ id:'g3mth-mon-051', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A table costs Rs 480 and 4 chairs cost Rs 120 each. What is the total furniture cost?',
    options:['Rs 880','Rs 940','Rs 960','Rs 1000'], answer:'Rs 960',
    hint:'4 × 120 = 480. 480 + 480 = ?',
    explanation:'4 × Rs 120 = Rs 480 for chairs. Total = Rs 480 + Rs 480 = <b>Rs 960</b>.' }),

  makeTF({ id:'g3mth-mon-052', chapterId:'g3mth-money', difficulty:1, subsection:'money_to_1000',
    question:'Rs 750 is more than Rs 700.',
    answer:true,
    explanation:'Yes — 750 > 700. True!' }),

  makeNum({ id:'g3mth-mon-053', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A child has 5 notes of Rs 200. How much money does she have in total?',
    answer:1000, tolerance:0,
    hint:'5 × 200 = ?',
    explanation:'5 × 200 = <b>Rs 1000</b>.' }),

  makeMCQ({ id:'g3mth-mon-054', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'A cupboard costs Rs 850. A shop offers Rs 50 off. What is the sale price?',
    options:['Rs 750','Rs 775','Rs 800','Rs 825'], answer:'Rs 800',
    hint:'850 − 50 = ?',
    explanation:'850 − 50 = <b>Rs 800</b>.' }),

  makeMCQ({ id:'g3mth-mon-055', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'Dev has Rs 1000 and buys 2 books at Rs 175 each and a pen at Rs 45. How much does he have left?',
    options:['Rs 575','Rs 600','Rs 605','Rs 625'], answer:'Rs 605',
    hint:'2×175=350. 350+45=395. 1000−395=?',
    explanation:'2 × 175 = 350. Total spent = 350 + 45 = 395. Change = 1000 − 395 = <b>Rs 605</b>.' }),

  makeNum({ id:'g3mth-mon-056', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'Three siblings together have Rs 900. The eldest has Rs 400, the middle child has Rs 300. How much does the youngest have?',
    answer:200, tolerance:0,
    hint:'900 − 400 − 300 = ?',
    explanation:'900 − 400 − 300 = <b>Rs 200</b>.' }),

  makeMCQ({ id:'g3mth-mon-057', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'Rs 1000 is shared equally among 4 children. How much does each child receive?',
    options:['Rs 200','Rs 225','Rs 250','Rs 275'], answer:'Rs 250',
    hint:'1000 ÷ 4 = ?',
    explanation:'1000 ÷ 4 = <b>Rs 250</b> each.' }),

  makeMCQ({ id:'g3mth-mon-058', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A fruit seller earns Rs 250 on Monday, Rs 320 on Tuesday and Rs 380 on Wednesday. How much did she earn over these 3 days?',
    options:['Rs 900','Rs 925','Rs 950','Rs 975'], answer:'Rs 950',
    hint:'250 + 320 + 380 = ?',
    explanation:'250 + 320 + 380 = <b>Rs 950</b>.' }),

  makeTF({ id:'g3mth-mon-059', chapterId:'g3mth-money', difficulty:2, subsection:'money_to_1000',
    question:'Rs 1000 = 2 × Rs 500.',
    answer:true,
    explanation:'Yes — 2 × 500 = 1000. True!' }),

  makeMCQ({ id:'g3mth-mon-060', chapterId:'g3mth-money', difficulty:3, subsection:'money_to_1000',
    question:'A school trip costs Rs 350 per child. If 6 children go on the trip, what is the total cost?',
    options:['Rs 1800','Rs 2000','Rs 2100','Rs 2250'], answer:'Rs 2100',
    hint:'6 × 350 = ?',
    explanation:'6 × 350 = <b>Rs 2100</b>.' }),

// ── money_problems (061–090) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3mth-mon-061', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'Ama has Rs 500. She buys a dress for Rs 320. How much change does she receive?',
    options:['Rs 160','Rs 170','Rs 180','Rs 190'], answer:'Rs 180',
    hint:'500 − 320 = ?',
    explanation:'500 − 320 = <b>Rs 180</b> change.' }),

  makeNum({ id:'g3mth-mon-062', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'A packet of biscuits costs Rs 35. How much do 6 packets cost?',
    answer:210, tolerance:0,
    hint:'6 × 35 = ?',
    explanation:'6 × 35 = <b>Rs 210</b>.' }),

  makeMCQ({ id:'g3mth-mon-063', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'Nita earns Rs 400 per week and saves Rs 150 of it. How much does she spend?',
    options:['Rs 225','Rs 240','Rs 250','Rs 260'], answer:'Rs 250',
    hint:'400 − 150 = ?',
    explanation:'400 − 150 = <b>Rs 250</b> spent.' }),

  makeMCQ({ id:'g3mth-mon-064', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'A kg of sugar costs Rs 45. How much do 3 kg cost?',
    options:['Rs 120','Rs 130','Rs 135','Rs 140'], answer:'Rs 135',
    hint:'3 × 45 = ?',
    explanation:'3 × 45 = <b>Rs 135</b>.' }),

  makeMCQ({ id:'g3mth-mon-065', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'Two children want to share the cost of a game that costs Rs 180 equally. How much does each pay?',
    options:['Rs 80','Rs 85','Rs 90','Rs 95'], answer:'Rs 90',
    hint:'180 ÷ 2 = ?',
    explanation:'180 ÷ 2 = <b>Rs 90</b> each.' }),

  makeMCQ({ id:'g3mth-mon-066', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A pencil case costs Rs 65. Pens cost Rs 15 each. Asha buys the pencil case and 4 pens. How much does she pay altogether?',
    options:['Rs 120','Rs 125','Rs 130','Rs 145'], answer:'Rs 125',
    hint:'4×15=60. 65+60=?',
    explanation:'4 × Rs 15 = Rs 60. Total = Rs 65 + Rs 60 = <b>Rs 125</b>.' }),

  makeNum({ id:'g3mth-mon-067', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Raj saves Rs 120 per month. After 6 months, he buys a toy for Rs 500. How much does he have left?',
    answer:220, tolerance:0,
    hint:'6×120=720. 720−500=?',
    explanation:'6 × 120 = Rs 720. Rs 720 − Rs 500 = <b>Rs 220</b>.' }),

  makeMCQ({ id:'g3mth-mon-068', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A family saves Rs 1000 a year. They want to buy a TV for Rs 4500. How many years must they save?',
    options:['3','4','5','6'], answer:'5',
    hint:'4500 ÷ 1000 = ?',
    explanation:'4500 ÷ 1000 = <b>4.5</b> years. Since they can only save whole years, they need <b>5</b> years.' }),

  makeMCQ({ id:'g3mth-mon-069', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'At a bakery, a cake costs Rs 250 and a pie costs Rs 180. Mrs Liu buys 2 cakes and 1 pie. She pays with Rs 1000. What change does she get?',
    options:['Rs 300','Rs 310','Rs 320','Rs 330'], answer:'Rs 320',
    hint:'2×250=500. 500+180=680. 1000−680=?',
    explanation:'2 × 250 = 500. Total = 500 + 180 = 680. Change = 1000 − 680 = <b>Rs 320</b>.' }),

  makeNum({ id:'g3mth-mon-070', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A school collects Rs 25 from each of 32 pupils for a trip. How much is collected in total?',
    answer:800, tolerance:0,
    hint:'32 × 25 = ?',
    explanation:'32 × 25 = <b>Rs 800</b>.' }),

  makeMCQ({ id:'g3mth-mon-071', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'Clothing costs Rs 680. Shoes cost Rs 270. Which costs more and by how much?',
    options:['Clothing by Rs 300','Clothing by Rs 410','Clothing by Rs 410','Shoes by Rs 100'],
    answer:'Clothing by Rs 410',
    hint:'680 − 270 = ?',
    explanation:'680 − 270 = <b>Rs 410</b>. Clothing costs more by Rs 410.' }),

  makeMCQ({ id:'g3mth-mon-072', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'A shopkeeper sells 5 kg of rice at Rs 55 per kg. How much does he earn?',
    options:['Rs 250','Rs 265','Rs 275','Rs 285'], answer:'Rs 275',
    hint:'5 × 55 = ?',
    explanation:'5 × 55 = <b>Rs 275</b>.' }),

  makeNum({ id:'g3mth-mon-073', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Layla wants to buy 4 notebooks at Rs 85 each. She has Rs 300. How much more money does she need?',
    answer:40, tolerance:0,
    hint:'4 × 85 = 340. 340 − 300 = ?',
    explanation:'4 × 85 = 340. 340 − 300 = <b>Rs 40</b> more needed.' }),

  makeMCQ({ id:'g3mth-mon-074', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A charity event raises Rs 250 on Monday, Rs 375 on Tuesday and Rs 425 on Wednesday. The target was Rs 1000. Did they reach their target?',
    options:['Yes, they raised Rs 1050','Yes, exactly Rs 1000','No, they only raised Rs 950','No, they only raised Rs 1000'],
    answer:'Yes, they raised Rs 1050',
    hint:'250 + 375 + 425 = ?',
    explanation:'250 + 375 + 425 = Rs 1050 — they surpassed the target of Rs 1000. <b>Yes, they raised Rs 1050</b>.' }),

  makeMCQ({ id:'g3mth-mon-075', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Raj has Rs 1000. He buys 3 shirts at Rs 150 each. He then buys a pair of trousers with the remaining money. The trousers cost Rs 550. How much money does Raj have left?',
    options:['Rs 0','Rs 50','Rs 100','Rs 150'], answer:'Rs 0',
    hint:'3×150=450. 1000−450=550. 550−550=?',
    explanation:'3 shirts = Rs 450. Remaining = Rs 550. Trousers = Rs 550. Money left = Rs 550 − Rs 550 = <b>Rs 0</b>.' }),

  makeNum({ id:'g3mth-mon-076', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A class raises money for charity. 8 children each raise Rs 75 and 4 children each raise Rs 125. What is the total raised?',
    answer:1100, tolerance:0,
    hint:'8×75=600. 4×125=500. Total=?',
    explanation:'8 × 75 = 600. 4 × 125 = 500. Total = 600 + 500 = <b>Rs 1100</b>.' }),

  makeMCQ({ id:'g3mth-mon-077', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A family holiday costs Rs 3500. The parents save Rs 500 per month. How many months do they need to save?',
    options:['5','6','7','8'], answer:'7',
    hint:'3500 ÷ 500 = ?',
    explanation:'3500 ÷ 500 = <b>7</b> months.' }),

  makeMCQ({ id:'g3mth-mon-078', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Two friends want to buy a present for Rs 460. One pays Rs 230. How much does the second pay?',
    options:['Rs 220','Rs 230','Rs 240','Rs 250'], answer:'Rs 230',
    hint:'460 − 230 = ?',
    explanation:'460 − 230 = <b>Rs 230</b>. They split equally.' }),

  makeNum({ id:'g3mth-mon-079', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A stall sells lemonade at Rs 15 per cup and juice at Rs 25 per cup. On Saturday, 20 cups of lemonade and 12 cups of juice were sold. What was the total income?',
    answer:600, tolerance:0,
    hint:'20×15=300. 12×25=300. Total=?',
    explanation:'Lemonade: 20 × 15 = 300. Juice: 12 × 25 = 300. Total = 300 + 300 = <b>Rs 600</b>.' }),

  makeMCQ({ id:'g3mth-mon-080', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A school wants to buy 6 footballs at Rs 175 each. They have Rs 800. How much more do they need?',
    options:['Rs 200','Rs 225','Rs 250','Rs 275'], answer:'Rs 250',
    hint:'6×175=1050. 1050−800=?',
    explanation:'6 × 175 = 1050. Still needed = 1050 − 800 = <b>Rs 250</b>.' }),

  makeMCQ({ id:'g3mth-mon-081', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'Tina spends Rs 380 and saves Rs 220 from her pocket money. What is her total pocket money?',
    options:['Rs 500','Rs 580','Rs 600','Rs 620'], answer:'Rs 600',
    hint:'380 + 220 = ?',
    explanation:'380 + 220 = <b>Rs 600</b> total pocket money.' }),

  makeNum({ id:'g3mth-mon-082', chapterId:'g3mth-money', difficulty:2, subsection:'money_problems',
    question:'A pen costs Rs 12. How many pens can you buy for Rs 96?',
    answer:8, tolerance:0,
    hint:'96 ÷ 12 = ?',
    explanation:'96 ÷ 12 = <b>8</b> pens.' }),

  makeMCQ({ id:'g3mth-mon-083', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Three children saved Rs 450 in total. The first saved Rs 175, the second saved Rs 130. How much did the third save?',
    options:['Rs 125','Rs 140','Rs 145','Rs 150'], answer:'Rs 145',
    hint:'450 − 175 − 130 = ?',
    explanation:'450 − 175 − 130 = <b>Rs 145</b>.' }),

  makeMCQ({ id:'g3mth-mon-084', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A box contains 8 mangoes. One mango costs Rs 12. What is the value of all the mangoes in the box?',
    options:['Rs 86','Rs 90','Rs 94','Rs 96'], answer:'Rs 96',
    hint:'8 × 12 = ?',
    explanation:'8 × 12 = <b>Rs 96</b>.' }),

  makeMCQ({ id:'g3mth-mon-085', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'Mrs Roy has a Rs 1000 note. She buys groceries for Rs 387 and a magazine for Rs 65. How much change does she get?',
    options:['Rs 538','Rs 540','Rs 548','Rs 555'], answer:'Rs 548',
    hint:'387 + 65 = 452. 1000 − 452 = ?',
    explanation:'Total spent = 387 + 65 = 452. Change = 1000 − 452 = <b>Rs 548</b>.' }),

  makeNum({ id:'g3mth-mon-086', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A school buys 5 boxes of pencils at Rs 85 per box and 3 boxes of pens at Rs 120 per box. What is the total cost?',
    answer:785, tolerance:0,
    hint:'5×85=425. 3×120=360. Total=?',
    explanation:'5 × 85 = 425. 3 × 120 = 360. Total = 425 + 360 = <b>Rs 785</b>.' }),

  makeMCQ({ id:'g3mth-mon-087', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A child spends Rs 55 on Monday, Rs 75 on Tuesday and Rs 90 on Wednesday. She started with Rs 300. How much does she have left?',
    options:['Rs 70','Rs 75','Rs 80','Rs 85'], answer:'Rs 80',
    hint:'55+75+90=220. 300−220=?',
    explanation:'Total spent = 55 + 75 + 90 = 220. Remaining = 300 − 220 = <b>Rs 80</b>.' }),

  makeNum({ id:'g3mth-mon-088', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'4 friends share the cost of a taxi ride equally. The total fare is Rs 320. How much does each person pay?',
    answer:80, tolerance:0,
    hint:'320 ÷ 4 = ?',
    explanation:'320 ÷ 4 = <b>Rs 80</b> per person.' }),

  makeMCQ({ id:'g3mth-mon-089', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A fruit seller buys oranges for Rs 240 and sells them for Rs 380. How much profit does she make?',
    options:['Rs 120','Rs 130','Rs 140','Rs 150'], answer:'Rs 140',
    hint:'380 − 240 = ?',
    explanation:'380 − 240 = <b>Rs 140</b> profit.' }),

  makeMCQ({ id:'g3mth-mon-090', chapterId:'g3mth-money', difficulty:3, subsection:'money_problems',
    question:'A family buys 2 kg of chicken at Rs 250 per kg and 3 kg of fish at Rs 180 per kg. What is the total cost of meat and fish?',
    options:['Rs 920','Rs 1000','Rs 1020','Rs 1040'], answer:'Rs 1040',
    hint:'2×250=500. 3×180=540. Total=?',
    explanation:'2 × 250 = 500. 3 × 180 = 540. Total = 500 + 540 = <b>Rs 1040</b>.' })

);

})();
