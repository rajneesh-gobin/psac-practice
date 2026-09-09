'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — question FAMILIES: one context, several kinds of thinking.
//  IDs: g9ict-fam-001-a … g9ict-fam-015-e. The family id is the question id
//  minus its -<variant> suffix; there is deliberately no `family:` field.
//  Written against the L1/L2/L3/L4 = 160/1269/263/9 shape measured on this
//  pack: it is wide and flat, so almost everything here is L3 or L4 and just
//  over half of it is not an MCQ.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// A fixed light plate with dark ink, like .q-table: the practice screen forces
// a pale ink colour, so a figure that inherits its colour is invisible there.
function sheet(cols, rows) {
  let h = '<div class="q-scroll"><table class="q-table"><tr><th></th>'
        + cols.map(function (c) { return '<th style="text-align:center">' + c + '</th>'; }).join('')
        + '</tr>';
  rows.forEach(function (r, i) {
    h += '<tr><th style="text-align:center">' + (i + 1) + '</th>'
       + cols.map(function (_, k) {
           return '<td style="text-align:center">' + (r[k] === undefined ? '' : r[k]) + '</td>';
         }).join('')
       + '</tr>';
  });
  return h + '</table></div>';
}

function grid(headers, rows) {
  return '<div class="q-scroll"><table class="q-table"><tr>'
    + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>'
    + rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('')
    + '</table></div>';
}

function panel(title, rows) {
  return '<div class="q-scroll"><table class="q-table">'
    + '<tr><th colspan="2">' + title + '</th></tr>'
    + rows.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>'; }).join('')
    + '</table></div>';
}

function code(lines) {
  return '<div style="border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#1e293b;'
    + 'text-shadow:none;padding:8px 12px;margin:0.6rem 0;font-family:ui-monospace,Menlo,Consolas,monospace;'
    + 'font-size:13px;white-space:pre;text-align:left;overflow-x:auto">' + lines.join('\n') + '</div>';
}

const SW = 'stroke="#1e293b" stroke-width="1.4" fill="none"';
function vA(x, y1, y2) {
  return '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + (y2 - 7) + '" ' + SW + '/>'
    + '<polygon points="' + x + ',' + y2 + ' ' + (x - 4.5) + ',' + (y2 - 8) + ' ' + (x + 4.5) + ',' + (y2 - 8) + '" fill="#1e293b"/>';
}
function hA(y, x1, x2) {
  const d = x2 > x1 ? 1 : -1;
  return '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 7 * d) + '" y2="' + y + '" ' + SW + '/>'
    + '<polygon points="' + x2 + ',' + y + ' ' + (x2 - 8 * d) + ',' + (y - 4.5) + ' ' + (x2 - 8 * d) + ',' + (y + 4.5) + '" fill="#1e293b"/>';
}
function tx(x, y, s) {
  return '<text x="' + x + '" y="' + y + '" font-size="11" text-anchor="middle" fill="#1e293b"'
    + ' font-family="system-ui,-apple-system,sans-serif">' + s + '</text>';
}
function box(x, y, w, h, label, rx) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" '
    + SW + ' fill="#f8fafc"/>' + tx(x + w / 2, y + h / 2 + 4, label);
}
function para(cx, y, w, h, label) {
  const s = 14;
  return '<polygon points="' + (cx - w / 2 + s) + ',' + y + ' ' + (cx + w / 2) + ',' + y + ' '
    + (cx + w / 2 - s) + ',' + (y + h) + ' ' + (cx - w / 2) + ',' + (y + h) + '" ' + SW + ' fill="#f8fafc"/>'
    + tx(cx, y + h / 2 + 4, label);
}

// ── Figure: the sum-to-N flowchart used by family 007 ─────────────────────
const FLOW = '<div class="q-scroll" style="text-align:center">'
  + '<svg viewBox="0 0 340 360" width="300" role="img" aria-label="A flowchart with a decision box and a loop">'
  + '<rect x="0" y="0" width="340" height="360" rx="10" fill="#ffffff"/>'
  + box(90, 6, 80, 24, 'Start', 12)
  + vA(130, 30, 50)
  + para(130, 50, 96, 28, 'INPUT N')
  + vA(130, 78, 98)
  + box(85, 98, 90, 26, 'T = 0')
  + vA(130, 124, 144)
  + box(85, 144, 90, 26, 'C = 1')
  + vA(130, 170, 190)
  + '<polygon points="130,190 192,220 130,250 68,220" ' + SW + ' fill="#f8fafc"/>'
  + tx(130, 224, 'C &#8804; N ?')
  + tx(146, 266, 'Yes') + vA(130, 250, 274)
  + box(85, 274, 90, 26, 'T = T + C')
  + vA(130, 300, 318)
  + box(85, 318, 90, 26, 'C = C + 1')
  + '<line x1="85" y1="331" x2="30" y2="331" ' + SW + '/>'
  + '<line x1="30" y1="331" x2="30" y2="220" ' + SW + '/>'
  + hA(220, 30, 68)
  + tx(212, 212, 'No') + hA(220, 192, 242)
  + para(288, 206, 92, 28, 'OUTPUT T')
  + vA(288, 234, 254)
  + box(248, 254, 80, 24, 'Stop', 12)
  + '</svg></div>';

// ── Figure: the star-topology lab used by family 011 ──────────────────────
const LAB = '<div class="q-scroll" style="text-align:center">'
  + '<svg viewBox="0 0 320 200" width="300" role="img" aria-label="A diagram of a small computer room and its connections">'
  + '<rect x="0" y="0" width="320" height="200" rx="10" fill="#ffffff"/>'
  + '<ellipse cx="160" cy="22" rx="46" ry="16" ' + SW + ' fill="#f8fafc"/>' + tx(160, 26, 'Internet')
  + '<line x1="160" y1="38" x2="160" y2="52" ' + SW + '/>'
  + box(125, 52, 70, 24, 'Router', 4)
  + '<line x1="160" y1="76" x2="160" y2="100" ' + SW + '/>'
  + box(125, 100, 70, 24, 'Switch', 4)
  + '<line x1="160" y1="124" x2="39" y2="156" ' + SW + '/>'
  + '<line x1="160" y1="124" x2="119" y2="156" ' + SW + '/>'
  + '<line x1="160" y1="124" x2="201" y2="156" ' + SW + '/>'
  + '<line x1="160" y1="124" x2="281" y2="156" ' + SW + '/>'
  + box(12, 156, 54, 24, 'PC 1', 4)
  + box(92, 156, 54, 24, 'PC 2', 4)
  + box(174, 156, 54, 24, 'PC 3', 4)
  + box(254, 156, 54, 24, 'PC 4', 4)
  + '</svg></div>';

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 001 — a week of canteen sales, and a SUM range that starts a row
//  too far down. Outcome: choose a function AND give it the right range.
// ══════════════════════════════════════════════════════════════════════════

const SALES = sheet(['A', 'B'], [
  ['Day', 'Sales (Rs)'],
  ['Monday', '450'],
  ['Tuesday', '380'],
  ['Wednesday', '620'],
  ['Thursday', '540'],
  ['Friday', '710'],
  ['Total', ''],
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-001-a', chapterId: 'g9ict-spreadsheets', subsection: 'formulas', difficulty: 3,
  question: 'A canteen records one week of sales.' + SALES
    + 'Cell B7 contains the formula <code>=SUM(B3:B6)</code>. What value is displayed in B7?',
  answer: 2250,
  hint: 'A function works on the cells its range names, and on no others.',
  explanation: 'B3:B6 is Tuesday to Friday only: 380 + 620 + 540 + 710 = 2250. The common mistake is to assume SUM finds the whole column because the label says "Total"; it adds exactly the range it is given, and Monday\'s 450 is outside that range.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-001-b', chapterId: 'g9ict-spreadsheets', subsection: 'formulas', difficulty: 3,
  question: 'A canteen records one week of sales.' + SALES
    + 'Write the formula that should be in B7 so that the total covers every day of the week.',
  answer: '=SUM(B2:B6)',
  alsoAccept: ['SUM(B2:B6)', '= SUM(B2:B6)', '=SUM(B2 : B6)', '=B2+B3+B4+B5+B6'],
  hint: 'Start the range at the first day and end it at the last day.',
  explanation: 'The data runs from B2 (Monday) to B6 (Friday), so the range is B2:B6 and the formula is =SUM(B2:B6). The usual slip is to begin the range at the row below the heading row without checking which row the first value is actually in.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-001-c', chapterId: 'g9ict-spreadsheets', subsection: 'cells_ranges', difficulty: 4,
  question: 'A canteen records one week of sales.' + SALES
    + 'A pupil reports the week\'s total as Rs 2250, but adding the five figures by hand gives Rs 2700. The formula in B7 is <code>=SUM(B3:B6)</code>. Which statement explains the difference of Rs 450?',
  options: [
    'The range starts at B3, so Monday\'s figure was never added',
    'The range stops at B6, so Friday\'s figure was never added',
    'SUM adds only the four largest values in the range given',
    'SUM reads the label in B1 and subtracts it from the total',
  ],
  answer: 'The range starts at B3, so Monday\'s figure was never added',
  hint: 'Rs 450 is one of the five figures in the table. Which one?',
  explanation: 'The gap is exactly Monday\'s Rs 450, and B2 sits outside the range B3:B6. The misconception being caught is that a formula "knows" which cells belong to the list; it does not, so always check that the first and last cells of the data are both inside the range before trusting a total.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-001-d', chapterId: 'g9ict-spreadsheets', subsection: 'cells_ranges', difficulty: 4,
  question: 'A canteen records one week of sales.' + SALES
    + 'Monday\'s figure in B2 is corrected from 450 to 500. Cell B7 still contains <code>=SUM(B3:B6)</code>. By how much does the value displayed in B7 change?',
  answer: 0,
  hint: 'Ask first whether the corrected cell is inside the range the formula uses.',
  explanation: 'B2 is not inside B3:B6, so the displayed total does not move at all and the change is 0. The misconception is that editing any cell in a column refreshes every total below it; a formula recalculates only when a cell inside its own range changes, which is why a wrong range can hide a wrong figure for weeks.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 002 — a mark list with one absent pupil. AVERAGE ignores an empty
//  cell; a hand-written division does not.
// ══════════════════════════════════════════════════════════════════════════

const MARKS = sheet(['A', 'B'], [
  ['Pupil', 'Mark'],
  ['Anaya', '60'],
  ['Bilal', '75'],
  ['Chloe', ''],
  ['Devan', '55'],
  ['Emma', '70'],
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-002-a', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 3,
  question: 'Five pupils sat a test. Chloe was absent, so cell B4 is empty.' + MARKS
    + 'What value does <code>=AVERAGE(B2:B6)</code> display?',
  answer: 65,
  hint: 'Count how many numbers AVERAGE actually finds in that range.',
  explanation: 'AVERAGE skips an empty cell, so it adds 60 + 75 + 55 + 70 = 260 and divides by the 4 numbers it found: 260 divided by 4 is 65. The misconception is that AVERAGE always divides by the number of cells in the range; it divides by the number of values it finds.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-002-b', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 4,
  question: 'Five pupils sat a test. Chloe was absent, so cell B4 is empty.' + MARKS
    + 'One pupil uses <code>=AVERAGE(B2:B6)</code> and another uses <code>=SUM(B2:B6)/5</code>. The two results are not the same. Which statement explains why?',
  options: [
    'AVERAGE divides by the 4 values found, the other divides by 5',
    'AVERAGE rounds its result to a whole number, the other does not',
    'AVERAGE counts the heading in B1, so it divides by 6 instead of 5',
    'AVERAGE adds the marks in a different order, so it ends up lower',
  ],
  answer: 'AVERAGE divides by the 4 values found, the other divides by 5',
  hint: 'Both formulas add the same numbers. Only the divisor differs.',
  explanation: 'Both add 260, but AVERAGE divides by the 4 values present while the hand-written formula divides by the 5 that were typed in. The misconception is that a built-in function and the equivalent hand-written arithmetic must agree; they only agree when you know exactly what the function counts.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-002-c', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 3,
  question: 'Five pupils sat a test. Chloe was absent, so cell B4 is empty.' + MARKS
    + 'Chloe later sits the test and her mark of 45 is entered in B4. What value does <code>=AVERAGE(B2:B6)</code> then display?',
  answer: 61,
  hint: 'Now the range holds five values, not four.',
  explanation: 'The range now holds 60, 75, 45, 55 and 70, which add to 305, and 305 divided by 5 is 61. Notice the average has fallen even though a mark was added: a mark below the current average always pulls the average down, which is why "more marks means a higher average" is a mistake.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-002-d', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 2,
  question: 'Five pupils sat a test. Chloe was absent, so cell B4 is empty.' + MARKS
    + 'Name the function that should be placed in B7 to display the highest mark in the range B2:B6.',
  answer: 'MAX',
  alsoAccept: ['=MAX(B2:B6)', 'MAX(B2:B6)', 'the MAX function', 'MAX()'],
  hint: 'It is the opposite of the function that finds the lowest value.',
  explanation: 'MAX returns the largest value in a range, so =MAX(B2:B6) displays the highest mark. MAX is often confused with LARGE and with sorting the column: sorting rearranges the data itself, while MAX reads it and leaves it alone.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-002-e', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 4,
  question: 'Five pupils sat a test. Chloe was absent, so cell B4 is empty.' + MARKS
    + 'The teacher now wants an absent pupil to count as a mark of zero. Which change makes <code>=AVERAGE(B2:B6)</code> follow that rule?',
  options: [
    'Type 0 in the empty cell, so AVERAGE has a value to count',
    'Type a space in the empty cell, so AVERAGE has a value to count',
    'Extend the range to B2:B7, so AVERAGE has one more cell to count',
    'Sort the marks column, so the empty cell falls outside the range',
  ],
  answer: 'Type 0 in the empty cell, so AVERAGE has a value to count',
  hint: 'AVERAGE counts numbers. Which of these actually puts a number in B4?',
  explanation: 'Only a typed 0 is a number, so only that makes AVERAGE divide by 5. A space is text and is skipped exactly like a blank; adding an empty cell to the range adds nothing to count; and sorting moves the rows but leaves the range where it is. The misconception is that a cell which looks filled is filled.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 003 — a results list. COUNTIF at a boundary, then IF, then an
//  absolute reference that quietly tests the same cell every time.
// ══════════════════════════════════════════════════════════════════════════

const RESULTS = sheet(['A', 'B', 'C'], [
  ['Pupil', 'Mark', 'Result'],
  ['Aisha', '68', ''],
  ['Brian', '52', ''],
  ['Chan', '65', ''],
  ['Divya', '39', ''],
  ['Emile', '50', ''],
  ['Farah', '45', ''],
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-003-a', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 3,
  question: 'A teacher records six marks. The pass mark is 50.' + RESULTS
    + 'What value does <code>=COUNTIF(B2:B7,"&gt;=50")</code> display?',
  answer: 4,
  hint: '"Greater than or equal to" includes a mark that is exactly 50.',
  explanation: 'The marks meeting the test are 68, 52, 65 and 50, so the count is 4. The misconception caught here is reading &gt;=50 as "above 50" and dropping Emile\'s exact 50; the "or equal to" half of the operator is what puts a borderline pupil on the right side of the line.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-003-b', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 4,
  question: 'A teacher records six marks. The pass mark is 50.' + RESULTS
    + 'Formula 1 is <code>=COUNTIF(B2:B7,"&gt;=50")</code> and Formula 2 is <code>=COUNTIF(B2:B7,"&gt;50")</code>. Give the name of the one pupil who is counted by Formula 1 but not by Formula 2.',
  answer: 'Emile',
  alsoAccept: ['emile'],
  hint: 'Only one mark in the table sits exactly on the pass mark.',
  explanation: 'Emile scored exactly 50, which satisfies "greater than or equal to 50" but not "greater than 50". The misconception is that &gt;= and &gt; give the same count; they differ by every value sitting exactly on the boundary, which is precisely where a pass mark lives.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-003-c', chapterId: 'g9ict-spreadsheets', subsection: 'formulas', difficulty: 3,
  question: 'A teacher records six marks. The pass mark is 50.' + RESULTS
    + 'Which formula in C2 displays <b>Pass</b> when the mark in B2 is 50 or more, and <b>Fail</b> otherwise?',
  options: [
    '=IF(B2&gt;=50,"Pass","Fail")',
    '=IF(B2&gt;=50,"Fail","Pass")',
    '=IF(B2&lt;=50,"Pass","Fail")',
    '=IF(B2=50,"Pass","Fail")',
  ],
  answer: '=IF(B2&gt;=50,"Pass","Fail")',
  hint: 'IF takes the test first, then the result when true, then the result when false.',
  explanation: 'IF(test, value if true, value if false) means the passing word must come second. The two frequent errors are swapping the two results, and reversing the comparison so that low marks pass; a third is using = alone, which only matches a mark of exactly 50.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-003-d', chapterId: 'g9ict-spreadsheets', subsection: 'formulas', difficulty: 4,
  question: 'A teacher records six marks. The pass mark is 50.' + RESULTS
    + 'C2 held <code>=IF(B2&gt;=50,"Pass","Fail")</code>. A pupil edited it to <code>=IF($B$2&gt;=50,"Pass","Fail")</code> and copied it down to C7. Every cell from C2 to C7 now shows <b>Pass</b>, although two marks are below 50. Why?',
  options: [
    'The dollar signs lock the test on B2, so every row tests the same mark',
    'The dollar signs make the test cover the whole range B2:B7 at once',
    'The dollar signs make IF return its first result whatever the test gives',
    'The dollar signs store the mark in B2 as text, which IF treats as a pass',
  ],
  answer: 'The dollar signs lock the test on B2, so every row tests the same mark',
  hint: 'Work out what C5 is testing after the copy, not what it should be testing.',
  explanation: '$B$2 is an absolute reference, so copying the formula down leaves every row testing Aisha\'s 68 and every row therefore passes. The misconception is that $ signs make a formula "safer" or "fixed and correct"; they fix the address, which is only right when the formula really should look at one shared cell, such as a single tax rate.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-003-e', chapterId: 'g9ict-spreadsheets', subsection: 'functions', difficulty: 2,
  question: 'A teacher records six marks. The pass mark is 50.' + RESULTS
    + 'Name the function that counts only the cells in a range which meet a stated condition.',
  answer: 'COUNTIF',
  alsoAccept: ['the COUNTIF function', 'COUNTIF()', '=COUNTIF()'],
  hint: 'Its name joins the counting function to the word used for a test.',
  explanation: 'COUNTIF counts the cells in a range that satisfy one condition. COUNT (which counts every number) and COUNTA (which counts every non-empty cell) apply no test at all, so using either of those in place of COUNTIF returns the size of the list rather than the number of passes.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 004 — one VAT rate stored in one cell. The relative reference is
//  right in the first row and silently wrong in every row below it.
// ══════════════════════════════════════════════════════════════════════════

const VAT = sheet(['A', 'B', 'C'], [
  ['Item', 'Price (Rs)', 'VAT (Rs)'],
  ['Chair', '800', ''],
  ['Table', '1200', ''],
  ['Lamp', '400', ''],
  ['', '', ''],
  ['VAT rate', '0.15', ''],
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-004-a', chapterId: 'g9ict-spreadsheets', subsection: 'cells_ranges', difficulty: 3,
  question: 'A shop works out the VAT on three items. The rate is stored once, in B6.' + VAT
    + 'Cell C2 contains <code>=B2*$B$6</code> and is copied down to C3 and C4. What value is displayed in C4?',
  answer: 60,
  hint: 'Work out which two cells C4 multiplies after the copy.',
  explanation: 'Copying moves the relative B2 down to B4 but leaves $B$6 fixed, so C4 calculates 400 x 0.15 = 60. The misconception is that copying a formula copies its result; it copies the pattern, and only the relative parts of that pattern move.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-004-b', chapterId: 'g9ict-spreadsheets', subsection: 'cells_ranges', difficulty: 4,
  question: 'A shop works out the VAT on three items. The rate is stored once, in B6.' + VAT
    + 'A pupil types <code>=B2*B6</code> in C2 and copies it down. C2 shows the correct VAT, but C3 and C4 both show 0. Which statement explains <b>both</b> of those results together?',
  options: [
    'B6 is relative, so C3 reads the empty B7 and C4 reads the empty B8',
    'B6 is relative, so C3 and C4 both read the rate held in B6 itself',
    'A rate can be used by one formula only, so the later rows return 0',
    'A copied formula keeps the first result and leaves the rest empty',
  ],
  answer: 'B6 is relative, so C3 reads the empty B7 and C4 reads the empty B8',
  hint: 'The first row is right by luck. Ask what the reference to B6 becomes one row down.',
  explanation: 'Without dollar signs, B6 moves with the formula: C3 multiplies by B7 and C4 by B8, both empty and therefore treated as 0. The trap is that C2 looks correct, so the sheet appears to work; a formula that is right in the row you typed it in tells you nothing until you check the row below.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-004-c', chapterId: 'g9ict-spreadsheets', subsection: 'cells_ranges', difficulty: 3,
  question: 'A shop works out the VAT on three items. The rate is stored once, in B6.' + VAT
    + 'Write the formula for C2 that still gives the right VAT after it is copied down to C3 and C4.',
  answer: '=B2*$B$6',
  alsoAccept: ['B2*$B$6', '=$B$6*B2', '=B2*B$6', '=B$6*B2', '= B2*$B$6'],
  hint: 'One of the two references must move with the formula and one must not.',
  explanation: 'The price must move down with the formula, so B2 stays relative, while the single rate must not move, so it is written $B$6 (locking the row alone, as B$6, also works when copying downwards). Writing $B$2 as well is the opposite mistake: it would lock the price and give every item the chair\'s VAT.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-004-d', chapterId: 'g9ict-spreadsheets', subsection: 'formulas', difficulty: 3,
  question: 'A shop works out the VAT on three items. The rate is stored once, in B6.' + VAT
    + 'The VAT rate in B6 is changed from 0.15 to 0.2. Cells C2 to C4 all hold <code>=B2*$B$6</code> copied down. What value is then displayed in C3?',
  answer: 240,
  hint: 'Which cells does C3 use, and what does each of them now hold?',
  explanation: 'C3 calculates 1200 x 0.2 = 240, and it updates on its own the moment B6 changes. The misconception is that a formula must be retyped after a change; storing the rate in one cell is exactly what makes a single edit update all three rows, which is why the rate is not typed into each formula.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 005 — a Python loop that counts passes. Boundary, accumulator and
//  indentation, all off one program.
// ══════════════════════════════════════════════════════════════════════════

const PASSES = code([
  'marks = [45, 62, 38, 71, 50]',
  'passes = 0',
  'for m in marks:',
  '    if m &gt;= 50:',
  '        passes = passes + 1',
  'print(passes)',
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-005-a', chapterId: 'g9ict-algorithms', subsection: 'python_basics', difficulty: 3,
  question: 'The program below is run.' + PASSES + 'What number is printed?',
  answer: 3,
  hint: 'Take the marks one at a time and decide whether each passes the test.',
  explanation: 'The marks 62, 71 and 50 satisfy m &gt;= 50, so passes finishes at 3. The usual slip is to count 50 as failing; "greater than or equal to" includes the boundary value itself.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-005-b', chapterId: 'g9ict-algorithms', subsection: 'python_basics', difficulty: 4,
  question: 'The program below is run.' + PASSES
    + 'The line <code>if m &gt;= 50:</code> is changed to <code>if m &gt; 50:</code> and nothing else is altered. What number is printed now?',
  answer: 2,
  hint: 'Only one mark in the list is affected by dropping the "or equal to".',
  explanation: 'With a strict &gt;, only 62 and 71 pass, so 2 is printed: the mark of exactly 50 is now excluded. This is the boundary misconception in code form, and it is worth one whole pupil in a class list, so it matters far more than the single character suggests.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-005-c', chapterId: 'g9ict-algorithms', subsection: 'python_basics', difficulty: 4,
  question: 'The program below is run.' + PASSES
    + 'The line <code>passes = passes + 1</code> is changed to <code>passes = passes + m</code> and nothing else is altered. What number is printed now?',
  answer: 183,
  hint: 'The variable no longer counts the marks. Work out what it collects instead.',
  explanation: 'The variable now adds the passing marks themselves: 62 + 71 + 50 = 183. The misconception is that a counter and a running total are the same kind of variable; adding 1 counts how many, adding m totals how much, and the name "passes" no longer describes what is stored.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-005-d', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 4,
  question: 'The program below is run.' + PASSES
    + 'The last line is indented so that <code>print(passes)</code> lines up with <code>passes = passes + 1</code>. What happens when the program is run?',
  options: [
    'A number is printed each time a mark passes the test',
    'A number is printed once for every mark in the list',
    'Nothing is printed, because print is now inside the if',
    'One number is printed, but before the loop has started',
  ],
  answer: 'A number is printed each time a mark passes the test',
  hint: 'In Python, indentation alone decides which block a line belongs to.',
  explanation: 'Lining print up with passes = passes + 1 puts it inside the if, so it runs once per passing mark and prints three lines. Indenting it only as far as the if would put it inside the loop but outside the if, printing once per mark; the misconception is that indentation is decoration rather than the thing that defines the block.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-005-e', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 3,
  question: 'The program below is run.' + PASSES
    + 'How many times is the line <code>if m &gt;= 50:</code> carried out?',
  answer: 5,
  hint: 'The test runs once for each value the loop hands to m, whatever the answer is.',
  explanation: 'The loop visits every item in the list, so the test runs 5 times even though only some marks pass. The misconception is to confuse how many times a loop repeats with how many times its condition is true; the first is set by the list, the second by the data.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 006 — a while loop that steps past its own stopping value.
// ══════════════════════════════════════════════════════════════════════════

const COUNTDOWN = code([
  'count = 10',
  'steps = 0',
  'while count &gt; 0:',
  '    count = count - 3',
  '    steps = steps + 1',
  'print(count)',
  'print(steps)',
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-006-a', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 3,
  question: 'The program below is run.' + COUNTDOWN + 'What value of <code>steps</code> is printed?',
  answer: 4,
  hint: 'Write down count after each pass and stop when the condition fails.',
  explanation: 'count goes 10, 7, 4, 1 and then -2, which is four passes, so steps is 4. The usual slip is to stop at 1 and answer 3: the condition is tested before a pass, and 1 is still greater than 0, so a fourth pass takes place.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-006-b', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 4,
  question: 'The program below is run.' + COUNTDOWN + 'What value of <code>count</code> is printed?',
  answer: -2,
  hint: 'The loop stops after the pass that breaks the condition, not before it.',
  explanation: 'The last pass takes count from 1 to -2, and only then is the condition found to be false, so -2 is printed. The misconception is that a loop stops the instant its variable reaches the limit; the whole body runs first, so the final value can overshoot.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-006-c', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 4,
  question: 'The program below is run.' + COUNTDOWN
    + 'A pupil expects <code>count</code> to finish at exactly 0 and says the program has a bug. Which statement is correct?',
  options: [
    'There is no bug: 10 is not a multiple of the step of 3',
    'There is a bug: the condition should be count &gt;= 0 to reach 0',
    'There is a bug: the loop never stops once count goes below 0',
    'There is no bug: Python cannot store a negative value in count',
  ],
  answer: 'There is no bug: 10 is not a multiple of the step of 3',
  hint: 'Ask whether any starting value stepping down by 3 could land on 0 from 10.',
  explanation: 'Stepping down by 3 from 10 gives 10, 7, 4, 1, -2 and never touches 0, so the code does exactly what it says. Changing the condition to count &gt;= 0 changes nothing here, because the loop already stops the first time count is not above 0. The misconception is that an unexpected result must be a coding error, when it is often the arithmetic of the step.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-006-d', chapterId: 'g9ict-algorithms', subsection: 'control_structures', difficulty: 4,
  question: 'The program below is run.' + COUNTDOWN
    + 'Only the first line is to be changed, so that <code>count</code> finishes at exactly 0. Give the smallest whole number greater than 10 that can replace 10.',
  answer: 12,
  hint: 'The starting value must be reachable by repeated steps of 3 down to 0.',
  explanation: 'Starting at 12 gives 12, 9, 6, 3, 0, so count lands exactly on 0; 11 would give 11, 8, 5, 2, -1. The reasoning runs backwards from the required result to the condition that makes it possible, and the misconception it catches is treating the starting value as free when the step size constrains it.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 007 — one flowchart, dry-run four ways.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-007-a', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading', difficulty: 3,
  question: 'Study the flowchart below.' + FLOW + 'The value entered for N is 5. What value is output?',
  answer: 15,
  hint: 'Keep a table of T and C and fill in one row for each pass round the loop.',
  explanation: 'T collects 1, 2, 3, 4 and 5, giving 15, because the test C &#8804; N is still true when C is 5. The usual slip is to stop at C = 4 and answer 10; a dry-run table with one row per pass is what stops that.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-007-b', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading', difficulty: 4,
  question: 'Study the flowchart below.' + FLOW
    + 'The decision box is changed from <b>C &#8804; N ?</b> to <b>C &lt; N ?</b> and N is entered as 5. What value is output now?',
  answer: 10,
  hint: 'Only the last pass round the loop is affected by dropping the "or equal to".',
  explanation: 'With a strict &lt;, the loop stops once C reaches 5, so T collects 1, 2, 3 and 4 and outputs 10. This is the off-by-one error: one character in the decision box costs the last item of the list every time, which is why a dry run is always taken to the final pass.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-007-c', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading', difficulty: 4,
  question: 'Study the flowchart below.' + FLOW
    + 'Which description is true of the value output, for any whole number N greater than 0?',
  options: [
    'The sum of all the whole numbers from 1 up to N',
    'The product of all the whole numbers from 1 up to N',
    'The count of all the whole numbers from 1 up to N',
    'The largest whole number that is smaller than N',
  ],
  answer: 'The sum of all the whole numbers from 1 up to N',
  hint: 'Look at what the box inside the loop does to T each time round.',
  explanation: 'T starts at 0 and has C added to it on every pass, so it ends as 1 + 2 + ... + N. The misconception is reading a loop by its counter rather than by the box inside it: C counts the passes, but it is T = T + C that decides what the algorithm actually computes.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-007-d', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading', difficulty: 4,
  question: 'Study the flowchart below.' + FLOW
    + 'The two boxes inside the loop are swapped, so that <b>C = C + 1</b> is carried out before <b>T = T + C</b>. N is entered as 5. What value is output?',
  answer: 20,
  hint: 'On the first pass, C has already been increased before it is added to T.',
  explanation: 'C is raised first every time, so T collects 2, 3, 4, 5 and 6, giving 20. The misconception is that the order of two boxes inside a loop does not matter because "the same things happen"; they happen to different values, and here the run gains a 6 and loses the 1.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-007-e', chapterId: 'g9ict-algorithms', subsection: 'flowchart_symbols', difficulty: 2,
  question: 'Study the flowchart below.' + FLOW
    + 'Name the shape used for the box that asks a question and has two exits.',
  answer: 'diamond',
  alsoAccept: ['a diamond', 'rhombus', 'a rhombus', 'diamond shape', 'decision box'],
  hint: 'It is the only shape in the chart with more than one arrow leaving it.',
  explanation: 'A decision is drawn as a diamond (a rhombus), and it is the only symbol with two labelled exits. It is often confused with the rectangle used for a process, which does something and has exactly one exit, and with the parallelogram used for input and output.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 008 — a library table and a query-by-example grid, which every
//  ICT paper since 2022 prints.
// ══════════════════════════════════════════════════════════════════════════

const LIBRARY = grid(['BookID', 'Title', 'Category', 'Year', 'Available'], [
  ['B01', 'Coral Reefs', 'Science', '2019', 'Yes'],
  ['B02', 'Island Songs', 'Poetry', '2021', 'No'],
  ['B03', 'Solar Power', 'Science', '2022', 'Yes'],
  ['B04', 'Dodo Tales', 'History', '2018', 'Yes'],
  ['B05', 'Green Chemistry', 'Science', '2021', 'No'],
  ['B06', 'Sega Rhythms', 'Music', '2022', 'Yes'],
]);

const QBE = grid(['', 'Column 1', 'Column 2'], [
  ['<b>Field</b>', 'Category', 'Year'],
  ['<b>Table</b>', 'LIBRARY', 'LIBRARY'],
  ['<b>Show</b>', 'ticked', 'ticked'],
  ['<b>Criteria</b>', '"Science"', '&gt;2019'],
  ['<b>Or</b>', '', ''],
]);

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-008-a', chapterId: 'g9ict-databases', subsection: 'queries', difficulty: 3,
  question: 'The table LIBRARY holds six records.' + LIBRARY
    + 'This query-by-example grid is run against it.' + QBE
    + 'How many records does the query return?',
  answer: 2,
  hint: 'Two tests written on the same Criteria row must both be met.',
  explanation: 'Only B03 (2022) and B05 (2021) are Science books published after 2019, so 2 records are returned. B01 is a Science book of 2019, and &gt;2019 excludes 2019 itself. The misconception is treating &gt; as "from that year onward".',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-008-b', chapterId: 'g9ict-databases', subsection: 'queries', difficulty: 4,
  question: 'The table LIBRARY holds six records.' + LIBRARY
    + 'This query-by-example grid is run against it.' + QBE
    + 'Give the BookID of the Science book that this query does <b>not</b> return.',
  answer: 'B01',
  alsoAccept: ['b01', 'BookID B01'],
  hint: 'Find the three Science records first, then test each one against the year.',
  explanation: 'B01 is a Science book but its year is 2019, and the criterion &gt;2019 excludes it. The item is testing whether a pupil applies both criteria to every candidate rather than filtering on the field they read first; a record that satisfies one test is easy to accept without checking the second.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-008-c', chapterId: 'g9ict-databases', subsection: 'queries', difficulty: 4,
  question: 'The table LIBRARY holds six records.' + LIBRARY
    + 'A query is built with <b>"Science"</b> under Category on the <b>Criteria</b> row, and <b>&gt;2019</b> under Year on the <b>Or</b> row. How many records does this query return?',
  answer: 5,
  hint: 'Tests on different rows of the grid are joined differently from tests on the same row.',
  explanation: 'Criteria on separate rows are joined with OR, so a record qualifies if it is a Science book or if its year is after 2019: B01, B02, B03, B05 and B06, which is 5. The misconception is that the grid always narrows a result; moving one criterion down a row widens it instead.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-008-d', chapterId: 'g9ict-databases', subsection: 'queries', difficulty: 3,
  question: 'The table LIBRARY holds six records.' + LIBRARY
    + 'In the query grid, the <b>Show</b> box under Year is unticked, while Year still carries the criterion <b>&gt;2019</b>. What is the effect?',
  options: [
    'The year still filters the records, but the Year column is not displayed',
    'The year no longer filters the records, and the Year column is displayed',
    'The Year column is displayed, but every year in it is shown as a blank',
    'The records are sorted into year order instead of being filtered at all',
  ],
  answer: 'The year still filters the records, but the Year column is not displayed',
  hint: 'Show and Criteria are two different rows doing two different jobs.',
  explanation: 'Show controls what appears in the result; Criteria controls which records reach the result. Unticking Show hides the column but the filter is still applied. The misconception is that a field must be displayed to be used, which leads pupils to show every field they filter on and clutter the answer.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-008-e', chapterId: 'g9ict-databases', subsection: 'queries', difficulty: 2,
  question: 'The table LIBRARY holds six records.' + LIBRARY
    + 'In a query-by-example grid, name the row on which the test that a record must pass is typed.',
  answer: 'Criteria',
  alsoAccept: ['the Criteria row', 'criteria row', 'Criteria:'],
  hint: 'It is the row directly below the one carrying the tick boxes.',
  explanation: 'The test is typed on the Criteria row, under the field it applies to. Field names the column, Table names where it comes from, Show decides whether it is displayed, and Sort orders the result; only Criteria decides which records are returned.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 009 — full, incremental and differential backups, distinguished by
//  what each copies AND by what a restore then costs.
//  ⚠ See the ledger: g9ict-esv-042 (ethics_volume.js) describes a
//    DIFFERENTIAL backup in its stem but keys "Incremental backup".
// ══════════════════════════════════════════════════════════════════════════

const OFFICE = 'A school office backs up its files to an external drive. A <b>full</b> backup is taken every Sunday night, and one further backup is taken each weeknight from Monday to Friday.';

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-009-a', chapterId: 'g9ict-ethics-security', subsection: 'data_backups', difficulty: 2,
  question: OFFICE + '<br><br>Each weeknight the office copies every file that has changed <b>since Sunday\'s full backup</b>. Which method is being used?',
  options: ['Differential backup', 'Incremental backup', 'Mirror backup', 'Archive backup'],
  answer: 'Differential backup',
  hint: 'The starting point never moves: it is always the last full backup.',
  explanation: 'A differential backup always measures changes from the last FULL backup, so Thursday\'s copy includes everything altered since Sunday. It is routinely confused with an incremental backup, which measures from the last backup of any kind and so grows no larger from night to night.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-009-b', chapterId: 'g9ict-ethics-security', subsection: 'data_backups', difficulty: 2,
  question: OFFICE + '<br><br>Each weeknight the office copies only the files that have changed <b>since the previous night\'s backup</b>. Which method is being used?',
  options: ['Incremental backup', 'Differential backup', 'Mirror backup', 'Archive backup'],
  answer: 'Incremental backup',
  hint: 'The starting point moves forward by one night each time.',
  explanation: 'An incremental backup measures from the most recent backup of any type, full or incremental, so each night copies only one day of changes. The distinction from a differential backup is not what it copies on Monday, when the two are identical, but what it copies by Thursday.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-009-c', chapterId: 'g9ict-ethics-security', subsection: 'data_backups', difficulty: 4,
  question: OFFICE + '<br><br>The weeknight backups are <b>differential</b>. The hard disk fails on Friday morning, before Friday night\'s backup. How many backup sets must be restored to bring the files fully up to date?',
  answer: 2,
  hint: 'A differential set already contains every change made since the full backup.',
  explanation: 'Two sets: Sunday\'s full backup, then Thursday\'s differential, which already holds every change made since Sunday. The misconception is that every backup taken during the week must be restored; with differentials, the older ones are superseded and only the most recent is needed.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-009-d', chapterId: 'g9ict-ethics-security', subsection: 'data_backups', difficulty: 4,
  question: OFFICE + '<br><br>The weeknight backups are <b>incremental</b>. The hard disk fails on Friday morning, before Friday night\'s backup. How many backup sets must be restored to bring the files fully up to date?',
  answer: 5,
  hint: 'Each incremental set holds one night of changes and no more.',
  explanation: 'Five sets: Sunday\'s full backup plus the Monday, Tuesday, Wednesday and Thursday incrementals, restored in that order. Each holds only one night of changes, so missing one loses that day. This is the cost that balances the smaller nightly copy.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-009-e', chapterId: 'g9ict-ethics-security', subsection: 'data_backups', difficulty: 4,
  question: OFFICE + '<br><br>The office argues that incremental backups are better because each night\'s copy is smaller and finishes sooner. The technician agrees on both points but calls them riskier. Which statement supports the technician?',
  options: [
    'A restore needs the full backup and every incremental set since it',
    'A restore needs the full backup only, so recent work would be lost',
    'An incremental backup cannot be written to an external hard disk',
    'An incremental backup overwrites the full backup taken on Sunday',
  ],
  answer: 'A restore needs the full backup and every incremental set since it',
  hint: 'A shorter backup does not mean a shorter or safer restore.',
  explanation: 'Each incremental set is a link in a chain, so one damaged or missing set breaks the restore from that point on. The misconception is judging a backup plan only by how long the backup takes; the measure that matters is how reliably and how quickly the data can be brought back.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 010 — a memory card, in a family where the numbers are exact and
//  the last variant has no number at all.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-010-a', chapterId: 'g9ict-computer-systems', subsection: 'data_units', difficulty: 2,
  question: 'A camera club buys a memory card with a capacity of 32 GB. Take 1 GB = 1024 MB.<br><br>How many megabytes is the capacity of the card?',
  answer: 32768,
  hint: 'Multiply the number of gigabytes by the number of megabytes in one gigabyte.',
  explanation: '32 x 1024 = 32 768 MB. The mistake to avoid is dividing instead of multiplying: a megabyte is the smaller unit, so the same capacity is always a bigger number when written in MB.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-010-b', chapterId: 'g9ict-computer-systems', subsection: 'data_units', difficulty: 3,
  question: 'A camera club buys an empty memory card with a capacity of 32 GB. Each photograph taken by its camera is 8 MB. Take 1 GB = 1024 MB.<br><br>How many whole photographs will the card hold?',
  answer: 4096,
  hint: 'Put both quantities into the same unit before dividing.',
  explanation: 'The card holds 32 x 1024 = 32 768 MB, and 32 768 divided by 8 is 4096 photographs. The misconception is dividing 32 by 8 and answering 4: the two figures are in different units, and a division is only meaningful once both are in MB.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-010-c', chapterId: 'g9ict-computer-systems', subsection: 'storage_devices', difficulty: 4,
  question: 'A 32 GB memory card already holds one video file of 4 GB. Each photograph is 8 MB. A pupil says: "The card is 32 GB and a photo is 8 MB, so 4096 photos will fit."<br><br>What is wrong with the claim?',
  options: [
    'The 4 GB already in use must be taken off before dividing',
    'The 4 GB video must be converted to MB before it is divided',
    'A memory card cannot hold photographs and video at one time',
    'A card of 32 GB has less than 32 GB of space when it is new',
  ],
  answer: 'The 4 GB already in use must be taken off before dividing',
  hint: 'Ask what the pupil has divided: the whole card, or the part still free.',
  explanation: 'The calculation is right for an empty card but the card is not empty, so the space still free is 32 - 4 = 28 GB. This is the "total quantity versus the amount remaining" mistake, and it is the single most common error in capacity questions: read the stem for what has already been used before dividing anything.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-010-d', chapterId: 'g9ict-computer-systems', subsection: 'data_units', difficulty: 4,
  question: 'A 32 GB memory card already holds one video file of 4 GB. Each photograph is 8 MB. Take 1 GB = 1024 MB.<br><br>How many whole photographs can still be stored on the card?',
  answer: 3584,
  hint: 'Work out the free space first, and only then change it into megabytes.',
  explanation: '32 - 4 = 28 GB free, which is 28 x 1024 = 28 672 MB, and 28 672 divided by 8 is 3584 photographs. Subtracting in GB before converting keeps the arithmetic simple; converting first and forgetting to subtract is what gives the too-large answer.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-010-e', chapterId: 'g9ict-computer-systems', subsection: 'storage_devices', difficulty: 4,
  question: 'A club must store 6000 photographs on a single memory card and asks a technician which capacity to buy.<br><br>Which piece of information is still missing before the capacity can be worked out?',
  options: [
    'The average size of one photograph file',
    'The make of the camera used to take them',
    'The number of members who belong to the club',
    'The price of the largest card the shop sells',
  ],
  answer: 'The average size of one photograph file',
  hint: 'Capacity needed = number of files x size of one file. Which side is unknown?',
  explanation: 'Without the size of one file the total cannot be calculated, however many photographs there are. The other three facts are real but irrelevant to capacity, and the skill being tested is separating the information a calculation needs from the information a situation happens to supply.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 011 — one lab, one wiring diagram, and symptoms that point at
//  different components.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-011-a', chapterId: 'g9ict-networks', subsection: 'topologies', difficulty: 2,
  question: 'The diagram shows how four computers in a school lab are connected.' + LAB
    + 'Which topology is used to join the four computers?',
  options: ['Star', 'Bus', 'Ring', 'Mesh'],
  answer: 'Star',
  hint: 'Follow the cables: do they meet at one point, or run from machine to machine?',
  explanation: 'Every computer has its own cable to one central device, which is a star. A bus would show a single backbone cable with the computers tapped off it, and a ring would show each computer cabled to the next in a closed loop.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-011-b', chapterId: 'g9ict-networks', subsection: 'network_components', difficulty: 3,
  question: 'The diagram shows how four computers in a school lab are connected.' + LAB
    + 'PC 3 cannot reach the Internet. PC 1, PC 2 and PC 4 all can. Which is the most likely cause?',
  options: [
    'The cable between PC 3 and the switch',
    'The switch that all four computers join',
    'The router that joins the lab to the Internet',
    'The Internet service the school pays for',
  ],
  answer: 'The cable between PC 3 and the switch',
  hint: 'A fault can only be where the working machines do not depend on it.',
  explanation: 'The other three machines use the switch, the router and the school\'s Internet service successfully, so none of those can be at fault; the only part unique to PC 3 is its own cable or network card. The reasoning is to eliminate every shared component before suspecting it.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-011-c', chapterId: 'g9ict-networks', subsection: 'network_components', difficulty: 4,
  question: 'The diagram shows how four computers in a school lab are connected.' + LAB
    + 'All four computers can share files with each other, but none of them can open a web page. Which single fault explains both symptoms at once?',
  options: [
    'The router that joins the lab to the Internet has failed',
    'The switch that joins the four computers has failed',
    'One computer\'s network cable has come out of its socket',
    'Every computer\'s network card has been switched off',
  ],
  answer: 'The router that joins the lab to the Internet has failed',
  hint: 'File sharing needs the switch; a web page needs the switch and then something more.',
  explanation: 'File sharing proves the switch and the cables work, so the fault must be beyond them, at the router. The two symptoms look contradictory only if "the network is down" is treated as one thing; a local network and an Internet connection are two layers, and this fault removes just the outer one.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-011-d', chapterId: 'g9ict-networks', subsection: 'network_components', difficulty: 4,
  question: 'The diagram shows how four computers in a school lab are connected.' + LAB
    + 'The switch fails completely. Every other device and cable is in working order. How many of the four computers can still reach the Internet?',
  answer: 0,
  hint: 'Trace the path from each computer to the Internet and see what every path passes through.',
  explanation: 'Every path to the router runs through the switch, so none of the four computers can reach the Internet: the answer is 0. The misconception is that a star topology is fault-tolerant; it protects the network against one cable or one computer failing, but the central device is a single point of failure for all of them.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-011-e', chapterId: 'g9ict-networks', subsection: 'topologies', difficulty: 3,
  question: 'The diagram shows how four computers in a school lab are connected.' + LAB
    + 'Why is a fault on one computer easier to find in this layout than in a bus network?',
  options: [
    'Each computer has its own separate cable to the central device',
    'Each computer keeps its own copy of the whole network layout',
    'Each computer is joined by a wireless link, so no cable can fail',
    'Each message is passed along through every computer in turn',
  ],
  answer: 'Each computer has its own separate cable to the central device',
  hint: 'Think about how many machines stop working when one cable fails in each layout.',
  explanation: 'Because each machine has its own cable, a broken cable takes down exactly one machine and points straight at it. On a bus, a break in the shared backbone can stop many machines at once, so the symptom no longer identifies the fault.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 012 — paying a bill online. The audit flagged the old version of
//  this outcome as an L4 that was really recognition; here the reasoning is
//  which requirement is missing, and which risk a padlock does not remove.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-012-a', chapterId: 'g9ict-internet', subsection: 'e_services', difficulty: 4,
  question: 'Mrs Ramdin wants to pay her electricity bill from home. She has a laptop, a browser, a home router with a working Internet connection, a bank account and a printer. She opens her bank\'s website but cannot make the payment.<br><br>Which of these is the reason?',
  options: [
    'She has not registered for her bank\'s online banking service',
    'She has not connected the printer she owns to her laptop',
    'She has not installed a second browser on the same laptop',
    'She has not switched her home router to a wireless setting',
  ],
  answer: 'She has not registered for her bank\'s online banking service',
  hint: 'List what she already has, then ask what an online payment needs that is not there.',
  explanation: 'Equipment and a connection are not enough: online banking is a service the account holder must be registered for before the bank will accept an instruction. The misconception is that having the hardware means having the service, which is the same mistake as assuming a computer with a printer can print to a school network it has never joined.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-012-b', chapterId: 'g9ict-internet', subsection: 'browsers_search', difficulty: 4,
  question: 'Mrs Ramdin later opens the same payment page over a cafe\'s free public Wi-Fi. The address begins with https and a padlock is shown. Her friend says the padlock makes public Wi-Fi completely safe.<br><br>Which statement is correct?',
  options: [
    'HTTPS hides what is sent, but the network itself may still be untrusted',
    'HTTPS hides what is sent, so no risk at all remains on any network',
    'HTTPS only checks that the address of the site has been spelt correctly',
    'HTTPS works on a home router but is switched off on public Wi-Fi',
  ],
  answer: 'HTTPS hides what is sent, but the network itself may still be untrusted',
  hint: 'Ask exactly what the padlock protects, and what it says nothing about.',
  explanation: 'HTTPS encrypts the traffic between the browser and that one site; it says nothing about who runs the network, whether the device is infected, or whether someone is watching the screen. The misconception is treating one safeguard as complete security, which is why a padlock is a necessary condition and never a sufficient one.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-012-c', chapterId: 'g9ict-internet', subsection: 'browsers_search', difficulty: 3,
  question: 'A web address is checked before any bank details are entered on the page.<br><br>Name the protocol shown at the start of a web address when the connection to the site is encrypted.',
  answer: 'https',
  alsoAccept: ['https://', 'HTTPS protocol', 'hypertext transfer protocol secure'],
  hint: 'It is the ordinary web protocol with one extra letter on the end.',
  explanation: 'HTTPS is HTTP with an encrypted connection, so anything typed into the page is scrambled in transit. HTTP without the S sends the same data as readable text, which is why a page asking for a password or a card number should never show it.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-012-d', chapterId: 'g9ict-internet', subsection: 'e_services', difficulty: 4,
  question: 'Mrs Ramdin can pay her bill in two ways: <b>Route 1</b> is her bank\'s own app on her own phone, using mobile data; <b>Route 2</b> is the bank\'s website on a shared computer in a public library.<br><br>Which factor most strongly favours Route 1?',
  options: [
    'A shared computer may keep her sign-in details after she leaves',
    'A shared computer has a smaller screen than a mobile phone has',
    'Mobile data is always faster than a public library\'s fixed line',
    'A banking app can complete a payment with no connection at all',
  ],
  answer: 'A shared computer may keep her sign-in details after she leaves',
  hint: 'Compare who else can use each device after she has finished.',
  explanation: 'A public machine may retain saved passwords, browsing history or cached pages, and the next user is a stranger; her own phone is used by nobody else. The other three options are either false or irrelevant to the decision, and the skill is picking the factor that actually separates the two routes rather than any true statement about one of them.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 013 — one mail merge: how many letters, what one letter prints,
//  what a filter changes, and why every letter can come out identical.
// ══════════════════════════════════════════════════════════════════════════

const RECIPIENTS = grid(['Title', 'Surname', 'Class', 'Fee'], [
  ['Mr', 'Appadoo', '9A', '250'],
  ['Mrs', 'Beeharry', '9B', '300'],
  ['Miss', 'Curpen', '9A', '250'],
  ['Mr', 'Dhunnoo', '9C', '275'],
]);

const LETTER = '<div style="border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#1e293b;'
  + 'text-shadow:none;padding:8px 12px;margin:0.6rem 0;text-align:left">Dear &laquo;Title&raquo; &laquo;Surname&raquo;,'
  + '<br>The fee for class &laquo;Class&raquo; is Rs &laquo;Fee&raquo;.</div>';

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-013-a', chapterId: 'g9ict-word-processing', subsection: 'mail_merge', difficulty: 2,
  question: 'A school prepares fee letters by mail merge. The data source holds these records.' + RECIPIENTS
    + 'The main document reads:' + LETTER + 'How many letters are produced when the merge is completed?',
  answer: 4,
  hint: 'A merge produces one copy of the main document for each record it uses.',
  explanation: 'There are four records, so four letters are produced: a merge repeats the one main document once per record. The misconception is counting the merge fields instead of the records, which would give four for a different and coincidental reason.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-013-b', chapterId: 'g9ict-word-processing', subsection: 'mail_merge', difficulty: 3,
  question: 'A school prepares fee letters by mail merge. The data source holds these records.' + RECIPIENTS
    + 'The main document reads:' + LETTER
    + 'Write exactly what appears in place of &laquo;Title&raquo; &laquo;Surname&raquo; in the <b>third</b> letter.',
  answer: 'Miss Curpen',
  alsoAccept: ['miss curpen', 'Miss Curpen,'],
  hint: 'The records are merged in the order they appear in the data source.',
  explanation: 'The third record is Miss Curpen, so each field is replaced by that record\'s own value. The misconception is that a field always prints the same text wherever it appears; a merge field is a placeholder, and its value changes with the record being merged.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-013-c', chapterId: 'g9ict-word-processing', subsection: 'mail_merge', difficulty: 4,
  question: 'A school prepares fee letters by mail merge. The data source holds these records.' + RECIPIENTS
    + 'A pupil finishes the merge and finds that every printed letter still reads "Dear &laquo;Title&raquo; &laquo;Surname&raquo;". Which mistake causes this?',
  options: [
    'The field names were typed in as ordinary text, not inserted as fields',
    'The data source was saved as a spreadsheet, not as a word-processed table',
    'The letters were sent to the printer before the data source had been saved',
    'The merge fields were inserted into the header, not into the body of the letter',
  ],
  answer: 'The field names were typed in as ordinary text, not inserted as fields',
  hint: 'A real merge field is an object the program recognises, not the words between the marks.',
  explanation: 'Typing the guillemet marks and the field name by hand produces text that looks like a field but carries no link to the data source, so nothing is ever substituted. The misconception is judging a document by how it looks on screen; the test is whether the program recognises the field, which is why fields are inserted from the dialog rather than typed.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-013-d', chapterId: 'g9ict-word-processing', subsection: 'mail_merge', difficulty: 4,
  question: 'A school prepares fee letters by mail merge. The data source holds these records.' + RECIPIENTS
    + 'Before the merge is completed, the recipient list is filtered so that only records with Class = 9A are used. How many letters are produced?',
  answer: 2,
  hint: 'Count the records that survive the filter, not the records in the file.',
  explanation: 'Only Mr Appadoo and Miss Curpen are in 9A, so two letters are produced. Filtering the recipient list changes which records are merged without deleting anything from the data source, and the misconception is that the file must be edited to send letters to a subset of the people in it.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-013-e', chapterId: 'g9ict-word-processing', subsection: 'mail_merge', difficulty: 3,
  question: 'A school prepares fee letters by mail merge. The data source holds these records.' + RECIPIENTS
    + 'Which two items must both exist before a mail merge can be completed?',
  options: [
    'A main document and a data source',
    'A main document and a printed envelope',
    'A data source and a printed address label',
    'A data source and a page header',
  ],
  answer: 'A main document and a data source',
  hint: 'One item holds the wording that never changes; the other holds what does.',
  explanation: 'A merge joins a main document, which holds the fixed wording and the fields, to a data source, which holds one record per recipient. Envelopes and labels are things a merge can produce, not things it needs, and the misconception is confusing an output of the process with an input to it.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 014 — a blank screen with one clue that rules a cause out.
// ══════════════════════════════════════════════════════════════════════════

const NOSIGNAL = 'A desktop computer is switched on. Its power light comes on and its fan can be heard. The monitor shows the message <b>No signal</b>, its own power light is on, and pressing its menu button brings up the monitor\'s on-screen menu.';

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-014-a', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques', difficulty: 3,
  question: NOSIGNAL + '<br><br>Which possible cause does the on-screen menu appearing rule out?',
  options: [
    'The monitor is not receiving power of its own',
    'The video cable has come loose at one of its ends',
    'The computer has not finished starting up yet',
    'The screen resolution has been set too high to display',
  ],
  answer: 'The monitor is not receiving power of its own',
  hint: 'The menu is drawn by the monitor itself, using nothing from the computer.',
  explanation: 'A monitor can only draw its own menu if it has power and its screen works, so that cause is eliminated; every other option is still open. The technique being practised is using one observation to remove a cause from the list, rather than jumping to the most familiar cause first.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-014-b', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques', difficulty: 4,
  question: NOSIGNAL + '<br><br>Which is the most sensible <b>first</b> step to take?',
  options: [
    'Check that the video cable is firmly seated at both of its ends',
    'Fetch a monitor from another desk and connect it in place of this one',
    'Open the system unit and replace the computer\'s power supply unit',
    'Reinstall the operating system from the school\'s recovery media',
  ],
  answer: 'Check that the video cable is firmly seated at both of its ends',
  hint: 'Start with whatever is quickest to test and easiest to undo.',
  explanation: 'A loose video cable produces exactly this symptom and costs seconds to check, so it is tested before anything is swapped, opened or reinstalled. The misconception is that a serious symptom implies a serious cause; sound troubleshooting works from the simplest and most reversible check outwards.',
}));

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-014-c', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques', difficulty: 4,
  question: NOSIGNAL + '<br><br>The cable is reseated and the message stays. The same monitor and the same cable are then tested on another computer, where they work perfectly.<br><br>Name the part of the first computer that is now the most likely fault.',
  answer: 'graphics card',
  alsoAccept: ['the graphics card', 'video card', 'the video card', 'graphics adapter', 'GPU', 'display card'],
  hint: 'Two of the three parts in the display chain have now been proved to work.',
  explanation: 'The monitor and the cable have both been shown to work elsewhere, so the remaining part of the chain is the computer\'s graphics card or its video port. The reasoning is substitution: prove each component good on a known-working system, and what is left unproved is the suspect.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-014-d', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_steps', difficulty: 4,
  question: 'A technician changes the video cable <b>and</b> the graphics card at the same time, and the display comes back.<br><br>Why is this a poor way to work through a fault?',
  options: [
    'It is no longer known which of the two changes fixed the fault',
    'Changing two parts at once can damage the computer\'s memory',
    'A graphics card must always be tested before any cable is changed',
    'A fault report cannot be closed until both parts are put back again',
  ],
  answer: 'It is no longer known which of the two changes fixed the fault',
  hint: 'A test only tells you something if one thing about it has changed.',
  explanation: 'With two changes made together the result identifies neither, so a working part may be thrown away and the real fault will not be recognised when it recurs. The rule is to change one thing at a time and test after each change, which is what turns repairing into diagnosing.',
}));

// ══════════════════════════════════════════════════════════════════════════
//  FAMILY 015 — a system panel read AGAINST a requirements list. The audit
//  flagged an item whose answer was printed in the panel; here the panel is
//  one of two documents that have to be compared.
// ══════════════════════════════════════════════════════════════════════════

const ABOUT = panel('About this PC', [
  ['Device name', 'LAB-PC-07'],
  ['Processor', 'Intel Core i5-8250U&nbsp;&nbsp;1.60 GHz'],
  ['Installed RAM', '4.00 GB'],
  ['System type', '64-bit operating system, x64-based processor'],
  ['Edition', 'Windows 10 Pro'],
]);

const REQS = panel('Minimum requirements: LabDraw 12', [
  ['Processor', '1.5 GHz or faster'],
  ['RAM', '8 GB'],
  ['System type', '64-bit'],
  ['Free disk space', '20 GB'],
]);

STATIC_QUESTIONS.push(makeText({
  id: 'g9ict-fam-015-a', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory', difficulty: 1,
  question: 'A school looks at the system panel of one of its lab computers.' + ABOUT
    + 'State the amount of RAM installed in this computer.',
  answer: '4 GB',
  alsoAccept: ['4GB', '4.00 GB', '4.00GB', '4', '4 gigabytes'],
  hint: 'Read the row of the panel that is labelled with the name of the memory.',
  explanation: 'The panel gives Installed RAM as 4.00 GB. RAM is the working memory the computer uses while it is running, and it is easily confused with disk space, which the panel does not show at all.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-015-b', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory', difficulty: 4,
  question: 'A school wants to install LabDraw 12 on a lab computer.' + ABOUT + REQS
    + 'Which of the four requirements <b>cannot</b> be checked from the panel shown?',
  options: ['The free disk space', 'The processor speed', 'The installed RAM', 'The system type'],
  answer: 'The free disk space',
  hint: 'Go through the requirements one at a time and look for each in the panel.',
  explanation: 'The panel reports the processor, the RAM and the system type, but says nothing about disk space, so that requirement is still unknown. The misconception is that a screen labelled "About this PC" describes everything about the machine; knowing which question a document cannot answer is as useful as reading the answers it does give.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-015-c', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory', difficulty: 4,
  question: 'A school wants to install LabDraw 12 on a lab computer.' + ABOUT + REQS
    + 'A pupil says the software cannot run because the processor is only 1.60 GHz. Which statement is correct?',
  options: [
    '1.60 GHz is above the 1.5 GHz minimum, so the processor is not the problem',
    '1.60 GHz is below the 1.5 GHz minimum, so the processor is indeed the problem',
    'Processor speed and memory are measured the same way, so both are too low',
    'A minimum speed applies to a 32-bit processor only, not to a 64-bit one',
  ],
  answer: '1.60 GHz is above the 1.5 GHz minimum, so the processor is not the problem',
  hint: 'Compare the two numbers as decimals: which is larger, 1.60 or 1.5?',
  explanation: '1.60 is larger than 1.5, so the processor exceeds the minimum and the requirement that actually fails is the RAM. The misconception is reading 1.60 as smaller than 1.5 because 60 is larger than 5; the digits after the point are tenths and hundredths, so 1.60 and 1.6 are the same number.',
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9ict-fam-015-d', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory', difficulty: 3,
  question: 'A school wants to install LabDraw 12 on a lab computer.' + ABOUT + REQS
    + 'How many more gigabytes of RAM must be fitted before this computer meets the memory requirement?',
  answer: 4,
  hint: 'The requirement is a total, not an amount to be added.',
  explanation: '8 GB is required and 4 GB is fitted, so 4 GB more is needed. The misconception is answering 8: a minimum requirement states the total the machine must end up with, so the amount to buy is the difference, not the requirement itself.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-fam-015-e', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory', difficulty: 4,
  question: 'LabDraw 12 needs a processor of 1.5 GHz or faster, 8 GB of RAM, a 64-bit system and 20 GB of free disk space.<br><br>Computer <b>P</b> has a 2.4 GHz processor and 4 GB of RAM. Computer <b>Q</b> has a 1.6 GHz processor and 8 GB of RAM. Both are 64-bit and both have 40 GB free. Which computer meets the requirements, and why?',
  options: [
    'Q, because every requirement has to be met, not just the fastest one',
    'P, because a faster processor makes up for having less memory fitted',
    'P, because processor speed is the requirement that matters the most',
    'Neither, because each of the two falls short on at least one point',
  ],
  answer: 'Q, because every requirement has to be met, not just the fastest one',
  hint: 'Test each machine against all four requirements and stop at the first failure.',
  explanation: 'Q meets all four; P fails on RAM, and nothing else it does well can compensate. The misconception is treating minimum requirements as a score to be totalled, so that a strong figure offsets a weak one; they are a list of conditions and every one of them has to hold.',
}));

})();
