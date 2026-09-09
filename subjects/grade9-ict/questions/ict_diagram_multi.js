'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Flowchart process symbol (2021-22 NCE ICT Q1(iii)) ────────────────────
  // Four shapes shown: Diamond (decision), Oval (terminal), Parallelogram
  // (input/output), Rectangle (process). Question asks which = PROCESS.

  makeMCQ({ id: 'g9ict-dm-001', chapterId: 'g9ict-algorithms', subsection: 'flowchart_symbols', difficulty: 1,
    question: 'Four shapes used in flowcharts are shown below. Which shape represents a <b>PROCESS</b>?<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 90" width="280" height="90" style="display:block;margin:8px auto">' +
      '<polygon points="35,10 55,35 35,60 15,35" fill="#fff" stroke="#333" stroke-width="2"/>' +
      '<text x="35" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#333">A</text>' +
      '<ellipse cx="100" cy="35" rx="30" ry="18" fill="#fff" stroke="#333" stroke-width="2"/>' +
      '<text x="100" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#333">B</text>' +
      '<polygon points="148,17 188,17 178,53 138,53" fill="#fff" stroke="#333" stroke-width="2"/>' +
      '<text x="163" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#333">C</text>' +
      '<rect x="215" y="17" width="55" height="36" fill="#fff" stroke="#333" stroke-width="2"/>' +
      '<text x="242" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#333">D</text>' +
      '</svg>',
    options: ['D — Rectangle', 'A — Diamond', 'B — Oval', 'C — Parallelogram'],
    answer: 'D — Rectangle',
    hint: 'The process box is the most common shape in a flowchart — it contains an action or calculation.',
    explanation: 'Shape <b>D (Rectangle)</b> represents a <b>process</b> — an action, calculation or instruction (e.g. "Calculate total", "Add 1 to counter"). Shape A (Diamond) = decision; Shape B (Oval/Ellipse) = start/end (terminal); Shape C (Parallelogram) = input or output.' }),

  // ── PowerPoint Notes pages layout (2021-22 NCE ICT Q1(iv)) ───────────────
  // Print layout: slide thumbnail at top + lines for speaker notes below.

  makeMCQ({ id: 'g9ict-dm-002', chapterId: 'g9ict-presentation', subsection: 'presentation_printing', difficulty: 1,
    question: 'A PowerPoint print layout is shown. The page displays a <b>small slide image</b> in the upper half and <b>lines for speaker notes</b> in the lower half, both on the same page. Which type of print layout is this?',
    options: ['Notes pages', 'Handouts', 'Outline', 'Full page slides'],
    answer: 'Notes pages',
    hint: 'This layout is designed to help the presenter remember what to say during each slide.',
    explanation: '<b>Notes pages</b> print each slide as a smaller image with the speaker\'s notes printed below it on the same page. <em>Handouts</em> print multiple slides per page without notes. <em>Outline</em> shows only the text content in hierarchical form. <em>Full page slides</em> prints one slide per full page without notes.' }),

  // ── Spreadsheet cell reference (2021-22 NCE ICT Q1(v)) ────────────────────
  // Spreadsheet: col A = Name, col B = Marks in ICT.
  // Row 5 has Malini with 56 marks → cell B5.

  makeMCQ({ id: 'g9ict-dm-003', chapterId: 'g9ict-spreadsheets', subsection: 'cell_references', difficulty: 1,
    question: 'The spreadsheet below shows student marks.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130" style="display:block;margin:8px auto">' +
      '<rect x="10" y="10" width="240" height="115" fill="#fff" stroke="#999" stroke-width="1"/>' +
      '<rect x="10" y="10" width="30" height="20" fill="#dde" stroke="#999" stroke-width="1"/>' +
      '<rect x="40" y="10" width="110" height="20" fill="#dde" stroke="#999" stroke-width="1"/>' +
      '<rect x="150" y="10" width="100" height="20" fill="#dde" stroke="#999" stroke-width="1"/>' +
      '<text x="25" y="24" font-size="9" text-anchor="middle" fill="#333">▲</text>' +
      '<text x="95" y="24" font-size="10" font-weight="bold" text-anchor="middle" fill="#333">A</text>' +
      '<text x="200" y="24" font-size="10" font-weight="bold" text-anchor="middle" fill="#333">B</text>' +
      '<rect x="10" y="30" width="30" height="20" fill="#eef" stroke="#999" stroke-width="1"/><text x="25" y="44" font-size="9" text-anchor="middle" fill="#555">1</text>' +
      '<rect x="40" y="30" width="110" height="20" fill="#fff" stroke="#999" stroke-width="1"/>' +
      '<rect x="150" y="30" width="100" height="20" fill="#fff" stroke="#999" stroke-width="1"/>' +
      '<rect x="10" y="50" width="30" height="20" fill="#eef" stroke="#999" stroke-width="1"/><text x="25" y="64" font-size="9" text-anchor="middle" fill="#555">2</text>' +
      '<rect x="40" y="50" width="110" height="20" fill="#fff" stroke="#999" stroke-width="1"/>' +
      '<rect x="150" y="50" width="100" height="20" fill="#fff" stroke="#999" stroke-width="1"/>' +
      '<rect x="10" y="70" width="30" height="20" fill="#eef" stroke="#999" stroke-width="1"/><text x="25" y="84" font-size="9" text-anchor="middle" fill="#555">3</text>' +
      '<rect x="40" y="70" width="110" height="20" fill="#fff" stroke="#999" stroke-width="1"/><text x="50" y="84" font-size="9" fill="#333">Name</text>' +
      '<rect x="150" y="70" width="100" height="20" fill="#fff" stroke="#999" stroke-width="1"/><text x="155" y="84" font-size="9" fill="#333">Marks scored in ICT</text>' +
      '<rect x="10" y="90" width="30" height="20" fill="#eef" stroke="#999" stroke-width="1"/><text x="25" y="104" font-size="9" text-anchor="middle" fill="#555">4</text>' +
      '<rect x="40" y="90" width="110" height="20" fill="#fff" stroke="#999" stroke-width="1"/><text x="50" y="104" font-size="9" fill="#333">Jamila</text>' +
      '<rect x="150" y="90" width="100" height="20" fill="#fff" stroke="#999" stroke-width="1"/><text x="235" y="104" font-size="9" text-anchor="end" fill="#333">52</text>' +
      '<rect x="10" y="110" width="30" height="15" fill="#eef" stroke="#999" stroke-width="1"/><text x="25" y="121" font-size="9" text-anchor="middle" fill="#555">5</text>' +
      '<rect x="40" y="110" width="110" height="15" fill="#fffacd" stroke="#999" stroke-width="1"/><text x="50" y="121" font-size="9" fill="#333">Malini</text>' +
      '<rect x="150" y="110" width="100" height="15" fill="#fffacd" stroke="#999" stroke-width="1"/><text x="235" y="121" font-size="9" text-anchor="end" fill="#333">56</text>' +
      '</svg>Which cell shows the marks scored by <b>Malini</b> in ICT?',
    options: ['B5', 'A5', 'B4', 'A3'],
    answer: 'B5',
    hint: 'Cell reference = column letter + row number. Malini is in row 5, marks are in column B.',
    explanation: 'Malini\'s name is in cell <b>A5</b> and her marks (56) are in cell <b>B5</b>. Cell references combine the <em>column letter</em> first and the <em>row number</em> second. Column B contains the marks; row 5 contains Malini\'s data.' }),

  // ── Tree network topology (2021-22 NCE ICT Q1(vi)) ────────────────────────
  // Diagram: 3 computers on top row, 3 more below, connected hierarchically.

  makeMCQ({ id: 'g9ict-dm-004', chapterId: 'g9ict-networks', subsection: 'topologies', difficulty: 2,
    question: 'A network diagram is shown below. Computers are arranged in layers: a root node at the top, connecting to two nodes in the middle, each of which connects to further nodes below.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" width="200" height="140" style="display:block;margin:8px auto">' +
      '<rect x="85" y="8" width="30" height="22" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<text x="100" y="22" font-size="8" text-anchor="middle" fill="#333">Root</text>' +
      '<line x1="100" y1="30" x2="55" y2="52" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="100" y1="30" x2="145" y2="52" stroke="#333" stroke-width="1.5"/>' +
      '<rect x="35" y="52" width="40" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<rect x="125" y="52" width="40" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<line x1="55" y1="72" x2="28" y2="95" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="55" y1="72" x2="62" y2="95" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="145" y1="72" x2="138" y2="95" stroke="#333" stroke-width="1.5"/>' +
      '<line x1="145" y1="72" x2="172" y2="95" stroke="#333" stroke-width="1.5"/>' +
      '<rect x="12" y="95" width="32" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<rect x="48" y="95" width="32" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<rect x="122" y="95" width="32" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '<rect x="158" y="95" width="32" height="20" rx="3" fill="#aaccee" stroke="#336"/>' +
      '</svg>Which network topology is shown?',
    options: ['Tree', 'Bus', 'Star', 'Mesh'],
    answer: 'Tree',
    hint: 'The devices branch outward from a single root node, like branches of a tree.',
    explanation: 'The diagram shows a <b>tree topology</b> — a hierarchical network where nodes branch outward from a central root node. It is a combination of star and bus topologies. Advantages: easy to expand by adding branches. Disadvantage: if the root fails, the whole network is affected. Bus = single backbone cable; Star = central hub; Mesh = every device connected to every other.' }),

  // ── Whisper speech balloon (2021-22 NCE ICT Q1(xi)) ──────────────────────
  // Dashed oval balloon with dashed tail = whisper/thought balloon.

  makeMCQ({ id: 'g9ict-dm-005', chapterId: 'g9ict-word-processing', subsection: 'word_icons', difficulty: 1,
    question: 'A speech balloon shape is shown with a <b>dashed (dotted) outline</b> forming an oval, with a small dashed tail pointing downward. Which type of speech balloon is this?',
    options: [
      'Whisper balloon',
      'General speech balloon',
      'Thought balloon',
      'Exclamation callout'
    ],
    answer: 'Whisper balloon',
    hint: 'The dashed/dotted outline suggests something soft or quiet rather than a loud statement.',
    explanation: 'A <b>whisper balloon</b> has a dashed or dotted outline to indicate that something is being said quietly or whispered. A <em>general speech balloon</em> has a solid oval outline with a pointed tail. A <em>thought balloon</em> has a cloud-like bumpy outline with small circles forming the tail. An <em>exclamation/emphasis callout</em> has jagged, spiky edges.' }),

  // ── Microphone hardware identification (2021-22 NCE ICT Q4(b)) ───────────
  // Image of device with flexible neck and capsule head = microphone (input device).

  makeMCQ({ id: 'g9ict-dm-006', chapterId: 'g9ict-computer-systems', subsection: 'input_output_devices', difficulty: 1,
    question: 'A picture shows a hardware device with a <b>long, flexible neck</b> on a base and a <b>capsule-shaped head</b> at the top — designed to capture sound and convert it to an electrical signal. Which hardware device is shown?',
    options: ['Microphone', 'Router', 'Printer', 'Compact disc'],
    answer: 'Microphone',
    hint: 'This device is used to record voice or sound — it is an input device.',
    explanation: 'The device described is a <b>microphone</b> — an input device that converts sound waves into electrical signals. It is used for voice recording, video calls, dictation and podcasts. A <em>router</em> routes network data; a <em>printer</em> produces hard-copy output; a <em>compact disc</em> is a round optical storage medium.' })

);

})();
