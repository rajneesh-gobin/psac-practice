'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — LEVEL 4 (applied) items, part 2 of 4: word processing,
//  spreadsheets, databases, presentation software.
//  IDs: g9ict-l4-101 … g9ict-l4-167.
//
//  ⚠ Read the header of l4_applied_systems.js first — it records what was
//    measured and why L4 in this pack means an applied scenario rather than
//    a harder definition.
//
//  ⚠ THE SOFTWARE CHAPTERS ARE WHERE A "HARD" QUESTION MOST EASILY TURNS
//    BACK INTO RECALL. "Which menu holds mail merge?" is L1 however unusual
//    the menu. Every item here puts the pupil in front of a document that is
//    already wrong, or a choice with a consequence, and asks what follows.
//
//  ⚠ Tables are drawn with the pack's own .q-table facsimile so they print
//    and work offline. No screenshots, no product logos.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// A spreadsheet facsimile: lettered columns, numbered rows, like the one in
// family_expansion.js. A fixed light plate with dark ink, because the practice
// screen forces a pale ink colour and an inheriting figure is invisible there.
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

// ── WORD PROCESSING — g9ict-l4-101 … 118 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-101', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:4,
  question:'A pupil lines up a two-column price list by pressing the space bar until the prices look aligned on screen. When the document is opened on the school computer the columns are ragged. Why?',
  options:['Spaces are a width that changes with the font, so alignment shifts',
           'The school computer uses a different paper size from her own one',
           'The file was damaged while it was being copied onto the flash drive',
           'Prices must always be typed into a table before they can be aligned'],
  answer:'Spaces are a width that changes with the font, so alignment shifts',
  hint:'Ask what the spaces are actually doing, and whether they mean the same thing in every font.',
  explanation:'A space is a character whose width depends on the font, so a column built out of spaces moves the moment the font or the machine changes; a tab stop or a table fixes the position instead. Nothing here indicates damage, and the paper size would not ripple the columns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-102', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:4,
  question:'A pupil emphasises a whole warning paragraph by typing it in capital letters. Her teacher asks her to use bold instead. What is the strongest reason?',
  options:['A block of capitals is slower to read because word shapes disappear',
           'Capital letters take up more ink than the same words in bold type',
           'A word processor cannot search for text that is typed in capitals',
           'Capitals are reserved by the software for headings and for titles'],
  answer:'A block of capitals is slower to read because word shapes disappear',
  hint:'Think about what your eye uses to recognise a word quickly when reading a long line.',
  explanation:'Readers recognise words partly by their outline, and capitals flatten every word into the same rectangle, so a long capitalised passage slows the reader down exactly where a warning needs to be clear. Search still works and there is no such reservation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-103', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:4,
  question:'A pupil starts each chapter of a report on a fresh page by pressing Enter until the cursor moves over. She then adds two paragraphs to chapter one. What happens, and what should she have used?',
  options:['Every later chapter heading shifts down the page; a page break fixes it',
           'The added paragraphs are deleted automatically to protect the layout',
           'The headings stay in place because Enter fixes them onto their page',
           'The document changes to landscape to make room for the new writing'],
  answer:'Every later chapter heading shifts down the page; a page break fixes it',
  hint:'Empty lines are ordinary text. What happens to ordinary text when text above it grows?',
  explanation:'Blank lines flow with the document, so adding text pushes every heading out of place, while a page break is an instruction that always starts the next page whatever comes before it. Nothing is deleted and the orientation does not change itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-104', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:4,
  question:'A results table has eleven columns and the last two fall off the right-hand edge of the printed page. Which single change is most likely to fit the whole table?',
  options:['Change the page orientation to landscape so the page is wider',
           'Change the font of the table to bold so the figures are clearer',
           'Change the paper size to A5 so the table is scaled down to fit',
           'Change the line spacing to single so the table takes less room'],
  answer:'Change the page orientation to landscape so the page is wider',
  hint:'The problem is horizontal. Which option changes the space available in that direction?',
  explanation:'Turning the page onto its side gives the wider measure a broad table needs, which is why landscape exists. Bold and line spacing change the vertical use of the page, and A5 is smaller than A4 in both directions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-105', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:4,
  question:'A pupil has formatted one heading exactly as she wants it and has twelve more headings to match. Which toolbar tool does the job with the least work and the least risk of a mismatch?',
  options:['The format painter, which copies the look of the text she selected',
           'The highlighter, which colours the background behind the headings',
           'The paste button, which puts the copied heading text into the page',
           'The font size box, which she sets to the same number each time now'],
  answer:'The format painter, which copies the look of the text she selected',
  hint:'She wants the APPEARANCE of one piece of text applied to another, not the text itself.',
  explanation:'The format painter carries every attribute of the source at once, so nothing is forgotten, whereas setting the size by hand repeats the work and misses the other attributes. Pasting would replace the wording of each heading with the first one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-106', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:4,
  question:'A document has stubborn gaps that will not close and a pupil cannot see what is causing them. Which toolbar tool lets her diagnose the problem?',
  options:['Show formatting marks, which reveals spaces, tabs and paragraph ends',
           'Print preview, which shows how each page of the document will print',
           'Word count, which reports how many words the document now contains',
           'Zoom, which makes the text on the screen larger and easier to read'],
  answer:'Show formatting marks, which reveals spaces, tabs and paragraph ends',
  hint:'The characters causing the gaps are invisible. Which tool stops them being invisible?',
  explanation:'Formatting marks display the paragraph marks, tabs and spaces that are producing the gaps, so the extra ones can be deleted; this is the standard way to debug a layout. Preview and zoom change how the same invisible characters are displayed, not whether they can be seen.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-107', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:4,
  question:'A photograph sits neatly beside a paragraph until the pupil adds a sentence above it, when the picture jumps to the next page. Which setting governs this behaviour?',
  options:['The text wrapping of the picture, which ties it to the text around it',
           'The resolution of the picture, which decides how sharp it appears',
           'The file format of the picture, which decides how large the file is',
           'The brightness of the picture, which is adjusted after it is inserted'],
  answer:'The text wrapping of the picture, which ties it to the text around it',
  hint:'The picture moved because the text moved. What property describes their relationship?',
  explanation:'Wrapping decides whether an image flows as if it were a character, floats beside the text or is anchored to a position, and that is what determines how it behaves when the text changes. Resolution, format and brightness affect how it looks, not where it goes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-108', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:4,
  question:'A four page report contains eight photographs straight from a camera and the file is 46 MB, too large to email. Which action reduces the size while keeping all eight pictures?',
  options:['Compress the pictures to the resolution the printed page needs',
           'Drag each picture to be smaller on the page than it is at present',
           'Crop each picture so that less of the original scene is showing',
           'Change the document font to one that produces a smaller file'],
  answer:'Compress the pictures to the resolution the printed page needs',
  hint:'Making a picture look smaller on the page is not the same as storing fewer dots.',
  explanation:'Compression discards detail beyond what the page can print, which is where almost all of those megabytes are; dragging a photograph smaller only scales the display and keeps every original pixel in the file. Cropping removes content, and fonts contribute almost nothing to the size.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-109', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:4,
  question:'A pupil has typed a club membership list with a tab between each name and each phone number, and now needs it in a bordered table. What is the efficient way to proceed?',
  options:['Use convert text to table, telling it that a tab separates the columns',
           'Draw an empty table and retype every name and number into the cells',
           'Draw an empty table and copy each name and number across one by one',
           'Add borders to the typed list so that it looks like a bordered table'],
  answer:'Use convert text to table, telling it that a tab separates the columns',
  hint:'The structure is already in the typing. What does the software need to be told to see it?',
  explanation:'The tab is already acting as a column separator, so the conversion tool can build the table in one step with no retyping and no transcription errors. Retyping or copying cell by cell repeats work the software can do, and borders on a tabbed list do not create real cells.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-110', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:4,
  question:'A table of 60 rows runs over three pages and the column headings appear only on the first, so the later pages are hard to read. Which table setting solves it?',
  options:['Repeat the header row, so the headings print at the top of each page',
           'Merge the header cells, so the headings form one wide single cell',
           'Shade the header row, so that the headings stand out from the data',
           'Sort the table by its first column, so the rows are put into order'],
  answer:'Repeat the header row, so the headings print at the top of each page',
  hint:'The headings exist and are in the right place. What is missing is on pages two and three.',
  explanation:'Marking the first row as a header row tells the word processor to reprint it wherever the table breaks across a page, which is exactly the reported fault. Merging, shading and sorting change the appearance or the order and leave pages two and three without headings.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-111', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:4,
  question:'Two pupils each edited a copy of the same report and now hold two files with different changes. Which feature identifies every difference so the two can be brought together?',
  options:['Compare documents, which lists every difference between two files',
           'Spell check, which finds the mistakes each of them typed in the text',
           'Save as, which stores both of the files under two different names',
           'Word count, which shows which of the two files has become longer'],
  answer:'Compare documents, which lists every difference between two files',
  hint:'The task is to find what is not the same. Which tool takes two files as its input?',
  explanation:'Compare reads both files and marks every insertion, deletion and change so a merge can be decided line by line. Spell check and word count each look at one file at a time and neither reports what the other pupil altered.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-112', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:4,
  question:'A pupil must copy fifteen separate paragraphs from an old report into a new one, checking each against its source. What working arrangement makes this least error-prone?',
  options:['View the two documents side by side and copy between the windows',
           'Print the old report and retype the fifteen paragraphs from paper',
           'Close each document and reopen the other between every paragraph',
           'Copy the whole old report into the new one and delete what is not'],
  answer:'View the two documents side by side and copy between the windows',
  hint:'The checking is the hard part. Which arrangement keeps both texts visible at the same moment?',
  explanation:'Side-by-side viewing keeps source and destination on screen together, so each paragraph can be checked as it arrives. Retyping introduces fresh errors, closing and reopening hides one text at the moment it is needed, and deleting from a full copy risks removing the wrong material.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-113', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:4,
  question:'A 40 page project uses 26 headings, each formatted by hand. The school now requires every heading to be dark blue instead of black. Which approach makes that a single operation in future?',
  options:['Apply a heading style to all of them, then change the style once',
           'Select all the text in the project and set its colour to dark blue',
           'Use find and replace to search for black text and replace it blue',
           'Retype each heading in dark blue and check them all at the end now'],
  answer:'Apply a heading style to all of them, then change the style once',
  hint:'The question asks what makes the NEXT change easy, not only this one.',
  explanation:'A style is a named definition the headings point to, so editing it updates all 26 at once and every future change as well. Selecting everything would recolour the body text too, and find and replace does not search by formatting in the way described.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-114', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:4,
  question:'A pupil asks the word processor to insert a table of contents and it reports that no entries were found, although the document clearly has eighteen headings. What is wrong?',
  options:['The headings were formatted by hand and carry no heading style',
           'The document is too long for a table of contents to be built for it',
           'A table of contents can only be inserted at the end of a document',
           'The headings must each be numbered before they can be collected'],
  answer:'The headings were formatted by hand and carry no heading style',
  hint:'Ask how the software decides that a line of text is a heading at all.',
  explanation:'The contents feature collects text carrying heading styles, so text that merely looks like a heading is invisible to it, and applying the styles makes all eighteen appear. Length, position and numbering are not conditions for building one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-115', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:4,
  question:'A school must send the same letter to 300 parents, each beginning with the name and address of that parent. The names already sit in a spreadsheet. What is the correct approach?',
  options:['A mail merge, with the letter as the main document and the sheet as data',
           'Type the letter once and then edit the name and address 300 times over',
           'Print 300 blank letters and write each name and address in by hand now',
           'Send one letter to every parent at once with all the names listed on it'],
  answer:'A mail merge, with the letter as the main document and the sheet as data',
  hint:'One fixed letter, 300 sets of details already stored. What joins those two things?',
  explanation:'Mail merge combines a single main document with a data source and produces one personalised copy per record, which is precisely this task. Editing by hand repeats the work 300 times, and a list of every name on one letter destroys the privacy of all of them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-116', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:4,
  question:'A merge is run and all 300 printed letters read Dear &lt;&lt;FirstName&gt;&gt; instead of the parent name. What has gone wrong?',
  options:['The merge was not completed, so the field names printed as they stand',
           'The data source holds no first names, so the field had nothing to use',
           'The printer cannot print the characters used to mark a merge field',
           'The letter was saved in the wrong format before it was sent to print'],
  answer:'The merge was not completed, so the field names printed as they stand',
  hint:'Every letter shows the same thing. Would a missing name in the data do that to all 300?',
  explanation:'What printed is the placeholder, which means the main document was printed rather than the merged output; finishing the merge replaces each field with a value. A data fault would affect only the records missing a name, not every one of them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-117', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:4,
  question:'A pupil adds two pages to chapter two of her report. The contents page still shows the old page numbers for every chapter after it. What should she do?',
  options:['Update the table of contents so it reads the document again',
           'Retype the correct page numbers into the table of contents now',
           'Delete the contents page because page numbers cannot be kept right',
           'Move the contents page to the end where the numbers will be right'],
  answer:'Update the table of contents so it reads the document again',
  hint:'The table was built from the document once. When does it look again?',
  explanation:'A table of contents is a field holding the result of the last build, so it is refreshed by updating rather than by typing over it; typed numbers would be wrong again after the next edit. Deleting or moving it does not renumber anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-118', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:4,
  question:'A numbered list of instructions is interrupted by an explanatory paragraph. After the paragraph the numbering starts again at 1, but the pupil needs it to go on from 6. What does she ask for?',
  options:['Continue numbering, so the list carries on from where it stopped',
           'Restart numbering, so that the second part of the list begins again',
           'Increase the indent, so the second part sits under the first part',
           'Change the number format, so the second part uses letters instead'],
  answer:'Continue numbering, so the list carries on from where it stopped',
  hint:'The software has treated the second block as a new list. What has to be undone?',
  explanation:'The paragraph broke the list in two and the software began a fresh one, so telling the second block to continue restores a single sequence. Restarting is the state she is already in, and indenting or changing the format alters the look without fixing the count.' }));

// ── SPREADSHEETS — g9ict-l4-119 … 129 ─────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-119', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:4,
  question:'A pupil types <b>B2+B3</b> into cell B4 and the cell shows the letters B2+B3 rather than a number. What is missing, and why does that matter?',
  options:['The equals sign, without which the entry is stored as ordinary text',
           'The brackets, without which the spreadsheet cannot work out an order',
           'The SUM function, without which two cells cannot be added together',
           'The cell formatting, without which a number cannot be shown at all'],
  answer:'The equals sign, without which the entry is stored as ordinary text',
  hint:'Ask how the spreadsheet decides whether you have typed a calculation or a label.',
  explanation:'The leading equals sign is what marks an entry as a formula; without it the characters are stored as a label and no calculation happens. Brackets are unnecessary for a single addition and SUM is one way of adding rather than the only one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-120', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:4,
  question:'Cell B7 holds <b>=B2+B3+B4+B5+B6</b>. A new row is inserted to become row 6, and a figure is typed into it. The total does not change. Why, and what should have been used?',
  options:['The named cells do not include the new row; a range such as B2:B6 would',
           'The new row was typed as text; a number formatted cell would be added',
           'The total must be recalculated by hand after any row is inserted at all',
           'The inserted row is below the total, so it is outside the printed sheet'],
  answer:'The named cells do not include the new row; a range such as B2:B6 would',
  hint:'Write out what the formula says after the insertion, cell by cell.',
  explanation:'A formula listing individual cells keeps referring to those cells, so an inserted row is simply not mentioned, whereas a range expands when a row is inserted inside it. Recalculation is automatic; the arithmetic was right and the list of cells was not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-121', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:4,
  question:'A class list holds names in column A and marks in column B. A pupil selects column B alone and sorts it from largest to smallest. What has happened to the data?'
    + sheet(['Name', 'Mark'], [['Name', 'Mark'], ['Anaya', 62], ['Bilal', 48], ['Chan', 75], ['Divya', 55]]),
  options:['The marks are now beside the wrong names, and the list is worthless',
           'The names moved with their marks, so the list is correctly ordered',
           'The sort was refused because a single column cannot be sorted alone',
           'Only the first row moved, so a single correction will repair the list'],
  answer:'The marks are now beside the wrong names, and the list is worthless',
  hint:'The names were not part of the selection. Did anything move them?',
  explanation:'Sorting one column rearranges only that column, so each mark is now next to whichever name happened to be on that row, and the association between them is destroyed. Selecting the whole table, or using the sort dialogue with headers, keeps each record together.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-122', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:4,
  question:'A sheet of 200 sales rows has a total at the bottom using SUM. A filter is applied so that only the 12 rows for Rodrigues are visible, but the total still shows the figure for all 200 rows. Why?',
  options:['SUM adds every cell in its range, whether a row is hidden or not',
           'The filter has not been applied, because a total was in the way',
           'SUM reads only the rows above it, and the filter moved some away',
           'The total must be deleted and retyped each time a filter is used'],
  answer:'SUM adds every cell in its range, whether a row is hidden or not',
  hint:'Hiding a row changes what you can see. Does it change what is in the cell?',
  explanation:'Filtering hides rows without removing their values, and SUM works on the range rather than on what is visible, so the answer does not move; SUBTOTAL is the function that ignores hidden rows. Believing a total follows the filter is the misconception this catches.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-123', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:4,
  question:'After sorting a table alphabetically, a pupil finds the word Name sitting in the middle of the list of pupils instead of at the top. What went wrong?',
  options:['The header row was included in the sort and treated as ordinary data',
           'The header row was formatted in bold and bold text sorts differently',
           'The header row must always be deleted before a table can be sorted',
           'The header row was in the wrong column and moved to find its place'],
  answer:'The header row was included in the sort and treated as ordinary data',
  hint:'The word Name was sorted along with the names. What does that say about the selection?',
  explanation:'Unless the sort is told the first row holds headings, that row is just another record and is filed under N like any other word. Bold has no effect on sort order, and headers are declared rather than deleted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-124', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:4,
  question:'A teacher has a sheet with columns for Form, Mark and House and wants to see only pupils in Form 9 who scored below 40. What is the quickest way to produce that list?',
  options:['Filter on two columns at once, by form and by mark below forty',
           'Sort the sheet by mark and read down until the marks reach forty',
           'Sort the sheet by form and then count the rows that belong to it',
           'Delete every row that is not Form 9, then look at what is left now'],
  answer:'Filter on two columns at once, by form and by mark below forty',
  hint:'Two conditions must hold at the same time. Which tool applies conditions rather than order?',
  explanation:'Filters combine conditions across columns and leave the data intact, so the answer appears in one step and the sheet can be restored afterwards. Sorting orders rows without removing any, and deleting rows destroys data that will be needed again.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-125', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:4,
  question:'A teacher wants every mark below 40 to turn red automatically, including marks she has not yet typed in. Which feature does that?',
  options:['Conditional formatting, which applies a rule to the cells in a range',
           'Cell shading, which colours the cells the teacher selects by hand',
           'A filter, which hides the rows whose mark is at or above the pass',
           'A chart, which shows the low marks as shorter bars on the diagram'],
  answer:'Conditional formatting, which applies a rule to the cells in a range',
  hint:'The requirement includes marks that do not exist yet. Which option is a rule rather than an action?',
  explanation:'Conditional formatting stores a rule against the range, so it is tested whenever a value is entered or changed, including future entries. Shading applied by hand is fixed, a filter hides rows rather than colouring them, and a chart does not alter the sheet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-126', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:4,
  question:'A pupil must show how the 240 pupils of a school are divided between four houses, so that the share of each house is obvious at a glance. Which chart type suits the purpose?',
  options:['A pie chart, because the four parts together make up one whole school',
           'A line graph, because it joins the four values into a single clear line',
           'A scatter graph, because it plots each of the four houses as a point',
           'A radar chart, because it puts the four houses on four separate axes'],
  answer:'A pie chart, because the four parts together make up one whole school',
  hint:'Ask what relationship between the numbers the reader is meant to see.',
  explanation:'A pie chart shows parts of a single whole, which is exactly what four houses out of one school are. A line graph implies a sequence such as time, and scatter and radar charts answer questions about relationships rather than shares.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-127', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:4,
  question:'A geography project records the rainfall at Vacoas for each of the twelve months and must show how it rises and falls through the year. Which chart makes that pattern clearest?',
  options:['A line graph, because it shows the trend across the twelve months',
           'A pie chart, because it shows how much rain fell in each of them',
           'A doughnut chart, because it can hold twelve segments comfortably',
           'A pictogram, because a symbol can stand for each millimetre of it'],
  answer:'A line graph, because it shows the trend across the twelve months',
  hint:'The word that matters is the pattern over time, not the size of each month on its own.',
  explanation:'A line graph puts an ordered variable along the horizontal axis and makes rises, falls and seasons visible as a shape. A pie or doughnut chart treats the months as unordered shares, which hides the very pattern the project is about.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-128', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:4,
  question:'A pupil makes a pie chart of how pupils travel to school. Bus 60%, walk 35%, car 20%, bicycle 15%. The chart looks wrong to her teacher. What is the underlying fault?',
  options:['The values add to more than 100%, so they are not parts of one whole',
           'A pie chart can show at most three segments before it becomes unclear',
           'The percentages should have been entered into the sheet as decimals',
           'The segments were not sorted from the largest down to the smallest'],
  answer:'The values add to more than 100%, so they are not parts of one whole',
  hint:'Add the four figures up before you look at the picture at all.',
  explanation:'The four percentages total 130, which means pupils were counted in more than one category, and a pie chart cannot represent that honestly; a bar chart of the separate responses can. The fault is in the data, not in the number, format or order of the segments.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-129', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:4,
  question:'Two bar charts show the same three sales figures of Rs 96,000, Rs 98,000 and Rs 100,000. In one chart the bars look almost equal and in the other the last bar looks three times the first. What explains the difference?',
  options:['One chart has a vertical axis that does not begin at zero',
           'One chart was drawn from a different column of the sheet',
           'One chart uses a bar width that is wider than the other one',
           'One chart has been printed at a larger size than the other'],
  answer:'One chart has a vertical axis that does not begin at zero',
  hint:'The numbers are identical in both. So the difference is in how the scale was drawn.',
  explanation:'Starting the axis at 95,000 rather than zero magnifies small differences and can make a 4% gap look like a threefold one, which is a standard way of misleading with a chart. Width and print size scale everything equally and change no comparison.' }));

// ── DATABASES — g9ict-l4-130 … 147 ────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-130', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:4,
  question:'A school database needs a primary key for its pupil table. Three pupils are called Ravi Appadoo and two share a birthday. Which field can serve as the primary key?',
  options:['The admission number, which the school issues once and never repeats',
           'The full name, which is printed on every document the pupil receives',
           'The date of birth, which is recorded on the certificate of every pupil',
           'The form class, which is known for every pupil in the whole school'],
  answer:'The admission number, which the school issues once and never repeats',
  hint:'The question has already told you which fields repeat. What is left?',
  explanation:'A primary key must be unique for every record, and only the admission number is guaranteed to be; the question supplies counter-examples for names and birthdays, and a whole class shares a form. Being known for everyone is not the same as being different for everyone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-131', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:4,
  question:'A library keeps one table holding the name, address and phone number of the borrower beside every loan. A borrower with 30 loans moves house. What problem does the design create?',
  options:['The address must be corrected in 30 places or the data disagrees',
           'The loans of that borrower will all be deleted when she moves out',
           'The table will run out of space because addresses are long fields',
           'The borrower will be unable to borrow again until she is re-entered'],
  answer:'The address must be corrected in 30 places or the data disagrees',
  hint:'Count how many copies of her address the design is storing.',
  explanation:'Repeating borrower details on every loan is data redundancy, and its cost is exactly this: one change has to be made everywhere or the database holds two different answers to one question. Splitting borrowers and loans into related tables stores the address once.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-132', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:4,
  question:'A clinic database has a Patients table and an Appointments table. Each appointment stores the patient number. What is that field called in the Appointments table, and what does it achieve?',
  options:['A foreign key, which links each appointment to one patient record',
           'A primary key, which makes every appointment unique in its table',
           'An index field, which makes the appointment list faster to search',
           'A validation rule, which checks the number before it is accepted'],
  answer:'A foreign key, which links each appointment to one patient record',
  hint:'The field holds the key of a DIFFERENT table. That is what names it.',
  explanation:'A foreign key is a field holding the primary key of another table, and it is what creates the relationship between them. The appointment table will have its own primary key as well, and indexes and validation rules do different jobs entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-133', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:4,
  question:'A shop database is being designed for products and suppliers, where one supplier provides many products. How should this be stored?',
  options:['Two tables, with each product holding the code of its supplier',
           'One table, repeating the supplier details on each product row',
           'Two tables with no link, searched separately when one is needed',
           'One table for each supplier, created as new suppliers are added'],
  answer:'Two tables, with each product holding the code of its supplier',
  hint:'One supplier, many products. Where should the supplier details be stored so they appear once?',
  explanation:'A one-to-many relationship is stored as two tables joined by a key, which keeps each supplier record in one place and lets any number of products point to it. Repeating details duplicates data, unlinked tables cannot answer questions spanning both, and a table per supplier makes the design grow with the data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-134', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:4,
  question:'A phone number field is set to the number data type. Numbers beginning with a zero lose that zero as soon as they are saved. What is the correct field type and why?',
  options:['Text, because a phone number is a label that is never calculated with',
           'Currency, because it keeps every digit that is typed into the field',
           'Number, with a setting that adds the missing zero back when printed',
           'Date, because a phone number has a fixed length just as a date does'],
  answer:'Text, because a phone number is a label that is never calculated with',
  hint:'Ask whether anyone would ever add two phone numbers together.',
  explanation:'A number type drops leading zeros because they carry no numeric value, and since phone numbers are identifiers rather than quantities the text type is correct and preserves every digit. Currency and date are numeric types with the same problem.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-135', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:4,
  question:'A database records marks out of 100 and a clerk has typed 650 into one record by mistake. Which feature would have prevented the entry at the moment it was made?',
  options:['A validation rule allowing only values between zero and one hundred',
           'A primary key making sure that each mark record is a unique one',
           'A default value putting a nought into the field before typing starts',
           'A report listing every mark so that outliers can be found afterwards'],
  answer:'A validation rule allowing only values between zero and one hundred',
  hint:'The requirement is to stop it being typed, not to find it later.',
  explanation:'A validation rule tests each entry against a condition and refuses what cannot be true, which is prevention at the point of entry. A report finds the error after it is stored, a default only supplies a starting value, and a key controls uniqueness rather than range.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-136', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:4,
  question:'A designer sets every text field in a table to 255 characters, including a field that holds only M or F. What is the argument against that?',
  options:['An oversized field wastes space and accepts entries that are invalid',
           'A field of 255 characters cannot be searched by a query at all',
           'A field of 255 characters must be filled completely before saving',
           'An oversized field prevents the table from having a primary key'],
  answer:'An oversized field wastes space and accepts entries that are invalid',
  hint:'Two consequences, one about storage and one about what a careless typist can get away with.',
  explanation:'Field size is itself a form of validation: a one-character field cannot hold Male, Femail or a stray sentence, and it stores less. The other three statements are simply untrue of a large text field.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-137', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:4,
  question:'Dates of birth were entered into a text field. A query for everyone born before 2010 returns nonsense. Why does storing a date as text cause this?',
  options:['Text is compared character by character, so it does not order by date',
           'Text fields cannot be included in a query with a condition at all',
           'Text fields hold only the first four characters of anything entered',
           'Text is stored in the order it was typed, so it cannot be searched'],
  answer:'Text is compared character by character, so it does not order by date',
  hint:'Think how 09/03/2011 and 10/12/2008 compare if you read them as strings from the left.',
  explanation:'A text comparison works left to right on characters, so 09 sorts before 10 regardless of the year that follows, while a date field stores a value the software can order and calculate with. Text fields can certainly be queried; the trouble is that the answer is wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-138', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:4,
  question:'A district is entered as Riviere du Rempart, Riv du Rempart and R. du Rempart by three different clerks. A query for one district then misses records. Which measure prevents this?',
  options:['A drop-down list, so the district is chosen instead of being typed',
           'A spell check, so that each clerk is warned about a wrong spelling',
           'A wider field, so that the full district name always fits in the cell',
           'A sort by district, so the different spellings appear next to another'],
  answer:'A drop-down list, so the district is chosen instead of being typed',
  hint:'The cause is that free typing allows three answers to mean one thing. Remove the typing.',
  explanation:'Choosing from a fixed list makes one value the only value, which is why lookup lists are standard for any field with known options. A spell check does not know these are the same place, and neither field width nor sorting stops the variants being created.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-139', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:4,
  question:'A clerk types a valid but incorrect admission number, 3456 instead of 3465. Every validation rule accepts it. Which check is designed to catch this kind of mistake?',
  options:['Verification, such as entering the number twice and comparing them',
           'Validation, such as checking the number has exactly four digits in it',
           'A default value, such as the last admission number that was entered',
           'An index, such as one that puts the admission numbers into order'],
  answer:'Verification, such as entering the number twice and comparing them',
  hint:'The value is possible; it is just not the right one. What kind of check tests against the source?',
  explanation:'Validation asks whether data is reasonable, while verification asks whether it matches what was intended, and only verification catches a plausible typing error such as transposed digits. Defaults and indexes do not check anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-140', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:4,
  question:'A form asks for a National Identity Card number that must be a letter followed by twelve digits. Which feature guides the typist into that exact shape as they type?',
  options:['An input mask, which fixes the pattern the entry has to follow',
           'A field caption, which tells the typist what the field is called',
           'A default value, which fills the field with a suggested entry',
           'A required setting, which prevents the field being left empty'],
  answer:'An input mask, which fixes the pattern the entry has to follow',
  hint:'The requirement is about the SHAPE of the entry, character by character.',
  explanation:'An input mask enforces a pattern position by position as the user types, which is why it is used for identity numbers, dates and phone numbers. A caption labels the field, a default supplies a value, and a required setting only insists that something is entered.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-141', chapterId:'g9ict-databases', subsection:'data_entry', difficulty:4,
  question:'A shop database has no validation on its price field, and one product is saved with a price of minus 250 rupees. What does this example show about validation?',
  options:['A field will accept anything its type allows unless a rule forbids it',
           'A price field is always protected because money cannot be negative',
           'The database will correct a negative price the next time it is opened',
           'Validation is only needed for text fields and never for numeric ones'],
  answer:'A field will accept anything its type allows unless a rule forbids it',
  hint:'Ask what the database knows about prices if nobody has told it anything.',
  explanation:'A numeric field accepts negative numbers because negative numbers are valid numbers; the meaning of the field is known to people and not to the software until a rule expresses it. Nothing corrects itself, and numeric fields need validation as much as text ones.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-142', chapterId:'g9ict-databases', subsection:'queries', difficulty:4,
  question:'A librarian wants books that are both published after 2015 and currently on loan. In a query grid, how should the two conditions be placed?',
  options:['Both on the same criteria row, so a record must satisfy the two',
           'On two separate criteria rows, so either condition is enough',
           'In two separate queries that are then printed one after the other',
           'In the sort row, so that the results are ordered by year and loan'],
  answer:'Both on the same criteria row, so a record must satisfy the two',
  hint:'In a query grid, the row a condition sits on is what decides AND from OR.',
  explanation:'Conditions on one criteria row are combined with AND, so only records meeting both are returned, while conditions on different rows are combined with OR. The sort row controls order and answers nothing about which records appear.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-143', chapterId:'g9ict-databases', subsection:'queries', difficulty:4,
  question:'A clerk must find every member whose surname begins with Ram but cannot recall how each one ends. Which criterion finds them all?',
  options:['Like "Ram*", which matches any surname starting with those letters',
           'Equal to "Ram", which matches the surname Ram and nothing else',
           'Between "Ram" and "Ran", which matches the words lying in between',
           'Not equal to "Ram", which matches every surname that is not Ram'],
  answer:'Like "Ram*", which matches any surname starting with those letters',
  hint:'Part of the value is known and the rest is not. Which criterion allows for the unknown part?',
  explanation:'A wildcard stands for any sequence of characters, so Like with a trailing star returns Ramdin, Ramsamy and Ramgoolam alike. An exact match returns only the literal word, and a negation returns the opposite of what is wanted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-144', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:4,
  question:'A clerk enters 200 new members. The administrator insists she uses a form rather than typing directly into the table. What is the strongest reason?',
  options:['A form shows one record at a time and can validate as she types',
           'A form saves the records more quickly than a table is able to',
           'A form stores the records in a separate file from the table itself',
           'A form is the only way that a new record can be added to a table'],
  answer:'A form shows one record at a time and can validate as she types',
  hint:'Think about what the clerk can see at the moment of typing, and what can check her.',
  explanation:'A form presents a single record with labelled fields and can enforce rules and lists at the point of entry, which reduces mistakes on a long data entry job. A form is a view onto the same table, stores nothing separately and is not the only route in.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-145', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:4,
  question:'The head of a clinic wants a printed sheet each Monday showing appointments grouped by doctor, with a count for each doctor. Which database object produces this?',
  options:['A report, which is designed for printed output with groups and totals',
           'A form, which is designed for entering and editing one record at a time',
           'A table, which is where the appointment records are actually stored now',
           'A query, which selects the records but has no grouping or totals at all'],
  answer:'A report, which is designed for printed output with groups and totals',
  hint:'Three words in the request point at one object: printed, grouped, and counted.',
  explanation:'Reports exist to present selected data for printing, with grouping, sorting and summary calculations such as counts. A query would choose the records that feed the report, a form is for entry on screen, and a printed table has neither groups nor totals.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-146', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:4,
  question:'A report of 400 members prints in the order the records were entered, which nobody can use. Where should the ordering be set so it survives every future printing?',
  options:['In the report itself, which stores how its records are to be sorted',
           'By sorting the table by hand each time before the report is printed',
           'By retyping the members into the table in alphabetical order again',
           'In the printer settings, which decide the order the pages come out'],
  answer:'In the report itself, which stores how its records are to be sorted',
  hint:'The requirement is that it stays fixed. Which option is stored with the object rather than repeated?',
  explanation:'A report holds its own sorting and grouping definition, so the order is applied every time it runs regardless of how the table happens to be arranged. Sorting by hand must be remembered each time, retyping wastes work and is undone by the next new member, and printers do not reorder records.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-147', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:4,
  question:'A form is built for entering exam results and includes the name and photograph of the pupil, taken from the Pupils table. Why is that better than typing the name onto the results form?',
  options:['The name comes from one stored record, so it cannot be spelt two ways',
           'The name will print more clearly on the form than a typed name would',
           'The name takes up less space on the disk when it is shown on a form',
           'The name can then be edited on the form without changing the pupil'],
  answer:'The name comes from one stored record, so it cannot be spelt two ways',
  hint:'The point is about where the value lives, not about how it looks.',
  explanation:'Displaying a related field means the name is stored once and shown wherever it is needed, which removes both the retyping and the chance of two spellings. The appearance and the disk space are unaffected, and being able to edit it independently would be the defect rather than the benefit.' }));

// ── PRESENTATION — g9ict-l4-148 … 167 ─────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-148', chapterId:'g9ict-presentation', subsection:'charts_tables', difficulty:4,
  question:'A presentation must show six sales figures that the audience will be asked to compare, and the figures are still being corrected in a spreadsheet the day before. What should be put on the slide?',
  options:['A chart linked to the spreadsheet, so corrections appear on the slide',
           'A photograph of the spreadsheet taken with a phone on the last day',
           'A list of the six figures typed onto the slide by hand this evening',
           'A copy of the whole spreadsheet pasted onto the slide as it stands'],
  answer:'A chart linked to the spreadsheet, so corrections appear on the slide',
  hint:'Two requirements: the audience must compare the figures, and the figures are still changing.',
  explanation:'A linked chart both makes the comparison visual and updates when the source changes, which answers both halves of the problem. A photograph and typed figures freeze the old numbers, and a whole spreadsheet on a slide is unreadable from the back of a room.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-149', chapterId:'g9ict-presentation', subsection:'charts_tables', difficulty:4,
  question:'An audience must read off the exact rainfall for each of three districts and write the figures down. Which is the better slide, a table or a chart, and why?',
  options:['A table, because exact values are read directly from the figures',
           'A chart, because a picture is always clearer than a set of numbers',
           'A chart, because the audience can estimate each value from the bars',
           'A table, because a table can hold more decimal places than a chart'],
  answer:'A table, because exact values are read directly from the figures',
  hint:'The audience has to WRITE THE NUMBERS DOWN. Which form gives them the number itself?',
  explanation:'A chart is for seeing a pattern and a table is for reading a value, and this audience needs the value. Estimating from a bar introduces error, and the decimal-places answer misses that the difference is about exact reading rather than capacity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-150', chapterId:'g9ict-presentation', subsection:'animations', difficulty:4,
  question:'A pupil animates every bullet, title and picture on all twenty slides with spinning and bouncing effects. Her teacher says the presentation is now harder to follow. Why?',
  options:['Constant movement competes with the speaker for the attention',
           'Animations make the file too large to open on the hall computer',
           'Animated text cannot be read by the audience while it is moving',
           'Animations must be set on the slide master or they will not play'],
  answer:'Constant movement competes with the speaker for the attention',
  hint:'The complaint is about following the talk, not about the file or the software.',
  explanation:'The eye is drawn to movement, so animation used everywhere pulls attention away from what is being said and from the point being made; used sparingly it directs attention instead. The file size and master points are not what makes a talk hard to follow.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-151', chapterId:'g9ict-presentation', subsection:'animations', difficulty:4,
  question:'A teacher wants four points to appear one at a time so the class discusses each before seeing the next. Which animation setting achieves that?',
  options:['Start each point on a click, so the speaker controls when it shows',
           'Start each point automatically after two seconds have gone by',
           'Start all four points together when the slide first appears now',
           'Start each point when the mouse pointer passes over the text box'],
  answer:'Start each point on a click, so the speaker controls when it shows',
  hint:'The length of a discussion is not known in advance. Who must decide when the next point appears?',
  explanation:'Advancing on a click hands the timing to the speaker, which is what a discussion of unknown length requires. A fixed delay interrupts the discussion, showing all four defeats the purpose, and hover triggers fire accidentally as the pointer crosses the slide.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-152', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:4,
  question:'A speaker needs prompts for herself that the audience must not see, while the projector shows the slides. Which feature is designed for this?',
  options:['Speaker notes, shown on her own screen in presenter view only',
           'A text box in a small font placed at the bottom of each slide',
           'A comment attached to each slide and left open while she talks',
           'A second copy of the presentation with the prompts added to it'],
  answer:'Speaker notes, shown on her own screen in presenter view only',
  hint:'The requirement is that two screens show different things at the same time.',
  explanation:'Notes are attached to each slide and appear only in presenter view, which is exactly the separation asked for. A small font is still projected, an open comment is visible on the shared screen, and maintaining two copies invites showing the wrong one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-153', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:4,
  question:'Thirty pupils each need a paper copy of a 24 slide presentation to annotate during the talk, and the school wants to use as little paper as possible. What should be printed?',
  options:['Handouts with six slides to a page, leaving room to write beside them',
           'Full page slides, so that each slide is as large as it can be printed',
           'The outline view only, which prints the text without any of the slides',
           'The notes pages, which print each slide with the speaker prompts too'],
  answer:'Handouts with six slides to a page, leaving room to write beside them',
  hint:'Two requirements pull against each other: space to write, and few pages.',
  explanation:'The handout layout puts several slides on a page with space for notes, which meets both requirements at four pages instead of 24. Full pages and notes pages use far more paper, and the outline drops the pictures the talk depends on.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-154', chapterId:'g9ict-presentation', subsection:'print_preview', difficulty:4,
  question:'A pupil is about to print 30 handouts of a presentation with a dark blue background and white text. What will print preview show her, and what should she change?',
  options:['Heavy ink use and pale text, so she prints in a plain light layout',
           'The slides in the wrong order, so she reorders them before printing',
           'A missing font, so she installs the correct font before she prints',
           'The number of copies, so she reduces it to save paper in the lab'],
  answer:'Heavy ink use and pale text, so she prints in a plain light layout',
  hint:'Ask what happens to white text when the dark background behind it is printed.',
  explanation:'A design made for a projector prints as a solid block of ink with text that can disappear, which preview reveals before 30 copies are wasted; printing in greyscale or a light layout fixes it. Preview does not reorder slides or install fonts.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-155', chapterId:'g9ict-presentation', subsection:'print_preview', difficulty:4,
  question:'Print preview shows that the last slide of a presentation has spilled onto a page of its own containing one line. What is the appropriate response?',
  options:['Adjust the layout or slides per page before any copies are printed',
           'Print it anyway, because preview is only a guide to what will happen',
           'Print it and remove the extra page from each copy by hand afterwards',
           'Ignore it, because a single line on a page does not use up any ink'],
  answer:'Adjust the layout or slides per page before any copies are printed',
  hint:'The whole purpose of looking first is to be able to act before the paper is used.',
  explanation:'Preview exists so that layout faults are corrected while correcting them is free; adjusting the handout layout removes the stray page from every copy at once. Printing and then fixing by hand multiplies the work by the number of copies.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-156', chapterId:'g9ict-presentation', subsection:'design_templates', difficulty:4,
  question:'A group presentation is assembled from slides made by five pupils, each with different fonts, colours and backgrounds. Why is applying one design template the right fix?',
  options:['A consistent design stops the changes distracting from the content',
           'A template reduces the size of the file by removing extra colours',
           'A template is required before a presentation can be shown at all',
           'A consistent design makes the presentation run faster on a laptop'],
  answer:'A consistent design stops the changes distracting from the content',
  hint:'What does the audience notice every time a slide changes style?',
  explanation:'Consistency lets the audience stop re-reading the design and attend to the argument, which is the purpose of a template; a jump in style at every slide signals a change of topic that is not there. File size and speed are not affected in any meaningful way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-157', chapterId:'g9ict-presentation', subsection:'design_templates', difficulty:4,
  question:'A school wants every department presentation to carry the same colours, fonts and title layout, with no work for each teacher. What should the ICT teacher prepare?',
  options:['A template file that every teacher starts a new presentation from',
           'A printed sheet telling each teacher which colours they should use',
           'One presentation that every teacher adds their own slides on to',
           'A folder of finished slides that teachers copy and then edit later'],
  answer:'A template file that every teacher starts a new presentation from',
  hint:'The condition is no work for each teacher. Which option makes the right answer the default one?',
  explanation:'A template carries the design into every new file, so consistency is what happens by default rather than something each teacher has to reproduce. A printed instruction sheet relies on care and memory, and a single shared file or a folder of slides creates version and ownership problems.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-158', chapterId:'g9ict-presentation', subsection:'slide_masters', difficulty:4,
  question:'A 40 slide presentation carries the school badge on every slide, and the school has just changed its badge. Which approach replaces it everywhere in one operation?',
  options:['Replace the badge on the slide master that all the slides follow',
           'Replace the badge on slide one and then copy that slide 39 times',
           'Replace the badge on each slide in turn, checking the position of it',
           'Delete the badge from all the slides and add it back on the first one'],
  answer:'Replace the badge on the slide master that all the slides follow',
  hint:'Something in the file defines what every slide has in common. Change that.',
  explanation:'The slide master holds elements shared by all slides, so changing it once propagates everywhere and keeps the position identical. Editing 40 slides by hand invites a missed slide and a drifting position, and copying slide one would destroy the content of the others.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-159', chapterId:'g9ict-presentation', subsection:'slide_masters', difficulty:4,
  question:'A presenter finds the body font too small at the back of the hall and wants every slide changed, including slides she has not written yet. Where should the change be made?',
  options:['On the slide master, so present and future slides both follow it',
           'On each slide in turn, selecting the text and enlarging the font',
           'In the print settings, so the text is scaled up before it is shown',
           'On the first slide, since the later slides copy their font from it'],
  answer:'On the slide master, so present and future slides both follow it',
  hint:'Slides that do not exist yet cannot be edited. What will they inherit from?',
  explanation:'A master defines the formatting that new slides inherit, so editing it is the only option that covers slides not yet created. Editing slide by slide leaves future slides small, print settings do not change a projected talk, and slides do not copy from slide one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-160', chapterId:'g9ict-presentation', subsection:'animated_clips', difficulty:4,
  question:'A pupil adds a looping animated clip of a waving cartoon to the corner of every slide in a talk on road safety. What is the objection to it?',
  options:['A clip that never stops moving distracts from a serious message',
           'An animated clip cannot be shown by a projector in a large hall',
           'An animated clip will always stop playing when the slide changes',
           'An animated clip has to be saved in the same folder as the slides'],
  answer:'A clip that never stops moving distracts from a serious message',
  hint:'Judge it by the subject of the talk and by what the eye keeps returning to.',
  explanation:'Continuous motion holds attention regardless of relevance, and on a serious subject it works against both the message and the speaker; a clip earns its place when it illustrates something. Projectors show animated clips perfectly well.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-161', chapterId:'g9ict-presentation', subsection:'video_enhancement', difficulty:4,
  question:'A presentation plays a video perfectly on the laptop it was made on. Copied to the hall computer with only the presentation file, the video will not play. What is the most likely cause?',
  options:['The video was linked to a file that was left on the first computer',
           'The hall computer has a screen too small to display a video clip',
           'The video was embedded, and embedded video plays on one machine',
           'The presentation was saved while the video was still being played'],
  answer:'The video was linked to a file that was left on the first computer',
  hint:'Only one file was carried across. What does a link point at when the thing it points to is elsewhere?',
  explanation:'A linked video stores only a path, so moving the presentation without the video file breaks it, while embedding copies the video into the presentation and travels with it. Screen size does not stop playback and saving during playback is harmless.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-162', chapterId:'g9ict-presentation', subsection:'video_enhancement', difficulty:4,
  question:'A six minute video contains 40 seconds that matter to the argument, and the talk is allowed ten minutes in total. What is the professional way to use it?',
  options:['Trim the clip so only the 40 seconds that matter are played',
           'Play the whole video and talk over the parts that do not matter',
           'Play the video at double speed so that it takes only three minutes',
           'Remove the video and describe in words what it would have shown'],
  answer:'Trim the clip so only the 40 seconds that matter are played',
  hint:'The evidence is worth showing. What has to change is its length.',
  explanation:'Trimming keeps the evidence and respects the time limit, which is why presentation software includes a trim tool. Talking over footage divides attention, double speed makes speech unintelligible, and dropping the clip throws away the strongest evidence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-163', chapterId:'g9ict-presentation', subsection:'comic_strips', difficulty:4,
  question:'A Grade 9 class must explain online safety to Grade 4 pupils. Why might a comic strip work better than a set of bulleted slides?',
  options:['A short story in pictures holds attention and needs less reading',
           'A comic strip can be produced more quickly than a set of slides',
           'A comic strip does not need a computer to be shown to a class',
           'Younger pupils are not allowed to be shown presentation slides'],
  answer:'A short story in pictures holds attention and needs less reading',
  hint:'Think about the audience: how old they are, and how much text they will read.',
  explanation:'A narrative in pictures carries a situation and its consequence to readers who tire of dense text, which is why comic strips are used for younger audiences. The production time and the equipment are not the reason, and there is no such rule about slides.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-164', chapterId:'g9ict-presentation', subsection:'storyboarding', difficulty:4,
  question:'A group is told to storyboard their multimedia project before opening the software. What is the argument for spending that time first?',
  options:['The order and content are settled while changing them is still cheap',
           'A storyboard is required by the software before a project is started',
           'A storyboard is quicker to draw than the slides themselves would be',
           'A storyboard proves to the teacher that the group did their own work'],
  answer:'The order and content are settled while changing them is still cheap',
  hint:'Compare the cost of moving a scene on paper with the cost of rebuilding it once it is made.',
  explanation:'Planning on paper makes the structure visible and cheap to change, so the expensive building work is done once. No software requires a storyboard, and speed of drawing is a means rather than the reason.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-165', chapterId:'g9ict-presentation', subsection:'storyboarding', difficulty:4,
  question:'A storyboard frame for a multimedia project is being drawn. Besides a sketch of the screen, what should the frame record?',
  options:['What is said or heard, and what happens when the user acts',
           'The names of the pupils who will build that frame in the group',
           'The exact file size that the finished frame is expected to reach',
           'The colour of every button drawn in the sketch on that frame'],
  answer:'What is said or heard, and what happens when the user acts',
  hint:'A storyboard has to describe a moving, interactive thing. A picture alone cannot.',
  explanation:'Each frame carries the visual plus the sound or narration and the navigation, because those are what the sketch cannot show and what the builder needs. Names, file sizes and button colours are production details rather than the design of the experience.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-166', chapterId:'g9ict-presentation', subsection:'authoring_tools', difficulty:4,
  question:'A finished presentation must be sent to a parent who does not have the same presentation software. Which format keeps the layout and fonts as designed?',
  options:['PDF, which fixes the appearance of every page for any reader',
           'A plain text file, which can be opened on any computer at all',
           'The original file, because every computer can open any format',
           'A web page, which will look the same in every browser and size'],
  answer:'PDF, which fixes the appearance of every page for any reader',
  hint:'The requirement is that it LOOKS the same on a machine you know nothing about.',
  explanation:'PDF embeds the fonts and fixes the layout, so it displays identically wherever it is opened, which is why it is the standard for distribution. Plain text discards the design, the original needs the software it was made in, and a web page reflows with the window.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-167', chapterId:'g9ict-presentation', subsection:'authoring_tools', difficulty:4,
  question:'A group must build a project where the user chooses what to see next by clicking buttons on the screen. Which kind of tool do they need?',
  options:['A multimedia authoring tool, which supports buttons and branching',
           'A word processor, which arranges text and pictures onto the page',
           'A spreadsheet, which calculates and charts the results of a survey',
           'A paint program, which draws and edits the images they will use'],
  answer:'A multimedia authoring tool, which supports buttons and branching',
  hint:'The defining requirement is that the USER decides the path through it.',
  explanation:'Authoring tools exist to combine media with interactivity, so a click can lead to different screens, which is what branching means. The other three each produce material the project may use but none of them handles the navigation.' }));

})();
