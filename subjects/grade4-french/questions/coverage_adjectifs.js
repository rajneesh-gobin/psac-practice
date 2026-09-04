'use strict';
// Targeted practice to give the smaller Grade 4 adjective and adverb sections
// enough varied, age-appropriate questions for repeat practice.
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => {
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  };

  [
    ['Je lis presque chaque soir : je lis ___ avant de dormir.', 'souvent'], ['Mina arrive à l’heure tous les jours : elle arrive ___ à l’heure à l’école.', 'toujours'],
    ['Nous jouons dans le jardin presque chaque jour : nous jouons ___ dans le jardin.', 'souvent'], ['Il ne mange ___ de bonbons.', 'jamais'],
    ['Tu aides ta grand-mère presque chaque semaine : tu aides ___ ta grand-mère.', 'souvent'], ['Le bus est en retard une ou deux fois par mois : il est ___ en retard.', 'parfois'],
    ['Mes amis sont gentils en toute occasion : ils sont ___ gentils.', 'toujours'], ['On va à la plage presque tous les dimanches : on va ___ à la plage le dimanche.', 'souvent'],
    ['Elle oublie son cahier de temps en temps : elle oublie ___ son cahier.', 'parfois'], ['Je ne crie ___ dans la classe.', 'jamais'],
    ['Vous rangez vos affaires chaque soir sans exception : vous rangez ___ vos affaires.', 'toujours'], ['Le chien dort près de la porte presque chaque nuit : il dort ___ près de la porte.', 'souvent'],
    ['Nous regardons un film certains samedis seulement : nous regardons ___ un film le samedi.', 'parfois'], ['Mon frère se lève tôt chaque jour sans exception : il se lève ___ tôt.', 'toujours'],
    ['Ils ne sont ___ absents.', 'jamais'], ['Tu dis bonjour chaque fois que tu arrives : tu dis ___ bonjour en arrivant.', 'toujours']
  ].forEach(([question, answer], i) => add(`g4fr-cov-adv-${i}`, 'g4fr-verbes', 'adverbes', question,
    ['toujours', 'souvent', 'parfois', 'jamais'], answer, 'Cherche un mot qui indique la fréquence.',
    `<b>${answer}</b> indique à quelle fréquence se passe l’action.`));

  [
    ['Voici ___ chat. (à moi)', 'mon'], ['Voici ___ trousse. (à moi)', 'ma'],
    ['Voici ___ crayons. (à moi)', 'mes'], ['Où est ___ livre ? (à toi)', 'ton'],
    ['Où est ___ règle ? (à toi)', 'ta'], ['Range ___ chaussures. (à toi)', 'tes'],
    ['Il cherche ___ chapeau. (à lui)', 'son'], ['Elle ferme ___ fenêtre. (à elle)', 'sa'],
    ['Il nourrit ___ poissons. (à lui)', 'ses'], ['Nous décorons ___ classe. (à nous)', 'notre'],
    ['Vous ouvrez ___ cahiers. (à vous)', 'vos'], ['Les enfants retrouvent ___ parents. (à eux)', 'leurs'],
    ['Je présente ___ sœur. (à moi)', 'ma']
  ].forEach(([question, answer], i) => add(`g4fr-cov-pos-${i}`, 'g4fr-adjectifs', 'possessifs', question,
    ['mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'vos', 'leurs'], answer,
    'L’adjectif possessif indique à qui appartient le nom.', `<b>${answer}</b> convient au propriétaire et au nom.`));

  [
    ['___ livre est passionnant.', 'Ce'], ['___ arbre est très haut.', 'Cet'],
    ['___ fleur sent bon.', 'Cette'], ['___ enfants chantent.', 'Ces'], ['___ avion vole bas.', 'Cet'],
    ['___ maison est jaune.', 'Cette'], ['___ chien court vite.', 'Ce'], ['___ images sont belles.', 'Ces'],
    ['___ ananas est sucré.', 'Cet'], ['___ histoire est drôle.', 'Cette'], ['___ gâteau est délicieux.', 'Ce'],
    ['___ amis arrivent demain.', 'Ces'], ['___ hiver est froid.', 'Cet'], ['___ plage est propre.', 'Cette'],
    ['___ jeu est facile.', 'Ce']
  ].forEach(([question, answer], i) => add(`g4fr-cov-dem-${i}`, 'g4fr-adjectifs', 'demonstratifs', question,
    ['Ce', 'Cet', 'Cette', 'Ces'], answer, 'Observe le genre et le nombre du nom.',
    `« <b>${answer}</b> » est l’adjectif démonstratif qui convient ici.`));

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
    `On dit <b>${answer}</b>. La place de l’adjectif dépend souvent de son sens.`));
})();
