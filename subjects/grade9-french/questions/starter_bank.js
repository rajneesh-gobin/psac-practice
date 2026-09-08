'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Français (NCE) - BANQUE DE DÉPART / starter bank.
//
//  ⚠ THIS IS A FLOOR, NOT A FULL BANK - the same deliberate minimum as the
//    English starter bank: one question per declared subsection so nothing on
//    the Practise screen opens blank, and at least examWeight per chapter so
//    assembleExamPaper() can deal a whole paper. The house standard is ~20 per
//    subsection; more to follow.
//
//  ⚠ ENCODING. This file is UTF-8 and full of accented characters. The French
//    packs in this repository have already been mangled once by a script that
//    read utf8 and wrote latin1 (every « é » became « Ã© »), and
//    grade9-english/_manifest.js still carried NUL bytes from the same class of
//    bug. If you edit this file with a script, read AND write utf8, then grep
//    for U+FFFD before committing.
//
//  ⚠ g9fr-oeuvres covers the two set texts: « Le Papa de Simon » (Maupassant)
//    and « Topaze » (Pagnol). SET TEXTS CHANGE FROM YEAR TO YEAR - check the
//    current NCE list before adding more here, or the chapter will drill a work
//    the candidates are not being examined on.
//
//  ⚠ L4 in FRENCH means multi-step grammar in context, not obscure vocabulary.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ── Grammaire : le mot juste (w3) ───────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-001', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Complète : « Si j\'avais le temps, je .......... au marché. »',
    options:['irais','irai','vais','allais'], answer:'irais',
    hint:'Après « si » + imparfait, la principale se met au conditionnel présent.',
    explanation:'La structure « si + imparfait » entraîne le <b>conditionnel présent</b> : <i>j\'irais</i>. « J\'irai » est le futur simple, qui ne suit jamais « si » + imparfait.' }),

  makeMCQ({ id:'g9fr-sb-002', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'Complète : « Il pleuvait très fort ; .......... , le match a été annulé. »',
    options:['par conséquent','au contraire','par exemple','en revanche'], answer:'par conséquent',
    hint:'La deuxième proposition est-elle une conséquence ou une opposition ?',
    explanation:'L\'annulation est la <b>conséquence</b> de la pluie, d\'où « par conséquent ». « Au contraire » et « en revanche » marquent une opposition.' }),

  makeMCQ({ id:'g9fr-sb-003', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:3,
    question:'Choisis la forme correcte : « Les fleurs que j\'ai .......... sont fanées. »',
    options:['cueillies','cueilli','cueillis','cueillie'], answer:'cueillies',
    hint:'Le COD « que » est placé avant le verbe. Que représente-t-il ?',
    explanation:'Avec <i>avoir</i>, le participe passé s\'accorde avec le COD <b>placé avant</b> le verbe. Ici « que » reprend « les fleurs », féminin pluriel : <b>cueillies</b>.' }),

  makeMCQ({ id:'g9fr-sb-004', chapterId:'g9fr-grammaire', subsection:'determinants', difficulty:2,
    question:'Complète : « Je n\'ai pas .......... argent sur moi. »',
    options:['d\'','de l\'','du','le'], answer:'d\'',
    hint:'Après une négation, l\'article partitif change de forme.',
    explanation:'À la forme négative, « du / de la / des » deviennent <b>de</b> (ici <i>d\'</i> devant une voyelle) : « je n\'ai pas <b>d\'</b>argent ».' }),

  makeMCQ({ id:'g9fr-sb-005', chapterId:'g9fr-grammaire', subsection:'pronoms', difficulty:3,
    question:'Remplace le complément : « Je donne le livre <b>à Marie</b>. »',
    options:['Je lui donne le livre','Je la donne le livre','Je le donne le livre','Je leur donne le livre'],
    answer:'Je lui donne le livre',
    hint:'« à Marie » est un complément d\'objet indirect, au singulier.',
    explanation:'Le COI singulier se remplace par <b>lui</b> : « Je <b>lui</b> donne le livre ». « Leur » serait le pluriel et « la » un COD.' }),

  makeMCQ({ id:'g9fr-sb-006', chapterId:'g9fr-grammaire', subsection:'prepositions', difficulty:2,
    question:'Complète : « Elle habite .......... Maurice depuis dix ans. »',
    options:['à','en','au','dans'], answer:'à',
    hint:'Devant le nom d\'une île employé sans article, on emploie « à ».',
    explanation:'On dit « <b>à</b> Maurice », comme « à Cuba » : les noms d\'îles sans article prennent « à ». « En » s\'emploie devant un pays féminin (en France).' }),

  makeMCQ({ id:'g9fr-sb-007', chapterId:'g9fr-grammaire', subsection:'interrogatifs', difficulty:2,
    question:'Complète : « .......... de ces deux robes préfères-tu ? »',
    options:['Laquelle','Lequel','Quelle','Quel'], answer:'Laquelle',
    hint:'Le pronom remplace un nom féminin singulier déjà mentionné.',
    explanation:'On choisit parmi des robes (féminin), une seule : le pronom interrogatif est <b>laquelle</b>. « Quelle » est un adjectif et devrait précéder le nom.' }),

  // ── Transformation de phrases (w3) ──────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-008', chapterId:'g9fr-transformation', subsection:'ponctuation', difficulty:2,
    question:'Quelle phrase est correctement ponctuée ?',
    options:['« Viens ici », dit-elle doucement.','« Viens ici ». dit-elle doucement.','« Viens ici » dit-elle, doucement.','« Viens ici, » dit-elle doucement.'],
    answer:'« Viens ici », dit-elle doucement.',
    hint:'La virgule se place après le guillemet fermant, avant l\'incise.',
    explanation:'Les paroles sont fermées par le guillemet, puis une <b>virgule</b> introduit l\'incise « dit-elle ». Le point terminerait la phrase trop tôt.' }),

  makeMCQ({ id:'g9fr-sb-009', chapterId:'g9fr-transformation', subsection:'negation', difficulty:2,
    question:'Mets à la forme négative : « Il a déjà terminé son travail. »',
    options:['Il n\'a pas encore terminé son travail','Il n\'a pas déjà terminé son travail','Il a ne pas terminé son travail','Il n\'a jamais déjà terminé son travail'],
    answer:'Il n\'a pas encore terminé son travail',
    hint:'Le contraire de « déjà » n\'est pas « pas déjà ».',
    explanation:'La négation de <i>déjà</i> est <b>pas encore</b> : « Il n\'a <b>pas encore</b> terminé ». Aux temps composés, « ne » et « pas » encadrent l\'auxiliaire.' }),

  makeMCQ({ id:'g9fr-sb-010', chapterId:'g9fr-transformation', subsection:'place_adjectif', difficulty:3,
    question:'Quelle phrase place correctement l\'adjectif ?',
    options:['C\'est une grande maison blanche','C\'est une blanche maison grande','C\'est une maison grande blanche','C\'est une blanche grande maison'],
    answer:'C\'est une grande maison blanche',
    hint:'Certains adjectifs courts et courants se placent avant le nom ; les couleurs se placent après.',
    explanation:'« Grande » précède le nom (adjectif court et fréquent) et « blanche », adjectif de couleur, le suit : « une <b>grande</b> maison <b>blanche</b> ».' }),

  makeMCQ({ id:'g9fr-sb-011', chapterId:'g9fr-transformation', subsection:'pronominalisation', difficulty:3,
    question:'Remplace les mots soulignés : « Je vois <b>les enfants</b> dans la cour. »',
    options:['Je les vois dans la cour','Je leur vois dans la cour','Je en vois dans la cour','Je y vois dans la cour'],
    answer:'Je les vois dans la cour',
    hint:'« les enfants » est un COD au pluriel.',
    explanation:'Le COD pluriel devient <b>les</b>, placé avant le verbe : « Je <b>les</b> vois ». « Leur » remplacerait un COI.' }),

  makeMCQ({ id:'g9fr-sb-012', chapterId:'g9fr-transformation', subsection:'jonction_phrases', difficulty:3,
    question:'Relie les deux phrases : « Le livre est sur la table. Je l\'ai acheté hier. »',
    options:['Le livre que j\'ai acheté hier est sur la table','Le livre qui j\'ai acheté hier est sur la table','Le livre dont j\'ai acheté hier est sur la table','Le livre où j\'ai acheté hier est sur la table'],
    answer:'Le livre que j\'ai acheté hier est sur la table',
    hint:'Le pronom relatif remplace le COD de la deuxième phrase.',
    explanation:'« Je l\'ai acheté » : « l\' » est le COD, donc le relatif est <b>que</b>. « Qui » remplacerait un sujet.' }),

  makeMCQ({ id:'g9fr-sb-013', chapterId:'g9fr-transformation', subsection:'temps_verbaux', difficulty:3,
    question:'Mets au passé composé : « Elle part à six heures. »',
    options:['Elle est partie à six heures','Elle a parti à six heures','Elle était partie à six heures','Elle partait à six heures'],
    answer:'Elle est partie à six heures',
    hint:'« Partir » se conjugue avec quel auxiliaire ?',
    explanation:'<i>Partir</i> se conjugue avec <b>être</b>, et le participe s\'accorde avec le sujet féminin : « Elle <b>est partie</b> ».' }),

  makeMCQ({ id:'g9fr-sb-014', chapterId:'g9fr-transformation', subsection:'genre_nombre', difficulty:2,
    question:'Mets au féminin : « Cet acteur est très sérieux. »',
    options:['Cette actrice est très sérieuse','Cette acteur est très sérieuse','Cette actrice est très sérieux','Cet actrice est très sérieuse'],
    answer:'Cette actrice est très sérieuse',
    hint:'Trois mots changent : le déterminant, le nom et l\'adjectif.',
    explanation:'« Cet » devient <b>cette</b>, « acteur » devient <b>actrice</b> et « sérieux » devient <b>sérieuse</b> : tout l\'accord suit le nom.' }),

  makeMCQ({ id:'g9fr-sb-015', chapterId:'g9fr-transformation', subsection:'voix_passive', difficulty:3,
    question:'Mets à la voix passive : « Le jardinier arrose les plantes. »',
    options:['Les plantes sont arrosées par le jardinier','Les plantes ont arrosé le jardinier','Le jardinier est arrosé par les plantes','Les plantes arrosent le jardinier'],
    answer:'Les plantes sont arrosées par le jardinier',
    hint:'Le COD devient sujet, et le sujet passe après « par ».',
    explanation:'À la voix passive le COD « les plantes » devient sujet, le verbe devient <b>être + participe accordé</b>, et l\'agent suit « par ».' }),

  makeMCQ({ id:'g9fr-sb-016', chapterId:'g9fr-transformation', subsection:'interrogation', difficulty:2,
    question:'Pose la question avec inversion : « Tu viens demain. »',
    options:['Viens-tu demain ?','Tu viens demain ?','Est-ce que viens-tu demain ?','Viens tu demain ?'],
    answer:'Viens-tu demain ?',
    hint:'Le sujet passe après le verbe, relié par un trait d\'union.',
    explanation:'L\'interrogation par <b>inversion</b> place le pronom sujet après le verbe avec un trait d\'union : « <b>Viens-tu</b> demain ? ».' }),

  makeMCQ({ id:'g9fr-sb-017', chapterId:'g9fr-transformation', subsection:'changement_personne', difficulty:3,
    question:'Mets à la première personne du pluriel : « Il finit son exercice. »',
    options:['Nous finissons notre exercice','Nous finissons son exercice','Nous finissent notre exercice','Nous finis notre exercice'],
    answer:'Nous finissons notre exercice',
    hint:'Le verbe ET le déterminant possessif changent tous les deux.',
    explanation:'Le verbe devient <b>finissons</b> et le possessif « son » devient <b>notre</b> : changer de personne entraîne les deux accords.' }),

  // ── Vocabulaire et sens des mots (w2) ───────────────────────────────────

  makeMCQ({ id:'g9fr-sb-018', chapterId:'g9fr-vocabulaire', subsection:'traits_caractere', difficulty:2,
    question:'Une personne qui donne facilement aux autres est .......... .',
    options:['généreuse','avare','timide','bavarde'], answer:'généreuse',
    hint:'Cherche le trait de caractère qui décrit le fait de donner.',
    explanation:'Donner facilement, c\'est être <b>généreux</b>. Son contraire est « avare ».' }),

  makeMCQ({ id:'g9fr-sb-019', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'Quel verbe convient ? « Le maçon .......... un mur de briques. »',
    options:['construit','conduit','consomme','conseille'], answer:'construit',
    hint:'Que fait un maçon avec des briques ?',
    explanation:'Un maçon <b>construit</b> un mur. Les autres verbes se rapportent à conduire un véhicule, consommer un produit ou donner un conseil.' }),

  makeMCQ({ id:'g9fr-sb-020', chapterId:'g9fr-vocabulaire', subsection:'noms_concrets', difficulty:1,
    question:'Lequel de ces noms est un <b>nom concret</b> ?',
    options:['une table','la liberté','le courage','la justice'], answer:'une table',
    hint:'Un nom concret désigne ce que l\'on peut voir ou toucher.',
    explanation:'Une <b>table</b> se voit et se touche : c\'est un nom concret. Liberté, courage et justice sont des noms abstraits.' }),

  makeMCQ({ id:'g9fr-sb-021', chapterId:'g9fr-vocabulaire', subsection:'adjectifs_qualificatifs', difficulty:2,
    question:'Quel adjectif qualifie le mieux un ciel sans nuages ?',
    options:['dégagé','encombré','orageux','brumeux'], answer:'dégagé',
    hint:'Un ciel sans nuages est un ciel libre de tout obstacle.',
    explanation:'Un ciel <b>dégagé</b> est un ciel sans nuages. « Orageux » et « brumeux » décrivent le contraire.' }),

  makeMCQ({ id:'g9fr-sb-022', chapterId:'g9fr-vocabulaire', subsection:'adverbes', difficulty:2,
    question:'Quel adverbe complète le mieux ? « Il a répondu .......... à toutes les questions. »',
    options:['correctement','correct','correcte','correction'], answer:'correctement',
    hint:'Le mot doit décrire COMMENT il a répondu.',
    explanation:'L\'adverbe <b>correctement</b> modifie le verbe « a répondu ». « Correct » et « correcte » sont des adjectifs, « correction » un nom.' }),

  makeMCQ({ id:'g9fr-sb-023', chapterId:'g9fr-vocabulaire', subsection:'notions_abstraites', difficulty:3,
    question:'Quel nom abstrait correspond à l\'adjectif <i>patient</i> ?',
    options:['la patience','le patient','patiemment','patienter'], answer:'la patience',
    hint:'Cherche le nom qui désigne la qualité elle-même.',
    explanation:'La qualité de celui qui est patient est <b>la patience</b>, un nom abstrait. « Patienter » est un verbe et « patiemment » un adverbe.' }),

  // ── Courriel, fiche et documents (w4) ───────────────────────────────────

  makeMCQ({ id:'g9fr-sb-024', chapterId:'g9fr-doc-authentique', subsection:'courriel', difficulty:2,
    question:'Dans un courriel formel, quelle formule d\'appel convient à un directeur ?',
    options:['Monsieur le Directeur,','Salut !','Coucou Monsieur,','Hé, Monsieur !'],
    answer:'Monsieur le Directeur,',
    hint:'Le registre doit être soutenu.',
    explanation:'Un courriel formel s\'ouvre par « <b>Monsieur le Directeur,</b> ». Les autres formules relèvent du langage familier.' }),

  makeMCQ({ id:'g9fr-sb-025', chapterId:'g9fr-doc-authentique', subsection:'fiche_infographie', difficulty:2,
    question:'Sur une infographie, à quoi sert la <b>légende</b> ?',
    options:['À expliquer ce que représentent les couleurs','À donner le titre du document','À indiquer le nom de l\'auteur','À numéroter les pages'],
    answer:'À expliquer ce que représentent les couleurs',
    hint:'C\'est la clé qui permet de lire le graphique.',
    explanation:'La <b>légende</b> explique les symboles et les couleurs employés ; sans elle, les données ne sont pas interprétables.' }),

  makeMCQ({ id:'g9fr-sb-026', chapterId:'g9fr-doc-authentique', subsection:'reperage_explicite', difficulty:1,
    question:'Une affiche indique : « Atelier de lecture — samedi 14 juin, 9 h, bibliothèque municipale. » Où se déroule l\'atelier ?',
    options:['À la bibliothèque municipale','Au collège','À la mairie','Au centre sportif'],
    answer:'À la bibliothèque municipale',
    hint:'L\'information est écrite telle quelle sur l\'affiche.',
    explanation:'Le lieu est donné explicitement : « <b>bibliothèque municipale</b> ». Le repérage explicite consiste à retrouver une information écrite noir sur blanc.' }),

  makeMCQ({ id:'g9fr-sb-027', chapterId:'g9fr-doc-authentique', subsection:'reponses_multiples', difficulty:3,
    question:'Une fiche annonce : « Inscription : lundi et mercredi, de 8 h à 12 h. » Quels sont les jours d\'inscription ?',
    options:['Lundi et mercredi','Lundi seulement','Mercredi seulement','Du lundi au vendredi'],
    answer:'Lundi et mercredi',
    hint:'La question attend DEUX éléments, pas un seul.',
    explanation:'La fiche donne deux jours : <b>lundi et mercredi</b>. Une question à réponses multiples n\'est complète que si tous les éléments sont cités.' }),

  makeMCQ({ id:'g9fr-sb-028', chapterId:'g9fr-doc-authentique', subsection:'role_emetteur_destinataire', difficulty:3,
    question:'Un courriel commence par « Chers parents » et est signé « La direction ». Qui en est le <b>destinataire</b> ?',
    options:['Les parents','La direction','Les élèves','Les enseignants'],
    answer:'Les parents',
    hint:'L\'émetteur signe ; le destinataire est celui à qui l\'on s\'adresse.',
    explanation:'Le destinataire est celui à qui le message est adressé : « Chers <b>parents</b> ». La direction, qui signe, en est l\'émetteur.' }),

  // ── Formation des mots (w2) ─────────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-029', chapterId:'g9fr-formation-mots', subsection:'nominalisation', difficulty:2,
    question:'Forme un nom à partir du verbe <i>construire</i> : « La .......... du pont a duré deux ans. »',
    options:['construction','constructeur','constructif','construisant'], answer:'construction',
    hint:'Le nom désigne l\'action elle-même.',
    explanation:'L\'action de construire est la <b>construction</b>. « Constructeur » désigne la personne et « constructif » est un adjectif.' }),

  makeMCQ({ id:'g9fr-sb-030', chapterId:'g9fr-formation-mots', subsection:'formation_adjectif', difficulty:2,
    question:'Forme un adjectif à partir du nom <i>montagne</i> : « une région .......... »',
    options:['montagneuse','montagne','montagnard','monter'], answer:'montagneuse',
    hint:'Le suffixe « -eux / -euse » forme souvent un adjectif.',
    explanation:'On forme <b>montagneuse</b> avec le suffixe <i>-euse</i>. « Montagnard » désigne l\'habitant, pas la région.' }),

  makeMCQ({ id:'g9fr-sb-031', chapterId:'g9fr-formation-mots', subsection:'formation_adverbe', difficulty:2,
    question:'Forme un adverbe à partir de l\'adjectif <i>lent</i> : « Il marche .......... . »',
    options:['lentement','lente','lenteur','ralentir'], answer:'lentement',
    hint:'On part du féminin de l\'adjectif et on ajoute « -ment ».',
    explanation:'Féminin <i>lente</i> + <b>-ment</b> donne <b>lentement</b>. « Lenteur » est un nom et « ralentir » un verbe.' }),

  makeMCQ({ id:'g9fr-sb-032', chapterId:'g9fr-formation-mots', subsection:'noms_de_personne', difficulty:2,
    question:'Quel nom désigne la personne qui <b>enseigne</b> ?',
    options:['un enseignant','un enseignement','une enseigne','enseigner'], answer:'un enseignant',
    hint:'Le suffixe « -ant » forme ici un nom de personne.',
    explanation:'Celui qui enseigne est un <b>enseignant</b>. « Enseignement » désigne l\'activité et « enseigne » un panneau de magasin.' }),

  makeMCQ({ id:'g9fr-sb-033', chapterId:'g9fr-formation-mots', subsection:'formation_verbe', difficulty:3,
    question:'Forme un verbe à partir de l\'adjectif <i>large</i> : « Il faut .......... la route. »',
    options:['élargir','largement','largeur','largesse'], answer:'élargir',
    hint:'Le préfixe « é- » et le suffixe « -ir » forment souvent un verbe.',
    explanation:'On forme le verbe <b>élargir</b>. « Largeur » et « largesse » sont des noms, « largement » un adverbe.' }),

  makeMCQ({ id:'g9fr-sb-034', chapterId:'g9fr-formation-mots', subsection:'noms_de_quantite', difficulty:3,
    question:'Quel nom exprime une <b>quantité</b> ? « Une .......... de spectateurs attendait devant la salle. »',
    options:['foule','foulée','fouler','follement'], answer:'foule',
    hint:'Le mot désigne un grand nombre de personnes réunies.',
    explanation:'Une <b>foule</b> désigne une grande quantité de personnes. « Foulée » est un pas de course et « fouler » un verbe.' }),

  // ── Correction d'erreurs (w2) ───────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-035', chapterId:'g9fr-correction', subsection:'homophones', difficulty:3,
    question:'Choisis la forme correcte : « Il .......... allé chez son oncle. »',
    options:['est','et','ait','ai'], answer:'est',
    hint:'Remplace par « était » : si la phrase tient, c\'est le verbe.',
    explanation:'« Il <b>est</b> allé » : <i>est</i> est le verbe être, remplaçable par « était ». « Et » est une conjonction.' }),

  makeMCQ({ id:'g9fr-sb-036', chapterId:'g9fr-correction', subsection:'accords', difficulty:3,
    question:'Corrige : « Les élèves sont arrivé en retard. »',
    options:['Les élèves sont arrivés en retard','Les élèves sont arrivé en retard','Les élèves sont arriver en retard','Les élèves son arrivés en retard'],
    answer:'Les élèves sont arrivés en retard',
    hint:'Avec « être », le participe s\'accorde avec le sujet.',
    explanation:'Le sujet « les élèves » est masculin pluriel, donc le participe prend un <b>s</b> : « sont <b>arrivés</b> ».' }),

  makeMCQ({ id:'g9fr-sb-037', chapterId:'g9fr-correction', subsection:'participe_infinitif', difficulty:4,
    question:'Choisis la forme correcte : « Il a voulu .......... la porte. »',
    options:['fermer','fermé','fermait','fermant'], answer:'fermer',
    hint:'Remplace par « vendre » : si cela sonne juste, c\'est l\'infinitif.',
    explanation:'Après un autre verbe conjugué on emploie l\'<b>infinitif</b> : « il a voulu <b>fermer</b> ». Le test du remplacement par « vendre » distingue -er de -é.' }),

  makeMCQ({ id:'g9fr-sb-038', chapterId:'g9fr-correction', subsection:'orthographe_accents', difficulty:2,
    question:'Quel mot est correctement accentué ?',
    options:['élève','eleve','élevè','èléve'], answer:'élève',
    hint:'Accent aigu sur le premier e, accent grave sur le second.',
    explanation:'On écrit <b>élève</b> : accent aigu puis accent grave. L\'accent change le son, donc il fait partie de l\'orthographe du mot.' }),

  makeMCQ({ id:'g9fr-sb-039', chapterId:'g9fr-correction', subsection:'determinants', difficulty:3,
    question:'Corrige : « Elle a acheté des belles fleurs. »',
    options:['Elle a acheté de belles fleurs','Elle a acheté des belle fleurs','Elle a acheté de la belles fleurs','Elle a acheté des belles fleur'],
    answer:'Elle a acheté de belles fleurs',
    hint:'Devant un adjectif pluriel placé avant le nom, « des » devient « de ».',
    explanation:'Quand un adjectif au pluriel précède le nom, « des » se réduit à <b>de</b> : « <b>de</b> belles fleurs ».' }),

  // ── Texte à trous (w2) ──────────────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-040', chapterId:'g9fr-textes-trous', subsection:'prepositions', difficulty:2,
    question:'Complète le texte : « Le chat dort .......... le fauteuil. »',
    options:['sur','sous','sans','selon'], answer:'sur',
    hint:'Le chat est posé au-dessus du fauteuil.',
    explanation:'La préposition <b>sur</b> indique la position au-dessus et en contact. « Sous » signifierait en dessous.' }),

  makeMCQ({ id:'g9fr-sb-041', chapterId:'g9fr-textes-trous', subsection:'pronoms_relatifs', difficulty:3,
    question:'Complète : « La ville .......... je viens est près de la mer. »',
    options:['d\'où','que','qui','dont'], answer:'d\'où',
    hint:'On vient DE quelque part : le relatif doit exprimer l\'origine.',
    explanation:'« Venir de » demande le relatif de lieu <b>d\'où</b> : « la ville <b>d\'où</b> je viens ».' }),

  makeMCQ({ id:'g9fr-sb-042', chapterId:'g9fr-textes-trous', subsection:'determinants', difficulty:2,
    question:'Complète : « .......... enfants jouent dans la cour. »',
    options:['Les','Le','La','Un'], answer:'Les',
    hint:'Le nom et le verbe sont au pluriel.',
    explanation:'« Enfants » est pluriel et « jouent » aussi, donc le déterminant est <b>les</b>.' }),

  makeMCQ({ id:'g9fr-sb-043', chapterId:'g9fr-textes-trous', subsection:'conjonctions', difficulty:2,
    question:'Complète : « Je suis resté à la maison .......... il pleuvait. »',
    options:['parce qu\'','pourtant','malgré','afin qu\''], answer:'parce qu\'',
    hint:'La deuxième proposition donne la cause.',
    explanation:'<b>Parce que</b> introduit la cause. « Pourtant » marquerait une opposition et « malgré » se construit avec un nom.' }),

  makeMCQ({ id:'g9fr-sb-044', chapterId:'g9fr-textes-trous', subsection:'adverbes_negation', difficulty:3,
    question:'Complète : « Il ne mange .......... de viande. »',
    options:['jamais','rien','personne','aucun'], answer:'jamais',
    hint:'L\'adverbe doit exprimer la fréquence nulle et s\'accorder avec « de viande ».',
    explanation:'« Ne ... <b>jamais</b> » exprime qu\'une action ne se produit à aucun moment, et se construit ici avec « de viande ».' }),

  makeMCQ({ id:'g9fr-sb-045', chapterId:'g9fr-textes-trous', subsection:'verbes_contexte', difficulty:3,
    question:'Complète : « Hier, nous .......... au cinéma avec nos cousins. »',
    options:['sommes allés','allons','irons','allions'], answer:'sommes allés',
    hint:'« Hier » situe l\'action dans le passé achevé.',
    explanation:'« Hier » impose un temps du passé : le passé composé <b>sommes allés</b>, avec l\'auxiliaire être et l\'accord du participe.' }),

  // ── Écrit guidé : lettre et invitation (w4) ─────────────────────────────

  makeMCQ({ id:'g9fr-sb-046', chapterId:'g9fr-ecrit-guide', subsection:'invitation', difficulty:2,
    question:'Quelle information est <b>indispensable</b> dans une invitation ?',
    options:['La date et le lieu','La couleur du papier','Le nombre de pages','Le nom de l\'imprimeur'],
    answer:'La date et le lieu',
    hint:'Sans quoi l\'invité ne pourrait-il pas venir ?',
    explanation:'Une invitation doit préciser au minimum <b>quand</b> et <b>où</b>. Sans ces deux éléments, l\'invité ne peut pas s\'y rendre.' }),

  makeMCQ({ id:'g9fr-sb-047', chapterId:'g9fr-ecrit-guide', subsection:'lettre_amicale', difficulty:2,
    question:'Quelle formule convient à une lettre amicale ?',
    options:['Cher Ravi,','Monsieur le Directeur,','Madame, Monsieur,','À qui de droit,'],
    answer:'Cher Ravi,',
    hint:'On écrit à un ami, pas à une administration.',
    explanation:'« <b>Cher Ravi,</b> » convient au registre amical. Les autres formules appartiennent à la correspondance administrative.' }),

  makeMCQ({ id:'g9fr-sb-048', chapterId:'g9fr-ecrit-guide', subsection:'points_imposes', difficulty:3,
    question:'La consigne impose trois points à traiter. Que se passe-t-il si tu n\'en traites que deux ?',
    options:['Tu perds les points liés au point oublié','Tu perds toute la note de la rédaction','Tu gagnes des points pour la concision','Cela n\'a aucune conséquence'],
    answer:'Tu perds les points liés au point oublié',
    hint:'Chaque point imposé porte une part des points du barème.',
    explanation:'Chaque point imposé est évalué séparément : en oublier un fait perdre <b>la part correspondante</b> du barème, mais pas la totalité.' }),

  makeMCQ({ id:'g9fr-sb-049', chapterId:'g9fr-ecrit-guide', subsection:'formules_ouverture_cloture', difficulty:2,
    question:'Quelle formule de clôture convient à une lettre amicale ?',
    options:['Amicalement,','Veuillez agréer mes salutations','Je vous prie de croire à ma considération','Dans l\'attente de votre réponse favorable'],
    answer:'Amicalement,',
    hint:'La clôture doit être du même registre que l\'appel.',
    explanation:'« <b>Amicalement,</b> » clôt une lettre amicale. Les autres formules sont réservées à la correspondance formelle.' }),

  makeMCQ({ id:'g9fr-sb-050', chapterId:'g9fr-ecrit-guide', subsection:'longueur_50_75', difficulty:3,
    question:'La consigne demande un texte de 50 à 75 mots. Que faire si ton texte en compte 120 ?',
    options:['Le raccourcir en gardant les points imposés','Le laisser tel quel, c\'est mieux','Supprimer un des points imposés','Ajouter encore des détails'],
    answer:'Le raccourcir en gardant les points imposés',
    hint:'La longueur fait partie de la consigne, mais les points imposés aussi.',
    explanation:'Il faut <b>respecter la longueur</b> tout en conservant les points imposés : on resserre l\'expression, on ne supprime pas un point demandé.' }),

  // ── Compréhension de texte (w8) ─────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-051', chapterId:'g9fr-comprehension', subsection:'reperage_explicite', difficulty:1,
    question:'Lis : « Karan est arrivé au port à cinq heures du matin, bien avant les autres pêcheurs. » À quelle heure Karan est-il arrivé ?',
    options:['À cinq heures','À six heures','À quatre heures','À sept heures'], answer:'À cinq heures',
    hint:'L\'heure est écrite dans le texte.',
    explanation:'Le texte dit « à <b>cinq heures</b> du matin ». Le repérage explicite consiste à relever l\'information telle qu\'elle est écrite.' }),

  makeMCQ({ id:'g9fr-sb-052', chapterId:'g9fr-comprehension', subsection:'inference', difficulty:3,
    question:'Lis : « Elle relut la lettre trois fois, puis la replia sans un mot. » Que peut-on déduire ?',
    options:['La nouvelle l\'a bouleversée','Elle n\'a pas su lire la lettre','Elle a écrit la lettre elle-même','Elle attendait cette lettre depuis peu'],
    answer:'La nouvelle l\'a bouleversée',
    hint:'Pourquoi relit-on trois fois, puis se tait-on ?',
    explanation:'Relire plusieurs fois et se taire suggèrent un choc : la nouvelle l\'a <b>bouleversée</b>. Rien n\'est dit explicitement, d\'où l\'inférence.' }),

  makeMCQ({ id:'g9fr-sb-053', chapterId:'g9fr-comprehension', subsection:'expression_imagee', difficulty:3,
    question:'Que signifie l\'expression « il a le cœur gros » ?',
    options:['Il est triste','Il est très généreux','Il est en colère','Il est malade du cœur'],
    answer:'Il est triste',
    hint:'C\'est une image : le sens n\'est pas littéral.',
    explanation:'« Avoir le cœur gros » signifie être <b>triste</b>, avoir du chagrin. Une expression imagée ne se comprend pas mot à mot.' }),

  makeMCQ({ id:'g9fr-sb-054', chapterId:'g9fr-comprehension', subsection:'synonymes_contexte', difficulty:3,
    question:'Lis : « Le vieil homme avançait péniblement sur le sentier. » Par quel mot peut-on remplacer <b>péniblement</b> ?',
    options:['difficilement','rapidement','joyeusement','silencieusement'], answer:'difficilement',
    hint:'Le mot décrit un effort.',
    explanation:'<b>Péniblement</b> signifie avec peine, donc <b>difficilement</b>. Le contexte — un vieil homme sur un sentier — confirme l\'effort.' }),

  makeMCQ({ id:'g9fr-sb-055', chapterId:'g9fr-comprehension', subsection:'avis_personnel', difficulty:4,
    question:'Une question demande ton avis personnel sur le comportement d\'un personnage. Quelle réponse est la meilleure ?',
    options:['Un avis clair, justifié par un détail du texte','Un avis clair, sans aucune justification','Un résumé complet de l\'histoire','La recopie d\'une phrase du texte'],
    answer:'Un avis clair, justifié par un détail du texte',
    hint:'Donner son avis ne suffit pas : il faut l\'appuyer.',
    explanation:'Un avis personnel doit être <b>énoncé puis justifié</b> par un élément précis du texte. Un avis sans preuve, comme un simple résumé, ne répond pas à la consigne.' }),

  makeMCQ({ id:'g9fr-sb-056', chapterId:'g9fr-comprehension', subsection:'reponses_multiples', difficulty:3,
    question:'Lis : « Il emporta son carnet, sa lampe et une bouteille d\'eau. » Que prend-il avec lui ?',
    options:['Un carnet, une lampe et de l\'eau','Un carnet seulement','Une lampe et de l\'eau','Un carnet et une lampe'],
    answer:'Un carnet, une lampe et de l\'eau',
    hint:'Le texte énumère trois objets : il faut les citer tous.',
    explanation:'La phrase énumère <b>trois</b> objets. Une réponse incomplète perd les points des éléments oubliés.' }),

  makeMCQ({ id:'g9fr-sb-057', chapterId:'g9fr-comprehension', subsection:'inference', difficulty:3,
    question:'Lis : « Les volets étaient fermés, la boîte aux lettres débordait. » Que comprend-on ?',
    options:['Les habitants sont absents depuis longtemps','Les habitants viennent de rentrer','La maison est en construction','La maison vient d\'être vendue'],
    answer:'Les habitants sont absents depuis longtemps',
    hint:'Deux indices se combinent : les volets et le courrier accumulé.',
    explanation:'Des volets fermés et une boîte qui déborde indiquent une <b>absence prolongée</b>. Le texte le suggère sans le dire.' }),

  makeMCQ({ id:'g9fr-sb-058', chapterId:'g9fr-comprehension', subsection:'expression_imagee', difficulty:4,
    question:'Que signifie « poser un lapin à quelqu\'un » ?',
    options:['Ne pas venir au rendez-vous','Offrir un cadeau surprise','Raconter une histoire drôle','Rendre visite à l\'improviste'],
    answer:'Ne pas venir au rendez-vous',
    hint:'L\'expression concerne un rendez-vous manqué.',
    explanation:'« Poser un lapin » signifie <b>ne pas se rendre</b> à un rendez-vous fixé, en laissant l\'autre attendre.' }),

  // ── Rédaction (w6) ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-059', chapterId:'g9fr-redaction', subsection:'recit', difficulty:3,
    question:'Dans un récit au passé, quel couple de temps emploie-t-on le plus souvent ?',
    options:['Passé simple et imparfait','Présent et futur','Futur et conditionnel','Impératif et infinitif'],
    answer:'Passé simple et imparfait',
    hint:'Un temps pour les actions, un autre pour le décor.',
    explanation:'Le <b>passé simple</b> (ou le passé composé) porte les actions et l\'<b>imparfait</b> décrit le décor et les habitudes.' }),

  makeMCQ({ id:'g9fr-sb-060', chapterId:'g9fr-redaction', subsection:'description', difficulty:3,
    question:'Quelle phrase est la plus <b>descriptive</b> ?',
    options:['Le vent salé faisait claquer les volets bleus','L\'endroit était vraiment très joli','C\'était une maison avec des fenêtres','Nous sommes allés là-bas puis rentrés'],
    answer:'Le vent salé faisait claquer les volets bleus',
    hint:'Cherche la phrase qui fait voir et entendre.',
    explanation:'Une bonne description fait appel aux <b>sens</b> : le goût du sel, le bruit des volets, la couleur. Dire qu\'un lieu est « joli » est un jugement, pas une description.' }),

  makeMCQ({ id:'g9fr-sb-061', chapterId:'g9fr-redaction', subsection:'texte_opinion', difficulty:4,
    question:'Dans un texte d\'opinion, comment construire un paragraphe efficace ?',
    options:['Une idée, un argument, un exemple','Trois idées sans exemple','Un exemple sans idée directrice','Une suite de questions'],
    answer:'Une idée, un argument, un exemple',
    hint:'Chaque paragraphe défend un seul point, et le prouve.',
    explanation:'Un paragraphe d\'opinion annonce <b>une idée</b>, la développe par un <b>argument</b> et l\'appuie sur un <b>exemple</b>. Empiler les idées sans preuve n\'emporte pas l\'adhésion.' }),

  makeMCQ({ id:'g9fr-sb-062', chapterId:'g9fr-redaction', subsection:'recit', difficulty:2,
    question:'Quel connecteur convient pour ordonner un récit ?',
    options:['Ensuite','Cependant','Néanmoins','Toutefois'], answer:'Ensuite',
    hint:'Cherche celui qui marque la succession dans le temps.',
    explanation:'<b>Ensuite</b> marque l\'ordre chronologique. Les trois autres expriment une opposition, utile dans un texte d\'opinion.' }),

  makeMCQ({ id:'g9fr-sb-063', chapterId:'g9fr-redaction', subsection:'description', difficulty:2,
    question:'Quel temps emploie-t-on pour décrire un décor dans un récit au passé ?',
    options:['L\'imparfait','Le passé simple','Le futur','L\'impératif'], answer:'L\'imparfait',
    hint:'Le décor dure ; il n\'est pas une action ponctuelle.',
    explanation:'L\'<b>imparfait</b> décrit un état qui dure. Le passé simple servirait aux actions successives.' }),

  makeMCQ({ id:'g9fr-sb-064', chapterId:'g9fr-redaction', subsection:'texte_opinion', difficulty:3,
    question:'Quelle expression introduit le mieux une opinion personnelle ?',
    options:['À mon avis','Il est certain que','Tout le monde sait que','Personne ne peut nier que'],
    answer:'À mon avis',
    hint:'L\'expression doit signaler qu\'il s\'agit d\'un point de vue, non d\'un fait.',
    explanation:'« <b>À mon avis</b> » présente clairement un point de vue personnel. Les autres formules présentent une opinion comme une vérité admise.' }),

  // ── Œuvres au programme (w4) ────────────────────────────────────────────

  makeMCQ({ id:'g9fr-sb-065', chapterId:'g9fr-oeuvres', subsection:'papa_simon_personnages', difficulty:2,
    question:'Dans « Le Papa de Simon » de Maupassant, qui devient le père de Simon ?',
    options:['Philippe Remy, le forgeron','Le maître d\'école','Un camarade de classe','Le maire du village'],
    answer:'Philippe Remy, le forgeron',
    hint:'C\'est un ouvrier qui travaille le fer.',
    explanation:'Le forgeron <b>Philippe Remy</b> déclare qu\'il est le papa de Simon, puis épouse la Blanchotte, la mère de l\'enfant.' }),

  makeMCQ({ id:'g9fr-sb-066', chapterId:'g9fr-oeuvres', subsection:'papa_simon_themes', difficulty:3,
    question:'Quel thème principal traverse « Le Papa de Simon » ?',
    options:['Le rejet de l\'enfant sans père','La rivalité entre deux villages','La découverte d\'un trésor','Le voyage vers une grande ville'],
    answer:'Le rejet de l\'enfant sans père',
    hint:'Pense à ce que les autres écoliers font subir à Simon.',
    explanation:'La nouvelle traite du <b>rejet</b> et de la cruauté sociale : Simon est moqué parce qu\'il n\'a pas de père, et le regard du village pèse sur sa mère.' }),

  makeMCQ({ id:'g9fr-sb-067', chapterId:'g9fr-oeuvres', subsection:'topaze_personnages', difficulty:2,
    question:'Dans « Topaze » de Marcel Pagnol, quel est le métier de Topaze au début de la pièce ?',
    options:['Professeur dans une école','Médecin de campagne','Journaliste à Paris','Avocat au tribunal'],
    answer:'Professeur dans une école',
    hint:'Il enseigne à des élèves avant que sa vie ne bascule.',
    explanation:'Topaze est un <b>professeur</b> honnête et scrupuleux à la pension Muche ; son renvoi le fait basculer dans les affaires.' }),

  makeMCQ({ id:'g9fr-sb-068', chapterId:'g9fr-oeuvres', subsection:'topaze_themes', difficulty:3,
    question:'Quel thème Pagnol met-il en scène dans « Topaze » ?',
    options:['La corruption et le pouvoir de l\'argent','La conquête de l\'espace','La vie des marins pêcheurs','La guerre entre deux familles'],
    answer:'La corruption et le pouvoir de l\'argent',
    hint:'Pense à ce que Topaze devient après son renvoi.',
    explanation:'La pièce est une satire de la <b>corruption</b> : l\'honnête Topaze découvre que l\'argent achète le respect qu\'il n\'avait pas gagné par la vertu.' }),

  makeMCQ({ id:'g9fr-sb-069', chapterId:'g9fr-oeuvres', subsection:'question_longue', difficulty:4,
    question:'Une question longue sur une œuvre demande une réponse développée. Quelle structure convient ?',
    options:['Une idée, un exemple tiré de l\'œuvre, une conclusion','Un résumé de toute l\'intrigue','La liste des personnages','Une opinion sans référence au texte'],
    answer:'Une idée, un exemple tiré de l\'œuvre, une conclusion',
    hint:'La réponse doit s\'appuyer sur l\'œuvre elle-même.',
    explanation:'Une réponse longue annonce une <b>idée</b>, l\'appuie sur un <b>exemple précis</b> de l\'œuvre, puis conclut. Résumer l\'intrigue ne répond pas à la question posée.' })
);
