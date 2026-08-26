'use strict';
// Grade 4 Geography - Chapter: Our Natural Environment
// IDs format: g4ge-natenv-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-natenv-001', chapterId:'g4ge-natural-env', subsection:'natural_manmade', difficulty:1,
    question:'What is the difference between a natural feature and a man-made feature?',
    options:[
      'Natural features are big; man-made features are small',
      'Natural features are created by nature; man-made features are built by people',
      'Natural features are found only in cities; man-made features are in the countryside',
      'Natural features are underwater; man-made features are on land'
    ],
    answer:'Natural features are created by nature; man-made features are built by people',
    hint:'Think about who or what created the feature.',
    explanation:'<b>Natural features</b> are created by nature - for example mountains, rivers, beaches and lagoons. <b>Man-made features</b> are built by people - for example roads, buildings, bridges and dams.' }),

  makeMCQ({ id:'g4ge-natenv-002', chapterId:'g4ge-natural-env', subsection:'natural_manmade', difficulty:1,
    question:'Which of the following is a NATURAL feature of Mauritius?',
    options:['A bridge','A road','A mountain','A school'],
    answer:'A mountain',
    hint:'Mountains were not built by people.',
    explanation:'A <b>mountain</b> is a natural feature because it was formed by natural processes (volcanic activity) over millions of years. Bridges, roads and schools are all man-made.' }),

  makeMCQ({ id:'g4ge-natenv-003', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'What is the highest mountain peak in Mauritius?',
    options:['Corps de Garde','Piton de la Petite Rivière Noire','Pieter Both','Le Morne Brabant'],
    answer:'Piton de la Petite Rivière Noire',
    hint:'It stands 828 metres tall in the Black River district.',
    explanation:'<b>Piton de la Petite Rivière Noire</b> (828 m) in the south-west of Mauritius is the highest mountain peak on the island. It is located in the Black River district.' }),

  makeTF({ id:'g4ge-natenv-004', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'The central plateau is the flat, elevated land found in the middle of Mauritius.',
    answer:true,
    hint:'Cities like Curepipe and Rose Hill are built on this elevated area.',
    explanation:'The <b>central plateau</b> is a large, relatively flat area of high land in the centre of Mauritius, sitting about 500–700 m above sea level. Towns like Curepipe, Vacoas and Rose Hill are built on it.' }),

  makeMCQ({ id:'g4ge-natenv-005', chapterId:'g4ge-natural-env', subsection:'coast', difficulty:1,
    question:'What is a lagoon?',
    options:[
      'A deep ocean trench',
      'A freshwater lake in the mountains',
      'A shallow, calm body of sea water between the shore and a coral reef',
      'A fast-flowing river'
    ],
    answer:'A shallow, calm body of sea water between the shore and a coral reef',
    hint:'It is the beautiful, clear turquoise water you see at Mauritian beaches.',
    explanation:'A <b>lagoon</b> is a shallow, calm area of sea water enclosed between the shore and a coral reef. Mauritius is surrounded by a coral reef that creates a lagoon, protecting the beaches from rough ocean waves.' }),

  makeTF({ id:'g4ge-natenv-006', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'Corps de Garde and Pieter Both are names of mountains in Mauritius.',
    answer:true,
    hint:'Both are well-known peaks visible from many parts of the island.',
    explanation:'<b>Corps de Garde</b> and <b>Pieter Both</b> are both mountains in Mauritius. Corps de Garde (720 m) is near Quatre Bornes and Pieter Both (823 m) is in the Moka district - the second highest peak in Mauritius.' }),

  makeMCQ({ id:'g4ge-natenv-007', chapterId:'g4ge-natural-env', subsection:'water', difficulty:2,
    question:'Which of the following is a river in Mauritius?',
    options:['Black River (Rivière Noire)','River Nile','River Thames','Amazon River'],
    answer:'Black River (Rivière Noire)',
    hint:'This river is also the name of an important district in the south-west of Mauritius.',
    explanation:'<b>Rivière Noire (Black River)</b> is one of the main rivers in Mauritius, located in the south-west of the island. Other rivers include Rivière du Rempart and Grand River South East.' }),

  makeMCQ({ id:'g4ge-natenv-008', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'What is Rodrigues?',
    options:[
      'A mountain in Mauritius',
      'A river in the south of Mauritius',
      'A small island that is part of the Republic of Mauritius',
      'A beach in Port Louis'
    ],
    answer:'A small island that is part of the Republic of Mauritius',
    hint:'It is about 650 km east of Mauritius in the Indian Ocean.',
    explanation:'<b>Rodrigues</b> is a small island located about 650 km east of Mauritius in the Indian Ocean. It is part of the <b>Republic of Mauritius</b>, with its own regional government. It has its own hills, coral reef and lagoon.' }),

  makeMCQ({ id:'g4ge-natenv-009', chapterId:'g4ge-natural-env', subsection:'coast', difficulty:2,
    question:'What type of landform is found along the coast of Mauritius that protects it from ocean waves?',
    options:['A mountain range','A coral reef','A deep trench','A river delta'],
    answer:'A coral reef',
    hint:'It is a natural underwater barrier made by tiny sea creatures over thousands of years.',
    explanation:'Mauritius is surrounded by a <b>coral reef</b>, a natural barrier of coral just below the water surface. It protects the coastline from large ocean waves and creates calm lagoons ideal for swimming.' }),

  makeTF({ id:'g4ge-natenv-010', chapterId:'g4ge-natural-env', subsection:'water', difficulty:1,
    question:'A dam is a natural feature because it is built near a river.',
    answer:false,
    hint:'Who builds a dam?',
    explanation:'A <b>dam</b> is a <b>man-made feature</b>. It is constructed by people to hold back water and create reservoirs. Just because it is built near a natural river does not make it natural.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-natenv-011', chapterId:'g4ge-natural-env', subsection:'natural_manmade', difficulty:2,
    question:'Which of these is a MAN-MADE feature you might find in Mauritius?',
    options:['A lagoon','A coral reef','A beach','A sugar factory'],
    answer:'A sugar factory',
    hint:'Three of these options were created by nature.',
    explanation:'A <b>sugar factory</b> is a man-made structure built by people. Lagoons, coral reefs and beaches are all natural features formed by natural processes over time.' }),

  makeMCQ({ id:'g4ge-natenv-012', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:2,
    question:'Rivers in Mauritius flow FROM the central plateau TOWARDS the coast. Why is this?',
    options:[
      'Because rain only falls on the coast',
      'Because the central plateau is higher, so water flows downhill to the sea',
      'Because the sea is higher than the land',
      'Because wind pushes water to the coast'
    ],
    answer:'Because the central plateau is higher, so water flows downhill to the sea',
    hint:'Water always flows from high places to low places.',
    explanation:'Water always flows downhill due to gravity. The <b>central plateau</b> is higher than the coastal plains, so rivers flow outward from the plateau toward the lower coastal areas and into the sea.' }),

  makeMCQ({ id:'g4ge-natenv-013', chapterId:'g4ge-natural-env', subsection:'coast', difficulty:1,
    question:'What is a beach?',
    options:[
      'A rocky cliff above the sea',
      'A flat area of sand or pebbles along the edge of the sea',
      'A deep hole in the ocean',
      'A tall mountain by the coast'
    ],
    answer:'A flat area of sand or pebbles along the edge of the sea',
    hint:'People love to visit beaches to swim and relax in Mauritius.',
    explanation:'A <b>beach</b> is a flat area of sand, pebbles or coral along the edge of the sea. Mauritius has many beautiful sandy beaches, most protected by its coral reef and lagoon.' }),

  makeTF({ id:'g4ge-natenv-014', chapterId:'g4ge-natural-env', subsection:'coast', difficulty:2,
    question:'Rodrigues has its own coral reef and lagoon, just like Mauritius.',
    answer:true,
    hint:'Rodrigues is a tropical island like Mauritius.',
    explanation:'<b>Rodrigues</b> also has a coral reef surrounding it and a lagoon, similar to Mauritius. The lagoon of Rodrigues is one of the largest in the Indian Ocean relative to the island\'s size.' }),

  makeMCQ({ id:'g4ge-natenv-015', chapterId:'g4ge-natural-env', subsection:'water', difficulty:2,
    question:'The Grand River South East (Grande Rivière Sud-Est) is famous for which natural feature?',
    options:['Being the longest river in Mauritius','Having a waterfall where it meets the sea','Being a dry river all year','Flowing through Port Louis'],
    answer:'Having a waterfall where it meets the sea',
    hint:'This is an unusual place to find a waterfall - right where the river ends!',
    explanation:'The <b>Grand River South East</b> is notable for its <b>waterfall</b> at its mouth, where it flows into the Indian Ocean. It is also the longest river in Mauritius (about 35 km) and flows through the south-east of the island.' }),

  makeMCQ({ id:'g4ge-natenv-016', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'What does the word "plateau" mean in geography?',
    options:[
      'A steep mountain with a sharp peak',
      'A flat or gently rolling area of high land',
      'A deep valley between two mountains',
      'A sandy beach by the sea'
    ],
    answer:'A flat or gently rolling area of high land',
    hint:'The central plateau of Mauritius is high but relatively flat - many towns are built on it.',
    explanation:'A <b>plateau</b> is a large flat or gently rolling area of elevated land. The <b>central plateau</b> of Mauritius is a good example - it sits 500–700 m above sea level and is flat enough for towns, roads and agriculture.' }),

  makeTF({ id:'g4ge-natenv-017', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'Mauritius is located in the Indian Ocean.',
    answer:true,
    hint:'Look at a map of Africa - Mauritius is the island to the east of Madagascar.',
    explanation:'<b>Mauritius</b> is an island nation located in the <b>Indian Ocean</b>, approximately 2,000 km off the south-east coast of Africa. It is east of Madagascar and is part of the Mascarene Islands group.' }),

  makeMCQ({ id:'g4ge-natenv-018', chapterId:'g4ge-natural-env', subsection:'natural_manmade', difficulty:3,
    question:'A student says: "All the features I see on the way to school are natural features." Name ONE natural feature AND ONE man-made feature they might actually see, and explain the difference.',
    options:[
      'Natural: a river. Man-made: a bridge. Natural features are formed by nature; man-made features are built by people.',
      'Natural: a road. Man-made: a beach. Both are formed by the same process.',
      'Natural: a building. Man-made: a mountain. Buildings grow from the ground naturally.',
      'Natural: a dam. Man-made: a tree. Dams grow in forests.'
    ],
    answer:'Natural: a river. Man-made: a bridge. Natural features are formed by nature; man-made features are built by people.',
    hint:'Rivers exist without any human involvement; bridges are constructed by engineers.',
    explanation:'A <b>river</b> is a natural feature - it was formed by rainfall and flows naturally downhill. A <b>bridge</b> is man-made - engineers and workers built it across the river. The key difference: natural features exist without human involvement; man-made features are constructed by people.' }),

  makeMCQ({ id:'g4ge-natenv-019', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:2,
    question:'Which of these best describes the shape of Mauritius?',
    options:[
      'A long, narrow island like a thin rectangle',
      'A roughly oval/pear-shaped island with a central plateau surrounded by coastal plains',
      'A perfectly circular island with no mountains',
      'A flat, desert island with no rivers'
    ],
    answer:'A roughly oval/pear-shaped island with a central plateau surrounded by coastal plains',
    hint:'Think about the shape you see on a map of Mauritius.',
    explanation:'Mauritius has a roughly <b>oval or pear shape</b>. It has a raised <b>central plateau</b> at its heart, surrounded by mountain ranges, which then slope down to <b>coastal plains</b> and finally the coast with its beaches, lagoons and coral reef.' })

);
