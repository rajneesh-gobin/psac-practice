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
    explanation:'The Rodrigues Solitaire was a large flightless bird — similar to the Dodo — that lived only in Rodrigues. François Leguat described it in 1691; it became extinct in the 18th century.' })

);
