'use strict';
// Grade 8 Français — Core questions, all 5 chapters
// IDs: g8fr-co-001…, g8fr-eo-001…, g8fr-ce-001…, g8fr-ee-001…, g8fr-litterature-001…

STATIC_QUESTIONS.push(

  // ── Compréhension orale — schema_communication ───────────────────────────

  makeMCQ({ id:'g8fr-co-001', chapterId:'g8fr-co', difficulty:1, subsection:'schema_communication',
    question:'Dans le schéma de communication, l\'émetteur est :',
    options:['Celui qui envoie le message','Celui qui reçoit le message','Le support du message','Le lieu de la communication'],
    answer:'Celui qui envoie le message',
    hint:'L\'émetteur émet — il envoie le message.',
    explanation:'L\'<b>émetteur</b> est celui qui produit et envoie le message. Le <b>récepteur</b> est celui qui reçoit. Ce sont les deux pôles essentiels du schéma de communication.' }),

  makeMCQ({ id:'g8fr-co-002', chapterId:'g8fr-co', difficulty:1, subsection:'schema_communication',
    question:'Le canal de communication est :',
    options:['Le moyen utilisé pour transmettre le message','La langue utilisée','L\'intention de l\'émetteur','La réaction du récepteur'],
    answer:'Le moyen utilisé pour transmettre le message',
    hint:'Le canal peut être la voix, le téléphone, la radio, etc.',
    explanation:'Le <b>canal</b> est le support physique par lequel passe le message : la voix (communication directe), le téléphone, la radio, la télévision, Internet.' }),

  makeMCQ({ id:'g8fr-co-003', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Le référent dans le schéma de communication désigne :',
    options:['Le sujet ou le contexte dont parle le message','La langue utilisée','L\'intention du locuteur','Le bruit de fond'],
    answer:'Le sujet ou le contexte dont parle le message',
    hint:'C\'est le "de quoi" on parle.',
    explanation:'Le <b>référent</b> est le sujet, la réalité dont parle le message. Exemple : si on parle du cyclone Batsirai, le référent est ce cyclone.' }),

  makeMCQ({ id:'g8fr-co-004', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Dans un schéma de communication, le "code" désigne :',
    options:['La langue ou le système de signes utilisé pour communiquer','Le secret du message','La durée du message','La qualité du son'],
    answer:'La langue ou le système de signes utilisé pour communiquer',
    hint:'Pour se comprendre, émetteur et récepteur doivent partager le même code.',
    explanation:'Le <b>code</b> est le système de signes partagé entre l\'émetteur et le récepteur — généralement la langue parlée ou écrite, mais aussi les gestes, les symboles.' }),

  // ── Compréhension orale — types_textes_oral ──────────────────────────────

  makeMCQ({ id:'g8fr-co-005', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Dans un débat, comment reconnaît-on que plusieurs locuteurs participent ?',
    options:['Chaque locuteur prend la parole à tour de rôle et défend un point de vue','Un seul locuteur parle du début à la fin','Les participants écrivent leurs opinions','Il n\'y a qu\'une seule question'],
    answer:'Chaque locuteur prend la parole à tour de rôle et défend un point de vue',
    hint:'Un débat implique des échanges et des positions différentes.',
    explanation:'Dans un <b>débat</b>, plusieurs locuteurs échangent des arguments à tour de rôle. Chacun défend son point de vue en essayant de convaincre les autres.' }),

  makeMCQ({ id:'g8fr-co-006', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Une conférence est différente d\'un débat car :',
    options:['Un seul locuteur expert présente un sujet sans nécessairement de contradiction immédiate','Plusieurs personnes se contredisent','Elle n\'a pas de public','Elle traite uniquement de sujets scientifiques'],
    answer:'Un seul locuteur expert présente un sujet sans nécessairement de contradiction immédiate',
    hint:'Dans une conférence, un expert expose ses connaissances.',
    explanation:'Une <b>conférence</b> est présentée par un expert ou un spécialiste qui expose ses connaissances sur un sujet. Le public écoute, contrairement au débat où plusieurs personnes s\'affrontent.' }),

  // ── Compréhension orale — sens_contexte ──────────────────────────────────

  makeMCQ({ id:'g8fr-co-007', chapterId:'g8fr-co', difficulty:2, subsection:'sens_contexte',
    question:'Pour bien comprendre un texte oral, il faut tenir compte :',
    options:['Du contexte, du ton et des informations données','Uniquement des mots difficiles','Seulement du début du message','Du nombre de phrases'],
    answer:'Du contexte, du ton et des informations données',
    hint:'Le contexte donne du sens aux mots que l\'on entend.',
    explanation:'La compréhension orale nécessite de tenir compte du <b>contexte</b> (situation de communication), du <b>ton</b> (sérieux, ironique, humoristique) et de toutes les informations transmises.' }),

  makeMCQ({ id:'g8fr-co-008', chapterId:'g8fr-co', difficulty:3, subsection:'sens_contexte',
    question:'Quand un locuteur dit "Bien sûr, ça se voit !" avec un ton moqueur, il exprime :',
    options:['De l\'ironie','De l\'admiration','De la tristesse','De la surprise'],
    answer:'De l\'ironie',
    hint:'L\'ironie, c\'est quand le ton contredit les mots.',
    explanation:'L\'<b>ironie</b> consiste à dire le contraire de ce qu\'on pense, souvent avec un ton moqueur. Le ton est crucial pour distinguer l\'ironie de l\'affirmation sincère.' }),

  makeMCQ({ id:'g8fr-co-009', chapterId:'g8fr-co', difficulty:3, subsection:'sens_contexte',
    question:'Pour suivre une discussion entre plusieurs locuteurs, il faut :',
    options:['Identifier qui parle, quel est son point de vue et comment les locuteurs réagissent','Mémoriser chaque mot dit','Parler en même temps','Prendre des notes en secret'],
    answer:'Identifier qui parle, quel est son point de vue et comment les locuteurs réagissent',
    hint:'On suit une discussion en identifiant les locuteurs et leurs positions.',
    explanation:'Pour suivre une <b>discussion à plusieurs</b>, on doit identifier : qui parle (l\'émetteur), quelle est sa position (son point de vue) et comment les autres réagissent (accord ou désaccord).' }),

  makeMCQ({ id:'g8fr-co-010', chapterId:'g8fr-co', difficulty:2, subsection:'schema_communication',
    question:'Que se passe-t-il lorsqu\'il y a un "bruit" dans la communication ?',
    options:['Le message est perturbé et peut être mal compris','La communication est plus efficace','Le récepteur parle plus fort','L\'émetteur change de sujet'],
    answer:'Le message est perturbé et peut être mal compris',
    hint:'Un "bruit" est tout ce qui perturbe la transmission du message.',
    explanation:'Un <b>bruit</b> (ou parasite) est tout élément qui perturbe la communication : bruit physique, différence de vocabulaire, manque d\'attention. Il peut causer des malentendus.' }),

  makeMCQ({ id:'g8fr-co-011', chapterId:'g8fr-co', difficulty:2, subsection:'types_textes_oral',
    question:'Un reportage radio sur un événement est un texte oral de type :',
    options:['Informatif et descriptif','Injonctif','Argumentatif seulement','Poétique'],
    answer:'Informatif et descriptif',
    hint:'Un reportage informe sur des faits et décrit la situation.',
    explanation:'Un <b>reportage</b> combine le type <b>informatif</b> (il rapporte des faits) et <b>descriptif</b> (il décrit l\'ambiance, les personnes, les lieux).' }),

  makeMCQ({ id:'g8fr-co-012', chapterId:'g8fr-co', difficulty:3, subsection:'sens_contexte',
    question:'Différencier le sens littéral et le sens figuré d\'une expression signifie :',
    options:['Comprendre si l\'expression est prise au sens propre ou au sens imagé','Lire entre les lignes uniquement','Compter les syllabes','Trouver la rime'],
    answer:'Comprendre si l\'expression est prise au sens propre ou au sens imagé',
    hint:'"Avoir le cafard" au sens figuré signifie être triste — pas qu\'un insecte est là.',
    explanation:'Le <b>sens littéral</b> (propre) = le sens direct des mots. Le <b>sens figuré</b> = le sens imagé, métaphorique. Ex. : "Casser les pieds" (sens figuré = ennuyer, pas casser vraiment).' }),

  // ── Expression orale — lecture_expressive ────────────────────────────────

  makeMCQ({ id:'g8fr-eo-001', chapterId:'g8fr-eo', difficulty:1, subsection:'lecture_expressive',
    question:'Pour lire un texte de théâtre à voix haute avec expression, il faut :',
    options:['Adapter son ton au caractère du personnage qu\'on joue','Lire à la même vitesse tout au long','Ignorer la ponctuation','Ne pas bouger du tout'],
    answer:'Adapter son ton au caractère du personnage qu\'on joue',
    hint:'Un personnage méchant et un personnage joyeux ne parlent pas de la même façon.',
    explanation:'Lire un texte de théâtre avec expression implique d\'<b>adapter son ton</b> au personnage : un héros courageux parle avec assurance, un personnage triste avec une voix basse, etc.' }),

  makeMCQ({ id:'g8fr-eo-002', chapterId:'g8fr-eo', difficulty:2, subsection:'lecture_expressive',
    question:'Les didascalies dans un texte de théâtre sont :',
    options:['Des indications de mise en scène (gestes, décors, tons)','Les paroles des personnages','Le titre de la pièce','La morale de la pièce'],
    answer:'Des indications de mise en scène (gestes, décors, tons)',
    hint:'Ce sont les instructions de l\'auteur pour les acteurs et le metteur en scène.',
    explanation:'Les <b>didascalies</b> sont les indications que l\'auteur donne pour la mise en scène : comment le personnage doit parler, bouger, quels décors utiliser. Elles sont écrites en italique ou entre parenthèses.' }),

  makeMCQ({ id:'g8fr-eo-003', chapterId:'g8fr-eo', difficulty:2, subsection:'lecture_expressive',
    question:'Quel élément rend une lecture à voix haute plus convaincante ?',
    options:['Le contact visuel avec l\'auditoire, la gestuelle et l\'expression du visage','Lire le plus vite possible','Tenir son livre devant son visage','Parler à voix très basse'],
    answer:'Le contact visuel avec l\'auditoire, la gestuelle et l\'expression du visage',
    hint:'Une bonne présentation orale engage tout le corps, pas seulement la voix.',
    explanation:'Une lecture <b>convaincante</b> utilise le <b>contact visuel</b> (regarder l\'auditoire), la <b>gestuelle</b> (mouvements naturels des mains) et l\'<b>expression du visage</b> pour renforcer le message.' }),

  // ── Expression orale — conversation_multi ────────────────────────────────

  makeMCQ({ id:'g8fr-eo-004', chapterId:'g8fr-eo', difficulty:1, subsection:'conversation_multi',
    question:'Pour participer positivement à une conversation avec plusieurs interlocuteurs, il faut :',
    options:['Écouter avant de parler et attendre son tour','Parler sans s\'arrêter','Interrompre les autres dès qu\'on a une idée','Parler uniquement à son meilleur ami'],
    answer:'Écouter avant de parler et attendre son tour',
    hint:'Une bonne conversation implique d\'écouter autant que de parler.',
    explanation:'Dans une conversation à plusieurs, il est essentiel d\'<b>écouter activement</b> et d\'<b>attendre son tour</b> pour parler. Interrompre les autres est impoli et perturbe la communication.' }),

  makeMCQ({ id:'g8fr-eo-005', chapterId:'g8fr-eo', difficulty:2, subsection:'conversation_multi',
    question:'Pour traiter une problématique à l\'oral, quelle étape vient en premier ?',
    options:['Définir le problème et ses enjeux','Donner immédiatement une solution','Parler des sujets hors sujet','Terminer en remerciant'],
    answer:'Définir le problème et ses enjeux',
    hint:'Avant de résoudre un problème, il faut le comprendre.',
    explanation:'Traiter une <b>problématique</b> à l\'oral commence par <b>définir le problème</b> et ses enjeux, puis analyser les causes, enfin proposer des solutions argumentées.' }),

  makeMCQ({ id:'g8fr-eo-006', chapterId:'g8fr-eo', difficulty:3, subsection:'conversation_multi',
    question:'Pour exprimer son désaccord poliment à l\'oral, on peut dire :',
    options:['"Je comprends ton point de vue, cependant..."','"Tu as absolument tort !"','"C\'est ridicule."','"Je ne t\'écoute plus."'],
    answer:'"Je comprends ton point de vue, cependant..."',
    hint:'La politesse et le respect sont essentiels dans tout échange oral.',
    explanation:'Exprimer son <b>désaccord poliment</b> implique de reconnaître d\'abord la position de l\'autre ("Je comprends...") avant d\'introduire son propre point de vue ("cependant..."). Cela maintient un échange respectueux.' }),

  // ── Expression orale — lexique_varie ─────────────────────────────────────

  makeMCQ({ id:'g8fr-eo-007', chapterId:'g8fr-eo', difficulty:1, subsection:'lexique_varie',
    question:'Un vocabulaire varié et précis est utile à l\'oral car :',
    options:['Il permet de s\'exprimer avec exactitude et d\'être mieux compris','Il impressionne les professeurs uniquement','Il n\'est utile que dans les textes écrits','Il rend les phrases plus longues'],
    answer:'Il permet de s\'exprimer avec exactitude et d\'être mieux compris',
    hint:'Plus on connaît de mots, mieux on peut exprimer sa pensée.',
    explanation:'Un <b>vocabulaire riche et précis</b> permet d\'exprimer exactement ce qu\'on pense, de nuancer ses propos et d\'être mieux compris par son interlocuteur.' }),

  makeMCQ({ id:'g8fr-eo-008', chapterId:'g8fr-eo', difficulty:2, subsection:'lexique_varie',
    question:'Pour enrichir son vocabulaire, quelle méthode est la plus efficace ?',
    options:['Lire régulièrement et noter les mots nouveaux','Regarder la télévision uniquement','Éviter les textes difficiles','Utiliser toujours les mêmes mots'],
    answer:'Lire régulièrement et noter les mots nouveaux',
    hint:'La lecture est le meilleur moyen d\'acquérir du vocabulaire.',
    explanation:'<b>Lire régulièrement</b> expose à de nouveaux mots en contexte. <b>Noter les mots nouveaux</b> dans un carnet de vocabulaire et les réutiliser dans des phrases consolide l\'apprentissage.' }),

  makeMCQ({ id:'g8fr-eo-009', chapterId:'g8fr-eo', difficulty:2, subsection:'lexique_varie',
    question:'Quel registre de langue utilise-t-on avec un directeur d\'école ?',
    options:['Le registre soutenu','Le registre familier','Le registre argotique','Le registre vulgaire'],
    answer:'Le registre soutenu',
    hint:'On adapte son langage à la personne à qui on s\'adresse.',
    explanation:'Le <b>registre soutenu</b> est utilisé dans des situations formelles (avec un directeur, un médecin, lors d\'un exposé). Le registre <b>familier</b> est pour les amis et la famille.' }),

  makeMCQ({ id:'g8fr-eo-010', chapterId:'g8fr-eo', difficulty:3, subsection:'lexique_varie',
    question:'Quel est le terme précis pour désigner l\'ensemble des mots qu\'une personne connaît et utilise ?',
    options:['Son vocabulaire actif','Sa grammaire','Son orthographe','Sa syntaxe'],
    answer:'Son vocabulaire actif',
    hint:'C\'est l\'ensemble des mots qu\'on utilise réellement dans ses écrits et à l\'oral.',
    explanation:'Le <b>vocabulaire actif</b> désigne les mots qu\'une personne connaît et utilise effectivement. Le <b>vocabulaire passif</b> désigne les mots qu\'on comprend mais qu\'on n\'utilise pas spontanément.' }),

  makeMCQ({ id:'g8fr-eo-011', chapterId:'g8fr-eo', difficulty:2, subsection:'conversation_multi',
    question:'Dans un groupe de discussion, le modérateur a pour rôle de :',
    options:['Distribuer la parole et veiller au bon déroulement des échanges','Parler le plus longtemps','Décider qui a raison','Écrire les réponses au tableau'],
    answer:'Distribuer la parole et veiller au bon déroulement des échanges',
    hint:'Le modérateur est comme un arbitre de la conversation.',
    explanation:'Le <b>modérateur</b> (ou animateur) distribue la parole, recentre les débats sur le sujet, s\'assure que tout le monde peut s\'exprimer et que les échanges restent respectueux.' }),

  makeMCQ({ id:'g8fr-eo-012', chapterId:'g8fr-eo', difficulty:3, subsection:'lecture_expressive',
    question:'Lorsqu\'on lit un poème à voix haute, qu\'est-ce qu\'une "diérèse" ?',
    options:['La prononciation de deux voyelles normalement fusionnées en deux syllabes séparées','Une faute d\'orthographe','Un type de rime','Une pause en fin de vers'],
    answer:'La prononciation de deux voyelles normalement fusionnées en deux syllabes séparées',
    hint:'La diérèse rallonge un mot en séparant deux voyelles.',
    explanation:'La <b>diérèse</b> est la prononciation de deux voyelles voisines en deux syllabes (ex. : "lion" = li-on). Son contraire, la <b>synérèse</b>, les fusionne en une seule syllabe.' }),

  // ── Compréhension écrite — idee_implicite ────────────────────────────────

  makeMCQ({ id:'g8fr-ce-001', chapterId:'g8fr-ce', difficulty:2, subsection:'idee_implicite',
    question:'Une information implicite dans un texte est :',
    options:['Une information sous-entendue que le lecteur doit déduire','Une information clairement écrite','Le titre du texte','Les noms des personnages'],
    answer:'Une information sous-entendue que le lecteur doit déduire',
    hint:'"Implicite" = ce qui est dit sans être dit directement.',
    explanation:'Une information <b>implicite</b> n\'est pas dite directement : le lecteur doit la déduire à partir des indices du texte. Contrairement à l\'information <b>explicite</b> qui est clairement énoncée.' }),

  makeMCQ({ id:'g8fr-ce-002', chapterId:'g8fr-ce', difficulty:3, subsection:'idee_implicite',
    question:'Dans la phrase : "Il ferma doucement la porte et disparut dans la nuit", quelle information est implicite ?',
    options:['Le personnage veut partir discrètement sans se faire remarquer','Il fait chaud','La porte est en bois','Il est tard le matin'],
    answer:'Le personnage veut partir discrètement sans se faire remarquer',
    hint:'"Doucement" et "disparut dans la nuit" suggèrent une action secrète.',
    explanation:'La phrase ne dit pas que le personnage veut partir secrètement, mais les mots "doucement" et "disparut dans la nuit" le <b>sous-entendent</b>. C\'est une information implicite.' }),

  makeMCQ({ id:'g8fr-ce-003', chapterId:'g8fr-ce', difficulty:2, subsection:'idee_implicite',
    question:'Pour dégager l\'idée principale d\'un texte complexe, on peut :',
    options:['Lire chaque paragraphe, résumer sa phrase clé, puis trouver l\'idée commune','Lire uniquement les titres','Compter le nombre de mots par phrase','S\'arrêter au premier paragraphe'],
    answer:'Lire chaque paragraphe, résumer sa phrase clé, puis trouver l\'idée commune',
    hint:'Chaque paragraphe développe une idée partielle liée au tout.',
    explanation:'Une méthode efficace : lire chaque paragraphe, dégager sa <b>phrase clé</b>, puis chercher l\'idée qui les <b>relie toutes</b> — c\'est l\'idée principale du texte.' }),

  // ── Compréhension écrite — registres_langue ──────────────────────────────

  makeMCQ({ id:'g8fr-ce-004', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Quels sont les trois principaux registres de langue en français ?',
    options:['Soutenu, courant, familier','Écrit, oral, chanté','Long, court, moyen','Formel, informel, neutre'],
    answer:'Soutenu, courant, familier',
    hint:'On adapte son registre selon la situation et l\'interlocuteur.',
    explanation:'Les trois registres principaux : <b>soutenu</b> (situations formelles, textes littéraires), <b>courant</b> (la norme standard, ni trop formel ni trop familier), <b>familier</b> (conversations informelles, amis).' }),

  makeMCQ({ id:'g8fr-ce-005', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Dans quelle phrase le registre familier est-il utilisé ?',
    options:['"Y\'a pas de problème, c\'est bon !"','"Je n\'ai aucun problème, tout va bien."','"Permettez-moi de vous signaler que tout est en ordre."','"Il n\'existe aucune difficulté à ce sujet."'],
    answer:'"Y\'a pas de problème, c\'est bon !"',
    hint:'Le registre familier contient des élisions et des raccourcis.',
    explanation:'"Y\'a" (pour "il y a") et "c\'est bon" sont des marques du <b>registre familier</b>. Ce niveau de langue s\'utilise avec les amis, jamais dans un texte formel.' }),

  makeMCQ({ id:'g8fr-ce-006', chapterId:'g8fr-ce', difficulty:3, subsection:'registres_langue',
    question:'Identifier le registre de langue d\'un texte est utile pour :',
    options:['Comprendre le contexte, l\'intention de l\'auteur et la relation entre les personnages','Compter le nombre de paragraphes','Trouver les fautes d\'orthographe','Identifier les noms propres'],
    answer:'Comprendre le contexte, l\'intention de l\'auteur et la relation entre les personnages',
    hint:'Le registre de langue révèle des informations sur la situation et les locuteurs.',
    explanation:'Le <b>registre de langue</b> donne des indices précieux : un personnage qui parle en registre soutenu est peut-être cultivé ou dans une situation formelle ; le registre familier suggère une intimité entre les personnages.' }),

  // ── Compréhension écrite — analyse_texte ─────────────────────────────────

  makeMCQ({ id:'g8fr-ce-007', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Analyser un texte consiste à :',
    options:['Étudier sa structure, ses idées et les moyens utilisés par l\'auteur pour les exprimer','Copier le texte mot à mot','Traduire le texte en anglais','Dessiner les personnages'],
    answer:'Étudier sa structure, ses idées et les moyens utilisés par l\'auteur pour les exprimer',
    hint:'Analyser, c\'est aller au-delà de la compréhension de base.',
    explanation:'<b>Analyser un texte</b> implique d\'étudier : sa structure (organisation), ses idées (thèmes), les procédés stylistiques utilisés (métaphores, comparaisons, registre de langue).' }),

  makeMCQ({ id:'g8fr-ce-008', chapterId:'g8fr-ce', difficulty:3, subsection:'analyse_texte',
    question:'Une métaphore est une figure de style qui :',
    options:['Compare deux choses directement sans "comme" ni "tel que"','Utilise toujours le mot "comme" pour comparer','Décrit un son par un mot','Répète plusieurs fois le même son'],
    answer:'Compare deux choses directement sans "comme" ni "tel que"',
    hint:'"Il est un lion" est une métaphore ; "Il est courageux comme un lion" est une comparaison.',
    explanation:'La <b>métaphore</b> établit une comparaison implicite sans outil comparatif ("comme", "tel que"). Ex. : "La vie est un voyage." La <b>comparaison</b>, elle, utilise un outil : "La vie est <b>comme</b> un voyage."' }),

  makeMCQ({ id:'g8fr-ce-009', chapterId:'g8fr-ce', difficulty:2, subsection:'analyse_texte',
    question:'Comparer deux textes sur le même sujet consiste à :',
    options:['Identifier leurs ressemblances et leurs différences dans le traitement du sujet','Les copier l\'un après l\'autre','Choisir lequel est le meilleur','Les lire très vite'],
    answer:'Identifier leurs ressemblances et leurs différences dans le traitement du sujet',
    hint:'Comparer = noter ce qui est pareil et ce qui est différent.',
    explanation:'<b>Comparer deux textes</b> implique d\'identifier : les ressemblances (même sujet, même type de texte) et les différences (point de vue, registre, arguments, structure).' }),

  makeMCQ({ id:'g8fr-ce-010', chapterId:'g8fr-ce', difficulty:3, subsection:'idee_implicite',
    question:'Un auteur écrit : "Les enfants couraient, riaient, criaient dans la cour." Quelle information est implicite ?',
    options:['Les enfants sont heureux et s\'amusent','Les enfants sont en colère','La cour est petite','Il fait nuit'],
    answer:'Les enfants sont heureux et s\'amusent',
    hint:'Les verbes "courir, rire, crier" évoquent une ambiance joyeuse.',
    explanation:'La phrase ne dit pas explicitement que les enfants sont heureux, mais les verbes <b>courir, rire, crier</b> dans la cour l\'impliquent fortement. C\'est une information <b>implicite</b>.' }),

  makeMCQ({ id:'g8fr-ce-011', chapterId:'g8fr-ce', difficulty:2, subsection:'registres_langue',
    question:'Quel registre de langue convient pour rédiger une lettre de candidature ?',
    options:['Le registre soutenu','Le registre familier','Le registre argotique','Le registre oral'],
    answer:'Le registre soutenu',
    hint:'Une lettre de candidature est un document professionnel très formel.',
    explanation:'Une <b>lettre de candidature</b> est un document formel adressé à un employeur. Elle exige le registre <b>soutenu</b> : vocabulaire précis, formules de politesse, phrases complètes et bien construites.' }),

  makeMCQ({ id:'g8fr-ce-012', chapterId:'g8fr-ce', difficulty:3, subsection:'analyse_texte',
    question:'La personnification est une figure de style qui :',
    options:['Attribue des qualités humaines à un objet, un animal ou une abstraction','Compare deux personnes','Répète la même idée deux fois','Cache le sens réel du texte'],
    answer:'Attribue des qualités humaines à un objet, un animal ou une abstraction',
    hint:'Ex. : "La mer est en colère" — la mer ne peut pas ressentir de colère.',
    explanation:'La <b>personnification</b> consiste à attribuer des qualités ou des actions humaines à une chose inanimée, un animal ou une idée abstraite. Ex. : "Le vent hurle dans la nuit."' }),

  // ── Expression écrite — textes_fonctionnels_divers ───────────────────────

  makeMCQ({ id:'g8fr-ee-001', chapterId:'g8fr-ee', difficulty:1, subsection:'textes_fonctionnels_divers',
    question:'Quels sont deux exemples de textes fonctionnels produits au Grade 8 ?',
    options:['Un résumé et une lettre de réclamation','Un poème et un conte','Une chanson et une pièce de théâtre','Un roman et une biographie'],
    answer:'Un résumé et une lettre de réclamation',
    hint:'Les textes fonctionnels ont un but pratique précis.',
    explanation:'Au Grade 8, on apprend à produire des textes fonctionnels variés : <b>résumés</b>, <b>lettres de réclamation</b>, <b>compte-rendus</b>, <b>rapports</b> — des textes qui servent dans la vie réelle.' }),

  makeMCQ({ id:'g8fr-ee-002', chapterId:'g8fr-ee', difficulty:2, subsection:'textes_fonctionnels_divers',
    question:'Une lettre de réclamation doit inclure :',
    options:['Le problème clairement décrit, les preuves et une demande de solution','Des anecdotes personnelles','Des poèmes','Des dessins'],
    answer:'Le problème clairement décrit, les preuves et une demande de solution',
    hint:'Une lettre de réclamation a pour but de signaler un problème et demander une solution.',
    explanation:'Une <b>lettre de réclamation</b> efficace présente : le problème (clairement et avec précision), les preuves (dates, faits, documents), et une <b>demande de solution</b> concrète.' }),

  makeMCQ({ id:'g8fr-ee-003', chapterId:'g8fr-ee', difficulty:2, subsection:'textes_fonctionnels_divers',
    question:'La formule de politesse finale d\'une lettre formelle en français est :',
    options:['"Veuillez agréer, Madame/Monsieur, l\'expression de mes salutations distinguées."','"Bisous !"','"À bientôt !"','"Cordialement, votre ami."'],
    answer:'"Veuillez agréer, Madame/Monsieur, l\'expression de mes salutations distinguées."',
    hint:'Cette formule longue est propre aux lettres formelles.',
    explanation:'La <b>formule de politesse</b> finale d\'une lettre formelle est longue et respectueuse. "Veuillez agréer..." est la formule standard pour des lettres officielles ou professionnelles.' }),

  makeMCQ({ id:'g8fr-ee-004', chapterId:'g8fr-ee', difficulty:3, subsection:'textes_fonctionnels_divers',
    question:'Un compte-rendu est un texte fonctionnel qui sert à :',
    options:['Rapporter fidèlement ce qui s\'est passé lors d\'une réunion ou d\'un événement','Inventer une histoire','Exprimer ses émotions','Défendre une opinion personnelle'],
    answer:'Rapporter fidèlement ce qui s\'est passé lors d\'une réunion ou d\'un événement',
    hint:'Un compte-rendu rend compte de faits réels de façon objective.',
    explanation:'Un <b>compte-rendu</b> est un texte objectif qui rapporte les faits, les décisions et les échanges d\'une réunion ou d\'un événement. Il ne doit pas contenir d\'opinions personnelles.' }),

  // ── Expression écrite — resume_opinion ───────────────────────────────────

  makeMCQ({ id:'g8fr-ee-005', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Un résumé doit être :',
    options:['Court, objectif et ne contenir que les idées essentielles','Plus long que le texte original','Rempli des opinions du résumeur','Entièrement copié du texte original'],
    answer:'Court, objectif et ne contenir que les idées essentielles',
    hint:'Un résumé réduit un texte à ses éléments clés.',
    explanation:'Un <b>résumé</b> doit être : court (généralement 1/4 du texte original), objectif (sans ajouter ses propres opinions), et ne retenir que les <b>idées essentielles</b>.' }),

  makeMCQ({ id:'g8fr-ee-006', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Pour exprimer son opinion par écrit, quelle formule peut-on utiliser ?',
    options:['À mon avis, je pense que...','Il est certain que...','Les scientifiques disent que...','On a toujours dit que...'],
    answer:'À mon avis, je pense que...',
    hint:'Cette formule signale clairement que ce qui suit est une opinion personnelle.',
    explanation:'Les formules <b>"À mon avis"</b>, "Je pense que", "Il me semble que" marquent clairement une <b>opinion personnelle</b>. "Il est certain que" présente quelque chose comme un fait objectif.' }),

  makeMCQ({ id:'g8fr-ee-007', chapterId:'g8fr-ee', difficulty:3, subsection:'resume_opinion',
    question:'Comment différencie-t-on un fait d\'une opinion dans un texte ?',
    options:['Un fait est vérifiable ; une opinion exprime un point de vue subjectif','Un fait est toujours faux ; une opinion est toujours vraie','Ils sont identiques','Un fait est long ; une opinion est courte'],
    answer:'Un fait est vérifiable ; une opinion exprime un point de vue subjectif',
    hint:'Un fait peut être prouvé ; une opinion dépend du point de vue de chacun.',
    explanation:'Un <b>fait</b> est une réalité vérifiable (ex. : "Mauritius a obtenu son indépendance en 1968."). Une <b>opinion</b> est un jugement personnel (ex. : "Je pense que c\'est un événement très important.").' }),

  // ── Expression écrite — structure_coherente ──────────────────────────────

  makeMCQ({ id:'g8fr-ee-008', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'La cohérence d\'un texte signifie que :',
    options:['Toutes les idées sont liées et progressent logiquement vers la même direction','Le texte est très long','Le texte utilise des mots difficiles','Il y a beaucoup de personnages'],
    answer:'Toutes les idées sont liées et progressent logiquement vers la même direction',
    hint:'Un texte cohérent est comme un fil conducteur — on ne perd jamais le sujet.',
    explanation:'La <b>cohérence</b> d\'un texte tient à la progression logique des idées : chaque phrase et chaque paragraphe s\'enchaîne naturellement et tous contribuent à développer le sujet central.' }),

  makeMCQ({ id:'g8fr-ee-009', chapterId:'g8fr-ee', difficulty:2, subsection:'structure_coherente',
    question:'La reprise du sujet par un pronom dans le texte s\'appelle :',
    options:['Une anaphore pronominale','Une métaphore','Une rime','Un connecteur logique'],
    answer:'Une anaphore pronominale',
    hint:'C\'est le fait de remplacer un nom par un pronom pour éviter la répétition.',
    explanation:'L\'<b>anaphore pronominale</b> consiste à reprendre un nom déjà mentionné par un pronom (il, elle, ils, ce, cela...) pour éviter les répétitions et assurer la cohérence du texte.' }),

  makeMCQ({ id:'g8fr-ee-010', chapterId:'g8fr-ee', difficulty:3, subsection:'structure_coherente',
    question:'Dans un texte argumentatif, l\'ordre le plus efficace est :',
    options:['Thèse — Arguments — Antithèse — Synthèse','Introduction — Conclusion — Arguments','Arguments — Thèse — Antithèse','Antithèse — Arguments — Introduction'],
    answer:'Thèse — Arguments — Antithèse — Synthèse',
    hint:'On pose sa position, on argumente, on reconnaît le contre-argument, puis on conclut.',
    explanation:'Un plan <b>dialectique</b> efficace : <b>Thèse</b> (ma position), <b>Arguments</b> (preuves), <b>Antithèse</b> (position opposée et ses limites), <b>Synthèse</b> (conclusion nuancée).' }),

  makeMCQ({ id:'g8fr-ee-011', chapterId:'g8fr-ee', difficulty:2, subsection:'resume_opinion',
    question:'Quel connecteur logique exprime une opposition ou une nuance ?',
    options:['Cependant','De plus','Premièrement','En conclusion'],
    answer:'Cependant',
    hint:'"Cependant" introduit une idée qui va à l\'encontre de ce qui précède.',
    explanation:'"<b>Cependant</b>", "mais", "toutefois", "néanmoins" sont des connecteurs d\'<b>opposition</b>. Ils signalent une nuance ou une contradiction par rapport à ce qui vient d\'être dit.' }),

  makeMCQ({ id:'g8fr-ee-012', chapterId:'g8fr-ee', difficulty:3, subsection:'textes_fonctionnels_divers',
    question:'Quelle est la différence entre un résumé et une synthèse ?',
    options:['Un résumé réduit un seul texte ; une synthèse regroupe les idées de plusieurs textes','Un résumé est plus long qu\'une synthèse','Une synthèse est une copie d\'un texte','Ils sont identiques'],
    answer:'Un résumé réduit un seul texte ; une synthèse regroupe les idées de plusieurs textes',
    hint:'La synthèse fusionne des informations venues de sources différentes.',
    explanation:'Le <b>résumé</b> condense un seul texte à ses idées essentielles. La <b>synthèse</b> rassemble et organise les idées de plusieurs textes différents autour d\'un même thème.' }),

  // ── Littérature — genres_caracteristiques ────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-001', chapterId:'g8fr-litterature', difficulty:1, subsection:'genres_caracteristiques',
    question:'Quel est le genre littéraire qui met en scène des personnages en dialogue, destiné à être joué sur scène ?',
    options:['Le théâtre','Le roman','La poésie','Le conte'],
    answer:'Le théâtre',
    hint:'On va le voir en salle de spectacle.',
    explanation:'Le <b>théâtre</b> est un genre littéraire écrit sous forme de dialogue entre personnages, destiné à la représentation scénique. Il comprend des pièces tragiques, comiques ou dramatiques.' }),

  makeMCQ({ id:'g8fr-litterature-002', chapterId:'g8fr-litterature', difficulty:2, subsection:'genres_caracteristiques',
    question:'La tragédie se caractérise par :',
    options:['Un conflit insurmontable, des personnages nobles et une fin malheureuse','Un conflit comique et une fin heureuse','Des personnages ordinaires et une fin ouverte','Des rimes uniquement'],
    answer:'Un conflit insurmontable, des personnages nobles et une fin malheureuse',
    hint:'Dans une tragédie, le héros ne peut pas éviter sa chute.',
    explanation:'La <b>tragédie</b> met en scène un héros confronté à un <b>conflit insurmontable</b> (destin, passion, devoir) qui mène à une <b>fin malheureuse</b>. Exemples : Phèdre (Racine), Roméo et Juliette (Shakespeare).' }),

  makeMCQ({ id:'g8fr-litterature-003', chapterId:'g8fr-litterature', difficulty:2, subsection:'genres_caracteristiques',
    question:'Le roman réaliste se distingue par :',
    options:['Sa représentation fidèle de la société et de la vie quotidienne','Ses héros invincibles','Ses décors fantastiques','Son absence de personnages'],
    answer:'Sa représentation fidèle de la société et de la vie quotidienne',
    hint:'Le réalisme veut montrer la vie telle qu\'elle est vraiment.',
    explanation:'Le <b>roman réaliste</b> (XIXe siècle) cherche à décrire la société de façon précise et objective : les milieux sociaux, la vie quotidienne, les inégalités. Exemples : Zola, Balzac, Maupassant.' }),

  makeMCQ({ id:'g8fr-litterature-004', chapterId:'g8fr-litterature', difficulty:3, subsection:'genres_caracteristiques',
    question:'Quelle figure de style consiste à répéter un son vocalique en début de mots voisins ?',
    options:['L\'assonance','La métaphore','La comparaison','La personnification'],
    answer:'L\'assonance',
    hint:'L\'assonance joue avec la répétition des voyelles.',
    explanation:'L\'<b>assonance</b> est la répétition du même son vocalique dans des mots proches : "Les sanglots longs des violons" (Verlaine — son "on"). L\'<b>allitération</b> répète un son consonantique.' }),

  // ── Littérature — appreciation_textes ────────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-005', chapterId:'g8fr-litterature', difficulty:2, subsection:'appreciation_textes',
    question:'Apprécier un texte littéraire signifie :',
    options:['Identifier ses qualités artistiques, son style et ses effets sur le lecteur','Le mémoriser entièrement','Le traduire dans une autre langue','Compter ses paragraphes'],
    answer:'Identifier ses qualités artistiques, son style et ses effets sur le lecteur',
    hint:'Apprécier va au-delà de "j\'aime" ou "je n\'aime pas".',
    explanation:'<b>Apprécier un texte littéraire</b> consiste à analyser ses qualités : le style de l\'auteur, les figures de style, les thèmes, l\'effet produit sur le lecteur et la façon dont le texte est construit.' }),

  makeMCQ({ id:'g8fr-litterature-006', chapterId:'g8fr-litterature', difficulty:2, subsection:'appreciation_textes',
    question:'Quel auteur mauricien est connu pour ses textes poétiques écrits en français ?',
    options:['Malcolm de Chazal','Victor Hugo','Gustave Flaubert','Arthur Rimbaud'],
    answer:'Malcolm de Chazal',
    hint:'Cet auteur est né à Maurice en 1902.',
    explanation:'<b>Malcolm de Chazal</b> (1902–1981) est un écrivain mauricien célèbre, notamment pour son œuvre poétique et aphoristique "Sens-Plastique". Il est une figure majeure de la littérature mauricienne d\'expression française.' }),

  makeMCQ({ id:'g8fr-litterature-007', chapterId:'g8fr-litterature', difficulty:3, subsection:'appreciation_textes',
    question:'Identifier le thème principal d\'un texte littéraire consiste à :',
    options:['Dégager l\'idée centrale autour de laquelle s\'organise toute l\'œuvre','Lire uniquement le premier chapitre','Compter les personnages','Résumer chaque phrase'],
    answer:'Dégager l\'idée centrale autour de laquelle s\'organise toute l\'œuvre',
    hint:'Un roman peut avoir des thèmes comme l\'amour, la liberté, l\'injustice...',
    explanation:'Le <b>thème principal</b> est l\'idée centrale de l\'œuvre (ex. : la liberté, la justice, l\'amour, la guerre). Les <b>thèmes secondaires</b> gravitent autour du thème principal.' }),

  // ── Littérature — reaction_litteraire ────────────────────────────────────

  makeMCQ({ id:'g8fr-litterature-008', chapterId:'g8fr-litterature', difficulty:2, subsection:'reaction_litteraire',
    question:'Réagir à un texte littéraire à l\'oral signifie :',
    options:['Exprimer son ressenti, donner son opinion et justifier ses réactions par des éléments du texte','Lire le texte à voix haute sans s\'arrêter','Traduire le texte','Copier le texte'],
    answer:'Exprimer son ressenti, donner son opinion et justifier ses réactions par des éléments du texte',
    hint:'La réaction littéraire est personnelle mais doit être justifiée.',
    explanation:'<b>Réagir à un texte</b> implique : exprimer ses émotions ("Ce texte m\'a ému parce que..."), donner son opinion ("Je trouve que...") et <b>justifier</b> avec des extraits du texte.' }),

  makeMCQ({ id:'g8fr-litterature-009', chapterId:'g8fr-litterature', difficulty:2, subsection:'reaction_litteraire',
    question:'Pour écrire une réaction personnelle à un texte, on doit :',
    options:['Utiliser "je" et justifier ses opinions avec des citations ou références au texte','Copier uniquement les phrases qui plaisent','Ne jamais donner son opinion','Résumer uniquement'],
    answer:'Utiliser "je" et justifier ses opinions avec des citations ou références au texte',
    hint:'"Je" marque l\'implication personnelle ; les citations donnent de la crédibilité.',
    explanation:'Une bonne <b>réaction écrite</b> utilise la première personne ("je") pour exprimer sa subjectivité et appuie ses affirmations par des <b>citations</b> ou des références précises au texte.' }),

  makeMCQ({ id:'g8fr-litterature-010', chapterId:'g8fr-litterature', difficulty:3, subsection:'reaction_litteraire',
    question:'Dans quelle situation un lecteur peut-il se sentir "interpellé" par un texte ?',
    options:['Quand le texte touche à ses propres expériences, valeurs ou émotions','Quand le texte est très long','Quand le texte contient des mots difficiles','Quand le texte n\'a pas de titre'],
    answer:'Quand le texte touche à ses propres expériences, valeurs ou émotions',
    hint:'Se sentir interpellé, c\'est avoir l\'impression que le texte nous parle directement.',
    explanation:'Un lecteur se sent <b>interpellé</b> quand il reconnaît ses propres expériences, valeurs ou émotions dans le texte. C\'est ce qui crée un lien personnel fort entre le lecteur et l\'œuvre.' }),

  makeMCQ({ id:'g8fr-litterature-011', chapterId:'g8fr-litterature', difficulty:2, subsection:'genres_caracteristiques',
    question:'La nouvelle se distingue du roman par :',
    options:['Sa brièveté, un nombre limité de personnages et une fin souvent surprenante','Sa grande longueur','Son absence de narration','Ses nombreux personnages secondaires'],
    answer:'Sa brièveté, un nombre limité de personnages et une fin souvent surprenante',
    hint:'Une nouvelle se lit en une seule fois.',
    explanation:'La <b>nouvelle</b> est un récit court (quelques pages) avec peu de personnages et une intrigue simple. Elle se termine souvent par une <b>chute</b> (fin inattendue). C\'est un genre codifié différent du roman.' }),

  makeMCQ({ id:'g8fr-litterature-012', chapterId:'g8fr-litterature', difficulty:3, subsection:'appreciation_textes',
    question:'Quel poète symboliste a écrit : "Je est un autre" ?',
    options:['Arthur Rimbaud','Victor Hugo','Molière','Jean de La Fontaine'],
    answer:'Arthur Rimbaud',
    hint:'Ce poète français a révolutionné la poésie au XIXe siècle.',
    explanation:'<b>Arthur Rimbaud</b> (1854–1891) est un poète symboliste français qui a écrit cette phrase célèbre. Elle signifie que le "moi" du poète est multiple et dépasse le simple individu. Œuvres : "Le Bateau ivre", "Une saison en enfer".' })

);
