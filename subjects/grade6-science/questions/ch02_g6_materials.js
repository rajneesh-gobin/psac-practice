'use strict';
// Grade 6 Science — Chapter: Materials (rusting, biodegradable, waste disposal)
// IDs format: g6sci-mat-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-mat-001', chapterId:'g6-materials', difficulty:1,
    question:'What is RUSTING?',
    options:[
      'Iron becoming stronger when exposed to air',
      'Iron reacting with water and oxygen to form iron oxide (rust)',
      'Iron melting when heated to a high temperature',
      'Iron becoming magnetic when left outdoors'
    ],
    answer:'Iron reacting with water and oxygen to form iron oxide (rust)',
    hint:'Rust is the reddish-brown substance that forms on iron.',
    explanation:'<b>Rusting</b> is a chemical reaction between iron, water and oxygen that produces <b>iron oxide</b> (rust) — the reddish-brown, flaky substance that weakens iron and steel objects.' }),

  makeMCQ({ id:'g6sci-mat-002', chapterId:'g6-materials', difficulty:2,
    question:'Which THREE conditions are needed for iron to rust?',
    options:['Iron, water and oxygen','Iron, heat and sunlight','Iron, salt and carbon dioxide','Iron, acid and nitrogen'],
    answer:'Iron, water and oxygen',
    hint:'Rust forms fastest near the sea — salt water speeds up the process.',
    explanation:'Iron rusts when it is in contact with both <b>water</b> and <b>oxygen</b>. Salt water speeds up rusting because salt is an electrolyte that helps the chemical reaction proceed faster.' }),

  makeMCQ({ id:'g6sci-mat-003', chapterId:'g6-materials', difficulty:2,
    question:'What is GALVANISING?',
    options:[
      'Coating iron with a layer of zinc to prevent rusting',
      'Painting iron with a red primer to make it look attractive',
      'Heating iron to harden it',
      'Mixing iron with carbon to make steel'
    ],
    answer:'Coating iron with a layer of zinc to prevent rusting',
    hint:'Galvanised iron is used for roofing sheets in Mauritius.',
    explanation:'<b>Galvanising</b> is the process of coating iron or steel with a thin layer of <b>zinc</b>. Zinc does not rust easily, so it protects the iron underneath. Galvanised sheets are widely used for roofing.' }),

  makeTF({ id:'g6sci-mat-004', chapterId:'g6-materials', difficulty:1,
    question:'Painting iron or steel prevents rusting by keeping air and water away from the metal surface.',
    answer:true,
    hint:'Think about why bridges and cars are painted.',
    explanation:'True. <b>Paint</b> forms a protective coating that prevents water and oxygen from reaching the iron surface. Once the paint chips or peels, rusting begins at the exposed spots — which is why surfaces must be repainted regularly.' }),

  makeMCQ({ id:'g6sci-mat-005', chapterId:'g6-materials', difficulty:1,
    question:'Which of the following materials is BIODEGRADABLE?',
    options:['Plastic bottle','Glass jar','Apple core','Aluminium can'],
    answer:'Apple core',
    hint:'Biodegradable means it can be broken down naturally by bacteria and fungi.',
    explanation:'An <b>apple core</b> is biodegradable — it is made of organic material that bacteria and fungi can break down into simpler substances. Plastic, glass and aluminium are NOT biodegradable and persist in the environment for hundreds of years.' }),

  makeMCQ({ id:'g6sci-mat-006', chapterId:'g6-materials', difficulty:1,
    question:'Which method of waste disposal is BEST for the environment?',
    options:['Burning all waste in the open','Burying all waste in a landfill','Reduce, reuse and recycle materials','Dumping waste in the ocean'],
    answer:'Reduce, reuse and recycle materials',
    hint:'The 3Rs reduce the amount of waste that needs to be disposed of.',
    explanation:'<b>Reducing, reusing and recycling</b> waste is best for the environment — it conserves resources, reduces energy use and decreases the amount of rubbish sent to landfill or incinerated. Burning and dumping waste causes pollution.' }),

  makeMCQ({ id:'g6sci-mat-007', chapterId:'g6-materials', difficulty:2,
    question:'What is a LANDFILL?',
    options:[
      'A recycling centre where materials are sorted',
      'A site where waste is buried underground',
      'A factory that burns waste to generate electricity',
      'A plant that converts waste into compost'
    ],
    answer:'A site where waste is buried underground',
    hint:'This is the most common method of waste disposal in many countries.',
    explanation:'A <b>landfill</b> is a designated site where waste is buried in layers underground. Although widely used, landfills take up land, can leak harmful chemicals into groundwater, and produce methane gas as waste decomposes.' }),

  makeMCQ({ id:'g6sci-mat-008', chapterId:'g6-materials', difficulty:2,
    question:'Why is plastic harmful to the environment even after it is thrown away?',
    options:[
      'Plastic dissolves quickly in seawater, making it salty',
      'Plastic is non-biodegradable — it breaks into tiny microplastics that persist for centuries',
      'Plastic absorbs all the sunlight, making it harder for plants to grow',
      'Plastic is magnetic and disrupts the Earth\'s magnetic field'
    ],
    answer:'Plastic is non-biodegradable — it breaks into tiny microplastics that persist for centuries',
    hint:'Plastic does not rot — it just breaks into smaller and smaller pieces.',
    explanation:'Plastic is <b>non-biodegradable</b>. Instead of breaking down into harmless substances, it fragments into tiny <b>microplastics</b> that enter waterways, oceans and food chains, causing harm to marine life and potentially to humans.' }),

  makeMCQ({ id:'g6sci-mat-009', chapterId:'g6-materials', difficulty:2,
    question:'Which of the following best prevents a metal gate from rusting?',
    options:[
      'Washing it with water every day',
      'Keeping it in a very windy place',
      'Painting it regularly to keep moisture and air away',
      'Placing it near a source of heat'
    ],
    answer:'Painting it regularly to keep moisture and air away',
    hint:'Rust needs both water AND oxygen to form.',
    explanation:'<b>Painting</b> the gate regularly creates a waterproof barrier between the iron and the air/water. If water and oxygen cannot reach the iron, rusting cannot occur.' }),

  makeTF({ id:'g6sci-mat-010', chapterId:'g6-materials', difficulty:2,
    question:'Incineration (burning waste) is completely harmless to the environment.',
    answer:false,
    hint:'What does burning produce?',
    explanation:'Incineration produces <b>smoke, ash and harmful gases</b> (including CO&#8322; and toxic chemicals), contributing to air pollution and climate change. Modern incinerators filter much of the pollution, but they are not completely harmless.' })

);
