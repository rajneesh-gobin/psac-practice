'use strict';

(function () {

const CH = 'g8s-work-energy';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8s-work-energy-021', chapterId: CH, difficulty: 2, subsection: 'work_done',
    question: 'A worker does 500 J of work pushing a box with a force of 100 N. How far, in metres, did the box move?',
    answer: 5,
    hint: 'Work = force × distance. Rearrange to make distance the subject.',
    explanation: 'Distance = work &divide; force = 500 &divide; 100 = <b>5 m</b>. Multiplying gives 50 000, which is enormous and wrong; dividing 100 by 500 gives 0.2, which is the calculation upside down.'
  }),

  makeTF({
    id: 'g8s-work-energy-022', chapterId: CH, difficulty: 1, subsection: 'work_done',
    question: 'A student pushes hard against a wall for one minute but the wall does not move. The student does no work on the wall.',
    answer: true,
    hint: 'Check whether the object moves in the direction of the force.',
    explanation: '<b>True.</b> Work = force × distance. The wall does not move, so the distance is zero and the work done is 0 J. The student may feel tired — energy is used in keeping muscles tense — but no mechanical work is done on the wall itself.'
  }),

  makeNum({
    id: 'g8s-work-energy-023', chapterId: CH, difficulty: 2, subsection: 'work_done',
    question: 'A pupil lifts a school bag weighing 60 N from the floor to a shelf 2 m above. How much work, in joules, does the pupil do?',
    answer: 120,
    hint: 'Work done against gravity = weight × height lifted.',
    explanation: 'Work = force × distance = 60 N × 2 m = <b>120 J</b>. The force needed equals the weight of the bag (60 N) and the distance is the height (2 m). Dividing gives 30, which is not a work value.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-024', chapterId: CH, difficulty: 1, subsection: 'work_done',
    question: 'What is the unit of work?',
    options: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'],
    answer: 'Joule (J)',
    hint: 'It is the same unit used for energy.',
    explanation: 'Work is measured in <b>joules (J)</b>. One joule equals one newton of force applied over one metre: 1 J = 1 N × 1 m. The watt is the unit of power, the newton is the unit of force, and the pascal is the unit of pressure.'
  }),

  makeNum({
    id: 'g8s-work-energy-025', chapterId: CH, difficulty: 2, subsection: 'power_rate',
    question: 'A machine does 1200 J of work in 4 seconds. What is its power output, in watts?',
    answer: 300,
    hint: 'Power = work &divide; time.',
    explanation: 'Power = 1200 &divide; 4 = <b>300 W</b>. Multiplying gives 4800, which is an energy not a power; dividing 4 by 1200 gives a very small fraction, which has the calculation upside down.'
  }),

  makeNum({
    id: 'g8s-work-energy-026', chapterId: CH, difficulty: 3, subsection: 'power_rate',
    question: 'A motor with a power output of 250 W does 2000 J of work. How long, in seconds, does it take?',
    answer: 8,
    hint: 'Rearrange Power = work &divide; time to make time the subject.',
    explanation: 'Time = work &divide; power = 2000 &divide; 250 = <b>8 s</b>. Multiplying gives 500 000, which is far too large; dividing 250 by 2000 gives 0.125, which is the calculation upside down.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-027', chapterId: CH, difficulty: 1, subsection: 'power_rate',
    question: 'One watt is equal to which of the following?',
    options: ['One joule per second', 'One joule per metre', 'One newton per second', 'One newton per metre'],
    answer: 'One joule per second',
    hint: 'Power = work &divide; time, so the unit of power = unit of work &divide; unit of time.',
    explanation: '<b>1 W = 1 J/s.</b> Power tells us how fast energy is transferred or work is done. Joule per metre is not a standard unit of any quantity, newton per second would be the rate of change of force, and newton per metre is the unit of spring constant (N/m).'
  }),

  makeMCQ({
    id: 'g8s-work-energy-028', chapterId: CH, difficulty: 2, subsection: 'power_rate',
    question: 'Two builders each carry the same load up the same flight of stairs. Builder A takes 10 s and Builder B takes 20 s. Which statement is correct?',
    options: ['Builder A has greater power', 'Builder B has greater power', 'They have the same power', 'Builder A does more work'],
    answer: 'Builder A has greater power',
    hint: 'Same work, different times — who finishes faster?',
    explanation: 'Both do the same work (same force, same distance). Power = work &divide; time, so the one who takes less time has greater power. Builder A does the same work in half the time, giving twice the power. Neither does more work than the other.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-029', chapterId: CH, difficulty: 2, subsection: 'work_energy_power',
    question: 'A ball is thrown upward and slows down as it rises. What energy change is taking place as it rises?',
    options: ['Kinetic energy changes to gravitational potential energy', 'Gravitational potential energy changes to kinetic energy', 'Chemical energy changes to kinetic energy', 'Thermal energy changes to kinetic energy'],
    answer: 'Kinetic energy changes to gravitational potential energy',
    hint: 'As the ball slows down it loses kinetic energy; as it goes higher it gains potential energy.',
    explanation: 'As the ball rises, it slows (losing kinetic energy) and gains height (gaining gravitational potential energy). The reverse happens on the way down. Chemical energy is stored in food and fuel, not in a moving ball.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-030', chapterId: CH, difficulty: 2, subsection: 'work_energy_power',
    question: 'A law of physics states that energy can never be created or destroyed, only changed from one form to another. What is this law called?',
    options: ['Conservation of energy', 'Conservation of mass', 'Newton\'s first law', 'The law of gravity'],
    answer: 'Conservation of energy',
    hint: 'The key word is "conserved", meaning the total amount never changes.',
    explanation: 'The <b>law of conservation of energy</b> states that the total amount of energy in a closed system stays constant. Energy changes form — kinetic to heat, chemical to electrical — but is never created from nothing or destroyed. Conservation of mass is a separate law in chemistry.'
  }),

  makeNum({
    id: 'g8s-work-energy-031', chapterId: CH, difficulty: 3, subsection: 'work_energy_power',
    question: 'A machine receives 400 J of energy and produces 280 J of useful work. What is its efficiency, as a percentage?',
    answer: 70,
    hint: 'Efficiency (%) = (useful output &divide; total input) × 100.',
    explanation: 'Efficiency = (280 &divide; 400) × 100 = 0.7 × 100 = <b>70%</b>. The remaining 30% (120 J) is wasted, mainly as heat due to friction. Dividing 400 by 280 then multiplying by 100 gives 142.8%, which is impossible — a machine cannot output more energy than it receives.'
  }),

  makeMCQ({
    id: 'g8s-work-energy-032', chapterId: CH, difficulty: 3, subsection: 'work_energy_power',
    question: 'Two identical cars travel at different speeds: Car A at 20 m/s and Car B at 40 m/s. Compared with Car A, how much kinetic energy does Car B have?',
    options: ['Four times as much', 'Twice as much', 'The same amount', 'Half as much'],
    answer: 'Four times as much',
    hint: 'Kinetic energy depends on the square of the speed: KE = ½mv². If speed doubles, what happens to KE?',
    explanation: 'KE = ½mv². Car B\'s speed is double Car A\'s, so Car B\'s KE is (2)² = <b>4 times</b> greater. This is why speed is so dangerous in road accidents — doubling the speed quadruples the energy that must be absorbed in a collision.'
  })

);

})();
