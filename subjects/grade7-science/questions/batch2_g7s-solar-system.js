'use strict';
STATIC_QUESTIONS.push(
  makeNum({
    id: 'g7s-solar-system-017', chapterId: 'g7s-solar-system', difficulty: 3,
    subsection: 'planets',
    question: 'Mars takes about 687 Earth days to travel once round the Sun. Earth takes about 365 days. How many <b>more</b> days does Mars take?',
    answer: 322, acceptableAnswers: ['322', '322 days'],
    hint: 'Compare the two orbit times.',
    explanation: '687 − 365 = 322 days longer, because Mars is further out and has a bigger orbit to complete. Adding the two gives 1052, which is not a comparison.'
  }),
  makeMCQ({
    id: 'g7s-solar-system-018', chapterId: 'g7s-solar-system', difficulty: 2,
    subsection: 'planet_characteristics',
    question: 'Neptune is far colder than Mercury. What is the main reason?',
    options: ['It is far further from the Sun', 'It spins much more slowly', 'It has a much thinner crust', 'It has more moons than Mercury'],
    answer: 'It is far further from the Sun',
    hint: 'Think about how the Sun heats a planet.',
    explanation: 'Heat and light from the Sun spread out with distance, so Neptune receives only a tiny fraction of what Mercury receives. Spin, crust and moons change a planet in other ways but do not set how much solar energy reaches it.'
  }),
  makeText({
    id: 'g7s-solar-system-019', chapterId: 'g7s-solar-system', difficulty: 1,
    subsection: 'solar_system_structure',
    question: 'What name is given to a natural object that orbits a planet, as the Moon orbits the Earth?',
    answer: 'satellite', alsoAccept: ['natural satellite', 'a satellite', 'moon'],
    hint: 'Man-made ones of these carry television signals.',
    explanation: 'Any object in orbit around a planet is a satellite; the Moon is Earth\'s natural satellite. A planet orbits the Sun, and a comet orbits the Sun on a long stretched path.'
  }),
  makeMCQ({
    id: 'g7s-solar-system-020', chapterId: 'g7s-solar-system', difficulty: 2,
    subsection: 'planet_characteristics',
    question: 'Which planet is closest to the Earth in <b>size</b>?',
    options: ['Venus', 'Mars', 'Mercury', 'Jupiter'],
    answer: 'Venus',
    hint: 'It is sometimes called Earth\'s twin.',
    explanation: 'Venus has a diameter of about 12 100 km against Earth\'s 12 700 km, so it is often called Earth\'s twin. Mars is about half Earth\'s width, Mercury is smaller still, and Jupiter is eleven times wider.'
  })
);
