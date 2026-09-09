'use strict';
(function () {

// Grade 8 Maths — Inequalities (g8m-inequalities)
// Subsections: inequality_notation · solving_inequalities · inequality_graphs
// Source: MIE Grade 8 Maths textbook pp.165-179

STATIC_QUESTIONS.push(

  // ── inequality_notation (001–025) ───────────────────────────────────────────

  makeMCQ({ id:'g8m-ineq-001', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'What does the inequality symbol > mean?',
    options:['is greater than','is less than','is equal to','is not equal to'],
    answer:'is greater than',
    hint:'The open end of > points to the smaller value.',
    explanation:'<b>></b> means "is greater than". For example, 7 > 3 reads "7 is greater than 3".' }),

  makeTF({ id:'g8m-ineq-002', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'The symbol ≥ means "greater than or equal to".',
    answer:true,
    explanation:'TRUE. ≥ (greater than or equal to) means the value can be greater than OR exactly equal to the stated number.' }),

  makeMCQ({ id:'g8m-ineq-003', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'Which inequality correctly describes "x is less than or equal to 7"?',
    options:['x < 7','x > 7','x ≤ 7','x ≥ 7'], answer:'x ≤ 7',
    hint:'"Less than or equal" uses the ≤ symbol.',
    explanation:'<b>x ≤ 7</b> means x can be any value less than 7, or exactly 7.' }),

  makeMCQ({ id:'g8m-ineq-004', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'Which of the following is TRUE?',
    options:['5 > 8','3 < 1','−2 > −5','4 ≤ 3'], answer:'−2 > −5',
    hint:'On a number line, numbers further right are greater.',
    explanation:'<b>−2 > −5</b> because −2 is to the right of −5 on a number line (closer to 0). The other statements are all false.' }),

  makeMCQ({ id:'g8m-ineq-005', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'Which inequality represents "at least 10"?',
    options:['x > 10','x < 10','x ≥ 10','x ≤ 10'], answer:'x ≥ 10',
    hint:'"At least" means 10 or more.',
    explanation:'"At least 10" means 10 or more, so the correct inequality is <b>x ≥ 10</b>.' }),

  makeMCQ({ id:'g8m-ineq-006', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'The symbol < means:',
    options:['is less than','is greater than','is equal to','is less than or equal to'],
    answer:'is less than',
    explanation:'<b><</b> means "is less than". The closed (pointed) end always points to the smaller number.' }),

  makeTF({ id:'g8m-ineq-007', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'The inequality −3 < −1 is TRUE.',
    answer:true,
    explanation:'TRUE. On the number line, −3 is to the LEFT of −1, which means −3 is less than −1. So −3 < −1 is correct.' }),

  makeMCQ({ id:'g8m-ineq-008', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Which of these values satisfies the inequality x > 4?',
    options:['3','4','3.9','4.1'], answer:'4.1',
    hint:'x > 4 means strictly more than 4 — 4 itself is NOT included.',
    explanation:'<b>4.1 > 4</b> is true. 3 < 4, 3.9 < 4, and 4 = 4 (not strictly greater).' }),

  makeMCQ({ id:'g8m-ineq-009', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Which of these values satisfies x ≤ −2?',
    options:['0','−1','−2','1'], answer:'−2',
    hint:'≤ includes the boundary value.',
    explanation:'<b>−2 ≤ −2</b> is true (−2 is equal to −2). 0, −1 and 1 are all greater than −2.' }),

  makeMCQ({ id:'g8m-ineq-010', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'A theatre requires that you be "more than 12 years old" to attend. Which inequality expresses this?',
    options:['a ≥ 12','a > 12','a < 12','a ≤ 12'], answer:'a > 12',
    hint:'"More than" is strictly greater than — 12-year-olds are not allowed.',
    explanation:'"More than 12" means <b>a > 12</b>. 12 is not included.' }),

  makeMCQ({ id:'g8m-ineq-011', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Which phrase matches the inequality n ≤ 5?',
    options:['n is more than 5','n is at most 5','n is at least 5','n is exactly 5'],
    answer:'n is at most 5',
    hint:'"At most 5" means 5 is the maximum — can be 5 or below.',
    explanation:'"At most 5" means n can be 5 or any value smaller, which matches <b>n ≤ 5</b>.' }),

  makeTF({ id:'g8m-ineq-012', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'The value x = 3 satisfies the inequality x ≥ 3.',
    answer:true,
    explanation:'TRUE. x ≥ 3 means "x is 3 or more". Since x = 3 equals 3, the condition is satisfied.' }),

  makeMCQ({ id:'g8m-ineq-013', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_notation',
    question:'Which of the following represents the set of integers that satisfy −2 ≤ x < 3?',
    options:['{−2, −1, 0, 1, 2, 3}','{−2, −1, 0, 1, 2}','{−1, 0, 1, 2}','{−1, 0, 1, 2, 3}'],
    answer:'{−2, −1, 0, 1, 2}',
    hint:'Include −2 (≤ means include) and exclude 3 (< means exclude).',
    explanation:'<b>{−2, −1, 0, 1, 2}</b>. The ≤ includes −2; the < excludes 3.' }),

  makeMCQ({ id:'g8m-ineq-014', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'"Fewer than 20 students" can be written as:',
    options:['s ≤ 20','s < 20','s > 20','s ≥ 20'], answer:'s < 20',
    hint:'"Fewer than" is strictly less than.',
    explanation:'"Fewer than 20" means <b>s < 20</b>. 20 itself is NOT included.' }),

  makeMCQ({ id:'g8m-ineq-015', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'The speed limit on a road is 60 km/h. Which inequality means you must not exceed it?',
    options:['v > 60','v < 60','v ≤ 60','v ≥ 60'], answer:'v ≤ 60',
    hint:'You can drive at 60 or less — 60 is allowed.',
    explanation:'You must drive at 60 or below: <b>v ≤ 60</b>.' }),

  // ── solving_inequalities (026–050) ──────────────────────────────────────────

  makeMCQ({ id:'g8m-ineq-026', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: x + 5 > 9',
    options:['x > 4','x > 14','x < 4','x < 14'], answer:'x > 4',
    hint:'Subtract 5 from both sides.',
    explanation:'x + 5 > 9 → x > 9 − 5 → <b>x > 4</b>.' }),

  makeMCQ({ id:'g8m-ineq-027', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: 3x < 12',
    options:['x < 4','x < 36','x > 4','x > 36'], answer:'x < 4',
    hint:'Divide both sides by 3.',
    explanation:'3x < 12 → x < 12 ÷ 3 → <b>x < 4</b>.' }),

  makeMCQ({ id:'g8m-ineq-028', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: 2x − 3 ≥ 7',
    options:['x ≥ 5','x ≥ 2','x ≤ 5','x ≤ 2'], answer:'x ≥ 5',
    hint:'Add 3, then divide by 2.',
    explanation:'2x − 3 ≥ 7 → 2x ≥ 10 → <b>x ≥ 5</b>.' }),

  makeMCQ({ id:'g8m-ineq-029', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: x − 4 ≤ 1',
    options:['x ≤ 5','x ≤ −3','x ≥ 5','x ≥ −3'], answer:'x ≤ 5',
    hint:'Add 4 to both sides.',
    explanation:'x − 4 ≤ 1 → x ≤ 1 + 4 → <b>x ≤ 5</b>.' }),

  makeMCQ({ id:'g8m-ineq-030', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: 4x + 1 > 13',
    options:['x > 3','x > 7/2','x < 3','x < 14'], answer:'x > 3',
    hint:'Subtract 1, then divide by 4.',
    explanation:'4x + 1 > 13 → 4x > 12 → <b>x > 3</b>.' }),

  makeMCQ({ id:'g8m-ineq-031', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: −2x > 8',
    options:['x > −4','x < −4','x > 4','x < 4'], answer:'x < −4',
    hint:'When you divide by a NEGATIVE number, the inequality sign reverses.',
    explanation:'−2x > 8 → x < 8 ÷ (−2) → <b>x < −4</b>. Dividing by −2 reverses the inequality.' }),

  makeTF({ id:'g8m-ineq-032', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'When multiplying or dividing both sides of an inequality by a negative number, the inequality sign must be reversed.',
    answer:true,
    explanation:'TRUE. For example, −x > 2 becomes x < −2 when multiplied by −1. Failing to reverse the sign gives a wrong solution set.' }),

  makeMCQ({ id:'g8m-ineq-033', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: 5 − x < 3',
    options:['x > 2','x < 2','x > 8','x < −2'], answer:'x > 2',
    hint:'Subtract 5 from both sides: −x < −2. Then multiply by −1 and reverse.',
    explanation:'5 − x < 3 → −x < −2 → x > 2. (Multiply by −1 and reverse the sign.) <b>x > 2</b>.' }),

  makeMCQ({ id:'g8m-ineq-034', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: 3x − 5 < 7',
    options:['x < 4','x > 4','x < −4','x < ⅔'], answer:'x < 4',
    hint:'Add 5, then divide by 3.',
    explanation:'3x − 5 < 7 → 3x < 12 → <b>x < 4</b>.' }),

  makeMCQ({ id:'g8m-ineq-035', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: 2(x + 3) ≥ 10',
    options:['x ≥ 2','x ≥ 5','x ≥ 8','x ≥ −2'], answer:'x ≥ 2',
    hint:'Expand the bracket first: 2x + 6 ≥ 10.',
    explanation:'2x + 6 ≥ 10 → 2x ≥ 4 → <b>x ≥ 2</b>.' }),

  makeMCQ({ id:'g8m-ineq-036', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Which value of x does NOT satisfy 2x + 1 ≤ 9?',
    options:['4','3','0','5'], answer:'5',
    hint:'Solve the inequality first: x ≤ 4.',
    explanation:'2x + 1 ≤ 9 → 2x ≤ 8 → x ≤ 4. So x = 5 does not satisfy it (5 > 4).' }),

  makeNum({ id:'g8m-ineq-037', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: x/2 > 5. What is the smallest integer value of x that satisfies this?',
    answer:11, tolerance:0,
    hint:'x > 10. The smallest integer greater than 10 is 11.',
    explanation:'x/2 > 5 → x > 10. The smallest integer greater than 10 is <b>11</b>.' }),

  makeMCQ({ id:'g8m-ineq-038', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: 7 − 3x ≥ 1',
    options:['x ≤ 2','x ≥ 2','x ≤ −2','x ≥ −2'], answer:'x ≤ 2',
    hint:'Subtract 7: −3x ≥ −6. Then divide by −3 and reverse.',
    explanation:'7 − 3x ≥ 1 → −3x ≥ −6 → x ≤ 2 (reverse sign when dividing by −3). <b>x ≤ 2</b>.' }),

  makeMCQ({ id:'g8m-ineq-039', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Adding the same number to both sides of an inequality:',
    options:[
      'Reverses the direction of the inequality',
      'Does not change the direction of the inequality',
      'Makes the inequality an equation',
      'Is not allowed'
    ], answer:'Does not change the direction of the inequality',
    hint:'Think about the effect of adding 5 to both sides of 3 < 7.',
    explanation:'Adding any number to both sides preserves the inequality direction. 3 < 7 → 3 + 5 < 7 + 5 → 8 < 12. <b>Direction unchanged</b>.' }),

  makeMCQ({ id:'g8m-ineq-040', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve for x: 4(2x − 1) < 3(x + 5)',
    options:['x < 19/5','x > 19/5','x < 3','x > 3'], answer:'x < 19/5',
    hint:'Expand: 8x − 4 < 3x + 15. Collect x terms.',
    explanation:'8x − 4 < 3x + 15 → 5x < 19 → x < 19/5 = 3.8. Nearest option: <b>x < 19/5</b>.' }),

  // ── inequality_graphs (051–075) ─────────────────────────────────────────────

  makeMCQ({ id:'g8m-ineq-051', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_graphs',
    question:'On a number line, an OPEN circle at a value means:',
    options:[
      'That value IS included in the solution',
      'That value is NOT included in the solution',
      'The solution ends there',
      'The inequality has no solution'
    ], answer:'That value is NOT included in the solution',
    hint:'Open (hollow) circle = not included; closed (filled) circle = included.',
    explanation:'An <b>open circle</b> means the boundary value is <b>NOT</b> included. It is used for strict inequalities (< or >).' }),

  makeMCQ({ id:'g8m-ineq-052', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_graphs',
    question:'Which inequality would show a CLOSED circle at 3 on a number line?',
    options:['x < 3','x > 3','x ≥ 3','x ≠ 3'], answer:'x ≥ 3',
    hint:'Closed circle = the boundary value is included (≤ or ≥).',
    explanation:'A <b>closed circle</b> is used for ≤ or ≥. Here, x ≥ 3 includes 3, shown by a filled dot.' }),

  makeMCQ({ id:'g8m-ineq-053', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'The solution x > 2 is shown on a number line as:',
    options:[
      'A closed circle at 2, arrow pointing left',
      'An open circle at 2, arrow pointing right',
      'A closed circle at 2, arrow pointing right',
      'An open circle at 2, arrow pointing left'
    ], answer:'An open circle at 2, arrow pointing right',
    hint:'> means strictly greater than (open circle); greater than means to the right.',
    explanation:'x > 2: <b>open circle at 2</b> (2 not included) with an <b>arrow pointing right</b> (values greater than 2).' }),

  makeMCQ({ id:'g8m-ineq-054', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'Which inequality is represented by a closed circle at −1 with an arrow pointing left?',
    options:['x > −1','x ≥ −1','x < −1','x ≤ −1'], answer:'x ≤ −1',
    hint:'Closed circle = includes the value; arrow left = less than.',
    explanation:'Closed circle at −1 (includes −1), arrow left (smaller values): <b>x ≤ −1</b>.' }),

  makeMCQ({ id:'g8m-ineq-055', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'The number line shows an open circle at 5, arrow to the right. Which inequality does this represent?',
    options:['x < 5','x ≤ 5','x > 5','x ≥ 5'], answer:'x > 5',
    hint:'Open circle = not included; arrow right = greater than.',
    explanation:'Open circle at 5 (5 not included) + arrow right (larger values) = <b>x > 5</b>.' }),

  makeTF({ id:'g8m-ineq-056', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'The solution x ≤ 4 is shown by a CLOSED circle at 4 and an arrow pointing to the RIGHT.',
    answer:false,
    explanation:'FALSE. x ≤ 4 shows a closed circle at 4 but the arrow points to the <b>LEFT</b> (for values less than 4).' }),

  makeMCQ({ id:'g8m-ineq-057', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'Which inequality matches the description: "all values of x between −3 and 5, including −3 but not 5"?',
    options:['−3 < x < 5','−3 ≤ x < 5','−3 < x ≤ 5','−3 ≤ x ≤ 5'],
    answer:'−3 ≤ x < 5',
    hint:'Include −3 (so ≤), exclude 5 (so <).',
    explanation:'Including −3 gives ≤, excluding 5 gives <. So <b>−3 ≤ x < 5</b>.' }),

  makeMCQ({ id:'g8m-ineq-058', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'On the number line, the solution to 2x > 6 is shown as:',
    options:[
      'Open circle at 3, arrow pointing right',
      'Open circle at 6, arrow pointing right',
      'Closed circle at 3, arrow pointing left',
      'Open circle at 3, arrow pointing left'
    ], answer:'Open circle at 3, arrow pointing right',
    hint:'Solve first: x > 3.',
    explanation:'2x > 6 → x > 3. On the number line: <b>open circle at 3</b> (3 not included), <b>arrow right</b>.' }),

  makeMCQ({ id:'g8m-ineq-059', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'How many integers satisfy −2 < x ≤ 3?',
    options:['4','5','6','3'], answer:'5',
    hint:'List the integers: −1, 0, 1, 2, 3.',
    explanation:'−2 is not included, 3 is included. Integers: <b>−1, 0, 1, 2, 3</b> — that is 5 integers.' }),

  makeMCQ({ id:'g8m-ineq-060', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'Solve and describe the graph of: −4 ≤ 2x < 6',
    options:[
      'Closed circle at −2, open circle at 3, segment between them',
      'Open circle at −2, closed circle at 3, segment between them',
      'Open circles at both −2 and 3',
      'Closed circles at both −2 and 3'
    ], answer:'Closed circle at −2, open circle at 3, segment between them',
    hint:'Divide all parts by 2: −2 ≤ x < 3.',
    explanation:'Dividing by 2: <b>−2 ≤ x < 3</b>. The ≤ gives a closed circle at −2; the < gives an open circle at 3. A segment connects them.' }),

  makeMCQ({ id:'g8m-ineq-061', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'Which set of values is shaded when graphing x < −1?',
    options:[
      'All values to the right of −1',
      'All values to the left of −1',
      'Only the value −1',
      'All values including −1 and to the right'
    ], answer:'All values to the left of −1',
    hint:'< means less than — smaller values are to the LEFT on the number line.',
    explanation:'x < −1 means all values LESS than −1 — shown by shading to the <b>left</b> of an open circle at −1.' }),

  makeTF({ id:'g8m-ineq-062', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'The solution set of x > 5 AND x < 10 overlaps — it can be written as 5 < x < 10.',
    answer:true,
    explanation:'TRUE. x > 5 AND x < 10 means x must satisfy BOTH conditions simultaneously: <b>5 < x < 10</b>.' }),

  makeMCQ({ id:'g8m-ineq-063', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'The solution x > 2 OR x < −3 on a number line shows:',
    options:[
      'A single continuous segment',
      'Two separate rays pointing outward',
      'Two separate rays pointing inward',
      'A single closed segment'
    ], answer:'Two separate rays pointing outward',
    hint:'"OR" means either condition — one ray from −3 left, one ray from 2 right.',
    explanation:'x > 2 gives a ray going right from 2, and x < −3 gives a ray going left from −3. These are <b>two separate rays pointing outward</b>.' }),

  // ── inequality_notation top-up (064–068) ─────────────────────────────────
  makeTF({ id:'g8m-ineq-064', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_notation',
    question:'The symbol ≤ means "less than or equal to".',
    answer:true,
    explanation:'TRUE. ≤ means "less than OR equal to". For example, x ≤ 5 means x can be 5 or any value below 5.' }),

  makeMCQ({ id:'g8m-ineq-065', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Which inequality means "x is at least 7"?',
    options:['x ≥ 7','x > 7','x ≤ 7','x < 7'],
    answer:'x ≥ 7',
    hint:'"At least 7" means 7 or more.',
    explanation:'"At least 7" means x can equal 7 or be greater: <b>x ≥ 7</b>.' }),

  makeMCQ({ id:'g8m-ineq-066', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Is −2 a solution to x > −3?',
    options:['Yes, because −2 > −3','No, because −2 < 0','No, because −2 ≠ −3','Yes, because −2 is positive'],
    answer:'Yes, because −2 > −3',
    hint:'Compare: −2 and −3 on a number line.',
    explanation:'On a number line −2 is to the right of −3, so −2 > −3. <b>Yes</b>, −2 satisfies x > −3.' }),

  makeMCQ({ id:'g8m-ineq-067', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_notation',
    question:'Which of the following is NOT a solution to 2 ≤ x < 6?',
    options:['2','4','5.9','6'],
    answer:'6',
    hint:'The inequality says x is less than 6 (strict).',
    explanation:'x must satisfy 2 ≤ x < 6. x = 6 fails because 6 < 6 is false. <b>6</b> is NOT a solution.' }),

  makeTF({ id:'g8m-ineq-068', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_notation',
    question:'x² > 4 and x > 2 have exactly the same solution set.',
    answer:false,
    explanation:'FALSE. x² > 4 gives x > 2 OR x < −2. But x > 2 alone excludes values like x = −3 which satisfy x² > 4.' }),

  // ── solving_inequalities top-up (069–073) ────────────────────────────────
  makeMCQ({ id:'g8m-ineq-069', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: x + 9 > 15',
    options:['x > 6','x > 24','x < 6','x ≥ 6'],
    answer:'x > 6',
    hint:'Subtract 9 from both sides.',
    explanation:'x + 9 > 15 → x > 15 − 9 → <b>x > 6</b>.' }),

  makeMCQ({ id:'g8m-ineq-070', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'solving_inequalities',
    question:'Solve: 4x ≤ 20',
    options:['x ≤ 5','x ≥ 5','x < 5','x > 5'],
    answer:'x ≤ 5',
    hint:'Divide both sides by 4.',
    explanation:'4x ≤ 20 → x ≤ 20/4 → <b>x ≤ 5</b>.' }),

  makeMCQ({ id:'g8m-ineq-071', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: −3x > 12',
    options:['x < −4','x > −4','x > 4','x < 4'],
    answer:'x < −4',
    hint:'Divide by −3 and flip the inequality sign.',
    explanation:'Dividing by −3 (negative) reverses the sign: x < 12÷(−3) → <b>x < −4</b>.' }),

  makeMCQ({ id:'g8m-ineq-072', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: 2x − 7 ≥ 3',
    options:['x ≥ 5','x ≥ 2','x ≤ 5','x > 5'],
    answer:'x ≥ 5',
    hint:'Add 7, then divide by 2.',
    explanation:'2x − 7 ≥ 3 → 2x ≥ 10 → <b>x ≥ 5</b>.' }),

  makeMCQ({ id:'g8m-ineq-073', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'solving_inequalities',
    question:'Solve: 5 − 2x < 1',
    options:['x > 2','x < 2','x > −2','x < −2'],
    answer:'x > 2',
    hint:'Subtract 5, then divide by −2 (flip the sign).',
    explanation:'5 − 2x < 1 → −2x < −4 → x > −4/(−2) → <b>x > 2</b>.' }),

  // ── inequality_graphs top-up (074–080) ───────────────────────────────────
  makeMCQ({ id:'g8m-ineq-074', chapterId:'g8m-inequalities', difficulty:1,
    subsection:'inequality_graphs',
    question:'On a number line, a CLOSED (filled) circle at x = 4 means:',
    options:['x = 4 IS included in the solution','x = 4 is NOT included','x must equal 4','x > 4 only'],
    answer:'x = 4 IS included in the solution',
    hint:'Closed circle = endpoint is included.',
    explanation:'A <b>closed (filled) circle</b> at 4 means 4 is part of the solution set (used for ≤ and ≥).' }),

  makeMCQ({ id:'g8m-ineq-075', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'Which graph represents x ≤ −1?',
    options:[
      'Filled circle at −1, arrow pointing left',
      'Open circle at −1, arrow pointing left',
      'Filled circle at −1, arrow pointing right',
      'Open circle at −1, arrow pointing right'
    ], answer:'Filled circle at −1, arrow pointing left',
    hint:'≤ uses a filled circle; values less than −1 are to the left.',
    explanation:'x ≤ −1 includes −1 (filled circle) and all values to the left (less than −1).' }),

  makeTF({ id:'g8m-ineq-076', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'The graph of x > 3 uses an open circle at 3 with an arrow pointing right.',
    answer:true,
    explanation:'TRUE. x > 3 means strictly greater than 3 (open circle, not including 3) with values extending right.' }),

  makeMCQ({ id:'g8m-ineq-077', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'The compound inequality −2 < x ≤ 5 is shown as:',
    options:[
      'Open circle at −2, filled circle at 5, segment between them',
      'Filled circle at −2, open circle at 5, segment between them',
      'Open circles at both −2 and 5',
      'Filled circles at both −2 and 5'
    ], answer:'Open circle at −2, filled circle at 5, segment between them',
    hint:'< gives open circle; ≤ gives filled circle.',
    explanation:'-2 is strict (open circle), 5 is included (filled circle). The segment between them shows all valid x.' }),

  makeMCQ({ id:'g8m-ineq-078', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'On a number line, the solution to x > 0 AND x < 4 is best described as:',
    options:['An open segment between 0 and 4','Two separate rays','A single closed segment','The entire number line'],
    answer:'An open segment between 0 and 4',
    hint:'"AND" means both conditions must hold — the intersection of the two sets.',
    explanation:'x > 0 AND x < 4 → 0 < x < 4 — an <b>open segment</b> (neither 0 nor 4 included).' }),

  makeMCQ({ id:'g8m-ineq-079', chapterId:'g8m-inequalities', difficulty:3,
    subsection:'inequality_graphs',
    question:'After solving 2x + 1 > 7, what does the number line graph show?',
    options:[
      'Open circle at 3, arrow right',
      'Open circle at 4, arrow right',
      'Filled circle at 3, arrow right',
      'Open circle at 3, arrow left'
    ], answer:'Open circle at 3, arrow right',
    hint:'Solve first: 2x + 1 > 7 → x > 3.',
    explanation:'2x > 6 → x > 3. Open circle at 3 (not included), arrow pointing right.' }),

  makeTF({ id:'g8m-ineq-080', chapterId:'g8m-inequalities', difficulty:2,
    subsection:'inequality_graphs',
    question:'The solution set of x ≥ −5 includes the number −5.',
    answer:true,
    explanation:'TRUE. The symbol ≥ means "greater than or equal to", so −5 itself is included.' }),

);

})();
