'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Computer Systems & Hardware   (examWeight 5, the joint
//  heaviest chapter, measured at a five-year mean of ~12 marks a paper)
//
//  ⚠ WRITTEN AGAINST THE PAPERS, NOT THE SYLLABUS SECTION. The NCE ICT scope
//    table is CUMULATIVE - every Grade 7 row is ticked for Grades 7, 8 AND 9 -
//    so a Grade 9 candidate is accountable for the whole three-year corpus.
//    NCE 2025 Q1 asks input devices, bits per byte and RAM vs ROM, all of them
//    Grade 7/8 rows. A pack built from the "new at Grade 9" list would have
//    missed most of what the exam actually asks.
//
//  ⚠ IT IS A RECOGNITION PAPER. A mean 57.4 of 100 marks are answered by
//    selecting something already printed, 68.5% of parts are worth 1 or 2
//    marks, and nothing anywhere exceeds 6. So most items here are 1-mark MCQs
//    and short answers - that is what the paper is, not a limitation of this
//    engine. Q1 alone is 15 one-mark MCQs in every paper from 2022.
//
//  ⚠ NO ARTWORK IS USED. 2023 and 2024 Q1 are 87% pictures - photographs of
//    devices - and this repository has no bundled Grade 9 artwork. Rather than
//    reference images that do not exist, these items name the device in words
//    or describe its function. `docs/nce-grade9/blueprint-ict.md` records the
//    picture-dependent formats that still need artwork before they can be
//    written.
//
//  ⚠ Every id here is declared in G9ICT_SYLLABUS in _manifest.js. A tagged
//    subsection that is not declared hides its questions from the Practise
//    screen; a declared one with no questions opens empty.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-computer-systems';
// ⚠ Provenance is recorded HERE, not on each question: neither makeMCQ nor
//   makeText accepts a `source` field, and an unknown key is dropped in
//   silence. Source: NCE ICT (N540) 2021-2025 Q1/Q2/Q6, and NCF Grades 7-9
//   §8 Computer Operations and Fundamentals read as cumulative scope.

// [ id, subsection, difficulty, question, options[], answer, hint, explanation ]
const MCQ = [
  ['g9ict-sys-001', 'input_devices', 1,
   'Which of these is an <b>input</b> device?',
   ['Microphone', 'Speaker', 'Monitor', 'Printer'], 'Microphone',
   'An input device sends data INTO the computer.',
   'A microphone takes sound from outside and sends it into the computer, so it is an input device. A speaker, a monitor and a printer all send information out.'],

  ['g9ict-sys-002', 'input_devices', 2,
   'A shop assistant passes a product over a glass panel and the price appears on the till. Which input device has been used?',
   ['Barcode scanner', 'Touch screen', 'Graphics tablet', 'Webcam'], 'Barcode scanner',
   'Think about what is printed on the product.',
   'The stripes printed on the product are a barcode, and a barcode scanner reads them and sends the product code into the till.'],

  ['g9ict-sys-003', 'input_devices', 2,
   'Which input device would a designer most likely use to draw directly on screen?',
   ['Graphics tablet', 'Joystick', 'Keyboard', 'Optical mouse'], 'Graphics tablet',
   'One of these is designed for drawing by hand.',
   'A graphics tablet has a pressure-sensitive surface and a stylus, so a designer can draw by hand and the drawing appears on screen.'],

  ['g9ict-sys-004', 'output_devices', 1,
   'Which of these is an <b>output</b> device?',
   ['Plotter', 'Scanner', 'Keyboard', 'Joystick'], 'Plotter',
   'An output device sends information OUT of the computer.',
   'A plotter draws large diagrams on paper, so it takes information out of the computer. The other three send information in.'],

  ['g9ict-sys-005', 'output_devices', 2,
   'An architect needs to print a large building plan on a single sheet. Which output device is most suitable?',
   ['Plotter', 'Laser printer', 'Dot-matrix printer', 'Thermal printer'], 'Plotter',
   'Think about the size of the paper.',
   'A plotter is built to draw accurate line diagrams on very large sheets, which is what a building plan needs.'],

  ['g9ict-sys-006', 'output_devices', 1,
   'Which output device produces a <b>hard copy</b>?',
   ['Printer', 'Monitor', 'Speaker', 'Projector'], 'Printer',
   'A hard copy is one you can hold.',
   'A hard copy is output on paper, and only the printer produces that. A monitor, speaker and projector all give soft copy.'],

  ['g9ict-sys-007', 'storage_devices', 1,
   'Which storage device has <b>no moving parts</b>?',
   ['Solid state drive', 'Hard disk drive', 'DVD', 'Floppy disk'], 'Solid state drive',
   'One of these stores data on memory chips.',
   'A solid state drive stores data on memory chips, so nothing inside it spins or moves. The others all rely on a spinning disk.'],

  ['g9ict-sys-008', 'storage_devices', 2,
   'Which of these storage media normally holds the <b>most</b> data?',
   ['1 terabyte hard disk', '32 gigabyte flash drive', '4.7 gigabyte DVD', '700 megabyte CD'], '1 terabyte hard disk',
   'Put the units in order from smallest to largest.',
   'A terabyte is larger than a gigabyte, which is larger than a megabyte, so the 1 TB hard disk holds the most.'],

  ['g9ict-sys-009', 'storage_devices', 2,
   'Which storage device would be most suitable for carrying a 2 GB file between school and home?',
   ['Flash drive', 'Internal hard disk', 'CD-ROM', 'Magnetic tape'], 'Flash drive',
   'It must be portable AND big enough.',
   'A flash drive is small, plugs into a USB port and easily holds 2 GB. A CD-ROM holds only about 700 MB, and the other two are not made to be carried about.'],

  ['g9ict-sys-010', 'cpu_memory', 1,
   'What does <b>CPU</b> stand for?',
   ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Control Processing Unit'],
   'Central Processing Unit',
   'It is the part that does the processing.',
   'CPU stands for Central Processing Unit. It carries out the instructions that make up a program.'],

  ['g9ict-sys-011', 'cpu_memory', 2,
   'Which statement about <b>ROM</b> is correct?',
   ['Its contents are kept when the power is switched off',
    'Its contents are lost when the power is switched off',
    'It can be written to as often as RAM',
    'It stores the file you are currently editing'],
   'Its contents are kept when the power is switched off',
   'The R and the O stand for Read Only.',
   'ROM is non-volatile: its contents survive when the power goes off, which is why the start-up instructions are kept there.'],

  ['g9ict-sys-012', 'cpu_memory', 2,
   'A computer is switched off while a document is open and unsaved. The document is lost. Which memory was it held in?',
   ['RAM', 'ROM', 'Hard disk', 'Cache on the hard disk'], 'RAM',
   'Which memory loses its contents without power?',
   'RAM is volatile, so anything held only in RAM is lost when the power goes. That is why work must be saved to a storage device.'],

  ['g9ict-sys-013', 'cpu_memory', 3,
   'Two computers are identical except that one has 4 GB of RAM and the other 16 GB. What is the most likely effect?',
   ['The 16 GB computer runs more programs at once without slowing down',
    'The 16 GB computer has a faster processor',
    'The 16 GB computer stores more files permanently',
    'The 16 GB computer starts up without an operating system'],
   'The 16 GB computer runs more programs at once without slowing down',
   'RAM is working space, not permanent storage.',
   'RAM is the working space a computer uses for programs that are running. More RAM means more can be held at once, so the machine slows down less. It does not change the processor speed or permanent storage.'],

  ['g9ict-sys-014', 'data_units', 1,
   'How many <b>bits</b> are there in one byte?',
   ['8', '4', '16', '1024'], '8',
   'It is a small power of two.',
   'One byte is made up of 8 bits.'],

  ['g9ict-sys-015', 'data_units', 2,
   'Which list puts the units in order from <b>smallest to largest</b>?',
   ['Bit, byte, kilobyte, megabyte', 'Byte, bit, kilobyte, megabyte',
    'Bit, byte, megabyte, kilobyte', 'Kilobyte, byte, bit, megabyte'],
   'Bit, byte, kilobyte, megabyte',
   'Start with the smallest piece of data there is.',
   'A bit is the smallest unit, 8 bits make a byte, about a thousand bytes make a kilobyte and about a thousand kilobytes make a megabyte.'],

  ['g9ict-sys-016', 'data_units', 3,
   'Approximately how many <b>megabytes</b> are there in 3 gigabytes?',
   ['3000', '300', '30', '30000'], '3000',
   'There are about 1000 megabytes in a gigabyte.',
   '1 GB is about 1000 MB, so 3 GB is about 3 &times; 1000 = 3000 MB.'],

  ['g9ict-sys-017', 'data_units', 2,
   'A file is 2 kilobytes. About how many <b>bytes</b> is that?',
   ['2000', '200', '20', '20000'], '2000',
   'A kilobyte is about a thousand bytes.',
   '1 KB is about 1000 bytes, so 2 KB is about 2000 bytes.'],

  ['g9ict-sys-018', 'input_devices', 3,
   'A bank wants customers to sign on screen with a special pen. Which input device does this?',
   ['Signature pad', 'Optical mark reader', 'Barcode scanner', 'Magnetic stripe reader'],
   'Signature pad',
   'The clue is that the customer writes.',
   'A signature pad captures the movement of a pen on its surface, so a handwritten signature can be stored electronically.'],

  ['g9ict-sys-019', 'output_devices', 3,
   'Which output device is most suitable for showing a presentation to a whole class?',
   ['Data projector', 'Monitor', 'Headphones', 'Plotter'], 'Data projector',
   'Everyone in the room has to see it at once.',
   'A data projector throws the image onto a large screen or wall so a whole class can see it at the same time.'],

  ['g9ict-sys-020', 'storage_devices', 3,
   'Which of these is an <b>optical</b> storage medium?',
   ['DVD', 'Hard disk', 'Flash drive', 'RAM'], 'DVD',
   'Optical means it is read with light.',
   'A DVD is read by a laser, so it is optical storage. A hard disk is magnetic, a flash drive uses memory chips, and RAM is not a storage medium at all.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({
    id, chapterId: CH, subsection, difficulty, question, options, answer, hint, explanation,
  }));
});

// ── Short typed answers, the paper's other common 1-mark shape ────────────
// NCE ICT Q2 and Q5 are short answers of 1-2 marks; nothing in five years
// exceeds 6 marks, so there is nothing longer to model here.
const SHORT = [
  ['g9ict-sys-021', 'data_units', 1, 'How many bits make one byte? Give the number only.',
   '8', ['eight'], 'A small power of two.', 'One byte is 8 bits.'],
  ['g9ict-sys-022', 'cpu_memory', 2,
   'Give the full name of the part of a computer whose short form is <b>RAM</b>.',
   'Random Access Memory', ['random access memory'],
   'The first word means the computer can reach any part of it directly.',
   'RAM stands for Random Access Memory.'],
  ['g9ict-sys-023', 'cpu_memory', 2,
   'Give the full name of the part of a computer whose short form is <b>ROM</b>.',
   'Read Only Memory', ['read only memory', 'read-only memory'],
   'The computer can read it but not normally change it.',
   'ROM stands for Read Only Memory.'],
  ['g9ict-sys-024', 'storage_devices', 2,
   'Name <b>one</b> storage device that uses a laser to read data.',
   'DVD', ['cd', 'cd-rom', 'dvd', 'blu-ray', 'compact disc', 'optical disc'],
   'It is a flat disc you can hold.',
   'A CD, DVD or Blu-ray disc is read by a laser, so any of these is correct.'],
  ['g9ict-sys-025', 'input_devices', 2,
   'Name the input device used to turn a printed photograph into a file on a computer.',
   'Scanner', ['flatbed scanner', 'image scanner'],
   'It works like a photocopier but sends the image to the computer.',
   'A scanner shines light across the photograph and sends the image into the computer as a file.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({
    id, chapterId: CH, subsection, difficulty, question, answer,
    alsoAccept: accept, hint, explanation,
  }));
});

})();
