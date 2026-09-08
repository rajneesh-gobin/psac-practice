'use strict';
// Grade 6 French - Chasse aux Erreurs (correction de texte, PSAC question 7).
// Twenty texts, TWELVE planted errors each, ~100-120 words.
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
// Grade 6 diet, on top of grades 4 and 5: leur/leurs, tout/tous/toute/toutes,
// la/là, ces/ses, on/ont, la virgule devant mais/car, l'accord du participe
// passé avec être, et le choix imparfait / passé composé. This is the year the
// child sits the paper, so the errors are the ones the paper actually plants.
(function () {
  const CH = 'g6fr-chasse-erreurs';

  const TEXTS = [
    ["La veille du départ",
     "{demain,>Demain,:maj} notre classe part en excursion. Hier soir, maman a préparé mon sac et a vérifié ma bouteille {d'eau>d'eau.:pt} Mes camarades et moi attendons ce jour depuis {longtemps>longtemps.:pt} La maîtresse nous a dit d'apporter {tout>toutes:pl} nos affaires dans un seul sac. Elle a rappelé aux parents que le bus partirait à sept {heure>heures:pl}. {ce>Ce:maj} matin-là, je me suis {leve>levé:pp} avant le réveil. Mon frère dormait {encore>encore,:vrg} mais moi je ne tenais plus en place. J'ai mis {ces>ses:hom} vieilles {chaussure>chaussures:pl} de marche, celles de mon frère. Nous sommes {parti>partis:pp} à l'heure et personne n'a été {oublie>oublié:pp}."],

    ["Le marché du samedi",
     "{tous>Tous:maj} les samedis matin, ma mère et ma tante vont au marché de Quatre {bornes>Bornes:maj}. Elles y retrouvent les mêmes {marchand>marchands:pl} depuis des {annee>années:acc}. Chacun connaît {leur>leurs:pl} habitudes et leur prépare déjà les meilleurs légumes. Ma tante achète des brèdes, des tomates, des piments et du {gingembre>gingembre.:pt} Elle discute toujours le {prix>prix,:vrg} car elle dit que c'est la tradition. Ma mère, elle, préfère payer sans {discuter>discuter.:pt} {la>Là:hom} où les allées sont étroites, la foule avance lentement. Nous y passons deux {heure>heures:pl} entières. Au retour, les paniers {est>sont:vb} si lourds que nous prenons le taxi. Toute la famille attend les fruits avec {impatience>impatience.:pt}"],

    ["L'arbre de la cour",
     "{au>Au:maj} milieu de la cour de notre école se dresse un vieux {banian>banian.:pt} Personne ne sait quel âge il a vraiment. Mon grand-père raconte qu'il jouait déjà sous ses branches quand il {est>était:tps} enfant. Ses racines descendent du tronc comme de longues {corde>cordes:pl}. À midi, {tout>tous:pl} les élèves cherchent son ombre. Les plus petits s'assoient contre le {tronc>tronc,:vrg} mais les grands grimpent sur les {branche>branches:pl} basses. L'année dernière, un cyclone a cassé une branche {enorme>énorme:acc}. Nous avons cru que l'arbre allait {mourir>mourir.:pt} Pourtant, au mois de novembre, {ces>ses:hom} feuilles sont {revenu>revenues:pp}. Le directeur dit que ce banian nous survivra à {tous>tous.:pt}"],

    ["Une nuit de pêche",
     "{mon>Mon:maj} oncle est pêcheur depuis vingt {an>ans:pl}. Une nuit, il m'a emmené avec {lui>lui.:pt} Nous sommes {sorti>sortis:pp} du lagon vers minuit. La pirogue avançait {doucement>doucement,:vrg} car le moteur était {vieux>vieux.:pt} {la>Là:hom} où l'eau devient noire, il a jeté ses filets. Il m'a expliqué que les poissons montent la nuit, quand la lune {et>est:hom} claire. J'avais {froid>froid,:vrg} mais je ne voulais pas rentrer. Vers quatre heures, nous avons remonté les filets {lourd>lourds:pl}. Mon oncle riait, tout content de {ces>ses:hom} prises. Nous sommes {rentre>rentrés:pp} au village avec le soleil."],

    ["Les oiseaux disparus",
     "{depuis>Depuis:maj} un an, notre village a une petite {bibliotheque>bibliothèque:acc}. Elle est ouverte tous les {apres-midi>après-midi:acc} sauf le {dimanche>dimanche.:pt} La dame qui s'en occupe connaît {tout>tous:pl} les enfants par leur prénom. Elle leur conseille des livres selon {leur>leurs:pl} goûts. Mon frère aime les histoires de {bateaux>bateaux,:vrg} mais moi je préfère les documentaires sur les {animaux>animaux.:pt} La semaine dernière, j'ai emprunté un livre sur les oiseaux de {maurice>Maurice:maj}. J'ai appris que le dodo n'{est>était:tps} pas le seul oiseau disparu de notre île. {ces>Ces:maj} pages m'ont donné envie d'en savoir plus. J'y retourne chaque {semaine>semaine.:pt}"],

    ["Sur l'estrade",
     "{vendredi>Vendredi:maj} dernier, l'école a organisé la remise des {prix>prix.:pt} {tout>Toute:pl} la cour avait été décorée de guirlandes. Les chaises {etait>étaient:acc} rangées en longues {rangee>rangées:acc} devant l'estrade. Les parents sont {arrive>arrivés:pp} bien avant l'heure. Le directeur a parlé le premier, puis la maîtresse a lu la liste des {gagnant>gagnants:pl}. Quand elle a dit mon nom, mes mains {tremblait>tremblaient:vb}. Je suis {monte>monté:pp} sur l'estrade et j'ai reçu mon livre. Mes parents m'ont {applaudi>applaudi,:vrg} mais c'est le sourire de ma grand-mère que j'ai vu en {premier>premier.:pt} Nous avons gardé ces {photo>photos:pl} dans un album."],

    ["La rivière derrière chez nous",
     "{quand>Quand:maj} j'étais petit, la rivière derrière chez nous était {claire>claire.:pt} Nous y allions presque tous les jours après {l'ecole>l'école:acc}. Mes cousins et moi construisions des barrages avec des {caillou>cailloux:pl}. Ma mère nous {grondait>grondait,:vrg} car nous rentrions toujours {trempe>trempés:pp}. Aujourd'hui, l'eau {et>est:hom} devenue trouble. Les gens jettent {leur>leurs:pl} sacs et {leur>leurs:pl} bouteilles sur la berge. {tout>Tous:pl} les habitants s'en plaignent, mais peu ramassent quelque chose. L'an dernier, notre classe a nettoyé cent mètres de {berge>berge.:pt} Ce n'est pas beaucoup, mais c'est un {debut>début:acc}."],

    ["Ma grand-mère raconte",
     "{le>Le:maj} soir, ma grand-mère nous raconte sa {jeunesse>jeunesse.:pt} Elle est {nee>née:acc} dans un petit village du sud. À l'époque, il n'y avait ni {electricite>électricité:acc} ni eau {courante>courante.:pt} Les femmes {allait>allaient:vb} chercher l'eau à la fontaine, très loin. Elle se levait à cinq {heures>heures,:vrg} car elle devait aider sa mère avant {l'ecole>l'école:acc}. Ses parents ne parlaient que le {créole>créole,:vrg} mais à l'école tout se passait en français. Elle dit que {ces>ses:hom} maîtresses étaient sévères. Pourtant, elle a gardé de très bons {souvenir>souvenirs:pl}. Quand elle finit son histoire, nous voulons toujours en entendre une {autre>autre.:pt}"],

    ["Le match de la finale",
     "{samedi,>Samedi,:maj} notre équipe a joué la finale du {tournoi>tournoi.:pt} Le terrain était plein et {tout>toutes:pl} les places étaient prises. Nos supporters avaient apporté {leur>leurs:pl} {drapeau>drapeaux:pl}. Dès le début, l'autre équipe a {marqué>marqué,:vrg} mais nous n'avons pas baissé les {bras>bras.:pt} À la mi-temps, l'entraîneur nous a tous réunis. Il a dit que le match {n'etait>n'était:acc} pas perdu. En seconde mi-temps, notre capitaine a marqué deux {but>buts:pl}. Les dernières minutes {etait>étaient:acc} très longues. Quand l'arbitre a sifflé, nous sommes {tombe>tombés:pp} dans les bras les uns des {autres>autres.:pt}"],

    ["La lettre au maire",
     "{madame>Madame:maj} la maire, nous vous écrivons au nom de la classe de {sixieme>sixième:acc}. Notre terrain de jeu est en très mauvais {etat>état:acc}. Les {balancoire>balançoires:acc} sont cassées depuis deux {an>ans:pl}. Les enfants du quartier n'ont plus d'endroit {ou>où:hom} jouer le soir. Nous avons demandé à nos {parents>parents,:vrg} mais ils disent que c'est à la mairie de {decider>décider:acc}. {tout>Tous:pl} les habitants de la rue ont signé notre lettre. Nous vous demandons de venir voir ces balançoires {vous-meme>vous-même:acc}. Nous {somme>sommes:vb} sûrs que vous comprendrez. Veuillez agréer, Madame, nos salutations {respectueuse>respectueuses:pl}."],

    ["Le dodo et nous",
     "{le>Le:maj} dodo a disparu il y a plus de trois cents {an>ans:pl}. Les marins qui abordaient l'île le {chassaient>chassaient,:vrg} car il ne savait pas {voler>voler.:pt} Il n'avait jamais eu besoin de fuir, puisque rien ne le menaçait. Les cochons et les {rat>rats:pl} amenés par les bateaux mangeaient {ces>ses:hom} oeufs. En quelques dizaines d'années, l'oiseau {a>avait:tps} complètement disparu. Aujourd'hui, on ne connaît son allure que par des dessins et quelques {os>os.:pt} {tout>Toute:pl} l'île en a fait son symbole. On le voit sur les billets, sur les {timbre>timbres:pl} et sur tous les souvenirs. Mais il rappelle aussi une {lecon>leçon:acc} : une espèce qui s'éteint ne revient {jamais>jamais.:pt}"],

    ["Les premières tomates",
     "{cette>Cette:maj} année, notre école a créé un petit {potager>potager.:pt} Chaque classe s'occupe de {ces>ses:hom} propres carrés. Nous avons planté des tomates, des brèdes, des piments et du {persil>persil.:pt} Au début, rien ne {poussait>poussait,:vrg} car la terre était trop {seche>sèche:acc}. Le jardinier de l'école nous a montré comment {arroser>arroser.:pt} Il nous a dit que {tout>toutes:pl} les plantes ont besoin de patience. Les élèves de cinquième {arrosait>arrosaient:vb} le matin, nous l'après-midi. En novembre, les premières tomates {est>sont:vb} apparues. Nous les avons {partage>partagées:pp} entre {tous>toutes:pl} les classes. Depuis, chacun surveille ces plants comme un trésor."],

    ["Un dimanche à Rodrigues",
     "{l'annee>L'année:acc} dernière, nous sommes {alle>allés:pp} passer une semaine chez ma tante. Son village se trouve {la>là:hom} où la route s'arrête, tout au nord. Le dimanche, tout le monde va à la messe, puis les familles se {retrouve>retrouvent:vb} sur la place. Les femmes apportent {leur>leurs:pl} plats et les partagent. J'ai goûté des ourites séchées, du maïs et des haricots {rouge>rouges:pl}. Mes cousins m'ont emmené voir {leur>leurs:pl} chèvres. Ils les connaissent {tous>toutes:pl} par leur nom. Le soir, un vieux monsieur {joue>jouait:tps} de {l'accordeon>l'accordéon:acc}. Nous avons dansé jusqu'à la {nuit>nuit,:vrg} mais personne n'était {fatigue>fatigué:acc}."],

    ["La panne de courant",
     "{jeudi>Jeudi:maj} soir, le courant s'est coupé dans tout le {quartier>quartier.:pt} Ma mère a allumé deux bougies dans la {cuisine>cuisine.:pt} Nous avons dîné à la lumière des {flammes>flammes,:vrg} car la nuit était déjà {tombee>tombée:pp}. Mon petit frère trouvait ça amusant. Mes parents, eux, s'inquiétaient pour le contenu du {frigo>frigo.:pt} {tout>Toutes:pl} les maisons de la rue étaient {noire>noires:pl}. Les voisins sont sortis avec {leur>leurs:pl} lampes et nous avons parlé longtemps sur la route. Personne n'avait de {reseau>réseau:acc} sur son téléphone. Le courant est revenu vers onze {heure>heures:pl}. Ce soir-là, nous avions presque oublié la {television>télévision:acc}."],

    ["Les genoux écorchés",
     "{pour>Pour:maj} mes dix ans, mes parents m'ont offert un {velo>vélo:acc}. C'était un modèle {d'occasion>d'occasion,:vrg} mais il brillait comme un {neuf>neuf.:pt} Mon père l'avait repeint en bleu pendant que je dormais. Les premières semaines, je suis {tombe>tombé:pp} plus souvent que je n'ai {roule>roulé:pp}. Mes genoux {etait>étaient:acc} pleins de {pansement>pansements:pl}. Ma mère voulait que {j'arrête>j'arrête,:vrg} car elle avait peur. Mon père, lui, disait qu'on n'apprend rien sans {tomber>tomber.:pt} Un dimanche, j'ai enfin fait le tour du terrain sans {ces>ses:hom} mains sur la selle. {tout>Tous:pl} mes cousins ont applaudi."],

    ["La nouvelle maîtresse",
     "{cette>Cette:maj} année, nous avons une nouvelle maîtresse. Elle s'appelle madame {appadoo>Appadoo:maj}. Le premier jour, elle a écrit trois {regle>règles:acc} au {tableau>tableau.:pt} La première disait qu'on {ecoute>écoute:acc} celui qui parle. Au début, {tout>toute:pl} la classe était silencieuse. Puis nous avons compris qu'elle riait {souvent>souvent.:pt} Elle nous fait lire à voix {haute>haute,:vrg} car elle dit que la lecture s'entend. Quand quelqu'un se trompe, elle ne se moque {jamais>jamais.:pt} Elle reprend le mot avec lui et on {recommence>recommence.:pt} Mes camarades {a>ont:vb} beaucoup progressé depuis septembre. Moi, j'ai enfin compris ces fameux {accord>accords:pl} du participe."],

    ["Le jardin de l'oncle Vikram",
     "{mon>Mon:maj} oncle Vikram cultive un jardin derrière sa {maison>maison.:pt} Il y passe {tout>toutes:pl} ses matinées. Ses arbres donnent des letchis, des mangues et des {goyave>goyaves:pl}. En décembre, les branches {est>sont:vb} si chargées qu'elles touchent presque le {sol>sol.:pt} Il partage {ces>ses:hom} fruits avec tous les voisins. Il dit qu'un fruit gardé trop longtemps ne sert à {personne>personne.:pt} L'an dernier, un cyclone a arraché deux {arbre>arbres:pl}. Il a {pleuré>pleuré,:vrg} mais il en a replanté trois. Ma tante trouve qu'il travaille {trop>trop.:pt} Lui répond que le jardin le {gardait>garde:tps} jeune."],

    ["La sortie au Morne",
     "{en>En:maj} septembre, notre classe est {monte>montée:pp} au Morne Brabant. Le guide nous a raconté l'histoire des {esclave>esclaves:pl} qui s'y étaient {refugie>réfugiés:pp}. Il a expliqué pourquoi cette montagne est un lieu de {memoire>mémoire:acc}. Le sentier était {raide>raide,:vrg} mais personne ne s'est {plaint>plaint.:pt} À mi-chemin, nous nous sommes arrêtés pour boire. De {la>là:hom}, on voyait tout le lagon et le récif. Mon amie a pris des photos avec {ces>ses:hom} parents. {tout>Tous:pl} les élèves ont écouté sans dire un {mot>mot.:pt} Sur le chemin du retour, la maîtresse nous a demandé d'écrire ce que nous avions ressenti. Personne n'a trouvé cela {difficile>difficile.:pt}"],

    ["Le vieux cahier de cuisine",
     "{dans>Dans:maj} un tiroir de la cuisine, ma mère garde un vieux {carnet>carnet.:pt} Elle y note {ces>ses:hom} recettes depuis son mariage. Certaines pages sont {tachées>tachées,:vrg} car elle cuisine en {lisant>lisant.:pt} L'écriture de ma grand-mère apparaît sur les premières {page>pages:pl}. Ma mère dit que ces recettes-là sont les meilleures. Elle a recopié celle du gâteau patate trois {fois>fois.:pt} Quand je serai grande, ce carnet me {reviendra>reviendra.:pt} J'y ajouterai mes propres {recette>recettes:pl}. Ma soeur trouve qu'un {telephone>téléphone:acc} serait plus {pratique>pratique,:vrg} mais maman refuse. Elle dit qu'un carnet ne s'éteint {jamais>jamais.:pt}"],

    ["Le dernier jour d'école",
     "{c'est>C'est:maj} aujourd'hui le dernier jour de {l'annee>l'année:acc}. La classe est presque {vide>vide.:pt} Nous avons rendu nos livres et vidé nos {casier>casiers:pl}. La maîtresse nous a distribué nos {bulletin>bulletins:pl}, puis elle a dit quelques {mot>mots:pl}. Elle nous a rappelé que le collège nous {attend>attend.:pt} Certains partiront {loin>loin,:vrg} car leur famille déménage. Nous avons échangé nos numéros et signé ces cahiers d'autographes. Mes amies {pleuraient>pleuraient,:vrg} mais elles riaient en même {temps>temps.:pt} {tout>Toute:pl} la cour résonnait de cris. En sortant, je me suis {retourne>retourné:pp} une dernière fois vers le vieux banian."],
  ];

  TEXTS.forEach(([title, text], i) => {
    STATIC_QUESTIONS.push(makeErrorHunt({
      id: `g6fr-eh-${String(i + 1).padStart(3, '0')}`,
      chapterId: CH, subsection: 'chasse_erreurs', difficulty: 3,
      title, text,
    }));
  });
})();
