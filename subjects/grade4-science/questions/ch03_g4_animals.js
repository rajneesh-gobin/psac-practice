'use strict';
// Grade 4 Science — Chapter: Animals & Habitats
// IDs format: g4s-ani-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-ani-001', chapterId:'g4sci-animals', difficulty:1,
    question:'A HERBIVORE eats:',
    options:['Only animals','Only plants','Both plants and animals','Only fish'],
    answer:'Only plants',
    hint:'Herbi- comes from the Latin word for plant.',
    explanation:'A <b>herbivore</b> eats <b>only plants</b>. Examples: cows, rabbits, horses, elephants, sheep. They have flat teeth for grinding plant material. Compare: carnivore (eats only animals), omnivore (eats both plants and animals).' }),

  makeMCQ({ id:'g4s-ani-002', chapterId:'g4sci-animals', difficulty:1,
    question:'Which animal is ENDEMIC to Mauritius (found naturally only in Mauritius)?',
    options:['Lion','Pink Pigeon','Elephant','Crocodile'],
    answer:'Pink Pigeon',
    hint:'This bird is found naturally only in Mauritius and is endangered.',
    explanation:'The <b>Pink Pigeon</b> (Columba mayeri) is endemic to Mauritius — it is found naturally only on our island. It is an endangered species. Other Mauritius endemic animals include the Echo Parakeet and the Mauritius Kestrel.' }),

  makeTF({ id:'g4s-ani-003', chapterId:'g4sci-animals', difficulty:1,
    question:'The Dodo is an ENDANGERED animal of Mauritius.',
    answer:false,
    hint:'Endangered means the animal is at risk of dying out. Is the Dodo still alive?',
    explanation:'<b>False.</b> The Dodo is <b>extinct</b> — it died out completely, mainly due to hunting by sailors and the introduction of non-native animals after Europeans arrived in Mauritius in the 17th century. Endangered animals are alive but at risk; extinct animals no longer exist anywhere on Earth.' }),

  makeMCQ({ id:'g4s-ani-004', chapterId:'g4sci-animals', difficulty:1,
    question:'A CARNIVORE eats:',
    options:['Only plants','Only animals','Both plants and animals','Rocks and soil'],
    answer:'Only animals',
    hint:'Carni- comes from the Latin word for meat/flesh.',
    explanation:'A <b>carnivore</b> eats <b>only animals</b> (meat). Examples: lions, sharks, eagles, owls. They usually have sharp teeth or beaks for catching and tearing prey. Herbivore = only plants. Omnivore = both plants and animals.' }),

  makeMCQ({ id:'g4s-ani-005', chapterId:'g4sci-animals', difficulty:2,
    question:'A HUMAN is an example of an OMNIVORE. What does this mean?',
    options:[
      'Humans eat only meat',
      'Humans eat only vegetables',
      'Humans eat both plants and animals',
      'Humans do not need food'
    ],
    answer:'Humans eat both plants and animals',
    hint:'Omni- means "all" — omnivores eat from all food types.',
    explanation:'An <b>omnivore</b> eats <b>both plants and animals</b>. Humans eat rice, vegetables, fruit (plants) AND fish, chicken, eggs (animals). Other omnivores: bears, pigs, foxes, crows.' }),

  makeMCQ({ id:'g4s-ani-006', chapterId:'g4sci-animals', difficulty:2,
    question:'A fish lives in an AQUATIC habitat. What does this mean?',
    options:['A habitat in the desert','A habitat in or near water','A habitat in a forest','A habitat underground'],
    answer:'A habitat in or near water',
    hint:'"Aqua" means water in Latin.',
    explanation:'An <b>aquatic habitat</b> is one that is in or near water (rivers, ponds, sea). Fish, frogs, crabs and coral are examples of aquatic animals. In Mauritius, the surrounding Indian Ocean is a rich aquatic habitat with many species.' }),

  makeMCQ({ id:'g4s-ani-007', chapterId:'g4sci-animals', difficulty:2,
    question:'In the food chain: Grass → Rabbit → Eagle, what is the RABBIT?',
    options:['A producer','A herbivore and prey','A carnivore and predator','A decomposer'],
    answer:'A herbivore and prey',
    hint:'The rabbit eats grass (so it is a ___) and is eaten by the eagle (so it is ___). ',
    explanation:'The rabbit is a <b>herbivore</b> (it eats grass, a plant) and is also <b>prey</b> (it is eaten by the eagle). The grass is the producer. The eagle is the carnivore (predator). In every food chain: producer → herbivore → carnivore.' }),

  makeMCQ({ id:'g4s-ani-008', chapterId:'g4sci-animals', difficulty:2,
    question:'What does "ENDEMIC" mean when describing an animal?',
    options:[
      'The animal is very large',
      'The animal is found naturally only in that specific place and nowhere else',
      'The animal has been brought from another country',
      'The animal is dangerous to humans'
    ],
    answer:'The animal is found naturally only in that specific place and nowhere else',
    hint:'Endemic animals evolved in one specific place and do not naturally live anywhere else.',
    explanation:'"<b>Endemic</b>" means the animal is found <b>naturally only in one specific location</b>. The Pink Pigeon is endemic to Mauritius — you will not find it naturally living in Africa or Asia. It evolved here. Contrast with "introduced species" (brought from another place) and "exotic species" (non-native).' }),

  makeMCQ({ id:'g4s-ani-009', chapterId:'g4sci-animals', difficulty:3,
    question:'Which food chain is CORRECT for a Mauritius forest ecosystem?',
    options:[
      'Eagle → Rabbit → Grass',
      'Grass → Eagle → Rabbit',
      'Grass → Rabbit → Eagle',
      'Rabbit → Grass → Eagle'
    ],
    answer:'Grass → Rabbit → Eagle',
    hint:'A food chain always starts with a producer (plant). Energy flows from left to right.',
    explanation:'The correct order is <b>Grass → Rabbit → Eagle</b>. Food chains always start with a <b>producer</b> (plant) which makes its own food. Energy flows: plant → herbivore → carnivore. The arrows show the direction of energy flow (who eats whom).' }),

  makeMCQ({ id:'g4s-ani-010', chapterId:'g4sci-animals', difficulty:4,
    question:'In a forest, all the GRASS is removed. What will happen to the RABBITS and EAGLES over time? (Food chain: Grass → Rabbit → Eagle)',
    options:[
      'Rabbits will find other food; eagles will be unaffected',
      'Rabbits will have no food and their numbers will decrease; eagles will then also decline because their food (rabbits) is gone',
      'Eagle numbers will increase because rabbits will eat eagles instead',
      'Nothing will change — animals always find a way to survive'
    ],
    answer:'Rabbits will have no food and their numbers will decrease; eagles will then also decline because their food (rabbits) is gone',
    hint:'Follow the chain: if the grass disappears, what happens next? And then what?',
    explanation:'Removing the grass <b>breaks the food chain</b>. Without grass, rabbits have no food → <b>rabbit numbers fall</b>. Without rabbits, eagles have no prey → <b>eagle numbers fall too</b>. This shows how removing one part of a food chain affects the whole ecosystem. This is why protecting habitats and all species is important.' })

);
