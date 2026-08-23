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
