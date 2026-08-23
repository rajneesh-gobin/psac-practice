'use strict';
// Grade 5 French — Chapter: Les Noms (Genre & Nombre)
// IDs format: g5fr-nom-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-nom-001', chapterId:'fr-noms', difficulty:1,
    question:'Which article shows a noun is MASCULINE and SINGULAR?',
    options:['la','les','une','le'],
    answer:'le',
    hint:'There are two definite articles for singular nouns — one masculine, one feminine.',
    explanation:'"<b>Le</b>" is the definite article for masculine singular nouns (le garçon, le livre, le chat). "La" is for feminine singular (la fille, la maison). "Les" is for all plurals. "Une" is the indefinite feminine article.' }),

  makeMCQ({ id:'g5fr-nom-002', chapterId:'fr-noms', difficulty:1,
    question:'Choose the correct article: "___ école est grande." (school = feminine)',
    options:['Le','La','L\'','Les'],
    answer:"L'",
    hint:'The word "école" starts with a vowel. What happens to le/la before a vowel?',
    explanation:'"<b>L\'école</b>" — le and la both become <b>l\'</b> (with an apostrophe) before a vowel or silent h. This is called elision. Examples: l\'ami (m.), l\'eau (f.), l\'hôpital (m.).' }),

  makeMCQ({ id:'g5fr-nom-003', chapterId:'fr-noms', difficulty:2,
    question:'What is the plural of "le bateau" (the boat)?',
    options:['les bateaus','les bateaux','les bateau','les bateus'],
    answer:'les bateaux',
    hint:'Nouns ending in -eau add -x (not -s) in the plural.',
    explanation:'"<b>Les bateaux</b>" — nouns ending in -eau add <b>-x</b> in the plural: bateau→bateaux, gâteau→gâteaux, château→châteaux. The plural article is always "les" for both masculine and feminine.' }),

  makeMCQ({ id:'g5fr-nom-004', chapterId:'fr-noms', difficulty:2,
    question:'What is the plural of "le journal" (the newspaper)?',
    options:['les journals','les journaux','les journales','les journal'],
    answer:'les journaux',
    hint:'Nouns ending in -al change to -aux in the plural.',
    explanation:'"<b>Les journaux</b>" — nouns ending in -al change to <b>-aux</b> in the plural: journal→journaux, animal→animaux, cheval→chevaux, hôpital→hôpitaux.' }),

  makeTF({ id:'g5fr-nom-005', chapterId:'fr-noms', difficulty:1,
    question:'In French, "les" is used as the plural article for BOTH masculine and feminine nouns.',
    answer:true,
    hint:'Think: le chat → les chats / la maison → les maisons. What article is used each time?',
    explanation:'<b>Vrai (True).</b> "<b>Les</b>" is the only plural definite article — it is used for all plural nouns regardless of gender: les chats (m. pl.), les maisons (f. pl.), les enfants (pl.).' }),

  makeMCQ({ id:'g5fr-nom-006', chapterId:'fr-noms', difficulty:1,
    question:'Which word is FEMININE? (Choose the one that takes "la")',
    options:['le chien (dog)','le stylo (pen)','la fleur (flower)','le livre (book)'],
    answer:'la fleur (flower)',
    hint:'The article before the noun tells you its gender.',
    explanation:'"<b>La fleur</b>" is feminine — indicated by the article "la". Masculine nouns take "le": le chien, le stylo, le livre. Learning the article with the noun is essential in French.' }),

  makeMCQ({ id:'g5fr-nom-007', chapterId:'fr-noms', difficulty:2,
    question:'What is the plural of "une amie" (a female friend)?',
    options:['un amies','des amie','des amies','les amie'],
    answer:'des amies',
    hint:'The indefinite article in the plural is "des". Add -s to the noun.',
    explanation:'"<b>Des amies</b>" — "une" becomes "<b>des</b>" in the plural (indefinite). The noun adds -s: amie → amies. "Des" = some/a few and is used for all genders in the plural: des livres, des fleurs, des amis.' }),

  makeMCQ({ id:'g5fr-nom-008', chapterId:'fr-noms', difficulty:1,
    question:'How do you say "a cat" in French? (chat = masculine)',
    options:['le chat','la chat','un chat','une chat'],
    answer:'un chat',
    hint:'"A" for a masculine noun = un. "A" for a feminine noun = une.',
    explanation:'"<b>Un chat</b>" — "un" is the indefinite article for masculine singular nouns (a/one). "Une" is used for feminine nouns: une chatte (a female cat). "Le/la" are definite (the).' }),

  makeTF({ id:'g5fr-nom-009', chapterId:'fr-noms', difficulty:2,
    question:'The plural of "l\'œil" (the eye) is "les œils".',
    answer:false,
    hint:'This is an irregular plural — the noun changes completely.',
    explanation:'<b>Faux (False).</b> "L\'œil" has an irregular plural: <b>les yeux</b>. This is one of the most common irregular plurals in French and must be memorised. Other irregulars: le travail → les travaux.' }),

  makeMCQ({ id:'g5fr-nom-010', chapterId:'fr-noms', difficulty:2,
    question:'Choose the correct form: "J\'ai un ___ rouge." (referring to a female friend who is red? No — "un crayon rouge" — crayon is masculine)',
    question:'Which is correct: "Elle a ___ robe bleue."',
    options:['un','le','une','des'],
    answer:'une',
    hint:'"Robe" (dress) is feminine. "A dress" = which article?',
    explanation:'"<b>Une</b> robe bleue" — robe is feminine, so we use the feminine indefinite article "une" (= a). Un = masculine indefinite. Le/la = definite (the). "Elle a une robe bleue" = She has a blue dress.' })

);
