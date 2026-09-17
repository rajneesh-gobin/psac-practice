'use strict';
// Grade 5 Science - Label the Diagram (bonus chapter)
//
// ⚠ `slots` questions, not a new type — see docs/label-diagrams/PLAN.md.
// ⚠ The word bank shows in PRACTICE only; the exam drops it and the child types.
//
// Figure: flower-parts-crop.png — PUBLIC DOMAIN, Pearson Scott Foresman.
//
// ⚠ THIS FIGURE IS A CROP, AND THE CROP IS THE WHOLE POINT. The original PSF
// line drawing prints PETAL, STAMEN, SEPAL and PISTIL on the artwork itself,
// which hands a labelling question its own answers. Commons has no unlabelled
// flower diagram — the numbered-diagram category, the floral-diagram category
// and the siblings of the standard PD flower were all checked, and the one
// promising Polish file is CC BY-SA with no recorded author, so it cannot be
// attributed and cannot be used. The fix is a crop to the central strip
// (x 310-645 of the 960x804 render); all four printed words lie outside it.
// Recorded in docs/label-diagrams/provenance.json under `modification`.
//
// ⚠ Masking the words with white boxes was considered and REJECTED: a box a few
// pixels out on one screen size shows a sliver of the answer, silently, to that
// one child. A crop cannot leak what it does not contain.
//
// ⚠ The sepals are cut off by that crop, so no marker points at one and `sepal`
// rides in the word bank as a spare. Sepals are taught in the `reproduction`
// subsection instead.
//
// ⚠ ALT TEXT NAMES THE SUBJECT, NEVER THE PARTS.
// IDs: g5sc-lbl-NNN

function _mark(letter, left, top) {
  return '<span style="position:absolute;left:' + left + '%;top:' + top + '%;transform:translate(-50%,-50%);' +
    'display:flex;align-items:center;justify-content:center;width:26px;height:26px;' +
    'border-radius:50%;background:rgba(255,255,255,.92);border:2px solid #111827;' +
    'font:700 14px/1 system-ui,sans-serif;color:#111827">' + letter + '</span>';
}

const _FLOWER_ALT = 'A line drawing of a flower cut in half, with four parts marked by number';
const _FLOWER_FIG =
  '<figure class="q-fig" style="position:relative;display:block;margin:8px auto;max-width:100%;width:250px">' +
  '<img src="assets/questions/labels/flower-parts-crop.png" alt="' + _FLOWER_ALT + '" ' +
  'style="display:block;width:100%;border:1px solid #cbd5e1;border-radius:8px;background:#fff">' +
  _mark('1', 52, 9) +    // the tall central petal
  _mark('2', 25, 25) +   // the oval head of the left stamen
  _mark('3', 51, 42) +   // the flat top of the pistil
  _mark('4', 49, 79) +   // the swollen base holding the ovule
  '</figure>';

const _WATER_ALT = 'A landscape showing water moving between the sea, the sky and the land, with five places marked by letter';
const _WATER_FIG =
  '<figure class="q-fig" style="position:relative;display:block;margin:8px auto;max-width:100%;width:420px">' +
  '<img src="assets/questions/labels/water-cycle-blank.png" alt="' + _WATER_ALT + '" ' +
  'style="display:block;width:100%;border:1px solid #cbd5e1;border-radius:8px;background:#fff">' +
  _mark('A', 86, 50) + _mark('B', 50, 26) + _mark('C', 23, 33) +
  _mark('D', 55, 62) + _mark('E', 26, 74) +
  '</figure>';

// ⚠ THIS ONE IS DRAWN, NOT FETCHED, AND THAT IS A DELIBERATE EXCEPTION.
//   Every other figure in these chapters is a real illustration from Commons,
//   because hand-drawn biology and geography look like what they are. A Grade 5
//   circuit is the opposite case: four standardised components — a cell, a bulb,
//   a switch and plain wire — which are straight lines and two symbols. Commons,
//   its numbered-diagram category and Openverse were all searched and hold no
//   unlabelled simple circuit; every candidate is an industrial schematic.
//   ⚠ Drawing it is also BETTER here, for the reason CLAUDE.md already gives:
//   an inline SVG cannot 404, works offline, and its contents are known exactly
//   — so the marker positions are exact rather than estimated over someone
//   else's raster. The palette matches the pack's existing circuit artwork
//   (g5sci-el-002): #f0fdf4 ground, #86efac border, #334155 strokes.
//   ⚠ NO TEXT ON THE DRAWING. The existing circuit SVGs print "+ cell −" beside
//   the symbol, which on a labelling question would hand over the answer.
const _CIRCUIT_ALT = 'A drawing of a simple electric circuit with four parts marked by number';
const _CIRCUIT_FIG =
  '<figure class="q-fig"><svg viewBox="0 0 280 165" width="280" height="165" role="img" ' +
  'aria-label="' + _CIRCUIT_ALT + '" ' +
  'style="display:block;margin:8px auto;max-width:100%;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">' +
    // wires
    '<line x1="50" y1="40" x2="131" y2="40" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="159" y1="40" x2="240" y2="40" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="240" y1="40" x2="240" y2="125" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="186" y1="125" x2="240" y2="125" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="50" y1="125" x2="150" y2="125" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="50" y1="40" x2="50" y2="72" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="50" y1="84" x2="50" y2="125" stroke="#334155" stroke-width="2.5"/>' +
    // cell: one long plate, one short plate
    '<line x1="34" y1="74" x2="66" y2="74" stroke="#334155" stroke-width="3.5"/>' +
    '<line x1="42" y1="82" x2="58" y2="82" stroke="#334155" stroke-width="2"/>' +
    // bulb
    '<circle cx="145" cy="40" r="14" fill="#ffffff" stroke="#334155" stroke-width="2.5"/>' +
    '<line x1="135" y1="30" x2="155" y2="50" stroke="#334155" stroke-width="2"/>' +
    '<line x1="155" y1="30" x2="135" y2="50" stroke="#334155" stroke-width="2"/>' +
    // switch, drawn OPEN on purpose — part (c) asks about it
    '<circle cx="150" cy="125" r="3" fill="#334155"/>' +
    '<circle cx="186" cy="125" r="3" fill="#334155"/>' +
    '<line x1="150" y1="125" x2="181" y2="110" stroke="#334155" stroke-width="2.5"/>' +
    // markers
    '<line x1="27" y1="78" x2="33" y2="78" stroke="#334155" stroke-width="1.5"/>' +
    '<circle cx="17" cy="78" r="9" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<text x="17" y="82" text-anchor="middle" font-size="11" font-weight="700" fill="#111827">1</text>' +
    // ⚠ cy=12, not 9: at r=9 a marker centred on 9 puts its edge on y=0 and the
    //   2px stroke is half-clipped by the viewBox.
    '<line x1="145" y1="21" x2="145" y2="25" stroke="#334155" stroke-width="1.5"/>' +
    '<circle cx="145" cy="12" r="9" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<text x="145" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#111827">2</text>' +
    '<line x1="170" y1="140" x2="168" y2="131" stroke="#334155" stroke-width="1.5"/>' +
    '<circle cx="171" cy="149" r="9" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<text x="171" y="153" text-anchor="middle" font-size="11" font-weight="700" fill="#111827">3</text>' +
    '<line x1="253" y1="82" x2="241" y2="82" stroke="#334155" stroke-width="1.5"/>' +
    '<circle cx="263" cy="82" r="9" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<text x="263" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="#111827">4</text>' +
  '</svg></figure>';

STATIC_QUESTIONS.push(

  makeTask({
    id: 'g5sc-lbl-004', chapterId: 'g5sc-label', subsection: 'circuit', difficulty: 2,
    intro: 'The drawing shows a simple electric circuit. Four parts are marked with a number.',
    stimulus: { html: _CIRCUIT_FIG, altText: _CIRCUIT_ALT },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the parts marked <b>1</b>, <b>2</b>, <b>3</b> and <b>4</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3', '4'],
          answer: [
            ['cell', 'battery'],
            ['bulb', 'lamp', 'light bulb'],
            ['switch'],
            ['wire', 'conductor'],
          ],
          bank: ['switch', 'wire', 'motor', 'cell', 'bulb', 'plug'] },
        hint: 'Two of the six words are not in this circuit at all.',
        explanation: 'The <b>cell</b> (1) pushes the current round, the <b>bulb</b> (2) turns electrical energy into light, the <b>switch</b> (3) opens and closes the circuit, and the <b>wire</b> (4) carries the current between them. A cell is drawn as one long line and one short line.' },

      { label: 'b', marks: 1,
        prompt: 'Which numbered part lets you turn the bulb on and off without taking the circuit apart?',
        response: { kind: 'choice', answer: '3', options: ['3', '1', '2', '4'] },
        hint: 'It is the part with a gap that can be closed.',
        explanation: 'The <b>switch</b> (3) makes and breaks the circuit. Closing it completes the path so current can flow; opening it leaves a gap.' },

      { label: 'c', marks: 1,
        prompt: 'In this drawing the switch is <b>open</b>. Will the bulb light?',
        response: { kind: 'choice', answer: 'No, because the circuit is broken',
          options: ['No, because the circuit is broken', 'Yes, because the cell still has energy',
                    'Yes, but only very dimly', 'No, because the wire is too long'] },
        hint: 'Current needs a complete path all the way round.',
        explanation: 'The bulb will <b>not</b> light. An <b>open circuit</b> has a gap, so the current has no complete path. Closing the switch makes it a <b>closed circuit</b> and the bulb lights.' },
    ],
  }),

  makeTask({
    id: 'g5sc-lbl-001', chapterId: 'g5sc-label', subsection: 'flower', difficulty: 2,
    intro: 'The drawing shows a flower cut in half so you can see inside it.',
    stimulus: { html: _FLOWER_FIG, altText: _FLOWER_ALT },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the parts marked <b>1</b>, <b>2</b>, <b>3</b> and <b>4</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3', '4'],
          answer: [
            ['petal', 'petals'],
            ['anther'],
            ['stigma'],
            ['ovary'],
          ],
          bank: ['stigma', 'ovary', 'sepal', 'petal', 'filament', 'anther'] },
        hint: 'Two of the six words are not needed. Work from the outside of the flower inwards.',
        explanation: 'The <b>petal</b> (1) is the large coloured part that attracts insects. The <b>anther</b> (2) is the head of the stamen and makes the pollen. The <b>stigma</b> (3) is the sticky top of the pistil where pollen lands. The <b>ovary</b> (4) is the swollen base that holds the ovules and becomes the fruit.' },

      { label: 'b', marks: 1,
        prompt: 'Which numbered part makes the <b>pollen</b>?',
        response: { kind: 'choice', answer: '2', options: ['2', '1', '3', '4'] },
        hint: 'Pollen is made by the male part of the flower.',
        explanation: 'The <b>anther</b> (2) makes pollen. It sits on top of a thin stalk called the filament, and together they form the <b>stamen</b> — the male part of the flower.' },

      { label: 'c', marks: 1,
        prompt: 'Pollen must land on one part for the flower to be pollinated. Which number is it?',
        response: { kind: 'choice', answer: '3', options: ['3', '1', '2', '4'] },
        hint: 'It is sticky so that pollen grains hold on to it.',
        explanation: 'Pollen lands on the <b>stigma</b> (3), which is sticky for exactly that reason. The pollen then grows down the style to reach the ovules inside the <b>ovary</b> (4).' },
    ],
  }),

  makeTask({
    id: 'g5sc-lbl-002', chapterId: 'g5sc-label', subsection: 'flower', difficulty: 4,
    intro: 'Look again at the flower drawing. Part 4 is the ovary, and inside it you can see a small round ovule.',
    stimulus: { html: _FLOWER_FIG, altText: _FLOWER_ALT },
    parts: [
      { label: 'a', marks: 1,
        prompt: 'After pollination and fertilisation, what does the <b>ovary</b> become?',
        response: { kind: 'choice', answer: 'The fruit',
          options: ['The fruit', 'A new petal', 'A root', 'More pollen'] },
        hint: 'Think of a mango: what part of the flower was it once?',
        explanation: 'The <b>ovary</b> grows into the <b>fruit</b>, and each ovule inside it becomes a <b>seed</b>. A mango, a litchi and a tomato were all once the ovary of a flower.' },

      { label: 'b', marks: 1,
        prompt: 'Why is the part marked <b>1</b> usually brightly coloured?',
        response: { kind: 'choice', answer: 'To attract insects and birds that carry pollen',
          options: ['To attract insects and birds that carry pollen',
                    'To make food for the plant by photosynthesis',
                    'To protect the flower bud before it opens',
                    'To hold the flower up towards the sunlight'],
          },
        hint: 'What does the flower need a visitor to do for it?',
        explanation: 'Bright <b>petals</b> attract insects and birds. As a visitor feeds it brushes against the anthers, picks up pollen and carries it to the stigma of another flower. Protecting the bud is the job of the <b>sepals</b>, which are below the petals and outside this view.' },
    ],
  }),

  // ⚠ SAME FIGURE AS grade5-history/g5hg-lbl-002, AND THAT IS DELIBERATE. The
  //   file is already shipped, so a second pack using it costs nothing, and no
  //   child sees both packs. The QUESTIONS are different on purpose: the history
  //   pack asks for the names of the processes, this one asks what STATE the
  //   water is in at each point, which is what the Water & Matter chapter
  //   teaches. Re-using a figure is free; re-using a question would not be.
  makeTask({
    id: 'g5sc-lbl-003', chapterId: 'g5sc-label', subsection: 'water', difficulty: 3,
    intro: 'The diagram shows water moving between the sea, the sky and the land. Five places are marked with a letter.',
    stimulus: { html: _WATER_FIG, altText: _WATER_ALT },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'At <b>A</b>, <b>B</b> and <b>C</b>, is the water a <b>gas</b>, a <b>liquid</b> or a <b>solid</b>?',
        response: { kind: 'blanks', numeric: false,
          labels: ['A', 'B', 'C'],
          answer: [['gas'], ['liquid'], ['liquid']],
          bank: ['liquid', 'gas', 'solid'] },
        hint: 'The Sun turns water into something you cannot see; clouds and rain you can.',
        explanation: 'At <b>A</b> the Sun evaporates sea water into an invisible <b>gas</b> called water vapour. At <b>B</b> the vapour cools and condenses into tiny <b>liquid</b> droplets, which is why a cloud can be seen. At <b>C</b> those droplets join and fall as rain, still a <b>liquid</b>.' },

      { label: 'b', marks: 1,
        prompt: 'What is the invisible gas that rises from the sea at <b>A</b> called?',
        response: { kind: 'choice', answer: 'Water vapour',
          options: ['Water vapour', 'Oxygen', 'Carbon dioxide', 'Steam from a kettle'] },
        hint: 'It is water in its gas state, and you cannot see it.',
        explanation: '<b>Water vapour</b> is water in its gas state. You cannot see it — what you see rising from a kettle is vapour that has already cooled back into tiny liquid droplets.' },

      { label: 'c', marks: 1,
        prompt: 'The water at <b>E</b> has soaked down through the soil and rock. Where does most of it go in the end?',
        response: { kind: 'choice', answer: 'Back to the sea',
          options: ['Back to the sea', 'Up into the clouds directly',
                    'It stays underground for ever', 'It turns into solid rock'] },
        hint: 'Follow the arrows — the cycle has to join up.',
        explanation: 'Groundwater moves slowly through the rock and eventually reaches <b>the sea</b>, joining the water that flows there in rivers. That is what makes it a <b>cycle</b> — none of the water is lost, it just keeps moving.' },
    ],
  })

);
