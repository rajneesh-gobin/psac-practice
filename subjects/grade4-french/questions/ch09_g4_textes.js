'use strict';
// Grade 4 French - Chapitre : Textes & Types de Textes (compréhension)
// IDs format: g4fr-txt-NNN
// Quatre types de textes du programme MIE Grade 4 : récit, affiche, carte
// postale, recette. Le texte est répété dans chaque question parce que le mode
// pratique et le mode examen tirent les questions une par une, au hasard.

function _g4txtBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G4TXT_RECIT = _g4txtBox(`
<b style="color:#1e40af">Lis le texte, puis réponds à la question.</b><br><br>
<b>Le chien de Maya</b><br><br>
Maya habite à Curepipe avec ses parents et son petit frère Yash. Devant la maison, il y a un grand jardin et un manguier.<br><br>
Un samedi matin, Maya trouve un petit chien brun foncé sous le manguier. Le chien est maigre et il a très soif. Maya court à la cuisine et lui apporte un bol d\'eau.<br><br>
- Maman, est-ce que je peux le garder ? demande Maya.<br>
- D\'abord, nous devons chercher son propriétaire, répond sa mère.<br><br>
Pendant deux semaines, personne ne vient chercher le chien. Alors le père de Maya dit :<br><br>
- Très bien. Il reste avec nous.<br><br>
Maya est très heureuse. Elle appelle son chien Choco parce qu\'il est brun foncé, comme le chocolat. Aujourd\'hui, Choco dort tous les soirs sous le lit de Yash.
`, '#3b82f6');

const _G4TXT_AFFICHE = _g4txtBox(`
<b style="color:#b45309">Lis l\'affiche, puis réponds à la question.</b><br><br>
<div style="text-align:center;border:3px dashed #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="font-size:1.25em;font-weight:800;color:#b45309">FÊTE DE L\'ÉCOLE</div>
<div style="font-weight:700">École Primaire de Curepipe</div>
<div style="margin:6px 0"><b>Samedi 12 octobre</b><br>de 10 h 00 à 16 h 00<br>dans la cour de l\'école</div>
<div style="margin:6px 0">Jeux &nbsp;&bull;&nbsp; Danse &nbsp;&bull;&nbsp; Gâteaux &nbsp;&bull;&nbsp; Tombola</div>
<div><b>Entrée : Rs 20</b> &nbsp;(gratuit pour les enfants de moins de 6 ans)</div>
<div style="margin-top:6px;font-style:italic">L\'argent servira à acheter des ballons et des cordes pour la classe de sport.</div>
<div style="margin-top:6px;font-weight:700">Venez nombreux avec vos parents !</div>
</div>
`, '#f59e0b');

const _G4TXT_CARTE = _g4txtBox(`
<b style="color:#0e7490">Lis la carte postale, puis réponds à la question.</b><br><br>
<div style="display:flex;gap:12px;flex-wrap:wrap">
<div style="flex:2;min-width:180px;border-right:1px dashed #94a3b8;padding-right:10px">
Chère Nisha,<br><br>
Je suis en vacances à Rodrigues avec ma famille. Nous sommes arrivés lundi en avion. La mer est très bleue et les plages sont tranquilles.<br><br>
Hier, nous avons mangé du poulpe grillé au marché de Port Mathurin. Demain, nous allons voir les tortues géantes.<br><br>
À bientôt !<br>
Ton ami,<br>
<b>Ravi</b>
</div>
<div style="flex:1;min-width:130px;font-size:0.95em">
<div style="border-bottom:1px solid #cbd5e1;height:20px;margin-bottom:8px"></div>
Nisha Beeharry<br>
12, Route Royale<br>
Curepipe<br>
MAURICE
</div>
</div>
`, '#06b6d4');

const _G4TXT_RECETTE = _g4txtBox(`
<b style="color:#15803d">Lis la recette, puis réponds à la question.</b><br><br>
<b>LA SALADE DE FRUITS</b><br><br>
<u>Il te faut :</u> 1 mangue, 1 banane, 1 tranche d\'ananas, 4 letchis, un peu de jus de citron, un bol et une cuillère.<br><br>
1. Lave tous les fruits à l\'eau propre.<br>
2. Demande à un adulte d\'éplucher la mangue et de la couper en petits cubes.<br>
3. Épluche la banane et coupe-la en rondelles.<br>
4. Coupe l\'ananas en morceaux et enlève les noyaux des letchis.<br>
5. Mets tous les fruits dans le bol.<br>
6. Verse un peu de jus de citron et mélange doucement avec la cuillère.<br>
7. Mets le bol au réfrigérateur pendant 20 minutes avant de servir.
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXTE A : le récit ─────────────────────────────────────────────
  makeMCQ({ id:`g4fr-txt-001`, chapterId:'g4fr-textes', subsection:'recit', difficulty:1,
    question:`${_G4TXT_RECIT}Où Maya trouve-t-elle le petit chien ?`,
    options:[`Sous le manguier`, `Dans la cuisine`, `Sur la plage`, `Sous le lit de Yash`],
    answer:`Sous le manguier`,
    hint:`La réponse est dans la deuxième partie du texte.`,
    explanation:`« Un samedi matin, Maya trouve un petit chien brun foncé <b>sous le manguier</b>. » Attention : le chien dort sous le lit de Yash <i>aujourd\'hui</i>, mais ce n\'est pas là qu\'elle l\'a trouvé.` }),

  makeMCQ({ id:`g4fr-txt-002`, chapterId:'g4fr-textes', subsection:'recit', difficulty:1,
    question:`${_G4TXT_RECIT}Qui est Yash ?`,
    options:[`Le petit frère de Maya`, `Le père de Maya`, `Le chien`, `Le voisin`],
    answer:`Le petit frère de Maya`,
    hint:`Regarde la toute première phrase.`,
    explanation:`« Maya habite à Curepipe avec ses parents et <b>son petit frère Yash</b>. » Les questions en <b>Qui ?</b> demandent une personne : cherche un nom propre dans le texte.` }),

  makeMCQ({ id:`g4fr-txt-003`, chapterId:'g4fr-textes', subsection:'recit', difficulty:2,
    question:`${_G4TXT_RECIT}Pourquoi Maya apporte-t-elle un bol d\'eau au chien ?`,
    options:[`Parce que le chien a très soif`, `Parce que le chien est sale`, `Parce que sa mère le demande`, `Parce qu\'il fait froid`],
    answer:`Parce que le chien a très soif`,
    hint:`Cherche la phrase qui décrit l\'état du chien juste avant.`,
    explanation:`« Le chien est maigre et il <b>a très soif</b>. Maya court à la cuisine et lui apporte un bol d\'eau. » Une question en <b>Pourquoi ?</b> se répond souvent avec <i>parce que</i> + la cause écrite juste avant.` }),

  makeMCQ({ id:`g4fr-txt-004`, chapterId:'g4fr-textes', subsection:'recit', difficulty:2,
    question:`${_G4TXT_RECIT}Pourquoi le chien s\'appelle-t-il Choco ?`,
    options:[`Parce qu\'il est brun foncé, comme le chocolat`, `Parce qu\'il mange du chocolat`, `Parce que c\'est le nom du manguier`, `Parce que Yash a choisi ce nom`],
    answer:`Parce qu\'il est brun foncé, comme le chocolat`,
    hint:`Le texte explique le nom avec le mot « parce que ».`,
    explanation:`« Elle appelle son chien Choco <b>parce qu\'il est brun foncé, comme le chocolat</b>. » C\'est Maya - et non Yash - qui choisit le nom.` }),

  makeMCQ({ id:`g4fr-txt-005`, chapterId:'g4fr-textes', subsection:'recit', difficulty:3,
    question:`${_G4TXT_RECIT}Pourquoi la mère de Maya ne dit-elle pas « oui » tout de suite ?`,
    options:[
      `Parce qu\'elle veut d\'abord chercher le propriétaire du chien`,
      `Parce qu\'elle n\'aime pas les chiens`,
      `Parce que le jardin est trop petit`,
      `Parce que Yash a peur des chiens`
    ],
    answer:`Parce qu\'elle veut d\'abord chercher le propriétaire du chien`,
    hint:`Lis la réponse de la mère : elle commence par « D\'abord ».`,
    explanation:`« <b>D\'abord, nous devons chercher son propriétaire</b>, répond sa mère. » Le mot <b>d\'abord</b> montre qu\'il y a une étape à faire <i>avant</i> de décider. Le chien peut appartenir à quelqu\'un d\'autre.` }),

  makeTF({ id:`g4fr-txt-006`, chapterId:'g4fr-textes', subsection:'recit', difficulty:2,
    question:`${_G4TXT_RECIT}Le propriétaire du chien est venu le chercher après deux semaines.`,
    answer:false,
    hint:`Relis la phrase qui commence par « Pendant deux semaines ».`,
    explanation:`<b>Faux.</b> « Pendant deux semaines, <b>personne ne vient</b> chercher le chien. » C\'est justement pour cela que le père accepte de le garder.` }),

  // ── TEXTE B : l\'affiche ────────────────────────────────────────────
  makeMCQ({ id:`g4fr-txt-007`, chapterId:'g4fr-textes', subsection:'affiche', difficulty:1,
    question:`${_G4TXT_AFFICHE}Quel jour a lieu la fête de l\'école ?`,
    options:[`Samedi 12 octobre`, `Dimanche 12 octobre`, `Samedi 2 octobre`, `Vendredi 12 novembre`],
    answer:`Samedi 12 octobre`,
    hint:`Sur une affiche, la date est toujours écrite en gros.`,
    explanation:`L\'affiche annonce <b>samedi 12 octobre</b>. Une affiche doit toujours répondre à quatre questions : <b>QUOI ? QUAND ? OÙ ? COMBIEN ?</b>` }),

  makeMCQ({ id:`g4fr-txt-008`, chapterId:'g4fr-textes', subsection:'affiche', difficulty:1,
    question:`${_G4TXT_AFFICHE}Léa a 5 ans. Combien doit-elle payer pour entrer ?`,
    options:[`Rien, c\'est gratuit`, `Rs 20`, `Rs 10`, `Rs 5`],
    answer:`Rien, c\'est gratuit`,
    hint:`Lis la petite note entre parenthèses après le prix.`,
    explanation:`« Entrée : Rs 20 (<b>gratuit pour les enfants de moins de 6 ans</b>) ». Léa a 5 ans, donc moins de 6 ans : elle entre <b>gratuitement</b>. Les parenthèses cachent souvent les exceptions - lis-les toujours !` }),

  makeMCQ({ id:`g4fr-txt-009`, chapterId:'g4fr-textes', subsection:'affiche', difficulty:2,
    question:`${_G4TXT_AFFICHE}À quoi servira l\'argent de la fête ?`,
    options:[
      `À acheter des ballons et des cordes pour la classe de sport`,
      `À réparer le toit de l\'école`,
      `À payer un voyage scolaire`,
      `À acheter des livres pour la bibliothèque`
    ],
    answer:`À acheter des ballons et des cordes pour la classe de sport`,
    hint:`Une ligne est écrite en italique, vers le bas de l\'affiche.`,
    explanation:`« L\'argent servira à acheter des <b>ballons et des cordes pour la classe de sport</b>. » Dire à quoi sert l\'argent est une façon de convaincre les familles de venir.` }),

  makeMCQ({ id:`g4fr-txt-010`, chapterId:'g4fr-textes', subsection:'affiche', difficulty:2,
    question:`${_G4TXT_AFFICHE}Quelle information n\'est PAS donnée sur l\'affiche ?`,
    options:[
      `Le nom du directeur de l\'école`,
      `L\'heure de la fête`,
      `Le lieu de la fête`,
      `Le prix de l\'entrée`
    ],
    answer:`Le nom du directeur de l\'école`,
    hint:`Vérifie chaque réponse une par une sur l\'affiche.`,
    explanation:`L\'affiche donne l\'heure (10 h - 16 h), le lieu (la cour de l\'école) et le prix (Rs 20), mais elle <b>ne nomme jamais le directeur</b>. Pour une question « Qu\'est-ce qui n\'est PAS écrit ? », coche ce que tu <i>trouves</i>, et il reste la réponse.` }),

  makeMCQ({ id:`g4fr-txt-011`, chapterId:'g4fr-textes', subsection:'affiche', difficulty:3,
    question:`${_G4TXT_AFFICHE}Une famille arrive dans la cour à 16 h 30, le samedi 12 octobre. Que va-t-elle trouver ?`,
    options:[
      `La fête est déjà terminée`,
      `La fête va commencer`,
      `La fête bat son plein`,
      `La tombola commence`
    ],
    answer:`La fête est déjà terminée`,
    hint:`Compare 16 h 30 avec l\'heure de fin écrite sur l\'affiche.`,
    explanation:`La fête dure de 10 h 00 à <b>16 h 00</b>. Arriver à 16 h 30, c\'est arriver <b>une demi-heure trop tard</b>. Savoir lire une affiche, c\'est savoir s\'en servir pour organiser sa journée.` }),

  // ── TEXTE C : la carte postale ─────────────────────────────────────
  makeMCQ({ id:`g4fr-txt-012`, chapterId:'g4fr-textes', subsection:'carte_postale', difficulty:1,
    question:`${_G4TXT_CARTE}Qui a écrit cette carte postale ?`,
    options:[`Ravi`, `Nisha`, `La mère de Nisha`, `Un marchand de Port Mathurin`],
    answer:`Ravi`,
    hint:`Sur une carte postale, celui qui écrit signe à la FIN ; celui qui reçoit est dans l\'adresse.`,
    explanation:`Le message est signé « Ton ami, <b>Ravi</b> ». Nisha Beeharry est la personne <i>à qui</i> on envoie la carte : son nom est dans le cadre de l\'adresse, à droite.` }),

  makeMCQ({ id:`g4fr-txt-013`, chapterId:'g4fr-textes', subsection:'carte_postale', difficulty:2,
    question:`${_G4TXT_CARTE}Comment Ravi et sa famille sont-ils allés à Rodrigues ?`,
    options:[`En avion`, `En bateau`, `En autobus`, `En voiture`],
    answer:`En avion`,
    hint:`Une seule phrase donne le jour ET le moyen de transport.`,
    explanation:`« Nous sommes arrivés lundi <b>en avion</b>. » Remarque qu\'une seule phrase peut contenir deux informations : <i>quand</i> et <i>comment</i>.` }),

  makeMCQ({ id:`g4fr-txt-014`, chapterId:'g4fr-textes', subsection:'carte_postale', difficulty:2,
    question:`${_G4TXT_CARTE}Quel mot montre que Ravi a DÉJÀ mangé le poulpe grillé ?`,
    options:[`Hier`, `Demain`, `Lundi`, `À bientôt`],
    answer:`Hier`,
    hint:`Regarde le mot placé au début de cette phrase.`,
    explanation:`« <b>Hier</b>, nous avons mangé du poulpe grillé. » <i>Hier</i> indique le <b>passé</b> : c\'est déjà fait. <i>Demain</i> (« nous allons voir les tortues ») indique le <b>futur</b> : ce n\'est pas encore fait.` }),

  makeMCQ({ id:`g4fr-txt-015`, chapterId:'g4fr-textes', subsection:'carte_postale', difficulty:3,
    question:`${_G4TXT_CARTE}Pourquoi le message d\'une carte postale est-il court ?`,
    options:[
      `Parce qu\'il y a très peu de place pour écrire`,
      `Parce qu\'on n\'a pas le droit de parler de nourriture`,
      `Parce que la poste compte les mots`,
      `Parce que l\'auteur ne sait pas bien écrire`
    ],
    answer:`Parce qu\'il y a très peu de place pour écrire`,
    hint:`Pense à la taille d\'une vraie carte postale et à ce qui partage cette place.`,
    explanation:`Une carte postale n\'a qu'<b>un petit côté partagé entre le message et l\'adresse</b>. On choisit donc seulement les informations les plus intéressantes : des phrases courtes, pas de longues descriptions.` }),

  // ── TEXTE D : la recette ───────────────────────────────────────────
  makeMCQ({ id:`g4fr-txt-016`, chapterId:'g4fr-textes', subsection:'recette', difficulty:1,
    question:`${_G4TXT_RECETTE}Combien de letchis faut-il ?`,
    options:[`4`, `1`, `2`, `Une poignée`],
    answer:`4`,
    hint:`La liste « Il te faut » vient avant les étapes numérotées.`,
    explanation:`La liste indique <b>4 letchis</b>. Dans une recette, on écrit d\'abord les ingrédients pour que tu puisses tout préparer avant de commencer.` }),

  makeMCQ({ id:`g4fr-txt-017`, chapterId:'g4fr-textes', subsection:'recette', difficulty:2,
    question:`${_G4TXT_RECETTE}Pour quelle étape faut-il l\'aide d\'un adulte ?`,
    options:[
      `Éplucher la mangue et la couper`,
      `Laver les fruits`,
      `Mélanger avec la cuillère`,
      `Mettre le bol au réfrigérateur`
    ],
    answer:`Éplucher la mangue et la couper`,
    hint:`Une étape commence par le mot « Demande ».`,
    explanation:`Étape 2 : « <b>Demande à un adulte</b> d\'éplucher la mangue et de la couper en petits cubes. » Dans une recette, l\'avertissement est placé exactement là où se trouve le danger : ici, le couteau.` }),

  makeMCQ({ id:`g4fr-txt-018`, chapterId:'g4fr-textes', subsection:'recette', difficulty:2,
    question:`${_G4TXT_RECETTE}À quel temps sont les verbes « Lave », « Épluche », « Mets » dans cette recette ?`,
    options:[`À l\'impératif`, `Au passé composé`, `À l\'imparfait`, `Au futur simple`],
    answer:`À l\'impératif`,
    hint:`Ce sont des ordres donnés au lecteur, sans sujet devant le verbe.`,
    explanation:`Une recette donne des consignes, donc elle utilise l'<b>impératif</b> : <i>Lave, Épluche, Coupe, Mets, Verse, Mélange</i>. À l\'impératif, il n\'y a <b>pas de sujet</b> devant le verbe.` }),

  makeMCQ({ id:`g4fr-txt-019`, chapterId:'g4fr-textes', subsection:'recette', difficulty:4,
    question:`${_G4TXT_RECETTE}Kavi suit toutes les étapes sauf l\'étape 7. Ses amis disent que la salade est bonne, mais moins agréable que d\'habitude. Qu\'est-ce que Kavi a oublié ?`,
    options:[
      `Il a servi la salade tiède au lieu de la servir froide`,
      `Il a oublié le jus de citron`,
      `Il a laissé les noyaux des letchis`,
      `Il a utilisé le mauvais bol`
    ],
    answer:`Il a servi la salade tiède au lieu de la servir froide`,
    hint:`Relis l\'étape 7 et demande-toi ce qu\'elle change pour les fruits.`,
    explanation:`L\'étape 7 dit : « Mets le bol au réfrigérateur pendant 20 minutes avant de servir. » En la sautant, Kavi sert la salade <b>tiède au lieu de froide</b>. Le jus de citron (étape 6) et les noyaux (étape 4) ont bien été faits : seule la température change.` }),

);
