'use strict';
// Grade 6 Science - Chapter: Animals, Food Groups & Human Teeth
// IDs format: g6sci-an-NNN

// Human teeth diagram
const _SVG_TEETH = `<svg viewBox="0 0 240 90" width="240" height="90" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <rect x="10" y="10" width="38" height="28" rx="4" fill="#fde68a" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="29" y="22" text-anchor="middle" font-size="7.5" fill="#78350f" font-weight="bold">Incisors</text>
  <text x="29" y="32" text-anchor="middle" font-size="6" fill="#92400e">cutting</text>
  <rect x="58" y="10" width="32" height="28" rx="4" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5"/>
  <text x="74" y="22" text-anchor="middle" font-size="7.5" fill="#7f1d1d" font-weight="bold">Canines</text>
  <text x="74" y="32" text-anchor="middle" font-size="6" fill="#991b1b">tearing</text>
  <rect x="100" y="10" width="40" height="28" rx="4" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="120" y="22" text-anchor="middle" font-size="7.5" fill="#3b0764" font-weight="bold">Premolars</text>
  <text x="120" y="32" text-anchor="middle" font-size="6" fill="#4c1d95">crushing</text>
  <rect x="150" y="10" width="36" height="28" rx="4" fill="#6ee7b7" stroke="#059669" stroke-width="1.5"/>
  <text x="168" y="22" text-anchor="middle" font-size="7.5" fill="#064e3b" font-weight="bold">Molars</text>
  <text x="168" y="32" text-anchor="middle" font-size="6" fill="#065f46">grinding</text>
  <text x="120" y="60" text-anchor="middle" font-size="7" fill="#475569">Types of human teeth and their functions</text>
  <text x="120" y="73" text-anchor="middle" font-size="6.5" fill="#64748b">Adults have 32 permanent teeth (incl. 4 wisdom teeth)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-an-001', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Which nutrient provides the body with its MAIN source of energy?',
    options:['Protein','Fat','Carbohydrate','Vitamins'],
    answer:'Carbohydrate',
    hint:'Foods like bread, rice and potatoes are rich in this nutrient.',
    explanation:'<b>Carbohydrates</b> are the body\'s main and quickest source of energy. They are found in starchy foods (bread, rice, pasta, potatoes) and sugary foods. Excess carbohydrates are stored as fat.' }),

  makeMCQ({ id:'g6sci-an-002', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Which nutrient is essential for the GROWTH and REPAIR of body tissues and muscles?',
    options:['Carbohydrate','Fat','Vitamins','Protein'],
    answer:'Protein',
    hint:'Bodybuilders eat a lot of this nutrient to build muscle.',
    explanation:'<b>Proteins</b> are the body\'s building blocks. They are needed for the growth of new cells and the repair of damaged tissues. Good sources include meat, fish, eggs, beans and dairy products.' }),

  makeMCQ({ id:'g6sci-an-003', chapterId:'g6-animals', subsection:'endangered', difficulty:1,
    question:'Which nutrient protects the body from disease and keeps the immune system healthy?',
    options:['Carbohydrate','Fat','Vitamins and minerals','Water'],
    answer:'Vitamins and minerals',
    hint:'Fruits and vegetables are excellent sources of these.',
    explanation:'<b>Vitamins and minerals</b> are needed in small amounts but are essential for health. They protect the body from disease, support the immune system, help build bones (calcium) and enable chemical reactions in the body.' }),

  makeMCQ({ id:'g6sci-an-004', chapterId:'g6-animals', subsection:'photos', difficulty:2,
    question:`${_SVG_TEETH}Looking at the diagram of human teeth, which type of tooth is used for CUTTING food?`,
    options:['Molars','Canines','Premolars','Incisors'],
    answer:'Incisors',
    hint:'These are the flat teeth at the very front of your mouth.',
    explanation:'<b>Incisors</b> are the four flat teeth at the front of each jaw. Their sharp edges are used to <b>cut and bite</b> pieces of food. Humans have 8 incisors (4 upper, 4 lower).' }),

  makeMCQ({ id:'g6sci-an-005', chapterId:'g6-animals', subsection:'photos', difficulty:1,
    question:`${_SVG_TEETH}According to the diagram, which teeth are used to GRIND food into small pieces?`,
    options:['Incisors','Canines','Premolars','Molars'],
    answer:'Molars',
    hint:'These are the large, flat teeth at the back of the mouth.',
    explanation:'<b>Molars</b> are the large, broad teeth at the back of the jaw. Their wide, flat surfaces are used to <b>grind and chew</b> food into a paste that can be swallowed and digested.' }),

  makeMCQ({ id:'g6sci-an-006', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Which teeth are used for TEARING food (for example, tearing meat)?',
    options:['Incisors','Canines','Premolars','Molars'],
    answer:'Canines',
    hint:'Dogs and cats have very long versions of these teeth for catching prey.',
    explanation:'<b>Canines</b> are the pointed, sharp teeth next to the incisors. They are used to <b>tear</b> food - especially meat. There are 4 canines in total (one in each corner of the mouth).' }),

  makeMCQ({ id:'g6sci-an-007', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'Why is WATER considered an essential nutrient even though it provides no energy?',
    options:[
      'Because it makes food taste better',
      'Because it carries nutrients around the body, regulates temperature and removes waste',
      'Because it is needed only when exercising',
      'Because it stops hunger'
    ],
    answer:'Because it carries nutrients around the body, regulates temperature and removes waste',
    hint:'About 60% of the human body is made of water.',
    explanation:'<b>Water</b> is vital for almost all body functions: it transports nutrients and oxygen in the blood, regulates body temperature through sweating, removes waste products in urine, and lubricates joints. We must drink about 2 litres of water per day.' }),

  makeMCQ({ id:'g6sci-an-008', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'Which food would be the best source of PROTEIN for a vegetarian?',
    options:['White rice','Butter','Lentils and beans','Sugar'],
    answer:'Lentils and beans',
    hint:'Some plant foods are rich in protein - they are popular in vegetarian diets.',
    explanation:'<b>Lentils, beans and chickpeas</b> (pulses) are excellent plant-based sources of protein. They also provide fibre and minerals, making them nutritious alternatives to meat.' }),

  makeTF({ id:'g6sci-an-009', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Fats are completely harmful to the body and should be avoided entirely.',
    answer:false,
    hint:'Think about what fats do for the body.',
    explanation:'<b>Fats are essential</b> in the diet - they provide concentrated energy, insulate the body, protect organs and are needed to absorb fat-soluble vitamins (A, D, E, K). However, eating <i>too much</i> fat, especially saturated fat, can lead to health problems.' }),

  makeMCQ({ id:'g6sci-an-010', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'How many permanent (adult) teeth does a fully grown human have, including wisdom teeth?',
    options:['20','28','32','36'],
    answer:'32',
    hint:'Children have 20 milk teeth; adults replace them with more.',
    explanation:'A fully grown adult human has <b>32 permanent teeth</b>: 8 incisors, 4 canines, 8 premolars and 12 molars (including 4 wisdom teeth). Children first have 20 milk (deciduous) teeth which are replaced from about age 6.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sci-an-011', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'The Grade 6 Science Pupil\'s Book classifies food into THREE groups. Which group does FISH belong to?',
    options:['Food for Energy','Food for Growth','Food for Health','Food for Strength'],
    answer:'Food for Growth',
    hint:'Fish is rich in protein - which food group is protein linked to?',
    explanation:'The MIE Grade 6 Science Pupil\'s Book classifies food into three groups: <b>Food for Energy</b> (starchy/sugary foods like rice, bread, sugar - provide carbohydrates and fats), <b>Food for Growth</b> (protein-rich foods like fish, meat, eggs, beans - build and repair the body), and <b>Food for Health</b> (vitamins/minerals from fruits and vegetables - protect the body from disease).' }),

  makeMCQ({ id:'g6sci-an-012', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'According to the Grade 6 textbook, a BALANCED MEAL must contain:',
    options:[
      'Only proteins and carbohydrates',
      'At least one food from each of the three food groups (Energy, Growth, Health)',
      'Five different types of vegetables',
      'Only food for health and food for growth'
    ],
    answer:'At least one food from each of the three food groups (Energy, Growth, Health)',
    hint:'The word "balanced" means including ALL three groups.',
    explanation:'The Grade 6 Science Pupil\'s Book states: a <b>balanced meal</b> must contain <b>at least one food from each of the three groups</b>: Food for Energy + Food for Growth + Food for Health. Example: rice (energy) + fish (growth) + carrots (health) = balanced meal. This matches the PSAC 2024 Q3 format where food items are classified into the three groups.' }),

  makeMCQ({ id:'g6sci-an-013', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'A GRANIVOROUS animal eats mainly:',
    options:['Flesh (meat) of other animals','Grass and leaves only','Seeds and grains','Both plants and animals'],
    answer:'Seeds and grains',
    hint:'Think of birds that pick up seeds from the ground - sparrows, parrots, pigeons.',
    explanation:'<b>Granivorous</b> animals eat mainly <b>seeds and grains</b>. Examples include sparrows, parrots and mice. The four feeding types in the Grade 6 Science Pupil\'s Book are: <b>herbivorous</b> (grass/leaves), <b>carnivorous</b> (flesh), <b>granivorous</b> (seeds/grains), and <b>omnivorous</b> (both plant and animal food).' }),

  makeMCQ({ id:'g6sci-an-014', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'Which of the following animals is a MAMMAL that can FLY? (PSAC 2025 Q5c)',
    options:['Eagle','Flying fish','Bat','Parrot'],
    answer:'Bat',
    hint:'This is the only true flying mammal - its wings are made of stretched skin.',
    explanation:'The <b>bat</b> is the only mammal capable of true sustained flight. The Grade 6 Science Pupil\'s Book specifically notes: "bat = mammal that can fly." A bat has all the characteristics of a mammal: gives birth to live young, feeds them with milk, and has fur. Its wings are formed by a thin membrane of skin stretched between elongated finger bones.' }),

  makeTF({ id:'g6sci-an-015', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'The duck-billed platypus is a mammal that lays eggs.',
    answer:true,
    hint:'Most mammals give birth to live young - the platypus is one of very few exceptions.',
    explanation:'<b>True.</b> The Grade 6 Science Pupil\'s Book notes that most mammals give birth to live young - <b>except</b> the duck-billed platypus, which <b>lays eggs</b>. The platypus is a semi-aquatic mammal endemic to eastern Australia. Despite laying eggs, it still feeds its young with milk, confirming it is a mammal.' }),

  makeMCQ({ id:'g6sci-an-016', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'Which animals have LONG and POINTED canine teeth? (PSAC 2025 Q3b)',
    options:['Herbivores','Granivores','Carnivores','Omnivores'],
    answer:'Carnivores',
    hint:'Think about the teeth of lions, wolves and tigers - what are they used for?',
    explanation:'<b>Carnivores</b> have long, sharp, pointed canine teeth for <b>catching prey and tearing meat</b>. The Grade 6 Pupil\'s Book explains that tooth shape reflects diet: carnivores (lions, dogs) have prominent canines; herbivores (cows, horses) have large flat molars for grinding plants; humans (omnivores) have a mix of all tooth types.' }),

  makeMCQ({ id:'g6sci-an-017', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'How many MILK TEETH does a child have in their complete first set?',
    options:['16','20','24','32'],
    answer:'20',
    hint:'Children have fewer teeth than adults - they have not yet grown their permanent set.',
    explanation:'A child\'s complete first set has <b>20 milk teeth</b> (also called deciduous or baby teeth). The Grade 6 Science Pupil\'s Book states: milk teeth first appear at about <b>7 months</b> old; the complete set is present by age <b>3</b>; they start falling out from about <b>age 5–6</b> to make way for 32 permanent teeth.' }),

  makeMCQ({ id:'g6sci-an-018', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'What is the function of INCISORS? (PSAC 2024 Q3d)',
    options:[
      'To grind and crush food',
      'To tear and rip meat',
      'To bite, cut and tear food into pieces',
      'To crush seeds and grains'
    ],
    answer:'To bite, cut and tear food into pieces',
    hint:'These are the front teeth - you use them to take a bite of an apple.',
    explanation:'The Grade 6 Science Pupil\'s Book states that <b>incisors</b> (the front teeth) are used to <b>bite, cut and tear food</b>. Humans have 8 incisors (4 upper, 4 lower). Their sharp, chisel-shaped edges allow them to cut efficiently. Canines tear; premolars and molars crush and grind.' }),

  makeMCQ({ id:'g6sci-an-019', chapterId:'g6-animals', subsection:'classification', difficulty:3,
    question:'The Grade 6 Science Pupil\'s Book lists characteristics of MAMMALS. Which statement is NOT a characteristic of all mammals?',
    options:[
      'Mammals feed their young with milk',
      'Most mammals have hair or fur on their body',
      'All mammals give birth to live young (no eggs)',
      'Most mammals can live on both land and in water'
    ],
    answer:'All mammals give birth to live young (no eggs)',
    hint:'Think about the platypus - is there an exception to this rule?',
    explanation:'The statement "all mammals give birth to live young" is <b>NOT true for all mammals</b>. The <b>duck-billed platypus</b> is a mammal that lays eggs. The characteristics that ALL mammals share are: (1) feed young with <b>milk</b>; (2) most have <b>hair or fur</b>; (3) are warm-blooded. The Grade 6 textbook specifically mentions the platypus as the exception to live birth.' })

);
