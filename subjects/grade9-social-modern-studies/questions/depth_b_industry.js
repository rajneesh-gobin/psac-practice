'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH B: industrialisation,
//  its impacts, and Chagos & Tromelin.
//  IDs: g9sms-dpb-001 … g9sms-dpb-144. Block chosen because no id in this
//  pack begins g9sms-dpb- (checked 2026-09-19 against loadSubject()).
//
//  ⚠ L4 IN THIS PACK IS THE APPLIED BAND, not harder recall. Every L4 item
//    below hands the pupil a situation — a decision with a consequence, data
//    to interpret, two defensible-looking claims to judge between, or a cause
//    to trace. A question answerable by recognising a definition is L1 or L2
//    here however long its wording.
//
//  ⚠ OPTIONS ARE KEPT THE SAME SHAPE AND LENGTH. An applied question's answer
//    wants to be the long careful one, which is the leak
//    scripts/test-option-parity.js measures. Lengthen a distractor, never trim
//    the answer.
//
//  ⚠ FIGURES. Chagos and Tromelin are live diplomatic matters. Nothing here
//    asserts a statistic that is not already carried by this pack or by the
//    manifest's syllabus prose; the items prefer causes, consequences and
//    comparisons to numbers, and no living person is named.
//
//  Source: docs/nce-grade9/blueprint-social-modern-studies.md (all five NCE
//  papers, measured question by question); the pack _manifest.js syllabus.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ═══ g9sms-industrialisation · import_substitution — 001…014 ══════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-001', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:1,
  question:'Import substitution industrialisation means that a country starts to do what?',
  options:['Make at home the goods it used to buy from abroad',
           'Buy from abroad the goods it used to make at home',
           'Send abroad the workers it used to employ at home',
           'Train at home the doctors it used to send abroad'],
  answer:'Make at home the goods it used to buy from abroad',
  hint:'The words say that one thing is being put in the place of another. Which way round?',
  explanation:'Substitution means putting one thing in the place of another, and the thing replaced is the import. Local factories therefore make goods that were previously bought abroad. The reverse — buying abroad what was once made locally — is exactly what the policy was designed to stop.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-002', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:1,
  question:'A tax charged on goods as they enter a country, used to make imports dearer than locally made goods, is called a ____. Answer in one word.',
  answer:'tariff', alsoAccept:['tariffs','duty','import duty','customs duty'],
  hint:'It is collected at the port, and it is the commonest tool of a policy of protection.',
  explanation:'A tariff is a tax on imports. It raises the price of the foreign good so that a young local factory can compete, which is the whole point of protection. A quota is different: it limits the quantity allowed in rather than working through price.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-003', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:2,
  question:'Besides a tariff, a government protecting local industry may set a quota. What does a quota do?',
  options:['It fixes the quantity of a good that may be imported',
           'It fixes the price at which a good must be sold here',
           'It fixes the wage a factory must pay its own workers',
           'It fixes the profit a foreign firm may take out again'],
  answer:'It fixes the quantity of a good that may be imported',
  hint:'One of these limits how MUCH comes in; the others limit money rather than amount.',
  explanation:'A quota is a ceiling on quantity: only so many units may enter, whatever the price. A tariff works through price instead. Fixing a selling price or a wage is a different kind of control altogether and does not keep imports out.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-004', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:2,
  question:'Import substitution in Mauritius began with which kind of goods?',
  options:['Simple consumer goods such as clothing, soap and food',
           'Heavy machinery such as turbines, engines and steel plant',
           'Advanced electronics such as computers and telephone exchanges',
           'Mining equipment such as drills, crushers and conveyor belts'],
  answer:'Simple consumer goods such as clothing, soap and food',
  hint:'Think what a small country with little capital and few engineers could begin making straight away.',
  explanation:'A small economy starts with goods needing modest capital and simple skills, which is why clothing, soap, matches and food processing came first. Heavy machinery and electronics need large markets and deep engineering skills that Mauritius did not have in the 1960s.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-005', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:2,
  question:'A local sandal factory sells 20 000 pairs a year. After a tariff is placed on imported sandals, imports fall from 50 000 pairs a year to 18 000. By how many pairs did imports fall?',
  answer:32000,
  hint:'Compare the two import figures only; the factory\'s own sales are not part of this calculation.',
  explanation:'50 000 - 18 000 = 32 000 pairs. The factory\'s own 20 000 pairs is placed there to tempt you into adding or subtracting it, but the question asks only about the change in imports.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-006', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:2,
  question:'Where does import substitution sit in the story of Mauritian industry?',
  options:['It came first, and the export zone followed it in 1970',
           'It came after the export zone was set up in that same year',
           'It replaced the export zone once the sugar price fell again',
           'It was tried only after the textile factories had all closed'],
  answer:'It came first, and the export zone followed it in 1970',
  hint:'One policy looked inward at the home market and one looked outward. Which was tried first?',
  explanation:'Mauritius tried protecting production for the home market through the 1960s, and the Export Processing Zone Act came in 1970 once that route proved too small. The export zone did not come first, and it was not a return to protection.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-007', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:3,
  question:'Why could import substitution never create enough jobs for Mauritius?',
  options:['The home market was too small to keep large factories busy',
           'The government refused to give any protection to local firms',
           'Mauritians would not buy goods that were made on the island',
           'There was no electricity supply for factories outside the towns'],
  answer:'The home market was too small to keep large factories busy',
  hint:'Ask who the protected factories were allowed to sell to, and how many of those buyers there were.',
  explanation:'A protected factory can sell only to the people inside the tariff wall, and Mauritius had fewer than a million of them. Demand ran out before the factory grew large enough to employ many workers. Protection was given rather than refused, and the goods did sell — there were simply too few buyers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-008', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:3,
  question:'Import substitution was meant to save foreign currency. Why did it save less than was hoped?',
  options:['The new factories still had to import machinery and materials',
           'The new factories sold all of their output to foreign buyers',
           'The government paid for the factories with borrowed currency',
           'The workers in the factories were all recruited from abroad'],
  answer:'The new factories still had to import machinery and materials',
  hint:'Follow what the factory itself has to buy before it can make anything at all.',
  explanation:'Making shirts at home saves the currency once spent on shirts, but the cloth, the sewing machines and the spare parts are all bought abroad, so much of the saving leaks straight back out. The factories sold at home, not abroad — that was the whole design.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-009', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'A protected biscuit maker supplying only Mauritius wants to double its output. Its adviser says the firm must start exporting instead. Which argument best supports the adviser?',
  options:['Every Mauritian who wants biscuits is already buying them',
           'Exporting removes the need to pay any wages to local workers',
           'A tariff on imported biscuits would have to be lowered first',
           'Biscuits cannot legally be sold outside the country of origin'],
  answer:'Every Mauritian who wants biscuits is already buying them',
  hint:'Doubling output only helps if somebody buys the extra. Where would those buyers have to be?',
  explanation:'Doubling output is pointless unless there are new buyers, and inside a saturated home market there are none — which is exactly the limit the export zone was created to escape. Exporting does not remove wage costs, and nothing prevents a Mauritian firm selling abroad.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-010', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'A minister proposes doubling the tariff on imported shoes to help a local shoe factory. Which consequence should be weighed against that help?',
  options:['Every family buying shoes will pay a higher price for them',
           'The local shoe factory will be forced to close its doors',
           'Shoe imports will rise because traders will order more of them',
           'The government will collect no revenue from shoes any longer'],
  answer:'Every family buying shoes will pay a higher price for them',
  hint:'Protection helps one group directly. Ask who pays for that help, and how.',
  explanation:'A tariff works by making the imported shoe dearer, so shoppers meet the cost of the protection at the till. The local factory is helped rather than closed, imports fall rather than rise, and the tariff still raises revenue on whatever is imported.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-011', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'A pupil writes: "Import substitution failed in Mauritius because Mauritians preferred foreign goods." What is the weakness in that explanation?',
  options:['The protected goods did sell; there were simply too few buyers',
           'Mauritians were not allowed to buy foreign goods at that time',
           'The policy was never actually tried anywhere in the country',
           'Foreign goods were cheaper only after the tariffs were removed'],
  answer:'The protected goods did sell; there were simply too few buyers',
  hint:'Test the claim against what actually limited the factories: taste, or the number of customers?',
  explanation:'The limit was the size of the market, not a dislike of local goods — a tariff wall around fewer than a million people caps how big any factory can grow. Foreign goods were not banned, and the policy was genuinely pursued through the 1960s.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-012', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'A protected factory reports its costs. <table><tr><td>Pairs made each year</td><td>Cost of making one pair</td></tr><tr><td>10 000</td><td>Rs 180</td></tr><tr><td>40 000</td><td>Rs 120</td></tr></table> What does this tell you about selling only inside a small home market?',
  options:['Staying small keeps the cost of each pair high',
           'Staying small lowers the cost of each pair made',
           'The size of the market has no effect on the cost',
           'Costs fall only when the tariff is raised further'],
  answer:'Staying small keeps the cost of each pair high',
  hint:'Read the two rows together, then ask which row a small market forces the factory into.',
  explanation:'Making four times as many pairs cuts the cost of each one from Rs 180 to Rs 120, because fixed costs are spread over more output. A small protected market keeps the factory in the top row, so its goods stay expensive. Nothing here links cost to the tariff.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-013', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'When the export zone opened in 1970, Mauritius did not abolish its protected home-market industries. What is the best reason for running both at once?',
  options:['The existing factories and their jobs would have been lost',
           'Export firms are not permitted to operate beside local ones',
           'The two kinds of factory make exactly the same goods anyway',
           'Protected firms pay the wages of the export zone workers'],
  answer:'The existing factories and their jobs would have been lost',
  hint:'Think about what closing the older factories would have cost the country immediately.',
  explanation:'Shutting protected firms would have destroyed jobs the country badly needed while the new zone was still tiny, so the two ran side by side. The law did not forbid both, they made different goods, and neither paid the other\'s wages.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-014', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
  question:'Two small islands both protect local industry. One also opens a zone whose factories sell only abroad. Twenty years later that island has far more factory jobs. Which explanation fits best?',
  options:['Its factories could sell to buyers far beyond its own people',
           'Its factories were allowed to charge much higher prices at home',
           'Its factories no longer needed to import any raw materials',
           'Its factories were owned only by the government of the island'],
  answer:'Its factories could sell to buyers far beyond its own people',
  hint:'The two islands differ in one thing only. Follow what that difference changes about demand.',
  explanation:'The only difference is access to a market of millions instead of thousands, and that is what lets a factory grow large enough to employ many people. Exporters compete on world prices rather than charging more, and they import their inputs heavily.' }));

// ═══ g9sms-industrialisation · epz_incentives — 015…022 ═══════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-015', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:1,
  question:'A factory inside the Export Processing Zone sells its output mainly to whom?',
  options:['Buyers in other countries, not shoppers in Mauritius',
           'Shoppers in Mauritius, not buyers in other countries',
           'The government of Mauritius, under a yearly contract',
           'Other zone factories, which finish the goods for it'],
  answer:'Buyers in other countries, not shoppers in Mauritius',
  hint:'The middle word of the zone\'s name says where the goods are going.',
  explanation:'The word "export" in Export Processing Zone is the clue: goods are processed here and sold abroad, which is how those firms escaped the small home market. Selling to local shoppers is what the older protected factories did.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-016', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:2,
  question:'One EPZ incentive was the free repatriation of profits. What did this promise a foreign investor?',
  options:['That profits earned here could be sent back to their country',
           'That profits earned here would be taxed at a much lower rate',
           'That profits earned here had to be reinvested in the island',
           'That profits earned here would be guaranteed by the state'],
  answer:'That profits earned here could be sent back to their country',
  hint:'Repatriation is about MOVING money, not about how much of it is taken in tax.',
  explanation:'Repatriation means sending money home, so the promise was that an investor could take earnings out again without being blocked. A lower tax rate was a separate incentive, and a promise to guarantee profits was never offered by anybody.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-017', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:2,
  question:'An EPZ firm paid no income tax at all during its first years of operation. This period was known as a tax ____. Answer in one word.',
  answer:'holiday', alsoAccept:['holidays'],
  hint:'The word describes a break from something that is normally due every year.',
  explanation:'A tax holiday is a fixed period during which a new firm owes no income tax, used to attract investors who face heavy set-up costs early on. It is not the same as duty-free importing, which removes a charge on materials rather than on profit.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-018', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:3,
  question:'Why did duty-free import of raw materials matter so much to an EPZ garment factory?',
  options:['Almost all its cloth was bought abroad and left again as shirts',
           'Almost all its cloth was grown on the island and sold at home',
           'Almost all its profit came from selling cloth to other factories',
           'Almost all its workers were paid in the currency of the buyer'],
  answer:'Almost all its cloth was bought abroad and left again as shirts',
  hint:'Ask how much of the factory\'s cost passes through customs before anything is sewn.',
  explanation:'A garment factory imports nearly everything it works with, so a duty on materials would be a tax on almost its whole cost base and the shirt would be too dear to sell abroad. Mauritius grew no cloth, and the factories sold garments rather than cloth.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-019', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:3,
  question:'Investors were promised that their factories would not be taken over by the state. Why was such a promise worth offering?',
  options:['A factory is a long investment that cannot be moved once built',
           'A factory pays no tax at all while the promise remains in force',
           'A factory must be owned by the state before it may export goods',
           'A factory earns nothing until the government has approved a sale'],
  answer:'A factory is a long investment that cannot be moved once built',
  hint:'Think about how easily an investor could walk away once the machines are installed.',
  explanation:'Once the building is up and the machines are bolted down the investor cannot simply leave, so the risk of losing everything has to be answered before they commit. The promise concerned ownership, not tax, and private ownership was the very point of the zone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-020', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:4,
  question:'A foreign firm will import cloth, sew shirts and ship them to Europe. Two countries offer it a site. Which difference should weigh most heavily in its choice?',
  options:['One charges no duty on imported cloth; the other charges duty',
           'One has a larger population of shoppers than the other has',
           'One grows more sugar cane on its land than the other does',
           'One has more public holidays in its calendar than the other'],
  answer:'One charges no duty on imported cloth; the other charges duty',
  hint:'Follow the firm\'s own costs and its own customers. Where do both of them sit?',
  explanation:'Every shirt is made from imported cloth and sold abroad, so a duty on cloth lands on every unit of cost while the local population never buys the product. The size of the home market and the sugar crop are irrelevant to a firm selling only to Europe.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-021', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:4,
  question:'A tax holiday brings in a factory that employs 600 people but pays no income tax for several years. How should a government judge whether the deal was worth making?',
  options:['Compare the tax given up with the wages and exports gained',
           'Compare the tax given up with the tax paid by sugar estates',
           'Count the factories that opened in the same year elsewhere',
           'Count the years the holiday runs and stop when they end'],
  answer:'Compare the tax given up with the wages and exports gained',
  hint:'A cost is only meaningful beside what it bought. What did the country actually receive?',
  explanation:'The holiday costs revenue but buys wages, foreign earnings and skills, so the judgement is a comparison between the two. What sugar estates pay, or how many factories opened elsewhere, tells you nothing about this particular bargain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-022', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:4,
  question:'A pupil argues that the EPZ succeeded because of cheap labour alone. Which fact most weakens that argument?',
  options:['Other countries with lower wages attracted far less investment',
           'Wages in the zone were paid monthly rather than by the week',
           'Most of the workers in the early zone factories were women',
           'The zone was created by an Act passed by Parliament in 1970'],
  answer:'Other countries with lower wages attracted far less investment',
  hint:'To test a single-cause claim, look for a place where that cause exists without the result.',
  explanation:'If low wages were sufficient the poorest countries would have drawn the most factories, and they did not — stability, duty-free inputs and preferential access to Europe mattered too. The pay interval, the workforce and the date of the Act say nothing about causes.' }));

// ═══ g9sms-industrialisation · sectors_over_time — 023…034 ════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-023', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:1,
  question:'A sugar-cane planter, a fisherman and a market gardener all work in which sector of the economy?',
  options:['The primary sector','The secondary sector','The tertiary sector','The quaternary sector'],
  answer:'The primary sector',
  hint:'Group the three of them by how close their work is to the raw material itself.',
  explanation:'All three take their product directly from the land or the sea, which is what defines the <b>primary sector</b>. The secondary sector turns those raw materials into goods, as a sugar mill or a textile factory does, and the tertiary sector provides services such as banking, transport and tourism.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-024', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:2,
  question:'An economy that depends on one single crop for nearly all its exports is called a ____ economy. Answer in one word.',
  answer:'monocrop', alsoAccept:['mono-crop','monoculture','single-crop'],
  hint:'The first part of the word is the Greek for "one".',
  explanation:'A monocrop economy leans on a single crop and therefore rises and falls with that crop\'s world price, which is the risk Mauritius carried in 1968. A diversified economy is the opposite condition.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-025', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:2,
  question:'A hotel receptionist, a bank clerk and a bus driver all work in which sector of the economy?',
  options:['The tertiary sector, which provides services',
           'The primary sector, which takes raw materials',
           'The secondary sector, which makes finished goods',
           'The informal sector, which is never recorded'],
  answer:'The tertiary sector, which provides services',
  hint:'Ask what these three people produce. Is it a material, an object, or something else?',
  explanation:'None of the three grows anything or manufactures anything; all three provide a service, which is the tertiary sector. The primary sector covers farming, fishing and mining, and the secondary sector covers factories.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-026', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:2,
  question:'Sugar provided about 25% of Mauritian GDP in 1970 and about 4% in 2010. By how many percentage points did its share fall?',
  answer:21,
  hint:'Subtract the later share from the earlier one; the answer is a number of points.',
  explanation:'25 - 4 = 21 percentage points. Note that this is a fall in SHARE, not proof that less sugar was produced: the rest of the economy grew far faster, so sugar became a smaller slice of a much larger cake.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-027', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:2,
  question:'Which pillar of the economy grew after tourism, with the Stock Exchange opening in 1989?',
  options:['Banking and financial services',
           'Sugar milling and refining',
           'Deep-sea mineral extraction',
           'Heavy shipbuilding and repair'],
  answer:'Banking and financial services',
  hint:'A stock exchange serves firms that deal in money rather than in goods.',
  explanation:'The opening of the Stock Exchange in 1989 belongs to the growth of banking and financial services, the pillar that followed tourism. Sugar was the oldest pillar, and Mauritius has never had mineral extraction or shipbuilding on that scale.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-028', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:3,
  question:'Why does an economy with four pillars face less risk than one with a single pillar?',
  options:['A fall in one market can be offset by earnings from the others',
           'A fall in one market cannot happen once there are four of them',
           'Four pillars always earn more money than a single one can earn',
           'Four pillars remove the need to trade with any other countries'],
  answer:'A fall in one market can be offset by earnings from the others',
  hint:'Diversifying does not prevent bad news. Ask what it does to the effect of bad news.',
  explanation:'Spreading earnings means one bad year for sugar or for textiles no longer sinks the whole country, because other sectors keep earning. Diversifying cannot stop a market falling, does not guarantee higher earnings, and makes trade more important rather than less.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-029', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:3,
  question:'Sugar\'s share of GDP fell sharply between 1970 and 2010. What does that fall NOT prove on its own?',
  options:['That the amount of sugar produced each year actually fell',
           'That other parts of the economy were growing more quickly',
           'That sugar mattered less to the economy than it once did',
           'That the economy had become less dependent on one crop'],
  answer:'That the amount of sugar produced each year actually fell',
  hint:'A share is a fraction. Which part of that fraction could have changed?',
  explanation:'A share can fall simply because everything else grew faster, so the sugar crop itself may have held steady or even risen. The other three statements all follow directly from a smaller share, which is why they are not the answer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-030', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:4,
  question:'A table shows sugar at 25% of GDP in 1970 and 4% in 2010, while total GDP grew many times over. A pupil concludes "sugar production collapsed". How should you reply?',
  options:['The share fell, but the crop itself may barely have changed',
           'The share fell, so the crop must have fallen by the same amount',
           'The share fell, which means the total GDP figure must be wrong',
           'The share fell, therefore no sugar at all is grown any longer'],
  answer:'The share fell, but the crop itself may barely have changed',
  hint:'Two quantities are moving here. Separate the size of the slice from the size of the cake.',
  explanation:'When the rest of the economy multiplies, sugar can hold its output and still shrink as a share, so the conclusion does not follow from the table. Nothing in the figures suggests the GDP data is wrong, and sugar is certainly still grown.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-031', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:4,
  question:'A government adviser must pick a new sector for a small island with no minerals, little spare land, and a workforce educated in English and French. Which choice fits those facts best?',
  options:['Offshore business services handled by telephone and computer',
           'Open-cast mining of metals for sale to foreign steel makers',
           'Large-scale cattle ranching for beef exports to Europe',
           'Heavy chemical plants covering several square kilometres'],
  answer:'Offshore business services handled by telephone and computer',
  hint:'Match the sector to the resources actually listed, and notice which ones are missing.',
  explanation:'Services need people and connections rather than land or ore, and a bilingual educated workforce is exactly the input they use — which is why Mauritius built financial and business services. The other three all demand minerals or large areas of land the island does not have.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-032', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:4,
  question:'Profits made by Mauritian families in sugar were later invested in EPZ factories. Why does that matter to the story of the Miracle?',
  options:['The money for the new sector came largely from the old one',
           'It shows that sugar estates were nationalised by the state',
           'It proves the export zone was funded only by foreign firms',
           'It explains why the sugar crop was abandoned after 1970'],
  answer:'The money for the new sector came largely from the old one',
  hint:'Ask where the capital for a brand-new industry has to come from in a poor country.',
  explanation:'A new industry needs capital, and Mauritius had some already accumulated in sugar, so local investors could build factories rather than wait for foreigners. That is the opposite of saying the zone was purely foreign-funded, and sugar continued after 1970.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-033', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:4,
  question:'An economy earns most of its foreign currency from one industry whose main customer is a single region. Which policy reduces its exposure most directly?',
  options:['Develop earnings from other industries and other regions',
           'Raise the tariff charged on all goods entering the country',
           'Encourage every firm to sell to that same region as well',
           'Reduce the wages paid to workers in the leading industry'],
  answer:'Develop earnings from other industries and other regions',
  hint:'Name the two things that are concentrated here, then ask which policy spreads both.',
  explanation:'Two concentrations create the risk — one industry and one market — so spreading across industries and regions is what lowers it. Sending more firms to the same customer deepens the exposure, while tariffs and wage cuts do not change who the buyers are.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-034', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:4,
  question:'Share of Mauritian workers by sector. <table><tr><td>Sector</td><td>1972</td><td>1990</td></tr><tr><td>Agriculture</td><td>30%</td><td>17%</td></tr><tr><td>Manufacturing</td><td>15%</td><td>36%</td></tr><tr><td>Services</td><td>55%</td><td>47%</td></tr></table> Which conclusion does this table support?',
  options:['Work moved out of the fields and into the factories',
           'Work moved out of the factories and into the fields',
           'Every sector employed a larger share by the later year',
           'Services employed more than half of workers in both years'],
  answer:'Work moved out of the fields and into the factories',
  hint:'Follow each row from the first column to the second before choosing.',
  explanation:'Agriculture drops from 30 to 17 while manufacturing climbs from 15 to 36, which is a move from field to factory. Shares cannot all rise together, and services fall below half by 1990, so the last two contradict the table.' }));

// ═══ g9sms-industrialisation · mauritian_miracle — 035…047 ════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-035', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:1,
  question:'Which of these does Mauritius NOT have, which is part of why its economic success is called a miracle?',
  options:['Large deposits of minerals or oil to sell abroad',
           'A harbour used by ships trading across the region',
           'A climate in which sugar cane grows well all year',
           'A population able to work in more than one language'],
  answer:'Large deposits of minerals or oil to sell abroad',
  hint:'Three of these Mauritius has always had. Look for the one it has never had.',
  explanation:'Mauritius has no oil and no minerals, which is why its growth is credited to policy rather than to resources. It does have a deep harbour at Port Louis, a cane-growing climate and a multilingual population, and all three were used.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-036', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:1,
  question:'The Mauritian Miracle is usually measured from the year Mauritius became independent. Write that year.',
  answer:1968,
  hint:'The date falls in March, and the country later became a republic on the same day of the year.',
  explanation:'Mauritius became independent on 12 March 1968, and the growth story is normally traced from there. It became a republic on 12 March 1992, which is a separate milestone in the same month.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-037', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:1,
  question:'Which of these is evidence that average incomes in Mauritius rose after independence?',
  options:['GDP per person grew many times over in about fifty years',
           'The number of islands in the republic rose over that time',
           'The area planted with sugar cane rose in every single year',
           'The population of the island doubled every ten years after'],
  answer:'GDP per person grew many times over in about fifty years',
  hint:'Income per person is a measure per head. Which option is measured that way?',
  explanation:'GDP per person divides national output by the number of people, so a large rise is direct evidence that the average income grew. Counting islands, cane fields or people says nothing about how much each person earns.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-038', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:2,
  question:'Reports written around 1961 predicted a grim future for Mauritius. What did they mainly fear?',
  options:['A fast-growing population on an island with one crop',
           'A shortage of workers to cut the sugar cane by hand',
           'A loss of the island\'s harbour to a neighbouring state',
           'A collapse of the world price of tea and of coconuts'],
  answer:'A fast-growing population on an island with one crop',
  hint:'The fear was about numbers of people set against the resources available to support them.',
  explanation:'The worry was that population was rising faster than a one-crop economy could support, leading to unemployment and unrest. There was no labour shortage in the cane fields, and tea and coconuts were never the mainstay of the economy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-039', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:2,
  question:'Which social change in the 1960s and 1970s helped to answer the fear of over-population?',
  options:['A family planning programme that lowered the birth rate',
           'A migration programme that brought in extra farm workers',
           'A housing programme that moved families into the towns',
           'A schooling programme that raised the leaving age to 18'],
  answer:'A family planning programme that lowered the birth rate',
  hint:'The fear concerned how fast the population was growing. What acts directly on that rate?',
  explanation:'Falling birth rates slowed population growth sharply, which turned a feared burden into a workforce the EPZ could employ. Bringing in workers would have added to numbers, and housing or schooling changes act on conditions rather than on the growth rate.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-040', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:2,
  question:'Investors often name political stability as a reason for choosing Mauritius. What does that phrase mean here?',
  options:['Governments change by election and the law is respected',
           'The same party has always governed since independence',
           'Elections are held only when the economy is doing well',
           'The government owns most of the factories in the country'],
  answer:'Governments change by election and the law is respected',
  hint:'Stability is about how power changes hands, not about who happens to hold it.',
  explanation:'Stability means an investor can rely on the rules and on peaceful, regular changes of government, which is what protects a long investment. It does not mean one party rules forever, and state ownership of factories is a separate matter altogether.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-041', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:3,
  question:'Why would industrial peace and good labour relations attract a foreign clothing manufacturer?',
  options:['Orders must be shipped on time or the customer is lost',
           'Workers can then be paid less than in other countries',
           'Factories may then be built without planning permission',
           'Imported materials then arrive free of any customs duty'],
  answer:'Orders must be shipped on time or the customer is lost',
  hint:'Think about what a clothing buyer in Europe needs above almost everything else.',
  explanation:'Garment buyers work to seasons and deadlines, so a factory that keeps running is worth more to them than one that is briefly cheaper. Industrial peace does not lower wages, remove planning rules or affect customs duty.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-042', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:3,
  question:'Mauritius spent heavily on free schooling long before the ICT sector existed. How did that spending pay off later?',
  options:['A literate bilingual workforce was ready when the work came',
           'School buildings were converted into offices for new firms',
           'Teachers were transferred into the new computer companies',
           'Fees collected from pupils funded the first computer network'],
  answer:'A literate bilingual workforce was ready when the work came',
  hint:'Ask what a service industry actually needs on the day it decides where to set up.',
  explanation:'Service and ICT firms need educated staff immediately, and an investment made twenty years earlier is what makes those staff available. Buildings, teachers and fees are not what such firms were looking for.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-043', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:4,
  question:'Another small island state with no minerals asks what Mauritius did. Which piece of advice follows most closely from the Mauritian experience?',
  options:['Build the skills and the rules that draw investors in',
           'Wait for a valuable resource to be found underground',
           'Protect every local factory and stop importing goods',
           'Grow one crop very well and sell it to one customer'],
  answer:'Build the skills and the rules that draw investors in',
  hint:'Look for the advice that matches what Mauritius actually lacked and what it actually built.',
  explanation:'Mauritius had nothing under the ground, so its growth came from education, stable institutions and openness to export markets, and that is the transferable lesson. Waiting for resources, closing the economy or deepening dependence on one crop are all the opposite of what happened.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-044', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:4,
  question:'One writer says Mauritius was simply lucky to be given preferential access to Europe. Which fact most strongly challenges that view?',
  options:['Other countries held the same access and grew far less',
           'The access was arranged through agreements with Europe',
           'Textiles were the main goods sent under that access',
           'Access to Europe was used for sugar as well as clothing'],
  answer:'Other countries held the same access and grew far less',
  hint:'To test a claim that one advantage explains everything, look for others who had that advantage.',
  explanation:'Preferential access was shared with many countries, so it cannot by itself explain why one of them did far better; what a country does with an advantage matters. The other statements describe the access rather than testing whether it was decisive.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-045', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:4,
  question:'A minister argues that because the Miracle happened once, the economy will keep growing by itself. What is the strongest objection?',
  options:['The advantages that drove it were temporary and have changed',
           'Growth in the past always guarantees growth in the future',
           'The economy has no pillars beyond sugar and textiles today',
           'Mauritius has never had to compete with any other country'],
  answer:'The advantages that drove it were temporary and have changed',
  hint:'Ask whether the conditions that produced the earlier growth are still in place today.',
  explanation:'Protected quotas ended, wages rose and new competitors appeared, so the conditions behind the earlier growth no longer hold and fresh ones must be built. The second option simply restates the minister\'s error, and the last two are factually wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-046', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:4,
  question:'GDP per person in two countries. <table><tr><td>Country</td><td>1968</td><td>2015</td></tr><tr><td>A</td><td>USD 260</td><td>USD 9 000</td></tr><tr><td>B</td><td>USD 400</td><td>USD 1 100</td></tr></table> What is the fairest statement?',
  options:['A started poorer and ended far richer than B did',
           'B started poorer and ended far richer than A did',
           'A and B grew at about the same rate over the period',
           'B grew faster because its starting figure was higher'],
  answer:'A started poorer and ended far richer than B did',
  hint:'Compare each country with its own starting point, then compare the two end points.',
  explanation:'A begins below B at USD 260 and finishes many times above it, which is exactly the pattern the Mauritian Miracle describes. A higher starting figure is not itself growth, and the two rates are plainly very different.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-047', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:4,
  question:'A pupil lists one cause of the Miracle: "the EPZ". Why is that answer incomplete even though the EPZ was important?',
  options:['The zone needed stability, schooling and markets to work',
           'The zone was set up long after the economy had already grown',
           'The zone employed almost nobody during the whole period',
           'The zone was closed down before the growth actually began'],
  answer:'The zone needed stability, schooling and markets to work',
  hint:'Ask what had to already exist before a single factory could open and keep running.',
  explanation:'The zone was the instrument, but it worked only because educated workers, stable rules and access to buyers were already in place, so the cause is a combination. The zone certainly opened before the growth and employed tens of thousands.' }));

// ═══ g9sms-industrial-impact · work_and_jobs — 048…059 ════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-048', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:1,
  question:'A worker sewing shirts in a garment factory works in which sector of the economy?',
  options:['The secondary sector, which makes goods',
           'The primary sector, which grows crops',
           'The tertiary sector, which sells services',
           'The public sector, which the state runs'],
  answer:'The secondary sector, which makes goods',
  hint:'Ask what leaves the building at the end of the day: a crop, an object, or a service.',
  explanation:'Manufacturing belongs to the secondary sector, which turns materials into finished goods. Growing cane is primary work and serving customers is tertiary; a factory may be privately or publicly owned, so that is a different classification altogether.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-049', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:2,
  question:'Many EPZ factories ran a double shift. What did that arrangement achieve?',
  options:['The machines were used for far more hours each day',
           'The workers were paid twice as much for each hour',
           'The factory closed for half of every working week',
           'The goods needed only half as much raw material'],
  answer:'The machines were used for far more hours each day',
  hint:'A shift system is about the machines and the clock, not about the rate of pay.',
  explanation:'Two teams working in turn keep expensive machinery running far longer, which spreads its cost and raises output from the same building. Shift work does not double pay rates, close the factory or reduce the cloth each shirt needs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-050', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:2,
  question:'Large numbers of women took EPZ factory jobs. What did this most often change inside the household?',
  options:['A second regular wage came into the home each month',
           'Households stopped spending any money on schooling',
           'Households moved away from the towns into the fields',
           'A single wage had to be shared among more people'],
  answer:'A second regular wage came into the home each month',
  hint:'Count the number of earners before and after, then ask what that does to the income.',
  explanation:'A wife or daughter in regular paid work adds a second income, which is why household spending on housing, schooling and food rose. Families spent more on schooling rather than less, and the movement was towards the towns and the factories.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-051', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:2,
  question:'A garment factory runs two shifts. The day shift has 180 workers and the night shift has 145. How many workers does the factory employ altogether?',
  answer:325,
  hint:'Add the two shifts; nothing here is being shared out or divided.',
  explanation:'180 + 145 = 325 workers. Both shifts are separate teams of people, so they add together; a common slip is to halve the total because the machines they use are the same ones.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-052', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:3,
  question:'When estate work declined, some cane workers still struggled to get factory jobs. What best explains that?',
  options:['Factory work needed different skills and training',
           'Factories were forbidden to employ estate workers',
           'Cane workers were all of retirement age by then',
           'Factory work was paid less than estate work was'],
  answer:'Factory work needed different skills and training',
  hint:'A job disappearing in one place does not automatically fit that worker into the next one.',
  explanation:'Machine sewing, quality control and shift discipline are not cane-cutting skills, so retraining stood between the two jobs. No law barred estate workers, they were not all elderly, and factory work generally paid more reliably than seasonal cutting.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-053', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:3,
  question:'Unemployment fell steeply through the 1980s and rose again after 2005. Which pair of causes fits that shape?',
  options:['EPZ hiring first, then textile factories closing later',
           'Sugar planting first, then sugar planting again later',
           'Tourism arrivals first, then tourism arrivals again',
           'School leaving first, then school building later on'],
  answer:'EPZ hiring first, then textile factories closing later',
  hint:'Name what was creating jobs in the first period and what removed them in the second.',
  explanation:'Thousands of garment jobs were created as the zone grew, and many were lost when protected quotas ended in 2005 and firms moved to lower-wage countries. The other pairs name one activity twice and so cannot explain both a rise and a fall.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-054', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'A garment firm in Mauritius finds its wage bill is now higher than a competitor\'s in a lower-wage country. Which response keeps the Mauritian factory viable WITHOUT cutting pay?',
  options:['Move into finer garments that earn a higher price each',
           'Make exactly the same shirts but in far larger numbers',
           'Ask the government to forbid imports of foreign shirts',
           'Wait for wages in the other country to rise by themselves'],
  answer:'Move into finer garments that earn a higher price each',
  hint:'If you cannot compete on cost per shirt, what else about the shirt could change?',
  explanation:'Moving up the quality ladder earns more per garment, so a higher wage can still be afforded — which is the route Mauritian firms actually took. Making more of the same cheap shirt keeps the firm in the very competition it is losing, and import bans do nothing for goods sold abroad.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-055', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'A textile worker\'s factory closes. She is offered a six-month course in hotel work or an immediate job cutting cane. Which argument best supports taking the course?',
  options:['Hotel work is growing while cane work keeps shrinking',
           'Hotel work is easier than cane work in every respect',
           'Cane work would have to be done far away from her home',
           'Cane work has never been available to women at all here'],
  answer:'Hotel work is growing while cane work keeps shrinking',
  hint:'Weigh the two jobs by where each sector is heading, not by how hard the work feels.',
  explanation:'Choosing a sector that is expanding gives the longer-lasting job, which is why retraining towards tourism and services made sense after 2005. Comparing how hard the work is, or making false claims about who may do it, does not address the worker\'s future.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-056', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'A pupil says: "EPZ jobs were bad jobs, so the zone did the country no good." Which reply is best supported by the evidence?',
  options:['Conditions were often poor, yet the jobs cut unemployment',
           'Conditions were always excellent, so the complaint is invented',
           'Conditions had no effect on the number of people employed',
           'Conditions were poor, so unemployment must have risen again'],
  answer:'Conditions were often poor, yet the jobs cut unemployment',
  hint:'Two things can be true at once. Hold the criticism and the result side by side.',
  explanation:'Long hours and low pay were real complaints, and the same factories moved tens of thousands out of unemployment, so the honest answer keeps both. Denying the complaints, or claiming unemployment rose, contradicts the record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-057', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'Factories later recruited workers from abroad while some Mauritians were still unemployed. Which explanation should be checked FIRST?',
  options:['Whether the vacant jobs matched the skills people had',
           'Whether the factories were built beside the main roads',
           'Whether the owners of the factories were foreign firms',
           'Whether the workers abroad spoke English or French'],
  answer:'Whether the vacant jobs matched the skills people had',
  hint:'An unfilled job and an unemployed person are only a puzzle if the two actually match.',
  explanation:'Unemployment beside vacancies usually means the skills, wages or locations on offer do not fit the people available, so that is the first thing to test. Ownership, road access and language are secondary to whether the worker can do the job at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-058', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'A minister proposes a large rise in the minimum wage for factory workers. Which consequence must be weighed alongside the benefit to workers?',
  options:['Some firms may move production to cheaper countries',
           'Workers will refuse to accept the higher wages offered',
           'The price of imported machinery will immediately fall',
           'Export buyers will pay more for the very same shirts'],
  answer:'Some firms may move production to cheaper countries',
  hint:'Follow the decision of the firm, not of the worker, and remember who its competitors are.',
  explanation:'A firm selling into a world market cannot simply pass a wage rise on to its buyers, so some relocate, which is exactly what happened as Mauritian wages rose. Workers do not turn down higher pay, and wages do not change machinery prices.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-059', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:4,
  question:'Share of workers by sector. <table><tr><td>Sector</td><td>1972</td><td>1990</td></tr><tr><td>Agriculture</td><td>30%</td><td>17%</td></tr><tr><td>Manufacturing</td><td>15%</td><td>36%</td></tr></table> A pupil says this proves farms employed fewer people in 1990. Why is that not certain?',
  options:['The total number of workers also grew over those years',
           'The two sectors are measured in different units here',
           'Agriculture is not counted as employment in a census',
           'The figures for 1990 were collected in a different month'],
  answer:'The total number of workers also grew over those years',
  hint:'A share is a fraction of a total. What else could have changed inside that fraction?',
  explanation:'If the workforce itself grew, a smaller share can still be the same number of people or more, so the fall in share does not settle the head count. Both rows are percentages of the same workforce, and agricultural work is certainly counted.' }));

// ═══ g9sms-industrial-impact · life_expectancy — 060…073 ══════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-060', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:1,
  question:'What does "life expectancy at birth" measure?',
  options:['The average number of years a newborn can expect to live',
           'The oldest age any person in the country has reached',
           'The number of babies born in the country each year',
           'The age at which most people stop working for pay'],
  answer:'The average number of years a newborn can expect to live',
  hint:'The word average matters here, and so does the word birth.',
  explanation:'It is an average taken over all newborns, which is why it falls when many babies die young and rises when they survive. The oldest person alive, the yearly birth count and the retirement age are all different measures.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-061', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:1,
  question:'Life expectancy in Mauritius was about 51 years in 1950 and about 71 years in 2000. By how many years did it rise?',
  answer:20,
  hint:'Take the earlier figure away from the later one.',
  explanation:'71 - 51 = 20 years. A rise of that size in half a century reflects malaria control, better nutrition, clean water and the fall in infant deaths rather than any single medical discovery.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-062', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:2,
  question:'Malaria was eradicated in Mauritius in the 1950s. Which measure attacks that disease at its source?',
  options:['Draining and spraying the water where mosquitoes breed',
           'Building larger hospitals in every district of the island',
           'Asking people to boil drinking water before they use it',
           'Vaccinating every schoolchild against the disease yearly'],
  answer:'Draining and spraying the water where mosquitoes breed',
  hint:'Follow the insect that carries the disease and ask where it begins its life.',
  explanation:'Malaria is carried by mosquitoes that breed in standing water, so removing that water removes the carrier. Hospitals treat people who are already ill, boiling water guards against waterborne diseases instead, and there was no such vaccination programme.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-063', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:2,
  question:'Which pair of state services does Mauritius provide free of charge, helping to raise the standard of living?',
  options:['Health care in public hospitals and schooling for all',
           'Housing for every family and electricity for all homes',
           'Transport for all travellers and telephones in homes',
           'Food for every household and clothing for schoolchildren'],
  answer:'Health care in public hospitals and schooling for all',
  hint:'Think of the two services for which a Mauritian family does not receive a bill.',
  explanation:'Free public health care and free education are the two pillars of Mauritian welfare provision, and both feed directly into longer, healthier lives. Housing, electricity, transport and food are paid for, though some are subsidised.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-064', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:2,
  question:'The safe disposal of human waste and rubbish, which prevents diseases such as typhoid, is called ____. Answer in one word.',
  answer:'sanitation',
  hint:'The word comes from the same root as "sanitary".',
  explanation:'Sanitation covers sewerage, drainage and waste disposal, and improving it was one of the cheapest ways Mauritius cut deaths from infectious disease. Clean piped water is closely related but is described as water supply rather than sanitation.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-065', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:3,
  question:'How can higher household incomes raise life expectancy even when no new medicine appears?',
  options:['Families afford better food, housing and clean water',
           'Families are given free medicines by their employers',
           'Doctors are able to work far longer hours each week',
           'Diseases become less infectious as incomes go upward'],
  answer:'Families afford better food, housing and clean water',
  hint:'Ask what a family buys first when its income rises, and what that does to health.',
  explanation:'Nutrition, shelter and clean water decide how many people fall ill in the first place, so income improves survival before any hospital is involved. Diseases do not change their nature with income, and longer doctor hours are not what happened.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-066', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:3,
  question:'Life expectancy rose while the birth rate fell. What follows for the shape of the population?',
  options:['The share of older people in the population increases',
           'The share of children in the population increases fast',
           'The total population must fall within a few years',
           'The number of births and deaths becomes exactly equal'],
  answer:'The share of older people in the population increases',
  hint:'Follow both changes together: more people living longer, and fewer being born.',
  explanation:'Fewer births narrow the base of the pyramid while longer lives widen the top, so the elderly share grows — which is why pensions and care for the old are now a planning issue. The total can still rise for decades, and nothing forces births to equal deaths.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-067', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'A district has a hospital but many mothers still lose babies in the first month of life. Which measure is likely to save the most lives there?',
  options:['Regular care and checks for mothers before the birth',
           'A second hospital building beside the existing one',
           'A campaign asking families to have more children',
           'A new road linking the district to the capital city'],
  answer:'Regular care and checks for mothers before the birth',
  hint:'Ask where the risk actually arises, and whether it is met before or after the birth.',
  explanation:'Most early infant deaths trace back to the pregnancy and the birth itself, so antenatal care and safe delivery act on the cause. A second building duplicates what exists, more births do not lower the death rate, and a road helps only those who reach it in time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-068', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'A pupil claims that hospitals alone explain the rise in Mauritian life expectancy. Which piece of evidence most weakens that claim?',
  options:['Deaths fell sharply when mosquito breeding sites were drained',
           'Hospitals employ more staff today than they did in the 1950s',
           'Hospitals are now found in every district across the island',
           'Doctors are trained for several years before they qualify'],
  answer:'Deaths fell sharply when mosquito breeding sites were drained',
  hint:'Look for a gain in survival that happened outside the hospital walls.',
  explanation:'Draining breeding sites is public health rather than hospital treatment, and it removed a major killer, so the cause was broader than hospitals. The other statements describe hospitals without testing whether they were the whole reason.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-069', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'Two countries over the same period. <table><tr><td>Country</td><td>Life expectancy</td><td>Infant deaths per 1 000</td></tr><tr><td>X</td><td>52 to 74</td><td>120 to 12</td></tr><tr><td>Y</td><td>60 to 63</td><td>40 to 34</td></tr></table> Which statement is best supported?',
  options:['X improved the health of its youngest people far more',
           'Y improved the health of its youngest people far more',
           'X and Y improved at about the same pace over the years',
           'Y began with worse infant survival than X began with'],
  answer:'X improved the health of its youngest people far more',
  hint:'Look at how far each infant-death figure travelled, not at which number is lower today.',
  explanation:'X cuts infant deaths from 120 to 12 and gains 22 years of life expectancy, while Y barely moves on either measure, so the gain is plainly X\'s. Y actually began with much better infant survival than X, which is why the last option is wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-070', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'As Mauritians live longer, deaths from diabetes and heart disease have become more prominent than deaths from infectious disease. What must a health ministry change?',
  options:['Focus on diet, exercise and long-term care of patients',
           'Focus on vaccinating every newborn child once again',
           'Focus on draining standing water across the island',
           'Focus on building isolation wards for infected people'],
  answer:'Focus on diet, exercise and long-term care of patients',
  hint:'Match the response to the kind of illness that now causes most of the deaths.',
  explanation:'Non-communicable diseases build up over years and are managed through diet, exercise and continuing treatment rather than by controlling an infection. Vaccination, drainage and isolation all target infectious disease, which is no longer the main killer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-071', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'A government must plan for a population in which the elderly share is rising. Which pair of costs should it expect to grow?',
  options:['Pensions to pay and long-term health care to provide',
           'Primary school places and childhood vaccination stocks',
           'Maternity wards to staff and baby clinics to open',
           'Playgrounds to build and youth sports halls to equip'],
  answer:'Pensions to pay and long-term health care to provide',
  hint:'Follow the age group that is growing, and ask what the state spends on that group.',
  explanation:'An older population draws more pension payments and more continuing medical care, which is the main effect of ageing on public spending. School places, maternity wards and playgrounds all serve the young, whose share is falling.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-072', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'A family\'s income doubles after both parents find factory work. Which change is most likely to lengthen their children\'s lives?',
  options:['Better food and a dry house with clean water',
           'A television set and a radio for the household',
           'Longer working hours for both of the parents',
           'A larger number of children in the household'],
  answer:'Better food and a dry house with clean water',
  hint:'Sort the possible purchases by which one acts directly on a child\'s health.',
  explanation:'Nutrition, shelter and clean water decide whether a child survives illness, so those purchases show up in survival figures. A television changes comfort rather than health, and longer hours or more children do not lengthen a child\'s life.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-073', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:4,
  question:'Two villages have the same average income. One has piped water and a sewer; the other has neither. What would you expect to find?',
  options:['Fewer deaths from stomach illness in the first village',
           'Fewer deaths from stomach illness in the second village',
           'The same number of such deaths in both of the villages',
           'More births recorded each year in the second village'],
  answer:'Fewer deaths from stomach illness in the first village',
  hint:'Income is held equal on purpose, so look at the one thing that differs.',
  explanation:'Piped water and sewerage break the route by which typhoid and diarrhoeal disease spread, so the village with them loses fewer people even at the same income. Holding income constant is what isolates sanitation as the cause.' }));

// ═══ g9sms-industrial-impact · environment_impact — 074…087 ═══════════════

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-074', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:1,
  question:'Waste liquid released from a factory into a river or the sea is called ____. Answer in one word.',
  answer:'effluent',
  hint:'The word describes something that flows out.',
  explanation:'Effluent is the liquid waste discharged by a factory, and untreated effluent is what pollutes rivers and lagoons. Emissions, by contrast, are what a factory releases into the air.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-075', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:1,
  question:'What is a landfill?',
  options:['A prepared site where waste is buried',
           'A prepared site where waste is burned',
           'A prepared site where goods are stored',
           'A prepared site where water is cleaned'],
  answer:'A prepared site where waste is buried',
  hint:'The word joins what is done to a piece of ground with the ground itself.',
  explanation:'A landfill is an engineered site for burying waste, and on a small island the space for one is very limited, which is why recycling matters so much in Mauritius. Burning waste happens in an incinerator instead.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-076', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:2,
  question:'Before a large factory is built, a study of its likely effects on the surroundings must be produced. What is that study called?',
  options:['An environmental impact assessment',
           'An economic investment appraisal',
           'An employment and training plan',
           'An industrial safety inspection'],
  answer:'An environmental impact assessment',
  hint:'The name says what is being examined and what is being measured about it.',
  explanation:'An environmental impact assessment sets out what a project will do to water, air, land and habitat before permission is given, so the harm can be reduced or the project refused. The other three examine money, staff and workplace safety rather than the surroundings.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-077', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:2,
  question:'Why does separating glass, paper and plastic at home help a small island?',
  options:['Less waste has to be buried in scarce landfill space',
           'Less waste is produced by the households in the first place',
           'Less water is needed by the factories on the island',
           'Less electricity is used by homes during the evening'],
  answer:'Less waste has to be buried in scarce landfill space',
  hint:'Sorting does not change how much is thrown away. Ask what it changes about where it goes.',
  explanation:'Separated material can be recycled instead of buried, which stretches the life of a landfill that cannot easily be replaced on a small island. Sorting does not by itself reduce how much is thrown away, nor does it touch water or electricity use.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpb-078', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:2,
  question:'A factory sends 480 tonnes of waste to landfill each year. After it starts recycling, 3 out of every 8 tonnes are recycled instead. How many tonnes now go to landfill?',
  answer:300,
  hint:'Work out the recycled share first, then take it away from the original total.',
  explanation:'Three eighths of 480 is 180 tonnes recycled, so 480 - 180 = 300 tonnes are still buried. A common slip is to answer 180, which is the amount diverted rather than the amount remaining.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-079', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:3,
  question:'Why does polluting a lagoon damage two industries at once in Mauritius?',
  options:['Tourists avoid dirty water and fish stocks fall as well',
           'Factories close whenever a lagoon is declared polluted',
           'Sugar cane cannot be irrigated from a polluted lagoon',
           'Ships are unable to enter a harbour beside a lagoon'],
  answer:'Tourists avoid dirty water and fish stocks fall as well',
  hint:'Name the two industries that both depend on the same stretch of water.',
  explanation:'A lagoon is the resource on which both beach tourism and inshore fishing depend, so one act of pollution takes income from both. Cane is not irrigated with sea water, and harbour access is unaffected by lagoon water quality.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-080', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:3,
  question:'Building a factory estate on cane land carries a double cost. What is the second cost, beyond the loss of this year\'s crop?',
  options:['The land can never easily be returned to farming',
           'The factory must import all of its raw materials',
           'The workers must travel further to reach their jobs',
           'The sugar mill nearby is obliged to close as well'],
  answer:'The land can never easily be returned to farming',
  hint:'Think about what happens to the soil once concrete and buildings sit on it.',
  explanation:'Once land is built over it is effectively lost to agriculture for good, so the country gives up not just this year\'s crop but every future one — a serious matter where land is scarce. Imports, travel and mill closures are separate issues that do not follow from the building itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-081', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'A firm plans a factory on a river a short way upstream of a lagoon used by hotels and fishermen. Which condition should the permit insist on FIRST?',
  options:['That all effluent is treated before it enters the river',
           'That the factory building is painted to match the coast',
           'That the factory employs workers from nearby villages',
           'That the factory keeps its gates closed after nightfall'],
  answer:'That all effluent is treated before it enters the river',
  hint:'Trace the water from the factory down to the people who use the lagoon.',
  explanation:'Whatever leaves the factory in its water reaches the lagoon and everyone who depends on it, so treatment is the condition that prevents the harm. Paint, local hiring and opening hours may all be desirable but none of them protects the water.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-082', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'A pupil says tourism is a clean industry with no environmental cost. Which observation challenges that best?',
  options:['Hotels use large amounts of water and produce waste',
           'Hotels employ many staff drawn from nearby villages',
           'Hotels are built mainly along the coasts of the island',
           'Hotels charge visitors more during the busiest season'],
  answer:'Hotels use large amounts of water and produce waste',
  hint:'Follow what a hotel consumes and what it leaves behind, not what it earns or employs.',
  explanation:'Water use, sewage, solid waste and building on the coast all carry environmental costs, so tourism is cleaner than heavy industry rather than costless. Employment and pricing are economic facts that say nothing about the environment.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-083', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'A small island must choose between enlarging its only landfill and building an incinerator. Which question matters most in deciding?',
  options:['What each option does to air, land and long-term cost',
           'Which option has the shorter name in official papers',
           'Which option was chosen by the largest nearby country',
           'What colour the new buildings would be painted outside'],
  answer:'What each option does to air, land and long-term cost',
  hint:'A choice between two waste systems is judged on what each one costs and what each one pollutes.',
  explanation:'Burning shifts the problem towards air quality and ash while burying consumes scarce land, so the decision rests on comparing those effects and the money over many years. Copying a neighbour with different land and different waste is not a reason.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-084', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'Waste sent to landfill. <table><tr><td>Year 1</td><td>400 000 t</td><td>recycling 5%</td></tr><tr><td>Year 5</td><td>520 000 t</td><td>recycling 6%</td></tr></table> What does this suggest about the recycling policy?',
  options:['It is growing far too slowly to hold the total down',
           'It has already reversed the growth of buried waste',
           'It has caused the rise in the amount being buried',
           'It shows recycling makes no difference to any total'],
  answer:'It is growing far too slowly to hold the total down',
  hint:'Compare how much each of the two figures moved over the same five years.',
  explanation:'Waste rises by 120 000 tonnes while recycling gains a single percentage point, so the policy is being outrun rather than working. Recycling cannot cause waste to rise, and one point of progress is not evidence that recycling is useless.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-085', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'A factory can install effluent treatment for a large one-off cost, or pay a small fine each year that it pollutes. Which argument best supports installing the treatment?',
  options:['The damage to the lagoon is not undone by the fine',
           'The fine would be collected by the government offices',
           'The treatment plant would be built by a foreign firm',
           'The factory would be able to employ more workers'],
  answer:'The damage to the lagoon is not undone by the fine',
  hint:'Ask what the fine actually repairs, and compare it with what the treatment prevents.',
  explanation:'A fine transfers money but leaves the polluted lagoon exactly as it is, while treatment stops the harm occurring, and that harm falls on fishermen and hotels who receive none of the fine. Who collects the money or builds the plant is beside the point.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-086', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'Coral reefs protect Mauritian coasts from waves. A developer wants to dredge a channel through a reef for boats. Which consequence should be weighed most carefully?',
  options:['The shore behind the gap may suffer worse erosion',
           'The boats will reach the jetty a few minutes sooner',
           'The reef fish will become easier for divers to see',
           'The channel will need marking with buoys and lights'],
  answer:'The shore behind the gap may suffer worse erosion',
  hint:'The reef is doing a job already. Ask what stops when a gap is cut through it.',
  explanation:'A reef breaks the force of the waves, so a gap lets that energy reach the beach and speeds up erosion of the land behind it. Faster boat access, fish viewing and navigation marks are minor beside the loss of coastal protection.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-087', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:4,
  question:'Industrial estates, hotels and housing all compete for the same coastal land. Which approach best balances them over the long term?',
  options:['A land-use plan deciding in advance what goes where',
           'Allowing whichever developer applies first to build',
           'Refusing every new building request along the coast',
           'Leaving each village to settle the matter by itself'],
  answer:'A land-use plan deciding in advance what goes where',
  hint:'The problem is that three claims arrive on the same ground. What resolves that before it happens?',
  explanation:'Planning allocates the scarce coast deliberately, protecting some stretches and concentrating building elsewhere, which is what long-term balance requires. First-come building ignores the conflict, a total refusal ignores real needs, and village-by-village decisions cannot manage an island-wide resource.' }));

// ═══ g9sms-chagos-tromelin · chagos_history — 088…100 ═════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-088', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:1,
  question:'In which ocean does the Chagos Archipelago lie?',
  options:['The Indian Ocean','The Pacific Ocean','The Atlantic Ocean','The Southern Ocean'],
  answer:'The Indian Ocean',
  hint:'It lies in the same ocean as Mauritius, far to the north-east of it.',
  explanation:'The Chagos Archipelago lies in the central Indian Ocean, north-east of Mauritius, and that central position is part of why it is strategically valued. The Pacific and Atlantic are different oceans entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-089', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:1,
  question:'Before 1965 the Chagos Archipelago was administered as part of which territory?',
  options:['Mauritius','The Seychelles','Madagascar','The Maldives'],
  answer:'Mauritius',
  hint:'It was governed from the same colonial capital that governs the republic today.',
  explanation:'Chagos was administered as a dependency of Mauritius under British rule, which is the basis of the Mauritian argument that it was detached from an existing territory. The Seychelles lost different islands under the same arrangement, but Chagos was never theirs.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-090', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:2,
  question:'What was the main economic activity on the Chagos islands before the population was removed?',
  options:['Coconut plantations producing oil and dried flesh',
           'Sugar estates producing raw sugar for export abroad',
           'Tea gardens producing leaf for the British market',
           'Cotton fields producing fibre for European mills'],
  answer:'Coconut plantations producing oil and dried flesh',
  hint:'Think which crop grows readily on a low coral island with sandy soil.',
  explanation:'The islands lived by coconut plantations, whose products were shipped out and which employed the whole community. Sugar, tea and cotton all need soils and rainfall that low coral atolls cannot provide.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-091', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:2,
  question:'The dried coconut flesh that was the main export of the Chagos plantations is called ____. Answer in one word.',
  answer:'copra',
  hint:'It is the raw material from which coconut oil is pressed.',
  explanation:'Copra is dried coconut kernel, pressed for oil, and it was the product on which the Chagos economy and its employment rested. Coir, the fibre taken from the husk, is a different product of the same tree.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-092', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:2,
  question:'Besides Diego Garcia, which islands form part of the Chagos Archipelago?',
  options:['Peros Banhos and Salomon','Agalega and St Brandon','Rodrigues and Tromelin','Praslin and La Digue'],
  answer:'Peros Banhos and Salomon',
  hint:'Two of these lists name territories Mauritius holds today, and one names islands of the Seychelles.',
  explanation:'Peros Banhos and Salomon are Chagos atolls that also had settled populations before the removal. Agalega, St Brandon and Rodrigues are Mauritian territories outside Chagos, and Praslin and La Digue are Seychellois.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-093', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:2,
  question:'What name is given to the people born on the Chagos islands and to their descendants? Answer in one word.',
  answer:'Chagossians', alsoAccept:['Chagossian','Ilois'],
  hint:'The name is formed from the name of the islands themselves.',
  explanation:'The islanders are the Chagossians, known in older documents as the Ilois, and generations of them were born on the islands before 1965. Rodriguans, Agaleans and Seychellois come from other islands entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-094', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:3,
  question:'Mauritius argues that it could not freely consent to the detachment in 1965. What is the basis of that argument?',
  options:['It was still a colony and was negotiating its independence',
           'It had no government of its own in existence at that time',
           'It had already become a republic with its own president',
           'It was never consulted about the islands in any way at all'],
  answer:'It was still a colony and was negotiating its independence',
  hint:'Ask what Mauritius was seeking from Britain in 1965, and who held the power in that conversation.',
  explanation:'Consent given by a colony to the power that still rules it, while independence is the subject of the talks, is not free consent, and that is the heart of the Mauritian case. Mauritius did have a government and was consulted; it is the freedom of the agreement that is disputed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-095', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:3,
  question:'Why did the closing of the plantations matter so much to the removal of the Chagossians?',
  options:['It ended the only work and supplies the islands had',
           'It made the islands a protected nature reserve at once',
           'It raised the price paid for copra on world markets',
           'It forced Britain to build new housing on the islands'],
  answer:'It ended the only work and supplies the islands had',
  hint:'On a remote island, one employer usually means one source of everything.',
  explanation:'The plantation was the employer, the shop and the link to the supply ships, so closing it left people with no means of staying even before they were removed. It did not create a reserve, raise prices or lead to any housing being built.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-096', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:3,
  question:'Why do Chagossians insist that they were a settled population and not temporary workers?',
  options:['Families had been born and buried there for generations',
           'They had signed contracts lasting for one year at a time',
           'They had arrived only after the plantations were closed',
           'They travelled to the islands for a single season each year'],
  answer:'Families had been born and buried there for generations',
  hint:'The distinction rests on whether the islands were a workplace or a home.',
  explanation:'Births, marriages and burials across generations make a community rather than a workforce, which is why the removal is treated as the displacement of a people. Seasonal travel or one-year contracts would describe migrant labour, which is precisely what the Chagossians were not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-097', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:4,
  question:'A pupil says the detachment cannot be questioned because Mauritian representatives agreed to it in 1965. What is the strongest reply?',
  options:['An agreement made under pressure is not a free choice',
           'No Mauritian representative was present at those talks',
           'The agreement was written in a language nobody read',
           'Agreements between states have no legal meaning at all'],
  answer:'An agreement made under pressure is not a free choice',
  hint:'The dispute is not about whether an agreement exists. It is about the conditions in which it was made.',
  explanation:'The Mauritian case accepts that an agreement was reached and argues that a colony bargaining for its own independence was not free to refuse, which is what the ICJ later examined. Denying the meeting, or the value of agreements, misstates the record.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-098', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:4,
  question:'A researcher wants to show that Chagos was administered from Mauritius before 1965. Which source would be strongest?',
  options:['Colonial records listing Chagos under Mauritius',
           'A modern newspaper article about the islands dispute',
           'A tourist map printed for visitors to the Indian Ocean',
           'A school textbook summarising the history in one page'],
  answer:'Colonial records listing Chagos under Mauritius',
  hint:'Rank the sources by how close each one stands to the administration itself.',
  explanation:'Official records created at the time by the administration are primary evidence of how the islands were governed. Newspapers, maps and textbooks are later summaries that depend on those records and may simplify them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-099', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:4,
  question:'Britain also detached islands from the Seychelles in 1965 and returned them in 1976. Why is that significant for the Chagos argument?',
  options:['It shows such detachments could be and were reversed',
           'It shows the Chagos was never detached from anywhere',
           'It shows the Seychelles gave up its claim to Chagos',
           'It shows Britain gained no islands at all in that year'],
  answer:'It shows such detachments could be and were reversed',
  hint:'Compare the two cases and ask what the second one proves is possible.',
  explanation:'Returning those islands shows that the arrangement was not permanent by nature, which supports the argument that Chagos could be returned too. It does not touch the fact of the Chagos detachment, and the Seychelles never claimed Chagos.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-100', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:4,
  question:'Two accounts describe the pre-1965 islands: one calls them "a plantation with a labour force", the other "a homeland with a community". Why does the choice of words matter?',
  options:['It decides whether the removal displaced a people',
           'It decides which country owns the coconut plantations',
           'It decides how far the islands lie from Mauritius',
           'It decides whether the islands appear on modern maps'],
  answer:'It decides whether the removal displaced a people',
  hint:'Ask what each description implies about the people who were moved.',
  explanation:'Calling the islands a workplace implies workers who could be sent home, while calling them a homeland implies a population that was expelled, and the legal and moral weight of the case turns on that difference. Ownership, distance and mapping are unaffected by the wording.' }));

// ═══ g9sms-chagos-tromelin · expulsion_and_icj — 101…114 ══════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-101', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:1,
  question:'Between 1967 and 1973, what happened to the people living on the Chagos islands?',
  options:['They were removed from the islands altogether',
           'They were given new houses on the same islands',
           'They were offered work in new island schools',
           'They were joined by settlers from other islands'],
  answer:'They were removed from the islands altogether',
  hint:'The event is the reason the islands have no settled population today.',
  explanation:'The entire population was removed between 1967 and 1973, most of them taken to Mauritius and some to the Seychelles, which is why no civilian community remains. Nothing was built for them on the islands.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-102', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:1,
  question:'Give the three-letter abbreviation of the United Nations court, sitting at The Hague, that gave an advisory opinion on the Chagos Archipelago in 2019.',
  answer:'ICJ', alsoAccept:['I.C.J.','International Court of Justice'],
  hint:'The full name begins with the word that means "between nations".',
  explanation:'The International Court of Justice is the United Nations court that answers legal questions put to it by the General Assembly, and it did so on Chagos in 2019. It is not the same as the criminal court, which tries individuals rather than answering questions between states.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-103', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:2,
  question:'Where were most of the removed Chagossians taken?',
  options:['To Mauritius, with some going to the Seychelles',
           'To the Seychelles, with some going to Madagascar',
           'To Britain, with some going on to other countries',
           'To Diego Garcia, with some going to Peros Banhos'],
  answer:'To Mauritius, with some going to the Seychelles',
  hint:'They were landed in the territory from which the islands had been administered.',
  explanation:'Most were landed in Mauritius and a smaller number in the Seychelles, which is why a Chagossian community lives in Mauritius today. Some later settled in Britain, but that came long after the removal itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-104', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:2,
  question:'What conditions did most Chagossians meet on arrival in Mauritius?',
  options:['Poverty, poor housing and difficulty finding work',
           'Ready housing, steady work and a warm welcome',
           'Land grants on the coast and a fishing boat each',
           'Free passage onwards to Britain within a month'],
  answer:'Poverty, poor housing and difficulty finding work',
  hint:'They arrived without work, savings or prepared housing. What follows from that?',
  explanation:'Arriving with nothing into a country that already had high unemployment meant poverty, crowded housing and marginalisation, which is recorded in the community\'s own accounts and in later claims. No land, boats or onward passage were provided.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-105', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:2,
  question:'In 2019 the United Nations General Assembly voted on the ICJ opinion. What did that vote express?',
  options:['Strong support for the opinion by a large majority',
           'Rejection of the opinion by nearly all the members',
           'An even split between the members who took part',
           'A decision to send the question back to the court'],
  answer:'Strong support for the opinion by a large majority',
  hint:'The vote followed the court\'s finding rather than disagreeing with it.',
  explanation:'The General Assembly endorsed the opinion by a large majority, which gave the finding real political weight even though an advisory opinion is not binding. It was neither rejected, evenly split nor referred back.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-106', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:2,
  question:'What did the 2024 political agreement between the United Kingdom and Mauritius acknowledge?',
  options:['Mauritian sovereignty, with the base still operating',
           'British sovereignty, with the islanders returning at once',
           'American sovereignty, with Mauritius paid compensation',
           'Shared sovereignty, with the base closing within a year'],
  answer:'Mauritian sovereignty, with the base still operating',
  hint:'Two separate things are settled there: who holds the islands, and what continues on one of them.',
  explanation:'The agreement recognises Mauritian sovereignty over the archipelago while allowing the military base on Diego Garcia to continue under arrangements agreed between the parties. Sovereignty was not transferred to Britain or the United States, and the base was not closed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-107', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:3,
  question:'What is the difference between an advisory opinion and a binding judgment?',
  options:['An advisory opinion states the law but compels nobody',
           'An advisory opinion is delivered by a court of one judge only',
           'An advisory opinion applies only to the country that asked it',
           'An advisory opinion may be given only in criminal matters'],
  answer:'An advisory opinion states the law but compels nobody',
  hint:'Ask what the court is being asked to do: settle a case between parties, or answer a question?',
  explanation:'An advisory opinion answers a legal question put by a United Nations organ and carries great authority without creating an enforceable order, which is why the dispute continued after 2019. The court sits as a full bench, and advisory opinions are limited neither to one country nor to criminal law.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-108', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:3,
  question:'Why did the 2019 opinion matter politically even though it bound nobody?',
  options:['It settled the legal argument in the eyes of most states',
           'It ordered the immediate return of every Chagossian home',
           'It placed a fine on the United Kingdom for each year',
           'It transferred the military base to Mauritian command'],
  answer:'It settled the legal argument in the eyes of most states',
  hint:'Ask what changes once the world\'s senior court has answered a disputed legal question.',
  explanation:'Once the court had stated the law, other states could act on a settled view, and the General Assembly did so, which shifted the diplomatic balance decisively. The opinion imposed no fine, ordered no returns and changed no military arrangements.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-109', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:3,
  question:'The ICJ found that the decolonisation of Mauritius had not been lawfully completed. Which principle was it applying?',
  options:['That a people decide the future of their whole territory',
           'That a colony may never become independent before an election',
           'That a court may redraw the borders of independent countries',
           'That military bases are forbidden on small island territories'],
  answer:'That a people decide the future of their whole territory',
  hint:'The principle is the one that governs how a colony becomes a country.',
  explanation:'Self-determination requires that a colonial territory pass to independence whole, so detaching part of it beforehand leaves the process incomplete. The court was not redrawing borders, banning bases or ruling on how elections are held.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-110', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
  question:'A pupil asks why the Chagossians did not simply return after 1973. Which answer is correct?',
  options:['Entry to the islands was controlled and they were refused',
           'The islands had become uninhabitable after a great storm',
           'No shipping route has ever existed in that ocean area',
           'They had each been granted farmland somewhere else'],
  answer:'Entry to the islands was controlled and they were refused',
  hint:'Ask who controlled access to the islands after the removal.',
  explanation:'The archipelago was closed as a military territory and Chagossians were not permitted to return, which is why the question became a legal and diplomatic one rather than a practical one. The islands remain habitable in principle and are reachable by sea.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-111', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
  question:'Compensation was paid to some Chagossians in the 1970s and 1980s, yet the dispute continued. Which explanation fits best?',
  options:['Money did not settle the right to return or sovereignty',
           'The payments were made to the wrong country by mistake',
           'Compensation is forbidden in any dispute between states',
           'The payments were later returned in full by the recipients'],
  answer:'Money did not settle the right to return or sovereignty',
  hint:'List what the community was asking for, then ask which of those a payment can provide.',
  explanation:'Payments addressed hardship but left both the right to return and the ownership of the islands untouched, so the two central claims survived. The money was paid deliberately and was not returned.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-112', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
  question:'A commentator says: "The ICJ opinion changed nothing, because the United Kingdom did not leave." How would you correct that?',
  options:['It changed the legal position even if not the situation',
           'It changed nothing at all, so the comment is accurate',
           'It changed the ownership of the base on the same day',
           'It changed the population of the islands immediately'],
  answer:'It changed the legal position even if not the situation',
  hint:'Separate what happened on the ground from what happened in law and in diplomacy.',
  explanation:'An authoritative statement of the law reshaped how other states, and later the parties themselves, approached the question, even though nothing moved on the islands in 2019. Treating "nothing visible happened" as "nothing changed" misses that shift.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-113', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
  question:'Mauritius pressed its claim through the United Nations rather than by force. Which advantage does that route give a small state?',
  options:['Its argument is judged by rules rather than by strength',
           'Its argument is decided faster than by any other route',
           'Its argument costs nothing at all to prepare or present',
           'Its argument cannot be opposed by any larger country'],
  answer:'Its argument is judged by rules rather than by strength',
  hint:'Ask what a small country has more of in a legal forum than on a battlefield.',
  explanation:'Legal and diplomatic forums weigh arguments and principles, which is where a small state can match a large one, and that is precisely why Mauritius chose that route. The process is slow and costly, and larger states can and do oppose a claim there.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-114', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
  question:'A group demands both the return of the islanders and the continued operation of the base. Why is that combination difficult rather than impossible?',
  options:['Security rules and resettlement must be reconciled',
           'The islands are too small to hold any people at all now',
           'International law forbids civilians near any military site',
           'The two demands are made by entirely different countries'],
  answer:'Security rules and resettlement must be reconciled',
  hint:'Ask what would have to be arranged on the ground for both things to happen at once.',
  explanation:'Resettlement on outer islands alongside a working base requires agreement on access, security and services, which is demanding but has been discussed rather than ruled out. International law does not ban civilians near military installations, and both demands come from the same side of the dispute.' }));

// ═══ g9sms-chagos-tromelin · diego_garcia — 115…128 ═══════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-115', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:1,
  question:'Diego Garcia is which island of the Chagos Archipelago?',
  options:['The largest of them all','The smallest of them all','The most northerly one','The most southerly one'],
  answer:'The largest of them all',
  hint:'It is the one big enough to hold an airfield and a sheltered anchorage.',
  explanation:'Diego Garcia is the largest island of the archipelago, which is why it could take an airfield, a deep lagoon anchorage and a base. The other islands are far smaller and have no settled population today.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-116', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:1,
  question:'What is on Diego Garcia today?',
  options:['A military base','A tourist resort','A fishing village','A research city'],
  answer:'A military base',
  hint:'It is the reason ordinary visitors may not go there.',
  explanation:'Diego Garcia holds a military base used by the United States under an agreement with the United Kingdom, and the island is closed to ordinary visitors. There is no resort, village or town on it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-117', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
  question:'Which two countries are parties to the arrangement under which the Diego Garcia base operates?',
  options:['The United Kingdom and the United States',
           'The United Kingdom and France together',
           'The United States and Mauritius jointly',
           'Mauritius and the Seychelles between them'],
  answer:'The United Kingdom and the United States',
  hint:'One party is the state that administered the territory; the other is the state that runs the base.',
  explanation:'Britain, which administered the territory, agreed that the United States could use the island for defence purposes, and the base is operated by the United States. France, Mauritius and the Seychelles are not parties to that arrangement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-118', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
  question:'Why is a lagoon useful on an island such as Diego Garcia?',
  options:['It gives ships sheltered deep water to anchor in',
           'It gives aircraft a long flat surface for landing',
           'It gives farmers fresh water for their plantations',
           'It gives builders the sand needed for making roads'],
  answer:'It gives ships sheltered deep water to anchor in',
  hint:'Think what a ring of reef around calm water offers to a ship.',
  explanation:'The atoll lagoon is a natural sheltered harbour, which is a large part of the island\'s military value. Aircraft need a built runway on land, and a lagoon holds salt water that is of no use for farming.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-119', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
  question:'Why is the position of Diego Garcia described as strategic?',
  options:['It sits in the middle of the Indian Ocean sea routes',
           'It sits beside the shipping routes of the North Atlantic',
           'It sits within sight of the southern coast of Mauritius',
           'It sits at the point where two great rivers meet the sea'],
  answer:'It sits in the middle of the Indian Ocean sea routes',
  hint:'Look at what surrounds it, and how far it can reach in every direction.',
  explanation:'A base in the central Indian Ocean is within reach of Africa, the Middle East and southern Asia at once, which is what makes the position valuable. It is nowhere near the Atlantic or Mauritius, and coral atolls have no rivers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-120', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
  question:'What happened to the people of Diego Garcia before the base was developed?',
  options:['They were removed from the island altogether',
           'They were employed to build the new facilities',
           'They were moved to the north of the same island',
           'They were left in place under new restrictions'],
  answer:'They were removed from the island altogether',
  hint:'The island has no civilian population today. Work backwards from that.',
  explanation:'The population was removed, which is the human fact at the centre of the Chagos dispute, and no civilian community remained. They were neither relocated within the island nor kept on as residents.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-121', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:3,
  question:'Why did a remote, almost empty island suit a military base better than a populated one?',
  options:['Operations could be kept secure and largely unobserved',
           'Building materials were already available on the island',
           'Skilled workers were plentiful on the island beforehand',
           'Food and fuel could be produced locally on the island'],
  answer:'Operations could be kept secure and largely unobserved',
  hint:'Ask what a base gains from having nobody else nearby.',
  explanation:'Isolation and the absence of a resident population make operations easier to keep secure, which is why such sites are chosen. Everything else, from materials to food and fuel, had to be shipped in at great cost.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-122', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:3,
  question:'Mauritius has said the base could remain even under Mauritian sovereignty. Why is that position useful to its claim?',
  options:['It separates the question of ownership from security',
           'It proves that the islands were never detached at all',
           'It removes the need for any agreement with Britain',
           'It shows that the Chagossians no longer wish to return'],
  answer:'It separates the question of ownership from security',
  hint:'Ask which objection the position is designed to answer.',
  explanation:'By offering to accommodate the base, Mauritius removes defence as a reason to refuse its sovereignty claim, leaving the legal question standing on its own. It neither denies the detachment nor speaks for what the Chagossians want.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-123', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:3,
  question:'Why is Diego Garcia treated differently from the other Chagos islands in discussions about resettlement?',
  options:['It is the island on which the base actually stands',
           'It is the only island with any fresh water at all',
           'It is the island furthest from the rest of the group',
           'It is the only island that was ever inhabited before'],
  answer:'It is the island on which the base actually stands',
  hint:'Ask which island has something on it that the others do not.',
  explanation:'The base occupies Diego Garcia, so proposals for resettlement have generally concerned the outer islands instead. The other islands had populations too, and distance and water supply are not the reason for the distinction.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-124', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:4,
  question:'A negotiator must design an arrangement in which sovereignty passes to Mauritius while the base continues. Which pair of questions matters most?',
  options:['How long the arrangement lasts and who controls access',
           'What the islands are called and which flag is flown there',
           'How many aircraft are based there and of what type',
           'Which language is used in the agreement documents'],
  answer:'How long the arrangement lasts and who controls access',
  hint:'Think of the terms that decide what each side actually gets, and for how long.',
  explanation:'Duration and control of access determine whether the sovereignty is real and whether the base is secure, so they are the heart of any such deal. Names, flags, aircraft types and drafting language are details beside them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-125', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:4,
  question:'A pupil claims that the base proves the islands belong to the United States. Why is that reasoning wrong?',
  options:['Using a place by agreement is not the same as owning it',
           'The United States has never had any base on the island',
           'A base may only ever be built on a country\'s own soil',
           'The agreement was signed by Mauritius at independence'],
  answer:'Using a place by agreement is not the same as owning it',
  hint:'Separate the right to use something from the right to own it.',
  explanation:'A state can use a facility under an agreement with whoever holds the territory, and that use creates no title, which is why the sovereignty question remained open. There certainly is a base, and Mauritius was not a party to the 1960s arrangement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-126', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:4,
  question:'Why might other Indian Ocean states take an interest in the future of Diego Garcia?',
  options:['A base there affects security across the whole region',
           'The island supplies most of the fish eaten in the region',
           'Shipping to the region must call at the island to refuel',
           'The island sets the price of the region\'s main exports'],
  answer:'A base there affects security across the whole region',
  hint:'Ask what one military facility in the middle of an ocean means for everyone around it.',
  explanation:'A major base at the centre of the ocean shapes the security calculations of every state around it, which is why the dispute is regional as well as bilateral. The island supplies no fish, no fuel and no prices to anybody.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-127', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:4,
  question:'Resettlement studies for the outer Chagos islands have raised practical difficulties. Which difficulty is genuine rather than invented?',
  options:['Water, power, jobs and transport must all be built',
           'The islands would first have to be raised above sea level',
           'No person born elsewhere could legally live on an atoll',
           'The coconut palms would have to be removed completely'],
  answer:'Water, power, jobs and transport must all be built',
  hint:'Ask what a community needs on an island that has stood empty for fifty years.',
  explanation:'An abandoned atoll has no services, no employment and no regular transport, so resettlement means building a working settlement from nothing, and the cost of that is the real argument. The other three statements are untrue of the islands and of the law.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-128', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:4,
  question:'A newspaper writes that "the base and the islanders cannot both be accommodated". Which consideration most directly tests that claim?',
  options:['Whether the outer islands lie far from the base itself',
           'Whether the base has an airfield and a deep lagoon',
           'Whether the islanders speak the language of the base',
           'Whether the archipelago appears on published sea charts'],
  answer:'Whether the outer islands lie far from the base itself',
  hint:'Ask whether the two things would actually have to be in the same place.',
  explanation:'Resettlement proposals concern Peros Banhos and Salomon, which are well away from Diego Garcia, so distance is what decides whether the claim holds. The base facilities, the language spoken and the charts do not bear on whether both can exist.' }));

// ═══ g9sms-chagos-tromelin · tromelin — 129…144 ═══════════════════════════

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-129', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:1,
  question:'Which country administers Tromelin today?',
  options:['France','Britain','India','Madagascar'],
  answer:'France',
  hint:'The same country once ruled Mauritius under the name Ile de France.',
  explanation:'France administers Tromelin, while Mauritius claims sovereignty over it, which is why the two states have discussed managing the island together. Britain, India and Madagascar make no claim to it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-130', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:1,
  question:'Roughly where does Tromelin lie in relation to Mauritius?',
  options:['About 500 km to the north','About 500 km to the south','About 50 km to the north','About 5 000 km to the east'],
  answer:'About 500 km to the north',
  hint:'It is a short flight away, on the side of Mauritius nearer the equator.',
  explanation:'Tromelin lies about 500 km north of Mauritius, close enough to be treated as part of the same maritime neighbourhood. It is neither a few kilometres away nor thousands of kilometres distant.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-131', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:1,
  question:'What kind of island is Tromelin?',
  options:['A tiny low sandy island with no harbour',
           'A large mountainous island with forests',
           'A long volcanic island with a deep bay',
           'A wide coral island with several towns'],
  answer:'A tiny low sandy island with no harbour',
  hint:'Its size explains why nobody has ever settled there permanently.',
  explanation:'Tromelin is a very small, flat sand island with no natural harbour, which is why it has never held a permanent population. It is neither mountainous nor large enough for towns.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpb-132', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:1,
  question:'Tromelin is administered by France, and its sovereignty is also claimed by ____. Give the name of that country in one word.',
  answer:'Mauritius',
  hint:'The claiming state lies about 500 km to the south of the island.',
  explanation:'Mauritius claims Tromelin, arguing that it was a dependency of Mauritius when Britain took the colony in 1814, while France administers the island and claims it as well. That disagreement is what the co-management talks were about.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-133', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:2,
  question:'On what basis does Mauritius claim Tromelin?',
  options:['It was a dependency of Mauritius when Britain took over',
           'It was bought from France by Mauritius after independence',
           'It lies closer to Mauritius than to any other country',
           'It was settled by Mauritian fishermen in the last century'],
  answer:'It was a dependency of Mauritius when Britain took over',
  hint:'The claim rests on how the island was classified at the time of a treaty.',
  explanation:'Mauritius argues that Tromelin passed to Britain in 1814 as a dependency of Mauritius and so belongs to the republic today. It was never purchased, and proximity or fishing use would not by themselves establish sovereignty.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-134', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:2,
  question:'What does France point to as the basis of its own claim to Tromelin?',
  options:['Its long and continuous administration of the island',
           'A permanent civilian population living on the island',
           'A large port used by ships crossing the whole ocean',
           'A protected settlement of Mauritian families there'],
  answer:'Its long and continuous administration of the island',
  hint:'The French case rests on what France has actually done there, over a long period.',
  explanation:'France points to long, continuous administration, including the station it maintains, as the basis of its title. There has never been a permanent civilian population, a port or a Mauritian settlement on the island.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-135', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:2,
  question:'What is operated on Tromelin today?',
  options:['A weather station recording conditions at sea',
           'A commercial airport serving the whole region',
           'A hotel receiving visitors by boat each week',
           'A fishing port used by the whole of the region'],
  answer:'A weather station recording conditions at sea',
  hint:'Think what a tiny uninhabited island in a cyclone region is most useful for.',
  explanation:'A meteorological station on Tromelin records conditions that matter for cyclone warnings across the region, and its staff are rotated rather than settled. The island is far too small for an airport, a hotel or a port.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-136', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:2,
  question:'What happened on Tromelin in the eighteenth century that gave the island its place in history?',
  options:['Enslaved people were abandoned there for many years',
           'A naval battle between two empires was fought there',
           'A treaty dividing the Indian Ocean was signed there',
           'A trading post supplying passing ships was built there'],
  answer:'Enslaved people were abandoned there for many years',
  hint:'The event concerns the survivors of a shipwreck who were left behind on the sand.',
  explanation:'A French ship carrying enslaved Malagasy people was wrecked on the island and the survivors were left there for about fifteen years before a rescue, which is why the island is studied by historians and archaeologists. No battle or treaty took place there.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-137', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:2,
  question:'How did the island come by the name Tromelin?',
  options:['From the French officer who rescued the survivors',
           'From the French king who ruled at the time of it',
           'From the ship that was wrecked on its reef in 1761',
           'From the Malagasy word for a low sandy island'],
  answer:'From the French officer who rescued the survivors',
  hint:'The name honours the person who arrived at the end of the story, not the beginning.',
  explanation:'The island is named after the French naval officer who commanded the vessel that finally took the survivors off in 1776. The wrecked ship, the monarch of the day and Malagasy vocabulary had nothing to do with the name.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-138', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:3,
  question:'Why does a tiny uninhabited island still matter to two states?',
  options:['It carries rights over a wide area of surrounding sea',
           'It provides land on which many people could be housed',
           'It holds minerals that are mined and sold every year',
           'It produces food for both of the claiming countries'],
  answer:'It carries rights over a wide area of surrounding sea',
  hint:'Look outward from the island rather than at the island itself.',
  explanation:'Sovereignty over an island brings rights over the surrounding waters, including fishing and seabed resources, which is why even a sandbank is worth claiming. Tromelin has no room for housing, no mining and no agriculture.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-139', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:3,
  question:'What does co-management of Tromelin mean in practice?',
  options:['The two states share tasks while the claim stays open',
           'One state gives up its claim in return for a payment',
           'The island is divided into two halves by a boundary',
           'A third country administers the island for both sides'],
  answer:'The two states share tasks while the claim stays open',
  hint:'Ask what is being shared, and what is deliberately left untouched.',
  explanation:'Co-management lets the two states cooperate on matters such as the environment, fisheries and archaeology without either abandoning its claim to sovereignty. It is not a purchase, a partition or a handover to anyone else.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-140', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:4,
  question:'An agreement on co-management was signed in 2010. Why would two states cooperate before settling who owns the island?',
  options:['Practical work can proceed while the dispute continues',
           'Cooperation automatically ends one of the two claims',
           'Neither state has any interest in the island any more',
           'International law requires a claim to be dropped first'],
  answer:'Practical work can proceed while the dispute continues',
  hint:'Ask what is gained by waiting, and what is gained by not waiting.',
  explanation:'Fisheries, environmental protection and research cannot wait for a legal question that may take decades, so states often separate the practical from the political. Cooperating does not extinguish a claim, and no rule requires one to be dropped first.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-141', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:4,
  question:'A pupil says Tromelin cannot be important because nobody lives there. Which reply is strongest?',
  options:['Its waters and its position give it real value',
           'People will be settled there within a few years',
           'It is in fact larger than the island of Rodrigues',
           'It has the busiest airport in the Indian Ocean'],
  answer:'Its waters and its position give it real value',
  hint:'Value can come from what surrounds a place rather than from who lives on it.',
  explanation:'Rights over the surrounding waters, and a station serving a cyclone-prone region, give Tromelin value without any residents at all. No settlement is planned, and the island is a tiny fraction of the size of Rodrigues.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-142', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:4,
  question:'Mauritius and France disagree over Tromelin yet remain close partners in other matters. What does that suggest about the dispute?',
  options:['States can hold a disagreement without wider hostility',
           'The dispute must already have been settled in secret',
           'Neither state has ever stated its claim in public at all',
           'Disputes of this kind always end in a breaking of ties'],
  answer:'States can hold a disagreement without wider hostility',
  hint:'Compare the size of the disagreement with the size of the relationship around it.',
  explanation:'Countries routinely contain one unresolved question inside an otherwise cooperative relationship, which is why trade, aid and co-management talks continued. The claim is publicly stated by both sides, and it has not been quietly settled.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-143', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:4,
  question:'Archaeologists have excavated the site where the shipwreck survivors lived on Tromelin. Why is that work valuable beyond the island itself?',
  options:['It documents the experience of enslaved people directly',
           'It proves which of the two states owns the island in law',
           'It shows where the weather station should be rebuilt next',
           'It measures how fast the sand island is now eroding away'],
  answer:'It documents the experience of enslaved people directly',
  hint:'Ask what the objects and structures left behind can tell us that documents cannot.',
  explanation:'The remains show how the abandoned survivors built shelter, found water and stayed alive, giving direct evidence of enslaved people\'s lives that written records rarely preserve. Archaeology does not settle sovereignty or guide where a station is sited.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpb-144', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:4,
  question:'A negotiator proposes that Mauritius and France jointly protect the turtles and seabirds of Tromelin while the sovereignty question stands. Which objection would be weakest?',
  options:['Protecting wildlife would decide who owns the island',
           'Each side may fear that cooperating weakens its claim',
           'Costs and responsibilities would have to be shared out',
           'Access and permits would need agreed rules for both'],
  answer:'Protecting wildlife would decide who owns the island',
  hint:'Three of these are real practical worries. Find the one that does not follow at all.',
  explanation:'Conservation work does not transfer sovereignty, so that objection has no force, and it is exactly why co-management is possible while the claim remains open. Fear of weakening a claim, sharing costs and agreeing access rules are all genuine issues a negotiator must handle.' }));

})();
