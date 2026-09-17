'use strict';
// Grade 5 English - Cloze Passages.
// One passage, ten gaps, eleven words, one word deliberately spare.
// See subjects/grade4-english/questions/ch09_cloze.js for the authoring rules;
// they apply here unchanged. ⚠ lang: 'en' on every item.
//
// Grade 5 leans harder on words the sentence fixes by GRAMMAR rather than by
// picture - a comparative, a preposition, the right tense - because that is
// what separates a child who is reading the sentence from one who is matching
// a noun to a scene.
(function () {
  const CH = 'g5eng-cloze';
  const add = (n, title, text, bank, answers, notes, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g5eng-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'cloze_passage', difficulty: difficulty || 3,
      lang: 'en', title, text, bank, answers, notes,
    }));

  add(1, 'The Sugar Mill Chimney',
    'The mill in our village stopped working twelve years {1}. For a long time the building stood empty, and the tall brick chimney could be seen from the main {2}. The men who had worked there did not talk about it {3}. Some of them found work in the hotels on the coast; others never really found anything at {4}. Then the council decided not to pull the building {5}. They kept the chimney and the outer walls, and inside they built a library and a hall that any group in the village can {6}. My grandfather worked at that mill for twenty-eight {7}. On Wednesdays he takes my little sister there to {8}, and he still calls it "the mill" rather than "the library". He says it feels {9}, but that it is better than a ruin. I think he is {10} about that.',
    ['ago', 'road', 'much', 'all', 'down', 'book', 'years', 'read', 'strange', 'right', 'sailor'],
    ['ago', 'road', 'much', 'all', 'down', 'book', 'years', 'read', 'strange', 'right'],
    ['Twelve years ___ - in the past.',
      'Where you would stand to see a tall chimney.',
      'They did not talk about it ___ - only a little.',
      'Never found anything at ___ - the fixed phrase.',
      'Pull a building ___ - demolish it.',
      'What a group does to reserve a hall.',
      'Twenty-eight of these make a working life.',
      'What you go to a library to do.',
      'How it feels to call a library "the mill".',
      'To be ___ about something - correct.']);

  add(2, 'Water in a Dry Month',
    'Mauritius receives a great deal of rain - more than two metres a year in the centre of the {1}. It is therefore surprising to hear people complain about water {2}. The difficulty is not how much falls but {3} it falls, and what happens next. Most of the rain arrives in a few summer {4}. The island is small and steep, so water that is not captured {5} reaches the sea within hours. The reservoirs hold what they {6}, but older pipes lose a share of everything stored before it ever reaches a {7}. A dry September, then, is less a shortage of rain than a shortage of storage and of pipes that do not {8}. Fixing a pipe is not exciting work and nobody puts up a sign when it is {9}. It is, all the same, one of the most useful things anyone can {10}.',
    ['island', 'cuts', 'when', 'months', 'quickly', 'can', 'tap', 'leak', 'finished', 'do', 'harvest'],
    ['island', 'cuts', 'when', 'months', 'quickly', 'can', 'tap', 'leak', 'finished', 'do'],
    ['Mauritius is one of these.',
      'What people complain about when the water stops.',
      'Not how much but ___ it falls - about timing.',
      'A few summer ones carry most of the rain.',
      'Water not captured this way runs off.',
      'The reservoirs hold what they ___ - are able to.',
      'Where water comes out in a house.',
      'What an old pipe does.',
      'Nobody puts up a sign when the work is ___.',
      'One of the most useful things anyone can ___.']);

  add(3, 'The Filao Trees',
    'Walk along almost any public beach in Mauritius and you will pass {1} filao trees. They are not native to the island; they were planted in large {2} because they grow quickly in poor sandy soil and their roots hold the sand in {3} when the sea pushes at it. For a long time that seemed like an unmixed {4}. More recently, botanists have pointed out a {5}: filao needles fall in a thick mat that very few other plants can grow {6}, so a filao beach is often a beach with filao and very little {7}. Nobody is arguing that the trees are {8} - they plainly are. The argument is about whether a whole coastline should be held {9} by a single kind of tree, and what happens if a disease ever arrives that this one tree cannot {10}.',
    ['under', 'numbers', 'place', 'good', 'cost', 'through', 'else', 'useless', 'together', 'survive', 'lantern'],
    ['under', 'numbers', 'place', 'good', 'cost', 'through', 'else', 'useless', 'together', 'survive'],
    ['You walk ___ trees that line a beach.',
      'Planted in large ___ - a great many.',
      'Hold the sand in ___ - stop it moving.',
      'An unmixed ___ - entirely a benefit.',
      'Something bad that comes with the benefit.',
      'Few plants can grow ___ a thick mat of needles.',
      'Filao and very little ___ - nothing besides.',
      'Nobody argues the trees are this - they are useful.',
      'Held ___ - kept from falling apart.',
      'What a tree must do to a disease.']);

  add(4, 'Learning Three Languages',
    'A Mauritian child may speak Kreol at home, study in English and learn French as a subject, all before the age of {1}. To a visitor this sounds like a heavy {2}. Research on multilingual classrooms suggests something more {3}: children who move between languages early are often quicker to notice how language itself {4} - that a word is a choice rather than a {5}. The real difficulty is rarely the number of languages. It appears when a child is asked to read in a language they do not yet {6} well, and is then judged on the reading rather than on the {7}. A child who understands the science but stumbles over the English is marked as {8} at science. That is the mistake worth {9}, and it has very little to do with how many languages anyone {10}.',
    ['seven', 'burden', 'interesting', 'works', 'fact', 'speak', 'understanding', 'weak', 'avoiding', 'knows', 'compass'],
    ['seven', 'burden', 'interesting', 'works', 'fact', 'speak', 'understanding', 'weak', 'avoiding', 'knows'],
    ['The age before which all this happens.',
      'A heavy ___ - something hard to carry.',
      'More ___ than it first sounds.',
      'How language itself ___ - operates.',
      'A choice rather than a ___ - not fixed.',
      'A language they do not yet ___ well.',
      'Judged on the reading rather than the ___.',
      'Wrongly marked as ___ at science.',
      'The mistake worth ___ - staying away from.',
      'How many languages anyone ___.']);

  add(5, 'The Night of the Turtles',
    'The beach at Rodrigues looks empty at midnight, but it is not. If you sit very {1} and let your eyes adjust, you may see a dark shape moving slowly out of the {2}. A female turtle comes ashore only to lay her eggs, and she chooses the same stretch of sand where she herself {3}. She digs with her back flippers, lays, covers the nest, and returns to the water before {4}. The whole thing takes about two {5}. Almost nothing about it is easy. Of a hundred hatchlings, only a very {6} number will live to be adults. The rest are taken by crabs, by birds and by {7}. Knowing that, you might expect the people who watch over these nests to be {8}. They are not. They mark each nest, keep the dogs away, and count. One of them told me that you cannot save every {9}, but you can make sure the ones that hatch get a fair {10}.',
    ['sea', 'still', 'hatched', 'dawn', 'hours', 'small', 'fish', 'discouraged', 'turtle', 'start', 'ticket'],
    ['still', 'sea', 'hatched', 'dawn', 'hours', 'small', 'fish', 'discouraged', 'turtle', 'start'],
    ['Sit very ___ - without moving.',
      'Where a turtle comes out of at night.',
      'Where she herself came out of the egg - past tense.',
      'She returns before ___ - first light.',
      'About two of these - a length of time.',
      'Only a very ___ number survive.',
      'Sea creatures that eat hatchlings.',
      'How you might expect them to feel, given the odds.',
      'You cannot save every one of these.',
      'A fair ___ - an even chance at the beginning.']);

  add(6, 'The Letter That Was Never Sent',
    'My aunt keeps a letter in the drawer of her sewing {1} that she has never {2}. She wrote it to her older brother thirty years ago, after an argument about something neither of them can now {3}. She read it the next morning, decided it was too {4}, and put it away meaning to write a kinder {5}. Somehow the kinder one never got written. They speak now - at weddings, at funerals, on the {6} at New Year - but never about that. Last year she showed me the envelope. The ink has gone {7} and the paper is soft at the folds. I asked her why she keeps {8}. She said it reminds her how quickly a small thing becomes a {9} one if you leave it alone, and that she would rather look at the envelope than pretend it never {10}.',
    ['machine', 'sent', 'remember', 'angry', 'one', 'telephone', 'brown', 'it', 'large', 'happened', 'ladder'],
    ['machine', 'sent', 'remember', 'angry', 'one', 'telephone', 'brown', 'it', 'large', 'happened'],
    ['A sewing ___ - the thing with a drawer.',
      'What you do to a letter to post it.',
      'Neither of them can now ___ what it was about.',
      'Too ___ to send - the tone of the letter.',
      'A kinder ___ - another letter.',
      'How you speak to someone at New Year without meeting.',
      'The colour old ink goes.',
      'Why she keeps ___ - the letter.',
      'A small thing becomes a ___ one.',
      'Pretend it never ___ - took place.']);

  add(7, 'Bagasse',
    'When sugar cane is crushed, the juice runs {1} and a dry fibre is left {2}. That fibre is called bagasse. For a long time it was simply a {3}, piled up beside the mill and burned to get rid of it. Then someone noticed that it burns very {4} indeed. Today several mills in Mauritius burn bagasse to make {5}, and the steam turns turbines that generate {6}. The cane grows again every year, so the fuel grows back {7} it. A thing that was once a problem now helps keep the island\'s lights {8}. It is worth remembering that nobody invented bagasse. It was there the whole {9}, beside the mill, waiting for someone to look at it {10}.',
    ['out', 'behind', 'nuisance', 'well', 'steam', 'electricity', 'with', 'on', 'time', 'differently', 'anchor'],
    ['out', 'behind', 'nuisance', 'well', 'steam', 'electricity', 'with', 'on', 'time', 'differently'],
    ['The juice runs ___ of the crushed cane.',
      'Left ___ - what remains.',
      'Something annoying you want rid of.',
      'It burns very ___ indeed.',
      'Burning water makes this.',
      'What turbines generate.',
      'The fuel grows back ___ the cane.',
      'Keep the lights ___ - not off.',
      'It was there the whole ___.',
      'Look at it ___ - in a new way.']);

  add(8, 'The Examiner',
    'My mother marked examination papers every December for eleven {1}. She would clear the dining table, stack the scripts in three piles, and work until very {2}. She never told anyone whose paper she was {3}, and she never once complained about a child\'s handwriting in front of {4}. What she did complain about, quietly, was a question that could be answered by {5} the words of the textbook back. "That tells me nothing about the child," she would {6}. She believed that the point of an examination is not to catch anyone {7}, but to find out what a child can actually {8}. When I was fifteen I asked her whether she ever felt sorry for the ones with low {9}. She said that was not her job. Her job was to be {10}, every single time, to every single script.',
    ['years', 'late', 'marking', 'me', 'copying', 'say', 'out', 'do', 'marks', 'fair', 'harbour'],
    ['years', 'late', 'marking', 'me', 'copying', 'say', 'out', 'do', 'marks', 'fair'],
    ['Eleven of these, every December.',
      'She worked until very ___ at night.',
      'What an examiner does to a script.',
      'She never complained in front of ___ - the writer.',
      'Answering by ___ the textbook back.',
      'What she would ___ about such a question.',
      'Catch anyone ___ - the phrasal verb.',
      'Find out what a child can actually ___.',
      'Low ___ - poor scores.',
      'What her job was, every single time.']);

  console.log('[g5eng-cloze] loaded');
})();
