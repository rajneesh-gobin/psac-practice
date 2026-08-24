'use strict';
// Grade 4 English — Chapter: Verbs & Tenses
// IDs format: g4eng-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-verb-001', chapterId:'g4eng-verbs', difficulty:1,
    question:'Which word is the VERB in: "The dog runs fast."',
    options:['The','dog','runs','fast'],
    answer:'runs',
    hint:'A verb shows an action or a state. What is the dog doing?',
    explanation:'"<b>Runs</b>" is the verb — it shows the action the dog is doing. Verbs are "doing" words (run, jump, eat, sleep) or "being" words (is, are, was, were). Every sentence must have a verb.' }),

  makeMCQ({ id:'g4eng-verb-002', chapterId:'g4eng-verbs', difficulty:1,
    question:'Choose the correct form: "She ___ her homework every evening."',
    options:['do','does','done','doing'],
    answer:'does',
    hint:'For he/she/it in the present simple, add -s or -es to the verb.',
    explanation:'With "she" (third person singular), we add <b>-es</b> to "do" → <b>does</b>. Present simple rule: I/you/we/they + base verb; he/she/it + verb-s/es: he runs, she watches, it flies.' }),

  makeMCQ({ id:'g4eng-verb-003', chapterId:'g4eng-verbs', difficulty:1,
    question:'What is the PAST TENSE of "walk"?',
    options:['walk','walking','walked','walks'],
    answer:'walked',
    hint:'For regular verbs, add -ed to form the past tense.',
    explanation:'The past tense of "walk" is <b>walked</b>. Regular past tense rule: add -ed. Examples: walk→walked, jump→jumped, play→played, clean→cleaned. These are regular verbs — they all follow the same rule.' }),

  makeTF({ id:'g4eng-verb-004', chapterId:'g4eng-verbs', difficulty:1,
    question:'The past tense of "go" is "goed".',
    answer:false,
    hint:'Is "go" a regular verb? Regular verbs add -ed. Irregular verbs have special past tense forms.',
    explanation:'<b>False.</b> "Go" is an <b>irregular verb</b>. Its past tense is <b>went</b>, not "goed". Irregular past tenses must be memorised: go→went, see→saw, eat→ate, run→ran, come→came, have→had, write→wrote.' }),

  makeMCQ({ id:'g4eng-verb-005', chapterId:'g4eng-verbs', difficulty:2,
    question:'Which sentence uses the PRESENT CONTINUOUS correctly?',
    options:[
      'She is reads a book right now.',
      'She are reading a book right now.',
      'She is reading a book right now.',
      'She reading a book right now.'
    ],
    answer:'She is reading a book right now.',
    hint:'Present continuous = is/am/are + verb-ing. The verb must have both parts.',
    explanation:'"<b>She is reading</b>" is correct. Present continuous formula: subject + is/am/are + verb-ing. It describes an action happening right now. "She" uses "is". "Reading" = read + -ing. You must include both the auxiliary (is) and the -ing form.' }),

  makeMCQ({ id:'g4eng-verb-006', chapterId:'g4eng-verbs', difficulty:2,
    question:'What is the PAST TENSE of "eat"?',
    options:['eated','eaten','ate','eats'],
    answer:'ate',
    hint:'"Eat" is an irregular verb — it does not follow the -ed rule.',
    explanation:'The past tense of "eat" is <b>ate</b>. "Eaten" is the past participle (used with has/have: "I have eaten"). Irregular verbs: eat/ate/eaten, drink/drank/drunk, swim/swam/swum, write/wrote/written.' }),

  makeMCQ({ id:'g4eng-verb-007', chapterId:'g4eng-verbs', difficulty:2,
    question:'Choose the correct verb: "The birds ___ in the sky."',
    options:['fly','flies','flying','flied'],
    answer:'fly',
    hint:'The subject is "birds" (plural). Which verb form is used with a plural subject?',
    explanation:'"<b>Fly</b>" — "birds" is plural (they), so we use the base verb without -s. Rule: singular subject → verb + s (the bird flies). Plural subject → base verb (the birds fly). This is called subject-verb agreement.' }),

  makeNum({ id:'g4eng-verb-008', chapterId:'g4eng-verbs', difficulty:2,
    question:'How many VERBS are in: "Tara ran to school, ate her lunch and played football."? Write a number.',
    answer:'3', acceptableAnswers:['3'],
    hint:'Find all the action words — each action is a separate verb.',
    explanation:'There are <b>3 verbs</b>: "ran", "ate", "played". All three are past tense verbs listed one after another. Sentences can have more than one verb when listing actions joined by "and".' }),

  makeMCQ({ id:'g4eng-verb-009', chapterId:'g4eng-verbs', difficulty:3,
    question:'Which sentence uses verbs CORRECTLY throughout?',
    options:[
      'Yesterday, I go to the shop and buys milk.',
      'Yesterday, I went to the shop and bought milk.',
      'Yesterday, I gone to the shop and buyed milk.',
      'Yesterday, I was go to the shop and buy milk.'
    ],
    answer:'Yesterday, I went to the shop and bought milk.',
    hint:'"Yesterday" tells you both actions happened in the past. Both verbs must be in the past tense.',
    explanation:'"<b>Went</b>" and "<b>bought</b>" are both correct irregular past tense forms. "Yesterday" is a past time signal — all verbs in the sentence must match (past tense). go→went, buy→bought.' }),

  makeMCQ({ id:'g4eng-verb-010', chapterId:'g4eng-verbs', difficulty:4,
    question:'Riya wrote in her diary: "Today was a great day. I ___ (wake) up early, ___ (brush) my teeth and ___ (help) my mother cook breakfast." Which set of verbs correctly fills the blanks?',
    options:[
      'wake, brush, help',
      'woke, brushed, helped',
      'woken, brushed, helped',
      'waking, brushing, helping'
    ],
    answer:'woke, brushed, helped',
    hint:'The diary says "Today was a great day" — past tense context. Fill in the past tense of each bracketed verb.',
    explanation:'"Today was" sets the past tense context. <b>Woke</b> = irregular past of "wake". <b>Brushed</b> = regular past of "brush" (+ed). <b>Helped</b> = regular past of "help" (+ed). All three verbs must match the past tense set by "Today was a great day."' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-verb-011', chapterId:'g4eng-verbs', difficulty:1,
    question:'Which sentence is in the FUTURE tense?',
    options:[
      'She plays tennis every day.',
      'She played tennis yesterday.',
      'She will play tennis tomorrow.',
      'She is playing tennis now.'
    ],
    answer:'She will play tennis tomorrow.',
    hint:'The future tense uses "will" + base verb to describe what will happen later.',
    explanation:'"<b>She will play tennis tomorrow</b>" is the future tense. Formula: will + base verb (play, not plays or played). Time signals: yesterday = past, now/today = present, tomorrow/soon = future.' }),

  makeMCQ({ id:'g4eng-verb-012', chapterId:'g4eng-verbs', difficulty:1,
    question:'What is the PAST TENSE of "write"?',
    options:['writed','written','wrote','writes'],
    answer:'wrote',
    hint:'"Write" is an irregular verb. Its past tense is not "writed".',
    explanation:'The past tense of "write" is <b>wrote</b>. "Written" is the past participle (used with has/have: "She has written"). Irregular sets: write/wrote/written, ring/rang/rung, sing/sang/sung.' }),

  makeTF({ id:'g4eng-verb-013', chapterId:'g4eng-verbs', difficulty:1,
    question:'In "He has finished his work", the word "has" is an auxiliary (helping) verb.',
    answer:true,
    hint:'An auxiliary verb helps the main verb. It comes before the main verb.',
    explanation:'<b>True.</b> "Has" is an <b>auxiliary (helping) verb</b> that helps "finished" form the present perfect tense. Common auxiliary verbs: have/has, is/am/are, was/were, do/does, will, can, should.' }),

  makeMCQ({ id:'g4eng-verb-014', chapterId:'g4eng-verbs', difficulty:2,
    question:'Choose the correct verb form: "She ___ already eaten her lunch."',
    options:['is','was','has','have'],
    answer:'has',
    hint:'Present perfect tense = has/have + past participle. For "she" (singular), which auxiliary?',
    explanation:'"She <b>has</b> already eaten" — present perfect = has/have + past participle. "She" (third person singular) uses "has". Compare: I/you/we/they have eaten; he/she/it has eaten.' }),

  makeMCQ({ id:'g4eng-verb-015', chapterId:'g4eng-verbs', difficulty:2,
    question:'What is the PAST TENSE of "break"?',
    options:['breaked','broken','brake','broke'],
    answer:'broke',
    hint:'"Break" is an irregular verb.',
    explanation:'The past tense of "break" is <b>broke</b>. "Broken" is the past participle (used with has/have: "She has broken the cup"). Irregular sets: break/broke/broken, take/took/taken, shake/shook/shaken.' }),

  makeMCQ({ id:'g4eng-verb-016', chapterId:'g4eng-verbs', difficulty:2,
    question:'Choose the correct verb: "Everyone ___ the school rules."',
    options:['follow','follows','following','followed'],
    answer:'follows',
    hint:'"Everyone" is grammatically singular, even though it seems to mean many people.',
    explanation:'"Everyone <b>follows</b>" — "everyone", "someone", "anyone" and "no one" are all singular. They take a verb+s form: everyone follows, someone needs, no one knows. This is a common subject-verb agreement mistake.' }),

  makeMCQ({ id:'g4eng-verb-017', chapterId:'g4eng-verbs', difficulty:2,
    question:'Which sentence uses the SIMPLE PRESENT tense to express a permanent fact?',
    options:[
      'The sun will rise in the east.',
      'The sun rose in the east.',
      'The sun rises in the east.',
      'The sun is rising in the east.'
    ],
    answer:'The sun rises in the east.',
    hint:'For permanent facts and general truths, we use the simple present tense.',
    explanation:'"<b>The sun rises in the east</b>" — the simple present expresses permanent facts and general truths (always true). "Rises" is the third person singular form (he/she/it + verb+s).' }),

  makeMCQ({ id:'g4eng-verb-018', chapterId:'g4eng-verbs', difficulty:3,
    question:'Which sentence is GRAMMATICALLY CORRECT?',
    options:[
      'Last week, she goes to the dentist.',
      'Last week, she gone to the dentist.',
      'Last week, she went to the dentist.',
      'Last week, she is going to the dentist.'
    ],
    answer:'Last week, she went to the dentist.',
    hint:'"Last week" is a past time signal. Which form of "go" is the correct past tense?',
    explanation:'"<b>Last week, she went to the dentist</b>" — "last week" signals the past. "Went" is the irregular past tense of "go". Never write "goed" or "goes" with a past time signal.' }),

  makeMCQ({ id:'g4eng-verb-019', chapterId:'g4eng-verbs', difficulty:4,
    question:'Meena writes: "I ___ (enjoy) school today. My teacher ___ (give) us a science project. We ___ (learn) about plants and I ___ (bring) home a small cactus." All four actions are past tense. Which set fills the blanks correctly?',
    options:[
      'enjoyed / gave / learnt / brought',
      'enjoy / give / learn / bring',
      'enjoyed / gived / learned / bringed',
      'was enjoying / was giving / was learning / was bringing'
    ],
    answer:'enjoyed / gave / learnt / brought',
    hint:'Check each verb: enjoy (regular: +ed), give (irregular: gave), learn (regular: learnt or learned), bring (irregular: brought).',
    explanation:'"<b>Enjoyed</b>" (enjoy+ed, regular), "<b>gave</b>" (irregular: give→gave), "<b>learnt</b>" (learn+t, regular — "learned" also accepted), "<b>brought</b>" (irregular: bring→brought). Four different verb forms tested in one passage.' })

);
