'use strict';
registerSubject({
  id: 'grade4-french', name: 'French', grade: 4, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: true, noDifficulty: true,
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
  ],
});
