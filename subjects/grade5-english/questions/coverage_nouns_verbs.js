'use strict';
// Grade-appropriate variations built from the established Grade 5 English
// noun/article and verb/tense learning objectives.
(function () {
  const add=(id,c,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:e||`<b>${a}</b> is correct.`}));
  const rows=(p,c,s,data,o,h)=>data.forEach(([q,a,ro],i)=>add(`g5e-cov-${p}-${i}`,c,s,q,ro||o,a,h));
  rows('article','eng-nouns','articles',[
    ['Choose the correct article: "It took ___ hour to reach the beach."','an'],['Choose the correct article: "We saw ___ elephant at the zoo."','an'],['Choose the correct article: "Please close ___ door near the window."','the']
  ],['a','an','the'],'Listen to the first sound and decide whether the noun is specific.');
  rows('plural','eng-nouns','plurals',[
    ['What is the plural of "leaf"?','leaves'],['What is the plural of "child"?','children'],['What is the plural of "tomato"?','tomatoes'],['What is the plural of "knife"?','knives']
  ],['leaves','children','tomatoes','knives'],'Some plural nouns change their spelling.');
  rows('abstract','eng-nouns','abstract', [['Which word is an abstract noun?','courage']],['courage','bicycle','teacher','garden'],'An abstract noun names an idea, quality or feeling.');
  rows('determiner','eng-nouns','determiners',[
    ['Choose the determiner meaning a small number: "There are ___ biscuits left in the tin."','a few'],['Choose the determiner meaning a large amount in this negative sentence: "I do not have ___ money with me."','much'],['Choose the best determiner: "___ pupil must bring a notebook."','Every'],['Choose the determiner normally used to offer an unspecified amount: "Would you like ___ water?"','some']
  ],['a few','much','Every','some'],'Determiners tell us how many or how much.');
  rows('voice','eng-verbs','voice', [['Which sentence is in the passive voice?','The trophy was lifted by the captain.']],['The trophy was lifted by the captain.','The captain lifted the trophy.','The captain is lifting the trophy.','Lift the trophy, captain!'],'In passive voice, the subject receives the action.');
  rows('agreement','eng-verbs','agreement',[
    ['Choose the correct verb: "The basket of mangoes ___ on the table."','is'],['Choose the correct verb: "Neither of the boys ___ ready."','is'],['Choose the correct verb: "My friends ___ football after school."','play'],['Choose the correct verb: "The dog and its puppy ___ sleeping."','are']
  ],['is','are','play','plays'],'Match the verb to the true subject of the sentence.');
  rows('aux','eng-verbs','auxiliary', [['Which word is the auxiliary verb in "She has finished her work"?','has']],['has','finished','work','her'],'An auxiliary verb helps the main verb show tense.');
  rows('past','eng-verbs','past_tense', [['What is the past tense of "begin"?','began'],['Choose the correct past tense: "Yesterday, we ___ the museum."','visited']],['began','visited','begin','visit'],'Use a past-tense form for an action already completed.');
  rows('future','eng-verbs','future_tense', [['Choose the future tense: "Next week, I ___ my grandparents."','will visit',['will visit','visited','visits','was visiting']],['Which sentence is about the future?','They are going to plant a tree tomorrow.',['They are going to plant a tree tomorrow.','They planted a tree yesterday.','They are planting a tree right now.','They plant trees every weekend.']],['Choose the correct verb: "The class ___ a play on Friday."','will perform',['will perform','performed','performs','was performing']]],['will visit','will perform','visited'],'Look for "will", "going to", or a future time clue.');
  rows('cont','eng-verbs','continuous',[
    ['Choose the correct form: "Listen! The baby ___."','is crying',['is crying','cried','cries','was crying']],['Choose the correct form: "At 6 pm yesterday, we ___ dinner."','were eating',['were eating','was eating','are eating','eats']],['Which sentence is in the present continuous?','The children are building a sandcastle.',['The children are building a sandcastle.','The children built a sandcastle.','The children build sandcastles every day.','The children will build a sandcastle.']],['Choose the correct form: "I ___ for the bus when it started to rain."','was waiting',['was waiting','were waiting','am waiting','waits']]
  ],['is crying','were eating','was waiting'],'Continuous tenses use a form of be + a verb ending in -ing.');
  rows('verb-context','eng-verbs','in_context',[
    ['Which word is the verb in "The noisy parrot squawked loudly"?','squawked',['squawked','noisy','parrot','loudly']],['Which words form the verb phrase in "They have been practising daily"?','have been practising',['have been practising','They have been','been practising daily','practising daily']],['Which word is the main verb in "Mum will bake a cake"?','bake',['bake','will','Mum','cake']],['Which word is the verb in "Our teacher seems pleased"?','seems',['seems','teacher','pleased','Our']]
  ],['squawked','have been practising','bake','seems'],'The verb tells the action or state.');
})();
