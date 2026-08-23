'use strict';
registerSubject({
  id: 'grade5-french', name: 'French', grade: 5, icon: '🇫🇷', subject: 'French',
  curriculum: 'MIE Mauritius', comingSoon: true,
  practiceble: false, notesBased: true,
  chapters: [
    {
      id: 'fr-vocabulaire', name: 'Vocabulaire de base', icon: '🗣️',
      notes: [
        '**Les salutations**: Bonjour (Good morning), Bonsoir (Good evening), Au revoir (Goodbye), Merci (Thank you), S\'il vous plaît (Please).',
        '**Les nombres**: un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix… vingt, trente, cent.',
        '**Les couleurs**: rouge (red), bleu (blue), vert (green), jaune (yellow), noir (black), blanc (white), orange.',
        '**Les jours**: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.',
        '**Les mois**: janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.',
      ],
    },
    {
      id: 'fr-noms', name: 'Les Noms (Genre & Nombre)', icon: '📝',
      notes: [
        'In French, every noun is either **masculine (m.)** or **feminine (f.)**.',
        '**Masculine** articles: un (a), le (the). **Feminine** articles: une (a), la (the).',
        'Most nouns add **-s** in the plural: le chat → les chats.',
        'Nouns ending in **-eau** add **-x**: le bateau → les bateaux.',
        'Nouns ending in **-al** change to **-aux**: le journal → les journaux.',
        'Le/la become **l\'** before a vowel or silent h: l\'ami, l\'hôtel.',
        'Plural article is always **les** (m. or f.): les chats, les maisons.',
      ],
    },
    {
      id: 'fr-verbes-present', name: 'Les Verbes — Présent', icon: '🏃',
      notes: [
        '**-ER verbs** (most common): parler (to speak) → je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.',
        '**-IR verbs**: finir (to finish) → je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
        '**Être** (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont.',
        '**Avoir** (to have): j\'ai, tu as, il a, nous avons, vous avez, ils ont.',
        '**Aller** (to go): je vais, tu vas, il va, nous allons, vous allez, ils vont.',
        '**Faire** (to do/make): je fais, tu fais, il fait, nous faisons, vous faites, ils font.',
      ],
    },
    {
      id: 'fr-adjectifs', name: 'Les Adjectifs', icon: '🎨',
      notes: [
        'In French, adjectives **agree** with the noun (masculine/feminine, singular/plural).',
        'Most adjectives add **-e** for feminine: grand → grande, petit → petite.',
        'Most adjectives add **-s** for plural: grand → grands, grande → grandes.',
        '**Before the noun** (BAGS adjectives): Beauty (beau/belle), Age (vieux/jeune), Goodness (bon/mauvais), Size (grand/petit).',
        'Irregular: beau/belle (beautiful), vieux/vieille (old), nouveau/nouvelle (new).',
        'Example: un grand garçon (m.) / une grande fille (f.) / de grands garçons (m.pl.)',
      ],
    },
    {
      id: 'fr-passe-compose', name: 'Le Passé Composé', icon: '⏰',
      notes: [
        'Used for actions **completed in the past**.',
        'Structure: **subject + avoir/être + past participle**.',
        '**-ER past participle**: parler → parlé, manger → mangé.',
        '**-IR past participle**: finir → fini, choisir → choisi.',
        '**-RE past participle**: vendre → vendu, attendre → attendu.',
        '**DR MRS VAN DER TRAMP** verbs use **être**: aller (allé), venir (venu), partir (parti), arriver (arrivé), naître (né), mourir (mort)…',
        'With être, the participle agrees with subject: Elle est allée. Ils sont partis.',
        'Irregular participles: avoir→eu, être→été, faire→fait, prendre→pris, voir→vu.',
      ],
    },
    {
      id: 'fr-pronoms', name: 'Les Pronoms', icon: '👤',
      notes: [
        '**Subject pronouns**: je (I), tu (you-informal), il (he), elle (she), nous (we), vous (you-formal/pl), ils (they-m), elles (they-f).',
        '**Direct object pronouns**: me, te, le/la, nous, vous, les. Place BEFORE the verb.',
        '**Stressed pronouns**: moi, toi, lui, elle, nous, vous, eux, elles. Used after prepositions.',
        '**Y** replaces a place or *à + noun*: Tu vas à Paris? Oui, j\'y vais.',
        '**En** replaces *de + noun*: Tu veux du pain? Oui, j\'en veux.',
      ],
    },
    {
      id: 'fr-lecture', name: 'Lecture & Compréhension', icon: '🔍',
      notes: [
        'Read the text carefully **twice** before answering questions.',
        'For factual questions: find the answer directly in the text (copy accurately).',
        'For "dans vos propres mots" (in your own words): rephrase the answer.',
        'Connectors to use in answers: *parce que* (because), *donc* (so), *mais* (but), *et* (and), *car* (because).',
        'Always check gender/number agreement in your answers.',
        'Underline key words in questions to stay focused.',
      ],
    },
    {
      id: 'fr-grammaire', name: 'Grammaire Essentielle', icon: '📏',
      notes: [
        '**Negation**: put *ne* before verb and *pas* after: Je ne mange pas. (I do not eat.)',
        '**Questions**: Inversion (Parles-tu?) or *Est-ce que* (Est-ce que tu parles?).',
        '**Prepositions of place**: dans (in), sur (on), sous (under), devant (in front of), derrière (behind), entre (between).',
        '**Du/de la/des** (partitive articles — some): Je mange du pain. Elle boit de la limonade. Ils ont des amis.',
        '**Futur proche** (near future): aller + infinitive. Je vais manger (I am going to eat).',
      ],
    },
  ],
});
