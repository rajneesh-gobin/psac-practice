'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Slavery & Indentured Labour — slave_trade ─────────────────────────────

  makeMCQ({ id:'g8sms-slavery-013', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'Which European country was the first to bring enslaved people to Mauritius?',
    options:['The Netherlands (Dutch)','France','Britain','Portugal'],
    answer:'The Netherlands (Dutch)',
    hint:'The Dutch were the first to permanently settle Mauritius.',
    explanation:'The <b>Dutch</b>, who settled Mauritius from 1638, were the first to bring <b>enslaved people</b> to the island — mainly from Madagascar and East Africa — to work on their settlement. However, it was the French who expanded slavery into a large plantation system.' }),

  makeMCQ({ id:'g8sms-slavery-014', chapterId:'g8sms-slavery', difficulty:2, subsection:'slave_trade',
    question:'The Morne Brabant peninsula is a UNESCO World Heritage Site because:',
    options:['It was used as a refuge by runaway enslaved people (maroons) who chose to throw themselves off the cliff rather than be re-enslaved','It is the highest mountain in Mauritius','It was the landing point for indentured workers','It is where the first French colonists arrived'],
    answer:'It was used as a refuge by runaway enslaved people (maroons) who chose to throw themselves off the cliff rather than be re-enslaved',
    hint:'Le Morne is a symbol of resistance against slavery.',
    explanation:'<b>Le Morne Brabant</b> was a refuge for escaped enslaved people (maroons) who hid in its forests. According to tradition, when soldiers climbed to inform them of emancipation, the maroons, fearing re-enslavement, threw themselves off the cliff. It is a powerful symbol of the <b>struggle for freedom</b> and is a UNESCO World Heritage Site.' }),

  makeMCQ({ id:'g8sms-slavery-015', chapterId:'g8sms-slavery', difficulty:3, subsection:'slave_trade',
    question:'The triangular trade between Europe, Africa and the Americas involved Mauritius because:',
    options:['Mauritius was part of the broader Indian Ocean slave trade network, which supplied enslaved Africans to Mauritius and other Indian Ocean colonies','Mauritius was on the direct route between Europe and the Americas','Mauritius had its own triangular trade with the Americas','Mauritius was never connected to the slave trade'],
    answer:'Mauritius was part of the broader Indian Ocean slave trade network, which supplied enslaved Africans to Mauritius and other Indian Ocean colonies',
    hint:'The Indian Ocean had its own separate slave trade network, parallel to the Atlantic.',
    explanation:'While the famous triangular trade operated in the Atlantic, Mauritius was part of the <b>Indian Ocean slave trade</b>. Enslaved people from <b>East Africa and Madagascar</b> were transported to Mauritius and other Indian Ocean colonies by French and Dutch traders.' }),

  // ── Slavery & Indentured Labour — abolition_slavery ──────────────────────

  makeMCQ({ id:'g8sms-slavery-016', chapterId:'g8sms-slavery', difficulty:2, subsection:'abolition_slavery',
    question:'The British Slavery Abolition Act was passed in:',
    options:['1833','1835','1810','1968'],
    answer:'1833',
    hint:'The act was passed a year before it took effect in Mauritius.',
    explanation:'The <b>British Slavery Abolition Act was passed in 1833</b> by the British Parliament. It took effect in <b>1835</b> in Mauritius (and other British colonies), officially ending slavery. Former slave owners were financially compensated, while the enslaved people themselves received nothing initially.' }),

  makeMCQ({ id:'g8sms-slavery-017', chapterId:'g8sms-slavery', difficulty:3, subsection:'abolition_slavery',
    question:'After abolition in 1835, most freed enslaved people in Mauritius chose to:',
    options:['Leave the sugar estates and move to towns or set up small plots of land','Stay on the estates voluntarily as paid workers','Leave Mauritius entirely','Return to Africa'],
    answer:'Leave the sugar estates and move to towns or set up small plots of land',
    hint:'Freedom meant leaving behind the conditions of slavery.',
    explanation:'After the apprenticeship period ended in 1839, most <b>freed Mauritian Creoles</b> left the sugar estates. They moved to urban areas like Port-Louis, took up skilled trades, or found small plots of land to farm independently. Their refusal to return to plantation labour created the labour shortage that led to Indian indenture.' }),

  // ── Slavery & Indentured Labour — indenture_system ───────────────────────

  makeMCQ({ id:'g8sms-slavery-018', chapterId:'g8sms-slavery', difficulty:2, subsection:'indenture_system',
    question:'The Aapravasi Ghat (Immigration Depot) in Port-Louis processed approximately how many Indian indentured workers?',
    options:['Nearly 500,000 workers','About 5,000 workers','Over 5 million workers','Fewer than 1,000 workers'],
    answer:'Nearly 500,000 workers',
    hint:'The arrival of Indian indentured workers transformed Mauritius demographically.',
    explanation:'The <b>Aapravasi Ghat</b> processed approximately <b>450,000–500,000 Indian indentured workers</b> between 1834 and 1920. They came mainly from the states of Bihar, Uttar Pradesh and Madras (Tamil Nadu). Their descendants now form the majority of the Mauritian population.' }),

  makeMCQ({ id:'g8sms-slavery-019', chapterId:'g8sms-slavery', difficulty:2, subsection:'indenture_system',
    question:'Indentured workers mainly came from which parts of India?',
    options:['Bihar, Uttar Pradesh and Madras (Tamil Nadu)','Rajasthan and Punjab only','Bengal and Assam','Gujarat and Maharashtra'],
    answer:'Bihar, Uttar Pradesh and Madras (Tamil Nadu)',
    hint:'Most came from the poorer agricultural regions of colonial India.',
    explanation:'Most indentured workers came from the poor agricultural regions of <b>Bihar and Uttar Pradesh</b> (in northern India) and from <b>Madras (Tamil Nadu)</b> in southern India. They were recruited by agents called arkattis with promises of work and a better life.' }),

  makeMCQ({ id:'g8sms-slavery-020', chapterId:'g8sms-slavery', difficulty:3, subsection:'indenture_system',
    question:'Why is the indenture period (1834–1920) described as transformative for Mauritian society?',
    options:['It changed the demographic composition of Mauritius, making people of Indian origin the majority and shaping culture, religion and politics permanently','It had no long-term impact because indentured workers eventually left Mauritius','It only affected the economy, not society or culture','It reduced cultural diversity in Mauritius'],
    answer:'It changed the demographic composition of Mauritius, making people of Indian origin the majority and shaping culture, religion and politics permanently',
    hint:'Demographic change has long-lasting social and political consequences.',
    explanation:'The indenture period was <b>demographically transformative</b>: it made people of Indian origin the largest community in Mauritius. Indian languages, religions (Hinduism, Islam), foods, music and cultural practices became woven into Mauritian society — permanently shaping its culture and politics.' }),

  // ── Mauritian Society, 1920s to 1960s — post_ww1_conditions ──────────────

  makeMCQ({ id:'g8sms-society-013', chapterId:'g8sms-society', difficulty:2, subsection:'post_ww1_conditions',
    question:'Mauritians who served in World War I (1914–1918) were significant because:',
    options:['Their service broadened political awareness and demands for greater rights and representation on return','They won Mauritius its independence immediately after the war','They founded the first political parties','They built the first schools in Mauritius'],
    answer:'Their service broadened political awareness and demands for greater rights and representation on return',
    hint:'Soldiers who fought for empire often returned demanding rights they were denied.',
    explanation:'Mauritians who served in <b>World War I</b> in the Mauritius Labour Contingent returned with broadened political awareness. Having fought and sacrificed for the British Empire, many demanded <b>greater political representation and rights</b> — fuelling the early democratic and labour movements.' }),

  makeMCQ({ id:'g8sms-society-014', chapterId:'g8sms-society', difficulty:2, subsection:'social_economic_changes',
    question:'The Export Processing Zone (EPZ), established in the 1970s, transformed Mauritius by:',
    options:['Creating thousands of jobs in textile and garment manufacturing, reducing unemployment and diversifying the economy','Building luxury hotels for tourism','Expanding sugarcane cultivation','Developing the financial services sector only'],
    answer:'Creating thousands of jobs in textile and garment manufacturing, reducing unemployment and diversifying the economy',
    hint:'The EPZ brought manufacturing industry to a primarily agricultural economy.',
    explanation:'The <b>Export Processing Zone (EPZ)</b>, established in the early 1970s, encouraged foreign investment in <b>textile and garment factories</b>. It created tens of thousands of jobs (especially for women), reduced unemployment and was the first step in Mauritius\'s economic diversification away from sugar.' }),

  makeMCQ({ id:'g8sms-society-015', chapterId:'g8sms-society', difficulty:3, subsection:'mauritian_society',
    question:'The Best Loser System (BLS) in Mauritius is controversial because:',
    options:['Critics argue it reinforces communal identity and division rather than encouraging citizens to vote as Mauritians rather than as members of a community','It is seen as giving too much power to minority communities','It was created by colonial authorities to weaken Mauritian democracy','It does not allow minority communities any representation at all'],
    answer:'Critics argue it reinforces communal identity and division rather than encouraging citizens to vote as Mauritians rather than as members of a community',
    hint:'The system requires candidates and voters to declare their community.',
    explanation:'The <b>BLS</b> is controversial because it requires candidates to declare their ethnic community. Critics argue this <b>entrenches communalism</b> — encouraging people to vote along ethnic lines rather than for policies. Despite this, defenders say it ensures minority representation in a diverse society.' }),

  // ── The Way to Independence — empires_colonies ────────────────────────────

  makeMCQ({ id:'g8sms-independence-013', chapterId:'g8sms-independence', difficulty:2, subsection:'empires_colonies',
    question:'The French colonial empire in Africa was significant because:',
    options:['It controlled large territories in West, North and Central Africa, and Mauritius (Île de France) was part of this network','It only controlled Mauritius','It was the smallest empire in history','It focused entirely on Asia'],
    answer:'It controlled large territories in West, North and Central Africa, and Mauritius (Île de France) was part of this network',
    hint:'France had a vast empire across Africa and the Indian Ocean.',
    explanation:'The <b>French colonial empire</b> controlled large parts of <b>West, North and Central Africa</b> as well as Indian Ocean islands. Mauritius (Île de France) was connected to this network — enslaved people were brought from French-controlled African territories to work on Mauritian plantations.' }),

  makeMCQ({ id:'g8sms-independence-014', chapterId:'g8sms-independence', difficulty:2, subsection:'decolonisation',
    question:'The African National Congress (ANC) in South Africa and independence movements in Mauritius were similar because:',
    options:['Both sought equal rights, political representation and an end to colonial or racial domination','Both used armed revolution against Europe','Both were created by European colonists','Both opposed democracy'],
    answer:'Both sought equal rights, political representation and an end to colonial or racial domination',
    hint:'Both movements fought against systems that denied rights based on race or colonial status.',
    explanation:'Both the <b>ANC</b> (fighting apartheid in South Africa) and Mauritian political parties (fighting colonial rule) sought <b>equal rights and self-determination</b>. Global decolonisation movements were interconnected, drawing inspiration from each other\'s struggles.' }),

  makeMCQ({ id:'g8sms-independence-015', chapterId:'g8sms-independence', difficulty:3, subsection:'mauritius_independence',
    question:'The Chagos Archipelago dispute between Mauritius and the United Kingdom concerns:',
    options:['Mauritius\'s claim that the Chagos Islands (including Diego Garcia) were illegally separated from Mauritius before independence and should be returned','A dispute over the sugar trade','A border disagreement over Rodrigues','A conflict over fishing rights near Agaléga'],
    answer:'Mauritius\'s claim that the Chagos Islands (including Diego Garcia) were illegally separated from Mauritius before independence and should be returned',
    hint:'The ICJ and UN General Assembly have ruled in Mauritius\'s favour.',
    explanation:'The <b>Chagos Archipelago</b> was separated from Mauritius in 1965 before independence. The UK created the British Indian Ocean Territory (BIOT) and leased Diego Garcia to the USA for a military base. The <b>International Court of Justice (2019)</b> found that the separation was unlawful and called for the return of the islands to Mauritius.' }),

  // ── Mauritius, a Democratic Country — democracy_features ─────────────────

  makeMCQ({ id:'g8sms-democracy-013', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'In Mauritius, citizens can influence government decisions outside of elections through:',
    options:['Petitions, joining NGOs or trade unions, peaceful demonstrations and contacting their MP','Only by voting in elections','Writing letters to the President','Refusing to pay taxes'],
    answer:'Petitions, joining NGOs or trade unions, peaceful demonstrations and contacting their MP',
    hint:'Democracy gives citizens multiple ways to make their voices heard.',
    explanation:'In a healthy democracy, citizens can participate beyond elections by: signing <b>petitions</b>, joining <b>NGOs or trade unions</b>, <b>peaceful demonstrations</b>, writing to their MP or participating in public consultations. These are all legitimate democratic tools.' }),

  makeMCQ({ id:'g8sms-democracy-014', chapterId:'g8sms-democracy', difficulty:2, subsection:'democracy_features',
    question:'The right to vote is also called:',
    options:['Suffrage','Sovereignty','Judiciary','The executive'],
    answer:'Suffrage',
    hint:'Universal adult suffrage was introduced in Mauritius in 1959.',
    explanation:'<b>Suffrage</b> refers to the right to <b>vote in political elections</b>. <b>Universal adult suffrage</b> — the right of all adult citizens to vote regardless of gender, religion, race or property — was introduced in Mauritius in <b>1959</b>, ahead of independence.' }),

  makeMCQ({ id:'g8sms-democracy-015', chapterId:'g8sms-democracy', difficulty:3, subsection:'constitution_government',
    question:'The Supreme Court of Mauritius can strike down a law if:',
    options:['It contradicts the Constitution, which is the supreme law of Mauritius','The Prime Minister requests it','A majority of citizens vote against it','The President disagrees with it'],
    answer:'It contradicts the Constitution, which is the supreme law of Mauritius',
    hint:'The judiciary is independent and can review government actions.',
    explanation:'The <b>Supreme Court of Mauritius</b> exercises <b>judicial review</b> — it can declare a law unconstitutional and therefore invalid if it conflicts with the <b>Constitution</b>. This is a key check on government power and protects citizens\' fundamental rights.' }),

  // ── Mauritius, a Democratic Country — constitution_government ────────────

  makeMCQ({ id:'g8sms-democracy-016', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'The President of Mauritius is elected by:',
    options:['The National Assembly (by a vote of MPs)','All citizens in a direct election','The Prime Minister alone','The Supreme Court judges'],
    answer:'The National Assembly (by a vote of MPs)',
    hint:'Unlike some countries, Mauritius does not have a direct presidential election by citizens.',
    explanation:'The <b>President of Mauritius</b> is elected by the <b>National Assembly</b> (parliament), not directly by citizens. The President has mainly <b>ceremonial duties</b> as Head of State, while the <b>Prime Minister</b> holds executive power.' }),

  makeMCQ({ id:'g8sms-democracy-017', chapterId:'g8sms-democracy', difficulty:2, subsection:'constitution_government',
    question:'The role of the Electoral Supervisory Commission (ESC) in Mauritius is to:',
    options:['Supervise elections to ensure they are free, fair and transparent','Run the daily affairs of government','Appoint the Prime Minister','Manage the national budget'],
    answer:'Supervise elections to ensure they are free, fair and transparent',
    hint:'An independent body is needed to ensure elections are not manipulated.',
    explanation:'The <b>Electoral Supervisory Commission (ESC)</b> and the <b>Electoral Boundaries Commission (EBC)</b> are constitutional bodies that oversee elections in Mauritius, ensuring they are <b>free, fair and transparent</b>. Independent oversight of elections is essential in a democracy.' }),

  // ── Mauritius, a Democratic Country — media_democracy ────────────────────

  makeMCQ({ id:'g8sms-democracy-018', chapterId:'g8sms-democracy', difficulty:2, subsection:'media_democracy',
    question:'The Mauritius Broadcasting Corporation (MBC) is:',
    options:['The state public broadcaster, which has a responsibility to inform and educate citizens','A private company owned by political parties','A government propaganda tool that only broadcasts pro-government news','A foreign media company'],
    answer:'The state public broadcaster, which has a responsibility to inform and educate citizens',
    hint:'Most countries have a public broadcaster funded by government or licence fees.',
    explanation:'The <b>MBC (Mauritius Broadcasting Corporation)</b> is the <b>state-owned public broadcaster</b> of Mauritius, operating television and radio. It has a public service mandate to <b>inform, educate and entertain</b> in a balanced manner, though critics argue it sometimes favours the ruling government.' }),

  makeMCQ({ id:'g8sms-democracy-019', chapterId:'g8sms-democracy', difficulty:3, subsection:'media_democracy',
    question:'Why is press freedom sometimes in tension with national security laws?',
    options:['Governments may use national security as a justification to restrict reporting, but this can silence legitimate journalism that exposes wrongdoing','Press freedom and national security are always perfectly compatible','National security laws only apply to foreign journalists','Press freedom means journalists can publish any information without limit'],
    answer:'Governments may use national security as a justification to restrict reporting, but this can silence legitimate journalism that exposes wrongdoing',
    hint:'The balance between security and freedom is a key democratic challenge.',
    explanation:'National security laws can restrict the publication of sensitive information. However, there is a risk that governments use "national security" as a justification to <b>suppress legitimate journalism</b> that exposes corruption or wrongdoing. Democracies must carefully balance <b>press freedom</b> with genuine security needs.' }),

  // ── The Changing Climate — global_warming_causes ──────────────────────────

  makeMCQ({ id:'g8sms-climate-013', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'Methane (CH₄) is a potent greenhouse gas released mainly by:',
    options:['Livestock farming (cattle), rice paddies, landfill sites and natural gas leaks','Car engines only','The ocean','Power stations only'],
    answer:'Livestock farming (cattle), rice paddies, landfill sites and natural gas leaks',
    hint:'Methane is produced in conditions where organic matter decomposes without oxygen.',
    explanation:'<b>Methane (CH₄)</b> is a powerful greenhouse gas — about 80 times more potent than CO₂ over 20 years. It is released by <b>cattle and sheep</b> (digestion), decomposing organic material in <b>rice paddies and landfills</b>, and leaks from natural gas pipelines.' }),

  makeMCQ({ id:'g8sms-climate-014', chapterId:'g8sms-climate', difficulty:2, subsection:'global_warming_causes',
    question:'The IPCC (Intergovernmental Panel on Climate Change) is an organisation that:',
    options:['Reviews and summarises global scientific research on climate change for governments and policymakers','Controls global temperatures','Owns all solar panels in the world','Funds only Mauritius\'s climate response'],
    answer:'Reviews and summarises global scientific research on climate change for governments and policymakers',
    hint:'It produces authoritative reports that form the basis of international climate policy.',
    explanation:'The <b>IPCC</b> is a United Nations body that reviews and synthesises thousands of scientific studies on <b>climate change</b>. Its Assessment Reports provide policymakers with the scientific basis for the <b>Paris Agreement</b> and other international climate actions.' }),

  makeMCQ({ id:'g8sms-climate-015', chapterId:'g8sms-climate', difficulty:3, subsection:'global_warming_causes',
    question:'Why does Mauritius contribute very little to global greenhouse gas emissions despite being affected by climate change?',
    options:['Mauritius is a small island nation with a small population and economy, and relies mainly on imported fuel rather than heavy industry','Mauritius has banned all fossil fuels','Mauritius only uses renewable energy','Mauritius is protected from climate change by its coral reef'],
    answer:'Mauritius is a small island nation with a small population and economy, and relies mainly on imported fuel rather than heavy industry',
    hint:'Emissions are proportional to population size and industrial activity.',
    explanation:'Mauritius has a population of about 1.3 million and no heavy manufacturing industry. Its total <b>CO₂ emissions</b> are a fraction of a percent of global totals. Yet it suffers disproportionately from climate impacts — illustrating the <b>climate justice</b> issue faced by Small Island Developing States.' }),

  // ── The Changing Climate — impact_mauritius ───────────────────────────────

  makeMCQ({ id:'g8sms-climate-016', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'More intense and frequent cyclones are a predicted impact of climate change on Mauritius. This is because:',
    options:['Warmer sea surface temperatures provide more energy for tropical cyclones to intensify','Cyclones are caused by global warming alone','Mauritius is moving closer to the equator','Cyclones are becoming less intense globally'],
    answer:'Warmer sea surface temperatures provide more energy for tropical cyclones to intensify',
    hint:'Cyclones draw their energy from warm ocean water.',
    explanation:'Tropical cyclones gain energy from <b>warm sea surface temperatures</b>. As global warming heats the Indian Ocean, cyclones that affect Mauritius may become <b>more intense</b> — with stronger winds and heavier rainfall — causing greater damage to infrastructure and ecosystems.' }),

  makeMCQ({ id:'g8sms-climate-017', chapterId:'g8sms-climate', difficulty:2, subsection:'impact_mauritius',
    question:'Ocean acidification, caused by CO₂ dissolving in seawater, threatens Mauritius because:',
    options:['It weakens coral reefs by making it harder for corals to build their calcium carbonate skeletons','It makes the sea warmer and more pleasant for swimming','It increases fish populations','It has no effect on marine ecosystems'],
    answer:'It weakens coral reefs by making it harder for corals to build their calcium carbonate skeletons',
    hint:'When CO₂ dissolves in water it forms carbonic acid.',
    explanation:'When CO₂ is absorbed by the ocean, it forms <b>carbonic acid</b>, making seawater more acidic. This <b>ocean acidification</b> makes it harder for corals to build their <b>calcium carbonate skeletons</b>, weakening reefs. For Mauritius, which depends on healthy reefs for tourism and fisheries, this is a serious threat.' }),

  // ── The Changing Climate — adaptation_mitigation ──────────────────────────

  makeMCQ({ id:'g8sms-climate-018', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'Mauritius is transitioning towards renewable energy. One major renewable energy project is:',
    options:['Expanding solar energy capacity through rooftop solar panels and solar farms','Building new coal power stations','Importing energy from Europe','Drilling for oil in the lagoon'],
    answer:'Expanding solar energy capacity through rooftop solar panels and solar farms',
    hint:'Mauritius has abundant sunlight — solar is a natural fit.',
    explanation:'Mauritius is expanding its <b>solar energy capacity</b> through rooftop solar panels on homes and businesses, and larger solar farms. This reduces dependence on imported <b>fossil fuels</b> (which Mauritius does not produce) and cuts greenhouse gas emissions from electricity generation.' }),

  makeMCQ({ id:'g8sms-climate-019', chapterId:'g8sms-climate', difficulty:3, subsection:'adaptation_mitigation',
    question:'Mangrove restoration is an important climate adaptation strategy for Mauritius because:',
    options:['Mangroves protect coastlines from storm surges and erosion, sequester carbon and provide habitat for fish','Mangroves are a source of timber for construction','Mangroves increase ocean temperatures','Mangroves prevent cyclones from forming'],
    answer:'Mangroves protect coastlines from storm surges and erosion, sequester carbon and provide habitat for fish',
    hint:'Mangroves are often called "coastal shields".',
    explanation:'<b>Mangroves</b> are coastal trees that provide multiple climate benefits: they <b>buffer storm surges</b> (reducing cyclone damage), <b>prevent coastal erosion</b>, <b>store carbon</b> in their roots and soils, and provide nursery habitat for fish. Restoring them is one of Mauritius\'s key adaptation strategies.' }),

  makeMCQ({ id:'g8sms-climate-020', chapterId:'g8sms-climate', difficulty:2, subsection:'adaptation_mitigation',
    question:'The concept of "loss and damage" in climate negotiations is important for Mauritius because:',
    options:['It argues that wealthy countries which caused climate change should compensate vulnerable nations like Mauritius for unavoidable climate losses','It means Mauritius must pay for damage it caused to other countries','It refers only to damage from cyclones, not sea level rise','It is a concept that applies only to African countries'],
    answer:'It argues that wealthy countries which caused climate change should compensate vulnerable nations like Mauritius for unavoidable climate losses',
    hint:'The "polluter pays" principle applied to climate change.',
    explanation:'<b>"Loss and Damage"</b> refers to climate-related losses that cannot be adapted to — such as land permanently lost to sea level rise. Small island states like Mauritius argue that <b>wealthy industrialised nations</b>, which caused most emissions, should compensate vulnerable nations for these irreversible losses — a key issue at COP climate summits.' }),

  makeTF({ id:'g8sms-climate-021', chapterId:'g8sms-climate', difficulty:1, subsection:'global_warming_causes',
    question:'CO₂ emissions from human activities are the main driver of climate change.',
    answer:'True',
    hint:'Scientific consensus is clear on this point.',
    explanation:'<b>True.</b> The <b>IPCC</b> and the overwhelming majority of climate scientists agree that <b>CO₂ and other greenhouse gases released by human activities</b> (burning fossil fuels, deforestation, agriculture) are the primary cause of the accelerated global warming observed since industrialisation.' })

);

})();
