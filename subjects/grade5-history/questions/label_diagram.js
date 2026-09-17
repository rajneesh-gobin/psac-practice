'use strict';
// Grade 5 History & Geography - Label the Diagram (bonus chapter)
//
// ⚠ `slots` questions, not a new type — see docs/label-diagrams/PLAN.md.
// ⚠ The word bank shows in PRACTICE only; the exam drops it and the child types.
//
// Figures (licence and author in docs/label-diagrams/provenance.json and
// assets/questions/CREDITS.md):
//   volcano-eruption-numbers.png  CC BY-SA 4.0  Sémhur
//   water-cycle-blank.png         CC BY-SA 3.0  Ingwik
//   river-course-numbers.png      CC BY-SA 3.0  Distorted
//
// ⚠ TWO KINDS OF FIGURE, AND THEY ARE AUTHORED DIFFERENTLY.
//   The volcano carries the illustrator's OWN numbers, so nothing here places a
//   marker: the key came from the Commons file description, which numbers all
//   twelve. The water cycle is genuinely blank, so _wcMark() overlays lettered
//   markers at PERCENTAGE coordinates — percentages, never pixels, so a marker
//   stays on its feature when the image scales on a phone.
//   ⚠ Markers are placed only on LARGE, unmistakable regions (the sea surface,
//   the cloud mass, the rain, the river, the ground below). A marker that needs
//   pixel accuracy to be on the right feature is a marker in the wrong place.
//
// ⚠ ALT TEXT NAMES THE SUBJECT, NEVER THE PARTS.
// IDs: g5hg-lbl-NNN

const _VOLCANO_FIG =
  '<figure class="q-fig"><img src="assets/questions/labels/volcano-eruption-numbers.png" ' +
  'alt="A cross-section of an erupting volcano with twelve features marked by number" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:380px;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';

// Overlay one lettered marker on a blank figure. left/top are percentages.
function _wcMark(letter, left, top) {
  return '<span style="position:absolute;left:' + left + '%;top:' + top + '%;transform:translate(-50%,-50%);' +
    'display:flex;align-items:center;justify-content:center;width:26px;height:26px;' +
    'border-radius:50%;background:rgba(255,255,255,.92);border:2px solid #111827;' +
    'font:700 14px/1 system-ui,sans-serif;color:#111827">' + letter + '</span>';
}

const _WATER_CYCLE_FIG =
  '<figure class="q-fig" style="position:relative;display:block;margin:8px auto;max-width:100%;width:420px">' +
  '<img src="assets/questions/labels/water-cycle-blank.png" ' +
  'alt="A landscape showing the water cycle, with five places marked by letter" ' +
  'style="display:block;width:100%;border:1px solid #cbd5e1;border-radius:8px;background:#fff">' +
  _wcMark('A', 86, 50) +   // the arrows rising off the sea
  _wcMark('B', 50, 26) +   // the cloud mass
  _wcMark('C', 23, 33) +   // the falling rain
  _wcMark('D', 55, 62) +   // the river running back to the sea
  _wcMark('E', 26, 74) +   // the water moving under the ground
  '</figure>';

const _RIVER_FIG =
  '<figure class="q-fig"><img src="assets/questions/labels/river-course-numbers.png" ' +
  'alt="A river running from mountains to the sea, with three parts of its course marked by number" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:400px;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';

STATIC_QUESTIONS.push(

  makeTask({
    id: 'g5hg-lbl-001', chapterId: 'g5enr-label', subsection: 'earth', difficulty: 2,
    intro: 'The diagram shows a volcano cut in half so you can see inside it.',
    stimulus: { html: _VOLCANO_FIG, altText: 'A cross-section of an erupting volcano with twelve features marked by number' },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the parts marked <b>3</b>, <b>6</b>, <b>10</b> and <b>11</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['3', '6', '10', '11'],
          answer: [
            ['crater'],
            ['lava flow', 'lava'],
            // ⚠ The illustrator's legend says "magma conduit"; the Mauritian
            //   syllabus and the Grade 5 notes call it the PIPE. Both accepted —
            //   a child must never lose a mark for the word their book uses.
            ['magma conduit', 'pipe', 'conduit'],
            ['magma chamber', 'chamber'],
          ],
          bank: ['lava flow', 'magma chamber', 'ash plume', 'crater', 'pipe', 'stratum'] },
        hint: 'Start at the bottom, where the molten rock is stored, and follow it upwards.',
        explanation: 'Magma is stored in the <b>magma chamber</b> (11), rises through the <b>pipe</b> or magma conduit (10), leaves through the <b>crater</b> (3) and runs down the slope as a <b>lava flow</b> (6). That is the order the eruption happens in.' },

      { label: 'b', marks: 1,
        prompt: 'What is the grey cloud marked <b>1</b>, rising high above the volcano?',
        response: { kind: 'choice', answer: 'An ash plume',
          options: ['An ash plume', 'A lava flow', 'A magma chamber', 'A crater lake'] },
        hint: 'It is made of the dust and tiny pieces thrown up by the eruption.',
        explanation: 'Part <b>1</b> is an <b>ash plume</b>. When the ash and dust settle and solidify they form <b>tuff</b> — which is how the tuffs of Rodrigues were made.' },

      { label: 'c', marks: 1,
        prompt: 'Part <b>7</b> is made of many layers of lava and ash, one on top of another. What does that tell you?',
        response: { kind: 'choice', answer: 'The volcano has erupted many times',
          options: ['The volcano has erupted many times', 'The volcano has never erupted',
                    'The volcano erupted only once', 'The layers were left by the sea'] },
        hint: 'Each eruption adds one more layer.',
        explanation: 'Each eruption leaves a layer, so many layers mean <b>many eruptions</b>. Mauritius, Rodrigues and R&eacute;union were all built this way, by repeated eruptions on the ocean floor.' },
    ],
  }),

  makeTask({
    id: 'g5hg-lbl-002', chapterId: 'g5enr-label', subsection: 'earth', difficulty: 3,
    intro: 'The diagram shows the <b>water cycle</b>. Five places are marked with a letter.',
    stimulus: { html: _WATER_CYCLE_FIG, altText: 'A landscape showing the water cycle, with five places marked by letter' },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'Name the process happening at <b>A</b>, at <b>B</b> and at <b>C</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['A', 'B', 'C'],
          answer: [
            ['evaporation', 'evaporating'],
            ['condensation', 'condensing'],
            ['precipitation', 'rain', 'rainfall', 'raining'],
          ],
          bank: ['condensation', 'run-off', 'evaporation', 'precipitation', 'groundwater'] },
        hint: 'The Sun lifts the water first, then it cools, then it falls.',
        explanation: 'At <b>A</b> the Sun causes <b>evaporation</b> from the sea. At <b>B</b> the rising vapour cools and <b>condensation</b> forms the clouds. At <b>C</b> the droplets grow heavy and fall as <b>precipitation</b> — rain.' },

      { label: 'b', marks: 1,
        prompt: 'What is happening at <b>D</b>, where the water runs across the land?',
        response: { kind: 'choice', answer: 'It is flowing back to the sea in a river',
          options: ['It is flowing back to the sea in a river', 'It is evaporating into the air',
                    'It is condensing into a cloud', 'It is freezing into ice'] },
        hint: 'Follow the channel downhill and see where it ends.',
        explanation: 'At <b>D</b> the water <b>flows back through rivers to the sea</b>, which completes the cycle. In Mauritius the rivers begin on the Central Plateau and run down to the coast.' },

      { label: 'c', marks: 1,
        prompt: 'At <b>E</b> the water is moving <b>under</b> the ground. What is this water called?',
        response: { kind: 'choice', answer: 'Groundwater',
          options: ['Groundwater', 'Water vapour', 'A cloud', 'A lagoon'] },
        hint: 'The name says where it is.',
        explanation: 'Water that soaks into the soil and rock and moves below the surface is <b>groundwater</b>. Much of the fresh water Mauritius uses is pumped from underground.' },
    ],
  }),

  // ⚠ THE KEY HERE IS READ FROM THE FIGURE, NOT FROM A LEGEND — the Commons
  //   description for this file says only "River scheme". Every other figure in
  //   these chapters is keyed from the illustrator's own numbered legend, which
  //   is the stronger source. So the questions below are written to be
  //   answerable from what the picture plainly SHOWS — mountains at 1, meanders
  //   at 2, the sea at 3 — and none of them depends on a term the illustrator
  //   might have meant differently.
  makeTask({
    id: 'g5hg-lbl-003', chapterId: 'g5enr-label', subsection: 'earth', difficulty: 3,
    intro: 'The diagram shows a river running from the mountains down to the sea. Three parts of its course are marked.',
    stimulus: { html: _RIVER_FIG, altText: 'A river running from mountains to the sea, with three parts of its course marked by number' },
    parts: [
      { label: 'a', marks: 3,
        prompt: 'Match each number to the part of the river’s course: <b>1</b>, <b>2</b>, <b>3</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3'],
          answer: [
            ['upper course', 'upper'],
            ['middle course', 'middle'],
            ['lower course', 'lower'],
          ],
          bank: ['lower course', 'upper course', 'middle course'] },
        hint: 'A river always begins at its highest point and ends at the sea.',
        explanation: 'A river begins in the <b>upper course</b> (1) high in the mountains, widens through the <b>middle course</b> (2) where it starts to bend, and reaches the sea in the <b>lower course</b> (3).' },

      { label: 'b', marks: 1,
        prompt: 'At <b>3</b> the river splits into several channels as it enters the sea. What is this landform called?',
        response: { kind: 'choice', answer: 'A delta',
          options: ['A delta', 'A plateau', 'A crater', 'A lagoon'] },
        hint: 'It is named after a Greek letter shaped like a triangle.',
        explanation: 'Where a river drops its load and splits into channels at its mouth it builds a <b>delta</b>. Mauritian rivers are far too short and fast to build one, so you will not see a delta on the island.' },

      { label: 'c', marks: 1,
        prompt: 'Near <b>1</b> the valley is narrow and steep; near <b>3</b> it is wide and flat. Why?',
        response: { kind: 'choice', answer: 'It cuts downwards high up and sideways lower down',
          options: ['It cuts downwards high up and sideways lower down',
                    'The river carries no water in its upper course',
                    'The rock at the top is softer than at the bottom',
                    'The sea washes the upper valley away each year'] },
        hint: 'Think about how steeply the land falls at each point.',
        explanation: 'In the <b>upper course</b> the steep slope makes the water cut <b>downwards</b>, carving a narrow V-shaped valley. Lower down the gradient is gentle, so the river swings <b>sideways</b> and widens its valley — which is how the Black River Gorges were carved in Mauritius.' },
    ],
  })

);
