'use strict';
(function () {

// Grade 1 Health Education — Food and Nutrition
// IDs: g1he-nut-001 onwards
// Subsections: food_groups, healthy_meals, healthy_snacks

STATIC_QUESTIONS.push(

  // ── food_groups (001–030) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-001', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these is a fruit?',
    options:['Mango','Rice','Fish','Bread'],
    answer:'Mango',
    hint:'Fruits grow on trees or plants and are often sweet.',
    explanation:'<b>Mango</b> is a fruit. Fruits grow on trees and plants and are full of vitamins.' }),

  makeMCQ({ id:'g1he-nut-002', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these is a vegetable?',
    options:['Carrot','Apple','Biscuit','Juice'],
    answer:'Carrot',
    hint:'Vegetables grow in the ground or on plants.',
    explanation:'A <b>carrot</b> is a vegetable. Vegetables give us vitamins to keep us healthy.' }),

  makeMCQ({ id:'g1he-nut-003', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food gives us energy to run and play?',
    options:['Rice and bread','Sweets only','Water only','A little oil'],
    answer:'Rice and bread',
    hint:'Starchy foods give us energy.',
    explanation:'<b>Rice and bread</b> are starchy foods that give us energy to play, run and learn.' }),

  makeTF({ id:'g1he-nut-004', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Milk helps our bones and teeth to grow strong.',
    answer:true,
    explanation:'<b>True.</b> Milk is a dairy food rich in calcium which makes our bones and teeth strong.' }),

  makeMCQ({ id:'g1he-nut-005', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Fish and chicken help our body to do what?',
    options:['Grow and repair muscles','Run faster only','See better in the dark','Sleep more'],
    answer:'Grow and repair muscles',
    hint:'These are protein foods.',
    explanation:'Fish and chicken are <b>protein foods</b> that help our body grow and repair muscles.' }),

  makeMCQ({ id:'g1he-nut-006', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these is a dairy food?',
    options:['Cheese','Rice','Apple','Fish'],
    answer:'Cheese',
    hint:'Dairy foods come from milk.',
    explanation:'<b>Cheese</b> is made from milk, so it is a dairy food. Dairy foods are good for our bones.' }),

  makeTF({ id:'g1he-nut-007', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Fruits and vegetables give us vitamins to stay healthy.',
    answer:true,
    explanation:'<b>True.</b> Fruits and vegetables are packed with vitamins that keep our body healthy.' }),

  makeMCQ({ id:'g1he-nut-008', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which of these gives us vitamins to keep us healthy?',
    options:['Orange (fruit)','White bread only','Chips','Fizzy drinks'],
    answer:'Orange (fruit)',
    hint:'Think about fruits and vegetables.',
    explanation:'An <b>orange</b> is a fruit full of Vitamin C, which helps us fight illness and stay healthy.' }),

  makeMCQ({ id:'g1he-nut-009', chapterId:'g1he-nutrition', difficulty:2, subsection:'food_groups',
    question:'We should eat food from _____ groups every day.',
    options:['many different','only one of the','only two of the','none of the'],
    answer:'many different',
    hint:'A balanced diet includes many types of food.',
    explanation:'We should eat food from <b>many different groups</b> every day to get all the nutrients our body needs.' }),

  makeTF({ id:'g1he-nut-010', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'We only need to eat one type of food to be healthy.',
    answer:false,
    explanation:'<b>False.</b> We need food from <b>many different groups</b> to get all the vitamins, energy and protein our body needs.' }),

  makeMCQ({ id:'g1he-nut-011', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food group does bread belong to?',
    options:['Starchy foods','Dairy foods','Fruit and veg','Protein foods'],
    answer:'Starchy foods',
    hint:'Bread is made from wheat — a grain.',
    explanation:'Bread belongs to the <b>starchy foods (energy foods)</b> group. It gives us energy to move and think.' }),

  makeMCQ({ id:'g1he-nut-012', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food group does chicken belong to?',
    options:['Protein foods','Dairy foods','Starchy foods','Fruit foods'],
    answer:'Protein foods',
    hint:'Chicken is a type of meat.',
    explanation:'Chicken belongs to the <b>protein foods</b> group. Proteins help our body grow and stay strong.' }),

  makeMCQ({ id:'g1he-nut-013', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which is a healthy food to eat?',
    options:['Apple','Chips','Sweets','Fizzy drink'],
    answer:'Apple',
    hint:'Fruits are part of a healthy diet.',
    explanation:'An <b>apple</b> is a healthy food because it contains vitamins and natural sugar.' }),

  makeTF({ id:'g1he-nut-014', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Sweets and chips should be eaten at every meal.',
    answer:false,
    explanation:'<b>False.</b> Sweets and chips are <b>less healthy foods</b>. They should only be eaten sometimes, not at every meal.' }),

  makeMCQ({ id:'g1he-nut-015', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Water is important for our body because it:',
    options:['Keeps our body working','Makes food taste sweet','Gives us lots of energy','Makes us grow taller'],
    answer:'Keeps our body working',
    hint:'Our body is mostly made of water.',
    explanation:'<b>Water</b> keeps us hydrated and helps our heart, brain and all body parts work properly.' }),

  // ── healthy_meals (016–045) ───────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-016', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'How many main meals do we eat each day?',
    options:['3 meals','1 meal','5 meals','7 meals'],
    answer:'3 meals',
    hint:'Think about morning, midday and evening.',
    explanation:'We eat <b>3 main meals</b> each day: breakfast, lunch and dinner.' }),

  makeMCQ({ id:'g1he-nut-017', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Which meal do we eat in the morning?',
    options:['Breakfast','Lunchtime','Dinner','Supper'],
    answer:'Breakfast',
    hint:'Breakfast "breaks" the fast of sleeping.',
    explanation:'We eat <b>breakfast</b> in the morning. It gives us energy to start the school day.' }),

  makeMCQ({ id:'g1he-nut-018', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Which meal do we eat in the middle of the day?',
    options:['Lunch','Breakfast','Dinner','Snack'],
    answer:'Lunch',
    hint:'This meal is around midday.',
    explanation:'We eat <b>lunch</b> in the middle of the day. It gives us energy for the afternoon.' }),

  makeMCQ({ id:'g1he-nut-019', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Which meal do we eat in the evening?',
    options:['Dinner','Breakfast','Lunch','Recess'],
    answer:'Dinner',
    hint:'We eat this meal after coming home from school.',
    explanation:'We eat <b>dinner</b> in the evening, at the end of the day.' }),

  makeTF({ id:'g1he-nut-020', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Breakfast is an important meal because it gives us energy for school.',
    answer:true,
    explanation:'<b>True.</b> Breakfast gives us the energy we need to concentrate and learn at school.' }),

  makeMCQ({ id:'g1he-nut-021', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_meals',
    question:'Ravi skips breakfast and goes to school. What might happen?',
    options:['He may feel tired','He will run faster','He will feel great','He will grow taller'],
    answer:'He may feel tired',
    hint:'Think about what breakfast gives us.',
    explanation:'Without breakfast, Ravi may feel <b>tired and hungry</b>, making it hard to concentrate and learn.' }),

  makeMCQ({ id:'g1he-nut-022', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'What is a good breakfast to have before school?',
    options:['Bread and an egg','Chips and sweets','A fizzy drink','Sugary biscuits'],
    answer:'Bread and an egg',
    hint:'Think about which foods give energy and nutrients.',
    explanation:'<b>Bread with egg and milk</b> is a healthy breakfast — it gives energy (bread), protein (egg) and calcium (milk).' }),

  makeTF({ id:'g1he-nut-023', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'We should drink water during our meals.',
    answer:true,
    explanation:'<b>True.</b> Drinking water during meals helps digestion and keeps us hydrated.' }),

  makeMCQ({ id:'g1he-nut-024', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Which drink is the healthiest to have with a meal?',
    options:['Water','Fizzy soft drink','Sweet juice with lots of sugar','Energy drink'],
    answer:'Water',
    hint:'Our body needs this every day.',
    explanation:'<b>Water</b> is the healthiest drink. It has no sugar and keeps our body working properly.' }),

  makeMCQ({ id:'g1he-nut-025', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_meals',
    question:'What should a good lunch include?',
    options:['Rice, fish and veg','Sweets and chips','A fizzy drink only','Bread on its own'],
    answer:'Rice, fish and veg',
    hint:'A good lunch needs energy foods, vegetables and protein.',
    explanation:'A balanced lunch includes <b>starchy food</b> (rice/bread), <b>vegetables</b> and a <b>protein</b> (fish/chicken/beans).' }),

  makeTF({ id:'g1he-nut-026', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'It is good to eat the same type of food at every meal.',
    answer:false,
    explanation:'<b>False.</b> We should <b>eat a variety of foods</b> at each meal to get all the nutrients our body needs.' }),

  makeMCQ({ id:'g1he-nut-027', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Why do we eat three meals a day?',
    options:['To give our body energy','To help us sleep well','Because we feel bored','Because the teacher says'],
    answer:'To give our body energy',
    hint:'Think about what food does for our body.',
    explanation:'We eat three meals a day to give our body a steady supply of <b>energy and nutrients</b> throughout the day.' }),

  makeMCQ({ id:'g1he-nut-028', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Which of these is a healthy lunch?',
    options:['Vegetable rice and fish','Chips and sweets only','Fizzy drink and biscuits only','No lunch at all'],
    answer:'Vegetable rice and fish',
    hint:'Think about which foods have nutrients.',
    explanation:'<b>Vegetable rice and fish</b> is a healthy lunch — it gives energy (rice), vitamins (vegetables) and protein (fish).' }),

  makeTF({ id:'g1he-nut-029', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'We should always wash our hands before eating a meal.',
    answer:true,
    explanation:'<b>True.</b> Washing hands before eating removes germs that could get into our food and make us sick.' }),

  makeMCQ({ id:'g1he-nut-030', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'Food should be cooked or kept clean so that it is:',
    options:['Safe to eat','Only very tasty','Very cold only','Very hot only'],
    answer:'Safe to eat',
    hint:'Think about why we cook food.',
    explanation:'Food should be <b>safe to eat and free from germs</b>. Cooking and proper storage kill harmful bacteria.' }),

  // ── healthy_snacks (031–060) ──────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-031', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Which of these is a healthy snack?',
    options:['An apple','A bag of crisps','A chocolate bar','A fizzy drink'],
    answer:'An apple',
    hint:'Think about fruits and natural foods.',
    explanation:'An <b>apple</b> is a healthy snack — it has vitamins, fibre and natural sugar, with no added chemicals.' }),

  makeMCQ({ id:'g1he-nut-032', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Which snack is NOT healthy?',
    options:['Chips (crisps)','Banana','Plain water','Carrot sticks'],
    answer:'Chips (crisps)',
    hint:'Think about which food has a lot of salt and oil.',
    explanation:'<b>Chips (crisps)</b> are a less healthy snack because they have lots of salt and oil. Banana and carrot sticks are healthy choices.' }),

  makeTF({ id:'g1he-nut-033', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'A banana is a healthy snack.',
    answer:true,
    explanation:'<b>True.</b> A banana is a healthy snack full of vitamins, minerals and natural energy.' }),

  makeMCQ({ id:'g1he-nut-034', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'What is the best drink to have as a snack?',
    options:['Water','Fizzy cola drink','Sugary juice','Energy drink'],
    answer:'Water',
    hint:'The healthiest drink has no sugar.',
    explanation:'<b>Water</b> is always the best drink. It hydrates us with no sugar, colour or chemicals.' }),

  makeMCQ({ id:'g1he-nut-035', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_snacks',
    question:'Aisha wants a snack after school. Which should she choose?',
    options:['A piece of fruit','A bag of sweets','A fizzy drink','A packet of chips'],
    answer:'A piece of fruit',
    hint:'Think about the healthiest option.',
    explanation:'<b>A piece of fruit</b> is the best choice. Sweets, fizzy drinks and chips are all less healthy snacks.' }),

  makeTF({ id:'g1he-nut-036', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Sweets and chocolate should be our main snack every day.',
    answer:false,
    explanation:'<b>False.</b> Sweets and chocolate have a lot of sugar. They should only be eaten sometimes, not as a daily snack.' }),

  makeMCQ({ id:'g1he-nut-037', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Why are fruits and vegetables good snacks?',
    options:['They have vitamins','They are always sweet','They are the tastiest','They are the biggest'],
    answer:'They have vitamins',
    hint:'Think about what nutrients they contain.',
    explanation:'Fruits and vegetables are great snacks because they are <b>natural</b> and full of <b>vitamins</b> that keep us healthy.' }),

  makeMCQ({ id:'g1he-nut-038', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Which of these is a less healthy snack that we should eat only sometimes?',
    options:['Sweets','Water','Banana','Carrot'],
    answer:'Sweets',
    hint:'Too much sugar is not good for our body.',
    explanation:'<b>Sweets</b> are a less healthy snack because they are full of sugar which can damage our teeth and cause health problems.' }),

  makeTF({ id:'g1he-nut-039', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'We should drink water throughout the day, not just at mealtimes.',
    answer:true,
    explanation:'<b>True.</b> Our body needs water all day long to stay hydrated and work properly.' }),

  makeMCQ({ id:'g1he-nut-040', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_snacks',
    question:'Tom eats sweets every day as his snack. What might happen to his teeth?',
    options:['He might get holes','They will get bigger','They will get whiter','They will get longer'],
    answer:'He might get holes',
    hint:'Think about what sugar does to teeth.',
    explanation:'Eating sweets every day can cause <b>cavities</b> (holes in teeth). The sugar feeds bacteria that damage tooth enamel.' }),

  makeMCQ({ id:'g1he-nut-041', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Food that has been left out in the heat for a long time is:',
    options:['Unsafe to eat','Perfectly fine','Better than fresh','Tastier than fresh'],
    answer:'Unsafe to eat',
    hint:'Heat and time allow bacteria to grow in food.',
    explanation:'Food left out for a long time in the heat can grow <b>harmful bacteria</b> (germs) and become unsafe to eat.' }),

  makeTF({ id:'g1he-nut-042', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'We should wash fruit and vegetables before eating them.',
    answer:true,
    explanation:'<b>True.</b> Washing fruit and vegetables removes dirt, pesticides and germs that could make us sick.' }),

  makeMCQ({ id:'g1he-nut-043', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Which is a healthy drink to have during the day?',
    options:['Water','Fizzy soft drink','Energy drink','Very sweet juice'],
    answer:'Water',
    hint:'The best drink has no added sugar.',
    explanation:'<b>Water</b> is the healthiest drink during the day. It has no sugar or additives.' }),

  makeMCQ({ id:'g1he-nut-044', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_snacks',
    question:'Mary says she likes to eat only chips and sweets. What advice would you give her?',
    options:['Eat fruit and vegetables','Eat even more chips','Eat nothing else at all','Drink more fizzy drinks'],
    answer:'Eat fruit and vegetables',
    hint:'A healthy diet needs many types of food.',
    explanation:'Mary should <b>eat more fruits and vegetables</b>. A balanced diet keeps her healthy and gives her all the vitamins and minerals she needs.' }),

  makeTF({ id:'g1he-nut-045', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Eating a variety of healthy foods every day helps our body to grow strong.',
    answer:true,
    explanation:'<b>True.</b> Different foods give us different nutrients. A varied healthy diet helps our body grow, stay strong and fight illness.' })

);

})();
