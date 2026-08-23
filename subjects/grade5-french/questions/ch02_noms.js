'use strict';
// Grade 5 French — Chapitre : Les Noms, Articles et Genre
// IDs format: g5fr-nom-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-nom-001', chapterId:'fr-noms', difficulty:1,
    question:'Quel article défini utilise-t-on devant un nom masculin singulier ?',
    options:['la','les','le','l\''],
    answer:'le',
    hint:'"Le" s\'utilise devant un nom masculin qui ne commence pas par une voyelle.',
    explanation:'"<b>Le</b>" est l\'article défini masculin singulier. "La" = féminin singulier. "L\'" = devant une voyelle ou h muet (l\'enfant, l\'homme). "Les" = pluriel (masculin ou féminin).' }),

  makeMCQ({ id:'g5fr-nom-002', chapterId:'fr-noms', difficulty:1,
    question:'Choisissez le bon article : "___ école est grande."',
    options:['Le','La','L\'','Les'],
    answer:'L\'',
    hint:'"École" commence par une voyelle (e). Quel article s\'utilise devant une voyelle ?',
    explanation:'"<b>L\'</b>école est grande." — Devant une voyelle (a, e, i, o, u) ou un h muet, on utilise "l\'" (élision) pour les deux genres. "École" est féminin, mais "l\'ami" (masculin) prend aussi "l\'".' }),

  makeMCQ({ id:'g5fr-nom-003', chapterId:'fr-noms', difficulty:1,
    question:'Quel est le pluriel de "un bateau" ?',
    options:['des bateaux','des bateaux','des bateau','des bateaus'],
    answer:'des bateaux',
    hint:'Les mots en -eau forment leur pluriel en -eaux.',
    explanation:'"<b>Des bateaux</b>" — les noms terminés en <b>-eau</b> forment leur pluriel en <b>-eaux</b> : bateau → bateaux, gâteau → gâteaux, chapeau → chapeaux. L\'article indéfini pluriel est "des".' }),

  makeMCQ({ id:'g5fr-nom-004', chapterId:'fr-noms', difficulty:1,
    question:'Quel est le pluriel de "un animal" ?',
    options:['des animals','des animaux','des animalx','des animales'],
    answer:'des animaux',
    hint:'Les mots en -al forment généralement leur pluriel en -aux.',
    explanation:'"<b>Des animaux</b>" — les noms terminés en <b>-al</b> forment leur pluriel en <b>-aux</b> : animal → animaux, cheval → chevaux, journal → journaux. Exceptions : bal → bals, carnaval → carnavals.' }),

  makeMCQ({ id:'g5fr-nom-005', chapterId:'fr-noms', difficulty:1,
    question:'Quel article indéfini utilise-t-on devant un nom féminin singulier ?',
    options:['un','une','des','le'],
    answer:'une',
    hint:'"Une" correspond à "a" ou "an" pour un nom féminin.',
    explanation:'"<b>Une</b>" est l\'article indéfini féminin singulier : une fille, une maison, une idée. "Un" = masculin singulier. "Des" = pluriel. Articles définis : le/la/l\'/les. Articles indéfinis : un/une/des.' }),

  makeMCQ({ id:'g5fr-nom-006', chapterId:'fr-noms', difficulty:2,
    question:'Complétez : "J\'ai ___ chien et ___ chat."',
    options:['un / un','un / une','une / un','le / la'],
    answer:'un / une',
    hint:'"Chien" est masculin, "chat" peut être masculin ou féminin. Ici : "un chat" (masculin).',
    explanation:'"J\'ai <b>un</b> chien (masc.) et <b>un</b> chat (masc.)." — Mais si on dit "une chatte" (chatte = féminin), c\'est "une". "Chien" est toujours masculin. Articles indéfinis : <b>un</b> (masc. sing.), <b>une</b> (fém. sing.), <b>des</b> (pluriel).' }),

  makeMCQ({ id:'g5fr-nom-007', chapterId:'fr-noms', difficulty:2,
    question:'Complétez : "Elle a ___ robe bleue."',
    options:['un','le','une','la'],
    answer:'une',
    hint:'"Robe" est un nom féminin singulier. On parle d\'une robe en général, pas d\'une robe spécifique.',
    explanation:'"Elle a <b>une</b> robe bleue." — "Robe" est féminin singulier. On utilise l\'article indéfini "une" car on parle d\'une robe quelconque (pas d\'une robe précise). Si on parlait d\'une robe spécifique : "Elle a <b>la</b> robe bleue."' }),

  makeMCQ({ id:'g5fr-nom-008', chapterId:'fr-noms', difficulty:2,
    question:'Quel est le pluriel de "le journal" ?',
    options:['les journalx','les journals','les journaux','les journales'],
    answer:'les journaux',
    hint:'"Journal" se termine en -al. Rappel : -al → -aux au pluriel.',
    explanation:'"<b>Les journaux</b>" — journal → journaux (-al → -aux). Article défini pluriel : "les". Autres exemples : cheval → chevaux, animal → animaux, carnaval → carnavals (exception).' }),

  makeTF({ id:'g5fr-nom-009', chapterId:'fr-noms', difficulty:1,
    question:'En français, tous les noms ont un genre : masculin ou féminin.',
    answer:true,
    hint:'Contrairement à l\'anglais, chaque nom français a un genre.',
    explanation:'<b>Vrai.</b> En français, chaque nom est soit <b>masculin</b> (le, un) soit <b>féminin</b> (la, une). Il n\'y a pas de neutre comme en anglais ("it"). Il faut apprendre le genre avec chaque mot.' }),

  makeMCQ({ id:'g5fr-nom-010', chapterId:'fr-noms', difficulty:2,
    question:'Quel article défini utilise-t-on devant "ami" ?',
    options:['le','la','l\'','les'],
    answer:'l\'',
    hint:'"Ami" commence par une voyelle. Quel article s\'utilise devant une voyelle ?',
    explanation:'"<b>L\'</b>ami" — "ami" commence par la voyelle "a", donc on utilise l\'article élidé "l\'" (masculin singulier). De même : "l\'amie" (féminin). L\'élision s\'applique aux deux genres devant une voyelle ou h muet.' })

);
