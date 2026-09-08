'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P5 · Electricity   (examWeight 4, joint heaviest)
//
//  ⚠ PHYSICS IS 100% VISUAL. Measured across the four available NCE Physics
//    papers: 24 of 24 questions carry a diagram, graph, table or instrument
//    face, and 19 of 40 MCQ items do. blueprint-science.md §X.4 calls that "the
//    single most consequential number in this document" - a bank that is 5%
//    visual cannot rehearse this exam. Every figure here is INLINE SVG: it
//    cannot 404, it works offline, and its contents are known exactly.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>. The
//    parser closes the svg at that tag and reparses the rest as sibling HTML,
//    so the figure silently loses everything after it. Ten figures shipped like
//    that in grade9-maths. Italic inside an svg is <tspan font-style="italic">.
//    scripts/test-svg-figures.js is the tripwire.
//
//  ⚠ NOTHING IS WORTH MORE THAN 5 MARKS IN THIS EXAM and 75.5% of Physics
//    mark-bearing parts are worth ONE. Difficulty is therefore weighted to
//    recall-and-read, not to multi-step problems - an app that models NCE
//    Physics as long derivations models the wrong exam (§M.6.4).
//
//  ⚠ Q = It and W = QV are the two relationships the syllabus names, and the
//    papers ask them as single-step substitutions. That is what is written here.
//
//  Source: NCE Science (Physics) 2021-2023, 2025; NCF Grades 7-9 §P5.
//  ⚠ There is no 2024 Physics paper in past-papers/ - see blueprint §0.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p5-electricity';

// ── Circuit-symbol figures. One symbol, drawn in a 120x70 box on a short wire.
//    ⚠ Labels are <text>, never <i>/<b> - see the header note.
const sym = (inner, label) =>
  '<svg viewBox="0 0 120 70" width="140" role="img" aria-label="a circuit symbol">' +
  '<rect x="1" y="1" width="118" height="68" fill="none" stroke="#cbd5e1"/>' +
  '<line x1="10" y1="35" x2="45" y2="35" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="75" y1="35" x2="110" y2="35" stroke="#0f172a" stroke-width="2"/>' +
  inner +
  (label ? '<text x="60" y="62" font-size="9" text-anchor="middle" fill="#475569">' + label + '</text>' : '') +
  '</svg>';

const SYM_CELL =
  sym('<line x1="52" y1="20" x2="52" y2="50" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="68" y1="27" x2="68" y2="43" stroke="#0f172a" stroke-width="4"/>' +
      '<line x1="45" y1="35" x2="52" y2="35" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="68" y1="35" x2="75" y2="35" stroke="#0f172a" stroke-width="2"/>', '');
const SYM_LAMP =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="50" y1="25" x2="70" y2="45" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="70" y1="25" x2="50" y2="45" stroke="#0f172a" stroke-width="2"/>', '');
const SYM_SWITCH =
  sym('<circle cx="48" cy="35" r="3" fill="#0f172a"/>' +
      '<circle cx="72" cy="35" r="3" fill="#0f172a"/>' +
      '<line x1="48" y1="35" x2="70" y2="22" stroke="#0f172a" stroke-width="2"/>', '');
const SYM_RESISTOR =
  sym('<rect x="45" y="27" width="30" height="16" fill="none" stroke="#0f172a" stroke-width="2"/>', '');
const SYM_AMMETER =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="60" y="40" font-size="14" text-anchor="middle" fill="#0f172a">A</text>', '');
const SYM_VOLTMETER =
  sym('<circle cx="60" cy="35" r="14" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="60" y="40" font-size="14" text-anchor="middle" fill="#0f172a">V</text>', '');

// ── A series circuit: cell, switch, lamp, and one meter in a named position.
//    `meter` is 'series' (in the loop) or 'parallel' (across the lamp).
const circuit = (meterLetter, where) => {
  const box =
    '<rect x="20" y="20" width="200" height="100" fill="none" stroke="#0f172a" stroke-width="2"/>';
  const cell =
    '<rect x="95" y="12" width="50" height="16" fill="#fff" stroke="none"/>' +
    '<line x1="112" y1="8" x2="112" y2="32" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="128" y1="14" x2="128" y2="26" stroke="#0f172a" stroke-width="4"/>';
  const lamp =
    '<rect x="100" y="105" width="40" height="30" fill="#fff" stroke="none"/>' +
    '<circle cx="120" cy="120" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="111" y1="111" x2="129" y2="129" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="129" y1="111" x2="111" y2="129" stroke="#0f172a" stroke-width="2"/>';
  const sw =
    '<rect x="12" y="58" width="16" height="26" fill="#fff" stroke="none"/>' +
    '<circle cx="20" cy="60" r="3" fill="#0f172a"/><circle cx="20" cy="82" r="3" fill="#0f172a"/>' +
    '<line x1="20" y1="82" x2="33" y2="63" stroke="#0f172a" stroke-width="2"/>';
  const meterSeries =
    '<rect x="207" y="56" width="26" height="30" fill="#fff" stroke="none"/>' +
    '<circle cx="220" cy="70" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<text x="220" y="75" font-size="13" text-anchor="middle" fill="#0f172a">' + meterLetter + '</text>';
  const meterParallel =
    '<line x1="100" y1="120" x2="70" y2="120" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="140" y1="120" x2="170" y2="120" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="70" y1="120" x2="70" y2="160" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="170" y1="120" x2="170" y2="160" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="70" y1="160" x2="107" y2="160" stroke="#0f172a" stroke-width="2"/>' +
    '<line x1="133" y1="160" x2="170" y2="160" stroke="#0f172a" stroke-width="2"/>' +
    '<circle cx="120" cy="160" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<text x="120" y="165" font-size="13" text-anchor="middle" fill="#0f172a">' + meterLetter + '</text>';
  return '<svg viewBox="0 0 250 185" width="260" role="img" aria-label="a circuit diagram">' +
    box + cell + lamp + sw +
    (where === 'parallel' ? meterParallel : meterSeries) +
    '</svg>';
};

const MCQ = [
  ['g9s-p5-001', 'circuit_symbols', 1,
   'Which component does this symbol stand for?<br>' + SYM_CELL,
   ['A cell', 'A lamp', 'A switch', 'A resistor'], 'A cell',
   'One long line and one short line.',
   'A cell is drawn as a long thin line (the positive terminal) beside a short thick one (the negative terminal).'],

  ['g9s-p5-002', 'circuit_symbols', 1,
   'Which component does this symbol stand for?<br>' + SYM_LAMP,
   ['A lamp', 'A cell', 'An ammeter', 'A voltmeter'], 'A lamp',
   'A circle with a cross drawn inside it.',
   'A lamp is a circle with a cross through it. A meter is a circle with a letter inside instead.'],

  ['g9s-p5-003', 'circuit_symbols', 1,
   'Which component does this symbol stand for?<br>' + SYM_SWITCH,
   ['A switch', 'A resistor', 'A fuse', 'A cell'], 'A switch',
   'The line is lifted away from one of the two dots.',
   'An open switch is two contacts with the connecting arm lifted away from one of them.'],

  ['g9s-p5-004', 'circuit_symbols', 1,
   'Which component does this symbol stand for?<br>' + SYM_RESISTOR,
   ['A resistor', 'A cell', 'A lamp', 'A switch'], 'A resistor',
   'A plain rectangle sitting in the wire.',
   'A resistor is drawn as a plain rectangle in the line of the wire.'],

  ['g9s-p5-005', 'circuit_symbols', 2,
   'Which quantity does the meter shown by this symbol measure?<br>' + SYM_AMMETER,
   ['Current', 'Voltage', 'Resistance', 'Charge'], 'Current',
   'Read the letter inside the circle.',
   'A circle marked A is an ammeter, and an ammeter measures current in amperes.'],

  ['g9s-p5-006', 'circuit_symbols', 2,
   'Which quantity does the meter shown by this symbol measure?<br>' + SYM_VOLTMETER,
   ['Voltage', 'Current', 'Resistance', 'Charge'], 'Voltage',
   'Read the letter inside the circle.',
   'A circle marked V is a voltmeter, and a voltmeter measures voltage in volts.'],

  ['g9s-p5-007', 'series_circuits', 1,
   'In the circuit shown, what happens to the lamp when the switch is closed?<br>' + circuit('A', 'series'),
   ['It lights, because the circuit is now complete',
    'It stays off, because the circuit is now broken',
    'It lights only if the ammeter is removed first',
    'It stays off until a second cell is added'],
   'It lights, because the circuit is now complete',
   'A closed switch joins the two contacts.',
   'Closing the switch completes the loop, so charge can flow all the way round and the lamp lights.'],

  ['g9s-p5-008', 'series_circuits', 2,
   'Three lamps are connected in <b>series</b> with one cell. One lamp is removed from its holder. What happens?',
   ['All the lamps go out', 'The other two stay lit as before',
    'The other two become brighter', 'Only the removed lamp is affected'],
   'All the lamps go out',
   'A series circuit is a single loop.',
   'In series there is only one path, so a break anywhere stops the current everywhere and every lamp goes out.'],

  ['g9s-p5-009', 'series_circuits', 2,
   'A second identical cell is added in series to a circuit with one lamp. The lamp becomes:',
   ['Brighter, because the voltage across it is greater',
    'Dimmer, because the cells share the current',
    'Unchanged, because the lamp is the same lamp',
    'Unlit, because two cells cancel each other out'],
   'Brighter, because the voltage across it is greater',
   'Cells in series add their voltages.',
   'Two cells in series give twice the voltage, so a larger current flows and the lamp is brighter.'],

  ['g9s-p5-010', 'series_circuits', 3,
   'Why is a series circuit a poor choice for the lights in a house?',
   ['One broken lamp would switch off every other light',
    'The lights would all become far too bright',
    'Series circuits cannot be switched off',
    'Series circuits need no cells'],
   'One broken lamp would switch off every other light',
   'Think about what one break does to a single loop.',
   'A house needs each light to work on its own; in series a single break cuts the current to all of them.'],

  ['g9s-p5-011', 'measuring_current_voltage', 2,
   'In the circuit shown, how is the meter connected, and what does that tell you it is?<br>' + circuit('A', 'series'),
   ['In series in the loop, so it is an ammeter',
    'Across the lamp only, so it is an ammeter',
    'In series in the loop, so it is a voltmeter',
    'Across the lamp only, so it is a voltmeter'],
   'In series in the loop, so it is an ammeter',
   'Follow the wire: does the loop pass through the meter?',
   'The meter sits in the loop itself, so the whole current passes through it - that is how an ammeter is connected.'],

  ['g9s-p5-012', 'measuring_current_voltage', 2,
   'In the circuit shown, how is the meter connected, and what does that tell you it is?<br>' + circuit('V', 'parallel'),
   ['Across the lamp, so it is a voltmeter',
    'Across the lamp, so it is an ammeter',
    'In series in the loop, so it is a voltmeter',
    'In series in the loop, so it is an ammeter'],
   'Across the lamp, so it is a voltmeter',
   'Follow the wire: the meter is on its own branch beside the lamp.',
   'The meter is connected across the lamp, on a branch of its own - that is how a voltmeter is connected.'],

  ['g9s-p5-013', 'measuring_current_voltage', 1,
   'An ammeter must always be connected:',
   ['In series with the component', 'Across the component',
    'Across the cell only', 'Outside the circuit'],
   'In series with the component',
   'The current being measured has to pass through it.',
   'An ammeter is placed in series so that the current it is measuring flows through it.'],

  ['g9s-p5-014', 'measuring_current_voltage', 1,
   'A voltmeter must always be connected:',
   ['Across the component', 'In series with the component',
    'In series with the cell', 'Outside the circuit'],
   'Across the component',
   'It compares two points, one on each side.',
   'A voltmeter is placed across (in parallel with) the component, because voltage is measured between two points.'],

  ['g9s-p5-015', 'measuring_current_voltage', 3,
   'A pupil connects an ammeter <b>across</b> a lamp instead of in series with it. What is the main problem?',
   ['Almost all the current takes the meter instead of the lamp',
    'The meter shows a reading of exactly zero every time',
    'The lamp becomes brighter than it should be',
    'The cell is unable to produce any voltage'],
   'Almost all the current takes the meter instead of the lamp',
   'An ammeter has a very low resistance.',
   'An ammeter has almost no resistance, so connected across the lamp it short-circuits it and takes nearly all the current.'],

  ['g9s-p5-016', 'current_voltage_resistance', 1,
   'What is the unit of electric current?',
   ['Ampere', 'Volt', 'Ohm', 'Coulomb'], 'Ampere',
   'Its symbol is A.',
   'Current is measured in amperes (A).'],

  ['g9s-p5-017', 'current_voltage_resistance', 1,
   'What is the unit of resistance?',
   ['Ohm', 'Ampere', 'Volt', 'Watt'], 'Ohm',
   'Its symbol is the Greek letter omega.',
   'Resistance is measured in ohms.'],

  ['g9s-p5-018', 'current_voltage_resistance', 2,
   'What does the <b>resistance</b> of a component tell you?',
   ['How much it opposes the flow of current',
    'How much charge it stores for later',
    'How much current it produces on its own',
    'How much light it gives out'],
   'How much it opposes the flow of current',
   'A larger resistance lets less current through.',
   'Resistance measures how strongly a component opposes the current flowing through it.'],

  ['g9s-p5-019', 'current_voltage_resistance', 2,
   'What does the <b>electromotive force</b> (emf) of a cell describe?',
   ['The energy the cell gives to each unit of charge',
    'The current the cell always pushes out',
    'The resistance inside the connecting wires',
    'The charge stored on the cell casing'],
   'The energy the cell gives to each unit of charge',
   'It is about energy per unit charge, not about current.',
   'The emf of a cell is the energy it supplies to each coulomb of charge driven round the circuit.'],

  ['g9s-p5-020', 'current_voltage_resistance', 3,
   'The voltage across a fixed resistor is doubled. What happens to the current through it?',
   ['It doubles', 'It halves', 'It stays the same', 'It becomes zero'],
   'It doubles',
   'For a fixed resistance, current and voltage rise together.',
   'With the resistance unchanged, doubling the voltage doubles the current through the resistor.'],

  ['g9s-p5-021', 'charge_and_current', 1,
   'What is the unit of electric charge?',
   ['Coulomb', 'Ampere', 'Volt', 'Joule'], 'Coulomb',
   'Its symbol is C.',
   'Charge is measured in coulombs (C).'],

  ['g9s-p5-022', 'charge_and_current', 2,
   'Which statement describes electric current correctly?',
   ['It is the rate of flow of charge',
    'It is the energy carried by each charge',
    'It is the opposition to the flow of charge',
    'It is the total charge stored in a cell'],
   'It is the rate of flow of charge',
   'Rate means "per second".',
   'Current is the charge passing a point each second, which is why Q = It.'],

  ['g9s-p5-023', 'potential_difference', 2,
   'Which statement describes potential difference correctly?',
   ['It is the work done per unit charge between two points',
    'It is the charge that flows in one second',
    'It is the resistance between two points',
    'It is the total charge moved round the circuit'],
   'It is the work done per unit charge between two points',
   'Per unit charge means "for each coulomb".',
   'Potential difference is the energy transferred per coulomb of charge, which is why W = QV.'],

  ['g9s-p5-024', 'potential_difference', 3,
   'A charge moves through a lamp and the lamp gives out light and heat. Which quantity is the energy transferred divided by that charge?',
   ['The potential difference across the lamp',
    'The current flowing through the lamp',
    'The resistance of the lamp',
    'The charge on the lamp'],
   'The potential difference across the lamp',
   'Energy per unit charge has a name.',
   'Energy transferred divided by charge is the potential difference across the component: V = W / Q.'],

  ['g9s-p5-025', 'dc_circuit_problems', 2,
   'In a series circuit, the current is measured at three different points. What will the three readings be?',
   ['All three are the same', 'Each one is smaller than the last',
    'Each one is larger than the last', 'The middle one is the largest'],
   'All three are the same',
   'There is only one path for the charge.',
   'Current is the same everywhere in a series circuit, because charge has nowhere else to go.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// ⚠ Single-step substitutions only. The papers ask Q = It and W = QV exactly
//   this way; nothing in four years chains them.
const NUM = [
  ['g9s-p5-026', 'charge_and_current', 2,
   'A current of 3 A flows for 5 s. Calculate the charge that passes, in coulombs.',
   15, 'Use Q = I &times; t.', 'Q = It = 3 &times; 5 = 15 C.'],
  ['g9s-p5-027', 'charge_and_current', 2,
   'A current of 0.5 A flows for 60 s. Calculate the charge that passes, in coulombs.',
   30, 'Use Q = I &times; t.', 'Q = It = 0.5 &times; 60 = 30 C.'],
  ['g9s-p5-028', 'charge_and_current', 3,
   'A charge of 24 C passes a point in 8 s. Calculate the current, in amperes.',
   3, 'Rearrange Q = It to I = Q &divide; t.', 'I = Q / t = 24 / 8 = 3 A.'],
  ['g9s-p5-029', 'charge_and_current', 3,
   'A charge of 45 C flows when the current is 9 A. Calculate the time taken, in seconds.',
   5, 'Rearrange Q = It to t = Q &divide; I.', 't = Q / I = 45 / 9 = 5 s.'],
  ['g9s-p5-030', 'potential_difference', 2,
   'A charge of 4 C moves through a potential difference of 6 V. Calculate the energy transferred, in joules.',
   24, 'Use W = Q &times; V.', 'W = QV = 4 &times; 6 = 24 J.'],
  ['g9s-p5-031', 'potential_difference', 3,
   '36 J of energy is transferred when 3 C of charge flows through a lamp. Calculate the potential difference across the lamp, in volts.',
   12, 'Rearrange W = QV to V = W &divide; Q.', 'V = W / Q = 36 / 3 = 12 V.'],
  ['g9s-p5-032', 'potential_difference', 3,
   '50 J of energy is transferred by a charge moving through 10 V. Calculate the charge, in coulombs.',
   5, 'Rearrange W = QV to Q = W &divide; V.', 'Q = W / V = 50 / 10 = 5 C.'],
  ['g9s-p5-033', 'dc_circuit_problems', 2,
   'Two cells of 1.5 V each are connected in series. Calculate the total voltage supplied, in volts.',
   3, 'Cells in series add.', '1.5 + 1.5 = 3 V.'],
  ['g9s-p5-034', 'dc_circuit_problems', 3,
   'A 6 V supply is connected across a resistor and a current of 2 A flows. Calculate the resistance, in ohms.',
   3, 'Use R = V &divide; I.', 'R = V / I = 6 / 2 = 3 ohms.'],
  ['g9s-p5-035', 'dc_circuit_problems', 3,
   'A current of 0.4 A flows through a 20 ohm resistor. Calculate the voltage across it, in volts.',
   8, 'Use V = I &times; R.', 'V = IR = 0.4 &times; 20 = 8 V.'],
  ['g9s-p5-036', 'dc_circuit_problems', 3,
   'Two lamps in series each have 3 V across them. Calculate the supply voltage, in volts.',
   6, 'In series the voltages across the parts add to the supply voltage.',
   '3 + 3 = 6 V.'],
  ['g9s-p5-037', 'series_circuits', 2,
   'An ammeter in a series circuit reads 0.25 A. What will a second ammeter placed elsewhere in the same loop read, in amperes?',
   0.25, 'Current is the same all the way round a series circuit.',
   'The current is the same at every point of a series circuit, so it also reads 0.25 A.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-p5-038', 'circuit_symbols', 1,
   'Name the component drawn as a circle with a cross inside it.',
   'Lamp', ['a lamp', 'bulb', 'a bulb', 'light bulb'],
   'It gives out light.', 'A circle with a cross through it is the symbol for a lamp.'],
  ['g9s-p5-039', 'measuring_current_voltage', 1,
   'Name the meter that is connected in series to measure current.',
   'Ammeter', ['an ammeter', 'ameter'],
   'Its symbol is a circle marked A.', 'An ammeter measures current and is connected in series.'],
  ['g9s-p5-040', 'measuring_current_voltage', 1,
   'Name the meter that is connected across a component to measure voltage.',
   'Voltmeter', ['a voltmeter', 'volt meter'],
   'Its symbol is a circle marked V.', 'A voltmeter measures voltage and is connected in parallel.'],
  ['g9s-p5-041', 'current_voltage_resistance', 2,
   'Give the unit in which resistance is measured.',
   'Ohm', ['ohms', 'the ohm'],
   'Its symbol is the Greek letter omega.', 'Resistance is measured in ohms.'],
  ['g9s-p5-042', 'charge_and_current', 2,
   'Write the equation that links charge, current and time.',
   'Q = It', ['q=it', 'Q=It', 'charge = current x time', 'Q = I x t'],
   'Charge equals current multiplied by time.',
   'Q = It: charge equals current multiplied by the time it flows for.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
