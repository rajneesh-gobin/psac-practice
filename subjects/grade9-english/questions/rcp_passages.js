'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade9-english — reading comprehension: 6 original passages, 10 questions
//  each (5 makeMCQ + 5 makeText). IDs: g9eng-rcp-001-m1 … g9eng-rcp-006-o5.
//
//  WHY: g9eng-reading held 54 items and NO shared passage — each item carried
//  its own 150-180 word text and asked one question about it. That is a set of
//  snippets, not a comprehension. A comprehension is one text a child reads
//  once and then answers several questions about, which is what the NCE N500
//  Question 1 actually is.
//
//  Every passage is ORIGINAL and set in Mauritius. Nothing here is copied.
//  The 1867 report and letter in Passage 1 are invented, not transcribed; the
//  people and the figures in them are fictional, the history is not.
//
//  ⚠ The passage const is repeated on all ten questions of its block, exactly
//    as the grade5 passage files do. Practice and exam mode both serve single
//    questions at random, so a child must never have to scroll back to a text
//    they have left.
//  ⚠ The box sets BOTH background and color. The app has a dark theme: a box
//    with only a background inherits white-on-white text.
//  ⚠ Two blocks are TWO LINKED TEXTS in one box (Passage 1 and Passage 6).
//    That is the one Grade-9-only Reading competency — "patterns, connections,
//    contradictions … across texts" — and it cannot be asked of one text.
// ══════════════════════════════════════════════════════════════════════════

(function () {
const CH = 'g9eng-reading';
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · official report + personal letter (two linked texts) ══════
const _P1 = box(`
<b style="color:#1e40af">Read BOTH texts, then answer the question.</b><br><br>
<b>TEXT A — from the annual report of the Inspector of Immigrants, Port Louis, 1867</b><br><br>
During the year under review, four thousand one hundred and six immigrants landed at the depot beside the harbour. Every vessel was boarded before landing and the surgeon's book examined. Ninety-four persons were sent at once to the hospital; the remainder were housed in the sheds for three days. Three vessels carried sickness of a kind that obliged me to hold them at anchor, and I record with satisfaction that no infection passed from the anchorage into the town.<br><br>
The arrangements at the depot continue to give satisfaction. Water is drawn from the well in the western yard. Rations of rice, dhal and salt fish are issued twice on every day of the stay, in the quantities laid down by regulation. Each immigrant is photographed, numbered, and given a ticket, which he is required to carry.<br><br>
It is proper to record that a small number of complaints were received. Eleven men objected that the work allotted to them differed from the terms read to them at the port of embarkation. In every case the agreement was produced and read over again, in the presence of an interpreter, and the men returned to their estates. I am satisfied that the terms were correctly explained.<br><br>
The stone steps from the water to the yard are worn and should be repaired before the next season. I have twice requested the necessary sum. In all other respects the service is conducted with regularity, and the estates of this colony are supplied without disturbance.<br><br>
<b>TEXT B — a letter from Ramdeo Bhagwat to his brother, written from Camp Belle Vue, 1867</b><br><br>
Brother,<br><br>
A clerk is writing this for me and I pay him by the page, so I will put down only what matters.<br><br>
We came ashore on the ninth day of the month, up sixteen stone steps from the water. I counted them because I could think of nothing else to do. My number is 41322. It is cut into a tin ticket and I am told never to lose it, because a man without his ticket is a vagrant, and a vagrant is taken up.<br><br>
They gave us rice and dhal twice a day and I do not say that we were starved. But you must understand the difference between what was said to us in Calcutta and what is said to us here. In Calcutta the agent spoke of five years, of good wages, and of a piece of ground of my own at the end of it. Here I am told that my agreement says field work at Belle Vue, and that the rest was my own imagining.<br><br>
When eleven of us complained, the paper was fetched and read to us again in our own language by a man paid by the office. He read it well. I could not read it at all. That is the whole of the matter, and it is the reason I am writing to you: do not put your mark on any paper, however kindly it is explained.<br><br>
I am well, and the work is work. Do not repeat any of this to our mother; tell her only that the food is regular, which is true.<br><br>
The steps are worn in the middle. Thousands of us have come up them.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-001-m1', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P1 + `<p>Both texts describe the eleven men who complained. What does Text B add that Text A leaves out?</p>`,
    options: ['That the men could not read the agreement',
              'That the men were never shown any paper',
              'That the men refused to go back to work',
              'That the men were kept at the depot'],
    answer: 'That the men could not read the agreement',
    hint: `Both texts agree that the paper was read aloud. Look at the very short sentence in Text B that follows the reading.`,
    explanation: `Text A treats the re-reading as the end of the matter. Text B agrees it happened — <i>He read it well</i> — and then adds the fact the report never records: <b>I could not read it at all</b>. Both men heard the same words; only one of them could check them.` }),

  makeMCQ({ id: 'g9eng-rcp-001-m2', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P1 + `<p>A reader says: <i>Text A judges its own service and finds it satisfactory.</i> Which line from Text A best supports that claim?</p>`,
    options: ['I am satisfied that the terms were correctly explained',
              'Rations of rice, dhal and salt fish are issued twice',
              'the remainder were housed in the sheds for three days',
              'The stone steps from the water to the yard are worn'],
    answer: 'I am satisfied that the terms were correctly explained',
    hint: `Three of these lines simply record a fact. One of them records an opinion, and says whose opinion it is.`,
    explanation: `<b>I am satisfied</b> is the inspector judging the very complaint he has just described, and the service is his own. The other three lines report rations, housing and stonework: a reader can check them, and they contain no verdict.` }),

  makeMCQ({ id: 'g9eng-rcp-001-m3', chapterId: CH, difficulty: 2, subsection: 'vocabulary',
    question: _P1 + `<p>In Text A, the work <b>allotted</b> to the men means the work that was</p>`,
    options: ['given out to them', 'promised to them', 'refused to them', 'described to them'],
    answer: 'given out to them',
    hint: `The men are objecting that this work is not the work they expected. Who decided it?`,
    explanation: `To <b>allot</b> is to hand out a share that someone else has decided on. The men were not promised this work — that is exactly their complaint — and it was certainly not refused to them.` }),

  makeMCQ({ id: 'g9eng-rcp-001-m4', chapterId: CH, difficulty: 4, subsection: 'authors_view',
    question: _P1 + `<p>What does Ramdeo most want his brother to do?</p>`,
    options: ['Refuse to sign any agreement of this kind',
              'Come and join him in Mauritius next year',
              'Send him money to pay for the clerk',
              'Write to the office about his wages'],
    answer: 'Refuse to sign any agreement of this kind',
    hint: `He says himself why he is writing. Find that sentence and read what comes after the colon.`,
    explanation: `<i>it is the reason I am writing to you: do not put your mark on any paper, however kindly it is explained.</i> The whole letter builds to that warning — and <b>however kindly it is explained</b> answers Text A's interpreter in advance.` }),

  makeMCQ({ id: 'g9eng-rcp-001-m5', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P1 + `<p>Ramdeo says he counted the sixteen steps <i>because I could think of nothing else to do</i>. What does this detail mainly achieve?</p>`,
    options: ['It shows how powerless he felt on arrival',
              'It shows how carefully he counted things',
              'It shows how slow the landing had been',
              'It shows how steep the steps must be'],
    answer: 'It shows how powerless he felt on arrival',
    hint: `Ask what the counting tells you about the man, not about the steps.`,
    explanation: `Counting steps is what a person does when nothing else is left to them to decide. Text A gives the same building as a place where things are done efficiently <i>to</i> people; the small useless act of counting is Ramdeo showing what that felt like from the bottom of the stairs.` }),

  makeText({ id: 'g9eng-rcp-001-o1', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P1 + `<p>How many immigrants does Text A record as landing during the year? Write the number in digits.</p>`,
    answer: '4106', alsoAccept: ['4,106', '4 106', 'four thousand one hundred and six'],
    hint: `The opening sentence of Text A gives the figure, but it is written out in words.`,
    explanation: `<i>four thousand one hundred and six immigrants landed at the depot</i> — that is <b>4106</b>. Reports of this kind wrote numbers in words so that a figure could not be altered afterwards.` }),

  makeText({ id: 'g9eng-rcp-001-o2', chapterId: CH, difficulty: 3, subsection: 'inference',
    question: _P1 + `<p>In ONE word, what happens to a man who is found without his ticket?</p>`,
    answer: 'arrested', alsoAccept: ['taken up', 'detained', 'arrest', 'caught', 'jailed'],
    hint: `Ramdeo gives the man a name first, then says what is done to a man with that name.`,
    explanation: `<i>a man without his ticket is a vagrant, and a vagrant is taken up.</i> <b>Taken up</b> was the ordinary phrase of the time for being <b>arrested</b>. It is why he is told never to lose the ticket.` }),

  makeText({ id: 'g9eng-rcp-001-o3', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P1 + `<p>Text B says that a man without his ticket is a <b>vagrant</b>. In ONE word, what is a vagrant?</p>`,
    answer: 'wanderer', alsoAccept: ['tramp', 'vagabond', 'homeless', 'beggar'],
    hint: `The word describes someone with no fixed place to be — which is what the ticket is meant to prove he has.`,
    explanation: `A <b>vagrant</b> is a wanderer: a person with no settled home or lawful business in a place. The ticket exists to prove a man belongs to an estate, so losing it turns him, on paper, into a wanderer.` }),

  makeText({ id: 'g9eng-rcp-001-o4', chapterId: CH, difficulty: 4, subsection: 'across_texts',
    question: _P1 + `<p>Text A says the agreement was read again <i>in the presence of an interpreter</i>, and treats that as settling the matter. In ONE word, what does Text B say Ramdeo still could not do?</p>`,
    answer: 'read', alsoAccept: ['read it', 'reading', 'check it'],
    hint: `Text B agrees that the reading took place, and praises it. The next sentence is only six words long.`,
    explanation: `<i>He read it well. I could not read it at all.</i> Hearing a document read by a man <b>paid by the office</b> is not the same as reading it, and that single word is where the two accounts part company.` }),

  makeText({ id: 'g9eng-rcp-001-o5', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P1 + `<p>In ONE word, what does Text A call what the eleven men said?</p>`,
    answer: 'complaints', alsoAccept: ['complaint', 'objections', 'objection'],
    hint: `Look at the sentence that introduces the men, before the men are described at all.`,
    explanation: `<i>a small number of <b>complaints</b> were received.</i> Calling it a complaint — rather than a dispute about the terms of a contract — already decides how serious the report expects the reader to think it is.` }),
);

// ══ PASSAGE 2 · museum information panel, with headings, a list, a table,
//    a caption and a pull-quote (this is the text_features block) ══════════
const _P2 = box(`
<b style="color:#1e40af">Read the panel, then answer the question.</b><br><br>
<b style="font-size:1.15em">THE SWAMP THAT KEPT ITS DEAD</b><br>
<i>Visitor information panel · Mare aux Songes, near Mahébourg</i><br><br>
<b>Why this marsh?</b><br>
Mare aux Songes is a low, wet basin a short walk from the lagoon. Nothing about it looks remarkable. It is flat, muddy underfoot and half hidden by sugar cane. Visitors walk past the gate every week without looking twice at it. Yet more dodo bones have been lifted out of this one field than out of everywhere else in the world put together, and the very dullness of the place is part of the reason it survived: nobody built on it, because nobody could.<br><br>
The reason is the mud. Bone left on dry ground is broken up within a few years by rain, sun and scavenging animals. Bone that sinks into waterlogged clay is sealed away from the air, and air is what rots it. The marsh did not kill the birds. It kept them.<br><br>
<b>What the mud kept</b><br>
The first bones came to light in 1865, when workmen cutting a railway line struck a layer of dark peat. A schoolmaster named George Clark had been searching the district for years, and the crates he sent to Europe ended a long argument about whether the dodo had been an invention of sailors. Digging began again in 2005, with the tools of modern science. The layer the diggers reached is about four thousand years old — long before any ship reached the island — and it holds a great deal more than dodos.<br><br>
<b>Digging the site</b><br>
1. The buried layer is found first by drilling narrow cores and reading what comes up on the drill.<br>
2. A pit is opened, and pumps run day and night to stop it filling with water.<br>
3. Everything lifted out is washed through fine sieves, because a seed or a beetle wing carries as much information as a leg bone.<br>
4. Each find is labelled with its exact depth before it leaves the pit.<br><br>
<table style="border-collapse:collapse;margin:4px 0;font-size:0.95em">
<tr><td style="border-bottom:1px solid #94a3b8;padding:3px 8px"><b>Group</b></td><td style="border-bottom:1px solid #94a3b8;padding:3px 8px"><b>Found</b></td><td style="border-bottom:1px solid #94a3b8;padding:3px 8px"><b>What it suggests</b></td></tr>
<tr><td style="padding:3px 8px">Dodo</td><td style="padding:3px 8px">bones of about 300 birds</td><td style="padding:3px 8px">the bird was common here</td></tr>
<tr><td style="padding:3px 8px">Giant tortoise</td><td style="padding:3px 8px">many thousands of bones</td><td style="padding:3px 8px">the commonest animal of all</td></tr>
<tr><td style="padding:3px 8px">Seeds and wood</td><td style="padding:3px 8px">tamarind, palm, screwpine</td><td style="padding:3px 8px">the forest that once stood here</td></tr>
</table>
<i>Table 1: counted at the close of the 2006 season. Every figure is an estimate, and each new season changes it.</i><br><br>
<b style="font-size:1.1em">They did not die in a hunt. They died at a water hole, in a drought, beside everything else that was thirsty.</b><br><br>
<b>What killed them</b><br>
Why should so many animals lie in one small field? The bones are not scattered, as they would be if the animals had been killed one at a time. They lie together, and they lie mixed with tortoises, bats, snails and fallen trees. The explanation most scientists now accept is a severe drought, some four thousand two hundred years ago, which shrank the island's standing water to a few muddy pools. Animals came to the water because there was nowhere else to go, and the weakest of them never left. The dodo's extinction, three centuries ago, was a human act. This particular graveyard was not, and visitors should not leave thinking otherwise.
`, '#0e7490');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-002-m1', chapterId: CH, difficulty: 3, subsection: 'text_features',
    question: _P2 + `<p>Why does the panel set out the digging method as a numbered list rather than as a paragraph?</p>`,
    options: ['Because the steps happen in a fixed order',
              'Because the steps are the hardest part',
              'Because a list makes the panel shorter',
              'Because the steps were done by students'],
    answer: 'Because the steps happen in a fixed order',
    hint: `Try swapping step 2 and step 3 and ask whether the method would still work.`,
    explanation: `You cannot pump a pit you have not opened, or sieve what you have not lifted out. Numbers carry the <b>sequence</b>, which a paragraph would only imply. The list is not shorter than a paragraph would be — it takes more lines, not fewer.` }),

  makeMCQ({ id: 'g9eng-rcp-002-m2', chapterId: CH, difficulty: 3, subsection: 'text_features',
    question: _P2 + `<p>What does the caption printed under Table 1 warn the reader about?</p>`,
    options: ['That the counts are estimates that change',
              'That the table leaves out several groups',
              'That the counts were made by volunteers',
              'That no digging has happened since 2006'],
    answer: 'That the counts are estimates that change',
    hint: `The caption gives a date and then adds a sentence about how much the figures can be trusted.`,
    explanation: `<i>Every figure is an estimate, and each new season changes it.</i> A caption is where a table admits its limits: without it, <b>about 300 birds</b> would read as a settled fact rather than as a count taken at one moment in 2006.` }),

  makeMCQ({ id: 'g9eng-rcp-002-m3', chapterId: CH, difficulty: 4, subsection: 'text_features',
    question: _P2 + `<p>One sentence is printed large and bold across the middle of the panel: <i>They did not die in a hunt…</i> Why has it been set out that way?</p>`,
    options: ['To make the main point easy to remember',
              'To give the name of the scientist quoted',
              'To warn visitors not to touch the bones',
              'To mark where the second section begins'],
    answer: 'To make the main point easy to remember',
    hint: `Most visitors read a panel standing up and in a hurry. What would they take away if they read only one line of it?`,
    explanation: `It is a pull-quote: the conclusion of the last section, lifted out and enlarged so that a visitor who reads nothing else still leaves with it. No name is attached to it, and it sits inside a section rather than at the start of one.` }),

  makeMCQ({ id: 'g9eng-rcp-002-m4', chapterId: CH, difficulty: 2, subsection: 'text_features',
    question: _P2 + `<p>Under which heading would you look to find out how old the fossil layer is?</p>`,
    options: ['What the mud kept', 'Why this marsh?', 'What killed them', 'Digging the site'],
    answer: 'What the mud kept',
    hint: `One heading covers what was found and when. Another covers the cause of the deaths.`,
    explanation: `The age — <i>about four thousand years old</i> — is given under <b>What the mud kept</b>, alongside the 1865 discovery and the 2005 dig. <i>What killed them</i> gives a different date, for the drought, but not the age of the layer itself.` }),

  makeMCQ({ id: 'g9eng-rcp-002-m5', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P2 + `<p>In the panel, <b>waterlogged</b> clay is clay that is</p>`,
    options: ['soaked with water', 'washed away by rain', 'dried hard by sun', 'mixed with sand'],
    answer: 'soaked with water',
    hint: `The panel explains what waterlogged clay does to bone, and why: it seals the bone away from the air.`,
    explanation: `<b>Waterlogged</b> means so full of water that no air is left in it. That is the whole argument of the section: air rots bone, water keeps it out, so the bone survives.` }),

  makeText({ id: 'g9eng-rcp-002-o1', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P2 + `<p>In which year were the first bones found at Mare aux Songes? Write the year in digits.</p>`,
    answer: '1865', alsoAccept: ['in 1865', 'eighteen sixty-five'],
    hint: `The second section opens with the discovery, and says what the workmen were building at the time.`,
    explanation: `<i>The first bones came to light in <b>1865</b>, when workmen cutting a railway line struck a layer of dark peat.</i> 2005 and 2006 are the modern dig, not the discovery.` }),

  makeText({ id: 'g9eng-rcp-002-o2', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P2 + `<p>Name the schoolmaster who searched the district and sent crates of bones to Europe.</p>`,
    answer: 'George Clark', alsoAccept: ['Clark', 'Mr Clark', 'George Clarke'],
    hint: `He is the only person named anywhere on the panel.`,
    explanation: `<i>A schoolmaster named <b>George Clark</b> had been searching the district for years</i>, and the crates he sent settled the argument about whether the dodo had ever existed.` }),

  makeText({ id: 'g9eng-rcp-002-o3', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P2 + `<p>The panel says: <i>The marsh did not kill the birds. It kept them.</i> In ONE word, what does <b>kept</b> mean here?</p>`,
    answer: 'preserved', alsoAccept: ['preserve', 'saved', 'protected', 'stored'],
    hint: `Think of what a fridge does to food, not what a farmer does to animals.`,
    explanation: `<b>Kept</b> here means <b>preserved</b>: the mud stopped the bones from decaying. The sentence turns on the double meaning of the word, which is also where the panel's title comes from.` }),

  makeText({ id: 'g9eng-rcp-002-o4', chapterId: CH, difficulty: 4, subsection: 'inference',
    question: _P2 + `<p>In ONE word, what natural event do most scientists think brought so many animals to this one small place?</p>`,
    answer: 'drought', alsoAccept: ['a drought', 'dry spell', 'drying'],
    hint: `The last section explains why the bones lie together rather than scattered. Look for the event that made water scarce.`,
    explanation: `<i>The explanation most scientists now accept is a severe <b>drought</b>, some four thousand two hundred years ago.</i> The animals came to the last water, not to a killing ground — which is exactly what the pull-quote insists on.` }),

  makeText({ id: 'g9eng-rcp-002-o5', chapterId: CH, difficulty: 4, subsection: 'authors_view',
    question: _P2 + `<p>Who is this panel written for: scientists, visitors, or workmen? Answer in ONE word.</p>`,
    answer: 'visitors', alsoAccept: ['tourists', 'visitor', 'the public', 'public'],
    hint: `The last sentence says out loud who is being sent away with a lesson, and the line under the title says where they are standing.`,
    explanation: `The panel calls itself <i>Visitor information</i> and ends <i>…and <b>visitors</b> should not leave thinking otherwise</i>. A paper written for scientists would give the evidence for the drought; this one gives the conclusion and the reason it matters.` }),
);

// ══ PASSAGE 3 · newspaper opinion column, with a quoted reply ════════════
const _P3 = box(`
<b style="color:#1e40af">Read the column, then answer the question.</b><br><br>
<b>WHOSE TAP RUNS DRY FIRST?</b><br>
<i>Opinion · The Island Weekly, 14 October</i><br><br>
For eleven days in September the taps in my village ran for four hours a day. Four hours a day to wash, to cook, to fill every bucket in the yard against the twenty hours that followed. Four hours a day, announced by lorry the evening before, and rearranged twice without notice. My neighbour, who is eighty-one, carried water up eleven steps in a paint tin.<br><br>
The reservoir at Mare aux Vacoas stood at thirty-one per cent. Rain had not come in June, or in July, and by September the argument about who gets the rest of the water had stopped being polite.<br><br>
That week I drove past a hotel on the south coast. The lawn was the deep, even green of a lawn that has never once been thirsty. A green lawn in September is a decision, not a plant. Somebody chose it, somebody paid for it, and somebody watered it while my neighbour was counting steps with a paint tin in her hand.<br><br>
Let me be careful here, because this is where columns of this kind usually go wrong. The industry employs about one worker in ten, and I do not pretend otherwise. Every tourist who lands pays for roads that my village would never have built alone. Nobody sensible wants the hotels closed, and a village with no work is not a village that has been rescued.<br><br>
But there is a difference between defending an industry and refusing to measure it. When I asked the Hotels Association how much water a guest uses in a day, the reply was courteous and it was long, and it contained no number at all.<br><br>
"A hotel is not a swimming pool with rooms attached," their spokesperson told me. "Most of what we use is what any large building uses — kitchens, laundry, bathrooms, cleaning. Our members have installed meters, recycled their grey water and cut consumption for eight years running. We are not the reason a village is rationed. Old pipes are the reason: more than half the water this country treats never reaches anybody's tap."<br><br>
She is right about the pipes. A country that loses half its treated water before delivery has a problem no hotel caused and no hotel can fix. I have written that sentence in this newspaper twice before.<br><br>
Yet notice what the answer does. It moves the subject from hotels to pipes, and it does so without ever telling me the one thing I asked for. Eight years of cuts, from what starting figure? Cut to what? A percentage with nothing underneath it is not a measurement; it is a mood.<br><br>
I am not asking anyone to choose between a job and a shower. I am asking for arithmetic. Publish the figures — litres per guest per night, by hotel, by month, next to the figure for a household in the same district. If the hotels are as careful as they say, the numbers will defend them far better than the pipes do. If they are not, we should all know that before the next dry June.<br><br>
Publish the figures. That is the whole of my demand, and it costs nothing but the courage to be counted.
`, '#b45309');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-003-m1', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P3 + `<p>What does the writer mainly want to happen?</p>`,
    options: ['Hotels should publish their water figures',
              'Hotels should be closed during a drought',
              'Villages should build their own reservoirs',
              'Tourists should be charged more for rooms'],
    answer: 'Hotels should publish their water figures',
    hint: `He states his demand twice, and the second time he calls it a demand.`,
    explanation: `<i>Publish the figures. That is the whole of my demand.</i> He says plainly that <b>nobody sensible wants the hotels closed</b>, so closure is the one thing he has ruled out.` }),

  makeMCQ({ id: 'g9eng-rcp-003-m2', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P3 + `<p>The writer says: <i>A green lawn in September is a decision, not a plant.</i> What does this sentence achieve?</p>`,
    options: ['It makes the lawn a choice somebody made',
              'It shows how difficult lawns are to grow',
              'It explains why grass needs so much water',
              'It suggests the hotel planted the wrong grass'],
    answer: 'It makes the lawn a choice somebody made',
    hint: `A plant is a thing. A decision has a person behind it. Which does the next sentence go on to describe?`,
    explanation: `By refusing to let the lawn be scenery, he makes it an act: <i>Somebody chose it, somebody paid for it, and somebody watered it.</i> The three repeated <b>somebody</b>s put a human being behind the grass and set them next to the neighbour with the paint tin.` }),

  makeMCQ({ id: 'g9eng-rcp-003-m3', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P3 + `<p>Which line best supports the claim that the writer is trying to be fair to the hotels?</p>`,
    options: ['The industry employs about one worker in ten',
              'The reservoir stood at thirty-one per cent',
              'A green lawn in September is a decision',
              'Publish the figures, by hotel and by month'],
    answer: 'The industry employs about one worker in ten',
    hint: `Fairness means saying something that weakens your own side. Which line does the hotels a favour?`,
    explanation: `He concedes the strongest point on the other side — the jobs — and adds <i>I do not pretend otherwise</i>. The reservoir figure is background, and the other two lines are his attack and his demand.` }),

  makeMCQ({ id: 'g9eng-rcp-003-m4', chapterId: CH, difficulty: 2, subsection: 'vocabulary',
    question: _P3 + `<p>The village was <b>rationed</b>. This means its water was</p>`,
    options: ['limited to a fixed amount', 'shared out to the poorest',
              'charged at a higher rate', 'cut off for the whole week'],
    answer: 'limited to a fixed amount',
    hint: `The first paragraph shows the rationing in practice before the word is used.`,
    explanation: `A <b>ration</b> is a fixed allowance: here, four hours of supply a day. The taps were not cut off altogether — the whole point of the paragraph is what a family must do in the four hours it has.` }),

  makeMCQ({ id: 'g9eng-rcp-003-m5', chapterId: CH, difficulty: 4, subsection: 'inference',
    question: _P3 + `<p>The spokesperson says a hotel is <i>not a swimming pool with rooms attached</i>. What is she trying to correct?</p>`,
    options: ['The idea that hotels use water only for luxury',
              'The idea that hotels employ very few people',
              'The idea that hotels pay less for their water',
              'The idea that hotels are built too near villages'],
    answer: 'The idea that hotels use water only for luxury',
    hint: `Read the sentence she puts immediately after it, listing what hotels actually use water for.`,
    explanation: `She follows the phrase with <i>kitchens, laundry, bathrooms, cleaning</i> — the ordinary uses of any large building. The image she is answering is the pool and the lawn, which is the picture the writer has just painted.` }),

  makeText({ id: 'g9eng-rcp-003-o1', chapterId: CH, difficulty: 2, subsection: 'evidence',
    question: _P3 + `<p>What figure does the writer give for the level of the reservoir at Mare aux Vacoas? Write it in digits.</p>`,
    answer: '31', alsoAccept: ['31%', 'thirty-one', '31 per cent'],
    hint: `It is in the short paragraph that comes after the description of the village taps.`,
    explanation: `<i>The reservoir at Mare aux Vacoas stood at <b>thirty-one</b> per cent.</i> It is the one hard number in the whole column that is not about the village — which is part of his point.` }),

  makeText({ id: 'g9eng-rcp-003-o2', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P3 + `<p>The column ends with a demand of three words. Write the FIRST word of that demand.</p>`,
    answer: 'publish', alsoAccept: ['publish the figures', 'publish!'],
    hint: `The same three words appear twice, once near the end of the argument and once as the last line.`,
    explanation: `<i><b>Publish</b> the figures.</i> Repeating it as the closing line makes it the sentence a reader carries away, and it is deliberately an instruction rather than a wish.` }),

  makeText({ id: 'g9eng-rcp-003-o3', chapterId: CH, difficulty: 4, subsection: 'authors_view',
    question: _P3 + `<p>Is the writer's attitude to the tourist industry hostile, uneasy, or admiring? Answer in ONE word.</p>`,
    answer: 'uneasy', alsoAccept: ['unhappy', 'uncomfortable', 'troubled'],
    hint: `He praises the jobs and the roads in one paragraph and asks for the figures in the next. Which of the three words allows both?`,
    explanation: `He is not <b>hostile</b> — he defends the industry's value and rejects closing it — and he is not <b>admiring</b>, since he thinks its answer was evasive. <b>Uneasy</b> is the position of a man who accepts the benefit and still wants it measured.` }),

  makeText({ id: 'g9eng-rcp-003-o4', chapterId: CH, difficulty: 3, subsection: 'language',
    question: _P3 + `<p>The writer begins three sentences in a row with <i>Four hours a day</i>. In ONE word, name the technique he is using.</p>`,
    answer: 'repetition', alsoAccept: ['repeating', 'repeat', 'anaphora'],
    hint: `The technique is named after what the writer does to the phrase, not after what it means.`,
    explanation: `Deliberate <b>repetition</b> of an opening phrase makes the reader feel the restriction rather than merely read it — four hours, and then four hours again, and then four hours again.` }),

  makeText({ id: 'g9eng-rcp-003-o5', chapterId: CH, difficulty: 4, subsection: 'inference',
    question: _P3 + `<p>The writer says the Association's reply was courteous and long. In ONE word, what does he say it contained none of?</p>`,
    answer: 'numbers', alsoAccept: ['number', 'figures', 'data', 'arithmetic'],
    hint: `The sentence ends with what was missing, and the whole column is built on that absence.`,
    explanation: `<i>the reply was courteous and it was long, and it contained no <b>number</b> at all.</i> He later makes the same charge of the eight years of cuts: <i>A percentage with nothing underneath it is not a measurement; it is a mood.</i>` }),
);

// ══ PASSAGE 4 · first-person recount / diary ══════════════════════════════
const _P4 = box(`
<b style="color:#1e40af">Read the passage, then answer the question.</b><br><br>
<b>Eleven Months</b><br>
<i>Marie-Ange Félicité, 19, writes about her first year away from Rodrigues.</i><br><br>
I still have the boarding pass from the plane that brought me. It is folded into four in my purse, soft at the creases now, and my mother would say I am being sentimental about a piece of card. She is right. I keep it anyway.<br><br>
The flight from Plaine Corail takes ninety minutes. I had never been on a plane. I had been told a hundred times how small Rodrigues would look from above, and it did look small, and none of the telling prepared me for it: a green thing on a great deal of blue, going away.<br><br>
I came for the work. That sentence is not a complaint. In Port Mathurin I had my certificate and eleven months of looking; here I had an interview on the Thursday and a contract on the Monday, in the accounts office of a firm in Ebène whose name my grandmother still cannot say. I send money home on the twentieth of every month. My brother is doing his School Certificate on it.<br><br>
What nobody warned me about was the noise. My room in Rose Hill is above a road, and the road never entirely stops. On my first night I lay awake at two in the morning listening to lorries and thought, with the clarity you only get at two in the morning, that my whole island fits inside the sound of one roundabout.<br><br>
The Creole is the same and it is not the same. Mine has a rhythm that makes people at work smile and ask me to say something again, kindly, the way you ask a child. For a month I spoke less than I had ever spoken in my life. Then one lunchtime a woman from Curepipe said, "Say it properly, you," about her own accent, and everybody laughed, including me, and after that I talked.<br><br>
I miss things in the wrong order. Not the beach, which I hardly went to. I miss octopus drying on a line in the sun like grey washing. I miss knowing every single person on a bus. I miss my grandmother's voice through a wall. That last one I did not expect, and it arrives at odd hours, and there is nothing to be done about it except telephone on Sundays.<br><br>
In August the firm sent me on a course, and in September they gave me the accounts of two small clients of my own. I do them well. I check them twice and I have not been wrong yet. When my supervisor said so in front of the others I looked at the desk, because in Rodrigues you do not stand up in your own praise, and then I wrote it in a message to my mother the moment the meeting ended.<br><br>
Eleven months. The same eleven months I spent looking for work at home, which is a coincidence I have thought about more than I should.<br><br>
I will go back. Not this year, and not to the same job, because there is not one. But my boarding pass is folded in my purse, and it is a return, and I have not thrown it away.
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-004-m1', chapterId: CH, difficulty: 3, subsection: 'inference',
    question: _P4 + `<p>Why does Marie-Ange keep the folded boarding pass?</p>`,
    options: ['It stands for her intention to return home',
              'It proves that she paid for the flight herself',
              'It is the only photograph she has of home',
              'It reminds her that the flight was frightening'],
    answer: 'It stands for her intention to return home',
    hint: `She explains the card twice: once at the start, and once in the last line, where she adds one detail about the ticket itself.`,
    explanation: `The last line gives it away: <i>it is a <b>return</b>, and I have not thrown it away.</i> A return ticket is a promise to go back, which is why she keeps a piece of card she admits is only sentimental.` }),

  makeMCQ({ id: 'g9eng-rcp-004-m2', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P4 + `<p>She says the card is <b>soft at the creases</b>. This tells you that the card has been</p>`,
    options: ['handled again and again', 'washed by accident',
              'carried in the rain', 'printed on thin paper'],
    answer: 'handled again and again',
    hint: `Think about what makes a folded piece of card go soft along the fold.`,
    explanation: `Card softens where it is folded and unfolded repeatedly. The detail says, without her having to admit it, how often she takes the pass out — which is what makes her mother's word <i>sentimental</i> land.` }),

  makeMCQ({ id: 'g9eng-rcp-004-m3', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P4 + `<p>She writes: <i>my whole island fits inside the sound of one roundabout.</i> What does this mainly convey?</p>`,
    options: ['How small her home feels from here',
              'How badly she was sleeping that week',
              'How dangerous the road below her is',
              'How much she dislikes living in town'],
    answer: 'How small her home feels from here',
    hint: `The line comes at two in the morning, straight after the plane paragraph. Compare it with what she saw from the window.`,
    explanation: `It measures a whole island against a single noise, and it answers <i>a green thing on a great deal of blue</i>. She is not describing traffic; she is describing the size her home has suddenly become.` }),

  makeMCQ({ id: 'g9eng-rcp-004-m4', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P4 + `<p>A reader says: <i>She is proud of her work but will not say so openly.</i> Which line best supports that?</p>`,
    options: ['I looked at the desk when my supervisor said so',
              'I send money home on the twentieth of the month',
              'In August the firm sent me on a training course',
              'I had an interview on the Thursday of that week'],
    answer: 'I looked at the desk when my supervisor said so',
    hint: `Look for the moment she is praised in front of other people, and what she does with her eyes.`,
    explanation: `She looks down in public — <i>in Rodrigues you do not stand up in your own praise</i> — and then messages her mother <i>the moment the meeting ended</i>. Pride and silence in the same paragraph. The other lines record facts with no feeling attached.` }),

  makeMCQ({ id: 'g9eng-rcp-004-m5', chapterId: CH, difficulty: 4, subsection: 'inference',
    question: _P4 + `<p>What does she suggest by calling the two periods of eleven months <i>a coincidence</i>?</p>`,
    options: ['That the same time can be spent differently',
              'That she regrets having left Rodrigues at all',
              'That her first year abroad went by quickly',
              'That she was unlucky to wait for so long'],
    answer: 'That the same time can be spent differently',
    hint: `Count what each set of eleven months produced. She says she has thought about it more than she should.`,
    explanation: `Eleven months of looking for work at home; eleven months of a contract, a course and two clients here. Calling it a coincidence is her way of pointing at the comparison without making the speech — and the admission that she has <b>thought about it more than she should</b> shows it is not really a coincidence to her at all.` }),

  makeText({ id: 'g9eng-rcp-004-o1', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P4 + `<p>Name the town in Rodrigues where Marie-Ange spent eleven months looking for work.</p>`,
    answer: 'Port Mathurin', alsoAccept: ['Mathurin', 'port mathurin'],
    hint: `It is named in the paragraph that begins <i>I came for the work.</i>`,
    explanation: `<i>In <b>Port Mathurin</b> I had my certificate and eleven months of looking.</i> Plaine Corail, mentioned earlier, is the airport she flew from, not the town she lived in.` }),

  makeText({ id: 'g9eng-rcp-004-o2', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P4 + `<p>On which day of each month does she send money home? Write the date in digits.</p>`,
    answer: '20', alsoAccept: ['20th', 'twentieth', 'the 20th'],
    hint: `The same paragraph tells you who the money is for.`,
    explanation: `<i>I send money home on the <b>twentieth</b> of every month.</i> The next sentence says what it pays for: her brother's School Certificate.` }),

  makeText({ id: 'g9eng-rcp-004-o3', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P4 + `<p>Her mother would say she is being <b>sentimental</b>. In ONE word, what does sentimental mean here?</p>`,
    answer: 'emotional', alsoAccept: ['soppy', 'nostalgic', 'sensitive', 'soft'],
    hint: `Her mother is describing a feeling about an object that has no use left in it.`,
    explanation: `<b>Sentimental</b> means governed by feeling rather than by use: keeping a spent ticket because of what it stands for. Marie-Ange agrees — <i>She is right</i> — and keeps it anyway, which is the point of the paragraph.` }),

  makeText({ id: 'g9eng-rcp-004-o4', chapterId: CH, difficulty: 3, subsection: 'inference',
    question: _P4 + `<p>In ONE word, how did Marie-Ange feel about her accent during her first month at work?</p>`,
    answer: 'embarrassed', alsoAccept: ['ashamed', 'shy', 'self-conscious', 'uncomfortable'],
    hint: `She does not name the feeling. She gives you what she did instead — count how much she spoke.`,
    explanation: `<i>For a month I spoke less than I had ever spoken in my life.</i> Being asked, kindly, to repeat yourself <i>the way you ask a child</i> silences her — and the silence ends only when a Mauritian woman laughs at her own accent first.` }),

  makeText({ id: 'g9eng-rcp-004-o5', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P4 + `<p>She compares drying octopus to <b>grey washing</b>. In ONE word, what kind of comparison is this — a simile or a metaphor?</p>`,
    answer: 'simile', alsoAccept: ['a simile', 'simile (like)'],
    hint: `Look at the small word that joins the two things she is comparing.`,
    explanation: `<i>octopus drying on a line in the sun <b>like</b> grey washing</i> — the word <b>like</b> makes it a simile. It also does the paragraph's work: she misses the ordinary domestic sight, not the postcard beach.` }),

);

// ══ PASSAGE 5 · interview, printed as questions and answers ══════════════
const _P5 = box(`
<b style="color:#1e40af">Read the interview, then answer the question.</b><br><br>
<b>"WE WERE PAID FOR CERTAINTY"</b><br>
<i>Devi Soobrayen has grown cane on 1.7 arpents at Rivière du Rempart for forty years. She spoke to our reporter for the school magazine's series on work.</i><br><br>
<b>Q: People say the sugar industry collapsed. Did it?</b><br>
No. Collapse is the wrong word, and I do not like it, because it makes it sound like an earthquake. Nothing fell down. What ended was an agreement. For thirty years Europe bought our sugar at a price fixed in advance, whatever the world market was doing. Then the arrangement was reformed, and between 2006 and 2009 that guaranteed price came down by about thirty-six per cent. Everything you can see from this road follows from that one figure.<br><br>
<b>Q: What did thirty-six per cent mean for a planter with 1.7 arpents?</b><br>
It meant arithmetic. Cutting is paid by the tonne, and the lorry is paid whether the load is worth carrying or not. Below a certain price my crop cost more to harvest than it earned. In my village, eleven small planters simply stopped. They did not sell the land, mind you — they abandoned it. You can still see which fields those are. Cane does not die; it goes wild.<br><br>
<b>Q: Why did the big estates survive when the small planters did not?</b><br>
Because they stopped selling only sugar. Look at what leaves a modern mill: refined sugar, special sugars for Europe that fetch four times the price of raw, molasses, rum, and electricity. The bagasse — the crushed fibre left after the juice is out — is burned to turn a generator. On a good day a mill of that kind is a power station that happens to make sugar. I have 1.7 arpents. I cannot build a power station.<br><br>
<b>Q: So what did you do?</b><br>
I joined the co-operative in 2011, with thirty-odd others. Together we are a supplier the mill has to take seriously, and we share one harvesting contractor instead of each hiring a lorry. That is the only reason I am still here. Alone I was a nuisance to everybody; in a group we are a delivery.<br><br>
<b>Q: Your son works in information technology in Ebène. Does that disappoint you?</b><br>
It would disappoint me if he did it because I made the land unlivable for him. He does it because he is good at it and it pays what this cannot. I have never once asked him to come back. People write about us as though every planter's dream is a son in the cane, and it is not true. My dream was that he would have a choice I did not have.<br><br>
<b>Q: What would you say to somebody who thinks cane is finished?</b><br>
I would say look at the fields, not at the headlines. There is still cane from Souillac to Grand Baie. What is finished is the certainty. We were paid for certainty, all those years, and we did not know that was what we were being paid for until it stopped. Now we are paid for what we actually grow, like everybody else in the world. It is harder. I am not going to pretend it is not harder. But nothing collapsed. It got difficult, and difficult is a thing you can work at.
`, '#15803d');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-005-m1', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P5 + `<p>By roughly how much did the guaranteed price fall between 2006 and 2009?</p>`,
    options: ['About thirty-six per cent', 'About sixteen per cent',
              'About sixty-three per cent', 'About thirteen per cent'],
    answer: 'About thirty-six per cent',
    hint: `She gives the figure in her first answer and then calls it <i>that one figure</i>.`,
    explanation: `<i>that guaranteed price came down by about <b>thirty-six per cent</b>.</i> She treats it as the cause of everything that follows: <i>Everything you can see from this road follows from that one figure.</i>` }),

  makeMCQ({ id: 'g9eng-rcp-005-m2', chapterId: CH, difficulty: 3, subsection: 'inference',
    question: _P5 + `<p>Why does Mrs Soobrayen object to the word <b>collapsed</b>?</p>`,
    options: ['It makes a decision sound like a disaster',
              'It suggests the mills were badly built',
              'It hides how much money planters lost',
              'It blames Europe for what happened here'],
    answer: 'It makes a decision sound like a disaster',
    hint: `She says what the word makes it sound like, and then says what actually ended.`,
    explanation: `<i>it makes it sound like an earthquake. Nothing fell down. What ended was an <b>agreement</b>.</i> An earthquake happens to you; an agreement is ended by people, and can therefore be argued about.` }),

  makeMCQ({ id: 'g9eng-rcp-005-m3', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P5 + `<p>She says the eleven planters <b>abandoned</b> their fields rather than selling them. Abandoned here means they</p>`,
    options: ['left the land and stopped working it',
              'rented the land to a larger estate',
              'burned the crop that was still standing',
              'sold the land to the sugar mill'],
    answer: 'left the land and stopped working it',
    hint: `She contrasts the word with selling, and then tells you what the fields look like now.`,
    explanation: `<i>They did not sell the land, mind you — they <b>abandoned</b> it… Cane does not die; it goes wild.</i> The land is still theirs. It is simply no longer farmed, which is why the fields are recognisable from the road.` }),

  makeMCQ({ id: 'g9eng-rcp-005-m4', chapterId: CH, difficulty: 4, subsection: 'authors_view',
    question: _P5 + `<p>What is Mrs Soobrayen's main point when she says a modern mill is <i>a power station that happens to make sugar</i>?</p>`,
    options: ['Large estates survived by selling more than sugar',
              'Electricity has become cheaper than sugar to make',
              'Small planters should burn their own bagasse',
              'The mills no longer need the small planters'],
    answer: 'Large estates survived by selling more than sugar',
    hint: `She is answering a question about why the big estates survived. Read the list of what leaves a modern mill.`,
    explanation: `Refined sugar, special sugars, molasses, rum and electricity: <i>they stopped selling only sugar</i>. The joke about the power station is there to show the scale that made it possible — and her next line, <i>I cannot build a power station</i>, is why it was not open to her.` }),

  makeMCQ({ id: 'g9eng-rcp-005-m5', chapterId: CH, difficulty: 3, subsection: 'text_features',
    question: _P5 + `<p>Why has the magazine printed this as questions and answers instead of rewriting it as an article?</p>`,
    options: ['So the reader hears her own words directly',
              'So the piece can be printed more quickly',
              'So the reporter can stay out of the argument',
              'So the reader can skip the difficult parts'],
    answer: 'So the reader hears her own words directly',
    hint: `Read her last answer aloud. Would it survive being turned into reported speech?`,
    explanation: `The interview form keeps her voice — the corrections, the pauses, <i>I am not going to pretend it is not harder</i>. A rewritten article would give you the same facts with the person taken out, and this piece is about a person.` }),

  makeText({ id: 'g9eng-rcp-005-o1', chapterId: CH, difficulty: 2, subsection: 'retrieval',
    question: _P5 + `<p>How many arpents of cane does Mrs Soobrayen grow? Write the number in digits.</p>`,
    answer: '1.7', alsoAccept: ['1.7 arpents', 'one point seven'],
    hint: `The figure is given in the introduction and repeated when she compares herself with a mill.`,
    explanation: `<b>1.7</b> arpents at Rivière du Rempart. She repeats it deliberately: <i>I have 1.7 arpents. I cannot build a power station.</i>` }),

  makeText({ id: 'g9eng-rcp-005-o2', chapterId: CH, difficulty: 3, subsection: 'vocabulary',
    question: _P5 + `<p>She calls the old European price a <b>guaranteed</b> price. In ONE word, what does guaranteed mean here?</p>`,
    answer: 'fixed', alsoAccept: ['promised', 'certain', 'assured', 'secure'],
    hint: `She explains the word herself in the first answer, before she uses it.`,
    explanation: `<i>Europe bought our sugar at a price <b>fixed</b> in advance, whatever the world market was doing.</i> That is exactly what a guarantee is: the price is settled beforehand and does not move.` }),

  makeText({ id: 'g9eng-rcp-005-o3', chapterId: CH, difficulty: 4, subsection: 'inference',
    question: _P5 + `<p>In ONE word, what does she say the co-operative turned the small planters into, in the eyes of the mill — a nuisance or a delivery?</p>`,
    answer: 'delivery', alsoAccept: ['a delivery', 'supplier', 'deliveries'],
    hint: `Her last sentence about the co-operative sets two words against each other. She was the first one; together they are the second.`,
    explanation: `<i>Alone I was a nuisance to everybody; in a group we are a <b>delivery</b>.</i> Nothing about her 1.7 arpents changed — only the size of the load arriving at the mill gate, and therefore how seriously the mill takes her.` }),

  makeText({ id: 'g9eng-rcp-005-o4', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P5 + `<p>In ONE word, what does Mrs Soobrayen say she wanted her son to have that she did not have?</p>`,
    answer: 'choice', alsoAccept: ['a choice', 'choices', 'options'],
    hint: `Her answer about her son ends with what her dream actually was.`,
    explanation: `<i>My dream was that he would have a <b>choice</b> I did not have.</i> She uses it to correct the story people tell about planters — <i>as though every planter's dream is a son in the cane, and it is not true.</i>` }),

  makeText({ id: 'g9eng-rcp-005-o5', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P5 + `<p>Copy the ONE word Mrs Soobrayen says the industry was really being paid for during the guaranteed years.</p>`,
    answer: 'certainty', alsoAccept: ['certainty.', 'the certainty'],
    hint: `It is the word in the headline at the top, and she repeats it twice in her final answer.`,
    explanation: `<i>We were paid for <b>certainty</b>, all those years, and we did not know that was what we were being paid for until it stopped.</i> It is also what she says is finished — not cane, but certainty.` }),
);

// ══ PASSAGE 6 · school-magazine article + a reply letter that disputes it
//    (the second two-text block: they disagree about the same survey) ═════
const _P6 = box(`
<b style="color:#1e40af">Read BOTH texts, then answer the question.</b><br><br>
<b>TEXT A — from the school magazine, June issue</b><br><br>
<b>LOCK THEM UP FOR SIX HOURS</b> · <i>by Yashvin, Grade 9</i><br><br>
Last term the school ran a survey on phones. Ninety-one per cent of us said we check our phones during lessons. Ninety-one. That is not a minority with a problem; that is all of us, and it is time we admitted that we are addicted and asked for help.<br><br>
I am not arguing that phones are evil. I am arguing about six hours. Put every phone in a locked box at 08:30 and give them back at 14:30. That is all.<br><br>
Consider what actually happens in a lesson. A teacher is not competing with a bored pupil; a teacher is competing with a machine designed by paid engineers to be more interesting than she is. That is not a fair contest and no amount of willpower fixes it. I have watched pupils I respect lose an entire Chemistry double because a group chat went off.<br><br>
A school in Beau Bassin tried a locked box for one term last year. Their teachers said the first fortnight was miserable and the third week was the quietest they could remember. I do not offer that as proof. I offer it as a reason to try.<br><br>
The usual reply is safety: my mother must be able to reach me. But she could reach me for the whole of primary school by ringing the office, and the office is still there. Six hours. We survived them for six years without a phone in a pocket, and we learned more.<br><br>
<b>TEXT B — a letter to the magazine, July issue</b><br><br>
Sir,<br><br>
Yashvin's article was well argued and I still think it is wrong, and I want to start with his figure, because it is doing more work than it can carry.<br><br>
Ninety-one per cent is not ninety-one per cent of us. Two hundred and forty pupils were given that survey and eighty-eight answered it. Of those eighty-eight, eighty said yes. So eighty out of two hundred and forty pupils admitted checking their phones — thirty-three per cent, not ninety-one — and the pupils who never look at their phones had the least reason to fill in a form about phones at all. Yashvin's own evidence is a survey of the people most likely to say yes.<br><br>
On the box: I have no objection in principle, and I would sign up for it tomorrow if it came with the rest of the arrangement. Our timetable changes are announced in a WhatsApp group run by the school. Our Physics revision notes are shared in another. Last Tuesday the bus rota was altered at 13:50, forty minutes before the box in Yashvin's plan is opened. Take the phones away and you must also take away the school's habit of using them, and nobody has offered to do that. His term in Beau Bassin proves nothing about a school that runs its own timetable through a group chat.<br><br>
And I would ask him to drop the word <b>addicted</b>. It is a strong word and it belongs to a real condition. What he has described is a bad habit in a building that is designed around the very devices it complains about.<br><br>
Aaliyah, Grade 9
`, '#be123c');

STATIC_QUESTIONS.push(

  makeMCQ({ id: 'g9eng-rcp-006-m1', chapterId: CH, difficulty: 4, subsection: 'across_texts',
    question: _P6 + `<p>Both writers use the same survey. Why do they reach different percentages?</p>`,
    options: ['They divide by a different number of pupils',
              'They are describing two different surveys',
              'They asked the pupils two different questions',
              'They counted the teachers as well as pupils'],
    answer: 'They divide by a different number of pupils',
    hint: `Find the two numbers Aaliyah gives: how many pupils were asked, and how many answered.`,
    explanation: `Eighty pupils said yes. Yashvin divides eighty by the <b>88 who answered</b> and gets 91%; Aaliyah divides the same eighty by the <b>240 who were asked</b> and gets 33%. One survey, one set of answers, two denominators.` }),

  makeMCQ({ id: 'g9eng-rcp-006-m2', chapterId: CH, difficulty: 4, subsection: 'across_texts',
    question: _P6 + `<p>Which statement would BOTH writers agree with?</p>`,
    options: ['Phones are a real problem in lessons',
              'Ninety-one per cent of pupils check phones',
              'The school should lock phones away now',
              'The word addicted describes the problem'],
    answer: 'Phones are a real problem in lessons',
    hint: `Aaliyah disputes the figure and the word. Look for what she concedes before she starts objecting.`,
    explanation: `Aaliyah calls the article <i>well argued</i> and says <i>I have no objection in principle</i> to the box — she disputes the size of the problem, not its existence. She rejects the 91% figure, the word <b>addicted</b>, and the plan as it stands.` }),

  makeMCQ({ id: 'g9eng-rcp-006-m3', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P6 + `<p>Which detail does Aaliyah use to show that the school itself relies on phones?</p>`,
    options: ['The bus rota was changed at ten to two',
              'The survey was answered by 88 pupils',
              'The box would be opened at half past two',
              'The office could take calls from parents'],
    answer: 'The bus rota was changed at ten to two',
    hint: `She gives one dated example with a time on it, and points out how that time compares with Yashvin's plan.`,
    explanation: `<i>Last Tuesday the bus rota was altered at 13:50, forty minutes before the box in Yashvin's plan is opened.</i> The school sent the message to a device its own rule would have locked away — which is her argument in one example.` }),

  makeMCQ({ id: 'g9eng-rcp-006-m4', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P6 + `<p>Yashvin writes that a teacher is <i>competing with a machine designed by paid engineers to be more interesting than she is</i>. What does this achieve?</p>`,
    options: ['It moves the blame from pupils to the design',
              'It suggests the teachers are not interesting',
              'It shows how expensive modern phones have become',
              'It proves that engineers want pupils to fail'],
    answer: 'It moves the blame from pupils to the design',
    hint: `Read the sentence that follows it, about willpower.`,
    explanation: `<i>That is not a fair contest and no amount of willpower fixes it.</i> By naming <b>paid engineers</b> he makes distraction something built on purpose, so a pupil who gives in is outmatched rather than lazy — which is what lets him ask for a rule instead of a telling-off.` }),

  makeMCQ({ id: 'g9eng-rcp-006-m5', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P6 + `<p>How does Aaliyah answer Yashvin's proposal for the locked box?</p>`,
    options: ['She accepts it only if the school changes too',
              'She rejects it because parents need to call',
              'She accepts it exactly as he has described it',
              'She rejects it because the box would be lost'],
    answer: 'She accepts it only if the school changes too',
    hint: `She says what she would do <i>tomorrow</i>, and then attaches a condition to it.`,
    explanation: `<i>I would sign up for it tomorrow if it came with the rest of the arrangement</i> — the WhatsApp timetable, the revision notes, the bus rota. <i>Take the phones away and you must also take away the school's habit of using them.</i> It is a conditional yes, not a no.` }),

  makeText({ id: 'g9eng-rcp-006-o1', chapterId: CH, difficulty: 3, subsection: 'across_texts',
    question: _P6 + `<p>Aaliyah quotes ONE word from Yashvin's article and asks him to drop it. Write that word.</p>`,
    answer: 'addicted', alsoAccept: ['addiction', 'addict'],
    hint: `It is printed in bold in her last paragraph, and she says it belongs to a real condition.`,
    explanation: `<i>I would ask him to drop the word <b>addicted</b>… It is a strong word and it belongs to a real condition.</i> Yashvin uses it in his first paragraph — <i>we are addicted and asked for help</i> — and the whole force of his opening depends on it.` }),

  makeText({ id: 'g9eng-rcp-006-o2', chapterId: CH, difficulty: 3, subsection: 'evidence',
    question: _P6 + `<p>How many pupils were given the survey? Write the number in digits.</p>`,
    answer: '240', alsoAccept: ['two hundred and forty', 'two hundred forty'],
    hint: `Only one of the two texts gives this figure, and it is written out in words.`,
    explanation: `<i>Two hundred and forty pupils were given that survey and eighty-eight answered it.</i> Yashvin never mentions <b>240</b>, which is why his percentage can be honest and still be misleading.` }),

  makeText({ id: 'g9eng-rcp-006-o3', chapterId: CH, difficulty: 3, subsection: 'authors_view',
    question: _P6 + `<p>For how many hours does Yashvin want phones locked away? Write a number.</p>`,
    answer: '6', alsoAccept: ['six', '6 hours', 'six hours'],
    hint: `He repeats the number three times, and once as a sentence on its own.`,
    explanation: `<i>I am arguing about <b>six</b> hours… Put every phone in a locked box at 08:30 and give them back at 14:30.</i> Repeating the number keeps his proposal small: he wants the reader arguing about six hours, not about phones in general.` }),

  makeText({ id: 'g9eng-rcp-006-o4', chapterId: CH, difficulty: 4, subsection: 'language',
    question: _P6 + `<p>Aaliyah says Yashvin's figure is <i>doing more work than it can carry</i>. In ONE word, what is she saying the figure has been made to do — prove or explain?</p>`,
    answer: 'prove', alsoAccept: ['proves', 'to prove', 'proving'],
    hint: `Her next paragraph shows what the 91% was being used for and why it cannot bear it.`,
    explanation: `The image treats the figure as something carrying a load. She then shows the load: it was being used to <b>prove</b> that <i>all of us</i> are addicted, when it can only describe the eighty-eight pupils who chose to answer.` }),

  makeText({ id: 'g9eng-rcp-006-o5', chapterId: CH, difficulty: 3, subsection: 'inference',
    question: _P6 + `<p>In ONE word, what does Aaliyah say is the school's own habit that Yashvin's plan ignores?</p>`,
    answer: 'phones', alsoAccept: ['using phones', 'whatsapp', 'messaging'],
    hint: `She lists three school messages that arrive on the very devices he wants locked up.`,
    explanation: `<i>Take the phones away and you must also take away the school's habit of using them.</i> The timetable group, the Physics notes and the bus rota are all sent by <b>phone</b>, so the rule would break the school's own arrangements first.` }),
);
})();
