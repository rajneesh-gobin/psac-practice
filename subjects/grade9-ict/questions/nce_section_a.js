'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - NCE SECTION A objective blocks, authored as multi-part tasks
//
//  ⚠ WHY THIS FILE EXISTS - MEASURED, NOT GUESSED. A generated NCE ICT paper
//    reached 79 of its 100 marks at every seed. The arithmetic is exact:
//    assemblePaper() builds the 15-mark Q1 multiple-choice block, then fills
//    the rest of the paper from candidates that are NOT single 1-mark MCQs
//    ("no measured year prints a multiple-choice item as its own numbered
//    question"). This pack held 460 mcq items and 64 text items and nothing
//    else, so the middle of the paper could only ever place 64 marks.
//    15 + 64 = 79, on every seed, with all 64 text items on every paper.
//    The shortfall was a CONTENT shortage of non-MCQ marks, not a bug in the
//    assembler and not a blueprint error.
//
//  ⚠ THE ANSWER IS TASKS, NOT MORE SHORT ANSWERS. `makeTask()` carries real
//    mark values and real sub-parts, which is what the paper is made of;
//    a plain question is adapted as a ONE-mark part and can never be worth
//    more (nce_paper.js: "IT DOES NOT INVENT MARKS"). 35 tasks worth 200
//    marks are written across this file and nce_section_b.js - measured, not
//    counted by hand - so the middle of the paper has multi-mark work to place.
//    They project to 142 practisable items as well (Assessment.projectToItems).
//
//  ⚠ THIS FILE IS THE SECTION A HALF: the objective blocks. Measured across
//    NCE ICT 2021-2025 (docs/nce-grade9/blueprint-ict.md §3), Section A is
//    15 + 10 + 10 + 10 + 5 = 50 marks in every year from 2022 and is built
//    from six formats and no others - four-option MCQ, a True/False tick
//    table, word-bank gap fill, a Column A -> Column B matching grid, a
//    classification tick-grid, and ordering/sequencing. Every task below is
//    one of those. Nothing here is longer than the paper allows: 68.5% of
//    real parts are worth 1 or 2 marks and nothing anywhere exceeds 6.
//
//  ⚠ EVERY SUBSECTION USED HERE IS ALREADY DECLARED in _manifest.js. A tagged
//    id that is not declared hides its questions from the Practise screen,
//    and test-subsection-invariant.js fails the build on it.
//
//  ⚠ NO PHOTOGRAPHS AND NO BRAND LOGOS, for the reason recorded across this
//    pack and in blueprint-ict.md §4.2: the real Q1 leans on product photos
//    and commercial logos, this repo has no Grade 9 artwork, and reproducing
//    logos is a licensing question rather than an artwork one. Diagrams that
//    ARE needed are drawn as inline SVG in nce_section_b.js.
//
//  Source: NCE ICT (N540) 2021-2025 Section A; NCF Grades 7-9 §8 read as
//  cumulative scope (syllabus-ict.md).
// ══════════════════════════════════════════════════════════════════════════

(function () {

// A True/False row of a tick table, which is how Q3 is set in all five years.
const tf = answer => ({ kind: 'choice', variant: 'tick', options: ['True', 'False'], answer: answer });
// A four-option "circle the letter" part.
const pick = (options, answer) => ({ kind: 'choice', options: options, answer: answer });
// One or more gaps on a dotted answer line. `answer` entries may themselves be
// arrays, which markSlots() reads as "any of these is right for that gap".
// ⚠ EVERY BLANK IS AN ARRAY OF ACCEPTED SPELLINGS, even when there is only one.
//   markSlots() copes with a bare string, but the importer preflight does not -
//   and the importer is two-phase and fail-closed, so one bare string here means
//   ZERO writes for the whole 20-pack corpus, not just for this file. Wrapping
//   here rather than at each call site is what stops the next author repeating it.
const gaps = (answer, extra) => Object.assign({ kind: 'blanks',
  answer: answer.map(function (a) { return Array.isArray(a) ? a : [a]; }) }, extra || {});

const bank = words =>
  '<div style="border:1px solid #000;padding:6px 10px;margin:6px 0;text-align:center">'
  + words.join(' &nbsp;&middot;&nbsp; ') + '</div>';

const matchList = items =>
  '<div style="margin:4px 0 6px 10px">'
  + items.map(function (t, i) { return '<div>' + String.fromCharCode(65 + i) + '&nbsp;&nbsp;' + t + '</div>'; }).join('')
  + '</div>';

const T = [];

// ── Computer Systems & Hardware ───────────────────────────────────────────

T.push({
  id: 'g9ict-sys-201', chapterId: 'g9ict-computer-systems', subsection: 'storage_devices',
  difficulty: 2,
  intro: 'For each statement below, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A hard disk keeps its contents when the computer is switched off.',
      response: tf('True'), hint: 'Think about whether your saved work is still there tomorrow.',
      explanation: 'A hard disk is secondary storage and is non-volatile, so what is saved on it survives being switched off.' },
    { label: 'b', marks: 1, prompt: 'A DVD holds more data than a CD of the same physical size.',
      response: tf('True'), hint: 'Compare about 700 MB with about 4.7 GB.',
      explanation: 'A single-layer DVD holds about 4.7 GB against about 700 MB on a CD, so the DVD holds much more.' },
    { label: 'c', marks: 1, prompt: 'A pen drive is an output device.',
      response: tf('False'), hint: 'Data travels both ways with a pen drive.',
      explanation: 'A pen drive is a storage device: data is written to it and read back from it, so it is not an output device.' },
    { label: 'd', marks: 1, prompt: 'One gigabyte is smaller than one megabyte.',
      response: tf('False'), hint: 'Put the units in order of size.',
      explanation: 'One gigabyte is 1 024 megabytes, so a gigabyte is very much larger than a megabyte.' },
    { label: 'e', marks: 1, prompt: 'The contents of a CD-ROM can be changed by the user each time it is used.',
      response: tf('False'), hint: 'Look at what the letters ROM stand for.',
      explanation: 'ROM stands for read-only memory, so a CD-ROM can be read as often as you like but cannot be written to again.' },
    { label: 'f', marks: 1, prompt: 'A memory card used in a camera is a form of secondary storage.',
      response: tf('True'), hint: 'The photographs are still there when the camera is off.',
      explanation: 'A memory card keeps the photographs after the camera is switched off, which is exactly what secondary storage does.' },
  ],
});

// ⚠ Tagged `input_devices` on purpose. A classification grid is by nature
//   cross-topic (NCE 2023 Q4(a) is Input / Output / Storage in one grid) and
//   this pack has no cross-cutting id; input_devices is the outcome the block
//   is teaching. Inventing an id for it would leave a declared subsection with
//   one item behind it.
T.push({
  id: 'g9ict-sys-202', chapterId: 'g9ict-computer-systems', subsection: 'input_devices',
  difficulty: 2,
  intro: 'For each device below, tick whether it is used mainly for <b>input</b>, for <b>output</b> or for <b>storage</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A microphone plugged into a computer.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Input' },
      hint: 'Which way does the sound travel?',
      explanation: 'A microphone turns sound into data and sends it into the computer, so it is an input device.' },
    { label: 'b', marks: 1, prompt: 'A plotter attached to a design computer.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Output' },
      hint: 'It puts something onto paper.',
      explanation: 'A plotter draws the computer’s output onto large sheets of paper, so it is an output device.' },
    { label: 'c', marks: 1, prompt: 'A pen drive plugged into a USB port.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Storage' },
      hint: 'Files are both saved to it and opened from it.',
      explanation: 'A pen drive holds files so they can be carried and opened later, which makes it a storage device.' },
    { label: 'd', marks: 1, prompt: 'A touchpad on a laptop computer.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Input' },
      hint: 'It is used instead of a mouse.',
      explanation: 'A touchpad sends the movement of the finger into the computer to move the pointer, so it is an input device.' },
    { label: 'e', marks: 1, prompt: 'A pair of speakers on a desk.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Output' },
      hint: 'The user hears the result.',
      explanation: 'Speakers turn data from the computer into sound for the user, so they are output devices.' },
    { label: 'f', marks: 1, prompt: 'An external hard disk connected by a cable.',
      response: { kind: 'choice', variant: 'tick', options: ['Input', 'Output', 'Storage'], answer: 'Storage' },
      hint: 'It is used for backups.',
      explanation: 'An external hard disk holds files outside the computer, usually for backup, so it is a storage device.' },
  ],
});

T.push({
  id: 'g9ict-sys-203', chapterId: 'g9ict-computer-systems', subsection: 'data_units',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'How many <b>bits</b> make up one byte?',
      response: { kind: 'number', answer: '8' }, hint: 'It is the number of bits needed for one character.',
      explanation: 'One byte is 8 bits, which is enough to store a single character of text.' },
    { label: 'b', marks: 1, prompt: 'How many <b>kilobytes</b> make up one megabyte?',
      response: { kind: 'number', answer: '1024', accept: ['1000', '1 024'] },
      hint: 'It is the same step as from a byte to a kilobyte.',
      explanation: 'Each step up the units multiplies by 1 024, so one megabyte is 1 024 kilobytes. Manufacturers often round this to 1 000.' },
    { label: 'c', marks: 1, prompt: 'A photograph has a size of 3 072 kilobytes. Write its size in <b>megabytes</b>.',
      response: { kind: 'number', answer: '3', unit: 'MB' },
      hint: 'Divide by the number of kilobytes in a megabyte.',
      explanation: '3 072 &divide; 1 024 = 3, so the photograph is 3 MB.' },
    { label: 'd', marks: 1,
      prompt: 'Write the four units below in order of size, starting with the <b>smallest</b>: '
        + 'gigabyte, kilobyte, megabyte, terabyte.',
      response: gaps(['kilobyte', 'megabyte', 'gigabyte', 'terabyte'], { partial: false }),
      hint: 'Each unit is about a thousand times the one before it.',
      explanation: 'The order is kilobyte, megabyte, gigabyte, terabyte - each about 1 024 times the one before it. The mark is given only when all four are in the right order.' },
  ],
});

// ── Software & Operating Systems ──────────────────────────────────────────

T.push({
  id: 'g9ict-sw-201', chapterId: 'g9ict-software-os', subsection: 'os_functions',
  difficulty: 2,
  intro: 'Use words from the list to complete the sentences. <b>There is one extra word in the list.</b>'
    + bank(['booting', 'driver', 'multitasking', 'operating system', 'spreadsheet']),
  parts: [
    { label: 'a', marks: 4,
      prompt: 'Write the missing word for each sentence.<br>'
        + '(i) Switching a computer on and loading the software that controls it is called &hellip;<br>'
        + '(ii) Running a browser and a word processor at the same time is called &hellip;<br>'
        + '(iii) The small program that lets the computer control a printer is called a &hellip;<br>'
        + '(iv) Windows, Linux and Android are each an example of an &hellip;',
      response: gaps(['booting', 'multitasking', 'driver', ['operating system', 'operating-system']]),
      hint: 'One word in the list belongs to application software and is not used at all.',
      explanation: 'Booting is the start-up process; multitasking is running several programs at once; a driver lets the system control a particular device; and Windows, Linux and Android are operating systems. "Spreadsheet" is the extra word.' },
    { label: 'b', marks: 1, prompt: 'Which one of the following is <b>system</b> software?',
      response: pick(['Operating system', 'Word processor', 'Spreadsheet', 'Web browser'], 'Operating system'),
      hint: 'System software runs the machine; application software does a job for the user.',
      explanation: 'The operating system runs the machine itself. A word processor, a spreadsheet and a browser are all application software.' },
    { label: 'c', marks: 1, prompt: 'Which of these tasks is carried out by the operating system?',
      response: pick(['Managing the files stored on the disk', 'Writing the text of a letter',
                      'Drawing the pictures on a poster', 'Choosing the words for an email'],
                     'Managing the files stored on the disk'),
      hint: 'Three of these are jobs the user does with an application.',
      explanation: 'Managing files and folders on the disk is an operating system job. The other three are done by the user in an application program.' },
  ],
});

T.push({
  id: 'g9ict-sw-202', chapterId: 'g9ict-software-os', subsection: 'utility_programs',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the description that matches each utility programme.'
        + matchList(['Removes files that are no longer needed so that disk space is freed.',
                     'Makes files smaller so that they take up less space.',
                     'Searches for malicious software and removes what it finds.'])
        + '(i) Antivirus &nbsp;&nbsp; (ii) File compression &nbsp;&nbsp; (iii) Disk clean-up',
      response: gaps([['C'], ['B'], ['A']]),
      hint: 'Read what each description does, not what it is called.',
      explanation: 'Antivirus matches C, file compression matches B and disk clean-up matches A.' },
    { label: 'b', marks: 1, prompt: 'A utility programme is a kind of:',
      response: pick(['system software', 'application software', 'presentation software', 'database software'],
                     'system software'),
      hint: 'It looks after the machine rather than doing a job for the user.',
      explanation: 'Utility programmes look after the computer itself - the disk, the files and the security - so they are system software.' },
  ],
});

// ── Ethics, Data Protection & Security ────────────────────────────────────

T.push({
  id: 'g9ict-eth-201', chapterId: 'g9ict-ethics-security', subsection: 'data_security',
  difficulty: 2,
  intro: 'For each statement below, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'A password made only of your date of birth is a strong password.',
      response: tf('False'), hint: 'How easily could someone else find that out?',
      explanation: 'A date of birth is short, is made only of digits and is easy for other people to find, so it makes a weak password.' },
    { label: 'b', marks: 1, prompt: 'Keeping a backup on a separate device protects the data if the computer is stolen.',
      response: tf('True'), hint: 'Where is the second copy kept?',
      explanation: 'A backup on a separate device is not lost with the computer, so the data can be restored.' },
    { label: 'c', marks: 1, prompt: 'Antivirus software should be updated regularly.',
      response: tf('True'), hint: 'New threats appear all the time.',
      explanation: 'New viruses appear constantly, so antivirus software can only recognise them once it has been updated.' },
    { label: 'd', marks: 1, prompt: 'It is safe to open an attachment sent by someone you do not know.',
      response: tf('False'), hint: 'An attachment can carry a program.',
      explanation: 'An attachment from an unknown sender may carry a virus or other malicious software, so it should not be opened.' },
    { label: 'e', marks: 1, prompt: 'A firewall helps to control the traffic entering and leaving a network.',
      response: tf('True'), hint: 'Its name describes a barrier.',
      explanation: 'A firewall inspects the traffic crossing the edge of a network and blocks whatever is not allowed.' },
    { label: 'f', marks: 1, prompt: 'Sharing your password with a classmate keeps your account safer.',
      response: tf('False'), hint: 'How many people can now use the account?',
      explanation: 'Every extra person who knows a password is another way for the account to be misused, so sharing it makes the account less safe.' },
  ],
});

T.push({
  id: 'g9ict-eth-202', chapterId: 'g9ict-ethics-security', subsection: 'internet_dangers',
  difficulty: 3,
  parts: [
    { label: 'a', marks: 4,
      prompt: 'Write the letter of the description that matches each term.'
        + matchList(['Pretending to be a bank in order to obtain someone’s password.',
                     'Unwanted advertising email sent to very many addresses at once.',
                     'A program that copies itself and damages the files it reaches.',
                     'Sending repeated unkind messages to another person online.'])
        + '(i) Phishing &nbsp;&nbsp; (ii) Virus &nbsp;&nbsp; (iii) Spam &nbsp;&nbsp; (iv) Cyber-bullying',
      response: gaps([['A'], ['C'], ['B'], ['D']]),
      hint: 'Two of the four are about people and two are about programs.',
      explanation: 'Phishing matches A, a virus matches C, spam matches B and cyber-bullying matches D.' },
    { label: 'b', marks: 1,
      prompt: 'A message arrives asking you to confirm your bank password by clicking a link. What should you do?',
      response: pick(['Delete the message and do not click the link', 'Click the link and type in the password',
                      'Forward the message to all your friends', 'Reply to the message with the password'],
                     'Delete the message and do not click the link'),
      hint: 'A bank never asks for a password by email.',
      explanation: 'This is phishing. The message should be deleted without clicking the link, and the password must never be sent to anyone.' },
    { label: 'c', marks: 1, prompt: 'Which one of these makes a password stronger?',
      response: pick(['Mixing letters, digits and symbols', 'Using the name of your favourite pet',
                      'Using the date of your own birthday', 'Repeating one short word twice over'],
                     'Mixing letters, digits and symbols'),
      hint: 'The harder it is to guess, the better.',
      explanation: 'A mixture of letters, digits and symbols gives far more possible passwords, so it is much harder to guess or to break.' },
  ],
});

T.push({
  id: 'g9ict-eth-203', chapterId: 'g9ict-ethics-security', subsection: 'data_protection_act',
  difficulty: 3,
  parts: [
    { label: 'a', marks: 1, prompt: 'A data protection act gives a person the right to:',
      response: pick(['see the personal data held about them', 'choose the price of any service offered',
                      'use any software at all without paying', 'copy any picture found on the Internet'],
                     'see the personal data held about them'),
      hint: 'The act protects the person the data is about.',
      explanation: 'A data protection act gives people the right to see the personal data an organisation holds about them and to have mistakes corrected.' },
    { label: 'b', marks: 1, prompt: 'Personal data collected for one purpose may:',
      response: pick(['not be used for a different purpose', 'be sold to anyone who asks to buy it',
                      'be published on any public website', 'be kept for ever without any reason'],
                     'not be used for a different purpose'),
      hint: 'The reason for collecting it is part of the promise made.',
      explanation: 'Data must be used only for the purpose it was collected for; using it for something else breaks that promise.' },
    { label: 'c', marks: 1, prompt: 'Who is responsible for keeping personal data accurate and up to date?',
      response: pick(['The organisation that collects it', 'The postman who delivers the letters',
                      'Any visitor who reads the website', 'The company that made the computer'],
                     'The organisation that collects it'),
      hint: 'Responsibility sits with whoever holds the data.',
      explanation: 'The organisation that collects and holds personal data is responsible for keeping it accurate and up to date.' },
    { label: 'd', marks: 1, prompt: 'A data protection act says that personal data should be kept:',
      response: pick(['only for as long as it is needed', 'for at least twenty-five whole years',
                      'on paper rather than on a computer', 'in a language chosen by the owner'],
                     'only for as long as it is needed'),
      hint: 'Old data that is no longer needed is a risk, not an asset.',
      explanation: 'Data must not be kept longer than the purpose requires; once it is no longer needed it should be deleted.' },
  ],
});

// ── Health & Safety ───────────────────────────────────────────────────────

T.push({
  id: 'g9ict-hs-201', chapterId: 'g9ict-health-safety', subsection: 'health_hazards',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 4,
      prompt: 'Write the letter of the action that helps to prevent each health problem.'
        + matchList(['Look away at something distant for a moment and take a short break.',
                     'Use a chair with back support and sit upright with both feet flat.',
                     'Fit a screen filter or lower the brightness of the display.',
                     'Rest the wrists on a support and change position regularly.'])
        + '(i) Eye strain &nbsp;&nbsp; (ii) Back ache &nbsp;&nbsp; (iii) Wrist injury &nbsp;&nbsp; (iv) Glare from the screen',
      response: gaps([['A'], ['B'], ['D'], ['C']]),
      hint: 'Match the part of the body to the thing that supports or rests it.',
      explanation: 'Eye strain matches A, back ache matches B, a wrist injury matches D and glare matches C.' },
    { label: 'b', marks: 1, prompt: 'The top of the screen should be roughly level with:',
      response: pick(['the eyes of the user', 'the elbows of the user',
                      'the knees of the user', 'the top of the desk'],
                     'the eyes of the user'),
      hint: 'The neck should stay straight.',
      explanation: 'With the top of the screen at eye level the user looks slightly downwards and the neck stays in a natural position.' },
  ],
});

T.push({
  id: 'g9ict-hs-202', chapterId: 'g9ict-health-safety', subsection: 'lab_guidelines',
  difficulty: 1,
  intro: 'For each rule below, tick <b>True</b> or <b>False</b>.',
  parts: [
    { label: 'a', marks: 1, prompt: 'Food and drink may be taken to the computer table.',
      response: tf('False'), hint: 'Think about what a spill would do.',
      explanation: 'Food and drink are kept away from computers because a spill can destroy a keyboard or a whole machine.' },
    { label: 'b', marks: 1, prompt: 'Trailing cables on the floor should be covered or tied out of the way.',
      response: tf('True'), hint: 'Someone has to walk past them.',
      explanation: 'Loose cables across a floor are a trip hazard, so they are covered or fastened out of the walkway.' },
    { label: 'c', marks: 1, prompt: 'A computer should be shut down properly before the power is switched off.',
      response: tf('True'), hint: 'Files may still be open.',
      explanation: 'Shutting down closes open files and lets the operating system finish writing to the disk, so nothing is lost or damaged.' },
  ],
});

// ── Troubleshooting ───────────────────────────────────────────────────────

T.push({
  id: 'g9ict-ts-201', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_steps',
  difficulty: 3,
  parts: [
    { label: 'a', marks: 4,
      prompt: 'The four troubleshooting steps below are in the wrong order. Write <b>1</b>, <b>2</b>, <b>3</b> '
        + 'or <b>4</b> against each one to show the correct order.<br>'
        + '(i) Test that the problem has gone.<br>'
        + '(ii) Identify exactly what the problem is.<br>'
        + '(iii) Decide on the most likely cause.<br>'
        + '(iv) Apply the fix.',
      response: gaps(['4', '1', '2', '3']),
      hint: 'Nothing can be fixed before it has been identified, and nothing is finished before it has been tested.',
      explanation: 'The order is identify the problem, decide the likely cause, apply the fix, then test that it has gone - so (ii) is 1, (iii) is 2, (iv) is 3 and (i) is 4.' },
    { label: 'b', marks: 1,
      prompt: 'A monitor shows no picture although its power light is on. Which check should be made <b>first</b>?',
      response: pick(['The cable between monitor and computer', 'The free space left on the hard disk',
                      'The version of the word processor used', 'The number of files kept in the folder'],
                     'The cable between monitor and computer'),
      hint: 'Start with the simplest and most likely cause.',
      explanation: 'Checking the video cable is the simplest and most likely cause; the other three have nothing to do with a blank display.' },
  ],
});

T.push({
  id: 'g9ict-ts-202', chapterId: 'g9ict-troubleshooting', subsection: 'troubleshooting_techniques',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the first check to make for each fault.'
        + matchList(['Check that the paper tray is not empty.',
                     'Check that the network cable is plugged in.',
                     'Check that the speaker volume is not muted.'])
        + '(i) No sound comes from the computer &nbsp;&nbsp; (ii) The printer will not print &nbsp;&nbsp; (iii) The school network cannot be reached',
      response: gaps([['C'], ['A'], ['B']]),
      hint: 'Match each fault to the part of the system it involves.',
      explanation: 'No sound matches C, the printer fault matches A and the network fault matches B.' },
    { label: 'b', marks: 1, prompt: 'A file has been deleted by mistake. Where should the user look first?',
      response: pick(['In the Recycle Bin', 'In the Control Panel',
                      'In the Task Manager', 'In the Address Bar'],
                     'In the Recycle Bin'),
      hint: 'Deleted files are not removed from the disk straight away.',
      explanation: 'A deleted file is moved to the Recycle Bin first, so it can usually be restored from there.' },
  ],
});

// ── Presentation & Multimedia ─────────────────────────────────────────────

T.push({
  id: 'g9ict-pr-201', chapterId: 'g9ict-presentation', subsection: 'storyboarding',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 4,
      prompt: 'The four stages of making a short multimedia clip are listed in the wrong order. '
        + 'Write <b>1</b>, <b>2</b>, <b>3</b> or <b>4</b> against each one to show the correct order.<br>'
        + '(i) Record the sound and take the photographs.<br>'
        + '(ii) Decide what the message of the clip is.<br>'
        + '(iii) Draw a storyboard of each scene in order.<br>'
        + '(iv) Assemble the scenes in the authoring software.',
      response: gaps(['3', '1', '2', '4']),
      hint: 'Planning comes before recording, and recording before assembling.',
      explanation: 'The message is decided first, then the storyboard is drawn, then the material is recorded, and finally the scenes are assembled - so (ii) is 1, (iii) is 2, (i) is 3 and (iv) is 4.' },
    { label: 'b', marks: 1, prompt: 'What is the main purpose of a storyboard?',
      response: pick(['To plan the order of the scenes beforehand', 'To record the sound track of the finished clip',
                      'To print out the handouts for the audience', 'To choose the colours used on the slide master'],
                     'To plan the order of the scenes beforehand'),
      hint: 'It is drawn before any recording is done.',
      explanation: 'A storyboard sets out what each scene shows and the order the scenes come in, so problems are found on paper rather than after filming.' },
  ],
});

T.push({
  id: 'g9ict-pr-202', chapterId: 'g9ict-presentation', subsection: 'slide_masters',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'A change made on the slide master will:',
      response: pick(['appear on every slide that uses it', 'appear on the very first slide only',
                      'delete the text written on every slide', 'print the slides out as audience handouts'],
                     'appear on every slide that uses it'),
      hint: 'That is the whole reason a master exists.',
      explanation: 'The slide master holds the settings shared by the slides, so one change there is applied to all of them at once.' },
    { label: 'b', marks: 1, prompt: 'Which view shows the notes the speaker will use?',
      response: pick(['Notes Page view', 'Slide Sorter view', 'Reading view', 'Outline view'], 'Notes Page view'),
      hint: 'The name says what it holds.',
      explanation: 'Notes Page view shows each slide with the speaker’s notes beneath it, ready to be printed for the presenter.' },
    { label: 'c', marks: 1, prompt: 'A design template is used to:',
      response: pick(['give every slide the same look', 'change the order of the slides',
                      'add narration to the slide show', 'count the words on each slide'],
                     'give every slide the same look'),
      hint: 'It is about appearance, not content.',
      explanation: 'A design template applies one set of colours, fonts and backgrounds so the whole presentation looks consistent.' },
  ],
});

// ── Networks ──────────────────────────────────────────────────────────────

T.push({
  id: 'g9ict-net-201', chapterId: 'g9ict-networks', subsection: 'network_types',
  difficulty: 3,
  parts: [
    { label: 'a', marks: 4,
      prompt: 'Write the letter of the network type that fits each situation.'
        + matchList(['LAN', 'WAN', 'PAN', 'VPN'])
        + '(i) The computers in one school laboratory joined together.<br>'
        + '(ii) The branches of a bank in Mauritius, Rodrigues and France joined together.<br>'
        + '(iii) A phone joined to a wireless headset one metre away.<br>'
        + '(iv) A secure private link to an office network made across the Internet.',
      response: gaps([['A'], ['B'], ['C'], ['D']]),
      hint: 'Sort them by the distance each one covers, then deal with the secure one.',
      explanation: 'One laboratory is a LAN (A); branches in different countries need a WAN (B); a phone and a headset a metre apart make a PAN (C); a secure private tunnel across the Internet is a VPN (D).' },
    { label: 'b', marks: 1, prompt: 'What do the letters <b>LAN</b> stand for?',
      response: pick(['Local Area Network', 'Large Access Network', 'Linked Access Node', 'Local Access Number'],
                     'Local Area Network'),
      hint: 'It describes how much ground the network covers.',
      explanation: 'LAN stands for Local Area Network - a network covering one building or one site.' },
    { label: 'c', marks: 1, prompt: 'Which one of these is an advantage of joining computers in a network?',
      response: pick(['A printer can be shared between users', 'Each computer needs its own printer',
                      'Files cannot be copied between users', 'Software must be installed twice over'],
                     'A printer can be shared between users'),
      hint: 'Think about what only has to be bought once.',
      explanation: 'On a network one printer can serve many users, which saves both money and space.' },
  ],
});

T.push({
  id: 'g9ict-net-202', chapterId: 'g9ict-networks', subsection: 'network_components',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the job done by each network component.'
        + matchList(['Joins one network to another and directs traffic between them.',
                     'Checks the traffic crossing the edge of a network and blocks what is not allowed.',
                     'Lets a single computer join a network, by cable or wirelessly.'])
        + '(i) Router &nbsp;&nbsp; (ii) Network interface card &nbsp;&nbsp; (iii) Firewall',
      response: gaps([['A'], ['C'], ['B']]),
      hint: 'One joins networks, one joins a computer, one guards the edge.',
      explanation: 'A router matches A, a network interface card matches C and a firewall matches B.' },
    { label: 'b', marks: 1, prompt: 'A company that provides a home with its Internet connection is called:',
      response: pick(['an Internet Service Provider', 'a Uniform Resource Locator',
                      'a Network Interface Card', 'a Local Area Network'],
                     'an Internet Service Provider'),
      hint: 'Its name says exactly what it supplies.',
      explanation: 'An Internet Service Provider (ISP) sells the connection that links a home or a school to the Internet.' },
  ],
});

// ── Internet & Online Communication ───────────────────────────────────────

T.push({
  id: 'g9ict-int-201', chapterId: 'g9ict-internet', subsection: 'web_tools',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the letter of the description that matches each online tool.'
        + matchList(['A personal online diary that readers may add comments to.',
                     'A website that many people may edit to build one shared page.',
                     'A meeting held with sound and moving pictures over the Internet.'])
        + '(i) Blog &nbsp;&nbsp; (ii) Video conference &nbsp;&nbsp; (iii) Wiki',
      response: gaps([['A'], ['C'], ['B']]),
      hint: 'One is written by a single person and one is written by many.',
      explanation: 'A blog matches A, a video conference matches C and a wiki matches B.' },
    { label: 'b', marks: 1, prompt: 'A podcast is best described as:',
      response: pick(['a sound recording published on the Internet', 'a printed copy of a page from a website',
                      'a folder of photographs kept on a disk', 'a short message sent to a mobile phone'],
                     'a sound recording published on the Internet'),
      hint: 'It is something you listen to.',
      explanation: 'A podcast is an audio programme published on the Internet so that listeners can play or download it whenever they wish.' },
  ],
});

// ── Word Processing ───────────────────────────────────────────────────────

T.push({
  id: 'g9ict-wp-201', chapterId: 'g9ict-word-processing', subsection: 'text_formatting',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 3,
      prompt: 'Write the keyboard shortcut used for each action. Give each answer in the form <b>Ctrl + letter</b>.<br>'
        + '(i) Copy the selected text &nbsp;&nbsp; (ii) Paste the copied text &nbsp;&nbsp; (iii) Make the selected text bold',
      response: gaps([['Ctrl + C', 'Ctrl+C', 'Ctrl C'],
                      ['Ctrl + V', 'Ctrl+V', 'Ctrl V'],
                      ['Ctrl + B', 'Ctrl+B', 'Ctrl B']]),
      hint: 'Two of the three letters are the first letter of the action.',
      explanation: 'Ctrl + C copies, Ctrl + V pastes and Ctrl + B makes text bold. V is used for paste because it sits next to C on the keyboard.' },
    { label: 'b', marks: 1, prompt: 'Which formatting makes text lean over to the right?',
      response: pick(['Italic', 'Bold', 'Underline', 'Highlight'], 'Italic'),
      hint: 'It is often used for the title of a book.',
      explanation: 'Italic text slopes to the right and is used for emphasis and for titles.' },
    { label: 'c', marks: 1, prompt: 'Text that is level at both the left and the right margin is said to be:',
      response: pick(['justified', 'centred', 'indented', 'underlined'], 'justified'),
      hint: 'Newspaper columns are set this way.',
      explanation: 'Justified text is spaced so that it lines up at both margins, which is how newspaper columns are set.' },
  ],
});

// ── Algorithms, Flowcharts & Programming ──────────────────────────────────

T.push({
  id: 'g9ict-alg-201', chapterId: 'g9ict-algorithms', subsection: 'control_structures',
  difficulty: 2,
  parts: [
    { label: 'a', marks: 1, prompt: 'Carrying out steps one after another in the order written is called:',
      response: pick(['sequence', 'selection', 'repetition', 'validation'], 'sequence'),
      hint: 'Nothing is skipped and nothing is repeated.',
      explanation: 'Sequence means the steps are carried out one after another in the order they are written.' },
    { label: 'b', marks: 1, prompt: 'Choosing between two different paths using IF is called:',
      response: pick(['selection', 'sequence', 'repetition', 'assignment'], 'selection'),
      hint: 'A decision is being made.',
      explanation: 'Selection means the program tests a condition and then chooses which path to follow.' },
    { label: 'c', marks: 2,
      prompt: 'A program must print the word HELLO twenty times.<br>'
        + '(i) Name the control structure that should be used.<br>'
        + '(ii) Name the flowchart symbol that holds the test deciding when to stop.',
      response: gaps([['repetition', 'iteration', 'loop'], ['decision', 'decision box', 'diamond']]),
      hint: 'One word describes doing something over and over; the other names a shape.',
      explanation: 'Repetition (a loop) is used to run the same step many times, and the test that decides when to stop is held in a decision symbol, drawn as a diamond.' },
  ],
});

T.forEach(function (spec) { STATIC_QUESTIONS.push(makeTask(spec)); });

})();
