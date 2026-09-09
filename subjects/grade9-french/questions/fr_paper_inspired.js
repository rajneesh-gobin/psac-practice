'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── g9fr-grammaire : temps_modes (3) ─────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-001', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Complète : « Si tu .......... ici, tu rencontrerais ma petite fille. »',
    options:['étais','serais','es','seras'],
    answer:'étais',
    hint:'Si + conditionnel présent → imparfait dans la subordonnée.',
    explanation:'La structure <b>si + imparfait → conditionnel présent</b> : <i>si tu <b>étais</b></i> ici → tu rencontrerais. Le conditionnel dans la subordonnée serait une erreur classique.' }),

  makeMCQ({ id:'g9fr-pi-002', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:2,
    question:'Complète : « La semaine prochaine, nous .......... voir notre grand-mère. »',
    options:['passerons','passerions','passons','passions'],
    answer:'passerons',
    hint:'« La semaine prochaine » indique un futur certain.',
    explanation:'L\'expression <b>la semaine prochaine</b> indique un fait futur prévu : on emploie le <b>futur simple</b> — <i>nous <b>passerons</b></i>.' }),

  makeMCQ({ id:'g9fr-pi-003', chapterId:'g9fr-grammaire', subsection:'temps_modes', difficulty:3,
    question:'Complète : « Il est possible qu\'elle .......... raison sur ce point. »',
    options:['ait','a','aura','avait'],
    answer:'ait',
    hint:'« Il est possible que » exige quel mode ?',
    explanation:'Les expressions de doute ou de possibilité comme <b>il est possible que</b> exigent le <b>subjonctif présent</b> : <i>qu\'elle <b>ait</b> raison</i>.' }),

  // ── g9fr-grammaire : connecteurs (2) ─────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-004', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'Complète : « Shaivi n\'a pu aller au parc .......... il pleuvait. »',
    options:['car','mais','donc','cependant'],
    answer:'car',
    hint:'On cherche un connecteur de cause qui justifie l\'impossibilité d\'aller au parc.',
    explanation:'<b>Car</b> introduit une cause explicative : <i>elle n\'a pu y aller <b>car</b> il pleuvait</i>. « Mais » marque l\'opposition, « donc » la conséquence, « cependant » la concession.' }),

  makeMCQ({ id:'g9fr-pi-005', chapterId:'g9fr-grammaire', subsection:'connecteurs', difficulty:2,
    question:'Complète : « Il a beaucoup travaillé ; .......... , il a réussi son examen. »',
    options:['par conséquent','pourtant','néanmoins','or'],
    answer:'par conséquent',
    hint:'Le résultat découle logiquement de l\'effort.',
    explanation:'<b>Par conséquent</b> exprime la conséquence logique : l\'effort entraîne la réussite. « Pourtant » et « néanmoins » marqueraient une opposition inattendue.' }),

  // ── g9fr-grammaire : accords (2) ─────────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-006', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:2,
    question:'Choisis la forme correcte : « Les filles que j\'ai .......... étaient contentes. »',
    options:['vues','vu','vue','voyées'],
    answer:'vues',
    hint:'Le participe passé s\'accorde avec le COD placé avant le verbe.',
    explanation:'Le COD <i>les filles</i> (féminin pluriel) est placé avant <i>avoir</i> : le participe <b>vues</b> s\'accorde en genre et en nombre.' }),

  makeMCQ({ id:'g9fr-pi-007', chapterId:'g9fr-grammaire', subsection:'accords', difficulty:2,
    question:'Choisis la forme correcte : « Ces nouvelles .......... m\'ont surprise. »',
    options:['inattendues','inattendu','inattendue','inattendus'],
    answer:'inattendues',
    hint:'L\'adjectif s\'accorde avec le nom qu\'il qualifie.',
    explanation:'<i>Ces nouvelles</i> est féminin pluriel : l\'adjectif <b>inattendues</b> prend le féminin pluriel — suffixe <i>-es</i>.' }),

  // ── g9fr-grammaire : determinants (3) ────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-008', chapterId:'g9fr-grammaire', subsection:'determinants', difficulty:1,
    question:'Complète : « .......... éléphant est superbe. »',
    options:['Cet','Ce','Cette','Ces'],
    answer:'Cet',
    hint:'Le déterminant démonstratif masculin singulier devant une voyelle prend une forme spéciale.',
    explanation:'Devant un nom masculin singulier commençant par une voyelle, on emploie <b>cet</b> (et non <i>ce</i>) pour faciliter la liaison : <i><b>cet</b> éléphant</i>.' }),

  makeMCQ({ id:'g9fr-pi-009', chapterId:'g9fr-grammaire', subsection:'determinants', difficulty:2,
    question:'Complète : « Les invités qui ont mangé .......... glace sont tombés malades. »',
    options:['de la','du','une','de'],
    answer:'de la',
    hint:'On cherche l\'article partitif féminin singulier.',
    explanation:'<i>Glace</i> est un nom féminin : l\'article partitif féminin est <b>de la</b>. « Du » est masculin, « une » est l\'article indéfini.' }),

  makeMCQ({ id:'g9fr-pi-010', chapterId:'g9fr-grammaire', subsection:'determinants', difficulty:2,
    question:'Complète : « Kirsten prend son petit déjeuner .......... les matins. »',
    options:['tous','tout','toutes','toute'],
    answer:'tous',
    hint:'« Les matins » est masculin pluriel.',
    explanation:'L\'adjectif indéfini <b>tous</b> s\'accorde avec <i>les matins</i> (masculin pluriel). <i>Toutes</i> serait pour un féminin pluriel, <i>tout</i> pour un masculin singulier.' }),

  // ── g9fr-grammaire : pronoms (2) ─────────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-011', chapterId:'g9fr-grammaire', subsection:'pronoms', difficulty:2,
    question:'Remplace « les fleurs » par le pronom correct : « Nous avons acheté les fleurs. » →',
    options:['Nous les avons achetées.','Nous les avons acheté.','Nous en avons achetées.','Nous y avons achetées.'],
    answer:'Nous les avons achetées.',
    hint:'COD féminin pluriel → « les ». Le participe s\'accorde avec ce COD placé avant.',
    explanation:'<i>Les fleurs</i> (COD féminin pluriel) devient <b>les</b>, placé avant le verbe. Le participe passé <b>achetées</b> s\'accorde.' }),

  makeMCQ({ id:'g9fr-pi-012', chapterId:'g9fr-grammaire', subsection:'pronoms', difficulty:2,
    question:'Complète : « Je pense souvent .......... vacances de l\'an dernier. »',
    options:['à ces','de ces','sur ces','pour ces'],
    answer:'à ces',
    hint:'Le verbe « penser » se construit avec la préposition « à ».',
    explanation:'<b>Penser à</b> quelque chose : <i>je pense <b>à ces</b> vacances</i>. La préposition <i>à</i> est exigée par la valence du verbe.' }),

  // ── g9fr-grammaire : prepositions (2) ────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-013', chapterId:'g9fr-grammaire', subsection:'prepositions', difficulty:1,
    question:'Complète : « Purnima était présente .......... la dernière réunion. »',
    options:['à','en','dans','pour'],
    answer:'à',
    hint:'On est présent « à » un événement.',
    explanation:'La préposition <b>à</b> s\'emploie pour indiquer la présence à un événement : <i>présente <b>à</b> la réunion</i> (contraction : <i>à la</i>).' }),

  makeMCQ({ id:'g9fr-pi-014', chapterId:'g9fr-grammaire', subsection:'prepositions', difficulty:2,
    question:'Complète : « Elle est rentrée .......... Maurice après ses études. »',
    options:['à','en','de','dans'],
    answer:'à',
    hint:'Les îles utilisent la préposition « à ».',
    explanation:'On emploie <b>à</b> avec les noms d\'îles : <i><b>à</b> Maurice</i>, <i>à la Réunion</i>. « En » s\'emploie avec les pays féminins (en France).' }),

  // ── g9fr-grammaire : interrogatifs (1) ───────────────────────────────────

  makeMCQ({ id:'g9fr-pi-015', chapterId:'g9fr-grammaire', subsection:'interrogatifs', difficulty:2,
    question:'Quelle est la forme correcte de l\'interrogation indirecte ? « Il demande : \'Où habites-tu ?\' »',
    options:['Il demande où tu habites.','Il demande où habites-tu.','Il demande où tu habiteras.','Il demande où est-ce que tu habites.'],
    answer:'Il demande où tu habites.',
    hint:'Dans l\'interrogation indirecte, il n\'y a pas d\'inversion sujet-verbe.',
    explanation:'En interrogation indirecte, on supprime l\'inversion et les marques d\'interrogation directe : <i>il demande <b>où tu habites</b></i> (ordre normal sujet + verbe).' }),

  // ── g9fr-transformation : ponctuation (1) ────────────────────────────────

  makeMCQ({ id:'g9fr-pi-016', chapterId:'g9fr-transformation', subsection:'ponctuation', difficulty:1,
    question:'Transforme cette phrase en exclamation. Quelle forme est correcte ?\n« Quelle aubaine tu as eue. »',
    options:['Quelle aubaine tu as eue !','Quelle aubaine tu as eue ?','Quelle aubaine tu as eue …','Quelle aubaine, tu as eu.'],
    answer:'Quelle aubaine tu as eue !',
    hint:'Une exclamation se termine par un point d\'exclamation.',
    explanation:'Pour exprimer l\'admiration ou la surprise, on utilise le point d\'exclamation : <b>Quelle aubaine tu as eue !</b> Le participe <i>eue</i> s\'accorde avec <i>aubaine</i> (féminin).' }),

  // ── g9fr-transformation : negation (2) ───────────────────────────────────

  makeMCQ({ id:'g9fr-pi-017', chapterId:'g9fr-transformation', subsection:'negation', difficulty:2,
    question:'Transforme à la forme négative : « Le bébé dérange ses parents le soir. »',
    options:['Le bébé ne dérange pas ses parents le soir.','Le bébé ne dérange ses parents le soir pas.','Le bébé ne pas dérange ses parents le soir.','Le bébé dérange ne pas ses parents le soir.'],
    answer:'Le bébé ne dérange pas ses parents le soir.',
    hint:'La négation encadre le verbe conjugué : ne … pas.',
    explanation:'La négation simple <b>ne … pas</b> encadre le verbe conjugué : <i>le bébé <b>ne</b> dérange <b>pas</b> ses parents</i>.' }),

  makeMCQ({ id:'g9fr-pi-018', chapterId:'g9fr-transformation', subsection:'negation', difficulty:2,
    question:'Transforme à la forme négative : « Il a encore mangé du chocolat. »',
    options:['Il n\'a plus mangé de chocolat.','Il n\'a pas encore mangé du chocolat.','Il n\'a jamais mangé du chocolat.','Il ne mange plus de chocolat.'],
    answer:'Il n\'a plus mangé de chocolat.',
    hint:'Le contraire de « encore » à la forme négative est « plus ».',
    explanation:'Pour nier « encore », on emploie <b>ne … plus</b> : <i>il <b>n\'</b>a <b>plus</b> mangé de chocolat</i>. Notez aussi que l\'article partitif <i>du</i> devient <i>de</i> après la négation.' }),

  // ── g9fr-transformation : place_adjectif (1) ─────────────────────────────

  makeMCQ({ id:'g9fr-pi-019', chapterId:'g9fr-transformation', subsection:'place_adjectif', difficulty:2,
    question:'Place correctement l\'adjectif : « château / vieux / délabré »\nPhrase : Le .......... château .......... est fermé au public.',
    options:['Le vieux château délabré est fermé au public.','Le délabré vieux château est fermé au public.','Le château vieux délabré est fermé au public.','Le château délabré vieux est fermé au public.'],
    answer:'Le vieux château délabré est fermé au public.',
    hint:'« Vieux » est un adjectif BAGS qui se place avant le nom ; « délabré » (état physique) se place après.',
    explanation:'Les adjectifs BAGS (Beauté, Âge, Grandeur, Sentiment) se placent généralement <b>avant</b> le nom : <i>le <b>vieux</b> château</i>. Les adjectifs descriptifs comme <i>délabré</i> se placent <b>après</b>.' }),

  // ── g9fr-transformation : pronominalisation (1) ──────────────────────────

  makeMCQ({ id:'g9fr-pi-020', chapterId:'g9fr-transformation', subsection:'pronominalisation', difficulty:2,
    question:'Remplace le COI « à ses amis » par le pronom correct :\n« Elle a envoyé un message à ses amis. »',
    options:['Elle leur a envoyé un message.','Elle les a envoyé un message.','Elle y a envoyé un message.','Elle en a envoyé un message.'],
    answer:'Elle leur a envoyé un message.',
    hint:'Le pronom COI des personnes au pluriel est « leur ».',
    explanation:'<i>À ses amis</i> est un COI désignant des personnes (pluriel) → pronom <b>leur</b>. « Les » serait un COD, « y » remplacerait un lieu ou une chose.' }),

  // ── g9fr-transformation : jonction_phrases (1) ───────────────────────────

  makeMCQ({ id:'g9fr-pi-021', chapterId:'g9fr-transformation', subsection:'jonction_phrases', difficulty:2,
    question:'Réunis en une seule phrase avec « bien que » :\n« Il fait froid. Leila est sortie sans manteau. »',
    options:['Bien qu\'il fasse froid, Leila est sortie sans manteau.','Bien qu\'il fait froid, Leila est sortie sans manteau.','Bien que il fasse froid, Leila est sortie sans manteau.','Bien qu\'il fera froid, Leila est sortie sans manteau.'],
    answer:'Bien qu\'il fasse froid, Leila est sortie sans manteau.',
    hint:'« Bien que » exige le subjonctif. « Il fait » → ?',
    explanation:'<b>Bien que</b> est une conjonction de concession qui exige le <b>subjonctif</b> : <i>bien qu\'il <b>fasse</b> froid</i>. « Il » élide devant voyelle : <i>qu\'il</i>.' }),

  // ── g9fr-transformation : temps_verbaux (2) ──────────────────────────────

  makeMCQ({ id:'g9fr-pi-022', chapterId:'g9fr-transformation', subsection:'temps_verbaux', difficulty:2,
    question:'Mets au passé composé : « Vous faites vos devoirs après le dîner. »',
    options:['Vous avez fait vos devoirs après le dîner.','Vous avez faits vos devoirs après le dîner.','Vous êtes fait vos devoirs après le dîner.','Vous faisiez vos devoirs après le dîner.'],
    answer:'Vous avez fait vos devoirs après le dîner.',
    hint:'« Faire » se conjugue avec « avoir » au passé composé.',
    explanation:'<i>Faire</i> se conjugue avec l\'auxiliaire <b>avoir</b> : <i>vous <b>avez fait</b></i>. Le participe passé <i>fait</i> est invariable ici car le COD (<i>vos devoirs</i>) est après le verbe.' }),

  makeMCQ({ id:'g9fr-pi-023', chapterId:'g9fr-transformation', subsection:'temps_verbaux', difficulty:2,
    question:'Mets à l\'imparfait : « Les enfants jouent dans la cour chaque jour. »',
    options:['Les enfants jouaient dans la cour chaque jour.','Les enfants ont joué dans la cour chaque jour.','Les enfants joueraient dans la cour chaque jour.','Les enfants jouèrent dans la cour chaque jour.'],
    answer:'Les enfants jouaient dans la cour chaque jour.',
    hint:'Une action habituelle dans le passé → imparfait.',
    explanation:'<i>Chaque jour</i> signale une habitude passée, ce qui appelle l\'<b>imparfait</b> : <i>les enfants <b>jouaient</b></i>. Le passé simple (<i>jouèrent</i>) s\'emploie pour une action ponctuelle.' }),

  // ── g9fr-transformation : genre_nombre (1) ───────────────────────────────

  makeMCQ({ id:'g9fr-pi-024', chapterId:'g9fr-transformation', subsection:'genre_nombre', difficulty:1,
    question:'Mets au féminin pluriel : « Les joueurs de foot courent vite. »',
    options:['Les joueuses de foot courent vite.','Les joueurs de foot courent vite.','Les joueurses de foot courent vite.','Les joueuses de foot courrent vite.'],
    answer:'Les joueuses de foot courent vite.',
    hint:'Le féminin de « joueur » est « joueuse ».',
    explanation:'<b>Joueur → joueuse</b> (féminin par ajout de <i>-se</i> après suppression du <i>-r</i> final). Le verbe « courent » ne change pas car il s\'accorde avec le sujet pluriel.' }),

  // ── g9fr-transformation : voix_passive (1) ───────────────────────────────

  makeMCQ({ id:'g9fr-pi-025', chapterId:'g9fr-transformation', subsection:'voix_passive', difficulty:3,
    question:'Transforme à la voix passive : « Le directeur a signé la lettre. »',
    options:['La lettre a été signée par le directeur.','La lettre est signée par le directeur.','La lettre a signé par le directeur.','La lettre était signée par le directeur.'],
    answer:'La lettre a été signée par le directeur.',
    hint:'Voix passive au passé composé : sujet + avoir été + participe passé accordé.',
    explanation:'Passif du passé composé : <b>avoir été + participe passé</b>. <i>La lettre</i> (féminin) → <i><b>signée</b></i>. L\'agent s\'introduit avec <b>par</b>.' }),

  // ── g9fr-transformation : interrogation (1) ──────────────────────────────

  makeMCQ({ id:'g9fr-pi-026', chapterId:'g9fr-transformation', subsection:'interrogation', difficulty:2,
    question:'Transforme en question avec inversion sujet-verbe : « Tu peux m\'aider. »',
    options:['Peux-tu m\'aider ?','Peut-tu m\'aider ?','Tu peux-m\'aider ?','Peux-vous m\'aider ?'],
    answer:'Peux-tu m\'aider ?',
    hint:'Inversion : verbe-sujet, avec un trait d\'union.',
    explanation:'L\'inversion sujet-verbe place le verbe en premier, suivi d\'un trait d\'union et du pronom : <b>Peux-tu</b> m\'aider ? La forme est « peux » (et non « peut ») pour <i>tu</i>.' }),

  // ── g9fr-transformation : changement_personne (2) ────────────────────────

  makeMCQ({ id:'g9fr-pi-027', chapterId:'g9fr-transformation', subsection:'changement_personne', difficulty:2,
    question:'Change de « je » à « nous » : « Je fais de mon mieux pour réussir. »',
    options:['Nous faisons de notre mieux pour réussir.','Nous faisons de mon mieux pour réussir.','Nous fait de notre mieux pour réussir.','Nous faisent de notre mieux pour réussir.'],
    answer:'Nous faisons de notre mieux pour réussir.',
    hint:'Le possessif « mon » change aussi quand le sujet change.',
    explanation:'<i>Je → nous</i> : le verbe devient <b>faisons</b> et le possessif <i>mon</i> devient <b>notre</b>. Tout accord possessif suit le changement de personne grammaticale.' }),

  makeMCQ({ id:'g9fr-pi-028', chapterId:'g9fr-transformation', subsection:'changement_personne', difficulty:2,
    question:'Change de « tu » à « vous » (vouvoiement) : « Tu prendras le bus demain matin. »',
    options:['Vous prendrez le bus demain matin.','Vous prenez le bus demain matin.','Vous prendrez le bus demain matin ?','Vous prendriez le bus demain matin.'],
    answer:'Vous prendrez le bus demain matin.',
    hint:'Au futur simple, « vous » → terminaison -rez.',
    explanation:'<i>Tu prendras → vous <b>prendrez</b></i> : même temps (futur simple), terminaison <i>-rez</i> pour <i>vous</i>. Le vouvoiement garde le même registre temporel.' }),

  // ── g9fr-transformation : temps_verbaux extra (1) ────────────────────────

  makeMCQ({ id:'g9fr-pi-029', chapterId:'g9fr-transformation', subsection:'temps_verbaux', difficulty:3,
    question:'Mets au plus-que-parfait : « Elle arrive en retard à la réunion. »',
    options:['Elle était arrivée en retard à la réunion.','Elle a été arrivée en retard à la réunion.','Elle avait arrivé en retard à la réunion.','Elle sera arrivée en retard à la réunion.'],
    answer:'Elle était arrivée en retard à la réunion.',
    hint:'« Arriver » se conjugue avec « être » ; le participe s\'accorde avec le sujet féminin.',
    explanation:'<i>Arriver</i> prend l\'auxiliaire <b>être</b> au plus-que-parfait : <i>elle <b>était arrivée</b></i>. Le participe <i>arrivée</i> s\'accorde avec le sujet féminin singulier.' }),

  // ── g9fr-transformation : pronominalisation extra (1) ────────────────────

  makeMCQ({ id:'g9fr-pi-030', chapterId:'g9fr-transformation', subsection:'pronominalisation', difficulty:2,
    question:'Remplace « au marché » par le pronom adverbial correct :\n« Elle va au marché chaque samedi. »',
    options:['Elle y va chaque samedi.','Elle en va chaque samedi.','Elle lui va chaque samedi.','Elle le va chaque samedi.'],
    answer:'Elle y va chaque samedi.',
    hint:'« Y » remplace un complément de lieu introduit par « à ».',
    explanation:'<b>Y</b> remplace les compléments de lieu (<i>au marché</i> = à + lieu) : <i>elle <b>y</b> va chaque samedi</i>.' }),

  // ── g9fr-vocabulaire : traits_caractere (3) ──────────────────────────────

  makeMCQ({ id:'g9fr-pi-031', chapterId:'g9fr-vocabulaire', subsection:'traits_caractere', difficulty:1,
    question:'Quel mot décrit le mieux quelqu\'un qui arrive toujours à l\'heure ?',
    options:['ponctuel','paresseux','bavard','distrait'],
    answer:'ponctuel',
    hint:'Ce mot vient du latin « punctum » (point, moment précis).',
    explanation:'<b>Ponctuel</b> qualifie une personne qui respecte les horaires. <i>Paresseux</i> = qui n\'aime pas travailler ; <i>bavard</i> = qui parle beaucoup ; <i>distrait</i> = qui manque d\'attention.' }),

  makeMCQ({ id:'g9fr-pi-032', chapterId:'g9fr-vocabulaire', subsection:'traits_caractere', difficulty:2,
    question:'Laquelle de ces phrases décrit quelqu\'un de <b>généreux</b> ?',
    options:['Il partage ses affaires sans hésitation.','Il garde tout pour lui.','Il ne sourit jamais.','Il oublie toujours ses affaires.'],
    answer:'Il partage ses affaires sans hésitation.',
    hint:'La générosité, c\'est donner librement.',
    explanation:'<b>Généreux</b> → qui donne volontiers, partage avec les autres sans attendre de retour. Les autres options décrivent l\'avarice, la froideur ou l\'étourderie.' }),

  makeMCQ({ id:'g9fr-pi-033', chapterId:'g9fr-vocabulaire', subsection:'traits_caractere', difficulty:2,
    question:'Le mot « gentillesse » exprime :',
    options:['la bonté et la bienveillance envers autrui','la peur de parler en public','la capacité à mémoriser rapidement','la tendance à se mettre en colère'],
    answer:'la bonté et la bienveillance envers autrui',
    hint:'Ce mot est de la même famille que « gentil ».',
    explanation:'<b>La gentillesse</b> désigne la qualité de quelqu\'un de gentil : aimable, bienveillant, attentionné envers les autres.' }),

  // ── g9fr-vocabulaire : verbes_action (2) ─────────────────────────────────

  makeMCQ({ id:'g9fr-pi-034', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'Quel verbe signifie « rendre plus grand ou plus important » ?',
    options:['augmenter','diminuer','épuiser','ralentir'],
    answer:'augmenter',
    hint:'Ce verbe est souvent utilisé en économie pour parler des prix ou des salaires.',
    explanation:'<b>Augmenter</b> = rendre ou devenir plus grand, plus élevé. <i>Diminuer</i> est le contraire ; <i>épuiser</i> = vider les forces ; <i>ralentir</i> = aller moins vite.' }),

  makeMCQ({ id:'g9fr-pi-035', chapterId:'g9fr-vocabulaire', subsection:'verbes_action', difficulty:2,
    question:'Dans la phrase « Les coureurs sont épuisés après la course », le mot « épuisés » signifie :',
    options:['très fatigués','très rapides','très contents','très concentrés'],
    answer:'très fatigués',
    hint:'Ce mot vient du verbe « épuiser » — vider complètement.',
    explanation:'<b>Épuisé</b> signifie extrêmement fatigué, sans énergie. Racine : <i>épuiser</i> = vider (comme une source d\'eau).' }),

  // ── g9fr-vocabulaire : adjectifs_qualificatifs (3) ───────────────────────

  makeMCQ({ id:'g9fr-pi-036', chapterId:'g9fr-vocabulaire', subsection:'adjectifs_qualificatifs', difficulty:1,
    question:'Quel adjectif décrit une personne triste qui fait pleurer les autres ?',
    options:['émouvant','amusant','reposant','bruyant'],
    answer:'émouvant',
    hint:'Ce mot vient du verbe « émouvoir ».',
    explanation:'<b>Émouvant</b> décrit ce qui touche profondément, qui provoque des larmes ou de la tristesse. <i>Amusant</i> = qui fait rire ; <i>reposant</i> = qui détend ; <i>bruyant</i> = qui fait du bruit.' }),

  makeMCQ({ id:'g9fr-pi-037', chapterId:'g9fr-vocabulaire', subsection:'adjectifs_qualificatifs', difficulty:2,
    question:'Choisis le bon adjectif : « Ce film est très .......... ; tout le monde l\'a adoré. »',
    options:['captivant','ennuyeux','déprimant','confus'],
    answer:'captivant',
    hint:'Un film que « tout le monde a adoré » est forcément positif.',
    explanation:'<b>Captivant</b> = qui retient toute l\'attention, fascinant. Le contexte positif (tout le monde l\'a adoré) exclut les adjectifs négatifs.' }),

  makeMCQ({ id:'g9fr-pi-038', chapterId:'g9fr-vocabulaire', subsection:'adjectifs_qualificatifs', difficulty:2,
    question:'Quel adjectif est le synonyme de « courageux » ?',
    options:['valeureux','timide','prudent','faible'],
    answer:'valeureux',
    hint:'Ce mot d\'origine médiévale désigne celui qui a de la valeur au combat.',
    explanation:'<b>Valeureux</b> = courageux, vaillant, qui fait preuve de bravoure. <i>Timide</i> et <i>faible</i> sont des antonymes ; <i>prudent</i> désigne autre chose.' }),

  // ── g9fr-vocabulaire : notions_abstraites (2) ────────────────────────────

  makeMCQ({ id:'g9fr-pi-039', chapterId:'g9fr-vocabulaire', subsection:'notions_abstraites', difficulty:2,
    question:'Quelle notion abstraite correspond à « le fait d\'être juste et impartial » ?',
    options:['l\'équité','la fierté','la méfiance','l\'ambition'],
    answer:'l\'équité',
    hint:'Ce mot est de la même famille que « équitable ».',
    explanation:'<b>L\'équité</b> désigne le principe de justice qui respecte les droits de chacun de façon impartiale. <i>La fierté</i> = sentiment d\'orgueil positif ; <i>la méfiance</i> = manque de confiance.' }),

  makeMCQ({ id:'g9fr-pi-040', chapterId:'g9fr-vocabulaire', subsection:'notions_abstraites', difficulty:2,
    question:'Dans le texte suivant, quel sentiment éprouve Leila ?\n« Leila a obtenu la meilleure note de la classe. Elle se sent sur un nuage. »',
    options:['la fierté','la honte','l\'inquiétude','la tristesse'],
    answer:'la fierté',
    hint:'« Être sur un nuage » est une expression positive.',
    explanation:'<b>Être sur un nuage</b> = être très heureux, euphorique. Dans ce contexte de succès scolaire, le sentiment principal est <b>la fierté</b>.' }),

  // ── g9fr-doc-authentique (10) ────────────────────────────────────────────
  // Document 1 : courriel (Q41-43)

  makeMCQ({ id:'g9fr-pi-041', chapterId:'g9fr-doc-authentique', subsection:'courriel', difficulty:1,
    question:`Lis ce courriel, puis réponds à la question.<br><br>
<blockquote style="border-left:3px solid #888;padding:0.5em 1em;font-style:italic">
<b>De :</b> priya.ramsamy@ecole-phoenix.mu<br>
<b>À :</b> direction@ecole-phoenix.mu<br>
<b>Objet :</b> Demande d'autorisation — sortie pédagogique<br><br>
Madame, Monsieur,<br>
Je me permets de vous contacter au sujet de la sortie pédagogique prévue le 15 octobre prochain au Jardin Botanique de Pamplemousses. Je souhaite obtenir votre autorisation officielle afin de confirmer la réservation du car scolaire. La participation de 28 élèves de 9<sup>e</sup> est attendue.<br>
Dans l'attente de votre réponse, veuillez agréer mes cordiales salutations.<br>
<i>Priya Ramsamy, enseignante de Sciences</i>
</blockquote><br>
Qui est l'expéditeur de ce courriel ?`,
    options:['Priya Ramsamy, enseignante de Sciences','Le directeur de l\'école','Un élève de 9e','Le chauffeur du car scolaire'],
    answer:'Priya Ramsamy, enseignante de Sciences',
    hint:'L\'expéditeur figure dans le champ « De ».',
    explanation:'Le champ <b>De</b> indique l\'expéditeur : <i>priya.ramsamy@ecole-phoenix.mu</i>, identifiée en signature comme <b>Priya Ramsamy, enseignante de Sciences</b>.' }),

  makeMCQ({ id:'g9fr-pi-042', chapterId:'g9fr-doc-authentique', subsection:'role_emetteur_destinataire', difficulty:1,
    question:`Lis le même courriel (voir ci-dessus, question 41), puis réponds.<br><br>
Quel est l'objet principal de ce courriel ?`,
    options:['Demander l\'autorisation pour une sortie pédagogique','Commander des livres scolaires','Annoncer les résultats d\'un examen','Réserver une salle de classe'],
    answer:'Demander l\'autorisation pour une sortie pédagogique',
    hint:'L\'objet du courriel est indiqué explicitement dans le champ « Objet ».',
    explanation:'Le champ <b>Objet</b> l\'indique clairement : <i>Demande d\'autorisation — sortie pédagogique</i>. La demande porte sur la sortie au Jardin Botanique.' }),

  makeMCQ({ id:'g9fr-pi-043', chapterId:'g9fr-doc-authentique', subsection:'reperage_explicite', difficulty:1,
    question:`Lis le même courriel (voir ci-dessus, question 41), puis réponds.<br><br>
Combien d'élèves sont attendus pour la sortie ?`,
    options:['28','30','25','15'],
    answer:'28',
    hint:'L\'information est mentionnée explicitement dans le corps du courriel.',
    explanation:'L\'enseignante précise : <i>« La participation de <b>28 élèves</b> de 9<sup>e</sup> est attendue. »</i>' }),

  // Document 2 : fiche infographie (Q44-46)

  makeMCQ({ id:'g9fr-pi-044', chapterId:'g9fr-doc-authentique', subsection:'fiche_infographie', difficulty:2,
    question:`Lis cette fiche, puis réponds.<br><br>
<blockquote style="border-left:3px solid #888;padding:0.5em 1em">
<b>🌿 La Semaine Verte de l'École Phoenix — 18 au 22 novembre</b><br>
• <b>Lundi :</b> Plantation d'arbres dans la cour — 9h00<br>
• <b>Mardi :</b> Atelier recyclage et création d'objets (bouteilles, cartons) — 10h00<br>
• <b>Mercredi :</b> Projection du documentaire <i>Notre Planète</i> — 14h00<br>
• <b>Jeudi :</b> Concours de dessin « Protège ton île » — toute la journée<br>
• <b>Vendredi :</b> Marché vert : vente de produits locaux et bio — 8h00 à 13h00<br>
<i>Entrée libre pour tous les élèves.</i>
</blockquote><br>
Quel événement a lieu le mercredi ?`,
    options:['La projection d\'un documentaire','La plantation d\'arbres','Le marché vert','Le concours de dessin'],
    answer:'La projection d\'un documentaire',
    hint:'Repère le jour de la semaine dans la fiche.',
    explanation:'La fiche indique clairement : <b>Mercredi</b> : Projection du documentaire <i>Notre Planète</i> — 14h00.' }),

  makeMCQ({ id:'g9fr-pi-045', chapterId:'g9fr-doc-authentique', subsection:'reponses_multiples', difficulty:2,
    question:`D'après la fiche (question 44), quelle affirmation est correcte ?`,
    options:['Le marché vert a lieu le vendredi matin.','Le concours de dessin dure une heure.','La plantation d\'arbres est payante.','Le documentaire se déroule le mardi.'],
    answer:'Le marché vert a lieu le vendredi matin.',
    hint:'Vérifie les horaires du vendredi.',
    explanation:'La fiche précise : <i>Vendredi : Marché vert … <b>8h00 à 13h00</b></i> — c\'est bien le matin. Les autres affirmations contredisent la fiche.' }),

  makeMCQ({ id:'g9fr-pi-046', chapterId:'g9fr-doc-authentique', subsection:'reperage_explicite', difficulty:1,
    question:`D'après la fiche (question 44), qui peut participer à la Semaine Verte ?`,
    options:['Tous les élèves — l\'entrée est libre','Uniquement les élèves de 9e','Les enseignants seulement','Les parents sur inscription'],
    answer:'Tous les élèves — l\'entrée est libre',
    hint:'La dernière ligne de la fiche le précise.',
    explanation:'La fiche se termine par : <i>« <b>Entrée libre pour tous les élèves.</b> »</i> — aucune restriction de classe ni d\'inscription n\'est mentionnée.' }),

  // Document 3 : courriel commerce (Q47-50)

  makeMCQ({ id:'g9fr-pi-047', chapterId:'g9fr-doc-authentique', subsection:'courriel', difficulty:2,
    question:`Lis ce courriel, puis réponds.<br><br>
<blockquote style="border-left:3px solid #888;padding:0.5em 1em;font-style:italic">
<b>De :</b> boutique.ile@gmail.com<br>
<b>À :</b> anaya.gobin@gmail.com<br>
<b>Objet :</b> Confirmation de commande n° 2847<br><br>
Chère Mme Gobin,<br>
Nous confirmons la réception de votre commande n° 2847 passée le 5 septembre. Votre colis contenant 2 sacs en tissu et 1 lampe de bureau (montant total : Rs 1 450) sera expédié dans un délai de 3 jours ouvrables. Vous recevrez un email avec le numéro de suivi dès l\'expédition.<br>
Cordialement,<br>
<i>L\'équipe Boutique de l\'Île</i>
</blockquote><br>
Quel est le montant total de la commande ?`,
    options:['Rs 1 450','Rs 1 045','Rs 2 847','Rs 450'],
    answer:'Rs 1 450',
    hint:'Le montant est mentionné entre parenthèses dans le courriel.',
    explanation:'Le courriel précise : <i>« montant total : <b>Rs 1 450</b> »</i>. Rs 2 847 est le numéro de commande, pas un montant.' }),

  makeMCQ({ id:'g9fr-pi-048', chapterId:'g9fr-doc-authentique', subsection:'reperage_explicite', difficulty:1,
    question:`D'après le courriel de la question 47, quels articles ont été commandés ?`,
    options:['2 sacs en tissu et 1 lampe de bureau','1 sac en tissu et 2 lampes de bureau','3 sacs en tissu','1 sac et 1 livre'],
    answer:'2 sacs en tissu et 1 lampe de bureau',
    hint:'Les articles sont listés dans le corps du message.',
    explanation:'Le courriel mentionne explicitement : <i>« votre colis contenant <b>2 sacs en tissu et 1 lampe de bureau</b> »</i>.' }),

  makeMCQ({ id:'g9fr-pi-049', chapterId:'g9fr-doc-authentique', subsection:'role_emetteur_destinataire', difficulty:1,
    question:`D'après le courriel de la question 47, qui est le destinataire ?`,
    options:['Mme Gobin','L\'équipe Boutique de l\'Île','Le livreur','Un inconnu'],
    answer:'Mme Gobin',
    hint:'Regarde le champ « À ».',
    explanation:'Le champ <b>À</b> indique <i>anaya.gobin@gmail.com</i>, et la salutation confirme : <i>« Chère <b>Mme Gobin</b> »</i>.' }),

  makeMCQ({ id:'g9fr-pi-050', chapterId:'g9fr-doc-authentique', subsection:'reponses_multiples', difficulty:2,
    question:`D'après le courriel de la question 47, dans quel délai le colis sera-t-il expédié ?`,
    options:['Dans 3 jours ouvrables','Dans 5 jours ouvrables','Le lendemain','Immédiatement'],
    answer:'Dans 3 jours ouvrables',
    hint:'Le délai est précisé dans le corps du courriel.',
    explanation:'Le courriel précise : <i>« sera expédié dans un délai de <b>3 jours ouvrables</b> »</i>.' }),

  // ── g9fr-formation-mots (10) ─────────────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-051', chapterId:'g9fr-formation-mots', subsection:'nominalisation', difficulty:2,
    question:'Quelle est la forme nominale du verbe « manger » ?',
    options:['la nourriture / le repas','mangeant','mangeable','mangeur'],
    answer:'la nourriture / le repas',
    hint:'On cherche un nom, pas un adjectif ou un participe.',
    explanation:'La <b>nominalisation</b> transforme un verbe en nom. <i>Manger</i> → <b>le repas</b> / <b>la nourriture</b>. « Mangeable » est un adjectif, « mangeur » désigne la personne.' }),

  makeMCQ({ id:'g9fr-pi-052', chapterId:'g9fr-formation-mots', subsection:'nominalisation', difficulty:2,
    question:'Quelle est la nominalisation correcte du verbe « améliorer » ?',
    options:['l\'amélioration','améliorable','amélioré','améliorant'],
    answer:'l\'amélioration',
    hint:'Le suffixe « -tion » crée souvent des noms féminins à partir de verbes.',
    explanation:'<b>Améliorer → l\'amélioration</b> (suffixe <i>-tion</i>). « Améliorable » est adjectif ; « amélioré » est un participe passé ; « améliorant » est un participe présent.' }),

  makeMCQ({ id:'g9fr-pi-053', chapterId:'g9fr-formation-mots', subsection:'formation_adjectif', difficulty:2,
    question:'Forme un adjectif à partir du nom « courage » :\n« C\'est une fille très .......... »',
    options:['courageuse','courageux','couragée','courageon'],
    answer:'courageuse',
    hint:'Le sujet est féminin — l\'adjectif doit s\'accorder.',
    explanation:'<b>Courage → courageux</b> (masculin), <b>courageuse</b> (féminin). Le sujet <i>fille</i> est féminin : on emploie <b>courageuse</b>.' }),

  makeMCQ({ id:'g9fr-pi-054', chapterId:'g9fr-formation-mots', subsection:'formation_adjectif', difficulty:2,
    question:'Quel adjectif peut être formé à partir du nom « danger » ?',
    options:['dangereux','dangeral','dangé','dangerant'],
    answer:'dangereux',
    hint:'Le suffixe « -eux/-euse » crée des adjectifs à partir de certains noms.',
    explanation:'<b>Danger → dangereux</b> (suffixe <i>-eux</i>). Les autres formes n\'existent pas en français standard.' }),

  makeMCQ({ id:'g9fr-pi-055', chapterId:'g9fr-formation-mots', subsection:'formation_adverbe', difficulty:2,
    question:'Forme l\'adverbe à partir de l\'adjectif « lent » :\n« Elle parle .......... »',
    options:['lentement','lentement','lentement','lentment'],
    answer:'lentement',
    hint:'L\'adverbe de manière se forme en ajoutant « -ment » au féminin de l\'adjectif.',
    explanation:'<i>Lent</i> → féminin <i>lente</i> → adverbe <b>lentement</b>. Règle générale : adjectif féminin + <i>-ment</i>.' }),

  makeMCQ({ id:'g9fr-pi-056', chapterId:'g9fr-formation-mots', subsection:'formation_adverbe', difficulty:2,
    question:'Quel adverbe est formé correctement à partir de « violent » ?',
    options:['violemment','violentement','violemmement','violément'],
    answer:'violemment',
    hint:'Les adjectifs en « -ent » forment leur adverbe avec « -emment ».',
    explanation:'<b>Violent</b> (terminaison <i>-ent</i>) → adverbe <b>violemment</b> (suffixe <i>-emment</i>). Exception à la règle générale : <i>violente + ment</i> → <i>violemment</i>.' }),

  makeMCQ({ id:'g9fr-pi-057', chapterId:'g9fr-formation-mots', subsection:'noms_de_personne', difficulty:2,
    question:'Quel nom désigne la personne qui enseigne ?',
    options:['l\'enseignant','l\'enseignement','l\'enseigné','l\'enseignation'],
    answer:'l\'enseignant',
    hint:'Le suffixe « -ant » crée souvent des noms de personnes à partir de verbes.',
    explanation:'<b>Enseigner → l\'enseignant(e)</b> (participe présent substantivé = nom de personne). <i>L\'enseignement</i> désigne l\'action ou la discipline, pas la personne.' }),

  makeMCQ({ id:'g9fr-pi-058', chapterId:'g9fr-formation-mots', subsection:'noms_de_personne', difficulty:2,
    question:'Quel nom désigne la personne qui dirige une école ?',
    options:['le directeur','la direction','le diriger','le directif'],
    answer:'le directeur',
    hint:'Le suffixe « -eur/-teur » crée des noms de personnes à partir de verbes.',
    explanation:'<b>Diriger → le directeur / la directrice</b> : nom d\'agent (personne qui accomplit l\'action). <i>La direction</i> désigne la fonction ou le service, pas la personne.' }),

  makeMCQ({ id:'g9fr-pi-059', chapterId:'g9fr-formation-mots', subsection:'formation_verbe', difficulty:2,
    question:'Forme un verbe à partir du nom « modernisation » :\n« Il faut .......... ce quartier. »',
    options:['moderniser','modernification','moderner','modernisater'],
    answer:'moderniser',
    hint:'Le verbe correspondant à « modernisation » se construit avec le suffixe « -iser ».',
    explanation:'<b>Modernisation → moderniser</b> (verbe en <i>-iser</i>). La modernisation est l\'action de moderniser.' }),

  makeMCQ({ id:'g9fr-pi-060', chapterId:'g9fr-formation-mots', subsection:'formation_verbe', difficulty:2,
    question:'Quel verbe peut être formé à partir de l\'adjectif « propre » ?',
    options:['nettoyer / propre → propreté mais le verbe est : nettoyer','proprier','proprifier','proprement'],
    answer:'nettoyer / propre → propreté mais le verbe est : nettoyer',
    hint:'On cherche l\'action liée à la propreté.',
    explanation:'En français, <i>propre</i> → <b>nettoyer</b> est la relation verbale courante (rendre propre). « Proprement » est un adverbe ; les autres formes n\'existent pas.' }),

  // ── g9fr-correction (10) ─────────────────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-061', chapterId:'g9fr-correction', subsection:'homophones', difficulty:2,
    question:'Choisis la forme correcte :\n« Les élèves ont fait .......... travail. »',
    options:['leur','leurs','l\'heure','eux'],
    answer:'leur',
    hint:'Devant un nom singulier, « leur » est adjectif possessif et ne prend pas de « s ».',
    explanation:'<b>Leur</b> adjectif possessif pluriel s\'accorde avec le possesseur (plusieurs élèves) mais pas avec le nom possédé : <i>leur <b>travail</b></i> (singulier). « Leurs » s\'emploie devant un nom pluriel : <i>leurs travaux</i>.' }),

  makeMCQ({ id:'g9fr-pi-062', chapterId:'g9fr-correction', subsection:'homophones', difficulty:2,
    question:'Choisis la forme correcte :\n« Je ne sais pas .......... elle viendra ce soir. »',
    options:['si','s\'y','ci','sy'],
    answer:'si',
    hint:'On cherche la conjonction qui introduit une interrogation indirecte.',
    explanation:'<b>Si</b> (conjonction) introduit une interrogation indirecte : <i>je ne sais pas <b>si</b> elle viendra</i>. « S\'y » = pronom réfléchi + adverbe de lieu ; « ci » est un adverbe de lieu.' }),

  makeMCQ({ id:'g9fr-pi-063', chapterId:'g9fr-correction', subsection:'accords', difficulty:2,
    question:'Dans la phrase suivante, quel mot contient une erreur d\'accord ?\n« Les professeurs que nous avons rencontrés hier étaient très sympathiques. »',
    options:['Aucune erreur — la phrase est correcte.','rencontrés','sympathiques','professeurs'],
    answer:'Aucune erreur — la phrase est correcte.',
    hint:'Vérifie l\'accord du participe passé et des adjectifs.',
    explanation:'<i>Rencontrés</i> : COD « les professeurs » (masculin pluriel) placé avant → accord <i>-és</i> correct. <i>Sympathiques</i> s\'accorde avec <i>professeurs</i> (masculin pluriel) → correct. La phrase est bien construite.' }),

  makeMCQ({ id:'g9fr-pi-064', chapterId:'g9fr-correction', subsection:'accords', difficulty:2,
    question:'Repère l\'erreur d\'accord et choisis la correction :\n« Les nouvelles règles du jeu est compliquées. »',
    options:['sont','était','a été','sera'],
    answer:'sont',
    hint:'Le verbe doit s\'accorder avec le sujet « les nouvelles règles ».',
    explanation:'Le sujet réel est <b>les nouvelles règles</b> (féminin pluriel) — le verbe doit être au pluriel : <b>sont</b>. « Du jeu » est un complément du nom, pas le sujet.' }),

  makeMCQ({ id:'g9fr-pi-065', chapterId:'g9fr-correction', subsection:'participe_infinitif', difficulty:3,
    question:'Choisis la forme correcte :\n« Après .......... le repas, ils ont regardé un film. »',
    options:['avoir mangé','mangé','manger','mangeant'],
    answer:'avoir mangé',
    hint:'Après la préposition « après », on emploie l\'infinitif passé.',
    explanation:'Après <b>après</b>, on emploie toujours l\'<b>infinitif passé</b> (avoir/être + participe passé) : <i>après <b>avoir mangé</b></i>. L\'infinitif présent (<i>manger</i>) est incorrect ici.' }),

  makeMCQ({ id:'g9fr-pi-066', chapterId:'g9fr-correction', subsection:'participe_infinitif', difficulty:3,
    question:'Choisis la forme correcte :\n« Je les entends .......... dans la cuisine. »',
    options:['chanter','chantant','chanté','chantée'],
    answer:'chanter',
    hint:'Après un verbe de perception, on emploie l\'infinitif.',
    explanation:'Les <b>verbes de perception</b> (entendre, voir, sentir…) sont suivis d\'un <b>infinitif</b> : <i>je les entends <b>chanter</b></i>. Le gérondif (<i>chantant</i>) serait incorrect ici.' }),

  makeMCQ({ id:'g9fr-pi-067', chapterId:'g9fr-correction', subsection:'orthographe_accents', difficulty:2,
    question:'Quelle est la graphie correcte ?',
    options:['événement','évènement','évenement','evenement'],
    answer:'événement',
    hint:'En français standard (académique), ce mot prend deux accents aigus sur les deux premiers « é ».',
    explanation:'La graphie académique correcte est <b>événement</b> (é-vé-nement). Bien que l\'orthographe rectifiée de 1990 propose <i>évènement</i>, la forme traditionnelle reste attendue aux examens.' }),

  makeMCQ({ id:'g9fr-pi-068', chapterId:'g9fr-correction', subsection:'orthographe_accents', difficulty:2,
    question:'Quelle est la graphie correcte du mot signifiant « l\'action d\'intéresser » ?',
    options:['l\'intérêt','l\'interêt','l\'interèt','l\'interest'],
    answer:'l\'intérêt',
    hint:'Ce mot prend un accent circomflexe sur le deuxième « e ».',
    explanation:'<b>L\'intérêt</b> : accent aigu sur le premier <i>é</i>, et accent circonflexe sur le deuxième <i>ê</i>. Une des orthographes les plus souvent mal écrites.' }),

  makeMCQ({ id:'g9fr-pi-069', chapterId:'g9fr-correction', subsection:'determinants', difficulty:2,
    question:'Choisis le déterminant correct :\n« .......... ancienne directrice a pris sa retraite. »',
    options:['L\'','La','Le','Les'],
    answer:'L\'',
    hint:'Devant un mot commençant par une voyelle, l\'article défini s\'élide.',
    explanation:'Devant <i>ancienne</i> (commence par une voyelle), l\'article <b>la</b> devient <b>l\'</b> (élision). <i>La ancienne</i> est impossible en français : deux voyelles en contact créent l\'hiatus.' }),

  makeMCQ({ id:'g9fr-pi-070', chapterId:'g9fr-correction', subsection:'determinants', difficulty:2,
    question:'Repère et corrige l\'erreur dans : « Il a bu du eaux minérale. »',
    options:['Il a bu de l\'eau minérale.','Il a bu des eaux minérale.','Il a bu du eau minérale.','Il a bu de l\'eaux minérale.'],
    answer:'Il a bu de l\'eau minérale.',
    hint:'L\'article partitif féminin devant une voyelle s\'élide.',
    explanation:'<i>Eau</i> est un nom féminin singulier commençant par une voyelle : l\'article partitif est <b>de l\'</b>. De plus, <i>eau</i> (singulier) + <i>minérale</i> (féminin singulier) est la forme correcte.' }),

  // ── g9fr-textes-trous (10) ───────────────────────────────────────────────

  makeMCQ({ id:'g9fr-pi-071', chapterId:'g9fr-textes-trous', subsection:'prepositions', difficulty:1,
    question:'Complète avec la bonne préposition :\n« Il est parti .......... le matin sans prévenir personne. »',
    options:['dès','depuis','jusqu\'à','pendant'],
    answer:'dès',
    hint:'On cherche une préposition indiquant « à partir de » un moment précis.',
    explanation:'<b>Dès</b> indique un point de départ immédiat dans le temps : <i>dès le matin</i> = à partir du tout début de la matinée.' }),

  makeMCQ({ id:'g9fr-pi-072', chapterId:'g9fr-textes-trous', subsection:'pronoms_relatifs', difficulty:2,
    question:'Complète avec le pronom relatif correct :\n« C\'est une situation .......... je ne suis pas habitué. »',
    options:['à laquelle','laquelle','que','qui'],
    answer:'à laquelle',
    hint:'Le verbe « être habitué » se construit avec la préposition « à ».',
    explanation:'<i>Être habitué à</i> quelque chose → le pronom relatif reprend la préposition : <b>à laquelle</b>. « Que » serait pour un COD sans préposition.' }),

  makeMCQ({ id:'g9fr-pi-073', chapterId:'g9fr-textes-trous', subsection:'determinants', difficulty:1,
    question:'Complète avec l\'article correct :\n« Il mange .......... pain à chaque repas. »',
    options:['du','un','le','de'],
    answer:'du',
    hint:'On parle d\'une quantité indéfinie — c\'est l\'article partitif.',
    explanation:'<b>Du</b> est l\'article partitif masculin singulier : <i>manger <b>du</b> pain</i> = une quantité non définie de pain. « Un pain » serait un pain entier (indéfini singulier).' }),

  makeMCQ({ id:'g9fr-pi-074', chapterId:'g9fr-textes-trous', subsection:'conjonctions', difficulty:2,
    question:'Complète avec la bonne conjonction :\n« Il a réussi .......... il n\'avait pas beaucoup révisé. »',
    options:['bien que','parce que','puisque','afin que'],
    answer:'bien que',
    hint:'On note un contraste entre le succès et le peu de révision.',
    explanation:'<b>Bien que</b> (+ subjonctif) exprime la concession — un résultat inattendu par rapport aux circonstances. « Parce que » et « puisque » exprimeraient une cause, pas un contraste.' }),

  makeMCQ({ id:'g9fr-pi-075', chapterId:'g9fr-textes-trous', subsection:'adverbes_negation', difficulty:2,
    question:'Complète avec la négation correcte :\n« Je n\'ai .......... mangé aussi bien de ma vie ! »',
    options:['jamais','pas','plus','rien'],
    answer:'jamais',
    hint:'On exprime qu\'à aucun autre moment on n\'a mangé aussi bien.',
    explanation:'<b>Ne … jamais</b> = à aucun moment. <i>Je n\'ai <b>jamais</b> mangé aussi bien</i> est une hyperbole positive. « Pas » et « plus » n\'expriment pas l\'idée de « en aucune autre occasion ».' }),

  makeMCQ({ id:'g9fr-pi-076', chapterId:'g9fr-textes-trous', subsection:'verbes_contexte', difficulty:2,
    question:'Complète avec le verbe correctement conjugué :\n« Hier, lorsque je .......... dans la rue, j\'ai glissé. »',
    options:['marchais','marchai','marchais','marche'],
    answer:'marchais',
    hint:'L\'imparfait décrit une action en cours interrompue par une autre au passé composé.',
    explanation:'<i>Lorsque je marchais</i> (imparfait : action en cours) + <i>j\'ai glissé</i> (passé composé : action ponctuelle qui interrompt). Ce schéma temporel est fondamental en français.' }),

  makeMCQ({ id:'g9fr-pi-077', chapterId:'g9fr-textes-trous', subsection:'prepositions', difficulty:2,
    question:'Complète avec la préposition correcte :\n« Ce roman a été écrit .......... Victor Hugo. »',
    options:['par','de','à','avec'],
    answer:'par',
    hint:'À la voix passive, l\'agent est introduit par « par » ou « de ».',
    explanation:'À la voix passive, l\'agent s\'introduit généralement avec <b>par</b> pour une action dynamique : <i>écrit <b>par</b> Victor Hugo</i>. « De » s\'emploie surtout pour des états : <i>aimé de tous</i>.' }),

  makeMCQ({ id:'g9fr-pi-078', chapterId:'g9fr-textes-trous', subsection:'pronoms_relatifs', difficulty:2,
    question:'Complète avec le pronom relatif correct :\n« L\'élève .......... la rédaction a été sélectionnée est très fière. »',
    options:['dont','qui','que','lequel'],
    answer:'dont',
    hint:'Le verbe sélectionner se construit avec « de » : « la rédaction de qui ».',
    explanation:'<b>Dont</b> remplace un complément introduit par <i>de</i> : <i>la rédaction de l\'élève → l\'élève <b>dont</b> la rédaction</i>. « Qui » est sujet, « que » est COD.' }),

  makeMCQ({ id:'g9fr-pi-079', chapterId:'g9fr-textes-trous', subsection:'conjonctions', difficulty:2,
    question:'Complète avec la conjonction correcte :\n« Travaille sérieusement .......... tu réussisses à l\'examen. »',
    options:['pour que','parce que','tandis que','alors que'],
    answer:'pour que',
    hint:'On cherche une conjonction de but suivie du subjonctif.',
    explanation:'<b>Pour que</b> (+ subjonctif) exprime le but : <i>travaille <b>pour que</b> tu réussisses</i>. « Parce que » indique la cause ; « tandis que » et « alors que » marquent l\'opposition.' }),

  makeMCQ({ id:'g9fr-pi-080', chapterId:'g9fr-textes-trous', subsection:'determinants', difficulty:2,
    question:'Complète avec le déterminant correct :\n« Elle a .......... patience infinie avec ses jeunes élèves. »',
    options:['une','la','de la','des'],
    answer:'une',
    hint:'On qualifie et individualise la patience — article indéfini singulier.',
    explanation:'<b>Une patience infinie</b> : l\'article indéfini singulier <b>une</b> est utilisé car on attribue une qualité spécifique (infinie) à un nom abstrait. « De la patience » serait sans l\'adjectif qualifiant.' })

);
})();
