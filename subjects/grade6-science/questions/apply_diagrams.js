'use strict';
// Grade 6 Science - DIAGRAM-READING questions, built on the artwork cropped
// from the real MES papers (assets/past-papers/g6-science-20xx/).
//
// WHY THIS FILE EXISTS
// Measured 2026-09-08 by classifying the Science 2024 modular paper against its
// own mark allocations, and a random 40-item sample of the bank against the
// same scheme:
//
//              recall   apply (read a diagram)   explain
//   paper        46%            30%                24%
//   bank         65%          17.5%              17.5%
//
// Reading a diagram is a separately assessed skill - the 2024 Science paper
// alone makes 31 references to a Diagram/Picture/Table - and it was the bank's
// largest single gap. Every question here is unanswerable without looking at
// the picture: nothing in the stem carries the answer.
//
// ⚠ These raise the APPLY share, not the difficulty band. By the criteria in
//   scripts/audit-difficulty-labels.js a plain "read a value off the stimulus"
//   is L2; only interpreting it (completing a chain, comparing, combining two
//   readings) is L3. Both are here, labelled honestly rather than inflated.
// ⚠ Alt text says what a reader would see, never what the question is testing.

const _g6scApply = (year, file, alt) =>
  `<img src="assets/past-papers/g6-science-${year}/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

const _ALT = {
  airPie:   'A pie chart divided into four parts, each labelled with a percentage, one slice labelled Gas P',
  eco22:    'A labelled outdoor scene with plants, small animals and a stream',
  eco24:    'A labelled diagram of an ecosystem',
  lettuce:  'A labelled garden scene with rows of leafy plants',
  station:  'A labelled cross-section of a power station and the pylons leading away from it',
  plane:    'A side view of an airplane with three parts labelled',
  teeth:    'Three teeth drawn side by side, each above an empty box',
  animals3: 'Three animals drawn side by side, each with its name underneath',
  car:      'A drawing of a car with several of its parts labelled',
  tv:       'A drawing of a switched-on television with arrows leaving it',
  tubes:    'Three test tubes side by side, each holding a pin, with the contents of each tube labelled',
  street:   'A street scene with vehicles, people and a factory in the background',
  waste:    'Three separate groups of discarded items',
  plantGas: 'A drawing of a plant with two arrows labelled Gas A and Gas B',
  umbrella: 'A drawing of an open umbrella with one part labelled X',
};

STATIC_QUESTIONS.push(

  // ── Reading a chart ──────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-apply-001', chapterId:'g6-air', subsection:'composition', difficulty:3,
    question:'<b>Diagram 3</b> shows the percentage composition of gases in dry air.' +
      _g6scApply(2024,'d3-air-pie',_ALT.airPie) +
      'Together, the slice labelled <b>Gas P</b> and the largest slice make up what percentage of dry air?',
    options:['99.1%','78.1%','21.0%','89.1%'], answer:'99.1%',
    hint:'Read the two percentages off the chart, then add them.',
    explanation:'Gas P is the 21.0% slice and the largest slice is 78.1%. 21.0 + 78.1 = <b>99.1%</b>. The remaining 0.9% is argon and carbon dioxide.' }),

  makeMCQ({ id:'g6sc-apply-002', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'<b>Diagram 3</b> shows the percentage composition of gases in dry air.' +
      _g6scApply(2024,'d3-air-pie',_ALT.airPie) +
      'Which slice on the chart is the <b>smallest</b>?',
    options:['The 0.03% slice','The 0.87% slice','The 21.0% slice','The 78.1% slice'], answer:'The 0.03% slice',
    hint:'Compare the four numbers written around the chart.',
    explanation:'0.03% is the smallest of the four figures shown, and on the chart it is the thinnest sliver. That slice is carbon dioxide.' }),

  // ── Reading a food chain out of a scene ──────────────────────────────────

  makeMCQ({ id:'g6sc-apply-003', chapterId:'g6-ecosystems', subsection:'food_webs', difficulty:3,
    question:'<b>Diagram 7</b> shows an ecosystem.' +
      _g6scApply(2022,'d7-ecosystem',_ALT.eco22) +
      'Use the diagram to complete the food chain: <b>grass → ……… → chameleon</b>',
    options:['Grasshopper','Rock','River','Sun'], answer:'Grasshopper',
    hint:'Which living thing in the picture eats grass, and is small enough for a chameleon to catch?',
    explanation:'The grasshoppers feed on the grass, and the chameleon feeds on the grasshoppers: <b>grass → grasshopper → chameleon</b>. The rock, river and Sun are non-living and cannot be part of a food chain.' }),

  makeMCQ({ id:'g6sc-apply-004', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:3,
    question:'<b>Diagram 7</b> shows an ecosystem.' +
      _g6scApply(2022,'d7-ecosystem',_ALT.eco22) +
      'Which labelled thing in the diagram is <b>not living</b>?',
    options:['The rock','The grass','The grasshopper','The chameleon'], answer:'The rock',
    hint:'A non-living thing was never alive. Three of the four labels name living things.',
    explanation:'The <b>rock</b> is non-living. The grass, grasshopper and chameleon are all living things. The river and the Sun in the picture are non-living too.' }),

  makeMCQ({ id:'g6sc-apply-005', chapterId:'g6-ecosystems', subsection:'food_webs', difficulty:3,
    question:'<b>Diagram 9</b> shows an ecosystem.' +
      _g6scApply(2024,'d9-ecosystem',_ALT.eco24) +
      'Which living thing in the diagram is the <b>producer</b>?',
    options:['The algae','The bird','The small fish','The big fish'], answer:'The algae',
    hint:'A producer makes its own food using sunlight. Which labelled living thing is a plant?',
    explanation:'The <b>algae</b> are plants: they make their own food using sunlight, so they are the producer. The small fish, big fish and bird are all consumers.' }),

  makeMCQ({ id:'g6sc-apply-006', chapterId:'g6-ecosystems', subsection:'food_webs', difficulty:3,
    question:'<b>Diagram 5</b> shows part of a vegetable garden.' +
      _g6scApply(2019,'d5-lettuce-snails',_ALT.lettuce) +
      'Use the diagram to complete the food chain: <b>Sun → ……… → snail</b>',
    options:['Lettuce','Soil','Water','Stone'], answer:'Lettuce',
    hint:'What are the snails in the picture eating?',
    explanation:'The lettuce plants use energy from the Sun to make their food, and the snails feed on the lettuce: <b>Sun → lettuce → snail</b>.' }),

  makeMCQ({ id:'g6sc-apply-007', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'<b>Diagram 5</b> shows part of a vegetable garden.' +
      _g6scApply(2019,'d5-lettuce-snails',_ALT.lettuce) +
      'Which labelled thing in the diagram is <b>not living</b>?',
    options:['The soil','The lettuce','The snail','The leaves'], answer:'The soil',
    hint:'Three of these grow or move. One does not.',
    explanation:'The <b>soil</b> is non-living. The lettuce, its leaves and the snails are all living. The Sun, also labelled, is non-living as well.' }),

  // ── Reading a labelled machine ───────────────────────────────────────────

  makeMCQ({ id:'g6sc-apply-008', chapterId:'g6-energy', subsection:'transfer', difficulty:3,
    question:'<b>Diagram 6</b> shows a thermal power station.' +
      _g6scApply(2021,'d6-power-station',_ALT.station) +
      'According to the diagram, which labelled part drives the <b>generator</b>?',
    options:['The turbine','The steam','The boiling water','The burning fuel'], answer:'The turbine',
    hint:'Follow the labels from left to right and find the part joined directly to the generator.',
    explanation:'The steam spins the <b>turbine</b>, and the turbine is joined to the generator, which produces the electricity. The burning fuel and boiling water come earlier in the chain.' }),

  makeMCQ({ id:'g6sc-apply-009', chapterId:'g6-energy', subsection:'transfer', difficulty:2,
    question:'<b>Diagram 6</b> shows a thermal power station.' +
      _g6scApply(2021,'d6-power-station',_ALT.station) +
      'According to the diagram, what is heated to produce the <b>steam</b>?',
    options:['Water','Oil','Air','Sand'], answer:'Water',
    hint:'Look at the label directly under the steam.',
    explanation:'The label reads <b>boiling water</b>: the burning fuel heats water, and the water boils to make steam.' }),

  makeMCQ({ id:'g6sc-apply-010', chapterId:'g6-energy', subsection:'forms', difficulty:2,
    question:'<b>Diagram 5</b> shows a television set that has been switched on.' +
      _g6scApply(2022,'d5-television',_ALT.tv) +
      'What is the form of energy at the <b>input</b>?',
    options:['Electrical','Light','Sound','Movement'], answer:'Electrical',
    hint:'The input is what goes into the set, not what comes out of it.',
    explanation:'A television is plugged in, so <b>electrical</b> energy is the input. Light, sound and heat are the outputs shown by the arrows leaving the set.' }),

  // ── Reading materials off a labelled object ──────────────────────────────

  makeMCQ({ id:'g6sc-apply-011', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'<b>Diagram 8</b> shows an airplane with three of its parts labelled.' +
      _g6scApply(2021,'d8-airplane',_ALT.plane) +
      'Which labelled part must be made of a <b>transparent</b> material?',
    options:['The windscreen','The body','The tyres','The wings'], answer:'The windscreen',
    hint:'Which labelled part must the pilot be able to see through?',
    explanation:'The <b>windscreen</b> must be transparent so the pilot can see out. It is made of toughened glass or clear plastic. The body and tyres do not need to be seen through.' }),

  makeMCQ({ id:'g6sc-apply-012', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'<b>Diagram 4</b> shows a car with several parts labelled.' +
      _g6scApply(2022,'d4-car',_ALT.car) +
      'Which labelled part is made of <b>glass</b>?',
    options:['The windshield','The body','The bumper','The wheels'], answer:'The windshield',
    hint:'Which part does the driver look through?',
    explanation:'The <b>windshield</b> is made of glass, because glass is transparent and can be toughened so it does not shatter into sharp pieces.' }),

  makeMCQ({ id:'g6sc-apply-013', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'<b>Diagram 1</b> shows an umbrella. Part <b>X</b> is the canopy.' +
      _g6scApply(2024,'d1-umbrella',_ALT.umbrella) +
      'Which property must part <b>X</b> have?',
    options:['Waterproof','Magnetic','Transparent','Very heavy'], answer:'Waterproof',
    hint:'An umbrella is used in the rain. What must the top not let through?',
    explanation:'Part X is the canopy, the part the rain falls on, so it must be <b>waterproof</b>. Being magnetic, transparent or heavy would not help at all.' }),

  // ── Reading an experiment set-up ─────────────────────────────────────────

  makeMCQ({ id:'g6sc-apply-014', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'<b>Diagram 6</b> shows three test tubes, each holding an iron pin.' +
      _g6scApply(2024,'d6-rusting',_ALT.tubes) +
      'According to the labels, which tube holds its pin in <b>dry air</b>?',
    options:['Tube C','Tube A','Tube B','Tubes A and B'], answer:'Tube C',
    hint:'Read the label beside each tube.',
    explanation:'Tube C is labelled <b>dry air</b> and is closed with a cork to keep damp air out. Tube A holds oil over water and tube B holds water.' }),

  makeMCQ({ id:'g6sc-apply-015', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'<b>Diagram 6</b> shows three test tubes, each holding an iron pin.' +
      _g6scApply(2024,'d6-rusting',_ALT.tubes) +
      'Which tube has a layer of <b>oil</b> resting on top of the water?',
    options:['Tube A','Tube B','Tube C','Tubes B and C'], answer:'Tube A',
    hint:'Only one tube has two liquids in it, one floating on the other.',
    explanation:'Tube <b>A</b> is labelled oil above water. The oil floats on the water and seals the surface, keeping air away from the pin.' }),

  // ── Reading animals off a diagram ────────────────────────────────────────

  makeMCQ({ id:'g6sc-apply-016', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'<b>Diagram 3</b> shows three animals.' +
      _g6scApply(2022,'d3-animals',_ALT.animals3) +
      'Which of them has a body covered with <b>feathers</b>?',
    options:['The hen','The shark','The bat','None of them'], answer:'The hen',
    hint:'Only one of the three is a bird.',
    explanation:'The <b>hen</b> is a bird, and birds are the only animals with feathers. The shark has scales and the bat has fur.' }),

  makeMCQ({ id:'g6sc-apply-017', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'<b>Diagram 3</b> shows three animals.' +
      _g6scApply(2022,'d3-animals',_ALT.animals3) +
      'Which of them has <b>wings but no feathers</b>?',
    options:['The bat','The hen','The shark','Both hen and bat'], answer:'The bat',
    hint:'Two of the animals can fly. Only one of those two has fur.',
    explanation:'The <b>bat</b> has wings made of skin stretched over long finger bones, and its body is covered with fur, not feathers. The hen has wings and feathers; the shark has neither.' }),

  makeMCQ({ id:'g6sc-apply-018', chapterId:'g6-animals', subsection:'teeth', difficulty:2,
    question:'<b>Diagram 3</b> shows three types of human teeth.' +
      _g6scApply(2021,'d3-teeth',_ALT.teeth) +
      'Which of the three is the <b>widest and flattest</b>?',
    options:['The first, on the left','The second, in the middle','The third, on the right','All three are alike'],
    answer:'The first, on the left',
    hint:'Compare the shape of the three crowns at the top of each tooth.',
    explanation:'The first tooth has a wide, flat crown with two roots - that is a <b>molar</b>, shaped for grinding food. The other two are narrower and pointed.' }),

  // ── Reading a scene ──────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-apply-019', chapterId:'g6-air', subsection:'pollution', difficulty:3,
    question:'<b>Diagram 4</b> shows a polluted area.' +
      _g6scApply(2024,'d4-pollution',_ALT.street) +
      'Which <b>two</b> things in the picture are giving off smoke?',
    options:['The factory and the bus','The trees and the bushes','The cyclist and the walker','The road and the crossing'],
    answer:'The factory and the bus',
    hint:'Look for grey clouds coming out of something. There are two places they come from.',
    explanation:'Smoke rises from the <b>factory chimneys</b> and from the exhaust of the <b>bus and cars</b>. Those are the two sources of air pollution shown.' }),

  makeMCQ({ id:'g6sc-apply-020', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:2,
    question:'The diagram shows a plant in sunlight. It takes in <b>Gas A</b> and gives out <b>Gas B</b> while making its food.' +
      _g6scApply(2023,'d6-plant-gases',_ALT.plantGas) +
      'What is <b>Gas B</b>?',
    options:['Oxygen','Carbon dioxide','Nitrogen','Water vapour'], answer:'Oxygen',
    hint:'In photosynthesis a plant takes in carbon dioxide. What does it release?',
    explanation:'During photosynthesis a plant takes in carbon dioxide (Gas A) and releases <b>oxygen</b> (Gas B). This is why plants keep the oxygen in the air topped up.' })

);
