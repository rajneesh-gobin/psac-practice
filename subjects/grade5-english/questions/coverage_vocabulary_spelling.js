'use strict';
(function(){const add=(id,c,s,q,o,a,h,e)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5E_EXPL[id]||e||`<b>${a}</b> is correct.`}));const rows=(p,c,s,d,o,h)=>d.forEach(([q,a],i)=>add(`g5e-cov-${p}-${i}`,c,s,q,o,a,h));
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
rows('syn','eng-vocabulary','synonyms',[['Which word is a synonym for "brave"?','courageous'],['Which word is a synonym for "silent"?','quiet'],['Which word is a synonym for "generous"?','kind'],['Which word is a synonym for "examine"?','inspect'],['Which word is a synonym for "fragile"?','delicate']],['courageous','quiet','kind','inspect','delicate','careless'],'A synonym has a similar meaning.');
rows('ant','eng-vocabulary','antonyms',[['Which word is an antonym of "narrow"?','wide'],['Which word is an antonym of "generous"?','selfish'],['Which word is an antonym of "arrive"?','depart'],['Which word is an antonym of "ancient"?','modern'],['Which word is an antonym of "victory"?','defeat']],['wide','selfish','depart','modern','defeat','success'],'An antonym has the opposite meaning.');
rows('context','eng-vocabulary','context_clues',[['"The path was slippery after the rain, so we walked carefully." What does slippery mean?','easy to slide on'],['"The exhausted runner rested under a tree." What does exhausted mean?','very tired'],['"The tiny seedling pushed through the soil." What is a seedling?','a young plant'],['"The crowd cheered when the team won." What does cheered mean?','shouted happily'],['"The cautious swimmer stayed near the shore." What does cautious mean?','careful to avoid danger'],['"The ancient fort stood above the harbour." What does ancient mean?','very old']],['easy to slide on','very tired','a young plant','shouted happily','careful to avoid danger','very old'],'Use the surrounding words as clues.');
rows('rule','eng-spelling','rules',[['Which spelling rule changes "carry" to "carried"?','change y to i before adding -ed'],['Which word correctly doubles its last letter before -ing?','swimming'],['Which word keeps its final e before adding -ly?','politely'],['Which word follows the "i before e except after c" rule?','receive'],['Which word correctly changes -y to -ies in the plural?','families'],['Which word correctly drops e before adding -ing?','making']],['change y to i before adding -ed','swimming','politely','receive','families','making'],'Look at the ending of the base word before adding a suffix.');
rows('spellplural','eng-spelling','plurals',[['What is the correct plural of "wolf"?','wolves'],['What is the correct plural of "tomato"?','tomatoes'],['What is the correct plural of "mouse"?','mice'],['What is the correct plural of "city"?','cities'],['What is the correct plural of "sheep"?','sheep']],['wolves','tomatoes','mice','cities','sheep'],'Some plurals add -s or -es; others change spelling.');
})();
