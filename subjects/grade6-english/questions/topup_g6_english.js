'use strict';
// Grade 6 English — top-up questions.
// Writing  g6eng-wr-050..054   chapterId: g6eng-writing
// Passages g6eng-pass-050..059 chapterId: g6eng-passages

function _g6topBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.92em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G6TP_LETTER = _g6topBox(`
<b>Read the letter extract, then answer the question.</b><br><br>
<div style="text-align:right">14 Cascade Road<br>Cascade<br>20 August 2026</div>
The Manager<br>
Grand Bay Leisure Park<br>
Grand Bay<br><br>
Dear Sir or Madam,<br><br>
<b>Re: Broken equipment at the adventure area</b><br><br>
I am writing to draw your attention to a safety concern at Grand Bay Leisure Park. On 16 August, my daughter and I visited the park and found that the rope bridge in the adventure area had two broken handrails. We informed a member of staff, who said he would "pass the message on". As of this letter, four days later, the handrails remain unrepaired.<br><br>
I respectfully request that the equipment be repaired or closed to the public until it is safe. A child could be seriously injured.
`, '#3b82f6');

const _G6TP_NEWS = _g6topBox(`
<b>Read the newspaper report extract, then answer the question.</b><br><br>
<div style="border-bottom:2px solid #991b1b;padding-bottom:4px;margin-bottom:8px">
<div style="font-size:1.1em;font-weight:800;color:#991b1b">School garden feeds the neighbourhood</div>
<div style="font-size:0.85em;color:#64748b">By our reporter &nbsp;|&nbsp; Mahébourg, 19 August</div>
</div>
Grade 6 pupils at St Antoine Primary have grown enough vegetables in their school garden to donate 40 kg of produce to families in the area. The project began in January, when the school received a grant of Rs 8,000 from a local business.<br><br>
"I never believed the children could manage a full growing cycle," said Mrs Dupont, the science teacher who led the project. "They surprised everyone."<br><br>
The school plans to expand the garden next year, but the head teacher said funding had not yet been secured.
`, '#ef4444');

const _G6TP_LEGEND = _g6topBox(`
<b>Read the legend extract, then answer the question.</b><br><br>
Long ago, the old people say, the island of Rodrigues was guarded by a great turtle, as large as a fishing boat, who slept on the seabed and rose to the surface only when a storm was coming. Fishermen learned to watch for the shadow beneath the water. When they saw it, they turned back to shore at once, and all were safe.<br><br>
One fisherman laughed at the old story and set out when the shadow rose. He was never seen again. The turtle, they say, still sleeps beneath the waves.
`, '#8b5cf6');

const _G6TP_REPORT = _g6topBox(`
<b>Read the report and the table, then answer the question.</b><br><br>
<b>Water use in Mauritius primary schools</b><br><br>
A survey of ten primary schools on the plateau measured average daily water use per pupil. Schools with water-saving taps used significantly less water than those without. A school with 300 pupils could therefore save more than 1,000 litres every day by installing water-saving taps.<br><br>
<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
<table style="border-collapse:collapse;width:100%;max-width:420px;font-size:0.93em">
<tr style="background:#dcfce7"><th style="border:1px solid #86efac;padding:4px 8px;text-align:left">School type</th><th style="border:1px solid #86efac;padding:4px 8px">Avg. litres per pupil per day</th></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">With water-saving taps</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">4.2</td></tr>
<tr><td style="border:1px solid #86efac;padding:4px 8px">Without water-saving taps</td><td style="border:1px solid #86efac;padding:4px 8px;text-align:center">7.8</td></tr>
</table>
</div>
`, '#22c55e');

// ── Writing questions ──────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6eng-wr-050', chapterId:'g6eng-writing', difficulty:1,
    question:'In a <b>newspaper report</b>, what information must the FIRST paragraph always contain?',
    options:[
      'The reporter\'s opinion on the event',
      'The key facts: Who, What, Where and When',
      'A quotation from the most important person',
      'Background history of the topic'
    ],
    answer:'The key facts: Who, What, Where and When',
    hint:'Think about a reader who only has time to read one paragraph.',
    explanation:'News reports use the <b>inverted pyramid</b>: the opening paragraph carries the most important facts (Who, What, Where, When — and often Why and How) so a reader who stops there still knows the story. Detail, quotes and background fill the later paragraphs.' }),

  makeMCQ({ id:'g6eng-wr-051', chapterId:'g6eng-writing', difficulty:2,
    question:'Which feature is found in an <b>email</b> but NOT in a printed formal letter?',
    options:[
      'A date',
      'A "Subject:" field in the header',
      'A greeting such as "Dear Sir/Madam"',
      'A closing such as "Yours faithfully"'
    ],
    answer:'A "Subject:" field in the header',
    hint:'Emails have special header fields generated by the email software that printed letters do not.',
    explanation:'Emails display a structured header with <b>To, From, Cc and Subject</b> fields. Printed letters do not have these. Both forms can include a date, a greeting and a formal closing. The email Subject line serves the same purpose as the "Re:" line in a formal letter, but appears in the header rather than the body of the message.' }),

  makeMCQ({ id:'g6eng-wr-052', chapterId:'g6eng-writing', difficulty:2,
    question:'An advertisement claims: <i>"Join the thousands of happy families who already use BrightSpark!"</i> Which persuasive technique is being used?',
    options:[
      'A rhetorical question',
      'An expert opinion',
      'Bandwagon appeal — implying that everyone else has already joined',
      'A simile comparing the product to something bright'
    ],
    answer:'Bandwagon appeal — implying that everyone else has already joined',
    hint:'The word "already" and "thousands" are doing most of the persuasive work.',
    explanation:'"<b>Bandwagon</b>" is a persuasive technique that makes the reader feel left out if they do not join the crowd. "Thousands" overstates the scale and "already" implies the reader is behind everyone else. MIE Grade 6 lists bandwagon, expert opinion, emotional appeal, statistics and repetition as key advertising techniques.' }),

  makeMCQ({ id:'g6eng-wr-053', chapterId:'g6eng-writing', difficulty:3,
    question:'Read this extract: <br><i>"The fire broke out at 03:00 on Tuesday. Firefighters from Curepipe station arrived within eight minutes and brought the blaze under control. No injuries were reported."</i><br>Which text type does this best match, and why?',
    options:[
      'A formal letter — because it is written in the third person',
      'A narrative story — because it describes a dramatic event',
      'A newspaper report — because it states precise facts in the past tense with named sources and times',
      'A factual report — because it uses subheadings'
    ],
    answer:'A newspaper report — because it states precise facts in the past tense with named sources and times',
    hint:'Notice the specific time, the named fire station and the measured response time.',
    explanation:'A <b>newspaper report</b> answers Who/What/Where/When/How with verifiable details — times, numbers and named organisations — written in the <b>past tense, third person</b>, without the author\'s personal feelings. A narrative would include character thoughts and dialogue; a factual report would have subheadings and typically uses the present tense.' }),

  makeMCQ({ id:'g6eng-wr-054', chapterId:'g6eng-writing', difficulty:4,
    question:'A student drafts the opening of a <b>formal letter of application</b> for a library volunteer role: <br><i>"Hi, I\'d love to work at your library cos I really like books."</i><br>Which rewrite corrects ALL the problems?',
    options:[
      '"Hello, I would love to work at your library because I like books."',
      '"I am writing to apply for the position of library volunteer, as I have a keen interest in reading and community service."',
      '"Dear Library, I am applying for the job. I like books a lot."',
      '"I\'d like to apply for the volunteer position at your library."'
    ],
    answer:'"I am writing to apply for the position of library volunteer, as I have a keen interest in reading and community service."',
    hint:'Check for: contractions, slang, vague language and a clearly stated purpose.',
    explanation:'The original has three problems: (1) <b>contractions</b> ("I\'d", "cos"), (2) <b>informal greeting and slang</b> ("Hi", "cos"), (3) <b>vague reason</b> ("really like books"). The correct rewrite uses full forms ("I am writing"), names the position precisely, avoids contractions and slang, and gives a purposeful reason. Option A removes contractions but keeps "Hello" (still informal); C names no specific role; D still uses "I\'d".' }),

);

// ── Passage questions ──────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  // ── Passage A: formal letter ──────────────────────────────────────────
  makeMCQ({ id:'g6eng-pass-050', chapterId:'g6eng-passages', difficulty:1,
    question:`${_G6TP_LETTER}What exactly is the writer asking the park manager to do?`,
    options:[
      'Refund the entrance fee for the visit on 16 August',
      'Repair or close the broken rope bridge',
      'Dismiss the staff member who ignored the complaint',
      'Redesign the entire adventure area'
    ],
    answer:'Repair or close the broken rope bridge',
    hint:'The "Re:" subject line and the request paragraph both state this directly.',
    explanation:'The subject line reads "Re: <b>Broken equipment at the adventure area</b>" and the penultimate paragraph says: "I respectfully request that <b>the equipment be repaired or closed to the public until it is safe</b>." Formal letters always restate the specific request clearly in a dedicated paragraph.' }),

  makeMCQ({ id:'g6eng-pass-051', chapterId:'g6eng-passages', difficulty:2,
    question:`${_G6TP_LETTER}Why does the writer mention that "four days later, the handrails remain unrepaired"?`,
    options:[
      'To show that four days is too long to wait for any repair',
      'To prove the staff member deliberately lied',
      'To show that the verbal report produced no result, strengthening the case for a written complaint',
      'To give the manager the exact date when the damage occurred'
    ],
    answer:'To show that the verbal report produced no result, strengthening the case for a written complaint',
    hint:'Why would someone write a formal letter rather than just tell a staff member?',
    explanation:'"Four days later, the handrails remain unrepaired" shows that the verbal report to the staff member had <b>no effect</b>. This strengthens the written complaint: the writer is not being hasty — they waited and nothing happened. In formal writing, showing that an earlier, simpler attempt failed makes a stronger case for action.' }),

  makeMCQ({ id:'g6eng-pass-052', chapterId:'g6eng-passages', difficulty:3,
    question:`${_G6TP_LETTER}The letter ends: "A child could be seriously injured." What is the persuasive purpose of this sentence?`,
    options:[
      'To threaten legal action against the park',
      'To appeal to the manager\'s sense of responsibility by raising the consequence of inaction',
      'To provide a statistic about playground accidents in Mauritius',
      'To explain why the writer\'s daughter is afraid of rope bridges'
    ],
    answer:'To appeal to the manager\'s sense of responsibility by raising the consequence of inaction',
    hint:'The sentence does not make a threat — it paints a picture of what could happen if nothing is done.',
    explanation:'By ending with a <b>consequence of inaction</b> ("A child could be seriously injured"), the writer appeals to the manager\'s duty of care without making a direct threat. This combines an <b>emotional appeal</b> with a logical argument: fix it now, or something worse will happen. It is more powerful than simply repeating the request.' }),

  // ── Passage B: newspaper report ──────────────────────────────────────
  makeMCQ({ id:'g6eng-pass-053', chapterId:'g6eng-passages', difficulty:1,
    question:`${_G6TP_NEWS}How much produce did the pupils donate to families in the area?`,
    options:['Rs 8,000 worth of vegetables','40 kg of produce','A full growing cycle worth','One basket per family'],
    answer:'40 kg of produce',
    hint:'Be careful — the report contains several numbers that mean different things.',
    explanation:'"They donated <b>40 kg of produce</b> to families in the area." Rs 8,000 is the grant the school received; "a full growing cycle" is what Mrs Dupont doubted they could manage. News reports often pack many figures into one paragraph, so match each number carefully to its noun.' }),

  makeMCQ({ id:'g6eng-pass-054', chapterId:'g6eng-passages', difficulty:2,
    question:`${_G6TP_NEWS}The head teacher says funding "had not yet been secured". What does this tell the reader about the expansion plan?`,
    options:[
      'The expansion will definitely happen next year',
      'The school has already received a second grant',
      'The expansion is planned but not guaranteed because the money has not been found',
      'The head teacher does not support the project'
    ],
    answer:'The expansion is planned but not guaranteed because the money has not been found',
    hint:'Focus on the word "yet" — what does it imply about the future?',
    explanation:'"Had not yet been secured" means the money is <b>not in place</b>. "Yet" implies it may come, but the plan cannot go ahead without it. This hedges the positive story of the first two paragraphs — a sign of <b>balanced reporting</b>. Contrast this with "has been secured", which would confirm the funding exists.' }),

  makeMCQ({ id:'g6eng-pass-055', chapterId:'g6eng-passages', difficulty:3,
    question:`${_G6TP_NEWS}Why does the reporter include Mrs Dupont\'s quotation?`,
    options:[
      'Because the reporter could not find any other information about the project',
      'To add a named, first-hand voice that confirms how impressive the pupils\' achievement was',
      'To fill space at the end of the article',
      'Because Mrs Dupont paid for the grant'
    ],
    answer:'To add a named, first-hand voice that confirms how impressive the pupils\' achievement was',
    hint:'Think about what a direct quote adds that a plain statement of fact cannot.',
    explanation:'A direct quote from a <b>named person with first-hand knowledge</b> adds credibility and human interest. Mrs Dupont led the project, so she is an authoritative source. Her surprise ("I never believed…") makes the pupils\' success more vivid than a plain statement such as "the project was a success". Quotes also prove the reporter spoke directly to people involved.' }),

  // ── Passage C: legend ────────────────────────────────────────────────
  makeMCQ({ id:'g6eng-pass-056', chapterId:'g6eng-passages', difficulty:1,
    question:`${_G6TP_LEGEND}According to the legend, what did fishermen do when they saw the turtle\'s shadow?`,
    options:[
      'They caught the turtle and brought it to shore',
      'They turned back to shore at once',
      'They sailed faster to outrun the storm',
      'They threw offerings into the sea'
    ],
    answer:'They turned back to shore at once',
    hint:'The answer is in the second sentence of the legend.',
    explanation:'"When they saw it, <b>they turned back to shore at once</b>, and all were safe." The turtle rising was a warning sign, not a danger in itself. The one fisherman who ignored the warning was never seen again.' }),

  makeMCQ({ id:'g6eng-pass-057', chapterId:'g6eng-passages', difficulty:3,
    question:`${_G6TP_LEGEND}Which phrase most clearly identifies this as a <b>legend</b> rather than a factual account?`,
    options:[
      '"as large as a fishing boat"',
      '"the old people say"',
      '"a storm was coming"',
      '"He was never seen again"'
    ],
    answer:'"the old people say"',
    hint:'Which phrase admits the story is passed down by word of mouth rather than verified?',
    explanation:'"<b>The old people say</b>" marks the tale as <b>oral tradition</b> — handed down through generations, not documented or verified. A factual account would give a named source, a date or a reference. The formula "Long ago, the old people say…" is a classic opening for legends in many cultures, signalling that what follows cannot be checked as fact.' }),

  // ── Passage D: factual report with table ─────────────────────────────
  makeMCQ({ id:'g6eng-pass-058', chapterId:'g6eng-passages', difficulty:2,
    question:`${_G6TP_REPORT}According to the table, how many more litres per pupil per day does a school WITHOUT water-saving taps use compared to one WITH them?`,
    options:['3.0 litres','3.6 litres','4.2 litres','7.8 litres'],
    answer:'3.6 litres',
    hint:'Subtract the smaller figure from the larger one.',
    explanation:'7.8 &minus; 4.2 = <b>3.6 litres</b> per pupil per day. Reading a table means matching the correct row to the correct column and performing whatever calculation the question requires — here, a simple subtraction.' }),

  makeMCQ({ id:'g6eng-pass-059', chapterId:'g6eng-passages', difficulty:4,
    question:`${_G6TP_REPORT}The report claims a 300-pupil school could save "more than 1,000 litres every day". Does the table support this claim?`,
    options:[
      'No — 300 × 3.6 = 1,080, which is more than 1,000, so the claim is exaggerated',
      'Yes — 300 × 3.6 = 1,080, which is more than 1,000, so the table confirms the claim',
      'Yes — 300 × 7.8 = 2,340, so the school already saves 2,340 litres',
      'No — the table gives per-pupil data only, so no school total can be calculated'
    ],
    answer:'Yes — 300 × 3.6 = 1,080, which is more than 1,000, so the table confirms the claim',
    hint:'Use the saving per pupil (the difference between the two rows) and multiply by 300.',
    explanation:'Saving per pupil = 7.8 &minus; 4.2 = 3.6 litres. For 300 pupils: 300 &times; 3.6 = <b>1,080 litres</b>, which is indeed more than 1,000. The table <b>supports</b> the report\'s claim. Reading a factual report critically means checking the text\'s claims against the data — not just accepting them at face value.' }),

);
