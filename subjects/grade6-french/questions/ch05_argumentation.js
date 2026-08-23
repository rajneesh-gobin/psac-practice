'use strict';
// Grade 6 French — Chapitre : L'Expression Écrite & Argumentation
// IDs format: g6fr-arg-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-001', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle expression introduit une OPINION PERSONNELLE ?',
    options:['En conclusion','De plus','À mon avis','Cependant'],
    answer:'À mon avis',
    hint:'"À mon avis" signifie "In my opinion" — c\'est une expression d\'opinion.',
    explanation:'"<b>À mon avis</b>" = pour exprimer son opinion. Autres expressions d\'opinion : Je pense que, Je crois que, Il me semble que, Je suis convaincu(e) que, Selon moi. "En conclusion" = conclusion ; "De plus" = ajout d\'idée ; "Cependant" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-002', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quel connecteur AJOUTE une idée à la précédente ?',
    options:['Cependant','Pourtant','De plus','En revanche'],
    answer:'De plus',
    hint:'"De plus" signifie "furthermore" — on ajoute une information.',
    explanation:'"<b>De plus</b>" = pour ajouter une idée. Autres connecteurs d\'ajout : En outre, Par ailleurs, Non seulement… mais aussi, Également. "Cependant / Pourtant / En revanche" = opposition.' }),

  makeMCQ({ id:'g6fr-arg-003', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle structure exprime une CONCESSION (reconnaître le point de vue contraire) ?',
    options:['En conclusion…','Certes, … Cependant,…','De plus…','En résumé…'],
    answer:'Certes, … Cependant,…',
    hint:'"Certes" admet un point, puis "Cependant" introduit l\'opposition.',
    explanation:'"<b>Certes, … Cependant,…</b>" = structure de concession classique : "Certes, les voitures sont pratiques. Cependant, elles polluent l\'environnement." On reconnaît d\'abord l\'argument adverse, puis on donne son propre argument.' }),

  makeMCQ({ id:'g6fr-arg-004', chapterId:'g6fr-argumentation', difficulty:1,
    question:'Quelle est la structure d\'un texte argumentatif en français ?',
    options:[
      'Introduction, un seul argument, conclusion',
      'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
      'Liste d\'arguments pour, puis liste d\'arguments contre',
      'Résumé, thèse, antithèse seulement'
    ],
    answer:'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
    hint:'Pensez à la structure en trois parties utilisée en français.',
    explanation:'Structure du texte argumentatif : <b>Introduction</b> (contexte + problématique = question centrale), <b>Développement</b> (thèse = arguments pour + antithèse = arguments contre, avec exemples), <b>Conclusion</b> (résumé + ouverture = réflexion plus large).' }),

  makeMCQ({ id:'g6fr-arg-005', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle expression annonce correctement la CONCLUSION d\'un texte ?',
    options:['De plus','Bien que','En conclusion','Certes'],
    answer:'En conclusion',
    hint:'Cette expression signal le dernier paragraphe.',
    explanation:'"<b>En conclusion</b>" annonce la conclusion. Autres expressions : En résumé, Pour conclure, En définitive, En somme. La conclusion résume les idées principales et propose une réflexion finale — elle n\'introduit pas de nouvelles idées.' }),

  makeTF({ id:'g6fr-arg-006', chapterId:'g6fr-argumentation', difficulty:2,
    question:'"Non seulement… mais aussi" est utilisé pour introduire une idée contraire.',
    answer:false,
    hint:'"Non seulement" = not only. "Mais aussi" = but also.',
    explanation:'<b>Faux.</b> "Non seulement… <b>mais aussi</b>" = "Non seulement… mais également" — cette structure <b>ajoute</b> une idée, elle n\'oppose pas. "Non seulement c\'est utile, mais aussi c\'est beau." Les connecteurs d\'opposition : Cependant, Pourtant, En revanche, Néanmoins, Toutefois.' }),

  makeMCQ({ id:'g6fr-arg-007', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quel connecteur exprime une CONSÉQUENCE ?',
    options:['Cependant','Donc / Ainsi','De plus','Certes'],
    answer:'Donc / Ainsi',
    hint:'"Donc" = therefore/so — la conséquence découle de ce qui précède.',
    explanation:'"<b>Donc</b>" et "<b>Ainsi</b>" expriment la conséquence. "La forêt a brûlé. <b>Donc</b>, de nombreux animaux ont perdu leur habitat." Autres connecteurs de conséquence : Par conséquent, C\'est pourquoi, En conséquence, Si bien que.' }),

  makeMCQ({ id:'g6fr-arg-008', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Quelle phrase exprime l\'opinion la PLUS FORTE ?',
    options:[
      'Il me semble que cela est important.',
      'Je pense que c\'est une bonne idée.',
      'Je suis convaincu(e) que cette solution est la meilleure.',
      'On pourrait peut-être considérer cette option.'
    ],
    answer:'Je suis convaincu(e) que cette solution est la meilleure.',
    hint:'Quelle expression montre la plus grande certitude et conviction ?',
    explanation:'"<b>Je suis convaincu(e) que</b>" exprime l\'opinion la plus forte. Échelle de force : "on pourrait peut-être" (faible) < "il me semble" < "je pense" < "je suis convaincu(e)" (fort). Plus l\'expression est forte, plus l\'argument semble assuré.' }),

  makeTF({ id:'g6fr-arg-009', chapterId:'g6fr-argumentation', difficulty:1,
    question:'Dans un texte argumentatif, la "problématique" est la question centrale à laquelle le texte cherche à répondre.',
    answer:true,
    hint:'Pensez à la question principale posée dans l\'introduction.',
    explanation:'<b>Vrai.</b> La <b>problématique</b> est la question centrale posée dans l\'introduction : ex. "Les réseaux sociaux sont-ils bénéfiques pour les jeunes ?" Tout le développement s\'organise autour de cette question.' }),

  makeMCQ({ id:'g6fr-arg-010', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Que signifie "En revanche" dans un texte ?',
    options:['En conclusion','De plus','En revanche = D\'un autre côté / Par contre','À cause de cela'],
    answer:'En revanche = D\'un autre côté / Par contre',
    hint:'"En revanche" introduit une idée qui s\'oppose à la précédente.',
    explanation:'"<b>En revanche</b>" = D\'un autre côté / Par contre / En contrepartie. "Les voitures sont rapides. <b>En revanche</b>, elles polluent." Synonymes : Cependant, Toutefois, Néanmoins, Pourtant.' })

);
