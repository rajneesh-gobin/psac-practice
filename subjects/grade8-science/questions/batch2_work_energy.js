'use strict';

(function () {

const CH = 'g8s-work-energy';

const motorTable =
  '<table style="border-collapse:collapse;margin:8px 0;font-size:0.95em">' +
  '<tr><th style="border:1px solid #94a3b8;padding:4px 10px">Motor</th>' +
  '<th style="border:1px solid #94a3b8;padding:4px 10px">Work done / J</th>' +
  '<th style="border:1px solid #94a3b8;padding:4px 10px">Time taken / s</th></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">A</td><td style="border:1px solid #94a3b8;padding:4px 10px">600</td><td style="border:1px solid #94a3b8;padding:4px 10px">3</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">B</td><td style="border:1px solid #94a3b8;padding:4px 10px">900</td><td style="border:1px solid #94a3b8;padding:4px 10px">3</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">C</td><td style="border:1px solid #94a3b8;padding:4px 10px">800</td><td style="border:1px solid #94a3b8;padding:4px 10px">2</td></tr>' +
  '<tr><td style="border:1px solid #94a3b8;padding:4px 10px">D</td><td style="border:1px solid #94a3b8;padding:4px 10px">1000</td><td style="border:1px solid #94a3b8;padding:4px 10px">5</td></tr>' +
  '</table>';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8s-work-energy-016', chapterId: CH, difficulty: 2, subsection: 'work_done',
    question: 'A crane does 3600 J of work raising a load through 4 m. What force, in newtons, did the crane apply?',
    answer: 900,
    hint: 'Work = force × distance, so this time the force is the unknown.',
    explanation: 'Force = work &divide; distance = 3600 &divide; 4 = 900 N. Multiplying gives 14 400, which is the work that force would do over 4 m again, and dividing 4 by 3600 gives a fraction, not a force.'
  }),

  makeNum({
    id: 'g8s-work-energy-017', chapterId: CH, difficulty: 3, subsection: 'power_rate',
    question: 'A pump raises 200 kg of water through a height of 6 m in 40 seconds. What is its power output, in watts? (g = 10 N/kg)',
    answer: 300,
    hint: 'Find the weight of the water first, then the work done, and only then divide by the time.',
    explanation: 'The weight is 200 × 10 = 2000 N, the work is 2000 × 6 = 12 000 J, and the power is 12 000 &divide; 40 = 300 W. Using the mass instead of the weight gives 30 W, and forgetting to divide by the time gives 12 000, which is an energy, not a power.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-018', chapterId: CH, difficulty: 3, subsection: 'work_energy_power',
    question: 'Two identical lifts carry the same load from the ground floor to the third floor. Lift A takes 20 s and Lift B takes 40 s. Compare the WORK each one does.',
    options: ['Both do the same work', 'Lift A does more work', 'Lift B does more work', 'Neither does any work'],
    answer: 'Both do the same work',
    hint: 'Work depends on force and distance only — time does not appear in the formula.',
    explanation: 'Same load and same height means the same force through the same distance, so the work is equal; it is the POWER that differs, because Lift A does that work in half the time. Neither lift does zero work, since the load really is raised.'
  }),

  makeText({
    id: 'g8s-work-energy-019', chapterId: CH, difficulty: 2, subsection: 'work_energy_power',
    question: 'No machine turns all of its input energy into useful output energy. Name the form of energy into which most of the rest is wasted.',
    answer: 'heat',
    alsoAccept: ['heat energy', 'thermal energy', 'thermal'],
    hint: 'It is why the parts of a working machine get warm.',
    explanation: 'Friction between moving parts turns some input energy into heat, which spreads out and cannot be used, so no machine is 100% efficient. Sound is also wasted but in much smaller amounts, and light is not usually produced by a machine at all.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-020', chapterId: CH, difficulty: 2, subsection: 'power_rate',
    question: 'Four motors are tested and their results recorded.' + motorTable + 'Which motor is the most powerful?',
    options: ['Motor C', 'Motor A', 'Motor B', 'Motor D'],
    answer: 'Motor C',
    hint: 'Power is work divided by time, so the biggest amount of work is not automatically the winner.',
    explanation: 'Motor C gives 800 &divide; 2 = 400 W, ahead of B at 300 W and A and D at 200 W each. Motor D does the most work of all, 1000 J, but takes five seconds to do it, which is why work alone cannot answer the question.'
  })

);

})();
