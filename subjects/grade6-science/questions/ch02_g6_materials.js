'use strict';
// Grade 6 Science - Chapter: Materials (rusting, biodegradable, waste disposal)
// IDs format: g6sci-mat-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-mat-001', chapterId:'g6-materials', subsection:'rusting', difficulty:1,
    question:'What is RUSTING?',
    options:[
      'Iron becoming stronger when exposed to air',
      'Iron reacting with water and oxygen to form iron oxide (rust)',
      'Iron melting when heated to a high temperature',
      'Iron becoming magnetic when left outdoors'
    ],
    answer:'Iron reacting with water and oxygen to form iron oxide (rust)',
    hint:'Rust is the reddish-brown substance that forms on iron.',
    explanation:'<b>Rusting</b> is a chemical reaction between iron, water and oxygen that produces <b>iron oxide</b> (rust) - the reddish-brown, flaky substance that weakens iron and steel objects.' }),

  makeMCQ({ id:'g6sci-mat-002', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'Which THREE conditions are needed for iron to rust?',
    options:['Iron, water and oxygen','Iron, heat and sunlight','Iron, salt and carbon dioxide','Iron, acid and nitrogen'],
    answer:'Iron, water and oxygen',
    hint:'Rust forms fastest near the sea - salt water speeds up the process.',
    explanation:'Iron rusts when it is in contact with both <b>water</b> and <b>oxygen</b>. Salt water speeds up rusting because salt is an electrolyte that helps the chemical reaction proceed faster.' }),

  makeMCQ({ id:'g6sci-mat-003', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
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

  makeTF({ id:'g6sci-mat-004', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'Painting iron or steel prevents rusting by keeping air and water away from the metal surface.',
    answer:true,
    hint:'Think about why bridges and cars are painted.',
    explanation:'True. <b>Paint</b> forms a protective coating that prevents water and oxygen from reaching the iron surface. Once the paint chips or peels, rusting begins at the exposed spots - which is why surfaces must be repainted regularly.' }),

  makeMCQ({ id:'g6sci-mat-005', chapterId:'g6-materials', subsection:'properties', difficulty:1,
    question:'Which of the following materials is BIODEGRADABLE?',
    options:['Plastic bottle','Glass jar','Apple core','Aluminium can'],
    answer:'Apple core',
    hint:'Biodegradable means it can be broken down naturally by bacteria and fungi.',
    explanation:'An <b>apple core</b> is biodegradable - it is made of organic material that bacteria and fungi can break down into simpler substances. Plastic, glass and aluminium are NOT biodegradable and persist in the environment for hundreds of years.' }),

  makeMCQ({ id:'g6sci-mat-006', chapterId:'g6-materials', subsection:'waste', difficulty:1,
    question:'Which method of waste disposal is BEST for the environment?',
    options:['Burning all waste in the open','Burying all waste in a landfill','Reduce, reuse and recycle materials','Dumping waste in the ocean'],
    answer:'Reduce, reuse and recycle materials',
    hint:'The 3Rs reduce the amount of waste that needs to be disposed of.',
    explanation:'<b>Reducing, reusing and recycling</b> waste is best for the environment - it conserves resources, reduces energy use and decreases the amount of rubbish sent to landfill or incinerated. Burning and dumping waste causes pollution.' }),

  makeMCQ({ id:'g6sci-mat-007', chapterId:'g6-materials', subsection:'properties', difficulty:2,
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

  makeMCQ({ id:'g6sci-mat-008', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'Why is plastic harmful to the environment even after it is thrown away?',
    options:[
      'Plastic dissolves quickly in seawater, making it salty',
      'Plastic is non-biodegradable - it breaks into tiny microplastics that persist for centuries',
      'Plastic absorbs all the sunlight, making it harder for plants to grow',
      'Plastic is magnetic and disrupts the Earth\'s magnetic field'
    ],
    answer:'Plastic is non-biodegradable - it breaks into tiny microplastics that persist for centuries',
    hint:'Plastic does not rot - it just breaks into smaller and smaller pieces.',
    explanation:'Plastic is <b>non-biodegradable</b>. Instead of breaking down into harmless substances, it fragments into tiny <b>microplastics</b> that enter waterways, oceans and food chains, causing harm to marine life and potentially to humans.' }),

  makeMCQ({ id:'g6sci-mat-009', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
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

  makeTF({ id:'g6sci-mat-010', chapterId:'g6-materials', subsection:'waste', difficulty:2,
    question:'Incineration (burning waste) is completely harmless to the environment.',
    answer:false,
    hint:'What does burning produce?',
    explanation:'Incineration produces <b>smoke, ash and harmful gases</b> (including CO&#8322; and toxic chemicals), contributing to air pollution and climate change. Modern incinerators filter much of the pollution, but they are not completely harmless.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-mat-011', chapterId:'g6-materials', subsection:'rusting', difficulty:1,
    question:'What colour is rust? (PSAC 2025)',
    options:['Silver-grey','Shiny black','Reddish-brown','Dark green'],
    answer:'Reddish-brown',
    hint:'You have seen this colour on old metal gates and tin roofs.',
    explanation:'Rust is <b>reddish-brown</b> in colour. It is the common name for iron oxide (Fe₂O₃), which forms when iron reacts with water and oxygen. Unlike iron, rust is weak and flaky - it gradually weakens and destroys iron structures if left untreated.' }),

  makeMCQ({ id:'g6sci-mat-012', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'Which material is obtained from LATEX (the milky sap of the rubber tree)?',
    options:['Cotton','Paper','Rubber','Silk'],
    answer:'Rubber',
    hint:'This material is used to make tyres, erasers and gloves.',
    explanation:'<b>Rubber</b> is made from latex, the milky white sap collected from rubber trees (Hevea brasiliensis). Natural rubber is elastic, waterproof and flexible. It is used for tyres, shoe soles, gloves and erasers. Synthetic rubber can also be made from petroleum.' }),

  makeMCQ({ id:'g6sci-mat-013', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'Which of the following is a property of GLASS? (PSAC 2025 Q7b)',
    options:[
      'Elastic and can stretch',
      'Transparent and brittle (breaks easily)',
      'Magnetic and conducts electricity well',
      'Biodegradable and soft'
    ],
    answer:'Transparent and brittle (breaks easily)',
    hint:'You can see through it, but it shatters when dropped.',
    explanation:'Glass is <b>transparent</b> (you can see through it clearly) and <b>brittle</b> (breaks/shatters easily when struck). Other properties of glass: hard, smooth, waterproof, and a poor conductor of electricity. Glass is a <b>man-made material</b>, manufactured from silica (sand) at very high temperatures.' }),

  makeMCQ({ id:'g6sci-mat-014', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'Give an example of a material obtained from ANIMALS. (PSAC 2025 Q7c)',
    options:['Cotton','Wood','Brick','Silk'],
    answer:'Silk',
    hint:'It is produced by a caterpillar to make its cocoon.',
    explanation:'<b>Silk</b> is a natural fibre produced by silkworms (caterpillars of the Bombyx mori moth) to spin their cocoons. Other materials from animals include: <b>wool</b> (from sheep), <b>leather</b> (from animal hides), <b>beeswax</b>, <b>honey</b> and <b>feathers</b>. Cotton comes from a plant, wood from trees, and brick is man-made from clay.' }),

  makeMCQ({ id:'g6sci-mat-015', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'Gold is a metal obtained from the Earth. Give one PROPERTY of gold. (PSAC 2025 Q7d)',
    options:[
      'It rusts quickly in rain',
      'It is shiny, does not rust, and is a good conductor of electricity',
      'It is magnetic and sticks to other metals',
      'It is cheap and found in large quantities everywhere'
    ],
    answer:'It is shiny, does not rust, and is a good conductor of electricity',
    hint:'Gold jewellery stays beautiful for thousands of years - why?',
    explanation:'<b>Gold</b> is prized because it: (1) is <b>shiny and attractive</b>; (2) does <b>not rust or corrode</b> - even ancient gold artefacts stay shiny; (3) is an excellent <b>conductor of electricity</b>, making it valuable in electronics. Gold\'s uses include jewellery, coins, electronic circuits and dental fillings.' }),

  makeTF({ id:'g6sci-mat-016', chapterId:'g6-materials', subsection:'rusting', difficulty:1,
    question:'Iron needs BOTH water AND oxygen to rust.',
    answer:true,
    hint:'Try leaving iron in dry air only - or in water with no oxygen.',
    explanation:'<b>True.</b> Experiments show that iron does NOT rust in dry air (oxygen only) and does NOT rust in boiled water sealed from air (water only). Rusting only occurs when <b>both water AND oxygen</b> are present. Salt water speeds up rusting because salt acts as an electrolyte that accelerates the chemical reaction.' }),

  makeMCQ({ id:'g6sci-mat-017', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'Apart from GALVANISING, name another way to prevent iron from rusting. (PSAC 2025 Q7e)',
    options:[
      'Washing with water daily',
      'Leaving it outdoors in rain',
      'Painting it to keep water and air away from the surface',
      'Heating it to a high temperature'
    ],
    answer:'Painting it to keep water and air away from the surface',
    hint:'Both water AND oxygen must be kept away from the iron surface.',
    explanation:'<b>Painting</b> is a common rust prevention method. Paint forms a physical barrier that keeps both water and oxygen away from the iron surface. Other methods include: <b>oiling/greasing</b> (for moving parts), <b>galvanising</b> (zinc coating), <b>tin plating</b> (food cans), and <b>using stainless steel</b> (an alloy that resists rust).' }),

  makeMCQ({ id:'g6sci-mat-018', chapterId:'g6-materials', subsection:'properties', difficulty:3,
    question:'Water can exist in THREE states. Which state is water in when it forms CLOUDS in the sky?',
    options:['Solid (ice)','Liquid (water)','Gas (water vapour)','Plasma'],
    answer:'Gas (water vapour)',
    hint:'The process of water vapour cooling and forming tiny droplets is called condensation.',
    explanation:'Clouds form when water vapour (a <b>gas</b>) in the atmosphere cools and <b>condenses</b> into tiny liquid water droplets or ice crystals. The droplets are so tiny they float in the air. When enough droplets gather and the cloud becomes heavy enough, rain (precipitation) falls. This is part of the <b>water cycle</b>.' }),

  makeMCQ({ id:'g6sci-mat-019', chapterId:'g6-materials', subsection:'properties', difficulty:4,
    question:'SALT is produced in salt pans in Black River by leaving sea water in the sun. What is the process called? (PSAC 2024)',
    options:['Condensation','Filtration','Evaporation','Distillation'],
    answer:'Evaporation',
    hint:'The sun heats the water - what happens to liquid water when heated strongly?',
    explanation:'Salt pans use <b>evaporation</b>: sea water is collected in large shallow pans and the sun\'s heat evaporates the water, leaving the <b>salt crystals</b> behind. Salt pans are found in Black River because that area has plentiful sunshine and low rainfall. Evaporation is also used daily when drying clothes or food.' })

);
