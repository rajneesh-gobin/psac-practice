'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT — LEVEL 4 (applied) items, part 4 of 4: algorithms,
//  flowcharts, Python and modelling.
//  IDs: g9ict-l4-301 … g9ict-l4-310.
//
//  ⚠ Read the header of l4_applied_systems.js first for what was measured.
//
//  ⚠ Python is examined by name in the 2023, 2024 and 2025 NCE papers and is
//    named zero times in the syllabus — see the manifest header. It is in
//    scope because the exam asks it.
//
//  ⚠ INSIDE AN SVG, ITALIC IS <tspan font-style="italic">. <i>, <b> and
//    <span> exit foreign content and would close the figure.
//  ⚠ The alt text names the SHAPES in the figure, never the values the
//    question asks the candidate to read off it.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// A fixed light plate with dark ink: the practice screen forces a pale ink
// colour, so a figure that inherits its colour is invisible there.
function code(lines) {
  return '<div style="border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#1e293b;'
    + 'text-shadow:none;padding:8px 12px;margin:0.6rem 0;font-family:ui-monospace,Menlo,Consolas,monospace;'
    + 'font-size:13px;white-space:pre;text-align:left;overflow-x:auto">' + lines.join('\n') + '</div>';
}

const SW = 'stroke="#1e293b" stroke-width="1.4" fill="none"';
function tx(x, y, s) {
  return '<text x="' + x + '" y="' + y + '" font-size="11" text-anchor="middle" fill="#1e293b"'
    + ' font-family="system-ui,-apple-system,sans-serif">' + s + '</text>';
}
function box(x, y, w, h, label, rx) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" '
    + SW + ' fill="#f8fafc"/>' + tx(x + w / 2, y + h / 2 + 4, label);
}
function vA(x, y1, y2) {
  return '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + (y2 - 7) + '" ' + SW + '/>'
    + '<polygon points="' + x + ',' + y2 + ' ' + (x - 4.5) + ',' + (y2 - 8) + ' ' + (x + 4.5) + ',' + (y2 - 8) + '" fill="#1e293b"/>';
}

// The counting loop used by g9ict-l4-304: it never changes the counter, so the
// decision can never become false. The label says what shapes are present, not
// what is wrong with them.
const LOOP = '<div class="q-scroll" style="text-align:center">'
  + '<svg viewBox="0 0 300 300" width="270" role="img"'
  + ' aria-label="A flowchart with a start box, a decision diamond and a process box joined in a loop">'
  + '<rect x="0" y="0" width="300" height="300" rx="10" fill="#ffffff"/>'
  + box(105, 6, 80, 24, 'Start', 12)
  + vA(145, 30, 52)
  + box(100, 52, 90, 26, 'C = 1')
  + vA(145, 78, 100)
  + '<polygon points="145,100 207,130 145,160 83,130" ' + SW + ' fill="#f8fafc"/>'
  + tx(145, 134, 'C &#8804; 10 ?')
  + tx(161, 176, 'Yes') + vA(145, 160, 184)
  + box(100, 184, 90, 26, 'PRINT C')
  + '<line x1="100" y1="197" x2="40" y2="197" ' + SW + '/>'
  + '<line x1="40" y1="197" x2="40" y2="130" ' + SW + '/>'
  + '<line x1="40" y1="130" x2="76" y2="130" ' + SW + '/>'
  + '<polygon points="83,130 75,125.5 75,134.5" fill="#1e293b"/>'
  + tx(232, 126, 'No') + '<line x1="207" y1="130" x2="245" y2="130" ' + SW + '/>'
  + '<line x1="245" y1="130" x2="245" y2="245" ' + SW + '/>'
  + '<line x1="245" y1="245" x2="152" y2="245" ' + SW + '/>'
  + '<polygon points="145,245 153,240.5 153,249.5" fill="#1e293b"/>'
  + box(65, 233, 80, 24, 'Stop', 12)
  + '</svg></div>';

// ── FLOWCHART SYMBOLS — g9ict-l4-301 … 303 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-301', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:4,
  question:'A pupil draws the step <b>IS THE MARK 50 OR MORE?</b> inside a rectangle with two arrows leaving it, one labelled Yes and one labelled No. What is wrong, and how is it corrected?',
  options:['A step with two exits is a decision and must be drawn as a diamond',
           'A step with two exits is a process and the arrows must be removed',
           'A step with two exits needs two rectangles, one for each of them',
           'A step with two exits is an output and must be a parallelogram'],
  answer:'A step with two exits is a decision and must be drawn as a diamond',
  hint:'Look at the number of arrows leaving the shape. Which symbol is the only one allowed to do that?',
  explanation:'The shape of a flowchart symbol states what kind of step it is, and only a decision has more than one exit, so a question with Yes and No branches belongs in a diamond. Splitting it into two rectangles or deleting the arrows would lose the branch the algorithm needs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-302', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:4,
  question:'In a flowchart, the step <b>DISPLAY THE TOTAL</b> has been drawn in a rectangle. Which symbol should have been used, and why does the distinction matter?',
  options:['A parallelogram, because showing a value to the user is output',
           'A diamond, because the total must be tested before it is shown',
           'An oval, because displaying the total ends the whole algorithm',
           'A rectangle is correct, because displaying a total is a process'],
  answer:'A parallelogram, because showing a value to the user is output',
  hint:'Decide first what the step DOES: does it calculate something, or does it communicate with the user?',
  explanation:'A rectangle is for a process that changes a value, while input from and output to the user is a parallelogram, and keeping them apart is what lets a reader see where the algorithm meets the outside world. Displaying a value neither tests nor terminates anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-303', chapterId:'g9ict-algorithms', subsection:'flowchart_symbols', difficulty:4,
  question:'A flowchart begins with a parallelogram reading <b>READ THE PRICE</b> and has no oval anywhere. What has the pupil left out, and why is it required?',
  options:['The terminator, because a reader must see where it starts and ends',
           'The connector, because the chart runs over more than a single page',
           'The decision, because every flowchart has to contain a test in it',
           'The process, because a price that is read must then be calculated'],
  answer:'The terminator, because a reader must see where it starts and ends',
  hint:'An oval has one job in a flowchart. What is missing if there is none?',
  explanation:'Start and Stop terminators mark the boundaries of the algorithm, without which a reader cannot tell where it begins or whether it finishes. Connectors are needed only across pages, and not every algorithm contains a decision or a calculation.' }));

// ── DRAWING FLOWCHARTS — g9ict-l4-304 … 306 ───────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-304', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:4,
  question:'This flowchart is meant to print the numbers 1 to 10 and then stop. Run it in your head and say what actually happens.' + LOOP,
  options:['It prints 1 for ever, because nothing ever changes the value of C',
           'It prints 1 to 10 correctly and then stops at the terminator below',
           'It prints nothing at all, because the decision is false at the start',
           'It prints 10 once, because C is compared with 10 in the diamond'],
  answer:'It prints 1 for ever, because nothing ever changes the value of C',
  hint:'Follow C around the loop. Write its value down each time you pass the diamond.',
  explanation:'C is set to 1 and the loop prints it and returns to the test without ever increasing it, so the condition stays true and the loop never ends. A counting loop needs three parts, and the missing one here is the step that moves the counter on.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-305', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:4,
  question:'An algorithm to find the average of five marks is drawn as: read one mark, divide by five, display the answer, then stop. What is wrong with the order of the steps?',
  options:['Only one mark is read, and the division happens before the total',
           'The division should come after the answer has been displayed',
           'The marks should be displayed before they are read from the user',
           'The algorithm should stop before it displays anything at all'],
  answer:'Only one mark is read, and the division happens before the total',
  hint:'Count the inputs the task requires, then ask what has to exist before a division can be meaningful.',
  explanation:'An average needs all five marks read and added before anything is divided, so the chart is missing both the repetition and the running total. The other orderings would destroy the algorithm rather than repair it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-306', chapterId:'g9ict-algorithms', subsection:'drawing_flowcharts', difficulty:4,
  question:'A pupil is drawing an algorithm that must ask again whenever a password is wrong, but must give up after three attempts. Which structure does the flowchart need?',
  options:['A loop with a counter, so the test can end after three tries',
           'A loop with no counter, so the user can try again every time',
           'A single decision, so a wrong password ends the program at once',
           'Two decisions in a row, so the password is checked twice over'],
  answer:'A loop with a counter, so the test can end after three tries',
  hint:'Two things must be true at the same time: it repeats, and it stops on its own.',
  explanation:'Repetition supplies the second and third attempts while a counter supplies the condition that ends them, and an algorithm with only one of the two either gives up immediately or never gives up. Checking twice over is not what a limit of three attempts means.' }));

// ── MATHEMATICAL MODELLING — g9ict-l4-307 … 309 ───────────────────────────

STATIC_QUESTIONS.push(makeNum({ id:'g9ict-l4-307', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:4,
  question:'A household electricity bill is modelled as a fixed charge of Rs 130 per month plus Rs 4.50 for each unit used. What is the bill, in rupees, for a month in which 120 units are used?',
  answer:670,
  hint:'The fixed part is paid whatever happens. Work out the part that depends on the units, then put the two together.',
  explanation:'The model is 130 + 4.50 x units, so 130 + 540 = Rs 670. Leaving out the fixed charge gives 540 and multiplying the whole of 130 by the units is the other common slip; a model with a constant and a rate always has both parts.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-308', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:4,
  question:'A spreadsheet models a shop profit. The cost price sits in one cell and every other figure is calculated from it by formula. The owner asks what happens if costs rise by 10%. What does she do?',
  options:['Change the one cost cell, and let every formula recalculate at once',
           'Retype each of the calculated figures with 10% added to each one',
           'Build a second spreadsheet with the higher cost typed throughout',
           'Add 10% to the profit figure at the bottom of the whole worksheet'],
  answer:'Change the one cost cell, and let every formula recalculate at once',
  hint:'The point of building the model out of formulas was to make this question cheap to answer.',
  explanation:'A model built on formulas answers a what-if question by changing one input, which is the whole reason for referring to cells rather than typing values. Retyping results or building a second sheet abandons the model and invites inconsistency.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-309', chapterId:'g9ict-algorithms', subsection:'maths_modelling', difficulty:4,
  question:'A savings model holds the amount saved each month, the interest rate and the number of months. A pupil asks how long it takes to reach Rs 50,000. Which variable does she vary?',
  options:['The number of months, until the total reaches the figure she wants',
           'The interest rate, until the total reaches the figure she wants',
           'The amount saved each month, until the interest rate is high enough',
           'The target of Rs 50,000, until it matches the total she already has'],
  answer:'The number of months, until the total reaches the figure she wants',
  hint:'Read the question being asked. The quantity it asks for is the one to vary.',
  explanation:'The question asks how long, so the number of months is the unknown and the other inputs stay fixed while it is adjusted. Varying the rate or the target answers a different question, and lowering the target to match what she has answers none.' }));

// ── PYTHON — g9ict-l4-310 ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9ict-l4-310', chapterId:'g9ict-algorithms', subsection:'python_basics', difficulty:4,
  question:'A pupil writes this program to add five to a number the user types, and it fails with a type error.'
    + code(['n = input("Enter a number: ")', 'print(n + 5)'])
    + 'What is the cause, and what is the repair?',
  options:['input returns text, so n must be converted with int before adding',
           'print cannot show a number, so the result must be turned into text',
           'The prompt inside input is wrong, so it must be moved to its own line',
           'The variable name n is reserved, so another name has to be used here'],
  answer:'input returns text, so n must be converted with int before adding',
  hint:'Ask what kind of value input hands back, whatever the user typed into it.',
  explanation:'input always returns a string, so n + 5 asks Python to add a number to text, and int(input(...)) fixes it. The prompt is legitimate, print displays numbers happily, and n is an ordinary variable name.' }));

})();
