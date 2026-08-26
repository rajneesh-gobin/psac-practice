'use strict';
// PSAC Grade 5 Science 2022 (paper labelled 2021-2022) — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp22-001', chapterId:'plants', difficulty:1,
    question:'Which part of a flower <strong>attracts insects</strong> for pollination?',
    options:['Flower (petals)','Leaf','Root','Stem'], answer:'Flower (petals)',
    hint:'Insects are drawn to this part because of its bright colours and sweet scent.',
    explanation:'The petals (flower) are brightly coloured and may have nectar to attract insects, which then carry pollen from one flower to another, enabling pollination.' }),

  makeMCQ({ id:'g5sc-pp22-002', chapterId:'plants', difficulty:1,
    question:'Which of the following plants is grown mainly for its <strong>root</strong>, which we use as food?',
    options:['Carrot','Grass','Sugarcane','Vetiver'], answer:'Carrot',
    hint:'This orange vegetable that rabbits love is the part that grows underground.',
    explanation:'The carrot is a root vegetable — the orange part we eat is the plant\'s root. Sugarcane is grown for its stem, while grass and vetiver are grown for other purposes.' }),

  makeMCQ({ id:'g5sc-pp22-003', chapterId:'animals', difficulty:1,
    question:'Which of the following animals is an <strong>amphibian</strong>?',
    options:['Butterfly','Dog','Dolphin','Frog'], answer:'Frog',
    hint:'This animal starts its life in water and can live on land as an adult.',
    explanation:'Frogs are amphibians — they can live both in water and on land. Butterflies are insects, dogs are mammals, and dolphins are mammals that live only in water.' }),

  makeMCQ({ id:'g5sc-pp22-004', chapterId:'electricity', difficulty:1,
    question:'Which of the following is an <strong>electrical conductor</strong>?',
    options:['Glass','Lollipop stick (wood)','Nail (iron)','Rubber band'], answer:'Nail (iron)',
    hint:'Metals are good conductors of electricity.',
    explanation:'An iron nail is a metal and therefore a good conductor of electricity. Glass, wood, and rubber are insulators that do not allow electricity to pass through.' }),

  makeMCQ({ id:'g5sc-pp22-005', chapterId:'water-matter', difficulty:1,
    question:'In which situation does ice melt the <strong>fastest</strong>?',
    options:['When placed in a freezer','When heated in a pan','When placed in a refrigerator','When left on the table'], answer:'When heated in a pan',
    hint:'Melting happens faster when more heat energy is applied.',
    explanation:'Ice melts fastest when heated in a pan because direct heat provides the most energy, speeding up the change from solid to liquid.' }),

  makeMCQ({ id:'g5sc-pp22-006', chapterId:'water-matter', difficulty:2,
    question:'Which process in the water cycle changes liquid water into water vapour?',
    options:['Condensation','Evaporation','Freezing','Precipitation'], answer:'Evaporation',
    hint:'This process is driven by heat energy from the sun acting on the surface of water.',
    explanation:'Evaporation is the process by which liquid water at the surface of seas, rivers, and lakes is heated by the sun and turns into water vapour.' }),

  makeMCQ({ id:'g5sc-pp22-007', chapterId:'water-matter', difficulty:2,
    question:'What is the process called when water vapour <strong>cools and changes to liquid water</strong>?',
    options:['Condensation','Evaporation','Melting','Precipitation'], answer:'Condensation',
    hint:'This process causes water droplets to form on the outside of a cold glass.',
    explanation:'Condensation is the process by which water vapour in the air cools and changes back into liquid water droplets. This forms clouds and dew.' }),

  makeMCQ({ id:'g5sc-pp22-008', chapterId:'electricity', difficulty:1,
    question:'Which component in an electric circuit is used to <strong>open and close</strong> the circuit?',
    options:['Battery (cell)','Bulb','Switch','Wire'], answer:'Switch',
    hint:'When you press or flick this, the light turns on or off.',
    explanation:'A switch opens or closes an electric circuit. When open, no current flows and the bulb does not light. When closed, current flows and the bulb lights up.' }),

  makeMCQ({ id:'g5sc-pp22-009', chapterId:'electricity', difficulty:2,
    question:'Why are electric wires <strong>covered in plastic or rubber</strong>?',
    options:['To keep them light','To make them conduct electricity better','To prevent electric shocks','To prevent the wire from breaking'], answer:'To prevent electric shocks',
    hint:'The plastic covering stops something dangerous from reaching you.',
    explanation:'Plastic and rubber are electrical insulators. The covering on electric wires prevents electricity from passing to anyone who accidentally touches the wire, preventing electric shocks.' }),

  makeMCQ({ id:'g5sc-pp22-010', chapterId:'energy', difficulty:2,
    question:'What is the main <strong>energy transformation</strong> that takes place when a bird is flying?',
    options:['Chemical energy to light energy','Chemical energy to movement energy','Electrical energy to movement energy','Solar energy to chemical energy'], answer:'Chemical energy to movement energy',
    hint:'Birds get energy from food (stored as chemical energy) and use it to flap their wings.',
    explanation:'When a bird flies, chemical energy from food is converted to movement (kinetic) energy as its muscles power the wings to flap.' }),

  makeMCQ({ id:'g5sc-pp22-011', chapterId:'energy', difficulty:2,
    question:'Which of the following is used as a <strong>fuel in thermal power stations</strong> in Mauritius?',
    options:['Coal','Solar panels','Water','Wind'], answer:'Coal',
    hint:'Thermal power stations burn a solid fossil fuel formed from ancient plant material compressed underground for millions of years.',
    explanation:'Thermal power stations in Mauritius burn coal (a fossil fuel) to heat water and produce steam, which drives turbines connected to generators.' }),

  makeMCQ({ id:'g5sc-pp22-012', chapterId:'animals', difficulty:1,
    question:'The camel lives in the desert. Which of the following is the <strong>natural habitat</strong> of a camel?',
    options:['Deserts','Dense forests','Sea','Wetlands'], answer:'Deserts',
    hint:'Camels are adapted to live in dry, hot, sandy environments.',
    explanation:'Camels are perfectly adapted to life in deserts — their humps store fat for energy, and they can go long periods without drinking water.' }),

  makeMCQ({ id:'g5sc-pp22-013', chapterId:'animals', difficulty:2,
    question:'Which bird from the list below is <strong>endemic to Mauritius</strong>?',
    options:['Crow','Echo parakeet','Mynah','Sparrow'], answer:'Echo parakeet',
    hint:'This green parrot-like bird is found only in the Black River Gorges National Park.',
    explanation:'The Echo parakeet is endemic to Mauritius, meaning it is found nowhere else in the world. Crows, mynahs, and sparrows are introduced or widespread species.' }),

  makeMCQ({ id:'g5sc-pp22-014', chapterId:'animals', difficulty:2,
    question:'Which bird is also endemic to Mauritius and is known for its pink-and-white plumage?',
    options:['Cardinal jaune','Echo parakeet','Pink Pigeon','Sparrow'], answer:'Pink Pigeon',
    hint:'This gentle dove-like bird was nearly wiped out and is now protected.',
    explanation:'The Pink Pigeon (Nesoenas mayeri) is endemic to Mauritius. It nearly went extinct in the 1980s but was saved through conservation breeding programmes.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp22-pdf-001', chapterId:'energy', marks:4, year:2022, grade:5, subject:'Science',
    question:'A diagram shows a beach scene with the sun, a solar-powered lamp, people swimming, and a boat with a sail. Name two different sources of energy visible in the diagram and state one way each is being used.', type:'write' },
  { id:'g5sc-pp22-pdf-002', chapterId:'plants', marks:3, year:2022, grade:5, subject:'Science',
    question:'The diagram shows the water cycle. Name processes A (liquid to vapour) and B (vapour to liquid droplets in clouds) and explain what causes each process to happen.', type:'write' },
  { id:'g5sc-pp22-pdf-003', chapterId:'animals', marks:3, year:2022, grade:5, subject:'Science',
    question:'Ile Ronde is a nature reserve near Mauritius. Name ONE endemic animal found there and explain why it is important to protect endemic species.', type:'write' }
);
