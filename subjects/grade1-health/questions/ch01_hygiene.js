'use strict';
(function () {

// Grade 1 Health Education — Personal Hygiene
// IDs: g1he-hyg-001 onwards
// Subsections: personal_hygiene, hand_washing, dental_care

STATIC_QUESTIONS.push(

  // ── personal_hygiene (001–030) ───────────────────────────────────────────

  makeMCQ({ id:'g1he-hyg-001', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'What should you do when you wake up in the morning?',
    options:['Wash my hands and face','Watch television','Go back to sleep','Play outside'],
    answer:'Wash my hands and face',
    hint:'Think about keeping our body clean.',
    explanation:'When we wake up, we should <b>wash our hands and face</b> to start the day clean and fresh.' }),

  makeMCQ({ id:'g1he-hyg-002', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Which of these helps to keep your body clean?',
    options:['Taking a shower','Eating sweets','Watching television','Running outside'],
    answer:'Taking a shower',
    hint:'Think about what you use water and soap for.',
    explanation:'<b>Taking a shower</b> washes away dirt and germs, keeping our body clean and healthy.' }),

  makeMCQ({ id:'g1he-hyg-003', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Why should we wear clean clothes every day?',
    options:['To look nice and stay healthy','To run faster','To eat better food','To sleep well'],
    answer:'To look nice and stay healthy',
    hint:'Think about dirt and germs on clothes.',
    explanation:'Wearing <b>clean clothes</b> keeps us looking nice and prevents germs from staying on our skin.' }),

  makeTF({ id:'g1he-hyg-004', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'We should comb our hair every day.',
    answer:true,
    explanation:'<b>True.</b> Combing our hair every day keeps it tidy and clean.' }),

  makeMCQ({ id:'g1he-hyg-005', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'What do we use to take a shower?',
    options:['Water and soap','Sand and leaves','Juice and cloth','Mud and water'],
    answer:'Water and soap',
    hint:'Think about what you use in the bathroom.',
    explanation:'We use <b>water and soap</b> to wash our body properly during a shower.' }),

  makeTF({ id:'g1he-hyg-006', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'It is fine to wear the same clothes for one week.',
    answer:false,
    explanation:'<b>False.</b> We should wear <b>clean clothes every day</b>. Wearing the same clothes for a week lets germs build up on them.' }),

  makeMCQ({ id:'g1he-hyg-007', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'What should you do before going to school each morning?',
    options:['Wash hands, brush teeth, take a shower and wear clean clothes',
             'Only eat breakfast',
             'Only put on shoes',
             'Only comb hair'],
    answer:'Wash hands, brush teeth, take a shower and wear clean clothes',
    hint:'Good hygiene involves many steps.',
    explanation:'To be clean and ready for school, we should <b>wash hands, brush teeth, take a shower and wear clean clothes</b>.' }),

  makeMCQ({ id:'g1he-hyg-008', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Why is it important to dry yourself properly after a shower?',
    options:['To stay warm and avoid getting sick','To make noise','To be faster','To eat more food'],
    answer:'To stay warm and avoid getting sick',
    hint:'Think about what happens when you stay wet.',
    explanation:'Drying ourselves properly after a shower keeps us <b>warm and healthy</b>. Staying wet can make us feel cold.' }),

  makeTF({ id:'g1he-hyg-009', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Clean socks and shoes are part of good personal hygiene.',
    answer:true,
    explanation:'<b>True.</b> Wearing clean socks and shoes is part of being clean and well-groomed every day.' }),

  makeMCQ({ id:'g1he-hyg-010', chapterId:'g1he-hygiene', difficulty:2, subsection:'personal_hygiene',
    question:'What is personal hygiene?',
    options:['Keeping our body clean and healthy','Eating lots of food','Playing sports every day','Sleeping for 12 hours'],
    answer:'Keeping our body clean and healthy',
    hint:'Think about all the things we do to keep our body clean.',
    explanation:'<b>Personal hygiene</b> means keeping our body clean and healthy by washing, brushing, and wearing clean clothes.' }),

  makeMCQ({ id:'g1he-hyg-011', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'How often should you take a shower?',
    options:['Every day','Once a week','Once a month','Only when it rains'],
    answer:'Every day',
    hint:'Think about how quickly we get dirty.',
    explanation:'We should take a shower <b>every day</b> to wash away dirt, sweat and germs.' }),

  makeTF({ id:'g1he-hyg-012', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'Being clean helps to keep germs away.',
    answer:true,
    explanation:'<b>True.</b> Good hygiene keeps germs away and helps us stay healthy.' }),

  makeMCQ({ id:'g1he-hyg-013', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'What do we use to comb our hair?',
    options:['A comb or brush','A spoon','A pencil','A ruler'],
    answer:'A comb or brush',
    hint:'Think about what you use in the morning.',
    explanation:'We use a <b>comb or brush</b> to tidy our hair every day.' }),

  makeMCQ({ id:'g1he-hyg-014', chapterId:'g1he-hygiene', difficulty:2, subsection:'personal_hygiene',
    question:'Which step comes LAST in getting ready for school?',
    options:['Putting on your school bag','Waking up','Taking a shower','Combing your hair'],
    answer:'Putting on your school bag',
    hint:'Think about what you do just before you leave the house.',
    explanation:'The last step is <b>putting on your school bag</b> to leave for school.' }),

  makeTF({ id:'g1he-hyg-015', chapterId:'g1he-hygiene', difficulty:1, subsection:'personal_hygiene',
    question:'We should change our underwear every day.',
    answer:true,
    explanation:'<b>True.</b> Changing underwear every day is an important part of personal hygiene.' }),

  // ── hand_washing (016–045) ───────────────────────────────────────────────

  makeMCQ({ id:'g1he-hyg-016', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'What is the FIRST step when washing our hands?',
    options:['Wet our hands','Apply soap','Rub our hands','Dry our hands'],
    answer:'Wet our hands',
    hint:'What do we do first at the tap?',
    explanation:'The first step is to <b>wet our hands</b> with water before applying soap.' }),

  makeMCQ({ id:'g1he-hyg-017', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'What do we put on our hands after wetting them?',
    options:['Soap','Sugar','Sand','Water only'],
    answer:'Soap',
    hint:'Think about what makes hands clean.',
    explanation:'After wetting our hands, we apply <b>soap</b> which kills the germs.' }),

  makeMCQ({ id:'g1he-hyg-018', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'After applying soap, what do we do next?',
    options:['Rub our hands together','Dry our hands','Eat food','Rinse straight away'],
    answer:'Rub our hands together',
    hint:'Soap needs to cover all parts of our hands.',
    explanation:'After applying soap, we <b>rub our hands together</b> to spread the soap and clean between our fingers.' }),

  makeMCQ({ id:'g1he-hyg-019', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'After rubbing, what do we do?',
    options:['Rinse our hands with water','Apply more soap','Eat straight away','Wipe on our clothes'],
    answer:'Rinse our hands with water',
    hint:'We need to wash the soap away.',
    explanation:'After rubbing, we <b>rinse our hands</b> with clean water to wash all the soap and germs away.' }),

  makeMCQ({ id:'g1he-hyg-020', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'What is the LAST step when washing our hands?',
    options:['Dry our hands','Apply soap','Wet our hands','Rub our hands'],
    answer:'Dry our hands',
    hint:'Think about what we do after rinsing.',
    explanation:'The last step is to <b>dry our hands</b> with a clean towel or paper towel.' }),

  makeMCQ({ id:'g1he-hyg-021', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'How many steps are there in proper hand washing?',
    options:['5','2','3','10'],
    answer:'5',
    hint:'Count: Wet, Soap, Rub, Rinse, Dry.',
    explanation:'There are <b>5 steps</b> in proper hand washing: Wet, Soap, Rub, Rinse, Dry.' }),

  makeTF({ id:'g1he-hyg-022', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'We should wash our hands before eating.',
    answer:true,
    explanation:'<b>True.</b> Washing hands before eating removes germs that could make us sick.' }),

  makeMCQ({ id:'g1he-hyg-023', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'When ELSE should we wash our hands?',
    options:['After using the toilet','Before sleeping','While watching TV','Before combing hair'],
    answer:'After using the toilet',
    hint:'Think about when germs get on our hands.',
    explanation:'We should wash our hands <b>after using the toilet</b> to remove germs and stop them spreading.' }),

  makeTF({ id:'g1he-hyg-024', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'We can wash our hands with water alone — we do not need soap.',
    answer:false,
    explanation:'<b>False.</b> We need <b>both water and soap</b>. Soap kills germs that water alone cannot remove.' }),

  makeMCQ({ id:'g1he-hyg-025', chapterId:'g1he-hygiene', difficulty:2, subsection:'hand_washing',
    question:'Why is it important to wash our hands?',
    options:['To remove germs and stop us getting sick','To make them softer','To make them smell nice','To make them look bigger'],
    answer:'To remove germs and stop us getting sick',
    hint:'Think about what germs do.',
    explanation:'Washing our hands removes <b>germs</b> that can make us sick. Clean hands keep us healthy.' }),

  makeMCQ({ id:'g1he-hyg-026', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'What should we use to dry our hands?',
    options:['A clean towel','Our school uniform','Our hair','Blowing on them only'],
    answer:'A clean towel',
    hint:'We need something clean to dry with.',
    explanation:'We should use a <b>clean towel</b> to dry our hands after washing.' }),

  makeTF({ id:'g1he-hyg-027', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'We should wash our hands before and after preparing food.',
    answer:true,
    explanation:'<b>True.</b> Clean hands keep food safe from germs.' }),

  makeMCQ({ id:'g1he-hyg-028', chapterId:'g1he-hygiene', difficulty:2, subsection:'hand_washing',
    question:'Maria washes her hands with water but no soap. Is this good enough?',
    options:['No — soap is needed to kill germs','Yes — water is enough','Yes — if she rubs hard enough','No — she should use juice instead'],
    answer:'No — soap is needed to kill germs',
    hint:'What does soap do that water alone cannot?',
    explanation:'<b>No</b> — soap is needed to kill and remove germs. Water alone does not kill all germs.' }),

  makeMCQ({ id:'g1he-hyg-029', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'What should we wash our hands with?',
    options:['Water and soap','Juice','Sand and water','Only our clothes'],
    answer:'Water and soap',
    hint:'Two things are needed.',
    explanation:'We wash our hands with <b>water and soap</b> to clean away germs properly.' }),

  makeTF({ id:'g1he-hyg-030', chapterId:'g1he-hygiene', difficulty:1, subsection:'hand_washing',
    question:'Washing hands after playing outside is a good habit.',
    answer:true,
    explanation:'<b>True.</b> Playing outside puts germs on our hands. Washing them removes those germs.' }),

  // ── dental_care (031–060) ─────────────────────────────────────────────────

  makeMCQ({ id:'g1he-hyg-031', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'How many times a day should you brush your teeth?',
    options:['2 times','1 time','5 times','Only when eating sweets'],
    answer:'2 times',
    hint:'Think about morning and night.',
    explanation:'We should brush our teeth <b>2 times a day</b> — in the morning and before bed.' }),

  makeMCQ({ id:'g1he-hyg-032', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'When should you brush your teeth?',
    options:['In the morning and before bed','Only in the evening','Only in the morning','Whenever you feel like it'],
    answer:'In the morning and before bed',
    hint:'Think about the best times to brush.',
    explanation:'Brush your teeth <b>in the morning</b> (to start the day clean) <b>and before bed</b> (to remove food before sleep).' }),

  makeMCQ({ id:'g1he-hyg-033', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'What do we use to brush our teeth?',
    options:['A toothbrush and toothpaste','A cloth and water','A comb and soap','Our fingers only'],
    answer:'A toothbrush and toothpaste',
    hint:'Think about what is in the bathroom.',
    explanation:'We use a <b>toothbrush and toothpaste</b> to brush our teeth properly.' }),

  makeTF({ id:'g1he-hyg-034', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Brushing our teeth keeps them clean and prevents holes (cavities).',
    answer:true,
    explanation:'<b>True.</b> Brushing removes food and sugar that cause cavities (holes in teeth).' }),

  makeMCQ({ id:'g1he-hyg-035', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'How much toothpaste should you put on your toothbrush?',
    options:['A small amount (pea-sized)','A very large squeeze','No toothpaste at all','A full tube'],
    answer:'A small amount (pea-sized)',
    hint:'More toothpaste is not better.',
    explanation:'We only need <b>a small (pea-sized) amount</b> of toothpaste. Using too much is wasteful and not better.' }),

  makeMCQ({ id:'g1he-hyg-036', chapterId:'g1he-hygiene', difficulty:2, subsection:'dental_care',
    question:'Why do we brush our teeth?',
    options:['To keep them clean and prevent cavities','To make them fall out sooner','To eat faster','To grow new teeth immediately'],
    answer:'To keep them clean and prevent cavities',
    hint:'Think about what happens if we do not brush.',
    explanation:'We brush our teeth <b>to keep them clean</b> and prevent cavities (holes). Sugar and food left on teeth cause damage.' }),

  makeTF({ id:'g1he-hyg-037', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Eating too many sweets and not brushing can cause holes in our teeth.',
    answer:true,
    explanation:'<b>True.</b> Sugar from sweets feeds bacteria that damage teeth, causing cavities (holes).' }),

  makeMCQ({ id:'g1he-hyg-038', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'What should you do after brushing your teeth?',
    options:['Rinse your mouth with water','Eat sweets','Brush your hair','Go back to bed'],
    answer:'Rinse your mouth with water',
    hint:'We need to remove the toothpaste from our mouth.',
    explanation:'After brushing, <b>rinse your mouth with water</b> to remove the toothpaste and any loosened food particles.' }),

  makeTF({ id:'g1he-hyg-039', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'We should visit the dentist to check our teeth.',
    answer:true,
    explanation:'<b>True.</b> Visiting the dentist helps keep our teeth healthy and treats any problems early.' }),

  makeMCQ({ id:'g1he-hyg-040', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Tom brushes his teeth once a week. Is this good?',
    options:['No — he should brush twice every day','Yes — once a week is fine','Yes — once a week is more than enough','No — he should only brush once a month'],
    answer:'No — he should brush twice every day',
    hint:'How many times a day should we brush?',
    explanation:'<b>No</b> — Tom should brush his teeth <b>twice every day</b>. Once a week is not enough to prevent cavities.' }),

  makeMCQ({ id:'g1he-hyg-041', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'When you cough, what should you do?',
    options:['Cover your mouth with a tissue or your elbow','Cough on your friend','Cough with your mouth wide open','Hide under the desk'],
    answer:'Cover your mouth with a tissue or your elbow',
    hint:'Think about stopping germs from spreading.',
    explanation:'When coughing, cover your mouth with <b>a tissue or your elbow</b> to stop germs from spreading to others.' }),

  makeTF({ id:'g1he-hyg-042', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'When you sneeze, you should sneeze directly on your classmates.',
    answer:false,
    explanation:'<b>False.</b> When sneezing, cover your nose and mouth to prevent spreading germs to others.' }),

  makeMCQ({ id:'g1he-hyg-043', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'After blowing your nose into a tissue, what should you do?',
    options:['Throw the tissue away and wash your hands','Keep the tissue in your pocket','Give the tissue to a friend','Use the tissue again and again'],
    answer:'Throw the tissue away and wash your hands',
    hint:'Used tissues carry germs.',
    explanation:'Throw the used tissue <b>in the bin</b> and then <b>wash your hands</b> to remove the germs.' }),

  makeMCQ({ id:'g1he-hyg-044', chapterId:'g1he-hygiene', difficulty:2, subsection:'dental_care',
    question:'Priya has a cold and needs to sneeze. She has no tissue. What is the BEST thing to do?',
    options:['Sneeze into her elbow','Sneeze on the table','Sneeze on her friend','Do nothing'],
    answer:'Sneeze into her elbow',
    hint:'What can we use if we have no tissue?',
    explanation:'If there is no tissue, sneeze into your <b>elbow</b>. This stops germs from spreading to your hands or others.' }),

  makeTF({ id:'g1he-hyg-045', chapterId:'g1he-hygiene', difficulty:1, subsection:'dental_care',
    question:'Good hygiene keeps germs away and helps us to be healthy.',
    answer:true,
    explanation:'<b>True.</b> All good hygiene habits — washing hands, brushing teeth, covering coughs — work together to keep us healthy.' })

);

})();
