'use strict';
(function () {

// Grade 3 Health Education — Nutrition and Healthy Eating
// IDs: g3he-nut-001 onwards
// Subsections: nutrients, food_energy, water_diet

STATIC_QUESTIONS.push(

  // ── nutrients (001–025) ───────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-001', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'What are nutrients?',
    options:['Useful parts of food','Types of body exercise','Names of food shops','Parts of the water cycle'],
    answer:'Useful parts of food',
    hint:'Think about what food actually does for our body.',
    explanation:'<b>Nutrients</b> are substances found in food that our body uses to grow, produce energy, repair itself and stay healthy.' }),

  makeMCQ({ id:'g3he-nut-002', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Which nutrient provides our body with the most energy?',
    options:['Carbohydrates','Vitamins','Minerals','Salt and water'],
    answer:'Carbohydrates',
    hint:'Think about energy-giving foods like bread and rice.',
    explanation:'<b>Carbohydrates</b> are the body\'s main source of energy. Foods like rice, bread, pasta and potatoes are rich in carbohydrates.' }),

  makeMCQ({ id:'g3he-nut-003', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Which nutrient is most important for building and repairing our body?',
    options:['Protein','Carbohydrates','Fat','Vitamin C'],
    answer:'Protein',
    hint:'This nutrient is the building block of muscles and tissues.',
    explanation:'<b>Protein</b> is essential for growth, building muscles and repairing damaged tissues. Good sources include meat, fish, eggs, beans and dairy.' }),

  makeTF({ id:'g3he-nut-004', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Fat is a nutrient the body needs for energy and to absorb certain vitamins.',
    answer:true,
    explanation:'<b>True.</b> Fat provides energy and helps absorb vitamins A, D, E and K. Healthy fats are found in nuts, fish, avocado and plant oils.' }),

  makeMCQ({ id:'g3he-nut-005', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'What do vitamins do for our body?',
    options:['Help us fight disease','Give us most energy','Build muscle only','Replace our water'],
    answer:'Help us fight disease',
    hint:'There are many vitamins (A, B, C, D…) each with different roles.',
    explanation:'<b>Vitamins</b> perform many functions — Vitamin C helps fight infection and heal wounds, Vitamin A helps eyesight, Vitamin D helps bone health.' }),

  makeMCQ({ id:'g3he-nut-006', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Which mineral is essential for strong bones and teeth?',
    options:['Calcium','Iron','Sodium','Zinc'],
    answer:'Calcium',
    hint:'This mineral is found in dairy products.',
    explanation:'<b>Calcium</b> is essential for building and maintaining strong bones and teeth. Good sources include milk, cheese, yoghurt and green vegetables.' }),

  makeMCQ({ id:'g3he-nut-007', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'Which vitamin is produced when our skin is exposed to sunlight?',
    options:['Vitamin D','Vitamin C','Vitamin A','Vitamin B12'],
    answer:'Vitamin D',
    hint:'This vitamin is unique because our body can make it.',
    explanation:'Our skin produces <b>Vitamin D</b> when exposed to sunlight. It helps the body absorb calcium for strong bones.' }),

  makeMCQ({ id:'g3he-nut-008', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Iron is a mineral that helps our body to:',
    options:['Make red blood cells','Digest carbohydrates','Build strong bones','Cool the body down'],
    answer:'Make red blood cells',
    hint:'Think about blood and oxygen transport.',
    explanation:'<b>Iron</b> is used to make haemoglobin in red blood cells, which carries oxygen from the lungs to all parts of the body. Sources include meat, beans and leafy greens.' }),

  makeTF({ id:'g3he-nut-009', chapterId:'g3he-nutrition', difficulty:1, subsection:'nutrients',
    question:'Fibre (found in fruits, vegetables and whole grains) helps our digestive system work properly.',
    answer:true,
    explanation:'<b>True.</b> Dietary fibre helps move food through the digestive system, preventing constipation and supporting gut health.' }),

  makeMCQ({ id:'g3he-nut-010', chapterId:'g3he-nutrition', difficulty:2, subsection:'nutrients',
    question:'A child who does not eat enough Vitamin C might:',
    options:['Heal cuts more slowly','Grow taller quickly','Have more energy','Have stronger bones'],
    answer:'Heal cuts more slowly',
    hint:'Vitamin C supports the immune system and wound healing.',
    explanation:'<b>Vitamin C deficiency</b> weakens the immune system and slows healing. It can lead to a condition called scurvy. Good sources: citrus fruits, guava, tomatoes.' }),

  // ── food_energy (011–030) ─────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-011', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which foods give us energy (energy foods)?',
    options:['Rice, bread, potatoes','Water and fresh air','Salt and vinegar','Vitamin tablets'],
    answer:'Rice, bread, potatoes',
    hint:'Think about the main food at most Mauritian meals.',
    explanation:'<b>Starchy foods (carbohydrates)</b> like rice, bread, potatoes, pasta and roti are our main energy foods. They fuel our muscles and brain.' }),

  makeMCQ({ id:'g3he-nut-012', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which foods help our body grow (body-building foods)?',
    options:['Meat, fish, beans','Sweets and crisps','Oil and butter','Sugary drinks'],
    answer:'Meat, fish, beans',
    hint:'Think about what builds muscles and tissues.',
    explanation:'<b>Protein-rich foods</b> (meat, fish, eggs, beans, lentils, dairy) are body-building foods. They help us grow taller, build muscles and repair tissues.' }),

  makeMCQ({ id:'g3he-nut-013', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which foods protect us from disease and keep us healthy (protective foods)?',
    options:['Fruits and vegetables','Sweets and chocolate','White bread and butter','Chips and fried food'],
    answer:'Fruits and vegetables',
    hint:'These foods are rich in vitamins and minerals.',
    explanation:'<b>Fruits and vegetables</b> are protective foods. Their vitamins and minerals boost our immune system, protecting us from illness and disease.' }),

  makeMCQ({ id:'g3he-nut-014', chapterId:'g3he-nutrition', difficulty:2, subsection:'food_energy',
    question:'A school child needs energy, growth and protection from disease. Which meal best provides all three?',
    options:['Roti, dhal and spinach','White rice and salt','Chips and a fizzy drink','Bread and butter only'],
    answer:'Roti, dhal and spinach',
    hint:'Which meal has starchy food, protein and vegetables?',
    explanation:'<b>Roti (energy), lentils (protein/growth), spinach (vitamins/protection) and milk (calcium)</b> together provide energy, growth and protection — a balanced meal.' }),

  makeTF({ id:'g3he-nut-015', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Children need more energy from food than adults because they are growing and very active.',
    answer:true,
    explanation:'<b>True.</b> Growing children need proportionally more energy and nutrients because their bodies are developing rapidly and they are physically active.' }),

  makeMCQ({ id:'g3he-nut-016', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which of these is a local Mauritian food in the energy (starchy) group?',
    options:['Dholl puri','A chocolate bar','A fizzy drink','An ice cream'],
    answer:'Dholl puri',
    hint:'Think about flour-based Mauritian foods.',
    explanation:'<b>Dholl puri</b> (roti with yellow split pea filling) is a traditional Mauritian street food — the roti provides carbohydrate energy and the dhal provides protein.' }),

  makeTF({ id:'g3he-nut-017', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Eating a variety of fruits and vegetables every day helps protect us from getting sick.',
    answer:true,
    explanation:'<b>True.</b> Different fruits and vegetables provide different vitamins and minerals. Eating a wide variety provides the full range of protective nutrients.' }),

  makeMCQ({ id:'g3he-nut-018', chapterId:'g3he-nutrition', difficulty:2, subsection:'food_energy',
    question:'Arjun eats only rice and no vegetables or protein foods. What health problem might he face?',
    options:['Poor growth','Faster growth','Stronger bones','Better eyesight'],
    answer:'Poor growth',
    hint:'What does rice alone NOT provide?',
    explanation:'Arjun may suffer <b>malnutrition</b>. Rice provides energy (carbohydrates) but without protein, vitamins and minerals, growth is stunted and immunity weakened.' }),

  makeMCQ({ id:'g3he-nut-019', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Which of these is a healthy protein-rich Mauritian food?',
    options:['Grilled fish','Chips (fried potatoes)','Fizzy drink','Plain white sugar'],
    answer:'Grilled fish',
    hint:'Fish is an excellent source of a key nutrient for growth.',
    explanation:'<b>Grilled fish</b> is an excellent protein food common in Mauritius. Fish also provides healthy omega-3 fats for brain development.' }),

  makeTF({ id:'g3he-nut-020', chapterId:'g3he-nutrition', difficulty:1, subsection:'food_energy',
    question:'Sugary and fatty foods should form a large part of our daily diet.',
    answer:false,
    explanation:'<b>False.</b> Sugary and fatty foods should be eaten only <b>occasionally and in small amounts</b>. Too much causes obesity, tooth decay and other health problems.' }),

  // ── water_diet (021–040) ──────────────────────────────────────────────────

  makeMCQ({ id:'g3he-nut-021', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Why is water essential for our body?',
    options:['It carries nutrients and waste','It only stops us feeling thirsty','It only helps us to sleep','It only keeps us cool'],
    answer:'It carries nutrients and waste',
    hint:'Water has many roles in the body.',
    explanation:'Water makes up about <b>60-70% of our body</b>. It transports nutrients to cells, removes waste products, regulates body temperature and supports every body function.' }),

  makeMCQ({ id:'g3he-nut-022', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'What is dehydration?',
    options:['Not enough water in the body','Too much food in the body','Too much sleep at night','Too little exercise each day'],
    answer:'Not enough water in the body',
    hint:'The prefix "de-" means removal of.',
    explanation:'<b>Dehydration</b> occurs when the body loses more water than it takes in, causing headaches, tiredness, dizziness and poor concentration.' }),

  makeTF({ id:'g3he-nut-023', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'We lose water through sweating, breathing and going to the toilet, so we must replace it by drinking regularly.',
    answer:true,
    explanation:'<b>True.</b> Our body constantly loses water. We must replace it by drinking enough water throughout the day — about 6-8 glasses for a child.' }),

  makeMCQ({ id:'g3he-nut-024', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'Priya has been playing sport in the sun and feels dizzy and has a headache. What is most likely wrong?',
    options:['She is dehydrated','She has eaten too much','She has slept too long','She is growing taller'],
    answer:'She is dehydrated',
    hint:'Exercise and heat cause water loss through sweat.',
    explanation:'The symptoms (dizziness, headache) after exercise in the sun strongly suggest <b>dehydration</b>. Priya needs to drink water slowly and rest in a cool place.' }),

  makeMCQ({ id:'g3he-nut-025', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'What is a balanced diet?',
    options:['Food from all food groups','Only fruit at every meal','The same food every day','As much food as possible'],
    answer:'Food from all food groups',
    hint:'Balance means including everything in the right proportion.',
    explanation:'A <b>balanced diet</b> includes the right amounts from all food groups — carbohydrates, proteins, fats, vitamins, minerals and water — to meet the body\'s needs.' }),

  makeMCQ({ id:'g3he-nut-026', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'How much water should a primary school child drink each day?',
    options:['About 6-8 glasses','About 1 small glass','About 20 glasses','About 40 glasses'],
    answer:'About 6-8 glasses',
    hint:'Our body needs a steady supply throughout the day.',
    explanation:'Primary school children should drink about <b>6-8 glasses (1.5-2 litres) of water per day</b>. More is needed when exercising or in hot weather.' }),

  makeTF({ id:'g3he-nut-027', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Sugary drinks like cola and fruit squash can replace water as our main drink.',
    answer:false,
    explanation:'<b>False.</b> Sugary drinks cause tooth decay, add unnecessary calories and do not hydrate as effectively as water. <b>Water is the best choice.</b>' }),

  makeMCQ({ id:'g3he-nut-028', chapterId:'g3he-nutrition', difficulty:2, subsection:'water_diet',
    question:'Which combination represents a truly balanced meal?',
    options:['Rice, chicken and vegetables','Bread with butter only','Chips, cola and chocolate','A large bowl of sweet cereal'],
    answer:'Rice, chicken and vegetables',
    hint:'Think: energy food + protein + vitamins + hydration.',
    explanation:'<b>Brown rice (energy), chicken (protein), vegetables (vitamins/minerals) and water (hydration)</b> together represent all the components of a balanced meal.' }),

  makeTF({ id:'g3he-nut-029', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'A balanced diet helps us maintain a healthy body weight, have energy and stay protected from disease.',
    answer:true,
    explanation:'<b>True.</b> A balanced diet provides all necessary nutrients to maintain healthy weight, sustain energy levels and support the immune system.' }),

  makeMCQ({ id:'g3he-nut-030', chapterId:'g3he-nutrition', difficulty:1, subsection:'water_diet',
    question:'Which of these is the BEST drink to have with every meal?',
    options:['Water','Fizzy cola','Sugary fruit juice','Energy drink'],
    answer:'Water',
    hint:'The healthiest drink has no added sugar or chemicals.',
    explanation:'<b>Water</b> is the best drink with every meal. It aids digestion, provides hydration and has no sugar, artificial colours or additives.' })

);

})();
