'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Troubleshooting   (examWeight 2)
//
//  ⚠ THIS CHAPTER EXISTS BECAUSE THE SYLLABUS NAMES IT, NOT BECAUSE THE PAPER
//    LEANS ON IT. NCF §8 lists basic troubleshooting techniques and the steps
//    in troubleshooting a computer system problem as their own outcomes; the
//    papers ask it as scattered 1-2 mark parts ("state what you would check
//    first"), which is why the weight is 2 and not 5.
//
//  ⚠ THE MARK IS FOR THE ORDER, NOT THE FIX. The measured answers reward
//    checking the simplest possible cause first - power, connection, settings -
//    before anything is replaced. Every item here is written to that.
//
//  Source: NCE ICT (N540) 2021-2025; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-troubleshooting';

const MCQ = [
  ['g9ict-ts-001', 'troubleshooting_steps', 1,
   'A monitor shows nothing at all. What should be checked <b>first</b>?',
   ['That it is switched on and plugged in',
    'That the hard disk is replaced',
    'That the operating system is reinstalled',
    'That a new monitor is bought'],
   'That it is switched on and plugged in',
   'Start with the simplest possible cause.',
   'Troubleshooting begins with the cheapest and simplest check - power and connections - before anything is replaced.'],

  ['g9ict-ts-002', 'troubleshooting_steps', 1,
   'A keyboard types nothing. What is the first thing to check?',
   ['That the cable is properly connected',
    'That the printer has paper',
    'That the monitor brightness is correct',
    'That the mouse battery is new'],
   'That the cable is properly connected',
   'A loose connection is the commonest cause.',
   'Checking the connection costs nothing and explains most dead peripherals.'],

  ['g9ict-ts-003', 'troubleshooting_steps', 2,
   'What is the correct <b>order</b> of the first steps in troubleshooting?',
   ['Identify the problem, check the simple causes, then test the fix',
    'Replace the parts, then identify the problem',
    'Reinstall the operating system, then look at the cables',
    'Call the supplier before looking at anything'],
   'Identify the problem, check the simple causes, then test the fix',
   'Understand it before changing anything.',
   'Troubleshooting is: identify the problem, check the simplest causes, apply a fix, then test that it worked.'],

  ['g9ict-ts-004', 'troubleshooting_steps', 2,
   'Why should only <b>one</b> change be made at a time when solving a fault?',
   ['So you know which change actually fixed it',
    'So the computer runs faster',
    'So the warranty stays valid for longer',
    'So fewer cables are needed'],
   'So you know which change actually fixed it',
   'Two changes at once tell you nothing.',
   'Changing one thing at a time is what makes the result meaningful - otherwise the real cause is never known.'],

  ['g9ict-ts-005', 'troubleshooting_steps', 3,
   'After a fault has been fixed, what should be done last?',
   ['Test that the system works and record what was done',
    'Switch the computer off at once and say nothing',
    'Delete the log files',
    'Reinstall all the applications'],
   'Test that the system works and record what was done',
   'The job is not finished until it is proved and written down.',
   'Testing confirms the fix and a record helps whoever meets the same fault next time.'],

  ['g9ict-ts-006', 'troubleshooting_techniques', 1,
   'A program has stopped responding. What is the usual first action?',
   ['Close it using the task manager',
    'Switch the computer off at the wall',
    'Delete the program',
    'Format the hard disk'],
   'Close it using the task manager',
   'Deal with the one program before the whole machine.',
   'Ending the unresponsive task closes it without risking the data in every other program.'],

  ['g9ict-ts-007', 'troubleshooting_techniques', 2,
   'Why is switching a computer off at the wall a poor way to close a frozen program?',
   ['Unsaved work in other programs is lost and files can be corrupted',
    'It takes far longer than any other way of closing a program',
    'It permanently damages the keyboard and the mouse together',
    'It deletes the operating system and everything stored with it'],
   'Unsaved work in other programs is lost and files can be corrupted',
   'Think about everything else that was open.',
   'Cutting power stops every program mid-write, losing unsaved work and risking corrupted files.'],

  ['g9ict-ts-008', 'troubleshooting_techniques', 1,
   'A document has been deleted by mistake. Where should you look first?',
   ['The Recycle Bin', 'The printer queue', 'The Downloads page of a browser', 'The BIOS'],
   'The Recycle Bin',
   'Deleted files are not gone immediately.',
   'A deleted file is normally moved to the Recycle Bin and can be restored from there.'],

  ['g9ict-ts-009', 'troubleshooting_techniques', 2,
   'A file was deleted and the Recycle Bin has been emptied. What is the best chance of getting it back?',
   ['Restore it from a backup', 'Empty the Recycle Bin again',
    'Rename another file', 'Reinstall the application'],
   'Restore it from a backup',
   'This is the situation backups exist for.',
   'Once the Recycle Bin is emptied the file is no longer in it; a backup is the reliable way to recover it.'],

  ['g9ict-ts-010', 'troubleshooting_techniques', 2,
   'A printer will not print and a queue of jobs is waiting. Which check is most likely to explain it?',
   ['Whether the printer is out of paper or offline',
    'Whether the monitor is set too bright',
    'Whether the mouse is wireless',
    'Whether the spreadsheet is saved'],
   'Whether the printer is out of paper or offline',
   'Look at the printer itself.',
   'A stalled queue is usually the printer being out of paper, out of ink, offline or unplugged.'],

  ['g9ict-ts-011', 'troubleshooting_techniques', 3,
   'One computer in a laboratory cannot reach the internet while all the others can. What is the most sensible first check?',
   ['That machine&rsquo;s own network cable and settings',
    'The internet service provider',
    'Every other computer in the room',
    'The electricity supply to the building'],
   'That machine&rsquo;s own network cable and settings',
   'What is different about that one machine?',
   'If the others work, the shared connection is fine, so the fault is almost certainly local to that machine.'],

  ['g9ict-ts-012', 'troubleshooting_techniques', 3,
   'Every computer in the laboratory has lost internet access at the same moment. What is the most likely cause?',
   ['A fault in the shared connection, router or service',
    'Twenty separate cable faults happening at once',
    'A virus on one pupil&rsquo;s account in the laboratory',
    'A broken keyboard on one of the twenty machines'],
   'A fault in the shared connection, router or service',
   'What do all of them have in common?',
   'When every machine fails together the fault is in what they share: the router, the line or the provider.'],

  ['g9ict-ts-013', 'troubleshooting_techniques', 2,
   'A computer has become very slow and shows unexpected pop-up messages. What should be done?',
   ['Run a full antivirus scan', 'Buy a bigger monitor',
    'Delete the word-processing software', 'Change the desktop wallpaper'],
   'Run a full antivirus scan',
   'The symptoms suggest an infection.',
   'Slowness with unexpected pop-ups is a classic sign of malicious software, so a full scan is the right response.'],

  ['g9ict-ts-014', 'troubleshooting_techniques', 2,
   'A computer says the disk is full. Which action frees space?',
   ['Delete files that are no longer needed and empty the Recycle Bin',
    'Increase the screen resolution so more fits on the display',
    'Add more RAM so the computer has extra working memory',
    'Change the desktop theme to one that uses fewer colours'],
   'Delete files that are no longer needed and empty the Recycle Bin',
   'The problem is storage, not memory.',
   'Disk space is freed by removing unwanted files; adding RAM does not change storage at all.'],

  ['g9ict-ts-015', 'troubleshooting_techniques', 3,
   'A newly connected printer is not recognised by the computer. Apart from the cable, what is the most likely cause?',
   ['The driver has not been installed',
    'The printer needs a bigger hard disk',
    'The monitor is the wrong size',
    'The keyboard layout is wrong'],
   'The driver has not been installed',
   'The operating system needs software for that model.',
   'Without the correct device driver the operating system cannot communicate with the printer.'],

  ['g9ict-ts-016', 'troubleshooting_techniques', 2,
   'The screen image is there but very dim and hard to read. What should be checked?',
   ['The brightness setting', 'The hard disk capacity',
    'The network cable', 'The printer queue'],
   'The brightness setting',
   'The picture is present, only faint.',
   'An image that is present but dim points to the brightness or backlight setting, not to a dead connection.'],

  ['g9ict-ts-017', 'troubleshooting_techniques', 3,
   'A pupil cannot sign in and is sure the password is correct. Which is worth checking before anything else?',
   ['Whether Caps Lock is on', 'Whether the disk is full',
    'Whether the printer is online', 'Whether the mouse works'],
   'Whether Caps Lock is on',
   'Passwords are case sensitive.',
   'Caps Lock changes every letter typed, and passwords are case sensitive, so it is the first thing to rule out.'],

  ['g9ict-ts-018', 'troubleshooting_steps', 2,
   'Why is it useful to ask the user exactly what happened before the fault appeared?',
   ['It narrows down the possible causes',
    'It makes the computer restart faster',
    'It is required before switching on',
    'It frees space on the disk'],
   'It narrows down the possible causes',
   'Information comes before action.',
   'What changed just before the fault usually points straight at the cause, which is why identification comes first.'],

  ['g9ict-ts-019', 'troubleshooting_steps', 3,
   'A fault cannot be solved after the simple checks have all been made. What should be done next?',
   ['Report it to the technician with a note of what was already tried',
    'Open the computer case and remove parts at random',
    'Ignore it and use another machine without telling anyone',
    'Delete the operating system'],
   'Report it to the technician with a note of what was already tried',
   'Escalate, and pass on what you learned.',
   'Reporting the fault with the checks already made saves the technician repeating them and gets the machine fixed properly.'],

  ['g9ict-ts-020', 'troubleshooting_techniques', 2,
   'Which keyboard shortcut normally <b>undoes</b> the last action?',
   ['Ctrl + Z', 'Ctrl + P', 'Ctrl + S', 'Ctrl + A'], 'Ctrl + Z',
   'It is at the bottom left of the keyboard.',
   'Ctrl + Z undoes the last action, which is often the quickest recovery from a mistake.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-ts-021', 'troubleshooting_steps', 1,
   'A monitor is blank. State the first thing that should be checked.',
   'That it is switched on and plugged in',
   ['the power', 'that it is plugged in', 'the power cable',
    'whether it is switched on', 'the connection'],
   'Start with the simplest possible cause.',
   'Power and connections are checked before anything is replaced.'],
  ['g9ict-ts-022', 'troubleshooting_techniques', 1,
   'Name the place a deleted file is normally moved to, from which it can be restored.',
   'Recycle Bin', ['the recycle bin', 'recycle-bin', 'trash', 'bin'],
   'Two words.',
   'A deleted file is moved to the Recycle Bin and can be restored from there.'],
  ['g9ict-ts-023', 'troubleshooting_techniques', 2,
   'Give the keyboard shortcut that undoes the last action.',
   'Ctrl + Z', ['ctrl+z', 'ctrl z', 'control + z'],
   'Z is at the bottom left.', 'Ctrl + Z undoes the last action.'],
  ['g9ict-ts-024', 'troubleshooting_steps', 2,
   'State why only one change should be made at a time when solving a fault.',
   'So you know which change fixed it',
   ['to know which change worked', 'so you know what fixed the problem',
    'to identify the real cause'],
   'Two changes at once tell you nothing.',
   'One change at a time is what makes the result meaningful.'],
  ['g9ict-ts-025', 'troubleshooting_techniques', 3,
   'Name the software that must be installed before the operating system can use a newly connected printer.',
   'Driver', ['device driver', 'printer driver', 'a driver'],
   'It drives that one device.',
   'A device driver lets the operating system communicate with that model of printer.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
