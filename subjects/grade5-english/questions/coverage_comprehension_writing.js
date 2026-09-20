'use strict';
(function(){
const add=(id,c,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5E_EXPL[id]||e||`<b>${a}</b> is correct.`}));
const rows=(p,c,s,d,o,h)=>d.forEach(([q,a,ro],i)=>add(`g5e-cov-${p}-${i}`,c,s,q,ro||o,a,h));
// Real explanations, keyed by id. Added because every question in this file
// used to say only "<b>X</b> is correct.", which teaches nothing.
const G5E_EXPL = {
  'g5e-cov-main-0': "The main idea is what the whole text is about, not one detail from it. Every part of this text is about <b>ways to save water</b>.",
  'g5e-cov-main-1': "The description of the cyclone sets the scene, but the passage as a whole is about <b>how to stay safe</b> in one.",
  'g5e-cov-main-2': "Each fact in the report supports one bigger point — why reefs matter. That bigger point is the main idea.",
  'g5e-cov-author-0': "The writer wants the reader to <i>do</i> something — bring a bottle — so the purpose is <b>to persuade</b>, not simply to inform.",
  'g5e-cov-author-1': "The first sentence gives the fact. The second says how it affects other people, which is meant to make readers feel responsible rather than just informed.",
  'g5e-cov-author-2': "Setting the loss beside the six weeks of training invites the reader to connect them: the effort was there even though the result was not.",
  'g5e-cov-formal-0': "When you do not know the person's name, a formal letter opens <b>Dear Sir or Madam,</b>.",
  'g5e-cov-formal-1': "<b>Yours faithfully</b> pairs with <i>Dear Sir or Madam</i>. Had you named the person, you would end <i>Yours sincerely</i>.",
  'g5e-cov-informal-0': "A close friend takes an informal greeting with their name: <b>Hi Aisha,</b>.",
  'g5e-cov-informal-1': "A postcard to a cousin is informal, so a warm everyday ending like <b>See you soon,</b> fits.",
  'g5e-cov-description-2': "<i>Aroma</i> is something you breathe in, so the sense being used is <b>smell</b>.",
};

// main idea — broken shared opts replaced with per-question options
add('g5e-cov-main-0','eng-comprehension','main_idea',
  'A text explains how to save water at home. What is its main idea?',
  ['ways to save water','the best types of water filters','how rainfall is measured','the history of water supply'],
  'ways to save water','Choose the idea that covers the whole text, not one small detail.');
add('g5e-cov-main-1','eng-comprehension','main_idea',
  'A passage describes a cyclone and safety steps. What is its main idea?',
  ['how to stay safe in a cyclone','the causes of cyclones','the history of cyclones in Mauritius','types of storms around the world'],
  'how to stay safe in a cyclone','Choose the idea that covers the whole text, not one small detail.');
add('g5e-cov-main-2','eng-comprehension','main_idea',
  'A report explains why coral reefs matter. What is its main idea?',
  ['the importance of coral reefs','how fish swim in the ocean','the best diving spots in Mauritius','how coral reefs are formed'],
  'the importance of coral reefs','Choose the idea that covers the whole text, not one small detail.');

// author's purpose — row[0] uses 3 plausible purpose options (kept); rows[1,2] have per-row opts (kept)
rows('author','eng-comprehension','authors_view',[
  ['A poster says "Bring a reusable bottle-protect our beaches!" What is the writer\'s purpose?','to persuade'],
  ['A school notice reads: "Bins are provided at both gates. Cleaners should not have to pick up after us." Why has the writer added the second sentence?','To make readers feel responsible, not merely informed',
    ['To make readers feel responsible, not merely informed','To explain exactly where the bins have been placed','To warn that the cleaners may refuse to work','To show that the school employs its own cleaners']],
  ['A match report ends: "The team lost three-nil. They had trained for six weeks." Why does the writer place these two facts side by side?','To suggest the score does not tell the whole story',
    ['To suggest the score does not tell the whole story','To explain precisely why the team lost the match','To criticise the team for not training harder','To show that six weeks of training is plenty']]
],['to persuade','to instruct','to inform'],'Ask what the writer wants the reader to do, know, or feel.');

// inference — broken shared opts replaced with per-question options
add('g5e-cov-infer-0','eng-comprehension','inference',
  'Lina put on her raincoat and took an umbrella. What can you infer?',
  ['It was likely raining or about to rain.','She was going to the beach.','It was a very hot sunny day.','She had forgotten where she left her coat.'],
  'It was likely raining or about to rain.','Use clues in the text and your own knowledge.');
add('g5e-cov-infer-1','eng-comprehension','inference',
  'The stadium was silent as the last penalty was taken. What can you infer?',
  ['The moment was important and tense.','The crowd was bored and restless.','The match had already ended.','The penalty was an easy kick.'],
  'The moment was important and tense.','Use clues in the text and your own knowledge.');
add('g5e-cov-infer-2','eng-comprehension','inference',
  'Amir stared at the empty plate and smiled. What can you infer?',
  ['He probably enjoyed the meal.','He was still hungry after eating.','He was waiting for dessert.','He had cooked the meal himself.'],
  'He probably enjoyed the meal.','Use clues in the text and your own knowledge.');

// formal letter — broken shared opts replaced with per-question options
add('g5e-cov-formal-0','eng-writing','formal_letter',
  'Which greeting is best for a formal letter to a principal?',
  ['Dear Sir or Madam,','Hi Principal,','Dear Friend,','Hello,'],
  'Dear Sir or Madam,','Formal writing is polite, clear, and avoids slang.');
add('g5e-cov-formal-1','eng-writing','formal_letter',
  'Which ending is suitable for a formal letter?',
  ['Yours faithfully,','See you soon,','Love from,','Bye for now,'],
  'Yours faithfully,','Formal writing is polite, clear, and avoids slang.');
add('g5e-cov-formal-2','eng-writing','formal_letter',
  'Which sentence has a formal tone?',
  ['I am writing to request information about the event.','Can you tell me stuff about the event please?','I wanna know more about the event!','Tell me about the event.'],
  'I am writing to request information about the event.','Formal writing is polite, clear, and avoids slang.');

// informal writing — broken shared opts replaced with per-question options
add('g5e-cov-informal-0','eng-writing','informal',
  'Which greeting suits an email to a close friend?',
  ['Hi Aisha,','Dear Ms Aisha,','To Whom It May Concern,','Dear Sir,'],
  'Hi Aisha,','Informal writing is friendly and personal.');
add('g5e-cov-informal-1','eng-writing','informal',
  'Which ending suits a postcard to a cousin?',
  ['See you soon,','Yours faithfully,','Yours sincerely,','With regards,'],
  'See you soon,','Informal writing is friendly and personal.');
add('g5e-cov-informal-2','eng-writing','informal',
  'Which sentence has an informal tone?',
  ["I can't wait to tell you about my trip!",'I would be delighted to share details of my travels with you.','Please find enclosed a description of my journey.','I write to inform you of my recent visit.'],
  "I can't wait to tell you about my trip!",'Informal writing is friendly and personal.');

// descriptive writing — all rows have per-row opts, kept as rows()
rows('description','eng-writing','descriptive',[
  ['Which phrase creates the clearest image of a beach?','Golden sand shimmered beside the turquoise water.',
    ['Golden sand shimmered beside the turquoise water.','The beach was very nice.','There was sand and water at the beach.']],
  ['Which sentence shows that a character is frightened?','Her breath caught as the door creaked open.',
    ['Her breath caught as the door creaked open.','She opened the door and went inside.','She hummed a tune as she opened the door.']],
  ['Which sense is used in "The spicy aroma drifted from the kitchen"?','smell',
    ['smell','taste','hearing','sight']]
],['Golden sand shimmered beside the turquoise water.','Her breath caught as the door creaked open.','smell'],'Use precise details and the five senses.');

// figurative language — broken shared opts replaced with per-question options
add('g5e-cov-figurative-0','eng-writing','figurative',
  'Which sentence contains personification?',
  ['The impatient wind rattled the windows.','The wind blew very hard.','The windows were old and broken.','The storm was the worst in years.'],
  'The impatient wind rattled the windows.','Look for human actions, direct comparisons, or repeated starting sounds.');
add('g5e-cov-figurative-1','eng-writing','figurative',
  'Which sentence contains a metaphor?',
  ['The classroom was a buzzing beehive.','The classroom was like a buzzing beehive.','The pupils were busy in the classroom.','The bees buzzed loudly outside the window.'],
  'The classroom was a buzzing beehive.','Look for human actions, direct comparisons, or repeated starting sounds.');
add('g5e-cov-figurative-2','eng-writing','figurative',
  'Which sentence contains alliteration?',
  ['Silver snakes slithered silently.','The snake moved quietly across the rocks.','Darkness fell over the lonely valley.','Heavy rain fell on the old town.'],
  'Silver snakes slithered silently.','Look for human actions, direct comparisons, or repeated starting sounds.');
})();
