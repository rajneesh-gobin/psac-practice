'use strict';
(function () {

// Grade 2 Health Education — Keeping Safe
// IDs: g2he-saf-001 onwards
// Subsections: home_safety, road_safety, first_aid_basics

STATIC_QUESTIONS.push(

  // ── home_safety (001–025) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-001', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Which of these is a hazard (danger) in the kitchen?',
    options:['A pot of boiling water','A closed refrigerator','A full glass of water','A jar with a lid on'],
    answer:'A pot of boiling water',
    hint:'Think about heat and sharp objects.',
    explanation:'A <b>hot stove with boiling water</b> is a kitchen hazard — it can cause serious burns. Children should always have adult supervision in the kitchen.' }),

  makeTF({ id:'g2he-saf-002', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Children should never handle sharp knives without adult supervision.',
    answer:true,
    explanation:'<b>True.</b> Sharp knives can cause serious cuts. Children should only use them with an adult present and supervising.' }),

  makeMCQ({ id:'g2he-saf-003', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if you find a bottle of bleach or cleaning fluid at home?',
    options:['Leave it and tell an adult','Smell it to see what it is','Open it to see inside','Share it with a friend'],
    answer:'Leave it and tell an adult',
    hint:'Cleaning products are chemicals and can be dangerous.',
    explanation:'<b>Leave it and tell an adult</b>. Cleaning products like bleach are dangerous chemicals that can burn skin and eyes.' }),

  makeMCQ({ id:'g2he-saf-004', chapterId:'g2he-safety', difficulty:2, subsection:'home_safety',
    question:'Sam sees a frayed (damaged) electrical cord on the floor. What should he do?',
    options:['Tell an adult at once','Step over it carefully','Move it to another room','Tape it up himself'],
    answer:'Tell an adult at once',
    hint:'Damaged electrical cords are extremely dangerous.',
    explanation:'A frayed cord can cause <b>electric shock or fire</b>. Sam should tell an adult immediately and not touch it.' }),

  makeTF({ id:'g2he-saf-005', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'It is safe to put any object into an electrical socket.',
    answer:false,
    explanation:'<b>False.</b> Only approved electrical plugs should go into sockets. Anything else can cause a deadly electric shock.' }),

  makeMCQ({ id:'g2he-saf-006', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Why should medicines be kept out of children\'s reach?',
    options:['They can be dangerous','They taste rather bad','They are very expensive','Children dislike them'],
    answer:'They can be dangerous',
    hint:'The wrong dose or wrong medicine can harm a child.',
    explanation:'Medicines are designed for specific people in specific doses. Taking the <b>wrong medicine or wrong amount can be deadly</b> for a child.' }),

  makeMCQ({ id:'g2he-saf-007', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if there is a fire at home?',
    options:['Get out and call for help','Put water on it from a cup','Hide under your bed','Open all the windows'],
    answer:'Get out and call for help',
    hint:'Your safety is the priority in a fire.',
    explanation:'In a fire, <b>get out immediately</b> and call for help. Do not stop to collect belongings. Never hide — fires produce deadly smoke.' }),

  makeTF({ id:'g2he-saf-008', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Wet floors can cause slipping and falling.',
    answer:true,
    explanation:'<b>True.</b> Wet, slippery floors are a common cause of accidents at home. Wipe up spills immediately.' }),

  makeMCQ({ id:'g2he-saf-009', chapterId:'g2he-safety', difficulty:2, subsection:'home_safety',
    question:'Maria\'s little brother reaches for the pot of hot soup on the stove. What should Maria do?',
    options:['Calmly move him away and call an adult',
             'Let him touch it so he learns a lesson',
             'Shout at him and walk away',
             'Give him a spoon to stir it'],
    answer:'Calmly move him away and call an adult',
    hint:'Young children do not understand danger yet.',
    explanation:'Maria should <b>calmly move him away from the danger</b> and call an adult. Hot soup can cause severe burns.' }),

  makeTF({ id:'g2he-saf-010', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Children should always have adult supervision when bathing young children.',
    answer:true,
    explanation:'<b>True.</b> Young children can drown in even a small amount of water. Adult supervision is always required.' }),

  // ── road_safety (011–030) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-011', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Before crossing the road, you should:',
    options:['Stop, look and listen','Run across without looking','Look at your phone','Look only one way'],
    answer:'Stop, look and listen',
    hint:'The Green Cross Code keeps us safe.',
    explanation:'Always <b>Stop → Look left → Look right → Look left again → Cross when safe</b>. Look left twice as vehicles on the left are closest first.' }),

  makeMCQ({ id:'g2he-saf-012', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Where is the safest place to cross the road?',
    options:['At a marked crossing','Between parked cars','Behind a lorry or bus','Anywhere while running'],
    answer:'At a marked crossing',
    hint:'Marked crossings are where drivers expect people.',
    explanation:'Always use a <b>marked pedestrian crossing</b> where drivers expect people and it is safer to cross.' }),

  makeTF({ id:'g2he-saf-013', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'We should walk on the pavement (footpath) and not on the road.',
    answer:true,
    explanation:'<b>True.</b> The pavement (footpath) is for pedestrians. Walking on the road is dangerous.' }),

  makeMCQ({ id:'g2he-saf-014', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Why should you NOT play near the road?',
    options:['A ball may roll into it','The road is too hard','The road is always wet','It is boring near roads'],
    answer:'A ball may roll into it',
    hint:'Think about how easily someone could step onto the road.',
    explanation:'Playing near the road is dangerous because a <b>ball or child could easily end up in the road</b> and be hit by a vehicle.' }),

  makeMCQ({ id:'g2he-saf-015', chapterId:'g2he-safety', difficulty:2, subsection:'road_safety',
    question:'You are walking home and need to cross a road with no pedestrian crossing. What should you do?',
    options:['Wait for a safe gap','Run across very fast','Cross behind a parked car','Wave at drivers to stop'],
    answer:'Wait for a safe gap',
    hint:'Even without a crossing, there is a safe way.',
    explanation:'If there is no crossing, <b>stand on the pavement, look carefully both ways</b> and cross only when there are no vehicles approaching.' }),

  makeTF({ id:'g2he-saf-016', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Wearing bright or reflective clothing helps drivers see you in low light.',
    answer:true,
    explanation:'<b>True.</b> Bright or reflective colours make pedestrians more visible to drivers, especially in the early morning or evening.' }),

  makeMCQ({ id:'g2he-saf-017', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Should you look at your phone while crossing the road?',
    options:['No, watch the traffic','Yes, if almost across','Yes, if it is important','Yes, if you walk fast'],
    answer:'No, watch the traffic',
    hint:'Distracted walking causes accidents.',
    explanation:'<b>No</b> — using your phone while crossing is very dangerous. You need your full attention on traffic at all times.' }),

  makeMCQ({ id:'g2he-saf-018', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'When travelling in a car, what should every passenger always wear?',
    options:['A seatbelt','A helmet','A hat','Sunglasses'],
    answer:'A seatbelt',
    hint:'This is a legal requirement and protects you in a crash.',
    explanation:'Every passenger must wear a <b>seatbelt</b>. In an accident, a seatbelt can save your life by preventing you from being thrown forward.' }),

  makeTF({ id:'g2he-saf-019', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'It is safe to stand in the back of an open truck or lorry while it is moving.',
    answer:false,
    explanation:'<b>False.</b> Standing in an open vehicle is extremely dangerous. A sudden stop or turn could throw you out.' }),

  makeMCQ({ id:'g2he-saf-020', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'If you are riding a bicycle, what should you wear to protect your head?',
    options:['A helmet','A hat','A scarf','Sunglasses'],
    answer:'A helmet',
    hint:'This protects the most important part of your body in a fall.',
    explanation:'A <b>helmet</b> protects your head in a fall and can prevent serious brain injury.' }),

  // ── first_aid_basics (021–035) ────────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-021', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If someone falls and gets a small cut, what should you do FIRST?',
    options:['Tell an adult','Put soil on it','Blow on it only','Leave it alone'],
    answer:'Tell an adult',
    hint:'Dirt in a wound can cause infection.',
    explanation:'First, <b>tell an adult</b>. Then gently <b>clean the wound with clean water</b> to remove dirt and prevent infection.' }),

  makeMCQ({ id:'g2he-saf-022', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If someone is unconscious (not responding), what is the FIRST thing to do?',
    options:['Call an adult at once','Give them a drink','Shake them very hard','Leave them alone'],
    answer:'Call an adult at once',
    hint:'An unconscious person needs professional help urgently.',
    explanation:'<b>Call for an adult or emergency services immediately</b>. An unconscious person needs urgent professional medical help.' }),

  makeTF({ id:'g2he-saf-023', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'You should never give a sick or injured person food or drink without medical advice.',
    answer:true,
    explanation:'<b>True.</b> Giving food or drink to an injured or unconscious person can be dangerous and may interfere with medical treatment.' }),

  makeMCQ({ id:'g2he-saf-024', chapterId:'g2he-safety', difficulty:2, subsection:'first_aid_basics',
    question:'Priya touches a hot iron and burns her hand. What should she do immediately?',
    options:['Run cold water on it','Put butter on it','Wrap it up tightly','Go to sleep instead'],
    answer:'Run cold water on it',
    hint:'Cool water soothes a burn and stops the heat damaging more tissue.',
    explanation:'Run <b>cool (not ice cold) water over a burn for 10-20 minutes</b>. This removes heat and relieves pain. Then tell an adult. Never use butter, oil or toothpaste.' }),

  makeMCQ({ id:'g2he-saf-025', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What is the purpose of a first aid kit?',
    options:['To treat small injuries','To store our lunch','To carry school books','To hold drinking water'],
    answer:'To treat small injuries',
    hint:'Think about what is kept in a first aid box.',
    explanation:'A <b>first aid kit</b> contains basic supplies (plasters, antiseptic, bandages) to treat minor injuries quickly before getting medical help.' }),

  makeTF({ id:'g2he-saf-026', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Every school and home should have a first aid kit in an accessible place.',
    answer:true,
    explanation:'<b>True.</b> A first aid kit in an accessible place allows quick response to minor injuries and emergencies.' }),

  makeMCQ({ id:'g2he-saf-027', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'When should you call emergency services?',
    options:['When someone is badly hurt','When you want the weather','When you lose a toy','When you feel a bit tired'],
    answer:'When someone is badly hurt',
    hint:'Emergency services are for life-threatening situations.',
    explanation:'Call emergency services when someone is <b>seriously injured, unconscious, having difficulty breathing, or in immediate danger</b>.' }),

  makeTF({ id:'g2he-saf-028', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'You should always tell an adult if you or a friend is injured, even if it seems minor.',
    answer:true,
    explanation:'<b>True.</b> Even small injuries should be shown to an adult. What looks minor might need proper cleaning or treatment to prevent infection.' }),

  makeMCQ({ id:'g2he-saf-029', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What should you do if you or someone else is choking?',
    options:['Call an adult at once','Give them a drink','Wait and see','Tell them to lie down'],
    answer:'Call an adult at once',
    hint:'Choking can be life-threatening.',
    explanation:'Choking is an emergency. <b>Call for an adult or emergency services immediately</b> — someone trained can perform first aid.' }),

  makeTF({ id:'g2he-saf-030', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Knowing basic safety rules and first aid helps us to protect ourselves and others.',
    answer:true,
    explanation:'<b>True.</b> Knowledge of safety rules and basic first aid helps us respond calmly and correctly in an emergency, potentially saving lives.' })

);

})();
