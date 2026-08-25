'use strict';
registerSubject({
  id: 'grade6-french', name: 'French', grade: 6, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
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
