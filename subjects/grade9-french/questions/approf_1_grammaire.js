'use strict';
(function () {

// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Français — approfondissement niveau 4 (« Analyse de texte »)
//
//  57 items, TOUS à difficulty: 4, sur trois chapitres : g9fr-grammaire,
//  g9fr-transformation et g9fr-formation-mots. Les planchers de sous-section
//  (20 items) y étaient déjà atteints ; ce lot ne comble que le niveau 4, qui
//  n'y comptait qu'un seul item par chapitre.
//
//  ⚠ L4 dans ce pack n'est pas « plus difficile » : c'est un CONTEXTE où
//    plusieurs points de langue interagissent. Chaque item ci-dessous demande
//    deux décisions au moins, et une seule bien prise ne suffit pas.
//
//  ⚠ Sous-section `connecteurs` : deux options interchangeables font échouer
//    le build (scripts/test-option-synonyms.js). Les options y opposent des
//    FONCTIONS différentes — opposition, cause, conséquence, addition — jamais
//    deux mots d'une même famille.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ═══════════════════════════════════════════════════════════════════════
  //  g9fr-grammaire  ·  g9fr-ap1-001 à 019
  // ═══════════════════════════════════════════════════════════════════════

  // ── temps_modes ────────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-001', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 4,
    question: "Deux conjonctions, deux modes. Complète : « Après que le cyclone .......... la côte de Mahébourg, les pêcheurs ont attendu deux jours avant qu'on leur .......... l'autorisation de sortir. »",
    options: ["a frappé … donne", "ait frappé … donne", "a frappé … donnait", "ait frappé … donnait"],
    answer: "a frappé … donne",
    hint: "Les deux conjonctions de la phrase ne commandent pas le même mode : traite-les séparément.",
    explanation: "<b>Après que</b> se construit avec l'<b>indicatif</b>, parce que le fait est déjà accompli : « après que le cyclone <b>a frappé</b> ». <b>Avant que</b>, au contraire, envisage un fait non encore réalisé et commande le <b>subjonctif</b> : « avant qu'on leur <b>donne</b> ». L'erreur fréquente est d'aligner les deux sur le subjonctif (« après qu'il ait frappé ») par analogie avec « avant que »." }),

  makeText({ id: 'g9fr-ap1-002', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 4,
    question: "Écris le verbe entre parenthèses à la forme qui convient : « Si nous avions réservé nos billets plus tôt, nous .......... <i>(partir)</i> pour Rodrigues dès vendredi et nous serions déjà rentrés. »",
    answer: "serions partis", alsoAccept: ["nous serions partis"],
    hint: "Regarde le temps de la proposition introduite par « si », puis la forme du dernier verbe de la phrase.",
    explanation: "Après <b>si + plus-que-parfait</b>, la principale se met au <b>conditionnel passé</b> : « nous <b>serions partis</b> ». Le verbe « partir » se conjugue avec l'auxiliaire <b>être</b>, donc le participe s'accorde avec le sujet « nous » : parti<b>s</b>. Deux erreurs fréquentes se combinent ici : écrire « nous aurions parti » (mauvais auxiliaire) et oublier l'accord." }),

  makeMCQ({ id: 'g9fr-ap1-003', chapterId: 'g9fr-grammaire', subsection: 'temps_modes', difficulty: 4,
    question: "Deux verbes introducteurs, deux modes. Complète : « Le directeur espère que chaque élève .......... la consigne et il exige que les parents la .......... avant lundi. »",
    options: ["comprend … signent", "comprenne … signent", "comprend … signeront", "comprenne … signeront"],
    answer: "comprend … signent",
    hint: "Un verbe qui dit un souhait et un verbe qui dit une obligation n'ont pas la même construction.",
    explanation: "<b>Espérer que</b> à la forme affirmative se construit avec l'<b>indicatif</b> : « il espère que chaque élève <b>comprend</b> ». <b>Exiger que</b>, verbe de volonté, commande le <b>subjonctif</b> : « il exige que les parents la <b>signent</b> ». L'erreur fréquente est de mettre le subjonctif après « espérer », par confusion avec « souhaiter que », qui, lui, le demande vraiment." }),

  // ── connecteurs ────────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-004', chapterId: 'g9fr-grammaire', subsection: 'connecteurs', difficulty: 4,
    question: "Lis : « Les prévisions annonçaient de fortes pluies ; .......... , le comité n'a pas annulé la kermesse. Les averses sont tombées dès dix heures, .......... la moitié des stands sont restés vides. » Quel couple de connecteurs convient ?",
    options: ["pourtant … si bien que", "pourtant … à moins que", "en effet … si bien que", "en effet … à moins que"],
    answer: "pourtant … si bien que",
    hint: "Traite les deux blancs l'un après l'autre : relis ce qui précède et ce qui suit chacun avant de choisir le couple.",
    explanation: "Le premier blanc relie une annonce de pluie à une décision qui va contre elle : il faut un connecteur d'<b>opposition</b>. Le second relie un fait à ce qu'il entraîne : il faut un connecteur de <b>conséquence</b>. « En effet » confirmerait au lieu d'opposer, et « à moins que » poserait une condition — et commanderait en plus le subjonctif, impossible devant « sont restés »." }),

  makeText({ id: 'g9fr-ap1-005', chapterId: 'g9fr-grammaire', subsection: 'connecteurs', difficulty: 4,
    question: "Un seul lien manque, en deux mots : « Nirmala a révisé tous les soirs .......... elle réussisse son examen blanc. » Le verbe « réussisse » est au subjonctif.",
    answer: "pour que", alsoAccept: ["afin que", "pour qu", "afin qu"],
    hint: "Le mode du verbe qui suit le blanc t'indique la catégorie du lien : une conjonction de cause ne le commanderait pas.",
    explanation: "Le subjonctif « réussisse » signale que le fait n'est pas constaté mais visé : c'est un lien de <b>but</b>, <b>pour que</b> (ou « afin que »). L'erreur fréquente est « parce que », qui exprime la cause et se construit avec l'indicatif : on dirait alors « parce qu'elle réussit ». Le mode du verbe est ici le seul indice fiable." }),

  makeMCQ({ id: 'g9fr-ap1-006', chapterId: 'g9fr-grammaire', subsection: 'connecteurs', difficulty: 4,
    question: "Complète : « Le bus de Curepipe part à six heures dix ; .......... , Yash se lève à cinq heures. Sa sœur, .......... , prend le train et dort une demi-heure de plus. »",
    options: ["donc … en revanche", "donc … en effet", "pourtant … en revanche", "pourtant … en effet"],
    answer: "donc … en revanche",
    hint: "Demande-toi si chaque blanc relie deux faits qui se suivent logiquement ou deux faits qui s'opposent.",
    explanation: "Se lever à cinq heures découle de l'heure du bus : le premier blanc demande une <b>conséquence</b>. La sœur fait le contraire du frère : le second blanc demande une <b>opposition</b>. « Pourtant » au premier blanc ferait de l'heure du lever une surprise, alors qu'elle s'explique, et « en effet » au second confirmerait ce qui précède au lieu de le contraster." }),

  // ── accords ────────────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-007', chapterId: 'g9fr-grammaire', subsection: 'accords', difficulty: 4,
    question: "Écris le participe passé correctement accordé : « Les photos que Priya a .......... <i>(prendre)</i> à Chamarel, elle les a envoyées à sa correspondante. »",
    answer: "prises", alsoAccept: ["a prises"],
    hint: "Cherche le complément d'objet direct de ce verbe, puis demande-toi s'il se trouve avant ou après l'auxiliaire.",
    explanation: "Avec l'auxiliaire <b>avoir</b>, le participe s'accorde avec le complément d'objet direct <b>seulement si celui-ci est placé avant</b>. Ici le COD est le relatif « que », qui reprend « les photos », féminin pluriel : on écrit <b>prises</b>. La fin de la phrase applique la même règle avec « les » (« elle les a envoyé<b>es</b> ») et sert de contrôle. L'erreur fréquente est de laisser « pris », la forme du dictionnaire." }),

  makeMCQ({ id: 'g9fr-ap1-008', chapterId: 'g9fr-grammaire', subsection: 'accords', difficulty: 4,
    question: "Deux participes passés, deux auxiliaires différents. Une seule de ces phrases est correctement accordée : laquelle ?",
    options: [
      "Les fleurs qu'elle a cueillies sont restées fraîches.",
      "Les fleurs qu'elle a cueilli sont restées fraîche.",
      "Les fleurs qu'elle a cueillies sont resté très fraîches.",
      "Les fleurs qu'elle a cueilli sont restés fraîches."
    ],
    answer: "Les fleurs qu'elle a cueillies sont restées fraîches.",
    hint: "Un participe employé avec « avoir » et un participe employé avec « être » ne regardent pas le même mot pour s'accorder.",
    explanation: "Avec <b>avoir</b>, le participe s'accorde avec le COD placé avant : « que » reprend « les fleurs », donc <b>cueillies</b>. Avec <b>être</b>, il s'accorde avec le sujet : « les fleurs » sont <b>restées</b>, et l'attribut <b>fraîches</b> suit le même accord. L'erreur fréquente est de n'en accorder qu'un des deux : chaque participe doit être vérifié avec son propre auxiliaire." }),

  makeText({ id: 'g9fr-ap1-009', chapterId: 'g9fr-grammaire', subsection: 'accords', difficulty: 4,
    question: "Écris le verbe « suivre » au présent, correctement accordé : « La plupart des élèves de la classe de Madame Bhujun .......... le cours de théâtre le mercredi. »",
    answer: "suivent", alsoAccept: ["ils suivent"],
    hint: "Le groupe sujet contient plusieurs noms : demande-toi lequel commande réellement l'accord.",
    explanation: "Après <b>la plupart de + nom pluriel</b>, l'accord se fait avec le complément, pas avec « la plupart » : « la plupart des élèves <b>suivent</b> ». L'erreur fréquente est d'écrire « suit », en accordant avec le mot singulier le plus proche de l'article. Autre piège du même genre ici : « de la classe de Madame Bhujun » est un complément du nom et ne commande rien." }),

  // ── determinants ───────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-010', chapterId: 'g9fr-grammaire', subsection: 'determinants', difficulty: 4,
    question: "Complète : « À la boutique du coin, Kavi a acheté .......... pain, mais il n'a pas pris .......... lait : il lui restait un litre au frigo. »",
    options: ["du … de", "du … du", "le … de", "le … du"],
    answer: "du … de",
    hint: "Compare attentivement les deux propositions : l'une est affirmative, l'autre ne l'est pas.",
    explanation: "Devant une quantité indéterminée, on emploie l'article <b>partitif</b> : « il a acheté <b>du</b> pain ». Mais après une négation, le partitif se réduit à <b>de</b> : « il n'a pas pris <b>de</b> lait ». L'erreur fréquente est de garder « du » dans la phrase négative. L'article défini « le pain » changerait le sens : il désignerait un pain précis, déjà connu." }),

  makeText({ id: 'g9fr-ap1-011', chapterId: 'g9fr-grammaire', subsection: 'determinants', difficulty: 4,
    question: "Écris le déterminant possessif qui manque : « Sa nouvelle trousse est dans le sac, mais Sandrine a oublié .......... ancienne ardoise sur la table de la cuisine. »",
    answer: "son", alsoAccept: ["son ancienne ardoise"],
    hint: "Le nom qui suit est féminin, comme « trousse » au début de la phrase — mais regarde par quelle lettre il commence.",
    explanation: "Devant un nom féminin commençant par une <b>voyelle</b>, le possessif prend la forme masculine pour l'euphonie : <b>son</b> ancienne ardoise, mon amie, ton école. Le nom reste pourtant féminin, ce que prouve l'adjectif « ancien<b>ne</b> ». L'erreur fréquente est « sa ancienne ardoise », recopiée sur « <b>sa</b> nouvelle trousse » du début de la phrase, où le nom commence par une consonne." }),

  makeMCQ({ id: 'g9fr-ap1-012', chapterId: 'g9fr-grammaire', subsection: 'determinants', difficulty: 4,
    question: "Complète : « Les gagnants .......... concours de poésie recevront la médaille .......... municipalité de Quatre-Bornes. »",
    options: ["du … de la", "de … de la", "du … à la", "de … à la"],
    answer: "du … de la",
    hint: "Chaque blanc combine une préposition avec un article : demande-toi laquelle, et devant quel genre.",
    explanation: "« De + le » se contracte obligatoirement en <b>du</b> : les gagnants <b>du</b> concours. « De + la » ne se contracte pas : la médaille <b>de la</b> municipalité. L'erreur fréquente est d'écrire « de le concours », forme qui n'existe pas en français. « À la municipalité » indiquerait un lieu ou un destinataire, alors que la phrase dit à qui la médaille appartient." }),

  // ── pronoms ────────────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-013', chapterId: 'g9fr-grammaire', subsection: 'pronoms', difficulty: 4,
    question: "Deux relatives dans une même phrase. Complète : « Le village .......... nous avons parlé hier, celui .......... se trouve la vieille église, est tout près de Mahébourg. »",
    options: ["dont … où", "dont … que", "que … où", "que … dont"],
    answer: "dont … où",
    hint: "Pour chaque blanc, repère le verbe qui suit et la préposition que ce verbe réclame.",
    explanation: "On dit « parler <b>de</b> quelque chose » : le pronom relatif qui contient déjà ce « de » est <b>dont</b>. La seconde relative situe quelque chose dans un lieu : c'est <b>où</b>. L'erreur fréquente est « que », qui ne remplace qu'un complément d'objet direct : on ne dit pas « le village que nous avons parlé », puisque le verbe « parler » n'a pas de COD ici." }),

  makeText({ id: 'g9fr-ap1-014', chapterId: 'g9fr-grammaire', subsection: 'pronoms', difficulty: 4,
    question: "Écris le pronom qui manque : « — Tu penses à ton exposé ? — Oui, j'y pense. Il me faut aussi le dictionnaire : j'.......... ai besoin dès ce soir. »",
    answer: "en", alsoAccept: ["j'en ai besoin", "en ai besoin"],
    hint: "Relis la construction du verbe employé dans la dernière phrase : quelle préposition introduit son complément ?",
    explanation: "On dit « avoir besoin <b>de</b> quelque chose » : le pronom qui remplace un complément introduit par « de » est <b>en</b>. Le début du dialogue emploie <b>y</b>, qui remplace un complément introduit par « à » (« penser <b>à</b> » → j'<b>y</b> pense). L'erreur fréquente est de recopier le pronom de la phrase précédente sans vérifier la préposition du nouveau verbe." }),

  makeMCQ({ id: 'g9fr-ap1-015', chapterId: 'g9fr-grammaire', subsection: 'pronoms', difficulty: 4,
    question: "Complète : « Nadège a écrit à ses cousins de Rodrigues ; elle .......... a envoyé des photos, puis elle .......... a invités pour les vacances. »",
    options: ["leur … les", "leur … leur", "les … les", "les … leur"],
    answer: "leur … les",
    hint: "Les deux verbes ne se construisent pas de la même façon ; l'accord du participe passé te donne une seconde vérification.",
    explanation: "On envoie quelque chose <b>à</b> quelqu'un : « à ses cousins » est un complément d'objet indirect, remplacé par <b>leur</b>. On invite quelqu'un, sans préposition : c'est un complément d'objet direct, remplacé par <b>les</b>. Le participe « invit<b>és</b> » confirme la seconde réponse, car il s'accorde avec le COD placé avant — ce qui n'arrive jamais avec « leur »." }),

  // ── prepositions ───────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-016', chapterId: 'g9fr-grammaire', subsection: 'prepositions', difficulty: 4,
    question: "Écris la préposition qui manque : « Le car pour Flic-en-Flac part .......... dix minutes, mais Ravi attend déjà depuis vingt minutes. »",
    answer: "dans", alsoAccept: ["dans dix minutes"],
    hint: "Une des deux indications de temps est déjà écrite dans la phrase : demande-toi ce que l'autre doit exprimer.",
    explanation: "<b>Dans</b> dix minutes annonce le moment où une action commencera : il répond à « quand ? ». <b>En</b> dix minutes mesurerait la durée nécessaire pour accomplir l'action, et <b>depuis</b>, déjà employé dans la phrase, mesure une durée commencée et non finie. L'erreur fréquente est « en dix minutes », qui ferait dire que le trajet du car dure dix minutes." }),

  makeMCQ({ id: 'g9fr-ap1-017', chapterId: 'g9fr-grammaire', subsection: 'prepositions', difficulty: 4,
    question: "Complète : « Ma tante vit .......... Rodrigues depuis dix ans, et son frère travaille .......... Afrique du Sud. »",
    options: ["à … en", "à … à la", "en … en", "en … à la"],
    answer: "à … en",
    hint: "Regarde si chaque nom de lieu s'emploie normalement avec un article ou sans article.",
    explanation: "Les noms d'îles employés sans article prennent <b>à</b> : à Rodrigues, à Maurice, à Madagascar. Les noms de pays féminins prennent <b>en</b> : <b>en</b> Afrique du Sud, en France, en Inde. L'erreur fréquente est « en Rodrigues », calquée sur « en France » sans voir que l'un est une île sans article et l'autre un pays féminin." }),

  // ── interrogatifs ──────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-018', chapterId: 'g9fr-grammaire', subsection: 'interrogatifs', difficulty: 4,
    question: "Lis la réponse, puis écris le mot interrogatif qui manque : « — .......... des deux trajets prends-tu le matin, celui par Ébène ou celui par Phoenix ? — Celui par Ébène, il est plus court. »",
    answer: "lequel", alsoAccept: ["lequel des deux"],
    hint: "Regarde ce que fait la réponse : nomme-t-elle une chose, explique-t-elle une raison, ou choisit-elle entre deux possibilités déjà citées ?",
    explanation: "Devant « des deux », il faut un <b>pronom</b> interrogatif, puisque le nom n'est pas répété : <b>lequel</b> demande de choisir dans un ensemble déjà connu, ce que fait exactement la réponse. L'erreur fréquente est « quel », qui est un déterminant et doit être suivi d'un nom : « <b>quel</b> trajet prends-tu ? » serait correct, mais pas « quel des deux »." }),

  makeMCQ({ id: 'g9fr-ap1-019', chapterId: 'g9fr-grammaire', subsection: 'interrogatifs', difficulty: 4,
    question: "Deux interrogations indirectes dans une même phrase. Complète : « Le surveillant demande .......... l'excursion est maintenue et .......... les élèves doivent apporter. »",
    options: ["si … ce que", "si … ce qui", "que … ce que", "que … ce qui"],
    answer: "si … ce que",
    hint: "Rien ici n'est une question directe : regarde ce que chaque proposition subordonnée cherche réellement à savoir.",
    explanation: "Une question fermée, à laquelle on répond par oui ou non, devient <b>si</b> en interrogation indirecte : « L'excursion est-elle maintenue ? » → il demande <b>si</b> elle est maintenue. Une question portant sur une chose devient <b>ce que</b> quand ce mot est complément d'objet : « apporter <b>quoi</b> ? » → <b>ce que</b> les élèves doivent apporter. « Ce qui » serait sujet, et « que » seul introduit une déclaration, pas une question." }),

  // ═══════════════════════════════════════════════════════════════════════
  //  g9fr-transformation  ·  g9fr-ap1-020 à 038
  // ═══════════════════════════════════════════════════════════════════════

  // ── ponctuation ────────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-020', chapterId: 'g9fr-transformation', subsection: 'ponctuation', difficulty: 4,
    question: "Réécris correctement ce passage, où toute la ponctuation manque : « Tu viens avec nous demanda Ravi en refermant la barrière ». Quelle version est juste ?",
    options: [
      "« Tu viens avec nous ? » demanda Ravi en refermant la barrière.",
      "« Tu viens avec nous ? », demanda Ravi en refermant la barrière.",
      "« Tu viens avec nous. » demanda Ravi en refermant la barrière ?",
      "« Tu viens avec nous » ? demanda Ravi en refermant la barrière."
    ],
    answer: "« Tu viens avec nous ? » demanda Ravi en refermant la barrière.",
    hint: "Deux choses se décident ici : à l'intérieur ou à l'extérieur de quoi tombe le signe final des paroles, et ce qui sépare les paroles de l'incise.",
    explanation: "Le point d'interrogation appartient aux paroles prononcées : il se place <b>à l'intérieur</b> des guillemets. L'incise (« demanda Ravi ») suit directement le guillemet fermant, <b>sans virgule</b>, parce que le signe d'interrogation joue déjà ce rôle de séparation. L'erreur fréquente est d'ajouter cette virgule, ou de rejeter le point d'interrogation après les guillemets, ce qui ferait porter la question sur toute la phrase." }),

  makeMCQ({ id: 'g9fr-ap1-021', chapterId: 'g9fr-transformation', subsection: 'ponctuation', difficulty: 4,
    question: "Transforme au discours indirect : « Le maître a dit : “Rangez vos affaires, la cloche va sonner.” » Quelle version est correctement ponctuée ET correctement transformée ?",
    options: [
      "Le maître a dit de ranger nos affaires car la cloche allait sonner.",
      "Le maître a dit : de ranger nos affaires car la cloche allait sonner.",
      "Le maître a dit de ranger vos affaires car la cloche va sonner.",
      "Le maître a dit « de ranger nos affaires car la cloche allait sonner »."
    ],
    answer: "Le maître a dit de ranger nos affaires car la cloche allait sonner.",
    hint: "Au discours indirect, deux signes disparaissent et deux catégories de mots changent ; vérifie les quatre avant de choisir.",
    explanation: "Le passage au discours indirect supprime les <b>deux-points</b> et les <b>guillemets</b>, qui n'encadrent plus rien de cité. Il change aussi la <b>personne</b> (« vos » devient « nos », puisque le narrateur fait partie de la classe) et le <b>temps</b> (« va sonner » devient « allait sonner », le verbe introducteur étant au passé). L'erreur fréquente est de ne transformer que la ponctuation en laissant les paroles intactes." }),

  // ── negation ───────────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-022', chapterId: 'g9fr-transformation', subsection: 'negation', difficulty: 4,
    question: "Mets cette phrase à la forme négative avec « ne … plus », et écris-la en entier : « Elle achète encore des journaux à la gare. »",
    answer: "Elle n'achète plus de journaux à la gare.",
    alsoAccept: ["elle n'achète plus de journaux à la gare"],
    hint: "Deux mots changent, pas un seul : celui qui encadre le verbe, et celui qui vient juste après lui.",
    explanation: "L'adverbe « encore » a pour négation <b>ne … plus</b> : « elle <b>n'</b>achète <b>plus</b> ». Mais la transformation entraîne un second changement : après une négation, l'article indéfini ou partitif « des » se réduit à <b>de</b>. On écrit donc « plus <b>de</b> journaux ». L'erreur fréquente est « elle n'achète plus des journaux », correcte sur la négation mais fausse sur l'article." }),

  makeMCQ({ id: 'g9fr-ap1-023', chapterId: 'g9fr-transformation', subsection: 'negation', difficulty: 4,
    question: "Mets cet ordre à la forme négative : « Dis-le-lui tout de suite. » Quelle version est juste ?",
    options: [
      "Ne le lui dis pas tout de suite.",
      "Ne lui le dis pas tout de suite.",
      "Ne dis-le-lui pas tout de suite.",
      "Ne les lui dis pas tout de suite."
    ],
    answer: "Ne le lui dis pas tout de suite.",
    hint: "À l'impératif négatif, les pronoms ne restent ni à la même place ni dans le même ordre : vérifie les deux points.",
    explanation: "À l'impératif <b>affirmatif</b>, les pronoms suivent le verbe avec des traits d'union et le COD passe en premier : « Dis-<b>le</b>-<b>lui</b> ». À l'impératif <b>négatif</b>, ils reviennent <b>devant</b> le verbe, dans l'ordre ordinaire de la phrase, et les traits d'union disparaissent : « Ne <b>le lui</b> dis pas ». L'erreur fréquente est de garder les traits d'union et d'écrire « Ne dis-le-lui pas »." }),

  // ── place_adjectif ─────────────────────────────────────────────────────

  makeMCQ({ id: 'g9fr-ap1-024', chapterId: 'g9fr-transformation', subsection: 'place_adjectif', difficulty: 4,
    question: "L'adjectif « ancien » change de sens selon sa place. Laquelle de ces phrases dit que Madame Appadoo ne dirige plus l'école aujourd'hui ?",
    options: [
      "C'est une ancienne directrice de l'école.",
      "C'est une directrice ancienne de l'école.",
      "C'est une directrice très ancienne à l'école.",
      "C'est une vieille directrice de notre école."
    ],
    answer: "C'est une ancienne directrice de l'école.",
    hint: "Cet adjectif ne dit pas la même chose devant le nom et derrière lui : essaie les deux places et compare le sens obtenu.",
    explanation: "Placé <b>devant</b> le nom, « ancien » signifie « qui ne l'est plus » : une <b>ancienne</b> directrice a cessé ses fonctions. Placé <b>après</b>, il signifie « vieux, qui date » : une directrice ancienne serait en poste depuis longtemps. L'erreur fréquente est de croire que la place d'un adjectif n'est qu'une question de style : pour « ancien », « grand », « propre » ou « seul », elle change le sens de la phrase." }),

  makeText({ id: 'g9fr-ap1-025', chapterId: 'g9fr-transformation', subsection: 'place_adjectif', difficulty: 4,
    question: "Place les deux adjectifs « grand » et « bleu » autour du nom et accorde-les. Écris le groupe nominal entier : « une maison <i>(grand)</i> <i>(bleu)</i> ».",
    answer: "une grande maison bleue", alsoAccept: ["grande maison bleue"],
    hint: "Les adjectifs courts et très fréquents ne se placent pas comme les adjectifs de couleur ; vérifie ensuite le genre des deux.",
    explanation: "Les adjectifs courts et courants — grand, petit, beau, jeune, vieux — se placent <b>devant</b> le nom : une <b>grande</b> maison. Les adjectifs de <b>couleur</b> se placent toujours <b>après</b> : une maison <b>bleue</b>. Les deux s'accordent au féminin singulier avec « maison ». L'erreur fréquente est « une maison grande bleue », qui aligne les deux adjectifs comme en anglais." }),

  // ── pronominalisation ──────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-026', chapterId: 'g9fr-transformation', subsection: 'pronominalisation', difficulty: 4,
    question: "Réécris la phrase entière en remplaçant les DEUX groupes soulignés par des pronoms : « Le professeur rend <u>les copies</u> <u>aux élèves</u>. »",
    answer: "Le professeur les leur rend.",
    alsoAccept: ["le professeur les leur rend", "Il les leur rend", "les leur rend"],
    hint: "Les deux pronoms se placent du même côté du verbe ; c'est leur ordre entre eux qui se décide, d'après leur fonction.",
    explanation: "« Les copies » est complément d'objet direct : il devient <b>les</b>. « Aux élèves » est complément d'objet indirect : il devient <b>leur</b>. Devant le verbe, à la troisième personne, le COD passe <b>avant</b> le COI : « les <b>leur</b> rend ». L'erreur fréquente est « leur les rend », qui applique l'ordre des première et deuxième personnes (« il <b>me les</b> rend »)." }),

  makeMCQ({ id: 'g9fr-ap1-027', chapterId: 'g9fr-transformation', subsection: 'pronominalisation', difficulty: 4,
    question: "Remplace « les affiches » par un pronom : « Il a collé les affiches devant la salle. » Quelle version est juste ?",
    options: [
      "Il les a collées devant la salle.",
      "Il les a collé devant la salle.",
      "Il leur a collées devant la salle.",
      "Il a les collées devant la salle."
    ],
    answer: "Il les a collées devant la salle.",
    hint: "Deux choses se décident : où se met le pronom par rapport à l'auxiliaire, et ce que cette place entraîne pour le participe.",
    explanation: "Le pronom complément se place <b>devant l'auxiliaire</b>, jamais entre l'auxiliaire et le participe : « il <b>les a</b> collées ». Et comme ce COD est désormais placé avant le verbe, le participe s'accorde avec lui : « les affiches » est féminin pluriel, donc <b>collées</b>. L'erreur fréquente est de bien placer le pronom mais d'oublier l'accord qu'il déclenche." }),

  // ── jonction_phrases ───────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-028', chapterId: 'g9fr-transformation', subsection: 'jonction_phrases', difficulty: 4,
    question: "Joins ces deux phrases en une seule, sans répéter le nom. Écris la phrase entière : « Nous avons visité une usine. Le directeur de cette usine est mauricien. »",
    answer: "Nous avons visité une usine dont le directeur est mauricien.",
    alsoAccept: ["nous avons visité une usine dont le directeur est mauricien"],
    hint: "Regarde par quelle préposition le nom à ne pas répéter est relié au reste de la deuxième phrase.",
    explanation: "Dans la seconde phrase, le nom répété est introduit par « de » : le directeur <b>de</b> cette usine. Le pronom relatif qui contient déjà ce « de » est <b>dont</b>. L'erreur fréquente est double : écrire « une usine <b>que</b> le directeur est mauricien », alors que « que » remplace un COD, ou écrire « dont <b>son</b> directeur », qui répète une seconde fois l'idée de possession déjà portée par « dont »." }),

  makeMCQ({ id: 'g9fr-ap1-029', chapterId: 'g9fr-transformation', subsection: 'jonction_phrases', difficulty: 4,
    question: "Joins ces deux phrases en une seule, sans employer « et » : « La pluie tombait sans arrêt. Le match a été reporté à samedi. »",
    options: [
      "Comme la pluie tombait sans arrêt, le match a été reporté à samedi.",
      "La pluie tombait sans arrêt, car le match a été reporté à samedi.",
      "Bien que la pluie tombait sans arrêt, le match a été reporté à samedi.",
      "La pluie tombait sans arrêt pour que le match soit reporté à samedi."
    ],
    answer: "Comme la pluie tombait sans arrêt, le match a été reporté à samedi.",
    hint: "Une des deux phrases explique l'autre : vérifie d'abord dans quel sens, puis quel type de lien le dit.",
    explanation: "La pluie est la <b>cause</b>, le report est l'effet : il faut une conjonction de cause placée en tête, <b>comme</b>. La deuxième version inverse le rapport et fait de la pluie la conséquence du report. « Bien que » exprimerait une concession — et demanderait le subjonctif. « Pour que » exprimerait un but, comme si la pluie avait tombé exprès pour faire reporter le match." }),

  // ── temps_verbaux ──────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-030', chapterId: 'g9fr-transformation', subsection: 'temps_verbaux', difficulty: 4,
    question: "Réécris ce passage au passé composé. Écris la phrase entière : « Elle ouvrit la fenêtre et regarda la pluie tomber. »",
    answer: "Elle a ouvert la fenêtre et a regardé la pluie tomber.",
    alsoAccept: [
      "elle a ouvert la fenêtre et a regardé la pluie tomber",
      "Elle a ouvert la fenêtre et elle a regardé la pluie tomber",
      "Elle a ouvert la fenêtre et regardé la pluie tomber"
    ],
    hint: "Les deux verbes conjugués changent, et l'un des deux participes passés ne se forme pas comme on l'attendrait.",
    explanation: "Le passé simple se remplace par le passé composé, formé de l'auxiliaire <b>avoir</b> au présent et du participe passé. « Ouvrir » a un participe <b>irrégulier</b> : <b>ouvert</b>, et non « ouvri ». « Regarder », verbe du premier groupe, donne régulièrement <b>regardé</b>. L'erreur fréquente est de ne transformer que le premier verbe et de laisser « regarda » au passé simple." }),

  makeMCQ({ id: 'g9fr-ap1-031', chapterId: 'g9fr-transformation', subsection: 'temps_verbaux', difficulty: 4,
    question: "Réécris au passé, en mettant le verbe introducteur au passé composé : « Il dit qu'il viendra dès qu'il aura fini son travail. »",
    options: [
      "Il a dit qu'il viendrait dès qu'il aurait fini son travail.",
      "Il a dit qu'il viendra dès qu'il aurait fini son travail.",
      "Il a dit qu'il viendrait dès qu'il a fini son travail.",
      "Il a dit qu'il serait venu dès qu'il aurait fini son travail."
    ],
    answer: "Il a dit qu'il viendrait dès qu'il aurait fini son travail.",
    hint: "Quand le verbe introducteur passe au passé, tous les verbes qui dépendent de lui bougent, pas seulement le premier.",
    explanation: "C'est la <b>concordance des temps</b>. Le futur simple de la subordonnée devient un <b>conditionnel présent</b> (viendra → <b>viendrait</b>), et le futur antérieur devient un <b>conditionnel passé</b> (aura fini → <b>aurait fini</b>). L'erreur fréquente est de n'en transformer qu'un des deux : une phrase où « viendra » côtoie « aurait fini » mélange deux systèmes de temps." }),

  // ── genre_nombre ───────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-032', chapterId: 'g9fr-transformation', subsection: 'genre_nombre', difficulty: 4,
    question: "Mets toute la phrase au féminin. Écris-la en entier : « Ce vieil acteur est devenu un rédacteur célèbre. »",
    answer: "Cette vieille actrice est devenue une rédactrice célèbre.",
    alsoAccept: ["cette vieille actrice est devenue une rédactrice célèbre"],
    hint: "Cinq mots au moins changent : pense au déterminant démonstratif, à l'adjectif placé devant, aux deux noms et au participe.",
    explanation: "Le démonstratif « ce » devient <b>cette</b>. L'adjectif « vieil », forme masculine employée devant une voyelle, a pour féminin <b>vieille</b>. Les noms en <b>-teur</b> font leur féminin en <b>-trice</b> : acteur → <b>actrice</b>, rédacteur → <b>rédactrice</b>. Enfin le participe « devenu », employé avec être, s'accorde avec le sujet : <b>devenue</b>. L'erreur fréquente est d'oublier le participe, parce qu'il ne touche pas directement les noms transformés." }),

  makeMCQ({ id: 'g9fr-ap1-033', chapterId: 'g9fr-transformation', subsection: 'genre_nombre', difficulty: 4,
    question: "Mets cette phrase au pluriel : « Ce timbre-poste est un chef-d'œuvre. » Quelle version est juste ?",
    options: [
      "Ces timbres-poste sont des chefs-d'œuvre.",
      "Ces timbres-postes sont des chefs-d'œuvres.",
      "Ces timbre-postes sont des chef-d'œuvres.",
      "Ces timbres-poste sont des chef-d'œuvre."
    ],
    answer: "Ces timbres-poste sont des chefs-d'œuvre.",
    hint: "Dans un nom composé, tous les éléments ne prennent pas la marque du pluriel : demande-toi ce que chacun désigne vraiment.",
    explanation: "Un <b>timbre-poste</b> est un timbre « pour la poste » : seul « timbre » se met au pluriel, car « poste » reste un complément au singulier. Un <b>chef-d'œuvre</b> est un chef « d'œuvre » : seul « chef » est le nom principal, et « d'œuvre » reste invariable. L'erreur fréquente est d'ajouter un « s » partout, par symétrie : les deux éléments d'un nom composé n'ont presque jamais le même statut." }),

  // ── voix_passive ───────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-034', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 4,
    question: "Mets cette phrase à la voix passive, sans changer son temps. Écris-la en entier : « Les élèves de Grade 9 ont planté ces filaos. »",
    answer: "Ces filaos ont été plantés par les élèves de Grade 9.",
    alsoAccept: ["ces filaos ont été plantés par les élèves de grade 9"],
    hint: "Trois choses se vérifient : quel groupe devient sujet, quel auxiliaire apparaît, et comment le participe s'accorde ensuite.",
    explanation: "Le complément d'objet direct « ces filaos » devient <b>sujet</b>, et l'ancien sujet devient complément d'agent introduit par « par ». Le temps ne change pas : le passé composé actif « ont planté » donne le passé composé passif <b>ont été plantés</b>, avec l'auxiliaire être au passé composé. Le participe s'accorde alors avec le nouveau sujet, masculin pluriel : plantés. L'erreur fréquente est d'écrire « sont plantés », qui ferait passer la phrase au présent." }),

  makeMCQ({ id: 'g9fr-ap1-035', chapterId: 'g9fr-transformation', subsection: 'voix_passive', difficulty: 4,
    question: "Mets cette phrase à la voix passive : « On a réparé la toiture après le cyclone. » Quelle version est juste ?",
    options: [
      "La toiture a été réparée après le cyclone.",
      "La toiture a été réparé après le cyclone.",
      "La toiture était réparée après le cyclone.",
      "La toiture a été réparée par on après le cyclone."
    ],
    answer: "La toiture a été réparée après le cyclone.",
    hint: "Ce sujet-là ne peut pas devenir complément d'agent ; vérifie ensuite que le temps n'a pas bougé et que le participe s'accorde.",
    explanation: "Quand le sujet actif est <b>on</b>, le passif se construit <b>sans complément d'agent</b> : « par on » n'existe pas en français. Le temps est conservé — passé composé actif « a réparé » → passé composé passif <b>a été réparée</b> — et le participe s'accorde avec le nouveau sujet « la toiture », féminin singulier. L'erreur fréquente est « était réparée », un imparfait qui décrirait un état au lieu de l'action." }),

  // ── interrogation ──────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-036', chapterId: 'g9fr-transformation', subsection: 'interrogation', difficulty: 4,
    question: "Pose la question par inversion, en gardant le même sens. Écris la question entière : « Madame Bhujun corrige les copies le soir. »",
    answer: "Madame Bhujun corrige-t-elle les copies le soir ?",
    alsoAccept: ["madame bhujun corrige-t-elle les copies le soir"],
    hint: "Le sujet est un nom, pas un pronom : l'inversion ne peut donc pas se faire directement, et quelque chose doit apparaître après le verbe.",
    explanation: "Avec un sujet <b>nominal</b>, on emploie l'inversion complexe : le nom reste devant le verbe et un pronom le reprend après, relié par des traits d'union — « Madame Bhujun corrige-<b>t-elle</b> ». Le <b>t</b> intercalaire s'ajoute parce que le verbe se termine par une voyelle et que le pronom en commence une. L'erreur fréquente est « Corrige Madame Bhujun les copies ? », qui déplace le nom lui-même." }),

  makeMCQ({ id: 'g9fr-ap1-037', chapterId: 'g9fr-transformation', subsection: 'interrogation', difficulty: 4,
    question: "Pose la question correspondante, à la fois négative et par inversion : « Tu n'as pas encore rendu ton livre. »",
    options: [
      "N'as-tu pas encore rendu ton livre ?",
      "As-tu pas encore rendu ton livre ?",
      "Ne as-tu pas encore rendu ton livre ?",
      "N'as-tu encore pas rendu ton livre ?"
    ],
    answer: "N'as-tu pas encore rendu ton livre ?",
    hint: "Deux éléments encadrent le verbe à la forme négative ; l'inversion se loge entre eux et ne les déplace pas.",
    explanation: "Les deux transformations se combinent. L'inversion soude le pronom au verbe conjugué : « as-tu ». La négation encadre ce bloc : <b>ne</b> devant, élidé en <b>n'</b> devant la voyelle, et <b>pas</b> après. On obtient « <b>N'as-tu pas</b> encore rendu ». L'erreur fréquente est d'oublier le « ne », comme à l'oral, ou de ne pas l'élider devant « as »." }),

  // ── changement_personne ────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-038', chapterId: 'g9fr-transformation', subsection: 'changement_personne', difficulty: 4,
    question: "Réécris à la première personne du pluriel. Écris la phrase entière : « Tu dois finir ton exercice avant de sortir de ta classe. »",
    answer: "Nous devons finir notre exercice avant de sortir de notre classe.",
    alsoAccept: ["nous devons finir notre exercice avant de sortir de notre classe"],
    hint: "Le verbe conjugué n'est pas le seul mot à changer : suis dans toute la phrase chaque mot qui renvoie à la personne.",
    explanation: "Le changement de personne touche quatre mots, pas un seul : le pronom sujet « tu » devient <b>nous</b>, le verbe s'accorde (<b>devons</b>), et les <b>deux</b> déterminants possessifs suivent — « ton exercice » devient <b>notre</b> exercice, « ta classe » devient <b>notre</b> classe. Le verbe « finir » reste à l'infinitif après « devons ». L'erreur fréquente est de changer le verbe et d'oublier le second possessif, plus loin dans la phrase." }),

  // ═══════════════════════════════════════════════════════════════════════
  //  g9fr-formation-mots  ·  g9fr-ap1-039 à 057
  // ═══════════════════════════════════════════════════════════════════════

  // ── nominalisation ─────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-039', chapterId: 'g9fr-formation-mots', subsection: 'nominalisation', difficulty: 4,
    question: "Complète avec un NOM formé sur le verbe « accueillir » : « Le comité a soigné l'.......... des visiteurs venus de Rodrigues. »",
    answer: "accueil", alsoAccept: ["l'accueil"],
    hint: "L'article élidé « l' » est déjà écrit devant le blanc : cela t'indique la catégorie de mot attendue, pas seulement sa famille.",
    explanation: "Le nom formé sur « accueillir » est <b>accueil</b>, sans suffixe visible. L'erreur fréquente est d'inventer « accueillement », qui n'existe pas, ou de laisser l'infinitif « accueillir » : après l'article « l' », la case ne peut recevoir qu'un nom. Même formation sans suffixe : travailler → le travail, appeler → l'appel." }),

  makeText({ id: 'g9fr-ap1-040', chapterId: 'g9fr-formation-mots', subsection: 'nominalisation', difficulty: 4,
    question: "Complète avec un NOM formé sur l'adjectif « lent » : « La .......... du trafic entre Phoenix et Port-Louis décourage beaucoup d'automobilistes. »",
    answer: "lenteur", alsoAccept: ["la lenteur"],
    hint: "L'article « La » impose à la fois la catégorie du mot et son genre : le mot de la famille que tu écris doit convenir aux deux.",
    explanation: "<b>Lenteur</b> est le nom de qualité formé sur « lent » avec le suffixe <b>-eur</b>. L'erreur fréquente est « lentement », qui est un adverbe et ne peut pas suivre un article : on ne dit pas « la lentement ». La case demande un nom féminin, sujet du verbe « décourage ». Même formation : doux → douceur, long → longueur, large → largeur." }),

  makeMCQ({ id: 'g9fr-ap1-041', chapterId: 'g9fr-formation-mots', subsection: 'nominalisation', difficulty: 4,
    question: "Complète : « Après trois mois de travaux, la .......... du pont de Grand-Baie a été achevée. » Quel mot formé sur « construire » remplit cette case ?",
    options: ["construction", "constructeur", "constructive", "constructible"],
    answer: "construction",
    hint: "L'article féminin « la » et le participe « achevée » disent ensemble quelle catégorie de mot et quel genre la case réclame.",
    explanation: "La case est celle d'un <b>nom féminin</b> désignant une action : <b>construction</b> (suffixe -tion). « Constructeur » est un nom, mais masculin, et il désigne la personne, non le travail. « Constructive » et « constructible » sont des adjectifs : ils ne peuvent pas suivre directement « la » ni être le sujet de « a été achevée »." }),

  makeMCQ({ id: 'g9fr-ap1-042', chapterId: 'g9fr-formation-mots', subsection: 'nominalisation', difficulty: 4,
    question: "Complète : « L'.......... de ce nouveau logiciel a pris toute la matinée. » Quel mot formé sur « installer » remplit cette case ?",
    options: ["installation", "installateur", "installement", "installatoire"],
    answer: "installation",
    hint: "Deux de ces mots n'existent pas ; entre les deux qui restent, regarde si la phrase parle de quelqu'un ou de ce qui a pris la matinée.",
    explanation: "Le nom d'<b>action</b> formé sur « installer » est <b>installation</b> (suffixe -tion) : c'est bien l'opération qui a duré toute la matinée. « Installateur » existe, mais nomme la <b>personne</b> qui installe, et un ouvrier ne « prend pas toute la matinée ». « Installement » et « installatoire » n'existent pas. L'erreur fréquente est de choisir le nom de personne quand la phrase parle d'une action." }),

  // ── formation_adjectif ─────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-043', chapterId: 'g9fr-formation-mots', subsection: 'formation_adjectif', difficulty: 4,
    question: "Complète avec un ADJECTIF formé sur le nom « montagne » : « Le sentier .......... du Pouce est interdit aux enfants qui marchent seuls. »",
    answer: "montagneux", alsoAccept: ["montagneux du Pouce"],
    hint: "La case suit immédiatement un nom masculin singulier : le mot que tu formes doit s'accorder avec lui.",
    explanation: "L'adjectif formé sur « montagne » est <b>montagneux</b> (suffixe -eux), accordé ici au masculin singulier avec « sentier ». L'erreur fréquente est de laisser le nom tel quel (« le sentier montagne »), ou d'écrire « montagnard », qui qualifie une personne ou un village, pas un chemin. Même formation : orage → orageux, courage → courageux." }),

  makeText({ id: 'g9fr-ap1-044', chapterId: 'g9fr-formation-mots', subsection: 'formation_adjectif', difficulty: 4,
    question: "Complète avec un ADJECTIF formé sur le nom « orage » : « Les nuits .......... de février ont privé le village d'électricité pendant deux jours. »",
    answer: "orageuses", alsoAccept: ["orageuses de février"],
    hint: "Le nom qui précède la case est féminin pluriel : la forme du dictionnaire ne peut donc pas être recopiée telle quelle.",
    explanation: "L'adjectif formé sur « orage » est « orageux » (suffixe -eux). Accordé avec « les nuits », féminin pluriel, il devient <b>orageuses</b> : le suffixe -eux fait son féminin en <b>-euse</b>, puis prend le « s » du pluriel. L'erreur fréquente est d'écrire « orageux », la forme du dictionnaire, en oubliant que former un mot et l'accorder sont deux opérations, pas une seule." }),

  makeMCQ({ id: 'g9fr-ap1-045', chapterId: 'g9fr-formation-mots', subsection: 'formation_adjectif', difficulty: 4,
    question: "Complète : « Une décision .......... a été prise hier soir par le comité de village. » Quel mot formé sur « surprendre » remplit cette case ?",
    options: ["surprenante", "surprenant", "surprise", "surprenamment"],
    answer: "surprenante",
    hint: "Le nom qui précède commande le genre ; vérifie aussi lequel de ces mots peut qualifier un nom.",
    explanation: "L'adjectif formé sur « surprendre » est « surprenant », qu'il faut accorder au féminin avec « décision » : <b>surprenante</b>. « Surprenant » serait masculin et ne peut pas qualifier « une décision ». « Surprise » est un nom, ou un participe qui donnerait un tout autre sens. « Surprenamment » n'existe pas. L'erreur fréquente est de former le mot juste et de négliger l'accord." }),

  // ── formation_adverbe ──────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-046', chapterId: 'g9fr-formation-mots', subsection: 'formation_adverbe', difficulty: 4,
    question: "Complète avec un ADVERBE formé sur l'adjectif « patient » : « Le vieux pêcheur de Trou-d'Eau-Douce répare ses filets .........., sans jamais lever les yeux. »",
    answer: "patiemment",
    hint: "Regarde la terminaison de l'adjectif donné avant d'ajouter le suffixe habituel : elle n'est pas de celles qui se comportent normalement.",
    explanation: "Les adjectifs terminés par <b>-ent</b> forment leur adverbe en <b>-emment</b> : patient → <b>patiemment</b>, prudent → prudemment, évident → évidemment. L'erreur fréquente est « patientement », construite sur le féminin de l'adjectif comme pour « lente → lentement ». Cette règle ne vaut que pour les adjectifs qui ne se terminent pas par -ent ou -ant." }),

  makeText({ id: 'g9fr-ap1-047', chapterId: 'g9fr-formation-mots', subsection: 'formation_adverbe', difficulty: 4,
    question: "Complète avec un ADVERBE formé sur l'adjectif « vrai » : « Ce que Devi raconte est .......... arrivé : ses voisins l'ont vu de leur cour. »",
    answer: "vraiment",
    hint: "Forme l'adverbe à partir du féminin de l'adjectif, puis relis à voix haute la syllabe du milieu.",
    explanation: "L'adverbe se forme normalement sur le féminin de l'adjectif (lente → lentement), mais quand ce féminin se termine par une voyelle suivie d'un « e » muet, ce « e » disparaît : vraie → <b>vraiment</b>, absolue → absolument, polie → poliment. L'erreur fréquente est d'écrire « vraiement », en appliquant la règle générale sans entendre que la syllabe supplémentaire ne se prononce pas." }),

  makeMCQ({ id: 'g9fr-ap1-048', chapterId: 'g9fr-formation-mots', subsection: 'formation_adverbe', difficulty: 4,
    question: "Complète : « Les résultats ont été annoncés .......... sur le site du collège. » Quel mot formé sur « officiel » remplit cette case ?",
    options: ["officiellement", "officielle", "officialisé", "officialiser"],
    answer: "officiellement",
    hint: "Le blanc suit un participe passé et ne qualifie aucun nom : cela décide de la catégorie du mot à écrire.",
    explanation: "La case demande un <b>adverbe</b>, puisqu'elle précise la manière dont les résultats ont été annoncés : <b>officiellement</b>, formé sur le féminin « officielle » + le suffixe <b>-ment</b>. « Officielle » est un adjectif et devrait qualifier un nom. « Officialiser » est un infinitif et « officialisé » un participe : ni l'un ni l'autre ne peut suivre « ont été annoncés »." }),

  // ── noms_de_personne ───────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-049', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_personne', difficulty: 4,
    question: "Complète avec le NOM DE PERSONNE formé sur « recherche » : « Une .......... de l'université de Réduit a présenté ses travaux sur les coraux. »",
    answer: "chercheuse", alsoAccept: ["une chercheuse"],
    hint: "L'article « Une » impose le genre, et le verbe « a présenté » impose que le mot désigne quelqu'un, non une activité.",
    explanation: "Le nom de personne de cette famille est « chercheur » au masculin, <b>chercheuse</b> au féminin, exigé ici par l'article « Une ». Deux erreurs fréquentes se croisent : recopier « recherche », qui nomme l'activité et non la personne, et écrire « chercheur », correct comme nom de personne mais incompatible avec l'article féminin qui précède." }),

  makeText({ id: 'g9fr-ap1-050', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_personne', difficulty: 4,
    question: "Complète avec le NOM DE PERSONNE formé sur « boulangerie » : « Le .......... de Curepipe ouvre sa porte à quatre heures du matin. »",
    answer: "boulanger", alsoAccept: ["le boulanger"],
    hint: "Le lieu et la personne appartiennent à la même famille de mots ; l'article et le verbe disent lequel des deux la case demande.",
    explanation: "<b>Boulanger</b> nomme la personne, « boulangerie » le lieu où elle travaille. Ici l'article masculin « Le » et le verbe « ouvre sa porte » désignent quelqu'un qui agit, donc la personne. L'erreur fréquente est de recopier le mot donné : « le boulangerie » est impossible, le nom étant féminin. Les noms de lieux en <b>-erie</b> se forment presque toujours sur un nom de personne, et non l'inverse." }),

  makeMCQ({ id: 'g9fr-ap1-051', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_personne', difficulty: 4,
    question: "Complète : « Le .......... a réparé la grille du jardin en moins d'une heure. » Quel mot formé sur « forge » remplit cette case ?",
    options: ["forgeron", "forgerie", "forgeage", "forgement"],
    answer: "forgeron",
    hint: "Trois de ces mots nommeraient un lieu, une opération ou rien du tout ; la phrase, elle, parle de quelqu'un qui agit.",
    explanation: "Le nom de personne formé sur « forge » est <b>forgeron</b> : c'est lui qui « a réparé » la grille. « Forgerie » désignerait un atelier, « forgeage » l'opération elle-même, et « forgement » n'existe pas. L'erreur fréquente est de choisir le nom de l'action quand le verbe de la phrase réclame un être humain comme sujet." }),

  // ── formation_verbe ────────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-052', chapterId: 'g9fr-formation-mots', subsection: 'formation_verbe', difficulty: 4,
    question: "Complète avec un VERBE formé sur l'adjectif « large », à la forme que la phrase impose : « La municipalité va .......... la route qui mène à la plage de Flic-en-Flac. »",
    answer: "élargir", alsoAccept: ["l'élargir"],
    hint: "Après « va », la case ne peut recevoir qu'une seule forme du verbe ; celui-ci se forme avec un préfixe autant qu'avec un suffixe.",
    explanation: "Le verbe formé sur « large » est <b>élargir</b> : préfixe <b>é-</b> et suffixe <b>-ir</b>. Après le semi-auxiliaire « va », la case demande un <b>infinitif</b>. L'erreur fréquente est d'écrire « largir » ou « larger », qui n'existent ni l'un ni l'autre : beaucoup de verbes tirés d'adjectifs prennent un préfixe. Même formation : long → allonger, court → raccourcir, grand → agrandir." }),

  makeText({ id: 'g9fr-ap1-053', chapterId: 'g9fr-formation-mots', subsection: 'formation_verbe', difficulty: 4,
    question: "Complète avec un VERBE formé sur l'adjectif « clair », à la forme que la phrase impose : « Le professeur a .......... ce point du cours avec un schéma au tableau. »",
    answer: "clarifié", alsoAccept: ["éclairci", "eclairci"],
    hint: "Après l'auxiliaire « a », une seule forme du verbe est possible ; plusieurs verbes de cette famille peuvent convenir.",
    explanation: "La case suit l'auxiliaire « a » : elle demande un <b>participe passé</b>. Le verbe formé sur « clair » est « clarifier » → a <b>clarifié</b>, ou « éclaircir » → a éclairci, tous deux acceptés. L'erreur fréquente est d'écrire l'adjectif lui-même : « a clair » est impossible, car un adjectif ne se place jamais après un auxiliaire seul." }),

  makeMCQ({ id: 'g9fr-ap1-054', chapterId: 'g9fr-formation-mots', subsection: 'formation_verbe', difficulty: 4,
    question: "Complète : « Il faut .......... cette liste avant vendredi, sinon les inscriptions seront refusées. » Quel mot formé sur « court » remplit cette case ?",
    options: ["raccourcir", "raccourcissement", "raccourci", "courtiser"],
    answer: "raccourcir",
    hint: "Après « il faut », une seule catégorie de mot est possible ; vérifie aussi que le mot choisi vient bien de l'adjectif donné.",
    explanation: "Après « il faut », la case demande un <b>infinitif</b> : <b>raccourcir</b>, formé sur « court » avec le préfixe <b>r-</b> et le suffixe <b>-ir</b>. « Raccourcissement » est le nom de l'action et « raccourci » un participe ou un nom : ni l'un ni l'autre ne suit « il faut ». « Courtiser » appartient à une tout autre famille et signifie faire la cour à quelqu'un." }),

  // ── noms_de_quantite ───────────────────────────────────────────────────

  makeText({ id: 'g9fr-ap1-055', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_quantite', difficulty: 4,
    question: "Complète avec un NOM DE QUANTITÉ formé sur « dix » : « Une .......... de pirogues attendait déjà au large de Trou-d'Eau-Douce. »",
    answer: "dizaine", alsoAccept: ["une dizaine"],
    hint: "L'article « Une » et la préposition « de » encadrent la case : ensemble, ils excluent une catégorie de mot.",
    explanation: "Le nom de quantité formé sur « dix » est <b>dizaine</b> (suffixe <b>-aine</b>), qui exprime une quantité approximative : environ dix. L'erreur fréquente est d'écrire le nombre lui-même : « une dix de pirogues » est impossible, car la structure « une … de » réclame un nom. Même formation : douze → douzaine, vingt → vingtaine, cent → centaine." }),

  makeText({ id: 'g9fr-ap1-056', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_quantite', difficulty: 4,
    question: "Complète avec un NOM DE QUANTITÉ formé sur « cent » : « Des .......... de spectateurs ont rempli le stade Anjalay samedi soir. »",
    answer: "centaines", alsoAccept: ["des centaines"],
    hint: "Le déterminant « Des » ne dit pas seulement qu'il faut un nom : il impose aussi une marque au mot que tu formes.",
    explanation: "Le nom de quantité formé sur « cent » est « centaine » (suffixe <b>-aine</b>), qui se met ici au pluriel après « Des » : <b>centaines</b>. L'erreur fréquente est « des cents », qui garde le nombre au lieu du nom de quantité, ou « des centaine », qui forme bien le mot mais oublie l'accord. Former le mot et l'accorder sont deux étapes distinctes." }),

  makeMCQ({ id: 'g9fr-ap1-057', chapterId: 'g9fr-formation-mots', subsection: 'noms_de_quantite', difficulty: 4,
    question: "Complète : « La .......... de la salle est de deux cents places, pas une de plus. » Quel mot formé sur « contenir » remplit cette case ?",
    options: ["contenance", "contenant", "contenu", "contention"],
    answer: "contenance",
    hint: "Les quatre mots viennent du même verbe : lis d'abord ce que la phrase mesure, puis choisis.",
    explanation: "<b>Contenance</b> désigne la quantité qu'un espace ou un récipient peut recevoir : c'est ce que « deux cents places » mesure. « Contenu » désigne ce qui se trouve dedans, « contenant » le récipient lui-même, et « contention » l'action de retenir quelqu'un. L'erreur fréquente est « contenu », qui répondrait à la question « quoi ? » et non à la question « combien ? »." })

);

})();
