'use strict';
// Grade 6 English - Cloze Passages, TWO PARTS.
//
// ⚠ Grade 6 escalates the way the real Grade 6 French paper does: Part A is
//   five gaps PLACED from a word bank, Part B is five gaps the child WRITES
//   themselves with no bank at all. Part B is where the function words live —
//   which, because, until, whose — and they cannot be offered in a box without
//   giving the grammar away.
//
// ⚠ EVERY PART-B GAP TAKES A LIST OF ACCEPTED ANSWERS, first entry = model.
//   makeCloze maps answersB through gapAlts for exactly this reason: "he began
//   to walk / started to walk" are both right, and failing a child for the
//   better word is the one mistake this exercise cannot afford. A single
//   string where a list belongs silently marks good English wrong.
//
// ⚠ lang: 'en' on every item — see ch09_cloze.js in grade4-english.
(function () {
  const CH = 'g6eng-cloze';
  const add = (n, title, text, bank, answers, notes, textB, answersB, notesB, introB, difficulty) =>
    STATIC_QUESTIONS.push(makeCloze({
      id: `g6eng-clz-${String(n).padStart(3, '0')}`,
      chapterId: CH, subsection: 'cloze_passage', difficulty: difficulty || 3,
      lang: 'en', title, text, bank, answers, notes,
      textB, answersB, notesB, introB,
    }));

  add(1, 'The Chagos Archipelago',
    'Far to the north-east of Mauritius lies a group of low coral islands called the Chagos {1}. Before 1973 several thousand people lived there. They fished, worked on the coconut {2}, and buried their families in the island cemeteries. Then, over a few {3}, every one of them was removed so that a military base could be built on the largest island, Diego {4}. Most were brought to Mauritius and to Seychelles with almost {5}.',
    ['Archipelago', 'plantations', 'years', 'Garcia', 'nothing', 'telescope'],
    ['Archipelago', 'plantations', 'years', 'Garcia', 'nothing'],
    ['The word for a group of islands.',
      'Where coconuts were grown and worked.',
      'Over a few ___ - a span of time.',
      'The name of the largest island: Diego ___.',
      'They arrived with almost ___ - no possessions.'],
    'Many arrived in Port Louis with no house and no work waiting for them, {6} made those first years extremely hard. Their children grew up hearing about a place {7} they had never seen. For decades the Chagossians campaigned {8} the right to return. In 2019 the International Court of Justice said that the islands should be handed back, {9} the dispute has continued since then. Some of the people who were removed as children are now grandparents, and they are still {10}.',
    [['which', 'and this', 'and that'],
      ['that', 'which'],
      ['for'],
      ['but', 'although', 'though', 'yet'],
      ['waiting', 'hoping', 'campaigning']],
    ['A relative pronoun referring back to the whole situation.',
      'A place ___ they had never seen - relative pronoun as object.',
      'Campaigned ___ the right to return - the preposition.',
      'Joins two clauses that contrast.',
      'Still ___ - what they are doing after all these years.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  add(2, 'The Man Who Counted Birds',
    'For thirty-one years, Mr Bhugeerathee walked the same path through the Black River gorges every Sunday {1}. He carried a notebook, a pencil and a pair of old {2}. He was not a scientist and nobody paid him. He simply counted {3}. When the Mauritius kestrel had fallen to four known individuals in the wild, his notebooks turned out to be one of the few continuous {4} anybody had of where the birds still {5}.',
    ['morning', 'binoculars', 'birds', 'records', 'hunted', 'saucepan'],
    ['morning', 'binoculars', 'birds', 'records', 'hunted'],
    ['Every Sunday ___ - the part of the day.',
      'What you watch distant birds through.',
      'What he counted, week after week.',
      'Continuous ___ - written evidence kept over time.',
      'Where the birds still ___ - looked for food.'],
    'The conservation team came to see him in 1979, {6} they had heard he had been watching the same valley for years. He gave them everything he had written, {7} asking for anything in return. The kestrel recovered slowly, {8} it is still one of the rarest birds in the world. Mr Bhugeerathee kept walking the path {9} he was eighty-four. He used to say that the only thing a person really needs in order to be useful is to keep {10} the same thing, carefully, for a very long time.',
    [['because', 'as', 'since'],
      ['without'],
      ['although', 'though', 'but'],
      ['until', 'till'],
      ['doing', 'watching', 'recording']],
    ['Gives the reason they came to see him.',
      '___ asking for anything - he wanted nothing.',
      'Joins a recovery to a remaining problem.',
      'He kept walking ___ he was eighty-four.',
      'Keep ___ the same thing for a long time.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  add(3, 'The Cost of a Free Bus',
    'Free bus travel for students and pensioners has existed in Mauritius for many {1}. For a family sending three children across the island to school, it removes a real {2} from the monthly budget. It also keeps some children in school who might otherwise have to {3} early. The cost is paid by the government, which means it is paid by everyone through {4}. Whether that is a good bargain depends almost entirely on what you think school is {5}.',
    ['years', 'cost', 'leave', 'taxes', 'for', 'umbrella'],
    ['years', 'cost', 'leave', 'taxes', 'for'],
    ['Many of these - a long period.',
      'A real ___ removed from the budget.',
      'Have to ___ school early.',
      'How a government pays for things.',
      'What you think school is ___.'],
    'Some people argue that the money would do more good {6} it were spent on the buses themselves, many of which are old. Others point out that a service nobody can afford to use is not a service {7} all. Both arguments are reasonable, {8} they are often presented as though only one of them could be true. The honest answer is that a country has to choose, and that every choice leaves something {9}. What is not honest is pretending the choice does not have to be {10}.',
    [['if'],
      ['at'],
      ['but', 'although', 'though', 'yet'],
      ['out', 'undone', 'behind'],
      ['made', 'taken']],
    ['Introduces a condition.',
      'Not a service ___ all - the fixed phrase.',
      'Joins two reasonable arguments in contrast.',
      'Every choice leaves something ___.',
      'The choice has to be ___.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  add(4, 'The Girl Who Fixed the Radio',
    'Shalini was eleven when the radio in her grandmother\'s kitchen stopped {1}. Nobody else in the house was particularly interested in it, so she took it out to the step, laid a cloth on the ground and removed the six screws at the {2}. Inside was a landscape she had never seen: coils, a dusty speaker, and a board covered in small grey {3}. She had no idea what any of it {4}. What she did have was an afternoon, a torch, and her grandmother\'s permission to take it {5}.',
    ['working', 'back', 'components', 'did', 'apart', 'saucepan'],
    ['working', 'back', 'components', 'did', 'apart'],
    ['The radio stopped ___ - it broke.',
      'Where the screws on a radio usually are.',
      'Small grey ___ on a circuit board.',
      'She had no idea what any of it ___.',
      'Take it ___ - separate it into pieces.'],
    'It took her four afternoons, {6} she found the loose wire in the end. Her grandmother, {7} had said nothing at all while the parts were spread across the step, plugged the radio in and turned it on without a word. Shalini is twenty-six now and repairs medical equipment at a hospital in Rose Hill, {8} she says is much the same work with better tools. She still keeps the six screws in a matchbox, {9} she has never needed them since. She says she keeps them to remind her {10} nobody told her she was allowed to open it.',
    [['but', 'and', 'though', 'although'],
      ['who'],
      ['which'],
      ['although', 'though', 'even though', 'but'],
      ['that']],
    ['Joins the long effort to the eventual success.',
      'Relative pronoun for a person, as subject.',
      'Relative pronoun referring back to the whole job.',
      'Concedes that she has not needed them.',
      'Remind her ___ nobody told her - introduces the clause.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  add(5, 'Reading the Weather',
    'Before the radio, fishermen on this coast read the weather from the sea {1} and the sky, and a good many of them were remarkably {2} at it. A particular colour above the mountains in the late afternoon meant rain before {3}. A long swell arriving with no wind behind it meant something large and far {4}. None of this was superstition; it was a lifetime of careful {5}, passed from one person to the next.',
    ['accurate', 'itself', 'morning', 'away', 'observation', 'umbrella'],
    ['itself', 'accurate', 'morning', 'away', 'observation'],
    ['The sea ___ - the sea and nothing else.',
      'Remarkably ___ at it - they got it right.',
      'Rain before ___ - before the next day.',
      'Something large and far ___ - at a distance.',
      'A lifetime of careful ___ - watching closely.'],
    'Modern forecasting is far better than any of this, {6} nobody sensible goes out now without checking it. But the old skill has not become useless. A satellite can tell you {7} a storm will arrive on the island; it cannot always tell you what the water will do in one particular bay, {8} the reef runs close to shore. That is why the best captains still look at the sea before they leave, {9} they have already read the forecast twice. Knowing a great deal about everywhere is not the same {10} knowing one place.',
    [['and', 'so'],
      ['when', 'whether', 'if'],
      ['where'],
      ['even', 'although', 'though'],
      ['as']],
    ['Joins two statements that agree.',
      'Tell you ___ a storm will arrive - about the time.',
      'A relative adverb of place.',
      '___ they have already read the forecast - concedes it.',
      'Not the same ___ knowing one place - the comparison word.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  add(6, 'The Second Language',
    'When my father started school he could not speak a word of {1}. He had grown up speaking Kreol at home and Bhojpuri with his grandparents, and on his first morning the teacher spoke to him in a language he had never {2}. He says he spent most of that year copying what the other children did, half a second {3}. Nobody thought this was unusual, {4} it was happening to almost every child in the room. By the third year he was near the top of the {5}.',
    ['English', 'heard', 'behind', 'because', 'class', 'lantern'],
    ['English', 'heard', 'behind', 'because', 'class'],
    ['The language of the classroom.',
      'A language he had never ___ before.',
      'Half a second ___ the others.',
      'Gives the reason nobody thought it unusual.',
      'Near the top of the ___.'],
    'He tells the story cheerfully, {6} I have never been sure it is a cheerful story. For every child who copied fast enough, there was another {7} simply stopped putting up a hand. My father agrees with this. He says the ones who managed were not the clever ones; they were the ones {8} happened to be stubborn. What he wanted for us, he says, was not an easier school {9} a school that noticed the difference between a child who cannot do the work and a child who cannot yet read the {10}.',
    [['but', 'although', 'though', 'yet'],
      ['who'],
      ['who', 'that'],
      ['but'],
      ['question', 'instructions', 'paper']],
    ['Contrasts his cheerfulness with the doubt.',
      'Another child ___ stopped putting up a hand.',
      'The ones ___ happened to be stubborn.',
      'Not an easier school ___ a school that notices.',
      'Cannot yet read the ___ - what is written on the paper.'],
    'write ONE suitable word in each gap. There is no box for this part.');

  console.log('[g6eng-cloze] loaded');
})();
