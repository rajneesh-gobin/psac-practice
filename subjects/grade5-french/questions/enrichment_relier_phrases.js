'use strict';
// @enrichment - Bonus chapter "Relier les Phrases". DERIVED from the syllabus
// (pronoms relatifs, conjonctions, propositions subordonnées), NOT a direct MIE
// chapter. DO NOT remove during syllabus alignment audits.
//
// The task is the PSAC exercise "Relie chaque paire de phrases en te servant du
// mot donné entre parenthèses" - the child PRODUCES a joined sentence. The
// renderer has no free-text type, so it is asked as MCQ: pick the correctly
// joined sentence. The three distractors carry the teaching, and each one is a
// mistake a child actually makes - the wrong relative pronoun, the connector in
// a position it cannot occupy, the repeated noun left in the second clause, a
// missing elision, or a missing agreement.
//
// ⚠ Apostrophes are the typographic ’ (U+2019) throughout, so nothing needs
//   escaping inside single-quoted JS strings. Do not "normalise" them to '.
(function () {
  const CH = 'fr-enr-relier';
  let n = 0;
  const J = (sub, diff, given, a, b, right, wrong, hint, why) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g5fr-rel-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: sub, difficulty: diff,
      question: `Relie les deux phrases en te servant de « <b>${given}</b> ». `
        + `Fais les changements nécessaires s’il y a lieu.<br>`
        + `<i>${a}</i> &nbsp; <i>${b}</i>`,
      options: [right, ...wrong], answer: right, hint, explanation: why,
    }));
  };

  // ── 1 · PRONOMS RELATIFS ────────────────────────────────────────────────
  J('relatifs', 2, 'que', 'La fleur est belle.', 'Tu achètes la fleur.',
    'La fleur que tu achètes est belle.',
    ['La fleur qui tu achètes est belle.',
     'La fleur que tu achètes la fleur est belle.',
     'La fleur où tu achètes est belle.'],
    '« que » remplace le COD. Le nom répété disparaît.',
    '« La fleur » est le COD de « tu achètes », donc on emploie <b>que</b> : « La fleur <b>que</b> tu achètes est belle. » Le mot répété ne se dit qu’une fois.');

  J('relatifs', 2, 'où', 'Voici l’endroit.', 'L’accident a eu lieu à cet endroit.',
    'Voici l’endroit où l’accident a eu lieu.',
    ['Voici l’endroit que l’accident a eu lieu.',
     'Voici l’endroit qui l’accident a eu lieu.',
     'Voici l’endroit dont l’accident a eu lieu.'],
    'Un lieu → « où ».',
    '« à cet endroit » est un complément de lieu, donc <b>où</b> : « Voici l’endroit <b>où</b> l’accident a eu lieu. »');

  J('relatifs', 1, 'qui', 'Je connais l’élève.', 'L’élève a gagné le prix.',
    'Je connais l’élève qui a gagné le prix.',
    ['Je connais l’élève que a gagné le prix.',
     'Je connais l’élève qui l’élève a gagné le prix.',
     'Je connais l’élève dont a gagné le prix.'],
    '« qui » remplace le SUJET du verbe qui suit.',
    '« L’élève » fait l’action de gagner : c’est le sujet, donc <b>qui</b>. Après « qui », le verbe suit directement.');

  J('relatifs', 3, 'dont', 'Voici le livre.', 'J’ai besoin de ce livre.',
    'Voici le livre dont j’ai besoin.',
    ['Voici le livre que j’ai besoin.',
     'Voici le livre qui j’ai besoin.',
     'Voici le livre dont j’ai besoin de ce livre.'],
    'On dit « avoir besoin <b>de</b> » → « dont ».',
    'Le verbe se construit avec <b>de</b> (avoir besoin <i>de</i>), et c’est <b>dont</b> qui remplace un complément introduit par « de ».');

  J('relatifs', 2, 'qui', 'Le chien aboie.', 'Le chien est dans le jardin.',
    'Le chien qui est dans le jardin aboie.',
    ['Le chien que est dans le jardin aboie.',
     'Le chien où est dans le jardin aboie.',
     'Le chien qui le chien est dans le jardin aboie.'],
    'La proposition relative se place juste après le nom qu’elle décrit.',
    '<b>qui</b> reprend le sujet « le chien ». La relative se glisse entre le nom et son verbe : « Le chien <b>qui est dans le jardin</b> aboie. »');

  J('relatifs', 3, 'que', 'J’ai perdu le stylo.', 'Maman m’a offert ce stylo.',
    'J’ai perdu le stylo que maman m’a offert.',
    ['J’ai perdu le stylo qui maman m’a offert.',
     'J’ai perdu le stylo dont maman m’a offert.',
     'J’ai perdu le stylo que maman m’a offert ce stylo.'],
    '« ce stylo » est le COD de « a offert ».',
    'Le COD devient <b>que</b> : « le stylo <b>que</b> maman m’a offert ». Le participe « offert » s’accorde avec le COD masculin singulier placé avant - il ne change pas.');

  J('relatifs', 2, 'où', 'Nous visitons le village.', 'Mon père est né dans ce village.',
    'Nous visitons le village où mon père est né.',
    ['Nous visitons le village que mon père est né.',
     'Nous visitons le village qui mon père est né.',
     'Nous visitons le village dont mon père est né.'],
    '« dans ce village » indique le lieu.',
    'Pour un lieu on emploie <b>où</b>, jamais « que » : « le village <b>où</b> mon père est né ».');

  J('relatifs', 1, 'qui', 'Regarde la fille.', 'La fille porte une robe rouge.',
    'Regarde la fille qui porte une robe rouge.',
    ['Regarde la fille que porte une robe rouge.',
     'Regarde la fille où porte une robe rouge.',
     'Regarde la fille qui elle porte une robe rouge.'],
    'Qui fait l’action de porter ?',
    'C’est « la fille » qui porte la robe : elle est sujet, donc <b>qui</b>. On n’ajoute pas « elle » après « qui ».');

  J('relatifs', 3, 'dont', 'Voici l’histoire.', 'Tout le monde parle de cette histoire.',
    'Voici l’histoire dont tout le monde parle.',
    ['Voici l’histoire que tout le monde parle.',
     'Voici l’histoire où tout le monde parle.',
     'Voici l’histoire dont tout le monde parle de cette histoire.'],
    'On dit « parler <b>de</b> quelque chose ».',
    'Le complément « de cette histoire » se remplace par <b>dont</b> : « l’histoire <b>dont</b> tout le monde parle ». On ne garde pas « de » une deuxième fois.');

  J('relatifs', 4, 'que', 'J’ai relu les lettres.', 'Ma grand-mère a écrit ces lettres.',
    'J’ai relu les lettres que ma grand-mère a écrites.',
    ['J’ai relu les lettres que ma grand-mère a écrit.',
     'J’ai relu les lettres qui ma grand-mère a écrites.',
     'J’ai relu les lettres dont ma grand-mère a écrites.'],
    'Le COD est placé AVANT le verbe : pense à l’accord du participe.',
    'Avec <i>avoir</i>, le participe s’accorde avec le COD s’il est placé avant. Ici le COD « les lettres » (féminin pluriel) précède, donc <b>écrites</b>.');

  // ── 2 · EXPRIMER LA CAUSE ───────────────────────────────────────────────
  J('cause', 1, 'parce que', 'Maman est triste.', 'Sa fille est malade.',
    'Maman est triste parce que sa fille est malade.',
    ['Parce que maman est triste, sa fille est malade.',
     'Maman parce que est triste sa fille est malade.',
     'Maman est triste, sa fille parce que est malade.'],
    '« parce que » introduit la CAUSE, jamais la conséquence.',
    'La cause, c’est que la fille est malade. « parce que » se place devant la cause : « Maman est triste <b>parce que</b> sa fille est malade. »');

  J('cause', 3, 'comme', 'C’est un dimanche.', 'Papa emmène sa famille à un concert.',
    'Comme c’est un dimanche, papa emmène sa famille à un concert.',
    ['Papa emmène sa famille à un concert comme c’est un dimanche.',
     'Comme papa emmène sa famille à un concert, c’est un dimanche.',
     'C’est un dimanche comme papa emmène sa famille à un concert.'],
    '« comme » causal commence toujours la phrase.',
    'Quand <b>comme</b> exprime la cause, il se met <b>en tête de phrase</b> et la virgule sépare les deux parties : « <b>Comme</b> c’est un dimanche, papa emmène… »');

  J('cause', 3, 'parce que', 'Je reste à la maison.', 'Il pleut très fort.',
    'Je reste à la maison parce qu’il pleut très fort.',
    ['Je reste à la maison parce que il pleut très fort.',
     'Parce que je reste à la maison, il pleut très fort.',
     'Je reste à la maison, parce qu’il pleut très fort il.'],
    'Attention à ce qui se passe devant « il ».',
    '« que » s’élide devant une voyelle : on écrit <b>parce qu’il</b>, jamais « parce que il ».');

  J('cause', 2, 'car', 'Les élèves révisent.', 'Les examens approchent.',
    'Les élèves révisent, car les examens approchent.',
    ['Car les élèves révisent, les examens approchent.',
     'Car les examens approchent, les élèves révisent.',
     'Les élèves car révisent les examens approchent.'],
    '« car » ne commence jamais une phrase.',
    '<b>car</b> relie deux propositions et se place au milieu, précédé d’une virgule. Il ne peut pas ouvrir la phrase - c’est la différence avec « comme ».');

  J('cause', 2, 'puisque', 'Tu connais le chemin.', 'Passe devant.',
    'Puisque tu connais le chemin, passe devant.',
    ['Passe devant puisque, tu connais le chemin.',
     'Puisque passe devant, tu connais le chemin.',
     'Tu connais puisque le chemin, passe devant.'],
    '« puisque » présente une cause que tout le monde connaît déjà.',
    '<b>Puisque</b> ouvre la phrase avec la raison déjà connue, puis vient la conséquence : « <b>Puisque</b> tu connais le chemin, passe devant. »');

  J('cause', 2, 'parce que', 'Le match a été annulé.', 'Le terrain était mouillé.',
    'Le match a été annulé parce que le terrain était mouillé.',
    ['Parce que le match a été annulé, le terrain était mouillé.',
     'Le match parce que a été annulé le terrain était mouillé.',
     'Le terrain était mouillé parce que le match a été annulé.'],
    'Quelle phrase explique l’autre ?',
    'Le terrain mouillé est la <b>cause</b> de l’annulation. « parce que » se place devant elle.');

  J('cause', 3, 'comme', 'Il fait très chaud.', 'Nous ouvrons les fenêtres.',
    'Comme il fait très chaud, nous ouvrons les fenêtres.',
    ['Nous ouvrons les fenêtres comme il fait très chaud.',
     'Comme nous ouvrons les fenêtres, il fait très chaud.',
     'Il fait très chaud comme nous ouvrons les fenêtres.'],
    'Cause en tête, virgule, puis le résultat.',
    '<b>Comme</b> causal se place en début de phrase. Placé au milieu, « comme » serait compris comme une comparaison, ce qui change le sens.');

  J('cause', 1, 'parce que', 'Sara est contente.', 'Son équipe a gagné.',
    'Sara est contente parce que son équipe a gagné.',
    ['Parce que Sara est contente, son équipe a gagné.',
     'Sara parce que est contente son équipe a gagné.',
     'Sara est contente, son équipe parce que a gagné.'],
    'La cause vient après « parce que ».',
    'La victoire de l’équipe explique la joie de Sara : « Sara est contente <b>parce que</b> son équipe a gagné. »');

  J('cause', 2, 'car', 'Nous partons tôt.', 'La route est longue.',
    'Nous partons tôt, car la route est longue.',
    ['Car nous partons tôt, la route est longue.',
     'Nous car partons tôt la route est longue.',
     'Car la route est longue, nous partons tôt.'],
    'Virgule + « car » + explication.',
    '<b>car</b> apporte l’explication et reste toujours à l’intérieur de la phrase, après une virgule.');

  J('cause', 2, 'puisque', 'Tu as fini tes devoirs.', 'Tu peux aller jouer.',
    'Puisque tu as fini tes devoirs, tu peux aller jouer.',
    ['Tu peux aller jouer puisque, tu as fini tes devoirs.',
     'Puisque tu peux aller jouer, tu as fini tes devoirs.',
     'Tu as puisque fini tes devoirs, tu peux aller jouer.'],
    'La raison est déjà connue des deux personnes.',
    '<b>Puisque</b> rappelle un fait admis, puis on en tire la conséquence : « <b>Puisque</b> tu as fini tes devoirs, tu peux aller jouer. »');

  // ── 3 · EXPRIMER L’OPPOSITION ───────────────────────────────────────────
  J('opposition', 1, 'mais', 'Le jardinier est fatigué.', 'Il veut terminer son travail.',
    'Le jardinier est fatigué, mais il veut terminer son travail.',
    ['Mais le jardinier est fatigué, il veut terminer son travail.',
     'Le jardinier mais est fatigué il veut terminer son travail.',
     'Le jardinier est fatigué il veut mais terminer son travail.'],
    '« mais » se place entre les deux idées, après une virgule.',
    '<b>mais</b> oppose deux idées et ne commence pas la phrase : « Le jardinier est fatigué<b>, mais</b> il veut terminer son travail. »');

  J('opposition', 2, 'mais', 'Il pleuvait.', 'Les enfants ont joué dehors.',
    'Il pleuvait, mais les enfants ont joué dehors.',
    ['Mais il pleuvait, les enfants ont joué dehors.',
     'Il pleuvait les enfants mais ont joué dehors.',
     'Il pleuvait, les enfants ont joué mais dehors.'],
    'Deux faits contraires : la pluie et le jeu dehors.',
    'On attend que la pluie empêche de jouer ; « <b>mais</b> » signale que le contraire s’est produit.');

  J('opposition', 2, 'mais', 'Ce livre est court.', 'Il est très intéressant.',
    'Ce livre est court, mais il est très intéressant.',
    ['Mais ce livre est court, il est très intéressant.',
     'Ce livre mais est court il est très intéressant.',
     'Ce livre est court, il mais est très intéressant.'],
    'Virgule, puis « mais », puis la seconde idée.',
    'La seconde idée corrige l’impression donnée par la première : « court<b>, mais</b> très intéressant ».');

  J('opposition', 3, 'pourtant', 'Elle a beaucoup révisé.', 'Elle a raté l’examen.',
    'Elle a beaucoup révisé ; pourtant, elle a raté l’examen.',
    ['Pourtant elle a beaucoup révisé elle a raté l’examen.',
     'Elle a beaucoup pourtant révisé, elle a raté l’examen.',
     'Elle a beaucoup révisé, elle a raté pourtant l’examen elle.'],
    '« pourtant » introduit un résultat surprenant.',
    '<b>pourtant</b> annonce un fait inattendu et s’emploie après un point-virgule ou un point, suivi d’une virgule.');

  J('opposition', 3, 'alors que', 'Mon frère aime le foot.', 'Moi, je préfère la natation.',
    'Mon frère aime le foot, alors que moi, je préfère la natation.',
    ['Alors que mon frère aime le foot moi je préfère la natation alors.',
     'Mon frère alors que aime le foot, moi je préfère la natation.',
     'Mon frère aime le foot, moi je préfère alors que la natation.'],
    '« alors que » marque un contraste entre deux personnes.',
    '<b>alors que</b> oppose deux situations parallèles : l’un aime le foot, l’autre la natation.');

  J('opposition', 2, 'mais', 'La mer est agitée.', 'Les pêcheurs sortent du port.',
    'La mer est agitée, mais les pêcheurs sortent du port.',
    ['Mais la mer est agitée, les pêcheurs sortent du port.',
     'La mer mais est agitée les pêcheurs sortent du port.',
     'La mer est agitée les pêcheurs mais sortent du port.'],
    'Le second fait est contraire à ce qu’on attendait.',
    'Une mer agitée devrait retenir les pêcheurs ; « <b>mais</b> » signale qu’ils sortent quand même.');

  J('opposition', 2, 'mais', 'Le devoir est difficile.', 'Mia ne se décourage pas.',
    'Le devoir est difficile, mais Mia ne se décourage pas.',
    ['Mais le devoir est difficile, Mia ne se décourage pas.',
     'Le devoir est mais difficile Mia ne se décourage pas.',
     'Le devoir est difficile, Mia ne mais se décourage pas.'],
    'Place « mais » après la virgule.',
    'La difficulté et le courage s’opposent : « difficile<b>, mais</b> Mia ne se décourage pas ».');

  J('opposition', 3, 'pourtant', 'Il est très riche.', 'Il n’est pas heureux.',
    'Il est très riche ; pourtant, il n’est pas heureux.',
    ['Pourtant il est très riche il n’est pas heureux.',
     'Il est très pourtant riche, il n’est pas heureux.',
     'Il est très riche, il n’est pourtant pas heureux pourtant.'],
    'Un résultat que l’on n’attendait pas.',
    'On s’attendrait à ce que la richesse rende heureux : <b>pourtant</b> marque cette surprise.');

  J('opposition', 2, 'mais', 'J’ai sommeil.', 'Je dois finir ce chapitre.',
    'J’ai sommeil, mais je dois finir ce chapitre.',
    ['Mais j’ai sommeil, je dois finir ce chapitre.',
     'J’ai mais sommeil je dois finir ce chapitre.',
     'J’ai sommeil, je dois mais finir ce chapitre.'],
    'Virgule + « mais ».',
    'Les deux idées s’opposent : le sommeil et l’obligation de travailler.');

  J('opposition', 3, 'alors que', 'Paul est très grand.', 'Son frère est petit.',
    'Paul est très grand, alors que son frère est petit.',
    ['Alors que Paul est très grand son frère est petit alors.',
     'Paul est alors que très grand, son frère est petit.',
     'Paul est très grand, son frère alors que est petit.'],
    'On compare deux personnes.',
    '<b>alors que</b> met les deux tailles en contraste dans une seule phrase.');

  // ── 4 · SITUER DANS LE TEMPS ────────────────────────────────────────────
  J('temps', 1, 'quand', 'La cloche sonne.', 'Les élèves rentrent en classe.',
    'Quand la cloche sonne, les élèves rentrent en classe.',
    ['La cloche sonne quand, les élèves rentrent en classe.',
     'Quand les élèves rentrent en classe, la cloche sonne quand.',
     'La cloche quand sonne les élèves rentrent en classe.'],
    'Le moment vient d’abord, puis ce qui se passe.',
    '<b>Quand</b> ouvre la phrase, une virgule sépare les deux parties : « <b>Quand</b> la cloche sonne, les élèves rentrent. »');

  J('temps', 2, 'lorsque', 'La nuit tombe.', 'Les rues s’allument.',
    'Lorsque la nuit tombe, les rues s’allument.',
    ['Les rues s’allument lorsque, la nuit tombe.',
     'Lorsque les rues s’allument, la nuit tombe.',
     'La nuit lorsque tombe les rues s’allument.'],
    '« lorsque » est le synonyme soutenu de « quand ».',
    '<b>Lorsque</b> s’emploie exactement comme « quand » : il introduit le moment.');

  J('temps', 2, 'pendant que', 'Maman cuisine.', 'Papa met la table.',
    'Pendant que maman cuisine, papa met la table.',
    ['Maman cuisine pendant que, papa met la table.',
     'Pendant que papa met la table pendant que maman cuisine.',
     'Maman pendant que cuisine papa met la table.'],
    'Les deux actions se déroulent en même temps.',
    '<b>Pendant que</b> montre deux actions simultanées : pendant la cuisine, la table se met.');

  J('temps', 2, 'dès que', 'Le bus arrive.', 'Tout le monde monte.',
    'Dès que le bus arrive, tout le monde monte.',
    ['Tout le monde monte dès que, le bus arrive.',
     'Dès que tout le monde monte, le bus arrive.',
     'Le bus dès que arrive tout le monde monte.'],
    '« dès que » = immédiatement après.',
    '<b>Dès que</b> marque qu’il n’y a aucun délai entre les deux actions.');

  J('temps', 1, 'quand', 'Les vacances commencent.', 'La famille part à Rodrigues.',
    'Quand les vacances commencent, la famille part à Rodrigues.',
    ['La famille part à Rodrigues quand, les vacances commencent.',
     'Quand la famille part à Rodrigues, les vacances commencent.',
     'Les vacances quand commencent la famille part à Rodrigues.'],
    'Quel événement donne le moment ?',
    'Le début des vacances est le moment : il se place après <b>quand</b>.');

  J('temps', 3, 'quand', 'J’ai fini mes devoirs.', 'Je regarde la télévision.',
    'Quand j’ai fini mes devoirs, je regarde la télévision.',
    ['Quand je regarde la télévision, j’ai fini mes devoirs.',
     'J’ai fini mes devoirs quand, je regarde la télévision.',
     'J’ai quand fini mes devoirs je regarde la télévision.'],
    'Ce qui se passe EN PREMIER va après « quand ».',
    'Les devoirs viennent avant la télévision : c’est donc cette action qui suit <b>quand</b>.');

  J('temps', 2, 'lorsque', 'Le soleil se couche.', 'Les oiseaux rentrent au nid.',
    'Lorsque le soleil se couche, les oiseaux rentrent au nid.',
    ['Les oiseaux rentrent au nid lorsque, le soleil se couche.',
     'Lorsque les oiseaux rentrent au nid, le soleil se couche.',
     'Le soleil lorsque se couche les oiseaux rentrent au nid.'],
    'Le coucher du soleil donne le moment.',
    '<b>Lorsque</b> introduit le moment, suivi d’une virgule puis de l’action principale.');

  J('temps', 4, 'quand', 'Tu liras ce livre.', 'Tu comprendras mieux l’histoire.',
    'Quand tu liras ce livre, tu comprendras mieux l’histoire.',
    ['Quand tu lis ce livre, tu comprendras mieux l’histoire.',
     'Quand tu liras ce livre, tu comprends mieux l’histoire.',
     'Quand tu as lu ce livre, tu comprendras mieux l’histoire.'],
    'Les deux actions sont dans le futur : quel temps après « quand » ?',
    '⚠ En français, après <b>quand</b>, on met le <b>futur</b> quand l’action est future : « Quand tu <b>liras</b>… tu <b>comprendras</b>… » (l’anglais, lui, emploie le présent).');

  J('temps', 3, 'pendant que', 'Nous attendions le bus.', 'La pluie a commencé à tomber.',
    'Pendant que nous attendions le bus, la pluie a commencé à tomber.',
    ['La pluie a commencé à tomber pendant que, nous attendions le bus.',
     'Pendant que la pluie a commencé à tomber, nous attendions le bus.',
     'Nous pendant que attendions le bus la pluie a commencé à tomber.'],
    'L’attente dure ; la pluie arrive au milieu.',
    'L’imparfait « attendions » décrit ce qui durait ; <b>pendant que</b> place l’averse à l’intérieur de cette durée.');

  J('temps', 2, 'dès que', 'Le film se termine.', 'Nous rentrons à la maison.',
    'Dès que le film se termine, nous rentrons à la maison.',
    ['Nous rentrons à la maison dès que, le film se termine.',
     'Dès que nous rentrons à la maison, le film se termine.',
     'Le film dès que se termine nous rentrons à la maison.'],
    'Aucun délai entre la fin du film et le départ.',
    '<b>Dès que</b> insiste sur l’immédiateté : à peine le film fini, on rentre.');

  // ── 5 · LE BUT & LA CONSÉQUENCE ─────────────────────────────────────────
  J('but_consequence', 4, 'pour que', 'Papa se lève tôt.', 'La famille part à l’heure.',
    'Papa se lève tôt pour que la famille parte à l’heure.',
    ['Papa se lève tôt pour que la famille part à l’heure.',
     'Pour que papa se lève tôt, la famille part à l’heure.',
     'Papa se lève tôt pour la famille part à l’heure.'],
    'Après « pour que », le verbe change de mode.',
    '⚠ <b>pour que</b> est toujours suivi du <b>subjonctif</b> : « … pour que la famille <b>parte</b> » (et non « part »).');

  J('but_consequence', 3, 'si bien que', 'Il pleuvait beaucoup.', 'La rivière a débordé.',
    'Il pleuvait beaucoup, si bien que la rivière a débordé.',
    ['Si bien qu’il pleuvait beaucoup, la rivière a débordé.',
     'Il pleuvait si bien que beaucoup la rivière a débordé.',
     'La rivière a débordé, si bien qu’il pleuvait beaucoup.'],
    '« si bien que » annonce le RÉSULTAT.',
    'La pluie est la cause, le débordement la conséquence. <b>si bien que</b> se place devant la conséquence.');

  J('but_consequence', 2, 'donc', 'Le magasin était fermé.', 'Nous sommes rentrés.',
    'Le magasin était fermé, donc nous sommes rentrés.',
    ['Donc le magasin était fermé, nous sommes rentrés.',
     'Le magasin donc était fermé nous sommes rentrés.',
     'Nous sommes rentrés, donc le magasin était fermé.'],
    '« donc » introduit la conséquence.',
    'Le magasin fermé explique le retour : la conséquence suit <b>donc</b>.');

  J('but_consequence', 4, 'pour', 'J’économise mon argent.', 'Je veux acheter un vélo.',
    'J’économise mon argent pour acheter un vélo.',
    ['J’économise mon argent pour que j’achète un vélo.',
     'J’économise mon argent pour que je veux acheter un vélo.',
     'Pour acheter un vélo j’économise pour mon argent.'],
    'Les deux phrases ont-elles le même sujet ?',
    '⚠ Même sujet (je / je) → <b>pour + infinitif</b>, jamais « pour que ». On réserve « pour que » à deux sujets différents.');

  J('but_consequence', 3, 'afin que', 'Nous rangeons la classe.', 'La salle reste propre.',
    'Nous rangeons la classe afin que la salle reste propre.',
    ['Afin que nous rangeons la classe, la salle reste propre.',
     'Nous rangeons afin que la classe la salle reste propre.',
     'La salle reste propre afin que nous rangeons la classe.'],
    '« afin que » = « pour que », dans un style plus soutenu.',
    '<b>afin que</b> introduit le but visé : ranger sert à garder la salle propre.');

  J('but_consequence', 3, 'si bien que', 'Le vent soufflait très fort.', 'Les bateaux sont restés au port.',
    'Le vent soufflait très fort, si bien que les bateaux sont restés au port.',
    ['Si bien que le vent soufflait très fort, les bateaux sont restés au port.',
     'Le vent soufflait si bien que très fort les bateaux sont restés au port.',
     'Les bateaux sont restés au port, si bien que le vent soufflait très fort.'],
    'Quelle phrase est le résultat de l’autre ?',
    'Le vent empêche les sorties : les bateaux au port sont la <b>conséquence</b>, annoncée par « si bien que ».');

  J('but_consequence', 2, 'donc', 'Elle a oublié son parapluie.', 'Elle a été trempée.',
    'Elle a oublié son parapluie, donc elle a été trempée.',
    ['Donc elle a oublié son parapluie, elle a été trempée.',
     'Elle a donc oublié son parapluie elle a été trempée donc.',
     'Elle a été trempée, donc elle a oublié son parapluie.'],
    'L’oubli vient d’abord, le résultat ensuite.',
    'Être trempée est la conséquence de l’oubli : elle se place après <b>donc</b>.');

  J('but_consequence', 4, 'pour que', 'Le professeur parle fort.', 'Tous les élèves l’entendent.',
    'Le professeur parle fort pour que tous les élèves l’entendent.',
    ['Pour que le professeur parle fort, tous les élèves l’entendent.',
     'Le professeur parle fort pour tous les élèves l’entendent.',
     'Le professeur parle pour que fort tous les élèves l’entendent.'],
    'Deux sujets différents → « pour que ».',
    'Le professeur et les élèves sont deux sujets différents : on emploie <b>pour que</b> + subjonctif, et non « pour + infinitif ».');

  J('but_consequence', 4, 'pour', 'Tu dois réviser.', 'Tu veux réussir ton examen.',
    'Tu dois réviser pour réussir ton examen.',
    ['Tu dois réviser pour que tu réussisses ton examen.',
     'Tu dois réviser pour que tu veux réussir ton examen.',
     'Pour réussir ton examen tu dois pour réviser.'],
    'Même sujet dans les deux phrases.',
    'Le sujet est « tu » des deux côtés : on emploie <b>pour + infinitif</b>, plus court et plus naturel.');

  J('but_consequence', 3, 'afin que', 'Le guide répète la consigne.', 'Personne ne se perd.',
    'Le guide répète la consigne afin que personne ne se perde.',
    ['Le guide répète la consigne afin que personne ne se perd.',
     'Afin que le guide répète la consigne, personne ne se perd.',
     'Le guide répète afin que la consigne personne ne se perde.'],
    'Quel mode après « afin que » ?',
    '<b>afin que</b> demande le <b>subjonctif</b> : « … afin que personne ne se <b>perde</b> ».');
})();
