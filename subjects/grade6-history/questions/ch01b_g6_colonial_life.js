'use strict';
// Grade 6 History - Settlers, Slaves & Immigrants, second file: the four History
// outcomes the ledger found with nothing behind them, and the chapter's first figure.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-history.json, built from the
//   MIE Grade 6 History table (printed page 12), reported:
//     set-09  discuss the CONTRIBUTION of the slaves in the development of the island
//     set-10  discuss the CONTRIBUTION of the Indian indentured labourers
//     set-15  the social and cultural life of the people during DUTCH rule
//     set-18  the social and cultural life of the people before independence
//   The chapter held 88 questions: who the slaves were, when slavery was abolished,
//   where the labourers landed - and almost nothing about what any of them BUILT,
//   and two passing mentions of the Dutch, neither about living here.
//
// ⚠ Dates follow the ones the pack already teaches: France takes control 1715,
//   Britain 1810, independence 1968. The Dutch period is given as 1638-1710, the
//   settlement dates Mauritian school books use, not the 1598 first landing.
//
// ⚠ No new subsection: 'colonial_rule' is already "Dutch, French & British Rule",
//   which is exactly where the syllabus puts life under each of the three.
//
// ⚠ THE LAST FOUR ITEMS BELONG TO g6-natural-hazards, not to this chapter.
//   They close haz-16 (empathy and solidarity during such events), the one gap
//   left outside History, and they are here rather than in a file of their own
//   because four questions do not warrant one. chapterId is what places a
//   question; the filename places nothing.
//
// IDs: g6hg-si-020 onwards (ch01_g6_slaves_immigrants.js ends at 019).

// A timeline is a history skill in its own right - the syllabus asks pupils to
// "record information about people and events in the past using a simple timeline".
const _SVG_TIMELINE = `<svg viewBox="0 0 260 120" width="260" height="120" role="img" aria-label="A timeline divided into three periods" style="display:block;margin:6px auto;background:#fffbeb;border-radius:8px;border:1px solid #fcd34d">
  <text x="130" y="15" text-anchor="middle" font-size="9" font-weight="bold" fill="#78350f">Who ruled the island</text>
  <rect x="20" y="30" width="48" height="22" fill="#fb923c" stroke="#9a3412" stroke-width="0.8"/>
  <rect x="71" y="30" width="64" height="22" fill="#60a5fa" stroke="#1e40af" stroke-width="0.8"/>
  <rect x="135" y="30" width="105" height="22" fill="#86efac" stroke="#15803d" stroke-width="0.8"/>
  <text x="44" y="45" text-anchor="middle" font-size="7" fill="#7c2d12">Dutch</text>
  <text x="103" y="45" text-anchor="middle" font-size="7" fill="#1e3a8a">French</text>
  <text x="187" y="45" text-anchor="middle" font-size="7" fill="#14532d">British</text>
  <line x1="20" y1="56" x2="240" y2="56" stroke="#78350f" stroke-width="0.8"/>
  <line x1="20" y1="56" x2="20" y2="62" stroke="#78350f" stroke-width="0.8"/>
  <line x1="68" y1="56" x2="68" y2="62" stroke="#78350f" stroke-width="0.8"/>
  <line x1="71" y1="56" x2="71" y2="62" stroke="#78350f" stroke-width="0.8"/>
  <line x1="135" y1="56" x2="135" y2="62" stroke="#78350f" stroke-width="0.8"/>
  <line x1="240" y1="56" x2="240" y2="62" stroke="#78350f" stroke-width="0.8"/>
  <text x="20" y="72" text-anchor="middle" font-size="6.5" fill="#78350f">1638</text>
  <text x="64" y="72" text-anchor="middle" font-size="6.5" fill="#78350f">1710</text>
  <text x="80" y="82" text-anchor="middle" font-size="6.5" fill="#78350f">1715</text>
  <text x="135" y="72" text-anchor="middle" font-size="6.5" fill="#78350f">1810</text>
  <text x="240" y="72" text-anchor="middle" font-size="6.5" fill="#78350f">1968</text>
  <text x="130" y="100" text-anchor="middle" font-size="6.5" fill="#92400e">The island was left empty between 1710 and 1715</text>
  <text x="130" y="112" text-anchor="middle" font-size="6.5" fill="#92400e">Independence came in 1968</text>
</svg>`;

STATIC_QUESTIONS.push(

  // ── The three periods, read off a timeline ──────────────────────────────
  makeMCQ({ id:'g6hg-si-020', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:1,
    question:`${_SVG_TIMELINE}Which power ruled the island for the longest time?`,
    options:['The British','The Dutch','The French','All three the same'], answer:'The British',
    hint:'The longest bar on a timeline stands for the longest period.',
    explanation:'<b>British rule</b> lasted from 1810 to 1968, about 158 years &mdash; longer than the Dutch and French periods put together.' }),

  makeMCQ({ id:'g6hg-si-021', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:`${_SVG_TIMELINE}For how many years was the island left empty between the Dutch and the French?`,
    options:['Five years','Ten years','Fifty years','One year'], answer:'Five years',
    hint:'Take the year the Dutch left away from the year the French arrived.',
    explanation:'The Dutch left in 1710 and the French came in 1715, so the island lay empty for <b>five years</b>. Reading two dates off a timeline and subtracting is a history skill in itself.' }),

  makeMCQ({ id:'g6hg-si-022', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:`${_SVG_TIMELINE}Which power ruled the island immediately before the British?`,
    options:['The French','The Dutch','The Portuguese','Nobody at all'], answer:'The French',
    hint:'Find the British bar, then look at the bar to its left.',
    explanation:'The <b>French</b> ruled from 1715 until the British took the island in 1810. A timeline is read from left to right, oldest first.' }),

  // ── Life under the Dutch ────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-si-023', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:1,
    question:'The Dutch named the island Mauritius. After whom did they name it?',
    options:['Prince Maurice of Nassau','A Dutch sea captain','A Portuguese sailor','The first governor'], answer:'Prince Maurice of Nassau',
    hint:'They named it after the ruler of their own country at the time.',
    explanation:'The Dutch named the island after <b>Prince Maurice of Nassau</b>, the ruler of the Netherlands. The name stayed even after they had left.' }),

  makeMCQ({ id:'g6hg-si-024', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Where did the Dutch make their settlement on the island?',
    options:['At Vieux Grand Port','At Port Louis','At Curepipe','At Flic-en-Flac'], answer:'At Vieux Grand Port',
    hint:'It is in the south-east, and its name still says it was a harbour.',
    explanation:'The Dutch settled in the south-east at <b>Vieux Grand Port</b>, where they built a fort. Port Louis was founded later, by the French.' }),

  makeMCQ({ id:'g6hg-si-025', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Which valuable wood did the Dutch cut down and ship away from the island?',
    options:['Ebony','Pine','Bamboo','Teak'], answer:'Ebony',
    hint:'It is a very dark, very hard wood that grew in the island forests.',
    explanation:'The Dutch cut and exported <b>ebony</b>, a hard black wood that sold for a high price in Europe. So much was taken that the forests were badly damaged.' }),

  makeMCQ({ id:'g6hg-si-026', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Which animal did the Dutch bring to the island from Java, where it still lives wild today?',
    options:['The deer','The camel','The horse','The elephant'], answer:'The deer',
    hint:'It is still hunted in the island forests every winter.',
    explanation:'The Dutch brought <b>deer</b> from Java as a source of meat. They also brought sugar cane, and, by accident, rats.' }),

  makeMCQ({ id:'g6hg-si-027', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:3,
    question:'Which bird disappeared for ever during the years the Dutch lived on the island?',
    options:['The dodo','The pink pigeon','The kestrel','The parakeet'], answer:'The dodo',
    hint:'It could not fly, and the island is the only place it ever lived.',
    explanation:'The <b>dodo</b> was hunted and its eggs eaten by the animals the settlers brought, and it was gone within a century of their arrival.' }),

  makeMCQ({ id:'g6hg-si-028', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:3,
    question:'Why did the Dutch finally abandon the island in 1710?',
    options:['Cyclones, rats and poor harvests defeated them','A stronger fleet drove them away','They had cut down every single tree','The island was found to have no water'], answer:'Cyclones, rats and poor harvests defeated them',
    hint:'Think about what made ordinary life on a small settlement too hard.',
    explanation:'Life was very hard: <b>cyclones destroyed the crops, rats ate the harvest and the settlement never grew enough food</b>. After two attempts the Dutch gave up and left.' }),

  makeMCQ({ id:'g6hg-si-029', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:3,
    question:'What was daily life like for the small number of people living here under Dutch rule?',
    options:['Hard, with few people and little food','Rich, with large towns and markets','Easy, with plenty of everything','Quiet, with no work to do'], answer:'Hard, with few people and little food',
    hint:'Their settlement stayed tiny for seventy years and then was abandoned.',
    explanation:'The Dutch settlement was small and isolated, food was short and cyclones frequent, so life was <b>hard</b>. That is why it never grew into a colony.' }),

  makeMCQ({ id:'g6hg-si-030', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:4,
    question:'The Dutch stayed about seventy years and left almost no towns behind, yet they changed the island for ever. How?',
    options:['Cane, deer and rats came; ebony and dodo went','They built the capital city and its main harbour','They opened the first schools and hospitals here','They divided the island into nine districts'], answer:'Cane, deer and rats came; ebony and dodo went',
    hint:'Think about what arrived with them and what disappeared while they were here.',
    explanation:'Their lasting mark was on the <b>living things</b>: sugar cane, deer and rats arrived, while the ebony forests were cut and the dodo was lost. Port Louis and the districts came later, under the French.' }),

  // ── Social and cultural life before independence ────────────────────────
  makeMCQ({ id:'g6hg-si-031', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Before independence, the people of the island came from Africa, India, China and Europe. What did this make the population?',
    options:['Mixed, with many cultures together','All of one single culture','Divided into two groups only','Smaller every year'], answer:'Mixed, with many cultures together',
    hint:'Count the different parts of the world the people had come from.',
    explanation:'People from four continents lived side by side, making a <b>mixed population of many cultures</b> &mdash; the society Mauritius still has today.' }),

  makeMCQ({ id:'g6hg-si-032', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Which language grew up among the people of the island and became the one everybody could share?',
    options:['Kreol','Latin','Portuguese','Dutch'], answer:'Kreol',
    hint:'It is the language most Mauritians still speak at home.',
    explanation:'<b>Kreol</b> grew among the slaves and the people they worked beside, and became the language everyone on the island could understand, whatever their origin.' }),

  makeMCQ({ id:'g6hg-si-033', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'Before independence, how did the different religions of the island live together?',
    options:['Side by side, each with its own places','Only one was allowed at a time','They were all practised in secret','Everyone followed the same religion'], answer:'Side by side, each with its own places',
    hint:'Think of the temples, churches, mosques and pagodas you can see today.',
    explanation:'Temples, churches, mosques and pagodas were built <b>side by side</b>, and the festivals of each became public holidays. That habit of living together is older than independence.' }),

  makeMCQ({ id:'g6hg-si-034', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:3,
    question:'Mauritian food mixes curry, rougaille, noodles and French bread. What does that tell you about the people before independence?',
    options:['They came from many different lands','They all came from one country','They ate only what they grew','They cooked only on feast days'], answer:'They came from many different lands',
    hint:'Name the part of the world each of those four dishes comes from.',
    explanation:'Each dish comes from a different origin &mdash; India, Africa, China and Europe &mdash; so the kitchen itself shows that the people <b>came from many different lands</b> and shared what they cooked.' }),

  makeMCQ({ id:'g6hg-si-035', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:4,
    question:'Before independence most people lived on or near a sugar estate. How did that shape the life of a village?',
    options:['Work, housing and the year followed the estate','Every family chose its own kind of work freely','Villages traded mainly with the other islands','Most people worked in offices in the town'], answer:'Work, housing and the year followed the estate',
    hint:'Ask who the villagers worked for, and when the busiest months were.',
    explanation:'The estate gave the work, often the housing, and set the year by the cutting season, so <b>village life followed the estate</b>. That is what is meant by a plantation society.' }),

  // ── What the slaves built ───────────────────────────────────────────────
  makeMCQ({ id:'g6hg-si-036', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:2,
    question:'What was the first heavy work the slaves were made to do when the land was opened up?',
    options:['Clearing the forest and the stones','Teaching in the first schools','Sailing the trading ships','Drawing maps of the island'], answer:'Clearing the forest and the stones',
    hint:'Before anything can be planted, the ground has to be made ready.',
    explanation:'Slaves <b>cleared the forest and cleared the stones</b> by hand before any field could be planted. The stone walls and heaps still standing in the cane fields are their work.' }),

  makeMCQ({ id:'g6hg-si-037', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:2,
    question:'Besides working the land, what else did the slaves build in the growing colony?',
    options:['Roads, buildings and the harbour','Ships for the navy','Schools for their children','Railways across the island'], answer:'Roads, buildings and the harbour',
    hint:'Think about how a new capital town came to be built at all.',
    explanation:'Slaves built the <b>roads, the stone buildings and the harbour works</b> of Port Louis. Much of the oldest part of the capital stands on their labour.' }),

  makeMCQ({ id:'g6hg-si-038', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:2,
    question:'Which music and dance of Mauritius grew out of the life of the slaves?',
    options:['The sega','The waltz','The polka','The tango'], answer:'The sega',
    hint:'It is danced to the ravanne, a drum made from a goatskin.',
    explanation:'The <b>sega</b> was created by the slaves, who sang and danced in the evenings about the lives they led. It is now the national music of Mauritius.' }),

  makeMCQ({ id:'g6hg-si-039', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:3,
    question:'Give one lasting contribution the slaves made to the culture of Mauritius.',
    options:['The sega and the Kreol language','The Chinese Spring Festival','The English language','The growing of tea'], answer:'The sega and the Kreol language',
    hint:'Think of what Mauritians sing and what they speak at home.',
    explanation:'The <b>sega and the Kreol language</b> both grew among the slaves and are shared by the whole country today. A contribution can be a way of speaking and singing, not only a building.' }),

  makeMCQ({ id:'g6hg-si-040', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:3,
    question:'Slaves who escaped from the estates were called maroons. Where did many of them hide?',
    options:['In the mountains and forests','On ships leaving the island','In the streets of Port Louis','On the coral reefs'], answer:'In the mountains and forests',
    hint:'They needed somewhere their owners could not easily follow.',
    explanation:'Maroons hid <b>in the mountains and forests</b>, and Le Morne Brabant became the most famous of their refuges. It is now a World Heritage Site for that reason.' }),

  makeMCQ({ id:'g6hg-si-041', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:4,
    question:'Without the work of the slaves, the early sugar colony could not have existed. Why not?',
    options:['There was nobody else to do the heavy work','The soil would not grow cane','No ships would call at the island','Sugar had not yet been invented'], answer:'There was nobody else to do the heavy work',
    hint:'Count how many settlers there were, and how much land had to be cleared by hand.',
    explanation:'The settlers were few and the work of clearing, planting, cutting and carrying was enormous, so <b>the whole colony rested on the labour of the slaves</b>. That is why their contribution is remembered.' }),

  makeMCQ({ id:'g6hg-si-042', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:3,
    question:'Why does Mauritius keep 1 February as a public holiday each year?',
    options:['To remember the abolition of slavery','To mark the start of the cane harvest','To remember the first Dutch landing','To open the school year'], answer:'To remember the abolition of slavery',
    hint:'It marks the end of something, not the beginning.',
    explanation:'1 February is <b>Abolition of Slavery Day</b>, when the country remembers both the suffering of the slaves and everything they gave to the island.' }),

  // ── What the indentured labourers built ─────────────────────────────────
  makeMCQ({ id:'g6hg-si-043', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:2,
    question:'What happened to the sugar estates when the indentured labourers arrived from India?',
    options:['They kept working and grew larger','They closed down one by one','They changed to growing tea','They were turned into towns'], answer:'They kept working and grew larger',
    hint:'Think about who took over the work the freed slaves had left.',
    explanation:'The indentured labourers took over the estate work, so the estates <b>kept working and grew</b>. Sugar remained the island\'s main industry because of them.' }),

  makeMCQ({ id:'g6hg-si-044', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:3,
    question:'Many indentured labourers later bought small plots of land. What did that make them?',
    options:['Small planters growing their own cane','Owners of the big estates','Traders in Port Louis','Officers in the government'], answer:'Small planters growing their own cane',
    hint:'They kept growing the same crop, but now on their own ground.',
    explanation:'Buying a small plot made them <b>small planters</b> growing cane for themselves. Thousands of families rose from labourer to landowner this way, and small planters still supply the mills.' }),

  makeMCQ({ id:'g6hg-si-045', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:2,
    question:'Which languages did the Indian immigrants bring to Mauritius?',
    options:['Bhojpuri, Hindi and Tamil','Dutch, German and Danish','Swahili, Zulu and Shona','Spanish, Italian and Greek'], answer:'Bhojpuri, Hindi and Tamil',
    hint:'They are still taught in Mauritian schools today.',
    explanation:'They brought <b>Bhojpuri, Hindi, Tamil</b> and other languages of India, several of which are still spoken and taught in Mauritius.' }),

  makeMCQ({ id:'g6hg-si-046', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:2,
    question:'Which of these festivals came to Mauritius with the Indian immigrants?',
    options:['Divali','Christmas','Easter','The Spring Festival'], answer:'Divali',
    hint:'It is the festival of light, and it is a public holiday here.',
    explanation:'<b>Divali</b>, along with Maha Shivaratree, Cavadee and others, came with the Indian immigrants and is now a national public holiday.' }),

  makeMCQ({ id:'g6hg-si-047', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:2,
    question:'What did the Indian immigrants build in their villages, which can still be visited today?',
    options:['Temples','Sugar mills','Lighthouses','Railway stations'], answer:'Temples',
    hint:'They are places of worship, often beside a village or a lake.',
    explanation:'They built <b>temples</b> in the villages and beside the estates, and Ganga Talao became the most important of them. The buildings are part of their contribution.' }),

  makeMCQ({ id:'g6hg-si-048', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:3,
    question:'Which of these is a contribution of the indentured labourers to Mauritius today?',
    options:['The languages, festivals and temples','The building of the Port Louis harbour','The naming of the island by its settlers','The first maps of the island coastline'], answer:'The languages, festivals and temples',
    hint:'Look for the answer that names things brought from India.',
    explanation:'The indentured labourers gave Mauritius its <b>Indian languages, festivals and temples</b>, as well as its sugar industry. The harbour and the island\'s name came from earlier arrivals.' }),

  makeMCQ({ id:'g6hg-si-049', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:4,
    question:'Aapravasi Ghat is a World Heritage Site although it is only a set of old stone steps and buildings. Why does it matter so much?',
    options:['Nearly half a million people first landed there','It was the largest fort on the island','It was the first sugar mill built','It was the home of the first governor'], answer:'Nearly half a million people first landed there',
    hint:'Think about who walked up those steps, and how many of them there were.',
    explanation:'Aapravasi Ghat is where the indentured labourers <b>first set foot on the island</b> &mdash; hundreds of thousands of them &mdash; so it marks the beginning of modern Mauritius for most Mauritian families.' }),

  makeMCQ({ id:'g6hg-si-050', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:4,
    question:'Slavery ended in 1835, yet the sugar industry grew larger in the years that followed. Explain how.',
    options:['Indentured labourers arrived to do the work','The estates began using machines only','Sugar was suddenly easier to grow','The estates were given to the freed slaves'], answer:'Indentured labourers arrived to do the work',
    hint:'The work did not disappear when slavery ended; somebody else came to do it.',
    explanation:'The estates still needed hands, and <b>indentured labourers from India came in very large numbers</b>, so sugar grew rather than collapsed. That is the link between the two halves of this chapter.' }),

  // ── Standing together when a hazard strikes ─────────────────────────────
  makeMCQ({ id:'g6hg-si-051', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:2,
    question:'After a cyclone has passed, what do neighbours in a village usually do?',
    options:['Help each other clear and repair','Wait for the next warning class','Stay indoors for a week','Leave the village for good'], answer:'Help each other clear and repair',
    hint:'Think about who arrives first, before any lorry or official does.',
    explanation:'Neighbours <b>help each other clear the branches and repair what is broken</b>, long before any outside help arrives. That is the first thing that happens after a cyclone anywhere in Mauritius.' }),

  makeMCQ({ id:'g6hg-si-052', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:3,
    question:'What does it mean to show <b>solidarity</b> after a natural hazard?',
    options:['Standing together and helping those who lost most','Making sure your own house is safe first','Waiting until the government acts','Keeping your food and water for yourself'], answer:'Standing together and helping those who lost most',
    hint:'The word is about what a group does, not what one person does alone.',
    explanation:'Solidarity means <b>standing together</b>, so that those who lost the most are not left alone. A flood or a cyclone never strikes every family equally.' }),

  makeMCQ({ id:'g6hg-si-053', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:3,
    question:'Why do people take food, water and blankets to a cyclone refuge centre after a storm?',
    options:['Some families have lost their homes','The centres are always kept empty','It is a rule for every household','The food would spoil at home'], answer:'Some families have lost their homes',
    hint:'Think about who is sheltering in the centre and what they arrived with.',
    explanation:'People in a refuge centre may have <b>lost their homes and everything in them</b>, so neighbours bring what those families now need. Helping in this way is what the syllabus calls empathy.' }),

  makeMCQ({ id:'g6hg-si-054', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:4,
    question:'An elderly neighbour lives alone and a Class III warning has just been given. What is the best thing to do?',
    options:['Check on her and help her get ready','Wait until the cyclone has passed','Telephone her in a day or two','Leave it to her own family'], answer:'Check on her and help her get ready',
    hint:'A Class III warning leaves only about six hours, and she may not manage alone.',
    explanation:'With only about six hours left, an elderly person living alone may not be able to close shutters or fetch water, so the right thing is to <b>go and help her now</b>. Empathy means thinking about who is least able to cope.' })

);
