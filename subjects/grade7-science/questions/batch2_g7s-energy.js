'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-energy-017', chapterId: 'g7s-energy', difficulty: 1,
    subsection: 'forms_energy',
    question: 'A ravane is struck and its skin vibrates. What form of energy travels from the drum to your ears?',
    answer: 'sound', alsoAccept: ['sound energy'],
    hint: 'It needs air to travel through.',
    explanation: 'A vibrating surface pushes the air and sends out sound energy. Light energy travels from the lamp above the drum, and heat energy is only a small waste product here.'
  }),
  makeMCQ({
    id: 'g7s-energy-018', chapterId: 'g7s-energy', difficulty: 2,
    subsection: 'energy_transformation',
    question: 'A ceiling fan is switched on. Which energy transformation is the <b>useful</b> one?',
    options: ['Electrical to kinetic', 'Kinetic to electrical', 'Chemical to thermal', 'Light to electrical'],
    answer: 'Electrical to kinetic',
    hint: 'What does the fan do that you actually want?',
    explanation: 'The fan is wanted for its movement, so electrical energy turned into kinetic energy is the useful transformation; the heat and sound it also makes are waste. Kinetic to electrical describes a generator, which works the other way round.'
  }),
  makeNum({
    id: 'g7s-energy-019', chapterId: 'g7s-energy', difficulty: 3,
    subsection: 'renewable_nonrenewable',
    question: 'In one year Mauritius produced 3000 GWh of electricity, of which 600 GWh came from renewable sources. What percentage of the electricity was renewable?',
    answer: 20, acceptableAnswers: ['20', '20%'],
    hint: 'Work out the renewable share of the total, then turn it into a percentage.',
    explanation: '600 ÷ 3000 = 0.2, which is 20%. The other 2400 GWh, or 80%, came from non-renewable fuels such as coal and heavy oil.'
  }),
  makeMCQ({
    id: 'g7s-energy-020', chapterId: 'g7s-energy', difficulty: 3,
    subsection: 'energy_transformation',
    question: 'An old filament bulb turns most of the electrical energy it receives into heat. What does that tell you about the bulb?',
    options: ['It wastes most of its energy', 'It creates energy from nothing', 'It stores energy inside itself', 'It destroys the energy it uses'],
    answer: 'It wastes most of its energy',
    hint: 'The bulb was bought for its light, not its heat.',
    explanation: 'Energy turned into a form nobody wants is wasted, which is why LED lamps replaced filament bulbs. Energy can never be created or destroyed, and a bulb stores nothing — it passes energy on straight away.'
  })
);
