'use strict';
// Grade 5 Science — Chapter: Animals & Habitats
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5sci-an-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-an-001', chapterId:'animals', difficulty:1,
    question:'Which of the following is a bird endemic to the Island of Mauritius?',
    options:['Crow','Cardinal Jaune','Echo Parakeet','Sparrow'],
    answer:'Echo Parakeet',
    hint:'An endemic species is found ONLY in that place and nowhere else in the world.',
    explanation:'The Echo Parakeet (Psittacula eques) is endemic to Mauritius — it is found only in Mauritius. The Dodo was also endemic but is now extinct.' }),

  makeMCQ({ id:'g5sci-an-002', chapterId:'animals', difficulty:1,
    question:'The Dodo was a bird that used to live in Mauritius. Why can we NOT see it today?',
    options:['It migrated to another country','It became extinct','It lives only in zoos now','It changed its appearance over time'],
    answer:'It became extinct',
    hint:'Extinct means a species no longer exists anywhere on Earth.',
    explanation:'The Dodo became extinct in the late 17th century due to hunting by sailors and the introduction of predators (rats, dogs, pigs) that ate Dodo eggs and chicks.' }),

  makeMCQ({ id:'g5sci-an-003', chapterId:'animals', difficulty:2,
    question:'Which of the following is an extinct bird that was endemic to Rodrigues?',
    options:['Pink Pigeon','Rodrigues Solitaire','Echo Parakeet','Dodo'],
    answer:'Rodrigues Solitaire',
    hint:'Rodrigues had its own large flightless bird, similar to the Dodo.',
    explanation:'The Rodrigues Solitaire was a large flightless bird endemic to Rodrigues, now extinct. The Dodo was endemic to Mauritius (not Rodrigues).' }),

  makeMCQ({ id:'g5sci-an-004', chapterId:'animals', difficulty:2,
    question:'What does the term "endemic" mean when describing an animal?',
    options:[
      'The animal is dangerous to humans',
      'The animal is found only in one specific place in the world',
      'The animal has been brought from another country',
      'The animal is very common worldwide'
    ],
    answer:'The animal is found only in one specific place in the world',
    hint:'Endemic = belonging to one specific place naturally.',
    explanation:'An endemic species is one that is native to and found ONLY in a particular area or country, and nowhere else naturally in the world.' }),

  makeMCQ({ id:'g5sci-an-005', chapterId:'animals', difficulty:2,
    question:'Which of the following is a nature reserve in Mauritius set up to protect endemic animals?',
    options:['Blue Bay','Grand Bassin','Île aux Aigrettes','Grand Bassin Reservoir'],
    answer:'Île aux Aigrettes',
    hint:'This is a small coral island converted into a nature reserve near Mahébourg.',
    explanation:'Île aux Aigrettes is a nature reserve off the south-east coast of Mauritius, where endangered endemic animals (Pink Pigeon, Aldabra Giant Tortoise) are protected and bred.' }),

  makeTF({ id:'g5sci-an-006', chapterId:'animals', difficulty:1,
    question:'Animals can survive equally well in any habitat, regardless of conditions.',
    answer:false,
    hint:'Think about a fish out of water, or a polar bear in the desert.',
    explanation:'Animals are adapted to specific habitats. A desert animal is suited to dry, hot conditions; a fish is suited to water. Moving them to an unsuitable habitat threatens their survival.' }),

  makeMCQ({ id:'g5sci-an-007', chapterId:'animals', difficulty:2,
    question:'Which of the following is a measure taken to protect endangered animals in Mauritius?',
    options:[
      'Cutting down forests to build more farms',
      'Introducing more foreign animals onto the island',
      'Setting up nature reserves and breeding programmes',
      'Allowing hunting in national parks'
    ],
    answer:'Setting up nature reserves and breeding programmes',
    hint:'Protection means creating safe spaces and helping populations recover.',
    explanation:'Nature reserves, captive breeding programmes and laws against hunting help protect endangered animals. The Pink Pigeon was brought back from near extinction this way.' }),

  makeMCQ({ id:'g5sci-an-008', chapterId:'animals', difficulty:2,
    question:'Which of the following is a main reason why animals become endangered?',
    options:[
      'They stop eating food',
      'Their habitat is destroyed or they are hunted',
      'They choose to live in cities',
      'They reproduce too quickly'
    ],
    answer:'Their habitat is destroyed or they are hunted',
    hint:'What threatens the survival of wild animals?',
    explanation:'Animals become endangered mainly due to loss of habitat (forests cut down), hunting, introduction of foreign predators, disease and pollution.' }),

  makeMCQ({ id:'g5sci-an-009', chapterId:'animals', difficulty:1,
    question:'Which large flightless bird, now extinct, was endemic to Mauritius?',
    options:['Flamingo','Dodo','Ostrich','Eagle'],
    answer:'Dodo',
    hint:'This bird could not fly and was not afraid of humans when they first arrived.',
    explanation:'The Dodo (Raphus cucullatus) was a large flightless bird found only in Mauritius. It became extinct in the late 17th century due to hunting and predation.' }),

  makeMCQ({ id:'g5sci-an-010', chapterId:'animals', difficulty:2,
    question:'François Leguat settled in Rodrigues in 1691 and wrote about a bird now extinct called the Rodrigues Solitaire. What type of bird was it?',
    options:['A small brightly-coloured bird','A large flightless bird','A fast-flying seabird','A parrot-like bird'],
    answer:'A large flightless bird',
    hint:'It was similar to the Dodo of Mauritius.',
    explanation:'The Rodrigues Solitaire was a large flightless bird — similar to the Dodo — that lived only in Rodrigues. François Leguat described it in 1691; it became extinct in the 18th century.' }),

  makeMCQ({ id:'g5sci-an-011', chapterId:'animals', difficulty:1,
    question:'Which bird is endemic to the island of Rodrigues?',
    options:['Echo Parakeet','Pink Pigeon','Cardinal Jaune','Dodo'],
    answer:'Cardinal Jaune',
    hint:'This bright yellow bird is found only on Rodrigues.',
    explanation:'The <b>Cardinal Jaune</b> (Yellow Cardinal or Rodrigues Fody) is a bird endemic to Rodrigues. It is found only on Rodrigues and is one of the island\'s iconic endemic birds.' }),

  makeMCQ({ id:'g5sci-an-012', chapterId:'animals', difficulty:1,
    question:'Where does a fish naturally live?',
    options:['Desert','Forest','Water','Underground soil'],
    answer:'Water',
    hint:'Fish breathe through gills which work in water.',
    explanation:'Fish live naturally in <b>water</b> (sea, rivers, lakes). They are adapted to an aquatic habitat — they breathe through gills that extract oxygen from the water.' }),

  makeMCQ({ id:'g5sci-an-013', chapterId:'animals', difficulty:2,
    question:'Give TWO ways in which fish are adapted to live in water.',
    options:[
      'They have fins to swim and gills to breathe underwater',
      'They have wings to fly and lungs to breathe air',
      'They have four legs and a thick fur coat',
      'They have a hump to store water and wide flat feet'
    ],
    answer:'They have fins to swim and gills to breathe underwater',
    hint:'Think about how fish move and how they get oxygen.',
    explanation:'Fish are adapted to water in two key ways: (1) <b>Fins</b> allow them to swim and steer through water; (2) <b>Gills</b> allow them to extract dissolved oxygen from the water to breathe. They also have streamlined bodies to reduce resistance.' }),

  makeMCQ({ id:'g5sci-an-014', chapterId:'animals', difficulty:1,
    question:'What is the habitat of a worm?',
    options:['Sea','Air','Soil','Desert'],
    answer:'Soil',
    hint:'You find worms when you dig in the garden.',
    explanation:'Worms live in <b>soil</b>. They burrow through the soil, feeding on decaying plant matter, and help to aerate and fertilise the soil. They need moist conditions to breathe through their skin.' }),

  makeMCQ({ id:'g5sci-an-015', chapterId:'animals', difficulty:2,
    question:'Which one of the following is an endemic animal that lives on Île Ronde, a nature reserve near Mauritius?',
    options:['Dodo','Boa constrictor (Round Island boa)','Polar bear','Cardinal Jaune'],
    answer:'Boa constrictor (Round Island boa)',
    hint:'Île Ronde protects several reptiles found nowhere else on Earth.',
    explanation:'<b>Île Ronde</b> (Round Island) is a nature reserve north of Mauritius that protects several endemic reptiles found nowhere else, including the <b>Round Island boa</b> and endemic skinks and geckos. The Dodo (Mauritius mainland) and Cardinal Jaune (Rodrigues) are different.' }),

  makeMCQ({ id:'g5sci-an-016', chapterId:'animals', difficulty:2,
    question:'Why have most endemic birds in Mauritius become rare?',
    options:[
      'They chose to fly away to other countries',
      'Their forest habitats were destroyed and predators (rats, cats, monkeys) were introduced',
      'They stopped breeding because of too much sunlight',
      'The government collected them all for zoos'
    ],
    answer:'Their forest habitats were destroyed and predators (rats, cats, monkeys) were introduced',
    hint:'Two key factors: habitat loss and new predators.',
    explanation:'Endemic birds became rare mainly because: (1) Their <b>forest habitat was destroyed</b> when settlers cleared land for farming and building; (2) <b>Introduced animals</b> (rats, cats, monkeys, pigs) ate their eggs, chicks and food sources. These two factors together drove many species to near-extinction.' }),

  makeMCQ({ id:'g5sci-an-017', chapterId:'animals', difficulty:3,
    question:'A dolphin breathes air using lungs, but it lives in the sea. Which group of animals does a dolphin belong to?',
    options:['Fish','Amphibian','Mammal','Reptile'],
    answer:'Mammal',
    hint:'If it breathes air, is warm-blooded and feeds its young on milk, it is in this group.',
    explanation:'The dolphin is a <b>mammal</b>. Although it lives in the sea and looks like a fish, it breathes air through a blowhole (it has lungs, not gills), is warm-blooded, gives birth to live young, and nurses them with milk — all characteristics of mammals.' }),

  makeMCQ({ id:'g5sci-an-018', chapterId:'animals', difficulty:3,
    question:'The government sets up a nature reserve on an island and removes all introduced predators (cats and rats). Over the next 10 years, the population of the endemic Pink Pigeon doubles. What does this tell us?',
    options:[
      'Pink Pigeons reproduce faster when it is warmer',
      'Removing predators reduces death rates, allowing the bird population to increase',
      'Pink Pigeons were pretending to be endangered before the reserve was set up',
      'The birds flew in from other islands to join the nature reserve'
    ],
    answer:'Removing predators reduces death rates, allowing the bird population to increase',
    hint:'Fewer predators = fewer birds being killed = more birds survive to reproduce.',
    explanation:'By removing introduced predators, fewer Pink Pigeons and their eggs/chicks are killed. The <b>death rate falls</b> while the <b>birth rate stays the same</b>, so the population grows. This confirms that predation was a key reason the species was endangered.' }),

  makeMCQ({ id:'g5sci-an-019', chapterId:'animals', difficulty:4,
    question:'A student argues: "Animals should be taken from nature reserves and kept in zoos, because zoos are safer." Give the BEST argument AGAINST this view.',
    options:[
      'Zoos are too expensive to visit',
      'In zoos, animals cannot live and behave naturally, may not reproduce well, and removing them from nature reserves reduces the wild population that conservation aims to protect',
      'Zoos always mistreat animals',
      'Wild animals cannot survive in zoos at all'
    ],
    answer:'In zoos, animals cannot live and behave naturally, may not reproduce well, and removing them from nature reserves reduces the wild population that conservation aims to protect',
    hint:'What is the purpose of a nature reserve compared to a zoo?',
    explanation:'Nature reserves are designed to allow animals to live naturally in their own habitat, hunt their own food and reproduce naturally — this is the goal of conservation. Moving animals to zoos removes them from their natural habitat, can reduce their quality of life, and depletes the very wild population that conservation programmes aim to grow. Captive breeding in zoos can play a supplementary role, but nature reserves in the wild are considered more sustainable.' })

);
