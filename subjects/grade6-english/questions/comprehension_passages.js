'use strict';
// Grade 6 English - COMPREHENSION on two passages.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-08 against the English 2024 paper's own mark allocations:
//
//                        paper   bank    gap
//   grammar & sentences    44%   59.9%   +15.9
//   vocabulary             15%   18.6%    +3.6
//   comprehension          25%   11.8%   -13.2
//   production (writing)   16%    9.8%    -6.2
//
// ⚠ The paper column was corrected 2026-09-08. An earlier pass scored Q7A
//   (correcting mistakes in a text) as comprehension and treated the Q6
//   gap-fill marks as unclaimed; both belong to grammar-and-word-level work.
//   The gap this file exists to close is smaller than first reported, and real.
//
// The paper spends 25 marks on reading a passage - Q4A factual retrieval [10]
// and Q4B narrative [15] - and the bank spends 11.8% of its items on it. That
// was this pack's gap. Grammar genuinely does take 44 marks of this paper, so
// it was never over-weighted the way the French pack's conjugation drill is.
//
// ⚠ Production cannot be closed here. Q8A (picture story, 6) and Q9
//   (composition, 10) require a child to WRITE, and an MCQ cannot ask for that.
//   16 marks of this paper are structurally out of reach for this bank.
//
// The two passages follow the shapes the paper actually uses: one INFORMATIONAL
// text answered by retrieval (like the 2024 Messi text and the 2022 Spiders
// text), and one NARRATIVE answered by inference (like the 2024 Mia story).

const _KESTREL = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
<b>The Bird That Came Back</b><br>
The Mauritius kestrel is a small falcon found nowhere else on Earth. It hunts in the
forest, flying low between the trees, and feeds mainly on geckos, which it snatches
from tree trunks and branches.<br><br>
By 1974 only <b>four</b> of these birds were left alive in the wild. The forests they
needed had been cut down for farming, and the pesticides sprayed on the fields had
made their eggshells so thin that the eggs broke before the chicks could hatch. Rats
and monkeys, brought to the island by ships, ate any eggs that survived.<br><br>
A team of scientists began collecting eggs and raising the chicks by hand, then
releasing the young birds back into protected forest. It was slow work. Today there
are about <b>400</b> Mauritius kestrels flying free, and the bird is no longer one of
the rarest in the world.</div>`;

const _STORM = `<div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:8px 10px;margin:8px 0;border-radius:4px;line-height:1.6">
Riya was halfway home from the shop when the sky turned the colour of wet slate. She
had promised her grandmother she would be back before dark, and she had promised
herself she would not run.<br><br>
The first drops were warm and heavy. By the time she reached the bend by the tamarind
tree the rain was coming down so hard that the road had turned into a brown stream,
and she could no longer see the roofs of the village. She clutched the bag of bread
against her chest and kept walking.<br><br>
Then she heard it - a thin, high sound under the noise of the water. She stopped. It
came again, from the ditch beside the road. Riya knelt in the mud, put the bag down
without thinking about the bread at all, and reached in.</div>`;

STATIC_QUESTIONS.push(

  // ── Passage 1: informational - retrieval, then meaning ──────────────────

  makeMCQ({ id:'g6eng-comp-101', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'In which year were only four Mauritius kestrels left in the wild?',
    options:['1974','1947','1874','1994'], answer:'1974',
    hint:'The year is stated in the second paragraph.',
    explanation:'The passage says "By <b>1974</b> only four of these birds were left alive in the wild."' }),

  makeMCQ({ id:'g6eng-comp-102', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'What does the Mauritius kestrel mainly eat?',
    options:['Geckos','Small fish','Seeds and fruit','Insects only'], answer:'Geckos',
    hint:'Look at the end of the first paragraph.',
    explanation:'The passage says it "feeds mainly on <b>geckos</b>, which it snatches from tree trunks and branches."' }),

  makeMCQ({ id:'g6eng-comp-103', chapterId:'g6eng-comprehension', subsection:'retrieval', difficulty:2,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'According to the passage, what made the birds\' eggshells too thin?',
    options:['Pesticides sprayed on the fields','Rats and monkeys from the ships','The cutting down of the forest','The warm weather on the island'],
    answer:'Pesticides sprayed on the fields',
    hint:'Three different problems are named. Only one is linked to the eggshells.',
    explanation:'The passage says "the <b>pesticides</b> sprayed on the fields had made their eggshells so thin that the eggs broke". Forest clearing and introduced animals were separate problems.' }),

  makeMCQ({ id:'g6eng-comp-104', chapterId:'g6eng-comprehension', subsection:'inference', difficulty:3,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'The passage says the rescue work "was slow work." Why was it slow?',
    options:['Each pair raises only a few chicks a year','The scientists had very little money','The birds kept flying away from the island','The forest had to be planted again first'],
    answer:'Each pair raises only a few chicks a year',
    hint:'Think about how a population of four can only grow one way.',
    explanation:'Starting from four birds, the population could only grow a few chicks at a time, so reaching 400 took decades. The passage does not mention money, birds leaving, or replanting.' }),

  makeMCQ({ id:'g6eng-comp-105', chapterId:'g6eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'The passage says the kestrel is "found nowhere else on Earth." Which word means this?',
    options:['Endemic','Extinct','Migratory','Nocturnal'], answer:'Endemic',
    hint:'It is the word used for a plant or animal native to one place only.',
    explanation:'<b>Endemic</b> means found naturally in one place and nowhere else. Extinct means none are left; migratory means it travels; nocturnal means active at night.' }),

  makeMCQ({ id:'g6eng-comp-106', chapterId:'g6eng-comprehension', subsection:'authors_view', difficulty:3,
    question:'Read the passage, then answer the question.' + _KESTREL +
      'Which title best suits this passage?',
    options:['A Rescue That Worked','Birds of the World','How to Keep a Pet Bird','The Dangers of Farming'],
    answer:'A Rescue That Worked',
    hint:'A good title covers the whole passage, not just one paragraph of it.',
    explanation:'The passage runs from near-extinction to recovery, so <b>A Rescue That Worked</b> fits the whole text. The others are too broad, or cover only one part of it.' }),

  // ── Passage 2: narrative - inference and feeling ────────────────────────

  makeMCQ({ id:'g6eng-comp-107', chapterId:'g6eng-passages', subsection:'story', difficulty:2,
    question:'Read the passage, then answer the question.' + _STORM +
      'Where was Riya going when the rain started?',
    options:['Home from the shop','To the shop to buy bread','To her grandmother\'s house','To the village school'],
    answer:'Home from the shop',
    hint:'The very first sentence says where she was.',
    explanation:'The passage opens "Riya was <b>halfway home from the shop</b>", and she is carrying the bread she has already bought.' }),

  makeMCQ({ id:'g6eng-comp-108', chapterId:'g6eng-comprehension', subsection:'language', difficulty:3,
    question:'Read the passage, then answer the question.' + _STORM +
      'The sky "turned the colour of wet slate." What does this tell you?',
    options:['It had become dark and grey','It had turned a bright blue','It was full of orange light','It was clearing up at last'],
    answer:'It had become dark and grey',
    hint:'Slate is a dark grey stone. Picture it wet.',
    explanation:'Wet slate is <b>dark grey</b>, so the comparison tells us the sky had darkened before the storm. It is a simile that builds the mood of the passage.' }),

  makeMCQ({ id:'g6eng-comp-109', chapterId:'g6eng-comprehension', subsection:'inference', difficulty:3,
    question:'Read the passage, then answer the question.' + _STORM +
      'Riya "had promised herself she would not run." What does this suggest about her?',
    options:['She was trying to stay brave','She was too tired to hurry','She had hurt her leg earlier','She did not mind the rain'],
    answer:'She was trying to stay brave',
    hint:'Why would somebody make that particular promise to themselves?',
    explanation:'Promising yourself not to run suggests you are frightened and are choosing not to show it - she is <b>trying to stay brave</b>. Nothing in the passage mentions tiredness or injury.' }),

  makeMCQ({ id:'g6eng-comp-110', chapterId:'g6eng-comprehension', subsection:'inference', difficulty:3,
    question:'Read the passage, then answer the question.' + _STORM +
      'Riya put the bag down "without thinking about the bread at all." Why does this matter?',
    options:['It shows the sound mattered more to her','It shows she had forgotten her errand','It shows the bread was already ruined','It shows she wanted to rest for a while'],
    answer:'It shows the sound mattered more to her',
    hint:'She had been carefully protecting that bag all the way home. What changed?',
    explanation:'She had clutched the bag to her chest through the storm, so dropping it in the mud shows that whatever was making the sound <b>mattered more to her</b> than the errand.' }),

  makeMCQ({ id:'g6eng-comp-111', chapterId:'g6eng-comprehension', subsection:'vocabulary', difficulty:2,
    question:'Read the passage, then answer the question.' + _STORM +
      'What does the word "clutched" mean in this passage?',
    options:['Held on to tightly','Threw away quickly','Carried very loosely','Passed to somebody'],
    answer:'Held on to tightly',
    hint:'Picture how you would carry something in a downpour.',
    explanation:'To <b>clutch</b> is to grip something tightly, often because you are anxious about losing it - which is exactly Riya in the storm.' }),

  makeMCQ({ id:'g6eng-comp-112', chapterId:'g6eng-comprehension', subsection:'evidence', difficulty:3,
    question:'Read the passage, then answer the question.' + _STORM +
      'Which line best shows how heavy the rain had become?',
    options:['"the road had turned into a brown stream"','"The first drops were warm and heavy"','"She stopped. It came again"','"Riya knelt in the mud"'],
    answer:'"the road had turned into a brown stream"',
    hint:'Look for the line that describes what the rain had DONE, not what Riya did.',
    explanation:'A road turning into a <b>brown stream</b> shows the rain was heavy enough to flood it. The first drops line describes the start, and the other two describe Riya rather than the rain.' })

);
