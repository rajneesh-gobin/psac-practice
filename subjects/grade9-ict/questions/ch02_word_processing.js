'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Word Processing   (examWeight 5, joint heaviest)
//
//  ⚠ Q7 IS THE WORD-PROCESSING SLOT IN EVERY PAPER FROM 2022 and the paper is
//    structurally frozen: Section A is byte-identical in allocation across
//    2022-2025. Formats measured in this chapter: icon naming, word-bank fill,
//    ordering a sequence of steps, mail-merge completion, reading a document
//    facsimile, reading a print dialog.
//
//  ⚠ IT TESTS THE SOFTWARE DECLARATIVELY, NOT PRACTICALLY. The N540 is a
//    written paper - "Candidates answer on the Question Paper", no lab
//    component - so "which sign starts a formula", "name this icon", "what does
//    this dialog do" are all fair game and fully assessable by this app. Only
//    artefact production (build a website, produce a video) is out of scope,
//    and a written paper cannot mark that either.
//
//  ⚠ 68.5% of bracketed parts are worth 1 or 2 marks and nothing anywhere
//    exceeds 6, so short recognition items are the paper, not a shortcut.
//
//  ⚠ NO ARTWORK. 2023/2024 Q1 is 87% photographs and this repo has no bundled
//    Grade 9 artwork, so icons are NAMED rather than shown. The
//    picture-dependent variants are recorded in blueprint-ict.md as still
//    needing artwork.
//
//  Source: NCE ICT (N540) 2021-2025, Q7 and Q1; NCF Grades 7-9 §8, read as
//  cumulative scope across Grades 7, 8 and 9.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-word-processing';

const MCQ = [
  ['g9ict-wp-001', 'text_formatting', 1,
   'Which formatting feature makes text appear like <b>this</b>?',
   ['Bold', 'Italic', 'Underline', 'Superscript'], 'Bold',
   'Look at the thickness of the letters.',
   'Bold makes text thicker and darker so it stands out.'],

  ['g9ict-wp-002', 'text_formatting', 1,
   'Which feature would you use to write H<sub>2</sub>O correctly?',
   ['Subscript', 'Superscript', 'Strikethrough', 'Small caps'], 'Subscript',
   'The 2 sits below the line of the text.',
   'Subscript lowers a character below the baseline, which is how the 2 in H2O is written.'],

  ['g9ict-wp-003', 'text_formatting', 2,
   'Which feature would you use to write 5<sup>2</sup>?',
   ['Superscript', 'Subscript', 'Bold', 'Highlight'], 'Superscript',
   'The 2 sits above the line of the text.',
   'Superscript raises a character above the baseline, which is how a power is written.'],

  ['g9ict-wp-004', 'text_formatting', 2,
   'A paragraph must have its lines spread out with a blank line-height between each. Which setting changes this?',
   ['Line spacing', 'Character spacing', 'Margins', 'Columns'], 'Line spacing',
   'The setting is about the space BETWEEN lines.',
   'Line spacing controls the vertical gap between the lines of a paragraph.'],

  ['g9ict-wp-005', 'text_formatting', 2,
   'Which alignment makes both the left and the right edges of a paragraph straight?',
   ['Justify', 'Align left', 'Align right', 'Centre'], 'Justify',
   'Only one alignment straightens BOTH edges.',
   'Justify stretches the spaces between words so both margins line up.'],

  ['g9ict-wp-006', 'text_formatting', 2,
   'Which feature repeats the formatting of one piece of text onto another?',
   ['Format painter', 'Clipboard', 'Autocorrect', 'Thesaurus'], 'Format painter',
   'Its icon is usually a paintbrush.',
   'The format painter copies formatting - font, size, colour, bold - from one selection and applies it to another.'],

  ['g9ict-wp-007', 'page_layout', 1,
   'Which page orientation is <b>wider than it is tall</b>?',
   ['Landscape', 'Portrait', 'Vertical', 'Booklet'], 'Landscape',
   'Think of a photograph of a wide view.',
   'Landscape orientation is wider than it is tall; portrait is taller than it is wide.'],

  ['g9ict-wp-008', 'page_layout', 2,
   'What is the white space between the text and the edge of the page called?',
   ['Margin', 'Gutter', 'Header', 'Indent'], 'Margin',
   'It surrounds the text on all four sides.',
   'The margin is the blank border between the edge of the paper and the text area.'],

  ['g9ict-wp-009', 'page_layout', 2,
   'Text that appears at the top of <b>every</b> page is placed in the:',
   ['Header', 'Footer', 'Title', 'Text box'], 'Header',
   'Top of the page, repeated automatically.',
   'A header is the area at the top of every page; a footer is the matching area at the bottom.'],

  ['g9ict-wp-010', 'page_layout', 2,
   'Which feature forces the text that follows onto a new page?',
   ['Page break', 'Line break', 'Tab stop', 'Indent'], 'Page break',
   'It ends the current page immediately.',
   'A page break ends the page at that point so the following text starts on a fresh page.'],

  ['g9ict-wp-011', 'page_layout', 3,
   'A document must show page numbers at the bottom of every page. Where are they inserted?',
   ['Footer', 'Header', 'Margin', 'End of the document'], 'Footer',
   'Bottom of the page, repeated automatically.',
   'The footer is the repeating area at the bottom of every page, which is where page numbers usually go.'],

  ['g9ict-wp-012', 'word_icons', 1,
   'A toolbar icon shows a <b>floppy disk</b>. What does it do?',
   ['Save the document', 'Open a document', 'Print the document', 'Undo the last change'],
   'Save the document',
   'The oldest way of storing a file.',
   'The floppy-disk icon is the traditional symbol for Save.'],

  ['g9ict-wp-013', 'word_icons', 1,
   'A toolbar icon shows a pair of <b>scissors</b>. What does it do?',
   ['Cut the selected text', 'Copy the selected text', 'Delete the file', 'Split the page'],
   'Cut the selected text',
   'Scissors remove something so it can be placed elsewhere.',
   'The scissors icon is Cut: it removes the selection and puts it on the clipboard.'],

  ['g9ict-wp-014', 'word_icons', 2,
   'A toolbar icon shows an <b>arrow curving to the left</b>. What does it do?',
   ['Undo the last action', 'Redo the last action', 'Align text left', 'Decrease the indent'],
   'Undo the last action',
   'It takes you backwards.',
   'The left-curving arrow is Undo; the right-curving one is Redo.'],

  ['g9ict-wp-015', 'word_icons', 2,
   'A toolbar icon shows a <b>printer</b>. What does clicking it usually do?',
   ['Send the document to the printer', 'Preview the page layout',
    'Save the document as a PDF', 'Change the paper size'],
   'Send the document to the printer',
   'The most direct meaning of the symbol.',
   'The printer icon sends the document to the printer.'],

  ['g9ict-wp-016', 'word_icons', 2,
   'A toolbar icon shows the letters <b>ABC</b> with a tick. What does it do?',
   ['Check spelling and grammar', 'Change the font', 'Sort the list alphabetically', 'Count the words'],
   'Check spelling and grammar',
   'The tick means "check".',
   'ABC with a tick is the spelling-and-grammar checker.'],

  ['g9ict-wp-017', 'text_formatting', 3,
   'A pupil types a long report and wants every main heading to look the same. What is the most efficient feature to use?',
   ['Styles', 'Format painter used repeatedly', 'Bold on each heading', 'A separate text box for each heading'],
   'Styles',
   'One change should update every heading at once.',
   'A style is a saved set of formatting applied by name; changing the style updates every heading that uses it.'],

  ['g9ict-wp-018', 'page_layout', 3,
   'A newsletter must show text in two side-by-side blocks on the same page. Which feature does this?',
   ['Columns', 'Tables', 'Text boxes', 'Indents'], 'Columns',
   'Newspapers are laid out this way.',
   'The columns feature flows text down one block and then continues at the top of the next.'],

  ['g9ict-wp-019', 'word_icons', 3,
   'Which keyboard shortcut is normally used to <b>copy</b> the selected text?',
   ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + P'], 'Ctrl + C',
   'C for copy.',
   'Ctrl + C copies, Ctrl + X cuts and Ctrl + V pastes.'],

  ['g9ict-wp-020', 'word_icons', 3,
   'Which keyboard shortcut is normally used to <b>paste</b>?',
   ['Ctrl + V', 'Ctrl + C', 'Ctrl + Z', 'Ctrl + S'], 'Ctrl + V',
   'It is next to C and X on the keyboard.',
   'Ctrl + V pastes whatever is on the clipboard.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-wp-021', 'page_layout', 2,
   'Name the page orientation that is <b>taller than it is wide</b>.',
   'Portrait', ['portrait orientation'],
   'The opposite of landscape.', 'Portrait orientation is taller than it is wide.'],
  ['g9ict-wp-022', 'text_formatting', 2,
   'Name the feature that finds a word throughout a document and changes it to another word.',
   'Find and replace', ['find & replace', 'search and replace', 'replace'],
   'It does two things in one operation.',
   'Find and replace searches for a word and substitutes another for it, everywhere it appears.'],
  ['g9ict-wp-023', 'mail_merge', 3,
   'Name the feature that merges a list of names and addresses into one standard letter.',
   'Mail merge', ['mailmerge', 'mail-merge'],
   'It joins a letter to a data source.',
   'Mail merge combines a main document with a data source so one letter is produced for each record.'],
  ['g9ict-wp-024', 'text_formatting', 2,
   'Give the name for the size of a character, measured in points.',
   'Font size', ['font-size', 'point size', 'text size'],
   'It is one of the two things a font drop-down sets.',
   'Font size is measured in points; 12 point is a common size for body text.'],
  ['g9ict-wp-025', 'word_icons', 2,
   'Give the keyboard shortcut used to <b>save</b> a document.',
   'Ctrl + S', ['ctrl+s', 'ctrl s', 'control + s'],
   'S for save.', 'Ctrl + S saves the current document.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK, added after measuring the first draft against the
//  manifest. Six declared subsections had NOTHING behind them - images_shapes,
//  tables_text, multiple_documents, styles, mail_merge and toc_lists - which
//  would have opened six empty Practise cards the moment this pack went live.
//  ⚠ `g9ict-wp-023` was RETAGGED from page_layout to mail_merge in the same
//    pass: it was already a mail-merge question sitting under the wrong id.
//  ⚠ Mail merge and tables are both examined formats (Q7, every paper from
//    2022), so this is exam content, not padding.
// ══════════════════════════════════════════════════════════════════════════
const MCQ2 = [
  ['g9ict-wp-026', 'images_shapes', 1,
   'Which command inserts a picture stored on the computer into a document?',
   ['Insert Picture', 'Insert Table', 'Insert Page Break', 'Insert Footer'],
   'Insert Picture',
   'The name of the command says what it inserts.',
   'Insert Picture places an image file into the document at the cursor.'],

  ['g9ict-wp-027', 'images_shapes', 2,
   'Dragging the <b>corner</b> handle of a picture rather than a side handle does what?',
   ['Resizes it while keeping its proportions',
    'Deletes the picture from the document', 'Rotates it by ninety degrees each time', 'Changes its colour to match the text'],
   'Resizes it while keeping its proportions',
   'A side handle stretches; a corner does not.',
   'A corner handle scales width and height together, so the picture is not stretched out of shape.'],

  ['g9ict-wp-028', 'images_shapes', 2,
   'Which setting decides how text flows around an inserted picture?',
   ['Text wrapping', 'Line spacing', 'Font size', 'Page orientation'],
   'Text wrapping',
   'It concerns the text beside the image.',
   'Text wrapping controls whether text sits above and below the picture, flows around it, or passes behind it.'],

  ['g9ict-wp-029', 'images_shapes', 3,
   'A photograph must be made smaller on the page without distorting it. What should be done?',
   ['Drag a corner handle inwards',
    'Drag the side handle inwards',
    'Reduce the font size',
    'Change the margins'],
   'Drag a corner handle inwards',
   'Both dimensions must change together.',
   'Only a corner handle changes width and height in proportion; a side handle squashes the image.'],

  ['g9ict-wp-030', 'tables_text', 1,
   'In a word-processed table, what is the box where a row and a column meet called?',
   ['A cell', 'A field', 'A frame', 'A margin'], 'A cell',
   'The same word a spreadsheet uses.',
   'A table is made of cells, each formed where a row crosses a column.'],

  ['g9ict-wp-031', 'tables_text', 2,
   'A table has 4 columns and 6 rows. How many cells does it contain?',
   ['24', '10', '46', '12'], '24',
   'Multiply the two numbers.',
   '4 columns times 6 rows gives 24 cells.'],

  ['g9ict-wp-032', 'tables_text', 2,
   'Which key normally moves the cursor to the next cell of a table?',
   ['Tab', 'Enter', 'Shift', 'Escape'], 'Tab',
   'Enter would make the row taller instead.',
   'Tab moves to the next cell; Enter adds a new line inside the current cell.'],

  ['g9ict-wp-033', 'tables_text', 3,
   'A list of names is separated by commas and must become a table. Which feature does this?',
   ['Convert Text to Table', 'Mail merge', 'Find and replace', 'Page break'],
   'Convert Text to Table',
   'The command is named after exactly what it does.',
   'Convert Text to Table splits the text at a chosen separator - a comma or a tab - and puts each part in its own cell.'],

  ['g9ict-wp-034', 'styles', 1,
   'What is a <b>style</b> in a word processor?',
   ['A saved set of formatting applied by name',
    'A picture placed behind the text',
    'The name of the font only',
    'The size of the paper'],
   'A saved set of formatting applied by name',
   'It bundles several formatting settings together.',
   'A style stores font, size, colour and spacing under one name so it can be applied consistently.'],

  ['g9ict-wp-035', 'styles', 2,
   'Every heading in a report uses the Heading 1 style. The style is then changed to blue. What happens?',
   ['Every Heading 1 in the document turns blue',
    'Only the first heading turns blue',
    'Nothing changes until each heading is retyped',
    'The body text turns blue as well'],
   'Every Heading 1 in the document turns blue',
   'That is the point of using a style.',
   'Changing a style updates every piece of text that uses it, throughout the document.'],

  ['g9ict-wp-036', 'styles', 3,
   'Why are heading styles better than simply making each heading bold by hand?',
   ['They keep headings consistent and let a table of contents be generated',
    'They make the file open faster than one formatted by hand',
    'They stop the document being printed until it has been checked',
    'They change the page size automatically to suit each heading'],
   'They keep headings consistent and let a table of contents be generated',
   'Think about what else can read a style.',
   'Styles mark text as a heading, so the formatting stays consistent and the program can build a contents list from them.'],

  ['g9ict-wp-037', 'toc_lists', 2,
   'What must be used for headings before a table of contents can be generated automatically?',
   ['Heading styles', 'Bold text', 'A larger font', 'Underlining'],
   'Heading styles',
   'The program must be able to recognise a heading.',
   'An automatic table of contents is built from text marked with heading styles; bold text alone tells the program nothing.'],

  ['g9ict-wp-038', 'toc_lists', 3,
   'Pages have been added to a report after its table of contents was generated. What should be done?',
   ['Update the table of contents', 'Retype every page number by hand',
    'Delete the table of contents', 'Change the paper size'],
   'Update the table of contents',
   'The program can redo it in one step.',
   'An automatic table of contents is refreshed with an Update command, which corrects every page number at once.'],

  ['g9ict-wp-039', 'toc_lists', 2,
   'What is a <b>list of figures</b>?',
   ['An automatically generated list of the captioned pictures and their pages',
    'A list of the fonts and type sizes used anywhere in the document',
    'A list of every page number in the document, printed in order',
    'A list of the books and websites the report has referred to'],
   'An automatically generated list of the captioned pictures and their pages',
   'It does for pictures what a contents page does for headings.',
   'A list of figures is generated from the captions, giving each figure and the page it is on.'],

  ['g9ict-wp-040', 'multiple_documents', 2,
   'Two documents are open at once. How is text moved from one to the other?',
   ['Cut it from the first and paste it into the second',
    'Print the first document and retype it into the second',
    'Rename the second document and then open it again',
    'Close both documents and then reopen the second'],
   'Cut it from the first and paste it into the second',
   'The clipboard works between documents.',
   'The clipboard is shared, so cut or copy in one document and paste in another.'],

  ['g9ict-wp-041', 'multiple_documents', 3,
   'What is the main advantage of viewing two documents side by side?',
   ['They can be compared without switching between windows',
    'They are automatically merged into a single file',
    'Both are printed at once',
    'The second document is deleted'],
   'They can be compared without switching between windows',
   'It is about reading them together.',
   'Side-by-side view shows both documents at the same time, which is what comparing them requires.'],

  ['g9ict-wp-045', 'multiple_documents', 2,
   'A report and a set of notes are both open. How does a user switch between them?',
   ['Select the other document from the window list or the taskbar',
    'Close the first document every time the other is needed',
    'Print the first document and read it on paper instead',
    'Save the first document under a new name and open that'],
   'Select the other document from the window list or the taskbar',
   'Both are already open.',
   'Open documents each have a window, so switching is a matter of selecting the other one - closing and reopening is unnecessary.'],

  ['g9ict-wp-042', 'mail_merge', 2,
   'A mail merge needs two things. What are they?',
   ['A main document and a data source',
    'A printer and a scanner',
    'Two identical letters',
    'A table of contents and an index'],
   'A main document and a data source',
   'One holds the wording, the other the names.',
   'Mail merge joins a main document, holding the standard wording, to a data source holding the recipients.'],

  ['g9ict-wp-043', 'mail_merge', 3,
   'In a mail-merged letter, what does a <b>merge field</b> such as &lt;&lt;Surname&gt;&gt; do?',
   ['It is replaced by that recipient&rsquo;s surname in each copy',
    'It prints the word Surname on every single letter',
    'It sets the font used in the letter',
    'It numbers the pages of the letter'],
   'It is replaced by that recipient&rsquo;s surname in each copy',
   'It is a placeholder, not text.',
   'A merge field is a placeholder that takes its value from the matching column of the data source for each record.'],

  ['g9ict-wp-044', 'mail_merge', 3,
   'A school must send the same letter to 250 parents, each addressed personally. What is the most efficient method?',
   ['Mail merge', 'Typing 250 separate letters',
    'Printing one letter 250 times', 'Sending one letter to the head of school'],
   'Mail merge',
   'One letter, many recipients.',
   'Mail merge produces one personalised copy per record from a single main document.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
