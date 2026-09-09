'use strict';
(function () {

// ── text_formatting: g9ict-wpv-001 to g9ict-wpv-012 ─────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-001', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Which keyboard shortcut makes selected text bold?',
  options:['Ctrl + B','Ctrl + I','Ctrl + U','Ctrl + E'],
  answer:'Ctrl + B', hint:'B for Bold.',
  explanation:'Ctrl + B applies bold formatting to selected text in most word processors.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-002', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Which keyboard shortcut underlines selected text?',
  options:['Ctrl + U','Ctrl + B','Ctrl + I','Ctrl + S'],
  answer:'Ctrl + U', hint:'U for Underline.',
  explanation:'Ctrl + U applies an underline to selected text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-003', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Text that slopes to the right is formatted as:',
  options:['Italic','Bold','Underline','Strikethrough'],
  answer:'Italic', hint:'It leans like a slanted letter i.',
  explanation:'Italic formatting makes text slope to the right and is used for emphasis or titles.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-004', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Text that is level at both the left and right margins is:',
  options:['Justified','Centred','Left-aligned','Right-aligned'],
  answer:'Justified', hint:'Newspaper columns are usually set this way.',
  explanation:'Justified alignment spaces words so that text lines up neatly at both the left and the right margin.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-005', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Which option changes the size of the text characters?',
  options:['Font size','Font colour','Line spacing','Paragraph spacing'],
  answer:'Font size', hint:'It is measured in points.',
  explanation:'Font size controls how large or small the characters appear, measured in points (pt).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-006', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'The font face (typeface) controls:',
  options:['the design or style of the characters','the size of the characters','the colour of the page background','the line spacing of the document'],
  answer:'the design or style of the characters', hint:'Arial, Times New Roman and Calibri are all different fonts.',
  explanation:'The font face determines the visual design of the letters — for example, whether they have serifs or not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-007', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Superscript text appears:',
  options:['slightly above the normal text line and in a smaller size','below the normal text line','in bold on its own line','in a coloured box'],
  answer:'slightly above the normal text line and in a smaller size', hint:'Think of the "2" in cm².',
  explanation:'Superscript raises the text above the normal baseline and reduces its size, used for powers and footnote numbers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-008', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Strikethrough formatting is used to:',
  options:['draw a line through text to show it has been deleted or is no longer valid','underline text in red','make text appear raised','turn text into a hyperlink'],
  answer:'draw a line through text to show it has been deleted or is no longer valid', hint:'A line goes through the middle of the text.',
  explanation:'Strikethrough draws a horizontal line through text, commonly used when revising documents to mark removed content.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-009', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Line spacing in a word processor controls:',
  options:['the vertical space between lines of text','the number of characters per line','the font colour','the page border width'],
  answer:'the vertical space between lines of text', hint:'Double spacing leaves a gap between each line.',
  explanation:'Line spacing sets how much vertical space appears between successive lines in a paragraph.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-010', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'The Format Painter tool is used to:',
  options:['copy formatting from one piece of text and apply it to another','change the background colour of the page','insert a picture into the document','draw a border around a paragraph'],
  answer:'copy formatting from one piece of text and apply it to another', hint:'It copies the look, not the content.',
  explanation:'The Format Painter copies all formatting settings (font, size, colour, bold, etc.) from selected text and applies them elsewhere.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-011', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Which keyboard shortcut selects all text in a document?',
  options:['Ctrl + A','Ctrl + S','Ctrl + Z','Ctrl + P'],
  answer:'Ctrl + A', hint:'A for All.',
  explanation:'Ctrl + A selects all content in the document, allowing formatting or copying in one step.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-012', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Changing text to ALL CAPS using the Change Case option is different from holding Caps Lock because:',
  options:['Change Case can be removed without retyping the text, while Caps Lock requires retyping','Caps Lock makes text bigger','Change Case always underlines the text','Caps Lock only works on the first letter'],
  answer:'Change Case can be removed without retyping the text, while Caps Lock requires retyping', hint:'Change Case is a formatting toggle.',
  explanation:'Change Case applies an appearance change that can be reversed; Caps Lock physically changes the characters, requiring retyping to undo.' }));

// ── page_layout: g9ict-wpv-013 to g9ict-wpv-024 ─────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-013', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'The margin of a document is:',
  options:['the blank space between the text and the edge of the page','the coloured band at the top of the screen','the gap between two columns of text','the space between two paragraphs'],
  answer:'the blank space between the text and the edge of the page', hint:'It frames the text on the page.',
  explanation:'Margins are the areas of white space that surround the text area on all four sides of a page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-014', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'A header in a word-processed document appears:',
  options:['at the top of every page','at the bottom of every page','in the middle of the first page only','beside the left margin'],
  answer:'at the top of every page', hint:'The name tells you where it is.',
  explanation:'A header is an area at the very top of the page that can contain text such as a title, page number or date, repeated on every page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-015', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'A footer in a word-processed document appears:',
  options:['at the bottom of every page','at the top of every page','on the left margin','only on the title page'],
  answer:'at the bottom of every page', hint:'It is the opposite of a header.',
  explanation:'A footer is an area at the bottom of every page, often used for page numbers, dates or document titles.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-016', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'To print a document with the page wider than it is tall, the orientation should be set to:',
  options:['Landscape','Portrait','Duplex','Grayscale'],
  answer:'Landscape', hint:'Like a landscape painting viewed sideways.',
  explanation:'Landscape orientation rotates the page so it is wider than it is tall, useful for wide tables or certificates.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-017', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'Page break is used to:',
  options:['force the text after it to begin on a new page','remove a blank page from the middle of a document','change the page orientation mid-document','delete the header on one page'],
  answer:'force the text after it to begin on a new page', hint:'It starts a fresh page at that point.',
  explanation:'A manual page break forces whatever follows it to start at the top of the next page regardless of how much text is on the current page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-018', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'Gutter margin in a document is:',
  options:['extra space added on the binding edge so text is not hidden when the document is bound','the space at the bottom of the page','the gap between columns','the top margin on odd pages'],
  answer:'extra space added on the binding edge so text is not hidden when the document is bound', hint:'It is the inner edge margin for a booklet.',
  explanation:'A gutter margin adds extra blank space along the edge where pages will be bound, preventing text from disappearing into the spine.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-019', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'Which feature breaks a document into two or more side-by-side vertical sections of text on the same page?',
  options:['Columns','Tables','Tabs','Borders'],
  answer:'Columns', hint:'Newspaper-style layout.',
  explanation:'The Columns feature divides the page into vertical strips so text flows from the bottom of one column to the top of the next.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-020', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'The paper size most commonly used in schools and offices is:',
  options:['A4','A3','A5','Letter'],
  answer:'A4', hint:'210 mm × 297 mm.',
  explanation:'A4 (210 mm × 297 mm) is the standard paper size in most countries and the default for most office documents.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-021', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'Indentation in a word processor moves:',
  options:['the left or right edge of a paragraph inward from the margin','the paragraph to the next page','the text to the centre of the page','the line spacing of the paragraph'],
  answer:'the left or right edge of a paragraph inward from the margin', hint:'It pulls the paragraph in from the margin.',
  explanation:'An indent sets how far the paragraph\'s left or right edge sits from the page margin.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-022', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'A page border is applied using:',
  options:['the Borders and Shading dialog under the Design or Page Layout tab','the Font dialog box','the Insert Chart wizard','the Table of Contents tool'],
  answer:'the Borders and Shading dialog under the Design or Page Layout tab', hint:'It is a page-level setting, not a text setting.',
  explanation:'Page borders are applied through the Borders and Shading dialog, which lets you choose a style, colour and width for the border on each edge of the page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-023', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'Section breaks in a document allow:',
  options:['different parts of the document to have different formatting, such as different page orientations','the document to be split into separate files','paragraphs to be numbered automatically','columns to be formatted as a table'],
  answer:'different parts of the document to have different formatting, such as different page orientations', hint:'Each section can have its own layout.',
  explanation:'Section breaks divide a document into sections that can each have their own margins, orientation, headers and columns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-024', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'The ruler at the top of a document in a word processor is used to:',
  options:['set tabs, indents and margins visually','measure the weight of the paper','calculate the word count','change the font size'],
  answer:'set tabs, indents and margins visually', hint:'You drag the markers on it.',
  explanation:'The ruler displays tab stops and indent markers that can be dragged to adjust the layout of the paragraph or document.' }));

// ── word_icons: g9ict-wpv-025 to g9ict-wpv-035 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-025', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The icon that looks like a floppy disk in a word processor is used to:',
  options:['save the document','print the document','open a new document','close the application'],
  answer:'save the document', hint:'It is the traditional symbol for saving.',
  explanation:'The floppy disk icon is the universally recognised symbol for the Save command, even though floppy disks are no longer commonly used.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-026', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The icon showing a magnifying glass in a word processor represents:',
  options:['Find and Replace or Search','Print Preview','Zoom','Spell Check'],
  answer:'Find and Replace or Search', hint:'A magnifying glass means search.',
  explanation:'A magnifying glass icon typically opens the Find (and Replace) function, used to search for words or phrases in the document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-027', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The Undo icon (usually a curved arrow pointing left) is used to:',
  options:['reverse the last action taken','repeat the last action taken','paste copied text','open the spell checker'],
  answer:'reverse the last action taken', hint:'It takes you back one step.',
  explanation:'Undo reverses the most recent action; pressing it repeatedly undoes multiple actions in sequence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-028', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The Redo icon (usually a curved arrow pointing right) is used to:',
  options:['reapply an action that was previously undone','reverse the last action','cut the selected text','insert a table'],
  answer:'reapply an action that was previously undone', hint:'It is the opposite of Undo.',
  explanation:'Redo reapplies an action that was just reversed with Undo.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-029', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'Which icon in the toolbar represents Cut?',
  options:['A pair of scissors','A floppy disk','A magnifying glass','A paintbrush'],
  answer:'A pair of scissors', hint:'Cutting with scissors is the metaphor.',
  explanation:'The Cut command is represented by scissors, reflecting the idea of cutting text out of a document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-030', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The icon showing two overlapping sheets of paper represents:',
  options:['Copy','Paste','Print','New Document'],
  answer:'Copy', hint:'Two copies of the same sheet.',
  explanation:'The Copy icon is depicted as two overlapping document sheets, representing duplicating the selected content.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-031', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The icon showing a clipboard with a page on it represents:',
  options:['Paste','Copy','Cut','Save'],
  answer:'Paste', hint:'You paste from a clipboard.',
  explanation:'Paste is represented by a clipboard, reflecting the act of transferring content from the clipboard into the document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-032', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The ABC icon with a red wavy underline represents:',
  options:['Spell Check','Font size','Print','Bold'],
  answer:'Spell Check', hint:'A wavy red line marks spelling errors.',
  explanation:'The spell check icon uses the red wavy underline that word processors use to mark spelling mistakes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-033', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The paragraph symbol (¶) icon in a word processor is used to:',
  options:['show or hide non-printing formatting marks such as spaces, tabs and paragraph returns','insert a new paragraph','change the paragraph indentation','apply a paragraph style'],
  answer:'show or hide non-printing formatting marks such as spaces, tabs and paragraph returns', hint:'Toggle the display of invisible formatting marks.',
  explanation:'Clicking the ¶ icon toggles the display of non-printing characters, making spaces, tabs and paragraph marks visible for editing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-034', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The printer icon in the toolbar is used to:',
  options:['open the Print dialog','save the document','insert a picture','open a new document'],
  answer:'open the Print dialog', hint:'A printer picture means print.',
  explanation:'Clicking the printer icon opens the Print dialog where you choose the printer, number of copies and page range.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-035', chapterId:'g9ict-word-processing', subsection:'word_icons', difficulty:2,
  question:'The zoom slider at the bottom-right of the screen is used to:',
  options:['increase or decrease the magnification of the document on screen','change the font size of the selected text','scroll through the document quickly','change the paper size'],
  answer:'increase or decrease the magnification of the document on screen', hint:'Drag it left to shrink, right to enlarge the view.',
  explanation:'The zoom slider adjusts how large the document appears on screen; it does not change the actual font size or page size.' }));

// ── images_shapes: g9ict-wpv-036 to g9ict-wpv-047 ────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-036', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'To insert a picture into a word-processed document, you use:',
  options:['Insert > Pictures','Format > Font','View > Ruler','Page Layout > Columns'],
  answer:'Insert > Pictures', hint:'Pictures are inserted from the Insert tab.',
  explanation:'The Insert tab contains the Pictures command, which opens a dialog to locate and insert an image file.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-037', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'Text wrapping around an image is controlled by:',
  options:['the Wrap Text option in the image tools','the Page Layout margin setting','the Font dialog','the Table of Contents tool'],
  answer:'the Wrap Text option in the image tools', hint:'You choose how text flows around the picture.',
  explanation:'Wrap Text settings determine how the document\'s text flows in relation to an inserted image — for example, square, tight or through.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-038', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'Setting the image wrap to "In Line with Text" means:',
  options:['the image is treated as a character and moves with the surrounding text','the text flows over the image','the image is fixed to the page regardless of text changes','the image appears behind the text'],
  answer:'the image is treated as a character and moves with the surrounding text', hint:'It behaves like a large letter in the text flow.',
  explanation:'"In Line with Text" inserts the image as if it were a text character, so it moves when text above it is added or deleted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-039', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'To maintain the proportions of an image while resizing it, you should:',
  options:['drag a corner handle','drag a side handle','use the font size box','press Ctrl + P'],
  answer:'drag a corner handle', hint:'Corners resize both dimensions at the same time.',
  explanation:'Dragging a corner handle scales both width and height equally, keeping the image\'s original proportions. Side handles change only one dimension.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-040', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'Cropping an image in a document:',
  options:['trims away the unwanted parts of the image','reduces the colour depth','compresses the image file','converts the image to black and white'],
  answer:'trims away the unwanted parts of the image', hint:'Cut away what you do not want to show.',
  explanation:'Cropping removes the outer edges of an image so only the desired portion is displayed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-041', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'Drawing shapes such as rectangles and arrows in a word processor is done through:',
  options:['Insert > Shapes','Insert > Chart','View > Outline','Format > Paragraph'],
  answer:'Insert > Shapes', hint:'Shapes are in the Insert menu.',
  explanation:'The Shapes gallery in the Insert tab provides a library of shapes — lines, rectangles, arrows, callouts — that can be drawn on the page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-042', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'A text box in a word-processed document allows you to:',
  options:['position text independently of the main text flow, anywhere on the page','add a border around the entire document','create a spreadsheet inside the document','automatically number the headings'],
  answer:'position text independently of the main text flow, anywhere on the page', hint:'Text inside a box can be placed anywhere.',
  explanation:'A text box is a container that can be dragged to any position on the page, allowing text placement independent of the main document flow.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-043', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'Alt text (alternative text) added to an image in a document is used to:',
  options:['describe the image for screen readers used by visually impaired users','change the image caption','resize the image automatically','convert the image to a drawing'],
  answer:'describe the image for screen readers used by visually impaired users', hint:'It makes images accessible.',
  explanation:'Alt text provides a text description of an image so screen readers can convey its content to users who cannot see the image.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-044', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'SmartArt graphics in a word processor are used to create:',
  options:['visually formatted diagrams such as process flows, hierarchies and lists','spreadsheet charts from data tables','animated GIF files','video clips embedded in the document'],
  answer:'visually formatted diagrams such as process flows, hierarchies and lists', hint:'They turn text into professional-looking diagrams.',
  explanation:'SmartArt provides templates for creating diagrams — cycle, hierarchy, relationship, process — with formatted shapes and text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-045', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'To group several shapes together so they move as one object, you:',
  options:['select all shapes and use Group from the Format or right-click menu','save each shape as a separate file','copy the shapes into a table cell','convert them to a single text box'],
  answer:'select all shapes and use Group from the Format or right-click menu', hint:'Grouping locks them together.',
  explanation:'Selecting all the shapes and choosing Group combines them into one object that can be moved and resized together.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-046', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'A watermark in a word-processed document is:',
  options:['faded text or an image placed behind the main content on every page','a border around the edge of each page','a header applied to odd-numbered pages only','a hyperlink inserted in the body text'],
  answer:'faded text or an image placed behind the main content on every page', hint:'DRAFT and CONFIDENTIAL stamps are common examples.',
  explanation:'A watermark is a semi-transparent image or text placed behind the document content, often used to mark documents as DRAFT or CONFIDENTIAL.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-047', chapterId:'g9ict-word-processing', subsection:'images_shapes', difficulty:2,
  question:'The Picture Format tab (or Format Picture pane) allows you to:',
  options:['adjust brightness, contrast, colour and apply artistic effects to an image','change the page margins','insert a chart','add a footnote to the document'],
  answer:'adjust brightness, contrast, colour and apply artistic effects to an image', hint:'It is the formatting tool specifically for pictures.',
  explanation:'The Picture Format tab provides controls for adjusting image brightness, contrast, sharpness, colour mode and applying visual effects.' }));

// ── tables_text: g9ict-wpv-048 to g9ict-wpv-059 ─────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-048', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'A cell in a word-processed table is the intersection of:',
  options:['a row and a column','two rows','two columns','a page and a margin'],
  answer:'a row and a column', hint:'It is the box formed where a row meets a column.',
  explanation:'Each cell is the rectangular box formed at the intersection of one row and one column in a table.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-049', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'To move to the next cell in a table using only the keyboard, you press:',
  options:['Tab','Enter','Ctrl + N','F5'],
  answer:'Tab', hint:'Tab moves through cells one at a time.',
  explanation:'Pressing Tab moves the cursor to the next cell in the table; Shift + Tab moves to the previous cell.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-050', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'Merging cells in a table means:',
  options:['combining two or more adjacent cells into one larger cell','splitting one cell into two smaller cells','adding a border to selected cells','changing the background colour of the cell'],
  answer:'combining two or more adjacent cells into one larger cell', hint:'Many cells become one.',
  explanation:'Merge Cells joins adjacent selected cells into a single cell, useful for table headings that span multiple columns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-051', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'Splitting a cell in a table means:',
  options:['dividing one cell into two or more smaller cells','combining several cells into one','removing a row from the table','adding a new column at the edge'],
  answer:'dividing one cell into two or more smaller cells', hint:'One cell becomes several.',
  explanation:'Split Cells divides a cell into a specified number of rows or columns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-052', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'To add a new row at the bottom of a table, the simplest method is:',
  options:['press Tab when the cursor is in the last cell','press Ctrl + Enter','click Insert Table again','drag the bottom border of the table'],
  answer:'press Tab when the cursor is in the last cell', hint:'Tab at the end creates a new row.',
  explanation:'Pressing Tab when you are in the last cell of a table automatically adds a new row below it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-053', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'Text alignment inside a table cell can be set to:',
  options:['top-left, top-centre, top-right, middle-left, middle-centre, middle-right, and so on','left or right only','top or bottom only','none — tables always use the default'],
  answer:'top-left, top-centre, top-right, middle-left, middle-centre, middle-right, and so on', hint:'There are nine alignment positions for cells.',
  explanation:'Cell content can be aligned both horizontally (left, centre, right) and vertically (top, middle, bottom) within the cell.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-054', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'The header row of a table should be formatted to:',
  options:['stand out from the data rows, for example in bold or with shading','be invisible to the reader','have no borders','contain only numbers'],
  answer:'stand out from the data rows, for example in bold or with shading', hint:'It identifies the column contents.',
  explanation:'Formatting the header row differently — bold, coloured background — makes it visually distinct so readers can immediately identify each column.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-055', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'To delete an entire row from a table, you:',
  options:['select the row and choose Delete Rows from the Table menu or right-click menu','press the Delete key on the keyboard','drag the row off the page','change the row colour to white'],
  answer:'select the row and choose Delete Rows from the Table menu or right-click menu', hint:'Select it first, then delete.',
  explanation:'Selecting the row and using Delete Rows removes the entire row and its content from the table.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-056', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'AutoFit in a table automatically adjusts:',
  options:['column widths to fit the contents or the window','the font size to fit the cell','the page margins to match the table','the table style to match the document theme'],
  answer:'column widths to fit the contents or the window', hint:'It makes columns just wide enough for their content.',
  explanation:'AutoFit adjusts column widths automatically, either to fit the content in each column or to distribute columns evenly across the page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-057', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'Sorting data in a table by a column means:',
  options:['rearranging the rows into alphabetical or numerical order based on that column\'s values','removing rows that do not match the column','highlighting the highest value','changing the column width'],
  answer:'rearranging the rows into alphabetical or numerical order based on that column\'s values', hint:'Sort puts the rows in order.',
  explanation:'Sorting a table rearranges all rows based on the chosen column, either A to Z, Z to A, or smallest to largest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-058', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'A table style in a word processor applies:',
  options:['a set of colours, borders and shading to the whole table at once','a new font to all text in the document','a border only around the first row','a new page layout to the document'],
  answer:'a set of colours, borders and shading to the whole table at once', hint:'Like a theme for the table.',
  explanation:'Table styles apply a coordinated combination of colours, fonts and borders to the entire table in one click.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-059', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'Which feature converts existing tabbed text into a formatted table?',
  options:['Insert > Table > Convert Text to Table','Format > Paragraph > Columns','Insert > Shapes','Page Layout > Margins'],
  answer:'Insert > Table > Convert Text to Table', hint:'Text separated by tabs or commas can be converted automatically.',
  explanation:'The Convert Text to Table option reads separator characters (tabs, commas, etc.) in selected text and creates a table from them.' }));

// ── multiple_documents: g9ict-wpv-060 to g9ict-wpv-070 ───────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-060', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'To open more than one document at the same time in a word processor, you:',
  options:['open each file separately — they appear in different windows or tabs','close the first file before opening the next','save the first file as a template first','merge both files into one before opening'],
  answer:'open each file separately — they appear in different windows or tabs', hint:'Word processors support multiple open files.',
  explanation:'Most word processors allow several documents to be open simultaneously, each in its own window or tab.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-061', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'The View Side by Side feature in a word processor is used to:',
  options:['display two documents next to each other for comparison','place two tables next to each other','create a two-column layout','show the header on the left and the footer on the right'],
  answer:'display two documents next to each other for comparison', hint:'It is useful for comparing two versions of a document.',
  explanation:'View Side by Side opens two documents in adjacent windows so their content can be compared or copied between them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-062', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'To copy text from one document and paste it into another, you would use:',
  options:['Ctrl + C to copy, switch to the other document, and then Ctrl + V to paste','Save both documents and then merge them','Use Print to print and retype the text','Use Insert > File to transfer the text'],
  answer:'Ctrl + C to copy, switch to the other document, and then Ctrl + V to paste', hint:'The clipboard holds copied content across windows.',
  explanation:'The clipboard retains copied content even when you switch between document windows, allowing a quick copy and paste.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-063', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'Track Changes in a word processor is used to:',
  options:['record all edits made to a document so they can be accepted or rejected later','automatically back up the document every minute','track how many words are typed each session','record the document\'s edit history in a separate file'],
  answer:'record all edits made to a document so they can be accepted or rejected later', hint:'Editors use it to suggest changes.',
  explanation:'Track Changes marks every insertion, deletion and formatting change so the document\'s author can review and accept or reject each one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-064', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'The Compare Documents feature is used to:',
  options:['show the differences between two versions of the same document highlighted as tracked changes','print two documents at the same time','merge two documents into one combined file','check the spelling of two documents simultaneously'],
  answer:'show the differences between two versions of the same document highlighted as tracked changes', hint:'It finds what has changed between two versions.',
  explanation:'Compare Documents generates a new document showing all differences between two versions as tracked changes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-065', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'A master document in a word processor is used to:',
  options:['organise and link a long document that is split into several sub-documents','apply the same style to all open documents','make a copy of the document in a new folder','convert the document to PDF automatically'],
  answer:'organise and link a long document that is split into several sub-documents', hint:'Long reports or books are often split into chapters.',
  explanation:'A master document contains links to several sub-documents, allowing a long work to be edited in sections while maintaining a single table of contents.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-066', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'Inserting a file into an open document using Insert > Object (or Text from File) places:',
  options:['the complete content of another file into the current document at the cursor position','a thumbnail image of the other document','a link that opens the file in a separate window','a footnote referencing the other document'],
  answer:'the complete content of another file into the current document at the cursor position', hint:'It imports the entire file content.',
  explanation:'Insert Text from File inserts all the content of a chosen file into the current document at the cursor position.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-067', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'When multiple authors edit the same document using a cloud-based word processor, this is called:',
  options:['real-time collaboration','version control','peer review','master document editing'],
  answer:'real-time collaboration', hint:'Everyone works on the same file at the same time.',
  explanation:'Cloud-based word processors allow several users to edit the same document simultaneously, with each person\'s changes visible to others in real time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-068', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'Saving a document as a PDF means:',
  options:['the document can be viewed on any device without the need for word processor software','the file can only be opened in one specific application','the file size always triples','all images are automatically removed'],
  answer:'the document can be viewed on any device without the need for word processor software', hint:'PDF is a universal format.',
  explanation:'PDF (Portable Document Format) can be opened on any device with a PDF reader, preserving the layout exactly without needing the original software.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-069', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'The Spelling and Grammar checker in a word processor:',
  options:['identifies possible spelling mistakes and grammatical errors but may miss context-based errors','guarantees that the document is completely error-free','translates the document into another language','deletes all grammatical errors automatically without prompting'],
  answer:'identifies possible spelling mistakes and grammatical errors but may miss context-based errors', hint:'It is helpful but not infallible.',
  explanation:'Spell checkers catch many errors but can miss correctly-spelt words used in the wrong context, so human proofreading is still necessary.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-070', chapterId:'g9ict-word-processing', subsection:'multiple_documents', difficulty:2,
  question:'The word count feature in a word processor shows:',
  options:['the total number of words, characters, paragraphs and pages in the document','the maximum number of words allowed','the number of formatting errors found','the font size of the longest word'],
  answer:'the total number of words, characters, paragraphs and pages in the document', hint:'It provides statistics about the document.',
  explanation:'Word Count (found under the Review tab or on the status bar) displays statistics including word count, character count, paragraph count and page count.' }));

// ── styles: g9ict-wpv-071 to g9ict-wpv-082 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-071', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'A style in a word processor is:',
  options:['a named set of formatting settings that can be applied with a single click','a type of border applied to paragraphs','a method for inserting images','a shortcut for printing the document'],
  answer:'a named set of formatting settings that can be applied with a single click', hint:'One click applies many formats at once.',
  explanation:'A style saves multiple formatting settings (font, size, spacing, colour) under one name, allowing consistent formatting in a single click.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-072', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'Applying the Heading 1 style to text in a long document allows the word processor to:',
  options:['include that text in an automatic Table of Contents','print that text in a larger font only','save the text in a separate file','send the text to a different document'],
  answer:'include that text in an automatic Table of Contents', hint:'Heading styles are recognised by the TOC generator.',
  explanation:'The Table of Contents tool collects all text marked with Heading styles and builds a contents page automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-073', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'Modifying a style in a document changes:',
  options:['all text in the document that uses that style at once','only the text currently selected','only the next paragraph','only text added after the modification'],
  answer:'all text in the document that uses that style at once', hint:'One change updates every instance.',
  explanation:'If you modify a style, every paragraph formatted with that style updates immediately throughout the entire document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-074', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'The Normal style in a word processor applies to:',
  options:['body text that has no other specific style applied','every heading in the document','only the first paragraph of the document','hyperlinks within the document'],
  answer:'body text that has no other specific style applied', hint:'Normal is the default paragraph style.',
  explanation:'The Normal style is the default applied to ordinary body text when no other style has been chosen.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-075', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'A character style differs from a paragraph style because a character style:',
  options:['applies formatting only to selected characters within a paragraph, not to the whole paragraph','applies to the whole document at once','can only be used on the first character of each word','removes all previous formatting from the paragraph'],
  answer:'applies formatting only to selected characters within a paragraph, not to the whole paragraph', hint:'It works at the character level, not the paragraph level.',
  explanation:'Character styles apply formatting (bold, colour, font size) to selected characters only, while paragraph styles apply to the entire paragraph.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-076', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'The Styles gallery or Styles pane in a word processor shows:',
  options:['all the named styles available in the current document or template','all open documents','all spelling errors found','all recent changes made by Track Changes'],
  answer:'all the named styles available in the current document or template', hint:'It lists your formatting options.',
  explanation:'The Styles pane lists every style defined in the document or its template, allowing you to apply, modify or create styles.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-077', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'Using consistent heading styles throughout a long document helps because:',
  options:['it creates a uniform structure, allows automatic TOC generation and aids navigation','it increases the file size','it removes the need for spell checking','it automatically translates the document'],
  answer:'it creates a uniform structure, allows automatic TOC generation and aids navigation', hint:'Structure and navigation are the key benefits.',
  explanation:'Consistent heading styles give the document clear visual structure, enable automatic table-of-contents generation, and allow quick navigation using the Document Map.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-078', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'A Quick Style set is a collection of:',
  options:['coordinated styles for headings, body text and other elements that work well together visually','keyboard shortcuts for common commands','images grouped under one name','recent documents opened in the word processor'],
  answer:'coordinated styles for headings, body text and other elements that work well together visually', hint:'All the styles match each other.',
  explanation:'A Quick Style set provides a complete, visually coordinated set of styles for an entire document, making it easy to change the overall look.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-079', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'To create a new style based on existing text formatting, you:',
  options:['select the formatted text and click New Style in the Styles pane','type the style name into the font size box','print the document and write the style name on it','save the document under a new file name'],
  answer:'select the formatted text and click New Style in the Styles pane', hint:'Use the formatted text as the template for the new style.',
  explanation:'Selecting formatted text and choosing New Style creates a named style with all the formatting of the selected text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-080', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'The difference between Heading 1 and Heading 2 styles is that:',
  options:['Heading 1 is used for main headings and Heading 2 for subheadings, creating a hierarchy','Heading 1 is always blue and Heading 2 is always red','Heading 2 can only be used once per document','Heading 1 cannot include any bold text'],
  answer:'Heading 1 is used for main headings and Heading 2 for subheadings, creating a hierarchy', hint:'They form a hierarchy of heading levels.',
  explanation:'Heading styles are numbered to show hierarchy: Heading 1 for chapter titles, Heading 2 for sections within a chapter, and so on.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-081', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'Clearing all formatting from selected text restores it to:',
  options:['the Normal (default paragraph) style','bold and italic formatting','the last heading style used','all uppercase letters'],
  answer:'the Normal (default paragraph) style', hint:'Clearing formatting resets to the base style.',
  explanation:'The Clear Formatting command removes all manually applied and style-based formatting, returning the text to the default Normal style.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-082', chapterId:'g9ict-word-processing', subsection:'styles', difficulty:2,
  question:'Styles improve consistency in a document by ensuring:',
  options:['the same type of text always looks the same throughout the document','every page has a different colour scheme','each paragraph uses a different font','spelling is checked automatically'],
  answer:'the same type of text always looks the same throughout the document', hint:'One style definition means uniform appearance.',
  explanation:'Styles guarantee consistency because all text using a given style is formatted identically, removing the risk of accidental formatting variation.' }));

// ── mail_merge: g9ict-wpv-083 to g9ict-wpv-094 ───────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-083', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'Mail merge is used to:',
  options:['produce multiple personalised copies of a letter or document from one template and a list of data','send email automatically','merge two documents into one','check the spelling of a mailing list'],
  answer:'produce multiple personalised copies of a letter or document from one template and a list of data', hint:'One template, many personalised letters.',
  explanation:'Mail merge creates a personalised copy of the main document for every record in the data source, inserting individual details automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-084', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'In mail merge, the main document contains:',
  options:['the fixed text and merge field placeholders used in every copy','the list of names and addresses','the finished merged letters','a copy of the data source'],
  answer:'the fixed text and merge field placeholders used in every copy', hint:'It is the letter template.',
  explanation:'The main document has the wording common to all copies and contains merge field markers that will be replaced by individual data.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-085', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'In mail merge, the data source is:',
  options:['the file containing the records of names, addresses and other personal information','the main document with the letter text','the finished merged output','the printer used to print the letters'],
  answer:'the file containing the records of names, addresses and other personal information', hint:'It holds the variable information.',
  explanation:'The data source (often a spreadsheet or database table) contains the individual records whose fields are inserted into each merged copy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-086', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'A merge field in a main document appears as:',
  options:['a field name inside chevrons, such as «FirstName»','a red wavy underline','a small image of the field','a footnote at the bottom of the page'],
  answer:'a field name inside chevrons, such as «FirstName»', hint:'Look at how they appear in the letter template.',
  explanation:'Merge fields are displayed between chevron marks (« ») in the main document and are replaced by the corresponding data values during the merge.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-087', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'If a data source has 50 records, a completed mail merge produces:',
  options:['50 personalised copies of the document','1 document with 50 pages','50 separate data source files','1 letter with all 50 names listed'],
  answer:'50 personalised copies of the document', hint:'One copy is produced per record.',
  explanation:'Mail merge creates one personalised copy of the main document for each record in the data source, so 50 records produce 50 letters.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-088', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'One advantage of using mail merge rather than typing each letter individually is:',
  options:['the same wording is guaranteed in every letter and the process is much faster for large numbers','each letter is saved as a separate file automatically','it checks the spelling for every letter individually','it selects a different font for each recipient'],
  answer:'the same wording is guaranteed in every letter and the process is much faster for large numbers', hint:'One template, consistent wording, automated.',
  explanation:'Mail merge produces consistent wording in every copy and is extremely fast for large mailings compared to typing each letter separately.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-089', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'The mail merge wizard in a word processor guides you through:',
  options:['selecting the document type, data source, and fields, then completing the merge step by step','drawing a chart of the data','formatting each recipient\'s name individually','converting the data source into a PDF'],
  answer:'selecting the document type, data source, and fields, then completing the merge step by step', hint:'A wizard walks you through the process.',
  explanation:'The mail merge wizard takes you through each stage: choose the document type, identify the data source, insert fields, preview and complete the merge.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-090', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'Which types of documents can be created using mail merge?',
  options:['Letters, envelopes, labels and emails','Only formal business letters','Only mailing address labels','Only spreadsheet charts'],
  answer:'Letters, envelopes, labels and emails', hint:'Mail merge works for any document where the same template is personalised for many recipients.',
  explanation:'Mail merge can produce personalised letters, address envelopes, print address labels, and send personalised bulk emails.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-091', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'Before starting a mail merge, the data source should be checked to ensure:',
  options:['all records are complete and correctly formatted with consistent field names','all records use the same font','every record has a photograph','the file is saved as a .pdf'],
  answer:'all records are complete and correctly formatted with consistent field names', hint:'Garbage in, garbage out.',
  explanation:'The data source must have consistent, complete records and correct field names; errors in the data source will produce errors in the merged letters.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-092', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'The "Preview Results" option in a mail merge allows you to:',
  options:['see how the finished letter will look for a specific record before completing the merge','print all copies immediately','delete records from the data source','change the font used in the main document'],
  answer:'see how the finished letter will look for a specific record before completing the merge', hint:'Check one letter before printing all of them.',
  explanation:'Preview Results replaces the merge field placeholders with actual data from one record so you can check the layout before running the full merge.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-093', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'Mail merge can be used to produce addressed envelopes by:',
  options:['selecting Envelopes as the document type and using the delivery address fields from the data source','printing the main letter and folding it into an envelope shape','typing each address on a separate page','scanning a handwritten address list'],
  answer:'selecting Envelopes as the document type and using the delivery address fields from the data source', hint:'The envelope size and address position are set in the wizard.',
  explanation:'Choosing Envelopes as the merge document type formats the page to envelope size and places address fields in the correct position.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-094', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'After a mail merge is completed, the merged documents can be:',
  options:['printed immediately, saved as a single new document, or emailed','only deleted','converted into a database automatically','used to create a spreadsheet chart'],
  answer:'printed immediately, saved as a single new document, or emailed', hint:'You can output the merged letters in several ways.',
  explanation:'The completed merge can be output directly to the printer, saved as a new document with all personalised copies, or used to generate personalised emails.' }));

// ── toc_lists: g9ict-wpv-095 to g9ict-wpv-106 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-095', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'An automatic Table of Contents is generated by the word processor using:',
  options:['the heading styles applied to text in the document','the order in which text was typed','the font size of each paragraph','the number of words in each section'],
  answer:'the heading styles applied to text in the document', hint:'The TOC collects heading-styled text.',
  explanation:'The word processor scans the document for text formatted with Heading 1, Heading 2 etc. and assembles them into the TOC.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-096', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'To update a Table of Contents after changes have been made to the document, you:',
  options:['right-click the TOC and choose Update Field, or use the Update Table button','delete the TOC and retype it manually','save the document as a PDF','change the heading style font'],
  answer:'right-click the TOC and choose Update Field, or use the Update Table button', hint:'The TOC can refresh itself.',
  explanation:'Updating the TOC field tells the word processor to re-scan the document for headings and refresh the page numbers and entries.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-097', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'Clicking on a TOC entry in a word-processed document (while holding Ctrl) will:',
  options:['jump directly to that section of the document','delete that heading from the document','change the style of the heading','print that page only'],
  answer:'jump directly to that section of the document', hint:'TOC entries are hyperlinks.',
  explanation:'TOC entries are formatted as hyperlinks; Ctrl + clicking one jumps the cursor to the corresponding heading in the document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-098', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'A bulleted list is used to present:',
  options:['a set of items where the order does not matter','a set of steps that must be followed in strict order','data in rows and columns','chapter headings in a book'],
  answer:'a set of items where the order does not matter', hint:'Bullets do not indicate sequence.',
  explanation:'Bullets are used for unordered lists where the items are related but their sequence is not important.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-099', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'A numbered list is used to present:',
  options:['a sequence of steps that must be followed in a specific order','a collection of unrelated items','the chapters of a book in any order','a set of images'],
  answer:'a sequence of steps that must be followed in a specific order', hint:'Numbers show the order matters.',
  explanation:'Numbered lists are used when items must be followed or considered in a specific sequence, such as instructions or procedural steps.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-100', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'A multi-level list in a word processor allows you to:',
  options:['create sub-items indented beneath each main item, forming a hierarchy','number every character in the document','create columns of equal width','insert a border around every paragraph'],
  answer:'create sub-items indented beneath each main item, forming a hierarchy', hint:'It is a list with indented sub-points.',
  explanation:'A multi-level list uses indentation and different numbering or bullet styles to show hierarchy — for example, 1, 1.1, 1.1.1.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-101', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'To change the bullet symbol used in a bulleted list, you:',
  options:['open the Bullets dialog and select a different symbol or character','change the font of the first character','press Tab before the bullet','delete the bullet and retype it'],
  answer:'open the Bullets dialog and select a different symbol or character', hint:'The dialog lets you choose any character as a bullet.',
  explanation:'Right-clicking the list and choosing the Bullets menu opens a gallery and a dialog where you can select any symbol, image or character as the bullet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-102', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'Footnotes in a word-processed document are used to:',
  options:['add references or comments at the bottom of the page without interrupting the main text','number the pages of the document','insert a footer on every page','create a table of contents automatically'],
  answer:'add references or comments at the bottom of the page without interrupting the main text', hint:'They appear at the foot of the page.',
  explanation:'Footnotes allow the author to add references, explanations or citations at the bottom of the page without cluttering the main text.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-103', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'An index at the end of a document helps the reader to:',
  options:['find specific terms or topics and the pages on which they appear','count the number of words in the document','navigate to any page by clicking','check the headings used in the document'],
  answer:'find specific terms or topics and the pages on which they appear', hint:'It is an alphabetical guide to the document\'s content.',
  explanation:'An index is an alphabetical list of key terms and their page numbers, helping readers quickly locate specific information.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-104', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'An endnote is similar to a footnote except that an endnote:',
  options:['appears at the end of the document rather than at the bottom of each page','appears at the top of each page','is numbered in Roman numerals','can only be used in tables'],
  answer:'appears at the end of the document rather than at the bottom of each page', hint:'It is placed at the very end.',
  explanation:'Endnotes serve the same purpose as footnotes but are gathered together at the end of the document rather than scattered across page bottoms.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-105', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'Captions in a word-processed document are:',
  options:['descriptive labels added below figures, tables or images','footnotes converted into headings','titles for each paragraph','bullet points converted to numbers'],
  answer:'descriptive labels added below figures, tables or images', hint:'They label the object they describe.',
  explanation:'Captions are text labels placed near an image or table to describe it; word processors can number captions automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-wpv-106', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:2,
  question:'The Table of Figures feature in a word processor creates:',
  options:['a list of all captioned figures, tables or equations in the document with their page numbers','a gallery of all images that can be inserted','a chart from data in a table','a list of all hyperlinks in the document'],
  answer:'a list of all captioned figures, tables or equations in the document with their page numbers', hint:'Like a TOC but for figures and tables.',
  explanation:'The Table of Figures uses captions to build an automatically numbered list of all figures or tables in the document, with page numbers.' }));

})();
