'use strict';
(function () {
// Real explanations, keyed by id. Every question in this file used to say
// only "<b>X</b> is correct.", which tells a child nothing.
const G5HG_EXPL = {
  'g5hg-cov-sett-dutch-0': "The first settlers landed in <b>1638</b>, forty years after the Dutch first claimed the island. That is the 17th century.",
  'g5hg-cov-sett-dutch-1': "They settled in the <b>south-east</b>, around what is now Vieux Grand Port, where the bay gave shelter.",
  'g5hg-cov-sett-dutch-2': "<b>Ebony</b> is hard and dark and sold well in Europe, so the settlers cut and shipped it.",
  'g5hg-cov-sett-dutch-3': "They brought animals <b>for food and for work</b> — meat and milk, and animals strong enough to carry and pull.",
  'g5hg-cov-sett-dutch-4': "The <b>Dodo</b> could not fly and nested on the ground, so it could not escape hunters or the rats and pigs that came with them.",
  'g5hg-cov-sett-dutch-5': "<b>Cyclones and droughts</b> destroyed harvests, so the settlers could never build up a reliable food supply.",
  'g5hg-cov-sett-dutch-6': "Ships sailing to the East Indies needed somewhere to <b>resupply</b> after months at sea.",
  'g5hg-cov-sett-dutch-7': "They named it after <b>Prince Maurits of Nassau</b>, who then ruled the Netherlands.",
  'g5hg-cov-sett-dutch-8': "In 1710 the settlement was <b>abandoned for good</b>. The Dutch never returned, and the French took the island five years later.",
  'g5hg-cov-sett-dutch-9': "Native birds nested on the ground because nothing had ever hunted them there, so rats simply <b>ate the eggs</b>.",
  'g5hg-cov-sett-dutch-10': "It failed because of <b>shortages and difficult weather</b> together: cyclones and drought ruined crops, and supplies from Europe were slow and uncertain.",
  'g5hg-cov-sett-dutch-11': "The Dutch came from <b>the Netherlands</b>, in north-west Europe.",
  'g5hg-cov-sett-dutch-12': "No settlement lasts without <b>food and fresh clean water</b>, which is exactly what the Dutch struggled to secure.",
  'g5hg-cov-sett-dutch-13': "Cutting the forest removed <b>native plant habitats</b>, and the animals that depended on those plants lost their homes with them.",
  'g5hg-cov-sett-dutch-14': "The Dodo was lost within about a century of people arriving, which teaches us to <b>protect animals and their habitats</b> before it is too late.",
  'g5hg-cov-sett-dutch-15': "The Dutch left in 1710 and the French claimed the island in 1715, so the Dutch period came before <b>the French period</b>.",
  'g5hg-cov-sett-dutch-16': "Shelters gave protection from cyclones, rain and heat, so settlers could <b>live safely on the island</b>.",
  'g5hg-cov-sett-dutch-17': "Ships could carry salted food but not enough water for months, so <b>fresh water</b> was the supply they had to find ashore.",
  'g5hg-cov-sett-dutch-18': "Objects left behind were made and used at the time, so they are <b>evidence from the past</b> rather than someone's later opinion.",
  'g5hg-cov-sett-dutch-19': "Other Europeans had landed before, but the Dutch were the first to build a <b>permanent settlement</b> and stay.",
  'g5hg-cov-sett-french-0': "France claimed the island in 1715 and renamed it <b>Île de France</b>, the name it kept until 1810.",
  'g5hg-cov-sett-french-1': "<b>Mahé de Labourdonnais</b>, governor from 1735, built the harbour, warehouses, hospital and roads of Port Louis.",
  'g5hg-cov-sett-french-2': "A <b>safe harbour</b> let ships shelter, repair and resupply, which made the island useful on the route to India.",
  'g5hg-cov-sett-french-3': "<b>Sugar cane</b> grew well in the climate and could be sold abroad, so it became the island's main crop.",
  'g5hg-cov-sett-french-4': "<b>Pierre Poivre</b> brought spice plants such as nutmeg and clove to the island and grew them in gardens, to break the Dutch hold on the spice trade.",
  'g5hg-cov-sett-french-5': "The <b>Pamplemousses Botanical Garden</b> is where Poivre grew his spices and other plants brought from abroad.",
  'g5hg-cov-sett-french-6': "A strong harbour served <b>trade and naval ships</b> at once — merchants, and warships guarding the sea route.",
  'g5hg-cov-sett-french-7': "Roads let farmers and traders <b>move goods more easily</b> from inland plantations to the port.",
  'g5hg-cov-sett-french-8': "The French claimed the island in 1715, five years after the Dutch left, so the French period came after <b>the Dutch period</b>.",
  'g5hg-cov-sett-french-9': "\"Île de France\" is simply <b>the French name for Mauritius</b>, used through the French period.",
  'g5hg-cov-sett-french-10': "As the harbour improved, <b>trade through Port Louis</b> grew, and the town grew with it.",
  'g5hg-cov-sett-french-11': "Plantations <b>grew crops to sell</b> abroad, especially sugar, rather than just food for the island.",
  'g5hg-cov-sett-french-12': "A governor is sent to <b>govern a colony</b> on behalf of the ruling country.",
  'g5hg-cov-sett-french-13': "Gardens such as Pamplemousses were built to grow plants brought in by ship, so <b>they show how trade developed</b>.",
  'g5hg-cov-sett-french-14': "<b>Port Louis</b> became the capital under the French and has remained so ever since.",
  'g5hg-cov-sett-french-15': "Mauritius sits on the <b>Indian Ocean sea routes</b> between Europe and India, which made it worth holding.",
  'g5hg-cov-sett-french-16': "Buildings show how rooms were used, how people were governed and what they could afford, so they tell us <b>how people lived and governed</b>.",
  'g5hg-cov-sett-french-17': "The cane itself was processed on the island, and the <b>sugar</b> made from it was what could be shipped and sold.",
  'g5hg-cov-sett-french-18': "The harbour <b>linked the island to other places</b>, so goods, people and news could come and go.",
  'g5hg-cov-sett-french-19': "Labourdonnais is remembered because <b>he developed Port Louis</b> from a small anchorage into a working port and capital.",
  'g5hg-cov-sett-british-0': "<b>Britain</b> captured the island in 1810 and held it until independence.",
  'g5hg-cov-sett-british-1': "The <b>Battle of Grand Port</b> in 1810 was a French naval victory — the only one recorded on the Arc de Triomphe. Britain took the island later that year anyway.",
  'g5hg-cov-sett-british-2': "The British let the island keep its language and customs, so <b>French</b> stayed in everyday use and still is.",
  'g5hg-cov-sett-british-3': "They restored the older Dutch name, <b>Mauritius</b>, in place of Île de France.",
  'g5hg-cov-sett-british-4': "<b>Sir Robert Farquhar</b> was the first British governor, from 1810.",
  'g5hg-cov-sett-british-5': "Britain wanted the island to <b>control the sea route</b> to India, and to stop French ships raiding from it.",
  'g5hg-cov-sett-british-6': "British rule began in <b>1810</b>, which falls in the 19th century.",
  'g5hg-cov-sett-british-7': "<b>Slavery was abolished</b> in 1835, and that changed who worked the plantations and how.",
  'g5hg-cov-sett-british-8': "Abolition means <b>ending something by law</b> — here, the ending of slavery.",
  'g5hg-cov-sett-british-9': "1835 matters because <b>slavery was abolished</b>, which freed thousands of people and changed the island's society for good.",
  'g5hg-cov-sett-british-10': "Britain took the island in 1810, at the end of the French period, so the British period came after <b>the French period</b>.",
  'g5hg-cov-sett-british-11': "<b>Britain</b> ruled Mauritius from 1810 until independence in 1968.",
  'g5hg-cov-sett-british-12': "After abolition the plantations still needed workers, so people came from India <b>as indentured workers</b> on contracts.",
  'g5hg-cov-sett-british-13': "<b>Aapravasi Ghat</b> is the landing place in Port Louis where indentured workers first arrived, which is why it is a World Heritage Site.",
  'g5hg-cov-sett-british-14': "An indentured labourer is <b>a worker on a fixed contract</b>, bound to work a set number of years for agreed pay and passage.",
  'g5hg-cov-sett-british-15': "The British period <b>changed our laws and our lives</b>: it ended slavery, brought indenture, and shaped much of today's society.",
  'g5hg-cov-sett-british-16': "Rather than replace everything, the British kept <b>some French laws and customs</b>, which is why French legal ideas still appear in Mauritian law.",
  'g5hg-cov-sett-british-17': "Britain and France were at war, and each wanted <b>control of the island</b> because of where it sat on the route to India.",
  'g5hg-cov-sett-british-18': "Slavery and indenture caused real suffering, so the right approach is <b>respect for the people of the past</b> whose lives we are studying.",
  'g5hg-cov-sett-british-19': "Mauritius became independent in <b>1968</b>, which falls in the 20th century.",
};
  const add=(id,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'settlement',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5HG_EXPL[id]||`<b>${a}</b> is correct.`}));
  const DH = 'Think about why people settled, and why that settlement was difficult.';
  add('g5hg-cov-sett-dutch-0','dutch','In what year did the first Dutch settlers arrive in Mauritius?',['1638, in the 17th century','1598, in the 16th century','1710, in the 18th century','1715, in the 18th century'],'1638, in the 17th century',DH);
  add('g5hg-cov-sett-dutch-1','dutch','The Dutch settlement was mainly in the…',['south-east of Mauritius','north of Mauritius','west coast of Mauritius','centre of Mauritius'],'south-east of Mauritius',DH);
  add('g5hg-cov-sett-dutch-2','dutch','Which valuable wood did Dutch settlers cut?',['ebony from the forests','teak from the forests','mahogany from the forests','bamboo from the riverbanks'],'ebony from the forests',DH);
  add('g5hg-cov-sett-dutch-3','dutch','Why did Dutch settlers bring animals?',['for food and for work','to trade with island people','to study local wildlife','to protect the settlement'],'for food and for work',DH);
  add('g5hg-cov-sett-dutch-4','dutch','Which animal became extinct after people arrived?',['the Dodo, a flightless bird','the sea eagle, a hunter','the wild pig, a forest animal','the fruit bat, a night flier'],'the Dodo, a flightless bird',DH);
  add('g5hg-cov-sett-dutch-5','dutch','What made farming difficult for Dutch settlers?',['cyclones and droughts','heavy snow and frost','floods and earthquakes','poor soil with no sun'],'cyclones and droughts',DH);
  add('g5hg-cov-sett-dutch-6','dutch','Why did the Dutch need to stop at Mauritius?',['to resupply ships on voyages','to trade spices with merchants','to recruit new sailors','to repair storm damage'],'to resupply ships on voyages',DH);
  add('g5hg-cov-sett-dutch-7','dutch','The Dutch named Mauritius after…',['Prince Maurits of Nassau','King Willem of Holland','Admiral de Ruyter','Governor Van der Berg'],'Prince Maurits of Nassau',DH);
  add('g5hg-cov-sett-dutch-8','dutch','What happened to the Dutch settlement in 1710?',['it was abandoned for good','it grew into a large town','it was captured by France','it was destroyed by a cyclone'],'it was abandoned for good',DH);
  add('g5hg-cov-sett-dutch-9','dutch','Why could rats be harmful to native birds?',['they ate eggs on the ground','they spread disease to chicks','they chased birds from water','they took over nesting trees'],'they ate eggs on the ground',DH);
  add('g5hg-cov-sett-dutch-10','dutch','Which is one reason the Dutch settlement did not last?',['shortages and difficult weather','attacks by enemy soldiers','a deadly fever swept through','the island was too small'],'shortages and difficult weather',DH);
  add('g5hg-cov-sett-dutch-11','dutch','The Dutch came from…',['the Netherlands, in Europe','Denmark, in Europe','Germany, in Europe','Portugal, in Europe'],'the Netherlands, in Europe',DH);
  add('g5hg-cov-sett-dutch-12','dutch','A settlement needs reliable supplies of…',['food and fresh clean water','gold and precious stones','timber and building stone','soldiers and weapons'],'food and fresh clean water',DH);
  add('g5hg-cov-sett-dutch-13','dutch','What did the cutting of forests reduce?',['native plant habitats','rainfall across the island','the island\'s coastline','soil near the rivers'],'native plant habitats',DH);
  add('g5hg-cov-sett-dutch-14','dutch','Which lesson comes from the Dodo\'s extinction?',['protect animals and habitats','avoid sailing to islands','never hunt for food','keep islands uninhabited'],'protect animals and habitats',DH);
  add('g5hg-cov-sett-dutch-15','dutch','The Dutch period came before the…',['the French period, 1715-1810','the British period, 1810-1968','the independent period, 1968','the Portuguese period, 1500s'],'the French period, 1715-1810',DH);
  add('g5hg-cov-sett-dutch-16','dutch','Why did settlers build shelters?',['to live safely on the island','to store goods from ships','to guard the settlement gate','to hold market and trade'],'to live safely on the island',DH);
  add('g5hg-cov-sett-dutch-17','dutch','Which resource did sailors need to find on an island?',['fresh water for drinking','wood for ship repairs','rope for the rigging','salt for preserving food'],'fresh water for drinking',DH);
  add('g5hg-cov-sett-dutch-18','dutch','Old objects from a settlement are useful because they are…',['evidence from the past','worth a lot of money','beautiful works of art','rare in the world today'],'evidence from the past',DH);
  add('g5hg-cov-sett-dutch-19','dutch','The Dutch were the first Europeans to make a…',['permanent settlement here','map of the island','voyage past Mauritius','trade route to India'],'permanent settlement here',DH);
  const FH = 'Think about how the French used the island, who led them, and what they built.';
  add('g5hg-cov-sett-french-0','french','In 1715, France claimed Mauritius and called it…',['Île de France, its new name','Île Maurice, its old name','Île Bourbon, after a king','Île Napoleon, after a general'],'Île de France, its new name',FH);
  add('g5hg-cov-sett-french-1','french','Which governor developed Port Louis during French rule?',['Mahé de Labourdonnais','Pierre Poivre','Jean-Baptiste Colbert','François Leguat'],'Mahé de Labourdonnais',FH);
  add('g5hg-cov-sett-french-2','french','Why did the French improve Port Louis?',['to create a safe harbour','to build a fine cathedral','to house French soldiers','to grow sugar near the coast'],'to create a safe harbour',FH);
  add('g5hg-cov-sett-french-3','french','What was an important crop during French rule?',['sugar cane grown for export','cotton grown for clothing','tea grown for trade','tobacco grown for Europe'],'sugar cane grown for export',FH);
  add('g5hg-cov-sett-french-4','french','Pierre Poivre is remembered for…',['developing spices and gardens','building the harbour wall','leading troops in battle','writing the colonial laws'],'developing spices and gardens',FH);
  add('g5hg-cov-sett-french-5','french','Which garden is linked with Pierre Poivre?',['Pamplemousses Botanical Garden','Curepipe Botanical Garden','Mahebourg Spice Garden','Port Louis Royal Garden'],'Pamplemousses Botanical Garden',FH);
  add('g5hg-cov-sett-french-6','french','Why did the French want a strong harbour?',['for trade and naval ships','to store sugar and spices','to collect taxes from ships','to attract more settlers'],'for trade and naval ships',FH);
  add('g5hg-cov-sett-french-7','french','What did roads help farmers and traders do?',['move goods more easily','travel to church faster','defend against attackers','find water in dry seasons'],'move goods more easily',FH);
  add('g5hg-cov-sett-french-8','french','The French period came after the…',['the Dutch period, 1638-1710','the British period, 1810-1968','the independent period, 1968','the Portuguese period, 1500s'],'the Dutch period, 1638-1710',FH);
  add('g5hg-cov-sett-french-9','french','What does "Île de France" mean?',['the French name for Mauritius','the island of flowers','the garden of France','the island of freedom'],'the French name for Mauritius',FH);
  add('g5hg-cov-sett-french-10','french','Which activity increased during the French period?',['trade through Port Louis','fishing in deep waters','mining for precious stones','growing wheat for bread'],'trade through Port Louis',FH);
  add('g5hg-cov-sett-french-11','french','Why were plantations important?',['they grew crops to sell','they housed all the settlers','they stored goods from ships','they provided land for the poor'],'they grew crops to sell',FH);
  add('g5hg-cov-sett-french-12','french','A governor is a person who…',['helps govern a colony','commands the navy at sea','builds roads and harbours','collects taxes for the king'],'helps govern a colony',FH);
  add('g5hg-cov-sett-french-13','french','Why do historical gardens matter?',['they show how trade developed','they provide food for the poor','they attract visitors today','they store rare medicines'],'they show how trade developed',FH);
  add('g5hg-cov-sett-french-14','french','Which city became the capital during French rule?',['the city of Port Louis','the city of Mahebourg','the city of Curepipe','the city of Rose Hill'],'the city of Port Louis',FH);
  add('g5hg-cov-sett-french-15','french','The French settled Mauritius partly because it was on…',['Indian Ocean sea routes','Atlantic Ocean trade winds','Pacific Ocean crossing lanes','Mediterranean Sea lanes'],'Indian Ocean sea routes',FH);
  add('g5hg-cov-sett-french-16','french','What can old French buildings tell us?',['how people lived and governed','when exactly they were built','which materials were cheapest','how large the population was'],'how people lived and governed',FH);
  add('g5hg-cov-sett-french-17','french','Which item could be traded from a plantation?',['sugar made from the cane','fish caught off the coast','salt gathered from the sea','spices from the harbour'],'sugar made from the cane',FH);
  add('g5hg-cov-sett-french-18','french','How did a harbour help the French colony?',['it linked the island to others','it provided fresh water','it created jobs for the poor','it sheltered crops from storms'],'it linked the island to others',FH);
  add('g5hg-cov-sett-french-19','french','Why is Labourdonnais remembered?',['he helped develop Port Louis','he abolished slavery early','he defeated Britain at sea','he introduced sugar to Mauritius'],'he helped develop Port Louis',FH);
  const BH = 'Think about the change from French to British rule and the important dates.';
  add('g5hg-cov-sett-british-0','british','In 1810, Mauritius was captured by…',['Britain, a naval power','France, a colonial power','Portugal, a trading power','Spain, a naval power'],'Britain, a naval power',BH);
  add('g5hg-cov-sett-british-1','british','Which battle was a French naval victory before British rule?',['the Battle of Grand Port','the Battle of Mahebourg Bay','the Battle of Port Napoleon','the Battle of Île de France'],'the Battle of Grand Port',BH);
  add('g5hg-cov-sett-british-2','british','The British kept which language widely used in daily life?',['French, still spoken by many','Dutch, still spoken by some','Arabic, used in trade','Hindi, brought from India'],'French, still spoken by many',BH);
  add('g5hg-cov-sett-british-3','british','What did the British call the island?',['Mauritius, its Dutch name','Ceylon, its new British name','Île de France, its French name','Bourbon, after a French king'],'Mauritius, its Dutch name',BH);
  add('g5hg-cov-sett-british-4','british','Who was an early British governor of Mauritius?',['Governor Sir Robert Farquhar','Governor Sir William Grant','Governor Sir James Scott','Governor Sir Henry Colville'],'Governor Sir Robert Farquhar',BH);
  add('g5hg-cov-sett-british-5','british','Why did Britain want Mauritius?',['to control a sea trade route','to grow sugar for Britain','to start a new colony','to mine for precious metals'],'to control a sea trade route',BH);
  add('g5hg-cov-sett-british-6','british','British rule began in…',['1810, in the 19th century','1715, in the 18th century','1835, in the 19th century','1638, in the 17th century'],'1810, in the 19th century',BH);
  add('g5hg-cov-sett-british-7','british','Which event happened in 1835 under British rule?',['the abolition of slavery','the arrival of the first governor','the building of a new harbour','the granting of independence'],'the abolition of slavery',BH);
  add('g5hg-cov-sett-british-8','british','Abolition means…',['the ending of slavery by law','the start of a new freedom','the punishment of wrongdoers','a vote held in parliament'],'the ending of slavery by law',BH);
  add('g5hg-cov-sett-british-9','british','Why is 1835 an important year in Mauritian history?',['slavery was abolished','the British first arrived','independence was declared','the first school was opened'],'slavery was abolished',BH);
  add('g5hg-cov-sett-british-10','british','The British period came after the…',['the French period, 1715-1810','the Dutch period, 1638-1710','the Portuguese period, 1500s','the independent period, 1968'],'the French period, 1715-1810',BH);
  add('g5hg-cov-sett-british-11','british','Which country ruled Mauritius before independence?',['Britain, a naval power','France, a colonial power','Portugal, a trading power','the Netherlands, a sea power'],'Britain, a naval power',BH);
  add('g5hg-cov-sett-british-12','british','Why did people from India come to Mauritius after abolition?',['to work as indentured workers','to trade goods with settlers','to settle as free farmers','to serve in the British army'],'to work as indentured workers',BH);
  add('g5hg-cov-sett-british-13','british','Aapravasi Ghat is linked with…',['arrival of indentured workers','arrival of British soldiers','arrival of French settlers','arrival of Dutch traders'],'arrival of indentured workers',BH);
  add('g5hg-cov-sett-british-14','british','What is an indentured labourer?',['a worker on a fixed contract','a slave with no rights at all','a free farmer with own land','a sailor on a merchant ship'],'a worker on a fixed contract',BH);
  add('g5hg-cov-sett-british-15','british','Why do we study the British period?',['it changed our laws and lives','it was the longest colonial period','it gave us our language','it ended all colonial rule'],'it changed our laws and lives',BH);
  add('g5hg-cov-sett-british-16','british','What did the British keep to help administration?',['some French laws and customs','the Dutch road network','the French military system','the Dutch land boundaries'],'some French laws and customs',BH);
  add('g5hg-cov-sett-british-17','british','In 1810, Britain and France were fighting over…',['control of the island','the right to trade sugar','use of the harbour fees','ownership of spice gardens'],'control of the island',BH);
  add('g5hg-cov-sett-british-18','british','Which value should we use when studying difficult history?',['respect for people of the past','pride in our own nation','anger at past injustice','admiration for strong leaders'],'respect for people of the past',BH);
  add('g5hg-cov-sett-british-19','british','British rule ended when Mauritius became independent in…',['1968, in the 20th century','1835, in the 19th century','1945, in the 20th century','1992, in the 20th century'],'1968, in the 20th century',BH);
})();
