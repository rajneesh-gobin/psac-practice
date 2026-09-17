'use strict';
// Grade 6 History & Geography - Label the Diagram (bonus chapter)
//
// ⚠ `slots` questions, not a new type — see docs/label-diagrams/PLAN.md.
// ⚠ The word bank shows in PRACTICE only; the exam drops it and the child types.
//
// Figures (licence and author in docs/label-diagrams/provenance.json and CREDITS.md):
//   earth-layers-numbers.png   Public domain  USGS / Anasofiapaixao
//   earthquake-numbers.png     CC BY-SA 3.0   Eurico Zimbres
//   atoll-forming-numbers.png  Public domain  Susan Mayfield and Sara Boore, USGS
//
// ⚠ Every key below comes from the illustrator's own legend on the Commons file
// page, not from reading the picture. The volcano key taught this: the legend is
// authoritative and free, and a guessed key marks a correct child wrong.
//
// ⚠ The atoll figure is not generic. Mauritius IS a volcanic island inside a
// fringing reef — stage 1 and 2 of this very diagram — so the sequence is the
// island's own geography, not a foreign example.
//
// ⚠ ALT TEXT NAMES THE SUBJECT, NEVER THE PARTS.
// IDs: g6hg-lbl-NNN

function _fig(file, alt, width) {
  return '<figure class="q-fig"><img src="assets/questions/labels/' + file + '" alt="' + alt + '" ' +
    'style="display:block;margin:8px auto;max-width:100%;width:' + (width || 380) + 'px;' +
    'border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';
}

const _EARTH_ALT = 'A cut-away diagram of the inside of the Earth with its layers marked by number';
const _QUAKE_ALT = 'A diagram of an earthquake beneath the ground with three places marked by number';
const _ATOLL_ALT = 'Three stages of a reef forming around an island, with features marked by number';

STATIC_QUESTIONS.push(

  makeTask({
    id: 'g6hg-lbl-001', chapterId: 'g6enr-label', subsection: 'earth', difficulty: 2,
    intro: 'The diagram shows the Earth cut in half, so you can see the layers inside it.',
    stimulus: { html: _fig('earth-layers-numbers.png', _EARTH_ALT, 360), altText: _EARTH_ALT },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'Name the layers marked <b>1</b>, <b>2</b> and <b>3</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3'],
          answer: [['crust'], ['mantle'], ['core']],
          bank: ['mantle', 'atmosphere', 'core', 'crust', 'lithosphere'] },
        hint: 'Work from the outside in. We live on the thinnest one.',
        explanation: 'From the outside in: the <b>crust</b> (1) is the thin rocky skin we live on, the <b>mantle</b> (2) is the thick layer beneath it, and the <b>core</b> (3) is at the centre. Mauritius sits on the crust, and the magma that built it rose from the mantle.' },

      { label: 'b', marks: 1,
        prompt: 'The core is drawn in two parts, <b>3a</b> and <b>3b</b>. What is the difference?',
        response: { kind: 'choice', answer: 'The outer core is liquid and the inner core is solid',
          options: ['The outer core is liquid and the inner core is solid',
                    'The outer core is solid and the inner core is liquid',
                    'Both parts are liquid rock',
                    'Both parts are made of ice'] },
        hint: 'The pressure is greatest right at the centre.',
        explanation: 'The <b>outer core (3a) is liquid</b> and the <b>inner core (3b) is solid</b>. The enormous pressure at the very centre keeps the inner core solid even though it is extremely hot.' },
    ],
  }),

  makeTask({
    id: 'g6hg-lbl-002', chapterId: 'g6enr-label', subsection: 'earth', difficulty: 3,
    intro: 'The diagram shows what happens underground during an <b>earthquake</b>.',
    stimulus: { html: _fig('earthquake-numbers.png', _QUAKE_ALT, 380), altText: _QUAKE_ALT },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'Name the parts marked <b>1</b>, <b>2</b> and <b>3</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3'],
          answer: [
            ['epicentre', 'epicenter'],
            ['hypocentre', 'hypocenter', 'focus'],
            ['fault', 'fault line'],
          ],
          bank: ['fault', 'crater', 'epicentre', 'hypocentre', 'crust'] },
        hint: 'One is on the surface, one is underground, and one is the crack itself.',
        explanation: 'The <b>hypocentre</b> (2), also called the focus, is where the earthquake starts underground. The <b>epicentre</b> (1) is the point on the surface directly above it — the place that usually shakes hardest. The <b>fault</b> (3) is the crack in the rock where the movement happens.' },

      { label: 'b', marks: 1,
        prompt: 'Why does the place marked <b>1</b> usually suffer the most damage?',
        response: { kind: 'choice', answer: 'It is the surface point nearest the hypocentre',
          options: ['It is the surface point nearest the hypocentre',
                    'It is always where the most people live',
                    'It is where the fault reaches the sea',
                    'It is the deepest point of the earthquake'] },
        hint: 'Look at how far the shaking has to travel to reach it.',
        explanation: 'The <b>epicentre</b> is directly above the hypocentre, so the shock waves reach it after travelling the shortest distance and have lost the least energy. Mauritius lies far from a plate boundary, which is why earthquakes here are rare and weak.' },
    ],
  }),

  makeTask({
    id: 'g6hg-lbl-003', chapterId: 'g6enr-label', subsection: 'earth', difficulty: 4,
    intro: 'The diagram shows how a coral reef changes as a volcanic island slowly sinks. Mauritius itself is a volcanic island inside a reef.',
    stimulus: { html: _fig('atoll-forming-numbers.png', _ATOLL_ALT, 400), altText: _ATOLL_ALT },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'Name the features marked <b>1</b>, <b>2</b> and <b>3</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3'],
          answer: [
            ['volcanic island', 'island', 'volcano'],
            ['fringing reef'],
            ['barrier reef'],
          ],
          bank: ['barrier reef', 'volcanic island', 'atoll', 'fringing reef', 'lagoon'] },
        hint: 'The reef begins tight against the shore and ends up far from it.',
        explanation: 'A reef begins as a <b>fringing reef</b> (2) growing right against the shore of a <b>volcanic island</b> (1). As the island sinks, the reef keeps growing upward and a lagoon opens between them, making a <b>barrier reef</b> (3).' },

      { label: 'b', marks: 1,
        prompt: 'The island keeps sinking until it disappears under the sea. What is the ring of reef left behind called?',
        response: { kind: 'choice', answer: 'An atoll',
          options: ['An atoll', 'A fringing reef', 'A volcano', 'A plateau'] },
        hint: 'The Chagos Archipelago is made of them.',
        explanation: 'When the island finally submerges, the ring-shaped reef around a central lagoon is an <b>atoll</b>. The Chagos Archipelago, a former dependency of Mauritius, is a coral atoll group.' },

      { label: 'c', marks: 1,
        prompt: 'Which stage of this diagram does Mauritius itself match today?',
        response: { kind: 'choice', answer: 'A volcanic island with a reef near its shore',
          options: ['A volcanic island with a reef near its shore',
                    'A ring of reef with no island left',
                    'An island with no reef at all',
                    'A reef with no lagoon anywhere'] },
        hint: 'Think how far the reef lies from a Mauritian beach.',
        explanation: 'Mauritius is a <b>volcanic island with a fringing reef</b> — stage 1 and 2 of this diagram. The reef lies close to the shore with a shallow lagoon behind it, which is why the lagoon is calm enough to swim in.' },
    ],
  })

);
