'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - NCE SECTION B applied tasks, authored as multi-part tasks
//
//  ⚠ READ THE HEADER OF nce_section_a.js FIRST. It records the measurement
//    that both files answer: a generated ICT paper reached 79 of 100 marks at
//    every seed because the bank held nothing but 1-mark items, and the middle
//    of the paper will not print a loose MCQ.
//
//  ⚠ THIS FILE IS THE SECTION B HALF - the applied work. Measured over NCE ICT
//    2022-2025 (blueprint-ict.md §1), Section B is 50 marks in six questions
//    and its slots barely move from year to year: Q6 reads a system
//    specification, Q7 is word processing, Q8/Q9 are spreadsheets and
//    networks, Q9/Q10 are a database and an online service, and Q11 is
//    ALWAYS algorithms and always last. There is one task below for each of
//    those slots, plus the smaller ones the assembler needs to reach a whole
//    100 exactly.
//
//  ⚠ THE STIMULI ARE DRAWN, NOT PHOTOGRAPHED. The real paper leans on
//    screenshots and product photographs (73.6% of its questions carry a
//    graphic) and this repo has no Grade 9 artwork. Everything here is either
//    an inline SVG line drawing or a plain HTML facsimile built out of borders
//    and text, so it cannot 404, works offline, prints in black and white and
//    reproduces no commercial logo.
//
//  ⚠ ALT TEXT NAMES THE FIELDS, NEVER THE VALUES. "A panel listing the
//    processor, the installed memory and the system type" - not the numbers
//    the question asks the candidate to read off it.
//
//  ⚠ INSIDE AN SVG, ITALIC IS <tspan font-style="italic">. <i>, <b> and <span>
//    are on the HTML parser's "exit foreign content" list: written inside an
//    svg they close it and the rest of the figure prints as loose HTML.
//    scripts/test-svg-figures.js is the tripwire for that.
//
//  Source: NCE ICT (N540) 2021-2025 Section B; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── Figure helpers ────────────────────────────────────────────────────────

// A facsimile of an application panel: a bordered box of label / value rows.
function panel(title, rows) {
  return '<div style="border:1px solid #000;max-width:340px;margin:6px auto;text-align:left;font-size:12px">'
    + '<div style="border-bottom:1px solid #000;padding:4px 8px;font-weight:bold">' + title + '</div>'
    + rows.map(function (r) {
        return '<div style="display:flex;padding:3px 8px;border-bottom:1px solid #ccc">'
          + '<span style="flex:0 0 46%">' + r[0] + '</span><span style="flex:1 1 auto">' + r[1] + '</span></div>';
      }).join('')
    + '</div>';
}

// A spreadsheet facsimile: lettered columns, numbered rows, empty cells blank.
function sheet(cols, rows) {
  const cell = function (v, head) {
    return '<td style="border:1px solid #000;padding:3px 9px;text-align:center;'
      + (head ? 'background:#e5e5e5;font-weight:bold' : '') + '">' + (v === undefined ? '' : v) + '</td>';
  };
  let html = '<table style="border-collapse:collapse;margin:6px auto;font-size:12px">';
  html += '<tr>' + cell('', true) + cols.map(function (c) { return cell(c, true); }).join('') + '</tr>';
  rows.forEach(function (r, i) {
    html += '<tr>' + cell(String(i + 1), true) + cols.map(function (_, k) { return cell(r[k]); }).join('') + '</tr>';
  });
  return html + '</table>';
}

// A query-by-example grid, as every ICT paper from 2022 prints one.
function qbe(labels, columns) {
  const cell = function (v, head) {
    return '<td style="border:1px solid #000;padding:3px 10px;text-align:center;min-width:70px;'
      + (head ? 'background:#e5e5e5;font-weight:bold;text-align:left' : '') + '">' + (v === undefined ? '' : v) + '</td>';
  };
  return '<table style="border-collapse:collapse;margin:6px auto;font-size:12px">'
    + labels.map(function (lab, r) {
        return '<tr>' + cell(lab, true) + columns.map(function (col) { return cell(col[r]); }).join('') + '</tr>';
      }).join('')
    + '</table>';
}

// ── Inline SVG line drawings ──────────────────────────────────────────────
// Arrowheads are drawn as explicit polygons rather than through <defs>/marker:
// the figure has to survive being copied into a print sheet, and a marker that
// loses its definition leaves a line with no head and nothing says so.
const S = 'stroke="#000" stroke-width="1.4" fill="none"';
function vArrow(x, y1, y2) {
  return '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + (y2 - 7) + '" ' + S + '/>'
    + '<polygon points="' + x + ',' + y2 + ' ' + (x - 5) + ',' + (y2 - 8) + ' ' + (x + 5) + ',' + (y2 - 8) + '" fill="#000"/>';
}
function term(cx, y, w, h, label) {
  return '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h / 2) + '" ' + S + '/>'
    + '<text x="' + cx + '" y="' + (y + h / 2 + 4) + '" font-size="13" text-anchor="middle">' + label + '</text>';
}
function box(cx, y, w, h, lines) {
  let g = '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h + '" ' + S + '/>';
  const step = h / (lines.length + 1);
  lines.forEach(function (t, i) {
    g += '<text x="' + cx + '" y="' + (y + step * (i + 1) + 4) + '" font-size="13" text-anchor="middle">' + t + '</text>';
  });
  return g;
}
function para(cx, y, w, h, label) {
  const s = 12;
  return '<polygon points="' + (cx - w / 2 + s) + ',' + y + ' ' + (cx + w / 2) + ',' + y + ' '
    + (cx + w / 2 - s) + ',' + (y + h) + ' ' + (cx - w / 2) + ',' + (y + h) + '" ' + S + '/>'
    + '<text x="' + cx + '" y="' + (y + h / 2 + 4) + '" font-size="13" text-anchor="middle">' + label + '</text>';
}
function diamond(cx, cy, hw, hh, label) {
  return '<polygon points="' + cx + ',' + (cy - hh) + ' ' + (cx + hw) + ',' + cy + ' '
    + cx + ',' + (cy + hh) + ' ' + (cx - hw) + ',' + cy + '" ' + S + '/>'
    + '<text x="' + cx + '" y="' + (cy + 5) + '" font-size="13" text-anchor="middle">' + label + '</text>';
}
const svg = (w, h, body) =>
  '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" '
  + 'xmlns="http://www.w3.org/2000/svg" role="img">' + body + '</svg>';

// The running-total flowchart dry-run in B8.
const FLOW_SUM = svg(420, 400,
  term(140, 10, 120, 30, 'START')
  + vArrow(140, 40, 62)
  + para(140, 62, 128, 32, 'INPUT N')
  + vArrow(140, 94, 116)
  + box(140, 116, 170, 34, ['T = 0, C = 1'])
  + vArrow(140, 150, 174)
  + diamond(140, 214, 95, 40, 'Is C &gt; N ?')
  + '<text x="152" y="270" font-size="12">Yes</text>'
  + vArrow(140, 254, 284)
  + para(140, 284, 128, 32, 'OUTPUT T')
  + vArrow(140, 316, 338)
  + term(140, 338, 120, 30, 'STOP')
  + '<line x1="235" y1="214" x2="345" y2="214" ' + S + '/>'
  + '<text x="248" y="206" font-size="12">No</text>'
  + box(345, 188, 130, 52, ['T = T + C', 'C = C + 1'])
  + '<polyline points="345,188 345,162 148,162" ' + S + '/>'
  + '<polygon points="140,162 148,157 148,167" fill="#000"/>');
const ALT_FLOW_SUM = 'A flowchart with a start box, an input box, a box that sets two variables, '
  + 'a diamond holding a test, a box on the right that changes both variables and loops back, '
  + 'an output box and a stop box.';

// The "larger of two numbers" flowchart in B9, with four shapes left blank.
const FLOW_BLANK = svg(420, 390,
  term(190, 8, 120, 30, 'START')
  + vArrow(190, 38, 62)
  + para(190, 62, 128, 32, '1')
  + vArrow(190, 94, 116)
  + diamond(190, 156, 95, 40, '2')
  + '<line x1="95" y1="156" x2="60" y2="156" ' + S + '/>'
  + '<polyline points="60,156 60,215" ' + S + '/>'
  + '<polygon points="60,222 55,214 65,214" fill="#000"/>'
  + '<text x="66" y="148" font-size="12">Yes</text>'
  + para(60, 222, 116, 32, '3')
  + '<line x1="285" y1="156" x2="330" y2="156" ' + S + '/>'
  + '<polyline points="330,156 330,215" ' + S + '/>'
  + '<polygon points="330,222 325,214 335,214" fill="#000"/>'
  + '<text x="292" y="148" font-size="12">No</text>'
  + para(330, 222, 116, 32, '4')
  + '<polyline points="60,254 60,300 190,300" ' + S + '/>'
  + '<polyline points="330,254 330,300 190,300" ' + S + '/>'
  + vArrow(190, 300, 330)
  + term(190, 330, 120, 30, 'STOP'));
const ALT_FLOW_BLANK = 'A flowchart whose start and stop boxes are labelled and whose four other shapes '
  + 'are numbered 1 to 4 and left empty, with a Yes branch and a No branch leaving the diamond.';

// Two network topologies, drawn side by side and labelled P and Q.
const TOPOLOGIES = (function () {
  const node = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="15" ' + S + '/>';
  let g = '<rect x="86" y="94" width="46" height="40" ' + S + '/>';
  [[109, 40], [36, 114], [182, 114], [109, 190]].forEach(function (p) {
    g += '<line x1="109" y1="114" x2="' + p[0] + '" y2="' + p[1] + '" ' + S + '/>';
  });
  [[109, 40], [36, 114], [182, 114], [109, 190]].forEach(function (p) { g += node(p[0], p[1]); });
  g += '<rect x="86" y="94" width="46" height="40" ' + S + ' fill="#fff"/>';
  g += '<text x="109" y="218" font-size="14" text-anchor="middle">P</text>';
  g += '<line x1="248" y1="78" x2="418" y2="78" ' + S + '/>';
  [268, 308, 348, 388].forEach(function (x) {
    g += '<line x1="' + x + '" y1="78" x2="' + x + '" y2="112" ' + S + '/>' + node(x, 127);
  });
  g += '<text x="333" y="218" font-size="14" text-anchor="middle">Q</text>';
  return svg(440, 234, g);
})();
const ALT_TOPOLOGIES = 'Two network layouts side by side. In the one marked P four circles are each joined '
  + 'to one central rectangle. In the one marked Q four circles hang from a single horizontal line.';

// A four-bar chart with a numbered scale and a letter under each bar.
const BAR_CHART = (function () {
  const vals = [30, 24, 36, 18], names = ['9A', '9B', '9C', '9D'];
  let g = '<line x1="46" y1="20" x2="46" y2="170" ' + S + '/><line x1="46" y1="170" x2="286" y2="170" ' + S + '/>';
  [0, 10, 20, 30, 40].forEach(function (v) {
    const y = 170 - v * 3.5;
    g += '<line x1="41" y1="' + y + '" x2="46" y2="' + y + '" ' + S + '/>'
      + '<text x="36" y="' + (y + 4) + '" font-size="11" text-anchor="end">' + v + '</text>';
  });
  vals.forEach(function (v, i) {
    const x = 66 + i * 54, h = v * 3.5;
    g += '<rect x="' + x + '" y="' + (170 - h) + '" width="34" height="' + h + '" ' + S + ' fill="#ddd"/>'
      + '<text x="' + (x + 17) + '" y="188" font-size="12" text-anchor="middle">' + names[i] + '</text>';
  });
  return svg(300, 200, g);
})();
const ALT_BAR_CHART = 'A bar chart of four bars of different heights, with a scale numbered up the left-hand '
  + 'side and a class name printed under each bar.';

const pick = (options, answer) => ({ kind: 'choice', options: options, answer: answer });
// ⚠ EVERY BLANK IS AN ARRAY OF ACCEPTED SPELLINGS, even when there is only one.
//   markSlots() copes with a bare string, but the importer preflight does not -
//   and the importer is two-phase and fail-closed, so one bare string here means
//   ZERO writes for the whole 20-pack corpus, not just for this file. Wrapping
//   here rather than at each call site is what stops the next author repeating it.
const gaps = (answer, extra) => Object.assign({ kind: 'blanks',
  answer: answer.map(function (a) { return Array.isArray(a) ? a : [a]; }) }, extra || {});

const T = [];

// ── Q6 slot: reading a system specification ───────────────────────────────

T.push({
  id: 'g9ict-sys-204', chapterId: 'g9ict-computer-systems', subsection: 'cpu_memory',
  difficulty: 3,
  intro: 'The panel below was opened on a computer in the school laboratory.',
  stimulus: { html: panel('System information', [
      ['Device name', 'LAB-PC-07'],
      ['Processor', 'Intel Core i5 &nbsp; 2.40 GHz'],
      ['Installed memory', '8.00 GB'],
      ['System type', '64-bit operating system'],
      ['Edition', 'Windows 11 Pro'],
      ['Storage', '500 GB hard disk'],
    ]), altText: 'A system information panel listing the device name, the processor, the installed memory, '
      + 'the system type, the edition of the operating system and the storage fitted.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'Write down the amount of installed memory shown on the panel.',
      response: gaps([['8.00 GB', '8 GB', '8GB', '8.00GB', '8']]),
      hint: 'Read it straight off the row labelled Installed memory.',
      explanation: 'The panel gives the installed memory as 8.00 GB.' },
    { label: 'b', marks: 1, prompt: 'Write down the edition of the operating system on this computer.',
      response: gaps([['Windows 11 Pro', 'Windows 11']]),
      hint: 'It is on the row labelled Edition.',
      explanation: 'The Edition row reads Windows 11 Pro.' },
    { label: 'c', marks: 1, prompt: 'The system type of this computer is:',
      response: pick(['64-bit', '32-bit', '16-bit', '8-bit'], '64-bit'),
      hint: 'Read the row labelled System type.',
      explanation: 'The panel shows a 64-bit operating system, which means the processor handles data 64 bits at a time.' },
    { label: 'd', marks: 1, prompt: 'Write down the speed of the processor, in GHz.',
      response: { kind: 'number', answer: '2.4', accept: ['2.40'], unit: 'GHz' },
      hint: 'It is printed after the name of the processor.',
      explanation: 'The processor row reads 2.40 GHz, so the speed is 2.4 GHz.' },
    { label: 'e', marks: 1, prompt: 'Which component holds the programs that are running at this moment?',
      response: pick(['RAM', 'ROM', 'The hard disk', 'The cooling fan'], 'RAM'),
      hint: 'It is the memory that is emptied when the power goes off.',
      explanation: 'RAM holds the programs and data in use right now; the hard disk keeps them when the machine is off, and ROM holds the start-up instructions.' },
    { label: 'f', marks: 1,
      prompt: 'The user wants to run several large programs at the same time without the computer slowing down. '
        + 'Which upgrade would help most?',
      response: pick(['More RAM', 'A larger monitor', 'A faster printer', 'A louder speaker'], 'More RAM'),
      hint: 'Which part runs out of room when many programs are open?',
      explanation: 'Running many programs at once fills the RAM, so adding more RAM is the upgrade that helps. The other three change what the user sees or hears, not the speed.' },
    { label: 'g', marks: 2, prompt: 'State <b>two</b> things the processor does in a computer.',
      response: { kind: 'written' },
      rubric: '1 mark each, to a maximum of 2: carries out the instructions of a program; performs '
        + 'arithmetic and logical operations on data; controls and coordinates the other parts of the '
        + 'computer; fetches, decodes and executes instructions in turn.' },
  ],
});

// ── Q7 slot: word processing ──────────────────────────────────────────────

T.push({
  id: 'g9ict-wp-202', chapterId: 'g9ict-word-processing', subsection: 'mail_merge',
  difficulty: 3,
  intro: 'A school sends the same letter to the parents of three pupils. The list of names is stored '
    + 'in one file and the letter in another.',
  stimulus: { html: sheet(['Title', 'Surname', 'Class'], [
      ['Title', 'Surname', 'Class'],
      ['Mr', 'Ramdin', '9A'],
      ['Miss', 'Coret', '9B'],
      ['Mrs', 'Payen', '9C'],
    ]) + '<div style="border:1px solid #000;max-width:360px;margin:6px auto;padding:8px;text-align:left;font-size:12px">'
      + 'Dear &laquo;Title&raquo; &laquo;Surname&raquo;,<br><br>'
      + 'Your child in class &laquo;Class&raquo; is invited to the prize-giving on Friday.<br><br>'
      + 'Yours sincerely,<br>The Rector</div>',
    altText: 'A table of titles, surnames and classes, and below it a letter whose greeting and first '
      + 'sentence contain field names written between chevrons.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'The file holding the titles, surnames and classes is called the:',
      response: pick(['data source', 'main document', 'merge field', 'print preview'], 'data source'),
      hint: 'It is the file the values are taken from.',
      explanation: 'The list of names and classes is the data source; the letter itself is the main document.' },
    { label: 'b', marks: 2,
      prompt: 'Write the words that will appear in place of &laquo;Title&raquo; and &laquo;Surname&raquo; '
        + 'in the letter sent to the parent of the pupil in class <b>9B</b>.',
      response: gaps(['Miss', 'Coret']),
      hint: 'Find the row of the table whose class is 9B.',
      explanation: 'The 9B row holds Miss and Coret, so that letter begins "Dear Miss Coret,".' },
    { label: 'c', marks: 1, prompt: 'How many letters will be produced when the merge is completed?',
      response: { kind: 'number', answer: '3' },
      hint: 'Count the rows of data, not the heading row.',
      explanation: 'There are three rows of data below the heading row, so three letters are produced - one for each row.' },
    { label: 'd', marks: 1, prompt: 'Name the part of a mail merge that holds the text repeated in every letter.',
      response: gaps([['main document', 'main letter', 'main file']]),
      hint: 'It is the other of the two files.',
      explanation: 'The main document holds the wording that is the same in every letter, together with the merge fields.' },
    { label: 'e', marks: 1, prompt: 'In the main document a merge field is shown as:',
      response: pick(['a field name inside chevrons', 'a red wavy underline below it',
                      'a page break above the line', 'a footnote number after it'],
                     'a field name inside chevrons'),
      hint: 'Look at how Title, Surname and Class are printed in the letter.',
      explanation: 'A merge field is printed as the field name between chevrons, for example &laquo;Surname&raquo;, and is replaced by the value from the data source.' },
    { label: 'f', marks: 2,
      prompt: 'Give <b>two</b> advantages of using mail merge instead of typing each letter separately.',
      response: { kind: 'written' },
      rubric: '1 mark each, to a maximum of 2: it is much faster for a large number of letters; the '
        + 'wording cannot be typed differently by mistake from one letter to the next; a correction has '
        + 'to be made in one place only; the same list can be reused for another letter.' },
  ],
});

T.push({
  id: 'g9ict-wp-203', chapterId: 'g9ict-word-processing', subsection: 'toc_lists',
  difficulty: 3,
  intro: 'A pupil has written a long project and wants the word processor to build the contents page for it.',
  stimulus: { html: '<table style="border-collapse:collapse;margin:6px auto;font-size:12px">'
      + [['Introduction', '1'], ['Method', '3'], ['Results', '7'], ['Conclusion', '11']]
        .map(function (r) {
          return '<tr><td style="border:1px solid #000;padding:3px 14px;text-align:left">' + r[0]
            + '</td><td style="border:1px solid #000;padding:3px 14px;text-align:right">' + r[1] + '</td></tr>';
        }).join('')
      + '</table>',
    altText: 'A contents list of four section names, each with a page number beside it.' },
  parts: [
    { label: 'a', marks: 4,
      prompt: 'The four steps below are in the wrong order. Write <b>1</b>, <b>2</b>, <b>3</b> or <b>4</b> '
        + 'against each one to show the correct order.<br>'
        + '(i) Click at the place where the contents are to appear.<br>'
        + '(ii) Apply heading styles to each section heading.<br>'
        + '(iii) Choose Table of Contents from the References tab.<br>'
        + '(iv) Update the table after the text has been changed.',
      response: gaps(['2', '1', '3', '4']),
      hint: 'The word processor can only find headings that have already been marked as headings.',
      explanation: 'The headings must be styled first, then the cursor is placed, then the table is inserted, and it is updated last - so (ii) is 1, (i) is 2, (iii) is 3 and (iv) is 4.' },
    { label: 'b', marks: 1, prompt: 'An automatic table of contents can be built because the headings carry:',
      response: pick(['heading styles', 'page borders', 'text boxes', 'watermarks'], 'heading styles'),
      hint: 'The word processor has to be able to recognise a heading.',
      explanation: 'Heading styles mark which lines are headings, and the word processor collects exactly those lines into the table of contents.' },
    { label: 'c', marks: 1, prompt: 'The page numbers in an automatic table of contents are:',
      response: pick(['worked out by the word processor', 'typed in by the user each time',
                      'the same number on every page', 'printed only inside the header'],
                     'worked out by the word processor'),
      hint: 'That is why the table has to be updated.',
      explanation: 'The word processor works the page numbers out itself, which is why the table must be updated after the text changes.' },
  ],
});

T.push({
  id: 'g9ict-wp-204', chapterId: 'g9ict-word-processing', subsection: 'page_layout',
  difficulty: 3,
  intro: 'The print settings below were chosen before a document was sent to the printer.',
  stimulus: { html: panel('Print', [
      ['Printer', 'HP LaserJet 1020'],
      ['Copies', '3'],
      ['Pages', '2 - 5'],
      ['Orientation', 'Portrait'],
      ['Print on both sides', 'Off'],
    ]), altText: 'A print dialog listing the printer, the number of copies, the range of pages, the '
      + 'orientation and whether both sides of the sheet are used.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'How many copies will be printed?',
      response: { kind: 'number', answer: '3' },
      hint: 'Read the row labelled Copies.',
      explanation: 'The Copies box is set to 3.' },
    { label: 'b', marks: 1, prompt: 'How many pages are printed in each copy?',
      response: { kind: 'number', answer: '4', unit: 'pages' },
      hint: 'Count both ends of the range.',
      explanation: 'Pages 2 to 5 is four pages - 2, 3, 4 and 5.' },
    { label: 'c', marks: 1, prompt: 'How many sheets of paper are used altogether?',
      response: { kind: 'number', answer: '12', unit: 'sheets' },
      hint: 'Multiply the pages in one copy by the number of copies.',
      explanation: '4 pages &times; 3 copies = 12 sheets, because printing on both sides is switched off.' },
    { label: 'd', marks: 1, prompt: 'The orientation shown prints each page:',
      response: pick(['taller than it is wide', 'wider than it is tall',
                      'as two columns of text', 'on both sides of a sheet'],
                     'taller than it is wide'),
      hint: 'Portrait is the way a face is usually painted.',
      explanation: 'Portrait orientation makes the page taller than it is wide; landscape is the other way round.' },
    { label: 'e', marks: 1, prompt: 'Name the setting that would print on both sides of each sheet.',
      response: gaps([['duplex', 'duplex printing', 'print on both sides', 'double-sided', 'double sided printing']]),
      hint: 'It is the last row of the panel.',
      explanation: 'Printing on both sides of a sheet is called duplex printing; here it is switched off.' },
  ],
});

// ── Q8 slot: spreadsheets ─────────────────────────────────────────────────

T.push({
  id: 'g9ict-ss-201', chapterId: 'g9ict-spreadsheets', subsection: 'formulas',
  difficulty: 3,
  intro: 'The spreadsheet below is used to work out the cost of the stationery bought for a class.',
  stimulus: { html: sheet(['A', 'B', 'C', 'D'], [
      ['Item', 'Price', 'Qty', 'Total'],
      ['Exercise book', '25', '4', ''],
      ['Pen', '15', '6', ''],
      ['Ruler', '20', '2', ''],
      ['Total', '', '', ''],
    ]), altText: 'A spreadsheet with lettered columns and numbered rows holding an item name, a price '
      + 'and a quantity on each of three rows, and an empty Total column.' },
  parts: [
    { label: 'a', marks: 1,
      prompt: 'Write the formula that should be typed in cell <b>D2</b> to work out the total cost of the exercise books.',
      response: { kind: 'expression', answer: '=B2*C2', accept: ['=C2*B2'] },
      hint: 'A formula begins with an equals sign.',
      explanation: 'The total is the price multiplied by the quantity, so the formula is =B2*C2.' },
    { label: 'b', marks: 1, prompt: 'Write the formula that should be typed in cell <b>D3</b>.',
      response: { kind: 'expression', answer: '=B3*C3', accept: ['=C3*B3'] },
      hint: 'It is the same formula one row further down.',
      explanation: 'On row 3 the price is in B3 and the quantity in C3, so the formula is =B3*C3.' },
    { label: 'c', marks: 2, prompt: 'Write the formula that should be typed in cell <b>D5</b> to add the three totals together.',
      response: { kind: 'expression', answer: '=SUM(D2:D4)', accept: ['=D2+D3+D4', '=SUM(D2,D3,D4)'] },
      hint: 'A range is written with a colon between the two ends.',
      explanation: '=SUM(D2:D4) adds every cell from D2 through to D4. Writing =D2+D3+D4 gives the same answer.' },
    { label: 'd', marks: 1, prompt: 'What value will appear in cell <b>D4</b>?',
      response: { kind: 'number', answer: '40' },
      hint: 'Multiply the price of a ruler by how many were bought.',
      explanation: 'Two rulers at 20 each give 20 &times; 2 = 40.' },
    { label: 'e', marks: 1,
      prompt: 'The formula in D2 is copied down into D3. The references B2 and C2 become B3 and C3. This is called:',
      response: pick(['relative referencing', 'absolute referencing', 'conditional formatting', 'validation of data'],
                     'relative referencing'),
      hint: 'The references move with the formula.',
      explanation: 'A relative reference changes as the formula is copied, so a formula written once can be reused down a whole column.' },
    { label: 'f', marks: 1, prompt: 'Write the cell reference of the cell holding the price of a pen.',
      response: gaps([['B3']]),
      hint: 'Give the column letter first, then the row number.',
      explanation: 'The pen is on row 3 and the prices are in column B, so the reference is B3.' },
    { label: 'g', marks: 2, prompt: 'Explain why a formula is used in D5 rather than typing the answer in.',
      response: { kind: 'written' },
      rubric: '1 mark each, to a maximum of 2: the total is worked out again by itself whenever a price '
        + 'or a quantity is changed; it removes the risk of an arithmetic mistake; the same formula can '
        + 'be copied and reused elsewhere.' },
  ],
});

T.push({
  id: 'g9ict-ss-202', chapterId: 'g9ict-spreadsheets', subsection: 'functions',
  difficulty: 3,
  intro: 'The spreadsheet below holds the test marks of five pupils.',
  stimulus: { html: sheet(['A', 'B'], [
      ['Pupil', 'Mark'],
      ['Anil', '72'],
      ['Bibi', '55'],
      ['Chan', '88'],
      ['Devi', '41'],
      ['Emma', '64'],
    ]), altText: 'A spreadsheet with a column of five pupil names and a column of the mark each of them scored.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'Write the function that finds the <b>highest</b> mark in the range B2:B6.',
      response: { kind: 'expression', answer: '=MAX(B2:B6)' },
      hint: 'Its name is the first three letters of the word maximum.',
      explanation: '=MAX(B2:B6) returns the largest value in the range, which is 88.' },
    { label: 'b', marks: 1, prompt: 'Write the function that finds the <b>average</b> mark of the five pupils.',
      response: { kind: 'expression', answer: '=AVERAGE(B2:B6)', accept: ['=MEAN(B2:B6)'] },
      hint: 'It adds the values and divides by how many there are.',
      explanation: '=AVERAGE(B2:B6) gives (72 + 55 + 88 + 41 + 64) &divide; 5 = 64.' },
    { label: 'c', marks: 1, prompt: 'What value is returned by <b>=MIN(B2:B6)</b>?',
      response: { kind: 'number', answer: '41' },
      hint: 'Look for the smallest mark in the column.',
      explanation: 'MIN returns the smallest value in the range, which is Devi&rsquo;s 41.' },
    { label: 'd', marks: 1, prompt: 'What value is returned by <b>=COUNT(B2:B6)</b>?',
      response: { kind: 'number', answer: '5' },
      hint: 'COUNT counts how many cells hold a number.',
      explanation: 'Five cells in B2:B6 hold a number, so COUNT returns 5. It counts the marks, it does not add them.' },
    { label: 'e', marks: 1, prompt: 'What value is returned by <b>=COUNTIF(B2:B6,"&gt;60")</b>?',
      response: { kind: 'number', answer: '3' },
      hint: 'Count only the marks above sixty.',
      explanation: 'The marks above 60 are 72, 88 and 64, so COUNTIF returns 3.' },
    { label: 'f', marks: 1, prompt: 'Every function typed into a cell must begin with:',
      response: pick(['an equals sign', 'a full stop', 'a comma', 'a colon'], 'an equals sign'),
      hint: 'Without it the entry is stored as ordinary text.',
      explanation: 'A function begins with an equals sign; without it the spreadsheet stores what was typed as text.' },
    { label: 'g', marks: 1, prompt: 'The part written inside the brackets of a function is called the:',
      response: pick(['argument', 'heading', 'label', 'border'], 'argument'),
      hint: 'It is what the function is given to work on.',
      explanation: 'The value or range inside the brackets is the argument - what the function is asked to work on.' },
  ],
});

T.push({
  id: 'g9ict-ss-203', chapterId: 'g9ict-spreadsheets', subsection: 'charts_from_data',
  difficulty: 2,
  intro: 'The chart below was drawn from a spreadsheet holding the number of pupils in four classes.',
  stimulus: { html: BAR_CHART, altText: ALT_BAR_CHART },
  parts: [
    { label: 'a', marks: 1,
      prompt: 'Which type of chart is best for comparing the number of pupils in each of four separate classes?',
      response: pick(['Bar chart', 'Pie chart', 'Line graph', 'Scatter graph'], 'Bar chart'),
      hint: 'Which one puts the groups side by side so their heights can be compared?',
      explanation: 'A bar chart sets the groups side by side, so their sizes can be compared at a glance.' },
    { label: 'b', marks: 1,
      prompt: 'Which type of chart best shows how one class is divided into boys and girls as parts of a whole?',
      response: pick(['Pie chart', 'Bar chart', 'Line graph', 'Column chart'], 'Pie chart'),
      hint: 'Which chart is drawn as slices of one circle?',
      explanation: 'A pie chart shows each part as a slice of one whole, which is exactly what is wanted here.' },
    { label: 'c', marks: 2,
      prompt: 'Read the chart above.<br>(i) Write the name of the class with the most pupils.<br>'
        + '(ii) Write the number of pupils in class 9D.',
      response: gaps([['9C'], ['18']]),
      hint: 'Compare the heights of the bars against the scale on the left.',
      explanation: 'The tallest bar is 9C, and the bar for 9D reaches 18 on the scale.' },
    { label: 'd', marks: 1,
      prompt: 'The key that says which colour stands for which set of data on a chart is called the:',
      response: pick(['legend', 'gridline', 'axis', 'marker'], 'legend'),
      hint: 'It is usually printed beside or below the chart.',
      explanation: 'The legend, or key, tells the reader which colour or pattern belongs to which set of data.' },
  ],
});

T.push({
  id: 'g9ict-ss-204', chapterId: 'g9ict-spreadsheets', subsection: 'filter_sort',
  difficulty: 2,
  intro: 'The spreadsheet below holds the class and the test mark of four pupils.',
  stimulus: { html: sheet(['A', 'B', 'C'], [
      ['Name', 'Class', 'Mark'],
      ['Anil', '9A', '72'],
      ['Bibi', '9B', '55'],
      ['Chan', '9A', '88'],
      ['Devi', '9B', '41'],
    ]), altText: 'A spreadsheet with a name, a class and a mark on each of four rows below a heading row.' },
  parts: [
    { label: 'a', marks: 1,
      prompt: 'The rows of data are sorted on column C from largest to smallest. Write the name that will then be on row 2.',
      response: gaps([['Chan']]),
      hint: 'Row 2 is the first row of data, so it holds the largest mark.',
      explanation: 'Sorting the marks from largest to smallest puts 88 first, and that is Chan.' },
    { label: 'b', marks: 1,
      prompt: 'A filter is set to show only the pupils in class 9A. How many rows of data will be shown?',
      response: { kind: 'number', answer: '2', unit: 'rows' },
      hint: 'Count the rows whose class is 9A.',
      explanation: 'Anil and Chan are in 9A, so two rows of data remain on screen.' },
    { label: 'c', marks: 1, prompt: 'Filtering a list of data:',
      response: pick(['hides the rows that do not match', 'deletes the rows that do not match',
                      'sorts the rows into alphabetical order', 'adds up the numbers in one column'],
                     'hides the rows that do not match'),
      hint: 'Nothing is lost when a filter is switched off again.',
      explanation: 'A filter only hides the rows that do not match; switching it off brings them all back.' },
    { label: 'd', marks: 1, prompt: 'Sorting a column of names from A to Z is called:',
      response: pick(['ascending order', 'descending order', 'random order', 'reverse order'], 'ascending order'),
      hint: 'The values get larger as you go down.',
      explanation: 'Ascending order runs from the smallest to the largest, which for text means from A to Z.' },
  ],
});

// ── Q8/Q9 slot: networks ──────────────────────────────────────────────────

T.push({
  id: 'g9ict-net-203', chapterId: 'g9ict-networks', subsection: 'topologies',
  difficulty: 3,
  intro: 'The diagram below shows two ways of connecting four computers.',
  stimulus: { html: TOPOLOGIES, altText: ALT_TOPOLOGIES },
  parts: [
    { label: 'a', marks: 2, prompt: 'Name the topology marked <b>P</b> and the topology marked <b>Q</b>.',
      response: gaps([['star', 'star topology'], ['bus', 'bus topology', 'linear bus']]),
      hint: 'One is named after a shape in the sky and one after a single shared line.',
      explanation: 'P is a star topology, because every computer runs its own cable to one central point. Q is a bus topology, because all the computers share one main cable.' },
    { label: 'b', marks: 1, prompt: 'In topology <b>P</b>, every computer is connected to a central:',
      response: pick(['switch', 'printer', 'monitor', 'keyboard'], 'switch'),
      hint: 'It is the box drawn in the middle of the star.',
      explanation: 'A star topology joins every computer to a central switch (or hub), which passes the data on to the right machine.' },
    { label: 'c', marks: 1, prompt: 'In topology <b>Q</b>, a break in the main cable will:',
      response: pick(['stop the whole network working', 'affect only one computer on it',
                      'make the network run much faster', 'have no effect on the network'],
                     'stop the whole network working'),
      hint: 'Every computer shares that one cable.',
      explanation: 'All the traffic in a bus network travels along the one main cable, so a break in it cuts the whole network.' },
    { label: 'd', marks: 1, prompt: 'Name the device that joins a school network to the Internet.',
      response: gaps([['router', 'modem', 'modem/router', 'gateway']]),
      hint: 'It directs traffic between two different networks.',
      explanation: 'A router joins one network to another and directs the traffic between them, so it is what connects a school network to the Internet.' },
    { label: 'e', marks: 1, prompt: 'A network covering the computers in a single building is a:',
      response: pick(['LAN', 'WAN', 'MAN', 'PAN'], 'LAN'),
      hint: 'Local means nearby.',
      explanation: 'A Local Area Network covers one building or one site; a WAN spans towns or countries.' },
    { label: 'f', marks: 2, prompt: 'Give <b>two</b> advantages of connecting the computers in a school in a network.',
      response: { kind: 'written' },
      rubric: '1 mark each, to a maximum of 2: hardware such as a printer can be shared; files can be '
        + 'shared between users; software can be installed and updated from one place; users can send '
        + 'messages to each other; access to data can be controlled centrally; work can be backed up centrally.' },
  ],
});

// ── Q9/Q10 slot: an online service ────────────────────────────────────────

T.push({
  id: 'g9ict-int-202', chapterId: 'g9ict-internet', subsection: 'e_services',
  difficulty: 4,
  intro: 'Mrs Appadu pays her electricity bill using Internet banking on her mobile phone.',
  stimulus: { html: panel('Secure banking', [
      ['Address', 'https://bank.mu/pay'],
      ['Signed in as', 'appadu.s'],
      ['Step 1', 'Choose the account'],
      ['Step 2', 'Enter the amount'],
      ['Step 3', 'Enter the code sent to your phone'],
    ]), altText: 'A banking screen showing the web address, the name the user is signed in with and the '
      + 'three steps of making a payment.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'Which one of these does Mrs Appadu need in order to use Internet banking?',
      response: pick(['An Internet connection', 'A printer at her home',
                      'A scanner at her home', 'A projector at her home'],
                     'An Internet connection'),
      hint: 'The clue is in the name of the service.',
      explanation: 'Internet banking needs a device and a connection to the Internet; none of the other three is required.' },
    { label: 'b', marks: 2,
      prompt: 'Before she can sign in, the bank asks for two things.<br>'
        + '(i) Name the one she types to say who she is.<br>'
        + '(ii) Name the secret one she types to prove that it really is her.',
      response: gaps([['username', 'user name', 'user id', 'login name'], ['password', 'pass word']]),
      hint: 'One identifies her and the other proves it.',
      explanation: 'The username says who she claims to be and the password proves it. Only the password is secret.' },
    { label: 'c', marks: 1,
      prompt: 'The padlock symbol and the letters <b>https</b> in the address bar show that the connection is:',
      response: pick(['encrypted', 'printed', 'deleted', 'compressed'], 'encrypted'),
      hint: 'The extra letter s stands for secure.',
      explanation: 'https means the data travelling between the phone and the bank is encrypted, so it cannot be read if it is intercepted.' },
    { label: 'd', marks: 1,
      prompt: 'A one-time code is sent to her phone before the payment is accepted. This adds:',
      response: pick(['a second step of verification', 'a discount on the amount paid',
                      'more storage space on the phone', 'a faster connection to the bank'],
                     'a second step of verification'),
      hint: 'Someone who stole only the password still could not pay.',
      explanation: 'The code is a second factor: a thief who knew the password would still need the phone as well.' },
    { label: 'e', marks: 1,
      prompt: 'She pays three bills of Rs 450, Rs 620 and Rs 930. What total amount leaves her account?',
      response: { kind: 'number', answer: '2000', prefix: 'Rs' },
      hint: 'Add the three amounts together.',
      explanation: '450 + 620 + 930 = Rs 2 000.' },
    { label: 'f', marks: 2, prompt: 'Give <b>one</b> advantage and <b>one</b> drawback of paying bills over the Internet.',
      response: { kind: 'written' },
      rubric: '1 mark for an advantage (no travelling or queueing; available at any hour; a record of the '
        + 'payment is kept automatically; saves time) and 1 mark for a drawback (needs an Internet '
        + 'connection and a device; risk of fraud or phishing; no paper receipt unless one is printed; '
        + 'a mistyped amount is hard to recover).' },
  ],
});

T.push({
  id: 'g9ict-int-203', chapterId: 'g9ict-internet', subsection: 'email',
  difficulty: 3,
  intro: 'The heading of an email message is shown below.',
  stimulus: { html: panel('New message', [
      ['To', 'class9a@school.mu'],
      ['Cc', 'head@school.mu'],
      ['Bcc', 'office@school.mu'],
      ['Subject', 'Outing on Friday'],
      ['Attached', 'permission.pdf (28 KB)'],
    ]), altText: 'An email heading showing the To, Cc, Bcc and Subject lines and the name of one attached file.' },
  parts: [
    { label: 'a', marks: 1,
      prompt: 'Write the address of the person who receives a copy that the other recipients cannot see.',
      response: gaps([['office@school.mu']]),
      hint: 'The b in Bcc stands for blind.',
      explanation: 'Bcc stands for blind carbon copy: office@school.mu receives the message but the other recipients are not told.' },
    { label: 'b', marks: 1, prompt: 'What do the letters <b>Cc</b> stand for?',
      response: pick(['Carbon copy', 'Closed copy', 'Central copy', 'Correct copy'], 'Carbon copy'),
      hint: 'It comes from the paper once used to make a second copy while typing.',
      explanation: 'Cc means carbon copy - a copy sent to someone else, and every recipient can see who it went to.' },
    { label: 'c', marks: 1, prompt: 'Write the name of the file that has been attached to this message.',
      response: gaps([['permission.pdf', 'permission']]),
      hint: 'It is on the last row of the heading.',
      explanation: 'The attached file is permission.pdf, and its size is 28 KB.' },
    { label: 'd', marks: 1, prompt: 'The line that tells the reader what the message is about is called the:',
      response: pick(['Subject line', 'Address bar', 'Signature block', 'Status bar'], 'Subject line'),
      hint: 'It is what is shown in a list of messages.',
      explanation: 'The subject line summarises the message and is what a reader sees in a list of new mail.' },
    { label: 'e', marks: 1, prompt: 'One advantage of email over a posted letter is that email:',
      response: pick(['arrives almost at once', 'always needs a stamp',
                      'works without electricity', 'cannot carry any file'],
                     'arrives almost at once'),
      hint: 'Think about how long each one takes.',
      explanation: 'An email reaches the other side of the world in seconds, while a posted letter takes days.' },
    { label: 'f', marks: 1,
      prompt: 'A message from an unknown sender asks for your password. It should be:',
      response: pick(['deleted without replying to it', 'answered as quickly as possible',
                      'forwarded to the whole class', 'printed out and kept safely'],
                     'deleted without replying to it'),
      hint: 'No genuine organisation asks for a password by email.',
      explanation: 'This is phishing. The message should be deleted and never answered, and the password must not be given to anyone.' },
  ],
});

// ── Q9/Q10 slot: databases ────────────────────────────────────────────────

T.push({
  id: 'g9ict-db-201', chapterId: 'g9ict-databases', subsection: 'queries',
  difficulty: 3,
  intro: 'The table PUPILS below is stored in a database. The query grid under it has already been filled in.',
  stimulus: { html: '<table style="border-collapse:collapse;margin:6px auto;font-size:12px">'
      + [['PupilID', 'Name', 'Class', 'Mark'], ['101', 'Anil', '9A', '72'], ['102', 'Bibi', '9B', '55'],
         ['103', 'Chan', '9A', '88'], ['104', 'Devi', '9B', '41'], ['105', 'Emma', '9A', '64']]
        .map(function (r, i) {
          return '<tr>' + r.map(function (v) {
            return '<td style="border:1px solid #000;padding:3px 11px;text-align:center;'
              + (i ? '' : 'background:#e5e5e5;font-weight:bold') + '">' + v + '</td>';
          }).join('') + '</tr>';
        }).join('')
      + '</table>'
      + qbe(['Field:', 'Table:', 'Sort:', 'Show:', 'Criteria:'],
            [['Name', 'PUPILS', '', '&#10003;', ''],
             ['Class', 'PUPILS', '', '&#10003;', '"9A"'],
             ['Mark', 'PUPILS', '', '&#10003;', '&gt; 70']]),
    altText: 'A database table of five rows with the headings PupilID, Name, Class and Mark, and below it '
      + 'a query grid with rows labelled Field, Table, Sort, Show and Criteria.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'How many <b>records</b> are there in the table PUPILS?',
      response: { kind: 'number', answer: '5', unit: 'records' },
      hint: 'A record is one row of data, not the heading row.',
      explanation: 'There are five rows of data below the headings, so the table holds five records.' },
    { label: 'b', marks: 1, prompt: 'How many <b>fields</b> does each record have?',
      response: { kind: 'number', answer: '4', unit: 'fields' },
      hint: 'A field is one column.',
      explanation: 'PupilID, Name, Class and Mark are four columns, so each record has four fields.' },
    { label: 'c', marks: 1, prompt: 'Name the field that is most suitable as the primary key.',
      response: gaps([['PupilID', 'Pupil ID', 'Pupil-ID']]),
      hint: 'A primary key must be different for every record.',
      explanation: 'PupilID is different for every pupil, so it identifies a record on its own. Two pupils could share a name, a class or a mark.' },
    { label: 'd', marks: 2,
      prompt: 'Write the names of the pupils that the query in the grid will display. '
        + 'Give them in the order they appear in the table.',
      response: gaps([['Anil'], ['Chan']]),
      hint: 'A record must match BOTH criteria to be displayed.',
      explanation: 'The query asks for class 9A and a mark above 70. Anil (9A, 72) and Chan (9A, 88) match; Emma is in 9A but scored 64.' },
    { label: 'e', marks: 2,
      prompt: 'Complete the empty query grid below so that it displays the names of the pupils in class <b>9B</b>. '
        + 'Write the missing field name and the missing criteria in the two empty boxes.'
        + qbe(['Field:', 'Table:', 'Sort:', 'Show:', 'Criteria:'],
              [['Name', 'PUPILS', '', '&#10003;', ''], ['', 'PUPILS', '', '&#10003;', '']]),
      response: { kind: 'cells', answer: [['Class'], ['9B', '"9B"']] },
      hint: 'The second column has to be the field the condition is tested on.',
      explanation: 'The second column must use the Class field with the criteria "9B", so that only the records of class 9B are displayed.' },
    { label: 'f', marks: 1, prompt: 'A query is used to:',
      response: pick(['find the records that match a condition', 'print out the labels for a mailing',
                      'design the layout used by a form', 'make a backup of the whole database'],
                     'find the records that match a condition'),
      hint: 'It answers a question about the data.',
      explanation: 'A query searches the table and displays only the records that match the criteria it was given.' },
  ],
});

T.push({
  id: 'g9ict-db-202', chapterId: 'g9ict-databases', subsection: 'db_structure',
  difficulty: 2,
  intro: 'A club keeps a database of its members. Part of one table is shown below.',
  stimulus: { html: sheet(['MemberID', 'Surname', 'DateJoined', 'Brothers'], [
      ['MemberID', 'Surname', 'DateJoined', 'Brothers'],
      ['M01', 'Beeharry', '04/03/2024', '2'],
    ]), altText: 'A database table showing four column headings and one row of data beneath them.' },
  parts: [
    { label: 'a', marks: 1, prompt: 'What name is given to one <b>row</b> of a database table?',
      response: gaps([['record', 'a record']]),
      hint: 'It holds everything known about one member.',
      explanation: 'One row is a record - all the data held about a single member.' },
    { label: 'b', marks: 1, prompt: 'What name is given to one <b>column</b> of a database table?',
      response: gaps([['field', 'a field']]),
      hint: 'It holds one piece of information for every member.',
      explanation: 'One column is a field - the same piece of information, held for every record.' },
    { label: 'c', marks: 3,
      prompt: 'Write the most suitable data type for each field. Choose from <b>text</b>, <b>date</b> and <b>number</b>.<br>'
        + '(i) Surname &nbsp;&nbsp; (ii) DateJoined &nbsp;&nbsp; (iii) Brothers',
      response: gaps([['text', 'short text', 'alphanumeric'], ['date', 'date/time'], ['number', 'numeric', 'integer']]),
      hint: 'Ask what would be typed into each one.',
      explanation: 'A surname is text, a joining date is a date, and a count of brothers is a number - a number so that it can be added or averaged later.' },
    { label: 'd', marks: 1, prompt: 'A primary key is a field that:',
      response: pick(['is different for every record', 'is the same for every record',
                      'holds the longest piece of text', 'is always left completely empty'],
                     'is different for every record'),
      hint: 'It has to identify one record on its own.',
      explanation: 'A primary key holds a different value in every record, so it identifies exactly one record.' },
  ],
});

// ── Q11 slot: algorithms, always last in every measured year ──────────────

T.push({
  id: 'g9ict-alg-202', chapterId: 'g9ict-algorithms', subsection: 'flowchart_reading',
  difficulty: 3,
  intro: 'The flowchart below adds up a run of whole numbers.',
  stimulus: { html: FLOW_SUM, altText: ALT_FLOW_SUM },
  parts: [
    { label: 'a', marks: 1, prompt: 'Name the flowchart symbol drawn as a diamond.',
      response: gaps([['decision', 'decision box', 'decision symbol']]),
      hint: 'It is the only shape with two ways out.',
      explanation: 'A diamond is the decision symbol; the test inside it decides which of the two exits is taken.' },
    { label: 'b', marks: 1, prompt: 'Name the flowchart symbol drawn as a parallelogram.',
      response: gaps([['input/output', 'input or output', 'input output', 'input', 'output', 'data']]),
      hint: 'Look at the two shapes of that kind on the chart and read what is written in them.',
      explanation: 'A parallelogram is the input/output symbol, used here both for INPUT N and for OUTPUT T.' },
    { label: 'c', marks: 3,
      prompt: 'The flowchart is run with <b>N = 3</b>. Complete the table by writing the value of <b>T</b> '
        + 'at the end of each pass through the loop.'
        + '<table style="border-collapse:collapse;margin:6px auto;font-size:12px">'
        + '<tr><td style="border:1px solid #000;padding:3px 14px;background:#e5e5e5;font-weight:bold">Pass</td>'
        + '<td style="border:1px solid #000;padding:3px 20px">1</td>'
        + '<td style="border:1px solid #000;padding:3px 20px">2</td>'
        + '<td style="border:1px solid #000;padding:3px 20px">3</td></tr>'
        + '<tr><td style="border:1px solid #000;padding:3px 14px;background:#e5e5e5;font-weight:bold">T</td>'
        + '<td style="border:1px solid #000;padding:12px 20px"></td>'
        + '<td style="border:1px solid #000;padding:12px 20px"></td>'
        + '<td style="border:1px solid #000;padding:12px 20px"></td></tr></table>',
      response: { kind: 'cells', answer: [['1'], ['3'], ['6']] },
      hint: 'T starts at 0 and C starts at 1. Add C to T, then add 1 to C.',
      explanation: 'Pass 1 adds 1, giving T = 1. Pass 2 adds 2, giving T = 3. Pass 3 adds 3, giving T = 6. The loop then stops because C is greater than N.' },
    { label: 'd', marks: 1, prompt: 'What value is output when <b>N = 4</b>?',
      response: { kind: 'number', answer: '10' },
      hint: 'Add every whole number from 1 up to N.',
      explanation: '1 + 2 + 3 + 4 = 10, so 10 is output.' },
    { label: 'e', marks: 1, prompt: 'The part of the flowchart that is carried out over and over is called a:',
      response: pick(['loop', 'branch', 'terminator', 'connector'], 'loop'),
      hint: 'The arrow goes back up to a step already carried out.',
      explanation: 'A set of steps that is repeated is a loop; here it repeats until C becomes greater than N.' },
    { label: 'f', marks: 2, prompt: 'Describe in words what this flowchart does.',
      response: { kind: 'written' },
      rubric: '2 marks: it adds up all the whole numbers from 1 up to the number that was input, and '
        + 'outputs the total. 1 mark only for "it adds numbers together" without saying which numbers, '
        + 'or for describing the loop without naming what is output.' },
  ],
});

T.push({
  id: 'g9ict-alg-203', chapterId: 'g9ict-algorithms', subsection: 'flowchart_symbols',
  difficulty: 3,
  intro: 'The flowchart below reads two numbers and outputs the larger of them. Four of its shapes have '
    + 'been left empty and numbered 1 to 4.',
  stimulus: { html: FLOW_BLANK, altText: ALT_FLOW_BLANK },
  parts: [
    { label: 'a', marks: 4,
      prompt: 'Write the letter of the statement that belongs in each numbered shape. '
        + '<b>There is one extra statement in the list.</b><br>'
        + 'A &nbsp; OUTPUT B<br>B &nbsp; INPUT A, B<br>C &nbsp; Is A &gt; B ?<br>D &nbsp; OUTPUT A<br>E &nbsp; T = 0',
      response: gaps([['B'], ['C'], ['D'], ['A']]),
      hint: 'Shape 2 is the diamond, so it must hold something that can be answered Yes or No.',
      explanation: 'Shape 1 reads the two numbers (B), shape 2 holds the test (C), the Yes branch outputs A (D) and the No branch outputs B (A). Statement E is the extra one.' },
    { label: 'b', marks: 1, prompt: 'Name the symbol used for START and for STOP.',
      response: gaps([['terminator', 'terminal', 'terminator symbol', 'terminal symbol', 'oval']]),
      hint: 'It marks each end of the flowchart.',
      explanation: 'The rounded shape at each end is the terminator, used only for START and STOP.' },
    { label: 'c', marks: 1, prompt: 'How many exits does a decision symbol have?',
      response: pick(['Two', 'One', 'Three', 'None'], 'Two'),
      hint: 'Count the branches leaving the diamond in the flowchart.',
      explanation: 'A decision has exactly two exits, one for Yes and one for No.' },
    { label: 'd', marks: 1, prompt: 'What do the arrows on a flowchart show?',
      response: pick(['the order the steps are carried out', 'the name given to each variable used',
                      'the type of data stored in each box', 'the number of times to repeat a step'],
                     'the order the steps are carried out'),
      hint: 'Follow one from the start and see where it takes you.',
      explanation: 'The arrows show the flow of control - which step is carried out after which.' },
  ],
});

T.push({
  id: 'g9ict-alg-204', chapterId: 'g9ict-algorithms', subsection: 'python_basics',
  difficulty: 3,
  intro: 'The short Python program below is run.'
    + '<div style="border:1px solid #000;max-width:280px;margin:6px auto;padding:8px;text-align:left;'
    + 'font-family:monospace;font-size:12px;white-space:pre">total = 0\nfor n in range(1, 5):\n'
    + '    total = total + n\nprint(total)</div>',
  parts: [
    { label: 'a', marks: 1, prompt: 'What is printed when the program is run?',
      response: { kind: 'number', answer: '10' },
      hint: 'Work out which numbers the loop adds, then add them.',
      explanation: 'range(1, 5) gives 1, 2, 3 and 4, and 1 + 2 + 3 + 4 = 10, so 10 is printed.' },
    { label: 'b', marks: 1, prompt: 'Write the Python keyword that begins the loop in this program.',
      response: gaps([['for']]),
      hint: 'It is the first word on the second line.',
      explanation: 'The keyword for begins a loop that repeats once for each value in a range.' },
    { label: 'c', marks: 1, prompt: 'Write the name of the variable that holds the running total.',
      response: gaps([['total']]),
      hint: 'It is the name given a value on the first line.',
      explanation: 'The variable total starts at 0 and has each number added to it in turn.' },
    { label: 'd', marks: 1,
      prompt: 'Complete the missing word so that the line displays HELLO on the screen: '
        + '<span style="font-family:monospace">&hellip;&hellip;&hellip;("HELLO")</span>',
      response: gaps([['print']]),
      hint: 'The same word is used on the last line of the program above.',
      explanation: 'print("HELLO") displays the word HELLO on the screen.' },
    { label: 'e', marks: 1, prompt: 'In Python, the symbol <b>=</b> is used to:',
      response: pick(['give a value to a variable', 'test whether two values match',
                      'mark the end of the program', 'print one line onto the screen'],
                     'give a value to a variable'),
      hint: 'A double equals sign is used for the other job.',
      explanation: 'A single = stores a value in a variable; == is what tests whether two values are equal.' },
    { label: 'f', marks: 1, prompt: 'The call <b>range(1, 5)</b> produces the numbers:',
      response: pick(['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '5, 4, 3, 2, 1'], '1, 2, 3, 4'),
      hint: 'The second number says where to stop, and is not itself included.',
      explanation: 'range(1, 5) starts at 1 and stops before 5, so it gives 1, 2, 3 and 4.' },
  ],
});

T.forEach(function (spec) { STATIC_QUESTIONS.push(makeTask(spec)); });

})();
