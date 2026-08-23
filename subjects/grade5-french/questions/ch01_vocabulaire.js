'use strict';
// Grade 5 French — Chapter: Vocabulaire de base
// IDs format: g5fr-voc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5fr-voc-001', chapterId:'fr-vocabulaire', difficulty:1,
    question:'What does "Bonjour" mean in English?',
    options:['Goodbye','Good evening','Good morning / Hello','Please'],
    answer:'Good morning / Hello',
    hint:'This is the most common French greeting used during the day.',
    explanation:'"<b>Bonjour</b>" means <b>Good morning</b> or <b>Hello</b>. It is used throughout the daytime. In the evening you would say "Bonsoir". "Au revoir" = Goodbye. "Merci" = Thank you.' }),

  makeMCQ({ id:'g5fr-voc-002', chapterId:'fr-vocabulaire', difficulty:1,
    question:'What is the French word for the colour GREEN?',
    options:['rouge','bleu','jaune','vert'],
    answer:'vert',
    hint:'Think of the colour of grass and leaves.',
    explanation:'"<b>Vert</b>" = green. Other colours: rouge (red), bleu (blue), jaune (yellow), noir (black), blanc (white), orange (orange), violet (purple), rose (pink).' }),

  makeMCQ({ id:'g5fr-voc-003', chapterId:'fr-vocabulaire', difficulty:1,
    question:'How do you say the number 15 in French?',
    options:['cinq','quatorze','quinze','seize'],
    answer:'quinze',
    hint:'Count: onze (11), douze (12), treize (13), quatorze (14), ___',
    explanation:'"<b>Quinze</b>" = 15. Number sequence: onze (11), douze (12), treize (13), quatorze (14), quinze (15), seize (16), dix-sept (17), dix-huit (18), dix-neuf (19), vingt (20).' }),

  makeMCQ({ id:'g5fr-voc-004', chapterId:'fr-vocabulaire', difficulty:1,
    question:'Which day of the week comes after "mercredi" (Wednesday)?',
    options:['mardi','lundi','jeudi','vendredi'],
    answer:'jeudi',
    hint:'The days in order: lundi, mardi, mercredi, ___, vendredi, samedi, dimanche.',
    explanation:'"<b>Jeudi</b>" = Thursday, and it comes after mercredi (Wednesday). The full week: lundi (Mon), mardi (Tue), mercredi (Wed), jeudi (Thu), vendredi (Fri), samedi (Sat), dimanche (Sun).' }),

  makeMCQ({ id:'g5fr-voc-005', chapterId:'fr-vocabulaire', difficulty:1,
    question:'What does "S\'il vous plaît" mean?',
    options:['Thank you','Excuse me','Please','You\'re welcome'],
    answer:'Please',
    hint:'You say this when making a polite request to someone.',
    explanation:'"<b>S\'il vous plaît</b>" = <b>Please</b> (formal/plural). To one friend: "s\'il te plaît". "Merci" = Thank you. "De rien / Je vous en prie" = You\'re welcome. "Excusez-moi" = Excuse me.' }),

  makeMCQ({ id:'g5fr-voc-006', chapterId:'fr-vocabulaire', difficulty:2,
    question:'In which month is Christmas celebrated? (What is the French name?)',
    options:['novembre','décembre','janvier','octobre'],
    answer:'décembre',
    hint:'Christmas is on the 25th of this month.',
    explanation:'Christmas (Noël) is on 25 <b>décembre</b> (December). The months: janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.' }),

  makeMCQ({ id:'g5fr-voc-007', chapterId:'fr-vocabulaire', difficulty:2,
    question:'How do you say "100" in French?',
    options:['dix','vingt','cent','mille'],
    answer:'cent',
    hint:'This word gives us the English word "century" (100 years).',
    explanation:'"<b>Cent</b>" = 100. Key numbers: vingt (20), trente (30), quarante (40), cinquante (50), soixante (60), soixante-dix (70), quatre-vingts (80), quatre-vingt-dix (90), cent (100), mille (1000).' }),

  makeTF({ id:'g5fr-voc-008', chapterId:'fr-vocabulaire', difficulty:1,
    question:'"Bonsoir" is used to greet someone in the morning.',
    answer:false,
    hint:'"Bon" = good. "Soir" = evening.',
    explanation:'<b>Faux (False).</b> "Bonsoir" = <b>Good evening</b> — used from late afternoon/evening onwards. For morning/daytime greetings, use "Bonjour".' }),

  makeMCQ({ id:'g5fr-voc-009', chapterId:'fr-vocabulaire', difficulty:1,
    question:'What colour is "rouge"?',
    options:['blue','green','yellow','red'],
    answer:'red',
    hint:'Think of the French flag — it has blue, white and this colour.',
    explanation:'"<b>Rouge</b>" = <b>red</b>. The French flag (tricolore) has bleu (blue), blanc (white) and rouge (red). Rouge also gives us the English word "rouge" (a red cosmetic).' }),

  makeMCQ({ id:'g5fr-voc-010', chapterId:'fr-vocabulaire', difficulty:2,
    question:'How do you say "Au revoir" in English?',
    options:['Hello','Good morning','See you soon','Goodbye'],
    answer:'Goodbye',
    hint:'You say this when leaving someone.',
    explanation:'"<b>Au revoir</b>" = <b>Goodbye</b> (literally "until we see each other again"). Other farewells: "À bientôt" (see you soon), "À demain" (see you tomorrow), "Bonne nuit" (Good night — when going to sleep).' })

);
