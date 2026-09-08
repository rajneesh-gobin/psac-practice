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
// ⚠ THE ERRORS ARE WORDS ONLY. Punctuation in these texts is already correct
// and must stay that way: no {x>x.:pt} and no {x>x,:vrg} tokens anywhere. A
// missing mark cannot be clicked - it has no word of its own - so the child
// was told to click the word BEFORE it, and that instruction is a trap: the
// example word it named appears, correct and clickable, inside 10 of the 60
// texts. scripts/test-error-hunt.js fails the build on either kind.
// Punctuation that sits outside the braces still rides onto both forms, which
// is how {cahier>cahiers:pl}. keeps its full stop - that part is unchanged.
//
// Grade 4 error diet: majuscules, pluriel simple, accord du verbe
// au present, a/à, et/est, accents courants. Nothing subtler - the participe
// passe and leur/leurs belong to grades 5 and 6.
(function () {
  const CH = 'g4fr-chasse-erreurs';

  const TEXTS = [
    ["Un matin bien pressé",
     "{le>Le:maj} matin, {rita>Rita:maj} se {leve>lève:acc} {a>à:hom} six heures. Elle prend son petit déjeuner avec ses {parent>parents:pl}. Ensuite, elle met son uniforme et prend ses {cahier>cahiers:pl}. L'autobus arrive devant la maison. Les enfants {monte>montent:vb} et saluent le chauffeur. À {l'ecole,>l'école,:acc} Rita retrouve ses amis dans la cour."],

    ["Le samedi au bazar",
     "{chaque>Chaque:maj} samedi, papa va au marché de {flacq>Flacq:maj}. Il achète des {legumes,>légumes,:acc} des {fruit>fruits:pl} et du poisson. Les marchands {crie>crient:vb} très fort. Maman choisit deux ananas et trois {mangue>mangues:pl}. Le vendeur met tout dans un grand sac. {sur>Sur:maj} le chemin du retour, nous {mange>mangeons:vb} un gâteau piment."],

    ["Un petit chien noir",
     "{sanjay>Sanjay:maj} a un petit chien noir. Il s'appelle Tikoulou et il adore courir. {le>Le:maj} matin, Sanjay lui donne ses {croquette>croquettes:pl} dans un bol bleu. Le chien remue la queue et saute de joie. Les {voisin>voisins:pl} {aime>aiment:vb} beaucoup {tikoulou>Tikoulou:maj}. Le soir, il dort {a>à:hom} côté du lit de son {maitre>maître:acc}."],

    ["La plage de Flic en Flac",
     "{dimanche,>Dimanche,:maj} toute la famille va {a>à:hom} la plage. Les {enfant>enfants:pl} ramassent des {coquillage>coquillages:pl} et construisent un château de sable. Papa prépare le barbecue sous les {filao>filaos:pl}. Maman surveille les petits qui {nage>nagent:vb} près du bord. L'eau du lagon est chaude et {tres>très:acc} calme. Le soir, tout le monde rentre {fatigue>fatigué:acc} mais heureux."],

    ["Le dîner du soir",
     "{maman>Maman:maj} {prepare>prépare:acc} le dîner dans la cuisine. Elle coupe des oignons, des {tomate>tomates:pl} et deux {piment>piments:pl}. Le riz cuit doucement dans la grande marmite. Ça sent très bon. {mon>Mon:maj} frère et moi mettons la table. Nous {sort>sortons:vb} les assiettes et les {couteau>couteaux:pl}. Papa arrive du travail et {à>a:hom} très faim. Toute la famille mange ensemble."],

    ["Le petit jardin",
     "{grand-pere>Grand-père:acc} passe ses {matinees>matinées:acc} dans son jardin. Il plante des brèdes, des tomates et des {haricot>haricots:pl}. Ses outils {est>sont:vb} rangés dans une petite cabane. Chaque jour, il arrose les jeunes {plante>plantes:pl}. Les {oiseau>oiseaux:pl} {viens>viennent:vb} manger les graines qu'il laisse par terre. {quand>Quand:maj} je viens le voir, il me donne toujours une goyave."],

    ["La récréation",
     "{la>La:maj} cloche sonne {a>à:hom} dix {heure>heures:pl} et demie. Tous les {eleves>élèves:acc} sortent dans la cour. Les garçons jouent au football près du mur. Les filles {saute>sautent:vb} à la corde sous le grand arbre. Mon amie {anjali>Anjali:maj} partage ses {biscuit>biscuits:pl}. La maîtresse nous surveille depuis la {veranda>véranda:acc}. Quand la cloche sonne encore, nous rentrons en classe."],

    ["Le bus scolaire",
     "{tous>Tous:maj} les {matin>matins:pl}, j'attends le bus au coin de la rue. Il arrive {a>à:hom} sept heures dix. Le chauffeur ouvre la porte et nous {monte>montons:vb} un par un. Mes deux {voisin>voisins:pl} s'assoient derrière moi. Nous parlons de nos devoirs et de nos {match>matchs:pl} de foot. Le trajet dure vingt {minute>minutes:pl}. Devant {l'ecole,>l'école,:acc} le bus s'arrête et tout le monde descend."],

    ["La fête surprise",
     "{aujourd'hui,>Aujourd'hui,:maj} {priya>Priya:maj} a neuf ans. Sa maman a {prepare>préparé:acc} un grand {gateau>gâteau:acc} au chocolat. Ses {cousin>cousins:pl} arrivent avec des {cadeau>cadeaux:pl}. Tout le monde chante et tape dans les mains. Priya souffle ses neuf {bougie>bougies:pl} d'un seul coup. Les enfants {mange>mangent:vb} du gâteau et boivent du jus d'ananas."],

    ["Une journée de pluie",
     "{depuis>Depuis:maj} ce matin, il pleut sans {arreter>arrêter:acc}. Les rues du village sont pleines d'eau. Nous ne pouvons pas sortir. Mon frère et moi {reste>restons:vb} à la maison. Nous sortons nos {jeu>jeux:pl} de société et une boîte de {crayon>crayons:pl}. Maman nous prépare du {the>thé:acc} chaud et deux {tartine>tartines:pl}. Dehors, le vent secoue les {arbre>arbres:pl}."],

    ["Le petit frère",
     "{mon>Mon:maj} petit frère a deux {an>ans:pl}. Il marche {deja>déjà:acc} et il court partout dans la maison. Il aime jeter ses {jouet>jouets:pl} par terre. Quand je rentre de {l'ecole,>l'école,:acc} il vient me voir tout de suite. Nous jouons avec ses {voiture>voitures:pl} {rouge>rouges:pl}. Le soir, maman lui donne un bain et il rit très fort. {ensuite,>Ensuite,:maj} il s'endort en une minute."],

    ["La classe de français",
     "{le>Le:maj} lundi matin, nous avons français avec madame {sooriah>Sooriah:maj}. Elle {ecrit>écrit:acc} la date au tableau. Nous ouvrons nos {cahier>cahiers:pl} à la bonne page. Aujourd'hui, la {lecon>leçon:acc} parle des {verbe>verbes:pl} du premier groupe. La maîtresse pose des {question>questions:pl} et nous {leve>levons:vb} la main. Mon voisin oublie toujours son crayon. Je lui prête le mien."],

    ["Le pique-nique du dimanche",
     "{le>Le:maj} dimanche, nous allons pique-niquer au bord de la {riviere>rivière:acc}. Papa {etend>étend:acc} une natte sous un arbre. Mes cousins {cherche>cherchent:vb} des {caillou>cailloux:pl} plats pour les lancer dans l'eau. Maman apporte du riz, du poulet et des {samoussa>samoussas:pl}. {Apres>Après:acc} le repas, nous marchons jusqu'à la petite cascade. L'eau y est froide mais {tres>très:acc} claire."],

    ["Le vendeur de dholl puri",
     "{tous>Tous:maj} les {apres-midi,>après-midi,:acc} un vendeur {passent>passe:vb} dans notre rue. Il pousse sa charrette et crie très fort. Les enfants {sort>sortent:vb} de chez eux avec leur argent. Il prépare les dholl puri sur une plaque chaude. Il ajoute du curry, des {achard>achards:pl} et un peu de sauce. Je prends toujours deux {puri>puris:pl}. C'est mon {gouter>goûter:acc} {prefere>préféré:acc}."],

    ["Sous la surface",
     "{le>Le:maj} lagon de Maurice est plein de {poisson>poissons:pl}. Quand on met la {tete>tête:acc} sous l'eau, on les voit très bien. Certains {est>sont:vb} jaunes, d'autres {bleu>bleus:pl} ou rayés. Ils nagent entre les {corail>coraux:pl} sans avoir peur. Il ne faut jamais casser le corail : c'est la maison des {poisson>poissons:pl}. {nous>Nous:maj} devons protéger notre lagon."],

    ["Les lampes du soir",
     "{pour>Pour:maj} {divali,>Divali,:maj} toute la maison est propre. Maman allume des petites lampes sur le mur du jardin. Mes {soeur>soeurs:pl} préparent des gâteaux jaunes et des {bonbon>bonbons:pl}. Les voisins {vient>viennent:vb} nous souhaiter une bonne {fete>fête:acc}. Nous partageons nos {gateau>gâteaux:acc} avec eux. Le soir, le ciel brille de mille {lumiere>lumières:acc}."],

    ["Le vélo neuf",
     "{pour>Pour:maj} mon anniversaire, papa m'a offert un vélo rouge. Il est neuf et il brille au soleil. J'apprends {a>à:hom} rouler dans la cour de la maison. {au>Au:maj} début, je tombe souvent. Mon grand frère {tiens>tient:vb} la selle et court {derriere>derrière:acc} moi. {Apres>Après:acc} trois {jour>jours:pl}, je roule tout seul. Mes {ami>amis:pl} veulent tous l'essayer."],

    ["À la bibliothèque",
     "{le>Le:maj} mercredi, la classe va {a>à:hom} la bibliothèque du village. La dame nous montre les nouveaux {livre>livres:pl}. Il faut parler tout bas et ranger les livres à leur place. Je choisis une histoire de {pirate>pirates:pl} avec des {image>images:pl}. Mon amie prend un livre sur les animaux de {maurice>Maurice:maj}. Nous {peut>pouvons:vb} les garder pendant deux {semaine>semaines:pl}."],

    ["Le match de football",
     "{samedi>Samedi:maj} après-midi, notre {equipe>équipe:acc} joue contre l'école voisine. Le terrain est sec et le soleil tape fort. Nos {parent>parents:pl} nous encouragent depuis le bord. À la {premiere>première:acc} mi-temps, nous marquons deux {but>buts:pl}. Les autres joueurs {court>courent:vb} très vite. À la fin, l'arbitre siffle et nous {gagne>gagnons:vb}. Nous sommes {tres>très:acc} contents."],

    ["La veille au soir",
     "{demain,>Demain,:maj} c'est mon premier examen. Ce soir, je relis mes {lecons>leçons:acc} une {derniere>dernière:acc} fois. Maman me {disent>dit:vb} de ne pas veiller trop tard. Je prépare mon sac, mes deux {stylo>stylos:pl} et ma {regle>règle:acc}. Papa met mon uniforme sur la chaise. Je me couche tôt mais je pense encore aux {question>questions:pl}. {enfin,>Enfin,:maj} je m'endors."],
  ];

  TEXTS.forEach(([title, text], i) => {
    STATIC_QUESTIONS.push(makeErrorHunt({
      id: `g4fr-eh-${String(i + 1).padStart(3, '0')}`,
      chapterId: CH, subsection: 'chasse_erreurs', difficulty: 2,
      title, text,
    }));
  });
})();
