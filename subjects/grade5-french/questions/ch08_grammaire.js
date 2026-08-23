'use strict';
// Grade 5 French — Chapter: Grammaire Essentielle
// IDs format: g5fr-gr-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-gr-001', chapterId:'fr-grammaire', difficulty:1,
    question:'How do you make a sentence NEGATIVE in French?',
    options:[
      'Put "pas" before the verb',
      'Put "ne" before the verb and "pas" after it',
      'Put "non" at the start of the sentence',
      'Change the verb to its negative form'
    ],
    answer:'Put "ne" before the verb and "pas" after it',
    hint:'Think of the phrase "ne...pas" as a bracket around the verb.',
    explanation:'French negation wraps the verb: subject + <b>ne</b> + verb + <b>pas</b>. Example: "Je mange" → "Je <b>ne</b> mange <b>pas</b>." Before a vowel: ne → n\': "Il n\'aime pas." In spoken French, the "ne" is often dropped, but in writing, include both.' }),

  makeMCQ({ id:'g5fr-gr-002', chapterId:'fr-grammaire', difficulty:1,
    question:'Make this sentence negative: "Elle parle français."',
    options:[
      'Elle pas parle français.',
      'Elle ne parle pas français.',
      'Ne elle parle pas français.',
      'Elle parle ne pas français.'
    ],
    answer:'Elle ne parle pas français.',
    hint:'ne goes before the verb, pas goes after.',
    explanation:'"<b>Elle ne parle pas français.</b>" — The verb "parle" is wrapped in ne...pas. Word order: Elle + <b>ne</b> + parle + <b>pas</b> + français.' }),

  makeMCQ({ id:'g5fr-gr-003', chapterId:'fr-grammaire', difficulty:2,
    question:'Which question form is CORRECT in French?',
    options:[
      'Tu parles français ?',
      'Est-ce que tu parles français ?',
      'Parles-tu français ?',
      'All three are correct ways to ask a question.'
    ],
    answer:'All three are correct ways to ask a question.',
    hint:'French has multiple ways to form questions — informal, standard, and formal inversion.',
    explanation:'In French, there are three ways to ask a question: (1) <b>Rising intonation</b>: "Tu parles français?" (informal spoken). (2) <b>Est-ce que</b>: "Est-ce que tu parles français?" (standard written). (3) <b>Inversion</b>: "Parles-tu français?" (formal/written). All three are correct.' }),

  makeMCQ({ id:'g5fr-gr-004', chapterId:'fr-grammaire', difficulty:2,
    question:'Complete: "Le chat est ___ la table." (The cat is UNDER the table.)',
    options:['sur','dans','sous','devant'],
    answer:'sous',
    hint:'Think of the positions: sur=on top, sous=below, dans=inside, devant=in front.',
    explanation:'"Le chat est <b>sous</b> la table." — Prepositions of place: <b>sous</b> (under), sur (on), dans (in), devant (in front of), derrière (behind), entre (between), à côté de (next to), en face de (opposite).' }),

  makeMCQ({ id:'g5fr-gr-005', chapterId:'fr-grammaire', difficulty:2,
    question:'Choose the correct partitive article: "Elle boit ___ eau." (She drinks some water.)',
    options:['du','de la','des','de l\''],
    answer:"de l'",
    hint:'Eau (water) is feminine and begins with a vowel.',
    explanation:'"Elle boit <b>de l\'</b>eau." — Partitive articles (some): du (m. sg: du pain), de la (f. sg: de la limonade), <b>de l\'</b> (before vowel/silent h: de l\'eau, de l\'huile), des (pl.: des fruits).' }),

  makeMCQ({ id:'g5fr-gr-006', chapterId:'fr-grammaire', difficulty:2,
    question:'Complete: "Je ___ ___ au cinéma ce soir." (I am going to go — futur proche)',
    options:['vais aller','vais allé','suis aller','vais à aller'],
    answer:'vais aller',
    hint:'Futur proche = aller (conjugated) + infinitive of the main verb.',
    explanation:'"Je <b>vais aller</b> au cinéma ce soir." — The <b>futur proche</b> (near future) = present tense of aller + <b>infinitive</b>: je vais manger, tu vas partir, il va finir, nous allons jouer.' }),

  makeTF({ id:'g5fr-gr-007', chapterId:'fr-grammaire', difficulty:1,
    question:'"Est-ce que" can be added to the beginning of any statement to turn it into a question.',
    answer:true,
    hint:'Try it: "Tu as faim." → "Est-ce que tu as faim?" Does that work?',
    explanation:'<b>Vrai (True).</b> "<b>Est-ce que</b>" is placed at the beginning of a sentence to form a question without changing the word order: "Tu parles français." → "<b>Est-ce que</b> tu parles français?" It is the easiest and most common way to form questions in written French.' }),

  makeMCQ({ id:'g5fr-gr-008', chapterId:'fr-grammaire', difficulty:2,
    question:'Complete: "Il y a ___ livres sur la table." (There are some books — plural)',
    options:['du','de la','de l\'','des'],
    answer:'des',
    hint:'"Des" is the partitive/indefinite plural article (= some).',
    explanation:'"Il y a <b>des</b> livres sur la table." — <b>Des</b> is used before plural nouns to mean "some": des livres, des amis, des voitures. After a negative, all partitive articles become just "de": "Il n\'y a pas <b>de</b> livres."' }),

  makeMCQ({ id:'g5fr-gr-009', chapterId:'fr-grammaire', difficulty:2,
    question:'What happens to "du/de la/des" after a NEGATIVE verb?',
    options:[
      'They stay the same: "Je ne mange pas du pain."',
      'They all become "de" or "d\'": "Je ne mange pas de pain."',
      'They become "le/la/les"',
      'They are removed completely'
    ],
    answer:'They all become "de" or "d\'": "Je ne mange pas de pain."',
    hint:'In the negative, partitive articles are replaced by just "de/d\'".',
    explanation:'After a negative, du/de la/des all become <b>de (or d\' before a vowel)</b>: "Je mange du pain." → "Je ne mange <b>pas de</b> pain." "Il boit de l\'eau." → "Il ne boit <b>pas d\'</b>eau."' }),

  makeMCQ({ id:'g5fr-gr-010', chapterId:'fr-grammaire', difficulty:2,
    question:'"Le livre est ___ la chaise et le bureau." (The book is BETWEEN the chair and the desk.)',
    options:['devant','derrière','entre','sur'],
    answer:'entre',
    hint:'"Between" two things in French = ?',
    explanation:'"Le livre est <b>entre</b> la chaise et le bureau." — "<b>Entre</b>" = between. This preposition always takes two objects (between A and B). Other prepositions: devant (in front of), derrière (behind), à côté de (next to).' })

);
