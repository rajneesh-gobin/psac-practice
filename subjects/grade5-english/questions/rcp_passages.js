'use strict';
// grade5-english — reading comprehension: 4 original passages, 10 questions each.
// IDs: g5eng-rcp-001-m1 … g5eng-rcp-004-o5
//
// All four texts are ORIGINAL and Mauritian. Contexts were checked against the
// pack's existing comprehension files first (cyclone night, purse on a bench,
// shortcut, deep end, new boy, tabla lesson, bakery, borrowed bicycle, relay,
// sugar museum, fisherman's wife, Anisha's letter) — none is reused here.
//
// Text types: story · informal letter · recount · poem, the four the sister
// chapter `eng-passages` declares, so a child meets the same four shapes here
// at full exam length (MES Grade 5 Question 1 runs 413-447 words).
(function () {
const CH = 'eng-comprehension';
function box(inner, accent) {
  return `<div style="background:#f8fafc;border-left:4px solid ${accent};border-radius:6px;padding:10px 14px;margin:8px 0;font-size:0.93em;line-height:1.65;color:#0f172a">${inner}</div>`;
}

// ══ PASSAGE 1 · story · ~430 words ═════════════════════════════════════════
const _P1 = box(`
<b style="color:#1e40af">Read the story, then answer the question.</b><br><br>
<b>The Tree That Leaned</b><br><br>
The mango tree grew in Madame Lisette's yard, but it had never agreed to stay
there. Year after year its heaviest branch leaned further over the low stone
wall, until by the time Kavi was ten, half the tree hung above his family's
washing line.<br><br>
In September the fruit came. Small and green at first, then blushing, then gold.
Kavi counted them from his bedroom window the way other boys counted goals.<br><br>
His mother had a rule. "What falls on our side is ours. What is still on the
tree is hers." Kavi thought this rule was unfair in a way he could not quite
explain, so he obeyed it and complained about it at the same time.<br><br>
Madame Lisette was eighty-one. She came out at six each morning with a long
bamboo pole and stood under the tree looking up, and she never once used the
pole. Kavi watched her from the step. She would lift it, sight along it the way
a man sights along a gun, lower it again, and go back inside.<br><br>
"She cannot reach," his mother said. "The good ones are always at the top."<br><br>
One Saturday the wind came up from the south and worked at the tree all
afternoon. By evening the grass on Kavi's side was covered. He counted nineteen
mangoes, some split, most of them perfect. He gathered them into a bucket, and
the bucket was heavy, and the rule was on his side.<br><br>
He carried it next door anyway.<br><br>
Madame Lisette looked at the bucket for a long moment. Then she said, "Bring the
pole."<br><br>
They worked until it was almost dark. Kavi held the pole, because he was already
taller than she had ever been, and she stood below and told him which fruit was
ready and which needed three more days, and how you can tell by the shoulder of
a mango and not by its colour at all. He knocked down eleven. She let him keep
six, which was not half, and he did not argue.<br><br>
Walking home he understood that he had not really given her the mangoes. He had
given her the afternoon.<br><br>
The tree still leans. His mother's rule has quietly changed, though nobody ever
announced it: now what falls on either side is carried to whichever kitchen has
a pot on the fire. And in January, when there is nothing on the branches at all,
Madame Lisette still comes out at six and stands under the tree and looks up.
`, '#2563eb');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-rcp-001-m1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P1 + '<p>What did Madame Lisette carry out into the yard every morning at six?</p>',
    options:['A long bamboo pole', 'A wide straw basket', 'A short metal ladder', 'A green plastic bowl'],
    answer:'A long bamboo pole',
    hint:'Look at the paragraph that begins by telling you her age.',
    explanation:'The passage says she "came out at six each morning with a <b>long bamboo pole</b>". The basket, the ladder and the bowl never appear in the story at all.' }),

  makeMCQ({ id:'g5eng-rcp-001-m2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P1 + '<p>The fruit is described as "then <b>blushing</b>, then gold". Blushing here tells us the mangoes were</p>',
    options:['beginning to turn red', 'growing much heavier', 'falling to the ground', 'losing their sweetness'],
    answer:'beginning to turn red',
    hint:'People blush in the face. What colour does that make them?',
    explanation:'A person who blushes turns pink or red, and the writer puts the word between "green" and "gold" — so it names the <b>middle colour</b> the ripening fruit passes through.' }),

  makeMCQ({ id:'g5eng-rcp-001-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P1 + '<p>Why did Madame Lisette lift the pole every morning and then lower it again?</p>',
    options:['She could no longer reach the fruit at the top', 'She was waiting for the wind to bring it down', 'She had already promised the fruit to Kavi', 'She wanted to leave the best fruit for birds'],
    answer:'She could no longer reach the fruit at the top',
    hint:'Kavi\'s mother explains it in one short line of speech.',
    explanation:'His mother says, "She cannot reach. <b>The good ones are always at the top.</b>" At eighty-one she still comes out with the pole, but she cannot lift it high enough, which is why she goes back inside.' }),

  makeMCQ({ id:'g5eng-rcp-001-m4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P1 + '<p>Which sentence best gives the message of the whole story?</p>',
    options:['Being generous can matter more than being right', 'Old rules should never be changed by children', 'Fruit always tastes better when you pick it', 'Neighbours will always argue about a wall'],
    answer:'Being generous can matter more than being right',
    hint:'Kavi could have kept the mangoes and broken no rule. Ask what he gained instead.',
    explanation:'The rule was on his side and he gave the fruit away anyway, and what he got back was an afternoon, a lesson about mangoes and a changed rule. The story is about <b>choosing kindness over your rights</b>, not about fruit or fences.' }),

  makeMCQ({ id:'g5eng-rcp-001-m5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P1 + '<p>How does the writer want us to see Madame Lisette?</p>',
    options:['As a proud woman who misses company', 'As a mean woman who guards her fruit', 'As a rich woman with a large garden', 'As a cruel woman who dislikes boys'],
    answer:'As a proud woman who misses company',
    hint:'Think about why she still comes out in January, when the tree is bare.',
    explanation:'She never asks for help, but she is out under the tree at six every morning — even in <b>January, when there is no fruit at all</b>. The writer shows us someone who wants the company more than the mangoes.' }),

  makeText({ id:'g5eng-rcp-001-o1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P1 + '<p>How many mangoes had fallen on Kavi\'s side after the windy Saturday?</p>',
    answer:'nineteen', alsoAccept:['19','nineteen mangoes','19 mangoes'],
    hint:'The number is given in the paragraph about the wind from the south.',
    explanation:'"He counted <b>nineteen</b> mangoes, some split, most of them perfect." Eleven is how many they knocked down later, and six is how many he kept.' }),

  makeText({ id:'g5eng-rcp-001-o2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P1 + '<p>In one word, what does <b>gathered</b> mean in "He gathered them into a bucket"?</p>',
    answer:'collected', alsoAccept:['picked','picked up','put','piled'],
    hint:'Look at what he is doing with fallen fruit and a bucket.',
    explanation:'To <b>gather</b> is to collect scattered things together in one place — here, picking up the fallen mangoes and putting them all into one bucket.' }),

  makeText({ id:'g5eng-rcp-001-o3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P1 + '<p>In one word, how did Kavi feel about his mother\'s rule at the start of the story: pleased, unhappy, frightened or puzzled?</p>',
    answer:'unhappy', alsoAccept:['unfair','annoyed','cross'],
    hint:'Read the sentence that follows the rule, where he both obeys it and grumbles.',
    explanation:'He "thought this rule was <b>unfair</b>… so he obeyed it and complained about it at the same time." He is not frightened or pleased — he is quietly unhappy about it.' }),

  makeText({ id:'g5eng-rcp-001-o4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P1 + '<p>Which ONE word best sums up what this story is really about: sharing, cooking, farming or racing?</p>',
    answer:'sharing', alsoAccept:['share','generosity','kindness'],
    hint:'Ask what changes between the two houses by the end.',
    explanation:'By the last paragraph the fruit goes "to whichever kitchen has a pot on the fire". The mangoes are only the way the writer shows us <b>sharing</b>.' }),

  makeText({ id:'g5eng-rcp-001-o5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P1 + '<p>The story ends with Madame Lisette under a bare tree in January. In one word, what does the writer want us to feel for her: fear, sympathy, anger or envy?</p>',
    answer:'sympathy', alsoAccept:['pity','sadness','sorry'],
    hint:'There is no fruit in January, so ask what she is really coming out for.',
    explanation:'The last line puts her under a tree with "<b>nothing on the branches at all</b>". The writer ends there on purpose, so that we feel <b>sympathy</b> — she is waiting for company, not for mangoes.' })

);

// ══ PASSAGE 2 · informal letter · ~430 words ═══════════════════════════════
const _P2 = box(`
<b style="color:#166534">Read the letter, then answer the question.</b><br><br>
<div style="text-align:right">14, Chemin Vingt Pieds<br>Bel Air<br>3 May</div><br>
Dear Divya,<br><br>
Mum says I am to write to you with a pen and not with three words on a screen,
because of what has happened here, which is this: we have a phone. A real one,
with a screen, which Papa bought in Rose Hill on Saturday and carried home in
its box on his lap on the bus.<br><br>
It is not mine. I want to be clear about that before you get excited on my
behalf. It belongs to the house.<br><br>
Mum has written the rules on the back of last year's calendar and stuck them on
the fridge with the fish magnet. There were five of them:<br><br>
1. The phone sleeps in the kitchen.<br>
2. Nobody touches it until homework is finished.<br>
3. Sunday afternoon, one hour each, and Mum keeps the time.<br>
4. Nobody answers it while we are eating.<br>
5. If a rule is broken, the phone goes back in its box for a week.<br><br>
I thought rule 4 was the silly one. Then on Tuesday, in the middle of dinner,
the phone rang, and it was Grandpa's brother Dev, who lives in Australia and
whom Grandpa has not seen for nineteen years. Grandpa stood up so fast that his
chair went over backwards. He answered it. Mum opened her mouth and shut it
again.<br><br>
So there is now a rule 6, written in a different pen: <i>Except Dev.</i><br><br>
The part I did not expect is the Sunday hour. I had already decided I would use
mine for games. On the first Sunday Grandpa asked me to find sega music from
when he was young, and we found a recording of Ti-Frère, and he sat with his
eyes shut and his hand going on the table like a ravanne, and my hour was over
and I had not played anything at all. I did not mind. Do not tell Kavish I said
that.<br><br>
Papa keeps saying he will teach Mum to use it. Mum learnt it by herself in one
evening, while pretending she was not interested.<br><br>
Write back properly this time. A letter, not three words. You always say the
hospital keeps you busy and I believe you, but I have sent you two letters since
March and you have sent me one photograph of a cat that is not even yours.<br><br>
Your sister,<br>
Anaya<br><br>
P.S. Grandpa now says "put it on speaker" as though he has been saying it his
whole life.
`, '#16a34a');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-rcp-002-m1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P2 + '<p>Where does Anaya\'s mother keep the list of rules?</p>',
    options:['On the door of the fridge', 'Inside the kitchen drawer', 'Beside the front window', 'Under the empty phone box'],
    answer:'On the door of the fridge',
    hint:'The letter names the magnet that holds them up.',
    explanation:'Mum "stuck them on the <b>fridge</b> with the fish magnet". The box is where the phone would go if a rule were broken, not where the list is kept.' }),

  makeMCQ({ id:'g5eng-rcp-002-m2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P2 + '<p>Anaya writes that the phone "belongs to the house". She means that</p>',
    options:['it is shared by the whole family', 'it must never leave the kitchen', 'it was a present for her mother', 'it is kept only for emergencies'],
    answer:'it is shared by the whole family',
    hint:'She says this right after telling her sister the phone is not hers.',
    explanation:'She writes "It is not mine… It belongs to the house," and the rules then give <b>everybody</b> an hour on Sunday. Belonging to the house means belonging to all of them.' }),

  makeMCQ({ id:'g5eng-rcp-002-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P2 + '<p>Why did Mum open her mouth and then shut it again?</p>',
    options:['She decided this call was worth allowing', 'She had forgotten what she meant to say', 'She was too surprised to speak to Grandpa', 'She wanted Grandpa to finish his dinner'],
    answer:'She decided this call was worth allowing',
    hint:'Look at what appears on the calendar straight afterwards.',
    explanation:'She was about to enforce rule 4 — then rule 6, "<b>Except Dev</b>", appears in a different pen. She swallowed the objection because two brothers had not spoken in nineteen years.' }),

  makeMCQ({ id:'g5eng-rcp-002-m4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P2 + '<p>What is this letter mainly about?</p>',
    options:['how one shared phone changed the family', 'why Anaya wants a phone of her own', 'how Papa travelled home from Rose Hill', 'what Grandpa remembers about Australia'],
    answer:'how one shared phone changed the family',
    hint:'Ask which idea runs through the rules, the interrupted dinner and the Sunday hour.',
    explanation:'Every part of the letter — the rules, rule 6, the sega hour with Grandpa, Mum teaching herself — is about <b>what the phone did to the household</b>. Anaya never once asks for one of her own.' }),

  makeMCQ({ id:'g5eng-rcp-002-m5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P2 + '<p>How does Anaya feel about the rules by the end of her letter?</p>',
    options:['She has come to see the good in them', 'She is still angry about every one', 'She hopes her sister will change them', 'She thinks they will soon be forgotten'],
    answer:'She has come to see the good in them',
    hint:'Compare what she says about rule 4 with what she says about the Sunday hour.',
    explanation:'She calls rule 4 "the silly one" at first, then tells the story that proves it was worth bending, and admits the Sunday hour gave her something better than games: "<b>I did not mind.</b>"' }),

  makeText({ id:'g5eng-rcp-002-o1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P2 + '<p>How many rules were written on the calendar at first?</p>',
    answer:'five', alsoAccept:['5','five rules','5 rules'],
    hint:'Count the numbered lines, and remember that one was added later.',
    explanation:'"There were <b>five</b> of them," and they are numbered 1 to 5. Rule 6 was added afterwards, in a different pen.' }),

  makeText({ id:'g5eng-rcp-002-o2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P2 + '<p>In one word, what does <b>silly</b> mean as Anaya uses it about rule 4: sensible, foolish, strict or kind?</p>',
    answer:'foolish', alsoAccept:['stupid','pointless','daft'],
    hint:'She is saying the rule seemed to have no good reason behind it.',
    explanation:'She thought rule 4 was <b>foolish</b> — a rule with no sense in it — until the call from Dev showed her why a family might want dinner protected.' }),

  makeText({ id:'g5eng-rcp-002-o3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P2 + '<p>In one word, how did Grandpa feel when he heard who was on the phone: bored, delighted, angry or worried?</p>',
    answer:'delighted', alsoAccept:['happy','excited','overjoyed'],
    hint:'Look at what happens to his chair.',
    explanation:'"Grandpa stood up so fast that his chair went over backwards." The writer never uses a feeling word — the <b>chair</b> tells you he was delighted.' }),

  makeText({ id:'g5eng-rcp-002-o4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P2 + '<p>Which ONE word best describes what the phone is in this house: shared, secret, hidden or broken?</p>',
    answer:'shared', alsoAccept:['share','everyone\'s','common'],
    hint:'Rule 3 gives every person the same amount of time.',
    explanation:'"It belongs to the house," and Sunday gives "<b>one hour each</b>". Nothing about it is secret, hidden or broken — it is <b>shared</b>.' }),

  makeText({ id:'g5eng-rcp-002-o5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P2 + '<p>Anaya adds "Do not tell Kavish I said that." In one word, what is she: proud, embarrassed, frightened or bored?</p>',
    answer:'embarrassed', alsoAccept:['shy','ashamed','awkward'],
    hint:'She has just admitted enjoying an hour of her grandfather\'s old music.',
    explanation:'She has confessed that she gave up her games hour for sega and "did not mind", and immediately asks her sister to keep it quiet. That is <b>embarrassment</b> — she enjoyed something she thinks Kavish would laugh at.' })

);

// ══ PASSAGE 3 · recount · ~440 words ═══════════════════════════════════════
const _P3 = box(`
<b style="color:#7c2d12">Read the recount, then answer the question.</b><br><br>
<b>The Day We Went to Île aux Aigrettes</b> — by Rehan, Grade 5C<br><br>
On Friday 22 August our class crossed to Île aux Aigrettes, the small coral
island that sits in the lagoon off Pointe d'Esny. We left school at half past
seven and reached the jetty at nine.<br><br>
Before we were allowed into the boat, our guide, Mr Gopal, asked every one of us
to stamp our feet hard on the concrete and shake out our shoes. Some of the boys
laughed. Then he explained. A single seed carried on a shoe can grow into a
plant that does not belong on the island, and once it is growing there it is very
hard to remove. Nobody laughed after that. He also told us that everything we
carried over — every wrapper, every bottle — had to come back with us.<br><br>
The crossing took eight minutes. The water was so clear that we could see the
sand moving in ridges under the boat.<br><br>
First, Mr Gopal took us along a narrow path under the ebony trees. He told us
that this hard black wood was cut and shipped away for two hundred years, until
there was almost none of it left. The trees around us were young. Some of them
had been planted by pupils from other schools.<br><br>
Next we met the giant tortoises. They are not the Mauritian ones, because the
Mauritian ones are extinct. These came from Aldabra, and they do the work the old
ones used to do: they eat the fallen fruit and spread the seeds through the
forest. One walked across our path and we all had to wait, which took a long
time, and which nobody minded.<br><br>
After that we stood still for eleven minutes without speaking. Mr Gopal wanted us
to hear the island. We heard the sea on the far side, and insects, and then a
low, soft call from the branches above us. Sarah saw it before the guide did: a
pink pigeon, sitting quite still. Mr Gopal said there were only ten of these
birds left in the world in 1990. He seemed pleased that a pupil had spotted it
first.<br><br>
Finally we ate our lunch on the wooden deck by the water and carried our rubbish
back down to the boat.<br><br>
I had expected a nature trip to be a walk with names attached to it. What I
remember instead is that the island is being put back together, tree by tree,
bird by bird, by people who will not live long enough to see it finished. On the
boat home nobody said very much.
`, '#ea580c');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-rcp-003-m1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P3 + '<p>What did Mr Gopal ask the class to do before they got into the boat?</p>',
    options:['Shake the seeds out of their shoes', 'Leave their school bags at the jetty', 'Write their names in a visitors\' book', 'Put on a pair of thin white gloves'],
    answer:'Shake the seeds out of their shoes',
    hint:'It happened on the concrete, and some of the boys laughed at it.',
    explanation:'He asked them "to stamp our feet hard on the concrete and <b>shake out our shoes</b>", because one seed carried over on a shoe can take root on the island.' }),

  makeMCQ({ id:'g5eng-rcp-003-m2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P3 + '<p>The recount says the Mauritian giant tortoises are <b>extinct</b>. This means that</p>',
    options:['none of them are alive anywhere', 'they are kept in a safe place', 'they live only on other islands', 'they are smaller than before'],
    answer:'none of them are alive anywhere',
    hint:'Ask why tortoises had to be brought in from Aldabra at all.',
    explanation:'<b>Extinct</b> means the whole kind has died out and none is left alive. That is exactly why Aldabra tortoises were brought in "to do the work the old ones used to do".' }),

  makeMCQ({ id:'g5eng-rcp-003-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P3 + '<p>Why did nobody laugh after Mr Gopal had explained the shoe rule?</p>',
    options:['They understood that the rule had a serious reason', 'They were afraid of being sent back to the school', 'They had been told to keep quiet near the water', 'They were watching a tortoise cross the concrete'],
    answer:'They understood that the rule had a serious reason',
    hint:'Look at what he says a single seed can do.',
    explanation:'The laughing stops the moment he explains that one seed "can grow into a plant that does not belong on the island". The class laughed at a rule that looked odd, and stopped once they saw <b>why it existed</b>.' }),

  makeMCQ({ id:'g5eng-rcp-003-m4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P3 + '<p>Which title would best suit this recount?</p>',
    options:['Putting an Island Back Together', 'A Boat Ride Across the Lagoon', 'The Biggest Tortoise in Mauritius', 'How to Behave on a School Trip'],
    answer:'Putting an Island Back Together',
    hint:'A good title has to cover the ebony saplings, the tortoises and the pigeon.',
    explanation:'Rehan\'s own last paragraph names it: the island "is <b>being put back together</b>, tree by tree, bird by bird". The boat, the tortoise and the rules are each only one part of the day.' }),

  makeMCQ({ id:'g5eng-rcp-003-m5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P3 + '<p>How had Rehan\'s opinion of nature trips changed by the end of the day?</p>',
    options:['He found it meant more than learning names', 'He decided that such trips are far too long', 'He wished the class had gone to a museum', 'He thought the rules had spoilt the outing'],
    answer:'He found it meant more than learning names',
    hint:'He says plainly what he had expected before he went.',
    explanation:'"I had expected a nature trip to be <b>a walk with names attached to it</b>." What he took away instead was the repair work being done by people who will never see it finished.' }),

  makeText({ id:'g5eng-rcp-003-o1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P3 + '<p>Which bird did Sarah spot in the branches? Give the two-word name.</p>',
    answer:'pink pigeon', alsoAccept:['a pink pigeon','pink pigeons','the pink pigeon'],
    hint:'It was making the low, soft call they heard in the silence.',
    explanation:'"Sarah saw it before the guide did: a <b>pink pigeon</b>, sitting quite still." Mr Gopal adds that only ten were left in the world in 1990.' }),

  makeText({ id:'g5eng-rcp-003-o2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P3 + '<p>Find the word in the recount that means "the place where boats tie up". One word.</p>',
    answer:'jetty', alsoAccept:['the jetty','pier','landing'],
    hint:'It is in the very first paragraph, where the class arrives at nine.',
    explanation:'"We left school at half past seven and reached the <b>jetty</b> at nine." A jetty is the small structure built out over the water where a boat is boarded.' }),

  makeText({ id:'g5eng-rcp-003-o3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P3 + '<p>In one word, how did Mr Gopal feel when a pupil saw the pigeon before he did: annoyed, pleased, worried or bored?</p>',
    answer:'pleased', alsoAccept:['happy','glad','proud'],
    hint:'The recount tells you directly in the sentence after the bird is named.',
    explanation:'"He seemed <b>pleased</b> that a pupil had spotted it first." He was not competing with the class — he wanted them to notice things for themselves.' }),

  makeText({ id:'g5eng-rcp-003-o4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P3 + '<p>In one word, what is the whole recount really about: repairing, shopping, sailing or cooking?</p>',
    answer:'repairing', alsoAccept:['repair','restoring','rebuilding'],
    hint:'Think about the young ebony trees, the borrowed tortoises and the rescued pigeon together.',
    explanation:'Young trees replanted, Aldabra tortoises doing the extinct ones\' work, a pigeon brought back from ten birds: every part of the day is about <b>repairing</b> a damaged island.' }),

  makeText({ id:'g5eng-rcp-003-o5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P3 + '<p>Rehan ends by saying that on the boat home "nobody said very much". In one word, what does he want us to understand the class was: bored, thoughtful, tired or frightened?</p>',
    answer:'thoughtful', alsoAccept:['thinking','moved','serious'],
    hint:'Read the sentence just before it, about people who will not see the work finished.',
    explanation:'The silence follows the thought that the island is being rebuilt "by people who will not live long enough to see it finished". The quiet is <b>thoughtful</b>, not bored — the writer places the two sentences side by side so that we join them.' })

);

// ══ PASSAGE 4 · poem · ~410 words ══════════════════════════════════════════
// A poem, but written at full comprehension length (twelve stanzas) rather
// than the shorter poems in ch09_passages.js, because this chapter's blocks are
// dealt as exam-shaped Question 1 texts.
const _P4 = box(`
<b style="color:#6d28d9">Read the poem, then answer the question.</b><br><br>
<b>Before the Market Opens</b><br>
<i>Kervin, who goes with his mother to Port Louis on Saturdays, wrote this.</i><br><br>
<div style="font-style:italic;line-height:1.9">
At four o'clock the street lamps are still doing all the seeing.<br>
The shutters are all down. The road is wide and grey and bare.<br>
And then, from up the hill, one headlight and another headlight,<br>
the vans come down to market with the morning folded in there.<br><br>
My mother does not hurry. My mother has never hurried.<br>
She has been coming here since she was smaller than I am now.<br>
She knows which crates are heavy before anybody lifts them.<br>
She knows the price of pumpkin in October, and asks how.<br><br>
The men unload the cabbages in one long swinging chain,<br>
a crate, a crate, a crate, and not a word between the four.<br>
The concrete floor gets wetter as the fish trays come in first,<br>
and somebody is whistling in the dark by the far door.<br><br>
The lights come on in sections, and the market wakes in pieces:<br>
the vegetables, the spices, then the corner where the flowers go.<br>
The tea man has been open since before the lights were open.<br>
He does not have to ask us. He already seems to know.<br><br>
By five the smell arrives — and it arrives in this same order:<br>
wet stone, then coriander, then the frying dholl puri.<br>
My mother says the market smells the same as when she was little,<br>
which is the only thing she ever says is still the same as then.<br><br>
The old man with the ravanne sets his drum beside the entrance,<br>
and warms the skin above a tin of coals until it sings.<br>
Nobody has paid him yet. Nobody has asked him.<br>
He plays because the market has to open. That is how it begins.<br><br>
At six the gates go up. The first tourists come at nine.<br>
For three hours in between, the market talks to its own people:<br>
a nurse who wants her onions, and a taxi man, and me,<br>
and a woman buying nothing who has come to see her neighbours.<br><br>
My mother buys the tomatoes last, because they mark so easily,<br>
and the bananas from the woman who has kept her a good hand.<br>
Two bags for her, one bag for me, and one long walk together<br>
back up the road to Plaine Verte with the morning in my hand.<br><br>
I used to think the market was the place we bought our food in.<br>
I have been coming long enough to know that isn't true.<br>
The market is a hundred people finding out together<br>
what kind of day it's going to be, and getting ready to.
</div>
`, '#7c3aed');

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5eng-rcp-004-m1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P4 + '<p>At what time do the gates of the market go up?</p>',
    options:['At six in the morning', 'At four in the morning', 'At five in the morning', 'At nine in the morning'],
    answer:'At six in the morning',
    hint:'One stanza names three different times in its first two lines.',
    explanation:'"At <b>six</b> the gates go up. The first tourists come at nine." Four o\'clock is when the vans arrive and five is when the smells begin.' }),

  makeMCQ({ id:'g5eng-rcp-004-m2', chapterId:CH, difficulty:2, subsection:'vocabulary',
    question:_P4 + '<p>The poet writes that the market "wakes in pieces". This tells us that</p>',
    options:['it comes to life a part at a time', 'it is broken in several places', 'it is smaller than it once was', 'it is noisy from the very start'],
    answer:'it comes to life a part at a time',
    hint:'The rest of the line lists the sections in the order they light up.',
    explanation:'"The lights come on in sections… the vegetables, the spices, then the corner where the flowers go." Waking <b>in pieces</b> means section by section, not all at once.' }),

  makeMCQ({ id:'g5eng-rcp-004-m3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P4 + '<p>Why does the poet\'s mother buy the tomatoes last?</p>',
    options:['They bruise easily if carried too long', 'They are cheapest at the end of the morning', 'They are sold at the far end of the market', 'They are heavier than everything else'],
    answer:'They bruise easily if carried too long',
    hint:'The line gives the reason immediately after the word "because".',
    explanation:'"because they <b>mark so easily</b>" — soft fruit put at the bottom of a bag for an hour arrives home spoilt, so it goes in last. Nothing is said about price or distance.' }),

  makeMCQ({ id:'g5eng-rcp-004-m4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P4 + '<p>Which line comes closest to the message of the whole poem?</p>',
    options:['The market is far more than a place to shop', 'Getting up early is harder than people think', 'Tourists spoil the market when they arrive', 'Mothers always know the best prices to pay'],
    answer:'The market is far more than a place to shop',
    hint:'The last stanza tells you what the poet used to think, and what he thinks now.',
    explanation:'"I used to think the market was the place we bought our food in. I have been coming long enough to know that isn\'t true." The market is "<b>a hundred people finding out together what kind of day it\'s going to be</b>".' }),

  makeMCQ({ id:'g5eng-rcp-004-m5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P4 + '<p>How does the poet feel about the three hours before the tourists arrive?</p>',
    options:['They are the part that belongs to locals', 'They are far too cold to be enjoyed', 'They are the busiest hours of the day', 'They are wasted while the stalls are shut'],
    answer:'They are the part that belongs to locals',
    hint:'Look at who the poet lists as being there in those hours.',
    explanation:'"For three hours in between, the market talks to <b>its own people</b>" — a nurse, a taxi man, the poet, and a woman who has come only to see her neighbours. He values those hours precisely because they are not for visitors.' }),

  makeText({ id:'g5eng-rcp-004-o1', chapterId:CH, difficulty:2, subsection:'retrieval',
    question:_P4 + '<p>Which instrument does the old man set down beside the entrance? One word.</p>',
    answer:'ravanne', alsoAccept:['a ravanne','drum','ravane'],
    hint:'He warms its skin over a tin of coals before he plays it.',
    explanation:'"The old man with the <b>ravanne</b> sets his drum beside the entrance, and warms the skin above a tin of coals until it sings." The ravanne is the goatskin frame drum used in sega.' }),

  makeText({ id:'g5eng-rcp-004-o2', chapterId:CH, difficulty:3, subsection:'vocabulary',
    question:_P4 + '<p>In one word, what does the poet mean by a "good hand" of bananas: a bunch, a glove, a price or a helper?</p>',
    answer:'bunch', alsoAccept:['a bunch','cluster','bunch of bananas'],
    hint:'It is what the seller has kept for his mother, so it must be something you can buy.',
    explanation:'A <b>hand</b> of bananas is the whole cluster that grows together on the stem — so "a good hand" means a fine bunch that the seller has put aside for a regular customer.' }),

  makeText({ id:'g5eng-rcp-004-o3', chapterId:CH, difficulty:3, subsection:'inference',
    question:_P4 + '<p>In one word, how does the tea man know what the poet and his mother want: guessing, habit, luck or magic?</p>',
    answer:'habit', alsoAccept:['experience','routine','custom'],
    hint:'Ask how many Saturdays they have already stood at his counter.',
    explanation:'"He does not have to ask us. He already seems to know." They come every Saturday, and his mother has come since she was a child — it is long <b>habit</b>, not luck.' }),

  makeText({ id:'g5eng-rcp-004-o4', chapterId:CH, difficulty:3, subsection:'main_idea',
    question:_P4 + '<p>In one word, what does the poem say the market really gives its people: food, company, money or shelter?</p>',
    answer:'company', alsoAccept:['companionship','friendship','community'],
    hint:'Remember the woman who comes to the market and buys nothing at all.',
    explanation:'A woman comes "buying nothing… to see her neighbours", and the last stanza calls the market "a hundred people finding out together what kind of day it\'s going to be". The food is real, but the poem is about <b>company</b>.' }),

  makeText({ id:'g5eng-rcp-004-o5', chapterId:CH, difficulty:3, subsection:'authors_view',
    question:_P4 + '<p>In one word, what feeling does the poet have towards his mother in this poem: fear, admiration, pity or anger?</p>',
    answer:'admiration', alsoAccept:['respect','pride','love'],
    hint:'Collect everything he says she knows, and how he says it.',
    explanation:'"My mother has never hurried… She knows which crates are heavy before anybody lifts them." He lists her knowledge without a single complaint, which is <b>admiration</b>.' })

);

})();
