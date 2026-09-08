'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Spreadsheets   (examWeight 5, joint heaviest)
//
//  ⚠ EVERY YEAR ASKS ALL FOUR SPREADSHEET FORMATS: cell-address recall,
//    writing a formula as free text, ticking the correct formula from a list,
//    and formula gap-fill. Together with Word Processing and Algorithms this is
//    one of only three topics stable in all five papers - 38.2% of 500 marks
//    between them - while Networks collapsed 22 -> 1 mark over the same period.
//    Weighting from one paper would have got this badly wrong.
//
//  ⚠ A FORMULA STARTS WITH AN EQUALS SIGN, and the papers test that directly.
//    Answers here accept the formula with or without spaces but NOT without the
//    leading "=", because that is the thing being examined.
//
//  ⚠ Written, not practical: the paper asks what a formula WOULD produce, not
//    for a working spreadsheet. Output prediction is therefore fully assessable.
//
//  Source: NCE ICT (N540) 2021-2025 Section B spreadsheet slot; NCF Grades 7-9
//  §8 read as cumulative scope.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-spreadsheets';

const MCQ = [
  ['g9ict-ss-001', 'cells_ranges', 1,
   'What is the name for the box where a row and a column meet?',
   ['Cell', 'Range', 'Sheet', 'Field'], 'Cell',
   'It is the smallest unit you can type into.',
   'A cell is the single box formed where a row and a column cross.'],

  ['g9ict-ss-002', 'cells_ranges', 1,
   'In a spreadsheet, what identifies the cell in <b>column C, row 5</b>?',
   ['C5', '5C', 'C:5', 'Row5C'], 'C5',
   'The column letter comes first.',
   'A cell reference is the column letter followed by the row number, so column C row 5 is C5.'],

  ['g9ict-ss-003', 'cells_ranges', 2,
   'What does the range <b>B2:B8</b> refer to?',
   ['All the cells from B2 down to B8', 'Only cells B2 and B8',
    'B2 divided by the value in B8', 'The eight cells in row 2'],
   'All the cells from B2 down to B8',
   'The colon means "through to".',
   'A colon defines a range, so B2:B8 is every cell from B2 through to B8 inclusive - seven cells.'],

  ['g9ict-ss-004', 'cells_ranges', 2,
   'How many cells are there in the range <b>A1:A10</b>?',
   ['10', '9', '11', '2'], '10',
   'Count both ends.',
   'A1:A10 includes both A1 and A10, so it is 10 cells.'],

  ['g9ict-ss-005', 'cells_ranges', 3,
   'Which of these is a range covering <b>two</b> columns?',
   ['A1:B5', 'A1:A5', 'B1:B9', 'C3:C3'], 'A1:B5',
   'Look at the column letters at each end.',
   'A1:B5 runs from column A to column B, so it spans two columns and five rows - 10 cells.'],

  ['g9ict-ss-006', 'formulas', 1,
   'Which character must a spreadsheet formula begin with?',
   ['=', '+', '#', '@'], '=',
   'It tells the spreadsheet this is a calculation, not text.',
   'A formula begins with an equals sign; without it the entry is treated as ordinary text.'],

  ['g9ict-ss-007', 'formulas', 2,
   'Which formula adds the contents of A1 and A2?',
   ['=A1+A2', 'A1+A2', '=ADD(A1,A2)', '=A1&A2'], '=A1+A2',
   'It must start with an equals sign.',
   '=A1+A2 starts with an equals sign and adds the two cells. Without the = it would be stored as text.'],

  ['g9ict-ss-008', 'formulas', 2,
   'Which formula multiplies cell B3 by 5?',
   ['=B3*5', '=B3x5', '=B3.5', 'B3*5'], '=B3*5',
   'The multiplication sign on a keyboard is the asterisk.',
   'Spreadsheets use * for multiplication, so =B3*5 multiplies B3 by 5.'],

  ['g9ict-ss-009', 'formulas', 2,
   'Which symbol is used for <b>division</b> in a spreadsheet formula?',
   ['/', '\\', '÷', ':'], '/',
   'It is on the same key as the question mark on many keyboards.',
   'The forward slash / is used for division.'],

  ['g9ict-ss-010', 'formulas', 3,
   'Cell A1 holds 10, A2 holds 4. What does <b>=A1-A2*2</b> display?',
   ['2', '12', '8', '20'], '2',
   'Multiplication is done before subtraction.',
   'The spreadsheet does A2*2 = 8 first, then 10 - 8 = 2.'],

  ['g9ict-ss-011', 'formulas', 3,
   'Cell A1 holds 6, A2 holds 2. What does <b>=(A1+A2)/4</b> display?',
   ['2', '6.5', '8', '4'], '2',
   'Work out the bracket first.',
   '(6 + 2) = 8, and 8 / 4 = 2.'],

  ['g9ict-ss-012', 'functions', 1,
   'Which function adds up a range of cells?',
   ['SUM', 'TOTAL', 'ADD', 'PLUS'], 'SUM',
   'Three letters.',
   '=SUM(A1:A10) adds every value in the range.'],

  ['g9ict-ss-013', 'functions', 1,
   'Which function finds the arithmetic mean of a range?',
   ['AVERAGE', 'MEAN', 'MID', 'MEDIAN'], 'AVERAGE',
   'The spreadsheet name is not the mathematical name.',
   '=AVERAGE(B1:B20) gives the mean of the range.'],

  ['g9ict-ss-014', 'functions', 2,
   'Which function returns the <b>largest</b> value in a range?',
   ['MAX', 'MIN', 'TOP', 'HIGH'], 'MAX',
   'Short for maximum.',
   '=MAX(C1:C30) returns the largest value in the range.'],

  ['g9ict-ss-015', 'functions', 2,
   'Which function counts how many cells in a range contain <b>numbers</b>?',
   ['COUNT', 'SUM', 'TOTAL', 'NUM'], 'COUNT',
   'It counts entries, it does not add them.',
   '=COUNT(A1:A50) returns how many cells in the range hold a number.'],

  ['g9ict-ss-016', 'functions', 3,
   'A teacher has 30 marks in B2:B31. Which formula gives the class average?',
   ['=AVERAGE(B2:B31)', '=SUM(B2:B31)', '=AVERAGE(B2+B31)', '=MEAN(B2:B31)'],
   '=AVERAGE(B2:B31)',
   'The range needs a colon, and the function is AVERAGE.',
   '=AVERAGE(B2:B31) takes the mean of all 30 marks.'],

  ['g9ict-ss-017', 'functions', 3,
   'Which formula finds the lowest mark in the range D2:D41?',
   ['=MIN(D2:D41)', '=MAX(D2:D41)', '=LOW(D2:D41)', '=SMALL(D2:D41)'],
   '=MIN(D2:D41)',
   'Short for minimum.',
   '=MIN(D2:D41) returns the smallest value in the range.'],

  ['g9ict-ss-018', 'formulas', 3,
   'A shopkeeper puts the price in B2 and the quantity in C2. Which formula gives the total cost?',
   ['=B2*C2', '=B2+C2', '=SUM(B2:C2)', '=B2/C2'], '=B2*C2',
   'Total cost is price times quantity.',
   'Multiplying price by quantity gives the total, so =B2*C2.'],

  ['g9ict-ss-019', 'functions', 3,
   'What is displayed by <b>=SUM(A1:A3)</b> when A1 = 5, A2 is empty and A3 = 7?',
   ['12', '5', '7', 'An error'], '12',
   'An empty cell counts as nothing, not as an error.',
   'SUM ignores the empty cell, so the result is 5 + 7 = 12.'],

  ['g9ict-ss-020', 'cells_ranges', 2,
   'What is the name for a single page of a spreadsheet file?',
   ['Worksheet', 'Workbook', 'Record', 'Table'], 'Worksheet',
   'The whole file is the workbook.',
   'A workbook is the file; each page inside it is a worksheet.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// ⚠ Free-text formula writing is one of the four formats every paper uses.
//   `alsoAccept` carries the spaced form because a spreadsheet accepts it, but
//   NOT the form without "=", which is the thing being tested.
const SHORT = [
  ['g9ict-ss-021', 'formulas', 2,
   'Write the formula that adds cells A1, A2 and A3 using a function and a range.',
   '=SUM(A1:A3)', ['=sum(a1:a3)', '=SUM(A1:A3) ', '= SUM(A1:A3)'],
   'Use SUM with a colon between the two ends of the range.',
   '=SUM(A1:A3) adds every cell from A1 to A3.'],
  ['g9ict-ss-022', 'formulas', 2,
   'Write the formula that subtracts cell B2 from cell B1.',
   '=B1-B2', ['=b1-b2', '= B1-B2', '=B1 - B2'],
   'Start with an equals sign; the first cell comes first.',
   '=B1-B2 takes the value in B2 away from the value in B1.'],
  ['g9ict-ss-023', 'functions', 2,
   'Write the formula that finds the highest value in the range C1 to C20.',
   '=MAX(C1:C20)', ['=max(c1:c20)', '= MAX(C1:C20)'],
   'MAX, with the range in brackets.',
   '=MAX(C1:C20) returns the largest value in that range.'],
  ['g9ict-ss-024', 'cells_ranges', 1,
   'Write the cell reference for the cell in <b>column F, row 12</b>.',
   'F12', ['f12'],
   'Column letter first, then the row number.', 'Column F row 12 is written F12.'],
  ['g9ict-ss-025', 'functions', 3,
   'Name the function that counts how many cells in a range contain numbers.',
   'COUNT', ['count'],
   'It counts rather than adds.',
   'COUNT returns how many cells in a range hold a numeric value.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK. `filter_sort`, `advanced_formatting` and
//  `charts_from_data` were declared with nothing behind them.
//  ⚠ Charts are described in words, never shown: this repo has no bundled
//    Grade 9 artwork, and "read the chart below" with no chart is a broken
//    item. What is assessed is which chart suits which data, and what a chart
//    must be labelled with - both of which the papers ask in words too.
// ══════════════════════════════════════════════════════════════════════════
const MCQ2 = [
  ['g9ict-ss-026', 'filter_sort', 1,
   'Arranging a list of names from A to Z is called:',
   ['Sorting', 'Filtering', 'Merging', 'Formatting'], 'Sorting',
   'Every row stays; only the order changes.',
   'Sorting reorders the rows; it does not remove any of them.'],

  ['g9ict-ss-027', 'filter_sort', 2,
   'What does <b>filtering</b> a list do?',
   ['Shows only the rows that match a condition',
    'Puts the rows in alphabetical order',
    'Deletes the rows that do not match',
    'Adds the values in a column'],
   'Shows only the rows that match a condition',
   'Nothing is deleted; some rows are hidden.',
   'A filter hides the rows that do not match, leaving the matching ones on screen. Removing the filter brings them all back.'],

  ['g9ict-ss-028', 'filter_sort', 2,
   'Sorting a column of marks in <b>descending</b> order puts them:',
   ['Largest first', 'Smallest first', 'In the order typed', 'In alphabetical order'],
   'Largest first',
   'Descending means going down.',
   'Descending order starts at the largest value and works down to the smallest.'],

  ['g9ict-ss-029', 'filter_sort', 3,
   'A teacher wants to see only the pupils who scored below 40. Which tool does this without deleting anything?',
   ['A filter', 'A sort', 'A chart', 'A page break'], 'A filter',
   'The other rows must come back afterwards.',
   'A filter temporarily hides the rows that do not match the condition; sorting would merely reorder them.'],

  ['g9ict-ss-030', 'advanced_formatting', 1,
   'Which feature automatically colours a cell red when its value falls below a set figure?',
   ['Conditional formatting', 'Text wrapping', 'Merge cells', 'Freeze panes'],
   'Conditional formatting',
   'The formatting depends on a condition.',
   'Conditional formatting applies a chosen format only when the cell meets the rule you set.'],

  ['g9ict-ss-031', 'advanced_formatting', 2,
   'What does <b>merging</b> cells do?',
   ['Joins several cells into one larger cell',
    'Adds all of their values together',
    'Sorts them alphabetically',
    'Deletes their contents'],
   'Joins several cells into one larger cell',
   'It changes the shape, not the arithmetic.',
   'Merging combines the selected cells into a single cell, which is how a heading is centred across a table.'],

  ['g9ict-ss-032', 'advanced_formatting', 2,
   'Which formatting would display the number 0.75 as 75%?',
   ['Percentage format', 'Currency format', 'Date format', 'Text format'],
   'Percentage format',
   'The stored value does not change.',
   'Percentage format displays the stored value multiplied by 100 with a % sign; the underlying number is unchanged.'],

  ['g9ict-ss-033', 'advanced_formatting', 3,
   'A long list is scrolled down and the column headings disappear off the top. Which feature keeps them visible?',
   ['Freeze panes', 'Merge cells', 'Conditional formatting', 'Page break preview'],
   'Freeze panes',
   'The heading row must stay put while the rest moves.',
   'Freezing the top row keeps the headings on screen while the data below scrolls.'],

  ['g9ict-ss-034', 'charts_from_data', 1,
   'Which chart is best for comparing the total sales of five different shops?',
   ['A bar chart', 'A line chart', 'A pie chart', 'A scatter chart'],
   'A bar chart',
   'Five separate things are being compared.',
   'A bar chart compares separate categories directly by the length of each bar.'],

  ['g9ict-ss-035', 'charts_from_data', 2,
   'Which chart is best for showing how a temperature changed each hour through one day?',
   ['A line chart', 'A pie chart', 'A bar chart', 'A doughnut chart'],
   'A line chart',
   'The data is continuous, over time.',
   'A line chart joins the points, which shows a trend over time better than separate bars.'],

  ['g9ict-ss-036', 'charts_from_data', 2,
   'A chart must show what share of a class chose each of four sports. Which chart is best?',
   ['A pie chart', 'A line chart', 'A scatter chart', 'A radar chart'],
   'A pie chart',
   'The four shares add up to one whole class.',
   'A pie chart shows parts of a single whole, which is exactly what shares of a class are.'],

  ['g9ict-ss-037', 'charts_from_data', 3,
   'Which three labels should a chart normally carry so it can be understood?',
   ['A chart title and a label on each axis',
    'The file name, the date and the author',
    'The formula, the range and the sheet name',
    'The printer name, the paper size and the margins'],
   'A chart title and a label on each axis',
   'A reader must know what is being plotted against what.',
   'Without a title and labelled axes a chart cannot be read, however accurate the data behind it.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
