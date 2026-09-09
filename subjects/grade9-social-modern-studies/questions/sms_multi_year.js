'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Colonial Independence ──────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my001', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:1,
    question:'In which year did Mauritius become an independent nation?',
    options:['1968','1960','1992','1948'], answer:'1968',
    hint:'The date of independence is 12 March.',
    explanation:'Mauritius gained independence from British rule on <b>12 March 1968</b>. It became a republic in 1992 when it broke all ties with the British Crown.' }),

  makeMCQ({ id:'g9sms-my002', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:2,
    question:'Who was the leader of the <i>Parti Mauricien Social Démocrate</i> (PMSD) during the 1967 elections?',
    options:['Sir Gaëtan Duval','Sir Seewoosagur Ramgoolam','Sir Abdool Raman Osman','Sir Anerood Jugnauth'], answer:'Sir Gaëtan Duval',
    hint:'He was known for his charismatic opposition to independence.',
    explanation:'<b>Sir Gaëtan Duval</b> led the PMSD, which campaigned against independence. The ILP under Sir Seewoosagur Ramgoolam won the 1967 election, securing independence.' }),

  makeMCQ({ id:'g9sms-my003', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:1,
    question:'In which year did Mauritius become a Republic?',
    options:['1992','1968','1983','2000'], answer:'1992',
    hint:'The change happened more than 20 years after independence.',
    explanation:'Mauritius became a <b>Republic on 12 March 1992</b>, replacing the British monarch as head of state with a Mauritian President.' }),

  makeMCQ({ id:'g9sms-my004', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:2,
    question:'Under which European power was Mauritius known as <i>Isle de France</i>?',
    options:['France','Britain','Holland','Portugal'], answer:'France',
    hint:'The French name gives it away.',
    explanation:'Under <b>French rule</b> (1715–1810) Mauritius was called <i>Isle de France</i>. The French developed sugar plantations and imported enslaved Africans. Britain took control after the Napoleonic Wars.' }),

  // ── Living Conditions ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my005', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:1,
    question:'Which disease was a major health crisis in Mauritius in the 1940s before it was eradicated?',
    options:['Malaria','Cholera','Typhoid','Smallpox'], answer:'Malaria',
    hint:'It is spread by mosquitoes.',
    explanation:'<b>Malaria</b> was endemic in Mauritius until it was eradicated in the late 1940s through DDT spraying campaigns. It was one of the biggest killers at the time.' }),

  makeMCQ({ id:'g9sms-my006', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
    question:'What was the main outcome of the student strike of 1975 in Mauritius?',
    options:['Free bus transport for students was introduced','Sugar prices were regulated','A new university was founded','School fees were doubled'], answer:'Free bus transport for students was introduced',
    hint:'It was a practical benefit that students demanded.',
    explanation:'Following the <b>1975 student strike</b>, the government introduced <b>free bus transport</b> for students, which remains in place today.' }),

  makeMCQ({ id:'g9sms-my007', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
    question:'Before education reforms in Mauritius, primary schooling was mainly available to which group?',
    options:['Children of wealthy families and the elite','All children regardless of income','Only children in Port Louis','Only boys'], answer:'Children of wealthy families and the elite',
    hint:'Access depended on the ability to pay.',
    explanation:'Before reforms, education was not free and was largely accessible only to <b>wealthy families and the elite</b>. Post-independence reforms extended free primary then secondary education to all.' }),

  // ── Economy 1960s ──────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my008', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:1,
    question:'At independence, Mauritius was heavily dependent on which single crop for its economy?',
    options:['Sugar cane','Tea','Tobacco','Cotton'], answer:'Sugar cane',
    hint:'It still dominates large parts of the landscape.',
    explanation:'At independence, <b>sugar cane</b> accounted for the vast majority of export earnings and employed most of the workforce. Over-dependence on one crop was seen as a major economic vulnerability.' }),

  makeMCQ({ id:'g9sms-my009', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:2,
    question:'Which of the following was an obstacle facing Mauritius at independence?',
    options:['Rapid population growth straining resources','Too many industries causing pollution','An excess of skilled workers','High oil reserves creating dependence'], answer:'Rapid population growth straining resources',
    hint:'More people meant more pressure on jobs, food and housing.',
    explanation:'Rapid <b>population growth</b> was a key obstacle — the population was growing faster than the economy could provide jobs and services, which Nobel Prize-winning economist James Meade had cited as a sign Mauritius was heading for disaster.' }),

  makeMCQ({ id:'g9sms-my010', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
    question:'Which economic strategy did Mauritius first adopt after independence to reduce reliance on sugar?',
    options:['Import Substitution Industrialisation (ISI)','Export of raw materials only','Nationalisation of all industries','Agricultural diversification only'], answer:'Import Substitution Industrialisation (ISI)',
    hint:'The idea was to make locally what had previously been imported.',
    explanation:'Mauritius adopted <b>Import Substitution Industrialisation (ISI)</b> — producing goods locally that were previously imported — as its first strategy. When this proved insufficient, it pivoted to export-led growth through the EPZ.' }),

  // ── Industrialisation ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my011', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:2,
    question:'Which of the following was an incentive offered to attract companies to the Export Processing Zone (EPZ)?',
    options:['Tax exemptions for a number of years','Free land for all investors','Unlimited import duties waived permanently','No labour laws applied in EPZ factories'], answer:'Tax exemptions for a number of years',
    hint:'Governments use financial breaks to attract foreign investors.',
    explanation:'The EPZ offered investors incentives such as <b>tax holidays</b> (exemption from income tax for several years), duty-free import of machinery and raw materials, and access to cheap labour.' }),

  makeMCQ({ id:'g9sms-my012', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:2,
    question:'Which is the correct order of sectors that drove Mauritius\'s economic development after independence?',
    options:['Sugar → Manufacturing (EPZ) → Tourism → Financial Services → ICT','Sugar → Tourism → Manufacturing → ICT → Financial Services','Manufacturing → Sugar → Tourism → ICT → Financial Services','Tourism → Sugar → Manufacturing → Financial Services → ICT'], answer:'Sugar → Manufacturing (EPZ) → Tourism → Financial Services → ICT',
    hint:'Sugar came first; the digital economy came last.',
    explanation:'Mauritius diversified in stages: <b>Sugar</b> (colonial era), then <b>Manufacturing/EPZ</b> (1970s–80s), then <b>Tourism</b> (1980s–90s), then <b>Financial Services</b> (1990s), then <b>ICT</b> (2000s). This is the "Mauritian Miracle."' }),

  makeMCQ({ id:'g9sms-my013', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:3,
    question:'Why is the economic development of Mauritius sometimes called the "Mauritian Miracle"?',
    options:['It transformed from one of the world\'s poorest countries to a high-income economy within decades','It discovered oil and became wealthy overnight','It received the most foreign aid in Africa','It had the largest EPZ in the world'], answer:'It transformed from one of the world\'s poorest countries to a high-income economy within decades',
    hint:'Think about the speed and scale of the change.',
    explanation:'The <b>"Mauritian Miracle"</b> refers to how Mauritius moved from a low-income, sugar-dependent economy at independence to an upper-middle-income economy with diversified industries in just a few decades — defying early predictions of poverty and instability.' }),

  // ── Industrial Impact ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my014', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:2,
    question:'Which group of people found new employment opportunities mainly in the EPZ factories after the 1970s?',
    options:['Women','Retired men','Children under 18','Foreign workers only'], answer:'Women',
    hint:'The garment factories changed the economic role of a particular group.',
    explanation:'The EPZ, particularly the <b>textile and garment factories</b>, employed large numbers of <b>women</b>, fundamentally changing their economic and social role in Mauritian society.' }),

  makeMCQ({ id:'g9sms-my015', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:2,
    question:'Which of the following is an environmental consequence of rapid industrialisation in Mauritius?',
    options:['Water pollution from factory discharge','Increased biodiversity in coastal areas','Larger forest coverage','Reduced CO₂ emissions'], answer:'Water pollution from factory discharge',
    hint:'Factories produce waste that has to go somewhere.',
    explanation:'Industrialisation brought <b>water pollution</b> from factory waste and increased pressure on land, coastal areas and natural resources — alongside economic benefits.' }),

  // ── Chagos-Tromelin ────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my016', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:1,
    question:'Tromelin Island is co-managed by Mauritius and which other country?',
    options:['France','United Kingdom','United States','Madagascar'], answer:'France',
    hint:'The name of the island has French origins.',
    explanation:'<b>Tromelin</b> is jointly administered by <b>Mauritius and France</b> under a 2010 co-management agreement, although Mauritius claims sovereignty over the island.' }),

  makeMCQ({ id:'g9sms-my017', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
    question:'What is Diego Garcia primarily used for today?',
    options:['A US military base','A tourist resort','A fishing village','An oil drilling platform'], answer:'A US military base',
    hint:'It has strategic military importance in the Indian Ocean.',
    explanation:'Diego Garcia is the largest island of the Chagos Archipelago and hosts a major <b>United States military base</b>. The Chagossians were expelled in the 1960s–70s to make way for it.' }),

  makeMCQ({ id:'g9sms-my018', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:3,
    question:'What did the 2019 International Court of Justice (ICJ) advisory opinion state about the Chagos Archipelago?',
    options:['The UK\'s administration of Chagos is unlawful and it should be returned to Mauritius','Mauritius has no legal claim over Chagos','The Chagossians should be compensated but the island stays British','The US military base is legal under international law'], answer:'The UK\'s administration of Chagos is unlawful and it should be returned to Mauritius',
    hint:'The ICJ sided with Mauritius.',
    explanation:'In 2019, the <b>ICJ issued an advisory opinion</b> that the UK\'s continued administration of the Chagos Archipelago was unlawful, and that it should be handed back to Mauritius.' }),

  // ── Map & Data Skills ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my019', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:2,
    question:'A bar chart shows tourist arrivals: 2019 = 1.4 million, 2020 = 0.3 million, 2021 = 0.6 million, 2022 = 1.0 million. Which year had the biggest drop in arrivals?',
    options:['2020','2019','2021','2022'], answer:'2020',
    hint:'Look for the year when the bar is lowest.',
    explanation:'Arrivals dropped from 1.4 million (2019) to 0.3 million (2020), a fall of 1.1 million — the biggest single-year drop, caused by the global Covid-19 pandemic and travel restrictions.' }),

  makeMCQ({ id:'g9sms-my020', chapterId:'g9sms-map-data-skills', subsection:'table_reading', difficulty:2,
    question:'A table shows Mauritius\'s population: 1968 = 750,000; 1990 = 1,022,000; 2020 = 1,265,000. By how much did the population grow between 1968 and 2020?',
    options:['515,000','272,000','1,265,000','750,000'], answer:'515,000',
    hint:'Subtract the 1968 figure from the 2020 figure.',
    explanation:'1,265,000 − 750,000 = <b>515,000</b>. Reading data from a table and calculating a difference is a core map-data skills task on the NCE paper.' }),

  // ── Population ─────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my021', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:2,
    question:'Which district of Mauritius has the highest population density?',
    options:['Port Louis','Black River','Savanne','Flacq'], answer:'Port Louis',
    hint:'It is the capital and the economic hub.',
    explanation:'<b>Port Louis</b>, as the capital city and main commercial centre, has by far the highest population density in Mauritius, with a large number of people living and working in a small area.' }),

  makeMCQ({ id:'g9sms-my022', chapterId:'g9sms-population', subsection:'birth_death_rates', difficulty:2,
    question:'What has been the general trend of the birth rate in Mauritius since the 1970s?',
    options:['It has been declining','It has been rising steadily','It has remained constant','It doubled between 1990 and 2020'], answer:'It has been declining',
    hint:'Better education and economic development tend to lower birth rates.',
    explanation:'Mauritius\'s <b>birth rate has been declining</b> since the 1970s due to improved education, higher female participation in the workforce, and greater access to family planning.' }),

  makeMCQ({ id:'g9sms-my023', chapterId:'g9sms-population', subsection:'ageing', difficulty:2,
    question:'Which of the following is a consequence of an ageing population in Mauritius?',
    options:['Greater demand for healthcare and pension services','A rise in birth rates','A decrease in school enrolment only','Lower government spending'], answer:'Greater demand for healthcare and pension services',
    hint:'Older people need specific services.',
    explanation:'An ageing population creates <b>greater demand for healthcare and pensions</b>, and can place strain on the working-age population who must support the elderly through taxation.' }),

  // ── Migration ──────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my024', chapterId:'g9sms-migration', subsection:'push_pull', difficulty:2,
    question:'Which of the following is a <b>pull</b> factor that attracts people to migrate to a new country?',
    options:['Better job opportunities abroad','Conflict and war at home','Natural disasters in the home country','Poverty in the country of origin'], answer:'Better job opportunities abroad',
    hint:'Pull factors attract — they exist at the destination.',
    explanation:'<b>Pull factors</b> exist in the destination country and attract migrants: better jobs, higher wages, good education and safety. <b>Push factors</b> — like conflict, poverty or disasters — drive people away from their home.' }),

  makeMCQ({ id:'g9sms-my025', chapterId:'g9sms-migration', subsection:'internal_international', difficulty:1,
    question:'What is meant by <b>internal migration</b>?',
    options:['Moving from one place to another within the same country','Moving from one country to another','Moving from a rural area to a foreign city','Forced movement due to war'], answer:'Moving from one place to another within the same country',
    hint:'Internal means within the same borders.',
    explanation:'<b>Internal migration</b> is movement within the same country (e.g. rural-to-urban migration). <b>International migration</b> crosses national borders.' }),

  // ── Outer Islands ──────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my026', chapterId:'g9sms-outer-islands', subsection:'agalega', difficulty:1,
    question:'Agalega consists of how many islands?',
    options:['Two','One','Three','Four'], answer:'Two',
    hint:'North Island and South Island.',
    explanation:'Agalega consists of <b>two islands</b> — North Island and South Island — located about 1,000 km north of Mauritius in the Indian Ocean.' }),

  makeMCQ({ id:'g9sms-my027', chapterId:'g9sms-outer-islands', subsection:'rodrigues', difficulty:2,
    question:'Rodrigues is described as an autonomous region of Mauritius. What does this mean?',
    options:['It has its own regional assembly and manages many of its own affairs','It is fully independent from Mauritius','It is administered directly by the Prime Minister\'s office','It has no elected government'], answer:'It has its own regional assembly and manages many of its own affairs',
    hint:'Autonomous means some degree of self-governance.',
    explanation:'Rodrigues is an <b>autonomous region</b> of Mauritius with its own <b>Rodrigues Regional Assembly</b>, which manages local affairs such as agriculture, fisheries and the environment.' }),

  // ── Hazards & Environment ──────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my028', chapterId:'g9sms-hazards-environment', subsection:'cyclones', difficulty:2,
    question:'Under which Cyclone Warning Class in Mauritius are schools and non-essential offices closed?',
    options:['Class 3','Class 1','Class 2','Class 4'], answer:'Class 3',
    hint:'Classes go from 1 (weakest) to 4 (strongest).',
    explanation:'In Mauritius, <b>Class 3</b> cyclone warnings cause schools and non-essential workplaces to close. Class 1 and 2 are precautionary; Class 4 indicates the cyclone is directly over Mauritius.' }),

  makeMCQ({ id:'g9sms-my029', chapterId:'g9sms-hazards-environment', subsection:'climate_change', difficulty:2,
    question:'How does climate change threaten low-lying island nations like Mauritius?',
    options:['Rising sea levels can flood coastal areas','Stronger trade winds bring more rain','Higher temperatures increase crop yields','The Indian Ocean cools, reducing storm activity'], answer:'Rising sea levels can flood coastal areas',
    hint:'Melting ice caps cause ocean levels to rise.',
    explanation:'<b>Rising sea levels</b> caused by global warming threaten to flood Mauritius\'s coastal areas, beaches and low-lying infrastructure. This is one of the most serious long-term threats.' }),

  // ── Government & Welfare ───────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my030', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:1,
    question:'Which government body in Mauritius is responsible for collecting taxes?',
    options:['Mauritius Revenue Authority (MRA)','Bank of Mauritius','Central Statistics Office','Ministry of Finance'], answer:'Mauritius Revenue Authority (MRA)',
    hint:'Its initials are MRA.',
    explanation:'The <b>Mauritius Revenue Authority (MRA)</b> collects taxes including income tax, VAT and customs duties on behalf of the government.' }),

  makeMCQ({ id:'g9sms-my031', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
    question:'What is the minimum age at which a person can legally be employed in Mauritius?',
    options:['16','14','18','15'], answer:'16',
    hint:'Child labour laws protect young people.',
    explanation:'In Mauritius, children under <b>16 years of age</b> are not allowed to work. This is set out in the law to protect children and ensure they complete their basic education.' }),

  makeMCQ({ id:'g9sms-my032', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
    question:'Which of the following is an example of a welfare measure provided by the Mauritian government?',
    options:['Basic Retirement Pension for all citizens over 60','Free meals for government officials','Tax-free status for all workers','Free housing for all civil servants'], answer:'Basic Retirement Pension for all citizens over 60',
    hint:'It supports elderly citizens who can no longer work.',
    explanation:'Mauritius has a <b>Basic Retirement Pension</b> paid to all citizens aged 60 and above regardless of their working history. This is part of the government\'s welfare state measures.' }),

  // ── Media ──────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my033', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:1,
    question:'Which of the following is an example of <b>print media</b>?',
    options:['A newspaper','A television channel','A radio station','A social media platform'], answer:'A newspaper',
    hint:'Print means it is physically produced on paper.',
    explanation:'<b>Print media</b> includes newspapers, magazines, books and leaflets — anything produced on paper. Television, radio and social media are electronic or new-age digital media.' }),

  makeMCQ({ id:'g9sms-my034', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:2,
    question:'What is one of the main roles of the media in a democratic society?',
    options:['To hold the government accountable by informing the public','To set tax rates on behalf of the government','To elect the President','To control the school curriculum'], answer:'To hold the government accountable by informing the public',
    hint:'The media is sometimes called the "fourth estate."',
    explanation:'In a democracy, a free media <b>holds the government accountable</b> by informing citizens about political decisions, investigating corruption and giving voice to different perspectives.' }),

  // ── Family ─────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my035', chapterId:'g9sms-family', subsection:'family_types', difficulty:1,
    question:'What type of family consists only of two parents and their children, with no other relatives in the home?',
    options:['Nuclear family','Extended family','Single-parent family','Reconstituted family'], answer:'Nuclear family',
    hint:'It is the smallest, most basic family unit.',
    explanation:'A <b>nuclear family</b> consists of two parents and their children living together. An extended family also includes grandparents, aunts, uncles or other relatives.' }),

  makeMCQ({ id:'g9sms-my036', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:2,
    question:'Which development in the 1970s–80s significantly increased the number of Mauritian women in paid employment?',
    options:['The growth of the Export Processing Zone (EPZ)','The construction of the airport','The expansion of the sugar industry','The introduction of free primary education'], answer:'The growth of the Export Processing Zone (EPZ)',
    hint:'These factories needed large numbers of workers.',
    explanation:'The <b>EPZ garment and textile factories</b> employed large numbers of women from the 1970s, dramatically increasing female participation in the formal economy and shifting gender roles.' }),

  // ── Social Change ──────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my037', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:2,
    question:'In sociology, what is meant by <b>deviance</b>?',
    options:['Behaviour that breaks the accepted norms of a society','Behaviour that follows all social rules','A form of artistic expression','Extreme religious observance'], answer:'Behaviour that breaks the accepted norms of a society',
    hint:'Norms are the accepted rules; deviance breaks them.',
    explanation:'<b>Deviance</b> refers to any behaviour that violates the social norms of a group or society. It can be minor (e.g. queue-jumping) or serious (e.g. crime), and what counts as deviant varies between cultures.' }),

  makeMCQ({ id:'g9sms-my038', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:2,
    question:'Which of the following is an example of <b>upward social mobility</b>?',
    options:['A factory worker\'s child becomes a doctor','A manager loses their job and takes lower-paid work','A farmer stays in farming like their parents','A student moves to a different school'], answer:'A factory worker\'s child becomes a doctor',
    hint:'Upward means moving to a higher social position.',
    explanation:'<b>Upward social mobility</b> means moving to a higher position in the social hierarchy, e.g. through education or career advancement. A child of a factory worker becoming a doctor is a classic example.' }),

  // ── Links ──────────────────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-my039', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
    question:'What does the abbreviation <b>COMESA</b> stand for?',
    options:['Common Market for Eastern and Southern Africa','Commission of Modern Economic States of Africa','Community of East Mediterranean and South Asian nations','Central Organisation for Mauritius Economic and Social Affairs'], answer:'Common Market for Eastern and Southern Africa',
    hint:'It is a trade bloc covering eastern and southern Africa.',
    explanation:'<b>COMESA</b> stands for the <b>Common Market for Eastern and Southern Africa</b>. Mauritius is a member and benefits from preferential trade and regional cooperation.' }),

  makeMCQ({ id:'g9sms-my040', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
    question:'From which country did the majority of indentured labourers come to work in Mauritius after the abolition of slavery?',
    options:['India','China','Madagascar','Mozambique'], answer:'India',
    hint:'Their descendants now form the largest ethnic group in Mauritius.',
    explanation:'After slavery was abolished in 1835, British planters brought <b>indentured labourers mainly from India</b>. Indo-Mauritians are now the largest ethnic group and maintain strong cultural links with India.' })

);
})();
