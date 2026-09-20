'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade9-english — depth batch E3: g9eng-reading (46) + g9eng-literature (7)
//  IDs: g9eng-d3-001 … g9eng-d3-053. Nothing else uses this block.
//
//  WHY: every subsection of g9eng-reading sat below the 20-item floor, three of
//  them barely half way (text_features 10, across_texts 11, language 12), and
//  the chapter carries examWeight 10 — the heaviest in the pack. The pack was
//  also short of L1: 8 of 114 reading items. This batch is ~25% L1 / 45% L2 /
//  30% L3 and adds NO L4, because the chapter already holds 24.
//
//  ⚠ EVERY TEXT HERE IS ORIGINAL and written for this repository. Nothing is an
//    extract from a published work. The settings are Mauritian; the councils,
//    traders, villages, leaflets and poems in them are invented.
//
//  ⚠ The passage const is reprinted in FULL on every question of its block,
//    exactly as rcp_passages.js does. Practice and exam mode serve single
//    questions at random, so a child must never have to scroll back to a text
//    they have already left.
//  ⚠ The box sets BOTH background and colour. The app has a dark theme: a box
//    with only a background inherits white-on-white text.
//  ⚠ `across_texts` blocks print TWO texts and every question on them can only
//    be answered by holding both in mind. That is the one Grade-9-only Reading
//    competency and it cannot be asked of a single text.
//  ⚠ `text_features` is about the FORM of a text — headings, bullets, captions,
//    bold type, paragraphing, layout — so its blocks are non-continuous texts
//    (a leaflet, an article with subheadings), not stories.
//
//  ⚠ NOTHING IN THIS FILE PRESUMES AN ANSWER TO THE EXTENDED-WRITING DECISION.
//    Every item is auto-marked by the existing engine: an MCQ, a true/false, or
//    a one-word typed answer. No rubric, no mark scheme, no model answer, and
//    no question that asks a pupil to write at length.
// ══════════════════════════════════════════════════════════════════════════

(function () {
const CH = 'g9eng-reading';
const LIT = 'g9eng-literature';
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · a public notice and a letter to a newspaper (two texts) ════
const _P1 = box(`
<b style="color:#1e40af">Read BOTH texts, then answer the question.</b><br><br>
<b>TEXT A — public notice, Municipal Council of Quatre Bornes, 12 March</b><br><br>
Traders and residents are informed that from Monday 2 April the vegetable market will move from the Avenue des Manguiers to the new covered hall behind the bus station.<br><br>
The Council took this decision after a full consultation. A public meeting was held on Wednesday 14 February at nine o'clock in the morning in the Council chamber, and notice of it was posted at the market three days beforehand. Every trader was therefore given the opportunity to be heard. Only four persons attended and none objected.<br><br>
The new hall is roofed, lit, and supplied with running water. Stalls will be allocated by drawing lots on 26 March. Traders who do not present themselves on that day will be placed on a waiting list.<br><br>
The Council is confident that the move will be welcomed by all.<br><br>
<b>TEXT B — letter to the editor, printed the following week</b><br><br>
Sir,<br><br>
Your paper printed the Council's notice without a word of comment, so allow a market trader to add one.<br><br>
I have sold tomatoes on the Avenue des Manguiers for twenty-two years. The new hall is roofed, and last February I stood in water to my ankles from eight in the morning until four, so I will not pretend I want the rain back.<br><br>
But I ask your readers to look again at the date of the consultation. Wednesday, nine o'clock in the morning. At nine o'clock on a Wednesday every trader in this town is standing behind a stall, because Wednesday is a market day. The four people who attended were not traders. We heard about the meeting the way we hear about everything: afterwards.<br><br>
And the lots. A stall by the entrance and a stall in the back corner are not the same stall. Twenty-two years of customers know which corner to walk to. Drawing lots is fair between strangers; between neighbours who have built up a trade, it is a way of taking one woman's customers and handing them to another.<br><br>
I would sign my name, but the allocation is on the 26th.<br><br>
A trader of the Avenue des Manguiers
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-001', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P1 + `<p>Both texts describe the same February meeting. What does Text B tell you about it that Text A does not?</p>`,
    options: ['That it was held while every trader was working',
              'That it was held before the notice was posted',
              'That it was held in a language traders do not speak',
              'That it was held after the decision was taken'],
    answer: 'That it was held while every trader was working',
    hint: `Both texts give the same day and the same hour. Only one of them says what that day and hour mean for a market trader.`,
    explanation: `Text A records the meeting as <i>Wednesday 14 February at nine o'clock</i> and treats the low turnout as proof that nobody objected. Text B repeats the very same day and hour and adds the fact the notice leaves out: <b>Wednesday is a market day</b>, so at nine o'clock every trader is behind a stall. Neither text contradicts the other about the facts; Text B supplies the meaning.` }),

  makeMCQ({ id: 'g9eng-d3-002', chapterId: CH, difficulty: 2, subsection: 'across_texts',
    question: _P1 + `<p>On which point about the new hall do the two texts AGREE?</p>`,
    options: ['That its roof will keep the rain off',
              'That its stalls are larger than the old ones',
              'That it stands closer to the bus station',
              'That it has running water for the traders'],
    answer: 'That its roof will keep the rain off',
    hint: `Three of these appear in one text only. Look for the single fact that the trader confirms in her own words.`,
    explanation: `Text A calls the hall <i>roofed, lit, and supplied with running water</i>; Text B says <i>The new hall is roofed</i> and that the writer will <i>not pretend I want the rain back</i>. Only the roof appears in both. The bus station and the running water are in Text A alone, and neither text mentions the size of the stalls at all.` }),

  makeText({ id: 'g9eng-d3-003', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P1 + `<p>Text A states that every trader was given the opportunity to be heard. Write the ONE word from Text B naming the day of the week which shows why, in practice, they were not.</p>`,
    answer: 'Wednesday', alsoAccept: ['wednesday', 'Wednesdays'],
    hint: `Find the sentence in Text B that explains what that day of the week means to somebody who sells vegetables.`,
    explanation: `Both texts name the day, but only Text B explains it: <i>because it is a market day, at nine o'clock every trader in this town is standing behind a stall</i>. The opportunity existed on paper and could not be taken. A consultation timed for the one hour when the people consulted cannot attend is the point the letter is making.` }),

  makeTF({ id: 'g9eng-d3-004', chapterId: CH, difficulty: 2, subsection: 'across_texts',
    question: _P1 + `<p>True or False: the two texts give DIFFERENT figures for how many people attended the February meeting.</p>`,
    answer: false,
    hint: `Find the number in each text and set them side by side before deciding.`,
    explanation: `False. Text A says <i>Only four persons attended</i> and Text B says <i>The four people who attended were not traders</i>. The figure is the same in both; what differs is who those four are said to have been. Two texts can disagree completely while agreeing on every number in them, and a careful reader checks the figures before assuming a contradiction.` }),

  makeMCQ({ id: 'g9eng-d3-005', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P1 + `<p>The writer of Text B refuses to give her name. Which detail from TEXT A best explains that refusal?</p>`,
    options: ['The Council will allocate the stalls on 26 March',
              'The Council posted its notice three days early',
              'The Council held its meeting in the Council chamber',
              'The Council will supply the new hall with water'],
    answer: 'The Council will allocate the stalls on 26 March',
    hint: `Read her last line, then look for the thing in Text A that the Council still has in its hands on that date.`,
    explanation: `<i>I would sign my name, but the allocation is on the 26th.</i> Text A is what makes that sentence frightening: the Council draws the lots, and the writer has just accused it in public. The other three details are real but harmless — a chamber, a notice and a water supply give the Council no hold over her.` }),

  makeMCQ({ id: 'g9eng-d3-006', chapterId: CH, difficulty: 2, subsection: 'evidence',
    question: _P1 + `<p>A reader says: <i>Text A judges its own consultation and finds it adequate.</i> Which line from Text A best supports that claim?</p>`,
    options: ['Every trader was therefore given the opportunity to be heard',
              'notice of it was posted at the market three days beforehand',
              'A public meeting was held on Wednesday 14 February',
              'Stalls will be allocated by drawing lots on 26 March'],
    answer: 'Every trader was therefore given the opportunity to be heard',
    hint: `Three of these lines record something a reader could go and check. One of them draws a conclusion from the others.`,
    explanation: `<b>Therefore</b> is the giveaway: the Council is reasoning from its own arrangements to a verdict on them. The other three lines state a date, a notice and a procedure — facts, not judgements. When you are asked for evidence of an opinion, look for the sentence that concludes rather than the sentence that reports.` }),

  makeMCQ({ id: 'g9eng-d3-007', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P1 + `<p>Which line from Text B is the best evidence that its writer is NOT simply opposed to the move?</p>`,
    options: ['I will not pretend I want the rain back',
              'I have sold tomatoes on that avenue for years',
              'Drawing lots is a way of taking her customers',
              'The four people who attended were not traders'],
    answer: 'I will not pretend I want the rain back',
    hint: `Look for the one line in which she concedes something to the Council rather than taking something from it.`,
    explanation: `That line admits the new hall is better in the one respect that matters most to her — she has stood in water to her ankles. The other three lines all press her case: her long trade, the unfairness of the lots, the four strangers at the meeting. A concession is stronger evidence of fair-mindedness than any complaint, however reasonable.` }),

  makeMCQ({ id: 'g9eng-d3-008', chapterId: CH, difficulty: 2, subsection: 'authors_view',
    question: _P1 + `<p>What is the main purpose of Text B?</p>`,
    options: ['To show that a fair process was not fair in practice',
              'To ask the Council to cancel the move altogether',
              'To warn shoppers that the market will close soon',
              'To complain that the new hall has no running water'],
    answer: 'To show that a fair process was not fair in practice',
    hint: `She accepts the hall itself. Ask what is left that she is still arguing about.`,
    explanation: `Every paragraph attacks the <i>method</i> — the hour of the meeting, the drawing of lots — and none of them attacks the hall. She never asks for the move to be cancelled, she says the opposite about the water, and she writes to readers rather than to shoppers. A writer's purpose is what the argument is built to prove, not the first thing it mentions.` })

);

// ══ PASSAGE 2 · a cyclone bulletin and a pupil's account (two texts) ═══════
const _P2 = box(`
<b style="color:#047857">Read BOTH texts, then answer the question.</b><br><br>
<b>TEXT A — Cyclone Warning Class III, issued at 04:10</b><br><br>
Intense tropical cyclone Fidel was located at 04:00 this morning about 110 kilometres north-east of Mauritius and is moving slowly west-south-west.<br><br>
Gusts of 120 kilometres per hour are expected over the island during the day. The sea is very rough and all navigation is suspended. All schools, colleges and public offices are closed until further notice.<br><br>
The public is advised to remain indoors. Loose sheets, ladders and dustbins should be secured now. Torches and drinking water should be kept within reach.<br><br>
This bulletin will be broadcast on all radio stations every hour. A Class IV warning will be issued should the cyclone move closer to the island.<br><br>
<b>TEXT B — "The night the mango tree fell", written for a school magazine</b><br><br>
Our electricity went at three in the morning, which is early even for our lane. My father found the transistor radio and turned it on, and then remembered that the batteries had gone into my brother's torch in December.<br><br>
So we knew nothing. We sat in the kitchen with a candle and listened to the roof. It was Madame Rita who told us, at eight o'clock, coming across the yard in a raincoat with her hood held under her chin: the warning had gone up to Class III, and there was no school.<br><br>
The mango tree in our yard is older than my father. It came down across the road at about eleven and took the telephone wire with it, so after that nobody in the lane had a radio, a telephone, or anything at all except a neighbour shouting.<br><br>
The strange thing is that I was not frightened while it was happening. There was too much to do: we moved the mattresses, we put the small basins under the leaks, we counted the cousins twice. I was frightened on Sunday, walking to the shop in the sunshine, when I turned the corner and saw the roof of the shop lying in the middle of the road.
`, '#059669');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-009', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P2 + `<p>Text A advises the public to listen to the hourly bulletin. What does Text B show about that advice?</p>`,
    options: ['A power cut can make the advice impossible to follow',
              'The bulletin was broadcast later than it promised',
              'The family chose not to listen to the bulletin',
              'The radio gave a different warning class from Text A'],
    answer: 'A power cut can make the advice impossible to follow',
    hint: `Work out, from Text B, everything the family would have needed at three in the morning in order to do what Text A asks.`,
    explanation: `Text A assumes a working radio. Text B loses the electricity at three and finds the batteries gone, so the hourly bulletin exists and reaches nobody in that kitchen. The family did not refuse to listen — that is the tempting wrong answer — and nothing in Text B suggests the bulletin was late or wrong. Advice can be perfectly correct and still fail the person it is written for.` }),

  makeMCQ({ id: 'g9eng-d3-010', chapterId: CH, difficulty: 2, subsection: 'across_texts',
    question: _P2 + `<p>Text A gives a figure for the expected gusts. Which detail in Text B shows most clearly what a wind of that strength can do?</p>`,
    options: ['A mango tree came down across the road',
              'A neighbour crossed the yard in a raincoat',
              'The electricity failed at three in the morning',
              'The batteries in the radio were already finished'],
    answer: 'A mango tree came down across the road',
    hint: `Three of these could happen in ordinary heavy rain. Look for the one that needs real force.`,
    explanation: `A tree older than the writer's father, brought down and taking a wire with it, is what 120 kilometres an hour means on the ground. A raincoat, a power cut and flat batteries are all consistent with an ordinary bad night. When a text gives you a number, the way to understand it is to find the thing it did.` }),

  makeTF({ id: 'g9eng-d3-011', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P2 + `<p>True or False: Text B confirms Text A's expectation that the public would know about the Class III warning from 04:10 onwards.</p>`,
    answer: false,
    hint: `Compare the time printed at the head of Text A with the time given in the second paragraph of Text B.`,
    explanation: `False. Text A is issued at 04:10 and expects to be heard every hour; the family in Text B learns of the warning at <b>eight o'clock</b>, and from a neighbour in a raincoat rather than from a radio. The two texts do not contradict each other about what was issued — only about whether issuing it was the same thing as it being known.` }),

  makeMCQ({ id: 'g9eng-d3-012', chapterId: CH, difficulty: 2, subsection: 'across_texts',
    question: _P2 + `<p>Which one of these statements is true of BOTH texts?</p>`,
    options: ['Both name the class of the cyclone warning',
              'Both give the distance of the cyclone from land',
              'Both record the hour at which the wind was worst',
              'Both mention the closing of the public offices'],
    answer: 'Both name the class of the cyclone warning',
    hint: `Take each statement and try to point to it in Text B as well as in Text A.`,
    explanation: `Text A issues a <i>Class III</i> warning and Text B reports that <i>the warning had gone up to Class III</i>, so the class is in both. The 110 kilometres, the public offices and any statement about when the wind peaked are in Text A alone — Text B gives the hour the tree fell, which is not the same claim.` }),

  makeText({ id: 'g9eng-d3-013', chapterId: CH, difficulty: 1, subsection: 'retrieval',
    question: _P2 + `<p>According to Text A, how many kilometres from Mauritius was the cyclone at 04:00? Write the number in digits.</p>`,
    answer: '110', alsoAccept: ['110 km', '110km', '110 kilometres'],
    hint: `The figure is in the first sentence of Text A, beside the word "about".`,
    explanation: `<i>about 110 kilometres north-east of Mauritius</i>. The word <b>about</b> tells you the figure is rounded, which is normal in a bulletin issued minutes after a reading, but the number you are asked for is still 110.` }),

  makeMCQ({ id: 'g9eng-d3-014', chapterId: CH, difficulty: 2, subsection: 'evidence',
    question: _P2 + `<p>A reader says: <i>Text A is written to be obeyed, not discussed.</i> Which line from Text A best supports that?</p>`,
    options: ['The public is advised to remain indoors',
              'Gusts of 120 kilometres per hour are expected',
              'Fidel was located north-east of the island',
              'A Class IV warning will be issued if needed'],
    answer: 'The public is advised to remain indoors',
    hint: `Three of these tell the reader what is happening. One of them tells the reader what to do.`,
    explanation: `An instruction is the evidence that a text expects obedience, and <i>advised to remain indoors</i> is the only instruction among the four. The gusts, the position and the possible Class IV are all information: they invite a reader to understand, not to act. Evidence for a claim about a text's purpose is a line that does the thing being claimed.` }),

  makeText({ id: 'g9eng-d3-015', chapterId: CH, difficulty: 2, subsection: 'evidence',
    question: _P2 + `<p>A reader says that the writer of Text B felt the shock of the cyclone only once it was over. Copy the ONE word she uses twice — once of the night and once of the Sunday — which is the evidence for that.</p>`,
    answer: 'frightened', alsoAccept: ['frighten', 'frightened.'],
    hint: `Look at the last paragraph. She denies a feeling in one sentence and admits the same feeling two sentences later.`,
    explanation: `<i>I was not <b>frightened</b> while it was happening… I was <b>frightened</b> on Sunday.</i> The repeated word is the evidence, because it is the same feeling in both places and only the time has changed. A reader who quoted only the second half would be quoting a feeling; quoting both halves proves the shift.` }),

  makeMCQ({ id: 'g9eng-d3-016', chapterId: CH, difficulty: 2, subsection: 'inference',
    question: _P2 + `<p>Why does the writer of Text B tell us that the mango tree is older than her father?</p>`,
    options: ['To suggest how unusual the storm must have been',
              'To suggest that the tree was already unsafe',
              'To suggest that her father had planted the tree',
              'To suggest that the yard was bigger than it looks'],
    answer: 'To suggest how unusual the storm must have been',
    hint: `Ask what the tree's age adds to the sentence that follows it, in which the tree comes down.`,
    explanation: `A tree that has stood longer than anyone in the house has been alive, and then falls, measures the storm without giving a single figure. Nothing suggests the tree was unsound, and if it had been, the fall would prove less rather than more. Age here is an argument, not a description.` })

);

// ══ PASSAGE 3 · narrative — "The last bus from Victoria Square" ════════════
const _P3 = box(`
<b style="color:#b45309">Read the passage, then answer the question.</b><br><br>
The bus was late, and the square had begun to give up on it. Under the clock a row of us stood in a line that was not really a line: a nurse still in her white, two schoolboys sharing one pair of earphones, an old man with a sack of flour he would not set down, and me.<br><br>
Port Louis at seven o'clock does not cool; it exhales. The heat the buildings have been swallowing all day comes back out of them slowly, the way a held breath comes out, and the pavement gives it up last of all.<br><br>
When the bus finally came, it came like an apology, easing round the corner with its indicator ticking and its windows half fogged, a fat grey moth of a thing that had lost its way among the taxis. The driver did not look at us. The door folded open with a sigh.<br><br>
Inside, the seats were warm from the bodies of strangers. I found a place by the window and sat down, and wrote my name in the mist with one finger, and the town began to slide backwards past me: the lit fronts of the shops, then the dark under the flyover, then the long straight road where the streetlights stand like men waiting to be told something.<br><br>
My grandmother used to say that a bus is the only place where we sit still. I did not understand her then. I sat still all the way to Rose Hill, and I understood her.
`, '#d97706');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-017', chapterId: CH, difficulty: 2, subsection: 'language',
    question: _P3 + `<p>Which device is the writer using in <i>Port Louis at seven o'clock does not cool; it exhales</i>?</p>`,
    options: ['Personification', 'Alliteration', 'Hyperbole', 'Rhyme'],
    answer: 'Personification',
    hint: `Ask what kind of thing is normally the subject of the verb the writer has chosen.`,
    explanation: `Only a living thing exhales, so giving the verb to a city is <b>personification</b>. Alliteration would need repeated opening sounds, hyperbole would need an exaggeration, and there is no rhyme in prose like this. Naming the device is only half the work: the reason it is here is that the city is made to feel as tired as the people waiting in it.` }),

  makeMCQ({ id: 'g9eng-d3-018', chapterId: CH, difficulty: 2, subsection: 'language',
    question: _P3 + `<p>The streetlights <i>stand like men waiting to be told something</i>. What does this comparison suggest about the road?</p>`,
    options: ['That it is empty, and oddly expectant',
              'That it is crowded with people walking',
              'That it is badly lit and hard to follow',
              'That it is narrower than the town roads'],
    answer: 'That it is empty, and oddly expectant',
    hint: `Picture the men in the comparison: how many are moving, and what are they doing?`,
    explanation: `Men standing and waiting are still, silent and expecting something — so the road is deserted and yet feels as though it is about to be spoken to. The lights are the only things there, which rules out a crowd, and a road with a row of lamps is not badly lit. A comparison tells you about the thing compared, not about the thing it is compared to.` }),

  makeMCQ({ id: 'g9eng-d3-019', chapterId: CH, difficulty: 3, subsection: 'language',
    question: _P3 + `<p>The bus is called <i>a fat grey moth of a thing</i>. What does that metaphor add that <i>a big grey bus</i> would not?</p>`,
    options: ['It makes the bus seem soft, blundering and lost',
              'It makes the bus seem faster than the taxis',
              'It makes the bus seem newer than it really is',
              'It makes the bus seem dangerous to the waiting line'],
    answer: 'It makes the bus seem soft, blundering and lost',
    hint: `Think about how a moth moves near a light, and about what the sentence says the bus had done among the taxis.`,
    explanation: `A moth is dusty, soft-edged and famously bad at finding its way, and the sentence says the bus <i>had lost its way among the taxis</i>. A big grey bus is merely large; the moth makes it clumsy and almost harmless. Nothing about a moth suggests speed, newness or danger — which is why those three readings do not survive a second look at the image.` }),

  makeMCQ({ id: 'g9eng-d3-020', chapterId: CH, difficulty: 3, subsection: 'language',
    question: _P3 + `<p><i>The door folded open with a sigh.</i> Why might the writer have chosen <b>sigh</b> rather than <b>hiss</b>?</p>`,
    options: ['It gives the bus the weariness of the people waiting',
              'It tells the reader the door was broken that evening',
              'It shows that the driver was angry with the queue',
              'It suggests the bus was much older than the taxis'],
    answer: 'It gives the bus the weariness of the people waiting',
    hint: `Both words describe the same escaping air. Ask what each one makes you feel about the thing making the sound.`,
    explanation: `A hiss is sharp and slightly hostile; a sigh is tired and human, and it matches a square that has <i>begun to give up</i> and a city that <i>exhales</i>. The choice carries feeling, not information — so it says nothing about a fault, the driver's temper or the age of the vehicle.` }),

  makeMCQ({ id: 'g9eng-d3-021', chapterId: CH, difficulty: 1, subsection: 'vocabulary',
    question: _P3 + `<p>In this passage, <b>exhales</b> means</p>`,
    options: ['breathes out', 'cools down', 'fills up', 'dries out'],
    answer: 'breathes out',
    hint: `The next sentence explains the word by describing what the buildings do with the heat.`,
    explanation: `To <b>exhale</b> is to breathe out, and the following sentence spells it out: the heat <i>comes back out of them slowly, the way a held breath comes out</i>. The writer has denied cooling in the same sentence, so <i>cools down</i> is the one reading the text has already refused.` }),

  makeText({ id: 'g9eng-d3-022', chapterId: CH, difficulty: 1, subsection: 'vocabulary',
    question: _P3 + `<p>Copy from the passage the ONE word the writer uses for the sound the bus door makes as it opens.</p>`,
    answer: 'sigh', alsoAccept: ['a sigh', 'sigh.', 'sighs'],
    hint: `It is in the short sentence that closes the third paragraph.`,
    explanation: `<i>The door folded open with a <b>sigh</b>.</i> The word matters because it is the same breathing image as <i>exhales</i> two paragraphs earlier: the town breathes out, and so does the bus. Copying a word exactly is part of the task — a near miss such as "sighing" is not what the text says.` }),

  makeMCQ({ id: 'g9eng-d3-023', chapterId: CH, difficulty: 2, subsection: 'vocabulary',
    question: _P3 + `<p>The square <i>had begun to give up on it</i>. Here, <b>give up on</b> means</p>`,
    options: ['stop expecting it to come', 'stand further from the road',
              'complain about the driver', 'refuse to pay the fare'],
    answer: 'stop expecting it to come',
    hint: `The phrase follows straight after the reason for it. Read the four words in front of the comma.`,
    explanation: `<i>The bus was late</i>, so the waiting people have stopped believing in it — to <b>give up on</b> something is to abandon hope of it, not to abandon a place or a payment. The whole phrasal verb has to be read together: <b>give up</b> alone would mean surrender, and the little word <b>on</b> turns it into losing faith in something.` }),

  makeText({ id: 'g9eng-d3-024', chapterId: CH, difficulty: 1, subsection: 'retrieval',
    question: _P3 + `<p>What was in the old man's sack? Answer in ONE word.</p>`,
    answer: 'flour', alsoAccept: ['a sack of flour', 'flour.'],
    hint: `He is the third person named in the line under the clock, in the first paragraph.`,
    explanation: `<i>an old man with a sack of <b>flour</b> he would not set down</i>. Retrieval questions are marked on the exact word, so read to the end of the phrase: the sack is the container, and the answer is what was inside it.` }),

  makeMCQ({ id: 'g9eng-d3-025', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P3 + `<p>A reader says: <i>by the end of the journey the writer has come to agree with her grandmother.</i> Which line is the best evidence?</p>`,
    options: ['I sat still all the way to Rose Hill',
              'a bus is the only place where we sit still',
              'I found a place by the window and sat down',
              'the town began to slide backwards past me'],
    answer: 'I sat still all the way to Rose Hill',
    hint: `The grandmother made a claim. Look for the line in which the writer does the very thing that claim describes.`,
    explanation: `The grandmother's claim is that a bus is where we sit still; the evidence that the writer now agrees is that she does it, for the whole journey, and says so immediately before <i>I understood her</i>. Quoting the grandmother only repeats the claim, and sitting down by a window is where the journey starts, not what it taught her.` }),

  makeMCQ({ id: 'g9eng-d3-026', chapterId: CH, difficulty: 2, subsection: 'authors_view',
    question: _P3 + `<p>How does the writer seem to feel about the late bus and the long wait?</p>`,
    options: ['Affectionate, and in no hurry', 'Impatient, and rather angry',
              'Frightened, and glad to leave', 'Amused, and openly scornful'],
    answer: 'Affectionate, and in no hurry',
    hint: `Weigh the warmth of the details she chooses against how much she actually complains.`,
    explanation: `She lingers over the nurse, the earphones, the mist, the warm seats — details a person in a hurry would not record — and she never once complains about the delay. There is humour in the moth, but no scorn: the bus is treated kindly, and the journey ends in gratitude rather than relief.` })

);

// ══ PASSAGE 4 · narrative — "The ravanne" ══════════════════════════════════
const _P4 = box(`
<b style="color:#7c3aed">Read the passage, then answer the question.</b><br><br>
My grandfather never said that he was going to play. He said that he was going to make the ravanne listen.<br><br>
The skin has to be heated first. He would build a small fire of coconut husk in the yard, no bigger than a hat, and hold the drum above it and turn it, and turn it, and turn it, the way my mother turns a farata. The skin tightened as it warmed, and you could hear it happening: a low note climbing, out of a mutter and into a voice.<br><br>
He tested it with one finger, near the rim, the way a doctor taps a chest. Too slack and it answered like a wet cardboard box. Too tight and it went thin and mean, all rim and no belly. In between there was one place, and he knew it without counting, and when he found it he stopped turning and looked up, and that was the whole of the announcement.<br><br>
Then the yard filled. It always filled. Nobody was ever invited into the yard, and all came.<br><br>
He is eleven years gone this November. The ravanne has hung on my kitchen wall for years, the skin is as loose as an old sail and has no note, and I have never once put a fire under it in eleven years. I tell people that this is because I do not know how. That is not true. I know exactly how. What I do not know is what I would do if it answered.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeTF({ id: 'g9eng-d3-027', chapterId: CH, difficulty: 2, subsection: 'language',
    question: _P4 + `<p>True or False: <i>the skin is as loose as an old sail</i> is a metaphor.</p>`,
    answer: false,
    hint: `Look for the small word that tells you the writer is comparing two things rather than calling one the other.`,
    explanation: `False — it is a <b>simile</b>, because the comparison is signalled by <b>as</b>. A metaphor would say the skin <i>was</i> an old sail. Both are comparisons and both are figurative; what separates them is whether the likeness is announced. <i>All rim and no belly</i>, earlier in the same passage, is the metaphor.` }),

  makeMCQ({ id: 'g9eng-d3-028', chapterId: CH, difficulty: 2, subsection: 'language',
    question: _P4 + `<p>Why does the writer repeat the words <i>and turn it, and turn it, and turn it</i>?</p>`,
    options: ['To make the reader feel how long it took',
              'To suggest the fire had gone out twice',
              'To show that the drum was badly made',
              'To show that the grandfather was bored'],
    answer: 'To make the reader feel how long it took',
    hint: `Read the phrase aloud. Ask what the repetition does to the speed of the sentence.`,
    explanation: `Repetition slows the sentence down, so the reader spends time on the turning just as the grandfather did — the form of the sentence imitates the work it describes. It is not a complaint: the passage treats the patience as skill, so boredom and a badly made drum both read against the tone of the whole paragraph.` }),

  makeMCQ({ id: 'g9eng-d3-029', chapterId: CH, difficulty: 3, subsection: 'language',
    question: _P4 + `<p>As it warms, the drum rises <i>out of a mutter and into a voice</i>. What is the effect of that phrasing?</p>`,
    options: ['It makes the drum seem to wake and begin speaking',
              'It tells the reader the fire was much too hot for it',
              'It shows that the grandfather was singing along to it',
              'It suggests the yard had become noisy with talking'],
    answer: 'It makes the drum seem to wake and begin speaking',
    hint: `Both <i>mutter</i> and <i>voice</i> normally belong to one kind of thing. Ask what that is.`,
    explanation: `Muttering and voices belong to people, so the rising note becomes a creature coming awake and finding speech — which is exactly what the grandfather meant by making the ravanne <i>listen</i>. The words describe the drum, not the fire, the man or the crowd; the yard does not fill until a paragraph later.` }),

  makeMCQ({ id: 'g9eng-d3-030', chapterId: CH, difficulty: 3, subsection: 'language',
    question: _P4 + `<p><i>Too tight and it went thin and mean, all rim and no belly.</i> What does <b>no belly</b> stand for?</p>`,
    options: ['The deep round note the drum should have',
              'The wooden hoop under the goatskin',
              'The heat rising from the coconut husk',
              'The wide space a sega dancer needs'],
    answer: 'The deep round note the drum should have',
    hint: `The phrase is set against <i>thin</i>. Ask what a drum loses when its sound becomes thin.`,
    explanation: `A belly is deep and rounded, so <b>no belly</b> means the sound has lost its depth and become all surface — the opposite of <i>thin</i>. The metaphor treats the drum as a body: the rim is its edge and the belly is its resonance. It names a quality of the note, not a part of the instrument or the yard.` }),

  makeMCQ({ id: 'g9eng-d3-031', chapterId: CH, difficulty: 1, subsection: 'vocabulary',
    question: _P4 + `<p>In this passage, <b>slack</b> means</p>`,
    options: ['loose', 'thick', 'damp', 'torn'],
    answer: 'loose',
    hint: `It is used as the opposite of the word that begins the next sentence.`,
    explanation: `<i>Too <b>slack</b></i> is set directly against <i>Too tight</i> in the very next sentence, so it must mean <b>loose</b>. The passage gives you the definition free of charge by putting the opposite beside it — a pattern worth looking for whenever an unfamiliar word appears in a list of extremes.` }),

  makeMCQ({ id: 'g9eng-d3-032', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P4 + `<p>In <i>it went thin and mean</i>, the word <b>mean</b> is closest in meaning to</p>`,
    options: ['unpleasantly sharp', 'unusually deep', 'extremely quiet', 'slightly damp'],
    answer: 'unpleasantly sharp',
    hint: `It is describing a sound, so the everyday sense of the word to do with money cannot apply here.`,
    explanation: `Used of a sound, <b>mean</b> carries a hard, unkind edge, and it sits beside <i>thin</i> and against <i>belly</i> — so the note has become sharp and unpleasant. It does not mean quiet, and <i>deep</i> is its opposite in this sentence. A common word can carry an uncommon sense, and only the company it keeps will tell you which one.` }),

  makeMCQ({ id: 'g9eng-d3-033', chapterId: CH, difficulty: 2, subsection: 'evidence',
    question: _P4 + `<p>A reader says: <i>the writer is not honest with other people about the drum.</i> Which line is the best evidence?</p>`,
    options: ['That is not true. I know exactly how',
              'The ravanne has hung on my kitchen wall',
              'He is eleven years gone this November',
              'I have never once put a fire under it'],
    answer: 'That is not true. I know exactly how',
    hint: `Look for the line in which she takes back something she has just told other people.`,
    explanation: `She reports what she tells people and then contradicts it in her own words, which is the admission itself. The wall, the November and the unlit fire are all true statements and none of them involves telling anybody anything. Evidence of dishonesty has to show the gap between what was said and what is known.` }),

  makeMCQ({ id: 'g9eng-d3-034', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P4 + `<p>A reader says: <i>the writer is afraid of what the drum would bring back.</i> Which line is the best evidence?</p>`,
    options: ['What I do not know is what I would do if it answered',
              'The skin is as loose as an old sail and has no note',
              'Nobody was ever invited into the yard, and all came',
              'The ravanne has hung on my kitchen wall for years'],
    answer: 'What I do not know is what I would do if it answered',
    hint: `Three of these describe a state of affairs. Look for the one that describes something the writer cannot face.`,
    explanation: `That final sentence puts the fear into words without naming it: not the drum, but her own reaction to hearing it again. The loose skin and the kitchen wall explain why the drum is silent; the crowded yard belongs to the grandfather. Evidence of a feeling is a line about the person, not about the object.` }),

  makeMCQ({ id: 'g9eng-d3-035', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P4 + `<p>Why does the writer end with the loose skin and the fire she has never lit?</p>`,
    options: ['To admit a grief she has not yet faced',
              'To explain that the drum can no longer be used',
              'To show that she was never taught the craft',
              'To complain that nobody plays the sega now'],
    answer: 'To admit a grief she has not yet faced',
    hint: `She states plainly that she does know how. Ask what is left to explain her never doing it.`,
    explanation: `She removes the practical excuse herself — <i>I know exactly how</i> — so the silence of the drum can only be about her grandfather and not about skill or equipment. The passage never suggests the sega has died out, and that is the tempting reading, because it turns a private loss into a general complaint the text does not make.` }),

  makeText({ id: 'g9eng-d3-036', chapterId: CH, difficulty: 1, subsection: 'retrieval',
    question: _P4 + `<p>What did the grandfather build his small fire from? Answer in ONE word.</p>`,
    answer: 'husk', alsoAccept: ['coconut husk', 'husks', 'coconut', 'coconut husks'],
    hint: `The material is named in the second paragraph, just before the fire is measured against a hat.`,
    explanation: `<i>a small fire of coconut <b>husk</b> in the yard</i>. Coconut husk burns slowly and with a low flame, which is why it suits a job that needs long, even warmth rather than heat — the detail is chosen, not decorative.` })

);

// ══ PASSAGE 5 · a leaflet — text FEATURES, not a story ═════════════════════
// ⚠ No photograph is referred to anywhere. That artwork does not exist in this
//   repo, and "look at the picture" with no picture is a broken item. Every
//   feature asked about below is printed on the screen: heading, subheadings,
//   bullets, bold, a table with its caption, a boxed panel, a footer.
const _P5 = box(`
<div style="text-align:center;font-size:1.35em;font-weight:800;letter-spacing:.02em;color:#065f46">PLANT A MANGROVE, HOLD A COAST</div>
<div style="text-align:center;font-style:italic;margin-bottom:10px">Volunteer planting days at Grand Sable &mdash; Lagon Vivan, October to December</div>
<div style="font-weight:700;color:#065f46;margin-top:8px">WHY MANGROVES MATTER</div>
<div>A mangrove holds the mud with its roots. Where the trees have gone, the sea takes the bank a little further inland every year, the lagoon fills with silt, and the young fish that shelter among the roots go elsewhere. Replanting is slow, cheap and unglamorous, and it works.</div>
<div style="font-weight:700;color:#065f46;margin-top:8px">WHAT A VOLUNTEER DAY INVOLVES</div>
<ul style="margin:4px 0 0 18px;padding:0">
<li>Arrive at the community hall for a twenty-minute briefing.</li>
<li>Collect a bundle of twenty seedlings and a planting stick.</li>
<li>Walk out onto the mudflat with your group leader at low tide.</li>
<li>Push each seedling in to the depth marked on the stick.</li>
<li>Count your bundle back in before you leave the flat.</li>
</ul>
<div style="font-weight:800;margin-top:10px">Bring a hat and drinking water. There is no shade at all on the mudflat.</div>
<div style="font-weight:700;color:#065f46;margin-top:8px">WHEN AND WHERE</div>
<table style="border-collapse:collapse;margin:4px 0;font-size:.95em">
<tr><td style="border:1px solid #94a3b8;padding:2px 8px"><b>Date</b></td><td style="border:1px solid #94a3b8;padding:2px 8px"><b>Low tide</b></td><td style="border:1px solid #94a3b8;padding:2px 8px"><b>Meeting point</b></td></tr>
<tr><td style="border:1px solid #94a3b8;padding:2px 8px">Sat 12 Oct</td><td style="border:1px solid #94a3b8;padding:2px 8px">07:40</td><td style="border:1px solid #94a3b8;padding:2px 8px">Community hall</td></tr>
<tr><td style="border:1px solid #94a3b8;padding:2px 8px">Sat 9 Nov</td><td style="border:1px solid #94a3b8;padding:2px 8px">08:15</td><td style="border:1px solid #94a3b8;padding:2px 8px">Community hall</td></tr>
<tr><td style="border:1px solid #94a3b8;padding:2px 8px">Sat 7 Dec</td><td style="border:1px solid #94a3b8;padding:2px 8px">06:55</td><td style="border:1px solid #94a3b8;padding:2px 8px">Old jetty steps</td></tr>
</table>
<div style="font-size:.9em;font-style:italic">Table 1: the three planting days, with the hour of low tide at Grand Sable.</div>
<div style="background:#ecfdf5;border:1px dashed #059669;border-radius:5px;padding:6px 10px;margin:10px 0"><b>AT A GLANCE</b> &nbsp;&middot;&nbsp; 1,400 seedlings planted since 2019 &nbsp;&middot;&nbsp; 61% still alive after two years &nbsp;&middot;&nbsp; 9 metres of bank recovered</div>
<div style="font-size:.9em">Lagon Vivan, Rue des Filaos, Grand Sable &middot; telephone 5xxx xxxx &middot; no booking needed</div>
`, '#059669');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-037', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P5 + `<p>What does a subheading such as <b>WHY MANGROVES MATTER</b> tell a reader before they have read a single sentence under it?</p>`,
    options: ['What that section is about', 'How long the section is',
              'Who wrote the section', 'Where the section was printed'],
    answer: 'What that section is about',
    hint: `Ask what a reader gains by seeing the words in bold before the paragraph they belong to.`,
    explanation: `A subheading labels the block of text beneath it, so a reader can decide whether to read on or skip to the next one. It says nothing about length, authorship or where the leaflet came from. This is why a leaflet with four subheadings can be used by somebody who never reads it straight through.` }),

  makeMCQ({ id: 'g9eng-d3-038', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P5 + `<p>Why has the volunteer day been set out as a bulleted list rather than as a paragraph?</p>`,
    options: ['So each step can be seen at a glance',
              'So the reader knows who to telephone',
              'So the leaflet costs less to print',
              'So the words are spelt more simply'],
    answer: 'So each step can be seen at a glance',
    hint: `Count the items. Ask what a list does to information that comes in a fixed order.`,
    explanation: `Bullets cut a sequence into separate lines, so the eye can find step four without reading steps one to three again — and a volunteer on a mudflat needs exactly that. Bullets change nothing about spelling, cost or contact details; they change how quickly one item can be found.` }),

  makeText({ id: 'g9eng-d3-039', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P5 + `<p>One line of this leaflet is printed in heavy bold and stands on its own. In ONE word, what is that line doing?</p>`,
    answer: 'warning', alsoAccept: ['warn', 'warns', 'warning.', 'advising', 'a warning'],
    hint: `Read the line itself, then ask why it has been given a whole line of its own instead of joining a paragraph.`,
    explanation: `<i>Bring a hat and drinking water. There is no shade at all on the mudflat.</i> Bold type on its own line is used for something a reader must not miss, and here that is a <b>warning</b> about their own safety. The same words inside a paragraph would still be true, and easy to skip &mdash; which is the whole reason for the bold.` }),

  makeMCQ({ id: 'g9eng-d3-040', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P5 + `<p>What is the purpose of the small italic line printed directly under the table?</p>`,
    options: ['It tells the reader what the table shows',
              'It gives the name of the person who made it',
              'It repeats the heading at the top of the page',
              'It lists the places where copies can be found'],
    answer: 'It tells the reader what the table shows',
    hint: `Read the line and then read the table. Ask which of them could be understood without the other.`,
    explanation: `That line is a <b>caption</b>: <i>Table 1: the three planting days, with the hour of low tide at Grand Sable.</i> It names and numbers the table and says what its columns mean, so the table can be quoted or referred to elsewhere. A caption never repeats the main heading; its whole job is to explain the one thing it sits beneath.` }),

  makeMCQ({ id: 'g9eng-d3-041', chapterId: CH, difficulty: 2, subsection: 'text_features',
    question: _P5 + `<p>A reader has thirty seconds and wants the three main figures for the project. Which part of the layout is designed for them?</p>`,
    options: ['The boxed AT A GLANCE panel', 'The first paragraph of the leaflet',
              'The bulleted list of the day plan', 'The contact details at the foot'],
    answer: 'The boxed AT A GLANCE panel',
    hint: `One part of the page is fenced off from the text around it. Ask why a designer would do that.`,
    explanation: `A box lifts its contents out of the reading order, so a panel headed <b>AT A GLANCE</b> can be taken in without reading the leaflet at all &mdash; and the three figures in it are precisely the numbers a hurried reader wants. The paragraph and the bullets both have to be read in order, and the footer carries an address, not figures.` }),

  makeTF({ id: 'g9eng-d3-042', chapterId: CH, difficulty: 2, subsection: 'text_features',
    question: _P5 + `<p>True or False: on a leaflet like this one, the largest and boldest print is used to tell the reader what the whole leaflet is about.</p>`,
    answer: true,
    hint: `Find the biggest words on the page and ask how much of the leaflet they cover.`,
    explanation: `True. <i>PLANT A MANGROVE, HOLD A COAST</i> is the main heading, and size marks rank: the biggest print covers everything, a subheading covers one section, bold inside a line covers one point. Reading a layout means reading that order of size before reading the words &mdash; it tells you how the page is organised.` })

);

// ══ PASSAGE 6 · a magazine article — layout features ═══════════════════════
const _P6 = box(`
<div style="font-size:1.25em;font-weight:800;color:#1e3a8a">The steps nobody photographs</div>
<div style="font-size:.9em;color:#475569;margin-bottom:8px">by Anjali Ramsamy, Form IV &middot; school magazine, issue 41</div>
<div>Half a million people came ashore in Port Louis in the last century of the sugar estates, and almost all of them walked up the same flight of stone steps. I went to look at them on a Tuesday in July, with a notebook and no clear question.</div>
<div style="font-weight:700;color:#1e3a8a;margin-top:10px">What is actually there</div>
<div>Less than you expect. A low wall, a paved yard, a row of arches, and the steps, which are shorter than the ones at my school and worn into a shallow curve in the middle. A guide told me that the curve is the only part of the site that nobody built.</div>
<div style="font-size:1.1em;font-style:italic;color:#1e3a8a;border-left:3px solid #93c5fd;padding-left:10px;margin:10px 0">The curve is the only part of the site that nobody built.</div>
<div style="font-weight:700;color:#1e3a8a;margin-top:10px">Why it is quiet</div>
<div>Two coach parties came and went while I sat there. Both spent longer in the shop than in the yard. I do not think this is disrespect; I think a place with nothing to look at asks more of a visitor than a place with a view, and most of us have not been taught how to give it.</div>
<div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:5px;padding:6px 10px;margin:10px 0"><b>HOW TO GET THERE</b><br>Any bus to Immigration Square, then five minutes on foot towards the waterfront. Open every day except public holidays. Entry is free; the guided tour is not.</div>
<div>I left without my clear question and with a different one, which I have put at the top of this article.</div>
`, '#1d4ed8');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-043', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P6 + `<p>What does the small grey line printed under the title tell the reader?</p>`,
    options: ['Who wrote the article', 'How long the article is',
              'Where the writer was born', 'Which bus goes to the site'],
    answer: 'Who wrote the article',
    hint: `Read the line itself. It gives a name, a class and the issue it appeared in.`,
    explanation: `That line is the <b>byline</b>: it names the writer and where the piece was published. Knowing who wrote something and in what — a school magazine, in this case — changes how you read it, which is why the byline is placed before the first sentence rather than after the last.` }),

  makeText({ id: 'g9eng-d3-044', chapterId: CH, difficulty: 1, subsection: 'text_features',
    question: _P6 + `<p>How many subheadings does this article use? Write the number in digits.</p>`,
    answer: '2', alsoAccept: ['two', 'Two'],
    hint: `A subheading is a short bold line that labels the paragraphs below it. Do not count the title or the boxed panel.`,
    explanation: `<i>What is actually there</i> and <i>Why it is quiet</i> — <b>2</b>. The title at the top is the headline, not a subheading, and <i>HOW TO GET THERE</i> labels a box rather than a run of paragraphs. Counting the parts of a layout is how you see its plan: this article opens, describes, explains, and then closes.` }),

  makeMCQ({ id: 'g9eng-d3-045', chapterId: CH, difficulty: 2, subsection: 'text_features',
    question: _P6 + `<p>One sentence from the middle of the article is printed again, larger and in italics, beside a line. Why?</p>`,
    options: ['To catch the eye of someone skimming', 'To correct a mistake made earlier on',
              'To show where the article finishes', 'To list the sources the writer used'],
    answer: 'To catch the eye of someone skimming',
    hint: `The sentence already appears once in an ordinary paragraph. Ask what the second printing adds.`,
    explanation: `A pulled-out quotation adds no new information — the sentence is already there — so its only work is visual: it stops a reader who is turning pages and shows them the best line in the piece. It is a piece of advertising for the article, placed inside the article.` }),

  makeMCQ({ id: 'g9eng-d3-046', chapterId: CH, difficulty: 2, subsection: 'text_features',
    question: _P6 + `<p>What job is done by the boxed section headed <b>HOW TO GET THERE</b>?</p>`,
    options: ['It keeps practical detail out of the story',
              'It explains the harder words used in the text',
              'It repeats the opening of the article',
              'It names the people the writer met'],
    answer: 'It keeps practical detail out of the story',
    hint: `Compare the kind of writing inside the box with the kind of writing on either side of it.`,
    explanation: `Buses, opening days and prices would break the thread of a piece about standing still in an empty yard, so the layout puts them in a box where a reader can find them and the article need not carry them. A box separates two kinds of writing on one page; it is not a glossary, a summary or a list of names.` })

);

// ══ LITERATURE · an original poem and an original prose extract ════════════
// ⚠ Both texts are written for this repository. The NCE Q10 sets two
//   isomorphic options — a poem and a prose extract — and both are printed in
//   full with a glossary, so nothing here needs a set text read in advance.
// ⚠ Every item is L4 "Extended Analysis": what a choice DOES to a reader, not
//   what a term is called. Naming a simile is L1 and belongs elsewhere.
// ⚠ NO ITEM OFFERS "fourth person" AS AN OPTION. blueprint-english.md §8.10:
//   it is always on the paper and never the answer, so it hands a pupil a free
//   elimination. The narrative-voice item below turns on omniscient versus
//   limited instead, which is a real distinction with a real answer.
const _L1 = box(`
<b style="color:#be123c">FILAO</b><br><br>
<div style="font-style:italic;line-height:1.85">
The filaos on the sand at Belle Mare<br>
stand in a row and never turn to stare.<br>
They have been counting weather, year on year,<br>
and keep the whole account in needles here.<br><br>
At noon they drop a thin and whistling shade,<br>
too thin for sleep, too honest to be paid.<br>
The wind comes off the reef and is delayed<br>
one moment in their branches, unafraid.<br><br>
My father called them soldiers on parade.<br>
I call them women standing in a queue,<br>
patient with the patience of the poor,<br>
who know the office opens when it opens.<br><br>
Last April four were felled to widen the road.<br>
The others closed the gap above the sand<br>
the way a crowd closes behind a stretcher,<br>
and went on making the same thin noise.
</div><br>
<span style="font-size:.88em"><b>Glossary.</b> <i>filao</i> &mdash; the casuarina, a tall needle-leaved tree planted along Mauritian beaches to hold the sand.</span>
`, '#e11d48');

STATIC_QUESTIONS.push(

  makeText({ id: 'g9eng-d3-047', chapterId: LIT, difficulty: 4, subsection: 'rhyme',
    question: _L1 + `<p>The poem rhymes steadily and then stops rhyming. Copy the LAST word in the poem that still belongs to that rhyme before it is abandoned.</p>`,
    answer: 'parade', alsoAccept: ['parade.', 'on parade'],
    hint: `Work out which sound the first two stanzas keep returning to, then read into the third stanza until that sound disappears.`,
    explanation: `The second stanza runs <i>shade &middot; paid &middot; delayed &middot; unafraid</i>, and the third stanza opens on the same sound &mdash; and then drops it for <i>queue</i>, <i>poor</i> and <i>opens</i>. The word that ends the chain is the last one the speaker borrows from her father, and it is no accident: the rhyme survives exactly as long as she is repeating somebody else, and stops the moment she says what she herself thinks.` }),

  makeMCQ({ id: 'g9eng-d3-048', chapterId: LIT, difficulty: 4, subsection: 'line_explication',
    question: _L1 + `<p>What do you understand by these lines? <i>patient with the patience of the poor, / who know the office opens when it opens.</i></p>`,
    options: ['Their waiting is forced on them, not chosen',
              'They are content to wait because they are calm',
              'They are waiting for the road works to finish',
              'They have been told the wrong opening hours'],
    answer: 'Their waiting is forced on them, not chosen',
    hint: `The word <i>patience</i> is defined here by who has it. Ask why the poet specifies which people she means.`,
    explanation: `By tying the patience to <i>the poor</i>, the poet says it is the patience of people who have no other option, and <i>opens when it opens</i> is a shrug at a power that will not explain itself. The tempting misreading is calm contentment &mdash; but nobody chooses this patience, and that is the whole weight of the line. The road works come a stanza later and are not what is being waited for.` }),

  makeMCQ({ id: 'g9eng-d3-049', chapterId: LIT, difficulty: 4, subsection: 'figurative_devices',
    question: _L1 + `<p>The poem gives the same trees two metaphors: <i>soldiers on parade</i> and <i>women standing in a queue</i>. What is the difference between what the two say?</p>`,
    options: ['One makes the stillness proud, the other endured',
              'One is a simile and the other is a metaphor',
              'One describes the trees, the other the wind',
              'One belongs to the sea, the other to the road'],
    answer: 'One makes the stillness proud, the other endured',
    hint: `Both pictures show people standing in a line. Ask, for each one, why those people are standing there.`,
    explanation: `Soldiers stand in a line because they have been drilled into it and it is an honour; women in a queue stand in a line because somebody else has the key to the door. The physical picture barely changes and the meaning reverses &mdash; which is why the speaker takes the trouble to correct her father. Both images are metaphors, so the wording of a device is not what separates them.` }),

  makeMCQ({ id: 'g9eng-d3-050', chapterId: LIT, difficulty: 4, subsection: 'effect_of_device',
    question: _L1 + `<p>What is the effect of the comparison in <i>The others closed the gap above the sand / the way a crowd closes behind a stretcher</i>?</p>`,
    options: ['It makes the felling feel like a death in public',
              'It makes the road works sound noisy and slow',
              'It shows the trees were planted very close up',
              'It tells us how many people watched the felling'],
    answer: 'It makes the felling feel like a death in public',
    hint: `Ask what a crowd is doing when it closes behind a stretcher, and what it goes on to do afterwards.`,
    explanation: `A stretcher carries somebody away, and the crowd closing over the gap is the ordinary, slightly shameful way life resumes over a loss. Applied to four cut trees, the comparison grants them a death and then refuses them a funeral &mdash; which is why the poem can end on nothing more than <i>the same thin noise</i>. A comparison about spacing or numbers would explain the line away.` }),

  makeMCQ({ id: 'g9eng-d3-051', chapterId: LIT, difficulty: 4, subsection: 'effect_of_device',
    question: _L1 + `<p>A shade cannot whistle. What does the poet achieve by writing <i>a thin and whistling shade</i>?</p>`,
    options: ['It lets one image carry sound and sight at once',
              'It shows that the noon sun was almost directly up',
              'It suggests the wind had dropped away completely',
              'It tells the reader that the trees were nearly dead'],
    answer: 'It lets one image carry sound and sight at once',
    hint: `Decide which word belongs to the eye and which to the ear, then ask what the poet has done by joining them.`,
    explanation: `<i>Thin</i> belongs to the eye and <i>whistling</i> to the ear, and the poet hangs both on one thing, so a reader standing under a filao at noon gets the patchy light and the sound of the needles in a single stroke. Prising the two apart &mdash; a thin shade, and a whistling wind &mdash; would say the same and feel like two facts instead of one place.` })

);

const _L2 = box(`
<b style="color:#be123c">From an unpublished short story, "The Interview"</b><br><br>
Shobha had rehearsed the walk from the gate to the door, and the walk was fine. It was the sitting that undid her. The chair was lower than the desk, so that she had to look up at the three of them, and she understood, without being told and without resentment, that this was not an accident.<br><br>
The man in the middle asked her where she saw herself in five years. She heard herself say something about growth. Behind him, through the window, a kestrel was working the air above the car park in small tight circles, holding still and then not still, and she wanted very much to point at it.<br><br>
They thanked her. On the bus home she rewrote every answer she had given, and each rewritten answer was better than the one she had actually said, and there were nine stops in which to perfect them.
`, '#e11d48');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-d3-052', chapterId: LIT, difficulty: 4, subsection: 'narrative_voice',
    question: _L2 + `<p>The extract is told in the third person, yet the reader is never taken outside what Shobha herself notices. What does that choice achieve?</p>`,
    options: ['It keeps the three interviewers unreadable to us',
              'It tells us what each interviewer privately thought',
              'It shows that Shobha is remembering it long after',
              'It proves the narrator dislikes the three of them'],
    answer: 'It keeps the three interviewers unreadable to us',
    hint: `List everything the narrator is able to report. Then ask what is on the far side of the desk and whether you are ever shown it.`,
    explanation: `A third-person narrator who stays inside one head is <b>limited</b>, not omniscient: we get the chair, the kestrel and the nine stops, and not one thought from the men. That is why the interview feels like an interview &mdash; the panel is a wall, exactly as it is for her. An omniscient narrator would tell us what they made of her, and the tension would go out of the room.` }),

  makeMCQ({ id: 'g9eng-d3-053', chapterId: LIT, difficulty: 4, subsection: 'supported_response',
    question: _L2 + `<p>Which judgement about the extract as a whole is best supported by its details?</p>`,
    options: ['Shobha is more observant than the room allows her to be',
              'Shobha was unprepared for the interview she attended',
              'Shobha believes she will be offered the post shortly',
              'Shobha resents the three people who interviewed her'],
    answer: 'Shobha is more observant than the room allows her to be',
    hint: `Set what she says out loud against what she notices, and count how much of the extract is given to each.`,
    explanation: `She reads the height of the chair correctly, she catches a kestrel hunting through a window, and on the bus she can rebuild every answer &mdash; yet the only thing the room gets out of her is <i>something about growth</i>. Unprepared is refuted by the rehearsed walk, resentment is denied in the text itself, and nothing suggests she expects the post. A supported judgement has to survive the lines that contradict it.` })

);

})();
