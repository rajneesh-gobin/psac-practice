'use strict';
(function(){const add=(id,c,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5E_EXPL[id]||`<b>${a}</b> is correct.`}));const rows=(p,c,s,d,o,h)=>d.forEach(([q,a,ro],i)=>add(`g5e-cov-${p}-${i}`,c,s,q,ro||o,a,h));
// Real explanations, keyed by id. Added because every question in this file
// used to say only "<b>X</b> is correct.", which teaches nothing.
const G5E_EXPL = {
  'g5e-cov-order-0': "English puts size before colour, so it is <b>a small blue bag</b> — never \"a blue small bag\".",
  'g5e-cov-order-1': "The number comes first, then the opinion word (<i>delicious</i>), then the plain fact about ripeness: <b>three delicious ripe mangoes</b>.",
  'g5e-cov-adj-context-0': "<b>enormous</b> describes the waves, so it is the adjective. <i>waves</i> is the noun and <i>crashed</i> is the verb.",
  'g5e-cov-adj-context-1': "<b>cheerful</b> tells us what the crowd was like, so it is the adjective. <i>crowd</i> is the noun.",
  'g5e-cov-adj-context-2': "<b>narrow</b> describes the bridge, so it is the adjective. <i>bridge</i> is the noun and <i>crossed</i> is the verb.",
  'g5e-cov-type-0': "It tells someone to do something, so it is a <b>command</b>. <i>Please</i> makes it polite, but it is still an instruction.",
  'g5e-cov-type-1': "It shows strong feeling and ends with an exclamation mark, so it is an <b>exclamation</b>.",
  'g5e-cov-speech-0': "A comma comes before the speech, the spoken words sit inside the inverted commas, and the full stop goes <i>inside</i> them too.",
};
rows('order','eng-adjectives','order',[['Which phrase describes a bag using the natural adjective order?','a small blue bag'],['Which phrase describes mangoes with the opinion adjective before the adjective describing ripeness?','three delicious ripe mangoes']],['a small blue bag','a blue small bag','three delicious ripe mangoes','three ripe delicious mangoes'],'Opinion adjectives normally come before physical descriptions; size normally comes before colour.');
rows('adj-context','eng-adjectives','in_context',[['Which word is the adjective in "The enormous waves crashed on the shore"?','enormous',['enormous','waves','crashed','shore']],['Which word is the adjective in "A cheerful crowd waited outside"?','cheerful',['cheerful','crowd','waited','outside']],['Which word is the adjective in "We crossed a narrow bridge"?','narrow',['narrow','crossed','bridge','We']]],['enormous','cheerful','narrow','crossed'],'An adjective describes a noun.');
rows('type','eng-sentences','types',[['What type of sentence is "Please place your bag under the desk."?','command'],['What type of sentence is "What an amazing view!"?','exclamation']],['command','exclamation','question','statement'],'Look at the sentence\'s purpose and punctuation.');
rows('speech','eng-sentences','direct_speech',[['Which sentence uses direct speech punctuation correctly?','Maya said, "I have finished my project."']],['Maya said, "I have finished my project."','Maya said I have finished my project.','"Maya said, I have finished my project."','Maya said, I have finished my project.'],'Direct speech uses inverted commas around the exact words spoken.');
rows('sentence-context','eng-sentences','in_context',[['Which is a complete sentence?','The rain stopped after lunch.'],['Which sentence fragment starts with a conjunction giving a reason?','Because the bus was late.']],['The rain stopped after lunch.','Because the bus was late.','Under the tall tree.','Running quickly to school.'],'A complete sentence expresses a complete thought. A clause starting with "because" needs a main clause to complete its meaning.');})();
