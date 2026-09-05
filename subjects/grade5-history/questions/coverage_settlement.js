'use strict';
(function () {
  const add=(id,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'settlement',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
  const rows=(p,s,data,opts,hint)=>data.forEach(([q,a],i)=>add(`g5hg-cov-${p}-${i}`,s,q,opts,a,hint));
  rows('sett-dutch','dutch',[
    ['In what year did the first Dutch settlers arrive in Mauritius?','1638'],['The Dutch settlement was mainly in the…','south-east of Mauritius'],
    ['Which valuable wood did Dutch settlers cut?', 'ebony'],['Why did Dutch settlers bring animals?', 'for food and work'],
    ['Which animal became extinct after people arrived?', 'the Dodo'],['What made farming difficult for Dutch settlers?', 'cyclones and droughts'],
    ['Why did the Dutch need to stop at Mauritius?', 'to resupply ships on long journeys'],['The Dutch named Mauritius after…','Prince Maurits of Nassau'],
    ['What happened to the Dutch settlement in 1710?', 'it was abandoned'],['Why could rats be harmful to native birds?', 'they ate eggs on the ground'],
    ['Which is one reason the Dutch settlement did not last?', 'shortages and difficult weather'],['The Dutch came from…','the Netherlands'],
    ['A settlement needs reliable supplies of…','food and water'],['What did the cutting of forests reduce?', 'native habitats'],
    ['Which lesson comes from the Dodo\'s extinction?', 'protect animals and habitats'],['The Dutch period came before the…','French period'],
    ['Why did settlers build shelters?', 'to live safely on the island'],['Which resource did sailors need to find on an island?', 'fresh water'],
    ['Old objects from a settlement are useful because they are…','evidence from the past'],['The Dutch were the first Europeans to make a…','permanent settlement in Mauritius']
  ],['1638','south-east of Mauritius','ebony','for food and work','the Dodo','cyclones and droughts','to resupply ships on long journeys','Prince Maurits of Nassau','it was abandoned','they ate eggs on the ground','shortages and difficult weather','the Netherlands','food and water','native habitats','protect animals and habitats','French period','to live safely on the island','fresh water','evidence from the past','permanent settlement in Mauritius'],'Think about why people settled, and why that settlement was difficult.');
  rows('sett-french','french',[
    ['In 1715, France claimed Mauritius and called it…','Île de France'],['Which governor developed Port Louis during French rule?', 'Mahé de Labourdonnais'],
    ['Why did the French improve Port Louis?', 'to create a safe harbour and capital'],['What was an important crop during French rule?', 'sugar cane'],
    ['Pierre Poivre is remembered for…','developing spice plants and gardens'],['Which garden is linked with Pierre Poivre?', 'Pamplemousses Botanical Garden'],
    ['Why did the French want a strong harbour?', 'for trade and naval ships'],['What did roads help farmers and traders do?', 'move goods more easily'],
    ['The French period came after the…','Dutch period'],['What does "Île de France" mean?', 'the French name for Mauritius'],
    ['Which activity increased during the French period?', 'trade through Port Louis'],['Why were plantations important?', 'they grew crops to sell'],
    ['A governor is a person who…','helps govern a colony'],['Why do historical gardens matter?', 'they show how plants and trade developed'],
    ['Which city became the capital during French rule?', 'Port Louis'],['The French settled Mauritius partly because it was on…','Indian Ocean sea routes'],
    ['What can old French buildings tell us?', 'how people lived and governed'],['Which item could be traded from a plantation?', 'sugar'],
    ['How did a harbour help the French colony?', 'it connected the island with other places'],['Why is Labourdonnais remembered?', 'he helped develop Port Louis']
  ],['Île de France','Mahé de Labourdonnais','to create a safe harbour and capital','sugar cane','developing spice plants and gardens','Pamplemousses Botanical Garden','for trade and naval ships','move goods more easily','Dutch period','the French name for Mauritius','trade through Port Louis','they grew crops to sell','helps govern a colony','they show how plants and trade developed','Port Louis','Indian Ocean sea routes','how people lived and governed','sugar','it connected the island with other places','he helped develop Port Louis'],'Use the clues about the French name, harbour, crops and governors.');
  rows('sett-british','british',[
    ['In 1810, Mauritius was captured by…','Britain'],['Which battle was a French naval victory before British rule?', 'the Battle of Grand Port'],
    ['The British kept which language widely used in daily life?', 'French'],['What did the British call the island?', 'Mauritius'],
    ['Who was an early British governor of Mauritius?', 'Sir Robert Farquhar'],['Why did Britain want Mauritius?', 'to control an important Indian Ocean route'],
    ['British rule began in…','1810'],['Which event happened in 1835 under British rule?', 'the abolition of slavery'],
    ['Abolition means…','the ending of slavery by law'],['Why is 1835 an important year in Mauritian history?', 'slavery was abolished'],
    ['The British period came after the…','French period'],['Which country ruled Mauritius before independence?', 'Britain'],
    ['Why did people from India come to Mauritius after abolition?', 'to work as indentured labourers'],['Aapravasi Ghat is linked with…','the arrival of indentured labourers'],
    ['What is an indentured labourer?', 'a worker under a contract for a set time'],['Why do we study the British period?', 'it changed laws and people\'s lives'],
    ['What did the British keep to help administration?', 'some French laws and customs'],['In 1810, Britain and France were fighting over…','control of the island'],
    ['Which value should we use when studying difficult history?', 'respect for people\'s experiences'],['British rule ended when Mauritius became independent in…','1968']
  ],['Britain','the Battle of Grand Port','French','Mauritius','Sir Robert Farquhar','to control an important Indian Ocean route','1810','the abolition of slavery','the ending of slavery by law','slavery was abolished','French period','to work as indentured labourers','the arrival of indentured labourers','a worker under a contract for a set time','it changed laws and people\'s lives','some French laws and customs','control of the island','respect for people\'s experiences','1968'],'Think about the change from French to British rule and the important dates.');
})();
