'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — LEVEL 4 (applied) items, part 1 of 4: computer systems,
//  software & the OS, troubleshooting, health & safety.
//  IDs: g9ict-l4-001 … g9ict-l4-071. Block chosen because no id in this pack
//  begins g9ict-l4- (25 prefixes in use, checked 2026-09-19).
//
//  ⚠ WHY THIS FILE EXISTS. Measured 2026-09-19 across the built bundles:
//    grade9-ict held 45 L4 items against 1,708 poolable — 2.6%, the lowest
//    L4 share of any live pack — and three chapters (software-os,
//    presentation, health-safety) held ZERO. getQuestionsForChapter() never
//    runs a generator for difficulty 4, so a chapter's static L4 stock IS the
//    ceiling: choosing Challenge in one of those three fell straight through
//    to the mixed-practice fallback and a toast.
//
//  ⚠ L4 IS NOT "HARDER RECALL" HERE. In this pack it is the applied /
//    contextual band from scripts/audit-difficulty-labels.js — a situation
//    the pupil has to reason about, not a fact to retrieve. Every item below
//    gives a scenario and asks for a decision, a diagnosis or a consequence.
//    A question that can be answered by recognising a definition belongs at
//    L1/L2 and there are 1,600 of those already.
//
//  ⚠ OPTIONS ARE KEPT THE SAME SHAPE AND LENGTH. The answer to an applied
//    question wants to be the long, careful one; that is exactly the leak
//    scripts/test-option-parity.js measures. Lengthen a distractor, never
//    trim the answer.
//
//  ⚠ HINTS NAME WHAT TO WEIGH, NEVER THE ANSWER.
//
//  Source: NCF Grades 7-9 §8; NCE ICT (N540) 2021-2025.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── COMPUTER SYSTEMS — g9ict-l4-001 … 014 ─────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-001', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:4,
  question:'A supermarket in Curepipe is replacing its checkouts. The manager says two things matter: serving a queue quickly, and never charging the wrong price. Which input device best meets <b>both</b>?',
  options:['A barcode scanner reading the label already printed on each item',
           'A numeric keypad where the cashier types the code of each item',
           'A touch screen showing a long picture menu of every item sold',
           'A microphone into which the cashier says the name of each item'],
  answer:'A barcode scanner reading the label already printed on each item',
  hint:'Weigh the two requirements together. Which device removes the step where a human could get it wrong?',
  explanation:'A barcode scanner reads a code that is already on the product, so there is no typing and no chance of a mistyped price. The keypad and the touch screen are both faster than nothing but still depend on the cashier choosing correctly, and speech recognition is slower and less reliable in a noisy shop.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-002', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:4,
  question:'A school wants pupils to register their own attendance at the lab door. The deputy rector rejects a swipe card, saying a card can be handed to a friend. Which input device answers that objection?',
  options:['A fingerprint scanner, because the pupil must be present in person',
           'A keypad with a personal code, because each pupil has a number',
           'A second swipe card kept by the teacher for absent pupils only',
           'A webcam that records the queue so it can be checked later on'],
  answer:'A fingerprint scanner, because the pupil must be present in person',
  hint:'The objection is not about speed or cost. It is about what can be passed to somebody else.',
  explanation:'Biometric input measures the person, not something they carry, so it cannot be lent. A code can be told to a friend exactly as a card can be handed over, and a recording only lets you find out afterwards that the register was wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-003', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:4,
  question:'An artist wants to draw flowing freehand curves straight into a design program, with thin lines when the hand presses lightly. Which device suits the work best?',
  options:['A graphics tablet with a pressure-sensitive pen held like a pencil',
           'A mouse, because it moves a pointer smoothly around the screen',
           'A flatbed scanner, because it copies a drawing into the machine',
           'A trackpad, because a fingertip can move in any direction at all'],
  answer:'A graphics tablet with a pressure-sensitive pen held like a pencil',
  hint:'Two things are being asked for: a natural drawing grip, and lines that vary as the hand presses.',
  explanation:'Only a graphics tablet reports how hard the pen is pressed, which is what varies the line thickness, and it is held like a pencil. A scanner copies a drawing that already exists on paper rather than letting the artist draw live, and neither a mouse nor a trackpad senses pressure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-004', chapterId:'g9ict-computer-systems', subsection:'input_devices', difficulty:4,
  question:'A college must mark 3,000 multiple-choice answer sheets in one day. Candidates shade a box in pencil for each answer. Which device is designed for exactly this job?',
  options:['An optical mark reader, which detects the position of each shaded box',
           'An optical character reader, which turns printed letters into text',
           'A flatbed scanner, which saves a picture of every sheet as a file',
           'A barcode reader, which reads the printed code at the top of each'],
  answer:'An optical mark reader, which detects the position of each shaded box',
  hint:'What is actually being read off the sheet — a letter, a picture, or a mark in a known place?',
  explanation:'OMR reads the position of pencil marks, which is all an answer sheet contains, so it is both fast and reliable. OCR is for reading printed or written characters, a scanner only produces images that still need marking, and a barcode identifies the candidate rather than the answers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-005', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:4,
  question:'A surveyor must produce a site plan of a school field on one sheet 1.2 metres wide, with lines that stay accurate. Which output device is appropriate?',
  options:['A plotter, which draws continuous lines on very wide sheets of paper',
           'A laser printer, which prints a page of text quickly and very sharply',
           'An inkjet printer, which prints photographs in colour onto A4 paper',
           'A large monitor, which displays the whole plan at once on the screen'],
  answer:'A plotter, which draws continuous lines on very wide sheets of paper',
  hint:'Look at the width asked for, and at whether the output has to leave the building on paper.',
  explanation:'A plotter is built for large-format line drawings such as plans and maps. Office printers are limited to small paper sizes whatever their quality, and a monitor cannot be taken to a site or filed with the plans.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-006', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:4,
  question:'An office prints about 4,000 pages of black text every month and complains that printing costs too much. Which change addresses the complaint?',
  options:['Move to a laser printer, whose cost for each printed page is lower',
           'Move to an inkjet printer, which costs less money to buy outright',
           'Move to a thermal printer, which is used for printing till receipts',
           'Move to a dot matrix printer, which strikes a ribbon against paper'],
  answer:'Move to a laser printer, whose cost for each printed page is lower',
  hint:'The complaint is about the running cost over a month, not the price on the shelf.',
  explanation:'A toner cartridge yields far more pages than an ink cartridge, so at this volume the cost per page falls even though the printer itself costs more. Choosing on purchase price alone is the misconception here; thermal and dot matrix printers are built for receipts and multi-part forms, not office documents.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-007', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:4,
  question:'A pupil who is blind needs to take a copy of her notes home from the lab and read them later without a computer. Which output device gives her that?',
  options:['A braille embosser, which punches raised dots onto a sheet of paper',
           'A loudspeaker, which reads the notes aloud while she sits in the lab',
           'A screen reader, which speaks the text that is shown on the monitor',
           'A colour monitor set to the very largest text size it will display'],
  answer:'A braille embosser, which punches raised dots onto a sheet of paper',
  hint:'Two conditions must hold at once: she takes it home, and there is no computer there.',
  explanation:'Only the embosser produces something physical she can read away from the machine. A loudspeaker and a screen reader both need the computer running, and a larger font helps a partially sighted reader rather than a blind one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-008', chapterId:'g9ict-computer-systems', subsection:'output_devices', difficulty:4,
  question:'A teacher must show the same slides to 200 pupils seated in a hall. The lab has spare monitors and a spare projector. Which is the sound choice, and on what ground?',
  options:['The projector, because one large image can be seen from the back row',
           'A monitor, because the picture it shows is sharper than a projection',
           'A monitor, because it does not need the hall lights to be turned down',
           'The projector, because it can be carried more easily than a monitor'],
  answer:'The projector, because one large image can be seen from the back row',
  hint:'Judge by whether the audience at the back can read it, not by picture quality.',
  explanation:'The deciding factor is the size of the audience: a projected image scales to the room while a monitor does not. The sharpness and lighting points are true of monitors and still do not solve the problem of 200 people, and portability is not what is being asked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-009', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:4,
  question:'A studio must keep a weekly backup of 2 TB of video and store it off site. Cost matters more than speed, because the copy is only read if something goes wrong. Which medium fits?',
  options:['An external hard disk drive, which gives the most capacity for the money',
           'A solid state drive, which reads and writes files much faster than a disk',
           'A set of DVDs, which are cheap individually and easy to store in a box',
           'A USB flash drive, which is small enough to be carried in a shirt pocket'],
  answer:'An external hard disk drive, which gives the most capacity for the money',
  hint:'Rank the four on cost for each gigabyte, then check the one you pick can actually hold 2 TB.',
  explanation:'A hard disk is still the cheapest way to hold terabytes, and speed is explicitly not the requirement. An SSD wins on speed at a much higher price per gigabyte, and 2 TB would need well over 400 DVDs or a flash drive far larger than most.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-010', chapterId:'g9ict-computer-systems', subsection:'storage_devices', difficulty:4,
  question:'A field officer carries a laptop over rough roads and has already broken two machines by dropping the bag. Which storage choice reduces the risk, and why?',
  options:['A solid state drive, because it holds data with no moving parts inside',
           'A hard disk drive, because its platters are sealed inside a metal case',
           'An optical drive, because a scratched disc can usually still be copied',
           'A magnetic tape drive, because tape is flexible and does not shatter'],
  answer:'A solid state drive, because it holds data with no moving parts inside',
  hint:'Ask what is physically moving inside each device while it is being carried.',
  explanation:'A shock damages a drive by disturbing parts that spin or move, and an SSD has none. A sealed case does not stop the head of a hard disk striking a spinning platter, and optical and tape drives both move the medium past a head as well.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-011', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:4,
  question:'A computer is fine with one program open but crawls once a browser, a spreadsheet and a photo editor are all running. The hard disk is only half full. What is the most likely cause?',
  options:['There is too little RAM, so the machine keeps swapping data to the disk',
           'There is too little disk space, so the files cannot be saved correctly',
           'The processor has too few cores to display more than one window at a time',
           'The monitor refreshes too slowly to redraw several open windows at once'],
  answer:'There is too little RAM, so the machine keeps swapping data to the disk',
  hint:'The clue is that the slowdown appears only when several programs are open together. What is shared between them?',
  explanation:'Every running program needs space in RAM; when it runs out the operating system moves pages to the much slower disk, and that swapping is felt as crawling. The question rules out a full disk, and neither the number of cores nor the monitor changes with the number of programs open.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-012', chapterId:'g9ict-computer-systems', subsection:'cpu_memory', difficulty:4,
  question:'A cyclone cuts the power while a pupil is typing. When the lights come back the document has lost the last twenty minutes of work, but the program itself still starts normally. Why?',
  options:['The typing was held in RAM, which is volatile, while the program sits on disk',
           'The typing was held on the hard disk, which is erased whenever power is lost',
           'The typing was held in ROM, which can only be written to once by the maker',
           'The typing was held in the cache, which the processor clears after each use'],
  answer:'The typing was held in RAM, which is volatile, while the program sits on disk',
  hint:'Two things behaved differently in the same power cut. What kind of memory was each one sitting in?',
  explanation:'Unsaved work lives in volatile RAM and is lost the instant power stops, which is the whole reason for saving. The installed program survives because it is stored on disk, ROM keeps its contents rather than losing them, and the cache is far too small to hold a document.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9ict-l4-013', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:4,
  question:'A camera saves each photograph as a file of 4 MB. A memory card holds 2 GB and is completely empty. Taking 1 GB = 1024 MB, how many photographs will fit on the card?',
  answer:512,
  hint:'Convert the card to the same unit as one photograph before you divide.',
  explanation:'2 GB is 2 x 1024 = 2048 MB, and 2048 / 4 = 512 photographs. Working in mixed units is the usual slip here: dividing 2 by 4 suggests the card cannot hold even one photograph.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-014', chapterId:'g9ict-computer-systems', subsection:'data_units', difficulty:4,
  question:'A pupil reports that a 5 GB film will not copy onto a 5 GB flash drive that shows 4.66 GB free on a brand new drive. What is the sensible explanation to give?',
  options:['Some capacity is used by formatting, and makers count a GB as 1000 MB',
           'The flash drive has already been used and files are hidden on it now',
           'A film file always grows larger when it is copied onto a flash drive',
           'The drive is faulty and should be exchanged at the shop immediately'],
  answer:'Some capacity is used by formatting, and makers count a GB as 1000 MB',
  hint:'The drive is new and empty, so the missing space was never available. Where did the maker and the computer disagree?',
  explanation:'Manufacturers sell a gigabyte as 1,000,000,000 bytes while the computer reports in units of 1024, and the file system itself occupies some space, so usable capacity is always a little under the number on the packet. Nothing here indicates a fault or hidden files, and a file does not grow when copied.' }));

// ── SOFTWARE & THE OPERATING SYSTEM — g9ict-l4-015 … 034 ──────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-015', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'A pupil drags a file into a folder that already holds a file with the same name, and a box appears offering Replace, Skip or Keep both. Which operating system function has just acted?',
  options:['File management, which keeps track of where every file is stored',
           'Memory management, which decides which program gets space in RAM',
           'Device management, which passes instructions to the attached devices',
           'Security management, which checks that a user is allowed to do this'],
  answer:'File management, which keeps track of where every file is stored',
  hint:'Name the thing the box is actually protecting: not the memory, not the device.',
  explanation:'Naming, storing and organising files is the file management function, and it raised the warning because two files cannot share a name in one folder. The other three functions were all running at the same moment but none of them is what produced this particular question.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-016', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'Two teachers each send a ten page document to the same office printer at the same moment. Both documents print in full, one after the other, with no pages mixed together. What made that possible?',
  options:['Print spooling, which queues each job and releases it in turn',
           'Multitasking, which lets the processor run two programs at once',
           'Virtual memory, which lends disk space when the RAM is all used',
           'Disk formatting, which prepares the surface before anything is put on'],
  answer:'Print spooling, which queues each job and releases it in turn',
  hint:'Ask what had to happen to the second document while the first one was printing.',
  explanation:'The spooler holds each job in a queue and feeds the printer one at a time, which is exactly why the pages do not interleave. Multitasking explains how both teachers could carry on working, but it is the queue that keeps the two documents apart.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-017', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'A new printer is plugged into a computer. The operating system recognises that something has been attached but nothing prints until extra software is installed. What was missing?',
  options:['The device driver, which tells the system how to talk to that model',
           'The application software, which is what a user types a document into',
           'The utility program, which keeps the machine tidy and free of faults',
           'The system update, which repairs faults found since the last release'],
  answer:'The device driver, which tells the system how to talk to that model',
  hint:'The system saw the device. What it did not have was the instructions for this particular one.',
  explanation:'A driver translates general instructions such as print this page into the commands one make and model understands, so without it the printer is detected and unusable. An application produces the document but cannot drive the hardware, and neither utilities nor updates supply model-specific instructions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-018', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'A machine with little RAM keeps working when many programs are open, but the hard disk light is on constantly and everything slows down. Which function is doing this, and at what cost?',
  options:['Virtual memory, which borrows disk space and is far slower than RAM',
           'Disk defragmentation, which rearranges files and takes a long while',
           'File compression, which shrinks files and must expand them to be read',
           'Power management, which slows the processor down to save electricity'],
  answer:'Virtual memory, which borrows disk space and is far slower than RAM',
  hint:'Something is being used as if it were memory. Which component is the light telling you about?',
  explanation:'When RAM runs out the operating system swaps pages to a file on disk so programs can continue, and because a disk is far slower than RAM the machine crawls while the light stays on. Defragmentation and compression are jobs a user starts, and power management would slow the processor without any disk activity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-019', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'A browser stops responding. The pupil opens the task manager, ends that one program, and the spreadsheet she had open keeps running untouched. What does this show about the operating system?',
  options:['It manages each process separately, so one can be stopped on its own',
           'It saves every open document automatically before it ends a program',
           'It runs only one program at a time and had to close the other first',
           'It repairs damaged programs automatically once they stop responding'],
  answer:'It manages each process separately, so one can be stopped on its own',
  hint:'The evidence is what happened to the OTHER program, not to the one that froze.',
  explanation:'Process management keeps each running program separate so a failure in one does not take the rest down, which is why ending the browser left the spreadsheet alone. Ending a process discards its unsaved work rather than saving it, and nothing here repairs anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-020', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'Two pupils share one lab computer. Each signs in and finds her own desktop, her own documents, and no access at all to the files of the other. Which function of the operating system provides this?',
  options:['User account management, which separates and protects each login',
           'Memory management, which gives each program its own area of RAM',
           'File compression, which packs each set of documents more tightly',
           'Device management, which shares the printer between both of them'],
  answer:'User account management, which separates and protects each login',
  hint:'Separate desktops is one half of it. Not being able to open the files of the other pupil is the half that names the function.',
  explanation:'User accounts give each person a private area and enforce who may read what, which is why neither pupil can reach the other files. Memory management separates programs rather than people, and neither compression nor device management controls access.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-021', chapterId:'g9ict-software-os', subsection:'os_functions', difficulty:4,
  question:'A pupil insists a file is saved on the desktop and not in any folder. The technician shows that the desktop is itself a folder inside the pupil account. What does the example illustrate?',
  options:['Every file sits somewhere in the directory tree the system maintains',
           'A desktop file is stored in RAM until the computer is shut down again',
           'Files on the desktop are copies of files that are kept somewhere else',
           'The desktop is a picture of the disk rather than a place to store data'],
  answer:'Every file sits somewhere in the directory tree the system maintains',
  hint:'The technician is making a point about where files can possibly be, not about the desktop specifically.',
  explanation:'The file system is a tree and every file has a path within it; the desktop is simply a folder the system displays as a background. Desktop files are stored on disk like any others and are not duplicates of anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-022', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'A school server holds every pupil account. Thirty pupils sign in from thirty lab machines during the same period and each sees only their own work. Which kind of operating system is required?',
  options:['A multi-user system, which serves many accounts at the same time',
           'A single-user system, which serves one person at a time only',
           'A real-time system, which must answer within a fixed time limit',
           'An embedded system, which is built into one appliance and fixed'],
  answer:'A multi-user system, which serves many accounts at the same time',
  hint:'Count the people being served at once, not the number of machines.',
  explanation:'Serving many named accounts simultaneously, each kept separate, is the definition of a multi-user operating system. Real-time systems are defined by deadlines rather than by user numbers, and an embedded system runs one fixed job inside a device.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-023', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'An airline seat booking system must never sell the same seat twice, so every request has to be answered before the next one is accepted. Which kind of operating system is this?',
  options:['A real-time system, which must respond within a guaranteed time',
           'A batch system, which collects jobs and runs them all together',
           'A single-tasking system, which finishes one program before another',
           'A distributed system, which spreads one job over several machines'],
  answer:'A real-time system, which must respond within a guaranteed time',
  hint:'The requirement is about WHEN the answer must arrive, not about how many machines or users there are.',
  explanation:'A real-time system is one where a late answer is a wrong answer, which is exactly the seat-booking condition. A batch system would hold the requests up until later, and the other two describe how work is divided rather than any deadline.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-024', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'A payroll program processes 5,000 employee records between 2 a.m. and 4 a.m. with nobody at the keyboard, and the payslips are ready in the morning. What kind of processing is this?',
  options:['Batch processing, where jobs are collected and run without a user',
           'Real-time processing, where each record is answered immediately',
           'Interactive processing, where the user answers a question per record',
           'Online processing, where records are updated as they are entered in'],
  answer:'Batch processing, where jobs are collected and run without a user',
  hint:'Two details in the question point the same way: the hour, and the empty chair.',
  explanation:'Work gathered together and run unattended is batch processing, and payroll is its classic example because nothing needs an answer until morning. The other three all describe a person waiting for or supplying a response.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-025', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'A technician has to rename 500 photographs to a numbered pattern. She says the graphical interface would take an hour and a typed command will take a minute. What does her reasoning show?',
  options:['A command line can repeat one instruction over very many files at once',
           'A command line runs faster than a graphical interface on every machine',
           'A graphical interface cannot rename a file unless it is opened first',
           'A graphical interface is only meant for beginners and not for experts'],
  answer:'A command line can repeat one instruction over very many files at once',
  hint:'The saving comes from the number of files, not from the speed of the computer.',
  explanation:'A typed command can carry a pattern that applies to every matching file, so the work does not grow with the number of files, while clicking does. The interface does not make the machine itself faster, and a GUI can certainly rename files, just one at a time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-026', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'Compared with the operating system on a desktop computer, a mobile phone operating system is designed differently. Which difference follows from the way a phone is actually used?',
  options:['It must manage battery use and a touch screen as first concerns',
           'It must run much larger programs than a desktop is able to run',
           'It must store all of the user files on the screen rather than disk',
           'It must avoid multitasking so that only one app is ever open at all'],
  answer:'It must manage battery use and a touch screen as first concerns',
  hint:'What does a phone have that a desktop does not, and what does it lack?',
  explanation:'A phone runs on a battery and is driven by fingers, so power management and touch input shape its whole design. Phone apps are generally smaller than desktop software, files are still stored in memory and storage, and modern phones multitask.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-027', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'A washing machine has a small program that runs the same wash cycles for the whole life of the machine, and the owner can never install anything new on it. What is this an example of?',
  options:['An embedded operating system, fixed inside a single appliance',
           'A multi-user operating system, shared by everyone in the house',
           'A network operating system, controlling the devices in the house',
           'An open source operating system, which anyone is free to change'],
  answer:'An embedded operating system, fixed inside a single appliance',
  hint:'The telling detail is that nothing can ever be installed on it.',
  explanation:'An embedded system is built into a device to do one fixed job, which is why there is no way to add software. Nothing in the description involves several users, a network, or the freedom to modify the code.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-028', chapterId:'g9ict-software-os', subsection:'os_types', difficulty:4,
  question:'A pupil plays music while typing an assignment and downloading a file, all on one processor. Which property of the operating system is she relying on?',
  options:['Multitasking, which shares processor time between several programs',
           'Multi-user access, which lets several people sign in at one moment',
           'Virtual memory, which lends disk space when the RAM is filled up',
           'Multiprocessing, which requires a second processor to be installed'],
  answer:'Multitasking, which shares processor time between several programs',
  hint:'One person, one processor, three programs. Which of those numbers is the one being explained?',
  explanation:'Multitasking switches the processor between programs so quickly that all three appear to run together. There is only one user here, virtual memory is about space rather than about running several programs, and multiprocessing needs more than one processor.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-029', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'An older computer with a magnetic hard disk has become slow to open large files, though plenty of space is free. Which utility addresses this, and why does it help?',
  options:['A defragmenter, because scattered parts of a file are read more slowly',
           'An antivirus scanner, because a virus is what slows every old machine',
           'A compression tool, because smaller files will always open more quickly',
           'A disk formatter, because formatting restores the speed of a used disk'],
  answer:'A defragmenter, because scattered parts of a file are read more slowly',
  hint:'Free space is not the problem. Think about where on the disk the pieces of one file end up after months of editing.',
  explanation:'On a magnetic disk a fragmented file forces the head to move between scattered pieces, and defragmenting gathers them so reading is continuous. Compression trades processor time for space rather than guaranteeing speed, and formatting would erase everything on the disk.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-030', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'A pupil must email a folder of 40 documents, but the mail service refuses more than 10 attachments. Which utility solves the problem in one step?',
  options:['A compression tool, which packs the folder into one smaller archive',
           'A backup tool, which copies the folder somewhere safe automatically',
           'A defragmenter, which tidies the folder into one place on the disk',
           'A disk cleaner, which removes the temporary files the folder holds'],
  answer:'A compression tool, which packs the folder into one smaller archive',
  hint:'The limit being broken is the NUMBER of attachments. Which tool changes that number?',
  explanation:'Zipping the folder produces a single file, which satisfies the attachment limit and usually reduces the size as well. A backup copies the files without combining them, and the other two tools change nothing about what can be attached.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-031', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'A lab machine has antivirus software installed, yet a virus discovered last month has infected it. The technician finds the software has not been updated since last year. What does this show?',
  options:['Antivirus software only recognises threats its definitions describe',
           'Antivirus software has to be reinstalled completely once every year',
           'Antivirus software cannot protect a machine that is used by pupils',
           'Antivirus software must be switched off before any file is downloaded'],
  answer:'Antivirus software only recognises threats its definitions describe',
  hint:'The software was installed and running. Ask what it was comparing files against.',
  explanation:'A scanner matches files against a list of known signatures, so a threat newer than the list passes unrecognised, which is why definitions are updated frequently. Reinstalling is not what keeps it current, and switching a scanner off during downloads removes protection exactly when it is needed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-032', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'A laptop reports that the disk is nearly full. The owner has already moved her photographs to an external drive and the disk is still full. Which utility should she try next?',
  options:['Disk clean-up, which removes temporary and cached files no longer needed',
           'Disk defragmenter, which moves the files into one continuous block again',
           'File compression, which would expand every file back before it is opened',
           'System restore, which returns the settings to an earlier chosen date and'],
  answer:'Disk clean-up, which removes temporary and cached files no longer needed',
  hint:'Her own documents are already dealt with. What else takes up space that she never created on purpose?',
  explanation:'Temporary files, caches and old update files accumulate invisibly and clean-up removes them, which is the remaining source of used space. Defragmenting rearranges files without freeing any space, and a restore point uses space rather than releasing it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-033', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'A backup utility is set to copy the office files every Sunday night. The server fails on Wednesday afternoon. What is the honest thing to tell the staff?',
  options:['Work done since Sunday night has been lost and must be redone now',
           'Everything will be recovered because a backup utility was installed',
           'Only files opened on Wednesday are lost because the rest were saved',
           'Nothing is lost because the utility copies each file as it is edited'],
  answer:'Work done since Sunday night has been lost and must be redone now',
  hint:'A backup restores the state at the moment it ran. When did it last run?',
  explanation:'A weekly backup can only restore Sunday night, so Monday, Tuesday and Wednesday work is gone, which is why the interval is chosen to match how much work a business can afford to lose. Having a backup is not the same as having a recent one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-034', chapterId:'g9ict-software-os', subsection:'utility_programs', difficulty:4,
  question:'A school wants to stop outsiders on the internet reaching the machines inside the lab at all. Which is the appropriate protection, and why is the other one insufficient?',
  options:['A firewall, because it filters the traffic arriving over the connection',
           'An antivirus, because it removes any harmful file found on a machine',
           'A password policy, because it stops an outsider guessing a login name',
           'A backup routine, because it restores the lab after any attack occurs'],
  answer:'A firewall, because it filters the traffic arriving over the connection',
  hint:'The aim is to stop something reaching the machines at all, not to deal with it once it has.',
  explanation:'A firewall inspects traffic at the boundary and blocks connections that are not allowed, which is prevention at the point named in the question. Antivirus acts after a file has arrived, and backups act after damage is done; both are worth having and neither keeps outsiders out.' }));

// ── TROUBLESHOOTING — g9ict-l4-035 … 051 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-035', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A monitor shows the message No signal. The fan inside the tower is running and its power light is on. What should be checked first?',
  options:['The cable carrying the picture from the tower to the monitor itself',
           'The power supply of the tower, which is clearly not reaching the fan',
           'The hard disk of the computer, which may have lost its stored files',
           'The printer connection, which shares the same desk and power socket'],
  answer:'The cable carrying the picture from the tower to the monitor itself',
  hint:'The fan tells you one thing is already working. What is the next link in the chain to the screen?',
  explanation:'No signal means the monitor is powered and receiving nothing, and the fan shows the tower has power, so the video connection between them is the obvious suspect. Checking the power supply repeats what the fan already proved, and neither the disk nor the printer produces this message.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-036', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A mouse does not work on one lab machine. Plugged into the machine beside it, the same mouse works perfectly. What has this test established?',
  options:['The mouse is working, so the fault lies in the first computer itself',
           'The mouse is faulty and happened to work once on the second machine',
           'Both computers are faulty because a mouse should work on either one',
           'Nothing useful, because a mouse must be tested on three machines'],
  answer:'The mouse is working, so the fault lies in the first computer itself',
  hint:'One item was moved and everything else stayed the same. What does that isolate?',
  explanation:'Swapping a suspect component into a known-good machine is the standard way to split a fault in two, and here it clears the mouse and points at the first computer port, driver or settings. That is the value of changing one thing at a time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-037', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A shared lab printer prints for one pupil and not for another sitting at the next machine. The printer has paper and ink and reports no error. Where should the search begin?',
  options:['On the machine that fails, since the printer clearly works for others',
           'Inside the printer, since it is the device that both pupils are using',
           'On the network cable of the printer, which serves the whole lab room',
           'With the ink cartridge, which may be low even though no error shows'],
  answer:'On the machine that fails, since the printer clearly works for others',
  hint:'Ask what is different between the two pupils, not what they have in common.',
  explanation:'A device that works for one user and not another is evidence against the shared component, so the difference must lie on the failing machine, in its queue, driver or permissions. Investigating the printer or its cable ignores the proof that both are working.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-038', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A keyboard types the wrong symbols: pressing the double quote gives an at sign and pressing at gives a quote. Every key still produces a character. What is the likely cause?',
  options:['The language or layout setting does not match the keyboard in use',
           'The keyboard is damaged and both of those keys need to be replaced',
           'A virus has infected the computer and is changing what is being typed',
           'The word processor has a fault and should be uninstalled immediately'],
  answer:'The language or layout setting does not match the keyboard in use',
  hint:'Every key still works. Only the meaning of two of them has moved. What decides that meaning?',
  explanation:'The layout setting maps each key position to a character, and a mismatch swaps exactly the symbols that differ between two layouts while leaving the letters alone. Physical damage stops keys working altogether rather than exchanging two of them neatly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-039', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A computer restarts every few minutes. It began doing so on the afternoon a technician installed extra memory. What is the most sensible next step?',
  options:['Remove the memory that was added and see whether the restarts stop',
           'Reinstall the whole operating system to clear any damaged settings',
           'Replace the power supply because restarting suggests a power fault',
           'Run a full antivirus scan because a virus can restart the machine too'],
  answer:'Remove the memory that was added and see whether the restarts stop',
  hint:'Something changed immediately before the fault appeared. Test that first.',
  explanation:'The most recent change is the first thing to undo, because reversing it either confirms or clears the suspect in one step. Reinstalling the system or replacing parts is expensive work that would begin before the cheap test had been done.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-040', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'One particular web page will not load, while every other site opens normally on the same computer. What does this tell the pupil?',
  options:['The connection is working, so the problem lies with that site itself',
           'The internet connection has failed and the other pages are from cache',
           'The browser must be uninstalled because it can no longer load pages',
           'The network cable is loose and should be pushed back in immediately'],
  answer:'The connection is working, so the problem lies with that site itself',
  hint:'Other sites open. What does that already prove about the link to the internet?',
  explanation:'Working traffic to other sites proves the connection, the browser and the name lookup are all functioning, which leaves the one site as the suspect. Assuming the connection has failed contradicts the evidence in the question.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-041', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A laptop will not charge. A charger borrowed from an identical laptop charges it normally. What is the conclusion, and what should be done?',
  options:['The original charger is faulty and should be replaced, not the laptop',
           'The laptop battery is finished and a new battery must now be ordered',
           'The wall socket is dead and an electrician should be called to the lab',
           'The laptop needs its operating system reinstalled to charge correctly'],
  answer:'The original charger is faulty and should be replaced, not the laptop',
  hint:'One part was substituted and the fault went away. Which part?',
  explanation:'Substituting a known-good charger isolated the fault to the original charger, since everything else stayed the same and the laptop then charged. The battery and the socket are both cleared by the successful test.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-042', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A computer shows an error screen and restarts as soon as it reaches the desktop, ever since a graphics driver was updated. Windows will not stay open long enough to change anything. What is the way in?',
  options:['Start in safe mode, which loads basic drivers so the driver can be undone',
           'Format the hard disk, which removes the driver along with everything else',
           'Replace the graphics card, because the driver has damaged the hardware',
           'Wait for an automatic update, which may replace the faulty driver in time'],
  answer:'Start in safe mode, which loads basic drivers so the driver can be undone',
  hint:'You need the machine running with as little of the suspect software loaded as possible.',
  explanation:'Safe mode loads a minimal set of drivers, which gives enough time to roll the update back. Formatting destroys the user data to fix a driver, and a software update does not damage a card, so replacing it would not address the cause.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-043', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_techniques', difficulty:4,
  question:'A technician changes three settings at once and the fault disappears. His supervisor says the job is not finished properly. What is the supervisor objection?',
  options:['Nobody now knows which change fixed it, so it cannot be repeated',
           'Changing settings is never allowed without written permission first',
           'The fault will certainly return because settings always reset again',
           'Three changes take longer to make than testing one change at a time'],
  answer:'Nobody now knows which change fixed it, so it cannot be repeated',
  hint:'The machine works. What has been lost is knowledge, not function.',
  explanation:'Changing one thing at a time is what makes a result mean something; with three changes the cause is unknown, two possibly harmful changes stay in place, and the next identical fault starts from nothing. The objection is about evidence, not about permission or speed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-044', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A pupil tells the lab technician the computer is broken. Before touching anything, what should the technician do first?',
  options:['Ask exactly what happens and what the pupil was doing at the time',
           'Restart the computer, because restarting clears most common faults',
           'Open the tower and check that each card is seated in its slot firmly',
           'Note the machine number and send it away to the supplier for repair'],
  answer:'Ask exactly what happens and what the pupil was doing at the time',
  hint:'Broken is not a symptom. What has to happen before any repair can start?',
  explanation:'Identifying the problem, by questioning the user and finding out what changed, is the first step of every troubleshooting method, and it often makes the rest unnecessary. Restarting or opening the case acts before the fault is even described.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-045', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A technician has replaced a faulty network cable and the machine now reaches the internet. Which steps of the troubleshooting method still remain?',
  options:['Verify the system works fully, then record what was found and done',
           'Nothing remains, because the reported fault has now been repaired',
           'Reinstall the operating system so that the settings match the cable',
           'Replace the other cables in the room before the same fault returns'],
  answer:'Verify the system works fully, then record what was found and done',
  hint:'The repair is the middle of the method, not the end of it.',
  explanation:'Verifying full functionality catches anything the repair disturbed, and documenting it lets the next person recognise a repeat. Replacing working cables is guesswork, and a reinstall has nothing to do with a cable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-046', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A school keeps a logbook in which every lab fault and its repair is written down. What is the strongest argument for the extra work this costs?',
  options:['A fault that recurs can be recognised and fixed far more quickly',
           'The logbook proves to parents that the school looks after the lab',
           'Writing a fault down is what prevents the same fault happening again',
           'The technician can show how many hours of work have been done'],
  answer:'A fault that recurs can be recognised and fixed far more quickly',
  hint:'Ask what the NEXT person to meet this fault gets out of the book.',
  explanation:'Documentation turns one technician experience into something the whole team can use, which is why recurring faults are settled in minutes rather than diagnosed again. Recording a fault does not prevent it, and the other two answers describe side benefits rather than the purpose.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-047', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A technician thinks a failing power supply is causing random shutdowns. He fits a known-good supply and the machine still shuts down. What should he do now?',
  options:['Form a new theory and test that, keeping what the first test proved',
           'Fit a second replacement supply in case the first one was faulty too',
           'Tell the user the fault cannot be found and that nothing can be done',
           'Reinstall the operating system, since the hardware has been cleared'],
  answer:'Form a new theory and test that, keeping what the first test proved',
  hint:'A disproved theory is not a wasted one. What did the test actually establish?',
  explanation:'The test eliminated the power supply, which narrows the search, so the method loops back to establishing a new probable cause such as overheating or memory. Repeating a test that has already given a clear result adds nothing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-048', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A machine is to have its operating system reinstalled to cure repeated crashes. The user keeps her project folder on that machine. What must happen before the reinstall begins?',
  options:['Copy her files to another drive, because a reinstall can erase them',
           'Print the project so that a paper copy exists in case of any loss',
           'Ask her to close the folder so that the files are not in use at all',
           'Run a defragmenter so that her files sit together and survive it'],
  answer:'Copy her files to another drive, because a reinstall can erase them',
  hint:'The repair itself is the risk here. What has to be out of its way first?',
  explanation:'Backing up user data before a destructive repair is the step that makes the repair safe to attempt, and a copy on another drive can be restored afterwards. Printing is not a usable restore, and neither closing the folder nor defragmenting protects anything from a format.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-049', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A laptop still under warranty will not switch on. The lab technician has the tools to open it. What is the correct course of action?',
  options:['Return it to the supplier, because opening it would end the warranty',
           'Open it carefully and repair it, since the school owns the machine',
           'Open it only to look inside, then close it before sending it away',
           'Wait until the warranty has expired and repair the laptop after that'],
  answer:'Return it to the supplier, because opening it would end the warranty',
  hint:'Being able to do the work and being the right person to do it are two different questions.',
  explanation:'Work outside your authority is escalated rather than attempted, and opening a sealed machine transfers the cost of any further fault from the supplier to the school. Looking inside breaks the same seal as repairing it, and leaving a machine unusable for months is not a decision a technician makes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-050', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A pupil reports that a program crashed once yesterday. The technician asks her to open it and use it as she did then. Why does he begin that way?',
  options:['A fault that can be reproduced can be observed, timed and tested',
           'A program that crashed once will always crash the second time too',
           'The pupil is likely to have been mistaken about what she reported',
           'The technician must show the fault to the rector before repairing it'],
  answer:'A fault that can be reproduced can be observed, timed and tested',
  hint:'What can a technician do with a fault happening in front of him that he cannot do with a description?',
  explanation:'Reproducing a fault turns a report into evidence: the error message can be read, the conditions varied and any fix verified. Not every intermittent fault reproduces, which is itself useful information, and nothing here suggests the pupil is wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-051', chapterId:'g9ict-troubleshooting', subsection:'troubleshooting_steps', difficulty:4,
  question:'A technician has two possible causes for a dead monitor: a loose power lead, or a failed monitor needing replacement. Which does he test first, and on what principle?',
  options:['The power lead, because the cheapest and quickest check comes first',
           'The monitor, because replacing it settles the question either way',
           'Both together, because testing two causes at once saves him time',
           'Neither, because a dead monitor is always replaced as a matter of'],
  answer:'The power lead, because the cheapest and quickest check comes first',
  hint:'Both could be true. Order them by what it costs to find out.',
  explanation:'Eliminating the simple, free possibilities before the expensive ones is the ordering principle of troubleshooting, and a loose lead is found in seconds. Testing two things at once loses the ability to say which mattered.' }));

// ── HEALTH & SAFETY — g9ict-l4-052 … 071 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-052', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:4,
  question:'A pupil arrives at the lab with a bottle of juice and asks to keep it beside the keyboard because the lid is closed. What is the correct response, and why?',
  options:['Leave it by the door, because a spill damages the keyboard beneath it',
           'Allow it, because a closed bottle cannot spill onto the desk at all',
           'Allow it if she promises to drink it outside the room in the break',
           'Leave it in her bag, because the smell may disturb the other pupils'],
  answer:'Leave it by the door, because a spill damages the keyboard beneath it',
  hint:'The rule exists because of what liquid does to electrical equipment, not because of manners.',
  explanation:'Liquid entering a keyboard or a socket causes short circuits and corrosion, and a closed bottle is still knocked over as easily as an open one. The rule is about the equipment and the risk of shock, so a promise does not change it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-053', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:4,
  question:'A pupil notices an extension lead running across the doorway of the lab, taped down with one strip of tape. What should be reported, and on what ground?',
  options:['The lead is a trip hazard and should be rerouted away from the door',
           'The tape is untidy and a second strip should be added across the lead',
           'The lead is too short and a longer extension lead should be bought in',
           'Nothing, because the tape has made the lead safe for pupils to cross'],
  answer:'The lead is a trip hazard and should be rerouted away from the door',
  hint:'Ask where people walk, and what happens to a cable that lies in that path.',
  explanation:'A cable in a walkway is a trip hazard whether or not it is taped, and the remedy is to route it around the room or through floor trunking. Adding tape or buying a longer lead leaves the cable where people walk.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-054', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:4,
  question:'At the end of the period a pupil walks away leaving her account signed in on the lab machine. Which consequence makes this a rule rather than a courtesy?',
  options:['The next pupil could read, change or delete her files under her name',
           'The computer would use more electricity while the account stays open',
           'Her documents would slowly fill the hard disk of that lab computer',
           'The machine could not be used by anybody else during the next class'],
  answer:'The next pupil could read, change or delete her files under her name',
  hint:'Whose name is on anything done at that machine during the next period?',
  explanation:'An open session hands the next user every right the account holds, including deleting work and acting under that identity, which is why signing out is a security rule. The power and storage points are trivial by comparison and the machine remains usable either way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-055', chapterId:'g9ict-health-safety', subsection:'lab_guidelines', difficulty:4,
  question:'A pupil wants to install a free game on a lab computer so the class can play it at break. Why does the lab policy forbid this, beyond the question of wasted time?',
  options:['Unchecked software can carry malware and alter the shared machines',
           'The game would take up the space that pupils need for their own work',
           'Installing software is a task that only an adult is strong enough for',
           'The computers would then need to be defragmented at the end of term'],
  answer:'Unchecked software can carry malware and alter the shared machines',
  hint:'The machine is shared by every class. What can arrive with software from an unknown source?',
  explanation:'Software from outside the school may carry malware or change settings, and on a shared machine the effect reaches everyone who uses it afterwards. Disk space is a minor issue and defragmentation is not a consequence of installing anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-056', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:4,
  question:'Six computers, two printers and a kettle are plugged into one four-way extension lead through a single wall socket. What is the danger being created?',
  options:['The socket is overloaded, and overheated wiring can start a fire',
           'The computers will run slowly because they share one power socket',
           'The printers will print more slowly because the current is divided',
           'The kettle will take much longer than usual to boil any water in it'],
  answer:'The socket is overloaded, and overheated wiring can start a fire',
  hint:'Add up what is drawing current through one wall socket, and think what heat does to a cable.',
  explanation:'Drawing more current than the socket and lead are rated for heats the wiring and is a common cause of electrical fires, and a kettle on a computer extension is a particularly heavy load. Sharing a socket does not slow a computer down; current is not divided that way.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-057', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:4,
  question:'A pupil comes in from the rain with wet hands and reaches for a plug to switch a computer on. What should the teacher say, and why?',
  options:['Dry your hands first, because water conducts and risks an electric shock',
           'Use your left hand only, because that is further away from your heart',
           'Switch it on at the keyboard instead, because that uses far less power',
           'Ask another pupil to do it, because two people are safer than one is'],
  answer:'Dry your hands first, because water conducts and risks an electric shock',
  hint:'The hazard is a property of the water itself, not of which hand is used.',
  explanation:'Water conducts electricity and lowers the resistance of skin, so wet hands turn a safe action into a shock risk, and drying them removes the hazard entirely. Choosing a hand or a helper does not make contact with mains electricity safe.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-058', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:4,
  question:'A power socket behind a lab machine begins to smoke. Which extinguisher should be used, and what makes the obvious choice wrong?',
  options:['A carbon dioxide one, because water would conduct the current back',
           'A water one, because water is the fastest way to cool any fire down',
           'A water one, because the smoke shows the fire is only a small one',
           'Any extinguisher at all, because the type matters once it is alight'],
  answer:'A carbon dioxide one, because water would conduct the current back',
  hint:'The fire is at a live electrical point. What does that rule out?',
  explanation:'Water conducts, so using it on live equipment risks electrocuting the person holding the extinguisher and spreading the fault; carbon dioxide smothers the fire and leaves no conducting residue. The size of the fire does not change what is safe to spray at electricity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-059', chapterId:'g9ict-health-safety', subsection:'safety_precautions', difficulty:4,
  question:'A technician is about to open a desktop computer to clean dust from inside it. Which precaution comes first, and what does it prevent?',
  options:['Switch the machine off and unplug it, to prevent a shock and a short',
           'Close every open program, to prevent unsaved documents being lost',
           'Put a dust sheet on the desk, to prevent dust settling on the surface',
           'Record the serial number, to prevent a mix-up between two machines'],
  answer:'Switch the machine off and unplug it, to prevent a shock and a short',
  hint:'Rank the four by what the worst outcome would be if it were skipped.',
  explanation:'Isolating the machine from the mains before opening it is the precaution that protects a person, which is why it comes before any of the housekeeping steps. The others are sensible practice and none of them prevents an injury.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-060', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:4,
  question:'Power cuts are common during the cyclone season and the school server shuts down without warning each time. Which purchase addresses this properly?',
  options:['An uninterruptible power supply, which keeps it running to shut down',
           'A surge protector, which guards against a sudden rise in the voltage',
           'A second hard disk, which would hold a copy of every file on the first',
           'A larger power supply, which would draw more current from the mains'],
  answer:'An uninterruptible power supply, which keeps it running to shut down',
  hint:'The damage is done by losing power suddenly. What has to be bridged?',
  explanation:'A UPS holds the server up on battery long enough for an orderly shutdown, which prevents the file corruption an abrupt cut causes. A surge protector deals with the opposite problem, and a second disk copies data without stopping the server going down mid-write.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-061', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:4,
  question:'A lab computer is kept in a corner with its back and side vents pressed against two walls. Over a term it begins to shut down by itself on hot afternoons. What is the link?',
  options:['Blocked vents trap heat, and the machine shuts down to protect itself',
           'The walls block the wireless signal, so the machine loses its network',
           'The corner is dusty, and dust on the monitor makes the picture fade',
           'Two walls press on the case, and the pressure loosens the cables in'],
  answer:'Blocked vents trap heat, and the machine shuts down to protect itself',
  hint:'The clue is that it happens on hot afternoons and not on cool mornings.',
  explanation:'A computer relies on air moving through its vents, and blocking them raises internal temperature until a protective cut-out acts, which is why the fault follows the weather. A lost network connection or a faded picture would not shut the machine down.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-062', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:4,
  question:'A pupil cleans a monitor by spraying glass cleaner directly onto the screen and wiping it with a paper towel. Name the two things wrong with that method.',
  options:['Liquid can run into the casing, and the towel can scratch the screen',
           'The cleaner is expensive, and the towel leaves small pieces of paper',
           'The screen must be warm first, and the towel should be folded twice',
           'Glass cleaner is too weak for a screen, and paper is too soft for it'],
  answer:'Liquid can run into the casing, and the towel can scratch the screen',
  hint:'One fault is about where the liquid goes. The other is about what the cloth is made of.',
  explanation:'Spray goes onto the cloth, never the screen, so nothing runs into the electronics at the edges, and a soft microfibre cloth is used because paper is abrasive enough to mark a coated display. Cost and temperature are not the issue.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-063', chapterId:'g9ict-health-safety', subsection:'equipment_care', difficulty:4,
  question:'A pupil switches a computer off at the wall each day instead of shutting it down from the menu. What harm does this risk, beyond losing unsaved work?',
  options:['Files being written at that moment can be left damaged on the disk',
           'The monitor loses its brightness setting and must be adjusted again',
           'The keyboard layout resets to the default each time it is switched on',
           'The machine takes longer to start because the fan has to cool down'],
  answer:'Files being written at that moment can be left damaged on the disk',
  hint:'A shutdown does work that takes a few seconds. What is it finishing?',
  explanation:'Shutting down lets the system finish writing open files and close the file system cleanly; cutting power mid-write is what leaves corrupt files and forces a disk check at the next start. Display and keyboard settings are stored and are not affected.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-064', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:4,
  question:'A pupil who types for long periods without a break complains of tingling and pain in the wrists and fingers. Which condition does this describe?',
  options:['Repetitive strain injury, caused by the same movement made for hours',
           'Eye strain, which is caused by focusing on a bright screen too long',
           'Deep vein thrombosis, which is caused by sitting still for many hours',
           'Backache, which is caused by a chair that gives no support at all'],
  answer:'Repetitive strain injury, caused by the same movement made for hours',
  hint:'Match the part of the body named in the complaint to the cause.',
  explanation:'RSI affects the wrists, hands and forearms and comes from repeating one small movement without rest, which is precisely what long typing sessions involve. The other three conditions are real computer-related hazards affecting the eyes, the legs and the back.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-065', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:4,
  question:'A pupil reports a headache and dry, sore eyes after three hours of revision on a screen in a brightly lit room. Which hazard is this, and what mainly causes it?',
  options:['Eye strain, from long focusing and glare from the light on the screen',
           'An ear problem, from the noise that the computer fan makes for hours',
           'A skin problem, from the heat the computer gives off while it is used',
           'A wrist problem, from the position of the hands while she is typing'],
  answer:'Eye strain, from long focusing and glare from the light on the screen',
  hint:'Match the symptoms named to the organ involved, then ask what in the room made it worse.',
  explanation:'Focusing at one distance for hours and looking at a screen with light reflecting off it causes eye strain, and the symptoms named are its usual ones. The other three hazards are genuine but would not produce sore eyes and a headache.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-066', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:4,
  question:'A pupil sits forward on a stool with no back, leaning towards a screen placed low on the desk, and after a week complains of neck and back pain. What is the cause?',
  options:['Poor posture, because the seat and the screen height are both wrong',
           'Eye strain, because the screen is much too close to be read clearly',
           'Repetitive strain, because she moves the mouse hand constantly',
           'Fatigue, because revision for a week is tiring whatever is used'],
  answer:'Poor posture, because the seat and the screen height are both wrong',
  hint:'Two details of the furniture are given. Both point at the same hazard.',
  explanation:'A seat with no support plus a screen below eye level forces the spine and neck into a sustained bad position, and back and neck pain is the result. Nothing in the description points at the eyes or at a repeated hand movement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-067', chapterId:'g9ict-health-safety', subsection:'health_hazards', difficulty:4,
  question:'A pupil listens to music through earphones at high volume for several hours each evening while working. Which risk is he running, and why does he not notice it?',
  options:['Hearing damage, because loss builds gradually and is not felt at once',
           'Eye damage, because the screen is being watched for the same hours',
           'Back damage, because earphone cables pull the head to one side of it',
           'Skin damage, because the earphones are worn against the ears for so'],
  answer:'Hearing damage, because loss builds gradually and is not felt at once',
  hint:'The second half of the question is the important half: why is there no warning?',
  explanation:'Noise-induced hearing loss accumulates painlessly over months, so there is no immediate signal to stop, which is why volume limits and breaks matter. The other options do not follow from listening to music.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-068', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:4,
  question:'A school is buying chairs for a new lab and the cheapest model has a fixed height and no back support. Why is the adjustable model worth the extra money?',
  options:['Pupils differ in height, and a supported back prevents long-term pain',
           'Adjustable chairs are made of stronger materials and last much longer',
           'A fixed chair cannot be moved close enough to the desk to be useful',
           'Adjustable chairs can be raised so that more pupils fit in one room'],
  answer:'Pupils differ in height, and a supported back prevents long-term pain',
  hint:'The lab is used by Grade 7 to Grade 9. What does that fact imply about one fixed height?',
  explanation:'One height cannot suit pupils of different sizes, and posture is what an adjustable, supportive chair protects, so the extra cost buys the prevention of back and neck injury. Durability and room capacity are not the health argument.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-069', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:4,
  question:'Afternoon sun falls directly on the lab screens and pupils complain they cannot see them properly. Which remedy deals with the cause?',
  options:['Fit blinds at the windows so the sunlight no longer strikes the screens',
           'Turn the screen brightness up so that the picture is stronger than the sun',
           'Ask pupils to sit closer so that their heads shade the screens they use',
           'Replace the monitors with larger ones so more of the picture is visible'],
  answer:'Fit blinds at the windows so the sunlight no longer strikes the screens',
  hint:'Which option removes the glare, and which ones only try to compete with it?',
  explanation:'Glare is reflected light, so controlling the light at the window removes it, while raising brightness fights it and tires the eyes further. A larger screen simply reflects more, and sitting closer shortens the focusing distance as well.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-070', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:4,
  question:'A pupil revising on a screen is advised to look at something twenty metres away for twenty seconds, every twenty minutes. What is this practice for?',
  options:['To rest the focusing muscles of the eye and reduce eye strain',
           'To rest the wrists by taking the hands away from the keyboard',
           'To improve concentration by breaking the work into short blocks',
           'To let the computer cool down between periods of heavy work'],
  answer:'To rest the focusing muscles of the eye and reduce eye strain',
  hint:'The instruction is about where to LOOK. That names the part of the body being rested.',
  explanation:'Looking into the distance releases the muscles held tense by close focusing, which is the direct remedy for screen-related eye strain. Wrist rests and study technique are separate good habits, and the computer is unaffected.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-071', chapterId:'g9ict-health-safety', subsection:'hazard_prevention', difficulty:4,
  question:'A workstation is being set up correctly. Where should the top of the monitor sit in relation to the eyes of the person seated at it?',
  options:['At or just below eye level, so the neck stays straight while working',
           'Well above eye level, so that the head is lifted and the back stays up',
           'Well below eye level, so the pupil looks down and the shoulders relax',
           'At the level of the desk, so the whole screen is inside the field of'],
  answer:'At or just below eye level, so the neck stays straight while working',
  hint:'Picture the angle of the neck in each case, and which one it can hold for an hour.',
  explanation:'With the top of the screen at about eye level the gaze falls slightly downward and the neck stays in its neutral position, which is what prevents strain over a long session. Both the raised and the lowered screen hold the neck at an angle for hours.' }));

})();
