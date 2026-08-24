'use strict';
// Grade 5 English — Chapter: Nouns, Pronouns & Articles
// IDs format: g5eng-noun-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-noun-001', chapterId:'eng-nouns', difficulty:1,
    question:'Which of the following is a PROPER noun?',
    options:['city','teacher','Port Louis','river'],
    answer:'Port Louis',
    hint:'A proper noun is the specific name of a person, place or thing — it begins with a capital letter.',
    explanation:'<b>Port Louis</b> is a proper noun — it is the specific name of the capital city of Mauritius. Common nouns (city, teacher, river) name general things and do not need a capital letter.' }),

  makeMCQ({ id:'g5eng-noun-002', chapterId:'eng-nouns', difficulty:1,
    question:'Choose the correct article: "She ate ___ apple."',
    options:['a','an','the','no article needed'],
    answer:'an',
    hint:'Use "an" before a word that begins with a vowel sound (a, e, i, o, u).',
    explanation:'We use <b>an</b> before words starting with a vowel sound. "Apple" starts with the vowel "a", so we write <b>an apple</b>. We use "a" before consonant sounds (a dog, a cat).' }),

  makeMCQ({ id:'g5eng-noun-003', chapterId:'eng-nouns', difficulty:1,
    question:'Which word is a PRONOUN in the sentence: "She gave him the book."',
    options:['gave','book','She','the'],
    answer:'She',
    hint:'A pronoun replaces a noun. Look for words like I, he, she, it, we, they, him, her, them.',
    explanation:'<b>She</b> is a pronoun — it replaces the name of the person who gave the book. <b>Him</b> is also a pronoun in this sentence (replacing the name of the person who received the book).' }),

  makeMCQ({ id:'g5eng-noun-004', chapterId:'eng-nouns', difficulty:2,
    question:'Which sentence uses the article "the" CORRECTLY?',
    options:[
      'I saw the elephant at a zoo yesterday.',
      'She wants to be the doctor one day.',
      'The sun rises in the east.',
      'He has the good idea.'
    ],
    answer:'The sun rises in the east.',
    hint:'"The" is used for something specific or unique — there is only one sun, one east.',
    explanation:'"<b>The sun rises in the east</b>" is correct. We use <b>the</b> for unique things (the sun, the moon, the east). The other sentences incorrectly use "the" with general or non-specific nouns.' }),

  makeTF({ id:'g5eng-noun-005', chapterId:'eng-nouns', difficulty:1,
    question:'The word "happiness" is a noun.',
    answer:true,
    hint:'Nouns name not only things and places but also ideas and feelings.',
    explanation:'<b>True.</b> "Happiness" is an <b>abstract noun</b> — it names a feeling or idea rather than a physical object. Other abstract nouns include: love, freedom, knowledge, beauty.' }),

  makeMCQ({ id:'g5eng-noun-006', chapterId:'eng-nouns', difficulty:2,
    question:'Choose the correct pronoun: "My sister and ___ went to the market."',
    options:['me','I','her','him'],
    answer:'I',
    hint:'When the pronoun is the subject of the sentence (doing the action), use "I" not "me". Remove "my sister and" — would you say "Me went to the market"?',
    explanation:'Use <b>I</b> when it is the subject (doing the action). Test: remove "my sister and" — "I went to the market" ✓ vs "Me went to the market" ✗. So: "My sister and <b>I</b> went to the market."' }),

  makeMCQ({ id:'g5eng-noun-007', chapterId:'eng-nouns', difficulty:1,
    question:'Which of these is a COLLECTIVE noun?',
    options:['flock','bird','sky','quickly'],
    answer:'flock',
    hint:'A collective noun names a group of people, animals or things.',
    explanation:'A <b>flock</b> is a collective noun — it names a group of birds. Other collective nouns: a pack of wolves, a class of students, a bunch of flowers.' }),

  makeMCQ({ id:'g5eng-noun-008', chapterId:'eng-nouns', difficulty:2,
    question:'Fill in the blank: "___ uniform is on the chair." (referring to a specific uniform)',
    options:['A','An','The','Some'],
    answer:'The',
    hint:'Is this uniform specific and already known, or any uniform?',
    explanation:'We use <b>the</b> when talking about a specific item that is known to the speaker and listener. "The uniform" refers to a particular, identified uniform — not just any uniform.' }),

  makeTF({ id:'g5eng-noun-009', chapterId:'eng-nouns', difficulty:1,
    question:'Pronouns and nouns can be used interchangeably in any position in a sentence without changing the meaning.',
    answer:false,
    hint:'Think about subject pronouns (I, he, she) vs object pronouns (me, him, her).',
    explanation:'<b>False.</b> Different pronouns are used in different positions. Subject pronouns (I, he, she, we, they) come before the verb. Object pronouns (me, him, her, us, them) come after the verb or preposition. "He helped me" — not "Him helped I".' }),

  makeMCQ({ id:'g5eng-noun-010', chapterId:'eng-nouns', difficulty:2,
    question:'In the sentence "Kindness is a virtue", which word is an abstract noun?',
    options:['Kindness only','virtue only','Both kindness and virtue','Neither — there are no nouns'],
    answer:'Both kindness and virtue',
    hint:'Abstract nouns name qualities, ideas or feelings that you cannot physically touch.',
    explanation:'<b>Both</b> "kindness" and "virtue" are abstract nouns — they name qualities or values that cannot be seen or touched. Abstract nouns often end in -ness, -tion, -ity, -ment, -ance.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-noun-011', chapterId:'eng-nouns', difficulty:1,
    question:'Fill in the blank with the correct REFLEXIVE PRONOUN: "We really enjoyed ___ at the party."',
    options:['ourselves','themselves','himself','yourself'],
    answer:'ourselves',
    hint:'The subject is "We" — the reflexive pronoun must match: we → ourselves.',
    explanation:'"<b>Ourselves</b>" matches the subject "We". Reflexive pronouns reflect the action back to the subject: I→myself, you→yourself, he→himself, she→herself, it→itself, we→ourselves, they→themselves.' }),

  makeMCQ({ id:'g5eng-noun-012', chapterId:'eng-nouns', difficulty:1,
    question:'Fill in the blank: "My dog is sick. I am taking it to the ___."',
    options:['dentist','vet','doctor','nurse'],
    answer:'vet',
    hint:'Which professional treats animals?',
    explanation:'A <b>vet</b> (veterinarian) is the medical professional who treats animals. A doctor treats humans, a dentist treats teeth, a nurse assists in medical care. Always match the vocabulary to the context.' }),

  makeMCQ({ id:'g5eng-noun-013', chapterId:'eng-nouns', difficulty:1,
    question:'Fill in the blank: "The football match will take place at the ___."',
    options:['restaurant','bank','stadium','library'],
    answer:'stadium',
    hint:'Football is a sport — where are sports events held?',
    explanation:'A <b>stadium</b> is a large venue where sports events are held. A restaurant is for eating, a bank is for money, a library is for books. Using context to choose vocabulary is an important reading skill.' }),

  makeMCQ({ id:'g5eng-noun-014', chapterId:'eng-nouns', difficulty:2,
    question:'Fill in the blank: "The man forgot to take ___ umbrella before leaving."',
    options:['his','her','its','their'],
    answer:'his',
    hint:'"The man" is singular and male — which possessive adjective matches?',
    explanation:'"<b>His</b>" is the possessive adjective for a male subject (he). Her = female (she). Its = thing/animal. Their = plural (they). Possessive adjectives (my, your, his, her, its, our, their) always go before a noun.' }),

  makeMCQ({ id:'g5eng-noun-015', chapterId:'eng-nouns', difficulty:1,
    question:'Fill in the blank: "___ is knocking at the door?"',
    options:['Who','Where','When','What'],
    answer:'Who',
    hint:'We are asking about a PERSON who is knocking.',
    explanation:'"<b>Who</b>" asks about a person. Where asks about a place. When asks about a time. What asks about a thing or action. "Who is knocking?" asks for the identity of the person at the door.' }),

  makeMCQ({ id:'g5eng-noun-016', chapterId:'eng-nouns', difficulty:2,
    question:'Which sentence uses the correct QUANTIFIER?',
    options:[
      'She drank many water.',
      'Grandfather drinks some juice every morning.',
      'I have few milk in my glass.',
      'He ate much apples.'
    ],
    answer:'Grandfather drinks some juice every morning.',
    hint:'"Some" works with both countable and uncountable nouns. "Many/few" is for countable; "much/little" for uncountable.',
    explanation:'"<b>Some juice</b>" is correct — "some" works with uncountable nouns. "Many water" and "few milk" are wrong (water/milk are uncountable — use "much/little"). "Much apples" is wrong (apples are countable — use "many"). Some can be used with both.' }),

  makeMCQ({ id:'g5eng-noun-017', chapterId:'eng-nouns', difficulty:2,
    question:'What is the correct COLLECTIVE NOUN for a group of wolves?',
    options:['a flock of wolves','a pack of wolves','a herd of wolves','a swarm of wolves'],
    answer:'a pack of wolves',
    hint:'Wolves travel and hunt in packs.',
    explanation:'<b>A pack</b> of wolves is the correct collective noun. Other collective nouns: a flock of birds/sheep, a herd of cows/elephants, a swarm of bees, a school of fish, a pride of lions, a bunch of flowers.' }),

  makeMCQ({ id:'g5eng-noun-018', chapterId:'eng-nouns', difficulty:3,
    question:'Choose the sentence where ALL pronouns are used correctly.',
    options:[
      'Me and her went to the market together.',
      'She and I went to the market together.',
      'Her and me went to the market together.',
      'I and her went to the market together.'
    ],
    answer:'She and I went to the market together.',
    hint:'Both pronouns are the SUBJECT of the sentence (doing the action). Which pronoun forms do you use for subjects?',
    explanation:'"<b>She and I</b> went..." — both pronouns are subjects, so use subject forms (I, he, she, we, they). "Me and her" uses object pronouns as subjects — incorrect. Test by removing one: "I went ✓ / Me went ✗". "She went ✓ / Her went ✗".' }),

  makeMCQ({ id:'g5eng-noun-019', chapterId:'eng-nouns', difficulty:4,
    question:'The sentence "Raj always takes care ___ his little sister" needs a preposition. Which is correct, and why?',
    options:[
      '"care at his sister" — because "at" shows direction',
      '"care of his sister" — because "take care of" is a fixed phrase (phrasal verb) meaning to look after',
      '"care up his sister" — because "up" suggests improvement',
      '"care by his sister" — because "by" shows the person involved'
    ],
    answer:'"care of his sister" — because "take care of" is a fixed phrase (phrasal verb) meaning to look after',
    hint:'Some verbs always pair with specific prepositions — these must be learned as fixed expressions.',
    explanation:'"<b>Take care of</b>" is a fixed phrasal expression meaning "to look after". Many English verbs pair with specific prepositions that cannot be changed: take care <b>of</b>, look <b>at</b>, listen <b>to</b>, arrive <b>at</b>, wait <b>for</b>. These must be learned as phrases, not worked out from the preposition meaning alone.' })

);
