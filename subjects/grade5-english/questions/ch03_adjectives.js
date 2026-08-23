'use strict';
// Grade 5 English — Chapter: Adjectives & Adverbs
// IDs format: g5eng-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-adj-001', chapterId:'eng-adjectives', difficulty:1,
    question:'Which word is an ADJECTIVE in: "The small, brown dog ran fast."',
    options:['ran','fast','small','dog'],
    answer:'small',
    hint:'An adjective describes a noun. Which word tells you more about what the dog is like?',
    explanation:'"<b>Small</b>" (and "brown") are adjectives — they describe the noun "dog". "Fast" is an adverb in this sentence (it tells us how the dog ran, describing the verb "ran").' }),

  makeMCQ({ id:'g5eng-adj-002', chapterId:'eng-adjectives', difficulty:1,
    question:'Which word is an ADVERB in: "She sang beautifully at the concert."',
    options:['sang','beautifully','concert','She'],
    answer:'beautifully',
    hint:'An adverb describes how, when or where an action happens. Look for the -ly ending.',
    explanation:'"<b>Beautifully</b>" is an adverb — it tells us HOW she sang (the verb). Most adverbs are formed by adding -ly to an adjective: beautiful → beautifully, quick → quickly, careful → carefully.' }),

  makeMCQ({ id:'g5eng-adj-003', chapterId:'eng-adjectives', difficulty:1,
    question:'What is the COMPARATIVE form of the adjective "tall"?',
    options:['most tall','tallest','taller','more tall'],
    answer:'taller',
    hint:'For short adjectives (1 syllable), add -er to compare two things.',
    explanation:'"<b>Taller</b>" is the comparative form — used to compare two people or things. For short adjectives: add -er (tall→taller, fast→faster, old→older). Superlative = tallest (comparing three or more).' }),

  makeMCQ({ id:'g5eng-adj-004', chapterId:'eng-adjectives', difficulty:2,
    question:'Which sentence uses the SUPERLATIVE correctly?',
    options:[
      'This is the more interesting book I have read.',
      'She is the most tallest girl in the class.',
      'The blue whale is the largest animal on Earth.',
      'He runs the more fast of all the students.'
    ],
    answer:'The blue whale is the largest animal on Earth.',
    hint:'Superlatives use -est (for short adjectives) or most + adjective (for longer ones). Never use both together.',
    explanation:'"<b>The blue whale is the largest animal on Earth</b>" is correct. "Most tallest" is wrong (never double up —est and most). "More interesting" is comparative; we need "most interesting" for superlative. "More fast" should be "fastest".' }),

  makeTF({ id:'g5eng-adj-005', chapterId:'eng-adjectives', difficulty:1,
    question:'The word "quickly" is an adjective because it ends in -ly.',
    answer:false,
    hint:'Not all -ly words are the same type. What does "quickly" describe?',
    explanation:'<b>False.</b> "Quickly" is an <b>adverb</b>, not an adjective. It ends in -ly but it describes a verb (how something is done). Adjectives describe nouns. Adverbs describe verbs, adjectives or other adverbs.' }),

  makeMCQ({ id:'g5eng-adj-006', chapterId:'eng-adjectives', difficulty:2,
    question:'Choose the correct form: "Of the three routes, this is ___ one."',
    options:['the shorter','the shortest','shorter','short'],
    answer:'the shortest',
    hint:'We are comparing three things — use a superlative.',
    explanation:'"<b>The shortest</b>" is correct — when comparing three or more things, use the superlative (the + -est or most). Comparative (-er) is only for comparing two things.' }),

  makeMCQ({ id:'g5eng-adj-007', chapterId:'eng-adjectives', difficulty:2,
    question:'Which word correctly completes: "He spoke ___ loudly that everyone could hear."',
    options:['so','such','very','too'],
    answer:'so',
    hint:'"So + adjective/adverb" expresses degree and often pairs with "that".',
    explanation:'"<b>So</b>" is correct: "He spoke <b>so</b> loudly that everyone could hear." "So...that" shows cause and effect. "Such" is used before a noun phrase: "such a loud voice that..."' }),

  makeMCQ({ id:'g5eng-adj-008', chapterId:'eng-adjectives', difficulty:1,
    question:'Form an adverb from the adjective "happy".',
    options:['happyly','happly','happily','more happy'],
    answer:'happily',
    hint:'For adjectives ending in -y, change the -y to -i before adding -ly.',
    explanation:'"<b>Happily</b>" — adjectives ending in consonant + y change y to i before -ly. happy→happily, easy→easily, angry→angrily, heavy→heavily.' }),

  makeMCQ({ id:'g5eng-adj-009', chapterId:'eng-adjectives', difficulty:2,
    question:'Identify the adjective in: "The exhausted runner collapsed at the finish line."',
    options:['collapsed','finish','exhausted','runner'],
    answer:'exhausted',
    hint:'Which word describes the runner?',
    explanation:'"<b>Exhausted</b>" is the adjective — it describes the noun "runner", telling us the condition of the runner. Past participles like exhausted, excited, broken can function as adjectives.' }),

  makeTF({ id:'g5eng-adj-010', chapterId:'eng-adjectives', difficulty:2,
    question:'In the sentence "The food smells good", the word "good" is an adverb modifying the verb "smells".',
    answer:false,
    hint:'Smells here is a linking verb (a sense verb). What does "good" describe?',
    explanation:'<b>False.</b> "Good" is an <b>adjective</b> here — it describes the subject "food" via the linking verb "smells". With sense/linking verbs (smell, taste, look, feel, seem), we use adjectives, not adverbs. ("The food smells good" not "smells goodly".)' })

);
