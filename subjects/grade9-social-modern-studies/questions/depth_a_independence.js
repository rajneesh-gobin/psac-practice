'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH A
//  Chapters: g9sms-colonial-independence · g9sms-living-conditions ·
//            g9sms-economy-1960s
//  IDs: g9sms-dpa-001 … g9sms-dpa-164. Block chosen because no id in this
//  pack begins g9sms-dpa- (checked 2026-09-19); six other batches are
//  writing other chapters of this same pack and the importer keys on id.
//
//  ⚠ WHY THIS FILE EXISTS. Measured 2026-09-19 from source: these three
//    chapters held 76 items between them, one of which was at difficulty 4.
//    getQuestionsForChapter() never generates an L4, so a chapter's static
//    L4 stock IS the ceiling — choosing Challenge fell straight through to
//    the mixed-practice fallback. Every subsection is also brought to the
//    20-item floor that audit-content-coverage.js measures.
//
//  ⚠ L4 HERE IS THE APPLIED BAND, NOT HARDER RECALL. Every L4 below gives a
//    situation to reason about: a decision with a consequence, a claim to
//    judge, a cause to trace. A question answerable by recognising a
//    definition is L1/L2 however hard its wording sounds — a previous audit
//    found L3/L4 labels sitting on plain retrieval and 34 items had to be
//    relabelled.
//
//  ⚠ NO INVENTED FIGURES. Every date and quantity below either already
//    appears in this pack's existing questions or in the manifest syllabus
//    prose, or is a settled fact of Mauritian history. Causes, consequences
//    and comparisons are preferred to precise numbers throughout.
//
//  ⚠ OPTIONS ARE KEPT THE SAME SHAPE AND LENGTH. An applied answer wants to
//    be the long careful one; that is the leak test-option-parity.js
//    measures. Lengthen a distractor, never trim the answer.
//
//  Source: NCF/TLS Grades 7-9 (MIE); docs/nce-grade9/blueprint-social-modern-studies.md.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ═══════════════════════════════════════════════════════════════════════════
//  CHAPTER 1 — g9sms-colonial-independence
// ═══════════════════════════════════════════════════════════════════════════

// ── colonial_period — 6 items (L1 1 · L2 1 · L3 1 · L4 3) ──────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-001', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:1,
  question:'The Dutch settlers cut down large areas of the island\'s lowland forest and shipped one valuable dark hardwood back to Europe. Name that timber.',
  answer:'ebony', alsoAccept:['Ebony','ebony wood','black ebony','ebene','ébène'],
  hint:'A very dark, very heavy wood that the lowland forests were once full of.',
  explanation:'The Dutch exported <b>ebony</b>, a dense black hardwood, and cleared much of the lowland forest to reach it. Pupils often answer sugar cane: the Dutch did bring cane to the island, but it was the timber, not the sugar, that they shipped away for profit.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-002', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:2,
  question:'During the French period the island\'s port, dockyard and administration were greatly developed. Which governor is remembered for that work?',
  options:['Mahé de Labourdonnais, who made Port Louis the island\'s main harbour',
           'Robert Farquhar, who governed the island for Britain after its capture',
           'Prince Maurice of Nassau, after whom the Dutch first named the island',
           'Sir Seewoosagur Ramgoolam, who led the island to independence in 1968'],
  answer:'Mahé de Labourdonnais, who made Port Louis the island\'s main harbour',
  hint:'Look for the name tied to the growth of Port Louis in the 1700s.',
  explanation:'<b>Mahé de Labourdonnais</b>, governor from 1735, built up Port Louis as harbour, dockyard and capital. Robert Farquhar is the tempting answer because he was also a builder, but he was the first British governor, after 1810, not a French one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-003', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:3,
  question:'When Britain took the island in 1810, the French settlers were allowed to keep their language, their religion and their civil law. What best explains that?',
  options:['Britain wanted the settlers to accept the change without further fighting',
           'Britain had no officials at all who were able to read or write in French',
           'The Treaty of Paris of 1814 obliged Britain to adopt the French language',
           'The French settlers outnumbered every British soldier sent to the island'],
  answer:'Britain wanted the settlers to accept the change without further fighting',
  hint:'Think about what a new ruler needs most in the months just after a conquest.',
  explanation:'The terms of surrender protected language, religion and law so that the colony would settle down peacefully and keep producing. The Treaty of Paris confirmed British sovereignty; it placed no obligation on Britain to take up French, so that option reverses what the treaty did.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-004', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:4,
  question:'A pupil writes: <i>"The Dutch abandoned Mauritius in 1710 because the island had nothing worth taking."</i> Which response is best?',
  options:['Wrong — they shipped out ebony, but cyclones, pests and isolation beat them',
           'Right — the island had no timber, no harbour and no soil that grew a crop',
           'Wrong — they left only because the French navy drove their settlers away',
           'Right — the settlers found the island empty and sailed on to the Cape too'],
  answer:'Wrong — they shipped out ebony, but cyclones, pests and isolation beat them',
  hint:'Ask what the Dutch actually shipped home before judging whether it was worthless.',
  explanation:'The Dutch exported ebony and introduced sugar cane and deer, so the island was far from worthless. Their settlements failed because of cyclones, rats, disease and the long distance from supplies. The French arrived in 1715, five years after the Dutch had already gone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-005', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:4,
  question:'In the 1730s the French had to settle on a main port. Grand Port lies on the south-east coast, facing the steady south-east wind; Port Louis lies on the sheltered north-west coast. Which reasoning best supports choosing Port Louis?',
  options:['Sailing ships could leave its harbour instead of beating into the wind',
           'It lay closest to the richest sugar estates planted on the island by then',
           'Its harbour was the only one deep enough anywhere to take a naval vessel',
           'It faced towards Europe, which shortened every voyage home by some weeks'],
  answer:'Sailing ships could leave its harbour instead of beating into the wind',
  hint:'A sailing ship cannot sail straight into the wind. Which coast does that favour?',
  explanation:'Port Louis is on the leeward side, so ships could leave under the trade wind rather than fight it, and the harbour is sheltered from it. Nearness to estates sounds sensible, but the large estates grew up later — the wind, not the fields, decided where ships could reliably sail from.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-006', chapterId:'g9sms-colonial-independence', subsection:'colonial_period', difficulty:4,
  question:'A pupil argues that Britain seized Isle de France in 1810 chiefly to gain more land for growing sugar. Which is the strongest argument against that?',
  options:['French ships based there were raiding Britain\'s trade route to India',
           'British forces had also taken the neighbouring island of Bourbon that year',
           'The island produced no sugar at all until the British planted the first cane',
           'Britain gave the island back to France four years later under a peace treaty'],
  answer:'French ships based there were raiding Britain\'s trade route to India',
  hint:'Ask what the island threatened, not what it produced.',
  explanation:'Isle de France was a base for corsairs attacking British shipping to India, and removing that threat was the strategic aim. Britain kept the island under the Treaty of Paris in 1814 rather than returning it, and cane was already being grown there long before 1810.' }));

// ── parties_1967 — 14 items (L1 2 · L2 4 · L3 3 · L4 5) ────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-007', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:1,
  question:'Which political party, founded in 1936 to defend the interests of workers, later led the campaign for independence?',
  options:['The Mauritius Labour Party','The Parti Mauricien Social Démocrate','The Mouvement Militant Mauricien','The Independent Forward Bloc'],
  answer:'The Mauritius Labour Party',
  hint:'It was founded more than thirty years before the independence election.',
  explanation:'The <b>Mauritius Labour Party</b> was founded in 1936, grew out of the workers\' movement, and led the alliance that won in 1967. The MMM is the tempting answer for later politics, but it was only founded after independence, in 1969.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-008', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:1,
  question:'In which year was the general election held that decided whether Mauritius would seek independence? Give the year only.',
  answer:1967,
  hint:'It was held the year before the constitution changed.',
  explanation:'The general election of <b>1967</b> was fought on the independence question, and the pro-independence alliance won it. Pupils often write 1968: that is the year independence itself came, on 12 March, after the election had settled the argument.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-009', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:2,
  question:'Sookdeo Bissoondoyal led one of the parties inside the pro-independence alliance of 1967. Which party was it?',
  options:['The Independent Forward Bloc','The Parti Mauricien Social Démocrate','The Comité d\'Action Musulman','The Mouvement Militant Mauricien'],
  answer:'The Independent Forward Bloc',
  hint:'It was one of the smaller partners, not the party that led the alliance.',
  explanation:'The <b>Independent Forward Bloc</b> joined the Labour Party and the Comité d\'Action Musulman in the alliance that fought the 1967 election for independence. The PMSD is tempting only because it is the other well-known party of the time — it campaigned on the opposite side.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-010', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:2,
  question:'In the 1967 campaign one side offered <b>association</b> with Britain instead of independence. What would association have meant?',
  options:['Mauritius would govern itself but Britain would keep defence and foreign affairs',
           'Mauritius would have become a county of Britain with seats in its parliament',
           'Mauritius would join a federation with Reunion and the other nearby islands',
           'Mauritius would keep the Queen as head of state but make all its own decisions'],
  answer:'Mauritius would govern itself but Britain would keep defence and foreign affairs',
  hint:'Ask which powers would have stayed in London.',
  explanation:'Association meant internal self-government while Britain retained defence and external affairs, so sovereignty would not have passed to Mauritius. The last option describes what independence actually brought in 1968: the Queen stayed as head of state until 1992, but every decision was taken here.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-011', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:2,
  question:'Several parties fought the 1967 election as one pro-independence group. Give the single word for parties joining together like this.',
  answer:'coalition', alsoAccept:['Coalition','alliance','Alliance','a coalition','an alliance'],
  hint:'The same word is used when parties share a government afterwards.',
  explanation:'They formed a <b>coalition</b>, or alliance: the Labour Party, the Independent Forward Bloc and the Comité d\'Action Musulman stood together. Under a first-past-the-post system, splitting the pro-independence vote between rival candidates would have handed seats to the other side.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-012', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:2,
  question:'Which three parties made up the pro-independence grouping at the 1967 election?',
  options:['Labour, the Independent Forward Bloc and the Comité d\'Action Musulman',
           'Labour, the PMSD and the Comité d\'Action Musulman, standing as one list',
           'The PMSD, the Independent Forward Bloc and the Comité d\'Action Musulman',
           'Labour, the Independent Forward Bloc and the Mouvement Militant Mauricien'],
  answer:'Labour, the Independent Forward Bloc and the Comité d\'Action Musulman',
  hint:'One well-known party of the day is missing, because it argued the other case.',
  explanation:'The Labour Party, the <b>IFB</b> and the <b>CAM</b> fought the election together for independence. The PMSD cannot belong in the list: it was the party campaigning for association with Britain, and the MMM did not yet exist in 1967.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-013', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:3,
  question:'Why is the 1967 general election often described as a referendum rather than an ordinary election?',
  options:['One question, independence or not, decided how nearly every vote was cast',
           'Voters were handed a separate ballot paper with the word independence on it',
           'It was the first election in which every adult in the colony was able to vote',
           'The result had to be confirmed by a second vote held later in that same year'],
  answer:'One question, independence or not, decided how nearly every vote was cast',
  hint:'A referendum settles one question. Ask what was on voters\' minds that year.',
  explanation:'Both camps campaigned on the single issue of independence, so the seats won were read as the country\'s answer to that one question. It was not a referendum in form — there was no separate ballot paper and no confirming vote, and universal adult suffrage had arrived before 1967.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-014', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:3,
  question:'Mauritius elects members constituency by constituency, with the leading candidates taking the seats. Why did that make an alliance attractive in 1967?',
  options:['Two friendly parties standing apart could split a vote and lose the seat',
           'An alliance is given extra seats in the assembly under the counting rules',
           'Only a party with candidates in every constituency is allowed to take part',
           'Parties inside an alliance are permitted to spend more on their campaign'],
  answer:'Two friendly parties standing apart could split a vote and lose the seat',
  hint:'Work through what happens when two candidates appeal to the very same voters.',
  explanation:'Under first-past-the-post, two allies competing in one constituency divide their supporters and can let a third candidate through on fewer votes. The counting rules give no bonus seats to an alliance, and a party may contest as few constituencies as it wishes.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-015', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:3,
  question:'The side opposing independence argued that Mauritius could not stand alone. Which set of facts did that argument rest on?',
  options:['A small island, one export crop, few resources and no forces of its own',
           'A large population, plentiful minerals and a long land border to defend',
           'A young population, heavy industry and a currency shared with neighbours',
           'A weak school system, no harbour and no experience of elected government'],
  answer:'A small island, one export crop, few resources and no forces of its own',
  hint:'List what the island did and did not have in 1967 before you choose.',
  explanation:'The case rested on size, dependence on sugar alone, the absence of minerals and the lack of any defence force. Mauritius had no land border and no heavy industry, and it had been electing representatives for years, so the other options describe a different country.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-016', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:4,
  question:'A voter in 1967 is told that a small island with one crop cannot survive as an independent state. Which reply is the strongest argument against that claim?',
  options:['Sovereignty would let the island choose new industries instead of only cane',
           'Independence would raise the world price of sugar and pay for everything',
           'Britain had already promised to keep governing the island for ten more years',
           'No country that has ever become independent has afterwards run into trouble'],
  answer:'Sovereignty would let the island choose new industries instead of only cane',
  hint:'A good argument answers the "one crop" part rather than denying it.',
  explanation:'The reply that works accepts the weakness and points to the remedy: only a government with full powers could set out to diversify, which is exactly what happened after 1970. Independence cannot move a world price, and the sweeping claim in the last option is disproved by many examples.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-017', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:4,
  question:'A first-time voter asks a teacher in 1967 why this election matters more than the ones before it. Which answer is accurate?',
  options:['The winners would settle whether the island became a sovereign state',
           'The winners would be the first government ever elected by all adults here',
           'The losing party would be banned from standing at any future election',
           'The winners would choose the island\'s first president as head of state'],
  answer:'The winners would settle whether the island became a sovereign state',
  hint:'What could this parliament do that no earlier one had been asked to do?',
  explanation:'The result decided the constitutional future, and the winning side went on to independence in 1968. Elections under universal adult suffrage had already been held before 1967, no party was banned, and the island had no president until it became a republic in 1992.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-018', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:4,
  question:'At a 1967 meeting a candidate promises that independence will end unemployment straight away. Which is the best judgement of that promise?',
  options:['Unsound — jobs depend on new industries, and those take years to build',
           'Sound — a government of its own can employ every worker who wants a job',
           'Unsound — unemployment was already falling quickly before the election',
           'Sound — once sugar was sold directly abroad, wages would rise at once'],
  answer:'Unsound — jobs depend on new industries, and those take years to build',
  hint:'Ask what actually creates a job, and how long that takes to happen.',
  explanation:'Changing who governs does not by itself create work; factories, training and markets do, and they took until the 1970s to arrive. Unemployment was rising, not falling, as the post-malaria generation reached working age, so the third option has the trend backwards.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-019', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:4,
  question:'The pro-independence alliance won the 1967 election. What did that result allow its leaders to do next?',
  options:['Ask Britain to fix a date and hand over power under a new constitution',
           'Declare the island independent that same evening without any further step',
           'Change the constitution alone, since an election result overrides it here',
           'Call a second election to confirm the answer before approaching Britain'],
  answer:'Ask Britain to fix a date and hand over power under a new constitution',
  hint:'Winning a vote shows what people want; something still has to be negotiated.',
  explanation:'The vote gave the government its mandate to complete the constitutional process with Britain, which set independence for 12 March 1968. A result cannot by itself change a constitution or transfer sovereignty, and no confirming election was needed or held.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-020', chapterId:'g9sms-colonial-independence', subsection:'parties_1967', difficulty:4,
  question:'After the 1967 result, many who had voted against independence felt uneasy about their place in the new state. Why was it in the government\'s own interest to take those fears seriously?',
  options:['A new country needs the confidence of all its people in order to hold together',
           'The constitution required the losing party to be given half of the ministries',
           'Britain would have cancelled independence if any group had made a complaint',
           'Voters who lose an election are entitled to a second vote under the same rules'],
  answer:'A new country needs the confidence of all its people in order to hold together',
  hint:'Think about what a brand-new state most needs during its first few years.',
  explanation:'Independence was won by a majority, not by everyone, so the new state had to reassure the minority or risk losing skills, capital and unity — and some families did emigrate. Nothing in the constitution shared out ministries automatically, and Britain held no veto once the handover was agreed.' }));

// ── independence_1968 — 16 items (L1 3 · L2 4 · L3 2 · L4 7) ───────────────

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-021', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:1,
  question:'The national flag adopted in 1968 is made of horizontal bands of red, blue, yellow and green. How many bands does it have?',
  answer:4,
  hint:'Count the colours named in the question.',
  explanation:'The flag has <b>four</b> horizontal bands, which is why it is often called the Four Bands. Pupils sometimes answer three, thinking of the many national flags that carry only three stripes; the Mauritian flag is unusual in having four.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-022', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:1,
  question:'Which association of countries did Mauritius remain a member of after becoming independent in 1968?',
  options:['The Commonwealth','The European Union','The Warsaw Pact','The Arab League'],
  answer:'The Commonwealth',
  hint:'It is the group made up largely of former British territories.',
  explanation:'Mauritius became independent <b>within the Commonwealth</b> and has remained a member ever since, including after 1992. The European Union is the tempting answer because of later trade links, but Mauritius trades with it as a partner, not as a member.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-023', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:1,
  question:'Give the word that describes a state which governs itself completely and takes its decisions without another country\'s permission.',
  answer:'sovereign', alsoAccept:['Sovereign','sovereignty','independent','a sovereign state','sovereign state'],
  hint:'It is the adjective used of a state that answers to no outside power.',
  explanation:'A <b>sovereign</b> state holds full authority over its own territory and decisions. Pupils sometimes answer "democratic": a state can be sovereign without being democratic, and can be democratic while another country still controls its defence and foreign affairs.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-024', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:2,
  question:'Independence Day falls in March. On which day of that month did Mauritius become independent? Give the day number only.',
  answer:12,
  hint:'The same day of the month is celebrated as National Day every year.',
  explanation:'Mauritius became independent on the <b>12th</b> of March 1968, and the same date was chosen in 1992 for the proclamation of the republic. Pupils often give the year instead of the day; read carefully which of the two a question is asking for.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-025', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:2,
  question:'Between 1968 and 1992 the Queen remained head of state of Mauritius. Who represented her here?',
  options:['The Governor-General','The Prime Minister','The Chief Justice','The Speaker'],
  answer:'The Governor-General',
  hint:'The office disappeared when the country changed its form of state.',
  explanation:'A <b>Governor-General</b>, a Mauritian appointed on the advice of the Prime Minister, represented the Queen until 1992. The Prime Minister is the tempting answer, but the Prime Minister has always been head of <i>government</i>, which is a different office.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-026', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:2,
  question:'Where was the constitutional conference held in 1965 at which the terms of Mauritian independence were discussed?',
  options:['In London','In Port Louis','In Geneva','In New Delhi'],
  answer:'In London',
  hint:'It was held in the capital of the colonial power of the day.',
  explanation:'The 1965 constitutional conference was held in <b>London</b>, since Britain was the power that had to agree to the transfer. Port Louis is the tempting answer because the outcome mattered most here, but the conference itself was convened by the British government.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-027', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:2,
  question:'Which pair of international bodies did the newly independent Mauritius join in 1968?',
  options:['The United Nations and the Organisation of African Unity',
           'The United Nations and the Warsaw Pact of eastern Europe',
           'The World Trade Organisation and the African Union',
           'The European Community and the Organisation of African Unity'],
  answer:'The United Nations and the Organisation of African Unity',
  hint:'One body was worldwide; the other was for the continent the island sits beside.',
  explanation:'Mauritius joined the <b>United Nations</b> and the <b>Organisation of African Unity</b>, the forerunner of the African Union, in its first year of independence. The Warsaw Pact was a military alliance of eastern Europe, and both the WTO and the African Union itself were created decades later.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-028', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:3,
  question:'Why did the new state choose to remain inside the Commonwealth rather than cut every tie with Britain?',
  options:['It kept trading links and contacts that a small new country could not spare',
           'Membership was a condition Britain imposed before it would grant any freedom',
           'Commonwealth members share one parliament that makes laws for them all',
           'Only Commonwealth members were allowed to apply to join the United Nations'],
  answer:'It kept trading links and contacts that a small new country could not spare',
  hint:'Weigh what a small island gains from staying in a familiar network.',
  explanation:'Membership preserved trade arrangements, scholarships and diplomatic contacts, which mattered greatly to an economy selling almost all its sugar abroad. The Commonwealth has no shared parliament and no law-making power, and membership was a Mauritian choice, not a British condition.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-029', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:3,
  question:'Mauritius became fully independent in 1968 and yet the Queen stayed as head of state for another twenty-four years. How is that possible?',
  options:['Independence transfers the power to decide, not necessarily the head of state',
           'Independence was only partial in 1968 and became complete in the year 1992',
           'Britain kept the right to appoint the head of state until it chose to give it up',
           'The Queen was elected head of state by the first parliament that Mauritius had'],
  answer:'Independence transfers the power to decide, not necessarily the head of state',
  hint:'Separate who decides things from who is the ceremonial head of the state.',
  explanation:'A sovereign state may keep a monarch as a ceremonial head of state while every decision is taken by its own government and parliament. Independence in 1968 was complete; 1992 changed the <i>form</i> of the state, replacing the Queen with a President, not the amount of sovereignty.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-030', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'A family listening to the radio on 12 March 1968 asks what has actually changed overnight. Which statement is correct?',
  options:['Laws for Mauritius are now made here, and no British minister can overrule them',
           'Every British-made law was cancelled that night and the courts had to start again',
           'The island stopped selling its sugar to Britain and had to find new buyers at once',
           'Mauritians lost the right to travel to Britain and needed permission to go there'],
  answer:'Laws for Mauritius are now made here, and no British minister can overrule them',
  hint:'Ask what independence moves: the law-making power, or the laws themselves?',
  explanation:'Independence moved sovereign law-making power to the Mauritian parliament; existing laws and courts carried on unchanged until Mauritius decided otherwise. Sugar continued to be sold to Britain under the Commonwealth arrangements, so the trade did not stop on independence day.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-031', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'A pupil says that the National Day celebration on 12 March is really a celebration of the republic. Which response is best?',
  options:['Partly — the date carries both events, but it was first fixed for independence',
           'Correct — the date was only chosen in 1992 when the republic was proclaimed',
           'Wrong — the republic was proclaimed on a different date later in that same year',
           'Correct — independence itself was celebrated on a different date before 1992'],
  answer:'Partly — the date carries both events, but it was first fixed for independence',
  hint:'Two anniversaries share one date. Which of them came first?',
  explanation:'12 March marks independence in 1968, and the republic was deliberately proclaimed on the same date in 1992 so that the country would keep a single national day. The date was therefore fixed by the 1968 event, and the 1992 proclamation was arranged to match it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-032', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'In 1968 a very small state with no army joined the United Nations and the Organisation of African Unity almost immediately. What was the strongest reason for joining so quickly?',
  options:['Membership gave it a recognised voice and allies it could not raise alone',
           'Membership guaranteed that troops would be sent if the island were attacked',
           'Membership provided the money needed to run the government for its first year',
           'Membership was compulsory for every territory leaving the British Empire then'],
  answer:'Membership gave it a recognised voice and allies it could not raise alone',
  hint:'Ask what a country with no army and few people can gain from a meeting room.',
  explanation:'For a state too small to defend itself or bargain alone, recognition and a seat where its case can be argued are the real protection — the later Chagos campaign used exactly that route. Neither body guarantees troops or funds a member\'s budget, and joining was voluntary.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-033', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'An economist in 1968 argues that independence was a dangerous moment for the sugar industry. Which consequence of the settlement most reduced that danger?',
  options:['Staying in the Commonwealth kept the agreed market for the island\'s sugar',
           'Independence let the government set the world price paid for its own sugar',
           'Britain agreed to buy the whole crop for ever at a price fixed by Mauritius',
           'The sugar estates were taken over by the state as soon as independence came'],
  answer:'Staying in the Commonwealth kept the agreed market for the island\'s sugar',
  hint:'Trace what would have happened to the buyers if every tie had been cut.',
  explanation:'Sugar earned almost all the island\'s foreign exchange, so keeping the Commonwealth arrangements meant the crop still had a buyer at an agreed price through the change of status. No country can set a world price by itself, and the estates were not nationalised at independence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-034', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'Serious civil unrest broke out in Port Louis in the weeks before independence and a state of emergency had to be declared. What task did that set the incoming government?',
  options:['Building trust between communities so that the new state could hold together',
           'Abolishing elections until the population had grown calm enough to vote again',
           'Asking Britain to keep its soldiers permanently stationed on the island instead',
           'Moving the capital away from Port Louis to a town that had stayed peaceful'],
  answer:'Building trust between communities so that the new state could hold together',
  hint:'Ask what a divided new country most needs its government to work on.',
  explanation:'The unrest showed that independence alone would not produce unity, so national unity, fair representation and shared institutions became central tasks of the new government. Suspending elections or handing security permanently back to Britain would have undone the sovereignty just gained.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-035', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'The Chagos Archipelago was separated from the territory of Mauritius at the time of the 1965 constitutional talks, before independence. A pupil says Mauritius simply forgot about it. Which response is best?',
  options:['Wrong — Mauritius has pressed the claim in international forums ever since',
           'Right — no Mauritian government raised the matter again after the year 1968',
           'Wrong — the islands were returned to Mauritius on independence day in 1968',
           'Right — the archipelago lies too far away for any claim to be made at all'],
  answer:'Wrong — Mauritius has pressed the claim in international forums ever since',
  hint:'Ask where a small state takes a territorial claim it cannot enforce by force.',
  explanation:'The separation has been raised repeatedly at the United Nations and before international courts, which is how a small state pursues a claim it cannot enforce militarily. The islands were not returned in 1968, and distance has never prevented a state from claiming its territory.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-036', chapterId:'g9sms-colonial-independence', subsection:'independence_1968', difficulty:4,
  question:'A pupil concludes that after 1968 Britain had no further influence of any kind on Mauritius. Which is the best evaluation?',
  options:['Too strong — trade, aid and the legal system still tied the two countries',
           'Correct — every link with Britain was cut on the day independence arrived',
           'Too weak — Britain in fact continued to appoint Mauritian ministers itself',
           'Correct — the Commonwealth exists only to end contact between its members'],
  answer:'Too strong — trade, aid and the legal system still tied the two countries',
  hint:'Sovereignty is about who decides. Ask whether decisions and contacts are the same thing.',
  explanation:'Sovereignty means Mauritius decides for itself, not that it stands alone: the sugar market, English law, the language of the courts and Commonwealth ties all continued. Britain appointed no Mauritian ministers after 1968, and the Commonwealth exists to keep members in contact.' }));

// ── republic_1992 — 14 items (L1 2 · L2 4 · L3 3 · L4 5) ───────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-037', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:1,
  question:'Which office acts for the President of Mauritius when the President is absent or the office is vacant?',
  options:['The Vice-President of the Republic',
           'The Speaker of the National Assembly',
           'The Chief Justice of the Supreme Court',
           'The Leader of the Opposition party'],
  answer:'The Vice-President of the Republic',
  hint:'The office you want was created at the same moment as the presidency itself.',
  explanation:'The <b>Vice-President</b> is a constitutional office created when Mauritius became a republic, and the holder performs the functions of the President when that office is vacant or the President cannot act. The Speaker presides over the National Assembly, the Chief Justice heads the judiciary and the Leader of the Opposition sits in Parliament — none of the three stands in for the head of state.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-038', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:1,
  question:'Give the word for a state whose head is not a king or queen but a person chosen for the office.',
  answer:'republic', alsoAccept:['Republic','a republic'],
  hint:'Mauritius became one of these on 12 March 1992.',
  explanation:'A <b>republic</b> has a chosen head of state rather than a hereditary one. Pupils sometimes answer "democracy": the two are different ideas, since a country can be a democracy with a monarch as head of state, exactly as Mauritius was between 1968 and 1992.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-039', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:2,
  question:'Mauritius became independent in 1968 and a republic in 1992. How many years passed between the two events?',
  answer:24,
  hint:'Subtract the earlier year from the later one.',
  explanation:'1992 − 1968 = <b>24 years</b>. The usual mistake is to count the years of British rule instead, or to add the two dates; the question asks only for the gap between independence and the proclamation of the republic.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-040', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:2,
  question:'How does a person become President of Mauritius?',
  options:['Elected by the National Assembly on a motion of the Prime Minister',
           'Elected directly by all the voters of the country at a general election',
           'Appointed by the Chief Justice after consulting the leader of opposition',
           'Chosen by the members of the cabinet from among the serving ministers'],
  answer:'Elected by the National Assembly on a motion of the Prime Minister',
  hint:'Ask which body does the choosing: the voters, the courts, or the parliament.',
  explanation:'The <b>National Assembly</b> elects the President. Direct election by the voters is the tempting answer because that is how presidents are chosen in many other republics, but the Mauritian office was designed to fit a parliamentary system rather than to rival it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-041', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:2,
  question:'What happened to the office of Governor-General when Mauritius became a republic?',
  options:['It ended, and a President became head of state in its place',
           'It continued, but the holder was given the new title of President',
           'It was shared between the President and the Chief Justice jointly',
           'It was kept for ceremonial duties alongside the new President too'],
  answer:'It ended, and a President became head of state in its place',
  hint:'The office existed only to represent somebody who was no longer head of state.',
  explanation:'The Governor-General represented the Queen, so once the Queen ceased to be head of state the office had nothing left to do and was replaced by the President. It was not simply renamed: the President holds an office created by the amended Constitution.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-042', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:2,
  question:'Which of these stayed exactly the same when Mauritius became a republic in 1992?',
  options:['The Prime Minister remained the head of the government',
           'The Queen remained the head of state of the whole country',
           'The Governor-General remained the representative of the Crown',
           'The head of state remained a person from outside the country'],
  answer:'The Prime Minister remained the head of the government',
  hint:'Sort what the change touched from what it left alone.',
  explanation:'The change was to the head of <i>state</i>; the Prime Minister continued to lead the government exactly as before, and parliament, the courts and the laws were unchanged. The Queen and the Governor-General are precisely the two things the change removed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-043', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:3,
  question:'Why is the Prime Minister, and not the President, described as the head of government?',
  options:['The Prime Minister leads the ministers who actually take the decisions',
           'The Prime Minister is the only member of parliament elected by the voters',
           'The President has no part at all in the working of the state after 1992',
           'The President is chosen by the courts and so must stay out of politics'],
  answer:'The Prime Minister leads the ministers who actually take the decisions',
  hint:'Ask who directs the ministries from day to day.',
  explanation:'The Prime Minister heads the cabinet, which runs the ministries and decides policy, while the President performs the duties of head of state. Every member of the National Assembly is elected, and the President does have constitutional functions, so the last two options overstate the case.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-044', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:3,
  question:'Why did ordinary life change very little when the republic was proclaimed?',
  options:['Parliament, the courts, the laws and the elections all carried on unaltered',
           'The proclamation was kept secret from the public for several months in 1992',
           'The change applied only to the outer islands and not to Mauritius itself',
           'A republic and a monarchy are simply two names for the very same thing'],
  answer:'Parliament, the courts, the laws and the elections all carried on unaltered',
  hint:'List the institutions a person actually meets, then ask which the change touched.',
  explanation:'Only the head of state changed, so the institutions people deal with — courts, schools, taxes, elections — continued exactly as before. The last option goes too far: the two forms differ in how the head of state is chosen, which is a real constitutional difference.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-045', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:3,
  question:'The republic was proclaimed on 12 March, the date already used for independence. What does that choice suggest about how the change was seen?',
  options:['As the completion of a journey begun in 1968 rather than a fresh start',
           'As a rejection of everything that had been achieved since the year 1968',
           'As a small administrative change that deserved no public ceremony at all',
           'As an event that the government hoped the public would soon forget about'],
  answer:'As the completion of a journey begun in 1968 rather than a fresh start',
  hint:'Ask what is being said by putting two anniversaries on one date.',
  explanation:'Sharing the date presents the republic as the last step of the same process of taking full charge of the country\'s own institutions. A rejection of 1968 would have called for a different date, and the proclamation was marked publicly rather than played down.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-046', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:4,
  question:'A pupil writes that by becoming a republic in 1992 Mauritius left the Commonwealth. Which response is correct?',
  options:['Wrong — a republic may stay in the Commonwealth, and Mauritius did',
           'Right — only countries that keep the Queen are allowed to be members',
           'Wrong — Mauritius had already left the Commonwealth back in the 1970s',
           'Right — Mauritius rejoined a few years later after applying once again'],
  answer:'Wrong — a republic may stay in the Commonwealth, and Mauritius did',
  hint:'Ask whether membership depends on the form of state or on something else.',
  explanation:'Commonwealth membership does not require a monarch as head of state, and Mauritius has been a member continuously since 1968. The pupil has confused the <b>head of state</b> with <b>membership of an association</b>: the first changed in 1992, the second did not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-047', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:4,
  question:'A radio caller claims the President can dismiss the government at any moment and rule alone. Which is the best judgement?',
  options:['Unsound — the President acts on advice and the Assembly holds the power',
           'Sound — the head of state outranks every minister and so may do as chosen',
           'Unsound — only the Chief Justice may remove ministers from their offices',
           'Sound — a president elected by parliament may dissolve it whenever wanted'],
  answer:'Unsound — the President acts on advice and the Assembly holds the power',
  hint:'Ask who gave the President the office in the first place.',
  explanation:'In a parliamentary republic the head of state normally acts on the advice of the Prime Minister and cabinet, and the government answers to the elected Assembly. A President elected by that Assembly cannot simply set it aside, and the Chief Justice does not appoint or remove ministers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-048', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:4,
  question:'Mauritius chose to have its President elected by the National Assembly rather than by the voters. Which consequence follows from that choice?',
  options:['The President cannot claim a mandate of their own against the government',
           'The President must belong to the party that holds the most seats in the House',
           'The President is not permitted to speak in public about national questions',
           'The President serves only while the same Prime Minister remains in office'],
  answer:'The President cannot claim a mandate of their own against the government',
  hint:'Ask where the authority of a directly elected head of state would come from.',
  explanation:'A head of state elected by parliament has no separate popular mandate, which keeps the elected government clearly in charge — the design of a parliamentary republic. Nothing requires the President to be from the largest party, to stay silent, or to leave when the Prime Minister does.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-049', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:4,
  question:'A visitor asks a Mauritian in 1993 what practical difference the republic made to an ordinary citizen. Which answer is the most accurate?',
  options:['The head of state is now a Mauritian chosen here, but rights are unchanged',
           'Every citizen gained the right to vote directly for the head of state here',
           'Taxes, courts and schools were all reorganised under entirely new rules',
           'Citizens had to apply again for a passport under a newly created status'],
  answer:'The head of state is now a Mauritian chosen here, but rights are unchanged',
  hint:'Separate the symbolic change from any change to what a citizen may do.',
  explanation:'The republic completed the transfer of the highest office of state into Mauritian hands, while rights, services and institutions were untouched. The voters do not elect the President — the Assembly does — and citizenship, passports and public services continued without interruption.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-050', chapterId:'g9sms-colonial-independence', subsection:'republic_1992', difficulty:4,
  question:'A pupil argues that the republic was proclaimed mainly in order to solve an economic problem. Which is the strongest argument against that reading?',
  options:['Changing the head of state alters no price, no market and no tax at all',
           'The economy was in serious difficulty throughout the whole of that year',
           'A republic always collects far more in taxes than a monarchy manages to',
           'The proclamation was made by Britain rather than by Mauritius in the end'],
  answer:'Changing the head of state alters no price, no market and no tax at all',
  hint:'Ask what a constitutional change can and cannot reach.',
  explanation:'The 1992 change was constitutional and symbolic: it touched who holds the office of head of state, not export prices, factories or revenue. The form of a state does not determine how much tax it collects, and the proclamation was a Mauritian decision taken here.' }));

// ═══════════════════════════════════════════════════════════════════════════
//  CHAPTER 2 — g9sms-living-conditions
// ═══════════════════════════════════════════════════════════════════════════

// ── health_and_disease — 14 items (L1 2 · L2 4 · L3 3 · L4 5) ──────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-051', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:1,
  question:'Malaria is not passed from one person to another by touch. Name the insect whose bite carries it from person to person.',
  answer:'mosquito', alsoAccept:['Mosquito','mosquitoes','the mosquito','moustique'],
  hint:'It breeds in still water and bites mostly after dark.',
  explanation:'The <b>mosquito</b> carries the malaria parasite in its bite, which is why the campaign attacked the insect rather than only treating patients. Pupils sometimes answer "fly": houseflies spread stomach illnesses through dirty food, but they do not carry malaria.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-052', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:1,
  question:'Besides spraying insecticide, what was done to the marshes and pools of standing water during the anti-malaria campaign?',
  options:['They were drained so that mosquitoes had nowhere left to breed',
           'They were fenced off so that people could not go near them again',
           'They were stocked with cane so that the water would be used up',
           'They were covered with soil so that crops could be grown on them'],
  answer:'They were drained so that mosquitoes had nowhere left to breed',
  hint:'Think about where the insect lays its eggs.',
  explanation:'Draining standing water removed the <b>breeding places</b>, so far fewer mosquitoes hatched at all. Fencing an area off protects nobody, because a mosquito flies over a fence — the campaign worked by attacking the insect at the stage it cannot move.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-053', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:2,
  question:'Two things were done about malaria: patients were given medicine, and marshes were drained and sprayed. What is the difference between them?',
  options:['Medicine treats a person already ill; draining stops new people catching it',
           'Medicine stops the disease spreading; draining only relieves the symptoms',
           'Medicine works on adults only; draining protects children and infants alone',
           'Medicine was used in the towns only; draining was used in the country areas'],
  answer:'Medicine treats a person already ill; draining stops new people catching it',
  hint:'Sort the two measures into cure and prevention.',
  explanation:'Treatment and prevention answer different problems: medicine helps the patient in front of you, while removing breeding sites cuts the number of new cases. Reversing the two is the common error — medicine given to one patient does not stop the mosquito biting the next person.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-054', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:2,
  question:'Before the reforms, families that drew water from an unprotected stream were most at risk from which group of illnesses?',
  options:['Stomach illnesses such as gastro-enteritis and typhoid fever',
           'Breathing illnesses such as asthma brought on by the dusty air',
           'Illnesses carried by mosquitoes, such as malaria in the wet season',
           'Injuries and broken bones caused by accidents at work on the estates'],
  answer:'Stomach illnesses such as gastro-enteritis and typhoid fever',
  hint:'Ask what enters the body when the water itself is dirty.',
  explanation:'Water carrying sewage spreads <b>stomach and gut infections</b>, which killed many infants before piped supplies arrived. Malaria is the tempting answer near water, but it comes from the mosquito breeding on the surface, not from drinking the water itself.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-055', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:2,
  question:'Give the word that describes a disease which is always present in a particular area rather than arriving in sudden waves.',
  answer:'endemic', alsoAccept:['Endemic','endemic disease'],
  hint:'It is the opposite of a disease that only visits a place from time to time.',
  explanation:'A disease constantly present in an area is <b>endemic</b>, which is what malaria was in the low-lying parts of the island. Pupils often write "epidemic": that word describes a sudden outbreak affecting many people at once, which is a different pattern.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-056', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:2,
  question:'Reports of the period often give an "infant mortality rate". What does that measure?',
  options:['How many babies out of every thousand born die before their first birthday',
           'How many years on average a baby born in that year can expect to live for',
           'How many babies are born in a year for every thousand people in the country',
           'How many mothers out of every thousand fall seriously ill after childbirth'],
  answer:'How many babies out of every thousand born die before their first birthday',
  hint:'Break the phrase in two: who it counts, and what happens to them.',
  explanation:'Infant mortality counts <b>deaths of babies under one year</b>, and it falls sharply when clean water, food and clinics arrive. The second option defines life expectancy and the third the birth rate — three different measures that are easy to mix up.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-057', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:3,
  question:'After the anti-malaria campaign the death rate fell quickly while the birth rate stayed high. Why did the two not change together?',
  options:['Deaths fell as soon as the disease went; family habits change far more slowly',
           'Births are counted every year but deaths are only counted once in ten years',
           'The campaign was designed to raise the birth rate as well as cut the deaths',
           'Doctors advised families at the time to have as many children as they could'],
  answer:'Deaths fell as soon as the disease went; family habits change far more slowly',
  hint:'One of the two rates can be changed by spraying. The other cannot.',
  explanation:'Removing a killer disease cuts deaths almost at once, but the size of families reflects custom, income and expectation, which shift over a generation. The gap between a fallen death rate and a high birth rate is exactly what produced the population surge of the 1950s.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-058', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:3,
  question:'Why did poor housing and poor nutrition make outbreaks of disease worse in the 1940s?',
  options:['Crowded rooms spread infection and an underfed body resists it badly',
           'Poor housing attracts mosquitoes, which never enter a solid building',
           'Underfed people were not permitted to visit the hospitals of the period',
           'Crowded villages were always built at a distance from any water supply'],
  answer:'Crowded rooms spread infection and an underfed body resists it badly',
  hint:'Two separate things are going on: how a germ travels, and how a body fights it.',
  explanation:'Overcrowding gives an infection more chances to pass on, and poor nutrition weakens the body\'s defences, so the same germ produces more cases and more deaths. Mosquitoes enter solid buildings perfectly well, and nobody was barred from a hospital for being underfed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-059', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:3,
  question:'Why was attacking the mosquito more effective against malaria than treating patients one by one?',
  options:['It cut the number of new cases instead of dealing with each case later',
           'It cost the government nothing at all, unlike medicine, which is costly',
           'Treatment does not work on malaria, so there was no other choice to make',
           'Patients would refuse treatment, which left spraying as the only measure'],
  answer:'It cut the number of new cases instead of dealing with each case later',
  hint:'Compare a measure that reaches everyone with one that reaches one person.',
  explanation:'Removing breeding sites protects a whole district at once, while treatment reaches only those already ill and does nothing about the next bite. Spraying and draining were not free, and treatment did work — it was simply far slower at reducing the total number of cases.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-060', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:4,
  question:'A health officer in 1948 has money either to build one new hospital ward or to spray and drain the marshes of a whole district. Which choice saves more lives from malaria, and why?',
  options:['Draining and spraying — it stops the disease reaching thousands of people',
           'The new ward — a hospital bed can be used again by patient after patient',
           'The new ward — treatment reaches the sick, who are the ones most at risk',
           'Draining and spraying — the marshes could then be sold off to the planters'],
  answer:'Draining and spraying — it stops the disease reaching thousands of people',
  hint:'Count how many people each choice actually reaches.',
  explanation:'Prevention across a district reaches everyone who would otherwise be bitten, while a ward, however useful, treats those who have already fallen ill. The last option is a real consequence of draining land but it is not a reason about lives, which is what the question asks for.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-061', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:4,
  question:'In the early 1950s far fewer babies are dying while families stay the same size. A planner is asked what the government must prepare for. What should the answer be?',
  options:['More school places first, and jobs for that same group about fifteen years on',
           'Fewer school places, because healthier children repeat fewer years at school',
           'More hospital beds only, because a larger population always falls ill more',
           'No change at all, because a population that is healthier costs the state less'],
  answer:'More school places first, and jobs for that same group about fifteen years on',
  hint:'Follow one large group of surviving babies forward through their lives.',
  explanation:'A surviving cohort moves through the system: classrooms first, then the labour market, which is how the 1950s health success produced the unemployment problem of the late 1960s. Health spending alone misses the point, because the children are not ill — there are simply more of them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-062', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:4,
  question:'A pupil concludes that the anti-malaria campaign was a failure, since the surviving children later could not find work. Which is the best evaluation?',
  options:['Unfair — the campaign saved lives; the failure was in planning for them',
           'Fair — a policy that leads to unemployment has clearly not worked at all',
           'Unfair — unemployment in the 1960s had no connection with the campaign',
           'Fair — the government should have let the disease continue for some years'],
  answer:'Unfair — the campaign saved lives; the failure was in planning for them',
  hint:'Separate what the campaign was for from what somebody else should have done next.',
  explanation:'The campaign achieved exactly what it set out to do. The unemployment of the 1960s came from not preparing schools, training and industries for a much larger young generation, and the remedy was the EPZ and family planning — not fewer surviving children.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-063', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:4,
  question:'A village that has always drawn water from an open stream is connected to a piped supply. Which change should the clinic expect to see first?',
  options:['Fewer babies brought in with severe diarrhoea and stomach infections',
           'Fewer cases of malaria, since the mosquitoes lose their breeding site',
           'Fewer broken bones, since nobody has to walk to the stream any longer',
           'Fewer cases of asthma, since the piped water settles the dust on roads'],
  answer:'Fewer babies brought in with severe diarrhoea and stomach infections',
  hint:'Ask which illnesses were actually arriving in the water people drank.',
  explanation:'Clean piped water cuts waterborne gut infections, and infants are the group they kill. Malaria is the trap: piping water into houses does not drain the stream, so the mosquitoes still breed — that needed the separate campaign of draining and spraying.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-064', chapterId:'g9sms-living-conditions', subsection:'health_and_disease', difficulty:4,
  question:'Years after malaria had been eradicated, an official proposes ending all mosquito control to save money. What is the strongest objection?',
  options:['Travellers and cyclone floodwater could let the disease take hold again',
           'The insecticide would go to waste if it were not sprayed every season',
           'Mosquito control is also the only way of keeping the water supply clean',
           'The staff employed on the spraying teams would be left without any work'],
  answer:'Travellers and cyclone floodwater could let the disease take hold again',
  hint:'Ask whether the conditions that once let the disease spread have really gone.',
  explanation:'Eradication removes the disease, not the mosquito or the pools it breeds in, so an imported case plus untreated standing water can restart transmission — the reason surveillance continued. Job losses and unused stock are costs of the decision, but they are not the public-health risk.' }));

// ── housing_transport — 15 items (L1 3 · L2 4 · L3 3 · L4 5) ───────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-065', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:1,
  question:'In the 1940s the roofs of most ordinary Mauritian houses were made of dried grass tied in bundles. Give the one word for that material.',
  answer:'straw', alsoAccept:['Straw','thatch','thatched','lapay','paille'],
  hint:'A house roofed this way was known in Creole as a lakaz lapay.',
  explanation:'Most families lived under a roof of <b>straw</b>, or thatch, over walls of wood. Pupils sometimes answer corrugated iron: sheet iron did become common, but it came later and was a step up in cost from the grass roof it replaced.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-066', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:1,
  question:'On a sugar estate of the period, what was a "camp"?',
  options:['The group of houses where the estate labourers and their families lived',
           'The field nearest the factory, where the cane was first cut each season',
           'The store in which the estate kept its tools, its carts and its machinery',
           'The office where the estate manager received the buyers and the officials'],
  answer:'The group of houses where the estate labourers and their families lived',
  hint:'The word describes where people slept, not where they worked.',
  explanation:'An estate <b>camp</b> was the settlement of workers\' houses, usually close to the fields and owned by the estate. The tempting answers all name places of work: the point of the camp was that home and employer were the same landlord.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-067', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:1,
  question:'Cyclones Alix and Carol struck Mauritius in the same year and destroyed thousands of homes. Give that year.',
  answer:1960,
  hint:'It was in the decade before independence.',
  explanation:'Both cyclones struck in <b>1960</b>, and the destruction they caused is the reason a large concrete housing programme followed. Pupils often answer 1968, the year of independence — the cyclones came eight years before it and helped shape the housing policy of the new state.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-068', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:2,
  question:'Which building material became the standard for new housing in Mauritius after the cyclones of 1960?',
  options:['Reinforced concrete','Corrugated iron','Straw and wood','Bamboo and clay'],
  answer:'Reinforced concrete',
  hint:'It is heavy, it is poured, and a wind cannot lift it off.',
  explanation:'Housing schemes after 1960 were built in <b>reinforced concrete</b>, which a cyclone cannot tear apart, and the flat concrete roof is still the standard Mauritian house. Corrugated iron is the trap: the sheets are exactly what the wind was lifting away.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-069', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:2,
  question:'Give the one word for the violent tropical storm, with very strong circling winds, that destroyed thousands of Mauritian homes in 1960.',
  answer:'cyclone', alsoAccept:['Cyclone','a cyclone','tropical cyclone'],
  hint:'In the Indian Ocean it has a different name from the one used in the Atlantic.',
  explanation:'The storm is a <b>cyclone</b>. Pupils sometimes write "hurricane" or "typhoon": those name the same kind of storm in the Atlantic and in the western Pacific, but in the south-west Indian Ocean the correct term is cyclone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-070', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:2,
  question:'Before lorries became common, how was cut cane usually carried from the field to the factory?',
  options:['By ox-cart, and on the light railway lines laid across the estates',
           'By bus, which took the cane in the morning and workers in the evening',
           'By hand in baskets, since carts could not be driven between the rows',
           'By river barge, which carried cane down to the coast to be processed'],
  answer:'By ox-cart, and on the light railway lines laid across the estates',
  hint:'Two methods were used together, and neither needed an engine on the road.',
  explanation:'Cane travelled by <b>ox-cart</b> and along narrow estate rail lines to the factory. River barges could not be used: Mauritian rivers are short and steep, which is also why the island never developed inland water transport.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-071', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:2,
  question:'The island\'s railway was closed in the 1960s. What took over the job of carrying passengers around the country?',
  options:['Buses running on the roads between the towns and villages',
           'Ferries running along the coast between the fishing villages',
           'Taxis alone, since no other public transport was permitted then',
           'Bicycles alone, since no motor vehicles were imported after that'],
  answer:'Buses running on the roads between the towns and villages',
  hint:'It is the service Mauritians still use for the same journeys today.',
  explanation:'<b>Buses</b> replaced the trains and have carried most passengers ever since, which is why free bus travel later mattered so much to students. Taxis and bicycles existed alongside them, but neither could move the numbers a bus route carries.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-072', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:3,
  question:'Why did an unpaved estate track matter so much to a family with a seriously ill child in the 1950s?',
  options:['After rain it could not be used, so help was hours away or unreachable',
           'It was private land, so a family living there was not allowed to leave it',
           'Unpaved roads carry disease, so using the track made the illness worse',
           'Only estates with paved roads were given a doctor by the government then'],
  answer:'After rain it could not be used, so help was hours away or unreachable',
  hint:'Think about what happens to a dirt track in a Mauritian downpour.',
  explanation:'A mud track stops a vehicle, so distance to a clinic is measured in hours and in weather, not in kilometres — poor transport turns a treatable illness into a fatal one. Roads themselves do not carry disease, and families were never confined to the estate.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-073', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:3,
  question:'Why did houses of wood, straw and corrugated iron suffer so badly in the cyclones of 1960?',
  options:['They were light and not anchored, so the wind lifted roof and wall away',
           'They were too heavy for the soil, so they sank once the ground was wet',
           'They were built close together, so the wind could not pass between them',
           'They were built without windows, so the pressure inside could not escape'],
  answer:'They were light and not anchored, so the wind lifted roof and wall away',
  hint:'Ask what a very strong wind does to something light that is not tied down.',
  explanation:'Light materials fixed with nails give the wind something to lift, and once the roof goes the walls follow. These houses were not heavy, and being close together offers some shelter rather than less — the fatal weakness was weight and anchorage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-074', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:3,
  question:'How did better roads and regular bus services change working life for villagers after the 1960s?',
  options:['A person could live in one village and take a job in another town',
           'Every villager was required to move into the towns to find any work',
           'Estates had to close, because their workers could now reach the coast',
           'Wages became identical everywhere, because travel cost the same fare'],
  answer:'A person could live in one village and take a job in another town',
  hint:'Ask what transport does to the distance between home and a workplace.',
  explanation:'Daily travel separates where a family lives from where it earns, which widened the choice of work and later let EPZ factories draw labour from many villages. Nobody was forced to move, estates continued, and fares do not level out wages.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-075', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:4,
  question:'A family whose straw house was destroyed in 1960 is rebuilding, and can just afford a small concrete house or a larger one in wood and iron. Which choice is better, and why?',
  options:['The concrete one — a smaller house that survives the next storm costs less',
           'The wooden one — a larger house shelters more relatives during a cyclone',
           'The wooden one — timber can be repaired quickly after each storm passes',
           'The concrete one — a concrete house can be extended far more cheaply later'],
  answer:'The concrete one — a smaller house that survives the next storm costs less',
  hint:'Count the cost over several cyclones, not the cost of building once.',
  explanation:'Rebuilding after every serious cyclone is more expensive than building once in concrete, and a destroyed house shelters nobody, however large it was. Timber is indeed quicker to repair, but a house that needs repeated repair is the problem the policy was written to end.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-076', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:4,
  question:'After 1960 the government built concrete houses rather than simply handing families money after each cyclone. Which reasoning best supports that decision?',
  options:['A stronger house ends the damage; a payment only repairs it once again',
           'Families cannot be trusted to spend a payment on anything sensible at all',
           'Building houses is always cheaper for a government than paying out money',
           'Concrete houses could be taxed, whereas a wooden house could not be taxed'],
  answer:'A stronger house ends the damage; a payment only repairs it once again',
  hint:'Ask which option is still working when the next cyclone arrives.',
  explanation:'Rebuilding in a material the wind cannot lift removes the loss permanently, while relief payments have to be made again after every storm. Building is not automatically the cheaper option — it is the one that stops the problem recurring, which is a different argument.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-077', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:4,
  question:'Estate camps stood beside the cane fields, on land belonging to the employer. What was the main drawback of that arrangement for a worker?',
  options:['Losing the job could mean losing the family home at the very same time',
           'The walk to work each morning was far longer than from a nearby village',
           'Estate housing was always more expensive than renting a house in a town',
           'Workers living on the estate were not allowed to be paid any wages at all'],
  answer:'Losing the job could mean losing the family home at the very same time',
  hint:'Ask what a worker loses when home and employer are the same person.',
  explanation:'Tying housing to employment leaves the worker dependent: a dispute or a dismissal costs both wage and shelter, which weakens their position badly. The walk to work was short, which is the real advantage of the camp, and estate housing was cheap rather than costly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-078', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:4,
  question:'When the railway closed and buses took over, who gained most and who lost most?',
  options:['Villages off the old line gained a service; those on it lost a cheap one',
           'Everybody gained equally, since a bus can go wherever a train once went',
           'Estates gained, but ordinary passengers lost every means of travelling',
           'Town dwellers lost, because buses were not permitted to enter the towns'],
  answer:'Villages off the old line gained a service; those on it lost a cheap one',
  hint:'A rail line reaches a fixed set of places; a road network reaches many more.',
  explanation:'Buses could serve villages the fixed line never reached, so access spread widely, while settlements built around a station lost a service they had relied on. Change of this kind rarely benefits everyone equally, which is why the question asks who lost as well as who gained.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-079', chapterId:'g9sms-living-conditions', subsection:'housing_transport', difficulty:4,
  question:'A cyclone of the same strength as Carol destroys far fewer homes today. A pupil concludes that cyclones have grown weaker. Which response is best?',
  options:['Wrong — the houses changed, not the storms, once concrete replaced straw',
           'Right — storms in the region have become gentler with every passing decade',
           'Wrong — fewer houses are destroyed only because far fewer people live here',
           'Right — the warning system now steers each cyclone away from the island'],
  answer:'Wrong — the houses changed, not the storms, once concrete replaced straw',
  hint:'Two things could explain less damage. Which of them actually changed?',
  explanation:'The same wind meets a different building: concrete houses and a building code cut the damage, not a change in the storms. The population has grown rather than shrunk, and no warning system can steer a cyclone — it warns people in its path.' }));

// ── education_before_reform — 16 items (L1 3 · L2 5 · L3 3 · L4 5) ─────────

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-080', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:1,
  question:'In which year did secondary education become free in Mauritius? Give the year only.',
  answer:1977,
  hint:'It came two years after the student movement that demanded it.',
  explanation:'Secondary education became free in <b>1977</b>. Pupils often write 1975, the year of the student movement: the march came first and the reform followed, so the two dates mark the demand and the answer to it rather than one event.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-081', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:1,
  question:'Before the reforms, which stage of schooling was most widely available to Mauritian children?',
  options:['Primary school','Secondary school','University','Technical college'],
  answer:'Primary school',
  hint:'Think about the stage almost every child reached, and where the narrowing began.',
  explanation:'<b>Primary</b> schooling was far more widely available, and the narrowing came at the secondary stage, which most families had to pay for. University is the trap: it was reached by a very small number of students, usually by studying overseas.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-082', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:1,
  question:'Give the word for the money a family had to pay each term to keep a child in most secondary schools before 1977.',
  answer:'fees', alsoAccept:['Fees','fee','school fees','tuition fees'],
  hint:'It is the same word used for what a doctor or a lawyer charges.',
  explanation:'Families paid <b>fees</b>, and that single charge decided which children continued after primary school. Pupils sometimes answer "tax": a tax is paid to the state by everyone, whereas a fee was paid to the school by the family of that particular child.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-083', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
  question:'How could an able child from a poor family reach a state secondary school before 1977?',
  options:['By winning one of the few places awarded on a competitive examination',
           'By applying to the school directly and paying the fees in instalments',
           'By waiting until a place at a fee-paying college happened to fall vacant',
           'By taking an evening course, which was the route open to poorer families'],
  answer:'By winning one of the few places awarded on a competitive examination',
  hint:'The route existed, but it was narrow and depended on ranking.',
  explanation:'A small number of places at state colleges were won by <b>examination</b>, so a poor child could get through, but only by finishing near the top of the whole island. That is why the route is evidence of how closed the system was rather than of how open it was.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-084', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
  question:'What is the difference between free tuition and schooling that costs a family nothing?',
  options:['Free tuition removes the fee; uniform, books and fares still have to be paid',
           'Free tuition removes every cost, so the two phrases describe the same thing',
           'Free tuition applies to primary schooling only and never to the secondary',
           'Free tuition means the state pays the teacher but the pupil pays the school'],
  answer:'Free tuition removes the fee; uniform, books and fares still have to be paid',
  hint:'List everything a family spends before a child sits down in the classroom.',
  explanation:'Abolishing fees is only part of the cost of going to school, and uniform, books, materials and the daily fare still fall on the family. That is exactly why free transport for students mattered alongside free tuition rather than instead of it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-085', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
  question:'Who ran most of the secondary schools in Mauritius before the reforms?',
  options:['Private owners and religious bodies, with a few state colleges as well',
           'The state alone, which owned and staffed every secondary school here',
           'The sugar estates, which each maintained a college for their workers',
           'The British government, which sent out teachers to run every college'],
  answer:'Private owners and religious bodies, with a few state colleges as well',
  hint:'Ask who was charging the fees that families had to find.',
  explanation:'Secondary education was largely in <b>private and confessional hands</b>, with a small number of state colleges entered by examination. If the state had run them all, there would have been no fee to abolish in 1977 — the fee is the clue to who owned the schools.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-086', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
  question:'Which children were least likely to continue into secondary school before the reforms?',
  options:['Children of poor rural families, and girls more often than boys',
           'Children living in Port Louis, where the colleges were concentrated',
           'Children of families that already had a relative in a secondary school',
           'Children who lived within walking distance of a town and its college'],
  answer:'Children of poor rural families, and girls more often than boys',
  hint:'Combine the cost of the fee with the cost of getting to the school each day.',
  explanation:'Cost and distance worked together, and where a family could send only one child it was usually a son. Living in or near a town, or having an older relative already at a college, made continuing more likely rather than less — those options invert the pattern.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-087', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:2,
  question:'Give the two-word term for the movement of a person or a family from one social class to another, for example through education.',
  answer:'social mobility', alsoAccept:['Social mobility','mobility','upward mobility','social mobilty'],
  hint:'The first word says where the movement happens; the second says that it moves.',
  explanation:'Movement between classes is <b>social mobility</b>, and free secondary education is the measure most often credited with opening it up in Mauritius. Pupils sometimes write "migration": that word describes movement between places, not between social positions.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-088', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:3,
  question:'Why did fee-paying secondary schooling tend to keep families in the same social position generation after generation?',
  options:['Only families with money could buy the qualifications that led to better pay',
           'Children of poor families were forbidden by law from entering any college',
           'Employers of the period refused to consider anyone who had left school early',
           'Qualifications gained at a private college were not recognised by the state'],
  answer:'Only families with money could buy the qualifications that led to better pay',
  hint:'Follow the chain from the fee to the certificate to the job.',
  explanation:'Income decided who obtained the certificates, the certificates decided who obtained the better-paid work, and that income then paid the next generation\'s fees. No law barred poor children; the barrier was cost, which is harder to see and harder to challenge.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-089', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:3,
  question:'Making secondary education free created a problem of its own for the government. What was it?',
  options:['Far more pupils arrived, so classrooms and teachers were suddenly short',
           'Fewer pupils arrived, because families no longer valued what cost nothing',
           'Private colleges closed at once, leaving no secondary schools of any kind',
           'Primary schools emptied, since pupils moved straight to secondary school'],
  answer:'Far more pupils arrived, so classrooms and teachers were suddenly short',
  hint:'Ask what happens to demand when a price falls to nothing.',
  explanation:'Removing the fee brought in pupils who had been priced out, so buildings, textbooks and trained teachers had to be found quickly. Private colleges continued, and pupils still had to complete primary school first, so the other options do not follow.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-090', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:3,
  question:'Why was education treated as central to the economic plans of a country with no minerals and little land?',
  options:['Trained people were the one resource the island could actually increase',
           'Educated workers cost an employer far less than untrained workers do',
           'Schooling was the cheapest of all the services a government provides',
           'A country with a school system is exempt from paying duty on exports'],
  answer:'Trained people were the one resource the island could actually increase',
  hint:'List the resources the island had. Which of them can a policy add to?',
  explanation:'Land and minerals are fixed, but skill can be produced, which is why education was treated as the island\'s development strategy rather than as a cost. Trained workers generally cost more, not less, and no export rule of that kind exists.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-091', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:4,
  question:'Two pupils of equal ability finish primary school in 1970. One family can pay secondary fees; the other cannot. What is the most likely outcome, and what does it show?',
  options:['Only the first continues, showing that income and not ability decided',
           'Both continue, showing that ability alone decided who went on to study',
           'Neither continues, showing that the fee kept every family out equally',
           'Only the second continues, showing that poorer pupils were given priority'],
  answer:'Only the first continues, showing that income and not ability decided',
  hint:'The two pupils differ in one thing only. Follow that difference forward.',
  explanation:'Holding ability constant makes the effect of the fee visible: the gate was money, not merit, which is what the reform of 1977 was aimed at. The narrow examination route existed, but it admitted only a handful and so did not change the general pattern.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-092', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:4,
  question:'In the 1970s a planter argues that paying for secondary education for all is money the country cannot spare. Which is the strongest argument against him?',
  options:['New industries need educated workers, and nowhere else will supply them',
           'Schooling costs a government very little once the buildings have been put up',
           'A country that educates its children never has to pay for anything further',
           'Sugar estates would be able to employ far more cane cutters than they do now'],
  answer:'New industries need educated workers, and nowhere else will supply them',
  hint:'Answer the "cannot spare" claim by saying what the spending buys.',
  explanation:'Education was the input the EPZ factories, services and later the financial sector required, so the spending was an investment rather than a cost — the island had no other way of supplying skill. Schooling is expensive to run, and more cane cutters is an argument for the planter, not against him.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-093', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:4,
  question:'After fees were abolished, some children still did not reach secondary school. Which explanation fits that best?',
  options:['Uniform, books and daily transport still had to be paid for by the family',
           'Schools refused entry to any pupil whose family had not paid a fee before',
           'The law continued to require a fee from families living in rural districts',
           'Children were not permitted to change schools once the reform had arrived'],
  answer:'Uniform, books and daily transport still had to be paid for by the family',
  hint:'Abolishing one cost does not abolish the others.',
  explanation:'Free tuition removes the fee but not the other costs of attending, and for a family far from a college the daily fare alone could decide the matter — which is why free student transport mattered. No rule kept out pupils whose families had once paid, and the abolition applied everywhere.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-094', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:4,
  question:'A pupil writes that before 1977 no child from a poor family ever reached secondary school. Which response is best?',
  options:['Too strong — a few won places by examination, but very few could do so',
           'Correct — the fee made it completely impossible for any poor family here',
           'Too weak — in fact most poor children of the period did reach a college',
           'Correct — poor children were legally barred from entering any secondary school'],
  answer:'Too strong — a few won places by examination, but very few could do so',
  hint:'Ask whether the barrier was absolute or merely very high.',
  explanation:'The competitive examination did let a small number through, so "never" overstates it — but the number was tiny, so the claim is exaggerated rather than the opposite of the truth. History questions usually reward the measured answer over the sweeping one.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-095', chapterId:'g9sms-living-conditions', subsection:'education_before_reform', difficulty:4,
  question:'A ministry wants to know whether the 1977 reform really widened access. Which evidence would answer that best?',
  options:['How many pupils from low-income families now continue after primary school',
           'How many pupils in total sat the school examinations in the following year',
           'How many new secondary school buildings were opened across the whole island',
           'How much money the government spent on education in the following decade'],
  answer:'How many pupils from low-income families now continue after primary school',
  hint:'The claim is about who gets in. Which figure is about who?',
  explanation:'Access is a question about <i>which</i> children continue, so the measure has to be broken down by family income; a rising total could come from a larger population alone. Buildings and spending are inputs — they show effort, not whether the gate actually opened.' }));

// ── strike_1975 — 15 items (L1 2 · L2 5 · L3 3 · L4 5) ─────────────────────

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-096', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:1,
  question:'The student movement of 1975 is remembered by the date of its largest march, in the month of May. Give the day of the month.',
  answer:20,
  hint:'The date is used as the name of the movement itself.',
  explanation:'The march took place on the <b>20th</b> of May 1975, and the movement is usually called by that date. Pupils sometimes give the year instead of the day; read which part of the date a question is asking for before answering.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-097', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:1,
  question:'Which TWO things did the students of 1975 mainly demand?',
  options:['Free secondary education, and free transport to reach the schools',
           'Free university places abroad, and a lower age for leaving school',
           'Shorter school days, and an extra week of holiday in every term',
           'New school buildings, and a new examination at the end of primary'],
  answer:'Free secondary education, and free transport to reach the schools',
  hint:'Both demands are about the cost of getting an education, not its content.',
  explanation:'The movement demanded <b>free secondary education</b> and <b>free transport</b>, and both were granted within a few years. The other options ask about conditions inside school; the 1975 demands were about who could afford to be there at all.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-098', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
  question:'Give the two-word term for an organised group of people acting together over a period of time to change a law or a policy.',
  answer:'social movement', alsoAccept:['Social movement','a social movement','movement'],
  hint:'The second word describes what the group does; the first says where it acts.',
  explanation:'An organised, lasting campaign for change is a <b>social movement</b>, and the events of 1975 are taught as a Mauritian example of one. Pupils sometimes answer "riot": a riot is sudden, disorganised and has no stated aim, which is the opposite of a movement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-099', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
  question:'Where was the march of 20 May 1975 halted?',
  options:['At the bridge at Grand River North West, on the way into Port Louis',
           'At the gates of the Royal College in Curepipe, where it had started',
           'At the airport, which the marchers had intended to occupy that day',
           'At the harbour in Port Louis, where the ships were being unloaded'],
  answer:'At the bridge at Grand River North West, on the way into Port Louis',
  hint:'The marchers were stopped before they could enter the capital.',
  explanation:'The march was stopped at the <b>Grand River North West bridge</b>, the crossing into Port Louis, and the confrontation there is the moment most remembered. The marchers were heading for the capital, so a halt at the school where they set out does not fit the account.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-100', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
  question:'Which benefit for students followed the movement of 1975?',
  options:['Free travel on the buses for pupils going to and from school',
           'Free meals served every day in all the secondary schools here',
           'Free textbooks issued to every pupil at the start of each year',
           'Free places at overseas universities for every pupil who passed'],
  answer:'Free travel on the buses for pupils going to and from school',
  hint:'It answered the part of the demand that was about reaching the school.',
  explanation:'<b>Free bus travel</b> for students was introduced, which removed the daily fare that kept many children from a distant college. Meals, books and overseas places are all real education policies, but none of them was the outcome of the 1975 movement.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-101', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
  question:'Which major reform followed two years after the events of May 1975?',
  options:['Secondary education was made free throughout the country',
           'Primary education was made compulsory for every child here',
           'The school leaving age was raised to eighteen for all pupils',
           'A new university was opened to replace the overseas colleges'],
  answer:'Secondary education was made free throughout the country',
  hint:'It was the larger of the students\' two demands.',
  explanation:'Free secondary education arrived in <b>1977</b>, two years after the march, and it is the change the movement is remembered for. The other options are genuine education policies of other periods, which makes them tempting if the date is not checked.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-102', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:2,
  question:'A workers\' strike withholds labour from an employer. What did a student strike withhold, and from whom?',
  options:['Attendance, from schools that depended on pupils turning up each day',
           'Wages, from the employers who were paying the pupils for their work',
           'Taxes, from a government that collected them directly from the pupils',
           'Rent, from the owners of the buildings in which the schools were held'],
  answer:'Attendance, from schools that depended on pupils turning up each day',
  hint:'Ask what a pupil actually has that can be withheld.',
  explanation:'Students have no wages or labour to withdraw, so they withheld their <b>presence</b>, which stopped the schools running and made the demand impossible to ignore. Pupils pay no wages and collect no rent, so the other options describe things they never held.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-103', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:3,
  question:'Why could thousands of students together achieve what an individual pupil writing a letter could not?',
  options:['Numbers made the demand impossible to overlook or to quietly set aside',
           'A letter from a pupil is not legally allowed to reach a serving minister',
           'Students acting together were permitted to vote in that year\'s election',
           'One pupil always asks for less than a large group of pupils would ask for'],
  answer:'Numbers made the demand impossible to overlook or to quietly set aside',
  hint:'Ask what changes when the same request arrives from thousands at once.',
  explanation:'Collective action converts a private request into a public issue that a government has to answer, which is why social movements organise rather than petition individually. No rule stops a pupil writing to a minister, and the students were not voters at the time.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-104', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:3,
  question:'Why is 1975 taught as an example of change coming from below rather than from above?',
  options:['The demand came from citizens first, and the government answered it',
           'The government proposed the reform first, and students then supported it',
           'The reform was imposed by Britain, which still governed education then',
           'The change was ordered by the courts after a case brought by a school'],
  answer:'The demand came from citizens first, and the government answered it',
  hint:'Ask who raised the demand and who responded to it.',
  explanation:'The sequence is what matters: pressure was created by students, and policy followed, which is the shape of change driven from below. Had the reform been announced first, or imposed by an outside power, 1975 would illustrate something quite different.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-105', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:3,
  question:'Why did the students demand free transport as well as free tuition?',
  options:['A pupil who cannot afford the fare cannot use a free school place',
           'Buses were the only service the government was able to make free',
           'Free transport was cheaper for the state than free schooling would be',
           'The bus companies had asked the students to campaign on their behalf'],
  answer:'A pupil who cannot afford the fare cannot use a free school place',
  hint:'Think about a child living an hour\'s journey from the nearest college.',
  explanation:'Access needs both: abolishing the fee is useless to a family that cannot pay the daily fare to reach the school. The students were arguing about the <i>whole</i> cost of attending, which is why the two demands were made together rather than one after the other.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-106', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:4,
  question:'Student leaders in 1975 must choose between sending a petition and organising a march. What does the march gain, and what does it risk?',
  options:['It gains public attention; it risks confrontation and injury on the day',
           'It gains legal force; it risks nothing, since marching is always allowed',
           'It gains money for the campaign; it risks the loss of a whole school year',
           'It gains a seat in parliament; it risks the closure of the schools for good'],
  answer:'It gains public attention; it risks confrontation and injury on the day',
  hint:'Weigh what each method does to the size of the audience, and at what cost.',
  explanation:'A march makes the demand visible to the whole country and hard to file away, but it puts people in the street where a confrontation can occur, as happened at the bridge. A march carries no legal force and wins no seats — its power is entirely public pressure.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-107', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:4,
  question:'A pupil argues that the 1975 movement failed, because the march was stopped before it reached Port Louis. Which is the best evaluation?',
  options:['Wrong — a movement is judged by the policy it changes, and this one did',
           'Right — a march that does not reach its destination has achieved nothing',
           'Wrong — the march did in fact reach the capital later on that same day',
           'Right — the reforms of that decade had been decided before the march'],
  answer:'Wrong — a movement is judged by the policy it changes, and this one did',
  hint:'Ask what the students were actually trying to obtain.',
  explanation:'The aim was free secondary education and transport, and both followed within two years, so the movement succeeded even though the march itself was halted. Measuring a campaign by whether the crowd arrived somewhere confuses the method with the goal.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-108', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:4,
  question:'Trace the link between May 1975 and the reform of 1977. Which chain is correct?',
  options:['Students act publicly, the issue becomes national, the government responds',
           'The government announces a reform, and students march to give it support',
           'Britain instructs Mauritius to reform, and the students march to resist it',
           'Employers ask for trained workers, and students march to be trained first'],
  answer:'Students act publicly, the issue becomes national, the government responds',
  hint:'Put the three steps in the order they actually happened.',
  explanation:'The order is demand, public pressure, then policy: the march forced the question onto the national agenda and the reform followed in 1977. Reversing the order turns a movement into a supporting act, which is not what the evidence of the period shows.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-109', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:4,
  question:'What makes the events of 1975 a social movement rather than a disturbance?',
  options:['They were organised, went on for a period, and pursued a stated aim',
           'They involved large numbers of people gathered in one place at once',
           'They were reported at length in the newspapers of that particular year',
           'They ended without any agreement being reached between the two sides'],
  answer:'They were organised, went on for a period, and pursued a stated aim',
  hint:'Three features separate a movement from a crowd. Numbers is not one of them.',
  explanation:'Organisation, duration and a declared goal are what define a social movement; a disturbance may be just as large but has none of the three. Newspaper coverage records an event without telling you what kind of event it was.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-110', chapterId:'g9sms-living-conditions', subsection:'strike_1975', difficulty:4,
  question:'A visitor is told that the 1975 movement was only about the price of a bus ticket. Which reply is best?',
  options:['The fare was one demand; the larger one was who may attend a secondary school',
           'That is accurate, since free bus travel was the only change that ever followed',
           'That is accurate, since school fees had already been abolished some years before',
           'The fare was never mentioned; the movement was about examinations and marking'],
  answer:'The fare was one demand; the larger one was who may attend a secondary school',
  hint:'Ask what the two demands had in common.',
  explanation:'Fares and fees were both barriers to attending, and the movement attacked both — free secondary education in 1977 was the larger outcome. Fees had not been abolished before 1975, which is precisely why the students were marching.' }));

// ═══════════════════════════════════════════════════════════════════════════
//  CHAPTER 3 — g9sms-economy-1960s
// ═══════════════════════════════════════════════════════════════════════════

// ── sugar_dependence — 12 items (L1 2 · L2 4 · L3 2 · L4 4) ────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-111', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:1,
  question:'Give the word for a farming system in which one single crop is grown over almost all of a country\'s cultivated land.',
  answer:'monoculture', alsoAccept:['Monoculture','monocrop','mono-culture','monocropping','monoculture farming'],
  hint:'The first part of the word tells you how many crops there are.',
  explanation:'Growing one crop across the whole farmed area is <b>monoculture</b>, and Mauritian cane is the standard example of it. Pupils sometimes answer "agriculture": that is farming of any kind, and it says nothing about how many different crops are grown.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-112', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:1,
  question:'In the 1960s Mauritius had to buy rice, flour, fuel and machinery from abroad. What did it sell abroad to pay for them?',
  options:['Sugar','Coal','Cotton cloth','Motor vehicles'],
  answer:'Sugar',
  hint:'It is the crop that covered most of the farmland at the time.',
  explanation:'Almost all foreign earnings came from <b>sugar</b>, which is what made the dependence so risky: one crop paid for every import. Cotton cloth is the tempting answer because clothing later became a major export, but that came with the EPZ after 1970.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-113', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
  question:'Give the word for goods that a country sells to buyers in other countries.',
  answer:'exports', alsoAccept:['Exports','export','exportation'],
  hint:'Its opposite names the goods that come into the country instead.',
  explanation:'Goods sold abroad are <b>exports</b>, and sugar made up almost all of Mauritian exports at independence. The opposite word, imports, names what comes in — rice, flour, fuel and machinery, all of which had to be paid for out of export earnings.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-114', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
  question:'Which country was the main buyer of Mauritian sugar at the time of independence?',
  options:['Britain','India','South Africa','Australia'],
  answer:'Britain',
  hint:'It was the colonial power, and it bought under a Commonwealth agreement.',
  explanation:'<b>Britain</b> took most of the crop under a Commonwealth arrangement that set a quota and a price, which is one reason Mauritius chose to stay in the Commonwealth. India is the tempting answer because of the strength of other links, but the sugar went to Britain.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-115', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
  question:'Economists of the period worried about Mauritius earning enough "foreign exchange". What does that term mean?',
  options:['The money of other countries, which is needed in order to buy imports',
           'The money a government raises from taxing the people of its own country',
           'The money that families send home from relatives working in other lands',
           'The money a country borrows from a bank in order to pay its own workers'],
  answer:'The money of other countries, which is needed in order to buy imports',
  hint:'Ask what a seller in another country will actually accept as payment.',
  explanation:'A foreign seller wants a currency they can use, so imports have to be paid for in <b>foreign exchange</b> earned by exporting. The third option describes remittances, which are one source of foreign exchange rather than a definition of it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-116', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
  question:'Estate work in the 1960s was seasonal. What was the "intercrop" period?',
  options:['The months between harvests, when there was little work on the estates',
           'The months of harvest itself, when every worker was needed in the fields',
           'The period in which a second crop was planted between the rows of cane',
           'The period each year in which the sugar factories were being rebuilt again'],
  answer:'The months between harvests, when there was little work on the estates',
  hint:'The prefix tells you it falls between two of something.',
  explanation:'The <b>intercrop</b> is the gap between harvests, when labour was barely needed and many workers had no income at all. Seasonal idleness of this kind is one of the reasons a single-crop economy leaves so many people underemployed for much of the year.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-117', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:3,
  question:'Why did a fall in the world price of sugar hit the whole country rather than only the planters?',
  options:['Lower earnings meant less to spend on imports, on wages and on services',
           'The government was obliged by law to pay planters the difference in full',
           'A price fall raises the cost of cane, so the shops put up all their prices',
           'Every Mauritian family owned a share in one or other of the sugar estates'],
  answer:'Lower earnings meant less to spend on imports, on wages and on services',
  hint:'Follow the money from the crop outwards to everyone else.',
  explanation:'Export earnings paid for imports, for wages and for the taxes that funded services, so a price fall travelled through the whole economy. That is what dependence on a single export means — there is nothing else earning to cushion the fall.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-118', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:3,
  question:'Why did a severe cyclone threaten the government\'s finances and not only the harvest?',
  options:['A damaged crop earns less abroad, so the taxes it produces fall as well',
           'Cyclone damage is paid for by the government out of the following harvest',
           'A cyclone forces the government to buy the entire crop at a fixed price',
           'Estates stop paying any wages, so the government must employ the workers'],
  answer:'A damaged crop earns less abroad, so the taxes it produces fall as well',
  hint:'Ask where the government\'s revenue came from in a one-crop economy.',
  explanation:'When the crop is the main source of export earnings it is also a main source of revenue, so the storm cuts the government\'s income exactly when relief spending rises. Diversifying reduces this danger by giving the country more than one thing to earn from.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-119', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:4,
  question:'A planter in 1962 argues that the colony should plant still more cane rather than open factories. Which is the strongest argument against him?',
  options:['More cane deepens the dependence that already makes the island so exposed',
           'Cane cannot be grown on any more land, since every field is already planted',
           'Factories employ many more people than a sugar estate of the same size does',
           'Sugar was about to be banned from sale in the markets of western Europe then'],
  answer:'More cane deepens the dependence that already makes the island so exposed',
  hint:'Ask what the proposal does to the weakness everyone had already identified.',
  explanation:'The problem was not too little sugar but too much reliance on it, so expanding cane makes the vulnerability worse. Cane land could still be extended, sugar was not facing a ban, and factory employment is an argument for industry rather than against more cane.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-120', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:4,
  question:'The world price of sugar falls sharply for two years running. In a one-crop economy, which effect should be expected first?',
  options:['Imported rice, flour and fuel become harder for the country to pay for',
           'The area planted with cane falls to nothing within those same two years',
           'Wages in the factories of the export zone rise to make up the difference',
           'The population starts to grow faster because families remain in the villages'],
  answer:'Imported rice, flour and fuel become harder for the country to pay for',
  hint:'Export earnings buy something. Ask what stops arriving when they fall.',
  explanation:'Falling export earnings mean less foreign exchange, and the first strain shows in the essential imports the island cannot produce. Cane fields are not abandoned in two seasons, and lower earnings push wages down rather than up.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-121', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:4,
  question:'A guaranteed quota and price from Britain protected Mauritian sugar. A pupil concludes that the country therefore faced no risk at all. Which response is best?',
  options:['Unsound — the agreement could be changed, and a cyclone still ruins a crop',
           'Sound — a guaranteed price removes every danger a sugar producer can face',
           'Unsound — the agreement in fact covered only a very small part of the crop',
           'Sound — Britain was obliged to buy the crop whatever quantity was produced'],
  answer:'Unsound — the agreement could be changed, and a cyclone still ruins a crop',
  hint:'List the dangers a fixed price protects against, and the ones it does not.',
  explanation:'A guaranteed price protects against the world market, but not against a cyclone, a disease in the cane, or a change of policy by the buyer — all of which remained real. Depending on one buyer as well as one crop concentrates the risk rather than removing it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-122', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:4,
  question:'After a record harvest a commentator says the sugar figures prove the Mauritian economy of the 1960s was healthy. Which is the best evaluation?',
  options:['Weak — a good year in one crop says nothing about the years that follow',
           'Strong — a record harvest is the clearest evidence an economy can offer',
           'Weak — sugar output had in fact been falling steadily throughout the 1960s',
           'Strong — a country that exports a great deal cannot have any unemployment'],
  answer:'Weak — a good year in one crop says nothing about the years that follow',
  hint:'Ask whether the evidence is about this year or about the structure of the economy.',
  explanation:'Health here means being able to withstand a bad year, and a single good harvest measures the weather rather than the structure. Unemployment was high through the decade despite good crops, so a large export figure plainly does not rule it out.' }));

// ── obstacles — 12 items (L1 2 · L2 3 · L3 2 · L4 5) ───────────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-123', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:1,
  question:'Give the word for the condition of people who are able and willing to work but cannot find any job.',
  answer:'unemployment', alsoAccept:['Unemployment','unemployed','joblessness'],
  hint:'It names the problem, not the people.',
  explanation:'The condition is <b>unemployment</b>, and it was the obstacle that worried the planners of the 1960s most. Pupils sometimes answer "poverty": poverty describes not having enough, which can affect a person who is in work as well as one who is not.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-124', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:1,
  question:'Which feature of the island\'s position on the map added to the cost of everything it traded?',
  options:['It lies far from the large markets of Europe, Asia and America',
           'It lies in the path of the shipping lanes that cross the Atlantic',
           'It shares a long land border with a much larger neighbour state',
           'It lies close to the large coal and iron fields of southern Africa'],
  answer:'It lies far from the large markets of Europe, Asia and America',
  hint:'Ask how far a ship has to travel to reach a buyer or a supplier.',
  explanation:'Remoteness adds freight cost to every import and every export, which is a permanent charge on a small island economy. Mauritius has no land border at all, and it is not near the coal and iron fields that helped other countries industrialise.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-125', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:2,
  question:'Which obstacle of the 1960s followed directly from the fall in the death rate ten years earlier?',
  options:['A rapidly growing workforce that the economy could not absorb',
           'A shortage of young workers, which held back the sugar harvest',
           'A shortage of doctors, because so many people had become ill',
           'A fall in the number of children entering the primary schools'],
  answer:'A rapidly growing workforce that the economy could not absorb',
  hint:'Follow the children who survived the 1950s into the 1960s.',
  explanation:'The children who survived after malaria was eradicated reached working age in the 1960s, so the number seeking work grew far faster than the number of jobs. The last two options describe a shrinking young population, which is the opposite of what happened.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-126', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:2,
  question:'Planners said the "domestic market" of Mauritius was small. What did they mean?',
  options:['There were too few buyers here for a factory to sell in large quantities',
           'There were too few shops here that were willing to stock any local goods',
           'There was too little land here on which a large factory could be built at all',
           'There were too few ships calling here to carry goods out to other countries'],
  answer:'There were too few buyers here for a factory to sell in large quantities',
  hint:'The domestic market is the set of customers inside the country.',
  explanation:'A small population means a small number of customers, so a factory serving only Mauritius cannot produce on a scale that brings its costs down. Land and shipping were real constraints too, but the phrase itself refers to how many people there are to buy.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-127', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:2,
  question:'Which resource, used by many countries to build up industry, does Mauritius simply not possess?',
  options:['Minerals and fuels such as coal, iron ore and oil',
           'Land that can be cultivated for a commercial crop',
           'A deep harbour from which cargo may be shipped out',
           'A workforce willing to be trained for factory employment'],
  answer:'Minerals and fuels such as coal, iron ore and oil',
  hint:'Ask which of the four the island has had to import for its whole history.',
  explanation:'Mauritius has no <b>mineral or fuel deposits</b> and must import every drop of oil it burns. It does have cultivable land, a deep harbour at Port Louis and a large young workforce — the three assets that the industrial strategy after 1970 was built on.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-128', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:3,
  question:'Why does a small home market limit how cheaply a factory can produce?',
  options:['Fixed costs are spread over few goods, so each one carries a large share',
           'A small market forces a factory to pay much higher wages to its workers',
           'Factories serving few customers are charged a higher rate of import duty',
           'Machines wear out faster when they are used for only a short run of goods'],
  answer:'Fixed costs are spread over few goods, so each one carries a large share',
  hint:'Think about the cost of the building and the machines, however much is made.',
  explanation:'Buildings and machinery cost the same whether a factory makes a hundred items or a hundred thousand, so a short run makes every unit expensive. This is why producing for export, where the market is far larger, was the way past the obstacle.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-129', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:3,
  question:'Why did the emigration of qualified people worry the government of the new country?',
  options:['The island lost the doctors, teachers and engineers it had paid to train',
           'The island lost population, and a smaller population cannot be governed',
           'Emigrants were required to take a share of the national wealth with them',
           'Emigration was forbidden by the constitution adopted at independence then'],
  answer:'The island lost the doctors, teachers and engineers it had paid to train',
  hint:'Ask what is lost when a trained person leaves, beyond one more person going.',
  explanation:'Skill is the resource a country with no minerals depends on, and training it is expensive, so departures cost twice over. Emigration was never forbidden, and a falling population is a problem for the skills it takes away rather than for governing as such.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-130', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:4,
  question:'An adviser must propose an industry for a small island with no minerals, high freight costs and many young workers. Which proposal fits those conditions best?',
  options:['Clothing, where the value lies in the work rather than in the raw material',
           'Steel making, which would use the island\'s own ore and its own coal seams',
           'Cement making, which needs heavy raw materials brought in by ship each week',
           'Ship building, which needs a very large and highly experienced skilled workforce'],
  answer:'Clothing, where the value lies in the work rather than in the raw material',
  hint:'With high freight costs, ask how much of the product\'s value is raw material.',
  explanation:'Light goods with a high value relative to their weight carry freight well, and their cost lies mostly in labour, which the island had in abundance — which is what the EPZ actually built. Steel and cement move great weights, and Mauritius has neither ore nor coal.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-131', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:4,
  question:'A commentator of the 1960s claims the variety of the island\'s population was the main obstacle to development. Which is the best evaluation?',
  options:['Weak — the economic obstacles were the binding ones, and variety became a strength',
           'Strong — a country of several communities can never build a single economy',
           'Weak — the population of the island was in fact of one single origin then',
           'Strong — the obstacles named by economists all turned out to be imaginary'],
  answer:'Weak — the economic obstacles were the binding ones, and variety became a strength',
  hint:'Ask which obstacles actually limited what the economy could do.',
  explanation:'What constrained the island was a single crop, a small market, remoteness and a growing workforce; the varied population later supplied the language skills and overseas links the export economy used. The third option is simply false about Mauritius.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-132', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:4,
  question:'Unemployment is high and the workforce is still growing quickly. Which policy attacks the cause rather than the symptom?',
  options:['Creating industries that add new jobs year after year as the workforce grows',
           'Paying an allowance to each person who is registered as being out of any work',
           'Employing more people in the offices of the government departments each year',
           'Persuading the sugar estates to share the same work between far more workers'],
  answer:'Creating industries that add new jobs year after year as the workforce grows',
  hint:'Ask which measure is still working when the workforce is larger again next year.',
  explanation:'Only new productive work keeps pace with a growing workforce; allowances, extra office posts and sharing out existing estate work relieve hardship without adding to what the country produces. That is the reasoning behind the industrial strategy of 1970.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-133', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:4,
  question:'Several obstacles faced Mauritius in the 1960s. Which PAIR was dangerous mainly because the two occurred together?',
  options:['One export crop, and a workforce growing faster than jobs could be made',
           'A distant location, and a harbour capable of taking very large vessels',
           'A young population, and a school system open to those who could pay',
           'A small land area, and a climate suited to growing sugar cane all year'],
  answer:'One export crop, and a workforce growing faster than jobs could be made',
  hint:'Ask which two, taken separately, a country could manage — but not together.',
  explanation:'A single crop is survivable while the population is steady, and a growing workforce is an asset where industries are expanding; together they mean more people every year competing for work in an economy that cannot grow any faster. The other pairs mix an obstacle with an advantage.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-134', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:4,
  question:'A cyclone destroys much of the cane crop in a year when the economy depends on sugar alone. Trace the chain of consequences correctly.',
  options:['Exports fall, foreign exchange falls, imports and government revenue are squeezed',
           'Exports fall, so the world price of sugar falls, and imports become much cheaper',
           'Exports fall, so estates employ more workers to replant, and unemployment ends',
           'Exports rise, because the crop that survives can be sold at a far higher price'],
  answer:'Exports fall, foreign exchange falls, imports and government revenue are squeezed',
  hint:'Follow the crop to the earnings, and the earnings to what they are spent on.',
  explanation:'A smaller crop earns less abroad, which leaves less foreign exchange for imports and less revenue for the state, exactly when relief is needed. A small island\'s crop is far too small a part of world supply to move the world price, so the second chain cannot happen.' }));

// ── predictions — 16 items (L1 2 · L2 5 · L3 4 · L4 5) ─────────────────────

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpa-135', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:1,
  question:'In which year did the economist James Meade report on the social and economic structure of Mauritius? Give the year only.',
  answer:1961,
  hint:'It was seven years before independence.',
  explanation:'The report appeared in <b>1961</b>, well before independence, and its warnings shaped the policies the new country adopted. Pupils often answer 1968: the report was not a reaction to independence, it was one of the reasons the arguments about the future were so sharp.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-136', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:1,
  question:'Which economist led the team whose 1961 report warned about the future of Mauritius?',
  options:['James Meade','Adam Smith','John Maynard Keynes','David Ricardo'],
  answer:'James Meade',
  hint:'He visited the island itself and later won a Nobel prize in economics.',
  explanation:'<b>James Meade</b> led the 1961 report. The other three are famous economists who never wrote about Mauritius and who lived long before the 1960s, so the date in the question is enough to rule them out.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-137', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:2,
  question:'The 1961 report warned that one thing was growing faster than the economy could keep up with. What was growing?',
  answer:'population', alsoAccept:['Population','the population','population growth','number of people'],
  hint:'It is what the eradication of malaria had caused to rise so quickly.',
  explanation:'The warning was that the <b>population</b> was growing faster than the economy could create work for it. Pupils sometimes answer "unemployment": unemployment was the predicted <i>result</i>, and the report was tracing it back to its cause.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-138', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:2,
  question:'What outcome did the pessimistic forecasts of the early 1960s expect for Mauritius?',
  options:['Mass unemployment, falling living standards and possible unrest',
           'Rapid industrial growth, followed by a shortage of enough workers',
           'A large rise in sugar prices, making every other industry needless',
           'A fall in the population, leaving the estates without any labourers'],
  answer:'Mass unemployment, falling living standards and possible unrest',
  hint:'A growing workforce in a one-crop economy leads where?',
  explanation:'The forecasts expected too many workers for too few jobs, with falling living standards and social strain following from it. The other options describe the opposite problem — too few workers — which is a difficulty Mauritius met only decades later.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-139', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:2,
  question:'A well-known essay of the early 1970s described Mauritius as an "overcrowded barracoon". What impression did that phrase give?',
  options:['A crowded place with little hope of a future for its people',
           'A wealthy place whose people were living far beyond their means',
           'An empty place whose land had never been properly settled at all',
           'A peaceful place that outsiders had nothing at all to say about'],
  answer:'A crowded place with little hope of a future for its people',
  hint:'Both words in the phrase carry the same bleak suggestion.',
  explanation:'The phrase pictured an island too full of people and going nowhere, and it is quoted today precisely because the following decades disproved it. Reading it as a description of wealth or emptiness misses the pessimism the words were chosen to carry.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-140', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:2,
  question:'Every forecast rests on assumptions. What is an assumption?',
  options:['Something taken as true without being tested, on which a conclusion rests',
           'Something that has already been measured and confirmed by careful study',
           'Something a writer adds at the end of a report to summarise the findings',
           'Something that cannot possibly be checked, whatever evidence is gathered'],
  answer:'Something taken as true without being tested, on which a conclusion rests',
  hint:'Ask which part of an argument is accepted rather than demonstrated.',
  explanation:'An assumption is accepted rather than proved, and a forecast fails when one of them turns out to be wrong — as happened with the assumption that Mauritian families would stay large. Something already measured is evidence, which is a different thing entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-141', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:2,
  question:'What actually happened to Mauritius in the decades after the pessimistic forecasts were made?',
  options:['It built new export industries and its living standards rose steadily',
           'It abandoned farming entirely and depended on aid from other countries',
           'It lost most of its people to emigration and its towns emptied out fast',
           'It stayed exactly as the report had found it, with no change of any kind'],
  answer:'It built new export industries and its living standards rose steadily',
  hint:'Ask what the island is known for having achieved after 1970.',
  explanation:'Export manufacturing, tourism and later financial services were added to sugar, and incomes, health and schooling all improved — the change often called the Mauritian Miracle. Emigration continued, but nothing like the collapse the pessimists expected.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-142', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:3,
  question:'Why did forecasters in 1961 assume that Mauritian families would go on being large?',
  options:['Family size had been large for generations, and nothing yet suggested a change',
           'The government of the day had announced that it wanted a larger population',
           'Large families are required in every country that depends on growing a crop',
           'The report had been asked to assume it, and was not free to consider anything else'],
  answer:'Family size had been large for generations, and nothing yet suggested a change',
  hint:'A forecaster usually assumes that what has always happened will keep happening.',
  explanation:'Forecasts extend the past forward, and in 1961 there was no evidence yet of the fall in family size that education, family planning and rising incomes would bring. That is the ordinary weakness of prediction rather than a mistake by the writers.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-143', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:3,
  question:'A warning that leads a government to act, so that the predicted disaster never comes, is not simply a wrong prediction. Why not?',
  options:['The prediction changed the behaviour that would have brought it about',
           'The prediction was never published, so it could not have changed anything',
           'A prediction about people is always correct whatever happens afterwards',
           'A government cannot act on a forecast until the events have taken place'],
  answer:'The prediction changed the behaviour that would have brought it about',
  hint:'Ask what the government did after reading the warning.',
  explanation:'A warning acted upon becomes one of the reasons it does not come true, which is why the 1961 report is judged useful rather than mistaken. It was published, it was acted on, and the policies that followed were shaped directly by its argument.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-144', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:3,
  question:'The pessimists judged Mauritius mainly by what it possessed. Which factor did that approach undervalue?',
  options:['What a government and a trained population can choose to do with policy',
           'The quantity of cane that the island\'s farmland was capable of producing',
           'The distance in kilometres between the island and the markets of Europe',
           'The number of cyclones that cross the region in an average single season'],
  answer:'What a government and a trained population can choose to do with policy',
  hint:'Separate what a country has from what a country decides.',
  explanation:'Resources are fixed, but institutions, education and the choice of policy are not, and it was those that produced the transformation after 1970. Cane yields, distance and cyclones are all resource facts, which is exactly what the pessimistic method already counted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-145', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:3,
  question:'Why does a single indicator, such as the birth rate, make a poor basis for predicting a country\'s future?',
  options:['Other things move at the same time and can cancel out its effect entirely',
           'Birth rates are the only figure that no country is able to measure properly',
           'A single indicator is always out of date before it can ever be published',
           'An indicator describes only the past, and so it cannot be used for anything'],
  answer:'Other things move at the same time and can cancel out its effect entirely',
  hint:'Ask what else was changing in Mauritius while the birth rate was being watched.',
  explanation:'A high birth rate with no new industries is a crisis; the same birth rate alongside an export zone and rising schooling is not. Indicators do describe the past, but used together they are the material of any forecast — the error is relying on one alone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-146', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
  question:'The forecast of the early 1960s was reasonable on the facts then available, yet the outcome was quite different. Which assumption broke?',
  options:['That family size and the range of exports would both stay as they were',
           'That the island would remain in the Commonwealth after independence came',
           'That sugar would continue to be grown on the island throughout the period',
           'That the population of the island would go on living mainly in the villages'],
  answer:'That family size and the range of exports would both stay as they were',
  hint:'Find the two things the forecast held fixed that in fact changed.',
  explanation:'Families became smaller and the country added manufactured exports, so the arithmetic of more workers than jobs no longer held. The other three assumptions turned out broadly correct and therefore cannot explain why the forecast went wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-147', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
  question:'A pupil writes that the 1961 report was useless because its gloomy forecast did not come true. Which response is best?',
  options:['Unfair — it identified the real dangers, and the policies answering them worked',
           'Fair — a forecast that does not happen has told the country nothing whatever',
           'Unfair — the forecast did come true, and unemployment has stayed very high',
           'Fair — the report was written before independence and so could not apply here'],
  answer:'Unfair — it identified the real dangers, and the policies answering them worked',
  hint:'Ask what the report was for: predicting the future, or shaping it?',
  explanation:'The report named population growth and single-crop dependence correctly, and family planning and diversification were the answers to precisely those two. Judging a warning only by whether the disaster arrived ignores what was done in between.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-148', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
  question:'A commentator today predicts national decline from one worrying figure alone. What does the experience of the 1960s suggest about such a prediction?',
  options:['Treat it as a warning to act on, not as a description of what must happen',
           'Ignore it completely, since forecasts about a country are always mistaken',
           'Accept it fully, since a single clear figure is the most reliable evidence',
           'Delay any decision until the figure has been published for several decades'],
  answer:'Treat it as a warning to act on, not as a description of what must happen',
  hint:'Recall what Mauritius did with the warning it was given in 1961.',
  explanation:'The 1960s lesson is that forecasts describe a path, and policy can change the path — so a warning is most useful as a prompt to act. Dismissing forecasts entirely would have left the population and the single-crop problems untouched.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-149', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
  question:'A class wants to test whether the "overcrowded barracoon" description was fair. Which evidence would settle it best?',
  options:['Employment, schooling and income in the decades that followed the essay',
           'The number of copies of the essay that were sold around the world then',
           'The number of people per square kilometre living on the island that year',
           'The opinions of visitors who came to the island during that same period'],
  answer:'Employment, schooling and income in the decades that followed the essay',
  hint:'The claim was about having no future. What evidence is about a future?',
  explanation:'The phrase predicted hopelessness, so the test is what happened next to jobs, schooling and incomes — and those rose. Density alone cannot settle it, since crowded countries can prosper, and sales figures measure the essay rather than the island.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-150', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
  question:'A pupil concludes that the economists who warned about Mauritius were simply incompetent. Which is the best evaluation?',
  options:['Too harsh — their reasoning fitted the facts of 1961; the facts then changed',
           'Fair — any economist who is proved wrong has clearly not done the work well',
           'Too harsh — their forecast was in fact correct and the island did not develop',
           'Fair — they had never visited the island and so knew nothing at all about it'],
  answer:'Too harsh — their reasoning fitted the facts of 1961; the facts then changed',
  hint:'Judge the argument against what was known at the time it was made.',
  explanation:'On the evidence of 1961 the conclusion followed; what altered was family size, policy and access to export markets, none of which was visible then. The team did visit and study the island, and the island plainly did develop afterwards.' }));

// ── early_measures — 14 items (L1 2 · L2 4 · L3 3 · L4 5) ──────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-151', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:1,
  question:'Besides sugar cane, which crop was planted in the cooler, wetter highlands of the island to widen what the country produced? Its dried leaves are used to make a hot drink.',
  answer:'tea', alsoAccept:['Tea','tea plant','thé'],
  hint:'It grows where the land is too high and too wet for good cane.',
  explanation:'<b>Tea</b> was developed in the highlands as part of agricultural diversification, using land where cane grows poorly. Pupils sometimes answer coffee: coffee has been grown in the region, but it is tea that was planted on a large scale in the Mauritian uplands.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-152', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:1,
  question:'What was the aim of the family planning programme introduced in the 1960s?',
  options:['To help families choose to have fewer children, slowing population growth',
           'To move families from the crowded villages out towards the coastal areas',
           'To encourage larger families so that the estates would have enough workers',
           'To bring families from other countries in to settle on the unfarmed land'],
  answer:'To help families choose to have fewer children, slowing population growth',
  hint:'It answered the warning that had been given about the island\'s population.',
  explanation:'Family planning was aimed at the birth rate, so that the workforce would stop growing faster than the jobs available. The third option reverses the policy entirely: encouraging larger families would have deepened the very problem it was designed to relieve.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpa-153', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
  question:'Give the word for a tax placed on goods coming into a country, which makes imported goods dearer than local ones.',
  answer:'tariff', alsoAccept:['Tariff','tariffs','import duty','customs duty','duty'],
  hint:'It is charged at the port, on goods arriving from abroad.',
  explanation:'A tax on imports is a <b>tariff</b>, or import duty, and it was the tool that made import substitution possible. Pupils sometimes answer "quota": a quota limits the <i>quantity</i> allowed in, whereas a tariff lets any quantity in but raises its price.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-154', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
  question:'Under import substitution, where were the goods made in the new Mauritian factories sold?',
  options:['On the home market, to buyers living here in Mauritius itself',
           'On the export market, to buyers in Europe and in North America',
           'To the sugar estates alone, which were the only large customers',
           'To other island countries in the region, under a trade agreement'],
  answer:'On the home market, to buyers living here in Mauritius itself',
  hint:'The policy was named after the imports it was meant to replace.',
  explanation:'Import substitution makes at home the goods that were previously bought in, so the customers are local. Selling abroad is the opposite policy, and it is what the export zone of 1970 was created to do once the home market proved too small.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-155', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
  question:'Which other agricultural product was encouraged in this period to widen the range of what the island grew?',
  options:['Tobacco','Wheat','Rubber','Cocoa'],
  answer:'Tobacco',
  hint:'It was grown as a cash crop on land not given over to cane.',
  explanation:'<b>Tobacco</b> was encouraged alongside tea as part of agricultural diversification. Wheat is the tempting answer because Mauritius imports so much flour, but the island\'s warm, wet climate is unsuited to growing wheat at any useful scale.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-156', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
  question:'The early measures worked on two sides of the same problem at once. Which pair describes them?',
  options:['Slowing the growth of the workforce, and increasing the number of jobs',
           'Raising the birth rate steadily, and reducing the number of jobs needed',
           'Slowing the growth of the workforce, and reducing the number of schools',
           'Increasing the number of jobs, and encouraging workers to leave the island'],
  answer:'Slowing the growth of the workforce, and increasing the number of jobs',
  hint:'Unemployment has two sides: how many want work, and how much work there is.',
  explanation:'Family planning worked on how fast the workforce grew, while new industries worked on how many jobs existed — attacking the gap from both ends. Raising the birth rate or cutting schools would have made the same gap wider, not narrower.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-157', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:3,
  question:'Why did import substitution need a tariff on imported goods in order to work at all?',
  options:['A new small factory cannot yet match the price of a large foreign one',
           'A tariff is the only way a government can raise money for its own budget',
           'Imported goods were of far worse quality and had to be kept out of here',
           'Local factories were required by law to charge the very same price as well'],
  answer:'A new small factory cannot yet match the price of a large foreign one',
  hint:'Compare the costs of a new local producer with an established overseas one.',
  explanation:'Established producers making large quantities are cheaper, so without a tariff the new local factory would not sell anything. Tariffs do raise revenue, but that is a by-product; the purpose here was to give the new industry room to establish itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-158', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:3,
  question:'Why did import substitution reach its limit so quickly in Mauritius?',
  options:['Once local buyers had been supplied, there was nowhere further to grow',
           'The factories that had been built all failed within their very first year',
           'The government withdrew the tariffs again only months after imposing them',
           'The workers needed for the new factories could not be recruited anywhere'],
  answer:'Once local buyers had been supplied, there was nowhere further to grow',
  hint:'Ask how many customers the policy gave a factory, and what happens when it has them all.',
  explanation:'A small population is quickly supplied, and a factory selling only at home then has no room left to expand — the reason the export zone followed. The workforce was in fact plentiful, which is precisely why so many jobs were needed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-159', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:3,
  question:'Why do the effects of a family planning programme on unemployment take many years to appear?',
  options:['A child born today does not look for work for about fifteen years or more',
           'Programmes of this kind are always introduced slowly, district by district',
           'Employers refuse to take on any worker from a family that is a small one',
           'Population figures are collected once a decade and so cannot be seen sooner'],
  answer:'A child born today does not look for work for about fifteen years or more',
  hint:'Count the years between a birth and a first job.',
  explanation:'The policy changes how many people enter the labour market a generation later, so it could do nothing for the unemployment of the late 1960s — that needed jobs. The delay is built into the measure itself, not into how it was administered or counted.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-160', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:4,
  question:'A government in 1965 has money for one measure only: a family planning programme, or more classrooms for the children already born. Which argument is soundest?',
  options:['Do both in turn — the classrooms are needed now, the programme changes later years',
           'Only the programme matters, because classrooms will not be needed in the future',
           'Only the classrooms matter, because a birth rate cannot be changed by any policy',
           'Neither is worth doing, because the island cannot afford a policy of either kind'],
  answer:'Do both in turn — the classrooms are needed now, the programme changes later years',
  hint:'The two measures act on different groups of children at different times.',
  explanation:'The children already born must be taught whatever happens, while family planning changes the size of cohorts still to come — so the two are sequenced rather than swapped. Mauritius did both, which is why the crisis eased instead of repeating.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-161', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:4,
  question:'A tariff is placed on imported shoes so that a new Mauritian shoe factory can sell here. Trace the effects correctly.',
  options:['Imported shoes cost more, the local factory sells, and buyers pay more for shoes',
           'Imported shoes cost more, the local factory sells, and buyers pay less than before',
           'Imported shoes cost less, the local factory closes, and buyers pay less for shoes',
           'Imported shoes cost the same, the local factory sells, and the state loses revenue'],
  answer:'Imported shoes cost more, the local factory sells, and buyers pay more for shoes',
  hint:'Somebody gains from protection. Ask who pays for it.',
  explanation:'Protection works by raising the price of the import, so the local producer can compete — and the consumer pays the difference. That cost is the honest objection to import substitution, and it is why the policy is judged by whether the industry eventually stands alone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-162', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:4,
  question:'By the end of the 1960s the local market for new factory goods was close to full. What did that imply about the policy to be tried next?',
  options:['Factories would have to produce for buyers abroad instead of only at home',
           'Factories would have to be closed, since the home market could take no more',
           'Tariffs would have to be raised further so that buyers bought more locally',
           'Farmers would have to plant more cane so that exports could grow again'],
  answer:'Factories would have to produce for buyers abroad instead of only at home',
  hint:'If the market is the limit, ask which market has no such limit.',
  explanation:'Once local demand is satisfied, growth requires a bigger market, and the only bigger market is overseas — the reasoning behind the export zone of 1970. Higher tariffs cannot create extra customers, and returning to cane rebuilds the dependence just being escaped.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-163', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:4,
  question:'A pupil writes that the family planning programme solved the unemployment of the 1960s. Which is the best evaluation?',
  options:['Wrong — it eased the pressure a generation later; jobs solved it at the time',
           'Right — the workforce shrank immediately once the programme had been started',
           'Wrong — the programme had no effect at all on the island\'s population growth',
           'Right — employers were able to take on all the workers who were looking then'],
  answer:'Wrong — it eased the pressure a generation later; jobs solved it at the time',
  hint:'Check when each measure could first have had any effect.',
  explanation:'The workers unemployed in the 1960s had already been born, so the programme could not help them; the export factories of the 1970s did. The programme worked, but on the size of later cohorts, which is why both measures were needed together.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpa-164', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:4,
  question:'Land in the cool, wet highlands gives a poor cane crop. Planting tea there was a measure of the period. What does that decision illustrate?',
  options:['Using land for the crop that suits it, and earning from more than one export',
           'Abandoning sugar entirely in favour of a crop that is far more profitable',
           'Growing two crops on the same field so that each field produces much more',
           'Moving farmers up into the highlands so that the lowland estates could grow'],
  answer:'Using land for the crop that suits it, and earning from more than one export',
  hint:'Two separate gains come from the same decision. Name both.',
  explanation:'Land that grows poor cane can grow good tea, so output rises and the country gains a second export earner at the same time — diversification in practice. Sugar was not abandoned; tea was added on land cane was never suited to.' }));

})();
