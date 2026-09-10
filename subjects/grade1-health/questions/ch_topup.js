'use strict';
(function () {

// Grade 1 Health — topup questions to bring all subsections to 20+
// Continuing IDs from ch01, ch02, ch03

STATIC_QUESTIONS.push(

  // ── personal_hygiene topup (046–055) ─────────────────────────────────────

  makeMCQ({ id:'g1he-hyg-046', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'What should you use to wash your hands and body?',
    options:['Soap and water','Only water','Only sand','Only a dry cloth'],
    answer:'Soap and water',
    explanation:'We use <b>soap and water</b> to wash properly and kill germs.' }),

  makeMCQ({ id:'g1he-hyg-047', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Why do we take a shower or bath?',
    options:['To wash off the germs','To cool ourselves down','Because our parents say','To get wet for fun'],
    answer:'To wash off the germs',
    explanation:'We bathe to <b>wash away dirt and germs</b> and keep our skin clean and healthy.' }),

  makeTF({ id:'g1he-hyg-048', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'A clean body helps us feel good about ourselves.',
    answer:true,
    explanation:'<b>True.</b> Good hygiene keeps us clean, healthy and feeling confident.' }),

  makeMCQ({ id:'g1he-hyg-049', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Pia forgot to brush her hair today. What should she do?',
    options:['Brush it as soon as she can','Leave it — hair does not need brushing','Cut it all off','Ask a friend to pull it straight'],
    answer:'Brush it as soon as she can',
    explanation:'Hair should be <b>brushed or combed every day</b> to keep it tidy and clean.' }),

  makeTF({ id:'g1he-hyg-050', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'We should wash our face every morning.',
    answer:true,
    explanation:'<b>True.</b> Washing our face removes sleep crust, oil and any dirt, helping us feel fresh and clean.' }),

  // ── hand_washing topup (051–060) ──────────────────────────────────────────

  makeMCQ({ id:'g1he-hyg-051', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'Should we wash our hands before eating our school lunch?',
    options:['Yes — always','No — our hands look clean','Only if a teacher watches','Only if we ate with our hands before'],
    answer:'Yes — always',
    explanation:'We should <b>always wash hands before eating</b> to remove germs we cannot see.' }),

  makeTF({ id:'g1he-hyg-052', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'If there is no sink nearby, hand sanitiser is a good alternative to soap and water.',
    answer:true,
    explanation:'<b>True.</b> Hand sanitiser kills most germs when soap and water are not available.' }),

  makeMCQ({ id:'g1he-hyg-053', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'When you come home from school, what should you do FIRST?',
    options:['Wash your hands','Watch television','Eat a snack','Play with toys'],
    answer:'Wash your hands',
    explanation:'Wash hands <b>as soon as you come home</b> to remove germs picked up during the day.' }),

  makeTF({ id:'g1he-hyg-054', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'We should rub the back of our hands and between our fingers when washing.',
    answer:true,
    explanation:'<b>True.</b> Germs hide on the back of hands and between fingers. Rubbing all surfaces is essential.' }),

  makeMCQ({ id:'g1he-hyg-055', chapterId:'g1he-hygiene', difficulty:2, subsection:'hand_washing',
    question:'Why is it important NOT to share towels for drying hands?',
    options:['Germs pass on the towel','Towels wear out faster','Shared towels get wet','There is no reason'],
    answer:'Germs pass on the towel',
    explanation:'A shared towel can transfer <b>germs from one person to the next</b>. Use your own towel or paper towels.' }),

  // ── dental_care topup (056–065) ───────────────────────────────────────────

  makeTF({ id:'g1he-hyg-056', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Eating sugary sweets and then not brushing teeth can cause cavities.',
    answer:true,
    explanation:'<b>True.</b> Sugar feeds bacteria that produce acid, damaging tooth enamel and causing cavities.' }),

  makeMCQ({ id:'g1he-hyg-057', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Which food is BEST for our teeth?',
    options:['An apple','A sticky toffee','Sugary biscuits','A fizzy drink'],
    answer:'An apple',
    explanation:'Crunchy fruits and vegetables like apples <b>help clean teeth naturally</b> and contain no added sugar.' }),

  makeMCQ({ id:'g1he-hyg-058', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'How do we stop a cough or sneeze from spreading germs?',
    options:['Cover mouth and nose with a tissue or elbow','Sneeze loudly and freely','Cough on our food','Wipe our nose on our sleeve then touch others'],
    answer:'Cover mouth and nose with a tissue or elbow',
    explanation:'Covering with a tissue or elbow <b>traps the germ-containing droplets</b> so they do not reach others.' }),

  makeTF({ id:'g1he-hyg-059', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'We should throw used tissues in the bin right away.',
    answer:true,
    explanation:'<b>True.</b> Used tissues carry germs. Throw them away immediately to stop germs spreading.' }),

  makeMCQ({ id:'g1he-hyg-060', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Our teeth help us to:',
    options:['Chew our food','Only look nice','Only eat sweets','Sleep much better'],
    answer:'Chew our food',
    explanation:'Teeth have important jobs: <b>chewing food, helping us speak clearly and giving us a healthy smile</b>. Taking care of them matters.' }),

  // ── food_groups topup ─────────────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-046', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which food helps us see well and have healthy skin?',
    options:['Carrots','Sweets','Chips','White bread'],
    answer:'Carrots',
    explanation:'Carrots are rich in <b>Vitamin A</b>, which helps us see well, especially in dim light, and keeps skin healthy.' }),

  makeTF({ id:'g1he-nut-047', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Rice and bread are energy foods that help us run and play.',
    answer:true,
    explanation:'<b>True.</b> Rice and bread are carbohydrate (energy) foods that fuel our muscles for activity.' }),

  makeMCQ({ id:'g1he-nut-048', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which is a protein food that helps us grow?',
    options:['Egg','Rice','Apple','Biscuit'],
    answer:'Egg',
    explanation:'<b>Eggs</b> are an excellent protein food that helps our body grow and repair itself.' }),

  makeTF({ id:'g1he-nut-049', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Drinking milk helps our bones and teeth grow strong.',
    answer:true,
    explanation:'<b>True.</b> Milk contains calcium, which builds strong bones and teeth.' }),

  makeMCQ({ id:'g1he-nut-050', chapterId:'g1he-nutrition', difficulty:1, subsection:'food_groups',
    question:'Which group do lentils (dhal) belong to?',
    options:['Protein foods','Energy foods','Dairy foods','Fruits'],
    answer:'Protein foods',
    explanation:'Lentils (dhal) are a <b>protein food</b>, great for growth. They are a popular Mauritian source of plant protein.' }),

  // ── healthy_meals topup ───────────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-051', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'What is a good food to eat for breakfast?',
    options:['Bread with egg','Sweets and cake','Crisps and cola','A fizzy drink'],
    answer:'Bread with egg',
    explanation:'<b>Bread with egg</b> gives energy (bread) and protein (egg) to start the school day well.' }),

  makeTF({ id:'g1he-nut-052', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'It is good to eat a little fruit or vegetable at every meal.',
    answer:true,
    explanation:'<b>True.</b> Fruits and vegetables at every meal provide vitamins and minerals to keep us healthy.' }),

  makeMCQ({ id:'g1he-nut-053', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'At lunchtime, which drink is the healthiest choice?',
    options:['Water','Cola','Sweet juice','Energy drink'],
    answer:'Water',
    explanation:'<b>Water</b> is always the healthiest drink — no sugar, no additives, and essential for every body function.' }),

  makeTF({ id:'g1he-nut-054', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_meals',
    question:'We should eat three meals a day: breakfast, lunch and dinner.',
    answer:true,
    explanation:'<b>True.</b> Three meals a day give our body a steady supply of energy and nutrients throughout the day.' }),

  makeMCQ({ id:'g1he-nut-055', chapterId:'g1he-nutrition', difficulty:2, subsection:'healthy_meals',
    question:'Sam had a big breakfast, a good lunch and a healthy dinner. Was this a good day of eating?',
    options:['Yes — three balanced meals is the goal','No — he ate too many times','No — children should not eat dinner','Yes — but only if the meals had sweets'],
    answer:'Yes — three balanced meals is the goal',
    explanation:'<b>Yes!</b> Three balanced meals a day is exactly the goal. It provides energy and nutrients our body needs all day.' }),

  // ── healthy_snacks topup ──────────────────────────────────────────────────

  makeMCQ({ id:'g1he-nut-056', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Which of these is the healthiest snack for recess?',
    options:['A banana','Chips','Sweets','Chocolate bar'],
    answer:'A banana',
    explanation:'A <b>banana</b> is a great recess snack — natural, filling, full of energy and vitamins.' }),

  makeTF({ id:'g1he-nut-057', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'We should always wash fruits before eating them.',
    answer:true,
    explanation:'<b>True.</b> Fruits may have dirt or pesticides on the skin. Washing removes these before eating.' }),

  makeMCQ({ id:'g1he-nut-058', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'What is a healthy snack that does NOT have a lot of sugar?',
    options:['Carrot sticks','Sweets','Fizzy drink','Chocolate'],
    answer:'Carrot sticks',
    explanation:'<b>Carrot sticks</b> are a healthy snack with vitamins and fibre but almost no added sugar.' }),

  makeTF({ id:'g1he-nut-059', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'Eating too many sweets is bad for our teeth.',
    answer:true,
    explanation:'<b>True.</b> Sugar feeds bacteria in the mouth that cause tooth decay (holes in teeth).' }),

  makeMCQ({ id:'g1he-nut-060', chapterId:'g1he-nutrition', difficulty:1, subsection:'healthy_snacks',
    question:'If you are thirsty during the day, what is the best thing to drink?',
    options:['Water','Cola','Juice with lots of sugar','Energy drink'],
    answer:'Water',
    explanation:'<b>Water</b> is always the best drink when thirsty — no sugar, completely natural and healthy.' }),

  // ── school_safety topup ───────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-037', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Should you push people on the stairs?',
    options:['No, they could fall','Yes, it is funny','Yes, if in the way','Yes, to hurry them'],
    answer:'No, they could fall',
    explanation:'<b>No</b> — pushing on stairs is very dangerous. Someone could fall and suffer serious injury.' }),

  makeTF({ id:'g1he-saf-038', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should always listen to our teacher\'s safety instructions.',
    answer:true,
    explanation:'<b>True.</b> Teachers give safety instructions to protect us. Following them keeps everyone safe.' }),

  makeMCQ({ id:'g1he-saf-039', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'What should you do with rubbish at school?',
    options:['Put it in the bin','Leave it on the floor','Throw it at friends','Put it in your bag'],
    answer:'Put it in the bin',
    explanation:'Always put rubbish <b>in the bin</b>. Litter on floors can cause trips and falls.' }),

  makeTF({ id:'g1he-saf-040', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'We should tell a teacher if we see someone being hurt at school.',
    answer:true,
    explanation:'<b>True.</b> Teachers are there to keep everyone safe. Tell them immediately if someone is being hurt.' }),

  makeMCQ({ id:'g1he-saf-041', chapterId:'g1he-safety', difficulty:1, subsection:'school_safety',
    question:'Is it safe to climb on classroom furniture?',
    options:['No, it can fall over','Yes, chairs are strong','Yes, if no one looks','Yes, if you hold on'],
    answer:'No, it can fall over',
    explanation:'<b>No</b> — furniture is not built for climbing. It can topple over and cause serious injury.' }),

  // ── home_safety topup ─────────────────────────────────────────────────────

  makeTF({ id:'g1he-saf-042', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Children should never play with matches or lighters.',
    answer:true,
    explanation:'<b>True.</b> Matches and lighters can cause fires that injure people and destroy homes.' }),

  makeMCQ({ id:'g1he-saf-043', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'What should you do if you smell gas (like a strong rotten egg smell) at home?',
    options:['Go outside at once','Open the oven to check','Light a match to look','Close all the windows'],
    answer:'Go outside at once',
    explanation:'A gas smell means there is a dangerous gas leak. <b>Get out immediately</b> without using any switches, and call for adult help.' }),

  makeMCQ({ id:'g1he-saf-044', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Where should medicine be stored in a home with young children?',
    options:['In a locked cupboard','On the kitchen table','In a child’s bedroom','On the floor by the door'],
    answer:'In a locked cupboard',
    explanation:'Medicine should be stored in a <b>locked cupboard, out of reach</b>. Children might accidentally take too much, which can be very dangerous.' }),

  makeTF({ id:'g1he-saf-045', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'We should never swim in the sea or a river without an adult nearby.',
    answer:true,
    explanation:'<b>True.</b> Water can be dangerous. An adult must always be present to help in an emergency.' }),

  makeMCQ({ id:'g1he-saf-046', chapterId:'g1he-safety', difficulty:1, subsection:'home_safety',
    question:'Should you play with or touch electrical wires at home?',
    options:['No, they are dangerous','Yes, if it is colourful','Yes, if it is on the floor','Yes, if the power is low'],
    answer:'No, they are dangerous',
    explanation:'<b>Never</b> touch electrical wires. They carry dangerous electricity that can cause severe injury or death.' }),

  // ── environment topup ─────────────────────────────────────────────────────

  makeMCQ({ id:'g1he-saf-047', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'You see broken glass on the playground floor. What should you do?',
    options:['Tell a teacher','Pick it up quickly','Step on it hard','Kick it away'],
    answer:'Tell a teacher',
    explanation:'Broken glass is very sharp. <b>Tell a teacher</b> so it can be removed safely. Never touch it with bare hands.' }),

  makeTF({ id:'g1he-saf-048', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'It is safe to eat wild berries or plants we find outside without knowing what they are.',
    answer:false,
    explanation:'<b>False.</b> Many wild plants and berries are poisonous. Never eat anything found outdoors unless an adult says it is safe.' }),

  makeMCQ({ id:'g1he-saf-049', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'If a stranger offers you sweets and asks you to go with them, what should you do?',
    options:['Say no and tell an adult','Take the sweets and run','Go if the sweets look nice','Take them and say nothing'],
    answer:'Say no and tell an adult',
    explanation:'<b>Never go with or accept gifts from strangers.</b> Say no firmly, move away and tell a trusted adult (parent, teacher) immediately.' }),

  makeTF({ id:'g1he-saf-050', chapterId:'g1he-safety', difficulty:1, subsection:'environment',
    question:'We should always hold an adult\'s hand when crossing a busy road.',
    answer:true,
    explanation:'<b>True.</b> Young children should always hold an adult\'s hand on roads. Cars are fast and can be hard to see or judge.' })

);

})();
