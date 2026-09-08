'use strict';
// Grade 6 French - Chasse aux Erreurs (correction de texte, PSAC question 7).
// Twenty texts, TWELVE planted errors each, ~100-120 words.
//
// ⚠ type 'errorhunt': excluded from every practice and exam pool by
// isPoolQuestion() in questions_engine.js, reached only through ErrorHunt.
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
// ⚠ AUTHORING RULE: every word OUTSIDE the braces is correct French. A word
// left wrong by accident is an error the child can see, cannot score, and is
// told is correct when they click it. scripts/test-error-hunt.js re-reads the
// corrected text of all sixty texts and fails on a doubled space, a missing
// final stop, a lower-case sentence opening, an error that corrects to itself
// and a title that leaks one of its own answers.
//
// Grade 6 diet, on top of grades 4 and 5: leur/leurs, tout/tous/toute/toutes,
// la/là, ces/ses, on/ont, l'accord du participe
// passé avec être, et le choix imparfait / passé composé. This is the year the
// child sits the paper, so the errors are the ones the paper actually plants.
(function () {
  const CH = 'g6fr-chasse-erreurs';

  const TEXTS = [
    ["La veille du départ",
     "{demain,>Demain,:maj} notre classe part en excursion. Hier soir, maman a {prepare>préparé:acc} mon sac et a vérifié ma bouteille d'eau. Mes {camarade>camarades:pl} et moi attendons ce jour depuis longtemps. La maîtresse nous a dit d'apporter {tout>toutes:pl} nos affaires dans un seul sac. Elle a rappelé aux parents que le bus partirait à sept {heure>heures:pl}. {ce>Ce:maj} matin-là, je me suis {leve>levé:pp} avant le {reveil>réveil:acc}. Mon frère dormait encore, mais moi je ne tenais plus en place. J'ai mis {ces>ses:hom} vieilles {chaussure>chaussures:pl} de marche, celles de mon frère. Nous sommes {parti>partis:pp} à l'heure et personne n'a été {oublie>oublié:pp}."],

    ["Le marché du samedi",
     "{tous>Tous:maj} les samedis matin, ma mère et ma tante vont au marché de Quatre {bornes>Bornes:maj}. Elles y retrouvent les {memes>mêmes:acc} {marchand>marchands:pl} depuis des {annee>années:acc}. Chacun connaît {leur>leurs:pl} habitudes et leur prépare déjà les meilleurs légumes. Ma tante achète des brèdes, des tomates, des {piment>piments:pl} et du gingembre. Elle discute toujours le prix, car elle dit que c'est la tradition. Ma mère, elle, {prefere>préfère:acc} payer sans discuter. {la>Là:hom} où les allées sont étroites, la foule avance lentement. Nous y passons deux {heure>heures:pl} entières. Au retour, les paniers {est>sont:vb} si lourds que nous prenons le taxi. Toute la famille attend les {fruit>fruits:pl} avec impatience."],

    ["L'arbre de la cour",
     "{au>Au:maj} milieu de la cour de notre {ecole>école:acc} se dresse un vieux banian. Personne ne sait quel {age>âge:acc} il a vraiment. Mon grand-père raconte qu'il jouait déjà sous ses branches quand il {est>était:tps} enfant. Ses {racine>racines:pl} descendent du tronc comme de longues {corde>cordes:pl}. À midi, {tout>tous:pl} les élèves cherchent son ombre. Les plus petits s'assoient contre le tronc, mais les grands grimpent sur les {branche>branches:pl} basses. {L'annee>L'année:acc} dernière, un cyclone a cassé une branche {enorme>énorme:acc}. Nous avons cru que l'arbre allait mourir. Pourtant, au mois de novembre, {ces>ses:hom} feuilles sont {revenu>revenues:pp}. Le directeur dit que ce banian nous survivra à tous."],

    ["Une nuit de pêche",
     "{mon>Mon:maj} oncle est pêcheur depuis vingt {an>ans:pl}. Une nuit, il m'a {emmene>emmené:acc} avec lui. Nous sommes {sorti>sortis:pp} du lagon vers minuit. La pirogue {avancait>avançait:acc} doucement, car le moteur était vieux. {la>Là:hom} où l'eau devient noire, il a jeté ses {filet>filets:pl}. Il m'a {explique>expliqué:acc} que les poissons montent la nuit, quand la lune {et>est:hom} claire. J'avais froid, mais je ne voulais pas rentrer. Vers quatre heures, nous avons remonté les filets {lourd>lourds:pl}. Mon oncle riait, tout content de {ces>ses:hom} prises. Nous sommes {rentre>rentrés:pp} au village avec le soleil."],

    ["Les oiseaux disparus",
     "{depuis>Depuis:maj} un an, notre village a une petite {bibliotheque>bibliothèque:acc}. Elle est ouverte tous les {apres-midi>après-midi:acc} sauf le dimanche. La dame qui s'en occupe connaît {tout>tous:pl} les enfants par leur {prenom>prénom:acc}. Elle leur conseille des {livre>livres:pl} selon {leur>leurs:pl} goûts. Mon frère aime les histoires de bateaux, mais moi je préfère les documentaires sur les animaux. La semaine dernière, j'ai {emprunte>emprunté:acc} un livre sur les oiseaux de {maurice>Maurice:maj}. J'ai appris que le dodo n'{est>était:tps} pas le seul oiseau disparu de notre {ile>île:acc}. {ces>Ces:maj} pages m'ont donné envie d'en savoir plus. J'y retourne chaque semaine."],

    ["Sur l'estrade",
     "{vendredi>Vendredi:maj} dernier, l'école a {organise>organisé:acc} la remise des prix. {tout>Toute:pl} la cour avait été décorée de {guirlande>guirlandes:pl}. Les chaises {etait>étaient:acc} rangées en longues {rangee>rangées:acc} devant l'estrade. Les parents sont {arrive>arrivés:pp} bien avant l'heure. Le directeur a parlé le premier, puis la {maitresse>maîtresse:acc} a lu la liste des {gagnant>gagnants:pl}. Quand elle a dit mon nom, mes mains {tremblait>tremblaient:vb}. Je suis {monte>monté:pp} sur l'estrade et j'ai reçu mon livre. Mes parents m'ont applaudi, mais c'est le sourire de ma grand-mère que j'ai vu en premier. Nous avons gardé ces {photo>photos:pl} dans un album."],

    ["La rivière derrière chez nous",
     "{quand>Quand:maj} j'étais petit, la rivière derrière chez nous était claire. Nous y allions presque tous les jours après {l'ecole>l'école:acc}. Mes {cousin>cousins:pl} et moi construisions des barrages avec des {caillou>cailloux:pl}. Ma mère nous grondait, car nous rentrions toujours {trempe>trempés:pp}. Aujourd'hui, l'eau {et>est:hom} devenue trouble. Les gens jettent {leur>leurs:pl} sacs et {leur>leurs:pl} bouteilles sur la berge. {tout>Tous:pl} les habitants s'en plaignent, mais peu ramassent quelque chose. L'an dernier, notre classe a {nettoye>nettoyé:acc} cent {metres>mètres:acc} de berge. Ce n'est pas beaucoup, mais c'est un {debut>début:acc}."],

    ["Ma grand-mère raconte",
     "{le>Le:maj} soir, ma grand-mère nous raconte sa jeunesse. Elle est {nee>née:acc} dans un petit village du sud. À {l'epoque>l'époque:acc}, il n'y avait ni {electricite>électricité:acc} ni eau courante. Les {femme>femmes:pl} {allait>allaient:vb} chercher l'eau à la fontaine, très loin. Elle se levait à cinq heures, car elle devait aider sa mère avant {l'ecole>l'école:acc}. Ses {parent>parents:pl} ne parlaient que le {creole>créole:acc}, mais à l'école tout se passait en français. Elle dit que {ces>ses:hom} maîtresses étaient {severes>sévères:acc}. Pourtant, elle a gardé de très bons {souvenir>souvenirs:pl}. Quand elle finit son histoire, nous voulons toujours en entendre une autre."],

    ["Le match de la finale",
     "{samedi,>Samedi,:maj} notre {equipe>équipe:acc} a joué la finale du tournoi. Le terrain était plein et {tout>toutes:pl} les places étaient prises. Nos {supporter>supporters:pl} avaient apporté {leur>leurs:pl} {drapeau>drapeaux:pl}. Dès le début, l'autre équipe a marqué, mais nous n'avons pas baissé les bras. À la mi-temps, {l'entraineur>l'entraîneur:acc} nous a tous réunis. Il a dit que le match {n'etait>n'était:acc} pas perdu. En seconde mi-temps, notre capitaine a marqué deux {but>buts:pl}. Les dernières minutes {etait>étaient:acc} très longues. Quand l'arbitre a {siffle>sifflé:acc}, nous sommes {tombe>tombés:pp} dans les bras les uns des autres."],

    ["La lettre au maire",
     "{madame>Madame:maj} la maire, nous vous {ecrivons>écrivons:acc} au nom de la classe de {sixieme>sixième:acc}. Notre terrain de jeu est en très mauvais {etat>état:acc}. Les {balancoire>balançoires:acc} sont cassées depuis deux {an>ans:pl}. Les enfants du quartier n'ont plus d'endroit {ou>où:hom} jouer le soir. Nous avons demandé à nos parents, mais ils disent que c'est à la mairie de {decider>décider:acc}. {tout>Tous:pl} les habitants de la rue ont signé notre lettre. Nous vous demandons de venir voir ces balançoires {vous-meme>vous-même:acc}. Nous {somme>sommes:vb} sûrs que vous comprendrez. Veuillez agréer, Madame, nos salutations {respectueuse>respectueuses:pl}."],

    ["Le dodo et nous",
     "{le>Le:maj} dodo a disparu il y a plus de trois cents {an>ans:pl}. Les {marin>marins:pl} qui abordaient l'île le chassaient, car il ne savait pas voler. Il n'avait jamais eu besoin de fuir, puisque rien ne le {menacait>menaçait:acc}. Les cochons et les {rat>rats:pl} amenés par les bateaux mangeaient {ces>ses:hom} oeufs. En quelques dizaines {d'annees>d'années:acc}, l'oiseau {a>avait:tps} {completement>complètement:acc} disparu. Aujourd'hui, on ne connaît son allure que par des dessins et quelques os. {tout>Toute:pl} l'île en a fait son symbole. On le voit sur les billets, sur les {timbre>timbres:pl} et sur tous les souvenirs. Mais il rappelle aussi une {lecon>leçon:acc} : une espèce qui s'éteint ne revient jamais."],

    ["Les premières tomates",
     "{cette>Cette:maj} année, notre école a {cree>créé:acc} un petit potager. Chaque classe s'occupe de {ces>ses:hom} propres carrés. Nous avons planté des tomates, des brèdes, des {piment>piments:pl} et du persil. Au début, rien ne poussait, car la terre était trop {seche>sèche:acc}. Le jardinier de l'école nous a {montre>montré:acc} comment arroser. Il nous a dit que {tout>toutes:pl} les plantes ont besoin de patience. Les élèves de cinquième {arrosait>arrosaient:vb} le matin, nous l'après-midi. En novembre, les premières tomates {est>sont:vb} apparues. Nous les avons {partage>partagées:pp} entre {tous>toutes:pl} les classes. Depuis, chacun surveille ces plants comme un {tresor>trésor:acc}."],

    ["Un dimanche à Rodrigues",
     "{l'annee>L'année:acc} dernière, nous sommes {alle>allés:pp} passer une semaine chez ma tante. Son village se trouve {la>là:hom} où la route s'arrête, tout au nord. Le dimanche, tout le monde va à la messe, puis les familles se {retrouve>retrouvent:vb} sur la place. Les femmes apportent {leur>leurs:pl} plats et les partagent. J'ai goûté des ourites {sechees>séchées:acc}, du maïs et des haricots {rouge>rouges:pl}. Mes cousins m'ont emmené voir {leur>leurs:pl} chèvres. Ils les connaissent {tous>toutes:pl} par leur nom. Le soir, un vieux monsieur {joue>jouait:tps} de {l'accordeon>l'accordéon:acc}. Nous avons dansé jusqu'à la nuit, mais personne n'était {fatigue>fatigué:acc}."],

    ["La panne de courant",
     "{jeudi>Jeudi:maj} soir, le courant s'est coupé dans tout le quartier. Ma mère a {allume>allumé:acc} deux {bougie>bougies:pl} dans la cuisine. Nous avons dîné à la lumière des flammes, car la nuit était déjà {tombee>tombée:pp}. Mon petit frère trouvait ça amusant. Mes parents, eux, {s'inquietaient>s'inquiétaient:acc} pour le contenu du frigo. {tout>Toutes:pl} les maisons de la rue étaient {noire>noires:pl}. Les voisins sont sortis avec {leur>leurs:pl} {lampe>lampes:pl} et nous avons parlé longtemps sur la route. Personne n'avait de {reseau>réseau:acc} sur son téléphone. Le courant est revenu vers onze {heure>heures:pl}. Ce soir-là, nous avions presque oublié la {television>télévision:acc}."],

    ["Les genoux écorchés",
     "{pour>Pour:maj} mes dix ans, mes parents m'ont offert un {velo>vélo:acc}. C'était un {modele>modèle:acc} d'occasion, mais il brillait comme un neuf. Mon père l'avait repeint en bleu pendant que je dormais. Les {premieres>premières:acc} semaines, je suis {tombe>tombé:pp} plus souvent que je n'ai {roule>roulé:pp}. Mes genoux {etait>étaient:acc} pleins de {pansement>pansements:pl}. Ma {mere>mère:acc} voulait que j'arrête, car elle avait peur. Mon père, lui, disait qu'on n'apprend rien sans tomber. Un dimanche, j'ai enfin fait le tour du terrain sans {ces>ses:hom} mains sur la selle. {tout>Tous:pl} mes {cousin>cousins:pl} ont applaudi."],

    ["La nouvelle maîtresse",
     "{cette>Cette:maj} {annee>année:acc}, nous avons une nouvelle maîtresse. Elle s'appelle madame {appadoo>Appadoo:maj}. Le premier jour, elle a {ecrit>écrit:acc} trois {regle>règles:acc} au tableau. La {premiere>première:acc} disait qu'on {ecoute>écoute:acc} celui qui parle. Au {debut>début:acc}, {tout>toute:pl} la classe était silencieuse. Puis nous avons compris qu'elle riait souvent. Elle nous fait lire à voix haute, car elle dit que la lecture s'entend. Quand quelqu'un se trompe, elle ne se moque jamais. Elle reprend le mot avec lui et on recommence. Mes {camarade>camarades:pl} {a>ont:vb} beaucoup progressé depuis septembre. Moi, j'ai enfin compris ces fameux {accord>accords:pl} du participe."],

    ["Le jardin de l'oncle Vikram",
     "{mon>Mon:maj} oncle Vikram cultive un jardin {derriere>derrière:acc} sa maison. Il y passe {tout>toutes:pl} ses matinées. Ses arbres donnent des letchis, des {mangue>mangues:pl} et des {goyave>goyaves:pl}. En {decembre>décembre:acc}, les branches {est>sont:vb} si chargées qu'elles touchent presque le sol. Il partage {ces>ses:hom} fruits avec tous les {voisin>voisins:pl}. Il dit qu'un fruit gardé trop longtemps ne sert à personne. L'an dernier, un cyclone a {arrache>arraché:acc} deux {arbre>arbres:pl}. Il a pleuré, mais il en a replanté trois. Ma tante trouve qu'il travaille trop. Lui répond que le jardin le {gardait>garde:tps} jeune."],

    ["La sortie au Morne",
     "{en>En:maj} septembre, notre classe est {monte>montée:pp} au Morne Brabant. Le guide nous a {raconte>raconté:acc} l'histoire des {esclave>esclaves:pl} qui s'y étaient {refugie>réfugiés:pp}. Il a expliqué pourquoi cette montagne est un lieu de {memoire>mémoire:acc}. Le sentier était raide, mais personne ne s'est plaint. À mi-chemin, nous nous sommes {arretes>arrêtés:acc} pour boire. De {la>là:hom}, on voyait tout le lagon et le {recif>récif:acc}. Mon amie a pris des {photo>photos:pl} avec {ces>ses:hom} parents. {tout>Tous:pl} les élèves ont écouté sans dire un mot. Sur le chemin du retour, la maîtresse nous a demandé d'écrire ce que nous avions ressenti. Personne n'a trouvé cela difficile."],

    ["Le vieux cahier de cuisine",
     "{dans>Dans:maj} un tiroir de la cuisine, ma {mere>mère:acc} garde un vieux carnet. Elle y note {ces>ses:hom} recettes depuis son mariage. Certaines pages sont {tachee>tachées:pl}, car elle cuisine en lisant. {L'ecriture>L'écriture:acc} de ma {grand-mere>grand-mère:acc} apparaît sur les premières {page>pages:pl}. Ma mère dit que ces recettes-là sont les meilleures. Elle a {recopie>recopié:acc} celle du {gateau>gâteau:acc} patate trois fois. Quand je serai grande, ce carnet me reviendra. J'y ajouterai mes propres {recette>recettes:pl}. Ma soeur trouve qu'un {telephone>téléphone:acc} serait plus pratique, mais maman refuse. Elle dit qu'un carnet ne {s'eteint>s'éteint:acc} jamais."],

    ["Le dernier jour d'école",
     "{c'est>C'est:maj} aujourd'hui le dernier jour de {l'annee>l'année:acc}. La classe est presque vide. Nous avons rendu nos {livre>livres:pl} et vidé nos {casier>casiers:pl}. La {maitresse>maîtresse:acc} nous a distribué nos {bulletin>bulletins:pl}, puis elle a dit quelques {mot>mots:pl}. Elle nous a rappelé que le {college>collège:acc} nous attend. Certains partiront loin, car leur famille {demenage>déménage:acc}. Nous avons échangé nos {numero>numéros:pl} et signé ces cahiers d'autographes. Mes amies pleuraient, mais elles riaient en même temps. {tout>Toute:pl} la cour résonnait de cris. En sortant, je me suis {retourne>retourné:pp} une dernière fois vers le vieux banian."],
  ];

  TEXTS.forEach(([title, text], i) => {
    STATIC_QUESTIONS.push(makeErrorHunt({
      id: `g6fr-eh-${String(i + 1).padStart(3, '0')}`,
      chapterId: CH, subsection: 'chasse_erreurs', difficulty: 3,
      title, text,
    }));
  });
})();
