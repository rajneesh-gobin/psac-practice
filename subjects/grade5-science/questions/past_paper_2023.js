'use strict';
// PSAC Grade 5 Science 2023 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp23-001', chapterId:'energy', difficulty:1,
    question:'Which one of the following is a <strong>fossil fuel</strong>?',
    options:['Bagasse','Coal','Wax','Wood'], answer:'Coal',
    hint:'Fossil fuels are formed from ancient plant and animal remains buried underground.',
    explanation:'Coal is a fossil fuel formed from ancient plants compressed underground over millions of years. Bagasse, wax, and wood are not fossil fuels.' }),

  makeMCQ({ id:'g5sc-pp23-002', chapterId:'water-matter', difficulty:1,
    question:'What is the shiny liquid found inside a <strong>thermometer</strong>?',
    options:['Alcohol','Kerosene','Mercury','Water'], answer:'Mercury',
    hint:'This liquid is a shiny silvery metal at room temperature.',
    explanation:'Many traditional thermometers contain mercury, a shiny liquid metal. Modern thermometers often use coloured alcohol instead, as mercury is toxic.' }),

  makeMCQ({ id:'g5sc-pp23-003', chapterId:'energy', difficulty:2,
    question:'A sailing boat moves on the sea. Which form of energy <strong>makes it move</strong>?',
    options:['Chemical energy','Electrical energy','Movement energy','Light energy'], answer:'Movement energy',
    hint:'The sails catch something natural that makes the boat move.',
    explanation:'A sailing boat is powered by wind energy, which is a form of movement (kinetic) energy. The wind pushes the sails, making the boat move.' }),

  makeMCQ({ id:'g5sc-pp23-004', chapterId:'plants', difficulty:2,
    question:'The diagram shows a Cassava plant. The <strong>thick underground part</strong> shown is which part of the plant?',
    options:['The fruits','The seeds','The stems','The roots'], answer:'The roots',
    hint:'The part that grows underground to store food and absorb water.',
    explanation:'The large, chunky underground part of a cassava plant is the root. Cassava roots (tubers) are an important food source and store starch.' }),

  makeMCQ({ id:'g5sc-pp23-005', chapterId:'animals', difficulty:2,
    question:'Which bird is <strong>endemic to the island of Rodrigues</strong>?',
    options:['The Cardinal jaune','The Echo parakeet','The Kestrel','The Pink Pigeon'], answer:'The Cardinal jaune',
    hint:'This small bird is found only on the island of Rodrigues, not on mainland Mauritius.',
    explanation:'The Cardinal jaune (Rodrigues warbler) is endemic to Rodrigues. The Echo parakeet, Kestrel, and Pink Pigeon are endemic to the main island of Mauritius.' }),

  makeMCQ({ id:'g5sc-pp23-006', chapterId:'energy', difficulty:1,
    question:'Humans get energy to work and play from the food they eat. What <strong>form of energy</strong> is stored in food?',
    options:['Chemical energy','Electrical energy','Solar energy','Wind energy'], answer:'Chemical energy',
    hint:'Energy locked inside food is the same type stored in batteries and fuels.',
    explanation:'Food contains chemical energy, which the body converts into movement, heat, and other forms of energy needed for daily activities.' }),

  makeMCQ({ id:'g5sc-pp23-007', chapterId:'energy', difficulty:1,
    question:'Solar street lamps use the energy from the sun. Which <strong>source of energy</strong> do they use?',
    options:['Coal','Petrol','Solar energy','Wind energy'], answer:'Solar energy',
    hint:'These lamps work without being connected to the electricity grid.',
    explanation:'Solar street lamps use solar energy (sunlight) captured by solar panels, which is then converted to electrical energy to light the lamps at night.' }),

  makeMCQ({ id:'g5sc-pp23-008', chapterId:'electricity', difficulty:1,
    question:'What is the function of the <strong>cell (battery)</strong> in an electric circuit?',
    options:['It allows the circuit to open and close.','It opens and closes the circuit.','It produces light energy.','It provides electrical energy.'], answer:'It provides electrical energy.',
    hint:'The cell is like the engine of the circuit — without it, nothing works.',
    explanation:'A cell (battery) provides the electrical energy needed to drive the current around the circuit. Without it, the bulb would not light up.' }),

  makeMCQ({ id:'g5sc-pp23-009', chapterId:'animals', difficulty:1,
    question:'What is the <strong>natural habitat</strong> of a fish?',
    options:['Air','Deserts','Land','Water'], answer:'Water',
    hint:'Fish breathe using gills that extract oxygen from a liquid.',
    explanation:'Fish live in water (rivers, lakes, seas, or oceans). They breathe by extracting dissolved oxygen from water using their gills.' }),

  makeMCQ({ id:'g5sc-pp23-010', chapterId:'animals', difficulty:1,
    question:'A frog can live both in water and on land. To which animal group does a frog belong?',
    options:['Amphibian','Insect','Reptile','Mammal'], answer:'Amphibian',
    hint:'The name of this group comes from Greek words meaning "double life".',
    explanation:'Frogs are amphibians. Amphibians can live both in water and on land and typically lay eggs in water. Toads and salamanders are also amphibians.' }),

  makeMCQ({ id:'g5sc-pp23-011', chapterId:'animals', difficulty:2,
    question:'Which of the following birds is <strong>endemic to Mauritius</strong>?',
    options:['Crow','Eagle','Echo parakeet','Sparrow'], answer:'Echo parakeet',
    hint:'This green parrot-like bird was nearly extinct but saved through conservation.',
    explanation:'The Echo parakeet is endemic to Mauritius. Crows and sparrows are found worldwide and are not endemic. Eagles are found across many continents.' }),

  makeMCQ({ id:'g5sc-pp23-012', chapterId:'water-matter', difficulty:2,
    question:'In which <strong>state of matter</strong> does water exist as ice?',
    options:['Gas','Liquid','Solid','Plasma'], answer:'Solid',
    hint:'This state has a definite shape and volume.',
    explanation:'Ice is water in its solid state. Solids have a definite shape and volume. When heated, ice melts to become liquid water.' }),

  makeMCQ({ id:'g5sc-pp23-013', chapterId:'water-matter', difficulty:2,
    question:'In glass B, hot water is producing steam at the surface. What <strong>process</strong> is taking place?',
    options:['Condensation','Evaporation','Freezing','Melting'], answer:'Evaporation',
    hint:'This process changes liquid water into water vapour when heat is applied.',
    explanation:'Evaporation is the process where liquid water is heated and changes into water vapour (steam). It happens at the surface of a liquid.' }),

  makeMCQ({ id:'g5sc-pp23-014', chapterId:'water-matter', difficulty:1,
    question:'Glass C contains ice cubes and water droplets form on the outside. In which <strong>state of matter</strong> is the ice inside the glass?',
    options:['Solid','Liquid','Gas','Mixture'], answer:'Solid',
    hint:'Ice has a definite shape that it keeps until it melts.',
    explanation:'Ice is in the solid state. It has a fixed shape and volume. The water droplets forming on the outside of the cold glass are due to condensation of water vapour from the warm air.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp23-pdf-001', chapterId:'energy', marks:4, year:2023, grade:5, subject:'Science',
    question:'Write down ONE advantage and ONE disadvantage of using solar energy as a source of electricity.', type:'write' },
  { id:'g5sc-pp23-pdf-002', chapterId:'animals', marks:3, year:2023, grade:5, subject:'Science',
    question:'Name the type of animal group for: (a) butterfly, (b) shark, (c) chameleon. Give ONE feature for each group.', type:'write' },
  { id:'g5sc-pp23-pdf-003', chapterId:'electricity', marks:3, year:2023, grade:5, subject:'Science',
    question:'Draw a simple electric circuit showing a dry cell, a switch, and a bulb connected by wires. Label each component.', type:'draw' },
  { id:'g5sc-pp23-pdf-004', chapterId:'water-matter', marks:2, year:2023, grade:5, subject:'Science',
    question:'Name the process that turns water vapour back into liquid droplets on a cold surface. Where does this happen in the water cycle?', type:'write' }
);
