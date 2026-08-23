'use strict';
// Grade 5 French — Chapter: Les Pronoms
// IDs format: g5fr-pro-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pro-001', chapterId:'fr-pronoms', difficulty:1,
    question:'Which pronoun do you use for "we" in French?',
    options:['vous','ils','on','nous'],
    answer:'nous',
    hint:'The six subject pronouns are: je, tu, il, elle, nous, vous, ils, elles.',
    explanation:'"<b>Nous</b>" = we. The subject pronouns: je (I), tu (you-informal), il (he), elle (she), <b>nous</b> (we), vous (you-formal/plural), ils (they-m), elles (they-f). Note: "on" also means "we" informally.' }),

  makeMCQ({ id:'g5fr-pro-002', chapterId:'fr-pronoms', difficulty:2,
    question:'Replace the underlined noun: "Je vois <u>Marie</u>." → "Je ___ vois."',
    options:['lui','la','le','les'],
    answer:'la',
    hint:'Marie is feminine singular. Direct object pronoun for feminine singular = ?',
    explanation:'"Je <b>la</b> vois" — Marie is the direct object (what/whom I see), feminine singular → replace with "<b>la</b>". Direct object pronouns: me, te, le (m.sg), la (f.sg), nous, vous, les (pl.). They go BEFORE the verb.' }),

  makeMCQ({ id:'g5fr-pro-003', chapterId:'fr-pronoms', difficulty:2,
    question:'Replace: "Nous invitons <u>nos amis</u>." → "Nous ___ invitons."',
    options:['le','la','leur','les'],
    answer:'les',
    hint:'"Nos amis" is plural (our friends). Which direct object pronoun replaces a plural noun?',
    explanation:'"Nous <b>les</b> invitons" — "nos amis" is plural → replace with "<b>les</b>" (them). "Les" replaces all plural direct object nouns regardless of gender.' }),

  makeMCQ({ id:'g5fr-pro-004', chapterId:'fr-pronoms', difficulty:1,
    question:'Which is the correct use of a stressed pronoun? (after a preposition)',
    options:[
      'Il parle je.',
      'C\'est moi.',
      'Moi mange une pomme.',
      'Elle lui donne.'
    ],
    answer:"C'est moi.",
    hint:'Stressed pronouns (moi, toi, lui, elle...) are used after prepositions and after c\'est.',
    explanation:'"<b>C\'est moi</b>" (It\'s me) — stressed pronouns are used after c\'est and prepositions: c\'est moi, c\'est toi, c\'est lui/elle. Also: avec moi (with me), pour toi (for you), chez lui (at his place).' }),

  makeMCQ({ id:'g5fr-pro-005', chapterId:'fr-pronoms', difficulty:2,
    question:'"Tu vas à Paris ?" "Oui, j\'___ vais." — What pronoun replaces "à Paris"?',
    options:['en','y','le','lui'],
    answer:'y',
    hint:'"Y" replaces a location or "à + noun".',
    explanation:'"<b>Y</b>" replaces à + place (or any place already mentioned): "Tu vas à Paris?" "Oui, j\'<b>y</b> vais." (Yes, I\'m going there.) Y = there / to it. It always goes before the verb.' }),

  makeMCQ({ id:'g5fr-pro-006', chapterId:'fr-pronoms', difficulty:2,
    question:'"Tu veux du café?" "Oui, j\'___ veux bien." — What pronoun is missing?',
    options:['y','le','en','lui'],
    answer:'en',
    hint:'"En" replaces "de + noun" (or a partitive article + noun like du/de la/des).',
    explanation:'"<b>En</b>" replaces de + noun or partitive (du/de la/des): "Tu veux du café?" "Oui, j\'<b>en</b> veux." En = some of it / of them. It goes before the verb.' }),

  makeTF({ id:'g5fr-pro-007', chapterId:'fr-pronoms', difficulty:2,
    question:'In French, direct object pronouns go AFTER the verb.',
    answer:false,
    hint:'Think: "Je la vois" or "Je vois la"? Which order is correct?',
    explanation:'<b>Faux (False).</b> In French, direct object pronouns go <b>BEFORE</b> the conjugated verb: "Je <b>la</b> vois" (I see her — not "Je vois la"). Exception: in the imperative (command) affirmative, they go after with a hyphen: "Regarde-<b>la</b>!"' }),

  makeMCQ({ id:'g5fr-pro-008', chapterId:'fr-pronoms', difficulty:1,
    question:'What is the stressed pronoun for "il" (he)?',
    options:['moi','toi','lui','soi'],
    answer:'lui',
    hint:'Subject → stressed: je→moi, tu→toi, il→?, elle→elle, nous→nous, vous→vous, ils→eux, elles→elles.',
    explanation:'"<b>Lui</b>" — the stressed pronoun for il. Full list: je→moi, tu→toi, il→<b>lui</b>, elle→elle, nous→nous, vous→vous, ils→eux, elles→elles. Used after prepositions: "Il parle de lui" (He talks about himself).' }),

  makeMCQ({ id:'g5fr-pro-009', chapterId:'fr-pronoms', difficulty:2,
    question:'Choose the correct sentence:',
    options:[
      'Je le donne à lui le livre.',
      'Je lui donne le livre.',
      'Je donne lui le livre.',
      'Lui je donne le livre.'
    ],
    answer:'Je lui donne le livre.',
    hint:'"Lui" as an indirect object pronoun (to him) goes before the verb.',
    explanation:'"<b>Je lui donne le livre</b>" (I give him the book). "Lui" here is an <b>indirect object pronoun</b> (= to him/to her), going before the verb. Indirect object pronouns: me, te, lui, nous, vous, leur.' }),

  makeMCQ({ id:'g5fr-pro-010', chapterId:'fr-pronoms', difficulty:2,
    question:'Which pronoun replaces "elles" (they — feminine) in a stressed position?',
    options:['eux','lui','elles','leur'],
    answer:'elles',
    hint:'The stressed pronoun for elles is the same word.',
    explanation:'"<b>Elles</b>" — the stressed pronoun for elles (they, feminine) is the same word. Compare: ils (subject) → <b>eux</b> (stressed), elles (subject) → <b>elles</b> (stressed). Used: "C\'est elles!" / "Il parle d\'elles."' })

);
