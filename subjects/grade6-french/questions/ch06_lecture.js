'use strict';
// Grade 6 French — Chapter: Textes & Compréhension
// IDs format: g6fr-lec-NNN

const _TEXTE_G6 = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>L'Île Maurice et l'environnement</b><br><br>
L'île Maurice est connue pour ses plages de sable blanc, ses lagons aux eaux cristallines et sa biodiversité exceptionnelle. Cependant, cet écrin de nature est aujourd'hui menacé par plusieurs problèmes environnementaux graves.<br><br>
La pollution des océans constitue l'une des principales menaces. Des milliers de bouteilles en plastique et de sacs jetables se retrouvent dans nos lagons, mettant en danger les poissons, les coraux et les tortues marines. En 2020, le gouvernement mauricien a interdit les sacs en plastique à usage unique — une mesure saluée par les écologistes.<br><br>
De plus, le réchauffement climatique provoque le blanchissement des coraux. Les coraux, qui abritent une grande variété d'espèces marines, blanchissent et meurent lorsque la température de l'eau augmente. La perte des récifs coralliens aurait des conséquences désastreuses pour le tourisme et la pêche, deux piliers essentiels de l'économie mauricienne.<br><br>
Face à ces défis, il est impératif que les citoyens, les entreprises et le gouvernement unissent leurs efforts pour protéger ce patrimoine naturel exceptionnel.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-lec-001', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_G6}Selon le texte, pourquoi l'île Maurice est-elle célèbre ?`,
    options:[
      'Pour ses montagnes et ses forêts tropicales uniquement',
      'Pour ses plages de sable blanc, ses lagons et sa biodiversité exceptionnelle',
      'Pour ses grandes villes et son industrie',
      'Pour ses volcans actifs'
    ],
    answer:'Pour ses plages de sable blanc, ses lagons et sa biodiversité exceptionnelle',
    hint:'Regardez la première phrase du texte.',
    explanation:'Le texte dit : "L\'île Maurice est connue pour ses <b>plages de sable blanc, ses lagons aux eaux cristallines et sa biodiversité exceptionnelle</b>."' }),

  makeMCQ({ id:'g6fr-lec-002', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Que signifie le mot "menacé" dans la phrase "cet écrin de nature est aujourd'hui menacé" ?`,
    options:['protégé','célébré','en danger','admirable'],
    answer:'en danger',
    hint:'Le contexte parle de "problèmes environnementaux graves". Quelle est la conséquence pour l\'île ?',
    explanation:'"<b>Menacé</b>" = threatened / in danger. Le contexte — "problèmes environnementaux graves" qui suivent — confirme que l\'île est en danger. Synonymes : en péril, mis en danger, fragile.' }),

  makeMCQ({ id:'g6fr-lec-003', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quelle mesure le gouvernement mauricien a-t-il prise en 2020 ?`,
    options:[
      'Il a interdit la pêche dans les lagons.',
      'Il a construit de nouvelles plages artificielles.',
      'Il a interdit les sacs en plastique à usage unique.',
      'Il a planté des milliers de coraux.'
    ],
    answer:'Il a interdit les sacs en plastique à usage unique.',
    hint:'Cherchez "2020" dans le deuxième paragraphe.',
    explanation:'"En 2020, le gouvernement mauricien a <b>interdit les sacs en plastique à usage unique</b> — une mesure saluée par les écologistes." "Saluée" = welcomed/praised.' }),

  makeMCQ({ id:'g6fr-lec-004', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Qu'est-ce que le blanchissement des coraux et quelle en est la cause selon le texte ?`,
    options:[
      'Les coraux deviennent blancs à cause de la pollution plastique.',
      'Les coraux blanchissent et meurent quand la température de l\'eau augmente.',
      'Les coraux blancs sont une espèce rare et protégée.',
      'Les coraux blanchissent à cause du manque de lumière.'
    ],
    answer:"Les coraux blanchissent et meurent quand la température de l'eau augmente.",
    hint:'Cherchez la définition et la cause dans le troisième paragraphe.',
    explanation:'Le texte explique : "Les coraux... <b>blanchissent et meurent lorsque la température de l\'eau augmente</b>." Le réchauffement climatique est donc la cause du blanchissement des coraux.' }),

  makeMCQ({ id:'g6fr-lec-005', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Selon le texte, quelles seraient les conséquences de la perte des récifs coralliens ?`,
    options:[
      'Une augmentation du tourisme',
      'Des conséquences désastreuses pour le tourisme et la pêche',
      'La disparition des sacs en plastique',
      'Une amélioration de la qualité de l\'eau'
    ],
    answer:'Des conséquences désastreuses pour le tourisme et la pêche',
    hint:'Le texte utilise le conditionnel ("aurait") pour exprimer ces conséquences potentielles.',
    explanation:'"La perte des récifs coralliens <b>aurait des conséquences désastreuses pour le tourisme et la pêche</b>, deux piliers essentiels de l\'économie mauricienne." Le conditionnel "aurait" exprime une conséquence hypothétique.' }),

  makeMCQ({ id:'g6fr-lec-006', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quelle figure de style est utilisée dans "cet écrin de nature" ?`,
    options:['une comparaison avec "comme"','une métaphore','une allitération','une personnification'],
    answer:'une métaphore',
    hint:'L\'île est comparée à un écrin (jewellery box) sans utiliser "comme" ou "tel que".',
    explanation:'"Cet <b>écrin</b> de nature" est une <b>métaphore</b> — l\'île est comparée à un écrin (jewellery box) qui protège des bijoux précieux, mais sans utiliser les mots comparatifs "comme" ou "tel que". Si on disait "comme un écrin", ce serait une comparaison.' }),

  makeTF({ id:'g6fr-lec-007', chapterId:'g6fr-lecture', difficulty:1,
    question:`${_TEXTE_G6}Vrai ou Faux : Les récifs coralliens n'ont aucune importance économique pour Maurice.`,
    answer:false,
    hint:'Regardez la fin du troisième paragraphe.',
    explanation:'<b>Faux.</b> Le texte dit que le tourisme et la pêche sont "<b>deux piliers essentiels de l\'économie mauricienne</b>". Les récifs coralliens soutiennent ces deux secteurs — ils ont donc une importance économique majeure.' }),

  makeMCQ({ id:'g6fr-lec-008', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Quel est le ton général de ce texte ?`,
    options:['humoristique et léger','informatif et alarmiste','poétique et lyrique','neutre et scientifique'],
    answer:'informatif et alarmiste',
    hint:'Le texte donne des informations mais aussi exprime une urgence. Cherchez les mots qui montrent la gravité.',
    explanation:'Le texte est <b>informatif</b> (donne des faits sur la pollution et les coraux) et <b>alarmiste</b> (souligne le danger : "menacé", "problèmes graves", "conséquences désastreuses", "il est impératif"). L\'auteur veut informer ET alerter le lecteur.' }),

  makeMCQ({ id:'g6fr-lec-009', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Trouvez dans le texte un connecteur de concession (qui introduit une idée contraire).`,
    options:['De plus','Cependant','Lorsque','Car'],
    answer:'Cependant',
    hint:'Un connecteur de concession introduit un "mais" ou une idée qui contraste.',
    explanation:'"<b>Cependant</b>" est le connecteur de concession dans le texte : "L\'île Maurice est connue pour sa beauté. <b>Cependant</b>, cet écrin de nature est menacé." Il introduit l\'idée contraire (le danger) après l\'idée positive (la beauté).' }),

  makeMCQ({ id:'g6fr-lec-010', chapterId:'g6fr-lecture', difficulty:2,
    question:`${_TEXTE_G6}Selon le dernier paragraphe, qui doit agir pour protéger l'environnement mauricien ?`,
    options:[
      'Uniquement le gouvernement',
      'Uniquement les écologistes et les scientifiques',
      'Les citoyens, les entreprises et le gouvernement ensemble',
      'Les touristes étrangers'
    ],
    answer:'Les citoyens, les entreprises et le gouvernement ensemble',
    hint:'Le dernier paragraphe utilise le mot "unissent" — qui doit s\'unir ?',
    explanation:'"Il est impératif que <b>les citoyens, les entreprises et le gouvernement</b> unissent leurs efforts pour protéger ce patrimoine naturel exceptionnel." Le texte insiste sur une action collective — pas individuelle ou gouvernementale seule.' })

);
