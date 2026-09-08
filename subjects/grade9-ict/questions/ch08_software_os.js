'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Software & Operating Systems   (examWeight 2)
//
//  ⚠ THIS IS A GRADE 7 SYLLABUS ROW THAT KEEPS APPEARING IN A GRADE 9 PAPER.
//    The NCF scope table ticks every Grade 7 row in columns 7, 8 AND 9, and the
//    2025 Q1 confirms it in practice by asking RAM vs ROM and input devices.
//    System vs application software is asked the same way: one or two marks,
//    inside Q1, every year.
//
//  ⚠ NO SCREENSHOTS. The papers show GUI elements as pictures; this repo has no
//    bundled Grade 9 artwork, so the parts of the interface are NAMED in words.
//    Recorded in blueprint-ict.md as still needing artwork.
//
//  Source: NCE ICT (N540) 2021-2025 Q1; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-software-os';

const MCQ = [
  ['g9ict-sw-001', 'os_functions', 1,
   'Which of these is an <b>operating system</b>?',
   ['Windows', 'Word', 'Excel', 'Chrome'], 'Windows',
   'Three of these are programs that run on top of the fourth.',
   'Windows is an operating system; Word, Excel and Chrome are application programs that run on it.'],

  ['g9ict-sw-002', 'os_functions', 1,
   'What is the main job of an <b>operating system</b>?',
   ['To control the hardware and run the other programs',
    'To type letters, reports and essays',
    'To edit photographs and drawings',
    'To connect the computer to a printer only'],
   'To control the hardware and run the other programs',
   'It is the software everything else depends on.',
   'The operating system manages the hardware, the memory, the files and the running of every other program.'],

  ['g9ict-sw-003', 'os_functions', 2,
   'Which of these is <b>not</b> a task of an operating system?',
   ['Writing a business letter', 'Managing files and folders',
    'Sharing memory between programs', 'Controlling input and output devices'],
   'Writing a business letter',
   'Three are system tasks; one is what a user does with an application.',
   'Writing a letter is done in an application such as a word processor; the other three are operating-system tasks.'],

  ['g9ict-sw-004', 'os_functions', 2,
   'Which part of the computer does the operating system load into when it starts?',
   ['RAM', 'ROM', 'The hard disk', 'The printer'], 'RAM',
   'It must be in the memory the processor works from.',
   'The operating system is loaded from storage into RAM at start-up so the processor can run it.'],

  ['g9ict-sw-005', 'os_functions', 3,
   'Two programs are open at once. Which part of the computer decides how the processor time is shared between them?',
   ['The operating system', 'The word processor', 'The monitor', 'The keyboard'],
   'The operating system',
   'Only one piece of software is in charge of the machine.',
   'Scheduling processor time between running programs is one of the operating system&rsquo;s core jobs.'],

  ['g9ict-sw-006', 'os_types', 1,
   'Which of these is an operating system used on many <b>mobile phones</b>?',
   ['Android', 'Windows 11', 'Linux Server', 'MS-DOS'], 'Android',
   'Think about what runs on a phone.',
   'Android is a mobile operating system; the others are used on computers and servers.'],

  ['g9ict-sw-007', 'os_types', 2,
   'An operating system that a user controls by typing commands is described as having a:',
   ['Command line interface', 'Graphical user interface',
    'Menu-driven interface', 'Touch interface'],
   'Command line interface',
   'The user types instead of clicking.',
   'A command line interface takes typed commands; a graphical user interface uses windows, icons and a pointer.'],

  ['g9ict-sw-008', 'os_types', 2,
   'What does <b>GUI</b> stand for?',
   ['Graphical User Interface', 'General User Instruction',
    'Guided User Input', 'Graphic Unit Interface'],
   'Graphical User Interface',
   'It is what windows and icons make.',
   'GUI stands for Graphical User Interface - the windows, icons, menus and pointer a user clicks on.'],

  ['g9ict-sw-009', 'os_types', 3,
   'What is the main advantage of a graphical user interface over a command line interface?',
   ['It is easier for a beginner because commands do not have to be memorised',
    'It always runs faster on old hardware than a command line does',
    'It uses far less memory than a command line interface needs',
    'It allows more commands to be typed at once than a command line'],
   'It is easier for a beginner because commands do not have to be memorised',
   'Think about what a new user has to know.',
   'A GUI shows the choices on screen, so the user recognises them instead of having to remember typed commands.'],

  ['g9ict-sw-010', 'os_types', 3,
   'Which type of operating system allows several users to work on one computer at the same time?',
   ['Multi-user', 'Single-user', 'Real-time', 'Batch'], 'Multi-user',
   'The name says how many people it serves.',
   'A multi-user operating system supports several users on the same machine at once.'],

  ['g9ict-sw-011', 'utility_programs', 1,
   'Software written to do a job for the user, such as a word processor, is called:',
   ['Application software', 'System software', 'Firmware', 'An operating system'],
   'Application software',
   'The user applies it to a task.',
   'Application software performs a task for the user; system software runs the machine.'],

  ['g9ict-sw-012', 'utility_programs', 1,
   'Software that runs and maintains the computer itself is called:',
   ['System software', 'Application software', 'Freeware', 'Shareware'],
   'System software',
   'It serves the machine, not the user&rsquo;s task.',
   'System software - the operating system, drivers and utilities - keeps the computer running.'],

  ['g9ict-sw-013', 'utility_programs', 2,
   'Which of these is a <b>utility program</b>?',
   ['Antivirus software', 'A spreadsheet', 'A web browser', 'A photo editor'],
   'Antivirus software',
   'A utility looks after the computer rather than doing the user&rsquo;s work.',
   'Antivirus is a utility: it maintains and protects the system. The other three are applications.'],

  ['g9ict-sw-014', 'utility_programs', 2,
   'Which utility makes a spare copy of files so they can be recovered if the original is lost?',
   ['Backup', 'Defragmenter', 'Antivirus', 'File compression'], 'Backup',
   'The name says what it does.',
   'A backup utility copies files to another place so they can be restored after a loss.'],

  ['g9ict-sw-015', 'utility_programs', 2,
   'Which utility makes a file smaller so it takes less space or sends more quickly?',
   ['File compression', 'Backup', 'Disk cleanup', 'Antivirus'], 'File compression',
   'It squeezes the file.',
   'A compression utility reduces file size, which saves storage and speeds up transfer.'],

  ['g9ict-sw-016', 'utility_programs', 3,
   'Which utility deletes temporary and unwanted files to free space on a disk?',
   ['Disk cleanup', 'Disk defragmenter', 'Backup', 'Firewall'], 'Disk cleanup',
   'It removes files rather than rearranging them.',
   'Disk cleanup removes temporary and unneeded files; the defragmenter rearranges the files that remain.'],

  ['g9ict-sw-017', 'utility_programs', 3,
   'What does a <b>disk defragmenter</b> do?',
   ['Rearranges the parts of files so each one is stored together',
    'Deletes the files that are no longer needed from the disk',
    'Copies every file to a second disk for safe keeping',
    'Scans every file on the disk for viruses and removes them'],
   'Rearranges the parts of files so each one is stored together',
   'It tidies where the pieces are, without deleting anything.',
   'Defragmenting gathers the scattered pieces of each file into one place so the disk reads it faster.'],

  ['g9ict-sw-018', 'utility_programs', 2,
   'Small software that lets the operating system work with a particular printer or scanner is called a:',
   ['Driver', 'Utility', 'Browser', 'Compiler'], 'Driver',
   'It drives one device.',
   'A device driver translates between the operating system and one particular piece of hardware.'],

  ['g9ict-sw-019', 'utility_programs', 3,
   'Software that may be used free of charge and freely copied is described as:',
   ['Freeware', 'Shareware', 'Commercial software', 'Pirated software'],
   'Freeware',
   'The clue is in the first half of the word.',
   'Freeware is distributed at no cost; shareware is free to try for a period and then must be paid for.'],

  ['g9ict-sw-020', 'os_functions', 2,
   'Which operating-system feature lets a user organise files into a structure of folders?',
   ['File management', 'Memory management', 'Task scheduling', 'Device control'],
   'File management',
   'The name says what it manages.',
   'File management is the operating-system job of naming, storing, finding and organising files and folders.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-sw-021', 'os_functions', 1,
   'Give the name of the software that controls the hardware and runs all the other programs.',
   'Operating system', ['the operating system', 'os'],
   'Two words.', 'The operating system controls the computer and runs every other program.'],
  ['g9ict-sw-022', 'os_types', 2,
   'Write in full what <b>GUI</b> stands for.',
   'Graphical User Interface', ['graphical user interface'],
   'Three words.', 'GUI stands for Graphical User Interface.'],
  ['g9ict-sw-023', 'utility_programs', 2,
   'Give the term for software written to do a task for the user, such as a spreadsheet.',
   'Application software', ['application', 'applications software', 'app'],
   'The user applies it to a job.',
   'Application software does a task for the user, as opposed to system software.'],
  ['g9ict-sw-024', 'utility_programs', 2,
   'Name the utility program that protects a computer against malicious software.',
   'Antivirus', ['anti-virus', 'antivirus software', 'anti virus'],
   'It scans for infections.',
   'Antivirus software detects and removes malicious programs.'],
  ['g9ict-sw-025', 'utility_programs', 3,
   'Name the small program that allows the operating system to work with one particular device, such as a printer.',
   'Driver', ['device driver', 'a driver'],
   'It drives that one device.',
   'A device driver lets the operating system communicate with a particular piece of hardware.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
