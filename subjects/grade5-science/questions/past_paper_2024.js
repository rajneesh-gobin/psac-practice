'use strict';
// PSAC Grade 5 Science 2024 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp24-001', chapterId:'plants', subsection:'parts', difficulty:1,
    question:'Which part of a hibiscus plant <strong>contains pollen</strong>?',
    options:['Leaf','Petal','Male part','Female part'], answer:'Male part',
    hint:'Pollen is produced by the male reproductive part of a flower.',
    explanation:'The male part (stamen/anther) of the hibiscus produces pollen. The female part receives it during pollination.' }),

  makeMCQ({ id:'g5sc-pp24-002', chapterId:'water-matter', subsection:'properties', difficulty:1,
    question:'Which property of ice makes it suitable for the relief of pain?',
    options:['It is cold.','It is hard.','It is slippery.','It is solid.'], answer:'It is cold.',
    hint:'Think about how a cold pack reduces swelling and pain.',
    explanation:'Ice is cold, and this low temperature numbs pain and reduces swelling when applied to an injury.' }),

  makeMCQ({ id:'g5sc-pp24-003', chapterId:'electricity', subsection:'conductors', difficulty:1,
    question:'Which one of the following is a <strong>conductor</strong> of electricity?',
    options:['A plastic ruler','A rubber band','A glass plate','A metal coin'], answer:'A metal coin',
    hint:'Conductors of electricity are usually made of metal.',
    explanation:'A metal coin is made of metal, which allows electricity to pass through it. Plastic, rubber, and glass are insulators.' }),

  makeMCQ({ id:'g5sc-pp24-004', chapterId:'plants', subsection:'growth', difficulty:2,
    question:'Which one of the following is a <strong>natural</strong> cause of soil erosion?',
    options:['Strong winds','Overgrazing of land by cattle','Burning of forests','Cutting down of trees'], answer:'Strong winds',
    hint:'Natural causes happen without human activity.',
    explanation:'Strong winds are a natural cause of soil erosion. Overgrazing, burning forests, and cutting trees are all caused by humans.' }),

  makeMCQ({ id:'g5sc-pp24-005', chapterId:'plants', subsection:'reproduction', difficulty:2,
    question:'Which one of the following statements about germination is <strong>TRUE</strong>?',
    options:['The seed needs light to germinate.','The root appears first during germination.','The shoot appears first during germination.','The seed becomes bigger during germination.'], answer:'The root appears first during germination.',
    hint:'The first part of the seedling to emerge breaks through the seed coat downwards.',
    explanation:'During germination, the root (radicle) appears first and grows downward, then the shoot grows upward toward light.' }),

  makeMCQ({ id:'g5sc-pp24-006', chapterId:'plants', subsection:'growth', difficulty:1,
    question:'Which part of a mango plant <strong>takes water and minerals from the soil</strong>?',
    options:['Flower','Leaf','Stem','Root'], answer:'Root',
    hint:'This part grows underground.',
    explanation:'The root absorbs water and mineral salts from the soil and transports them upward to the rest of the plant.' }),

  makeMCQ({ id:'g5sc-pp24-007', chapterId:'plants', subsection:'parts', difficulty:1,
    question:'Which gas do plants take in to <strong>make their own food</strong>?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Carbon dioxide',
    hint:'Plants use sunlight and a green substance in their leaves to make food using this gas.',
    explanation:'Plants absorb carbon dioxide from the air through tiny pores (stomata) in their leaves to carry out photosynthesis.' }),

  makeMCQ({ id:'g5sc-pp24-008', chapterId:'water-matter', subsection:'states', difficulty:2,
    question:'In the water cycle, which process involves liquid water changing into water vapour?',
    options:['Condensation','Evaporation','Melting','Precipitation'], answer:'Evaporation',
    hint:'This process happens when the sun heats the surface of oceans, lakes and rivers.',
    explanation:'Evaporation is the process by which liquid water gains energy from the sun and changes to water vapour, rising into the atmosphere.' }),

  makeMCQ({ id:'g5sc-pp24-009', chapterId:'water-matter', subsection:'states', difficulty:2,
    question:'What happens to the level of mercury inside a thermometer when the temperature <strong>increases</strong>?',
    options:['It falls.','It rises.','It stays the same.','It disappears.'], answer:'It rises.',
    hint:'Liquids expand when they are heated.',
    explanation:'When temperature increases, the mercury (or alcohol) in the thermometer expands and rises up the tube, giving a higher reading.' }),

  makeMCQ({ id:'g5sc-pp24-010', chapterId:'animals', subsection:'classification', difficulty:2,
    question:'Which bird is <strong>endemic</strong> to the island of Mauritius?',
    options:['Echo parakeet','Sparrow','Peacock','Crow'], answer:'Echo parakeet',
    hint:'This bird is found only in Mauritius and is critically endangered.',
    explanation:'The Echo parakeet (Psittacula eques) is endemic to Mauritius — it is found nowhere else in the world. It was saved from extinction by conservation efforts.' }),

  makeMCQ({ id:'g5sc-pp24-011', chapterId:'animals', subsection:'classification', difficulty:2,
    question:'Name a bird that is endemic to the island of <strong>Rodrigues</strong>.',
    options:['Echo parakeet','Cardinal jaune (Rodrigues warbler)','Pink Pigeon','Kestrel'], answer:'Cardinal jaune (Rodrigues warbler)',
    hint:'Rodrigues island has its own unique small songbird found nowhere else — what is its local name?',
    explanation:'The Rodrigues warbler (Cardinal jaune / Acrocephalus rodericanus) is endemic to Rodrigues. The Echo parakeet and Kestrel are endemic to Mauritius.' }),

  makeMCQ({ id:'g5sc-pp24-012', chapterId:'energy', subsection:'sources', difficulty:1,
    question:'What <strong>source of energy</strong> does a tree use to make its own food?',
    options:['Chemical energy','Sound energy','Solar (sunlight) energy','Wind energy'], answer:'Solar (sunlight) energy',
    hint:'Plants carry out photosynthesis using energy from above.',
    explanation:'Trees (and all green plants) use sunlight (solar energy) along with carbon dioxide and water to make food through photosynthesis.' }),

  makeMCQ({ id:'g5sc-pp24-013', chapterId:'energy', subsection:'renewable', difficulty:2,
    question:'Which of the following is a <strong>fossil fuel</strong>?',
    options:['Bagasse','Charcoal','Petrol','Wood'], answer:'Petrol',
    hint:'Fossil fuels are formed from ancient dead organisms buried underground for millions of years.',
    explanation:'Petrol is a fossil fuel derived from crude oil. Bagasse is a by-product of sugarcane, charcoal comes from burning wood, and wood itself is not a fossil fuel.' }),

  makeMCQ({ id:'g5sc-pp24-014', chapterId:'electricity', subsection:'circuits', difficulty:1,
    question:'Which type of wire is <strong>safer</strong> to use in an electrical circuit?',
    options:['A bare metal wire with no covering','A wire covered in plastic insulation','A wire covered in cloth','A plain iron rod'], answer:'A wire covered in plastic insulation',
    hint:'The covering on electric wires prevents electric shocks.',
    explanation:'Wires covered in plastic or rubber insulation are safer because the insulating layer prevents accidental electric shocks by stopping electricity from passing through to a person who touches the wire.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp24-pdf-001', chapterId:'plants', marks:3, year:2024, grade:5, subject:'Science',
    question:'Draw and label the parts of a mango plant (root, stem, leaf, flower, fruit).', type:'draw' },
  { id:'g5sc-pp24-pdf-002', chapterId:'animals', marks:3, year:2024, grade:5, subject:'Science',
    question:'Match each animal (Dolphin, Camel, Deer) to its correct natural habitat (Deserts, Soil, Sea, Forest).', type:'match' },
  { id:'g5sc-pp24-pdf-003', chapterId:'energy', marks:4, year:2024, grade:5, subject:'Science',
    question:'Write down the energy transformation that occurs: (1) when a girl is running, (2) when a tree is making its food using sunlight.', type:'write' },
  { id:'g5sc-pp24-pdf-004', needsArtwork:true, chapterId:'electricity', marks:3, year:2024, grade:5, subject:'Science',
    question:'Label the components P (cell/battery), Q (wire), and R (switch) in the electric circuit diagram and state the function of each.', type:'label' }
);
