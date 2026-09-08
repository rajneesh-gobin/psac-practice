'use strict';

// Sous-thèmes pour l'écran Syllabus. GENERATED from the questions' own
// `subsection:` tags - every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G6FR_SYLLABUS = {
  'g6fr-imparfait': { subsections: [
    { id:'vs_passe_comp',   name:'Imparfait ou passé composé' },  // 1
    { id:'terminaisons',    name:'Les terminaisons' },  // 2
    { id:'usage',           name:'Quand l\'employer' },  // 2
    { id:'formation',       name:'Comment le former' },  // 33
  ]},
  'g6fr-futur': { subsections: [
    { id:'futur_proche',    name:'Le futur proche' },  // 2
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 17
    { id:'formation',       name:'Comment le former' },  // 19
  ]},
  'g6fr-subordonnees': { subsections: [
    { id:'relatives',       name:'Propositions relatives' },  // 11
    { id:'conjonctions',    name:'Les conjonctions' },  // 5
    { id:'analyse',         name:'Analyser la phrase' },  // 23
  ]},
  'g6fr-subjunctif': { subsections: [
    { id:'declencheurs',    name:'Ce qui déclenche le subjonctif' },  // 10
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 10
    { id:'usage',           name:'Quand l\'employer' },  // 1
    { id:'formation',       name:'Comment le former' },  // 14
  ]},
  'g6fr-conditionnel': { subsections: [
    { id:'si_clauses',      name:'Phrases avec « si »' },  // 9
    { id:'politesse',       name:'Salutations & politesse' },  // 3
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 11
    { id:'usage',           name:'Quand l\'employer' },  // 2
    { id:'formation',       name:'Comment le former' },  // 10
  ]},
  'g6fr-pqp': { subsections: [
    { id:'concordance',     name:'Concordance des temps' },  // 9
    { id:'usage',           name:'Quand l\'employer' },  // 1
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 9
    { id:'formation',       name:'Comment le former' },  // 16
  ]},
  'g6fr-formation': { subsections: [
    { id:'verbe_nom',       name:'Du verbe au nom' },  // 20
    { id:'nom_adjectif',    name:'Du nom à l\'adjectif' },  // 20
    { id:'adjectif_adverbe', name:'De l\'adjectif à l\'adverbe' },  // 20
    { id:'former_verbe',    name:'Former un verbe' },  // 20
    { id:'prefixes',        name:'Préfixes & contraires' },  // 20
    // ── Q7A : corriger les erreurs soulignées (5 des 10 points) ──
    { id:'son_sont',       name:'Son/sont, on/ont, a/à, ou/où' },  // 21
    { id:'ce_se',          name:'C\'est/s\'est, ce/se, ces/ses' },  // 21
    { id:'accord_participe', name:'Le participe passé avec avoir' },  // 21
    { id:'accord_nom_adjectif', name:'Les mots invariables trompeurs' },  // 21
    { id:'tout_leur',      name:'Tout adverbe, leur pronom' },  // 21
  ]},
  'g6fr-chasse-erreurs': { subsections: [
    { id:'chasse_erreurs',  name:'Chasse aux erreurs' },  // 20
  ]},
  'g6fr-textes-trous': { subsections: [
    { id:'texte_a_trous',   name:'Textes à trous (Q6)' },  // 20
  ]},
  'g6fr-argumentation': { subsections: [
    { id:'connecteurs',     name:'Connecteurs logiques' },  // 12
    { id:'opinion',         name:'Donner son opinion' },  // 3
    { id:'structure',       name:'Structure du texte' },  // 7
    { id:'arguments',       name:'Arguments' },  // 6
    { id:'vocabulaire',     name:'Le sens des mots' },  // 7
  ]},
  'g6fr-lecture': { subsections: [
    { id:'images',          name:'Vocabulaire en images' },  // 16
    { id:'poesie',          name:'La poésie' },  // 3
    { id:'narration',       name:'Le récit & le narrateur' },  // 4
    { id:'esprit_critique', name:"Lire d'un oeil critique" },  // 1
    { id:'figures_style',   name:'Figures de style' },  // 7
    { id:'type_ton',        name:'Type & ton du texte' },  // 2
    { id:'connecteurs',     name:'Connecteurs logiques' },  // 1
    { id:'vrai_faux',       name:'Vrai ou faux' },  // 2
    { id:'vocabulaire',     name:'Le sens des mots' },  // 3
    { id:'idee_principale', name:'Idée principale' },  // 2
    { id:'interpretation',  name:'Relevé & interprétation' },  // 1
    { id:'inference',       name:'Reading Between the Lines' },  // 5
    { id:'reperage',        name:'Trouver la réponse dans le texte' },  // 69
  ]},
  'g6fr-textes': { subsections: [
    { id:'courriel',        name:'Courriels' },  // 4
    { id:'affiche',         name:'Affiches & annonces' },  // 4
    { id:'recette',         name:'Recettes & modes d\'emploi' },  // 3
    { id:'article',         name:'Articles de journal' },  // 6
    { id:'legende',         name:'Légendes & contes' },  // 4
    { id:'recit',           name:'Récits' },  // 24
  ]},
  'g6fr-images': { subsections: [
    { id:'trois_images',    name:'Raconter en trois images' },  // 10
    { id:'une_image',       name:'Décrire une image' },  // 10
    { id:'decrire',         name:'Le vocabulaire pour décrire' },
    { id:'raconter',        name:'Raconter une histoire en images' },
  ]},
  'g6fr-enr-relier': { subsections: [
    { id:'relatifs',        name:'Pronoms relatifs (qui, que, où…)' },  // 10
    { id:'cause',           name:'Exprimer la cause' },  // 10
    { id:'opposition',      name:'Exprimer l’opposition' },  // 10
    { id:'temps',           name:'Situer dans le temps' },  // 10
    { id:'but_consequence', name:'Le but & la conséquence' },  // 10
  ]},
};

registerSubject({
  id: 'grade6-french', name: 'French', grade: 6, icon: '📕', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  syllabus: G6FR_SYLLABUS,
  // examWeight is a chapter's share of a 40-question exam. These come from the
  // 2024 PSAC French paper's own mark allocation, not from how many questions
  // each chapter happens to hold. One rule: give a question's marks to the
  // chapter that teaches it, and take a chapter the exam pool cannot reach out
  // of the denominator as well, so the rest share a whole paper.
  //
  //   Q1 relier 5 + Q8B relier 4          9  -> enr-relier         4
  //   Q5A ordre des mots                  6  -> subordonnees       3
  //   Q2 grammaire 10 + Q5B transf. 4    14  -> the five tenses    2+1+1+1+1
  //   Q3A 5 + Q3B 5 + Q7A 5 + Q7B 5      20  -> formation          9
  //   Q4A reperage 10 + Q4B recit 15     25  -> lecture 8, textes 3
  //   Q8A histoire en images              6  -> images             3
  //   Q9 redaction                       10  -> argumentation      4
  //                                      90 reachable marks -> 40 slots
  //
  // ⚠ g6fr-formation is "Mots & Corrections" and teaches BOTH halves of Q7 -
  //   its accord_participe / ce_se / son_sont / tout_leur subsections are the
  //   Q7A correction traps. An earlier pass scored it on Q3 and Q7B only, 15
  //   marks, and under-weighted it by a third.
  //
  // ⚠ g6fr-textes-trous is 0 and could be anything: every item is type 'cloze',
  //   which isPoolQuestion() excludes from every pool, so the chapter cannot
  //   reach an exam at any weight. Q6's 10 marks are practised on its own
  //   screen, and are out of the denominator above for exactly that reason.
  //
  // Measured over 600 papers through the real assembleExamPaper(): grammar
  // 32.5% dealt against 32.2% of the reachable marks, vocabulary 22.5 / 22.2,
  // comprehension 27.5 / 27.8, production 17.5 / 17.8. Before this the pack
  // dealt 59.5% grammar and 16.2% comprehension - twice the paper's weight on
  // conjugation, and well under half its weight on reading.
  // scripts/test-exam-paper-shape.js holds it there.
  chapters: [
    {
      id: 'g6fr-imparfait', examWeight: 2, name: "L'Imparfait", icon: '⏳',
      notes: [
        "**L'imparfait** is used for: ongoing past actions, repeated/habitual past actions, descriptions in the past.",
        'Formation: take the **nous** present form, remove -ons, add: **-ais, -ais, -ait, -ions, -iez, -aient**.',
        'Parler → nous parlons → parl- → je parlais, tu parlais, il parlait, nous parlions…',
        'Only irregular: **être** → j\'étais, tu étais, il était, nous étions, vous étiez, ils étaient.',
        'Passé composé vs imparfait: P.C. = completed action. Imparfait = background/ongoing. "Je lisais quand il est entré."',
      ],
    },
    {
      id: 'g6fr-futur', examWeight: 1, name: 'Le Futur Simple', icon: '🔮',
      notes: [
        '**Futur simple** expresses future actions more formally than futur proche.',
        'Formation: **infinitive + endings**: -ai, -as, -a, -ons, -ez, -ont.',
        'Parler → je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront.',
        '-RE verbs drop final -e: vendre → vendr- → je vendrai.',
        'Irregular stems: être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, vouloir→voudr-, venir→viendr-.',
      ],
    },
    {
      id: 'g6fr-subordonnees', examWeight: 3, name: 'Les Propositions Subordonnées', icon: '🔗',
      notes: [
        '**Relative clauses**: qui (subject), que (object), dont (of which/whose), où (where/when).',
        'Example: L\'homme **qui** chante est mon père. / Le livre **que** je lis est intéressant.',
        '**Indirect speech**: il dit **que**, il demande **si**, il veut savoir **ce que**.',
        'Tense shift in indirect speech: présent → imparfait. "Je suis fatigué." → Il a dit qu\'il était fatigué.',
        '**Causal connectors**: parce que, car, puisque, comme (since).',
        '**Concessive connectors**: bien que + subjunctive, même si, pourtant, cependant.',
      ],
    },
    {
      id: 'g6fr-subjunctif', examWeight: 1, name: 'Le Subjonctif', icon: '🎭',
      notes: [
        'The **subjunctive** is used after expressions of: doubt, emotion, wish, necessity, possibility.',
        'Triggers: il faut que, je veux que, bien que, pour que, avant que, il est possible que…',
        'Formation: take **ils** present form, remove -ent, add: **-e, -es, -e, -ions, -iez, -ent**.',
        'Parler: ils parlent → parl- → que je parle, que tu parles, qu\'il parle…',
        'Irregular: être → sois/soit/soyons, avoir → aie/ait/ayons, aller → aille, faire → fasse, pouvoir → puisse.',
      ],
    },
    {
      id: 'g6fr-conditionnel', examWeight: 1, name: 'Le Conditionnel Présent', icon: '🔀',
      notes: [
        '**Le conditionnel présent** is used for: polite requests, hypotheses, wishes, unconfirmed news.',
        'Formation: **infinitive** (or future stem) + imperfect endings: -ais/-ais/-ait/-ions/-iez/-aient.',
        'Parler → je parlerais. Vendre → je vendrais (drop final -e of -RE verbs).',
        'Irregular stems (same as future): être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, vouloir→voudr-, venir→viendr-, devoir→devr-.',
        '**Si + imparfait → conditionnel**: Si j\'avais de l\'argent, j\'achèterais une voiture.',
        'NEVER put the future after "si": ~~Si tu viendras~~ → Si tu venais… (imparfait).',
      ],
    },
    {
      id: 'g6fr-pqp', examWeight: 1, name: 'Le Plus-que-parfait', icon: '⏮️',
      notes: [
        '**Le plus-que-parfait** expresses an action that happened BEFORE another past action.',
        'Formation: **imparfait of avoir/être** + **past participle**.',
        'Most verbs use avoir: j\'avais mangé, tu avais parlé, il avait fini.',
        'Movement/state verbs use être (same list as passé composé): j\'étais allé(e), tu étais parti(e)…',
        'With être, agree past participle with subject: Elles étaient arrivées.',
        'In a sentence: passé composé = main event; plus-que-parfait = what happened BEFORE.',
        'Example: "Quand je suis arrivé, il avait déjà mangé." (he ate first, then I arrived).',
      ],
    },
    {
      id: 'g6fr-formation', examWeight: 9, name: 'Mots & Corrections', icon: '🔤',
      notes: [
        'La **question 7** vaut **10 points** et se fait en **deux parties** : **7A** (5 points) - *corrige les erreurs soulignées* - puis **7B** (5 points) - *écris le mot entre parenthèses à la forme correcte*.',
        'En **7B**, les mots demandés sont plus abstraits et le **radical change souvent**.',
        'Radicaux savants : le nom est français, l\'adjectif vient du **latin ou du grec** - mer → **maritime**, terre → **terrestre**, ciel → **céleste**, mois → **mensuel**, île → **insulaire**.',
        'Verbe → nom, avec transformation du radical : produire → **production**, permettre → **permission**, résoudre → **résolution**, conclure → **conclusion**.',
        'Certains noms n\'ont **aucun suffixe** : accueillir → **l\'accueil**, entretenir → **l\'entretien**, rejeter → **le rejet**.',
        'Adverbes : **-ant → -amment** (élégant → élégamment), **-ent → -emment** (évident → évidemment), plus une série en **-ément** (profond → profondément, énorme → énormément, aveugle → aveuglément).',
        'Pièges de sens à connaître : *aveuglement* (nom) ≠ *aveuglément* (adverbe), *respectif* ≠ *respectueux*, *populeux* ≠ *populaire*, *marital* ≠ *maritime*.',
        'Verbes dérivés : beaucoup prennent aussi un **préfixe** - riche → **en**richir, court → **rac**courcir, force → **ren**forcer, nombre → **dé**nombrer.',
        'Suffixes de verbes : **-iser** (moderne → moderniser, mémoire → mémoriser) et **-ifier** (simple → simplifier, juste → justifier).',
        'Préfixes de sens : **sous-** = pas assez, **sur-** = trop, **pré-** = avant, **contre-** = contre, **inter-** = entre, **trans-** = d\'un état à un autre.',
        'Termine toujours par l\'**accord** : « Les régions **montagneuses** », « une enfance **malheureuse** ».',
      ],
    },
    {
      id: 'g6fr-textes-trous', name: 'Textes à Trous', icon: '🧩', enrichment: true, examWeight: 0,
      enrichmentNote: 'Entraînement à la question 6 du PSAC (texte à trous, 10 points), dans la forme exacte du vrai papier : **6A** avec les mots donnés, puis **6B** sans aucune liste. Chaque texte s\'ouvre dans son propre écran.',
      notes: [
        'La **question 6** du PSAC vaut **10 points** et se fait en **deux parties** : **6A** (5 points) avec une liste de mots, **6B** (5 points) **sans liste** - à toi d\'écrire le mot.',
        'Les deux parties racontent la **même histoire**. Lis 6A ET 6B avant de remplir quoi que ce soit : la suite du récit explique souvent le trou d\'avant.',
        'En **6A**, trie la liste par **classe de mot** avant de commencer. Le **mot en trop** est toujours plausible : si deux mots vont au même endroit, place l\'autre ailleurs d\'abord et vois lequel reste.',
        'En **6B**, la plupart des trous sont de **petits mots de grammaire** : *qui, que, dont, où, sous, dans, autour, sans, sa, leur, en, y*. Demande-toi d\'abord quelle **classe de mot** manque, pas quel mot.',
        'Un trou après **je veux, pour, sans, à** appelle un **infinitif** ; un trou après **j\'ai, elle est** appelle un **participe passé** - et il faut alors penser à l\'**accord** (*perdu / perdue*, *resté / restée*).',
        'Les **connecteurs** (*mais, car, pourtant, ainsi, puis, comme si*) se devinent par la **logique** de la phrase, pas par la grammaire : cherche l\'opposition, la cause ou la conséquence.',
        'Attention aux mots qui ont **deux classes** : *son* (déterminant ou nom), *plus* (adverbe ou négation), *là* (adverbe). Le trou décide.',
        'Termine par une **relecture complète**, à voix basse. C\'est la seule façon d\'attraper une erreur d\'accord ou de sens.',
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
      id: 'g6fr-chasse-erreurs', name: 'Chasse aux Erreurs', icon: '🔍', enrichment: true, examWeight: 0,
      enrichmentNote: 'Correction de texte, comme à la question 7 du PSAC. Le texte est plein d\'erreurs : à toi de cliquer sur chaque mot fautif. Vérifier ne donne que le nombre trouvé - Terminer révèle tout.',
      notes: [
        'Le texte est **plein d\'erreurs**, et certaines sont bien cachées. Clique sur chaque mot fautif.',
        '**Le participe passé avec être s\'accorde avec le sujet** : *les filles sont arrivées*, *le bateau est parti*.',
        '**leur ou leurs ?** Devant un verbe, *leur* ne change jamais (*je leur parle*). Devant un nom, il s\'accorde (*leurs cahiers*).',
        '**tout, tous, toute, toutes** s\'accordent avec le nom : *tout le village*, *tous les élèves*, *toutes les portes*.',
        '**la, là ou l\'a ?** *là* indique le lieu, *l\'a* contient le verbe avoir, *la* accompagne un nom.',
        '**ces ou ses ?** *ses* = les siens (*ses parents à lui*), *ces* = ceux-là (*ces maisons-là*).',
        '**La virgule** se place avant *mais*, *car*, *donc* quand ils relient deux phrases.',
        '**Imparfait ou passé composé ?** L\'imparfait décrit le décor et les habitudes, le passé composé raconte ce qui arrive une fois.',
        'Astuce : fais **deux lectures**. La première pour l\'histoire, la seconde pour la chasse.',
      ],
    },
    {
      id: 'g6fr-argumentation', examWeight: 4, name: "L'Expression Écrite & Argumentation", icon: '✏️',
      notes: [
        '**Essay structure**: Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion.',
        'Expressing opinion: *Je pense que, À mon avis, Il me semble que, Je suis convaincu(e) que*.',
        'Conceding a point: *Certes, Il est vrai que, On peut admettre que… Cependant / Néanmoins*.',
        'Adding ideas: *De plus, En outre, Par ailleurs, Non seulement… mais aussi*.',
        'Concluding: *En conclusion, En résumé, Pour conclure, En définitive*.',
        'Always check: accords (adjective/noun agreement), conjugaison, ponctuation.',
      ],
    },
    {
      id: 'g6fr-lecture', examWeight: 8, name: 'Textes & Compréhension', icon: '🔍',
      notes: [
        'Text types to recognise: narratif, descriptif, informatif, argumentatif, poétique.',
        'For comprehension: underline key words, re-read before answering.',
        '**Relevez** = find/list from the text. **Expliquez** = explain in your own words.',
        '**Figures de style**: comparaison (comme), métaphore, personnification, anaphore (repetition at start of lines).',
        'Show understanding of tone: *sombre, ironique, lyrique, humoristique, dramatique*.',
        'Quote the text to justify your answers: *"…" montre que / illustre / souligne…*',
      ],
    },
    {
      id: 'g6fr-textes', examWeight: 3, name: 'Textes & Types de Textes', icon: '📄',
      notes: [
        'La **lettre formelle** : la ligne **Objet** résume la demande. « Monsieur, » → « Veuillez agréer, Monsieur, l\'expression de… ».',
        'L\'**article de journal** : **pyramide inversée** - le premier paragraphe donne qui, quoi, où, quand.',
        'Un article honnête donne l\'**équilibre** (plusieurs points de vue). Une **source anonyme** ne peut pas être vérifiée : pèse-la moins.',
        'Le **dépliant touristique** est un texte **publicitaire** : slogan, images séduisantes, et un **astérisque** qui renvoie aux petits caractères.',
        'La **légende** : « racontent les anciens… » signale la **tradition orale**. Une légende se termine par une **morale**.',
        'Le **mode d\'emploi** : consignes à l\'impératif, avertissements en gras, et surtout ce que l\'appareil **ne fait pas**.',
        'Surveille les verbes : *envisager* n\'est pas *décider*. Une question se joue souvent sur un seul mot.',
      ],
    },
    {
      id: 'g6fr-images', examWeight: 3, name: 'Description d\'Images', icon: '🖼️',
      notes: [
        'En Grade 6, il ne suffit plus de décrire : il faut aussi **interpréter** ce que l\'image veut dire.',
        'Organise ta description : **arrière-plan → premier plan**, puis les détails, puis le **message** de l\'image.',
        'Réemploie le **champ lexical** du thème (planter, arroser, creuser, la terre, l\'arrosoir) : c\'est ce qui rend le texte précis.',
        'Ne confonds jamais ce qui est **écrit** sur l\'image (un objectif, un prix) avec ce qui est **montré**.',
        '**Discours indirect** : un ordre rapporté devient *demander DE + infinitif*. « Arrosez ! » → « elle leur demande d\'arroser ».',
        '**Hypothèse** : *si + présent → futur simple*. Jamais de *-rais* ni de *-ra* juste après « si ».',
        'Pour TROIS images : imparfait pour le décor qui dure, passé composé pour l\'événement bref qui l\'interrompt.',
        'Tu peux **inventer** prénoms, paroles et sentiments - à condition de rester **cohérent** avec les images.',
      ],
    },
    // @enrichment - DERIVED from the syllabus (relative pronouns, conjunctions,
    // subordinate clauses), NOT a direct MIE chapter. DO NOT remove during
    // syllabus alignment audits. Shows as a gold "BONUS" card.
    {
      id: 'g6fr-enr-relier', name: 'Relier les Phrases', icon: '🔗',
      enrichment: true, examWeight: 4,
      enrichmentNote: 'La question « Relie chaque paire de phrases en te servant du mot donné entre parenthèses » du PSAC, au niveau le plus exigeant : « dont » et « auquel/duquel », le subjonctif après bien que / afin que / avant que, et « malgré » + nom.',
    },
  ],
});
