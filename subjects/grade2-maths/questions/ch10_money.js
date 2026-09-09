'use strict';
(function () {

// Grade 2 Money — g2mth-money
// Subsections: coins_notes · counting_money · money_problems
// IDs: g2mth-mon-001 … g2mth-mon-090

// SVG helpers (inline, no 404 risk)
function coin(value, fill, label, x, y) {
  return '<circle cx="' + x + '" cy="' + y + '" r="22" fill="' + fill + '" stroke="#9CA3AF" stroke-width="1.5"/>' +
         '<text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="#111">' + label + '</text>';
}

function note(label, fill, x, y) {
  return '<rect x="' + x + '" y="' + y + '" width="72" height="36" rx="4" fill="' + fill + '" stroke="#6B7280" stroke-width="1.5"/>' +
         '<text x="' + (x + 36) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="13" font-weight="bold" fill="#111">' + label + '</text>';
}

function svgWrap(inner, vw, vh, label) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
         '<svg viewBox="0 0 ' + vw + ' ' + vh + '" style="width:' + Math.min(vw, 300) + 'px;max-width:100%;height:auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
         inner + '</svg></div>';
}

STATIC_QUESTIONS.push(

// ── coins_notes (001–035) ──────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-mon-001', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(coin('Re1','#D4AF37','Re 1',35,35), 70, 70, 'a Re 1 coin') +
      'What coin is shown?',
    options:['Re 1','Rs 2','Rs 5','Rs 10'], answer:'Re 1',
    hint:'The smallest Mauritian coin is Re 1.',
    explanation:'This is a <b>Re 1</b> coin. One rupee.' }),

  makeMCQ({ id:'g2mth-mon-002', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(coin('Rs2','#B0C4DE','Rs 2',35,35), 70, 70, 'a Rs 2 coin') +
      'What coin is shown?',
    options:['Rs 2','Re 1','Rs 5','Rs 10'], answer:'Rs 2',
    hint:'Look at the amount written on the coin.',
    explanation:'This is a <b>Rs 2</b> coin. Two rupees.' }),

  makeMCQ({ id:'g2mth-mon-003', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(coin('Rs5','#C0C0C0','Rs 5',35,35), 70, 70, 'a Rs 5 coin') +
      'What coin is shown?',
    options:['Rs 5','Rs 2','Re 1','Rs 10'], answer:'Rs 5',
    hint:'Five rupees is a silver coin.',
    explanation:'This is a <b>Rs 5</b> coin. Five rupees.' }),

  makeMCQ({ id:'g2mth-mon-004', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(note('Rs 10','#86EFAC',4,4), 80, 44, 'a Rs 10 note') +
      'What note is shown?',
    options:['Rs 10','Rs 20','Rs 50','Rs 100'], answer:'Rs 10',
    hint:'The note says Rs 10.',
    explanation:'This is a <b>Rs 10</b> note. Ten rupees.' }),

  makeMCQ({ id:'g2mth-mon-005', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(note('Rs 20','#FDE68A',4,4), 80, 44, 'a Rs 20 note') +
      'What note is shown?',
    options:['Rs 20','Rs 10','Rs 50','Rs 100'], answer:'Rs 20',
    hint:'The note says Rs 20.',
    explanation:'This is a <b>Rs 20</b> note. Twenty rupees.' }),

  makeMCQ({ id:'g2mth-mon-006', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(note('Rs 50','#BFDBFE',4,4), 80, 44, 'a Rs 50 note') +
      'What note is shown?',
    options:['Rs 50','Rs 20','Rs 100','Rs 10'], answer:'Rs 50',
    hint:'The note says Rs 50.',
    explanation:'This is a <b>Rs 50</b> note. Fifty rupees.' }),

  makeMCQ({ id:'g2mth-mon-007', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question: svgWrap(note('Rs 100','#FECDD3',4,4), 80, 44, 'a Rs 100 note') +
      'What note is shown?',
    options:['Rs 100','Rs 50','Rs 20','Rs 10'], answer:'Rs 100',
    hint:'The note says Rs 100.',
    explanation:'This is a <b>Rs 100</b> note. One hundred rupees.' }),

  makeMCQ({ id:'g2mth-mon-008', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Which of these is the LEAST in value?',
    options:['Re 1','Rs 2','Rs 5','Rs 10'], answer:'Re 1',
    hint:'Re 1 is worth the least.',
    explanation:'<b>Re 1</b> (one rupee) is worth the least. Rs 2 > Re 1.' }),

  makeMCQ({ id:'g2mth-mon-009', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Which of these is the MOST in value?',
    options:['Rs 100','Rs 50','Rs 20','Rs 10'], answer:'Rs 100',
    hint:'Bigger number = more value.',
    explanation:'<b>Rs 100</b> is worth the most. 100 > 50 > 20 > 10.' }),

  makeTF({ id:'g2mth-mon-010', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Rs 5 is worth more than Rs 2.',
    answer:true,
    explanation:'True — Rs 5 > Rs 2.' }),

  makeMCQ({ id:'g2mth-mon-011', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'How many Re 1 coins make Rs 5?',
    options:['5','2','10','1'], answer:'5',
    hint:'Re 1 + Re 1 + Re 1 + Re 1 + Re 1 = Rs 5.',
    explanation:'You need <b>5</b> Re 1 coins to make Rs 5.' }),

  makeMCQ({ id:'g2mth-mon-012', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'How many Rs 2 coins make Rs 10?',
    options:['5','4','2','10'], answer:'5',
    hint:'2, 4, 6, 8, 10 — count by 2s.',
    explanation:'<b>5</b> coins of Rs 2 make Rs 10.' }),

  makeMCQ({ id:'g2mth-mon-013', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Rs 5 coins make Rs 20?',
    options:['4','5','3','2'], answer:'4',
    hint:'5, 10, 15, 20 — count by 5s.',
    explanation:'<b>4</b> coins of Rs 5 make Rs 20.' }),

  makeMCQ({ id:'g2mth-mon-014', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Rs 10 notes make Rs 50?',
    options:['5','4','10','3'], answer:'5',
    hint:'10, 20, 30, 40, 50.',
    explanation:'<b>5</b> notes of Rs 10 make Rs 50.' }),

  makeMCQ({ id:'g2mth-mon-015', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Rs 20 notes make Rs 100?',
    options:['5','4','3','10'], answer:'5',
    hint:'20, 40, 60, 80, 100.',
    explanation:'<b>5</b> notes of Rs 20 make Rs 100.' }),

  makeMCQ({ id:'g2mth-mon-016', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Is Re 1 a coin or a note?',
    options:['a coin','a note','both','neither'], answer:'a coin',
    hint:'Re 1 is a small metal coin.',
    explanation:'Re 1 is <b>a coin</b> — a small metal disc.' }),

  makeMCQ({ id:'g2mth-mon-017', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Is Rs 50 a coin or a note?',
    options:['a note','a coin','both','neither'], answer:'a note',
    hint:'Large amounts like Rs 50 come as paper notes.',
    explanation:'Rs 50 is <b>a note</b> — a paper money note.' }),

  makeMCQ({ id:'g2mth-mon-018', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Rs 2 coins equal one Rs 10 note?',
    options:['5','4','3','6'], answer:'5',
    hint:'2, 4, 6, 8, 10 — count in 2s.',
    explanation:'5 × Rs 2 = Rs 10. You need <b>5</b> coins.' }),

  makeTF({ id:'g2mth-mon-019', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Rs 10 is worth more than Rs 5.',
    answer:true,
    explanation:'True — Rs 10 > Rs 5.' }),

  makeMCQ({ id:'g2mth-mon-020', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Two Rs 10 notes equal one …',
    options:['Rs 20 note','Rs 10 note','Rs 50 note','Rs 5 coin'], answer:'Rs 20 note',
    hint:'10 + 10 = 20.',
    explanation:'Rs 10 + Rs 10 = <b>Rs 20</b>.' }),

  makeMCQ({ id:'g2mth-mon-021', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Two Rs 50 notes equal one …',
    options:['Rs 100 note','Rs 50 note','Rs 20 note','Rs 200 note'], answer:'Rs 100 note',
    hint:'50 + 50 = 100.',
    explanation:'Rs 50 + Rs 50 = <b>Rs 100</b>.' }),

  makeMCQ({ id:'g2mth-mon-022', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Which note has the HIGHEST value?',
    options:['Rs 100','Rs 50','Rs 20','Rs 10'], answer:'Rs 100',
    hint:'Bigger number = more value.',
    explanation:'<b>Rs 100</b> is the highest value note in this list.' }),

  makeMCQ({ id:'g2mth-mon-023', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Re 1 coins make Rs 10?',
    options:['10','5','20','2'], answer:'10',
    hint:'1, 2, 3 … count to 10.',
    explanation:'You need <b>10</b> coins of Re 1 to make Rs 10.' }),

  makeMCQ({ id:'g2mth-mon-024', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Five Rs 5 coins are the same as one …',
    options:['Rs 25','Rs 20','Rs 50','Rs 10'], answer:'Rs 25',
    hint:'5 × 5 = 25.',
    explanation:'5 × Rs 5 = <b>Rs 25</b>.' }),

  makeTF({ id:'g2mth-mon-025', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Ten Rs 10 notes make Rs 100.',
    answer:true,
    explanation:'True — 10 × Rs 10 = Rs 100.' }),

  makeMCQ({ id:'g2mth-mon-026', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Which amount is a coin, not a note?',
    options:['Rs 2','Rs 10','Rs 20','Rs 50'], answer:'Rs 2',
    hint:'Re 1, Rs 2 and Rs 5 are coins.',
    explanation:'<b>Rs 2</b> is a coin. Rs 10, Rs 20 and Rs 50 are notes.' }),

  makeMCQ({ id:'g2mth-mon-027', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'How many Rs 5 coins equal one Rs 50 note?',
    options:['10','5','20','15'], answer:'10',
    hint:'50 ÷ 5 = 10.',
    explanation:'50 ÷ 5 = <b>10</b> coins of Rs 5.' }),

  makeMCQ({ id:'g2mth-mon-028', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Yusuf has 4 Rs 2 coins. How much money does he have in total?',
    options:['Rs 8','Rs 6','Rs 10','Rs 4'], answer:'Rs 8',
    hint:'4 × 2 = 8.',
    explanation:'4 × Rs 2 = <b>Rs 8</b>.' }),

  makeMCQ({ id:'g2mth-mon-029', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Priya has 3 Rs 5 coins. How much money does she have?',
    options:['Rs 15','Rs 10','Rs 20','Rs 5'], answer:'Rs 15',
    hint:'3 × 5 = 15.',
    explanation:'3 × Rs 5 = <b>Rs 15</b>.' }),

  makeMCQ({ id:'g2mth-mon-030', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Uma has 2 Rs 20 notes and 1 Rs 10 note. How much does she have?',
    options:['Rs 50','Rs 40','Rs 30','Rs 60'], answer:'Rs 50',
    hint:'20 + 20 + 10 = 50.',
    explanation:'Rs 20 + Rs 20 + Rs 10 = <b>Rs 50</b>.' }),

  makeMCQ({ id:'g2mth-mon-031', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Raj has 1 Rs 50 note and 2 Rs 20 notes. How much in total?',
    options:['Rs 90','Rs 80','Rs 100','Rs 70'], answer:'Rs 90',
    hint:'50 + 20 + 20 = 90.',
    explanation:'Rs 50 + Rs 20 + Rs 20 = <b>Rs 90</b>.' }),

  makeMCQ({ id:'g2mth-mon-032', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Lena has 1 Rs 100 note and 1 Rs 2 coin. How much in total?',
    options:['Rs 102','Rs 100','Rs 98','Rs 12'], answer:'Rs 102',
    hint:'100 + 2 = 102.',
    explanation:'Rs 100 + Rs 2 = <b>Rs 102</b>.' }),

  makeTF({ id:'g2mth-mon-033', chapterId:'g2mth-money', difficulty:1, subsection:'coins_notes',
    question:'Rs 2 and Rs 5 are both coins.',
    answer:true,
    explanation:'True — both Rs 2 and Rs 5 are coins in Mauritius.' }),

  makeMCQ({ id:'g2mth-mon-034', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Kai has 6 Re 1 coins and 2 Rs 5 coins. How much in total?',
    options:['Rs 16','Rs 11','Rs 12','Rs 10'], answer:'Rs 16',
    hint:'6 × 1 = 6 and 2 × 5 = 10. Then 6 + 10 = 16.',
    explanation:'Rs 6 + Rs 10 = <b>Rs 16</b>.' }),

  makeMCQ({ id:'g2mth-mon-035', chapterId:'g2mth-money', difficulty:2, subsection:'coins_notes',
    question:'Which set of coins makes Rs 10? (Re 1, Rs 2, Rs 5 coins available)',
    options:['2 × Rs 5','5 × Rs 5','3 × Rs 2','4 × Re 1'], answer:'2 × Rs 5',
    hint:'2 × 5 = 10.',
    explanation:'<b>2 × Rs 5</b> = Rs 10.' }),

// ── counting_money (036–065) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-mon-036', chapterId:'g2mth-money', difficulty:1, subsection:'counting_money',
    question: svgWrap(
      coin('Re1','#D4AF37','Re 1',30,35) +
      coin('Re1','#D4AF37','Re 1',80,35) +
      coin('Re1','#D4AF37','Re 1',130,35),
      160, 70, 'three Re 1 coins') + 'How much money is shown?',
    options:['Rs 3','Rs 2','Rs 4','Rs 1'], answer:'Rs 3',
    hint:'Count: Re 1 + Re 1 + Re 1 = Rs 3.',
    explanation:'3 × Re 1 = <b>Rs 3</b>.' }),

  makeMCQ({ id:'g2mth-mon-037', chapterId:'g2mth-money', difficulty:1, subsection:'counting_money',
    question: svgWrap(
      coin('Rs5','#C0C0C0','Rs 5',30,35) +
      coin('Rs5','#C0C0C0','Rs 5',80,35),
      110, 70, 'two Rs 5 coins') + 'How much money is shown?',
    options:['Rs 10','Rs 5','Rs 15','Rs 20'], answer:'Rs 10',
    hint:'Rs 5 + Rs 5 = Rs 10.',
    explanation:'2 × Rs 5 = <b>Rs 10</b>.' }),

  makeMCQ({ id:'g2mth-mon-038', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question: svgWrap(
      note('Rs 10','#86EFAC',5,5) +
      coin('Rs5','#C0C0C0','Rs 5',95,23),
      135, 50, 'a Rs 10 note and a Rs 5 coin') + 'How much money is shown?',
    options:['Rs 15','Rs 10','Rs 5','Rs 20'], answer:'Rs 15',
    hint:'Rs 10 + Rs 5 = Rs 15.',
    explanation:'Rs 10 + Rs 5 = <b>Rs 15</b>.' }),

  makeMCQ({ id:'g2mth-mon-039', chapterId:'g2mth-money', difficulty:1, subsection:'counting_money',
    question:'Count: Rs 2 + Rs 2 + Rs 2 = ?',
    options:['Rs 6','Rs 4','Rs 8','Rs 2'], answer:'Rs 6',
    hint:'Count in 2s: 2, 4, 6.',
    explanation:'3 × Rs 2 = <b>Rs 6</b>.' }),

  makeMCQ({ id:'g2mth-mon-040', chapterId:'g2mth-money', difficulty:1, subsection:'counting_money',
    question:'Count: Rs 5 + Rs 5 + Rs 5 = ?',
    options:['Rs 15','Rs 10','Rs 20','Rs 5'], answer:'Rs 15',
    hint:'Count in 5s: 5, 10, 15.',
    explanation:'3 × Rs 5 = <b>Rs 15</b>.' }),

  makeMCQ({ id:'g2mth-mon-041', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question: svgWrap(
      note('Rs 20','#FDE68A',5,5) +
      note('Rs 10','#86EFAC',85,5) +
      coin('Rs5','#C0C0C0','Rs 5',175,23),
      210, 50, 'a Rs 20 note, a Rs 10 note and a Rs 5 coin') + 'How much money is shown?',
    options:['Rs 35','Rs 30','Rs 25','Rs 40'], answer:'Rs 35',
    hint:'Rs 20 + Rs 10 + Rs 5 = Rs 35.',
    explanation:'Rs 20 + Rs 10 + Rs 5 = <b>Rs 35</b>.' }),

  makeMCQ({ id:'g2mth-mon-042', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Count: Rs 10 + Rs 10 + Rs 10 + Rs 10 = ?',
    options:['Rs 40','Rs 30','Rs 50','Rs 20'], answer:'Rs 40',
    hint:'Count in 10s: 10, 20, 30, 40.',
    explanation:'4 × Rs 10 = <b>Rs 40</b>.' }),

  makeNum({ id:'g2mth-mon-043', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'How much is: Re 1 + Rs 2 + Rs 5 + Rs 2? Write the total in rupees.',
    answer:10, tolerance:0,
    hint:'1 + 2 + 5 + 2 = 10.',
    explanation:'Re 1 + Rs 2 + Rs 5 + Rs 2 = <b>Rs 10</b>.' }),

  makeNum({ id:'g2mth-mon-044', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'How much is: Rs 20 + Rs 5 + Rs 2 + Re 1? Write the total in rupees.',
    answer:28, tolerance:0,
    hint:'20 + 5 + 2 + 1 = 28.',
    explanation:'Rs 20 + Rs 5 + Rs 2 + Re 1 = <b>Rs 28</b>.' }),

  makeMCQ({ id:'g2mth-mon-045', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Mia has a Rs 50 note and a Rs 20 note. How much altogether?',
    options:['Rs 70','Rs 60','Rs 80','Rs 50'], answer:'Rs 70',
    hint:'50 + 20 = 70.',
    explanation:'Rs 50 + Rs 20 = <b>Rs 70</b>.' }),

  makeMCQ({ id:'g2mth-mon-046', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question: svgWrap(
      note('Rs 50','#BFDBFE',5,5) +
      note('Rs 20','#FDE68A',85,5) +
      note('Rs 10','#86EFAC',165,5),
      245, 50, 'three notes: Rs 50, Rs 20, Rs 10') + 'What is the total?',
    options:['Rs 80','Rs 70','Rs 90','Rs 60'], answer:'Rs 80',
    hint:'50 + 20 + 10 = 80.',
    explanation:'Rs 50 + Rs 20 + Rs 10 = <b>Rs 80</b>.' }),

  makeNum({ id:'g2mth-mon-047', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Raj has 3 Rs 10 notes and 4 Rs 5 coins. How much in total? (Answer in rupees.)',
    answer:50, tolerance:0,
    hint:'3 × 10 = 30 and 4 × 5 = 20. Then 30 + 20 = 50.',
    explanation:'Rs 30 + Rs 20 = <b>Rs 50</b>.' }),

  makeNum({ id:'g2mth-mon-048', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'How much is: Rs 100 − Rs 20? (Answer in rupees.)',
    answer:80, tolerance:0,
    hint:'100 − 20 = 80.',
    explanation:'Rs 100 − Rs 20 = <b>Rs 80</b>.' }),

  makeMCQ({ id:'g2mth-mon-049', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Leo has 1 Rs 100 note and 3 Re 1 coins. How much in total?',
    options:['Rs 103','Rs 100','Rs 101','Rs 104'], answer:'Rs 103',
    hint:'100 + 3 = 103.',
    explanation:'Rs 100 + Rs 3 = <b>Rs 103</b>.' }),

  makeMCQ({ id:'g2mth-mon-050', chapterId:'g2mth-money', difficulty:1, subsection:'counting_money',
    question:'Count: Re 1 + Re 1 + Re 1 + Re 1 = ?',
    options:['Rs 4','Rs 3','Rs 5','Rs 2'], answer:'Rs 4',
    hint:'1 + 1 + 1 + 1 = 4.',
    explanation:'4 × Re 1 = <b>Rs 4</b>.' }),

  makeNum({ id:'g2mth-mon-051', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Find the total: 2 Rs 20 notes + 3 Rs 5 coins. Answer in rupees.',
    answer:55, tolerance:0,
    hint:'2 × 20 = 40 and 3 × 5 = 15. Then 40 + 15 = 55.',
    explanation:'Rs 40 + Rs 15 = <b>Rs 55</b>.' }),

  makeMCQ({ id:'g2mth-mon-052', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Ana has a Rs 50 note and 3 Rs 10 notes. How much altogether?',
    options:['Rs 80','Rs 60','Rs 70','Rs 90'], answer:'Rs 80',
    hint:'50 + 10 + 10 + 10 = 80.',
    explanation:'Rs 50 + Rs 30 = <b>Rs 80</b>.' }),

  makeNum({ id:'g2mth-mon-053', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Ben has 4 Rs 2 coins, 3 Re 1 coins and 1 Rs 5 coin. What is the total? (Answer in rupees.)',
    answer:16, tolerance:0,
    hint:'4 × 2 = 8; 3 × 1 = 3; 1 × 5 = 5. Total = 8 + 3 + 5 = 16.',
    explanation:'Rs 8 + Rs 3 + Rs 5 = <b>Rs 16</b>.' }),

  makeMCQ({ id:'g2mth-mon-054', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'Lena has Rs 100. She spends Rs 35. How much does she have left?',
    options:['Rs 65','Rs 70','Rs 55','Rs 75'], answer:'Rs 65',
    hint:'100 − 35 = 65.',
    explanation:'Rs 100 − Rs 35 = <b>Rs 65</b>.' }),

  makeNum({ id:'g2mth-mon-055', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'Tom has 2 Rs 50 notes, 1 Rs 20 note and 2 Rs 10 notes. How much in total? (Rupees.)',
    answer:140, tolerance:0,
    hint:'100 + 20 + 20 = 140.',
    explanation:'Rs 100 + Rs 20 + Rs 20 = <b>Rs 140</b>.' }),

  makeMCQ({ id:'g2mth-mon-056', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Which group totals Rs 25?',
    options:['1 Rs 20 note + 1 Rs 5 coin','2 Rs 10 notes + 1 Rs 5 coin','1 Rs 50 note − Rs 25','3 Rs 5 coins'], answer:'1 Rs 20 note + 1 Rs 5 coin',
    hint:'20 + 5 = 25.',
    explanation:'Rs 20 + Rs 5 = <b>Rs 25</b>.' }),

  makeNum({ id:'g2mth-mon-057', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Count these coins and notes: 1 Rs 50, 2 Rs 20, 3 Rs 2. What is the total? (Rupees.)',
    answer:96, tolerance:0,
    hint:'50 + 40 + 6 = 96.',
    explanation:'Rs 50 + Rs 40 + Rs 6 = <b>Rs 96</b>.' }),

  makeTF({ id:'g2mth-mon-058', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Five Rs 10 notes equal the same amount as one Rs 50 note.',
    answer:true,
    explanation:'True — 5 × Rs 10 = Rs 50.' }),

  makeMCQ({ id:'g2mth-mon-059', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Cara has Rs 30. She receives Rs 20 more. How much does she have now?',
    options:['Rs 50','Rs 40','Rs 60','Rs 30'], answer:'Rs 50',
    hint:'30 + 20 = 50.',
    explanation:'Rs 30 + Rs 20 = <b>Rs 50</b>.' }),

  makeNum({ id:'g2mth-mon-060', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'A purse has 4 Rs 10 notes, 2 Rs 5 coins and 3 Re 1 coins. What is the total? (Rupees.)',
    answer:53, tolerance:0,
    hint:'40 + 10 + 3 = 53.',
    explanation:'Rs 40 + Rs 10 + Rs 3 = <b>Rs 53</b>.' }),

  makeMCQ({ id:'g2mth-mon-061', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question: svgWrap(
      note('Rs 100','#FECDD3',5,5) +
      note('Rs 50','#BFDBFE',85,5),
      170, 50, 'a Rs 100 note and a Rs 50 note') + 'How much in total?',
    options:['Rs 150','Rs 100','Rs 200','Rs 50'], answer:'Rs 150',
    hint:'100 + 50 = 150.',
    explanation:'Rs 100 + Rs 50 = <b>Rs 150</b>.' }),

  makeMCQ({ id:'g2mth-mon-062', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'Jake has 2 Rs 50 notes. He gives away Rs 30. How much is left?',
    options:['Rs 70','Rs 80','Rs 60','Rs 50'], answer:'Rs 70',
    hint:'100 − 30 = 70.',
    explanation:'Rs 100 − Rs 30 = <b>Rs 70</b>.' }),

  makeNum({ id:'g2mth-mon-063', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'Mia earns Rs 50 on Monday and Rs 35 on Tuesday. How much did she earn altogether? (Rupees.)',
    answer:85, tolerance:0,
    hint:'50 + 35 = 85.',
    explanation:'Rs 50 + Rs 35 = <b>Rs 85</b>.' }),

  makeTF({ id:'g2mth-mon-064', chapterId:'g2mth-money', difficulty:2, subsection:'counting_money',
    question:'Rs 100 is the largest note in our list of Mauritian money (Re 1, Rs 2, Rs 5, Rs 10, Rs 20, Rs 50, Rs 100).',
    answer:true,
    explanation:'True — Rs 100 is the largest note in this set.' }),

  makeMCQ({ id:'g2mth-mon-065', chapterId:'g2mth-money', difficulty:3, subsection:'counting_money',
    question:'Ali has Rs 75. He spends Rs 40. How much does he have left?',
    options:['Rs 35','Rs 40','Rs 45','Rs 25'], answer:'Rs 35',
    hint:'75 − 40 = 35.',
    explanation:'Rs 75 − Rs 40 = <b>Rs 35</b>.' }),

// ── money_problems (066–090) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-mon-066', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'A mango costs Rs 5. How much do 3 mangoes cost?',
    options:['Rs 15','Rs 10','Rs 20','Rs 8'], answer:'Rs 15',
    hint:'3 × 5 = 15.',
    explanation:'3 × Rs 5 = <b>Rs 15</b>.' }),

  makeMCQ({ id:'g2mth-mon-067', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'A pencil costs Rs 2. Tom buys 4 pencils. How much does he pay?',
    options:['Rs 8','Rs 6','Rs 10','Rs 4'], answer:'Rs 8',
    hint:'4 × 2 = 8.',
    explanation:'4 × Rs 2 = <b>Rs 8</b>.' }),

  makeMCQ({ id:'g2mth-mon-068', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'Nina buys a book for Rs 20 and a pen for Rs 5. How much altogether?',
    options:['Rs 25','Rs 15','Rs 30','Rs 20'], answer:'Rs 25',
    hint:'20 + 5 = 25.',
    explanation:'Rs 20 + Rs 5 = <b>Rs 25</b>.' }),

  makeMCQ({ id:'g2mth-mon-069', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'An eraser costs Rs 3. Priya pays with a Rs 10 note. How much change does she get?',
    options:['Rs 7','Rs 8','Rs 6','Rs 5'], answer:'Rs 7',
    hint:'10 − 3 = 7.',
    explanation:'Rs 10 − Rs 3 = <b>Rs 7</b> change.' }),

  makeMCQ({ id:'g2mth-mon-070', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'A ball costs Rs 15. Dev pays with Rs 20. How much change does he get?',
    options:['Rs 5','Rs 10','Rs 4','Rs 6'], answer:'Rs 5',
    hint:'20 − 15 = 5.',
    explanation:'Rs 20 − Rs 15 = <b>Rs 5</b> change.' }),

  makeNum({ id:'g2mth-mon-071', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'A ruler costs Rs 8 and a sharpener costs Rs 4. How much do they cost altogether? (Rupees.)',
    answer:12, tolerance:0,
    hint:'8 + 4 = 12.',
    explanation:'Rs 8 + Rs 4 = <b>Rs 12</b>.' }),

  makeNum({ id:'g2mth-mon-072', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Leo pays Rs 50 for a toy that costs Rs 32. What is his change? (Rupees.)',
    answer:18, tolerance:0,
    hint:'50 − 32 = 18.',
    explanation:'Rs 50 − Rs 32 = <b>Rs 18</b> change.' }),

  makeMCQ({ id:'g2mth-mon-073', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'A bag of rice costs Rs 60 and a loaf of bread costs Rs 15. What is the total cost?',
    options:['Rs 75','Rs 65','Rs 80','Rs 85'], answer:'Rs 75',
    hint:'60 + 15 = 75.',
    explanation:'Rs 60 + Rs 15 = <b>Rs 75</b>.' }),

  makeNum({ id:'g2mth-mon-074', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Kai buys 2 books at Rs 25 each. How much does he pay in total? (Rupees.)',
    answer:50, tolerance:0,
    hint:'2 × 25 = 50.',
    explanation:'2 × Rs 25 = <b>Rs 50</b>.' }),

  makeMCQ({ id:'g2mth-mon-075', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Mia has Rs 100. She buys a shirt for Rs 45 and a pair of socks for Rs 18. How much is left?',
    options:['Rs 37','Rs 38','Rs 40','Rs 42'], answer:'Rs 37',
    hint:'45 + 18 = 63; 100 − 63 = 37.',
    explanation:'Rs 45 + Rs 18 = Rs 63. Rs 100 − Rs 63 = <b>Rs 37</b>.' }),

  makeMCQ({ id:'g2mth-mon-076', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'A water bottle costs Rs 12. How much do 2 bottles cost?',
    options:['Rs 24','Rs 22','Rs 12','Rs 20'], answer:'Rs 24',
    hint:'2 × 12 = 24.',
    explanation:'2 × Rs 12 = <b>Rs 24</b>.' }),

  makeNum({ id:'g2mth-mon-077', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Sam saves Rs 10 each week for 5 weeks. How much does he save in total? (Rupees.)',
    answer:50, tolerance:0,
    hint:'5 × 10 = 50.',
    explanation:'5 × Rs 10 = <b>Rs 50</b>.' }),

  makeMCQ({ id:'g2mth-mon-078', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'A bag costs Rs 35. Ben has Rs 50. Can he afford it, and how much will be left?',
    options:['Yes, Rs 15 left','Yes, Rs 25 left','No, he needs Rs 15 more','No, he needs Rs 5 more'], answer:'Yes, Rs 15 left',
    hint:'50 − 35 = 15.',
    explanation:'Rs 50 − Rs 35 = <b>Rs 15</b> left. Ben can afford the bag.' }),

  makeNum({ id:'g2mth-mon-079', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Ana has Rs 80. She gives Rs 25 to her sister and Rs 10 to her brother. How much does she have left? (Rupees.)',
    answer:45, tolerance:0,
    hint:'25 + 10 = 35; 80 − 35 = 45.',
    explanation:'Rs 80 − Rs 25 − Rs 10 = <b>Rs 45</b>.' }),

  makeMCQ({ id:'g2mth-mon-080', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'Three friends share Rs 90 equally. How much does each friend get?',
    options:['Rs 30','Rs 20','Rs 45','Rs 40'], answer:'Rs 30',
    hint:'90 ÷ 3 = 30.',
    explanation:'Rs 90 ÷ 3 = <b>Rs 30</b> each.' }),

  makeNum({ id:'g2mth-mon-081', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'A pen costs Rs 6 and a notebook costs Rs 14. How much more expensive is the notebook? (Rupees.)',
    answer:8, tolerance:0,
    hint:'14 − 6 = 8.',
    explanation:'Rs 14 − Rs 6 = <b>Rs 8</b> more.' }),

  makeNum({ id:'g2mth-mon-082', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'Riya has Rs 32. She wants to buy 3 items that each cost Rs 12. How much more money does she need? (Rupees.)',
    answer:4, tolerance:0,
    hint:'Find the total cost first: 3 × 12. Then subtract what she has.',
    explanation:'3 × Rs 12 = Rs 36. She has Rs 32. Rs 36 − Rs 32 = <b>Rs 4</b> more needed.',
    }),

  makeNum({ id:'g2mth-mon-083', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Usha saves Rs 5 per day for 10 days. How much has she saved? (Rupees.)',
    answer:50, tolerance:0,
    hint:'10 × 5 = 50.',
    explanation:'10 × Rs 5 = <b>Rs 50</b>.' }),

  makeMCQ({ id:'g2mth-mon-084', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'A ball costs Rs 18. Two balls cost …',
    options:['Rs 36','Rs 20','Rs 30','Rs 38'], answer:'Rs 36',
    hint:'2 × 18 = 36.',
    explanation:'2 × Rs 18 = <b>Rs 36</b>.' }),

  makeMCQ({ id:'g2mth-mon-085', chapterId:'g2mth-money', difficulty:3, subsection:'money_problems',
    question:'Jay pays Rs 100 for a toy costing Rs 72. What is his change?',
    options:['Rs 28','Rs 22','Rs 30','Rs 32'], answer:'Rs 28',
    hint:'100 − 72 = 28.',
    explanation:'Rs 100 − Rs 72 = <b>Rs 28</b> change.' }),

  makeNum({ id:'g2mth-mon-086', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'A child buys 4 erasers at Rs 3 each and a ruler at Rs 8. How much in total? (Rupees.)',
    answer:20, tolerance:0,
    hint:'4 × 3 = 12; 12 + 8 = 20.',
    explanation:'Rs 12 + Rs 8 = <b>Rs 20</b>.' }),

  makeMCQ({ id:'g2mth-mon-087', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'Lena has Rs 60. She buys 3 items: Rs 15, Rs 20 and Rs 10. How much does she have left?',
    options:['Rs 15','Rs 10','Rs 20','Rs 5'], answer:'Rs 15',
    hint:'15 + 20 + 10 = 45; 60 − 45 = 15.',
    explanation:'Total spent = Rs 45. Rs 60 − Rs 45 = <b>Rs 15</b>.' }),

  makeNum({ id:'g2mth-mon-088', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'A shop sells 5 pens at Rs 4 each and 2 rulers at Rs 10 each. What is the total amount earned? (Rupees.)',
    answer:40, tolerance:0,
    hint:'5 × 4 = 20; 2 × 10 = 20; 20 + 20 = 40.',
    explanation:'Rs 20 + Rs 20 = <b>Rs 40</b>.' }),

  makeTF({ id:'g2mth-mon-089', chapterId:'g2mth-money', difficulty:2, subsection:'money_problems',
    question:'Rs 50 + Rs 50 = Rs 100.',
    answer:true,
    explanation:'True — Rs 50 + Rs 50 = Rs 100.' }),

  makeMCQ({ id:'g2mth-mon-090', chapterId:'g2mth-money', difficulty:4, subsection:'money_problems',
    question:'Kai has Rs 100. He spends half of it. How much is left?',
    options:['Rs 50','Rs 25','Rs 75','Rs 60'], answer:'Rs 50',
    hint:'Half of 100 = 50.',
    explanation:'Half of Rs 100 = <b>Rs 50</b> left.' })

);

})();
