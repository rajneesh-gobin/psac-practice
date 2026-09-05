'use strict';
(function(){
 const add=(id,s,q,o,a)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'g4fr-vocabulaire',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:'Relis le mot et pense à son sens.',explanation:`La bonne réponse est <b>${a}</b>.`}));
 const days=[['lundi','Monday'],['mardi','Tuesday'],['mercredi','Wednesday'],['jeudi','Thursday'],['vendredi','Friday'],['samedi','Saturday'],['dimanche','Sunday'],['janvier','January'],['février','February'],['mars','March'],['avril','April'],['mai','May'],['juin','June']];
 days.forEach(([f,a],i)=>add(`g4fr-cov-day-${i}`,'jours_mois',`Que veut dire « ${f} » en anglais ?`,[a,'red','school','cat'],a));
 const time=[['aujourd\'hui','today'],['demain','tomorrow'],['hier','yesterday'],['le matin','in the morning'],['le soir','in the evening'],['la nuit','at night'],['maintenant','now'],['bientôt','soon'],['toujours','always'],['jamais','never'],['avant','before'],['après','after'],['tôt','early'],['tard','late'],['la semaine','the week'],['le week-end','the weekend']];
 time.forEach(([f,a],i)=>add(`g4fr-cov-time-${i}`,'temps',`Choisis la traduction de « ${f} ».`,[a,'a colour','an animal','a food'],a));
 const verbs=[['manger','to eat'],['boire','to drink'],['dormir','to sleep'],['lire','to read'],['écrire','to write'],['jouer','to play'],['courir','to run'],['marcher','to walk'],['chanter','to sing'],['danser','to dance'],['regarder','to watch'],['écouter','to listen'],['parler','to speak'],['aimer','to like'],['habiter','to live'],['aller','to go'],['venir','to come'],['faire','to do']];
 verbs.forEach(([f,a],i)=>add(`g4fr-cov-verb-${i}`,'verbes_utiles',`Que veut dire le verbe « ${f} » ?`,[a,'a day','a colour','a place'],a));
})();
