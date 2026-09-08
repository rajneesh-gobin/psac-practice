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
//  ⚠ comingSoon WAS true until every chapter had questions, and is now false.
//    Condition met 2026-09-08: all 12 chapters written, 396 questions, and
//    every one of the 73 declared subsections has at least three items behind
//    it (measured, not asserted — see the note on the map below). A child
//    opening an empty chapter is worse than a card saying the pack is not
//    ready, which is why the flag waited for the content rather than the
//    other way round.
// ══════════════════════════════════════════════════════════════════════════

// ⚠ ONLY CHAPTERS THAT HAVE QUESTIONS APPEAR HERE. A declared subsection id
//   with nothing behind it opens an empty Practise screen, and a tagged id
//   that is NOT declared hides its questions from that screen - the two must
//   match exactly, per chapter. The first cut of this file declared all
//   twelve chapters' subsections while only one chapter had been written,
//   which would have advertised eleven topics that open empty.
//   `subjects/grade9-science/_manifest.js` keeps its map deliberately empty
//   for the same reason; add ids here as each chapter is written.
// ⚠ RE-DECLARED 2026-09-08, deliberately, having been reverted once for the
//   reason above. What changed is that there is now a derived plan to declare:
//   every id below is transcribed from "Proposed subsection ids, per content
//   area" in docs/nce-grade9/syllabus-ict.md, which maps them outcome by
//   outcome onto the nine NCF §8.6.3/§8.7.3 content areas. They are TAGGING
//   TARGETS for the author, and they are invisible to everyone while
//   comingSoon keeps the pack out of activateSubjectPack(), the per-grade fetch
//   and assembleExamPaper().
//   The condition the earlier revert was protecting still holds and is now
//   enforced rather than remembered: THIS PACK MUST NOT GO LIVE UNTIL EVERY ID
//   BELOW HAS QUESTIONS. scripts/test-subsection-invariant.js checks live packs
//   only, so it begins failing the moment comingSoon flips. Delete an id you
//   decide not to cover; never leave it declared and empty.
//
// ⚠ SATISFIED 2026-09-08, BY WRITING THE CONTENT, NOT BY DELETING IDS. The
//   first pass of the twelve chapters left TWENTY declared ids empty across six
//   chapters — images_shapes, tables_text, multiple_documents, styles,
//   mail_merge, toc_lists, filter_sort, advanced_formatting, charts_from_data,
//   network_basics, wired_wireless, intranet_extranet, internet_www, web_tools,
//   web_design_principles, drawing_flowcharts, maths_modelling, animated_clips,
//   video_enhancement, comic_strips. Deleting them would have quietly shrunk
//   the syllabus to whatever happened to be written; most are formats the
//   papers actually ask (mail merge and tables are Q7 every year from 2022), so
//   each got a SYLLABUS-GAP BLOCK in its chapter file instead. `g9ict-wp-023`
//   was retagged page_layout → mail_merge in the same pass: it was already a
//   mail-merge question filed under the wrong id.
//   Measured after that pass: 73 declared ids, 73 tagged ids, they are the same
//   set, and the smallest holds 3 items. Re-measure rather than trusting this.
//
// ⚠ 'g9ict-computer-systems' IS LEFT EXACTLY AS IT WAS. It was the first
//   chapter written (25 questions, tagged 5/5 against these ids) and it is
//   still the only one whose map was not touched by the gap-filling pass above:
//   adding the doc's further hardware ids would put empty cards on the one
//   chapter that never had any. The doc's `hardware_software`,
//   `computer_types`, `peripherals`, `primary_secondary` etc. are deliberately
//   not imported here.
//
// ⚠ The doc proposes THIRTEEN chapters with different ids (g9ict-hardware,
//   g9ict-word, g9ict-flowcharts, g9ict-programming, g9ict-multimedia, …); this
//   pack was built with TWELVE. Multimedia is folded into Presentation,
//   flowcharts and programming into Algorithms, and troubleshooting is its own
//   chapter rather than living under Software & OS. The ids below are mapped
//   onto the chapters that actually exist, not the ones the doc imagined.
//
// ⚠ Artefact outcomes are NOT declared: "create a website", "produce a comic
//   strip", "produce a video", "engage in e-discussions". The doc measures all
//   five NCE ICT papers as 1h45, 100 marks, answered on the question paper with
//   no practical component — a written exam cannot mark an artefact and neither
//   can this app. The planning and principles behind them ARE declared
//   (storyboarding, authoring tools, web-design principles).
const G9ICT_SYLLABUS = {
  'g9ict-computer-systems': { subsections: [
    { id: 'input_devices', name: 'Input devices and what each is used for' },
    { id: 'output_devices', name: 'Output devices and what each is used for' },
    { id: 'storage_devices', name: 'Storage devices and their capacities' },
    { id: 'cpu_memory', name: 'The processor, RAM and ROM' },
    { id: 'data_units', name: 'Bits, bytes and the units above them' },
  ] },
  'g9ict-software-os': { subsections: [
    { id: 'os_functions',     name: 'The functions of an operating system' },
    { id: 'os_types',         name: 'Types of operating system' },
    { id: 'utility_programs', name: 'Utility programmes, and application vs system software' },
  ] },
  'g9ict-troubleshooting': { subsections: [
    { id: 'troubleshooting_techniques', name: 'Basic troubleshooting techniques' },
    { id: 'troubleshooting_steps',      name: 'The steps in troubleshooting a computer system problem' },
  ] },
  // ⚠ The first three are the AUTHOR'S ids, taken from ch02_word_processing.js,
  //   which already has 25 questions behind them. They beat the doc's proposed
  //   `document_formatting` / `page_section_breaks` / `images_shapes` split
  //   because they were derived from what the papers actually ask, measured
  //   across NCE 2021-2025 Q7 and Q1, rather than from the syllabus outcome
  //   list. Declaring the doc's names instead would have hidden all 25 questions
  //   from the Practise screen the moment this pack went live.
  //   The remaining ids are syllabus outcomes not yet covered by that file.
  'g9ict-word-processing': { subsections: [
    { id: 'text_formatting',     name: 'Bold, italic, underline and text appearance' },
    { id: 'page_layout',         name: 'Page setup, margins, breaks and multi-column layout' },
    { id: 'word_icons',          name: 'Recognising and naming toolbar icons' },
    { id: 'images_shapes',       name: 'Image properties, placement, drawings and shapes' },
    { id: 'tables_text',         name: 'Tables, and converting between text and tables' },
    { id: 'multiple_documents',  name: 'Working with multiple documents' },
    { id: 'styles',              name: 'Working with styles' },
    { id: 'mail_merge',          name: 'Mail merge for multiple recipients' },
    { id: 'toc_lists',           name: 'Auto-generating a table of contents and lists of figures and tables' },
  ] },
  // ⚠ `cells_ranges` and `formulas` are the AUTHOR'S ids, from
  //   ch03_spreadsheets.js. The doc proposed `cell_references` and
  //   `formulae_basics`; those names would have orphaned 16 written questions.
  'g9ict-spreadsheets': { subsections: [
    { id: 'cells_ranges',         name: 'Cells, ranges and references' },
    { id: 'formulas',             name: 'Formulae: selecting one and entering its parameters' },
    { id: 'functions',            name: 'Functions' },
    { id: 'filter_sort',          name: 'Filtering and sorting' },
    { id: 'advanced_formatting',  name: 'Advanced formatting, formulae and functions' },
    { id: 'charts_from_data',     name: 'Producing charts from data' },
  ] },
  'g9ict-databases': { subsections: [
    { id: 'db_structure',   name: 'The structure of a database' },
    { id: 'db_tables',      name: 'Creating and modifying a database table' },
    { id: 'data_entry',     name: 'Entering, modifying and deleting data' },
    { id: 'queries',        name: 'Creating queries, including query-by-example grids' },
    { id: 'forms_reports',  name: 'Creating forms and reports' },
  ] },
  'g9ict-networks': { subsections: [
    { id: 'network_basics',      name: 'What a computer network is, and its benefits and drawbacks' },
    { id: 'network_types',       name: 'PAN, LAN, MAN, WAN, SAN and VPN' },
    { id: 'topologies',          name: 'Bus, ring, star, mesh and tree topologies' },
    { id: 'network_components',  name: 'NIC, modem, Wifi, router, firewall and ISP' },
    { id: 'wired_wireless',      name: 'Cable-based and wireless networks, and choosing between them' },
    { id: 'intranet_extranet',   name: 'Intranet and Extranet' },
  ] },
  // ⚠ `browsers_search` and `e_services` are the AUTHOR'S ids from
  //   ch06_internet.js. `browsers_search` covers what the doc split three ways
  //   (`browsers_urls` / `search_engines` / `meta_search`), so those three are
  //   dropped rather than declared beside it.
  'g9ict-internet': { subsections: [
    { id: 'internet_www',          name: 'The Internet and the World Wide Web' },
    { id: 'email',                 name: 'Email, and email compared with postal mail' },
    { id: 'browsers_search',       name: 'Browsers, URLs, history, search engines and refined searches' },
    { id: 'e_services',            name: 'Online services and e-communication' },
    { id: 'web_tools',             name: 'Conferencing, podcasting, wikis, blogs, social networking, chat and forums' },
    { id: 'web_design_principles', name: 'Simple web design principles for user-friendliness' },
  ] },
  // ⚠ `flowchart_reading`, `control_structures` and `python_basics` are the
  //   AUTHOR'S ids from ch04_algorithms.js. The doc's `dry_running`,
  //   `visual_programming` and `simple_programs` are dropped as near-duplicates
  //   of them rather than declared alongside — two ids for one topic split the
  //   questions across two Practise cards.
  //   ⚠ Note `python_basics` where the syllabus says Scratch/Logo. That is the
  //   author's reading of the papers, not the syllabus text; worth confirming
  //   against a paper before more is written against it.
  'g9ict-algorithms': { subsections: [
    { id: 'flowchart_symbols',   name: 'Identifying and using flowchart symbols' },
    { id: 'flowchart_reading',   name: 'Reading and dry-running a flowchart to a final value' },
    { id: 'drawing_flowcharts',  name: 'Drawing flowcharts to solve simple problems' },
    { id: 'control_structures',  name: 'Sequence, selection and repetition' },
    { id: 'python_basics',       name: 'Writing simple programs' },
    { id: 'maths_modelling',     name: 'Mathematical calculations and modelling' },
  ] },
  'g9ict-presentation': { subsections: [
    { id: 'charts_tables',     name: 'Charts and tables in a presentation' },
    { id: 'animations',        name: 'Advanced animations' },
    { id: 'notes_handouts',    name: 'Notes, handouts, speaker notes and Notes Page view' },
    { id: 'print_preview',     name: 'Print Preview' },
    { id: 'design_templates',  name: 'Applying design templates' },
    { id: 'slide_masters',     name: 'Title and slide masters, including multiple masters' },
    { id: 'animated_clips',    name: 'Creating a simple animated clip' },
    { id: 'video_enhancement', name: 'Enhancing a video with recorded narration and overlay text' },
    { id: 'comic_strips',      name: 'How an educational comic strip is put together' },
    { id: 'storyboarding',     name: 'Planning with a storyboard' },
    { id: 'authoring_tools',   name: 'Choosing an authoring tool to assemble and sequence' },
  ] },
  'g9ict-ethics-security': { subsections: [
    { id: 'computer_ethics',          name: 'Computer ethics' },
    { id: 'information_privacy',      name: 'Information privacy' },
    { id: 'data_security',            name: 'Security of data, threats to it, and keeping it secure' },
    { id: 'data_backups',             name: 'The importance of data backups' },
    { id: 'data_protection_act',      name: 'Key features of a data protection act' },
    { id: 'copyright_ownership',      name: 'Ownership and copyright of Internet resources' },
    { id: 'plagiarism',               name: 'Plagiarism, and avoiding it accidentally' },
    { id: 'internet_dangers',         name: 'The potential dangers of the Internet' },
    { id: 'social_economic_effects',  name: 'Social and economic effects of computer use, piracy, crime and hacking' },
  ] },
  'g9ict-health-safety': { subsections: [
    { id: 'lab_guidelines',      name: 'Computer laboratory guidelines, rules and regulations' },
    { id: 'safety_precautions',  name: 'Safety precautions with ICT tools' },
    { id: 'equipment_care',      name: 'Proper care of equipment' },
    { id: 'health_hazards',      name: 'Health hazards of prolonged ICT use' },
    { id: 'hazard_prevention',   name: 'Preventing those health hazards' },
  ] },
};

registerSubject({
  id: 'grade9-ict', name: 'ICT', grade: 9, icon: '💻',
  subject: 'Information and Communication Technology',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
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
