'use strict';
// Grade 6 English — Chapter: Advanced Vocabulary
// IDs format: g6eng-voc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-voc-001', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'Which pair are HOMOPHONES?',
    options:['affect / effect','fast / slow','write / right','bear / bare bear'],
    answer:'write / right',
    hint:'Homophones sound the same but have different spellings and meanings.',
    explanation:'"<b>Write / right</b>" are homophones — they sound identical but have different meanings (write = to pen words; right = correct, or direction). "Affect/effect" are not homophones (they sound slightly different and are commonly confused). "Bear/bare" are also homophones.' }),

  makeMCQ({ id:'g6eng-voc-002', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'"Stationary" and "stationery" are easily confused. Which is CORRECT: "The car remained ___ at the red light."',
    options:['stationery','stationary','stationairy','stationnary'],
    answer:'stationary',
    hint:'Stationary (adjective) = not moving. Stationery (noun) = pens, paper etc.',
    explanation:'"<b>Stationary</b>" (adjective) = not moving, still. Memory trick: stationAry = stAy. "StationEry" = pEns and papEr — both contain the letter E. "The car remained stationary" = the car stayed still.' }),

  makeMCQ({ id:'g6eng-voc-003', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'The root "port" means "carry". Which word does NOT come from this root?',
    options:['transport','portable','import','portion'],
    answer:'portion',
    hint:'Transport = carry across. Portable = able to be carried. Import = carry in.',
    explanation:'"<b>Portion</b>" does NOT come from the Latin root "port" (carry) — it comes from a different root meaning "part" or "share". Transport = carry across, portable = can be carried, import = carry in, export = carry out.' }),

  makeMCQ({ id:'g6eng-voc-004', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'The Greek root "tele" means FAR. Which word uses this root?',
    options:['telephone','television','telescope','All three'],
    answer:'All three',
    hint:'Think of all words beginning with "tele-".',
    explanation:'"<b>All three</b>" — tele (far) + phone (sound) = telephone (hearing sounds from far); tele + vision (see) = television (seeing from far); tele + scope (see/examine) = telescope (seeing far objects). Greek: tele = far, bio = life, geo = earth, photo = light.' }),

  makeMCQ({ id:'g6eng-voc-005', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'What is the difference between "affect" and "effect"?',
    options:[
      'They are exactly the same word.',
      '"Affect" is usually a verb (to influence); "effect" is usually a noun (the result).',
      '"Affect" is a noun; "effect" is a verb.',
      'Both are adjectives meaning the same thing.'
    ],
    answer:'"Affect" is usually a verb (to influence); "effect" is usually a noun (the result).',
    hint:'"The pollution affected the river." / "The effect of pollution was devastating."',
    explanation:'"<b>Affect</b>" (verb) = to have an influence on: "Stress can affect your health." "<b>Effect</b>" (noun) = the result or outcome: "The effect of stress on health is well documented." Memory tip: Affect = Action (verb). Effect = End result (noun). Note: "effect" can also be a rare verb meaning "to bring about".' }),

  makeMCQ({ id:'g6eng-voc-006', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'The Latin root "aud" means HEAR. Which word contains this root?',
    options:['audible','audio','audience','All three'],
    answer:'All three',
    hint:'Audible = able to be heard. Audio = sound. Audience = those who hear.',
    explanation:'"<b>All three</b>" — from Latin aud (hear): audible (able to be heard), audio (relating to sound), audience (those who listen/watch). Also: auditorium, audition, inaudible. Other Latin roots: vis (see: visible, vision), scrib (write: describe, script).' }),

  makeTF({ id:'g6eng-voc-007', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'"Principal" (the school principal) and "principle" (a moral rule) are homophones.',
    answer:true,
    hint:'Say both words aloud — do they sound the same?',
    explanation:'<b>True.</b> "Principal" and "principle" are homophones — they sound identical but have different meanings. Principal = most important (adjective) OR the head of a school (noun). Principle = a fundamental rule or belief. Memory: "The principal is your PAL." "A principle is a ruLE."' }),

  makeMCQ({ id:'g6eng-voc-008', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'"The word \'rupture\' comes from the Latin root \'rupt\' meaning BREAK." Which other word shares this root?',
    options:['interrupt','erupt','corrupt','All three'],
    answer:'All three',
    hint:'Think of words with -rupt: inter-rupt, e-rupt, cor-rupt.',
    explanation:'"<b>All three</b>" — from Latin rupt (break): interrupt (break between), erupt (break out — as a volcano), corrupt (completely broken/spoiled). Also: abrupt, disrupt, bankruptcy (via Germanic related root). Knowing roots helps with unfamiliar vocabulary.' }),

  makeMCQ({ id:'g6eng-voc-009', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'What does "complement" mean? (Different from "compliment")',
    options:[
      'To praise or say something nice about someone',
      'Something that completes or goes well with something else',
      'A type of sentence structure',
      'An instruction to complete a task'
    ],
    answer:'Something that completes or goes well with something else',
    hint:'"Complement" contains "complete". "Compliment" contains the letter i (like "I like you").',
    explanation:'"<b>Complement</b>" = something that completes or pairs well: "The sauce is the perfect complement to the dish." "Compliment" = praise: "She gave him a compliment on his work." Memory trick: Complement = Complete. Compliment = I like you (contains I).' }),

  makeMCQ({ id:'g6eng-voc-010', chapterId:'g6eng-vocabulary', difficulty:2,
    question:'The Greek root "bio" means LIFE. In which word is this root NOT present?',
    options:['biology','biography','biosphere','bibliography'],
    answer:'bibliography',
    hint:'"Bibliography" — break it apart: biblio + graphy. What does "biblio" mean?',
    explanation:'"<b>Bibliography</b>" — "biblio" comes from Greek "biblion" (book), not "bios" (life). So bibliography = list of books, not related to "life". Biology (study of life), biography (writing about a life), biosphere (the sphere of life on Earth) — all from bios.' })

);
