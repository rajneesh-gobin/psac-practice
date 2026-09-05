'use strict';
// Grade 4 French — top-up questions.
// Textes g4fr-txt-050..061  chapterId: g4fr-textes

function _g4tpBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G4TP_AFFICHE = _g4tpBox(`
<b style="color:#b45309">Lis l\'affiche, puis réponds à la question.</b><br><br>
<div style="text-align:center;border:3px dashed #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="font-size:1.2em;font-weight:800;color:#b45309">JOURNÉE DE L\'ENVIRONNEMENT</div>
<div style="font-weight:700">École Primaire de Rose Hill</div>
<div style="margin:6px 0"><b>Vendredi 5 juin</b><br>de 9 h 00 à 12 h 00<br>dans le jardin de l\'école</div>
<div>Concours de jardinage &nbsp;&bull;&nbsp; Exposition de dessins &nbsp;&bull;&nbsp; Plantation d\'arbres</div>
<div style="margin-top:6px"><b>Entrée libre pour tous les élèves.</b></div>
<div style="margin-top:6px;font-style:italic">Apportez vos gants et votre bonne humeur !</div>
</div>
`, '#f59e0b');

const _G4TP_RECETTE = _g4tpBox(`
<b style="color:#15803d">Lis la recette, puis réponds à la question.</b><br><br>
<b>LE JUS DE MANGUE</b><br><br>
<u>Il te faut :</u> 2 mangues bien mûres, un verre d\'eau froide, 1 cuillère de sucre, un mixeur.<br><br>
1. Épluche les mangues avec l\'aide d\'un adulte.<br>
2. Coupe-les en morceaux et mets-les dans le mixeur.<br>
3. Ajoute l\'eau et le sucre.<br>
4. Mixe pendant 30 secondes.<br>
5. Verse dans un verre et sers immédiatement.
`, '#22c55e');

const _G4TP_CARTE = _g4tpBox(`
<b style="color:#0e7490">Lis la carte postale, puis réponds à la question.</b><br><br>
<div style="border:1px solid #cbd5e1;border-radius:6px;padding:10px;background:#f0f9ff">
Chère Layla,<br><br>
Je suis à Grand Baie avec mes cousins. Il fait très chaud et la mer est magnifique !<br>
Hier, nous avons fait du bateau et j\'ai vu un dauphin. C\'était incroyable !<br>
Demain, nous rentrons à Curepipe. Je te raconterai tout.<br><br>
Grosses bises,<br>
<b>Sofia</b>
</div>
`, '#06b6d4');

const _G4TP_RECIT = _g4tpBox(`
<b style="color:#1e40af">Lis le texte, puis réponds à la question.</b><br><br>
<b>Priya et l\'oiseau</b><br><br>
Un matin d\'octobre, Priya sortait de chez elle quand elle entendit un bruit étrange dans les buissons. Elle s\'arrêta et attendit. Soudain, un petit oiseau tomba sur l\'herbe devant elle. Il avait une aile blessée.<br><br>
— Oh, le pauvre ! dit Priya.<br><br>
Elle prit doucement l\'oiseau dans ses mains et courut chez sa voisine, Mme Ramsamy, qui était vétérinaire.<br>
— Ne t\'inquiète pas, dit Mme Ramsamy. Il va guérir.
`, '#3b82f6');

STATIC_QUESTIONS.push(

  // ── AFFICHE ────────────────────────────────────────────────────────────
  makeMCQ({ id:'g4fr-txt-050', chapterId:'g4fr-textes', subsection:'affiche', difficulty:1,
    question:`${_G4TP_AFFICHE}Quel type de texte est-ce ?`,
    options:['Une recette', 'Un récit', 'Une carte postale', 'Une affiche'],
    answer:'Une affiche',
    hint:'Cherche les réponses à QUOI ? QUAND ? OÙ ? dans le texte — quel type de document répond toujours à ces trois questions ?',
    explanation:`C\'est une <b>affiche</b> : elle annonce un événement (Journée de l\'Environnement) avec une date, une heure, un lieu et des activités. Elle s\'adresse à un groupe et utilise l\'impératif (« Apportez »). Une affiche répond toujours à : <b>QUOI ? QUAND ? OÙ ?</b>` }),

  makeMCQ({ id:'g4fr-txt-051', chapterId:'g4fr-textes', subsection:'affiche', difficulty:1,
    question:`${_G4TP_AFFICHE}À quelle heure se termine la Journée de l\'Environnement ?`,
    options:['9 h 00', '10 h 00', '12 h 00', '16 h 00'],
    answer:'12 h 00',
    hint:`Cherche les deux horaires séparés par le mot « à ».`,
    explanation:`L\'affiche indique « de <b>9 h 00 à 12 h 00</b> ». La journée commence à 9 h 00 et se termine à <b>12 h 00</b>. Sur une affiche, lis toujours les deux horaires avec soin pour savoir quand arriver et quand partir.` }),

  makeMCQ({ id:'g4fr-txt-052', chapterId:'g4fr-textes', subsection:'affiche', difficulty:2,
    question:`${_G4TP_AFFICHE}Qu\'est-ce que l\'affiche demande aux élèves d\'apporter ?`,
    options:['Des livres et des crayons', 'Des gants et leur bonne humeur', `Des plants de fleurs`, `De l\'argent pour l\'entrée`],
    answer:'Des gants et leur bonne humeur',
    hint:`La réponse est dans la dernière ligne de l\'affiche.`,
    explanation:`« Apportez <b>vos gants et votre bonne humeur</b> ! » Le verbe « Apportez » est à l\'impératif : c\'est une consigne donnée aux élèves. L\'entrée est gratuite, donc il n\'y a pas d\'argent à payer.` }),

  // ── RECETTE ────────────────────────────────────────────────────────────
  makeMCQ({ id:'g4fr-txt-053', chapterId:'g4fr-textes', subsection:'recette', difficulty:1,
    question:`${_G4TP_RECETTE}Combien de mangues faut-il pour faire le jus de mangue ?`,
    options:['1', '2', '3', '4'],
    answer:'2',
    hint:`La liste « Il te faut » donne tous les ingrédients et leurs quantités.`,
    explanation:`« Il te faut : <b>2 mangues</b> bien mûres… » Dans une recette, la liste des ingrédients se lit <i>avant</i> de commencer les étapes, pour s\'assurer qu\'on a tout ce qu\'il faut.` }),

  makeMCQ({ id:'g4fr-txt-054', chapterId:'g4fr-textes', subsection:'recette', difficulty:2,
    question:`${_G4TP_RECETTE}Pourquoi faut-il l\'aide d\'un adulte à l\'étape 1 ?`,
    options:[
      `Parce que les mangues sont trop lourdes à porter`,
      `Parce qu\'éplucher une mangue nécessite un couteau, ce qui est dangereux`,
      `Parce que le mixeur est difficile à utiliser`,
      `Parce que le sucre est placé en hauteur`
    ],
    answer:`Parce qu\'éplucher une mangue nécessite un couteau, ce qui est dangereux`,
    hint:`Pense à l\'outil qu\'on utilise pour éplucher un fruit.`,
    explanation:`Pour éplucher une mangue, on utilise un couteau, ce qui est dangereux pour un enfant. La recette écrit « avec l\'aide d\'un adulte » <b>exactement à cette étape</b>, pas aux autres. Dans une recette, l\'avertissement est toujours placé là où se trouve le risque.` }),

  makeMCQ({ id:'g4fr-txt-055', chapterId:'g4fr-textes', subsection:'recette', difficulty:2,
    question:`${_G4TP_RECETTE}À quel mode sont les verbes « Épluche », « Coupe », « Ajoute » dans cette recette ?`,
    options:[`À l\'imparfait`, 'Au passé composé', `À l\'impératif`, 'Au futur simple'],
    answer:`À l\'impératif`,
    hint:`Observe si ces verbes ont un pronom sujet (je, tu, il…) devant eux ou non — quel mode s\'utilise pour donner des consignes ?`,
    explanation:`<b>Épluche, Coupe, Ajoute, Mixe, Verse</b> : ces verbes sont à l'<b>impératif</b>. À l\'impératif, il n\'y a <b>pas de pronom sujet</b> devant le verbe. On l\'utilise pour donner des ordres ou des consignes — dans les recettes, les notices et les affiches.` }),

  // ── CARTE POSTALE ──────────────────────────────────────────────────────
  makeMCQ({ id:'g4fr-txt-056', chapterId:'g4fr-textes', subsection:'legende', difficulty:1,
    question:`${_G4TP_CARTE}Qui a écrit cette carte postale ?`,
    options:['Layla', 'Sofia', `Un cousin de Grand Baie`, `La famille de Sofia`],
    answer:'Sofia',
    hint:`Sur une carte postale, celui qui écrit signe à la fin du message.`,
    explanation:`La carte est signée « <b>Sofia</b> ». Layla est la personne qui <i>reçoit</i> la carte, comme on le voit dans la formule d\'adresse « Chère Layla ». Ne confonds pas l\'expéditeur (celui qui écrit) et le destinataire (celui qui reçoit).` }),

  makeMCQ({ id:'g4fr-txt-057', chapterId:'g4fr-textes', subsection:'legende', difficulty:2,
    question:`${_G4TP_CARTE}Quel mot montre que Sofia a DÉJÀ vu le dauphin ?`,
    options:['Demain', 'Incroyable', 'Hier', 'Bientôt'],
    answer:'Hier',
    hint:`Cherche le mot qui situe l\'action dans le passé.`,
    explanation:`« <b>Hier</b>, nous avons fait du bateau et j\'ai vu un dauphin. » Le mot <i>hier</i> indique le <b>passé</b> : c\'est déjà arrivé. « Demain » indique le futur (« nous rentrons »). « Incroyable » est un adjectif qui exprime une émotion, pas un moment dans le temps.` }),

  makeMCQ({ id:'g4fr-txt-058', chapterId:'g4fr-textes', subsection:'legende', difficulty:3,
    question:`${_G4TP_CARTE}La carte parle de trois moments différents. Lequel se passe dans le FUTUR ?`,
    options:[
      `L\'arrivée à Grand Baie`,
      `Le tour en bateau et le dauphin (hier)`,
      `Le retour à Curepipe (demain)`,
      `La chaleur et la mer magnifique (maintenant)`
    ],
    answer:`Le retour à Curepipe (demain)`,
    hint:`Cherche quel mot correspond au futur dans la carte.`,
    explanation:`« <b>Demain</b>, nous rentrons à Curepipe. » <i>Demain</i> = futur. <i>Hier</i> = passé (le dauphin). Le présent, c\'est « Il fait très chaud » et « la mer est magnifique ». Une carte postale peut mélanger les trois temps pour raconter un séjour.` }),

  // ── RÉCIT ──────────────────────────────────────────────────────────────
  makeMCQ({ id:'g4fr-txt-059', chapterId:'g4fr-textes', subsection:'recit', difficulty:1,
    question:`${_G4TP_RECIT}Qu\'est-ce que Priya trouve devant elle ?`,
    options:[`Un chaton blessé`, `Un petit chien`, `Un petit oiseau avec une aile blessée`, `Un nid vide`],
    answer:`Un petit oiseau avec une aile blessée`,
    hint:`Priya entend d\'abord un bruit, puis quelque chose tombe sur l\'herbe.`,
    explanation:`« <b>un petit oiseau tomba sur l\'herbe devant elle. Il avait une aile blessée.</b> » Priya entend un bruit dans les buissons, mais c\'est l\'oiseau qui tombe sur l\'herbe devant elle. Une question « Qu\'est-ce que ? » demande une <b>chose</b> : lis attentivement pour ne pas confondre le bruit (cause) et l\'oiseau (effet).` }),

  makeMCQ({ id:'g4fr-txt-060', chapterId:'g4fr-textes', subsection:'recit', difficulty:2,
    question:`${_G4TP_RECIT}Quel mot signal montre qu\'un événement INATTENDU arrive dans le récit ?`,
    options:[`Un matin`, `Quand`, `Soudain`, `Doucement`],
    answer:`Soudain`,
    hint:`Dans un récit, certains mots annoncent un changement brusque.`,
    explanation:`« <b>Soudain</b>, un petit oiseau tomba sur l\'herbe devant elle. » Le mot <i>soudain</i> est un <b>mot signal</b> qui introduit un événement inattendu et rapide. Autres mots similaires : <i>tout à coup, brusquement, d\'un seul coup</i>. À comparer avec <i>d\'abord, ensuite, enfin</i> qui indiquent l'<b>ordre</b> des actions.` }),

  makeMCQ({ id:'g4fr-txt-061', chapterId:'g4fr-textes', subsection:'recit', difficulty:3,
    question:`${_G4TP_RECIT}Pourquoi Priya court-elle chez Mme Ramsamy plutôt que chez ses parents ?`,
    options:[
      `Parce que ses parents ne sont pas à la maison`,
      `Parce que Mme Ramsamy est vétérinaire et peut soigner l\'oiseau`,
      `Parce que ses parents ont peur des oiseaux`,
      `Parce que Mme Ramsamy habite plus près`
    ],
    answer:`Parce que Mme Ramsamy est vétérinaire et peut soigner l\'oiseau`,
    hint:`Le texte précise le métier de Mme Ramsamy.`,
    explanation:`« sa voisine, Mme Ramsamy, qui était <b>vétérinaire</b>. » Un vétérinaire soigne les animaux. Priya comprend qu\'une vétérinaire est la meilleure personne pour aider un oiseau blessé. C\'est une <b>inférence</b> : le texte ne dit pas directement « pour soigner l\'oiseau », mais on le comprend grâce au mot vétérinaire.` }),

);
