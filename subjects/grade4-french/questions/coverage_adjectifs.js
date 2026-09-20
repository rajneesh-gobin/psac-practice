'use strict';
// Targeted practice to give the smaller Grade 4 adjective and adverb sections
// enough varied, age-appropriate questions for repeat practice.
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => {
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  };

  [
    ['Je lis presque chaque soir : je lis ___ avant de dormir.', 'souvent'], ['Mina arrive à l\'heure tous les jours : elle arrive ___ à l\'heure à l\'école.', 'toujours'],
    ['Nous jouons dans le jardin presque chaque jour : nous jouons ___ dans le jardin.', 'souvent'], ['Il ne mange ___ de bonbons.', 'jamais'],
    ['Tu aides ta grand-mère presque chaque semaine : tu aides ___ ta grand-mère.', 'souvent'], ['Le bus est en retard une ou deux fois par mois : il est ___ en retard.', 'parfois'],
    ['Mes amis sont gentils en toute occasion : ils sont ___ gentils.', 'toujours'], ['On va à la plage presque tous les dimanches : on va ___ à la plage le dimanche.', 'souvent'],
    ['Elle oublie son cahier de temps en temps : elle oublie ___ son cahier.', 'parfois'], ['Je ne crie ___ dans la classe.', 'jamais'],
    ['Vous rangez vos affaires chaque soir sans exception : vous rangez ___ vos affaires.', 'toujours'], ['Le chien dort près de la porte presque chaque nuit : il dort ___ près de la porte.', 'souvent'],
    ['Nous regardons un film certains samedis seulement : nous regardons ___ un film le samedi.', 'parfois'], ['Mon frère se lève tôt chaque jour sans exception : il se lève ___ tôt.', 'toujours'],
    ['Ils ne sont ___ absents.', 'jamais'], ['Tu dis bonjour chaque fois que tu arrives : tu dis ___ bonjour en arrivant.', 'toujours']
  ].forEach(([question, answer], i) => add(`g4fr-cov-adv-${i}`, 'g4fr-verbes', 'adverbes', question,
    ['toujours', 'souvent', 'parfois', 'jamais'], answer, 'Cherche un mot qui indique la fréquence.',
    `<b>${answer}</b> indique à quelle fréquence se passe l\'action.`));

  // possessifs — individual calls so each question's distractors are wrong for its specific person/gender/number
  add('g4fr-cov-pos-0', 'g4fr-adjectifs', 'possessifs', 'Voici ___ chat. (à moi)',
    ['mon', 'ma', 'mes', 'ton'], 'mon',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>mon</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-1', 'g4fr-adjectifs', 'possessifs', 'Voici ___ trousse. (à moi)',
    ['ma', 'mon', 'mes', 'ta'], 'ma',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>ma</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-2', 'g4fr-adjectifs', 'possessifs', 'Voici ___ crayons. (à moi)',
    ['mes', 'mon', 'ma', 'tes'], 'mes',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>mes</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-3', 'g4fr-adjectifs', 'possessifs', 'Où est ___ livre ? (à toi)',
    ['ton', 'ta', 'tes', 'mon'], 'ton',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>ton</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-4', 'g4fr-adjectifs', 'possessifs', 'Où est ___ règle ? (à toi)',
    ['ta', 'ton', 'tes', 'ma'], 'ta',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>ta</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-5', 'g4fr-adjectifs', 'possessifs', 'Range ___ chaussures. (à toi)',
    ['tes', 'ton', 'ta', 'mes'], 'tes',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>tes</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-6', 'g4fr-adjectifs', 'possessifs', 'Il cherche ___ chapeau. (à lui)',
    ['son', 'sa', 'ses', 'ton'], 'son',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>son</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-7', 'g4fr-adjectifs', 'possessifs', 'Elle ferme ___ fenêtre. (à elle)',
    ['sa', 'son', 'ses', 'ta'], 'sa',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>sa</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-8', 'g4fr-adjectifs', 'possessifs', 'Il nourrit ___ poissons. (à lui)',
    ['ses', 'son', 'sa', 'mes'], 'ses',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>ses</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-9', 'g4fr-adjectifs', 'possessifs', 'Nous décorons ___ classe. (à nous)',
    ['notre', 'nos', 'votre', 'leur'], 'notre',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>notre</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-10', 'g4fr-adjectifs', 'possessifs', 'Vous ouvrez ___ cahiers. (à vous)',
    ['vos', 'votre', 'nos', 'leurs'], 'vos',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>vos</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-11', 'g4fr-adjectifs', 'possessifs', 'Les enfants retrouvent ___ parents. (à eux)',
    ['leurs', 'leur', 'vos', 'ses'], 'leurs',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>leurs</b> convient au propriétaire et au nom.');
  add('g4fr-cov-pos-12', 'g4fr-adjectifs', 'possessifs', 'Je présente ___ sœur. (à moi)',
    ['ma', 'mon', 'mes', 'sa'], 'ma',
    'L\'adjectif possessif indique à qui appartient le nom.', '<b>ma</b> convient au propriétaire et au nom.');

  [
    ['___ livre est passionnant.', 'Ce'], ['___ arbre est très haut.', 'Cet'],
    ['___ fleur sent bon.', 'Cette'], ['___ enfants chantent.', 'Ces'], ['___ avion vole bas.', 'Cet'],
    ['___ maison est jaune.', 'Cette'], ['___ chien court vite.', 'Ce'], ['___ images sont belles.', 'Ces'],
    ['___ ananas est sucré.', 'Cet'], ['___ histoire est drôle.', 'Cette'], ['___ gâteau est délicieux.', 'Ce'],
    ['___ amis arrivent demain.', 'Ces'], ['___ hiver est froid.', 'Cet'], ['___ plage est propre.', 'Cette'],
    ['___ jeu est facile.', 'Ce']
  ].forEach(([question, answer], i) => add(`g4fr-cov-dem-${i}`, 'g4fr-adjectifs', 'demonstratifs', question,
    ['Ce', 'Cet', 'Cette', 'Ces'], answer, 'Observe le genre et le nombre du nom.',
    `« <b>${answer}</b> » est l\'adjectif démonstratif qui convient ici.`));

  [
    ['Choisis le groupe nominal correct.', 'un grand jardin', 'un jardin grand'],
    ['Choisis le groupe nominal correct.', 'une petite souris', 'une souris petite'],
    ['Choisis le groupe nominal correct.', 'un joli dessin', 'un dessin joli'],
    ['Choisis le groupe nominal correct.', 'un vieux livre', 'un livre vieux'],
    ['Choisis le groupe nominal correct.', 'une jeune fille', 'une fille jeune'],
    ['Choisis le groupe nominal correct.', 'un bon repas', 'un repas bon'],
    ['Choisis le groupe nominal correct.', 'une grande table', 'une table grande'],
    ['Choisis le groupe nominal correct.', 'une robe rouge', 'une rouge robe'],
    ['Choisis le groupe nominal correct.', 'un sac bleu', 'un bleu sac'],
    ['Choisis le groupe nominal correct.', 'des chaussures noires', 'des noires chaussures'],
    ['Choisis le groupe nominal correct.', 'un ballon rond', 'un rond ballon'],
    ['Choisis le groupe nominal correct.', 'une voiture rapide', 'une rapide voiture'],
    ['Choisis le groupe nominal correct.', 'une longue route', 'une route longue'],
    ['Choisis le groupe nominal correct.', 'un petit frère', 'un frère petit'],
    ['Choisis le groupe nominal correct.', 'une belle chanson', 'une chanson belle'],
    ['Choisis le groupe nominal correct.', 'un chat blanc', 'un blanc chat'],
    ['Choisis le groupe nominal correct.', 'une histoire intéressante', 'une intéressante histoire'],
    ['Choisis le groupe nominal correct.', 'un gros nuage', 'un nuage gros'],
    ['Choisis le groupe nominal correct.', 'une maison calme', 'une calme maison']
  ].forEach(([question, answer, distractor], i) => add(`g4fr-cov-place-${i}`, 'g4fr-adjectifs', 'place', `${question} « ${answer} » ou « ${distractor} » ?`,
    [answer, distractor], answer, 'Certains adjectifs vont avant le nom; beaucoup de couleurs vont après.',
    `On dit <b>${answer}</b>. La place de l\'adjectif dépend souvent de son sens.`));
})();
