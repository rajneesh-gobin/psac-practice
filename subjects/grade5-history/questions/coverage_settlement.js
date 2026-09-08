'use strict';
(function () {
  const add=(id,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'settlement',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
  const rows=(p,s,data,opts,hint)=>data.forEach(([q,a],i)=>add(`g5hg-cov-${p}-${i}`,s,q,opts,a,hint));
  rows('sett-dutch','dutch',[
    ['In what year did the first Dutch settlers arrive in Mauritius?','1638, in the 17th century'],['The Dutch settlement was mainly in the…','south-east of Mauritius'],
    ['Which valuable wood did Dutch settlers cut?', 'ebony from the forests'],['Why did Dutch settlers bring animals?', 'for food and for work'],
    ['Which animal became extinct after people arrived?', 'the Dodo, a flightless bird'],['What made farming difficult for Dutch settlers?', 'cyclones and droughts'],
    ['Why did the Dutch need to stop at Mauritius?', 'to resupply ships on voyages'],['The Dutch named Mauritius after…','Prince Maurits of Nassau'],
    ['What happened to the Dutch settlement in 1710?', 'it was abandoned for good'],['Why could rats be harmful to native birds?', 'they ate eggs on the ground'],
    ['Which is one reason the Dutch settlement did not last?', 'shortages and difficult weather'],['The Dutch came from…','the Netherlands, in Europe'],
    ['A settlement needs reliable supplies of…','food and fresh clean water'],['What did the cutting of forests reduce?', 'native plant habitats'],
    ['Which lesson comes from the Dodo\'s extinction?', 'protect animals and habitats'],['The Dutch period came before the…','the French period, 1715-1810'],
    ['Why did settlers build shelters?', 'to live safely on the island'],['Which resource did sailors need to find on an island?', 'fresh water for drinking'],
    ['Old objects from a settlement are useful because they are…','evidence from the past'],['The Dutch were the first Europeans to make a…','permanent settlement here']
  ],['1638, in the 17th century','south-east of Mauritius','ebony from the forests','for food and for work','the Dodo, a flightless bird','cyclones and droughts','to resupply ships on voyages','Prince Maurits of Nassau','it was abandoned for good','they ate eggs on the ground','shortages and difficult weather','the Netherlands, in Europe','food and fresh clean water','native plant habitats','protect animals and habitats','the French period, 1715-1810','to live safely on the island','fresh water for drinking','evidence from the past','permanent settlement here'],'Think about why people settled, and why that settlement was difficult.');
  rows('sett-french','french',[
    ['In 1715, France claimed Mauritius and called it…','Île de France, its new name'],['Which governor developed Port Louis during French rule?', 'Mahé de Labourdonnais'],
    ['Why did the French improve Port Louis?', 'to create a safe harbour'],['What was an important crop during French rule?', 'sugar cane grown for export'],
    ['Pierre Poivre is remembered for…','developing spices and gardens'],['Which garden is linked with Pierre Poivre?', 'Pamplemousses Botanical Garden'],
    ['Why did the French want a strong harbour?', 'for trade and naval ships'],['What did roads help farmers and traders do?', 'move goods more easily'],
    ['The French period came after the…','the Dutch period, 1638-1710'],['What does "Île de France" mean?', 'the French name for Mauritius'],
    ['Which activity increased during the French period?', 'trade through Port Louis'],['Why were plantations important?', 'they grew crops to sell'],
    ['A governor is a person who…','helps govern a colony'],['Why do historical gardens matter?', 'they show how trade developed'],
    ['Which city became the capital during French rule?', 'the city of Port Louis'],['The French settled Mauritius partly because it was on…','Indian Ocean sea routes'],
    ['What can old French buildings tell us?', 'how people lived and governed'],['Which item could be traded from a plantation?', 'sugar made from the cane'],
    ['How did a harbour help the French colony?', 'it linked the island to others'],['Why is Labourdonnais remembered?', 'he helped develop Port Louis']
  ],['Île de France, its new name','Mahé de Labourdonnais','to create a safe harbour','sugar cane grown for export','developing spices and gardens','Pamplemousses Botanical Garden','for trade and naval ships','move goods more easily','the Dutch period, 1638-1710','the French name for Mauritius','trade through Port Louis','they grew crops to sell','helps govern a colony','they show how trade developed','the city of Port Louis','Indian Ocean sea routes','how people lived and governed','sugar made from the cane','it linked the island to others','he helped develop Port Louis'],'This was the island\'s official name under one of its European rulers - which one, and what were they naming?');
  rows('sett-british','british',[
    ['In 1810, Mauritius was captured by…','Britain, a naval power'],['Which battle was a French naval victory before British rule?', 'the Battle of Grand Port'],
    ['The British kept which language widely used in daily life?', 'French, still spoken by many'],['What did the British call the island?', 'Mauritius, its Dutch name'],
    ['Who was an early British governor of Mauritius?', 'Governor Sir Robert Farquhar'],['Why did Britain want Mauritius?', 'to control a sea trade route'],
    ['British rule began in…','1810, in the 19th century'],['Which event happened in 1835 under British rule?', 'the abolition of slavery'],
    ['Abolition means…','the ending of slavery by law'],['Why is 1835 an important year in Mauritian history?', 'slavery was abolished'],
    ['The British period came after the…','the French period, 1715-1810'],['Which country ruled Mauritius before independence?', 'Britain, a naval power'],
    ['Why did people from India come to Mauritius after abolition?', 'to work as indentured workers'],['Aapravasi Ghat is linked with…','arrival of indentured workers'],
    ['What is an indentured labourer?', 'a worker on a fixed contract'],['Why do we study the British period?', 'it changed our laws and lives'],
    ['What did the British keep to help administration?', 'some French laws and customs'],['In 1810, Britain and France were fighting over…','control of the island'],
    ['Which value should we use when studying difficult history?', 'respect for people of the past'],['British rule ended when Mauritius became independent in…','1968, in the 20th century']
  ],['Britain, a naval power','the Battle of Grand Port','French, still spoken by many','Mauritius, its Dutch name','Governor Sir Robert Farquhar','to control a sea trade route','1810, in the 19th century','the abolition of slavery','the ending of slavery by law','slavery was abolished','the French period, 1715-1810','to work as indentured workers','arrival of indentured workers','a worker on a fixed contract','it changed our laws and lives','some French laws and customs','control of the island','respect for people of the past','1968, in the 20th century'],'Think about the change from French to British rule and the important dates.');
})();
