'use strict';
// Grade 8 Social & Modern Studies — Core questions, all 5 chapters
// IDs: g8sms-slavery-001…, g8sms-society-001…, g8sms-independence-001…,
//      g8sms-democracy-001…, g8sms-climate-001…

STATIC_QUESTIONS.push(

  // ── Slavery & Indentured Labour — slave_trade ─────────────────────────────

  makeMCQ({ id:'g8sms-slavery-001', chapterId:'g8sms-slavery', difficulty:1, subsection:'slave_trade',
    question:'During the French colonial period, enslaved workers in Mauritius were mainly brought from:',
    options:['East Africa and Madagascar','India and China','Europe and America','Australia and the Pacific'],
    answer:'East Africa and Madagascar',
    hint:'France\'s colonies in Africa were the main source of enslaved people for Mauritius.',
    explanation:'During the <b>French period (1715–1810)</b>, enslaved people were brought mainly from <b>East Africa and Madagascar</b> to work on sugar plantations. This forced migration shaped the Creole population of Mauritius.' }),

  makeMCQ({ id:'g8sms-slavery-002', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'What were the main conditions of enslaved people on sugar plantations in Mauritius?',
    options:['They had no rights, were treated as property and were forced to work without pay','They were paid wages and had days off each week','They were treated the same as free workers','They could own land and businesses'],
    answer:'They had no rights, were treated as property and were forced to work without pay',
    hint:'Slavery is the ownership of people as property — they had no freedom.',
    explanation:'Enslaved people in Mauritius had <b>no legal rights</b>. They were treated as property of their owners, were forced to work without pay, lived in poor conditions (labour camps) and faced harsh punishment for disobedience.' }),

  makeMCQ({ id:'g8sms-slavery-003', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'Slavery in Mauritius was used primarily to:',
    options:['Provide cheap labour for sugar plantation agriculture','Populate the island with settlers','Build roads and public buildings only','Provide domestic servants only'],
    answer:'Provide cheap labour for sugar plantation agriculture',
    hint:'The plantation economy depended entirely on enslaved labour.',
    explanation:'Slavery in Mauritius was an <b>economic labour system</b>. Planters needed a large workforce to grow and harvest sugarcane. Enslaved Africans provided this <b>forced, unpaid labour</b>, making sugar production highly profitable for the plantation owners.' }),

  makeMCQ({ id:'g8sms-slavery-004', chapterId:'g8sms-slavery', difficulty:3, subsection:'slave_trade',
    question:'The "Code Noir" during the French period was:',
    options:['A set of laws that regulated the treatment of enslaved people and their owners\' rights','A French newspaper','A type of sugar produced in Mauritius','A French military code'],
    answer:'A set of laws that regulated the treatment of enslaved people and their owners\' rights',
    hint:'It was a legal code relating to the institution of slavery.',
    explanation:'The <b>Code Noir</b> (Black Code) was a set of French colonial laws that defined the conditions of slavery, including the "rights" and duties of slave owners and the rules governing enslaved people. Despite its claims to regulate treatment, it fundamentally upheld the system of enslavement.' }),

  // ── Slavery & Indentured Labour — abolition_slavery ──────────────────────

  makeMCQ({ id:'g8sms-slavery-005', chapterId:'g8sms-slavery', difficulty:1, subsection:'abolition_slavery',
    question:'In which year was slavery abolished in Mauritius?',
    options:['1835','1715','1968','1810'],
    answer:'1835',
    hint:'It happened under British rule, shortly after Britain captured Mauritius in 1810.',
    explanation:'Slavery was <b>officially abolished in Mauritius on 1 February 1835</b> following the British Slavery Abolition Act of 1833. The anniversary, called <b>Abolition Day</b>, is commemorated on 1 February each year.' }),

  makeMCQ({ id:'g8sms-slavery-006', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'The apprenticeship system that followed abolition in 1835 meant that:',
    options:['Freed enslaved people were required to continue working for their former owners for a period (4–6 years)','Freed people were immediately given land and money','Former owners had to pay their workers immediately','All freed people left Mauritius'],
    answer:'Freed enslaved people were required to continue working for their former owners for a period (4–6 years)',
    hint:'The apprenticeship was a transition period before full freedom.',
    explanation:'After abolition in 1835, a <b>4-year apprenticeship</b> period was introduced. Freed people were legally compelled to continue working for their former owners during this time. Full freedom was granted in <b>1839</b>. Many then left the estates.' }),

  makeMCQ({ id:'g8sms-slavery-007', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'Why did plantation owners seek a new labour force after the abolition of slavery?',
    options:['Because many freed people refused to continue working on plantations and moved away','Because freed people demanded too high wages and left Mauritius','Because slavery was never abolished','Because the British government expelled all freed people'],
    answer:'Because many freed people refused to continue working on plantations and moved away',
    hint:'After gaining freedom, many former enslaved people chose to leave the plantations.',
    explanation:'After abolition, many freed people <b>left the sugar estates</b>, unwilling to continue working in conditions that reminded them of slavery. This created a labour shortage that planters addressed by importing <b>indentured workers from India</b>.' }),

  // ── Slavery & Indentured Labour — indenture_system ───────────────────────

  makeMCQ({ id:'g8sms-slavery-008', chapterId:'g8sms-slavery', difficulty:1, subsection:'indenture_system',
    question:'Indian indentured labourers came to Mauritius under a contract system. This means they:',
    options:['Agreed to work for a fixed period (usually 5 years) in exchange for passage and a small wage','Were forced to come against their will with no agreement','Came as tourists and stayed voluntarily','Came to invest in businesses'],
    answer:'Agreed to work for a fixed period (usually 5 years) in exchange for passage and a small wage',
    hint:'An "indenture" is a contract — workers agreed to specific terms.',
    explanation:'<b>Indentured labourers</b> signed a contract (indenture) agreeing to work for a fixed period, usually <b>5 years</b>, in exchange for free passage to Mauritius and a small wage. In practice, conditions were often exploitative and similar to slavery.' }),

  makeMCQ({ id:'g8sms-slavery-009', chapterId:'g8sms-slavery', difficulty:2, subsection:'indenture_system',
    question:'When did Indian indentured immigration to Mauritius begin and end?',
    options:['1834 to 1920','1715 to 1810','1968 to present','1638 to 1710'],
    answer:'1834 to 1920',
    hint:'Indenture began after slavery was abolished and ended in the early 20th century.',
    explanation:'Indian indentured immigration to Mauritius began in <b>1834</b> (just before abolition) and ended in <b>1920</b>. During this period, approximately <b>450,000 Indians</b> arrived in Mauritius.' }),

  makeMCQ({ id:'g8sms-slavery-010', chapterId:'g8sms-slavery', difficulty:3, subsection:'indenture_system',
    question:'Why is the indentured labour system sometimes compared to slavery?',
    options:['Workers had limited freedom, harsh conditions and were often unable to leave even after their contract ended','Workers were paid exactly the same as free labourers','Workers could travel freely and leave whenever they wished','The system was identical to modern employment contracts'],
    answer:'Workers had limited freedom, harsh conditions and were often unable to leave even after their contract ended',
    hint:'Despite being a contract system, indentured workers faced severe restrictions.',
    explanation:'Indentured labourers faced <b>restricted freedom of movement</b>, were subject to strict laws (like the "Vagrancy Ordinance"), lived in poor conditions and faced criminal penalties for breaking their contracts. Critics called it a <b>"new system of slavery"</b>.' }),

  makeMCQ({ id:'g8sms-slavery-011', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'The Aapravasi Ghat in Port-Louis is a UNESCO World Heritage Site because:',
    options:['It was the landing point for hundreds of thousands of indentured labourers arriving in Mauritius','It was the first sugar factory in Mauritius','It was the colonial governor\'s residence','It was built by enslaved Africans'],
    answer:'It was the landing point for hundreds of thousands of indentured labourers arriving in Mauritius',
    hint:'Aapravasi Ghat means "Immigration Depot" in Hindi.',
    explanation:'<b>Aapravasi Ghat</b> (Immigration Depot) in Port-Louis was where hundreds of thousands of Indian indentured labourers first set foot in Mauritius. It is a <b>UNESCO World Heritage Site</b> recognising the significance of the indenture system in world history.' }),

  makeMCQ({ id:'g8sms-slavery-012', chapterId:'g8sms-slavery', difficulty:3, subsection:'slave_trade',
    question:'How did the slave trade and indenture system shape the cultural and demographic makeup of modern Mauritius?',
    options:['They brought people from Africa, Madagascar and India, creating the diverse multicultural society of Mauritius today','They had no lasting effect on Mauritian society','They created a society where only one culture survived','They reduced the population of Mauritius to almost nothing'],
    answer:'They brought people from Africa, Madagascar and India, creating the diverse multicultural society of Mauritius today',
    hint:'The population movements of the colonial era are the foundation of modern Mauritian diversity.',
    explanation:'The <b>slave trade</b> (bringing Africans and Malagasy) and the <b>indenture system</b> (bringing Indians) fundamentally shaped Mauritius. The descendants of these groups, alongside European and Chinese communities, make up the diverse, multicultural Mauritius of today.' }),

  // ── Mauritian Society, 1920s to 1960s — post_ww1_conditions ──────────────

  makeMCQ({ id:'g8sms-society-001', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'At the end of World War I (1918), the social conditions for most Mauritians were characterised by:',
    options:['Poverty, low wages, poor housing and limited political rights for the majority','Widespread prosperity and democracy','Equal rights for all citizens','Full employment and high wages'],
    answer:'Poverty, low wages, poor housing and limited political rights for the majority',
    hint:'Most Mauritians in 1918 were sugar estate workers with very limited rights.',
    explanation:'After World War I, most Mauritians (particularly indentured workers and their descendants) faced <b>poverty, low wages, poor housing</b> and had <b>very limited political rights</b>. Political power was concentrated among the Franco-Mauritian planter class.' }),

  makeMCQ({ id:'g8sms-society-002', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'The sugar industry dominated Mauritian society in the 1920s because:',
    options:['It was the main economic activity and the Franco-Mauritian planter class controlled most of the land and wealth','Mauritius had no other natural resources','The government forced all citizens to work in sugar','Sugar was the only food grown in Mauritius'],
    answer:'It was the main economic activity and the Franco-Mauritian planter class controlled most of the land and wealth',
    hint:'Sugar was the economic backbone of Mauritius, controlled by a small elite.',
    explanation:'By the 1920s, <b>sugarcane</b> occupied most of Mauritius\' arable land. The <b>Franco-Mauritian planter class</b> controlled this industry and thus dominated social, economic and political life. The majority of Mauritians worked as labourers on their estates.' }),

  makeMCQ({ id:'g8sms-society-003', chapterId:'g8sms-society', difficulty:3, subsection:'post_ww1_conditions',
    question:'The cyclone of 1945 and the post-war period accelerated social change in Mauritius because:',
    options:['Economic hardship increased political awareness and demand for workers\' rights and democratic representation','Everything improved immediately after the cyclone','The cyclone destroyed the sugar industry permanently','Britain granted independence immediately after 1945'],
    answer:'Economic hardship increased political awareness and demand for workers\' rights and democratic representation',
    hint:'Crisis can motivate people to demand change.',
    explanation:'Post-war hardships and the 1945 cyclone intensified <b>political awareness</b> among Mauritians. Workers and political leaders demanded better wages, conditions and greater <b>democratic representation</b>, accelerating the movement towards independence.' }),

  // ── Mauritian Society, 1920s to 1960s — social_economic_changes ──────────

  makeMCQ({ id:'g8sms-society-004', chapterId:'g8sms-society', difficulty:1, subsection:'social_economic_changes',
    question:'Universal adult suffrage was introduced in Mauritius in:',
    options:['1959','1968','1835','1920'],
    answer:'1959',
    hint:'This allowed all adult Mauritians to vote for the first time.',
    explanation:'<b>Universal adult suffrage</b> was introduced in Mauritius in <b>1959</b>, allowing all adult citizens to vote regardless of their gender, race or property. This was a major step towards democratic representation before independence.' }),

  makeMCQ({ id:'g8sms-society-005', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'Trade unions became important in Mauritius in the 1930s–1960s because:',
    options:['They organised workers to demand better wages, working conditions and workers\' rights','They were created by the colonial government to help plantation owners','They had no political role','They prevented strikes and labour unrest'],
    answer:'They organised workers to demand better wages, working conditions and workers\' rights',
    hint:'Trade unions represent workers in negotiations with employers.',
    explanation:'<b>Trade unions</b> played a crucial role in the 1930s–1960s by organising workers to demand <b>better wages, shorter working hours and improved conditions</b>. Leaders like Emmanuel Anquetil were important figures in the early labour movement.' }),

  makeMCQ({ id:'g8sms-society-006', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'The Bissoondoyal brothers are associated with which contribution to Mauritian society?',
    options:['Promoting Hindi education and the cultural rights of the Indian community','Building the first sugar factory in Mauritius','Leading the 1968 independence negotiations','Creating the Mauritian currency'],
    answer:'Promoting Hindi education and the cultural rights of the Indian community',
    hint:'They founded movements to educate the Mauritian Indian community.',
    explanation:'<b>Sookdeo Bissoondoyal and Basdeo Bissoondoyal</b> were influential leaders who promoted <b>Hindi language education</b> and the cultural and political rights of the Mauritian Indian community in the mid-20th century.' }),

  // ── Mauritian Society, 1920s to 1960s — mauritian_society ────────────────

  makeMCQ({ id:'g8sms-society-007', chapterId:'g8sms-society', difficulty:2, subsection:'mauritian_society',
    question:'The "General Population" in Mauritian social classification historically refers to:',
    options:['Citizens who do not identify with the Hindu, Muslim or Sino-Mauritian communities — mainly Creoles and Franco-Mauritians','All citizens of Mauritius regardless of background','Only French-speaking Mauritians','Only descendants of enslaved Africans'],
    answer:'Citizens who do not identify with the Hindu, Muslim or Sino-Mauritian communities — mainly Creoles and Franco-Mauritians',
    hint:'Mauritius used a community-based classification in its constitution.',
    explanation:'The Mauritian constitution uses a <b>Best Loser System</b> based on four community classifications: Hindu, Muslim, Sino-Mauritian and <b>General Population</b>. The last category includes Creoles, Franco-Mauritians and others.' }),

  makeMCQ({ id:'g8sms-society-008', chapterId:'g8sms-society', difficulty:3, subsection:'mauritian_society',
    question:'The 1968 communal disturbances (riots) before independence were significant because:',
    options:['They showed the tensions between communities and made inter-communal harmony a priority for the new government','They caused Mauritius to delay independence for 20 years','They had no effect on Mauritian politics','They were caused entirely by foreign interference'],
    answer:'They showed the tensions between communities and made inter-communal harmony a priority for the new government',
    hint:'The riots occurred just months before independence in March 1968.',
    explanation:'The <b>1968 communal riots</b> in Mauritius occurred in January-February 1968, just weeks before independence. They revealed deep <b>inter-communal tensions</b> and made social harmony and inclusion a central priority for the newly independent government led by Sir SSR.' }),

  makeMCQ({ id:'g8sms-society-009', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'The Mauritius Labour Party (MLP), founded in 1936, was significant because:',
    options:['It was the first major political party to represent the interests of workers and the majority population','It was created by plantation owners to protect their interests','It was founded only to oppose independence','It was only for the Chinese community'],
    answer:'It was the first major political party to represent the interests of workers and the majority population',
    hint:'It was linked to the labour movement and eventually led Mauritius to independence.',
    explanation:'The <b>Mauritius Labour Party (MLP)</b>, founded in 1936 by Maurice Curé and later led by <b>SSR Ramgoolam</b>, was the first major party representing working-class and majority interests. It led Mauritius to independence in 1968.' }),

  makeMCQ({ id:'g8sms-society-010', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'Economic diversification in Mauritius after the 1960s meant:',
    options:['Moving away from dependence on sugar towards manufacturing, tourism and financial services','Growing more sugarcane','Reducing the population','Banning foreign investment'],
    answer:'Moving away from dependence on sugar towards manufacturing, tourism and financial services',
    hint:'Diversification reduces dependence on a single industry.',
    explanation:'After independence, Mauritius pursued <b>economic diversification</b>: development of an <b>Export Processing Zone (EPZ)</b> (manufacturing), the <b>tourism industry</b> and later <b>financial services and ICT</b>. This transformed Mauritius from a single-crop economy to a diverse one.' }),

  makeMCQ({ id:'g8sms-society-011', chapterId:'g8sms-society', difficulty:3, subsection:'mauritian_society',
    question:'The "Mauritian miracle" refers to:',
    options:['Mauritius\' remarkable economic transformation from a poor, sugar-dependent colony to an upper-middle-income country within decades','The disappearance of the dodo','The discovery of oil in Mauritius','The construction of the Port-Louis harbour'],
    answer:'Mauritius\' remarkable economic transformation from a poor, sugar-dependent colony to an upper-middle-income country within decades',
    hint:'Economists and the World Bank have studied Mauritius as a model of development.',
    explanation:'The "<b>Mauritian miracle</b>" refers to the country\'s extraordinary economic transformation since independence. Mauritius went from a <b>low-income, sugar-dependent economy</b> to an <b>upper-middle-income economy</b> through sound governance, diversification and investment in education.' }),

  makeMCQ({ id:'g8sms-society-012', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'Which major infrastructure change transformed Mauritian society in the mid-20th century?',
    options:['The expansion of education, with more schools built and free primary education introduced','The building of the first airport in 2000','The construction of a metro system in the 1930s','The introduction of the internet in 1970'],
    answer:'The expansion of education, with more schools built and free primary education introduced',
    hint:'Education is a key driver of social mobility and development.',
    explanation:'The expansion of the <b>education system</b> — including the introduction of <b>free primary education</b> — was transformative. It enabled children of formerly enslaved and indentured families to access education, leading to greater social mobility.' }),

  // ── The Way to Independence — empires_colonies ────────────────────────────

  makeMCQ({ id:'g8sms-independence-001', chapterId:'g8sms-independence', difficulty:1, subsection:'empires_colonies',
    question:'A colony is:',
    options:['A territory controlled and governed by a foreign power','An independent nation','A type of farming community','A form of democratic government'],
    answer:'A territory controlled and governed by a foreign power',
    hint:'Mauritius was a British colony from 1810 to 1968.',
    explanation:'A <b>colony</b> is a territory that is controlled and governed by a foreign power (the "mother country"). Mauritius was a <b>British colony</b> from 1810 until independence in 1968.' }),

  makeMCQ({ id:'g8sms-independence-002', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'At the height of the British Empire in the early 20th century, it controlled approximately:',
    options:['A quarter of the world\'s land surface','Only islands in the Caribbean','Only countries in Africa','Only territories in Asia'],
    answer:'A quarter of the world\'s land surface',
    hint:'The British Empire was the largest empire in history.',
    explanation:'At its peak, the <b>British Empire</b> controlled approximately a <b>quarter of the world\'s land surface</b> and a quarter of the world\'s population, making it the largest empire in history.' }),

  makeMCQ({ id:'g8sms-independence-003', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'European colonial powers justified colonialism by claiming it brought "civilisation" to colonised peoples. Why is this justification rejected today?',
    options:['Because colonialism exploited colonised peoples, suppressed their cultures and denied their rights and humanity','Because Europe actually had no impact on its colonies','Because all colonised peoples agreed with this view','Because the colonies were already fully developed'],
    answer:'Because colonialism exploited colonised peoples, suppressed their cultures and denied their rights and humanity',
    hint:'The reality of colonialism involved exploitation, not just "development".',
    explanation:'The "civilising mission" was a <b>self-serving justification</b> for colonialism that ignored colonial realities: exploitation of resources and labour, suppression of local cultures and languages, racism and the denial of self-determination. Modern scholarship rejects this justification entirely.' }),

  // ── The Way to Independence — decolonisation ─────────────────────────────

  makeMCQ({ id:'g8sms-independence-004', chapterId:'g8sms-independence', difficulty:1, subsection:'decolonisation',
    question:'Decolonisation refers to:',
    options:['The process by which colonies gained independence from colonial powers','The building of new colonies','The expansion of European empires','The trading of colonies between European powers'],
    answer:'The process by which colonies gained independence from colonial powers',
    hint:'De- means "reversing" — decolonisation reverses colonisation.',
    explanation:'<b>Decolonisation</b> was the process by which countries that had been colonised gained <b>political independence</b> from their colonial powers. It occurred mainly between the 1940s and 1970s across Africa, Asia and the Caribbean.' }),

  makeMCQ({ id:'g8sms-independence-005', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'Which major global event accelerated decolonisation after 1945?',
    options:['World War II, which weakened European powers and inspired nationalist movements worldwide','The invention of the internet','The Industrial Revolution','The French Revolution'],
    answer:'World War II, which weakened European powers and inspired nationalist movements worldwide',
    hint:'WWII left European powers weakened both economically and morally.',
    explanation:'<b>World War II (1939–1945)</b> was a key turning point for decolonisation. European powers were economically and militarily weakened. Colonial soldiers who had fought for European nations returned demanding rights. The <b>United Nations</b>, founded in 1945, promoted self-determination.' }),

  makeMCQ({ id:'g8sms-independence-006', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'India\'s independence in 1947 had an impact on Mauritius because:',
    options:['It inspired the large Indian community in Mauritius and gave momentum to calls for independence','It caused all Indian Mauritians to leave Mauritius','It made Britain stronger','It had no connection to Mauritius at all'],
    answer:'It inspired the large Indian community in Mauritius and gave momentum to calls for independence',
    hint:'Events in a homeland country can inspire a diaspora community.',
    explanation:'India\'s independence in <b>1947</b> was hugely significant for the large Indian-origin community in Mauritius. It inspired <b>political confidence</b> and gave momentum to the independence movement, reinforcing the belief that self-rule was achievable.' }),

  // ── The Way to Independence — mauritius_independence ─────────────────────

  makeMCQ({ id:'g8sms-independence-007', chapterId:'g8sms-independence', difficulty:1, subsection:'mauritius_independence',
    question:'Mauritius gained independence on:',
    options:['12 March 1968','1 February 1835','1 January 1715','12 March 1992'],
    answer:'12 March 1968',
    hint:'This date is a national holiday in Mauritius.',
    explanation:'Mauritius gained independence on <b>12 March 1968</b>. This date is celebrated every year as <b>National Day (Independence Day)</b>. Sir Seewoosagur Ramgoolam became the first Prime Minister of independent Mauritius.' }),

  makeMCQ({ id:'g8sms-independence-008', chapterId:'g8sms-independence', difficulty:2, subsection:'mauritius_independence',
    question:'Mauritius became a republic on:',
    options:['12 March 1992','12 March 1968','1 January 1810','1 February 1835'],
    answer:'12 March 1992',
    hint:'Becoming a republic meant removing the British monarch as Head of State.',
    explanation:'Mauritius became a <b>Republic on 12 March 1992</b> — exactly 24 years after independence. The British monarch was replaced as Head of State by an elected <b>President</b>. The first President was Sir Veerasamy Ringadoo.' }),

  makeMCQ({ id:'g8sms-independence-009', chapterId:'g8sms-independence', difficulty:3, subsection:'mauritius_independence',
    question:'The political party that led Mauritius to independence was:',
    options:['The Mauritius Labour Party (MLP) under Sir SSR Ramgoolam','The Parti Mauricien Social Démocrate (PMSD) under Sir Gaëtan Duval','The Mouvement Militant Mauricien (MMM)','The Mouvement Socialiste Militant (MSM)'],
    answer:'The Mauritius Labour Party (MLP) under Sir SSR Ramgoolam',
    hint:'This party was founded in 1936 and had long campaigned for workers\' rights.',
    explanation:'The <b>Mauritius Labour Party (MLP)</b>, led by <b>Sir Seewoosagur Ramgoolam</b>, was the party that successfully negotiated and led Mauritius to independence in 1968. The PMSD opposed independence, fearing for minority rights.' }),

  makeMCQ({ id:'g8sms-independence-010', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'The French Empire in Africa was significant for Mauritius because:',
    options:['France controlled Mauritius as "Île de France" from 1715 to 1810, shaping its language, culture and population','France controlled Mauritius from 1810 to 1968','France and Mauritius were never connected','France gave Mauritius independence voluntarily'],
    answer:'France controlled Mauritius as "Île de France" from 1715 to 1810, shaping its language, culture and population',
    hint:'The French period left a lasting cultural legacy in Mauritius.',
    explanation:'France controlled Mauritius as <b>"Île de France"</b> from <b>1715 to 1810</b>. The French period introduced sugarcane cultivation, brought enslaved Africans, and left a lasting legacy: the French language, legal traditions and much of the cultural character of Mauritius.' }),

  makeMCQ({ id:'g8sms-independence-011', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'The United Nations Charter (1945) is significant for decolonisation because:',
    options:['It upheld the right of all peoples to self-determination — the right to decide their own political future','It banned all colonies immediately in 1945','It extended the British Empire','It created new colonies in Africa'],
    answer:'It upheld the right of all peoples to self-determination — the right to decide their own political future',
    hint:'Self-determination became an international legal principle after WWII.',
    explanation:'The <b>UN Charter (1945)</b> enshrined the right of all peoples to <b>self-determination</b> — the right to determine their own political status. This became an international legal basis for independence movements in colonised territories worldwide.' }),

  makeMCQ({ id:'g8sms-independence-012', chapterId:'g8sms-independence', difficulty:3, subsection:'mauritius_independence',
    question:'The Lancaster House Constitutional Conferences in London in 1965 and 1967 were significant for Mauritius because:',
    options:['They negotiated the terms of independence, including the constitution and the cession of Diego Garcia to Britain','They created the sugar industry in Mauritius','They established the first schools in Mauritius','They ended slavery in Mauritius'],
    answer:'They negotiated the terms of independence, including the constitution and the cession of Diego Garcia to Britain',
    hint:'Lancaster House was where British colonies negotiated their independence constitutions.',
    explanation:'The <b>Lancaster House conferences</b> negotiated Mauritius\' independence constitution. Controversially, Mauritius was required to cede the <b>Chagos Archipelago (Diego Garcia)</b> to Britain as a condition of independence — a territorial dispute that continues today.' }),

  // ── Mauritius, a Democratic Country — democracy_features ─────────────────

  makeMCQ({ id:'g8sms-democracy-001', chapterId:'g8sms-democracy', difficulty:1, subsection:'democracy_features',
    question:'Democracy literally means:',
    options:['Government by the people (from Greek: demos = people, kratos = power/rule)','Government by a king or queen','Government by the military','Government by the rich'],
    answer:'Government by the people (from Greek: demos = people, kratos = power/rule)',
    hint:'"Demo" = people, "cracy" = rule/power.',
    explanation:'"<b>Democracy</b>" comes from Greek: <b>demos</b> (people) + <b>kratos</b> (power/rule). It means a system of government where power comes from the people, exercised directly or through elected representatives.' }),

  makeMCQ({ id:'g8sms-democracy-002', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'Which of the following is a key feature of a democratic country?',
    options:['Free and fair elections where all adult citizens can vote','Elections where only the wealthy can vote','A single leader who rules for life','Laws made only by religious leaders'],
    answer:'Free and fair elections where all adult citizens can vote',
    hint:'Democracy requires that all citizens have an equal vote.',
    explanation:'<b>Free and fair elections</b> are a fundamental feature of democracy. In Mauritius, all citizens aged 18 and above have the right to vote in National Assembly elections held every 5 years.' }),

  makeMCQ({ id:'g8sms-democracy-003', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'The rule of law in a democracy means:',
    options:['All people, including government officials, must obey the same laws','Only poor people are subject to the law','The government can make any law without limit','Laws only apply to criminals'],
    answer:'All people, including government officials, must obey the same laws',
    hint:'No one is above the law in a democracy.',
    explanation:'The <b>rule of law</b> is a core democratic principle: all people — citizens and government officials alike — are subject to the <b>same laws</b>. No one is above the law. The judiciary (courts) enforces this.' }),

  makeMCQ({ id:'g8sms-democracy-004', chapterId:'g8sms-democracy', difficulty:3, subsection:'democracy_features',
    question:'The separation of powers in Mauritius refers to the division of government into:',
    options:['Legislature (National Assembly), Executive (Prime Minister & Cabinet) and Judiciary (courts)','The President, the Monarch and Parliament','The Army, the Police and the Government','Local government, national government and international bodies'],
    answer:'Legislature (National Assembly), Executive (Prime Minister & Cabinet) and Judiciary (courts)',
    hint:'Three branches of government balance each other\'s power.',
    explanation:'Mauritius practices <b>separation of powers</b>: the <b>Legislature</b> (National Assembly) makes laws; the <b>Executive</b> (Prime Minister and Cabinet) implements laws; the <b>Judiciary</b> (Supreme Court) interprets and enforces laws. This prevents any one branch from having too much power.' }),

  // ── Mauritius, a Democratic Country — constitution_government ────────────

  makeMCQ({ id:'g8sms-democracy-005', chapterId:'g8sms-democracy', difficulty:1, subsection:'constitution_government',
    question:'The Constitution of Mauritius is:',
    options:['The supreme law of the country that defines rights and the structure of government','A history textbook','A list of tax rules','A military regulation'],
    answer:'The supreme law of the country that defines rights and the structure of government',
    hint:'The constitution is the highest law — no other law can contradict it.',
    explanation:'The <b>Constitution of Mauritius</b> (adopted at independence in 1968) is the <b>supreme law</b>. It defines citizens\' fundamental rights, the structure of government (President, National Assembly, Prime Minister, Supreme Court) and the powers of each institution.' }),

  makeMCQ({ id:'g8sms-democracy-006', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'Members of the National Assembly of Mauritius are elected by:',
    options:['Citizens through a general election every 5 years','The President alone','Business leaders','The Prime Minister'],
    answer:'Citizens through a general election every 5 years',
    hint:'The National Assembly is the elected parliament of Mauritius.',
    explanation:'Members of the <b>National Assembly</b> (MPs) are elected by Mauritian citizens in a <b>general election every 5 years</b>. The National Assembly is the legislature — it debates and passes new laws.' }),

  makeMCQ({ id:'g8sms-democracy-007', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'The Prime Minister of Mauritius is:',
    options:['The head of government who leads the Cabinet and is responsible for running the country day-to-day','The head of state who performs ceremonial duties','The head of the judiciary','The commander of the armed forces'],
    answer:'The head of government who leads the Cabinet and is responsible for running the country day-to-day',
    hint:'The PM is the most powerful executive figure in Mauritius.',
    explanation:'The <b>Prime Minister (PM)</b> is the head of government in Mauritius. The PM leads the <b>Cabinet</b> (group of senior ministers) and is responsible for day-to-day governance. The <b>President</b> is the head of state with mainly ceremonial powers.' }),

  makeMCQ({ id:'g8sms-democracy-008', chapterId:'g8sms-democracy', difficulty:3, subsection:'constitution_government',
    question:'The Best Loser System (BLS) in Mauritius is designed to:',
    options:['Ensure fair representation of minority communities in the National Assembly','Give the losing party extra seats','Allow non-elected officials to enter parliament','Ensure only wealthy candidates become MPs'],
    answer:'Ensure fair representation of minority communities in the National Assembly',
    hint:'It adds extra seats to ensure minorities are represented.',
    explanation:'The <b>Best Loser System (BLS)</b> allocates up to 8 additional seats in the National Assembly to ensure that <b>minority communities</b> are fairly represented. Seats are allocated based on community classification (Hindu, Muslim, Sino-Mauritian, General Population).' }),

  // ── Mauritius, a Democratic Country — media_democracy ────────────────────

  makeMCQ({ id:'g8sms-democracy-009', chapterId:'g8sms-democracy', difficulty:1, subsection:'media_democracy',
    question:'The media plays an important role in a democracy by:',
    options:['Informing citizens, holding government accountable and giving a voice to different viewpoints','Telling people who to vote for','Working only for the government','Suppressing news that the government dislikes'],
    answer:'Informing citizens, holding government accountable and giving a voice to different viewpoints',
    hint:'The media is sometimes called the "fourth estate" — a watchdog of power.',
    explanation:'In a democracy, the <b>media</b> (newspapers, radio, television, online news) plays a crucial role: it <b>informs citizens</b> about public affairs, <b>holds the government accountable</b> through investigative journalism and provides a platform for diverse voices.' }),

  makeMCQ({ id:'g8sms-democracy-010', chapterId:'g8sms-democracy', difficulty:2, subsection:'media_democracy',
    question:'Freedom of the press in Mauritius means:',
    options:['Journalists can report and publish information without undue government interference','Only government-approved news can be published','Journalists must never criticise the government','Only positive news can be reported'],
    answer:'Journalists can report and publish information without undue government interference',
    hint:'Freedom of the press is a key democratic right.',
    explanation:'<b>Freedom of the press</b> is protected by the Constitution of Mauritius. It means journalists can <b>report freely and criticise the government</b> without fear of censorship or imprisonment — within the bounds of defamation, privacy and national security laws.' }),

  makeMCQ({ id:'g8sms-democracy-011', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'Civil society organisations (NGOs, trade unions, associations) contribute to democracy by:',
    options:['Representing citizens\' interests, advocating for rights and holding institutions accountable','Replacing the elected government','Deciding election results','Running the daily affairs of government'],
    answer:'Representing citizens\' interests, advocating for rights and holding institutions accountable',
    hint:'Civil society is the space between the government and individual citizens.',
    explanation:'<b>Civil society</b> (NGOs, trade unions, religious organisations, community groups) strengthens democracy by representing diverse interests, advocating for rights, providing services and holding government and businesses accountable.' }),

  makeMCQ({ id:'g8sms-democracy-012', chapterId:'g8sms-democracy', difficulty:3, subsection:'media_democracy',
    question:'Social media\'s impact on democracy in Mauritius includes both benefits and risks. What is a key risk?',
    options:['The rapid spread of misinformation (fake news) that can mislead citizens and undermine democratic debate','Social media always improves democracy','Social media is only used by the government','Social media has no effect on political views'],
    answer:'The rapid spread of misinformation (fake news) that can mislead citizens and undermine democratic debate',
    hint:'Not all information on social media is accurate or verified.',
    explanation:'While social media enables greater citizen participation in democratic debate, a key risk is the spread of <b>misinformation (fake news)</b>, which can mislead voters, inflame social tensions and undermine informed democratic decision-making.' }),

  // ── The Changing Climate — global_warming_causes ──────────────────────────

  makeMCQ({ id:'g8sms-climate-001', chapterId:'g8sms-climate', difficulty:1, subsection:'global_warming_causes',
    question:'The main cause of global warming is:',
    options:['The increase in greenhouse gases (especially CO₂) in the atmosphere due to human activities','The natural cycle of the Earth','Depletion of the ozone layer only','Earthquakes and volcanic eruptions'],
    answer:'The increase in greenhouse gases (especially CO₂) in the atmosphere due to human activities',
    hint:'Burning fossil fuels releases CO₂ which traps heat.',
    explanation:'<b>Global warming</b> is primarily caused by human activities that release <b>greenhouse gases</b> (CO₂, methane, nitrous oxide) into the atmosphere. These gases trap heat from the sun, causing the Earth\'s average temperature to rise — the <b>enhanced greenhouse effect</b>.' }),

  makeMCQ({ id:'g8sms-climate-002', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'Which human activity is the largest contributor to greenhouse gas emissions globally?',
    options:['Burning fossil fuels (coal, oil and gas) for energy and transport','Farming vegetables','Building schools','Fishing in the ocean'],
    answer:'Burning fossil fuels (coal, oil and gas) for energy and transport',
    hint:'Most of our electricity and transport still depends on fossil fuels.',
    explanation:'<b>Burning fossil fuels</b> (coal, oil and natural gas) for electricity generation, industrial processes and transport is the <b>largest single source</b> of CO₂ emissions globally. Deforestation is the second largest contributor.' }),

  makeMCQ({ id:'g8sms-climate-003', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'The greenhouse effect is a natural process. What makes it a problem today?',
    options:['Human activities have intensified it by adding extra greenhouse gases, causing the Earth to warm too fast','The greenhouse effect has always been harmful','It only affects the polar regions','It only affects tropical countries like Mauritius'],
    answer:'Human activities have intensified it by adding extra greenhouse gases, causing the Earth to warm too fast',
    hint:'Some greenhouse effect is natural and necessary — the problem is the enhanced version.',
    explanation:'The <b>natural greenhouse effect</b> keeps Earth warm enough to support life. The problem is the <b>enhanced greenhouse effect</b>: human activities (burning fossil fuels, deforestation) have added large amounts of greenhouse gases, intensifying the effect and causing rapid warming.' }),

  // ── The Changing Climate — impact_mauritius ───────────────────────────────

  makeMCQ({ id:'g8sms-climate-004', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'How is Mauritius particularly vulnerable to climate change?',
    options:['As a small island nation, it faces sea level rise, more intense cyclones, coral bleaching and threats to tourism and fisheries','It is too large to be affected by sea level rise','It has no coastline to protect','It is located away from all cyclone paths'],
    answer:'As a small island nation, it faces sea level rise, more intense cyclones, coral bleaching and threats to tourism and fisheries',
    hint:'Small island nations have very little land above sea level.',
    explanation:'Mauritius is highly vulnerable to climate change because it is a <b>Small Island Developing State (SIDS)</b>: <b>sea level rise</b> threatens coastal areas and infrastructure; more intense <b>cyclones</b> risk greater damage; <b>coral bleaching</b> destroys reefs that support fisheries and tourism.' }),

  makeMCQ({ id:'g8sms-climate-005', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'Coral bleaching occurs when:',
    options:['Rising sea temperatures cause corals to expel the algae that give them colour and nutrients, turning them white','Fishermen paint coral white','Pollution stains the coral','Coral grows too fast and runs out of food'],
    answer:'Rising sea temperatures cause corals to expel the algae that give them colour and nutrients, turning them white',
    hint:'Bleached coral is stressed coral — it loses its colour and may die.',
    explanation:'<b>Coral bleaching</b> occurs when warmer-than-normal sea temperatures stress corals, causing them to expel the <b>symbiotic algae (zooxanthellae)</b> that give them colour. Without these algae, corals turn white and may die, devastating reef ecosystems.' }),

  makeMCQ({ id:'g8sms-climate-006', chapterId:'g8sms-climate', difficulty:3, subsection:'impact_mauritius',
    question:'Sea level rise poses a particular threat to Agaléga and Saint Brandon because:',
    options:['These islands are low-lying coral formations that could be submerged if sea levels rise significantly','They are the highest islands of Mauritius','They have the most mountain peaks','They are uninhabited and unaffected'],
    answer:'These islands are low-lying coral formations that could be submerged if sea levels rise significantly',
    hint:'Low-lying islands have almost no elevation above sea level.',
    explanation:'<b>Agaléga and Saint Brandon</b> are very low-lying coral islands. A rise in sea level of even 1–2 metres could <b>submerge significant portions</b> of these islands, displacing their populations and destroying their ecosystems.' }),

  // ── The Changing Climate — adaptation_mitigation ──────────────────────────

  makeMCQ({ id:'g8sms-climate-007', chapterId:'g8sms-climate', difficulty:1, subsection:'adaptation_mitigation',
    question:'Climate change mitigation refers to:',
    options:['Actions that reduce greenhouse gas emissions to slow down global warming','Actions that help societies cope with the effects of climate change','Ignoring the problem of climate change','Building sea walls around islands'],
    answer:'Actions that reduce greenhouse gas emissions to slow down global warming',
    hint:'Mitigation attacks the cause of climate change.',
    explanation:'<b>Mitigation</b> means reducing <b>greenhouse gas emissions</b> to slow climate change at its source (e.g. switching to renewable energy, electric transport, reducing deforestation). <b>Adaptation</b> means adjusting to the effects that are already happening.' }),

  makeMCQ({ id:'g8sms-climate-008', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'Which of the following is an example of climate change adaptation in Mauritius?',
    options:['Building sea walls and mangrove restoration to protect coastal areas from flooding','Burning more fossil fuels','Cutting down all coastal forests','Encouraging more tourism flights'],
    answer:'Building sea walls and mangrove restoration to protect coastal areas from flooding',
    hint:'Adaptation means adjusting to the effects of climate change that are already happening.',
    explanation:'<b>Climate adaptation</b> in Mauritius includes: building <b>sea walls</b> and coastal defences, restoring <b>mangroves</b> (which buffer storm surges), diversifying the economy away from climate-sensitive sectors and updating infrastructure to withstand stronger cyclones.' }),

  makeMCQ({ id:'g8sms-climate-009', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'The Paris Agreement (2015) commits countries to:',
    options:['Limit global temperature rise to well below 2°C above pre-industrial levels, aiming for 1.5°C','Increase global fossil fuel production','Abolish all climate change policies','Build more coal power plants'],
    answer:'Limit global temperature rise to well below 2°C above pre-industrial levels, aiming for 1.5°C',
    hint:'The Paris Agreement set global temperature targets.',
    explanation:'The <b>Paris Agreement (2015)</b> is an international treaty signed by nearly all countries, committing them to limit global average temperature rise to <b>well below 2°C</b> above pre-industrial levels, and to pursue efforts to limit it to <b>1.5°C</b>.' }),

  makeMCQ({ id:'g8sms-climate-010', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'Deforestation contributes to global warming because:',
    options:['Trees that are cut down can no longer absorb CO₂ and burning them releases stored carbon','Trees produce CO₂ and removing them reduces emissions','Deforestation has no impact on climate','Forests prevent rainfall'],
    answer:'Trees that are cut down can no longer absorb CO₂ and burning them releases stored carbon',
    hint:'Trees are "carbon sinks" — they absorb and store CO₂.',
    explanation:'<b>Deforestation</b> contributes to global warming in two ways: (1) trees cut down can no longer <b>absorb CO₂</b> from the atmosphere; (2) burning or decomposing trees <b>releases the carbon stored</b> in them. Tropical deforestation is a major source of emissions.' }),

  makeMCQ({ id:'g8sms-climate-011', chapterId:'g8sms-climate', difficulty:3, subsection:'adaptation_mitigation',
    question:'What does Mauritius\'s National Determined Contribution (NDC) under the Paris Agreement include?',
    options:['Commitments to increase renewable energy use and reduce overall emissions through solar, wind and energy efficiency measures','A promise to build more coal power plants','A refusal to take part in global climate efforts','A commitment to remain 100% dependent on imported oil'],
    answer:'Commitments to increase renewable energy use and reduce overall emissions through solar, wind and energy efficiency measures',
    hint:'Small island states like Mauritius are among the most committed to clean energy.',
    explanation:'Mauritius\'s <b>NDC (Nationally Determined Contribution)</b> to the Paris Agreement commits to <b>increasing renewable energy</b> (solar, wind) to 35% of electricity generation by 2025 and reducing emissions through energy efficiency. This shows that even small nations are taking action.' }),

  makeMCQ({ id:'g8sms-climate-012', chapterId:'g8sms-climate', difficulty:3, subsection:'impact_mauritius',
    question:'Why are Small Island Developing States (SIDS) like Mauritius described as "frontline" states in the climate crisis?',
    options:['They face the most severe consequences of climate change despite contributing very little to global emissions','They are the largest emitters of CO₂','They control international climate policy','They have refused to sign the Paris Agreement'],
    answer:'They face the most severe consequences of climate change despite contributing very little to global emissions',
    hint:'The climate injustice is that those who emit least often suffer most.',
    explanation:'<b>SIDS</b> like Mauritius emit a tiny fraction of global greenhouse gases yet face disproportionate consequences: sea level rise, more intense cyclones and coral bleaching. This makes them <b>"frontline" states</b> and vocal advocates for stronger global climate action.' })

);
