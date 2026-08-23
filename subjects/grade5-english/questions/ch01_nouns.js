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
