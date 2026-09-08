'use strict';
// Grade 4 French - Chasse aux Erreurs (correction de texte, PSAC question 7).
// Twenty texts, EIGHT planted errors each, ~50-60 words.
//
// ⚠ type 'errorhunt': excluded from every practice and exam pool by
// isPoolQuestion() in questions_engine.js, and reached only through ErrorHunt
// (engine/errorhunt.js) from its own chapter screen.
//
// ⚠ AUTHORING RULE, and the only one that matters: every word OUTSIDE the
// braces is correct French. A word left misspelled by accident is an error the
// child can see, cannot score, and is told is correct when they click it. The
// braces are {faux>juste:regle}; scripts/test-error-hunt.js re-reads every
// corrected text and fails on a doubled space, a missing final stop, a
// lower-case sentence opening, an error that corrects to itself, and a title
// that leaks one of its own answers.
//
// ⚠ Punctuation travels INSIDE the braces. A missing full stop is
// {cour>cour.:pt} - the child clicks the word the stop should follow, which is
// what the on-screen help tells them to do.
//
// Grade 4 error diet: majuscules, point final, pluriel simple, accord du verbe
// au present, a/à, et/est, accents courants. Nothing subtler - the participe
// passe and leur/leurs belong to grades 5 and 6.
(function () {
  const CH = 'g4fr-chasse-erreurs';

  const TEXTS = [
    ["Un matin bien pressé",
     "{le>Le:maj} matin, {rita>Rita:maj} se lève {a>à:hom} six heures. Elle prend son petit déjeuner avec ses {parents>parents.:pt} Ensuite, elle met son uniforme et prend ses {cahier>cahiers:pl}. L'autobus arrive devant la maison. Les enfants {monte>montent:vb} et saluent le chauffeur. À {l'ecole,>l'école,:acc} Rita retrouve ses amis dans la {cour>cour.:pt}"],

    ["Le samedi au bazar",
     "{chaque>Chaque:maj} samedi, papa va au marché de {flacq>Flacq:maj}. Il achète des {legumes,>légumes,:acc} des fruits et du poisson. Les marchands {crie>crient:vb} très fort. Maman choisit deux ananas et trois {mangue>mangues:pl}. Le vendeur met tout dans un grand {sac>sac.:pt} {sur>Sur:maj} le chemin du retour, nous {mange>mangeons:vb} un gâteau piment."],

    ["Un petit chien noir",
     "{sanjay>Sanjay:maj} a un petit chien noir. Il s'appelle Tikoulou et il adore {courir>courir.:pt} {le>Le:maj} matin, Sanjay lui donne ses {croquette>croquettes:pl} dans un bol bleu. Le chien remue la queue et saute de joie. Les voisins {aime>aiment:vb} beaucoup {tikoulou>Tikoulou:maj}. Le soir, il dort {a>à:hom} côté du lit de son {maitre>maître:acc}."],

    ["La plage de Flic en Flac",
     "{dimanche,>Dimanche,:maj} toute la famille va {a>à:hom} la plage. Les enfants ramassent des {coquillage>coquillages:pl} et construisent un château de sable. Papa prépare le barbecue sous les {filao>filaos:pl}. Maman surveille les petits qui {nage>nagent:vb} près du bord. L'eau du lagon est chaude et {tres>très:acc} calme. Le soir, tout le monde rentre {fatigue>fatigué:acc} mais {heureux>heureux.:pt}"],

    ["Le dîner du soir",
     "{maman>Maman:maj} prépare le dîner dans la cuisine. Elle coupe des oignons, des tomates et deux {piment>piments:pl}. Le riz cuit doucement dans la grande {marmite>marmite.:pt} Ça sent très {bon>bon.:pt} {mon>Mon:maj} frère et moi mettons la table. Nous {sort>sortons:vb} les assiettes et les {couteau>couteaux:pl}. Papa arrive du travail et a très faim. Toute la famille mange {ensemble>ensemble.:pt}"],

    ["Le petit jardin",
     "{grand-pere>Grand-père:acc} passe ses matinées dans son jardin. Il plante des brèdes, des tomates et des {haricot>haricots:pl}. Ses outils {est>sont:vb} rangés dans une petite cabane. Chaque jour, il arrose les jeunes {plante>plantes:pl}. Les oiseaux {viens>viennent:vb} manger les graines qu'il laisse par {terre>terre.:pt} {quand>Quand:maj} je viens le voir, il me donne toujours une {goyave>goyave.:pt}"],

    ["La récréation",
     "{la>La:maj} cloche sonne {a>à:hom} dix heures et demie. Tous les élèves sortent dans la {cour>cour.:pt} Les garçons jouent au football près du mur. Les filles {saute>sautent:vb} à la corde sous le grand arbre. Mon amie {anjali>Anjali:maj} partage ses {biscuit>biscuits:pl}. La maîtresse nous surveille depuis la {veranda>véranda:acc}. Quand la cloche sonne encore, nous rentrons en {classe>classe.:pt}"],

    ["Le bus scolaire",
     "{tous>Tous:maj} les matins, j'attends le bus au coin de la {rue>rue.:pt} Il arrive {a>à:hom} sept heures dix. Le chauffeur ouvre la porte et nous {monte>montons:vb} un par un. Mes deux {voisin>voisins:pl} s'assoient derrière moi. Nous parlons de nos devoirs et de nos {match>matchs:pl} de foot. Le trajet dure vingt {minute>minutes:pl}. Devant l'école, le bus s'arrête et tout le monde {descend>descend.:pt}"],

    ["La fête surprise",
     "{aujourd'hui,>Aujourd'hui,:maj} {priya>Priya:maj} a neuf ans. Sa maman a préparé un grand {gateau>gâteau:acc} au {chocolat>chocolat.:pt} Ses cousins arrivent avec des {cadeau>cadeaux:pl}. Tout le monde chante et tape dans les mains. Priya souffle ses neuf {bougie>bougies:pl} d'un seul coup. Les enfants {mange>mangent:vb} du gâteau et boivent du jus {d'ananas>d'ananas.:pt}"],

    ["Une journée de pluie",
     "{depuis>Depuis:maj} ce matin, il pleut sans {arreter>arrêter:acc}. Les rues du village sont pleines {d'eau>d'eau.:pt} Nous ne pouvons pas sortir. Mon frère et moi {reste>restons:vb} à la maison. Nous sortons nos {jeu>jeux:pl} de société et une boîte de crayons. Maman nous prépare du {the>thé:acc} chaud et deux {tartine>tartines:pl}. Dehors, le vent secoue les {arbre>arbres:pl}."],

    ["Le petit frère",
     "{mon>Mon:maj} petit frère a deux ans. Il marche déjà et il court partout dans la {maison>maison.:pt} Il aime jeter ses {jouet>jouets:pl} par terre. Quand je rentre de {l'ecole,>l'école,:acc} il vient me voir tout de {suite>suite.:pt} Nous jouons avec ses {voiture>voitures:pl} rouges. Le soir, maman lui donne un bain et il rit très fort. {ensuite,>Ensuite,:maj} il s'endort en une {minute>minute.:pt}"],

    ["La classe de français",
     "{le>Le:maj} lundi matin, nous avons français avec madame {sooriah>Sooriah:maj}. Elle écrit la date au {tableau>tableau.:pt} Nous ouvrons nos {cahier>cahiers:pl} à la bonne page. Aujourd'hui, la leçon parle des {verbe>verbes:pl} du premier groupe. La maîtresse pose des questions et nous {leve>levons:vb} la main. Mon voisin oublie toujours son {crayon>crayon.:pt} Je lui prête le {mien>mien.:pt}"],

    ["Le pique-nique du dimanche",
     "{le>Le:maj} dimanche, nous allons pique-niquer au bord de la {riviere>rivière:acc}. Papa étend une natte sous un {arbre>arbre.:pt} Mes cousins {cherche>cherchent:vb} des cailloux plats pour les lancer dans {l'eau>l'eau.:pt} Maman apporte du riz, du poulet et des {samoussa>samoussas:pl}. Après le repas, nous marchons jusqu'à la petite {cascade>cascade.:pt} L'eau y est froide mais {tres>très:acc} claire."],

    ["Le vendeur de dholl puri",
     "{tous>Tous:maj} les après-midi, un vendeur passe dans notre {rue>rue.:pt} Il pousse sa charrette et crie très fort. Les enfants {sort>sortent:vb} de chez eux avec leur argent. Il prépare les dholl puri sur une plaque {chaude>chaude.:pt} Il ajoute du curry, des {achard>achards:pl} et un peu de {sauce>sauce.:pt} Je prends toujours deux {puri>puris:pl}. C'est mon goûter {prefere>préféré:acc}."],

    ["Sous la surface",
     "{le>Le:maj} lagon de Maurice est plein de {poisson>poissons:pl}. Quand on met la {tete>tête:acc} sous l'eau, on les voit très {bien>bien.:pt} Certains {est>sont:vb} jaunes, d'autres bleus ou rayés. Ils nagent entre les {corail>coraux:pl} sans avoir peur. Il ne faut jamais casser le corail : c'est la maison des {poisson>poissons:pl}. {nous>Nous:maj} devons protéger notre lagon."],

    ["Les lampes du soir",
     "{pour>Pour:maj} {divali,>Divali,:maj} toute la maison est {propre>propre.:pt} Maman allume des petites lampes sur le mur du {jardin>jardin.:pt} Mes soeurs préparent des gâteaux jaunes et des bonbons. Les voisins {vient>viennent:vb} nous souhaiter une bonne {fete>fête:acc}. Nous partageons nos {gateau>gâteaux:acc} avec eux. Le soir, le ciel brille de mille {lumiere>lumières:acc}."],

    ["Le vélo neuf",
     "{pour>Pour:maj} mon anniversaire, papa m'a offert un vélo {rouge>rouge.:pt} Il est neuf et il brille au {soleil>soleil.:pt} J'apprends {a>à:hom} rouler dans la cour de la {maison>maison.:pt} {au>Au:maj} début, je tombe souvent. Mon grand frère tient la selle et court derrière moi. Après trois {jour>jours:pl}, je roule tout seul. Mes {ami>amis:pl} veulent tous l'essayer."],

    ["À la bibliothèque",
     "{le>Le:maj} mercredi, la classe va {a>à:hom} la bibliothèque du village. La dame nous montre les nouveaux {livre>livres:pl}. Il faut parler tout bas et ranger les livres à leur {place>place.:pt} Je choisis une histoire de pirates avec des {image>images:pl}. Mon amie prend un livre sur les animaux de {maurice>Maurice:maj}. Nous {peut>pouvons:vb} les garder pendant deux {semaine>semaines:pl}."],

    ["Le match de football",
     "{samedi>Samedi:maj} après-midi, notre équipe joue contre l'école {voisine>voisine.:pt} Le terrain est sec et le soleil tape {fort>fort.:pt} Nos parents nous encouragent depuis le {bord>bord.:pt} À la première mi-temps, nous marquons deux {but>buts:pl}. Les autres joueurs {court>courent:vb} très vite. À la fin, l'arbitre siffle et nous {gagne>gagnons:vb}. Nous sommes {tres>très:acc} contents."],

    ["La veille au soir",
     "{demain,>Demain,:maj} c'est mon premier {examen>examen.:pt} Ce soir, je relis mes {lecons>leçons:acc} une dernière fois. Maman me dit de ne pas veiller trop {tard>tard.:pt} Je prépare mon sac, mes deux {stylo>stylos:pl} et ma règle. Papa met mon uniforme sur la {chaise>chaise.:pt} Je me couche tôt mais je pense encore aux {question>questions:pl}. {enfin,>Enfin,:maj} je m'endors."],
  ];

  TEXTS.forEach(([title, text], i) => {
    STATIC_QUESTIONS.push(makeErrorHunt({
      id: `g4fr-eh-${String(i + 1).padStart(3, '0')}`,
      chapterId: CH, subsection: 'chasse_erreurs', difficulty: 2,
      title, text,
    }));
  });
})();
