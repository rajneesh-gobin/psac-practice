'use strict';
(function () {

// Grade 3 Health Education — Safety and First Aid
// IDs: g3he-saf-001 onwards
// Subsections: accident_prevention, road_water_safety, emergency_response

STATIC_QUESTIONS.push(

  // ── accident_prevention (001–025) ─────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-001', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'What is an accident?',
    options:['An unplanned harmful event','A carefully planned event','A normal school activity','A type of daily exercise'],
    answer:'An unplanned harmful event',
    hint:'Accidents happen unexpectedly.',
    explanation:'An <b>accident</b> is an unplanned event that results in injury, harm or damage. Many accidents can be prevented with awareness and safe behaviour.' }),

  makeMCQ({ id:'g3he-saf-002', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Which of these behaviours PREVENTS accidents at school?',
    options:['Walking in the corridors','Running as fast as we can','Ignoring safety signs','Climbing on the furniture'],
    answer:'Walking in the corridors',
    hint:'Safe behaviour prevents most school accidents.',
    explanation:'<b>Walking, using equipment correctly and following safety rules</b> prevents most common school accidents like falls, collisions and cuts.' }),

  makeMCQ({ id:'g3he-saf-003', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'What is the most common cause of accidents among children?',
    options:['Not following safety rules','Being fit and healthy','Eating too much fruit','Learning new school subjects'],
    answer:'Not following safety rules',
    hint:'Most accidents are preventable.',
    explanation:'The most common cause of childhood accidents is <b>careless behaviour and not following safety rules</b>. Awareness and caution prevent most accidents.' }),

  makeTF({ id:'g3he-saf-004', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Wearing appropriate protective equipment (e.g. helmet for cycling) prevents injuries.',
    answer:true,
    explanation:'<b>True.</b> Protective equipment reduces the severity of injuries if an accident occurs. A helmet can prevent fatal head injuries.' }),

  makeMCQ({ id:'g3he-saf-005', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Why are safety signs and warnings important?',
    options:['They warn us of danger','They decorate the wall','They are only for adults','They are only in factories'],
    answer:'They warn us of danger',
    hint:'Safety signs give us important information.',
    explanation:'Safety signs <b>alert us to dangers</b> like slippery floors, electrical hazards or restricted areas, allowing us to take precautions.' }),

  makeMCQ({ id:'g3he-saf-006', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'You see a "No Running" sign in the corridor. Why is this rule in place?',
    options:['To stop falls and collisions','To keep the corridor quiet','To keep the floor clean','To save the teacher time'],
    answer:'To stop falls and collisions',
    hint:'Think about what would happen if many children ran in a narrow space.',
    explanation:'Running in corridors causes <b>collisions and falls</b> that can seriously injure both the runner and others. The rule protects everyone.' }),

  makeTF({ id:'g3he-saf-007', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Falls are one of the leading causes of accidental injury in children.',
    answer:true,
    explanation:'<b>True.</b> Falls are one of the most common causes of childhood injury, particularly from heights, stairs and playground equipment.' }),

  makeMCQ({ id:'g3he-saf-008', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Which of these helps prevent burns at home?',
    options:['Keeping away from hot stoves','Leaving pots on the stove','Letting children cook alone','Letting iron cords trail'],
    answer:'Keeping away from hot stoves',
    hint:'Burns happen when hot objects are within reach of children.',
    explanation:'Burns are prevented by <b>keeping children away from hot appliances</b> and ensuring cords do not trail where children walk.' }),

  makeMCQ({ id:'g3he-saf-009', chapterId:'g3he-safety', difficulty:2, subsection:'accident_prevention',
    question:'What makes electrical hazards especially dangerous?',
    options:['Electricity cannot be seen','Electricity is always noisy','Electricity only shocks adults','Electricity is always cold'],
    answer:'Electricity cannot be seen',
    hint:'You cannot always see that something is electrically dangerous.',
    explanation:'Electrical hazards are dangerous because electricity is <b>invisible</b>, can cause lethal shocks, serious burns and house fires. Always respect electrical equipment.' }),

  makeTF({ id:'g3he-saf-010', chapterId:'g3he-safety', difficulty:1, subsection:'accident_prevention',
    question:'Reporting broken or damaged equipment at school helps prevent accidents.',
    answer:true,
    explanation:'<b>True.</b> Damaged equipment — broken swings, sharp edges, frayed carpets — can injure people. Reporting it promptly allows it to be repaired.' }),

  // ── road_water_safety (011–030) ───────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-011', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'What does the Green Cross Code mean?',
    options:['Rules for crossing the road','Rules for cycling on paths','A type of first aid kit','A traffic light system'],
    answer:'Rules for crossing the road',
    hint:'This code is taught to all children for road safety.',
    explanation:'The <b>Green Cross Code</b>: find a safe place → stop → look right, left and right again → listen → if clear, walk straight across. A pedestrian safety standard.' }),

  makeMCQ({ id:'g3he-saf-012', chapterId:'g3he-safety', difficulty:2, subsection:'road_water_safety',
    question:'Why is it more dangerous to cross the road from between parked cars?',
    options:['Drivers cannot see you','Parked cars block the wind','There is more litter there','It is against the law only'],
    answer:'Drivers cannot see you',
    hint:'Think about the sight line between a driver and a pedestrian.',
    explanation:'Parked cars <b>block the driver\'s view</b>. You cannot be seen until you step into the road, and drivers may not have time to brake. Always cross where you can be seen clearly.' }),

  makeTF({ id:'g3he-saf-013', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Children should never swim alone, even in shallow water.',
    answer:true,
    explanation:'<b>True.</b> Drowning can happen quickly and silently. Children must always swim with an adult present who can help if needed.' }),

  makeMCQ({ id:'g3he-saf-014', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'If you see someone drowning, what should you do?',
    options:['Shout and call an adult','Jump straight into the water','Throw stones to warn them','Run home without telling anyone'],
    answer:'Shout and call an adult',
    hint:'An untrained person can also drown when trying to save someone.',
    explanation:'<b>Shout for help and call an adult or emergency services</b>. Do not jump in unless you are trained — an untrained person can also drown, resulting in two casualties.' }),

  makeMCQ({ id:'g3he-saf-015', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Why should we never swim at an unguarded beach or river?',
    options:['There is no lifeguard to help','The sand there is nicer','The water is always much colder','It is only a school rule'],
    answer:'There is no lifeguard to help',
    hint:'Lifeguards are there for a reason.',
    explanation:'Unguarded beaches and rivers have <b>unpredictable currents</b> and no trained lifeguard. Swimming there is extremely dangerous even for strong swimmers.' }),

  makeTF({ id:'g3he-saf-016', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Young children should always wear a life jacket on a boat.',
    answer:true,
    explanation:'<b>True.</b> A life jacket keeps a person afloat even if they fall overboard and are unconscious. It is essential for all children on any watercraft.' }),

  makeMCQ({ id:'g3he-saf-017', chapterId:'g3he-safety', difficulty:2, subsection:'road_water_safety',
    question:'Which road safety rule applies to ALL road users (pedestrians, cyclists and drivers)?',
    options:['Obey the road signs','Only walkers obey signs','Only drivers obey signs','Cyclists may ignore lights'],
    answer:'Obey the road signs',
    hint:'All road users share responsibility.',
    explanation:'<b>All road users</b> must be aware of their surroundings, follow signs and signals, and treat others responsibly to keep roads safe.' }),

  makeMCQ({ id:'g3he-saf-018', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'What should a pedestrian do when walking at night or in low light?',
    options:['Wear bright clothing','Wear dark clothing','Walk in the road','Walk much faster'],
    answer:'Wear bright clothing',
    hint:'Visibility is key at night.',
    explanation:'At night, pedestrians should wear <b>bright or reflective clothing</b> and use a torch. This makes them visible to drivers who might otherwise not see them.' }),

  makeTF({ id:'g3he-saf-019', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'Stagnant water (like flooded areas) can be dangerous and should be avoided.',
    answer:true,
    explanation:'<b>True.</b> Flooded areas can hide deep ditches or fast currents. The water may also be contaminated with sewage and bacteria.' }),

  makeMCQ({ id:'g3he-saf-020', chapterId:'g3he-safety', difficulty:1, subsection:'road_water_safety',
    question:'When cycling, what should you always wear?',
    options:['A correctly fitted helmet','Only sunglasses','A scarf','No special equipment needed'],
    answer:'A correctly fitted helmet',
    hint:'Head injuries from cycling accidents can be fatal.',
    explanation:'A <b>correctly fitted helmet</b> is essential when cycling. It protects the skull and brain in a fall or collision.' }),

  // ── emergency_response (021–040) ──────────────────────────────────────────

  makeMCQ({ id:'g3he-saf-021', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'What is the first thing to do in any emergency situation?',
    options:['Stay calm and call an adult','Panic and run away quickly','Fix the problem by yourself','Take a photograph first'],
    answer:'Stay calm and call an adult',
    hint:'Panic makes emergencies worse.',
    explanation:'In any emergency, the first priority is to <b>stay calm and call for help</b>. Panicking prevents you from thinking clearly and acting effectively.' }),

  makeMCQ({ id:'g3he-saf-022', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'What information should you give when calling for emergency help?',
    options:['Your place and the problem','Only your first name','Only the day of the week','Your favourite school subject'],
    answer:'Your place and the problem',
    hint:'Emergency responders need to know where to go and what they are dealing with.',
    explanation:'Give <b>your location, the nature of the emergency, number of people affected and your phone number</b>. This allows emergency services to respond appropriately.' }),

  makeMCQ({ id:'g3he-saf-023', chapterId:'g3he-safety', difficulty:2, subsection:'emergency_response',
    question:'What should you do if a classmate has a deep cut that is bleeding heavily?',
    options:['Press a clean cloth on it','Pull out anything stuck in it','Wash it with any liquid','Ignore it if they feel fine'],
    answer:'Press a clean cloth on it',
    hint:'Stopping blood flow is the immediate priority.',
    explanation:'Apply <b>gentle pressure with a clean cloth</b> to slow bleeding and <b>tell a teacher immediately</b>. Do not remove objects stuck in wounds — this is for medical professionals.' }),

  makeTF({ id:'g3he-saf-024', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'It is important to know your home address in case you need to call for help.',
    answer:true,
    explanation:'<b>True.</b> Knowing your home address means you can direct emergency services to you in a crisis. All children should memorise their address and a parent\'s phone number.' }),

  makeMCQ({ id:'g3he-saf-025', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'If someone is having difficulty breathing, what should you do?',
    options:['Call for help straight away','Give them food and water','Tell them to breathe faster','Leave them alone to rest'],
    answer:'Call for help straight away',
    hint:'Breathing problems are always a medical emergency.',
    explanation:'Difficulty breathing is a medical emergency. <b>Call for help immediately</b> and keep the person calm and as still as possible until help arrives.' }),

  makeTF({ id:'g3he-saf-026', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'A first aid kit should be kept in an accessible location at home and school.',
    answer:true,
    explanation:'<b>True.</b> A readily available first aid kit enables quick treatment of minor injuries and keeps people safe while waiting for further help.' }),

  makeMCQ({ id:'g3he-saf-027', chapterId:'g3he-safety', difficulty:2, subsection:'emergency_response',
    question:'What is the correct treatment for a minor burn (not covering a large area)?',
    options:['Cool it under running water','Put butter on the burn','Pop any blisters that form','Wrap it very tightly'],
    answer:'Cool it under running water',
    hint:'Cool water removes heat from the burn.',
    explanation:'For a minor burn: <b>cool under running water for 10-20 minutes</b>, then cover with a clean, non-fluffy bandage. Never use butter, oil or toothpaste — these trap heat and cause infection.' }),

  makeMCQ({ id:'g3he-saf-028', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'What should you NEVER do when trying to help an electric shock victim?',
    options:['Grab them with your hands','Switch off the power first','Call for emergency help','Keep them warm afterwards'],
    answer:'Grab them with your hands',
    hint:'Electricity can travel through the victim to you.',
    explanation:'Never touch an electric shock victim while they are still in contact with the source — the electricity will pass through them to you. First <b>switch off the power</b>, then call for emergency help.' }),

  makeTF({ id:'g3he-saf-029', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'After any accident, it is important to tell an adult or seek medical advice, even if injuries seem minor.',
    answer:true,
    explanation:'<b>True.</b> Some injuries are not immediately apparent. A medical check ensures nothing is missed and proper treatment is given.' }),

  makeMCQ({ id:'g3he-saf-030', chapterId:'g3he-safety', difficulty:1, subsection:'emergency_response',
    question:'Learning about first aid and safety is important because:',
    options:['It helps us in an emergency','It is only useful for doctors','It is only needed abroad','It is only for grown-ups'],
    answer:'It helps us in an emergency',
    hint:'Knowledge helps us act when it matters most.',
    explanation:'First aid knowledge <b>prepares us to act calmly and correctly</b> in an emergency. Even a child\'s basic first aid response can save a life.' })

);

})();
