'use strict';
// Grade 4 English — Chapter: Adjectives & Adverbs
// IDs format: g4eng-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-adj-001', chapterId:'g4eng-adjectives', difficulty:1,
    question:'Which word is the ADJECTIVE in: "The tall girl won the race."',
    options:['The','tall','girl','won'],
    answer:'tall',
    hint:'An adjective is a describing word that tells us about a noun.',
    explanation:'"<b>Tall</b>" is the adjective — it describes the noun "girl". Adjectives tell us about the size, colour, shape, number or quality of a noun: tall, red, round, three, happy.' }),

  makeMCQ({ id:'g4eng-adj-002', chapterId:'g4eng-adjectives', difficulty:1,
    question:'Choose the COMPARATIVE form: "This box is ___ than that one." (heavy)',
    options:['heavy','heaviest','heavier','more heavy'],
    answer:'heavier',
    hint:'For adjectives ending in -y, change y to i and add -er to compare two things.',
    explanation:'"Heavy" ends in -y, so change y to i and add -er: heavy→<b>heavier</b>. Same rule: happy→happier, easy→easier, busy→busier. Comparatives compare exactly two things and always use "than".' }),

  makeMCQ({ id:'g4eng-adj-003', chapterId:'g4eng-adjectives', difficulty:1,
    question:'What is the SUPERLATIVE form of "tall"?',
    options:['taller','most tall','the tallest','the most tallest'],
    answer:'the tallest',
    hint:'The superlative compares three or more things. Short adjectives: use "the ___est".',
    explanation:'"<b>The tallest</b>" is the superlative of tall. For short adjectives, add -est: tall→tallest, fast→fastest, small→smallest. The superlative always uses "the" before it. Never write "the most tallest" — that doubles the superlative.' }),

  makeTF({ id:'g4eng-adj-004', chapterId:'g4eng-adjectives', difficulty:1,
    question:'In "She sang beautifully", the word "beautifully" is an adjective.',
    answer:false,
    hint:'Does "beautifully" describe a noun or a verb?',
    explanation:'<b>False.</b> "Beautifully" is an <b>adverb</b> — it describes the verb "sang" (how she sang). Adjectives describe nouns. Adverbs describe verbs. Most adverbs end in -ly: quick→quickly, beautiful→beautifully, slow→slowly.' }),

  makeMCQ({ id:'g4eng-adj-005', chapterId:'g4eng-adjectives', difficulty:2,
    question:'Which sentence uses the correct COMPARATIVE form?',
    options:[
      'The elephant is more big than the horse.',
      'The elephant is bigger than the horse.',
      'The elephant is most big than the horse.',
      'The elephant is the biggest than the horse.'
    ],
    answer:'The elephant is bigger than the horse.',
    hint:'For short adjectives (one syllable ending in consonant-vowel-consonant), double the final consonant and add -er.',
    explanation:'"<b>Bigger</b>" is correct. "Big" is short (one syllable), so we add -er. Double the final "g" because the pattern is consonant-vowel-consonant: big→bigger. "More big" is wrong — "more" is for long adjectives (more beautiful, more interesting).' }),

  makeMCQ({ id:'g4eng-adj-006', chapterId:'g4eng-adjectives', difficulty:2,
    question:'Which word in this sentence is NOT an adjective: "The old, grey cat sat on a cold, wet mat."',
    options:['old','grey','sat','cold'],
    answer:'sat',
    hint:'Adjectives describe nouns. What does "sat" do in this sentence?',
    explanation:'"<b>Sat</b>" is a verb (the action the cat performed), not an adjective. Old, grey, cold and wet are all adjectives — they describe the noun "cat" or the noun "mat". "The" and "a" are articles.' }),

  makeNum({ id:'g4eng-adj-007', chapterId:'g4eng-adjectives', difficulty:2,
    question:'How many ADJECTIVES are in: "The clever, young girl wore a red dress."? Write a number.',
    answer:'3', acceptableAnswers:['3'],
    hint:'Find all the describing words. How many words describe the girl? How many describe the dress?',
    explanation:'There are <b>3 adjectives</b>: "clever" (describes girl), "young" (describes girl), "red" (describes dress). "The" and "a" are articles, not adjectives. "Wore" is a verb.' }),

  makeMCQ({ id:'g4eng-adj-008', chapterId:'g4eng-adjectives', difficulty:2,
    question:'Choose the correct adjective: "The weather was ___ so we stayed inside." (the opposite of good)',
    options:['worst','bad','badly','more bad'],
    answer:'bad',
    hint:'"Bad" is an adjective describing a noun. "Badly" is an adverb. "Worst" is the superlative.',
    explanation:'"<b>Bad</b>" is the correct adjective here — it describes the noun "weather". "Badly" is an adverb (she played badly). "Worst" is the superlative of bad (the worst weather ever). Irregular comparison: bad→worse→worst.' }),

  makeMCQ({ id:'g4eng-adj-009', chapterId:'g4eng-adjectives', difficulty:3,
    question:'Which sentence correctly uses a SUPERLATIVE?',
    options:[
      'She is the most tallest student in the class.',
      'She is most tall student in the class.',
      'She is the tallest student in the class.',
      'She is taller student in the class.'
    ],
    answer:'She is the tallest student in the class.',
    hint:'Superlative compares three or more things. Short adjectives → the + adjective + est. Never double the comparison.',
    explanation:'"<b>The tallest</b>" is correct. Never write "the most tallest" — that is a double superlative error. Rule: short adjectives → the + -est (tallest). Long adjectives → the most + adjective (the most intelligent). The superlative always uses "the".' }),

  makeMCQ({ id:'g4eng-adj-010', chapterId:'g4eng-adjectives', difficulty:4,
    question:'Meena writes: "My grandmother is the ___ (kind) person I know. She is also ___ (patient) than anyone else in our family." Which pair correctly fills the blanks?',
    options:[
      'kindest / more patient',
      'kinder / most patient',
      'most kind / more patient',
      'kindest / most patient'
    ],
    answer:'kindest / more patient',
    hint:'First blank: comparing grandmother to everyone Meena knows (superlative). Second blank: comparing with "than" (comparative).',
    explanation:'"The <b>kindest</b>" = superlative (comparing grandmother to all people Meena knows). "<b>More patient</b> than" = comparative (comparing to family members — "than" always signals comparative). Kind→kindest (short adjective). Patient→more patient (multi-syllable adjective uses "more").' })

);
