'use strict';
(function(){
const add=(id,c,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5E_EXPL[id]||e||`<b>${a}</b> is correct.`,learnMore:G5E_LEARN[id]||''}));
// Real explanations, keyed by id. Added because every question in this file
// used to say only "<b>X</b> is correct.", which teaches nothing.
const G5E_EXPL = {
  'g5e-cov-syn-0': "A synonym means nearly the same thing, and <b>courageous</b> means brave.",
  'g5e-cov-syn-1': "<b>quiet</b> means much the same as silent: making little or no sound.",
  'g5e-cov-syn-2': "<b>kind</b> is the closest to generous — both describe someone who gives willingly.",
  'g5e-cov-syn-3': "To examine something is to look at it closely, which is exactly what <b>inspect</b> means.",
  'g5e-cov-syn-4': "<b>delicate</b> means easily broken or damaged, the same idea as fragile.",
  'g5e-cov-ant-0': "An antonym is an opposite, and the opposite of narrow is <b>wide</b>.",
  'g5e-cov-ant-1': "Generous means willing to give; <b>selfish</b> means keeping everything for yourself.",
  'g5e-cov-ant-2': "To arrive is to come to a place; <b>depart</b> is to leave it.",
  'g5e-cov-ant-3': "Ancient means very old, so its opposite is <b>modern</b>.",
  'g5e-cov-ant-4': "A victory is a win, so the opposite is <b>defeat</b>.",
  'g5e-cov-context-0': "The clues are <i>after the rain</i> and <i>walked carefully</i>: the path was <b>easy to slide on</b>.",
  'g5e-cov-context-1': "The runner <i>rested</i>, which tells you that exhausted means <b>very tired</b>.",
  'g5e-cov-context-2': "It <i>pushed through the soil</i>, so a seedling is <b>a young plant</b> just beginning to grow.",
  'g5e-cov-context-3': "The crowd did this <i>when the team won</i>, so cheered means <b>shouted happily</b>.",
  'g5e-cov-context-4': "The swimmer <i>stayed near the shore</i>, so cautious means <b>careful to avoid danger</b>.",
  'g5e-cov-context-5': "A fort that has stood above the harbour for a long time is <b>very old</b>.",
  'g5e-cov-rule-0': "When a word ends in a consonant plus y, the y becomes i before -ed: carry → <b>carried</b>.",
  'g5e-cov-rule-1': "<i>Swim</i> ends in one short vowel and one consonant, so the m doubles before -ing: <b>swimming</b>.",
  'g5e-cov-rule-2': "<i>-ly</i> is added straight on to <i>polite</i> with no change: <b>politely</b>. The silent e is only dropped before an ending that starts with a vowel.",
  'g5e-cov-rule-3': "The rule is i before e except after c, and this e follows a c: <b>receive</b>.",
  'g5e-cov-rule-4': "<i>Family</i> ends in a consonant plus y, so the y becomes ies: <b>families</b>.",
  'g5e-cov-rule-5': "<i>Make</i> ends in a silent e, which is dropped before the vowel ending -ing: <b>making</b>.",
  'g5e-cov-spellplural-0': "<i>-f</i> becomes <i>-ves</i>: wolf → <b>wolves</b>.",
  'g5e-cov-spellplural-1': "A consonant before the final o means the plural takes <b>-es</b>: tomatoes.",
  'g5e-cov-spellplural-2': "<b>mice</b> is an irregular plural — the word changes inside instead of adding -s.",
  'g5e-cov-spellplural-3': "<i>City</i> ends in a consonant plus y, so the y becomes ies: <b>cities</b>.",
  'g5e-cov-spellplural-4': "<b>sheep</b> does not change in the plural: one sheep, ten sheep.",
};
const G5E_LEARN = {
  'g5e-cov-syn-0': '<b>Synonyms</b> are words with similar meanings. Using synonyms makes writing more varied and interesting. Courage/brave/courageous all describe the same quality, but they have slightly different strengths. "Courageous" is more formal than "brave".',
  'g5e-cov-ant-0': '<b>Antonyms</b> are words with opposite meanings. Learning antonyms in pairs helps build vocabulary faster: narrow/wide, hot/cold, ancient/modern, arrive/depart. Writers use antonyms to create contrast and highlight differences.',
  'g5e-cov-context-0': '<b>Context clues</b> are the words around an unfamiliar word that help you work out its meaning. Look for: definitions ("X means..."), examples ("such as..."), contrast ("but", "however"), and cause/effect. "Slippery after the rain" — rain makes paths slippery.',
  'g5e-cov-rule-0': 'Key spelling rules: (1) Words ending in consonant + y → change y to i before -ed/-es: carry → carried, family → families. (2) Silent e → drop e before vowel suffixes (-ing, -ed, -er): make → making. (3) Short vowel + consonant → double consonant before vowel suffix: swim → swimming.',
  'g5e-cov-rule-3': 'The <b>i before e</b> rule: write "ie" in most words (believe, achieve, field), but write "ei" after the letter c (receive, ceiling, deceit). Exceptions that must be memorised: weird, seize, either, neither, height, weight.',
  'g5e-cov-spellplural-0': 'Plural spelling patterns: (1) -f/-fe → -ves: wolf → wolves, knife → knives. (2) Consonant + o → -oes: tomato → tomatoes. (3) Consonant + y → -ies: city → cities. (4) Irregular: mouse → mice, tooth → teeth. (5) No change: sheep → sheep, deer → deer.',
};

// synonyms — each gets its own 4 options (correct + 3 wrong adjectives/verbs)
add('g5e-cov-syn-0','eng-vocabulary','synonyms','Which word is a synonym for "brave"?',
  ['courageous','timid','clumsy','humble'],'courageous','A synonym has a similar meaning.');
add('g5e-cov-syn-1','eng-vocabulary','synonyms','Which word is a synonym for "silent"?',
  ['quiet','noisy','cheerful','strange'],'quiet','A synonym has a similar meaning.');
add('g5e-cov-syn-2','eng-vocabulary','synonyms','Which word is a synonym for "generous"?',
  ['kind','greedy','serious','careless'],'kind','A synonym has a similar meaning.');
add('g5e-cov-syn-3','eng-vocabulary','synonyms','Which word is a synonym for "examine"?',
  ['inspect','ignore','repair','collect'],'inspect','A synonym has a similar meaning.');
add('g5e-cov-syn-4','eng-vocabulary','synonyms','Which word is a synonym for "fragile"?',
  ['delicate','sturdy','ancient','curious'],'delicate','A synonym has a similar meaning.');

// antonyms — each gets its own 4 options (correct opposite + 3 wrong words)
add('g5e-cov-ant-0','eng-vocabulary','antonyms','Which word is an antonym of "narrow"?',
  ['wide','thin','tall','deep'],'wide','An antonym has the opposite meaning.');
add('g5e-cov-ant-1','eng-vocabulary','antonyms','Which word is an antonym of "generous"?',
  ['selfish','cheerful','honest','polite'],'selfish','An antonym has the opposite meaning.');
add('g5e-cov-ant-2','eng-vocabulary','antonyms','Which word is an antonym of "arrive"?',
  ['depart','stay','enter','welcome'],'depart','An antonym has the opposite meaning.');
add('g5e-cov-ant-3','eng-vocabulary','antonyms','Which word is an antonym of "ancient"?',
  ['modern','distant','grand','common'],'modern','An antonym has the opposite meaning.');
add('g5e-cov-ant-4','eng-vocabulary','antonyms','Which word is an antonym of "victory"?',
  ['defeat','success','prize','glory'],'defeat','An antonym has the opposite meaning.');

// context clues — each gets its own 4 options explaining the word differently
add('g5e-cov-context-0','eng-vocabulary','context_clues','"The path was slippery after the rain, so we walked carefully." What does slippery mean?',
  ['easy to slide on','very narrow','covered in mud','extremely cold'],'easy to slide on','Use the surrounding words as clues.');
add('g5e-cov-context-1','eng-vocabulary','context_clues','"The exhausted runner rested under a tree." What does exhausted mean?',
  ['very tired','very happy','extremely fast','badly injured'],'very tired','Use the surrounding words as clues.');
add('g5e-cov-context-2','eng-vocabulary','context_clues','"The tiny seedling pushed through the soil." What is a seedling?',
  ['a young plant','a type of soil','a garden tool','a small animal'],'a young plant','Use the surrounding words as clues.');
add('g5e-cov-context-3','eng-vocabulary','context_clues','"The crowd cheered when the team won." What does cheered mean?',
  ['shouted happily','clapped slowly','sat down quietly','left the stadium'],'shouted happily','Use the surrounding words as clues.');
add('g5e-cov-context-4','eng-vocabulary','context_clues','"The cautious swimmer stayed near the shore." What does cautious mean?',
  ['careful to avoid danger','very skilled','extremely fast','tired and cold'],'careful to avoid danger','Use the surrounding words as clues.');
add('g5e-cov-context-5','eng-vocabulary','context_clues','"The ancient fort stood above the harbour." What does ancient mean?',
  ['very old','very tall','brightly painted','recently repaired'],'very old','Use the surrounding words as clues.');

// spelling rules — each gets its own 4 options (correct spelling + 3 plausible wrong forms)
add('g5e-cov-rule-0','eng-spelling','rules','Which spelling rule changes "carry" to "carried"?',
  ['change y to i before adding -ed','double the last consonant before -ed','drop the silent e before -ed','add -ed to the base word as it is'],'change y to i before adding -ed','Look at the ending of the base word before adding a suffix.');
add('g5e-cov-rule-1','eng-spelling','rules','Which word correctly doubles its last letter before -ing?',
  ['swimming','runing','jumpping','eatting'],'swimming','Look at the ending of the base word before adding a suffix.');
add('g5e-cov-rule-2','eng-spelling','rules','Which word keeps its final e before adding -ly?',
  ['politely','nicly','bravly','safty'],'politely','Look at the ending of the base word before adding a suffix.');
add('g5e-cov-rule-3','eng-spelling','rules','Which word follows the "i before e except after c" rule?',
  ['receive','beleive','freind','wierd'],'receive','Look at the ending of the base word before adding a suffix.');
add('g5e-cov-rule-4','eng-spelling','rules','Which word correctly changes -y to -ies in the plural?',
  ['families','storyes','cityes','babyes'],'families','Look at the ending of the base word before adding a suffix.');
add('g5e-cov-rule-5','eng-spelling','rules','Which word correctly drops e before adding -ing?',
  ['making','makeing','rideing','loveing'],'making','Look at the ending of the base word before adding a suffix.');

// spelling plurals — each gets its own 4 options (correct plural + 3 plausible wrong forms)
add('g5e-cov-spellplural-0','eng-spelling','plurals','What is the correct plural of "wolf"?',
  ['wolves','wolfs','wolfes','wolvs'],'wolves','Some plurals add -s or -es; others change spelling.');
add('g5e-cov-spellplural-1','eng-spelling','plurals','What is the correct plural of "tomato"?',
  ['tomatoes','tomatos','tomates','tomatoies'],'tomatoes','Some plurals add -s or -es; others change spelling.');
add('g5e-cov-spellplural-2','eng-spelling','plurals','What is the correct plural of "mouse"?',
  ['mice','mouses','mices','mousse'],'mice','Some plurals add -s or -es; others change spelling.');
add('g5e-cov-spellplural-3','eng-spelling','plurals','What is the correct plural of "city"?',
  ['cities','citys','cityes','cityies'],'cities','Some plurals add -s or -es; others change spelling.');
add('g5e-cov-spellplural-4','eng-spelling','plurals','What is the correct plural of "sheep"?',
  ['sheep','sheeps','sheepes','sheepies'],'sheep','Some plurals add -s or -es; others change spelling.');
})();
