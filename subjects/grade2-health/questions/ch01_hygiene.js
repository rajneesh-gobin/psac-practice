'use strict';
(function () {

// Grade 2 Health Education — Hygiene and Grooming
// IDs: g2he-hyg-001 onwards
// Subsections: grooming, hand_dental, illness_hygiene

STATIC_QUESTIONS.push(

  // ── grooming (001–025) ────────────────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-001', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Which of these is part of good daily grooming?',
    options:['Combing hair, wearing clean clothes and trimming nails','Only eating well','Only drinking water','Only exercising'],
    answer:'Combing hair, wearing clean clothes and trimming nails',
    hint:'Grooming involves caring for the whole body.',
    explanation:'Good daily grooming includes <b>combing hair, wearing clean clothes and trimming nails</b> to look and feel our best.' }),

  makeMCQ({ id:'g2he-hyg-002', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'How often should you change your underwear?',
    options:['Every day','Once a week','Only when dirty','Every month'],
    answer:'Every day',
    hint:'Clean underwear is part of daily hygiene.',
    explanation:'Underwear should be changed <b>every day</b> as part of good personal hygiene.' }),

  makeTF({ id:'g2he-hyg-003', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Trimming our nails regularly is part of good hygiene.',
    answer:true,
    explanation:'<b>True.</b> Long, dirty nails can harbour germs and bacteria. Trimming them keeps us hygienic.' }),

  makeMCQ({ id:'g2he-hyg-004', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'Why should we keep our nails short and clean?',
    options:['To prevent germs hiding under them','To run faster','To write better','To look older'],
    answer:'To prevent germs hiding under them',
    hint:'Think about what can hide under long nails.',
    explanation:'Germs and dirt can <b>hide under long nails</b>. Keeping nails short and clean prevents these germs from getting into our food or body.' }),

  makeMCQ({ id:'g2he-hyg-005', chapterId:'g2he-hygiene', difficulty:2, subsection:'grooming',
    question:'Raj has not bathed in three days. What is MOST LIKELY to happen?',
    options:['His body will smell and bacteria will build up on his skin','He will become stronger','Nothing will happen','He will get taller'],
    answer:'His body will smell and bacteria will build up on his skin',
    hint:'Think about what dirt and sweat do over time.',
    explanation:'Without bathing, <b>bacteria build up on the skin</b> and the body develops an unpleasant smell. Daily bathing is important.' }),

  makeTF({ id:'g2he-hyg-006', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'We should wear clean clothes every day to school.',
    answer:true,
    explanation:'<b>True.</b> Clean clothes are part of good hygiene. Dirty clothes can carry germs and bacteria.' }),

  makeMCQ({ id:'g2he-hyg-007', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'What should you use to wash your hair?',
    options:['Shampoo and water','Only water','Soap only','Toothpaste'],
    answer:'Shampoo and water',
    hint:'There is a special product made for hair.',
    explanation:'We use <b>shampoo and water</b> to wash our hair, removing dirt, oil and any germs.' }),

  makeMCQ({ id:'g2he-hyg-008', chapterId:'g2he-hygiene', difficulty:2, subsection:'grooming',
    question:'Which of these is NOT part of good personal grooming?',
    options:['Wearing the same unwashed clothes for a week','Brushing teeth twice a day','Combing hair daily','Bathing every day'],
    answer:'Wearing the same unwashed clothes for a week',
    hint:'Think about which option is unhygienic.',
    explanation:'Wearing <b>the same unwashed clothes for a week</b> is not hygienic. Clothes should be washed regularly.' }),

  makeTF({ id:'g2he-hyg-009', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'We should bathe or shower every day to keep our body clean.',
    answer:true,
    explanation:'<b>True.</b> Daily bathing removes sweat, dirt and bacteria, keeping our skin healthy.' }),

  makeMCQ({ id:'g2he-hyg-010', chapterId:'g2he-hygiene', difficulty:1, subsection:'grooming',
    question:'What does good grooming help us with?',
    options:['Staying clean, feeling confident and staying healthy','Only looking nice for photographs','Eating faster','Running faster'],
    answer:'Staying clean, feeling confident and staying healthy',
    hint:'Grooming has more than one benefit.',
    explanation:'Good grooming helps us <b>stay clean, feel confident about ourselves and stay healthy</b> by preventing germs.' }),

  // ── hand_dental (011–035) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-011', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'List the correct order for hand washing.',
    options:['Wet → Soap → Rub → Rinse → Dry','Soap → Wet → Dry → Rub → Rinse','Dry → Rub → Soap → Wet → Rinse','Rinse → Soap → Wet → Rub → Dry'],
    answer:'Wet → Soap → Rub → Rinse → Dry',
    hint:'Think about the logical order starting with water.',
    explanation:'The correct order is: <b>Wet → Soap → Rub → Rinse → Dry</b>. Each step is important.' }),

  makeMCQ({ id:'g2he-hyg-012', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'How long should you rub your hands together with soap?',
    options:['At least 20 seconds','Just one second','Only when they look dirty','Until the soap is gone'],
    answer:'At least 20 seconds',
    hint:'Think about singing "Happy Birthday" twice.',
    explanation:'Rubbing for <b>at least 20 seconds</b> (the time it takes to sing "Happy Birthday" twice) removes germs effectively.' }),

  makeMCQ({ id:'g2he-hyg-013', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Name THREE times when you should wash your hands.',
    options:['Before eating, after using the toilet, and after playing outside',
             'Only after eating',
             'Only when a teacher tells you to',
             'Only in the morning'],
    answer:'Before eating, after using the toilet, and after playing outside',
    hint:'Think about when our hands pick up most germs.',
    explanation:'We should wash hands <b>before eating, after using the toilet, and after playing outside</b> — these are the times germs spread most.' }),

  makeTF({ id:'g2he-hyg-014', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'You should wash between your fingers when washing your hands.',
    answer:true,
    explanation:'<b>True.</b> Germs hide between fingers. Rubbing between each finger ensures thorough cleaning.' }),

  makeMCQ({ id:'g2he-hyg-015', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'How many times a day should you brush your teeth?',
    options:['Twice — morning and before bed','Once — in the morning only','Five times a day','Only after eating sweet foods'],
    answer:'Twice — morning and before bed',
    hint:'Think about when your mouth is dirtiest.',
    explanation:'Brush <b>twice a day</b>: in the morning to start the day fresh, and before bed to remove all the day\'s food particles.' }),

  makeMCQ({ id:'g2he-hyg-016', chapterId:'g2he-hygiene', difficulty:2, subsection:'hand_dental',
    question:'Why is it especially important to brush your teeth BEFORE BED?',
    options:['Food left on teeth overnight feeds bacteria that cause cavities','The toothpaste smells nice','The toothbrush is new','It makes you dream nicely'],
    answer:'Food left on teeth overnight feeds bacteria that cause cavities',
    hint:'Think about what happens to food left on teeth for many hours.',
    explanation:'<b>Food left on teeth overnight</b> feeds bacteria that produce acid, which causes <b>cavities</b> (holes in teeth).' }),

  makeTF({ id:'g2he-hyg-017', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Flossing (cleaning between teeth) is also important for good dental hygiene.',
    answer:true,
    explanation:'<b>True.</b> Flossing removes food and plaque from between teeth where a toothbrush cannot reach.' }),

  makeMCQ({ id:'g2he-hyg-018', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'What causes tooth decay (holes in teeth)?',
    options:['Bacteria that feed on sugar and produce acid','Eating too many vegetables','Drinking too much water','Brushing too often'],
    answer:'Bacteria that feed on sugar and produce acid',
    hint:'Think about what happens when sugar sits on teeth.',
    explanation:'<b>Bacteria feed on sugar</b> left on teeth and produce acid. This acid breaks down tooth enamel causing decay (cavities).' }),

  makeMCQ({ id:'g2he-hyg-019', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'When should you change your toothbrush?',
    options:['Every 3 months or when the bristles are worn','Never — use it your whole life','Every 10 years','Only when it breaks'],
    answer:'Every 3 months or when the bristles are worn',
    hint:'Worn bristles do not clean teeth as well.',
    explanation:'Replace your toothbrush <b>every 3 months</b> or sooner if the bristles are splayed — worn bristles cannot clean teeth effectively.' }),

  makeTF({ id:'g2he-hyg-020', chapterId:'g2he-hygiene', difficulty:1, subsection:'hand_dental',
    question:'Hand sanitiser can be used when there is no water and soap available.',
    answer:true,
    explanation:'<b>True.</b> Hand sanitiser with at least 60% alcohol can kill many germs when water and soap are unavailable.' }),

  // ── illness_hygiene (021–045) ─────────────────────────────────────────────

  makeMCQ({ id:'g2he-hyg-021', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'How do germs spread from a sick person to a healthy person?',
    options:['Through sneezing, coughing, touching and not washing hands',
             'Only through drinking the same cup',
             'Only by sitting next to each other',
             'Only by looking at each other'],
    answer:'Through sneezing, coughing, touching and not washing hands',
    hint:'Think about how germs travel.',
    explanation:'Germs spread through <b>sneezing, coughing, direct touching and not washing hands</b>. Good hygiene breaks this chain.' }),

  makeMCQ({ id:'g2he-hyg-022', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'What should you do when you sneeze or cough?',
    options:['Cover your mouth and nose with a tissue or your elbow','Sneeze directly onto your classmates','Sneeze into your hands then shake hands with others','Do nothing'],
    answer:'Cover your mouth and nose with a tissue or your elbow',
    hint:'We need to stop the germ droplets from reaching others.',
    explanation:'Always <b>cover your mouth and nose with a tissue or your elbow</b> to stop germ-containing droplets spreading.' }),

  makeTF({ id:'g2he-hyg-023', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'If you are sick, you should go to school anyway so you do not miss lessons.',
    answer:false,
    explanation:'<b>False.</b> Going to school when sick can <b>spread illness to classmates and teachers</b>. It is better to stay home and recover.' }),

  makeMCQ({ id:'g2he-hyg-024', chapterId:'g2he-hygiene', difficulty:2, subsection:'illness_hygiene',
    question:'Lena sneezes into her hands, then shakes hands with her friend. What is the problem?',
    options:['The germs on her hands are now passed to her friend','Nothing — this is fine','Her friend will become taller','Her friend will feel colder'],
    answer:'The germs on her hands are now passed to her friend',
    hint:'Think about where the germs went.',
    explanation:'Germs from Lena\'s sneeze are now on her hands. When she shakes hands, those <b>germs transfer to her friend</b>. She should have washed her hands first.' }),

  makeTF({ id:'g2he-hyg-025', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Used tissues should be thrown in a bin immediately after use.',
    answer:true,
    explanation:'<b>True.</b> Used tissues carry germs. Putting them in the bin straight away prevents germs spreading.' }),

  makeMCQ({ id:'g2he-hyg-026', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Which of these habits helps PREVENT illness from spreading?',
    options:['Washing hands regularly, covering coughs and not sharing utensils',
             'Sharing drinks with sick friends',
             'Coughing openly without covering your mouth',
             'Going to school even when very ill'],
    answer:'Washing hands regularly, covering coughs and not sharing utensils',
    hint:'Think about what stops germs moving from person to person.',
    explanation:'<b>Washing hands, covering coughs and not sharing utensils</b> all prevent germs from spreading from person to person.' }),

  makeMCQ({ id:'g2he-hyg-027', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Why should you NOT share your water bottle with others?',
    options:['Germs from the mouth can spread through shared bottles','Water bottles are very heavy','Your drink might taste different','There is not enough water'],
    answer:'Germs from the mouth can spread through shared bottles',
    hint:'Think about saliva and germs.',
    explanation:'<b>Germs from one person\'s mouth</b> can transfer to the bottle and then to the next person who drinks. Always use your own bottle.' }),

  makeTF({ id:'g2he-hyg-028', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'A clean environment at home and school helps reduce the spread of illness.',
    answer:true,
    explanation:'<b>True.</b> Germs can live on dirty surfaces. Regular cleaning removes them and reduces infection risk.' }),

  makeMCQ({ id:'g2he-hyg-029', chapterId:'g2he-hygiene', difficulty:2, subsection:'illness_hygiene',
    question:'What is the MAIN purpose of washing hands after using the toilet?',
    options:['To remove germs that can cause stomach illness','To make hands look clean','To cool hands down','To remove colour from hands'],
    answer:'To remove germs that can cause stomach illness',
    hint:'Think about what kinds of germs are found in the toilet area.',
    explanation:'<b>Germs from faeces</b> (waste) can remain on hands after using the toilet. These cause serious stomach illnesses if not washed off.' }),

  makeTF({ id:'g2he-hyg-030', chapterId:'g2he-hygiene', difficulty:1, subsection:'illness_hygiene',
    question:'Germs are too small to see with our eyes.',
    answer:true,
    explanation:'<b>True.</b> Germs (bacteria and viruses) are microscopic — we cannot see them with the naked eye. This is why regular hand washing is so important.' })

);

})();
