'use strict';
// Grade 5 English - Chapter: Reading Comprehension
// IDs format: g5eng-comp-NNN
//
// ⚠ IDS ARE PRESERVED, CONTENT IS REPLACED. netlify/import-questions.js upserts
//   and never deletes, so a question dropped from source would linger in the
//   Supabase `questions` table forever. All 19 ids (001-019) keep their number
//   and their subsection; only the stimulus, options and difficulty changed.
//   Unlike exam_depth.js and the coverage_*.js files, ids here are LITERAL, so
//   editing this file cannot renumber anything.
//
// ⚠ WHAT CHANGED AND WHY. The 19 questions hung off just two texts of about 180
//   and 248 words, against 413-447 in the MES Grade 5 English papers 2023-2025;
//   eighteen were flagged by scripts/floor-check.js, and the nineteenth escaped
//   only because its stimulus was 251 words - one word over the rule's floor.
//   Both texts are now full length, and difficulty starts at L2.
//
// ⚠ RETRIEVAL IS 14 OF THE 19 AND IT IS THE HARD PART. "Find it in the text" is
//   trivial when the text is short and the answer is the only number in it. At
//   full length it can be made demanding without ceasing to be retrieval: the
//   distractors here are all real details FROM the passage, several answers have
//   to be assembled from two separate places, and two require arithmetic on
//   figures that appear paragraphs apart. A retrieval item should reward careful
//   reading, not keyword-spotting.
//
// TEXT 1 is informational and TEXT 2 is narrative, on purpose: the paper's own
// Question 1 is always narrative, but this chapter is skill-tagged rather than
// text-type-tagged, and an informational text gives retrieval and vocabulary
// far more to bite on.

function _g5compBox(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ TEXT 1 · informational ════════════════════════════════════════════════
const _G5C_BAKERY = _g5compBox(`
<b style="color:#92400e">Read the passage carefully, then answer the question.</b><br><br>
<b>The Bakery on Royal Road</b><br><br>
The bakery on Royal Road opens at half past four in the morning, which is two
hours before the first bus.<br><br>
Mr Sooriah has run it for thirty-one years. His father ran it before him, in the
same room, using the same oven, which is built of brick and takes four hours to
reach the right heat. Mr Sooriah lights it at half past midnight. He says the
oven is the only thing in the building older than he is.<br><br>
The dough is mixed the night before and left to rise in wooden troughs under damp
cloths. There are six troughs, and each one holds enough for about two hundred
loaves. By three in the morning the dough has doubled, and it is turned out, cut
and shaped by hand. Nobody weighs it. Mr Sooriah's daughter, Anjali, can cut a
two-hundred-gram piece of dough to within five grams, every time, and she learned
this by doing it wrong for a year.<br><br>
The first batch is baked at four. The bread is out by twenty past, the shutters go
up at half past, and by then there are usually eleven or twelve people waiting
outside. Most of them are the same people. Mr Sooriah knows what each one wants
and often has it wrapped before they reach the counter.<br><br>
Between five and seven the shop sells roughly six hundred loaves. After seven it
is quieter, and this is when the bakery makes the sweet things: napolitaines,
gateaux coco, and the almond biscuits that appear only on Fridays, because
almonds are expensive.<br><br>
Nothing is left at the end of the day. Whatever has not sold by four in the
afternoon goes to the primary school across the road, where it becomes the next
morning's breakfast for children who arrive without one. Mr Sooriah has done this
since 1996 and does not like being asked about it.<br><br>
The bakery closes at five. The floor is swept, the troughs are washed, the dough
for the next day is mixed, and the oven is allowed to go out. It takes eleven
hours to cool completely.<br><br>
Anjali will take over one day. She has said so since she was nine. Her father
tells people that she is better at the counter than he is, which is true, and
that she is not yet better at the oven, which is also true, and which she does
not accept.
`, '#d97706');

// ══ TEXT 2 · narrative ════════════════════════════════════════════════════
const _G5C_BICYCLE = _g5compBox(`
<b style="color:#065f46">Read the passage carefully, then answer the question.</b><br><br>
<b>The Borrowed Bicycle</b><br><br>
The bicycle belonged to Mrs Ramgoolam next door, and it had not been ridden for
eleven years.<br><br>
It stood in her back yard under a sheet of plastic. When Devika finally asked
about it, in the last week of the August holidays, Mrs Ramgoolam said yes before
the question was finished.<br><br>
The tyres were flat and the chain had rusted into one stiff loop. Devika's uncle
put air in the tyres and soaked the chain in oil overnight, and in the morning it
turned, though it complained.<br><br>
She was eleven, and she could not ride.<br><br>
Her cousins had all learned at five or six, on the flat road behind the church,
with somebody running alongside holding the saddle. Devika had not, for a reason
nobody in the family could now remember, and by eleven it had become the kind of
thing that is easier not to mention.<br><br>
She decided to learn where nobody would see.<br><br>
The lane behind the sugar factory is four hundred metres long and slopes very
slightly downhill. She went there every morning at six, for nine days.<br><br>
On the first three mornings she did not get on the bicycle at all. She walked
beside it, then sat on it with both feet on the ground, then pushed off and put
her feet down again immediately, over and over, until the sun was properly up and
it was time to go home for breakfast.<br><br>
On the fourth morning she travelled about six metres and fell into the
grass.<br><br>
On the sixth morning she reached the end of the lane without stopping, turned
round, and could not do it again.<br><br>
On the ninth morning she rode the lane four times, and then out onto the road,
and then all the way to the church and back, which is two kilometres.<br><br>
Mrs Ramgoolam was standing at her gate when Devika came round the corner. She did
not wave and she did not call out. She watched her go past, and was still there
when Devika came back the other way, and then she went inside.<br><br>
Devika understood two things that morning that she had not understood
before.<br><br>
The first was that the bicycle had been offered so quickly because Mrs Ramgoolam
had been waiting years for somebody to ask.<br><br>
The second was that she had chosen the lane behind the factory so that nobody
would see her fall, and that she would have to find somewhere else to practise
now, because she had run out of things to be afraid of.
`, '#059669');

STATIC_QUESTIONS.push(

  // ══ TEXT 1 · 10 questions ═══════════════════════════════════════════════
  makeMCQ({ id:'g5eng-comp-001', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_G5C_BAKERY + '<p>How long does the brick oven take to reach the right heat?</p>',
    options:['Four hours', 'Two hours', 'Eleven hours', 'Thirty-one hours'],
    answer:'Four hours',
    hint:'The oven is described in the second paragraph.',
    explanation:'The oven <i>takes four hours to reach the right heat</i>. Two hours is how long before the first bus the shop opens, and eleven hours is how long the oven takes to cool again.' }),

  makeMCQ({ id:'g5eng-comp-002', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BAKERY + '<p>Why must Mr Sooriah light the oven at half past midnight?</p>',
    options:['It needs four hours to be ready for the four o\'clock batch',
             'He begins mixing the dough for the next day at that time',
             'The bread must be out of the oven by twenty past four',
             'He has to be finished before the first customers arrive'],
    answer:'It needs four hours to be ready for the four o\'clock batch',
    hint:'Two facts have to be put together - when the first batch is baked, and how long the oven takes.',
    explanation:'The first batch is baked at four, and the oven needs four hours. Half past midnight is <b>exactly four hours earlier</b>, so the two facts explain each other.' }),

  makeMCQ({ id:'g5eng-comp-003', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_G5C_BAKERY + '<p>How many wooden troughs does the bakery use for the rising dough?</p>',
    options:['Six', 'Eleven', 'Twelve', 'Two'],
    answer:'Six',
    hint:'Careful - several other numbers appear in the same paragraph.',
    explanation:'There are <b>six troughs</b>. Eleven or twelve is the number of people waiting outside when the shutters go up, and two hundred is what one trough holds.' }),

  makeMCQ({ id:'g5eng-comp-004', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:4,
    question:_G5C_BAKERY + '<p>About how many loaves can be made from the dough in all the troughs together?</p>',
    options:['About 1,200', 'About 600', 'About 200', 'About 800'],
    answer:'About 1,200',
    hint:'The passage gives the number of troughs and what one trough holds. You must do the rest.',
    explanation:'Six troughs, each holding enough for about two hundred loaves: 6 × 200 = <b>about 1,200</b>. The six hundred is a different figure - that is what the shop sells between five and seven.' }),

  makeMCQ({ id:'g5eng-comp-005', chapterId:'eng-comprehension', subsection:'vocabulary', difficulty:3,
    question:_G5C_BAKERY + '<p>"By three in the morning the dough has doubled." This means the dough has</p>',
    options:['grown to twice its original size', 'been divided into two equal halves',
             'been mixed together a second time', 'become twice as heavy as before'],
    answer:'grown to twice its original size',
    hint:'It has been left to rise under damp cloths. What does rising do?',
    explanation:'To <b>double</b> is to become twice as large. Note that it does not become heavier - nothing has been added; the dough has simply filled with air while rising.' }),

  makeMCQ({ id:'g5eng-comp-006', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BAKERY + '<p>How accurately can Anjali cut a piece of dough by hand?</p>',
    options:['To within five grams of two hundred', 'To within two hundred grams exactly',
             'To within five grams of five hundred', 'To within one gram of two hundred'],
    answer:'To within five grams of two hundred',
    hint:'The passage names both the target weight and how close she gets to it.',
    explanation:'She can cut <i>a two-hundred-gram piece of dough to within five grams</i>, and the passage adds that she learned it by getting it wrong for a year - nobody weighs anything.' }),

  makeMCQ({ id:'g5eng-comp-007', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_G5C_BAKERY + '<p>What happens to the bread that has not been sold by four in the afternoon?</p>',
    options:['It goes to the primary school across the road', 'It is sold cheaply before the shop closes',
             'It is kept and sold again the next morning', 'It is given to the people who are waiting'],
    answer:'It goes to the primary school across the road',
    hint:'The passage says nothing is left at the end of the day. Where does it go?',
    explanation:'It goes to the <b>primary school across the road</b>, where it becomes breakfast for children who arrive without one - something Mr Sooriah has done since 1996.' }),

  makeMCQ({ id:'g5eng-comp-008', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BAKERY + '<p>Why are the almond biscuits made only on Fridays?</p>',
    options:['Almonds cost a great deal', 'Fridays are the shop\'s busiest day',
             'There is no time on other days', 'They keep for only one day'],
    answer:'Almonds cost a great deal',
    hint:'The reason is given in the same sentence, after the word "because".',
    explanation:'They appear only on Fridays <i>because almonds are expensive</i>. The sweet things are made after seven, when the shop is quieter, so time is not the reason.' }),

  makeMCQ({ id:'g5eng-comp-009', chapterId:'eng-comprehension', subsection:'vocabulary', difficulty:3,
    question:_G5C_BAKERY + '<p>"The first batch is baked at four." A <b>batch</b> is</p>',
    options:['a quantity baked together at one time', 'the shelf where the bread is cooled',
             'the earliest customer of the morning', 'a type of loaf sold in the shop'],
    answer:'a quantity baked together at one time',
    hint:'The word "first" tells you that more will follow.',
    explanation:'A <b>batch</b> is an amount made or baked together in one go. Calling it the <i>first</i> batch tells us the oven is filled and emptied several times.' }),

  makeMCQ({ id:'g5eng-comp-010', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:4,
    question:_G5C_BAKERY + '<p>The oven is allowed to go out when the bakery closes at five. Roughly what time will it be completely cold?</p>',
    options:['Around four in the morning', 'Around midnight the same night',
             'Around noon the following day', 'Around nine in the evening'],
    answer:'Around four in the morning',
    hint:'The passage gives the closing time and the cooling time. Add them.',
    explanation:'Five in the afternoon plus eleven hours is <b>about four in the morning</b>. That is roughly when the next day\'s first batch goes in - the oven barely gets cold before it is needed again.' }),

  // ══ TEXT 2 · 9 questions ════════════════════════════════════════════════
  makeMCQ({ id:'g5eng-comp-011', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_G5C_BICYCLE + '<p>How long had the bicycle stood unused?</p>',
    options:['Eleven years', 'Nine years', 'Six years', 'Four years'],
    answer:'Eleven years',
    hint:'The first sentence gives it. Other numbers in the passage are distances and days.',
    explanation:'It <i>had not been ridden for eleven years</i>. Nine is the number of mornings Devika practised, and eleven is also her age - the passage repeats the number deliberately.' }),

  makeMCQ({ id:'g5eng-comp-012', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:2,
    question:_G5C_BICYCLE + '<p>Where did Devika choose to practise?</p>',
    options:['The lane behind the sugar factory', 'The flat road behind the church',
             'The back yard of her neighbour', 'The road between the two villages'],
    answer:'The lane behind the sugar factory',
    hint:'The road behind the church appears too - but who used that one?',
    explanation:'She practised in <b>the lane behind the sugar factory</b>. The flat road behind the church is where her cousins learned years earlier, and where she finally rides on the ninth morning.' }),

  makeMCQ({ id:'g5eng-comp-013', chapterId:'eng-comprehension', subsection:'vocabulary', difficulty:3,
    question:_G5C_BICYCLE + '<p>"In the morning it turned, though it complained." What does this tell us about the chain?</p>',
    options:['It worked, but stiffly and noisily', 'It was still completely stuck fast',
             'It had been replaced with a new one', 'It broke as soon as it was used'],
    answer:'It worked, but stiffly and noisily',
    hint:'A chain cannot really complain. What is the writer describing?',
    explanation:'The chain is given a human action to describe a sound and a stiffness: it <b>worked, but grudgingly</b>. If it were still stuck it would not have turned at all.' }),

  makeMCQ({ id:'g5eng-comp-014', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BICYCLE + '<p>What did Devika do on the first three mornings?</p>',
    options:['She practised without ever riding the bicycle', 'She rode a few metres and then fell over',
             'She reached the end of the lane and turned', 'She waited for her uncle to fix the chain'],
    answer:'She practised without ever riding the bicycle',
    hint:'The passage is explicit that something did not happen on those mornings.',
    explanation:'She <i>did not get on the bicycle at all</i> - walking beside it, sitting with both feet down, pushing off and putting her feet straight back. Falling into the grass came on the fourth morning.' }),

  makeMCQ({ id:'g5eng-comp-015', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BICYCLE + '<p>On which morning did Devika first reach the end of the lane without stopping?</p>',
    options:['The sixth', 'The fourth', 'The ninth', 'The third'],
    answer:'The sixth',
    hint:'Four separate mornings are described. Match the event to the right one.',
    explanation:'On the <b>sixth</b> morning she reached the end without stopping - and then could not repeat it. The fourth was six metres and a fall; the ninth was the long ride.' }),

  makeMCQ({ id:'g5eng-comp-016', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:3,
    question:_G5C_BICYCLE + '<p>What did Mrs Ramgoolam do when Devika rode past her gate?</p>',
    options:['She watched without waving or calling out', 'She waved and called out to congratulate her',
             'She walked out into the road to meet her', 'She went indoors before Devika reached her'],
    answer:'She watched without waving or calling out',
    hint:'The passage says twice what she did not do.',
    explanation:'She <i>did not wave and she did not call out</i>. She watched Devika pass, waited for her to come back, and only then went inside - the silence is the point.' }),

  makeMCQ({ id:'g5eng-comp-017', chapterId:'eng-comprehension', subsection:'vocabulary', difficulty:3,
    question:_G5C_BICYCLE + '<p>Not being able to ride "had become the kind of thing that is easier not to mention". This means Devika</p>',
    options:['had grown embarrassed about it over the years', 'had genuinely forgotten that she could not ride',
             'had been told by her family not to discuss it', 'had never once thought about learning before'],
    answer:'had grown embarrassed about it over the years',
    hint:'Why would something become harder to talk about the longer it goes on?',
    explanation:'Her cousins learned at five or six; she is eleven. The longer it lasted the more <b>awkward</b> it became, until silence was simpler than explaining - which is why she practises where nobody can see.' }),

  makeMCQ({ id:'g5eng-comp-018', chapterId:'eng-comprehension', subsection:'inference', difficulty:4,
    question:_G5C_BICYCLE + '<p>Why did Mrs Ramgoolam say yes "before the question was finished"?</p>',
    options:['She had hoped for years that someone would ask to use it',
             'She had been trying to give the old bicycle away',
             'She did not want to hear the whole of the question',
             'She was worried that Devika would change her mind'],
    answer:'She had hoped for years that someone would ask to use it',
    hint:'Devika works this out herself at the very end of the passage.',
    explanation:'Devika realises it later: the bicycle <i>had been offered so quickly because Mrs Ramgoolam had been waiting years for somebody to ask</i>. She wanted it <b>ridden</b>, not removed.' }),

  makeMCQ({ id:'g5eng-comp-019', chapterId:'eng-comprehension', subsection:'retrieval', difficulty:4,
    question:_G5C_BICYCLE + '<p>Roughly how far did Devika ride altogether on the ninth morning?</p>',
    options:['About 3.6 kilometres', 'About 2 kilometres',
             'About 1.6 kilometres', 'About 400 metres'],
    answer:'About 3.6 kilometres',
    hint:'The lane is 400 metres. She rode it four times, and then did something else as well.',
    explanation:'Four times a 400-metre lane is 1,600 metres, and the ride to the church and back is two kilometres: <b>about 3.6 km in total</b>. Each of the wrong options is one part of the journey on its own.' })

);
