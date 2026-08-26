'use strict';
// PSAC Grade 5 Science October 2018 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp18-001', chapterId:'water-matter', subsection:'properties', difficulty:1,
    question:'Which <strong>two properties</strong> of ice make it good for use on skating rinks?',
    options:['Warm and soft','Warm and slippery','Hard and slippery','Cold and rough'], answer:'Hard and slippery',
    hint:'Skaters glide on it — think about its texture and state.',
    explanation:'Ice is hard (solid state) and slippery (low friction at its surface). These two properties make it ideal for ice skating. It is cold, not warm.' }),

  makeMCQ({ id:'g5sc-pp18-002', chapterId:'plants', subsection:'reproduction', difficulty:2,
    question:'Which part of a flower <strong>receives pollen</strong> during pollination?',
    options:['Female part (stigma)','Male part (anther)','Leaf','Petal'], answer:'Female part (stigma)',
    hint:'Pollen is produced by the male part and must land on the opposite part.',
    explanation:'The female part (stigma/pistil) receives pollen during pollination. Pollen is produced by the male part (anther/stamen) and must travel to the female part for fertilisation to occur.' }),

  makeMCQ({ id:'g5sc-pp18-003', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'Which plant is well adapted to live in <strong>wetlands</strong> and marshy areas?',
    options:['Bulrush','Cactus','Fern','Papaya'], answer:'Bulrush',
    hint:'Think about which plant from the options is specifically adapted to waterlogged, marshy areas — not just moist ones.',
    explanation:'Bulrush (cattail) is adapted to grow in waterlogged, marshy, and wetland conditions. Cactus is adapted to dry deserts; ferns prefer shaded, moist-but-not-flooded areas; papayas need well-drained soil.' }),

  makeMCQ({ id:'g5sc-pp18-004', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'Which plant is cultivated mainly for its <strong>stem</strong>?',
    options:['Tea','Sugar cane','Beetroot','Water lily'], answer:'Sugar cane',
    hint:'Think about which of these plants is mainly harvested for its stem, not its leaves or roots.',
    explanation:'Sugar cane is cultivated for its thick stem, which is rich in sucrose (sugar). Tea is grown for its leaves, beetroot for its root, and water lily for ornamental flowers.' }),

  makeMCQ({ id:'g5sc-pp18-005', chapterId:'energy', subsection:'transfer', difficulty:2,
    question:'A washing machine uses electricity to spin a drum of clothes. What is the energy transformation taking place?',
    options:['Chemical energy → electrical energy','Electrical energy → light energy','Chemical energy → sound energy','Electrical energy → movement energy'], answer:'Electrical energy → movement energy',
    hint:'The machine plugs into the wall and makes a drum spin round.',
    explanation:'A washing machine transforms electrical energy into movement (kinetic) energy as the electric motor spins the drum. There is also some heat and sound produced, but movement is the main output.' }),

  makeMCQ({ id:'g5sc-pp18-006', chapterId:'electricity', subsection:'circuits', difficulty:2,
    question:'A circuit has a wire connected to only <strong>one terminal</strong> of a dry cell. This is described as a(n) _____ circuit.',
    options:['Closed circuit','Complete circuit','Open circuit','Short circuit'], answer:'Open circuit',
    hint:'For current to flow, the circuit must be complete — connecting both terminals.',
    explanation:'A circuit connected to only one terminal of the battery is an open circuit. Current cannot flow because there is no complete path from one terminal, through the circuit, back to the other terminal.' }),

  makeMCQ({ id:'g5sc-pp18-007', chapterId:'electricity', subsection:'circuits', difficulty:1,
    question:'Which component in a circuit allows you to <strong>save energy</strong> by turning the light off when it is not needed?',
    options:['Battery','Bulb','Switch','Wire'], answer:'Switch',
    hint:'You use this every time you enter or leave a room.',
    explanation:'A switch allows you to open or close the circuit. Opening the switch breaks the circuit so no current flows and the bulb goes off, saving electrical energy.' }),

  makeMCQ({ id:'g5sc-pp18-008', chapterId:'plants', subsection:'parts', difficulty:2,
    question:'What is the main function of a <strong>leaf</strong> in a plant?',
    options:['It attracts insects for pollination.','It carries water to other parts of the plant.','It makes food for the plant through photosynthesis.','It protects and nourishes the seeds.'], answer:'It makes food for the plant through photosynthesis.',
    hint:'Leaves are green because of a substance that captures sunlight to make food.',
    explanation:'The main function of a leaf is to make food for the plant through photosynthesis, using sunlight, carbon dioxide, and water. Chlorophyll in leaves captures the sunlight energy.' }),

  makeMCQ({ id:'g5sc-pp18-009', chapterId:'plants', subsection:'growth', difficulty:2,
    question:'Which of the following <strong>causes soil erosion</strong>?',
    options:['Dense forest cover on hillsides','Heavy rain and strong winds','Planting mangroves along coasts','Using organic fertiliser'], answer:'Heavy rain and strong winds',
    hint:'Natural forces that move loose soil from one place to another.',
    explanation:'Heavy rain and strong winds are the main natural agents of soil erosion. Raindrops dislodge soil particles and water flows carry them away; wind blows dry topsoil.' }),

  makeMCQ({ id:'g5sc-pp18-010', chapterId:'conservation', subsection:'deforestation', difficulty:3,
    question:'How do <strong>mangrove trees</strong> help protect coastal regions from erosion?',
    options:['By attracting large numbers of fish to the coast','By providing shade for people on the beach','By providing food and shelter for animals','Their dense roots trap sediment and prevent coastal erosion'], answer:'Their dense roots trap sediment and prevent coastal erosion',
    hint:'Think about what mangrove roots look like above the water — they form a thick tangle.',
    explanation:'Mangrove trees have complex root systems that trap sediment and absorb wave energy, protecting coastlines from erosion. They also act as nurseries for fish and other marine animals.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp18-pdf-001', chapterId:'plants', marks:4, year:2018, grade:5, subject:'Science',
    question:'Draw the water cycle and label: evaporation, condensation, precipitation, and collection. Write one sentence explaining each process.', type:'draw' },
  { id:'g5sc-pp18-pdf-002', chapterId:'electricity', marks:3, year:2018, grade:5, subject:'Science',
    question:'A student places a plastic ruler, an iron nail, and a copper wire one at a time across a gap in a circuit with a bulb. State which objects will make the bulb light up and why.', type:'write' },
  { id:'g5sc-pp18-pdf-003', chapterId:'conservation', marks:2, year:2018, grade:5, subject:'Science',
    question:'Give TWO ways in which people in Mauritius can help conserve water at home.', type:'write' }
);
