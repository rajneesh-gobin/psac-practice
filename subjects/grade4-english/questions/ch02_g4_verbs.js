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
