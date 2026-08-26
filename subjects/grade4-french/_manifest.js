'use strict';

// Sous-thèmes pour l'écran Syllabus. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G4FR_SYLLABUS = {
  'g4fr-vocabulaire': { subsections: [
    { id:'couleurs',        name:'Les couleurs' },  // 3
    { id:'nombres',         name:'Les nombres' },  // 4
    { id:'jours_mois',      name:'Jours & mois' },  // 7
    { id:'famille',         name:'La famille' },  // 3
    { id:'corps',           name:'Le corps' },  // 1
    { id:'animaux',         name:'Les animaux' },  // 9
    { id:'politesse',       name:'Salutations & politesse' },  // 1
    { id:'temps',           name:'Le temps qui passe' },  // 4
    { id:'verbes_utiles',   name:'Verbes utiles' },  // 2
    { id:'traduction',      name:'Traduire des mots' },  // 19
  ]},
  'g4fr-noms': { subsections: [
    { id:'pluriel',         name:'Le pluriel' },  // 7
    { id:'noms_propres',    name:'Noms propres' },  // 1
    { id:'partitifs',       name:'Articles partitifs' },  // 7
    { id:'contractions',    name:'Contractions (au, du, des)' },  // 5
    { id:'genre',           name:'Masculin ou féminin' },  // 10
    { id:'articles_indef',  name:'Articles indéfinis' },  // 2
    { id:'articles_def',    name:'Articles définis' },  // 9
  ]},
  'g4fr-verbes': { subsections: [
    { id:'pronominaux',     name:'Verbes pronominaux' },  // 5
    { id:'etre_avoir',      name:'Être & avoir' },  // 8
    { id:'irreguliers',     name:'Verbes irréguliers' },  // 10
    { id:'verbes_er',       name:'Verbes en -ER' },  // 5
    { id:'adverbes',        name:'Adverbes de fréquence' },  // 4
    { id:'conjugaison',     name:'Conjugaison' },  // 3
  ]},
  'g4fr-adjectifs': { subsections: [
    { id:'possessifs',      name:'Les possessifs' },  // 7
    { id:'demonstratifs',   name:'Démonstratifs' },  // 5
    { id:'place',           name:'Place de l\'adjectif' },  // 1
    { id:'accord',          name:'Les accords' },  // 22
  ]},
  'g4fr-phrase': { subsections: [
    { id:'cod_coi',         name:'COD & COI' },  // 4
    { id:'imperatif',       name:'L\'impératif' },  // 6
    { id:'negation',        name:'La négation' },  // 5
    { id:'interrogation',   name:'Poser une question' },  // 10
    { id:'prepositions',    name:'Les prépositions' },  // 4
    { id:'conjonctions',    name:'Les conjonctions' },  // 5
    { id:'ordre_mots',      name:'Ordre des mots' },  // 1
  ]},
  'g4fr-passe-comp': { subsections: [
    { id:'auxiliaire',      name:'Choisir l\'auxiliaire' },  // 3
    { id:'participe',       name:'Le participe passé' },  // 9
    { id:'formation',       name:'Comment le former' },  // 24
  ]},
  'g4fr-imparfait': { subsections: [
    { id:'vs_passe_comp',   name:'Imparfait ou passé composé' },  // 1
    { id:'terminaisons',    name:'Les terminaisons' },  // 2
    { id:'usage',           name:'Quand l\'employer' },  // 5
    { id:'formation',       name:'Comment le former' },  // 27
  ]},
  'g4fr-lecture': { subsections: [
    { id:'fait_opinion',    name:'Fait ou opinion' },  // 1
    { id:'connecteurs',     name:'Connecteurs logiques' },  // 3
    { id:'vocabulaire',     name:'Le sens des mots' },  // 4
    { id:'idee_principale', name:'Idée principale' },  // 3
    { id:'inference',       name:'Reading Between the Lines' },  // 1
    { id:'reperage',        name:'Trouver la réponse dans le texte' },  // 23
  ]},
  'g4fr-textes': { subsections: [
    { id:'affiche',         name:'Affiches & annonces' },  // 8
    { id:'recette',         name:'Recettes & modes d\'emploi' },  // 7
    { id:'legende',         name:'Légendes & contes' },  // 3
    { id:'carte_postale',   name:'Cartes postales' },  // 4
    { id:'recit',           name:'Récits' },  // 9
  ]},
  'g4fr-images': { subsections: [
    { id:'trois_images',    name:'Raconter en trois images' },  // 9
    { id:'une_image',       name:'Décrire une image' },  // 10
  ]},
};

registerSubject({
  id: 'grade4-french', name: 'French', grade: 4, icon: '📕', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
  syllabus: G4FR_SYLLABUS,
  chapters: [
    {
      id: 'g4fr-vocabulaire', name: 'Vocabulaire de base', icon: '🗣️',
      notes: [
        '**Les salutations** : Bonjour (Hello/Good morning), Bonsoir (Good evening), Au revoir (Goodbye), Merci (Thank you), S\'il te plaît (Please), Excusez-moi (Excuse me).',
        '**Les nombres 1–20** : un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.',
        '**Les couleurs** : rouge (red), bleu (blue), vert (green), jaune (yellow), noir (black), blanc (white), orange (orange), rose (pink).',
        '**Les jours** : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.',
        '**La famille** : le père (father), la mère (mother), le frère (brother), la sœur (sister), le grand-père (grandfather), la grand-mère (grandmother).',
      ],
    },
    {
      id: 'g4fr-noms', name: 'Les Noms & Articles', icon: '📝',
      notes: [
        'In French, every noun is **masculine (m.)** or **feminine (f.)** - you must learn the gender with each word.',
        '**Indefinite articles** (a/an): **un** (m.) - un chat; **une** (f.) - une maison.',
        '**Definite articles** (the): **le** (m.) - le chien; **la** (f.) - la fleur.',
        'Before a vowel or silent h: **l\'** - l\'ami (m.), l\'école (f.).',
        '**Plural**: add **-s** to most nouns. Definite plural = **les**; indefinite plural = **des**.',
        'Example: le livre (the book) → les livres (the books). Un stylo → des stylos.',
      ],
    },
    {
      id: 'g4fr-verbes', name: 'Les Verbes au Présent', icon: '🏃',
      notes: [
        '**Être** (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
        '**Avoir** (to have): j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.',
        '**Aller** (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.',
        '**-ER verbs** (regular): parler (to speak) → je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.',
        'Other common -ER verbs: manger (to eat), habiter (to live), aimer (to like/love), regarder (to watch).',
      ],
    },
    {
      id: 'g4fr-adjectifs', name: 'Les Adjectifs', icon: '🎨',
      notes: [
        'French adjectives **agree** with the noun: masculine/feminine, singular/plural.',
        'Most adjectives add **-e** in the feminine: grand → grande, petit → petite, vert → verte.',
        'Most adjectives add **-s** in the plural: grand → grands; grande → grandes.',
        'Adjectives usually come **after** the noun in French: un livre rouge (a red book).',
        'Common exceptions (before noun): grand, petit, bon, mauvais, beau/belle, jeune, vieux/vieille.',
        'Colours are always placed **after** the noun: un chat noir, une robe bleue.',
      ],
    },
    {
      id: 'g4fr-phrase', name: 'La Phrase & Grammaire', icon: '📏',
      notes: [
        '**Negation**: place **ne** before the verb and **pas** after: Je ne mange pas. (I do not eat.)',
        '**Question words**: Qui (Who), Où (Where), Quand (When), Comment (How), Pourquoi (Why), Combien (How many/much), Qu\'est-ce que (What).',
        '**Est-ce que** turns any statement into a question: Tu parles français. → Est-ce que tu parles français?',
        '**Prepositions of place**: dans (in), sur (on), sous (under), devant (in front of), derrière (behind).',
        '**Il y a** = there is / there are: Il y a un chat. (There is a cat.) Il y a des fleurs. (There are flowers.)',
      ],
    },
    {
      id: 'g4fr-passe-comp', name: 'Le Passé Composé', icon: '⏰',
      notes: [
        'Used for actions **completed in the past**: "J\'ai mangé" (I ate / I have eaten).',
        'Structure: **avoir or être** (conjugated) + **past participle**.',
        '**-ER past participle**: parler → parlé, manger → mangé, jouer → joué.',
        '**-IR past participle**: finir → fini, choisir → choisi.',
        '**Irregular**: avoir→eu, être→été, faire→**fait**, prendre→**pris**, voir→**vu**, dire→**dit**.',
        '**Negation**: ne + auxiliary + pas: Je n\'ai **pas** mangé.',
        'Verbs using **être**: aller (allé), venir (venu), partir (parti), arriver (arrivé) + all reflexives.',
        'With être, past participle agrees with subject: Elle est allée. Ils sont partis.',
      ],
    },
    {
      id: 'g4fr-imparfait', name: 'L\'Imparfait', icon: '⏳',
      notes: [
        '**L\'imparfait** is used for: habitual/repeated past actions, descriptions, ongoing past states.',
        'Signal words: chaque jour, tous les soirs, souvent, quand j\'étais petit…',
        'Formation: take **nous** present form, remove -ons → add -ais/-ais/-ait/-ions/-iez/-aient.',
        'Parler → nous parlons → parl- → je parlais, tu parlais, il parlait, nous parlions…',
        'Only irregular: **être** → j\'étais, tu étais, il était, nous étions.',
        '**Passé composé vs imparfait**: P.C. = completed event. Imparfait = background/ongoing. "Je lisais quand il est entré."',
      ],
    },
    {
      id: 'g4fr-lecture', name: 'Lecture & Compréhension', icon: '🔍',
      notes: [
        'Read the French passage **slowly and carefully** at least twice before answering.',
        'For factual questions (Qui, Où, Quand): find the answer directly in the text.',
        'For vocabulary questions: use context clues from surrounding sentences.',
        'Always check that your answer matches the **gender and number** of the noun in the question.',
        'Useful connecting words: *et* (and), *mais* (but), *parce que* (because), *donc* (so), *ensuite* (then).',
      ],
    },
    {
      id: 'g4fr-textes', name: 'Textes & Types de Textes', icon: '📄',
      notes: [
        'Un **type de texte**, c\'est la sorte d\'écrit que tu lis. Chaque type a une forme différente sur la page.',
        'Le **récit** : des personnages, un lieu, un problème, une fin. On raconte dans l\'ordre.',
        'L\'**affiche** : elle répond à QUOI ? QUAND ? OÙ ? COMBIEN ? Gros titres, phrases très courtes.',
        'La **carte postale** : un court message à gauche, l\'adresse à droite. On garde seulement l\'essentiel.',
        'La **recette** : d\'abord « il te faut… », puis des **étapes numérotées** à l\'**impératif** (Lave, Coupe, Mets).',
        'Les mots entre **parenthèses** cachent souvent les exceptions : lis-les toujours !',
        'Avant de répondre, demande-toi : *quel type de texte est-ce ?* Le type t\'indique où chercher.',
      ],
    },
    {
      id: 'g4fr-images', name: 'Description d\'Images', icon: '🖼️',
      notes: [
        'Deux formats à l\'examen : **une seule image** à décrire, ou **trois images** qui racontent une histoire.',
        'Pour UNE image, suis cet ordre : le **lieu**, le **temps qu\'il fait**, les **personnages**, leurs **actions**, un **détail**, ton **avis**.',
        'Commence par une vue d\'ensemble : « *Cette image représente…* », puis « *Il y a…* ».',
        'Les actions se disent au **présent** : *il nage, elle joue, le chien court*.',
        'Prépositions de lieu indispensables : **sur, sous, dans, devant, derrière, à côté de, entre**.',
        'Pour TROIS images : **image 1 = la situation de départ**, **image 2 = le problème**, **image 3 = la solution**.',
        'Connecteurs de temps : *D\'abord, Ensuite, Puis, Soudain, Enfin, Finalement*. Sans eux, ce n\'est qu\'une liste.',
        'Respecte toujours l\'ordre 1, 2, 3 - et donne à chaque image le même nombre de phrases.',
      ],
    },
  ],
});
