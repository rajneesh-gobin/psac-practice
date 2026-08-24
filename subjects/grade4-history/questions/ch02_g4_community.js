'use strict';
// Grade 4 History & Geography — Chapter: Our Community
// IDs format: g4h-com-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-com-001', chapterId:'g4hist-community', difficulty:1,
    question:'What is a COMMUNITY?',
    options:['A single family living alone','A group of people living together in an area and sharing services','A type of government building','A large forest area'],
    answer:'A group of people living together in an area and sharing services',
    hint:'Think about the people living in your village, town or city.',
    explanation:'A <b>community</b> is a group of people who live together in the same area and share services, places and activities. A community can be a village, town or city. Communities have schools, hospitals, markets and other shared services that meet people\'s needs.' }),

  makeMCQ({ id:'g4h-com-002', chapterId:'g4hist-community', difficulty:1,
    question:'What type of community is found in the COUNTRYSIDE with farms and open fields?',
    options:['Urban community','Industrial community','Rural community','Coastal community'],
    answer:'Rural community',
    hint:'"Rural" relates to the countryside, away from towns and cities.',
    explanation:'A <b>rural community</b> is found in the countryside — it has farms, open fields, forests and fewer buildings. Examples in Mauritius: small villages like Mahébourg, Flacq or Rivière des Anguilles. Rural communities are usually smaller and less crowded than urban ones.' }),

  makeMCQ({ id:'g4h-com-003', chapterId:'g4hist-community', difficulty:1,
    question:'What type of community has many tall buildings, busy roads and large shopping centres?',
    options:['Rural community','Coastal community','Forest community','Urban community'],
    answer:'Urban community',
    hint:'"Urban" relates to towns and cities.',
    explanation:'An <b>urban community</b> is found in towns and cities — it has many buildings, busy roads, shops, offices and services. Examples in Mauritius: Port Louis, Curepipe, Rose Hill, Quatre Bornes. Urban communities are usually more crowded and have more services than rural ones.' }),

  makeTF({ id:'g4h-com-004', chapterId:'g4hist-community', difficulty:1,
    question:'A hospital is a community service.',
    answer:true,
    hint:'A community service helps everyone in the community, not just one family.',
    explanation:'<b>True.</b> A hospital is a <b>community service</b> — it provides healthcare for everyone in the area. Other community services include: schools (education), post offices (communication), police stations (safety), fire stations (emergency), markets (food and goods), places of worship (spiritual needs).' }),

  makeMCQ({ id:'g4h-com-005', chapterId:'g4hist-community', difficulty:2,
    question:'Which of these is a community SERVICE?',
    options:['A private swimming pool','A school','A garden in someone\'s home','A family car'],
    answer:'A school',
    hint:'A community service is used by members of the community, not just one family.',
    explanation:'A <b>school</b> is a community service because it serves all children in the area. A private swimming pool, a home garden and a family car are for personal/private use — they are not community services. Community services are shared and benefit the whole community.' }),

  makeMCQ({ id:'g4h-com-006', chapterId:'g4hist-community', difficulty:2,
    question:'A family needs food, water, shelter, education and healthcare. What are these called?',
    options:['Wants','Wishes','Needs','Luxuries'],
    answer:'Needs',
    hint:'These are things you cannot live properly without.',
    explanation:'Food, water, shelter, education and healthcare are called <b>needs</b> — things that are essential for people to live healthy lives. Compare with <b>wants</b> — things we would like to have but can manage without (e.g. a bicycle, a toy). Meeting people\'s needs is the main purpose of a community.' }),

  makeMCQ({ id:'g4h-com-007', chapterId:'g4hist-community', difficulty:2,
    question:'In a RURAL community in Mauritius, what type of work do most people do?',
    options:['Banking and finance','Farming, fishing and small trade','Working in large offices','Manufacturing clothing in factories'],
    answer:'Farming, fishing and small trade',
    hint:'Rural communities are near fields and the sea. What activities happen there?',
    explanation:'In rural communities, most people work in <b>farming</b> (growing crops like sugar cane, vegetables), <b>fishing</b> (from coastal villages) or small local trade. Large offices and factories are more common in urban areas. In Mauritius, many rural communities have sugar cane fields and small markets.' }),

  makeMCQ({ id:'g4h-com-008', chapterId:'g4hist-community', difficulty:2,
    question:'Which community service would you go to if you were ILL or INJURED?',
    options:['Post office','Police station','Hospital or clinic','Fire station'],
    answer:'Hospital or clinic',
    hint:'Think about which service is responsible for health and medical care.',
    explanation:'A <b>hospital or clinic</b> provides medical care for people who are ill or injured. Other services: post office (sending letters/parcels), police station (law and order, safety), fire station (fires and emergencies). Each community service has a specific role.' }),

  makeMCQ({ id:'g4h-com-009', chapterId:'g4hist-community', difficulty:3,
    question:'What is the MAIN DIFFERENCE between a rural and an urban community?',
    options:[
      'Urban communities are always near the sea; rural ones are inland',
      'Urban communities are larger, more densely populated and have more services; rural ones are smaller with farming and open land',
      'Rural communities are only found in Africa; urban communities are in Mauritius',
      'There is no real difference between rural and urban communities'
    ],
    answer:'Urban communities are larger, more densely populated and have more services; rural ones are smaller with farming and open land',
    hint:'Think about population size, types of buildings, land use and activities in each.',
    explanation:'The key difference: <b>urban communities</b> are large, densely populated (many people per km²), with many buildings, shops and services. <b>Rural communities</b> are smaller, less crowded, with farms, open fields and fewer services. In Mauritius: Port Louis is urban; Savanne district is more rural.' }),

  makeMCQ({ id:'g4h-com-010', chapterId:'g4hist-community', difficulty:4,
    question:'A new town is being planned in Mauritius. Residents ask for: (1) a school, (2) a market, (3) a health centre, (4) a fire station. Which of these should be built FIRST if the planners can only build one at a time and the town has many young children and is far from the nearest hospital?',
    options:[
      'The market — so people can buy food immediately',
      'The health centre — because it is far from a hospital and medical emergencies cannot wait',
      'The school — because education is the most important need',
      'The fire station — to protect buildings from fire'
    ],
    answer:'The health centre — because it is far from a hospital and medical emergencies cannot wait',
    hint:'Consider which need is most urgent given the specific situation described.',
    explanation:'Given that the town is <b>far from the nearest hospital</b>, a <b>health centre</b> should be prioritised — medical emergencies (injuries, serious illness) cannot wait for a long journey. While all four services are important needs, the urgency of health emergencies (especially with children present) makes healthcare the most critical first investment.' })

);
