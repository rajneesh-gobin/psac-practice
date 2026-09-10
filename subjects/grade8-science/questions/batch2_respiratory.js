'use strict';

(function () {

const CH = 'g8s-respiratory';

const alveoli = () => {
  let s = '';
  [[58, 120], [74, 118], [64, 134], [80, 132], [70, 146]].forEach(p => {
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" fill="#fda4af" stroke="#9f1239" stroke-width="1.5"/>';
  });
  return s;
};

const chest =
  '<svg viewBox="0 0 200 195" width="215" role="img" aria-label="a diagram of a body system with four labelled parts">' +
  '<ellipse cx="62" cy="112" rx="34" ry="46" fill="#fce7f3" stroke="#9f1239" stroke-width="2"/>' +
  '<ellipse cx="138" cy="112" rx="34" ry="46" fill="#fce7f3" stroke="#9f1239" stroke-width="2"/>' +
  '<rect x="94" y="8" width="12" height="46" rx="5" fill="#e0f2fe" stroke="#0369a1" stroke-width="2"/>' +
  '<line x1="100" y1="54" x2="70" y2="86" stroke="#0369a1" stroke-width="6" stroke-linecap="round"/>' +
  '<line x1="100" y1="54" x2="130" y2="86" stroke="#0369a1" stroke-width="6" stroke-linecap="round"/>' +
  '<line x1="70" y1="86" x2="66" y2="112" stroke="#0369a1" stroke-width="3" stroke-linecap="round"/>' +
  alveoli() +
  '<path d="M18 164 Q100 190 182 164" fill="none" stroke="#7c2d12" stroke-width="7" stroke-linecap="round"/>' +
  '<circle cx="100" cy="30" r="9" fill="#1d4ed8"/><text x="100" y="34" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">A</text>' +
  '<circle cx="120" cy="72" r="9" fill="#1d4ed8"/><text x="120" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">B</text>' +
  '<line x1="30" y1="132" x2="48" y2="132" stroke="#1d4ed8" stroke-width="2"/>' +
  '<circle cx="20" cy="132" r="9" fill="#1d4ed8"/><text x="20" y="136" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">C</text>' +
  '<circle cx="100" cy="176" r="9" fill="#1d4ed8"/><text x="100" y="180" font-size="11" font-weight="bold" text-anchor="middle" fill="#ffffff">D</text>' +
  '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-respiratory-016', chapterId: CH, difficulty: 2, subsection: 'respiratory_organs',
    question: 'The diagram shows part of a body system.' + chest + 'At which labelled part does gas exchange with the blood take place?',
    options: ['C', 'A', 'B', 'D'],
    answer: 'C',
    hint: 'Gas exchange needs a huge surface, so look for the tiny sacs rather than the tubes.',
    explanation: 'C points to the alveoli, the air sacs where oxygen and carbon dioxide cross into and out of the blood. A and B are the trachea and a bronchus, which only carry air, and D is a sheet of muscle that has no air in it at all.'
  }),

  makeMCQ({
    id: 'g8s-respiratory-017', chapterId: CH, difficulty: 2, subsection: 'breathing_process',
    question: 'Look again at the same diagram.' + chest + 'Which labelled part contracts and flattens when you breathe in?',
    options: ['D', 'A', 'B', 'C'],
    answer: 'D',
    hint: 'Breathing in makes the chest bigger. Which of the four is a muscle?',
    explanation: 'D is the diaphragm: it contracts, flattens, increases the volume of the chest and lowers the pressure so air rushes in. A, B and C are airways and air sacs, none of which can contract.'
  }),

  makeNum({
    id: 'g8s-respiratory-018', chapterId: CH, difficulty: 2, subsection: 'gas_exchange',
    question: 'Inhaled air contains about 0.04% carbon dioxide and exhaled air about 4%. How many times more carbon dioxide is there in exhaled air?',
    answer: 100,
    hint: 'Divide the larger percentage by the smaller one.',
    explanation: '4 &divide; 0.04 = 100, so exhaled air holds a hundred times more carbon dioxide. Subtracting instead gives 3.96, which is the difference in percentage points, not the number of times.'
  }),

  makeMCQ({
    id: 'g8s-respiratory-019', chapterId: CH, difficulty: 3, subsection: 'gas_exchange',
    question: 'In some lung diseases the walls of the alveoli become thick and scarred. What is the direct effect on the patient?',
    options: ['Less oxygen enters the blood', 'More oxygen enters the blood', 'The trachea becomes narrow', 'The ribs stop moving'],
    answer: 'Less oxygen enters the blood',
    hint: 'Gases must diffuse across the alveolus wall. What does a thicker wall do to that journey?',
    explanation: 'Oxygen has to diffuse further through a thick wall, so less of it reaches the blood and the patient becomes breathless. Thickening the wall cannot increase oxygen uptake, and it changes neither the width of the trachea nor the movement of the ribs.'
  }),

  makeText({
    id: 'g8s-respiratory-020', chapterId: CH, difficulty: 2, subsection: 'respiratory_organs',
    question: 'The trachea divides into two large tubes, one going to each lung. What are these two tubes called?',
    answer: 'bronchi',
    alsoAccept: ['the bronchi', 'bronchus', 'bronchi tubes'],
    hint: 'The single tube is a bronchus; you need the plural.',
    explanation: 'The trachea splits into the two bronchi, one per lung, and each bronchus then branches into bronchioles ending in alveoli. Bronchioles are the much smaller branches further on, and alveoli are the air sacs at the very end.'
  })

);

})();
