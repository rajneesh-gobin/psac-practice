'use strict';
(function () {
  const add=(id,c,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
  const rows=(p,c,s,data,options,hint)=>data.forEach(([q,a],i)=>add(`g5hg-cov-${p}-${i}`,c,s,q,options,a,hint));
  rows('dutch-discovery','discovery','dutch',[
    ['Which European nation gave Mauritius its present name?','the Dutch'],['Mauritius was named after…','Prince Maurits of Nassau'],
    ['The Dutch first claimed Mauritius in…','1598'],['The first Dutch settlement began in…','1638'],
    ['Why did Dutch sailors use Mauritius as a stop?', 'to get fresh food and water'],['Which bird was hunted after Dutch settlement?', 'the Dodo'],
    ['Which tree did the Dutch cut for valuable wood?', 'ebony'],['Why did the Dutch settlement face difficulties?', 'cyclones, droughts and shortages'],
    ['The Dutch left Mauritius for the last time in…','1710'],['Which animal introduced by people harmed Dodo eggs?', 'rats'],
    ['Why is the Dutch period important?', 'it was the first permanent European settlement'],['The Dutch came mainly from…','the Netherlands'],
    ['What happened to much native forest during early settlement?', 'some was cut down'],['What can we learn from the Dutch period?', 'human actions can affect nature'],
    ['Which is a source about Dutch settlement?', 'an old map or written record'],['Before Dutch settlement, Mauritius had many…','endemic plants and animals'],
    ['What does “settlement” mean?', 'a place where people begin to live'],['Why did ships need an island stop on long voyages?', 'to repair and resupply'],
    ['The Dutch period came before which settlement?', 'the French settlement']
  ],['the Dutch','Prince Maurits of Nassau','1598','1638','to get fresh food and water','the Dodo','ebony','cyclones, droughts and shortages','1710','rats','it was the first permanent European settlement','the Netherlands','some was cut down','human actions can affect nature','an old map or written record','endemic plants and animals','a place where people begin to live','to repair and resupply','the French settlement'],'Think about the first settlers, their reasons for stopping, and their impact.');
  rows('port-history','port-louis','history',[
    ['Who developed Port Louis as a major harbour?', 'Mahé de Labourdonnais'],['Port Louis became the capital during the…','French period'],
    ['Why was Port Louis a useful place for a harbour?', 'it has a sheltered bay'],['A harbour allows ships to…','load, unload and shelter'],
    ['What was Mauritius called during French rule?', 'Île de France'],['Why did the French develop Port Louis?', 'for trade and naval ships'],
    ['Which mountain overlooks Port Louis?', 'Le Pouce'],['What is a capital city?', 'the main city where government is based'],
    ['How did a harbour help the island’s trade?', 'goods could arrive and leave by ship'],['A port is important because it connects Mauritius with…','other countries'],
    ['Which was built to protect Port Louis?', 'Fort Adelaide (the Citadel)'],['Why are old Port Louis buildings important?', 'they tell us about the past'],
    ['Government House is linked with…','government and administration'],['What can a museum help visitors understand?', 'history and heritage'],
    ['Port Louis grew because of…','shipping, trade and government'],['A historical building should be cared for because…','it is part of our heritage']
  ],['Mahé de Labourdonnais','French period','it has a sheltered bay','load, unload and shelter','Île de France','for trade and naval ships','Le Pouce','the main city where government is based','goods could arrive and leave by ship','other countries','Fort Adelaide (the Citadel)','they tell us about the past','government and administration','history and heritage','shipping, trade and government','it is part of our heritage'],'Use the clues about the harbour, capital and old buildings.');
  rows('port-today','port-louis','today',[
    ['Port Louis is the…','capital of Mauritius'],['Today Port Louis is important for…','business, government and trade'],
    ['Which activity is common in Port Louis?', 'buying and selling goods'],['The harbour still connects Mauritius to…','other countries'],
    ['Why do people visit Port Louis?', 'for work, shopping, services and heritage'],['The Central Market is a place where people…','buy and sell products'],
    ['What helps workers travel to Port Louis?', 'roads and public transport'],['Why can traffic be busy in Port Louis?', 'many people travel there for work and services'],
    ['Port Louis has both modern offices and…','historic buildings'],['Which service is likely found in a capital?', 'government offices'],
    ['Why should visitors keep the city clean?', 'to protect a shared public place'],['A commercial centre is a place for…','business and trade'],
    ['What can a port receive from abroad?', 'ships carrying goods'],['Which place helps people learn about Mauritian history?', 'a museum'],
    ['Port Louis is located on the…','north-west coast of Mauritius'],['Why is public transport useful in a city?', 'it moves many people efficiently'],
    ['What is one respectful way to visit heritage sites?', 'follow rules and do not damage them'],['A city can grow when it has…','jobs and services'],
    ['Port Louis is a meeting place for people from…','many parts of Mauritius']
  ],['capital of Mauritius','business, government and trade','buying and selling goods','other countries','for work, shopping, services and heritage','buy and sell products','roads and public transport','many people travel there for work and services','historic buildings','government offices','to protect a shared public place','business and trade','ships carrying goods','a museum','north-west coast of Mauritius','it moves many people efficiently','follow rules and do not damage them','jobs and services','many parts of Mauritius'],'Think about how a capital city works today.');
})();
