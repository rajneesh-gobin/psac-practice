'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({
    id: 'g7s-electricity-017', chapterId: 'g7s-electricity', difficulty: 2,
    subsection: 'circuit_symbols',
    question: 'Four circuit symbols are drawn below. Which labelled symbol is the <b>switch</b>?' +
      '<svg viewBox="0 0 300 96" width="300" role="img" aria-label="four circuit symbols side by side">' +
      '<line x1="12" y1="40" x2="30" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="30" y1="24" x2="30" y2="56" stroke="#0f172a" stroke-width="2.5"/>' +
      '<line x1="42" y1="32" x2="42" y2="48" stroke="#0f172a" stroke-width="2.5"/>' +
      '<line x1="42" y1="40" x2="62" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="37" y="82" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">A</text>' +
      '<line x1="87" y1="40" x2="99" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<circle cx="112" cy="40" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="103" y1="31" x2="121" y2="49" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="121" y1="31" x2="103" y2="49" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="125" y1="40" x2="137" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="112" y="82" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">B</text>' +
      '<line x1="162" y1="40" x2="180" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<circle cx="180" cy="40" r="3" fill="#0f172a"/>' +
      '<line x1="180" y1="40" x2="200" y2="27" stroke="#0f172a" stroke-width="2"/>' +
      '<circle cx="202" cy="40" r="3" fill="#0f172a"/>' +
      '<line x1="202" y1="40" x2="220" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="191" y="82" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">C</text>' +
      '<line x1="240" y1="40" x2="252" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<rect x="252" y="32" width="30" height="16" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="282" y1="40" x2="294" y2="40" stroke="#0f172a" stroke-width="2"/>' +
      '<text x="267" y="82" font-size="13" font-weight="bold" text-anchor="middle" fill="#0f172a">D</text>' +
      '</svg>',
    options: ['C', 'A', 'B', 'D'],
    answer: 'C',
    hint: 'One symbol shows a part that can be lifted to leave a gap.',
    explanation: 'C is a switch drawn open: the lever is lifted away from the second contact, leaving a gap. A is a cell (one long and one short line), B is a lamp (a circle with a cross) and D is a resistor (a plain rectangle).'
  }),
  makeMCQ({
    id: 'g7s-electricity-018', chapterId: 'g7s-electricity', difficulty: 3,
    subsection: 'simple_circuits',
    question: 'The lamp in the circuit below does not light. What does the diagram show is wrong?' +
      '<svg viewBox="0 0 240 130" width="250" role="img" aria-label="a circuit diagram">' +
      '<path d="M30 25 H100 M138 25 H210 M210 25 V62 M210 82 V105 M210 105 H140 M100 105 H30 M30 105 V25" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<circle cx="119" cy="25" r="13" fill="none" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="110" y1="16" x2="128" y2="34" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="128" y1="16" x2="110" y2="34" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="112" y1="93" x2="112" y2="117" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="126" y1="99" x2="126" y2="111" stroke="#0f172a" stroke-width="3"/>' +
      '<line x1="140" y1="105" x2="126" y2="105" stroke="#0f172a" stroke-width="2"/>' +
      '<line x1="100" y1="105" x2="112" y2="105" stroke="#0f172a" stroke-width="2"/>' +
      '<circle cx="210" cy="62" r="2.5" fill="#0f172a"/>' +
      '<circle cx="210" cy="82" r="2.5" fill="#0f172a"/>' +
      '<text x="228" y="76" font-size="10" fill="#334155">gap</text>' +
      '</svg>',
    options: ['A break in the wire', 'A cell put in wrongly', 'A bulb that is missing', 'A switch left closed'],
    answer: 'A break in the wire',
    hint: 'Follow the wire all the way round with your finger.',
    explanation: 'The right-hand side of the loop is not joined, so the circuit is open and no current can flow. The cell and the lamp are both drawn correctly, and there is no switch in this circuit at all.'
  }),
  makeText({
    id: 'g7s-electricity-019', chapterId: 'g7s-electricity', difficulty: 1,
    subsection: 'circuit_parts',
    question: 'What is the unit of electric current?',
    answer: 'ampere', alsoAccept: ['amp', 'amps', 'amperes', 'A'],
    hint: 'The instrument that measures it is named after this unit.',
    explanation: 'Current is measured in amperes (amps), which is why the meter is called an ammeter. The volt is the unit of voltage and the ohm the unit of resistance.'
  }),
  makeNum({
    id: 'g7s-electricity-020', chapterId: 'g7s-electricity', difficulty: 2,
    subsection: 'simple_circuits',
    question: 'Three 1.5 V cells are joined end to end in series. What is the total voltage of the battery, in volts?',
    answer: 4.5, acceptableAnswers: ['4.5', '4.5 V', '4,5'],
    hint: 'Cells in series add their voltages together.',
    explanation: '1.5 + 1.5 + 1.5 = 4.5 V, which is why a torch with three cells gives a brighter light than one with a single cell. The answer is not 1.5, which is one cell on its own.'
  })
);
