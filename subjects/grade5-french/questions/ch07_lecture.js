'use strict';
// Grade 5 French — Chapter: Lecture & Compréhension
// IDs format: g5fr-lec-NNN

const _TEXTE_FR = `<div style="background:#f8fafc;border-left:4px solid #7c3aed;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.7">
<b style="color:#5b21b6">Lisez le texte attentivement, puis répondez aux questions.</b><br><br>
<b>Une journée à Maurice</b><br><br>
Demain, c'est samedi. La famille Dupont va passer la journée à la mer. Le père, Monsieur Dupont, prépare le pique-nique dans la cuisine. Il fait des sandwichs au fromage et au jambon. La mère, Madame Dupont, met les serviettes et les maillots de bain dans un grand sac bleu.<br><br>
Les deux enfants, Luc et Sophie, sont très contents. Luc a neuf ans et Sophie a sept ans. Luc veut faire du snorkeling parce qu'il adore les poissons. Sophie préfère construire des châteaux de sable avec ses amies.<br><br>
Ils partent à huit heures du matin. La plage se trouve à vingt kilomètres de leur maison, à Flic en Flac. L'eau est chaude et cristalline. Toute la famille passe une magnifique journée ensemble.
</div>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-lec-001', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Quel jour est-ce que la famille Dupont va à la mer ?`,
    options:['vendredi','dimanche','samedi','lundi'],
    answer:'samedi',
    hint:'Regardez la première phrase du texte.',
    explanation:'"<b>Samedi</b>" — Le texte commence : "Demain, c\'est <b>samedi</b>. La famille Dupont va passer la journée à la mer."' }),

  makeMCQ({ id:'g5fr-lec-002', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Qu'est-ce que Monsieur Dupont prépare ?`,
    options:['une salade','un pique-nique','du jus d\'orange','des gâteaux'],
    answer:'un pique-nique',
    hint:'Le texte dit ce que le père prépare dans la cuisine.',
    explanation:'"<b>Un pique-nique</b>" — "Le père, Monsieur Dupont, <b>prépare le pique-nique</b> dans la cuisine." Il fait des sandwichs au fromage et au jambon.' }),

  makeMCQ({ id:'g5fr-lec-003', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Quel âge a Sophie ?`,
    options:['neuf ans','huit ans','sept ans','dix ans'],
    answer:'sept ans',
    hint:'Les âges des deux enfants sont mentionnés dans le deuxième paragraphe.',
    explanation:'"<b>Sept ans</b>" — "Luc a neuf ans et Sophie a <b>sept ans</b>." En français, on dit "avoir X ans" pour exprimer l\'âge.' }),

  makeMCQ({ id:'g5fr-lec-004', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Pourquoi est-ce que Luc veut faire du snorkeling ?`,
    options:[
      'Parce qu\'il aime nager vite.',
      'Parce qu\'il adore les poissons.',
      'Parce que Sophie ne veut pas.',
      'Parce que l\'eau est froide.'
    ],
    answer:'Parce qu\'il adore les poissons.',
    hint:'Cherchez le mot "parce que" dans le texte.',
    explanation:'"<b>Parce qu\'il adore les poissons</b>" — "Luc veut faire du snorkeling <b>parce qu\'il adore les poissons</b>." Le connecteur "parce que" introduit la raison.' }),

  makeMCQ({ id:'g5fr-lec-005', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Où se trouve la plage ?`,
    options:['À vingt kilomètres, à Belle Mare','À dix kilomètres, à Grand Baie','À vingt kilomètres, à Flic en Flac','À huit kilomètres de la maison'],
    answer:'À vingt kilomètres, à Flic en Flac',
    hint:'Le troisième paragraphe donne les détails sur la plage.',
    explanation:'"<b>À vingt kilomètres, à Flic en Flac</b>" — "La plage se trouve à <b>vingt kilomètres</b> de leur maison, <b>à Flic en Flac</b>." Flic en Flac est une plage célèbre de Maurice.' }),

  makeMCQ({ id:'g5fr-lec-006', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Qu'est-ce que Madame Dupont met dans le sac ?`,
    options:[
      'Des sandwichs et de l\'eau.',
      'Des serviettes et des maillots de bain.',
      'Des jouets et des livres.',
      'Un pique-nique et des fruits.'
    ],
    answer:'Des serviettes et des maillots de bain.',
    hint:'Le texte décrit ce que la mère fait.',
    explanation:'"<b>Des serviettes et des maillots de bain</b>" — "La mère... met <b>les serviettes et les maillots de bain</b> dans un grand sac bleu."' }),

  makeTF({ id:'g5fr-lec-007', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}Vrai ou Faux : Sophie préfère faire du snorkeling.`,
    answer:false,
    hint:'Lisez ce que Sophie préfère faire.',
    explanation:'<b>Faux.</b> C\'est <b>Luc</b> qui veut faire du snorkeling. "<b>Sophie préfère construire des châteaux de sable</b> avec ses amies." Il ne faut pas confondre les deux enfants.' }),

  makeMCQ({ id:'g5fr-lec-008', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Comment est l'eau à la plage ?`,
    options:['froide et sale','chaude et cristalline','profonde et dangereuse','bleue et agitée'],
    answer:'chaude et cristalline',
    hint:'La description de l\'eau est dans le dernier paragraphe.',
    explanation:'"<b>Chaude et cristalline</b>" — "L\'eau est <b>chaude et cristalline</b>." "Cristalline" veut dire très claire, comme du cristal — un adjectif qui décrit une eau très propre et transparente.' }),

  makeMCQ({ id:'g5fr-lec-009', chapterId:'fr-lecture', difficulty:1,
    question:`${_TEXTE_FR}À quelle heure est-ce que la famille part ?`,
    options:['à sept heures','à huit heures du matin','à neuf heures','à midi'],
    answer:'à huit heures du matin',
    hint:'L\'heure du départ est mentionnée dans le dernier paragraphe.',
    explanation:'"<b>À huit heures du matin</b>" — "Ils partent à <b>huit heures du matin</b>." Du matin = in the morning (a.m.).' }),

  makeMCQ({ id:'g5fr-lec-010', chapterId:'fr-lecture', difficulty:2,
    question:`${_TEXTE_FR}Quel est le sentiment des enfants avant la sortie ?`,
    options:['tristes','fatigués','très contents','nerveux'],
    answer:'très contents',
    hint:'Comment sont Luc et Sophie ? Cherchez l\'adjectif qui les décrit.',
    explanation:'"<b>Très contents</b>" — "Les deux enfants, Luc et Sophie, sont <b>très contents</b>." Contents = happy/pleased. Très = very. L\'adjectif "content" est au masculin pluriel car il décrit les deux enfants (un garçon et une fille → masculin pluriel en français).' })

);
