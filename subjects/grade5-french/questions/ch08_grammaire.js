'use strict';
// Grade 5 French — Chapitre : Grammaire Essentielle
// IDs format: g5fr-gr-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-gr-001', chapterId:'fr-grammaire', difficulty:1,
    question:'Comment forme-t-on la NÉGATION en français ?',
    options:[
      'On met "pas" avant le verbe',
      'On met "ne" avant le verbe et "pas" après',
      'On met "non" au début de la phrase',
      'On change le verbe à sa forme négative'
    ],
    answer:'On met "ne" avant le verbe et "pas" après',
    hint:'La négation encadre le verbe : ____ + verbe + ____.',
    explanation:'La négation française encadre le verbe : sujet + <b>ne</b> + verbe + <b>pas</b>. Exemple : "Je mange" → "Je <b>ne</b> mange <b>pas</b>." Devant voyelle : ne → n\' : "Il <b>n\'</b>aime pas."' }),

  makeMCQ({ id:'g5fr-gr-002', chapterId:'fr-grammaire', difficulty:1,
    question:'Mettez cette phrase à la forme négative : "Elle parle français."',
    options:[
      'Elle pas parle français.',
      'Elle ne parle pas français.',
      'Elle parle ne pas français.',
      'Non elle parle français.'
    ],
    answer:'Elle ne parle pas français.',
    hint:'Placez "ne" avant "parle" et "pas" après.',
    explanation:'"<b>Elle ne parle pas français.</b>" — La structure négative est : sujet + <b>ne</b> + verbe + <b>pas</b> + reste. Si le verbe commence par une voyelle : "Il <b>n\'</b>aime pas."' }),

  makeMCQ({ id:'g5fr-gr-003', chapterId:'fr-grammaire', difficulty:2,
    question:'Quelle est la forme correcte pour poser une question avec "est-ce que" ?',
    options:[
      '"Tu aimes le chocolat ?" (intonation montante seulement)',
      '"Est-ce que tu aimes le chocolat ?"',
      '"Aimes tu le chocolat ?"',
      '"Tu aimes-tu le chocolat ?"'
    ],
    answer:'"Est-ce que tu aimes le chocolat ?"',
    hint:'"Est-ce que" se place au début de la question, avant le sujet.',
    explanation:'"<b>Est-ce que</b> tu aimes le chocolat ?" — "Est-ce que" est la façon la plus facile de poser une question. On garde l\'ordre sujet + verbe. Les trois façons : 1) intonation montante, 2) est-ce que + sujet + verbe, 3) inversion verbe-sujet : "Aimes-<b>tu</b> le chocolat ?"' }),

  makeMCQ({ id:'g5fr-gr-004', chapterId:'fr-grammaire', difficulty:2,
    question:'Complétez avec la bonne préposition : "Le chat est ___ la table." (sous)',
    options:['sur','dans','sous','devant'],
    answer:'sous',
    hint:'"Sous" = under/beneath en anglais.',
    explanation:'"Le chat est <b>sous</b> la table." — Les prépositions de lieu : <b>sur</b> (on/above), <b>sous</b> (under), <b>dans</b> (in/inside), <b>devant</b> (in front of), <b>derrière</b> (behind), <b>entre</b> (between), <b>à côté de</b> (next to).' }),

  makeMCQ({ id:'g5fr-gr-005', chapterId:'fr-grammaire', difficulty:2,
    question:'Complétez avec l\'article partitif : "Je mange ___ pain."',
    options:['le','un','du','de'],
    answer:'du',
    hint:'"Du" = de + le → utilisé pour une quantité non précisée d\'un nom masculin.',
    explanation:'"Je mange <b>du</b> pain." — L\'article partitif exprime une quantité indéfinie : <b>du</b> (de + le, masc. : du pain, du lait), <b>de la</b> (fém. : de la viande, de la musique), <b>de l\'</b> (devant voyelle), <b>des</b> (pluriel).' }),

  makeMCQ({ id:'g5fr-gr-006', chapterId:'fr-grammaire', difficulty:2,
    question:'À la forme négative, l\'article partitif "du" devient :',
    options:['du','le','de / d\'','des'],
    answer:'de / d\'',
    hint:'Après une négation, les articles partitifs et indéfinis deviennent "de" ou "d\'".',
    explanation:'Après une négation, "du / de la / des" → <b>de</b> (ou d\' devant voyelle) : "Je mange <b>du</b> pain." → "Je ne mange <b>pas de</b> pain." / "Il boit <b>de l\'</b>eau." → "Il ne boit <b>pas d\'</b>eau."' }),

  makeMCQ({ id:'g5fr-gr-007', chapterId:'fr-grammaire', difficulty:2,
    question:'Complétez avec le futur proche : "Nous ___ (partir) demain."',
    options:['partons','partions','allons partir','partirons'],
    answer:'allons partir',
    hint:'Futur proche = aller (conjugué) + infinitif.',
    explanation:'"Nous <b>allons partir</b> demain." — Le futur proche = <b>aller (présent)</b> + <b>infinitif</b>. Conjugaison : je vais partir, tu vas partir, il va partir, nous <b>allons partir</b>, vous allez partir, ils vont partir.' }),

  makeTF({ id:'g5fr-gr-008', chapterId:'fr-grammaire', difficulty:1,
    question:'"Ne … pas" est la seule façon de former la négation en français.',
    answer:false,
    hint:'Il existe d\'autres expressions négatives comme "ne… jamais" ou "ne… rien".',
    explanation:'<b>Faux.</b> Il existe plusieurs formes de négation : <b>ne… pas</b> (not), <b>ne… jamais</b> (never), <b>ne… rien</b> (nothing), <b>ne… personne</b> (nobody), <b>ne… plus</b> (no longer), <b>ne… que</b> (only). Toutes encadrent le verbe.' }),

  makeMCQ({ id:'g5fr-gr-009', chapterId:'fr-grammaire', difficulty:2,
    question:'Complétez avec la bonne préposition : "Le stylo est ___ la trousse et le livre."',
    options:['dans','derrière','entre','sur'],
    answer:'entre',
    hint:'"Entre" = between — entre deux objets.',
    explanation:'"Le stylo est <b>entre</b> la trousse et le livre." — <b>Entre</b> + deux éléments = between. On dit toujours "entre A <b>et</b> B". Ne pas confondre avec "parmi" (among/amongst — plus de deux éléments).' }),

  makeMCQ({ id:'g5fr-gr-010', chapterId:'fr-grammaire', difficulty:2,
    question:'Complétez : "Si tu travailles bien, tu ___ (réussir — futur proche) ton examen."',
    options:['réussis','vas réussir','réussirais','réussiras'],
    answer:'vas réussir',
    hint:'Futur proche pour "tu" = tu vas + infinitif.',
    explanation:'"Si tu travailles bien, tu <b>vas réussir</b> ton examen." — Futur proche pour "tu" = tu <b>vas</b> + infinitif. Structure si + présent → futur (proche ou simple). Le futur proche est plus courant à l\'oral.' })

);
