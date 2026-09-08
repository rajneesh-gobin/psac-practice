'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies (NCE) - STARTER BANK.
//
//  ⚠ THIS IS A FLOOR, NOT A FULL BANK - the same deliberate minimum as the
//    English and French starter banks: one question per declared subsection so
//    nothing on the Practise screen opens blank, and at least examWeight per
//    chapter so assembleExamPaper() can deal a whole paper. The house standard
//    is ~20 per subsection; more to follow.
//
//  ⚠ EVERY DATE AND FIGURE HERE IS A REAL, CHECKABLE FACT about Mauritius -
//    independence 12 March 1968, republic 12 March 1992, the EPZ Act of 1970,
//    the detachment of the Chagos in 1965 and the ICJ advisory opinion of 2019.
//    This is a history and civics pack: an invented date is not a small error,
//    it is the wrong answer taught confidently. Check before adding more.
//
//  ⚠ Some of this content is genuinely painful - slavery, indenture, the
//    expulsion of the Chagossians. It is written plainly and without
//    euphemism, but without dwelling on distressing detail for its own sake.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ── Colonial Past & the Road to Independence (w1) ───────────────────────

  makeMCQ({ id:'g9sms-sb-001', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:2,
    question:'Which three European powers colonised Mauritius, in order?',
    options:['The Dutch, the French, then the British','The British, the Dutch, then the French','The French, the British, then the Dutch','The Portuguese, the Dutch, then the French'],
    answer:'The Dutch, the French, then the British',
    hint:'The first settlers gave the island its name; the last left the legal system.',
    explanation:'The <b>Dutch</b> settled from 1638 and named the island after Maurice of Nassau, the <b>French</b> took over in 1715, and the <b>British</b> captured it in 1810. The Portuguese visited but never settled.' }),

  makeMCQ({ id:'g9sms-sb-002', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:3,
    question:'In the 1967 general election, what was the main question put to voters?',
    options:['Whether Mauritius should become independent','Whether to join the Commonwealth','Whether to change the national language','Whether to build a new airport'],
    answer:'Whether Mauritius should become independent',
    hint:'The election was effectively a vote on the island\'s future status.',
    explanation:'The 1967 election was fought between the Independence Party, which won, and the PMSD, which favoured association with Britain. It settled the question of <b>independence</b>.' }),

  makeMCQ({ id:'g9sms-sb-003', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:1,
    question:'On what date did Mauritius become <b>independent</b>?',
    options:['12 March 1968','12 March 1992','1 February 1835','9 September 1968'],
    answer:'12 March 1968',
    hint:'It is the date celebrated as National Day.',
    explanation:'Mauritius became independent on <b>12 March 1968</b>, with Sir Seewoosagur Ramgoolam as the first Prime Minister. 1 February 1835 is the abolition of slavery.' }),

  makeMCQ({ id:'g9sms-sb-004', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:2,
    question:'What changed when Mauritius became a <b>republic</b> in 1992?',
    options:['A President replaced the Queen as head of state','The island gained independence from Britain','The country joined the United Nations','Slavery was abolished on the island'],
    answer:'A President replaced the Queen as head of state',
    hint:'Independence and republic are two different steps, 24 years apart.',
    explanation:'On <b>12 March 1992</b> Mauritius became a republic and a <b>President</b> replaced the British monarch as head of state. Independence had already come in 1968.' }),

  // ── Living Conditions, 1940s–1960s (w2) ─────────────────────────────────

  makeMCQ({ id:'g9sms-sb-005', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:2,
    question:'Which disease was a major killer in Mauritius before the 1950s eradication campaign?',
    options:['Malaria','Cholera only','Influenza only','Measles only'], answer:'Malaria',
    hint:'It is spread by mosquitoes breeding in standing water.',
    explanation:'<b>Malaria</b> killed thousands each year until a campaign of spraying and drainage eradicated it in the 1950s. Its removal is one reason life expectancy rose so sharply.' }),

  makeMCQ({ id:'g9sms-sb-006', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:2,
    question:'What were most workers\' houses on the sugar estates built from in the 1940s?',
    options:['Straw, wood and corrugated iron','Reinforced concrete and glass panels','Cut stone with imported marble floors','Steel frames with insulated cladding'],
    answer:'Straw, wood and corrugated iron',
    hint:'These were cheap materials, and very vulnerable to cyclones.',
    explanation:'Estate housing was built of <b>straw, wood and corrugated iron</b>, which cyclones destroyed easily. Concrete housing spread only after the cyclones of the 1960s.' }),

  makeMCQ({ id:'g9sms-sb-007', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:3,
    question:'Before free secondary education, what mainly decided whether a child continued to secondary school?',
    options:['Whether the family could pay the fees','The child\'s district of birth','The child\'s age in years','The size of the school building'],
    answer:'Whether the family could pay the fees',
    hint:'Secondary schooling was not free at the time.',
    explanation:'Secondary education was <b>fee-paying</b>, so ability to pay decided who continued. Free secondary education from 1977 opened it to all.' }),

  makeMCQ({ id:'g9sms-sb-008', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:3,
    question:'What were students demanding in the movement of <b>20 May 1975</b>?',
    options:['Free and accessible secondary education','A change of national flag','A new international airport','Lower prices for imported cars'],
    answer:'Free and accessible secondary education',
    hint:'The demand was about who could get into secondary school.',
    explanation:'The student movement of <b>20 May 1975</b> demanded access to secondary education. Free secondary education followed in 1977.' }),

  // ── The Economy at Independence & Its Obstacles (w2) ────────────────────

  makeMCQ({ id:'g9sms-sb-009', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
    question:'At independence, the Mauritian economy depended almost entirely on which crop?',
    options:['Sugar cane','Tea grown on the plateau','Coffee grown for export','Cotton woven for export'], answer:'Sugar cane',
    hint:'It covered most of the cultivated land on the island.',
    explanation:'<b>Sugar cane</b> dominated exports and employment - a monocrop economy, which is exactly what made the country vulnerable to one bad price or one cyclone.' }),

  makeMCQ({ id:'g9sms-sb-010', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:3,
    question:'Which was a major <b>obstacle</b> to development in Mauritius in the 1960s?',
    options:['Rapid population growth with few jobs','A shortage of arable land for sugar','The absence of any port facilities','A complete lack of schools'],
    answer:'Rapid population growth with few jobs',
    hint:'Think about the number of young people entering the workforce.',
    explanation:'The population had grown quickly after malaria was eradicated, so many young people entered a job market that only sugar supplied - producing high <b>unemployment</b>.' }),

  makeMCQ({ id:'g9sms-sb-011', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:3,
    question:'What did economists such as James Meade predict for Mauritius in the early 1960s?',
    options:['That population growth would outstrip the economy','That Mauritius would soon be the richest country in Africa','That sugar prices would rise every year','That the island would run out of drinking water'],
    answer:'That population growth would outstrip the economy',
    hint:'The prediction was gloomy, and it turned out to be wrong.',
    explanation:'The <b>Meade Report</b> (1961) warned that rapid population growth on a one-crop island would bring unemployment and unrest. The later success is called a "miracle" precisely because that forecast failed.' }),

  makeMCQ({ id:'g9sms-sb-012', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:3,
    question:'Which early measure helped Mauritius respond to the problems predicted in the 1960s?',
    options:['A family planning programme','A ban on all imports','The closing of the sugar estates','An end to primary schooling'],
    answer:'A family planning programme',
    hint:'The prediction was about population; the response addressed it directly.',
    explanation:'A <b>family planning</b> programme slowed population growth sharply, which together with diversifying the economy defused the crisis Meade had forecast.' }),

  // ── Industrialisation: ISI, the EPZ & the Mauritian Miracle (w4) ────────

  makeMCQ({ id:'g9sms-sb-013', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:3,
    question:'What is the aim of <b>import substitution industrialisation</b>?',
    options:['To make locally goods that were once imported','To export all local production abroad','To stop all industry and return to farming','To import as many goods as possible'],
    answer:'To make locally goods that were once imported',
    hint:'The name says it: something is substituted for imports.',
    explanation:'<b>ISI</b> means producing at home the goods a country used to buy abroad, protected by tariffs. Mauritius tried it in the 1960s, but the home market proved too small.' }),

  makeMCQ({ id:'g9sms-sb-014', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:3,
    question:'What did the <b>Export Processing Zone</b> offer investors from 1970?',
    options:['Tax concessions and duty-free imports of raw materials','Free electricity and water for the first twenty years','Free land anywhere on the island for any new factory','A guaranteed minimum export price for sugar producers'],
    answer:'Tax concessions and duty-free imports of raw materials',
    hint:'The incentives were fiscal - they lowered the cost of producing for export.',
    explanation:'The EPZ Act of <b>1970</b> offered tax holidays and duty-free import of raw materials for firms producing for <b>export</b>, which drew in textile and clothing manufacturers.' }),

  makeMCQ({ id:'g9sms-sb-015', chapterId:'g9sms-industrialisation', subsection:'sectors_over_time', difficulty:3,
    question:'Which sequence shows how the Mauritian economy diversified?',
    options:['Sugar, then textiles, then tourism and services','Services, then sugar, then subsistence agriculture','Tourism, then sugar cane, then mineral mining','Mining, then deep-sea fishing, then sugar cane'],
    answer:'Sugar, then textiles, then tourism and services',
    hint:'Start with the monocrop and follow the pillars added after it.',
    explanation:'Mauritius moved from <b>sugar</b> alone to <b>textiles</b> through the EPZ, then to <b>tourism</b> and financial <b>services</b> - the successive pillars of the economy.' }),

  makeMCQ({ id:'g9sms-sb-016', chapterId:'g9sms-industrialisation', subsection:'mauritian_miracle', difficulty:3,
    question:'Why is Mauritian development after 1970 often called a <b>miracle</b>?',
    options:['The country prospered despite gloomy predictions','No other country has ever grown quickly','The island discovered valuable minerals','Growth happened without any government policy'],
    answer:'The country prospered despite gloomy predictions',
    hint:'Compare what economists expected in 1961 with what actually happened.',
    explanation:'The term contrasts the <b>pessimistic forecasts</b> of the 1960s with real diversification and rising incomes. It was the result of deliberate policy, not luck.' }),

  // ── Impacts of Industrialisation on Society (w2) ────────────────────────

  makeMCQ({ id:'g9sms-sb-017', chapterId:'g9sms-industrial-impact', subsection:'work_and_jobs', difficulty:3,
    question:'Which social change followed the growth of the EPZ?',
    options:['Large numbers of women entered paid employment','Every sugar estate on the island closed at once','The total population of the island fell sharply','Secondary schools were closed to reduce spending'],
    answer:'Large numbers of women entered paid employment',
    hint:'Think about who was recruited into the new textile factories.',
    explanation:'EPZ factories recruited heavily among <b>women</b>, which brought many into paid work for the first time and changed household incomes and family roles.' }),

  makeMCQ({ id:'g9sms-sb-018', chapterId:'g9sms-industrial-impact', subsection:'life_expectancy', difficulty:2,
    question:'What happened to <b>life expectancy</b> in Mauritius over the second half of the twentieth century?',
    options:['It rose considerably','It fell considerably','It stayed exactly the same','It rose only for men'],
    answer:'It rose considerably',
    hint:'Malaria was eradicated and health services expanded.',
    explanation:'Life expectancy <b>rose</b> markedly as malaria was eradicated, health care spread and incomes improved - which is also why the population is now ageing.' }),

  makeMCQ({ id:'g9sms-sb-019', chapterId:'g9sms-industrial-impact', subsection:'environment_impact', difficulty:3,
    question:'Which environmental problem is linked to rapid industrialisation and building?',
    options:['Loss of agricultural land and more waste','An increase in native forest cover','A fall in the amount of household waste','Cooler average temperatures'],
    answer:'Loss of agricultural land and more waste',
    hint:'Factories and housing have to be built somewhere.',
    explanation:'Industry and housing consumed <b>agricultural land</b> and generated more industrial and household <b>waste</b>, adding pressure on a small island\'s limited space.' }),

  // ── Chagos, Tromelin & Our Territory (w2) ───────────────────────────────

  makeMCQ({ id:'g9sms-sb-020', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:3,
    question:'In which year was the Chagos Archipelago detached from Mauritius by Britain?',
    options:['1965','1968','1992','1810'], answer:'1965',
    hint:'It happened three years BEFORE independence.',
    explanation:'Britain detached the Chagos in <b>1965</b>, before independence in 1968, to create the British Indian Ocean Territory. Mauritius has never accepted the detachment.' }),

  makeMCQ({ id:'g9sms-sb-021', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:3,
    question:'What did the International Court of Justice advise in <b>2019</b> about the Chagos?',
    options:['That Britain should end its administration of the islands','That sovereignty over the islands belongs to the United States','That the court had no power to examine the question at all','That the former inhabitants should never be allowed to return'],
    answer:'That Britain should end its administration of the islands',
    hint:'The opinion went in favour of Mauritius.',
    explanation:'In its 2019 advisory opinion the ICJ found the detachment unlawful and said the United Kingdom should <b>end its administration</b> of the Chagos as rapidly as possible.' }),

  makeMCQ({ id:'g9sms-sb-022', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
    question:'What was built on <b>Diego Garcia</b>, the largest island of the Chagos?',
    options:['A military base','A sugar refinery','An international university','A national park'],
    answer:'A military base',
    hint:'It is why the population was removed.',
    explanation:'A United States <b>military base</b> was built on Diego Garcia, and the Chagossians were removed from the archipelago between 1967 and 1973 to make way for it.' }),

  makeMCQ({ id:'g9sms-sb-023', chapterId:'g9sms-chagos-tromelin', subsection:'tromelin', difficulty:3,
    question:'Which country administers <b>Tromelin</b>, an island also claimed by Mauritius?',
    options:['France','The United Kingdom','India','South Africa'], answer:'France',
    hint:'The same country that ruled Mauritius before the British.',
    explanation:'<b>France</b> administers Tromelin, while Mauritius maintains its claim. The two states have discussed joint management of the island.' }),

  // ── Map, Table & Graph Skills (w2) ──────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-024', chapterId:'g9sms-map-data-skills', subsection:'map_key_and_scale', difficulty:2,
    question:'On a map with a scale of 1 : 50 000, what does 1 cm represent?',
    options:['500 m','50 m','5 km','50 km'], answer:'500 m',
    hint:'1 cm on the map is 50 000 cm on the ground. Convert to metres.',
    explanation:'50 000 cm = 500 m, so 1 cm represents <b>500 m</b>. Dividing by 100 converts centimetres to metres.' }),

  makeMCQ({ id:'g9sms-sb-025', chapterId:'g9sms-map-data-skills', subsection:'map_shading', difficulty:3,
    question:'On a choropleth map, what does a <b>darker shade</b> usually mean?',
    options:['A higher value in that area','A lower value in that area','A measurement that is missing','An area that is protected by law'],
    answer:'A higher value in that area',
    hint:'Shading is ordered from light to dark; check the key.',
    explanation:'Darker shading conventionally shows a <b>higher</b> value - denser population, higher rainfall. The key always states the exact ranges.' }),

  makeMCQ({ id:'g9sms-sb-026', chapterId:'g9sms-map-data-skills', subsection:'table_reading', difficulty:2,
    question:'A table shows population by district for 2000 and 2020. How do you find the <b>increase</b> for one district?',
    options:['Subtract the 2000 figure from the 2020 figure','Add the 2000 figure to the 2020 figure','Divide the 2020 figure by the 2000 figure','Multiply the 2000 figure by the 2020 figure'],
    answer:'Subtract the 2000 figure from the 2020 figure',
    hint:'An increase is a difference between two values.',
    explanation:'The increase is <b>later minus earlier</b>. Adding the two would give a meaningless total of two separate counts.' }),

  makeMCQ({ id:'g9sms-sb-027', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:2,
    question:'Which graph is best for showing how a value <b>changes over time</b>?',
    options:['A line graph','A pie chart','A pictogram of one year','A single bar'],
    answer:'A line graph',
    hint:'You need to see a trend across many years.',
    explanation:'A <b>line graph</b> plots values against time and makes a trend visible. A pie chart shows proportions at one moment only.' }),

  makeMCQ({ id:'g9sms-sb-028', chapterId:'g9sms-map-data-skills', subsection:'pyramid_construction', difficulty:3,
    question:'On a population pyramid, what is shown on the two sides?',
    options:['Males on one side and females on the other','Rich on one side and poor on the other','Towns on one side and villages on the other','Births on one side and deaths on the other'],
    answer:'Males on one side and females on the other',
    hint:'The bars are grouped by age band, and split into two.',
    explanation:'A population pyramid puts <b>males</b> on one side and <b>females</b> on the other, stacked in age bands, so structure and sex balance can be read together.' }),

  // ── Population Studies (w4) ─────────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-029', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:2,
    question:'What does <b>population density</b> measure?',
    options:['The number of people per square kilometre','The total population of a country','The number of births each year','The area of a country in square kilometres'],
    answer:'The number of people per square kilometre',
    hint:'It relates people to the space they occupy.',
    explanation:'Density is <b>population divided by area</b>, giving people per km². Mauritius has one of the higher densities in Africa because a large population lives on a small island.' }),

  makeMCQ({ id:'g9sms-sb-030', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:3,
    question:'A population pyramid with a <b>narrow base</b> and a wide middle suggests:',
    options:['Fewer births and an ageing population','A very high birth rate in recent years','A sudden rise in deaths among children','A population made up mostly of children'],
    answer:'Fewer births and an ageing population',
    hint:'The base shows the youngest age group.',
    explanation:'A narrow base means <b>fewer young children</b>, so births have fallen; the bulge higher up will age. This is the shape Mauritius now has.' }),

  makeMCQ({ id:'g9sms-sb-031', chapterId:'g9sms-population', subsection:'birth_death_rates', difficulty:3,
    question:'How is the <b>natural increase</b> of a population calculated?',
    options:['Birth rate minus death rate','Birth rate plus death rate','Births plus people arriving','Deaths minus people leaving'],
    answer:'Birth rate minus death rate',
    hint:'"Natural" excludes people moving in or out.',
    explanation:'Natural increase is <b>birth rate minus death rate</b>. Migration is deliberately excluded, which is what makes the change "natural".' }),

  makeMCQ({ id:'g9sms-sb-032', chapterId:'g9sms-population', subsection:'life_expectancy', difficulty:2,
    question:'What does <b>life expectancy</b> mean?',
    options:['The average number of years a person is expected to live','The age at which every worker is required to retire','The number of people currently alive in a country','The greatest age any person has ever reached'],
    answer:'The average number of years a person is expected to live',
    hint:'It is an average, not a maximum.',
    explanation:'Life expectancy is the <b>average</b> lifespan expected for people born in a given year. It is a summary of health conditions, not a limit on any individual.' }),

  makeMCQ({ id:'g9sms-sb-033', chapterId:'g9sms-population', subsection:'ageing', difficulty:3,
    question:'What is one consequence of an <b>ageing population</b> for Mauritius?',
    options:['Greater spending on pensions and health care','A sudden fall in life expectancy','A rapid rise in the number of school places needed','An immediate end to migration'],
    answer:'Greater spending on pensions and health care',
    hint:'Think about which public services older people use most.',
    explanation:'More older people means higher spending on <b>pensions and health care</b>, funded by a proportionally smaller working population. Demand for school places falls rather than rises.' }),

  // ── Migration (w2) ──────────────────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-034', chapterId:'g9sms-migration', subsection:'internal_international', difficulty:2,
    question:'Which is an example of <b>internal</b> migration?',
    options:['Moving from Rodrigues to Port Louis','Moving from Mauritius to France','Moving from India to Mauritius','Moving from Mauritius to Australia'],
    answer:'Moving from Rodrigues to Port Louis',
    hint:'Internal migration stays inside one country\'s borders.',
    explanation:'Rodrigues and Port Louis are both part of the Republic of Mauritius, so that move is <b>internal</b>. The others cross international borders.' }),

  makeMCQ({ id:'g9sms-sb-035', chapterId:'g9sms-migration', subsection:'push_pull', difficulty:3,
    question:'Which is a <b>push</b> factor in migration?',
    options:['Unemployment in the home area','Better schools in the destination','Higher wages in the destination','A warmer climate in the destination'],
    answer:'Unemployment in the home area',
    hint:'A push factor drives people away; a pull factor draws them in.',
    explanation:'<b>Unemployment at home</b> pushes people to leave. Better schools, higher wages and climate are all pull factors of the destination.' }),

  makeMCQ({ id:'g9sms-sb-036', chapterId:'g9sms-migration', subsection:'refugees_displacement', difficulty:3,
    question:'What distinguishes a <b>refugee</b> from an ordinary migrant?',
    options:['A refugee is forced to flee danger','A refugee always travels by sea','A refugee moves only within one country','A refugee moves for a better-paid job'],
    answer:'A refugee is forced to flee danger',
    hint:'The key difference is choice.',
    explanation:'A refugee is <b>forced</b> to leave by war, persecution or disaster, and is protected in international law. An economic migrant chooses to move for work.' }),

  // ── Rodrigues, Agalega & the Outer Islands (w2) ─────────────────────────

  makeMCQ({ id:'g9sms-sb-037', chapterId:'g9sms-outer-islands', subsection:'rodrigues', difficulty:2,
    question:'What is the status of <b>Rodrigues</b> within the Republic of Mauritius?',
    options:['It is an autonomous region with its own assembly','It is a separate and fully independent country','It is a territory administered today by France','It is an island that has no permanent residents'],
    answer:'It is an autonomous region with its own assembly',
    hint:'It gained a measure of self-government in 2002.',
    explanation:'Rodrigues has been an <b>autonomous region</b> since 2002, with its own Regional Assembly and Chief Commissioner, while remaining part of the Republic.' }),

  makeMCQ({ id:'g9sms-sb-038', chapterId:'g9sms-outer-islands', subsection:'agalega', difficulty:2,
    question:'What is <b>Agalega</b>?',
    options:['Two small islands north of Mauritius','A mountain in the centre of Mauritius','A district of Port Louis','A river in Rodrigues'],
    answer:'Two small islands north of Mauritius',
    hint:'The name covers a pair of islands, North and South.',
    explanation:'Agalega is made up of <b>two islands</b>, North and South, lying far to the north of Mauritius and part of the Republic. Coconut production is the traditional activity.' }),

  makeMCQ({ id:'g9sms-sb-039', chapterId:'g9sms-outer-islands', subsection:'services_and_access', difficulty:3,
    question:'What is the main difficulty facing people living on the outer islands?',
    options:['Limited access to services because of distance','Too many hospitals for the population','An oversupply of secondary schools','Excessive numbers of daily flights'],
    answer:'Limited access to services because of distance',
    hint:'Think about how far they are from the main island.',
    explanation:'Remoteness limits access to <b>health care, secondary education and supplies</b>, since everything depends on infrequent boats or flights.' }),

  // ── Natural Hazards & the Environment (w1) ──────────────────────────────

  makeMCQ({ id:'g9sms-sb-040', chapterId:'g9sms-hazards-environment', subsection:'cyclones', difficulty:2,
    question:'During which months is Mauritius most at risk from <b>cyclones</b>?',
    options:['November to April','May to August','June to September','July to October'],
    answer:'November to April',
    hint:'It is the warm, wet half of the year in the southern hemisphere.',
    explanation:'The cyclone season runs roughly from <b>November to April</b>, when sea temperatures are highest. Warnings run from Class I to Class IV.' }),

  makeMCQ({ id:'g9sms-sb-041', chapterId:'g9sms-hazards-environment', subsection:'climate_change', difficulty:3,
    question:'Why is a small island state such as Mauritius especially vulnerable to <b>climate change</b>?',
    options:['Rising seas and stronger storms threaten its coasts','The island has no coastline that needs protecting','The island lies a long way from any ocean at all','The whole population lives well inland, away from the sea'],
    answer:'Rising seas and stronger storms threaten its coasts',
    hint:'Consider where most people, hotels and roads are located.',
    explanation:'Most settlement, tourism and infrastructure sit near the coast, so <b>sea-level rise, beach erosion and more intense cyclones</b> hit hardest. Coral bleaching also weakens the reef that shelters the shore.' }),

  makeMCQ({ id:'g9sms-sb-042', chapterId:'g9sms-hazards-environment', subsection:'environmental_damage', difficulty:2,
    question:'Which activity most directly damages Mauritius\'s <b>coral reefs</b>?',
    options:['Pollution and sediment running off the land','Planting more trees across the central plateau','Reducing the use of single-use plastic bags','Building additional schools well inland'],
    answer:'Pollution and sediment running off the land',
    hint:'Corals need clean, clear water to survive.',
    explanation:'Runoff carrying <b>sediment and pollution</b> smothers coral and blocks the light it needs. The reef matters because it also protects the coast from waves.' }),

  // ── Government, Citizenship & the Welfare State (w3) ────────────────────

  makeMCQ({ id:'g9sms-sb-043', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:2,
    question:'At what age can a Mauritian citizen <b>vote</b>?',
    options:['18','16','21','25'], answer:'18',
    hint:'It is the same age as legal adulthood.',
    explanation:'Citizens may vote from the age of <b>18</b>. The head of state is the President, and the head of government is the Prime Minister.' }),

  makeMCQ({ id:'g9sms-sb-044', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:3,
    question:'What is the <b>Constitution</b> of Mauritius?',
    options:['The supreme law setting out how the country is governed','A published list of the country exports for the year','A treaty signed with the neighbouring island states','The annual spending plan approved by the government'],
    answer:'The supreme law setting out how the country is governed',
    hint:'Every other law must agree with it.',
    explanation:'The Constitution is the <b>supreme law</b>: it defines the institutions, the separation of powers and fundamental rights, and no ordinary law may contradict it.' }),

  makeMCQ({ id:'g9sms-sb-045', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:2,
    question:'What is the role of the <b>Mauritius Revenue Authority</b>?',
    options:['To collect taxes on behalf of the state','To build roads and bridges','To run the public hospitals','To set the school curriculum'],
    answer:'To collect taxes on behalf of the state',
    hint:'The clue is in the word "revenue".',
    explanation:'The MRA <b>collects taxes and duties</b>, which fund public services. Building roads and running hospitals are the work of other ministries.' }),

  makeMCQ({ id:'g9sms-sb-046', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
    question:'Which is an example of the Mauritian <b>welfare state</b>?',
    options:['Free education and free health care','Compulsory private health insurance','A fee charged for every hospital visit','Paid entry to every state primary school'],
    answer:'Free education and free health care',
    hint:'Welfare measures are services provided to all without direct charge.',
    explanation:'Mauritius provides <b>free education</b> and <b>free public health care</b>, along with the universal old age pension - the core of its welfare state.' }),

  makeMCQ({ id:'g9sms-sb-047', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:3,
    question:'What does it mean to say every citizen is <b>equal before the law</b>?',
    options:['The same law applies to everyone, whatever their position','Everyone in the country earns exactly the same wage','Everyone is expected to hold the same political opinions','Everyone pays exactly the same amount of tax each year'],
    answer:'The same law applies to everyone, whatever their position',
    hint:'It is about how the law treats people, not about income.',
    explanation:'Equality before the law means the law applies <b>equally to all</b> regardless of wealth, origin or office. It says nothing about wages or taxes, which vary.' }),

  // ── Media & Communication (w3) ──────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-048', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:1,
    question:'Which of these is an example of <b>print media</b>?',
    options:['A newspaper','A radio bulletin','A television news programme','A podcast episode'],
    answer:'A newspaper',
    hint:'Print media is read on paper.',
    explanation:'A <b>newspaper</b> is print media. Radio and television are broadcast media, and a podcast is digital.' }),

  makeMCQ({ id:'g9sms-sb-049', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:2,
    question:'Which is a main <b>role</b> of the media in a democracy?',
    options:['To inform citizens and hold power to account','To decide which party wins a general election','To draft and pass the laws of the country','To collect the taxes owed by every citizen'],
    answer:'To inform citizens and hold power to account',
    hint:'Think about why a free press matters to voters.',
    explanation:'The media <b>informs</b> citizens and scrutinises those in power, which is what lets voters judge them. Legislating and taxing belong to Parliament and the state.' }),

  makeMCQ({ id:'g9sms-sb-050', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
    question:'How can media most usefully support <b>learning</b>?',
    options:['By giving access to documentaries and reliable information','By replacing classroom teachers with recorded lessons','By making it possible to shorten the school year','By removing the need to read books altogether'],
    answer:'By giving access to documentaries and reliable information',
    hint:'Media adds to teaching; it does not replace it.',
    explanation:'Media gives access to <b>documentaries, archives and reliable information</b> beyond the textbook. It supplements teaching rather than replacing it.' }),

  makeMCQ({ id:'g9sms-sb-051', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:3,
    question:'What is one negative effect of heavy media and screen use on lifestyle?',
    options:['Less physical activity and poorer sleep','Improved eyesight over time','Increased time spent outdoors','Greater physical fitness'],
    answer:'Less physical activity and poorer sleep',
    hint:'Think about what long hours in front of a screen displace.',
    explanation:'Heavy screen use is linked to <b>less exercise and disturbed sleep</b>, because it takes time from physical activity and rest.' }),

  // ── Family & Social Roles (w3) ──────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-052', chapterId:'g9sms-family', subsection:'family_types', difficulty:2,
    question:'What is an <b>extended family</b>?',
    options:['Parents, children and other relatives living together','Parents and their own children living on their own','One person living alone in a household','Two unrelated friends sharing a rented house'],
    answer:'Parents, children and other relatives living together',
    hint:'It extends beyond the parents and their children.',
    explanation:'An <b>extended family</b> includes grandparents, uncles, aunts or cousins in the household. Parents with children alone form a nuclear family.' }),

  makeMCQ({ id:'g9sms-sb-053', chapterId:'g9sms-family', subsection:'family_functions', difficulty:2,
    question:'Which is a basic <b>function of the family</b>?',
    options:['Socialising children into the values of society','Setting the interest rates charged by the banks','Issuing passports and identity cards to citizens','Running the public transport network of the country'],
    answer:'Socialising children into the values of society',
    hint:'Think about what children first learn at home.',
    explanation:'The family <b>socialises</b> children - teaching language, norms and values - as well as providing care and economic support. The other functions belong to the state.' }),

  makeMCQ({ id:'g9sms-sb-054', chapterId:'g9sms-family', subsection:'gender_roles', difficulty:3,
    question:'What is meant by a <b>gender role</b>?',
    options:['Behaviour a society expects of men or of women','The biological sex a person is assigned at birth','The number of children born into one family','The legal age at which a person may marry'],
    answer:'Behaviour a society expects of men or of women',
    hint:'It is learned from society, not fixed by biology.',
    explanation:'A gender role is the set of behaviours a society <b>expects</b> of men or women. Because it is learned, it changes over time and between societies.' }),

  makeMCQ({ id:'g9sms-sb-055', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:3,
    question:'Which change most increased women\'s participation in paid work in Mauritius?',
    options:['The growth of the Export Processing Zone','The closure of all textile factories','The end of free education','A fall in life expectancy'],
    answer:'The growth of the Export Processing Zone',
    hint:'The EPZ factories recruited a largely female workforce.',
    explanation:'The <b>EPZ</b> drew large numbers of women into factory employment from the 1970s, raising household incomes and shifting family roles.' }),

  // ── Social Change & Collective Behaviour (w2) ───────────────────────────

  makeMCQ({ id:'g9sms-sb-056', chapterId:'g9sms-social-change', subsection:'forces_of_change', difficulty:3,
    question:'Which is a major <b>force of social change</b>?',
    options:['New technology','A fixed population','Unchanging traditions','An absence of education'],
    answer:'New technology',
    hint:'Which of these makes a society different from how it was?',
    explanation:'<b>Technology</b> changes how people work, communicate and live, and so drives social change. The other options describe stability, not change.' }),

  makeMCQ({ id:'g9sms-sb-057', chapterId:'g9sms-social-change', subsection:'social_movements', difficulty:3,
    question:'What is a <b>social movement</b>?',
    options:['An organised group acting together for change','A single person quietly changing their own mind','A family moving from one house to another one','A department of the national government'],
    answer:'An organised group acting together for change',
    hint:'It is collective and it has a goal.',
    explanation:'A social movement is an <b>organised collective effort</b> to bring about or resist change - an environmental campaign, or the 1975 student movement.' }),

  makeMCQ({ id:'g9sms-sb-058', chapterId:'g9sms-social-change', subsection:'deviance_and_norms', difficulty:3,
    question:'What is meant by <b>deviance</b> in sociology?',
    options:['Behaviour that breaks a society\'s norms','Behaviour that follows the law exactly','Any behaviour by young people','Any behaviour that is unusual but polite'],
    answer:'Behaviour that breaks a society\'s norms',
    hint:'Norms are the unwritten rules of a society.',
    explanation:'Deviance is behaviour that <b>departs from accepted norms</b>. What counts as deviant varies between societies and changes over time.' }),

  makeMCQ({ id:'g9sms-sb-059', chapterId:'g9sms-social-change', subsection:'social_mobility', difficulty:3,
    question:'What is <b>social mobility</b>?',
    options:['Movement between social positions or classes','Movement from one town to another','The speed of public transport','The number of cars per household'],
    answer:'Movement between social positions or classes',
    hint:'It concerns position in society, not position on a map.',
    explanation:'Social mobility is movement <b>up or down the social scale</b>, often through education or employment. Moving house is geographical mobility instead.' }),

  // ── Mauritius and the World (w4) ────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-060', chapterId:'g9sms-links', subsection:'origins_of_our_people', difficulty:2,
    question:'Why is the population of Mauritius so diverse in origin?',
    options:['People came through slavery, indenture, trade and settlement','The island already had a large indigenous population','Only one European country ever settled on the island','Migration to the island has always been strictly banned'],
    answer:'People came through slavery, indenture, trade and settlement',
    hint:'Mauritius had no indigenous human population before settlement.',
    explanation:'Mauritius was <b>uninhabited</b> before European settlement. Its people descend from enslaved Africans and Malagasy, Indian indentured labourers, Chinese traders and European settlers.' }),

  makeMCQ({ id:'g9sms-sb-061', chapterId:'g9sms-links', subsection:'links_india_africa', difficulty:3,
    question:'Which system brought large numbers of workers from India to Mauritius after 1834?',
    options:['Indentured labour','Voluntary tourism','Military conscription','Student exchange'],
    answer:'Indentured labour',
    hint:'Workers came under a contract to work on the sugar estates.',
    explanation:'<b>Indentured labour</b> brought around half a million workers from India after the abolition of slavery. Aapravasi Ghat, where they landed, is a UNESCO World Heritage Site.' }),

  makeMCQ({ id:'g9sms-sb-062', chapterId:'g9sms-links', subsection:'links_europe_france', difficulty:2,
    question:'Which lasting link with <b>France</b> can still be seen in Mauritius today?',
    options:['The widespread use of French and the Napoleonic Code','French control over the island government and its courts','Compulsory French citizenship for every person born here','The use of the euro as the official currency of the island'],
    answer:'The widespread use of French and the Napoleonic Code',
    hint:'Think about language and the legal system.',
    explanation:'French is widely spoken and much of the civil law derives from the <b>Napoleonic Code</b>, retained after the British takeover in 1810. Mauritius is fully independent and uses the rupee.' }),

  makeMCQ({ id:'g9sms-sb-063', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:3,
    question:'Which regional organisation does Mauritius belong to?',
    options:['The Southern African Development Community','The Organization of American States','The European Union of member states','The League of Arab States in the Gulf'],
    answer:'The Southern African Development Community',
    hint:'It groups countries of southern Africa.',
    explanation:'Mauritius is a member of <b>SADC</b>, and also of COMESA, the African Union and the Indian Ocean Commission. It is not in the European Union.' }),

  makeMCQ({ id:'g9sms-sb-064', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:3,
    question:'What is a benefit of belonging to a regional organisation?',
    options:['Easier trade and a stronger voice in negotiations','The complete loss of national independence','An automatic rise in the size of the population','A guarantee of protection against every cyclone'],
    answer:'Easier trade and a stronger voice in negotiations',
    hint:'Small states gain from acting together.',
    explanation:'Membership brings <b>preferential trade access</b> and lets a small state negotiate with more weight, alongside cooperation on security and the environment.' }),

  // ── Economy & Work Today (w1) ───────────────────────────────────────────

  makeMCQ({ id:'g9sms-sb-065', chapterId:'g9sms-economy-today', subsection:'sectors', difficulty:2,
    question:'In which economic sector does <b>tourism</b> belong?',
    options:['The tertiary sector','The primary sector','The secondary sector','The quaternary sector'],
    answer:'The tertiary sector',
    hint:'Tourism sells a service rather than a product.',
    explanation:'Tourism provides a <b>service</b>, so it is tertiary. Growing sugar is primary and manufacturing textiles is secondary.' }),

  makeMCQ({ id:'g9sms-sb-066', chapterId:'g9sms-economy-today', subsection:'factors_of_production', difficulty:3,
    question:'Which list gives the <b>factors of production</b>?',
    options:['Land, labour, capital and enterprise','Imports, exports, taxes and wages','Sugar, textiles, tourism and finance','Roads, ports, airports and schools'],
    answer:'Land, labour, capital and enterprise',
    hint:'These are the four resources every business needs to produce anything.',
    explanation:'The four factors are <b>land, labour, capital and enterprise</b>. The other lists name sectors, infrastructure or flows of money, not productive resources.' }),

  makeMCQ({ id:'g9sms-sb-067', chapterId:'g9sms-economy-today', subsection:'siting_a_factory', difficulty:3,
    question:'Which factor most influences where a factory is <b>sited</b>?',
    options:['Access to transport and a labour supply','The colour of the surrounding buildings','The name of the nearest village','The age of the oldest local resident'],
    answer:'Access to transport and a labour supply',
    hint:'Think about how raw materials arrive, goods leave, and workers get there.',
    explanation:'Siting depends on practical needs: <b>transport links</b> for materials and products, and a <b>workforce</b> within reach, along with power, water and land.' })
);
