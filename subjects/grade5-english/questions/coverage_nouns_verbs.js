'use strict';
// Grade-appropriate variations built from the established Grade 5 English
// noun/article and verb/tense learning objectives.
(function () {
// Real explanations, keyed by id. Added because every question in this file
// used to say only "<b>X</b> is correct.", which teaches nothing.
const G5E_EXPL = {
  'g5e-cov-article-0': "<i>Hour</i> begins with a silent h, so the first <i>sound</i> is a vowel. Use <b>an</b> — the sound decides, not the letter.",
  'g5e-cov-article-1': "<i>Elephant</i> begins with a vowel sound, so it takes <b>an</b>.",
  'g5e-cov-article-2': "The sentence points to one particular door — the one near the window — so it needs <b>the</b>.",
  'g5e-cov-plural-0': "Many nouns ending in <i>-f</i> change to <i>-ves</i>: leaf becomes <b>leaves</b>.",
  'g5e-cov-plural-1': "<b>children</b> is an irregular plural: it does not add -s, and simply has to be learnt.",
  'g5e-cov-plural-2': "<i>Tomato</i> has a consonant before the final o, so the plural takes <b>-es</b>.",
  'g5e-cov-plural-3': "<i>-fe</i> changes to <i>-ves</i>: knife becomes <b>knives</b>.",
  'g5e-cov-abstract-0': "<b>courage</b> is an idea you cannot see, hear or touch, and that is what makes a noun abstract.",
  'g5e-cov-determiner-0': "<b>a few</b> means a small number of things you can count. <i>A little</i> would be used for something you cannot count.",
  'g5e-cov-determiner-1': "<i>Money</i> cannot be counted one by one, and the sentence is negative, so <b>much</b> is the word that fits.",
  'g5e-cov-determiner-2': "<b>Every</b> takes a singular noun and means all of them, one by one — which matches <i>pupil must bring</i>.",
  'g5e-cov-determiner-3': "An offer takes <b>some</b> rather than <i>any</i>: \"Would you like some water?\"",
  'g5e-cov-agreement-0': "The subject is <i>the basket</i>, not <i>mangoes</i>. One basket, so the verb is <b>is</b>.",
  'g5e-cov-agreement-1': "<i>Neither</i> is singular — it means not one and not the other — so the verb is <b>is</b>.",
  'g5e-cov-agreement-2': "<i>My friends</i> is plural, so the verb drops its -s: <b>play</b>.",
  'g5e-cov-agreement-3': "<i>The dog and its puppy</i> is two of them, so the plural verb <b>are</b> is needed.",
  'g5e-cov-aux-0': "<b>has</b> is the helping (auxiliary) verb and <i>finished</i> is the main verb. Together they make the present perfect.",
  'g5e-cov-past-0': "<i>Begin</i> is irregular, so it becomes <b>began</b> — never \"beginned\".",
  'g5e-cov-past-1': "<i>Yesterday</i> puts the sentence in the past, and <i>visit</i> is regular, so add -ed: <b>visited</b>.",
  'g5e-cov-future-0': "<i>Next week</i> points to the future, so use <b>will visit</b>.",
  'g5e-cov-future-2': "<i>On Friday</i> is still to come, so the future form <b>will perform</b> is needed.",
  'g5e-cov-cont-0': "<i>Listen!</i> tells us it is happening at this moment, which needs the present continuous <b>is crying</b>.",
  'g5e-cov-cont-1': "It names a moment in the past — 6 pm yesterday — when the action was already going on, so use the past continuous <b>were eating</b>.",
  'g5e-cov-cont-3': "The waiting was already going on when the rain started, so the longer action takes the past continuous <b>was waiting</b>.",
  'g5e-cov-verb-context-0': "<b>squawked</b> is what the parrot did, so it is the verb. <i>noisy</i> describes it and <i>loudly</i> says how.",
  'g5e-cov-verb-context-1': "All three words work as one: <i>have</i> and <i>been</i> are helping verbs and <i>practising</i> is the main verb, so the verb phrase is <b>have been practising</b>.",
  'g5e-cov-verb-context-2': "<i>will</i> is the helping verb that puts it in the future. The action itself — the main verb — is <b>bake</b>.",
  'g5e-cov-verb-context-3': "<b>seems</b> is the verb even though it is not an action: it links the teacher to the word describing her.",
};
  const add=(id,c,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5E_EXPL[id]||e||`<b>${a}</b> is correct.`}));
  const rows=(p,c,s,data,o,h)=>data.forEach(([q,a,ro],i)=>add(`g5e-cov-${p}-${i}`,c,s,q,ro||o,a,h));

  // articles — closed set of 3 valid articles, already correct
  rows('article','eng-nouns','articles',[
    ['Choose the correct article: "It took ___ hour to reach the beach."','an'],
    ['Choose the correct article: "We saw ___ elephant at the zoo."','an'],
    ['Choose the correct article: "Please close ___ door near the window."','the']
  ],['a','an','the'],'Listen to the first sound and decide whether the noun is specific.');

  // plurals — broken shared opts replaced with per-question options (correct + 3 plausible misspellings)
  add('g5e-cov-plural-0','eng-nouns','plurals','What is the plural of "leaf"?',
    ['leaves','leafs','leafes','leefs'],'leaves','Some plural nouns change their spelling.');
  add('g5e-cov-plural-1','eng-nouns','plurals','What is the plural of "child"?',
    ['children','childs','childens','childrens'],'children','Some plural nouns change their spelling.');
  add('g5e-cov-plural-2','eng-nouns','plurals','What is the plural of "tomato"?',
    ['tomatoes','tomatos','tomates','tomatoies'],'tomatoes','Some plural nouns change their spelling.');
  add('g5e-cov-plural-3','eng-nouns','plurals','What is the plural of "knife"?',
    ['knives','knifes','knieves','knifves'],'knives','Some plural nouns change their spelling.');

  // abstract noun — one question with its own correct distractors, kept as rows()
  rows('abstract','eng-nouns','abstract', [
    ['Which word is an abstract noun?','courage']
  ],['courage','bicycle','teacher','garden'],'An abstract noun names an idea, quality or feeling.');

  // determiners — broken shared opts replaced with per-question options
  add('g5e-cov-determiner-0','eng-nouns','determiners',
    'Choose the determiner meaning a small number: "There are ___ biscuits left in the tin."',
    ['a few','a little','much','every'],'a few',
    'The noun is "biscuits", which can be counted. Which quantity word goes with a countable noun in small amounts?');
  add('g5e-cov-determiner-1','eng-nouns','determiners',
    'Choose the determiner meaning a large amount in this negative sentence: "I do not have ___ money with me."',
    ['much','many','a few','some'],'much',
    'The noun is "money", which cannot be counted one by one. Which quantity word goes with a noun like that?');
  add('g5e-cov-determiner-2','eng-nouns','determiners',
    'Choose the best determiner: "___ pupil must bring a notebook."',
    ['Every','Some','Many','Both'],'Every',
    'Which determiner takes a singular noun and means each one without exception?');
  add('g5e-cov-determiner-3','eng-nouns','determiners',
    'Choose the determiner normally used to offer an unspecified amount: "Would you like ___ water?"',
    ['some','a few','each','every'],'some',
    'When offering something, which determiner is more natural than "any"?');

  // passive voice — one question with its own correct distractors, kept as rows()
  rows('voice','eng-verbs','voice', [
    ['Which sentence is in the passive voice?','The trophy was lifted by the captain.']
  ],['The trophy was lifted by the captain.','The captain lifted the trophy.','The captain is lifting the trophy.','Lift the trophy, captain!'],'In passive voice, the subject receives the action.');

  // subject-verb agreement — shared opts are genuine grammar forms cycling across answers, correct as-is
  rows('agreement','eng-verbs','agreement',[
    ['Choose the correct verb: "The basket of mangoes ___ on the table."','is'],
    ['Choose the correct verb: "Neither of the boys ___ ready."','is'],
    ['Choose the correct verb: "My friends ___ football after school."','play'],
    ['Choose the correct verb: "The dog and its puppy ___ sleeping."','are']
  ],['is','are','play','plays'],'Match the verb to the true subject of the sentence.');

  // auxiliary verb — one question with its own correct distractors, kept as rows()
  rows('aux','eng-verbs','auxiliary', [
    ['Which word is the auxiliary verb in "She has finished her work"?','has']
  ],['has','finished','work','her'],'An auxiliary verb helps the main verb show tense.');

  // past tense — shared opts include base forms as plausible wrong answers, correct as-is
  rows('past','eng-verbs','past_tense', [
    ['What is the past tense of "begin"?','began'],
    ['Choose the correct past tense: "Yesterday, we ___ the museum."','visited']
  ],['began','visited','begin','visit'],'Use a past-tense form for an action already completed.');

  // future tense — all rows have per-row opts (kept)
  rows('future','eng-verbs','future_tense', [
    ['Choose the future tense: "Next week, I ___ my grandparents."','will visit',
      ['will visit','visited','visits','was visiting']],
    ['Which sentence is about the future?','They are going to plant a tree tomorrow.',
      ['They are going to plant a tree tomorrow.','They planted a tree yesterday.','They are planting a tree right now.','They plant trees every weekend.']],
    ['Choose the correct verb: "The class ___ a play on Friday."','will perform',
      ['will perform','performed','performs','was performing']]
  ],['will visit','will perform','visited'],'Look for "will", "going to", or a future time clue.');

  // continuous tenses — all rows have per-row opts (kept)
  rows('cont','eng-verbs','continuous',[
    ['Choose the correct form: "Listen! The baby ___."','is crying',
      ['is crying','cried','cries','was crying']],
    ['Choose the correct form: "At 6 pm yesterday, we ___ dinner."','were eating',
      ['were eating','was eating','are eating','eats']],
    ['Which sentence is in the present continuous?','The children are building a sandcastle.',
      ['The children are building a sandcastle.','The children built a sandcastle.','The children build sandcastles every day.','The children will build a sandcastle.']],
    ['Choose the correct form: "I ___ for the bus when it started to rain."','was waiting',
      ['was waiting','were waiting','am waiting','waits']]
  ],['is crying','were eating','was waiting'],'Continuous tenses use a form of be + a verb ending in -ing.');

  // verbs in context — all rows have per-row opts (kept)
  rows('verb-context','eng-verbs','in_context',[
    ['Which word is the verb in "The noisy parrot squawked loudly"?','squawked',
      ['squawked','noisy','parrot','loudly']],
    ['Which words form the verb phrase in "They have been practising daily"?','have been practising',
      ['have been practising','They have been','been practising daily','practising daily']],
    ['Which word is the main verb in "Mum will bake a cake"?','bake',
      ['bake','will','Mum','cake']],
    ['Which word is the verb in "Our teacher seems pleased"?','seems',
      ['seems','teacher','pleased','Our']]
  ],['squawked','have been practising','bake','seems'],'The verb tells the action or state.');
})();
