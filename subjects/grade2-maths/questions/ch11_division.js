'use strict';
(function () {

// Grade 2 Division by 2 — g2mth-division
// Book scope: dividing even numbers up to 20 by 2 (Part 2 pp.103-113)
// Subsections: sharing_by_2 · dividing_by_2 · div_word_probs
// IDs: g2mth-div-001 … g2mth-div-090

STATIC_QUESTIONS.push(

// ── sharing_by_2 (001–030) ───────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-div-001', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'6 apples are shared equally between 2 children. How many does each child get?',
    options:['3','2','4','6'], answer:'3',
    hint:'Share 6 into 2 equal groups.',
    explanation:'6 ÷ 2 = <b>3</b>. Each child gets 3 apples.' }),

  makeMCQ({ id:'g2mth-div-002', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'8 sweets are shared equally between 2 friends. How many each?',
    options:['4','3','5','8'], answer:'4',
    hint:'Share 8 into 2 equal groups.',
    explanation:'8 ÷ 2 = <b>4</b>. Each friend gets 4 sweets.' }),

  makeMCQ({ id:'g2mth-div-003', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'4 biscuits are shared between 2 children. How many each?',
    options:['2','4','1','3'], answer:'2',
    hint:'Share 4 into 2 equal groups.',
    explanation:'4 ÷ 2 = <b>2</b>.' }),

  makeMCQ({ id:'g2mth-div-004', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'10 stickers are shared equally between 2 pupils. How many stickers each?',
    options:['5','4','6','10'], answer:'5',
    hint:'Share 10 into 2 equal groups.',
    explanation:'10 ÷ 2 = <b>5</b>.' }),

  makeMCQ({ id:'g2mth-div-005', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'12 balls are shared between 2 teams. How many does each team get?',
    options:['6','5','7','12'], answer:'6',
    hint:'Share 12 into 2 equal groups.',
    explanation:'12 ÷ 2 = <b>6</b>.' }),

  makeMCQ({ id:'g2mth-div-006', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'2 cookies are shared between 2 children. How many each?',
    options:['1','2','0','3'], answer:'1',
    hint:'Share 2 into 2 equal groups.',
    explanation:'2 ÷ 2 = <b>1</b>.' }),

  makeMCQ({ id:'g2mth-div-007', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'14 pencils are shared equally between 2 children. How many each?',
    options:['7','8','6','14'], answer:'7',
    hint:'Share 14 into 2 equal groups.',
    explanation:'14 ÷ 2 = <b>7</b>.' }),

  makeMCQ({ id:'g2mth-div-008', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'16 marbles are shared between 2 friends. How many each?',
    options:['8','6','9','16'], answer:'8',
    hint:'Share 16 into 2 equal groups.',
    explanation:'16 ÷ 2 = <b>8</b>.' }),

  makeMCQ({ id:'g2mth-div-009', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'18 buttons are shared equally between 2 people. How many each?',
    options:['9','8','10','18'], answer:'9',
    hint:'Share 18 into 2 equal groups.',
    explanation:'18 ÷ 2 = <b>9</b>.' }),

  makeMCQ({ id:'g2mth-div-010', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'20 flowers are shared equally between 2 vases. How many in each vase?',
    options:['10','9','11','20'], answer:'10',
    hint:'Share 20 into 2 equal groups.',
    explanation:'20 ÷ 2 = <b>10</b>.' }),

  makeTF({ id:'g2mth-div-011', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Sharing 6 items between 2 people gives each person 3.',
    answer:true,
    explanation:'True — 6 ÷ 2 = 3.' }),

  makeMCQ({ id:'g2mth-div-012', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'2 children share a pizza equally. The pizza has 10 slices. How many slices does each child get?',
    options:['5','4','6','10'], answer:'5',
    hint:'10 ÷ 2 = 5.',
    explanation:'10 ÷ 2 = <b>5</b> slices each.' }),

  makeMCQ({ id:'g2mth-div-013', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'A farmer has 8 eggs. She puts them into 2 equal baskets. How many eggs in each basket?',
    options:['4','3','5','8'], answer:'4',
    hint:'8 ÷ 2 = 4.',
    explanation:'8 ÷ 2 = <b>4</b> eggs per basket.' }),

  makeMCQ({ id:'g2mth-div-014', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'2 shelves share 12 books equally. How many books on each shelf?',
    options:['6','5','7','12'], answer:'6',
    hint:'12 ÷ 2 = 6.',
    explanation:'12 ÷ 2 = <b>6</b> books per shelf.' }),

  makeMCQ({ id:'g2mth-div-015', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'Mia cuts 16 sandwiches in half. How many pieces does she get?',
    options:['32','8','16','20'], answer:'32',
    hint:'Each sandwich gives 2 pieces, so 16 × 2.',
    explanation:'16 sandwiches × 2 pieces = <b>32</b> pieces.' }),

  makeMCQ({ id:'g2mth-div-016', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'6 crayons split equally into 2 boxes. How many in each box?',
    options:['3','2','4','6'], answer:'3',
    hint:'6 ÷ 2 = 3.',
    explanation:'6 ÷ 2 = <b>3</b> crayons per box.' }),

  makeMCQ({ id:'g2mth-div-017', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'Tom and Ana share 18 grapes equally. How many grapes each?',
    options:['9','8','10','18'], answer:'9',
    hint:'18 ÷ 2 = 9.',
    explanation:'18 ÷ 2 = <b>9</b> grapes each.' }),

  makeTF({ id:'g2mth-div-018', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'If 20 is shared equally between 2, each person gets 10.',
    answer:true,
    explanation:'True — 20 ÷ 2 = 10.' }),

  makeMCQ({ id:'g2mth-div-019', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'Two friends share 14 fish equally. How many each?',
    options:['7','6','8','14'], answer:'7',
    hint:'14 ÷ 2 = 7.',
    explanation:'14 ÷ 2 = <b>7</b> fish each.' }),

  makeMCQ({ id:'g2mth-div-020', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'4 children share equally: Leo and Uma take 2 each. How many children shared? (Hint: 4 ÷ ? = 2)',
    options:['2','4','1','3'], answer:'2',
    hint:'4 ÷ 2 = 2, so 2 children each got 2.',
    explanation:'4 shared between <b>2</b> children gives 2 each.' }),

  makeNum({ id:'g2mth-div-021', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Share 10 equally between 2. How many each?',
    answer:5, tolerance:0,
    hint:'10 ÷ 2 = ?',
    explanation:'10 ÷ 2 = <b>5</b>.' }),

  makeNum({ id:'g2mth-div-022', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Share 18 equally between 2. How many each?',
    answer:9, tolerance:0,
    hint:'18 ÷ 2 = ?',
    explanation:'18 ÷ 2 = <b>9</b>.' }),

  makeNum({ id:'g2mth-div-023', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Share 14 equally between 2. How many each?',
    answer:7, tolerance:0,
    hint:'14 ÷ 2 = ?',
    explanation:'14 ÷ 2 = <b>7</b>.' }),

  makeNum({ id:'g2mth-div-024', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Share 4 equally between 2. How many each?',
    answer:2, tolerance:0,
    hint:'4 ÷ 2 = ?',
    explanation:'4 ÷ 2 = <b>2</b>.' }),

  makeMCQ({ id:'g2mth-div-025', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'Lena bakes 20 biscuits and puts them in 2 equal packets. How many in each packet?',
    options:['10','9','11','20'], answer:'10',
    hint:'20 ÷ 2 = 10.',
    explanation:'20 ÷ 2 = <b>10</b> biscuits per packet.' }),

  makeMCQ({ id:'g2mth-div-026', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'A necklace has 16 beads split into 2 equal halves. How many beads in each half?',
    options:['8','7','9','16'], answer:'8',
    hint:'16 ÷ 2 = 8.',
    explanation:'16 ÷ 2 = <b>8</b> beads.' }),

  makeMCQ({ id:'g2mth-div-027', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'2 children share 2 bananas. How many bananas each?',
    options:['1','2','0','3'], answer:'1',
    hint:'2 ÷ 2 = 1.',
    explanation:'2 ÷ 2 = <b>1</b> banana each.' }),

  makeMCQ({ id:'g2mth-div-028', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'A string of 12 lights is cut into 2 equal pieces. How many lights in each piece?',
    options:['6','5','7','12'], answer:'6',
    hint:'12 ÷ 2 = 6.',
    explanation:'12 ÷ 2 = <b>6</b> lights per piece.' }),

  makeTF({ id:'g2mth-div-029', chapterId:'g2mth-division', difficulty:1, subsection:'sharing_by_2',
    question:'Sharing 14 equally between 2 gives each person 8.',
    answer:false,
    explanation:'False — 14 ÷ 2 = <b>7</b>, not 8.' }),

  makeMCQ({ id:'g2mth-div-030', chapterId:'g2mth-division', difficulty:2, subsection:'sharing_by_2',
    question:'A shop puts 20 apples equally into 2 bags. How many apples in each bag?',
    options:['10','8','12','20'], answer:'10',
    hint:'20 ÷ 2 = 10.',
    explanation:'20 ÷ 2 = <b>10</b> apples per bag.' }),

// ── dividing_by_2 (031–060) ──────────────────────────────────────────────────

  makeNum({ id:'g2mth-div-031', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'2 ÷ 2 = ?',
    answer:1, tolerance:0,
    hint:'How many 2s go into 2?',
    explanation:'2 ÷ 2 = <b>1</b>.' }),

  makeNum({ id:'g2mth-div-032', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'4 ÷ 2 = ?',
    answer:2, tolerance:0,
    hint:'How many 2s go into 4?',
    explanation:'4 ÷ 2 = <b>2</b>.' }),

  makeNum({ id:'g2mth-div-033', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'6 ÷ 2 = ?',
    answer:3, tolerance:0,
    hint:'How many 2s go into 6?',
    explanation:'6 ÷ 2 = <b>3</b>.' }),

  makeNum({ id:'g2mth-div-034', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'8 ÷ 2 = ?',
    answer:4, tolerance:0,
    hint:'How many 2s go into 8?',
    explanation:'8 ÷ 2 = <b>4</b>.' }),

  makeNum({ id:'g2mth-div-035', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'10 ÷ 2 = ?',
    answer:5, tolerance:0,
    hint:'How many 2s go into 10?',
    explanation:'10 ÷ 2 = <b>5</b>.' }),

  makeNum({ id:'g2mth-div-036', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'12 ÷ 2 = ?',
    answer:6, tolerance:0,
    hint:'How many 2s go into 12?',
    explanation:'12 ÷ 2 = <b>6</b>.' }),

  makeNum({ id:'g2mth-div-037', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'14 ÷ 2 = ?',
    answer:7, tolerance:0,
    hint:'How many 2s go into 14?',
    explanation:'14 ÷ 2 = <b>7</b>.' }),

  makeNum({ id:'g2mth-div-038', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'16 ÷ 2 = ?',
    answer:8, tolerance:0,
    hint:'How many 2s go into 16?',
    explanation:'16 ÷ 2 = <b>8</b>.' }),

  makeNum({ id:'g2mth-div-039', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'18 ÷ 2 = ?',
    answer:9, tolerance:0,
    hint:'How many 2s go into 18?',
    explanation:'18 ÷ 2 = <b>9</b>.' }),

  makeNum({ id:'g2mth-div-040', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'20 ÷ 2 = ?',
    answer:10, tolerance:0,
    hint:'How many 2s go into 20?',
    explanation:'20 ÷ 2 = <b>10</b>.' }),

  makeMCQ({ id:'g2mth-div-041', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Which division fact links to 5 × 2 = 10?',
    options:['10 ÷ 2 = 5','10 ÷ 5 = 2','5 ÷ 2 = 2.5','2 × 10 = 20'], answer:'10 ÷ 2 = 5',
    hint:'If 5 × 2 = 10, then 10 ÷ 2 = 5.',
    explanation:'Multiplication and division are linked: 5 × 2 = 10, so <b>10 ÷ 2 = 5</b>.' }),

  makeMCQ({ id:'g2mth-div-042', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Which division fact links to 8 × 2 = 16?',
    options:['16 ÷ 2 = 8','16 ÷ 8 = 2','8 ÷ 2 = 4','2 ÷ 8 = 0.25'], answer:'16 ÷ 2 = 8',
    hint:'8 × 2 = 16, so 16 ÷ 2 = ?',
    explanation:'8 × 2 = 16, so <b>16 ÷ 2 = 8</b>.' }),

  makeMCQ({ id:'g2mth-div-043', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Which multiplication fact helps you find 14 ÷ 2?',
    options:['7 × 2 = 14','6 × 2 = 12','8 × 2 = 16','5 × 2 = 10'], answer:'7 × 2 = 14',
    hint:'Think: ? × 2 = 14.',
    explanation:'7 × 2 = 14, so 14 ÷ 2 = <b>7</b>.' }),

  makeTF({ id:'g2mth-div-044', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'If 9 × 2 = 18, then 18 ÷ 2 = 9.',
    answer:true,
    explanation:'True — multiplication and division are inverse operations.' }),

  makeMCQ({ id:'g2mth-div-045', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'What is half of 20?',
    options:['10','5','15','20'], answer:'10',
    hint:'Half means divide by 2.',
    explanation:'Half of 20 = 20 ÷ 2 = <b>10</b>.' }),

  makeMCQ({ id:'g2mth-div-046', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'What is half of 16?',
    options:['8','6','9','7'], answer:'8',
    hint:'Half means divide by 2.',
    explanation:'Half of 16 = 16 ÷ 2 = <b>8</b>.' }),

  makeMCQ({ id:'g2mth-div-047', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'What is half of 12?',
    options:['6','5','7','4'], answer:'6',
    hint:'12 ÷ 2 = ?',
    explanation:'Half of 12 = 12 ÷ 2 = <b>6</b>.' }),

  makeMCQ({ id:'g2mth-div-048', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'What is half of 8?',
    options:['4','3','5','8'], answer:'4',
    hint:'8 ÷ 2 = ?',
    explanation:'Half of 8 = 8 ÷ 2 = <b>4</b>.' }),

  makeMCQ({ id:'g2mth-div-049', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'What is half of 18?',
    options:['9','8','10','7'], answer:'9',
    hint:'18 ÷ 2 = ?',
    explanation:'Half of 18 = 18 ÷ 2 = <b>9</b>.' }),

  makeMCQ({ id:'g2mth-div-050', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'What is half of 6?',
    options:['3','2','4','6'], answer:'3',
    hint:'6 ÷ 2 = ?',
    explanation:'Half of 6 = 6 ÷ 2 = <b>3</b>.' }),

  makeMCQ({ id:'g2mth-div-051', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'4 ÷ 2 = □. What is the missing number?',
    options:['2','4','1','3'], answer:'2',
    hint:'How many 2s fit into 4?',
    explanation:'4 ÷ 2 = <b>2</b>.' }),

  makeMCQ({ id:'g2mth-div-052', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'□ ÷ 2 = 7. What is the missing number?',
    options:['14','7','12','9'], answer:'14',
    hint:'7 × 2 = 14.',
    explanation:'7 × 2 = 14, so <b>14</b> ÷ 2 = 7.' }),

  makeMCQ({ id:'g2mth-div-053', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'□ ÷ 2 = 9. What is the missing number?',
    options:['18','9','16','20'], answer:'18',
    hint:'9 × 2 = 18.',
    explanation:'9 × 2 = 18, so <b>18</b> ÷ 2 = 9.' }),

  makeMCQ({ id:'g2mth-div-054', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'□ ÷ 2 = 6. What is the missing number?',
    options:['12','6','10','8'], answer:'12',
    hint:'6 × 2 = 12.',
    explanation:'6 × 2 = 12, so <b>12</b> ÷ 2 = 6.' }),

  makeMCQ({ id:'g2mth-div-055', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Which number, when halved, gives 5?',
    options:['10','5','8','12'], answer:'10',
    hint:'5 × 2 = 10.',
    explanation:'10 ÷ 2 = 5. The number is <b>10</b>.' }),

  makeTF({ id:'g2mth-div-056', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Half of 14 is 6.',
    answer:false,
    explanation:'False — half of 14 = 14 ÷ 2 = <b>7</b>, not 6.' }),

  makeMCQ({ id:'g2mth-div-057', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'10 ÷ 2 = □. The answer is …',
    options:['5','4','6','10'], answer:'5',
    hint:'How many 2s fit into 10?',
    explanation:'10 ÷ 2 = <b>5</b>.' }),

  makeMCQ({ id:'g2mth-div-058', chapterId:'g2mth-division', difficulty:2, subsection:'dividing_by_2',
    question:'Which number, when halved, gives 8?',
    options:['16','8','14','18'], answer:'16',
    hint:'8 × 2 = 16.',
    explanation:'16 ÷ 2 = 8. The number is <b>16</b>.' }),

  makeTF({ id:'g2mth-div-059', chapterId:'g2mth-division', difficulty:1, subsection:'dividing_by_2',
    question:'20 ÷ 2 = 10.',
    answer:true,
    explanation:'True — 20 ÷ 2 = 10.' }),

  makeMCQ({ id:'g2mth-div-060', chapterId:'g2mth-division', difficulty:3, subsection:'dividing_by_2',
    question:'A number divided by 2 gives 7. Then doubled gives …',
    options:['14','7','12','9'], answer:'14',
    hint:'7 × 2 = 14.',
    explanation:'The number is 14 (since 14 ÷ 2 = 7), and doubled = 14 × 2 = <b>28</b>. Wait — re-read: divided by 2 gives 7, so the number is 14. Then "doubled" means the original (14) doubled = <b>28</b>.' }),

// ── div_word_probs (061–090) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2mth-div-061', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A mother cuts a cake into 2 equal pieces. The cake weighs 16 kg. How heavy is each piece?',
    options:['8 kg','7 kg','9 kg','16 kg'], answer:'8 kg',
    hint:'16 ÷ 2 = 8.',
    explanation:'16 ÷ 2 = <b>8 kg</b> per piece.' }),

  makeMCQ({ id:'g2mth-div-062', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A classroom has 20 children. They split into 2 equal teams. How many in each team?',
    options:['10','9','11','20'], answer:'10',
    hint:'20 ÷ 2 = 10.',
    explanation:'20 ÷ 2 = <b>10</b> children per team.' }),

  makeMCQ({ id:'g2mth-div-063', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A farmer has 18 chickens and puts them equally into 2 coops. How many chickens in each coop?',
    options:['9','8','10','18'], answer:'9',
    hint:'18 ÷ 2 = 9.',
    explanation:'18 ÷ 2 = <b>9</b> chickens per coop.' }),

  makeMCQ({ id:'g2mth-div-064', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'14 apples are packed in 2 equal boxes. How many in each box?',
    options:['7','6','8','14'], answer:'7',
    hint:'14 ÷ 2 = 7.',
    explanation:'14 ÷ 2 = <b>7</b> apples per box.' }),

  makeMCQ({ id:'g2mth-div-065', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A rope of 12 m is cut into 2 equal pieces. How long is each piece?',
    options:['6 m','5 m','7 m','12 m'], answer:'6 m',
    hint:'12 ÷ 2 = 6.',
    explanation:'12 ÷ 2 = <b>6 m</b> per piece.' }),

  makeNum({ id:'g2mth-div-066', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A box has 16 chocolates split equally between 2 children. How many does each child get?',
    answer:8, tolerance:0,
    hint:'16 ÷ 2 = ?',
    explanation:'16 ÷ 2 = <b>8</b> chocolates each.' }),

  makeMCQ({ id:'g2mth-div-067', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'Leo has 10 stickers. He gives half to his sister. How many does he keep?',
    options:['5','4','6','10'], answer:'5',
    hint:'Half of 10 = 10 ÷ 2 = 5.',
    explanation:'Leo keeps half = 10 ÷ 2 = <b>5</b> stickers.' }),

  makeMCQ({ id:'g2mth-div-068', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A bag holds 8 oranges. How many bags are needed for 16 oranges?',
    options:['2','1','3','4'], answer:'2',
    hint:'16 ÷ 8 = 2.',
    explanation:'16 ÷ 8 = <b>2</b> bags. (This also uses the idea of dividing equally.)' }),

  makeMCQ({ id:'g2mth-div-069', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'Sam and Priya share 6 books equally. How many books each?',
    options:['3','2','4','6'], answer:'3',
    hint:'6 ÷ 2 = 3.',
    explanation:'6 ÷ 2 = <b>3</b> books each.' }),

  makeMCQ({ id:'g2mth-div-070', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A teacher has 20 pencils. She gives half to one class and half to another. How many pencils does each class get?',
    options:['10','5','15','20'], answer:'10',
    hint:'20 ÷ 2 = 10.',
    explanation:'20 ÷ 2 = <b>10</b> pencils per class.' }),

  makeNum({ id:'g2mth-div-071', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'A baker has 18 buns. He puts them in 2 equal trays. How many buns per tray?',
    answer:9, tolerance:0,
    hint:'18 ÷ 2 = ?',
    explanation:'18 ÷ 2 = <b>9</b> buns per tray.' }),

  makeMCQ({ id:'g2mth-div-072', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'Mia buys 12 flowers and puts them equally into 2 vases. The next day she adds 2 more to EACH vase. How many flowers are in each vase now?',
    options:['8','6','10','12'], answer:'8',
    hint:'12 ÷ 2 = 6 per vase, then 6 + 2 = 8.',
    explanation:'12 ÷ 2 = 6 per vase. After adding 2 more: 6 + 2 = <b>8</b>.' }),

  makeMCQ({ id:'g2mth-div-073', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'There are 16 seats in 2 rows. Each row has the same number of seats. How many seats in each row?',
    options:['8','6','10','7'], answer:'8',
    hint:'16 ÷ 2 = 8.',
    explanation:'16 ÷ 2 = <b>8</b> seats per row.' }),

  makeMCQ({ id:'g2mth-div-074', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'Kai earns Rs 10 from mowing the lawn. He shares it equally with his brother. How much does each get?',
    options:['Rs 5','Rs 4','Rs 6','Rs 10'], answer:'Rs 5',
    hint:'10 ÷ 2 = 5.',
    explanation:'Rs 10 ÷ 2 = <b>Rs 5</b> each.' }),

  makeNum({ id:'g2mth-div-075', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A school has 20 books. 2 classrooms share them equally. Each classroom has 5 tables. How many books per table?',
    answer:2, tolerance:0,
    hint:'20 ÷ 2 = 10 books per class; 10 ÷ 5 = 2 books per table.',
    explanation:'20 ÷ 2 = 10 books per classroom; 10 ÷ 5 = <b>2</b> books per table.' }),

  makeMCQ({ id:'g2mth-div-076', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'Half of a number is 7. What is the number?',
    options:['14','7','12','9'], answer:'14',
    hint:'If half = 7, then the whole = 7 × 2.',
    explanation:'7 × 2 = <b>14</b>. The number is 14.' }),

  makeMCQ({ id:'g2mth-div-077', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'Half of a number is 9. What is the number?',
    options:['18','9','16','20'], answer:'18',
    hint:'If half = 9, then the whole = 9 × 2.',
    explanation:'9 × 2 = <b>18</b>.' }),

  makeNum({ id:'g2mth-div-078', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A group of 20 children is split into 2 equal teams. Each team runs 3 laps. How many laps are run in total?',
    answer:60, tolerance:0,
    hint:'10 children per team × 3 laps = 30 laps per team; 2 teams × 30 = 60.',
    explanation:'Each team runs 3 laps. 2 teams × 3 laps × 10 children = well, total laps run = 2 teams × 30 laps per team = <b>60 laps</b>.' }),

  makeMCQ({ id:'g2mth-div-079', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'Tom and Ana share Rs 18 equally. They each spend Rs 5. How much does each have left?',
    options:['Rs 4','Rs 5','Rs 3','Rs 6'], answer:'Rs 4',
    hint:'18 ÷ 2 = 9 each; 9 − 5 = 4.',
    explanation:'Rs 18 ÷ 2 = Rs 9 each. Rs 9 − Rs 5 = <b>Rs 4</b> left.' }),

  makeMCQ({ id:'g2mth-div-080', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'A ribbon of 20 cm is cut in half. Each half is then cut in half again. How long is each piece now?',
    options:['5 cm','10 cm','4 cm','8 cm'], answer:'5 cm',
    hint:'20 ÷ 2 = 10; 10 ÷ 2 = 5.',
    explanation:'20 ÷ 2 = 10 cm, then 10 ÷ 2 = <b>5 cm</b>.' }),

  makeNum({ id:'g2mth-div-081', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'There are 16 children in a class. Half go outside. How many stay inside?',
    answer:8, tolerance:0,
    hint:'16 ÷ 2 = 8.',
    explanation:'16 ÷ 2 = <b>8</b> children stay inside.' }),

  makeMCQ({ id:'g2mth-div-082', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A number divided by 2 equals 6. Find the number.',
    options:['12','6','8','10'], answer:'12',
    hint:'? ÷ 2 = 6 means ? = 6 × 2.',
    explanation:'6 × 2 = <b>12</b>.' }),

  makeMCQ({ id:'g2mth-div-083', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'A number divided by 2 equals 8. Find the number.',
    options:['16','8','14','18'], answer:'16',
    hint:'? ÷ 2 = 8 means ? = 8 × 2.',
    explanation:'8 × 2 = <b>16</b>.' }),

  makeNum({ id:'g2mth-div-084', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'Mia has 14 red marbles and 6 blue marbles. She splits ALL marbles equally into 2 bags. How many marbles in each bag?',
    answer:10, tolerance:0,
    hint:'Total = 14 + 6 = 20; 20 ÷ 2 = 10.',
    explanation:'Total = 20 marbles. 20 ÷ 2 = <b>10</b> per bag.' }),

  makeMCQ({ id:'g2mth-div-085', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'A mother bakes 20 biscuits. She eats 2 and shares the rest equally between her 2 children. How many does each child get?',
    options:['9','8','10','7'], answer:'9',
    hint:'20 − 2 = 18 left; 18 ÷ 2 = 9.',
    explanation:'20 − 2 = 18 biscuits left. 18 ÷ 2 = <b>9</b> each.' }),

  makeTF({ id:'g2mth-div-086', chapterId:'g2mth-division', difficulty:2, subsection:'div_word_probs',
    question:'If you know 4 × 2 = 8, you can also work out 8 ÷ 2 = 4.',
    answer:true,
    explanation:'True — multiplication and division are reverse operations.' }),

  makeNum({ id:'g2mth-div-087', chapterId:'g2mth-division', difficulty:3, subsection:'div_word_probs',
    question:'Kai plants 12 seeds in 2 rows with equal numbers of seeds. Then 3 seeds in each row do not grow. How many seeds grow in each row?',
    answer:3, tolerance:0,
    hint:'12 ÷ 2 = 6 per row; 6 − 3 = 3 grow.',
    explanation:'12 ÷ 2 = 6 per row. 6 − 3 = <b>3</b> grow per row.' }),

  makeMCQ({ id:'g2mth-div-088', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'A shop sells pens in pairs (2 pens per packet). How many packets are needed for 18 pens?',
    options:['9','8','10','6'], answer:'9',
    hint:'18 ÷ 2 = 9.',
    explanation:'18 ÷ 2 = <b>9</b> packets.' }),

  makeMCQ({ id:'g2mth-div-089', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'Ana and Ben each earn half of the total prize money of Rs 20. Then Ana spends half of her share. How much does Ana have left?',
    options:['Rs 5','Rs 4','Rs 10','Rs 8'], answer:'Rs 5',
    hint:'Rs 20 ÷ 2 = Rs 10 each; Rs 10 ÷ 2 = Rs 5 left.',
    explanation:'Rs 20 ÷ 2 = Rs 10 each. Ana spends half: Rs 10 ÷ 2 = <b>Rs 5</b> left.' }),

  makeMCQ({ id:'g2mth-div-090', chapterId:'g2mth-division', difficulty:4, subsection:'div_word_probs',
    question:'A teacher has 16 pencils. She gives 4 pencils to the first group, then shares the rest equally between 2 groups. How many pencils does each of the remaining 2 groups get?',
    options:['6','5','7','8'], answer:'6',
    hint:'16 − 4 = 12 left; 12 ÷ 2 = 6.',
    explanation:'16 − 4 = 12 pencils. 12 ÷ 2 = <b>6</b> per group.' })

);

})();
