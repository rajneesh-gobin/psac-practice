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
    explanation:'"<b>Puisque</b> tu es là, aide-moi." — "Puisque" (= given that, since) introduit une cause <b>déjà connue ou évidente</b> : "Puisque tu es là" (je sais que tu es là, c\'est un fait établi). Différence avec "parce que" : "Je t\'appelle <b>parce que</b> j\'ai besoin d\'aide" (cause nouvelle). "Puisque" reconnaît un fait déjà connu ; "parce que" en donne un nouveau.' }),

  makeMCQ({ id:'g6fr-sub-020', chapterId:'g6fr-subordonnees', difficulty:1,
    question:'Quelle est la fonction du pronom relatif "dont" ?',
    options:['remplace un lieu','remplace un complément introduit par "de"','remplace un sujet','remplace un complément direct'],
    answer:'remplace un complément introduit par "de"',
    hint:'"Dont" = de + qui/lequel. Parler de, avoir besoin de, être fier de…',
    explanation:'"<b>Dont</b>" remplace un <b>complément introduit par "de"</b>. Exemples : "Le livre <b>dont</b> je parle" (parler <b>de</b> ce livre). "L\'ami <b>dont</b> je suis fier" (être fier <b>de</b> cet ami). Règle : si le verbe ou l\'expression se construit avec "de", on utilise <b>dont</b>.' }),

  makeMCQ({ id:'g6fr-sub-021', chapterId:'g6fr-subordonnees', difficulty:1,
    question:'Complète avec "dont" ou "où" : "Voici la maison ___ j\'habitais autrefois."',
    options:['dont','où','que','qui'],
    answer:'où',
    hint:'"Où" remplace un lieu ou un moment. "Habiter quelque part" = lieu.',
    explanation:'"La maison <b>où</b> j\'habitais" — "où" remplace un <b>lieu</b> (ou un moment). "J\'habitais dans la maison" → dans la maison = complément de lieu → <b>où</b>. Comparer : "La maison <b>dont</b> je rêvais" (rêver <b>de</b> la maison → dont).' }),

  makeTF({ id:'g6fr-sub-022', chapterId:'g6fr-subordonnees', difficulty:1,
    question:'Au discours indirect, "je" du discours direct se change en "il/elle" quand le sujet rapporteur est différent.',
    answer:true,
    hint:'"Il a dit : \'J\'ai faim.\'" → "Il a dit qu\'il avait faim." — le "je" devient "il".',
    explanation:'<b>Vrai.</b> Au discours indirect, les pronoms personnels changent selon le contexte : "Je suis prêt" → "Il a dit qu\'<b>il</b> était prêt." (le "je" d\'origine → "il" dans le discours indirect). Les pronoms "me/mon/ma" changent aussi : "mon livre" → "son livre".' }),

  makeMCQ({ id:'g6fr-sub-023', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Complète avec "dont" : "C\'est une chanteuse ___ j\'admire beaucoup le talent."',
    options:['dont','que','qui','où'],
    answer:'dont',
    hint:'"Le talent de la chanteuse" → de = dont.',
    explanation:'"Une chanteuse <b>dont</b> j\'admire le talent" — "j\'admire <b>le talent de</b> la chanteuse" → complément avec "de" → <b>dont</b>. Structure : [nom] + dont + sujet + verbe + nom (sans "de" répété).' }),

  makeMCQ({ id:'g6fr-sub-024', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Transforme au discours indirect : "Il dit : \'Je viendrai demain.\'" →',
    options:[
      'Il dit qu\'il viendrait le lendemain.',
      'Il dit qu\'il vient demain.',
      'Il dit qu\'il viendra le lendemain.',
      'Il a dit qu\'il viendrait demain.'
    ],
    answer:'Il dit qu\'il viendrait le lendemain.',
    hint:'Verbe principal au présent (dit) → pas de changement de temps. Futur → conditionnel si verbe introducteur est au passé. Attend — "dit" = présent, donc futur reste futur... Mais la forme standard enseigne : futur → conditionnel.',
    explanation:'"Il dit (présent) qu\'il <b>viendrait</b> le lendemain." — Quand le verbe introducteur est au <b>passé</b>, futur → conditionnel. Ici "dit" est au présent, donc on peut garder le futur, mais la règle générale enseignée : <b>futur → conditionnel</b>. "Demain" → "<b>le lendemain</b>" (changement d\'expression temporelle).' }),

  makeMCQ({ id:'g6fr-sub-025', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Quelle phrase introduit une question indirecte avec "si" ?',
    options:[
      '"Il se demande si tu viendras."',
      '"Il demande que tu viennes."',
      '"Il demande si de venir."',
      '"Il se demande est-ce que tu viendras."'
    ],
    answer:'"Il se demande si tu viendras."',
    hint:'"Si" introduit une question indirecte (oui/non). Pas d\'inversion, pas de "est-ce que".',
    explanation:'"Il se demande <b>si</b> tu viendras." — Les questions indirectes de type oui/non utilisent <b>si</b> : "Viendras-tu ?" (direct) → "Il demande <b>si</b> tu viendras" (indirect). Règles : pas d\'inversion du sujet, pas de "est-ce que", pas de point d\'interrogation.' }),

  makeMCQ({ id:'g6fr-sub-026', chapterId:'g6fr-subordonnees', difficulty:2,
    question:'Quelle conjonction causale utilise-t-on pour une cause NÉGATIVE (blame/raison fâcheuse) ?',
    options:['grâce à','à cause de','puisque','car'],
    answer:'à cause de',
    hint:'"Grâce à" = cause positive ; "à cause de" = cause négative.',
    explanation:'"<b>À cause de</b>" exprime une cause à <b>connotation négative</b> : "Il a raté son bus <b>à cause de</b> la pluie." Comparer avec "<b>grâce à</b>" = cause positive : "Il a réussi <b>grâce à</b> son travail." Astuce : <b>grâce à</b> = merci à ; <b>à cause de</b> = à blâmer.' }),

  makeMCQ({ id:'g6fr-sub-027', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Transforme au discours indirect passé : "Elle a dit : \'J\'ai terminé hier.\'" →',
    options:[
      'Elle a dit qu\'elle avait terminé la veille.',
      'Elle a dit qu\'elle a terminé hier.',
      'Elle a dit qu\'elle terminait hier.',
      'Elle a dit qu\'elle avait terminé hier.'
    ],
    answer:'Elle a dit qu\'elle avait terminé la veille.',
    hint:'Passé composé → plus-que-parfait. "Hier" → "la veille".',
    explanation:'"Elle a dit qu\'elle <b>avait terminé</b> la <b>veille</b>." — Au discours indirect (verbe introducteur au passé) : <b>passé composé → plus-que-parfait</b>. "J\'ai terminé" → "elle avait terminé". "Hier" → "<b>la veille</b>" (changement d\'expression temporelle).' }),

  makeMCQ({ id:'g6fr-sub-028', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Complète avec "dont" ou "où" : "Je n\'oublierai jamais le jour ___ nous avons gagné le match."',
    options:['dont','où','qui','que'],
    answer:'où',
    hint:'"Le jour où" = expression de temps. "Où" remplace aussi les moments.',
    explanation:'"Le jour <b>où</b> nous avons gagné" — "où" remplace non seulement les <b>lieux</b> mais aussi les <b>moments</b> dans le temps : le jour où, le moment où, l\'année où, l\'époque où. C\'est un usage important de "où" souvent confondu avec "quand".' }),

  makeMCQ({ id:'g6fr-sub-029', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Distingue parce que, car, puisque : laquelle NE peut PAS commencer une phrase ?',
    options:['Parce que','Car','Puisque','À cause de'],
    answer:'Car',
    hint:'"Car" est une conjonction de coordination — elle ne peut jamais commencer une phrase.',
    explanation:'"<b>Car</b>" est une <b>conjonction de coordination</b> (comme "mais, ou, et, donc, or, ni") et ne peut <b>jamais commencer une phrase</b>. "Parce que" et "puisque" peuvent commencer une phrase (style oral ou emphase) : "<b>Parce qu\'</b>il était absent, le prof a reporté l\'examen." "<b>Puisque</b> tu insistes, je viendrai."' }),

  makeTF({ id:'g6fr-sub-030', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Dans "Je sais où il habite", "où" introduit une proposition subordonnée interrogative indirecte.',
    answer:true,
    hint:'"Où" reprend la question directe "Où habite-t-il ?" et l\'intègre indirectement.',
    explanation:'<b>Vrai.</b> "Je sais <b>où</b> il habite" — "où" introduit ici une <b>interrogative indirecte</b> (question directe : "Où habite-t-il ?"). De même : je sais <b>qui</b> est venu, je sais <b>ce que</b> tu veux, je sais <b>comment</b> il s\'appelle. Ces propositions subordonnées complètent le verbe principal.' }),

  makeMCQ({ id:'g6fr-sub-031', chapterId:'g6fr-subordonnees', difficulty:3,
    question:'Transforme en discours indirect : "Il a demandé : \'Quand part le train ?\'" →',
    options:[
      'Il a demandé quand partait le train.',
      'Il a demandé quand est-ce que le train part.',
      'Il a demandé si le train part.',
      'Il a demandé quand le train partait-il.'
    ],
    answer:'Il a demandé quand partait le train.',
    hint:'Question avec mot interrogatif → mot interrogatif + ordre sujet-verbe (inversion douce).',
    explanation:'"Il a demandé <b>quand partait le train</b>." — Question avec mot interrogatif (quand, où, comment, pourquoi, combien) → garder le mot interrogatif + <b>pas d\'inversion avec est-ce que</b>. L\'inversion sujet-verbe peut rester si le sujet est un nom : "quand <b>partait le train</b>".' }),

  makeMCQ({ id:'g6fr-sub-032', chapterId:'g6fr-subordonnees', difficulty:4,
    question:'Transforme au discours indirect : "Le professeur a annoncé : \'L\'examen aura lieu demain et vous devrez apporter vos feuilles.\'" →',
    options:[
      'Le professeur a annoncé que l\'examen aurait lieu le lendemain et que nous devrions apporter nos feuilles.',
      'Le professeur a annoncé que l\'examen aura lieu demain et que vous devrez apporter vos feuilles.',
      'Le professeur a annoncé que l\'examen avait lieu demain et que nous apporterions nos feuilles.',
      'Le professeur a dit : l\'examen aurait lieu le lendemain et nous devrions apporter nos feuilles.'
    ],
    answer:'Le professeur a annoncé que l\'examen aurait lieu le lendemain et que nous devrions apporter nos feuilles.',
    hint:'Futur → conditionnel. "Demain" → "le lendemain". "Vous" → "nous".',
    explanation:'"<b>aurait lieu</b>" (futur → conditionnel), "<b>le lendemain</b>" (demain → le lendemain), "<b>nous devrions</b>" (vous devrez → nous devrions : changement de pronom + futur → conditionnel). Toutes ces transformations s\'appliquent quand le verbe introducteur est au passé.' }),

  makeMCQ({ id:'g6fr-sub-033', chapterId:'g6fr-subordonnees', difficulty:4,
    question:'Riya explique : "Je n\'ai pas pu venir ___ une forte fièvre. La réunion a été reportée ___ le manque de participants." Complète avec les mots causaux.',
    options:[
      'à cause d\'une / grâce au',
      'à cause d\'une / à cause du',
      'grâce à une / en raison du',
      'à cause d\'une / en raison du'
    ],
    answer:'à cause d\'une / en raison du',
    hint:'Forte fièvre = cause négative → "à cause de". Manque de participants (neutre/officiel) → "en raison de".',
    explanation:'"<b>À cause d\'une</b> forte fièvre" — cause négative. "<b>En raison du</b> manque" — cause neutre/officielle, langage formel. "Grâce à" = cause positive (résultat positif). "À cause de" = cause négative (résultat négatif). "En raison de" = cause neutre et formelle.' })

);
