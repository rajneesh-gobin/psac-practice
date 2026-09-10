'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({
    id: 'g7s-cells-017', chapterId: 'g7s-cells', difficulty: 2,
    subsection: 'cell_parts',
    question: 'Look at the labelled diagram. Which labelled part is where <b>photosynthesis</b> takes place?' +
      '<svg viewBox="0 0 280 170" width="290" role="img" aria-label="a labelled diagram of a cell">' +
      '<rect x="40" y="25" width="190" height="105" rx="8" fill="#f8fafc" stroke="#0f172a" stroke-width="4"/>' +
      '<rect x="47" y="32" width="176" height="91" rx="6" fill="none" stroke="#334155" stroke-width="1.5"/>' +
      '<ellipse cx="118" cy="80" rx="46" ry="30" fill="#dbeafe" stroke="#334155" stroke-width="1.5"/>' +
      '<circle cx="192" cy="62" r="16" fill="#e9d5ff" stroke="#334155" stroke-width="1.5"/>' +
      '<circle cx="192" cy="62" r="5" fill="#a855f7"/>' +
      '<ellipse cx="82" cy="46" rx="10" ry="6" fill="#86efac" stroke="#166534" stroke-width="1.2"/>' +
      '<ellipse cx="78" cy="112" rx="10" ry="6" fill="#86efac" stroke="#166534" stroke-width="1.2"/>' +
      '<ellipse cx="186" cy="106" rx="10" ry="6" fill="#86efac" stroke="#166534" stroke-width="1.2"/>' +
      '<line x1="26" y1="20" x2="46" y2="30" stroke="#334155" stroke-width="1.2"/>' +
      '<text x="16" y="18" font-size="12" font-weight="bold" fill="#0f172a">W</text>' +
      '<line x1="246" y1="44" x2="206" y2="56" stroke="#334155" stroke-width="1.2"/>' +
      '<text x="250" y="42" font-size="12" font-weight="bold" fill="#0f172a">X</text>' +
      '<line x1="242" y1="116" x2="197" y2="107" stroke="#334155" stroke-width="1.2"/>' +
      '<text x="246" y="120" font-size="12" font-weight="bold" fill="#0f172a">Y</text>' +
      '<line x1="114" y1="146" x2="118" y2="110" stroke="#334155" stroke-width="1.2"/>' +
      '<text x="108" y="158" font-size="12" font-weight="bold" fill="#0f172a">Z</text>' +
      '</svg>',
    options: ['Y', 'W', 'X', 'Z'],
    answer: 'Y',
    hint: 'Look for the small green structures inside the cell.',
    explanation: 'Y points to a chloroplast, the green structure that traps light for photosynthesis. W is the thick outer wall that gives shape, X is the nucleus that controls the cell, and Z is the large vacuole that stores water and sap.'
  }),
  makeText({
    id: 'g7s-cells-018', chapterId: 'g7s-cells', difficulty: 2,
    subsection: 'animal_plant_cells',
    question: 'Name the green pigment inside a chloroplast that traps sunlight.',
    answer: 'chlorophyll', alsoAccept: ['chlorophyl'],
    hint: 'Its name begins with the same six letters as the structure that holds it.',
    explanation: 'Chlorophyll is the pigment; the chloroplast is the structure that contains it. Chlorophyll absorbs light energy, which is why plant leaves look green.'
  }),
  makeNum({
    id: 'g7s-cells-019', chapterId: 'g7s-cells', difficulty: 3,
    subsection: 'cell_characteristics',
    question: 'A cell is 0.05 mm wide. Under a microscope set to ×100, how wide does the cell appear, in millimetres?',
    answer: 5, acceptableAnswers: ['5', '5 mm', '5.0'],
    hint: 'Magnification tells you how many times bigger the image is than the real thing.',
    explanation: '0.05 × 100 = 5 mm, which is why a microscope makes a cell visible at all. Dividing by 100 gives 0.0005 mm, which would make the cell smaller, not bigger.'
  }),
  makeMCQ({
    id: 'g7s-cells-020', chapterId: 'g7s-cells', difficulty: 3,
    subsection: 'animal_plant_cells',
    question: 'Onion cells keep a fixed, brick-like shape but cheek cells do not. Which part explains the difference?',
    options: ['Cell wall', 'Cell membrane', 'Cytoplasm', 'Nucleus'],
    answer: 'Cell wall',
    hint: 'Which structure does an onion cell have that a cheek cell has not?',
    explanation: 'Only the plant cell has a rigid cell wall of cellulose outside the membrane, and that is what holds the brick shape. Both cells have a membrane, cytoplasm and nucleus, so none of those can be the difference.'
  })
);
