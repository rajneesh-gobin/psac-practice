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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-gr-011', chapterId:'fr-grammaire', difficulty:1,
    question:'Futur simple : "Je ___ (parler) à ma mère demain."',
    options:['parlerai','parlera','parlerons','parleras'],
    answer:'parlerai',
    hint:'Futur simple pour "je" = infinitif + -ai.',
    explanation:'"je <b>parlerai</b>" — Futur simple : infinitif + terminaisons (-ai, -as, -a, -ons, -ez, -ont). Je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront. Pour les verbes en -RE, on enlève le -e final : prendre → je prendrai.' }),

  makeMCQ({ id:'g5fr-gr-012', chapterId:'fr-grammaire', difficulty:1,
    question:'Question type PSAC (Q7) : "Papa a pris une bonne ___." (décider → forme nominale)',
    options:['décideur','décision','décidée','décidie'],
    answer:'décision',
    hint:'Verbe → nom avec le suffixe -sion/-tion.',
    explanation:'"<b>décision</b>" — décider → décision. La dérivation lexicale : verbe → nom avec -sion/-tion. Autres exemples : polluer → pollution, protéger → protection, commencer → commencement. (Ce type de question apparaît régulièrement au PSAC : "Écris la forme correcte du mot entre parenthèses.")' }),

  makeMCQ({ id:'g5fr-gr-013', chapterId:'fr-grammaire', difficulty:2,
    question:'Question type PSAC 2025 (Q7c) : "Les élèves travaillent ___ en classe." (sérieux → adverbe)',
    options:['sérieusement','sérieuxement','sériément','sériousement'],
    answer:'sérieusement',
    hint:'Règle : -eux → -euse + -ment pour former l\'adverbe.',
    explanation:'"<b>sérieusement</b>" — Pour former l\'adverbe : adjectif féminin + -ment. sérieux → sérieuse → sérieusement. Autres exemples : heureux → heureuse → heureusement, dangereux → dangereuse → dangereusement, doux → douce → doucement.' }),

  makeMCQ({ id:'g5fr-gr-014', chapterId:'fr-grammaire', difficulty:2,
    question:'Question type PSAC 2025 (Q7b) : "Il fait très froid. C\'est un temps ___." (hiver → adjectif)',
    options:['hivernel','hivernal','hivernale','d\'hiver'],
    answer:'hivernal',
    hint:'"Hiver" + suffixe -al → adjectif.',
    explanation:'"<b>hivernal</b>" — hiver → hivernal (adjectif). Dérivation : nom → adjectif avec -al : hiver → hivernal, automne → automnal. Au féminin : hivernale, au pluriel masculin : hivernaux. (Cette phrase exacte figurait dans le PSAC 2025 Q7b.)' }),

  makeMCQ({ id:'g5fr-gr-015', chapterId:'fr-grammaire', difficulty:2,
    question:'Joignez avec "que" (PSAC 2025 Q5a) :\n"La fleur est belle. Tu achètes la fleur."',
    options:[
      'La fleur est belle que tu achètes.',
      'Tu achètes la fleur que elle est belle.',
      'La fleur que tu achètes est belle.',
      'La belle fleur que tu achètes.'
    ],
    answer:'La fleur que tu achètes est belle.',
    hint:'"que" remplace "la fleur" (COD de "achètes"). La proposition relative se place après le nom.',
    explanation:'"<b>La fleur que tu achètes est belle.</b>" — "que" remplace "la fleur" (COD d\'"achètes") : La fleur [que tu achètes] est belle. La proposition relative est placée directement après le nom qu\'elle qualifie (l\'antécédent). (Exercice identique testé au PSAC 2025 Q5a.)' }),

  makeTF({ id:'g5fr-gr-016', chapterId:'fr-grammaire', difficulty:2,
    question:'"Au futur simple, le verbe \'aller\' est irrégulier : j\'irai, tu iras, il ira…"',
    answer:true,
    hint:'"Aller" n\'utilise pas "all-" comme radical au futur — il utilise "ir-".',
    explanation:'<b>Vrai.</b> Futur simple de "aller" : j\'irai, tu iras, il ira, nous irons, vous irez, ils iront (radical : <b>ir-</b>). Autres futurs irréguliers : être → je serai, avoir → j\'aurai, faire → je ferai, venir → je viendrai, pouvoir → je pourrai, vouloir → je voudrai.' }),

  makeMCQ({ id:'g5fr-gr-017', chapterId:'fr-grammaire', difficulty:3,
    question:'"Ne… que" exprime quelle idée ?',
    options:['jamais (never)','rien (nothing)','seulement (only)','personne (nobody)'],
    answer:'seulement (only)',
    hint:'"Il ne mange que des légumes." = "Il mange seulement des légumes."',
    explanation:'"ne… que" = <b>seulement</b> (only). C\'est une négation restrictive : "Il ne mange que des légumes." (He only eats vegetables.) Ne pas confondre avec : ne… pas (not), ne… jamais (never), ne… rien (nothing), ne… plus (no longer), ne… personne (nobody).' }),

  makeMCQ({ id:'g5fr-gr-018', chapterId:'fr-grammaire', difficulty:3,
    question:'Identifiez la FORME INTERROGATIVE correcte de "Elle travaille dans une usine." (PSAC 2025 Q2A)',
    options:[
      'Est-ce qu\'elle travaille dans une usine ?',
      'Elle travaille dans une usine ?',
      'Travaille-elle dans une usine ?',
      'Est-ce que travaille-elle dans une usine ?'
    ],
    answer:'Est-ce qu\'elle travaille dans une usine ?',
    hint:'Trois façons de poser une question — laquelle utilise "est-ce que" + ordre sujet + verbe ?',
    explanation:'"<b>Est-ce qu\'elle travaille dans une usine ?</b>" — est-ce que + sujet + verbe (ordre normal). Pour l\'inversion : "Travaille-<b>t</b>-elle ?" (pas "Travaille-elle" — il faut -t- entre deux voyelles). "Elle travaille ?" fonctionne à l\'oral (intonation). (Question type testée au PSAC 2025 Q2A.)' }),

  makeMCQ({ id:'g5fr-gr-019', chapterId:'fr-grammaire', difficulty:4,
    question:'Corrigez les erreurs : "Hier, Sophie et moi avons allé au marché et j\'ai acheter des fruits."',
    options:[
      'Hier, Sophie et moi sommes allées au marché et j\'ai acheté des fruits.',
      'Hier, Sophie et moi sont allés au marché et j\'ai acheter des fruits.',
      'Hier, Sophie et moi avons allé au marché et j\'ai acheté des fruits.',
      'Hier, Sophie et moi sommes allés au marché et j\'ai acheté des fruits.'
    ],
    answer:'Hier, Sophie et moi sommes allés au marché et j\'ai acheté des fruits.',
    hint:'Deux erreurs : (1) aller utilise être, pas avoir ; (2) "acheter" au passé composé → participe passé.',
    explanation:'Deux corrections : (1) "<b>avons allé</b>" → "<b>sommes allés</b>" (aller + être ; "Sophie et moi" = groupe mixte → -és) ; (2) "<b>j\'ai acheter</b>" → "<b>j\'ai acheté</b>" (participe passé, pas infinitif). "Sommes allées" serait correct seulement si Sophie et moi sommes toutes les deux féminines. Ce type de question teste deux compétences clés du PSAC : choix être/avoir + forme correcte du participe passé.' })

);
