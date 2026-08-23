'use strict';
// Grade 5 French — Chapitre : Les Verbes au Présent
// IDs format: g5fr-vb-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-vb-001', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "parler" au présent pour "je" :',
    options:['parles','parlez','parle','parlons'],
    answer:'parle',
    hint:'Verbes en -ER : enlevez -er, ajoutez -e pour "je".',
    explanation:'"Je <b>parle</b>" — pour les verbes en -ER, on enlève -er et on ajoute : je <b>-e</b>, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent. Parler → je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' }),

  makeMCQ({ id:'g5fr-vb-002', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "manger" au présent pour "nous" :',
    options:['mange','manges','mangeons','mangez'],
    answer:'mangeons',
    hint:'Verbes en -ger : on ajoute un "e" avant -ons pour garder le son doux.',
    explanation:'"Nous <b>mangeons</b>" — les verbes en -ger (manger, nager, voyager) gardent le "e" avant -ons pour que le "g" reste doux : nous mangeons, nous nageons. Sans le "e", on dirait "mangnons" — incorrect.' }),

  makeMCQ({ id:'g5fr-vb-003', chapterId:'fr-verbes-present', difficulty:1,
    question:'Quelle est la forme correcte de "être" pour "nous" ?',
    options:['nous sommes','nous êtes','nous sont','nous avons'],
    answer:'nous sommes',
    hint:'Être est irrégulier. La forme pour "nous" ne ressemble pas à l\'infinitif.',
    explanation:'"<b>Nous sommes</b>" — être est totalement irrégulier : je suis, tu es, il/elle est, <b>nous sommes</b>, vous êtes, ils/elles sont. À ne pas confondre avec "avoir" : nous avons.' }),

  makeMCQ({ id:'g5fr-vb-004', chapterId:'fr-verbes-present', difficulty:1,
    question:'Conjuguez "avoir" au présent pour "il" :',
    options:['il est','il a','il as','il ont'],
    answer:'il a',
    hint:'Avoir → il/elle ___ (une lettre seulement).',
    explanation:'"<b>Il a</b>" — avoir : j\'ai, tu as, il/elle <b>a</b>, nous avons, vous avez, ils/elles ont. Attention : "il a" (avoir) ≠ "il est" (être).' }),

  makeMCQ({ id:'g5fr-vb-005', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Elle ___ (finir) ses devoirs."',
    options:['fini','finit','finissez','finissons'],
    answer:'finit',
    hint:'Finir est un verbe en -IR. Conjugaison de "il/elle" : radical + -it.',
    explanation:'"Elle <b>finit</b>" — les verbes en -IR (-issons) se conjuguent : je finis, tu finis, il/elle <b>finit</b>, nous finissons, vous finissez, ils/elles finissent. Autres verbes -IR : choisir, grandir, réussir.' }),

  makeMCQ({ id:'g5fr-vb-006', chapterId:'fr-verbes-present', difficulty:2,
    question:'Conjuguez "aller" au présent pour "vous" :',
    options:['vous allez','vous allons','vous vont','vous vas'],
    answer:'vous allez',
    hint:'Aller est irrégulier, mais la forme "vous" ressemble à un verbe -ER normal.',
    explanation:'"<b>Vous allez</b>" — aller est irrégulier : je vais, tu vas, il/elle va, nous allons, <b>vous allez</b>, ils/elles vont. "Aller + infinitif" = futur proche : je <b>vais manger</b> (I am going to eat).' }),

  makeTF({ id:'g5fr-vb-007', chapterId:'fr-verbes-present', difficulty:1,
    question:'La terminaison des verbes en -ER pour "tu" au présent est -es.',
    answer:true,
    hint:'Je parle, tu ___.',
    explanation:'<b>Vrai.</b> Les terminaisons des verbes en -ER au présent : je -e, tu <b>-es</b>, il/elle -e, nous -ons, vous -ez, ils/elles -ent. Exemples : tu parles, tu manges, tu joues.' }),

  makeMCQ({ id:'g5fr-vb-008', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez : "Ils ___ (faire) du sport tous les jours."',
    options:['font','faites','fais','fait'],
    answer:'font',
    hint:'Faire est irrégulier. La forme pour "ils/elles" est unique.',
    explanation:'"Ils <b>font</b>" — faire est totalement irrégulier : je fais, tu fais, il/elle fait, nous faisons, vous faites, ils/elles <b>font</b>. "Faire du sport" = to play/do sport.' }),

  makeMCQ({ id:'g5fr-vb-009', chapterId:'fr-verbes-present', difficulty:2,
    question:'Complétez avec la bonne forme de "avoir" : "Tu ___ douze ans."',
    options:['est','a','as','avez'],
    answer:'as',
    hint:'On utilise "avoir" pour l\'âge en français. "Tu" + avoir = ?',
    explanation:'"Tu <b>as</b> douze ans." — En français, on utilise <b>avoir</b> (pas être) pour l\'âge : j\'ai (10 ans), tu as, il/elle a, nous avons, vous avez, ils/elles ont. "Tu as" + [âge] + "ans".' }),

  makeMCQ({ id:'g5fr-vb-010', chapterId:'fr-verbes-present', difficulty:2,
    question:'Quelle est la forme correcte ? "Nous ___ (jouer) au football."',
    options:['jouent','joue','jouons','jouez'],
    answer:'jouons',
    hint:'Verbe en -ER, personne "nous". Terminaison = -ons.',
    explanation:'"Nous <b>jouons</b>" — jouer est un verbe en -ER : je joue, tu joues, il joue, <b>nous jouons</b>, vous jouez, ils jouent. La terminaison "nous" pour les -ER est toujours -ons.' })

);
