'use strict';
// Grade 5 History & Geography — Chapter: Environmental Problems
// IDs format: g5hg-ep-NNN

// Beach cross-section showing erosion process
const _SVG_EROSION = `<svg viewBox="0 0 270 100" width="270" height="100" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <rect x="0" y="65" width="270" height="35" fill="#bae6fd"/>
  <polygon points="0,65 0,40 80,35 130,38 160,42 200,50 230,60 270,65" fill="#fde68a" stroke="#ca8a04" stroke-width="1.5"/>
  <polygon points="0,40 30,20 60,12 90,18 100,35 80,35" fill="#4ade80" stroke="#15803d" stroke-width="1"/>
  <text x="40" y="30" font-size="7" fill="#166534">vegetation</text>
  <text x="38" y="58" font-size="7.5" fill="#92400e" font-weight="bold">BEACH (sand)</text>
  <text x="190" y="60" font-size="7" fill="#0369a1">SEA</text>
  <text x="175" y="80" font-size="7" fill="#0369a1">waves &#8594;</text>
  <text x="145" y="80" font-size="7" fill="#0369a1">&#8592; waves</text>
  <line x1="150" y1="65" x2="180" y2="45" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="178" y="43" font-size="7" fill="#dc2626">erosion</text>
  <text x="135" y="97" font-size="6.5" fill="#64748b" text-anchor="middle">Waves erode the beach, removing sand</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-ep-001', chapterId:'env-problems', difficulty:1,
    question:'What is BEACH EROSION?',
    options:[
      'The building up of more sand on a beach over time',
      'The gradual wearing away and removal of sand and rocks from a beach by waves and currents',
      'The planting of trees along the beach',
      'The natural cleaning of a beach by rainfall'
    ],
    answer:'The gradual wearing away and removal of sand and rocks from a beach by waves and currents',
    hint:'Erosion means wearing away — something is being removed.',
    explanation:'<b>Beach erosion</b> is the gradual removal of sand and rock from a beach by wave action, currents and wind. Over time, this can cause beaches to shrink and disappear.' }),

  makeMCQ({ id:'g5hg-ep-002', chapterId:'env-problems', difficulty:2,
    question:`${_SVG_EROSION}Looking at the diagram, what is causing the beach sand to be removed?`,
    options:[
      'Heavy rainfall from above',
      'Wave action from the sea eroding the beach',
      'People digging trenches on the beach',
      'Wind blowing sand inland'
    ],
    answer:'Wave action from the sea eroding the beach',
    hint:'Look at the red dashed line and the arrows in the diagram.',
    explanation:'The diagram shows how <b>wave action</b> from the sea wears away the beach sand. Waves strike the shoreline repeatedly, loosening and carrying sand away, causing beach erosion.' }),

  makeMCQ({ id:'g5hg-ep-003', chapterId:'env-problems', difficulty:2,
    question:'Which of the following CAUSES beach erosion to get worse?',
    options:[
      'Planting mangrove trees along the coast',
      'Building sea walls to protect the shore',
      'Removing sand from beaches for construction',
      'Reducing the speed of motorboats near shore'
    ],
    answer:'Removing sand from beaches for construction',
    hint:'If you take sand away, there is less beach left.',
    explanation:'Removing sand from beaches (for construction of buildings and roads) makes beach erosion much worse — there is less material to replace what waves wash away. It is now illegal to remove sand from beaches in Mauritius.' }),

  makeMCQ({ id:'g5hg-ep-004', chapterId:'env-problems', difficulty:1,
    question:'What is SOIL EROSION?',
    options:[
      'The process of adding fertilisers to improve soil quality',
      'The removal of the top layer of soil by wind or running water',
      'The process of soil becoming harder and more compact',
      'The mixing of different soils together'
    ],
    answer:'The removal of the top layer of soil by wind or running water',
    hint:'Think about what happens to bare soil when it rains heavily.',
    explanation:'<b>Soil erosion</b> is the removal and transport of the topsoil (the most fertile upper layer) by wind, rain or running water. Once topsoil is lost, the land becomes less fertile.' }),

  makeMCQ({ id:'g5hg-ep-005', chapterId:'env-problems', difficulty:2,
    question:'How does DEFORESTATION lead to increased soil erosion?',
    options:[
      'Trees make the soil wetter, which causes it to erode faster',
      'Tree roots hold the soil together; when trees are removed, rain easily washes the soil away',
      'Deforestation makes it rain more heavily',
      'Trees absorb soil minerals, leaving the soil unstable'
    ],
    answer:'Tree roots hold the soil together; when trees are removed, rain easily washes the soil away',
    hint:'What do roots do for soil?',
    explanation:'Tree roots <b>bind the soil together</b> and slow rainwater runoff. When trees are cut down, their roots are gone, leaving soil exposed. Heavy rain then washes the unprotected topsoil away very easily.' }),

  makeTF({ id:'g5hg-ep-006', chapterId:'env-problems', difficulty:1,
    question:'Mangrove trees along the coast help PREVENT beach erosion.',
    answer:true,
    hint:'Mangroves have tangled roots that grip the soil at the water\'s edge.',
    explanation:'True. <b>Mangrove trees</b> grow along tropical coastlines. Their dense root systems trap sediment, slow waves, and hold the shoreline in place — significantly reducing beach and coastal erosion.' }),

  makeMCQ({ id:'g5hg-ep-007', chapterId:'env-problems', difficulty:2,
    question:'What happens to the coral reef around Mauritius when the lagoon becomes polluted with sewage and chemicals?',
    options:[
      'The coral reef grows bigger because pollution adds nutrients',
      'The coral reef is damaged — corals die and bleach, reducing biodiversity',
      'Pollution protects the reef from storm waves',
      'Pollution has no effect on coral reefs'
    ],
    answer:'The coral reef is damaged — corals die and bleach, reducing biodiversity',
    hint:'Coral reefs are very sensitive to changes in water quality.',
    explanation:'Pollution (sewage, chemicals, fertiliser runoff) reduces water quality and causes <b>coral bleaching and death</b>. A damaged reef means fewer fish and less protection for the coastline from waves.' }),

  makeMCQ({ id:'g5hg-ep-008', chapterId:'env-problems', difficulty:2,
    question:'Which of the following is a SOLUTION to reduce beach erosion in Mauritius?',
    options:[
      'Remove mangroves to allow more wave energy to reach the beach',
      'Build sea walls (groynes) and replant mangroves along the coast',
      'Allow more sand to be removed for construction',
      'Allow motorboats to drive very close to the shore'
    ],
    answer:'Build sea walls (groynes) and replant mangroves along the coast',
    hint:'To stop erosion, you need to block or reduce the energy of the waves.',
    explanation:'Building <b>sea walls and groynes</b> dissipates wave energy before it reaches the beach, and <b>replanting mangroves</b> provides a natural coastal barrier. Both are effective ways to reduce beach erosion.' }),

  makeMCQ({ id:'g5hg-ep-009', chapterId:'env-problems', difficulty:1,
    question:'Which of the following actions causes WATER POLLUTION in the Mauritian lagoon?',
    options:[
      'Swimming and snorkelling in the lagoon',
      'Releasing untreated sewage and factory chemicals into the sea',
      'Coral reefs naturally producing chemicals',
      'Rainfall washing clean fresh water into the lagoon'
    ],
    answer:'Releasing untreated sewage and factory chemicals into the sea',
    hint:'Pollution means harmful substances are added to the environment.',
    explanation:'<b>Untreated sewage</b> and industrial chemicals discharged into the sea pollute the lagoon. This harms marine life (fish, coral, seagrass) and makes the water unsafe for swimming and fishing.' }),

  makeMCQ({ id:'g5hg-ep-010', chapterId:'env-problems', difficulty:2,
    question:'Why is it important for Mauritius to protect its environment and natural landscapes?',
    options:[
      'Only because it looks pretty',
      'Because the natural environment supports tourism, fishing, clean water and biodiversity — all vital to the island\'s economy and way of life',
      'Because the government has been told to by another country',
      'Because the environment is not really important but it is a school topic'
    ],
    answer:'Because the natural environment supports tourism, fishing, clean water and biodiversity — all vital to the island\'s economy and way of life',
    hint:'Think about what Mauritius\'s economy depends on.',
    explanation:'Mauritius\'s pristine beaches, coral reefs and forests support the <b>tourism industry</b> (the main source of income), provide <b>fish</b> for food and livelihoods, ensure <b>clean water</b> through healthy watersheds, and preserve <b>endemic biodiversity</b>. Protecting nature is protecting the island\'s future.' })

);
