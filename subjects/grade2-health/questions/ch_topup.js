'use strict';
(function () {

// Grade 2 Health Education — topup questions to bring all subsections to 20+
// Continuing IDs from ch01, ch02, ch03
// ⚠ 031-060, not 011-040. Those three files each hold 001-030, so the first
//   twenty ids here collided with them - 60 duplicates, which the importer
//   preflight rejects fail-closed for the WHOLE corpus, and which let one
//   exam paper deal the same id twice.

STATIC_QUESTIONS.push(

  // ── grooming topup (031-040) ──────────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-031', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'What should you do after playing sport or running around?',
    options:['Wash and change into clean clothes','Eat extra food only','Go straight to sleep','Not wash because exercise is healthy'],
    answer:'Wash and change into clean clothes',
    explanation:'Exercise causes sweating. <b>Washing and changing</b> afterwards removes sweat and bacteria, keeping skin healthy and odour-free.' }),

  makeTF({ id:'g2he-hyg-032', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Wearing clothes that smell of sweat is not good for our health or relationships with others.',
    answer:true,
    explanation:'<b>True.</b> Sweat-soaked clothing harbours bacteria and causes body odour. Clean clothes support personal hygiene and positive social interactions.' }),

  makeMCQ({ id:'g2he-hyg-033', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'How should we keep our school uniform?',
    options:['Clean, ironed and worn correctly','Dirty and crumpled — it doesn\'t matter','Only clean on exam days','Always the same without washing'],
    answer:'Clean, ironed and worn correctly',
    explanation:'Keeping our uniform <b>clean and neat</b> is part of good grooming and shows respect for ourselves and our school.' }),

  makeMCQ({ id:'g2he-hyg-034', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Why should we wash our feet every day?',
    options:['Feet sweat inside shoes','Feet stay clean in shoes','Only hands get dirty','Feet never need washing'],
    answer:'Feet sweat inside shoes',
    explanation:'Feet sweat inside shoes all day. Washing them daily prevents <b>bacteria build-up, foot odour and fungal infections</b>.' }),

  makeTF({ id:'g2he-hyg-035', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Using a clean comb or brush (not sharing one) helps prevent the spread of head lice.',
    answer:true,
    explanation:'<b>True.</b> Head lice spread through shared combs and brushes. Using your own keeps your hair free from lice.' }),

  makeMCQ({ id:'g2he-hyg-036', chapterId:'g2he-hygiene', difficulty:2, subsection:'grooming',
    question:'Sam notices he has bad breath after eating garlic bread. What should he do?',
    options:['Brush and rinse his mouth','Nothing, it is natural','Eat some more garlic','Avoid talking to people'],
    answer:'Brush and rinse his mouth',
    explanation:'Brushing teeth and tongue and <b>rinsing the mouth</b> removes food particles and bacteria that cause bad breath (halitosis).' }),

  makeTF({ id:'g2he-hyg-037', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Changing bed sheets regularly helps keep skin clean and prevents skin problems.',
    answer:true,
    explanation:'<b>True.</b> Bed sheets collect sweat, dead skin and dust mites. Clean sheets reduce skin irritation and keep the sleeping environment hygienic.' }),

  makeMCQ({ id:'g2he-hyg-038', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Why should we cover cuts or sores before going to school?',
    options:['To keep germs out','To look tidy only','Only if a teacher asks','Cuts never need covers'],
    answer:'To keep germs out',
    explanation:'Covering wounds with a clean plaster or bandage <b>protects the wound from germs</b> and prevents blood or fluid from spreading to others.' }),

  makeTF({ id:'g2he-hyg-039', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Good grooming includes keeping our shoes clean and in good repair.',
    answer:true,
    explanation:'<b>True.</b> Clean, well-maintained shoes are part of overall personal presentation and prevent foot problems from worn or dirty footwear.' }),

  makeMCQ({ id:'g2he-hyg-040', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Which grooming habit helps protect us from the hot Mauritian sun?',
    options:['Wearing a hat outdoors','Never going outside','Wearing a thick coat','Rubbing sand on skin'],
    answer:'Wearing a hat outdoors',
    explanation:'The Mauritian sun is very strong. <b>Wearing a hat and using sunscreen</b> protects the skin from sunburn and long-term sun damage.' }),

  // ── hand_dental topup (041-050) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-041', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'How long should you wash your hands to kill most germs?',
    options:['At least 20 seconds','About 5 seconds','A quick rinse only','Until they look clean'],
    answer:'At least 20 seconds',
    explanation:'Washing for <b>at least 20 seconds</b> with soap creates enough friction to remove most germs. A quick rinse does not.' }),

  makeTF({ id:'g2he-hyg-042', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'The gaps between our teeth also need cleaning — that is why we brush in circles.',
    answer:true,
    explanation:'<b>True.</b> Plaque and food collect between teeth. Circular brushing strokes clean all surfaces — the front, back, chewing surfaces and between teeth.' }),

  makeMCQ({ id:'g2he-hyg-043', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'When we wash hands, which part should we scrub carefully?',
    options:['Every part of the hand','Only the palms','Only the fingertips','Only the back of them'],
    answer:'Every part of the hand',
    explanation:'Germs hide on <b>all surfaces and under nails</b>. Thorough hand washing covers palms, backs, between fingers and beneath nails.' }),

  makeTF({ id:'g2he-hyg-044', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'We should visit a dentist for check-ups even if our teeth don\'t hurt.',
    answer:true,
    explanation:'<b>True.</b> A dentist can spot tooth decay early, before it causes pain. Regular check-ups prevent small problems from becoming big painful ones.' }),

  makeMCQ({ id:'g2he-hyg-045', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'What does brushing the tongue help to prevent?',
    options:['Bad breath','Tooth pain','Stomach upset','Sore eyes'],
    answer:'Bad breath',
    explanation:'Bacteria live on the tongue and produce bad-smelling gases. <b>Gently brushing the tongue</b> removes these bacteria and freshens breath.' }),

  makeMCQ({ id:'g2he-hyg-046', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Is it safe to share a toothbrush with a sibling?',
    options:['No, it spreads germs','Yes, toothpaste kills germs','Yes, if you rinse it','Yes, families always share'],
    answer:'No, it spreads germs',
    explanation:'<b>Never share a toothbrush.</b> It transfers bacteria and viruses — including those that cause gum disease and infections.' }),

  makeTF({ id:'g2he-hyg-047', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Using too much toothpaste (like filling the whole brush) is wasteful and can upset the stomach if swallowed.',
    answer:true,
    explanation:'<b>True.</b> A pea-sized amount is enough. Excess fluoride toothpaste swallowed regularly can cause a condition called fluorosis in children.' }),

  makeMCQ({ id:'g2he-hyg-048', chapterId:'g2he-hygiene', difficulty:2, subsection:'hand_dental',
    question:'Amina ate a banana at break time and does not have a toothbrush. What is the best thing she can do?',
    options:['Rinse her mouth with water','Eat more food afterwards','Do nothing at all today','Chew on a pen cap'],
    answer:'Rinse her mouth with water',
    explanation:'When brushing is not possible, <b>rinsing the mouth with water</b> washes away sugar and food particles, reducing the risk of tooth decay.' }),

  makeTF({ id:'g2he-hyg-049', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Baby teeth (milk teeth) are important to care for even though they fall out.',
    answer:true,
    explanation:'<b>True.</b> Healthy milk teeth help children chew, speak correctly and hold space for adult teeth. Decay in baby teeth can cause pain and spread to adult teeth.' }),

  makeMCQ({ id:'g2he-hyg-050', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'What helps to keep teeth strong?',
    options:['Milk, cheese and yoghurt','Sweets and cakes every day','Fizzy drinks only','Never brushing them'],
    answer:'Milk, cheese and yoghurt',
    explanation:'<b>Calcium-rich foods</b> build strong tooth enamel, and regular brushing removes plaque — together they protect teeth from decay.' }),

  // ── illness_hygiene topup (051-060) ───────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-051', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'If you have a cold at school, what is the most important thing to do?',
    options:['Cover your mouth and nose','Cough freely over everyone','Stay at home forever','Sneeze onto the food'],
    answer:'Cover your mouth and nose',
    explanation:'Covering coughs and washing hands <b>stops cold viruses from spreading</b> to classmates and family.' }),

  makeTF({ id:'g2he-hyg-052', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'It is safe to share water bottles with friends.',
    answer:false,
    explanation:'<b>False.</b> Sharing bottles transfers saliva, which can spread bacteria, viruses and illnesses like colds and throat infections.' }),

  makeMCQ({ id:'g2he-hyg-053', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'What should you do with a used tissue?',
    options:['Put it in the bin','Leave it on the desk','Put it in your pocket','Give it to a friend'],
    answer:'Put it in the bin',
    explanation:'Used tissues are full of germs. <b>Throwing them away immediately</b> stops those germs from spreading through the classroom.' }),

  makeTF({ id:'g2he-hyg-054', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Washing hands after blowing your nose removes germs that could spread to others.',
    answer:true,
    explanation:'<b>True.</b> Nasal mucus is full of viruses. Washing hands after blowing the nose prevents transferring them to surfaces or other people.' }),

  makeMCQ({ id:'g2he-hyg-055', chapterId:'g2he-hygiene', difficulty:2, subsection:'illness_hygiene',
    question:'Why should a child with chicken pox stay home from school?',
    options:['It spreads to others easily','It is not catching at all','To stop them doing work','Teachers dislike ill children'],
    answer:'It spreads to others easily',
    explanation:'Chicken pox is <b>highly contagious</b>. Staying home protects classmates who have not had it and allows the child to rest and recover.' }),

  makeMCQ({ id:'g2he-hyg-056', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Which action helps PREVENT the spread of germs at school?',
    options:['Washing hands regularly','Playing in mud all day','Sharing pencils with all','Never washing our hands'],
    answer:'Washing hands regularly',
    explanation:'The key actions to prevent germs spreading in school are <b>hand washing, not sharing food/drinks and covering coughs</b>.' }),

  makeTF({ id:'g2he-hyg-057', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Resting and drinking plenty of water helps our body fight illness faster.',
    answer:true,
    explanation:'<b>True.</b> Rest allows the immune system to focus energy on fighting infection, and water keeps the body hydrated and flushes waste products.' }),

  makeMCQ({ id:'g2he-hyg-058', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'If you feel sick and have a high fever at school, what should you tell a teacher?',
    options:['Tell them straight away','Keep it a secret','Ask for extra lunch','Ignore it and work on'],
    answer:'Tell them straight away',
    explanation:'A high fever needs medical attention. <b>Telling a teacher immediately</b> ensures a parent is called and proper care is given.' }),

  makeTF({ id:'g2he-hyg-059', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Eating fresh fruits and vegetables every day helps our immune system stay strong.',
    answer:true,
    explanation:'<b>True.</b> Vitamins in fruits and vegetables (especially Vitamin C) support the immune system, helping us fight off illnesses.' }),

  makeMCQ({ id:'g2he-hyg-060', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'What is the role of vaccinations in preventing illness?',
    options:['They train our body to fight','They cure every illness','They replace healthy eating','They are only for adults'],
    answer:'They train our body to fight',
    explanation:'Vaccinations contain weakened or dead viruses/bacteria that <b>train our immune system</b> to recognise and fight the real disease later.' }),

  // ── food_groups topup (031-040) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-031', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which group gives us energy to run and play?',
    options:['Carbohydrate foods','Meat and fish only','Fizzy drinks only','Sweets and chocolate'],
    answer:'Carbohydrate foods',
    explanation:'<b>Carbohydrate (starchy) foods</b> are our main energy source. Rice, bread, roti and pasta fuel our muscles for activity.' }),

  makeMCQ({ id:'g2he-nut-032', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Milk, cheese and yoghurt belong to which food group?',
    options:['Dairy foods','Energy foods','Vitamin foods','Sugary foods'],
    answer:'Dairy foods',
    explanation:'Milk, cheese and yoghurt are <b>dairy foods</b>, rich in calcium for strong bones and teeth.' }),

  makeTF({ id:'g2he-nut-033', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Fish is a protein food that helps our muscles grow.',
    answer:true,
    explanation:'<b>True.</b> Fish is an excellent protein food. Protein is the body\'s building material for muscles, organs and cells.' }),

  makeMCQ({ id:'g2he-nut-034', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food is a natural source of vitamins and minerals?',
    options:['Broccoli','White sugar','Potato chips','Cola drink'],
    answer:'Broccoli',
    explanation:'<b>Broccoli</b> is packed with vitamins (C, K, A) and minerals (iron, calcium). Eating green vegetables provides essential protective nutrients.' }),

  makeTF({ id:'g2he-nut-035', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'We should eat a variety of foods from different food groups every day.',
    answer:true,
    explanation:'<b>True.</b> Each food group provides different nutrients. Eating a variety from all groups ensures our body gets everything it needs.' }),

  makeMCQ({ id:'g2he-nut-036', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these is a fruit that provides natural vitamins?',
    options:['Mango','Chips','Butter','Salt'],
    answer:'Mango',
    explanation:'<b>Mango</b> is a vitamin-rich fruit popular in Mauritius. It provides Vitamins A and C, which support eyesight and immunity.' }),

  makeTF({ id:'g2he-nut-037', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Sweets and fizzy drinks are not in any healthy food group and should only be eaten occasionally.',
    answer:true,
    explanation:'<b>True.</b> Sweets and fizzy drinks are high in sugar with almost no nutrients. They can cause tooth decay and obesity if eaten regularly.' }),

  makeMCQ({ id:'g2he-nut-038', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_groups',
    question:'Sophie wants to build strong muscles. Which food should she eat more of?',
    options:['Chicken, eggs and beans','Sugar and sweets only','Butter and cooking oil','Fizzy drinks and cake'],
    answer:'Chicken, eggs and beans',
    explanation:'<b>Protein foods</b> (chicken, eggs, beans) are the building blocks of muscles. Sophie needs more protein to help her muscles grow and repair.' }),

  makeTF({ id:'g2he-nut-039', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Boiled lentils (dhal) are a protein food that help the body grow.',
    answer:true,
    explanation:'<b>True.</b> Lentils (dhal) are an excellent plant protein, especially important in Mauritian cuisine. They help build and repair body tissues.' }),

  makeMCQ({ id:'g2he-nut-040', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which is a healthy drink that does NOT contain sugar?',
    options:['Plain water','Cola','Juice drink with added sugar','Energy drink'],
    answer:'Plain water',
    explanation:'<b>Plain water</b> contains no sugar or artificial ingredients. It is always the healthiest drink choice.' }),

  // ── balanced_meals topup (041-050) ────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-041', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'A balanced meal should include:',
    options:['Foods from every group','Meat and chips only','Vegetables on their own','Sweets and juice only'],
    answer:'Foods from every group',
    explanation:'A <b>balanced meal</b> includes starchy food (energy), protein (growth), vegetables (vitamins) and water (hydration) — covering all the body\'s needs.' }),

  makeTF({ id:'g2he-nut-042', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Breakfast is the most important meal because it gives our body and brain energy after sleeping all night.',
    answer:true,
    explanation:'<b>True.</b> After 8+ hours without food, our brain and muscles need fuel. A good breakfast improves concentration and energy for learning.' }),

  makeMCQ({ id:'g2he-nut-043', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Which of these is a balanced school lunch?',
    options:['Rice, fish and soup','Sweets and a cola','Plain chips only','Chocolate and an energy drink'],
    answer:'Rice, fish and soup',
    explanation:'<b>Rice (energy), fish (protein), soup vegetables (vitamins) and water</b> give all the nutrients needed for an active afternoon of learning.' }),

  makeTF({ id:'g2he-nut-044', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Eating dinner together as a family encourages better food choices and healthier meals.',
    answer:true,
    explanation:'<b>True.</b> Family mealtimes tend to involve more balanced, home-cooked food compared with eating alone, and support healthy eating habits.' }),

  makeMCQ({ id:'g2he-nut-045', chapterId:'g2he-nutrition', difficulty:2, subsection:'balanced_meals',
    question:'Priya skips breakfast because she is not hungry. What problem might this cause at school?',
    options:['She may feel tired','She will have more energy','She will learn better','Nothing will change'],
    answer:'She may feel tired',
    explanation:'Without breakfast, the brain runs low on glucose. This causes <b>tiredness, poor concentration and headaches</b>. Breakfast is important for learning.' }),

  makeMCQ({ id:'g2he-nut-046', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Which food from a traditional Mauritian meal belongs to the energy food group?',
    options:['Riz (rice)','Pickles','Chutney','Water only'],
    answer:'Riz (rice)',
    explanation:'<b>Riz (rice)</b> is Mauritius\'s staple energy food. It provides carbohydrates that fuel the body throughout the day.' }),

  makeTF({ id:'g2he-nut-047', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'It is healthy to eat a small piece of fruit as part of breakfast.',
    answer:true,
    explanation:'<b>True.</b> Fruit at breakfast adds vitamins and fibre to the meal, supporting the immune system and digestive health.' }),

  makeMCQ({ id:'g2he-nut-048', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Which approach to mealtimes is healthiest?',
    options:['Regular meals every day','Eating only when hungry','One large meal a day','Sweets instead of meals'],
    answer:'Regular meals every day',
    explanation:'<b>Regular meals at consistent times</b> keep blood sugar stable, support growth and provide steady energy for learning and play.' }),

  makeTF({ id:'g2he-nut-049', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'It is better to eat small amounts of many different vegetables than a large amount of one vegetable.',
    answer:true,
    explanation:'<b>True.</b> Different vegetables provide different vitamins and minerals. Eating a variety gives the full range of protective nutrients.' }),

  makeMCQ({ id:'g2he-nut-050', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'What makes a plate of food "colourful"?',
    options:['Many different vegetables','Adding lots of red ketchup','Using food colouring','Using only sweets'],
    answer:'Many different vegetables',
    explanation:'A <b>colourful plate</b> means many different fruits and vegetables — each colour provides different vitamins and antioxidants for health.' }),

  // ── food_safety topup (051-060) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-051', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Why do we keep cooked food covered?',
    options:['To keep flies off it','Only to keep it warm','Only to look nicer','There is no reason'],
    answer:'To keep flies off it',
    explanation:'Flies carry germs and contaminate food. <b>Keeping food covered</b> protects it from flies and other sources of contamination.' }),

  makeTF({ id:'g2he-nut-052', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'We should always wash vegetables and fruits before eating them.',
    answer:true,
    explanation:'<b>True.</b> Vegetables and fruits can carry dirt, bacteria and pesticide residues. Washing them removes these before eating.' }),

  makeMCQ({ id:'g2he-nut-053', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'How can we tell if food might be unsafe to eat?',
    options:['It smells bad','It is still hot','It is cold and firm','It tastes sweet'],
    answer:'It smells bad',
    explanation:'Signs of unsafe food: <b>bad smell, unusual colour/texture or past use-by date</b>. When in doubt, throw it out.' }),

  makeTF({ id:'g2he-nut-054', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Raw meat should be stored separately from other foods to prevent contamination.',
    answer:true,
    explanation:'<b>True.</b> Raw meat carries bacteria like salmonella. Storing it separately prevents bacteria from dripping onto and contaminating other foods.' }),

  makeMCQ({ id:'g2he-nut-055', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_safety',
    question:'Ravi ate some rice that was left uncovered overnight at room temperature. He now has a stomach ache. What most likely happened?',
    options:['Bacteria grew in the rice','The rice was far too hot','He ate it much too fast','Rice never causes illness'],
    answer:'Bacteria grew in the rice',
    explanation:'Cooked rice left at room temperature is a <b>breeding ground for bacteria</b> like Bacillus cereus. Leftover rice should be refrigerated and reheated thoroughly.' }),

  makeMCQ({ id:'g2he-nut-056', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'What is the safest way to defrost frozen meat?',
    options:['In the refrigerator overnight','On the kitchen counter all day','Under very hot water','Directly in a very hot pan without defrosting'],
    answer:'In the refrigerator overnight',
    explanation:'Defrosting in the <b>refrigerator keeps meat at a safe temperature</b> that prevents bacteria from growing, unlike room-temperature defrosting.' }),

  makeTF({ id:'g2he-nut-057', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Food sold at school should be stored hygienically and handled with clean hands.',
    answer:true,
    explanation:'<b>True.</b> School canteen food must be stored safely and handled with clean hands to prevent food poisoning among children.' }),

  makeMCQ({ id:'g2he-nut-058', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Why do fridges keep food safe longer than leaving it out?',
    options:['Cold slows down bacteria','Fridges have magic inside','Cold food has no germs','Fridges add chemicals'],
    answer:'Cold slows down bacteria',
    explanation:'<b>Cold temperatures slow bacterial growth</b>, so food stays safe to eat for longer in the fridge than at room temperature.' }),

  makeTF({ id:'g2he-nut-059', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Eating street food from a vendor who keeps food covered and serves it hot is safer than food left open.',
    answer:true,
    explanation:'<b>True.</b> Covered, hot food reduces the risk of contamination from flies and bacteria. Well-kept street food can be safe; exposed food has a higher risk.' }),

  makeMCQ({ id:'g2he-nut-060', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'What should you do if you find mould growing on bread?',
    options:['Throw the whole loaf away','Cut off the mouldy part','Toast it and eat it','Give it to a pet'],
    answer:'Throw the whole loaf away',
    explanation:'Mould penetrates bread throughout even if you can only see it in one spot. <b>Throw the whole loaf away</b> to avoid eating invisible mould toxins.' }),

  // ── home_safety topup (031-040) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-031', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if you smell gas (like rotten eggs) at home?',
    options:['Leave and tell an adult','Light a candle to see','Switch the lights on','Close all the doors'],
    answer:'Leave and tell an adult',
    explanation:'A gas smell means a dangerous leak. <b>Get out immediately</b>, don\'t touch any switches (a spark could cause an explosion) and call for adult help from outside.' }),

  makeTF({ id:'g2he-saf-032', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Young children should never use sharp kitchen tools like knives without an adult supervising.',
    answer:true,
    explanation:'<b>True.</b> Sharp kitchen tools can cause serious cuts. Children need adult supervision to learn to use them safely.' }),

  makeMCQ({ id:'g2he-saf-033', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'If a fire starts in the kitchen, what should a child do?',
    options:['Get out and call an adult','Put it out with a towel','Stay in the kitchen','Pour water on the wires'],
    answer:'Get out and call an adult',
    explanation:'Children should <b>get out immediately, closing doors</b> (which slows fire) and calling for adult help. Never fight a fire alone, and never pour water on electrical fires.' }),

  makeMCQ({ id:'g2he-saf-034', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Why should medicines be kept locked away from young children?',
    options:['They may look like sweets','They are only for adults','Children break bottles','They attract insects'],
    answer:'They may look like sweets',
    explanation:'Children might mistake medicine for sweets. <b>An overdose can be fatal</b>. All medicines must be stored in locked cupboards out of reach.' }),

  makeTF({ id:'g2he-saf-035', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Electrical sockets should be covered with socket guards when not in use, especially if there are young children at home.',
    answer:true,
    explanation:'<b>True.</b> Toddlers are curious and may poke fingers or objects into sockets, causing electric shocks. Socket guards prevent this.' }),

  makeMCQ({ id:'g2he-saf-036', chapterId:'g2he-safety', difficulty:2, subsection:'home_safety',
    question:'You are home alone and hear a loud crash upstairs. What should you do?',
    options:['Call a trusted adult','Run upstairs to look','Wait outside on your own','Ignore it completely'],
    answer:'Call a trusted adult',
    explanation:'<b>Call a parent or trusted adult</b> immediately. Do not investigate alone — there may be an intruder or danger. Your safety is the priority.' }),

  makeTF({ id:'g2he-saf-037', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Children should know their home address and a parent\'s phone number in case of emergency.',
    answer:true,
    explanation:'<b>True.</b> Knowing your address and a parent\'s number means you can get help quickly in an emergency.' }),

  makeMCQ({ id:'g2he-saf-038', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if a stranger knocks at the door when you are home alone?',
    options:['Do not open the door','Open it to see who it is','Let them in politely','Tell them to come back'],
    answer:'Do not open the door',
    explanation:'<b>Never open the door to a stranger when home alone.</b> Call your parent or trusted adult at once to let them know someone is at the door.' }),

  makeTF({ id:'g2he-saf-039', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Swimming pools at home should have a fence or cover to prevent accidental falls into the water.',
    answer:true,
    explanation:'<b>True.</b> Young children can drown in just a few minutes. Fences and pool covers prevent accidental falls and drowning.' }),

  makeMCQ({ id:'g2he-saf-040', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Which home hazard is most dangerous for a baby who is learning to crawl?',
    options:['An uncovered socket','A large soft sofa','Books on a shelf','A closed cupboard'],
    answer:'An uncovered socket',
    explanation:'Babies explore with their mouths. <b>Uncovered sockets and small objects</b> cause electric shocks and choking — two of the top causes of infant injury.' }),

  // ── road_safety topup (041-050) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-041', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'At a pedestrian crossing (zebra crossing), what should you do?',
    options:['Wait for cars to stop','Run across as fast as you can','Cross when you feel like it','Step out and make cars stop'],
    answer:'Wait for cars to stop',
    explanation:'At a zebra crossing, <b>wait for vehicles to stop completely</b> before crossing. Walk, don\'t run, and cross straight — don\'t angle across.' }),

  makeTF({ id:'g2he-saf-042', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'It is safer to walk on the pavement (footpath) than on the road.',
    answer:true,
    explanation:'<b>True.</b> The pavement is designed for pedestrians. Walking on the road puts you in the path of vehicles, which is very dangerous.' }),

  makeMCQ({ id:'g2he-saf-043', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'You are walking home from school and need to cross a wide road. What is the safest place to cross?',
    options:['At a pedestrian crossing','Anywhere that looks quiet','Between two parked cars','From behind a bus'],
    answer:'At a pedestrian crossing',
    explanation:'Cross at a <b>pedestrian crossing</b> or a place where you have a clear view of all traffic in both directions. Never cross behind a bus or between parked cars.' }),

  makeTF({ id:'g2he-saf-044', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'When getting out of a car, check for passing cyclists and other vehicles before opening the door.',
    answer:true,
    explanation:'<b>True.</b> Opening a car door without checking can hit a passing cyclist. This is called "dooring" and causes serious injuries. Always check first.' }),

  makeMCQ({ id:'g2he-saf-045', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Why is it dangerous to play ball games near a busy road?',
    options:['The ball can roll onto it','Balls are not allowed there','Roads are too hard to play on','There is no danger at all'],
    answer:'The ball can roll onto it',
    explanation:'When a ball rolls onto a road, a child may chase it without checking for traffic — running into the path of a vehicle. <b>Always play away from roads.</b>' }),

  makeMCQ({ id:'g2he-saf-046', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Which item makes a cyclist most visible to other road users at night?',
    options:['Bicycle lights','A dark helmet','A loud bell','A water bottle'],
    answer:'Bicycle lights',
    explanation:'<b>Bicycle lights and reflective clothing</b> make cyclists visible in the dark. Without them, drivers may not see a cyclist in time to avoid them.' }),

  makeTF({ id:'g2he-saf-047', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Walking while looking at a mobile phone or tablet makes it harder to notice traffic dangers.',
    answer:true,
    explanation:'<b>True.</b> Screens distract attention from the road. Many pedestrian accidents happen because people are looking at their phones rather than the traffic.' }),

  makeMCQ({ id:'g2he-saf-048', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'If a car stops and a stranger asks you to get in, what should you do?',
    options:['Refuse and run away','Get in if they are kind','Get in for some sweets','Get in if they know Mum'],
    answer:'Refuse and run away',
    explanation:'<b>Never get into a stranger\'s car.</b> Refuse firmly, move away and run to a trusted adult, school or public place immediately.' }),

  makeTF({ id:'g2he-saf-049', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Younger children should always cross the road with an adult.',
    answer:true,
    explanation:'<b>True.</b> Young children have not yet fully developed the ability to judge vehicle speed and distance. Adults must accompany them when crossing.' }),

  makeMCQ({ id:'g2he-saf-050', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Which road sign means "Stop"?',
    options:['A red eight-sided sign','A green round sign','A yellow triangle sign','A blue oblong sign'],
    answer:'A red eight-sided sign',
    explanation:'The <b>red octagonal STOP sign</b> means all vehicles must come to a complete stop before proceeding. It is one of the most important road signs.' }),

  // ── first_aid_basics topup (051-060) ──────────────────────────────────────

  makeMCQ({ id:'g2he-saf-051', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What should you do first if someone has a nosebleed?',
    options:['Lean forward and pinch it','Lean back and tilt up','Pack it tightly with paper','Blow the nose very hard'],
    answer:'Lean forward and pinch it',
    explanation:'For a nosebleed: <b>lean forward</b> (not back — blood can go to the throat), <b>pinch the soft part</b> firmly for 10 minutes. Tilting back causes blood to be swallowed.' }),

  makeTF({ id:'g2he-saf-052', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'For a small cut, we should clean it with clean water and cover it with a clean plaster.',
    answer:true,
    explanation:'<b>True.</b> Clean water removes dirt and bacteria from a cut. A clean plaster then covers the wound, protecting it from further contamination.' }),

  makeMCQ({ id:'g2he-saf-053', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If a classmate bumps their head and becomes confused or loses consciousness, what should you do?',
    options:['Get an adult at once','Give them a drink','Make them walk around','Put them to sleep'],
    answer:'Get an adult at once',
    explanation:'A head injury with confusion or unconsciousness is a medical emergency. <b>Get an adult immediately</b> and do not move the person — they may have a neck injury.' }),

  makeTF({ id:'g2he-saf-054', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'We should never remove a large object stuck in a wound — this must be done by a doctor.',
    answer:true,
    explanation:'<b>True.</b> Removing a large embedded object can cause massive bleeding. Leave it in place, bandage around it and get medical help immediately.' }),

  makeMCQ({ id:'g2he-saf-055', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If someone is choking on food, the most important first step is to:',
    options:['Shout for adult help','Give them a drink','Hit them on the chest','Tell them to jump'],
    answer:'Shout for adult help',
    explanation:'If someone is choking, <b>get adult help immediately</b>. Trained adults can perform the Heimlich manoeuvre. Do not delay. Water will not help a choking person.' }),

  makeMCQ({ id:'g2he-saf-056', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What should you do if someone gets something in their eye?',
    options:['Rinse it with clean water','Rub the eye very hard','Blow air into the eye','Ignore it if it is small'],
    answer:'Rinse it with clean water',
    explanation:'Rinse the eye with <b>clean water gently</b> to flush out the object. Tell an adult — rubbing the eye can scratch the surface and worsen injury.' }),

  makeTF({ id:'g2he-saf-057', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Keeping calm in a first aid situation helps you think clearly and give better help.',
    answer:true,
    explanation:'<b>True.</b> Panic clouds judgement. Staying calm allows you to assess the situation, call for help effectively and provide appropriate first aid.' }),

  makeMCQ({ id:'g2he-saf-058', chapterId:'g2he-safety', difficulty:2, subsection:'first_aid_basics',
    question:'A friend falls off their bicycle and their arm looks bent at a strange angle. What do you think has happened?',
    options:['The arm may be broken','The arm needs exercise','It is only a bruise','They just need a drink'],
    answer:'The arm may be broken',
    explanation:'A bent arm at an unusual angle suggests a <b>fracture</b>. Call for adult help immediately. <b>Do not move the arm</b> — this could cause more damage.' }),

  makeTF({ id:'g2he-saf-059', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Wearing a seatbelt in a car prevents serious injury in an accident.',
    answer:true,
    explanation:'<b>True.</b> Seatbelts keep passengers in their seats during a collision, preventing them from being thrown against the windscreen or ejected from the vehicle.' }),

  makeMCQ({ id:'g2he-saf-060', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Learning first aid is useful because:',
    options:['It helps us in emergencies','It is only for doctors','It is rarely ever useful','Children never need it'],
    answer:'It helps us in emergencies',
    explanation:'First aid knowledge helps us <b>act correctly in emergencies</b>. Knowing what NOT to do (e.g., move someone with a spinal injury) is just as important as knowing what to do.' })

);

})();
