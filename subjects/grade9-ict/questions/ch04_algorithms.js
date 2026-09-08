'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Algorithms, Flowcharts & Programming   (examWeight 5)
//
//  ⚠ Q11 IS THE ALGORITHM SLOT AND IT IS ALWAYS LAST. Stable in all five
//    papers, and one of only three topics that are.
//
//  ⚠ THE FREE-HAND DRAWING DISAPPEARED AFTER 2021. Drawing a flowchart was
//    worth 9 marks in 2021; from 2022 the task became inserting NUMBERED
//    STATEMENTS into a printed flowchart, so the paper is fully answerable
//    without a drawing surface - and fully markable by this app.
//
//  ⚠ PYTHON IS EXAMINED BY NAME IN 2023, 2024 AND 2025 AND APPEARS NOWHERE IN
//    THE SYLLABUS. A full-text sweep of all 330 NCF pages returns zero hits for
//    "Python"; the syllabus names Scratch and Logo. It is in scope here because
//    the exam asks it - the same reason `g9m-number-revision` exists in Maths.
//    Recorded in blueprint-ict.md §7.
//
//  ⚠ Dry-run questions are single-value here rather than a filled table: the
//    paper's table form needs a `cells` response, which the ICT pack does not
//    use yet. Each step is asked as its own 1-mark item, which is how the
//    marks are awarded anyway.
//
//  Source: NCE ICT (N540) 2021-2025 Q11; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-algorithms';

const MCQ = [
  ['g9ict-alg-001', 'flowchart_symbols', 1,
   'Which flowchart symbol is drawn as an <b>oval</b>?',
   ['Start or Stop', 'Process', 'Decision', 'Input or Output'], 'Start or Stop',
   'It appears exactly twice in most flowcharts.',
   'The oval (terminator) marks where an algorithm begins and where it ends.'],

  ['g9ict-alg-002', 'flowchart_symbols', 1,
   'Which flowchart symbol is drawn as a <b>diamond</b>?',
   ['Decision', 'Process', 'Start', 'Connector'], 'Decision',
   'It is the only symbol with more than one way out.',
   'The diamond is a decision: it asks a question and has a Yes branch and a No branch.'],

  ['g9ict-alg-003', 'flowchart_symbols', 1,
   'Which flowchart symbol is drawn as a <b>rectangle</b>?',
   ['Process', 'Decision', 'Input', 'Terminator'], 'Process',
   'It is where a calculation or an assignment happens.',
   'The rectangle is a process step - a calculation, or storing a value.'],

  ['g9ict-alg-004', 'flowchart_symbols', 2,
   'Which flowchart symbol is drawn as a <b>parallelogram</b> (a slanted box)?',
   ['Input or Output', 'Process', 'Decision', 'Start'], 'Input or Output',
   'It is used when data comes in or a result is shown.',
   'The parallelogram is used for input and output - reading a value or displaying one.'],

  ['g9ict-alg-005', 'flowchart_symbols', 2,
   'How many arrows normally leave a <b>decision</b> symbol?',
   ['2', '1', '3', '0'], '2',
   'One for each answer to the question.',
   'A decision has two exits, usually labelled Yes and No.'],

  ['g9ict-alg-006', 'flowchart_reading', 2,
   'A flowchart reads: START, INPUT n, n = n + 3, OUTPUT n, STOP. If the input is 7, what is output?',
   ['10', '7', '3', '21'], '10',
   'Follow the single process box.',
   '7 + 3 = 10, so 10 is output.'],

  ['g9ict-alg-007', 'flowchart_reading', 2,
   'A flowchart reads: START, INPUT a, INPUT b, c = a * b, OUTPUT c, STOP. With a = 6 and b = 4, what is output?',
   ['24', '10', '2', '64'], '24',
   'The process box multiplies.',
   '6 * 4 = 24.'],

  ['g9ict-alg-008', 'flowchart_reading', 3,
   'A flowchart asks "Is m greater than 50?" With m = 50, which branch is taken?',
   ['The No branch', 'The Yes branch', 'Both branches', 'The flowchart stops'],
   'The No branch',
   '"Greater than" does not include equal to.',
   '50 is not GREATER than 50, so the condition is false and the No branch is taken.'],

  ['g9ict-alg-009', 'flowchart_reading', 3,
   'An algorithm reads: total = 0; for each of 4 numbers, total = total + number. The numbers are 3, 5, 2, 6. What is total at the end?',
   ['16', '14', '10', '4'], '16',
   'Add them one at a time, starting from zero.',
   '0 + 3 = 3, + 5 = 8, + 2 = 10, + 6 = 16.'],

  ['g9ict-alg-010', 'control_structures', 1,
   'Carrying out steps one after another, in order, is called:',
   ['Sequence', 'Selection', 'Repetition', 'Iteration'], 'Sequence',
   'The simplest of the three structures.',
   'Sequence is simply doing one step after another in the order written.'],

  ['g9ict-alg-011', 'control_structures', 1,
   'Choosing between two paths using a condition is called:',
   ['Selection', 'Sequence', 'Repetition', 'Assignment'], 'Selection',
   'It is what a decision diamond does.',
   'Selection chooses between alternatives depending on whether a condition is true.'],

  ['g9ict-alg-012', 'control_structures', 2,
   'Repeating a set of steps a number of times is called:',
   ['Repetition', 'Sequence', 'Selection', 'Declaration'], 'Repetition',
   'Also known as iteration or looping.',
   'Repetition (iteration) runs the same steps more than once.'],

  ['g9ict-alg-013', 'control_structures', 2,
   'Which keyword usually begins a <b>selection</b> statement?',
   ['IF', 'FOR', 'WHILE', 'PRINT'], 'IF',
   'It is followed by a condition.',
   'IF begins a selection; FOR and WHILE begin repetition.'],

  ['g9ict-alg-014', 'control_structures', 3,
   'A loop that repeats a <b>known</b> number of times is best written with:',
   ['FOR', 'IF', 'ELSE', 'INPUT'], 'FOR',
   'You already know how many repetitions are needed.',
   'A FOR loop is used when the number of repetitions is known in advance; WHILE is used when it is not.'],

  ['g9ict-alg-015', 'python_basics', 1,
   'Which Python statement displays a message on the screen?',
   ['print("Hello")', 'display("Hello")', 'output("Hello")', 'show("Hello")'],
   'print("Hello")',
   'Five letters, all lower case.',
   'print() is the Python statement that writes output to the screen.'],

  ['g9ict-alg-016', 'python_basics', 2,
   'What does this Python code display?<br><code>x = 4<br>y = 3<br>print(x * y)</code>',
   ['12', '7', '43', 'x * y'], '12',
   'The value, not the letters, is printed.',
   'x is 4 and y is 3, so x * y is 12 and 12 is displayed.'],

  ['g9ict-alg-017', 'python_basics', 2,
   'Which Python statement reads a value typed by the user?',
   ['input()', 'read()', 'get()', 'scan()'], 'input()',
   'The opposite of print.',
   'input() waits for the user to type something and returns it.'],

  ['g9ict-alg-018', 'python_basics', 3,
   'What does this Python code display?<br><code>n = 10<br>if n &gt; 5:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Big")<br>else:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Small")</code>',
   ['Big', 'Small', 'Big Small', 'Nothing'], 'Big',
   'Is 10 greater than 5?',
   '10 is greater than 5, so the condition is true and "Big" is displayed.'],

  ['g9ict-alg-019', 'python_basics', 3,
   'How many times does this loop print?<br><code>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code>',
   ['3', '2', '4', '1'], '3',
   'range(3) produces 0, 1, 2.',
   'range(3) gives three values - 0, 1 and 2 - so print runs three times.'],

  ['g9ict-alg-020', 'flowchart_symbols', 3,
   'In a flowchart, what do the <b>arrows</b> between symbols show?',
   ['The order the steps are carried out in', 'The data being stored',
    'Which symbols are decisions', 'How long each step takes'],
   'The order the steps are carried out in',
   'They are called flow lines.',
   'The arrows are flow lines: they show the order in which the steps are followed.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-alg-021', 'flowchart_symbols', 1,
   'Name the flowchart symbol drawn as a diamond.',
   'Decision', ['decision box', 'decision symbol'],
   'It asks a question.', 'The diamond is the decision symbol.'],
  ['g9ict-alg-022', 'flowchart_symbols', 2,
   'Name the flowchart symbol used for input and output.',
   'Parallelogram', ['parallelogram', 'input/output', 'input output symbol'],
   'It is a slanted box.',
   'The parallelogram is used for input and output steps.'],
  ['g9ict-alg-023', 'control_structures', 2,
   'Name the control structure that repeats a group of steps.',
   'Repetition', ['iteration', 'loop', 'looping'],
   'Also called iteration.',
   'Repetition, also called iteration or looping, repeats a group of steps.'],
  ['g9ict-alg-024', 'python_basics', 2,
   'Write the Python statement that displays the word <b>Hello</b> on the screen.',
   'print("Hello")', ["print('Hello')", 'print("hello")', "print('hello')"],
   'Use print with the word in quotation marks.',
   'print("Hello") writes Hello to the screen.'],
  ['g9ict-alg-025', 'flowchart_reading', 3,
   'An algorithm reads: INPUT p, q = p * 2, q = q + 1, OUTPUT q. If p is 5, what number is output?',
   '11', ['eleven'],
   'Do the two process steps in order.',
   '5 * 2 = 10, then 10 + 1 = 11.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ══════════════════════════════════════════════════════════════════════════
//  SYLLABUS-GAP BLOCK. `drawing_flowcharts` and `maths_modelling` were
//  declared with nothing behind them.
//  ⚠ `drawing_flowcharts` CANNOT BE ASSESSED AS A DRAWING HERE - this pack has
//    no drawing surface, and the papers stopped asking for a free-hand
//    flowchart after 2021 anyway. What is assessed is the DESIGN DECISION the
//    drawing tests: which symbol the next step needs, and where it goes. That
//    is exactly the 2022-2025 format, where numbered statements are placed
//    into a printed flowchart.
// ══════════════════════════════════════════════════════════════════════════
const MCQ2 = [
  ['g9ict-alg-026', 'drawing_flowcharts', 1,
   'Which symbol must every flowchart begin and end with?',
   ['An oval', 'A diamond', 'A rectangle', 'A parallelogram'], 'An oval',
   'It is the terminator.',
   'A flowchart starts with a START oval and finishes with a STOP oval.'],

  ['g9ict-alg-027', 'drawing_flowcharts', 2,
   'An algorithm must read a pupil&rsquo;s mark before it can work anything out. Which symbol is drawn for that step?',
   ['A parallelogram', 'A rectangle', 'A diamond', 'An oval'],
   'A parallelogram',
   'Data is coming in.',
   'Reading a value is an input step, and input is drawn as a parallelogram.'],

  ['g9ict-alg-028', 'drawing_flowcharts', 2,
   'An algorithm must decide whether a mark is a pass or a fail. Which symbol is drawn for that step?',
   ['A diamond', 'A rectangle', 'An oval', 'A parallelogram'], 'A diamond',
   'It has two ways out.',
   'A decision is drawn as a diamond, with a Yes branch and a No branch leaving it.'],

  ['g9ict-alg-029', 'drawing_flowcharts', 3,
   'A flowchart must add 10% to a price. Which symbol holds that step?',
   ['A rectangle', 'A diamond', 'A parallelogram', 'An oval'], 'A rectangle',
   'It is a calculation.',
   'A calculation or assignment is a process step, drawn as a rectangle.'],

  ['g9ict-alg-030', 'drawing_flowcharts', 3,
   'In a flowchart, where do the two arrows from a decision symbol normally lead?',
   ['To the steps taken when the answer is Yes and when it is No',
    'Both of them always lead to exactly the same next step',
    'Both of them lead back to the START oval at the top',
    'To an output step that prints the whole flowchart'],
   'To the steps taken when the answer is Yes and when it is No',
   'Each answer needs its own path.',
   'The two exits are labelled Yes and No and lead to the steps carried out in each case.'],

  ['g9ict-alg-031', 'maths_modelling', 2,
   'An algorithm reads a length in metres and must output it in centimetres. What must the process step do?',
   ['Multiply the length by 100', 'Divide the length by 100',
    'Add 100 to the length', 'Subtract 100 from the length'],
   'Multiply the length by 100',
   'A centimetre is smaller than a metre, so there are more of them.',
   'There are 100 centimetres in a metre, so the value in metres is multiplied by 100.'],

  ['g9ict-alg-032', 'maths_modelling', 2,
   'An algorithm works out the area of a rectangle. Which calculation belongs in the process box?',
   ['area = length * width', 'area = length + width',
    'area = length / width', 'area = length - width'],
   'area = length * width',
   'Area is found by multiplying.',
   'The area of a rectangle is its length multiplied by its width.'],

  ['g9ict-alg-033', 'maths_modelling', 3,
   'A shop gives 20% discount. An algorithm reads the price into p. Which line gives the amount to pay?',
   ['pay = p * 0.8', 'pay = p * 0.2', 'pay = p + 0.2', 'pay = p - 20'],
   'pay = p * 0.8',
   'If 20% is taken off, what fraction is left?',
   'Taking 20% off leaves 80%, so the amount to pay is the price times 0.8.'],

  ['g9ict-alg-034', 'maths_modelling', 3,
   'An algorithm reads three marks and outputs the average. Which line is correct?',
   ['average = (a + b + c) / 3', 'average = a + b + c / 3',
    'average = (a + b + c) * 3', 'average = a * b * c / 3'],
   'average = (a + b + c) / 3',
   'The three marks must be added before dividing.',
   'The brackets make the addition happen first; without them only c would be divided by 3.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
