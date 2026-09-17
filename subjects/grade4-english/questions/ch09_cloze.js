'use strict';
// Grade 4 English - Cloze Passages.
// One passage, ten gaps, eleven words, one word deliberately spare.
//
// ⚠ type 'cloze': excluded from every practice and exam pool by isPoolQuestion()
//   in questions_engine.js, and reached only through ClozeText (engine/cloze.js)
//   and the PRINTED paper's Section C (generatePrintablePaper in app.js).
//
// ⚠ lang: 'en' is REQUIRED on every item here. makeCloze defaults its question
//   text, hint and explanation to FRENCH — the exercise began as PSAC French Q6
//   — and without the flag an English passage is listed everywhere as
//   "texte à trous : 10 mots à trouver".
//
// ⚠⚠ EVERY GAP MUST HAVE EXACTLY ONE DEFENSIBLE ANSWER from the bank. A gap two
//    banked words could fill marks a child wrong for reading well, and that is
//    invisible in review because it looks like the child simply guessed. The
//    guards used when writing these:
//      · no two bank words of the same part of speech fit the same slot
//      · the spare word is a real distractor — plausible in the passage's world,
//        impossible in any gap (it is never a synonym of an answer)
//      · the sentence around each gap fixes the answer by grammar or by sense,
//        not by elimination alone
//    scripts/test-cloze-quality.js re-checks the mechanical half of that.
(function () {
  const CH = 'g4eng-cloze';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g4eng-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'cloze_passage', difficulty: difficulty || 2,
      lang: 'en', title, text, bank, answers, notes,
    }));

  add(1, 'The Lost Kite',
    'Ravi had waited all week for a windy Saturday. He carried his red kite down to the open {1} behind his grandmother\'s house and let the string out slowly. At first the kite rose beautifully, climbing {2} than the coconut trees. Then a strong gust pulled hard, the string snapped, and the kite {3} away over the cane fields. Ravi ran after it until he was out of {4}. He found it at last in a tamarind tree, its paper torn in two {5}. He climbed up carefully and brought it {6}. That evening his grandmother fetched her sewing {7} and showed him how to patch the tear with brown paper and glue. It was not as {8} as before, but it would fly. "Things that are mended," she said, "are often the ones we take the most {9} of." The next Saturday, Ravi flew the mended kite for three whole {10}.',
    ['field', 'higher', 'flew', 'breath', 'places', 'down', 'box', 'neat', 'care', 'hours', 'lantern'],
    ['field', 'higher', 'flew', 'breath', 'places', 'down', 'box', 'neat', 'care', 'hours'],
    ['An open space behind a house where you can fly a kite.',
      'A comparison with "than" needs the -er form.',
      'Past tense of "fly".',
      '"Out of ___" - what running hard takes away.',
      'The tear made two of them in the paper.',
      'He brought it the opposite of up.',
      'Where sewing things are kept.',
      'Not as tidy as it was before the tear.',
      '"Take care of" - the fixed expression.',
      'Three whole units of time on a Saturday afternoon.']);

  add(2, 'Market Morning',
    'The Quatre Bornes market opens before most of the town is {1}. By six o\'clock the stalls are already stacked with pyramids of tomatoes, and the smell of fresh {2} drifts from the bakery on the corner. Mrs Appadoo has sold vegetables here for twenty {3}. She knows which customers like their brèdes tied in small bundles and which prefer a {4} one. "Good morning, my girl," she calls to Anjali, who comes every Saturday with her {5}. Anjali is allowed to choose one thing herself. Today she picks a bunch of {6} bananas, still slightly green at the tips. Mrs Appadoo laughs and adds one more to the bunch without {7} for it. On the way home the bags feel {8}, but Anjali does not complain. She has learned that the market is not only a place to {9} things. It is a place where people remember your {10}.',
    ['awake', 'bread', 'years', 'large', 'mother', 'small', 'charging', 'heavy', 'buy', 'name', 'ladder'],
    ['awake', 'bread', 'years', 'large', 'mother', 'small', 'charging', 'heavy', 'buy', 'name'],
    ['The opposite of asleep.',
      'What a bakery smells of.',
      'Twenty of these make a long time selling vegetables.',
      'The opposite of the "small bundles" in the same sentence.',
      'The adult Anjali comes to the market with.',
      'Green at the tips and not yet big - which kind of bananas?',
      '"Without ___ for it" - taking no money.',
      'Full bags are the opposite of light.',
      'What you do with money at a market.',
      'What people remember about you, besides your face.']);

  add(3, 'The Dodo Room',
    'The class had been looking forward to the museum trip for a {1}. Mr Rughoo led them past the shells and the old maps until they reached the room everyone wanted to {2}. There, behind glass, stood the skeleton of a dodo. It was smaller than Priya had {3}. "It could not fly," said Mr Rughoo, "because for a very long time nothing on this island {4} it." Sailors arrived in the sixteenth century with dogs, rats and pigs, and within less than a hundred years the bird was {5}. Someone at the back asked whether a dodo could ever come {6}. Mr Rughoo shook his head slowly. "That is exactly {7} it matters," he said. "Some things cannot be mended." On the bus home nobody was as {8} as usual. Priya looked out at the green hills and thought about all the animals that were still {9}, and about how quiet a forest would be without {10}.',
    ['month', 'see', 'expected', 'chased', 'gone', 'back', 'why', 'noisy', 'here', 'them', 'anchor'],
    ['month', 'see', 'expected', 'chased', 'gone', 'back', 'why', 'noisy', 'here', 'them'],
    ['A length of time longer than a week.',
      'What you go to a museum to do.',
      'She had imagined it bigger - past tense.',
      'Nothing hunted or ran after it.',
      'No longer existing anywhere.',
      'Come ___ - return.',
      '"That is exactly ___ it matters" - asking for the reason.',
      'A busy class on a bus usually is this.',
      'Animals that have not disappeared are still ___.',
      'A pronoun standing for the animals.']);

  add(4, 'Cyclone Wednesday',
    'The warning came on the radio just after {1}. By the afternoon it was Class III, and Papa began taping a large cross on the biggest {2}. Sam helped fill every bottle and bucket in the house with {3}, because the water is often cut for a day or two afterwards. School was {4}, but it did not feel like a holiday at all. The wind arrived slowly. It did not roar the way Sam had {5}; it pushed steadily against the walls, hour after {6}, like something patient that had all night. At six the electricity went {7} and Mama lit two candles on the kitchen table. They ate bread and cheese and listened to the mango tree {8} against the roof. In the morning the garden was covered in leaves and one branch had {9}, but the house was fine. Sam went outside and started sweeping, because that is what everyone on the street was already {10}.',
    ['lunch', 'window', 'water', 'closed', 'imagined', 'hour', 'out', 'scraping', 'fallen', 'doing', 'ticket'],
    ['lunch', 'window', 'water', 'closed', 'imagined', 'hour', 'out', 'scraping', 'fallen', 'doing'],
    ['The meal in the middle of the day.',
      'What you tape a cross on before a cyclone.',
      'What you fill bottles with when the supply may be cut.',
      'Not open - what happens to school in a cyclone.',
      'He had pictured it differently in his mind.',
      '"Hour after ___" - the phrase repeats the word.',
      'The electricity went ___ - it stopped.',
      'The sound a branch makes rubbing on a roof.',
      'The branch came down - past participle of "fall".',
      'What the neighbours were already busy with.']);

  add(5, 'The Boy Who Forgot His Lines',
    'The play was on Friday and Jerome had the biggest {1} in it. He practised in the bathroom, in the bus, and once, by accident, out {2} in the middle of a maths lesson. On Friday evening the hall was {3} of parents. When the curtain opened, Jerome walked to the middle of the stage, looked at all those faces, and forgot every {4} he had learned. The silence felt a hundred years {5}. Then Sandra, who was playing his sister, stepped forward and said loudly, "You were going to tell me about the {6}, remember?" And suddenly he did remember. The words came {7} and the play went on. Afterwards his teacher said that the best actors are not the ones who never make a {8}; they are the ones who keep {9}. Jerome thought about that for a long time. He still tells the story, and he always makes sure to mention {10}.',
    ['part', 'loud', 'full', 'word', 'long', 'letter', 'back', 'mistake', 'going', 'Sandra', 'harbour'],
    ['part', 'loud', 'full', 'word', 'long', 'letter', 'back', 'mistake', 'going', 'Sandra'],
    ['The role an actor has in a play.',
      '"Out ___" - so that everyone could hear.',
      'The opposite of empty.',
      'He forgot every single one he had learned.',
      'The silence felt a hundred years ___.',
      'Something Sandra\'s character wanted to hear about.',
      'The words came ___ to him - they returned.',
      'Something you get wrong.',
      'They keep ___ - they carry on.',
      'The person who rescued him, by name.']);

  add(6, 'Grandfather\'s Garden',
    'Behind my grandfather\'s house there is a garden no {1} than our classroom. He grows tomatoes, beans, chillies and three kinds of {2}. He never plants the same thing in the same place two years running. "The soil gets {3}," he says, "if you always ask it for the same thing." He keeps all the vegetable peelings in a big blue {4} beside the tap. After a few months they turn into dark, rich {5} that he spreads around the roots. Nothing is thrown {6}. When I asked him where he learned all this, he said his own grandmother had {7} him, and that she could not read a single {8}. I used to think gardening was only about {9}. Now I think it is mostly about paying {10}.',
    ['bigger', 'brèdes', 'tired', 'bucket', 'soil', 'away', 'taught', 'word', 'water', 'attention', 'compass'],
    ['bigger', 'brèdes', 'tired', 'bucket', 'soil', 'away', 'taught', 'word', 'water', 'attention'],
    ['A comparison with "than" - no ___ than our classroom.',
      'Mauritian leafy green vegetables.',
      'Worn out from always doing the same work.',
      'A container you keep peelings in.',
      'What peelings become after a few months.',
      'Thrown ___ - put in the rubbish.',
      'Past tense of "teach".',
      'She could not read a single one.',
      'What most people think gardening is about.',
      '"Paying ___" - noticing carefully.']);

  add(7, 'The Fishermen of Mahébourg',
    'Mr Louis pushes his boat out before the sun is {1}. He has fished this lagoon for more than thirty {2}, and he says the fish come close to shore while the water is still {3}. He reads the sea the way other people read a {4}: a change in the colour of the water tells him where the sand ends and the coral {5}. Younger men buy bigger engines and go further {6}, past the reef. Mr Louis stays where he is. "A man who knows one place {7}," he says, "will always eat." Some mornings he comes back with very {8}. He does not seem to mind. He mends his net on the sand, greets everyone who passes, and goes out again the next {9}. His grandson says he wants to be a doctor, and Mr Louis tells everyone about it with enormous {10}.',
    ['up', 'years', 'cool', 'newspaper', 'begins', 'out', 'well', 'little', 'morning', 'pride', 'candle'],
    ['up', 'years', 'cool', 'newspaper', 'begins', 'out', 'well', 'little', 'morning', 'pride'],
    ['Before the sun is ___ - before sunrise.',
      'More than thirty of these make a long career.',
      'The water is still this early in the day.',
      'Something people read every day.',
      'Where the sand ends, the coral ___.',
      'Further ___ - away from the shore.',
      'Knows one place ___ - thoroughly.',
      'Very ___ - hardly any fish.',
      'The next one after today.',
      'The feeling a grandfather has about a grandson studying.']);

  add(8, 'Sports Day',
    'It rained on the morning of Sports Day, and for an hour everyone thought it would be {1}. Then the sky cleared and the whole school walked down to the {2} in two long lines. Nisha was in the relay, running the last {3}. Her team was third when the baton reached her hand, and her stomach felt {4}. She ran the way her coach had told her to: eyes forward, arms loose, breathing {5}. She passed one runner near the bend. She did not catch the {6}. Her team came second, and Nisha was surprised to find that she did not feel {7} at all. Her friends were shouting her name, her shoes were covered in {8}, and the sun was out. On the bus back she fell {9} against the window with the small silver medal still in her {10}.',
    ['cancelled', 'field', 'leg', 'strange', 'steadily', 'first', 'disappointed', 'mud', 'asleep', 'hand', 'dictionary'],
    ['cancelled', 'field', 'leg', 'strange', 'steadily', 'first', 'disappointed', 'mud', 'asleep', 'hand'],
    ['Called off because of the rain.',
      'Where a sports day is held.',
      'One section of a relay race.',
      'How your stomach feels when you are nervous.',
      'Breathing in a regular way - an adverb.',
      'She did not catch the ___ runner.',
      'How you might expect her to feel about second place.',
      'What running on a wet field puts on your shoes.',
      'Fell ___ - went to sleep.',
      'Where she held the medal.']);

  add(9, 'The New Puppy',
    'The puppy arrived in a cardboard box on a Sunday {1}. He was small enough to sit in two cupped {2} and he shook for the first hour, so Devi wrapped him in an old {3} and sat with him under the table. By the evening he had stopped shaking. By Tuesday he had chewed one of Papa\'s {4} and knocked over the water bowl three {5}. Mama said that a puppy is not a toy and that Devi would have to feed him, walk him and clean up after him every single {6}. Devi said she knew. She did not know, not really, but she learned {7}. Six months later the puppy is far too big for the {8} and sleeps across the doorway like a small brown {9}. Devi still gets up first every morning, and she has never once had to be {10}.',
    ['morning', 'hands', 'towel', 'shoes', 'times', 'day', 'quickly', 'box', 'rug', 'reminded', 'lantern'],
    ['morning', 'hands', 'towel', 'shoes', 'times', 'day', 'quickly', 'box', 'rug', 'reminded'],
    ['A Sunday ___ - the first part of the day.',
      'Small enough to sit in two cupped ___.',
      'What you wrap something wet or cold in.',
      'What a puppy chews that belongs on your feet.',
      'Three ___ - how often it happened.',
      'Every single ___ - the chores repeat daily.',
      'She learned ___ - an adverb of speed.',
      'Too big for the ___ he arrived in.',
      'He sleeps across the doorway like a small brown ___.',
      'She has never had to be ___ to do it.']);

  add(10, 'The Bicycle',
    'The bicycle had been leaning against the back wall for as long as Yash could {1}. It belonged to his uncle, who had gone to work in Australia and never come {2}. The tyres were flat, the chain had come {3}, and there was rust on the handlebars. Yash asked his grandmother whether he could try to fix {4}. She looked at it for a while and then said {5}. It took him three weekends. He borrowed a pump from the neighbour, cleaned the chain with an old {6} and some oil, and painted the frame a bright {7}. The first time he rode it down the lane, his grandmother stood at the gate and {8}. She said the bicycle had been waiting eleven years for somebody to want it {9}. Yash rides it to school every day {10}.',
    ['remember', 'back', 'off', 'it', 'yes', 'cloth', 'blue', 'watched', 'enough', 'now', 'anchor'],
    ['remember', 'back', 'off', 'it', 'yes', 'cloth', 'blue', 'watched', 'enough', 'now'],
    ['As long as Yash could ___ - his whole memory.',
      'Never come ___ - never returned.',
      'The chain had come ___ the wheel.',
      'Whether he could fix ___ - the bicycle.',
      'What she said when she agreed.',
      'What you clean an oily chain with.',
      'He painted the frame a bright ___.',
      'What his grandmother did at the gate.',
      'To want it ___ - sufficiently to do the work.',
      'He rides it every day ___ - in the present.']);

  add(11, 'Mango Season',
    'For about six weeks every year, everybody in our street has more mangoes than they can possibly {1}. The tree in the Beeharrys\' yard hangs over three {2} at once, and whatever falls on your side is {3}. My mother makes chutney, my aunt makes juice, and my grandmother slices them and dries them in the {4}. We still end up giving bags of them {5}. Last year Mrs Beeharry counted and said the tree had produced more than four {6} mangoes. Nobody planted it. It grew by itself from a seed somebody threw over a wall about thirty years {7}. My grandmother says that is the best kind of {8}: the sort that arrives without anyone {9} it, and then feeds a whole street for the rest of its {10}.',
    ['eat', 'gardens', 'yours', 'sun', 'away', 'hundred', 'ago', 'luck', 'planning', 'life', 'ladder'],
    ['eat', 'gardens', 'yours', 'sun', 'away', 'hundred', 'ago', 'luck', 'planning', 'life'],
    ['More than they can possibly ___.',
      'The tree hangs over three ___ at once.',
      'Whatever falls on your side is ___.',
      'Where you dry mango slices.',
      'Giving bags of them ___ - to other people.',
      'More than four ___ mangoes.',
      'About thirty years ___ - in the past.',
      'The best kind of ___ - good fortune.',
      'Without anyone ___ it - arranging it in advance.',
      'For the rest of its ___.']);

  add(12, 'The Garden Club',
    'Mr Bissoon started the garden club because the strip of ground behind the classrooms was full of {1} and nothing else. Eleven of us signed {2}. We spent the first two Wednesdays just pulling things out and carrying away {3}. It did not feel like gardening at all. On the third Wednesday we finally planted something: beans, because Mr Bissoon said beans are {4} and would not discourage anybody. Two weeks later the first green {5} appeared and we all stood around looking at them as though we had done something {6}. By the end of the term we had beans, tomatoes and far too much {7}. We gave most of it to the school {8}. Mr Bissoon says the club\'s real lesson is that almost nothing worth having happens in the first two {9}, and that most people give up just {10} it starts.',
    ['weeds', 'up', 'stones', 'easy', 'shoots', 'remarkable', 'lettuce', 'kitchen', 'weeks', 'before', 'compass'],
    ['weeds', 'up', 'stones', 'easy', 'shoots', 'remarkable', 'lettuce', 'kitchen', 'weeks', 'before'],
    ['Plants nobody wanted, growing where they like.',
      'Eleven of us signed ___ - joined.',
      'Heavy things you carry off a piece of ground.',
      'Beans are ___ - not difficult to grow.',
      'The first green ___ push up out of the soil.',
      'As though we had done something ___ - extraordinary.',
      'A salad leaf you can easily grow too much of.',
      'Where the school cooks the food.',
      'Nothing happens in the first two ___.',
      'Most people give up just ___ it starts.']);

  add(13, 'The Candle',
    'The lights went out at about eight o\'clock, right in the middle of my {1}. My father found the candles in the drawer where they have lived since before I was {2}, and lit two of them on the kitchen table. My little brother was frightened at first and sat very {3} to Mama. Then my father started telling us about the cyclone of 1960, which his own mother had described to {4} when he was our age. We forgot about the {5}. My brother asked question after question. When the electricity came back on at half past {6}, all three of us groaned, which is not what anybody {7}. My mother switched the lights off again and we stayed at the table for another {8}. I have thought about that evening often. The best part of it was the part that happened because something had gone {9}, and none of us would have chosen it if anyone had {10} us.',
    ['homework', 'born', 'close', 'him', 'dark', 'nine', 'expected', 'hour', 'wrong', 'asked', 'saucepan'],
    ['homework', 'born', 'close', 'him', 'dark', 'nine', 'expected', 'hour', 'wrong', 'asked'],
    ['What you do at the kitchen table in the evening.',
      'Since before I was ___ - a long time.',
      'He sat very ___ to Mama - near her.',
      'His own mother described it to ___.',
      'We forgot about the ___ - the absence of light.',
      'Half past ___ - the time it came back.',
      'Which is not what anybody ___ - predicted.',
      'We stayed for another ___ - sixty minutes.',
      'Something had gone ___ - the opposite of right.',
      'If anyone had ___ us - put the question to us.']);

  add(14, 'Grandmother\'s Recipe',
    'My grandmother has never written a recipe {1} in her life. When I asked her how much rice she uses, she held up her cupped {2} and said "that much". When I asked how long the dhal should {3}, she said "until it is ready". I found this extremely {4} at first. So one Saturday I stood beside her with a notebook and a measuring {5} and I weighed everything as she went. It took twice as {6} as usual and she laughed at me the whole {7}. But I have the recipe now, written down, and last month I made the whole meal by {8} for the first time. It was good. It was not quite {9} - my grandmother tasted it and said the salt was a little shy - but it was {10}.',
    ['down', 'hand', 'cook', 'annoying', 'cup', 'long', 'time', 'myself', 'hers', 'good', 'umbrella'],
    ['down', 'hand', 'cook', 'annoying', 'cup', 'long', 'time', 'myself', 'hers', 'good'],
    ['Written a recipe ___ - recorded it on paper.',
      'She held up her cupped ___ to show the amount.',
      'How long the dhal should ___.',
      'Extremely ___ - irritating.',
      'A measuring ___ - what you weigh ingredients with.',
      'Twice as ___ as usual - about time taken.',
      'She laughed at me the whole ___.',
      'I made the meal by ___ - with no help.',
      'Not quite ___ - not as good as my grandmother\'s.',
      'But it was ___ - the simple verdict.']);

  add(15, 'The Wallet',
    'Jean-Luc found the wallet on the pavement outside the {1}, half under a parked car. It was brown, soft with age, and it held four thousand {2}, a bus pass and a photograph of two small {3}. He stood there for what felt like a very long {4}. Four thousand rupees was more money than he had ever {5} at once. Then he walked into the shop and gave it to the woman behind the {6}, who put it under the counter and took his {7}. Two days later a man came to the house with a bag of oranges and thanked him about nine {8}. Jean-Luc says the strange part is that he does not remember deciding {9}. He remembers standing on the pavement, and then he remembers walking into the {10}.',
    ['shop', 'rupees', 'children', 'time', 'held', 'till', 'name', 'times', 'anything', 'doorway', 'ticket'],
    ['shop', 'rupees', 'children', 'time', 'held', 'till', 'name', 'times', 'anything', 'doorway'],
    ['Outside the ___ - where he found it.',
      'Four thousand ___ - Mauritian money.',
      'A photograph of two small ___.',
      'A very long ___ - it felt that way.',
      'More money than he had ever ___ at once.',
      'The woman behind the ___ - where money is kept.',
      'She took his ___ so the owner could thank him.',
      'Thanked him about nine ___.',
      'He does not remember deciding ___.',
      'Then he remembers walking into the ___.']);

  add(16, 'The Quiet One',
    'Ameera did not speak in class for the whole of her first {1} at the new school. She answered questions on paper and she answered them {2}, but she would not say a word out {3}. Some of the children decided she was unfriendly. Her teacher, Mrs Dhun, did not decide anything. She simply kept asking Ameera questions and waiting, without making it into a {4}. In February, Ameera put up her {5} and corrected something Mrs Dhun had written on the board. She was {6}, too. The room went completely {7} and then somebody laughed, and after that it was somehow {8}. Ameera talks now as much as anybody. Mrs Dhun told me later that the trick is not to pull a child out of their {9}; it is to leave the door open and go on {10} the questions.',
    ['term', 'correctly', 'loud', 'problem', 'hand', 'right', 'silent', 'easier', 'shell', 'asking', 'harbour'],
    ['term', 'correctly', 'loud', 'problem', 'hand', 'right', 'silent', 'easier', 'shell', 'asking'],
    ['Her first ___ at the new school - part of the year.',
      'She answered them ___ - without mistakes.',
      'A word out ___ - so others could hear.',
      'Without making it into a ___.',
      'She put up her ___ to answer.',
      'She was ___ - correct as well.',
      'The room went completely ___ - no sound.',
      'After that it was somehow ___ - less hard.',
      'Pull a child out of their ___ - where they hide.',
      'Go on ___ the questions.']);

  console.log('[g4eng-cloze] loaded');
})();
