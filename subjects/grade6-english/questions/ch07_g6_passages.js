'use strict';
// Grade 6 English - Chapter: Passages & Text Types
// IDs format: g6eng-psg-NNN
// Five MIE Grade 6 text types: formal letter, newspaper report, advertisement,
// legend/folktale, factual report with a data table. Grade 6 questions push
// past literal retrieval into inference, tone, bias and writer's purpose.

function _g6psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.92em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G6PSG_FORMAL = _g6psgBox(`
<b style="color:#1e40af">Read the letter, then answer the question.</b><br><br>
<div style="text-align:right">Grade 6 Environment Club<br>Beau Bassin Government School<br>Beau Bassin<br><br>12 May 2026</div>
The Chief Executive<br>
Municipal Council of Beau Bassin-Rose Hill<br>
Rose Hill<br><br>
Dear Sir or Madam,<br><br>
<b>RE: Request for two additional bins at Balfour Garden</b><br><br>
We are writing on behalf of the thirty members of our school Environment Club.<br><br>
On Saturday 2 May we spent two hours collecting litter in Balfour Garden. In that time we filled eleven bags, mostly with plastic bottles and food wrappers. We counted only <b>two</b> bins in the whole garden, both of them beside the main gate and both overflowing by ten o'clock in the morning.<br><br>
We believe the litter problem is not caused by carelessness alone. Visitors who sit on the far side of the garden must walk more than two hundred metres to reach a bin.<br><br>
We therefore respectfully request that two additional bins be placed near the children's play area and near the viewpoint. We would also be glad to design and paint signs encouraging visitors to use them, at no cost to the Council.<br><br>
We look forward to your reply.<br><br>
Yours faithfully,<br>
<b>Kavisha Ramdhany</b><br>
Secretary, Grade 6 Environment Club
`, '#3b82f6');

const _G6PSG_NEWS = _g6psgBox(`
<b style="color:#b91c1c">Read the newspaper report, then answer the question.</b><br><br>
<div style="border-bottom:2px solid #991b1b;padding-bottom:4px;margin-bottom:8px">
<div style="font-size:1.15em;font-weight:800;color:#991b1b">Pupils' tortoise count surprises scientists</div>
<div style="font-size:0.85em;color:#64748b">By our education reporter &nbsp;|&nbsp; Rodrigues, 14 June</div>
</div>
A group of forty primary pupils from Port Mathurin has completed a three-day survey of giant tortoises at a nature reserve on the island, and their figures have caught the attention of researchers.<br><br>
The pupils, aged between nine and twelve, were each given a numbered clipboard and asked to record every tortoise they saw in a marked section of the reserve. They recorded 214 animals in total.<br><br>
"We expected the children to miss a great many," said Dr Anouk Perrine, who supervised the survey. "In fact their count was within four animals of our own. Young eyes are close to the ground, and tortoises are close to the ground."<br><br>
Not everyone is convinced the exercise should be repeated. One conservation officer, who asked not to be named, warned that large groups of visitors can disturb nesting females.<br><br>
The reserve says it will publish the full results in September and is considering inviting a second school to take part next year.
`, '#ef4444');

const _G6PSG_ADVERT = _g6psgBox(`
<b style="color:#b45309">Read the advertisement, then answer the question.</b><br><br>
<div style="border:3px solid #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="text-align:center;font-size:1.3em;font-weight:800;color:#b45309">SUPER STUDY TABLET</div>
<div style="text-align:center;font-style:italic">"The tablet that turns homework into fun!"</div>
<div style="text-align:center;font-size:1.5em;font-weight:800;margin:8px 0;color:#166534">ONLY Rs 4,999*</div>
&bull; Over <b>500 lessons</b> for Grades 4 to 6<br>
&bull; <b>9 out of 10 parents</b> say their child enjoys studying more<br>
&bull; Free carry case while stocks last<br>
&bull; Trusted by thousands of Mauritian families<br><br>
<div style="border-top:1px dashed #d97706;padding-top:6px;font-size:0.78em;color:#78716c">
*Price is for the 32 GB model paid in full. Instalment price Rs 6,240 over 12 months. Lesson content requires a subscription of Rs 199 per month after the first 30 days. Survey of 40 parents at one launch event, March 2026. Offer ends 31 July. Warranty 6 months, does not cover screen damage.
</div>
</div>
`, '#f59e0b');

const _G6PSG_LEGEND = _g6psgBox(`
<b style="color:#7c3aed">Read the legend, then answer the question.</b><br><br>
<b>The Legend of Pieter Both</b><br><br>
Long ago, so the old people of Mauritius say, a milkman climbed the mountain path each dawn with two heavy cans, one on each shoulder.<br><br>
Halfway up he came upon a circle of fairies dancing in the mist. They stopped, and their queen stepped forward. "You may watch us," she said, "and we shall fill your cans with silver each morning. But if you ever speak of what you have seen, you will be turned to stone."<br><br>
For many months the milkman kept the bargain and grew rich. Then one evening, warm with the praise of his neighbours, he began to boast in the village square of the little dancers on the mountain.<br><br>
He did not finish the sentence. In the morning the villagers looked up and saw, balanced on the summit, a great round boulder shaped like a man's head.<br><br>
It stands there still, and the mountain carries the milkman's name.
`, '#8b5cf6');

const _G6PSG_REPORT = _g6psgBox(`
<b style="color:#15803d">Read the report and the table, then answer the question.</b><br><br>
<b>Rainfall and the Mauritian school year</b><br><br>
Mauritius has two seasons. The warm, wet summer runs from November to April; the cooler, drier winter runs from May to October. Most of the island's rain falls on the central plateau, and far less falls along the west coast. The difference matters: the plateau supplies much of the water that reservoirs store for the dry months.<br><br>
The table shows average monthly rainfall recorded at two stations.<br><br>
<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
<table style="border-collapse:collapse;width:100%;max-width:420px;min-width:280px;font-size:0.95em">
<tr style="background:#dcfce7"><th style="border:1px solid #86efac;padding:4px 8px;text-align:left">Month</th><th style="border:1px solid #86efac;padding:4px 8px">Plateau (mm)</th><th style="border:1px solid #86efac;padding:4px 8px">West coast (mm)</th></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">January</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">310</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">75</td></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">April</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">200</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">55</td></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">July</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">105</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">25</td></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">October</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">60</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">20</td></tr>
</table>
</div>
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXT A: formal letter ──────────────────────────────────────────
  makeMCQ({ id:'g6eng-psg-001', chapterId:'g6eng-passages', subsection:'letter', difficulty:1,
    question:`${_G6PSG_FORMAL}What exactly are the pupils asking the Council to do?`,
    options:[
      'To clean Balfour Garden every Saturday',
      'To place two extra bins in the garden',
      'To close the garden to visitors',
      'To pay the club for the litter it collected'
    ],
    answer:'To place two extra bins in the garden',
    hint:'The RE: line at the top of a formal letter states the request in one line.',
    explanation:'The subject line reads "RE: <b>Request for two additional bins at Balfour Garden</b>", and the fifth paragraph names the two locations. Everything before that is the evidence supporting the request.' }),

  makeMCQ({ id:'g6eng-psg-002', chapterId:'g6eng-passages', subsection:'letter', difficulty:2,
    question:`${_G6PSG_FORMAL}The letter ends "Yours faithfully" rather than "Yours sincerely". Why?`,
    options:[
      'The writer does not know the name of the person she is writing to',
      '"Yours faithfully" is used only by children',
      'The letter is a complaint rather than a request',
      'The letter is longer than one page'
    ],
    answer:'The writer does not know the name of the person she is writing to',
    hint:'Look at how the letter opens.',
    explanation:'The letter opens "<b>Dear Sir or Madam</b>", which means the writer does not know the recipient\'s name. The convention is: <b>Dear Sir/Madam → Yours faithfully</b>; <b>Dear Mr/Mrs [Name] → Yours sincerely</b>.' }),

  makeMCQ({ id:'g6eng-psg-003', chapterId:'g6eng-passages', subsection:'letter', difficulty:3,
    question:`${_G6PSG_FORMAL}Which sentence is the strongest EVIDENCE that the garden does not have enough bins?`,
    options:[
      'We are writing on behalf of the thirty members of our school Environment Club.',
      'Both bins were overflowing by ten o\'clock in the morning.',
      'We look forward to your reply.',
      'We would also be glad to design and paint signs.'
    ],
    answer:'Both bins were overflowing by ten o\'clock in the morning.',
    hint:'Evidence is something observed and measurable, not an opinion or an offer.',
    explanation:'"<b>Both overflowing by ten o\'clock in the morning</b>" is an observed fact with a time attached - it proves the existing bins cannot cope. The other options state who is writing, offer help, or close the letter; none of them proves the shortage.' }),

  makeMCQ({ id:'g6eng-psg-004', chapterId:'g6eng-passages', subsection:'letter', difficulty:3,
    question:`${_G6PSG_FORMAL}Why do the pupils offer to design and paint the signs themselves, at no cost?`,
    options:[
      'To show that they enjoy art lessons',
      'To make it easier for the Council to say yes by removing part of the cost',
      'Because the Council has already refused a similar request',
      'Because signs are more important than bins'
    ],
    answer:'To make it easier for the Council to say yes by removing part of the cost',
    hint:'What is the usual reason a council refuses a request?',
    explanation:'Councils usually refuse because of <b>cost</b>. By offering free labour, the pupils remove one objection before it is raised - a persuasive move known as <b>anticipating the counter-argument</b>.' }),

  makeMCQ({ id:'g6eng-psg-005', chapterId:'g6eng-passages', subsection:'letter', difficulty:4,
    question:`${_G6PSG_FORMAL}Your class must rewrite one sentence of this letter to make it MORE persuasive. Which rewrite adds genuine force?`,
    options:[
      'Change "eleven bags" to "lots and lots of bags".',
      'Change "We therefore respectfully request" to "You must give us bins now".',
      'Add: "Eleven bags of litter were removed by thirty children in two hours - the Council\'s own cleaners visit once a week."',
      'Add three exclamation marks after the request.'
    ],
    answer:'Add: "Eleven bags of litter were removed by thirty children in two hours - the Council\'s own cleaners visit once a week."',
    hint:'In formal writing, force comes from evidence and comparison, not from volume.',
    explanation:'Adding a <b>comparison backed by numbers</b> makes the problem impossible to dismiss. Replacing figures with "lots and lots" <i>weakens</i> the letter; demanding and shouting break the formal register and make a council less likely to help.' }),

  // ── TEXT B: newspaper report ───────────────────────────────────────
  makeMCQ({ id:'g6eng-psg-006', chapterId:'g6eng-passages', subsection:'report', difficulty:1,
    question:`${_G6PSG_NEWS}How many tortoises did the pupils record?`,
    options:['40','214','218','Four'],
    answer:'214',
    hint:'Be careful - the report contains several numbers that mean different things.',
    explanation:'"They recorded <b>214 animals in total</b>." 40 is the number of pupils and "within four animals" describes how close their count was to the researchers\'. Newspaper reports pack many figures into few lines, so match each number to its noun.' }),

  makeMCQ({ id:'g6eng-psg-007', chapterId:'g6eng-passages', subsection:'report', difficulty:2,
    question:`${_G6PSG_NEWS}Which paragraph of a newspaper report contains the most important facts?`,
    options:['The first','The last','The one with the quotation','The headline only'],
    answer:'The first',
    hint:'Think about a reader who stops after one paragraph.',
    explanation:'News reports are written as an <b>inverted pyramid</b>: the opening paragraph carries who, what, where and when, so a reader who stops there still has the story. Later paragraphs add detail, quotations and background.' }),

  makeMCQ({ id:'g6eng-psg-008', chapterId:'g6eng-passages', subsection:'report', difficulty:3,
    question:`${_G6PSG_NEWS}Why does the reporter include the view of the conservation officer?`,
    options:[
      'To fill space at the end of the article',
      'To give a balanced report by including an opposing view',
      'To prove that the pupils counted wrongly',
      'Because the officer paid for the survey'
    ],
    answer:'To give a balanced report by including an opposing view',
    hint:'A report is not the same as an advertisement.',
    explanation:'A fair report presents <b>more than one side</b>. Dr Perrine is impressed; the conservation officer is worried about disturbing nesting females. Including both is called <b>balance</b>, and it is a duty of news reporting.' }),

  makeMCQ({ id:'g6eng-psg-009', chapterId:'g6eng-passages', subsection:'report', difficulty:3,
    question:`${_G6PSG_NEWS}The officer "asked not to be named". What does this tell a careful reader?`,
    options:[
      'The officer invented the concern',
      'The officer did not want to be identified, so the claim cannot be checked as easily',
      'The reporter forgot to write the name down',
      'Anonymous sources are never allowed in newspapers'
    ],
    answer:'The officer did not want to be identified, so the claim cannot be checked as easily',
    hint:'What can a reader do with a named source that they cannot do with an unnamed one?',
    explanation:'An <b>unnamed source</b> cannot be contacted or held responsible, so the reader cannot verify the claim. It may still be true - people often stay anonymous to protect their job - but a critical reader weighs it less heavily than Dr Perrine\'s named, on-the-record comment.' }),

  makeTF({ id:'g6eng-psg-010', chapterId:'g6eng-passages', subsection:'report', difficulty:2,
    question:`${_G6PSG_NEWS}The reserve has already decided to invite a second school next year.`,
    answer:false,
    hint:'Look closely at the verb in the final sentence.',
    explanation:'<b>False.</b> The report says the reserve "<b>is considering</b> inviting a second school" - considering is not deciding. Exam questions often turn on one such verb, so read the final sentence twice.' }),

  // ── TEXT C: advertisement ──────────────────────────────────────────
  makeMCQ({ id:'g6eng-psg-011', chapterId:'g6eng-passages', subsection:'advert', difficulty:2,
    question:`${_G6PSG_ADVERT}What does the asterisk (*) after "Rs 4,999" tell the reader to do?`,
    options:[
      'Multiply the price by the number of lessons',
      'Read the small print at the bottom, where conditions are given',
      'Note that the price includes delivery',
      'Ignore the price - it is only a guide'
    ],
    answer:'Read the small print at the bottom, where conditions are given',
    hint:'The same symbol appears twice in the advert.',
    explanation:'An <b>asterisk</b> links a claim to a footnote. Here it leads to the small print, which reveals the price is for one particular model paid in full - the instalment price is Rs 6,240.' }),

  makeMCQ({ id:'g6eng-psg-012', chapterId:'g6eng-passages', subsection:'advert', difficulty:3,
    question:`${_G6PSG_ADVERT}A family buys the tablet outright and uses it for a full year. What is the REAL first-year cost?`,
    options:['Rs 4,999','Rs 6,240','Rs 7,188','Rs 7,188 plus Rs 4,999'],
    answer:'Rs 7,188',
    hint:'Add eleven months of subscription to the purchase price - the first 30 days are free.',
    explanation:'Rs 4,999 for the tablet, plus a subscription of Rs 199 &times; 11 months (the first 30 days are free) = Rs 2,189. Total = <b>Rs 7,188</b>. The advertised price hides nearly a third of the real cost in the footnote.' }),

  makeMCQ({ id:'g6eng-psg-013', chapterId:'g6eng-passages', subsection:'advert', difficulty:3,
    question:`${_G6PSG_ADVERT}Why is the claim "9 out of 10 parents say their child enjoys studying more" weaker than it first appears?`,
    options:[
      'Nine out of ten is a small proportion',
      'It is based on 40 parents at one launch event, who are unlikely to represent all buyers',
      'Parents are not allowed to judge tablets',
      'The advert does not say which grades were tested'
    ],
    answer:'It is based on 40 parents at one launch event, who are unlikely to represent all buyers',
    hint:'The footnote tells you who was actually asked, and where.',
    explanation:'The small print says "Survey of <b>40 parents at one launch event</b>". People who attend a product launch are already interested in the product, so the sample is <b>small and biased</b>. A statistic is only as strong as the group it came from.' }),

  makeMCQ({ id:'g6eng-psg-014', chapterId:'g6eng-passages', subsection:'advert', difficulty:4,
    question:`${_G6PSG_ADVERT}Your friend says, "It's a bargain - it's guaranteed, so if anything breaks they'll fix it." How would you correct her using the advert?`,
    options:[
      'The warranty lasts 6 months and does not cover screen damage - the most likely fault',
      'There is no warranty at all',
      'The warranty only applies if you pay by instalments',
      'The warranty covers everything but lasts only 30 days'
    ],
    answer:'The warranty lasts 6 months and does not cover screen damage - the most likely fault',
    hint:'Read the very last line of the small print.',
    explanation:'The footnote states: "Warranty <b>6 months, does not cover screen damage</b>." A cracked screen is the commonest tablet fault, so the guarantee is far less useful than it sounds. Reading the exclusions is as important as reading the promise.' }),

  // ── TEXT D: legend ─────────────────────────────────────────────────
  makeMCQ({ id:'g6eng-psg-015', chapterId:'g6eng-passages', subsection:'story', difficulty:1,
    question:`${_G6PSG_LEGEND}What condition did the fairy queen set?`,
    options:[
      'That the milkman must never climb the mountain again',
      'That he must never speak of what he had seen',
      'That he must share the silver with the village',
      'That he must dance with the fairies each dawn'
    ],
    answer:'That he must never speak of what he had seen',
    hint:'The condition is in the queen\'s own words, after the word "But".',
    explanation:'"But if you ever <b>speak of what you have seen</b>, you will be turned to stone." In legends the condition is always stated plainly at the start - so the reader can see the ending coming.' }),

  makeMCQ({ id:'g6eng-psg-016', chapterId:'g6eng-passages', subsection:'story', difficulty:2,
    question:`${_G6PSG_LEGEND}"He did not finish the sentence." What has happened at this point in the story?`,
    options:[
      'He was interrupted by his neighbours',
      'He was turned to stone in the middle of boasting',
      'He decided to keep the secret after all',
      'He fell asleep in the village square'
    ],
    answer:'He was turned to stone in the middle of boasting',
    hint:'The next paragraph tells you what the villagers saw the following morning.',
    explanation:'The punishment falls instantly - the very next line describes a boulder "shaped like a man\'s head" on the summit. The writer leaves the transformation <b>unstated</b>, which makes it more striking than describing it would.' }),

  makeMCQ({ id:'g6eng-psg-017', chapterId:'g6eng-passages', subsection:'story', difficulty:3,
    question:`${_G6PSG_LEGEND}What is the MORAL of this legend?`,
    options:[
      'Never climb mountains alone',
      'Boasting and breaking a promise bring ruin',
      'Fairies should be avoided at all costs',
      'Hard work always leads to wealth'
    ],
    answer:'Boasting and breaking a promise bring ruin',
    hint:'What exactly was the milkman doing at the moment he was punished?',
    explanation:'He was punished not for seeing the fairies, nor for taking the silver, but for <b>boasting and so breaking his promise</b>. Legends usually end by teaching a lesson - that lesson is the moral.' }),

  makeMCQ({ id:'g6eng-psg-018', chapterId:'g6eng-passages', subsection:'report', difficulty:3,
    question:`${_G6PSG_LEGEND}Which phrase shows that this is a LEGEND rather than a news report?`,
    options:[
      '"so the old people of Mauritius say"',
      '"each dawn with two heavy cans"',
      '"For many months"',
      '"in the village square"'
    ],
    answer:'"so the old people of Mauritius say"',
    hint:'Which phrase admits the story is handed down rather than verified?',
    explanation:'"<b>so the old people of Mauritius say</b>" marks the tale as <b>oral tradition</b> - passed from generation to generation, not checked as fact. A news report would name a source and a date instead.' }),

  // ── TEXT E: factual report with table ──────────────────────────────
  makeMCQ({ id:'g6eng-psg-019', chapterId:'g6eng-passages', subsection:'report', difficulty:2,
    question:`${_G6PSG_REPORT}In which of the four months shown is the difference in rainfall between the two stations GREATEST?`,
    options:['January','April','July','October'],
    answer:'January',
    hint:'Subtract the west-coast figure from the plateau figure for each row.',
    explanation:'January: 310 &minus; 75 = <b>235 mm</b>. April: 200 &minus; 55 = 145 mm. July: 105 &minus; 25 = 80 mm. October: 60 &minus; 20 = 40 mm. The gap is widest in <b>January</b>, at the height of the wet summer.' }),

  makeMCQ({ id:'g6eng-psg-020', chapterId:'g6eng-passages', subsection:'report', difficulty:3,
    question:`${_G6PSG_REPORT}Which statement is supported BOTH by the text and by the table?`,
    options:[
      'The west coast is the wettest part of Mauritius',
      'The plateau receives more rain than the west coast in every month shown',
      'October is the wettest month of the year',
      'Reservoirs are built on the west coast'
    ],
    answer:'The plateau receives more rain than the west coast in every month shown',
    hint:'Check the claim against all four rows, then against the paragraph.',
    explanation:'The text says "Most of the island\'s rain falls on the <b>central plateau</b>, and far less falls along the west coast", and the table confirms it in all four rows (310>75, 200>55, 105>25, 60>20). The other options contradict the data.' }),

  makeMCQ({ id:'g6eng-psg-021', chapterId:'g6eng-passages', subsection:'report', difficulty:4,
    question:`${_G6PSG_REPORT}A hotel on the west coast plans an outdoor wedding and wants the lowest chance of rain. Using the report, which month should it choose, and why?`,
    options:[
      'January, because the plateau catches the rain instead',
      'October, because it is in the dry winter and shows the lowest rainfall of the four months',
      'April, because summer is ending',
      'July, because winter has just begun'
    ],
    answer:'October, because it is in the dry winter and shows the lowest rainfall of the four months',
    hint:'Find the smallest west-coast figure, then check the text says which season that month belongs to.',
    explanation:'October records the lowest west-coast rainfall (<b>20 mm</b>) and the text places May to October in the <b>cooler, drier winter</b>. July is also winter but wetter (25 mm). January is peak summer - the wettest of all, whatever the plateau does.' }),

);
