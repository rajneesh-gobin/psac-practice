'use strict';
// @enrichment - Bonus chapter "Relier les Phrases". DERIVED from the syllabus
// (propositions subordonnées, pronoms relatifs), NOT a direct MIE chapter.
// DO NOT remove during syllabus alignment audits.
//
// Grade 6 level, the hardest of the three: "dont" and "auquel/duquel", the
// subjunctive that "bien que / afin que / pour que / avant que" force, the
// participe présent as a way of joining, and the agreement of a past participle
// with a COD that the relative pronoun has moved in front of the verb.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'g6fr-enr-relier';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6fr-rel-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Relie les deux phrases en te servant de « <b>${given}</b> ». `
        + `Fais les changements nécessaires s’il y a lieu.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · PRONOMS RELATIFS ────────────────────────────────────────────────
  J('relatifs', 3, 'dont', 'C’est un écrivain.', 'J’admire beaucoup le style de cet écrivain.',
    'C’est un écrivain dont j’admire beaucoup le style.',
    ['C’est un écrivain que j’admire beaucoup le style.',
     'C’est un écrivain qui j’admire beaucoup le style.',
     'C’est un écrivain dont j’admire beaucoup son style.'],
    '« le style DE cet écrivain » → « dont ».',
    '<b>dont</b> remplace un complément introduit par « de ». ⚠ On ne garde pas le possessif : on dit « dont j’admire le style », jamais « dont j’admire <i>son</i> style ».');

  J('relatifs', 4, 'que', 'Voici les photos.', 'Mon oncle a pris ces photos pendant son voyage.',
    'Voici les photos que mon oncle a prises pendant son voyage.',
    ['Voici les photos que mon oncle a pris pendant son voyage.',
     'Voici les photos qui mon oncle a prises pendant son voyage.',
     'Voici les photos dont mon oncle a prises pendant son voyage.'],
    'Le COD est passé AVANT le verbe.',
    'Avec <i>avoir</i>, le participe s’accorde avec le COD placé avant : « les photos » est féminin pluriel, donc <b>prises</b>.');

  J('relatifs', 3, 'dont', 'Je te présente l’amie.', 'Je t’ai parlé de cette amie.',
    'Je te présente l’amie dont je t’ai parlé.',
    ['Je te présente l’amie que je t’ai parlé.',
     'Je te présente l’amie qui je t’ai parlé.',
     'Je te présente l’amie dont je t’ai parlé d’elle.'],
    'On dit « parler <b>de</b> quelqu’un ».',
    'Le verbe se construit avec « de », donc <b>dont</b>. Le « de » ne se répète pas.');

  J('relatifs', 4, 'auquel', 'Voici le concours.', 'J’ai participé à ce concours.',
    'Voici le concours auquel j’ai participé.',
    ['Voici le concours dont j’ai participé.',
     'Voici le concours que j’ai participé.',
     'Voici le concours auquel j’ai participé à ce concours.'],
    'On dit « participer <b>à</b> quelque chose ».',
    'Avec « à » + nom masculin singulier, le relatif est <b>auquel</b> (à + lequel). « dont » ne s’emploie qu’avec « de ».');

  J('relatifs', 3, 'où', 'Je n’oublierai jamais le moment.', 'Elle est entrée dans la salle à ce moment.',
    'Je n’oublierai jamais le moment où elle est entrée dans la salle.',
    ['Je n’oublierai jamais le moment que elle est entrée dans la salle.',
     'Je n’oublierai jamais le moment dont elle est entrée dans la salle.',
     'Je n’oublierai jamais le moment auquel elle est entrée dans la salle.'],
    '« où » sert aussi pour le temps.',
    '<b>où</b> reprend un complément de <b>lieu ou de temps</b> : « le jour où », « le moment où ».');

  J('relatifs', 4, 'dont', 'Les élèves seront récompensés.', 'Les résultats de ces élèves sont excellents.',
    'Les élèves dont les résultats sont excellents seront récompensés.',
    ['Les élèves que les résultats sont excellents seront récompensés.',
     'Les élèves dont leurs résultats sont excellents seront récompensés.',
     'Les élèves qui les résultats sont excellents seront récompensés.'],
    'La relative se glisse entre le sujet et son verbe.',
    '« les résultats <b>de</b> ces élèves » → <b>dont</b>. La relative s’insère juste après « les élèves », avant le verbe principal.');

  J('relatifs', 3, 'qui', 'Le vieil homme nous a salués.', 'Le vieil homme vend des fruits au marché.',
    'Le vieil homme qui vend des fruits au marché nous a salués.',
    ['Le vieil homme que vend des fruits au marché nous a salués.',
     'Le vieil homme dont vend des fruits au marché nous a salués.',
     'Le vieil homme qui il vend des fruits au marché nous a salués.'],
    'Sujet du verbe « vend ».',
    '<b>qui</b> reprend le sujet ; on n’ajoute jamais un pronom après lui (« qui <i>il</i> vend » est incorrect).');

  J('relatifs', 4, 'duquel', 'C’est le bâtiment.', 'Nous nous sommes assis en face de ce bâtiment.',
    'C’est le bâtiment en face duquel nous nous sommes assis.',
    ['C’est le bâtiment en face dont nous nous sommes assis.',
     'C’est le bâtiment en face que nous nous sommes assis.',
     'C’est le bâtiment en face où nous nous sommes assis.'],
    'Après une locution en « de » (en face de, près de, à côté de).',
    '⚠ Après une <b>locution prépositive</b> terminée par « de », on emploie <b>duquel</b>, jamais « dont ».');

  J('relatifs', 3, 'que', 'La décision était juste.', 'Le directeur a pris cette décision hier.',
    'La décision que le directeur a prise hier était juste.',
    ['La décision que le directeur a pris hier était juste.',
     'La décision qui le directeur a prise hier était juste.',
     'La décision dont le directeur a prise hier était juste.'],
    'Accord du participe avec le COD placé avant.',
    '« La décision » (féminin singulier) est le COD placé avant : le participe s’accorde → <b>prise</b>.');

  J('relatifs', 4, 'dont', 'J’ai acheté un dictionnaire.', 'Je me sers de ce dictionnaire tous les jours.',
    'J’ai acheté un dictionnaire dont je me sers tous les jours.',
    ['J’ai acheté un dictionnaire que je me sers tous les jours.',
     'J’ai acheté un dictionnaire auquel je me sers tous les jours.',
     'J’ai acheté un dictionnaire dont je m’en sers tous les jours.'],
    '« se servir <b>de</b> quelque chose ».',
    'Le verbe « se servir de » appelle <b>dont</b>. ⚠ On ne garde pas « en » : « dont je m’<i>en</i> sers » est un doublon fautif.');

  // ── 2 · EXPRIMER LA CAUSE ───────────────────────────────────────────────
  J('cause', 3, 'étant donné que', 'La route est bloquée.', 'Nous prendrons un autre chemin.',
    'Étant donné que la route est bloquée, nous prendrons un autre chemin.',
    ['Nous prendrons un autre chemin étant donné que, la route est bloquée.',
     'Étant donné que nous prendrons un autre chemin, la route est bloquée.',
     'La route est étant donné que bloquée, nous prendrons un autre chemin.'],
    'Une cause présentée comme un fait établi, en tête de phrase.',
    '<b>Étant donné que</b> ouvre la phrase avec la cause, suivie d’une virgule puis de la conséquence.');

  J('cause', 3, 'puisque', 'Tu es déjà venu ici.', 'Tu peux nous guider.',
    'Puisque tu es déjà venu ici, tu peux nous guider.',
    ['Tu peux nous guider puisque, tu es déjà venu ici.',
     'Puisque tu peux nous guider, tu es déjà venu ici.',
     'Tu es puisque déjà venu ici, tu peux nous guider.'],
    '« puisque » = une cause que les deux personnes connaissent.',
    '<b>Puisque</b> rappelle un fait déjà admis, contrairement à « parce que » qui apporte une information nouvelle.');

  J('cause', 4, 'à cause de', 'Le vol a été annulé.', 'Il y avait une tempête.',
    'Le vol a été annulé à cause d’une tempête.',
    ['Le vol a été annulé à cause de il y avait une tempête.',
     'Le vol a été annulé grâce à une tempête.',
     'À cause du vol annulé, il y avait une tempête.'],
    '« à cause de » est suivi d’un NOM, pas d’une proposition.',
    '⚠ <b>à cause de</b> + nom (« à cause d’une tempête »). Et il marque une cause <b>fâcheuse</b> - « grâce à » servirait pour un résultat heureux.');

  J('cause', 3, 'comme', 'Les magasins ferment tôt le dimanche.', 'Nous ferons les courses samedi.',
    'Comme les magasins ferment tôt le dimanche, nous ferons les courses samedi.',
    ['Nous ferons les courses samedi comme les magasins ferment tôt le dimanche.',
     'Comme nous ferons les courses samedi, les magasins ferment tôt le dimanche.',
     'Les magasins ferment comme tôt le dimanche, nous ferons les courses samedi.'],
    '« comme » causal ne peut pas se placer au milieu.',
    'Placé au milieu, « comme » serait lu comme une comparaison. En tête de phrase, il exprime clairement la <b>cause</b>.');

  J('cause', 2, 'car', 'Le spectacle a été reporté.', 'Le chanteur était souffrant.',
    'Le spectacle a été reporté, car le chanteur était souffrant.',
    ['Car le spectacle a été reporté, le chanteur était souffrant.',
     'Le spectacle car a été reporté le chanteur était souffrant.',
     'Car le chanteur était souffrant, le spectacle a été reporté.'],
    '« car » ne commence jamais une phrase.',
    '<b>car</b> introduit l’explication et se place obligatoirement à l’intérieur de la phrase, après une virgule.');

  J('cause', 4, 'grâce à', 'Nous avons retrouvé le chemin.', 'Un villageois nous a aidés.',
    'Nous avons retrouvé le chemin grâce à un villageois.',
    ['Nous avons retrouvé le chemin à cause d’un villageois.',
     'Nous avons retrouvé le chemin grâce à un villageois nous a aidés.',
     'Grâce au chemin retrouvé, un villageois nous a aidés.'],
    'La cause est-elle heureuse ou fâcheuse ?',
    '<b>grâce à</b> + nom introduit une cause <b>favorable</b>. « à cause de » serait ici un contresens.');

  J('cause', 3, 'parce que', 'Le musée est fermé aujourd’hui.', 'On y installe une nouvelle exposition.',
    'Le musée est fermé aujourd’hui parce qu’on y installe une nouvelle exposition.',
    ['Le musée est fermé aujourd’hui parce que on y installe une nouvelle exposition.',
     'Parce que le musée est fermé aujourd’hui, on y installe une nouvelle exposition.',
     'Le musée parce qu’est fermé aujourd’hui on y installe une exposition.'],
    'Élision devant « on ».',
    '« que » s’élide devant une voyelle : <b>parce qu’on</b>. La cause suit la conjonction.');

  J('cause', 3, 'puisque', 'Vous êtes tous arrivés.', 'Nous pouvons commencer la réunion.',
    'Puisque vous êtes tous arrivés, nous pouvons commencer la réunion.',
    ['Nous pouvons commencer la réunion puisque, vous êtes tous arrivés.',
     'Puisque nous pouvons commencer la réunion, vous êtes tous arrivés.',
     'Vous êtes puisque tous arrivés, nous pouvons commencer la réunion.'],
    'Le fait est visible de tous.',
    '<b>Puisque</b> s’appuie sur une évidence partagée, puis on en tire la conséquence.');

  J('cause', 4, 'étant donné que', 'Les résultats sont excellents.', 'La classe recevra une récompense.',
    'Étant donné que les résultats sont excellents, la classe recevra une récompense.',
    ['La classe recevra une récompense étant donné que, les résultats sont excellents.',
     'Étant donné que la classe recevra une récompense, les résultats sont excellents.',
     'Les résultats sont étant donné qu’excellents, la classe recevra une récompense.'],
    'Cause établie, virgule, conséquence.',
    '<b>Étant donné que</b> appartient au registre soutenu et se place toujours en tête.');

  J('cause', 2, 'car', 'Je n’ai pas pu te répondre.', 'Mon téléphone était déchargé.',
    'Je n’ai pas pu te répondre, car mon téléphone était déchargé.',
    ['Car je n’ai pas pu te répondre, mon téléphone était déchargé.',
     'Je n’ai car pas pu te répondre mon téléphone était déchargé.',
     'Car mon téléphone était déchargé, je n’ai pas pu te répondre.'],
    'Virgule + « car » + explication.',
    '<b>car</b> justifie ce qui vient d’être dit et ne peut pas ouvrir la phrase.');

  // ── 3 · EXPRIMER L’OPPOSITION ───────────────────────────────────────────
  J('opposition', 4, 'bien que', 'La mer est agitée.', 'Les pêcheurs sortent du port.',
    'Bien que la mer soit agitée, les pêcheurs sortent du port.',
    ['Bien que la mer est agitée, les pêcheurs sortent du port.',
     'Les pêcheurs sortent du port bien que, la mer est agitée.',
     'Bien que les pêcheurs sortent du port, la mer soit agitée.'],
    'Quel mode après « bien que » ?',
    '⚠ <b>bien que</b> est toujours suivi du <b>subjonctif</b> : « bien que la mer <b>soit</b> agitée » (et non « est »).');

  J('opposition', 4, 'bien que', 'Le devoir est difficile.', 'Mia ne se décourage pas.',
    'Bien que le devoir soit difficile, Mia ne se décourage pas.',
    ['Bien que le devoir est difficile, Mia ne se décourage pas.',
     'Mia ne se décourage pas bien que, le devoir est difficile.',
     'Bien que Mia ne se décourage pas, le devoir soit difficile.'],
    'Le verbe change de mode après « bien que ».',
    'Subjonctif obligatoire : « bien que le devoir <b>soit</b> difficile ».');

  J('opposition', 3, 'tandis que', 'Mon frère révise ses leçons.', 'Ma sœur joue dans le jardin.',
    'Mon frère révise ses leçons, tandis que ma sœur joue dans le jardin.',
    ['Tandis que mon frère révise ses leçons tandis que ma sœur joue dans le jardin.',
     'Mon frère tandis que révise ses leçons, ma sœur joue dans le jardin.',
     'Mon frère révise ses leçons, ma sœur joue tandis que dans le jardin.'],
    '« tandis que » oppose deux situations parallèles.',
    '<b>tandis que</b> met deux comportements en contraste ; il se place devant la seconde proposition.');

  J('opposition', 4, 'quoique', 'Il pleut à verse.', 'La cérémonie a lieu dehors.',
    'Quoiqu’il pleuve à verse, la cérémonie a lieu dehors.',
    ['Quoiqu’il pleut à verse, la cérémonie a lieu dehors.',
     'Quoique il pleuve à verse, la cérémonie a lieu dehors.',
     'La cérémonie a lieu dehors quoique, il pleut à verse.'],
    'Deux pièges à la fois : le mode du verbe, et l’élision.',
    '<b>Quoique</b> est un synonyme de « bien que » : il s’élide devant une voyelle (<b>quoiqu’</b>) ET il demande le <b>subjonctif</b> - « quoiqu’il <b>pleuve</b> », jamais « pleut ».');

  J('opposition', 3, 'pourtant', 'Cette solution semblait évidente.', 'Personne n’y avait pensé.',
    'Cette solution semblait évidente ; pourtant, personne n’y avait pensé.',
    ['Pourtant cette solution semblait évidente personne n’y avait pensé.',
     'Cette solution semblait pourtant évidente, personne n’y avait pourtant pensé.',
     'Cette solution semblait évidente, personne n’y avait pensé pourtant que.'],
    '« pourtant » annonce un fait surprenant.',
    '<b>pourtant</b> souligne le contraste après un point-virgule, et se détache par une virgule.');

  J('opposition', 3, 'alors que', 'Le nord de l’île reçoit peu de pluie.', 'Le plateau central en reçoit beaucoup.',
    'Le nord de l’île reçoit peu de pluie, alors que le plateau central en reçoit beaucoup.',
    ['Alors que le nord de l’île reçoit peu de pluie alors que le plateau central en reçoit beaucoup.',
     'Le nord de l’île alors que reçoit peu de pluie, le plateau central en reçoit beaucoup.',
     'Le nord de l’île reçoit peu de pluie, le plateau central alors que en reçoit beaucoup.'],
    'On compare deux régions.',
    '<b>alors que</b> introduit la seconde situation, opposée à la première.');

  J('opposition', 4, 'bien que', 'Il connaît la réponse.', 'Il préfère se taire.',
    'Bien qu’il connaisse la réponse, il préfère se taire.',
    ['Bien qu’il connaît la réponse, il préfère se taire.',
     'Bien que il connaisse la réponse, il préfère se taire.',
     'Il préfère se taire bien que, il connaît la réponse.'],
    'Subjonctif ET élision.',
    'Deux changements à la fois : élision (<b>bien qu’</b>) et subjonctif (<b>connaisse</b>).');

  J('opposition', 3, 'malgré', 'Il a réussi son examen.', 'Il était très fatigué.',
    'Il a réussi son examen malgré sa grande fatigue.',
    ['Il a réussi son examen malgré il était très fatigué.',
     'Il a réussi son examen malgré que il était très fatigué.',
     'Malgré il a réussi son examen, il était très fatigué.'],
    '« malgré » est suivi d’un NOM.',
    '⚠ <b>malgré</b> + nom (« malgré sa fatigue »). « Malgré que » est une faute : devant une proposition, on emploie « bien que ».');

  J('opposition', 3, 'tandis que', 'Les uns préfèrent la mer.', 'Les autres préfèrent la montagne.',
    'Les uns préfèrent la mer, tandis que les autres préfèrent la montagne.',
    ['Tandis que les uns préfèrent la mer tandis que les autres préfèrent la montagne.',
     'Les uns tandis que préfèrent la mer, les autres préfèrent la montagne.',
     'Les uns préfèrent la mer, les autres tandis que préfèrent la montagne.'],
    'Deux goûts opposés.',
    '<b>tandis que</b> relie deux propositions qui s’opposent terme à terme.');

  J('opposition', 4, 'bien que', 'Nous sommes partis tôt.', 'Nous sommes arrivés en retard.',
    'Bien que nous soyons partis tôt, nous sommes arrivés en retard.',
    ['Bien que nous sommes partis tôt, nous sommes arrivés en retard.',
     'Nous sommes arrivés en retard bien que, nous sommes partis tôt.',
     'Bien que nous sommes arrivés en retard, nous soyons partis tôt.'],
    'Subjonctif de « être » à la 1re personne du pluriel.',
    '« bien que nous <b>soyons</b> partis » : le subjonctif est obligatoire après « bien que ».');

  // ── 4 · SITUER DANS LE TEMPS ────────────────────────────────────────────
  J('temps', 4, 'avant que', 'Range tes affaires.', 'Le maître arrive.',
    'Range tes affaires avant que le maître arrive.',
    ['Range tes affaires avant que le maître arrivera.',
     'Avant que range tes affaires, le maître arrive.',
     'Range tes affaires avant que le maître est arrivé.'],
    '« avant que » demande le subjonctif.',
    '⚠ <b>avant que</b> est suivi du <b>subjonctif</b> : « avant que le maître <b>arrive</b> » - jamais du futur.');

  J('temps', 3, 'après que', 'Nous sommes rentrés.', 'Le film s’est terminé.',
    'Nous sommes rentrés après que le film s’est terminé.',
    ['Nous sommes rentrés après que le film se soit terminé.',
     'Après que nous sommes rentrés, le film s’est terminé.',
     'Nous sommes rentrés après que, le film s’est terminé.'],
    'Attention : « après que » n’est PAS comme « avant que ».',
    '⚠ <b>après que</b> se construit avec l’<b>indicatif</b> (le fait a eu lieu), alors que « avant que » demande le subjonctif. C’est le piège classique.');

  J('temps', 3, 'dès que', 'Le train entrera en gare.', 'Les voyageurs monteront.',
    'Dès que le train entrera en gare, les voyageurs monteront.',
    ['Dès que le train entre en gare, les voyageurs monteront.',
     'Les voyageurs monteront dès que, le train entrera en gare.',
     'Dès que les voyageurs monteront, le train entrera en gare.'],
    'Les deux actions sont futures.',
    'Après <b>dès que</b>, le français emploie le <b>futur</b> si l’action est à venir : « dès que le train <b>entrera</b> ».');

  J('temps', 3, 'pendant que', 'Les uns préparaient le décor.', 'Les autres répétaient leur texte.',
    'Pendant que les uns préparaient le décor, les autres répétaient leur texte.',
    ['Les uns préparaient le décor pendant que, les autres répétaient leur texte.',
     'Pendant que les autres répétaient leur texte pendant que les uns préparaient le décor.',
     'Les uns pendant que préparaient le décor, les autres répétaient leur texte.'],
    'Deux actions qui durent en même temps.',
    'L’imparfait dans les deux propositions marque la simultanéité, soulignée par <b>pendant que</b>.');

  J('temps', 4, 'lorsque', 'Tu auras terminé ce chapitre.', 'Tu pourras passer au suivant.',
    'Lorsque tu auras terminé ce chapitre, tu pourras passer au suivant.',
    ['Lorsque tu as terminé ce chapitre, tu pourras passer au suivant.',
     'Lorsque tu auras terminé ce chapitre, tu peux passer au suivant.',
     'Tu pourras passer au suivant lorsque, tu auras terminé ce chapitre.'],
    'Une action future ACHEVÉE avant une autre.',
    'Le <b>futur antérieur</b> (« tu <b>auras terminé</b> ») marque l’action finie d’abord, suivie du futur simple.');

  J('temps', 2, 'depuis que', 'Il habite à Rodrigues.', 'Il ne prend plus l’avion.',
    'Depuis qu’il habite à Rodrigues, il ne prend plus l’avion.',
    ['Depuis que il habite à Rodrigues, il ne prend plus l’avion.',
     'Il ne prend plus l’avion depuis que, il habite à Rodrigues.',
     'Depuis qu’il ne prend plus l’avion, il habite à Rodrigues.'],
    'Élision, et le point de départ en tête.',
    '<b>Depuis qu’</b> (élision) marque le point de départ d’une situation qui dure.');

  J('temps', 3, 'jusqu’à ce que', 'Attends ici.', 'Je reviens.',
    'Attends ici jusqu’à ce que je revienne.',
    ['Attends ici jusqu’à ce que je reviens.',
     'Jusqu’à ce que attends ici, je revienne.',
     'Attends ici jusqu’à ce que je reviendrai.'],
    'Quel mode après « jusqu’à ce que » ?',
    '⚠ <b>jusqu’à ce que</b> demande le <b>subjonctif</b> : « jusqu’à ce que je <b>revienne</b> ».');

  J('temps', 3, 'dès que', 'La cloche sonnera.', 'Vous rangerez vos cahiers.',
    'Dès que la cloche sonnera, vous rangerez vos cahiers.',
    ['Dès que la cloche sonne, vous rangerez vos cahiers.',
     'Vous rangerez vos cahiers dès que, la cloche sonnera.',
     'Dès que vous rangerez vos cahiers, la cloche sonnera.'],
    'Deux actions à venir.',
    'Le futur s’emploie des deux côtés : « <b>dès que</b> la cloche <b>sonnera</b>, vous <b>rangerez</b> ».');

  J('temps', 4, 'avant que', 'Ferme bien les volets.', 'La tempête arrive.',
    'Ferme bien les volets avant que la tempête arrive.',
    ['Ferme bien les volets avant que la tempête arrivera.',
     'Ferme bien les volets avant que la tempête est arrivée.',
     'Avant que ferme bien les volets, la tempête arrive.'],
    'Subjonctif après « avant que ».',
    'L’action n’a pas encore eu lieu : <b>avant que</b> + <b>subjonctif</b> (« arrive »).');

  J('temps', 2, 'depuis que', 'Elle fait du sport.', 'Elle se sent en pleine forme.',
    'Depuis qu’elle fait du sport, elle se sent en pleine forme.',
    ['Depuis que elle fait du sport, elle se sent en pleine forme.',
     'Elle se sent en pleine forme depuis que, elle fait du sport.',
     'Depuis qu’elle se sent en pleine forme, elle fait du sport.'],
    'Le point de départ vient en premier.',
    '<b>Depuis qu’</b>elle fait du sport : le début de la situation ouvre la phrase.');

  // ── 5 · LE BUT & LA CONSÉQUENCE ─────────────────────────────────────────
  J('but_consequence', 4, 'afin que', 'Le guide répète la consigne.', 'Personne ne se perd.',
    'Le guide répète la consigne afin que personne ne se perde.',
    ['Le guide répète la consigne afin que personne ne se perd.',
     'Afin que le guide répète la consigne, personne ne se perde.',
     'Le guide répète afin que la consigne personne ne se perde.'],
    'Quel mode après « afin que » ?',
    '⚠ <b>afin que</b> demande le <b>subjonctif</b> : « afin que personne ne se <b>perde</b> ».');

  J('but_consequence', 4, 'afin de', 'Nous partons à l’aube.', 'Nous voulons éviter les embouteillages.',
    'Nous partons à l’aube afin d’éviter les embouteillages.',
    ['Nous partons à l’aube afin que nous évitions les embouteillages.',
     'Nous partons à l’aube afin de nous voulons éviter les embouteillages.',
     'Afin d’éviter les embouteillages nous partons afin à l’aube.'],
    'Un seul sujet dans les deux phrases.',
    '⚠ Même sujet → <b>afin de + infinitif</b>. On réserve « afin que » + subjonctif aux <b>deux sujets différents</b>.');

  J('but_consequence', 3, 'de sorte que', 'La pluie est tombée sans arrêt.', 'Les champs ont été inondés.',
    'La pluie est tombée sans arrêt, de sorte que les champs ont été inondés.',
    ['De sorte que la pluie est tombée sans arrêt, les champs ont été inondés.',
     'La pluie est de sorte que tombée sans arrêt les champs ont été inondés.',
     'Les champs ont été inondés, de sorte que la pluie est tombée sans arrêt.'],
    '« de sorte que » annonce le résultat.',
    'Avec l’indicatif, <b>de sorte que</b> exprime la <b>conséquence</b> réelle : l’inondation a bien eu lieu.');

  J('but_consequence', 3, 'si bien que', 'Le vent a soufflé toute la nuit.', 'Plusieurs arbres sont tombés.',
    'Le vent a soufflé toute la nuit, si bien que plusieurs arbres sont tombés.',
    ['Si bien que le vent a soufflé toute la nuit, plusieurs arbres sont tombés.',
     'Le vent a si bien que soufflé toute la nuit plusieurs arbres sont tombés.',
     'Plusieurs arbres sont tombés, si bien que le vent a soufflé toute la nuit.'],
    'Quelle phrase découle de l’autre ?',
    'La chute des arbres est la <b>conséquence</b> du vent : elle suit « si bien que ».');

  J('but_consequence', 4, 'pour que', 'Le maître écrit très gros.', 'Les élèves du fond voient le tableau.',
    'Le maître écrit très gros pour que les élèves du fond voient le tableau.',
    ['Le maître écrit très gros pour que les élèves du fond voyaient le tableau.',
     'Le maître écrit très gros pour les élèves du fond voient le tableau.',
     'Pour que le maître écrive très gros, les élèves du fond voient le tableau.'],
    'Deux sujets différents → « pour que » + subjonctif.',
    'Le maître et les élèves sont deux sujets : <b>pour que</b> + subjonctif (« voient »).');

  J('but_consequence', 4, 'tellement... que', 'Le sac était lourd.', 'Je n’ai pas pu le soulever.',
    'Le sac était tellement lourd que je n’ai pas pu le soulever.',
    ['Le sac était lourd tellement que je n’ai pas pu le soulever.',
     'Tellement que le sac était lourd, je n’ai pas pu le soulever.',
     'Le sac était tellement que lourd je n’ai pas pu le soulever.'],
    '« tellement » se glisse devant l’adjectif, « que » ouvre la conséquence.',
    'La structure est <b>tellement + adjectif + que</b> : « tellement <b>lourd que</b> je n’ai pas pu le soulever ».');

  J('but_consequence', 3, 'par conséquent', 'Les routes étaient inondées.', 'L’école est restée fermée.',
    'Les routes étaient inondées ; par conséquent, l’école est restée fermée.',
    ['Par conséquent les routes étaient inondées l’école est restée fermée.',
     'Les routes étaient par conséquent inondées, l’école est restée par conséquent fermée.',
     'L’école est restée fermée ; par conséquent, les routes étaient inondées.'],
    'Registre soutenu pour introduire la conséquence.',
    '<b>par conséquent</b> s’emploie après un point-virgule et se détache par une virgule.');

  J('but_consequence', 4, 'afin de', 'Elle relit sa rédaction.', 'Elle veut corriger ses fautes.',
    'Elle relit sa rédaction afin de corriger ses fautes.',
    ['Elle relit sa rédaction afin qu’elle corrige ses fautes.',
     'Elle relit sa rédaction afin de elle veut corriger ses fautes.',
     'Afin de corriger ses fautes elle relit afin sa rédaction.'],
    'Même sujet des deux côtés.',
    'Sujet identique (elle / elle) → <b>afin de + infinitif</b>, plus naturel que « afin que ».');

  J('but_consequence', 3, 'si bien que', 'Il a beaucoup neigé sur la montagne.', 'La route a été coupée.',
    'Il a beaucoup neigé sur la montagne, si bien que la route a été coupée.',
    ['Si bien qu’il a beaucoup neigé sur la montagne, la route a été coupée.',
     'Il a si bien que beaucoup neigé sur la montagne la route a été coupée.',
     'La route a été coupée, si bien qu’il a beaucoup neigé sur la montagne.'],
    'Cause d’abord, conséquence après.',
    'La route coupée résulte de la neige : <b>si bien que</b> introduit ce résultat.');

  J('but_consequence', 4, 'pour que', 'Papa a réservé les billets à l’avance.', 'Toute la famille voyage ensemble.',
    'Papa a réservé les billets à l’avance pour que toute la famille voyage ensemble.',
    ['Papa a réservé les billets à l’avance pour que toute la famille voyagera ensemble.',
     'Papa a réservé les billets à l’avance pour toute la famille voyage ensemble.',
     'Pour que papa ait réservé les billets à l’avance, toute la famille voyage ensemble.'],
    'Deux sujets → « pour que » + subjonctif, jamais le futur.',
    '<b>pour que</b> exige le subjonctif : « pour que toute la famille <b>voyage</b> ensemble », et non « voyagera ».');
})();
