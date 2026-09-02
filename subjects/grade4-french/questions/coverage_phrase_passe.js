'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const phrase = (prefix, subsection, rows, options, hint, explanation) => rows.forEach(([question, answer], i) =>
    add(`g4fr-cov-${prefix}-${i}`, 'g4fr-phrase', subsection, prefix === 'imp' ? `${question} Cherche « ${answer} »` : question, options, answer, hint, explanation(answer)));

  phrase('cod', 'cod_coi', [
    ['Dans « Lina mange une pomme », quel groupe est le COD ?', 'une pomme'], ['Dans « Papa lit le journal », quel groupe est le COD ?', 'le journal'],
    ['Dans « Le chat poursuit la souris », quel groupe est le COD ?', 'la souris'], ['Dans « Nous regardons un film », quel groupe est le COD ?', 'un film'],
    ['Dans « Sami dessine une maison », quel groupe est le COD ?', 'une maison'], ['Dans « Maman prépare le repas », quel groupe est le COD ?', 'le repas'],
    ['Dans « J’écoute la chanson », quel groupe est le COD ?', 'la chanson'], ['Dans « Ils construisent un château », quel groupe est le COD ?', 'un château'],
    ['Dans « Tu portes ton sac », quel groupe est le COD ?', 'ton sac'], ['Dans « Le bébé boit son lait », quel groupe est le COD ?', 'son lait'],
    ['Dans « Nous visitons le musée », quel groupe est le COD ?', 'le musée'], ['Dans « Elle ferme la porte », quel groupe est le COD ?', 'la porte'],
    ['Dans « Le maître explique la leçon », quel groupe est le COD ?', 'la leçon'], ['Dans « Vous cueillez des fleurs », quel groupe est le COD ?', 'des fleurs'],
    ['Dans « Je range mes jouets », quel groupe est le COD ?', 'mes jouets'], ['Dans « Le vent pousse les nuages », quel groupe est le COD ?', 'les nuages']
  ], ['une pomme', 'le journal', 'la souris', 'un film', 'une maison', 'le repas', 'la chanson', 'un château', 'ton sac', 'son lait', 'le musée', 'la porte', 'la leçon', 'des fleurs', 'mes jouets', 'les nuages'], 'Pose la question « quoi ? » après le verbe.', a => `Le COD répond à la question « le verbe + quoi ? » : <b>${a}</b>.`);

  phrase('imp', 'imperatif', [
    ['Quelle phrase est à l’impératif ?', 'Ferme la porte !'], ['Quelle phrase est à l’impératif ?', 'Range tes jouets !'],
    ['Quelle phrase est à l’impératif ?', 'Écoutez bien !'], ['Quelle phrase est à l’impératif ?', 'Prenons le bus !'],
    ['Quelle phrase est à l’impératif ?', 'Mange ta soupe !'], ['Quelle phrase est à l’impératif ?', 'Attendez votre tour !'],
    ['Quelle phrase est à l’impératif ?', 'Regardons le tableau !'], ['Quelle phrase est à l’impératif ?', 'Sois prudent !'],
    ['Quelle phrase est à l’impératif ?', 'Ayez confiance !'], ['Quelle phrase est à l’impératif ?', 'Choisis un livre !'],
    ['Quelle phrase est à l’impératif ?', 'Ne courez pas !'], ['Quelle phrase est à l’impératif ?', 'Écris ton prénom !'],
    ['Quelle phrase est à l’impératif ?', 'Lavez-vous les mains !'], ['Quelle phrase est à l’impératif ?', 'Finissons notre travail !']
  ], ['Ferme la porte !', 'Tu fermes la porte.', 'Range tes jouets !', 'Elle range ses jouets.', 'Écoutez bien !', 'Vous écoutez bien.', 'Prenons le bus !', 'Nous prenons le bus.', 'Mange ta soupe !', 'Il mange sa soupe.', 'Attendez votre tour !', 'Vous attendez votre tour.', 'Regardons le tableau !', 'Nous regardons le tableau.', 'Sois prudent !', 'Tu es prudent.', 'Ayez confiance !', 'Vous avez confiance.', 'Choisis un livre !', 'Tu choisis un livre.', 'Ne courez pas !', 'Ils ne courent pas.', 'Écris ton prénom !', 'Tu écris ton prénom.', 'Lavez-vous les mains !', 'Vous vous lavez les mains.', 'Finissons notre travail !', 'Nous finissons notre travail.'], 'L’impératif sert à donner une consigne ou un conseil.', a => `<b>${a}</b> donne une consigne : c’est l’impératif.`);

  phrase('quest', 'interrogation', [
    ['Quel mot interrogatif convient : « ___ habites-tu ? »', 'Où'], ['Quel mot interrogatif convient : « ___ arrives-tu ? »', 'Quand'],
    ['Quel mot interrogatif convient : « ___ viens-tu ? »', 'Pourquoi'], ['Quel mot interrogatif convient : « ___ est ton ami ? »', 'Qui'],
    ['Quel mot interrogatif convient : « ___ coûte ce livre ? »', 'Combien'], ['Quel mot interrogatif convient : « ___ fais-tu après l’école ? »', 'Que'],
    ['Quel mot interrogatif convient : « ___ couleur préfères-tu ? »', 'Quelle'], ['Quel mot interrogatif convient : « ___ vas-tu à pied ? »', 'Comment'],
    ['Quel mot interrogatif convient : « ___ est ton anniversaire ? »', 'Quand'], ['Quel mot interrogatif convient : « ___ chante dans la chorale ? »', 'Qui']
  ], ['Où', 'Quand', 'Pourquoi', 'Qui', 'Combien', 'Que', 'Quelle', 'Comment'], 'Lis la réponse que la question cherche.', a => `<b>${a}</b> permet de poser cette question.`);

  phrase('conj', 'conjonctions', [
    ['Je prends un parapluie ___ il pleut.', 'parce que'], ['Nous jouons dehors ___ il fait beau.', 'car'],
    ['Lina lit ___ son frère dessine.', 'pendant que'], ['Je me brosse les dents ___ je dors.', 'avant que'],
    ['Il est fatigué ___ il continue.', 'mais'], ['Tu peux choisir un jus ___ de l’eau.', 'ou'],
    ['Maman cuisine ___ papa met la table.', 'et'], ['Je resterai ici ___ tu reviendras.', 'jusqu’à ce que'],
    ['Le chat se cache ___ il entend du bruit.', 'parce que'], ['Nous partons ___ le bus arrive.', 'quand'],
    ['Elle sourit ___ elle est contente.', 'car'], ['Je mets mon pull ___ il fait froid.', 'parce que'],
    ['Il court vite ___ il rate le bus.', 'mais'], ['Tu finis tes devoirs ___ tu peux jouer.', 'puis'],
    ['Je ferme la fenêtre ___ le vent souffle.', 'car']
  ], ['parce que', 'car', 'pendant que', 'avant que', 'mais', 'ou', 'et', 'jusqu’à ce que', 'quand', 'puis'], 'Choisis le mot qui relie les deux idées.', a => `<b>${a}</b> relie correctement les deux parties de la phrase.`);

  [
    ['le / chat / dort', 'Le chat dort.'], ['joue / Sara / dehors', 'Sara joue dehors.'], ['mange / le lapin / une carotte', 'Le lapin mange une carotte.'],
    ['à l’école / vont / les enfants', 'Les enfants vont à l’école.'], ['un gâteau / prépare / maman', 'Maman prépare un gâteau.'],
    ['dans le ciel / volent / les oiseaux', 'Les oiseaux volent dans le ciel.'],
    ['un livre / je / lis', 'Je lis un livre.'], ['la porte / ferme / papa', 'Papa ferme la porte.'],
    ['au parc / nous / marchons', 'Nous marchons au parc.'], ['ses devoirs / fait / Lina', 'Lina fait ses devoirs.'],
    ['le chien / poursuit / la balle', 'Le chien poursuit la balle.'], ['le bus / attendons / nous', 'Nous attendons le bus.'],
    ['chante / dans la classe / Amir', 'Amir chante dans la classe.'], ['un dessin / tu / colories', 'Tu colories un dessin.'],
    ['brillent / la nuit / les étoiles', 'Les étoiles brillent la nuit.'], ['une lettre / écrit / mon frère', 'Mon frère écrit une lettre.'],
    ['la mer / regardez / vous', 'Vous regardez la mer.'], ['le jardin / arrose / grand-père', 'Grand-père arrose le jardin.'],
    ['vite / court / le cheval', 'Le cheval court vite.']
  ].forEach(([words, answer], i) => add(`g4fr-cov-order-${i}`, 'g4fr-phrase', 'ordre_mots', `Remets les mots dans l’ordre : « ${words} »`,
    [answer, words.split(' / ').reverse().join(' ') + '.'], answer, 'Cherche d’abord qui fait l’action, puis le verbe.', `La phrase correcte est : <b>${answer}</b>`));

  [
    ['Hier, j’___ mangé une banane.', 'ai'], ['Hier, nous ___ joué au ballon.', 'avons'], ['Hier, tu ___ fini ton travail.', 'as'],
    ['Hier, elle ___ regardé un film.', 'a'], ['Hier, vous ___ choisi un livre.', 'avez'], ['Hier, ils ___ visité le musée.', 'ont'],
    ['Hier, je ___ dessiné un bateau.', 'ai'], ['Hier, nous ___ rangé la classe.', 'avons'], ['Hier, tu ___ entendu le bruit.', 'as'],
    ['Hier, il ___ perdu sa casquette.', 'a'], ['Hier, vous ___ préparé le repas.', 'avez'], ['Hier, elles ___ trouvé un trésor.', 'ont'],
    ['Hier, j’___ écrit une carte.', 'ai'], ['Hier, nous ___ vendu des gâteaux.', 'avons'], ['Hier, tu ___ répondu à la question.', 'as'],
    ['Hier, elle ___ ouvert la fenêtre.', 'a'], ['Hier, ils ___ pris le train.', 'ont']
  ].forEach(([question, answer], i) => add(`g4fr-cov-aux-${i}`, 'g4fr-passe-comp', 'auxiliaire', question,
    ['ai', 'as', 'a', 'avons', 'avez', 'ont'], answer, 'Au passé composé, choisis la forme de « avoir » qui correspond au sujet.',
    `Avec ce sujet, l’auxiliaire « avoir » est <b>${answer}</b>.`));

  [
    ['Quel est le participe passé de « manger » ?', 'mangé'], ['Quel est le participe passé de « finir » ?', 'fini'],
    ['Quel est le participe passé de « jouer » ?', 'joué'], ['Quel est le participe passé de « voir » ?', 'vu'],
    ['Quel est le participe passé de « prendre » ?', 'pris'], ['Quel est le participe passé de « faire » ?', 'fait'],
    ['Quel est le participe passé de « lire » ?', 'lu'], ['Quel est le participe passé de « écrire » ?', 'écrit'],
    ['Quel est le participe passé de « mettre » ?', 'mis'], ['Quel est le participe passé de « dire » ?', 'dit'],
    ['Quel est le participe passé de « ouvrir » ?', 'ouvert']
  ].forEach(([question, answer], i) => add(`g4fr-cov-partic-${i}`, 'g4fr-passe-comp', 'participe', question,
    ['mangé', 'fini', 'joué', 'vu', 'pris', 'fait', 'lu', 'écrit', 'mis', 'dit', 'ouvert'], answer, 'Le participe passé est la deuxième partie du passé composé.',
    `Le participe passé de ce verbe est <b>${answer}</b>.`));
})();
