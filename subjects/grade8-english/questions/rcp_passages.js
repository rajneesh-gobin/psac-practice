'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  grade8-english — reading comprehension: 6 original passages, 10 questions
//  each (5 makeMCQ + 5 makeText per block).
//  IDs: g8eng-rcp-001-m1 … g8eng-rcp-006-o5
//
//  WHY THIS FILE EXISTS
//    g8eng-reading held no passage at all — its longest reading stem was a
//    52-word snippet with one question hanging off it. NCE Grade 8 is assessed
//    on sustained reading: purpose/audience/tone across text types, and the
//    gap between what a text says and what it means.
//
//  TEXT TYPES — six, deliberately different, chosen so the two declared
//    subsections are actually answerable:
//      1 letter of complaint      · clear writer, clear reader
//      2 advertisement            · a persuasive text with small print
//      3 newspaper editorial      · argument with a visible slant
//      4 diary                    · a narrator who will not say she is afraid
//      5 interview transcript     · a speaker who dodges the question asked
//      6 school notice + letters  · one text answered by its own readers
//
//  All six are ORIGINAL and set in Mauritius. Nothing is adapted from any
//  published source. Every name, price and figure is invented.
//
//  ⚠ The passage box sets BOTH background and color. The app has a dark theme;
//    a box with only a background renders white-on-white.
//  ⚠ The passage is repeated on all ten questions of a block on purpose — the
//    child must never have to scroll back to a question they have left.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g8eng-reading';

function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · letter of complaint · ~485 words ══════════════════════════
const _P1 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
14 Rue des Manguiers<br>
Camp Levieux, Rose Hill<br>
9 February<br><br>
The Chief Executive<br>
Municipal Council of Beau Bassin&ndash;Rose Hill<br><br>
Dear Sir,<br><br>
<b>RE: FLOODING IN RUE DES MANGUIERS &mdash; THIRD REPORT</b><br><br>
I am writing on behalf of the eleven households of Rue des Manguiers. This is
the third letter we have sent about the same drain, and I have kept copies of
the other two.<br><br>
Our street slopes down towards the roundabout. At the bottom there is a single
drain, covered by a grating that has been broken since March. Whenever the rain
falls for more than twenty minutes, the water cannot get away. It stands across
the road at knee height and reaches the doorsteps of the four houses nearest the
corner.<br><br>
On 2 February the rain lasted less than an hour. Mrs Appadoo, who is
seventy-eight, could not leave her yard until half past six that evening. The
bus stopped at the top of the street and turned back. Nine children from our
street missed school the following morning, not because of any weather warning
but because the water had not drained by seven o'clock. My neighbour's wall now
carries a dark line along it, at the height of my knee, which was not there last
year.<br><br>
I understand that the Council has many roads to look after and that its budget
is decided elsewhere. I am not asking for the street to be rebuilt. I am asking
for the grating to be replaced, and for the drain beneath it to be cleared of
the leaves, plastic bottles and gravel that any of us can see through the
bars.<br><br>
When I telephoned the Works Department on 4 February, I was told that Rue des
Manguiers is "on the list". I was told the same thing in April, and again in
October. Nobody has been able to tell me what the list is, how long it is, or
where our street sits on it. If the work is genuinely planned, publishing that
date would cost the Council nothing and would stop eleven families from writing
letters.<br><br>
I should add that the residents have not simply waited. Twice we have cleared
the mouth of the drain ourselves, with a rake and a bucket. Both times it worked
for perhaps three weeks. The blockage is below the road, where we cannot reach,
and we have no wish to lift a heavy grating over an open shaft with young
children in the street.<br><br>
I would be grateful for a written reply giving a date, even a date some months
away. If it is easier, I invite an officer to visit on any Saturday morning;
several of us will be at home and can show him the marks on the walls.<br><br>
I am sending a copy of this letter to our Municipal Councillor and to the editor
of the local weekly.<br><br>
Yours faithfully,<br><br>
<b>Devianand Ramjeet</b><br>
Resident, Rue des Manguiers
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'purpose_audience',
    question:_P1 + '<p>What is the writer&rsquo;s main <b>purpose</b> in sending this letter?</p>',
    options:['To obtain a date for a repair',
             'To praise the Council for its work',
             'To warn residents about the rain',
             'To apply for a job at the Council'],
    answer:'To obtain a date for a repair',
    hint:'Read the paragraph beginning "I would be grateful" — it states what he wants.',
    explanation:'He asks for "a written reply giving a date, even a date some months away". He is not praising, not warning neighbours and not seeking work; the whole letter builds towards that one request.' }),

  makeMCQ({ id:'g8eng-rcp-001-m2', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P1 + '<p>Why does the writer end by naming the Councillor and the editor?</p>',
    options:['To put quiet pressure on the Council',
             'To thank the newspaper for its help',
             'To warn his neighbours to write too',
             'To explain why the drain is blocked'],
    answer:'To put quiet pressure on the Council',
    hint:'Ask what changes for the reader once other people are watching.',
    explanation:'"I am sending a copy of this letter to our Municipal Councillor and to the editor" tells the Council that a refusal will not stay private. He never thanks the paper, addresses neighbours, or explains the blockage there.' }),

  makeMCQ({ id:'g8eng-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P1 + '<p>Which phrase best describes the <b>tone</b> of the letter?</p>',
    options:['Firm but polite throughout',
             'Angry and openly rude',
             'Uncertain and pleading',
             'Light-hearted and joking'],
    answer:'Firm but polite throughout',
    hint:'Look at what he concedes ("I understand that the Council…") beside what he refuses to drop.',
    explanation:'He grants that the Council is busy and that he is not asking for a rebuild, yet repeats the demand and copies it to others. That combination — courteous wording, immovable request — is firm politeness, not anger, pleading or humour.' }),

  makeMCQ({ id:'g8eng-rcp-001-m4', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P1 + '<p>What does the dark line on the neighbour&rsquo;s wall <b>suggest</b>?</p>',
    options:['The flooding has damaged the houses',
             'The houses were built too cheaply',
             'The neighbour has repainted the wall',
             'The road was resurfaced last year'],
    answer:'The flooding has damaged the houses',
    hint:'He gives the height of the line and says when it appeared. Put those two facts together.',
    explanation:'The line stands "at the height of my knee" — exactly the depth he says the water reaches — and "was not there last year". The water has reached the buildings and left a mark, which is damage he never has to state.' }),

  makeMCQ({ id:'g8eng-rcp-001-m5', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P1 + '<p>What is the writer <b>implying</b> about the answer "on the list"?</p>',
    options:['It is a reply that promises nothing',
             'It is a printed Council document',
             'It is the name of a repair team',
             'It is a rule about drain repairs'],
    answer:'It is a reply that promises nothing',
    hint:'Count how many times he was given that answer, and what he says nobody could tell him.',
    explanation:'He was told it in February, April and October, and "nobody has been able to tell me what the list is, how long it is, or where our street sits on it". A phrase repeated for a year with no content behind it is a way of saying nothing.' }),

  makeText({ id:'g8eng-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P1 + '<p>How many households does the writer speak for? Answer with a number.</p>',
    answer:'eleven', alsoAccept:['11','eleven households','11 households'],
    hint:'The first sentence of the letter says whom he writes on behalf of.',
    explanation:'"I am writing on behalf of the eleven households of Rue des Manguiers." He repeats the figure later — "would stop eleven families from writing letters".' }),

  makeText({ id:'g8eng-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P1 + '<p>Name the month in which the grating was first broken.</p>',
    answer:'March', alsoAccept:['in March','since March'],
    hint:'The paragraph describing the drain gives the month.',
    explanation:'The drain is "covered by a grating that has been broken since March". February, April and October appear elsewhere, but they are dates of rain and telephone calls.' }),

  makeText({ id:'g8eng-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P1 + '<p>In two words, what does the writer ask the Council to give him in its reply?</p>',
    answer:'a date', alsoAccept:['date','a repair date','a written date'],
    hint:'He says he will accept one even if it is months away.',
    explanation:'"I would be grateful for a written reply giving a date, even a date some months away." A date is the smallest thing that would end the correspondence, which is why he asks for it and nothing more.' }),

  makeText({ id:'g8eng-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P1 + '<p>How long did the residents&rsquo; own clearing of the drain keep it working?</p>',
    answer:'three weeks', alsoAccept:['3 weeks','about three weeks','perhaps three weeks'],
    hint:'He mentions a rake and a bucket, then says how long the effect lasted.',
    explanation:'"Both times it worked for perhaps three weeks." The detail matters: it shows the residents have tried, and that the real blockage is below the road where they cannot reach.' }),

  makeText({ id:'g8eng-rcp-001-o5', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P1 + '<p>Apart from the Council, name <b>one</b> reader who will receive a copy of this letter.</p>',
    answer:'the editor', alsoAccept:['editor','the Municipal Councillor','Municipal Councillor','our Councillor','the councillor'],
    hint:'The short paragraph just before "Yours faithfully" names two of them.',
    explanation:'"I am sending a copy of this letter to our Municipal Councillor and to the editor of the local weekly." Either name is right; both are readers chosen because they can make the Council answer.' })

);

// ══ PASSAGE 2 · advertisement · ~485 words ════════════════════════════════
// A persuasive text whose main copy and small print address two different
// readers — the teenager and the adult who must sign for the contract.
const _P2 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>STOP SHARING. START STREAMING.</b><br><br>
<b>ZENITH MOBILE presents the KOZE 15 plan &mdash; Rs 199 a month</b><br><br>
You know the feeling. Three minutes left in the match, the data runs out, and
you are back at the kitchen door asking your mother for her hotspot. Again.<br><br>
The Koze 15 plan was built for students, by a team who were students themselves
not so long ago. Fifteen gigabytes. One flat price. No surprises.<br><br>
<b>WHAT YOU GET</b><br>
&bull; 15 GB of data every single month<br>
&bull; Unlimited messages to any Zenith number<br>
&bull; Free music streaming on three apps between 6 p.m. and midnight<br>
&bull; A free pair of Zenith earphones if you sign up before 31 March<br><br>
<i>"I used to run out by the 12th. Now I don't even think about it."</i><br>
&mdash; Yashna, 15, Curepipe<br><br>
<b>WHY EVERYONE AT SCHOOL IS SWITCHING</b><br><br>
Ask around your class. Somebody has already moved. Somebody is already
streaming the whole bus ride home to Rose Hill while you are counting
megabytes at the back. The Koze 15 plan is the plan your friends are on, and
being on the same network means every message you send them costs you nothing
at all.<br><br>
Rs 199 is less than most of us spend on snacks in a week. Think about that for
a moment. One week of samosas, or a whole month of never asking anybody for
anything.<br><br>
<b>COMPARE IT YOURSELF</b><br><br>
Add up what you spend on top-ups now. Fifty rupees here, a hundred there, another
fifty on the Friday before a long weekend, and none of it ever quite lasting to
the end of the month. That is the old way of paying: a little at a time, and
always at the worst moment. One payment on one date is simply easier to plan,
and easier to explain at home.<br><br>
<b>SIGN UP IN FOUR MINUTES</b><br><br>
Walk into any Zenith shop with your ID card. If you are under eighteen, bring a
parent or guardian. That is all. No forms to post, no waiting, no deposit on the
day, and your existing number comes with you.<br><br>
<b>ZENITH. THE NETWORK THAT GETS IT.</b><br><br>
<i>Terms and conditions. The Koze 15 plan requires a twenty-four month contract.
Early cancellation is charged at Rs 250 for each remaining month. Speeds are
reduced to 512 kbps once 15 GB has been used in a billing month; reduced speed
is not restored by further payment. "Unlimited messages" applies to Zenith
numbers only; messages to other networks are charged at the standard rate of
Rs 1.50 each. Free streaming excludes video of any kind. The earphones offer is
limited to the first 2,000 subscribers, is subject to availability and cannot be
exchanged for cash. A subscriber under eighteen must be signed for by a parent
or legal guardian, who becomes responsible for the full amount of the contract
for its whole term. Prices exclude VAT. Zenith Mobile may vary these terms on
thirty days' written notice.</i>
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'purpose_audience',
    question:_P2 + '<p>Who is the main text of this advert <b>aimed at</b>?</p>',
    options:['Secondary school pupils',
             'Retired shop owners',
             'Visiting tourist groups',
             'Primary school teachers'],
    answer:'Secondary school pupils',
    hint:'Look at who is quoted, where the bus is going, and who is told to bring a guardian.',
    explanation:'The plan is "built for students", the testimonial is from a fifteen-year-old, the reader is imagined on the school bus, and the sign-up rule assumes they may be under eighteen. Nothing addresses tourists, teachers or retired shoppers.' }),

  makeMCQ({ id:'g8eng-rcp-002-m2', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P2 + '<p>Why does the advert quote "Yashna, 15, Curepipe" rather than a manager?</p>',
    options:['She resembles the reader closely',
             'She works for the phone company',
             'She invented the streaming apps',
             'She lives nearest the main shop'],
    answer:'She resembles the reader closely',
    hint:'Ask why her age and her town are printed at all.',
    explanation:'Her age and town are given so the reader recognises somebody like themselves. A recommendation from a person like you is harder to dismiss than one from the company that wants your money; the advert never claims she works there.' }),

  makeMCQ({ id:'g8eng-rcp-002-m3', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P2 + '<p>What is the effect of comparing Rs 199 with a week of snacks?</p>',
    options:['It makes the price feel small',
             'It shows snacks are too dear',
             'It proves the plan is cheapest',
             'It warns against eating badly'],
    answer:'It makes the price feel small',
    hint:'The comparison changes nothing about the amount. What does it change?',
    explanation:'Rs 199 is the same money either way; setting it beside something already spent without thinking makes it feel like no new cost. It is not a claim about snacks, and no rival plan is priced anywhere in the text.' }),

  makeMCQ({ id:'g8eng-rcp-002-m4', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P2 + '<p>Which fact does the small print reveal that the headline hides?</p>',
    options:['The reader is tied in for two years',
             'The plan is sold in only one shop',
             'The data runs out after four months',
             'The earphones are made in Curepipe'],
    answer:'The reader is tied in for two years',
    hint:'Compare "No surprises" with the first sentence of the terms.',
    explanation:'The main copy promises "No surprises", while the terms require "a twenty-four month contract" with Rs 250 charged for each remaining month if you leave. The other options are not stated anywhere in the advert.' }),

  makeMCQ({ id:'g8eng-rcp-002-m5', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P2 + '<p>The advert speaks to two readers. Who is the small print really for?</p>',
    options:['The adult who signs the contract',
             'The pupil who wants more data',
             'The friend already on the network',
             'The shop assistant at the counter'],
    answer:'The adult who signs the contract',
    hint:'Read the sentence about a subscriber under eighteen, and ask whom it binds.',
    explanation:'The terms end by making "a parent or legal guardian… responsible for the full amount of the contract for its whole term". The excitement is written for the teenager; the obligations are written for the adult who must sign.' }),

  makeText({ id:'g8eng-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P2 + '<p>How many gigabytes of data does the plan give each month? Answer with a number.</p>',
    answer:'15', alsoAccept:['fifteen','15 GB','15GB'],
    hint:'It appears in the plan&rsquo;s own name.',
    explanation:'"Fifteen gigabytes" is the first item under WHAT YOU GET, and the figure is built into the name Koze 15.' }),

  makeText({ id:'g8eng-rcp-002-o2', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P2 + '<p>How many months does the contract last? Answer with a number.</p>',
    answer:'24', alsoAccept:['twenty-four','24 months','two years'],
    hint:'It is in the first sentence of the terms and conditions, not in the offer.',
    explanation:'"The Koze 15 plan requires a twenty-four month contract." The main copy never mentions a contract at all.' }),

  makeText({ id:'g8eng-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P2 + '<p>In one word, what happens to the speed once the 15 GB has been used?</p>',
    answer:'reduced', alsoAccept:['slowed','lowered','it is reduced'],
    hint:'The terms give an exact figure in kbps. What word comes just before it?',
    explanation:'"Speeds are reduced to 512 kbps once 15 GB has been used in a billing month; reduced speed is not restored by further payment." The data does not stop — it is throttled.' }),

  makeText({ id:'g8eng-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P2 + '<p>In one word, which kind of media is excluded from the free streaming?</p>',
    answer:'video', alsoAccept:['videos','video streaming','any video'],
    hint:'The offer says "music". The terms say what that leaves out.',
    explanation:'"Free streaming excludes video of any kind." The bullet point above had already narrowed it to music, but only the small print says so plainly.' }),

  makeText({ id:'g8eng-rcp-002-o5', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P2 + '<p>In two words, what does the "everyone at school is switching" section make the reader afraid of being?</p>',
    answer:'left out', alsoAccept:['left behind','the odd one','excluded'],
    hint:'Picture the reader the advert describes at the back of the bus.',
    explanation:'"Somebody has already moved… while you are counting megabytes at the back." The section says nothing about the plan itself; it works by making the reader feel they are the one being left out.' })

);

// ══ PASSAGE 3 · newspaper editorial · ~513 words ══════════════════════════
const _P3 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>EDITORIAL &mdash; Thursday</b><br>
<b>The bag is not the problem. We are.</b><br><br>
Ten years ago this newspaper welcomed the ban on the plastic carrier bag. We
were right to. Anyone who has walked the Mare Chicose road, or pulled a bag out
of a filao branch at Belle Mare, knows what those bags did to this island. The
ban worked. Bags vanished from the checkout, and within a year they had begun to
vanish from the hedges as well.<br><br>
And then we all congratulated ourselves and stopped.<br><br>
Look at what is in the bin now. The bag has gone; the bottle has multiplied. A
single family buying six one-and-a-half-litre bottles of water a week puts more
than three hundred bottles a year into the system. Add the straws, the cups from
the snack van, the film wrapped around a cucumber that already had a skin, the
sachet inside the box inside the shrink-wrap, and the carrier bag begins to look
like the smallest item on the list.<br><br>
We are told that this is a matter of recycling, and that new plants will be
built. Perhaps they will. But recycling is what a country does with the waste it
has already decided to create. It is the last line of defence, not the first,
and treating it as the answer allows every one of us to go on buying exactly as
we did before, provided we drop the bottle in the correct bin afterwards. That
is not a change of habit. It is a change of aim.<br><br>
Nor is this only a question for households. A shopper cannot buy a cucumber
unwrapped if the shop sells none unwrapped. A pupil cannot refuse a plastic
spoon that arrives sealed inside a lunch pack. The choice we are constantly told
to make has, in a great many cases, already been made further up the chain, by
importers and by supermarkets whose shelves we merely walk past. It is
convenient for those companies that the conversation stays fixed on the
individual and his bin.<br><br>
There are councils in this country doing serious work. Several have put drinking
fountains into secondary schools; one has begun weighing what leaves each ward
and publishing the figures. Publishing is the important half. What is measured
tends to be argued about, and what is argued about tends, in the end, to
change.<br><br>
We do not ask for another ban this week. We ask for three things: that the
figures for imported single-use plastic be published every quarter; that every
state secondary school be fitted with drinking water by the end of next year;
and that any shop above a certain size be required to sell at least some fresh
produce loose.<br><br>
None of that is dramatic. Nobody will hold a rally about a quarterly figure. But
the bag ban did not come from a rally either. It came from ten years of ordinary
people repeating the same unglamorous sentence in public until it stopped
sounding strange.<br><br>
The bag is gone. Let us not spend another decade admiring the space where it
used to be.
`, '#0f766e');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'purpose_audience',
    question:_P3 + '<p>What is the main <b>purpose</b> of this editorial?</p>',
    options:['To argue for three named changes',
             'To report a decision already taken',
             'To describe a walk along the coast',
             'To explain how recycling plants work'],
    answer:'To argue for three named changes',
    hint:'One paragraph begins "We ask for three things".',
    explanation:'The piece builds to a numbered set of demands: quarterly figures, water in secondary schools, loose produce in large shops. It reports nothing new and explains no process; the coastal detail is one line of evidence, not the subject.' }),

  makeMCQ({ id:'g8eng-rcp-003-m2', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P3 + '<p>Why does the writer begin with the carrier-bag ban of ten years ago?</p>',
    options:['To show that change is possible',
             'To admit the newspaper was wrong',
             'To prove bottles are now harmless',
             'To praise the shops that obeyed it'],
    answer:'To show that change is possible',
    hint:'Look at how the ban is described, and where it is mentioned again at the end.',
    explanation:'"The ban worked" opens the piece and returns at the close — "the bag ban did not come from a rally either". A success the reader remembers makes the new demands sound achievable rather than idealistic.' }),

  makeMCQ({ id:'g8eng-rcp-003-m3', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P3 + '<p>What is <b>implied</b> by "It is convenient for those companies"?</p>',
    options:['They benefit from the blame shifting',
             'They have offered to pay the costs',
             'They are unaware of the packaging',
             'They have asked for a stricter law'],
    answer:'They benefit from the blame shifting',
    hint:'Ask who is left responsible while the conversation stays on the individual bin.',
    explanation:'The word "convenient" carries the accusation without making it: while shoppers argue about their own bins, the importers and supermarkets who decide what is wrapped are never discussed. The writer never claims they are ignorant or willing.' }),

  makeMCQ({ id:'g8eng-rcp-003-m4', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P3 + '<p>What is the effect of the short line "And then we all congratulated ourselves and stopped"?</p>',
    options:['It blames the reader as well',
             'It softens the earlier praise',
             'It changes the subject entirely',
             'It repeats the opening sentence'],
    answer:'It blames the reader as well',
    hint:'Notice which pronoun the writer chooses, and how long the sentence is.',
    explanation:'"We" places the writer inside the failure rather than above it, and the sentence stands alone so the reader cannot skim past it. It sharpens the praise into criticism instead of softening it.' }),

  makeMCQ({ id:'g8eng-rcp-003-m5', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P3 + '<p>Why does the writer say "We do not ask for another ban this week"?</p>',
    options:['To make the demands seem modest',
             'To show a ban would not be legal',
             'To announce a ban for next month',
             'To agree with the supermarket owners'],
    answer:'To make the demands seem modest',
    hint:'What would a hostile reader have expected a piece like this to demand?',
    explanation:'By refusing the biggest weapon first, the writer makes publishing figures and fitting taps look like the reasonable middle. "None of that is dramatic" confirms the strategy in the next line.' }),

  makeText({ id:'g8eng-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P3 + '<p>How many bottles a year does the writer say one family adds? Answer with a number.</p>',
    answer:'300', alsoAccept:['three hundred','over 300','more than 300'],
    hint:'Six bottles a week are mentioned. The yearly figure is given straight after.',
    explanation:'A family buying six bottles a week "puts more than three hundred bottles a year into the system". The weekly figure is there so the reader can check the arithmetic.' }),

  makeText({ id:'g8eng-rcp-003-o2', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P3 + '<p>In one word, which pronoun does the writer use to include himself in the blame?</p>',
    answer:'we', alsoAccept:['us','ourselves','we/us'],
    hint:'Read the one-sentence paragraph after the description of the ban.',
    explanation:'"And then <b>we</b> all congratulated ourselves and stopped." Choosing "we" rather than "you" makes the criticism shared, which is why the reader accepts it.' }),

  makeText({ id:'g8eng-rcp-003-o3', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P3 + '<p>How many things does the editorial ask for? Answer with a number.</p>',
    answer:'three', alsoAccept:['3','three things'],
    hint:'One sentence lists them, separated by semicolons.',
    explanation:'"We ask for three things": quarterly figures for imported plastic, drinking water in every state secondary school, and loose fresh produce in larger shops.' }),

  makeText({ id:'g8eng-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P3 + '<p>In one word, what does the writer call recycling &mdash; the last line of what?</p>',
    answer:'defence', alsoAccept:['defense','the last defence','a defence'],
    hint:'The metaphor is military, and it comes just after "Perhaps they will".',
    explanation:'"It is the last line of defence, not the first." The image says recycling is what you fall back on once everything earlier has failed, which is why treating it as the answer changes nothing.' }),

  makeText({ id:'g8eng-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P3 + '<p>In one word, what does the writer say is "the important half" of a council&rsquo;s work?</p>',
    answer:'publishing', alsoAccept:['publication','publishing figures','measuring'],
    hint:'One council weighs its waste and then does something else with the result.',
    explanation:'"Publishing is the important half. What is measured tends to be argued about, and what is argued about tends, in the end, to change." Weighing alone changes nothing until the figure is public.' })

);

// ══ PASSAGE 4 · diary · ~505 words ════════════════════════════════════════
const _P4 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>From the diary of Anaya, Form III, Flacq</b><br><br>
<b>MONDAY</b><br>
Papa came home at two in the afternoon, which he never does. The estate had sent
everyone back. He put the radio on the kitchen table and left it there, and
nobody has moved it since. Class II. Mama began making bread at nine at night,
four loaves, which is more than we eat in a week.<br><br>
<b>TUESDAY</b><br>
Class III at eleven o'clock. We taped the big window with brown tape in a cross,
the way we always do, and this year I did the taping because I am the tallest
now. Papa carried the two water drums up from the shed. Mama counted the candles
twice, and then a third time, and said nothing at all about the count. I asked
whether we should bring the chickens inside and she said we would see.<br><br>
The wind is not the sound people think. It is not a whistle. It is a long push
against the wall of the house, then a pause, and you find yourself waiting for
the next one. I am not afraid of it. I am writing this to have something to do
with my hands.<br><br>
<b>WEDNESDAY</b><br>
No electricity since half past four this morning. The fridge stopped making its
noise and the silence woke me before the wind did. Kevin cried at about six and
I told him it was only a branch on the roof. It was not a branch on the
roof.<br><br>
We ate bread and butter and Mama said that it was a picnic. Kevin believed her.
I am fourteen and I have stopped being told things directly, which I suppose is
a kind of promotion.<br><br>
Papa went out at nine with the neighbour to look at the road. He was gone an
hour and fifty minutes. I know this because I watched the clock the whole time.
When he came back his trousers were wet to the thigh and he said the road was
fine.<br><br>
<b>THURSDAY</b><br>
The wind dropped in the night. We opened the shutters at seven and the light
came in like something poured.<br><br>
The mango tree by the gate is down. It has fallen across the fence and not
across the house, and Mama looked at it for a long time and then said, "Not the
house." The chickens are all there. Two of the water drums were not needed at
all.<br><br>
Papa went back to the estate at ten. He did not say when he would be paid for
the days the estate was shut, and I did not ask, because Mama looked at me when
I opened my mouth.<br><br>
<b>FRIDAY</b><br>
School is closed until Monday. Half of Flacq is out in the road with brooms.
Mrs Li Ying gave us a bucket of litchis because her freezer is off and she
cannot keep them. So the whole street is eating litchis at eight in the morning,
which is the strangest happy thing.<br><br>
Kevin has told four people about the branch on the roof.
`, '#b45309');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-004-m1', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P4 + '<p>Anaya writes "I am not afraid of it." Which detail suggests otherwise?</p>',
    options:['She watches the clock while he is out',
             'She tapes the big window in a cross',
             'She carries the drums up from the shed',
             'She opens the shutters early on Thursday'],
    answer:'She watches the clock while he is out',
    hint:'Find the sentence that explains how she knows the exact number of minutes.',
    explanation:'"He was gone an hour and fifty minutes. I know this because I watched the clock the whole time." Only fear counts minutes that precisely. The taping is routine, and she never carries the drums.' }),

  makeMCQ({ id:'g8eng-rcp-004-m2', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P4 + '<p>What does "It was not a branch on the roof" tell the reader?</p>',
    options:['She lied to comfort her brother',
             'She could not hear the wind well',
             'The roof had already been mended',
             'The neighbour had moved a branch'],
    answer:'She lied to comfort her brother',
    hint:'Read the sentence immediately before it, and ask who she was speaking to.',
    explanation:'She tells Kevin it is "only a branch on the roof", then corrects the record for herself alone. The diary is where she can be honest about the comfort she offered him.' }),

  makeMCQ({ id:'g8eng-rcp-004-m3', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P4 + '<p>Why did Mama look at Anaya when she opened her mouth on Thursday?</p>',
    options:['To stop her asking about money',
             'To send her outside to the road',
             'To remind her about the chickens',
             'To ask her to fetch more bread'],
    answer:'To stop her asking about money',
    hint:'What had Papa just failed to mention when he left for the estate?',
    explanation:'Papa "did not say when he would be paid for the days the estate was shut". The look is a warning not to raise it in front of him — the family worry that the diary records without ever naming.' }),

  makeMCQ({ id:'g8eng-rcp-004-m4', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P4 + '<p>Papa says the road is fine, yet his trousers are wet to the thigh. What does this show?</p>',
    options:['He is shielding the family from worry',
             'He has forgotten where he walked',
             'He fell into the drain by accident',
             'He was caught in the rain outside'],
    answer:'He is shielding the family from worry',
    hint:'Compare what he reports with the evidence he brings home on his clothes.',
    explanation:'Water to the thigh is a flooded road, not a fine one. The gap between what he says and what the reader can see is the whole point; it matches Mama calling bread and butter a picnic.' }),

  makeMCQ({ id:'g8eng-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P4 + '<p>Who is this text written for, and how can you tell?</p>',
    options:['Herself, as she explains nothing',
             'Her teacher, as it is very neat',
             'A newspaper, as it is all dated',
             'Her brother, as he is named often'],
    answer:'Herself, as she explains nothing',
    hint:'Ask whether a stranger would know who Kevin is, or what Class III means.',
    explanation:'Names, cyclone classes and the estate are used without a word of introduction, because the writer already knows them. Dates appear in every diary, and neatness is never mentioned.' }),

  makeText({ id:'g8eng-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P4 + '<p>How many loaves does Mama make on Monday night? Answer with a number.</p>',
    answer:'four', alsoAccept:['4','four loaves'],
    hint:'The Monday entry gives the number and then compares it with a normal week.',
    explanation:'"Mama began making bread at nine at night, four loaves, which is more than we eat in a week." The comparison shows she is stocking up, not baking as usual.' }),

  makeText({ id:'g8eng-rcp-004-o2', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P4 + '<p>On which day did the electricity fail?</p>',
    answer:'Wednesday', alsoAccept:['on Wednesday','Wednesday morning'],
    hint:'One entry begins with a time rather than an event.',
    explanation:'"No electricity since half past four this morning" opens the Wednesday entry, and the stopped fridge is what wakes her.' }),

  makeText({ id:'g8eng-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P4 + '<p>In one word, what does Mama count three times on Tuesday?</p>',
    answer:'candles', alsoAccept:['the candles','candle'],
    hint:'It is something you only need when the power has gone.',
    explanation:'"Mama counted the candles twice, and then a third time, and said nothing at all about the count." Counting three times and saying nothing is anxiety kept off the page in words.' }),

  makeText({ id:'g8eng-rcp-004-o4', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P4 + '<p>In one word, what is Papa worried about but never mentions?</p>',
    answer:'pay', alsoAccept:['money','wages','being paid'],
    hint:'The Thursday entry says what he did <i>not</i> say before leaving.',
    explanation:'"He did not say when he would be paid for the days the estate was shut." The estate closed on Monday, so the lost days are already counted; the silence is what tells the reader it matters.' }),

  makeText({ id:'g8eng-rcp-004-o5', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P4 + '<p>In one word, what does Anaya jokingly call no longer being told things directly?</p>',
    answer:'promotion', alsoAccept:['a promotion','a kind of promotion'],
    hint:'The Wednesday entry, just after the meal Mama calls a picnic.',
    explanation:'"I am fourteen and I have stopped being told things directly, which I suppose is a kind of promotion." The dry joke shows she knows exactly what is being hidden from her.' })

);

// ══ PASSAGE 5 · interview transcript · ~479 words ═════════════════════════
// The shortest of the six: an interview is mostly dialogue, and padding the
// answers would blunt the dodges the questions test. Still inside the band.
const _P5 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>"The lagoon keeps its own accounts"</b><br>
<i>Our reporter speaks to Jean-Claude Perrine, 61, who has fished out of
Mah&eacute;bourg since he was fourteen.</i><br><br>
<b>Q: How long have you been going out?</b><br>
Forty-seven years. My father took me the first time in a pirogue with no engine.
We rowed to the pass and back, I was sick over the side, and he said nothing at
all about it, which was his way of telling me I would be coming again on
Saturday. He was right. I have missed perhaps thirty mornings since, and most of
those were cyclones.<br><br>
<b>Q: People say the catch is smaller than it was. Is that true?</b><br>
The catch is different. In the old days you filled the boat with cordonnier and
capitaine and you were home before nine. Now you go further out. That is not the
same as smaller.<br><br>
<b>Q: But is it smaller?</b><br>
Look. I have four grandchildren. Two of them are at the university. Somebody
paid for that, and it was not the lagoon feeling sorry for me.<br><br>
<b>Q: The marine station says the coral near Blue Bay has lost colour since 2016.
Do you see that?</b><br>
The water is warmer. Anybody with a hand can tell you the water is warmer. In
February you used to feel a cold layer under your feet in the deep places. I
have not felt it in years.<br><br>
<b>Q: And the coral itself?</b><br>
[pause] There are places I do not take the boat any more.<br><br>
<b>Q: Why not?</b><br>
Because there is nothing there to take the boat for.<br><br>
<b>Q: Some people blame the fishermen &mdash; the nets, the size of the fish
taken.</b><br>
Some of that is fair. I will not pretend otherwise. When I was young we took
what we found and we did not think about the size. There were fifteen boats
then; there are eighty now, and eighty men all being reasonable can still empty
a lagoon. But the hotels put their pipes somewhere too, and nobody photographs a
pipe.<br><br>
<b>Q: The authorities have proposed a closed season. Would you support it?</b><br>
Ask me what I do during a closed season, and I will answer your question about
supporting it.<br><br>
<b>Q: What do you do?</b><br>
[laughs] Exactly.<br><br>
<b>Q: What would make a closed season workable?</b><br>
Payment. Not a speech, not a certificate. A payment for the weeks the boats stay
in, agreed before the season and not after it, and paid to the man who owns the
boat and to the two who work on it as well. Everybody forgets the two. My son
will not stay in this trade for a promise, and I would not ask him to.<br><br>
<b>Q: Do you want your grandchildren to fish?</b><br>
[long pause] I want them to be able to. That is a different sentence, and you
should write it down the way I said it.
`, '#0369a1');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-005-m1', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P5 + '<p>When asked twice whether the catch is smaller, what does Mr Perrine do?</p>',
    options:['He avoids the question',
             'He denies it completely',
             'He agrees immediately',
             'He blames the hotels'],
    answer:'He avoids the question',
    hint:'Compare the words of the question with the words of his reply.',
    explanation:'First he substitutes his own word — "The catch is different" — and when pressed he talks about his grandchildren instead. He never says yes, and he never says no.' }),

  makeMCQ({ id:'g8eng-rcp-005-m2', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P5 + '<p>What is he admitting when he says there are places he no longer takes the boat?</p>',
    options:['Parts of the reef are now dead',
             'The pass is too rough to cross',
             'The fuel has become too costly',
             'Those places belong to a hotel'],
    answer:'Parts of the reef are now dead',
    hint:'His next answer says why he stays away. Read it beside the question about coral.',
    explanation:'"Because there is nothing there to take the boat for" follows the question about the coral itself. He confirms the marine station without ever using the word they used.' }),

  makeMCQ({ id:'g8eng-rcp-005-m3', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P5 + '<p>What does "eighty men all being reasonable can still empty a lagoon" mean?</p>',
    options:['Small fair actions can add up to harm',
             'Fishermen are the only ones to blame',
             'Reasonable men never damage anything',
             'The lagoon was already empty long ago'],
    answer:'Small fair actions can add up to harm',
    hint:'The number has risen from fifteen to eighty. What has changed besides behaviour?',
    explanation:'Each man may take a fair share, yet the total is what the lagoon feels. He refuses to say the fishermen are innocent and refuses to say they alone are guilty — the pipes come in the very next sentence.' }),

  makeMCQ({ id:'g8eng-rcp-005-m4', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P5 + '<p>Why has the reporter kept "[pause]" and "[laughs]" in the printed text?</p>',
    options:['To show how he answered, not just what',
             'To fill the space left by short answers',
             'To prove the recording was made live',
             'To show the reporter found him funny'],
    answer:'To show how he answered, not just what',
    hint:'Take the two words out and reread the answer "Exactly."',
    explanation:'Without "[laughs]", "Exactly." is bare; with it, the reader hears a man refusing to say aloud that he would go out anyway. The stage directions carry the meaning the words leave out.' }),

  makeMCQ({ id:'g8eng-rcp-005-m5', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P5 + '<p>Why is "The lagoon keeps its own accounts" a fitting headline?</p>',
    options:['It says the sea records what is taken',
             'It shows he manages a large business',
             'It proves the lagoon has been measured',
             'It states that fishing is well paid work'],
    answer:'It says the sea records what is taken',
    hint:'The interview repeatedly turns on money and on what has quietly been used up.',
    explanation:'Accounts are a record that balances in the end, whatever anybody claims — which matches a man who talks about university fees, payments and eighty reasonable boats. It is a metaphor, not a claim about his business.' }),

  makeText({ id:'g8eng-rcp-005-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P5 + '<p>How many years has Mr Perrine been going out to fish? Answer with a number.</p>',
    answer:'47', alsoAccept:['forty-seven','forty seven','47 years'],
    hint:'It is the first thing he says.',
    explanation:'"Forty-seven years." The introduction adds that he started at fourteen and is now sixty-one, which agrees with the figure.' }),

  makeText({ id:'g8eng-rcp-005-o2', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P5 + '<p>How many boats work the lagoon now, according to him? Answer with a number.</p>',
    answer:'80', alsoAccept:['eighty','80 boats','eighty boats'],
    hint:'He gives an old figure and a new one in the same sentence.',
    explanation:'"There were fifteen boats then; there are eighty now." The pair of numbers is his argument, not just a detail.' }),

  makeText({ id:'g8eng-rcp-005-o3', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P5 + '<p>In one word, what has become warmer, in the change he is sure of?</p>',
    answer:'water', alsoAccept:['the water','sea','the sea'],
    hint:'He says anybody with a hand could confirm it.',
    explanation:'"The water is warmer. Anybody with a hand can tell you the water is warmer." He offers this readily because it needs no expert to prove, unlike the question about the coral.' }),

  makeText({ id:'g8eng-rcp-005-o4', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P5 + '<p>In one word, what does he say would make a closed season workable?</p>',
    answer:'payment', alsoAccept:['pay','money','a payment'],
    hint:'He names it, then names two things it must not be.',
    explanation:'"Payment. Not a speech, not a certificate." He adds that it must be agreed before the season and paid to the crew as well as the owner.' }),

  makeText({ id:'g8eng-rcp-005-o5', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P5 + '<p>In one word, which businesses does he say are never photographed?</p>',
    answer:'hotels', alsoAccept:['the hotels','hotel','the hotel'],
    hint:'He raises them straight after admitting the fishermen are partly at fault.',
    explanation:'"But the hotels put their pipes somewhere too, and nobody photographs a pipe." He is pointing out whose damage is invisible, and therefore whose is always blamed.' })

);

// ══ PASSAGE 6 · school notice with a letters page · ~486 words ════════════
const _P6 = box(`
<b style="color:#1e40af">Read the text, then answer the question.</b><br><br>
<b>ST JULIEN COLLEGE &mdash; NOTICE TO ALL PUPILS AND PARENTS</b><br>
<b>Revised uniform policy, effective from Term 2</b><br><br>
Following a review by the School Management Committee, the following changes
will take effect on the first day of Term 2.<br><br>
1. The grey skirt and the grey trousers are to be purchased from the approved
supplier only. Garments bought elsewhere, even in the correct colour, will not
be accepted.<br>
2. Blazers are to be worn on the school premises at all times between 07:45 and
14:30, including during the mid-morning break.<br>
3. Shoes are to be plain black. Coloured stitching, visible logos and white
soles are not permitted.<br>
4. Pupils out of uniform will be recorded at the gate. A third recording in one
term will result in a letter to parents.<br><br>
The Committee is satisfied that a consistent uniform supports discipline and
protects pupils from unnecessary comparison. Parents are reminded that the
approved supplier has agreed to hold its prices for the current year, and that
the shop opens on Saturday mornings during the holidays. The Committee thanks
parents in advance for their co-operation and trusts that the new arrangements
will be settled well before the first day of term.<br><br>
&mdash; Mrs D. Sooriah, Rector<br><br>
<b>LETTERS &mdash; from the pupils' page of the college magazine</b><br><br>
Sir,<br>
The notice says the uniform protects us from "unnecessary comparison". I should
like to know which comparison the Committee believes we make. Nobody in Form IV
has ever discussed the colour of anybody's stitching. What we did discuss, in
October, is that the approved supplier charges Rs 1,150 for a skirt that the
shop by the market sells, in the same grey, for Rs 640. If the aim is to stop
comparison, the policy has just invented one.<br>
&mdash; Priya, Form IV<br><br>
Sir,<br>
I have no objection to the blazer. I have an objection to the blazer at eleven
o'clock in November. Last year three pupils in my class were sent to the sick
room in a single week during the break. The notice fixes a time, 07:45 to 14:30,
as though the temperature were written into the timetable as well. Could the
rule not simply say "except when it is hot"?<br>
&mdash; Ashvin, Form III<br><br>
Sir,<br>
I have read the notice four times and I cannot find the sentence in which the
Committee says who was asked. It says "following a review". A review by whom, of
what, and with whose answers? There is a Pupils' Council in this school. It met
twice last term. Nobody brought it a uniform policy. Had we been asked, the
Committee would have heard about the skirt and about the blazer in November, and
the notice could have answered both before it was printed instead of
afterwards.<br>
&mdash; Kervin, Head of the Pupils' Council<br><br>
<i>The magazine has invited the Rector to reply in the next issue. Letters for
that issue should reach the editors before the end of the month.</i>
`, '#be123c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g8eng-rcp-006-m1', chapterId:CH, difficulty:2, subsection:'purpose_audience',
    question:_P6 + '<p>What is the <b>purpose</b> of the notice at the top?</p>',
    options:['To announce rules that will change',
             'To invite pupils to give opinions',
             'To apologise for an earlier error',
             'To advertise a shop near the market'],
    answer:'To announce rules that will change',
    hint:'Read the heading and the first sentence together.',
    explanation:'"Revised uniform policy, effective from Term 2" is followed by four numbered rules and a date. Nothing in it asks for a view, admits a mistake, or promotes a shop.' }),

  makeMCQ({ id:'g8eng-rcp-006-m2', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P6 + '<p>The notice says blazers "are to be worn" rather than "please wear them". Why?</p>',
    options:['It issues an order, not a request',
             'It sounds gentler to the parents',
             'It leaves the choice with the pupil',
             'It is the shortest way of writing it'],
    answer:'It issues an order, not a request',
    hint:'Ask whether the reader is being given a choice by that grammar.',
    explanation:'The passive "are to be worn" removes both the asking and the asker, which is how official instructions are written. It is longer than "wear blazers", so brevity is not the reason.' }),

  makeMCQ({ id:'g8eng-rcp-006-m3', chapterId:CH, difficulty:3, subsection:'explicit_implicit',
    question:_P6 + '<p>What does Priya <b>imply</b> about the supplier rule?</p>',
    options:['It creates the comparison it forbids',
             'It will make the uniforms last longer',
             'It was written by the market shop',
             'It applies only to pupils in Form IV'],
    answer:'It creates the comparison it forbids',
    hint:'She names two prices for the same grey skirt. What is now easy to compare?',
    explanation:'"If the aim is to stop comparison, the policy has just invented one." Forcing every family to the Rs 1,150 supplier makes what each family can afford visible, which is the comparison that actually stings.' }),

  makeMCQ({ id:'g8eng-rcp-006-m4', chapterId:CH, difficulty:4, subsection:'purpose_audience',
    question:_P6 + '<p>Which letter objects to <b>how</b> the policy was made, rather than to a rule?</p>',
    options:["Kervin's, on who was consulted",
             "Priya's, on the price of skirts",
             "Ashvin's, on wearing a blazer",
             "The Rector's, on the gate record"],
    answer:"Kervin's, on who was consulted",
    hint:'One writer counts how many times he read the notice looking for a missing sentence.',
    explanation:'Kervin asks "A review by whom, of what, and with whose answers?" and points out that the Pupils\' Council met twice and was never shown the policy. Priya and Ashvin argue with the rules themselves.' }),

  makeMCQ({ id:'g8eng-rcp-006-m5', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P6 + '<p>The notice says the supplier "has agreed to hold its prices". Why does this reassure less than it seems to?</p>',
    options:['It says nothing about the price itself',
             'It promises a refund to every parent',
             'It admits the supplier was chosen badly',
             'It shows the price will fall next year'],
    answer:'It says nothing about the price itself',
    hint:'Read that promise beside the two figures Priya gives.',
    explanation:'Holding a price only guarantees it will not rise; Priya shows the held price is Rs 1,150 against Rs 640 elsewhere. The sentence answers a worry the parents did not have and leaves the real one untouched.' }),

  makeText({ id:'g8eng-rcp-006-o1', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P6 + '<p>How much does the approved supplier charge for a skirt? Give the figure in rupees.</p>',
    answer:'Rs 1,150', alsoAccept:['1150','1,150','Rs 1150'],
    hint:'Priya gives two prices. You want the higher one.',
    explanation:'"The approved supplier charges Rs 1,150 for a skirt that the shop by the market sells, in the same grey, for Rs 640." The gap of Rs 510 is the point of her letter.' }),

  makeText({ id:'g8eng-rcp-006-o2', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P6 + '<p>How many recordings at the gate in one term bring a letter to parents? Answer with a number.</p>',
    answer:'three', alsoAccept:['3','a third','third'],
    hint:'It is the last of the four numbered rules.',
    explanation:'"A third recording in one term will result in a letter to parents." The first two are recorded but not reported home.' }),

  makeText({ id:'g8eng-rcp-006-o3', chapterId:CH, difficulty:2, subsection:'explicit_implicit',
    question:_P6 + '<p>In one word, what colour must shoes be?</p>',
    answer:'black', alsoAccept:['plain black','black shoes'],
    hint:'Rule 3 gives the colour and then three things that are banned.',
    explanation:'"Shoes are to be plain black." Coloured stitching, visible logos and white soles are all excluded by the same rule.' }),

  makeText({ id:'g8eng-rcp-006-o4', chapterId:CH, difficulty:3, subsection:'purpose_audience',
    question:_P6 + '<p>Give the surname of the person who signed the notice.</p>',
    answer:'Sooriah', alsoAccept:['Mrs Sooriah','Mrs D. Sooriah','the Rector'],
    hint:'Look at the line directly below the paragraph about the supplier.',
    explanation:'"&mdash; Mrs D. Sooriah, Rector". A notice is signed by the person with the authority to impose it, which is why the pupils address their replies to "Sir" in the magazine instead.' }),

  makeText({ id:'g8eng-rcp-006-o5', chapterId:CH, difficulty:4, subsection:'explicit_implicit',
    question:_P6 + '<p>In two words, name the school body that Kervin says was never consulted.</p>',
    answer:"Pupils' Council", alsoAccept:['Pupils Council','the Pupils Council','student council','pupil council'],
    hint:'He says it met twice last term and mentions his own position in it.',
    explanation:'"There is a Pupils\' Council in this school. It met twice last term. Nobody brought it a uniform policy." He signs himself its Head, which is why the omission is pointed.' })

);

})();
