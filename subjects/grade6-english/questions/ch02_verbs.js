'use strict';
// Grade 6 English - Chapter: Verbs, Tenses & Voice
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
    explanation:'"<b>The meal was prepared by the chef.</b>" - Passive voice: the object (meal) becomes the subject; verb becomes was/were + past participle (was prepared); the original subject becomes "by + agent" (by the chef).' }),

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
    question:'"By the time the match ends, they ___ for three hours." - correct future perfect?',
    options:['will play','are playing','will have been playing','played'],
    answer:'will have been playing',
    hint:'Future perfect continuous = will have been + -ing. Expresses an ongoing action completed at a future point.',
    explanation:'"They <b>will have been playing</b> for three hours" - future perfect continuous (will have been + -ing) describes an action that will be ongoing and completed at a specific future time. Simple future perfect: "will have played" (also acceptable).' }),

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
    explanation:'"<b>Mary baked the cake</b>" is active - Mary (subject) performs the action (baked). The others are passive - the subject receives the action ("cake was baked", "window was broken", "letter was written").' }),

  makeMCQ({ id:'g6eng-verb-008', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which is the correct PRESENT PERFECT form?',
    options:['I have went to the market.','She has went shopping.','He has gone to school.','They have go home.'],
    answer:'He has gone to school.',
    hint:'Present perfect = has/have + PAST PARTICIPLE. The past participle of "go" is "gone".',
    explanation:'"<b>He has gone to school.</b>" - "gone" is the past participle of "go" (go → went → gone). Common error: "has went" - "went" is past simple, not a past participle. Use "gone" with has/have.' }),

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
    explanation:'"<b>A new species was discovered by scientists.</b>" - Past simple active → past simple passive: was/were + past participle. "Discovered" → "was discovered". The object (a new species) becomes the subject.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-verb-011', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which sentence uses the PRESENT PERFECT CONTINUOUS tense correctly?',
    options:[
      '"She has finished her homework."',
      '"She was finishing her homework for two hours."',
      '"She has been finishing her homework for two hours."',
      '"She had been finishing her homework."'
    ],
    answer:'"She has been finishing her homework for two hours."',
    hint:'Present perfect continuous = have/has been + verb-ing.',
    explanation:'"She <b>has been finishing</b> her homework for two hours." - <b>Present perfect continuous</b> (have/has + been + -ing) emphasises the ongoing duration of an activity that started in the past and is still happening now. Key signal words: <b>for</b> (duration), <b>since</b> (starting point), <b>all day/all morning</b>. Compare: "has finished" (present perfect simple) = the action is now complete.' }),

  makeMCQ({ id:'g6eng-verb-012', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which modal verb expresses CERTAIN DEDUCTION about the past - you are sure something happened?',
    options:['might have','could have','must have','should have'],
    answer:'must have',
    hint:'"Must have" = I am certain this happened, based on evidence I can see now.',
    explanation:'"<b>Must have</b>" expresses certainty about a past event: "He must have left early - his car is gone." The evidence (no car) leads to a confident conclusion. Modal perfect forms: <b>must have + past participle</b> (certain), <b>might have / could have</b> (possible but uncertain), <b>can\'t have</b> (certain it did NOT happen): "She can\'t have passed - she didn\'t study."' }),

  makeMCQ({ id:'g6eng-verb-013', chapterId:'g6eng-verbs', difficulty:2,
    question:'Convert to FUTURE PASSIVE: "They will announce the results tomorrow."',
    options:[
      'The results are announced tomorrow.',
      'The results will be announced tomorrow.',
      'The results were announced tomorrow.',
      'The results will have announced tomorrow.'
    ],
    answer:'The results will be announced tomorrow.',
    hint:'Future passive = will + be + past participle.',
    explanation:'"<b>The results will be announced tomorrow.</b>" - Future passive: <b>will + be + past participle</b>. The object of the active sentence ("the results") becomes the new subject. The agent ("they") is dropped as it is non-specific. Future passive is common in formal contexts: "Prizes will be awarded...", "Students will be informed..."' }),

  makeTF({ id:'g6eng-verb-014', chapterId:'g6eng-verbs', difficulty:1,
    question:'"Know", "believe" and "belong" are stative verbs that are not normally used in the continuous (-ing) form.',
    answer:true,
    hint:'Stative verbs describe states, not actions - they rarely take the -ing form.',
    explanation:'<b>True.</b> <b>Stative verbs</b> describe permanent or ongoing states - not actions - so they do not normally appear in continuous tenses. Categories from MIE Grade 6: <b>mental states</b> (know, believe, understand, think, remember); <b>emotions</b> (love, hate, like, prefer); <b>possession</b> (have, belong, own); <b>senses</b> (seem, appear). Error: "I am knowing the answer" ✗ → "I know the answer" ✓.' }),

  makeMCQ({ id:'g6eng-verb-015', chapterId:'g6eng-verbs', difficulty:2,
    question:'Choose the correct form: "She ___ in Mauritius since 2015."',
    options:['lives','lived','has been living','is living'],
    answer:'has been living',
    hint:'"Since 2015" = from a point in the past to now. Which tense shows this ongoing continuity?',
    explanation:'"She <b>has been living</b> in Mauritius since 2015." - <b>Present perfect continuous</b> is used for an action that started at a specific past time and continues to the present. <b>Since</b> marks the starting point (since 2015, since Monday, since she was born). <b>For</b> marks the duration (for ten years, for a week). Both trigger present perfect or present perfect continuous.' }),

  makeMCQ({ id:'g6eng-verb-016', chapterId:'g6eng-verbs', difficulty:2,
    question:'Which passive sentence OMITS the agent correctly because it is unknown?',
    options:[
      'The car was stolen by someone unknown.',
      'The car was stolen.',
      'Someone stole the car.',
      'The car is being stolen by thieves.'
    ],
    answer:'The car was stolen.',
    hint:'When we do not know who performed the action, we simply omit "by + agent".',
    explanation:'"<b>The car was stolen.</b>" - We omit the agent when: (1) the agent is <b>unknown</b>; (2) it is <b>obvious</b>; or (3) it is <b>unimportant</b>. This is one of the key reasons to use the passive voice - it shifts focus to the action or the receiver, not the doer. "By someone unknown" is redundant and sounds unnatural.' }),

  makeMCQ({ id:'g6eng-verb-017', chapterId:'g6eng-verbs', difficulty:1,
    question:'Which modal verb is used to give ADVICE or a RECOMMENDATION?',
    options:['must','can','should','will'],
    answer:'should',
    hint:'"You ___ eat more vegetables." - which word gives friendly advice, not a strict rule?',
    explanation:'"<b>Should</b>" gives advice or recommendation: "You should study before the exam." "You should drink more water." Compare modal verbs: <b>must / have to</b> = strong obligation (rules, laws); <b>should / ought to</b> = advice (weaker, recommended); <b>may / might</b> = possibility; <b>can</b> = ability or permission. "Must" commands; "should" advises.' }),

  makeMCQ({ id:'g6eng-verb-018', chapterId:'g6eng-verbs', difficulty:3,
    question:'Identify the error: "The new bridge has been build over the river last year."',
    options:[
      '"has been" should be "was" - wrong tense',
      '"build" should be "built" - wrong past participle',
      'Both errors - the correct sentence is "The new bridge was built over the river last year."',
      'There is no error.'
    ],
    answer:'Both errors - the correct sentence is "The new bridge was built over the river last year."',
    hint:'"Last year" = specific completed past time → past simple passive. Past participle of "build" = "built".',
    explanation:'"<b>The new bridge was built over the river last year.</b>" - Two errors corrected: (1) <b>has been → was</b>: present perfect is NOT used with specific past time expressions (last year, yesterday, in 2020). Use past simple passive instead. (2) <b>build → built</b>: the past participle of "build" is "built" (irregular). Passive always requires the past participle, not the base form.' }),

  makeMCQ({ id:'g6eng-verb-019', chapterId:'g6eng-verbs', difficulty:3,
    question:'What is the difference in meaning between: (A) "She stopped to talk." and (B) "She stopped talking."',
    options:[
      'Both sentences have the same meaning.',
      '(A) she paused in order to have a conversation; (B) she was talking but then ceased.',
      '(A) she was talking but then stopped; (B) she paused to start talking.',
      '(A) uses the infinitive incorrectly; only (B) is correct.'
    ],
    answer:'(A) she paused in order to have a conversation; (B) she was talking but then ceased.',
    hint:'Stop + to-infinitive = pause in order to do something new. Stop + gerund (-ing) = cease doing the current activity.',
    explanation:'<b>Stop + infinitive</b>: "She stopped <b>to talk</b>" = she stopped (e.g., walking) in order to start talking (purpose). <b>Stop + gerund</b>: "She stopped <b>talking</b>" = she was talking and then ceased. This pattern applies to other verbs too: <b>remember to lock</b> (don\'t forget!) vs <b>remember locking</b> (I recall past action); <b>try to lift</b> (attempt) vs <b>try lifting</b> (experiment). MIE Grade 6 covers these for comprehension questions.' })

);
