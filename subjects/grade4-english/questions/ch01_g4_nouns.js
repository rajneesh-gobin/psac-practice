'use strict';
// Grade 4 English — Chapter: Nouns, Pronouns & Articles
// IDs format: g4eng-noun-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4eng-noun-001', chapterId:'g4eng-nouns', difficulty:1,
    question:'Which of the following is a PROPER noun?',
    options:['dog','school','Mauritius','teacher'],
    answer:'Mauritius',
    hint:'A proper noun is the specific name of a person, place or thing. It always starts with a capital letter.',
    explanation:'<b>Mauritius</b> is a proper noun — it is the specific name of our country and always begins with a capital letter. Dog, school and teacher are common nouns — they name general things and do not need capitals.' }),

  makeMCQ({ id:'g4eng-noun-002', chapterId:'g4eng-nouns', difficulty:1,
    question:'Choose the correct article: "I saw ___ owl in the tree."',
    options:['a','an','the','some'],
    answer:'an',
    hint:'Use "an" before a word that starts with a vowel sound (a, e, i, o, u).',
    explanation:'We use <b>an</b> before words beginning with a vowel sound. "Owl" starts with the vowel "o", so we say <b>an owl</b>. We use "a" before consonant sounds: a cat, a dog, a tree.' }),

  makeMCQ({ id:'g4eng-noun-003', chapterId:'g4eng-nouns', difficulty:1,
    question:'What is the PLURAL of "child"?',
    options:['childs','childes','children','childrens'],
    answer:'children',
    hint:'Some plurals are irregular — they do NOT follow the usual rule of adding -s or -es.',
    explanation:'"Child" has the irregular plural <b>children</b>. Irregular plurals must be memorised: child→children, man→men, woman→women, tooth→teeth, foot→feet, mouse→mice, goose→geese.' }),

  makeTF({ id:'g4eng-noun-004', chapterId:'g4eng-nouns', difficulty:1,
    question:'"Happiness" is a noun.',
    answer:true,
    hint:'Nouns name not only people and objects, but also feelings and ideas.',
    explanation:'<b>True.</b> "Happiness" is an <b>abstract noun</b> — it names a feeling that cannot be seen or touched. Other abstract nouns: love, kindness, freedom, anger, courage, honesty.' }),

  makeMCQ({ id:'g4eng-noun-005', chapterId:'g4eng-nouns', difficulty:2,
    question:'What is the COLLECTIVE NOUN for a group of fish?',
    options:['a herd of fish','a flock of fish','a school of fish','a pack of fish'],
    answer:'a school of fish',
    hint:'Think of the special group name used for fish.',
    explanation:'A <b>school</b> of fish is the correct collective noun. Other collective nouns to know: a flock of birds/sheep, a herd of cows/elephants, a pack of wolves, a swarm of bees, a pride of lions, a class of students.' }),

  makeMCQ({ id:'g4eng-noun-006', chapterId:'g4eng-nouns', difficulty:2,
    question:'What is the PLURAL of "leaf"?',
    options:['leafs','leafes','leaves','leave'],
    answer:'leaves',
    hint:'Words ending in "-f" often change to "-ves" in the plural.',
    explanation:'"Leaf" changes to <b>leaves</b>. Many nouns ending in -f or -fe change to -ves in the plural: leaf→leaves, half→halves, knife→knives, life→lives, wolf→wolves. But some keep -s: roof→roofs, chef→chefs.' }),

  makeMCQ({ id:'g4eng-noun-007', chapterId:'g4eng-nouns', difficulty:1,
    question:'Which word is a PRONOUN in: "She gave him a gift."',
    options:['gave','gift','She','a'],
    answer:'She',
    hint:'A pronoun replaces a noun. Look for words like he, she, it, they, him, her, me.',
    explanation:'"<b>She</b>" is a subject pronoun — it replaces the name of the person giving the gift. "Him" is also a pronoun in this sentence. Pronouns avoid repeating names: instead of "Meena gave Raj a gift", we say "She gave him a gift."' }),

  makeMCQ({ id:'g4eng-noun-008', chapterId:'g4eng-nouns', difficulty:2,
    question:'Which sentence uses "the" CORRECTLY?',
    options:[
      'I want to be the doctor one day.',
      'The sun sets in the west.',
      'She has the beautiful dress.',
      'He is the good student.'
    ],
    answer:'The sun sets in the west.',
    hint:'"The" is used for something specific and unique, or something already identified.',
    explanation:'"<b>The sun sets in the west</b>" is correct — we use <b>the</b> for unique, one-of-a-kind things (the sun, the moon, the west). "I want to be <b>a</b> doctor" is correct — it refers to the job in general, not a specific doctor.' }),

  makeNum({ id:'g4eng-noun-009', chapterId:'g4eng-nouns', difficulty:2,
    question:'How many NOUNS are in: "The children played football in the park."? Write a number.',
    answer:'3', acceptableAnswers:['3'],
    hint:'Find all the naming words: people, things and places.',
    explanation:'There are <b>3 nouns</b>: "children" (people), "football" (thing), "park" (place). "The" is an article, "played" is a verb, "in" is a preposition. Always look for naming words to identify nouns.' }),

  makeMCQ({ id:'g4eng-noun-010', chapterId:'g4eng-nouns', difficulty:4,
    question:'Read this passage: "Asha found a puppy near the school gate. She brought it home and fed it some milk. Her parents were surprised when they saw it." Which pronoun refers to ASHA\'S PARENTS?',
    options:['She','it','Her','they'],
    answer:'they',
    hint:'Find who "they" refers to — which noun in the passage comes before this pronoun?',
    explanation:'"<b>They</b>" refers to Asha\'s parents — "they saw it" means her parents saw the puppy. Tracking what each pronoun refers back to (its antecedent) is a key comprehension skill. "She" = Asha. "It" = the puppy. "Her" = Asha (possessive).' })

);
