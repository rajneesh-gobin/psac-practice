'use strict';
// PSAC Grade 5 Science Specimen Assessment Booklet (February 2017) — the first official PSAC
// specimen paper for Grade 5 Science, released before the format changed. Adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp16-001', chapterId:'water-matter', difficulty:1,
    question:'Which instrument is used to <strong>measure temperature</strong>?',
    options:['Bulb','Switch','Tester','Thermometer'], answer:'Thermometer',
    hint:'This instrument has a narrow glass tube with liquid inside that rises with heat.',
    explanation:'A thermometer is used to measure temperature. The liquid inside (mercury or coloured alcohol) expands as temperature rises, allowing the temperature to be read from the scale.' }),

  makeMCQ({ id:'g5sc-pp16-002', chapterId:'energy', difficulty:1,
    question:'When an <strong>electric iron</strong> is switched on, electrical energy changes mainly into:',
    options:['Movement energy','Light energy','Heat energy','Chemical energy'], answer:'Heat energy',
    hint:'What does an iron actually do to your clothes?',
    explanation:'An electric iron converts electrical energy mainly into heat energy. This heat warms the soleplate of the iron, which then presses and removes creases from fabric.' }),

  makeMCQ({ id:'g5sc-pp16-003', chapterId:'plants', difficulty:1,
    question:'What is the main function of <strong>flowers</strong> in a plant?',
    options:['They attract insects for pollination.','They manufacture food for the plant.','They carry water to other parts of the plant.','They hold the plant in the soil.'], answer:'They attract insects for pollination.',
    hint:'Colourful petals and scent have a purpose connected to reproduction.',
    explanation:'Flowers attract insects (and other animals) for pollination. When insects collect nectar, they carry pollen between flowers, enabling fertilisation and reproduction of the plant.' }),

  makeMCQ({ id:'g5sc-pp16-004', chapterId:'conservation', difficulty:2,
    question:'Which of the following is a <strong>good way to save water</strong>?',
    options:['Using tap water for garden irrigation all day','Collecting rain water for watering plants','Evaporating sea water to make salt','Taking many showers every day'], answer:'Collecting rain water for watering plants',
    hint:'One of these options makes use of free water from the sky instead of the tap.',
    explanation:'Collecting rainwater to water plants is a great way to save tap water. It is free, helps reduce water usage, and is better for plants than treated tap water.' }),

  makeMCQ({ id:'g5sc-pp16-005', chapterId:'plants', difficulty:2,
    question:'A cactus lives in very dry desert conditions. Which feature <strong>helps the cactus survive</strong> in dry places?',
    options:['It has a short stem.','It has short roots.','It stores water in its stem.','It stores water in its flowers.'], answer:'It stores water in its stem.',
    hint:'The thick, round shape of a cactus is not just for looks.',
    explanation:'A cactus has a thick, fleshy stem that stores large amounts of water. It also has waxy skin to reduce water loss and long roots to collect rainwater quickly when it does rain.' }),

  makeMCQ({ id:'g5sc-pp16-006', chapterId:'energy', difficulty:1,
    question:'A car uses petrol to move. What is the <strong>source of energy</strong> for a car?',
    options:['Chemical energy (petrol)','Electrical energy','Solar energy','Wind energy'], answer:'Chemical energy (petrol)',
    hint:'Petrol is burned in the engine — what type of energy is stored in petrol?',
    explanation:'Petrol contains chemical energy. When it burns in the car\'s engine, this chemical energy is converted to movement (kinetic) energy to drive the car.' }),

  makeMCQ({ id:'g5sc-pp16-007', chapterId:'energy', difficulty:1,
    question:'Which source of energy do <strong>plants</strong> use to make their own food?',
    options:['Chemical energy','Movement energy','Solar (sunlight) energy','Water energy'], answer:'Solar (sunlight) energy',
    hint:'Plants turn toward this source to help them carry out photosynthesis.',
    explanation:'Plants use solar (sunlight) energy to carry out photosynthesis. The sun\'s energy is captured by chlorophyll in leaves and used to convert carbon dioxide and water into food (glucose).' }),

  makeMCQ({ id:'g5sc-pp16-008', chapterId:'energy', difficulty:2,
    question:'Fishermen in Mauritius hang octopuses in the sun to dry them. Which form of energy from the sun <strong>dries the octopuses</strong>?',
    options:['Chemical energy','Electrical energy','Mechanical (movement) energy','Solar (heat) energy'], answer:'Solar (heat) energy',
    hint:'The sun warms the octopuses — what type of energy is warmth?',
    explanation:'The sun provides heat (solar) energy that evaporates water from the octopuses, drying them. This is the same process as drying clothes on a washing line.' }),

  makeMCQ({ id:'g5sc-pp16-009', chapterId:'electricity', difficulty:2,
    question:'A circuit has a switch in the open position. The bulb does NOT light up. Why?',
    options:['An open switch breaks the circuit so no current flows.','An open switch conducts electricity directly.','An open switch is a conductor.','The battery runs out when the switch is open.'], answer:'An open switch breaks the circuit so no current flows.',
    hint:'Open means there is a gap — can electricity jump across a gap?',
    explanation:'When a switch is open, it creates a gap in the circuit. Electricity cannot flow across this gap, so the circuit is incomplete and no current flows — the bulb does not light up.' }),

  makeMCQ({ id:'g5sc-pp16-010', chapterId:'electricity', difficulty:2,
    question:'An iron nail is placed to bridge a gap in an electric circuit. The bulb lights up. This shows that iron is a _____ of electricity.',
    options:['Conductor','Insulator','Resistor','Transformer'], answer:'Conductor',
    hint:'When the bulb lights up, it means something is allowing electricity to pass through.',
    explanation:'Because the bulb lights up, the iron nail allows electricity to pass through it. This means iron is a conductor of electricity. Metals are generally good electrical conductors.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp16-pdf-001', chapterId:'plants', marks:4, year:2016, grade:5, subject:'Science',
    question:'[Specimen] Draw and label the parts of a hibiscus plant: root, stem, leaf, flower, fruit. State the function of two parts.', type:'draw' },
  { id:'g5sc-pp16-pdf-002', chapterId:'water-matter', marks:3, year:2016, grade:5, subject:'Science',
    question:'[Specimen] Name the three states of matter. Give one example of water in each state and state the temperature at which water changes from liquid to solid.', type:'write' },
  { id:'g5sc-pp16-pdf-003', chapterId:'conservation', marks:3, year:2016, grade:5, subject:'Science',
    question:'[Specimen] Name TWO ways in which people cause soil erosion and TWO actions that help prevent it.', type:'write' },
  { id:'g5sc-pp16-pdf-004', chapterId:'electricity', marks:3, year:2016, grade:5, subject:'Science',
    question:'[Specimen] Draw three simple circuits: Circuit 1 with an open switch (bulb off), Circuit 2 with a closed switch (bulb on), Circuit 3 with a conductor bridging a gap (bulb on). Label each component.', type:'draw' }
);
