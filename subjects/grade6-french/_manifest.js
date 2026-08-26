'use strict';

// Sous-thèmes pour l'écran Syllabus. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
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
    { id:'fait_opinion',    name:'Fait ou opinion' },  // 1
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
  ]},
};

registerSubject({
  id: 'grade6-french', name: 'French', grade: 6, icon: '📕', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  syllabus: G6FR_SYLLABUS,
  chapters: [
    {
      id: 'g6fr-imparfait', name: "L'Imparfait", icon: '⏳',
      notes: [
        "**L'imparfait** is used for: ongoing past actions, repeated/habitual past actions, descriptions in the past.",
        'Formation: take the **nous** present form, remove -ons, add: **-ais, -ais, -ait, -ions, -iez, -aient**.',
        'Parler → nous parlons → parl- → je parlais, tu parlais, il parlait, nous parlions…',
        'Only irregular: **être** → j\'étais, tu étais, il était, nous étions, vous étiez, ils étaient.',
        'Passé composé vs imparfait: P.C. = completed action. Imparfait = background/ongoing. "Je lisais quand il est entré."',
      ],
    },
    {
      id: 'g6fr-futur', name: 'Le Futur Simple', icon: '🔮',
      notes: [
        '**Futur simple** expresses future actions more formally than futur proche.',
        'Formation: **infinitive + endings**: -ai, -as, -a, -ons, -ez, -ont.',
        'Parler → je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront.',
        '-RE verbs drop final -e: vendre → vendr- → je vendrai.',
        'Irregular stems: être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, vouloir→voudr-, venir→viendr-.',
      ],
    },
    {
      id: 'g6fr-subordonnees', name: 'Les Propositions Subordonnées', icon: '🔗',
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
      id: 'g6fr-subjunctif', name: 'Le Subjonctif', icon: '🎭',
      notes: [
        'The **subjunctive** is used after expressions of: doubt, emotion, wish, necessity, possibility.',
        'Triggers: il faut que, je veux que, bien que, pour que, avant que, il est possible que…',
        'Formation: take **ils** present form, remove -ent, add: **-e, -es, -e, -ions, -iez, -ent**.',
        'Parler: ils parlent → parl- → que je parle, que tu parles, qu\'il parle…',
        'Irregular: être → sois/soit/soyons, avoir → aie/ait/ayons, aller → aille, faire → fasse, pouvoir → puisse.',
      ],
    },
    {
      id: 'g6fr-conditionnel', name: 'Le Conditionnel Présent', icon: '🔀',
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
      id: 'g6fr-pqp', name: 'Le Plus-que-parfait', icon: '⏮️',
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
      id: 'g6fr-argumentation', name: "L'Expression Écrite & Argumentation", icon: '✏️',
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
      id: 'g6fr-lecture', name: 'Textes & Compréhension', icon: '🔍',
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
      id: 'g6fr-textes', name: 'Textes & Types de Textes', icon: '📄',
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
      id: 'g6fr-images', name: 'Description d\'Images', icon: '🖼️',
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
  ],
});
