'use strict';
// ═══════════════════════════════════════════════════════════
//  MathMaster Grade 5 - Difficulty Audit & Correction
//  Loaded LAST so it can patch questions from all other files.
//
//  PURPOSE: Many questions were originally tagged difficulty:4
//  just because they are "hard", not because they are genuine
//  contextual word problems. This file:
//    1. Patches known misclassified L4 questions down to L3
//    2. Adds new genuine L4 word problems for thin chapters
// ═══════════════════════════════════════════════════════════

(function () {

// ── STEP 1: Patch misclassified L4 questions ──────────────
// These are questions tagged difficulty:4 that are really just
// bare computation with minimal or no narrative context.

const DEMOTE_TO_3 = new Set([
  // Powers - not word problems, just calculations
  'P_W05',  // "A number squared gives 289" - square root lookup
  'P_W06',  // "Which is greater: 4³ or 6²?" - pure comparison
  'P12',    // "Square field, side 9m, area = 9²" - one-step

  // Square Numbers
  'S14',    // "Square tile area 225cm², find side" - one-step sqrt

  // Geometry - shape definition, not a word problem
  'G16',    // "A shape has 5 sides and one line of symmetry, name it"
]);

// For safety, only demote if the question is genuinely bare.
// Read each question and decide; leave the check here for audit trail.
STATIC_QUESTIONS.forEach(q => {
  if (q.difficulty === 4 && DEMOTE_TO_3.has(q.id)) {
    q.difficulty = 3;
  }
});

// ── STEP 2: Add genuine L4 word problems for thin chapters ─

const WP4 = [

  // ═══════ POWERS & EXPONENTS - 10 genuine word problems ═══
  makeNum({ id:'PW4_01', chapterId:'powers', difficulty:4,
    question:'Mia saves money each day: Rs 2 on Day 1, Rs 4 on Day 2, Rs 8 on Day 3 (each day it doubles).<br>How much does she save on <b>Day 6</b>?',
    answer:'64', acceptableAnswers:['64','Rs 64'],
    hint:'Day 1 = 2¹, Day 2 = 2², Day 3 = 2³… Day 6 = 2⁶.',
    explanation:'2⁶ = 2×2×2×2×2×2 = <b>Rs 64</b>.' }),

  makeNum({ id:'PW4_02', chapterId:'powers', difficulty:4,
    question:'Ahmad folds a sheet of paper in half. Each fold <b>doubles</b> the number of layers.<br>How many layers does the paper have after <b>5 folds</b>?<br>Express as a power of 2, then calculate.',
    answer:'32', acceptableAnswers:['32','2^5'],
    hint:'1 fold = 2¹ = 2 layers. 2 folds = 2² = 4… 5 folds = 2⁵.',
    explanation:'2⁵ = 2×2×2×2×2 = <b>32 layers</b>.' }),

  makeNum({ id:'PW4_03', chapterId:'powers', difficulty:4,
    question:'A library has <b>4 floors</b>. Each floor has <b>4 rooms</b>. Each room has <b>4 shelves</b>. Each shelf holds <b>4 books</b>.<br>Write the total number of books as a power of 4, then calculate.',
    answer:'256', acceptableAnswers:['256','4^4'],
    hint:'4 × 4 × 4 × 4 = 4⁴. Calculate.',
    explanation:'4⁴ = 4×4×4×4 = 16×16 = <b>256 books</b>.' }),

  makeNum({ id:'PW4_04', chapterId:'powers', difficulty:4,
    question:'Rs 100 is invested. It <b>doubles</b> every year for <b>3 years</b>.<br>How much money is there after 3 years?',
    answer:'800', acceptableAnswers:['800','Rs 800'],
    hint:'Doubles 3 times: 100 × 2³ = 100 × 8.',
    explanation:'2³ = 8. Rs 100 × 8 = <b>Rs 800</b>.' }),

  makeNum({ id:'PW4_05', chapterId:'powers', difficulty:4,
    question:'A bacteria colony starts with <b>1 bacterium</b> and triples every hour.<br>Express the count after <b>4 hours</b> as a power of 3, then calculate.',
    answer:'81', acceptableAnswers:['81','3^4'],
    hint:'After 1 h = 3¹. After 2 h = 3². After 4 h = 3⁴.',
    explanation:'3⁴ = 3×3×3×3 = <b>81 bacteria</b>.' }),

  makeNum({ id:'PW4_06', chapterId:'powers', difficulty:4,
    question:'A cube-shaped box has a side of <b>5 cm</b>.<br>How many <b>1 cm³ small cubes</b> fit exactly inside it?<br><i>(Volume of a cube = side³)</i>',
    answer:'125', acceptableAnswers:['125','125cm3'],
    hint:'Volume = 5³ = 5 × 5 × 5.',
    explanation:'5³ = 125. <b>125 small cubes</b> fit inside.' }),

  makeMCQ({ id:'PW4_07', chapterId:'powers', difficulty:4,
    question:'Kiran has a square photo. Its inner side is <b>8 cm</b>. He adds a frame that makes each outer side <b>10 cm</b>.<br>What is the area of the <b>frame only</b> (the border)?',
    options:['20 cm²','36 cm²','64 cm²','100 cm²'],
    answer:'36 cm²',
    hint:'Frame area = outer² − inner². 10² − 8².',
    explanation:'10² = 100. 8² = 64. Frame = 100 − 64 = <b>36 cm²</b>.' }),

  makeNum({ id:'PW4_08', chapterId:'powers', difficulty:4,
    question:'A square courtyard has a side of <b>7 m</b>. The owner wants to extend it to a side of <b>9 m</b>.<br>By how much does the <b>area increase</b>?',
    answer:'32', acceptableAnswers:['32','32m2'],
    hint:'New area = 9² = 81. Old area = 7² = 49. Increase = 81 − 49.',
    explanation:'81 − 49 = <b>32 m²</b>.' }),

  makeNum({ id:'PW4_09', chapterId:'powers', difficulty:4,
    question:'Leila earns <b>Rs 3</b> pocket money in Week 1. Each week her pocket money <b>triples</b>.<br>How much does she earn in <b>Week 4</b>?',
    answer:'81', acceptableAnswers:['81','Rs 81'],
    hint:'Week 1 = 3¹. Week 2 = 3². Week 3 = 3³. Week 4 = 3⁴.',
    explanation:'3⁴ = 81. She earns <b>Rs 81</b> in Week 4.' }),

  makeNum({ id:'PW4_10', chapterId:'powers', difficulty:4,
    question:'Dev buys floor tiles for a square room. The room has side <b>6 m</b>. Tiles cost <b>Rs 450 per m²</b>.<br>Find the <b>total cost</b> of tiling.',
    answer:'16200', acceptableAnswers:['16200','Rs 16200'],
    hint:'Area = 6² = 36 m². Cost = 36 × 450.',
    explanation:'6² = 36 m². 36 × 450 = <b>Rs 16,200</b>.' }),

  // ═══════ FRACTIONS - extra L4 to pad thin pool ════════════
  makeNum({ id:'FRW4_01', chapterId:'fractions', difficulty:4,
    question:'A school collects money for charity. Class A collects <b>Rs 240</b> and Class B collects <b>Rs 160</b>.<br>What <b>fraction</b> of the total did Class B collect? (Give in simplest form)',
    answer:'2/5',
    hint:'Total = 240+160=400. Class B fraction = 160/400. Simplify.',
    explanation:'160/400 = 2/5. (Divide both by 80.) <b>2/5</b>.' }),

  makeNum({ id:'FRW4_02', chapterId:'fractions', difficulty:4,
    question:'Riya has <b>Rs 480</b>. She spends <b>⅜</b> on books and <b>¼</b> on stationery.<br>How much money does she have <b>left</b>?',
    answer:'180', acceptableAnswers:['180','Rs 180'],
    hint:'Books = 3/8 × 480 = 180. Stationery = 1/4 × 480 = 120. Left = 480 − 180 − 120.',
    explanation:'Books = Rs 180. Stationery = Rs 120. Left = 480 − 300 = <b>Rs 180</b>.' }),

  // ═══════ RATIO - extra L4 ══════════════════════════════════
  makeNum({ id:'RW4_01', chapterId:'ratio', difficulty:4,
    question:'Mango juice and water are mixed in the ratio <b>1:4</b>.<br>Leila makes <b>2 litres</b> of the mixture in total.<br>How many <b>mL of mango juice</b> does she use?',
    answer:'400', acceptableAnswers:['400','400mL'],
    hint:'Total parts = 5. Mango = 1/5 of 2000 mL.',
    explanation:'2 L = 2000 mL. 1/5 × 2000 = <b>400 mL mango juice</b>.' }),

  makeNum({ id:'RW4_02', chapterId:'ratio', difficulty:4,
    question:'A recipe uses flour and sugar in the ratio <b>5:2</b>. Priya uses <b>350 g of flour</b>.<br>How much <b>sugar</b> does she need?',
    answer:'140', acceptableAnswers:['140','140g'],
    hint:'5 parts = 350 g. 1 part = 70 g. Sugar = 2 parts.',
    explanation:'1 part = 350÷5 = 70 g. Sugar = 2×70 = <b>140 g</b>.' }),

  // ═══════ AVERAGE - extra L4 ════════════════════════════════
  makeNum({ id:'AW4_01', chapterId:'average', difficulty:4,
    question:'The average mark of 6 pupils is <b>74</b>. When a seventh pupil joins, the new average drops to <b>71</b>.<br>What mark did the <b>seventh pupil</b> score?',
    answer:'50',
    hint:'Old total = 6×74=444. New total = 7×71=497. 7th mark = 497−444.',
    explanation:'Old total = 444. New total = 497. 7th pupil = 497−444 = <b>50</b>.' }),

  makeNum({ id:'AW4_02', chapterId:'average', difficulty:4,
    question:'Dev scored <b>82, 76, 90</b> in three tests. He wants an average of <b>85</b> over 4 tests.<br>What must he score in the <b>4th test</b>?',
    answer:'92',
    hint:'Target total = 4×85=340. Current total = 82+76+90=248. 4th = 340−248.',
    explanation:'248+?=340. 4th test = <b>92</b>.' }),

  // ═══════ GRAPHS - extra L4 ═════════════════════════════════
  makeNum({ id:'GRW4_01', chapterId:'graphs', difficulty:4,
    question:`A pictogram shows fruit sold at a market stall:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Fruit</th><th>Symbols</th></tr>
  <tr><td>Mango</td><td><span class="picto-sym">🥭🥭🥭🥭🥭</span></td></tr>
  <tr><td>Orange</td><td><span class="picto-sym">🍊🍊🍊</span></td></tr>
  <tr><td>Banana</td><td><span class="picto-sym">🍌🍌🍌🍌</span></td></tr>
  <tr><td>Guava</td><td><span class="picto-sym">🍐🍐</span></td></tr>
</table>
<span class="picto-key">🔑 Key: 1 symbol = 20 fruits</span>
</div>
What is the <b>total number of fruits</b> sold?`,
    answer:'280', acceptableAnswers:['280','280 fruits'],
    hint:'Total symbols = 5+3+4+2=14. 14 × 20 = ?',
    explanation:'14 × 20 = <b>280 fruits</b>.' }),

  makeNum({ id:'GRW4_02', chapterId:'graphs', difficulty:4,
    question:`A pictogram shows books borrowed from a library:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Week</th><th>Symbols</th></tr>
  <tr><td>Week 1</td><td><span class="picto-sym">📚📚📚</span></td></tr>
  <tr><td>Week 2</td><td><span class="picto-sym">📚📚📚📚📚</span></td></tr>
  <tr><td>Week 3</td><td><span class="picto-sym">📚📚📚📚</span></td></tr>
  <tr><td>Week 4</td><td><span class="picto-sym">📚📚📚📚📚📚📚📚</span></td></tr>
</table>
<span class="picto-key">🔑 Key: 📚 = 15 books</span>
</div>
What is the <b>average</b> number of books borrowed per week?`,
    answer:'75', acceptableAnswers:['75','75 books'],
    hint:'Total symbols = 3+5+4+8=20. Total books = 20×15=300. Average = 300÷4.',
    explanation:'20 × 15 = 300 books. Average = 300 ÷ 4 = <b>75 books</b>.' }),

];

WP4.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });

console.log(`✅ Audit complete. Difficulty patches applied. Added ${WP4.filter(Boolean).length} genuine L4 word problems.`);

})();
