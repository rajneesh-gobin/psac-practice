'use strict';
// NCE 2021 Grade 9 French — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9fr-pp21-001', chapterId:'g9fr-grammaire', subsection:'pronoms', difficulty:2,
    question:'Donne-moi ton stylo ! .... est perdu.',
    options:['Le mien','La mienne','Les miennes','Les miens'], answer:'Le mien',
    hint:'Ton stylo = un stylo masculin singulier. Le pronom possessif qui le remplace est...',
    explanation:'«Ton stylo» est masculin singulier, donc le pronom possessif correspondant est <b>le mien</b>. «La mienne» est féminin, «les miennes/les miens» sont pluriels. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-002', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:2,
    question:'Les chaussures .... sont exposées dans la vitrine.',
    options:['neuve','neufs','neuves','neuf'], answer:'neuves',
    hint:'Les chaussures = féminin pluriel. L\'adjectif doit s\'accorder.',
    explanation:'«Chaussures» est féminin pluriel, donc l\'adjectif s\'accorde : <b>neuves</b>. «Neuf» est masculin singulier, «neuve» féminin singulier, «neufs» masculin pluriel. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-003', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Un noble roi .... dans ce château il y a deux cents ans.',
    options:['habitait','habite','habitera','a habité'], answer:'habitait',
    hint:'«Il y a deux cents ans» indique un temps passé. Quelle forme exprime une situation habituelle dans le passé ?',
    explanation:'<b>Habitait</b> (imparfait) décrit une situation dans le passé. «A habité» indiquerait une action ponctuelle, «habite» est présent et «habitera» est futur. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-004', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:2,
    question:'Les gâteaux que Danish a .... sont succulents.',
    options:['préparer','préparée','préparé','préparés'], answer:'préparés',
    hint:'Le COD «que» représente «les gâteaux» (masculin pluriel) et précède le verbe avoir — le participe passé s\'accorde.',
    explanation:'Le COD «que» = «les gâteaux» (masculin pluriel). Avec «avoir», le participe passé s\'accorde avec le COD placé avant : <b>préparés</b>. «Préparée» est féminin singulier, «préparé» masculin singulier. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-005', chapterId:'g9fr-grammaire', subsection:'prepositions', difficulty:2,
    question:'L\'immense avion vole .... des maisons.',
    options:['au-dessus','en-dessous','autour','en-dehors'], answer:'au-dessus',
    hint:'Un avion vole plus haut que les maisons.',
    explanation:'<b>Au-dessus</b> signifie à un niveau supérieur. «En-dessous» = en dessous, «autour» = encercler, «en-dehors» = à l\'extérieur. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-006', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'.... la pluie, les garçons jouent au football.',
    options:['Malgré','Grâce à','Parce que','Puisque'], answer:'Malgré',
    hint:'Les garçons jouent quand même — malgré l\'obstacle de la pluie.',
    explanation:'<b>Malgré</b> exprime la concession (jouer quand même). «Grâce à» serait positif, «Parce que/Puisque» expriment la cause. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-007', chapterId:'g9fr-grammaire', subsection:'determinants', difficulty:2,
    question:'En plus des poissons, .... pêcheurs ont attrapé des crabes.',
    options:['certains','quelques','leurs','aucuns'], answer:'certains',
    hint:'Quel déterminant signifie «une partie d\'un groupe» ?',
    explanation:'<b>Certains</b> désigne une partie des pêcheurs (pas tous). «Quelques» est possible mais moins précis ; «leurs» est un possessif ; «aucuns» n\'existe pas. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-008', chapterId:'g9fr-vocabulaire', subsection:'notions_abstraites', difficulty:2,
    question:'.... d\'eau est interdit dans notre quartier pendant la saison sèche.',
    options:['Le gaspillage','La pollution','La pénurie','L\'utilisation'], answer:'Le gaspillage',
    hint:'Utiliser trop d\'eau inutilement, c\'est...',
    explanation:'<b>Le gaspillage</b> = utiliser en excès, sans nécessité. «La pénurie» = manque, «la pollution» = contamination, «l\'utilisation» = usage neutre. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-009', chapterId:'g9fr-vocabulaire', subsection:'adjectifs_qualificatifs', difficulty:2,
    question:'Fumer est .... pour la santé.',
    options:['nocif','bénéfique','favorable','utile'], answer:'nocif',
    hint:'Fumer fait du mal — quel adjectif exprime cela ?',
    explanation:'<b>Nocif</b> = nuisible, mauvais pour la santé. «Bénéfique», «favorable» et «utile» sont tous positifs, le contraire du sens voulu. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-010', chapterId:'g9fr-vocabulaire', subsection:'noms_concrets', difficulty:2,
    question:'D\'après ...., la fête nationale sera célébrée un jeudi.',
    options:['le calendrier','le dictionnaire','l\'almanach','l\'annuaire'], answer:'le calendrier',
    hint:'Quel objet indique les jours et les dates de l\'année ?',
    explanation:'<b>Le calendrier</b> indique les jours, dates et fêtes de l\'année. «Le dictionnaire» définit des mots, «l\'almanach» peut aussi indiquer des dates mais est moins courant, «l\'annuaire» liste des noms et numéros. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-011', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'Allons .... la montagne du Pouce !',
    options:['escalader','visiter','traverser','surveiller'], answer:'escalader',
    hint:'On monte une montagne — quel verbe décrit cette action ?',
    explanation:'<b>Escalader</b> = grimper, monter une montagne. «Visiter» s\'emploie pour des lieux touristiques, «traverser» pour passer d\'un côté à l\'autre, «surveiller» pour observer. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-012', chapterId:'g9fr-vocabulaire', subsection:'adverbes', difficulty:2,
    question:'La grand-mère sourit .... en regardant ses petits-enfants.',
    options:['gaiement','tristement','rarement','soigneusement'], answer:'gaiement',
    hint:'Sourire en regardant ses petits-enfants — quelle humeur cela exprime-t-il ?',
    explanation:'<b>Gaiement</b> = avec joie, joyeusement. «Tristement» est négatif, «rarement» indique la fréquence, «soigneusement» indique le soin. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-013', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:2,
    question:'Dans la nouvelle, cette scène a lieu...',
    options:['après la tentative de noyade de Simon.','avant l\'arrivée de Philippe.','pendant la récréation à l\'école.','au moment du repas en famille.'], answer:'après la tentative de noyade de Simon.',
    hint:'Où Simon est-il quand il rencontre Philippe pour la première fois ?',
    explanation:'Simon est au bord de la rivière, après avoir voulu se noyer, quand il rencontre Philippe Remy. La rencontre se produit donc <b>après la tentative de noyade</b>. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-014', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:2,
    question:'Dans la nouvelle, le récit se déroule...',
    options:['à la campagne.','dans une grande ville.','au bord de la mer.','dans une école.'], answer:'à la campagne.',
    hint:'Y a-t-il des champs, une forge et une rivière dans le décor ?',
    explanation:'Le récit se passe <b>à la campagne</b> : on y trouve une rivière, une forge et des paysages ruraux. Il n\'y a pas de grande ville, ni de mer. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-015', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:2,
    question:'Dans la nouvelle, Maupassant critique...',
    options:['l\'attitude des gens envers les mères célibataires.','le comportement des enfants à l\'école.','la faiblesse des pères de famille.','l\'injustice du système éducatif.'], answer:'l\'attitude des gens envers les mères célibataires.',
    hint:'Pourquoi Blanchotte et Simon souffrent-ils ?',
    explanation:'Maupassant dénonce le jugement cruel de la société envers les mères célibataires comme Blanchotte. C\'est <b>l\'attitude des gens</b> qui cause la souffrance de Simon. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-016', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:2,
    question:'Dans la pièce de Marcel Pagnol, Topaze est...',
    options:['une pièce de théâtre.','un roman policier.','une nouvelle réaliste.','un conte de fées.'], answer:'une pièce de théâtre.',
    hint:'Elle contient des actes et des scènes — c\'est le signe d\'un genre précis.',
    explanation:'<b>Topaze</b> est une pièce de théâtre en quatre actes, écrite par Marcel Pagnol en 1928. Elle n\'est ni un roman, ni une nouvelle, ni un conte. 📄 NCE 2021 French exam.' }),

  makeMCQ({ id:'g9fr-pp21-017', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:2,
    question:'Dans l\'extrait étudié, la scène se passe dans...',
    options:['une classe de la pension Muche.','le bureau du directeur.','la salle des professeurs.','un café du quartier.'], answer:'une classe de la pension Muche.',
    hint:'Où Topaze enseigne-t-il quand Muche entre ?',
    explanation:'L\'extrait de Topaze se passe <b>dans une classe de la pension Muche</b> où Topaze est en train d\'enseigner. Le directeur Muche entre dans cette salle. 📄 NCE 2021 French exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9fr-pp21-pdf-001', chapterId:'g9fr-transformation', marks:8, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 1, exercices 8 à 15. Réécris chaque phrase en suivant la consigne. (8) Ajoute le signe de ponctuation correct : «Quelle belle journée» (9) Mets à la forme négative : «Je mange des pommes.» (10) Mets au passé composé : «Nous allons à l\'école.» (11) Mets au féminin : «Le beau garçon chante.» (12) Place l\'adjectif «vieux» correctement : «Mon voisin habite dans ce bâtiment.» (13) Remplace le groupe nominal souligné par un pronom : «Marie achète les légumes.» (14) Mets à la voix passive : «Le lion attrape le zèbre.» (15) Joins les deux phrases avec «bien que» : «Il pleut. Les enfants jouent dehors.»',
    markScheme:'(8) «Quelle belle journée !» — point d\'exclamation. (9) Je ne mange pas de pommes. (10) Nous sommes allés à l\'école. (11) La belle fille chante. (12) Mon vieux voisin habite dans ce bâtiment. (13) Marie les achète. (14) Le zèbre est attrapé par le lion. (15) Bien qu\'il pleuve, les enfants jouent dehors.' },

  { id:'g9fr-pp21-pdf-002', chapterId:'g9fr-doc-authentique', marks:10, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 3. Lis le document authentique et réponds aux questions. Repère les informations explicites : l\'émetteur, le destinataire et l\'objet du document. Réponds aux sous-questions en te basant sur le texte.',
    markScheme:'Les réponses doivent être tirées directement du texte. L\'émetteur est la personne ou organisation qui envoie le message. Le destinataire est celui qui le reçoit. L\'objet résume le but du document. Pour chaque sous-question, une réponse correcte tirée du texte vaut 1 point.' },

  { id:'g9fr-pp21-pdf-003', chapterId:'g9fr-formation-mots', marks:5, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 4. Complète le texte avec le mot dérivé correct formé à partir du mot entre parenthèses. Exemple : Les (maladie) → malades consultent le médecin. Forme des noms, adjectifs, verbes ou adverbes à partir des mots donnés entre parenthèses.',
    markScheme:'Chaque blanc vaut 1 point. Les formes correctes dépendent du contexte grammatical : nominalisation (verbe → nom), formation d\'adjectifs (-able, -eux, -if), formation d\'adverbes (-ment), noms de personne, formation de verbes.' },

  { id:'g9fr-pp21-pdf-004', chapterId:'g9fr-correction', marks:5, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 5. Corrige l\'erreur soulignée dans chaque phrase. Exemple : Cet → Cette fleur est rouge. (1) à (2) à (3) à (4) à (5) corriger.',
    markScheme:'Chaque correction vaut 1 point. Les erreurs portent sur : les homophones (a/à, ont/on, son/sont), les accords (adjectifs, participes passés), la confusion infinitif/participe passé, l\'orthographe et les accents, les déterminants.' },

  { id:'g9fr-pp21-pdf-005', chapterId:'g9fr-textes-trous', marks:5, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 6. Complète le texte avec les mots de la liste. Chaque mot n\'est utilisé qu\'une seule fois. Exemple : Les animaux vivent dans la forêt. (5 blancs à compléter à partir de la liste fournie dans le texte original.)',
    markScheme:'Chaque réponse correcte vaut 1 point. Les mots à placer sont des prépositions, pronoms relatifs, déterminants, conjonctions, adverbes ou verbes contextuels. L\'exemple est déjà donné ; les 5 blancs valent chacun 1 point.' },

  { id:'g9fr-pp21-pdf-006', chapterId:'g9fr-ecrit-guide', marks:10, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 7. Rédige une lettre ou une invitation en respectant les points imposés. (i) Point imposé 1 (ii) Point imposé 2 (iii) Point imposé 3. Longueur : 50 à 75 mots. Utilise les formules d\'ouverture et de clôture appropriées.',
    markScheme:'Expression (E) /5 : Le candidat développe les trois points imposés avec des idées claires. Chaque point manquant retire 1 mark. Langue (L) /3 : Grammaire, vocabulaire et syntaxe corrects. Communication effective (CE) /2 : Registre approprié, formules d\'ouverture et de clôture correctes, longueur respectée (50-75 mots).' },

  { id:'g9fr-pp21-pdf-007', chapterId:'g9fr-comprehension', marks:20, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 8. Lis attentivement le texte et réponds aux questions. Les questions portent sur le repérage d\'informations explicites, l\'inférence, les expressions imagées, les synonymes en contexte et un avis personnel justifié.',
    markScheme:'Pour chaque question de repérage [1], la réponse doit être tirée directement du texte. Pour les questions d\'inférence [1], une explication logique basée sur le texte est acceptée. Pour les synonymes en contexte [4 au total], 1 point par synonyme correct. Pour l\'avis personnel, la réponse doit être justifiée par des éléments du texte.' },

  { id:'g9fr-pp21-pdf-008', chapterId:'g9fr-redaction', marks:15, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 9. Choisis un des sujets ci-dessous et écris une rédaction d\'environ 200 mots. (a) Sujet de récit. (b) Sujet de description. (c) Sujet d\'opinion.',
    markScheme:'Expression (E) /7 : Idées développées, pertinentes, bien organisées. Introduction, développement et conclusion. Langue (L) /5 : Vocabulaire varié, phrases bien construites, grammaire correcte, ponctuation appropriée. Communication effective (CE) /3 : Longueur respectée (~200 mots), cohérence et cohésion, registre adapté au sujet.' },

  { id:'g9fr-pp21-pdf-009', chapterId:'g9fr-oeuvres', marks:5, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 10A. Le Papa de Simon, Guy de Maupassant. Lis l\'extrait et réponds aux questions écrites. (3) Question sur les émotions ou réactions d\'un personnage dans l\'extrait. [1] (4) Question sur les thèmes abordés. [1] (5) Question d\'analyse du personnage. [1] (6) En t\'appuyant sur la nouvelle, développe ta réponse. [2 + 1 pour la langue]',
    markScheme:'(3) Réponse liée au texte sur les émotions de Simon ou d\'un autre personnage. (4) Identification correcte du thème abordé dans l\'extrait. (5) Analyse du personnage (Simon, Philippe ou Blanchotte) appuyée sur des éléments du texte. (6) Réponse développée, appuyée sur la nouvelle, avec des exemples pertinents. 1 mark supplémentaire pour la qualité de la langue.' },

  { id:'g9fr-pp21-pdf-010', chapterId:'g9fr-oeuvres', marks:5, year:2021, grade:9, subject:'Français', type:'written',
    question:'Question 10B. Topaze, Marcel Pagnol. Lis l\'extrait et réponds aux questions écrites. (3) Question sur les personnages ou leur rôle dans la scène. [1] (4) Question sur les thèmes de la pièce. [1] (5) Question d\'analyse du caractère de Topaze. [1] (6) En t\'appuyant sur la pièce, développe ta réponse sur le personnage de Topaze. [2 + 1 pour la langue]',
    markScheme:'(3) Identification correcte d\'un personnage ou de son rôle dans la scène. (4) Identification du thème (naïveté de Topaze, corruption, éducation). (5) Analyse du caractère de Topaze (naïf, honnête, manipulé). (6) Réponse développée appuyée sur des éléments de la pièce. 1 mark supplémentaire pour la qualité de la langue.' }
);
