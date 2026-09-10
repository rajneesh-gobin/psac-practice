'use strict';
// Grade 8 Social & Modern Studies — Core questions, all 5 chapters
// IDs: g8sms-slavery-001…, g8sms-society-001…, g8sms-independence-001…,
//      g8sms-democracy-001…, g8sms-climate-001…

STATIC_QUESTIONS.push(

  // ── Slavery & Indentured Labour — slave_trade ─────────────────────────────

  makeMCQ({ id:'g8sms-slavery-001', chapterId:'g8sms-slavery', difficulty:1, subsection:'slave_trade',
    question:'During the French colonial period, enslaved workers in Mauritius were mainly brought from:',
    options:['East Africa and Madagascar','Northern India and China','Western Europe and America','Australia and the Pacific'],
    answer:'East Africa and Madagascar',
    hint:'France\'s colonies in Africa were the main source of enslaved people for Mauritius.',
    explanation:'During the <b>French period (1715–1810)</b>, enslaved people were brought mainly from <b>East Africa and Madagascar</b> to work on sugar plantations. This forced migration shaped the Creole population of Mauritius.' }),

  makeMCQ({ id:'g8sms-slavery-002', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'What were the main conditions of enslaved people on sugar plantations in Mauritius?',
    options:['No rights and no pay','Wages and weekly rest','The same rights as freemen','The right to own land'],
    answer:'No rights and no pay',
    hint:'Slavery is the ownership of people as property — they had no freedom.',
    explanation:'Enslaved people in Mauritius had <b>no legal rights</b>. They were treated as property of their owners, were forced to work without pay, lived in poor conditions (labour camps) and faced harsh punishment for disobedience.' }),

  makeMCQ({ id:'g8sms-slavery-003', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'Slavery in Mauritius was used primarily to:',
    options:['Provide labour for sugar','Settle the island quickly','Build the public roads only','Serve in houses only'],
    answer:'Provide labour for sugar',
    hint:'The plantation economy depended entirely on enslaved labour.',
    explanation:'Slavery in Mauritius was an <b>economic labour system</b>. Planters needed a large workforce to grow and harvest sugarcane. Enslaved Africans provided this <b>forced, unpaid labour</b>, making sugar production highly profitable for the plantation owners.' }),

  makeMCQ({ id:'g8sms-slavery-004', chapterId:'g8sms-slavery', difficulty:3, subsection:'slave_trade',
    question:'The "Code Noir" during the French period was:',
    options:['A law code on slavery','A French newspaper','A type of Mauritian sugar','A French army handbook'],
    answer:'A law code on slavery',
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
    options:['Freed people still worked for owners','Freed people were given land at once','Owners had to pay wages at once','All freed people left Mauritius'],
    answer:'Freed people still worked for owners',
    hint:'The apprenticeship was a transition period before full freedom.',
    explanation:'After abolition in 1835, a <b>4-year apprenticeship</b> period was introduced. Freed people were legally compelled to continue working for their former owners during this time. Full freedom was granted in <b>1839</b>. Many then left the estates.' }),

  makeMCQ({ id:'g8sms-slavery-007', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'Why did plantation owners seek a new labour force after the abolition of slavery?',
    options:['Many freed people left the estates','Freed people demanded huge wages','Slavery was never really abolished','Britain expelled all freed people'],
    answer:'Many freed people left the estates',
    hint:'After gaining freedom, many former enslaved people chose to leave the plantations.',
    explanation:'After abolition, many freed people <b>left the sugar estates</b>, unwilling to continue working in conditions that reminded them of slavery. This created a labour shortage that planters addressed by importing <b>indentured workers from India</b>.' }),

  // ── Slavery & Indentured Labour — indenture_system ───────────────────────

  makeMCQ({ id:'g8sms-slavery-008', chapterId:'g8sms-slavery', difficulty:1, subsection:'indenture_system',
    question:'Indian indentured labourers came to Mauritius under a contract system. This means they:',
    options:['Agreed to work a fixed term','Were taken against their will','Came as tourists and stayed','Came to invest in business'],
    answer:'Agreed to work a fixed term',
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
    options:['Little freedom and harsh terms','Exactly the same pay as others','Free to travel and leave at will','The same as a modern job today'],
    answer:'Little freedom and harsh terms',
    hint:'Despite being a contract system, indentured workers faced severe restrictions.',
    explanation:'Indentured labourers faced <b>restricted freedom of movement</b>, were subject to strict laws (like the "Vagrancy Ordinance"), lived in poor conditions and faced criminal penalties for breaking their contracts. Critics called it a <b>"new system of slavery"</b>.' }),

  makeMCQ({ id:'g8sms-slavery-011', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'The Aapravasi Ghat in Port-Louis is a UNESCO World Heritage Site because:',
    options:['It was the immigration depot','It was the first sugar mill','It was a French naval base','It was a colonial prison'],
    answer:'It was the immigration depot',
    hint:'Aapravasi Ghat means "Immigration Depot" in Hindi.',
    explanation:'<b>Aapravasi Ghat</b> (Immigration Depot) in Port-Louis was where hundreds of thousands of Indian indentured labourers first set foot in Mauritius. It is a <b>UNESCO World Heritage Site</b> recognising the significance of the indenture system in world history.' }),

  makeMCQ({ id:'g8sms-slavery-012', chapterId:'g8sms-slavery', difficulty:3, subsection:'slave_trade',
    question:'How did the slave trade and indenture system shape the cultural and demographic makeup of modern Mauritius?',
    options:['They built a mixed society','They left no lasting mark','They left only one culture','They emptied the island'],
    answer:'They built a mixed society',
    hint:'The population movements of the colonial era are the foundation of modern Mauritian diversity.',
    explanation:'The <b>slave trade</b> (bringing Africans and Malagasy) and the <b>indenture system</b> (bringing Indians) fundamentally shaped Mauritius. The descendants of these groups, alongside European and Chinese communities, make up the diverse, multicultural Mauritius of today.' }),

  // ── Mauritian Society, 1920s to 1960s — post_ww1_conditions ──────────────

  makeMCQ({ id:'g8sms-society-001', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'At the end of World War I (1918), the social conditions for most Mauritians were characterised by:',
    options:['Poverty and few rights','Wealth and democracy','Equal rights for all','Full jobs and high pay'],
    answer:'Poverty and few rights',
    hint:'Most Mauritians in 1918 were sugar estate workers with very limited rights.',
    explanation:'After World War I, most Mauritians (particularly indentured workers and their descendants) faced <b>poverty, low wages, poor housing</b> and had <b>very limited political rights</b>. Political power was concentrated among the Franco-Mauritian planter class.' }),

  makeMCQ({ id:'g8sms-society-002', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'The sugar industry dominated Mauritian society in the 1920s because:',
    options:['It was the main industry','No other resource existed','All citizens were forced to farm','Sugar was the only food grown'],
    answer:'It was the main industry',
    hint:'Sugar was the economic backbone of Mauritius, controlled by a small elite.',
    explanation:'By the 1920s, <b>sugarcane</b> occupied most of Mauritius\' arable land. The <b>Franco-Mauritian planter class</b> controlled this industry and thus dominated social, economic and political life. The majority of Mauritians worked as labourers on their estates.' }),

  makeMCQ({ id:'g8sms-society-003', chapterId:'g8sms-society', difficulty:3, subsection:'post_ww1_conditions',
    question:'The cyclone of 1945 and the post-war period accelerated social change in Mauritius because:',
    options:['Hardship raised political demands','Everything improved at once','Sugar was destroyed for ever','Britain freed Mauritius in 1945'],
    answer:'Hardship raised political demands',
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
    options:['They pressed for better wages','They were set up by the planters','They had no political role','They stopped all strikes'],
    answer:'They pressed for better wages',
    hint:'Trade unions represent workers in negotiations with employers.',
    explanation:'<b>Trade unions</b> played a crucial role in the 1930s–1960s by organising workers to demand <b>better wages, shorter working hours and improved conditions</b>. Leaders like Emmanuel Anquetil were important figures in the early labour movement.' }),

  makeMCQ({ id:'g8sms-society-006', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'The Bissoondoyal brothers are associated with which contribution to Mauritian society?',
    options:['Promoting Hindi and culture','Building the first sugar mill','Founding the Port-Louis docks','Creating the rupee currency'],
    answer:'Promoting Hindi and culture',
    hint:'They founded movements to educate the Mauritian Indian community.',
    explanation:'<b>Sookdeo Bissoondoyal and Basdeo Bissoondoyal</b> were influential leaders who promoted <b>Hindi language education</b> and the cultural and political rights of the Mauritian Indian community in the mid-20th century.' }),

  // ── Mauritian Society, 1920s to 1960s — mauritian_society ────────────────

  makeMCQ({ id:'g8sms-society-007', chapterId:'g8sms-society', difficulty:2, subsection:'mauritian_society',
    question:'The "General Population" in Mauritian social classification historically refers to:',
    options:['Creoles and Franco-Mauritians','Every citizen of Mauritius','Only French-speaking people','Only descendants of slaves'],
    answer:'Creoles and Franco-Mauritians',
    hint:'Mauritius used a community-based classification in its constitution.',
    explanation:'The Mauritian constitution uses a <b>Best Loser System</b> based on four community classifications: Hindu, Muslim, Sino-Mauritian and <b>General Population</b>. The last category includes Creoles, Franco-Mauritians and others.' }),

  makeMCQ({ id:'g8sms-society-008', chapterId:'g8sms-society', difficulty:3, subsection:'mauritian_society',
    question:'The 1968 communal disturbances (riots) before independence were significant because:',
    options:['They showed communal tensions','They delayed freedom 20 years','They changed nothing at all','They were caused from abroad'],
    answer:'They showed communal tensions',
    hint:'The riots occurred just months before independence in March 1968.',
    explanation:'The <b>1968 communal riots</b> in Mauritius occurred in January-February 1968, just weeks before independence. They revealed deep <b>inter-communal tensions</b> and made social harmony and inclusion a central priority for the newly independent government led by Sir SSR.' }),

  makeMCQ({ id:'g8sms-society-009', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'The Mauritius Labour Party (MLP), founded in 1936, was significant because:',
    options:['It spoke for the workers','It was set up by planters','It opposed independence','It served one community'],
    answer:'It spoke for the workers',
    hint:'It was linked to the labour movement and eventually led Mauritius to independence.',
    explanation:'The <b>Mauritius Labour Party (MLP)</b>, founded in 1936 by Maurice Curé and later led by <b>SSR Ramgoolam</b>, was the first major party representing working-class and majority interests. It led Mauritius to independence in 1968.' }),

  makeMCQ({ id:'g8sms-society-010', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'Economic diversification in Mauritius after the 1960s meant:',
    options:['Adding industry and tourism','Growing much more sugarcane','Reducing the population','Banning foreign investment'],
    answer:'Adding industry and tourism',
    hint:'Diversification reduces dependence on a single industry.',
    explanation:'After independence, Mauritius pursued <b>economic diversification</b>: development of an <b>Export Processing Zone (EPZ)</b> (manufacturing), the <b>tourism industry</b> and later <b>financial services and ICT</b>. This transformed Mauritius from a single-crop economy to a diverse one.' }),

  makeMCQ({ id:'g8sms-society-011', chapterId:'g8sms-society', difficulty:3, subsection:'mauritian_society',
    question:'The "Mauritian miracle" refers to:',
    options:['Rapid growth after 1968','The loss of the dodo','The finding of oil here','The building of the harbour'],
    answer:'Rapid growth after 1968',
    hint:'Economists and the World Bank have studied Mauritius as a model of development.',
    explanation:'The "<b>Mauritian miracle</b>" refers to the country\'s extraordinary economic transformation since independence. Mauritius went from a <b>low-income, sugar-dependent economy</b> to an <b>upper-middle-income economy</b> through sound governance, diversification and investment in education.' }),

  makeMCQ({ id:'g8sms-society-012', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'Which major infrastructure change transformed Mauritian society in the mid-20th century?',
    options:['More schools and free primary','The first airport, in 2000','A metro built in the 1930s','The internet, arriving in 1970'],
    answer:'More schools and free primary',
    hint:'Education is a key driver of social mobility and development.',
    explanation:'The expansion of the <b>education system</b> — including the introduction of <b>free primary education</b> — was transformative. It enabled children of formerly enslaved and indentured families to access education, leading to greater social mobility.' }),

  // ── The Way to Independence — empires_colonies ────────────────────────────

  makeMCQ({ id:'g8sms-independence-001', chapterId:'g8sms-independence', difficulty:1, subsection:'empires_colonies',
    question:'A colony is:',
    options:['Land ruled by a foreign power','An independent nation state','A kind of farming village','A form of elected government'],
    answer:'Land ruled by a foreign power',
    hint:'Mauritius was a British colony from 1810 to 1968.',
    explanation:'A <b>colony</b> is a territory that is controlled and governed by a foreign power (the "mother country"). Mauritius was a <b>British colony</b> from 1810 until independence in 1968.' }),

  makeMCQ({ id:'g8sms-independence-002', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'At the height of the British Empire in the early 20th century, it controlled approximately:',
    options:['A quarter of the world','Only Caribbean islands','Only African countries','Only Asian territories'],
    answer:'A quarter of the world',
    hint:'The British Empire was the largest empire in history.',
    explanation:'At its peak, the <b>British Empire</b> controlled approximately a <b>quarter of the world\'s land surface</b> and a quarter of the world\'s population, making it the largest empire in history.' }),

  makeMCQ({ id:'g8sms-independence-003', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'European colonial powers justified colonialism by claiming it brought "civilisation" to colonised peoples. Why is this justification rejected today?',
    options:['It exploited and denied rights','Europe had no impact at all','All colonised peoples agreed','The colonies were developed'],
    answer:'It exploited and denied rights',
    hint:'The reality of colonialism involved exploitation, not just "development".',
    explanation:'The "civilising mission" was a <b>self-serving justification</b> for colonialism that ignored colonial realities: exploitation of resources and labour, suppression of local cultures and languages, racism and the denial of self-determination. Modern scholarship rejects this justification entirely.' }),

  // ── The Way to Independence — decolonisation ─────────────────────────────

  makeMCQ({ id:'g8sms-independence-004', chapterId:'g8sms-independence', difficulty:1, subsection:'decolonisation',
    question:'Decolonisation refers to:',
    options:['Colonies gaining independence','The building of new colonies','The growth of European empires','The sale of colonies in Europe'],
    answer:'Colonies gaining independence',
    hint:'De- means "reversing" — decolonisation reverses colonisation.',
    explanation:'<b>Decolonisation</b> was the process by which countries that had been colonised gained <b>political independence</b> from their colonial powers. It occurred mainly between the 1940s and 1970s across Africa, Asia and the Caribbean.' }),

  makeMCQ({ id:'g8sms-independence-005', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'Which major global event accelerated decolonisation after 1945?',
    options:['The Second World War','The rise of the internet','The Industrial Revolution','The French Revolution'],
    answer:'The Second World War',
    hint:'WWII left European powers weakened both economically and morally.',
    explanation:'<b>World War II (1939–1945)</b> was a key turning point for decolonisation. European powers were economically and militarily weakened. Colonial soldiers who had fought for European nations returned demanding rights. The <b>United Nations</b>, founded in 1945, promoted self-determination.' }),

  makeMCQ({ id:'g8sms-independence-006', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'India\'s independence in 1947 had an impact on Mauritius because:',
    options:['It inspired Mauritian Indians','It made all Indians leave','It made Britain much stronger','It had no link to Mauritius'],
    answer:'It inspired Mauritian Indians',
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
    options:['The Labour Party (MLP)','The PMSD of Gaëtan Duval','The MMM of Paul Bérenger','The MSM of Anerood Jugnauth'],
    answer:'The Labour Party (MLP)',
    hint:'This party was founded in 1936 and had long campaigned for workers\' rights.',
    explanation:'The <b>Mauritius Labour Party (MLP)</b>, led by <b>Sir Seewoosagur Ramgoolam</b>, was the party that successfully negotiated and led Mauritius to independence in 1968. The PMSD opposed independence, fearing for minority rights.' }),

  makeMCQ({ id:'g8sms-independence-010', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'The French Empire in Africa was significant for Mauritius because:',
    options:['France ruled here 1715-1810','France ruled here 1810-1968','France and Mauritius never met','France granted freedom freely'],
    answer:'France ruled here 1715-1810',
    hint:'The French period left a lasting cultural legacy in Mauritius.',
    explanation:'France controlled Mauritius as <b>"Île de France"</b> from <b>1715 to 1810</b>. The French period introduced sugarcane cultivation, brought enslaved Africans, and left a lasting legacy: the French language, legal traditions and much of the cultural character of Mauritius.' }),

  makeMCQ({ id:'g8sms-independence-011', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'The United Nations Charter (1945) is significant for decolonisation because:',
    options:['It upheld self-determination','It banned colonies in 1945','It enlarged the British Empire','It created new African colonies'],
    answer:'It upheld self-determination',
    hint:'Self-determination became an international legal principle after WWII.',
    explanation:'The <b>UN Charter (1945)</b> enshrined the right of all peoples to <b>self-determination</b> — the right to determine their own political status. This became an international legal basis for independence movements in colonised territories worldwide.' }),

  makeMCQ({ id:'g8sms-independence-012', chapterId:'g8sms-independence', difficulty:3, subsection:'mauritius_independence',
    question:'The Lancaster House Constitutional Conferences in London in 1965 and 1967 were significant for Mauritius because:',
    options:['They settled independence terms','They created the sugar industry','They opened the first schools','They ended slavery in Mauritius'],
    answer:'They settled independence terms',
    hint:'Lancaster House was where British colonies negotiated their independence constitutions.',
    explanation:'The <b>Lancaster House conferences</b> negotiated Mauritius\' independence constitution. Controversially, Mauritius was required to cede the <b>Chagos Archipelago (Diego Garcia)</b> to Britain as a condition of independence — a territorial dispute that continues today.' }),

  // ── Mauritius, a Democratic Country — democracy_features ─────────────────

  makeMCQ({ id:'g8sms-democracy-001', chapterId:'g8sms-democracy', difficulty:1, subsection:'democracy_features',
    question:'Democracy literally means:',
    options:['Rule by the people','Rule by a king or queen','Rule by the armed forces','Rule by the rich alone'],
    answer:'Rule by the people',
    hint:'"Demo" = people, "cracy" = rule/power.',
    explanation:'"<b>Democracy</b>" comes from Greek: <b>demos</b> (people) + <b>kratos</b> (power/rule). It means a system of government where power comes from the people, exercised directly or through elected representatives.' }),

  makeMCQ({ id:'g8sms-democracy-002', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'Which of the following is a key feature of a democratic country?',
    options:['Free and fair elections','Voting only for the rich','One leader who rules for life','Laws made by priests alone'],
    answer:'Free and fair elections',
    hint:'Democracy requires that all citizens have an equal vote.',
    explanation:'<b>Free and fair elections</b> are a fundamental feature of democracy. In Mauritius, all citizens aged 18 and above have the right to vote in National Assembly elections held every 5 years.' }),

  makeMCQ({ id:'g8sms-democracy-003', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'The rule of law in a democracy means:',
    options:['Everyone must obey the law','Only the poor obey the law','Government may do anything','Laws bind criminals only'],
    answer:'Everyone must obey the law',
    hint:'No one is above the law in a democracy.',
    explanation:'The <b>rule of law</b> is a core democratic principle: all people — citizens and government officials alike — are subject to the <b>same laws</b>. No one is above the law. The judiciary (courts) enforces this.' }),

  makeMCQ({ id:'g8sms-democracy-004', chapterId:'g8sms-democracy', difficulty:3, subsection:'democracy_features',
    question:'The separation of powers in Mauritius refers to the division of government into:',
    options:['Legislature, Executive, Judiciary','President, Monarch, Parliament','Army, Police and Government','Local, national and world bodies'],
    answer:'Legislature, Executive, Judiciary',
    hint:'Three branches of government balance each other\'s power.',
    explanation:'Mauritius practices <b>separation of powers</b>: the <b>Legislature</b> (National Assembly) makes laws; the <b>Executive</b> (Prime Minister and Cabinet) implements laws; the <b>Judiciary</b> (Supreme Court) interprets and enforces laws. This prevents any one branch from having too much power.' }),

  // ── Mauritius, a Democratic Country — constitution_government ────────────

  makeMCQ({ id:'g8sms-democracy-005', chapterId:'g8sms-democracy', difficulty:1, subsection:'constitution_government',
    question:'The Constitution of Mauritius is:',
    options:['The supreme law of the land','A school history textbook','A list of the tax rules','A set of army regulations'],
    answer:'The supreme law of the land',
    hint:'The constitution is the highest law — no other law can contradict it.',
    explanation:'The <b>Constitution of Mauritius</b> (adopted at independence in 1968) is the <b>supreme law</b>. It defines citizens\' fundamental rights, the structure of government (President, National Assembly, Prime Minister, Supreme Court) and the powers of each institution.' }),

  makeMCQ({ id:'g8sms-democracy-006', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'Members of the National Assembly of Mauritius are elected by:',
    options:['Citizens, every five years','The President, on his own','The leaders of business','The Prime Minister alone'],
    answer:'Citizens, every five years',
    hint:'The National Assembly is the elected parliament of Mauritius.',
    explanation:'Members of the <b>National Assembly</b> (MPs) are elected by Mauritian citizens in a <b>general election every 5 years</b>. The National Assembly is the legislature — it debates and passes new laws.' }),

  makeMCQ({ id:'g8sms-democracy-007', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'The Prime Minister of Mauritius is:',
    options:['The head of the government','The ceremonial head of state','The head of the judiciary','The head of the armed forces'],
    answer:'The head of the government',
    hint:'The PM is the most powerful executive figure in Mauritius.',
    explanation:'The <b>Prime Minister (PM)</b> is the head of government in Mauritius. The PM leads the <b>Cabinet</b> (group of senior ministers) and is responsible for day-to-day governance. The <b>President</b> is the head of state with mainly ceremonial powers.' }),

  makeMCQ({ id:'g8sms-democracy-008', chapterId:'g8sms-democracy', difficulty:3, subsection:'constitution_government',
    question:'The Best Loser System (BLS) in Mauritius is designed to:',
    options:['Ensure minority representation','Give losers extra seats','Let unelected officials in','Ensure only the rich are MPs'],
    answer:'Ensure minority representation',
    hint:'It adds extra seats to ensure minorities are represented.',
    explanation:'The <b>Best Loser System (BLS)</b> allocates up to 8 additional seats in the National Assembly to ensure that <b>minority communities</b> are fairly represented. Seats are allocated based on community classification (Hindu, Muslim, Sino-Mauritian, General Population).' }),

  // ── Mauritius, a Democratic Country — media_democracy ────────────────────

  makeMCQ({ id:'g8sms-democracy-009', chapterId:'g8sms-democracy', difficulty:1, subsection:'media_democracy',
    question:'The media plays an important role in a democracy by:',
    options:['Informing and holding to account','Telling people how to vote','Working for the government','Hiding news the state dislikes'],
    answer:'Informing and holding to account',
    hint:'The media is sometimes called the "fourth estate" — a watchdog of power.',
    explanation:'In a democracy, the <b>media</b> (newspapers, radio, television, online news) plays a crucial role: it <b>informs citizens</b> about public affairs, <b>holds the government accountable</b> through investigative journalism and provides a platform for diverse voices.' }),

  makeMCQ({ id:'g8sms-democracy-010', chapterId:'g8sms-democracy', difficulty:2, subsection:'media_democracy',
    question:'Freedom of the press in Mauritius means:',
    options:['Reporting without state control','Only approved news is printed','Never criticising the government','Only good news may be printed'],
    answer:'Reporting without state control',
    hint:'Freedom of the press is a key democratic right.',
    explanation:'<b>Freedom of the press</b> is protected by the Constitution of Mauritius. It means journalists can <b>report freely and criticise the government</b> without fear of censorship or imprisonment — within the bounds of defamation, privacy and national security laws.' }),

  makeMCQ({ id:'g8sms-democracy-011', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'Civil society organisations (NGOs, trade unions, associations) contribute to democracy by:',
    options:['Speaking up for citizens','Replacing the government','Deciding election results','Running government daily'],
    answer:'Speaking up for citizens',
    hint:'Civil society is the space between the government and individual citizens.',
    explanation:'<b>Civil society</b> (NGOs, trade unions, religious organisations, community groups) strengthens democracy by representing diverse interests, advocating for rights, providing services and holding government and businesses accountable.' }),

  makeMCQ({ id:'g8sms-democracy-012', chapterId:'g8sms-democracy', difficulty:3, subsection:'media_democracy',
    question:'Social media\'s impact on democracy in Mauritius includes both benefits and risks. What is a key risk?',
    options:['The spread of false news','It always improves democracy','Only the state uses it','It has no effect at all'],
    answer:'The spread of false news',
    hint:'Not all information on social media is accurate or verified.',
    explanation:'While social media enables greater citizen participation in democratic debate, a key risk is the spread of <b>misinformation (fake news)</b>, which can mislead voters, inflame social tensions and undermine informed democratic decision-making.' }),

  // ── The Changing Climate — global_warming_causes ──────────────────────────

  makeMCQ({ id:'g8sms-climate-001', chapterId:'g8sms-climate', difficulty:1, subsection:'global_warming_causes',
    question:'The main cause of global warming is:',
    options:['Greenhouse gases from people','The natural cycles of Earth','Loss of the ozone layer only','Earthquakes and volcanoes'],
    answer:'Greenhouse gases from people',
    hint:'Burning fossil fuels releases CO₂ which traps heat.',
    explanation:'<b>Global warming</b> is primarily caused by human activities that release <b>greenhouse gases</b> (CO₂, methane, nitrous oxide) into the atmosphere. These gases trap heat from the sun, causing the Earth\'s average temperature to rise — the <b>enhanced greenhouse effect</b>.' }),

  makeMCQ({ id:'g8sms-climate-002', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'Which human activity is the largest contributor to greenhouse gas emissions globally?',
    options:['Burning coal, oil and gas','Growing vegetables on farms','Building schools and homes','Fishing in the open ocean'],
    answer:'Burning coal, oil and gas',
    hint:'Most of our electricity and transport still depends on fossil fuels.',
    explanation:'<b>Burning fossil fuels</b> (coal, oil and natural gas) for electricity generation, industrial processes and transport is the <b>largest single source</b> of CO₂ emissions globally. Deforestation is the second largest contributor.' }),

  makeMCQ({ id:'g8sms-climate-003', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'The greenhouse effect is a natural process. What makes it a problem today?',
    options:['People have intensified it','It has always been harmful','It affects the poles only','It affects the tropics only'],
    answer:'People have intensified it',
    hint:'Some greenhouse effect is natural and necessary — the problem is the enhanced version.',
    explanation:'The <b>natural greenhouse effect</b> keeps Earth warm enough to support life. The problem is the <b>enhanced greenhouse effect</b>: human activities (burning fossil fuels, deforestation) have added large amounts of greenhouse gases, intensifying the effect and causing rapid warming.' }),

  // ── The Changing Climate — impact_mauritius ───────────────────────────────

  makeMCQ({ id:'g8sms-climate-004', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'How is Mauritius particularly vulnerable to climate change?',
    options:['It is a low, small island state','It is too large to be flooded','It has no coastline to guard','It lies away from all cyclones'],
    answer:'It is a low, small island state',
    hint:'Small island nations have very little land above sea level.',
    explanation:'Mauritius is highly vulnerable to climate change because it is a <b>Small Island Developing State (SIDS)</b>: <b>sea level rise</b> threatens coastal areas and infrastructure; more intense <b>cyclones</b> risk greater damage; <b>coral bleaching</b> destroys reefs that support fisheries and tourism.' }),

  makeMCQ({ id:'g8sms-climate-005', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'Coral bleaching occurs when:',
    options:['Warm seas drive out the algae','Fishermen paint the coral white','Pollution stains the coral white','Coral grows too fast to feed'],
    answer:'Warm seas drive out the algae',
    hint:'Bleached coral is stressed coral — it loses its colour and may die.',
    explanation:'<b>Coral bleaching</b> occurs when warmer-than-normal sea temperatures stress corals, causing them to expel the <b>symbiotic algae (zooxanthellae)</b> that give them colour. Without these algae, corals turn white and may die, devastating reef ecosystems.' }),

  makeMCQ({ id:'g8sms-climate-006', chapterId:'g8sms-climate', difficulty:3, subsection:'impact_mauritius',
    question:'Sea level rise poses a particular threat to Agaléga and Saint Brandon because:',
    options:['They are low coral islands','They are our highest islands','They have the most mountains','They have nobody living there'],
    answer:'They are low coral islands',
    hint:'Low-lying islands have almost no elevation above sea level.',
    explanation:'<b>Agaléga and Saint Brandon</b> are very low-lying coral islands. A rise in sea level of even 1–2 metres could <b>submerge significant portions</b> of these islands, displacing their populations and destroying their ecosystems.' }),

  // ── The Changing Climate — adaptation_mitigation ──────────────────────────

  makeMCQ({ id:'g8sms-climate-007', chapterId:'g8sms-climate', difficulty:1, subsection:'adaptation_mitigation',
    question:'Climate change mitigation refers to:',
    options:['Cutting greenhouse gas emissions','Coping with the effects already here','Ignoring the whole problem','Building sea walls on the coast'],
    answer:'Cutting greenhouse gas emissions',
    hint:'Mitigation attacks the cause of climate change.',
    explanation:'<b>Mitigation</b> means reducing <b>greenhouse gas emissions</b> to slow climate change at its source (e.g. switching to renewable energy, electric transport, reducing deforestation). <b>Adaptation</b> means adjusting to the effects that are already happening.' }),

  makeMCQ({ id:'g8sms-climate-008', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'Which of the following is an example of climate change adaptation in Mauritius?',
    options:['Sea walls and mangrove planting','Burning far more fossil fuel','Cutting down coastal forests','Encouraging more tourist flights'],
    answer:'Sea walls and mangrove planting',
    hint:'Adaptation means adjusting to the effects of climate change that are already happening.',
    explanation:'<b>Climate adaptation</b> in Mauritius includes: building <b>sea walls</b> and coastal defences, restoring <b>mangroves</b> (which buffer storm surges), diversifying the economy away from climate-sensitive sectors and updating infrastructure to withstand stronger cyclones.' }),

  makeMCQ({ id:'g8sms-climate-009', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'The Paris Agreement (2015) commits countries to:',
    options:['Limit warming to below 2°C','Raise fossil fuel output','Scrap all climate policies','Build more coal power plants'],
    answer:'Limit warming to below 2°C',
    hint:'The Paris Agreement set global temperature targets.',
    explanation:'The <b>Paris Agreement (2015)</b> is an international treaty signed by nearly all countries, committing them to limit global average temperature rise to <b>well below 2°C</b> above pre-industrial levels, and to pursue efforts to limit it to <b>1.5°C</b>.' }),

  makeMCQ({ id:'g8sms-climate-010', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'Deforestation contributes to global warming because:',
    options:['Lost trees absorb no CO₂','Trees give off CO₂ as they grow','It has no effect on climate','Forests stop the rain falling'],
    answer:'Lost trees absorb no CO₂',
    hint:'Trees are "carbon sinks" — they absorb and store CO₂.',
    explanation:'<b>Deforestation</b> contributes to global warming in two ways: (1) trees cut down can no longer <b>absorb CO₂</b> from the atmosphere; (2) burning or decomposing trees <b>releases the carbon stored</b> in them. Tropical deforestation is a major source of emissions.' }),

  makeMCQ({ id:'g8sms-climate-011', chapterId:'g8sms-climate', difficulty:3, subsection:'adaptation_mitigation',
    question:'What does Mauritius\'s National Determined Contribution (NDC) under the Paris Agreement include?',
    options:['More renewables, fewer emissions','More coal power stations built','A refusal to join world efforts','Staying fully reliant on oil'],
    answer:'More renewables, fewer emissions',
    hint:'Small island states like Mauritius are among the most committed to clean energy.',
    explanation:'Mauritius\'s <b>NDC (Nationally Determined Contribution)</b> to the Paris Agreement commits to <b>increasing renewable energy</b> (solar, wind) to 35% of electricity generation by 2025 and reducing emissions through energy efficiency. This shows that even small nations are taking action.' }),

  makeMCQ({ id:'g8sms-climate-012', chapterId:'g8sms-climate', difficulty:3, subsection:'impact_mauritius',
    question:'Why are Small Island Developing States (SIDS) like Mauritius described as "frontline" states in the climate crisis?',
    options:['Hit hardest, though least to blame','They emit the most CO₂ of all','They control world climate policy','They refused to sign in Paris'],
    answer:'Hit hardest, though least to blame',
    hint:'The climate injustice is that those who emit least often suffer most.',
    explanation:'<b>SIDS</b> like Mauritius emit a tiny fraction of global greenhouse gases yet face disproportionate consequences: sea level rise, more intense cyclones and coral bleaching. This makes them <b>"frontline" states</b> and vocal advocates for stronger global climate action.' })

);
