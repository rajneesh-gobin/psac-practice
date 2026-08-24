'use strict';
// Grade 4 History & Geography — Chapter 1: Locality: Past & Present
// MIE Syllabus: types of locality, change & continuity, evidence, timelines
// IDs format: g4h-loc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4h-loc-001', chapterId:'g4hist-locality', difficulty:1,
    question:'What is a LOCALITY?',
    options:['A country far away','The area where you live — your village, town or neighbourhood','A type of school subject','A map of the whole world'],
    answer:'The area where you live — your village, town or neighbourhood',
    hint:'Your locality is the place closest to your home.',
    explanation:'A <b>locality</b> is the area where you live — it could be a village, a town, or a neighbourhood. Your locality includes the streets, buildings, parks, and services near your home. Each locality has its own features that make it different from others.' }),

  makeMCQ({ id:'g4h-loc-002', chapterId:'g4hist-locality', difficulty:1,
    question:'Which of these is an example of an URBAN locality?',
    options:['A small fishing village by the sea','Port Louis city centre with tall buildings and busy roads','A farm with sugar cane fields','A forest reserve'],
    answer:'Port Louis city centre with tall buildings and busy roads',
    hint:'Urban means city or town — think of lots of buildings and people.',
    explanation:'<b>Urban localities</b> are towns and cities — they have many buildings, busy roads, shops and offices. <b>Port Louis</b> is the main urban locality in Mauritius. A fishing village and a farm are rural localities; a forest reserve is neither urban nor a residential locality.' }),

  makeMCQ({ id:'g4h-loc-003', chapterId:'g4hist-locality', difficulty:1,
    question:'What type of locality has farms, open fields and few buildings?',
    options:['Urban','Rural','Industrial','Commercial'],
    answer:'Rural',
    hint:'Think of the countryside — farms, animals, open land.',
    explanation:'A <b>rural locality</b> has farms, open fields, green spaces and few buildings. People in rural localities often work in farming, fishing or small local businesses. In Mauritius, areas like Savanne, Rivière des Anguilles and many small villages are rural localities.' }),

  makeMCQ({ id:'g4h-loc-004', chapterId:'g4hist-locality', difficulty:1,
    question:'A locality near the sea where people fish and tourists visit beaches is called a...',
    options:['Mountain locality','Desert locality','Coastal locality','Forest locality'],
    answer:'Coastal locality',
    hint:'The sea is the clue — what type of locality is near the coast?',
    explanation:'A <b>coastal locality</b> is found near the sea. In Mauritius, many coastal localities like Grand Baie, Flic en Flac, and Blue Bay attract both fishermen and tourists. People in coastal localities often work in fishing, boat-building, and tourism-related activities.' }),

  makeTF({ id:'g4h-loc-005', chapterId:'g4hist-locality', difficulty:1,
    question:'Old photographs can help us find out what a locality looked like in the past.',
    answer:true,
    hint:'Think about how historians learn about the past.',
    explanation:'<b>True.</b> Old photographs are an important type of <b>evidence</b> — they show us what buildings, streets, clothing and activities looked like in the past. By comparing old and new photographs of the same place, we can identify what has changed and what has stayed the same.' }),

  makeMCQ({ id:'g4h-loc-006', chapterId:'g4hist-locality', difficulty:2,
    question:'What is CHANGE in a locality?',
    options:['Everything that stays the same over time','Something that is different now compared to the past','The money we spend at the market','The name of the village leader'],
    answer:'Something that is different now compared to the past',
    hint:'Change means things are NOT the same as they used to be.',
    explanation:'<b>Change</b> in a locality means something is <b>different now compared to how it was in the past</b>. For example: new roads built, old buildings knocked down, new shops opened, or electricity installed. Studying change helps us understand how our community has developed over time.' }),

  makeMCQ({ id:'g4h-loc-007', chapterId:'g4hist-locality', difficulty:2,
    question:'What is CONTINUITY in a locality?',
    options:['Something that is different now from the past','Things that have NOT changed and remain the same over time','The speed of change in a community','A new building being built'],
    answer:'Things that have NOT changed and remain the same over time',
    hint:'Continuity means things have CONTINUED — stayed the same.',
    explanation:'<b>Continuity</b> refers to things that have <b>stayed the same</b> over time. For example: an old church that is still standing after 100 years, or a traditional market that has existed for generations. Studying continuity helps us see which parts of our community have deep historical roots.' }),

  makeMCQ({ id:'g4h-loc-008', chapterId:'g4hist-locality', difficulty:2,
    question:'Anika finds an OLD OBJECT (a clay cooking pot) in her grandmother\'s attic. This object is an example of...',
    options:['Modern technology','Evidence about the past','A future invention','A community service'],
    answer:'Evidence about the past',
    hint:'Old objects tell us how people used to live. What do we call this type of information?',
    explanation:'An old clay cooking pot is a piece of <b>evidence about the past</b>. It tells us that people in the past used clay pots for cooking, which is different from modern pots and electric cookers today. Historians use objects, photographs, documents and buildings as evidence to learn about how people lived in the past.' }),

  makeMCQ({ id:'g4h-loc-009', chapterId:'g4hist-locality', difficulty:2,
    question:'Which of these shows CHANGE in the way people TRAVEL in a locality?',
    options:['People still drink water as they always have','People used to travel by horse cart; now they travel by car or bus','Children still go to school every day','The church in the village is still standing'],
    answer:'People used to travel by horse cart; now they travel by car or bus',
    hint:'What has happened to the MEANS OF TRANSPORT over time?',
    explanation:'Moving from <b>horse carts to cars and buses</b> is an example of change in the means of transport. In the past, people in Mauritius used bullock carts, horses and walking to travel. Today, most people use cars, buses, taxis and motorcycles. This change in transport is one of the clearest examples of how localities have developed.' }),

  makeMCQ({ id:'g4h-loc-010', chapterId:'g4hist-locality', difficulty:3,
    question:'A pupil is given OLD AND NEW photographs of the same street in Curepipe. The old photo shows small shops and dirt roads; the new photo shows tall buildings and a paved road. What can the pupil CONCLUDE about this locality?',
    options:[
      'The locality has not changed at all over time',
      'The locality has experienced change — it has grown and developed with new buildings and roads',
      'The locality has become smaller and less important',
      'The photographs are from different countries'
    ],
    answer:'The locality has experienced change — it has grown and developed with new buildings and roads',
    hint:'Compare what was there before with what is there now. What does the difference tell you?',
    explanation:'By comparing the two photographs, the pupil can conclude that the locality has <b>changed over time</b>. The <b>evidence</b> (old dirt road → paved road; small shops → tall buildings) shows <b>development and growth</b>. This is how historians use photographic evidence to study change in a locality.' }),

  makeMCQ({ id:'g4h-loc-011', chapterId:'g4hist-locality', difficulty:1,
    question:'Which of these is a PLACE OF WORSHIP found in many Mauritian localities?',
    options:['A supermarket','A mosque, church, temple or pagoda','A sports stadium','A bus station'],
    answer:'A mosque, church, temple or pagoda',
    hint:'Think of where people in Mauritius go to pray.',
    explanation:'In Mauritius, <b>places of worship</b> include <b>mosques</b> (Islamic), <b>churches</b> (Christian), <b>Hindu temples</b> (Hindu), and <b>Chinese pagodas</b> (Buddhist). These buildings are important landmarks in localities and often reflect the cultural diversity of Mauritius. Many old places of worship still stand today — they are an example of continuity.' }),

  makeMCQ({ id:'g4h-loc-012', chapterId:'g4hist-locality', difficulty:1,
    question:'What is a MONUMENT?',
    options:['A type of weather','A structure built to remind people of an important person or event','A new apartment building','A type of crop'],
    answer:'A structure built to remind people of an important person or event',
    hint:'Monuments are often statues or memorials.',
    explanation:'A <b>monument</b> is a structure — such as a statue, memorial, or building — built to <b>remind people of an important person or event</b>. In Mauritius, the statue of Sir Seewoosagur Ramgoolam in Port Louis is a monument. Monuments are part of a locality\'s history and help us remember significant events from the past.' }),

  makeMCQ({ id:'g4h-loc-013', chapterId:'g4hist-locality', difficulty:2,
    question:'What is a TIMELINE?',
    options:['A line drawn under a sentence','An arrangement of events in the ORDER they happened over time','A type of weather forecast','A list of community services'],
    answer:'An arrangement of events in the ORDER they happened over time',
    hint:'A timeline puts events in order — from oldest to newest.',
    explanation:'A <b>timeline</b> is a way of arranging events in the <b>order they happened</b>, from oldest (earliest) to newest. Timelines help us see how a locality or community has changed over time. For example: "1850 — village founded → 1900 — first school built → 1950 — electricity installed → 2000 — new road constructed."' }),

  makeTF({ id:'g4h-loc-014', chapterId:'g4hist-locality', difficulty:2,
    question:'An old building that is still standing today is evidence of CONTINUITY in a locality.',
    answer:true,
    hint:'Continuity means things have stayed the same. An old building is still there — it has not changed.',
    explanation:'<b>True.</b> An old building that is still standing is <b>evidence of continuity</b> — it shows that not everything in a locality changes. Old places of worship, historic houses and colonial-era buildings in Mauritius are examples of continuity. Historians study both change AND continuity to understand how a place has developed.' }),

  makeMCQ({ id:'g4h-loc-015', chapterId:'g4hist-locality', difficulty:2,
    question:'A historian wants to compare what a locality looked like 100 years ago with today. Which TWO types of evidence would be MOST useful?',
    options:[
      'A weather forecast and a recipe book',
      'Old photographs of the locality and old maps',
      'A new shopping list and a bus timetable',
      'A sports schedule and a school report'
    ],
    answer:'Old photographs of the locality and old maps',
    hint:'Think about what shows a place at a specific point in time.',
    explanation:'<b>Old photographs</b> and <b>old maps</b> are the most useful types of evidence for comparing a locality\'s past with its present. Photographs show buildings, roads, and people; maps show the layout of streets and land use. Together they give a detailed picture of what the locality looked like in the past.' }),

  makeMCQ({ id:'g4h-loc-016', chapterId:'g4hist-locality', difficulty:3,
    question:'A village in Mauritius 100 years ago had: thatched-roof houses, a dirt path, oil lamps, and a small market. Today it has concrete houses, paved roads, electric lights, and a supermarket. Which statement BEST describes what has happened?',
    options:[
      'The village has not changed at all',
      'The village has only changed in appearance but not in function',
      'The village has experienced significant change in housing, roads, lighting and shopping',
      'The village became a city'
    ],
    answer:'The village has experienced significant change in housing, roads, lighting and shopping',
    hint:'Compare the village then and now across each feature.',
    explanation:'The evidence shows <b>significant change</b> across multiple areas: housing (thatched → concrete), transport (dirt path → paved road), energy (oil lamps → electric lights), and commerce (small market → supermarket). These changes reflect <b>development and modernisation</b> in the locality over 100 years.' }),

  makeMCQ({ id:'g4h-loc-017', chapterId:'g4hist-locality', difficulty:3,
    question:'Which of these would appear EARLIEST on a timeline of a Mauritian village?',
    options:['Installation of electricity in homes','Construction of a concrete road','Arrival of the first settlers and building of wooden houses','Opening of a supermarket'],
    answer:'Arrival of the first settlers and building of wooden houses',
    hint:'What happens FIRST in the history of any new community?',
    explanation:'The <b>arrival of the first settlers</b> and building of initial homes would appear earliest on a timeline — this is how a community begins. Roads, electricity and supermarkets all come later as the community develops and grows. Understanding the order of events is the purpose of a timeline.' }),

  makeMCQ({ id:'g4h-loc-018', chapterId:'g4hist-locality', difficulty:3,
    question:'Rajan\'s grandfather says: "When I was young, the river was clean and children swam in it. Now it is polluted and nobody swims there." What type of CHANGE does this describe?',
    options:[
      'Positive change — the river improved',
      'No change — the river stayed the same',
      'Negative change — the environment deteriorated over time',
      'Political change — the government changed'
    ],
    answer:'Negative change — the environment deteriorated over time',
    hint:'Has the situation got better or worse? Is that a positive or negative change?',
    explanation:'This describes a <b>negative change</b> — the river went from being clean and useable to polluted and unsafe. Not all change is positive; some changes in a locality can be harmful to the environment and community. Historians and geographers study both positive and negative changes when examining how a locality develops over time.' }),

  makeMCQ({ id:'g4h-loc-019', chapterId:'g4hist-locality', difficulty:4,
    question:'A class is creating a timeline of their school locality from 1900 to today. They find: old photographs, an old school register from 1920, stories from elderly residents, and the school\'s founding document from 1905. A new pupil says: "We should only use the photographs — words are not reliable." Is the pupil correct? Why?',
    options:[
      'Yes — photographs are always more reliable than written documents',
      'No — historians use MULTIPLE types of evidence because each source gives different information; using only one type may give an incomplete picture',
      'Yes — old people\'s memories are always wrong',
      'No — the founding document is from 1905 so it is too old to be useful'
    ],
    answer:'No — historians use MULTIPLE types of evidence because each source gives different information; using only one type may give an incomplete picture',
    hint:'Think about what each type of evidence (photo, document, oral history) tells you that the others cannot.',
    explanation:'Historians use <b>multiple types of evidence</b> because each type provides different information: photographs show visual details of buildings and people; the founding document gives official dates and facts; the school register shows who attended; elderly residents\' stories provide lived experience and emotion. Using only photographs would miss important historical facts. Good historians cross-check different sources to build a more complete and accurate picture of the past.' })

);
