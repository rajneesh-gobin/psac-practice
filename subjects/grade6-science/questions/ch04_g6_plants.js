'use strict';
// Grade 6 Science — Chapter: Plants & Ecosystems (photosynthesis, food chains)
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
    explanation:'Photosynthesis produces <b>glucose</b> (which the plant uses as food for energy and growth) and <b>oxygen</b> (which is released into the air — this is why plants are vital for maintaining oxygen levels in the atmosphere).' }),

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
    explanation:'<b>Grass</b> is the producer in this food chain. Producers are always green plants — they make their own food through photosynthesis. All other organisms in the food chain depend on the producer for energy.' }),

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
    explanation:'True. All food chains start with a <b>producer</b> — a green plant (or alga) that captures energy from the sun through photosynthesis. All other organisms in the chain depend on this captured energy.' }),

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
    explanation:'<b>Decomposers</b> (bacteria and fungi) break down dead organisms and waste into simpler substances, returning nutrients to the soil. This is essential for recycling nutrients in an ecosystem — without decomposers, nutrients would be locked in dead matter.' }),

  makeMCQ({ id:'g6sci-pl-009', chapterId:'g6-plants', difficulty:2,
    question:'What would happen if all the GRASS (producer) in a food chain were removed?',
    options:[
      'Only the top predator would be affected',
      'Nothing would change — animals would find other food',
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
