'use strict';

(function () {

const CH = 'g8s-inquiry';

const resultsTable =
  '<table style="border-collapse:collapse;margin:8px 0;font-size:0.95em">' +
  '<tr><th style="border:1px solid #94a3b8;padding:4px 10px">Load / N</th>' +
  '<th style="border:1px solid #94a3b8;padding:4px 10px">Extension / cm</th></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">10</td><td style="border:1px solid #94a3b8;padding:4px 10px">4</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">20</td><td style="border:1px solid #94a3b8;padding:4px 10px">8</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">30</td><td style="border:1px solid #94a3b8;padding:4px 10px">21</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">40</td><td style="border:1px solid #94a3b8;padding:4px 10px">16</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">50</td><td style="border:1px solid #94a3b8;padding:4px 10px">20</td></tr>' +
  '</table>';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8s-inquiry-016', chapterId: CH, difficulty: 2, subsection: 'density_volume',
    question: 'A stone of mass 96 g is lowered into a measuring cylinder. The water level rises from 40 cm&sup3; to 72 cm&sup3;. What is the density of the stone, in g/cm&sup3;?',
    answer: 3,
    hint: 'The rise in the water level is the volume of the stone, not the final reading.',
    explanation: 'The stone pushes aside 72 &minus; 40 = 32 cm&sup3; of water, so density = 96 &divide; 32 = 3 g/cm&sup3;. Using 72 cm&sup3; gives 1.33 and uses water that was already there; dividing volume by mass gives 0.33 and is the formula upside down.'
  }),

  makeMCQ({
    id: 'g8s-inquiry-017', chapterId: CH, difficulty: 3, subsection: 'lab_procedures',
    question: 'A class is testing whether sugar dissolves faster in hot water than in cold water. Each group uses a different mass of sugar. Why can their results not be compared?',
    options: ['More than one variable changed', 'The results were not repeated', 'The water was not stirred', 'The thermometer was not read'],
    answer: 'More than one variable changed',
    hint: 'In a fair test only one thing is allowed to change.',
    explanation: 'Temperature AND mass of sugar both changed, so a difference in dissolving time cannot be blamed on the temperature. Repeating, stirring and reading a thermometer all improve an experiment, but none of them makes an unfair test fair.'
  }),

  makeMCQ({
    id: 'g8s-inquiry-018', chapterId: CH, difficulty: 2, subsection: 'recording_data',
    question: 'A pupil hangs loads on a spring and records the extension.' + resultsTable + 'Which reading should she repeat before drawing her graph?',
    options: ['30 N', '20 N', '40 N', '50 N'],
    answer: '30 N',
    hint: 'Four of the readings rise by the same step each time. One does not fit.',
    explanation: 'The extension goes up 4 cm for every extra 10 N: 4, 8, 12, 16, 20. The 30 N reading of 21 cm breaks that pattern and is the anomaly. The 20 N, 40 N and 50 N readings all sit exactly on the pattern, so there is no reason to doubt them.'
  }),

  makeText({
    id: 'g8s-inquiry-019', chapterId: CH, difficulty: 2, subsection: 'density_volume',
    question: 'A pupil finds the volume of an irregular stone by lowering it into a measuring cylinder and noting how far the water level rises. Name this method.',
    answer: 'displacement',
    alsoAccept: ['displacement method', 'water displacement', 'the displacement method'],
    hint: 'The stone pushes the water out of its way. The word describes what the stone does to the water.',
    explanation: 'The method is called displacement: the stone displaces (pushes aside) its own volume of water, so the rise in level IS the volume. It is not filtration, which separates a solid from a liquid, and it is not evaporation, which removes the liquid altogether.'
  })

);

})();
