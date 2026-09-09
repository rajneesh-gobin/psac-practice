'use strict';
(function () {

// Grade 1 Maths — Money
// IDs: g1mth-mon-001 onwards
// Source: MIE Maths Grade 1 Part 2 pp.42-46
// Numbers stay within Rs 1–10 (book scope for Grade 1)

// SVG helpers (inline, no 404 risk)
function _coin(val, fill, label) {
  return '<svg viewBox="0 0 70 70" style="width:60px;height:60px;display:inline-block;margin:4px" ' +
    'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<circle cx="35" cy="35" r="32" fill="' + fill + '" stroke="#92400E" stroke-width="2.5"/>' +
    '<text x="35" y="42" text-anchor="middle" font-size="22" font-weight="bold" fill="#44270A">' + val + '</text>' +
    '</svg>';
}
// Re 1 = light gold, Rs 2 = silver-grey, Rs 5 = gold
var C1 = _coin('Re 1','#FDE68A','one rupee coin');
var C2 = _coin('Rs 2','#E2E8F0','two rupees coin');
var C5 = _coin('Rs 5','#FCD34D','five rupees coin');

function _row(coins) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="a row of coins">' + coins + '</div>';
}

// ── coin_names (001–030) ──────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-mon-001', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question: _row(C1) + 'What is the value of this coin?',
    options:['Re 1','Rs 2','Rs 5','Rs 10'],
    answer:'Re 1',
    hint:'Look at the number on the coin.',
    explanation:'This is a <b>Re 1 coin</b> — it is worth one rupee.' }),

  makeMCQ({ id:'g1mth-mon-002', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question: _row(C2) + 'What is the value of this coin?',
    options:['Rs 2','Re 1','Rs 5','Rs 10'],
    answer:'Rs 2',
    hint:'Look at the number on the coin.',
    explanation:'This is a <b>Rs 2 coin</b> — it is worth two rupees.' }),

  makeMCQ({ id:'g1mth-mon-003', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question: _row(C5) + 'What is the value of this coin?',
    options:['Rs 5','Re 1','Rs 2','Rs 10'],
    answer:'Rs 5',
    hint:'Look at the number on the coin.',
    explanation:'This is a <b>Rs 5 coin</b> — it is worth five rupees.' }),

  makeTF({ id:'g1mth-mon-004', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question: _row(C1) + 'This coin is worth Re 1.',
    answer:true,
    explanation:'Yes! This is a <b>Re 1 coin</b>.' }),

  makeTF({ id:'g1mth-mon-005', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question: _row(C5) + 'This coin is worth Rs 2.',
    answer:false,
    explanation:'This coin is worth <b>Rs 5</b>, not Rs 2.' }),

  makeMCQ({ id:'g1mth-mon-006', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Which coin is worth the MOST?',
    options:['Rs 5','Re 1','Rs 2','They are all the same'],
    answer:'Rs 5',
    hint:'Compare: 1, 2, 5 — which is biggest?',
    explanation:'The <b>Rs 5 coin</b> is worth the most. 5 is bigger than 2 and 1.' }),

  makeMCQ({ id:'g1mth-mon-007', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Which coin is worth the LEAST?',
    options:['Re 1','Rs 2','Rs 5','They are all the same'],
    answer:'Re 1',
    hint:'Which number is smallest: 1, 2 or 5?',
    explanation:'The <b>Re 1 coin</b> is worth the least. 1 is less than 2 and 5.' }),

  makeMCQ({ id:'g1mth-mon-008', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Mia has a coin with "2" on it. What coin does she have?',
    options:['Rs 2','Re 1','Rs 5','Rs 10'],
    answer:'Rs 2',
    hint:'The number on the coin tells its value.',
    explanation:'A coin with "2" is a <b>Rs 2 coin</b>.' }),

  makeMCQ({ id:'g1mth-mon-009', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Sam has a coin with "5" on it. How much is it worth?',
    options:['Rs 5','Re 1','Rs 2','Rs 3'],
    answer:'Rs 5',
    hint:'The number tells the value.',
    explanation:'A coin with "5" is worth <b>Rs 5</b>.' }),

  makeTF({ id:'g1mth-mon-010', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Rs 5 is worth more than Rs 2.',
    answer:true,
    explanation:'Yes! <b>Rs 5 is more than Rs 2</b>. 5 is a bigger number than 2.' }),

  makeMCQ({ id:'g1mth-mon-011', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'We use rupees in Mauritius. Which of these is a Mauritian coin?',
    options:['Re 1','Dollar','Pound','Euro'],
    answer:'Re 1',
    hint:'In Mauritius we use rupees.',
    explanation:'In Mauritius we use <b>rupees</b>. The Re 1 coin is a Mauritian coin.' }),

  makeMCQ({ id:'g1mth-mon-012', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'How many different coins are there: Re 1, Rs 2 and Rs 5?',
    options:['3','2','4','1'],
    answer:'3',
    hint:'Count them: one, two, three.',
    explanation:'There are <b>3</b> types of coins: Re 1, Rs 2 and Rs 5.' }),

  makeMCQ({ id:'g1mth-mon-013', chapterId:'g1mth-money', difficulty:2, subsection:'coin_names',
    question: _row(C2 + C5) + 'Which coin is worth MORE?',
    options:['Rs 5','Rs 2','They are equal','Cannot tell'],
    answer:'Rs 5',
    hint:'Compare 2 and 5.',
    explanation:'<b>Rs 5</b> is worth more than Rs 2. 5 > 2.' }),

  makeMCQ({ id:'g1mth-mon-014', chapterId:'g1mth-money', difficulty:2, subsection:'coin_names',
    question: _row(C1 + C2) + 'Which coin is worth LESS?',
    options:['Re 1','Rs 2','They are equal','Rs 5'],
    answer:'Re 1',
    hint:'Compare 1 and 2.',
    explanation:'<b>Re 1</b> is worth less than Rs 2. 1 < 2.' }),

  makeTF({ id:'g1mth-mon-015', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Re 1 is worth the same as Rs 5.',
    answer:false,
    explanation:'<b>Re 1 is less than Rs 5</b>. They are not the same.' }),

  makeMCQ({ id:'g1mth-mon-016', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Ravi wants to buy something that costs Rs 5. Which coin is EXACTLY right?',
    options:['Rs 5 coin','Re 1 coin','Rs 2 coin','None of these'],
    answer:'Rs 5 coin',
    hint:'Which coin has the same value as Rs 5?',
    explanation:'The <b>Rs 5 coin</b> is exactly Rs 5.' }),

  makeMCQ({ id:'g1mth-mon-017', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Zara wants to buy something that costs Re 1. Which coin does she need?',
    options:['Re 1 coin','Rs 5 coin','Rs 2 coin','Rs 10 coin'],
    answer:'Re 1 coin',
    hint:'She needs exactly Re 1.',
    explanation:'Zara needs the <b>Re 1 coin</b>.' }),

  makeMCQ({ id:'g1mth-mon-018', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'How many Re 1 coins make Rs 2?',
    options:['2','1','5','3'],
    answer:'2',
    hint:'1 + 1 = ?',
    explanation:'<b>2 coins</b> of Re 1 = Rs 2. 1 + 1 = 2.' }),

  makeMCQ({ id:'g1mth-mon-019', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'How many Re 1 coins make Rs 5?',
    options:['5','2','3','10'],
    answer:'5',
    hint:'Count: 1, 2, 3, 4, 5.',
    explanation:'<b>5 coins</b> of Re 1 = Rs 5. 1+1+1+1+1 = 5.' }),

  makeTF({ id:'g1mth-mon-020', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'A Rs 2 coin is worth two Re 1 coins.',
    answer:true,
    explanation:'Yes! <b>Rs 2 = Re 1 + Re 1</b>. Two Re 1 coins make Rs 2.' }),

  makeMCQ({ id:'g1mth-mon-021', chapterId:'g1mth-money', difficulty:2, subsection:'coin_names',
    question:'List the coins from LEAST to MOST value.',
    options:['Re 1, Rs 2, Rs 5','Rs 5, Rs 2, Re 1','Rs 2, Re 1, Rs 5','Re 1, Rs 5, Rs 2'],
    answer:'Re 1, Rs 2, Rs 5',
    hint:'Order the numbers 1, 2, 5 from smallest to largest.',
    explanation:'Least to most: <b>Re 1 → Rs 2 → Rs 5</b>.' }),

  makeMCQ({ id:'g1mth-mon-022', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Arun has a gold-coloured coin worth Rs 5. This coin is worth MORE than Rs 2.',
    options:['True','False'],
    answer:'True',
    hint:'5 is bigger than 2.',
    explanation:'<b>True</b>. Rs 5 is worth more than Rs 2.' }),

  makeMCQ({ id:'g1mth-mon-023', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Neha has a coin worth Rs 2. How many Re 1 coins have the same value?',
    options:['2','1','5','3'],
    answer:'2',
    hint:'Re 1 + Re 1 = Rs 2.',
    explanation:'<b>2 Re 1 coins</b> = Rs 2.' }),

  makeMCQ({ id:'g1mth-mon-024', chapterId:'g1mth-money', difficulty:2, subsection:'coin_names',
    question:'Which is the correct order from MOST to LEAST value?',
    options:['Rs 5, Rs 2, Re 1','Re 1, Rs 2, Rs 5','Rs 2, Rs 5, Re 1','Re 1, Rs 5, Rs 2'],
    answer:'Rs 5, Rs 2, Re 1',
    hint:'Order the numbers 5, 2, 1 from biggest to smallest.',
    explanation:'Most to least: <b>Rs 5 → Rs 2 → Re 1</b>.' }),

  makeMCQ({ id:'g1mth-mon-025', chapterId:'g1mth-money', difficulty:1, subsection:'coin_names',
    question:'Priya has 1 coin worth Rs 5, 1 coin worth Rs 2 and 1 coin worth Re 1. How many COINS does she have?',
    options:['3','5','8','2'],
    answer:'3',
    hint:'Count the coins: one, two, three.',
    explanation:'Priya has <b>3 coins</b> — one Rs 5, one Rs 2 and one Re 1.' }),

// ── counting_coins (026–055) ──────────────────────────────────────────────

  makeMCQ({ id:'g1mth-mon-026', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C1+C1) + 'How much money is this?',
    options:['Rs 2','Re 1','Rs 5','Rs 3'],
    answer:'Rs 2',
    hint:'Count each coin: 1, 2.',
    explanation:'Re 1 + Re 1 = <b>Rs 2</b>.' }),

  makeMCQ({ id:'g1mth-mon-027', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C1+C1+C1) + 'How much money is this?',
    options:['Rs 3','Rs 2','Rs 5','Re 1'],
    answer:'Rs 3',
    hint:'Count: 1, 2, 3.',
    explanation:'Three Re 1 coins = <b>Rs 3</b>. 1+1+1 = 3.' }),

  makeMCQ({ id:'g1mth-mon-028', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C2+C2) + 'How much money is this?',
    options:['Rs 4','Rs 2','Rs 5','Rs 6'],
    answer:'Rs 4',
    hint:'Count in 2s: 2, 4.',
    explanation:'Rs 2 + Rs 2 = <b>Rs 4</b>.' }),

  makeMCQ({ id:'g1mth-mon-029', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C5) + 'How much money is this?',
    options:['Rs 5','Rs 2','Re 1','Rs 10'],
    answer:'Rs 5',
    hint:'One Rs 5 coin.',
    explanation:'One Rs 5 coin = <b>Rs 5</b>.' }),

  makeMCQ({ id:'g1mth-mon-030', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C2+C1) + 'How much money is this?',
    options:['Rs 3','Rs 2','Re 1','Rs 5'],
    answer:'Rs 3',
    hint:'Add the two coins together.',
    explanation:'Rs 2 + Re 1 = <b>Rs 3</b>.' }),

  makeMCQ({ id:'g1mth-mon-031', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C1) + 'How much money is this?',
    options:['Rs 6','Rs 5','Re 1','Rs 4'],
    answer:'Rs 6',
    hint:'Add the two coins together.',
    explanation:'Rs 5 + Re 1 = <b>Rs 6</b>.' }),

  makeMCQ({ id:'g1mth-mon-032', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C2) + 'How much money is this?',
    options:['Rs 7','Rs 5','Rs 2','Rs 6'],
    answer:'Rs 7',
    hint:'Add: 5 + 2 = ?',
    explanation:'Rs 5 + Rs 2 = <b>Rs 7</b>.' }),

  makeMCQ({ id:'g1mth-mon-033', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C2+C2+C1) + 'How much money is this?',
    options:['Rs 5','Rs 4','Rs 3','Rs 6'],
    answer:'Rs 5',
    hint:'Add: 2 + 2 + 1 = ?',
    explanation:'Rs 2 + Rs 2 + Re 1 = <b>Rs 5</b>.' }),

  makeMCQ({ id:'g1mth-mon-034', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C1+C1+C1+C1) + 'How much money is this?',
    options:['Rs 4','Rs 3','Rs 5','Rs 2'],
    answer:'Rs 4',
    hint:'Count the Re 1 coins: 1, 2, 3, 4.',
    explanation:'Four Re 1 coins = <b>Rs 4</b>. 1+1+1+1 = 4.' }),

  makeNum({ id:'g1mth-mon-035', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C1+C1+C1+C1+C1) + 'How much money is this? (Write the number)',
    answer:5, tolerance:0,
    hint:'Count the coins: 1, 2, 3, 4, 5.',
    explanation:'Five Re 1 coins = <b>Rs 5</b>.' }),

  makeMCQ({ id:'g1mth-mon-036', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C2+C1) + 'How much money is this?',
    options:['Rs 8','Rs 7','Rs 5','Rs 6'],
    answer:'Rs 8',
    hint:'Add: 5 + 2 + 1 = ?',
    explanation:'Rs 5 + Rs 2 + Re 1 = <b>Rs 8</b>.' }),

  makeMCQ({ id:'g1mth-mon-037', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C2+C2+C2) + 'How much money is this?',
    options:['Rs 6','Rs 4','Rs 2','Rs 8'],
    answer:'Rs 6',
    hint:'Count in 2s: 2, 4, 6.',
    explanation:'Rs 2 + Rs 2 + Rs 2 = <b>Rs 6</b>.' }),

  makeMCQ({ id:'g1mth-mon-038', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C1+C1) + 'How much money is this?',
    options:['Rs 7','Rs 5','Rs 6','Rs 8'],
    answer:'Rs 7',
    hint:'Add: 5 + 1 + 1 = ?',
    explanation:'Rs 5 + Re 1 + Re 1 = <b>Rs 7</b>.' }),

  makeMCQ({ id:'g1mth-mon-039', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C2+C2) + 'How much money is this?',
    options:['Rs 9','Rs 8','Rs 7','Rs 5'],
    answer:'Rs 9',
    hint:'Add: 5 + 2 + 2 = ?',
    explanation:'Rs 5 + Rs 2 + Rs 2 = <b>Rs 9</b>.' }),

  makeMCQ({ id:'g1mth-mon-040', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C2+C2+C1) + 'How much money is this?',
    options:['Rs 10','Rs 9','Rs 8','Rs 5'],
    answer:'Rs 10',
    hint:'Add: 5 + 2 + 2 + 1 = ?',
    explanation:'Rs 5 + Rs 2 + Rs 2 + Re 1 = <b>Rs 10</b>.' }),

  makeTF({ id:'g1mth-mon-041', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C2+C2) + 'These two coins together make Rs 4.',
    answer:true,
    explanation:'Yes! Rs 2 + Rs 2 = <b>Rs 4</b>.' }),

  makeTF({ id:'g1mth-mon-042', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C5+C1) + 'These coins together make Rs 7.',
    answer:false,
    explanation:'Rs 5 + Re 1 = <b>Rs 6</b>, not Rs 7.' }),

  makeMCQ({ id:'g1mth-mon-043', chapterId:'g1mth-money', difficulty:1, subsection:'counting_coins',
    question: _row(C1+C1+C2) + 'How much money is this?',
    options:['Rs 4','Rs 3','Rs 5','Rs 2'],
    answer:'Rs 4',
    hint:'Add: 1 + 1 + 2 = ?',
    explanation:'Re 1 + Re 1 + Rs 2 = <b>Rs 4</b>.' }),

  makeNum({ id:'g1mth-mon-044', chapterId:'g1mth-money', difficulty:2, subsection:'counting_coins',
    question: _row(C2+C2+C2+C1) + 'How much money is this? (Write the number)',
    answer:7, tolerance:0,
    hint:'Add: 2 + 2 + 2 + 1.',
    explanation:'Rs 2 + Rs 2 + Rs 2 + Re 1 = <b>Rs 7</b>.' }),

  makeMCQ({ id:'g1mth-mon-045', chapterId:'g1mth-money', difficulty:3, subsection:'counting_coins',
    question: _row(C5+C2+C1+C1+C1) + 'How much money is this?',
    options:['Rs 10','Rs 9','Rs 8','Rs 7'],
    answer:'Rs 10',
    hint:'Add: 5 + 2 + 1 + 1 + 1.',
    explanation:'Rs 5 + Rs 2 + Re 1 + Re 1 + Re 1 = <b>Rs 10</b>.' }),

// ── money_sums (046–080) ──────────────────────────────────────────────────

  makeNum({ id:'g1mth-mon-046', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'A biscuit costs Re 1 and a sweet costs Re 1. How much do they cost together?',
    answer:2, tolerance:0,
    hint:'1 + 1 = ?',
    explanation:'Re 1 + Re 1 = <b>Rs 2</b>.' }),

  makeNum({ id:'g1mth-mon-047', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'A pencil costs Rs 2 and a rubber costs Rs 2. How much do they cost together?',
    answer:4, tolerance:0,
    hint:'2 + 2 = ?',
    explanation:'Rs 2 + Rs 2 = <b>Rs 4</b>.' }),

  makeMCQ({ id:'g1mth-mon-048', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'An orange costs Rs 2. Priya pays with a Rs 5 coin. How much change does she get?',
    options:['Rs 3','Rs 2','Rs 5','Re 1'],
    answer:'Rs 3',
    hint:'5 − 2 = ?',
    explanation:'Rs 5 − Rs 2 = <b>Rs 3</b> change.' }),

  makeNum({ id:'g1mth-mon-049', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'Ali has Rs 5. He spends Re 1. How much is left?',
    answer:4, tolerance:0,
    hint:'5 − 1 = ?',
    explanation:'Rs 5 − Re 1 = <b>Rs 4</b>.' }),

  makeMCQ({ id:'g1mth-mon-050', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'A pen costs Rs 3. How many Re 1 coins do you need to pay?',
    options:['3','2','5','4'],
    answer:'3',
    hint:'Rs 3 = Re 1 + Re 1 + Re 1.',
    explanation:'You need <b>3 Re 1 coins</b> to pay Rs 3.' }),

  makeMCQ({ id:'g1mth-mon-051', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'A book costs Rs 7. Mia pays with a Rs 5 coin and a Rs 2 coin. Does she have enough?',
    options:['Yes, she has exactly Rs 7','No, she does not have enough','She has too much','She has Rs 9'],
    answer:'Yes, she has exactly Rs 7',
    hint:'Rs 5 + Rs 2 = ?',
    explanation:'Rs 5 + Rs 2 = <b>Rs 7</b>. She has exactly enough.' }),

  makeNum({ id:'g1mth-mon-052', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'Sam has Rs 3 and gets Rs 2 more. How much does he have now?',
    answer:5, tolerance:0,
    hint:'3 + 2 = ?',
    explanation:'Rs 3 + Rs 2 = <b>Rs 5</b>.' }),

  makeNum({ id:'g1mth-mon-053', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'Zara has Rs 8. She spends Rs 5 on a snack. How much does she have left?',
    answer:3, tolerance:0,
    hint:'8 − 5 = ?',
    explanation:'Rs 8 − Rs 5 = <b>Rs 3</b>.' }),

  makeMCQ({ id:'g1mth-mon-054', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'An apple costs Rs 2 and a banana costs Re 1. How much do they cost together?',
    options:['Rs 3','Rs 2','Re 1','Rs 5'],
    answer:'Rs 3',
    hint:'2 + 1 = ?',
    explanation:'Rs 2 + Re 1 = <b>Rs 3</b>.' }),

  makeMCQ({ id:'g1mth-mon-055', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'Ravi has Rs 10. He buys a toy for Rs 7. How much change does he get?',
    options:['Rs 3','Rs 7','Rs 4','Rs 5'],
    answer:'Rs 3',
    hint:'10 − 7 = ?',
    explanation:'Rs 10 − Rs 7 = <b>Rs 3</b> change.' }),

  makeMCQ({ id:'g1mth-mon-056', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'Which costs MORE: an item for Rs 5 or an item for Rs 3?',
    options:['Rs 5','Rs 3','They cost the same','Cannot tell'],
    answer:'Rs 5',
    hint:'Which number is bigger: 5 or 3?',
    explanation:'<b>Rs 5</b> is more than Rs 3. 5 > 3.' }),

  makeMCQ({ id:'g1mth-mon-057', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'Neha wants to buy something for Rs 5. She has a Rs 2 coin and a Rs 2 coin. Does she have enough?',
    options:['No, she only has Rs 4','Yes, she has Rs 5','Yes, she has Rs 6','She has Rs 3'],
    answer:'No, she only has Rs 4',
    hint:'Rs 2 + Rs 2 = ?',
    explanation:'Rs 2 + Rs 2 = Rs 4. She needs Rs 5, so she does <b>not have enough</b>.' }),

  makeNum({ id:'g1mth-mon-058', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'A ball costs Rs 6. Arun pays with a Rs 5 coin and a Re 1 coin. How much change does he get?',
    answer:0, tolerance:0,
    hint:'Rs 5 + Re 1 = ? and the ball costs Rs 6.',
    explanation:'Rs 5 + Re 1 = Rs 6. He pays exactly the right amount, so <b>no change (Rs 0)</b>.' }),

  makeNum({ id:'g1mth-mon-059', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'Priya has Rs 9. She buys a book for Rs 5. How much money is left?',
    answer:4, tolerance:0,
    hint:'9 − 5 = ?',
    explanation:'Rs 9 − Rs 5 = <b>Rs 4</b>.' }),

  makeMCQ({ id:'g1mth-mon-060', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'A toy costs Rs 8. Which set of coins makes exactly Rs 8?',
    options:['Rs 5 + Rs 2 + Re 1','Rs 5 + Rs 5','Rs 2 + Rs 2','Rs 5 + Re 1'],
    answer:'Rs 5 + Rs 2 + Re 1',
    hint:'Which adds up to exactly 8?',
    explanation:'Rs 5 + Rs 2 + Re 1 = <b>Rs 8</b>. That is exactly right.' }),

  makeNum({ id:'g1mth-mon-061', chapterId:'g1mth-money', difficulty:1, subsection:'money_sums',
    question:'A lolly costs Rs 2. How much do 2 lollies cost?',
    answer:4, tolerance:0,
    hint:'2 + 2 = ?',
    explanation:'Rs 2 × 2 = <b>Rs 4</b>. Two lollies cost Rs 4.' }),

  makeNum({ id:'g1mth-mon-062', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'A mango costs Rs 5. A pear costs Rs 2. How much do both cost together?',
    answer:7, tolerance:0,
    hint:'5 + 2 = ?',
    explanation:'Rs 5 + Rs 2 = <b>Rs 7</b>.' }),

  makeMCQ({ id:'g1mth-mon-063', chapterId:'g1mth-money', difficulty:2, subsection:'money_sums',
    question:'Sam has Rs 10. He pays Rs 3 for a bun and Rs 2 for juice. How much is left?',
    options:['Rs 5','Rs 7','Rs 6','Rs 8'],
    answer:'Rs 5',
    hint:'He spends: 3 + 2 = 5. Then 10 − 5 = ?',
    explanation:'He spends Rs 3 + Rs 2 = Rs 5. Rs 10 − Rs 5 = <b>Rs 5</b> left.' }),

  makeMCQ({ id:'g1mth-mon-064', chapterId:'g1mth-money', difficulty:3, subsection:'money_sums',
    question:'Ria wants to buy 3 sweets, each costing Re 1. She has a Rs 5 coin. How much change will she get?',
    options:['Rs 2','Rs 3','Rs 5','Re 1'],
    answer:'Rs 2',
    hint:'3 × Re 1 = Rs 3. Change = Rs 5 − Rs 3.',
    explanation:'3 sweets × Re 1 = Rs 3. Change = Rs 5 − Rs 3 = <b>Rs 2</b>.' }),

  makeNum({ id:'g1mth-mon-065', chapterId:'g1mth-money', difficulty:3, subsection:'money_sums',
    question:'Ali has Rs 7. He buys two items: one costs Rs 2 and one costs Rs 3. How much does he have left?',
    answer:2, tolerance:0,
    hint:'He spends 2 + 3 = 5. Then 7 − 5 = ?',
    explanation:'He spends Rs 2 + Rs 3 = Rs 5. Rs 7 − Rs 5 = <b>Rs 2</b>.' }),

);
})();
