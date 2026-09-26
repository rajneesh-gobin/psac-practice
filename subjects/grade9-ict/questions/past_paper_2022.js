'use strict';
// NCE 2022 Grade 9 ICT — past-paper questions adapted to MCQ/T-F format.

STATIC_QUESTIONS.push(

  /* ── Q1 MCQs ── */
  makeMCQ({ id:'g9ict-pp22-001', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:1,
    question:'Which of the following is a <b>web browser</b> used to view pages on the internet?',
    options:['Microsoft Excel','Google Chrome','Windows Defender','Adobe Photoshop'],
    answer:'Google Chrome',
    hint:'A web browser lets you navigate to URLs and display web pages.',
    explanation:'Google Chrome is a web browser. The others are a spreadsheet, a security tool, and an image editor respectively. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-002', chapterId:'g9ict-word-processing', subsection:'page_layout', difficulty:1,
    question:'Where is the <b>header</b> of a document positioned?',
    options:['At the top of each page','At the bottom of each page','In the left margin','In the centre of the page'],
    answer:'At the top of each page',
    hint:'Headers and footers are opposites — one is at the top, one at the bottom.',
    explanation:'A header appears at the top of every page and typically contains the document title, date, or page number. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-003', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:1,
    question:'Which shape is used to represent a <b>process</b> step in a flowchart?',
    options:['Diamond','Parallelogram','Oval','Rectangle'],
    answer:'Rectangle',
    hint:'A box shape — it is used for calculations or actions.',
    explanation:'A rectangle represents a process (calculation or action) in a flowchart. The diamond is for decisions, the parallelogram for input/output, and the oval for start/end. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-004', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:2,
    needsArtwork:true,
    question:'A PowerPoint print layout shows each slide above a text box for written notes. This layout is called…',
    options:['Notes pages','Handouts','Outline view','Slide sorter'],
    answer:'Notes pages',
    hint:'This layout is used by presenters to add speaker notes beneath each slide.',
    explanation:'"Notes pages" is the print layout that shows a thumbnail of the slide with a notes area below it for the presenter\'s reference. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-005', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'In a spreadsheet, row 1 contains column headers and rows 2–6 hold student data. Malini\'s ICT mark is in <b>row 5, column B</b>. What is the cell address?',
    options:['B4','B5','5B','E2'],
    answer:'B5',
    hint:'Cell addresses are written as column letter then row number.',
    explanation:'The cell at column B, row 5 is written as B5. Column comes first, then the row number. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-006', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
    needsArtwork:true,
    question:'A network diagram shows a root node at the top connecting to two nodes, each of which connects to further child nodes, forming a branching hierarchy. Which topology is this?',
    options:['Star','Ring','Tree','Mesh'],
    answer:'Tree',
    hint:'Its shape resembles branches spreading downward from a trunk.',
    explanation:'A tree (hierarchical) topology has a root node connected to child nodes, which may have their own child nodes, forming a tree-like branching structure. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-007', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:1,
    question:'An <b>online journal</b> where a person regularly posts entries, opinions, or articles for the public to read is called a…',
    options:['Wiki','Blog','Podcast','Forum'],
    answer:'Blog',
    hint:'Short for "weblog".',
    explanation:'A blog is an online journal or diary where an author (blogger) regularly publishes posts on a topic. A wiki is a collaborative editable site; a forum is for discussions. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-008', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'Which operating system function is responsible for <b>allocating disk storage space</b> to programs and data?',
    options:['Processor management','Memory management','File management','Hardware management'],
    answer:'File management',
    hint:'This function organises data into files and folders on a storage device.',
    explanation:'File management is the OS function that organises, stores, retrieves, and allocates disk space to files and folders. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-009', chapterId:'g9ict-ethics-security', subsection:'data_protection_act', difficulty:1,
    question:'Which law is designed to <b>protect personal information</b> held about individuals on computer systems?',
    options:['Computer Misuse Act','Copyright Act','Data Protection Act','Electronic Transactions Act'],
    answer:'Data Protection Act',
    hint:'It gives individuals rights over how their personal data is collected and used.',
    explanation:'The Data Protection Act controls how personal data is collected, stored, and used, giving individuals rights to access and correct their information. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-010', chapterId:'g9ict-internet', subsection:'e_services', difficulty:1,
    question:'The activity of buying and selling goods or services over the internet is called…',
    options:['E-government','E-banking','E-commerce','E-learning'],
    answer:'E-commerce',
    hint:'Online shopping sites like Amazon use this.',
    explanation:'E-commerce (electronic commerce) refers to buying and selling products or services via the internet. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-011', chapterId:'g9ict-presentation', subsection:'comic_strips', difficulty:1,
    question:'In a comic strip, which type of speech balloon has a <b>dashed outline</b> and is used to show a character whispering?',
    options:['General speech balloon','Thought balloon','Whisper balloon','Explosion balloon'],
    answer:'Whisper balloon',
    hint:'Its border is dashed to suggest a quiet, hushed voice.',
    explanation:'A whisper balloon is distinguished by a dashed or dotted outline, indicating that the character is speaking quietly. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-012', chapterId:'g9ict-algorithms', subsection:'control_structures', difficulty:1,
    question:'A programming structure where a <b>set of statements is executed multiple times</b> is called…',
    options:['Sequence','Selection','Repetition','Function'],
    answer:'Repetition',
    hint:'Also known as a loop.',
    explanation:'Repetition (loop) causes a block of statements to execute repeatedly — either a fixed number of times or while a condition is true. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-013', chapterId:'g9ict-internet', subsection:'web_tools', difficulty:1,
    question:'Which internet service allows users to <b>stream or download audio</b> episodes for later listening?',
    options:['Vodcast','Podcast','Webcast','Screensaver'],
    answer:'Podcast',
    hint:'Many radio programmes release their shows this way.',
    explanation:'A podcast is an audio file that users can stream online or download. Vodcasting is the video equivalent. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-014', chapterId:'g9ict-networks', subsection:'network_components', difficulty:1,
    question:'<b>ISP</b> stands for…',
    options:['Internal Security Protocol','Internet Service Provider','Integrated Software Platform','Intranet Sharing Program'],
    answer:'Internet Service Provider',
    hint:'This is the company that sells your broadband or mobile data connection.',
    explanation:'An ISP (Internet Service Provider) is a company that provides individuals and organisations with access to the internet. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-015', chapterId:'g9ict-databases', subsection:'db_structure', difficulty:2,
    question:'In a school student database, which field is most suitable as the <b>primary key</b>?',
    options:['Student name','Date of birth','Home address','Student number'],
    answer:'Student number',
    hint:'A primary key must uniquely identify every record.',
    explanation:'A student number is unique to each student, making it the ideal primary key. Names, dates of birth, and addresses can be shared by multiple students. 📄 NCE 2022 ICT exam.' }),

  /* ── Q2 Part A fill-blank → MCQ ── */
  makeMCQ({ id:'g9ict-pp22-016', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:1,
    question:'Sitting for long periods with a <b>bad posture</b> at a computer can lead to…',
    options:['Eye strain','RSI (Repetitive Strain Injury)','Electric shock','Radiation sickness'],
    answer:'RSI (Repetitive Strain Injury)',
    hint:'Poor posture strains muscles and tendons repeatedly over time.',
    explanation:'Bad posture at a computer can cause RSI — pain and discomfort in the wrists, arms, neck, or back from repeated muscle strain. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-017', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:1,
    question:'Which type of chair is designed to support the body correctly and help prevent back pain during long sessions at a computer?',
    options:['Reclining chair','Ergonomic chair','Swivel chair','Stool'],
    answer:'Ergonomic chair',
    hint:'These chairs are adjustable and support the natural curve of the spine.',
    explanation:'An ergonomic chair is designed to maintain correct posture, support the lumbar (lower back) region, and reduce the risk of back pain during prolonged computer use. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-018', chapterId:'g9ict-ethics-security', subsection:'data_backups', difficulty:1,
    question:'A copy of data kept separately so that it can be restored if the original is lost is called a…',
    options:['Archive','Template','Backup','Cache'],
    answer:'Backup',
    hint:'Always keep one in case the worst happens.',
    explanation:'A backup is a copy of data stored separately (e.g. on an external drive or cloud) so it can be used to restore data after loss or corruption. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-019', chapterId:'g9ict-networks', subsection:'network_components', difficulty:1,
    question:'Which computer on a network provides resources, files, or services to other connected computers?',
    options:['Client','Terminal','Server','Router'],
    answer:'Server',
    hint:'Other machines (clients) request things from this one.',
    explanation:'A server provides resources (files, websites, email) to client computers on the network. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-020', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:1,
    question:'Computers represent all data using a combination of 0s and 1s. This system is called…',
    options:['Hexadecimal','Decimal','Binary','Octal'],
    answer:'Binary',
    hint:'Bi means two — there are only two possible values.',
    explanation:'Binary is the number system using only 0 and 1, which corresponds to the two states (off/on) of electronic switches inside a computer. 📄 NCE 2022 ICT exam.' }),

  /* ── Q2 Part B fill-blank → MCQ ── */
  makeMCQ({ id:'g9ict-pp22-021', chapterId:'g9ict-internet', subsection:'browsers_search', difficulty:1,
    question:'Which software allows a user to view web pages on the internet?',
    options:['Operating system','Word processor','Web browser','Spreadsheet'],
    answer:'Web browser',
    hint:'You use one every time you visit a website.',
    explanation:'A web browser (e.g. Chrome, Firefox, Edge) is the software used to access and navigate web pages on the internet. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-022', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:1,
    question:'A computer that is connected to a network and relies on a central server for resources is called a…',
    options:['Host','Terminal','Node','Client'],
    answer:'Terminal',
    hint:'It has limited processing power of its own.',
    explanation:'A terminal is a networked computer (or dumb terminal) that connects to a central server to access shared resources and processing power. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-023', chapterId:'g9ict-ethics-security', subsection:'computer_ethics', difficulty:1,
    question:'The set of rules and principles that guide the <b>proper and responsible use of computers</b> is known as…',
    options:['Computer security','Computer ethics','Computer law','Data protection'],
    answer:'Computer ethics',
    hint:'It covers issues like privacy, intellectual property, and acceptable use.',
    explanation:'Computer ethics is the study of moral principles governing the use of computers — covering issues such as privacy, copyright, hacking, and online behaviour. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-024', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:1,
    question:'Using someone else\'s written work, ideas, or code and presenting them as your own without giving credit is called…',
    options:['Piracy','Hacking','Plagiarism','Phishing'],
    answer:'Plagiarism',
    hint:'It is considered academic dishonesty.',
    explanation:'Plagiarism means passing off another person\'s work as your own. It is dishonest and can have serious academic and legal consequences. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-025', chapterId:'g9ict-presentation', subsection:'notes_handouts', difficulty:1,
    question:'Printed copies of presentation slides given to an audience to follow along are called…',
    options:['Transparencies','Handouts','Posters','Scripts'],
    answer:'Handouts',
    hint:'They can have 2, 4, or 6 slides per printed page.',
    explanation:'Handouts are printed copies of presentation slides distributed to the audience, allowing them to follow along and take notes. 📄 NCE 2022 ICT exam.' }),

  /* ── Q3 True/False ── */
  makeTF({ id:'g9ict-pp22-026', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:1,
    question:'A paper jam in a printer will prevent it from working properly until the jam is cleared.',
    answer:true,
    hint:'A jammed sheet blocks the paper path completely.',
    explanation:'True. A paper jam blocks the paper path and must be removed before the printer can continue working. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-027', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:1,
    question:'Hacking means gaining unauthorised access to a computer system.',
    answer:true,
    hint:'Hackers break into systems they are not permitted to access.',
    explanation:'True. Hacking is gaining unauthorised access to computer systems or data, which is illegal under computer misuse laws. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-028', chapterId:'g9ict-word-processing', subsection:'toc_lists', difficulty:1,
    question:'The <b>Home tab</b> in Microsoft Word is used to insert a table of contents.',
    answer:false,
    hint:'Think about which tab contains references and citations.',
    explanation:'False. A table of contents is inserted from the <b>References tab</b>, not the Home tab. The Home tab is used for basic formatting such as font and paragraph styles. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-029', chapterId:'g9ict-presentation', subsection:'charts_tables', difficulty:1,
    question:'A table can be added to a PowerPoint slide using the <b>Insert tab</b>.',
    answer:true,
    hint:'Most things you add to a slide are found in the Insert tab.',
    explanation:'True. In PowerPoint, the Insert tab provides options to insert tables, charts, images, and other objects onto a slide. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-030', chapterId:'g9ict-networks', subsection:'topologies', difficulty:2,
    question:'In a <b>ring topology</b>, every node is connected directly to a central computer.',
    answer:false,
    hint:'Think about the shape of a ring — there is no central device.',
    explanation:'False. In a ring topology each device connects to exactly two others, forming a circle. It is the <b>star topology</b> where all nodes connect to a central switch or hub. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-031', chapterId:'g9ict-ethics-security', subsection:'data_security', difficulty:1,
    question:'A computer virus is a piece of hardware inserted into a computer to damage it.',
    answer:false,
    hint:'Viruses spread through files, emails, and downloads.',
    explanation:'False. A computer virus is malicious <b>software</b>, not hardware. It spreads by attaching itself to programs or files. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-032', chapterId:'g9ict-ethics-security', subsection:'plagiarism', difficulty:1,
    question:'Plagiarism-checking tools are freely available on the internet.',
    answer:true,
    hint:'Sites such as DupliChecker and Grammarly offer free checks.',
    explanation:'True. Many free plagiarism checkers exist online (e.g. DupliChecker, PlagScan free tier) allowing anyone to check whether text has been copied. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-033', chapterId:'g9ict-networks', subsection:'wired_wireless', difficulty:1,
    question:'WiFi transmits data using radio waves.',
    answer:true,
    hint:'This is why WiFi works through walls.',
    explanation:'True. WiFi uses radio waves to transmit data wirelessly between devices and a router, typically in the 2.4 GHz or 5 GHz frequency bands. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-034', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:1,
    question:'A flowchart is always read from <b>top to bottom</b>.',
    answer:true,
    hint:'Arrows show the direction of flow.',
    explanation:'True. Flowcharts are read by following the arrows, which generally flow from top to bottom. Decision branches may loop back upward, but the overall direction is downward. 📄 NCE 2022 ICT exam.' }),

  makeTF({ id:'g9ict-pp22-035', chapterId:'g9ict-databases', subsection:'queries', difficulty:2,
    question:'In a database, a query is used to <b>input</b> data into a table.',
    answer:false,
    hint:'A query retrieves or searches; something else is used to add new records.',
    explanation:'False. A query is used to <b>retrieve and filter</b> data from a database. A <b>form</b> is the tool used to enter data into a table. 📄 NCE 2022 ICT exam.' }),

  /* ── Q4(a) Matching adapted to MCQ ── */
  makeMCQ({ id:'g9ict-pp22-036', chapterId:'g9ict-presentation', subsection:'video_enhancement', difficulty:1,
    question:'<b>Audio overlay</b> in video editing means…',
    options:['Adding subtitles to a video','Adding a sound file over a movie clip','Removing background noise','Changing the video resolution'],
    answer:'Adding a sound file over a movie clip',
    hint:'It layers an audio track on top of existing video footage.',
    explanation:'Audio overlay means laying an additional sound file (e.g. narration or music) over a video clip. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-037', chapterId:'g9ict-presentation', subsection:'comic_strips', difficulty:1,
    question:'A <b>comic strip</b> is best described as…',
    options:['A chart showing data trends','A sequence of images that tells a story','A type of network diagram','A slide layout in PowerPoint'],
    answer:'A sequence of images that tells a story',
    hint:'Think of newspaper cartoons.',
    explanation:'A comic strip is a series of illustrated panels arranged in sequence to tell a story or deliver a message. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-038', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:2,
    question:'Which of the following is a function of an operating system that deals with problems that arise during program execution?',
    options:['Memory management','File management','Error handling','Processor management'],
    answer:'Error handling',
    hint:'It detects and responds to unexpected conditions in software.',
    explanation:'Error handling is the OS function that detects, reports, and manages runtime errors so that programs or the system can recover gracefully. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-039', chapterId:'g9ict-networks', subsection:'network_types', difficulty:1,
    question:'A <b>LAN</b> is best described as…',
    options:['A network connecting computers across a country','A network spanning multiple cities','A small computer network shared by users within a single building or campus','A global public network'],
    answer:'A small computer network shared by users within a single building or campus',
    hint:'Schools and offices typically have one of these.',
    explanation:'A LAN (Local Area Network) is limited to a small geographic area such as a building or campus, and is shared by its users. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-040', chapterId:'g9ict-ethics-security', subsection:'social_economic_effects', difficulty:1,
    question:'<b>Software piracy</b> refers to…',
    options:['Hacking into a computer system','Using someone else\'s password','Illegal copying, distribution, and use of software','Spreading computer viruses'],
    answer:'Illegal copying, distribution, and use of software',
    hint:'It deprives software developers of their rightful income.',
    explanation:'Software piracy is the unauthorised copying, distribution, or use of commercial software without a valid licence. It is illegal and harms the software industry. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-041', chapterId:'g9ict-ethics-security', subsection:'internet_dangers', difficulty:1,
    question:'<b>Game addiction</b> is best described as…',
    options:['Playing a new game for the first time','Completing all levels of a game','Playing computer games uncontrollably for very long periods, to the point of neglecting other activities','Buying too many games online'],
    answer:'Playing computer games uncontrollably for very long periods, to the point of neglecting other activities',
    hint:'It is a behavioural addiction similar to gambling addiction.',
    explanation:'Game addiction is an excessive, compulsive pattern of gaming that interferes with daily life, relationships, and responsibilities. 📄 NCE 2022 ICT exam.' }),

  /* ── Q5 Troubleshooting ── */
  makeMCQ({ id:'g9ict-pp22-042', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:1,
    question:'Which key combination can be used to <b>undo</b> an accidental file deletion immediately after it occurs?',
    options:['Ctrl + C','Ctrl + Z','Alt + F4','Ctrl + X'],
    answer:'Ctrl + Z',
    hint:'This shortcut undoes the most recent action in most Windows applications.',
    explanation:'Ctrl + Z undoes the last action. Pressing it immediately after deleting a file can restore it before it is permanently removed. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-043', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:2,
    question:'External speakers are producing <b>no sound</b>. Which of the following actions would <b>NOT</b> help fix the problem?',
    options:['Check that the speaker cable is plugged into the correct port','Check the volume level in the computer system settings','Check that the power cord of the speakers is connected and turned on','Press the ENTER key on the keyboard'],
    answer:'Press the ENTER key on the keyboard',
    hint:'The Enter key does not affect audio hardware connections.',
    explanation:'Pressing Enter has no effect on audio output. Checking the cable connection, system volume, and power supply are all valid troubleshooting steps for silent speakers. 📄 NCE 2022 ICT exam.' }),

  /* ── Q7 Mail merge MCQ ── */
  makeMCQ({ id:'g9ict-pp22-044', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:1,
    question:'In Microsoft Word, which <b>tab</b> contains the "Start Mail Merge" option?',
    options:['Home','Insert','Mailings','References'],
    answer:'Mailings',
    hint:'Its name tells you it is all about sending letters and emails to many people.',
    explanation:'The Mailings tab in Microsoft Word contains all the mail merge tools, including "Start Mail Merge", "Select Recipients", and "Finish & Merge". 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-045', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:1,
    question:'What is the <b>first</b> step when performing a mail merge?',
    options:['Insert the merge fields into the document','Create the mailing list (data source)','Create the main document (template)','Finish and merge the documents'],
    answer:'Create the main document (template)',
    hint:'You need something to merge into before you can add data.',
    explanation:'The first step in mail merge is to create the main template document that will be sent to all recipients. Then the data source (mailing list) is linked, and finally the fields are inserted and merged. 📄 NCE 2022 ICT exam.' }),

  /* ── Q8 Intranet / Extranet / VPN ── */
  makeMCQ({ id:'g9ict-pp22-046', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:1,
    question:'Which type of private network is <b>accessible only to members within an organisation</b>?',
    options:['Extranet','Internet','Intranet','VPN'],
    answer:'Intranet',
    hint:'Like the internet but only for internal staff.',
    explanation:'An intranet is a private network that uses internet technology but is restricted to employees or members within a single organisation. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-047', chapterId:'g9ict-networks', subsection:'network_basics', difficulty:1,
    question:'<b>VPN</b> stands for…',
    options:['Virtual Personal Network','Variable Public Node','Virtual Private Network','Verified Protocol Node'],
    answer:'Virtual Private Network',
    hint:'It creates a secure encrypted tunnel over the public internet.',
    explanation:'VPN stands for Virtual Private Network — a technology that creates a secure, encrypted connection over the public internet, allowing remote access to a private network. 📄 NCE 2022 ICT exam.' }),

  /* ── Q9 Spreadsheet (BMI) ── */
  makeMCQ({ id:'g9ict-pp22-048', chapterId:'g9ict-spreadsheets', subsection:'cells_ranges', difficulty:2,
    question:'A spreadsheet has names in column A and BMI values in column D, with row 1 as header and rows 2–6 as data. Keerthi\'s BMI of 36.79 is in row 4. What is the cell address?',
    options:['D3','D4','D5','D6'],
    answer:'D4',
    hint:'Column D, row 4.',
    explanation:'Keerthi is in row 4 and the BMI column is D, so the cell address is D4. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-049', chapterId:'g9ict-spreadsheets', subsection:'formulas', difficulty:2,
    question:'BMI is calculated as Weight ÷ (Height × Height). If weight is in column B and height is in column C, which formula correctly calculates the BMI for row 2?',
    options:['=sum(B2:C2)','=B2/(C2*C2)','=B2*C2','=(B2+C2)/2'],
    answer:'=B2/(C2*C2)',
    hint:'Divide weight by height squared.',
    explanation:'BMI = Weight ÷ (Height²). In spreadsheet notation: =B2/(C2*C2) divides B2 by C2 multiplied by itself. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-050', chapterId:'g9ict-spreadsheets', subsection:'advanced_formatting', difficulty:2,
    question:'Conditional formatting is applied to cells D2:D6 to highlight values <b>between 20 and 23</b>. The BMI values are: D2=26.57, D3=22.86, D4=36.79, D5=24.61, D6=24.22. Which cell will be highlighted?',
    options:['D2','D3','D5','D6'],
    answer:'D3',
    hint:'Which value falls within the range 20 to 23 inclusive?',
    explanation:'Only D3 (22.86) is between 20 and 23. D2=26.57, D4=36.79, D5=24.61, and D6=24.22 are all outside this range. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-051', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:2,
    question:'Column E shows "Normal" or "Overweight" based on BMI. The values are: E2=Overweight, E3=Normal, E4=Overweight, E5=Normal, E6=Normal. What will <b>=COUNTIF(E2:E6,"Normal")</b> return?',
    options:['2','3','4','5'],
    answer:'3',
    hint:'Count how many cells say "Normal".',
    explanation:'E3, E5, and E6 contain "Normal" — that is 3 cells, so COUNTIF returns 3. 📄 NCE 2022 ICT exam.' }),

  /* ── Q10 Database ── */
  makeMCQ({ id:'g9ict-pp22-052', chapterId:'g9ict-databases', subsection:'db_tables', difficulty:1,
    question:'The COURSES table shows: CS403, CS401, MGT401, SOC402, PHY404. How many <b>records</b> are in the COURSES table?',
    options:['3','4','5','6'],
    answer:'5',
    hint:'Each row is one record.',
    explanation:'There are 5 rows of data (CS403, CS401, MGT401, SOC402, PHY404), so the table has 5 records. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-053', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:1,
    question:'In a database, which object is <b>used to enter data</b> into a table?',
    options:['Query','Report','Form','Table'],
    answer:'Form',
    hint:'It provides a user-friendly interface for data entry.',
    explanation:'A form provides a structured interface for users to enter and edit records in a database table without interacting directly with the table. 📄 NCE 2022 ICT exam.' }),

  makeMCQ({ id:'g9ict-pp22-054', chapterId:'g9ict-databases', subsection:'forms_reports', difficulty:1,
    question:'In a database, which object is used to <b>organise and display data</b> extracted from a table in a formatted, printable layout?',
    options:['Form','Query','Report','Macro'],
    answer:'Report',
    hint:'You would use this to produce a neat printed summary of database information.',
    explanation:'A report is used to present database data in a formatted, printable layout — often including totals, groupings, and labels. 📄 NCE 2022 ICT exam.' })

);

/* ── Section B written questions (PDF only) ── */
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g9ict-pp22-pdf-001', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:2,
    question:'The table shows two laptops A and B with different specs (processor speed, RAM, hard disk, webcam, weight). (a) Which has higher processor speed? (b)(i) What is Laptop A\'s memory size? (b)(ii) One advantage Laptop B has over Laptop A in terms of memory size? (c) Which laptop is better for backup and why? (d) What is the purpose of a webcam?',
    markScheme:'(a) Laptop B (2.3 GHz > 1.6 GHz) [1]. (b)(i) 4 GB [1]. (b)(ii) Laptop B has more RAM (8 GB) allowing more programs to run simultaneously [1]. (c) Laptop B; it has a larger hard disk (1 TB vs 500 GB) so more backup data can be stored [2]. (d) A webcam is an input device used to capture video and images for video calls, recording, etc. [2]. NCE 2022 ICT exam.' },

  { id:'g9ict-pp22-pdf-002', chapterId:'g9ict-word-processing', subsection:'mail_merge', difficulty:2,
    question:'A mail merge letter (Application for social housing) is to be sent to a list of recipients. (a) Which tab in Word starts mail merge? (b) Put the three steps in order: "Insert fields to merge the two documents", "Create a mailing list", "Create a template". (c) Complete the letter for the recipient Peerun, Osman, Mr, Military Road, Port Louis, AptNo 546, Date 15/12/22.',
    markScheme:'(a) Mailings tab [1]. (b) 1-Create a template, 2-Create a mailing list, 3-Insert fields to merge [3]. (c) Mr Osman Peerun / Military Road / Port Louis // Dear Mr Peerun // apartment 546 on 15/12/22 [3]. NCE 2022 ICT exam.' },

  { id:'g9ict-pp22-pdf-003', chapterId:'g9ict-networks', subsection:'intranet_extranet', difficulty:2,
    question:'(a) Tick whether each statement refers to an Intranet or Extranet: (i) A private network accessible to members within an organisation only; (ii) A private network that allows authorised users from outside an organisation to access it. (b) What does VPN stand for? (c) Give two purposes of a VPN. (d) Explain the purpose of (i) a NIC and (ii) a MODEM.',
    markScheme:'(a)(i) Intranet [1]; (ii) Extranet [1]. (b) Virtual Private Network [1]. (c) Any two: encrypts data over public internet; allows remote workers to access company network; connects branch offices securely [1 each]. (d)(i) NIC (Network Interface Card) connects a computer to a network [2]; (ii) MODEM converts digital signals to analogue and vice versa for transmission over telephone lines [2]. NCE 2022 ICT exam.' },

  { id:'g9ict-pp22-pdf-004', chapterId:'g9ict-spreadsheets', subsection:'functions', difficulty:3,
    question:'BMI spreadsheet (Weight/Height²). (a) Cell with BMI 36.79? (b) Formula in D2? (c) Formula in D7 for average BMI? (d) IF formula in E2: =IF(E2>___,"overweight","___")? (e) Conditional formatting between 20 and 23 on D2:D6 — name a formatted cell. (f) =COUNTIF(E2:E6,"Normal") — what is the output?',
    markScheme:'(a) D4 [1]. (b) =B2/(C2*C2) [1]. (c) =AVERAGE(D2:D6) [2]. (d) =IF(D2>25,"overweight","normal") [2]. (e) D3 (22.86) [2]. (f) 3 [1]. NCE 2022 ICT exam.' },

  { id:'g9ict-pp22-pdf-005', chapterId:'g9ict-algorithms', subsection:'flowchart_reading', difficulty:3,
    question:'An algorithm calculates weekly pay: weeklyPay = hourlyPay × hoursWorked. If weeklyPay > 400 then weeklyPay = weeklyPay + 70. Design a flowchart using the statements: 1-Input hourlyPay, 2-weeklyPay=hourlyPay×hoursWorked, 3-End, 4-Input hoursWorked, 5-Start, 6-Output weeklyPay, 7-weeklyPay=weeklyPay+70, 8-Is weeklyPay>400? Place the six missing statements in the flowchart (Start and End are given).',
    markScheme:'Correct order: 5-Start → 1-Input hourlyPay → 4-Input hoursWorked → 2-weeklyPay=hourlyPay×hoursWorked → 8-Is weeklyPay>400? → Yes: 7-weeklyPay=weeklyPay+70 → 6-Output weeklyPay → 3-End; No from decision also leads to 6-Output weeklyPay [6 marks, 1 per correct placement]. NCE 2022 ICT exam.' }

);
