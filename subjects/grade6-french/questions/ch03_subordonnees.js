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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-sub-011', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez avec le bon pronom relatif : "Voici la maison ___ j\'ai grandi."',
    options:['qui','que','dont','où'],
    answer:'où',
    hint:'"Où" remplace un lieu. "J\'ai grandi dans cette maison" → "la maison où j\'ai grandi."',
    explanation:'"Voici la maison <b>où</b> j\'ai grandi." — <b>Où</b> remplace un lieu ou un moment : "la maison <b>dans laquelle</b> j\'ai grandi" → simplification avec <b>où</b>. Autres exemples : "le pays <b>où</b> je suis né", "l\'époque <b>où</b> il vivait", "le moment <b>où</b> tout a changé". Le manuel MIE de 6e classe "où" parmi les pronoms relatifs invariables.' }),

  makeMCQ({ id:'g6fr-sub-012', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complétez avec le bon pronom relatif : "C\'est un problème ___ nous avons besoin de parler."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Avoir besoin de" → le verbe se construit avec "de". "Dont" remplace "de + nom".',
    explanation:'"C\'est un problème <b>dont</b> nous avons besoin de parler." — <b>Dont</b> remplace <b>de + groupe nominal</b>. Ici : "nous avons besoin <b>de ce problème</b>" → "dont". Verbes qui se construisent avec "de" et utilisent "dont" : avoir besoin de, parler de, avoir peur de, être fier de, se souvenir de, s\'occuper de.' }),

  makeTF({ id:'g6fr-sub-013', chapterId:'g6fr-subordonnees', difficulty:1,
    question:'"Que" s\'élide en "qu\'" devant une voyelle ou un h muet.',
    answer:true,
    hint:'Le livre que il lit → le livre qu\'il lit.',
    explanation:'<b>Vrai.</b> "Que" → "qu\'" devant une voyelle ou un h muet : "le livre <b>qu\'</b>il lit", "la chanson <b>qu\'</b>elle chante", "l\'histoire <b>qu\'</b>on raconte". En revanche, "qui" ne s\'élide jamais : "l\'homme <b>qui</b> arrive" (jamais "qu\'arrive"). "Dont" et "où" ne s\'élident jamais non plus.' }),

  makeMCQ({ id:'g6fr-sub-014', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Transformez en discours indirect au passé : Il a dit : "Je veux partir." → Il a dit qu\'il ___.',
    options:['veut partir','voulait partir','voudra partir','aurait voulu partir'],
    answer:'voulait partir',
    hint:'Verbe principal au passé (a dit) → présent → imparfait dans la subordonnée.',
    explanation:'"Il a dit qu\'il <b>voulait</b> partir." — Concordance des temps au discours indirect : quand le verbe de déclaration est au passé (a dit, disait), le présent devient <b>imparfait</b>. Tableau complet : présent → imparfait ; passé composé → plus-que-parfait ; futur → conditionnel présent. "Veux" (présent) → <b>"voulait"</b> (imparfait).' }),

  makeMCQ({ id:'g6fr-sub-015', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Quel pronom relatif complète correctement : "Le chanteur ___ vous admirez le talent vient de Maurice."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Admirer le talent de quelqu\'un" → "de" disparaît et se remplace par "dont".',
    explanation:'"Le chanteur <b>dont</b> vous admirez le talent vient de Maurice." — On admirait <b>le talent du chanteur</b> → "de + le chanteur" → <b>dont</b>. Structure : "dont" + sujet + verbe + objet direct (sans de). Comparez : "le chanteur <b>que</b> vous admirez" (admirer quelqu\'un, objet direct sans "de") vs "le chanteur <b>dont</b> vous admirez le talent" (admirer le talent de quelqu\'un).' }),

  makeMCQ({ id:'g6fr-sub-016', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Quel connecteur exprime la CONSÉQUENCE (consequence) ?',
    options:['puisque','bien que','donc','comme'],
    answer:'donc',
    hint:'"Donc" = therefore/so — la conséquence résulte de ce qui précède.',
    explanation:'"<b>Donc</b>" exprime la conséquence : "Il a travaillé dur, <b>donc</b> il a réussi." Autres connecteurs de conséquence : ainsi, par conséquent, c\'est pourquoi, si bien que, du coup. Distinguer : cause (parce que, car, puisque, comme) ≠ conséquence (<b>donc</b>, ainsi) ≠ concession (bien que, même si, cependant).' }),

  makeMCQ({ id:'g6fr-sub-017', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Complétez avec le bon pronom relatif : "Les élèves ___ les résultats sont excellents seront récompensés."',
    options:['qui','que','dont','où'],
    answer:'dont',
    hint:'"Les résultats de ces élèves" → de + élèves → dont.',
    explanation:'"Les élèves <b>dont</b> les résultats sont excellents seront récompensés." — "les résultats <b>des</b> élèves" → <b>dont</b>. Structure avec "dont" (possession) : élève → "dont les résultats" (= les résultats de cet élève). C\'est la même structure que l\'anglais "whose" : "the students <b>whose</b> results are excellent." Très fréquent dans les textes du manuel MIE.' }),

  makeTF({ id:'g6fr-sub-018', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Dans le discours indirect, "demain" devient "le lendemain".',
    answer:true,
    hint:'Les expressions de temps changent quand on passe du discours direct au discours indirect.',
    explanation:'<b>Vrai.</b> Changements d\'expressions temporelles au discours indirect : <b>demain → le lendemain</b>, hier → la veille, aujourd\'hui → ce jour-là, maintenant → alors / à ce moment-là, la semaine prochaine → la semaine suivante, l\'année dernière → l\'année précédente. Ces changements sont testés régulièrement dans les épreuves PSAC de français.' }),

  makeMCQ({ id:'g6fr-sub-019', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Quelle phrase utilise CORRECTEMENT "puisque" (since/given that — cause connue) ?',
    options:[
      '"Il est parti puisque demain."',
      '"Puisque tu es là, aide-moi, s\'il te plaît."',
      '"Il réussira puisque il travaillera."',
      '"Je mange puisque avoir faim."'
    ],
    answer:'"Puisque tu es là, aide-moi, s\'il te plaît."',
    hint:'"Puisque" exprime une cause évidente, connue des deux interlocuteurs. Il est suivi d\'un verbe conjugué.',
    explanation:'"<b>Puisque</b> tu es là, aide-moi." — "Puisque" (= given that, since) introduit une cause <b>déjà connue ou évidente</b> : "Puisque tu es là" (je sais que tu es là, c\'est un fait établi). Différence avec "parce que" : "Je t\'appelle <b>parce que</b> j\'ai besoin d\'aide" (cause nouvelle). "Puisque" reconnaît un fait déjà connu ; "parce que" en donne un nouveau.' })

);
