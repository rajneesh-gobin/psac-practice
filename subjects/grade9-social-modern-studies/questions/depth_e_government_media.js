'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Social & Modern Studies — DEPTH BATCH E
//  Chapters: g9sms-government-welfare (examWeight 3) and g9sms-media (3).
//  IDs: g9sms-dpe-001 … g9sms-dpe-115. The block was taken because no id in
//  this pack begins g9sms-dpe- and six other batches were writing other
//  chapters of this same pack at the same time; the importer keys on id and a
//  collision would be silent.
//
//  ⚠ L4 HERE IS THE APPLIED BAND, NOT HARDER RECALL. Every difficulty-4 item
//    below gives a situation and asks for a decision, a consequence, a cause
//    to trace or a claim to judge. A question answerable by recognising a
//    definition is L1 or L2 however long its wording. A previous audit of this
//    pack had to relabel 34 items that failed exactly that test.
//
//  ⚠ MEDIA IS WHERE A FAKE L4 IS EASIEST TO WRITE. "Should you check your
//    sources?" has one socially obvious answer and measures nothing, so the
//    media L4s below either put two defensible courses side by side or ask
//    what FOLLOWS from a choice already made.
//
//  ⚠ NO PARTY-POLITICAL CONTENT AND NO LIVING PERSON IS NAMED. Institutions
//    and processes only. No rate, threshold or statistic is used that does not
//    already appear in this pack (VAT 15%, voting at 18, employment at 16,
//    pension at 60, a general election at most every five years, three members
//    per constituency in Mauritius); worked examples are flagged "Suppose".
//
//  Source: NCF / TLS Grades 7-9; docs/nce-grade9/blueprint-social-modern-
//  studies.md §7 — welfare, taxes and the MRA are asked 5 years out of 5, and
//  so are the types and roles of the media.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ══════════════════════════════════════════════════════════════════════════
//  GOVERNMENT, CITIZENSHIP & THE WELFARE STATE
// ══════════════════════════════════════════════════════════════════════════

// ── head_of_state_voting — g9sms-dpe-001 … 013 ────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-001', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:1,
  question:'On polling day a voter marks the ballot paper alone inside a booth, folds it, and drops it into a sealed box. What is this arrangement called?',
  options:['The secret ballot','The open ballot','The postal ballot','The second ballot'],
  answer:'The secret ballot',
  hint:'The point of the booth is that nobody else can see what was marked.',
  explanation:'Marking the paper unseen and folding it before it goes into the box is the <b>secret ballot</b>. It means no employer, neighbour or family member can check how a citizen voted, so a vote cannot be bought or punished. An open ballot would be the opposite arrangement, with the choice declared in public.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-002', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:1,
  question:'For a general election the country is divided into areas, and each area returns its own members to the National Assembly. What is one such area called?',
  options:['A constituency','A municipality','A ministry','A commission'],
  answer:'A constituency',
  hint:'The word names the voting area, not the council that collects the rubbish.',
  explanation:'The voting areas are <b>constituencies</b>, and the members they return sit in the National Assembly. A municipality is a unit of local government for a town, which is a different election with a different job; a ministry and a commission are not elected areas at all.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpe-003', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:2,
  question:'In a general election, each constituency in Mauritius returns the same number of members to the National Assembly. How many members is that?',
  answer:3,
  hint:'Each voter in Mauritius marks more than one name on the paper.',
  explanation:'Each Mauritian constituency is a <b>three-member</b> constituency, so a voter marks three names and the three candidates with the most votes are returned. That is why one constituency can send members of more than one party to the Assembly, which a single-member area could never do.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-004', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:2,
  question:'Mauritius elects its National Assembly by <b>universal adult suffrage</b>. What does that term mean?',
  options:['Every adult citizen may vote, whatever their wealth or job',
           'Every adult citizen must join a party before they may vote',
           'Every adult citizen votes again if the result is very close',
           'Every adult citizen is given a seat in the National Assembly'],
  answer:'Every adult citizen may vote, whatever their wealth or job',
  hint:'Break the phrase up: "universal" describes who is included, "suffrage" is the right itself.',
  explanation:'<b>Universal adult suffrage</b> means the vote belongs to every adult citizen, with no test of property, income, sex or education. Under colonial rule the franchise was restricted, so this is one of the clearest measures of how the political system changed. It says nothing about parties, recounts or seats.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-005', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:2,
  question:'After a general election, on what basis is a Prime Minister chosen?',
  options:['The member who commands the support of a majority of the Assembly',
           'The member who personally received the most votes in the country',
           'The member who has served in the Assembly for the longest period',
           'The member chosen by the outgoing Prime Minister as a successor'],
  answer:'The member who commands the support of a majority of the Assembly',
  hint:'Mauritius is a parliamentary republic, so ask who the Assembly will support, not who is personally most popular.',
  explanation:'The Prime Minister is head of government and must be able to command a <b>majority in the National Assembly</b>, because a government that cannot win votes there cannot govern. The biggest personal vote in one constituency is beside the point: it is the party grouping, not the individual total, that carries the Assembly.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-006', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:2,
  question:'Mauritius has an arrangement that awards a small number of extra seats to unsuccessful candidates so that minority communities are represented in the National Assembly. Write the <b>two-word</b> name of that system.',
  answer:'best loser', alsoAccept:['best-loser','the best loser','best loser system','best-loser system'],
  hint:'The name describes the candidates it helps: they did not win their seat, but they did well.',
  explanation:'The <b>best loser</b> system allots additional seats to candidates who were not elected in their constituency, so that the Assembly reflects the communities of the country and not only the arithmetic of the constituencies. It is a feature of the Mauritian Constitution and has no equivalent in most parliamentary systems.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-007', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:3,
  question:'Mauritius keeps the head of state and the head of government as two separate offices. What is the main reason for separating them?',
  options:['The State has a representative who stands above day-to-day politics',
           'The State can then be governed by two leaders of equal authority',
           'The State needs two signatures before any law may be passed at all',
           'The State saves money by dividing one large salary between the two'],
  answer:'The State has a representative who stands above day-to-day politics',
  hint:'Think about who should represent the whole country when the parties are arguing with one another.',
  explanation:'The President represents the Republic itself and is not running the government, so there is someone to speak for the State as a whole while the Prime Minister and the Cabinet carry out policy and answer to the Assembly. They are not two equal rulers: policy belongs to the head of government, not to the head of state.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-008', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:3,
  question:'The Constitution sets a maximum period after which a general election must be held. Why does a democracy set such a limit?',
  options:['Voters must be able to renew or withdraw their consent regularly',
           'Voters must be given a chance to change the Constitution itself',
           'Voters would otherwise forget which party they had voted for last',
           'Voters must approve each new law passed during the whole period'],
  answer:'Voters must be able to renew or withdraw their consent regularly',
  hint:'Ask what a government would no longer need to worry about if the date could be put off indefinitely.',
  explanation:'A fixed maximum term means power is only ever lent, and a government that loses the confidence of the country can be replaced at a known date. Without it there would be nothing to stop a government postponing the reckoning indefinitely. Elections choose members of the Assembly; they are not votes on individual laws or on the Constitution.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-009', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:3,
  question:'What is one consequence of a constituency returning <b>three</b> members instead of one?',
  options:['More than one party can win representation in the same area',
           'More than one candidate of a party is guaranteed to be elected',
           'Every voter in that area must vote for a single party list only',
           'Every result in that area is decided by the national vote total'],
  answer:'More than one party can win representation in the same area',
  hint:'Count how many names each voter marks, then ask whether they must all come from the same side.',
  explanation:'With three seats to fill, voters can spread their three marks, so a constituency may return candidates from different parties and a strong minority is not automatically silenced. A single-member area gives everything to whoever finishes first. Nothing is guaranteed to a party, and the count is local, not national.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-010', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:4,
  question:'A candidate is elected in her constituency, but her party wins few seats elsewhere and does not form the government. A pupil says she should give up her seat to the winning side. What is the correct response?',
  options:['She keeps it — her constituency chose her, whatever happened elsewhere',
           'She keeps it — but she may only vote when her own party is winning',
           'She gives it up — the Assembly must reflect the national result only',
           'She gives it up — a seat belongs to a party rather than to a member'],
  answer:'She keeps it — her constituency chose her, whatever happened elsewhere',
  hint:'Work out who actually cast the votes that elected her, and whether anybody else can undo that.',
  explanation:'Each seat is won in its own constituency by the voters who live there, so a national result cannot take it away. The Assembly is meant to contain the opposition as well as the government: members who did not form the government are the ones who question it. If seats moved to the winning side, scrutiny would disappear on the day of the count.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-011', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:4,
  question:'A residents\' association strongly opposes a new law. One member proposes writing to their elected members and campaigning publicly; another proposes simply refusing to obey the law. Which comparison is correct?',
  options:['Only the first can change the law, because the second changes nothing',
           'Only the second can change the law, because the first is always slow',
           'Both work equally, because a government counts protests and refusals',
           'Neither works, because a law once passed can never be amended again'],
  answer:'Only the first can change the law, because the second changes nothing',
  hint:'Ask which of the two actually reaches the body that has the power to amend or repeal a law.',
  explanation:'Only the National Assembly can amend or repeal a law, so pressure that reaches members — letters, petitions, lawful campaigning, and ultimately votes — is the route that can change it. Refusing to obey exposes the members to penalties and leaves the law standing word for word. Laws are amended regularly, so the last option is simply false.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-012', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:4,
  question:'A pupil argues: <i>"The President is head of state, so the President must be the one who decides how much money goes to the hospitals."</i> Why is this wrong?',
  options:['Spending is decided by the Cabinet and voted by the National Assembly',
           'Spending is decided by the Supreme Court once the budget is drafted',
           'Spending is decided by each hospital from the fees that it collects',
           'Spending is decided by the Mauritius Revenue Authority every year'],
  answer:'Spending is decided by the Cabinet and voted by the National Assembly',
  hint:'Separate the office that represents the Republic from the office that runs the government.',
  explanation:'Head of state and head of government are different jobs. Policy and public spending belong to the Cabinet led by the Prime Minister, and the Assembly votes the money. The MRA <i>collects</i> revenue and does not decide where it goes, and the courts settle disputes about the law rather than write budgets.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-013', chapterId:'g9sms-government-welfare', subsection:'head_of_state_voting', difficulty:4,
  question:'Votes are counted in a hall where agents of each candidate may watch. A pupil says counting them privately would be quicker and the total would be the same. What follows from counting in the open?',
  options:['A losing side has watched the count, so it can accept the result',
           'A losing side has watched the count, so it may demand a new vote',
           'A winning side is obliged to publish every ballot paper afterwards',
           'A winning side is obliged to share the seats with its opponents too'],
  answer:'A losing side has watched the count, so it can accept the result',
  hint:'The question is not whether the total would be correct. It is whether anyone outside the room could know that.',
  explanation:'An election has to be <i>believed</i> as well as counted. Agents watching the count means the losing side can confirm the figures itself, which is what makes a peaceful handover possible. A private count might produce the same number and still leave no way to answer an accusation, so speed would be bought at the price of trust.' }));

// ── constitution — g9sms-dpe-014 … 024 ────────────────────────────────────

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-014', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:1,
  question:'No Act of Parliament in Mauritius may conflict with the Constitution. Write the word that describes the position the Constitution holds above every other law.',
  answer:'supreme', alsoAccept:['supreme law','the supreme law','supremacy'],
  hint:'It is the adjective used of the court that has the final word, too.',
  explanation:'The Constitution is the <b>supreme</b> law of Mauritius: every other law is made under it and must agree with it. That is why an Act found to conflict with the Constitution can be declared void, while an ordinary Act can only be overridden by another Act.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-015', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:1,
  question:'In which year did the Constitution of Mauritius come into force?',
  options:['1968','1948','1982','1992'],
  answer:'1968',
  hint:'It arrived with the event that made Mauritius responsible for governing itself.',
  explanation:'The Constitution came into force in <b>1968</b>, the year of independence, because an independent state needs its own supreme law from its first day. 1992 is the later amendment by which Mauritius became a republic with a President as head of state, not the year the Constitution itself began.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-016', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:2,
  question:'Which pair of things does the Constitution of Mauritius set out?',
  options:['How the country is governed, and the rights of every citizen',
           'How the country is governed, and the price of essential goods',
           'How each election is won, and the programme of each new party',
           'How each ministry is run, and the salary paid to every officer'],
  answer:'How the country is governed, and the rights of every citizen',
  hint:'A constitution deals with the framework of the State and with the citizen\'s protection inside it.',
  explanation:'The Constitution creates and limits the institutions of the State — Assembly, Cabinet, courts — and protects fundamental rights and freedoms. Prices, party programmes and salaries are matters for ordinary law and policy, which change far more often than the supreme law is amended.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-017', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:2,
  question:'Which line correctly matches each branch of government to its work?',
  options:['Legislature makes laws · Executive carries them out · Judiciary interprets',
           'Legislature interprets laws · Executive makes them · Judiciary carries out',
           'Legislature carries out laws · Executive interprets · Judiciary makes them',
           'Legislature makes laws · Executive interprets · Judiciary carries them out'],
  answer:'Legislature makes laws · Executive carries them out · Judiciary interprets',
  hint:'Take each branch in turn and name the single verb that belongs to it.',
  explanation:'The National Assembly <b>makes</b> law, the Cabinet and the public service <b>carry it out</b>, and the courts <b>interpret and apply</b> it in disputes. Keeping the three apart is the separation of powers: whoever writes a rule should not also be the one who judges whether it was broken.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-018', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:2,
  question:'How does amending the Constitution differ from passing an ordinary law?',
  options:['An amendment needs a larger majority in the National Assembly',
           'An amendment needs the approval of every district council first',
           'An amendment needs to be published in a newspaper for one year',
           'An amendment needs a fresh general election to be called first'],
  answer:'An amendment needs a larger majority in the National Assembly',
  hint:'Ask what would make a supreme law harder to change than the laws made under it.',
  explanation:'Constitutional amendment requires a special majority larger than the simple majority that passes an ordinary Act, and some provisions are guarded more strictly still. If the supreme law could be changed as easily as any other, the protections it contains would last exactly as long as one ordinary vote.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-019', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:2,
  question:'The Constitution provides for an independent officer who investigates complaints from citizens who believe a government department has treated them unfairly. Write the <b>one word</b> that names this officer.',
  answer:'Ombudsman', alsoAccept:['ombudsman','the ombudsman','ombudsperson'],
  hint:'The office is a complaints investigator, not a judge and not a minister.',
  explanation:'The <b>Ombudsman</b> investigates complaints of maladministration by public bodies and reports on them, which gives a citizen a route that does not require going to court. It is a constitutional office precisely so that the investigator cannot be dismissed by the department being investigated.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-020', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:3,
  question:'Why must the judiciary be kept independent of the government of the day?',
  options:['A case against the State must be decided by someone it cannot direct',
           'A case against the State must be decided more quickly than any other',
           'A judge must be able to write new laws when the Assembly is not sitting',
           'A judge must be able to choose which of the existing laws still apply'],
  answer:'A case against the State must be decided by someone it cannot direct',
  hint:'Imagine the government is one of the two parties in the case, then ask who should decide it.',
  explanation:'The State is a party in many cases, so a court that could be instructed by ministers would be judging its own employer. Independence is what makes a judgment against the government possible. Judges do not make law or pick which laws to apply; they apply the law the Assembly has passed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-021', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:3,
  question:'Why is a written constitution deliberately made harder to change than an ordinary law?',
  options:['Rights would be worth little if one narrow vote could remove them',
           'Rights would be argued about if they were written down too clearly',
           'Writing takes a long time, so amendments are slow for that reason',
           'Writing the amendment twice is a tradition inherited from Britain'],
  answer:'Rights would be worth little if one narrow vote could remove them',
  hint:'Ask what protection a guarantee gives if it can be withdrawn by the same majority that guaranteed it.',
  explanation:'A protection that any temporary majority could strip away is not a protection at all, so the special majority forces broad agreement before the framework of the State is altered. The difficulty is a deliberate design choice about consent, not an accident of drafting time or an inherited habit.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-022', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:4,
  question:'A ministry issues a regulation that would stop a registered association from holding any meeting at all. An association member says a regulation must be obeyed because it comes from the government. What follows?',
  options:['It can be challenged, because a regulation must respect the Constitution',
           'It can be challenged, but only after the association has obeyed it once',
           'It must be obeyed, because a ministry acts on behalf of the whole State',
           'It must be obeyed, because only the Assembly may question a ministry'],
  answer:'It can be challenged, because a regulation must respect the Constitution',
  hint:'Place the regulation in the order of laws: what is it made under, and what does that thing require?',
  explanation:'A regulation is made under an Act, and the Act itself is made under the Constitution, so a regulation that destroys a protected freedom can be challenged in court. Coming from a ministry gives it force but not immunity; that is the whole point of a supreme law. Obeying it first is not a condition of challenging it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-023', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:4,
  question:'A citizen is convinced that a new Act breaches a fundamental right. One adviser says to take the matter to the Supreme Court; another says to ignore the Act and wait to be prosecuted. Which is the better course, and why?',
  options:['The court, because it can declare the Act void for everyone affected',
           'The court, because a prosecution can no longer be brought afterwards',
           'Ignoring it, because a court will not look at an Act already passed',
           'Ignoring it, because a prosecution is the only way to raise the point'],
  answer:'The court, because it can declare the Act void for everyone affected',
  hint:'Compare what each route can achieve, and for how many people, not just what it costs the citizen.',
  explanation:'A constitutional challenge can have the Act declared void, which settles the question for everyone, while waiting to be prosecuted risks a conviction and settles nothing until the same argument is finally made in court anyway. Courts examine Acts already passed — that is exactly when the question of validity arises.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-024', chapterId:'g9sms-government-welfare', subsection:'constitution', difficulty:4,
  question:'A pupil writes: <i>"If most members of the Assembly agree, any right in the Constitution can be removed as easily as any other law is changed."</i> What is the strongest correction?',
  options:['A constitutional change needs a special majority, not a simple one',
           'A constitutional change needs the agreement of the Ombudsman first',
           'The statement is right, since the Assembly is the supreme authority',
           'The statement is right, since a right is written in an ordinary Act'],
  answer:'A constitutional change needs a special majority, not a simple one',
  hint:'The claim turns on the word "most". Ask whether the Constitution accepts the same threshold as an ordinary law.',
  explanation:'Fundamental rights sit in the Constitution, and amending it demands a special majority well above the simple majority that carries an ordinary Act. The supreme authority in Mauritius is the Constitution itself, which is why the Assembly is bound by the procedure the Constitution lays down for changing it.' }));

// ── taxes_and_mra — g9sms-dpe-025 … 030 ───────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-025', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:1,
  question:'The money the State receives from taxes and duties each year is known by which name?',
  options:['Government revenue','Government borrowing','Government subsidy','Government pension'],
  answer:'Government revenue',
  hint:'The word is the opposite of the money that goes out again as spending.',
  explanation:'Money coming in is <b>revenue</b>; money going out on hospitals, schools and roads is expenditure. Borrowing is money that must be repaid rather than money earned, and a subsidy and a pension are both payments the State makes, so they belong on the expenditure side.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-026', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:2,
  question:'The MRA also collects a tax charged on goods brought into the country through the port or the airport. Write the <b>one word</b> that completes its name: "... duty".',
  answer:'customs', alsoAccept:['Customs','customs duty','import'],
  hint:'It is the name of the service that inspects goods at the border.',
  explanation:'<b>Customs</b> duty is charged on imported goods as they enter the country, so it is collected at the port and the airport rather than from a wage or a till. Like VAT it is an indirect tax: the importer pays it first and it reaches the shopper inside the shelf price.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-027', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:2,
  question:'Which line correctly matches a tax to the moment it is actually paid?',
  options:['Income tax on what a person earns · VAT when that person buys goods',
           'Income tax when a person buys goods · VAT on what that person earns',
           'Income tax on what a person earns · VAT only on goods that are made',
           'Income tax on what a person saves · VAT when that person sells goods'],
  answer:'Income tax on what a person earns · VAT when that person buys goods',
  hint:'One of the two follows the wage packet and the other follows the till receipt.',
  explanation:'Income tax is charged on earnings, which makes it a direct tax paid by the earner. VAT is charged at 15% when goods and services are bought, which makes it an indirect tax collected by the seller and passed to the MRA. Savings are not the base of either tax.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-028', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:3,
  question:'Why is VAT described as an <b>indirect</b> tax?',
  options:['The shop collects it from the buyer and hands it to the MRA',
           'The shop is refunded the whole of it at the end of each year',
           'The buyer pays it directly to the MRA once the goods arrive',
           'The buyer decides each month how much of it to pay in total'],
  answer:'The shop collects it from the buyer and hands it to the MRA',
  hint:'Follow the rupee: whose hands does it pass through between the shopper and the State?',
  explanation:'With an indirect tax the person who bears it and the person who pays it over are different: the shopper bears VAT in the price, and the trader remits it to the MRA. A direct tax such as income tax goes from the taxpayer to the MRA with nobody in between, which is exactly the contrast the word "indirect" marks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-029', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:4,
  question:'A trader keeps no receipts and declares only part of his sales to the MRA. He argues that the sum involved is small and harms nobody. Trace what actually follows.',
  options:['Less revenue reaches the services everyone uses, and he faces penalties',
           'Less revenue reaches the services, but honest traders pay no more tax',
           'Nothing changes, because the MRA sets its budget before the year begins',
           'Nothing changes, because VAT is paid by the shopper and not by a trader'],
  answer:'Less revenue reaches the services everyone uses, and he faces penalties',
  hint:'Follow the missing money to the place it was going, then ask what happens to the trader himself.',
  explanation:'Tax that is not declared is revenue the schools, hospitals and roads never receive, and the shortfall has to be met by taxing everyone else more or spending less. Evasion is also an offence carrying penalties. That VAT is borne by the shopper makes it worse, not better: he has kept money collected in the State\'s name.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-030', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:4,
  question:'A committee must raise the same additional sum either by raising VAT on all goods or by raising income tax on higher earners. Which statement about a low-income family is correct?',
  options:['The VAT rise reaches them on nearly everything they buy',
           'The VAT rise reaches them only on goods they rarely buy',
           'The income tax rise reaches them on every rupee they spend',
           'The income tax rise reaches them before the VAT rise does'],
  answer:'The VAT rise reaches them on nearly everything they buy',
  hint:'Ask which of the two follows spending and which follows earnings, then ask which the family does more of.',
  explanation:'A family that must spend all it earns meets VAT on almost every purchase, so a VAT rise takes a larger share of a small income. A rise in income tax aimed at higher earnings does not touch a household below that level at all. This is why the two routes raise the same sum from very different people.' }));

// ── welfare_measures — g9sms-dpe-031 … 045 ────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-031', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:1,
  question:'Which group travels free of charge on public buses in Mauritius under the free travel scheme?',
  options:['Students, elderly citizens and disabled persons','Students of private secondary schools only','Elderly citizens travelling before midday only','Disabled persons holding a driving licence'],
  answer:'Students, elderly citizens and disabled persons',
  hint:'The scheme was designed around the three groups least able to pay a daily fare.',
  explanation:'Free bus travel covers <b>students, the elderly and disabled persons</b>, which removes a daily cost from the households least able to carry it and keeps school and hospital within reach. The narrower versions in the other options describe conditions the scheme does not impose.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-032', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:1,
  question:'From what age is the Basic Retirement Pension paid in Mauritius?',
  options:['60','40','50','70'],
  answer:'60',
  hint:'It is the age at which the State treats a citizen as retired, not the voting age.',
  explanation:'The Basic Retirement Pension is paid from the age of <b>60</b> to citizens who qualify, whatever work they did. Because it does not depend on having been in paid employment, it also reaches people who worked at home or on the land all their lives.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-033', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:1,
  question:'Write the <b>one word</b> for the regular payment the State makes to a citizen who has reached retirement age.',
  answer:'pension', alsoAccept:['a pension','the pension','pensions'],
  hint:'It is the word in the name of the measure paid from the age of 60.',
  explanation:'A <b>pension</b> is a regular payment made after retirement. In Mauritius the Basic Retirement Pension is universal for those who qualify by age and residence, which is one of the oldest parts of the welfare state and predates independence.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-034', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
  question:'Public hospital care in Mauritius is described as <b>free at the point of use</b>. What does that phrase mean?',
  options:['The patient is not charged at the hospital; taxation has paid for it',
           'The patient is not charged at all, because the care costs the State nothing',
           'The patient is charged a small fee that is refunded within one month',
           'The patient is charged nothing only if they hold a certificate of income'],
  answer:'The patient is not charged at the hospital; taxation has paid for it',
  hint:'Two different questions hide in the phrase: who pays, and when.',
  explanation:'Nobody is asked for money at the hospital door, but the care is not costless — it is paid for in advance out of general taxation. The distinction matters: the service is free <i>to the patient at that moment</i>, which is what stops illness turning into a bill a family cannot meet.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-035', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
  question:'Which of these is <b>NOT</b> a welfare measure of the Mauritian State?',
  options:['A private clinic charging patients its own fees for treatment',
           'A public hospital treating patients without charging any fee',
           'A primary school supplying its pupils with free textbooks',
           'A monthly pension paid to citizens from the age of sixty'],
  answer:'A private clinic charging patients its own fees for treatment',
  hint:'Ask who provides the service and who bears the cost in each case.',
  explanation:'A welfare measure is provided or funded by the State so that access does not depend on the ability to pay. A private clinic charging its own fees is a commercial service, whatever the standard of its care. The other three are all funded from public revenue and open to those who qualify.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-036', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
  question:'The State subsidises certain staple foods. What does a subsidy do?',
  options:['The State pays part of the cost so the shopper pays a lower price',
           'The State fixes a higher price so that the producer earns much more',
           'The State buys the whole harvest and stores it until prices have risen',
           'The State charges a duty on the good so that less of it is imported'],
  answer:'The State pays part of the cost so the shopper pays a lower price',
  hint:'Follow the money: who is putting some in, and who notices the difference at the till?',
  explanation:'A subsidy is public money paid towards the cost of a good so that the price on the shelf is lower than it would otherwise be. On staples such as rice and flour this protects the households that spend the largest share of their income on food. A duty does the opposite, adding to the price.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpe-037', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:2,
  question:'Suppose a bag of a staple food costs Rs 46 to bring to the shop, and the State pays a subsidy of Rs 14 on each bag. How many rupees does the shopper pay?',
  answer:32,
  hint:'The subsidy is taken off the cost, not added to it.',
  explanation:'46 - 14 = <b>Rs 32</b>. The usual mistake is to add the subsidy and answer 60, because the State is spending money; but the State\'s spending is what <i>lowers</i> the shelf price. The remaining Rs 14 per bag is still paid — out of taxation, by everyone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-038', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:3,
  question:'Why is free education counted as a welfare measure and not simply as a school policy?',
  options:['It removes cost as the reason a child leaves school early',
           'It removes the need for a child to sit any examination at all',
           'It guarantees every school leaver a post in the public service',
           'It requires every family to send its children to a state school'],
  answer:'It removes cost as the reason a child leaves school early',
  hint:'Ask what used to decide which children continued their schooling, before the measure existed.',
  explanation:'Welfare measures exist to stop income deciding who gets a basic service. Free education means a family\'s means no longer determine whether a child continues, which is why it belongs with free health care and the pension. It changes nothing about examinations, employment or the choice of school.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-039', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:3,
  question:'Where does the money for free health care, free education and the pension come from?',
  options:['From taxation, which the MRA collects across the whole country',
           'From donations, which citizens choose to make to each hospital',
           'From the fees, which patients and pupils pay when they arrive',
           'From the profits, which state-owned factories make on exports'],
  answer:'From taxation, which the MRA collects across the whole country',
  hint:'Trace the funding backwards from the service to the body that gathers the money.',
  explanation:'Welfare is paid for out of general revenue — income tax, VAT, customs and excise duty — collected by the MRA. That is what links the two halves of this chapter: the tax a citizen pays and the free service they receive are the same money at different points. Fees at the door would defeat the purpose.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-040', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:3,
  question:'The population of Mauritius is ageing. What does that mean for the cost of the welfare state?',
  options:['More pensions and more health care are paid for by fewer workers',
           'More pensions are paid, but health care becomes cheaper each year',
           'Fewer pensions are paid, because older citizens need less support',
           'Nothing changes, because the pension is fixed by the Constitution'],
  answer:'More pensions and more health care are paid for by fewer workers',
  hint:'Count both sides of the sum: who receives the payments, and who is earning the taxes that fund them.',
  explanation:'An ageing population increases the number drawing pensions and using hospitals while the share of working-age taxpayers falls, so the same spending must be raised from a smaller base. Older populations use more health care, not less, and the pension is set by policy and law rather than fixed in the Constitution.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-041', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:4,
  question:'A grandmother of 63 living in a village has never held a paid job. Her grandson asks whether the State can help her at all. Which answer is correct?',
  options:['She qualifies for the pension, which does not depend on paid work',
           'She qualifies for the pension only once she has worked for a year',
           'She qualifies for nothing, since no contributions were ever paid in',
           'She qualifies for free travel, but no other measure will reach her'],
  answer:'She qualifies for the pension, which does not depend on paid work',
  hint:'Ask what the Basic Retirement Pension is actually based on — a work record, or something else.',
  explanation:'The Basic Retirement Pension is <b>universal</b> for citizens who meet the age and residence conditions, so it reaches people whose work was unpaid at home or on the land. That design is the point: a contributory scheme alone would leave exactly this household with nothing. She also has free travel and free hospital care.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-042', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:4,
  question:'Two proposals are put forward: pay the pension to every citizen at 60, or pay it only to those below a set income. Which statement weighs them correctly?',
  options:['The universal one reaches everyone entitled; the targeted one costs less',
           'The universal one reaches everyone entitled; the targeted one costs more',
           'The targeted one reaches everyone entitled and also costs the State less',
           'The two are identical in cost, and differ only in the forms to be filled'],
  answer:'The universal one reaches everyone entitled; the targeted one costs less',
  hint:'Each proposal is strong where the other is weak. Name the strength of each rather than choosing a winner.',
  explanation:'A universal pension needs no means test, so nobody entitled is missed and nobody is shamed into not claiming, but it also pays people who do not need it. A targeted pension spends less, but it requires proof of income and the people hardest to reach are often the ones who fail to claim. Both effects are real, which is why the choice is argued about.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-043', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:4,
  question:'A pupil says: <i>"Free health care is not really free — somebody must be paying the nurses."</i> How should this be answered?',
  options:['The claim is half right: it is paid by taxation, not by the patient',
           'The claim is half right: it is paid by the patient, over several years',
           'The claim is wrong: public hospitals have no costs to be covered',
           'The claim is wrong: the nurses are paid out of the fees collected'],
  answer:'The claim is half right: it is paid by taxation, not by the patient',
  hint:'The pupil has noticed something true. Decide which part of the claim survives and which does not.',
  explanation:'The pupil is right that the care has a cost and wrong about who meets it: salaries, medicines and buildings are funded from general taxation. "Free" describes the moment of use, and that is exactly what protects a family from a bill arriving with an illness. Public hospitals charge no fee, so there are none to pay the nurses from.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-044', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:4,
  question:'A village asks for a new dispensary. Officials agree the need is real but say the request must still be weighed. What must be weighed against it?',
  options:['The same revenue is being asked for by other needs elsewhere',
           'The same revenue could be returned to taxpayers at the year end',
           'The village should pay for the dispensary from its own resources',
           'The dispensary should be built only if the village votes for it'],
  answer:'The same revenue is being asked for by other needs elsewhere',
  hint:'Public money is finite. Ask what the rupee spent here is no longer available to do.',
  explanation:'Every rupee of revenue can only be spent once, so a genuine need still has to be set against the other genuine needs competing for it — that is what a budget decides. Welfare in Mauritius is funded nationally and not by each village, and a local vote cannot create the money.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-045', chapterId:'g9sms-government-welfare', subsection:'welfare_measures', difficulty:4,
  question:'If the subsidy on a staple food were withdrawn, which household would feel it most sharply, and why?',
  options:['A low-income household, which spends most of its income on food',
           'A low-income household, because it buys more food than any other',
           'A high-income household, because it pays the larger share of taxes',
           'A high-income household, because staples make up most of its bill'],
  answer:'A low-income household, which spends most of its income on food',
  hint:'Compare the rise as a share of what each household has to spend, not in rupees alone.',
  explanation:'The rise in rupees may be the same for both, but a household spending most of its income on food loses a far larger share of everything it has. Poorer households do not buy more food; they simply have less left over once it is bought, which is why subsidies are aimed at staples rather than at luxuries.' }));

// ── rights_and_law — g9sms-dpe-046 … 061 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-046', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:1,
  question:'Voting at 18 is a <b>right</b>. Which of the following is a citizen\'s <b>responsibility</b>?',
  options:['Obeying the laws of the country','Winning a seat in the Assembly','Owning a house before the age of 30','Working in the public service for a year'],
  answer:'Obeying the laws of the country',
  hint:'A responsibility is something the citizen owes, not something the citizen is owed.',
  explanation:'Rights and responsibilities are two sides of citizenship: the State protects the citizen\'s freedoms, and the citizen obeys the law, pays taxes and respects the rights of others. Winning a seat, owning property and public employment are none of them duties of a citizen.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-047', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:1,
  question:'Which of these is a fundamental right protected by the Constitution of Mauritius?',
  options:['Freedom of religion and of worship','A guaranteed job on leaving school','A free house for each married couple','A free car given to registered voters'],
  answer:'Freedom of religion and of worship',
  hint:'A fundamental right protects a freedom. Ask which of these is a freedom rather than a possession.',
  explanation:'The Constitution protects freedoms such as religion, expression, assembly and movement, and protects them against the State itself. The other three describe goods somebody would have to be made to provide, which is not what a fundamental right is; welfare measures, not rights, are how the State supplies goods and services.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-048', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
  question:'Which pairing of a right with its matching responsibility is correct?',
  options:['The right to free speech · the duty not to defame another person',
           'The right to free speech · the duty to agree with the majority view',
           'The right to vote freely · the duty to reveal how the vote was cast',
           'The right to a fair trial · the duty to admit the charge in advance'],
  answer:'The right to free speech · the duty not to defame another person',
  hint:'A genuine responsibility protects somebody else\'s right; it does not cancel your own.',
  explanation:'Free speech is exercised alongside a duty not to destroy another person\'s reputation with untrue statements. The other three are not responsibilities at all: they would each abolish the very right they are attached to, and a secret ballot and the presumption of innocence exist precisely to prevent that.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-049', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
  question:'In a criminal case in Mauritius, who must prove the charge?',
  options:['The prosecution must prove it against the accused person',
           'The accused person must prove that the charge is untrue',
           'The police officer who made the arrest must prove it again',
           'The witnesses must prove between them that it took place'],
  answer:'The prosecution must prove it against the accused person',
  hint:'Follow the presumption of innocence through to its practical consequence in the courtroom.',
  explanation:'Because the accused is presumed innocent, the burden of proof rests on the <b>prosecution</b>. If it were the other way round, a person could be convicted simply for being unable to prove a negative. Witnesses give evidence, and the police investigate; neither carries the burden itself.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-050', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
  question:'A person accused of an offence has the right to a <b>fair hearing</b>. What does that include?',
  options:['Being told the charge, and being allowed to answer it in court',
           'Being told the charge, and being sentenced by the arresting officer',
           'Being held until an admission of the offence has been obtained',
           'Being tried by a judge chosen personally by the accused person'],
  answer:'Being told the charge, and being allowed to answer it in court',
  hint:'Think about the minimum a person needs in order to defend themselves at all.',
  explanation:'A fair hearing means knowing what is alleged, having time to prepare, and being able to put a defence before an impartial court. Sentencing by the officer who made the arrest would destroy the separation between investigating and judging, and choosing one\'s own judge would destroy impartiality just as completely.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-051', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
  question:'Write the <b>one word</b> for treating a person less favourably because of their race, sex, religion or disability — something the law forbids.',
  answer:'discrimination', alsoAccept:['Discrimination','discriminating'],
  hint:'It is the noun formed from the verb meaning to make a difference between people.',
  explanation:'<b>Discrimination</b> is treating someone less favourably on a ground that has nothing to do with the matter in hand. Equality before the law means the same rules apply to everyone, so a rule that sorts people by race, sex, religion or disability is unlawful in employment, services and public life.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-052', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:2,
  question:'A suspect is arrested by the police and charged. Who decides whether that person is guilty?',
  options:['The court, after hearing the evidence from both sides',
           'The police, once the investigation has been completed',
           'The ministry that is responsible for law and public order',
           'The victim, once compensation has been agreed in private'],
  answer:'The court, after hearing the evidence from both sides',
  hint:'Separate the body that investigates from the body that judges.',
  explanation:'The police investigate and bring a charge; only a <b>court</b> can decide guilt, after hearing both sides. Letting the investigator also be the judge would remove any check on a mistaken or unfair arrest. A private settlement with a victim does not decide a criminal charge either.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-053', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:3,
  question:'Freedom of expression is protected, yet the law still forbids publishing untrue statements that damage a person\'s reputation. Why is that not a contradiction?',
  options:['One person\'s freedom stops where it destroys another\'s rights',
           'One person\'s freedom applies only to statements that are popular',
           'The Constitution protects speech in private conversation only',
           'The Constitution protects newspapers but not ordinary citizens'],
  answer:'One person\'s freedom stops where it destroys another\'s rights',
  hint:'Ask whose right is on the other side of the argument, and whether it disappears when someone speaks.',
  explanation:'Rights are held by everybody at once, so they have to be capable of coexisting: protecting reputation limits speech at the point where speech would wreck another person\'s life with a falsehood. The limit is not about popularity, and the protection covers private citizens and the press alike.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-054', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:3,
  question:'Why does equality before the law require that legal assistance be available to those who cannot pay for it?',
  options:['A right that only the wealthy can use is not an equal right',
           'A lawyer is obliged by law to work without a fee in every case',
           'A poor defendant is more likely to be innocent of the charge',
           'A court must hear an equal number of rich and poor each year'],
  answer:'A right that only the wealthy can use is not an equal right',
  hint:'Compare the rule on paper with what actually happens to two people of different means.',
  explanation:'The same rule applied to unequal means produces unequal outcomes: a defendant who cannot afford representation cannot in practice use the fair-trial right they formally hold. Legal aid exists to close that gap. It says nothing about who is more likely to be innocent, and lawyers are not obliged to work for nothing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-055', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:3,
  question:'Why does the Constitution allow some rights to be limited in certain circumstances?',
  options:['Rights held by everyone must be able to exist alongside each other',
           'Rights are granted by the government and may be withdrawn at will',
           'Rights are too expensive for a small country to protect completely',
           'Rights are limited only for people who have been convicted before'],
  answer:'Rights held by everyone must be able to exist alongside each other',
  hint:'If two people exercise the same right at the same moment and clash, what has to give?',
  explanation:'A right held by everybody will sometimes collide with the same right held by somebody else, or with public safety and public health, so limits are defined and must themselves be justified. That is different from rights being handed out and taken back by a government, which is exactly what a constitutional guarantee prevents.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-056', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:3,
  question:'What would follow if a minister could tell a court how to decide a case?',
  options:['No citizen could ever win a case brought against the State',
           'No citizen would be required to give evidence in any case',
           'Every case would be heard far more slowly than it is now',
           'Every case would have to be heard twice before two judges'],
  answer:'No citizen could ever win a case brought against the State',
  hint:'Work out who is on the other side of the case when a citizen sues a public body.',
  explanation:'Courts exist partly to decide disputes in which the State is a party, so a court taking instructions from a minister could never rule against the government. The protection a citizen has against unlawful official action would become worthless. Speed and the number of judges are not what is at stake.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-057', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:4,
  question:'A neighbour plays music loudly every night. One resident suggests complaining to the authorities; another suggests playing louder music back. Compare the two courses.',
  options:['The complaint uses the law; the retaliation makes both of them liable',
           'The complaint uses the law; the retaliation is allowed as self-defence',
           'The retaliation is quicker, and the law does not deal with noise at all',
           'The retaliation is fairer, because the neighbour started the nuisance'],
  answer:'The complaint uses the law; the retaliation makes both of them liable',
  hint:'Ask what each course leaves behind: one household in the wrong, or two.',
  explanation:'Noise nuisance is something the authorities can act on, so a complaint puts the matter where it can actually be settled. Retaliating creates a second nuisance and leaves the complainant equally in the wrong, which also destroys their own case. Who started it affects sympathy, not liability.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-058', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:4,
  question:'An advertisement for a clerical post states that women need not apply. A qualified applicant asks what she can do. What is the correct advice?',
  options:['The condition is discriminatory, and she may complain to the authorities',
           'The condition is discriminatory, but an employer may still choose freely',
           'The condition is lawful, because an employer pays the wages in the end',
           'The condition is lawful, provided the post is advertised in a newspaper'],
  answer:'The condition is discriminatory, and she may complain to the authorities',
  hint:'Two questions: is the condition lawful, and if not, does the applicant have anywhere to take it?',
  explanation:'Sex is irrelevant to clerical work, so the condition is discrimination and the law does not leave it to the employer\'s preference. Recognising the wrong is only half the answer: there is a body to complain to, which is what makes the right usable. Where the advertisement appeared changes nothing.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-059', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:4,
  question:'A post names a shopkeeper as a thief, with no evidence, and is shared widely. The author says freedom of expression protects the post. Which response is correct?',
  options:['Freedom of expression does not cover an untrue accusation against a person',
           'Freedom of expression covers it, because the author believed it was true',
           'Freedom of expression covers it, because a post is not a printed article',
           'Freedom of expression is lost entirely the moment any accusation is made'],
  answer:'Freedom of expression does not cover an untrue accusation against a person',
  hint:'Hold the shopkeeper\'s rights in one hand and the author\'s in the other before answering.',
  explanation:'Expression is protected, but an untrue statement that destroys a named person\'s reputation is defamation and the shopkeeper\'s rights are engaged. Sincerity is not a defence to a false allegation of crime, and the law reaches online publication as it reaches print. The freedom is limited here, not abolished.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-060', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:4,
  question:'A pupil is filmed without being asked and the clip is posted for others to laugh at. Which right is engaged, and what should follow?',
  options:['Privacy and dignity — the clip should be removed and reported',
           'Privacy and dignity — nothing follows, as a classroom is a public place',
           'Freedom of expression — the filmer may publish whatever was recorded',
           'Freedom of assembly — the pupils had gathered together in one room'],
  answer:'Privacy and dignity — the clip should be removed and reported',
  hint:'Name whose right was interfered with first, before asking what the filmer was exercising.',
  explanation:'The pupil\'s privacy and dignity were interfered with the moment the clip was posted to be laughed at, so removal and a report to the school are the proper steps. The filmer\'s expression does not stretch to humiliating a person who never consented, and a classroom is not a public place where anyone may record freely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-061', chapterId:'g9sms-government-welfare', subsection:'rights_and_law', difficulty:4,
  question:'A citizen believes a government department has handled her application unfairly, though no law has been broken. Which route suits her complaint?',
  options:['The Ombudsman, who investigates unfair treatment by a public body',
           'The Ombudsman, who can order the department to pay a large fine',
           'The Supreme Court, which reviews every departmental file each year',
           'The Assembly, which decides each individual application in person'],
  answer:'The Ombudsman, who investigates unfair treatment by a public body',
  hint:'Match the complaint to the body designed for it: this one is about unfair handling, not an illegal act.',
  explanation:'The Ombudsman exists for exactly this kind of complaint: poor or unfair administration by a public body, investigated and reported on without the cost of court proceedings. The office investigates and recommends rather than fines. Courts decide legal disputes brought before them, and the Assembly legislates rather than handling individual files.' }));

// ══════════════════════════════════════════════════════════════════════════
//  MEDIA & COMMUNICATION
// ══════════════════════════════════════════════════════════════════════════

// ── types_of_media — g9sms-dpe-062 … 069 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-062', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:1,
  question:'A monthly magazine sold at a shop belongs to which type of media?',
  options:['Print media','Electronic media','Digital media','Outdoor media'],
  answer:'Print media',
  hint:'Classify by the form the message is carried in, not by what the message is about.',
  explanation:'A magazine is printed on paper and read by eye without any device, which places it with newspapers in <b>print media</b>. Electronic media are broadcast, such as radio and television, and digital media are delivered over the internet.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-063', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:1,
  question:'Write the <b>one word</b> that names the type of media made up of newspapers, magazines and books.',
  answer:'print', alsoAccept:['Print','print media','printed'],
  hint:'The word names the process that puts the words onto the paper.',
  explanation:'<b>Print</b> media are produced on paper: newspapers, magazines, books and leaflets. The category matters because print is prepared and checked before it is fixed, which is why it usually appears later than a broadcast or an online post about the same event.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-064', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:2,
  question:'What makes a medium a <b>mass</b> medium?',
  options:['It carries one message to a very large audience at once',
           'It carries one message to a single named person at a time',
           'It carries only messages that concern the whole population',
           'It carries messages that are paid for by an advertiser first'],
  answer:'It carries one message to a very large audience at once',
  hint:'The word "mass" describes the audience, not the subject matter or who paid.',
  explanation:'Mass media reach very many people simultaneously — a broadcast, an edition, a post seen by thousands. A telephone call carries a message to one person and is therefore not mass communication. The subject matter and the source of funding are separate questions entirely.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-065', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:2,
  question:'A public warning must reach an elderly villager who never learned to read. Which medium delivers it?',
  options:['Radio, because the message is spoken rather than written',
           'A newspaper, because it is delivered to every village daily',
           'A wall poster, because it can be placed where people gather',
           'A leaflet, because one can be left at every house in the road'],
  answer:'Radio, because the message is spoken rather than written',
  hint:'Ask what each medium requires of the person receiving it before it can work at all.',
  explanation:'Radio carries speech, so it reaches a listener who cannot read, which is one real difference between broadcast and print rather than a matter of taste. A newspaper, a poster and a leaflet all place the same requirement on the receiver: they must be read before they mean anything.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-066', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:2,
  question:'A podcast is downloaded onto a phone and listened to later without any connection. How is it best classified?',
  options:['Digital media, because it was published and fetched online',
           'Print media, because a written script exists behind the audio',
           'Outdoor media, because it is listened to away from the home',
           'Broadcast media, because it was transmitted live to listeners'],
  answer:'Digital media, because it was published and fetched online',
  hint:'Classify by how the item was published and obtained, not by where it is finally played.',
  explanation:'A podcast is published online and downloaded, which makes it <b>digital media</b> even when it is played offline afterwards. Broadcasting means transmitting live to whoever is tuned in at that moment, which is precisely what a downloaded file is not, and the place of listening never decides the category.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-067', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:3,
  question:'Why does news of an accident usually appear on social media before it appears in a newspaper?',
  options:['Anyone present can post at once, with no printing or checking stage',
           'Newspapers are written only after the police release a full report',
           'Social media companies employ far more reporters than newspapers',
           'Newspapers may not print any story until a whole day has passed'],
  answer:'Anyone present can post at once, with no printing or checking stage',
  hint:'Count the steps each one must pass through between the event and the reader.',
  explanation:'A witness can publish from the roadside in seconds, while a newspaper report must be written, checked by an editor, printed and distributed. The delay buys the verification — which is why the faster account is also the one more likely to be wrong. Platforms host what users post rather than employing reporters.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-068', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:4,
  question:'A cyclone warning goes up overnight and a school must tell families it will not open. Power and internet are unreliable. Which channel should it rely on first?',
  options:['Radio, which works on batteries when the power has failed',
           'The school website, which every parent may consult at home',
           'A printed circular, which can be sent home with the pupils',
           'A message group, which reaches the parents who have joined'],
  answer:'Radio, which works on batteries when the power has failed',
  hint:'Choose for the conditions described, not for the channel that is best on an ordinary day.',
  explanation:'In a power cut a battery radio keeps working and reaches every household at once, which is why cyclone bulletins are broadcast. A website and a message group both assume electricity and a connection, and a circular cannot be sent home with pupils who are already at home. The right channel depends on the conditions it must survive.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-069', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:4,
  question:'A small bakery wants to reach elderly customers in nearby villages, most of whom do not use the internet. Which choice fits, and why?',
  options:['Local radio and a poster, because they need no connection at all',
           'A social media page, because posting on it costs the bakery nothing',
           'A national television advertisement, because it is seen by everyone',
           'An email list, because a message can be sent to many people at once'],
  answer:'Local radio and a poster, because they need no connection at all',
  hint:'Start from the audience described and work back to the medium, not the other way round.',
  explanation:'The audience is local and offline, so channels that need no internet and cost little are the fit. A free social media page and an email list both reach only people already online, and national television reaches the whole island at a price a village bakery cannot justify. The cheapest medium is not the cheapest if the audience is not there.' }));

// ── roles_of_media — g9sms-dpe-070 … 079 ──────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-070', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:1,
  question:'A television channel broadcasts a Sunday film and a music show. Which role of the media is it performing?',
  options:['Entertaining','Investigating','Legislating','Prosecuting'],
  answer:'Entertaining',
  hint:'Name the role from what the audience is getting out of the programme.',
  explanation:'Alongside informing and educating, one of the media\'s ordinary roles is to <b>entertain</b>. Investigating is the watchdog role, and legislating and prosecuting belong to the Assembly and the courts — the media reports on those, but never performs them.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-071', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:2,
  question:'Newspapers and stations carry advertisements. What should a reader keep in mind about them?',
  options:['An advertiser paid for the space and chose what it would say',
           'An advertiser was interviewed by a reporter before publication',
           'An advertisement is checked for accuracy exactly like a report',
           'An advertisement is placed by the editor to fill an empty page'],
  answer:'An advertiser paid for the space and chose what it would say',
  hint:'Ask who wrote the words and who decided they would appear.',
  explanation:'Advertising is bought, and its message is the advertiser\'s own, which is why it praises the product and mentions no rival. A news report is written by journalists and answered for by an editor. Confusing the two is how a paid claim comes to be read as though a newspaper had verified it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-072', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:2,
  question:'During a cyclone, stations interrupt their programmes to announce each change of warning class. Which role is that?',
  options:['Informing the public so that people can act in time',
           'Entertaining the public while they wait for the weather',
           'Advertising the services offered by the weather station',
           'Educating the public about the geography of the island'],
  answer:'Informing the public so that people can act in time',
  hint:'Ask what the listener is expected to do with the announcement.',
  explanation:'A warning bulletin is the <b>informing</b> role at its most direct: the listener needs the fact in order to decide whether to travel, close shutters or stay home. Education builds understanding over time and entertainment fills the hours between; neither is what an interrupted broadcast is for.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-073', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:2,
  question:'Write the <b>one word</b> for the person at a newspaper who decides what is published and checks a story before it appears.',
  answer:'editor', alsoAccept:['Editor','an editor','the editor'],
  hint:'It is the post above the reporter, and the one that answers for what is printed.',
  explanation:'The <b>editor</b> selects and checks what is published, and the paper answers for it afterwards. That accountable step is the main practical difference between a newspaper report and an anonymous post, which nobody has checked and nobody can be asked to justify.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-074', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:3,
  question:'Why is a free press treated as necessary in a democracy?',
  options:['Voters cannot judge a government they are not told about',
           'Voters must be told by the press which party to choose',
           'Journalists must be allowed to sit in the National Assembly',
           'Journalists are the only people permitted to criticise a law'],
  answer:'Voters cannot judge a government they are not told about',
  hint:'Connect the newspaper on the table to the ballot paper in the booth.',
  explanation:'A vote is only meaningful if the voter knows what has been done in their name, and reporting is how that information reaches them. The role is to inform, not to instruct: telling voters what to choose would replace their judgment rather than equip it. Any citizen may criticise a law.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-075', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:3,
  question:'A newspaper earns most of its income from advertisements placed by one large company. What risk does that create?',
  options:['Reporting on that company may be softened to keep the income',
           'Reporting on that company must by law be approved in advance',
           'Readers will be charged a higher price for each printed copy',
           'Readers will receive their newspaper later on in the morning'],
  answer:'Reporting on that company may be softened to keep the income',
  hint:'Ask what the paper stands to lose if it publishes something the advertiser dislikes.',
  explanation:'Dependence on a single advertiser gives that advertiser leverage: an unwelcome story could cost the paper the income it lives on, which is a pressure on editorial judgment whether or not anyone states it. Nothing in law requires approval, and the price and delivery time of the paper are unaffected.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-076', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:4,
  question:'A newspaper article and an anonymous forwarded message both state that a bus route will be withdrawn next month. What is the strongest reason to treat them differently?',
  options:['The article names a paper that can be held to account for it',
           'The article is longer, and a longer account is usually correct',
           'The message is newer, so it must describe a later decision made',
           'The message reached the reader first, so it came from the source'],
  answer:'The article names a paper that can be held to account for it',
  hint:'Ask who can be asked to justify each statement if it turns out to be false.',
  explanation:'Accountability is the difference: a named publication can be challenged, corrected and sued, and it knows that before it prints. An anonymous forward carries no such cost, which is why it can circulate a claim nobody has checked. Length, speed and order of arrival say nothing about whether a claim is true.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-077', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:4,
  question:'Two newspapers report the same demonstration. One headline reads "Hundreds march peacefully"; the other reads "Traffic blocked for hours". Both are accurate. What follows for a reader?',
  options:['Selection shapes the impression, so more than one report is worth reading',
           'Selection proves that one of the two newspapers must have invented facts',
           'The headlines cancel out, so nothing useful can be learned from either',
           'The second paper is more reliable, since inconvenience is easier to check'],
  answer:'Selection shapes the impression, so more than one report is worth reading',
  hint:'Both are true. The question is what each one chose to put first.',
  explanation:'Reporting always selects, and what is placed in the headline decides the impression even when every word is accurate. Neither paper has invented anything; each has emphasised a different true part. The practical consequence is to read more than one account before forming a view, not to give up on both.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-078', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:4,
  question:'During a flood, a station has an unverified report that a bridge has collapsed. It can broadcast at once to warn drivers, or wait for confirmation. Which weighing is correct?',
  options:['Broadcast it as unconfirmed, naming it as such, and confirm quickly after',
           'Broadcast it as confirmed, because a warning works only if people believe',
           'Wait in silence, because an unconfirmed report is of no value to a driver',
           'Wait in silence, because a station is never permitted to report a rumour'],
  answer:'Broadcast it as unconfirmed, naming it as such, and confirm quickly after',
  hint:'Both haste and silence have a cost here. Look for the course that keeps the warning and the honesty.',
  explanation:'Speed protects drivers and accuracy protects trust, and labelling the report as unconfirmed keeps both: listeners can act cautiously while the station checks. Announcing it as confirmed spends credibility the station will need for the next warning, and silence leaves drivers heading for a bridge that may be gone.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-079', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:4,
  question:'A company offers a journalist a payment to write favourably about its new product. Beyond the question of honesty, what does accepting it cost the <b>reader</b>?',
  options:['The reader can no longer tell a judgment from a paid message',
           'The reader must pay a higher price for the newspaper afterwards',
           'The reader loses the right to complain about the product later on',
           'The reader receives the article several days later than expected'],
  answer:'The reader can no longer tell a judgment from a paid message',
  hint:'The question is deliberately not "is it wrong?". Ask what the reader can no longer rely on.',
  explanation:'Readers treat a review as an independent judgment and an advertisement as a paid claim, and they weigh the two differently. A secret payment destroys that distinction for every article the journalist writes, not only this one — so the loss is the reader\'s ability to trust anything under that name.' }));

// ── media_and_learning — g9sms-dpe-080 … 097 ──────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-080', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:1,
  question:'What is an <b>e-book</b>?',
  options:['A book read on a screen instead of on paper','A book about computers and how they are used','A book borrowed from a library for one week','A book written by more than one author at once'],
  answer:'A book read on a screen instead of on paper',
  hint:'The "e" describes how the book reaches the reader, not what it is about.',
  explanation:'An <b>e-book</b> is an electronic version of a book read on a phone, tablet or computer. The subject matter is irrelevant — a novel can be an e-book and a printed volume can be about computers. Being electronic means one device can carry a whole set of textbooks.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-081', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:1,
  question:'What is meant by <b>distance learning</b>?',
  options:['Lessons reaching pupils who are not in the same room as the teacher',
           'Lessons given to pupils who live far away from any town at all',
           'Lessons taught only in the evening after the school day has ended',
           'Lessons repeated by a pupil who has to take a whole year again'],
  answer:'Lessons reaching pupils who are not in the same room as the teacher',
  hint:'The "distance" is between the teacher and the learner, not between the learner and a town.',
  explanation:'<b>Distance learning</b> delivers teaching through media — broadcast, recorded or online — to learners who are not physically with the teacher. It was what kept schooling going when pupils could not attend. It has nothing to do with where a pupil lives or with repeating a year.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-082', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:1,
  question:'Write the <b>two-word</b> term for the skills a pupil needs to find, judge and use online information safely.',
  answer:'digital literacy', alsoAccept:['digital-literacy','Digital literacy','media literacy'],
  hint:'The second word is what you also need for a printed book; the first says where the material is.',
  explanation:'<b>Digital literacy</b> is more than knowing how to work a device: it is judging whether a source is reliable, whether a claim is supported, and what is safe to share. A pupil who can search but cannot judge is not digitally literate, and that is exactly where most online mistakes begin.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-083', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
  question:'A pupil copies a paragraph from a website into her assignment and gives no source. What is this called?',
  options:['Plagiarism','Research','Revision','Summarising'],
  answer:'Plagiarism',
  hint:'The offence is not the reading. It is presenting someone else\'s words as your own.',
  explanation:'<b>Plagiarism</b> is presenting another person\'s work as your own. Using the website is perfectly proper if the source is named and the ideas are put in the pupil\'s own words — that is research, and summarising is one way of doing it honestly.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-084', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
  question:'Which feature makes an online source more trustworthy for schoolwork?',
  options:['It names its author and the institution behind the page',
           'It appears at the very top of the list of search results',
           'It has been shared by a large number of other accounts',
           'It uses many photographs and a bright, attractive layout'],
  answer:'It names its author and the institution behind the page',
  hint:'Ask which of these tells you who is answerable for the content.',
  explanation:'Knowing who wrote a page, and for which institution, lets a reader judge whether they are qualified and whether they can be held to it. Ranking, popularity and design are about attention, not accuracy — a well-designed page shared ten thousand times can still be wrong.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-085', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
  question:'A recorded lesson can be paused, rewound and watched again. What advantage does that give a pupil?',
  options:['The pupil can work through a difficult part at their own pace',
           'The pupil can finish the whole syllabus in a single afternoon',
           'The pupil no longer has to make any notes during the lesson',
           'The pupil is certain to score higher than in a live classroom'],
  answer:'The pupil can work through a difficult part at their own pace',
  hint:'Ask what changes for a pupil who did not follow something the first time.',
  explanation:'The real gain is control of pace: a step that went too fast can be replayed until it is understood, which a live lesson cannot offer. It does not compress the syllabus, replace note-making, or guarantee a better mark — a recording that is never paused teaches no more than a lesson half heard.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-086', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
  question:'What is meant by the <b>digital divide</b>?',
  options:['The gap between those with access to devices and data and those without',
           'The gap between the time spent on lessons and the time spent on games',
           'The gap between older teachers and younger pupils in using a computer',
           'The gap between the price of a new computer and the price of a used one'],
  answer:'The gap between those with access to devices and data and those without',
  hint:'It describes an inequality between households, not between subjects or generations.',
  explanation:'The <b>digital divide</b> is the inequality between people who can reach online material and those who cannot, for reasons of cost, connection or equipment. It matters in education because homework set online quietly assumes the divide does not exist, and the pupils on the wrong side of it fall behind without complaining.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpe-087', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:2,
  question:'A pupil watches a recorded lesson lasting 45 minutes, and then replays two sections of 4 minutes each. How many minutes of viewing is that in total?',
  answer:53,
  hint:'The replays are extra viewing time, on top of the lesson itself.',
  explanation:'45 + 4 + 4 = <b>53 minutes</b>. The usual mistake is to answer 45, treating the replays as part of the original running time; replaying a section adds to the time spent even though the lesson is no longer. It is also why a recording is rarely quicker than a live lesson.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-088', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:3,
  question:'Why does a recorded lesson not fully replace a teacher in a classroom?',
  options:['A recording cannot answer the question this pupil actually has',
           'A recording cannot be watched more than once by the same pupil',
           'A recording cannot contain diagrams, examples or worked answers',
           'A recording cannot be paused at the point the pupil stopped it'],
  answer:'A recording cannot answer the question this pupil actually has',
  hint:'Name the one thing a live teacher does that a finished video can never do.',
  explanation:'Teaching responds: a teacher notices confusion and answers the question that was asked. A recording is fixed at the moment it was made, so a pupil stuck on something the video does not address stays stuck. Replaying, diagrams and pausing are all things a recording does perfectly well.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-089', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:3,
  question:'Two websites give different figures for the population of a country. What is the most likely explanation?',
  options:['The two figures come from counts made in different years',
           'One of the two websites has deliberately invented a figure',
           'Population figures are opinions and cannot be measured at all',
           'The country has two populations, one of them unofficial'],
  answer:'The two figures come from counts made in different years',
  hint:'Before suspecting dishonesty, ask what else could make two honest sources disagree.',
  explanation:'Population changes constantly and is measured at intervals, so two accurate pages can disagree simply because one is older or uses a different estimate. That is why the date of a source matters as much as its author. Assuming invention first is a habit that leaves a pupil unable to use any source.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-090', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:3,
  question:'A pupil copies an online answer into his homework without understanding it. What is the consequence he is most likely to overlook?',
  options:['He cannot answer a question on the same topic in the examination',
           'He receives his homework back later than the rest of his class',
           'He is prevented from using that website for the rest of the year',
           'He has to write the same assignment again in his own handwriting'],
  answer:'He cannot answer a question on the same topic in the examination',
  hint:'Look past the punishment and ask what the homework was supposed to leave behind.',
  explanation:'The mark for one assignment is the small loss; the real one is that the understanding the exercise existed to build was never built, and the examination hall has no website in it. Being caught brings its own penalties, but a pupil who is never caught still walks into the examination with the same gap.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-091', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:3,
  question:'Why should a pupil check the <b>date</b> of a webpage before using its figures?',
  options:['Figures such as population and prices go out of date quickly',
           'Pages written long ago are always written by unqualified people',
           'A recent page has been read by more people than an older page',
           'An old page is likely to have been removed from the internet'],
  answer:'Figures such as population and prices go out of date quickly',
  hint:'Ask which kind of information stops being true simply because time has passed.',
  explanation:'A page can be careful, well written and hopelessly out of date: populations, prices and policies all move. Checking the date tells a reader whether the figure still describes the world. Age says nothing about the author\'s expertise, and old pages stay online for years.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-092', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A pupil revises with her phone face-up beside her, answering each message as it arrives. Her friend revises with the phone in another room. What follows from the first arrangement?',
  options:['Each interruption costs time again to pick up the thread of the work',
           'Each interruption rests the mind, so the same work is done faster',
           'Nothing follows, because replying to a message takes only seconds',
           'Nothing follows, because the phone is needed to look up the answers'],
  answer:'Each interruption costs time again to pick up the thread of the work',
  hint:'Count what a message costs beyond the seconds spent typing the reply.',
  explanation:'The reply is short; returning to where the work was left off is not, and a session broken twenty times is not a session at all. The friend has not given up a tool — she has removed the interruptions while keeping the ability to look something up deliberately when she needs it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-093', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A class must find out how cyclone warning classes work. One group uses a page anyone may edit; another uses the meteorological service\'s own site. Which comparison is right?',
  options:['The service publishes the classes it issues, so it is the primary source',
           'The service is harder to read, so the edited page is the better choice',
           'Both are equally reliable, because both describe the same four classes',
           'Neither can be used, because only a printed textbook may be quoted'],
  answer:'The service publishes the classes it issues, so it is the primary source',
  hint:'Ask which of the two bodies actually decides the thing being described.',
  explanation:'The warning classes exist because the meteorological service issues them, so its own site is the source every other page is copying. An openly edited page may well be accurate, but it is a copy that could be wrong without anyone noticing. Difficulty of reading is a reason to read carefully, not to prefer a second-hand account.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-094', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A video claims a certain revision method doubles examination marks. How should a pupil judge the claim before adopting it?',
  options:['Ask what evidence is offered, and who gains if the claim is believed',
           'Ask how many people have watched the video and left a comment',
           'Adopt it at once, because a method that works should not be delayed',
           'Reject it at once, because a video can never contain useful advice'],
  answer:'Ask what evidence is offered, and who gains if the claim is believed',
  hint:'Two questions decide it: what supports the claim, and what the claimant is getting out of it.',
  explanation:'A strong claim needs evidence, and knowing who profits explains why the claim is being made so confidently — a course or a subscription is often behind it. View counts measure attention rather than truth. Accepting and rejecting on sight are the same mistake: both skip the judging.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-095', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A school has one computer room, and many pupils have no internet at home. A teacher plans to set all homework online. What is the strongest objection?',
  options:['Pupils without a connection are penalised for something not their doing',
           'Pupils with a connection would finish the homework far too quickly',
           'Online homework cannot be marked as accurately as written homework',
           'Online homework takes the teacher much longer to prepare each week'],
  answer:'Pupils without a connection are penalised for something not their doing',
  hint:'Ask who carries the cost of the plan, and whether they chose their situation.',
  explanation:'The plan quietly assumes every household is on the same side of the digital divide, so pupils without access lose marks for their family\'s circumstances rather than their work. Preparation time and marking are real considerations but fall on the teacher; this one falls on the pupils least able to absorb it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-096', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A pupil translates an online article and submits it as his own essay. Set aside the question of cheating: what is the practical consequence?',
  options:['He cannot defend or extend an argument he never worked out',
           'He is likely to have translated one or two of the words wrongly',
           'He will have spent more time translating than writing it himself',
           'He will have produced an essay that is longer than was required'],
  answer:'He cannot defend or extend an argument he never worked out',
  hint:'Imagine him asked one follow-up question about his own essay in class tomorrow.',
  explanation:'An argument built by somebody else cannot be defended, adapted or applied to a new question, because he never made the steps that hold it together. That is what the examination will ask him to do. Translation errors and wasted time are minor beside an essay he cannot stand behind.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-097', chapterId:'g9sms-media', subsection:'media_and_learning', difficulty:4,
  question:'A teacher records her lessons so that absent pupils can catch up. A pupil argues that attendance therefore no longer matters. What is the strongest counter-argument?',
  options:['A recording cannot take his question, and the class can never take his',
           'A recording is always of poorer sound quality than a live lesson is',
           'A recording may be deleted by the school at the end of the term',
           'A recording is not allowed to be watched anywhere except at school'],
  answer:'A recording cannot take his question, and the class can never take his',
  hint:'The recording was made for absence. Ask what is lost when absence becomes the plan.',
  explanation:'A lesson is an exchange: the pupil asks, others hear the answer, and the teacher adjusts. Watching afterwards recovers the content and none of that, and the class loses the questions he would have asked. The recording is a repair for absence, not a substitute for being there.' }));

// ── media_and_lifestyle — g9sms-dpe-098 … 115 ─────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-098', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:1,
  question:'What is the purpose of an advertisement?',
  options:['To persuade the audience to buy or to use something',
           'To report the news of the day accurately and fully',
           'To teach the audience a subject from the syllabus',
           'To record an event so that it can be watched later'],
  answer:'To persuade the audience to buy or to use something',
  hint:'Ask what the advertiser wants the audience to do after seeing it.',
  explanation:'An advertisement exists to <b>persuade</b>, which is why it shows a product at its best and never mentions a rival. Reporting, teaching and recording are other things media do — and an advertisement can look like any of them, which is exactly why the purpose has to be recognised.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-099', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:1,
  question:'What does the term <b>screen time</b> mean?',
  options:['The amount of time spent looking at a screen','The time at which a television programme begins','The time a film lasts from beginning to end','The amount of time a screen takes to switch on'],
  answer:'The amount of time spent looking at a screen',
  hint:'It measures something about the viewer, not about the programme.',
  explanation:'<b>Screen time</b> is how long a person spends in front of a phone, television or computer, added up across the day. It is measured because of what it displaces — sleep, exercise and conversation — rather than because screens are harmful in themselves.' }));

STATIC_QUESTIONS.push(makeText({ id:'g9sms-dpe-100', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:1,
  question:'Write the <b>one word</b> for a person with a large online following who is paid by companies to promote their products.',
  answer:'influencer', alsoAccept:['Influencer','an influencer','influencers'],
  hint:'The word describes the effect the person has on the choices of their followers.',
  explanation:'An <b>influencer</b> is followed for their personality and paid for their recommendations, so the two arrive together and look the same. Recognising that a favourite post may be an advertisement is the first step in judging it, which is why the law increasingly requires such posts to be labelled.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-101', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:2,
  question:'What distinguishes a <b>sponsored</b> post from an ordinary post?',
  options:['The poster has been paid by a company to recommend the product',
           'The poster has bought the product with their own money first',
           'The poster has been followed by a very large number of people',
           'The poster has written the recommendation at unusual length'],
  answer:'The poster has been paid by a company to recommend the product',
  hint:'The difference is about money changing hands, not about the size of the audience.',
  explanation:'A sponsored post is paid for, which means the company had a say in what it says. The audience size, the price of the product and the length of the text change nothing about that relationship. This is why platforms require sponsorship to be declared: without the label it reads as a personal opinion.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-102', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:2,
  question:'Why are pupils advised not to use a bright screen in bed late at night?',
  options:['It makes falling asleep harder, so the next day is spent tired',
           'It damages the screen of the device if it is used in the dark',
           'It uses more electricity at night than during the daytime',
           'It makes the pupil read more slowly than in ordinary light'],
  answer:'It makes falling asleep harder, so the next day is spent tired',
  hint:'Follow the effect past bedtime into the next school day.',
  explanation:'Bright screens late at night delay sleep, and the cost arrives the following day as tiredness and poorer concentration in class. The advice is about the sleep that is lost rather than the eyes at the moment of reading; electricity and wear on the device are not the reason it is given.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-103', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:2,
  question:'Which situation is an example of <b>cyberbullying</b>?',
  options:['Repeatedly posting insults about a classmate in a group chat',
           'Disagreeing with a classmate about a film in a group chat',
           'Forgetting to add a classmate to a group chat about homework',
           'Leaving a group chat after an argument about a school outing'],
  answer:'Repeatedly posting insults about a classmate in a group chat',
  hint:'Bullying is repeated and aimed at hurting a person; not every unpleasant exchange is bullying.',
  explanation:'Cyberbullying is the repeated use of online media to hurt, humiliate or threaten someone, and the audience makes it worse than it would be face to face. Disagreement, an oversight and leaving a chat are ordinary social events — calling them all bullying makes the word useless when it is really needed.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-104', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:2,
  question:'A pupil\'s account is set to public. What does that mean in practice?',
  options:['Anyone at all can see the posts, not only the people he knows',
           'Only the pupils in his class at school are able to see the posts',
           'The posts disappear automatically after they have been read once',
           'The posts can be seen only by people he has accepted as friends'],
  answer:'Anyone at all can see the posts, not only the people he knows',
  hint:'Ask who is excluded by the setting — and whether anyone is.',
  explanation:'A public account is visible to strangers, employers and anyone who searches, not merely to friends. Pupils often picture the handful of people who usually reply and forget the far larger number who can look without ever appearing. A private setting is what restricts posts to accepted contacts.' }));

STATIC_QUESTIONS.push(makeNum({ id:'g9sms-dpe-105', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:2,
  question:'A pupil spends 3 hours a day on his phone on each of the 7 days of a week. How many hours is that in the week altogether?',
  answer:21,
  hint:'Multiply the daily figure by the number of days.',
  explanation:'3 x 7 = <b>21 hours</b> — roughly the length of a school week. Setting the total beside something familiar is the point of the calculation: three hours sounds small each evening, and the week shows what has actually been spent.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-106', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:3,
  question:'Why do advertisements show only ideal images of people and of homes?',
  options:['An ideal image makes the audience want the product being sold',
           'An ideal image is cheaper to photograph than an ordinary one',
           'An ideal image is required by law before a product may be sold',
           'An ideal image is the only kind that prints clearly on a page'],
  answer:'An ideal image makes the audience want the product being sold',
  hint:'Go back to what the advertiser is trying to achieve, and ask how the picture serves it.',
  explanation:'Advertising sells a picture of life that the product is meant to deliver, so the image is built to be wanted rather than to be typical. Recognising that is what stops a viewer measuring their own home or body against a photograph that was arranged, lit and edited for that exact purpose.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-107', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:3,
  question:'By what mechanism does heavy media use reduce physical activity?',
  options:['Hours spent seated are hours not spent walking or playing',
           'Screens weaken the muscles of anyone who looks at them',
           'Media programmes discourage their viewers from taking exercise',
           'Devices are too heavy to be carried while running or playing'],
  answer:'Hours spent seated are hours not spent walking or playing',
  hint:'Ask what the time was being used for before, rather than what the screen does to the body.',
  explanation:'The effect is displacement: time is finite, so hours in front of a screen come out of the hours that were spent moving. The screen does nothing to the muscles directly, and most programmes say nothing about exercise either way — which is why the remedy is about how the day is divided.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-108', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:3,
  question:'Why is it misleading to compare your own life with what friends post online?',
  options:['People post their best moments and leave out the ordinary ones',
           'People post far less often than they actually go out and travel',
           'People post only about events that happened a long time before',
           'People post mainly to inform their families about their health'],
  answer:'People post their best moments and leave out the ordinary ones',
  hint:'Ask what gets left out of a feed, not what gets put into it.',
  explanation:'A feed is a selection of the best moments of many people, set against the whole of your own day, including the dull and difficult parts. The comparison is unfair by construction, which is why it can leave a viewer feeling their ordinary life falls short of everybody else\'s.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-109', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'A family keeps the television on through every meal. One member says it brings them together; another says it keeps them apart. Which weighing is best?',
  options:['They are in the same room but not talking, so one gains and one loses',
           'They are in the same room, so the first is right and the second is wrong',
           'They are not talking, so the second is right and the first is wrong',
           'Neither is right, because watching television affects nobody at all'],
  answer:'They are in the same room but not talking, so one gains and one loses',
  hint:'Both members have noticed something real. Say what each has seen instead of picking a side.',
  explanation:'Shared viewing does gather a household in one place and give it something in common, and it also replaces the conversation a meal used to carry. Both effects are genuine, which is why families argue about it — and why many settle on keeping some meals free rather than banning the set.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-110', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'An advertisement shows athletes drinking a sugary drink after a race. A shopper buys it expecting to become fitter. What has gone wrong in his reasoning?',
  options:['He has taken the company the drink keeps as evidence about the drink',
           'He has taken the price of the drink as evidence about its ingredients',
           'Nothing — athletes would not appear unless the drink improved fitness',
           'Nothing — a drink advertised on television must have been tested first'],
  answer:'He has taken the company the drink keeps as evidence about the drink',
  hint:'Ask what the advertisement actually demonstrates about the drink itself.',
  explanation:'Placing a product beside fit people suggests a connection without ever claiming one, and the shopper has supplied the claim himself. The athletes were paid to appear, so their presence is evidence about the advertising budget rather than about what is in the bottle or what it does.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-111', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'A pupil posts publicly in school uniform, tagging her stop and the time she leaves each day. What follows from the combination?',
  options:['A stranger can work out where she will be and when she will be there',
           'A stranger can work out only the name of the school she attends',
           'Nothing follows, because each of those details is harmless alone',
           'Nothing follows, because her account has a small following only'],
  answer:'A stranger can work out where she will be and when she will be there',
  hint:'Take the three details together rather than one at a time.',
  explanation:'Each detail is ordinary by itself, and together they give a place and a time to anyone who looks — which is precisely how small disclosures add up. A small following is no protection on a public account, because the posts are readable by people who never follow it at all.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-112', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'A cruel comment is posted about a pupil. He can reply in public, or save the evidence, block the account and report it. Compare the two.',
  options:['Replying gives the poster an audience; reporting keeps proof and ends it',
           'Replying settles the matter faster, because the poster is answered at once',
           'Reporting is pointless, because a deleted comment cannot be proved later',
           'Reporting and replying achieve the same result, so either may be chosen'],
  answer:'Replying gives the poster an audience; reporting keeps proof and ends it',
  hint:'Ask what each course gives the poster, and what each leaves the pupil holding.',
  explanation:'A public reply supplies exactly what the comment was fishing for and enlarges the audience, while a screenshot preserves the evidence in case the post is deleted and a report brings in people who can act. The second course removes the attention and keeps the proof; the first does the opposite of both.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-113', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'An influencer is paid to praise a slimming tea; a doctor advises a balanced diet. A viewer asks how to weigh the two. What is the strongest reason to prefer the doctor?',
  options:['The doctor is trained and is not paid by the seller of the product',
           'The doctor is older and has been giving advice for a longer period',
           'The influencer is younger and therefore cannot understand nutrition',
           'The influencer has fewer followers than a hospital has patients'],
  answer:'The doctor is trained and is not paid by the seller of the product',
  hint:'Two things decide it: who is qualified to judge, and who stands to gain from the answer.',
  explanation:'Expertise and independence together are what make advice worth weighing: the doctor is qualified and gains nothing from the choice, while the influencer is paid by the party with something to sell. Age and follower counts measure neither, and dismissing someone for being young is not an argument.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-114', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'An online advertisement reads "Only 3 left — offer ends at midnight!" What is it designed to do, and what should the shopper do?',
  options:['Rush the decision, so the shopper should check the price elsewhere first',
           'Rush the decision, so the shopper should buy before the offer disappears',
           'Report the stock honestly, so the shopper should trust the figure given',
           'Report the stock honestly, so the shopper should wait until tomorrow'],
  answer:'Rush the decision, so the shopper should check the price elsewhere first',
  hint:'Ask what the wording removes from the shopper, then ask how to get it back.',
  explanation:'Scarcity and a deadline are used to remove the time in which a shopper would compare prices or think again, and both can be reset the moment the clock runs out. Recognising the technique restores what it takes away: checking elsewhere costs a few minutes and a genuine bargain survives it.' }));

STATIC_QUESTIONS.push(makeMCQ({ id:'g9sms-dpe-115', chapterId:'g9sms-media', subsection:'media_and_lifestyle', difficulty:4,
  question:'A pupil deletes an embarrassing post an hour after publishing it. A friend says it is now gone for good. What is the correct response?',
  options:['Copies may already exist, because anyone could have saved it',
           'Copies cannot exist, because deleting removes every stored copy',
           'Copies may exist, but only the platform itself is able to see them',
           'Copies cannot exist, because an hour is too short for anyone to act'],
  answer:'Copies may already exist, because anyone could have saved it',
  hint:'Deleting controls one copy. Ask how many copies an hour of public posting can produce.',
  explanation:'Deleting removes the original from the account and reaches nothing that was screenshotted, downloaded or forwarded in the meantime — and an hour is long enough for all three. That is why the decision that matters is made before posting, not afterwards.' }));

})();
