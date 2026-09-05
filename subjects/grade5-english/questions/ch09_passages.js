'use strict';
// Grade 5 English - Chapter: Passages & Text Types
// IDs format: g5eng-psg-NNN
// Five MIE Grade 5 text types: email, informal letter, personal narrative,
// advertisement/announcement, poem. Passage is repeated inside each question
// because practice and exam mode both serve single questions at random.

function _g5psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G5PSG_EMAIL = _g5psgBox(`
<b style="color:#1e40af">Read the email, then answer the question.</b><br><br>
<div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
<div style="background:#eef2ff;padding:8px 10px;font-size:0.95em;line-height:1.5">
<b>From:</b> priya.seeruttun@gmail.com<br>
<b>To:</b> mrs.bhoyroo@vacoasgs.mu<br>
<b>Cc:</b> parents-grade5@vacoasgs.mu<br>
<b>Subject:</b> Permission for the Black River Gorges field trip
</div>
<div style="padding:10px">
Dear Mrs Bhoyroo,<br><br>
I am writing about the Grade 5 field trip to Black River Gorges National Park on Friday 3 October.<br><br>
I am happy to give permission for my daughter Anjali to take part. I have already paid the Rs 250 to the school office and I attach the receipt.<br><br>
May I ask two questions? First, what time will the bus return to school? Second, Anjali is allergic to peanuts, so I would like to know whether the packed lunch will contain any nuts.<br><br>
Thank you for organising this trip. Anjali has been talking about the waterfall all week.<br><br>
Yours sincerely,<br>
<b>Priya Seeruttun</b><br>
(Mother of Anjali Seeruttun, Grade 5B)
</div>
</div>
`, '#3b82f6');

const _G5PSG_LETTER = _g5psgBox(`
<b style="color:#7c3aed">Read the letter, then answer the question.</b><br><br>
<div style="text-align:right">17, Avenue des Flamboyants<br>Quatre Bornes<br>8 August</div><br>
Dear Grandma,<br><br>
Thank you so much for the birthday parcel. The blue notebook is beautiful and I have already started writing my stories in it.<br><br>
School is going well, but Maths is hard this term. We began long division last week and I got the first four sums wrong. Papa sat with me on Sunday and now I understand where the remainder goes. I got eight out of ten in Tuesday\'s test!<br><br>
Do you remember the guava tree behind our kitchen? It is full of fruit again. Mama says we will make jam and keep a jar for you.<br><br>
Please write and tell me how your knee is. Is it still painful when it rains?<br><br>
With lots of love,<br>
<b>Yashna</b>
`, '#8b5cf6');

const _G5PSG_NARR = _g5psgBox(`
<b style="color:#0e7490">Read the passage, then answer the question.</b><br><br>
<b>The Night of the Cyclone</b><br><br>
I was nine years old the night Cyclone Berguitta passed over Mauritius. By six o\'clock the sky had turned the colour of wet cement and the mango tree outside my window was bending like a bow.<br><br>
Papa nailed a sheet of plywood across the kitchen window while Mama filled every bucket and basin with water. My little brother Kiran thought it was a game and kept switching the torch on and off until Mama took it away from him.<br><br>
At half past eight the lights went out. The whole street went dark at the same moment, and for a second nobody spoke. Then Papa laughed, lit two candles, and said, "Now we tell stories."<br><br>
The wind screamed all night. I did not sleep much. But in the morning the sun came out, the neighbours came out with brooms, and by lunchtime the road was clear again. I remember the candles better than the wind.
`, '#06b6d4');

const _G5PSG_ADVERT = _g5psgBox(`
<b style="color:#b45309">Read the announcement, then answer the question.</b><br><br>
<div style="border:3px solid #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="text-align:center;font-size:1.2em;font-weight:800;color:#b45309">JOIN THE SCHOOL SWIMMING CLUB!</div>
<div style="text-align:center;font-style:italic;margin-bottom:8px">Learn to swim - or swim faster than ever</div>
Coaching every <b>Wednesday and Saturday</b>, 2.00 p.m. - 4.00 p.m.<br>
At the Quatre Bornes municipal pool.<br><br>
&bull; Open to all pupils in Grades 4, 5 and 6<br>
&bull; Fee: <b>Rs 150 per month</b> (Rs 100 if a brother or sister already belongs)<br>
&bull; Bring: swimming costume, towel, cap, water bottle<br>
&bull; Beginners welcome - Coach Devi has trained national swimmers for 12 years<br><br>
<div style="border-top:1px dashed #d97706;padding-top:6px">
Places are limited to <b>30 pupils</b>. Give your completed form to Mr Ramful before <b>Friday 20 September</b>.
</div>
</div>
`, '#f59e0b');

const _G5PSG_POEM = _g5psgBox(`
<b style="color:#15803d">Read the poem, then answer the question.</b><br><br>
<b>The Old Fisherman</b><br><br>
<div style="font-style:italic;line-height:1.9">
Before the sun has left its bed,<br>
He pushes out his faded boat;<br>
The lagoon lies flat and silver-grey,<br>
A sleeping thing that will not float.<br><br>
His hands are maps of thirty years,<br>
Of ropes and salt and morning cold;<br>
He does not sing, he does not speak -<br>
The sea has heard his stories told.<br><br>
And when he comes back through the reef<br>
With silver flashing in his net,<br>
He looks once more towards the deep,<br>
As if he owes the water yet.
</div>
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXT A: email ──────────────────────────────────────────────────
  makeMCQ({ id:'g5eng-psg-001', chapterId:'eng-passages', subsection:'letter', difficulty:1,
    question:`${_G5PSG_EMAIL}What is the MAIN purpose of this email?`,
    options:[
      'To complain about the cost of the trip',
      'To give permission for a child to go on a field trip',
      'To ask for a place in Grade 5B',
      'To invite Mrs Bhoyroo to a birthday party'
    ],
    answer:'To give permission for a child to go on a field trip',
    hint:'The Subject line of an email states its purpose in a few words.',
    explanation:'The subject line reads "<b>Permission for the Black River Gorges field trip</b>" and the second paragraph says "I am happy to give permission". Everything else in the email is a detail that supports that purpose.' }),

  makeMCQ({ id:'g5eng-psg-002', chapterId:'eng-passages', subsection:'letter', difficulty:1,
    question:`${_G5PSG_EMAIL}How much has Mrs Seeruttun already paid?`,
    options:['Rs 150','Rs 250','Rs 300','Nothing yet'],
    answer:'Rs 250',
    hint:'Look for the sentence that mentions the school office.',
    explanation:'"I have already paid the <b>Rs 250</b> to the school office and I attach the receipt." The word <i>already</i> tells you the payment is done, not planned.' }),

  makeMCQ({ id:'g5eng-psg-003', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:`${_G5PSG_EMAIL}Why does Mrs Seeruttun mention peanuts?`,
    options:[
      'She wants peanuts added to the lunch',
      'Her daughter is allergic to them, so the lunch must be checked',
      'She is selling peanuts at the school fair',
      'Peanuts are cheaper than the packed lunch'
    ],
    answer:'Her daughter is allergic to them, so the lunch must be checked',
    hint:'The reason and the request are in the same sentence.',
    explanation:'"Anjali is <b>allergic to peanuts</b>, so I would like to know whether the packed lunch will contain any nuts." An allergy is a medical reason - which is why a parent puts it in writing rather than saying it at the gate.' }),

  makeMCQ({ id:'g5eng-psg-004', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:`${_G5PSG_EMAIL}What does the <b>Cc</b> line tell you about this email?`,
    options:[
      'A copy was also sent to the other Grade 5 parents',
      'The email was written twice',
      'Mrs Bhoyroo must reply within one day',
      'The email contains a picture'
    ],
    answer:'A copy was also sent to the other Grade 5 parents',
    hint:'Cc stands for "carbon copy" - people who receive a copy of the message.',
    explanation:'<b>Cc</b> lists people who get a <b>copy</b> of the email. Here that is parents-grade5@vacoasgs.mu, so the other Grade 5 parents can read it too. The main person it is addressed to is on the <b>To</b> line.' }),

  makeMCQ({ id:'g5eng-psg-005', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:`${_G5PSG_EMAIL}The email ends with "(Mother of Anjali Seeruttun, Grade 5B)". Why is this line useful to the teacher?`,
    options:[
      'It makes the email look longer',
      'It tells the teacher exactly which pupil the email is about',
      'It is required by law on all emails',
      'It replaces the need for a subject line'
    ],
    answer:'It tells the teacher exactly which pupil the email is about',
    hint:'A teacher may teach a hundred pupils and may not recognise a parent\'s surname alone.',
    explanation:'A teacher receives many emails. Naming the <b>child and the class</b> lets Mrs Bhoyroo find the right pupil immediately. In formal writing, identifying yourself clearly at the end is good manners and saves the reader time.' }),

  // ── TEXT B: informal letter ────────────────────────────────────────
  makeMCQ({ id:'g5eng-psg-006', chapterId:'eng-passages', subsection:'letter', difficulty:1,
    question:`${_G5PSG_LETTER}Where on the page is the writer\'s address placed in this letter?`,
    options:['Top right','Top left','Bottom right','Under the signature'],
    answer:'Top right',
    hint:'Look at how the address and the date are lined up.',
    explanation:'In a letter, the writer\'s own address and the date go in the <b>top right</b>. The greeting ("Dear Grandma,") then starts on the left.' }),

  makeMCQ({ id:'g5eng-psg-007', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:`${_G5PSG_LETTER}What did Yashna receive in the birthday parcel?`,
    options:['A blue notebook','A jar of guava jam','A Maths textbook','A photograph of Grandma'],
    answer:'A blue notebook',
    hint:'The thank-you is in the very first paragraph.',
    explanation:'"The <b>blue notebook</b> is beautiful and I have already started writing my stories in it." The guava jam is something Yashna will send TO Grandma later - not something she received.' }),

  makeMCQ({ id:'g5eng-psg-008', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:`${_G5PSG_LETTER}How do we know Yashna\'s Maths has improved?`,
    options:[
      'She says long division is now easy for everyone',
      'She scored eight out of ten in Tuesday\'s test',
      'Her teacher moved her to a higher group',
      'She no longer has Maths homework'
    ],
    answer:'She scored eight out of ten in Tuesday\'s test',
    hint:'Look for evidence - a number, not an opinion.',
    explanation:'She got the first four sums wrong, Papa helped her, and then "<b>I got eight out of ten in Tuesday\'s test!</b>" The mark is the <b>evidence</b>. When a question asks "how do we know", always point to the proof in the text.' }),

  makeMCQ({ id:'g5eng-psg-009', chapterId:'eng-passages', subsection:'letter', difficulty:3,
    question:`${_G5PSG_LETTER}Which feature shows this is an INFORMAL letter rather than a formal one?`,
    options:[
      'It has a date at the top',
      'It ends "With lots of love" and asks about Grandma\'s knee',
      'It is divided into paragraphs',
      'It begins with the word "Dear"'
    ],
    answer:'It ends "With lots of love" and asks about Grandma\'s knee',
    hint:'Both formal and informal letters have dates, paragraphs and "Dear". Look for what only a family letter would have.',
    explanation:'A date, paragraphs and "Dear" appear in <b>both</b> kinds of letter. What marks this one as informal is the <b>affectionate ending</b> ("With lots of love") and the <b>personal question</b> about Grandma\'s knee. A formal letter would end "Yours sincerely" and stick to business.' }),

  makeTF({ id:'g5eng-psg-010', chapterId:'eng-passages', subsection:'letter', difficulty:2,
    question:`${_G5PSG_LETTER}Yashna asks Grandma a question in her letter.`,
    answer:true,
    hint:'Look for a question mark near the end.',
    explanation:'<b>True.</b> She writes: "Is it still painful when it rains?" Asking a question is how a letter-writer invites a reply - it keeps the conversation going.' }),

  // ── TEXT C: personal narrative ─────────────────────────────────────
  makeMCQ({ id:'g5eng-psg-011', chapterId:'eng-passages', subsection:'story', difficulty:1,
    question:`${_G5PSG_NARR}At what time did the lights go out?`,
    options:['Six o\'clock','Half past eight','Midnight','At sunrise'],
    answer:'Half past eight',
    hint:'The passage gives two clock times - match the right one to the power cut.',
    explanation:'"At <b>half past eight</b> the lights went out." Six o\'clock is when the sky turned grey, earlier in the evening. Careful readers match each time to the right event.' }),

  makeMCQ({ id:'g5eng-psg-012', chapterId:'eng-passages', subsection:'story', difficulty:2,
    question:`${_G5PSG_NARR}"The mango tree outside my window was bending like a bow." What does this comparison tell the reader?`,
    options:[
      'The tree was old and dying',
      'The wind was so strong it bent the tree into a curve',
      'Somebody was climbing the tree',
      'The tree had been cut down'
    ],
    answer:'The wind was so strong it bent the tree into a curve',
    hint:'Picture the shape of an archer\'s bow.',
    explanation:'A bow is bent into a deep curve. Saying the tree bent "<b>like a bow</b>" shows the <b>force of the wind</b>. A comparison using <i>like</i> or <i>as</i> is called a <b>simile</b>.' }),

  makeMCQ({ id:'g5eng-psg-013', chapterId:'eng-passages', subsection:'story', difficulty:2,
    question:`${_G5PSG_NARR}Why did Mama fill every bucket and basin with water?`,
    options:[
      'To water the garden after the storm',
      'To store water in case the supply was cut off',
      'To put out fires caused by the candles',
      'To wash the plywood before nailing it up'
    ],
    answer:'To store water in case the supply was cut off',
    hint:'What do families in Mauritius always do before a cyclone?',
    explanation:'Storing water is standard <b>cyclone preparation</b> - during a cyclone the electricity and the water supply often stop. The text does not spell this out, so you infer it from what you know about cyclones.' }),

  makeMCQ({ id:'g5eng-psg-014', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:`${_G5PSG_NARR}The passage ends: "I remember the candles better than the wind." What does this suggest about the writer\'s memory of that night?`,
    options:[
      'She has forgotten most of what happened',
      'What stayed with her was the family being together, not the danger',
      'The candles were brighter than she expected',
      'She was too young to understand the cyclone'
    ],
    answer:'What stayed with her was the family being together, not the danger',
    hint:'What were the candles for? What happened by candlelight?',
    explanation:'The candles are the moment Papa laughed and said "Now we tell stories" - the <b>warm, family part</b> of a frightening night. Choosing to end on the candles rather than the wind shows what the writer values in the memory. This is a <b>closing line with meaning</b>.' }),

  makeMCQ({ id:'g5eng-psg-015', chapterId:'eng-passages', subsection:'recount', difficulty:4,
    question:`${_G5PSG_NARR}Your class is writing personal recounts about a storm. Which opening sentence best copies the technique used in this passage?`,
    options:[
      'A cyclone is a strong tropical storm with heavy rain and wind.',
      'I was nine years old the night the roof of our shed blew away.',
      'There are many cyclones in Mauritius every year.',
      'In this essay I will describe a cyclone I remember.'
    ],
    answer:'I was nine years old the night the roof of our shed blew away.',
    hint:'A personal recount is told by "I" and starts at one particular moment.',
    explanation:'The passage opens "<b>I was nine years old the night</b> Cyclone Berguitta passed over Mauritius" - first person, one particular night, and a hook that makes you want the rest. The other options are <b>factual report</b> or <b>essay</b> openings, not recounts.' }),

  // ── TEXT D: advertisement / announcement ───────────────────────────
  makeMCQ({ id:'g5eng-psg-016', chapterId:'eng-passages', subsection:'story', difficulty:1,
    question:`${_G5PSG_ADVERT}On which days does the swimming club meet?`,
    options:['Wednesday and Saturday','Monday and Thursday','Every weekday','Saturday only'],
    answer:'Wednesday and Saturday',
    hint:'The days are written in bold near the top.',
    explanation:'Coaching is on <b>Wednesday and Saturday</b>, 2.00 p.m. to 4.00 p.m. Advertisements put the key facts in bold so a reader skimming the notice board still catches them.' }),

  makeMCQ({ id:'g5eng-psg-017', chapterId:'eng-passages', subsection:'story', difficulty:2,
    question:`${_G5PSG_ADVERT}Rahul\'s older sister is already a member of the club. How much will Rahul pay each month?`,
    options:['Rs 150','Rs 100','Rs 50','Nothing'],
    answer:'Rs 100',
    hint:'Read the words in brackets after the fee.',
    explanation:'"Fee: Rs 150 per month (<b>Rs 100 if a brother or sister already belongs</b>)". Rahul\'s sister is a member, so the reduced rate of <b>Rs 100</b> applies. Bracketed conditions in adverts change the price - always read them.' }),

  makeMCQ({ id:'g5eng-psg-018', chapterId:'eng-passages', subsection:'story', difficulty:3,
    question:`${_G5PSG_ADVERT}Why does the announcement mention that Coach Devi has trained national swimmers for 12 years?`,
    options:[
      'To explain why the fee is Rs 150',
      'To persuade parents that the coaching is of high quality',
      'To warn that beginners will not be accepted',
      'To show how old Coach Devi is'
    ],
    answer:'To persuade parents that the coaching is of high quality',
    hint:'Adverts add facts about people for a reason - what is that reason?',
    explanation:'Naming the coach\'s experience is a <b>persuasive technique</b>: it builds trust so parents feel their money is well spent. The advert also says "Beginners welcome", so it is certainly not warning them off.' }),

  makeMCQ({ id:'g5eng-psg-019', chapterId:'eng-passages', subsection:'story', difficulty:4,
    question:`${_G5PSG_ADVERT}Sofia decides on Monday 23 September that she wants to join. What is her problem?`,
    options:[
      'She is in Grade 4, so she is too young',
      'The deadline for handing in the form has already passed',
      'She would have to pay Rs 150 instead of Rs 100',
      'Monday is not a coaching day'
    ],
    answer:'The deadline for handing in the form has already passed',
    hint:'Compare 23 September with the date in the last line.',
    explanation:'Forms had to reach Mr Ramful "before <b>Friday 20 September</b>". Monday 23 September is <b>after</b> that date, so Sofia has missed the deadline. Grade 4 pupils ARE allowed, so age is not the problem - the calendar is.' }),

  // ── TEXT E: poem ───────────────────────────────────────────────────
  makeMCQ({ id:'g5eng-psg-020', chapterId:'eng-passages', subsection:'poem', difficulty:2,
    question:`${_G5PSG_POEM}"Before the sun has left its bed" means that the fisherman goes out...`,
    options:['At midday','Before sunrise','At sunset','Only when it rains'],
    answer:'Before sunrise',
    hint:'Where is the sun when it is still "in bed"?',
    explanation:'The sun "in bed" means it has <b>not yet risen</b>, so he sets out <b>before sunrise</b>. Giving the sun a human action (sleeping) is called <b>personification</b>.' }),

  makeMCQ({ id:'g5eng-psg-021', chapterId:'eng-passages', subsection:'poem', difficulty:3,
    question:`${_G5PSG_POEM}"His hands are maps of thirty years." What does this line really tell us?`,
    options:[
      'He draws maps of the lagoon in his free time',
      'His hands are lined and marked by thirty years of hard work at sea',
      'He has travelled to thirty different countries',
      'He is exactly thirty years old'
    ],
    answer:'His hands are lined and marked by thirty years of hard work at sea',
    hint:'What do the lines on a map look like? What would ropes and salt do to a person\'s hands?',
    explanation:'A map is covered in lines. Saying his hands ARE maps (not <i>like</i> maps) is a <b>metaphor</b>: thirty years of "ropes and salt and morning cold" have left his hands cracked and lined, so you can read his working life on them.' }),

);
