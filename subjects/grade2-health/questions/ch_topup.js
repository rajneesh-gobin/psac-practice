'use strict';
(function () {

// Grade 2 Health Education — topup questions to bring all subsections to 20+
// Continuing IDs from ch01, ch02, ch03

STATIC_QUESTIONS.push(

  // ── grooming topup (011–020) ──────────────────────────────────────────────

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
    options:['Feet sweat inside shoes and bacteria build up, causing odour and infection','Feet are always clean inside shoes','Only our hands get dirty','Feet don\'t need washing unless they look dirty'],
    answer:'Feet sweat inside shoes and bacteria build up, causing odour and infection',
    explanation:'Feet sweat inside shoes all day. Washing them daily prevents <b>bacteria build-up, foot odour and fungal infections</b>.' }),

  makeTF({ id:'g2he-hyg-035', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Using a clean comb or brush (not sharing one) helps prevent the spread of head lice.',
    answer:true,
    explanation:'<b>True.</b> Head lice spread through shared combs and brushes. Using your own keeps your hair free from lice.' }),

  makeMCQ({ id:'g2he-hyg-036', chapterId:'g2he-hygiene', difficulty:2, subsection:'grooming',
    question:'Sam notices he has bad breath after eating garlic bread. What should he do?',
    options:['Brush teeth and tongue gently and rinse mouth with water','Nothing — bad breath is natural','Eat more garlic','Avoid talking to anyone'],
    answer:'Brush teeth and tongue gently and rinse mouth with water',
    explanation:'Brushing teeth and tongue and <b>rinsing the mouth</b> removes food particles and bacteria that cause bad breath (halitosis).' }),

  makeTF({ id:'g2he-hyg-037', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Changing bed sheets regularly helps keep skin clean and prevents skin problems.',
    answer:true,
    explanation:'<b>True.</b> Bed sheets collect sweat, dead skin and dust mites. Clean sheets reduce skin irritation and keep the sleeping environment hygienic.' }),

  makeMCQ({ id:'g2he-hyg-038', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Why should we cover cuts or sores before going to school?',
    options:['To prevent germs getting in and to stop spreading infection to others','Cuts don\'t need covering','Only to look tidy','Only if a teacher asks'],
    answer:'To prevent germs getting in and to stop spreading infection to others',
    explanation:'Covering wounds with a clean plaster or bandage <b>protects the wound from germs</b> and prevents blood or fluid from spreading to others.' }),

  makeTF({ id:'g2he-hyg-039', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Good grooming includes keeping our shoes clean and in good repair.',
    answer:true,
    explanation:'<b>True.</b> Clean, well-maintained shoes are part of overall personal presentation and prevent foot problems from worn or dirty footwear.' }),

  makeMCQ({ id:'g2he-hyg-040', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Which grooming habit helps protect us from the hot Mauritian sun?',
    options:['Wearing a hat and applying sun protection outdoors','Never going outside','Wearing a coat in the heat','Rubbing sand on the skin'],
    answer:'Wearing a hat and applying sun protection outdoors',
    explanation:'The Mauritian sun is very strong. <b>Wearing a hat and using sunscreen</b> protects the skin from sunburn and long-term sun damage.' }),

  // ── hand_dental topup (011–020) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-041', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'How long should you wash your hands to kill most germs?',
    options:['At least 20 seconds — long enough to sing "Happy Birthday" twice','5 seconds is enough','Just a quick rinse with water','Only until hands look clean'],
    answer:'At least 20 seconds — long enough to sing "Happy Birthday" twice',
    explanation:'Washing for <b>at least 20 seconds</b> with soap creates enough friction to remove most germs. A quick rinse does not.' }),

  makeTF({ id:'g2he-hyg-042', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'The gaps between our teeth also need cleaning — that is why we brush in circles.',
    answer:true,
    explanation:'<b>True.</b> Plaque and food collect between teeth. Circular brushing strokes clean all surfaces — the front, back, chewing surfaces and between teeth.' }),

  makeMCQ({ id:'g2he-hyg-043', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'When we wash hands, which part should we scrub carefully?',
    options:['The palms, back of hands, between fingers and under nails','Only the palms','Only the fingertips','Only the back of the hand'],
    answer:'The palms, back of hands, between fingers and under nails',
    explanation:'Germs hide on <b>all surfaces and under nails</b>. Thorough hand washing covers palms, backs, between fingers and beneath nails.' }),

  makeTF({ id:'g2he-hyg-044', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'We should visit a dentist for check-ups even if our teeth don\'t hurt.',
    answer:true,
    explanation:'<b>True.</b> A dentist can spot tooth decay early, before it causes pain. Regular check-ups prevent small problems from becoming big painful ones.' }),

  makeMCQ({ id:'g2he-hyg-045', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'What does brushing the tongue help to prevent?',
    options:['Bad breath — bacteria on the tongue produce smelly gases','Nothing — the tongue cleans itself','Tooth pain only','Stomach upset'],
    answer:'Bad breath — bacteria on the tongue produce smelly gases',
    explanation:'Bacteria live on the tongue and produce bad-smelling gases. <b>Gently brushing the tongue</b> removes these bacteria and freshens breath.' }),

  makeMCQ({ id:'g2he-hyg-046', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Is it safe to share a toothbrush with a sibling?',
    options:['No — sharing toothbrushes spreads bacteria and viruses between people','Yes — toothpaste kills all germs','Yes — if you rinse it first','Yes — family members always share one'],
    answer:'No — sharing toothbrushes spreads bacteria and viruses between people',
    explanation:'<b>Never share a toothbrush.</b> It transfers bacteria and viruses — including those that cause gum disease and infections.' }),

  makeTF({ id:'g2he-hyg-047', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Using too much toothpaste (like filling the whole brush) is wasteful and can upset the stomach if swallowed.',
    answer:true,
    explanation:'<b>True.</b> A pea-sized amount is enough. Excess fluoride toothpaste swallowed regularly can cause a condition called fluorosis in children.' }),

  makeMCQ({ id:'g2he-hyg-048', chapterId:'g2he-hygiene', difficulty:2, subsection:'hand_dental',
    question:'Amina ate a banana at break time and does not have a toothbrush. What is the best thing she can do?',
    options:['Rinse her mouth well with water to remove sugar','Eat more food to push the banana away','Do nothing — it\'s only one snack','Chew on a pen cap'],
    answer:'Rinse her mouth well with water to remove sugar',
    explanation:'When brushing is not possible, <b>rinsing the mouth with water</b> washes away sugar and food particles, reducing the risk of tooth decay.' }),

  makeTF({ id:'g2he-hyg-049', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Baby teeth (milk teeth) are important to care for even though they fall out.',
    answer:true,
    explanation:'<b>True.</b> Healthy milk teeth help children chew, speak correctly and hold space for adult teeth. Decay in baby teeth can cause pain and spread to adult teeth.' }),

  makeMCQ({ id:'g2he-hyg-050', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'What helps to keep teeth strong?',
    options:['Eating calcium-rich foods (milk, cheese, yoghurt) and brushing twice daily',
             'Eating lots of sweets',
             'Never brushing',
             'Drinking only fizzy drinks'],
    answer:'Eating calcium-rich foods (milk, cheese, yoghurt) and brushing twice daily',
    explanation:'<b>Calcium-rich foods</b> build strong tooth enamel, and regular brushing removes plaque — together they protect teeth from decay.' }),

  // ── illness_hygiene topup (011–020) ───────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-051', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'If you have a cold at school, what is the most important thing to do?',
    options:['Cover mouth and nose when coughing or sneezing, and wash hands often','Cough freely on everyone','Stay home forever','Sneeze on food to kill germs'],
    answer:'Cover mouth and nose when coughing or sneezing, and wash hands often',
    explanation:'Covering coughs and washing hands <b>stops cold viruses from spreading</b> to classmates and family.' }),

  makeTF({ id:'g2he-hyg-052', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'It is safe to share water bottles with friends.',
    answer:false,
    explanation:'<b>False.</b> Sharing bottles transfers saliva, which can spread bacteria, viruses and illnesses like colds and throat infections.' }),

  makeMCQ({ id:'g2he-hyg-053', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'What should you do with a used tissue?',
    options:['Put it in the bin immediately after use','Leave it on the desk','Stuff it back in your pocket','Give it to a friend'],
    answer:'Put it in the bin immediately after use',
    explanation:'Used tissues are full of germs. <b>Throwing them away immediately</b> stops those germs from spreading through the classroom.' }),

  makeTF({ id:'g2he-hyg-054', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Washing hands after blowing your nose removes germs that could spread to others.',
    answer:true,
    explanation:'<b>True.</b> Nasal mucus is full of viruses. Washing hands after blowing the nose prevents transferring them to surfaces or other people.' }),

  makeMCQ({ id:'g2he-hyg-055', chapterId:'g2he-hygiene', difficulty:2, subsection:'illness_hygiene',
    question:'Why should a child with chicken pox stay home from school?',
    options:['Chicken pox spreads easily to others who have not had it, and the child needs rest','Chicken pox is not contagious','Only to stop the child from working','Teachers don\'t like children who are ill'],
    answer:'Chicken pox spreads easily to others who have not had it, and the child needs rest',
    explanation:'Chicken pox is <b>highly contagious</b>. Staying home protects classmates who have not had it and allows the child to rest and recover.' }),

  makeMCQ({ id:'g2he-hyg-056', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Which action helps PREVENT the spread of germs at school?',
    options:['Regular hand washing, not sharing food or drinks, covering coughs',
             'Playing in mud all day',
             'Sharing pencils with everyone',
             'Never washing hands'],
    answer:'Regular hand washing, not sharing food or drinks, covering coughs',
    explanation:'The key actions to prevent germs spreading in school are <b>hand washing, not sharing food/drinks and covering coughs</b>.' }),

  makeTF({ id:'g2he-hyg-057', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Resting and drinking plenty of water helps our body fight illness faster.',
    answer:true,
    explanation:'<b>True.</b> Rest allows the immune system to focus energy on fighting infection, and water keeps the body hydrated and flushes waste products.' }),

  makeMCQ({ id:'g2he-hyg-058', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'If you feel sick and have a high fever at school, what should you tell a teacher?',
    options:['Tell them immediately so they can contact a parent or get medical help','Keep it secret','Eat extra lunch','Ignore it and keep working'],
    answer:'Tell them immediately so they can contact a parent or get medical help',
    explanation:'A high fever needs medical attention. <b>Telling a teacher immediately</b> ensures a parent is called and proper care is given.' }),

  makeTF({ id:'g2he-hyg-059', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Eating fresh fruits and vegetables every day helps our immune system stay strong.',
    answer:true,
    explanation:'<b>True.</b> Vitamins in fruits and vegetables (especially Vitamin C) support the immune system, helping us fight off illnesses.' }),

  makeMCQ({ id:'g2he-hyg-060', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'What is the role of vaccinations in preventing illness?',
    options:['They prepare our immune system to fight specific diseases without making us very sick',
             'They cure all illnesses',
             'They replace healthy eating',
             'They are only for adults'],
    answer:'They prepare our immune system to fight specific diseases without making us very sick',
    explanation:'Vaccinations contain weakened or dead viruses/bacteria that <b>train our immune system</b> to recognise and fight the real disease later.' }),

  // ── food_groups topup (011–020) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-031', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which group gives us energy to run and play?',
    options:['Carbohydrate foods (rice, bread, roti, pasta)','Meat only','Fizzy drinks','Sweets and chocolate'],
    answer:'Carbohydrate foods (rice, bread, roti, pasta)',
    explanation:'<b>Carbohydrate (starchy) foods</b> are our main energy source. Rice, bread, roti and pasta fuel our muscles for activity.' }),

  makeMCQ({ id:'g2he-nut-032', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Milk, cheese and yoghurt belong to which food group?',
    options:['Dairy foods (calcium-rich)','Energy foods','Vitamins group','Sugary foods'],
    answer:'Dairy foods (calcium-rich)',
    explanation:'Milk, cheese and yoghurt are <b>dairy foods</b>, rich in calcium for strong bones and teeth.' }),

  makeTF({ id:'g2he-nut-033', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Fish is a protein food that helps our muscles grow.',
    answer:true,
    explanation:'<b>True.</b> Fish is an excellent protein food. Protein is the body\'s building material for muscles, organs and cells.' }),

  makeMCQ({ id:'g2he-nut-034', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food is a natural source of vitamins and minerals?',
    options:['Broccoli (a green vegetable)','White sugar','Potato chips','Cola drink'],
    answer:'Broccoli (a green vegetable)',
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
    options:['Chicken, eggs and beans (protein foods)','Sugar and sweets','Butter and oil only','Fizzy drinks'],
    answer:'Chicken, eggs and beans (protein foods)',
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

  // ── balanced_meals topup (011–020) ────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-041', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'A balanced meal should include:',
    options:['A starchy food, a protein food, vegetables and water','Only meat and chips','Only vegetables','Only sweets and juice'],
    answer:'A starchy food, a protein food, vegetables and water',
    explanation:'A <b>balanced meal</b> includes starchy food (energy), protein (growth), vegetables (vitamins) and water (hydration) — covering all the body\'s needs.' }),

  makeTF({ id:'g2he-nut-042', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Breakfast is the most important meal because it gives our body and brain energy after sleeping all night.',
    answer:true,
    explanation:'<b>True.</b> After 8+ hours without food, our brain and muscles need fuel. A good breakfast improves concentration and energy for learning.' }),

  makeMCQ({ id:'g2he-nut-043', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Which of these is a balanced school lunch?',
    options:['Rice, fish curry, vegetable soup and water','Sweets and cola','Plain chips only','A chocolate bar and energy drink'],
    answer:'Rice, fish curry, vegetable soup and water',
    explanation:'<b>Rice (energy), fish (protein), soup vegetables (vitamins) and water</b> give all the nutrients needed for an active afternoon of learning.' }),

  makeTF({ id:'g2he-nut-044', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'Eating dinner together as a family encourages better food choices and healthier meals.',
    answer:true,
    explanation:'<b>True.</b> Family mealtimes tend to involve more balanced, home-cooked food compared with eating alone, and support healthy eating habits.' }),

  makeMCQ({ id:'g2he-nut-045', chapterId:'g2he-nutrition', difficulty:2, subsection:'balanced_meals',
    question:'Priya skips breakfast because she is not hungry. What problem might this cause at school?',
    options:['She may feel tired, have difficulty concentrating and have a headache by mid-morning',
             'She will have more energy',
             'She will learn better',
             'Nothing will change'],
    answer:'She may feel tired, have difficulty concentrating and have a headache by mid-morning',
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
    options:['Eating regular meals at set times (breakfast, lunch and dinner) without skipping','Eating only when very hungry','Having one large meal per day','Snacking on sweets all day instead of meals'],
    answer:'Eating regular meals at set times (breakfast, lunch and dinner) without skipping',
    explanation:'<b>Regular meals at consistent times</b> keep blood sugar stable, support growth and provide steady energy for learning and play.' }),

  makeTF({ id:'g2he-nut-049', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'It is better to eat small amounts of many different vegetables than a large amount of one vegetable.',
    answer:true,
    explanation:'<b>True.</b> Different vegetables provide different vitamins and minerals. Eating a variety gives the full range of protective nutrients.' }),

  makeMCQ({ id:'g2he-nut-050', chapterId:'g2he-nutrition', difficulty:1, subsection:'balanced_meals',
    question:'What makes a plate of food "colourful"?',
    options:['Having many different fruits and vegetables of different colours on the plate',
             'Using food dyes and colouring',
             'Adding lots of ketchup',
             'Only using sweets'],
    answer:'Having many different fruits and vegetables of different colours on the plate',
    explanation:'A <b>colourful plate</b> means many different fruits and vegetables — each colour provides different vitamins and antioxidants for health.' }),

  // ── food_safety topup (011–020) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-nut-051', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Why do we keep cooked food covered?',
    options:['To keep flies off it and stop germs from getting in','Only to keep it warm','Only because it looks better','There is no reason'],
    answer:'To keep flies off it and stop germs from getting in',
    explanation:'Flies carry germs and contaminate food. <b>Keeping food covered</b> protects it from flies and other sources of contamination.' }),

  makeTF({ id:'g2he-nut-052', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'We should always wash vegetables and fruits before eating them.',
    answer:true,
    explanation:'<b>True.</b> Vegetables and fruits can carry dirt, bacteria and pesticide residues. Washing them removes these before eating.' }),

  makeMCQ({ id:'g2he-nut-053', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'How can we tell if food might be unsafe to eat?',
    options:['It smells bad, looks strange or is past its use-by date','Only if it is hot','Only if it is green','If it tastes sweet'],
    answer:'It smells bad, looks strange or is past its use-by date',
    explanation:'Signs of unsafe food: <b>bad smell, unusual colour/texture or past use-by date</b>. When in doubt, throw it out.' }),

  makeTF({ id:'g2he-nut-054', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Raw meat should be stored separately from other foods to prevent contamination.',
    answer:true,
    explanation:'<b>True.</b> Raw meat carries bacteria like salmonella. Storing it separately prevents bacteria from dripping onto and contaminating other foods.' }),

  makeMCQ({ id:'g2he-nut-055', chapterId:'g2he-nutrition', difficulty:2, subsection:'food_safety',
    question:'Ravi ate some rice that was left uncovered overnight at room temperature. He now has a stomach ache. What most likely happened?',
    options:['Bacteria grew in the rice overnight and he ate contaminated food',
             'The rice was too hot',
             'He ate too fast',
             'Rice never causes stomach problems'],
    answer:'Bacteria grew in the rice overnight and he ate contaminated food',
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
    options:['The cold temperature slows down the growth of bacteria','Fridges have magic inside','Cold food has no germs at all','Fridges add preservatives to food'],
    answer:'The cold temperature slows down the growth of bacteria',
    explanation:'<b>Cold temperatures slow bacterial growth</b>, so food stays safe to eat for longer in the fridge than at room temperature.' }),

  makeTF({ id:'g2he-nut-059', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'Eating street food from a vendor who keeps food covered and serves it hot is safer than food left open.',
    answer:true,
    explanation:'<b>True.</b> Covered, hot food reduces the risk of contamination from flies and bacteria. Well-kept street food can be safe; exposed food has a higher risk.' }),

  makeMCQ({ id:'g2he-nut-060', chapterId:'g2he-nutrition', difficulty:1, subsection:'food_safety',
    question:'What should you do if you find mould growing on bread?',
    options:['Throw the whole loaf away — mould spreads through bread you cannot see','Cut off the mouldy part and eat the rest','Toast it — heat kills all the mould','Give it to a pet'],
    answer:'Throw the whole loaf away — mould spreads through bread you cannot see',
    explanation:'Mould penetrates bread throughout even if you can only see it in one spot. <b>Throw the whole loaf away</b> to avoid eating invisible mould toxins.' }),

  // ── home_safety topup (011–020) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-031', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if you smell gas (like rotten eggs) at home?',
    options:['Leave immediately and tell an adult — do not switch any lights on or off','Open all windows and light a candle','Switch on the kitchen lights to look for the leak','Stay inside and close all doors'],
    answer:'Leave immediately and tell an adult — do not switch any lights on or off',
    explanation:'A gas smell means a dangerous leak. <b>Get out immediately</b>, don\'t touch any switches (a spark could cause an explosion) and call for adult help from outside.' }),

  makeTF({ id:'g2he-saf-032', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Young children should never use sharp kitchen tools like knives without an adult supervising.',
    answer:true,
    explanation:'<b>True.</b> Sharp kitchen tools can cause serious cuts. Children need adult supervision to learn to use them safely.' }),

  makeMCQ({ id:'g2he-saf-033', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'If a fire starts in the kitchen, what should a child do?',
    options:['Get out of the house, close doors behind them, and call for adult help','Try to put it out with a towel','Stay in the kitchen','Pour water on electrical fires'],
    answer:'Get out of the house, close doors behind them, and call for adult help',
    explanation:'Children should <b>get out immediately, closing doors</b> (which slows fire) and calling for adult help. Never fight a fire alone, and never pour water on electrical fires.' }),

  makeMCQ({ id:'g2he-saf-034', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Why should medicines be kept locked away from young children?',
    options:['Children may think they are sweets and take too much, which can be fatal','Medicines are only for adults to look at','Children break bottles easily','Medicines attract insects'],
    answer:'Children may think they are sweets and take too much, which can be fatal',
    explanation:'Children might mistake medicine for sweets. <b>An overdose can be fatal</b>. All medicines must be stored in locked cupboards out of reach.' }),

  makeTF({ id:'g2he-saf-035', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Electrical sockets should be covered with socket guards when not in use, especially if there are young children at home.',
    answer:true,
    explanation:'<b>True.</b> Toddlers are curious and may poke fingers or objects into sockets, causing electric shocks. Socket guards prevent this.' }),

  makeMCQ({ id:'g2he-saf-036', chapterId:'g2he-safety', difficulty:2, subsection:'home_safety',
    question:'You are home alone and hear a loud crash upstairs. What should you do?',
    options:['Stay calm, do not go upstairs alone — call a parent or trusted adult immediately',
             'Run upstairs to investigate',
             'Open the front door and wait outside alone',
             'Ignore it'],
    answer:'Stay calm, do not go upstairs alone — call a parent or trusted adult immediately',
    explanation:'<b>Call a parent or trusted adult</b> immediately. Do not investigate alone — there may be an intruder or danger. Your safety is the priority.' }),

  makeTF({ id:'g2he-saf-037', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Children should know their home address and a parent\'s phone number in case of emergency.',
    answer:true,
    explanation:'<b>True.</b> Knowing your address and a parent\'s number means you can get help quickly in an emergency.' }),

  makeMCQ({ id:'g2he-saf-038', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if a stranger knocks at the door when you are home alone?',
    options:['Do not open the door — call your parent or a trusted adult immediately','Let them in because they knocked politely','Open the door to see who it is','Shout for them to come back tomorrow'],
    answer:'Do not open the door — call your parent or a trusted adult immediately',
    explanation:'<b>Never open the door to a stranger when home alone.</b> Call your parent or trusted adult at once to let them know someone is at the door.' }),

  makeTF({ id:'g2he-saf-039', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Swimming pools at home should have a fence or cover to prevent accidental falls into the water.',
    answer:true,
    explanation:'<b>True.</b> Young children can drown in just a few minutes. Fences and pool covers prevent accidental falls and drowning.' }),

  makeMCQ({ id:'g2he-saf-040', chapterId:'g2he-safety', difficulty:1, subsection:'home_safety',
    question:'Which home hazard is most dangerous for a baby who is learning to crawl?',
    options:['Uncovered electrical sockets and small objects on the floor that can be swallowed',
             'A large sofa',
             'Books on a shelf',
             'A window that is open a little'],
    answer:'Uncovered electrical sockets and small objects on the floor that can be swallowed',
    explanation:'Babies explore with their mouths. <b>Uncovered sockets and small objects</b> cause electric shocks and choking — two of the top causes of infant injury.' }),

  // ── road_safety topup (011–020) ───────────────────────────────────────────

  makeMCQ({ id:'g2he-saf-041', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'At a pedestrian crossing (zebra crossing), what should you do?',
    options:['Wait for all vehicles to stop, then walk straight across without running','Run across as fast as possible','Cross only if you feel like it','Step out and wait for cars to stop around you'],
    answer:'Wait for all vehicles to stop, then walk straight across without running',
    explanation:'At a zebra crossing, <b>wait for vehicles to stop completely</b> before crossing. Walk, don\'t run, and cross straight — don\'t angle across.' }),

  makeTF({ id:'g2he-saf-042', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'It is safer to walk on the pavement (footpath) than on the road.',
    answer:true,
    explanation:'<b>True.</b> The pavement is designed for pedestrians. Walking on the road puts you in the path of vehicles, which is very dangerous.' }),

  makeMCQ({ id:'g2he-saf-043', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'You are walking home from school and need to cross a wide road. What is the safest place to cross?',
    options:['At a pedestrian crossing, or where you can see clearly in both directions','Anywhere that looks quiet','Between two parked cars','From behind a bus'],
    answer:'At a pedestrian crossing, or where you can see clearly in both directions',
    explanation:'Cross at a <b>pedestrian crossing</b> or a place where you have a clear view of all traffic in both directions. Never cross behind a bus or between parked cars.' }),

  makeTF({ id:'g2he-saf-044', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'When getting out of a car, check for passing cyclists and other vehicles before opening the door.',
    answer:true,
    explanation:'<b>True.</b> Opening a car door without checking can hit a passing cyclist. This is called "dooring" and causes serious injuries. Always check first.' }),

  makeMCQ({ id:'g2he-saf-045', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Why is it dangerous to play ball games near a busy road?',
    options:['A ball can roll onto the road and a child may run after it without looking','Balls are not allowed near roads','Roads are too hard to play on','There is no danger in playing near roads'],
    answer:'A ball can roll onto the road and a child may run after it without looking',
    explanation:'When a ball rolls onto a road, a child may chase it without checking for traffic — running into the path of a vehicle. <b>Always play away from roads.</b>' }),

  makeMCQ({ id:'g2he-saf-046', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Which item makes a cyclist most visible to other road users at night?',
    options:['Lights on the bicycle and reflective clothing','A dark helmet','A loud bell','A colourful water bottle'],
    answer:'Lights on the bicycle and reflective clothing',
    explanation:'<b>Bicycle lights and reflective clothing</b> make cyclists visible in the dark. Without them, drivers may not see a cyclist in time to avoid them.' }),

  makeTF({ id:'g2he-saf-047', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Walking while looking at a mobile phone or tablet makes it harder to notice traffic dangers.',
    answer:true,
    explanation:'<b>True.</b> Screens distract attention from the road. Many pedestrian accidents happen because people are looking at their phones rather than the traffic.' }),

  makeMCQ({ id:'g2he-saf-048', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'If a car stops and a stranger asks you to get in, what should you do?',
    options:['Refuse firmly, step away from the car and run to a trusted adult or public place','Get in if they seem friendly','Get in if they offer sweets','Accept if they say they know your parent'],
    answer:'Refuse firmly, step away from the car and run to a trusted adult or public place',
    explanation:'<b>Never get into a stranger\'s car.</b> Refuse firmly, move away and run to a trusted adult, school or public place immediately.' }),

  makeTF({ id:'g2he-saf-049', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Younger children should always cross the road with an adult.',
    answer:true,
    explanation:'<b>True.</b> Young children have not yet fully developed the ability to judge vehicle speed and distance. Adults must accompany them when crossing.' }),

  makeMCQ({ id:'g2he-saf-050', chapterId:'g2he-safety', difficulty:1, subsection:'road_safety',
    question:'Which road sign means "Stop"?',
    options:['A red octagon (8-sided) sign with the word STOP','A green circle','A yellow triangle','A blue rectangle'],
    answer:'A red octagon (8-sided) sign with the word STOP',
    explanation:'The <b>red octagonal STOP sign</b> means all vehicles must come to a complete stop before proceeding. It is one of the most important road signs.' }),

  // ── first_aid_basics topup (011–020) ──────────────────────────────────────

  makeMCQ({ id:'g2he-saf-051', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What should you do first if someone has a nosebleed?',
    options:['Lean forward and pinch the soft part of the nose for 10 minutes',
             'Lean back and tilt the head backwards',
             'Pack the nose tightly with paper',
             'Blow the nose hard to clear it'],
    answer:'Lean forward and pinch the soft part of the nose for 10 minutes',
    explanation:'For a nosebleed: <b>lean forward</b> (not back — blood can go to the throat), <b>pinch the soft part</b> firmly for 10 minutes. Tilting back causes blood to be swallowed.' }),

  makeTF({ id:'g2he-saf-052', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'For a small cut, we should clean it with clean water and cover it with a clean plaster.',
    answer:true,
    explanation:'<b>True.</b> Clean water removes dirt and bacteria from a cut. A clean plaster then covers the wound, protecting it from further contamination.' }),

  makeMCQ({ id:'g2he-saf-053', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If a classmate bumps their head and becomes confused or loses consciousness, what should you do?',
    options:['Get an adult immediately — do not move them','Give them water and tell them to rest','Make them walk around','Put them to sleep'],
    answer:'Get an adult immediately — do not move them',
    explanation:'A head injury with confusion or unconsciousness is a medical emergency. <b>Get an adult immediately</b> and do not move the person — they may have a neck injury.' }),

  makeTF({ id:'g2he-saf-054', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'We should never remove a large object stuck in a wound — this must be done by a doctor.',
    answer:true,
    explanation:'<b>True.</b> Removing a large embedded object can cause massive bleeding. Leave it in place, bandage around it and get medical help immediately.' }),

  makeMCQ({ id:'g2he-saf-055', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'If someone is choking on food, the most important first step is to:',
    options:['Shout for adult help immediately','Give them water to drink','Hit them hard on the chest','Tell them to jump up and down'],
    answer:'Shout for adult help immediately',
    explanation:'If someone is choking, <b>get adult help immediately</b>. Trained adults can perform the Heimlich manoeuvre. Do not delay. Water will not help a choking person.' }),

  makeMCQ({ id:'g2he-saf-056', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'What should you do if someone gets something in their eye?',
    options:['Rinse the eye gently with clean water and tell an adult','Rub the eye hard to remove it','Blow air directly into the eye','Ignore it if it\'s a small piece'],
    answer:'Rinse the eye gently with clean water and tell an adult',
    explanation:'Rinse the eye with <b>clean water gently</b> to flush out the object. Tell an adult — rubbing the eye can scratch the surface and worsen injury.' }),

  makeTF({ id:'g2he-saf-057', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Keeping calm in a first aid situation helps you think clearly and give better help.',
    answer:true,
    explanation:'<b>True.</b> Panic clouds judgement. Staying calm allows you to assess the situation, call for help effectively and provide appropriate first aid.' }),

  makeMCQ({ id:'g2he-saf-058', chapterId:'g2he-safety', difficulty:2, subsection:'first_aid_basics',
    question:'A friend falls off their bicycle and their arm looks bent at a strange angle. What do you think has happened?',
    options:['They may have broken (fractured) a bone — call an adult immediately and do not move the arm',
             'They just need to exercise it',
             'It is a bruise — it will heal on its own',
             'They need water'],
    answer:'They may have broken (fractured) a bone — call an adult immediately and do not move the arm',
    explanation:'A bent arm at an unusual angle suggests a <b>fracture</b>. Call for adult help immediately. <b>Do not move the arm</b> — this could cause more damage.' }),

  makeTF({ id:'g2he-saf-059', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Wearing a seatbelt in a car prevents serious injury in an accident.',
    answer:true,
    explanation:'<b>True.</b> Seatbelts keep passengers in their seats during a collision, preventing them from being thrown against the windscreen or ejected from the vehicle.' }),

  makeMCQ({ id:'g2he-saf-060', chapterId:'g2he-safety', difficulty:1, subsection:'first_aid_basics',
    question:'Learning first aid is useful because:',
    options:['It helps us know what to do and what NOT to do in an emergency, so we can help without making things worse',
             'It is only for doctors',
             'It only helps in very rare situations',
             'Children never need to know first aid'],
    answer:'It helps us know what to do and what NOT to do in an emergency, so we can help without making things worse',
    explanation:'First aid knowledge helps us <b>act correctly in emergencies</b>. Knowing what NOT to do (e.g., move someone with a spinal injury) is just as important as knowing what to do.' })

);

})();
