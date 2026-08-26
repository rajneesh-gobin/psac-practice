'use strict';
// PSAC Grade 5 Science October 2019 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp19-001', chapterId:'water-matter', subsection:'states', difficulty:1,
    question:'Which of the following is in the <strong>solid state</strong>?',
    options:['Air','Ice','Steam','Water'], answer:'Ice',
    hint:'A solid has a definite shape and does not flow.',
    explanation:'Ice is water in its solid state. It has a fixed shape and volume. Air and steam are gases; water (liquid) and steam are not solids.' }),

  makeMCQ({ id:'g5sc-pp19-002', chapterId:'plants', subsection:'parts', difficulty:1,
    question:'Which part of a plant <strong>carries water</strong> from the roots to the leaves?',
    options:['Flower','Fruit','Leaf','Stem'], answer:'Stem',
    hint:'This part of the plant is like its water pipe.',
    explanation:'The stem transports water and mineral salts from the roots upward to all other parts of the plant, including the leaves, through tubes called xylem vessels.' }),

  makeMCQ({ id:'g5sc-pp19-003', chapterId:'plants', subsection:'growth', difficulty:2,
    question:'Which of the following actions <strong>helps prevent soil erosion</strong>?',
    options:['Burning of forests','Cutting down of trees','Growing dense vegetation','Overgrazing by animals'], answer:'Growing dense vegetation',
    hint:'Roots hold soil in place — more plants mean more roots.',
    explanation:'Growing dense vegetation (plants and trees) prevents soil erosion because plant roots bind the soil together and plant cover protects the ground from the force of rain and wind.' }),

  makeMCQ({ id:'g5sc-pp19-004', chapterId:'energy', subsection:'transfer', difficulty:1,
    question:'The main energy transformation that takes place when an <strong>electric iron</strong> is used is:',
    options:['Electrical energy to heat energy','Electrical energy to sound energy','Light energy to electrical energy','Light energy to heat energy'], answer:'Electrical energy to heat energy',
    hint:'What does an iron do? It warms up to remove creases.',
    explanation:'An electric iron converts electrical energy to heat energy. This heat is used to smooth out creases in clothing.' }),

  makeMCQ({ id:'g5sc-pp19-005', chapterId:'electricity', subsection:'circuits', difficulty:2,
    question:'Four circuits are shown: Circuit A has a gap in the wire; Circuit B is a complete closed circuit; Circuit C has an open switch; Circuit D has no battery. In which circuit will the <strong>bulb light up</strong>?',
    options:['Circuit A','Circuit B','Circuit C','Circuit D'], answer:'Circuit B',
    hint:'Electricity needs a complete path with a power source to flow.',
    explanation:'The bulb lights up only in Circuit B, which is a complete closed circuit with a battery and no breaks. Circuits A, C, and D all have either a break or no power source.' }),

  makeMCQ({ id:'g5sc-pp19-006', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'Why are <strong>flowers usually colourful</strong> and scented?',
    options:['To attract insects for pollination','To carry water to other parts of the plant','To manufacture food for the plant','To store food for the plant'], answer:'To attract insects for pollination',
    hint:'Flowers need insects to carry pollen from one flower to another.',
    explanation:'Flowers are brightly coloured and often scented to attract insects such as bees and butterflies. When insects visit for nectar, they pick up pollen and carry it to other flowers, enabling pollination.' }),

  makeMCQ({ id:'g5sc-pp19-007', chapterId:'animals', subsection:'habitats', difficulty:1,
    question:'Which of these animals <strong>lives in the soil</strong>?',
    options:['Bird','Earthworm','Fish','Frog'], answer:'Earthworm',
    hint:'This worm-like creature burrows through the ground and improves soil quality.',
    explanation:'Earthworms live in the soil. They burrow through it, which improves drainage and aeration, making the soil better for plant growth.' }),

  makeMCQ({ id:'g5sc-pp19-008', chapterId:'animals', subsection:'habitats', difficulty:1,
    question:'Which animal can live <strong>both in water and on land</strong>?',
    options:['Bird','Earthworm','Fish','Frog'], answer:'Frog',
    hint:'The name of this animal\'s group means "double life" in Greek.',
    explanation:'Frogs are amphibians and can live both in water and on land. They breathe through gills as tadpoles in water and through lungs and skin as adults on land.' }),

  makeMCQ({ id:'g5sc-pp19-009', chapterId:'animals', subsection:'classification', difficulty:2,
    question:'Which bird is <strong>endemic</strong> to the island of Mauritius and is known as the national bird?',
    options:['Crow','Dove','Kestrel','Sparrow'], answer:'Kestrel',
    hint:'Mauritius chose an endemic raptor as its national symbol — which of these is a bird of prey?',
    explanation:'The Mauritius Kestrel (Falco punctatus) is endemic to Mauritius and is the national bird. It was saved from extinction through a successful breeding programme.' }),

  makeMCQ({ id:'g5sc-pp19-010', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'What substance found in plant leaves helps them <strong>make food using sunlight</strong>?',
    options:['Carbon dioxide','Chlorophyll','Oxygen','Water'], answer:'Chlorophyll',
    hint:'This green substance is what makes leaves green.',
    explanation:'Chlorophyll is the green pigment found in plant leaves that absorbs sunlight energy. It is essential for photosynthesis — the process by which plants make their own food.' }),

  makeMCQ({ id:'g5sc-pp19-011', chapterId:'water-matter', subsection:'states', difficulty:2,
    question:'Water evaporates from the sea to form clouds. What is the <strong>source of energy</strong> that drives evaporation?',
    options:['The moon','The rain','The sea','The sun'], answer:'The sun',
    hint:'Evaporation needs heat — where does natural heat energy come from?',
    explanation:'The sun provides the heat energy that drives evaporation in the water cycle. Sunlight heats the surface of oceans and lakes, causing liquid water to change into water vapour.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp19-pdf-001', chapterId:'plants', marks:4, year:2019, grade:5, subject:'Science',
    question:'Draw and label the parts of a flower: petals, male part (stamen), female part (pistil), sepal. State the function of the male part and the female part.', type:'draw' },
  { id:'g5sc-pp19-pdf-002', chapterId:'electricity', marks:3, year:2019, grade:5, subject:'Science',
    question:'A circuit has a battery, a switch, and a bulb. (a) Draw the circuit with the switch open. (b) Name two insulators and two conductors you could test by placing them in the circuit gap.', type:'draw' },
  { id:'g5sc-pp19-pdf-003', chapterId:'animals', marks:3, year:2019, grade:5, subject:'Science',
    question:'Give ONE feature that helps: (a) the cactus survive in the desert, (b) the duck survive in water, (c) the camel survive without water for a long time.', type:'write' }
);
