'use strict';
// PSAC Grade 5 Science March 2021 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp21-001', chapterId:'animals', difficulty:1,
    question:'Which animal lives in a <strong>web</strong>?',
    options:['Bee','Butterfly','Fly','Spider'], answer:'Spider',
    hint:'This eight-legged creature spins silk to build its home and catch food.',
    explanation:'Spiders spin silk webs that they use both as their home and as a trap to catch insects for food. Bees, butterflies, and flies do not build webs.' }),

  makeMCQ({ id:'g5sc-pp21-002', chapterId:'plants', difficulty:1,
    question:'Which of the following vegetables is a <strong>root</strong> vegetable?',
    options:['Beans','Broccoli','Carrot','Celery'], answer:'Carrot',
    hint:'This orange vegetable grows underground.',
    explanation:'A carrot is a root — it grows underground and stores nutrients for the plant. Beans and broccoli are other plant parts; celery is a stem.' }),

  makeMCQ({ id:'g5sc-pp21-003', chapterId:'energy', difficulty:1,
    question:'A fish swimming in a river has which <strong>form of energy</strong>?',
    options:['Heat energy','Light energy','Movement energy','Sound energy'], answer:'Movement energy',
    hint:'Any object that is moving possesses this form of energy.',
    explanation:'A swimming fish possesses movement (kinetic) energy. This energy came from the chemical energy stored in its food.' }),

  makeMCQ({ id:'g5sc-pp21-004', chapterId:'electricity', difficulty:1,
    question:'What is the <strong>function of a switch</strong> in an electric circuit?',
    options:['It protects against electric shocks.','It opens and closes the circuit.','It conducts electricity in the circuit.','It transforms electrical energy into light energy.'], answer:'It opens and closes the circuit.',
    hint:'When you flick it one way, the light comes on; the other way, it goes off.',
    explanation:'A switch opens and closes the circuit. When closed, the circuit is complete and current flows. When open, the circuit is broken and no current flows.' }),

  makeMCQ({ id:'g5sc-pp21-005', chapterId:'plants', difficulty:2,
    question:'Tina put a plant cutting in water. After a few days, she saw water absorbed through the roots. What can she <strong>conclude</strong> about the function of roots?',
    options:['The root holds the plant in soil.','The root stores food.','The root absorbs water.','The root absorbs oil.'], answer:'The root absorbs water.',
    hint:'The experiment shows roots directly taking in water from the surrounding liquid.',
    explanation:'Tina\'s experiment shows that roots absorb water. Roots also anchor the plant and sometimes store food, but this experiment specifically demonstrates water absorption.' }),

  makeMCQ({ id:'g5sc-pp21-006', chapterId:'electricity', difficulty:1,
    question:'Which component of an electric circuit is also called a <strong>dry cell</strong> and provides energy to the circuit?',
    options:['Bulb','Battery (cell)','Switch','Wire'], answer:'Battery (cell)',
    hint:'This component is the power source of the circuit.',
    explanation:'A battery (or dry cell) provides the electrical energy that drives the current around the circuit. Without it, the circuit has no power source.' }),

  makeMCQ({ id:'g5sc-pp21-007', chapterId:'plants', difficulty:1,
    question:'Which part of a jackfruit tree <strong>manufactures food</strong> for the plant?',
    options:['Flower','Fruit','Leaf','Root'], answer:'Leaf',
    hint:'This green, flat part of the plant uses sunlight to make food through photosynthesis.',
    explanation:'The leaf manufactures food for the plant through photosynthesis. It uses sunlight, carbon dioxide, and water to produce glucose (sugar).' }),

  makeMCQ({ id:'g5sc-pp21-008', chapterId:'plants', difficulty:2,
    question:'What is <strong>soil erosion</strong>?',
    options:['The addition of minerals to soil','The growth of plants in soil','The removal and carrying away of soil by wind or water','The mixing of different types of soil'], answer:'The removal and carrying away of soil by wind or water',
    hint:'Erosion means wearing away — think of rain washing soil downhill.',
    explanation:'Soil erosion is the removal and carrying away of topsoil by agents such as wind and water. It is made worse by cutting down trees and overgrazing.' }),

  makeMCQ({ id:'g5sc-pp21-009', chapterId:'water-matter', difficulty:2,
    question:'During the process of <strong>freezing</strong>, water changes from _____ to _____.',
    options:['Gas to liquid','Liquid to solid','Solid to gas','Solid to liquid'], answer:'Liquid to solid',
    hint:'Freezing happens when you put water in the freezer.',
    explanation:'During freezing, liquid water loses heat energy and changes into solid ice. This happens at 0°C (the freezing point of water).' }),

  makeMCQ({ id:'g5sc-pp21-010', chapterId:'water-matter', difficulty:2,
    question:'During <strong>condensation</strong>, water changes from _____ to _____.',
    options:['Gas to liquid','Liquid to gas','Solid to liquid','Liquid to solid'], answer:'Gas to liquid',
    hint:'This is what makes water droplets form on the outside of a cold glass.',
    explanation:'Condensation occurs when water vapour (gas) cools down and changes back into liquid water. In the water cycle, this forms clouds.' }),

  makeMCQ({ id:'g5sc-pp21-011', chapterId:'animals', difficulty:2,
    question:'The Kestrel is a bird found only in Mauritius. What type of bird is the Kestrel?',
    options:['Extinct','Exotic','Endemic','Endangered'], answer:'Endemic',
    hint:'This word describes a species found naturally in one specific place and nowhere else.',
    explanation:'The Mauritius Kestrel (Falco punctatus) is endemic to Mauritius — it is found in the wild only on the island of Mauritius. It was saved from extinction through conservation.' }),

  makeMCQ({ id:'g5sc-pp21-012', chapterId:'animals', difficulty:3,
    question:'Which feature of the <strong>chameleon</strong> helps it grip onto tree branches?',
    options:['Its curly tail','Its feet with fused toes that clamp branches','Its long sticky tongue','Its rotating eyes'], answer:'Its feet with fused toes that clamp branches',
    hint:'Think about what is different and useful about a chameleon\'s feet compared to other lizards.',
    explanation:'A chameleon\'s feet have toes that are fused into two opposing groups (like tongs), allowing them to grip branches firmly. Their prehensile tail also helps for balance.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp21-pdf-001', chapterId:'energy', marks:3, year:2021, grade:5, subject:'Science',
    question:'The survey results show: solar water heaters (10 people), electric water heaters (2 people), gas water heaters (6 people). (a) How many more people use solar than gas heaters? (b) Which source of energy is most popular? (c) Why might solar heaters be preferred in Mauritius?', type:'write' },
  { id:'g5sc-pp21-pdf-002', chapterId:'water-matter', marks:3, year:2021, grade:5, subject:'Science',
    question:'Jim places three containers of water at 55°C, 65°C and 75°C outdoors. Which container will lose water fastest through evaporation? Explain your answer.', type:'write' },
  { id:'g5sc-pp21-pdf-003', chapterId:'animals', marks:2, year:2021, grade:5, subject:'Science',
    question:'Name ONE way in which the Kestrel was nearly wiped out, and ONE conservation action that helped save it.', type:'write' }
);
