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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-ani-011', chapterId:'g4sci-animals', difficulty:1,
    question:'An animal WITH a backbone (spine) is called a:',
    options:['Invertebrate','Vertebrate','Herbivore','Predator'],
    answer:'Vertebrate',
    hint:'"Vertebra" is the bone of the spine. Vertebrate = has vertebrae.',
    explanation:'An animal with a backbone is called a <b>vertebrate</b>. The five groups of vertebrates: fish, amphibians, reptiles, birds and mammals. Animals WITHOUT a backbone are called <b>invertebrates</b> (insects, worms, jellyfish, crabs).' }),

  makeTF({ id:'g4s-ani-012', chapterId:'g4sci-animals', difficulty:1,
    question:'A fish is a vertebrate (it has a backbone).',
    answer:true,
    hint:'Fish have a spine running along their body.',
    explanation:'<b>True.</b> Fish are vertebrates — they have a backbone (vertebral column). The five groups of vertebrates are: <b>fish, amphibians, reptiles, birds and mammals</b>. Invertebrates (no backbone) include insects, crabs, worms and jellyfish.' }),

  makeMCQ({ id:'g4s-ani-013', chapterId:'g4sci-animals', difficulty:2,
    question:'A bird\'s beak is ADAPTED to its diet. A bird with a LONG, THIN beak most likely:',
    options:[
      'Cracks open hard seeds',
      'Probes flowers or mud to find insects or nectar',
      'Tears flesh from prey',
      'Scoops fish from water'
    ],
    answer:'Probes flowers or mud to find insects or nectar',
    hint:'Long, thin beaks can reach into narrow spaces — like flowers or soft mud.',
    explanation:'A <b>long, thin beak</b> is adapted for probing into flowers to reach nectar, or into mud/bark to find insects. Short, thick beaks crack seeds. Hooked beaks tear flesh. The matching of body structure to food source is called <b>adaptation</b>.' }),

  makeMCQ({ id:'g4s-ani-014', chapterId:'g4sci-animals', difficulty:2,
    question:'In a food chain, what is a PREDATOR?',
    options:[
      'An animal that is hunted and eaten by another animal',
      'An animal that hunts and eats other animals',
      'A plant that traps insects',
      'An animal that only eats plants'
    ],
    answer:'An animal that hunts and eats other animals',
    hint:'Think of a lion hunting a zebra. Which animal is the predator?',
    explanation:'A <b>predator</b> is an animal that <b>hunts and eats other animals</b>. Examples: eagle (hunts rabbits), shark (hunts fish), barn owl (hunts rats). The animal that is hunted is called <b>prey</b>.' }),

  makeMCQ({ id:'g4s-ani-015', chapterId:'g4sci-animals', difficulty:2,
    question:'In the food chain: Leaves → Caterpillar → Bird → Hawk, what is the CATERPILLAR?',
    options:[
      'A producer',
      'A herbivore and prey',
      'A carnivore and predator',
      'A top predator'
    ],
    answer:'A herbivore and prey',
    hint:'The caterpillar eats leaves (plants) and is eaten by the bird. Two roles.',
    explanation:'The caterpillar is a <b>herbivore</b> (eats leaves) and also <b>prey</b> (eaten by the bird). The leaves are the producer. The bird is both prey (eaten by hawk) and predator (eats caterpillar). Each organism can play more than one role.' }),

  makeMCQ({ id:'g4s-ani-016', chapterId:'g4sci-animals', difficulty:2,
    question:'What does "ENDANGERED" mean when describing a species?',
    options:[
      'The animal is very dangerous to humans',
      'The animal is at serious risk of becoming extinct if nothing is done to protect it',
      'The animal is a newly discovered species',
      'The animal is not found in Mauritius'
    ],
    answer:'The animal is at serious risk of becoming extinct if nothing is done to protect it',
    hint:'Compare: endangered (alive but at risk) vs extinct (completely gone).',
    explanation:'"<b>Endangered</b>" means the species has very low numbers and faces serious risk of becoming <b>extinct</b>. The Pink Pigeon and Mauritius Kestrel are endangered. The Dodo is extinct — it no longer exists anywhere on Earth.' }),

  makeMCQ({ id:'g4s-ani-017', chapterId:'g4sci-animals', difficulty:2,
    question:'Why is the PINK PIGEON endangered in Mauritius?',
    options:[
      'Because it is a carnivore that eats too many other animals',
      'Because of habitat destruction, introduced predators (rats, mongooses) and past hunting',
      'Because it cannot fly',
      'Because it lives in the sea'
    ],
    answer:'Because of habitat destruction, introduced predators (rats, mongooses) and past hunting',
    hint:'Introduced species (brought to Mauritius by humans) and deforestation are major threats.',
    explanation:'The Pink Pigeon is endangered due to: (1) <b>Habitat destruction</b> — deforestation removed its native forest. (2) <b>Introduced predators</b> — rats, mongooses and macaque monkeys eat eggs and chicks. (3) Past <b>hunting</b>. Conservation efforts (captive breeding, protected areas) have helped its numbers recover.' }),

  makeMCQ({ id:'g4s-ani-018', chapterId:'g4sci-animals', difficulty:3,
    question:'In Mauritius: Sugar cane → Rat → Barn Owl. If BARN OWL numbers increase a lot, what will happen to the RAT population?',
    options:[
      'Rat numbers will increase because owls protect them',
      'Rat numbers will decrease because more owls will eat more rats',
      'Rat numbers will stay the same',
      'Rats will move to another island'
    ],
    answer:'Rat numbers will decrease because more owls will eat more rats',
    hint:'More predators (owls) eating the prey (rats) — what happens to prey numbers?',
    explanation:'More owls → more rats hunted → <b>rat numbers decrease</b>. This is why barn owls are used as natural pest control in Mauritius sugar cane fields — they keep the rat population down without chemicals. This is called <b>biological control</b>.' }),

  makeMCQ({ id:'g4s-ani-019', chapterId:'g4sci-animals', difficulty:4,
    question:'A coral reef is damaged by pollution. It supports: Algae → Small fish → Large fish → Shark. What will MOST LIKELY happen to SHARK numbers if the algae disappear?',
    options:[
      'Shark numbers increase because algae compete with sharks for food',
      'Shark numbers decrease because the whole food chain collapses when the producer is removed',
      'Shark numbers stay the same because sharks do not eat algae',
      'Sharks will move to another reef and be completely unaffected'
    ],
    answer:'Shark numbers decrease because the whole food chain collapses when the producer is removed',
    hint:'Algae are the producer (start of the chain). What happens when the very first link breaks?',
    explanation:'No algae → no small fish → no large fish → <b>sharks lose their food source → shark numbers fall</b>. Even though sharks do not eat algae, they depend on all the links below them in the chain. This shows why <b>protecting producers</b> is critical for the whole ecosystem.' })

);
