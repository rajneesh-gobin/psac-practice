'use strict';
// Grade 6 English — Chapter: Verbs, Tenses & Voice
// IDs format: g6eng-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-verb-001', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which tense is used in: "She has already eaten lunch."',
    options:['past simple','present perfect','past continuous','present simple'],
    answer:'present perfect',
    hint:'The structure is have/has + past participle.',
    explanation:'"Has eaten" is the <b>present perfect</b> tense (have/has + past participle). It is used for a past action that has relevance to the present. The word "already" is a common clue for the present perfect.' }),

  makeMCQ({ id:'g6eng-verb-002', chapterId:'g6eng-verbs', difficulty:2,
    question:'Rewrite in PASSIVE VOICE: "The chef prepared the meal."',
    options:[
      'The meal prepared by the chef.',
      'The meal was prepared by the chef.',
      'The meal is prepared by the chef.',
      'The chef was prepared by the meal.'
    ],
    answer:'The meal was prepared by the chef.',
    hint:'Passive = Object becomes subject + was/were + past participle + by + agent.',
    explanation:'"<b>The meal was prepared by the chef.</b>" — Passive voice: the object (meal) becomes the subject; verb becomes was/were + past participle (was prepared); the original subject becomes "by + agent" (by the chef).' }),

  makeMCQ({ id:'g6eng-verb-003', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which sentence uses the PAST PERFECT tense?',
    options:[
      'She was eating when he called.',
      'They have visited Paris before.',
      'By the time we arrived, the film had already started.',
      'He will have finished by Friday.'
    ],
    answer:'By the time we arrived, the film had already started.',
    hint:'Past perfect = had + past participle. It refers to an action completed BEFORE another past action.',
    explanation:'"The film <b>had already started</b>" is past perfect (had + past participle). It shows the film started before our arrival (another past event). Past perfect puts one past action further back in time than another.' }),

  makeMCQ({ id:'g6eng-verb-004', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which modal verb expresses OBLIGATION or NECESSITY?',
    options:['might','could','must','would'],
    answer:'must',
    hint:'Which modal is used in rules and instructions: "You ___ wear a seatbelt."',
    explanation:'"<b>Must</b>" expresses obligation or strong necessity: "You must wear a seatbelt." Other modals: might/could = possibility, would = conditional, should = advice/recommendation, may = permission.' }),

  makeTF({ id:'g6eng-verb-005', chapterId:'g6eng-verbs', difficulty:2,
    question:'In the passive voice, the object of the active sentence becomes the subject.',
    answer:true,
    hint:'Active: "The dog bit the boy." → Passive: "The boy was bitten by the dog." What is the subject of each?',
    explanation:'<b>True.</b> In "The dog bit the boy" → active: subject=dog, object=boy. In passive "The boy was bitten by the dog" → subject=boy (formerly the object). The passive moves the focus from the doer to the receiver of the action.' }),

  makeMCQ({ id:'g6eng-verb-006', chapterId:'g6eng-verbs', difficulty:2,
    question:'"By the time the match ends, they ___ for three hours." — correct future perfect?',
    options:['will play','are playing','will have been playing','played'],
    answer:'will have been playing',
    hint:'Future perfect continuous = will have been + -ing. Expresses an ongoing action completed at a future point.',
    explanation:'"They <b>will have been playing</b> for three hours" — future perfect continuous (will have been + -ing) describes an action that will be ongoing and completed at a specific future time. Simple future perfect: "will have played" (also acceptable).' }),

  makeMCQ({ id:'g6eng-verb-007', chapterId:'g6eng-verbs', difficulty:1,
    question:'Which sentence is in the ACTIVE voice?',
    options:[
      'The cake was baked by Mary.',
      'The window was broken.',
      'Mary baked the cake.',
      'The letter was written in English.'
    ],
    answer:'Mary baked the cake.',
    hint:'In the active voice, the subject PERFORMS the action.',
    explanation:'"<b>Mary baked the cake</b>" is active — Mary (subject) performs the action (baked). The others are passive — the subject receives the action ("cake was baked", "window was broken", "letter was written").' }),

  makeMCQ({ id:'g6eng-verb-008', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which is the correct PRESENT PERFECT form?',
    options:['I have went to the market.','She has went shopping.','He has gone to school.','They have go home.'],
    answer:'He has gone to school.',
    hint:'Present perfect = has/have + PAST PARTICIPLE. The past participle of "go" is "gone".',
    explanation:'"<b>He has gone to school.</b>" — "gone" is the past participle of "go" (go → went → gone). Common error: "has went" — "went" is past simple, not a past participle. Use "gone" with has/have.' }),

  makeTF({ id:'g6eng-verb-009', chapterId:'g6eng-verbs', difficulty:2,
    question:'"Could" can be used to make a polite request.',
    answer:true,
    hint:'Think of: "Could you pass the salt, please?"',
    explanation:'<b>True.</b> "Could" is used for polite requests: "Could you help me?" It is the past form of "can" but is often used in present/future polite contexts. "Could" is softer and more polite than "can".' }),

  makeMCQ({ id:'g6eng-verb-010', chapterId:'g6eng-verbs', difficulty:2,
    question:'Convert to passive: "Scientists discovered a new species."',
    options:[
      'A new species is discovered by scientists.',
      'A new species was discovered by scientists.',
      'A new species had been discovered by scientists.',
      'Scientists were discovered by a new species.'
    ],
    answer:'A new species was discovered by scientists.',
    hint:'The original sentence is past simple (discovered) → passive = was/were + past participle.',
    explanation:'"<b>A new species was discovered by scientists.</b>" — Past simple active → past simple passive: was/were + past participle. "Discovered" → "was discovered". The object (a new species) becomes the subject.' })

);
