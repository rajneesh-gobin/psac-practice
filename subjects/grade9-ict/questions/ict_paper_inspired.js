'use strict';
(function () {

// ── Paper-inspired questions: g9ict-piv-001 to g9ict-piv-080 ────────────────
// Drawn from 2025 NCE ICT paper (N540) question patterns.
// Difficulties: 20 × diff 1 · 40 × diff 2 · 20 × diff 3
// IDs tagged to chapters and subsections that exist in _manifest.js.

// ── COMPUTER SYSTEMS & HARDWARE ──────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-001', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:1,
  question:'Which of the following is an input device?',
  options:['Keyboard','Monitor','Printer','Speaker'],
  answer:'Keyboard',
  explanation:'A keyboard is an input device. Data is typed into the computer through it. Monitors, printers, and speakers are all output devices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-002', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:1,
  question:'Which of the following is an output device?',
  options:['Monitor','Mouse','Webcam','Barcode reader'],
  answer:'Monitor',
  explanation:'A monitor displays information from the computer to the user, making it an output device. A mouse, webcam, and barcode reader are all input devices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-003', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
  question:'What is the purpose of the motherboard in a computer?',
  options:['It is the main circuit board that all other components connect to','It stores all programs and files when the computer is switched off','It carries out all arithmetic and logical operations','It displays the visual output of the computer'],
  answer:'It is the main circuit board that all other components connect to',
  explanation:'The motherboard is the main circuit board of a computer. Components such as the CPU, RAM, and expansion cards all connect to it, allowing them to communicate.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-004', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:1,
  question:'Which input device captures live video and transmits it to the computer?',
  options:['Webcam','Projector','Speaker','Hard disk drive'],
  answer:'Webcam',
  explanation:'A webcam is an input device that captures live images and video and sends them to the computer in real time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-005', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:1,
  question:'What does CPU stand for?',
  options:['Central Processing Unit','Computer Power Unit','Central Program Utility','Core Processing Utility'],
  answer:'Central Processing Unit',
  explanation:'CPU stands for Central Processing Unit. It is often called the brain of the computer because it processes all instructions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-006', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
  question:'What is the main purpose of RAM in a computer?',
  options:['To store data and programs temporarily while the computer is in use','To store data permanently even when the computer is switched off','To carry out all arithmetic and comparison operations','To convert data into images on the screen'],
  answer:'To store data and programs temporarily while the computer is in use',
  explanation:'RAM (Random Access Memory) holds data and programs that the CPU is currently using. Its contents are lost as soon as the computer is switched off.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-007', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
  question:'Which component enables a computer to use a microphone and speakers?',
  options:['Sound card','Graphics card','Network interface card','Cooling fan'],
  answer:'Sound card',
  explanation:'A sound card processes audio signals, allowing the computer to accept input from a microphone and produce output through speakers or headphones.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-008', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:1,
  question:'How many bits make up one byte?',
  options:['8','4','16','2'],
  answer:'8',
  explanation:'One byte consists of 8 bits. A bit is the smallest unit of data in a computer, represented as either 0 or 1.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-009', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:2,
  question:'How many bytes make up one kilobyte?',
  options:['1 024','1 000','512','2 048'],
  answer:'1 024',
  explanation:'One kilobyte equals 1 024 bytes. Computers work in powers of 2, and 2¹⁰ = 1 024.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-010', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:3,
  question:'A file is 3 MB in size. How many kilobytes is this?',
  options:['3 072 KB','3 000 KB','1 536 KB','6 144 KB'],
  answer:'3 072 KB',
  explanation:'One megabyte equals 1 024 kilobytes. Therefore 3 MB = 3 × 1 024 = 3 072 KB.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-011', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
  question:'Which of the following correctly describes a Solid State Drive (SSD)?',
  options:['It has no moving parts and is faster than a traditional hard disk drive','It uses spinning magnetic platters to read and write data','It is the least expensive form of permanent storage','It loses its contents as soon as the computer is switched off'],
  answer:'It has no moving parts and is faster than a traditional hard disk drive',
  explanation:'An SSD stores data on flash memory chips. Because it has no moving parts, it is faster and less fragile than a Hard Disk Drive (HDD).' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-012', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
  question:'Which storage device uses spinning magnetic platters and a read/write head?',
  options:['Hard Disk Drive (HDD)','Solid State Drive (SSD)','USB flash drive','Blu-ray disc'],
  answer:'Hard Disk Drive (HDD)',
  explanation:'A Hard Disk Drive (HDD) stores data on spinning magnetic platters. It is generally slower than an SSD but offers more storage capacity for the same cost.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-013', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
  question:'A teacher wants to display her slides on a large screen for the whole class. Which output device should she use?',
  options:['Projector','Scanner','Microphone','Webcam'],
  answer:'Projector',
  explanation:'A projector is an output device that displays an enlarged image on a screen or wall, making it suitable for classroom presentations.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-014', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:1,
  question:'Which input device is used at supermarket checkouts to read product codes?',
  options:['Barcode reader','Printer','Monitor','Speaker'],
  answer:'Barcode reader',
  explanation:'A barcode reader is an input device that uses light to scan the pattern of lines in a barcode and sends the product information to the computer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-015', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:3,
  question:'What is the difference between RAM and ROM?',
  options:['RAM is temporary and loses its data when power is off; ROM is permanent and retains its data when power is off','ROM is temporary and loses its data when power is off; RAM is permanent and retains data when power is off','RAM stores the BIOS; ROM stores user files and programs','RAM and ROM are both permanent but ROM is faster'],
  answer:'RAM is temporary and loses its data when power is off; ROM is permanent and retains its data when power is off',
  explanation:'RAM (Random Access Memory) is volatile — its contents disappear when the computer is switched off. ROM (Read Only Memory) is non-volatile and permanently stores instructions such as the BIOS that the computer needs to start up.' }));

// ── SOFTWARE & OPERATING SYSTEMS ─────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-016', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:1,
  question:'Which of the following is an example of system software?',
  options:['Operating system','Word processor','Spreadsheet application','Web browser'],
  answer:'Operating system',
  explanation:'An operating system is system software that manages the computer\'s hardware and provides services for application programs. Word processors, spreadsheets, and web browsers are application software.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-017', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
  question:'Which of the following is NOT a function of an operating system?',
  options:['Creating spreadsheets and formatting data','Managing files and folders','Providing a user interface','Allocating memory to running programs'],
  answer:'Creating spreadsheets and formatting data',
  explanation:'Creating spreadsheets is done by application software such as Microsoft Excel. The operating system manages hardware resources, files, memory, and provides the interface between the user and the computer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-018', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
  question:'Which type of user interface uses icons, windows, and a pointing device?',
  options:['Graphical User Interface (GUI)','Command Line Interface (CLI)','Batch processing interface','Natural language interface'],
  answer:'Graphical User Interface (GUI)',
  explanation:'A Graphical User Interface (GUI) lets users interact with the computer through visual elements such as icons, windows, and menus, typically controlled with a mouse.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-019', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:1,
  question:'Which of the following is an example of application software?',
  options:['Microsoft Word','Windows 10','Linux','macOS'],
  answer:'Microsoft Word',
  explanation:'Microsoft Word is application software used for word processing. Windows 10, Linux, and macOS are all operating systems, which are system software.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-020', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:3,
  question:'A school wants software that can be freely used and distributed, but whose source code cannot be modified. Which type best fits?',
  options:['Freeware','Open source software','Proprietary software','Shareware'],
  answer:'Freeware',
  explanation:'Freeware is software available at no charge that can be freely used and distributed, but the source code is not provided for modification. Open source software allows the source code to be viewed and changed.' }));

// ── WORD PROCESSING ───────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-021', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:1,
  question:'Which keyboard shortcut applies bold formatting to selected text?',
  options:['Ctrl+B','Ctrl+I','Ctrl+U','Ctrl+S'],
  answer:'Ctrl+B',
  explanation:'Ctrl+B toggles bold formatting on the selected text. Ctrl+I applies italic, Ctrl+U applies underline, and Ctrl+S saves the document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-022', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'A student presses a key and the cursor moves to a new line, starting a new paragraph. Which key did she press?',
  options:['Enter','Tab','Spacebar','Shift'],
  answer:'Enter',
  explanation:'Pressing Enter begins a new paragraph. The Tab key indents text or moves between table cells, but it does not start a new paragraph.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-023', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
  question:'Which keyboard shortcut opens the Find and Replace dialog box?',
  options:['Ctrl+H','Ctrl+F','Ctrl+R','Ctrl+G'],
  answer:'Ctrl+H',
  explanation:'Ctrl+H opens the Find and Replace dialog box, which lets the user find specific text and replace it with different text throughout the document.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-024', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:1,
  question:'Which function key starts the spelling and grammar check in most word processors?',
  options:['F7','F5','F1','F2'],
  answer:'F7',
  explanation:'The F7 key opens the spelling and grammar check tool in most word processing applications, including Microsoft Word.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-025', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
  question:'A student wants each line of her paragraph to be neatly aligned at both the left and right margins. Which alignment should she choose?',
  options:['Justified','Left','Right','Centre'],
  answer:'Justified',
  explanation:'Justified alignment stretches each line so that text touches both the left and right margins, creating a neat block shape on both sides of the page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-026', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
  question:'What is the purpose of mail merge?',
  options:['To merge a template with a data source','To apply a master style to all paragraphs','To combine two open documents into one','To send email from the word processor'],
  answer:'To merge a template with a data source',
  explanation:'Mail merge joins a main document (such as a letter template containing merge fields) with a data source (such as a list of names and addresses) to automatically produce personalised copies.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-027', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:1,
  question:'Where does a header appear in a word processed document?',
  options:['At the top of every page','At the bottom of every page','On the first page only','In the left margin of each page'],
  answer:'At the top of every page',
  explanation:'A header is text or information (such as a title or page number) that is repeated at the top of every page. A footer appears at the bottom of every page.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-028', chapterId:'g9ict-word-processing', subsection:'tables_text', difficulty:2,
  question:'In a word processing table, which key moves the cursor to the next cell?',
  options:['Tab','Enter','Spacebar','Ctrl+Right'],
  answer:'Tab',
  explanation:'Pressing Tab moves the cursor to the next cell in a table. Pressing Enter within a cell creates a new line inside the same cell.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-029', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:3,
  question:'A student has formatted a report with specific headings, fonts, and spacing. She wants every new document she creates to use those same settings automatically. What should she save?',
  options:['A document template','A mail merge main document','A macro file','A header and footer preset'],
  answer:'A document template',
  explanation:'A template is a pre-formatted document used as the starting point for new documents. All formatting settings are stored in it and applied automatically each time it is used.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-030', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:3,
  question:'During a mail merge a student notices that the same name appears on every letter. What is the most likely cause?',
  options:['The merge fields are not linked correctly','The document was saved in the wrong format','The page margins stop the field updating','The spell checker overwrote the names'],
  answer:'The merge fields are not linked correctly',
  explanation:'In a mail merge, each merge field in the main document must be linked to the correct column in the data source. An incorrect link causes the same value to repeat instead of changing for each record.' }));

// ── SPREADSHEETS ──────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-031', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:1,
  question:'Which character must appear at the start of every spreadsheet formula?',
  options:['=','+','-','/'],
  answer:'=',
  explanation:'Every formula in a spreadsheet must begin with an equals sign (=). This tells the application that what follows is a calculation to be performed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-032', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'Which spreadsheet function returns the smallest value in a range of cells?',
  options:['MIN','MAX','AVERAGE','COUNT'],
  answer:'MIN',
  explanation:'The MIN function returns the lowest value in the specified range of cells.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-033', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
  question:'A student wants to count how many cells in the range B2:B20 contain numbers. Which function should she use?',
  options:['COUNT','SUM','AVERAGE','COUNTA'],
  answer:'COUNT',
  explanation:'The COUNT function counts the number of cells in a range that contain numerical values. COUNTA counts cells that are not empty, regardless of data type.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-034', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
  question:'In a spreadsheet, what does the cell reference B3 represent?',
  options:['Column B, Row 3','Row B, Column 3','The third cell in the workbook','The second worksheet, third column'],
  answer:'Column B, Row 3',
  explanation:'In spreadsheet notation, letters identify columns and numbers identify rows. B3 refers to the cell at column B, row 3.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-035', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
  question:'What is the fill handle in a spreadsheet used for?',
  options:['Copying content to nearby cells','Merging selected cells into one','Inserting a new row or column','Applying a colour to a range'],
  answer:'Copying content to nearby cells',
  explanation:'The fill handle is the small square at the bottom-right corner of a selected cell. Dragging it copies the cell\'s content or formula into the cells in the direction you drag.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-036', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:3,
  question:'A student enters =B2*C2 in cell D2 and drags the fill handle down to D3. What formula appears in D3?',
  options:['=B3*C3','=B2*C2','=B2*C3','=B3*C2'],
  answer:'=B3*C3',
  explanation:'Relative cell references adjust automatically when a formula is copied. Moving one row down increases all row numbers by one, so =B2*C2 becomes =B3*C3 in D3.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-037', chapterId:'g9ict-spreadsheets', subsection:'charts_from_data', difficulty:2,
  question:'Which type of chart is most suitable for showing how a student\'s test scores have changed over six months?',
  options:['Line chart','Pie chart','Bar chart','Scatter chart'],
  answer:'Line chart',
  explanation:'A line chart is designed to show trends over time. Points are plotted for each time period and connected by a line, making it easy to see rises and falls.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-038', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:3,
  question:'A student enters =SUM($A$1:$A$5) in cell B1 and copies it to cell C1. What formula appears in C1?',
  options:['=SUM($A$1:$A$5)','=SUM($B$1:$B$5)','=SUM(A1:A5)','=SUM(B1:B5)'],
  answer:'=SUM($A$1:$A$5)',
  explanation:'The dollar signs create absolute references that do not change when a formula is copied. C1 will still contain =SUM($A$1:$A$5), pointing to exactly the same cells.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-039', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:2,
  question:'A teacher has a spreadsheet of student marks and wants to arrange them from highest to lowest. Which option should she choose?',
  options:['Sort descending','Sort ascending','AutoFilter','Conditional formatting'],
  answer:'Sort descending',
  explanation:'Sort descending arranges numerical data from the largest value to the smallest (highest to lowest). Sort ascending would arrange from lowest to highest.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-040', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:3,
  question:'A student needs to look up a student ID in the first column of a table and return the mark from the fourth column. Which function should she use?',
  options:['VLOOKUP','HLOOKUP','INDEX','MATCH'],
  answer:'VLOOKUP',
  explanation:'VLOOKUP (Vertical Lookup) searches the first column of a table range for a value and returns data from a specified column in the same row. It is ideal for looking up values in a vertical list.' }));

// ── PRESENTATION & MULTIMEDIA ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-041', chapterId:'g9ict-presentation', subsection:'storyboarding', difficulty:1,
  question:'What is a storyboard used for when planning a multimedia video?',
  options:['To plan the sequence of scenes using sketches and notes','To record the audio narration for the video','To apply transitions between video clips','To compress the finished video for uploading'],
  answer:'To plan the sequence of scenes using sketches and notes',
  explanation:'A storyboard is a planning tool that shows the intended sequence of scenes, together with images, descriptions, and instructions, before production begins.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-042', chapterId:'g9ict-presentation', subsection:'slide_masters', difficulty:2,
  question:'What is a slide master in a presentation application?',
  options:['A template for all slide formatting','A slide containing the speaker notes','The title slide of the presentation','The slide with the most animations'],
  answer:'A template for all slide formatting',
  explanation:'The slide master controls the default fonts, colours, backgrounds, and layouts for every slide. Changes made to the slide master are applied to all slides automatically.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-043', chapterId:'g9ict-presentation', subsection:'animations', difficulty:2,
  question:'In a presentation, what is an animation?',
  options:['A movement or appearance effect applied to an object on a slide','The visual effect that plays when moving from one slide to the next','A video clip inserted into a slide','The speed setting for the whole slideshow'],
  answer:'A movement or appearance effect applied to an object on a slide',
  explanation:'An animation controls how a specific object (such as a text box or image) enters, moves, or exits on a slide during the presentation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-044', chapterId:'g9ict-presentation', subsection:'animations', difficulty:1,
  question:'What is a slide transition in a presentation?',
  options:['The visual effect that plays when moving from one slide to the next','A movement effect applied to text or images on a single slide','The background colour that changes between slides','The timer that controls how long each slide is shown'],
  answer:'The visual effect that plays when moving from one slide to the next',
  explanation:'A transition is the animated effect (such as a fade, wipe, or dissolve) that plays as the presentation moves from one slide to the next.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-045', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:2,
  question:'A student wants to add notes that she can read while presenting, but that the audience cannot see. Which feature should she use?',
  options:['Speaker notes','Slide master','Slide comments','Handout layout'],
  answer:'Speaker notes',
  explanation:'Speaker notes are typed in the notes panel below each slide. In Presenter View they are visible only to the presenter, not to the audience viewing the main screen.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-046', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:2,
  question:'Which of the following best describes a multimedia presentation?',
  options:['One that combines text, images, audio, video, and animations','One that uses only bullet points and text','One that consists of images on a white background','One that is delivered through a projector'],
  answer:'One that combines text, images, audio, video, and animations',
  explanation:'Multimedia refers to the combination of different media types — text, still images, audio, video, and animations — in a single product.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-047', chapterId:'g9ict-presentation', subsection:'animations', difficulty:3,
  question:'A student applies an entrance animation and then an exit animation to the same text box. In which order will the animations play?',
  options:['The entrance animation plays first, then the exit animation','The exit animation plays first, then the entrance animation','Both animations play at the same time','The animations play in reverse alphabetical order'],
  answer:'The entrance animation plays first, then the exit animation',
  explanation:'Entrance animations control how an object appears on the slide; exit animations control how it disappears. By default, entrance effects play before exit effects for the same object.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-048', chapterId:'g9ict-presentation', subsection:'authoring_tools', difficulty:3,
  question:'A student embeds a video in her presentation and saves the file. On another computer the video does not play. What is the most likely reason?',
  options:['The video was linked, not embedded','The transition setting disabled it','The video format is not supported','The software version is different'],
  answer:'The video was linked, not embedded',
  explanation:'A linked video is stored separately; the presentation holds only a path to it. When the file is moved to another computer without the video, the link breaks. Embedding stores the video inside the presentation file.' }));

// ── DATABASES ─────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-049', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:1,
  question:'In a database, what is a record?',
  options:['One complete set of data about a single item','One category of data stored across all items','A collection of related tables','A unique identifier for each entry'],
  answer:'One complete set of data about a single item',
  explanation:'A record is one row in a database table. It holds all the data about one particular item or person, such as all the details for a single student.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-050', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'What is a field in a database table?',
  options:['One category of data stored for every record in the table','One complete set of data about a single item','A unique identifier that links two tables','A condition used to filter which records are shown'],
  answer:'One category of data stored for every record in the table',
  explanation:'A field is one column in a database table. It stores one category of data — such as Name, Date of Birth, or Grade — for every record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-051', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
  question:'What is a primary key in a database?',
  options:['A field that uniquely identifies each record in a table','A field shared between two related tables','The first record entered into a table','The field used to sort records in alphabetical order'],
  answer:'A field that uniquely identifies each record in a table',
  explanation:'A primary key is a field whose value is unique for every record. No two records can share the same primary key value, so each record can always be found individually.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-052', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:3,
  question:'A student chooses "Book Title" as the primary key for a library database. Why might this cause a problem?',
  options:['Two different books could share the same title, so records would not be unique','Book titles are too long to store in a database field','Titles cannot be searched using a query','Titles may change when a new edition is published, making queries fail'],
  answer:'Two different books could share the same title, so records would not be unique',
  explanation:'A primary key must be unique for every record. If two books have the same title, the uniqueness rule is broken. A unique Book ID number would be a safer choice.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-053', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
  question:'What is the purpose of a query in a database?',
  options:['To search and display records that match specific criteria','To print database records in a formatted layout','To enter new records through a screen form','To link the columns of two tables together'],
  answer:'To search and display records that match specific criteria',
  explanation:'A query retrieves specific records from a database based on conditions set by the user. For example, a query might find all students who scored above 70%.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-054', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:1,
  question:'What is the purpose of a form in a database?',
  options:['To enter and view records','To search using a condition','To link two tables together','To print a summary report'],
  answer:'To enter and view records',
  explanation:'A form provides a structured, easy-to-use interface for entering, viewing, and editing records, making the process more straightforward than typing directly into the table.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-055', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
  question:'A school wants to print a neat, formatted summary of all exam results from a database. Which database object should they use?',
  options:['Report','Query','Form','Table'],
  answer:'Report',
  explanation:'A report is a database object designed to display and print data in a formatted layout, often with headings, grouped data, and totals.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-056', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:2,
  question:'Why does each table in a relational database need a primary key?',
  options:['So that every record can be uniquely identified and retrieved','So that the table can be sorted in ascending order automatically','So that two tables can share the same column name','So that the database file size stays small'],
  answer:'So that every record can be uniquely identified and retrieved',
  explanation:'A primary key guarantees that no two records are identical in their key value. This makes it possible to find, update, or delete exactly the right record without confusion.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-057', chapterId:'g9ict-databases', subsection:'queries', difficulty:3,
  question:'A query is set with the criterion: Age > 14 AND Grade = "Form 3". What will it return?',
  options:['Only Form 3 students who are also older than 14','All students who are older than 14 or in Form 3','All Form 3 students, regardless of age','All students older than 14, regardless of grade'],
  answer:'Only Form 3 students who are also older than 14',
  explanation:'When conditions are joined with AND, both must be true for a record to be included. The query returns records where the student is simultaneously older than 14 and in Form 3.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-058', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:3,
  question:'A Students table uses StudentID as its primary key. An Enrolments table holds StudentID as a foreign key. What does this enforce?',
  options:['Only StudentID values that exist in Students can appear in Enrolments','Each student can be enrolled in no more than one subject','Every student must have at least one enrolment record','The Enrolments table updates automatically when a student is added'],
  answer:'Only StudentID values that exist in Students can appear in Enrolments',
  explanation:'Referential integrity ensures that a foreign key value must match an existing primary key in the parent table. This prevents enrolment records from being created for students who do not exist.' }));

// ── NETWORKS ──────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-059', chapterId:'g9ict-networks', subsection:'topologies', difficulty:1,
  question:'In a bus topology, how are the computers connected?',
  options:['All computers share a single central cable','All computers connect to a central hub or switch','Computers are joined in a closed circle','Each computer connects to every other computer'],
  answer:'All computers share a single central cable',
  explanation:'In a bus topology, all devices are connected to one main cable called the backbone. Data travels along this shared cable to reach its destination.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-060', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'Which network topology connects every computer to a central hub or switch?',
  options:['Star topology','Bus topology','Ring topology','Mesh topology'],
  answer:'Star topology',
  explanation:'In a star topology, each device has its own cable connecting it to a central hub or switch. If one device fails, the rest of the network continues to work.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-061', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
  question:'What is one disadvantage of a bus topology?',
  options:['If the main cable fails, the entire network stops working','It requires an expensive central switch to operate','New computers are difficult to add to the network','Computers cannot share files with each other'],
  answer:'If the main cable fails, the entire network stops working',
  explanation:'In a bus topology all devices share the one backbone cable. A break anywhere in that cable stops all communication on the network.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-062', chapterId:'g9ict-networks', subsection:'network_types', difficulty:3,
  question:'A company has offices in three different countries and needs one network linking all of them. Which network type is most appropriate?',
  options:['Wide Area Network (WAN)','Local Area Network (LAN)','Metropolitan Area Network (MAN)','Personal Area Network (PAN)'],
  answer:'Wide Area Network (WAN)',
  explanation:'A WAN spans large geographical distances such as different cities or countries. A LAN covers only a small area such as a single building and is not suitable for connecting offices across different countries.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-063', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:1,
  question:'Which of the following is a web browser?',
  options:['Google Chrome','Google Search','Gmail','Google Drive'],
  answer:'Google Chrome',
  explanation:'Google Chrome is a web browser — software used to access and display web pages. Google Search is a search engine, Gmail is an email service, and Google Drive is cloud storage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-064', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:2,
  question:'What is the difference between a web browser and a search engine?',
  options:['A browser displays web pages; a search engine finds web pages','A browser finds web pages; a search engine displays them','They are different names for exactly the same tool','A search engine requires an internet connection; a browser does not'],
  answer:'A browser displays web pages; a search engine finds web pages',
  explanation:'A web browser (such as Chrome or Firefox) is software that renders and displays websites. A search engine (such as Google or Bing) is a service used to locate web pages by keyword.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-065', chapterId:'g9ict-internet', subsection:'email', difficulty:2,
  question:'What is an email attachment?',
  options:['A file sent along with an email message','A copy of an email forwarded to another person','A reply sent back to the original sender','An email saved in the Drafts folder'],
  answer:'A file sent along with an email message',
  explanation:'An email attachment is a file — such as a document, image, or spreadsheet — that is added to and sent together with an email message.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-066', chapterId:'g9ict-networks', subsection:'network_components', difficulty:3,
  question:'What is the difference between HTTP and HTTPS?',
  options:['HTTPS encrypts the data transmitted, making it more secure than HTTP','HTTP is faster because it uses fewer packets than HTTPS','HTTPS is used for email while HTTP is used for web pages','HTTP is for mobile devices while HTTPS is for desktop computers'],
  answer:'HTTPS encrypts the data transmitted, making it more secure than HTTP',
  explanation:'Both are protocols for transferring web pages. HTTPS (HyperText Transfer Protocol Secure) encrypts data using TLS, protecting it from being read if intercepted. HTTP sends data without encryption.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-067', chapterId:'g9ict-internet', subsection:'internet_www', difficulty:3,
  question:'A student receives an email from her bank asking her to click a link and confirm her password immediately. What type of cybercrime is this most likely to be?',
  options:['Phishing','Hacking','Identity fraud','Cyberbullying'],
  answer:'Phishing',
  explanation:'Phishing uses fake emails or websites that impersonate trusted organisations to trick people into revealing personal data such as passwords or bank details.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-068', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:3,
  question:'A home user pays a monthly fee to a company for access to the internet. What is that company called?',
  options:['Internet Service Provider (ISP)','Web browser publisher','Domain name registrar','Search engine operator'],
  answer:'Internet Service Provider (ISP)',
  explanation:'An Internet Service Provider (ISP) is a company that sells internet access to homes and businesses, usually for a recurring fee.' }));

// ── ETHICS, DATA PROTECTION & SECURITY ───────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-069', chapterId:'g9ict-ethics-security', subsection:'computer_ethics', difficulty:1,
  question:'What is computer ethics?',
  options:['A set of moral principles that guides the responsible use of computers','The study of how to prevent computer crimes','The legal protection given to software creators','A code of conduct that applies only to professional programmers'],
  answer:'A set of moral principles that guides the responsible use of computers',
  explanation:'Computer ethics refers to the moral principles and guidelines that govern how computers and technology should be used responsibly in everyday life.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-070', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:2,
  question:'Which of the following is an example of a cybercrime?',
  options:['Hacking into someone\'s computer without permission','Posting a photo of yourself on a social media profile','Using a search engine to look up information','Downloading a free app from an official store'],
  answer:'Hacking into someone\'s computer without permission',
  explanation:'Hacking — gaining unauthorised access to a computer or network — is a criminal offence. The other options are all legal activities.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-071', chapterId:'g9ict-ethics-security', subsection:'copyright_ownership', difficulty:2,
  question:'What is software piracy?',
  options:['Illegally copying or distributing copyrighted software','Accessing someone\'s computer without authorisation','Stealing personal data from a website','Sending large volumes of unwanted email'],
  answer:'Illegally copying or distributing copyrighted software',
  explanation:'Software piracy is the illegal copying, distribution, or use of software without permission from the copyright holder. It is a violation of copyright law.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-072', chapterId:'g9ict-ethics-security', subsection:'information_privacy', difficulty:2,
  question:'A student shares another student\'s personal contact details online without permission. Which principle has been violated?',
  options:['Information privacy','Copyright','Ergonomics','Network security'],
  answer:'Information privacy',
  explanation:'Information privacy is the right of individuals to keep their personal data confidential. Sharing someone\'s details without consent violates that right.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-073', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:3,
  question:'A person creates a fake online profile using someone else\'s identity in order to deceive others for financial gain. Which cybercrime is this?',
  options:['Identity fraud','Phishing','Cyberbullying','Software piracy'],
  answer:'Identity fraud',
  explanation:'Identity fraud involves pretending to be another person by using their name, photo, or personal details, often to gain money or deceive others.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-074', chapterId:'g9ict-ethics-security', subsection:'computer_ethics', difficulty:2,
  question:'Which of the following shows responsible use of a computer?',
  options:['Downloading software only from trusted, official sources','Sharing your password with a close friend for convenience','Copying a classmate\'s work and submitting it as your own','Visiting websites that the school network has blocked'],
  answer:'Downloading software only from trusted, official sources',
  explanation:'Using only trusted, official sources reduces the risk of installing malware or pirated software. Sharing passwords, copying work, and bypassing restrictions are all unethical behaviours.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-075', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:2,
  question:'Which of the following best describes cyberbullying?',
  options:['Using technology to repeatedly harass or intimidate another person','Gaining unauthorised access to a school\'s database','Copying software without the copyright holder\'s permission','Sending advertising messages to thousands of email addresses'],
  answer:'Using technology to repeatedly harass or intimidate another person',
  explanation:'Cyberbullying is the use of digital technology — social media, messaging, email — to bully, threaten, or humiliate someone repeatedly.' }));

// ── HEALTH & SAFETY ───────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-076', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:1,
  question:'What is ergonomics?',
  options:['The study of designing a safe and comfortable working environment','The study of computer networks and how they operate','The legal framework that governs the use of technology','A method of encrypting data to protect it from unauthorised access'],
  answer:'The study of designing a safe and comfortable working environment',
  explanation:'Ergonomics is the science of arranging a workstation — screen height, chair position, lighting, and so on — to suit the physical needs of the user and reduce the risk of injury.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-077', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
  question:'A student types for several hours without a break and develops pain in her wrists and hands. Which health problem is most likely?',
  options:['Repetitive strain injury','Noise-induced hearing loss','Photosensitive epilepsy','Colour blindness'],
  answer:'Repetitive strain injury',
  explanation:'Repetitive strain injury (RSI) is caused by repeating the same movements — such as typing or using a mouse — for long periods. It causes pain and stiffness in the wrists, hands, and arms.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-078', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:2,
  question:'Which of the following is a correct safety rule for a computer laboratory?',
  options:['Keep drinks and food away from all computer equipment','Place monitors as close to the face as possible for a clear view','Leave cables on the floor so they are easy to unplug when needed','Turn computers off by unplugging them from the wall socket'],
  answer:'Keep drinks and food away from all computer equipment',
  explanation:'Liquids and food can cause short circuits, electric shock, or permanent damage to equipment. Keeping them away from computers is a basic safety rule in any computer laboratory.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-079', chapterId:'g9ict-ethics-security', subsection:'social_economic_effects', difficulty:3,
  question:'A student in a rural village has no internet access, while students in the city use online resources daily for schoolwork. Which concept does this illustrate?',
  options:['The digital divide','Computer ethics','The Data Protection Act','Identity fraud'],
  answer:'The digital divide',
  explanation:'The digital divide is the gap between people who have ready access to computers and the internet and those who do not, often because of location, income, or infrastructure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-piv-080', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:3,
  question:'A user works at a computer for eight hours a day. Which combination of measures best reduces health risks?',
  options:['Taking regular screen breaks, positioning the monitor at eye level, and using a wrist rest','Working in a dark room, maximising screen brightness, and sitting as close to the screen as possible','Standing at a standing desk for the entire working day without any sitting','Alternating between two computers so that each device is used for four hours'],
  answer:'Taking regular screen breaks, positioning the monitor at eye level, and using a wrist rest',
  explanation:'Regular breaks reduce eye strain and RSI, positioning the monitor at eye level prevents neck strain, and a wrist rest reduces wrist fatigue. Together these measures significantly lower the health risks of prolonged computer use.' }));

})();
