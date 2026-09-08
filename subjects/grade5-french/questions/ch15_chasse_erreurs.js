'use strict';
// Grade 5 French - Chasse aux Erreurs (correction de texte, PSAC question 7).
// Twenty texts, TEN planted errors each, ~75-90 words.
//
// ⚠ type 'errorhunt': excluded from every practice and exam pool by
// isPoolQuestion() in questions_engine.js, reached only through ErrorHunt.
//
// ⚠ AUTHORING RULE: every word OUTSIDE the braces is correct French. A word
// left wrong by accident is an error the child can see, cannot score, and is
// told is correct when they click it. scripts/test-error-hunt.js re-reads the
// corrected text of all sixty texts and fails on a doubled space, a missing
// final stop, a lower-case sentence opening, an error that corrects to itself
// and a title that leaks one of its own answers.
//
// Grade 5 diet, on top of grade 4's: accord de l'adjectif, participe passé
// avec être, et/est, son/sont, ce/se, ou/où, on/ont, la virgule d'énumération.
// leur/leurs, tout/tous and la/là are held back for grade 6.
(function () {
  const CH = 'g5fr-chasse-erreurs';

  const TEXTS = [
    ["Le premier jour de classe",
     "{ce>Ce:maj} matin, c'est le premier jour de classe. Les élèves sont {arrive>arrivés:pp} très tôt. Dans la cour, ils se sont {range>rangés:pp} deux par deux. La {maitresse>maîtresse:acc} a ouvert la porte et les a salués. Elle a écrit son nom au {tableau>tableau.:pt} Les cahiers {neuf>neufs:pl} sont posés sur les tables. {anjali>Anjali:maj} est assise à côté de moi. Elle {et>est:hom} contente parce que nous sommes dans la {meme>même:acc} classe. La journée commence {bien>bien.:pt}"],

    ["La sortie au jardin",
     "{mardi>Mardi:maj} dernier, notre classe est {alle>allée:pp} au jardin de Pamplemousses. Le bus est parti à huit {heures>heures.:pt} Le guide nous a montré les nénuphars {geant>géants:acc}. Leurs feuilles {est>sont:vb} rondes et très larges. Nous avons vu des palmiers, des bambous et de vieux arbres. Certains {on>ont:hom} plus de cent ans. Mes camarades {a>ont:vb} pris beaucoup de photos. La maîtresse nous a demandé de rester {ensemble>ensemble.:pt} {au>Au:maj} retour, tout le monde était fatigué mais {content>content.:pt}"],

    ["Une lettre à ma cousine",
     "{chere>Chère:acc} Meera, je t'écris de Curepipe. {ici,>Ici,:maj} il pleut presque tous les jours et il fait {froid>froid.:pt} Maman a acheté deux pulls {chaud>chauds:pl} pour mon frère et moi. Nous {somme>sommes:vb} allés au marché samedi. J'ai vu des fleurs, des fruits et de beaux {panier>paniers:pl}. Mon frère {et>est:hom} tombé dans une flaque et sa chemise était toute {sale>sale.:pt} Quand viens-tu nous voir ? Je {t'embrasse>t'embrasse.:pt} {ta>Ta:maj} cousine, Riya."],

    ["Le cyclone",
     "{hier>Hier:maj} soir, la radio a annoncé un cyclone. Papa a fermé toutes les {fenetre>fenêtres:acc} de la {maison>maison.:pt} Maman a rempli des bouteilles {d'eau>d'eau.:pt} Nous avons sorti les bougies et une vieille lampe. Le vent {souffle>soufflait:tps} déjà très fort dans les arbres. Vers minuit, l'électricité {et>est:hom} partie. Mes petits frères {avait>avaient:vb} peur, alors nous avons chanté. Au matin, les branches {casse>cassées:pp} couvraient la {rue>rue.:pt} {le>Le:maj} jardin était plein de feuilles."],

    ["Au dispensaire",
     "{lundi,>Lundi,:maj} ma grand-mère est {alle>allée:pp} au dispensaire du village. Elle avait mal au dos depuis trois {jour>jours:pl}. Nous avons attendu longtemps sur un banc en {bois>bois.:pt} L'infirmière {et>est:hom} venue chercher son carnet. Le docteur l'a écoutée et lui a donné des {medicament>médicaments:acc}. Il lui a dit de marcher un peu chaque {jour>jour.:pt} {sur>Sur:maj} le chemin du retour, nous avons acheté du pain, du lait et des {oeuf>oeufs:pl}. Grand-mère allait déjà {mieux>mieux.:pt}"],

    ["La pêche avec mon oncle",
     "{dimanche,>Dimanche,:maj} mon oncle m'a emmené pêcher. Nous sommes partis avant le lever du {soleil>soleil.:pt} La mer était calme et le ciel presque {noir>noir.:pt} Mon oncle a préparé les lignes et les {hamecon>hameçons:acc}. Il m'a expliqué {ou>où:hom} se cachent les poissons. Après une heure, j'ai senti un {coup>coup.:pt} J'ai tiré et un poisson {argente>argenté:acc} est sorti de l'eau. Mon oncle {et>est:hom} venu m'aider. Nous avons rapporté quatre {poisson>poissons:pl} à la {maison>maison.:pt}"],

    ["Le concours de l'école",
     "{notre>Notre:maj} école a organisé un concours de {dessin>dessin.:pt} Chaque élève devait dessiner son coin préféré de {maurice>Maurice:maj}. J'ai choisi la montagne du {morne>Morne:maj}. J'ai pris mes crayons {vert>verts:pl}, mes crayons bleus et une {regle>règle:acc}. Mon voisin, lui, a dessiné un bateau. Les dessins {etait>étaient:acc} affichés dans le couloir. Trois maîtresses {a>ont:vb} choisi les meilleurs. Mon dessin est {arrive>arrivé:pp} deuxième et j'étais très {fier>fier.:pt}"],

    ["La cuisine de fête",
     "{samedi,>Samedi,:maj} toute la famille prépare un grand {repas>repas.:pt} Maman fait cuire le riz, le curry et des légumes {frais>frais.:pt} Mes tantes {prepare>préparent:acc} les gâteaux dans la cour. Ma cousine et moi mettons la {table>table.:pt} Nous plions des serviettes {blanche>blanches:pl}. Papa va chercher les chaises chez le {voisin>voisin.:pt} Vers midi, les invités {arrive>arrivent:vb} les uns après les autres. Ils se saluent et rient très {fort>fort.:pt} {la>La:maj} maison est pleine de bruit et de bonnes odeurs."],

    ["Une journée au musée",
     "{jeudi,>Jeudi,:maj} nous avons visité le musée de Port-Louis. Nous y sommes {alle>allés:pp} en {bus>bus.:pt} À l'entrée, une dame nous a donné des {billet>billets:pl}. Elle nous a demandé de ne rien {toucher>toucher.:pt} Dans la première salle, il y avait de vieilles {piece>pièces:acc} de monnaie. Mon amie {et>est:hom} restée longtemps devant le squelette du dodo. Elle voulait savoir {ou>où:hom} il vivait autrefois. Le guide nous a tout {explique>expliqué:pp}. Nous sommes sortis à midi, la tête pleine {d'images>d'images.:pt}"],

    ["Le chien perdu",
     "{un>Un:maj} soir, notre chien n'est pas {rentre>rentré:pp}. Nous l'avons cherché dans tout le {quartier>quartier.:pt} Mon frère {et>est:hom} allé jusqu'à la boutique. Moi, j'ai regardé derrière les {maison>maisons:pl}. Les voisins nous {a>ont:vb} aidés avec des lampes. Vers dix heures, une dame a téléphoné. Elle avait trouvé un petit chien {noir>noir.:pt} C'était le {notre>nôtre:hom} ! Il s'était caché sous une {voiture>voiture.:pt} {nous>Nous:maj} étions tellement heureux de le retrouver."],

    ["Le mercredi à la piscine",
     "{chaque>Chaque:maj} mercredi, nous avons une leçon de {natation>natation.:pt} Le maître nage nous attend au bord du {bassin>bassin.:pt} Nous mettons nos bonnets {bleu>bleus:pl} et nous entrons dans {l'eau>l'eau.:pt} Au début, j'avais peur, mais maintenant je nage presque seul. Mes camarades {est>sont:vb} plus rapides que moi. Le maître dit qu'il faut {respire>respirer:ort} calmement. Ma soeur {et>est:hom} déjà passée au grand bassin. Elle plonge même du {bord>bord.:pt} Je veux faire pareil l'année {prochaine>prochaine.:pt}"],

    ["Une semaine chez ma tante",
     "{l'annee>L'année:acc} dernière, nous sommes {parti>partis:pp} à Rodrigues en avion. Le vol a duré une heure et {demie>demie.:pt} De là-haut, la mer était bleue et le récif tout {blanc>blanc.:pt} Ma tante nous attendait à {l'aeroport>l'aéroport:acc}. Sa maison {et>est:hom} tout près de la plage. Le matin, on entend les {coq>coqs:pl} et les oiseaux. Nous avons goûté les ourites séchées et le miel de {rodrigues>Rodrigues:maj}. Mes cousins nous {a>ont:vb} montré leur école. Nous sommes rentrés une semaine plus {tard>tard.:pt}"],

    ["Les devoirs du soir",
     "{apres>Après:acc} le goûter, je sors mes cahiers et mes {livre>livres:pl}. Je commence toujours par les mathématiques parce que c'est le plus {difficile>difficile.:pt} Ensuite, je fais mon exercice de {francais>français:acc}. Maman vérifie mes réponses quand elle a le temps. Mon petit frère joue à côté et fait beaucoup de {bruit>bruit.:pt} Papa lui demande de {ce>se:hom} taire. Vers sept heures, mes devoirs {est>sont:vb} finis. Je range mes affaires dans mon {sac>sac.:pt} {ainsi,>Ainsi,:maj} demain matin je ne perds pas de {temps>temps.:pt}"],

    ["La récolte de la canne",
     "{en>En:maj} juillet, les camions passent sur la route du {village>village.:pt} Ils transportent la canne coupée vers {l'usine>l'usine.:pt} Mon grand-père a travaillé dans les champs pendant trente {an>ans:pl}. Il raconte que le travail {etait>était:acc} très dur sous le soleil. Les coupeurs {commencait>commençaient:acc} avant le lever du jour. Ils portaient des chapeaux {large>larges:pl} et de longues {manche>manches:pl}. Aujourd'hui, des machines {aide>aident:vb} les hommes. Mais grand-père dit que la canne reste le coeur de notre {ile>île:acc}."],

    ["Le nouveau voisin",
     "{une>Une:maj} famille est venue habiter la maison {d'a>d'à:hom} côté. Ils sont {arrive>arrivés:pp} avec un grand camion. Leur fils a mon âge et il s'appelle {yash>Yash:maj}. Il {et>est:hom} déjà venu jouer chez nous deux {fois>fois.:pt} Nous avons partagé mes voitures et mes {bille>billes:pl}. Sa mère a apporté des gâteaux {sucre>sucrés:pl} à maman. Mon père les a invités à dîner samedi. Yash ira à la {meme>même:acc} école que moi. Je suis content d'avoir un ami dans la {rue>rue.:pt}"],

    ["L'histoire du dodo",
     "{vendredi,>Vendredi,:maj} l'école a présenté une pièce de {theatre>théâtre:acc}. Les élèves de sixième {jouait>jouaient:vb} l'histoire du dodo. Ma cousine portait un costume {vert>vert.:pt} Elle avait appris son texte par coeur. Les parents {etait>étaient:acc} assis sur des chaises dans la {cour>cour.:pt} Quand le rideau {se>s'est:tps} ouvert, tout le monde a applaudi. Les acteurs {parlait>parlaient:vb} fort pour être entendus. À la fin, la directrice les a {felicite>félicités:pp}. Nous sommes rentrés très {tard>tard.:pt}"],

    ["Un après-midi à la montagne",
     "{dimanche>Dimanche:maj} matin, nous sommes {monte>montés:pp} au Corps de Garde. Le sentier était étroit et plein de {caillou>cailloux:pl}. Papa portait le sac avec l'eau et les sandwichs. Nous avons marché pendant deux {heure>heures:pl}. En haut, on voit toute la plaine et la {mer>mer.:pt} Le vent {etait>était:acc} frais et très {agreable>agréable:acc}. Nous nous sommes assis sur un rocher plat. Maman a sorti les fruits et le {jus>jus.:pt} {en>En:maj} redescendant, mon frère {et>est:hom} tombé, mais il n'avait rien."],

    ["Le marchand de glaces",
     "{tous>Tous:maj} les après-midi, le marchand de glaces passe devant chez {nous>nous.:pt} On entend sa clochette de {loin>loin.:pt} Les enfants {sort>sortent:vb} en courant avec leurs pièces. Il vend des glaces {rose>roses:pl}, jaunes et vertes. Ma préférée {et>est:hom} celle au coco. Aujourd'hui, ma soeur a choisi la glace à la {vanille>vanille.:pt} Nous nous sommes assis sur le mur pour les {manger>manger.:pt} La glace de mon frère est {tombe>tombée:pp} par terre. Il a pleuré, puis maman lui en a acheté une {autre>autre.:pt}"],

    ["La lettre du facteur",
     "{ce>Ce:maj} matin, le facteur a laissé une enveloppe {blanche>blanche.:pt} Elle venait de {france>France:maj}. C'était une lettre de mon oncle {ismael>Ismaël:acc}. Il écrit qu'il rentre à Maurice au mois de {decembre>décembre:acc}. Maman {et>est:hom} tout de suite allée le dire à grand-mère. Mes cousines {a>ont:vb} sauté de joie dans la cour. Nous allons préparer sa chambre et ranger ses {affaire>affaires:pl}. Grand-mère veut faire un grand {repas>repas.:pt} Elle a déjà écrit la liste des {plat>plats:pl} sur un papier."],

    ["Le jour des résultats",
     "{aujourd'hui,>Aujourd'hui,:maj} la maîtresse rend les {copie>copies:pl}. Toute la classe {et>est:hom} silencieuse. Elle appelle les noms un par {un>un.:pt} Mon coeur bat très fort quand j'entends le {mien>mien.:pt} J'ai eu quinze sur vingt en {francais>français:acc}. Ma voisine, elle, a eu dix-huit. Elle est très {contente>contente.:pt} La maîtresse dit que nous avons tous {progresse>progressé:pp}. Elle nous demande de corriger nos {faute>fautes:pl} à la maison. {ce>Ce:maj} soir, je montrerai ma copie à mes parents."],
  ];

  TEXTS.forEach(([title, text], i) => {
    STATIC_QUESTIONS.push(makeErrorHunt({
      id: `g5fr-eh-${String(i + 1).padStart(3, '0')}`,
      chapterId: CH, subsection: 'chasse_erreurs', difficulty: 3,
      title, text,
    }));
  });
})();
