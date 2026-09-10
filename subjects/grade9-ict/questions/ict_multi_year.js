'use strict';
// NCE ICT multi-year questions — inspired by 2023 past paper.
// IDs g9ict-my-001 to g9ict-my-040. All subsection ids match _manifest.js.
(function () {

// ── Chapter: Computer Systems ─────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-001', chapterId: 'g9ict-computer-systems', subsection: 'output_devices',
  difficulty: 1,
  question: 'Which device is used to produce a <b>hard copy</b> of a document?',
  options: ['Printer', 'Monitor', 'Scanner', 'Mouse'],
  answer: 'Printer',
  explanation: 'A printer produces a physical (hard) copy of a document on paper. A monitor displays a soft copy on screen; a scanner converts paper to digital.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-002', chapterId: 'g9ict-computer-systems', subsection: 'storage_devices',
  difficulty: 1,
  question: 'A small rectangular device that is plugged into a USB port to store files is called a:',
  options: ['Pendrive', 'Compact disc', 'Memory card', 'Hard disc drive'],
  answer: 'Pendrive',
  explanation: 'A pendrive (also called a USB flash drive) connects via a USB port and uses flash memory to store data portably. It is a secondary storage device.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-003', chapterId: 'g9ict-computer-systems', subsection: 'data_units',
  difficulty: 2,
  question: 'How many bits are there in <b>one byte</b>?',
  options: ['8', '4', '2', '16'],
  answer: '8',
  explanation: '1 byte = 8 bits. A bit is the smallest unit of data (0 or 1); 8 bits grouped together form one byte, which can represent values from 0 to 255.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-004', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory',
  difficulty: 2,
  question: 'Which type of computer is a <b>laptop</b>?',
  options: ['Microcomputer', 'Mainframe', 'Minicomputer', 'Supercomputer'],
  answer: 'Microcomputer',
  explanation: 'Laptops, desktops, tablets and smartphones are all microcomputers — personal computers built around a single microprocessor. Mainframes and supercomputers are far larger and more powerful.'
}));

// ── Chapter: Software & OS ────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-005', chapterId: 'g9ict-software-os', subsection: 'os_types',
  difficulty: 1,
  question: 'Which of the following operating systems is designed for use on <b>smartphones</b>?',
  options: ['Android', 'Windows 10', 'Mac OS', 'Linux'],
  answer: 'Android',
  explanation: 'Android (Google) is the most widely used mobile OS, designed for smartphones and tablets. Windows 10 and Mac OS are desktop operating systems; Linux has mobile variants but Android dominates.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-006', chapterId: 'g9ict-software-os', subsection: 'os_functions',
  difficulty: 2,
  question: 'Which of the following is a function of an <b>operating system</b>?',
  options:['Manage hardware and software','Design web pages with HTML','Create spreadsheet formulas','Produce printed documents'],
  answer:'Manage hardware and software',
  explanation: 'The OS acts as an interface between hardware and software. Its key functions include memory management, processor scheduling, file management and device control.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-007', chapterId: 'g9ict-software-os', subsection: 'utility_programs',
  difficulty: 2,
  question: 'Which OS function prevents <b>unauthorised access</b> to a computer by requiring a username and password?',
  options: [
    'System Security Management',
    'Memory Management',
    'Processor Management',
    'File Management'
  ],
  answer: 'System Security Management',
  explanation: 'System Security Management controls who can access the computer and its resources. It enforces logins, permissions and access rights to protect data.'
}));

// ── Chapter: Troubleshooting ──────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-008', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques',
  difficulty: 1,
  question: 'A computer <b>freezes</b> completely and does not respond to any input. What should the user do first?',
  options: ['Switch off the power', 'Unplug the monitor', 'Change the keyboard', 'Replace the hard drive'],
  answer: 'Switch off the power',
  explanation: 'When a computer freezes and is unresponsive, switching it off and restarting is the standard first step. This clears the memory and allows the system to restart cleanly.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-009', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_steps',
  difficulty: 2,
  question: 'A student accidentally deletes a file. What is the correct sequence of steps to <b>restore</b> it?',
  options: [
    '1. Open Recycle Bin → 2. Right-click the file → 3. Click Restore',
    '1. Right-click the file → 2. Open Recycle Bin → 3. Click Restore',
    '1. Click Restore → 2. Open Recycle Bin → 3. Right-click the file',
    '1. Open Recycle Bin → 2. Click Restore → 3. Right-click the file'
  ],
  answer: '1. Open Recycle Bin → 2. Right-click the file → 3. Click Restore',
  explanation: 'To restore a deleted file: first open the Recycle Bin, then right-click the file to see options, then select Restore to return it to its original location.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-010', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques',
  difficulty: 1,
  question: 'A <b>paper jam</b> inside a printer will:',
  options:['Stop the printer working','Blank the monitor screen','Delete files from the PC','Speed up the printing'],
  answer:'Stop the printer working',
  explanation: 'A paper jam blocks the paper path inside the printer and stops it from printing. The jam must be carefully removed before printing can resume.'
}));

// ── Chapter: Word Processing ──────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-011', chapterId: 'g9ict-word-processing', subsection: 'text_formatting',
  difficulty: 1,
  question: 'In the date "29 <b style="text-decoration:underline">March</b> 2022", the word March appears in bold and is underlined. Which formatting combination has been applied?',
  options: ['Bold and underline', 'Bold and italic', 'Italic and underline', 'Bold only'],
  answer: 'Bold and underline',
  explanation: 'Bold makes text heavier/darker; underline adds a line beneath the text. Both have been applied here. Italic would slant the letters.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-012', chapterId: 'g9ict-word-processing', subsection: 'word_icons',
  difficulty: 1,
  question: 'A button on the title bar shows an <b>X</b> inside a rectangle. What does clicking this button do?',
  options: ['Close the window', 'Minimise the window', 'Maximise the window', 'Restore the window'],
  answer: 'Close the window',
  explanation: 'The X button (Close) on the title bar closes the application window. Minimise hides it to the taskbar; Maximise/Restore changes its size.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-013', chapterId: 'g9ict-word-processing', subsection: 'page_layout',
  difficulty: 2,
  question: 'A <b>page break</b> in a word-processed document is used to:',
  options: [
    'Separate contents between pages',
    'Change the page orientation from portrait to landscape',
    'Divide a page into sections with different formatting',
    'Insert a table of contents automatically'
  ],
  answer: 'Separate contents between pages',
  explanation: 'A page break forces the cursor to the top of the next page, keeping sections of content on separate pages. It is different from a section break, which allows different formatting.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-014', chapterId: 'g9ict-word-processing', subsection: 'toc_lists',
  difficulty: 2,
  question: 'Which tab in Microsoft Word is used to insert a <b>table of contents</b>?',
  options: ['References', 'View', 'Mailings', 'Insert'],
  answer: 'References',
  explanation: 'The References tab contains the Table of Contents tool. Word generates the TOC automatically from headings already formatted in the document.'
}));

// ── Chapter: Spreadsheets ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-015', chapterId: 'g9ict-spreadsheets', subsection: 'formulas',
  difficulty: 2,
  question: 'In a spreadsheet, column B holds cost prices and column C holds selling prices. Which formula calculates the <b>profit per item</b> in cell D3?',
  options: ['=C3−B3', '=B3/C3', '=MIN(B3:C3)', '=B3+C3'],
  answer: '=C3−B3',
  explanation: 'Profit = Selling price − Cost price, so the formula is =C3−B3. Division or MIN would not give profit; addition would give the sum, not the difference.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-016', chapterId: 'g9ict-spreadsheets', subsection: 'functions',
  difficulty: 2,
  question: 'Profit per item values are in cells D3 to D7. Which formula in cell D8 calculates the <b>total profit</b>?',
  options: ['=SUM(D3:D7)', '=AVERAGE(D3:D7)', '=COUNT(D3:D7)', '=MAX(D3:D7)'],
  answer: '=SUM(D3:D7)',
  explanation: 'SUM adds all values in the specified range. =SUM(D3:D7) adds the five profit values in D3 through D7 to give the total profit.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-017', chapterId: 'g9ict-spreadsheets', subsection: 'formulas',
  difficulty: 3,
  question: 'Column E contains the number of items in stock. Items with fewer than 50 need reordering. Which formula in cell F3 shows "YES" if reorder is needed and "NO" if not?',
  options: ['=IF(E3<50,"YES","NO")', '=IF(E3>50,"YES","NO")', '=IF(E3=50,"YES","NO")', '=IF(E3<=50,"NO","YES")'],
  answer: '=IF(E3<50,"YES","NO")',
  explanation: 'The IF function checks a condition: if E3 is less than 50 the result is "YES" (reorder needed); otherwise "NO". The comparison operator < means "less than".'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-018', chapterId: 'g9ict-spreadsheets', subsection: 'functions',
  difficulty: 3,
  question: 'Column F shows "YES" or "NO" for whether each item needs reordering. Two items show "YES". What does <code>=COUNTIF(F3:F7,"YES")</code> return?',
  options: ['2', '3', '5', '0'],
  answer: '2',
  explanation: 'COUNTIF counts cells in the range F3:F7 that contain "YES". With two items marked YES, the result is 2.'
}));

// ── Chapter: Databases ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-019', chapterId: 'g9ict-databases', subsection: 'db_structure',
  difficulty: 2,
  question: 'A <b>primary key</b> in a database table is a field that:',
  options: [
    'Uniquely identifies each record in the table',
    'Stores the largest value in the table',
    'Links two tables together (a foreign key)',
    'Contains the most recently entered data'
  ],
  answer: 'Uniquely identifies each record in the table',
  explanation: 'A primary key is a field (or combination of fields) whose value is unique for every row in the table. It is used to identify and locate individual records without ambiguity.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-020', chapterId: 'g9ict-databases', subsection: 'db_structure',
  difficulty: 1,
  question: 'In a database table, each <b>row</b> represents a:',
  options: ['Record', 'Field', 'Query', 'Report'],
  answer: 'Record',
  explanation: 'A row in a database table is a record — all the information about one entity (e.g. one flight, one student). A column is a field (one attribute of that entity).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-021', chapterId: 'g9ict-databases', subsection: 'db_tables',
  difficulty: 2,
  question: 'The FLIGHTS table has columns: FLIGHT_ID, FLIGHT_NAME, DEPARTURE, LOCATION, DESTINATION. How many <b>fields</b> does the table have?',
  options: ['5', '6', '4', '3'],
  answer: '5',
  explanation: 'Each column in a database table is a field. The FLIGHTS table has five columns: FLIGHT_ID, FLIGHT_NAME, DEPARTURE, LOCATION and DESTINATION.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-022', chapterId: 'g9ict-databases', subsection: 'queries',
  difficulty: 3,
  question: 'A query selects all records from the FLIGHTS table where DEPARTURE = 23:00, sorted by FLIGHT_ID ascending. The table has flights SP-205 (23:00) and EM-234 (23:00). What is the output?',
  options: ['EM-234, SP-205', 'SP-205, EM-234', 'Only SP-205', 'Only EM-234'],
  answer: 'EM-234, SP-205',
  explanation: 'Sorted ascending by FLIGHT_ID: EM-234 comes before SP-205 alphabetically (E before S). Both match DEPARTURE = 23:00 so both appear, in that order.'
}));

// ── Chapter: Networks ─────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-023', chapterId: 'g9ict-networks', subsection: 'topologies',
  difficulty: 2,
  question: 'A network topology in which all computers are connected to a <b>central device</b> (such as a switch or hub) is called a:',
  options: ['Star topology', 'Bus topology', 'Ring topology', 'Mesh topology'],
  answer: 'Star topology',
  explanation: 'In a star topology, each device connects individually to a central hub or switch. If one connection fails, only that device is affected — the rest of the network continues.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-024', chapterId: 'g9ict-networks', subsection: 'network_types',
  difficulty: 2,
  question: 'An <b>Intranet</b> is best described as:',
  options: [
    'A private network for use within an organisation',
    'The global public network connecting billions of computers',
    'A network that connects computers across a city',
    'A network that uses satellite links'
  ],
  answer: 'A private network for use within an organisation',
  explanation: 'An intranet uses the same technology as the Internet but is restricted to authorised users within a company or institution. It is not accessible to the general public.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-025', chapterId: 'g9ict-networks', subsection: 'network_basics',
  difficulty: 2,
  question: 'Which of the following best describes the <b>Internet</b>?',
  options:['A global network of computers','Software for browsing web pages','A single computer storing pages','A private network for staff only'],
  answer:'A global network of computers',
  explanation: 'The Internet is a worldwide system of interconnected networks. Web browsers are software used to access its resources; websites live on servers connected to this network.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-026', chapterId: 'g9ict-networks', subsection: 'network_components',
  difficulty: 2,
  question: 'A <b>computer virus</b> is best described as:',
  options:['A program that damages a computer','A hardware fault in the processor','A tool that scans for malware','A type of network cable'],
  answer:'A program that damages a computer',
  explanation: 'A virus is malicious software (malware) that can copy itself, corrupt files, slow the system, or give unauthorised access. It is combated with antivirus software.'
}));

// ── Chapter: Internet ─────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-027', chapterId: 'g9ict-internet', subsection: 'browsers_search',
  difficulty: 1,
  question: 'Which of the following is a <b>search engine</b>?',
  options: ['Google', 'Skype', 'Gmail', 'WhatsApp'],
  answer: 'Google',
  explanation: 'Google is a search engine — it indexes billions of web pages and returns results matching a user\'s query. Skype and WhatsApp are communication apps; Gmail is an email service.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-028', chapterId: 'g9ict-internet', subsection: 'web_tools',
  difficulty: 2,
  question: 'An <b>online forum</b> is a website used for:',
  options: ['Online discussions and debates', 'Sending private emails', 'Storing files in the cloud', 'Running spreadsheet formulas'],
  answer: 'Online discussions and debates',
  explanation: 'Online forums are platforms where users post messages, reply to each other and discuss topics. Examples include Reddit and specialised community boards.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-029', chapterId: 'g9ict-internet', subsection: 'email',
  difficulty: 2,
  question: 'A <b>mailing list</b> is a collection of:',
  options:['contact details for group email','spam blocked by the mail filter','folders for organising received mail','deleted emails in the trash folder'],
  answer:'contact details for group email',
  explanation: 'A mailing list stores contact information so that one message can be sent to many recipients at once — used for newsletters, announcements and group communications.'
}));

// ── Chapter: Algorithms ───────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-030', chapterId: 'g9ict-algorithms', subsection: 'control_structures',
  difficulty: 2,
  question: 'In programming, a <b>loop</b> is a control structure in which:',
  options: [
    'Statements are executed multiple times',
    'Statements are executed in the order they appear',
    'Statements are executed only if a condition is met',
    'Statements are never executed'
  ],
  answer: 'Statements are executed multiple times',
  explanation: 'A loop (repetition) repeats a block of statements a set number of times or until a condition changes. Examples include FOR loops and WHILE loops.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-031', chapterId: 'g9ict-algorithms', subsection: 'control_structures',
  difficulty: 2,
  question: 'In programming, a <b>selection</b> structure means:',
  options: [
    'Statements are executed only if a certain condition is met',
    'Statements are repeated a fixed number of times',
    'Statements are always run from top to bottom',
    'Statements that are never run in any program'
  ],
  answer: 'Statements are executed only if a certain condition is met',
  explanation: 'Selection (IF-THEN-ELSE) checks a condition and executes different code depending on whether the condition is true or false.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-032', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading',
  difficulty: 3,
  question: 'A flowchart inputs values P and Q, then asks: "Is P &lt; Q?" If YES it outputs "P is small"; if NO it outputs "P is large". If P = 3 and Q = 5, what is the output?',
  options: ['"P is small"', '"P is large"', 'Nothing is output', '"P = 3"'],
  answer: '"P is small"',
  explanation: 'Is 3 < 5? Yes. The YES branch outputs "P is small". The NO branch would output "P is large" only if P ≥ Q.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-033', chapterId: 'g9ict-algorithms', subsection: 'control_structures',
  difficulty: 1,
  question: 'Which control structure describes executing instructions <b>in the order in which they appear</b>, one after another?',
  options: ['Sequence', 'Selection', 'Loop', 'Function'],
  answer: 'Sequence',
  explanation: 'Sequence is the simplest control structure: instructions are carried out one at a time, from top to bottom, in the order they are written.'
}));

// ── Chapter: Presentation ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-034', chapterId: 'g9ict-presentation', subsection: 'notes_handouts',
  difficulty: 1,
  question: 'A <b>handout</b> in a presentation is:',
  options: [
    'A printed copy of the presentation slides',
    'A digital animation added to each slide',
    'The slide background design',
    'A video clip embedded in the presentation'
  ],
  answer: 'A printed copy of the presentation slides',
  explanation: 'Handouts are paper copies of the presentation given to the audience. They can show one, two, three, four, six or nine slides per page.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-035', chapterId: 'g9ict-presentation', subsection: 'design_templates',
  difficulty: 2,
  question: 'Applying a <b>design template</b> to a presentation will:',
  options:['Change the colours and fonts used','Add new slides to the presentation','Delete all the text from the slides','Convert the presentation to a video'],
  answer:'Change the colours and fonts used',
  explanation: 'A design template (theme) applies a consistent colour scheme, font set and background to every slide, giving the presentation a professional and uniform appearance.'
}));

// ── Chapter: Ethics & Security ────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-036', chapterId: 'g9ict-ethics-security', subsection: 'computer_ethics',
  difficulty: 2,
  question: 'Is it ethical to use someone else\'s <b>password</b> to log into a computer system?',
  options: [
    'No — it violates privacy and is a form of unauthorised access',
    'Yes — if you need access urgently',
    'Yes — as long as you do not change any files',
    'No — but only if the computer belongs to a company'
  ],
  answer: 'No — it violates privacy and is a form of unauthorised access',
  explanation: 'Using another person\'s password without permission is unethical and often illegal. It breaches privacy and may constitute unauthorised access under data protection laws.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-037', chapterId: 'g9ict-ethics-security', subsection: 'data_backups',
  difficulty: 1,
  question: '<b>Backup</b> means to:',
  options:['Keep a spare copy of a document','Save a modified document under a new name','Delete the original after sending it','Print a document for safekeeping'],
  answer:'Keep a spare copy of a document',
  explanation: 'A backup is a duplicate of data stored separately. If the original is lost, corrupted or accidentally deleted, the backup can be used to restore it.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-038', chapterId: 'g9ict-ethics-security', subsection: 'data_security',
  difficulty: 1,
  question: 'Which of the following is an example of a <b>computer crime</b>?',
  options: ['Hacking into a computer system', 'Playing an online game', 'Printing a document', 'Saving a file to a USB drive'],
  answer: 'Hacking into a computer system',
  explanation: 'Hacking (gaining unauthorised access to a system) is a criminal offence. Other computer crimes include spreading viruses, phishing and software piracy.'
}));

// ── Chapter: Health & Safety ──────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-039', chapterId: 'g9ict-health-safety', subsection: 'lab_guidelines',
  difficulty: 1,
  question: 'Which of the following is a correct <b>rule for a computer laboratory</b>?',
  options: [
    'No food or drinks are allowed near the computers',
    'Students may play music through the lab speakers',
    'Mobile phones should be left on the desk during lessons',
    'Multiple users can share one login account'
  ],
  answer: 'No food or drinks are allowed near the computers',
  explanation: 'Food and drinks can spill onto keyboards and components, causing damage or electric shock. Keeping them out of the lab protects the equipment and users.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9ict-my-040', chapterId: 'g9ict-health-safety', subsection: 'health_hazards',
  difficulty: 2,
  question: 'Staring at a computer screen for long hours without breaks can lead to:',
  options: ['Eye strain', 'Repetitive Strain Injury', 'Back pain', 'Hearing loss'],
  answer: 'Eye strain',
  explanation: 'Prolonged screen use causes eye fatigue, dryness and blurred vision — collectively called eye strain. RSI affects wrists/hands from repetitive movements; back pain comes from poor posture.'
}));

})();
