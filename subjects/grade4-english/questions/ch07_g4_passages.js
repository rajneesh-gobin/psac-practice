'use strict';
// Grade 4 English - Chapter: Passages & Text Types
// IDs format: g4eng-psg-NNN
// Four MIE Grade 4 text types: narrative, poster/notice, postcard, procedure.
// Each passage is embedded in every question that uses it, because practice and
// exam mode both draw single questions at random - there is no "shared stem" slot.

function _g4psgBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

const _G4PSG_STORY = _g4psgBox(`
<b style="color:#1e40af">Read the story, then answer the question.</b><br><br>
<b>Rajen's Lost Kite</b><br><br>
Every Sunday, Rajen went to the big field near his house in Vacoas to fly his kite. The kite was red and yellow and it had a long tail made from strips of old cloth.<br><br>
One windy Sunday in July, Rajen ran across the grass and let the kite climb high into the sky. Suddenly the string snapped. The kite sailed away over the trees and disappeared.<br><br>
Rajen walked home slowly with the empty reel in his hand. He did not eat much that evening.<br><br>
The next morning, his neighbour Mrs Appadoo knocked at the door. In her hands was the red and yellow kite. "I found it in my mango tree," she said with a smile.<br><br>
That afternoon, Rajen's father helped him tie a new string to the kite - a much thicker one this time.
`, '#3b82f6');

const _G4PSG_POSTER = _g4psgBox(`
<b style="color:#b45309">Read the poster, then answer the question.</b><br><br>
<div style="text-align:center;border:3px dashed #f59e0b;border-radius:10px;padding:12px;background:#fffbeb">
<div style="font-size:1.25em;font-weight:800;color:#b45309">SCHOOL FUN FAIR</div>
<div style="font-weight:700">Vacoas Government School</div>
<div style="margin:6px 0"><b>Saturday 14 September</b><br>9.00 a.m. to 3.00 p.m.<br>In the school yard</div>
<div style="margin:6px 0">Games &nbsp;&bull;&nbsp; Food stalls &nbsp;&bull;&nbsp; Face painting &nbsp;&bull;&nbsp; Lucky draw</div>
<div><b>Entrance: Rs 20</b> &nbsp;(children under 5 enter free)</div>
<div style="margin-top:6px;font-style:italic">All the money collected will buy new books for our library.</div>
<div style="margin-top:6px;font-weight:700">Come with your family!</div>
</div>
`, '#f59e0b');

const _G4PSG_POSTCARD = _g4psgBox(`
<b style="color:#0e7490">Read the postcard, then answer the question.</b><br><br>
<div style="display:flex;gap:12px;flex-wrap:wrap">
<div style="flex:2;min-width:180px;border-right:1px dashed #94a3b8;padding-right:10px">
Dear Ashvin,<br><br>
I am on holiday in Rodrigues with my family. We arrived on Monday by plane. The sea here is very blue and the beaches are quiet.<br><br>
Yesterday we ate grilled octopus at Port Mathurin market. Tomorrow we will visit the tortoise reserve.<br><br>
See you next week!<br>
Your friend,<br>
<b>Lisa</b>
</div>
<div style="flex:1;min-width:130px;font-size:0.95em">
<div style="border-bottom:1px solid #cbd5e1;height:20px;margin-bottom:8px"></div>
Ashvin Ramdin<br>
12, Royal Road<br>
Curepipe<br>
MAURITIUS
</div>
</div>
`, '#06b6d4');

const _G4PSG_RECIPE = _g4psgBox(`
<b style="color:#15803d">Read the instructions, then answer the question.</b><br><br>
<b>HOW TO MAKE A FRUIT SALAD</b><br><br>
<u>You will need:</u> 1 mango, 1 banana, 1 slice of pineapple, 4 lychees, a little lemon juice, a bowl and a spoon.<br><br>
1. Wash all the fruit under clean water.<br>
2. Ask an adult to peel the mango and cut it into small cubes.<br>
3. Peel the banana and slice it.<br>
4. Cut the pineapple into pieces and take the seeds out of the lychees.<br>
5. Put all the fruit into the bowl.<br>
6. Pour a little lemon juice over the fruit and mix gently with the spoon.<br>
7. Keep the bowl in the fridge for 20 minutes before serving.
`, '#22c55e');

STATIC_QUESTIONS.push(

  // ── TEXT A: narrative ──────────────────────────────────────────────
  makeMCQ({ id:'g4eng-psg-001', chapterId:'g4eng-passages', subsection:'story', difficulty:1,
    question:`${_G4PSG_STORY}Where did Rajen fly his kite?`,
    options:['On the beach at Flic en Flac','In the big field near his house','On the roof of his school','In Mrs Appadoo\'s garden'],
    answer:'In the big field near his house',
    hint:'The very first sentence tells you the place.',
    explanation:'The story opens: "Every Sunday, Rajen went to the <b>big field near his house</b> in Vacoas to fly his kite." Vacoas is the town; the field is the place.' }),

  makeMCQ({ id:'g4eng-psg-002', chapterId:'g4eng-passages', subsection:'story', difficulty:1,
    question:`${_G4PSG_STORY}What was the tail of the kite made from?`,
    options:['Strips of old cloth','Paper and glue','Plastic bags','Dried banana leaves'],
    answer:'Strips of old cloth',
    hint:'Look at the end of the first paragraph.',
    explanation:'"...it had a long tail made from <b>strips of old cloth</b>." When a question asks what something is made <i>from</i>, copy the exact words from the text.' }),

  makeMCQ({ id:'g4eng-psg-003', chapterId:'g4eng-passages', subsection:'story', difficulty:2,
    question:`${_G4PSG_STORY}Why did the kite fly away?`,
    options:['Rajen let go of the reel','The string snapped','A bird pulled it','The wind stopped blowing'],
    answer:'The string snapped',
    hint:'Find the word "Suddenly" and read the sentence after it.',
    explanation:'"Suddenly <b>the string snapped</b>. The kite sailed away over the trees." <i>Snapped</i> means broke suddenly. Note that the wind did not stop - it was a windy day, which is why the kite flew so far.' }),

  makeMCQ({ id:'g4eng-psg-004', chapterId:'g4eng-passages', subsection:'story', difficulty:2,
    question:`${_G4PSG_STORY}Which sentence shows that Rajen was unhappy, WITHOUT using the word "sad"?`,
    options:[
      'He did not eat much that evening.',
      'Rajen ran across the grass.',
      'The kite was red and yellow.',
      'His father helped him tie a new string.'
    ],
    answer:'He did not eat much that evening.',
    hint:'Which action is something an upset person does?',
    explanation:'"<b>He did not eat much that evening</b>" shows his feelings through his behaviour. Good writers <i>show</i> a feeling instead of naming it - this is called "show, don\'t tell".' }),

  makeMCQ({ id:'g4eng-psg-005', chapterId:'g4eng-passages', subsection:'story', difficulty:3,
    question:`${_G4PSG_STORY}Why did Rajen's father use a MUCH THICKER string?`,
    options:[
      'Thicker string is cheaper to buy',
      'So that the string would not snap again',
      'To make the kite fly lower',
      'Because the old string was the wrong colour'
    ],
    answer:'So that the string would not snap again',
    hint:'Think about what went wrong the last time.',
    explanation:'The thin string snapped, so a <b>thicker, stronger string will not break as easily</b>. The text does not say this directly - you work it out by linking the problem (snapped string) to the solution (thicker string). That is called making an <b>inference</b>.' }),

  makeTF({ id:'g4eng-psg-006', chapterId:'g4eng-passages', subsection:'story', difficulty:2,
    question:`${_G4PSG_STORY}Mrs Appadoo found the kite in her mango tree.`,
    answer:true,
    hint:'She says exactly where she found it.',
    explanation:'<b>True.</b> Mrs Appadoo says, "I found it in my <b>mango tree</b>." She is described as Rajen\'s neighbour, which is why the kite landing in her garden makes sense.' }),

  // ── TEXT B: poster / notice ────────────────────────────────────────
  makeMCQ({ id:'g4eng-psg-007', chapterId:'g4eng-passages', subsection:'advert', difficulty:1,
    question:`${_G4PSG_POSTER}On which day will the Fun Fair take place?`,
    options:['Saturday 14 September','Sunday 14 September','Saturday 4 September','Friday 14 December'],
    answer:'Saturday 14 September',
    hint:'A poster always puts the date in large, bold print.',
    explanation:'The poster gives the date as <b>Saturday 14 September</b>. A poster must always answer four questions: <b>WHAT</b> is happening, <b>WHEN</b>, <b>WHERE</b>, and <b>HOW MUCH</b>.' }),

  makeMCQ({ id:'g4eng-psg-008', chapterId:'g4eng-passages', subsection:'advert', difficulty:1,
    question:`${_G4PSG_POSTER}Sara is 4 years old. How much must she pay to enter?`,
    options:['Rs 20','Rs 10','Nothing - she enters free','Rs 5'],
    answer:'Nothing - she enters free',
    hint:'Read the small note in brackets after the price.',
    explanation:'The poster says "Entrance: Rs 20 (<b>children under 5 enter free</b>)". Sara is 4, which is under 5, so she pays <b>nothing</b>. Always read the words in brackets - that is where the exceptions hide.' }),

  makeMCQ({ id:'g4eng-psg-009', chapterId:'g4eng-passages', subsection:'advert', difficulty:2,
    question:`${_G4PSG_POSTER}What will the money collected at the fair be used for?`,
    options:['To repair the school roof','To buy new books for the library','To pay for a school trip','To buy sports equipment'],
    answer:'To buy new books for the library',
    hint:'One line is written in italics near the bottom.',
    explanation:'"All the money collected will <b>buy new books for our library</b>." Telling people where the money goes is a persuasive technique - it encourages families to come.' }),

  makeMCQ({ id:'g4eng-psg-010', chapterId:'g4eng-passages', subsection:'advert', difficulty:2,
    question:`${_G4PSG_POSTER}Which piece of information is NOT given on the poster?`,
    options:[
      'The time the fair starts',
      'The place where the fair will be held',
      'The name of the head teacher',
      'The price of a ticket'
    ],
    answer:'The name of the head teacher',
    hint:'Check each option against the poster one by one.',
    explanation:'The poster gives the time (9.00 a.m.), the place (the school yard) and the price (Rs 20), but <b>never names the head teacher</b>. "Which is NOT given?" questions are answered by ticking off the ones you CAN find.' }),

  makeMCQ({ id:'g4eng-psg-011', chapterId:'g4eng-passages', subsection:'advert', difficulty:3,
    question:`${_G4PSG_POSTER}A family arrives at the school yard at 3.30 p.m. on Saturday 14 September. What will they find?`,
    options:[
      'The fair has already finished',
      'The fair is about to start',
      'The fair is at its busiest',
      'The lucky draw is beginning'
    ],
    answer:'The fair has already finished',
    hint:'Compare 3.30 p.m. with the closing time on the poster.',
    explanation:'The fair runs 9.00 a.m. to <b>3.00 p.m.</b> Arriving at 3.30 p.m. is <b>half an hour too late</b> - the fair has finished. Reading a poster properly means using its times to plan, not just to copy.' }),

  // ── TEXT C: postcard ───────────────────────────────────────────────
  makeMCQ({ id:'g4eng-psg-012', chapterId:'g4eng-passages', subsection:'letter', difficulty:1,
    question:`${_G4PSG_POSTCARD}Who wrote this postcard?`,
    options:['Lisa','Ashvin','Ashvin\'s mother','Mrs Ramdin'],
    answer:'Lisa',
    hint:'On a postcard the writer signs at the END; the person receiving it is in the address box.',
    explanation:'The message is signed "Your friend, <b>Lisa</b>". Ashvin Ramdin is the person the postcard is <i>sent to</i> - his name is in the address box on the right.' }),

  makeMCQ({ id:'g4eng-psg-013', chapterId:'g4eng-passages', subsection:'letter', difficulty:2,
    question:`${_G4PSG_POSTCARD}How did Lisa travel to Rodrigues?`,
    options:['By plane','By boat','By bus','By ferry from Port Louis'],
    answer:'By plane',
    hint:'One short sentence tells you both when she arrived and how.',
    explanation:'"We arrived on Monday <b>by plane</b>." Notice that a single sentence can carry two facts - the day AND the means of transport.' }),

  makeMCQ({ id:'g4eng-psg-014', chapterId:'g4eng-passages', subsection:'letter', difficulty:2,
    question:`${_G4PSG_POSTCARD}Which word in the postcard tells you that Lisa has ALREADY eaten the grilled octopus?`,
    options:['Yesterday','Tomorrow','Monday','Next week'],
    answer:'Yesterday',
    hint:'Look for the time word at the start of that sentence.',
    explanation:'"<b>Yesterday</b> we ate grilled octopus." <i>Yesterday</i> points to the past, so it has already happened. <i>Tomorrow</i> ("we will visit the tortoise reserve") points to the future.' }),

  makeMCQ({ id:'g4eng-psg-015', chapterId:'g4eng-passages', subsection:'letter', difficulty:3,
    question:`${_G4PSG_POSTCARD}Why is a postcard message written in SHORT sentences with only a few details?`,
    options:[
      'Because the writer is in a hurry to go swimming',
      'Because there is only a small space to write on',
      'Because postcards must never mention food',
      'Because the post office charges by the word'
    ],
    answer:'Because there is only a small space to write on',
    hint:'Think about the size of a real postcard and what shares the space with the message.',
    explanation:'A postcard has <b>one small side shared between the message and the address</b>, so the writer picks only the most interesting facts. That is why postcards use short sentences and no long descriptions.' }),

  // ── TEXT D: procedure ──────────────────────────────────────────────
  makeMCQ({ id:'g4eng-psg-016', chapterId:'g4eng-passages', subsection:'instructions', difficulty:1,
    question:`${_G4PSG_RECIPE}How many lychees do you need?`,
    options:['1','2','4','A handful'],
    answer:'4',
    hint:'The list of things you need comes before the numbered steps.',
    explanation:'The "You will need" list says <b>4 lychees</b>. In a set of instructions, the ingredients or materials are always listed first so you can collect everything before you start.' }),

  makeMCQ({ id:'g4eng-psg-017', chapterId:'g4eng-passages', subsection:'instructions', difficulty:2,
    question:`${_G4PSG_RECIPE}Which step must an adult help you with?`,
    options:[
      'Washing the fruit',
      'Peeling and cutting the mango',
      'Mixing with the spoon',
      'Putting the bowl in the fridge'
    ],
    answer:'Peeling and cutting the mango',
    hint:'One step begins with the word "Ask".',
    explanation:'Step 2 says "<b>Ask an adult</b> to peel the mango and cut it into small cubes." Instructions include safety warnings exactly where the danger is - here, using a knife on a slippery mango.' }),

  makeMCQ({ id:'g4eng-psg-018', chapterId:'g4eng-passages', subsection:'instructions', difficulty:3,
    question:`${_G4PSG_RECIPE}Why are the steps NUMBERED instead of written as one paragraph?`,
    options:[
      'To make the page look longer',
      'So the steps are done in the correct order, one at a time',
      'Because numbers are easier to spell than words',
      'So you can choose which steps to skip'
    ],
    answer:'So the steps are done in the correct order, one at a time',
    hint:'What would happen if you mixed in the lemon juice before cutting the fruit?',
    explanation:'Instructions are numbered because the <b>order matters</b>: you cannot mix the fruit before you have cut it. Numbering also lets you find your place again if you stop halfway.' }),

  makeMCQ({ id:'g4eng-psg-019', chapterId:'g4eng-passages', subsection:'instructions', difficulty:4,
    question:`${_G4PSG_RECIPE}Kavi follows every step except step 7. His friends say the salad tastes fine but is not as nice as usual. What did Kavi miss?`,
    options:[
      'He served the salad warm instead of cold',
      'He forgot to add the lemon juice',
      'He left the lychee seeds in',
      'He used the wrong sort of bowl'
    ],
    answer:'He served the salad warm instead of cold',
    hint:'Read step 7 and ask what it does to the fruit.',
    explanation:'Step 7 is "Keep the bowl in the fridge for 20 minutes before serving." Skipping it means the salad is <b>served warm rather than chilled</b>. The lemon juice (step 6) and the seeds (step 4) were both done - so the only change is the temperature.' }),

);
