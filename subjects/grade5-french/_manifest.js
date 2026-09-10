'use strict';

// Sous-thèmes pour l'écran Syllabus. GENERATED from the questions' own
// `subsection:` tags - every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G5FR_SYLLABUS = {
  'fr-vocabulaire': { subsections: [
    { id:'couleurs',        name:'Les couleurs' },  // 1
    { id:'nombres',         name:'Les nombres' },  // 1
    { id:'jours_mois',      name:'Jours & mois' },  // 6
    { id:'corps',           name:'Le corps' },  // 1
    { id:'animaux',         name:'Les animaux' },  // 2
    { id:'nourriture',      name:'La nourriture' },  // 5
    { id:'politesse',       name:'Salutations & politesse' },  // 1
    { id:'temps',           name:'Le temps qui passe' },  // 2
    { id:'ecole',           name:'À l\'école' },  // 1
    { id:'transport',       name:'Les transports' },  // 4
    { id:'traduction',      name:'Traduire des mots' },  // 29
  ]},
  'fr-noms': { subsections: [
    { id:'pluriel',         name:'Le pluriel' },  // 12
    { id:'partitifs',       name:'Articles partitifs' },  // 1
    { id:'genre',           name:'Masculin ou féminin' },  // 15
    { id:'articles_indef',  name:'Articles indéfinis' },  // 6
    { id:'articles_def',    name:'Articles définis' },  // 7
  ]},
  'fr-verbes-present': { subsections: [
    { id:'pronominaux',     name:'Verbes pronominaux' },  // 2
    { id:'etre_avoir',      name:'Être & avoir' },  // 3
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 16
    { id:'verbes_er',       name:'Verbes en -ER' },  // 4
    { id:'traduction',      name:'Traduire des mots' },  // 1
    { id:'conjugaison',     name:'Conjugaison' },  // 9
  ]},
  'fr-adjectifs': { subsections: [
    { id:'comparatif',      name:'Comparatif & superlatif' },  // 8
    { id:'possessifs',      name:'Les possessifs' },  // 2
    { id:'demonstratifs',   name:'Démonstratifs' },  // 3
    { id:'accord',          name:'Les accords' },  // 22
  ]},
  'fr-passe-compose': { subsections: [
    { id:'auxiliaire',      name:'Choisir l\'auxiliaire' },  // 6
    { id:'accord',          name:'Les accords' },  // 3
    { id:'participe',       name:'Le participe passé' },  // 6
    { id:'usage',           name:'Quand l\'employer' },  // 1
    { id:'formation',       name:'Comment le former' },  // 19
  ]},
  'fr-pronoms': { subsections: [
    { id:'relatifs',        name:'Pronoms relatifs' },  // 4
    { id:'cod_coi',         name:'COD & COI' },  // 4
    { id:'possessifs',      name:'Les possessifs' },  // 3
    { id:'demonstratifs',   name:'Démonstratifs' },  // 1
    { id:'personnels',      name:'Pronoms personnels' },  // 23
  ]},
  'g5fr-passe-simple': { subsections: [
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 12
    { id:'usage',           name:'Quand l\'employer' },  // 1
    { id:'formation',       name:'Comment le former' },  // 22
  ]},
  'g5fr-subjonctif': { subsections: [
    { id:'declencheurs',    name:'Ce qui déclenche le subjonctif' },  // 11
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 12
    { id:'formation',       name:'Comment le former' },  // 12
  ]},
  'fr-lecture': { subsections: [
    { id:'narration',       name:'Le récit & le narrateur' },  // 1
    { id:'figures_style',   name:'Figures de style' },  // 4
    { id:'type_ton',        name:'Type & ton du texte' },  // 2
    { id:'vrai_faux',       name:'Vrai ou faux' },  // 2
    { id:'vocabulaire',     name:'Le sens des mots' },  // 4
    { id:'inference',       name:'Lire entre les lignes' },  // 10
    { id:'reperage',        name:'Trouver la réponse dans le texte' },  // 25
    // ⚠ These two were TAGGED on questions but never DECLARED here, so their
    //   4 questions were invisible on the Practise screen - the exact failure
    //   the subsection invariant exists to catch. Pre-existing; found while
    //   rebalancing the pack.
    { id:'idee_principale', name:'L’idée principale' },  // 3
    { id:'grammaire',       name:'La grammaire dans le texte' },  // 1
  ]},
  'fr-grammaire': { subsections: [
    { id:'negation',        name:'La négation' },  // 5
    { id:'prepositions',    name:'Les prépositions' },  // 2
    { id:'articles',        name:'Les articles' },  // 1
    { id:'conjugaison',     name:'Conjugaison' },  // 5
    { id:'divers',          name:'Divers' },  // 22
  ]},
  'g5fr-formation': { subsections: [
    { id:'verbe_nom',       name:'Du verbe au nom' },  // 20
    { id:'nom_adjectif',    name:'Du nom à l\'adjectif' },  // 20
    { id:'adjectif_adverbe', name:'De l\'adjectif à l\'adverbe' },  // 20
    { id:'former_verbe',    name:'Former un verbe' },  // 20
    { id:'prefixes',        name:'Préfixes & contraires' },  // 20
    // ── Q7A : corriger les erreurs soulignées (5 des 10 points) ──
    { id:'son_sont',       name:'Son/sont, on/ont' },  // 20
    { id:'ce_se',          name:'Ce/se, ces/ses' },  // 20
    { id:'accord_participe', name:'Participe passé et verbes pronominaux' },  // 20
    { id:'accord_nom_adjectif', name:'Pluriels et féminins irréguliers' },  // 20
    { id:'tout_leur',      name:'Tout, tous, leur, leurs' },  // 20
  ]},
  'g5fr-chasse-erreurs': { subsections: [
    { id:'chasse_erreurs',  name:'Chasse aux erreurs' },  // 20
  ]},
  'g5fr-textes-trous': { subsections: [
    { id:'texte_a_trous',   name:'Textes à trous (Q6)' },  // 20
  ]},
  'fr-textes': { subsections: [
    { id:'courriel',        name:'Courriels' },  // 5
    { id:'affiche',         name:'Affiches & annonces' },  // 4
    { id:'poeme',           name:'Poèmes' },  // 7
    { id:'legende',         name:'Légendes & contes' },  // 5
  ]},
  'fr-images': { subsections: [
    { id:'trois_images',    name:'Raconter en trois images' },  // 10
    { id:'une_image',       name:'Décrire une image' },  // 10
    { id:'decrire',         name:'Le vocabulaire pour décrire' },
    { id:'raconter',        name:'Raconter une histoire en images' },
  ]},
  'fr-enr-relier': { subsections: [
    { id:'relatifs',        name:'Pronoms relatifs (qui, que, où…)' },  // 10
    { id:'cause',           name:'Exprimer la cause' },  // 10
    { id:'opposition',      name:'Exprimer l’opposition' },  // 10
    { id:'temps',           name:'Situer dans le temps' },  // 10
    { id:'but_consequence', name:'Le but & la conséquence' },  // 10
  ]},
};


// ── Subject-specific badges ────────────────────
// Added to engine/registry.js GENERIC_BADGES for this pack only.
// pct() is from engine/helpers.js. Badge ids are permanent - see registry.js.
const G5F_BADGES = [
  { id:'g5f_maitre_vocab',  name:'Maître du Vocabulaire', icon:'🗝️',
    desc:'Score 80%+ en Vocabulaire',
    cond: (s,c) => pct(c['fr-vocabulaire']) >= 80 },
  { id:'g5f_roi_conjug',    name:'Roi de la Conjugaison', icon:'⚔️',
    desc:'80%+ au présent ET au passé composé',
    cond: (s,c) => pct(c['fr-verbes-present']) >= 80 && pct(c['fr-passe-compose']) >= 80 },
  { id:'g5f_grand_lecteur', name:'Grand Lecteur', icon:'🦉',
    desc:'Score 80%+ en Lecture',
    cond: (s,c) => pct(c['fr-lecture']) >= 80 },
];

registerSubject({
  id: 'grade5-french', name: 'French', grade: 5, icon: '📕', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true,
  // ⚠ level4Label set with the content, never before it — a relabelled empty
  // level is still an empty level. L4 is maths-shaped and does not travel.
  // ⚠ Deliberately IN FRENCH: every other label a child meets in this pack is
    // French, and an English word in the level badge would be the only one.
  // ⚠ noDifficulty REMOVED only after depth_hard.js cleared the 15-item hard
  // floor in every chapter. The flag hid the ladder while getMixedQuestions()
  // drew across all levels at once, so the MIX was the experience.
  level4Label: 'Analyse de texte',
  badges: G5F_BADGES,
  syllabus: G5FR_SYLLABUS,
  // ── EXAM WEIGHT ───────────────────────────────────────────────────────────
  // 3 = core PSAC content · 2 = normal · 1 = revision / recognition only.
  //
  // ⚠ Not one ordinary chapter set examWeight before, and the two consumers
  //   disagree about what "unset" means: assembleExamPaper() falls back to 1,
  //   the study planner in calendar.js falls back to 2. So the whole pack was
  //   weighted by accident.
  //
  // ⚠ fr-verbes-present is deliberately 1. It holds 515 questions - a quarter
  //   of this pack - because its generator produces 16 verbs x 6 people x 5
  //   completions. The present tense is revision of Grades 3-4, so it must not
  //   claim the same share of an exam paper, or the same number of timetable
  //   slots, as the passé composé that Grade 5 actually teaches. Its questions
  //   all remain available: a child who opens that chapter still practises the
  //   full 515. This changes what the app CHOOSES for them, not what exists.
  // examWeight is a chapter's share of a 40-question exam. These are measured
  // from the real 2025 papers, question by question: every
  // mark goes to the chapter that teaches it. Papers used: 2025 (100 marks, 90 of them reachable).
  //
  //   fr-images              15 marks   16.7%  ->  weight 6
  //   fr-lecture             14 marks   15.6%  ->  weight 6
  //   fr-vocabulaire         10 marks   11.1%  ->  weight 4
  //   g5fr-formation         10 marks   11.1%  ->  weight 4
  //   fr-enr-relier          10 marks   11.1%  ->  weight 4
  //   fr-grammaire            8 marks    8.9%  ->  weight 3
  //   fr-textes               6 marks    6.7%  ->  weight 2
  //   fr-verbes-present    4.25 marks    4.7%  ->  weight 2
  //   fr-passe-compose     4.25 marks    4.7%  ->  weight 2
  //   g5fr-passe-simple    4.25 marks    4.7%  ->  weight 2
  //   g5fr-subjonctif      4.25 marks    4.7%  ->  weight 2
  //
  //   fr-noms             not scored           ->  weight 1
  //   fr-adjectifs        not scored           ->  weight 1
  //   fr-pronoms          not scored           ->  weight 1
  //   g5fr-textes-trous   not scored           ->  weight 0
  //
  // ⚠ fr-noms, fr-adjectifs and fr-pronoms score no marks of their own - the
  // paper exercises them INSIDE other questions. They keep the floor of 1.
  // ⚠ g5fr-textes-trous is 0 and could be anything: every item is type
  // 'cloze', which isPoolQuestion() excludes from every pool, so Q6's 10 marks
  // are out of the denominator above and practised on its own screen.
  // scripts/test-exam-paper-shape.js holds the delivered mix against these.
  chapters: [
    {
      id: 'fr-vocabulaire', name: 'Vocabulaire de base', icon: '🗣️',
      examWeight: 4,
      notes: [
        '**Les salutations**: Bonjour (Good morning), Bonsoir (Good evening), Au revoir (Goodbye), Merci (Thank you), S\'il vous plaît (Please).',
        '**Les nombres**: un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix… vingt, trente, cent.',
        '**Les couleurs**: rouge (red), bleu (blue), vert (green), jaune (yellow), noir (black), blanc (white), orange.',
        '**Les jours**: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.',
        '**Les mois**: janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.',
      ],
    },
    {
      id: 'fr-noms', name: 'Les Noms (Genre & Nombre)', icon: '📝',
      examWeight: 1,
      notes: [
        'In French, every noun is either **masculine (m.)** or **feminine (f.)**.',
        '**Masculine** articles: un (a), le (the). **Feminine** articles: une (a), la (the).',
        'Most nouns add **-s** in the plural: le chat → les chats.',
        'Nouns ending in **-eau** add **-x**: le bateau → les bateaux.',
        'Nouns ending in **-al** change to **-aux**: le journal → les journaux.',
        'Le/la become **l\'** before a vowel or silent h: l\'ami, l\'hôtel.',
        'Plural article is always **les** (m. or f.): les chats, les maisons.',
      ],
    },
    {
      id: 'fr-verbes-present', name: 'Les Verbes - Présent', icon: '🏃',
      examWeight: 2,
      notes: [
        '**-ER verbs** (most common): parler (to speak) → je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.',
        '**-IR verbs**: finir (to finish) → je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
        '**Être** (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont.',
        '**Avoir** (to have): j\'ai, tu as, il a, nous avons, vous avez, ils ont.',
        '**Aller** (to go): je vais, tu vas, il va, nous allons, vous allez, ils vont.',
        '**Faire** (to do/make): je fais, tu fais, il fait, nous faisons, vous faites, ils font.',
      ],
    },
    {
      id: 'fr-adjectifs', name: 'Les Adjectifs', icon: '🎨',
      examWeight: 1,
      notes: [
        'In French, adjectives **agree** with the noun (masculine/feminine, singular/plural).',
        'Most adjectives add **-e** for feminine: grand → grande, petit → petite.',
        'Most adjectives add **-s** for plural: grand → grands, grande → grandes.',
        '**Before the noun** (BAGS adjectives): Beauty (beau/belle), Age (vieux/jeune), Goodness (bon/mauvais), Size (grand/petit).',
        'Irregular: beau/belle (beautiful), vieux/vieille (old), nouveau/nouvelle (new).',
        'Example: un grand garçon (m.) / une grande fille (f.) / de grands garçons (m.pl.)',
      ],
    },
    {
      id: 'fr-passe-compose', name: 'Le Passé Composé', icon: '⏰',
      examWeight: 2,
      notes: [
        'Used for actions **completed in the past**.',
        'Structure: **subject + avoir/être + past participle**.',
        '**-ER past participle**: parler → parlé, manger → mangé.',
        '**-IR past participle**: finir → fini, choisir → choisi.',
        '**-RE past participle**: vendre → vendu, attendre → attendu.',
        '**DR MRS VAN DER TRAMP** verbs use **être**: aller (allé), venir (venu), partir (parti), arriver (arrivé), naître (né), mourir (mort)…',
        'With être, the participle agrees with subject: Elle est allée. Ils sont partis.',
        'Irregular participles: avoir→eu, être→été, faire→fait, prendre→pris, voir→vu.',
      ],
    },
    {
      id: 'fr-pronoms', name: 'Les Pronoms', icon: '👤',
      examWeight: 1,
      notes: [
        '**Subject pronouns**: je (I), tu (you-informal), il (he), elle (she), nous (we), vous (you-formal/pl), ils (they-m), elles (they-f).',
        '**Direct object pronouns**: me, te, le/la, nous, vous, les. Place BEFORE the verb.',
        '**Stressed pronouns**: moi, toi, lui, elle, nous, vous, eux, elles. Used after prepositions.',
        '**Y** replaces a place or *à + noun*: Tu vas à Paris? Oui, j\'y vais.',
        '**En** replaces *de + noun*: Tu veux du pain? Oui, j\'en veux.',
      ],
    },
    {
      id: 'g5fr-passe-simple', name: 'Le Passé Simple', icon: '📜',
      examWeight: 2,
      notes: [
        '**Le passé simple** is used in literary writing, stories, and formal texts (NOT in everyday speech).',
        'For -ER verbs: je parlai, tu parlas, il/elle parla, nous parlâmes, vous parlâtes, ils/elles parlèrent.',
        'Irregular: être → fut, avoir → eut, faire → fit, aller → alla, venir → vint.',
        'Identify it in texts: "il parla, ils marchèrent, elle fut, il eut…"',
        'In stories: imparfait = background/description; passé simple = main events.',
      ],
    },
    {
      id: 'g5fr-subjonctif', name: 'Le Subjonctif Présent', icon: '🎭',
      examWeight: 2,
      notes: [
        'The **subjunctive** is used after expressions of: doubt, emotion, wish, necessity, possibility.',
        'Triggers: **il faut que**, je veux que, bien que, pour que, avant que, il est possible que…',
        'Formation: take **ils** present form, remove -ent → add -e/-es/-e/-ions/-iez/-ent.',
        'Parler: ils parlent → parl- → que je parle, que tu parles, qu\'il parle…',
        'Irregular: être → sois/soit/soyons, avoir → aie/ait/ayons, aller → aille, faire → fasse, pouvoir → puisse, venir → vienne.',
        '"Je sais que" → indicatif. "Il faut que / bien que" → toujours subjonctif.',
      ],
    },
    {
      id: 'fr-lecture', name: 'Lecture & Compréhension', icon: '🔍',
      examWeight: 6,
      notes: [
        'Read the text carefully **twice** before answering questions.',
        'For factual questions: find the answer directly in the text (copy accurately).',
        'For "dans vos propres mots" (in your own words): rephrase the answer.',
        'Connectors to use in answers: *parce que* (because), *donc* (so), *mais* (but), *et* (and), *car* (because).',
        'Always check gender/number agreement in your answers.',
        'Underline key words in questions to stay focused.',
      ],
    },
    {
      id: 'fr-grammaire', name: 'Grammaire Essentielle', icon: '📏',
      examWeight: 3,
      notes: [
        '**Negation**: put *ne* before verb and *pas* after: Je ne mange pas. (I do not eat.)',
        '**Questions**: Inversion (Parles-tu?) or *Est-ce que* (Est-ce que tu parles?).',
        '**Prepositions of place**: dans (in), sur (on), sous (under), devant (in front of), derrière (behind), entre (between).',
        '**Du/de la/des** (partitive articles - some): Je mange du pain. Elle boit de la limonade. Ils ont des amis.',
        '**Futur proche** (near future): aller + infinitive. Je vais manger (I am going to eat).',
      ],
    },
    {
      id: 'g5fr-formation', name: 'Mots & Corrections', icon: '🔤',
      examWeight: 4,
      notes: [
        'La **question 7** vaut **10 points** et se fait en **deux parties** : **7A** (5 points) - *corrige les erreurs soulignées* - puis **7B** (5 points) - *écris le mot entre parenthèses à la forme correcte*.',
        'En **7B**, cinq phrases donnent chacune un mot entre parenthèses à transformer.',
        'Demande-toi d\'abord : la phrase attend-elle un **nom**, un **adjectif**, un **adverbe** ou un **verbe** ?',
        'Verbe → nom : **-tion** (décider → décision), **-ment** (changer → changement), **-age** (atterrir → atterrissage), **-ure** (blesser → blessure), **-ance** (obéir → obéissance).',
        'Nom → adjectif : **-al** (hiver → hivernal), **-el** (nature → naturel), **-eux** (danger → dangereux), **-ier** (lait → laitier), **-ique** (histoire → historique), **-aire** (banque → bancaire).',
        'Adjectif → adverbe : adjectif au **féminin** + **-ment**. sérieux → sérieuse → **sérieusement**.',
        'Deux exceptions à connaître par cœur : **-ant → -amment** (courant → couramment) et **-ent → -emment** (prudent → prudemment). Les deux se prononcent de la même façon.',
        'Nom → verbe : **-er** (pollution → polluer) ou **-ir** (choix → choisir, noir → noircir). Après *doit, va, veut, il faut*, on écrit l\'**infinitif**.',
        'C\'est l\'**accord** qui fait perdre le plus de points : « des produits **laitiers** » prend un s, « une danse **traditionnelle** » prend -elle.',
        'Préfixes du contraire : **in-/im-/il-/ir-** (possible → impossible, légal → illégal, régulier → irrégulier), puis **dé(s)-**, **mal-** et **mé-**.',
      ],
    },
    {
      id: 'g5fr-textes-trous', name: 'Textes à Trous', icon: '🧩', enrichment: true, examWeight: 0,
      enrichmentNote: 'Entraînement à la question 6 du PSAC (texte à trous, 10 points). Chaque texte s\'ouvre dans son propre écran : on place les mots, on vérifie, on recommence.',
      notes: [
        'La **question 6** du PSAC vaut **10 points** : un texte, dix trous, un tableau de onze mots - donc **un mot en trop**.',
        'Lis le texte **en entier** avant de placer quoi que ce soit : le sens d\'un trou se trouve souvent dans la phrase **suivante**.',
        'Classe d\'abord les mots du tableau : lesquels sont des **noms**, des **verbes**, des **adjectifs**, des **adverbes** ? La classe élimine la moitié des choix à elle seule.',
        'Indices grammaticaux : après un déterminant (*une, son, des*) → **nom** ; après *aussi … que* ou *si … que* → **adjectif** ou **adverbe** ; après *il faut, on doit, par* → **infinitif**.',
        '**Procède par élimination.** Place les mots dont tu es certain, puis relis : il ne reste que quelques mots pour quelques trous.',
        'Vérifie les **accords** une fois placé : un adjectif s\'accorde avec son nom, même dans un texte à trous.',
        'Le **mot en trop** est mis là exprès pour ressembler à une bonne réponse. Ne le force jamais dans un trou juste pour tout utiliser.',
      ],
    },
    {
      // ⚠ enrichment: true makes this a gold "✨ BONUS" card, which is what was
      //   asked for. Note the tension recorded in CLAUDE.md: correction de
      //   texte IS examined (PSAC French Q7), so the BONUS badge tells a child
      //   an exam skill is optional. Textes à Trous carries the same tension.
      // ⚠ examWeight: 0 does NOT keep a chapter out of an exam - assembleExamPaper
      //   clamps every weight with Math.max(1, …). What actually holds is that
      //   isPoolQuestion() excludes type 'errorhunt', so this chapter can fill
      //   nothing and assembleExamPaper drops it rather than losing the slot.
      id: 'g5fr-chasse-erreurs', name: 'Chasse aux Erreurs', icon: '🔍', enrichment: true, examWeight: 0,
      enrichmentNote: 'Correction de texte, comme à la question 7 du PSAC. Le texte est plein d\'erreurs : à toi de cliquer sur chaque mot fautif. Vérifier ne donne que le nombre trouvé - Terminer révèle tout.',
      notes: [
        'Le texte est **plein d\'erreurs**. Clique sur chaque mot qui ne va pas, puis vérifie.',
        '**L\'adjectif s\'accorde avec son nom** : *une petite fille*, *des petites filles*, *un petit garçon*.',
        '**Avec être, le participe passé s\'accorde** : *elle est partie*, *ils sont partis*, *elles sont parties*.',
        '**et ou est ?** Remplace par *était* : si ça marche, c\'est **est**. Sinon, c\'est **et**.',
        '**son ou sont ?** Remplace par *étaient* : si ça marche, c\'est **sont**. Sinon, c\'est **son**.',
        '**ce ou se ?** *se* accompagne un verbe (*il se lave*), *ce* accompagne un nom (*ce livre*).',
        '**La virgule** sépare les éléments d\'une liste : *du pain, du lait, des œufs et du riz*.',
        'Astuce : relis **une phrase à la fois**. Cherche d\'abord le verbe, puis son sujet.',
      ],
    },
    {
      id: 'fr-textes', name: 'Textes & Types de Textes', icon: '📄',
      examWeight: 2,
      notes: [
        'Le **courriel** : De / À / Objet. La ligne **Objet** annonce le but en quelques mots.',
        'La **lettre amicale** : adresse et date en haut à droite, « Chère… », des nouvelles personnelles, « Je t\'embrasse ». La lettre formelle finit par « Veuillez agréer… ».',
        'Le **récit personnel** : on raconte à la **première personne**, à partir d\'un moment précis, avec des comparaisons et des sentiments.',
        'L\'**annonce** : les informations clés en gras, une **date limite**, et des **conditions entre parenthèses** qui changent le prix.',
        'Le **poème** : cherche la **comparaison** (comme), la **métaphore** (X *est* Y) et la **personnification** (un objet qui agit comme un humain).',
        'Quand on demande « comment le sait-on ? », montre la **preuve** : un chiffre, une date, une phrase citée.',
        'Relie chaque nombre du texte au mot auquel il se rapporte : les examens piègent avec deux chiffres proches.',
      ],
    },
    {
      id: 'fr-images', name: 'Description d\'Images', icon: '🖼️',
      examWeight: 6,
      notes: [
        'Deux formats : **une seule image** à décrire, ou **trois images** qui racontent une histoire.',
        'Vocabulaire de position attendu : **au premier plan**, **à l\'arrière-plan**, **à gauche / à droite**, **au centre**.',
        'Pour une action en cours : **être en train de + infinitif**. « Le marchand *est en train de vendre* des fruits. »',
        'Utilise tout **texte visible** sur l\'image (panneau, prix, enseigne) : il fait partie des informations à exploiter.',
        'Pour TROIS images : situation de départ → problème → solution. Repère dans l\'image 1 le **détail qui annonce la suite**.',
        'Au passé, mélange les deux temps : **imparfait** pour le décor qui dure, **passé composé** pour l\'événement soudain.',
        'Connecteurs utiles : *Ce matin-là, Ensuite, Soudain, Alors, Enfin, Le lendemain*.',
        'Les images montrent les **actions** ; c\'est à toi d\'ajouter les **sentiments**, les **paroles** et une **conclusion**.',
      ],
    },
    // @enrichment - DERIVED from the syllabus (relative pronouns, conjunctions,
    // subordinate clauses), NOT a direct MIE chapter. DO NOT remove during
    // syllabus alignment audits. Shows as a gold "BONUS" card.
    {
      id: 'fr-enr-relier', name: 'Relier les Phrases', icon: '🔗',
      enrichment: true, examWeight: 4,
      enrichmentNote: 'La question « Relie chaque paire de phrases en te servant du mot donné entre parenthèses » du PSAC. On ajoute « dont », l’élision (parce qu’il), l’accord du participe et « pour que » + subjonctif.',
    },
  ],
});
