'use strict';
// Grade 6 French — Chapitre : Les Propositions Subordonnées
// IDs format: g6fr-sub-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sub-001', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez avec le bon pronom relatif : "L\'homme ___ chante est mon père."',
    options:['que','dont','où','qui'],
    answer:'qui',
    hint:'"qui" remplace le sujet de la proposition subordonnée.',
    explanation:'"L\'homme <b>qui</b> chante est mon père." — <b>qui</b> = sujet de la relative. Règle : <b>qui</b> (sujet), <b>que/qu\'</b> (objet direct), <b>dont</b> (de + nom), <b>où</b> (lieu ou temps).' }),

  makeMCQ({ id:'g6fr-sub-002', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez : "Le livre ___ je lis est intéressant."',
    options:['qui','dont','que','où'],
    answer:'que',
    hint:'"je lis" a déjà un sujet (je). Le pronom remplace l\'objet direct.',
    explanation:'"Le livre <b>que</b> je lis est intéressant." — <b>que</b> (ou <b>qu\'</b> devant voyelle) remplace l\'<b>objet direct</b>. Le sujet de "je lis" est "je", donc on n\'utilise pas "qui".' }),

  makeMCQ({ id:'g6fr-sub-003', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez : "La ville ___ j\'habite est très belle."',
    options:['qui','que','dont','où'],
    answer:'où',
    hint:'"où" remplace un lieu ou un moment.',
    explanation:'"La ville <b>où</b> j\'habite est très belle." — <b>où</b> remplace un <b>lieu</b> ou un <b>moment</b>. Exemples : "le jour où", "la maison où", "le pays où".' }),

  makeMCQ({ id:'g6fr-sub-004', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez : "C\'est un auteur ___ j\'admire le talent."',
    options:['que','dont','qui','où'],
    answer:'dont',
    hint:'"dont" = de + pronom. J\'admire le talent de cet auteur.',
    explanation:'"C\'est un auteur <b>dont</b> j\'admire le talent." — <b>dont</b> remplace "de + nom" : "j\'admire <b>le talent de cet auteur</b>". On utilise "dont" après les verbes qui se construisent avec "de" (parler de, avoir besoin de, être fier de…).' }),

  makeTF({ id:'g6fr-sub-005', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Dans le discours indirect, le présent devient l\'imparfait quand le verbe principal est au passé.',
    answer:true,
    hint:'Exemple : "Je suis fatigué." → Il a dit qu\'il ___ fatigué.',
    explanation:'<b>Vrai.</b> Dans le discours indirect au passé : présent → <b>imparfait</b>. "Je suis fatigué." → Il a dit qu\'il <b>était</b> fatigué. Autres changements : passé composé → plus-que-parfait ; futur → conditionnel.' }),

  makeMCQ({ id:'g6fr-sub-006', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Mettez au discours indirect : Marie dit : "Je viendrai demain." → Marie dit qu\'elle ___.',
    options:['viendra demain','viendrait le lendemain','vient demain','venait le lendemain'],
    answer:'viendrait le lendemain',
    hint:'Verbe principal au présent → … Mais ici : "Marie dit" (présent), donc le futur peut rester futur. Attention : choisissez selon le contexte de concordance.',
    explanation:'Si "Marie dit" (présent), le futur peut rester : "Marie dit qu\'elle <b>viendra le lendemain</b>." Mais si c\'est au passé ("Marie a dit"), le futur → conditionnel : "Marie a dit qu\'elle <b>viendrait le lendemain</b>". Ici le seul choix correct proposé est "viendrait le lendemain".' }),

  makeMCQ({ id:'g6fr-sub-007', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Quel connecteur exprime la CAUSE ?',
    options:['cependant','bien que','parce que','donc'],
    answer:'parce que',
    hint:'"Parce que" répond à la question "Pourquoi ?".',
    explanation:'"<b>Parce que</b>" exprime la cause. Exemples : "Il est absent <b>parce qu\'il</b> est malade." Autres connecteurs de cause : <b>car, puisque, comme</b>. Distinguer : cause (parce que) ≠ conséquence (donc, par conséquent) ≠ concession (bien que, cependant).' }),

  makeMCQ({ id:'g6fr-sub-008', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez : "Il a réussi ___ il a beaucoup travaillé."',
    options:['bien que','cependant','car','pourtant'],
    answer:'car',
    hint:'"car" introduit une cause, comme "parce que".',
    explanation:'"Il a réussi <b>car</b> il a beaucoup travaillé." — <b>car</b> exprime la cause (= parce que). Différence : "parce que" peut commencer une phrase, "car" ne peut pas commencer une phrase et ne s\'utilise pas après une virgule en début de réponse.' }),

  makeTF({ id:'g6fr-sub-009', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'"Bien que" est suivi de l\'indicatif.',
    answer:false,
    hint:'"Bien que" est un connecteur de concession — à quel mode le fait-il suivre ?',
    explanation:'<b>Faux.</b> "Bien que" est toujours suivi du <b>subjonctif</b> : "Bien qu\'il <b>soit</b> fatigué, il continue." Autres conjonctions + subjonctif : pour que, avant que, à moins que. Connecteurs + indicatif : parce que, car, puisque, comme.' }),

  makeMCQ({ id:'g6fr-sub-010', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Transformez en discours indirect : Paul demande : "Est-ce que tu as faim ?" → Paul demande ___.',
    options:[
      'qu\'il a faim',
      'si tu as faim',
      'si j\'ai faim',
      'si elle a faim'
    ],
    answer:'si j\'ai faim',
    hint:'Les questions avec "est-ce que" → "si" dans le discours indirect. Le "tu" de Paul devient "je" du point de vue de la personne interrogée.',
    explanation:'Paul demande <b>si j\'ai faim</b>. — Les questions oui/non (est-ce que…) → <b>si</b> dans le discours indirect. Le pronom change selon la perspective : "tu" (Paul parle à moi) → "je" (moi, celui qui rapporte). Si le verbe principal est au passé : "Paul a demandé si j\'<b>avais</b> faim" (imparfait).' })

);
