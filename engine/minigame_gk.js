'use strict';
// ══════════════════════════════════════════════
//  General-knowledge bank for the "Who Wants to Be a Billionaire?" minigame.
//
//  These are the top-of-the-ladder questions (16–20): the same SUBJECTS a
//  Mauritian PSAC child studies, but knowledge reaching a little beyond the
//  textbook — the kind of thing a curious, well-read student would know. Every
//  one is a plain 4-option MCQ carrying its own subject + topic label, shown
//  under the question so the child sees where it comes from.
//
//  ⚠ Shown to children as fact — keep every answer verifiable and correct.
//  Each: { subject, topic, question, options[4], answer, explanation }.
//  `subject` is one of: maths · english · french · science · histgeo, matched
//  to the child's own grade subjects at pick time.
// ══════════════════════════════════════════════
window.MINIGAME_GK = [
  // ── Maths — Numbers & beyond ─────────────────
  { subject:'maths', topic:'Numbers & beyond', question:'How many zeros are there in one million?', options:['5','6','7','9'], answer:'6', explanation:'One million is 1,000,000 — a 1 followed by six zeros.' },
  { subject:'maths', topic:'Shapes', question:'What do we call a flat shape with eight sides?', options:['Octagon','Hexagon','Pentagon','Heptagon'], answer:'Octagon', explanation:'"Oct-" means eight, as in octopus.' },
  { subject:'maths', topic:'Roman numerals', question:'What is the Roman numeral for 50?', options:['L','C','X','V'], answer:'L', explanation:'L = 50, C = 100, X = 10, V = 5.' },
  { subject:'maths', topic:'Angles', question:'How many degrees are there in a full turn (a complete circle)?', options:['360','180','90','270'], answer:'360', explanation:'A full circle is 360°; a half turn is 180°.' },
  { subject:'maths', topic:'Prime numbers', question:'Which of these is a prime number?', options:['17','15','21','9'], answer:'17', explanation:'17 has no factors except 1 and itself. The others all divide by 3.' },
  { subject:'maths', topic:'Operations', question:'What do we call the answer to a multiplication?', options:['Product','Sum','Difference','Quotient'], answer:'Product', explanation:'Sum is for adding, difference for subtracting, quotient for dividing.' },
  { subject:'maths', topic:'Big numbers', question:'A "googol" is a 1 followed by how many zeros?', options:['100','10','50','1000'], answer:'100', explanation:'A googol is 10¹⁰⁰ — the search engine Google is named after it.' },

  // ── English — Words & language ───────────────
  { subject:'english', topic:'Words & language', question:'What do we call words that sound the same but are spelled differently, like "sea" and "see"?', options:['Homophones','Synonyms','Antonyms','Rhymes'], answer:'Homophones', explanation:'"Homo-" means same, "-phone" means sound.' },
  { subject:'english', topic:'Grammar', question:'What do we call a word that describes a noun, like "bright" or "tall"?', options:['Adjective','Verb','Adverb','Pronoun'], answer:'Adjective', explanation:'Adjectives describe nouns; adverbs describe verbs.' },
  { subject:'english', topic:'Plurals', question:'What is the plural of "child"?', options:['Children','Childs','Childes','Childrens'], answer:'Children', explanation:'"Child" has an irregular plural — "children".' },
  { subject:'english', topic:'Opposites', question:'Which word means the opposite of "ancient"?', options:['Modern','Old','Historic','Aged'], answer:'Modern', explanation:'Ancient means very old; modern means new or of today.' },
  { subject:'english', topic:'Stories', question:'What do we call the person or voice telling a story?', options:['Narrator','Author','Character','Reader'], answer:'Narrator', explanation:'The author writes the book; the narrator tells the story inside it.' },
  { subject:'english', topic:'Punctuation', question:'Which punctuation mark ends a question?', options:['Question mark','Full stop','Comma','Exclamation mark'], answer:'Question mark', explanation:'A question ends with "?".' },
  { subject:'english', topic:'Synonyms', question:'Which word means almost the same as "enormous"?', options:['Gigantic','Tiny','Narrow','Silent'], answer:'Gigantic', explanation:'Enormous and gigantic both mean very big — they are synonyms.' },

  // ── French — La langue française ─────────────
  { subject:'french', topic:'Le vocabulaire', question:'Comment dit-on "thank you" en français ?', options:['Merci','Bonjour','Au revoir','Pardon'], answer:'Merci', explanation:'« Merci » veut dire "thank you".' },
  { subject:'french', topic:'Les animaux', question:'Comment dit-on "cat" en français ?', options:['Chat','Chien','Cheval','Chèvre'], answer:'Chat', explanation:'« Chat » = cat, « chien » = dog.' },
  { subject:'french', topic:'Les couleurs', question:'Quelle est la couleur « bleu » en anglais ?', options:['Blue','Green','Red','Yellow'], answer:'Blue', explanation:'« Bleu » veut dire blue.' },
  { subject:'french', topic:'Les jours', question:'Quel jour vient après « lundi » ?', options:['Mardi','Dimanche','Mercredi','Vendredi'], answer:'Mardi', explanation:'Lundi, mardi, mercredi… mardi suit lundi.' },
  { subject:'french', topic:'Les nombres', question:'Combien font « dix » plus « cinq » ?', options:['Quinze','Douze','Vingt','Onze'], answer:'Quinze', explanation:'Dix (10) + cinq (5) = quinze (15).' },
  { subject:'french', topic:'Les articles', question:'Quel article va avec le mot « soleil » ?', options:['le','la','les','une'], answer:'le', explanation:'« Soleil » est masculin : « le soleil ».' },
  { subject:'french', topic:'Le féminin', question:'Quel est le féminin de « grand » ?', options:['Grande','Grands','Grandes','Gros'], answer:'Grande', explanation:'Grand → grande au féminin.' },

  // ── Science — Science all around ─────────────
  { subject:'science', topic:'Plants & air', question:'Which gas do green plants release that humans and animals need to breathe?', options:['Oxygen','Carbon dioxide','Nitrogen','Helium'], answer:'Oxygen', explanation:'Plants release oxygen during photosynthesis.' },
  { subject:'science', topic:'The solar system', question:'What is the largest planet in our solar system?', options:['Jupiter','Saturn','Earth','Mars'], answer:'Jupiter', explanation:'Jupiter is the biggest planet — over 1,300 Earths could fit inside it.' },
  { subject:'science', topic:'Animals', question:'How many legs does an insect have?', options:['6','4','8','10'], answer:'6', explanation:'All insects have six legs. Spiders (8 legs) are not insects.' },
  { subject:'science', topic:'Food chains', question:'What do we call animals that eat only plants?', options:['Herbivores','Carnivores','Omnivores','Predators'], answer:'Herbivores', explanation:'Herbivores eat plants; carnivores eat meat; omnivores eat both.' },
  { subject:'science', topic:'The human body', question:'Which organ pumps blood around the body?', options:['Heart','Lungs','Brain','Liver'], answer:'Heart', explanation:'The heart pumps blood; the lungs handle breathing.' },
  { subject:'science', topic:'Water', question:'What is it called when water turns into vapour and rises into the air?', options:['Evaporation','Condensation','Freezing','Melting'], answer:'Evaporation', explanation:'Heat makes water evaporate; cooling makes vapour condense back to liquid.' },
  { subject:'science', topic:'Materials', question:'What is the hardest natural material on Earth?', options:['Diamond','Gold','Iron','Granite'], answer:'Diamond', explanation:'Diamond is the hardest naturally occurring substance.' },
  { subject:'science', topic:'The human body', question:'About how many bones are there in an adult human body?', options:['206','150','300','100'], answer:'206', explanation:'Adults have 206 bones; babies are born with about 300 that fuse as they grow.' },

  // ── History & Geography — Mauritius & the world ─
  { subject:'histgeo', topic:'Mauritius', question:'What is the capital city of Mauritius?', options:['Port Louis','Curepipe','Vacoas','Quatre Bornes'], answer:'Port Louis', explanation:'Port Louis, on the north-west coast, is the capital and largest city.' },
  { subject:'histgeo', topic:'Geography', question:'Which ocean surrounds Mauritius?', options:['Indian Ocean','Atlantic Ocean','Pacific Ocean','Arctic Ocean'], answer:'Indian Ocean', explanation:'Mauritius is an island in the Indian Ocean, east of Madagascar.' },
  { subject:'histgeo', topic:'History', question:'In which year did Mauritius become independent?', options:['1968','1948','1992','1810'], answer:'1968', explanation:'Mauritius gained independence on 12 March 1968.' },
  { subject:'histgeo', topic:'Nature', question:'Which famous extinct bird lived only in Mauritius?', options:['Dodo','Penguin','Ostrich','Kiwi'], answer:'Dodo', explanation:'The flightless dodo lived only in Mauritius and died out in the 1600s.' },
  { subject:'histgeo', topic:'History', question:'Who was the first Prime Minister of Mauritius?', options:['Sir Seewoosagur Ramgoolam','Paul Bérenger','Anerood Jugnauth','Navin Ramgoolam'], answer:'Sir Seewoosagur Ramgoolam', explanation:'SSR led Mauritius to independence and is called the Father of the Nation.' },
  { subject:'histgeo', topic:'Geography', question:'Which island to the east is also part of the Republic of Mauritius?', options:['Rodrigues','Réunion','Madagascar','Seychelles'], answer:'Rodrigues', explanation:'Rodrigues, about 560 km east, is part of the Republic of Mauritius.' },
  { subject:'histgeo', topic:'Mauritius', question:'In 1992, Mauritius became a...?', options:['Republic','Colony','Kingdom','Province'], answer:'Republic', explanation:'Mauritius became a republic on 12 March 1992.' },
  { subject:'histgeo', topic:'World geography', question:'Which continent is closest to Mauritius?', options:['Africa','Asia','Europe','Australia'], answer:'Africa', explanation:'Mauritius lies off the south-east coast of Africa.' },
];
