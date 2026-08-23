'use strict';
// Grade 5 French — Chapitre : Les Pronoms
// IDs format: g5fr-pro-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-pro-001', chapterId:'fr-pronoms', difficulty:1,
    question:'Quel pronom sujet correspond à "we" en français ?',
    options:['ils','vous','on / nous','tu'],
    answer:'on / nous',
    hint:'"We" = nous (formel) ou on (informel en français parlé).',
    explanation:'"<b>Nous</b>" = we (formel). "<b>On</b>" = we (informel, très courant à l\'oral) ou one. Les pronoms sujets : je, tu, il/elle/on, nous, vous, ils/elles.' }),

  makeMCQ({ id:'g5fr-pro-002', chapterId:'fr-pronoms', difficulty:1,
    question:'Quel pronom sujet utilise-t-on pour parler poliment à une personne adulte que l\'on ne connaît pas bien ?',
    options:['tu','il','vous','on'],
    answer:'vous',
    hint:'La politesse en français — "tu" pour les amis, ___ pour les adultes.',
    explanation:'"<b>Vous</b>" s\'utilise pour la politesse (vouvoiement) avec une personne qu\'on ne connaît pas, un adulte ou un supérieur. "Tu" = tutoiement, pour les amis, la famille et les enfants. "Vous" est aussi le pronom pluriel (you all).' }),

  makeMCQ({ id:'g5fr-pro-003', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez le COD par un pronom : "Je mange la pomme." → "Je ___ mange."',
    options:['lui','y','la','le'],
    answer:'la',
    hint:'"La pomme" est féminin singulier. Le pronom COD féminin singulier est "la".',
    explanation:'"Je <b>la</b> mange." — "La pomme" = féminin singulier → pronom COD : <b>la</b>. Les pronoms COD : <b>le</b> (masc. sing.), <b>la</b> (fém. sing.), <b>les</b> (pluriel). Le pronom se place <b>avant</b> le verbe.' }),

  makeMCQ({ id:'g5fr-pro-004', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez par un pronom : "Il parle à ses parents." → "Il ___ parle."',
    options:['les','leur','lui','y'],
    answer:'leur',
    hint:'"Ses parents" est pluriel. Le pronom COI pluriel est "leur".',
    explanation:'"Il <b>leur</b> parle." — "À ses parents" (pluriel) → pronom COI : <b>leur</b>. Pronoms COI : <b>lui</b> (à lui / à elle, singulier), <b>leur</b> (à eux / à elles, pluriel). Attention : "leur" COI est invariable (pas de -s).' }),

  makeTF({ id:'g5fr-pro-005', chapterId:'fr-pronoms', difficulty:2,
    question:'En français, les pronoms COD et COI se placent après le verbe conjugué.',
    answer:false,
    hint:'Comparez : "Je mange la pomme" → "Je ___ mange" (le pronom est où ?)',
    explanation:'<b>Faux.</b> Les pronoms COD et COI se placent <b>avant</b> le verbe conjugué : "Je <b>la</b> mange" (pas "Je mange la"). Exception : à l\'impératif affirmatif, ils se placent après : "Mange-<b>la</b> !"' }),

  makeMCQ({ id:'g5fr-pro-006', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez : "Il ___ a offert des fleurs." (à Marie)',
    options:['le','lui','la','y'],
    answer:'lui',
    hint:'"À Marie" est singulier féminin. Le pronom COI singulier est "lui" (pour les deux genres).',
    explanation:'"Il <b>lui</b> a offert des fleurs." — "À Marie" (singulier) → pronom COI : <b>lui</b>. "Lui" remplace "à + personne" au singulier pour les deux genres. "Leur" remplace "à + personnes" au pluriel.' }),

  makeMCQ({ id:'g5fr-pro-007', chapterId:'fr-pronoms', difficulty:2,
    question:'Quel pronom tonique (stressed) correspond à "ils" ?',
    options:['lui','moi','eux','soi'],
    answer:'eux',
    hint:'Les pronoms toniques : moi, toi, lui, elle, nous, vous, ___, elles.',
    explanation:'"<b>Eux</b>" est le pronom tonique de "ils". Tableau des pronoms toniques : moi (je), toi (tu), lui (il), elle (elle), nous (nous), vous (vous), <b>eux</b> (ils), elles (elles). Utilisés après une préposition : avec lui, pour eux.' }),

  makeMCQ({ id:'g5fr-pro-008', chapterId:'fr-pronoms', difficulty:2,
    question:'Remplacez par un pronom : "Je mange des gâteaux." → "J\'___ mange."',
    options:['y','en','les','lui'],
    answer:'en',
    hint:'"En" remplace "de + chose" — ici "des gâteaux" = de + les gâteaux.',
    explanation:'"J\'<b>en</b> mange." — "En" remplace "de + nom" ou une quantité : "des gâteaux" → <b>en</b>. Autres exemples : "J\'ai besoin <b>d\'</b>argent." → "J\'<b>en</b> ai besoin." "Y" remplace "à/dans + lieu" : "Je vais à Paris." → "J\'<b>y</b> vais."' }),

  makeTF({ id:'g5fr-pro-009', chapterId:'fr-pronoms', difficulty:1,
    question:'"Vous" peut être utilisé pour s\'adresser à une seule personne en français.',
    answer:true,
    hint:'Pensez au vouvoiement — parler poliment à un seul adulte.',
    explanation:'<b>Vrai.</b> "Vous" est à la fois le pluriel de "tu" <b>ET</b> la forme de politesse (vouvoiement) pour s\'adresser à une seule personne : "Vous êtes le directeur ?" (une seule personne, mais forme polie). C\'est le vouvoiement.' }),

  makeMCQ({ id:'g5fr-pro-010', chapterId:'fr-pronoms', difficulty:2,
    question:'Complétez : "Je pense ___ lui. Je pense ___ Paris." (à lui / à Paris)',
    options:['à / à','à / y','lui / y','lui / à'],
    answer:'à / y',
    hint:'"À + personne" → pronom tonique (à lui). "À + lieu" → pronom "y".',
    explanation:'"Je pense <b>à lui</b>." → "Je pense à lui" (on garde "à lui" pour les personnes, pas de remplacement par "y"). "Je pense à Paris." → "J\'<b>y</b> pense." — <b>y</b> remplace "à + lieu/chose". Note : pour les personnes, on garde la préposition + pronom tonique.' })

);
