'use strict';
// NCE 2021 Grade 9 ICT — past-paper questions adapted to MCQ/T-F format.

STATIC_QUESTIONS.push(

  /* ── Q1 MCQs ── */
  makeMCQ({ id:'g9ict-pp21-001', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:2,
    question:'In a word processor, the paragraph-alignment toolbar buttons are used to…',
    options:['Change the font colour','Change the font size','Change the line spacing','Change alignment'],
    answer:'Change alignment',
    hint:'Think about how text is positioned horizontally on a page.',
    explanation:'The four alignment buttons (left, centre, right, justify) change how text is aligned on the page. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-002', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:1,
    question:'Which of the following is an example of a <b>search engine</b>?',
    options:['Microsoft Outlook','WhatsApp','Skype','Google'],
    answer:'Google',
    hint:'A search engine lets you find web pages by typing keywords.',
    explanation:'Google is a search engine. Outlook is email software, WhatsApp and Skype are communication apps. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-003', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
    question:'The IF function in a spreadsheet is made up of which three parts?',
    options:['CONDITION, TRUE, FALSE','START, MIDDLE, END','IF, THEN, ELSE','VALUE, RESULT, DEFAULT'],
    answer:'CONDITION, TRUE, FALSE',
    hint:'The IF function tests something, then gives one of two outcomes.',
    explanation:'The IF function has three parts: a CONDITION to test, a TRUE result (if the condition is met), and a FALSE result (if not). 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-004', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:1,
    question:'Which flowchart shape is used to represent an <b>input or output</b> step, such as "Display Sum"?',
    options:['Rectangle','Diamond','Oval','Parallelogram'],
    answer:'Parallelogram',
    hint:'Input/output steps are shown with a slanted four-sided shape.',
    explanation:'A parallelogram represents input or output in a flowchart. A rectangle is used for a process, a diamond for a decision, and an oval for start/end. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-005', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:1,
    question:'Disk Defragmenter is a utility program designed to…',
    options:['Delete temporary files','Scan for viruses','Rearrange stored files to improve access speed','Compress files to save disk space'],
    answer:'Rearrange stored files to improve access speed',
    hint:'Fragmentation means file parts are scattered; this tool fixes that.',
    explanation:'Disk Defragmenter rearranges fragmented files on a hard disk so they can be accessed more efficiently. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-006', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:1,
    question:'A named memory location that stores a value which can change during a program is called a…',
    options:['Constant','Variable','Function','Array'],
    answer:'Variable',
    hint:'The value stored in this location can be updated as the program runs.',
    explanation:'A variable is a named memory location whose value can change. A constant holds a fixed value that never changes. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-007', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'Which of the following is a task performed by <b>memory management</b> in an operating system?',
    options:['Managing files on the hard disk','Dealing with the loading and running of application programs','Controlling access permissions for users','Scheduling processor time between tasks'],
    answer:'Dealing with the loading and running of application programs',
    hint:'Memory management allocates RAM to running programs.',
    explanation:'Memory management is responsible for loading application programs into RAM and managing that memory while programs run. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-008', chapterId:'g9ict-ethics-security', subsection:'data_protection_act', difficulty:1,
    question:'The Data Protection Act protects…',
    options:['Personal information stored on computers','Computer hardware from theft','Networks from hacking','Software from piracy'],
    answer:'Personal information stored on computers',
    hint:'This law controls how organisations collect and use data about people.',
    explanation:'The Data Protection Act protects individuals by controlling how their personal information is collected, stored, and used. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-009', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:1,
    question:'Antivirus software is primarily used to…',
    options:['Detect and remove malware','Speed up the processor','Manage network connections','Compress large files'],
    answer:'Detect and remove malware',
    hint:'Its purpose is to protect a computer from harmful programs.',
    explanation:'Antivirus software scans, detects, and removes malware such as viruses, worms, and Trojans. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-010', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:1,
    question:'Which technology uses <b>radio waves</b> to provide high-speed wireless internet connectivity?',
    options:['Bluetooth','WiFi','Infrared','HDMI'],
    answer:'WiFi',
    hint:'This is the technology used in home routers and public hotspots.',
    explanation:'WiFi uses radio waves to transmit data wirelessly, providing high-speed internet access without physical cables. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-011', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:1,
    question:'Which word-processing feature is used to automatically generate a list of chapters with their page numbers?',
    options:['Header and Footer','Mail Merge','Table of Contents','Styles'],
    answer:'Table of Contents',
    hint:'This feature reads the heading styles in a document and builds a list.',
    explanation:'A Table of Contents automatically lists chapter headings with their page numbers, making navigation easier in long documents. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-012', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'Which spreadsheet feature is used to <b>replicate the content of a cell</b> into adjacent cells by dragging?',
    options:['AutoFill / Fill handle','AutoSum','Conditional formatting','Data validation'],
    answer:'AutoFill / Fill handle',
    hint:'It appears as a small square in the bottom-right corner of a selected cell.',
    explanation:'The Fill handle (small black square at the bottom-right of a cell) allows you to drag and copy cell content into neighbouring cells. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-013', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:1,
    question:'In "20<sup>th</sup> March", the letters "th" are raised above the text baseline. This formatting is called…',
    options:['Subscript','Strikethrough','Bold','Superscript'],
    answer:'Superscript',
    hint:'Raised text, like the exponent in mathematics.',
    explanation:'Superscript raises text above the normal baseline (e.g. 20th, x²). Subscript moves text below the baseline (e.g. H₂O). 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-014', chapterId:'g9ict-networks', subsection:'network_components', difficulty:1,
    question:'A MODEM is best described as…',
    options:['A software program that filters network traffic','A cable that connects computers in a network','A hardware device that allows a computer to send and receive data over a telephone line','A device that amplifies a wireless signal'],
    answer:'A hardware device that allows a computer to send and receive data over a telephone line',
    hint:'Its name stands for MOdulator-DEModulator.',
    explanation:'A MODEM is a hardware device that modulates and demodulates signals, allowing a computer to send and receive data over a telephone or cable line. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-015', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:1,
    question:'The physical arrangement of computers and cables in a network is called its…',
    options:['Protocol','Topology','Bandwidth','Architecture'],
    answer:'Topology',
    hint:'Examples include star, ring, and bus.',
    explanation:'Network topology describes the physical or logical arrangement of devices and the connections between them. 📄 NCE 2021 ICT exam.' }),

  /* ── Q2 Fill-in-blank adapted to MCQ ── */
  makeMCQ({ id:'g9ict-pp21-016', chapterId:'g9ict-networks', subsection:'network_components', difficulty:1,
    question:'Which network device is used to allow two or more computers to share a single internet connection?',
    options:['Switch','Hub','Router','Bridge'],
    answer:'Router',
    hint:'You will find one of these in almost every home with broadband.',
    explanation:'A router connects multiple devices to the internet and directs data between them. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-017', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'Which function of an operating system is responsible for <b>transferring data from an input device to memory</b>?',
    options:['File management','Processor management','Hardware management','User interface management'],
    answer:'Hardware management',
    hint:'This OS function controls communication with physical components.',
    explanation:'Hardware management is the OS function that controls communication between the CPU, memory, and input/output devices. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-018', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:1,
    question:'The process of <b>identifying and resolving problems</b> with a computer system is called…',
    options:['Formatting','Troubleshooting','Defragmenting','Benchmarking'],
    answer:'Troubleshooting',
    hint:'It involves diagnosing what is wrong and finding a fix.',
    explanation:'Troubleshooting is the systematic process of identifying and resolving problems with computer hardware or software. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-019', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:1,
    question:'A pre-formatted sample document used as a starting point for new documents is called a…',
    options:['Macro','Template','Stylesheet','Theme'],
    answer:'Template',
    hint:'Microsoft Word offers many of these for letters, CVs, and reports.',
    explanation:'A template is a pre-formatted document that provides a ready-made structure, saving time when creating similar documents. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-020', chapterId:'g9ict-spreadsheets', subsection:'filter_sort', difficulty:1,
    question:'Which spreadsheet tool is used to <b>display only the rows that meet a specific condition</b>, hiding the rest?',
    options:['Sort','Conditional formatting','Filter','Find and Replace'],
    answer:'Filter',
    hint:'It temporarily hides rows that do not match your criteria.',
    explanation:'The Filter tool shows only the rows that match chosen criteria and hides all other rows, making it easier to analyse specific data. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-021', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:2,
    question:'Rewriting someone else\'s ideas <b>in your own words</b>, keeping the meaning but not copying the exact text, is known as…',
    options:['Quoting','Summarising','Paraphrasing','Transcribing'],
    answer:'Paraphrasing',
    hint:'You must still credit the original source even when you do this.',
    explanation:'Paraphrasing means expressing another person\'s ideas in your own words. It differs from quoting (copying exact words) and must still be credited. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-022', chapterId:'g9ict-internet', subsection:'web_design_principles', difficulty:1,
    question:'Which computer language is primarily used to create and structure <b>web pages</b>?',
    options:['Python','HTML','Java','C++'],
    answer:'HTML',
    hint:'Its name stands for HyperText Markup Language.',
    explanation:'HTML (HyperText Markup Language) is the standard language used to create the structure and content of web pages. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-023', chapterId:'g9ict-ethics-security', subsection:'copyright_ownership', difficulty:1,
    question:'The legal right that an author or creator has over their original work published on the internet is known as…',
    options:['Trademark','Patent','Ownership / Copyright','Licence'],
    answer:'Ownership / Copyright',
    hint:'It gives creators control over how their work is used or copied.',
    explanation:'Copyright (ownership) gives creators the exclusive legal right to use, copy, and distribute their work. Copying without permission is illegal. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-024', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:1,
    question:'Which flowchart symbol is used to show a <b>condition with two possible outcomes</b> (Yes or No)?',
    options:['Rectangle (process)','Parallelogram (input/output)','Oval (terminal)','Diamond (decision)'],
    answer:'Diamond (decision)',
    hint:'It has two exit paths, one for each possible answer.',
    explanation:'A diamond shape represents a decision in a flowchart. The two exits are labelled Yes and No (or True and False). 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-025', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:1,
    question:'Which free internet service allows users to listen to or download audio files at their convenience?',
    options:['Blog','Vodcast','Podcast','Wiki'],
    answer:'Podcast',
    hint:'Many radio shows offer their episodes this way.',
    explanation:'A podcast is a free audio file distributed over the internet that users can stream or download. Vodcasting is the same idea but for video. 📄 NCE 2021 ICT exam.' }),

  /* ── Q3 True/False ── */
  makeTF({ id:'g9ict-pp21-026', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:1,
    question:'A paper jam in the printer will prevent it from working properly.',
    answer:true,
    hint:'A jammed sheet stops the paper feed mechanism.',
    explanation:'True. A paper jam blocks the paper path and stops the printer from functioning until the jam is cleared. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-027', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:1,
    question:'Vodcasting is a web service used for streaming or downloading <b>video</b> files.',
    answer:true,
    hint:'Think of "vod" as short for video-on-demand.',
    explanation:'True. Vodcasting (video podcasting) allows users to stream or download video episodes from the internet. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-028', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'Processor management in an operating system gives a small <b>time slice</b> of CPU time to each running job in turn.',
    answer:true,
    hint:'This technique is called time-sharing or round-robin scheduling.',
    explanation:'True. Processor management shares CPU time among running processes by allocating small time slices to each in rotation. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-029', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:2,
    question:'Repetitive Strain Injury (RSI) is caused by radiation emitted from a computer screen.',
    answer:false,
    hint:'Think about what the word "repetitive" means.',
    explanation:'False. RSI is caused by repetitive movements (such as typing or mouse use), not screen radiation. Eye strain is the main risk from screen glare. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-030', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
    question:'In the COUNTIF function, the <b>Criteria</b> argument specifies the condition that cells must meet to be counted.',
    answer:true,
    hint:'COUNTIF counts cells that match a given condition.',
    explanation:'True. In =COUNTIF(range, criteria), the criteria argument defines the condition — for example ">=50" — that a cell must satisfy to be included in the count. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-031', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:2,
    question:'Users do <b>not</b> need to sign in to participate in an online chat room.',
    answer:false,
    hint:'Most chat platforms require some form of registration or login.',
    explanation:'False. Most online chat rooms require users to create an account or sign in before they can chat. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-032', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:1,
    question:'A <b>sequence</b> structure in programming means that steps are repeated many times.',
    answer:false,
    hint:'Think about what "sequence" means in everyday life.',
    explanation:'False. A sequence means steps are executed one after another in order. Repetition (loop) is the structure where steps are repeated. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-033', chapterId:'g9ict-word-processing', subsection:'text_formatting', difficulty:1,
    question:'WordArt is a word-processing feature that adds artistic styling and decorative effects to text.',
    answer:true,
    hint:'It lets you curve, shadow, and colour text in creative ways.',
    explanation:'True. WordArt provides decorative text effects such as shadows, curves, and colour gradients to make headings more visually appealing. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-034', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:2,
    question:'DupliChecker is an antivirus software program.',
    answer:false,
    hint:'Consider what "dupli" might stand for.',
    explanation:'False. DupliChecker is a plagiarism-checking tool used to detect copied text, not an antivirus program. 📄 NCE 2021 ICT exam.' }),

  makeTF({ id:'g9ict-pp21-035', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
    question:'Cell Styles in a spreadsheet can be applied to a range of cells to ensure consistent formatting throughout a worksheet.',
    answer:true,
    hint:'Styles work the same way in Excel as heading styles in Word.',
    explanation:'True. Cell Styles allow you to apply a predefined set of formatting (font, border, fill) to multiple cells at once, ensuring a consistent appearance. 📄 NCE 2021 ICT exam.' }),

  /* ── Q4(a) Matching adapted to MCQ ── */
  makeMCQ({ id:'g9ict-pp21-036', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:1,
    question:'Which type of operating system allows <b>several users</b> to access a computer\'s resources at the same time?',
    options:['Single-user system','Multi-processing system','Multi-user system','Real-time system'],
    answer:'Multi-user system',
    hint:'Libraries and banks often use this type of system.',
    explanation:'A multi-user system allows multiple users to access the computer\'s resources simultaneously, each working on their own tasks. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-037', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:1,
    question:'<b>Ergonomics</b> is best described as…',
    options:['The study of computer networks','The science of how people interact with their working environment and objects','The practice of backing up data regularly','The process of securing a computer against viruses'],
    answer:'The science of how people interact with their working environment and objects',
    hint:'Ergonomic chairs and keyboards are designed with this in mind.',
    explanation:'Ergonomics is the science of designing workplaces and tools to suit the people who use them, reducing discomfort and injury. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-038', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
    question:'A <b>multi-processing</b> computer system is one that is…',
    options:['Used by many users at once','Connected to many other computers','Capable of supporting more than one processor','Running more than one operating system'],
    answer:'Capable of supporting more than one processor',
    hint:'Modern desktop computers often have dual or quad-core processors.',
    explanation:'A multi-processing system has two or more processors (CPUs) working together, allowing it to execute multiple tasks simultaneously. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-039', chapterId:'g9ict-networks', subsection:'network_components', difficulty:1,
    question:'In a network, a <b>server</b> is best described as…',
    options:['A computer that stores personal files for one user','A powerful computer that manages communication and shared resources across the network','A device that converts digital signals to analogue','A cable that connects computers together'],
    answer:'A powerful computer that manages communication and shared resources across the network',
    hint:'Web servers, file servers, and email servers are examples.',
    explanation:'A server is a powerful computer that provides services (files, email, web pages) to other computers (clients) on the network. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-040', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:1,
    question:'In Microsoft Word, the <b>References tab</b> is used to…',
    options:['Insert shapes and images','Change the page orientation','Access the spell checker','Insert a table of contents and manage citations'],
    answer:'Insert a table of contents and manage citations',
    hint:'Look for "Table of Contents" and "Citations & Bibliography" in this tab.',
    explanation:'The References tab in Microsoft Word provides tools for inserting a table of contents, adding citations, and generating a bibliography. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-041', chapterId:'g9ict-ethics-security', subsection:'data_backups', difficulty:1,
    question:'A <b>data backup</b> is primarily used to…',
    options:['Speed up a slow computer','Protect data from viruses','Recover data in the event of loss or corruption','Encrypt sensitive files'],
    answer:'Recover data in the event of loss or corruption',
    hint:'Without this, lost files cannot be restored.',
    explanation:'A backup is a copy of data kept separately so that it can be restored if the original is lost, deleted, or corrupted. 📄 NCE 2021 ICT exam.' }),

  /* ── Q4(b) Network types ── */
  makeMCQ({ id:'g9ict-pp21-042', chapterId:'g9ict-networks', subsection:'network_types', difficulty:1,
    question:'A <b>MAN</b> (Metropolitan Area Network) is a network designed to cover…',
    options:['A single room or office','A single building or campus','A town or city','A country or the world'],
    answer:'A town or city',
    hint:'Think of city-wide cable TV or municipal Wi-Fi networks.',
    explanation:'A MAN covers a geographic area the size of a town or city, larger than a LAN but smaller than a WAN. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-043', chapterId:'g9ict-networks', subsection:'network_types', difficulty:1,
    question:'A <b>WAN</b> (Wide Area Network) is a network that…',
    options:['Is limited to a single office','Covers a town or city only','Connects computers across countries or around the world','Is used only within a single home'],
    answer:'Connects computers across countries or around the world',
    hint:'The internet is the largest example of this type.',
    explanation:'A WAN spans large geographic areas — countries or continents — connecting multiple LANs together. The internet is the largest WAN. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-044', chapterId:'g9ict-networks', subsection:'network_types', difficulty:1,
    question:'A <b>LAN</b> (Local Area Network) is a network that is…',
    options:['Limited to a single site such as a school or office building','Used to connect cities across a country','Restricted to a single person\'s devices','Provided by an internet service provider'],
    answer:'Limited to a single site such as a school or office building',
    hint:'Schools, offices, and homes commonly use this type.',
    explanation:'A LAN is a network confined to a single site, such as a school, home, or office, connecting devices within a limited area. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-045', chapterId:'g9ict-networks', subsection:'network_types', difficulty:1,
    question:'A <b>PAN</b> (Personal Area Network) is a network that…',
    options:['Covers an entire city','Connects a single person\'s devices within a small area such as a desk or room','Links offices across a building','Provides internet to a whole country'],
    answer:'Connects a single person\'s devices within a small area such as a desk or room',
    hint:'Bluetooth headphones connecting to your phone is a common example.',
    explanation:'A PAN is a very small network centred on an individual, typically connecting personal devices like a phone, tablet, and wireless headphones within a few metres. 📄 NCE 2021 ICT exam.' }),

  /* ── Q5 Troubleshooting MCQ ── */
  makeMCQ({ id:'g9ict-pp21-046', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:1,
    question:'Which keyboard shortcut opens the <b>Task Manager</b> in Windows?',
    options:['Ctrl + C','Alt + F4','Ctrl + Alt + Del','Shift + Esc'],
    answer:'Ctrl + Alt + Del',
    hint:'Three keys pressed together — one on the left, one in the middle, one on the right.',
    explanation:'Pressing Ctrl + Alt + Del opens the Windows security/task menu, from which Task Manager can be launched. 📄 NCE 2021 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp21-047', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:2,
    question:'A file has been accidentally deleted. Which of the following is <b>NOT</b> a valid way to restore it?',
    options:['Open the Recycle Bin and click Restore','Press Ctrl + Z immediately after deletion','Right-click the Recycle Bin and choose Undo Delete','Run Disk Defragmenter'],
    answer:'Run Disk Defragmenter',
    hint:'Disk Defragmenter reorganises files for speed — it does not recover deleted ones.',
    explanation:'Disk Defragmenter rearranges file storage for efficiency but does not restore deleted files. The Recycle Bin, Ctrl+Z, and Undo are all valid recovery options. 📄 NCE 2021 ICT exam.' })

);

/* ── Section B written questions (PDF only) ── */
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g9ict-pp21-pdf-001', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'(a) What does <b>GUI</b> stand for? (b) State TWO features of a GUI. (c) Give ONE reason why a GUI is useful for computer users.',
    markScheme:'(a) Graphical User Interface [1]. (b) Any two of: Windows / Icons / Menus / Pointer (WIMP) [1 each, max 2]. (c) E.g. Eases user interaction; users do not need to remember commands; more intuitive for beginners [1]. NCE 2021 ICT exam.' },

  { id:'g9ict-pp21-pdf-002', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'State FOUR tasks performed by an <b>operating system</b>.',
    markScheme:'Any four of: Memory management; File management; Processor management; Hardware management; User interface management; Security management; Error handling [1 each, max 4]. NCE 2021 ICT exam.' },

  { id:'g9ict-pp21-pdf-003', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
    question:'(a) What is <b>mail merge</b>? (b) Which tab in Microsoft Word is used to access mail merge? (c) State the THREE steps to perform a mail merge.',
    markScheme:'(a) Mail merge allows personalised letters to be created automatically by combining a template document with a data source [1]. (b) Mailings tab [1]. (c) 1 – Create the main document (template); 2 – Create or connect to the data source (mailing list); 3 – Merge the documents / Insert merge fields [1 each]. NCE 2021 ICT exam.' },

  { id:'g9ict-pp21-pdf-004', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
    question:'(a) What does <b>VPN</b> stand for? (b) State TWO uses of a VPN. (c) Name THREE network components needed to set up a VPN.',
    markScheme:'(a) Virtual Private Network [1]. (b) Any two of: Secure connection between remote offices; Encrypts data over public internet; Allows remote workers to access company network safely [1 each]. (c) Any three of: Router; Server; Firewall; Internet connection; Network Interface Card [1 each, max 3]. NCE 2021 ICT exam.' },

  { id:'g9ict-pp21-pdf-005', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:3,
    question:'A flowchart calculates Speed = Distance ÷ Time. If Speed ≤ 50 the new speed = Speed + 10, otherwise new speed = Speed − 10. The flowchart then outputs the new speed. Perform a dry run for: (a) D = 480, T = 10. (b) D = 1000, T = 20. (c) D = 4800, T = 60.',
    markScheme:'(a) Speed = 480/10 = 48; 48 ≤ 50 → Yes; Output = 48 + 10 = 58 [1]. (b) Speed = 1000/20 = 50; 50 ≤ 50 → Yes; Output = 50 + 10 = 60 [1]. (c) Speed = 4800/60 = 80; 80 > 50 → No; Output = 80 − 10 = 70 [1]. NCE 2021 ICT exam.' }

);
