'use strict';
// Grade 5 French — Chapter: Les Adjectifs
// IDs format: g5fr-adj-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-adj-001', chapterId:'fr-adjectifs', difficulty:1,
    question:'Choose the correct form: "une fille ___" (tall — grand)',
    options:['grand','grands','grande','grandes'],
    answer:'grande',
    hint:'The noun "fille" is feminine singular. Most adjectives add -e for feminine.',
    explanation:'"une fille <b>grande</b>" — adjectives agree with the noun. "Grand" is masculine; add -e for feminine: grand<b>e</b>. Masculine: un grand garçon. Feminine: une grande fille.' }),

  makeMCQ({ id:'g5fr-adj-002', chapterId:'fr-adjectifs', difficulty:2,
    question:'Choose the correct form: "des fleurs ___" (beautiful — beau)',
    options:['beau','belle','beaux','belles'],
    answer:'belles',
    hint:'"Fleurs" is feminine and plural. Beau (m.sg) → belle (f.sg) → belles (f.pl)',
    explanation:'"des fleurs <b>belles</b>" — beau is irregular: beau (m.sg), belle (f.sg), beaux (m.pl), <b>belles</b> (f.pl). "Des fleurs" is feminine plural, so we use "belles". Note: before a masculine singular vowel sound: bel (un bel homme).' }),

  makeMCQ({ id:'g5fr-adj-003', chapterId:'fr-adjectifs', difficulty:2,
    question:'Where does the adjective "petit" (small) go in the sentence?',
    options:[
      'After the noun — un garçon petit',
      'Before the noun — un petit garçon',
      'Either position is correct',
      'At the end of the sentence only'
    ],
    answer:'Before the noun — un petit garçon',
    hint:'BAGS adjectives (Beauty, Age, Goodness, Size) go BEFORE the noun.',
    explanation:'"<b>Un petit garçon</b>" — BAGS adjectives go BEFORE the noun: <b>B</b>eauty (beau, joli), <b>A</b>ge (vieux, jeune), <b>G</b>oodness (bon, mauvais), <b>S</b>ize (grand, petit). Most other adjectives go AFTER the noun.' }),

  makeMCQ({ id:'g5fr-adj-004', chapterId:'fr-adjectifs', difficulty:1,
    question:'What is the feminine form of "vieux" (old)?',
    options:['vieuxe','vieille','vielle','vieuse'],
    answer:'vieille',
    hint:'"Vieux" is one of the irregular BAGS adjectives.',
    explanation:'"<b>Vieille</b>" — vieux is irregular: vieux (m.sg before consonant), vieil (m.sg before vowel), <b>vieille</b> (f.sg), vieux (m.pl), vieilles (f.pl). Example: un vieux livre / une vieille maison.' }),

  makeTF({ id:'g5fr-adj-005', chapterId:'fr-adjectifs', difficulty:1,
    question:'In French, all adjectives must agree in gender and number with the noun they describe.',
    answer:true,
    hint:'Think: un chat noir / une maison noire — the adjective changes.',
    explanation:'<b>Vrai (True).</b> French adjectives must <b>agree</b> with the noun: masculine/feminine and singular/plural. Example: noir (m.sg) → noire (f.sg) → noirs (m.pl) → noires (f.pl).' }),

  makeMCQ({ id:'g5fr-adj-006', chapterId:'fr-adjectifs', difficulty:2,
    question:'Complete: "Les robes sont ___." (pretty — joli)',
    options:['joli','jolie','jolis','jolies'],
    answer:'jolies',
    hint:'"Robes" is feminine and plural. Add -e for feminine, then -s for plural.',
    explanation:'"Les robes sont <b>jolies</b>" — robes is feminine plural. Adjective agreement: joli (m.sg) → jolie (f.sg) → jolis (m.pl) → <b>jolies</b> (f.pl). Adjectives after être still agree with the subject.' }),

  makeMCQ({ id:'g5fr-adj-007', chapterId:'fr-adjectifs', difficulty:2,
    question:'Which sentence correctly places the adjective "rouge" (red)?',
    options:[
      'un rouge stylo',
      'un stylo rouge',
      'rouge un stylo',
      'un rougé stylo'
    ],
    answer:'un stylo rouge',
    hint:'Colours are NOT BAGS adjectives — they go AFTER the noun.',
    explanation:'"<b>Un stylo rouge</b>" — colour adjectives always go AFTER the noun in French: un stylo rouge, une voiture bleue, des fleurs jaunes. Only BAGS adjectives go before the noun.' }),

  makeMCQ({ id:'g5fr-adj-008', chapterId:'fr-adjectifs', difficulty:2,
    question:'What is the masculine plural of "nouveau" (new)?',
    options:['nouveaus','nouvelles','nouveaux','nouvel'],
    answer:'nouveaux',
    hint:'Like beau → beaux, nouveau follows the same pattern.',
    explanation:'"<b>Nouveaux</b>" — nouveau is irregular like beau: nouveau (m.sg before consonant), nouvel (m.sg before vowel), nouvelle (f.sg), <b>nouveaux</b> (m.pl), nouvelles (f.pl). E.g., de nouveaux livres.' }),

  makeMCQ({ id:'g5fr-adj-009', chapterId:'fr-adjectifs', difficulty:1,
    question:'Complete: "C\'est un ___ garçon." (good — bon)',
    options:['bon','bonne','bons','bonnes'],
    answer:'bon',
    hint:'"Garçon" is masculine singular.',
    explanation:'"C\'est un <b>bon</b> garçon" — bon is masculine singular (a BAGS adjective, so it goes before the noun). bon (m.sg) → bonne (f.sg) → bons (m.pl) → bonnes (f.pl). "Une bonne fille."' }),

  makeTF({ id:'g5fr-adj-010', chapterId:'fr-adjectifs', difficulty:2,
    question:'The sentence "une maison grand" is correct French.',
    answer:false,
    hint:'Two things to check: does the adjective agree, and where should it go?',
    explanation:'<b>Faux (False).</b> Two errors: (1) The adjective must agree — "maison" is feminine, so it should be "grande" not "grand". (2) Grand/grande is a BAGS (size) adjective — it goes BEFORE the noun. Correct: "une <b>grande</b> maison".' })

);
