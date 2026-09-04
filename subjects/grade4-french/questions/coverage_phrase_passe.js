'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const phrase = (prefix, subsection, rows, options, hint, explanation) => rows.forEach(([question, answer], i) =>
    add(`g4fr-cov-${prefix}-${i}`, 'g4fr-phrase', subsection, question, options, answer, hint, explanation(answer)));

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

  const impDecl = ['Tu fermes la porte.', 'Elle range ses jouets.', 'Vous écoutez bien.', 'Nous prenons le bus.', 'Il mange sa soupe.', 'Vous attendez votre tour.', 'Nous regardons le tableau.', 'Tu es prudent.', 'Vous avez confiance.', 'Tu choisis un livre.', 'Ils ne courent pas.', 'Tu écris ton prénom.', 'Vous vous lavez les mains.', 'Nous finissons notre travail.'];
  ['Ferme la porte !', 'Range tes jouets !', 'Écoutez bien !', 'Prenons le bus !', 'Mange ta soupe !', 'Attendez votre tour !', 'Regardons le tableau !', 'Sois prudent !', 'Ayez confiance !', 'Choisis un livre !', 'Ne courez pas !', 'Écris ton prénom !', 'Lavez-vous les mains !', 'Finissons notre travail !'].forEach((answer, i) =>
    add(`g4fr-cov-imp-${i}`, 'g4fr-phrase', 'imperatif', 'Quelle phrase est à l’impératif ?', [answer, impDecl[i], impDecl[(i + 1) % 14], impDecl[(i + 2) % 14]], answer, 'L’impératif sert à donner une consigne ou un conseil.', `<b>${answer}</b> donne une consigne : c’est l’impératif.`));

  [
    ['Quel mot interrogatif convient : « ___ habites-tu ? »', 'Où', ['Qui', 'Combien', 'Que']],
    ['Quel mot interrogatif convient : « ___ arrives-tu ? »', 'Quand', ['Qui', 'Combien', 'Quelle']],
    ['Quel mot interrogatif convient : « ___ viens-tu ? »', 'Pourquoi', ['Qui', 'Combien', 'Quelle']],
    ['Quel mot interrogatif convient : « ___ est ton ami ? »', 'Qui', ['Combien', 'Que', 'Quand']],
    ['Quel mot interrogatif convient : « ___ coûte ce livre ? »', 'Combien', ['Qui', 'Quelle', 'Quand']],
    ['Quel mot interrogatif convient : « ___ fais-tu après l’école ? »', 'Que', ['Qui', 'Quelle', 'Combien']],
    ['Quel mot interrogatif convient : « ___ couleur préfères-tu ? »', 'Quelle', ['Qui', 'Que', 'Combien']],
    ['Quel mot interrogatif convient : « ___ vas-tu à l’école ? »', 'Comment', ['Qui', 'Combien', 'Quelle']],
    ['Quel mot interrogatif convient : « ___ est ton anniversaire ? »', 'Quand', ['Qui', 'Combien', 'Que']],
    ['Quel mot interrogatif convient : « ___ chante dans la chorale ? »', 'Qui', ['Quelle', 'Que', 'Combien']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-quest-${i}`, 'g4fr-phrase', 'interrogation', question,
    [answer].concat(wrong), answer, 'Lis la réponse que la question cherche.', `<b>${answer}</b> permet de poser cette question.`));

  [
    ['Je prends un parapluie ___ la pluie tombe.', 'parce que', ['ou', 'mais', 'jusqu’à ce que']],
    ['Nous jouons dehors ___ il fait beau.', 'car', ['mais', 'ou', 'puis']],
    ['Lina lit ___ son frère dessine.', 'pendant que', ['ou', 'parce que', 'jusqu’à ce que']],
    ['Je me brosse les dents ___ je ne dorme.', 'avant que', ['parce que', 'quand', 'car']],
    ['Il est fatigué ___ il continue.', 'mais', ['ou', 'puis', 'jusqu’à ce que']],
    ['Tu peux choisir un jus ___ de l’eau.', 'ou', ['mais', 'car', 'quand']],
    ['Maman cuisine ___ papa met la table.', 'et', ['ou', 'car', 'jusqu’à ce que']],
    ['Je resterai ici ___ tu reviennes.', 'jusqu’à ce que', ['quand', 'parce que', 'car']],
    ['Le chat se cache ___ le bruit lui fait peur.', 'parce que', ['ou', 'puis', 'jusqu’à ce que']],
    ['Nous partons ___ le bus arrive.', 'quand', ['ou', 'mais', 'jusqu’à ce que']],
    ['Elle sourit ___ elle est contente.', 'car', ['mais', 'ou', 'puis']],
    ['Je mets mon pull ___ la salle est froide.', 'parce que', ['ou', 'puis', 'jusqu’à ce que']],
    ['Il court vite ___ il rate le bus.', 'mais', ['ou', 'quand', 'jusqu’à ce que']],
    ['Tu finis tes devoirs ___ tu peux jouer.', 'puis', ['ou', 'mais', 'parce que']],
    ['Je ferme la fenêtre ___ le vent souffle.', 'car', ['ou', 'puis', 'jusqu’à ce que']]
  ].forEach(([question, answer, wrong], i) => add(`g4fr-cov-conj-${i}`, 'g4fr-phrase', 'conjonctions', question,
    [answer].concat(wrong), answer, 'Choisis le mot qui relie les deux idées.', `<b>${answer}</b> relie correctement les deux parties de la phrase.`));

  [
    ['le / chat / dort', 'Le chat dort.', 'Le dort chat.'],
    ['joue / Sara / dehors', 'Sara joue dehors.', 'Joue dehors Sara.'],
    ['mange / le lapin / une carotte', 'Le lapin mange une carotte.', 'Mange le lapin une carotte.'],
    ['à l’école / vont / les enfants', 'Les enfants vont à l’école.', 'Vont à l’école les enfants.'],
    ['un gâteau / prépare / maman', 'Maman prépare un gâteau.', 'Prépare maman un gâteau.'],
    ['dans le ciel / volent / les oiseaux', 'Les oiseaux volent dans le ciel.', 'Volent dans le ciel les oiseaux.'],
    ['un livre / je / lis', 'Je lis un livre.', 'Je un livre lis.'],
    ['la porte / ferme / papa', 'Papa ferme la porte.', 'Ferme papa la porte.'],
    ['au parc / nous / marchons', 'Nous marchons au parc.', 'Nous au parc marchons.'],
    ['ses devoirs / fait / Lina', 'Lina fait ses devoirs.', 'Fait Lina ses devoirs.'],
    ['le chien / poursuit / la balle', 'Le chien poursuit la balle.', 'Le chien la balle poursuit.'],
    ['le bus / attendons / nous', 'Nous attendons le bus.', 'Attendons nous le bus.'],
    ['chante / dans la classe / Amir', 'Amir chante dans la classe.', 'Chante dans la classe Amir.'],
    ['un dessin / tu / colories', 'Tu colories un dessin.', 'Tu un dessin colories.'],
    ['brillent / la nuit / les étoiles', 'Les étoiles brillent la nuit.', 'Brillent la nuit les étoiles.'],
    ['une lettre / écrit / mon frère', 'Mon frère écrit une lettre.', 'Écrit mon frère une lettre.'],
    ['la mer / regardez / vous', 'Vous regardez la mer.', 'Regardez la mer vous.'],
    ['le jardin / arrose / grand-père', 'Grand-père arrose le jardin.', 'Arrose grand-père le jardin.'],
    ['vite / court / le cheval', 'Le cheval court vite.', 'Court le cheval vite.']
  ].forEach(([words, answer, wrong], i) => add(`g4fr-cov-order-${i}`, 'g4fr-phrase', 'ordre_mots', `Remets les mots dans l’ordre : « ${words} »`,
    [answer, wrong], answer, 'Cherche d’abord qui fait l’action, puis le verbe.', `La phrase correcte est : <b>${answer}</b>`));

  [
    ['Hier, j’___ mangé une banane.', 'ai'], ['Hier, nous ___ joué au ballon.', 'avons'], ['Hier, tu ___ fini ton travail.', 'as'],
    ['Hier, elle ___ regardé un film.', 'a'], ['Hier, vous ___ choisi un livre.', 'avez'], ['Hier, ils ___ visité le musée.', 'ont'],
    ['Hier, j’___ dessiné un bateau.', 'ai'], ['Hier, nous ___ rangé la classe.', 'avons'], ['Hier, tu ___ entendu le bruit.', 'as'],
    ['Hier, il ___ perdu sa casquette.', 'a'], ['Hier, vous ___ préparé le repas.', 'avez'], ['Hier, elles ___ trouvé un trésor.', 'ont'],
    ['Hier, j’___ écrit une carte.', 'ai'], ['Hier, nous ___ vendu des gâteaux.', 'avons'], ['Hier, tu ___ répondu à la question.', 'as'],
    ['Hier, elle ___ ouvert la fenêtre.', 'a'], ['Hier, ils ___ pris le train.', 'ont']
  ].forEach(([question, answer], i) => add(`g4fr-cov-aux-${i}`, 'g4fr-passe-comp', 'auxiliaire', question,
    ['ai', 'as', 'a', 'avons', 'avez', 'ont'], answer, 'Au passé composé, choisis la forme du verbe « avoir » qui correspond au sujet.',
    `Avec ce sujet, l’auxiliaire « avoir » est <b>${answer}</b>.`));

  [
    ['Quel est le participe passé de « manger » ?', 'mangé'], ['Quel est le participe passé de « finir » ?', 'fini'],
    ['Quel est le participe passé de « jouer » ?', 'joué'], ['Quel est le participe passé de « voir » ?', 'vu'],
    ['Quel est le participe passé de « prendre » ?', 'pris'], ['Quel est le participe passé de « faire » ?', 'fait'],
    ['Quel est le participe passé de « lire » ?', 'lu'], ['Quel est le participe passé du verbe « écrire » ?', 'écrit'],
    ['Quel est le participe passé de « mettre » ?', 'mis'], ['Quel est le participe passé de « dire » ?', 'dit'],
    ['Quel est le participe passé du verbe « ouvrir » ?', 'ouvert']
  ].forEach(([question, answer], i) => add(`g4fr-cov-partic-${i}`, 'g4fr-passe-comp', 'participe', question,
    ['mangé', 'fini', 'joué', 'vu', 'pris', 'fait', 'lu', 'écrit', 'mis', 'dit', 'ouvert'], answer, 'Le participe passé est la deuxième partie du passé composé.',
    `Le participe passé de ce verbe est <b>${answer}</b>.`));
})();
