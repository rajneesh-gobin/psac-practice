'use strict';
// Grade 4 English coverage batch: verbs and tenses.
(function () {
  const add = (id, subsection, question, options, answer, hint, explanation, difficulty = 2) =>
    STATIC_QUESTIONS.push(makeMCQ({ id, chapterId:'g4eng-verbs', subsection, difficulty, question, options, answer, hint, explanation }));
  const agreement = [
    ['The dog','runs'], ['My sister','reads'], ['The birds','fly'], ['The children','play'], ['A mango','falls'], ['The buses','stop'],
    ['Our teacher','explains'], ['The kittens','sleep'], ['Ravi','walks'], ['The flowers','grow'], ['My parents','work'], ['The baby','cries'],
    ['The waves','crash'], ['A fisherman','sails'], ['The girls','dance'], ['The sun','shines'], ['Two frogs','jump'], ['The chef','cooks']
  ];
  agreement.forEach(([subject, verb], i) => add(`g4eng-cover-agree-${String(i+1).padStart(2,'0')}`, 'agreement',
    `Choose the correct verb: "${subject} ___ every day."`, [verb, verb.endsWith('s') ? verb.slice(0,-1) : `${verb}s`, 'is', 'were'], verb,
    'A singular subject usually takes a verb ending in -s; a plural subject usually does not.', `<b>${subject} ${verb}</b> has the correct subject-verb agreement.`));
  const auxiliaries = [
    ['I','am','drawing a map'], ['She','is','feeding the rabbit'], ['We','are','packing our bags'], ['They','are','playing chess'], ['He','is','washing the dishes'],
    ['You','are','listening carefully'], ['The baby','is','sleeping'], ['The pupils','are','writing quietly'], ['Mum','is','making tea'], ['My friends','are','waiting outside'],
    ['I','can','swim across the pool'], ['We','can','help our neighbour'], ['You','must','wear a helmet'], ['Pupils','must','arrive on time'], ['She','may','borrow my ruler'],
    ['They','should','share the crayons'], ['I','will','visit Grandma tomorrow'], ['The dog','can','catch the ball'], ['We','should','keep the beach clean']
  ];
  auxiliaries.forEach(([subject, word, ending], i) => add(`g4eng-cover-aux-${String(i+1).padStart(2,'0')}`, 'auxiliary',
    `Choose ${i < 10 ? 'the helping word for an action happening now' : 'the modal helping verb'}: "${subject} ___ ${ending}."`, [word, 'was', 'do', 'has'], word,
    'A helping verb works with the main verb or shows what someone can, must or should do.', `<b>${word}</b> is the correct helping word in this sentence.`));
  const past = [
    ['Yesterday, Asha','walked','walk'], ['Last night, we','watched','watch'], ['On Saturday, I','visited','visit'], ['The baby','slept','sleep'],
    ['Ravi','ate','eat'], ['The team','won','win'], ['Mum','bought','buy'], ['The kite','flew','fly'], ['They','went','go'], ['The bell','rang','ring']
  ];
  past.forEach(([subject, answer, base], i) => add(`g4eng-cover-past-${String(i+1).padStart(2,'0')}`, 'past_tense',
    `Choose the past-tense verb: "${subject} ___${i < 3 ? '' : ' yesterday'}."`, [base, answer, `${base}ing`, 'will'], answer,
    'The instruction asks for the past tense: an action that has already happened.', `<b>${answer}</b> is the past tense of <b>${base}</b>.`));
  const future = [
    ['Tomorrow, I','will tidy my room'], ['Next week, we','will plant seeds'], ['On Sunday, Dad','will cook lunch'], ['Later, the class','will visit the museum'],
    ['Tonight, she','will finish her book'], ['In July, they','will travel to Rodrigues'], ['After school, I','will feed the cat'], ['Next month, Mum','will start a garden'],
    ['Soon, the rain','will stop'], ['This afternoon, we','will practise football'], ['Tomorrow morning, Ravi','will catch the bus'], ['Next year, my cousin','will join our school'],
    ['In an hour, the film','will begin'], ['Later today, the baker','will make bread'], ['Next Friday, we','will clean the playground'], ['At noon, the boat','will leave the harbour'],
    ['Tomorrow, the pupils','will present their project'], ['Soon, I','will call Grandma']
  ];
  future.forEach(([start, answer], i) => add(`g4eng-cover-future-${String(i+1).padStart(2,'0')}`, 'future_tense',
    `Choose the future tense: "${start} ___."`, [answer, answer.replace('will ','') + ' yesterday', 'was ' + answer.replace('will ',''), 'has ' + answer.replace('will ','')], answer,
    'Words such as tomorrow, later and next week often tell you to use the future tense.', `<b>${answer}</b> tells what is going to happen in the future.`));
  const continuous = [
    ['I','am','reading a story'], ['The girls','are','skipping outside'], ['He','is','drawing a fish'], ['We','are','building a model'], ['The bird','is','making a nest'],
    ['You','are','holding the map'], ['Mum','is','talking on the phone'], ['The boys','are','kicking the ball'], ['My brother','is','practising the piano'], ['The waves','are','moving quickly'],
    ['The chef','is','mixing the soup'], ['Our class','is','learning a song'], ['The dogs','are','chasing each other'], ['I','am','wearing my raincoat'],
    ['The children','are','watching the play'], ['The frog','is','hopping near the pond'], ['We','are','waiting for the bus'], ['Grandpa','is','watering the plants']
  ];
  continuous.forEach(([subject, helper, ending], i) => add(`g4eng-cover-cont-${String(i+1).padStart(2,'0')}`, 'continuous',
    `Choose the present continuous: "${subject} ___ now."`, [`${helper} ${ending}`, `was ${ending}`, `will ${ending}`, ending], `${helper} ${ending}`,
    'The present continuous uses am, is or are + a verb ending in -ing.', `<b>${helper} ${ending}</b> describes an action happening now.`));
  const perfect = [
    ['I','have','finished my homework'], ['She','has','lost her pencil'], ['We','have','cleaned the tables'], ['The dog','has','eaten its food'], ['They','have','seen the rainbow'],
    ['Mum','has','made a cake'], ['You','have','helped the new pupil'], ['The children','have','packed their bags'], ['Ravi','has','written a letter'], ['Our class','has','started a project'],
    ['The birds','have','built a nest'], ['My parents','have','visited the doctor'], ['The bus','has','arrived'], ['I','have','found my keys'], ['The teacher','has','checked our work'],
    ['We','have','learned a new poem'], ['The baby','has','fallen asleep'], ['The players','have','won the match'], ['Grandma','has','baked biscuits']
  ];
  perfect.forEach(([subject, helper, ending], i) => add(`g4eng-cover-perfect-${String(i+1).padStart(2,'0')}`, 'perfect',
    `Choose the present perfect: "${subject} ___."`, [`${helper} ${ending}`, `is ${ending}`, `will ${ending}`, ending], `${helper} ${ending}`,
    'The present perfect uses have or has with a past participle.', `<b>${helper} ${ending}</b> shows that the action is completed.`));
  const present = [
    ['Every morning, I ___ my teeth.','brush','brushes','brushed'], ['Each day, she ___ to school.','walks','walk','walked'], ['On Fridays, we ___ football.','play','plays','played'],
    ['My cat ___ all afternoon.','sleeps','sleep','slept'], ['The shops ___ at nine o\'clock every day.','open','opens','opened'], ['Ravi ___ the dishes every evening.','washes','wash','washed'],
    ['The sun ___ every morning.','rises','rise','rose'], ['My friends ___ reading stories.','enjoy','enjoys','enjoyed'], ['A bee ___ around the flowers.','buzzes','buzz','buzzed'],
    ['I ___ my bag to school every day.','carry','carries','carried'], ['The children ___ new words every day.','learn','learns','learned'], ['Mum ___ my lunch every day.','packs','pack','packed']
  ];
  present.forEach(([sentence, answer, wrong, past], i) => add(`g4eng-cover-present-${String(i+1).padStart(2,'0')}`, 'present_tense',
    `Choose the present-tense verb: "${sentence}"`, [answer, wrong, past, `will ${answer.endsWith('s') ? wrong : answer}`], answer,
    'These sentences describe habits or facts that happen regularly, so use the present tense.', `"${sentence.replace('___', `<b>${answer}</b>`)}" is correct in the present tense.`));
  const findVerb = [
    ['The sailor steered the boat safely.','steered'], ['Ayesha sings in the choir.','sings'], ['The rain fell all afternoon.','fell'], ['Our neighbours are painting their gate.','painting'],
    ['The baby laughed at the puppet.','laughed'], ['We will visit the aquarium.','visit'], ['The bees collect nectar.','collect'], ['The boys carried the boxes.','carried'],
    ['My uncle repairs bicycles.','repairs'], ['The children were cheering loudly.','cheering'], ['Mum wrote a shopping list.','wrote'], ['The plant needs sunlight.','needs'],
    ['The dancers moved gracefully.','moved'], ['I am learning Creole.','learning'], ['The train arrived late.','arrived']
  ];
  findVerb.forEach(([sentence, answer], i) => add(`g4eng-cover-verb-context-${String(i+1).padStart(2,'0')}`, 'in_context',
    `Read: "${sentence}" Which word is a verb?`, [answer, 'the', 'at', 'safely'], answer,
    'A verb shows an action or a state of being.', `<b>${answer}</b> is the action word, so it is a verb.`));
})();
