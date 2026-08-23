'use strict';
// Grade 5 English — Chapter: Spelling & Dictation
// IDs format: g5eng-spell-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-spell-001', chapterId:'eng-spelling', difficulty:1,
    question:'Choose the CORRECT spelling.',
    options:['recieve','receive','receve','reseive'],
    answer:'receive',
    hint:'Remember the rule: i before e, EXCEPT after c.',
    explanation:'"<b>Receive</b>" — the ie/ei rule: "i before e, except after c." After the letter c, write "ei": re<b>cei</b>ve, de<b>cei</b>ve, con<b>cei</b>t. But: bel<b>ie</b>ve, ach<b>ie</b>ve, fr<b>ie</b>nd (no c before it).' }),

  makeMCQ({ id:'g5eng-spell-002', chapterId:'eng-spelling', difficulty:1,
    question:'Which word is spelled CORRECTLY?',
    options:['beleive','believe','belive','beleave'],
    answer:'believe',
    hint:'No "c" before the ie/ei — so it follows the "i before e" rule.',
    explanation:'"<b>Believe</b>" — since there is no c before the ie, we follow the rule: i before e (bel<b>ie</b>ve). Other "believe"-pattern words: achieve, field, fierce, niece, piece, relief.' }),

  makeMCQ({ id:'g5eng-spell-003', chapterId:'eng-spelling', difficulty:1,
    question:'Which word has a SILENT letter?',
    options:['book','fast','knight','shop'],
    answer:'knight',
    hint:'Say the word out loud — are all the letters actually pronounced?',
    explanation:'"<b>Knight</b>" contains a silent k (we do not say the "k" sound) and a silent gh. Other silent-k words: know, kneel, knock, knot, knife. Silent letters are common in English words with old spellings.' }),

  makeMCQ({ id:'g5eng-spell-004', chapterId:'eng-spelling', difficulty:2,
    question:'How do you spell the -ing form of "run"?',
    options:['runing','running','runing','runeing'],
    answer:'running',
    hint:'For short words ending in a single consonant after a single vowel, double the final consonant before -ing.',
    explanation:'"<b>Running</b>" — when a short word (1 syllable) ends in consonant-vowel-consonant (CVC), double the final consonant before -ing or -ed: run→running, sit→sitting, swim→swimming, stop→stopped.' }),

  makeMCQ({ id:'g5eng-spell-005', chapterId:'eng-spelling', difficulty:1,
    question:'Choose the correct HOMOPHONE: "The dog wagged ___ tail."',
    options:['their','there','they\'re','its'],
    answer:'its',
    hint:'"Its" = belonging to it (no apostrophe). The dog\'s tail = belonging to the dog.',
    explanation:'"<b>Its</b>" (no apostrophe) shows possession — the tail belongs to the dog. "It\'s" = it is. "Their" = belonging to them. "There" = a place. "They\'re" = they are. Be careful with these homophones!' }),

  makeMCQ({ id:'g5eng-spell-006', chapterId:'eng-spelling', difficulty:2,
    question:'Which sentence uses the correct homophone?',
    options:[
      'I want to go to.',
      'There going to the park.',
      'She wore her knew dress.',
      'I know the answer to that question.'
    ],
    answer:'I know the answer to that question.',
    hint:'Check each option: "to/too/two", "there/their/they\'re", "knew/new".',
    explanation:'"<b>I know the answer to that question</b>" is correct. Errors in other options: "to go to<b>o</b>" (too = also), "The<b>y\'re</b> going" (they\'re = they are), "her <b>new</b> dress" (new = not old; knew = past tense of know).' }),

  makeMCQ({ id:'g5eng-spell-007', chapterId:'eng-spelling', difficulty:2,
    question:'Which is the correct spelling of the plural of "leaf"?',
    options:['leafs','leaves','leafes','leives'],
    answer:'leaves',
    hint:'For words ending in -f or -fe, change the f to v and add -es.',
    explanation:'"<b>Leaves</b>" — words ending in f/fe often change to -ves in the plural: leaf→leaves, loaf→loaves, knife→knives, life→lives, half→halves. Exceptions: roofs, cliffs, beliefs.' }),

  makeMCQ({ id:'g5eng-spell-008', chapterId:'eng-spelling', difficulty:1,
    question:'Choose the correctly spelled word meaning "to write your name".',
    options:['sighn','sine','sign','signe'],
    answer:'sign',
    hint:'This word has a silent letter — the "g" is not pronounced.',
    explanation:'"<b>Sign</b>" — the g is silent (we say "syne"). Other silent-g words: gnome, gnat, align, foreign, design, reign. The silent g is a common spelling pattern in English.' }),

  makeTF({ id:'g5eng-spell-009', chapterId:'eng-spelling', difficulty:1,
    question:'"To", "too" and "two" all have the same meaning but different spellings.',
    answer:false,
    hint:'Homophones sound the same but have DIFFERENT meanings.',
    explanation:'<b>False.</b> They are homophones — same sound, but different meanings: "to" = direction/infinitive marker, "too" = also or excessively, "two" = the number 2. "They have the same meaning" is wrong — each has a distinct use.' }),

  makeMCQ({ id:'g5eng-spell-010', chapterId:'eng-spelling', difficulty:2,
    question:'Which word is spelled incorrectly?',
    options:['beginning','necessary','seperate','definitely'],
    answer:'seperate',
    hint:'One of these words is a very commonly misspelled word.',
    explanation:'"<b>Seperate</b>" is misspelled — the correct spelling is "<b>separate</b>". Memory trick: there is "a rat" in sep<b>a rat</b>e. Other commonly misspelled words: necessary (1 c, 2 s), beginning (double n), definitely (not definitly).' })

);
