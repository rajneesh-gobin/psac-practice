'use strict';
// Grade 5 English - Chapter: Verbs & Tenses
// IDs format: g5eng-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-verb-001', chapterId:'eng-verbs', subsection:'in_context', difficulty:1,
    question:'Which word is the VERB in: "The children played in the garden."',
    options:['children','garden','played','The'],
    answer:'played',
    hint:'The verb is the action word - what did the children do?',
    explanation:'"<b>Played</b>" is the verb - it tells us the action the children performed. It is in the past tense (past simple) because the action has already happened.' }),

  makeMCQ({ id:'g5eng-verb-002', chapterId:'eng-verbs', subsection:'past_tense', difficulty:1,
    question:'Which sentence is in the PAST SIMPLE tense?',
    options:[
      'She walks to school every day.',
      'He is reading a book right now.',
      'They cooked dinner last night.',
      'We will go to the beach tomorrow.'
    ],
    answer:'They cooked dinner last night.',
    hint:'Past simple usually ends in -ed for regular verbs, or uses an irregular past form.',
    explanation:'"<b>They cooked dinner last night</b>" is past simple - "cooked" is the regular past form of "cook". The clue word "last night" also tells us it happened in the past.' }),

  makeMCQ({ id:'g5eng-verb-003', chapterId:'eng-verbs', subsection:'continuous', difficulty:2,
    question:'Choose the correct form: "She ___ to the shop when it started raining."',
    options:['walks','is walking','was walking','will walk'],
    answer:'was walking',
    hint:'An action that was in progress when another action interrupted it uses the past continuous (was/were + -ing).',
    explanation:'"<b>Was walking</b>" is correct - past continuous (was/were + verb-ing) describes an action in progress in the past when something else happened. "She was walking... when it started raining." (started = interrupted the walking).' }),

  makeMCQ({ id:'g5eng-verb-004', chapterId:'eng-verbs', subsection:'past_tense', difficulty:1,
    question:'What is the PAST TENSE of the irregular verb "go"?',
    options:['goed','goes','gone','went'],
    answer:'went',
    hint:'Irregular verbs do NOT follow the -ed pattern. This one changes completely.',
    explanation:'"<b>Went</b>" is the past simple tense of "go". It is irregular - you cannot say "goed". Other irregular examples: see→saw, have→had, run→ran, come→came.' }),

  makeTF({ id:'g5eng-verb-005', chapterId:'eng-verbs', subsection:'continuous', difficulty:1,
    question:'The sentence "They are playing football" is in the present continuous tense.',
    answer:true,
    hint:'Present continuous = am/is/are + verb-ing. It describes something happening right now.',
    explanation:'<b>True.</b> "Are playing" = is/are + verb-ing = <b>present continuous</b>. It shows an action happening at this moment. Compare: "They play football" (present simple - a habit) vs "They are playing football" (happening right now).' }),

  makeMCQ({ id:'g5eng-verb-006', chapterId:'eng-verbs', subsection:'future_tense', difficulty:2,
    question:'Which sentence uses the FUTURE tense correctly?',
    options:[
      'She goes to the party yesterday.',
      'He went to the party tomorrow.',
      'They will attend the meeting next week.',
      'We attended the show later.'
    ],
    answer:'They will attend the meeting next week.',
    hint:'Future tense uses "will" or "going to". Look for future time words like "tomorrow", "next week".',
    explanation:'"<b>They will attend the meeting next week</b>" correctly uses the future tense - "will + verb" expresses what will happen. The other sentences mix tenses incorrectly (past verbs with future time words).' }),

  makeMCQ({ id:'g5eng-verb-007', chapterId:'eng-verbs', subsection:'present_tense', difficulty:2,
    question:'Choose the correct verb form: "Every morning, she ___ breakfast at 7 o\'clock."',
    options:['is making','made','makes','will make'],
    answer:'makes',
    hint:'"Every morning" is a regular habit - which tense describes habits and routines?',
    explanation:'"<b>Makes</b>" is correct - present simple is used for habits, routines and facts. "Every morning" is the clue. He/she/it takes an -s in present simple (makes, walks, eats).' }),

  makeMCQ({ id:'g5eng-verb-008', chapterId:'eng-verbs', subsection:'past_tense', difficulty:1,
    question:'What is the past tense of "write"?',
    options:['writed','written','wrote','writes'],
    answer:'wrote',
    hint:'"Write" is an irregular verb. Its past simple form changes the vowel.',
    explanation:'"<b>Wrote</b>" is the past simple of "write". Note: "written" is the past participle (used with has/have: "She has written a letter"). Past simple = "She wrote a letter yesterday."' }),

  makeMCQ({ id:'g5eng-verb-009', chapterId:'eng-verbs', subsection:'perfect', difficulty:2,
    question:'Identify the verb phrase in: "The students have finished their homework."',
    options:['students','have finished','finished','homework'],
    answer:'have finished',
    hint:'Look for the full verb group - sometimes a verb needs a helping (auxiliary) verb.',
    explanation:'"<b>Have finished</b>" is the verb phrase - this is the present perfect tense (have/has + past participle). It shows an action completed at some point before now, with relevance to the present.' }),

  makeTF({ id:'g5eng-verb-010', chapterId:'eng-verbs', subsection:'voice', difficulty:2,
    question:'In the sentence "The cake was baked by Mum", the verb is in the passive voice.',
    answer:true,
    hint:'In the passive voice, the subject receives the action rather than performing it.',
    explanation:'<b>True.</b> "Was baked" is passive voice - the subject (cake) did not do the action, it received it. Compare: Active: "Mum baked the cake." / Passive: "The cake was baked by Mum." Passive = was/were + past participle.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-verb-011', chapterId:'eng-verbs', subsection:'future_tense', difficulty:2,
    question:'Complete the TAG QUESTION: "Jack will go to school, ___ he?"',
    options:["doesn't","didn't","won't","isn't"],
    answer:"won't",
    hint:'The main verb uses "will" (positive) - so the tag uses "won\'t" (negative), matching the auxiliary "will".',
    explanation:'"<b>Won\'t</b> he?" is the correct tag. Tag questions: (1) If the main clause is positive, the tag is negative. (2) Use the same auxiliary verb: will → won\'t. "Jack will go → won\'t he?" Tag = auxiliary + pronoun.' }),

  makeMCQ({ id:'g5eng-verb-012', chapterId:'eng-verbs', subsection:'present_tense', difficulty:2,
    question:'Complete the TAG QUESTION: "She is a good student, ___ she?"',
    options:["isn't","wasn't","doesn't","didn't"],
    answer:"isn't",
    hint:'Positive statement using "is" → negative tag using "isn\'t".',
    explanation:'"<b>Isn\'t</b> she?" is correct. The statement uses "is" (positive) so the tag is "isn\'t" (negative) + the same subject pronoun "she". Pattern: positive statement + negative tag OR negative statement + positive tag.' }),

  makeMCQ({ id:'g5eng-verb-013', chapterId:'eng-verbs', subsection:'agreement', difficulty:1,
    question:'Which sentence has correct SUBJECT-VERB AGREEMENT?',
    options:[
      'The children plays in the park.',
      'She walk to school every day.',
      'He runs very fast.',
      'They runs together.'
    ],
    answer:'He runs very fast.',
    hint:'With he/she/it in present simple, add -s to the verb.',
    explanation:'"<b>He runs</b>" is correct - with he/she/it in the present simple, add -s (runs, walks, eats). "The children play" (not plays - children is plural). "She walks" (not walk). "They run" (not runs - they is plural).' }),

  makeMCQ({ id:'g5eng-verb-014', chapterId:'eng-verbs', subsection:'auxiliary', difficulty:2,
    question:'Which sentence uses a MODAL VERB correctly?',
    options:[
      'She must to finish her homework.',
      'He can swims very well.',
      'You should eat more vegetables.',
      'They might to come tomorrow.'
    ],
    answer:'You should eat more vegetables.',
    hint:'Modal verbs (can, must, should, might, may) are NEVER followed by "to" - they go directly before the base verb.',
    explanation:'"<b>You should eat</b>" is correct. Modal verbs (can, could, should, must, might, may, will, would) are always followed by the base form of the verb (no "to", no -s, no -ing): should eat ✓, must finish ✓, can swim ✓.' }),

  makeMCQ({ id:'g5eng-verb-015', chapterId:'eng-verbs', subsection:'perfect', difficulty:2,
    question:'Which sentence is in the PRESENT PERFECT tense?',
    options:[
      'She studied last night.',
      'He is studying right now.',
      'They have already eaten lunch.',
      'We will study tomorrow.'
    ],
    answer:'They have already eaten lunch.',
    hint:'Present perfect = have/has + past participle. "Already" is a common signal word.',
    explanation:'"<b>Have eaten</b>" is present perfect (have/has + past participle). It describes a past action with relevance to the present. "Already", "just", "ever", "never", "yet" are common signal words for the present perfect.' }),

  makeMCQ({ id:'g5eng-verb-016', chapterId:'eng-verbs', subsection:'voice', difficulty:2,
    question:'Change to PASSIVE VOICE: "The teacher corrects the homework every day."',
    options:[
      'The homework was corrected by the teacher.',
      'The homework is corrected by the teacher every day.',
      'The homework corrects the teacher every day.',
      'Every day the teacher is correcting the homework.'
    ],
    answer:'The homework is corrected by the teacher every day.',
    hint:'Passive = object becomes subject + is/are + past participle + by + agent.',
    explanation:'"<b>The homework is corrected by the teacher every day</b>" - present simple passive: is/are + past participle. The object "the homework" becomes the subject. "By the teacher" names who does the action. "Was corrected" would be past tense - wrong here.' }),

  makeMCQ({ id:'g5eng-verb-017', chapterId:'eng-verbs', subsection:'perfect', difficulty:3,
    question:'Choose the correct verb form: "By the time she arrived, the film ___."',
    options:['already started','has already started','had already started','already starts'],
    answer:'had already started',
    hint:'One action happened BEFORE another in the past. Which tense shows the earlier action?',
    explanation:'"<b>Had already started</b>" is the past perfect - it shows an action completed BEFORE another past action. She arrived (past simple) - but the film had started even earlier. Past perfect = had + past participle. Sequence: film started → she arrived.' }),

  makeMCQ({ id:'g5eng-verb-018', chapterId:'eng-verbs', subsection:'past_tense', difficulty:3,
    question:'Which sentence correctly uses "used to"?',
    options:[
      'I use to play football when I was young.',
      'She is used to plays tennis.',
      'We used to visit our grandparents every Sunday.',
      'He used to played cricket last year.'
    ],
    answer:'We used to visit our grandparents every Sunday.',
    hint:'"Used to" + base verb describes a past habit that no longer happens.',
    explanation:'"<b>Used to visit</b>" is correct - "used to + base verb" describes a past habit or state that no longer happens. "I use to" is wrong (must be "used to"). "Used to played" is wrong (base verb, not past: "used to play"). "Is used to plays" is wrong - "be used to" means "be accustomed to" and takes a noun/-ing form.' }),

  makeMCQ({ id:'g5eng-verb-019', chapterId:'eng-verbs', subsection:'past_tense', difficulty:4,
    question:'A student writes: "Yesterday I have gone to the market and buyed some fruit." Identify BOTH errors and give the correct version.',
    options:[
      '"have gone" should be "went" (past simple, not present perfect); "buyed" should be "bought" (irregular past)',
      '"have gone" is correct; "buyed" should be "boughted"',
      '"went" is wrong; "buyed" is correct',
      'Both verbs are correct - no errors'
    ],
    answer:'"have gone" should be "went" (past simple, not present perfect); "buyed" should be "bought" (irregular past)',
    hint:'"Yesterday" signals a specific past time → past simple. "Buy" is an irregular verb.',
    explanation:'Two errors: (1) "Yesterday" is a specific past time marker - use <b>past simple</b> not present perfect: "I <b>went</b>" not "I have gone". (2) "Buy" is irregular: buy → <b>bought</b> (not "buyed"). Correct sentence: "Yesterday I <b>went</b> to the market and <b>bought</b> some fruit."' })

);
