'use strict';
(function () {
  const add=(id,c,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
  const rows=(p,c,s,data,options,hint)=>data.forEach(([q,a],i)=>add(`g5hg-cov-${p}-${i}`,c,s,q,options,a,hint));
  rows('dutch-discovery','discovery','dutch',[
    ['Which European nation gave Mauritius its present name?','the Dutch, from Holland'],['Mauritius was named after…','Prince Maurits of Nassau'],
    ['The Dutch first claimed Mauritius in…','1598, in the 16th century'],['The first Dutch settlement began in…','1638, in the 17th century'],
    ['Why did Dutch sailors use Mauritius as a stop?', 'to get fresh food and water'],['Which bird was hunted after Dutch settlement?', 'the Dodo, a flightless bird'],
    ['Which tree did the Dutch cut for valuable wood?', 'ebony, a valuable wood'],['Why did the Dutch settlement face difficulties?', 'cyclones, droughts and shortages'],
    ['The Dutch left Mauritius for the last time in…','1710, in the 18th century'],['Which animal introduced by people harmed Dodo eggs?', 'rats brought by the ships'],
    ['Why is the Dutch period important?', 'the first European settlement'],['The Dutch came mainly from…','the Netherlands, in Europe'],
    ['What happened to much native forest during early settlement?', 'some of it was cut down'],['What can we learn from the Dutch period?', 'human actions can affect nature'],
    ['Which is a source about Dutch settlement?', 'an old map or written record'],['Before Dutch settlement, Mauritius had many…','endemic plants and animals'],
    ['What does "settlement" mean?', 'a place where people live'],['Why did ships need an island stop on long voyages?', 'to repair and take supplies'],
    ['The Dutch period came before which settlement?', 'the French settlement']
  ],['the Dutch, from Holland','Prince Maurits of Nassau','1598, in the 16th century','1638, in the 17th century','to get fresh food and water','the Dodo, a flightless bird','ebony, a valuable wood','cyclones, droughts and shortages','1710, in the 18th century','rats brought by the ships','the first European settlement','the Netherlands, in Europe','some of it was cut down','human actions can affect nature','an old map or written record','endemic plants and animals','a place where people live','to repair and take supplies','the French settlement'],'Think about the first settlers, their reasons for stopping, and their impact.');
  rows('port-history','port-louis','history',[
    ['Who developed Port Louis as a major harbour?', 'Mahé de Labourdonnais'],['Port Louis became the capital during the…','French period, 1715-1810'],
    ['Why was Port Louis a useful place for a harbour?', 'it has a sheltered bay'],['A harbour allows ships to…','load, unload and shelter'],
    ['What was Mauritius called during French rule?', 'Île de France, or Isle of France'],['Why did the French develop Port Louis?', 'for trade and naval ships'],
    ['Which mountain overlooks Port Louis?', 'Le Pouce, in the Moka range'],['What is a capital city?', 'the main city of government'],
    ['How did a harbour help the island\'s trade?', 'goods arrive and leave by ship'],['A port is important because it connects Mauritius with…','other countries overseas'],
    ['Which was built to protect Port Louis?', 'Fort Adelaide (the Citadel)'],['Why are old Port Louis buildings important?', 'they tell us about the past'],
    ['Government House is linked with…','government and administration'],['What can a museum help visitors understand?', 'our history and heritage'],
    ['Port Louis grew because of…','shipping, trade and government'],['A historical building should be cared for because…','it is part of our heritage']
  ],['Mahé de Labourdonnais','French period, 1715-1810','it has a sheltered bay','load, unload and shelter','Île de France, or Isle of France','for trade and naval ships','Le Pouce, in the Moka range','the main city of government','goods arrive and leave by ship','other countries overseas','Fort Adelaide (the Citadel)','they tell us about the past','government and administration','our history and heritage','shipping, trade and government','it is part of our heritage'],'Use the clues about the harbour, capital and old buildings.');
  rows('port-today','port-louis','today',[
    ['Port Louis is the…','capital city of Mauritius'],['Today Port Louis is important for…','business, government and trade'],
    ['Which activity is common in Port Louis?', 'buying and selling goods'],['The harbour still connects Mauritius to…','other countries overseas'],
    ['Why do people visit Port Louis?', 'for work, shopping and services'],['The Central Market is a place where people…','buy and sell many products'],
    ['What helps workers travel to Port Louis?', 'roads and public transport'],['Why can traffic be busy in Port Louis?', 'many travel there for work'],
    ['Port Louis has both modern offices and…','historic old buildings'],['Which service is likely found in a capital?', 'offices of the government'],
    ['Why should visitors keep the city clean?', 'to protect a shared public place'],['A commercial centre is a place for…','business, trade and shops'],
    ['What can a port receive from abroad?', 'ships that carry goods'],['Which place helps people learn about Mauritian history?', 'a museum of local history'],
    ['Port Louis is located on the…','north-west coast of Mauritius'],['Why is public transport useful in a city?', 'it moves many people efficiently'],
    ['What is one respectful way to visit heritage sites?', 'follow the rules and do no damage'],['A city can grow when it has…','jobs and useful services'],
    ['Port Louis is a meeting place for people from…','many parts of Mauritius']
  ],['capital city of Mauritius','business, government and trade','buying and selling goods','other countries overseas','for work, shopping and services','buy and sell many products','roads and public transport','many travel there for work','historic old buildings','offices of the government','to protect a shared public place','business, trade and shops','ships that carry goods','a museum of local history','north-west coast of Mauritius','it moves many people efficiently','follow the rules and do no damage','jobs and useful services','many parts of Mauritius'],'Think about how a capital city works today.');
})();
