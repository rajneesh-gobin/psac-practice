'use strict';
// Grade 5 English — Chapter: Verbs & Tenses
// IDs format: g5eng-verb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-verb-001', chapterId:'eng-verbs', difficulty:1,
    question:'Which word is the VERB in: "The children played in the garden."',
    options:['children','garden','played','The'],
    answer:'played',
    hint:'The verb is the action word — what did the children do?',
    explanation:'"<b>Played</b>" is the verb — it tells us the action the children performed. It is in the past tense (past simple) because the action has already happened.' }),

  makeMCQ({ id:'g5eng-verb-002', chapterId:'eng-verbs', difficulty:1,
    question:'Which sentence is in the PAST SIMPLE tense?',
    options:[
      'She walks to school every day.',
      'He is reading a book right now.',
      'They cooked dinner last night.',
      'We will go to the beach tomorrow.'
    ],
    answer:'They cooked dinner last night.',
    hint:'Past simple usually ends in -ed for regular verbs, or uses an irregular past form.',
    explanation:'"<b>They cooked dinner last night</b>" is past simple — "cooked" is the regular past form of "cook". The clue word "last night" also tells us it happened in the past.' }),

  makeMCQ({ id:'g5eng-verb-003', chapterId:'eng-verbs', difficulty:2,
    question:'Choose the correct form: "She ___ to the shop when it started raining."',
    options:['walks','is walking','was walking','will walk'],
    answer:'was walking',
    hint:'An action that was in progress when another action interrupted it uses the past continuous (was/were + -ing).',
    explanation:'"<b>Was walking</b>" is correct — past continuous (was/were + verb-ing) describes an action in progress in the past when something else happened. "She was walking... when it started raining." (started = interrupted the walking).' }),

  makeMCQ({ id:'g5eng-verb-004', chapterId:'eng-verbs', difficulty:1,
    question:'What is the PAST TENSE of the irregular verb "go"?',
    options:['goed','goes','gone','went'],
    answer:'went',
    hint:'Irregular verbs do NOT follow the -ed pattern. This one changes completely.',
    explanation:'"<b>Went</b>" is the past simple tense of "go". It is irregular — you cannot say "goed". Other irregular examples: see→saw, have→had, run→ran, come→came.' }),

  makeTF({ id:'g5eng-verb-005', chapterId:'eng-verbs', difficulty:1,
    question:'The sentence "They are playing football" is in the present continuous tense.',
    answer:true,
    hint:'Present continuous = am/is/are + verb-ing. It describes something happening right now.',
    explanation:'<b>True.</b> "Are playing" = is/are + verb-ing = <b>present continuous</b>. It shows an action happening at this moment. Compare: "They play football" (present simple — a habit) vs "They are playing football" (happening right now).' }),

  makeMCQ({ id:'g5eng-verb-006', chapterId:'eng-verbs', difficulty:2,
    question:'Which sentence uses the FUTURE tense correctly?',
    options:[
      'She goes to the party yesterday.',
      'He went to the party tomorrow.',
      'They will attend the meeting next week.',
      'We attended the show later.'
    ],
    answer:'They will attend the meeting next week.',
    hint:'Future tense uses "will" or "going to". Look for future time words like "tomorrow", "next week".',
    explanation:'"<b>They will attend the meeting next week</b>" correctly uses the future tense — "will + verb" expresses what will happen. The other sentences mix tenses incorrectly (past verbs with future time words).' }),

  makeMCQ({ id:'g5eng-verb-007', chapterId:'eng-verbs', difficulty:2,
    question:'Choose the correct verb form: "Every morning, she ___ breakfast at 7 o\'clock."',
    options:['is making','made','makes','will make'],
    answer:'makes',
    hint:'"Every morning" is a regular habit — which tense describes habits and routines?',
    explanation:'"<b>Makes</b>" is correct — present simple is used for habits, routines and facts. "Every morning" is the clue. He/she/it takes an -s in present simple (makes, walks, eats).' }),

  makeMCQ({ id:'g5eng-verb-008', chapterId:'eng-verbs', difficulty:1,
    question:'What is the past tense of "write"?',
    options:['writed','written','wrote','writes'],
    answer:'wrote',
    hint:'"Write" is an irregular verb. Its past simple form changes the vowel.',
    explanation:'"<b>Wrote</b>" is the past simple of "write". Note: "written" is the past participle (used with has/have: "She has written a letter"). Past simple = "She wrote a letter yesterday."' }),

  makeMCQ({ id:'g5eng-verb-009', chapterId:'eng-verbs', difficulty:2,
    question:'Identify the verb phrase in: "The students have finished their homework."',
    options:['students','have finished','finished','homework'],
    answer:'have finished',
    hint:'Look for the full verb group — sometimes a verb needs a helping (auxiliary) verb.',
    explanation:'"<b>Have finished</b>" is the verb phrase — this is the present perfect tense (have/has + past participle). It shows an action completed at some point before now, with relevance to the present.' }),

  makeTF({ id:'g5eng-verb-010', chapterId:'eng-verbs', difficulty:2,
    question:'In the sentence "The cake was baked by Mum", the verb is in the passive voice.',
    answer:true,
    hint:'In the passive voice, the subject receives the action rather than performing it.',
    explanation:'<b>True.</b> "Was baked" is passive voice — the subject (cake) did not do the action, it received it. Compare: Active: "Mum baked the cake." / Passive: "The cake was baked by Mum." Passive = was/were + past participle.' })

);
