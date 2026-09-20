'use strict';
// Grade 5 Français - les six points de la liste « LA GRAMMAIRE / Grade 5 » que
// le pack n'interrogeait pas.
//
// ⚠ POURQUOI CE FICHIER. scripts/fact-ledgers/grade5-french.json est bâti sur la
//   liste du Grade 5 du syllabus MIE (page imprimée 21). Sur 2 429 questions,
//   six points n'avaient AUCUNE question derrière eux, et il s'agit d'une famille
//   entière : celle du participe.
//     « imperatif » : zéro. « participe present » : zéro. « adjectif verbal » :
//     zéro. « sans auxiliaire » : zéro. « pronom complement » : zéro.
//     « complement du nom » : zéro.
//
// ⚠ Aucune nouvelle sous-section : conjugaison, divers, accord_participe,
//   cod_coi et personnels sont toutes déjà déclarées dans _manifest.js.
//
// IDs : g5fr-syl-001 et suivants.

STATIC_QUESTIONS.push(

  // ── Le mode impératif ───────────────────────────────────────────────────
  makeMCQ({ id:'g5fr-syl-001', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:1,
    question:'À quoi sert le mode <b>impératif</b> ?',
    options:['À donner un ordre','À raconter une histoire longue','À poser une question précise','À décrire un lieu connu'],
    answer:'À donner un ordre',
    hint:'Pense à une recette : « Mélangez, ajoutez, versez. »',
    explanation:'L&rsquo;<b>impératif</b> sert à donner un ordre, un conseil ou une consigne. Le sujet n&rsquo;est pas exprimé.' }),

  makeMCQ({ id:'g5fr-syl-002', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:2,
    question:'Quelle est la particularité d&rsquo;une phrase à l&rsquo;<b>impératif</b> ?',
    options:['Le sujet n&rsquo;est pas écrit','Le verbe est à l&rsquo;infinitif','Elle se termine par un point-virgule','Elle contient toujours « si »'],
    answer:'Le sujet n&rsquo;est pas écrit',
    hint:'Compare « Tu fermes la porte. » et « Ferme la porte. »',
    explanation:'À l&rsquo;impératif le <b>sujet disparaît</b> : on dit « Ferme la porte », pas « Tu ferme la porte ».' }),

  makeMCQ({ id:'g5fr-syl-003', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:2,
    question:'Mets le verbe à l&rsquo;<b>impératif</b> (2e personne du singulier) : <i>(chanter)</i> ___ plus fort !',
    options:['Chante','Chantes','Chanter','Chantez'],
    answer:'Chante',
    hint:'Les verbes en -er perdent leur « s » à la deuxième personne.',
    explanation:'À l&rsquo;impératif, les verbes en -er s&rsquo;écrivent sans « s » à la 2e personne du singulier : <b>Chante !</b>' }),

  makeMCQ({ id:'g5fr-syl-004', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:3,
    question:'Quelles sont les trois personnes de l&rsquo;<b>impératif</b> ?',
    options:['tu, nous, vous','je, tu, il','il, elle, on','nous, vous, ils'],
    answer:'tu, nous, vous',
    hint:'On ne peut pas donner un ordre à « il » ni à « je ».',
    explanation:'L&rsquo;impératif n&rsquo;existe qu&rsquo;à trois personnes : <b>tu, nous, vous</b> &mdash; « Viens ! Venons ! Venez ! »' }),

  makeMCQ({ id:'g5fr-syl-005', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:3,
    question:'Transforme à l&rsquo;<b>impératif</b> : <i>Vous finissez votre travail.</i>',
    options:['Finissez votre travail.','Vous finissez votre travail !','Finir votre travail.','Vous finirez votre travail.'],
    answer:'Finissez votre travail.',
    hint:'On enlève le pronom sujet et on garde la forme du verbe.',
    explanation:'On supprime « vous » : <b>Finissez votre travail.</b> La forme du verbe ne change pas à la 2e personne du pluriel.' }),

  // ── Le participe présent et l'adjectif verbal ──────────────────────────
  makeMCQ({ id:'g5fr-syl-006', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:2,
    question:'Par quelle terminaison se termine toujours le <b>participe présent</b> ?',
    options:['-ant','-é','-ir','-ons'],
    answer:'-ant',
    hint:'chantant, finissant, prenant.',
    explanation:'Le <b>participe présent</b> se termine toujours par <b>-ant</b> : chantant, finissant, prenant.' }),

  makeMCQ({ id:'g5fr-syl-007', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:2,
    question:'Quel est le <b>participe présent</b> du verbe « courir » ?',
    options:['courant','couru','courra','courons'],
    answer:'courant',
    hint:'On part du radical et on ajoute -ant.',
    explanation:'Le participe présent de courir est <b>courant</b>. « Couru » est le participe passé.' }),

  makeMCQ({ id:'g5fr-syl-008', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:3,
    question:'Le <b>participe présent</b> change-t-il avec le nom auquel il se rapporte ?',
    options:['Non, il est invariable','Oui, il prend le genre','Oui, il prend le nombre','Oui, le genre et le nombre'],
    answer:'Non, il est invariable',
    hint:'« Les enfants courant dans la cour » : « courant » ne bouge pas.',
    explanation:'Le participe présent est <b>invariable</b> : on écrit « des enfants courant vite », jamais « courants ».' }),

  makeMCQ({ id:'g5fr-syl-009', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:3,
    question:'Qu&rsquo;est-ce qu&rsquo;un <b>adjectif verbal</b> ?',
    options:['Un participe devenu adjectif','Un verbe employé à l&rsquo;infinitif','Un adjectif formé sur un nom','Un adverbe terminé en -ment'],
    answer:'Un participe devenu adjectif',
    hint:'« une histoire amusante » : « amusante » vient du verbe amuser.',
    explanation:'L&rsquo;<b>adjectif verbal</b> est un participe présent employé comme adjectif. Contrairement au participe présent, il <b>s&rsquo;accorde</b> : « une histoire amusante ».' }),

  makeMCQ({ id:'g5fr-syl-010', chapterId:'fr-grammaire', subsection:'conjugaison', difficulty:4,
    question:'Dans quelle phrase « charmant » est-il un <b>adjectif verbal</b> ?',
    options:['Ce sont des enfants charmants.','Charmant ses amis, il souriait.','En charmant la foule, il gagna.','Il allait charmant tout le monde.'],
    answer:'Ce sont des enfants charmants.',
    hint:'L&rsquo;adjectif verbal s&rsquo;accorde ; le participe présent reste invariable.',
    explanation:'Dans la première phrase « charmants » prend un « s » : il décrit les enfants, c&rsquo;est donc un <b>adjectif verbal</b>. Ailleurs, « charmant » garde sa valeur de verbe et reste invariable.' }),

  // ── Le participe passé employé sans auxiliaire ─────────────────────────
  makeMCQ({ id:'g5fr-syl-011', chapterId:'g5fr-formation', subsection:'accord_participe', difficulty:2,
    question:'Avec quoi s&rsquo;accorde un <b>participe passé employé sans auxiliaire</b> ?',
    options:['Avec le nom qu&rsquo;il accompagne','Avec le sujet du verbe','Avec le complément d&rsquo;objet','Il ne s&rsquo;accorde jamais'],
    answer:'Avec le nom qu&rsquo;il accompagne',
    hint:'Sans auxiliaire, il se comporte comme un adjectif.',
    explanation:'Employé <b>sans auxiliaire</b>, le participe passé se comporte comme un adjectif : il s&rsquo;accorde en genre et en nombre avec le nom qu&rsquo;il accompagne.' }),

  makeMCQ({ id:'g5fr-syl-012', chapterId:'g5fr-formation', subsection:'accord_participe', difficulty:2,
    question:'Complète : <i>Les fleurs ___ hier sont déjà fanées.</i> (cueillir)',
    options:['cueillies','cueilli','cueillis','cueillie'],
    answer:'cueillies',
    hint:'« fleurs » est féminin pluriel, et il n&rsquo;y a pas d&rsquo;auxiliaire.',
    explanation:'Sans auxiliaire, le participe s&rsquo;accorde avec « les fleurs », féminin pluriel : <b>cueillies</b>.' }),

  makeMCQ({ id:'g5fr-syl-013', chapterId:'g5fr-formation', subsection:'accord_participe', difficulty:3,
    question:'Dans quelle phrase le participe passé est-il employé <b>sans auxiliaire</b> ?',
    options:['Fatigués, les coureurs sont rentrés.','Ils ont fini la course très vite.','Elle est partie de bonne heure.','Nous avons mangé tous ensemble.'],
    answer:'Fatigués, les coureurs sont rentrés.',
    hint:'Cherche le participe qui n&rsquo;est précédé ni de « être » ni de « avoir ».',
    explanation:'« Fatigués » n&rsquo;a ni « être » ni « avoir » devant lui : il est employé <b>sans auxiliaire</b> et s&rsquo;accorde avec « les coureurs ».' }),

  makeMCQ({ id:'g5fr-syl-014', chapterId:'g5fr-formation', subsection:'accord_participe', difficulty:4,
    question:'Complète : <i>___ par la pluie, les enfants sont rentrés.</i> (surprendre)',
    options:['Surpris','Surprise','Surprit','Surprendre'],
    answer:'Surpris',
    hint:'Le participe se rapporte à « les enfants », masculin pluriel.',
    explanation:'Sans auxiliaire, le participe s&rsquo;accorde avec « les enfants » : <b>Surpris</b>. Au masculin pluriel, « surpris » ne change pas de forme.' }),

  // ── Le pronom personnel complément ─────────────────────────────────────
  makeMCQ({ id:'g5fr-syl-015', chapterId:'fr-pronoms', subsection:'personnels', difficulty:1,
    question:'À quoi sert un <b>pronom personnel complément</b> ?',
    options:['À remplacer un complément déjà cité','À remplacer le sujet de la phrase','À poser une question','À relier deux phrases'],
    answer:'À remplacer un complément déjà cité',
    hint:'« Je vois Paul » devient « Je le vois ».',
    explanation:'Un <b>pronom personnel complément</b> remplace un complément déjà connu, pour éviter de le répéter : « Je vois Paul » &rarr; « Je <b>le</b> vois ».' }),

  makeMCQ({ id:'g5fr-syl-016', chapterId:'fr-pronoms', subsection:'personnels', difficulty:2,
    question:'Remplace le complément par un <b>pronom personnel</b> : <i>Je regarde la télévision.</i>',
    options:['Je la regarde.','Je le regarde.','Je lui regarde.','Je les regarde.'],
    answer:'Je la regarde.',
    hint:'« la télévision » est féminin singulier.',
    explanation:'« La télévision » est féminin singulier, donc le pronom est <b>la</b> : « Je <b>la</b> regarde. »' }),

  makeMCQ({ id:'g5fr-syl-017', chapterId:'fr-pronoms', subsection:'personnels', difficulty:2,
    question:'Remplace le complément par un <b>pronom personnel</b> : <i>Il parle à ses amis.</i>',
    options:['Il leur parle.','Il les parle.','Il lui parle.','Il en parle.'],
    answer:'Il leur parle.',
    hint:'Le verbe « parler » se construit avec « à » : c&rsquo;est un complément indirect.',
    explanation:'« À ses amis » est un complément indirect au pluriel, donc le pronom est <b>leur</b> : « Il <b>leur</b> parle. »' }),

  makeMCQ({ id:'g5fr-syl-018', chapterId:'fr-pronoms', subsection:'personnels', difficulty:3,
    question:'Où se place le <b>pronom personnel complément</b> dans une phrase simple ?',
    options:['Devant le verbe','Après le verbe','À la fin de la phrase','Au début de la phrase'],
    answer:'Devant le verbe',
    hint:'On dit « Je le vois », pas « Je vois le ».',
    explanation:'En français le pronom complément se place <b>devant le verbe</b> : « Je <b>le</b> vois », « Elle <b>nous</b> attend ».' }),

  makeMCQ({ id:'g5fr-syl-019', chapterId:'fr-pronoms', subsection:'personnels', difficulty:4,
    question:'Pourquoi dit-on « Je lui écris » et non « Je le écris » ?',
    options:['Le complément est indirect','« Le » n&rsquo;existe pas comme pronom','« Lui » est toujours plus poli','Les deux formes sont correctes'],
    answer:'Le complément est indirect',
    hint:'Pose la question : écrire à qui ?',
    explanation:'« Écrire » se construit avec « à » : le complément est <b>indirect</b>, et le pronom qui lui correspond est « lui », pas « le ».' }),

  // ── Le complément du nom ───────────────────────────────────────────────
  makeMCQ({ id:'g5fr-syl-020', chapterId:'fr-grammaire', subsection:'divers', difficulty:1,
    question:'Qu&rsquo;est-ce qu&rsquo;un <b>complément du nom</b> ?',
    options:['Un groupe qui précise un nom','Un mot qui remplace un nom','Un verbe conjugué','Un signe de ponctuation'],
    answer:'Un groupe qui précise un nom',
    hint:'« un livre <u>de géographie</u> » : le groupe dit quel livre.',
    explanation:'Le <b>complément du nom</b> précise le nom qu&rsquo;il suit : « un livre <b>de géographie</b> », « la maison <b>de mon oncle</b> ».' }),

  makeMCQ({ id:'g5fr-syl-021', chapterId:'fr-grammaire', subsection:'divers', difficulty:2,
    question:'Quel est le <b>complément du nom</b> dans : <i>la porte de la classe</i> ?',
    options:['de la classe','la porte','porte','la'],
    answer:'de la classe',
    hint:'Quel groupe dit de quelle porte on parle ?',
    explanation:'<b>De la classe</b> précise de quelle porte il s&rsquo;agit : c&rsquo;est le complément du nom « porte ».' }),

  makeMCQ({ id:'g5fr-syl-022', chapterId:'fr-grammaire', subsection:'divers', difficulty:2,
    question:'Par quel petit mot un <b>complément du nom</b> commence-t-il le plus souvent ?',
    options:['une préposition','un verbe conjugué','un adverbe court','un point final'],
    answer:'une préposition',
    hint:'un verre <b>d</b>&rsquo;eau, une machine <b>à</b> laver.',
    explanation:'Le complément du nom est presque toujours introduit par une <b>préposition</b> : de, à, en, pour &mdash; « un verre d&rsquo;eau », « une machine à laver ».' }),

  makeMCQ({ id:'g5fr-syl-023', chapterId:'fr-grammaire', subsection:'divers', difficulty:3,
    question:'Dans quel groupe trouve-t-on un <b>complément du nom</b> ?',
    options:['un sac en cuir','un grand sac','il prend le sac','le sac est lourd'],
    answer:'un sac en cuir',
    hint:'Cherche le groupe introduit par une préposition, pas l&rsquo;adjectif.',
    explanation:'« En cuir » est un groupe introduit par une préposition qui précise le nom « sac » : c&rsquo;est un <b>complément du nom</b>. « Grand » est un adjectif.' }),

  makeMCQ({ id:'g5fr-syl-024', chapterId:'fr-grammaire', subsection:'divers', difficulty:4,
    question:'Quelle différence y a-t-il entre l&rsquo;adjectif et le <b>complément du nom</b> ?',
    options:['Le complément suit une préposition','L&rsquo;adjectif se place toujours après le nom','Le complément s&rsquo;accorde avec le nom','Il n&rsquo;y a aucune différence entre eux'],
    answer:'Le complément suit une préposition',
    hint:'Compare « une table ronde » et « une table de cuisine ».',
    explanation:'Les deux précisent le nom, mais l&rsquo;adjectif est un mot qui s&rsquo;accorde (« une table ronde ») tandis que le <b>complément du nom</b> est un groupe introduit par une préposition (« une table de cuisine »).' })

);
