'use strict';
// Grade 6 French - Chapitre : Textes & Types de Textes (compréhension)
// IDs format: g6fr-txt-NNN
// Cinq types de textes du programme MIE Grade 6 : lettre formelle, article de
// journal, dépliant touristique, légende, mode d'emploi. Les questions vont
// au-delà du simple prélèvement : inférence, ton, point de vue, intention.

function _g6txtBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.92em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G6TXT_LETTRE = _g6txtBox(`
<b style="color:#1e40af">Lis la lettre, puis réponds à la question.</b><br><br>
<div style="text-align:right">Club Environnement, Grade 6<br>École de Beau Bassin<br>Beau Bassin<br><br>le 12 mai 2026</div>
Monsieur le Directeur général<br>
Conseil municipal de Beau Bassin-Rose Hill<br>
Rose Hill<br><br>
Monsieur,<br><br>
<b>Objet : demande de deux poubelles supplémentaires au jardin Balfour</b><br><br>
Nous vous écrivons au nom des trente membres du Club Environnement de notre école.<br><br>
Le samedi 2 mai, nous avons ramassé les déchets du jardin Balfour pendant deux heures. Nous avons rempli onze sacs, surtout de bouteilles en plastique et d'emballages. Nous n'avons compté que <b>deux</b> poubelles dans tout le jardin, toutes les deux près du portail principal, et toutes les deux débordaient déjà à dix heures du matin.<br><br>
Nous pensons que le problème ne vient pas seulement de la négligence des visiteurs. Une personne assise à l'autre bout du jardin doit marcher plus de deux cents mètres pour trouver une poubelle.<br><br>
C'est pourquoi nous vous demandons respectueusement d'installer deux poubelles supplémentaires : l'une près de l'aire de jeux, l'autre près du point de vue. Nous serions également heureux de dessiner et de peindre nous-mêmes les panneaux invitant les visiteurs à les utiliser, sans aucun frais pour le Conseil.<br><br>
Dans l'attente de votre réponse, veuillez agréer, Monsieur, l'expression de nos salutations respectueuses.<br><br>
<b>Kavisha Ramdhany</b><br>
Secrétaire du Club Environnement
`, '#3b82f6');

const _G6TXT_ARTICLE = _g6txtBox(`
<b style="color:#b91c1c">Lis l'article de journal, puis réponds à la question.</b><br><br>
<div style="border-bottom:2px solid #991b1b;padding-bottom:4px;margin-bottom:8px">
<div style="font-size:1.12em;font-weight:800;color:#991b1b">Le comptage des tortues par des élèves surprend les scientifiques</div>
<div style="font-size:0.85em;color:#64748b">De notre correspondante &nbsp;|&nbsp; Rodrigues, 14 juin</div>
</div>
Quarante élèves du primaire de Port Mathurin viennent d'achever un recensement de trois jours des tortues géantes dans une réserve de l'île, et leurs chiffres ont retenu l'attention des chercheurs.<br><br>
Les élèves, âgés de neuf à douze ans, avaient chacun reçu une planchette numérotée et devaient noter chaque tortue aperçue dans un secteur délimité. Ils en ont recensé 214 au total.<br><br>
« Nous nous attendions à ce que les enfants en oublient beaucoup », explique la docteure Anouk Perrine, qui encadrait l'opération. « En réalité, leur comptage ne s'écarte que de quatre animaux du nôtre. Les jeunes yeux sont près du sol, et les tortues aussi. »<br><br>
Tout le monde n'est pourtant pas convaincu qu'il faille recommencer. Un agent de conservation, qui a demandé à ne pas être nommé, avertit que de grands groupes de visiteurs peuvent déranger les femelles qui pondent.<br><br>
La réserve publiera les résultats complets en septembre et envisage d'inviter une deuxième école l'an prochain.
`, '#ef4444');

const _G6TXT_DEPLIANT = _g6txtBox(`
<b style="color:#b45309">Lis le dépliant touristique, puis réponds à la question.</b><br><br>
<div style="border:3px solid #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="text-align:center;font-size:1.25em;font-weight:800;color:#b45309">RODRIGUES, L'ÎLE AUTHENTIQUE</div>
<div style="text-align:center;font-style:italic">« Ici, le temps a oublié de courir. »</div><br>
Loin des foules, Rodrigues vous offre des lagons turquoise, des sentiers parfumés et l'accueil le plus chaleureux de l'océan Indien.<br><br>
&bull; <b>Île aux Cocos</b> - réserve d'oiseaux marins, accessible en pirogue<br>
&bull; <b>Caverne Patate</b> - 600 mètres de galeries souterraines<br>
&bull; <b>Marché de Port Mathurin</b> - samedi matin, piments et miel<br>
&bull; <b>Randonnée du mont Limon</b> - le point le plus haut de l'île<br><br>
<div style="font-weight:700;color:#166534">Séjour découverte : à partir de Rs 12 500 par personne*</div>
<div style="border-top:1px dashed #d97706;padding-top:6px;font-size:0.78em;color:#78716c">
*Prix pour 4 nuits en chambre double, hors vol, hors repas du soir et hors excursions. Basse saison uniquement (mai à septembre). Le transfert à l'île aux Cocos dépend des conditions de mer. Réservation minimum 30 jours à l'avance.
</div>
</div>
`, '#f59e0b');

const _G6TXT_LEGENDE = _g6txtBox(`
<b style="color:#7c3aed">Lis la légende, puis réponds à la question.</b><br><br>
<b>La légende de Pieter Both</b><br><br>
Il y a très longtemps, racontent les anciens de Maurice, un laitier montait chaque aube le sentier de la montagne, un bidon sur chaque épaule.<br><br>
À mi-chemin, il découvrit un cercle de fées qui dansaient dans la brume. Elles s'arrêtèrent, et leur reine s'avança.<br>
« Tu peux nous regarder, dit-elle, et chaque matin nous remplirons tes bidons d'argent. Mais si tu parles un jour de ce que tu as vu, tu seras changé en pierre. »<br><br>
Pendant de longs mois, le laitier tint parole et devint riche. Puis, un soir, grisé par les compliments de ses voisins, il commença à se vanter sur la place du village et à parler des petites danseuses de la montagne.<br><br>
Il n'acheva pas sa phrase. Au matin, les villageois levèrent les yeux et virent, posé en équilibre sur le sommet, un énorme rocher rond, en forme de tête d'homme.<br><br>
Il y est encore, et la montagne porte le nom du laitier.
`, '#8b5cf6');

const _G6TXT_MODE = _g6txtBox(`
<b style="color:#15803d">Lis le mode d'emploi, puis réponds à la question.</b><br><br>
<b>FILTRE À EAU DOMESTIQUE « SOURCE PURE » - NOTICE D'UTILISATION</b><br><br>
<u>Avant la première utilisation</u><br>
1. Retirez la cartouche de son emballage et faites-la tremper 15 minutes dans de l'eau froide.<br>
2. Rincez le réservoir à l'eau claire. N'utilisez ni savon ni éponge abrasive.<br>
3. Insérez la cartouche et tournez-la d'un quart de tour vers la droite jusqu'au déclic.<br>
4. Jetez les <b>deux premiers</b> réservoirs filtrés : ils peuvent contenir de la poussière de charbon.<br><br>
<u>Utilisation quotidienne</u><br>
5. Remplissez uniquement d'eau potable du robinet. Ce filtre <b>ne rend pas potable</b> une eau non potable.<br>
6. Conservez le réservoir au réfrigérateur et consommez l'eau dans les 24 heures.<br><br>
<div style="background:#fee2e2;border-left:3px solid #dc2626;padding:6px 10px;margin-top:6px">
<b>ATTENTION :</b> remplacez la cartouche toutes les <b>4 semaines</b>, ou après 100 litres, selon ce qui arrive en premier. Une cartouche usée peut relâcher les impuretés qu'elle a retenues.
</div>
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXTE A : la lettre formelle ───────────────────────────────────
  makeMCQ({ id:`g6fr-txt-001`, chapterId:`g6fr-textes`, difficulty:1,
    question:`${_G6TXT_LETTRE}Que demandent exactement les élèves au Conseil municipal ?`,
    options:[
      `D'installer deux poubelles supplémentaires dans le jardin`,
      `De nettoyer le jardin Balfour chaque samedi`,
      `De fermer le jardin aux visiteurs`,
      `De payer le club pour les déchets ramassés`
    ],
    answer:`D'installer deux poubelles supplémentaires dans le jardin`,
    hint:`La ligne « Objet » d'une lettre formelle résume la demande en une ligne.`,
    explanation:`L'objet annonce : « <b>demande de deux poubelles supplémentaires au jardin Balfour</b> », et l'avant-dernier paragraphe précise les deux emplacements. Tout ce qui précède sert à <b>justifier</b> cette demande.` }),

  makeMCQ({ id:`g6fr-txt-002`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_LETTRE}Quelle phrase constitue la PREUVE la plus solide que les poubelles actuelles sont insuffisantes ?`,
    options:[
      `« Toutes les deux débordaient déjà à dix heures du matin. »`,
      `« Nous vous écrivons au nom des trente membres du Club Environnement. »`,
      `« Dans l'attente de votre réponse… »`,
      `« Nous serions heureux de peindre nous-mêmes les panneaux. »`
    ],
    answer:`« Toutes les deux débordaient déjà à dix heures du matin. »`,
    hint:`Une preuve, c'est un fait observé et mesurable, pas une opinion ni une offre.`,
    explanation:`« <b>Débordaient déjà à dix heures du matin</b> » est un fait observé, daté et vérifiable : il démontre que les poubelles existantes ne suffisent pas. Les autres phrases disent qui écrit, proposent une aide ou terminent la lettre - aucune ne prouve le manque.` }),

  makeMCQ({ id:`g6fr-txt-003`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_LETTRE}Pourquoi les élèves proposent-ils de peindre les panneaux eux-mêmes, gratuitement ?`,
    options:[
      `Pour lever d'avance l'objection du coût et faciliter un « oui »`,
      `Pour montrer qu'ils aiment le dessin`,
      `Parce que le Conseil a déjà refusé une demande semblable`,
      `Parce que les panneaux comptent plus que les poubelles`
    ],
    answer:`Pour lever d'avance l'objection du coût et faciliter un « oui »`,
    hint:`Quelle est la raison habituelle d'un refus administratif ?`,
    explanation:`Une administration refuse le plus souvent à cause du <b>coût</b>. En offrant leur travail gratuitement, les élèves suppriment cette objection <i>avant</i> qu'elle ne soit formulée. Ce procédé s'appelle <b>anticiper le contre-argument</b>.` }),

  makeMCQ({ id:`g6fr-txt-004`, chapterId:`g6fr-textes`, difficulty:4,
    question:`${_G6TXT_LETTRE}Ta classe doit réécrire une phrase de cette lettre pour la rendre PLUS convaincante. Quelle réécriture ajoute une vraie force ?`,
    options:[
      `Ajouter : « Trente enfants ont retiré onze sacs en deux heures, alors que les employés du Conseil ne passent qu'une fois par semaine. »`,
      `Remplacer « onze sacs » par « énormément de sacs ».`,
      `Remplacer « nous vous demandons respectueusement » par « vous devez installer des poubelles tout de suite ».`,
      `Ajouter trois points d'exclamation après la demande.`
    ],
    answer:`Ajouter : « Trente enfants ont retiré onze sacs en deux heures, alors que les employés du Conseil ne passent qu'une fois par semaine. »`,
    hint:`Dans un écrit formel, la force vient des preuves et des comparaisons, pas du volume.`,
    explanation:`Ajouter une <b>comparaison chiffrée</b> rend le problème impossible à écarter. Remplacer les chiffres par « énormément » <i>affaiblit</i> la lettre ; exiger et crier brisent le registre formel et rendent une administration moins disposée à aider.` }),

  // ── TEXTE B : l'article de journal ─────────────────────────────────
  makeMCQ({ id:`g6fr-txt-005`, chapterId:`g6fr-textes`, difficulty:1,
    question:`${_G6TXT_ARTICLE}Combien de tortues les élèves ont-ils recensées ?`,
    options:[`214`, `40`, `218`, `Quatre`],
    answer:`214`,
    hint:`Attention : l'article contient plusieurs nombres qui ne désignent pas la même chose.`,
    explanation:`« Ils en ont recensé <b>214 au total</b>. » 40 est le nombre d'élèves, et « quatre animaux » indique l'écart avec le comptage des chercheurs. Un article de presse concentre beaucoup de chiffres : relie chaque nombre à son nom.` }),

  makeMCQ({ id:`g6fr-txt-006`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_ARTICLE}Quel paragraphe d'un article de journal contient les informations les plus importantes ?`,
    options:[`Le premier`, `Le dernier`, `Celui qui contient la citation`, `Le titre seulement`],
    answer:`Le premier`,
    hint:`Pense à un lecteur qui s'arrête après un seul paragraphe.`,
    explanation:`Un article suit la <b>pyramide inversée</b> : le premier paragraphe (l'« attaque ») donne qui, quoi, où et quand, pour qu'un lecteur pressé ait déjà l'essentiel. Les paragraphes suivants ajoutent les détails, les citations et le contexte.` }),

  makeMCQ({ id:`g6fr-txt-007`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_ARTICLE}Pourquoi la journaliste rapporte-t-elle l'avis de l'agent de conservation ?`,
    options:[
      `Pour donner un article équilibré en présentant un avis opposé`,
      `Pour remplir la fin de l'article`,
      `Pour prouver que les élèves ont mal compté`,
      `Parce que cet agent a financé l'opération`
    ],
    answer:`Pour donner un article équilibré en présentant un avis opposé`,
    hint:`Un article de presse n'est pas une publicité.`,
    explanation:`Un article honnête présente <b>plusieurs points de vue</b>. La docteure Perrine est impressionnée ; l'agent de conservation craint pour les femelles qui pondent. Rapporter les deux s'appelle l'<b>équilibre</b>, et c'est un devoir du journaliste.` }),

  makeMCQ({ id:`g6fr-txt-008`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_ARTICLE}L'agent « a demandé à ne pas être nommé ». Que doit en conclure un lecteur attentif ?`,
    options:[
      `Son affirmation est plus difficile à vérifier que celle d'une source nommée`,
      `Il a inventé son inquiétude`,
      `La journaliste a oublié de noter son nom`,
      `Les sources anonymes sont interdites dans la presse`
    ],
    answer:`Son affirmation est plus difficile à vérifier que celle d'une source nommée`,
    hint:`Que peut-on faire avec une source nommée qu'on ne peut pas faire avec une source anonyme ?`,
    explanation:`Une <b>source anonyme</b> ne peut être ni recontactée ni tenue pour responsable : le lecteur ne peut donc pas vérifier son propos. Cela ne veut pas dire qu'il est faux - on reste souvent anonyme pour protéger son emploi - mais on lui accorde moins de poids qu'à la déclaration signée de la docteure Perrine.` }),

  makeTF({ id:`g6fr-txt-009`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_ARTICLE}La réserve a déjà décidé d'inviter une deuxième école l'an prochain.`,
    answer:false,
    hint:`Regarde attentivement le verbe de la dernière phrase.`,
    explanation:`<b>Faux.</b> L'article dit que la réserve « <b>envisage</b> d'inviter une deuxième école ». <i>Envisager</i> n'est pas <i>décider</i>. Une question d'examen se joue souvent sur un seul verbe : relis toujours la dernière phrase.` }),

  // ── TEXTE C : le dépliant touristique ──────────────────────────────
  makeMCQ({ id:`g6fr-txt-010`, chapterId:`g6fr-textes`, difficulty:1,
    question:`${_G6TXT_DEPLIANT}Que peut-on visiter à l'île aux Cocos ?`,
    options:[`Une réserve d'oiseaux marins`, `Des galeries souterraines`, `Un marché du samedi`, `Le point le plus haut de l'île`],
    answer:`Une réserve d'oiseaux marins`,
    hint:`Chaque puce du dépliant associe un lieu à une attraction précise.`,
    explanation:`« Île aux Cocos - <b>réserve d'oiseaux marins</b>, accessible en pirogue. » Les galeries sont à Caverne Patate, le marché à Port Mathurin et le sommet au mont Limon : quatre lieux, quatre attraits, à ne pas confondre.` }),

  makeMCQ({ id:`g6fr-txt-011`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_DEPLIANT}Que signale l'astérisque (*) placé après « Rs 12 500 par personne » ?`,
    options:[
      `Qu'il faut lire les petits caractères, où figurent les conditions`,
      `Que le prix comprend les vols`,
      `Que le prix peut être payé en plusieurs fois`,
      `Que le prix est fixé par le gouvernement`
    ],
    answer:`Qu'il faut lire les petits caractères, où figurent les conditions`,
    hint:`Le même symbole apparaît deux fois dans le dépliant.`,
    explanation:`Un <b>astérisque</b> relie une affirmation à une note en bas. Ici, elle révèle que le prix exclut le vol, les repas du soir et les excursions, et qu'il ne vaut qu'en basse saison.` }),

  makeMCQ({ id:`g6fr-txt-012`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_DEPLIANT}Une famille réserve pour un séjour au mois de décembre. Que découvrira-t-elle ?`,
    options:[
      `Le tarif de Rs 12 500 ne s'applique pas, car décembre n'est pas en basse saison`,
      `Le séjour est gratuit pour les enfants`,
      `L'île aux Cocos est fermée en décembre`,
      `Le marché de Port Mathurin n'ouvre pas en décembre`
    ],
    answer:`Le tarif de Rs 12 500 ne s'applique pas, car décembre n'est pas en basse saison`,
    hint:`La note précise les mois concernés par le tarif annoncé.`,
    explanation:`La note indique « <b>Basse saison uniquement (mai à septembre)</b> ». Décembre n'en fait pas partie : le prix affiché ne s'applique donc pas. Le dépliant ne dit rien d'une fermeture de l'île aux Cocos - il précise seulement que le transfert dépend de la mer.` }),

  makeMCQ({ id:`g6fr-txt-013`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_DEPLIANT}« Ici, le temps a oublié de courir. » Pourquoi le dépliant commence-t-il par cette phrase ?`,
    options:[
      `Pour donner une image séduisante de calme et de lenteur, afin de séduire le lecteur`,
      `Pour prévenir que les horaires ne sont pas respectés`,
      `Pour indiquer qu'il n'y a pas d'horloge sur l'île`,
      `Pour expliquer le décalage horaire avec Maurice`
    ],
    answer:`Pour donner une image séduisante de calme et de lenteur, afin de séduire le lecteur`,
    hint:`Un dépliant touristique cherche d'abord à faire rêver.`,
    explanation:`C'est un <b>slogan</b> : une personnification (« le temps a oublié de courir ») qui vend une promesse de <b>tranquillité</b>. Un dépliant est un texte <b>publicitaire</b> - il choisit ses images pour donner envie, pas pour informer objectivement.` }),

  // ── TEXTE D : la légende ───────────────────────────────────────────
  makeMCQ({ id:`g6fr-txt-014`, chapterId:`g6fr-textes`, difficulty:1,
    question:`${_G6TXT_LEGENDE}Quelle condition la reine des fées a-t-elle posée ?`,
    options:[
      `Ne jamais parler de ce qu'il avait vu`,
      `Ne plus jamais monter sur la montagne`,
      `Partager l'argent avec le village`,
      `Danser chaque aube avec les fées`
    ],
    answer:`Ne jamais parler de ce qu'il avait vu`,
    hint:`La condition est dans les paroles de la reine, après le mot « Mais ».`,
    explanation:`« <b>Mais si tu parles un jour de ce que tu as vu</b>, tu seras changé en pierre. » Dans une légende, la condition est toujours annoncée clairement au début : le lecteur voit venir la fin.` }),

  makeMCQ({ id:`g6fr-txt-015`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_LEGENDE}« Il n'acheva pas sa phrase. » Que s'est-il passé à ce moment-là ?`,
    options:[
      `Il a été changé en pierre au milieu de sa vantardise`,
      `Ses voisins l'ont interrompu`,
      `Il a finalement décidé de garder le secret`,
      `Il s'est endormi sur la place du village`
    ],
    answer:`Il a été changé en pierre au milieu de sa vantardise`,
    hint:`Le paragraphe suivant décrit ce que les villageois ont vu au matin.`,
    explanation:`La punition tombe immédiatement : la phrase suivante décrit « un énorme rocher rond, en forme de tête d'homme » au sommet. L'auteur <b>ne raconte pas</b> la transformation : ce silence la rend bien plus frappante qu'une description.` }),

  makeMCQ({ id:`g6fr-txt-016`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_LEGENDE}Quelle est la MORALE de cette légende ?`,
    options:[
      `Se vanter et trahir sa parole conduit à la ruine`,
      `Il ne faut jamais escalader une montagne seul`,
      `Il faut éviter les fées à tout prix`,
      `Le travail acharné mène toujours à la richesse`
    ],
    answer:`Se vanter et trahir sa parole conduit à la ruine`,
    hint:`Que faisait exactement le laitier à l'instant où il a été puni ?`,
    explanation:`Il n'est puni ni pour avoir vu les fées, ni pour avoir accepté l'argent, mais pour <b>s'être vanté et avoir rompu sa promesse</b>. Une légende se termine presque toujours sur une leçon : c'est la <b>morale</b>.` }),

  makeMCQ({ id:`g6fr-txt-017`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_LEGENDE}Quelle expression montre qu'il s'agit d'une LÉGENDE et non d'un article de presse ?`,
    options:[
      `« racontent les anciens de Maurice »`,
      `« un bidon sur chaque épaule »`,
      `« Pendant de longs mois »`,
      `« sur la place du village »`
    ],
    answer:`« racontent les anciens de Maurice »`,
    hint:`Quelle expression admet que l'histoire se transmet oralement, sans preuve ?`,
    explanation:`« <b>racontent les anciens de Maurice</b> » signale la <b>tradition orale</b> : l'histoire se transmet de génération en génération, sans être vérifiée. Un article de presse citerait une source et une date.` }),

  // ── TEXTE E : le mode d'emploi ─────────────────────────────────────
  makeMCQ({ id:`g6fr-txt-018`, chapterId:`g6fr-textes`, difficulty:2,
    question:`${_G6TXT_MODE}Pourquoi faut-il jeter les deux premiers réservoirs filtrés ?`,
    options:[
      `Parce qu'ils peuvent contenir de la poussière de charbon`,
      `Parce que l'eau est trop froide`,
      `Parce que la cartouche n'est pas encore vissée`,
      `Parce que le réservoir a été lavé au savon`
    ],
    answer:`Parce qu'ils peuvent contenir de la poussière de charbon`,
    hint:`L'étape 4 donne la raison juste après la consigne.`,
    explanation:`« Jetez les deux premiers réservoirs filtrés : <b>ils peuvent contenir de la poussière de charbon</b>. » Un bon mode d'emploi donne la <b>raison</b> d'une consigne - sinon l'utilisateur la saute.` }),

  makeMCQ({ id:`g6fr-txt-019`, chapterId:`g6fr-textes`, difficulty:3,
    question:`${_G6TXT_MODE}Un voisin dit : « J'utilise ce filtre pour boire l'eau d'un puits. » Que doit-on lui répondre d'après la notice ?`,
    options:[
      `Le filtre ne rend pas potable une eau non potable : c'est dangereux`,
      `Il doit d'abord tremper la cartouche 30 minutes`,
      `Il doit changer la cartouche toutes les 2 semaines`,
      `Il peut le faire s'il garde l'eau au réfrigérateur`
    ],
    answer:`Le filtre ne rend pas potable une eau non potable : c'est dangereux`,
    hint:`L'étape 5 contient une phrase en gras qui limite l'usage de l'appareil.`,
    explanation:`L'étape 5 est explicite : « Remplissez uniquement d'eau potable du robinet. Ce filtre <b>ne rend pas potable</b> une eau non potable. » Le filtre améliore le goût d'une eau déjà sûre ; il ne désinfecte pas. Lire ce que l'appareil <b>ne fait pas</b> est aussi important que lire ce qu'il fait.` }),

  makeMCQ({ id:`g6fr-txt-020`, chapterId:`g6fr-textes`, difficulty:4,
    question:`${_G6TXT_MODE}Une famille filtre environ 4 litres par jour. Au bout de combien de temps devra-t-elle remplacer la cartouche, et pourquoi ?`,
    options:[
      `Au bout d'environ 25 jours, car la limite des 100 litres est atteinte avant les 4 semaines`,
      `Au bout de 4 semaines, car le délai en semaines l'emporte toujours`,
      `Au bout de 25 semaines, car 100 ÷ 4 = 25`,
      `Jamais, tant que l'eau garde bon goût`
    ],
    answer:`Au bout d'environ 25 jours, car la limite des 100 litres est atteinte avant les 4 semaines`,
    hint:`Calcule en combien de jours la famille atteint 100 litres, puis compare avec 28 jours.`,
    explanation:`100 litres ÷ 4 litres par jour = <b>25 jours</b>, alors que 4 semaines font 28 jours. La notice impose « 4 semaines <b>ou</b> 100 litres, <b>selon ce qui arrive en premier</b> » : ici c'est le volume qui arrive en premier, donc on remplace au bout de 25 jours environ. Attendre que « l'eau ait mauvais goût » est justement le piège : une cartouche usée relâche les impuretés qu'elle a retenues.` }),

);
