'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Information and Communication Technology (NCE paper N540)
//
//  ⚠ THIS PACK DID NOT EXIST, AND THAT WAS A REAL GAP. `past-papers/nce/ict/`
//    holds FIVE real NCE ICT papers and the NCF lists the subject at printed
//    page 128, yet CLAUDE.md recorded the Grades 7-9 subject list as
//    "CONFIRMED: English, Français, Mathematics, Science and Social & Modern
//    Studies" - five packs, ICT absent. Found while sizing the remaining work.
//
//  ⚠ examWeight COMES FROM THE PAPERS, NOT THE SYLLABUS. Derived by
//    largest-remainder from the five-year mean of measured marks and summing to
//    exactly 40. Weighting from the syllabus tick-grid would over-weight Word
//    Processing purely on row count. Full derivation in
//    docs/nce-grade9/blueprint-ict.md; syllabus mapping in
//    docs/nce-grade9/syllabus-ict.md. Both were built by rendering all 124
//    paper pages and all 18 syllabus pages and reading them.
//
//  ⚠ THE SYLLABUS SCOPE TABLE IS CUMULATIVE. Every Grade 7 row is ticked in
//    columns 7, 8 AND 9, so a Grade 9 learner is accountable for the whole
//    three-year corpus - not the short "new at Grade 9" list. The 2025 paper
//    confirms it: Q1 asks input devices, bits per byte, RAM vs ROM, all Grade
//    7/8 rows. A pack built from the Grade 9 section alone would miss most of
//    what the exam asks.
//
//  ⚠ TWO THINGS THE PAPERS TEST THAT THE SYLLABUS DOES NOT NAME.
//    Python is examined by name in 2023, 2024 and 2025; the syllabus names
//    Scratch and Logo and mentions Python zero times in 330 pages (grepped).
//    The Access-style query-by-example grid appears in every paper from 2022
//    and is not a syllabus outcome either. Both are in scope because the exam
//    asks them - the same reason `g9m-number-revision` exists in Maths.
//
//  ⚠ It is a RECOGNITION paper. A mean 57.4 of 100 marks are answered by
//    selecting something already printed; 68.5% of parts are worth 1 or 2
//    marks; nothing exceeds 6; there is no essay and no optional question. That
//    makes this the best fit of any remaining subject for an auto-marked app.
//
//  ⚠ comingSoon STAYS true until every chapter has questions. A child opening
//    an empty chapter is worse than a card that says the pack is not ready.
// ══════════════════════════════════════════════════════════════════════════

// ⚠ ONLY CHAPTERS THAT HAVE QUESTIONS APPEAR HERE. A declared subsection id
//   with nothing behind it opens an empty Practise screen, and a tagged id
//   that is NOT declared hides its questions from that screen - the two must
//   match exactly, per chapter. The first cut of this file declared all
//   twelve chapters' subsections while only one chapter had been written,
//   which would have advertised eleven topics that open empty.
//   `subjects/grade9-science/_manifest.js` keeps its map deliberately empty
//   for the same reason; add ids here as each chapter is written.
const G9ICT_SYLLABUS = {
  'g9ict-computer-systems': { subsections: [
    { id: 'input_devices', name: 'Input devices and what each is used for' },
    { id: 'output_devices', name: 'Output devices and what each is used for' },
    { id: 'storage_devices', name: 'Storage devices and their capacities' },
    { id: 'cpu_memory', name: 'The processor, RAM and ROM' },
    { id: 'data_units', name: 'Bits, bytes and the units above them' },
  ] },
};

registerSubject({
  id: 'grade9-ict', name: 'ICT', grade: 9, icon: '💻',
  subject: 'Information and Communication Technology',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Applied Scenarios',
  syllabus: G9ICT_SYLLABUS,
  // ── examWeight: five-year mean of measured paper marks, largest-remainder
  //    to a total of exactly 40. See blueprint-ict.md §8.1.
  chapters: [
    { id: 'g9ict-computer-systems', name: 'Computer Systems & Hardware', icon: '🖥️', examWeight: 5,
      syllabus: 'Name input, output and storage devices and say what each is used for. Describe the processor and the difference between RAM and ROM. Work with bits, bytes, kilobytes, megabytes and gigabytes. Read a system-specification panel.' },
    { id: 'g9ict-software-os', name: 'Software & Operating Systems', icon: '⚙️', examWeight: 2,
      syllabus: 'Distinguish system software, application software and utility programs. Describe what an operating system does. Recognise common operating systems and the parts of a graphical user interface.' },
    { id: 'g9ict-word-processing', name: 'Word Processing', icon: '📄', examWeight: 5,
      syllabus: 'Format text and paragraphs. Set page layout, margins and orientation. Name the toolbar icons and say what each does. Insert tables, headers and footers. Use mail merge. Print and read a print dialog.' },
    { id: 'g9ict-spreadsheets', name: 'Spreadsheets', icon: '📊', examWeight: 5,
      syllabus: 'Refer to cells and ranges. Write formulas beginning with an equals sign. Use SUM, AVERAGE, MAX, MIN and COUNT. Sort and filter data. Apply conditional formatting. Create and read a chart.' },
    { id: 'g9ict-databases', name: 'Databases', icon: '🗄️', examWeight: 3,
      syllabus: 'Describe a table as records and fields. Choose an appropriate data type for a field. Explain what a primary key is and why a table needs one. Read and complete a query-by-example grid. Recognise forms and reports.' },
    { id: 'g9ict-networks', name: 'Networks', icon: '🌐', examWeight: 4,
      syllabus: 'Distinguish a LAN from a WAN. Recognise bus, star and ring topologies. Name the components of a network and say what each does. Compare wired and wireless connections. Describe an intranet, an extranet and a VPN.' },
    { id: 'g9ict-internet', name: 'Internet & Online Communication', icon: '📡', examWeight: 4,
      syllabus: 'Use a browser, a URL and a search engine effectively. Send email using To, Cc, Bcc and attachments. Describe online services such as banking, shopping and learning. Use video conferencing and collaborative web tools.' },
    { id: 'g9ict-algorithms', name: 'Algorithms, Flowcharts & Programming', icon: '🔁', examWeight: 5,
      syllabus: 'Name the flowchart symbols and what each is for. Follow a flowchart and work out its output. Complete a flowchart from numbered statements. Use sequence, selection and repetition. Read and write simple Python.' },
    { id: 'g9ict-presentation', name: 'Presentation & Multimedia', icon: '🎬', examWeight: 1,
      syllabus: 'Plan and build a slide presentation. Use layouts, slide masters, notes and handouts. Describe how comic strips, video and audio are produced and where each is appropriate.' },
    { id: 'g9ict-ethics-security', name: 'Ethics, Data Protection & Security', icon: '🔒', examWeight: 3,
      syllabus: 'Explain what personal data is and why it is protected. Describe copyright and plagiarism. Recognise hacking, phishing, viruses and other computer crime. Keep data safe with passwords and backups.' },
    { id: 'g9ict-health-safety', name: 'Health & Safety', icon: '🩺', examWeight: 1,
      syllabus: 'Describe the health risks of using a computer badly. Set up a workstation to reduce those risks. Follow safety rules in a computer room.' },
    { id: 'g9ict-troubleshooting', name: 'Troubleshooting', icon: '🛠️', examWeight: 2,
      syllabus: 'Identify common hardware and software faults and the first checks to make. Recover a lost or deleted file. Use keyboard shortcuts.' },
  ],
});
