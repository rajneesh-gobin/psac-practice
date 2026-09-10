'use strict';

(function () {

const CH = 'g8s-pressure';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8s-pressure-016', chapterId: CH, difficulty: 2, subsection: 'pressure_calculations',
    question: 'A force of 1000 N presses on a surface and produces a pressure of 250 Pa. What is the area of that surface, in square metres?',
    answer: 4,
    hint: 'Pressure = force ÷ area, so rearrange it to make area the subject.',
    explanation: 'Area = force &divide; pressure = 1000 &divide; 250 = 4 m&sup2;. Multiplying gives 250 000, which would be an area larger than a village, and dividing 250 by 1000 gives 0.25, which is the calculation upside down.'
  }),

  makeNum({
    id: 'g8s-pressure-017', chapterId: CH, difficulty: 3, subsection: 'pressure_calculations',
    question: 'A girl of mass 40 kg balances on one foot. The sole of that shoe touches the floor over an area of 0.02 m&sup2;. What pressure, in pascals, does she exert? (g = 10 N/kg)',
    answer: 20000,
    hint: 'The formula needs a force in newtons, and you have been given a mass in kilograms.',
    explanation: 'First her weight: 40 × 10 = 400 N. Then pressure = 400 &divide; 0.02 = 20 000 Pa. Using 40 N instead of 400 N gives 2000 Pa and skips the conversion from mass to weight; multiplying by 0.02 instead of dividing gives 8 Pa.'
  }),

  makeMCQ({
    id: 'g8s-pressure-018', chapterId: CH, difficulty: 3, subsection: 'pressure_in_fluids',
    question: 'Two identical holes are punched in the side of a tall tank full of water, one near the top and one near the bottom. What is seen?',
    options: ['The lower jet shoots further', 'The upper jet shoots further', 'Both jets shoot the same', 'Neither jet flows at all'],
    answer: 'The lower jet shoots further',
    hint: 'Think about the depth of water above each hole.',
    explanation: 'Pressure in a liquid grows with depth, so the water at the lower hole is pushed out harder and travels further. The upper hole has less water above it, and since the two depths are different the jets cannot match; both holes are open, so water flows from each.'
  }),

  makeMCQ({
    id: 'g8s-pressure-019', chapterId: CH, difficulty: 2, subsection: 'pressure_definition',
    question: 'A wooden block is standing on the floor. Which change would increase the pressure it exerts on the floor?',
    options: ['Standing it on a smaller face', 'Standing it on a larger face', 'Painting it a darker colour', 'Cooling it in a fridge'],
    answer: 'Standing it on a smaller face',
    hint: 'The weight does not change, so the only thing you can alter is the area it presses on.',
    explanation: 'The same weight spread over a smaller area gives a bigger pressure, since pressure = force &divide; area. A larger face lowers the pressure, and paint and temperature change neither the weight nor the contact area.'
  }),

  makeText({
    id: 'g8s-pressure-020', chapterId: CH, difficulty: 2, subsection: 'pressure_in_fluids',
    question: 'Name the instrument used to measure the pressure of the atmosphere.',
    answer: 'barometer',
    alsoAccept: ['a barometer', 'mercury barometer', 'aneroid barometer'],
    hint: 'Weather forecasters watch it before a cyclone; the name ends in -meter.',
    explanation: 'Atmospheric pressure is measured with a barometer, and a falling reading is one warning of an approaching cyclone. A thermometer measures temperature, a manometer measures the pressure of a gas supply, and an anemometer measures wind speed.'
  })

);

})();
