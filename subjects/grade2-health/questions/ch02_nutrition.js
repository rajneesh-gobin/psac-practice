'use strict';
(function () {

// Grade 2 Health Education — Food, Nutrition and Safety
// IDs: g2he-nut-001 onwards
// Subsections: food_groups, balanced_meals, food_safety

STATIC_QUESTIONS.push(

  // ── food_groups (001–025) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-001', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food group gives us energy to move and learn?',
    options:['Starchy foods (carbohydrates) like rice, bread and potatoes',
             'Oils and fats only',
             'Water only',
             'Salt and spices'],
    answer:'Starchy foods (carbohydrates) like rice, bread and potatoes',
    hint:'Think about energy foods.',
    explanation:'<b>Starchy foods (carbohydrates)</b> like rice, bread and potatoes give us energy to move, play and think.' }),

  makeMCQ({ id:'g2he-nut-002', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food group helps our muscles and body grow?',
    options:['Protein foods like meat, fish, eggs and beans',
             'Sugary drinks',
             'Crisps and chips',
             'Oil and butter'],
    answer:'Protein foods like meat, fish, eggs and beans',
    hint:'These foods help our body build and repair itself.',
    explanation:'<b>Protein foods</b> (meat, fish, eggs, beans) provide the building blocks our body needs for growth and repair.' }),

  makeMCQ({ id:'g2he-nut-003', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'What do fruits and vegetables provide for our body?',
    options:['Vitamins and minerals to keep us healthy','Only energy','Only protein','Only water'],
    answer:'Vitamins and minerals to keep us healthy',
    hint:'Think about why doctors tell us to eat our greens.',
    explanation:'Fruits and vegetables are rich in <b>vitamins and minerals</b> that keep our immune system strong and our body healthy.' }),

  makeTF({ id:'g2he-nut-004', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Dairy foods like milk, cheese and yoghurt are important for strong bones and teeth.',
    answer:true,
    explanation:'<b>True.</b> Dairy foods contain calcium which builds and maintains <b>strong bones and teeth</b>.' }),

  makeMCQ({ id:'g2he-nut-005', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_groups',
    question:'Which food group does an egg belong to?',
    options:['Protein foods','Starchy foods','Dairy foods','Fruits and vegetables'],
    answer:'Protein foods',
    hint:'Eggs come from hens — think about what eggs are used for in our body.',
    explanation:'An egg belongs to the <b>protein foods</b> group. Eggs are an excellent source of protein for growth and repair.' }),

  makeMCQ({ id:'g2he-nut-006', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food group does milk belong to?',
    options:['Dairy foods','Protein foods','Starchy foods','Fruits'],
    answer:'Dairy foods',
    hint:'Milk comes from cows — think about what it does for bones.',
    explanation:'Milk belongs to the <b>dairy foods</b> group. It provides calcium for strong bones and teeth.' }),

  makeMCQ({ id:'g2he-nut-007', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these is a legume (bean or pulse) in the protein group?',
    options:['Lentils','White bread','Apple','Rice'],
    answer:'Lentils',
    hint:'Lentils grow in pods.',
    explanation:'<b>Lentils</b> are a legume (pulse) in the protein food group. They are an excellent plant-based source of protein.' }),

  makeTF({ id:'g2he-nut-008', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'We need to eat foods from only one food group to stay healthy.',
    answer:false,
    explanation:'<b>False.</b> We need foods from <b>all food groups</b> to get a balance of nutrients. No single food gives us everything.' }),

  makeMCQ({ id:'g2he-nut-009', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_groups',
    question:'Which food group should make up the LARGEST part of our diet?',
    options:['Starchy foods (cereals, bread, rice, root crops)','Sweets and cakes','Oils and fats','Salt and condiments'],
    answer:'Starchy foods (cereals, bread, rice, root crops)',
    hint:'These foods give us the energy we need throughout the day.',
    explanation:'<b>Starchy foods</b> (rice, bread, cereals, root crops) should make up the largest portion of our diet as they provide our main energy source.' }),

  makeTF({ id:'g2he-nut-010', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Water is an essential part of a healthy diet.',
    answer:true,
    explanation:'<b>True.</b> Water is vital for every process in our body including digestion, temperature control and organ function.' }),

  // ── balanced_meals (011–030) ──────────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-011', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'What does a balanced meal include?',
    options:['Foods from several different food groups','Only one type of food','Only sweet foods','Only protein foods'],
    answer:'Foods from several different food groups',
    hint:'Balance means including different types.',
    explanation:'A <b>balanced meal</b> includes foods from different food groups to provide a variety of nutrients.' }),

  makeMCQ({ id:'g2he-nut-012', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Which of these is the most balanced meal?',
    options:['Rice, vegetables, fish and a glass of water',
             'Chips, sweets and a fizzy drink',
             'Only bread with nothing else',
             'Only a banana'],
    answer:'Rice, vegetables, fish and a glass of water',
    hint:'Think about which meal has the most variety of nutrients.',
    explanation:'<b>Rice, vegetables, fish and water</b> provides carbohydrates (rice), vitamins (vegetables), protein (fish) and hydration (water) — a truly balanced meal.' }),

  makeTF({ id:'g2he-nut-013', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Eating chips and sweets every day counts as a balanced diet.',
    answer:false,
    explanation:'<b>False.</b> Chips and sweets lack essential vitamins, minerals and proteins. They are not a balanced diet.' }),

  makeMCQ({ id:'g2he-nut-014', chapterId:'g2he-nutrition', difficulty:2, subsection:'balanced_meals',
    question:'Priya eats only rice and bread every day. What is missing from her diet?',
    options:['Fruits, vegetables and protein foods','She is missing sweet foods','She needs more oil','She needs more starchy food'],
    answer:'Fruits, vegetables and protein foods',
    hint:'Rice and bread provide carbohydrates — what else does the body need?',
    explanation:'Priya is missing <b>fruits, vegetables (vitamins/minerals) and protein foods (for growth)</b>. A balanced diet needs all food groups.' }),

  makeMCQ({ id:'g2he-nut-015', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'How much water should we drink each day?',
    options:['About 6 to 8 glasses','Only when we feel thirsty','Only during meals','Just one glass in the morning'],
    answer:'About 6 to 8 glasses',
    hint:'Our body needs a steady supply of water throughout the day.',
    explanation:'We should drink about <b>6 to 8 glasses of water</b> each day to stay hydrated and keep our body working well.' }),

  makeTF({ id:'g2he-nut-016', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Breakfast is the most important meal of the day.',
    answer:true,
    explanation:'<b>True.</b> After sleeping, our body needs energy. Breakfast provides nutrients and energy to start the day well.' }),

  makeMCQ({ id:'g2he-nut-017', chapterId:'g2he-nutrition', difficulty:2, subsection:'balanced_meals',
    question:'A good balanced breakfast would be:',
    options:['Oats with milk and a piece of fruit','Sweets and a fizzy drink','Only a cup of sweet tea','Chips left over from last night'],
    answer:'Oats with milk and a piece of fruit',
    hint:'Think about which has the most nutritional variety.',
    explanation:'<b>Oats with milk and fruit</b> provides carbohydrates (oats), calcium (milk) and vitamins (fruit) — a nutritious balanced breakfast.' }),

  makeMCQ({ id:'g2he-nut-018', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Eating too much sugar can lead to:',
    options:['Tooth decay, obesity and health problems','Stronger teeth','Better eyesight','More energy all the time'],
    answer:'Tooth decay, obesity and health problems',
    hint:'Think about what too much sugar does to the body over time.',
    explanation:'Eating too much sugar causes <b>tooth decay, obesity and serious health problems</b> like diabetes over time.' }),

  makeTF({ id:'g2he-nut-019', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'We can replace water with fizzy drinks and still stay healthy.',
    answer:false,
    explanation:'<b>False.</b> Fizzy drinks contain sugar and acids that damage teeth and contribute to health problems. <b>Water is the best choice</b>.' }),

  makeMCQ({ id:'g2he-nut-020', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'What should you do if you are not hungry at lunch?',
    options:['Try to eat a small amount — your body still needs fuel',
             'Skip the meal completely',
             'Eat only sweets instead',
             'Drink only fizzy drinks'],
    answer:'Try to eat a small amount — your body still needs fuel',
    hint:'Our body needs nutrients even when we do not feel very hungry.',
    explanation:'Even if not very hungry, try to eat <b>a small balanced amount</b>. Your body still needs energy and nutrients to function.' }),

  // ── food_safety (021–040) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-021', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Why should you wash your hands before preparing food?',
    options:['To prevent germs from getting into the food','To make the food taste better','To make your hands softer','To cook faster'],
    answer:'To prevent germs from getting into the food',
    hint:'Think about what happens when germs get into food.',
    explanation:'Washing hands before handling food prevents <b>germs transferring into food</b> which could cause food poisoning.' }),

  makeMCQ({ id:'g2he-nut-022', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Food that has gone bad (spoiled) will often:',
    options:['Smell bad, look different or have mould on it','Look exactly the same as fresh food','Taste sweeter than fresh food','Be fine to eat if heated'],
    answer:'Smell bad, look different or have mould on it',
    hint:'Our senses help us detect spoiled food.',
    explanation:'Spoiled food often <b>smells bad, looks different (discoloured or slimy) or has mould</b> growing on it. Never eat food that seems spoiled.' }),

  makeTF({ id:'g2he-nut-023', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'We should wash fruits and vegetables before eating or cooking them.',
    answer:true,
    explanation:'<b>True.</b> Fruits and vegetables can carry dirt, pesticides and germs. Washing them removes these before eating.' }),

  makeMCQ({ id:'g2he-nut-024', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_safety',
    question:'Ravi finds leftover chicken that has been in the sun all afternoon. He is hungry. Should he eat it?',
    options:['No — it may have grown dangerous bacteria in the heat',
             'Yes — it is still fine because it was cooked',
             'Yes — if he heats it for 10 seconds',
             'Yes — because chicken never goes bad'],
    answer:'No — it may have grown dangerous bacteria in the heat',
    hint:'Food left in the heat grows bacteria quickly.',
    explanation:'<b>No</b> — food left in warm temperatures for hours grows dangerous bacteria. Eating it could cause serious food poisoning.' }),

  makeTF({ id:'g2he-nut-025', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Cooked food should be covered and stored properly to keep it safe.',
    answer:true,
    explanation:'<b>True.</b> Covering and storing food properly prevents insects, dust and bacteria from contaminating it.' }),

  makeMCQ({ id:'g2he-nut-026', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Why should we cover food when it is not being eaten?',
    options:['To prevent insects, dust and germs from landing on it',
             'To keep it warm always',
             'To make it taste better',
             'So that no one can see it'],
    answer:'To prevent insects, dust and germs from landing on it',
    hint:'Think about what lands on uncovered food.',
    explanation:'Covering food <b>prevents insects, dust and airborne germs</b> from contaminating it.' }),

  makeMCQ({ id:'g2he-nut-027', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Which of these makes food unsafe to eat?',
    options:['Leaving it uncovered in the heat for many hours',
             'Putting it in the refrigerator',
             'Cooking it thoroughly',
             'Washing it with clean water'],
    answer:'Leaving it uncovered in the heat for many hours',
    hint:'Heat and time let bacteria multiply.',
    explanation:'Leaving food uncovered in the heat allows bacteria to <b>multiply rapidly</b>, making the food unsafe to eat.' }),

  makeTF({ id:'g2he-nut-028', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'We should use clean plates and utensils when eating.',
    answer:true,
    explanation:'<b>True.</b> Dirty plates and utensils carry germs that can contaminate food and cause illness.' }),

  makeMCQ({ id:'g2he-nut-029', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'If food smells bad or has mould on it, you should:',
    options:['Throw it away and do not eat it','Scrape off the mould and eat the rest','Heat it and eat it','Share it with someone else'],
    answer:'Throw it away and do not eat it',
    hint:'Mould means the food has gone bad.',
    explanation:'<b>Throw away</b> any food that smells bad or has mould. Even if mould is scraped off, the toxins can remain throughout the food.' }),

  makeTF({ id:'g2he-nut-030', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Storing food in a refrigerator helps to keep it fresh for longer.',
    answer:true,
    explanation:'<b>True.</b> Cold temperatures slow down bacterial growth, keeping food fresh and safe for longer.' })

);

})();
