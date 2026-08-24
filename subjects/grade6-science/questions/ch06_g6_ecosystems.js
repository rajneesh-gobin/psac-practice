'use strict';
// Grade 6 Science — Chapter: Ecosystems of Forests & Lagoons
// IDs format: g6sci-eco-NNN

const _SVG_ECOSYSTEM = `<svg viewBox="0 0 280 90" width="280" height="90" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <rect x="5" y="10" width="125" height="70" rx="6" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
  <text x="67" y="24" text-anchor="middle" font-size="8" fill="#14532d" font-weight="bold">FOREST ECOSYSTEM</text>
  <text x="15" y="38" font-size="6.5" fill="#166534">&#8593; Canopy layer</text>
  <text x="15" y="49" font-size="6.5" fill="#166534">&#8593; Understorey</text>
  <text x="15" y="60" font-size="6.5" fill="#166534">&#8593; Forest floor</text>
  <text x="15" y="73" font-size="6.5" fill="#166534">&#9898; Decomposers in soil</text>
  <rect x="148" y="10" width="125" height="70" rx="6" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
  <text x="210" y="24" text-anchor="middle" font-size="8" fill="#0369a1" font-weight="bold">LAGOON ECOSYSTEM</text>
  <text x="158" y="38" font-size="6.5" fill="#0369a1">&#8593; Surface (sunlight zone)</text>
  <text x="158" y="49" font-size="6.5" fill="#0369a1">&#8593; Coral reef</text>
  <text x="158" y="60" font-size="6.5" fill="#0369a1">&#8593; Seagrass beds</text>
  <text x="158" y="73" font-size="6.5" fill="#0369a1">&#9898; Sandy seabed</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-eco-001', chapterId:'g6-ecosystems', difficulty:1,
    question:'What is an ECOSYSTEM?',
    options:[
      'A single animal living in a forest',
      'A community of living things (plants and animals) interacting with each other and their non-living environment',
      'Only the non-living parts of a habitat (water, soil, air)',
      'A zoo where animals are kept and studied'
    ],
    answer:'A community of living things (plants and animals) interacting with each other and their non-living environment',
    hint:'An ecosystem includes BOTH the living things AND the environment they live in.',
    explanation:'An <b>ecosystem</b> consists of all the living organisms (plants, animals, fungi, bacteria) in an area, together with the non-living (abiotic) factors (water, soil, temperature, sunlight) and all the interactions between them.' }),

  makeMCQ({ id:'g6sci-eco-002', chapterId:'g6-ecosystems', difficulty:1,
    question:'Which of the following is an example of a FOREST ecosystem found in Mauritius?',
    options:['Blue Bay Lagoon','Aapravasi Ghat','Black River Gorges National Park','Trou aux Cerfs crater'],
    answer:'Black River Gorges National Park',
    hint:'This is Mauritius\'s only national park, protecting the island\'s remaining native forest.',
    explanation:'The <b>Black River Gorges National Park</b> in the south-west of Mauritius contains the largest remaining area of native forest and is a key forest ecosystem. It is home to many endemic birds and plants.' }),

  makeMCQ({ id:'g6sci-eco-003', chapterId:'g6-ecosystems', difficulty:2,
    question:`${_SVG_ECOSYSTEM}In a LAGOON ecosystem, what organisms act as producers?`,
    options:['Fish and sea turtles','Coral polyps and crabs','Algae and seagrass','Sharks and dolphins'],
    answer:'Algae and seagrass',
    hint:'Producers make their own food through photosynthesis — they must be plant-like and need sunlight.',
    explanation:'In the lagoon ecosystem, <b>algae</b> (microscopic plants and seaweed) and <b>seagrass</b> are the producers. They carry out photosynthesis using sunlight and form the base of the lagoon food web.' }),

  makeMCQ({ id:'g6sci-eco-004', chapterId:'g6-ecosystems', difficulty:2,
    question:'A tropical forest has several layers. Which layer receives the MOST sunlight?',
    options:['The forest floor','The understorey','The canopy (top layer)','The soil layer'],
    answer:'The canopy (top layer)',
    hint:'Think about which layer is closest to the sun.',
    explanation:'The <b>canopy</b> is the uppermost layer of a tropical forest, formed by the spreading tops of tall trees. It receives the most sunlight and is where most photosynthesis takes place. The forest floor below is often quite dark.' }),

  makeTF({ id:'g6sci-eco-005', chapterId:'g6-ecosystems', difficulty:1,
    question:'Coral reefs are only found in cold water.',
    answer:false,
    hint:'Think about where Mauritius is located — in a warm tropical ocean.',
    explanation:'Coral reefs are found in warm, shallow, clear <b>tropical waters</b>. They require sea temperatures between approximately 20°C and 30°C. Cold water kills corals. The lagoon around Mauritius is a classic tropical coral reef ecosystem.' }),

  makeMCQ({ id:'g6sci-eco-006', chapterId:'g6-ecosystems', difficulty:2,
    question:'What is BIODIVERSITY?',
    options:[
      'The number of humans living in an ecosystem',
      'The variety of different species of living things in an area',
      'The amount of water available in an ecosystem',
      'The size of the largest animal in an ecosystem'
    ],
    answer:'The variety of different species of living things in an area',
    hint:'"Bio" = life, "diversity" = variety.',
    explanation:'<b>Biodiversity</b> is the variety of living species — plants, animals, fungi and microorganisms — in an ecosystem or on Earth. High biodiversity makes ecosystems more stable and resilient. Mauritius has significant biodiversity due to its isolation and tropical climate.' }),

  makeMCQ({ id:'g6sci-eco-007', chapterId:'g6-ecosystems', difficulty:2,
    question:'Why is the coral reef lagoon ecosystem important for Mauritius?',
    options:[
      'The coral reef produces fresh water for drinking',
      'The reef protects the coast from large waves, supports tourism and provides habitat for fish',
      'The reef produces the electricity for the island',
      'The reef is only important for scientists and has no practical value'
    ],
    answer:'The reef protects the coast from large waves, supports tourism and provides habitat for fish',
    hint:'Think about what the reef does for the coastline, the economy and marine life.',
    explanation:'The coral reef: (1) <b>protects the coastline</b> from large ocean waves, preventing beach erosion; (2) <b>supports tourism</b> — snorkelling, diving and beaches attract visitors; (3) provides <b>habitat for fish</b>, supporting fishing communities.' }),

  makeMCQ({ id:'g6sci-eco-008', chapterId:'g6-ecosystems', difficulty:2,
    question:'What would happen to a lagoon ecosystem if all the algae and seagrass were destroyed by pollution?',
    options:[
      'Fish would grow larger because they have more space',
      'The food web would collapse — fish and other consumers would have no food source',
      'Coral reefs would grow faster without competition',
      'Nothing would change — fish can survive without producers'
    ],
    answer:'The food web would collapse — fish and other consumers would have no food source',
    hint:'Producers are the base of every food web.',
    explanation:'Algae and seagrass are the <b>producers</b> of the lagoon. Without them, the entire food web collapses: fish that eat algae would have no food and die, and then their predators would also die. This shows the interdependence of species in an ecosystem.' }),

  makeTF({ id:'g6sci-eco-009', chapterId:'g6-ecosystems', difficulty:1,
    question:'Blue Bay Marine Park in Mauritius is a protected lagoon ecosystem.',
    answer:true,
    hint:'It is located on the south-east coast of Mauritius.',
    explanation:'True. <b>Blue Bay Marine Park</b> is a protected area on the south-east coast of Mauritius, designated to conserve its coral reef and lagoon ecosystem. It has some of the most diverse coral formations in the Indian Ocean.' }),

  makeMCQ({ id:'g6sci-eco-010', chapterId:'g6-ecosystems', difficulty:2,
    question:'What is the role of DECOMPOSERS in a forest ecosystem?',
    options:[
      'They photosynthesise sunlight into food for other animals',
      'They hunt and eat the top predators in the forest',
      'They break down dead organic matter, recycling nutrients back into the soil',
      'They transport water from the roots to the canopy'
    ],
    answer:'They break down dead organic matter, recycling nutrients back into the soil',
    hint:'Think about dead leaves and fallen trees on the forest floor.',
    explanation:'<b>Decomposers</b> (bacteria, fungi) break down dead leaves, fallen trees and animal remains. They release the nutrients locked in this dead matter back into the soil, where plant roots can absorb them again — completing the nutrient cycle.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-eco-011', chapterId:'g6-ecosystems', difficulty:1,
    question:'What is BEACH EROSION? (PSAC 2025 Q9b)',
    options:[
      'The process of sand being added to a beach from the sea',
      'The wearing away and removal of sand and soil from the beach by waves, wind or human activities',
      'The pollution of beach water by oil spills',
      'The building of hotels and roads on the beach'
    ],
    answer:'The wearing away and removal of sand and soil from the beach by waves, wind or human activities',
    hint:'Think about what "erosion" means — material being worn away and carried off.',
    explanation:'<b>Beach erosion</b> is the gradual wearing away of the beach — sand, rocks and soil are loosened and carried away by <b>waves, wind, currents or human activities</b>. It is a major threat to Mauritius\'s coastline and lagoon ecosystems. When the beach narrows, the coral reef behind it loses its natural protection.' }),

  makeMCQ({ id:'g6sci-eco-012', chapterId:'g6-ecosystems', difficulty:2,
    question:'Give a NATURAL CAUSE of beach erosion. (PSAC 2025 Q9b)',
    options:[
      'Building hotels too close to the beach',
      'Removing sand for construction',
      'Powerful waves and storms battering the coastline',
      'Tourists walking on the beach daily'
    ],
    answer:'Powerful waves and storms battering the coastline',
    hint:'Which natural force constantly hits a beach and moves sand?',
    explanation:'A natural cause of beach erosion is <b>powerful waves and storms</b> (cyclones). Wave energy removes sand from the beach and carries it offshore. In Mauritius, tropical cyclones are particularly destructive. Human causes include: removal of sand for construction, anchoring boats on reefs, and removing coastal vegetation.' }),

  makeMCQ({ id:'g6sci-eco-013', chapterId:'g6-ecosystems', difficulty:2,
    question:'How does beach erosion affect the LAGOON ECOSYSTEM? (PSAC 2025 Q9b)',
    options:[
      'It makes the lagoon water warmer',
      'Sediment (sand/soil) washed into the lagoon smothers coral reefs and blocks sunlight, killing marine life',
      'It increases the number of fish in the lagoon',
      'It creates more habitat for seagrass to grow'
    ],
    answer:'Sediment (sand/soil) washed into the lagoon smothers coral reefs and blocks sunlight, killing marine life',
    hint:'Think about what happens to coral when sand gets dumped on top of it.',
    explanation:'When beach erosion occurs, <b>sediment</b> (sand, soil, mud) is washed into the lagoon. This: (1) <b>smothers coral reefs</b> — corals are buried and die; (2) <b>reduces water clarity</b>, blocking the sunlight that corals and seagrass need for photosynthesis; (3) disrupts the entire lagoon food web. Protecting beaches directly protects the lagoon ecosystem.' }),

  makeMCQ({ id:'g6sci-eco-014', chapterId:'g6-ecosystems', difficulty:1,
    question:'Give ONE measure taken to PREVENT beach erosion. (PSAC 2025 Q9b)',
    options:[
      'Removing all coral reefs to allow more wave energy to reach the beach',
      'Planting coastal vegetation (mangroves, casuarinas) to stabilise the sand',
      'Building large hotels directly on the beach to block waves',
      'Pumping more sand into the sea to raise sea levels'
    ],
    answer:'Planting coastal vegetation (mangroves, casuarinas) to stabilise the sand',
    hint:'Plant roots hold soil in place — how might this help a beach?',
    explanation:'<b>Planting coastal vegetation</b> (mangroves, casuarinas/filaos) is a natural way to prevent beach erosion. Their roots stabilise the sand and soil, and their stems reduce wave energy. Other measures include: building sea walls and groynes (barriers to trap sand), and restricting activities that damage the reef (which naturally protects beaches from waves).' }),

  makeMCQ({ id:'g6sci-eco-015', chapterId:'g6-ecosystems', difficulty:2,
    question:'In a food chain: Aquatic plants → Fish M → Shark. If ALL of Fish M are caught by fishermen, what happens to the SHARK? (PSAC 2025 Q9c)',
    options:[
      'The shark population increases because there is more space',
      'The shark population decreases — it has no prey (food) left',
      'The shark starts eating aquatic plants directly',
      'Nothing happens to the shark'
    ],
    answer:'The shark population decreases — it has no prey (food) left',
    hint:'The shark relies entirely on Fish M as its food source.',
    explanation:'If all <b>Fish M</b> are removed, the <b>shark</b> loses its only food source and its population will <b>decline</b> (it may eventually disappear from that area). Meanwhile, the <b>aquatic plants</b> would <b>increase</b> — because nothing is eating them any more. This demonstrates how removing one link disrupts the entire food chain. (PSAC 2025 Q9c)' }),

  makeMCQ({ id:'g6sci-eco-016', chapterId:'g6-ecosystems', difficulty:2,
    question:'What is the WATER CYCLE? (PSAC 2025 Q8a)',
    options:[
      'The process of water being added to the Earth from outer space',
      'The continuous movement of water through evaporation, condensation and precipitation',
      'The process of plants making water during photosynthesis',
      'Only the movement of water in rivers to the sea'
    ],
    answer:'The continuous movement of water through evaporation, condensation and precipitation',
    hint:'Water changes state and moves between the land, sea and sky in a continuous loop.',
    explanation:'The <b>water cycle</b>: (1) <b>Evaporation</b> — sun heats water in oceans/lakes → water vapour rises; (2) <b>Condensation</b> — water vapour cools → forms clouds (tiny droplets); (3) <b>Precipitation</b> — clouds become heavy → rain falls. Rain either flows into rivers/sea or soaks into the ground. The cycle then repeats continuously. (PSAC 2025 Q8a tested all three terms)' }),

  makeMCQ({ id:'g6sci-eco-017', chapterId:'g6-ecosystems', difficulty:1,
    question:'What is the natural habitat of a CAMEL? (PSAC 2024 Q5c)',
    options:['Tropical rainforest','Ocean','Desert','Arctic tundra'],
    answer:'Desert',
    hint:'Camels have humps for storing fat — an adaptation for a very dry, hot environment.',
    explanation:'The <b>camel\'s natural habitat is the desert</b>. It is superbly adapted to dry, hot conditions: its humps store fat (not water) for energy during food scarcity; it can drink large amounts of water at once; and its wide feet prevent sinking in sand. The Grade 6 Science Pupil\'s Book uses the camel as an example when studying natural habitats.' }),

  makeTF({ id:'g6sci-eco-018', chapterId:'g6-ecosystems', difficulty:1,
    question:'A habitat is the natural environment where an organism lives and finds everything it needs to survive.',
    answer:true,
    hint:'Habitat provides food, water, shelter and space for an organism.',
    explanation:'<b>True.</b> A <b>habitat</b> is the natural environment where an organism lives. It provides all the organism\'s basic needs: food, water, shelter and space to reproduce. Different organisms are adapted to different habitats — fish to water, camels to deserts, bats to caves and trees. Destroying a habitat threatens all the species that depend on it.' }),

  makeMCQ({ id:'g6sci-eco-019', chapterId:'g6-ecosystems', difficulty:3,
    question:'The WATER CYCLE process that forms clouds is called: (PSAC 2025 Q8a)',
    options:['Evaporation','Condensation','Precipitation','Transpiration'],
    answer:'Condensation',
    hint:'Water vapour rising into the cooler upper atmosphere changes from gas to liquid droplets.',
    explanation:'<b>Condensation</b> is the process by which water vapour cools and changes back into tiny liquid water droplets — forming clouds. The PSAC 2025 Q8a tested all four water cycle terms: <b>evaporation</b> (liquid→gas, from water bodies), <b>condensation</b> (gas→liquid droplets, forming clouds), <b>precipitation</b> (rain/snow falling), and the overall <b>water cycle</b>. Transpiration (water vapour released by plant leaves) also contributes water vapour to the atmosphere.' })

);
