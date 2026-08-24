'use strict';
// Grade 6 Science - Chapter: Plants & Ecosystems (photosynthesis, food chains)
// IDs format: g6sci-pl-NNN

const _SVG_FOOD_CHAIN = `<svg viewBox="0 0 290 75" width="290" height="75" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <rect x="4" y="18" width="54" height="30" rx="4" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.5"/>
  <text x="31" y="30" text-anchor="middle" font-size="8" fill="#14532d" font-weight="bold">Grass</text>
  <text x="31" y="41" text-anchor="middle" font-size="6.5" fill="#14532d">(producer)</text>
  <text x="65" y="35" font-size="14" fill="#64748b">&#8594;</text>
  <rect x="76" y="18" width="62" height="30" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="107" y="30" text-anchor="middle" font-size="8" fill="#78350f" font-weight="bold">Grasshopper</text>
  <text x="107" y="41" text-anchor="middle" font-size="6.5" fill="#92400e">(1&#186; consumer)</text>
  <text x="145" y="35" font-size="14" fill="#64748b">&#8594;</text>
  <rect x="156" y="18" width="54" height="30" rx="4" fill="#fed7aa" stroke="#f97316" stroke-width="1.5"/>
  <text x="183" y="30" text-anchor="middle" font-size="8" fill="#7c2d12" font-weight="bold">Lizard</text>
  <text x="183" y="41" text-anchor="middle" font-size="6.5" fill="#7c2d12">(2&#186; consumer)</text>
  <text x="217" y="35" font-size="14" fill="#64748b">&#8594;</text>
  <rect x="228" y="18" width="54" height="30" rx="4" fill="#fecaca" stroke="#ef4444" stroke-width="1.5"/>
  <text x="255" y="30" text-anchor="middle" font-size="8" fill="#7f1d1d" font-weight="bold">Hawk</text>
  <text x="255" y="41" text-anchor="middle" font-size="6.5" fill="#991b1b">(3&#186; consumer)</text>
  <text x="145" y="68" text-anchor="middle" font-size="6" fill="#64748b">&#8594; arrow shows direction of energy flow</text>
</svg>`;

const _SVG_PHOTO = `<svg viewBox="0 0 260 70" width="260" height="70" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <text x="10" y="22" font-size="8" fill="#1e40af" font-weight="bold">Carbon dioxide + Water</text>
  <text x="10" y="35" font-size="7" fill="#1e40af">  (CO&#8322;)      (H&#8322;O)</text>
  <text x="10" y="50" font-size="7" fill="#64748b">  from air    from roots</text>
  <text x="130" y="30" font-size="18" fill="#64748b">&#8594;</text>
  <text x="150" y="18" font-size="7" fill="#f59e0b" text-anchor="middle">&#9728; light</text>
  <text x="150" y="26" font-size="7" fill="#f59e0b" text-anchor="middle">&#8595;</text>
  <text x="165" y="22" font-size="8" fill="#16a34a" font-weight="bold">Glucose + Oxygen</text>
  <text x="165" y="35" font-size="7" fill="#166534">  (food)    (O&#8322;)</text>
  <text x="165" y="50" font-size="7" fill="#64748b">stored/used  released</text>
  <text x="130" y="65" text-anchor="middle" font-size="6.5" fill="#64748b">Photosynthesis takes place in the leaves (in chloroplasts)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-pl-001', chapterId:'g6-plants', difficulty:1,
    question:'What is PHOTOSYNTHESIS?',
    options:[
      'The process by which plants absorb water through their roots',
      'The process by which plants use sunlight, water and carbon dioxide to make food (glucose)',
      'The process by which plants breathe out oxygen at night',
      'The process by which plants reproduce using pollen'
    ],
    answer:'The process by which plants use sunlight, water and carbon dioxide to make food (glucose)',
    hint:'Think about the two words: "photo" = light, "synthesis" = making.',
    explanation:'<b>Photosynthesis</b> is the process by which green plants use the energy of <b>sunlight</b>, along with <b>water</b> (from roots) and <b>carbon dioxide</b> (from air), to make <b>glucose</b> (food) and release <b>oxygen</b>.' }),

  makeMCQ({ id:'g6sci-pl-002', chapterId:'g6-plants', difficulty:2,
    question:`${_SVG_PHOTO}According to the photosynthesis diagram, what TWO things are produced during photosynthesis?`,
    options:['Carbon dioxide and water','Glucose and oxygen','Nitrogen and glucose','Water vapour and carbon dioxide'],
    answer:'Glucose and oxygen',
    hint:'Look at the right side of the equation arrow in the diagram.',
    explanation:'Photosynthesis produces <b>glucose</b> (which the plant uses as food for energy and growth) and <b>oxygen</b> (which is released into the air - this is why plants are vital for maintaining oxygen levels in the atmosphere).' }),

  makeMCQ({ id:'g6sci-pl-003', chapterId:'g6-plants', difficulty:1,
    question:'What is chlorophyll and why is it important for photosynthesis?',
    options:[
      'A type of sugar produced during photosynthesis',
      'The green pigment in leaves that absorbs light energy for photosynthesis',
      'A gas released by plants during respiration',
      'The water-conducting tissue in plant stems'
    ],
    answer:'The green pigment in leaves that absorbs light energy for photosynthesis',
    hint:'Chlorophyll is what gives leaves their green colour.',
    explanation:'<b>Chlorophyll</b> is the green pigment found in the chloroplasts of leaf cells. It absorbs sunlight (mainly red and blue light) and uses that energy to power the photosynthesis reaction.' }),

  makeMCQ({ id:'g6sci-pl-004', chapterId:'g6-plants', difficulty:1,
    question:`${_SVG_FOOD_CHAIN}In the food chain shown, what is the PRODUCER?`,
    options:['Hawk','Lizard','Grasshopper','Grass'],
    answer:'Grass',
    hint:'A producer makes its own food from sunlight.',
    explanation:'<b>Grass</b> is the producer in this food chain. Producers are always green plants - they make their own food through photosynthesis. All other organisms in the food chain depend on the producer for energy.' }),

  makeMCQ({ id:'g6sci-pl-005', chapterId:'g6-plants', difficulty:2,
    question:`${_SVG_FOOD_CHAIN}In the food chain, what is the HAWK described as?`,
    options:['A producer','A 1st consumer (herbivore)','A 2nd consumer','A 3rd consumer (top predator)'],
    answer:'A 3rd consumer (top predator)',
    hint:'Count how many steps the hawk is from the producer (grass).',
    explanation:'The hawk is the <b>3rd consumer (tertiary consumer)</b>. It eats the lizard (2nd consumer), which eats the grasshopper (1st consumer), which eats the grass (producer). The hawk is the top predator in this chain.' }),

  makeMCQ({ id:'g6sci-pl-006', chapterId:'g6-plants', difficulty:1,
    question:'What is a HERBIVORE?',
    options:[
      'An animal that eats only other animals',
      'An animal that eats both plants and animals',
      'An animal that eats only plants',
      'A plant that traps and eats insects'
    ],
    answer:'An animal that eats only plants',
    hint:'"Herbi-" comes from the Latin for plant/grass.',
    explanation:'A <b>herbivore</b> is an animal that feeds only on plants. Examples include cows, rabbits, grasshoppers and deer. In a food chain, herbivores are usually the first (primary) consumers.' }),

  makeTF({ id:'g6sci-pl-007', chapterId:'g6-plants', difficulty:1,
    question:'All food chains begin with a producer (a green plant).',
    answer:true,
    hint:'Where does the energy in a food chain originally come from?',
    explanation:'True. All food chains start with a <b>producer</b> - a green plant (or alga) that captures energy from the sun through photosynthesis. All other organisms in the chain depend on this captured energy.' }),

  makeMCQ({ id:'g6sci-pl-008', chapterId:'g6-plants', difficulty:2,
    question:'What is the role of DECOMPOSERS in a food chain or ecosystem?',
    options:[
      'They produce food through photosynthesis',
      'They hunt and eat the top predators',
      'They break down dead plants and animals, returning nutrients to the soil',
      'They block sunlight from reaching producers'
    ],
    answer:'They break down dead plants and animals, returning nutrients to the soil',
    hint:'Think about what happens to leaves and dead animals on a forest floor.',
    explanation:'<b>Decomposers</b> (bacteria and fungi) break down dead organisms and waste into simpler substances, returning nutrients to the soil. This is essential for recycling nutrients in an ecosystem - without decomposers, nutrients would be locked in dead matter.' }),

  makeMCQ({ id:'g6sci-pl-009', chapterId:'g6-plants', difficulty:2,
    question:'What would happen if all the GRASS (producer) in a food chain were removed?',
    options:[
      'Only the top predator would be affected',
      'Nothing would change - animals would find other food',
      'The entire food chain would collapse as all consumers would lose their food source',
      'Decomposers would immediately replace the grass'
    ],
    answer:'The entire food chain would collapse as all consumers would lose their food source',
    hint:'Every other organism in the chain depends on the producer.',
    explanation:'If the producer (grass) is removed, the <b>entire food chain collapses</b>. The grasshoppers would have no food and die; the lizards would lose their prey and die; the hawks would also die. This shows why producers are vital to any ecosystem.' }),

  makeMCQ({ id:'g6sci-pl-010', chapterId:'g6-plants', difficulty:2,
    question:'A FOOD WEB is more realistic than a single food chain because:',
    options:[
      'It shows only one animal eating one type of food',
      'It shows multiple feeding relationships between many different organisms',
      'It is simpler and easier to understand than a food chain',
      'It only shows producers and top predators'
    ],
    answer:'It shows multiple feeding relationships between many different organisms',
    hint:'Most animals eat more than one type of food.',
    explanation:'A <b>food web</b> shows how many food chains in an ecosystem are interconnected. Most animals eat multiple types of food and are eaten by multiple predators, so a web of interconnected chains (a food web) is more realistic than a single chain.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-pl-011', chapterId:'g6-plants', difficulty:1,
    question:'Give TWO conditions necessary for photosynthesis to take place. (PSAC 2025 Q8c)',
    options:[
      'Heat and carbon dioxide',
      'Water and darkness',
      'Sunlight and carbon dioxide',
      'Nitrogen and glucose'
    ],
    answer:'Sunlight and carbon dioxide',
    hint:'The Grade 6 textbook lists 4 conditions - sunlight and CO₂ are among them.',
    explanation:'The Grade 6 Science Pupil\'s Book lists FOUR conditions for photosynthesis: <b>water</b> (from roots), <b>sunlight</b> (energy source), <b>carbon dioxide</b> (from air through stomata), and <b>chlorophyll</b> (the green pigment that absorbs light). Without any one of these four, photosynthesis cannot occur. Sunlight and CO₂ are the most commonly tested pair.' }),

  makeMCQ({ id:'g6sci-pl-012', chapterId:'g6-plants', difficulty:2,
    question:'Which PART of a plant mainly carries out photosynthesis? (PSAC 2025 Q8c)',
    options:['Root','Stem','Leaf','Flower'],
    answer:'Leaf',
    hint:'The Grade 6 textbook describes the leaf as a "factory" for making food.',
    explanation:'The Grade 6 Science Pupil\'s Book describes the <b>leaf</b> as the plant\'s "factory": inputs = sunlight, CO₂ and water/minerals; outputs = food (glucose) and O₂. Leaves are flat and broad to capture maximum sunlight. They contain <b>chloroplasts</b> with <b>chlorophyll</b>. Some green stems can also carry out photosynthesis, but the leaf is the main organ.' }),

  makeMCQ({ id:'g6sci-pl-013', chapterId:'g6-plants', difficulty:2,
    question:'How do photosynthesis and respiration together MAINTAIN the composition of air? (PSAC 2025 Q8c)',
    options:[
      'Both add nitrogen to the air',
      'Photosynthesis releases O₂ and absorbs CO₂; respiration releases CO₂ and absorbs O₂ - keeping the balance',
      'Both processes absorb CO₂ from the air',
      'Photosynthesis and respiration both produce water vapour only'
    ],
    answer:'Photosynthesis releases O₂ and absorbs CO₂; respiration releases CO₂ and absorbs O₂ - keeping the balance',
    hint:'The two processes are like opposite arrows - one produces what the other consumes.',
    explanation:'The Grade 6 Pupil\'s Book explains the balance: <b>Photosynthesis</b> (in sunlight) absorbs CO₂ and releases O₂. <b>Respiration</b> (day AND night) absorbs O₂ and releases CO₂. Plants carry out BOTH processes - but during daylight, photosynthesis dominates, releasing extra O₂. This complementary cycle <b>maintains the O₂/CO₂ balance in the atmosphere</b> that all life depends on.' }),

  makeMCQ({ id:'g6sci-pl-014', chapterId:'g6-plants', difficulty:1,
    question:'What is the correct sequence of events during GERMINATION of a seed? (PSAC 2024 Q1j)',
    options:[
      'seed → shoot → root → leaf',
      'seed → root → shoot → leaf',
      'seed → leaf → root → shoot',
      'seed → shoot → leaf → root'
    ],
    answer:'seed → root → shoot → leaf',
    hint:'Which part of the seedling appears first - the one that reaches down for water, or the one reaching up for light?',
    explanation:'During <b>germination</b>, the correct sequence is: <b>seed → root → shoot → leaf</b>. The <b>root appears first</b> - it anchors the seed and absorbs water from the soil before anything else can grow. Then the shoot pushes upward, and finally leaves emerge and begin photosynthesis. The seed does NOT need sunlight to germinate (it uses stored food), but it needs water, warmth and oxygen.' }),

  makeMCQ({ id:'g6sci-pl-015', chapterId:'g6-plants', difficulty:2,
    question:'The Grade 6 textbook says "the fruit protects and nourishes the seeds." Give an EXAMPLE of a fruit whose seeds are eaten. (PSAC 2025 Q4d)',
    options:['Carrot','Potato','Mango','Onion'],
    answer:'Mango',
    hint:'A fruit grows from a flower and contains seeds inside.',
    explanation:'A <b>mango</b> is a fruit - it develops from a flower and contains a seed (the stone/pit) inside. The Grade 6 Pupil\'s Book states: "<b>the fruit protects and nourishes the seeds</b>." Carrots are roots, potatoes are stems, and onions are bulbs (modified leaves) - none are fruits in the botanical sense. Other examples of fruits: tomato, guava, papaya.' }),

  makeMCQ({ id:'g6sci-pl-016', chapterId:'g6-plants', difficulty:2,
    question:'Give ONE use of WOOD PULP obtained from plants. (PSAC 2025 Q8c)',
    options:['Making plastic bottles','Making paper','Making glass windows','Making metal wire'],
    answer:'Making paper',
    hint:'Books, newspapers and cardboard all come from this product.',
    explanation:'<b>Wood pulp</b> is used to make <b>paper</b>. The Grade 6 Science Pupil\'s Book lists wood pulp as one of the important uses of plants. Trees are cut, their wood is processed into pulp (a wet mixture of fibres), which is then pressed and dried into paper and cardboard. This is why deforestation threatens paper production as well as wildlife.' }),

  makeTF({ id:'g6sci-pl-017', chapterId:'g6-plants', difficulty:2,
    question:'Plants carry out respiration ONLY at night, not during the day.',
    answer:false,
    hint:'The Grade 6 textbook specifically states when respiration occurs.',
    explanation:'<b>False.</b> The Grade 6 Science Pupil\'s Book clearly states: <b>photosynthesis occurs ONLY in sunlight</b>, but <b>respiration occurs day AND night</b>. During the day, photosynthesis is much faster than respiration, so plants appear to only release O₂. At night, only respiration occurs, so plants take in O₂ and release CO₂.' }),

  makeMCQ({ id:'g6sci-pl-018', chapterId:'g6-plants', difficulty:3,
    question:'Why are FLOWERS usually colourful and have a scent? (PSAC 2025 Q4a)',
    options:[
      'To protect the plant from being eaten by animals',
      'To attract insects and other pollinators for pollination',
      'To absorb sunlight for photosynthesis',
      'To store water during dry seasons'
    ],
    answer:'To attract insects and other pollinators for pollination',
    hint:'Without pollinators, many flowers cannot be fertilised and cannot produce seeds.',
    explanation:'Flowers are colourful and fragrant to <b>attract pollinators</b> (bees, butterflies, birds) which carry pollen from one flower to another. This is called <b>pollination</b>. During pollination, pollen from the stamen (male part) is transferred to the stigma (female part) of another flower - enabling fertilisation and seed formation. Some plants are pollinated by wind instead (e.g., grasses) and have less colourful flowers.' }),

  makeMCQ({ id:'g6sci-pl-019', chapterId:'g6-plants', difficulty:4,
    question:'A student removes ALL the leaves from a healthy plant and places it in a well-lit room. Which prediction is CORRECT?',
    options:[
      'The plant will grow faster because it wastes no energy on leaves',
      'The plant will survive indefinitely using stem photosynthesis',
      'The plant will soon weaken and die because without leaves, photosynthesis almost stops and the plant cannot make food',
      'The plant will switch to absorbing food through its roots instead'
    ],
    answer:'The plant will soon weaken and die because without leaves, photosynthesis almost stops and the plant cannot make food',
    hint:'Recall that the leaf is the "factory" - what happens when you shut the factory?',
    explanation:'Leaves are the main organs of photosynthesis. Without them, the plant produces almost no glucose - its energy and food source. The Grade 6 Pupil\'s Book explains the leaf\'s role: <b>inputs (sunlight, CO₂, water) → food (glucose) + O₂</b>. Without this "factory" running, the plant exhausts its stored food reserves, cannot grow or repair itself, and eventually dies. Some green stems photosynthesise slightly but cannot compensate for the loss of all leaves.' })

);
