'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2024 Information & Communication Technology - past-paper questions
//  adapted to MCQ format, plus the written questions for the past-papers
//  screen. Source: Mauritius Examinations Syndicate,
//  past-papers/nce/ict/NCE-2024-Information-Communication-Technology (1).pdf
//  Section A (Q1-5, 50 marks) + Section B (Q6-11, 50 marks).
//
//  ⚠ Nine figures are cropped from the paper into assets/past-papers/
//    g9-ict-2024/. THIS PAPER CANNOT BE TRANSCRIBED WITHOUT THEM: a third of
//    Question 1 is "which device is shown below", Q6 hangs entirely on a
//    screenshot of a System properties window, and Q8 is ten marks about one
//    spreadsheet. Describing those in prose either removes the skill being
//    assessed (reading a screen) or states the answer outright.
//
//  ⚠ HOW THE CROPS WERE MADE, because there is no rasteriser on this machine:
//    poppler here is pdftotext ONLY - no pdftoppm, no pdftocairo - so the
//    pages were rendered through Chrome's PDF viewer over CDP and cropped with
//    Page.captureScreenshot's `clip` (scratchpad/pdf-crop.js, `crop` mode,
//    coordinates in CSS px of a 1000x1400 viewport at zoom=page-fit).
//    ⚠ Chrome does NOT re-navigate on a hash-only change, so every capture came
//      back byte-identical until the tab was blanked between pages.
//
//  ⚠ ALT TEXT NEVER NAMES THE ANSWER. "A photograph of a hand-held scanning
//    device" - not "a barcode reader"; "a screenshot of a system information
//    window" - not the values it holds.
//
//  ⚠ These images live under assets/past-papers/, NOT assets/questions/. That
//    directory is the bundled-Wikimedia set with its own provenance.json and
//    generated credits page; exam crops are a separate, pre-existing
//    convention (see g6-science-2024) and carry no provenance entry.
// ══════════════════════════════════════════════════════════════════════════

const _g9ict24 = (file, alt) =>
  `<img src="assets/past-papers/g9-ict-2024/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

STATIC_QUESTIONS.push(

  // ── Question 1: fifteen one-mark multiple-choice items ──────────────────

  makeMCQ({ id:'g9ict-pp24-001', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:1,
    question:'Which one of the following is an <b>output</b> device?',
    options:['Plotter','Touchpad','Microphone','Joystick'], answer:'Plotter',
    hint:'An output device sends information OUT of the computer to the user.',
    explanation:'A <b>plotter</b> draws the computer’s output onto paper, so it is an output device. A touchpad, microphone and joystick all send data <i>into</i> the computer.' }),

  makeMCQ({ id:'g9ict-pp24-002', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:1,
    question:'How many <b>bits</b> make up a <b>byte</b>?',
    options:['8 bits','4 bits','12 bits','16 bits'], answer:'8 bits',
    hint:'It is the number of bits needed to store one character.',
    explanation:'One byte is <b>8 bits</b>. That is enough to hold a single character of text, which is why file sizes are measured in bytes.' }),

  makeMCQ({ id:'g9ict-pp24-003', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:1,
    question:'Which component prevents the <b>CPU from overheating</b>?',
    options:['Fan','Sound card','Graphics card','Motherboard'], answer:'Fan',
    hint:'Which part moves air across the processor?',
    explanation:'A <b>fan</b> (with a heat sink) blows air across the CPU to carry heat away. Without it the processor would overheat and shut down.' }),

  makeMCQ({ id:'g9ict-pp24-004', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:1,
    question:'Which one of the following stores data <b>temporarily</b>?',
    options:['RAM','ROM','Hard Disk','CD ROM'], answer:'RAM',
    hint:'Which memory loses its contents when the power goes off?',
    explanation:'<b>RAM</b> is volatile: it holds the programs and data in use right now and is emptied when the computer is switched off. ROM, a hard disk and a CD keep their contents.' }),

  makeMCQ({ id:'g9ict-pp24-005', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:2,
    question:'Which <b>device</b> is shown in the picture below?' +
      _g9ict24('d1-device', 'A photograph of a hand-held device being passed over a printed stripe pattern'),
    options:['Barcode reader','Digital camera','Headphone','Printer'], answer:'Barcode reader',
    hint:'Look at what the device is being held over - those stripes are read at a supermarket till.',
    explanation:'The stripes are a barcode, and the hand-held unit reading them is a <b>barcode reader</b> - an input device that turns the pattern of bars into a product number.' }),

  makeMCQ({ id:'g9ict-pp24-006', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'The spreadsheet below shows the marks obtained by Ravi in a test.' +
      _g9ict24('d2-marks-sheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows holding subjects and marks') +
      'In which <b>cell</b> do the marks for <b>French</b> appear?',
    options:['B3','A3','B2','A2'], answer:'B3',
    hint:'A cell address is its COLUMN letter followed by its ROW number.',
    explanation:'French is on row 3, and the marks are in column B, so the cell address is <b>B3</b>. A3 holds the word “French” itself, not the mark.' }),

  makeMCQ({ id:'g9ict-pp24-007', chapterId:'g9ict-presentation', subsection:'comic_strips', difficulty:2,
    question:'Which <b>speech balloon</b> is used when you want your character to <b>tell a secret</b>?',
    options:['Whisper Balloon','Sound Balloon','Thought Balloon','General Speech Balloon'], answer:'Whisper Balloon',
    hint:'A secret is spoken quietly, not thought and not shouted.',
    explanation:'A <b>whisper balloon</b> (usually drawn with a dashed outline) shows words spoken quietly so other characters cannot hear. A thought balloon shows what a character thinks but does not say.' }),

  makeMCQ({ id:'g9ict-pp24-008', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
    question:'Which <b>component</b> is used to connect <b>two LANs</b>?',
    options:['Router','Switch','Server','Cable'], answer:'Router',
    hint:'Which device passes traffic between two separate networks rather than within one?',
    explanation:'A <b>router</b> joins two networks together and decides which way to send traffic between them. A switch connects devices <i>inside</i> one LAN.' }),

  makeMCQ({ id:'g9ict-pp24-009', chapterId:'g9ict-networks', subsection:'network_components', difficulty:2,
    question:'Which <b>hardware component</b> is shown below?' +
      _g9ict24('d3-hardware', 'A photograph of a circuit board with a metal bracket and a square socket on the bracket'),
    options:['Network Interface Card','Internal Memory','Hard-disk','Wireless Fidelity Card'], answer:'Network Interface Card',
    hint:'Look at the socket on the metal bracket - what kind of cable plugs into that?',
    explanation:'The square RJ45 socket on the bracket takes a network cable, so this is a <b>Network Interface Card</b>. A wireless card would have an aerial rather than a cable socket.' }),

  makeMCQ({ id:'g9ict-pp24-010', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
    question:'Which <b>health problem</b> may be caused when a <b>mouse</b> is used for a long time?',
    options:['Repetitive strain injury','Headache','Eye strain','Back pain'], answer:'Repetitive strain injury',
    hint:'Think about the same small hand movement being made over and over.',
    explanation:'Gripping and clicking a mouse repeats the same small movement for hours, which damages tendons and nerves in the hand and wrist - <b>repetitive strain injury</b>. Eye strain comes from the screen, not the mouse.' }),

  makeMCQ({ id:'g9ict-pp24-011', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:1,
    question:'Which of the following is a popular <b>videoconferencing</b> software?',
    options:['Skype','Twitter','Wiki','Facebook'], answer:'Skype',
    hint:'Which one is built for live audio and video calls?',
    explanation:'<b>Skype</b> is designed for live video and voice calls. The others are for posting or editing text and pictures, not for holding a meeting.' }),

  makeMCQ({ id:'g9ict-pp24-012', chapterId:'g9ict-internet', subsection:'e_services', difficulty:1,
    question:'Which one of the following is <b>required for e-learning</b>?',
    options:['Laptop','Book','Calculator','Whiteboard'], answer:'Laptop',
    hint:'E-learning means learning delivered electronically, over a network.',
    explanation:'E-learning needs a computing device that can connect to the internet, so a <b>laptop</b> is required. A book, calculator or ordinary whiteboard cannot deliver an online lesson.' }),

  makeMCQ({ id:'g9ict-pp24-013', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
    question:'Which <b>shape</b> is used for a <b>“Decision Box”</b> in a flowchart?',
    options:['A diamond','A rectangle','A parallelogram','An oval'], answer:'A diamond',
    hint:'A decision has more than one way out, so the shape has corners for the branches.',
    explanation:'A decision box is a <b>diamond</b>, with a Yes branch and a No branch leaving it. A rectangle is a process, a parallelogram is input/output and an oval is start or stop.' }),

  makeMCQ({ id:'g9ict-pp24-014', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:2,
    question:'Which feature in MS Word allows the word <b>“DRAFT”</b> to be placed behind the text of a document, as shown below?' +
      _g9ict24('d5-watermark', 'A page of text with a large faint word printed diagonally behind it'),
    options:['Watermark','Page Borders','Ruler','Page Color'], answer:'Watermark',
    hint:'The word sits faintly BEHIND the text, across the whole page.',
    explanation:'A <b>watermark</b> is faint text or an image placed behind the document text, used to mark a page as DRAFT or CONFIDENTIAL. Page Color would fill the whole background with one colour.' }),

  // ── Question 2(b): fill in the blanks ───────────────────────────────────

  makeMCQ({ id:'g9ict-pp24-015', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
    question:'In a .......... topology every node is connected to a <b>single cable</b>.',
    options:['bus','mesh','star','ring'], answer:'bus',
    hint:'Picture one long backbone cable with every machine tapping into it.',
    explanation:'A <b>bus</b> topology runs one backbone cable and every node connects to it. If that single cable breaks, the whole network goes down - which is the weakness of the design.' }),

  makeMCQ({ id:'g9ict-pp24-016', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:1,
    question:'An example of a <b>free operating system</b> is ...........',
    options:['Linux','Windows','macOS','Wifi'], answer:'Linux',
    hint:'Which one can be downloaded and used without paying a licence fee?',
    explanation:'<b>Linux</b> is free and open source - anyone may download, use and modify it. Windows and macOS are commercial products.' }),

  makeMCQ({ id:'g9ict-pp24-017', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:1,
    question:'Mobile phones can be connected to the internet using ...........',
    options:['Wifi','a bus','Linux','a backup'], answer:'Wifi',
    hint:'Which of these is a way of connecting without a cable?',
    explanation:'<b>Wifi</b> connects a phone to a network over radio waves, with no cable. The others are a network layout, an operating system and a way of protecting data.' }),

  makeMCQ({ id:'g9ict-pp24-018', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:1,
    question:'A .......... is a software that can <b>slow down</b> a computer.',
    options:['virus','backup','browser','firewall'], answer:'virus',
    hint:'Which one is malicious software that a computer catches?',
    explanation:'A <b>virus</b> is malicious software that copies itself and consumes memory and processor time, which is why an infected machine runs slowly.' }),

  makeMCQ({ id:'g9ict-pp24-019', chapterId:'g9ict-ethics-security', subsection:'data_backups', difficulty:2,
    question:'The purpose of a .......... is to <b>keep data secure</b> in case the original is lost.',
    options:['backup','virus','browser','topology'], answer:'backup',
    hint:'What do you make so that losing the original does not lose the data?',
    explanation:'A <b>backup</b> is a second copy of the data kept somewhere else, so the information survives a deletion, a hardware failure, a fire or a flood.' }),

  // ── Question 3: true or false ───────────────────────────────────────────

  makeTF({ id:'g9ict-pp24-020', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
    question:'A <b>laser printer is slower</b> than an inkjet printer.', answer:false,
    hint:'Which type is used in busy offices for long print runs?',
    explanation:'False. A <b>laser printer is faster</b> - it forms a whole page at a time, which is why offices use them for large jobs. An inkjet builds the page line by line.' }),

  makeTF({ id:'g9ict-pp24-021', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:1,
    question:'A <b>page break</b> helps to separate content between pages.', answer:true,
    hint:'What does inserting one do to the text after it?',
    explanation:'True. A <b>page break</b> forces everything after it onto a new page, which keeps sections apart no matter how the text above is edited.' }),

  makeTF({ id:'g9ict-pp24-022', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
    question:'A <b>conditional formatting</b> rule cannot be removed in Excel.', answer:false,
    hint:'Is formatting ever permanent in a spreadsheet?',
    explanation:'False. Conditional formatting rules can be edited or deleted at any time through <b>Manage Rules</b>. Nothing about a spreadsheet’s formatting is permanent.' }),

  makeTF({ id:'g9ict-pp24-023', chapterId:'g9ict-presentation', subsection:'slide_masters', difficulty:3,
    question:'In a PowerPoint presentation, you <b>cannot use more than one slide master</b>.', answer:false,
    hint:'Could one presentation need two different section designs?',
    explanation:'False. A presentation may contain <b>several slide masters</b>, so different sections can carry different designs while each section stays internally consistent.' }),

  makeTF({ id:'g9ict-pp24-024', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
    question:'In a <b>star topology</b>, nodes are connected to a central computer.', answer:true,
    hint:'Picture the shape the cables make.',
    explanation:'True. Every node has its own cable to a central device, forming a star. One node’s cable failing therefore affects only that node - unlike a bus.' }),

  makeTF({ id:'g9ict-pp24-025', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:2,
    question:'A <b>firewall</b> can be a hardware or a software.', answer:true,
    hint:'Does it have to be a physical box?',
    explanation:'True. A firewall may be a dedicated hardware device on the edge of a network, or a program running on the computer itself. Both filter traffic against a set of rules.' }),

  makeTF({ id:'g9ict-pp24-026', chapterId:'g9ict-ethics-security', subsection:'information_privacy', difficulty:1,
    question:'<b>Personal information</b> should be shared with everybody.', answer:false,
    hint:'Think about who could use your address or ID number, and how.',
    explanation:'False. Personal information should be shared only with people who need it and can be trusted. Sharing it openly invites identity theft, fraud and unwanted contact.' }),

  makeTF({ id:'g9ict-pp24-027', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
    question:'In a flowchart, <b>flowlines</b> indicate the movement of data.', answer:true,
    hint:'What do the arrows between the boxes tell you?',
    explanation:'True. Flowlines are the arrows joining the symbols; they show the order the steps run in and how data moves from one step to the next.' }),

  makeTF({ id:'g9ict-pp24-028', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:3,
    question:'The <b>Report Wizard</b> is located in the <b>Home Tab</b> in MS Access.', answer:false,
    hint:'Which tab do you use to make a new object in Access?',
    explanation:'False. The Report Wizard is on the <b>Create</b> tab, along with the other tools that make new tables, queries, forms and reports. The Home tab holds views, clipboard and formatting.' }),

  makeTF({ id:'g9ict-pp24-029', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:2,
    question:'<b>Python</b> is an example of a database software.', answer:false,
    hint:'Is Python something you store data in, or something you write instructions in?',
    explanation:'False. Python is a <b>programming language</b>. Database software - MS Access, MySQL - stores and queries data; a Python program may talk to a database but is not one.' }),

  // ── Question 4: hardware for a task, and term matching ──────────────────

  makeMCQ({ id:'g9ict-pp24-030', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:2,
    question:'Which hardware device <b>stores pictures in digital cameras</b>?',
    options:['Memory Card','Projector','Touchscreen','3D Printer'], answer:'Memory Card',
    hint:'It is small, removable, and slots into the camera.',
    explanation:'A <b>memory card</b> is removable flash storage small enough for a camera, and it can be taken out and read on a computer.' }),

  makeMCQ({ id:'g9ict-pp24-031', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
    question:'Which hardware device <b>creates real world objects</b> from a computer design?',
    options:['3D Printer','Projector','Memory Card','Keyboard'], answer:'3D Printer',
    hint:'Which one builds something you can hold?',
    explanation:'A <b>3D printer</b> builds a solid object layer by layer from a digital model, so the output is a physical thing rather than an image or a page.' }),

  makeMCQ({ id:'g9ict-pp24-032', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:2,
    question:'Which hardware device <b>magnifies images generated by a computer</b>?',
    options:['Projector','3D Printer','Solid State Drive','Touchscreen'], answer:'Projector',
    hint:'Which one throws the screen onto a wall so a whole class can see?',
    explanation:'A <b>projector</b> enlarges the computer’s display onto a screen or wall, so a large audience can see it at once.' }),

  makeMCQ({ id:'g9ict-pp24-033', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
    question:'Which term is <b>used to perform mail merge</b> in a word document?',
    options:['Mailing list','Memory Management','Blog','Chat'], answer:'Mailing list',
    hint:'Mail merge needs a document AND a source of names and addresses.',
    explanation:'A <b>mailing list</b> supplies the names, addresses and other fields that mail merge drops into each copy of the letter.' }),

  makeMCQ({ id:'g9ict-pp24-034', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:3,
    question:'Which term <b>deals with the loading and running of application software</b>?',
    options:['Memory Management','Mailing list','Hacking','Blog'], answer:'Memory Management',
    hint:'Which one is a job the operating system does?',
    explanation:'<b>Memory management</b> is the operating system function that allocates memory to each program, loads it and reclaims the space when it closes.' }),

  makeMCQ({ id:'g9ict-pp24-035', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:2,
    question:'Which term refers to <b>gaining unauthorised access</b> to a computer system?',
    options:['Hacking','Scanning','Blogging','Chatting'], answer:'Hacking',
    hint:'Access that was never permitted in the first place.',
    explanation:'<b>Hacking</b> is gaining access to a system without permission. It is a criminal offence whether or not any data is changed.' }),

  makeMCQ({ id:'g9ict-pp24-036', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:2,
    question:'Which device <b>produces digital images of hardcopy documents</b>?',
    options:['Scanner','Blog','Router','Plotter'], answer:'Scanner',
    hint:'It turns something printed on paper into a file.',
    explanation:'A <b>scanner</b> reads a printed page and produces a digital image of it - the reverse of what a printer does.' }),

  makeMCQ({ id:'g9ict-pp24-037', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
    question:'Which term describes an <b>online journal that displays the latest posts first</b>?',
    options:['Blog','Chat','Mailing list','Search engine'], answer:'Blog',
    hint:'A personal site of dated entries, newest at the top.',
    explanation:'A <b>blog</b> is an online journal whose entries are shown newest first, so a returning reader sees what has changed since their last visit.' }),

  makeMCQ({ id:'g9ict-pp24-038', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:1,
    question:'Google is an example of a ...........',
    options:['search engine','online forum','operating system','spreadsheet'], answer:'search engine',
    hint:'What do you use it to do?',
    explanation:'Google is a <b>search engine</b>: it indexes web pages and returns the ones matching the words you type.' }),

  makeMCQ({ id:'g9ict-pp24-039', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:2,
    question:'Which of these is a <b>threat to data security</b>?',
    options:['Accidental loss of data by deletion','Using strong passwords','Using an updated anti-virus','Making regular backups'],
    answer:'Accidental loss of data by deletion',
    hint:'Three of these protect data. One destroys it.',
    explanation:'<b>Accidental deletion</b> loses the data, so it is a threat. Strong passwords, updated anti-virus software and regular backups are all protections against threats.' }),

  // ── Question 6: reading a System information window ─────────────────────

  makeMCQ({ id:'g9ict-pp24-040', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
    question:'The specifications of a computer system are shown below.' +
      _g9ict24('d7-specs', 'A screenshot of a system information window listing edition, processor, memory and computer name') +
      'What is the <b>installed memory (RAM)</b> of this computer?',
    options:['8 GB','16 GB','32 GB','64 GB'], answer:'8 GB',
    hint:'Find the line labelled “Installed memory (RAM)”.',
    explanation:'The window reports <b>8.00 GB</b> of installed memory (7.87 GB usable - some is reserved by the hardware). “64-bit” on the line below is the system type, not the memory size.' }),

  makeMCQ({ id:'g9ict-pp24-041', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:2,
    question:'Using the system information window below, give the <b>operating system</b> installed on the computer.' +
      _g9ict24('d7-specs', 'A screenshot of a system information window listing edition, processor, memory and computer name'),
    options:['Windows 10 Home Single Language','Windows 10 Pro Single Language','Windows 8 Home Premium Edition','Windows 7 Home Basic Language'],
    answer:'Windows 10 Home Single Language',
    hint:'Look under the heading “Windows edition”.',
    explanation:'The <b>Windows edition</b> line at the top of the window reads <b>Windows 10 Home Single Language</b>. Every option here is a real Windows edition, so the version number and the edition name both have to be read off the screen.' }),

  makeMCQ({ id:'g9ict-pp24-042', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
    question:'Using the system information window below, give the <b>speed of the processor</b>.' +
      _g9ict24('d7-specs', 'A screenshot of a system information window listing edition, processor, memory and computer name'),
    options:['2.50 GHz','7200 GHz','8.00 GHz','64 GHz'], answer:'2.50 GHz',
    hint:'The speed is the figure after the @ sign on the Processor line.',
    explanation:'The processor line ends “@ <b>2.50GHz</b>”, which is the clock speed. i5-7200U is the model number, not a speed.' }),

  // ── Question 8: reading and writing spreadsheet formulae ────────────────

  makeMCQ({ id:'g9ict-pp24-043', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'The spreadsheet below shows sales of perfume bottles in a duty-free shop.' +
      _g9ict24('d8-spreadsheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales') +
      'Which <b>cell</b> contains the sales of <b>Chanel</b> perfume bottles in <b>January</b>?',
    options:['B4','B3','C4','A4'], answer:'B4',
    hint:'Find the Chanel row, then the January column.',
    explanation:'Chanel is on row 4 and January is column B, so the cell is <b>B4</b>. B3 is Dior’s January sales and A4 holds the word “Chanel”.' }),

  makeMCQ({ id:'g9ict-pp24-044', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'In the spreadsheet below, which <b>cell</b> contains the <b>Average Sales</b> of <b>Gucci</b> perfume bottles?' +
      _g9ict24('d8-spreadsheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales'),
    options:['E6','E5','D6','F6'], answer:'E6',
    hint:'Average Sales is a column heading; Gucci is a row.',
    explanation:'Average Sales is column E and Gucci is row 6, so the cell is <b>E6</b>. F6 holds the Below/Above label, not the average.' }),

  makeMCQ({ id:'g9ict-pp24-045', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:3,
    question:'In the spreadsheet below, which formula was used in cell <b>C8</b> to calculate the <b>Total Sales</b> for February?' +
      _g9ict24('d8-spreadsheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales'),
    options:['= SUM(C3:C7)','= C3 * C7','= C3 &minus; B7','= AVERAGE(C3:C7)'], answer:'= SUM(C3:C7)',
    hint:'A total adds every brand’s February figure, from row 3 to row 7.',
    explanation:'<b>= SUM(C3:C7)</b> adds the five February values in column C. Multiplying or subtracting two of them would not give a total, and AVERAGE would give the mean.' }),

  makeMCQ({ id:'g9ict-pp24-046', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:3,
    question:'In the spreadsheet below, which formula in cell <b>E3</b> finds the <b>Average Sales</b> of Dior perfume bottles across the three months?' +
      _g9ict24('d8-spreadsheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales'),
    options:['= AVERAGE(B3:D3)','= AVERAGE(B3:B7)','= SUM(B3:D3)','= AVERAGE(B3:D8)'], answer:'= AVERAGE(B3:D3)',
    hint:'Dior’s three monthly figures run ACROSS row 3, from column B to column D.',
    explanation:'Dior’s January, February and March sales are B3, C3 and D3, so the mean is <b>= AVERAGE(B3:D3)</b>. B3:B7 would average one month down the column instead.' }),

  makeMCQ({ id:'g9ict-pp24-047', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:4,
    question:'The Shop Average Sales is $2500. In cell <b>F3</b>, “Below” must appear when the Average Sales is <b>less than</b> $2500, and “Above” otherwise. Which formula does this?',
    options:['= IF(E3 &lt; 2500, "Below", "Above")','= IF(E3 &gt; 2500, "Below", "Above")','= IF(E3 &lt; 2500, "Above", "Below")','= IF(E3 = 2500, "Below", "Above")'],
    answer:'= IF(E3 &lt; 2500, "Below", "Above")',
    hint:'IF(test, value when true, value when false) - so the FIRST result is the one for a true test.',
    explanation:'The test is “less than 2500”, and when that is true the answer is “Below”, so it goes in the true slot: <b>= IF(E3 &lt; 2500, "Below", "Above")</b>. Swapping the two results reverses every label.' }),

  makeMCQ({ id:'g9ict-pp24-048', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:4,
    question:'In the spreadsheet below, the formula <b>= COUNTIF(F3:F7, "Above")</b> is used in cell F8. What is the output?' +
      _g9ict24('d8-spreadsheet', 'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales'),
    options:['2','3','5','2500'], answer:'2',
    hint:'Count how many rows in the last column say Above - do not add anything up.',
    explanation:'COUNTIF counts the cells in F3:F7 whose contents are “Above”. Dior and Yves Saint Laurent are Above; Chanel, Gucci and Dolce are Below - so the answer is <b>2</b>.' }),

  // ── Question 9: databases ───────────────────────────────────────────────

  makeMCQ({ id:'g9ict-pp24-049', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
    question:'In a database table of games, the field <b>RATING</b> holds values such as 5, 4 and 3. Which <b>data type</b> is used for this field?',
    options:['Number','Text','Date/Time','Yes/No'], answer:'Number',
    hint:'Could you sort these values, or work out an average of them?',
    explanation:'The ratings are whole numbers that can be compared, sorted and averaged, so the field is a <b>Number</b>. Storing them as Text would sort 10 before 2.' }),

  makeMCQ({ id:'g9ict-pp24-050', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:2,
    question:'In a database, which object is <b>used to organise and display data</b> for printing?',
    options:['Report','Data type','Query','Field'], answer:'Report',
    hint:'Which one is designed to be read on paper?',
    explanation:'A <b>report</b> arranges selected data into a formatted, printable layout with headings, grouping and totals.' }),

  // ── Question 11: flowcharts and Python ──────────────────────────────────

  makeMCQ({ id:'g9ict-pp24-051', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:1,
    question:'A .......... is a diagram that shows the <b>steps to solve a problem</b>.',
    options:['flowchart','flowline','sequence','loop'], answer:'flowchart',
    hint:'It is the whole diagram, not one part of it.',
    explanation:'A <b>flowchart</b> is the complete diagram of an algorithm. A flowline is one arrow inside it, and a sequence is one way of ordering its steps.' }),

  makeMCQ({ id:'g9ict-pp24-052', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:2,
    question:'A .......... <b>connects one symbol to another</b> in a flowchart.',
    options:['flowline','flowchart','sequence','loop'], answer:'flowline',
    hint:'It is the arrow between two boxes.',
    explanation:'A <b>flowline</b> is the arrow joining two symbols; it shows which step follows which.' }),

  makeMCQ({ id:'g9ict-pp24-053', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:2,
    question:'Steps in a .......... are executed <b>one after the other</b>, from first to last.',
    options:['sequence','loop','flowline','decision'], answer:'sequence',
    hint:'No repeating and no branching - just straight through.',
    explanation:'In a <b>sequence</b> each step runs once, in order. A loop repeats steps and a decision chooses between them.' }),

  makeMCQ({ id:'g9ict-pp24-054', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:4,
    question:'This Python program must display a sentence <b>seven</b> times.<br>' +
      '<code>count = 0</code><br><code>while count &lt; ___ :</code><br>' +
      '<code>&nbsp;&nbsp;print("The weather is windy.")</code><br><code>&nbsp;&nbsp;count = count + 1</code><br>' +
      'Which number completes the <b>while</b> line?',
    options:['7','6','8','1'], answer:'7',
    hint:'count starts at 0 and goes up by 1. List the values for which the test is still true.',
    explanation:'With <code>count</code> starting at 0 and rising by 1, the test <code>count &lt; 7</code> is true for 0, 1, 2, 3, 4, 5 and 6 - <b>seven</b> passes. Using 6 would print six times.' }),

  makeMCQ({ id:'g9ict-pp24-055', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:3,
    question:'In a Python <b>while</b> loop that must run a fixed number of times, what happens if the line <code>count = count + 1</code> is left out?',
    options:['The loop never ends','The loop runs once','The program will not start','The loop runs seven times'], answer:'The loop never ends',
    hint:'The condition is tested against count. What changes count?',
    explanation:'Without that line <code>count</code> stays at 0, so the condition is true forever and the loop <b>never ends</b> - an infinite loop. Changing the counter is what eventually makes the test false.' })
);

// ── The written questions, as printed, for the read-only past-papers screen ──
// No `answer` field on any of these: transcriptions, never graded.
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9ict-pp24-pdf-001', chapterId:'g9ict-word-processing', marks:5, year:2024, grade:9, subject:'ICT', type:'written',
    image:'assets/past-papers/g9-ict-2024/d6-word-icons.png',
    imageAlt:'A table of five toolbar icons, each with a blank line beside it',
    question:'Question 2(a). Label the following icons using the terms given below. There is an extra word in the list. [AutoSum, Font Color, Strikethrough, Subscript, SmartArt, Superscript]',
    markScheme:'Top to bottom: Subscript (X with a lowered 2); AutoSum (the sigma sign); SmartArt (the shape with a bulleted panel); Font Color (the letter A over a coloured bar); Strikethrough (abc with a line through it). Superscript is the extra word.' },

  { id:'g9ict-pp24-pdf-002', chapterId:'g9ict-algorithms', marks:1, year:2024, grade:9, subject:'ICT', type:'written',
    image:'assets/past-papers/g9-ict-2024/d4-flowchart-symbols.png',
    imageAlt:'Four flowchart outlines labelled A to D',
    question:'Question 1(n). Which one of the following is the symbol for a “Decision Box” in a flowchart?',
    markScheme:'A - the diamond. B (rectangle) is a process, C (parallelogram) is input/output and D (oval) is start or stop.' },

  { id:'g9ict-pp24-pdf-003', chapterId:'g9ict-presentation', marks:1, year:2024, grade:9, subject:'ICT', type:'written',
    needsArtwork:true,
    question:'Question 1(g). In a PowerPoint presentation, which icon illustrates “starting the slide show from the first slide”?',
    markScheme:'The icon showing a projector screen with a play triangle on it - the “From Beginning” button on the Slide Show tab.' },

  { id:'g9ict-pp24-pdf-004', chapterId:'g9ict-networks', marks:5, year:2024, grade:9, subject:'ICT', type:'written',
    question:'Question 2(b). Fill in the blanks with the correct term from the given list. There is an extra word. [backup, bus, mesh, virus, Linux, Wifi] (i) In a .......... topology every node is connected to a single cable. (ii) An example of a free operating system is .......... . (iii) Mobile phones can be connected to the internet using .......... . (iv) A .......... is a software that can slow down a computer. (v) The purpose of a .......... is to keep data secure.',
    markScheme:'(i) bus (ii) Linux (iii) Wifi (iv) virus (v) backup. “mesh” is the extra word.' },

  { id:'g9ict-pp24-pdf-005', chapterId:'g9ict-computer-systems', marks:5, year:2024, grade:9, subject:'ICT', type:'written',
    image:'assets/past-papers/g9-ict-2024/d7-specs.png',
    imageAlt:'A screenshot of a system information window listing edition, processor, memory and computer name',
    question:'Question 6. The specifications of a computer system are shown. (a) What is the name of the computer? [1] (b) Tick the correct memory size of the computer: 8 GB / 16 GB / 32 GB. [1] (c) What is the model and speed of the processor used in the computer? [2] (d) Give the name of the operating system installed on the computer. [1]',
    markScheme:'(a) laptop013. (b) 8 GB. (c) Model: Intel Core i5-7200U; Speed: 2.50 GHz. (d) Windows 10 Home Single Language.' },

  { id:'g9ict-pp24-pdf-006', chapterId:'g9ict-word-processing', marks:3, year:2024, grade:9, subject:'ICT', type:'written',
    question:'Question 7(a). Reshma has to insert a Table of Contents in her project work. Write 2, 3 and 4 in the column “Order” to indicate the order of the steps. The first one has been done: “Place cursor where you want the Table of Contents to appear” = 1. The remaining steps are: “Click Table of Contents on the Reference Tab”, “Choose one of the types of Table of Contents available”, “Format document using Heading Style found on Home Tab”.',
    markScheme:'1 Place cursor where you want the Table of Contents to appear; 2 Format document using Heading Style found on Home Tab; 3 Click Table of Contents on the Reference Tab; 4 Choose one of the types of Table of Contents available. The headings must exist before Word can build the contents list from them.' },

  { id:'g9ict-pp24-pdf-007', chapterId:'g9ict-word-processing', marks:3, year:2024, grade:9, subject:'ICT', type:'written',
    question:'Question 7(b). A letter with merged fields reads: “12 May 2024 / <<Address>> / <<Town>> / SALSA DANCE GROUP / Dear <<First Name>> <<Surname>> / … You will perform in the category <<Category>> on that day.” The mail merge recipient list holds: Pierre, Laura, Ballet, Royal Road, Curepipe; Khan, Parwez, Fusion, Branch Road, Rose Hill; Ram, Shreya, Bollywood, Hillcrest Road, Black River. Complete the letter for the ticked recipient (Khan, Parwez).',
    markScheme:'Address: Branch Road. Town: Rose Hill. Dear Parwez Khan. Category: Fusion. Note the field order - <<First Name>> comes before <<Surname>>, so it reads “Dear Parwez Khan”, not “Dear Khan Parwez”.' },

  { id:'g9ict-pp24-pdf-008', chapterId:'g9ict-spreadsheets', marks:10, year:2024, grade:9, subject:'ICT', type:'written',
    image:'assets/past-papers/g9-ict-2024/d8-spreadsheet.png',
    imageAlt:'A screenshot of a spreadsheet with lettered columns and numbered rows of brands and monthly sales',
    question:'Question 8. The spreadsheet shows sales of perfume bottles ($) in a duty-free shop. (a) Write down the cell address which contains: (i) Sales of Chanel perfume bottles in January; (ii) Average sales of Gucci perfume bottles. [2] (b) Tick the correct formula used in cell C8 to calculate the Total Sales for February: = C3 * C7 / = SUM(C3:C7) / = C3 &minus; B7. [1] (c) Write the formula that can be used in cell E3 to find the Average Sales of Dior perfume bottles. [2] (d) The Shop Average Sales = $2500. When the Average Sales of a perfume bottle is less than the Shop Average Sales, “Below” should be displayed, otherwise “Above”. Complete: = IF(E3 &lt; .........., "Below", ..........). [2] (f) The formula = COUNTIF(F3:F7,"Above") is used in cell F8. What will be the output? [1]',
    markScheme:'(a)(i) B4 (ii) E6. (b) = SUM(C3:C7). (c) = AVERAGE(B3:D3). (d) = IF(E3 < 2500, "Below", "Above"). (f) 2 - Dior and Yves Saint Laurent are the only two marked Above.' },

  { id:'g9ict-pp24-pdf-009', chapterId:'g9ict-databases', marks:4, year:2024, grade:9, subject:'ICT', type:'written',
    question:'Question 9(b). A database table GAMES holds: Z12 BOMB JACK 5 Platform 50; C34 GALAXIAN 4 Shoot 65; B76 TEMPLE TERROR 5 Adventure 60; A45 HERO QUEST 3 Fighting 80; Q64 MANIC MINER 4 Platform 30. (i) Which data type is used for the field RATING? [1] (ii) A query-by-example grid shows Field: GAME ID and RATING, Table: GAMES, Sort: ASCENDING on GAME ID, Criteria: >4 on RATING. Show what the output would be. [3]',
    markScheme:'(i) Number. (ii) Only ratings greater than 4 qualify, i.e. the two games rated 5: B76 (TEMPLE TERROR) and Z12 (BOMB JACK). Sorted ascending by GAME ID the output is B76 then Z12, each shown with its rating of 5. Note ">4" excludes the games rated exactly 4.' },

  { id:'g9ict-pp24-pdf-010', chapterId:'g9ict-internet', marks:9, year:2024, grade:9, subject:'ICT', type:'written',
    question:'Question 10. Internet banking is becoming very popular nowadays. (a) Explain what is meant by internet banking. [2] (b) State two transactions that can be done using internet banking. [2] (c) Banks usually provide E-banking websites to their customers. State two pieces of information that customers will need in order to access their accounts through an E-banking website. [2] (d) Give two benefits of internet banking for customers. [2] (e) State one possible drawback of internet banking for a bank. [1]',
    markScheme:'(a) Carrying out banking transactions over the internet, through the bank’s website or app, without going to a branch. (b) Any two of: checking a balance, transferring money between accounts, paying a bill, ordering a statement or cheque book, paying by standing order. (c) A username or account/customer number, and a password or PIN (a one-time code sent to the phone is also accepted). (d) Any two of: available 24 hours a day, no need to travel to a branch, saves time and transport cost, transactions are immediate, statements can be viewed at any time. (e) Any one of: the cost of building and securing the system, the risk of fraud or hacking, loss of personal contact with customers, customers with no internet access are excluded, system downtime stops service.' },

  { id:'g9ict-pp24-pdf-011', chapterId:'g9ict-algorithms', marks:5, year:2024, grade:9, subject:'ICT', type:'written',
    image:'assets/past-papers/g9-ict-2024/d9-flowchart.png',
    imageAlt:'A flowchart with one filled box and six blank shapes joined by arrows, with Yes and No branches',
    question:'Question 11(c). An algorithm has to be designed for a sensor using a flowchart. The aim of the sensor is to detect if the temperature in a greenhouse is greater than 25°C, in order to start a cooler. Using the list of statements provided, insert the six missing statements in the flowchart using the appropriate number. Each statement may be used only once. An example is given (4 = Start). LIST: 1. Is Temperature > 25°C? 2. Output “Cooler ON” 3. Output “Cooler OFF” 4. Start 5. End 6. Input Temperature',
    markScheme:'Top oval 4 (Start, given). Next parallelogram 6 (Input Temperature). Diamond 1 (Is Temperature > 25°C?). Yes branch 2 (Output “Cooler ON”). No branch 3 (Output “Cooler OFF”). Bottom oval 5 (End). The Yes branch must be the one that switches the cooler ON - that is what the sensor is for.' }
);
