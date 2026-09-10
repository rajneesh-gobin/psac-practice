'use strict';
(function () {

// ══════════════════════════════════════════════════════════════════════
// SPREADSHEETS section: g9ict-sav-001 to g9ict-sav-040
// chapterId: 'g9ict-spreadsheets'
// ══════════════════════════════════════════════════════════════════════

// ── cells_ranges: sav-001 to sav-007 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-001', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'In a spreadsheet, the cell reference B4 refers to:',
  options:['the cell in column B, row 4','the cell in row B, column 4','the fourth sheet in the workbook','a named range called B4'],
  answer:'the cell in column B, row 4', hint:'Columns are letters, rows are numbers.',
  explanation:'Cell references are column letter followed by row number, so B4 is the intersection of column B and row 4.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-002', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'A cell range A1:C3 in a spreadsheet includes:',
  options:['the 9-cell block A1 to C3','all of column A and column C','only cells A1 and C3','only rows 1 and 3'],
  answer:'the 9-cell block A1 to C3', hint:'A1:C3 is a 3×3 block.',
  explanation:'The colon notation A1:C3 specifies a rectangular range from the top-left cell (A1) to the bottom-right cell (C3), covering columns A, B and C in rows 1, 2 and 3.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-003', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'In a spreadsheet formula, an absolute cell reference such as $B$2 means:',
  options:['the reference never changes','the cell holds a formula result','the cell holds a currency value','the cell is locked for editing'],
  answer:'the reference never changes', hint:'Dollar signs lock the reference.',
  explanation:'The $ signs before the column letter and row number fix the reference; copying the formula to any cell always points back to B2.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-004', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'When you copy a formula containing the relative reference B2 one row down, the reference automatically changes to:',
  options:['B3','B2','$B$2','B1'],
  answer:'B3', hint:'Relative references adjust to match the new position.',
  explanation:'A relative reference moves with the formula. Copying the formula one row down increases the row number by one, so B2 becomes B3.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-005', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'A mixed reference such as $B2 in a spreadsheet means:',
  options:['the column is fixed, the row is not','the row is fixed, the column is not','both the column and row are fixed','neither column nor row is fixed'],
  answer:'the column is fixed, the row is not', hint:'$ before the column letter = column locked.',
  explanation:'A mixed reference fixes one part and leaves the other relative. $B2 locks column B but allows the row number to change when copied vertically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-006', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'Selecting a non-contiguous range (multiple separate cells or ranges) in a spreadsheet is done by:',
  options:['holding Ctrl while clicking','pressing F5 for the Go To box','holding Shift while clicking','holding Alt while clicking'],
  answer:'holding Ctrl while clicking', hint:'Ctrl allows multiple separate selections.',
  explanation:'Holding Ctrl while selecting allows you to add separate, non-adjacent cells or ranges to your selection.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-007', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'Freezing the top row in a spreadsheet means:',
  options:['the headers stay in view','the top row cannot be deleted','the top row prints every page','the top row cannot be edited'],
  answer:'the headers stay in view', hint:'Freeze panes keep headers on screen.',
  explanation:'Freezing the top row pins it in place so that column headings are always visible as the user scrolls downward through a large dataset.' }));

// ── formulas: sav-008 to sav-014 ─────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-008', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'All spreadsheet formulas must begin with:',
  options:['an equals sign (=)','a plus sign (+)','a hash symbol (#)','a dollar sign ($)'],
  answer:'an equals sign (=)', hint:'= tells the spreadsheet to calculate.',
  explanation:'An equals sign at the start of a cell entry signals to the spreadsheet application that what follows is a formula to be calculated, not plain text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-009', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'The formula =A1+A2 in a spreadsheet will:',
  options:['add the two values together','multiply the two values together','display the text "A1+A2"','average the two values'],
  answer:'add the two values together', hint:'+ is the addition operator.',
  explanation:'The formula references two cells and uses + to add their contents, displaying the sum in the cell containing the formula.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-010', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'In spreadsheet formula notation, the symbol used for multiplication is:',
  options:['* (asterisk)','x','× (times sign)','m'],
  answer:'* (asterisk)', hint:'Keyboards do not have a × key.',
  explanation:'Spreadsheets use * for multiplication because it is available on every keyboard; × cannot be entered as an operator.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-011', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'The formula =B3*C3 calculates:',
  options:['the product of B3 and C3','the difference of B3 and C3','whether B3 exceeds C3','the sum of B3 and C3'],
  answer:'the product of B3 and C3', hint:'* is multiplication.',
  explanation:'=B3*C3 multiplies the values in B3 and C3 together and displays the result.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-012', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'The formula =D5-D4 will display:',
  options:['the value of D5 minus the value of D4','the value of D4 minus D5','the sum of D4 and D5','a list of values between D4 and D5'],
  answer:'the value of D5 minus the value of D4', hint:'- is subtraction; order matters.',
  explanation:'The formula subtracts the second operand (D4) from the first (D5), displaying the difference.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-013', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'In a spreadsheet, the order of operations follows BODMAS/BIDMAS, which means:',
  options:['brackets are worked out first','addition comes before multiplying','the last operator is used first','the formula runs left to right'],
  answer:'brackets are worked out first', hint:'Brackets first, then powers, then × and ÷, then + and −.',
  explanation:'Like standard mathematics, spreadsheets follow the BODMAS order: Brackets, Orders (powers), Division/Multiplication, Addition/Subtraction.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-014', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'The formula =E2/F2 calculates:',
  options:['the value of E2 divided by the value of F2','E2 multiplied by F2','the remainder when E2 is divided by F2','the percentage of E2 that is F2'],
  answer:'the value of E2 divided by the value of F2', hint:'/ is division in spreadsheet formulas.',
  explanation:'The / operator performs division. =E2/F2 divides the value in E2 by the value in F2.' }));

// ── functions: sav-015 to sav-021 ────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-015', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =SUM(A1:A10) calculates:',
  options:['the total of all values in cells A1 through A10','the average of A1 to A10','the largest value in A1 to A10','the number of cells containing values in A1 to A10'],
  answer:'the total of all values in cells A1 through A10', hint:'SUM adds up all the values.',
  explanation:'The SUM function adds together every numeric value in the specified range, returning the total.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-016', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =AVERAGE(B2:B8) returns:',
  options:['the mean of B2 to B8','the total of B2 to B8, halved','the median of B2 to B8','the mode of B2 to B8'],
  answer:'the mean of B2 to B8', hint:'AVERAGE sums the values and divides by the count.',
  explanation:'The AVERAGE function sums all values in the range and divides by the count of those values to produce the arithmetic mean.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-017', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =MAX(C1:C20) returns:',
  options:['the largest value in cells C1 through C20','the total of all values in C1 to C20','the average of C1 to C20','the number of cells in C1 to C20'],
  answer:'the largest value in cells C1 through C20', hint:'MAX = maximum = largest.',
  explanation:'MAX scans every cell in the range and returns the highest numeric value found.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-018', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =COUNT(D1:D50) returns:',
  options:['how many cells hold numbers','the total of all the values','the average of the values','the number 50 every time'],
  answer:'how many cells hold numbers', hint:'COUNT counts numbers, not text.',
  explanation:'COUNT counts only the cells that contain numbers; empty cells and text cells are ignored.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-019', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =IF(A1>50,"Pass","Fail") will display:',
  options:['"Pass" when A1 is over 50','the number 50 in every case','"Pass" when A1 is under 50','"Pass" only when A1 is 50'],
  answer:'"Pass" when A1 is over 50', hint:'IF tests a condition and returns one of two values.',
  explanation:'The IF function evaluates the condition (A1>50); if TRUE it returns the first value ("Pass"); if FALSE it returns the second ("Fail").' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-020', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =COUNTA(E1:E20) differs from COUNT because COUNTA:',
  options:['counts all non-empty cells','counts only the blank cells','counts cells with formulas','counts only numeric cells'],
  answer:'counts all non-empty cells', hint:'COUNTA = COUNT All types of data.',
  explanation:'COUNTA counts every non-empty cell in the range, regardless of data type (numbers, text, dates, etc.).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-021', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'The function =ROUND(3.14159, 2) returns:',
  options:['3.14','3.1','3','3.142'],
  answer:'3.14', hint:'Round to 2 decimal places.',
  explanation:'ROUND(number, digits) rounds the number to the specified number of decimal places; ROUND(3.14159, 2) gives 3.14.' }));

// ── filter_sort: sav-022 to sav-027 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-022', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'Sorting data in a spreadsheet in descending order for a numeric column arranges values:',
  options:['from largest to smallest (e.g., 100, 50, 20, 5)','from smallest to largest (e.g., 5, 20, 50, 100)','alphabetically from A to Z','randomly'],
  answer:'from largest to smallest (e.g., 100, 50, 20, 5)', hint:'Descending = high to low for numbers.',
  explanation:'Descending sort arranges numbers from highest to lowest; ascending sort is lowest to highest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-023', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'AutoFilter in a spreadsheet is used to:',
  options:['show only the matching rows','delete rows that do not match','chart the filtered data only','sort the data alphabetically'],
  answer:'show only the matching rows', hint:'It hides, not deletes, non-matching rows.',
  explanation:'AutoFilter adds drop-down arrows to column headers; selecting a value displays only rows matching that value, hiding (not deleting) all others.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-024', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'Multi-level sorting in a spreadsheet allows:',
  options:['a second column to break ties','filtering and sorting at once','sorting in A to Z order only','sorting by cell colour only'],
  answer:'a second column to break ties', hint:'Sort by surname, then by first name for people with the same surname.',
  explanation:'Multi-level sorting defines a sort priority: first sort by the primary key, then break ties using the secondary key, and so on.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-025', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'A custom filter in a spreadsheet allows:',
  options:['complex criteria with AND or OR','the colour of cells to change','duplicate rows to be removed','every column sorted at once'],
  answer:'complex criteria with AND or OR', hint:'Custom filters support comparison operators and AND/OR logic.',
  explanation:'The custom filter dialog lets users apply comparison operators (>, <, =, BETWEEN) and combine conditions with AND or OR for flexible data extraction.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-026', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'When sorting a table, it is important to ensure that:',
  options:['whole rows move together','only the sorted column moves','the header row is sorted too','blank rows are deleted first'],
  answer:'whole rows move together', hint:'Rows must stay intact.',
  explanation:'Sorting must move entire rows together; sorting only one column while leaving others in place mixes up the data, giving meaningless results.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-027', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'After applying AutoFilter, the row numbers of hidden rows:',
  options:['are skipped, leaving gaps','are deleted permanently','are renumbered in order','are highlighted in red'],
  answer:'are skipped, leaving gaps', hint:'Hidden rows keep their original numbers; they are just not visible.',
  explanation:'Filtered rows are hidden but not removed; the row numbers in the row header show gaps where the hidden rows are, confirming data still exists.' }));

// ── advanced_formatting: sav-028 to sav-034 ──────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-028', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Conditional formatting in a spreadsheet automatically:',
  options:['restyles cells by their value','sorts cells highest to lowest','deletes cells failing a test','protects cells from editing'],
  answer:'restyles cells by their value', hint:'Format changes when conditions are met.',
  explanation:'Conditional formatting rules apply chosen formatting — e.g., red fill — to cells whose values meet specified criteria, making patterns instantly visible.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-029', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Data bars in conditional formatting display:',
  options:['a bar inside each cell','the largest value in a range','a red-to-green colour scale','a chart in a separate area'],
  answer:'a bar inside each cell', hint:'A mini bar chart inside each cell.',
  explanation:'Data bars are a form of in-cell visualisation; the bar width is proportional to the cell value, giving a quick visual comparison across the range.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-030', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Merging cells in a spreadsheet:',
  options:['joins cells into one big cell','applies one formula to them all','locks the cells against edits','copies data into all of them'],
  answer:'joins cells into one big cell', hint:'Often used for centred headings.',
  explanation:'Merging combines adjacent cells so a label or title can span multiple columns or rows, useful for table headers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-031', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Wrapping text in a cell means:',
  options:['long text runs onto new lines','long text is cut off at the edge','long text moves to the next cell','the whole cell becomes hidden'],
  answer:'long text runs onto new lines', hint:'Text folds inside the cell.',
  explanation:'Text wrapping increases the row height as needed and displays long text on multiple lines within the same cell, improving readability.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-032', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'A number format of "#,##0.00" applied to a cell will display 1234.5 as:',
  options:['1,234.50','1234.5','$1,234.50','1.234,50'],
  answer:'1,234.50', hint:'Comma thousands separator, two decimal places.',
  explanation:'The format #,##0.00 adds a comma as the thousands separator and always shows two decimal places, so 1234.5 becomes 1,234.50.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-033', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Applying the "Percentage" format to a cell containing 0.75 will display:',
  options:['75%','0.75%','75.00','750%'],
  answer:'75%', hint:'The percentage format multiplies by 100 and adds a % sign.',
  explanation:'Spreadsheets store percentages as decimals (0.75 = 75%); the Percentage format multiplies the stored value by 100 and appends a % symbol.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-034', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
  question:'Protecting a worksheet (or locking cells) in a spreadsheet prevents:',
  options:['edits to the locked cells','the sheet being printed','formulas recalculating','the file being saved'],
  answer:'edits to the locked cells', hint:'Protection = password-guarded editing restriction.',
  explanation:'Sheet protection locks specified cells so their contents cannot be changed; entering the correct password temporarily removes the protection.' }));

// ── charts_from_data: sav-035 to sav-040 ─────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-035', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'A bar chart is best used to:',
  options:['compare values across different categories','show how data changes continuously over time','display how parts contribute to a whole','show the relationship between two continuous variables'],
  answer:'compare values across different categories', hint:'Bars side by side for comparison.',
  explanation:'Bar (and column) charts compare discrete categories; the length or height of each bar represents its value, making comparisons easy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-036', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'A pie chart is best used to show:',
  options:['how individual parts contribute to a whole (100%)','how a value changes over time','the relationship between two continuous variables','a comparison of many different categories'],
  answer:'how individual parts contribute to a whole (100%)', hint:'The whole pie = 100%.',
  explanation:'A pie chart divides a circle into slices proportional to each category\'s share of the total, making it ideal for showing part-to-whole relationships.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-037', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'A line graph is best used to show:',
  options:['trends over a period of time','the parts that make a whole','a comparison of categories','data that is not numerical'],
  answer:'trends over a period of time', hint:'Lines connect data points to show a trend.',
  explanation:'Line graphs connect data points in sequence, making them ideal for showing trends, patterns or changes over time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-038', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'To create a chart from selected spreadsheet data, the user should:',
  options:['select the range, then Insert','type the values into the chart','write a formula for the chart','paste into a drawing program'],
  answer:'select the range, then Insert', hint:'Select data first, then insert the chart.',
  explanation:'The chart is linked to the selected data; selecting the range first (including headers for labels) and then inserting the chart creates a correctly labelled visual.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-039', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'When chart data in the spreadsheet is changed, the chart:',
  options:['updates automatically to reflect the new values','must be deleted and redrawn from scratch','sends an error message','changes colour to show the data has changed'],
  answer:'updates automatically to reflect the new values', hint:'Charts are linked to their source data.',
  explanation:'A chart is linked to its data range; changing a cell value in the source data immediately updates the chart because it reads the current values.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-040', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'Chart axes should always be labelled because:',
  options:['the numbers need a meaning','labels make the chart faster','labels enlarge the file size','the law requires the labels'],
  answer:'the numbers need a meaning', hint:'Labels give meaning to the numbers.',
  explanation:'Axis labels provide the context needed to interpret the chart — for example, knowing that the y-axis shows "Temperature (°C)" rather than just numbers.' }));

// ══════════════════════════════════════════════════════════════════════
// ALGORITHMS section: g9ict-sav-041 to g9ict-sav-079
// chapterId: 'g9ict-algorithms'
// ══════════════════════════════════════════════════════════════════════

// ── flowchart_symbols: sav-041 to sav-047 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-041', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'In a flowchart, the oval (or rounded rectangle) shape is used to represent:',
  options:['a Start or End (terminal) point','a decision (yes/no question)','a process (an action or calculation)','data input or output'],
  answer:'a Start or End (terminal) point', hint:'Every flowchart starts and ends with an oval.',
  explanation:'The oval (also called a terminator) marks the beginning (START) and end (END/STOP) of the algorithm.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-042', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'In a flowchart, the rectangle is used to represent:',
  options:['a process or calculation','a Start or End terminal','data input or output','a decision question'],
  answer:'a process or calculation', hint:'A box = doing something.',
  explanation:'A rectangle (process box) contains an action or calculation — e.g., "Calculate Total = Price × Quantity".' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-043', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'In a flowchart, the diamond (rhombus) shape is used to represent:',
  options:['a decision with two exits','a Start or End terminal','a process instruction','a stored data file'],
  answer:'a decision with two exits', hint:'Diamond = decision = fork in the road.',
  explanation:'The diamond contains a condition question; the two exit paths are labelled Yes/No (or True/False) and lead to different parts of the algorithm.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-044', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'In a flowchart, the parallelogram is used to represent:',
  options:['input or output of data','a process instruction','a decision question','a sub-routine call'],
  answer:'input or output of data', hint:'Slanted sides = data in or out.',
  explanation:'The parallelogram (I/O box) represents any input (e.g., "Enter Number") or output (e.g., "Display Result") operation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-045', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'Arrows in a flowchart are used to show:',
  options:['the order of the steps','the number of loop repeats','the data type of variables','the speed of the algorithm'],
  answer:'the order of the steps', hint:'Arrows = follow this direction.',
  explanation:'Flow lines (arrows) connect the symbols and show the order in which the steps are performed, tracing the possible execution paths.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-046', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'A connector circle in a flowchart is used to:',
  options:['join distant parts of the chart','show a mathematical calculation','mark the start of the algorithm','show a decision point in it'],
  answer:'join distant parts of the chart', hint:'It connects distant or cross-page paths.',
  explanation:'A connector (small circle with a letter or number) links sections of a flowchart that cannot be joined with a direct line, especially across pages.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-047', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
  question:'How many exits does a decision diamond in a flowchart normally have?',
  options:['Two (Yes and No)','Three (Yes, No, Maybe)','One (always onward)','As many as needed'],
  answer:'Two (Yes and No)', hint:'A condition is either true or false.',
  explanation:'A standard decision diamond has exactly two exit paths — one for the True/Yes outcome and one for the False/No outcome.' }));

// ── flowchart_reading: sav-048 to sav-054 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-048', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'When tracing a flowchart, you should follow the arrows:',
  options:['in the direction they point','only through decision boxes','randomly to test all paths','in reverse from the end'],
  answer:'in the direction they point', hint:'Trace step by step along the arrows.',
  explanation:'Reading a flowchart involves following each arrow, executing each instruction in sequence, and recording the current value of each variable after each step.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-049', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'A flowchart with an arrow leading from a process box back to an earlier decision box creates:',
  options:['a loop that repeats steps','a new parallel branch of steps','an error in the chart','an early termination'],
  answer:'a loop that repeats steps', hint:'An arrow going backwards = a loop.',
  explanation:'An arrow returning to an earlier point creates a cycle — the algorithm repeats those steps each time the loop condition is true.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-050', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'In a trace table, each row typically records:',
  options:['the variable values now','the source code for a step','the name of the programmer','the time each step took'],
  answer:'the variable values now', hint:'A trace table tracks how values change.',
  explanation:'A trace table has a column for each variable plus one for any output; each row shows the state of all variables after one instruction is executed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-051', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'A flowchart that has no path from START to END (because all paths loop back) would:',
  options:['run forever — an infinite loop — and never stop','stop after 100 iterations automatically','print an error message and stop','restart the computer'],
  answer:'run forever — an infinite loop — and never stop', hint:'No exit path = infinite loop.',
  explanation:'An algorithm that can never reach the END terminal runs indefinitely; this is a logic error called an infinite loop and must be avoided.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-052', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'When reading a flowchart, the "Yes" exit from a decision diamond is taken when:',
  options:['the condition is true','the variable equals zero','the condition is false','the user presses Enter'],
  answer:'the condition is true', hint:'Yes = the condition is met.',
  explanation:'The Yes (or True) path from a decision diamond is followed when the condition inside the diamond evaluates to true; the No path is taken otherwise.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-053', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'What is the output of a flowchart that: (1) sets X = 5, (2) checks "Is X > 3?", (3) if Yes, displays X?',
  options:['5','3','No output — condition fails','0'],
  answer:'5', hint:'5 > 3 is true, so display 5.',
  explanation:'X is assigned 5; the condition 5 > 3 is true, so the Yes branch is taken and X (which is 5) is displayed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-054', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:2,
  question:'A flowchart that contains a counter variable that is increased by 1 each time around a loop is most likely implementing:',
  options:['a counting loop','a random generator','an input check','a list search'],
  answer:'a counting loop', hint:'A counter tracks how many times the loop has run.',
  explanation:'Counting loops use a variable (e.g., COUNT) that starts at a value, increments by 1 each iteration, and the loop exits when COUNT reaches the target number.' }));

// ── drawing_flowcharts: sav-055 to sav-060 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-055', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'When drawing a flowchart, which symbol should always appear first?',
  options:['A START terminal (oval)','A process rectangle','A decision diamond','A parallelogram'],
  answer:'A START terminal (oval)', hint:'Every flowchart begins with START.',
  explanation:'The oval or rounded rectangle labelled START (or BEGIN) is the entry point of every flowchart.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-056', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'An algorithm that must accept a number from the user and display its square should include, in order:',
  options:['START → Input N → Calculate Square = N×N → Display Square → END','START → Calculate Square → Input N → Display Square → END','START → Display Square → Input N → END','START → END → Input N → Calculate'],
  answer:'START → Input N → Calculate Square = N×N → Display Square → END', hint:'Input before process, process before output.',
  explanation:'The correct sequence is: get the input first, then calculate, then display the result — input before processing before output.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-057', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'A flowchart to check whether a number is even or odd should include:',
  options:['a decision using MOD 2','no decision diamond at all','a box showing both answers','only a START and END box'],
  answer:'a decision using MOD 2', hint:'A condition with two outcomes requires a decision diamond.',
  explanation:'Checking a condition (is the remainder after dividing by 2 equal to 0?) requires a decision diamond with two distinct output paths.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-058', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'In a flowchart, a loop that checks its condition BEFORE executing the body of the loop is called a:',
  options:['pre-condition (WHILE) loop','post-condition (REPEAT-UNTIL) loop','fixed-count (FOR) loop','infinite loop'],
  answer:'pre-condition (WHILE) loop', hint:'Check first, then execute = WHILE.',
  explanation:'In a WHILE loop the condition is evaluated before each iteration; if the condition is initially false, the loop body may never execute.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-059', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'A loop that checks its condition AFTER executing the body at least once is called a:',
  options:['post-condition (REPEAT-UNTIL) loop','pre-condition (WHILE) loop','sequential structure','decision structure'],
  answer:'post-condition (REPEAT-UNTIL) loop', hint:'Execute first, check after = REPEAT-UNTIL.',
  explanation:'A REPEAT-UNTIL loop always executes the body at least once before testing the condition at the end.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-060', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:2,
  question:'When drawing a flowchart, all text inside process boxes should be:',
  options:['clear, concise instructions','nothing at all, just shapes','the name of the programmer','full Python source code'],
  answer:'clear, concise instructions', hint:'Flowcharts use plain language or pseudocode.',
  explanation:'Process boxes contain simple instructions (e.g., "Set Total = Price + Tax") in plain language or pseudocode, not actual programming language syntax.' }));

// ── control_structures: sav-061 to sav-067 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-061', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'The three fundamental control structures in programming are:',
  options:['sequence, selection, iteration','variable, constant, data type','function, procedure, module','input, process and output'],
  answer:'sequence, selection, iteration', hint:'Sequence, selection, repetition.',
  explanation:'Every algorithm can be written using just these three structures: executing instructions in order (sequence), choosing between paths (selection) and repeating steps (iteration).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-062', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'An IF-THEN-ELSE statement implements which control structure?',
  options:['Selection — it chooses one of two paths based on a condition','Sequence — instructions follow one after the other','Iteration — a block of code repeats','Recursion — a function calls itself'],
  answer:'Selection — it chooses one of two paths based on a condition', hint:'IF = selecting between options.',
  explanation:'Selection (also called branching) uses a condition to decide which path the algorithm takes: the THEN path if true, the ELSE path if false.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-063', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'A FOR loop is used when:',
  options:['the number of repetitions is known in advance','the number of repetitions is unknown and depends on user input','the algorithm has no repetition at all','the condition is tested after each iteration'],
  answer:'the number of repetitions is known in advance', hint:'FOR loops count from one value to another.',
  explanation:'A FOR loop (counted loop) repeats a known, fixed number of times — e.g., "FOR i = 1 TO 10" — making it ideal when the count is determined before the loop starts.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-064', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'A WHILE loop is most appropriate when:',
  options:['the repeat count is unknown','the loop must run exactly ten times','the body must run at least once','no repetition is needed at all'],
  answer:'the repeat count is unknown', hint:'WHILE = keep going while the condition holds.',
  explanation:'WHILE loops are used for indefinite repetition — repeating until a condition changes, such as "while the user has not entered a valid password".' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-065', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'A nested IF statement is:',
  options:['an IF inside another IF','a function that calls itself','a loop inside another loop','an IF with no ELSE clause'],
  answer:'an IF inside another IF', hint:'IF inside an IF.',
  explanation:'Nested IFs allow multi-way selection; the inner IF is only reached if the outer condition is true, enabling finer-grained decision-making.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-066', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'In pseudocode, what does the following do?\nFOR i = 1 TO 5\n  OUTPUT i\nNEXT i',
  options:['Outputs 1, 2, 3, 4, 5','Loops for ever with no end','Outputs only the number 5','Outputs 5, 4, 3, 2, 1'],
  answer:'Outputs 1, 2, 3, 4, 5', hint:'The loop counts from 1 up to 5.',
  explanation:'The FOR loop starts at 1 and increases i by 1 each iteration, outputting i each time, giving 1, 2, 3, 4, 5.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-067', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
  question:'A variable in an algorithm is:',
  options:['a named store whose value changes','a fixed value that never changes','the name of the algorithm itself','a type of repetition structure'],
  answer:'a named store whose value changes', hint:'It stores a value that may be updated.',
  explanation:'A variable is like a labelled box in memory that can hold a value; the value can be read, changed or used in calculations at any point in the algorithm.' }));

// ── python_basics: sav-068 to sav-073 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-068', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'In Python, the function used to display output on the screen is:',
  options:['print()','display()','output()','show()'],
  answer:'print()', hint:'print() is Python\'s output statement.',
  explanation:'print() is Python\'s built-in function for displaying output; print("Hello") outputs the text Hello to the screen.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-069', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'In Python, the function used to receive input from the user is:',
  options:['input()','read()','get()','scan()'],
  answer:'input()', hint:'input() waits for the user to type something.',
  explanation:'input() pauses the program and waits for the user to enter a value, which is returned as a string.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-070', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'In Python, what symbol is used for comments (lines that are ignored when the program runs)?',
  options:['# (hash)','// (double slash)','/* */ (block comment)','-- (double dash)'],
  answer:'# (hash)', hint:'Everything after # on a line is a comment.',
  explanation:'In Python, any text following the # character on a line is a comment and is ignored by the interpreter.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-071', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'In Python, indentation (spaces at the start of a line) is used to:',
  options:['define blocks of code','separate names from values','indicate a comment line','make the code look neat'],
  answer:'define blocks of code', hint:'Python uses indentation instead of braces.',
  explanation:'Python uses consistent indentation (typically 4 spaces) to delimit blocks; incorrect indentation is a syntax error.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-072', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'What is the output of the following Python code?\nx = 3\ny = 4\nprint(x + y)',
  options:['7','34','xy','12'],
  answer:'7', hint:'3 + 4 = 7.',
  explanation:'x holds 3 and y holds 4; x + y evaluates to 7, which is displayed by print().' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-073', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
  question:'In Python, the int() function is used to:',
  options:['convert a string to a number','display an integer on screen','check a value is a whole one','round to the nearest whole'],
  answer:'convert a string to a number', hint:'int("5") converts the string "5" to the number 5.',
  explanation:'input() always returns a string; wrapping it in int() — e.g., int(input("Enter a number: ")) — converts the string to an integer for arithmetic.' }));

// ── maths_modelling: sav-074 to sav-079 ──────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-074', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'In an algorithm, the MOD operator gives:',
  options:['the remainder after division','the result of multiplication','the square root of a number','the larger of two numbers'],
  answer:'the remainder after division', hint:'7 ÷ 3 = 2 remainder 1.',
  explanation:'MOD (modulus) returns the remainder of an integer division. It is useful for checking even/odd (number MOD 2 = 0 means even) or cycling through values.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-075', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'An algorithm to find the largest of three numbers A, B and C would require:',
  options:['a series of comparisons','a single addition A + B + C','a loop counting A to C','one line of code only'],
  answer:'a series of comparisons', hint:'Compare pairs.',
  explanation:'Finding the maximum of three values requires at least two comparisons: first determine the larger of A and B, then compare that result with C.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-076', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'Pseudocode is:',
  options:['a plain-English algorithm plan','a language used only in schools','Python code that runs at once','a type of flowchart symbol'],
  answer:'a plain-English algorithm plan', hint:'Pseudo = false/informal — not a real language.',
  explanation:'Pseudocode describes algorithm logic in structured plain text; it has no strict syntax rules and is used to plan an algorithm before coding it in a real language.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-077', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'An algorithm that calculates the sum of the integers from 1 to N would use:',
  options:['a loop adding to a total','a decision for each integer','a formula dividing N by 2','a table of every answer'],
  answer:'a loop adding to a total', hint:'Accumulate the sum inside a loop.',
  explanation:'A counting loop (e.g., FOR i = 1 TO N) adds i to a Total variable each iteration; when the loop ends, Total holds the sum 1 + 2 + … + N.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-078', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'A variable used to count the number of times a certain condition is true inside a loop is often called a:',
  options:['counter variable','string variable','fixed constant','boolean flag'],
  answer:'counter variable', hint:'It tallies how many times something happened.',
  explanation:'A counter variable starts at zero, and each time the condition is true inside the loop it is incremented by 1; at the end it holds the total count.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-079', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:2,
  question:'An accumulator variable in an algorithm is used to:',
  options:['keep a running total','store the largest so far','count the iterations','store the user input'],
  answer:'keep a running total', hint:'Accumulate = gather up.',
  explanation:'An accumulator is initialised to 0 and is increased by the current value on each loop iteration, building up the total progressively.' }));

// ══════════════════════════════════════════════════════════════════════
// SOFTWARE OS section: g9ict-sav-080 to g9ict-sav-104
// chapterId: 'g9ict-software-os'
// ══════════════════════════════════════════════════════════════════════

// ── os_functions: sav-080 to sav-088 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-080', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'An operating system (OS) is:',
  options:['software that manages the computer','a program for making spreadsheets','a browser for viewing web pages','a type of self-copying virus'],
  answer:'software that manages the computer', hint:'The OS sits between hardware and applications.',
  explanation:'The operating system is the master control program; it manages the CPU, memory, storage and I/O devices, and provides the environment in which applications run.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-081', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'The OS function of memory management involves:',
  options:['allocating RAM to programs','protecting against viruses','controlling who may log in','managing the file system'],
  answer:'allocating RAM to programs', hint:'RAM must be shared between all running programs.',
  explanation:'The OS tracks which areas of RAM are in use, allocates memory to new processes and reclaims it when a program terminates, preventing conflicts.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-082', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'The file management function of an OS allows users to:',
  options:['organise files and folders','install hardware drivers','run application programs','connect to the internet'],
  answer:'organise files and folders', hint:'Managing files and folders.',
  explanation:'The OS provides a file system interface — in Windows, File Explorer — that lets users organise their data across storage devices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-083', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Device drivers are software that:',
  options:['let the OS talk to hardware','block viruses from entering','save files to the hard disk','manage the user password'],
  answer:'let the OS talk to hardware', hint:'A driver translates between the OS and the hardware.',
  explanation:'Every hardware device needs a driver — a software translator that converts the OS\'s generic commands into the specific signals the device understands.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-084', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Multitasking in an operating system means:',
  options:['many programs run at once','typing and clicking at once','the CPU drives many screens','two operating systems run'],
  answer:'many programs run at once', hint:'Switching fast makes it feel simultaneous.',
  explanation:'The OS uses time-slicing to give each running process a tiny slice of CPU time in turn; switching is fast enough that applications appear to run concurrently.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-085', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'User interface management by the OS provides:',
  options:['the environment the user works in','protection from computer viruses','automatic backups of user data','the connection to the internet'],
  answer:'the environment the user works in', hint:'GUI or CLI — the OS provides the interface.',
  explanation:'The OS presents either a Graphical User Interface (GUI, with icons and windows) or a Command Line Interface (CLI) through which users control the computer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-086', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Error handling in an operating system involves:',
  options:['reporting faults and recovering','stopping the user making errors','deleting all files on an error','restarting after every crash'],
  answer:'reporting faults and recovering', hint:'OS detects and reports errors.',
  explanation:'The OS monitors hardware and software for faults; when detected it displays error messages, logs the event and may attempt recovery to prevent data loss.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-087', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Security management by the OS includes:',
  options:['login and access permissions','designing the user interface','managing the network cables','optimising the battery life'],
  answer:'login and access permissions', hint:'Login and permissions are OS security functions.',
  explanation:'The OS authenticates users at login, enforces file and folder access permissions, and protects system resources from unauthorised programs and users.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-088', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Virtual memory is a technique used by an OS when:',
  options:['RAM is full, so disk is used','the user wants a bigger screen','the computer has no hard disk','the CPU speed is far too low'],
  answer:'RAM is full, so disk is used', hint:'The hard disk extends RAM.',
  explanation:'When physical RAM is exhausted, the OS moves less-used pages of memory to a swap file on the hard disk, freeing RAM for other processes — at the cost of speed.' }));

// ── os_types: sav-089 to sav-096 ─────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-089', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'Microsoft Windows is an example of a:',
  options:['GUI operating system','command-line-only OS','web browser program','single application'],
  answer:'GUI operating system', hint:'Windows = GUI OS for PCs.',
  explanation:'Windows is a GUI-based OS that uses icons, windows, menus and a pointing device, designed for personal and business use on x86/x64 hardware.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-090', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'Linux is an operating system that is:',
  options:['open-source and freely modified','a closed-source commercial product','produced exclusively by Microsoft','available on Apple hardware only'],
  answer:'open-source and freely modified', hint:'Open source = freely available source code.',
  explanation:'Linux is open-source software released under licences that allow anyone to view, modify and distribute the source code; many server and Android systems run on Linux.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-091', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'macOS is the operating system developed by:',
  options:['Apple, for Mac computers','IBM, for large mainframes','Google, for Chromebooks','Microsoft, for all PCs'],
  answer:'Apple, for Mac computers', hint:'macOS = Mac Operating System by Apple.',
  explanation:'macOS is a proprietary OS developed by Apple that runs on their Mac hardware range; it is based on UNIX and has a distinct GUI.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-092', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'Android is a mobile operating system that is:',
  options:['built on the Linux kernel','used on laptop computers only','made for Apple iPhones only','a Microsoft desktop system'],
  answer:'built on the Linux kernel', hint:'Android runs on most non-Apple phones.',
  explanation:'Android is an open-source OS (based on Linux) developed by Google and widely used by smartphone manufacturers such as Samsung, OnePlus and Xiaomi.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-093', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'iOS is the operating system used by:',
  options:['Apple iPhones and iPads','Windows laptops and PCs','all Android smartphones','Google Chromebooks only'],
  answer:'Apple iPhones and iPads', hint:'iOS = iPhone OS.',
  explanation:'iOS (and iPadOS) is a proprietary operating system developed by Apple exclusively for iPhone and iPad devices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-094', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'A real-time operating system (RTOS) is designed to:',
  options:['meet strict timing deadlines','give the fastest internet speed','browse the web without delay','run video games without lag'],
  answer:'meet strict timing deadlines', hint:'Real-time = guaranteed response time.',
  explanation:'An RTOS guarantees that critical tasks complete within a defined time window; missing the deadline could cause system failure in safety-critical applications.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-095', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'A Command Line Interface (CLI) requires the user to:',
  options:['type commands as text','click on icons with a mouse','use touch screen gestures','speak the commands aloud'],
  answer:'type commands as text', hint:'Type the command, press Enter.',
  explanation:'A CLI (also called a terminal or console) accepts typed commands; it is faster for experienced users and uses fewer system resources than a GUI.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-096', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'A multi-user operating system allows:',
  options:['several users at the same time','one user to run many programs','many PCs to share a keyboard','one user, but many accounts'],
  answer:'several users at the same time', hint:'Multiple users at the same time.',
  explanation:'Multi-user OS designs (common on servers and mainframes) isolate each user\'s session so they can all work concurrently without interfering with each other.' }));

// ── utility_programs: sav-097 to sav-104 ─────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-097', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'Antivirus software is a utility program that:',
  options:['finds and removes malware','backs up data to a drive','compresses files on disk','speeds up web browsing'],
  answer:'finds and removes malware', hint:'Antivirus detects and removes malicious software.',
  explanation:'Antivirus software uses signature databases and heuristic analysis to detect viruses, trojans, spyware and other malware, then neutralises them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-098', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'A file compression utility (such as WinZip or 7-Zip) is used to:',
  options:['make files smaller on disk','encrypt files with a password','convert between file formats','back up files to a server'],
  answer:'make files smaller on disk', hint:'Compression makes files smaller.',
  explanation:'File compression algorithms (ZIP, RAR, 7z) reduce file size by encoding repeated data patterns more efficiently, saving storage and reducing download times.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-099', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'Disk cleanup is a utility that:',
  options:['deletes unnecessary files','formats and erases the disk','defragments the hard disk','backs up the whole disk'],
  answer:'deletes unnecessary files', hint:'Clean up junk files.',
  explanation:'Disk cleanup scans for and removes temporary files, system cache, emptied recycle bin contents and other redundant files to recover disk space.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-100', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'Backup software is a utility that:',
  options:['copies files to a safe place','scans the disk for viruses','connects the PC to the web','speeds up the processor'],
  answer:'copies files to a safe place', hint:'Backups are copies for disaster recovery.',
  explanation:'Backup software automates the process of copying data to an external drive, NAS or cloud, enabling recovery after hardware failure, ransomware or accidental deletion.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-101', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'A firewall utility monitors:',
  options:['the network traffic in and out','the battery level of a laptop','the number of programs open','the temperature of the CPU'],
  answer:'the network traffic in and out', hint:'A firewall is a traffic filter for the network.',
  explanation:'A software firewall inspects each packet of network data and allows or blocks it based on rules — for example, blocking unsolicited incoming connections.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-102', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'Screen-reader software is an accessibility utility that:',
  options:['speaks the on-screen text aloud','translates pages into languages','captures and saves screenshots','reads the hard disk for backup'],
  answer:'speaks the on-screen text aloud', hint:'For visually impaired computer users.',
  explanation:'Screen readers (e.g., JAWS, NVDA) narrate what is displayed on screen — text, menus, buttons — enabling visually impaired users to operate a computer without a monitor.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-103', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'A task manager utility allows users to:',
  options:['end unresponsive programs','configure network settings','schedule calendar entries','manage the email folders'],
  answer:'end unresponsive programs', hint:'Ctrl+Alt+Del → Task Manager on Windows.',
  explanation:'Task Manager shows all running processes, their CPU and memory usage, and allows users to force-quit programs that have stopped responding.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-104', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:2,
  question:'Encryption software protects data by:',
  options:['coding it so only a key reads it','deleting sensitive files for you','scanning the disk for viruses','making the files much smaller'],
  answer:'coding it so only a key reads it', hint:'Encrypted data is unreadable without the key.',
  explanation:'Encryption scrambles data using a mathematical algorithm; without the key, the ciphertext is meaningless — protecting confidentiality even if the device is stolen.' }));

// ══════════════════════════════════════════════════════════════════════
// COMPUTER SYSTEMS section: g9ict-sav-105 to g9ict-sav-117
// chapterId: 'g9ict-computer-systems'
// ══════════════════════════════════════════════════════════════════════

// ── input_devices: sav-105 to sav-107 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-105', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:2,
  question:'A scanner is an input device used to:',
  options:['digitise a printed document','display images on the screen','print documents on paper','store data permanently'],
  answer:'digitise a printed document', hint:'It digitises paper documents.',
  explanation:'A scanner reads a physical page using a light source and sensor array, converting it into a digital image or text file.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-106', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:2,
  question:'A microphone is an input device that:',
  options:['turns sound into signals','shows text on the screen','connects to the internet','plays audio from the PC'],
  answer:'turns sound into signals', hint:'Sound in → electrical signal → computer.',
  explanation:'A microphone is a transducer that converts the pressure variations of sound waves into electrical signals, enabling voice recording, VoIP and speech recognition.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-107', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:2,
  question:'A touch screen is an input device because:',
  options:['it senses where you touch','it stores the system files','it processes data itself','it displays the output'],
  answer:'it senses where you touch', hint:'It accepts finger/stylus input.',
  explanation:'A touch screen combines a display (output) with a touch-sensitive layer (input) that detects the position and gesture of touches, sending this data to the processor.' }));

// ── output_devices: sav-108 to sav-110 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-108', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
  question:'A projector is an output device used to:',
  options:['show images on a big screen','accept typed input from users','store very large video files','scan printed documents in'],
  answer:'show images on a big screen', hint:'It projects the screen image onto a larger surface.',
  explanation:'A projector receives a video signal from the computer and uses a light source and lens to project it onto a screen, enabling presentations to large groups.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-109', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
  question:'Speakers are output devices that:',
  options:['turn signals into sound','amplify the Wi-Fi signal','record surrounding sound','send audio over the web'],
  answer:'turn signals into sound', hint:'Electrical signal → sound.',
  explanation:'Speakers (and headphones) are transducers that convert the analogue audio signal from the sound card into vibrating air — sound.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-110', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
  question:'A 3D printer is an output device that:',
  options:['builds objects layer by layer','shows 3D images on a screen','scans objects into models','prints text on flat paper'],
  answer:'builds objects layer by layer', hint:'It prints in three dimensions.',
  explanation:'A 3D printer extrudes (or cures) material layer by layer according to a digital 3D model (STL file), creating physical objects from plastic, resin or other materials.' }));

// ── storage_devices: sav-111 to sav-113 ──────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-111', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
  question:'An SSD (Solid State Drive) compared to an HDD (Hard Disk Drive) is:',
  options:['faster, silent, no moving parts','identical in speed, but cheaper','only used for storing music','slower, louder and heavier'],
  answer:'faster, silent, no moving parts', hint:'No spinning parts = faster and quieter.',
  explanation:'SSDs use flash memory chips with no mechanical parts, giving faster read/write speeds, silent operation and greater resilience to physical shock compared to HDDs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-112', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
  question:'Cloud storage is a form of storage where data is:',
  options:['held on remote internet servers','held on a Blu-ray disc at home','held in the computer RAM','held on a USB drive only'],
  answer:'held on remote internet servers', hint:'Files in the cloud, not on your device.',
  explanation:'Cloud storage (Google Drive, OneDrive, Dropbox) saves files on provider-managed servers; users access them via the internet from any device.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-113', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
  question:'Optical storage media such as CDs and DVDs store data using:',
  options:['pits and lands read by laser','magnetic particles on platters','biological protein strands','flash memory chips inside'],
  answer:'pits and lands read by laser', hint:'A laser reads the pits and lands.',
  explanation:'Optical discs store data as physical variations (pits = binary 0, lands = binary 1) on a reflective surface; a laser detects these variations by measuring reflected light.' }));

// ── cpu_memory: sav-114 to sav-115 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-114', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
  question:'RAM (Random Access Memory) is:',
  options:['temporary volatile memory','permanent storage after power off','the arithmetic unit of the CPU','a type of input device'],
  answer:'temporary volatile memory', hint:'RAM = fast but temporary.',
  explanation:'RAM holds the OS, running applications and working data for the CPU to access instantly; it is volatile, meaning all data is lost on power loss.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-115', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
  question:'The CPU\'s clock speed is measured in:',
  options:['GHz (gigahertz)','Mbps (megabits/second)','GB (gigabytes)','W (watts)'],
  answer:'GHz (gigahertz)', hint:'Clock speed tells you how many cycles per second.',
  explanation:'Clock speed (in MHz or GHz) is the number of instruction cycles a CPU can perform per second; a higher clock speed generally means faster processing.' }));

// ── data_units: sav-116 to sav-117 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-116', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:2,
  question:'1 kilobyte (KB) is approximately equal to:',
  options:['1,024 bytes','1,000 bits','1,000,000 bytes','8 bytes'],
  answer:'1,024 bytes', hint:'Binary kilo = 2¹⁰ = 1024.',
  explanation:'In computing, 1 KB = 2¹⁰ bytes = 1,024 bytes (though some contexts use the decimal approximation of 1,000 bytes).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-117', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:2,
  question:'The smallest unit of data in a computer is a:',
  options:['bit','kilobyte','nibble','byte'],
  answer:'bit', hint:'bit = binary digit.',
  explanation:'A bit is the most fundamental unit of data: a single binary value, either 0 or 1. Eight bits make one byte.' }));

// ══════════════════════════════════════════════════════════════════════
// TROUBLESHOOTING section: g9ict-sav-118 to g9ict-sav-126
// chapterId: 'g9ict-troubleshooting'
// ══════════════════════════════════════════════════════════════════════

// ── troubleshooting_techniques: sav-118 to sav-122 ───────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-118', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
  question:'The first step in troubleshooting a computer problem is:',
  options:['identify what the problem is','reinstall the operating system','format the hard drive at once','call a technician right away'],
  answer:'identify what the problem is', hint:'Understand the problem first.',
  explanation:'Effective troubleshooting begins by gathering information: what are the symptoms, when did they start, what changed recently? Jumping straight to a solution wastes time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-119', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
  question:'"Try the simplest fix first" is a troubleshooting principle because:',
  options:['most causes are simple ones','hard solutions save the most time','complex fixes are always needed','simple fixes never ever work'],
  answer:'most causes are simple ones', hint:'Occam\'s razor — simplest explanation first.',
  explanation:'Statistics show that most user-reported issues are caused by simple oversights (unplugged cable, frozen process, low battery); checking simple fixes first saves time and reduces disruption.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-120', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
  question:'Restarting a computer often fixes minor software problems because:',
  options:['it clears RAM and reloads the OS','it updates all drivers for you','it deletes all temporary files','it reinstalls the whole system'],
  answer:'it clears RAM and reloads the OS', hint:'A fresh start clears memory and resets processes.',
  explanation:'Restarting flushes RAM, restarts system services and allows pending OS updates to apply, resolving many issues caused by memory leaks or frozen processes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-121', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
  question:'When a computer produces an error message, the user should:',
  options:['read and note the message','ignore it and carry on working','switch off at the wall socket','click OK as fast as possible'],
  answer:'read and note the message', hint:'Error messages contain diagnostic information.',
  explanation:'Error codes and messages identify the fault; noting them down allows the user or technician to search for the specific solution online or in documentation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-122', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
  question:'Checking cable connections is an important first step in troubleshooting hardware problems because:',
  options:['a loose cable is a common fault','no parts connect by cable now','cables never cause any faults','checking cables needs tools'],
  answer:'a loose cable is a common fault', hint:'Always check the physical connections first.',
  explanation:'Power cables, data cables and peripheral connections can come loose from vibration or movement; a disconnected cable is a quick and free fix that should always be checked first.' }));

// ── troubleshooting_steps: sav-123 to sav-126 ────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-123', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:2,
  question:'After identifying a possible solution to a computer problem, the next step is to:',
  options:['test one change at a time','replace the whole computer','change everything at once','declare it unsolvable'],
  answer:'test one change at a time', hint:'Test one change at a time.',
  explanation:'Making one change at a time and testing after each change reveals which fix actually solved the problem; making multiple changes simultaneously makes it impossible to know which worked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-124', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:2,
  question:'Documenting a troubleshooting process means:',
  options:['recording the steps and fix','writing a new system for it','backing up before you start','printing every screen seen'],
  answer:'recording the steps and fix', hint:'Write it down for future reference.',
  explanation:'Documentation creates a knowledge base; the next time the same fault occurs, the technician can consult the record rather than re-investigating from scratch.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-125', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:2,
  question:'If an internet connection stops working, a logical first troubleshooting step is:',
  options:['check the router and cables','reinstall the whole system','assume it cannot be fixed','buy a brand new router'],
  answer:'check the router and cables', hint:'Isolate whether the fault is the device, the router or the ISP.',
  explanation:'Checking another device determines whether the fault is with the specific computer or with the network infrastructure, narrowing the troubleshooting scope significantly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-sav-126', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:2,
  question:'Updating software and device drivers is a troubleshooting step that can resolve:',
  options:['compatibility bugs and crashes','a physically broken keyboard','power supply unit failures','a damaged network cable'],
  answer:'compatibility bugs and crashes', hint:'Updates fix bugs and compatibility problems.',
  explanation:'Software vendors release updates to patch bugs, improve compatibility with new hardware/OS versions and fix security vulnerabilities; updating often resolves mysterious crashes and errors.' }));

})();
