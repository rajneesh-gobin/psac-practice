'use strict';
// Grade 7 Science - Label the Diagram (bonus chapter)
//
// ⚠ THESE ARE `slots` QUESTIONS, NOT A NEW TYPE. A labelling question is a
// `blanks` part: several answer boxes, a list of acceptable words per box,
// partial credit, marked by Assessment.markPart() in the browser AND by
// netlify/lib/questions-sandbox.js on the server. Nothing new was added to the
// factories — see docs/label-diagrams/PLAN.md for why that mattered.
//
// ⚠ The word bank (`bank`) is shown in PRACTICE ONLY. renderAnswerArea() drops
// it when the container is the exam's, so the paper behaves like a paper: the
// child types. Same rule the read-aloud follows.
//
// ⚠ The figures are Wikimedia Commons diagrams whose numbered variant carries
// NO words — the illustrator drew the markers, so nothing here hand-places a
// coordinate. Licence and author are recorded in docs/label-diagrams/provenance.json
// and must appear in assets/questions/CREDITS.md before release.
//   plant-cell-numbers.png   CC BY 4.0     domdomegg
//   animal-cell-numbers.png  CC BY 4.0     domdomegg
//
// ⚠ The numbering is SHARED between the two diagrams by the illustrator's own
// design: 1 cytoplasm, 2 nucleus, 3 cell membrane, 4 mitochondrion in both.
// Verified against the "(en)" siblings on Commons, marker by marker, rather
// than inferred from the file description.
//
// ⚠ ALT TEXT NAMES THE SUBJECT, NEVER THE PARTS.
// IDs: g7s-lbl-NNN

const _G7_PLANT_CELL =
  '<figure class="q-fig"><img src="assets/questions/labels/plant-cell-numbers.png" ' +
  'alt="A diagram of a plant cell with seven parts marked by number" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:340px;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';

const _G7_ANIMAL_CELL =
  '<figure class="q-fig"><img src="assets/questions/labels/animal-cell-numbers.png" ' +
  'alt="A diagram of an animal cell with four parts marked by number" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:340px;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';

// ⚠ The comparison figure draws a number's line to BOTH cells when the part is
//   shared and to the plant only when it is not — so the picture itself answers
//   "which parts does a plant cell have that an animal cell does not", and the
//   question below is a reading of the diagram rather than recall.
const _G7_CELLS_COMPARED =
  '<figure class="q-fig"><img src="assets/questions/labels/cells-compared-numbers.png" ' +
  'alt="An animal cell and a plant cell side by side, with seven parts marked by number" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:440px;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></figure>';

STATIC_QUESTIONS.push(

  makeTask({
    id: 'g7s-lbl-001', chapterId: 'g7enr-label', subsection: 'cells', difficulty: 2,
    intro: 'The diagram shows a <b>plant cell</b>. Each part is marked with a number.',
    stimulus: { html: _G7_PLANT_CELL, altText: 'A diagram of a plant cell with seven parts marked by number' },
    parts: [
      { label: 'a', marks: 5,
        prompt: 'Name the parts marked <b>1</b>, <b>2</b>, <b>3</b>, <b>5</b> and <b>7</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3', '5', '7'],
          answer: [
            ['cytoplasm'],
            ['nucleus'],
            ['cell membrane', 'plasma membrane', 'membrane'],
            ['cell wall', 'cellulose cell wall'],
            ['chloroplast', 'chloroplasts'],
          ],
          // ⚠ Two spares, and authored in a fixed scrambled order — the renderer
          //   must not shuffle, or a re-render moves a word under the finger.
          bank: ['nucleus', 'chloroplast', 'mitochondrion', 'cell wall',
                 'cytoplasm', 'permanent vacuole', 'cell membrane'] },
        hint: 'Work from the outside in: two of these are the boundary of the cell.',
        explanation: 'In this diagram <b>1</b> is the cytoplasm, <b>2</b> the nucleus, <b>3</b> the cell membrane, <b>5</b> the cellulose cell wall and <b>7</b> a chloroplast. The two words left over — mitochondrion and permanent vacuole — are parts 4 and 6.' },

      { label: 'b', marks: 1,
        prompt: 'What is the large part marked <b>6</b>?',
        response: { kind: 'choice', answer: 'The permanent vacuole',
          options: ['The permanent vacuole', 'The nucleus', 'A chloroplast', 'The cell wall'] },
        hint: 'It takes up much of the middle of the cell and stores cell sap.',
        explanation: 'Part <b>6</b> is the <b>permanent vacuole</b>. It is filled with cell sap and helps keep the plant cell firm. Animal cells have no permanent vacuole of this kind.' },

      { label: 'c', marks: 1,
        prompt: 'Which numbered part traps sunlight so the plant can make its food?',
        response: { kind: 'choice', answer: '7',
          options: ['7', '6', '2', '3'] },
        hint: 'Look for the small green ovals.',
        explanation: 'Part <b>7</b> is a <b>chloroplast</b>. Chloroplasts contain chlorophyll, which traps light energy for photosynthesis — and they are one of the parts an animal cell does not have.' },
    ],
  }),

  makeTask({
    id: 'g7s-lbl-002', chapterId: 'g7enr-label', subsection: 'cells', difficulty: 2,
    intro: 'The diagram shows an <b>animal cell</b>. The numbers mean the same parts as they do on the plant cell diagram.',
    stimulus: { html: _G7_ANIMAL_CELL, altText: 'A diagram of an animal cell with four parts marked by number' },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the parts marked <b>1</b>, <b>2</b>, <b>3</b> and <b>4</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '3', '4'],
          answer: [
            ['cytoplasm'],
            ['nucleus'],
            ['cell membrane', 'plasma membrane', 'membrane'],
            ['mitochondrion', 'mitochondria'],
          ],
          bank: ['cell membrane', 'cytoplasm', 'chloroplast', 'mitochondrion', 'nucleus', 'cell wall'] },
        hint: 'Two of the words in the list belong to a plant cell only.',
        explanation: '<b>1</b> cytoplasm, <b>2</b> nucleus, <b>3</b> cell membrane, <b>4</b> mitochondrion. The spare words — chloroplast and cell wall — are found in plant cells, not animal cells.' },

      { label: 'b', marks: 1,
        prompt: 'What is the part marked <b>3</b>, on the very edge of the cell?',
        response: { kind: 'choice', answer: 'The cell membrane',
          options: ['The cell membrane', 'The cell wall', 'The cytoplasm', 'The nucleus'] },
        hint: 'An animal cell has no wall, so what forms its boundary?',
        explanation: 'Part <b>3</b> is the <b>cell membrane</b>. It controls what enters and leaves the cell. An animal cell has no cell wall, so the membrane is its outer boundary.' },
    ],
  }),

  makeTask({
    id: 'g7s-lbl-003', chapterId: 'g7enr-label', subsection: 'cells', difficulty: 4,
    intro: 'This diagram puts the two cells side by side: the <b>animal cell</b> on the left and the <b>plant cell</b> on the right. A number with a line to <b>both</b> cells is a part they share.',
    stimulus: { html: _G7_CELLS_COMPARED, altText: 'An animal cell and a plant cell side by side, with seven parts marked by number' },
    parts: [
      { label: 'a', marks: 1,
        prompt: 'Parts <b>5</b>, <b>6</b> and <b>7</b> are marked on the plant cell but on no animal cell. What are they?',
        response: { kind: 'choice',
          answer: 'Cell wall, permanent vacuole and chloroplast',
          options: ['Cell wall, permanent vacuole and chloroplast',
                    'Nucleus, cytoplasm and cell membrane',
                    'Mitochondrion, nucleus and cytoplasm',
                    'Cell membrane, cell wall and nucleus'] },
        hint: 'Which three jobs does a plant need doing that an animal does not?',
        explanation: 'A plant cell has a <b>cell wall</b> for support, a <b>permanent vacuole</b> to keep it firm, and <b>chloroplasts</b> to make food. An animal moves and eats, so it needs none of the three.' },

      { label: 'b', marks: 1,
        prompt: 'The same numbers mean the same parts on both diagrams. Which numbers appear on <b>both</b>?',
        response: { kind: 'choice', answer: '1, 2, 3 and 4',
          options: ['1, 2, 3 and 4', '1, 2 and 5', '5, 6 and 7', '2, 4 and 6'] },
        hint: 'These are the parts every living cell must have.',
        explanation: '<b>1, 2, 3 and 4</b> — cytoplasm, nucleus, cell membrane and mitochondrion — appear on both, because both plant and animal cells have them. That is why the illustrator kept the numbering the same across the series.' },
    ],
  })

);
