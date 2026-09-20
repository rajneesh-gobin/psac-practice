'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH G
//  Chapters: g9sms-links (Mauritius and the World, examWeight 4) and
//            g9sms-economy-today (Economy & Work Today, examWeight 1).
//
//  IDs: g9sms-dpg-001 … g9sms-dpg-117. The block was chosen because no id in
//  this pack begins g9sms-dpg- (12 prefixes in use, checked 2026-09-20) and
//  six other batches are writing other chapters of this same pack at the same
//  time. The importer keys on id, so a collision would be silent.
//
//  ⚠ L4 IN THIS PACK IS THE APPLIED BAND, not harder recall. Every difficulty-4
//    item below hands the pupil a situation — a firm, a product, a constraint,
//    a claim to diagnose — and asks for a decision, a consequence or a cause.
//    A question answerable by recognising a definition is labelled 1 or 2
//    however long its wording. A previous audit of this pack had to relabel 34
//    items that sat at L3/L4 on plain retrieval.
//
//  ⚠ FACTUAL FLOOR. The links chapter touches identity directly, so it stays on
//    the documented record — Dutch, French and British periods, slavery and the
//    enslaved people brought from Africa and Madagascar, indenture from India,
//    Chinese migration and trade, Kreol Morisien, and the plural society that
//    followed. No community is ranked against another. No statistic, date or
//    treaty detail is used that is not already established in this pack
//    (1638, 1710, 1810, 1834, 1835, 1968, 1992) or in the manifest syllabus.
//    Organisation founding dates are deliberately absent for that reason.
//
//  ⚠ OPTIONS ARE KEPT THE SAME SHAPE AND LENGTH. An applied answer wants to be
//    the long careful one, which is the leak test-option-parity.js measures.
//    Lengthen a distractor, never trim the answer. No two options in one list
//    mean the same thing.
//
//  Source: MIE NCF / TLS Grades 7-9; docs/nce-grade9/blueprint-social-modern-studies.md.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── g9sms-links · origins_of_our_people — 001 … 015 ───────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-001', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:1,
  question:'Which statement about Mauritius <b>before</b> the first settlers arrived is correct?',
  options:['The island had no permanent human population of its own',
           'The island was home to a large farming population then',
           'The island was ruled by a line of local island kings',
           'The island was settled by traders from the mainland'],
  answer:'The island had no permanent human population of its own',
  hint:'Think about why every community in Mauritius can name a place it came from.',
  explanation:'Mauritius was uninhabited before European settlement began. Sailors had called in, but nobody lived here permanently, which is why every community on the island today traces an arrival from somewhere else.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-002', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:1,
  question:'During the French period, enslaved people were brought to Mauritius mainly from which regions?',
  options:['Madagascar and the east coast of Africa',
           'Southern India and the island of Ceylon',
           'Southern China and the Malay peninsula',
           'Portugal and the islands of the Atlantic'],
  answer:'Madagascar and the east coast of Africa',
  hint:'Look at the lands closest to Mauritius across the water to the west.',
  explanation:'The enslaved people brought to the island under French rule came mostly from Madagascar and the east African coast. India is associated with the later system of indenture, and China with traders who came in the nineteenth century.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-003', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:1,
  question:'The depot in Port Louis where indentured immigrants first set foot in Mauritius is a UNESCO World Heritage Site. Complete its name: ______ Ghat.',
  answer:'Aapravasi', alsoAccept:['Apravasi','Aapravasi Ghat'],
  hint:'The name is the word used for an immigrant, and it gives the site its title.',
  explanation:'Aapravasi Ghat is the immigration depot beside Port Louis harbour where indentured immigrants were registered on arrival. It was inscribed as a World Heritage Site because of what it records about that movement of people.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-004', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:1,
  question:'Which language grew up <b>in Mauritius itself</b>, out of contact between the groups who settled here, and is used by most Mauritians every day?',
  options:['Kreol Morisien, the creole language of Mauritius',
           'Bhojpuri, brought from northern India by families',
           'French, the language of the first planter class',
           'English, the language used in the law courts'],
  answer:'Kreol Morisien, the creole language of Mauritius',
  hint:'Three of these were carried here already formed. One was made here.',
  explanation:'Kreol Morisien took shape on the island itself as people of many origins had to speak to one another. The other three were brought from elsewhere by settlers, by families or by an administration, and were not created here.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-005', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
  question:'Chinese migrants who settled in Mauritius in the nineteenth century came mainly to do what kind of work?',
  options:['As traders and shopkeepers, often in Port Louis',
           'As indentured field workers on the sugar estates',
           'As enslaved workers brought before the abolition',
           'As colonial officials sent out to run the island'],
  answer:'As traders and shopkeepers, often in Port Louis',
  hint:'Think about where the shops of the capital stood, rather than about the cane fields.',
  explanation:'Chinese migration to Mauritius was largely a movement of traders, and the shops of Port Louis are its clearest mark. Indenture brought field workers mainly from India, and slavery had been abolished before most Chinese migrants arrived.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-006', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
  question:'What distinguished <b>indentured labour</b> from slavery?',
  options:['They came under a contract for a fixed number of years',
           'They were brought to the island against their own will',
           'They were paid nothing at all for the work they did',
           'They were free to leave the estate on any day at all'],
  answer:'They came under a contract for a fixed number of years',
  hint:'The difference is a legal one, and it has a length of time written into it.',
  explanation:'Indenture rested on a written contract for a set term, which is why the immigrants were registered by name and ship. Slavery involved no contract and no agreed term. Indenture was still hard and tightly controlled, so the third and fourth statements describe neither system.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-007', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
  question:'Which World Heritage Site in Mauritius stands as a symbol of the resistance of enslaved people who escaped?',
  options:['Le Morne Brabant, the mountain in the south-west',
           'Aapravasi Ghat, the depot beside Port Louis harbour',
           'Grand Bassin, the crater lake in the high plateau',
           'Trou aux Cerfs, the crater above the town of Curepipe'],
  answer:'Le Morne Brabant, the mountain in the south-west',
  hint:'People who had escaped needed somewhere hard to reach. Which of these is hard to reach?',
  explanation:'Le Morne Brabant was used as a refuge by people who had escaped slavery, and is recognised as a cultural landscape for that reason. Aapravasi Ghat is a World Heritage Site too, but it records indenture rather than resistance to slavery.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-008', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
  question:'Why is Mauritius described as a <b>plural society</b>?',
  options:['Several origins, faiths and languages share one country',
           'Every family on the island shares one single origin',
           'Only one language is used everywhere on the island',
           'The population is divided into two equal halves'],
  answer:'Several origins, faiths and languages share one country',
  hint:'The word describes how many different things live side by side, not how many people there are.',
  explanation:'A plural society is one in which communities of different origins, religions and languages live together within a single state. That is exactly what the settlement history of Mauritius produced, and it is the opposite of the three other descriptions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-009', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
  question:'Sega, the music and dance of Mauritius, grew mainly out of the culture of which group?',
  options:['The enslaved people brought from Africa and Madagascar',
           'The French settlers who arrived in the eighteenth century',
           'The British officials who governed after the year 1810',
           'The Chinese traders who opened shops in Port Louis'],
  answer:'The enslaved people brought from Africa and Madagascar',
  hint:'Listen to the drum and the rhythm rather than to the words.',
  explanation:'Sega developed among enslaved people of African and Malagasy origin, and its drumming and rhythm carry that inheritance. The words are largely in Kreol, which is why the French period is a tempting but wrong answer: the language is not the source of the music.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-010', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:3,
  question:'Mauritius had no population at all before settlement began. What does that single fact explain about the country today?',
  options:['Every community traces its arrival from somewhere else',
           'One community has lived here since long before the rest',
           'The island has never received people from other lands',
           'The population grew only because families had children'],
  answer:'Every community traces its arrival from somewhere else',
  hint:'If nobody was here first, what follows for every group that is here now?',
  explanation:'Because there was no original population, no group can claim to have been here before the others. That is the root of the plural society: every community arrived, at a different time and for a different reason.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-011', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:3,
  question:'Why are so many different religions practised side by side in Mauritius today?',
  options:['Arrivals from different regions brought their faiths here',
           'The colonial government required each district to differ',
           'Religions developed on the island after settlement began',
           'Each religion was introduced by a single trading company'],
  answer:'Arrivals from different regions brought their faiths here',
  hint:'Trace each place of worship back to the people who built it and where they came from.',
  explanation:'Settlers, enslaved people, indentured immigrants and traders each carried their own religion with them, and those faiths were kept up here. Religion in Mauritius was therefore imported with people, not created on the island or imposed district by district.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-012', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:3,
  question:'Enslaved Africans and indentured Indians were both brought to work on the sugar estates. Which difference most affects how each arrival can be <b>traced today</b>?',
  options:['Indenture was recorded in written contracts and registers',
           'Slavery involved a far shorter journey across the ocean',
           'Indentured workers arrived long before the sugar estates',
           'Slavery affected only the districts around Port Louis'],
  answer:'Indenture was recorded in written contracts and registers',
  hint:'Ask which system produced paperwork that a family can still read.',
  explanation:'Because indenture rested on contracts, immigrants were registered with names, ships and dates, and descendants can follow those records. People brought in slavery were listed as property rather than as named immigrants, so the paper trail is far thinner.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-013', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:4,
  question:'A pupil writes: <i>my family has always been here, so my ancestors were not migrants.</i> Using what you know about how Mauritius was peopled, which reply is best?',
  options:['No one lived here before settlement, so every family arrived',
           'Only families who came after 1835 are counted as arrivals',
           'Families who came before 1810 are treated as original',
           'Whether a family migrated depends on the language spoken'],
  answer:'No one lived here before settlement, so every family arrived',
  hint:'Do not argue about the date. Argue about whether anyone was here to begin with.',
  explanation:'The claim fails at its starting point: there was no population before settlement, so no family can have been here from the beginning. Choosing a date, whether 1810 or 1835, only moves the argument without answering it, and language records where a family came from rather than whether it came.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-014', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:4,
  question:'A museum has one room for an exhibition on <b>how Mauritius was peopled</b>, and may display one object. Which object shows the widest span of that story?',
  options:['A register of immigrants listing names, ships and years',
           'A photograph of one sugar estate taken in the 1950s',
           'A model of a cane lorry used on a single estate road',
           'A map showing the districts of the island as drawn today'],
  answer:'A register of immigrants listing names, ships and years',
  hint:'Weigh how many people and how many years each object can speak for.',
  explanation:'A register covers thousands of individuals arriving over decades, so one object carries the whole movement. The photograph and the lorry show one estate at one moment, and a modern district map shows where people ended up without saying anything about how they came.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-015', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:4,
  question:'Tracing her family, a pupil finds one ancestor named in an immigration register with a ship and a year, and another ancestor with no such record at all. Which explanation fits the second ancestor best?',
  options:['People brought in slavery were not entered in immigrant lists',
           'Records of that whole period were destroyed by a cyclone',
           'The family must have arrived after the year of abolition',
           'Only people who came by ship appear in any record at all'],
  answer:'People brought in slavery were not entered in immigrant lists',
  hint:'Ask what each system wrote down, and about whom it wrote it.',
  explanation:'Immigration registers were created for indenture, where a contract had to be recorded. People brought in slavery were entered as property in estate and slave records instead, so they are absent from the immigrant lists. Everyone came by ship, so the last option explains nothing.' }));

// ── g9sms-links · links_india_africa — 016 … 032 ──────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-016', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:1,
  question:'Mauritius sits in the African Union. As part of which continent is Mauritius counted?',
  options:['Africa','Asia','Europe','Oceania'],
  answer:'Africa',
  hint:'Look at which regional bodies the country is allowed to join.',
  explanation:'Mauritius is an African state that happens to lie out in the Indian Ocean, which is why it sits in the African Union and in African regional bodies. Being far from the mainland does not move a country to another continent.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-017', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:1,
  question:'Which festival widely celebrated in Mauritius came with families from India?',
  options:['Divali, the festival of lights','Bastille Day, the French national day','Thanksgiving, an American harvest day','Saint Patrick, an Irish feast day'],
  answer:'Divali, the festival of lights',
  hint:'Three of these belong to countries whose people did not settle here in numbers.',
  explanation:'Divali came to Mauritius with families arriving from India and is a public holiday here. The other three are festivals of countries that sent no comparable settlement, and none of them is marked as a national festival in Mauritius.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-018', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:1,
  question:'Mauritius is a member of the AU. Complete the name: the African ______.',
  answer:'Union', alsoAccept:['African Union'],
  hint:'It is the continental body that succeeded the Organisation of African Unity.',
  explanation:'The AU is the African Union, the body that brings together the states of the continent. Mauritius takes part in it as an African state, alongside its membership of narrower regional groups.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-019', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:1,
  question:'Which of these is a real link between Mauritius and the African mainland today?',
  options:['Membership of regional trade groups such as SADC',
           'A land bridge joining the island to the coast',
           'A shared national currency used across Africa',
           'A single government covering all of the region'],
  answer:'Membership of regional trade groups such as SADC',
  hint:'Three of these describe things that do not exist. One describes something Mauritius does.',
  explanation:'Mauritius is linked to the mainland through the regional organisations it belongs to, SADC and COMESA among them. There is no land bridge, no common African currency and no single African government, so those three cannot be links of any kind.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-020', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:1,
  question:'In which year did indentured labourers from India begin arriving in Mauritius?',
  answer:1834,
  hint:'It is the year just before slavery was abolished in the colony.',
  explanation:'Indentured immigration from India began in 1834, shortly before the abolition of slavery in 1835. The two dates sit together because planters were looking for a new supply of estate labour as the older system ended.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-021', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Grand Bassin, also called Ganga Talao, draws large numbers of pilgrims each year. Which link does it express?',
  options:['A religious link kept with India by Hindu Mauritians',
           'A trading link kept with ports on the African coast',
           'A political link with the countries of the region',
           'A language link with the French-speaking world'],
  answer:'A religious link kept with India by Hindu Mauritians',
  hint:'Ask what people go there to do, not what is bought or signed.',
  explanation:'Grand Bassin is a place of Hindu pilgrimage and the link it keeps alive is a religious one, carried here by families who came from India. Trade, politics and language are all real links for Mauritius, but none of them is what a pilgrimage expresses.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-022', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Which of these is an <b>economic</b> link between Mauritius and African countries?',
  options:['Mauritian firms export their goods to African markets',
           'African countries set the taxes that are paid in Mauritius',
           'Mauritius shares one central bank with the whole region',
           'African states choose the ministers who govern Mauritius'],
  answer:'Mauritian firms export their goods to African markets',
  hint:'An economic link is about goods, money and jobs, not about who governs.',
  explanation:'Selling goods into African markets is an economic link, and it is one reason Mauritius belongs to African trade bodies. The other three describe a loss of self-government or a shared institution that does not exist, and none of them is economic in any case.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-023', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Bhojpuri is spoken in many Mauritian families. What does its presence here record?',
  options:['The arrival of families from northern India',
           'The arrival of traders from southern China',
           'The rule of the French before the year 1810',
           'The trade in spices with the east African coast'],
  answer:'The arrival of families from northern India',
  hint:'A language in a home is usually evidence of where that home came from.',
  explanation:'Bhojpuri was carried to Mauritius by indentured immigrants from northern India and kept alive in family life. It has no connection with Chinese migration, with French rule or with trade along the African coast.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-024', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Which statement about Mauritius and Africa is correct?',
  options:['It is an African state that lies off the continent',
           'It is an Asian state grouped with the Indian coast',
           'It belongs to no continent because it is an island',
           'It is a European territory because of colonisation'],
  answer:'It is an African state that lies off the continent',
  hint:'Distance from the mainland and continental membership are two different things.',
  explanation:'Mauritius is an African state whose territory lies out at sea, and it takes its place in African institutions on that basis. Being an island does not remove a country from a continent, and a colonial past does not make it part of Europe.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-025', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Several Asian languages are taught in Mauritian primary schools. What does that teaching show?',
  options:['Families kept the languages of the places they came from',
           'The government requires one language of every single pupil',
           'These languages are used in the courts of the island',
           'They were brought here by the British administration'],
  answer:'Families kept the languages of the places they came from',
  hint:'Ask why a language survives long enough to be worth teaching.',
  explanation:'These languages are taught because families kept them alive across generations as a link with their place of origin. The courts and the administration work in English and French, so neither of those explains why an ancestral language is on the timetable.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-026', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:2,
  question:'Which of these is a <b>cultural</b> link with Madagascar and east Africa?',
  options:['Sega music and dance, and the Kreol language',
           'Cambridge examinations sat at the end of school',
           'The civil law code inherited from the French',
           'The parliamentary system used by the country'],
  answer:'Sega music and dance, and the Kreol language',
  hint:'Sort each item by which people brought it, not by how important it is.',
  explanation:'Sega and Kreol both grew from the culture of people brought from Africa and Madagascar, and both are living links with those places. Cambridge examinations and the parliamentary system are British inheritances, and the civil code is French.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-027', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:3,
  question:'Indenture ended long ago, yet the links between Mauritius and India remain strong. Why?',
  options:['Families kept languages, faiths and family ties alive',
           'Mauritius is governed from a capital city inside India',
           'Indenture contracts are still being signed every year',
           'Indian law is applied directly in the Mauritian courts'],
  answer:'Families kept languages, faiths and family ties alive',
  hint:'A link that outlives the system that created it must be carried by somebody.',
  explanation:'The link survived because it moved from contracts into culture: language, religion, festivals and family memory are renewed in every generation. The other three would make Mauritius dependent on India in ways that simply are not the case.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-028', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:3,
  question:'Why does Mauritius take an active part in African organisations even though it lies far out at sea?',
  options:['Its nearest large markets and partners are African',
           'Its population is larger than most African states',
           'It is required to do so by its own constitution',
           'It shares a land border with an African country'],
  answer:'Its nearest large markets and partners are African',
  hint:'Think about where a small exporter can reach quickly and cheaply.',
  explanation:'For a small island economy the mainland is the nearest big market, so African membership is a practical matter of trade and cooperation. Mauritius has a small population and no land border, and the constitution does not dictate which bodies the country joins.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-029', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:3,
  question:'A pupil argues that the Kreol language proves a link with France and with nowhere else. Why is that incomplete?',
  options:['Its speakers and much of its shape came from Africa too',
           'French words were added to it only in very recent years',
           'It was created by the British soon after the year 1810',
           'It is spoken nowhere except inside the capital city'],
  answer:'Its speakers and much of its shape came from Africa too',
  hint:'A language is made of more than the words it borrows.',
  explanation:'Most Kreol vocabulary does come from French, which is what the pupil has noticed, but the language took shape among people of African and Malagasy origin and carries their influence in its structure. Vocabulary alone does not settle where a language came from.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-030', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:4,
  question:'A Mauritian food company wants to sell chilli sauce in east Africa, and must choose between a buyer in a COMESA country and a buyer in a country outside the agreement. Which argument most favours the COMESA buyer?',
  options:['Goods entering a COMESA member pay little or no duty',
           'A COMESA port is always closer to Port Louis than any other',
           'Sauce sold inside COMESA needs no label in any language',
           'A COMESA buyer has to pay before the goods are shipped'],
  answer:'Goods entering a COMESA member pay little or no duty',
  hint:'Weigh what changes the price the buyer finally pays, not what changes the paperwork.',
  explanation:'Preferential access means the sauce arrives without the duty that would be added elsewhere, so it can be sold at a competitive price. Distance is a separate matter and is not fixed by membership, labelling rules still apply, and payment terms are agreed between the two firms.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-031', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:4,
  question:'A cultural centre can fund <b>one</b> project, and wants the project to strengthen the links with India and with Africa at the same time. Which project does that?',
  options:['A festival pairing sega with music brought from India',
           'A class teaching only the history of the French period',
           'A tour of the sites linked to the British administration',
           'An exhibition of the ships used by European explorers'],
  answer:'A festival pairing sega with music brought from India',
  hint:'Only one project has to involve both inheritances to work at all.',
  explanation:'Pairing sega with Indian music puts both inheritances on the same stage, so a single event serves both links. The other three are about the European colonial period, so however good they are they strengthen neither of the links named.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-032', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:4,
  question:'A survey finds that young Mauritians speak Bhojpuri less than their grandparents do. A pupil must explain the change. Which explanation fits best?',
  options:['Schooling and media are in other languages used daily',
           'Families arriving from India stopped speaking it there',
           'The language was banned by a law passed quite recently',
           'It was never spoken in Mauritian homes at any time'],
  answer:'Schooling and media are in other languages used daily',
  hint:'Ask what a young person hears and uses for most of the day.',
  explanation:'An ancestral language weakens when daily life, school and media run in other languages, so each generation uses it less. It has not been banned, and it has certainly been spoken in Mauritian homes, which is why the change is visible between generations at all.' }));

// ── g9sms-links · links_europe_france — 033 … 049 ─────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-033', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:1,
  question:'Which European country ruled Mauritius <b>immediately before</b> the British took it?',
  options:['France','Portugal','Denmark','Spain'],
  answer:'France',
  hint:'The island carried a different name under that power, taken from the country itself.',
  explanation:'France governed the island from 1715 until the British capture in 1810, and renamed it during that period. The Dutch came earlier still, and Portugal, Denmark and Spain never held the island.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-034', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:1,
  question:'The daily newspapers of Mauritius are printed mostly in which European language?',
  answer:'French', alsoAccept:['french'],
  hint:'It is not the language the laws are written in.',
  explanation:'The main daily papers appear largely in this language, which is one of the clearest everyday traces of the French period. English dominates the law and much official writing, so the two languages divide the work between them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-035', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:1,
  question:'School certificate examinations set by Cambridge are a legacy of which colonial power?',
  options:['Britain','France','Portugal','Denmark'],
  answer:'Britain',
  hint:'Cambridge is a city in one of these countries.',
  explanation:'Cambridge examinations came in with the British administration and were kept after independence. France left its mark on the law and the press instead, while Portugal and Denmark never governed Mauritius.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-036', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:1,
  question:'Which of these is a European body that is a major market for Mauritian exports?',
  options:['The European Union','The African Union','The Commonwealth','The United Nations'],
  answer:'The European Union',
  hint:'Only one of these groups European states and no others.',
  explanation:'The European Union is a group of European states and buys a large share of Mauritian exports. The African Union is continental, the Commonwealth spans several continents, and the United Nations is worldwide and is not a market of any kind.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-037', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'Mauritian civil law is based on a French code, while the courts work in English and follow British practice. What does that show?',
  options:['Both colonial powers left a mark on the legal system',
           'The legal system was written after independence only',
           'Only French law is applied on the island of today',
           'The courts follow the law of no other country at all'],
  answer:'Both colonial powers left a mark on the legal system',
  hint:'Count how many different inheritances the sentence actually describes.',
  explanation:'The code and the court practice come from different rulers, so the system is a mixture rather than an inheritance from one of them. It was not written from scratch in 1968, and the presence of the French code disproves the last two statements.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-038', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'Which everyday habit in Mauritius comes from the <b>British</b> period?',
  options:['Driving on the left-hand side of the road',
           'Naming villages with French place names',
           'Serving French bread with the morning meal',
           'Holding a Catholic mass on Sunday morning'],
  answer:'Driving on the left-hand side of the road',
  hint:'Three of these point clearly towards one power, so the odd one out is the answer.',
  explanation:'Driving on the left came in with the British administration and has been kept ever since. The other three all belong to the French inheritance, which is why they form a group and the answer stands apart from it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-039', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'English and French are both used in Mauritius. Which statement describes their usual places?',
  options:['English in the law and offices, French in the press',
           'French in the law courts, English in the newspapers',
           'Both are used only in the primary school classes',
           'Neither is used outside the capital city itself'],
  answer:'English in the law and offices, French in the press',
  hint:'Think about which language a court judgment is written in, and which a daily paper uses.',
  explanation:'English dominates the law and official administration while French dominates the press and much of broadcasting. The second option reverses the two, and the last two ignore how widely both languages are used across the country.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-040', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'Reunion, the nearest island to Mauritius, is part of which country?',
  options:['France','Britain','Portugal','Norway'],
  answer:'France',
  hint:'That country therefore has a presence in this ocean as well as in Europe.',
  explanation:'Reunion is French territory, which gives France a direct presence in the south-west Indian Ocean and a place in the region alongside its island neighbours. Britain, Portugal and Norway hold no territory beside Mauritius.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-041', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'Which of these is a <b>present-day</b> link with Europe rather than a colonial legacy?',
  options:['Tourists arriving each year from European countries',
           'The French words inside the Mauritian Kreol language',
           'The place names given during the French period here',
           'The civil law code inherited from the French period'],
  answer:'Tourists arriving each year from European countries',
  hint:'Ask which of these is happening now rather than left over from then.',
  explanation:'Tourism is a living link renewed every season, bringing visitors and foreign earnings. The other three are inheritances from the colonial period: they are real links, but they were fixed long ago rather than created by anything happening today.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-042', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
  question:'In which year did the British take Mauritius from the French?',
  answer:1810,
  hint:'It is more than a century after the Dutch left and more than a century before independence.',
  explanation:'Britain captured the island in 1810 and held it until independence in 1968. The French had governed since 1715, so this date marks the change from one European power to the other.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-043', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:3,
  question:'Britain ruled Mauritius for far longer than France did, yet French is still widely used. Why?',
  options:['The British let the settlers keep their language and law',
           'French was made the only official language back in 1968',
           'English was never taught in any Mauritian school at all',
           'The French returned to govern the island again after 1900'],
  answer:'The British let the settlers keep their language and law',
  hint:'Length of rule is not the only thing that decides what survives.',
  explanation:'When Britain took the island the inhabitants were allowed to keep their language, religion and laws, so French use was never displaced. English was taught and became the language of administration, and France never returned to govern.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-044', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:3,
  question:'Why does preferential access to the European market matter so much to a Mauritian exporter?',
  options:['It lets their goods compete against cheaper producers',
           'It removes the need to meet any quality standard at all',
           'It guarantees that the goods will all be bought in full',
           'It fixes the price paid for every single item exported'],
  answer:'It lets their goods compete against cheaper producers',
  hint:'A preference changes one part of the final price, not the quality or the sale.',
  explanation:'Paying a lower duty narrows the gap with producers whose costs are lower, so Mauritian goods can still be sold at a workable price. A preference does not guarantee a sale, fix a price or excuse a producer from meeting the standards of the market.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-045', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:3,
  question:'How does tourism from Europe link the Mauritian economy to the European one?',
  options:['Visitor spending earns foreign currency for Mauritius',
           'European states pay the wages of hotel workers here',
           'Hotels in Mauritius are owned by European councils',
           'Air tickets are bought using Mauritian rupees only'],
  answer:'Visitor spending earns foreign currency for Mauritius',
  hint:'Follow the money the visitor brings, and ask what the country gains from it.',
  explanation:'A visitor spends money earned abroad, so tourism brings in foreign currency that pays for imports. The wages are paid by the hotels themselves, the hotels are not run by foreign councils, and tickets are bought in many currencies.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-046', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:3,
  question:'A pupil says the French and the British legacies can be separated cleanly from one another. Which example shows that they cannot?',
  options:['Civil law is French while the courts run in English',
           'Sugar was grown under both of the colonial powers',
           'Both powers used Port Louis as their main harbour',
           'Each power built roads across the same districts'],
  answer:'Civil law is French while the courts run in English',
  hint:'Look for one institution in which both inheritances are working at once.',
  explanation:'The legal system mixes the two inheritances inside a single institution, so they cannot be pulled apart. The other three describe the two powers doing similar things at different times, which shows succession rather than a mixture.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-047', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:4,
  question:'A Mauritian exporter is told that a European preference the firm has relied on is being reduced. Which response best protects the business?',
  options:['Move into products Europe still buys at a good price',
           'Produce more of the same goods and sell them at a loss',
           'Stop exporting and sell on the home market only',
           'Wait until the preference is put back into place again'],
  answer:'Move into products Europe still buys at a good price',
  hint:'Weigh which response changes what the firm is doing rather than how much of it.',
  explanation:'A narrowing preference means the old product now competes on price it cannot win, so the firm must shift to something where its costs still work. Producing more at a loss deepens the problem, the home market is too small to absorb the output, and waiting assumes a decision that is not the exporter to make.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-048', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:4,
  question:'A pupil argues that because Mauritian civil law came from a French code, Mauritius must still be governed from Paris. Which reply corrects the reasoning?',
  options:['A country can keep an old legal code and rule itself',
           'French law stopped applying in Mauritius after 1810',
           'The code was rewritten in English soon after 1968',
           'Only countries governed from Paris use written codes'],
  answer:'A country can keep an old legal code and rule itself',
  hint:'Separate where a rule came from originally from who decides it now.',
  explanation:'An independent state may keep whatever laws it finds useful, and keeping a code says nothing about who governs. The civil code did continue after 1810 and was not simply rewritten, and written codes are used by many countries with no connection to France at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-049', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:4,
  question:'A school wants <b>one</b> exchange partner that strengthens the European link and also helps pupils in their lessons. Which partner fits best?',
  options:['A French school, since French is taught and used here',
           'A school in a country whose language is not taught here',
           'A school that sends no pupils and only writes letters',
           'A school chosen only because it is the nearest by air'],
  answer:'A French school, since French is taught and used here',
  hint:'Two conditions must be met at once. Test each partner against both.',
  explanation:'A French partner meets both conditions: it is a European link, and the exchange feeds straight into a language pupils already study. An untaught language helps the lessons far less, a letter-only partner is not an exchange, and nearness on its own answers neither condition.' }));

// ── g9sms-links · regional_organisations — 050 … 063 ──────────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-050', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:1,
  question:'Mauritius belongs to SADC. Complete the name: the Southern African Development ______.',
  answer:'Community', alsoAccept:['Community (SADC)'],
  hint:'The missing word is the one that makes a group of states sound like a single body.',
  explanation:'SADC stands for the Southern African Development Community, a grouping of southern African states that cooperate on development as well as on trade. Mauritius belongs to it alongside COMESA.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-051', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:1,
  question:'Which organisation brings together countries once ruled by Britain, which now cooperate as equal members?',
  options:['The Commonwealth','The African Union','The European Union','The United Nations'],
  answer:'The Commonwealth',
  hint:'Its membership is explained by a shared history rather than by a shared region.',
  explanation:'The Commonwealth links states with a common history of British rule, and Mauritius joined it on becoming independent. The other three are defined by a continent, by Europe or by worldwide membership rather than by that history.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-052', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:1,
  question:'The regional body grouping Mauritius with Madagascar, Seychelles, the Comoros and Reunion is the Indian Ocean ______.',
  answer:'Commission', alsoAccept:['Commission (IOC)','Indian Ocean Commission'],
  hint:'The missing word is the one used for a standing body with a specific task.',
  explanation:'The Indian Ocean Commission groups the islands of this part of the ocean, so its concerns are island concerns: the sea, fisheries, disaster warning and cooperation between small neighbours.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-053', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'Which of these is the <b>continental</b> body that Mauritius belongs to?',
  options:['The African Union','The European Union','The Arab League','The Pacific Forum'],
  answer:'The African Union',
  hint:'Match the body to the continent Mauritius is counted as part of.',
  explanation:'Mauritius is an African state, so the continental body it sits in is the African Union. The European Union groups European states, and neither the Arab League nor a Pacific grouping covers this part of the world.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-054', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'Which pair of regional bodies in Africa does Mauritius belong to?',
  options:['SADC and COMESA','NATO and the EU','ASEAN and APEC','OPEC and the G7'],
  answer:'SADC and COMESA',
  hint:'Only one pair is made up of African regional groupings at all.',
  explanation:'Mauritius belongs to both SADC and COMESA, which is why its exporters can use either set of trade arrangements. The other pairs belong to Europe and North America, to south-east Asia and the Pacific, and to oil producers and large economies.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-055', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'Which of these organisations is <b>worldwide</b> rather than regional?',
  options:['The United Nations','The African Union','The Arab League','The Pacific Forum'],
  answer:'The United Nations',
  hint:'Ask which one a country on any continent could join.',
  explanation:'The United Nations is open to states across the world, which is what makes it worldwide rather than regional. The other three each draw their membership from one continent or one region, however large that region may be.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-056', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'SADC and COMESA both cover parts of southern and eastern Africa. Which statement describes what each is mainly for?',
  options:['SADC is for wider development, COMESA for trade',
           'SADC is for defence, COMESA is for the schools',
           'SADC is a bank, COMESA is a court of appeal',
           'SADC is worldwide, COMESA covers one country'],
  answer:'SADC is for wider development, COMESA for trade',
  hint:'Read the full name of each body. The purpose is written into it.',
  explanation:'The full names give the answer: SADC is a Development Community with a broad remit, while COMESA is a Common Market built around trade between its members. Neither is a bank, a court, a defence pact or a worldwide body.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-057', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'Cyclone warning, fisheries and safety at sea are shared island concerns. Which body is built around exactly those?',
  options:['The Indian Ocean Commission','The Commonwealth Secretariat','The Southern Africa Assembly','The African Union Committee'],
  answer:'The Indian Ocean Commission',
  hint:'Which body has a membership made up only of neighbours in one ocean?',
  explanation:'The Indian Ocean Commission groups island neighbours, so the sea itself is its natural subject. The other bodies named are far wider in membership, and a body covering a whole continent or a global membership is not organised around one ocean.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-058', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
  question:'Of these four bodies, how many does Mauritius belong to: the African Union, SADC, COMESA and the Commonwealth?',
  answer:4,
  hint:'Check each one in turn before counting; do not assume any of them is a trap.',
  explanation:'Mauritius belongs to all four. It is an African state in the African Union, a member of both African regional groupings, and a member of the Commonwealth through its history of British rule.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-059', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:3,
  question:'Why does a small island state join several organisations rather than just one?',
  options:['Each one opens a different market or kind of help',
           'Membership of one body is not allowed by any state',
           'Joining more bodies lowers the cost of each of them',
           'A state must join every body inside its own region'],
  answer:'Each one opens a different market or kind of help',
  hint:'Ask what a state would lose if it had to pick a single membership.',
  explanation:'Different bodies bring different things: one a market, another cooperation at sea, another training or a voice in world affairs. A single membership would close off the rest, and joining more costs more rather than less.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-060', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:3,
  question:'Why is sitting in the same organisation as much larger economies useful to Mauritius?',
  options:['Rules agreed together apply to the large members too',
           'The largest member pays the costs of all the smaller',
           'Small states are given more votes than the large ones',
           'Large members must buy goods from the small members'],
  answer:'Rules agreed together apply to the large members too',
  hint:'Think about what a written rule does that a private negotiation does not.',
  explanation:'A shared rule binds every member, so a small state gets terms it could never obtain alone against a much larger partner. Membership does not hand the bill to the biggest member, invert the voting, or force anyone to buy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-061', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:4,
  question:'A minister can attend only one meeting: a COMESA session on tariffs, or a Commonwealth forum on culture. The stated priority this year is raising exports. Which choice follows, and why?',
  options:['COMESA, because tariffs decide what exports cost buyers',
           'Commonwealth, because culture brings in far more visitors',
           'COMESA, because the Commonwealth has no members here',
           'Commonwealth, because it has the larger membership list'],
  answer:'COMESA, because tariffs decide what exports cost buyers',
  hint:'Match the subject of each meeting against the priority, not the size of the body.',
  explanation:'Tariffs sit directly on the price an export reaches a buyer at, so the trade session serves the stated priority. The culture forum is worth attending in another year, the Commonwealth does have members in this region, and the size of a membership list decides nothing about exports.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-062', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:4,
  question:'A regional body proposes one shared cyclone tracking service for all its members. A member state asks why it should not simply build its own. Which argument for sharing is strongest?',
  options:['One service costs each member far less than its own',
           'A shared service reports only to the largest member',
           'Each member would get its warning at a different time',
           'Building alone would mean no warnings at all for years'],
  answer:'One service costs each member far less than its own',
  hint:'Weigh what each state would have to spend, and what it would get for the money.',
  explanation:'A storm crosses every member anyway, so one service watched by all of them buys the same warning at a fraction of the cost to each. The second and third options describe faults rather than arguments for sharing, and the last overstates the case, since a state could build something alone at far greater expense.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-063', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:4,
  question:'Two island states in the same regional body both want to sell tuna into the same distant market. Which use of the body serves both of them?',
  options:['Negotiating one set of terms for the whole region',
           'Agreeing that only one of them may sell any tuna',
           'Asking the body to fix the price that buyers pay',
           'Using the body to close that market to both of them'],
  answer:'Negotiating one set of terms for the whole region',
  hint:'Look for the option in which neither state has to give up its sale.',
  explanation:'Negotiating together gives both sellers better terms than either could win alone, and neither has to stand aside. Splitting the trade helps only one of them, a regional body cannot dictate prices in a distant market, and closing the market helps nobody.' }));

// ── g9sms-links · benefits_of_membership — 064 … 077 ──────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-064', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:1,
  question:'What is the main <b>trade</b> benefit of belonging to a regional trade body?',
  options:['Goods face lower duties in the member countries',
           'Goods can be sold without making any of them first',
           'Prices are fixed by the body for every single seller',
           'Members are paid a sum for each item they export'],
  answer:'Goods face lower duties in the member countries',
  hint:'A trade benefit changes what happens to goods at a border.',
  explanation:'Membership lowers or removes the duty charged when goods cross into another member, so exports arrive cheaper for the buyer. A trade body does not manufacture goods, set every price or pay a bounty on exports.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-065', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:1,
  question:'A tax charged on goods when they cross a border into a country is called an import ______.',
  answer:'duty', alsoAccept:['tariff','tax','import duty','customs duty'],
  hint:'It is the charge a trade agreement is designed to lower or remove.',
  explanation:'An import duty, also called a tariff, is added to goods arriving from abroad and raises the price a buyer pays. Removing it between members is the central benefit of belonging to a trade agreement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-066', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:2,
  question:'Which benefit of membership is <b>not</b> about trade?',
  options:['Joint training and scholarships for young people',
           'Lower duties charged on goods crossing a border',
           'A larger market for the goods that members make',
           'Simpler customs paperwork at each of the borders'],
  answer:'Joint training and scholarships for young people',
  hint:'Three of these change what happens to goods. One changes what happens to people.',
  explanation:'Training and scholarships are cooperation in education, which is a benefit of membership that has nothing to do with selling anything. Duties, market size and customs paperwork are all parts of the trade arrangement itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-067', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:2,
  question:'How does belonging to a large body help a small state in talks with a big economy?',
  options:['It bargains as part of a much larger group',
           'It is allowed to ignore the agreement reached',
           'It pays no fee at all for taking part in talks',
           'It is given the final vote on every decision'],
  answer:'It bargains as part of a much larger group',
  hint:'Think about what changes when the other side is facing many states instead of one.',
  explanation:'A small state negotiating alone has little to offer, but the same state inside a bloc is part of a market the other side wants to reach. Membership does not excuse a state from the agreement, make participation free or hand it a controlling vote.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-068', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:2,
  question:'A shirt is sold for Rs 500 into a country outside the agreement, where an import duty of 20% is charged on it. How many <b>rupees</b> of duty are paid?',
  answer:100,
  hint:'Work out the stated percentage of the selling price given.',
  explanation:'20% of Rs 500 is Rs 100, so the duty adds that much to what the buyer must find. The same shirt sold inside the agreement would carry no such charge, which is what preferential access is worth in rupees.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-069', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:3,
  question:'Why does membership of an organisation bring obligations as well as benefits?',
  options:['Members must follow the rules they agreed together',
           'Members must send workers to every other member',
           'Members give up the right to make any laws at all',
           'Members must buy only from inside the whole group'],
  answer:'Members must follow the rules they agreed together',
  hint:'The benefit and the obligation come from the same document.',
  explanation:'A benefit granted by an agreement is only reliable if everyone keeps to the agreement, so each member accepts rules in exchange. Membership does not send a country workers, abolish its parliament or forbid it to trade outside the group.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-070', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:3,
  question:'A country joins a common market and cheaper imported goods begin to fill the shops. Why is that both a benefit and a problem?',
  options:['Buyers pay less but local makers face competition',
           'Buyers pay more while local makers earn far less',
           'Nobody gains because the prices never change at all',
           'Only the government gains from the lower prices'],
  answer:'Buyers pay less but local makers face competition',
  hint:'Two different groups inside the same country are affected in opposite ways.',
  explanation:'Consumers gain from lower prices while producers who cannot match those prices lose sales, so the same change helps one group and hurts another. Prices do move, and the gain goes to buyers rather than to the government.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-071', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:3,
  question:'Why do small island states value cooperation at sea as highly as cooperation on trade?',
  options:['One state cannot patrol so large an ocean on its own',
           'The sea is owned jointly by all of the member states',
           'Trade agreements do not apply to island states here',
           'Fishing is banned inside every one of the members'],
  answer:'One state cannot patrol so large an ocean on its own',
  hint:'Compare the size of the waters a small state is responsible for with the size of its fleet.',
  explanation:'An island state may be responsible for waters far larger than its own coastline, and no small navy can watch them alone, so shared patrols and shared information are the only workable answer. The sea is not jointly owned, trade rules do apply, and fishing is not banned.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-072', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'A firm can sell a shirt to a member country for Rs 400 with no duty. A buyer outside the agreement offers Rs 500, but an import duty is deducted from that price before the firm is paid. At what <b>percentage</b> duty would the two offers be worth exactly the same to the firm?',
  answer:20,
  hint:'Ask what the outside offer must be reduced to, then what fraction of Rs 500 that reduction is.',
  explanation:'The outside offer must fall to Rs 400 to match, so Rs 100 must be taken off Rs 500. Rs 100 out of Rs 500 is 20%, so any duty above 20% makes the member offer the better one and any duty below it favours the outside buyer.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-073', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'A manufacturer says membership is worthless because the duty saved is only a few rupees on each item. The firm exports 50,000 items a year. Which reply is best?',
  options:['A few rupees on every item is a large yearly sum',
           'The duty saved is the same however much is sold',
           'Duty is only saved on the first items exported',
           'Small savings per item never affect any business'],
  answer:'A few rupees on every item is a large yearly sum',
  hint:'The number that matters is not in the objection. It is in the sentence after it.',
  explanation:'A saving per item has to be multiplied by the number of items: a few rupees across fifty thousand exports is a substantial annual gain. The saving is not a fixed lump, and it applies to every consignment rather than only to the first.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-074', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'A small state must choose between an agreement giving duty-free access to a market of 20 million people, and one giving access to 400 million but requiring it to open its own market in return. Which consideration decides it?',
  options:['Whether local producers can survive the competition',
           'Whether the larger market is nearer by the sea route',
           'Whether the smaller market uses the same currency',
           'Whether the agreement is written in two languages'],
  answer:'Whether local producers can survive the competition',
  hint:'One of the two offers asks for something in return. Weigh what that something costs.',
  explanation:'The larger market is only worth having if the industries at home can withstand the imports that come with it, so that is the decisive question. Distance, currency and the language of the text all matter in practice but none of them settles the trade-off being offered.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-075', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'Two days after a severe cyclone, a member state needs emergency supplies at once. Which benefit of membership matters most at that moment?',
  options:['Agreed arrangements to move help across borders fast',
           'Lower duties charged on goods sold in normal times',
           'Scholarships offered to students from the whole region',
           'A shared seat at the meetings of a wider world body'],
  answer:'Agreed arrangements to move help across borders fast',
  hint:'Ask which benefit can be used within two days of the storm.',
  explanation:'Emergency cooperation is agreed in advance precisely so that aid does not wait for negotiations when a disaster happens. The other three are real benefits of membership but none of them delivers supplies inside two days.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-076', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'A fishing company is told that the regional body will licence and patrol fishing across the whole area. The company fears more rules. Which outcome should it weigh against that fear?',
  options:['Stocks last longer, so the fishing lasts longer too',
           'Licences cost less than the fuel used on each trip',
           'Patrols mean fewer boats are owned in the region',
           'Rules mean the catch can be sold at a fixed price'],
  answer:'Stocks last longer, so the fishing lasts longer too',
  hint:'Set the cost of the rule this year against what the company still has in ten years.',
  explanation:'Unpatrolled waters are fished out, and a company with no fish has no business, so the rule protects the future of the firm as well as the stock. The other options either compare the wrong costs or promise things that licensing does not provide.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-077', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
  question:'A pupil concludes that because Mauritius belongs to four organisations, it must receive four times the benefit. Which reply shows the flaw?',
  options:['Bodies overlap, so some benefits are counted twice',
           'Each body gives exactly the same help as the rest',
           'Only the newest body gives a country any benefit',
           'Benefits are shared out by the size of a member'],
  answer:'Bodies overlap, so some benefits are counted twice',
  hint:'Two memberships that do the same thing do not add up to two separate gains.',
  explanation:'Several bodies cover the same states and the same kinds of trade, so their benefits overlap rather than stack. The bodies are not identical either, which is why membership of more than one is still worth having.' }));

// ── g9sms-economy-today · sectors — 078 … 087 ─────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-078', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:1,
  question:'Which sector of the economy takes raw materials from the land or the sea?',
  options:['The primary sector','The secondary sector','The tertiary sector','The quaternary sector'],
  answer:'The primary sector',
  hint:'Ask which sector comes first in the life of a product.',
  explanation:'The primary sector extracts what nature provides, so farming, fishing and quarrying belong to it. The secondary sector processes those materials, the tertiary sector provides services, and the quaternary sector deals in knowledge and research.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-079', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:1,
  question:'Work that provides a service rather than a good belongs to the ______ sector.',
  answer:'tertiary', alsoAccept:['tertiary sector','service','services'],
  hint:'It is the third of the sectors, counting from the raw material onwards.',
  explanation:'Banking, teaching, transport, retail and tourism all provide services rather than objects, and together they form the largest employer in Mauritius today.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-080', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:2,
  question:'A firm builds houses and office blocks. In which sector is construction placed?',
  options:['The secondary sector','The primary sector','The tertiary sector','The quaternary sector'],
  answer:'The secondary sector',
  hint:'Ask whether the firm takes a raw material, turns it into something, or serves a customer.',
  explanation:'Construction turns cement, steel and timber into a finished structure, which is a making activity and therefore secondary. It is a common mistake to call it a service because a firm is hired to do it, but the output is a physical thing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-081', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:2,
  question:'Which of these is a <b>service</b> rather than a good?',
  options:['A bus journey between two towns','A loaf of bread from a bakery','A shirt sewn in a small factory','A crate of fish landed at a port'],
  answer:'A bus journey between two towns',
  hint:'A good can be held after the money is paid. Ask what is left in your hands.',
  explanation:'A journey is used at the moment it is provided and leaves nothing physical behind, which is what makes it a service. Bread, a shirt and a crate of fish are all objects that exist after the sale.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-082', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:2,
  question:'In one country, 8% of workers are in the primary sector and 22% in the secondary sector. The rest are in the tertiary sector. What <b>percentage</b> works in the tertiary sector?',
  answer:70,
  hint:'The three sectors together must account for all of the workers.',
  explanation:'8% and 22% together account for 30% of the workforce, so the remaining 70% must be in services. A tertiary share of that size is typical of an economy that has moved away from farming.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-083', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:3,
  question:'Why has the share of Mauritian workers in the primary sector fallen while the tertiary share has risen?',
  options:['Machines cut farm jobs while services expanded',
           'Farms closed because the land was all built upon',
           'Services pay less, so more people moved into them',
           'The population fell, so fewer workers were needed'],
  answer:'Machines cut farm jobs while services expanded',
  hint:'Two things happened at once: one sector needed fewer people, another needed more.',
  explanation:'Mechanisation reduced the labour a given crop needs, while tourism, banking and other services grew and drew workers in. The population has not fallen, and people do not move towards worse pay.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-084', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:3,
  question:'Why is a country with most of its output in a single sector more at risk than one spread across several?',
  options:['A shock to that one sector hits the whole economy',
           'Workers in a single sector cannot be trained at all',
           'One sector always produces less than several would',
           'Having one sector means no goods can be exported'],
  answer:'A shock to that one sector hits the whole economy',
  hint:'Imagine the price of that one product falling sharply, and ask what else is left.',
  explanation:'With no second source of earnings, a bad season or a lost market carries straight through to jobs, exports and government revenue. That is why diversifying is treated as protection rather than as an ambition.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-085', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:4,
  question:'A fisherman lands a catch, a plant smokes and packs it, and a supermarket sells it to families. Which placing of the three steps is right?',
  options:['Catching primary, packing secondary, selling tertiary',
           'Catching primary, packing tertiary, selling secondary',
           'Catching secondary, packing primary, selling tertiary',
           'Catching tertiary, packing secondary, selling primary'],
  answer:'Catching primary, packing secondary, selling tertiary',
  hint:'Follow the fish and ask at each step whether something is taken, changed or served.',
  explanation:'The same fish passes through all three sectors: taken from the sea, processed into a packed product, then sold as a service to the customer. The sector describes what is being done at each step, not what the product happens to be.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-086', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:4,
  question:'A cannery claims it belongs to the primary sector because it works with fish. Which correction is right, and why?',
  options:['Secondary, because it processes a raw material',
           'Primary, because the fish come out of the sea',
           'Tertiary, because customers are served with food',
           'Quaternary, because the plant uses new machines'],
  answer:'Secondary, because it processes a raw material',
  hint:'Ask what the cannery itself does, not where its input came from.',
  explanation:'A sector is decided by the activity of the firm, and the cannery changes a raw material into a finished product. Working with fish does not make a factory primary; catching them does. Using machinery does not make it quaternary either.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-087', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:4,
  question:'A government wants to reduce its dependence on one sector. It can support either a new hotel chain or a new software park, and the country already earns most of its foreign income from tourism. Which choice reduces the risk?',
  options:['The software park, since it earns in another sector',
           'The hotel chain, since tourism already works well here',
           'The hotel chain, since hotels employ the most workers',
           'The software park, since software costs less to start'],
  answer:'The software park, since it earns in another sector',
  hint:'The aim is not the biggest earner. It is the earner that does not fall with the others.',
  explanation:'Adding more tourism deepens the dependence the government is trying to reduce, however well tourism performs. A second source of earnings keeps paying when visitor numbers fall, which is the whole point, and that reasoning holds whatever the software park costs to set up.' }));

// ── g9sms-economy-today · factors_of_production — 088 … 102 ───────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpg-088', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:1,
  question:'Land earns rent and capital earns interest. What is the reward earned by <b>labour</b> called?',
  answer:'wages', alsoAccept:['wage','salary','salaries','pay'],
  hint:'It is what a worker is handed at the end of the week or the month.',
  explanation:'Labour is rewarded with wages, the payment made for human effort. Each factor of production has its own reward, which is why land, capital and enterprise are paid in different ways.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpg-089', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:1,
  question:'How many factors of production are usually listed in economics?',
  answer:4,
  hint:'Count them: the natural one, the human one, the made one, and the one that organises the rest.',
  explanation:'The four are land, labour, capital and enterprise. Every business needs some of each, and each one is paid a different reward for its part in production.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-090', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:2,
  question:'In everyday speech people call money in the bank <i>capital</i>. What does capital mean in economics?',
  options:['Goods made in order to produce other goods',
           'Any sum of money held by a business owner',
           'The land on which a business is standing',
           'The people employed to do the work there'],
  answer:'Goods made in order to produce other goods',
  hint:'The economic meaning is about things a firm uses, not about a bank balance.',
  explanation:'Capital in economics means machines, tools, vehicles and buildings, that is, made things used to produce other things. Money buys capital but is not itself capital, and land and workers are separate factors with their own names.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-091', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:2,
  question:'Which factor of production earns <b>rent</b>?',
  options:['Land','Labour','Capital','Enterprise'],
  answer:'Land',
  hint:'Think about what a tenant pays for, month after month.',
  explanation:'Rent is the reward paid for the use of land and natural resources. Labour earns wages, capital earns interest and enterprise earns profit, so each factor is rewarded under a different name.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-092', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:2,
  question:'A worker attends a course and can now operate two machines instead of one. Which factor of production has been improved?',
  options:['Labour, because the worker is now more skilled',
           'Capital, because a machine has just been bought',
           'Land, because the site is now being used better',
           'Enterprise, because a new risk has been taken'],
  answer:'Labour, because the worker is now more skilled',
  hint:'Nothing new has been bought. Ask what has changed instead.',
  explanation:'Training raises the quality of labour, which is why skill is described as part of that factor rather than as something separate. No machine, site or ownership decision has changed, so none of the other three factors is involved.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-093', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:2,
  question:'Which factor of production organises the other three and carries the risk of a loss?',
  options:['Enterprise','Land','Labour','Capital'],
  answer:'Enterprise',
  hint:'Ask who decides what to make, and who pays if nobody buys it.',
  explanation:'Enterprise brings the other factors together and bears the risk, which is why its reward is profit rather than a fixed payment. Land, labour and capital are each paid whether or not the venture succeeds.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-094', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:3,
  question:'A river runs through a factory site and is used in production. Why is the river counted as land rather than as capital?',
  options:['It is a natural resource and not something made',
           'It is owned by the state and not by the firm',
           'It is used by the workers and not by machines',
           'It costs nothing at all to the firm that uses it'],
  answer:'It is a natural resource and not something made',
  hint:'The test is where the thing came from, not who owns it or what it costs.',
  explanation:'Land covers every natural resource, and a river was not produced by anybody. Capital must be made, which is the line between the two factors. Ownership and cost do not decide which factor something belongs to.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-095', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:3,
  question:'Why does a firm that buys better machines often need fewer workers for the same output?',
  options:['Capital does part of the work labour used to do',
           'Workers are always paid more when machines come',
           'Machines are counted as workers within the total',
           'Land becomes more productive when it is built on'],
  answer:'Capital does part of the work labour used to do',
  hint:'Two factors can sometimes do the same job. Ask what follows when one of them improves.',
  explanation:'Capital and labour can substitute for one another, so better machinery takes over tasks that people were doing. Machines are not counted as workers, pay does not automatically rise, and the change has nothing to do with land.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-096', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:3,
  question:'Why is enterprise hard to replace with the other three factors?',
  options:['Someone must decide what to make and risk the loss',
           'Machines cannot be bought without a loan from a bank',
           'Workers refuse to work unless an owner is present',
           'Land cannot be rented without a written agreement'],
  answer:'Someone must decide what to make and risk the loss',
  hint:'Land, labour and capital can all be hired. Ask what cannot be.',
  explanation:'Land, labour and capital can all be bought or hired at a known price, but the judgement about what to produce, and the willingness to lose money if it fails, cannot be. That is what enterprise supplies and why its reward is uncertain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-097', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'A bakery hires a delivery lorry from a transport firm rather than buying one. Which factor of production is the lorry itself, whoever owns it?',
  options:['Capital, because it is a made aid to production',
           'Land, because it moves over the public roads',
           'Labour, because a person must drive it about',
           'Enterprise, because hiring it was a decision'],
  answer:'Capital, because it is a made aid to production',
  hint:'Classify the vehicle, not the arrangement by which the bakery got hold of it.',
  explanation:'A lorry is a manufactured thing used to produce or deliver other goods, so it is capital whether it is bought or hired. The road is land, the driver is labour and the decision is enterprise, but none of those is the vehicle.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-098', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'A planter can spend the same sum on either more land or a mechanical harvester. Workers are hard to find and wages are rising. Which purchase answers that problem, and why?',
  options:['The harvester, because it replaces scarce labour',
           'More land, because a larger crop pays the wages',
           'More land, because land keeps its value longest',
           'The harvester, because machines never break down'],
  answer:'The harvester, because it replaces scarce labour',
  hint:'Match the purchase to the shortage described, not to the best investment in general.',
  explanation:'The stated problem is a shortage of labour, and capital is the factor that can stand in for it. Buying more land makes the labour problem worse by needing more hands, and machines certainly do break down, so that reasoning would not support the choice.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-099', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'A workshop doubles the number of workers but output rises only slightly. The manager blames the workers. Which explanation is more likely?',
  options:['Too little capital and space for so many workers',
           'The workers were each given too much training',
           'Land is the only factor that raises any output',
           'Enterprise falls whenever more people are hired'],
  answer:'Too little capital and space for so many workers',
  hint:'Ask what the extra workers had to share once they arrived.',
  explanation:'Adding one factor while the others stay fixed gives each new worker less equipment and less room, so the extra output per worker shrinks. The problem is the balance between the factors, not the effort of the people hired.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-100', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'A young Mauritian opens a snack stall using her own savings, a rented pitch and her own work. Which factors is she supplying <b>in person</b>?',
  options:['Enterprise and labour, with capital from savings',
           'Land and labour, with enterprise from the rented pitch',
           'Capital and land, with labour bought in from others',
           'Enterprise alone, since the rest is hired or bought'],
  answer:'Enterprise and labour, with capital from savings',
  hint:'Sort what she provides herself from what she pays somebody else for.',
  explanation:'She makes the decisions and takes the risk, which is enterprise, and she does the work, which is labour. The pitch is land rented from its owner, and her savings buy the equipment that counts as capital.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-101', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'A hotel wants to raise output per worker without hiring anybody else. Which action follows from the factors of production?',
  options:['Invest in equipment that speeds up each task',
           'Buy a larger site next to the present one',
           'Raise the price charged for every room sold',
           'Ask the owner to take on more of the risks'],
  answer:'Invest in equipment that speeds up each task',
  hint:'Output per worker rises when the worker is given more to work with.',
  explanation:'Adding capital lets the same staff do more in the same time, which is exactly what output per worker measures. More land does not help if the staff are already stretched, and a higher price or a change in risk-taking alters revenue rather than productivity.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-102', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:4,
  question:'Two firms in the same trade have similar land, similar machines and similar staff numbers, yet one earns much more than the other. Which factor most likely explains the gap?',
  options:['Enterprise, in how the other three are organised',
           'Land, because one of the sites is nearer the market',
           'Labour, because one firm must pay higher wages',
           'Capital, because one firm has slightly newer machines'],
  answer:'Enterprise, in how the other three are organised',
  hint:'Three of the factors are described as similar. Which one was not mentioned?',
  explanation:'When the measurable inputs are alike, the difference lies in the judgement applied to them: what to produce, how to organise it and which risks to take. The other explanations point at factors the question has already described as similar.' }));

// ── g9sms-economy-today · siting_a_factory — 103 … 117 ────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-103', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:1,
  question:'Which of these is a genuine factor in deciding where to site a factory?',
  options:['The cost of the land it will stand on',
           'The colour of the factory building',
           'The name chosen for the company',
           'The day of the week it opens on'],
  answer:'The cost of the land it will stand on',
  hint:'A siting factor must differ from one place to another.',
  explanation:'Land costs vary sharply between one part of the island and another, so they weigh directly on where a firm builds. A colour, a company name and an opening day are the same wherever the factory is put.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-104', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:2,
  question:'A factory has to bring in heavy imported raw materials by ship. Which site feature matters most to it?',
  options:['Being close to the harbour','Being close to a school','Being far from a main road','Being high on a hillside'],
  answer:'Being close to the harbour',
  hint:'Heavy things are expensive to move. Ask where they arrive.',
  explanation:'The nearer the factory is to the port, the shorter the haul for every heavy load, which is where the cost of a bulky import is concentrated. A hillside site and a site far from a road make that haul worse rather than better.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-105', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:2,
  question:'Why does almost every factory need a reliable supply of electricity and water?',
  options:['Machines and processes stop without them',
           'Workers cannot be paid without them',
           'Land is cheaper where they are absent',
           'Transport costs rise wherever they are used'],
  answer:'Machines and processes stop without them',
  hint:'Ask what actually happens on the factory floor when the supply fails.',
  explanation:'Power runs the machinery and water is used in cleaning, cooling and many processes, so an interruption halts production and costs the firm output it cannot recover. Wages, land prices and transport are separate matters.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-106', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:3,
  question:'Why is cheap land on its own a poor reason to choose a site?',
  options:['Transport and labour costs may wipe out the saving',
           'Land that costs little is never large enough to build',
           'A cheap site cannot be bought by a private company',
           'Cheap land has to be paid for in a single payment'],
  answer:'Transport and labour costs may wipe out the saving',
  hint:'Land is bought once. Ask which costs come back every week.',
  explanation:'Rent is one cost among several, and a remote cheap site can add haulage and staff travel every single week until the saving is gone. The other statements describe restrictions that do not generally apply to cheap land.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-107', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A textile firm exporting most of its output must choose between a site beside the motorway 3 km from Port Louis and a cheaper site in the centre of the island. Which argument most favours the first?',
  options:['Exported cloth reaches the harbour with less haulage',
           'The centre of the island has cooler air in the summer',
           'Land beside a motorway is the cheaper of the two sites',
           'Workers prefer a site that is far from any main road'],
  answer:'Exported cloth reaches the harbour with less haulage',
  hint:'The firm exports. Follow the finished goods to the point where they leave the country.',
  explanation:'Every consignment has to reach the port, so a short run to Port Louis cuts a cost that recurs on every shipment and can outweigh a lower rent. The third option contradicts the question, and comfort and cool air do not decide a siting question of this kind.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-108', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A company plans a fish-processing plant. Which argument decides that it should be sited at the landing place rather than inland?',
  options:['The catch spoils if it travels far before packing',
           'Fishermen are paid more when the plant is nearby',
           'A plant near the sea pays less for its land area',
           'Packing needs sea water drawn from the harbour'],
  answer:'The catch spoils if it travels far before packing',
  hint:'Ask what happens to the raw material itself during the journey.',
  explanation:'Fish is perishable, so distance between the boat and the plant costs quality and therefore money on every load. Coastal land is often dearer rather than cheaper, and the price paid to fishermen is set by the market rather than by the distance.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-109', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A firm bottling soft drinks needs a site. Water is by far its largest input by volume. Which site should it choose?',
  options:['A site with a large and steady water supply',
           'A site with the lowest rent found anywhere',
           'A site beside the international airport road',
           'A site with the largest area of car parking'],
  answer:'A site with a large and steady water supply',
  hint:'One input dominates this business. Site the plant where that input is secure.',
  explanation:'A bottling plant that runs short of water stops entirely, so security of supply outranks every other consideration for this particular firm. Cheap rent, airport access and parking are all worth having but none of them keeps the line running.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-110', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A bakery supplies fresh bread to the shops of one town every morning. Where should it be sited, and why?',
  options:['Close to the town, because bread is sold fresh daily',
           'Far from the town, because the land costs less there',
           'Near the harbour, because the flour arrives by ship',
           'Near the airport, because deliveries then travel fast'],
  answer:'Close to the town, because bread is sold fresh daily',
  hint:'Compare how often the input arrives with how often the output must be delivered.',
  explanation:'Flour comes in occasionally and keeps, while bread must reach the shops every morning and loses value by the hour, so the firm sites itself near its market. A site chosen for the flour or for cheap land would add a delivery run to every single day.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-111', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A workshop cutting and welding steel applies to move onto a plot next to a housing estate. Which objection is the council most likely to uphold?',
  options:['Noise and fumes would reach the homes all day',
           'The workshop would employ too many local people',
           'Steel would have to travel further to the workshop',
           'The estate would gain from having new shops nearby'],
  answer:'Noise and fumes would reach the homes all day',
  hint:'Ask what the neighbours would experience, not what the firm would spend.',
  explanation:'Planning decisions weigh the effect on people living nearby, and continuous noise and fumes beside houses is the standard ground for refusal. Local jobs and nearby shops are arguments in favour, and the distance steel travels is the concern of the firm rather than of the council.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-112', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A company setting up a call centre serving customers abroad must pick a location. Which choice fits the work?',
  options:['A town with trained staff and a fast data link',
           'A site beside the harbour with deep water there',
           'A plot near the cane fields with room to expand',
           'A place with the cheapest electricity available'],
  answer:'A town with trained staff and a fast data link',
  hint:'Nothing physical leaves this business. Ask what does leave it.',
  explanation:'A call centre ships no goods, so port access and open land are worth little to it; what it needs is people who can do the work and a connection that carries the calls. Cheap power matters to a heavy industry rather than to an office.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-113', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'Sugar cane loses sucrose within hours of being cut. Where should a mill that crushes it be built?',
  options:['Among the cane fields it will take its crop from',
           'Beside the harbour from which the sugar leaves',
           'In the largest town so that workers live nearby',
           'On high ground where the air stays cool at night'],
  answer:'Among the cane fields it will take its crop from',
  hint:'Ask which of the two journeys, cane in or sugar out, cannot be delayed.',
  explanation:'Cut cane must be crushed quickly or the crop loses value, so the mill goes to the cane. The finished sugar keeps well and can travel to the port at any time, which is why the harbour is the tempting but wrong end of the process to site the mill at.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-114', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A firm is offered a site at half the rent, 30 km from the nearest town with a trained workforce. Which cost should it weigh against that saving?',
  options:['Transporting or housing workers on every working day',
           'Paying a higher price for the land that it is renting',
           'Fitting the building with the same machines as before',
           'Insuring a building that stands in a quiet neighbourhood'],
  answer:'Transporting or housing workers on every working day',
  hint:'The saving is annual. Ask which new cost is daily.',
  explanation:'Staff have to reach the site every day, so distance from the labour supply turns into a recurring bill for transport, allowances or higher wages. The rent is already lower by assumption, and the machinery and the insurance would cost much the same anywhere.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-115', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A grower air-freights cut flowers to Europe and they must be in the shops within a day of cutting. Which site is right?',
  options:['Near the airport, so the flowers are loaded fast',
           'Near the harbour, so a ship can be loaded quickly',
           'Near the capital, so buyers can visit the farm site',
           'Near the mountains, where the air stays much cooler'],
  answer:'Near the airport, so the flowers are loaded fast',
  hint:'The deadline is a day. Ask which way out of the country can meet it.',
  explanation:'Only air freight can move flowers to Europe inside a day, so minutes spent on the road to the airport come straight out of the time the flowers have left. A ship takes far too long, and neither buyer visits nor cool air answers the deadline.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-116', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A manager states that the cheapest site always gives a firm the lowest total cost. Which consideration shows the reasoning is incomplete?',
  options:['Costs of moving goods and staff also fall on the firm',
           'The price of land changes a little from year to year',
           'A cheap site may turn out larger than the firm needs',
           'Cheap sites are usually found close to the harbour'],
  answer:'Costs of moving goods and staff also fall on the firm',
  hint:'The claim compares one cost only. Name the costs it leaves out.',
  explanation:'Total cost includes transport of materials, distribution of output and getting staff to work, and those can exceed the rent saved many times over. A changing land price or a site that is too large are real issues but neither shows the argument to be incomplete.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpg-117', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:4,
  question:'A firm is offered a five-year tax holiday on a site far from the port, or no incentive at all on a site beside it. What should decide the choice?',
  options:['Whether the saving outlasts the extra haulage cost',
           'Whether the tax holiday is paid out as a lump sum',
           'Whether the port site is owned by the government',
           'Whether the far site is offered on a longer lease'],
  answer:'Whether the saving outlasts the extra haulage cost',
  hint:'One benefit has an end date and one cost does not. Compare them over the life of the factory.',
  explanation:'The incentive runs out after five years while the extra distance to the port is paid on every consignment for as long as the factory operates, so the comparison has to be made over the longer period. Ownership, lease length and the form of the payment do not settle that balance.' }));

})();
