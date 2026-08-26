'use strict';
// Grade 5 English - Chapter: Adjectives & Adverbs
// IDs format: g5eng-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-adj-001', chapterId:'eng-adjectives', subsection:'in_context', difficulty:1,
    question:'Which word is an ADJECTIVE in: "The small, brown dog ran fast."',
    options:['ran','fast','small','dog'],
    answer:'small',
    hint:'An adjective describes a noun. Which word tells you more about what the dog is like?',
    explanation:'"<b>Small</b>" (and "brown") are adjectives - they describe the noun "dog". "Fast" is an adverb in this sentence (it tells us how the dog ran, describing the verb "ran").' }),

  makeMCQ({ id:'g5eng-adj-002', chapterId:'eng-adjectives', subsection:'adverbs', difficulty:1,
    question:'Which word is an ADVERB in: "She sang beautifully at the concert."',
    options:['sang','beautifully','concert','She'],
    answer:'beautifully',
    hint:'An adverb describes how, when or where an action happens. Look for the -ly ending.',
    explanation:'"<b>Beautifully</b>" is an adverb - it tells us HOW she sang (the verb). Most adverbs are formed by adding -ly to an adjective: beautiful → beautifully, quick → quickly, careful → carefully.' }),

  makeMCQ({ id:'g5eng-adj-003', chapterId:'eng-adjectives', subsection:'comparatives', difficulty:1,
    question:'What is the COMPARATIVE form of the adjective "tall"?',
    options:['most tall','tallest','taller','more tall'],
    answer:'taller',
    hint:'For short adjectives (1 syllable), add -er to compare two things.',
    explanation:'"<b>Taller</b>" is the comparative form - used to compare two people or things. For short adjectives: add -er (tall→taller, fast→faster, old→older). Superlative = tallest (comparing three or more).' }),

  makeMCQ({ id:'g5eng-adj-004', chapterId:'eng-adjectives', subsection:'comparatives', difficulty:2,
    question:'Which sentence uses the SUPERLATIVE correctly?',
    options:[
      'This is the more interesting book I have read.',
      'She is the most tallest girl in the class.',
      'The blue whale is the largest animal on Earth.',
      'He runs the more fast of all the students.'
    ],
    answer:'The blue whale is the largest animal on Earth.',
    hint:'Superlatives use -est (for short adjectives) or most + adjective (for longer ones). Never use both together.',
    explanation:'"<b>The blue whale is the largest animal on Earth</b>" is correct. "Most tallest" is wrong (never double up -est and most). "More interesting" is comparative; we need "most interesting" for superlative. "More fast" should be "fastest".' }),

  makeTF({ id:'g5eng-adj-005', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:1,
    question:'The word "quickly" is an adjective because it ends in -ly.',
    answer:false,
    hint:'Not all -ly words are the same type. What does "quickly" describe?',
    explanation:'<b>False.</b> "Quickly" is an <b>adverb</b>, not an adjective. It ends in -ly but it describes a verb (how something is done). Adjectives describe nouns. Adverbs describe verbs, adjectives or other adverbs.' }),

  makeMCQ({ id:'g5eng-adj-006', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Choose the correct form: "Of the three routes, this is ___ one."',
    options:['the shorter','the shortest','shorter','short'],
    answer:'the shortest',
    hint:'We are comparing three things - use a superlative.',
    explanation:'"<b>The shortest</b>" is correct - when comparing three or more things, use the superlative (the + -est or most). Comparative (-er) is only for comparing two things.' }),

  makeMCQ({ id:'g5eng-adj-007', chapterId:'eng-adjectives', subsection:'in_context', difficulty:2,
    question:'Which word correctly completes: "He spoke ___ loudly that everyone could hear."',
    options:['so','such','very','too'],
    answer:'so',
    hint:'"So + adjective/adverb" expresses degree and often pairs with "that".',
    explanation:'"<b>So</b>" is correct: "He spoke <b>so</b> loudly that everyone could hear." "So...that" shows cause and effect. "Such" is used before a noun phrase: "such a loud voice that..."' }),

  makeMCQ({ id:'g5eng-adj-008', chapterId:'eng-adjectives', subsection:'adverbs', difficulty:1,
    question:'Form an adverb from the adjective "happy".',
    options:['happyly','happly','happily','more happy'],
    answer:'happily',
    hint:'For adjectives ending in -y, change the -y to -i before adding -ly.',
    explanation:'"<b>Happily</b>" - adjectives ending in consonant + y change y to i before -ly. happy→happily, easy→easily, angry→angrily, heavy→heavily.' }),

  makeMCQ({ id:'g5eng-adj-009', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Identify the adjective in: "The exhausted runner collapsed at the finish line."',
    options:['collapsed','finish','exhausted','runner'],
    answer:'exhausted',
    hint:'Which word describes the runner?',
    explanation:'"<b>Exhausted</b>" is the adjective - it describes the noun "runner", telling us the condition of the runner. Past participles like exhausted, excited, broken can function as adjectives.' }),

  makeTF({ id:'g5eng-adj-010', chapterId:'eng-adjectives', subsection:'adverbs', difficulty:2,
    question:'In the sentence "The food smells good", the word "good" is an adverb modifying the verb "smells".',
    answer:false,
    hint:'Smells here is a linking verb (a sense verb). What does "good" describe?',
    explanation:'<b>False.</b> "Good" is an <b>adjective</b> here - it describes the subject "food" via the linking verb "smells". With sense/linking verbs (smell, taste, look, feel, seem), we use adjectives, not adverbs. ("The food smells good" not "smells goodly".)' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-adj-011', chapterId:'eng-adjectives', subsection:'comparatives', difficulty:1,
    question:'Fill in the blank: "This test is ___ than the last one."',
    options:['difficulter','more difficult','most difficult','the most difficult'],
    answer:'more difficult',
    hint:'We are comparing TWO tests. "Difficult" has 3 syllables - use "more" instead of "-er".',
    explanation:'"<b>More difficult</b>" is the comparative form. For adjectives of 3+ syllables, use "more + adjective" for comparatives: more difficult, more interesting, more beautiful. "-er" is only for short (1-syllable) adjectives: faster, taller, older.' }),

  makeMCQ({ id:'g5eng-adj-012', chapterId:'eng-adjectives', subsection:'adverbs', difficulty:1,
    question:'Which sentence uses an ADVERB OF FREQUENCY correctly?',
    options:[
      'She always is late for school.',
      'He sometimes eats pizza for dinner.',
      'They never do are on time.',
      'We often to play in the park.'
    ],
    answer:'He sometimes eats pizza for dinner.',
    hint:'Adverbs of frequency (always, often, sometimes, never) go BEFORE the main verb but AFTER "be".',
    explanation:'"<b>He sometimes eats</b>" is correct - "sometimes" is placed before the main verb. With "be": "She is always late" (after be). Pattern: subject + adverb + main verb. "Always is late" is wrong (always goes after "is" with be: "is always").' }),

  makeMCQ({ id:'g5eng-adj-013', chapterId:'eng-adjectives', subsection:'comparatives', difficulty:2,
    question:'What are the COMPARATIVE and SUPERLATIVE of "good"?',
    options:[
      'gooder / goodest',
      'more good / most good',
      'better / best',
      'gooder / most good'
    ],
    answer:'better / best',
    hint:'"Good" is an irregular adjective - it changes completely.',
    explanation:'"<b>Better / best</b>" - "good" is irregular: good → <b>better</b> (comparative) → <b>best</b> (superlative). Other irregulars: bad → worse → worst; much/many → more → most; little → less → least.' }),

  makeMCQ({ id:'g5eng-adj-014', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Choose the correct adjective: "The film was ___. I fell asleep." (The film caused boredom.)',
    options:['bored','boring','boringly','boredom'],
    answer:'boring',
    hint:'-ing adjectives describe what causes a feeling; -ed adjectives describe how a person feels.',
    explanation:'"<b>Boring</b>" - the film caused the feeling of boredom. Use <b>-ing</b> for the cause: boring film, exciting game, interesting book. Use <b>-ed</b> for the person\'s feeling: I was bored/excited/interested. "I was bored because the film was boring."' }),

  makeMCQ({ id:'g5eng-adj-015', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:2,
    question:'Which sentence uses "such" correctly?',
    options:[
      'She spoke such loudly.',
      'It was such a beautiful day!',
      'He ran such fast.',
      'They are such tiredly.'
    ],
    answer:'It was such a beautiful day!',
    hint:'"Such" is used before a noun phrase (a/an + adjective + noun). "So" is used before an adjective or adverb alone.',
    explanation:'"<b>Such a beautiful day</b>" is correct. <b>Such + a/an + adjective + noun</b>: such a beautiful day, such an interesting story. <b>So + adjective/adverb alone</b>: so beautiful, so loudly. "She spoke so loudly" ✓ / "It was such a beautiful day" ✓.' }),

  makeTF({ id:'g5eng-adj-016', chapterId:'eng-adjectives', subsection:'adverbs', difficulty:1,
    question:'The adverb of the adjective "angry" is "angrily".',
    answer:true,
    hint:'For adjectives ending in consonant + y, change y to i before adding -ly.',
    explanation:'<b>True.</b> Angry → <b>angrily</b>. For adjectives ending in consonant + y, change y to i before adding -ly: happy→happily, easy→easily, angry→angrily, heavy→heavily, lazy→lazily.' }),

  makeMCQ({ id:'g5eng-adj-017', chapterId:'eng-adjectives', subsection:'order', difficulty:3,
    question:'What is the correct ORDER of adjectives in: "She wore a ___ dress."',
    options:[
      'silk beautiful blue long',
      'beautiful long blue silk',
      'long beautiful silk blue',
      'blue long silk beautiful'
    ],
    answer:'beautiful long blue silk',
    hint:'English adjective order: Opinion → Size → Colour → Material',
    explanation:'The standard English adjective order is: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose. So: <b>beautiful (opinion) long (size) blue (colour) silk (material)</b> dress. This order feels natural to native speakers even if they cannot explain why.' }),

  makeMCQ({ id:'g5eng-adj-018', chapterId:'eng-adjectives', subsection:'comparatives', difficulty:3,
    question:'Identify the error: "She was more happier today than yesterday."',
    options:[
      'No error - "more happier" is correct',
      '"More happier" is wrong - never double comparative. Correct: "happier" OR "more happy" (though "happier" is standard)',
      '"Today" should be "nowadays"',
      '"Than" should be "then"'
    ],
    answer:'"More happier" is wrong - never double comparative. Correct: "happier" OR "more happy" (though "happier" is standard)',
    hint:'You cannot use both "more" AND "-er" at the same time.',
    explanation:'"More happier" doubles the comparative - this is always wrong. Happy is a 2-syllable adjective ending in -y, so the comparative is <b>happier</b> (change y to i, add -er). Never say "more happier / more taller / more faster" - pick one form only.' }),

  makeMCQ({ id:'g5eng-adj-019', chapterId:'eng-adjectives', subsection:'adjectives', difficulty:4,
    question:'A student writes: "The ancient, angry ocean attacked the shore again and again." This sentence uses which TWO literary techniques?',
    options:[
      'Simile and rhyme',
      'Alliteration (repeated "a" sounds) and personification (ocean is given human anger and action)',
      'Metaphor and onomatopoeia',
      'Hyperbole and rhyme'
    ],
    answer:'Alliteration (repeated "a" sounds) and personification (ocean is given human anger and action)',
    hint:'Look at the starting sounds, and whether the ocean is behaving like a person.',
    explanation:'<b>Alliteration</b>: "ancient, <b>a</b>ngry ocean <b>a</b>ttacked" - repeated "a" sounds create a rhythmic, dramatic effect. <b>Personification</b>: "angry ocean attacked" - the ocean is given the human emotion of anger and the human action of attacking. Both techniques make the description more vivid and powerful.' })

);
